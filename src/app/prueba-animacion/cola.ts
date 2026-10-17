// Cola de revision de /prueba-animacion (SOLO DESARROLLO). La pagina muestra una animacion a la vez:
//   - aprobada  = UN caso cualquiera tiene un "bien" en el ULTIMO paso con la huella actual del generador (Ronald, 17-oct:
//                 los otros casos son el mismo tipo; los revisa la IA con las pruebas y el barrido de ancho),
//                 o el visto bueno viejo de data/registro-visto-bueno.json sigue vigente;
//   - en rehacer = tiene una observacion sin atender: sale de la vista hasta que la IA la atienda;
//   - por revisar = el resto. Las que ya se rehicieron van al final de la fila.
import { existsSync, readFileSync } from "node:fs";
import { CASOS_POR_TIPO } from "./casos.ts";
import type { Tipo } from "./construir.ts";
import { huellaVistoBueno } from "./huellas.ts";

export interface Observacion {
  tipo: string;
  valores: string[];
  paso: number;
  totalPasos: number;
  estado: "bien" | "nota";
  texto: string;
  fecha: string;
  atendida: boolean;
  /** huella del generador cuando se dejo la observacion: si el generador cambia despues, el "bien" ya no vale */
  huella?: string;
  /** «Aprobar toda la animacion»: vale desde cualquier paso */
  total?: boolean;
}

export const RUTA_OBSERVACIONES = () => process.cwd() + "/data/observaciones-ronald.json";

export const leerObservaciones = (): Observacion[] => {
  try {
    return existsSync(RUTA_OBSERVACIONES()) ? JSON.parse(readFileSync(RUTA_OBSERVACIONES(), "utf8")).observaciones : [];
  } catch {
    return [];
  }
};

export interface EstadoTipo {
  tipo: Tipo;
  estado: "aprobada" | "en-rehacer" | "por-revisar";
  casosAprobados: number;
  casosTotal: number;
  /** ya se rehizo despues de un rechazo: va al final de la fila */
  rehecha: boolean;
  /** valores de los casos ya aprobados (unidos con |) y el primer caso que falta */
  aprobados: string[];
  siguiente: string[] | null;
}

export function estadoDe(tipo: Tipo, obs: Observacion[], vistoBuenoVigente: boolean): EstadoTipo {
  const huella = huellaVistoBueno(tipo);
  const casos = CASOS_POR_TIPO[tipo];
  const mias = obs.filter((o) => o.tipo === tipo);
  const aprobado = (v: string[]) => mias.some((o) => o.estado === "bien" && o.huella === huella && (o.paso === o.totalPasos || o.total === true) && o.valores.join("|") === v.join("|"));
  const casosAprobados = casos.filter((c) => aprobado(c.v)).length;
  const hechos = casos.filter((c) => aprobado(c.v)).map((c) => c.v.join("|"));
  const siguiente = casos.find((c) => !hechos.includes(c.v.join("|")))?.v ?? null;
  const comun = { aprobados: hechos, siguiente };
  const rehecha = mias.some((o) => o.estado === "nota" && o.atendida);
  if (vistoBuenoVigente || casosAprobados > 0) return { tipo, estado: "aprobada", casosAprobados: casos.length, casosTotal: casos.length, rehecha, ...comun };
  if (mias.some((o) => o.estado === "nota" && !o.atendida)) return { tipo, estado: "en-rehacer", casosAprobados, casosTotal: casos.length, rehecha, ...comun };
  return { tipo, estado: "por-revisar", casosAprobados, casosTotal: casos.length, rehecha, ...comun };
}
