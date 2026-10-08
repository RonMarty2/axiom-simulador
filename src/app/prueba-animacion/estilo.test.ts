import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CASOS_POR_TIPO } from "./casos.ts";
import { construir, type Tipo } from "./construir.ts";
import type { Demo, Ficha } from "./datos.ts";
import { hallazgosEstilo } from "./estilo.ts";

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
