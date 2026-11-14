import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { vigenteDe, repartirCuotas, type FormatoExamen } from "./formatos-examen.ts";
import { ETIQUETAS_AREA } from "./axiom/areas.ts";

const fichas = JSON.parse(readFileSync("data/formatos-examen.json", "utf-8")) as FormatoExamen[];

describe("formatos de examen", () => {
  test("vigente de medicina es psa-2027", () => {
    assert.equal(vigenteDe(fichas, "medicina")?.id, "psa-2027");
  });

  test("vigente por facultad en ingenieria, economicas y derecho", () => {
    assert.equal(vigenteDe(fichas, "ingenieria")?.id, "fcyt-admision-2025-2");
    assert.equal(vigenteDe(fichas, "economicas"), null);
    assert.equal(vigenteDe(fichas, "derecho")?.id, "derecho-provisoria");
  });

  test("pesos suman 1, ids de área válidos, ids de ficha únicos y a lo sumo una vigente por facultad", () => {
    const ids = new Set<string>();
    const vigentesPorFacultad = new Map<string, number>();

    for (const f of fichas) {
      assert.ok(!ids.has(f.id), `id de ficha duplicado: ${f.id}`);
      ids.add(f.id);

      const suma = f.areas.reduce((s, a) => s + a.peso, 0);
      assert.ok(Math.abs(suma - 1) <= 0.001, `pesos de ${f.id} suman ${suma}`);

      for (const a of f.areas) {
        assert.ok(a.id in ETIQUETAS_AREA, `área inválida ${a.id} en ${f.id}`);
      }

      if (f.vigente) {
        vigentesPorFacultad.set(f.facultad, (vigentesPorFacultad.get(f.facultad) ?? 0) + 1);
      }
    }

    for (const [facultad, n] of vigentesPorFacultad) {
      assert.ok(n <= 1, `facultad ${facultad} tiene ${n} fichas vigentes`);
    }
  });

  test("una facultad sin ficha da null", () => {
    assert.equal(vigenteDe(fichas, "facultad-que-no-existe"), null);
  });

  test("un área vacía reparte su peso entre las demás", () => {
    const f = { areas: [{ id: "a", peso: 1 }, { id: "b", peso: 1 }, { id: "c", peso: 2 }] };
    const c = repartirCuotas(f, { a: 50, b: 0, c: 50 }, 30);
    assert.equal(c.b, undefined);
    assert.equal(c.a + c.c, 30);
    assert.equal(c.a, 10);
    assert.equal(c.c, 20);
  });

  test("respeta los topes de disponibilidad", () => {
    const f = { areas: [{ id: "a", peso: 1 }, { id: "b", peso: 1 }] };
    const c = repartirCuotas(f, { a: 3, b: 100 }, 20);
    assert.equal(c.a, 3);
    assert.equal(c.b, 17);
  });

  test("con todas las áreas vacías no falla", () => {
    const f = { areas: [{ id: "a", peso: 1 }] };
    assert.deepEqual(repartirCuotas(f, { a: 0 }, 10), {});
  });
});
