import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { hallazgosEstilo } from "./estilo.ts";
import { progresionAritmetica, validarProgresion } from "./generadores-progresiones.ts";

const grilla = (paso = 1): [number, number, number][] => {
  const r: [number, number, number][] = [];
  for (let a1 = -20; a1 <= 20; a1 += paso) for (let d = -10; d <= 10; d++) for (const n of (paso === 1 ? [3, 4, 5, 6, 7, 12, 30] : [3, 6, 10, 19, 30])) if (!validarProgresion(a1, d, n)) r.push([a1, d, n]);
  return r;
};

// una cuenta escrita en un texto ($7-3=4$, $(-3)-36=-39$): se evalua y tiene que cerrar
const evalua = (s: string) => Function(`return (${s})`)() as number;
function cuentasDelTexto(texto: string): string[] {
  const malas: string[] = [];
  for (const seg of texto.match(/\$[^$]+\$/g) ?? []) {
    const s = seg.slice(1, -1).replace(/\\cdot/g, "*").replace(/\\ /g, "");
    if (!s.includes("=") || !/^[-+*()\d=]+$/.test(s)) continue;
    const partes = s.split("=").map(evalua);
    if (new Set(partes).size !== 1) malas.push(seg);
  }
  return malas;
}

describe("progresion aritmetica", () => {
  test("toda combinacion permitida: coherente, estilo, y el resultado es a1 + (n-1)d", () => {
    let casos = 0;
    for (const [a1, d, n] of grilla()) {
      const r = progresionAritmetica(a1, d, n);
      revisar(r.demo, `PA ${a1},${d},${n}`);
      assert.deepEqual(hallazgosEstilo(r.demo, `PA ${a1},${d},${n}`, "movimiento"), []);
      assert.equal(r.resumen.an, a1 + (n - 1) * d);
      const ultimo = aplanar(r.demo.estados.at(-1)!);
      assert.equal(ultimo.find((f) => f.id === "R")?.tex, String(a1 + (n - 1) * d), `${a1},${d},${n}: la hoja no termina en el resultado`);
      casos++;
    }
    assert.ok(casos > 4000, `solo ${casos} casos`);
  });

  test("cuenta exacta: cada operacion escrita en un texto cierra", () => {
    let cuentas = 0;
    for (const [a1, d, n] of grilla(3)) {
      const r = progresionAritmetica(a1, d, n);
      for (const t of r.demo.transiciones) {
        assert.deepEqual(cuentasDelTexto(t.texto), [], `${a1},${d},${n}: ${t.texto}`);
        cuentas += (t.texto.match(/\$[^$]*=[^$]*\$/g) ?? []).length;
      }
    }
    assert.ok(cuentas > 1000);
  });

  test("el ejemplo 3, 7, 11, ... termino 10 da 39 con todos los pasos", () => {
    assert.equal(validarProgresion(3, 4, 10), null);
    const r = progresionAritmetica(3, 4, 10);
    assert.equal(r.resumen.an, 39);
    const todo = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of ["progresión aritmética", "$7-3=4$", "$11-7=4$", "diferencia", "$a_{1}=3$", "$d=4$", "$n=10$", "fórmula del término n-ésimo", "Primera cuenta", "$10-1=9$", "$9\\cdot 4=36$", "$3+36=39$", "Respuesta"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    assert.ok(r.demo.transiciones.every((t) => t.regla), "todo paso debe llevar su regla");
    const piezas = r.demo.estados.flatMap(aplanar).map((f) => f.tex);
    for (const p of ["9", "36", "39"]) assert.ok(piezas.includes(p), `falta el estado ${p}`);
  });

  test("las letras se reemplazan de una en una (a1, d, n), el valor sale de su etiqueta y n se reemplaza en sus dos lugares", () => {
    for (const [a1, d, n] of [[3, 4, 10], [-5, 3, 8], [20, -7, 30], [-20, -10, 3], [0, 1, 4]] as const) {
      const r = progresionAritmetica(a1, d, n);
      const e = r.demo.estados.map(aplanar);
      const t = r.demo.transiciones;
      const idx = (letra: string) => t.findIndex((x) => x.texto.startsWith(`Reemplazamos $${letra}$`));
      const [ia, id, inn] = [idx("a_{1}"), idx("d"), idx("n")];
      assert.ok(ia >= 0 && ia < id && id < inn, `${a1},${d},${n}: orden a1, d, n`);
      for (const [i, esperados, valor, letra] of [[ia, 1, a1, "a_{1}="], [id, 1, d, "d="], [inn, 2, n, "n="]] as const) {
        assert.equal(t[i].brotes?.length, esperados);
        assert.equal(new Set(t[i].brotes!.map((b) => b.desde)).size, 1, "todos salen de la misma etiqueta");
        const origen = e[i].find((f) => f.id === t[i].brotes![0].desde)!;
        assert.ok(origen.debajo?.includes(`${letra}${valor}`), `el brote sale de la pieza etiquetada ${letra}${valor}`);
        assert.equal(t[i].fusiones.flatMap((f) => f.desde).length, esperados);
        for (const b of t[i].brotes!) assert.ok(e[i + 1].some((f) => f.id === b.hacia && f.tex.includes(String(Math.abs(valor)))), "la pieza nueva lleva el valor");
      }
    }
  });

  test("las etiquetas van de una en una, con color, y la formula nace del enunciado con las letras de esos colores", () => {
    const r = progresionAritmetica(3, 4, 10);
    const conEtiqueta = r.demo.estados.map((e) => e.filter((f) => f.debajo).length);
    assert.ok(conEtiqueta.includes(1) && conEtiqueta.includes(2) && conEtiqueta.includes(3));
    assert.ok(r.demo.estados.some((e) => e.some((f) => f.debajo?.includes("textcolor"))));
    const i = r.demo.transiciones.findIndex((x) => x.texto.includes("debajo la fórmula"));
    assert.ok(i >= 0);
    const f = Object.fromEntries(r.demo.estados[i + 1].map((p) => [p.id, p]));
    for (const id of ["Fan", "Fa1", "Fn", "Fd"]) assert.ok(f[id].tex.includes("textcolor"), `${id} lleva el color de su letra`);
    assert.ok(f.Fs.salto, "la formula va en un renglon nuevo");
    assert.ok(r.demo.estados[i + 1].some((p) => p.debajo), "las etiquetas siguen a la vista cuando nace la formula");
    assert.ok(r.demo.transiciones[i].brotes!.every((b) => b.desde === "Qt"));
  });

  test("d sale de restar terminos consecutivos: las dos restas se escriben, se calculan y se unen en una sola d", () => {
    for (const [a1, d, n] of grilla(7)) {
      const r = progresionAritmetica(a1, d, n);
      const t = r.demo.transiciones;
      const iEsc = t.findIndex((x) => x.texto.startsWith("Para ver cuánto"));
      const iCalc = t.findIndex((x) => x.texto.startsWith("Calculamos las dos diferencias"));
      const iUne = t.findIndex((x) => x.texto.startsWith("Las dos diferencias dan lo mismo"));
      assert.ok(iEsc >= 0 && iEsc < iCalc && iCalc < iUne, `${a1},${d},${n}`);
      assert.equal(t[iCalc].fusiones.length, 2);
      assert.ok(t[iCalc].texto.includes(`=${d}$`), "las dos diferencias valen d");
      assert.ok(t[iUne].texto.includes(`$${d}$`));
      // etiqueta de d: despues de unir
      assert.ok(t.findIndex((x) => x.texto.startsWith("La diferencia que encontramos")) > iUne);
    }
  });

  test("las reglas y los porques coinciden con los signos REALES (negativos solo si los hay)", () => {
    for (const [a1, d, n] of grilla(3)) {
      const t = progresionAritmetica(a1, d, n).demo.transiciones;
      const reglas = t.map((x) => x.regla ?? "");
      const textos = t.map((x) => x.texto);
      const t2 = a1 + d;
      const hayRestaNegativa = a1 < 0 || t2 < 0 || d < 0; // el sustraendo de alguna resta es negativo (las dos de la sucesion y la de la comprobacion con d negativa)
      assert.equal(reglas.some((x) => x.includes("a-(-b)")), hayRestaNegativa, `${a1},${d},${n}: restar un negativo`);
      assert.equal(reglas.some((x) => x.includes("a+(-b)")), d < 0, `${a1},${d},${n}: sumar un negativo solo si el producto es negativo`);
      assert.equal(reglas.some((x) => x.includes("negativo}")), d < 0, `${a1},${d},${n}: la regla de signos del producto depende de d`);
      // las cuentas se numeran en orden: Primera, Segunda, Tercera
      const ord = ["Primera", "Segunda", "Tercera"].map((o) => textos.findIndex((x) => x.startsWith(`${o} cuenta`)));
      assert.ok(ord[0] >= 0 && ord[0] < ord[1] && ord[1] < ord[2], `${a1},${d},${n}: cuentas fuera de orden`);
      // si a1 es negativo se pone entre parentesis al reemplazar
      assert.equal(t.some((x) => x.porque.includes("Como $a_{1}$ es negativo")), a1 < 0);
      assert.equal(t.some((x) => x.porque.includes("Como $d$ es negativo")), d < 0);
    }
  });

  test("orden de las cuentas: primero el parentesis, luego el producto, luego la suma, y la comprobacion al final", () => {
    for (const [a1, d, n] of [[3, 4, 10], [-8, -3, 12], [5, -2, 4]] as const) {
      const t = progresionAritmetica(a1, d, n).demo.transiciones;
      const iPar = t.findIndex((x) => x.texto.startsWith("Primera cuenta: el paréntesis"));
      const iProd = t.findIndex((x) => x.texto.startsWith("Segunda cuenta: el producto"));
      const iSuma = t.findIndex((x) => x.texto.startsWith("Tercera cuenta: la suma"));
      assert.ok(iPar > 0 && iPar < iProd && iProd < iSuma, `${a1},${d},${n}`);
      // la ecuacion y las etiquetas se quitan antes de calcular
      assert.ok(t.findIndex((x) => x.texto.startsWith("Ya tenemos todos los valores")) < iPar);
      const iResp = t.findIndex((x) => x.texto.startsWith("Respuesta"));
      const iRev = t.findIndex((x) => x.texto.startsWith("Revisamos"));
      const iRest = t.findIndex((x) => x.texto.startsWith("Restamos"));
      // la comprobacion es INDEPENDIENTE: el termino anterior por la formula general desde a1, no por an - d + d
      const iOtro = t.findIndex((x) => x.texto.startsWith("Ahora calculamos ese mismo término por otro camino"));
      assert.ok(iResp > iSuma && iResp < iRev && iRev < iRest && iRest < iOtro && t[t.length - 1].texto.startsWith("Los dos caminos dan el mismo término"), "los ultimos pasos son la respuesta y la comprobacion");
      assert.ok(t[t.length - 1].texto.includes(`$${a1 + (n - 2) * d}$`), "el termino anterior sale igual por los dos caminos");
      assert.ok(t[iResp].texto.includes(`$${a1 + (n - 1) * d}$`));
      assert.equal(t.some((x) => x.texto.startsWith("Restar un número negativo es sumar su opuesto: $") && x.regla === "$a-(-b)=a+b$" && iRev < t.indexOf(x)), d < 0, "con d negativa, la resta de la comprobacion pasa por la suma");
    }
  });

  test("d negativa: la suma de un negativo pasa por la resta antes de calcular (3 + (-36) = 3 - 36)", () => {
    const r = progresionAritmetica(3, -4, 10); // 3 + 9.(-4)
    assert.equal(r.resumen.an, -33);
    const piezas = r.demo.estados.flatMap(aplanar).map((f) => f.tex.replace(/\\textcolor\{[^}]*\}\{([^{}]*)\}/g, "$1"));
    for (const p of ["(-36)", "36", "-33"]) assert.ok(piezas.includes(p), `falta el estado ${p}`);
    const todo = r.demo.transiciones.map((x) => x.texto).join(" | ");
    assert.ok(todo.includes("$3+(-36)=3-36$"));
    assert.ok(todo.includes("$3-36=-33$"));
    // con d positiva no se inventa la conversion
    assert.ok(!progresionAritmetica(3, 4, 10).demo.transiciones.some((x) => x.texto.includes("Sumar un número negativo")));
  });

  test("terminos negativos: restar un negativo pasa por la suma (-5 -> -2: -2 - (-5) = -2 + 5)", () => {
    const r = progresionAritmetica(-5, 3, 6); // -5, -2, 1, ...
    const t = r.demo.transiciones;
    const i = t.findIndex((x) => x.texto.startsWith("Restar un número negativo es sumar"));
    assert.ok(i >= 0);
    assert.ok(t[i].texto.includes("$-2-(-5)=-2+5$"));
    assert.ok(t[i].texto.includes("$1-(-2)=1+2$"), "el segundo par tambien resta un negativo (-2) y se convierte en el mismo paso");
  });

  test("d=1 y a1=0 funcionan; d=0 y decimales se rechazan", () => {
    const r = progresionAritmetica(0, 1, 4);
    assert.equal(r.resumen.an, 3);
    revisar(r.demo, "0,1,4");
    assert.ok(validarProgresion(3, 0, 10), "d=0 se rechaza");
    assert.ok(validarProgresion(3.5, 4, 10));
    assert.ok(validarProgresion(3, 4, 3), "n = 3: la sucesion del enunciado ya trae ese termino");
    assert.ok(validarProgresion(3, 4, 4), "n = 4: la ultima pista es el propio ejercicio");
    assert.ok(validarProgresion(3, 4, 31));
    assert.ok(validarProgresion(21, 4, 10));
    assert.ok(validarProgresion(3, 11, 10));
    assert.equal(validarProgresion(-20, -10, 30), null);
  });

  test("LaTeX con doble barra y tuteo: ninguna orden sin barra, ningun voseo", () => {
    const r = progresionAritmetica(3, 4, 10);
    const todo = [r.demo.intro, ...r.demo.transiciones.flatMap((t) => [t.texto, t.porque, t.regla ?? ""])].join(" ");
    assert.ok(todo.includes("\\cdot"), "usa \\cdot con barra");
    assert.ok(!/(^|[^\\a-zA-Z])(cdot|frac|dfrac|sqrt|textcolor)\b/.test(todo), "orden de LaTeX sin barra");
    assert.ok(!todo.includes("÷"));
    assert.ok(!/[—–]/.test(todo.replace(/\$[^$]*\$/g, "")), "sin guion largo");
  });
});
