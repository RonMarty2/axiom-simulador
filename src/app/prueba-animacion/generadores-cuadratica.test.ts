import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { revisar } from "./revisar.ts";
import { cuadratica, validarCuadratica } from "./generadores-cuadratica.ts";

describe("ecuacion de segundo grado", () => {
  test("toda combinacion permitida: las dos soluciones cumplen la ecuacion (con enteros, sin decimales)", () => {
    let casos = 0;
    for (let a = 1; a <= 5; a++) {
      for (let b = -20; b <= 20; b++) {
        for (let c = -30; c <= 30; c++) {
          if (validarCuadratica(a, b, c)) continue;
          const r = cuadratica(a, b, c);
          revisar(r.demo, `${a}x2${b >= 0 ? "+" : ""}${b}x${c >= 0 ? "+" : ""}${c}`);
          const { x1, x2 } = r.resumen;
          assert.equal(a * x1 * x1 + b * x1 + c, 0, `x1=${x1} no cumple`);
          assert.equal(a * x2 * x2 + b * x2 + c, 0, `x2=${x2} no cumple`);
          casos++;
        }
      }
    }
    assert.ok(casos > 300, `solo ${casos} casos`);
  });

  test("el ejemplo clasico x2 - 5x + 6 = 0 da 3 y 2 con todos los pasos", () => {
    const r = cuadratica(1, -5, 6);
    assert.equal(r.resumen.x1, 3);
    assert.equal(r.resumen.x2, 2);
    const todo = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of ["a=1", "b=-5", "c=6", "fórmula general", "entre paréntesis", "discriminante", "\\sqrt{1}=1", "dos caminos", "x=3", "x=2"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // cada paso que aplica una propiedad la muestra
    assert.ok(r.demo.transiciones.every((t) => t.regla), "todo paso debe llevar su regla");
  });

  test("discriminante cero: una sola solucion", () => {
    const r = cuadratica(1, -4, 4); // (x-2)^2
    assert.equal(r.resumen.x1, 2);
    assert.equal(r.resumen.x2, 2);
    assert.ok(r.demo.transiciones.some((t) => t.texto.includes("una sola solución")));
  });

  test("rechaza lo que no da soluciones enteras", () => {
    assert.ok(validarCuadratica(1, 1, 1)); // discriminante negativo
    assert.ok(validarCuadratica(1, 1, -1)); // no es cuadrado perfecto
    assert.ok(validarCuadratica(0, 2, 3));
    assert.ok(validarCuadratica(2, 1, -1)); // x = 1/2 y -1: una no es entera
    assert.ok(validarCuadratica(2, -3, 1)); // x = 1 y 1/2: una no es entera
  });

  test("otros ejemplos con a distinto de 1", () => {
    const r = cuadratica(2, -10, 12); // 2x2-10x+12: x = 3 y 2
    assert.deepEqual([r.resumen.x1, r.resumen.x2], [3, 2]);
  });
});
