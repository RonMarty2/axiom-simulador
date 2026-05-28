// Capa de datos para Axiom — Supabase backend
//
// Estrategia:
//   - Si Supabase está configurado (env vars presentes), usa Supabase.
//   - Si no, fallback a JSON files (modo dev sin BD).
// La API publica de este modulo NO cambia: el resto del codigo no se entera.

import fs from "fs/promises";
import path from "path";
import { supabaseAdmin, supabaseConfigurado } from "@/lib/supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const SEED_DIR = path.join(DATA_DIR, "seed");

// ─────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────

export type FacultadId = "economicas" | "ingenieria" | "medicina" | "derecho";
export type PlanId = "gratis" | "pro" | "premium";
export type EstadoPago = "pendiente" | "aprobado" | "rechazado";
export type MetodoPago = "tigo_money" | "qr_bancario" | "transferencia";

export interface Facultad {
  id: FacultadId;
  nombre: string;
  nombre_corto: string;
  color: string;
  color_secundario: string;
  emoji: string;
  descripcion: string;
  areas: string[];
  ponderacion: Record<string, number>;
  duracion_minutos: number;
  preguntas_examen: number;
  ano_inicio_banco: number;
}

export interface Materia {
  id: string;
  nombre: string;
  area: string;
  libros_referencia: string[];
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  facultad_objetivo: FacultadId | null;
  plan: PlanId;
  fecha_registro: string;
  examenes_completados: number;
  mejor_nota: number;
  nota_promedio: number;
  avatar_color: string;
  plan_vence?: string | null;   // fecha (YYYY-MM-DD) hasta la que la facultad activa está pagada (derivado)
  suscripciones?: SuscripcionActiva[];  // suscripciones activas del usuario (derivado en getCurrentUser)
}

// Suscripción a una facultad. Cada facultad es un producto mensual independiente
// con su propia fecha de vencimiento. Un usuario puede tener varias activas.
export interface SuscripcionActiva {
  facultad: FacultadId;
  vence: string;   // YYYY-MM-DD
}

export type TipoPago = "plan" | "cambio_facultad";

export interface Pago {
  id: string;
  usuario_id: string;
  tipo: TipoPago;
  plan: PlanId | null;            // null cuando tipo=cambio_facultad
  destino_facultad?: FacultadId | null;
  monto: number;
  moneda: "BOB";
  metodo: MetodoPago;
  estado: EstadoPago;
  fecha: string;
  referencia: string;
  valido_hasta: string | null;
  motivo_rechazo?: string;
}

export interface HistorialExamen {
  id: string;
  usuario_id: string;
  facultad: FacultadId;
  fecha: string;
  modo: string;
  anio_examen?: number;
  tema?: string;
  nota: number;
  correctas: number;
  incorrectas: number;
  sin_responder: number;
  tiempo_segundos: number;
  desglose: Record<string, number>;
  simulador_id?: string;            // para volver a abrir la resolución
}

// ─────────────────────────────────────────────────────────────
// FALLBACK CACHE (solo si NO hay Supabase)
// ─────────────────────────────────────────────────────────────

let _facultades: Facultad[] | null = null;
let _materias: Record<string, Materia[]> | null = null;
let _usuarios: Usuario[] | null = null;
let _pagos: Pago[] | null = null;
let _historial: HistorialExamen[] | null = null;

async function loadJson<T>(file: string): Promise<T> {
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw) as T;
}

function db() {
  return supabaseAdmin();
}

// ─────────────────────────────────────────────────────────────
// FACULTADES
// ─────────────────────────────────────────────────────────────

export async function getFacultades(): Promise<Facultad[]> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("facultades").select("*").order("nombre_corto");
    if (error) throw error;
    return (data ?? []) as Facultad[];
  }
  if (!_facultades) {
    _facultades = await loadJson<Facultad[]>(path.join(DATA_DIR, "facultades.json"));
  }
  return _facultades;
}

export async function getFacultad(id: string): Promise<Facultad | null> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("facultades").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return (data ?? null) as Facultad | null;
  }
  const fs = await getFacultades();
  return fs.find((f) => f.id === id) ?? null;
}

