import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Las prácticas (AutoCheck) no pueden tener la respuesta siempre en el mismo botón:
// el alumno aprobaba sin leer (bitácora 5 y 6-nov-2026). Se mide por lección con 4 o más.
const RAIZ = path.join(process.cwd(), "src", "app", "aprende");

test("ninguna lección concentra más de la mitad de sus respuestas correctas en un botón", () => {
  const malas: string[] = [];
  for (const dir of fs.readdirSync(RAIZ, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const archivo = path.join(RAIZ, dir.name, "page.tsx");
    if (!fs.existsSync(archivo)) continue;
    const idx = [...fs.readFileSync(archivo, "utf-8").matchAll(/correctaIdx=\{(\d)\}/g)].map((m) => Number(m[1]));
    if (idx.length < 4) continue;
    const cuenta = new Map<number, number>();
    for (const i of idx) cuenta.set(i, (cuenta.get(i) ?? 0) + 1);
    const maximo = Math.max(...cuenta.values());
    if (maximo / idx.length > 0.5) malas.push(`${dir.name}: ${maximo} de ${idx.length} en el mismo botón`);
  }
  assert.deepEqual(malas, []);
});
