import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CASOS_POR_TIPO } from "./casos.ts";
import { construir, type Tipo } from "./construir.ts";
import type { Demo, Ficha } from "./datos.ts";
import { hallazgosEstilo, hallazgosPasos } from "./estilo.ts";
import { CASOS } from "./huellas.ts";

// Los casos dificiles de TODOS los tipos cumplen las reglas de estilo de Ronald (arrastrar, etiquetas de a una, tuteo...).
// Un tipo nuevo que se agregue a CASOS_POR_TIPO entra solo en este test.
describe("estilo de los casos dificiles", () => {
  for (const [tipo, casos] of Object.entries(CASOS_POR_TIPO) as [Tipo, (typeof CASOS_POR_TIPO)[Tipo]][]) {
    test(tipo, () => {
      const malos = casos.flatMap((c) => {
        const r = construir(tipo, c.v);
        return "demo" in r ? [...hallazgosEstilo(r.demo, `${tipo}/${c.nombre}`, "texto"), ...hallazgosEstilo(r.demo, `${tipo}/${c.nombre}`, "movimiento")] : [];
      });
      assert.deepEqual(malos, []);
    });
  }
});

// El detector tiene que atrapar lo que debe atrapar: si no, el "0 problemas" de arriba no vale nada.
const f = (id: string, tex: string, extra: Partial<Ficha> = {}): Ficha => ({ id, tex, ...extra });
const demo = (estados: Ficha[][], transiciones: Demo["transiciones"], intro = "Intro."): Demo => ({ titulo: "", nota: "", intro, estados, transiciones });
const t = (extra: Partial<Demo["transiciones"][0]>): Demo["transiciones"][0] => ({ fusiones: [], texto: "Texto.", porque: "Porque.", ...extra });

describe("el detector de estilo atrapa los errores conocidos", () => {
  test("una pieza que desaparece y reaparece igual con otro id (debe viajar)", () => {
    const d = demo([[f("a", "3"), f("o", "+", { op: true }), f("b", "5")], [f("c", "3"), f("o", "+", { op: true }), f("b", "5")]], [t({ fusiones: [{ desde: ["a"], hacia: "c" }] })]);
    assert.equal(hallazgosEstilo(d, "x", "movimiento").length, 1);
  });
  test("un resultado que coincide por casualidad con lo operado NO es error (4·1 = 4)", () => {
    const d = demo([[f("a", "4"), f("p", "\\cdot", { op: true }), f("b", "1")], [f("r", "4")]], [t({ fusiones: [{ desde: ["a", "p", "b"], hacia: "r" }] })]);
    assert.deepEqual(hallazgosEstilo(d, "x", "movimiento"), []);
  });
  test("escribir el opuesto con signo en los dos lados con brotes (en vez de arrastrar)", () => {
    const d = demo(
      [[f("x", "x"), f("m", "+", { op: true }), f("n", "2"), f("e", "=", { op: true }), f("c", "5")], [f("x", "x"), f("m", "+", { op: true }), f("n", "2"), f("m2", "-2"), f("e", "=", { op: true }), f("c", "5"), f("m3", "-2")]],
      [t({ brotes: [{ desde: "n", hacia: "m2" }, { desde: "c", hacia: "m3" }] })]
    );
    assert.ok(hallazgosEstilo(d, "x", "movimiento").some((m) => m.includes("los dos lados")));
  });
  test("texto con voseo, guion largo y barra suelta", () => {
    const d = demo([[f("a", "1")], [f("a", "1")]], [t({ resaltar: ["a"], texto: "Ahora podés sumar — mira 3/4", porque: "Ok." })]);
    assert.equal(hallazgosEstilo(d, "x", "texto").length, 3);
  });
  test("dos etiquetas nuevas en un mismo paso", () => {
    const d = demo([[f("a", "p"), f("b", "q")], [f("a", "p", { debajo: "a=1" }), f("b", "q", { debajo: "b=2" })]], [t({ resaltar: ["a", "b"] })]);
    assert.equal(hallazgosEstilo(d, "x", "movimiento").length, 1);
  });
});

