import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Ficha } from "./datos.ts";
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
    for (const pista of ["a=1", "b=-5", "c=6", "fórmula general", "entre paréntesis", "discriminante", "\\sqrt{1}", "dos caminos", "x=3", "x=2"]) {
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
    const nace = r.demo.estados.find((e) => e.some((f) => f.id === "S"))!;
    assert.ok(nace.find((f) => f.id === "S")!.salto);
    assert.ok(nace.some((f) => f.id === "eq"));
  });

  test("pasar un termino al otro lado es ARRASTRAR la misma pieza (mismo id) que cambia de signo, sin duplicarla", () => {
    const r = cuadratica(1, 0, 0, 0, 5, -6); // x^2 = 5x - 6: pasan -6 y 5x
    const e = r.demo.estados.map(aplanar);
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

// ---- saltos que audito auditor-de-pasos (8-oct): los valores viajan, los intermedios son estados, la comprobacion se ve
const limpia = (s: string) => s.replace(/\\textcolor\{[^}]*\}\{([^{}]*)\}/g, "$1").replace(/\\ /g, "").replace(/\s+/g, "");
const unir = (e: Ficha[]) => limpia(e.map((f) => (f.sup ? `^{${f.tex}}` : f.tex)).join(""));
type Caso = [number, number, number, number, number, number];
const EJEMPLOS: Caso[] = [
  [1, -2, 4, 0, 3, -2], // desordenada, b negativo despues de ordenar
  [2, 2, -4, 0, 0, 0], // ordenada, a distinto de 1 y c negativo
  [1, -5, 6, 0, 0, 0],
  [1, 4, 3, 0, 0, 0],
  [1, -4, 4, 0, 0, 0], // una sola solucion
];

describe("saltos de la formula general", () => {
  test("los valores a, b, c salen de su etiqueta con brote, UNO por paso, y la letra desaparece", () => {
    for (const [a1, b1, c1, a2, b2, c2] of EJEMPLOS) {
      assert.equal(validarCuadratica(a1, b1, c1, a2, b2, c2), null);
      const r = cuadratica(a1, b1, c1, a2, b2, c2);
      const { a, b, c } = r.resumen;
      const e = r.demo.estados.map(aplanar);
      const t = r.demo.transiciones;
      const idx = (letra: string) => t.findIndex((x) => x.texto.startsWith(`Reemplazamos $${letra}$`));
      const [ia, ib, ic] = [idx("a"), idx("b"), idx("c")];
      assert.ok(ia >= 0 && ia < ib && ib < ic, "a, b y c, en ese orden y cada una en su paso");
      const ocurrencias = { a: 2, b: 2, c: 1 };
      const valores = { a, b, c };
      for (const [letra, i] of [["a", ia], ["b", ib], ["c", ic]] as const) {
        const paso = t[i];
        assert.equal(paso.brotes?.length, ocurrencias[letra], `${letra}: un brote por cada lugar donde aparece`);
        const origenes = new Set(paso.brotes!.map((br) => br.desde));
        assert.equal(origenes.size, 1, "todos salen de la misma etiqueta");
        const origen = [...origenes][0];
        // la etiqueta del origen ya estaba a la vista y dice la letra con su valor
        assert.ok(e[i].find((f) => f.id === origen)?.debajo?.includes(`${letra}=${valores[letra]}`), `${letra}: el brote sale del termino que lleva la etiqueta`);
        for (const br of paso.brotes!) {
          const nueva = e[i + 1].find((f) => f.id === br.hacia)!;
          assert.ok(nueva.tex.includes(String(Math.abs(valores[letra]))), `${letra}: la pieza nueva lleva el valor`);
          assert.ok(!e[i].some((f) => f.id === br.hacia), "la pieza nace en este paso");
        }
        // las letras que se reemplazan desaparecen (y solo esas)
        const letras = paso.fusiones.flatMap((f) => f.desde);
        assert.equal(letras.length, ocurrencias[letra]);
        for (const l of letras) {
          assert.ok(e[i].find((f) => f.id === l)?.tex.includes(`{${letra}}`), "lo que desaparece es la letra");
          assert.ok(!e[i + 1].some((f) => f.id === l), "la letra ya no esta");
        }
      }
      // la formula esta en piezas con id: -b, b^2, 4ac, 2a, la raiz y el +/-
      const nace = e[t.findIndex((x) => x.texto.includes("debajo la fórmula")) + 1];
      for (const id of ["Fneg", "Fb1", "Fpm", "Fr", "Fb2", "Fs2", "F4", "Fa1", "Fc", "F2", "Fa2"]) assert.ok(nace.some((f) => f.id === id), `falta la pieza ${id}`);
    }
  });

  test("todo 'x=y' aritmetico escrito en un texto existe como estado en ese paso (formula y comprobacion)", () => {
    let revisados = 0;
    for (const caso of [...EJEMPLOS, [1, -3, -4, 0, 0, 0], [3, -5, -2, 0, 0, 0], [1, 6, 8, 0, 0, 0], [2, -7, 3, 0, 0, 0]] as Caso[]) {
      if (validarCuadratica(...caso)) continue;
      const r = cuadratica(...caso);
      const t = r.demo.transiciones;
      const desde = t.findIndex((x) => x.texto.startsWith("Reemplazamos $a$"));
      t.forEach((x, i) => {
        if (i < desde) return;
        for (const seg of x.texto.match(/\$[^$]+\$/g) ?? []) {
          const s = seg.slice(1, -1);
          const sin = s.replace(/\\cdot/g, "").replace(/\^\{2\}/g, "");
          if (!s.includes("=") || !/^[-+()\d\s=]+$/.test(sin)) continue;
          const hoja = `${unir(r.demo.estados[i])}|${unir(r.demo.estados[i + 1])}`;
          for (const parte of s.split("=")) {
            assert.ok(hoja.includes(limpia(parte)), `${caso.join(",")}: T${i} el texto dice ${s} pero ${parte} no esta en la hoja`);
          }
          revisados++;
        }
      });
    }
    assert.ok(revisados > 100, `solo ${revisados} cuentas revisadas`);
  });

  test("los intermedios son estados: (-5)^2 = (-5).(-5) = 25 y 2^2 = 2.2 = 4", () => {
    const neg = cuadratica(1, -5, 6).demo; // b negativo
    const pos = cuadratica(1, 4, 3).demo; // b positivo
    const piezas = (d: typeof neg) => d.estados.flatMap(aplanar).map((f) => limpia(f.tex));
    for (const p of ["(-5)\\cdot(-5)", "25"]) assert.ok(piezas(neg).includes(p), `falta el estado ${p}`);
    for (const p of ["4\\cdot4", "16"]) assert.ok(piezas(pos).includes(p), `falta el estado ${p}`);
    // 2^2 = 2.2 = 4 (b = 2)
    const dos = cuadratica(2, 2, -4).demo;
    for (const p of ["2\\cdot2", "4"]) assert.ok(piezas(dos).includes(p), `falta el estado ${p}`);
    // el cuadrado y su producto estan en pasos distintos
    const iProd = neg.estados.findIndex((e) => aplanar(e).some((f) => limpia(f.tex) === "(-5)\\cdot(-5)"));
    const iRes = neg.estados.findIndex((e) => aplanar(e).some((f) => f.id === "Pn"));
    assert.ok(iProd >= 0 && iRes === iProd + 1);
  });

  test("restar un negativo pasa por la suma: 4-(-32) = 4+32 = 36", () => {
    const r = cuadratica(2, 2, -4); // D = 4 + 32
    const piezas = r.demo.estados.flatMap(aplanar).map((f) => limpia(f.tex));
    assert.ok(piezas.includes("4+32"), "falta el estado 4+32");
    assert.ok(piezas.includes("36"));
    const i = r.demo.estados.findIndex((e) => aplanar(e).some((f) => limpia(f.tex) === "4+32"));
    assert.ok(aplanar(r.demo.estados[i - 1]).some((f) => limpia(f.tex) === "(-32)"), "antes estaba la resta de un negativo");
    assert.ok(aplanar(r.demo.estados[i + 1]).some((f) => limpia(f.tex) === "36"), "despues se calcula");
    // con 4ac positivo no se inventa la conversion
    assert.ok(!cuadratica(1, 4, 3).demo.estados.flatMap(aplanar).some((f) => f.id === "Dm"));
  });

  test("la raiz pasa por 36 = 6.6 = 6^2 y se tacha con su exponente antes de quedar 6", () => {
    for (const caso of [[1, -3, -4, 0, 0, 0], [2, 2, -4, 0, 0, 0]] as Caso[]) {
      const r = cuadratica(...caso);
      const { d, D } = r.resumen;
      const e = r.demo.estados.map(aplanar);
      const iDD = e.findIndex((s) => s.some((f) => f.id === "Dd" && f.tex === String(D)));
      const iProd = e.findIndex((s) => s.some((f) => f.id === "Rdd" && limpia(f.tex) === `${d}\\cdot${d}`));
      const iPot = e.findIndex((s) => s.some((f) => f.id === "Rds"));
      const iFin = e.findIndex((s, k) => k > iPot && s.some((f) => f.id === "Rd") && !s.some((f) => f.id === "Rds"));
      assert.ok(iDD >= 0 && iDD < iProd && iProd < iPot && iPot < iFin, `${caso.join(",")}: la raiz salta pasos`);
      assert.equal(e[iPot].find((f) => f.id === "Rds")!.tex, "2");
      const tachar = r.demo.transiciones[iFin - 1].fusiones[0];
      assert.equal(tachar.modo, "tachar");
      assert.ok(tachar.desde.includes("Fr") && tachar.desde.includes("Rds"), "se tachan la raiz y el exponente");
    }
  });

  test("la comprobacion muestra la sustitucion y cada cuenta, una operacion por paso", () => {
    const r = cuadratica(1, -5, 6); // x = 3 y 2
    const e = r.demo.estados.map(aplanar);
    const t = r.demo.transiciones;
    const textos = t.map((x) => x.texto);
    const iEmpieza = textos.findIndex((x) => x.startsWith("Comprobamos $x_{1}=3$"));
    assert.ok(iEmpieza >= 0);
    const tras = (k: number) => e[iEmpieza + 1 + k].flatMap((f) => (f.tex ? [limpia(f.tex)] : []));
    // la ecuacion original vuelve a escribirse y el 3 viaja desde la solucion
    assert.ok(e[iEmpieza + 1].some((f) => limpia(f.tex) === "x^{2}"));
    assert.ok(t[iEmpieza].brotes!.length > 0 && t[iEmpieza].brotes!.every((br) => /^(Rl|Rr|Rz|RefS)/.test(br.desde)), "la ecuacion nace de la fila de referencia, no de la solucion");
    assert.ok(t[iEmpieza + 1].brotes!.every((br) => br.desde === "r1"), "el valor sale de la solucion");
    assert.ok(tras(1).includes("3^{2}"));
    assert.ok(tras(2).includes("9"), "3^2 = 9 sin repetir 3.3 (n.n ya se enseno con b^2)");
    assert.ok(!e.slice(iEmpieza + 1, iEmpieza + 6).some((s) => s.some((f) => limpia(f.tex) === "3\\cdot3")), "no se repite 3.3");
    assert.ok(tras(3).includes("15"), "5.3 = 15");
    // sumas de a dos
    assert.ok(textos.some((x) => x.includes("$9-15=-6$")));
    assert.ok(textos.some((x) => x.includes("$-6+6=0$")));
    const final = textos.findIndex((x, i) => i > iEmpieza && x.startsWith("Comprobamos $x_{1}=3$: a la izquierda"));
    assert.ok(final > iEmpieza + 5, "hay varios pasos entre escribir la ecuacion y concluir");
    assert.ok(textos[final].includes("queda $0$ y a la derecha queda $0$"));
    // cada fusion es una cuenta (nunca dos operaciones en una pieza)
    for (const k of [2, 3]) assert.equal(t[iEmpieza + k].fusiones.length, 1);
  });

  test("restar un negativo en la comprobacion tambien pasa por la suma (x negativo)", () => {
    const r = cuadratica(1, 5, 6); // x = -2 y -3: -5x... 5x con x negativo da negativo
    const textos = r.demo.transiciones.map((x) => x.texto);
    assert.ok(textos.some((x) => x.includes("cuidamos los signos")), "falta el paso de signos");
    // la ecuacion x^2+5x+6 con x=-2: 4 + (-10) + 6 -> 4 - 10 + 6
    assert.ok(textos.some((x) => x.includes("$+(-10)=-10$")));
  });

  test("ningun paso de la comprobacion usa reglas con la palabra negativo ni 'a-(-b)' fuera de donde corresponde (grilla)", () => {
    for (let b = -8; b <= 8; b++) {
      for (let c = -8; c <= 8; c++) {
        if (validarCuadratica(1, b, c)) continue;
        const r = cuadratica(1, b, c);
        const t = r.demo.transiciones;
        const iC = t.findIndex((x) => x.texto.startsWith("Comprobamos"));
        for (const x of t.slice(iC)) assert.ok(!(x.regla ?? "").includes("negativo") && !(x.regla ?? "").includes("a-(-b)"), `b=${b} c=${c}`);
      }
    }
  });
});

// ---- arreglos de la auditoria independiente (8-oct): piezas que viajan, Delta visible, fila de referencia, mas corto
describe("arreglos de la auditoria independiente", () => {
  test("x=(5±1)/2: se llaman x1 y x2, la fraccion se copia por brote, la suma es una fusion de piezas y la raya es real", () => {
    const r = cuadratica(1, -5, 6);
    const t = r.demo.transiciones;
    const e = r.demo.estados.map(aplanar);
    const iAbre = t.findIndex((x) => x.texto.includes("Llamamos $x_{1}$ y $x_{2}$"));
    assert.ok(iAbre >= 0, "falta decir que se llaman x1 y x2");
    // la fraccion de x2 nace de la de x1, y el = de x2 nace del =
    assert.ok(t[iAbre].brotes!.some((br) => br.desde === "F" && br.hacia === "Q2"), "la fraccion de x2 se copia de la formula");
    assert.ok(t[iAbre].brotes!.some((br) => br.desde === "Fe" && br.hacia === "E2"), "el = de x2 nace del =");
    // la suma 5+1 y la resta 5-1 son fusiones de TRES piezas separadas (numero, signo, numero)
    const iSuma = t.findIndex((x) => x.texto.includes("$5+1=6$"));
    assert.ok(iSuma > iAbre);
    assert.deepEqual(t[iSuma].fusiones.map((f) => f.desde.length), [3, 3]);
    for (const f of t[iSuma].fusiones[0].desde) assert.ok(e[iSuma].some((p) => p.id === f), "las piezas estaban sueltas");
    // las dos son fracciones con piezas (raya real) y despues se calculan: 6/2 = 3
    assert.ok(e[iSuma + 1].filter((p) => p.frac?.nPiezas).length === 2, "dos fracciones con piezas");
    assert.ok(t[iSuma + 1].texto.includes("\\dfrac{6}{2}=3"));
    assert.ok(!t.some((x) => `${x.texto} ${x.porque}`.includes("÷")));
    // ya no hay una ficha unica con "x_{1}=\dfrac{...}" ni "ó" pegado
    assert.ok(!e.flat().some((p) => p.tex.includes("x_{1}=")), "x1 y su valor son piezas distintas");
  });

  test("la formula es una fraccion con raya real desde que aparece: letras en piezas, raiz que abarca el radicando, sin 'entre'", () => {
    for (const caso of EJEMPLOS) {
      const r = cuadratica(...caso);
      const t = r.demo.transiciones;
      const i = t.findIndex((x) => x.texto.includes("debajo la fórmula"));
      const F = r.demo.estados[i + 1].find((f) => f.id === "F")!;
      assert.deepEqual(F.frac?.nPiezas?.map((p) => p.id), ["Fneg", "Fb1", "Fpm", "Fr"], "arriba: -b, mas o menos y la raiz");
      assert.deepEqual(F.frac?.dPiezas?.map((p) => p.id), ["F2", "Fa2"], "abajo: 2a");
      const raizF = F.frac!.nPiezas!.find((p) => p.id === "Fr")!;
      assert.deepEqual(raizF.rad?.map((p) => p.id), ["Fb2", "Fs2", "Fmn", "F4", "Fa1", "Fc"], "la raiz abarca b^2-4ac");
      // ningun estado escribe la division con la palabra "entre" ni con parentesis sueltos de la raiz
      for (const s of r.demo.estados.flatMap(aplanar)) {
        assert.ok(!s.tex.includes("entre") && !s.tex.includes("\\surd"), `${caso.join(",")}: queda ${s.tex}`);
        if (/^F(o|c1|c2|en)$/.test(s.id)) assert.fail(`${caso.join(",")}: queda la pieza ${s.id}`);
      }
      // la fraccion sigue con raya hasta que se divide (nunca vuelve a escribirse en linea)
      const iDiv = t.findIndex((x) => x.texto.startsWith("Dividimos"));
      for (let k = i + 1; k <= iDiv; k++) assert.ok(r.demo.estados[k].some((f) => f.frac?.nPiezas), `${caso.join(",")}: E${k} sin fraccion`);
    }
  });

  test("Delta se ve: la pieza del discriminante lleva la etiqueta Delta y el paso la nombra", () => {
    for (const caso of [[1, -5, 6, 0, 0, 0], [2, 2, -4, 0, 0, 0]] as Caso[]) {
      const r = cuadratica(...caso);
      const t = r.demo.transiciones;
      const i = t.findIndex((x) => x.texto.includes("se escribe $\\Delta$"));
      assert.ok(i >= 0);
      assert.ok(aplanar(r.demo.estados[i + 1]).some((f) => f.id === "Dd" && f.debajo === "\\Delta"), "el estado siguiente muestra Delta");
    }
  });

  test("la raiz de 0 y de 1 es un solo paso; desde 4 se mantiene el proceso completo", () => {
    const uno = cuadratica(1, -5, 6); // D = 1
    assert.ok(!uno.demo.estados.flatMap(aplanar).some((f) => f.id === "Rdd"), "sin 1.1 ni 1^2");
    assert.ok(uno.demo.transiciones.some((x) => x.texto.includes("\\sqrt{1}=1")));
    const cero = cuadratica(1, -4, 4); // D = 0
    assert.ok(!cero.demo.estados.flatMap(aplanar).some((f) => f.id === "Rdd"));
    const cuatro = cuadratica(1, 0, 0, 0, 5, -6 + 0); // D = 1 tambien: solo para verificar que no rompe
    assert.equal(cuatro.resumen.d, 1);
    assert.ok(cuadratica(1, -3, -4).demo.estados.flatMap(aplanar).some((f) => f.id === "Rdd"), "D = 25 conserva el proceso");
  });

  test("la regla del paso que calcula b.b no es la inversa (n.n = n^2) y la comprobacion no repite 3.3", () => {
    const r = cuadratica(2, 2, -4); // b = 2
    const paso = r.demo.transiciones.find((x) => x.texto.startsWith("Ahora multiplicamos"))!;
    assert.ok(!paso.regla!.includes("n^{2}"), paso.regla);
    const textos = r.demo.transiciones.map((x) => x.texto).join(" | ");
    assert.ok(!/\$\(?-?\d+\)?\^\{2\}=\(?-?\d+\)?\\cdot \(?-?\d+\)?\$/.test(textos.slice(textos.indexOf("Comprobamos"))), "la comprobacion no expande n^2 = n.n otra vez");
  });

  test("sumar los semejantes de x y de los numeros solos es UN paso con dos fusiones independientes", () => {
    const r = cuadratica(1, -2, 4, 0, 3, -2);
    const t = r.demo.transiciones.filter((x) => x.texto.includes("Sumamos los"));
    assert.equal(t.length, 1);
    assert.equal(t[0].fusiones.length, 2);
    assert.ok(t[0].texto.includes("Sumamos los de $x$") && t[0].texto.includes("Sumamos los números solos"));
  });

  test("la comprobacion nace de la fila de referencia, que existe desde el primer paso y se queda", () => {
    for (const caso of EJEMPLOS) {
      const r = cuadratica(...caso);
      const e = r.demo.estados.map(aplanar);
      assert.ok(!e[0].some((f) => f.id === "RefS"), "al empezar solo esta el enunciado");
      assert.ok(r.demo.transiciones[0].brotes!.some((br) => br.hacia === "RefS"), "la referencia nace de la ecuacion en el primer paso");
      for (const s of e.slice(1)) assert.ok(s.some((f) => f.id === "RefS"), "la referencia no desaparece");
      // lo que dice la fila de referencia es la ecuacion original
      const refTex = limpia(e.at(-1)!.filter((f) => /^(Rl|Rr|Re|Rz)/.test(f.id)).map((f) => f.tex).join(""));
      const [a1, b1, c1, a2, b2, c2] = caso;
      const lado = (a: number, b: number, c: number) => {
        let s = "";
        for (const [k, v] of [["x^{2}", a], ["x", b], ["", c]] as const) {
          if (v === 0) continue;
          s += `${v < 0 ? "-" : s ? "+" : ""}${Math.abs(v) === 1 && k ? "" : Math.abs(v)}${k}`;
        }
        return s || "0";
      };
      assert.equal(refTex, limpia(`${lado(a1, b1, c1)}=${lado(a2, b2, c2)}`));
    }
  });

  test("es mas corta: la comprobacion y la raiz ya no repiten lo enseñado", () => {
    // antes tenia 44 transiciones
    assert.ok(cuadratica(1, -5, 6).demo.transiciones.length <= 36, `${cuadratica(1, -5, 6).demo.transiciones.length} pasos`);
  });
});
