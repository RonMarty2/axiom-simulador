// Registro de los PASOS que Ronald tiene que mirar (no ejercicios enteros).
//   node src/app/prueba-animacion/revisar-pasos.ts listar
//   node src/app/prueba-animacion/revisar-pasos.ts agregar <tipo> "<caso>" <paso> "<que mirar>"
//   node src/app/prueba-animacion/revisar-pasos.ts silencio <tipo> "<caso>" <hastaPaso>
//   node src/app/prueba-animacion/revisar-pasos.ts ok <tipo>
// Ronald dijo (9-oct): si llego al paso N de un ejercicio y solo observo ese paso, lo anterior lo vio y le gusto.
//   - `agregar`: lo corregido queda en data/cambios-por-revisar.json y la pagina muestra "Ver lo que cambio" con salto directo al paso.
//   - `silencio`: los pasos de ese caso ANTES de `hastaPaso` se dan por vistos sin observacion. Se registran en
//     `aprobadosPorSilencio` (con fecha y hasta donde llego), no se borran sin dejar rastro. Solo se usa si hay evidencia
//     de que Ronald llego a ese paso (comento algo de un paso posterior). Si solo dijo "ok" a un ejercicio, no cuenta.
//   - `ok`: Ronald dijo que un tipo esta bien: se quitan todos sus pasos pendientes.
import { readFileSync, writeFileSync } from "node:fs";
import { CASOS_POR_TIPO } from "./casos.ts";
import { construir, type Tipo } from "./construir.ts";

const RUTA = new URL("../../../data/cambios-por-revisar.json", import.meta.url);

export interface Cambio {
  tipo: string;
  caso: string;
  /** numero de paso tal como lo ve Ronald ("Paso 31 de 39"), desde 1 */
  paso: number;
  nota: string;
  fecha: string;
}
export interface Silencio extends Cambio {
  /** hasta que paso llego Ronald cuando se dio por visto */
  hasta: number;
}
export interface Registro {
  _nota: string;
  cambios: Cambio[];
  aprobadosPorSilencio: Silencio[];
}

const NOTA =
  "Pasos que Ronald debe mirar y pasos que dio por vistos sin observacion. Se edita SOLO con revisar-pasos.ts. La pagina /prueba-animacion muestra `cambios` con salto directo al paso.";

// dentro de Next `import.meta.url` no apunta a este archivo: se prueba tambien la ruta desde la raiz del proyecto
export const leer = (): Registro => {
  for (const ruta of [RUTA, process.cwd() + "/data/cambios-por-revisar.json"]) {
    try {
      return JSON.parse(readFileSync(ruta, "utf8"));
    } catch {
      // se prueba la siguiente
    }
  }
  return { _nota: NOTA, cambios: [], aprobadosPorSilencio: [] };
};
const guardar = (r: Registro) => writeFileSync(RUTA, JSON.stringify({ ...r, _nota: NOTA }, null, 2) + "\n");

/** el caso existe y el paso cabe en su animacion (se arma de verdad, no se confia en el numero) */
export function validar(tipo: string, caso: string, paso: number): string | null {
  const casos = CASOS_POR_TIPO[tipo as Tipo];
  if (!casos) return `${tipo}: no existe. Tipos: ${Object.keys(CASOS_POR_TIPO).join(", ")}`;
  const c = casos.find((x) => x.nombre === caso);
  if (!c) return `${tipo}: no hay un caso "${caso}". Casos: ${casos.map((x) => x.nombre).join(", ")}`;
  const r = construir(tipo as Tipo, c.v);
  if (!("demo" in r)) return `${tipo} / ${caso}: no se arma (${"error" in r ? r.error : "?"})`;
  const total = r.demo.estados.length;
  if (!Number.isInteger(paso) || paso < 1 || paso > total) return `${tipo} / ${caso}: el paso debe estar entre 1 y ${total}`;
  return null;
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop() as string)) {
  const [, , orden, tipo, caso, n, nota] = process.argv;
  const reg = leer();
  const hoy = new Date().toISOString().slice(0, 10);
  if (orden === "listar") {
    console.log(`Por revisar: ${reg.cambios.length}`);
    for (const c of reg.cambios) console.log(`  ${c.tipo} / ${c.caso} / paso ${c.paso}: ${c.nota}`);
    console.log(`Aprobados por silencio: ${reg.aprobadosPorSilencio.length}`);
    for (const c of reg.aprobadosPorSilencio) console.log(`  ${c.tipo} / ${c.caso} / paso ${c.paso} (llego hasta ${c.hasta}, ${c.fecha}): ${c.nota}`);
  } else if (orden === "agregar") {
    const paso = Number(n);
    const error = validar(tipo, caso, paso);
    if (error || !nota?.trim()) {
      console.error(error ?? "falta la nota: que tiene que mirar Ronald");
      process.exit(1);
    }
    reg.cambios = reg.cambios.filter((c) => !(c.tipo === tipo && c.caso === caso && c.paso === paso));
    reg.cambios.push({ tipo, caso, paso, nota, fecha: hoy });
    guardar(reg);
    console.log(`por revisar: ${tipo} / ${caso} / paso ${paso}`);
  } else if (orden === "silencio") {
    const hasta = Number(n);
    const error = validar(tipo, caso, hasta);
    if (error) {
      console.error(error);
      process.exit(1);
    }
    const dados = reg.cambios.filter((c) => c.tipo === tipo && c.caso === caso && c.paso < hasta);
    reg.cambios = reg.cambios.filter((c) => !dados.includes(c));
    reg.aprobadosPorSilencio.push(...dados.map((c) => ({ ...c, hasta, fecha: hoy })));
    guardar(reg);
    console.log(`dados por vistos sin observacion: ${dados.length} (${tipo} / ${caso}, antes del paso ${hasta})`);
  } else if (orden === "ok") {
    const antes = reg.cambios.length;
    reg.cambios = reg.cambios.filter((c) => c.tipo !== tipo);
    guardar(reg);
    console.log(`${tipo}: se quitan ${antes - reg.cambios.length} pasos pendientes`);
  } else {
    console.error("ordenes: listar | agregar <tipo> <caso> <paso> <nota> | silencio <tipo> <caso> <hastaPaso> | ok <tipo>");
    process.exit(1);
  }
}
