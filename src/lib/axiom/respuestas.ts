// Lógica pura (sin dependencias de servidor) para calificar respuestas de
// cualquier tipo de pregunta. La usan tanto el evaluador del servidor como las
// pantallas del cliente, para que "qué cuenta como correcto" viva en un solo lugar.

import type { PreguntaBanco } from "./types";

// Separador interno para guardar varias respuestas de llenado en un solo string
// dentro de respuestas_usuario[preguntaId].
export const SEP_LLENADO = "|||";

// Normaliza texto para comparar respuestas de llenado de forma tolerante:
// minúsculas, sin espacios extra y sin tildes (aorta == AORTA == aórta).
export function normalizarTexto(s: string): string {
  return (s ?? "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ");
}

// Cuántos espacios en blanco tiene una pregunta de llenado.
export function cantidadEspacios(p: PreguntaBanco): number {
  return (p.espacios_completar ?? []).length || 1;
}

export function esRespuestaCorrecta(
  p: PreguntaBanco,
  respuesta: string | undefined
): boolean {
  if (respuesta == null || respuesta === "") return false;
  const tipo = p.tipo ?? "seleccion_simple";

  if (tipo === "completar") {
    const esperadas = p.espacios_completar ?? [];
    if (esperadas.length === 0) return false;
    const dadas = respuesta.split(SEP_LLENADO);
    return esperadas.every((e, i) => normalizarTexto(dadas[i] ?? "") === normalizarTexto(e));
  }

  if (tipo === "seleccion_multiple") {
    const norm = (x: string) =>
      x.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean).sort().join(",");
    return norm(respuesta) === norm(p.respuesta_correcta);
  }

  // seleccion_simple, verdadero_falso, abierta…
  return respuesta === p.respuesta_correcta;
}
