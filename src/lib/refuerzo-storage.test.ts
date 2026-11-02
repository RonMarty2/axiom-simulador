import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizarEstado,
  sorpresasDeHoy,
  decisionGuardada,
  aplicarDecision,
} from "./refuerzo-storage.ts";
import type { DecisionRefuerzo } from "./refuerzo.ts";

const PREMIO_1: DecisionRefuerzo = {
  evento: "simulacro_terminado",
  totalSimulacros: 5,
};

const PREMIO_2: DecisionRefuerzo = {
  evento: "mejora_area_debil",
  area: "Matemáticas",
  antes: 40,
  ahora: 58,
};

test("aplicarDecision es idempotente para el mismo simId", () => {
  const ahora = "2026-11-01T15:00:00.000Z";
  const inicial = normalizarEstado(null);
  const primero = aplicarDecision(inicial, "sim-101", PREMIO_1, ahora);
  const segundo = aplicarDecision(primero, "sim-101", PREMIO_2, ahora);

  assert.equal(sorpresasDeHoy(primero, ahora), 1);
  assert.equal(sorpresasDeHoy(segundo, ahora), 1);
  assert.deepStrictEqual(decisionGuardada(segundo, "sim-101"), PREMIO_1);
  assert.equal(segundo.decisiones.length, 1);

  const conNull = aplicarDecision(segundo, "sim-102", null, ahora);
  const conNullRepetido = aplicarDecision(conNull, "sim-102", PREMIO_2, ahora);
  assert.equal(sorpresasDeHoy(conNullRepetido, ahora), 1);
  assert.equal(decisionGuardada(conNullRepetido, "sim-102"), null);
});

test("el contador se reinicia al pasar de día en La Paz", () => {
  const finDia1 = "2026-11-01T03:59:59.000Z"; // 2026-10-31 23:59:59 La Paz
  const inicioDia2 = "2026-11-01T04:00:00.000Z"; // 2026-11-01 00:00:00 La Paz

  let estado = normalizarEstado(null);
  estado = aplicarDecision(estado, "sim-1", PREMIO_1, finDia1);
  estado = aplicarDecision(estado, "sim-2", PREMIO_2, finDia1);
  assert.equal(sorpresasDeHoy(estado, finDia1), 2);
  assert.equal(sorpresasDeHoy(estado, inicioDia2), 0);

  const enDia2 = aplicarDecision(estado, "sim-3", PREMIO_1, inicioDia2);
  assert.equal(sorpresasDeHoy(enDia2, inicioDia2), 1);
  assert.deepStrictEqual(decisionGuardada(enDia2, "sim-1"), PREMIO_1);
  assert.deepStrictEqual(decisionGuardada(enDia2, "sim-3"), PREMIO_1);
});

test("sorpresasDeHoy cuenta solo las de hoy", () => {
  const ayer = "2026-11-01T14:00:00.000Z";
  const hoy = "2026-11-02T14:00:00.000Z";

  let estado = normalizarEstado(null);
  estado = aplicarDecision(estado, "sim-ayer-1", PREMIO_1, ayer);
  estado = aplicarDecision(estado, "sim-ayer-2", null, ayer);
  assert.equal(sorpresasDeHoy(estado, ayer), 1);
  assert.equal(sorpresasDeHoy(estado, hoy), 0);

  estado = aplicarDecision(estado, "sim-hoy-1", null, hoy);
  assert.equal(sorpresasDeHoy(estado, hoy), 0);
  estado = aplicarDecision(estado, "sim-hoy-2", PREMIO_2, hoy);
  assert.equal(sorpresasDeHoy(estado, hoy), 1);
});

test("solo se guardan las últimas 20 decisiones", () => {
  const ahora = "2026-11-01T15:00:00.000Z";
  let estado = normalizarEstado(null);
  for (let i = 1; i <= 25; i++) {
    estado = aplicarDecision(
      estado,
      `sim-${i}`,
      i % 2 === 0 ? PREMIO_1 : null,
      ahora,
    );
  }

  assert.equal(estado.decisiones.length, 20);
  for (let i = 1; i <= 5; i++) {
    assert.equal(decisionGuardada(estado, `sim-${i}`), undefined);
  }
  for (let i = 6; i <= 25; i++) {
    assert.deepStrictEqual(
      decisionGuardada(estado, `sim-${i}`),
      i % 2 === 0 ? PREMIO_1 : null,
    );
  }
});

test("un estado corrupto se ignora y vuelve vacío", () => {
  const vacio = { dia: "", sorpresasHoy: 0, decisiones: [] };
  assert.deepStrictEqual(normalizarEstado(null), vacio);
  assert.deepStrictEqual(normalizarEstado(undefined), vacio);
  assert.deepStrictEqual(normalizarEstado("{json-roto"), vacio);
  assert.deepStrictEqual(normalizarEstado(12345), vacio);
  assert.deepStrictEqual(normalizarEstado([1, 2, 3]), vacio);
  assert.deepStrictEqual(
    normalizarEstado({
      dia: "no-es-fecha",
      sorpresasHoy: -8,
      decisiones: [
        null,
        { simId: "", decision: null },
        { simId: "sim-malo", decision: { evento: "inexistente" } },
      ],
    }),
    vacio,
  );
});
