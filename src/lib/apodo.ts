// Apodo público del ranking (decisión de Ronald, 6-nov-2026: hay alumnos
// menores, el ranking NO muestra el nombre real). Sin apodo se ve anónimo.

export const NOMBRE_ANONIMO = "Alumno anónimo";
export const APODO_MIN = 3;
export const APODO_MAX = 20;

// Letras (con tildes y ñ), números, espacio, punto, guion y guion bajo.
const PERMITIDOS = /^[\p{L}\p{N} ._-]+$/u;

export type ResultadoApodo = { ok: true; apodo: string | null } | { ok: false; error: string };

/** Limpia lo que escribió el alumno. Vacío = quiere salir anónimo. */
export function limpiarApodo(entrada: unknown): ResultadoApodo {
  if (entrada === null || entrada === undefined) return { ok: true, apodo: null };
  if (typeof entrada !== "string") return { ok: false, error: "Apodo no válido." };
  const apodo = entrada.trim().replace(/\s+/g, " ");
  if (apodo === "") return { ok: true, apodo: null };
  if (apodo.length < APODO_MIN || apodo.length > APODO_MAX) {
    return { ok: false, error: `El apodo debe tener entre ${APODO_MIN} y ${APODO_MAX} caracteres.` };
  }
  if (!PERMITIDOS.test(apodo)) {
    return { ok: false, error: "Usa solo letras, números, espacios, punto o guion." };
  }
  if (apodo.toLowerCase() === NOMBRE_ANONIMO.toLowerCase()) return { ok: true, apodo: null };
  return { ok: true, apodo };
}

/** Lo que se muestra en el ranking: el apodo, o anónimo si no eligió uno. */
export function nombrePublico(apodo: string | null | undefined): string {
  const a = typeof apodo === "string" ? apodo.trim() : "";
  return a || NOMBRE_ANONIMO;
}
