import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Demo } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { hallazgosEstilo } from "./estilo.ts";
import { COMPUESTOS, CONOCIDOS, contarAtomos, incognitasPosibles, numeroOxidacion, validarOxidacion } from "./generadores-redox.ts";

// Tabla y conteo PROPIOS del test (no los del generador), para que la cuenta se compruebe de forma independiente.
const CONOCIDO: Record<string, number> = { H: 1, O: -2, K: 1, Na: 1, Mg: 2, Ca: 2, Zn: 2, Al: 3 };
function contar(formula: string): Record<string, number> {
  const c: Record<string, number> = {};
  const re = /([A-Z][a-z]?)(\d*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(formula))) c[m[1]] = (c[m[1]] ?? 0) + (m[2] ? Number(m[2]) : 1);
  return c;
}
/** x tal que la suma de n·N de todos los atomos da 0, o null si no es un entero distinto de 0 */
function esperado(formula: string, elemento: string): number | null {
  const c = contar(formula);
  if (!(elemento in c)) return null;
  let s = 0;
  for (const [e, n] of Object.entries(c)) {
    if (e === elemento) continue;
    if (!(e in CONOCIDO)) return null;
    s += n * CONOCIDO[e];
  }
  if (s === 0 || s % c[elemento] !== 0) return null;
  return -s / c[elemento];
}
const signo = (v: number) => (v < 0 ? `${v}` : `+${v}`);
const buscar = (d: Demo, e: number, id: string) => aplanar(d.estados[e]).find((f) => f.id === id);
const ultimo = (d: Demo) => d.estados.length - 1;
const sinColor = (tex: string) => tex.replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/g, "$1");
const todoTexto = (d: Demo) => d.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");

// Ancho aproximado de una formula $...$ de la leyenda (misma vara gruesa que la de quimica): MathText no la parte de renglon
const ANCHO_FORMULA = 36;
const anchoFormula = (f: string) =>
  f
    .replace(/\\textcolor\{[^}]*\}/g, "")
    .replace(/\\(longleftrightarrow|longrightarrow|rightarrow|Rightarrow|iff)/g, "@@@")
    .replace(/\\(text|mathrm)\{([^}]*)\}/g, "$2")
    .replace(/\\[ ,]/g, " ")
    .replace(/\\[a-zA-Z]+/g, "#")
    .replace(/[{}_^]/g, "").length;

/** comprobaciones comunes a toda animacion de numero de oxidacion */
function comun(d: Demo, etiqueta: string, x: number) {
  revisar(d, etiqueta);
  assert.deepEqual(hallazgosEstilo(d, etiqueta, "movimiento"), [], `${etiqueta}: movimiento (arrastre, etiquetas de a una)`);
  const fin = ultimo(d);
  // la respuesta llega al "?" del enunciado, con su signo
  assert.equal(buscar(d, fin, "qR")?.tex, signo(x), `${etiqueta}: la respuesta del enunciado`);
  assert.equal(buscar(d, fin, "q"), undefined, `${etiqueta}: el signo de pregunta se fue`);
  // la comprobacion cierra en 0 = 0
  assert.equal(buscar(d, fin, "kok")?.tex, "0=0\\ \\checkmark", `${etiqueta}: la comprobacion cierra`);
  // el enunciado (el compuesto y lo que piden) no se mueve
  const enunciado = d.estados[0].map((f) => f.id).filter((id) => id !== "q");
  for (const e of d.estados) for (const id of enunciado) assert.ok(e.some((f) => f.id === id), `${etiqueta}: la pieza ${id} del enunciado se movio`);
  // la etiqueta de la incognita termina siendo el numero hallado
  const etiquetas = aplanar(d.estados[fin]).filter((f) => f.debajo);
  assert.ok(etiquetas.some((f) => sinColor(f.debajo!) === signo(x)), `${etiqueta}: la etiqueta final es ${signo(x)}`);
  // ARRASTRE: lo que viaja nace por brote en su destino
  d.transiciones.forEach((t, i) => {
    for (const f of t.fusiones.filter((f) => f.modo === "viajar")) {
      const destinos = (Array.isArray(f.hacia) ? f.hacia : [f.hacia as string]).filter((h) => !buscar(d, i + 1, h)?.op && !buscar(d, i + 1, h)?.frac);
      for (const h of destinos) assert.ok((t.brotes ?? []).some((b) => b.hacia === h), `${etiqueta}: T${i} la pieza ${h} aparece sin viajar desde su origen`);
    }
  });
  // cada paso dice su porque y su regla; el texto va en tuteo, sin "/" ni "÷", y las formulas de la leyenda caben en un celular
  for (const t of d.transiciones) {
    assert.ok(t.regla && t.regla.includes("$"), `${etiqueta}: paso sin regla: ${t.texto}`);
    for (const s of [t.texto, t.porque, d.intro]) {
      assert.ok(!/\b(podés|tenés|hacé|mirá|fijate|sabés|querés|vos)\b/i.test(s), `${etiqueta}: voseo en "${s}"`);
      assert.ok(!s.replace(/\$[^$]*\$/g, "").includes("/"), `${etiqueta}: barra suelta en "${s}"`);
    }
    for (const s of [t.texto, t.porque, t.regla ?? "", d.intro])
      for (const m of s.matchAll(/\$([^$]+)\$/g))
        if (!m[1].includes("frac")) assert.ok(anchoFormula(m[1]) <= ANCHO_FORMULA, `${etiqueta}: formula larga en la leyenda (${anchoFormula(m[1])}): ${m[1]}`);
  }
}

