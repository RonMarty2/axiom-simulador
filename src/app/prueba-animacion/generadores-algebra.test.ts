import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { revisar } from "./revisar.ts";
import type { Ficha } from "./datos.ts";
import {
  diferenciaCuadrados,
  ecuacionLineal,
  fracciones,
  sumaLogaritmos,
  sumaLogaritmosPropiedad,
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

  test("fracciones RAPIDA: toda combinacion pasa revisar, da el mismo resultado que la explicada y tiene pocos pasos", () => {
    let casos = 0;
    for (let d1 = 2; d1 <= 12; d1++) {
      for (let d2 = 2; d2 <= 12; d2++) {
        for (const n1 of [1, 2, 3, 5, 7, 11, 20]) {
          for (const n2 of [1, 2, 4, 5, 9, 13, 20]) {
            for (const resta of [false, true]) {
              if (validarFracciones(n1, d1, n2, d2)) continue;
              const et = `rapida ${n1}/${d1} ${resta ? "-" : "+"} ${n2}/${d2}`;
              const r = fracciones(n1, d1, n2, d2, resta, true);
              revisar(r.demo, et);
              assert.deepEqual(r.resumen, fracciones(n1, d1, n2, d2, resta).resumen, `${et}: mismo resultado que la explicada`);
              assert.ok(r.demo.transiciones.length <= 4, `${et}: la rapida tiene ${r.demo.transiciones.length} pasos`);
              casos++;
            }
          }
        }
      }
    }
    assert.ok(casos > 5000);
    assert.equal(fracciones(1, 2, 1, 3, false, true).demo.estados.at(-1)![0].tex, "\\dfrac{5}{6}");
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
    for (const pista of ["Resolvemos $\\log_{2}(4)$", "Resolvemos $\\log_{2}(8)$", "2\\cdot 2=4", "2\\cdot 2\\cdot 2=8","Contamos", "Ahora sí sumamos", "$2+3=5$", "Comprobamos con la definición"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // 1 (anotar el ejercicio) + 4 + 4 (cada logaritmo) + 1 (sumar) + 8 (comprobacion: 5 productos parciales, ver mas abajo)
    assert.equal(ej.demo.transiciones.length, 18);
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
    // la primera transicion anota el ejercicio abajo (fila de referencia)
    // t1 busca el mcm (6); el factor de cada fraccion es mcm / su denominador: 6/2 = 3 y 6/3 = 2
    // el mcm se BUSCA a la vista: lista de multiplos de cada denominador, el primero comun, y se despeja
    const [, tm, tm2, tm3, tm4, t1, t2, t3, t4, t5, t6] = r.demo.transiciones;
    assert.ok(tm.texto.includes("mínimo común múltiplo") && tm.texto.includes("Múltiplos de $2$") && tm.texto.includes("$2,\\ 4,\\ 6.$"));
    assert.ok(tm2.texto.includes("$3,\\ 6.$"));
    assert.deepEqual(tm3.fusiones[0].desde, ["Ma", "Sb", "Mb"]);
    assert.ok(tm3.texto.includes("$6$") && tm4.texto.includes("denominador común"));
    assert.deepEqual(t1.brotes!.map((b) => `${b.desde}>${b.hacia}`), ["f1.d>m1", "f1.d>c1"]);
    assert.deepEqual(t2.brotes!.map((b) => `${b.desde}>${b.hacia}`), ["f2.d>m2", "f2.d>c2"]);
    // una fraccion por paso, con el producto escrito antes de calcularlo
    assert.deepEqual(t3.fusiones[0].desde, ["f1", "m1", "c1"]);
    assert.ok(r.demo.estados[8].some((f) => f.frac?.n === "1\\cdot 3" && f.frac?.d === "2\\cdot 3"));
    assert.deepEqual(t4.fusiones[0].desde, ["u1"]);
    assert.deepEqual(t5.fusiones[0].desde, ["f2", "m2", "c2"]);
    assert.deepEqual(t6.fusiones[0].desde, ["u2"]);
  });

  test("fracciones: usa el MINIMO comun multiplo y solo multiplica la fraccion que lo necesita", () => {
    // 1/8 + 5/12: mcm 24 (no 96): 3/24 + 10/24 = 13/24
    const a = fracciones(1, 8, 5, 12);
    assert.ok(a.demo.transiciones.some((t) => t.texto.includes("es $24$")));
    assert.ok(!a.demo.estados.flat().some((f) => f.frac?.d === "96"));
    // 1/2 + 1/6: el 6 ya es multiplo de 2, solo se multiplica la primera
    const b = fracciones(1, 2, 1, 6);
    const textos = b.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(textos.includes("primera fracción la multiplicamos por $\\dfrac{3}{3}$"));
    assert.ok(!textos.includes("segunda fracción la multiplicamos"));
    assert.ok(!b.demo.transiciones.some((t) => t.fusiones.some((f) => f.hacia === "u2")));
    // si la segunda fraccion no cambia, se dice (antes solo lo decia el caso simetrico)
    assert.ok(b.demo.transiciones.some((t) => t.porque.includes("La segunda fracción ya tiene denominador $6$")));
  });

  test("fracciones: comprobacion con un paso por lado, negativos con parentesis, y la irreducible se demuestra", () => {
    // 3/4 - 5/6 = -1/12 (no se simplifica): el menos va DENTRO del numerador, como en el paso anterior, y el negativo suelto con parentesis
    const neg = fracciones(3, 4, 5, 6, true);
    const textos = neg.demo.transiciones.map((t) => t.texto);
    assert.ok(textos.some((x) => x.includes("$(-1)\\cdot 12=-12$")), "falta (-1)·12 con parentesis");
    assert.ok(!textos.some((x) => /[^(]-1\\cdot 12/.test(x)), "-1·12 sin parentesis");
    // las multiplicaciones y las divisiones van por lados: dos operaciones a la izquierda y una en la respuesta, nunca tres juntas
    assert.ok(textos.some((x) => x.includes("lado izquierdo") && x.includes("$3\\cdot 12=36$") && x.includes("$5\\cdot 12=60$")));
    assert.ok(textos.some((x) => x.startsWith("Ahora la multiplicación de arriba de la respuesta")));
    assert.ok(textos.some((x) => x.includes("lado izquierdo") && x.includes("=9$") && x.includes("=10$")));
    assert.ok(textos.some((x) => x.startsWith("Y la división de la respuesta")));
    // irreducible: se muestran los divisores y el unico comun (1)
    const irr = fracciones(1, 4, 1, 6).demo.transiciones.map((t) => t.texto);
    assert.ok(irr.some((x) => x.startsWith("¿Se puede simplificar?") && x.includes("Divisores de $5$")));
    assert.ok(irr.some((x) => x.includes("Divisores de $12$")));
    assert.ok(irr.some((x) => x.includes("único") && x.includes("$1.$")));
    // las listas van EN LA HOJA, de a una, y nacen de la fraccion (revision por agentes del 29-oct: antes solo estaban en el texto)
    const irrD = fracciones(1, 4, 1, 6).demo;
    const iDn = irrD.estados.findIndex((e) => e.some((f) => f.id === "Dn"));
    assert.ok(iDn > 0 && !irrD.estados[iDn].some((f) => f.id === "Dd"), "la lista de arriba nace sola");
    assert.ok(irrD.transiciones[iDn - 1].brotes!.some((b) => b.hacia === "Dn"));
    assert.ok(irrD.estados[iDn + 1].some((f) => f.id === "Dd"), "la lista de abajo nace en el paso siguiente");
    assert.ok(irrD.estados[iDn + 2].some((f) => f.id === "Dc" && f.tex.includes("\\mathbf{1}")), "«en las dos listas: 1» queda en la hoja");
    // y se van al empezar la comprobacion, sin dejar la hoja cargada
    assert.ok(!irrD.estados.at(-1)!.some((f) => f.id === "Dc"));
    // el criterio de parada de la lista de multiplos se explica; el divisor de un numerador negativo avisa que no cuenta el signo;
    // y "tampoco" solo aparece si hubo una multiplicacion antes (k1 > 1)
    const mcm = fracciones(1, 4, 1, 6).demo.transiciones;
    assert.ok(mcm.some((t) => t.porque.includes("Paramos en $12$ porque es el primer número que ya está en las dos listas")));
    assert.ok(neg.demo.transiciones.some((t) => t.texto.includes("Divisores de $1$ (sin el signo menos)")));
    const k1uno = fracciones(1, 6, 1, 3).demo.transiciones.map((t) => t.porque).join(" | ");
    assert.ok(k1uno.includes("así no cambia el valor") && !k1uno.includes("tampoco"));
    assert.ok(fracciones(1, 4, 1, 6).demo.transiciones.some((t) => t.porque.includes("tampoco cambia el valor")));
    // con el signo ya delante (se simplifico): se queda delante hasta dividir
    const simp = fracciones(1, 2, 5, 6, true).demo.transiciones.map((t) => t.texto);
    assert.ok(simp.some((x) => x.includes("El signo menos se queda delante")));
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
    const f = fracciones(1, 6, 1, 3); // 1/6 + 2/6 = 3/6 -> mcd 3
    const txt = f.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(txt.includes("Divisores de $3$: $1,\\ 3.$"));
    assert.ok(txt.includes("Divisores de $6$"));
    assert.ok(txt.includes("Tomamos el mayor: $3$"));
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
    const idx = r.demo.estados.findIndex((s) => s.filter((f) => f.id !== "SR" && f.id !== "ref").length === 3 && s.some((f) => f.id === "ae" && !f.sup));
    assert.ok(idx > 0, "el exponente deja de ser sup y se queda como resultado");
    // los b de la factorizacion nacen de la base del log (brote desde el log), no aparecen de golpe
    const fact = sumaLogaritmos(2, 4, 8).demo.transiciones.find((x) => x.texto.includes("Cada $2$ sale de la base"));
    assert.ok(fact && fact.brotes!.every((b) => b.desde === "zo" || b.desde === "ao"));
    // la comprobacion es estado, no solo texto: 2^5 se desarrolla y se multiplica de a dos hasta 32
    const ult = sumaLogaritmos(2, 4, 8).demo.estados.at(-1)!;
    assert.ok(ult.some((f) => f.tex.includes("32=32")));
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
    assert.ok(e.at(-1)!.some((f) => f.tex.includes("36=36")));
    assert.ok(e.at(-1)!.some((f) => f.id === "e"));
  });

  // ---- hallazgos de la auditoria independiente del 8-oct (docs/hallazgos-auditoria-pasos.md) ----

  const tex = (e: Ficha[]) => e.map((f) => f.tex).join("|");
  const termina = (d: { estados: Ficha[][] }) => d.estados.at(-1)!.some((f) => f.tex.includes("checkmark"));

  test("ningun paso vacio por tex: si no resalta ni brota, la hoja tiene que cambiar (los 5 generadores)", () => {
    const demos: [string, ReturnType<typeof ecuacionLineal>][] = [];
    for (const a of [2, 3, 4, 6, 12]) for (const b of [-9, -4, 1, 5]) for (const c of [-20, -7, 0, 11, 40]) if (!validarEcuacionLineal(a, b, c)) demos.push([`lineal ${a},${b},${c}`, ecuacionLineal(a, b, c)]);
    for (const [n1, d1, n2, d2] of [[1, 2, 1, 3], [1, 2, 5, 6], [3, 4, 1, 4], [1, 6, 1, 3], [7, 3, 7, 3]]) for (const r of [false, true]) demos.push([`fr ${n1}/${d1}${r ? "-" : "+"}${n2}/${d2}`, fracciones(n1, d1, n2, d2, r)]);
    for (let k = 2; k <= 15; k++) demos.push([`cuad ${k}`, diferenciaCuadrados(k)]);
    for (const [b, m, n] of [[2, 4, 8], [2, 2, 2], [2, 2, 8], [10, 2, 5], [3, 9, 3], [6, 2, 18], [2, 8, 16]] as const) demos.push([`log ${b},${m},${n}`, sumaLogaritmos(b, m, n)]);
    for (const [nombre, r] of demos) {
      r.demo.transiciones.forEach((t, i) => {
        if ((t.resaltar ?? []).length > 0 || (t.brotes ?? []).length > 0) return;
        assert.notEqual(tex(r.demo.estados[i]), tex(r.demo.estados[i + 1]), `${nombre}: T${i} solo cambia de id (paso vacio): ${t.texto}`);
      });
    }
  });

  test("lineal: toda ecuacion termina comprobando en el enunciado, tambien con x fraccionaria", () => {
    for (let a = 2; a <= 12; a++) {
      for (const b of [-30, -7, -1, 2, 9, 30]) {
        for (const c of [-99, -11, 0, 5, 24, 99]) {
          if (validarEcuacionLineal(a, b, c)) continue;
          const r = ecuacionLineal(a, b, c);
          assert.ok(termina(r.demo), `${a}x${b}=${c}: falta el cierre con la comprobacion`);
          const txt = r.demo.transiciones.map((t) => t.texto).join(" | ");
          assert.ok(txt.includes("Comprobamos") && txt.includes("Ahora la suma"));
        }
      }
    }
    // x = 3/2: el 4 viaja al numerador, se multiplica arriba, se divide y recien se suma
    const f = ecuacionLineal(4, 2, 8);
    const txt = f.demo.transiciones.map((t) => t.texto).join(" | ");
    for (const pista of ["viajan juntos arriba", "4\\cdot 3=12", "\\dfrac{12}{2}=6", "6+2=8"]) assert.ok(txt.includes(pista), `falta: ${pista}`);
    const viaja = f.demo.transiciones.find((t) => t.fusiones.some((x) => x.modo === "viajar" && x.hacia === "Cq3"));
    assert.ok(viaja && viaja.brotes!.some((b) => b.desde === "Ca" && b.hacia === "Cq1"));
    // con x negativa fraccionaria el signo va en el numerador y la cuenta cierra con enteros
    assert.ok(termina(ecuacionLineal(5, 1, -3).demo));
    // 4x + 2 = -4 da x = -3/2: la solucion se escribio con el menos delante y al reemplazar entra al numerador; se dice, y el texto
    // de la multiplicacion muestra lo mismo que la hoja ((-3) arriba)
    const neg = ecuacionLineal(4, 2, -4).demo.transiciones.map((t) => t.texto);
    assert.ok(neg.some((x) => x.includes("El signo menos entra al numerador")), "falta decir que el menos entra al numerador");
    assert.ok(neg.some((x) => x.startsWith("Primero la multiplicación: $4\\cdot \\dfrac{(-3)}{2}$")), "el texto no muestra el (-3) de la hoja");
    // revision por agentes del 29-oct: reemplazar y meter el menos son DOS pasos; el menos es una pieza que viaja
    const negD = ecuacionLineal(4, 2, -4).demo;
    const iRe = negD.transiciones.findIndex((t) => t.texto.startsWith("Reemplazamos $x$"));
    assert.ok(negD.transiciones[iRe].porque.includes("entre paréntesis"), "dice por que el negativo va entre parentesis");
    assert.ok(!negD.transiciones[iRe].texto.includes("entra al numerador"));
    const menos = negD.transiciones[iRe + 1];
    assert.ok(menos.texto.startsWith("El signo menos entra al numerador") && menos.regla === "$-\\dfrac{a}{b}=\\dfrac{-a}{b}$");
    // el menos viaja al numerador y se junta con el 3: arriba queda UNA pieza (-3), para que despues se marque entera (29-oct)
    assert.deepEqual(menos.fusiones, [{ desde: ["Cm", "Cfn"], hacia: "Cfz", modo: "viajar" }]);
    // el menos no lleva espacio negativo: con \! tocaba la raya y se leia como 3/2 positivo
    assert.equal(negD.estados[iRe + 1].find((f) => f.id === "Cm")!.tex, "-");
    // los parentesis se estiran alrededor de la fraccion
    assert.ok(negD.estados[iRe + 1].some((f) => f.id === "Cpa" && f.tex.includes("\\left(")));
    // antes de subir el 4, los parentesis pasan a rodear el -3 (su propio paso); al subir se marcan TRES unidades: 4, punto y (-3)
    const parens = negD.transiciones[iRe + 2];
    assert.deepEqual(parens.fusiones, [{ desde: ["Cpa", "Cfz", "Cpb"], hacia: "Cfp", modo: "viajar" }]);
    const sube = negD.transiciones[iRe + 3];
    assert.deepEqual(sube.fusiones.map((f) => f.desde), [["Ca"], ["Cd"], ["Cfp"]]);
    for (const [a, b, c] of [[4, 2, -4], [5, 1, -3], [6, 1, -4], [12, -7, -50]] as const) {
      const d = ecuacionLineal(a, b, c).demo;
      const t = d.transiciones.find((x) => x.fusiones.some((f) => f.hacia === "Cq3"));
      if (!t) continue;
      const marcas = [...t.fusiones.flatMap((f) => f.desde), ...(t.brotes ?? []).map((x) => x.desde)];
      assert.ok(new Set(marcas).size <= 3, `${a}x${b}=${c}: al subir al numerador se marcan ${new Set(marcas).size} piezas`);
    }
    // la regla de signos se nombra al multiplicar
    assert.ok(negD.transiciones.some((t) => t.porque.includes("Positivo por negativo da negativo") && t.regla === "$a\\cdot(-b)=-(a\\cdot b)$"));
    // x entera negativa: tambien dice por que el parentesis y nombra la regla de signos
    const ent = ecuacionLineal(3, 2, -4).demo.transiciones;
    assert.ok(ent.some((t) => t.texto.startsWith("Reemplazamos") && t.porque.includes("entre paréntesis")));
    assert.ok(ent.some((t) => t.texto.startsWith("Primero la multiplicación") && t.porque.includes("Positivo por negativo da negativo")));
  });

  test("lineal x fraccionaria: al hacer la cuenta de arriba SOLO se funde el numerador; el denominador sigue siendo la misma pieza (29-oct)", () => {
    // «lo que se dice quieto queda quieto»: el Cfd se sigue con su id desde que nace hasta la division
    for (const [a, b, c] of [[4, 2, 8], [4, 2, -4], [5, 1, -3], [6, 1, 4], [12, -7, 89]] as const) {
      const d = ecuacionLineal(a, b, c).demo;
      const iCuenta = d.transiciones.findIndex((t) => t.texto.startsWith("Hacemos la cuenta de arriba"));
      if (iCuenta < 0) continue;
      const t = d.transiciones[iCuenta];
      assert.ok(t.fusiones.every((f) => !f.desde.includes("Cf") && !f.desde.includes("Cfd")), `${a}x${b}=${c}: la cuenta de arriba funde la fraccion entera`);
      const den = (e: Ficha[]) => e.find((f) => f.id === "Cf")?.frac?.dPiezas?.map((p) => p.id);
      assert.deepEqual(den(d.estados[iCuenta]), ["Cfd"]);
      assert.deepEqual(den(d.estados[iCuenta + 1]), ["Cfd"], `${a}x${b}=${c}: el denominador cambio de pieza`);
    }
  });

  test("lineal con n<0: el texto y el estado muestran el mismo -12 arriba, y el signo se mueve en su propio paso", () => {
    const r = ecuacionLineal(4, 5, -7); // n = -12
    const t = r.demo.transiciones.find((x) => x.texto.includes("viaja hasta debajo"))!;
    assert.ok(t.texto.includes("x=\\dfrac{-12}{4}"), "el texto dice lo que muestra la hoja");
    const fr = r.demo.estados.flat().find((f) => f.id === "fr")!;
    assert.equal(fr.frac?.n, "-12");
    assert.ok(!t.texto.includes("x=-\\dfrac"), "el signo todavia no esta delante");
  });

  test("simplificar: las listas de divisores son ESTADO (nacen del numerador y del denominador, de a una) y el 1 del denominador se nombra", () => {
    const r = ecuacionLineal(4, 1, 9); // x = 8/4 = 2
    const e = r.demo.estados;
    const iDn = e.findIndex((s) => s.some((f) => f.id === "Dn"));
    assert.ok(iDn > 0);
    assert.ok(!e[iDn].some((f) => f.id === "Dd"), "primero una lista");
    // la primera lista, sola, va SIN negrita; con la segunda a la vista, en negrita SOLO los que estan en las dos (29-oct)
    assert.ok(!e[iDn].find((f) => f.id === "Dn")!.tex.includes("\\mathbf"), "negrita antes de que exista la segunda lista");
    assert.ok(e[iDn + 1].find((f) => f.id === "Dn")!.tex.includes("\\mathbf{1},\\ \\mathbf{2},\\ \\mathbf{4},\\ 8"));
    assert.ok(e[iDn + 1].find((f) => f.id === "Dd")!.tex.includes("\\mathbf{1},\\ \\mathbf{2},\\ \\mathbf{4}"));
    const [tn, td] = [r.demo.transiciones[iDn - 1], r.demo.transiciones[iDn]];
    assert.ok(tn.brotes!.every((b) => b.desde === "fr.n"), "los divisores del numerador nacen del numerador");
    assert.ok(td.brotes!.every((b) => b.desde === "fr.d"), "los del denominador nacen del denominador");
    assert.ok(e[iDn + 2].some((f) => f.id === "Dc") && e[iDn + 3].some((f) => f.id === "Dg"), "comunes y mayor tambien como estado");
    const txt = r.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(txt.includes("Abajo queda $1$"), "el denominador que queda en 1 se nombra al tachar");
  });

  test("cuadrados: a y b VUELAN desde sus etiquetas a los tres lugares, de a una, y la etiqueta nace en su paso", () => {
    const r = diferenciaCuadrados(3);
    const e = r.demo.estados;
    const iA = e.findIndex((s) => s.some((f) => f.id === "a" && f.debajo));
    const iB = e.findIndex((s) => s.some((f) => f.id === "n3" && f.debajo));
    assert.ok(iA > 0 && iB === iA + 1, "las etiquetas aparecen una por paso, la a primero");
    assert.ok(!e[iA].some((f) => f.id === "n3" && f.debajo));
    const brotesDe = (desde: string) => r.demo.transiciones.filter((t) => (t.brotes ?? []).some((b) => b.desde === desde && ["Fax", "x1", "x2", "Fbk", "k1", "k2"].includes(b.hacia)));
    const [tA] = brotesDe("a");
    const [tB] = brotesDe("n3");
    assert.deepEqual(tA.brotes!.map((b) => b.hacia).sort(), ["Fax", "x1", "x2"]);
    assert.deepEqual(tB.brotes!.map((b) => b.hacia).sort(), ["Fbk", "k1", "k2"]);
    assert.ok(tA.porque.includes("tres lugares") && tB.porque.includes("tres lugares"));
    assert.ok(r.demo.transiciones.indexOf(tA) < r.demo.transiciones.indexOf(tB), "primero la a, despues la b");
    // los parentesis de la formula son las MISMAS piezas que llegan a la ecuacion
    const iF = e.findIndex((s) => s.some((f) => f.id === "Fax") && s.some((f) => f.id === "k2"));
    const iE = e.findIndex((s) => !s.some((f) => f.id === "a") && s.some((f) => f.id === "fo1"));
    assert.ok(iF > 0 && iE > iF);
  });

  test("cuadrados: la expansion x2+kx-kx-q es ESTADO, y la comprobacion de las dos soluciones nace del ejercicio anotado", () => {
    for (const k of [2, 3, 9, 15]) {
      const r = diferenciaCuadrados(k);
      const e = r.demo.estados;
      const exp = e.find((s) => s.some((f) => f.id === "e2" && f.tex === `+${k}x`) && s.some((f) => f.id === "e3" && f.tex === `-${k}x`));
      assert.ok(exp, "los cuatro productos estan en la hoja");
      assert.ok(r.demo.transiciones.some((t) => t.fusiones.some((x) => x.modo === "tachar" && x.desde.join() === "e2,e3")), "kx y -kx se tachan");
      // el ejercicio queda anotado desde el primer paso hasta el final y la comprobacion nace de ahi
      // la fila anotada va en piezas y ES la primera fila de la comprobacion: nunca hay tres x² − q = 0 a la vista (29-oct)
      const iT = r.demo.transiciones.findIndex((x) => (x.brotes ?? []).some((b) => b.desde === "C1" && b.hacia === "C2"));
      assert.ok(iT > 0, "la segunda fila nace de la anotada");
      assert.ok(e.slice(1, iT + 2).every((s) => s.some((f) => f.id === "C1" && f.tex === `${k * k}`)));
      assert.ok(e.every((s) => s.filter((f) => /^C\d$/.test(f.id)).length <= 2), "mas de dos copias del ejercicio");
      // copiar y reemplazar son dos pasos (29-oct): la copia lleva la x; en el paso siguiente la x se cambia por cada solucion
      assert.ok(r.demo.estados[iT + 1].some((f) => f.id === "X1" && f.tex === "x") && r.demo.estados[iT + 1].some((f) => f.id === "X2" && f.tex === "x"));
      const re = r.demo.transiciones[iT + 1];
      assert.ok(re.brotes!.some((b) => b.desde === "r1" && b.hacia === "V1") && re.brotes!.some((b) => b.desde === "r2" && b.hacia === "V2"));
      assert.deepEqual(re.fusiones.map((f) => f.desde), [["X1"], ["X2"]]);
      // la segunda ecuacion va en su renglon, empezando por «o» (el corte no deja «o x» colgado)
      for (const s of e) {
        const i = s.findIndex((f) => f.id === "or");
        if (i >= 0) assert.equal(s[i - 1].id, "So", "antes del «o» va un salto de renglon");
      }
      // texto y hoja escriben la misma «o» (sin tilde)
      assert.ok(!JSON.stringify(r.demo).includes("ó }"), "la hoja dice «ó» y el texto «o»");
      // con k de dos cifras la formula se corta ANTES del «=» (no queda colgado ni se separan los parentesis)
      for (const s of e) {
        const i = s.findIndex((f) => f.id === "Fe");
        if (i >= 0) assert.equal(s[i - 1].id === "SF2", k >= 10, `k=${k}: corte de la formula`);
      }
      const ult = e.at(-1)!;
      assert.ok(ult.some((f) => f.id === "ok1") && ult.some((f) => f.id === "ok2"));
      const txt = r.demo.transiciones.map((x) => x.texto + x.porque).join(" | ");
      assert.ok(txt.includes(`(-${k})^{2}=${k * k}`) && txt.includes("menos por menos da más"));
    }
  });

  test("fracciones: el numerador de la 2da fraccion VIAJA a w2, el signo se mueve aparte, y termina comprobando", () => {
    for (const [n1, d1, n2, d2, r] of [[1, 2, 1, 3, false], [1, 4, 3, 4, false], [1, 2, 5, 6, true], [3, 4, 1, 4, true]] as const) {
      const f = fracciones(n1, d1, n2, d2, r);
      const t = f.demo.transiciones.find((x) => x.fusiones.some((y) => y.hacia === "w2"))!;
      const v = t.fusiones.find((y) => y.hacia === "w2")!;
      assert.equal(v.modo, "viajar");
      assert.ok(v.desde[0].endsWith(".n"));
      assert.deepEqual(t.brotes, [{ desde: v.desde[0], hacia: "w2" }]);
      assert.ok(termina(f.demo), `${n1}/${d1} ${r ? "-" : "+"} ${n2}/${d2}: falta el cierre con la comprobacion`);
      // el ejercicio queda anotado abajo desde el primer paso
      assert.ok(f.demo.estados.slice(1).every((s) => s.some((x) => x.id === "R1") && s.some((x) => x.id === "R2")));
    }
    // 1/2 - 5/6 = -2/6: primero se CALCULA (queda -2 arriba), despues el signo pasa al frente en su propio paso
    const neg = fracciones(1, 2, 5, 6, true);
    const calc = neg.demo.transiciones.find((x) => x.texto.includes("Restamos los numeradores"))!;
    assert.ok(!calc.texto.includes("signo menos se escribe") && calc.fusiones[0].hacia === "h");
    assert.equal(neg.demo.estados.flat().find((x) => x.id === "h")!.tex, "\\dfrac{-2}{6}");
    const signo = neg.demo.transiciones.find((x) => x.texto.includes("signo menos delante"))!;
    assert.equal(signo.fusiones[0].hacia, "hs");
    assert.ok(neg.demo.transiciones.indexOf(signo) === neg.demo.transiciones.indexOf(calc) + 1);
    // la comprobacion multiplica por el denominador comun: 1/2·6 = 3, 5/6·6 = 5, y -1/3·6 = -2
    const txt = neg.demo.transiciones.map((x) => x.texto).join(" | ");
    for (const pista of ["multiplicamos los dos lados por $6$", "$3-5=-2$", "A la izquierda queda $-2$ y a la derecha $-2$"]) assert.ok(txt.includes(pista), `falta: ${pista}`);
    // repartir el 6 sobre la resta es la distributiva: se nombra (29-oct)
    assert.ok(neg.demo.transiciones.some((t) => t.porque.includes("propiedad distributiva") && t.regla!.includes("(a-b)\\cdot c")));
    // el mcm queda anotado mientras lo nombran los pasos «porque d·k = L» y se va cuando los dos denominadores ya son L (29-oct)
    const sn = fracciones(1, 2, 1, 3).demo;
    for (let i = 0; i < sn.transiciones.length; i++) {
      if (/porque \$\d+\\cdot \d+=6\$/.test(sn.transiciones[i].texto)) assert.ok(sn.estados[i + 1].some((f) => f.id === "Mm"), `T${i} nombra el mcm y no esta en la hoja`);
    }
    const iMira = sn.transiciones.findIndex((t) => t.texto.startsWith("Mira los denominadores"));
    assert.ok(sn.estados[iMira].some((f) => f.id === "Mm") && !sn.estados[iMira + 1].some((f) => f.id === "Mm"));
  });

  test("logaritmos: la comprobacion nace de la fila de referencia y la potencia se DESARROLLA (2^5 = 2·2·2·2·2 de a dos)", () => {
    for (const [b, m, n] of [[2, 4, 8], [2, 2, 2], [10, 2, 5]] as const) {
      const r = sumaLogaritmos(b, m, n);
      const e = r.demo.estados;
      assert.ok(e.slice(1).every((s) => s.some((f) => f.id === "ref")), "el ejercicio queda anotado hasta el final");
      const t = r.demo.transiciones.find((x) => (x.brotes ?? []).some((y) => y.hacia === "cm"))!;
      assert.ok(t.brotes!.filter((y) => y.desde === "ref").length >= 5, "los numeros y la base nacen del ejercicio anotado");
    }
    const r = sumaLogaritmos(2, 4, 8);
    const txt = r.demo.transiciones.map((x) => x.texto).join(" | ");
    for (const pista of ["$2\\cdot 2=4$", "$4\\cdot 2=8$", "$8\\cdot 2=16$", "$16\\cdot 2=32$", "Desarrollamos la potencia"]) assert.ok(txt.includes(pista), `falta: ${pista}`);
    // lo mismo por propiedad (6^2 = 36)
    const p = sumaLogaritmos(6, 2, 18);
    const tp = p.demo.transiciones.map((x) => x.texto).join(" | ");
    assert.ok(tp.includes("$6\\cdot 6=36$") && tp.includes("$2\\cdot 18=36$"));
  });

  test("logaritmos: cuando el numero es justo la base no hay paso vacio de 'escribir 2 como 2'", () => {
    const r = sumaLogaritmos(2, 2, 2);
    assert.ok(!r.demo.transiciones.some((t) => t.texto.includes("como producto de")));
    const q = sumaLogaritmosPropiedad(10, 2, 5); // 10 = 10: un solo b
    assert.ok(!q.demo.transiciones.some((t) => t.texto.includes("como una multiplicación")));
    assert.ok(q.demo.transiciones.some((t) => t.texto.includes("es justo $10$")));
  });

  test("logaritmos: la comprobacion no nombra una propiedad que la animacion no enseno, y la de propiedad es independiente (lectura 30-oct)", () => {
    const sig = sumaLogaritmos(2, 4, 8).demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    assert.ok(!sig.includes("propiedad del producto"), "el camino por significado no enseña esa propiedad");
    const prop = sumaLogaritmosPropiedad(6, 2, 18).demo.transiciones.find((t) => t.texto.includes("Comprobamos con la definición"))!;
    assert.ok(prop.texto.includes("sin usar la propiedad") && prop.texto.includes("x+y"), "la comprobacion usa solo la definicion");
  });

  test("cuadrados: el patron se nombra y se definen a y b ANTES de usar la formula (lectura 30-oct)", () => {
    for (const k of [2, 3, 15]) {
      const t = diferenciaCuadrados(k).demo.transiciones;
      const iFormula = t.findIndex((x) => x.regla?.includes("(a-b)(a+b)") && x.brotes?.length);
      assert.ok(iFormula > 3);
      for (const x of t.slice(0, iFormula)) {
        assert.ok(!/para usar la fórmula|como pide la fórmula|es de la forma/i.test(`${x.texto} ${x.porque}`), `usa la formula antes de mostrarla: ${x.texto}`);
      }
    }
  });

  test("fracciones: los productos grandes de la comprobacion se parten en decenas y unidades", () => {
    const t = fracciones(5, 12, 7, 8).demo.transiciones.map((x) => x.texto).join(" | ");
    assert.ok(t.includes("Partimos"), "falta partir el producto de dos cifras por dos cifras");
    assert.ok(!t.includes("31\\cdot 24=744"));
  });

  test("rechaza lo que no puede animar", () => {
    assert.ok(validarEcuacionLineal(1, 2, 3));
    assert.ok(validarEcuacionLineal(3, 0, 3));
    assert.ok(validarEcuacionLineal(3, 2.5, 3));
  });

  test("simplificar: ningun renglon de las listas de divisores pasa de 34 caracteres (cabe en un celular de 375 px)", () => {
    // medido en el barrido: 34 caracteres caben en la columna de 343 px; 36 se salen
    const renglones = (t: string) =>
      t.replace(/\\begin\{array\}\{l\}|\\end\{array\}/g, "").split("\\\\").map((r) => r.replace(/\\scriptsize|\\text\{([^}]*)\}|\\mathbf\{([^}]*)\}/g, "$1$2").replace(/\\ /g, " ").replace(/\s+/g, " ").trim());
    const demos = [];
    for (let d1 = 2; d1 <= 12; d1++) for (let d2 = 2; d2 <= 12; d2++) for (const n1 of [1, 5, 11, 20]) for (const n2 of [1, 7, 19, 20]) for (const r of [false, true]) demos.push(fracciones(n1, d1, n2, d2, r).demo);
    for (let a = 2; a <= 12; a++) for (const b of [-30, -7, 1, 30]) for (const c of [-99, -60, 11, 89, 99]) if (!validarEcuacionLineal(a, b, c)) demos.push(ecuacionLineal(a, b, c).demo);
    let vistas = 0;
    for (const d of demos) for (const f of d.estados.flat()) if (["Dn", "Dd", "Dc"].includes(f.id)) for (const r of renglones(f.tex)) {
      vistas++;
      assert.ok(r.length <= 26, `renglon demasiado largo (${r.length}): ${r}`);
    }
    assert.ok(vistas > 1000);
    // en la explicacion, cada formula de una lista tambien es corta (MathText no parte una formula)
    for (const d of demos) for (const t of d.transiciones) if (/Divisores de|en las dos listas/.test(t.texto))
      for (const m of t.texto.matchAll(/\$([^$]*)\$/g)) assert.ok(m[1].replace(/\\ /g, " ").length <= 34, `formula larga en el texto: ${m[1]}`);
    // y la lista de 96 se parte en renglones parejos, sin un numero suelto
    const l96 = renglones(fracciones(1, 8, 3, 9).demo.estados.flat().find((f) => f.id === "Dd")!.tex);
    assert.deepEqual(l96, ["Divisores de 72:", "1, 2, 3, 4,", "6, 8, 9, 12,", "18, 24, 36, 72"]);
  });

  test("listas: la negrita marca SOLO lo que esta en las dos listas, como en raiz (29-oct)", () => {
    const negritas = (t: string) => [...t.matchAll(/\\mathbf\{(\d+)\}/g)].map((m) => +m[1]);
    const sueltos = (t: string) => t.replace(/\\text\{[^}]*\}/g, "").replace(/\\mathbf\{\d+\}/g, "").match(/\d+/g)?.map(Number) ?? [];
    const demos = [];
    for (let d1 = 2; d1 <= 12; d1++) for (let d2 = 2; d2 <= 12; d2 += 3) for (const [n1, n2] of [[1, 1], [5, 7], [3, 9]]) for (const r of [false, true]) if (!validarFracciones(n1, d1, n2, d2)) demos.push(fracciones(n1, d1, n2, d2, r).demo);
    for (let a = 2; a <= 12; a++) for (const c of [-60, 11, 89]) demos.push(ecuacionLineal(a, 1, c).demo);
    let vistas = 0;
    for (const d of demos) {
      for (const e of d.estados) {
        const por = new Map(e.map((f) => [f.id, f.tex]));
        for (const [a, b] of [["Dn", "Dd"], ["Ma", "Mb"]]) {
          const ta = por.get(a);
          const tb = por.get(b);
          if (!ta || !tb) continue;
          const todos = (t: string) => [...negritas(t), ...sueltos(t)];
          const comunes = todos(ta).filter((x) => todos(tb).includes(x));
          for (const t of [ta, tb]) {
            assert.deepEqual(negritas(t).sort((x, y) => x - y), comunes.slice().sort((x, y) => x - y), `negrita fuera de los comunes: ${t}`);
            vistas++;
          }
        }
      }
    }
    assert.ok(vistas > 200);
  });

  test("lineal: la suma con signos distintos o los dos negativos nombra su regla de signos (29-oct)", () => {
    for (let a = 2; a <= 12; a++) {
      for (const b of [-30, -7, -1, 2, 9, 30]) {
        for (const c of [-99, -11, -4, 0, 5, 24, 99]) {
          if (validarEcuacionLineal(a, b, c)) continue;
          const d = ecuacionLineal(a, b, c).demo.transiciones;
          const n = c - b;
          const t3 = d.find((t) => t.texto.includes("los sumamos"))!;
          const tf = d.find((t) => t.texto.startsWith("Ahora la suma"))!;
          for (const [t, p, q] of [[t3, c, -b], [tf, n, b]] as const) {
            const necesita = (p < 0 && q < 0) || (p < 0 && q > 0) || (p > 0 && q < 0 && p + q < 0) || (p !== 0 && p + q === 0 && q !== 0);
            if (necesita) assert.ok(/negativo|signos distintos|se cancelan/.test(t.porque) && t.regla && t.regla !== "$a+b=c$", `${a}x${b}=${c}: ${p}+${q} sin regla de signos: ${t.porque}`);
            else assert.ok(!/negativo|signos distintos/.test(t.porque), `${a}x${b}=${c}: ${p}+${q} nombra una regla de signos que no aplica`);
          }
        }
      }
    }
    const neg = ecuacionLineal(3, 2, -4).demo.transiciones; // -4-2 = -6 y -6+2 = -4
    assert.ok(neg.find((t) => t.texto.includes("los sumamos"))!.regla === "$-a-b=-(a+b)$");
    assert.ok(neg.find((t) => t.texto.startsWith("Ahora la suma"))!.regla === "$-a+b=-(a-b)\\quad (a>b)$");
  });

  test("fracciones: la comprobacion escribe (a+b)·D = r·D antes de repartir, y el D nace de un D a la vista (29-oct)", () => {
    for (let d1 = 2; d1 <= 12; d1++) {
      for (let d2 = 2; d2 <= 12; d2++) {
        for (const [n1, n2] of [[1, 1], [5, 7], [3, 9], [20, 1]]) {
          for (const r of [false, true]) {
            if (validarFracciones(n1, d1, n2, d2)) continue;
            const d = fracciones(n1, d1, n2, d2, r).demo;
            const i = d.transiciones.findIndex((t) => t.texto.startsWith("Para quitar los denominadores multiplicamos"));
            assert.ok(i > 0, `${n1}/${d1}, ${n2}/${d2}: falta el paso de multiplicar los dos lados`);
            const t = d.transiciones[i];
            const e = d.estados[i + 1];
            // los parentesis abarcan la suma entera y el D sale de un denominador que se ve en la hoja
            assert.ok(e.some((f) => f.id === "Kpa") && e.some((f) => f.id === "Kpb"));
            for (const br of t.brotes!.filter((x) => x.hacia === "K6a" || x.hacia === "K6b")) {
              const D = e.find((f) => f.id === "K6a")!.tex.replace("{}\\cdot ", "");
              const [id, parte] = br.desde.split(".");
              const origen = d.estados[i].find((f) => f.id === id)!;
              if (parte === "d") assert.equal(origen.frac!.d, D, `${n1}/${d1}, ${n2}/${d2}: el ${D} nace de un ${origen.frac!.d}`);
              else assert.ok(origen.tex.includes(`\\mathbf{${D}}`));
            }
            // el paso anterior ya tiene la igualdad sin multiplicar, y el siguiente reparte (distributiva)
            assert.ok(d.estados[i].some((f) => f.id === "Ka0") && d.estados[i].some((f) => f.id === "Kc0"));
            const dist = d.transiciones[i + 1];
            assert.ok(dist.porque.includes("propiedad distributiva") && dist.visitas?.[0].desde === "K6a");
          }
        }
      }
    }
  });

  test("auditoria del 29-oct: signo del de mas valor sin signo, negrita solo con las dos listas, 0 por D, parentesis aparte", () => {
    const demos = [];
    for (let d1 = 2; d1 <= 12; d1++) for (let d2 = 2; d2 <= 12; d2 += 2) for (const [n1, n2] of [[1, 1], [5, 7], [3, 9]]) for (const r of [false, true]) if (!validarFracciones(n1, d1, n2, d2)) demos.push(fracciones(n1, d1, n2, d2, r).demo);
    for (let a = 2; a <= 12; a++) for (const b of [-7, 2, 9]) for (const c of [-60, -4, 11, 89]) demos.push(ecuacionLineal(a, b, c).demo);
    for (const d of demos) {
      for (const t of d.transiciones) {
        // «el signo del mas grande» con un -6 frente a un 2 es falso: se compara sin signo
        assert.ok(!/signo del más grande/.test(t.porque), t.porque);
        // ninguna lista del texto deja el punto final fuera de la formula (MathText lo baja solo a otro renglon)
        if (/Divisores de|Múltiplos de|dos listas/.test(t.texto)) assert.ok(!/\d\$\./.test(t.texto), `punto suelto: ${t.texto}`);
      }
      // una lista sola (sin su pareja a la vista) va sin negrita; y el paso que pone la negrita la nombra
      d.estados.forEach((e, i) => {
        for (const [a, b] of [["Dn", "Dd"], ["Ma", "Mb"]]) {
          const fa = e.find((f) => f.id === a);
          if (fa && !e.some((f) => f.id === b)) assert.ok(!fa.tex.includes("\\mathbf"), `negrita adelantada: ${fa.tex}`);
          if (fa && e.some((f) => f.id === b) && i > 0 && !d.estados[i - 1].some((f) => f.id === b)) assert.ok(d.transiciones[i - 1].texto.includes("En negrita"), "el texto no dice que es la negrita");
        }
      });
      // los parentesis de la comprobacion se van en su propio paso, sin visita encima
      const iQ = d.transiciones.findIndex((t) => t.fusiones.some((f) => f.desde.includes("Kpa")));
      if (iQ >= 0) {
        assert.ok(!d.transiciones[iQ].visitas, "los parentesis se van en el mismo gesto que la visita");
        assert.ok(d.transiciones[iQ - 1].porque.includes("distributiva"));
      }
    }
    const neg = ecuacionLineal(3, 2, -4).demo.transiciones.find((t) => t.texto.startsWith("Ahora la suma"))!;
    assert.ok(neg.porque.includes("más valor sin signo ($6>2$), el $-6$"), neg.porque);
    // resta que da 0: el 0 no es una fraccion, no tiene numerador
    const cero = fracciones(1, 4, 1, 4, true).demo.transiciones.find((t) => t.texto.startsWith("Ahora la respuesta"))!;
    assert.ok(cero.porque.includes("Cero por cualquier número es cero") && !cero.porque.includes("numerador"), cero.porque);
    // el D de la distributiva visita primero la fraccion de al lado (la segunda)
    const sn = fracciones(1, 2, 1, 3).demo.transiciones.find((t) => t.visitas?.[0].desde === "K6a")!;
    assert.deepEqual(sn.visitas![0].hacia, ["Kb0", "Ka0"]);
    // el punto que cierra una lista va dentro de la formula
    const resta = fracciones(3, 4, 5, 6, true).demo.transiciones.find((t) => t.texto.includes("(sin el signo menos)"))!;
    assert.ok(resta.texto.endsWith("$1.$"), resta.texto);
  });
});
