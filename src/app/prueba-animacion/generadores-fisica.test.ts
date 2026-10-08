import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Demo, type Ficha } from "./datos.ts";
import { revisar } from "./revisar.ts";
import {
  charles,
  mruvDistancia,
  mruvMultiplica,
  mruvTiempo,
  validarMruvMultiplica,
  mruvVelocidad,
  nf,
  validarCharles,
  validarMruvDistancia,
  validarMruvTiempo,
  validarMruvVelocidad,
  type OpcionesCharles,
} from "./generadores-fisica.ts";

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
  for (const [i, t] of d.transiciones.entries()) {
    assert.ok(t.regla, `${etiqueta}: T${i} sin regla`);
    for (const s of [t.texto, t.porque, d.intro]) {
      // nada de barra suelta, ÷ ni ^ fuera de LaTeX; tuteo, nunca voseo
      const fuera = s.replace(/\$[^$]*\$/g, "");
      assert.ok(!/[/÷^]/.test(fuera), `${etiqueta}: T${i} tiene / ÷ o ^ fuera de LaTeX: ${s}`);
      assert.ok(!/\b(podés|tenés|hacé|fijate|mirá|calculá|sabés|querés|usá|probá|escribí|reemplazá|anotá)\b/i.test(s), `${etiqueta}: T${i} voseo: ${s}`);
    }
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

describe("MRUV: velocidad final", () => {
  test("toda combinacion permitida: revisar y v_f = v_0 + a t (con enteros)", () => {
    let casos = 0;
    for (let v0 = 0; v0 <= 50; v0 += 5) {
      for (let a = -10; a <= 10; a++) {
        for (let t = 1; t <= 20; t++) {
          if (validarMruvVelocidad(v0, a, t)) continue;
          const r = mruvVelocidad(v0, a, t);
          controles(r.demo, `vf ${v0},${a},${t}`);
          assert.equal(r.resumen.vf, v0 + a * t);
          // el resultado final esta en la hoja con su unidad, y la comprobacion devuelve el dato a
          const e = ultimo(r.demo);
          assert.ok(e.some((f) => f.id === "Nvf" && f.tex === nf(v0 + a * t)), `vf ${v0},${a},${t}: falta el resultado`);
          assert.ok(e.some((f) => f.id === "Cq" && f.tex === nf(a)), `vf ${v0},${a},${t}: la comprobacion no da a`);
          casos++;
        }
      }
    }
    assert.ok(casos > 1500, `solo ${casos} casos`);
  });

  test("las unidades se tachan: s^2 = s.s y una s se tacha con la que multiplica", () => {
    const d = mruvVelocidad(10, 2, 5).demo;
    const i = d.transiciones.findIndex((t) => t.descompone && t.texto.includes("\\text{s}\\cdot\\text{s}"));
    assert.ok(i >= 0, "falta s^2 = s.s");
    assert.equal(d.transiciones[i + 1].fusiones[0].modo, "tachar");
    assert.ok(textos(d).some((x) => x.includes("$10+10=20$")));
  });

  test("frena y parte del reposo se vuelven numeros a la vista, con su regla", () => {
    const fr = mruvVelocidad(20, -2, 5).demo;
    assert.ok(aplanar(fr.estados[0]).some((f) => f.tex.includes("frena")));
    assert.ok(fr.transiciones.some((t) => t.regla?.includes("a<0")));
    assert.ok(textos(fr).some((x) => x.includes("$+(-10)=-10$")), "sumar un negativo pasa por la resta");
    const rep = mruvVelocidad(0, 3, 4).demo;
    assert.ok(aplanar(rep.estados[0]).some((f) => f.tex.includes("reposo")));
    assert.ok(rep.transiciones.some((t) => t.fusiones.some((f) => f.desde.includes("Dv0w"))));
    // con todo positivo no aparece la regla de signos
    assert.ok(!mruvVelocidad(10, 2, 5).demo.transiciones.some((t) => t.regla?.includes("+(-n)")));
  });
});

describe("MRUV: distancia", () => {
  test("toda combinacion permitida: 2d = 2 v_0 t + a t^2 (con enteros)", () => {
    let casos = 0;
    for (let v0 = 0; v0 <= 50; v0 += 5) {
      for (let a = -10; a <= 10; a++) {
        for (let t = 1; t <= 20; t++) {
          if (validarMruvDistancia(v0, a, t)) continue;
          const r = mruvDistancia(v0, a, t);
          controles(r.demo, `d ${v0},${a},${t}`);
          assert.equal(r.resumen.dDoble, 2 * v0 * t + a * t * t);
          assert.equal(Math.round(2 * r.resumen.d), 2 * v0 * t + a * t * t);
          assert.ok(ultimo(r.demo).some((f) => f.id === "Nd" && f.tex === nf((2 * v0 * t + a * t * t) / 2)), `d ${v0},${a},${t}: falta el resultado`);
          // el resultado queda en metros, con la unidad que sobrevivio a los tachados
          assert.ok(ultimo(r.demo).some((f) => f.id === "Um1" && f.tex === "\\text{m}"));
          casos++;
        }
      }
    }
    assert.ok(casos > 1500, `solo ${casos} casos`);
  });

  test("10 m/s, 2 m/s^2, 5 s: cada termino por separado y las unidades tachadas de a una", () => {
    const r = mruvDistancia(10, 2, 5);
    assert.equal(r.resumen.d, 75);
    const todo = textos(r.demo).join(" | ");
    for (const pista of ["$10\\cdot 5=50$", "(5\\ \\text{s})^{2}=5^{2}\\ \\text{s}^{2}", "$5\\cdot 5=25$", "$2\\cdot 25=50$", "la mitad de $50$ es $25$", "$50+25=75$"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    const tachados = r.demo.transiciones.filter((t) => t.fusiones.some((f) => f.modo === "tachar"));
    assert.equal(tachados.length, 2, "se tacha s en el primer termino y s^2 en el segundo");
    // t aparece dos veces y se reemplaza en el mismo paso; los dos valores salen del dato t
    const rt = r.demo.transiciones.find((t) => t.texto.startsWith("Reemplazamos $t$"))!;
    assert.deepEqual(rt.brotes!.map((b) => b.desde).sort(), ["Dt", "Dt", "Dtu"]);
  });

  test("con a impar sale un decimal con coma (la mitad de 75 es 37,5)", () => {
    const r = mruvDistancia(0, 3, 5);
    assert.equal(r.resumen.d, 37.5);
    assert.ok(textos(r.demo).some((x) => x.includes("37{,}5")));
  });
});

describe("MRUV: tiempo", () => {
  test("toda combinacion permitida: a t = v_f - v_0 y t entero positivo", () => {
    let casos = 0;
    for (let v0 = 0; v0 <= 60; v0 += 5) {
      for (let vf = 0; vf <= 60; vf += 5) {
        for (let a = -10; a <= 10; a++) {
          if (validarMruvTiempo(v0, vf, a)) continue;
          const r = mruvTiempo(v0, vf, a);
          controles(r.demo, `t ${v0},${vf},${a}`);
          const { t } = r.resumen;
          assert.ok(Number.isInteger(t) && t > 0);
          assert.equal(a * t, vf - v0);
          const e = ultimo(r.demo);
          assert.ok(e.some((f) => f.id === "Nt" && f.tex === nf(t)));
          assert.ok(e.some((f) => f.id === "Us" && f.tex === "\\text{s}"), "la unidad que queda es s");
          assert.ok(e.some((f) => f.id === "Csum" && f.tex === nf(vf)), "la comprobacion devuelve v_f");
          casos++;
        }
      }
    }
    assert.ok(casos > 150, `solo ${casos} casos`);
  });

  test("despejar es ARRASTRAR: v_0 cruza el = y cambia de signo; a pasa dividiendo", () => {
    const r = mruvTiempo(10, 30, 2);
    const e = r.demo.estados.map(aplanar);
    const i = r.demo.transiciones.findIndex((t) => t.texto.startsWith("Pasamos $v_{0}$"));
    assert.ok(i >= 0);
    const pos = (s: Ficha[], id: string) => s.findIndex((f) => f.id === id);
    assert.ok(pos(e[i], "Fv0") > pos(e[i], "Fe") && pos(e[i + 1], "Fv0") < pos(e[i + 1], "Fe"), "v0 cruza la igualdad");
    assert.notEqual(e[i].find((f) => f.id === "Fv0")!.tex, e[i + 1].find((f) => f.id === "Fv0")!.tex, "cambia de signo");
    const j = r.demo.transiciones.findIndex((t) => t.texto.includes("pasa al otro lado dividiendo"));
    assert.ok(r.demo.transiciones[j].brotes!.some((b) => b.desde === "Fa" && b.hacia === "Ga"), "la a viaja abajo de la raya");
  });

  test("las unidades de la division se simplifican hasta s, de a una", () => {
    const r = mruvTiempo(10, 30, 2);
    assert.equal(r.resumen.t, 10);
    const todo = textos(r.demo).join(" | ");
    for (const pista of ["$30-10=20$", "\\dfrac{20}{2}=10", "extremos y medios", "se tacha con el $\\text{m}$", "\\text{s}^{2}$ como $\\text{s}\\cdot\\text{s}", "$2\\cdot 10=20$", "$10+20=30$"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // frenando: negativo entre negativo
    const fr = mruvTiempo(30, 0, -5);
    assert.equal(fr.resumen.t, 6);
    assert.ok(textos(fr.demo).some((x) => x.includes("negativo entre un negativo")));
  });
});

describe("MRUV: multiplica su velocidad (hallar a con dos incognitas)", () => {
  test("la pregunta del banco (2024, 1ra opcion, 10): v0 = 5a, 50a + 50a = 100a, a = 2 y 900 = 100 + 800", () => {
    assert.equal(validarMruvMultiplica(3, 200, 10), null);
    const r = mruvMultiplica(3, 200, 10);
    controles(r.demo, "banco mruv");
    assert.equal(r.resumen.a, 2);
    const todo = textos(r.demo).join(" | ");
    for (const pista of ["v_{f}=3v_{0}", "$3v_{0}-v_{0}=2v_{0}$", "\\dfrac{10}{2}=5", "v_{0}=5a", "$10(5a)=50a$", "la mitad de $100$ es $50$", "$50a+50a=100a$", "\\dfrac{200}{100}=2", "a=2\\ \\dfrac{\\text{m}}{\\text{s}^{2}}", "$3\\cdot 10=30$", "$30\\cdot 30=900$", "$10\\cdot 10=100$", "$4\\cdot 200=800$", "$100+800=900$"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // el 5a de la primera formula VIAJA a la segunda (mismo origen, no se reescribe)
    const t = r.demo.transiciones.find((x) => x.texto.startsWith("Usamos la primera fórmula"))!;
    assert.deepEqual(t.brotes, [{ desde: "K5", hacia: "V5a" }]);
    assert.ok(r.demo.transiciones.at(-1)!.texto.includes("cumple también"));
  });

  test("toda combinacion permitida: d = c4·a y v_f^2 = v_0^2 + 2ad (con enteros)", () => {
    let casos = 0;
    for (let k = 2; k <= 5; k++) {
      for (let t = 2; t <= 20; t += 2) {
        for (let d = 1; d <= 2000; d += 3) {
          if (validarMruvMultiplica(k, d, t)) continue;
          const r = mruvMultiplica(k, d, t);
          controles(r.demo, `mult ${k},${d},${t}`);
          const { c1, c4, a } = r.resumen;
          const a100 = Math.round(a * 100);
          assert.equal(a100 * c4, d * 100, `a=${a} no cumple d = c4 a`);
          // k v0 = v0 + a t  (con v0 = c1 a)
          assert.equal(k * c1 * a100, c1 * a100 + a100 * t);
          // d = v0 t + a t^2 / 2  -> 2d = 2 c1 a t + a t^2
          assert.equal(2 * d * 100, 2 * c1 * a100 * t + a100 * t * t);
          // la verificacion del banco: (k c1 a)^2 = (c1 a)^2 + 2 a d
          assert.equal((k * c1 * a100) ** 2, (c1 * a100) ** 2 + 2 * a100 * d * 100);
          casos++;
        }
      }
    }
    assert.ok(casos > 100, `solo ${casos} casos`);
  });

  test("duplica (k = 2): v0 = t·a sin dividir", () => {
    assert.equal(validarMruvMultiplica(2, 150, 10), null);
    const r = mruvMultiplica(2, 150, 10);
    controles(r.demo, "duplica");
    assert.equal(r.resumen.a, 1);
    assert.ok(textos(r.demo).some((x) => x.includes("$2v_{0}-v_{0}=v_{0}$")));
    assert.ok(!r.demo.transiciones.some((x) => x.texto.includes("pasa al otro lado dividiendo") && x.texto.includes("$1$")));
  });
});

describe("ley de Charles", () => {
  const BANCO: [number, number, number, OpcionesCharles] = [20, -33, 27, { presion: { p1: 1, u1: "atm", p2: 760, u2: "torr" } }];

  test("la pregunta del banco (2018, 3ra opcion, 14): 240 K, 300 K, 1,25 y 25 mL", () => {
    assert.equal(validarCharles(...BANCO), null);
    const r = charles(...BANCO);
    controles(r.demo, "banco");
    assert.deepEqual([r.resumen.T1, r.resumen.T2, r.resumen.q, r.resumen.V2], [240, 300, 1.25, 25]);
    const todo = textos(r.demo).join(" | ");
    // los mismos numeros que la explicacion del banco, en su orden
    for (const pista of ["$-33+273=240$", "$27+273=300$", "\\dfrac{300}{240}=1{,}25", "$20\\cdot 1{,}25=25$", "V_{2}=25\\ \\text{mL}"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // 760 torr pasa a 1 atm con el factor y el torr se tacha
    assert.ok(todo.includes("\\dfrac{1\\ \\text{atm}}{760\\ \\text{torr}}"));
    assert.ok(r.demo.transiciones.some((t) => t.fusiones.some((f) => f.modo === "tachar" && f.desde.includes("DP2u"))));
    assert.ok(r.demo.transiciones.some((t) => t.texto.includes("las dos presiones valen $1\\ \\text{atm}$")));
    // los kelvin se tachan antes de dividir
    const iK = r.demo.transiciones.findIndex((t) => t.texto.startsWith("Los $\\text{K}$"));
    const iDiv = r.demo.transiciones.findIndex((t) => t.texto.startsWith("Dividimos: $\\dfrac{300}"));
    assert.ok(iK >= 0 && iK < iDiv);
    // el ultimo paso es la comprobacion, y nace de los datos
    assert.ok(r.demo.transiciones.at(-1)!.texto.includes("cumple la ley"));
    assert.ok(todo.includes("$20\\cdot 300=6000$") && todo.includes("$25\\cdot 240=6000$"));
  });

  test("toda combinacion permitida: V_2 T_1 = V_1 T_2 (con enteros)", () => {
    let casos = 0;
    for (const V1 of [1, 2.5, 10, 20, 25, 50, 100, 250, 1000]) {
      for (let t1 = -100; t1 <= 200; t1 += 7) {
        for (let t2 = -100; t2 <= 200; t2 += 11) {
          for (const op of [{}, { kelvin: true }, { presion: { p1: 1, u1: "atm", p2: 760, u2: "torr" } }, { presion: { p1: 2, u1: "atm", p2: 2, u2: "atm" } }] as OpcionesCharles[]) {
            const tt1 = op.kelvin ? t1 + 300 : t1;
            const tt2 = op.kelvin ? t2 + 300 : t2;
            if (validarCharles(V1, tt1, tt2, op)) continue;
            const r = charles(V1, tt1, tt2, op);
            controles(r.demo, `charles ${V1},${tt1},${tt2},${JSON.stringify(op)}`);
            const { T1, T2, V2 } = r.resumen;
            assert.equal(Math.round(V2 * 100) * T1, Math.round(V1 * 100) * T2, `V2=${V2} no cumple`);
            assert.ok(ultimo(r.demo).some((f) => f.id === "R" && f.tex === nf(V2)));
            casos++;
          }
        }
      }
    }
    assert.ok(casos > 300, `solo ${casos} casos`);
  });

  test("presiones en torr de un lado: 1520 torr son 2 atm; y torr del primer estado tambien", () => {
    const op1: OpcionesCharles = { presion: { p1: 2, u1: "atm", p2: 1520, u2: "torr" } };
    assert.equal(validarCharles(10, 0, 273, op1), null);
    const r = charles(10, 0, 273, op1);
    controles(r.demo, "1520 torr");
    assert.ok(textos(r.demo).some((x) => x.includes("\\dfrac{1520}{760}=2")));
    const op2: OpcionesCharles = { presion: { p1: 760, u1: "mmHg", p2: 1, u2: "atm" } };
    assert.equal(validarCharles(10, 0, 273, op2), null);
    const s = charles(10, 0, 273, op2);
    controles(s.demo, "mmHg primero");
  });

  test("rechaza lo que no es Charles o no da un numero corto", () => {
    assert.ok(validarCharles(20, 27, 27)); // misma temperatura
    assert.ok(validarCharles(20, -300, 27)); // bajo el cero absoluto
    assert.ok(validarCharles(20, -33, 27, { presion: { p1: 1, u1: "atm", p2: 700, u2: "torr" } })); // presiones distintas
    assert.ok(validarCharles(10, 0, 1)); // 274/273 no es un decimal corto
  });
});
