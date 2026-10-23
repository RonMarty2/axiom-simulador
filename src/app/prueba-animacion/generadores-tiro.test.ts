import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Demo, type Ficha } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { hallazgosEstilo } from "./estilo.ts";
import { nf } from "./generadores-fisica.ts";
import { ALTURAS_TIRO, tiroHorizontal as tiroCrudo, validarTiro } from "./generadores-tiro.ts";

// El generador pega la puntuacion a la formula con un word-joiner (U+2060); los textos se comparan sin el.
const WJ = "⁠";
const despegar = (s: string) => s.replaceAll(WJ, "");
const tiroHorizontal: typeof tiroCrudo = (h, v0, enunciado) => {
  const r = tiroCrudo(h, v0, enunciado);
  const demo = { ...r.demo, intro: despegar(r.demo.intro), transiciones: r.demo.transiciones.map((t) => ({ ...t, texto: despegar(t.texto), porque: despegar(t.porque), ...(t.regla ? { regla: despegar(t.regla) } : {}) })) };
  return { ...r, demo };
};

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
        assert.ok(e.some((f) => f.id === "Wmit" && f.tex === nf(h)), `tiro ${h},${v0}: la comprobacion no devuelve h`);
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
      "Primero señalamos los extremos",
      "El medio es el que queda adentro",
      "Extremos arriba y medios abajo",
      "$\\text{m}\\cdot\\text{s}^{2}$",
      "t^{2}=9\\ \\text{s}^{2}",
      "t=\\sqrt{9\\ \\text{s}^{2}}",
      "El último intento, $3\\cdot 3=9$",
      "$3\\cdot 3=9$",
      "Escribimos la fórmula de la caída, todavía con letras",
      "Reemplazamos $h$ por $45\\ \\text{m}$, la altura del enunciado",
      "$(3\\ \\text{s})^{2}=3^{2}\\ \\text{s}^{2}$",
      "la $\\text{s}^{2}$ de abajo se tacha con la $\\text{s}^{2}$ que multiplica",
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
    // ...y la t que falta se anota (t = ?) ANTES: la caida entera (incluidos el 1/2 y el 2 del cuadrado) nace de esa incognita, no de la t de la otra formula
    assert.deepEqual(orig("Dtq"), ["At"]);
    for (const id of ["Bh", "Bf", "Bg", "Bt", "Bs"]) assert.deepEqual(orig(id), ["Dtq"], `${id} nace de t = ?`);
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

  test("despejar es ARRASTRAR: el 2 del 1/2 cruza el igual y el 1 se tacha (no se pierde); la g pasa dividiendo; extremos y medios se SEÑALAN antes", () => {
    const d = tiroHorizontal(45, 8).demo;
    const e = d.estados.map(aplanar);
    const i = d.transiciones.findIndex((t) => t.texto.startsWith("Pasamos el $\\dfrac{1}{2}$"));
    assert.ok(i >= 0);
    const pos = (s: Ficha[], id: string) => s.findIndex((f) => f.id === id);
    // el 2 estaba abajo del 1/2, a la derecha del igual, y llega a la izquierda con su mismo recorrido (brote desde el 2 de la fraccion)
    assert.ok(pos(e[i], "Bf2") > pos(e[i], "Be") && pos(e[i + 1], "Cf") < pos(e[i + 1], "Be"), "el 2 cruza la igualdad");
    assert.deepEqual(d.transiciones[i].brotes, [{ desde: "Bf1", hacia: "Bu" }, { desde: "Bf2", hacia: "Cf" }]);
    assert.equal(e[i + 1].find((f) => f.id === "Bu")!.tex, "1", "el 1 de arriba no se pierde: queda a la derecha");
    // el 1 se tacha CON su punto (pieza concreta), en su propio paso
    assert.deepEqual(d.transiciones[i + 1].fusiones, [{ desde: ["Bu", "Bm2"], hacia: null, modo: "tachar" }]);
    const j = d.transiciones.findIndex((t) => t.texto.includes("pasa al otro lado dividiendo"));
    assert.ok(d.transiciones[j].brotes!.some((b) => b.desde === "Bg" && b.hacia === "Rg"), "la g viaja abajo de la raya");
    assert.ok(d.transiciones[j].brotes!.some((b) => b.desde === "Cf" && b.hacia === "Rf"), "el 2 viaja arriba de la raya");
    // se tachan: el 1, la m del alcance... (unidades y el 1); cada tachado nombra piezas concretas
    const tachados = d.transiciones.filter((t) => t.fusiones.some((f) => f.modo === "tachar"));
    assert.equal(tachados.length, 4, "el 1, las m/s de dos pasos de unidades y la s^2 de la comprobacion");
    // extremos y medios: primero se resaltan los de afuera, luego el de adentro, y recien despues viajan
    const ex = d.transiciones.findIndex((t) => t.texto.includes("Primero señalamos los extremos"));
    assert.ok(ex >= 0);
    assert.deepEqual(d.transiciones[ex].resaltar, ["Uh", "Ugd"]);
    assert.deepEqual(d.transiciones[ex + 1].resaltar, ["Ugn"]);
    assert.ok(d.transiciones[ex + 2].fusiones.some((f) => f.hacia === "UG" && f.modo === "viajar"));
    // ningun paso de los numeros mezcla unidades: 2h y la division son de a una
    assert.ok(d.transiciones.some((t) => t.texto.startsWith("Dividimos los números")));
  });

  test("el tanteo de la raiz se ve en la hoja: todas las pruebas (de a dos por renglon), la ultima da justo lo de adentro y despues se borran", () => {
    for (const t of [2, 3, 4, 5, 6, 7, 8, 9]) {
      const h = 5 * t * t;
      const d = tiroHorizontal(h, 8).demo;
      const e = d.estados.map(aplanar);
      const i = d.transiciones.findIndex((tr) => tr.texto.startsWith("Probamos con los números en orden"));
      assert.ok(i >= 0, `${h}: falta el paso del tanteo`);
      const parejas = e[i + 1].filter((f) => /^Z\d+$/.test(f.id));
      assert.equal(parejas.length, Math.ceil(t / 2), `${h}: dos pruebas por pieza`);
      // cada numero de 1 a t aparece escrito una vez, con su cuadrado, y solo la ultima prueba no lleva coma
      const texto = parejas.map((f) => f.tex).join(" ");
      for (let k = 1; k <= t; k++) assert.ok(texto.includes(`${k}\\cdot ${k}=${k * k}${k < t ? "," : ""}`), `${h}: falta la prueba ${k}`);
      assert.ok(texto.trimEnd().endsWith(`${t}\\cdot ${t}=${t * t}`));
      assert.deepEqual(d.transiciones[i].brotes!.map((b) => b.desde), Array(parejas.length).fill("Nt2"));
      // el paso siguiente señala la pieza con la que da justo, y luego se borran todas
      assert.deepEqual(d.transiciones[i + 1].resaltar, [`Z${parejas.length}`, "Nt2"]);
      // singular cuando hay un solo intento anterior (t = 2), plural en los demas
      const t2 = d.transiciones[i + 1].texto;
      assert.ok(t === 2 ? t2.includes("El anterior dio menos") && !t2.includes("Los anteriores") : t2.includes("Los anteriores daban menos") && !t2.includes("El anterior"), `${h}: concordancia`);
      assert.equal(e[i + 3].filter((f) => /^Z\d+$/.test(f.id)).length, 0, `${h}: las pruebas se borran`);
      assert.ok(d.transiciones[i + 2].fusiones[0].desde.includes(`Z${parejas.length}`));
    }
  });

  test("la raiz aclara que lo de adentro todavia no es el valor de t, y la comprobacion tiene el corte fijo y la unidad pegada", () => {
    for (const t of [2, 3, 9]) {
      const d = tiroHorizontal(5 * t * t, 8).demo;
      assert.ok(d.transiciones.some((tr) => tr.texto.includes("todavía no es el valor de $t$")));
      // desde que se escribe la formula de la comprobacion hasta el final, el salto KS3 esta en el mismo lugar (despues de la h, antes del =)
      const desde = d.estados.findIndex((es) => aplanar(es).some((f) => f.id === "KS3"));
      assert.ok(desde > 0);
      for (const es of d.estados.slice(desde)) {
        const ids = aplanar(es).map((f) => f.id);
        assert.ok(ids.indexOf("KS3") >= 0 && ids.indexOf("KS3") < ids.indexOf("Ke"), "el corte de la comprobacion no se mueve");
        const kh = aplanar(es).find((f) => f.id === "KS3")!;
        assert.equal(kh.tex, "", "el salto no lleva texto");
      }
      // la unidad s^2 va pegada a su numero
      const e = d.estados.map(aplanar);
      for (const es of e) if (es.some((f) => f.id === "Wus2")) assert.ok(es.find((f) => f.id === "Wus2")!.pegado);
    }
  });

  test("la fraccion m/(m/s^2) lleva el divisor entre parentesis y los extremos y el medio quedan marcados mientras dura el paso", () => {
    const d = tiroHorizontal(45, 8).demo;
    const i = d.transiciones.findIndex((tr) => tr.texto.startsWith("Ahora las unidades: $\\text{m}$ dividida"));
    assert.ok(i >= 0);
    const antes = aplanar(d.estados[i + 1]);
    assert.ok(antes.some((f) => f.id === "Ngpa") && antes.some((f) => f.id === "Ngpb"), "parentesis del divisor");
    assert.ok(antes.find((f) => f.id === "Uh")!.destacada && antes.find((f) => f.id === "Ugd")!.destacada, "extremos marcados quietos");
    assert.ok(!antes.find((f) => f.id === "Ugn")!.destacada);
    assert.ok(aplanar(d.estados[i + 2]).find((f) => f.id === "Ugn")!.destacada, "el medio tambien se marca");
  });

  test("la comprobacion escribe la formula con LETRAS, reemplaza una por vez (con unidades) y nada nace de la t sin motivo", () => {
    const d = tiroHorizontal(45, 8).demo;
    const orig = (hacia: string) => d.transiciones.flatMap((t) => t.brotes ?? []).filter((b) => b.hacia === hacia).map((b) => b.desde);
    // el rotulo nace del resultado t; la formula con letras (incluido el 1/2 y el 2) nace del rotulo, no de T3
    assert.deepEqual(orig("Kq"), ["T3"]);
    for (const id of ["Kh", "Kf", "Kg", "Kt", "Ks"]) assert.deepEqual(orig(id), ["Kq"], `${id} nace del rotulo de la comprobacion`);
    // un paso por letra, en este orden, y cada uno trae SU numero y SU unidad desde el dato
    const pasoDe = (hacia: string) => d.transiciones.findIndex((t) => (t.brotes ?? []).some((b) => b.hacia === hacia));
    const iH = pasoDe("Wh");
    assert.deepEqual([pasoDe("Whu"), pasoDe("Wg"), pasoDe("Wgu"), pasoDe("Wp")], [iH, iH + 1, iH + 1, iH + 2]);
    assert.deepEqual([orig("Wh"), orig("Whu"), orig("Wg"), orig("Wgu"), orig("Wp")], [["Dh"], ["Dhu"], ["Dg"], ["Dgu"], ["T3"]]);
    // nada de la comprobacion llega de golpe: ningun paso copia mas de una letra (o su numero y su unidad)
    for (const [k, t] of d.transiciones.entries()) {
      if (k < pasoDe("Kq")) continue;
      assert.ok((t.brotes ?? []).length <= 5, `T${k}: copia demasiadas piezas de golpe`);
    }
    // las unidades viajan: la comprobacion termina en 45 m = 45 m y la s^2 se tacha a la vista
    const fin = aplanar(d.estados.at(-1)!);
    assert.ok(fin.some((f) => f.id === "Whu") && fin.some((f) => f.id === "Wum"), "ambos lados quedan en metros");
    assert.ok(d.transiciones.some((t) => t.fusiones.some((f) => f.modo === "tachar" && f.desde.includes("Wus2"))));
    // el cuadrado pasa por parentesis: (3 s)^2 -> 3^2 s^2 -> 3·3 -> 9, una cosa por paso
    assert.ok(textos(d).some((x) => x.includes("$(3\\ \\text{s})^{2}=3^{2}\\ \\text{s}^{2}$")));
  });

  test("la puntuacion va fuera de la formula y pegada (word-joiner): ninguna formula seguida de . , ; : sin pegar", () => {
    for (const [h, v0] of [[45, 8], [20, 1], [405, 50]] as const) {
      const d = tiroCrudo(h, v0).demo;
      for (const s of [d.intro, ...d.transiciones.flatMap((t) => [t.texto, t.porque, t.regla ?? ""])]) {
        assert.ok(!/\$[.,;:]/.test(s), `punto sin pegar: ${s.slice(0, 80)}`);
        assert.ok(!/[.,;:]\$/.test(s.replace(/\$[^$]*\$/g, "")), "puntuacion pegada por dentro de la formula");
      }
      assert.ok(d.transiciones.some((t) => t.texto.includes(`$${WJ}.`)), "hay al menos un punto pegado a una formula");
    }
  });

  test("ningun texto trae voseo ni plural mal (con 1 m/s y con t = 2 y t = 9 las frases siguen siendo ciertas)", () => {
    for (const [h, v0] of [[20, 1], [405, 1], [405, 50]] as const) {
      const t = Math.sqrt(h / 5);
      const d = tiroHorizontal(h, v0).demo;
      const todo = textos(d).join(" | ");
      assert.ok(!/\b1 (veces|segundos|metros)\b/.test(todo), "sin plurales calculados con 1");
      assert.ok(todo.includes(`$${t}\\cdot ${t}=${t * t}$`) && todo.includes(`$${v0}\\cdot ${t}=${v0 * t}$`));
    }
  });

  test("sin signos raros: con todo positivo no aparece ninguna regla de negativos", () => {
    const d = tiroHorizontal(80, 12).demo;
    assert.ok(!textos(d).some((x) => /negativ/.test(x)));
    assert.ok(!d.transiciones.some((t) => t.regla?.includes("(-")));
    // ni cero tachado: ningun paso de este tipo tacha un cero ni una pieza sin unidad (solo el 1 de la caida y las unidades)
    const d0 = tiroHorizontal(20, 1).demo;
    const e = d0.estados.map(aplanar);
    for (const [i, t] of d0.transiciones.entries()) {
      for (const f of t.fusiones.filter((x) => x.modo === "tachar").flatMap((x) => x.desde)) {
        const tex = e[i].find((p) => p.id === f)?.tex ?? "";
        assert.ok(tex === "1" || tex === "\\cdot" || tex.includes("\\text"), `T${i}: tacha ${f} (${tex})`);
      }
    }
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