describe("numero de oxidacion: tablas", () => {
  test("todo compuesto de la tabla se lee, tiene cada elemento una vez y su conteo coincide con el propio", () => {
    for (const f of Object.keys(COMPUESTOS)) {
      const at = contarAtomos(f);
      assert.ok(at, `${f} no se puede leer`);
      assert.deepEqual(Object.fromEntries(at!), contar(f));
      assert.equal(at!.length, Object.keys(contar(f)).length, `${f}: elemento repetido`);
      assert.ok(at!.length >= 2 && at!.length <= 3, `${f}: debe tener 2 o 3 elementos`);
    }
  });
  test("la tabla de numeros conocidos coincide con la propia", () => {
    for (const [e, v] of Object.entries(CONOCIDO)) assert.equal(CONOCIDOS[e].valor, v, e);
    assert.equal(Object.keys(CONOCIDOS).length, Object.keys(CONOCIDO).length);
  });
  test("todo compuesto tiene al menos una incognita valida y el numero es el de la quimica", () => {
    // valores de referencia (libro): el numero de oxidacion del elemento que NO es H, O ni metal conocido
    const REFERENCIA: Record<string, [string, number]> = {
      KMnO4: ["Mn", 7], K2MnO4: ["Mn", 6], MnO2: ["Mn", 4], Mn2O7: ["Mn", 7], K2Cr2O7: ["Cr", 6], K2CrO4: ["Cr", 6], Cr2O3: ["Cr", 3], CrO3: ["Cr", 6],
      H2SO4: ["S", 6], H2SO3: ["S", 4], SO2: ["S", 4], SO3: ["S", 6], Na2SO4: ["S", 6], Na2S2O3: ["S", 2], H2S: ["S", -2],
      HNO3: ["N", 5], HNO2: ["N", 3], NO: ["N", 2], NO2: ["N", 4], N2O: ["N", 1], N2O3: ["N", 3], N2O5: ["N", 5], NH3: ["N", -3],
      H3PO4: ["P", 5], P2O5: ["P", 5], HClO: ["Cl", 1], HClO3: ["Cl", 5], HClO4: ["Cl", 7], KClO3: ["Cl", 5], KClO4: ["Cl", 7], NaClO: ["Cl", 1], HCl: ["Cl", -1], NaCl: ["Cl", -1],
      CO: ["C", 2], CO2: ["C", 4], CH4: ["C", -4], CaCO3: ["C", 4], Na2CO3: ["C", 4], FeO: ["Fe", 2], Fe2O3: ["Fe", 3], CuO: ["Cu", 2], Cu2O: ["Cu", 1],
    };
    assert.deepEqual(Object.keys(REFERENCIA).sort(), Object.keys(COMPUESTOS).sort(), "la tabla de referencia cubre exactamente los compuestos");
    for (const [f, [e, v]] of Object.entries(REFERENCIA)) {
      assert.equal(validarOxidacion(f, e), null, `${f} ${e}`);
      assert.equal(esperado(f, e), v, `${f}: el calculo propio coincide con el libro`);
      assert.ok(incognitasPosibles(f).includes(e));
    }
  });
});

