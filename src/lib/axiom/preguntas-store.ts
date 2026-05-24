// Store de preguntas individuales (CRUD).
// Persiste en data/banco/preguntas-individuales.json.
// Se mezcla con los exámenes .md del banco-loader cuando se arman simulacros.

import fs from "fs/promises";
import path from "path";
import type { PreguntaBanco } from "./types";

// En Vercel el filesystem del repo es read-only. Usamos /tmp en runtime.
// En dev local usamos data/banco/ que sí persiste en el repo.
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
    // En Vercel: seed inicial desde el repo (read-only) hacia /tmp
    let inicial = "[]";
    if (IS_VERCEL) {
      try {
        inicial = await fs.readFile(REPO_FILE, "utf-8");
      } catch {
        inicial = "[]";
      }
    }
    await fs.writeFile(PREGUNTAS_FILE, inicial, "utf-8");
  }
}

async function cargar(): Promise<PreguntaBanco[]> {
  if (cache) return cache;
  await ensureFile();
  const raw = await fs.readFile(PREGUNTAS_FILE, "utf-8");
  cache = JSON.parse(raw) as PreguntaBanco[];
  return cache;
}

async function guardar(preguntas: PreguntaBanco[]): Promise<void> {
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
  const todas = await cargar();
  if (!filtros) return todas;
  return todas.filter((p) => {
    if (filtros.facultad && p.facultad.toLowerCase() !== filtros.facultad.toLowerCase()) return false;
    if (filtros.area && p.area !== filtros.area) return false;
    if (filtros.anio && p.anio !== filtros.anio) return false;
    if (filtros.dificultad && p.dificultad !== filtros.dificultad) return false;
    if (filtros.tipo && (p.tipo ?? "seleccion_simple") !== filtros.tipo) return false;
    if (filtros.busqueda) {
      const q = filtros.busqueda.toLowerCase();
      if (!p.enunciado.toLowerCase().includes(q) && !p.tema.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export async function obtenerPregunta(id: string): Promise<PreguntaBanco | null> {
  const todas = await cargar();
  return todas.find((p) => p.id === id) ?? null;
}

export async function crearPregunta(data: Omit<PreguntaBanco, "id" | "numero">): Promise<PreguntaBanco> {
  const todas = await cargar();
  const mismasFac = todas.filter((p) => p.facultad.toLowerCase() === data.facultad.toLowerCase() && p.anio === data.anio);
  const nueva: PreguntaBanco = {
    ...data,
    id: generarId(data),
    numero: mismasFac.length + 1,
    fecha_creacion: data.fecha_creacion ?? new Date().toISOString(),
    tipo: data.tipo ?? "seleccion_simple",
  };
  todas.push(nueva);
  await guardar(todas);
  return nueva;
}

export async function actualizarPregunta(id: string, updates: Partial<PreguntaBanco>): Promise<PreguntaBanco | null> {
  const todas = await cargar();
  const idx = todas.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  todas[idx] = { ...todas[idx], ...updates };
  await guardar(todas);
  return todas[idx];
}

export async function eliminarPregunta(id: string): Promise<boolean> {
  const todas = await cargar();
  const filtradas = todas.filter((p) => p.id !== id);
  if (filtradas.length === todas.length) return false;
  await guardar(filtradas);
  return true;
}

export async function importarBulk(preguntas: Omit<PreguntaBanco, "id" | "numero">[]): Promise<{ creadas: number; errores: string[] }> {
  const errores: string[] = [];
  let creadas = 0;
  for (const p of preguntas) {
    try {
      await crearPregunta(p);
      creadas++;
    } catch (e) {
      errores.push(e instanceof Error ? e.message : String(e));
    }
  }
  return { creadas, errores };
}

export async function estadisticasBanco() {
  const todas = await cargar();
  const porFacultad: Record<string, number> = {};
  const porTipo: Record<string, number> = {};
  const porDificultad: Record<string, number> = {};
  for (const p of todas) {
    porFacultad[p.facultad] = (porFacultad[p.facultad] ?? 0) + 1;
    const tipo = p.tipo ?? "seleccion_simple";
    porTipo[tipo] = (porTipo[tipo] ?? 0) + 1;
    porDificultad[p.dificultad] = (porDificultad[p.dificultad] ?? 0) + 1;
  }
  return {
    total: todas.length,
    por_facultad: porFacultad,
    por_tipo: porTipo,
    por_dificultad: porDificultad,
  };
}

export function invalidarCache(): void {
  cache = null;
}