// REGLAS DE PASOS (auditorias del 30-oct). Cada una con su test del error conocido, y un trinquete por tipo:
// lo que hoy tiene hallazgos no puede empeorar, y lo limpio no puede ensuciarse. Al arreglar un tipo, BAJA su numero aca.
describe("las reglas de pasos atrapan los errores conocidos", () => {
  const malos = (d: Demo) => hallazgosPasos(d, "x");
  test("coeficiente 1 escrito delante de una letra (1a), pero no un color como #1a4", () => {
    assert.equal(malos(demo([[f("u", "1"), f("a", "a", { pegado: true })]], [])).length, 1);
    assert.deepEqual(malos(demo([[f("a", "\\textcolor{#1a4}{400}")]], [])), []);
  });
  test("paso vacio: no cambia nada ni marca nada (si marca algo, es valido)", () => {
    const e = [[f("a", "3")], [f("a", "3")]];
    assert.equal(malos(demo(e, [t({})])).length, 1);
    assert.deepEqual(malos(demo(e, [t({ resaltar: ["a"] })])), []);
  });
  test("un paso que deshace el anterior (2·2 -> 4 -> 2·2)", () => {
    const ini = [f("a", "2"), f("o", "\\cdot", { op: true }), f("b", "2")];
    const d = demo(
      [ini, [f("r", "4")], [f("a2", "2"), f("o2", "\\cdot", { op: true }), f("b2", "2")]],
      [t({ fusiones: [{ desde: ["a", "o", "b"], hacia: "r" }] }), t({ brotes: [{ desde: "r", hacia: "a2" }] })]
    );
    assert.ok(malos(d).some((m) => m.includes("deshace")));
  });
  test("multiplicar por 1 sin cambiar el valor (4·1 = 4)", () => {
    const d = demo([[f("a", "4"), f("p", "\\cdot", { op: true }), f("b", "1")], [f("r", "4")]], [t({ fusiones: [{ desde: ["a", "p", "b"], hacia: "r" }] })]);
    assert.ok(malos(d).some((m) => m.includes("por 1")));
  });
  test("una cuenta grande de un golpe (fraccion de 4 cifras)", () => {
    const g = f("g", "", { frac: { n: "71680", d: "224" } });
    const d = demo([[g], [f("r", "320")]], [t({ fusiones: [{ desde: ["g"], hacia: "r" }] })]);
    assert.ok(malos(d).some((m) => m.includes("cuenta grande")));
  });
  test("un numero nuevo que nace de la nada (sin fusion ni brote)", () => {
    const d = demo([[f("a", "3")], [f("a", "3"), f("o", "+", { op: true }), f("n", "5")]], [t({ resaltar: ["a"] })]);
    assert.ok(malos(d).some((m) => m.includes("sin origen")));
  });
});

// Trinquete: hallazgos de pasos que hoy existen, por tipo. NO pueden subir. Un tipo que no esta aca debe dar 0.
const TRINQUETE_CASOS: Record<string, number> = { cuadratica: 10 };
const TRINQUETE_HUELLAS: Record<string, number> = { cuadratica: 2 };

describe("reglas de pasos en todos los tipos (trinquete)", () => {
  for (const [tipo, casos] of Object.entries(CASOS_POR_TIPO) as [Tipo, (typeof CASOS_POR_TIPO)[Tipo]][]) {
    test(`casos dificiles: ${tipo}`, () => {
      const n = casos.flatMap((c) => {
        const r = construir(tipo, c.v);
        return "demo" in r ? hallazgosPasos(r.demo, `${tipo}/${c.nombre}`) : [];
      }).length;
      assert.ok(n <= (TRINQUETE_CASOS[tipo] ?? 0), `${tipo} tiene ${n} hallazgos de pasos y el tope es ${TRINQUETE_CASOS[tipo] ?? 0}: se arregla, no se sube el tope`);
    });
  }
  for (const [id, demos] of Object.entries(CASOS)) {
    test(`casos del registro: ${id}`, () => {
      const n = demos().flatMap((d, k) => hallazgosPasos(d, `${id}#${k}`)).length;
      assert.ok(n <= (TRINQUETE_HUELLAS[id] ?? 0), `${id} tiene ${n} hallazgos de pasos y el tope es ${TRINQUETE_HUELLAS[id] ?? 0}`);
    });
  }
});
