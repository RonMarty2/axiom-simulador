import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Trinquete de la regla 6 de agentes/auditor-pantallas-movil.md: la letra de
// los dibujos de /aprende debe verse a 11 px o más en un celular de 360 px.
// El 16-11-2026 había 328 dibujos por debajo (medición en
// docs/medicion-letra-dibujos-2026-11-16.json). El número no puede subir:
// cada tanda de arreglos baja TECHO al valor nuevo.
const TECHO = 328;

test("dibujos con letra menor a 11 px a 360 px: no suben", () => {
  const salida = join(mkdtempSync(join(tmpdir(), "letra-")), "m.json");
  execFileSync(process.execPath, ["scripts/medir-letra-dibujos.mjs", "--json", salida], { stdio: "ignore" });
  const { filas } = JSON.parse(readFileSync(salida, "utf8")) as { filas: { letraMinPx: number }[] };
  const malos = filas.filter((f) => f.letraMinPx < 11).length;
  assert.ok(
    malos <= TECHO,
    `Hay ${malos} dibujos con letra < 11 px a 360 (techo ${TECHO}). Corre node scripts/medir-letra-dibujos.mjs y agranda la letra del dibujo nuevo (regla 6 de auditor-pantallas-movil).`,
  );
  if (malos < TECHO) console.log(`Bajó a ${malos}: actualiza TECHO en src/lib/letra-dibujos.test.ts`);
});
