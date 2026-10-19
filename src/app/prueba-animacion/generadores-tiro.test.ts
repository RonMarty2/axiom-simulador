import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Demo, type Ficha } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { hallazgosEstilo } from "./estilo.ts";
import { nf } from "./generadores-fisica.ts";
import { ALTURAS_TIRO, tiroHorizontal, validarTiro } from "./generadores-tiro.ts";

const limpia = (s: string) =>
  s
    .replace(/\{,\}/g, ",")
    .replace(/\\textcolor\{[^}]*\}\{([^{}]*)\}/g, "$1")
    .replace(/\\ /g, "")
    .replace(/\s+/g, "");
/** solo los numeros y operadores de la hoja (las unidades van aparte y se saltean) */
const esUnidad = (f: Ficha) => limpia(f.tex).includes("\\text") || !!f.frac;
const unir = (e: Ficha[]) => limpia(aplanar(e).filter((f) => !esUnidad(f) && !f.salto).map((f) => (f.sup ? `^{${f.tex}}` : f.tex)).join(""));
const textos = (d: Demo) => d.transiciones.map((t) => `${t.texto} ${t.porque}`);
const ultimo = (d: Demo) => aplanar(d.estados.at(-1)!);

/** controles comunes a toda animacion de fisica, ademas de revisar() */
function controles(d: Demo, etiqueta: string) {
  revisar(d, etiqueta);
  assert.deepEqual(hallazgosEstilo(d, etiqueta, "movimiento"), [], `${etiqueta}: movimiento (arrastrar, etiquetas de a una)`);
  for (const [i, t] of d.transiciones.entries()) {
    assert.ok(t.regla, `${etiqueta}: T${i} sin regla`);
    for (const s of [t.texto, t.porque, d.intro]) {
      // nada de barra suelta, ÷ ni ^ fuera de LaTeX; tuteo, nunca voseo
      const fuera = s.replace(/\$[^$]*\$/g, "");
      assert.ok(!/[/÷^]/.test(fuera), `${etiqueta}: T${i} tiene / ÷ o ^ fuera de LaTeX: ${s}`);
      assert.ok(!/\b(podés|tenés|hacé|fijate|mirá|calculá|sabés|querés|usá|probá|escribí|reemplazá|anotá)\b/i.test(s), `${etiqueta}: T${i} voseo: ${s}`);
    }
    // LaTeX con doble barra: ninguna orden sin su barra (en el codigo; aqui se ve como una sola)
    assert.ok(!/(^|[^\\a-zA-Z])(cdot|dfrac|sqrt|text)\b/.test(`${t.texto} ${t.porque} ${t.regla}`), `${etiqueta}: T${i} LaTeX sin barra`);
  }
  // todo "x = y" aritmetico de un texto existe en la hoja (antes o despues del paso)
  for (const [i, t] of d.transiciones.entries()) {
    for (const seg of t.texto.match(/\$[^$]+\$/g) ?? []) {
      const s = limpia(seg.slice(1, -1));
      const sin = s.replace(/\\cdot/g, "").replace(/\^\{2\}/g, "");
      if (!s.includes("=") || !/^[-+(),\d=]+$/.test(sin)) continue;
      const hoja = `${unir(d.estados[i])}|${unir(d.estados[i + 1])}`;
      for (const parte of s.split("=")) assert.ok(hoja.includes(parte), `${etiqueta}: T${i} el texto dice ${s} pero ${parte} no esta en la hoja`);
    }
  }
}