describe("numero de oxidacion: animacion", () => {
  test("toda combinacion permitida: revisar, cuenta exacta contra el calculo propio y comprobacion en 0", () => {
    let casos = 0;
    for (const f of Object.keys(COMPUESTOS)) {
      for (const e of Object.keys(contar(f))) {
        const x = esperado(f, e);
        // el validador acepta exactamente lo que el calculo propio acepta
        assert.equal(validarOxidacion(f, e) === null, x !== null, `${f} ${e}: el validador y el calculo propio no coinciden`);
        if (x === null) continue;
        const r = numeroOxidacion(f, e);
        assert.equal(r.resumen.x, x, `${f} ${e}: x`);
        assert.equal(r.resumen.nx * x + r.resumen.suma, 0, `${f} ${e}: nx * x + suma de los conocidos = 0`);
        comun(r.demo, `${f} -> ${e}`, x);
        casos++;
      }
    }
    assert.ok(casos >= 41, `solo ${casos} casos`);
  });

  test("KMnO4, Mn: x sale de 1 + x - 8 = 0, los numeros sueltos se suman (con x en el medio) y el 7 viaja al signo de pregunta", () => {
    const r = numeroOxidacion("KMnO4", "Mn");
    comun(r.demo, "KMnO4", 7);
    const todo = todoTexto(r.demo);
    for (const pista of ["neutro", "grupo 1", "$-2$", "lo llamamos $x$", "Escribimos $1$", "$4\\cdot(-2)$", "$4\\cdot (-2)=-8$", "lo pasamos al principio", "$1+(-8)=-7$", "cambia de signo", "$0+7=7$", "Respuesta", "Comprobamos", "Escribimos $7$", "$1+7=8$", "$8+(-8)=0$"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    // con un solo atomo no hay un paso de «1·algo»: ni 1·x tachado ni 1·(+1) ni 1·7
    assert.ok(!/\$1\\cdot /.test(todo), "no hay pasos vacios de multiplicar por 1");
    assert.ok(!todo.includes("se tacha"), "no hay un 1 que tachar");
    // la comprobacion arma un termino por paso, no los tres de golpe
    const brotesComprob = r.demo.transiciones.filter((x) => x.texto.startsWith("Comprobamos") || x.texto.startsWith("Seguimos con")).length;
    assert.ok(brotesComprob >= 3, "un termino por paso en la comprobacion");
    // el -7 viaja como el mismo objeto (id cz) al otro lado
    const t = r.demo.transiciones.find((t) => t.texto.startsWith("Queremos dejar"))!;
    assert.equal(t.fusiones[0].modo, "viajar");
    assert.ok(t.fusiones[0].desde.length === 2 && t.brotes!.length === 2);
  });

  test("K2Cr2O7, Cr: 2 + 2x - 14 = 0 se despeja dividiendo: el 2 viaja debajo del 12", () => {
    const r = numeroOxidacion("K2Cr2O7", "Cr");
    comun(r.demo, "K2Cr2O7", 6);
    const todo = todoTexto(r.demo);
    for (const pista of ["$2\\cdot (+1)=2$", "$7\\cdot (-2)=-14$", "$2+(-14)=-12$", "$0+12=12$", "viaja hasta debajo del $12$", "\\dfrac{12}{2}=6"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
    assert.ok(!todo.includes("se tacha"), "con 2 atomos no se tacha el 1");
    const t = r.demo.transiciones.find((t) => t.texto.includes("viaja hasta debajo"))!;
    assert.deepEqual(t.fusiones[0].desde.sort(), ["R", "xd", "xn"].sort());
    assert.deepEqual(t.brotes!.map((b) => `${b.desde}>${b.hacia}`).sort(), ["R>fr.n", "xn>fr.d"]);
  });

  test("NH3, N: resultado negativo, x primero, el 3 queda del lado derecho con su signo", () => {
    const r = numeroOxidacion("NH3", "N");
    comun(r.demo, "NH3", -3);
    const todo = todoTexto(r.demo);
    for (const pista of ["$3\\cdot (+1)=3$", "$0+(-3)=-3$", "Pasamos el $3$", "$(-3)+3=0$"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
  });

  test("N2O, N: 2x - 2 = 0, el coeficiente 2 viaja y 2 entre 2 da 1", () => {
    const r = numeroOxidacion("N2O", "N");
    comun(r.demo, "N2O", 1);
    assert.ok(todoTexto(r.demo).includes("\\dfrac{2}{2}=1"));
  });

  test("Na2S2O3, S: tres elementos, subindices 2 y 3, el 2 del Na y el -6 del O se suman con 2x en el medio", () => {
    const r = numeroOxidacion("Na2S2O3", "S");
    comun(r.demo, "Na2S2O3", 2);
    const todo = todoTexto(r.demo);
    for (const pista of ["$2\\cdot (+1)=2$", "$3\\cdot (-2)=-6$", "$2+(-6)=-4$", "\\dfrac{4}{2}=2"]) assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
  });

  test("ningun paso repite el `porque` del paso anterior (en toda combinacion permitida)", () => {
    for (const c of Object.keys(COMPUESTOS)) {
      for (const e of incognitasPosibles(c)) {
        const t = numeroOxidacion(c, e).demo.transiciones;
        for (let i = 1; i < t.length; i++) assert.notEqual(t[i].porque, t[i - 1].porque, `${c}/${e}: T${i - 1} y T${i} con el mismo porque: ${t[i].porque}`);
      }
    }
  });

  test("los compuestos cuyos atomos repetidos NO valen lo mismo avisan que el numero es un promedio", () => {
    for (const [c, e] of [["Na2S2O3", "S"], ["N2O", "N"], ["N2O3", "N"]] as const) {
      const todo = todoTexto(numeroOxidacion(c, e).demo);
      assert.ok(todo.includes("es el promedio") && todo.includes("como si valieran lo mismo"), `${c}: falta el aviso del promedio`);
    }
    // y los que si valen lo mismo no lo dicen
    assert.ok(!todoTexto(numeroOxidacion("K2Cr2O7", "Cr").demo).includes("promedio"));
  });

  test("HCl, Cl: solo dos elementos, no hay nada que juntar y el resultado es -1", () => {
    const r = numeroOxidacion("HCl", "Cl");
    comun(r.demo, "HCl", -1);
    assert.ok(!todoTexto(r.demo).includes("Marcamos los números sueltos"));
  });

  test("las etiquetas se ponen de una en una y las conocidas llevan color", () => {
    const r = numeroOxidacion("HClO4", "Cl");
    const conEtiqueta = r.demo.estados.map((e) => aplanar(e).filter((f) => f.debajo).length);
    for (let i = 1; i < conEtiqueta.length; i++) assert.ok(conEtiqueta[i] - conEtiqueta[i - 1] <= 1, `T${i - 1}: mas de una etiqueta nueva`);
    assert.equal(Math.max(...conEtiqueta), 3);
    assert.ok(aplanar(r.demo.estados[ultimo(r.demo)]).every((f) => !f.debajo || f.debajo.includes("\\textcolor")), "todas con color");
  });

  test("LaTeX con doble barra: ningun texto trae una orden sin su barra", () => {
    const r = numeroOxidacion("K2Cr2O7", "Cr");
    for (const t of r.demo.transiciones) {
      for (const s of [t.texto, t.porque, t.regla ?? ""]) assert.ok(!/(^|[^\\a-zA-Z])(cdot|dfrac|frac|text|mathrm|Rightarrow|checkmark)\b/.test(s), `orden sin barra en: ${s}`);
    }
    assert.ok(r.demo.transiciones.some((t) => t.texto.includes("\\cdot")));
  });
});

describe("numero de oxidacion: validador", () => {
  test("fuera de la tabla el validador avisa", () => {
    assert.ok(validarOxidacion("XYZ", "X"));
    assert.ok(validarOxidacion("H2O2", "O"), "el peroxido no esta soportado");
    assert.ok(validarOxidacion("KMnO4", "Cr"), "el KMnO4 no tiene Cr");
    assert.ok(validarOxidacion("KMnO4", "K"), "buscar el K deja el Mn sin conocer: dos incognitas");
    assert.ok(validarOxidacion("KMnO4", "O"), "buscar el O deja el Mn sin conocer");
    assert.ok(validarOxidacion("HCl", "H"), "buscar el H deja el Cl sin conocer");
    assert.equal(validarOxidacion("KMnO4", "Mn"), null);
    assert.equal(validarOxidacion("NaClO", "Cl"), null);
  });
  test("incognitasPosibles lista solo los elementos que se pueden hallar", () => {
    assert.deepEqual(incognitasPosibles("KMnO4"), ["Mn"]);
    assert.deepEqual(incognitasPosibles("H2SO4"), ["S"]);
    assert.deepEqual(incognitasPosibles("NaCl"), ["Cl"]);
  });
  test("el mensaje del validador va en tuteo", () => {
    for (const m of [validarOxidacion("KMnO4", "K"), validarOxidacion("KMnO4", "Cr"), validarOxidacion("XYZ", "X")]) {
      assert.ok(m && !/\b(elegí|probá|podés|vos)\b/i.test(m));
    }
  });
});
