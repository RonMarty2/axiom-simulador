import { test } from "node:test";
import assert from "node:assert/strict";
import { motivoLimitePagos, MAX_PAGOS_PENDIENTES, MAX_PAGOS_POR_HORA } from "./limite-pagos.ts";

const ahora = new Date("2026-11-06T15:00:00Z");
const hace = (min: number) => new Date(ahora.getTime() - min * 60_000).toISOString();

test("sin pagos o con pocos, se puede registrar", () => {
  assert.equal(motivoLimitePagos([], ahora), null);
  assert.equal(motivoLimitePagos([{ fecha: hace(5), estado: "aprobado" }], ahora), null);
});

test("al llegar al tope por hora se frena, y pasada la hora se libera", () => {
  const muchos = Array.from({ length: MAX_PAGOS_POR_HORA }, () => ({ fecha: hace(10), estado: "aprobado" }));
  assert.ok(motivoLimitePagos(muchos, ahora));
  const viejos = muchos.map(() => ({ fecha: hace(90), estado: "aprobado" }));
  assert.equal(motivoLimitePagos(viejos, ahora), null);
});

test("demasiados pendientes frenan aunque sean viejos", () => {
  const pend = Array.from({ length: MAX_PAGOS_PENDIENTES }, () => ({ fecha: hace(600), estado: "pendiente" }));
  assert.ok(motivoLimitePagos(pend, ahora));
  assert.equal(motivoLimitePagos(pend.slice(1), ahora), null);
});
