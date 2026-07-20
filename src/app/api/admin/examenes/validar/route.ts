import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { parseExamenMD } from "@/lib/axiom/banco-parser";
import { ES_DEV, isAdmin } from "@/lib/session";

// Valida (y en local, guarda) un examen resuelto en formato Markdown AXIOM,
// tal como lo devuelve el megaprompt. Flujo: el admin pega el texto, acá se
// parsea con el MISMO parser del banco y se devuelve un resumen con avisos;
// si está todo bien y estamos en desarrollo local, "guardar: true" lo escribe
// en data/examenes/ para que aparezca en Resueltos de inmediato.
// En producción no se puede escribir al filesystem (Vercel es de solo
// lectura): ahí el flujo es guardar en local y subir a GitHub con SUBIR.

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Solo administradores" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const contenido: unknown = body?.contenido;
  const guardar: boolean = body?.guardar === true;
  const sobrescribir: boolean = body?.sobrescribir === true;
  if (typeof contenido !== "string" || contenido.trim().length === 0) {
    return NextResponse.json({ error: "Falta 'contenido' (el texto Markdown del examen)" }, { status: 400 });
  }

  // 1. Parsear con el parser real del banco
  let examen;
  try {
    examen = parseExamenMD(contenido);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error_parseo: msg });
  }

  // 2. Resumen + avisos de calidad
  const porArea: Record<string, number> = {};
  for (const p of examen.preguntas) porArea[p.area] = (porArea[p.area] ?? 0) + 1;

  const avisos: string[] = [];
  const areasSinPonderacion = Object.keys(porArea).filter((a) => !(a in examen.ponderacion));
  if (areasSinPonderacion.length > 0) {
    avisos.push(`Áreas usadas en preguntas pero AUSENTES en ponderacion (no puntuarían en simulacros): ${areasSinPonderacion.join(", ")}`);
  }
  const ponderacionSinPreguntas = Object.keys(examen.ponderacion).filter((a) => !(a in porArea));
  if (ponderacionSinPreguntas.length > 0) {
    avisos.push(`Claves de ponderacion sin ninguna pregunta: ${ponderacionSinPreguntas.join(", ")}`);
  }
  if (examen.total_preguntas && examen.total_preguntas !== examen.preguntas.length) {
    avisos.push(`El frontmatter dice total_preguntas: ${examen.total_preguntas} pero hay ${examen.preguntas.length} preguntas`);
  }
  const sinExplicacion = examen.preguntas.filter((p) => !p.explicacion).map((p) => p.numero);
  if (sinExplicacion.length > 0) {
    avisos.push(`Preguntas sin explicación: ${sinExplicacion.join(", ")}`);
  }
  const verificar = (contenido.match(/VERIFICAR/g) ?? []).length;
  if (verificar > 0) {
    avisos.push(`Hay ${verificar} marca(s) "VERIFICAR" — la IA no pudo leer algo con certeza; revisar contra el PDF original`);
  }
  const conFigura = examen.preguntas.filter((p) => p.figura).map((p) => `${p.numero} (${p.figura})`);
  const conSvg = examen.preguntas.filter((p) => p.figura_svg).length;
  const sinSvg = examen.preguntas.filter((p) => p.figura && !p.figura_svg).map((p) => p.numero);
  if (sinSvg.length > 0) {
    avisos.push(`Preguntas con figura declarada pero SIN código SVG (no se verá ningún dibujo hasta que se agregue): ${sinSvg.join(", ")}`);
  }

  const resumen = {
    id: examen.id,
    titulo: examen.titulo ?? `${examen.universidad} ${examen.facultad} ${examen.anio}`,
    anio: examen.anio,
    opcion: examen.opcion ?? null,
    total_preguntas: examen.preguntas.length,
    por_area: porArea,
    preguntas_con_figura: conFigura,
    preguntas_con_svg: conSvg,
    avisos,
  };

  // 3. Guardar (solo en desarrollo local)
  if (guardar) {
    if (!ES_DEV) {
      return NextResponse.json({
        ok: true, resumen, guardado: false,
        error_guardado: "En producción no se puede escribir el archivo. Guardalo en tu compu local y subilo a GitHub con SUBIR.",
      });
    }
    const dir = path.join(process.cwd(), "data", "examenes", examen.universidad.toLowerCase(), examen.facultad);
    await fs.mkdir(dir, { recursive: true });

    // Buscar si YA existe un examen con el mismo id, comparando por id de
    // examen y no por nombre de archivo (los archivos pueden llamarse
    // distinto — ej "2023-1op-1-2023.md" — pero producir el mismo id, y dos
    // archivos con el mismo id colisionan en el banco).
    let archivoExistente: string | null = null;
    for (const nombre of await fs.readdir(dir)) {
      if (!nombre.endsWith(".md")) continue;
      try {
        const otro = parseExamenMD(await fs.readFile(path.join(dir, nombre), "utf-8"));
        if (otro.id === examen.id) { archivoExistente = path.join(dir, nombre); break; }
      } catch { /* archivo ajeno o inválido: no puede colisionar */ }
    }

    if (archivoExistente && !sobrescribir) {
      return NextResponse.json({ ok: true, resumen, guardado: false, ya_existe: true, archivo: path.relative(process.cwd(), archivoExistente) });
    }
    // Si sobrescribe, se escribe SOBRE el archivo existente (mismo nombre);
    // si es nuevo, con el id como nombre.
    const archivo = archivoExistente ?? path.join(dir, `${examen.id}.md`);
    await fs.writeFile(archivo, contenido, "utf-8");
    return NextResponse.json({ ok: true, resumen, guardado: true, archivo: path.relative(process.cwd(), archivo) });
  }

  return NextResponse.json({ ok: true, resumen, puede_guardar: ES_DEV });
}
