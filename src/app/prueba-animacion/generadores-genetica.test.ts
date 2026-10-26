import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Demo } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { hallazgosEstilo } from "./estilo.ts";
import { punnett, validarPunnett, leerGenotipo } from "./generadores-genetica.ts";

const GENOTIPOS = ["AA", "Aa", "aa"];
// los 6 cruces posibles (sin importar quien es el padre 1) y los 9 ordenados
const ORDENADOS: [string, string][] = GENOTIPOS.flatMap((a) => GENOTIPOS.map((b): [string, string] => [a, b]));
const CRUCES: [string, string][] = ORDENADOS.filter(([a, b]) => GENOTIPOS.indexOf(a) <= GENOTIPOS.indexOf(b));

// Cuenta PROPIA del test (no la del generador): cada gameto del padre 1 con cada gameto del padre 2
function esperado(p1: string, p2: string) {
  const c: Record<string, number> = { AA: 0, Aa: 0, aa: 0 };
  for (const x of p1) for (const y of p2) c[x === "a" && y === "A" ? "Aa" : x + y]++;
  return { AA: c.AA, Aa: c.Aa, aa: c.aa, dominantes: c.AA + c.Aa, recesivos: c.aa };
}
const ultimo = (d: Demo) => d.estados[d.estados.length - 1];
const todoTexto = (d: Demo) => [d.intro, ...d.transiciones.flatMap((t) => [t.texto, t.porque, t.regla ?? ""])];

describe("punnett: validacion", () => {
  test("acepta los 9 cruces ordenados y rechaza lo demas", () => {
    for (const [a, b] of ORDENADOS) assert.equal(validarPunnett(a, b), null, `${a} x ${b}`);
    assert.equal(validarPunnett("aA", "Aa"), null);
    assert.notEqual(validarPunnett("", "Aa"), null);
    assert.notEqual(validarPunnett("Aa", "A"), null);
    assert.notEqual(validarPunnett("Aa", "AAa"), null);
    assert.notEqual(validarPunnett("Aa", "Bb"), null);
    assert.notEqual(validarPunnett("AB", "Aa"), null);
    assert.notEqual(validarPunnett("A1", "Aa"), null);
    assert.deepEqual(leerGenotipo("aA"), ["A", "a"]);
  });
});

describe("punnett: los cruces", () => {
  test("son 6 cruces distintos y los 9 ordenados pasan revisar y dan la cuenta exacta", () => {
    assert.equal(CRUCES.length, 6);
    for (const [a, b] of ORDENADOS) {
      const { demo, resumen } = punnett(a, b);
      const et = `${a} x ${b}`;
      revisar(demo, et);
      assert.deepEqual(hallazgosEstilo(demo, et, "movimiento"), [], `${et}: movimiento`);
      const e = esperado(a, b);
      assert.equal(resumen.AA, e.AA, `${et}: AA`);
      assert.equal(resumen.Aa, e.Aa, `${et}: Aa`);
      assert.equal(resumen.aa, e.aa, `${et}: aa`);
      assert.equal(resumen.AA + resumen.Aa + resumen.aa, 4, `${et}: 4 casillas`);
      assert.equal(resumen.dominantes, e.dominantes, `${et}: dominantes`);
      assert.equal(resumen.recesivos, e.recesivos, `${et}: recesivos`);
    }
  });

  test("las cuatro casillas existen con el genotipo correcto (mayuscula primero)", () => {
    for (const [a, b] of ORDENADOS) {
      const { demo } = punnett(a, b);
      // el cuadro se quita despues de contar: se mira el ultimo estado en que esta completo
      const fin = aplanar(demo.estados.filter((e) => e.some((f) => f.id === "c11b")).at(-1)!);
      const sinColor = (t: string) => t.replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/g, "$1").replace(/\\mathrm\{([^}]*)\}/g, "$1");
      const genos: string[] = [];
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++) {
          const x = fin.find((f) => f.id === `c${i}${j}a`);
          const y = fin.find((f) => f.id === `c${i}${j}b`);
          assert.ok(x && y, `${a}x${b}: falta la casilla ${i}${j}`);
          const s = [x, y].sort((p, q) => fin.indexOf(p) - fin.indexOf(q)).map((f) => sinColor(f.tex)).join("");
          genos.push(s);
        }
      const gam1 = [...a], gam2 = [...b];
      const propios = gam1.flatMap((x) => gam2.map((y) => (x === "a" && y === "A" ? "Aa" : x + y)));
      assert.deepEqual(genos.sort(), propios.sort(), `${a}x${b}: casillas`);
    }
  });

  test("Aa x Aa: genotipos 1:2:1 y fenotipos 3:1 se ven en el estado final", () => {
    const { demo } = punnett("Aa", "Aa");
    const fin = aplanar(ultimo(demo));
    const tex = (id: string) => fin.find((f) => f.id === id)?.tex;
    assert.deepEqual(["rgn0", "rgn1", "rgn2"].map(tex), ["1", "2", "1"]);
    assert.deepEqual(["rgm0", "rgm1", "rgm2"].map(tex), ["\\mathrm{AA}", "\\mathrm{Aa}", "\\mathrm{aa}"]);
    assert.deepEqual(["rfn0", "rfn1"].map(tex), ["3", "1"]);
    assert.equal(tex("dT"), "3");
    assert.equal(tex("rr0"), "1");
  });

  test("proporciones simplificadas: Aa x aa da 1:1 y 1:1; AA x Aa da 1:1 y todos dominantes", () => {
    const f1 = aplanar(ultimo(punnett("Aa", "aa").demo));
    assert.deepEqual(["rgs0", "rgs1"].map((id) => f1.find((f) => f.id === id)?.tex), ["1", "1"]);
    assert.deepEqual(["rfs0", "rfs1"].map((id) => f1.find((f) => f.id === id)?.tex), ["1", "1"]);
    const f2 = aplanar(ultimo(punnett("AA", "Aa").demo));
    assert.deepEqual(["rgs0", "rgs1"].map((id) => f2.find((f) => f.id === id)?.tex), ["1", "1"]);
    assert.ok(!f2.some((f) => f.id === "rr0"), "AA x Aa no tiene recesivos");
    assert.equal(f2.find((f) => f.id === "dT")?.tex, "4");
  });

  test("clase unica: AA x AA y aa x aa no inventan proporciones", () => {
    for (const g of ["AA", "aa"]) {
      const fin = aplanar(ultimo(punnett(g, g).demo));
      assert.ok(!fin.some((f) => f.id.startsWith("rg") || f.id.startsWith("rf")), `${g}x${g}: no hay filas de proporcion`);
      assert.equal(fin.find((f) => f.id === "cn0")?.tex, "4");
    }
  });
});

