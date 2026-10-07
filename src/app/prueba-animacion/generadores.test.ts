import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { DEMOS } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { potenciaProducto, raizConFactor, raizGeneral, validarPotencia, validarRaiz } from "./generadores.ts";

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
