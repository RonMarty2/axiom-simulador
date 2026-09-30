import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { parseExamenMD } from "./banco-parser.ts";
import { opcionesDeCombinacion, letraDeVeredicto, esquemaPara } from "./combinacion.ts";

const FRONT = `---
universidad: UMSS
facultad: medicina
anio: 2025
categoria: parcial_curso
titulo: Primer Parcial 2025-2026
duracion_minutos: 90
total_preguntas: 2
ponderacion:
  morfofuncion: 1
---
`;

const DOS = `## Pregunta 1
area: morfofuncion
tema: musculos-oculares
dificultad: media

Músculos oculares extrínsecos:

- 1) El oblicuo superior mueve el globo ocular hacia abajo y abducción.
- 2) El oblicuo inferior mueve el globo ocular hacia arriba y lateral.

**respuesta:** C
**explicacion:** Las dos son correctas.
`;

const TRES = `## Pregunta 2
area: biologia_celular
tema: ciclo-celular
dificultad: dificil

¿Cuál corresponde al manguito rotador?

- 1) Redondo mayor.
- 2) Supraespinoso.
- 3) Infraespinoso.

**respuesta:** C
`;

describe("clave de combinación", () => {
  test("2 afirmaciones: A solo 1, B solo 2, C ambas, D ninguna", () => {
    assert.deepEqual(opcionesDeCombinacion(2).map((o) => o.letra), ["A", "B", "C", "D"]);
    assert.equal(letraDeVeredicto([true, false]), "A");
    assert.equal(letraDeVeredicto([false, true]), "B");
    assert.equal(letraDeVeredicto([true, true]), "C");
    assert.equal(letraDeVeredicto([false, false]), "D");
  });

  test("3 afirmaciones: A, B, C una sola; D todas; E ninguna", () => {
    assert.deepEqual(opcionesDeCombinacion(3).map((o) => o.letra), ["A", "B", "C", "D", "E"]);
    assert.equal(letraDeVeredicto([true, false, false]), "A");
    assert.equal(letraDeVeredicto([false, true, false]), "B");
    assert.equal(letraDeVeredicto([false, false, true]), "C");
    assert.equal(letraDeVeredicto([true, true, true]), "D");
    assert.equal(letraDeVeredicto([false, false, false]), "E");
  });

  test("'dos de tres' no tiene letra: se declara, no se inventa", () => {
    assert.throws(() => letraDeVeredicto([true, true, false]), /dos de tres/);
  });

  test("solo 2 o 3 afirmaciones", () => {
    assert.throws(() => esquemaPara(1));
    assert.throws(() => esquemaPara(4));
  });

  test("el parser arma las opciones y guarda las afirmaciones", () => {
    const ex = parseExamenMD(FRONT + "\n" + DOS + "\n---\n\n" + TRES);
    assert.equal(ex.preguntas.length, 2);
    const [p1, p2] = ex.preguntas;
    assert.equal(p1.afirmaciones?.length, 2);
    assert.equal(p1.opciones.length, 4);
    assert.equal(p1.respuesta_correcta, "C");
    assert.equal(p1.enunciado, "Músculos oculares extrínsecos:");
    assert.equal(p2.afirmaciones?.length, 3);
    assert.equal(p2.opciones.length, 5);
    assert.equal(p2.opciones[4].letra, "E");
  });

  test("las preguntas de alternativas de siempre no cambian", () => {
    const normal = `## Pregunta 1
area: matematicas
tema: x
dificultad: facil

¿Cuánto es $2+2$?

- A) 3
- B) 4
- C) 5
- D) 6

**respuesta:** B
`;
    const ex = parseExamenMD(FRONT + "\n" + normal);
    assert.equal(ex.preguntas[0].afirmaciones, undefined);
    assert.equal(ex.preguntas[0].opciones.length, 4);
  });

  test("rechaza afirmaciones con opciones escritas a mano", () => {
    const mixta = DOS.replace("**respuesta:** C", "- A) Solo 1\n- B) Solo 2\n- C) Ambas\n- D) Ninguna\n\n**respuesta:** C");
    assert.throws(() => parseExamenMD(FRONT + "\n" + mixta), /no se escriben/);
  });

  test("rechaza una respuesta que no existe en la clave de 2 afirmaciones", () => {
    assert.throws(() => parseExamenMD(FRONT + "\n" + DOS.replace("**respuesta:** C", "**respuesta:** E")), /no existe en la clave/);
  });

  test("rechaza afirmaciones fuera de orden y una sola afirmación", () => {
    assert.throws(() => parseExamenMD(FRONT + "\n" + DOS.replace("- 2)", "- 3)")), /en orden/);
    assert.throws(() => parseExamenMD(FRONT + "\n" + DOS.replace(/- 2\).*\n/, "")), /2 o 3 afirmaciones/);
  });
});
