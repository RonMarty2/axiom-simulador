import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { revisar } from "./revisar.ts";
import {
  diferenciaCuadrados,
  ecuacionLineal,
  fracciones,
  sumaLogaritmos,
  validarCuadrados,
  validarEcuacionLineal,
  validarFracciones,
  validarLogaritmos,
} from "./generadores-algebra.ts";

describe("generadores de algebra", () => {
  test("ecuacion lineal: toda combinacion permitida y la solucion cumple la ecuacion", () => {
    let casos = 0;
    for (let a = 2; a <= 12; a++) {
      for (let b = -30; b <= 30; b++) {
        for (const c of [-99, -50, -11, -1, 0, 1, 7, 11, 24, 50, 99]) {
          if (validarEcuacionLineal(a, b, c)) continue;
          const r = ecuacionLineal(a, b, c);
          revisar(r.demo, `${a}x${b >= 0 ? "+" : ""}${b}=${c}`);
          // x = n/a debe cumplir a·x + b = c
          assert.equal(r.resumen.n, c - b);
          // exacto, sin decimales: a·(n/a) + b = n + b = c
          assert.equal(r.resumen.n + b, c);
          casos++;
        }
      }
    }
    assert.ok(casos > 3000);
  });

  test("el ejemplo clasico 3x + 2 = 11 da x = 3 con todos los pasos", () => {
    const r = ecuacionLineal(3, 2, 11);
    const texto = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of ["cambia de signo", "los sumamos", "Pasa al otro lado dividiendo", "se tachan", "Buscamos un factor", "x=3"]) {
      assert.ok(texto.includes(pista), `falta el paso: ${pista}`);
    }
  });

  test("ecuacion lineal: el termino se ARRASTRA al otro lado (misma pieza, cruza el =, cambia de signo)", () => {
    for (const [a, b, c] of [[3, 2, 11], [4, -5, 7], [5, 1, 3], [2, -3, -9]] as const) {
      const r = ecuacionLineal(a, b, c);
      const e = r.demo.estados;
      const antes = e[0].find((f) => f.id === "b")!;
      const despues = e[1].find((f) => f.id === "b")!;
      assert.ok(antes && despues, "la misma pieza existe antes y despues");
      assert.equal(e[1].filter((f) => f.id === "b").length, 1, "no se duplica");
      assert.notEqual(antes.tex, despues.tex, "cambia de signo");
      const eq0 = e[0].findIndex((f) => f.id === "eq");
      const eq1 = e[1].findIndex((f) => f.id === "eq");
      assert.ok(e[0].findIndex((f) => f.id === "b") < eq0, "empieza a la izquierda");
      assert.ok(e[1].findIndex((f) => f.id === "b") > eq1, "termina a la derecha");
      assert.equal(r.demo.transiciones[0].fusiones.length, 0, "arrastrar no fusiona ni cancela");
      assert.ok(!r.demo.transiciones.some((t) => t.texto.includes("en los dos lados de la igualdad")), "ya no se escribe el opuesto en los dos lados");
    }
  });

  test("fraccion que se simplifica y fraccion irreducible", () => {
    const simple = ecuacionLineal(4, 2, 8); // x = 6/4 = 3/2
    assert.ok(simple.demo.transiciones.some((t) => t.texto.includes("Buscamos un factor")));
    const irred = ecuacionLineal(3, 1, 3); // x = 2/3
    assert.ok(!irred.demo.transiciones.some((t) => t.texto.includes("Buscamos un factor")));
  });

  test("fracciones: toda combinacion, suma y resta, y el resultado es igual al exacto", () => {
    let casos = 0;
    for (let d1 = 2; d1 <= 12; d1++) {
      for (let d2 = 2; d2 <= 12; d2++) {
        for (const n1 of [1, 2, 3, 5, 7, 11, 20]) {
          for (const n2 of [1, 2, 4, 5, 9, 13, 20]) {
            for (const resta of [false, true]) {
              if (validarFracciones(n1, d1, n2, d2)) continue;
              const r = fracciones(n1, d1, n2, d2, resta);
              revisar(r.demo, `${n1}/${d1} ${resta ? "-" : "+"} ${n2}/${d2}`);
              // n1/d1 ± n2/d2 = rn/rd  <=>  (n1·d2 ± n2·d1)·rd = rn·d1·d2  (enteros, sin decimales)
              const lado = resta ? n1 * d2 - n2 * d1 : n1 * d2 + n2 * d1;
              assert.equal(lado * r.resumen.rd, r.resumen.rn * d1 * d2);
              assert.ok(r.resumen.rd >= 1);
              casos++;
            }
          }
        }
      }
    }
    assert.ok(casos > 5000);
  });

  test("fracciones: casos clasicos", () => {
    const t = (r: ReturnType<typeof fracciones>) => r.demo.transiciones.map((x) => `${x.texto} ${x.porque}`).join(" | ");
    const final = fracciones(1, 2, 1, 3).demo.estados.at(-1)!;
    assert.equal(final[0].tex, "\\dfrac{5}{6}");
    assert.ok(t(fracciones(1, 4, 1, 4, true)).includes("Cero partes")); // da 0
    assert.ok(t(fracciones(1, 2, 1, 2)).includes("número entero")); // 2/2 = 1
    assert.ok(t(fracciones(1, 6, 1, 3)).includes("Buscamos un factor")); // 3/6 -> 1/2
  });

  test("diferencia de cuadrados: cualquier cuadrado, con el proceso completo", () => {
    for (let k = 2; k <= 15; k++) {
      assert.equal(validarCuadrados(k), null);
      const r = diferenciaCuadrados(k);
      revisar(r.demo, `x2-${k * k}`);
      const texto = r.demo.transiciones.map((t) => t.texto).join(" | ");
      for (const pista of [`${k}^{2}`, `(x-${k})(x+${k})`, "producto", `x=-${k}`]) {
        assert.ok(texto.includes(pista) || r.demo.transiciones.some((t) => t.porque.includes(pista)), `k=${k}: falta ${pista}`);
      }
      // (x-k)(x+k) = x^2 - k^2: se comprueba en un punto
      assert.equal((5 - k) * (5 + k), 25 - r.resumen.q);
    }
    assert.ok(validarCuadrados(1));
    assert.ok(validarCuadrados(16));
  });

  test("logaritmos: toda combinacion valida y la cuenta cierra", () => {
    let casos = 0;
    for (let b = 2; b <= 10; b++) {
      for (let m = 2; m <= 1000; m++) {
        for (let n = 2; n <= 1000; n++) {
          if (m * n > b ** 6) break;
          if (validarLogaritmos(b, m, n)) continue;
          const r = sumaLogaritmos(b, m, n);
          revisar(r.demo, `log${b}(${m})+log${b}(${n})`);
          assert.equal(b ** r.resumen.k, m * n);
          casos++;
        }
      }
    }
    assert.ok(casos > 50);
    // por significado (4 y 8 son potencias de 2): cada log se resuelve solo, se cuentan los factores y recien se suma
    const ej = sumaLogaritmos(2, 4, 8);
    const todo = ej.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of ["Resolvemos $\\log_{2}(4)$", "Resolvemos $\\log_{2}(8)$", "2\\cdot 2=4", "2\\cdot 2\\cdot 2=8","Contamos", "Ahora sí sumamos", "$2+3=5$", "propiedad del producto"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    assert.equal(ej.demo.transiciones.length, 7);
    assert.equal(ej.resumen.k, 5);
    // por propiedad (2 y 18 no son potencias de 6, pero 36 si): marcar, juntar, multiplicar, descomponer, contar, responder
    const prop = sumaLogaritmos(6, 2, 18);
    const textoP = prop.demo.transiciones.map((t) => t.texto).join(" | ");
    for (const pista of ["las dos son $6$", "un solo logaritmo", "2\\cdot 18=36", "6\\cdot 6=36", "Contamos", "a qué exponente", "La respuesta es $2$"]) {
      assert.ok(textoP.includes(pista), `falta el paso (propiedad): ${pista}`);
    }
    revisar(prop.demo, "log6(2)+log6(18)");
    // k = 1: sin paso de agrupar
    revisar(sumaLogaritmos(10, 2, 5).demo, "log10(2)+log10(5)");
    assert.ok(validarLogaritmos(2, 3, 5)); // 15 no es potencia de 2
    assert.ok(validarLogaritmos(2, 1, 8));
  });

  test("diferencia de cuadrados: los numeros se ARRASTRAN al otro lado y cambian de signo", () => {
    for (let k = 2; k <= 15; k++) {
      const e = diferenciaCuadrados(k).demo.estados;
      const i = e.findIndex((s) => s.some((f) => f.id === "m1"));
      for (const [id, antes, despues] of [["m1", `-${k}`, `+${k}`], ["m2", `+${k}`, `-${k}`]] as const) {
        assert.equal(e[i].find((f) => f.id === id)!.tex, antes);
        assert.equal(e[i + 1].find((f) => f.id === id)!.tex, despues);
        const eq = id === "m1" ? "eq1" : "eq2";
        assert.ok(e[i].findIndex((f) => f.id === id) < e[i].findIndex((f) => f.id === eq), "empieza a la izquierda del =");
        assert.ok(e[i + 1].findIndex((f) => f.id === id) > e[i + 1].findIndex((f) => f.id === eq), "termina a la derecha del =");
      }
    }
  });

  test("rechaza lo que no puede animar", () => {
    assert.ok(validarEcuacionLineal(1, 2, 3));
    assert.ok(validarEcuacionLineal(3, 0, 3));
    assert.ok(validarEcuacionLineal(3, 2.5, 3));
  });
});
