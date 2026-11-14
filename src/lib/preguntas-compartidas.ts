import { readFileSync } from "node:fs";
import path from "node:path";
import type { FormatoExamen } from "./formatos-examen.ts";
import type { ExamenBanco, ModoSimulacion, PreguntaBanco } from "./axiom/types.ts";

export interface ReglaPreguntasCompartidas {
  id: string;
  activo: boolean;
  destino: string;
  origen: string;
  areas: Record<string, string>;
  etiqueta: string;
  nota: string;
}

const RUTA_REGLAS_DEFAULT = path.join(process.cwd(), "data", "preguntas-compartidas.json");

export function cargarReglasCompartidas(
  ruta: string = RUTA_REGLAS_DEFAULT
): ReglaPreguntasCompartidas[] {
  try {
    const raw = readFileSync(ruta, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ReglaPreguntasCompartidas[]) : [];
  } catch {
    return [];
  }
}

export function reglasActivasPara(
  reglas: readonly ReglaPreguntasCompartidas[],
  facultadDestino: string
): ReglaPreguntasCompartidas[] {
  const destL = facultadDestino.toLowerCase();
  return reglas.filter(
    (r) => r.activo === true && r.destino.toLowerCase() === destL
  );
}

export function reglaActivaPara(
  reglas: readonly ReglaPreguntasCompartidas[],
  facultadDestino: string
): ReglaPreguntasCompartidas | null {
  return reglasActivasPara(reglas, facultadDestino)[0] ?? null;
}

/**
 * Crea copias diferenciables de las preguntas de la facultad origen cuya área esté
 * mapeada en `regla.areas` y cuya área destino exista en la ficha vigente (`peso > 0`).
 * Nunca muta las preguntas originales.
 */
export function prestarPreguntas(
  preguntasOrigen: readonly PreguntaBanco[],
  regla: ReglaPreguntasCompartidas,
  ficha: Pick<FormatoExamen, "areas"> | null | undefined
): PreguntaBanco[] {
  if (!regla.activo || !ficha) return [];
  const areasValidas = new Set(
    ficha.areas.filter((a) => a.peso > 0).map((a) => a.id)
  );
  if (areasValidas.size === 0) return [];

  const idsVistos = new Set<string>();
  const prestadas: PreguntaBanco[] = [];

  for (const p of preguntasOrigen) {
    const areaDestino = regla.areas[p.area];
    if (!areaDestino || !areasValidas.has(areaDestino)) continue;

    const id = p.id.startsWith("prestada:") ? p.id : `prestada:${p.id}`;
    if (idsVistos.has(id)) continue;
    idsVistos.add(id);

    prestadas.push({
      ...p,
      id,
      area: areaDestino,
      opciones: p.opciones.map((o) => ({ ...o })),
      ...(p.afirmaciones ? { afirmaciones: [...p.afirmaciones] } : {}),
      ...(p.tags ? { tags: [...p.tags] } : {}),
      ...(p.pares_emparejamiento
        ? { pares_emparejamiento: p.pares_emparejamiento.map((par) => ({ ...par })) }
        : {}),
      ...(p.espacios_completar ? { espacios_completar: [...p.espacios_completar] } : {}),
      prestada: {
        desde: regla.origen,
        etiqueta: regla.etiqueta,
        nota: regla.nota,
      },
    });
  }

  return prestadas;
}

export interface OpcionesAmpliarPool {
  modo: ModoSimulacion;
  facultad: string;
  pool: readonly PreguntaBanco[];
  banco?: readonly ExamenBanco[];
  preguntasOrigen?:
    | readonly PreguntaBanco[]
    | ((facultadOrigen: string) => readonly PreguntaBanco[]);
  ficha: Pick<FormatoExamen, "areas"> | null | undefined;
  reglas?: readonly ReglaPreguntasCompartidas[];
}

/**
 * Amplía el pool SOLO en modo `predictivo` cuando existe una regla activa para `facultad`
 * y la ficha vigente incluye las áreas destino. En cualquier otro modo devuelve una copia
 * superficial del pool sin preguntas prestadas.
 */
export function ampliarPoolConPrestadas(opts: OpcionesAmpliarPool): PreguntaBanco[] {
  if (opts.modo !== "predictivo" || !opts.ficha) {
    return [...opts.pool];
  }
  const reglas = opts.reglas ?? cargarReglasCompartidas();
  const activas = reglasActivasPara(reglas, opts.facultad);
  if (activas.length === 0) {
    return [...opts.pool];
  }

  const resultado: PreguntaBanco[] = [...opts.pool];
  const idsVistos = new Set<string>(resultado.map((p) => p.id));

  for (const regla of activas) {
    const origL = regla.origen.toLowerCase();
    let origen: readonly PreguntaBanco[] = [];
    if (typeof opts.preguntasOrigen === "function") {
      origen = opts.preguntasOrigen(regla.origen);
    } else if (Array.isArray(opts.preguntasOrigen)) {
      origen = opts.preguntasOrigen;
    } else if (opts.banco) {
      origen = opts.banco
        .filter((e) => e.facultad.toLowerCase() === origL)
        .flatMap((e) => e.preguntas);
    }

    const prestadas = prestarPreguntas(origen, regla, opts.ficha);
    for (const copia of prestadas) {
      if (!idsVistos.has(copia.id)) {
        idsVistos.add(copia.id);
        resultado.push(copia);
      }
    }
  }

  return resultado;
}