describe("punnett: como a lapiz", () => {
  test("cada alelo se etiqueta con su padre, de uno en uno, y cada casilla es un paso con visita", () => {
    const { demo } = punnett("Aa", "Aa");
    // los padres se recogen cuando el cuadro esta completo: la etiqueta se mira justo antes
    const antes = aplanar(demo.estados.filter((e) => e.some((f) => f.id === "p1a")).at(-1)!);
    for (const [id, p] of [["p1a", 1], ["p1b", 1], ["p2a", 2], ["p2b", 2]] as const) {
      assert.ok(antes.find((f) => f.id === id)?.debajo?.includes(`padre ${p}`), `${id} lleva padre ${p}`);
    }
    assert.ok(!aplanar(ultimo(demo)).some((f) => f.id === "p1a"), "los padres se recogen antes de contar");
    const conVisita = demo.transiciones.filter((t) => (t.visitas ?? []).length > 0 && (t.brotes ?? []).some((b) => /^c\d\d[ab]$/.test(b.hacia)));
    assert.equal(conVisita.length, 4, "una visita por casilla");
    for (const t of conVisita) assert.equal((t.brotes ?? []).filter((b) => /^c\d\d[ab]$/.test(b.hacia)).length, 2, "cada casilla recibe dos alelos");
  });

  test("las casillas iguales se visitan entre si al contarlas", () => {
    const { demo } = punnett("Aa", "Aa");
    const cuentas = demo.transiciones.filter((t) => (t.brotes ?? []).some((b) => /^cn\d$/.test(b.hacia)));
    assert.equal(cuentas.length, 3);
    assert.equal(cuentas.filter((t) => (t.visitas ?? []).length > 0).length, 1, "solo Aa tiene dos casillas que visitar");
  });

  test("fenotipos: cada genotipo se etiqueta dominante o recesivo, uno por paso", () => {
    const { demo } = punnett("Aa", "Aa");
    const fin = aplanar(ultimo(demo));
    assert.ok(fin.find((f) => f.id === "fe0")?.tex.includes("dominante"));
    assert.ok(fin.find((f) => f.id === "fe1")?.tex.includes("dominante"));
    assert.ok(fin.find((f) => f.id === "fe2")?.tex.includes("recesivo"));
    const texto = todoTexto(demo).join(" ");
    assert.ok(texto.includes("dominante") && texto.includes("recesivo"));
  });

  test("ningun texto trae codigo crudo (${, undefined, NaN) en ninguno de los 9 cruces", () => {
    for (const [a, b] of ORDENADOS) {
      for (const s of todoTexto(punnett(a, b).demo)) assert.ok(!/\$\{|undefined|NaN|\[object/.test(s), `${a}x${b}: codigo crudo en: ${s}`);
    }
  });

  test("tuteo y LaTeX con barra: ningun texto vosea ni trae una orden sin barra", () => {
    for (const [a, b] of ORDENADOS) {
      const { demo } = punnett(a, b);
      for (const s of todoTexto(demo)) {
        assert.ok(!/(^|[^\\a-zA-Z])(cdot|times|dfrac|text|mathrm|textcolor|rightarrow|iff)\b/.test(s), `${a}x${b}: orden de LaTeX sin barra en: ${s}`);
        assert.ok(!/\b(podés|tenés|hacé|mirá|fijate|sumá|contá|vos)\b/i.test(s), `${a}x${b}: voseo en: ${s}`);
        assert.ok(!/[—–]/.test(s.replace(/\$[^$]*\$/g, "")), `${a}x${b}: guion largo en: ${s}`);
        assert.ok(!/\p{Extended_Pictographic}/u.test(s), "sin emojis");
      }
    }
  });

  test("cantidad de pasos razonable segun el cruce", () => {
    for (const [a, b] of ORDENADOS) {
      const n = punnett(a, b).demo.transiciones.length;
      assert.ok(n >= 15 && n <= 32, `${a}x${b}: ${n} pasos`);
    }
  });
});