export async function actualizarFacultad(id: string, updates: Partial<Facultad>): Promise<Facultad | null> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("facultades").update(updates).eq("id", id).select().maybeSingle();
    if (error) throw error;
    return (data ?? null) as Facultad | null;
  }
  // Modo dev sin Supabase: persistir en facultades.json para que el cambio sobreviva.
  const todas = await getFacultades();
  const idx = todas.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  todas[idx] = { ...todas[idx], ...updates };
  _facultades = todas;
  await fs.writeFile(path.join(DATA_DIR, "facultades.json"), JSON.stringify(todas, null, 2), "utf-8");
  return todas[idx];
}

// ─────────────────────────────────────────────────────────────
// MATERIAS
// ─────────────────────────────────────────────────────────────

export async function getMaterias(): Promise<Record<string, Materia[]>> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("materias").select("*").order("nombre");
    if (error) throw error;
    const out: Record<string, Materia[]> = {};
    for (const m of data ?? []) {
      const facId = (m as { facultad_id: string }).facultad_id;
      (out[facId] ??= []).push({
        id: m.id,
        nombre: m.nombre,
        area: m.area,
        libros_referencia: m.libros_referencia ?? [],
      });
    }
    return out;
  }
  if (!_materias) {
    _materias = await loadJson<Record<string, Materia[]>>(path.join(DATA_DIR, "materias.json"));
  }
  return _materias;
}

export async function getMateriasFacultad(facultadId: string): Promise<Materia[]> {
  if (supabaseConfigurado()) {
    const { data, error } = await db()
      .from("materias")
      .select("id,nombre,area,libros_referencia")
      .eq("facultad_id", facultadId)
      .order("nombre");
    if (error) throw error;
    return (data ?? []).map((m) => ({
      id: m.id,
      nombre: m.nombre,
      area: m.area,
      libros_referencia: m.libros_referencia ?? [],
    }));
  }
  const m = await getMaterias();
  return m[facultadId] ?? [];
}

// ─────────────────────────────────────────────────────────────
// USUARIOS
// ─────────────────────────────────────────────────────────────

export async function getUsuarios(): Promise<Usuario[]> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("usuarios").select("*").order("creado_en", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Usuario[];
  }
  if (!_usuarios) {
    _usuarios = await loadJson<Usuario[]>(path.join(SEED_DIR, "users.json"));
  }
  return _usuarios;
}

export async function getUsuario(id: string): Promise<Usuario | null> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("usuarios").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return (data ?? null) as Usuario | null;
  }
  const u = await getUsuarios();
  return u.find((x) => x.id === id) ?? null;
}

export async function getUsuarioByEmail(email: string): Promise<Usuario | null> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("usuarios").select("*").ilike("email", email).maybeSingle();
    if (error) throw error;
    return (data ?? null) as Usuario | null;
  }
  const u = await getUsuarios();
  return u.find((x) => x.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function crearUsuario(data: Omit<Usuario, "id" | "examenes_completados" | "mejor_nota" | "nota_promedio">): Promise<Usuario> {
  const id = `u-${Date.now().toString(36)}`;
  const nuevo: Usuario = {
    ...data,
    id,
    examenes_completados: 0,
    mejor_nota: 0,
    nota_promedio: 0,
  };
  if (supabaseConfigurado()) {
    const { data: inserted, error } = await db().from("usuarios").insert(nuevo).select().single();
    if (error) throw error;
    return inserted as Usuario;
  }
  const u = await getUsuarios();
  u.push(nuevo);
  return nuevo;
}

export async function actualizarUsuario(id: string, updates: Partial<Usuario>): Promise<Usuario | null> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("usuarios").update(updates).eq("id", id).select().maybeSingle();
    if (error) throw error;
    return (data ?? null) as Usuario | null;
  }
  const u = await getUsuarios();
  const idx = u.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  u[idx] = { ...u[idx], ...updates };
  return u[idx];
}

// ─────────────────────────────────────────────────────────────
// SUSCRIPCIONES (una por facultad, vencimiento independiente)
// ─────────────────────────────────────────────────────────────

