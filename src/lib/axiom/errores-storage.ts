// Helpers client-side para guardar/leer errores del estudiante en localStorage.
// Persiste hasta 50 errores ordenados por fecha desc (más recientes primero).
// Sirve para alimentar el modo "mis_errores" y para que la IA priorice
// los temas más fallados al generar nuevos exámenes.

import type { PreguntaBanco } from "./types";

const STORAGE_KEY = "axiom_errores_v1";
const MAX_ERRORES = 50;

export interface ErrorGuardado {
  pregunta: PreguntaBanco;
  respuesta_elegida?: string;
  fecha: string;            // ISO
  simulador_id?: string;
}

function inWindow(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function guardarErroresDeSimulador(
  preguntas: PreguntaBanco[],
  respuestas: Record<string, string>,
  simuladorId?: string
): number {
  if (!inWindow()) return 0;

  const fecha = new Date().toISOString();
  const nuevas: ErrorGuardado[] = preguntas
    .filter((p) => respuestas[p.id] !== p.respuesta_correcta)
    .map((p) => ({
      pregunta: p,
      respuesta_elegida: respuestas[p.id],
      fecha,
      simulador_id: simuladorId,
    }));

  if (nuevas.length === 0) return 0;

  try {
    const previas = obtenerErroresGuardados();
    const mapa = new Map<string, ErrorGuardado>();
    for (const e of previas) mapa.set(e.pregunta.id, e);
    for (const e of nuevas) mapa.set(e.pregunta.id, e); // sobrescribe si ya existía
    const todos = Array.from(mapa.values())
      .sort((a, b) => b.fecha.localeCompare(a.fecha))
      .slice(0, MAX_ERRORES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return nuevas.length;
  } catch (e) {
    console.warn("[errores-storage] save failed:", e);
    return 0;
  }
}

export function obtenerErroresGuardados(): ErrorGuardado[] {
  if (!inWindow()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data as ErrorGuardado[];
  } catch {
    return [];
  }
}

/** Top N temas más fallados (ordenados por frecuencia desc). */
export function obtenerTemasReforzar(limite = 5): string[] {
  const errores = obtenerErroresGuardados();
  const contador = new Map<string, number>();
  for (const e of errores) {
    const t = e.pregunta.tema || "general";
    contador.set(t, (contador.get(t) ?? 0) + 1);
  }
  return Array.from(contador.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, limite)
    .map(([tema]) => tema);
}

/** Top N áreas más débiles (matematicas/economicas/verbal/razonamiento). */
export function obtenerAreasDebiles(): { area: string; cantidad: number }[] {
  const errores = obtenerErroresGuardados();
  const contador = new Map<string, number>();
  for (const e of errores) {
    const a = e.pregunta.area || "general";
    contador.set(a, (contador.get(a) ?? 0) + 1);
  }
  return Array.from(contador.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([area, cantidad]) => ({ area, cantidad }));
}

export function limpiarErrores(): void {
  if (!inWindow()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export function contarErrores(): number {
  return obtenerErroresGuardados().length;
}
