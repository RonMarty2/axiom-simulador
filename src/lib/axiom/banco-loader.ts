import fs from "fs/promises";
import path from "path";
import { parseExamenMD } from "./banco-parser";
import type { ExamenBanco, ExamenMetadata, PreguntaBanco } from "./types";

const BANCO_DIR = path.join(process.cwd(), "data", "examenes");

let cacheExamenes: ExamenBanco[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60_000; // 1 minuto en dev, suficiente

export async function cargarBanco(forzar = false): Promise<ExamenBanco[]> {
  const ahora = Date.now();
  if (!forzar && cacheExamenes && ahora - cacheTimestamp < CACHE_TTL_MS) {
    return cacheExamenes;
  }

  const examenes: ExamenBanco[] = [];

  let universidades: string[] = [];
  try {
    universidades = await fs.readdir(BANCO_DIR);
  } catch {
    cacheExamenes = [];
    cacheTimestamp = ahora;
    return [];
  }

  for (const uni of universidades) {
    const dirUni = path.join(BANCO_DIR, uni);
    const statUni = await fs.stat(dirUni).catch(() => null);
    if (!statUni?.isDirectory()) continue;

    const facultades = await fs.readdir(dirUni);
    for (const fac of facultades) {
      const dirFac = path.join(dirUni, fac);
      const statFac = await fs.stat(dirFac).catch(() => null);
      if (!statFac?.isDirectory()) continue;

      const archivos = await fs.readdir(dirFac);
      for (const arch of archivos) {
        if (!arch.endsWith(".md")) continue;
        const ruta = path.join(dirFac, arch);
        try {
          const contenido = await fs.readFile(ruta, "utf-8");
          examenes.push(parseExamenMD(contenido));
        } catch (err) {
          console.error(`[axiom-banco] Error parseando ${ruta}:`, err);
        }
      }
    }
  }

  cacheExamenes = examenes;
  cacheTimestamp = ahora;
  return examenes;
}

export async function cargarExamen(id: string): Promise<ExamenBanco | null> {
  const banco = await cargarBanco();
  return banco.find((e) => e.id === id) ?? null;
}

export async function listarMetadata(): Promise<ExamenMetadata[]> {
  const banco = await cargarBanco();
  return banco.map((e) => ({
    id: e.id,
    universidad: e.universidad,
    facultad: e.facultad,
    anio: e.anio,
    fecha_examen: e.fecha_examen,
    duracion_minutos: e.duracion_minutos,
    total_preguntas: e.preguntas.length,
    opcion: e.opcion,
    titulo: e.titulo,
    categoria: e.categoria,
    secciones_pendientes: e.secciones_pendientes,
    // Las secciones declaradas pero todavía sin transcribir se suman acá con
    // cantidad 0, para que el listado muestre el examen COMPLETO de esa
    // gestión. Si solo se resumieran las preguntas que hay, una materia que el
    // examen sí tomó desaparecería del resumen sin que nadie se entere.
    areas_resumen: resumirAreasConPendientes(e),
  }));
}

export async function listarFacultades(universidad: string): Promise<string[]> {
  const banco = await cargarBanco();
  const set = new Set<string>();
  for (const e of banco) {
    if (e.universidad.toLowerCase() === universidad.toLowerCase()) {
      set.add(e.facultad);
    }
  }
  return Array.from(set).sort();
}

export async function listarTemas(
  universidad: string,
  facultad: string
): Promise<{ tema: string; area: string; cantidad: number }[]> {
  const banco = await cargarBanco();
  const conteo = new Map<string, { tema: string; area: string; cantidad: number }>();
  for (const e of banco) {
    if (
      e.universidad.toLowerCase() !== universidad.toLowerCase() ||
      e.facultad.toLowerCase() !== facultad.toLowerCase()
    ) continue;
    for (const p of e.preguntas) {
      const key = `${p.area}::${p.tema}`;
      const prev = conteo.get(key);
      if (prev) prev.cantidad++;
      else conteo.set(key, { tema: p.tema, area: p.area, cantidad: 1 });
    }
  }
  return Array.from(conteo.values()).sort((a, b) => b.cantidad - a.cantidad);
}

function resumirAreas(preguntas: PreguntaBanco[]): { area: string; cantidad: number }[] {
  const conteo = new Map<string, number>();
  for (const p of preguntas) {
    conteo.set(p.area, (conteo.get(p.area) ?? 0) + 1);
  }
  return Array.from(conteo.entries())
    .map(([area, cantidad]) => ({ area, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad);
}

// El resumen de áreas del examen, contando también las que se declararon
// pendientes (cantidad 0). El orden pone primero las que tienen preguntas y
// deja las pendientes al final, que es como se leen: "esto podés rendir, esto
// todavía no".
function resumirAreasConPendientes(e: ExamenBanco): { area: string; cantidad: number }[] {
  const conPreguntas = resumirAreas(e.preguntas);
  const yaEstan = new Set(conPreguntas.map((a) => a.area));
  const pendientes = Object.keys(e.secciones_pendientes ?? {})
    .filter((area) => !yaEstan.has(area))
    .map((area) => ({ area, cantidad: 0 }));
  return [...conPreguntas, ...pendientes];
}

export function invalidarCache(): void {
  cacheExamenes = null;
  cacheTimestamp = 0;
}

