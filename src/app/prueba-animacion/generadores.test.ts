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
    for (const pista of ["potencia", "exponente", "tacha", "ya salió de la raíz"]) {
      assert.ok(texto.toLowerCase().includes(pista.toLowerCase()), `falta el paso: ${pista}`);
    }
    assert.ok(r.demo.transiciones.length >= 8);
  });

  const ids = (e: { id: string }[]) => e.map((f) => f.id);
  const todosLosTextos = (d: { transiciones: { texto: string; porque: string }[] }) => d.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");

  test("potencia: se ven los factores y el · viaja a ser el + (mismo id, sin aparecer de la nada)", () => {
    for (const [base, m, n] of [[2, 3, 4], ["x", 2, 3], [3, 7, 9]] as const) {
      const d = potenciaProducto(base, m, n).demo;
      // el estado de los factores: m factores y n factores, cada grupo con su etiqueta
      const conFactores = d.estados.find((e) => ids(e).includes("g1"))!;
      assert.ok(conFactores.find((f) => f.id === "g1")!.debajo?.includes(`${m}`), "falta la etiqueta de los m factores");
      assert.ok(conFactores.find((f) => f.id === "g2")!.debajo?.includes(`${n}`), "falta la etiqueta de los n factores");
      // el "por" y el "mas" son LA MISMA ficha: viaja, no se consume y reaparece
      const antes = d.estados.find((e) => ids(e).includes("b2") && ids(e).includes("g"))!;
      const despues = d.estados.find((e) => ids(e).includes("e2") && !ids(e).includes("b2"))!;
      assert.equal(antes.find((f) => f.id === "t")!.tex, "\\cdot");
      assert.equal(despues.find((f) => f.id === "t")!.tex, "+");
      // ningun exponente trae el "+" metido en su tex
      for (const e of d.estados) for (const f of e) if (f.sup && f.id !== "t") assert.ok(!f.tex.includes("+"), `el + no debe ir dentro de ${f.id}`);
    }
  });

  test("raiz numerica: 64 = 2·2·2·2·2·2 = 2^6 antes de usar el exponente", () => {
    const d = raizGeneral(2, 6, 3).demo;
    assert.ok(d.estados[1][0].tex.includes("2\\cdot 2\\cdot 2\\cdot 2\\cdot 2\\cdot 2") || d.estados[1][0].tex.includes("\\cdots"), "faltan los factores");
    assert.equal(d.estados[2][0].tex, "\\sqrt[3]{2^{6}}");
  });

  test("raiz: indice, base y exponente son fichas separadas; el indice viaja al denominador", () => {
    const d = raizGeneral("x", 6, 4).demo;
    const abierto = d.estados.find((e) => ids(e).includes("ik") && ids(e).includes("b") && ids(e).includes("x"))!;
    assert.ok(abierto, "falta el estado con la raiz abierta");
    const t = d.transiciones.find((t) => t.brotes?.some((b) => b.desde === "ik" && b.hacia === "h.d"))!;
    assert.ok(t, "el indice debe viajar a h.d");
    assert.ok(t.brotes!.some((b) => b.desde === "ik" && b.hacia === "h.n"), "el 1 del numerador debe nacer del indice");
    assert.ok(t.brotes!.some((b) => b.hacia === "o") && t.brotes!.some((b) => b.hacia === "c"), "los parentesis deben nacer de la base y el exponente");
    // el "por" entre exponentes es una pieza propia (el parentesis de la derecha que se vuelve ·), no va dentro del tex de h
    for (const e of d.estados) for (const f of e) if (f.id === "h") assert.ok(!f.tex.includes("cdot"), "el · no va dentro de h");
    assert.ok(d.estados.some((e) => e.some((f) => f.id === "c" && f.tex === "\\cdot")));
  });

  test("raiz: al simplificar la fraccion se ve de donde sale el factor antes de tachar", () => {
    const d = raizGeneral("x", 6, 4).demo; // 6/4 = 3·2 / 2·2
    const i = d.transiciones.findIndex((t) => t.fusiones.some((f) => f.modo === "tachar" && f.desde.includes("xg")));
    assert.ok(i > 0, "falta tachar");
    const factorizada = d.estados[i].find((f) => f.id === "xg")!;
    assert.ok(factorizada.frac!.n.includes("\\cdot") && factorizada.frac!.d.includes("\\cdot"), "falta 3·2 sobre 2·2");
    assert.ok(d.transiciones.slice(0, i).some((t) => t.texto.includes("mayor número que divide")), "falta nombrar el mcd");
  });

  test("raiz: el mcd sale de las listas de divisores (estados), el g baja a la fraccion y el 1 de 3·(1/2) se tacha", () => {
    const d = raizGeneral("x", 6, 4).demo; // g = 2, divisores de 6: 1 2 3 6; de 4: 1 2 4
    const lista = d.estados.find((e) => ids(e).includes("dvn") && ids(e).includes("dvk"))!;
    assert.ok(lista, "faltan las listas de divisores como estado");
    // los divisores comunes (1 y 2) van en negrita
    assert.ok(lista.find((f) => f.id === "dvn")!.tex.includes("\\mathbf{1},\\ \\mathbf{2},\\ 3,\\ 6"), "falta la lista de divisores de 6");
    assert.ok(lista.find((f) => f.id === "dvk")!.tex.includes("\\mathbf{1},\\ \\mathbf{2},\\ 4"), "falta la lista de divisores de 4");
    assert.ok(d.estados.some((e) => ids(e).includes("gg")), "falta el mcd como pieza");
    assert.ok(d.transiciones.some((t) => t.brotes?.some((b) => b.desde === "gg" && b.hacia === "xg.n")), "el g debe bajar a la fraccion");
    // el 1 del numerador y del denominador de 3·(1/2) se ve (n·1 sobre 1·k) y se tacha
    const conUnos = d.estados.find((e) => ids(e).includes("x2a"))!;
    assert.equal(conUnos.find((f) => f.id === "x2a")!.frac!.n, "6\\cdot 1");
    assert.equal(conUnos.find((f) => f.id === "x2a")!.frac!.d, "1\\cdot 4");
    assert.ok(d.transiciones.some((t) => t.fusiones.some((f) => f.modo === "tachar" && f.desde.includes("x2a"))), "falta tachar los 1");
  });

  test("potencia y exponentes enteros: b^n se calcula con productos parciales, uno por paso, sin borrar la fila", () => {
    const d = potenciaProducto(2, 3, 4).demo; // 2^7 = 128
    const calculos = d.transiciones.filter((t) => t.fusiones.length === 1 && t.fusiones[0].desde.length === 3 && t.fusiones[0].desde[1].startsWith("wc"));
    assert.equal(calculos.length, 6, "2^7 son 6 productos");
    const textos = calculos.map((t) => t.texto).join(" | ");
    for (const parcial of ["2\\cdot 2=4", "4\\cdot 2=8", "8\\cdot 2=16", "16\\cdot 2=32", "32\\cdot 2=64", "64\\cdot 2=128"]) assert.ok(textos.includes(parcial), `falta ${parcial}`);
    // la fila de factores que falta sigue a la vista mientras se multiplica (nunca se borra de golpe)
    const iPrimero = d.transiciones.indexOf(calculos[0]);
    assert.ok(ids(d.estados[iPrimero + 1]).includes("wf3") && ids(d.estados[iPrimero + 1]).includes("wf7"), "los factores que faltan deben seguir en pantalla");
    // 20^3
    const g = potenciaProducto(20, 1, 2).demo;
    assert.ok(g.transiciones.some((t) => t.texto.includes("20\\cdot 20=400")) && g.transiciones.some((t) => t.texto.includes("400\\cdot 20=8000")));
    // el resultado de raiz tambien: ∛64 = 4 = 2^2 -> 2·2 = 4
    const rr = raizGeneral(2, 6, 3).demo;
    assert.ok(rr.transiciones.some((t) => t.texto.includes("2\\cdot 2=4")));
  });

  test("raiz con resto: el radicando queda calculado (2∛4, no 2∛(2²)) y ∛9 no se deja como ∛(3²)", () => {
    const a = raizGeneral(2, 8, 3).demo; // 2^(8/3) = 2^2 · 2^(2/3) = 4 ∛4
    const ultimo = a.estados[a.estados.length - 1][0].tex;
    assert.equal(ultimo, "4\\sqrt[3]{4}");
    const b = raizGeneral(3, 2, 3).demo; // ∛9
    assert.equal(b.estados[b.estados.length - 1][0].tex, "\\sqrt[3]{9}");
    for (const base of [2, 3, 5]) for (const n of [2, 3, 4, 5, 7, 8, 10, 11]) for (const k of [2, 3, 4, 5, 6]) {
      if (validarRaiz(base, n, k)) continue;
      const r = raizGeneral(base, n, k).demo;
      const tex = r.estados[r.estados.length - 1].map((f) => f.tex).join("");
      assert.ok(!/\^\{\d+\}\}$/.test(tex) && !/\\sqrt(\[\d\])?\{\d+\^/.test(tex), `radicando sin calcular en ${base}^${n}/${k}: ${tex}`);
    }
  });

  test("raiz con resto: cociente y resto (5 = 2·2 + 1) existen como estado antes de partir el exponente", () => {
    const d = raizGeneral(2, 5, 2).demo;
    const fila = d.estados.find((e) => ids(e).includes("dn") && ids(e).includes("dr"))!;
    assert.ok(fila, "falta la fila n = q·k + r");
    assert.deepEqual(fila.filter((f) => ["dn", "pq", "dk", "dr"].includes(f.id)).map((f) => f.tex), ["5", "2", "2", "1"]);
    assert.ok(fila.find((f) => f.id === "pq")!.debajo?.includes("cociente") && fila.find((f) => f.id === "dr")!.debajo?.includes("resto"));
    // el cociente es la misma pieza que luego sube a ser el exponente entero
    const i = d.estados.indexOf(fila);
    assert.ok(ids(d.estados[i + 1]).includes("pq") && !ids(d.estados[i + 1]).includes("dn"));
  });

  test("raiz: el indice ik2 siempre lleva su etiqueta y las filas con puntos suspensivos dicen cuantos factores son", () => {
    for (const [base, n, k] of [["x", 2, 3], [2, 5, 2], [2, 8, 3], [3, 2, 3]] as const) {
      for (const e of raizGeneral(base, n, k).demo.estados) for (const f of e) if (f.id === "ik2") assert.ok(f.debajo?.includes("índice"), "ik2 sin etiqueta");
    }
    const d = raizGeneral(2, 8, 3).demo; // 256 = 2·2·...·2 (8 factores)
    const f = d.estados.flat().find((x) => x.id === "rf")!;
    assert.ok(f.tex.includes("\\cdots") && f.debajo?.includes("8"), "la fila con puntos debe decir 8 factores");
  });

  test("raiz con resto: la potencia perfecta se busca en una lista y la cuenta 12/4 = 3 se ve", () => {
    for (const [a, n, k, c] of [[2, 2, 2, 3], [3, 3, 3, 2], [2, 6, 3, 7]] as const) {
      const d = raizConFactor(a, n, k, c).demo;
      const lista = d.estados.find((e) => ids(e).includes("Sl"))!;
      assert.ok(lista, "falta la lista de potencias perfectas");
      assert.ok(ids(lista).includes("pv"), "la elegida esta en la lista");
      const cuenta = d.estados.find((e) => ids(e).includes("cu"))!;
      const cu = cuenta.find((f) => f.id === "cu")!;
      const exacta = a ** n;
      assert.equal(cu.frac!.n, `${exacta * c}`);
      assert.equal(cu.frac!.d, `${exacta}`);
      assert.equal(cuenta.find((f) => f.id === "pc")!.tex, `${c}`);
      assert.ok(d.transiciones.some((t) => t.texto.includes(`\\tfrac{${exacta * c}}{${exacta}}=${c}`)));
    }
    const d54 = raizConFactor(3, 3, 3, 2).demo; // 54 = 27·2
    assert.ok(todosLosTextos(d54).includes("54=27\\cdot 2"));
  });

  test("raiz con exponente fraccionario: base y numerador viajan al radicando, denominador al indice", () => {
    const d = raizGeneral("x", 2, 3).demo; // x^(2/3)
    const t = d.transiciones.find((t) => t.brotes?.some((b) => b.hacia === "ik2"))!;
    assert.ok(t.brotes!.some((b) => b.desde.endsWith(".d") && b.hacia === "ik2"), "el denominador va al indice");
    assert.ok(t.brotes!.some((b) => b.desde.endsWith(".n") && b.hacia === "nn"), "el numerador queda con la base");
  });

  test("raiz con parte entera: se ven b^(q+r/k) y b^q·b^(r/k), la base se copia y x^1 se simplifica", () => {
    for (const base of [2, "x"] as const) {
      const d = raizGeneral(base, 5, 2).demo; // b^(5/2) = b^(2+1/2)
      const texto = todosLosTextos(d);
      assert.ok(texto.includes(`${base}^{2+\\tfrac{1}{2}}=${base}^{2}\\cdot ${base}^{\\tfrac{1}{2}}`), "falta la forma b^q·b^(r/k)");
      assert.ok(d.transiciones.some((t) => t.brotes?.some((b) => b.desde === "b" && b.hacia === "b2")), "la base debe copiarse con una copia que viaja");
    }
    const x1 = raizGeneral("x", 3, 2).demo; // x^(3/2) = x^1 · raiz(x)
    assert.ok(x1.transiciones.some((t) => t.fusiones.some((f) => f.desde.includes("pq") && f.hacia === null)), "x^1 debe simplificarse a x");
    const x2 = raizGeneral("x", 5, 2).demo; // x^2 no se simplifica
    assert.ok(!x2.transiciones.some((t) => t.fusiones.some((f) => f.desde.includes("pq") && f.hacia === null)));
  });

  test("raiz: nunca dice que algo 'sale de la raiz' cuando ya estaba afuera", () => {
    const d = raizGeneral(2, 5, 2).demo;
    assert.ok(!todosLosTextos(d).includes("sale de la raíz"));
    const r = raizConFactor(2, 2, 2, 3).demo;
    assert.ok(!r.transiciones[r.transiciones.length - 1].texto.includes("sale de la raíz"));
  });

  test("raiz con resto: 12 = 4·3 con el 4 marcado como cuadrado perfecto, y despues 4 = 2·2 = 2^2", () => {
    const d = raizConFactor(2, 2, 2, 3).demo;
    const texto = todosLosTextos(d);
    assert.ok(texto.includes("12=4\\cdot 3"));
    assert.ok(texto.includes("cuadrado perfecto"));
    assert.ok(d.transiciones.some((t) => t.resaltar?.includes("pv")), "el 4 debe resaltarse");
    assert.ok(texto.includes("4=2\\cdot 2"));
    // a^n y c son piezas que viajan a su raiz (con su indice), no un solo q0
    assert.ok(d.estados.some((e) => ids(e).includes("pa") && ids(e).includes("pc") && ids(e).includes("ik1")));
    assert.ok(!d.estados.some((e) => ids(e).includes("q0")));
  });
});
