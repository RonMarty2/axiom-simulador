// Reglas del modelo freemium en UN SOLO lugar.
//
// Modelo: hay dos niveles reales — GRATIS y PAGO. Cualquier plan distinto de
// "gratis" (pro, premium…) cuenta como pago y desbloquea todo. Así no se rompe
// nada si en el futuro cambian los nombres de los planes de pago.

import type { PlanId } from "@/lib/data-store";

// Límites del plan gratis (por semana, se reinician cada lunes).
export const LIMITE_SEMANAL_PASADAS = 2;        // simulacros de exámenes pasados
export const LIMITE_SEMANAL_PRONOSTICADAS = 2;  // simulacros predictivos (sin IA)

export function esPago(plan: PlanId | null | undefined): boolean {
  return plan != null && plan !== "gratis";
}

// ── Permisos derivados del plan ───────────────────────────────────────────────

// Paso a paso al NAVEGAR la biblioteca de exámenes pasados (solo pago).
// Ojo: en los resultados de un simulacro que el alumno acaba de rendir, el paso
// a paso SÍ se muestra a todos (es parte de sus 2 simulacros gratis/semana).
export function puedeVerResolucionBiblioteca(plan: PlanId | null | undefined): boolean {
  return esPago(plan);
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
  const d = new Date(ahora);
  const dia = (d.getDay() + 6) % 7; // 0 = lunes
  d.setDate(d.getDate() - dia);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}
