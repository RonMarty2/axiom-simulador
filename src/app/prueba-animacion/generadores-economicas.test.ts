import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { aplanar, type Demo, type Ficha } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { interesSimple, nf, validarInteres, type UnidadTiempo } from "./generadores-economicas.ts";

const ultimo = (d: Demo) => aplanar(d.estados.at(-1)!);
const textos = (d: Demo) => [d.intro, ...d.transiciones.flatMap((t) => [t.texto, t.porque, t.regla ?? ""])];
const idxTexto = (d: Demo, re: RegExp) => d.transiciones.findIndex((t) => re.test(t.texto));

const VOSEO = /\b(podés|tenés|hacé|fijate|mirá|calculá|sabés|querés|usá|probá|escribí|reemplazá|anotá|multiplicá|sumá|restá|dividí|tachá|vos)\b/i;

/** controles comunes, ademas de revisar() */
function controles(d: Demo, etiqueta: string) {
  revisar(d, etiqueta);
  for (const [i, t] of d.transiciones.entries()) {
    assert.ok(t.regla, `${etiqueta}: T${i} sin regla`);
    for (const s of [t.texto, t.porque, d.intro]) {
      const fuera = s.replace(/\$[^$]*\$/g, "");
      assert.ok(!/[/÷^]/.test(fuera), `${etiqueta}: T${i} tiene / ÷ o ^ fuera de LaTeX: ${s}`);
      assert.ok(!VOSEO.test(s), `${etiqueta}: T${i} voseo: ${s}`);
    }
  }
  // LaTeX con doble barra: una sola barra se come la letra siguiente (\t, \f, \b, \n, \r se vuelven caracteres de control)
  for (const s of [...textos(d), ...d.estados.flatMap((e) => aplanar(e).flatMap((f) => [f.tex, f.debajo ?? ""]))]) {
    assert.ok(!/[\t\f\b\v\r\n]/.test(s), `${etiqueta}: hay una barra invertida simple en LaTeX: ${JSON.stringify(s)}`);
  }
}

/** cuenta exacta con enteros: el interes en centavos = C·r·t12/12, donde t12 es el tiempo en doceavos de año */
function centavos(C: number, r: number, t: number, unidad: UnidadTiempo): number {
  const t12 = unidad === "meses" ? t : 12 * t;
  const num = C * r * t12; // como mucho 100000·30·120: entero exacto
  assert.equal(num % 12, 0, "el interes no cae en centavos");
  return num / 12;
}

const CAPITALES = [100, 250, 1234, 2000, 12000, 100000];

describe("interes simple: toda combinacion permitida", () => {
  test("años y meses: revisar, cuenta exacta, resultado y monto en la hoja, comprobaciones", () => {
    let casos = 0;
    for (const unidad of ["años", "meses"] as const) {
      const tMax = unidad === "años" ? 10 : 60;
      for (const C of CAPITALES) {
        for (let r = 1; r <= 30; r += 1) {
          for (let t = 1; t <= tMax; t++) {
            if (validarInteres(C, r, t, unidad)) continue;
            // la grilla completa es enorme: todos los t de las tasas 1 a 3, un quinto del resto y siempre el capital 2000
            if ((r * 7 + t) % 9 !== 0 && r > 3 && t > 3 && C !== 2000) continue;
            const res = interesSimple(C, r, t, unidad);
            const etq = `${C},${r},${t},${unidad}`;
            controles(res.demo, etq);
            const cents = centavos(C, r, t, unidad);
            assert.equal(Math.round(res.resumen.I * 100), cents, `${etq}: I distinto de la cuenta exacta`);
            assert.equal(Math.round(res.resumen.M * 100), C * 100 + cents, `${etq}: M distinto de C + I`);
            const e = ultimo(res.demo);
            assert.ok(e.some((f) => f.id === "Ires" && f.tex === nf(res.resumen.I)), `${etq}: falta el interes en la hoja`);
            assert.ok(e.some((f) => f.id === "Mres" && f.tex === nf(res.resumen.M)), `${etq}: falta el monto en la hoja`);
            // las dos comprobaciones dan lo mismo que el resultado
            assert.ok(e.some((f) => f.id === "Cres" && f.tex === nf(res.resumen.I)), `${etq}: la comprobacion del interes no coincide`);
            assert.ok(e.some((f) => f.id === "Mkr" && f.tex === nf(res.resumen.I)), `${etq}: M - C no da el interes`);
            casos++;
          }
        }
      }
    }
    assert.ok(casos > 600, `solo ${casos} casos`);
  });
});

