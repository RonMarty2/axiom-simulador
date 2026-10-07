import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { DEMOS } from "./datos.ts";
import type { Demo, Ficha } from "./datos.ts";
import { potenciaProducto, raizConFactor, raizGeneral, validarPotencia, validarRaiz } from "./generadores.ts";

// Una animacion solo es confiable si cada transicion es coherente con los
// estados que une. Esto la comprueba para TODAS las combinaciones permitidas.
function revisar(d: Demo, etiqueta: string) {
  assert.equal(d.estados.length, d.transiciones.length + 1, `${etiqueta}: estados y transiciones no encajan`);
  d.estados.forEach((e, i) => {
    const ids = e.map((f) => f.id);
    assert.equal(new Set(ids).size, ids.length, `${etiqueta}: ids repetidos en el estado ${i}`);
  });
  d.transiciones.forEach((t, i) => {
    const a = idsConPartes(d.estados[i]);
    const b = idsConPartes(d.estados[i + 1]);
    assert.ok(t.porque.trim().length > 0, `${etiqueta}: T${i} sin porque`);
    for (const br of t.brotes ?? []) {
      assert.ok(a.has(br.desde) && b.has(br.desde), `${etiqueta}: T${i} el origen del brote ${br.desde} debe seguir existiendo`);
      assert.ok(b.has(br.hacia) && !a.has(br.hacia), `${etiqueta}: T${i} el brote ${br.hacia} debe ser nuevo`);
    }
    for (const id of t.resaltar ?? []) {
      assert.ok(a.has(id) && b.has(id), `${etiqueta}: T${i} resaltar ${id} debe existir antes y despues`);
    }
    for (const f of t.fusiones) {
      for (const id of f.desde) {
        assert.ok(a.has(id), `${etiqueta}: T${i} desde ${id} no existe antes`);
        assert.ok(!b.has(id), `${etiqueta}: T${i} desde ${id} sigue existiendo despues`);
      }
      if (f.ancla) assert.ok(a.has(f.ancla) && b.has(f.ancla), `${etiqueta}: T${i} ancla ${f.ancla} no persiste`);
      const hs = f.hacia === null ? [] : Array.isArray(f.hacia) ? f.hacia : [f.hacia];
      for (const h of hs) {
        assert.ok(b.has(h), `${etiqueta}: T${i} hacia ${h} no existe despues`);
        assert.ok(!a.has(h), `${etiqueta}: T${i} hacia ${h} ya existia antes`);
      }
    }
    // una orden de LaTeX sin su barra invertida se vería como la palabra suelta ("cdot")
    for (const txt of [t.texto, t.porque, ...d.estados[i].map((f) => f.tex)]) {
      assert.ok(!/(^|[^\\a-zA-Z])(cdot|tfrac|dfrac|frac|sqrt|text)\b/.test(txt), `${etiqueta}: T${i} tiene una orden de LaTeX sin barra: ${txt}`);
    }
    // el texto del alumno no usa "÷" ni fracciones con barra suelta
    for (const txt of [t.texto, t.porque]) {
      assert.ok(!txt.includes("÷"), `${etiqueta}: T${i} usa ÷`);
    }
  });
}

// ids de las fichas y, en las fracciones, de sus partes ("f2.n", "f2.d")
const idsConPartes = (e: Ficha[]) => new Set(e.flatMap((f) => (f.frac ? [f.id, f.id + ".n", f.id + ".d"] : [f.id])));

describe("animaciones de fusion", () => {
  test("los ejemplos escritos a mano son coherentes", () => {
    for (const d of DEMOS) revisar(d, d.titulo);
  });

  test("potencias: toda combinacion permitida", () => {
    for (const base of [2, 3, 5, 10, "x" as const]) {
      for (let m = 1; m <= 12; m++) {
        for (let n = 1; n <= 12; n++) {
          if (validarPotencia(base, m, n)) continue;
          const r = potenciaProducto(base, m, n);
          revisar(r.demo, `${base}^${m}·${base}^${n}`);
          assert.equal(r.resumen.s, m + n);
        }
      }
    }
  });

  test("raices: toda combinacion permitida y la cuenta cierra", () => {
    let casos = 0;
    for (const base of [2, 3, 4, 5, 7, 10, "x" as const]) {
      for (let n = 2; n <= 12; n++) {
        for (let k = 2; k <= 6; k++) {
          if (validarRaiz(base, n, k)) continue;
          const r = raizGeneral(base, n, k);
          revisar(r.demo, `raiz[${k}](${base}^${n})`);
          casos++;
          if (base !== "x") {
            // exponente simplificado: n1/k1 = n/k, y q·k1 + r = n1
            assert.equal(r.resumen.n1 * k, r.resumen.k1 * n);
            assert.equal(r.resumen.q * r.resumen.k1 + r.resumen.r, r.resumen.n1);
            // valor real: base^(n/k) = base^q · base^(r/k1)
            const real = Math.pow(base ** n, 1 / k);
            const armado = base ** r.resumen.q * Math.pow(base ** r.resumen.r, 1 / r.resumen.k1);
            assert.ok(Math.abs(real - armado) < 1e-6 * Math.max(1, real), `valor distinto en raiz[${k}](${base}^${n})`);
          }
        }
      }
    }
    assert.ok(casos > 300);
  });

  test("raiz con parte exacta y resto (√12 = 2√3 y similares)", () => {
    for (const [a, n, k, c] of [
      [2, 2, 2, 3],
      [3, 2, 2, 2],
      [2, 3, 3, 5],
      [2, 6, 3, 7],
      [5, 4, 2, 3],
    ] as const) {
      const r = raizConFactor(a, n, k, c);
      revisar(r.demo, `raiz[${k}](${a}^${n}·${c})`);
      const real = Math.pow(a ** n * c, 1 / k);
      const armado = r.resumen.v * Math.pow(c, 1 / k);
      assert.ok(Math.abs(real - armado) < 1e-9 * Math.max(1, real));
    }
  });

  test("el ejemplo clasico √12 tiene el proceso completo, sin saltos", () => {
    const r = raizConFactor(2, 2, 2, 3);
    const texto = r.demo.transiciones.map((t) => t.texto).join(" | ");
    for (const pista of ["potencia", "exponente", "tacha", "sale de la raíz"]) {
      assert.ok(texto.toLowerCase().includes(pista.toLowerCase()), `falta el paso: ${pista}`);
    }
    assert.ok(r.demo.transiciones.length >= 8);
  });
});