interface SuscripcionRow {
  usuario_id: string;
  facultad: FacultadId;
  vence: string; // YYYY-MM-DD
}

// Fallback en memoria (dev sin Supabase).
const _suscripciones: SuscripcionRow[] = [];

function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function sumarMeses(fechaISO: string, meses: number): string {
  const d = new Date(fechaISO + "T00:00:00");
  d.setMonth(d.getMonth() + meses);
  return d.toISOString().slice(0, 10);
}

export async function getSuscripcionesActivas(usuarioId: string): Promise<SuscripcionActiva[]> {
  const hoy = hoyISO();
  if (supabaseConfigurado()) {
    const { data, error } = await db()
      .from("suscripciones")
      .select("facultad,vence")
      .eq("usuario_id", usuarioId)
      .gte("vence", hoy)
      .order("vence", { ascending: false });
    if (error) throw error;
    return (data ?? []) as SuscripcionActiva[];
  }
  return _suscripciones
    .filter((s) => s.usuario_id === usuarioId && s.vence >= hoy)
    .map((s) => ({ facultad: s.facultad, vence: s.vence }));
}

// Crea o extiende la suscripción a una facultad. Si ya está activa, suma los
// meses a partir de su vencimiento actual; si está vencida o no existe, desde hoy.
export async function agregarOExtenderSuscripcion(
  usuarioId: string,
  facultad: FacultadId,
  meses = 1
): Promise<SuscripcionActiva> {
  const hoy = hoyISO();
  if (supabaseConfigurado()) {
    const { data: existente } = await db()
      .from("suscripciones")
      .select("vence")
      .eq("usuario_id", usuarioId)
      .eq("facultad", facultad)
      .maybeSingle();
    const base = existente && (existente as { vence: string }).vence >= hoy
      ? (existente as { vence: string }).vence
      : hoy;
    const vence = sumarMeses(base, meses);
    const { error } = await db()
      .from("suscripciones")
      .upsert({ usuario_id: usuarioId, facultad, vence }, { onConflict: "usuario_id,facultad" });
    if (error) throw error;
    return { facultad, vence };
  }
  const idx = _suscripciones.findIndex((s) => s.usuario_id === usuarioId && s.facultad === facultad);
  const base = idx !== -1 && _suscripciones[idx].vence >= hoy ? _suscripciones[idx].vence : hoy;
  const vence = sumarMeses(base, meses);
  if (idx !== -1) _suscripciones[idx].vence = vence;
  else _suscripciones.push({ usuario_id: usuarioId, facultad, vence });
  return { facultad, vence };
}

export async function eliminarSuscripcion(usuarioId: string, facultad: FacultadId): Promise<void> {
  if (supabaseConfigurado()) {
    const { error } = await db()
      .from("suscripciones")
      .delete()
      .eq("usuario_id", usuarioId)
      .eq("facultad", facultad);
    if (error) throw error;
    return;
  }
  const idx = _suscripciones.findIndex((s) => s.usuario_id === usuarioId && s.facultad === facultad);
  if (idx !== -1) _suscripciones.splice(idx, 1);
}

// ─────────────────────────────────────────────────────────────
// PAGOS
// ─────────────────────────────────────────────────────────────

export async function getPagos(): Promise<Pago[]> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("pagos").select("*").order("fecha", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Pago[];
  }
  if (!_pagos) {
    _pagos = await loadJson<Pago[]>(path.join(SEED_DIR, "payments.json"));
  }
  return _pagos;
}

export async function getPagosUsuario(usuarioId: string): Promise<Pago[]> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("pagos").select("*").eq("usuario_id", usuarioId).order("fecha", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Pago[];
  }
  const p = await getPagos();
  return p.filter((x) => x.usuario_id === usuarioId);
}

export async function crearPago(data: Omit<Pago, "id" | "fecha" | "estado" | "valido_hasta">): Promise<Pago> {
  const nuevo: Pago = {
    ...data,
    tipo: data.tipo ?? "plan",
    id: `p-${Date.now().toString(36)}`,
    fecha: new Date().toISOString().slice(0, 10),
    estado: "pendiente",
    valido_hasta: null,
  };
  if (supabaseConfigurado()) {
    const { data: inserted, error } = await db().from("pagos").insert(nuevo).select().single();
    if (error) throw error;
    return inserted as Pago;
  }
  const p = await getPagos();
  p.push(nuevo);
  return nuevo;
}

