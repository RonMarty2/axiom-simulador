// Errores del estudiante guardados por usuario (Supabase + fallback en memoria
// para desarrollo sin base). Reemplaza el almacenamiento en localStorage para
// que "Mis errores" funcione en cualquier dispositivo.
// Desde el 29-oct cada error lleva su repaso (caja, proximo, dominada_en): ver repaso.ts y migration-007.

import { supabaseAdmin, supabaseConfigurado } from "@/lib/supabase";
import type { PreguntaBanco } from "./types";
import { esRespuestaCorrecta } from "./respuestas";
import { programar, type EstadoRepaso } from "./repaso";

export interface ErrorRow {
  id: string;
  usuario_id: string;
  pregunta_id: string;
  pregunta: PreguntaBanco;
  respuesta_elegida?: string | null;
  area: string;
  tema: string;
  simulador_id?: string | null;
  veces: number;
  fecha: string;
  // repaso (migration-007). Pueden faltar si la migracion todavia no se aplico.
  caja?: number;
  proximo?: string;
  dominada_en?: string | null;
}

// Fallback en memoria (solo dev sin Supabase; no persiste entre procesos).
const memoria = new Map<string, ErrorRow[]>();

function db() { return supabaseAdmin(); }

const estadoDe = (e: ErrorRow | undefined): EstadoRepaso | null =>
  e ? { caja: e.caja ?? 0, proximo: e.proximo ?? e.fecha, dominada_en: e.dominada_en ?? null } : null;

/** filas a escribir despues de un examen: las falladas (nuevas o de vuelta a la caja 0) y las acertadas que ya
 *  estaban guardadas y les tocaba repasar (suben de caja o quedan dominadas). Lo demas no se toca. */
export function filasDespuesDeExamen(
  usuarioId: string,
  preguntas: PreguntaBanco[],
  respuestas: Record<string, string>,
  previas: Map<string, ErrorRow>,
  ahora: Date,
  simuladorId?: string
): ErrorRow[] {
  const filas: ErrorRow[] = [];
  for (const p of preguntas) {
    const acierto = esRespuestaCorrecta(p, respuestas[p.id]);
    const prev = previas.get(p.id);
    const antes = estadoDe(prev);
    const despues = programar(antes, acierto, ahora);
    if (!despues || despues === antes) continue;
    filas.push({
      id: `err-${usuarioId}-${p.id}`,
      usuario_id: usuarioId,
      pregunta_id: p.id,
      pregunta: p,
      respuesta_elegida: acierto ? (prev?.respuesta_elegida ?? null) : (respuestas[p.id] ?? null),
      area: p.area,
      tema: p.tema,
      simulador_id: acierto ? (prev?.simulador_id ?? null) : (simuladorId ?? null),
      veces: (prev?.veces ?? 0) + (acierto ? 0 : 1),
      fecha: acierto ? (prev?.fecha ?? ahora.toISOString()) : ahora.toISOString(),
      ...despues,
    });
  }
  return filas;
}

// columnas de la migracion 007: si la base todavia no las tiene, se guarda como antes (sin repaso)
const SIN_REPASO = (f: ErrorRow) => {
  const { caja: _c, proximo: _p, dominada_en: _d, ...resto } = f;
  void _c; void _p; void _d;
  return resto;
};
const faltaColumna = (e: { code?: string; message?: string } | null) =>
  !!e && (e.code === "42703" || e.code === "PGRST204" || /column .*(caja|proximo|dominada_en)/i.test(e.message ?? ""));

/** al cerrar un examen: guarda lo fallado y avanza el repaso de lo acertado. Devuelve cuantas filas cambio. */
export async function actualizarErrores(
  usuarioId: string,
  preguntas: PreguntaBanco[],
  respuestas: Record<string, string>,
  simuladorId?: string
): Promise<number> {
  if (preguntas.length === 0) return 0;
  const ahora = new Date();

  if (supabaseConfigurado()) {
    const { data: existentes } = await db()
      .from("errores")
      .select("*")
      .eq("usuario_id", usuarioId)
      .in("pregunta_id", preguntas.map((p) => p.id));
    const previas = new Map(((existentes ?? []) as ErrorRow[]).map((e) => [e.pregunta_id, e]));
    let filas = filasDespuesDeExamen(usuarioId, preguntas, respuestas, previas, ahora, simuladorId);
    if (filas.length === 0) return 0;
    let { error } = await db().from("errores").upsert(filas, { onConflict: "usuario_id,pregunta_id" });
    if (faltaColumna(error)) {
      // sin la migracion 007 solo se guardan los fallos, como antes
      filas = filas.filter((f) => f.caja === 0);
      ({ error } = await db().from("errores").upsert(filas.map(SIN_REPASO), { onConflict: "usuario_id,pregunta_id" }));
    }
    if (error) throw error;
    return filas.length;
  }

  const previas = new Map((memoria.get(usuarioId) ?? []).map((e) => [e.pregunta_id, e]));
  const filas = filasDespuesDeExamen(usuarioId, preguntas, respuestas, previas, ahora, simuladorId);
  for (const f of filas) previas.set(f.pregunta_id, f);
  memoria.set(usuarioId, Array.from(previas.values()));
  return filas.length;
}

export async function getErroresUsuario(usuarioId: string): Promise<ErrorRow[]> {
  if (supabaseConfigurado()) {
    const { data, error } = await db()
      .from("errores")
      .select("*")
      .eq("usuario_id", usuarioId)
      .order("fecha", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ErrorRow[];
  }
  return (memoria.get(usuarioId) ?? []).slice().sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export async function limpiarErroresUsuario(usuarioId: string): Promise<void> {
  if (supabaseConfigurado()) {
    const { error } = await db().from("errores").delete().eq("usuario_id", usuarioId);
    if (error) throw error;
    return;
  }
  memoria.delete(usuarioId);
}

export function temasReforzarDeErrores(errores: ErrorRow[], limite = 8): string[] {
  const c = new Map<string, number>();
  for (const e of errores) {
    const t = e.tema || "general";
    c.set(t, (c.get(t) ?? 0) + 1);
  }
  return Array.from(c.entries()).sort(([, a], [, b]) => b - a).slice(0, limite).map(([t]) => t);
}