describe("interes simple: ejemplos", () => {
  test("2000 Bs al 5 % durante 18 meses: 3/2 años, I = 150 y M = 2150", () => {
    const r = interesSimple(2000, 5, 18, "meses");
    assert.equal(r.resumen.I, 150);
    assert.equal(r.resumen.M, 2150);
    assert.equal(r.resumen.tn, 3);
    assert.equal(r.resumen.td, 2);
    const d = r.demo;
    controles(d, "18 meses");
    // 18/12 = 3/2 con el 6 tachado
    assert.ok(d.transiciones.some((t) => t.descompone && t.texto.includes("18=3\\cdot 6") && t.texto.includes("12=2\\cdot 6")));
    assert.ok(d.transiciones.some((t) => t.fusiones.some((f) => f.modo === "tachar" && f.desde.includes("Tng") && f.desde.includes("Tdg"))));
    // los meses se tachan con los meses del factor de conversion
    assert.ok(d.transiciones.some((t) => t.fusiones.some((f) => f.modo === "tachar" && f.desde.includes("Dtu") && f.desde.includes("FCdu"))));
    // cuentas del texto: 2000·5 = 10000, 10000/100 = 100, 100·3 = 300, 300/2 = 150
    const todo = d.transiciones.map((t) => t.texto).join(" ");
    for (const frag of ["2000\\cdot 5=10000", "\\dfrac{10000}{100}=100", "100\\cdot 3=300", "\\dfrac{300}{2}=150", "2000+150=2150"]) assert.ok(todo.includes(frag), `falta ${frag}`);
    // cuentas de la comprobacion: 2000·3 = 6000, 6000/2 = 3000, 3000·5 = 15000, 15000/100 = 150, 2150 - 2000 = 150
    for (const frag of ["2000\\cdot 3=6000", "\\dfrac{6000}{2}=3000", "3000\\cdot 5=15000", "\\dfrac{15000}{100}=150", "2150-2000=150"]) assert.ok(todo.includes(frag), `falta ${frag}`);
  });

  test("tiempo en años: no hay conversion de unidades y 2000 Bs al 5 % por 3 años da 300", () => {
    const r = interesSimple(2000, 5, 3, "años");
    assert.equal(r.resumen.I, 300);
    assert.equal(r.resumen.M, 2300);
    const d = r.demo;
    controles(d, "3 años");
    const ids = new Set(d.estados.flatMap((e) => aplanar(e).map((f) => f.id)));
    assert.ok(!ids.has("FC") && !ids.has("Tf"), "con el tiempo en años no se convierte nada");
    // se dice que el tiempo ya esta en años y no hay pasos vacios (revisar ya lo vigila)
    assert.ok(d.transiciones.some((t) => t.texto.includes("ya está en años")));
    assert.ok(!d.transiciones.some((t) => t.texto.includes("meses a años")));
  });

  test("meses que son años completos: 24 meses = 2 años enteros (se divide, no se simplifica)", () => {
    const r = interesSimple(1000, 10, 24, "meses");
    controles(r.demo, "24 meses");
    assert.equal(r.resumen.tAnios, 2);
    assert.equal(r.resumen.I, 200);
    assert.ok(idxTexto(r.demo, /Son años completos/) >= 0);
    assert.ok(!r.demo.transiciones.some((t) => t.descompone), "no hay nada que simplificar");
  });

  test("meses que no se simplifican: 5 meses = 5/12 y el texto lo dice", () => {
    const r = interesSimple(1200, 6, 5, "meses");
    controles(r.demo, "5 meses");
    assert.equal(r.resumen.td, 12);
    assert.ok(idxTexto(r.demo, /único que está en las dos listas es el \$1\$/) >= 0);
    assert.equal(r.resumen.I, 30);
  });

  test("hay decimales: 250 Bs al 5 % por 18 meses da 18,75 y se escribe con coma", () => {
    const r = interesSimple(250, 5, 18, "meses");
    controles(r.demo, "decimales");
    assert.equal(r.resumen.I, 18.75);
    assert.equal(r.resumen.M, 268.75);
    const e = ultimo(r.demo);
    assert.ok(e.some((f) => f.id === "Ires" && f.tex === "18{,}75"));
    assert.ok(e.some((f) => f.id === "Mres" && f.tex === "268{,}75"));
  });

  test("el enunciado propio reemplaza al de ejemplo", () => {
    const r = interesSimple(2000, 5, 3, "años", "Mi enunciado.");
    assert.equal(r.demo.intro, "Mi enunciado.");
  });
});

