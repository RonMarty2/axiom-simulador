import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { REFUERZO, type EventoRefuerzo } from "./refuerzo-config.ts";

test("la config de refuerzo no cambió sin querer", () => {
  const esperado: typeof REFUERZO = {
    zonaOffsetMin: -240,
    esfuerzoMinimo: 0.5,
    tope: { porVisita: 2, porDia: 5 },
    prioridad: [
      "retorno_tras_pausa",
      "error_corregido",
      "mejora_area_debil",
      "simulacro_terminado",
    ],
    probabilidad: {
      retorno_tras_pausa: 0.6,
      error_corregido: 0.45,
      mejora_area_debil: 0.7,
      simulacro_terminado: 0.33,
    },
    retorno: { pausaMinDias: 1 },
    mejora: { previosMin: 2, subidaMin: 10, umbralDebil: 60 },
    ventanaDias: 7,
    MIN_USUARIOS_PARA_LEER: 30,
  };
  assert.deepStrictEqual(REFUERZO, esperado);
});

test("toda probabilidad es mayor que 0 y menor que 1", () => {
  for (const [evento, p] of Object.entries(REFUERZO.probabilidad)) {
    assert.ok(p > 0 && p < 1, `probabilidad fuera de (0, 1) para ${evento}: ${p}`);
  }
});

test("el tope por visita no supera el tope por día (visita 2, día 5)", () => {
  assert.equal(REFUERZO.tope.porVisita, 2);
  assert.equal(REFUERZO.tope.porDia, 5);
  assert.ok(REFUERZO.tope.porVisita <= REFUERZO.tope.porDia);
});

test("la lista de prioridad coincide con los eventos que tienen probabilidad", () => {
  const dePrioridad: EventoRefuerzo[] = [...REFUERZO.prioridad];
  const deProbabilidad = Object.keys(REFUERZO.probabilidad) as EventoRefuerzo[];
  assert.deepStrictEqual([...dePrioridad].sort(), [...deProbabilidad].sort());
  assert.equal(new Set(dePrioridad).size, dePrioridad.length);
});

test("la config no menciona plan, precio ni premium", () => {
  const fuente = readFileSync(new URL("./refuerzo-config.ts", import.meta.url), "utf8");
  assert.equal(/\b(plan|precio|precios|premium)\b/i.test(fuente), false);
});
