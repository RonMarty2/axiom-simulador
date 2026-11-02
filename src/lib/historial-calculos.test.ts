import { test } from "node:test";
import assert from "node:assert/strict";
import { anteriorA } from "./historial-calculos.ts";

test("anteriorA excluye el simulacro actual por simulador_id y no por id", () => {
  const historial = [
    {
      id: "h-actual",
      simulador_id: "sim-actual",
      fecha: "2026-11-01T18:00:00.000Z",
      nota: 84,
    },
    {
      id: "sim-actual",
      simulador_id: "sim-previo",
      fecha: "2026-10-30T18:00:00.000Z",
      nota: 65,
    },
  ];
  assert.deepStrictEqual(anteriorA(historial, "sim-actual"), { nota: 65 });
});

test("anteriorA con ids reales h-… y sim-… devuelve el anterior y no el actual", () => {
  const historial = [
    {
      id: "h-m2z9x1",
      simulador_id: "sim-1730480000-a1b2",
      fecha: "2026-11-01T19:00:00.000Z",
      nota: 78,
    },
    {
      id: "h-m2y8w0",
      simulador_id: "sim-1730390000-c3d4",
      fecha: "2026-10-31T19:00:00.000Z",
      nota: 62,
    },
  ];
  assert.deepStrictEqual(
    anteriorA(historial, "sim-1730480000-a1b2"),
    { nota: 62 },
  );
});

test("anteriorA devuelve null con un solo examen", () => {
  const unico = [
    {
      id: "h-m2z9x1",
      simulador_id: "sim-1730480000-a1b2",
      fecha: "2026-11-01T19:00:00.000Z",
      nota: 78,
    },
  ];
  assert.equal(anteriorA(unico, "sim-1730480000-a1b2"), null);
  assert.equal(anteriorA([], "sim-1730480000-a1b2"), null);
});

test("anteriorA toma el más reciente distinto del actual aunque lleguen desordenados", () => {
  const desordenados = [
    {
      id: "h-1",
      simulador_id: "sim-1",
      fecha: "2026-10-15T12:00:00.000Z",
      nota: 50,
    },
    {
      id: "h-3",
      simulador_id: "sim-3",
      fecha: "2026-11-01T12:00:00.000Z",
      nota: 90,
    },
    {
      id: "h-2",
      simulador_id: "sim-2",
      fecha: "2026-10-25T12:00:00.000Z",
      nota: 72,
    },
  ];
  assert.deepStrictEqual(anteriorA(desordenados, "sim-3"), { nota: 72 });
});
