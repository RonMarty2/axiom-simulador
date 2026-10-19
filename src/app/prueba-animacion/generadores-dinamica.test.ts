import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Demo, type Ficha } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { hallazgosEstilo } from "./estilo.ts";
import { dinamica, validarDinamica } from "./generadores-dinamica.ts";

const limpia = (s: string) =>
  s
    .replace(/\{,\}/g, ",")
    .replace(/\\textcolor\{[^}]*\}\{([^{}]*)\}/g, "$1")
    .replace(/\\ /g, "")
    .replace(/\s+/g, "");
const esUnidad = (f: Ficha) => limpia(f.tex).includes("\\text") || !!f.frac;
const unir = (e: Ficha[]) => limpia(aplanar(e).filter((f) => !esUnidad(f) && !f.salto).map((f) => (f.sup ? `^{${f.tex}}` : f.tex)).join(""));
const textos = (d: Demo) => d.transiciones.map((t) => `${t.texto} ${t.porque}`);
const ultimo = (d: Demo) => aplanar(d.estados.at(-1)!);

/** controles comunes, ademas de revisar() */
function controles(d: Demo, etiqueta: string) {
  revisar(d, etiqueta);
  assert.deepEqual(hallazgosEstilo(d, etiqueta, "movimiento"), [], `${etiqueta}: movimiento (arrastre, etiquetas de a una)`);
  // LaTeX con doble barra: una "\t" o "\f" escrita con una sola barra se vuelve tabulacion/salto de pagina
  const todo = [d.intro, ...d.transiciones.flatMap((t) => [t.texto, t.porque, t.regla ?? ""]), ...d.estados.flatMap((e) => aplanar(e).flatMap((f) => [f.tex, f.debajo ?? ""]))];
  for (const s of todo) assert.ok(!/[\t\f\b\v\r]/.test(s), `${etiqueta}: caracter de control (LaTeX con una sola barra): ${JSON.stringify(s)}`);
  for (const [i, t] of d.transiciones.entries()) {
    assert.ok(t.regla, `${etiqueta}: T${i} sin regla`);
    for (const s of [t.texto, t.porque, d.intro]) {
      const fuera = s.replace(/\$[^$]*\$/g, "");
      assert.ok(!/[/÷^]/.test(fuera), `${etiqueta}: T${i} tiene / ÷ o ^ fuera de LaTeX: ${s}`);
      assert.ok(!/\b(podés|tenés|hacé|fijate|mirá|calculá|sabés|querés|usá|probá|escribí|reemplazá|anotá|dividí|restá|multiplicá)\b/i.test(s), `${etiqueta}: T${i} voseo: ${s}`);
      assert.ok(!/[—–]/.test(fuera), `${etiqueta}: T${i} guion largo`);
    }
  }
  // todo "x = y" aritmetico de un texto existe en la hoja (antes o despues del paso)
  for (const [i, t] of d.transiciones.entries()) {
    for (const seg of t.texto.match(/\$[^$]+\$/g) ?? []) {
      const s = limpia(seg.slice(1, -1));
      const sin = s.replace(/\\cdot/g, "");
      if (!s.includes("=") || !/^[-+(),\d=]+$/.test(sin)) continue;
      const hoja = `${unir(d.estados[i])}|${unir(d.estados[i + 1])}`;
      for (const parte of s.split("=")) assert.ok(hoja.includes(parte), `${etiqueta}: T${i} el texto dice ${s} pero ${parte} no esta en la hoja`);
    }
  }
}