export async function actualizarPago(id: string, updates: Partial<Pago>): Promise<Pago | null> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("pagos").update(updates).eq("id", id).select().maybeSingle();
    if (error) throw error;
    return (data ?? null) as Pago | null;
  }
  const p = await getPagos();
  const idx = p.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  p[idx] = { ...p[idx], ...updates };
  return p[idx];
}

// ─────────────────────────────────────────────────────────────
// HISTORIAL
// ─────────────────────────────────────────────────────────────

export async function getHistorial(): Promise<HistorialExamen[]> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("historial").select("*").order("fecha", { ascending: false });
    if (error) throw error;
    return (data ?? []) as HistorialExamen[];
  }
  if (!_historial) {
    _historial = await loadJson<HistorialExamen[]>(path.join(SEED_DIR, "historial.json"));
  }
  return _historial;
}

export async function getHistorialUsuario(usuarioId: string): Promise<HistorialExamen[]> {
  if (supabaseConfigurado()) {
    const { data, error } = await db().from("historial").select("*").eq("usuario_id", usuarioId).order("fecha", { ascending: false });
    if (error) throw error;
    return (data ?? []) as HistorialExamen[];
  }
  const h = await getHistorial();
  return h.filter((x) => x.usuario_id === usuarioId).sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export async function agregarHistorial(item: Omit<HistorialExamen, "id" | "fecha">): Promise<HistorialExamen> {
  const nuevo: HistorialExamen = {
    ...item,
    id: `h-${Date.now().toString(36)}`,
    fecha: new Date().toISOString(),
  };
  if (supabaseConfigurado()) {
    const { data: inserted, error } = await db().from("historial").insert(nuevo).select().single();
    if (error) throw error;
    return inserted as HistorialExamen;
  }
  const h = await getHistorial();
  h.push(nuevo);
  return nuevo;
}

// ─────────────────────────────────────────────────────────────
// ESTADÍSTICAS GLOBALES (para dashboard admin)
// ─────────────────────────────────────────────────────────────

export async function getEstadisticasGlobales() {
  const [usuarios, pagos, historial, facultades] = await Promise.all([
    getUsuarios(),
    getPagos(),
    getHistorial(),
    getFacultades(),
  ]);

  const ingresoTotal = pagos.filter((p) => p.estado === "aprobado").reduce((s, p) => s + Number(p.monto), 0);
  const pagosPendientes = pagos.filter((p) => p.estado === "pendiente").length;
  const usuariosPremium = usuarios.filter((u) => u.plan === "premium").length;
  const usuariosPro = usuarios.filter((u) => u.plan === "pro").length;
  const usuariosGratis = usuarios.filter((u) => u.plan === "gratis").length;

  const hoy = new Date().toISOString().slice(0, 10);
  const examenesHoy = historial.filter((h) => h.fecha.startsWith(hoy)).length;

  const notaPromedioGlobal = historial.length > 0
    ? Math.round(historial.reduce((s, h) => s + h.nota, 0) / historial.length)
    : 0;

  const porFacultad = facultades.map((f) => ({
    id: f.id,
    nombre: f.nombre_corto,
    color: f.color,
    usuarios: usuarios.filter((u) => u.facultad_objetivo === f.id).length,
    examenes: historial.filter((h) => h.facultad === f.id).length,
  }));

  return {
    total_usuarios: usuarios.length,
    usuarios_gratis: usuariosGratis,
    usuarios_pro: usuariosPro,
    usuarios_premium: usuariosPremium,
    ingreso_total_bob: ingresoTotal,
    pagos_pendientes: pagosPendientes,
    total_examenes_completados: historial.length,
    examenes_hoy: examenesHoy,
    nota_promedio_global: notaPromedioGlobal,
    total_facultades: facultades.length,
    por_facultad: porFacultad,
  };
}
