import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { leer, validar } from "./revisar-pasos.ts";

describe("pasos por revisar (data/cambios-por-revisar.json)", () => {
  test("cada paso pendiente apunta a un caso y a un paso que existen, y trae una nota", () => {
    const reg = leer();
    for (const c of reg.cambios) {
      assert.equal(validar(c.tipo, c.caso, c.paso), null, `${c.tipo} / ${c.caso} / paso ${c.paso}`);
      assert.ok(c.nota.trim().length > 0, `${c.tipo} / ${c.caso} / paso ${c.paso}: falta que mirar`);
    }
  });

  test("cada paso dado por visto sin observacion dice hasta donde llego Ronald y ese paso es posterior", () => {
    for (const c of leer().aprobadosPorSilencio) {
      assert.ok(c.hasta > c.paso, `${c.tipo} / ${c.caso}: dado por visto en el paso ${c.paso} pero llego solo hasta ${c.hasta}`);
      assert.equal(validar(c.tipo, c.caso, c.hasta), null);
    }
  });

  test("validar rechaza un tipo, un caso o un paso que no existen", () => {
    assert.match(validar("noexiste", "x", 1) ?? "", /no existe/);
    assert.match(validar("lineal", "inventado", 1) ?? "", /no hay un caso/);
    assert.match(validar("lineal", "normal", 0) ?? "", /entre 1 y/);
    assert.match(validar("lineal", "normal", 999) ?? "", /entre 1 y/);
    assert.equal(validar("lineal", "normal", 10), null);
  });
});
