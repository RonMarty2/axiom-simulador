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
  test("hay exámenes de medicina en el banco", () => {
    assert.ok(archivos.length >= 5);
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

describe("gestión de los exámenes del Curso Básico", () => {
  for (const archivo of archivos) {
    test(`${archivo}: el anio es el año en que termina el curso`, () => {
      const examen = parseExamenMD(readFileSync(join(DIR_MEDICINA, archivo), "utf-8"));
      const m = examen.titulo?.match(/\b20\d{2}-(20\d{2})\b/);
      assert.ok(m, "el título debe llevar el curso (ej. 2025-2026)");
      assert.equal(examen.anio, Number(m[1]));
    });
  }
});