/** la cuenta exacta, con enteros: F = m a y neta = F - Fop */
function cuenta(m: number, F: number, Fop: number, etiqueta: string) {
  const r = dinamica(m, F, Fop);
  controles(r.demo, etiqueta);
  const { neta, a } = r.resumen;
  assert.equal(neta, F - Fop);
  assert.ok(Number.isInteger(a) && a > 0, `${etiqueta}: a no es entero positivo`);
  assert.equal(m * a, F - Fop, `${etiqueta}: m a no da la fuerza neta`);
  const e = ultimo(r.demo);
  assert.ok(e.some((f) => f.id === "Na" && f.tex === String(a)), `${etiqueta}: falta la aceleracion en la hoja`);
  assert.ok(e.some((f) => f.id === "Cp" && f.tex === String(neta)), `${etiqueta}: la comprobacion no devuelve la fuerza`);
  // la unidad que sobrevive es m sobre s^2
  const ug = e.find((f) => f.id === "UG");
  assert.ok(ug?.frac?.nPiezas?.length === 1 && ug.frac.nPiezas[0].tex === "\\text{m}" && ug.frac.dPiezas?.length === 1 && ug.frac.dPiezas[0].tex === "\\text{s}^{2}", `${etiqueta}: la unidad final no es m/s^2`);
  return r;
}

