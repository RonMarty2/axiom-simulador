import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// Trinquetes de las páginas legales. Existen porque las páginas son lo que le
// permite a la app cobrar y guardar datos de menores (bitácora §8, Crítico), y
// lo que más fácil se rompe es que un cambio las deje sin enlazar o que el
// texto repita un precio a mano.

const raiz = process.cwd();
const leer = (ruta: string) => readFileSync(join(raiz, ruta), "utf8");

const PAGINAS = ["src/app/terminos/page.tsx", "src/app/privacidad/page.tsx"];

test("existen /terminos y /privacidad", () => {
  for (const p of PAGINAS) assert.ok(existsSync(join(raiz, p)), `falta ${p}`);
});

test("las pantallas donde el alumno acepta o paga enlazan a las dos páginas", () => {
  const donde = [
    "src/app/login/page.tsx",
    "src/app/page.tsx",
    "src/app/pagar/page.tsx",
    "src/app/precios/page.tsx",
  ];
  for (const archivo of donde) {
    const src = leer(archivo);
    assert.ok(src.includes('href="/terminos"'), `${archivo} no enlaza a /terminos`);
    assert.ok(src.includes('href="/privacidad"'), `${archivo} no enlaza a /privacidad`);
  }
});

test("el texto legal está en tuteo, sin voseo", () => {
  const voseo = /\b(podés|tenés|querés|sabés|hacé|elegí|escribinos|avisanos|vos)\b/i;
  for (const p of PAGINAS) {
    const hit = leer(p).match(voseo);
    assert.equal(hit, null, `${p} tiene voseo: ${hit?.[0]}`);
  }
});

test("el texto legal no repite precios escritos a mano", () => {
  // Los montos salen de src/lib/precios.ts: si cambian, el texto cambia solo.
  for (const p of PAGINAS) {
    assert.equal(/Bs\.?\s*\d/.test(leer(p)), false, `${p} escribe un precio a mano`);
  }
});

test("el texto legal no usa guion largo", () => {
  for (const p of PAGINAS) assert.equal(leer(p).includes("—"), false, `${p} tiene guion largo`);
});

test("la fecha de vigencia sale de legal.ts, no está duplicada", () => {
  const { vigencia } = { vigencia: /vigencia:\s*"([^"]+)"/.exec(leer("src/lib/legal.ts"))?.[1] };
  assert.ok(vigencia, "legal.ts no declara vigencia");
  for (const p of PAGINAS) assert.equal(leer(p).includes(vigencia!), false, `${p} repite la fecha`);
});
