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
    assert.equal(ej.demo.transiciones.length, 12);
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
      // un arrastre por paso: primero m1 (estados i -> i+1), despues m2 (i+1 -> i+2)
      for (const [id, antes, despues, desde] of [["m1", `-${k}`, `+${k}`, i], ["m2", `+${k}`, `-${k}`, i + 1]] as const) {
        assert.equal(e[desde].find((f) => f.id === id)!.tex, antes);
        assert.equal(e[desde + 1].find((f) => f.id === id)!.tex, despues);
        const eq = id === "m1" ? "eq1" : "eq2";
        assert.ok(e[desde].findIndex((f) => f.id === id) < e[desde].findIndex((f) => f.id === eq), "empieza a la izquierda del =");
        assert.ok(e[desde + 1].findIndex((f) => f.id === id) > e[desde + 1].findIndex((f) => f.id === eq), "termina a la derecha del =");
      }
    }
  });

  test("fracciones: los multiplicadores brotan del DENOMINADOR que los origina, una fraccion por paso", () => {
    const r = fracciones(1, 2, 1, 3);
    const [t0, t1, t2, t3, t4, t5] = r.demo.transiciones;
    assert.deepEqual(t0.brotes!.map((b) => `${b.desde}>${b.hacia}`), ["f2.d>m1", "f2.d>k1"]);
    assert.deepEqual(t1.brotes!.map((b) => `${b.desde}>${b.hacia}`), ["f1.d>m2", "f1.d>k2"]);
    // una fraccion por paso, con el producto escrito antes de calcularlo
    assert.deepEqual(t2.fusiones[0].desde, ["f1", "m1", "k1"]);
    assert.ok(r.demo.estados[3].some((f) => f.frac?.n === "1\\cdot 3" && f.frac?.d === "2\\cdot 3"));
    assert.deepEqual(t3.fusiones[0].desde, ["u1"]);
    assert.deepEqual(t4.fusiones[0].desde, ["f2", "m2", "k2"]);
    assert.deepEqual(t5.fusiones[0].desde, ["u2"]);
    assert.ok(r.demo.estados[3].some((f) => f.frac?.n === "1\\cdot 3"));
  });

  test("fracciones: el segundo denominador se funde con el primero (ancla), no desaparece sin mas", () => {
    for (const [a, b, c, d] of [[1, 2, 1, 3], [1, 4, 3, 4], [5, 6, 7, 6]] as const) {
      const r = fracciones(a, b, c, d);
      const t = r.demo.transiciones.find((x) => x.fusiones.some((f) => f.ancla && f.ancla.endsWith(".d")));
      assert.ok(t, `${a}/${b}+${c}/${d}: falta fundir los denominadores con ancla`);
      assert.ok(t!.fusiones[0].desde[0].endsWith(".d"));
    }
  });

  test("simplificar muestra de donde sale el g (divisores) y no escribe tautologias", () => {
    const f = fracciones(1, 6, 1, 3); // 9/18 -> mcd 9
    const txt = f.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(txt.includes("Divisores de $9$: $1,\\ 3,\\ 9$"));
    assert.ok(txt.includes("Divisores de $18$"));
    assert.ok(txt.includes("Tomamos el mayor: $9$"));
    // x = 8/4: el denominador ya es el g, no se escribe 4 = 4
    const l = ecuacionLineal(4, 1, 9);
    const tl = l.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(!/\$(\d+)=\1\$/.test(tl), "tautologia tipo 4=4");
    assert.ok(tl.includes("Abajo ya está el $4$"));
  });

  test("lineal: con n<0 se dice que el signo pasa al frente de la fraccion", () => {
    const r = ecuacionLineal(4, 5, -7); // n = -12, mcd 4
    assert.equal(r.resumen.n, -12);
    const t = r.demo.transiciones.find((x) => x.texto.includes("signo menos delante"));
    assert.ok(t, "falta el paso del signo");
    assert.equal(t!.fusiones[0].hacia, "hs");
    const hs = r.demo.estados.flat().find((f) => f.id === "hs")!;
    assert.equal(hs.tex, "-\\dfrac{12}{4}");
    // con n>0 ese paso no existe
    assert.ok(!ecuacionLineal(4, 1, 9).demo.transiciones.some((x) => x.texto.includes("signo menos delante")));
  });

  test("lineal: n=0 dice '0 entre a es 0' y no inventa 0=0 por a", () => {
    const r = ecuacionLineal(4, 3, 3);
    assert.equal(r.resumen.n, 0);
    const txt = r.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(txt.includes("Cero entre $4$ es $0$"));
    assert.ok(!txt.includes("0=0\\cdot"));
    assert.ok(!txt.includes("Buscamos un factor"));
  });

  test("lineal: con solucion entera termina comprobando en el enunciado, una operacion por paso", () => {
    for (const [a, b, c] of [[3, 2, 11], [4, -5, 7], [2, -3, -9]] as const) {
      const r = ecuacionLineal(a, b, c);
      if (!r.resumen.exacta) continue;
      const txt = r.demo.transiciones.map((t) => t.texto).join(" | ");
      assert.ok(txt.includes("Comprobamos"), `${a}x${b}=${c}: falta comprobar`);
      assert.ok(txt.includes("Primero la multiplicación") && txt.includes("Ahora la suma"));
      assert.ok(r.demo.estados.at(-1)!.some((f) => f.id === "ok" && f.tex.includes("checkmark")));
    }
    // con x entero seguro: 3x+2=11
    assert.ok(ecuacionLineal(3, 2, 11).demo.transiciones.some((t) => t.texto.includes("Comprobamos")));
  });

  test("logaritmos: exponente 1 se escribe como estado, el exponente viaja y los b nacen de la base", () => {
    // log2(2) + log2(8): el 2 solo tiene exponente 1
    const r = sumaLogaritmos(2, 2, 8);
    const t = r.demo.transiciones.find((x) => x.texto.includes("El exponente $1$ nunca se escribe"));
    assert.ok(t, "falta mostrar b = b^1");
    assert.deepEqual(t!.brotes, [{ desde: "af1", hacia: "ae" }]);
    assert.ok(r.demo.estados.some((s) => s.some((f) => f.id === "ae" && f.sup && f.tex === "1")));
    // el exponente conserva el id hasta la suma: viaja
    const idx = r.demo.estados.findIndex((s) => s.length === 3 && s.some((f) => f.id === "ae" && !f.sup));
    assert.ok(idx > 0, "el exponente deja de ser sup y se queda como resultado");
    // los b de la factorizacion nacen de la base del log (brote desde el log), no aparecen de golpe
    const fact = sumaLogaritmos(2, 4, 8).demo.transiciones.find((x) => x.texto.includes("Cada $2$ sale de la base"));
    assert.ok(fact && fact.brotes!.every((b) => b.desde === "zo" || b.desde === "ao"));
    // la comprobacion es estado, no solo texto
    const ult = sumaLogaritmos(2, 4, 8).demo.estados.at(-1)!;
    assert.ok(ult.some((f) => f.tex.includes("2^{5}=32")));
  });

  test("logaritmos por propiedad: los argumentos cruzan con su id, los b nacen de la base y la comprobacion es estado", () => {
    const r = sumaLogaritmos(6, 2, 18);
    const e = r.demo.estados;
    // m y n existen en el estado de los dos logs y en el del log unico (cruzan)
    assert.ok(e[0].some((f) => f.id === "m") && e[2].some((f) => f.id === "m"));
    assert.ok(e[0].some((f) => f.id === "n") && e[2].some((f) => f.id === "n"));
    const nace = r.demo.transiciones.find((x) => x.texto.includes("Cada $6$ sale de la base"));
    assert.ok(nace && nace.brotes!.every((b) => b.desde === "o"));
    // exponente 1 (10: 2 y 5)
    const uno = sumaLogaritmos(10, 2, 5);
    assert.ok(uno.demo.transiciones.some((x) => x.texto.includes("El exponente $1$ nunca se escribe")));
    // el exponente viaja a ser el resultado y la comprobacion queda en la hoja
    assert.ok(e.at(-1)!.some((f) => f.tex.includes("6^{2}=36")));
    assert.ok(e.at(-1)!.some((f) => f.id === "e"));
  });

  test("rechaza lo que no puede animar", () => {
    assert.ok(validarEcuacionLineal(1, 2, 3));
    assert.ok(validarEcuacionLineal(3, 0, 3));
    assert.ok(validarEcuacionLineal(3, 2.5, 3));
  });
});