describe("tiro horizontal", () => {
  test("toda combinacion permitida: revisar, h = 5 t^2 y x = v0 t (con enteros)", () => {
    let casos = 0;
    for (const h of ALTURAS_TIRO) {
      for (let v0 = 1; v0 <= 50; v0++) {
        assert.equal(validarTiro(h, v0), null);
        const r = tiroHorizontal(h, v0);
        controles(r.demo, `tiro ${h},${v0}`);
        const { t, x } = r.resumen;
        assert.ok(Number.isInteger(t) && t >= 2 && t <= 9);
        assert.equal(2 * h, 10 * t * t, "t sale de 2h = g t^2");
        assert.equal(x, v0 * t);
        const e = ultimo(r.demo);
        // el resultado queda en metros y la comprobacion devuelve la altura del enunciado
        assert.ok(e.some((f) => f.id === "Nx" && f.tex === nf(x)), `tiro ${h},${v0}: falta el resultado`);
        assert.ok(e.some((f) => f.id === "Um" && f.tex === "\\text{m}"), `tiro ${h},${v0}: la unidad no queda en m`);
        assert.ok(e.some((f) => f.id === "T3" && limpia(f.tex) === nf(t)), `tiro ${h},${v0}: falta t`);
        assert.ok(e.some((f) => f.id === "Kmit" && f.tex === nf(h)), `tiro ${h},${v0}: la comprobacion no devuelve h`);
        casos++;
      }
    }
    assert.equal(casos, 8 * 50);
  });

  test("h = 45 m, v0 = 8 m/s: t = 3 s y x = 24 m, con la cuenta completa", () => {
    const r = tiroHorizontal(45, 8);
    assert.deepEqual([r.resumen.t, r.resumen.x], [3, 24]);
    const todo = textos(r.demo).join(" | ");
    for (const pista of [
      "$2\\cdot 45=90$",
      "\\dfrac{90}{10}=9",
      "extremos y medios",
      "$\\text{m}\\cdot\\text{s}^{2}$",
      "t^{2}=9\\ \\text{s}^{2}",
      "t=\\sqrt{9\\ \\text{s}^{2}}",
      "1 por 1 da 1, 2 por 2 da 4, 3 por 3 da 9",
      "$3\\cdot 3=9$",
      "$\\text{s}^{2}$ es $\\text{s}\\cdot\\text{s}$",
      "t=3\\ \\text{s}",
      "$8\\cdot 3=24$",
      "x=24\\ \\text{m}",
      "$3^{2}$ es $3\\cdot 3$",
      "$10\\cdot 9=90$",
      "la mitad de $90$ es $45$",
    ]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    assert.ok(r.demo.intro.includes("45\\ \\text{m}") && r.demo.intro.includes("8\\ \\dfrac{\\text{m}}{\\text{s}}"));
    assert.ok(r.demo.transiciones.at(-1)!.texto.includes("la altura del enunciado"));
  });

  test("los datos del enunciado se etiquetan de uno en uno y NACEN a las formulas (nada de la nada)", () => {
    const r = tiroHorizontal(45, 8);
    const d = r.demo;
    // tres etiquetas, una por paso, con su letra y su color
    const etiquetas = d.estados.map((e) => aplanar(e).filter((f) => f.debajo).length);
    assert.deepEqual(etiquetas.slice(0, 5), [0, 0, 1, 2, 3]);
    // cada letra reemplazada trae su numero y su unidad desde el dato (o desde el resultado de t)
    const orig = (hacia: string) => d.transiciones.flatMap((t) => t.brotes ?? []).filter((b) => b.hacia === hacia).map((b) => b.desde);
    assert.deepEqual([orig("Nh"), orig("Uh")], [["Dh"], ["Dhu"]]);
    assert.deepEqual([orig("Ng"), orig("Ug")], [["Dg"], ["Dgu"]]);
    assert.deepEqual([orig("Nv"), orig("Uv")], [["Dv"], ["Dvu"]]);
    assert.deepEqual([orig("Nt"), orig("Ut")], [["T3"], ["Ts"]]);
    // las dos formulas con letras nacen de algo visible: x de lo que piden, la caida de la t que falta
    assert.ok(orig("Ax").includes("Dq") && orig("Av").includes("Dq") && orig("At").includes("Dq"));
    assert.ok(orig("Bh").includes("At") && orig("Bg").includes("At"));
    // el tiempo se calcula ANTES de reemplazarlo en x: las letras de la fórmula del alcance esperan
    const iT = d.transiciones.findIndex((t) => t.texto.startsWith("Reemplazamos $t$"));
    const iRes = d.transiciones.findIndex((t) => t.texto.includes("Resultado: $t=3\\ \\text{s}$"));
    assert.ok(iRes >= 0 && iRes < iT);
  });

  test("la raiz se resuelve por su significado: 9 = 3·3, s^2 = s·s, parejas que se juntan y la raiz suelta", () => {
    const r = tiroHorizontal(45, 8);
    const d = r.demo;
    const i = (pista: string) => d.transiciones.findIndex((t) => t.texto.includes(pista));
    const orden = [i("Buscamos $t$, no $t^{2}$"), i("qué es la raíz cuadrada"), i("escribimos $9$ como $3\\cdot 3$"), i("es $\\text{s}\\cdot\\text{s}$"), i("dos parejas"), i("Cada pareja cuenta"), i("suelta lo que quedó")];
    assert.ok(orden.every((k) => k >= 0), `faltan pasos: ${orden}`);
    assert.deepEqual([...orden].sort((a, b) => a - b), orden, "en orden");
    // 9 y s^2 se descomponen (marca descompone) y las parejas se juntan con ancla, sin tachar
    assert.ok(d.transiciones[orden[2]].descompone && d.transiciones[orden[3]].descompone);
    const juntar = d.transiciones[orden[5]].fusiones;
    assert.deepEqual(juntar.map((f) => f.ancla), ["Qa", "Sa"]);
    // la raiz no salta al resultado: entre la raiz y t = 3 s hay 5 pasos
    assert.ok(orden[6] - orden[0] >= 6);
    // el 3 y la s salen de la raiz viajando (brotes desde las piezas de adentro)
    assert.deepEqual(d.transiciones[orden[6]].brotes, [{ desde: "Qa", hacia: "T3" }, { desde: "Sa", hacia: "Ts" }]);
    // el exponente 2 VIAJA para volverse raiz (no desaparece)
    assert.deepEqual(d.transiciones[orden[0]].brotes, [{ desde: "Bs", hacia: "Rz" }]);
  });

  test("despejar es ARRASTRAR: el 1/2 cruza el igual y pasa a 2; la g pasa dividiendo; las unidades se simplifican de a una", () => {
    const d = tiroHorizontal(45, 8).demo;
    const e = d.estados.map(aplanar);
    const i = d.transiciones.findIndex((t) => t.texto.startsWith("Pasamos el $\\dfrac{1}{2}$"));
    assert.ok(i >= 0);
    const pos = (s: Ficha[], id: string) => s.findIndex((f) => f.id === id);
    assert.ok(pos(e[i], "Bf") > pos(e[i], "Be") && pos(e[i + 1], "Bf") < pos(e[i + 1], "Be"), "el 1/2 cruza la igualdad");
    assert.notEqual(e[i].find((f) => f.id === "Bf")!.tex, e[i + 1].find((f) => f.id === "Bf")!.tex, "cambia de 1/2 a 2");
    const j = d.transiciones.findIndex((t) => t.texto.includes("pasa al otro lado dividiendo"));
    assert.ok(d.transiciones[j].brotes!.some((b) => b.desde === "Bg" && b.hacia === "Cg"), "la g viaja abajo de la raya");
    assert.ok(d.transiciones[j].brotes!.some((b) => b.desde === "Bf" && b.hacia === "Cf"), "el 2 viaja arriba de la raya");
    // se tacha la m (pieza concreta) y la s del alcance: dos tachados de unidades
    const tachados = d.transiciones.filter((t) => t.fusiones.some((f) => f.modo === "tachar"));
    assert.equal(tachados.length, 2);
    // ningun paso de los numeros mezcla unidades: 2h y la division son de a una
    assert.ok(d.transiciones.some((t) => t.texto.startsWith("Dividimos los números")));
  });

  test("sin signos raros: con todo positivo no aparece ninguna regla de negativos", () => {
    const d = tiroHorizontal(80, 12).demo;
    assert.ok(!textos(d).some((x) => /negativ/.test(x)));
    assert.ok(!d.transiciones.some((t) => t.regla?.includes("(-")));
  });

  test("valida: enteros, velocidad 1 a 50 y alturas con tiempo exacto", () => {
    assert.equal(validarTiro(45, 8), null);
    assert.ok(validarTiro(45.5, 8));
    assert.ok(validarTiro(45, 0));
    assert.ok(validarTiro(45, 51));
    assert.ok(validarTiro(50, 8)); // 2·50/10 = 10 no es cuadrado perfecto
    assert.ok(validarTiro(5, 8)); // t = 1: la raiz no ensena nada
    assert.ok(validarTiro(-45, 8));
    assert.ok(validarTiro(405 + 5, 8));
  });
});

// Lo que mide el barrido de ancho: la fila de datos con etiquetas cabe en un celular y la letra queda bajo su dato.
describe("fila de datos con etiquetas: cabe en un celular y la etiqueta queda bajo su dato", () => {
  /** las letras con que Fusion.tsx calcula el ancho reservado bajo una etiqueta (cuenta tambien el color) */
  const letrasMotor = (tex: string) => tex.replace(/\\text\{([^}]*)\}/g, "$1").replace(/\\[a-zA-Z]+/g, "X").replace(/[{}$^_]/g, "").length;
  const renglones = (e: Ficha[]) => {
    const rs: Ficha[][] = [[]];
    for (const f of e) {
      if (f.salto) rs.push([]);
      else rs.at(-1)!.push(f);
    }
    return rs;
  };
  for (const [h, v0] of [[45, 8], [20, 50], [405, 1]] as const) {
    test(`h=${h}, v0=${v0}`, () => {
      const d = tiroHorizontal(h, v0).demo;
      for (const [i, e] of d.estados.entries()) {
        const rs = renglones(e);
        for (const [j, r] of rs.entries()) {
          if (!r.some((f) => f.debajo)) continue;
          assert.ok(j < rs.length - 1, `E${i}: el renglon con etiquetas es el ultimo`);
          assert.ok(!r.some((f) => f.id === "Dq" || (f.op && f.tex === "=")), `E${i}: renglon con etiquetas mezclado con lo que piden o con una formula`);
          assert.ok(r.length <= 5, `E${i}: renglon con etiquetas de ${r.length} piezas (en 343 px caben 5)`);
          for (const f of r.filter((x) => x.debajo)) assert.ok(letrasMotor(f.debajo!) <= 7, `E${i}: la etiqueta de ${f.id} reserva ${letrasMotor(f.debajo!)} letras`);
        }
      }
      const e0 = d.estados[0];
      const iq = e0.findIndex((f) => f.id === "Dq");
      assert.ok(iq > 0 && e0[iq - 1].salto, "lo que piden no empieza renglon");
    });
  }
});
