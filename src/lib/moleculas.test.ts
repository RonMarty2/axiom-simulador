// data/moleculas.json es la fuente unica de los dibujos de moleculas (scripts/moleculas.mjs).
// Frena un SMILES mal tipeado (no tiene los C, N y O de su formula) y una molecula sin su SVG generado.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const { moleculas } = JSON.parse(readFileSync("data/moleculas.json", "utf8")) as {
  moleculas: { id: string; nombre: string; formula: string; smiles: string }[];
};

const deFormula = (f: string, el: string) => {
  const m = f.match(new RegExp(`${el}(\\d*)(?![a-z])`));
  return m ? Number(m[1] || 1) : 0;
};
// SMILES organico sin corchetes: cada C, N u O (o c, n, o aromaticos) es un atomo; Cl y Br no son C
const deSmiles = (s: string, el: string) => (s.replace(/Cl|Br/g, "").match(new RegExp(el, "gi")) ?? []).length;

test("cada molecula tiene id, nombre, formula y SMILES", () => {
  for (const m of moleculas) assert.ok(m.id && m.nombre && m.formula && m.smiles, JSON.stringify(m));
});

test("el SMILES tiene los C, N y O de la formula", () => {
  const mal = moleculas.flatMap((m) =>
    ["C", "N", "O"].filter((el) => deSmiles(m.smiles, el) !== deFormula(m.formula, el)).map((el) => `${m.id}: ${el} ${deSmiles(m.smiles, el)} en el SMILES, ${deFormula(m.formula, el)} en ${m.formula}`),
  );
  assert.deepEqual(mal, []);
});

test("cada molecula tiene su SVG generado (node scripts/moleculas.mjs)", () => {
  const faltan = moleculas.filter((m) => !existsSync(`public/moleculas/${m.id}.svg`)).map((m) => m.id);
  assert.deepEqual(faltan, []);
});

test("el test frena un SMILES al que le falta un oxigeno", () => {
  assert.notEqual(deSmiles("OCC(O)C", "O"), deFormula("C3H8O3", "O"));
});
