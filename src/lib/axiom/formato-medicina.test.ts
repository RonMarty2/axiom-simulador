import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parseExamenMD } from "./banco-parser.ts";
import type { FormatoExamen } from "../formatos-examen.ts";

const DIR_MEDICINA = "data/examenes/umss/medicina";
const fichas = JSON.parse(readFileSync("data/formatos-examen.json", "utf-8")) as FormatoExamen[];
const archivos = readdirSync(DIR_MEDICINA).filter((f) => f.endsWith(".md"));

describe("exámenes de medicina declaran su formato", () => {
  test("hay 5 exámenes de medicina en el banco", () => {
    assert.equal(archivos.length, 5);
  });

  for (const archivo of archivos) {
    test(`${archivo} declara un formato que existe en data/formatos-examen.json`, () => {
      const examen = parseExamenMD(readFileSync(join(DIR_MEDICINA, archivo), "utf-8"));
      assert.ok(examen.formato, "falta la línea formato: en el frontmatter");
      assert.ok(
        fichas.some((f) => f.id === examen.formato),
        `el formato "${examen.formato}" no existe en formatos-examen.json`
      );
    });
  }
});
