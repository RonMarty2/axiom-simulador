import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { construir, type Tipo } from "./construir.ts";
import { CASOS_POR_TIPO } from "./casos.ts";
import { revisar } from "./revisar.ts";

describe("casos dificiles por tipo", () => {
  for (const [tipo, casos] of Object.entries(CASOS_POR_TIPO)) {
    test(`${tipo}: todos validan, pasan la revision y no se repiten`, () => {
      assert.ok(casos.length >= 3, "al menos 3 casos por tipo");
      assert.equal(new Set(casos.map((c) => c.v.join("|"))).size, casos.length, "casos repetidos");
      for (const c of casos) {
        const r = construir(tipo as Tipo, c.v);
        assert.ok("demo" in r, `${tipo} / ${c.nombre}: ${"error" in r ? r.error : ""}`);
        revisar(r.demo, `${tipo} / ${c.nombre}`);
      }
    });
  }
});
