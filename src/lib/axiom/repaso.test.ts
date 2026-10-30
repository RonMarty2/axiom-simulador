import { test } from "node:test";
import assert from "node:assert/strict";
import { programar, tocaRepasar, proximoRepaso, type EstadoRepaso } from "./repaso.ts";

const dia = (n: number) => new Date(Date.UTC(2026, 9, 1 + n, 12));
const fecha = (n: number) => dia(n).toISOString();

test("fallar manda a repasar manana, en la caja 0", () => {
  assert.deepEqual(programar(null, false, dia(0)), { caja: 0, proximo: fecha(1), dominada_en: null });
});

test("tres aciertos seguidos en su fecha la dominan: 1, 3 y 7 dias", () => {
  let e = programar(null, false, dia(0)) as EstadoRepaso;
  e = programar(e, true, dia(1)) as EstadoRepaso;
  assert.deepEqual([e.caja, e.proximo, e.dominada_en], [1, fecha(4), null]);
  e = programar(e, true, dia(4)) as EstadoRepaso;
  assert.deepEqual([e.caja, e.proximo, e.dominada_en], [2, fecha(11), null]);
  e = programar(e, true, dia(11)) as EstadoRepaso;
  assert.equal(e.dominada_en, fecha(11));
  assert.equal(tocaRepasar(e, dia(100)), false);
});

test("un fallo en el medio la vuelve a la caja 0", () => {
  let e = programar(null, false, dia(0)) as EstadoRepaso;
  e = programar(e, true, dia(1)) as EstadoRepaso;
  e = programar(e, false, dia(4)) as EstadoRepaso;
  assert.deepEqual([e.caja, e.proximo], [0, fecha(5)]);
});

test("acertar antes de su fecha no cuenta (no se domina repitiendo el mismo dia)", () => {
  const e = programar(null, false, dia(0)) as EstadoRepaso;
  assert.deepEqual(programar(e, true, dia(0)), e);
});

test("acertar algo que nunca fallo no la mete en la lista", () => {
  assert.equal(programar(null, true, dia(0)), null);
});

test("los errores viejos sin fecha tocan repasar ya", () => {
  assert.equal(tocaRepasar({}, dia(0)), true);
  assert.equal(tocaRepasar({ proximo: fecha(2) }, dia(0)), false);
});

test("proximo repaso: la fecha mas cercana de las que todavia no tocan", () => {
  assert.equal(proximoRepaso([{ proximo: fecha(5) }, { proximo: fecha(2) }, { proximo: fecha(-1) }, { proximo: fecha(1), dominada_en: fecha(0) }], dia(0)), fecha(2));
  assert.equal(proximoRepaso([], dia(0)), null);
});
