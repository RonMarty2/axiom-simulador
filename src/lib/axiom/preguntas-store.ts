// Store de preguntas individuales (CRUD).
// Con Supabase: persiste en tabla `preguntas`.
// Sin Supabase: fallback a data/banco/preguntas-individuales.json (dev).

import fs from "fs/promises";
import path from "path";
import type { PreguntaBanco } from "./types";
import { supabaseAdmin, supabaseConfigurado } from "@/lib/supabase";

const IS_VERCEL = !!process.env.VERCEL;
const BANCO_DIR = IS_VERCEL
  ? path.join("/tmp", "axiom-banco")
  : path.join(process.cwd(), "data", "banco");
const REPO_FILE = path.join(process.cwd(), "data", "banco", "preguntas-individuales.json");
const PREGUNTAS_FILE = path.join(BANCO_DIR, "preguntas-individuales.json");

let cache: PreguntaBanco[] | null = null;

async function ensureFile(): Promise<void> {
  try {
    await fs.mkdir(BANCO_DIR, { recursive: true });
    await fs.access(PREGUNTAS_FILE);
  } catch {
    let inicial = "[]";
    if (IS_VERCEL) {
      try { inicial = await fs.readFile(REPO_FILE, "utf-8"); } catch { inicial = "[]"; }
    }
    await fs.writeFile(PREGUNTAS_FILE, inicial, "utf-8");
  }
}

async function cargarFallback(): Promise<PreguntaBanco[]> {
  if (cache) return cache;
  await ensureFile();
  const raw = await fs.readFile(PREGUNTAS_FILE, "utf-8");
  cache = JSON.parse(raw) as PreguntaBanco[];
  return cache;
}

async function guardarFallback(preguntas: PreguntaBanco[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(PREGUNTAS_FILE, JSON.stringify(preguntas, null, 2), "utf-8");
  cache = preguntas;
}

function generarId(p: Partial<PreguntaBanco>): string {
  const fac = (p.facultad || "general").toLowerCase().replace(/\s+/g, "-");
  const anio = p.anio ?? new Date().getFullYear();
  const stamp = Date.now().toString(36).slice(-6);
  return `manual-${fac}-${anio}-${stamp}`;
}

function db() { return supabaseAdmin(); }

// ─────────────────────────────────────────────────────────────
// CRUD publico
// ─────────────────────────────────────────────────────────────

export async function listarPreguntas(filtros?: {
  facultad?: string;
  area?: string;
  anio?: number;
  dificultad?: string;
  tipo?: string;
  busqueda?: string;
}): Promise<PreguntaBanco[]> {
  if (supabaseConfigurado()) {
    let q = db().from("preguntas").select("*").order("creado_en", { ascending: false });
    if (filtros?.facultad) q = q.eq("facultad", filtros.facultad);
    if (filtros?.area) q = q.eq("area", filtros.area);
    if (filtros?.anio) q = q.eq("anio", filtros.anio);
    if (filtros?.dificultad) q = q.eq("dificultad", filtros.dificultad);
    if (filtros?.tipo) q = q.eq("tipo", filtros.tipo);
    if (filtros?.busqueda) {
      const term = filtros.busqueda.replace(/%/g, "");
      q = q.or(`enunciado.ilike.%${term}%,tema.ilike.%${term}%`);
    }
    const { data, error } = await q;
    if (error) throw error;
    return (data ?? []) as PreguntaBanco[];
  }
  const todas = await cargarFallback();
  if (!filtros) return todas;
  return todas.filter((p) => {
    if (filtros.facultad && p.facultad.toLowerCase() !== filtros.facultad.toLowerCase()) return false;
    if (filtros.area && p.area !== filtros.area) return false;
    if (filtros.anio && p.anio !== filtros.anio) return false;
    if (filtros.dificultad && p.dificultad !== filtros.dificultad) return false;
    if (filtros.tipo && (p.tipo ?? "seleccion_simple") !== filtros.tipo) return false;
    if (filtros.busqueda) {
      const qb = filtros.busqueda.toLowerCase();
      if (!p.enunciado.toLowerCase().includes(qb) && !p.tema.toLowerCase().includes(qb)) return false;
    }
    return true;
  });
}

export async function obtenerPregunta(id: string): Promise<PreguntaBanco | null> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("preguntas").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return (data ?? null) as PreguntaBanco | null;
  }
  const todas = await cargarFallback();
  return todas.find((p) => p.id === id) ?? null;
}