describe("dinamica: segunda ley de Newton", () => {
  test("toda combinacion permitida con una fuerza neta: a = F / m (con enteros)", () => {
    let casos = 0;
    for (let m = 1; m <= 50; m++) {
      for (let a = 1; a <= 20; a++) {
        const F = m * a;
        if (validarDinamica(m, F, 0)) continue;
        cuenta(m, F, 0, `una ${m},${F}`);
        casos++;
      }
    }
    assert.ok(casos > 800, `solo ${casos} casos`);
  });

  test("toda combinacion permitida con dos fuerzas opuestas: neta = F - Fop y a = neta / m", () => {
    let casos = 0;
    for (let m = 1; m <= 20; m++) {
      for (let F = 2; F <= 80; F += 3) {
        for (const Fop of [1, 2, 3, 5, 8, 13, 21, 34, 55, 79]) {
          if (validarDinamica(m, F, Fop)) continue;
          cuenta(m, F, Fop, `dos ${m},${F},${Fop}`);
          casos++;
        }
      }
    }
    assert.ok(casos > 150, `solo ${casos} casos`);
  });

  test("un caso con unidades: 4 kg y 20 N dan 5 m/s^2, y cada unidad se tacha de a una", () => {
    assert.equal(validarDinamica(4, 20), null);
    const r = cuenta(4, 20, 0, "ejemplo");
    assert.equal(r.resumen.a, 5);
    const todo = textos(r.demo).join(" | ");
    for (const pista of ["\\dfrac{20}{4}=5", "qué es un newton", "El $\\text{kg}$ de arriba se tacha con el $\\text{kg}$ de abajo", "$4\\cdot 5=20$", "a=5\\ \\dfrac{\\text{m}}{\\text{s}^{2}}"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // el newton se descompone en kg·m/s^2 (reescritura), y el kg se tacha con una fusion "tachar"
    assert.ok(r.demo.transiciones.some((t) => t.descompone && t.texto.includes("qué es un newton")));
    assert.equal(r.demo.transiciones.filter((t) => t.fusiones.some((f) => f.modo === "tachar")).length, 1);
    // los datos se etiquetan de a uno, cada letra con su color
    const etiquetados = r.demo.estados.at(-1)!.filter((f) => f.debajo);
    assert.deepEqual(etiquetados.map((f) => f.id), ["Dm", "D1"]);
    // el numero y la unidad de la fuerza VUELAN desde el dato a la formula (nada aparece de la nada)
    const rf = r.demo.transiciones.find((t) => t.texto.startsWith("Reemplazamos $F$"))!;
    assert.deepEqual(rf.brotes, [{ desde: "D1", hacia: "Nf" }, { desde: "D1u", hacia: "Uf" }]);
    // la segunda ley nace de los datos con letras: cada letra sale de su dato
    const ley = r.demo.transiciones.find((t) => t.texto.startsWith("Escribimos debajo la segunda ley"))!;
    assert.deepEqual(ley.brotes!.map((b) => b.desde).sort(), ["D1", "Dm", "Dq", "Dq"]);
    // con una sola fuerza no hay resta de fuerzas
    assert.ok(!todo.includes("fuerza neta, $F$: la que queda"));
  });

  test("un caso de dos fuerzas: 30 N a favor y 10 N en contra, 4 kg -> neta 20 N y a = 5 m/s^2", () => {
    assert.equal(validarDinamica(4, 30, 10), null);
    const r = cuenta(4, 30, 10, "dos fuerzas");
    assert.equal(r.resumen.neta, 20);
    assert.equal(r.resumen.a, 5);
    const todo = textos(r.demo).join(" | ");
    for (const pista of ["$30-10=20$", "\\dfrac{20}{4}=5", "$4\\cdot 5=20$"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // la fuerza neta, F1 y F2 nacen del dato a favor; el signo menos y F2 nacen del dato en contra; los tres datos se etiquetan de a uno
    const nace = r.demo.transiciones.find((t) => t.texto.startsWith("Antes de usar la segunda ley"))!;
    assert.deepEqual(nace.brotes!.map((b) => b.desde), ["D1", "D1", "D1", "D2", "D2"]);
    assert.deepEqual(r.demo.estados.at(-1)!.filter((f) => f.debajo).map((f) => f.id), ["Dm", "D1", "D2"]);
    // la F de la segunda ley nace de la fuerza neta calculada, y su numero vuela desde el resultado de la resta
    const ley = r.demo.transiciones.find((t) => t.texto.startsWith("Escribimos debajo la segunda ley"))!;
    assert.ok(ley.brotes!.some((b) => b.desde === "Gn" && b.hacia === "Lf"));
    const rf = r.demo.transiciones.find((t) => t.texto.startsWith("Reemplazamos $F$"))!;
    assert.deepEqual(rf.brotes, [{ desde: "Nn", hacia: "Nf" }, { desde: "Un1", hacia: "Uf" }]);
    // la unidad newton queda una sola vez al restar (la otra se desliza hacia ella)
    const resta = r.demo.transiciones.find((t) => t.fusiones.some((f) => f.ancla === "Un1"))!;
    assert.ok(resta);
    // la comprobacion usa los datos del enunciado: 30 - 10 y 4 · 5
    assert.ok(todo.includes("$30-10=20$") && todo.includes("A la izquierda restamos"));
    assert.ok(r.demo.transiciones.at(-1)!.texto.includes("cumple la segunda ley"));
  });

  test("casos limite: masa 1, a = 1, masa 50 y fuerza maxima", () => {
    for (const [m, F, Fop] of [[1, 7, 0], [5, 5, 0], [5, 8, 3], [1, 2, 1], [50, 1000, 0], [50, 1000, 500], [2, 999, 1]] as const) {
      assert.equal(validarDinamica(m, F, Fop), null, `${m},${F},${Fop}`);
      cuenta(m, F, Fop, `limite ${m},${F},${Fop}`);
    }
  });

  test("la comprobacion lleva unidades a la vista: kg, m/s^2 y N, y kg·m/s^2 se reescribe como N", () => {
    for (const [m, F, Fop] of [[4, 20, 0], [4, 30, 10], [1, 7, 0]] as const) {
      const r = dinamica(m, F, Fop);
      const ini = r.demo.estados.findIndex((e) => e.some((f) => f.id === "Sc"));
      const unis = (i: number) => aplanar(r.demo.estados[i]).filter((f) => f.id.startsWith("C")).map((f) => f.tex);
      const antes = unis(ini).join(" ");
      assert.ok(antes.includes("\\text{kg}") && antes.includes("\\text{N}"), `${m},${F},${Fop}: la comprobacion no muestra kg y N`);
      // alguna transicion reescribe las unidades kg, m/s^2 en un newton
      assert.ok(r.demo.transiciones.some((t) => t.fusiones.some((f) => f.hacia === "Cun" && f.desde.includes("Cmu") && f.desde.includes("Cau"))), `${m},${F},${Fop}: falta kg·m/s^2 = N a la vista`);
    }
  });

  test("el paso del newton aclara en el texto que m es metros y s segundos, no la masa", () => {
    const t = dinamica(4, 20).demo.transiciones.find((x) => x.descompone)!;
    assert.ok(t.texto.includes("metros") && t.texto.includes("segundos") && t.texto.includes("masa"));
  });

  test("con masa 1 ningun texto cita un divisor que no esta en pantalla", () => {
    for (const [F, Fop] of [[7, 0], [2, 1]] as const) {
      const d = dinamica(1, F, Fop).demo;
      for (const [i, t] of d.transiciones.entries()) {
        assert.ok(!/\\dfrac\{[^}]*\}\{1\}/.test(t.texto), `T${i} cita una division entre 1: ${t.texto}`);
        assert.ok(!/1\\cdot/.test(limpia(t.texto)) || /multiplicar por \$1\$/.test(t.texto), `T${i} cita 1·n sin explicar: ${t.texto}`);
      }
      // y el paso de multiplicar por 1 no es un paso aparte: se junta con la reescritura de unidades
      assert.equal(d.transiciones.filter((t) => t.texto.includes("multiplicar por $1$")).length, 1);
    }
  });

  test("rechaza lo que no es una aceleracion entera positiva", () => {
    assert.ok(validarDinamica(4, 21)); // 21/4 no es entero
    assert.ok(validarDinamica(4, 20, 20)); // se cancelan
    assert.ok(validarDinamica(4, 10, 20)); // la de contra gana
    assert.ok(validarDinamica(0, 20)); // masa 0
    assert.ok(validarDinamica(51, 51)); // masa fuera de rango
    assert.ok(validarDinamica(2.5, 20)); // decimal
    assert.ok(validarDinamica(4, 30, 11)); // neta 19 no es multiplo de 4
    assert.ok(validarDinamica(4, 1001));
    // los mensajes tambien se tutean
    for (const msg of [validarDinamica(4, 21), validarDinamica(4, 20, 20), validarDinamica(4, 10, 20), validarDinamica(0, 20)]) {
      assert.ok(!/\b(podés|tenés|poné|probá|cambiá)\b/i.test(msg!), msg!);
    }
  });
});

// Lo que mide el barrido de ancho, vigilado en los datos: la fila de datos con etiquetas cabe en un celular
// y la etiqueta queda bajo su dato (copiado de generadores-fisica.test.ts).
describe("fila de datos con etiquetas: cabe en un celular y la etiqueta queda bajo su dato", () => {
  const letrasMotor = (tex: string) => tex.replace(/\\text\{([^}]*)\}/g, "$1").replace(/\\[a-zA-Z]+/g, "X").replace(/[{}$^_]/g, "").length;
  const renglones = (e: Ficha[]) => {
    const rs: Ficha[][] = [[]];
    for (const f of e) {
      if (f.salto) rs.push([]);
      else rs.at(-1)!.push(f);
    }
    return rs;
  };
  const demos: [string, Demo][] = [
    ["una fuerza", dinamica(4, 20).demo],
    ["dos fuerzas", dinamica(4, 30, 10).demo],
    ["masa grande", dinamica(50, 1000, 500).demo],
  ];
  for (const [nombre, d] of demos) {
    test(nombre, () => {
      for (const [i, e] of d.estados.entries()) {
        const rs = renglones(e);
        for (const [j, r] of rs.entries()) {
          if (!r.some((f) => f.debajo)) continue;
          assert.ok(j < rs.length - 1, `${nombre} E${i}: el renglon con etiquetas es el ultimo`);
          assert.ok(!r.some((f) => f.id === "Dq" || (f.op && f.tex === "=")), `${nombre} E${i}: renglon con etiquetas mezclado con lo que piden o con una formula`);
          assert.ok(r.length <= 5, `${nombre} E${i}: renglon con etiquetas de ${r.length} piezas (en 343 px caben 5)`);
          for (const f of r.filter((x) => x.debajo)) assert.ok(letrasMotor(f.debajo!) <= 7, `${nombre} E${i}: la etiqueta de ${f.id} reserva ${letrasMotor(f.debajo!)} letras`);
        }
      }
      const e0 = d.estados[0];
      const iq = e0.findIndex((f) => f.id === "Dq");
      assert.ok(iq > 0 && e0[iq - 1].salto, `${nombre}: lo que piden no empieza renglon`);
    });
  }
});
