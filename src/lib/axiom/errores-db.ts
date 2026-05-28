// Errores del estudiante guardados por usuario (Supabase + fallback en memoria
// para desarrollo sin base). Reemplaza el almacenamiento en localStorage para
// que "Mis errores" funcione en cualquier dispositivo.

import { supabaseAdmin, supabaseConfigurado } from "@/lib/supabase";
import type { PreguntaBanco } from "./types";
import { esRespuestaCorrecta } from "./respuestas";

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
}

// Fallback en memoria (solo dev sin Supabase; no persiste entre procesos).
const memoria = new Map<string, ErrorRow[]>();

function db() { return supabaseAdmin(); }

export async function guardarErroresFallados(
  usuarioId: string,
  preguntas: PreguntaBanco[],
  respuestas: Record<string, string>,
  simuladorId?: string
): Promise<number> {
  const fallidas = preguntas.filter((p) => !esRespuestaCorrecta(p, respuestas[p.id]));
  if (fallidas.length === 0) return 0;
  const fecha = new Date().toISOString();

  if (supabaseConfigurado()) {
    const ids = fallidas.map((p) => p.id);
    const { data: existentes } = await db()
      .from("errores")
      .select("pregunta_id,veces")
      .eq("usuario_id", usuarioId)
      .in("pregunta_id", ids);
    const vecesPrev = new Map(
      (existentes ?? []).map((e) => [(e as { pregunta_id: string }).pregunta_id, (e as { veces?: number }).veces ?? 1])
    );
    const rows: ErrorRow[] = fallidas.map((p) => ({
      id: `err-${usuarioId}-${p.id}`,
      usuario_id: usuarioId,
      pregunta_id: p.id,
      pregunta: p,
      respuesta_elegida: respuestas[p.id] ?? null,
      area: p.area,
      tema: p.tema,
      simulador_id: simuladorId ?? null,
      veces: (vecesPrev.get(p.id) ?? 0) + 1,
      fecha,
    }));
    const { error } = await db().from("errores").upsert(rows, { onConflict: "usuario_id,pregunta_id" });
    if (error) throw error;
    return rows.length;
  }

  const prev = memoria.get(usuarioId) ?? [];
  const mapa = new Map(prev.map((e) => [e.pregunta_id, e]));
  for (const p of fallidas) {
    const ex = mapa.get(p.id);
    mapa.set(p.id, {
      id: `err-${usuarioId}-${p.id}`,
      usuario_id: usuarioId,
      pregunta_id: p.id,
      pregunta: p,
      respuesta_elegida: respuestas[p.id],
      area: p.area,
      tema: p.tema,
      simulador_id: simuladorId,
      veces: (ex?.veces ?? 0) + 1,
      fecha,
    });
  }
  memoria.set(usuarioId, Array.from(mapa.values()));
  return fallidas.length;
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
