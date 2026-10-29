// Las masas atomicas de Axiom van redondeadas como en el colegio y en el banco (C=12, H=1, O=16).
// Este test las compara con la masa de referencia: un redondeo no puede alejarse mas de 0,5.
// Si se agrega un elemento a MASAS_ATOMICAS sin su referencia aca, el test frena: hay que mirar la
// tabla y, para Cl (35,5) o Cu (63,5), confirmar en un PDF del banco que redondeo usa la UMSS.
import { test } from "node:test";
import assert from "node:assert/strict";
import { MASAS_ATOMICAS } from "./generadores-quimica.ts";

// PubChem, tabla periodica (dominio publico), masa atomica estandar
const REFERENCIA: Record<string, number> = {
  H: 1.008,
  C: 12.011,
  N: 14.007,
  O: 15.999,
  Na: 22.98976928,
  Mg: 24.305,
  Al: 26.9815384,
  P: 30.97376199,
  S: 32.07,
  Cl: 35.45,
  K: 39.0983,
  Ca: 40.08,
  Cr: 51.9961,
  Mn: 54.938043,
  Fe: 55.84,
  Cu: 63.55,
  Zn: 65.4,
};

test("cada masa atomica de Axiom tiene referencia", () => {
  const sin = Object.keys(MASAS_ATOMICAS).filter((e) => !(e in REFERENCIA));
  assert.deepEqual(sin, [], `sin referencia: ${sin.join(", ")}`);
});

test("cada masa atomica de Axiom esta a 0,5 o menos de la referencia", () => {
  const lejos = Object.entries(MASAS_ATOMICAS)
    .filter(([e, m]) => Math.abs(m - REFERENCIA[e]) > 0.5)
    .map(([e, m]) => `${e}: Axiom ${m}, referencia ${REFERENCIA[e]}`);
  assert.deepEqual(lejos, []);
});

test("el test frena una masa mal copiada", () => {
  const mal: Record<string, number> = { ...MASAS_ATOMICAS, O: 61 };
  assert.ok(Object.entries(mal).some(([e, m]) => Math.abs(m - REFERENCIA[e]) > 0.5));
});
