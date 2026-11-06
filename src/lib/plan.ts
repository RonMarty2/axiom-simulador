// Reglas del modelo freemium en UN SOLO lugar.
//
// Modelo: hay dos niveles reales — GRATIS y PAGO. Cualquier plan distinto de
// "gratis" (pro, premium…) cuenta como pago y desbloquea todo. Así no se rompe
// nada si en el futuro cambian los nombres de los planes de pago.

import type { PlanId, SuscripcionActiva, Usuario } from "@/lib/data-store";

// Límites del plan gratis (por semana, se reinician cada lunes).
export const LIMITE_SEMANAL_PASADAS = 2;        // simulacros de exámenes pasados
export const LIMITE_SEMANAL_PRONOSTICADAS = 2;  // simulacros predictivos (sin IA)

export function diaLaPaz(fechaOISO?: Date | string): string {
  const d = typeof fechaOISO === "string" ? new Date(fechaOISO) : (fechaOISO ?? new Date());
  return new Date(d.getTime() - 14400000).toISOString().slice(0, 10);
}

export function mesLaPaz(fechaOISO?: Date | string): string {
  const d = typeof fechaOISO === "string" ? new Date(fechaOISO) : (fechaOISO ?? new Date());
  return new Date(d.getTime() - 14400000).toISOString().slice(0, 7);
}

export function esPago(plan: PlanId | null | undefined): boolean {
  return plan != null && plan !== "gratis";
}

// ── El plan es POR CARRERA, no global ────────────────────────────────────────
//
// `usuario.plan` se deriva de la facultad que el alumno tiene SELECCIONADA
// (ver aplicarSuscripciones en session.ts). Preguntarle a ese plan si se puede
// abrir contenido de OTRA facultad siempre daba que sí: un premium de
// Económicas leía las soluciones de los 139 exámenes de Ingeniería. Cada
// facultad es un producto mensual aparte — por eso existe el pago
// `cambio_facultad` y por eso /cuenta dice "cambiar de carrera requiere
// comprar el acceso a la nueva".
//
// Regla: para contenido que pertenece a una facultad, el permiso se pregunta
// contra ESA facultad, no contra el plan.
export function tieneSuscripcionA(
  usuario: Pick<Usuario, "suscripciones"> | null | undefined,
  facultad: string | null | undefined,
): boolean {
  if (!usuario || !facultad) return false;
  return (usuario.suscripciones ?? []).some((s: SuscripcionActiva) => s.facultad === facultad);
}

// ── Permisos derivados del plan ───────────────────────────────────────────────

// Paso a paso al NAVEGAR la biblioteca de exámenes pasados (solo pago, y solo
// de la carrera que pagó). Ojo: en los resultados de un simulacro que el alumno
// acaba de rendir, el paso a paso SÍ se muestra a todos (es parte de sus 2
// simulacros gratis por semana).
export function puedeVerResolucionBiblioteca(
  usuario: Pick<Usuario, "suscripciones"> | null | undefined,
  facultadDelExamen: string | null | undefined,
): boolean {
  return tieneSuscripcionA(usuario, facultadDelExamen);
}

// Programa de aprendizaje personalizado con IA (solo pago).
export function puedeProgramaIA(plan: PlanId | null | undefined): boolean {
  return esPago(plan);
}

// Simulacro generado con IA y práctica enfocada en errores (solo pago).
export function puedeSimulacroIA(plan: PlanId | null | undefined): boolean {
  return esPago(plan);
}
export function puedePracticaErrores(plan: PlanId | null | undefined): boolean {
  return esPago(plan);
}

// ── Clasificación de los modos de simulación ──────────────────────────────────

export type CategoriaModo = "pasada" | "pronosticada" | "ia" | "errores";

export function categoriaModo(modo: string): CategoriaModo {
  if (modo === "ia_generado") return "ia";
  if (modo === "mis_errores") return "errores";
  if (modo === "predictivo") return "pronosticada";
  return "pasada"; // examen_real, mixto, por_tema
}

// ── Semana actual (lunes 00:00) como ISO, para contar uso semanal ─────────────

export function inicioSemanaISO(ahora: Date = new Date()): string {
  const dLP = new Date(ahora.getTime() - 4 * 3600000);
  const diaSemana = (dLP.getUTCDay() + 6) % 7;
  const lunesLP = Date.UTC(
    dLP.getUTCFullYear(),
    dLP.getUTCMonth(),
    dLP.getUTCDate() - diaSemana,
    0, 0, 0, 0
  );
  return new Date(lunesLP + 4 * 3600000).toISOString();
}

// Próximo lunes a las 00:00. Útil para decirle al usuario cuándo se renueva
// su cupo semanal del plan gratis.
export function proximoLunes(ahora: Date = new Date()): Date {
  const dLP = new Date(ahora.getTime() - 4 * 3600000);
  const diaSemana = dLP.getUTCDay();
  const diasParaLunes = ((8 - diaSemana) % 7) || 7;
  const proxLunesLP = Date.UTC(
    dLP.getUTCFullYear(),
    dLP.getUTCMonth(),
    dLP.getUTCDate() + diasParaLunes,
    0, 0, 0, 0
  );
  return new Date(proxLunesLP + 4 * 3600000);
}

// Texto amigable: "el lunes 2 de junio".
export function textoProximaRenovacion(ahora: Date = new Date()): string {
  const lunes = proximoLunes(ahora);
  const fecha = new Intl.DateTimeFormat("es-BO", {
    timeZone: "America/La_Paz",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(lunes);
  return `el ${fecha}`;
}
