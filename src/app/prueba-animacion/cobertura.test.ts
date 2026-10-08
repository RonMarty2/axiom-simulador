import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { huecosDe, recorrer } from "./cobertura.ts";
import type { Demo, Ficha } from "./datos.ts";

const f = (id: string, tex: string): Ficha => ({ id, tex });
const demo = (e0: Ficha[], e1: Ficha[], t: Partial<Demo["transiciones"][number]>): Demo => ({
  titulo: "",
  nota: "",
  intro: "",
  estados: [e0, e1],
  transiciones: [{ fusiones: [], texto: "", porque: "x", ...t }],
});

describe("cobertura: pasos que dicen operar y no mueven nada", () => {
  test("ningun tipo de animacion tiene huecos (con todos sus casos dificiles)", () => {
    const { huecos } = recorrer();
    assert.deepEqual(huecos.map((h) => `${h.tipo} / ${h.caso} / paso ${h.paso + 1}: ${h.texto}`), []);
  });

  test("el detector ATRAPA un hueco real: dice 'sumamos' y solo resalta", () => {
    const d = demo([f("a", "2"), f("b", "2")], [f("a", "2"), f("b", "2")], { texto: "Sumamos los dos números.", resaltar: ["a", "b"] });
    assert.equal(huecosDe(d).length, 1);
  });

  test("no marca como hueco lo que se mueve: fusion, brote o una pieza que cruza (arrastre)", () => {
    const fusion = demo([f("a", "2"), f("b", "2")], [f("c", "4")], { texto: "Sumamos: $2+2=4$.", fusiones: [{ desde: ["a", "b"], hacia: "c" }] });
    assert.equal(huecosDe(fusion).length, 0);
    const brote = demo([f("a", "2")], [f("a", "2"), f("b", "2")], { texto: "Multiplicamos.", brotes: [{ desde: "a", hacia: "b" }] });
    assert.equal(huecosDe(brote).length, 0);
    // arrastre: la misma pieza cambia de lugar y de signo, sin fusion ni brote
    const arrastre = demo([f("x", "x"), f("m", "+2"), f("e", "="), f("c", "5")], [f("x", "x"), f("e", "="), f("c", "5"), f("m", "-2")], { texto: "Pasamos el $+2$ al otro lado." });
    assert.equal(huecosDe(arrastre).length, 0);
  });

  test("un paso que solo explica (sin verbo de operacion) no es hueco", () => {
    const d = demo([f("a", "2")], [f("a", "2")], { texto: "Reconocemos el patrón: una resta de dos cuadrados.", resaltar: ["a"] });
    assert.equal(huecosDe(d).length, 0);
  });
});