export async function crearPregunta(data: Omit<PreguntaBanco, "id" | "numero">): Promise<PreguntaBanco> {
  if (supabaseConfigurado()) {
    const { count } = await db()
      .from("preguntas")
      .select("id", { count: "exact", head: true })
      .eq("facultad", data.facultad)
      .eq("anio", data.anio);
    const nueva: PreguntaBanco = {
      ...data,
      id: generarId(data),
      numero: (count ?? 0) + 1,
      fecha_creacion: data.fecha_creacion ?? new Date().toISOString(),
      tipo: data.tipo ?? "seleccion_simple",
    };
    const { data: inserted, error } = await db().from("preguntas").insert(nueva).select().single();
    if (error) throw error;
    return inserted as PreguntaBanco;
  }
  const todas = await cargarFallback();
  const mismasFac = todas.filter((p) => p.facultad.toLowerCase() === data.facultad.toLowerCase() && p.anio === data.anio);
  const nueva: PreguntaBanco = {
    ...data,
    id: generarId(data),
    numero: mismasFac.length + 1,
    fecha_creacion: data.fecha_creacion ?? new Date().toISOString(),
    tipo: data.tipo ?? "seleccion_simple",
  };
  todas.push(nueva);
  await guardarFallback(todas);
  return nueva;
}

export async function actualizarPregunta(id: string, updates: Partial<PreguntaBanco>): Promise<PreguntaBanco | null> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("preguntas").update(updates).eq("id", id).select().maybeSingle();
    if (error) throw error;
    return (data ?? null) as PreguntaBanco | null;
  }
  const todas = await cargarFallback();
  const idx = todas.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  todas[idx] = { ...todas[idx], ...updates };
  await guardarFallback(todas);
  return todas[idx];
}

export async function eliminarPregunta(id: string): Promise<boolean> {
  if (supabaseConfigurado()) {
    const { error, count } = await db().from("preguntas").delete({ count: "exact" }).eq("id", id);
    if (error) throw error;
    return (count ?? 0) > 0;
  }
  const todas = await cargarFallback();
  const filtradas = todas.filter((p) => p.id !== id);
  if (filtradas.length === todas.length) return false;
  await guardarFallback(filtradas);
  return true;
}

export async function importarBulk(preguntas: Omit<PreguntaBanco, "id" | "numero">[]): Promise<{ creadas: number; errores: string[] }> {
  const errores: string[] = [];
  let creadas = 0;
  for (const p of preguntas) {
    try { await crearPregunta(p); creadas++; }
    catch (e) { errores.push(e instanceof Error ? e.message : String(e)); }
  }
  return { creadas, errores };
}

export async function estadisticasBanco() {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("preguntas").select("facultad,tipo,dificultad");
    if (error) throw error;
    const filas = (data ?? []) as { facultad: string; tipo: string | null; dificultad: string }[];
    const porFacultad: Record<string, number> = {};
    const porTipo: Record<string, number> = {};
    const porDificultad: Record<string, number> = {};
    for (const p of filas) {
      porFacultad[p.facultad] = (porFacultad[p.facultad] ?? 0) + 1;
      const tipo = p.tipo ?? "seleccion_simple";
      porTipo[tipo] = (porTipo[tipo] ?? 0) + 1;
      porDificultad[p.dificultad] = (porDificultad[p.dificultad] ?? 0) + 1;
    }
    return { total: filas.length, por_facultad: porFacultad, por_tipo: porTipo, por_dificultad: porDificultad };
  }
  const todas = await cargarFallback();
  const porFacultad: Record<string, number> = {};
  const porTipo: Record<string, number> = {};
  const porDificultad: Record<string, number> = {};
  for (const p of todas) {
    porFacultad[p.facultad] = (porFacultad[p.facultad] ?? 0) + 1;
    const tipo = p.tipo ?? "seleccion_simple";
    porTipo[tipo] = (porTipo[tipo] ?? 0) + 1;
    porDificultad[p.dificultad] = (porDificultad[p.dificultad] ?? 0) + 1;
  }
  return { total: todas.length, por_facultad: porFacultad, por_tipo: porTipo, por_dificultad: porDificultad };
}

export function invalidarCache(): void { cache = null; }
