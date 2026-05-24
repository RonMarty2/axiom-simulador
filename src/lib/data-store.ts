// Capa de datos para Axiom standalone.
// Lee los JSON de /data y los expone con tipos. Reemplaza axiomDB para
// los nuevos datos (usuarios, pagos, historial, facultades, materias).
// Cuando se conecte BD real (Supabase), reescribir solo este archivo.

import fs from "fs/promises";
import path from "path";

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
  facultad_objetivo: FacultadId;
  plan: PlanId;
  fecha_registro: string;
  examenes_completados: number;
  mejor_nota: number;
  nota_promedio: number;
  avatar_color: string;
}

export interface Pago {
  id: string;
  usuario_id: string;
  plan: PlanId;
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
}

// ─────────────────────────────────────────────────────────────
// CACHE EN MEMORIA (se hidrata en el primer GET)
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

// ─────────────────────────────────────────────────────────────
// FACULTADES Y MATERIAS
// ─────────────────────────────────────────────────────────────

export async function getFacultades(): Promise<Facultad[]> {
  if (!_facultades) {
    _facultades = await loadJson<Facultad[]>(path.join(DATA_DIR, "facultades.json"));
  }
  return _facultades;
}

export async function getFacultad(id: string): Promise<Facultad | null> {
  const fs = await getFacultades();
  return fs.find((f) => f.id === id) ?? null;
}

export async function getMaterias(): Promise<Record<string, Materia[]>> {
  if (!_materias) {
    _materias = await loadJson<Record<string, Materia[]>>(path.join(DATA_DIR, "materias.json"));
  }
  return _materias;
}

export async function getMateriasFacultad(facultadId: string): Promise<Materia[]> {
  const m = await getMaterias();
  return m[facultadId] ?? [];
}

// ─────────────────────────────────────────────────────────────
// USUARIOS
// ─────────────────────────────────────────────────────────────

export async function getUsuarios(): Promise<Usuario[]> {
  if (!_usuarios) {
    _usuarios = await loadJson<Usuario[]>(path.join(SEED_DIR, "users.json"));
  }
  return _usuarios;
}

export async function getUsuario(id: string): Promise<Usuario | null> {
  const u = await getUsuarios();
  return u.find((x) => x.id === id) ?? null;
}

export async function getUsuarioByEmail(email: string): Promise<Usuario | null> {
  const u = await getUsuarios();
  return u.find((x) => x.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function crearUsuario(data: Omit<Usuario, "id" | "examenes_completados" | "mejor_nota" | "nota_promedio">): Promise<Usuario> {
  const u = await getUsuarios();
  const nuevo: Usuario = {
    ...data,
    id: `u-${Date.now().toString(36)}`,
    examenes_completados: 0,
    mejor_nota: 0,
    nota_promedio: 0,
  };
  u.push(nuevo);
  return nuevo;
}

// ─────────────────────────────────────────────────────────────
// PAGOS
// ─────────────────────────────────────────────────────────────

export async function getPagos(): Promise<Pago[]> {
  if (!_pagos) {
    _pagos = await loadJson<Pago[]>(path.join(SEED_DIR, "payments.json"));
  }
  return _pagos;
}

export async function getPagosUsuario(usuarioId: string): Promise<Pago[]> {
  const p = await getPagos();
  return p.filter((x) => x.usuario_id === usuarioId);
}

export async function crearPago(data: Omit<Pago, "id" | "fecha" | "estado" | "valido_hasta">): Promise<Pago> {
  const p = await getPagos();
  const nuevo: Pago = {
    ...data,
    id: `p-${Date.now().toString(36)}`,
    fecha: new Date().toISOString(),
    estado: "pendiente",
    valido_hasta: null,
  };
  p.push(nuevo);
  return nuevo;
}

export async function actualizarPago(id: string, updates: Partial<Pago>): Promise<Pago | null> {
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
  if (!_historial) {
    _historial = await loadJson<HistorialExamen[]>(path.join(SEED_DIR, "historial.json"));
  }
  return _historial;
}

export async function getHistorialUsuario(usuarioId: string): Promise<HistorialExamen[]> {
  const h = await getHistorial();
  return h.filter((x) => x.usuario_id === usuarioId).sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export async function agregarHistorial(item: Omit<HistorialExamen, "id" | "fecha">): Promise<HistorialExamen> {
  const h = await getHistorial();
  const nuevo: HistorialExamen = {
    ...item,
    id: `h-${Date.now().toString(36)}`,
    fecha: new Date().toISOString(),
  };
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

  const ingresoTotal = pagos.filter((p) => p.estado === "aprobado").reduce((s, p) => s + p.monto, 0);
  const pagosPendientes = pagos.filter((p) => p.estado === "pendiente").length;
  const usuariosPremium = usuarios.filter((u) => u.plan === "premium").length;
  const usuariosPro = usuarios.filter((u) => u.plan === "pro").length;
  const usuariosGratis = usuarios.filter((u) => u.plan === "gratis").length;

  const hoy = new Date().toISOString().slice(0, 10);
  const examenesHoy = historial.filter((h) => h.fecha.startsWith(hoy)).length;

  const notaPromedioGlobal = historial.length > 0
    ? Math.round(historial.reduce((s, h) => s + h.nota, 0) / historial.length)
    : 0;

  // Distribución por facultad
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