describe("interes simple: orden pedagogico (anotar y reemplazar)", () => {
  const d = interesSimple(2000, 5, 18, "meses").demo;
  const etiquetas = d.estados.map((e) => aplanar(e).filter((f) => f.debajo).length);

  test("las etiquetas van de una en una: C, r, t", () => {
    for (let i = 1; i < etiquetas.length; i++) assert.ok(etiquetas[i] - etiquetas[i - 1] <= 1, `T${i - 1} pone mas de una etiqueta`);
    assert.equal(Math.max(...etiquetas), 3);
  });

  test("primero se ordena (tasa y tiempo), despues se etiqueta, despues la formula, despues se reemplaza, despues se calcula", () => {
    const tasa = idxTexto(d, /por cada cien/);
    const tiempo = idxTexto(d, /Hay que pasar los/);
    const etC = idxTexto(d, /Lo llamamos \$C\$/);
    const etr = idxTexto(d, /La llamamos \$r\$/);
    const ett = idxTexto(d, /Lo llamamos \$t\$/);
    const formula = idxTexto(d, /fórmula del interés simple, todavía con letras/);
    const repC = idxTexto(d, /Reemplazamos \$C\$ por \$2000\$/);
    const repr = idxTexto(d, /Reemplazamos \$r\$/);
    const rept = idxTexto(d, /Reemplazamos \$t\$/);
    const calc = idxTexto(d, /Primero el capital por la tasa/);
    const orden = [tasa, tiempo, etC, etr, ett, formula, repC, repr, rept, calc];
    assert.ok(orden.every((x) => x >= 0), `falta un paso: ${orden}`);
    assert.deepEqual([...orden].sort((a, b) => a - b), orden, "los pasos no van en el orden del patron");
  });

  test("cada dato vuela a la formula: el reemplazo de cada letra es 'viajar' con un brote desde el dato", () => {
    for (const [letra, ids] of [["Fc", ["Dc"]], ["Fr", ["Drn", "Drd"]], ["Ft", ["Tna", "Tda"]]] as const) {
      const t = d.transiciones.find((x) => x.fusiones.some((f) => f.desde.includes(letra)));
      assert.ok(t, `no se reemplaza ${letra}`);
      assert.equal(t!.fusiones[0].modo, "viajar");
      for (const o of ids) assert.ok((t!.brotes ?? []).some((b) => b.desde === o), `${letra}: falta el brote desde ${o}`);
    }
  });

  test("la formula con letras nace de lo que piden (brotes desde Dq1) con letras de colores", () => {
    const t = d.transiciones.find((x) => x.regla === "$I=C\\cdot r\\cdot t$" && (x.brotes ?? []).length > 0)!;
    assert.ok(t.brotes!.every((b) => b.desde === "Dq1"));
    const f = d.estados[d.transiciones.indexOf(t) + 1];
    assert.ok(f.some((x) => x.id === "Fc" && x.tex.includes("\\textcolor")));
  });

  test("nunca una multiplicacion pasa de letras a calculada en un salto: la unidad de Bs vuelve al final", () => {
    const iU = d.transiciones.findIndex((t) => (t.brotes ?? []).some((b) => b.desde === "Dcu" && b.hacia === "Iu"));
    assert.ok(iU > idxTexto(d, /Dividimos: \$\\dfrac\{300\}\{2\}/));
  });
});

describe("interes simple: validar", () => {
  test("acepta los ejemplos", () => {
    assert.equal(validarInteres(2000, 5, 18, "meses"), null);
    assert.equal(validarInteres(2000, 5, 3, "años"), null);
    assert.equal(validarInteres(250, 5, 18, "meses"), null);
    assert.equal(validarInteres(1200, 6, 5, "meses"), null);
  });
  test("rechaza lo que no se puede animar bien", () => {
    assert.ok(validarInteres(2000, 5, 3, "dias"));
    assert.ok(validarInteres(2000.5, 5, 3, "años"));
    assert.ok(validarInteres(50, 5, 3, "años"));
    assert.ok(validarInteres(2000, 0, 3, "años"));
    assert.ok(validarInteres(2000, 31, 3, "años"));
    assert.ok(validarInteres(2000, 5, 11, "años"));
    assert.ok(validarInteres(2000, 5, 61, "meses"));
    assert.ok(validarInteres(2000, 5, 0, "meses"));
    // 101 Bs al 5 % por 1 mes: 101·5/100/12 no cae en centavos
    assert.match(validarInteres(101, 5, 1, "meses") ?? "", /decimales/);
  });
});

describe("interes simple: texto del alumno", () => {
  test("tuteo y sin emojis ni guion largo en el codigo fuente", () => {
    const fuente = readFileSync(new URL("./generadores-economicas.ts", import.meta.url), "utf8");
    assert.ok(!/[—–]/.test(fuente.replace(/\/\/.*$/gm, "")), "guion largo");
    assert.ok(!/\p{Extended_Pictographic}/u.test(fuente), "emoji");
    const d = interesSimple(2000, 5, 18, "meses").demo;
    for (const s of textos(d)) assert.ok(!VOSEO.test(s), `voseo: ${s}`);
  });
  test("el LaTeX tiene sus barras: hay \\cdot, \\dfrac y \\text reales", () => {
    const d = interesSimple(2000, 5, 18, "meses").demo;
    const todo = textos(d).join(" ");
    for (const orden of ["\\cdot", "\\dfrac", "\\text{meses}", "\\%"]) assert.ok(todo.includes(orden), `falta ${orden}`);
  });
  test("las fichas no tienen LaTeX sin barra", () => {
    const d = interesSimple(2000, 5, 18, "meses").demo;
    for (const e of d.estados) for (const f of aplanar(e) as Ficha[]) assert.ok(!/(^|[^\\a-zA-Z])(cdot|dfrac|frac|text)\b/.test(f.tex), `ficha ${f.id}: ${f.tex}`);
  });
});
