import test from "node:test";
import assert from "node:assert/strict";
import { ocultarClave } from "./ocultar-clave.ts";
import type { Simulador } from "./types.ts";

function simulador(estado: Simulador["estado"]): Simulador {
  return {
    id: "s1",
    usuario_id: "u1",
    estado,
    fecha_inicio: "2026-11-04T00:00:00.000Z",
    respuestas_usuario: {},
    preguntas: [
      { id: "p1", respuesta_correcta: "B", explicacion: "porque sí", enunciado: "¿?" },
    ] as unknown as Simulador["preguntas"],
  };
}

test("con el examen activo se quitan la respuesta correcta y la explicación", () => {
  const s = ocultarClave(simulador("activo"));
  assert.equal(s.preguntas?.[0].respuesta_correcta, "");
  assert.equal(s.preguntas?.[0].explicacion, "");
  assert.equal(s.preguntas?.[0].enunciado, "¿?");
});

test("completado tampoco entrega la clave", () => {
  assert.equal(ocultarClave(simulador("completado")).preguntas?.[0].respuesta_correcta, "");
});

test("calificado se entrega completo", () => {
  assert.equal(ocultarClave(simulador("calificado")).preguntas?.[0].respuesta_correcta, "B");
});

test("no muta el simulador original", () => {
  const original = simulador("activo");
  ocultarClave(original);
  assert.equal(original.preguntas?.[0].respuesta_correcta, "B");
});
