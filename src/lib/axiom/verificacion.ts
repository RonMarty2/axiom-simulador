import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Registro de qué exámenes del banco están contrastados contra su facsímil.
// Vive en data/registro-verificacion.json; lo escribe el agente `auditor-facsimil`
// (o Ronald a mano). Un examen que no está ahí NO se asume verificado: la app
// solo muestra el examen digitalizado completo y el PDF de los que sí lo están.

export const NIVELES = [
  "ninguna",
  "resuelto-a-ciegas",
  "contra-facsimil",
  "contra-resolucion-externa",
  "clave-oficial",
] as const;
export type NivelVerificacion = (typeof NIVELES)[number];

export interface EntradaVerificacion {
  /** id del examen en el banco (el de ExamenBanco.id, p. ej. "umss-ingenieria-2012-..."). */
  id: string;
  nivel: NivelVerificacion;
  fecha: string;
  /** PDF o foto de origen (nombre dentro de "examenes pasados/") y páginas contrastadas. */
  fuente: { archivo: string; paginas: string };
  /** true si el examen está entero (sin `faltantes` ni `secciones_pendientes`). */
  completo: boolean;
  notas?: string;
}

/** La clave es la misma que usa scripts/registro-examenes.mjs: "facultad/archivo-sin-md". */
export type RegistroVerificacion = Record<string, EntradaVerificacion>;

const RUTA = join(process.cwd(), "data", "registro-verificacion.json");

export function leerRegistro(): RegistroVerificacion {
  if (!existsSync(RUTA)) return {};
  return JSON.parse(readFileSync(RUTA, "utf8")) as RegistroVerificacion;
}

/** Nivel mínimo para mostrar el examen digitalizado y ofrecer el PDF. */
const NIVEL_MINIMO: NivelVerificacion = "contra-facsimil";

export function cumpleNivelMinimo(nivel: NivelVerificacion): boolean {
  return NIVELES.indexOf(nivel) >= NIVELES.indexOf(NIVEL_MINIMO);
}

/** ids del banco que se pueden mostrar: contrastados contra el facsímil y completos. */
export function idsVerificados(registro: RegistroVerificacion = leerRegistro()): Set<string> {
  const ids = new Set<string>();
  for (const e of Object.values(registro)) {
    if (e.completo && cumpleNivelMinimo(e.nivel)) ids.add(e.id);
  }
  return ids;
}

export function estaVerificado(idExamen: string): boolean {
  return idsVerificados().has(idExamen);
}
