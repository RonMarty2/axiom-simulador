// Preguntas de "clave de combinación" (Curso Básico de Medicina, UMSS).
//
// Cada pregunta trae un enunciado y 2 o 3 afirmaciones numeradas; las letras no
// son alternativas de texto sino una clave impresa una vez en el examen:
//
//   2 afirmaciones:  A = solo la 1   B = solo la 2   C = ambas   D = ninguna
//   3 afirmaciones:  A = solo la 1   B = solo la 2   C = solo la 3   D = todas   E = ninguna
//
// El .md declara las afirmaciones como `- 1) texto`, y de ahí salen las opciones
// que el resto de la app ya sabe mostrar y corregir (PreguntaBanco.opciones).
// Así el formato es nativo para quien carga el examen y no obliga a tocar cada
// pantalla. La clave de 3 afirmaciones sale del patrón rezagado del Curso Básico;
// si una gestión usa otra, se agrega un esquema acá, no se parchea el examen.

import type { OpcionPregunta } from "./types";

export type EsquemaCombinacion = "dos" | "tres";

const ESQUEMAS: Record<EsquemaCombinacion, OpcionPregunta[]> = {
  dos: [
    { letra: "A", texto: "Solo la afirmación 1 es correcta." },
    { letra: "B", texto: "Solo la afirmación 2 es correcta." },
    { letra: "C", texto: "Ambas afirmaciones son correctas." },
    { letra: "D", texto: "Ninguna afirmación es correcta." },
  ],
  tres: [
    { letra: "A", texto: "Solo la afirmación 1 es correcta." },
    { letra: "B", texto: "Solo la afirmación 2 es correcta." },
    { letra: "C", texto: "Solo la afirmación 3 es correcta." },
    { letra: "D", texto: "Todas las afirmaciones son correctas." },
    { letra: "E", texto: "Ninguna afirmación es correcta." },
  ],
};

export function esquemaPara(cantidadAfirmaciones: number): EsquemaCombinacion {
  if (cantidadAfirmaciones === 2) return "dos";
  if (cantidadAfirmaciones === 3) return "tres";
  throw new Error(`Una pregunta de combinación lleva 2 o 3 afirmaciones (vinieron ${cantidadAfirmaciones})`);
}

export function opcionesDeCombinacion(cantidadAfirmaciones: number): OpcionPregunta[] {
  return ESQUEMAS[esquemaPara(cantidadAfirmaciones)].map((o) => ({ ...o }));
}

// Dado qué afirmaciones son verdaderas (índice 0 = afirmación 1) devuelve la
// letra. Es lo que permite auditar una clave afirmación por afirmación: el
// auditor decide cada verdad y acá se convierte en letra, sin tabla mental.
export function letraDeVeredicto(verdaderas: boolean[]): string {
  const cuantas = verdaderas.filter(Boolean).length;
  if (verdaderas.length === 2) {
    if (cuantas === 2) return "C";
    if (cuantas === 0) return "D";
    return verdaderas[0] ? "A" : "B";
  }
  if (verdaderas.length === 3) {
    if (cuantas === 3) return "D";
    if (cuantas === 0) return "E";
    // Las combinaciones de exactamente 2 verdaderas no existen en esta clave.
    if (cuantas === 2) throw new Error("La clave de 3 afirmaciones no tiene una letra para 'dos de tres'");
    return verdaderas[0] ? "A" : verdaderas[1] ? "B" : "C";
  }
  throw new Error(`Se esperaban 2 o 3 veredictos (vinieron ${verdaderas.length})`);
}
