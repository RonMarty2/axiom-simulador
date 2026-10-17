import { NextResponse } from "next/server";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { CASOS_POR_TIPO } from "../../../prueba-animacion/casos";
import type { Tipo } from "../../../prueba-animacion/construir";
import { huellaVistoBueno } from "../../../prueba-animacion/huellas";
import { estadoDe, RUTA_OBSERVACIONES, type Observacion } from "../../../prueba-animacion/cola";

// SOLO PARA DESARROLLO (la pagina /prueba-animacion de Ronald). En produccion responde 404: ningun usuario la ve.
const NOTA =
  "Observaciones que Ronald deja desde /prueba-animacion (solo desarrollo). La IA las lee al abrir sesion, se las parafrasea a Ronald y espera su si ANTES de cambiar nada. estado: bien = aprobado hasta ese paso (si es el ultimo, ese caso queda aprobado; el tipo se aprueba cuando todos sus casos lo estan); nota = observacion (el tipo sale de la vista hasta que la IA la atienda); atendida la marca la IA cuando Ronald confirma y rehace.";
const RUTA_VB = process.cwd() + "/data/registro-visto-bueno.json";

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") return new NextResponse(null, { status: 404 });
  const b = await req.json().catch(() => null);
  if (
    !b ||
    typeof b.tipo !== "string" ||
    !(b.tipo in CASOS_POR_TIPO) ||
    !Array.isArray(b.valores) ||
    !Number.isInteger(b.paso) ||
    !Number.isInteger(b.totalPasos) ||
    (b.estado !== "bien" && b.estado !== "nota")
  )
    return NextResponse.json({ error: "datos incompletos" }, { status: 400 });
  const texto = typeof b.texto === "string" ? b.texto.trim().slice(0, 2000) : "";
  if (b.estado === "nota" && !texto) return NextResponse.json({ error: "escribe la observacion" }, { status: 400 });
  const tipo = b.tipo as Tipo;
  const reg: { _nota: string; observaciones: Observacion[] } = existsSync(RUTA_OBSERVACIONES()) ? JSON.parse(readFileSync(RUTA_OBSERVACIONES(), "utf8")) : { _nota: NOTA, observaciones: [] };
  reg.observaciones.push({
    tipo,
    valores: b.valores.map(String),
    paso: b.paso,
    totalPasos: b.totalPasos,
    estado: b.estado,
    texto,
    fecha: new Date().toISOString(),
    atendida: false,
    huella: huellaVistoBueno(tipo),
    ...(b.total === true ? { total: true } : {}),
  });
  writeFileSync(RUTA_OBSERVACIONES(), JSON.stringify({ ...reg, _nota: NOTA }, null, 2) + "\n");
  // si con este "bien" ya estan aprobados todos los casos del tipo, queda tambien en el registro de visto bueno
  const e = estadoDe(tipo, reg.observaciones, false);
  if (e.estado === "aprobada") {
    const vb = JSON.parse(readFileSync(RUTA_VB, "utf8"));
    vb.generadores[tipo] = { huella: huellaVistoBueno(tipo), fecha: new Date().toISOString().slice(0, 10) };
    writeFileSync(RUTA_VB, JSON.stringify(vb, null, 2) + "\n");
  }
  const aprobados = new Set(reg.observaciones.filter((o) => o.tipo === tipo && o.estado === "bien" && o.huella === huellaVistoBueno(tipo) && (o.paso === o.totalPasos || o.total === true)).map((o) => o.valores.join("|")));
  const siguiente = CASOS_POR_TIPO[tipo].find((c) => !aprobados.has(c.v.join("|")))?.v ?? null;
  return NextResponse.json({ ok: true, estado: e.estado, casosAprobados: e.casosAprobados, casosTotal: e.casosTotal, siguiente });
}
