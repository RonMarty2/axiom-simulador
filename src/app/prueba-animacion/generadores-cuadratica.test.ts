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

  test("ecuaciones desordenadas: terminos en los dos lados, y las soluciones cumplen la ECUACION ORIGINAL", () => {
    let casos = 0;
    for (let a1 = 1; a1 <= 4; a1++) {
      for (let b1 = -5; b1 <= 5; b1++) {
        for (let c1 = -8; c1 <= 8; c1++) {
          for (let a2 = -1; a2 <= 3; a2++) {
            for (let b2 = -4; b2 <= 4; b2 += 2) {
              for (let c2 = -6; c2 <= 6; c2 += 3) {
                if (validarCuadratica(a1, b1, c1, a2, b2, c2)) continue;
                const r = cuadratica(a1, b1, c1, a2, b2, c2);
                revisar(r.demo, `${a1}x2${b1}x${c1}=${a2}x2${b2}x${c2}`);
                for (const x of [r.resumen.x1, r.resumen.x2]) {
                  assert.equal(a1 * x * x + b1 * x + c1, a2 * x * x + b2 * x + c2, `x=${x} no cumple la ecuacion original`);
                }
                casos++;
              }
            }
          }
        }
      }
    }
    assert.ok(casos > 100, `solo ${casos} casos`);
  });

  test("x2 = 5x - 6: pasa los terminos de a uno, ordena, etiqueta y escribe la formula debajo", () => {
    const r = cuadratica(1, 0, 0, 0, 5, -6); // x^2 = 5x - 6  ->  a=1, b=-5, c=6
    assert.deepEqual([r.resumen.a, r.resumen.b, r.resumen.c], [1, -5, 6]);
    const todo = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of ["no se puede despejar", "primero hay que ordenar", "Pasamos", "cambia de signo", "Ordenamos", "$a=1$", "$b=-5$", "$c=6$", "debajo la fórmula"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // las etiquetas aparecen debajo de cada termino, de una en una y con color
    const conEtiqueta = r.demo.estados.map((e) => e.filter((f) => f.debajo).length);
    assert.ok(conEtiqueta.includes(1) && conEtiqueta.includes(2) && conEtiqueta.includes(3));
    assert.ok(r.demo.estados.some((e) => e.some((f) => f.debajo?.includes("textcolor"))));
    // la formula va debajo (renglon nuevo) y la ecuacion sigue a la vista cuando nace
    const nace = r.demo.estados.find((e) => e.some((f) => f.id === "F"))!;
    assert.ok(nace.find((f) => f.id === "F")!.salto);
    assert.ok(nace.some((f) => f.id === "eq"));
  });

  test("pasar un termino al otro lado es ARRASTRAR la misma pieza (mismo id) que cambia de signo, sin duplicarla", () => {
    const r = cuadratica(1, 0, 0, 0, 5, -6); // x^2 = 5x - 6: pasan -6 y 5x
    const e = r.demo.estados;
    const pasos = r.demo.transiciones.map((t, i) => ({ t, i })).filter(({ t }) => t.texto.startsWith("Pasamos"));
    assert.equal(pasos.length, 2, "un paso por cada termino de la derecha");
    for (const { t, i } of pasos) {
      const id = t.resaltar![0];
      const antes = e[i].find((f) => f.id === id)!;
      const despues = e[i + 1].find((f) => f.id === id)!;
      assert.ok(antes && despues, "la misma pieza existe antes y despues");
      assert.equal(e[i + 1].filter((f) => f.id === id).length, 1, "no se duplica");
      assert.notEqual(antes.tex, despues.tex, "cambia de signo al cruzar");
      // estaba a la derecha del = y ahora esta a la izquierda
      const posEq = (fs: typeof antes[]) => fs.findIndex((f) => f.id === "eq");
      assert.ok(e[i].findIndex((f) => f.id === id) > posEq(e[i]));
      assert.ok(e[i + 1].findIndex((f) => f.id === id) < posEq(e[i + 1]));
      assert.ok(t.fusiones.length === 0, "arrastrar no fusiona ni cancela nada");
    }
    // el ultimo termino en salir deja el 0, y ese 0 nace de la pieza que se fue
    const ultimo = pasos[pasos.length - 1].t;
    assert.ok(ultimo.brotes?.some((b) => b.hacia === "z"));
    assert.ok(!r.demo.transiciones.some((t) => t.texto.includes("se cancelan")), "ya no se escribe el opuesto en los dos lados");
  });

  test("hay constantes de los dos lados: se suman antes de etiquetar", () => {
    const r = cuadratica(1, -2, 4, 0, 3, -2); // x^2 -2x +4 = 3x -2  ->  x^2 -5x +6 = 0
    assert.deepEqual([r.resumen.a, r.resumen.b, r.resumen.c], [1, -5, 6]);
    const todo = r.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(todo.includes("Sumamos los números solos"), "falta sumar las constantes");
    assert.ok(todo.includes("Sumamos los de $x$"), "falta sumar los de x");
    // sumar semejantes ocurre antes de la primera etiqueta
    const iSuma = r.demo.transiciones.findIndex((t) => t.texto.includes("Sumamos los números solos"));
    const iEtiqueta = r.demo.transiciones.findIndex((t) => t.texto.includes("$a=1$"));
    assert.ok(iSuma < iEtiqueta);
  });

  test("las reglas y los porques coinciden con el signo REAL de los datos (nunca una regla de negativos con todo positivo)", () => {
    for (let a = 1; a <= 3; a++) {
      for (let b = -12; b <= 12; b++) {
        for (let c = -12; c <= 12; c++) {
          if (validarCuadratica(a, b, c)) continue;
          const r = cuadratica(a, b, c);
          const reglas = r.demo.transiciones.map((t) => t.regla ?? "");
          const textos = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`);
          const Q = 4 * a * c;
          const sinResta = reglas.filter((x) => x.includes("a-(-b)")).length;
          assert.equal(sinResta > 0, Q < 0, `a=${a} b=${b} c=${c}: la regla a-(-b) solo va si 4ac es negativo`);
          assert.equal(reglas.some((x) => x.includes("(-n)^{2}")), b < 0, `a=${a} b=${b} c=${c}: la regla (-n)^2 solo va si b es negativo`);
          assert.equal(reglas.some((x) => x.includes("negativo")), c < 0, `a=${a} b=${b} c=${c}: la regla de signos del producto depende del signo de c`);
          // "Segunda cuenta" no puede aparecer sin una "Primera cuenta" antes
          const iPrimera = textos.findIndex((t) => t.includes("Primera cuenta"));
          const iSegunda = textos.findIndex((t) => t.includes("Segunda cuenta"));
          assert.ok(iPrimera >= 0 && iPrimera < iSegunda, `a=${a} b=${b} c=${c}: las cuentas no estan numeradas en orden`);
        }
      }
    }
  });

  test("todo simbolo se define antes de usarse: Delta, el producto de dos en dos y la comprobacion visible", () => {
    for (const [a1, b1, c1, a2, b2, c2] of [[1, -5, 6, 0, 0, 0], [1, 0, 0, 0, 5, -6], [1, -2, 4, 0, 3, -2], [2, 2, -4, 0, 0, 0], [1, -4, 4, 0, 0, 0]] as const) {
      assert.equal(validarCuadratica(a1, b1, c1, a2, b2, c2), null);
      const t = cuadratica(a1, b1, c1, a2, b2, c2).demo.transiciones;
      // \Delta aparece primero en un texto que lo define
      const usa = t.findIndex((x) => `${x.texto} ${x.regla ?? ""}`.includes("\\Delta"));
      const define = t.findIndex((x) => x.texto.includes("se escribe $\\Delta$"));
      assert.ok(define >= 0 && define <= usa, `${a1},${b1},${c1}: Delta se usa antes de definirse`);
      // el producto de tres numeros se hace de dos en dos, cada uno en su paso
      assert.ok(t.some((x) => x.texto.includes("de dos en dos")), "falta el producto de dos en dos");
      // la comprobacion contra la ecuacion ORIGINAL va despues del resultado
      const iComprueba = t.findIndex((x) => x.texto.includes("Comprobamos"));
      const iDivide = t.findIndex((x) => x.texto.includes("Dividimos") || x.texto.includes("Hay una sola solución"));
      assert.ok(iComprueba > iDivide && iDivide >= 0, `${a1},${b1},${c1}: la comprobacion debe ir despues de dividir`);
      assert.ok(t.at(-1)!.texto.includes("Comprobamos"), "el ultimo paso es la comprobacion");
    }
  });

  test("ya ordenada lo dice; las constantes se suman sin decir que 'acompanan' a nada", () => {
    const ya = cuadratica(1, -5, 6).demo.transiciones[0].texto;
    assert.ok(ya.includes("ya está ordenada"));
    const t = cuadratica(1, -2, 4, 0, 3, -2).demo.transiciones.find((x) => x.texto.includes("Sumamos los números solos"))!;
    assert.ok(!t.texto.includes("acompañan"), "los numeros solos no acompanan a nada");
    assert.ok(!/\+\(\d/.test(t.texto), "no se pone parentesis a un numero positivo");
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
