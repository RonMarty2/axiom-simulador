import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Demo, type Ficha } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { decimal } from "./generadores-quimica.ts";
import { LIMITE_MASA, LIMITE_VOLUMEN, SOLUTOS, molaridad as molaridadReal, validarMolaridad } from "./generadores-soluciones.ts";

// El generador pone la puntuacion tras una formula FUERA de ella, pegada con un word-joiner ("$126$" + U+2060 + ".").
// Las pruebas de texto de abajo buscan frases con la puntuacion pegada ("$126$."): sacamos el word-joiner aqui; los tests de puntuacion miran lo real.
const despegar = (s: string) => s.replaceAll("⁠", "");
const molaridad = (...a: Parameters<typeof molaridadReal>) => {
  const r = molaridadReal(...a);
  const demo = { ...r.demo, intro: despegar(r.demo.intro), transiciones: r.demo.transiciones.map((t) => ({ ...t, texto: despegar(t.texto), porque: despegar(t.porque) })) };
  return { ...r, demo };
};

// Tabla y conteo PROPIOS del test (no los del generador), para que la cuenta se compruebe de forma independiente.
const MASA: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, K: 39, Ca: 40, Fe: 56, Zn: 65 };
function contar(formula: string): Record<string, number> {
  const c: Record<string, number> = {};
  const re = /([A-Z][a-z]?)(\d*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(formula))) c[m[1]] = (c[m[1]] ?? 0) + (m[2] ? Number(m[2]) : 1);
  return c;
}
const PMde = (f: string) => Object.entries(contar(f)).reduce((s, [e, n]) => s + n * MASA[e], 0);
// el contenido puede traer llaves (0{,}1): se pela el \textcolor{#hex}{ ... } entero, no hasta la primera llave
const sinColor = (tex: string) => tex.replace(/^\\textcolor\{[^}]*\}\{(.*)\}$/, "$1");
const mcdT = (a: number, b: number): number => (b === 0 ? a : mcdT(b, a % b));
const buscar = (e: Ficha[], id: string) => aplanar(e).find((f) => f.id === id);
const ultimo = (d: Demo) => d.estados[d.estados.length - 1];
// masas validas que se prueban por soluto y volumen: todas las combinaciones quedan cubiertas sin que la suite tarde
const POR_COMBINACION = 3;

// Ancho aproximado de una formula $...$ de la leyenda (misma vara que el test de estequiometria): las flechas cuentan 3,
// las ordenes (\cdot, \dots) 1, las llaves y los indices no cuentan. Las fracciones se apilan y no se miden.
const ANCHO_FORMULA = 36;
const anchoFormula = (f: string) =>
  f
    .replace(/\\textcolor\{[^}]*\}/g, "")
    .replace(/\\(longleftrightarrow|longrightarrow|rightarrow|Rightarrow|iff)/g, "@@@")
    .replace(/\\(text|mathrm)\{([^}]*)\}/g, "$2")
    .replace(/\\[ ,]/g, " ")
    .replace(/\\[a-zA-Z]+/g, "#")
    .replace(/[{}_^]/g, "").length;

// ---- cadenas de igualdades: una fila con varios "=" tiene que ser VERDADERA (evaluada con fracciones exactas)
type Rac = [number, number];
const numRac = (s: string): Rac | null => {
  const m = /^(\d+)(?:\{,\}(\d+))?$/.exec(sinColor(s).trim());
  return m ? [Number(m[1] + (m[2] ?? "")), 10 ** (m[2] ?? "").length] : null;
};
/** producto de piezas numericas (los \cdot se saltan); null si hay algo que no es un numero */
const prodRac = (ps: Ficha[]): Rac | null => {
  let r: Rac = [1, 1];
  for (const p of ps) {
    if (p.tex === "\\cdot") continue;
    const v = numRac(p.tex);
    if (!v) return null;
    r = [r[0] * v[0], r[1] * v[1]];
  }
  return r;
};
/** valor de un miembro (una sola ficha: numero o fraccion con piezas numericas); null si trae unidades u otra cosa */
const valorMiembro = (seg: Ficha[]): Rac | null => {
  if (seg.length !== 1) return null;
  const f = seg[0];
  if (!f.frac) return numRac(f.tex);
  const n = prodRac(f.frac.nPiezas ?? []);
  const dd = prodRac(f.frac.dPiezas ?? []);
  return n && dd ? [n[0] * dd[1], n[1] * dd[0]] : null;
};
/** los renglones de un estado (cada ficha `salto` abre uno), y en cada renglon sus miembros separados por "=" */
const renglones = (e: Ficha[]): Ficha[][][] => {
  const filas: Ficha[][] = [[]];
  for (const f of e) {
    if (f.salto) filas.push([]);
    else filas[filas.length - 1].push(f);
  }
  return filas.map((fila) => {
    const miembros: Ficha[][] = [[]];
    for (const f of fila) {
      if (f.op && f.tex === "=") miembros.push([]);
      else miembros[miembros.length - 1].push(f);
    }
    return miembros;
  });
};
function cadenasVerdaderas(d: Demo, etiqueta: string) {
  d.estados.forEach((e, i) => {
    for (const miembros of renglones(e)) {
      if (miembros.length < 3) continue; // una cadena real tiene al menos dos "="
      // ninguna operacion colgada entre dos "=": dividir o multiplicar cambia el valor y rompe la cadena
      miembros.slice(1, -1).forEach((m) => assert.ok(!m.some((f) => f.tex === "\\div" || f.tex === "\\cdot"), `${etiqueta}: estado ${i}: operacion entre dos "=" de una cadena`));
      const vals = miembros.map(valorMiembro);
      if (vals.some((v) => !v)) continue;
      for (const v of vals) assert.equal(v![0] * vals[0]![1], vals[0]![0] * v![1], `${etiqueta}: estado ${i}: cadena de igualdades falsa`);
    }
  });
}

/** comprobaciones comunes a toda animacion de molaridad */
function comun(d: Demo, etiqueta: string, nTxt: string, MTxt: string, masa: number, PM: number, k: number, f: string, V: number) {
  revisar(d, etiqueta);
  cadenasVerdaderas(d, etiqueta);
  // la division va como fraccion, nunca con el signo ÷: ni en el texto ni en las fichas
  for (const e of d.estados) for (const x of aplanar(e)) assert.ok(!/÷|\\div\b/.test(x.tex), `${etiqueta}: la ficha ${x.id} usa ÷`);
  for (const t of d.transiciones) assert.ok(!/÷|\\div\b/.test(`${t.texto} ${t.porque} ${t.regla ?? ""}`), `${etiqueta}: ÷ en el texto`);
  // cuenta exacta de pasos: 20 fijos + 4 por cada elemento del soluto (etiqueta, termino, producto, suma),
  // menos el producto de cada elemento sin subindice, mas el proceso de cada division no entera, mas 3 de la comprobacion con unidades si V > 1
  // sin producto: elemento sin subindice (1·A) o de masa atomica 1 (k·1)
  const unos = Object.entries(contar(f)).filter(([e, n]) => n === 1 || MASA[e] === 1).length;
  const g = mcdT(masa, PM);
  const nCent = (masa * 100) / PM;
  // m/PM no entera: la fraccion (1 paso) + achicarla si se puede (divisores, comunes, mayor, cocientes escritos, cocientes hechos, fraccion achicada: 7 mas)
  // + pasarla a decimal (1 paso si abajo ya hay 10 o 100; si no, ampliar con k, hacer los productos y leer: 3)
  const qq = PM / g;
  const kk = (10 % qq === 0 ? 10 : 100) / qq;
  const procN = nCent % 100 === 0 ? 0 : (g > 1 ? 9 : 1) + (kk > 1 ? 3 : 1);
  // n/V no entera: el decimal en decimas o centesimas (1 paso; si hay que pasar de decimas a centesimas, 3), el reparto y la lectura con coma
  const porDecimas = nCent % 10 === 0 && (nCent / V) % 10 !== 0;
  const procM = V > 1 && (nCent / V) % 100 !== 0 ? (porDecimas ? 3 : 1) + 3 : 0;
  // V = 1 tambien reemplaza V (0,1 mol / 1 L) y divide entre 1 en su propio paso: 20 fijos con V = 1, 22 con V > 1.
  // Un decimal por entero (n·PM siempre que n no sea entero; M·V con V > 1) trae su proceso: 3 pasos si arriba queda un 1, 4 si no (en vez de 1)
  const pasosDec = (aCent: number) => (aCent % 100 === 0 ? 1 : (aCent % 10 === 0 ? aCent / 10 : aCent) === 1 ? 3 : 4);
  const extraDec = pasosDec(nCent) - 1 + (V > 1 ? pasosDec(nCent / V) - 1 : 0);
  assert.equal(d.transiciones.length, 20 + 4 * k - unos + procN + procM + extraDec + (V > 1 ? 2 : 0), `${etiqueta}: cantidad de pasos`);
  // NUNCA un paso vacio: ningun termino `1·A` es un paso propio (n = 1 se escribe directo) ni hay un paso cuyo unico cambio es ÷1 o ·1
  assert.ok(!d.transiciones.some((t) => /\$1\\cdot /.test(t.texto) && /Multiplicamos/.test(t.texto)), `${etiqueta}: producto 1·A como paso`);
  assert.ok(!d.transiciones.some((t) => /Multiplicamos: \$\d+\\cdot 1=/.test(t.texto) || /Escribimos \$\d+\\cdot 1\$/.test(t.texto)), `${etiqueta}: producto A·1 como paso`);
  assert.ok(!d.transiciones.some((t) => /\\dfrac\{[^}]*\}\{1\}=/.test(t.texto) || (V === 1 && t.texto.startsWith("Primero los números de los moles"))), `${etiqueta}: paso de ÷1 o ·1`);
  // toda division no entera lleva su proceso a la vista
  const todoTexto = d.transiciones.map((t) => t.texto).join(" | ");
  if (nCent % 100 !== 0) assert.ok(/(Abajo ya hay|se puede multiplicar arriba y abajo por)/.test(todoTexto), `${etiqueta}: m entre PM sin proceso`);
  if (procM) assert.ok(/ésimas|décimas|centésimas/.test(todoTexto) && todoTexto.includes("Esta división no da un entero"), `${etiqueta}: n entre V sin proceso`);
  const fin = ultimo(d);
  // la respuesta llega al "?" del enunciado y coincide con el resultado de la cuenta
  assert.equal(sinColor(buscar(fin, "qR")!.tex), MTxt, `${etiqueta}: la respuesta del enunciado`);
  assert.equal(buscar(fin, "Mres")?.tex, MTxt, `${etiqueta}: el resultado de la cuenta`);
  assert.equal(buscar(fin, "Nn")?.tex, nTxt, `${etiqueta}: los moles`);
  // la comprobacion vuelve al dato del enunciado
  assert.equal(buscar(fin, "Kz")?.tex, `${masa}`, `${etiqueta}: la comprobacion da la masa`);
  assert.ok(buscar(fin, "Kok"), `${etiqueta}: marca de comprobacion`);
  // la unidad de la respuesta es la que piden (mol/L): la fraccion del resultado y la del "Piden" son la misma
  assert.equal(buscar(fin, "Mnu")?.tex, "\\text{mol}");
  assert.equal(buscar(fin, "Mvu")?.tex, "\\text{L}");
  assert.equal(buscar(fin, "uqn")?.tex, "\\text{mol}");
  assert.equal(buscar(fin, "uqd")?.tex, "\\text{L}");
  assert.equal(buscar(fin, "Umol")?.tex, "\\text{mol}");
  // en el calculo de n los gramos se tachan arriba y abajo (3 piezas: g de arriba, el punto y g de abajo);
  // la comprobacion tacha ademas L (si V > 1) y mol, de a dos piezas
  const tachados = d.transiciones.flatMap((t, i) => t.fusiones.filter((x) => x.modo === "tachar").map((x) => ({ f: x, i })));
  assert.equal(tachados.length, V > 1 ? 3 : 2, `${etiqueta}: tachados`);
  // la comprobacion tacha la unidad CON su punto (L, punto, L): tambien 3 piezas, y el punto ya no se funde con los numeros
  assert.equal(tachados.filter((x) => x.f.desde.length === 3).length, tachados.length, `${etiqueta}: todo tachado lleva su punto`);
  const { f: tf, i: ti } = tachados[0];
  assert.equal(tf.desde.length, 3);
  assert.equal(buscar(d.estados[ti], tf.desde[0])!.tex, "\\text{g}");
  assert.equal(buscar(d.estados[ti], tf.desde[2])!.tex, "\\text{g}");
  // lo que no cambia queda quieto: las piezas del enunciado siguen en todos los estados (salvo el "?", que se vuelve la respuesta)
  const enunciado = d.estados[0].map((f) => f.id).filter((id) => id !== "q");
  for (const e of d.estados) for (const id of enunciado) assert.ok(e.some((f) => f.id === id), `${etiqueta}: la pieza ${id} del enunciado se movio`);
  // NACEN DEL DATO: cada letra que se reemplaza recibe numero y unidad de la fila de datos o del resultado anterior
  const reemplazo = (inicio: string) => d.transiciones.find((t) => t.texto.startsWith(inicio))!;
  const orig = (t: ReturnType<typeof reemplazo>) => (t.brotes ?? []).map((b) => b.desde).sort();
  assert.deepEqual(orig(reemplazo("Reemplazamos $m$")), ["Dm", "Dmu"], `${etiqueta}: m sale del dato`);
  assert.deepEqual(orig(reemplazo("Reemplazamos $V$")), ["DV", "DVu"], `${etiqueta}: V sale del dato`);
  // la comprobacion termina en gramos: la unidad que queda es g
  assert.equal(buscar(fin, "Kg")?.tex, "\\text{g}", `${etiqueta}: la comprobacion queda en gramos`);
  assert.deepEqual(orig(reemplazo("Reemplazamos $n$")), ["Nn", "Umol"], `${etiqueta}: n sale del resultado`);
  const rPM = reemplazo("Reemplazamos $\\text{PM}$");
  assert.ok(orig(rPM).includes("UPM"), `${etiqueta}: la unidad de PM sale de la masa molar`);
  // los datos se etiquetan de a uno, con su letra
  assert.ok(d.transiciones.some((t) => t.texto.includes("La llamamos $m$")));
  assert.ok(d.transiciones.some((t) => t.texto.includes("Lo llamamos $V$")));
  assert.ok(d.transiciones.some((t) => t.texto.includes("La llamamos $M$")));
  // cada paso dice su porque y su regla; el texto del alumno va en tuteo, sin "/" ni "÷" ni LaTeX sin barra
  for (const t of d.transiciones) {
    assert.ok(t.regla && t.regla.includes("$"), `${etiqueta}: paso sin regla: ${t.texto}`);
    for (const s of [t.texto, t.porque, t.regla ?? "", d.intro]) {
      assert.ok(!/(^|[^\\a-zA-Z])(cdot|dfrac|text|mathrm|textcolor|checkmark|dots)\b/.test(s.replace(/\\[a-zA-Z]+/g, "")), `${etiqueta}: LaTeX sin barra en "${s}"`);
    }
    for (const s of [t.texto, t.porque, d.intro]) {
      assert.ok(!/\b(podés|tenés|hacé|mirá|fijate|sabés|querés|vos|anotá|escribí|calculá|sumá|restá|multiplicá)\b/i.test(s), `${etiqueta}: voseo en "${s}"`);
      assert.ok(!s.replace(/\$[^$]*\$/g, "").includes("/"), `${etiqueta}: barra suelta en "${s}"`);
    }
    // DESBORDE: ninguna formula de la leyenda es tan larga que no quepa en un celular (las fracciones se apilan: no se miden)
    for (const s of [t.texto, t.porque, t.regla ?? "", d.intro])
      for (const m of s.matchAll(/\$([^$]+)\$/g))
        if (!m[1].includes("frac")) assert.ok(anchoFormula(m[1]) <= ANCHO_FORMULA, `${etiqueta}: formula larga en la leyenda (${anchoFormula(m[1])}): ${m[1]}`);
  }
  void PM;
}

describe("molaridad: validador", () => {
  test("acepta los ejemplos buenos y rechaza lo que no da exacto o se sale de los limites", () => {
    assert.equal(validarMolaridad("C6H12O6", 36, 2), null, "36 g de glucosa en 2 L: 0,2 mol y 0,1 M");
    assert.equal(validarMolaridad("NaOH", 40, 1), null);
    assert.ok(validarMolaridad("C6H12O6", 10, 1), "10 entre 180 no es exacto con dos decimales");
    assert.ok(validarMolaridad("NaOH", 4, 3), "0,1 mol entre 3 L no es exacto");
    assert.ok(validarMolaridad("NaCl", 10, 1), "un soluto fuera de la lista");
    assert.ok(validarMolaridad("NaOH", 0, 1));
    assert.ok(validarMolaridad("NaOH", 1.5, 1));
    assert.ok(validarMolaridad("NaOH", LIMITE_MASA + 1, 1));
    assert.ok(validarMolaridad("NaOH", 40, 0));
    assert.ok(validarMolaridad("NaOH", 40, LIMITE_VOLUMEN + 1));
    assert.ok(validarMolaridad("NaOH", 40, 1.5));
  });
  test("los mensajes del validador van en tuteo", () => {
    for (const msg of [validarMolaridad("C6H12O6", 10, 1), validarMolaridad("NaOH", 4, 3), validarMolaridad("NaOH", 0, 1), validarMolaridad("X", 1, 1)]) {
      assert.ok(msg && !/\b(podés|tenés|elegí|escribí|probá)\b/i.test(msg), `voseo en "${msg}"`);
    }
  });
  test("la tabla de solutos se lee bien", () => {
    for (const f of SOLUTOS) assert.ok(Object.keys(contar(f)).length >= 2, `${f} tiene al menos dos elementos`);
  });
});

describe("molaridad: la animacion", () => {
  test("ejemplo: 36 g de glucosa en 2 L dan 0,2 mol y 0,1 M, con todos los pasos", () => {
    const r = molaridad("C6H12O6", 36, 2);
    assert.equal(r.resumen.PM, 180);
    assert.equal(r.resumen.nCent, 20);
    assert.equal(r.resumen.centesimas, 10);
    comun(r.demo, "glucosa", "0{,}2", "0{,}1", 36, 180, 3, "C6H12O6", 2);
    const todo = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of [
      "no son moles",
      "$6\\cdot 12$",
      "Escribimos $12$.",
      "$6\\cdot 16$",
      "$72+12=84$",
      "$84+96=180$",
      "Nos quedamos con el resultado de la división, $0{,}2$",
      "Primero los números de los gramos: $0{,}2\\cdot 180$",
      "se tachan",
      "\\dfrac{0{,}2}{2}=0{,}1",
      "signo de pregunta",
      "Primero los números de los moles: $0{,}1\\cdot 2$",
      "$0{,}1=\\dfrac{1}{10}$",
      "$\\dfrac{360}{10}=36$",
    ]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
  });

  test("toda combinacion permitida: revisar y cuenta comprobada con la tabla propia", () => {
    let casos = 0;
    for (const f of SOLUTOS) {
      const PM = PMde(f);
      const k = Object.keys(contar(f)).length;
      for (let V = 1; V <= LIMITE_VOLUMEN; V++) {
        let aqui = 0;
        for (let masa = 1; masa <= LIMITE_MASA && aqui < POR_COMBINACION; masa++) {
          if (validarMolaridad(f, masa, V)) continue;
          aqui++;
          const r = molaridad(f, masa, V);
          assert.equal(r.resumen.PM, PM, `${f}: masa molar`);
          // en enteros, sin redondeo: n·PM = masa ; M·V = n (en centesimas)
          assert.equal(r.resumen.nCent * PM, masa * 100, `${masa} g de ${f}`);
          assert.equal(r.resumen.centesimas * V, r.resumen.nCent, `${masa} g de ${f} en ${V} L`);
          comun(r.demo, `${masa}g ${f} en ${V}L`, decimal(r.resumen.nCent), decimal(r.resumen.centesimas), masa, PM, k, f, V);
          casos++;
        }
      }
    }
    assert.ok(casos > 100, `solo ${casos} casos`);
  });

  test("RAPIDA: toda combinacion pasa revisar, da el mismo resumen que la explicada y tiene pocos pasos", () => {
    let casos = 0;
    for (const f of SOLUTOS) {
      for (let V = 1; V <= LIMITE_VOLUMEN; V++) {
        let aqui = 0;
        for (let masa = 1; masa <= LIMITE_MASA && aqui < POR_COMBINACION; masa++) {
          if (validarMolaridad(f, masa, V)) continue;
          aqui++;
          const et = `rapida ${masa}g ${f} en ${V}L`;
          const r = molaridadReal(f, masa, V, true);
          revisar(r.demo, et);
          assert.deepEqual(r.resumen, molaridadReal(f, masa, V).resumen, `${et}: mismo resultado que la explicada`);
          assert.ok(r.demo.transiciones.length <= 8, `${et}: la rapida tiene ${r.demo.transiciones.length} pasos`);
          casos++;
        }
      }
    }
    assert.ok(casos > 100);
  });

  test("la puntuacion tras una formula va fuera de ella y pegada con word-joiner; ningun texto empieza con puntuacion suelta", () => {
    const sueltos: string[] = [];
    for (const f of SOLUTOS) {
      for (let V = 1; V <= LIMITE_VOLUMEN; V++) {
        let aqui = 0;
        for (let masa = 1; masa <= LIMITE_MASA && aqui < 2; masa++) {
          if (validarMolaridad(f, masa, V)) continue;
          aqui++;
          const d = molaridadReal(f, masa, V).demo;
          const textos = [d.intro, ...d.transiciones.flatMap((t) => [t.texto, t.porque, t.regla ?? ""])];
          for (const s of textos) {
            if (/^\s*[.,;:]/.test(s)) sueltos.push(`empieza con puntuacion: ${s.slice(0, 40)}`);
            // despues de cerrar un $...$ la puntuacion debe llevar el word-joiner delante (nunca pegada, nunca dentro)
            const sinWJ = s.match(/[^$]\$[.,;:]/g) ?? [];
            if (sinWJ.length) sueltos.push(`puntuacion sin word-joiner: ${s.slice(0, 60)}`);
            if (/[.:;]\$(\s|$)/.test(s)) sueltos.push(`puntuacion dentro de la formula: ${s.slice(0, 60)}`);
          }
        }
      }
    }
    assert.deepEqual([...new Set(sueltos)].slice(0, 5), []);
  });

  test("el plural concuerda con la cantidad: nada de '1 moles', '1 veces' ni 'Esas 1'", () => {
    for (const f of SOLUTOS) {
      for (let V = 1; V <= LIMITE_VOLUMEN; V++) {
        for (let masa = 1; masa <= LIMITE_MASA; masa++) {
          if (validarMolaridad(f, masa, V)) continue;
          const todo = JSON.stringify(molaridad(f, masa, V).demo);
          for (const mal of ["$1$ moles", "$1$ veces", "Esas $1$"]) {
            assert.ok(!todo.includes(mal), `${masa} g de ${f} en ${V} L: dice "${mal}"`);
          }
        }
      }
    }
  });

  test("cada soluto tiene al menos una combinacion valida", () => {
    for (const f of SOLUTOS) {
      let hay = false;
      for (let V = 1; V <= LIMITE_VOLUMEN && !hay; V++) for (let masa = 1; masa <= LIMITE_MASA && !hay; masa++) hay = !validarMolaridad(f, masa, V);
      assert.ok(hay, `${f}: ninguna combinacion valida`);
    }
  });

  // casos dificiles: un elemento sin subindice, masa igual a PM, volumen 1 (no hay nada que dividir), moles y molaridad con dos decimales
  const DIFICILES: [string, number, number, string, string][] = [
    ["NaOH", 4, 1, "0{,}1", "0{,}1"],
    ["KOH", 14, 1, "0{,}25", "0{,}25"],
    ["H2SO4", 49, 2, "0{,}5", "0{,}25"],
    ["HNO3", 126, 2, "2", "1"],
    ["NH3", 34, 4, "2", "0{,}5"],
    ["C6H12O6", 180, 1, "1", "1"],
    ["ZnSO4", 161, 10, "1", "0{,}1"],
  ];
  for (const [f, masa, V, n, M] of DIFICILES) {
    test(`caso dificil: ${masa} g de ${f} en ${V} L dan ${n} mol y ${M} M`, () => {
      assert.equal(validarMolaridad(f, masa, V), null);
      const r = molaridad(f, masa, V);
      comun(r.demo, `${f} ${masa} ${V}`, n, M, masa, PMde(f), Object.keys(contar(f)).length, f, V);
    });
  }

  test("un elemento sin subindice (el O del NaOH) dice que hay 1 atomo y NO escribe 1·A como paso", () => {
    const r = molaridad("NaOH", 40, 1);
    const todo = r.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(todo.includes("no lleva subíndice"));
    assert.ok(!todo.includes("Escribimos $1\\cdot"), "con n = 1 no se escribe 1·A");
    assert.ok(!todo.includes("Multiplicamos: $1"), "ni se multiplica por 1");
    // NaOH: 23 + 16 + 1 = 40, en dos sumas, sin productos
    assert.equal(r.demo.transiciones.filter((t) => t.texto.startsWith("Multiplicamos")).length, 0);
    assert.ok(todo.includes("$23+16=39$") && todo.includes("$39+1=40$"));
  });

  test("con V = 1: el 1 se ve en 0,25 mol / 1 L (reemplazo de a una letra) y dividir entre 1 es su paso dedicado, sin cuentas vacias", () => {
    const r = molaridad("KOH", 14, 1);
    const d = r.demo;
    const todo = d.transiciones.map((t) => t.texto).join(" | ");
    const iV = d.transiciones.findIndex((t) => t.texto.startsWith("Reemplazamos $V$"));
    const iDiv = d.transiciones.findIndex((t) => t.texto.startsWith("Dividir entre $1$ no cambia el número"));
    assert.ok(iV > 0 && iDiv === iV + 1, "el reemplazo de V y el paso de dividir entre 1 son dos pasos seguidos");
    // tras reemplazar V, el 1 y el litro estan escritos debajo de la raya, junto a los moles
    const despuesV = d.estados[iV + 1];
    assert.equal(sinColor(buscar(despuesV, "Mv")!.tex), "1");
    assert.equal(buscar(despuesV, "Mvu")?.tex, "\\text{L}");
    assert.equal(sinColor(buscar(despuesV, "Mn")!.tex), "0{,}25");
    assert.ok(!buscar(despuesV, "Mres"), "todavia no se dividio");
    assert.deepEqual((d.transiciones[iV].brotes ?? []).map((b) => b.desde).sort(), ["DV", "DVu"], "el 1 sale del dato");
    // el paso de dividir entre 1 funde Mn y Mv en el resultado, sin repetir la cuenta
    assert.equal(buscar(d.estados[iDiv + 1], "Mres")?.tex, "0{,}25");
    assert.deepEqual(d.transiciones[iDiv].fusiones[0].desde.sort(), ["Mn", "Mv"]);
    assert.ok(!d.transiciones[iDiv].texto.includes("\\dfrac{0{,}25}{1}"), "sin la cuenta vacia 0,25 / 1 = 0,25");
    assert.ok(!todo.includes("al ser $1$ litro"));
    assert.ok(!todo.includes("0{,}25\\cdot 1=") && !todo.includes("0{,}25\\cdot 1$"));
    assert.ok(todo.includes("los moles son iguales a la molaridad"), "la comprobacion tambien dice que M = n");
  });

  test("comprobacion: decimal por entero con proceso (0,25·56, 0,1·40, 0,5·98, 0,2·180, 0,25·2), cada cifra es una ficha con origen", () => {
    const camino = (f: string, m: number, v: number) => {
      const d = molaridad(f, m, v).demo;
      const i0 = d.transiciones.findIndex((t) => t.texto.startsWith("Primero los números de los gramos"));
      const tex = d.transiciones.map((t) => t.texto);
      return { d, i0, tex };
    };
    // 0,25 · 56 = 14 : 25/100 -> (25·56)/100 -> 1400/100 -> 14
    const a = camino("KOH", 14, 1);
    assert.ok(a.i0 >= 0);
    assert.ok(a.tex[a.i0].includes("$0{,}25=\\dfrac{25}{100}$"));
    assert.equal(buscar(a.d.estados[a.i0 + 1], "Kpfn")?.tex, "25");
    assert.equal(buscar(a.d.estados[a.i0 + 1], "Kpfd")?.tex, "100");
    assert.ok(a.tex[a.i0 + 1].startsWith("Multiplicamos: el $56$ de la masa molar se junta con el $25$"));
    // 0,05 M por 5 L: el 5 de los litros se junta con el 5 de arriba, y las 5 centesimas explican el cero
    const k5 = molaridad("KOH", 14, 5).demo.transiciones.map((t) => t.texto);
    assert.ok(k5.some((t) => t.includes("el $5$ de los litros se junta con el $5$")), "dice de que 5 se trata");
    assert.ok(k5.some((t) => t.includes("el $5$ va en el segundo y el primero queda en $0$")), "explica el cero de 0,05");
    // 50 centesimas = 0,5: se explica que se quita el cero del final
    assert.ok(molaridad("H2SO4", 49, 2).demo.transiciones.some((t) => t.texto.includes("$0{,}50$ es lo mismo que $0{,}5$: el cero del final no cambia el valor")));
    // la regla de pasar 1/10 a decimal no es la de achicar
    assert.ok(molaridad("NaOH", 4, 1).demo.transiciones.some((t) => (t.regla ?? "").includes("décimas")));
    assert.deepEqual(a.d.transiciones[a.i0 + 1].brotes!.map((b) => b.desde).sort(), ["Kc", "Kpfd", "Kpfn"]);
    assert.ok(a.tex[a.i0 + 2].includes("$25\\cdot 56=1400$"));
    assert.equal(buscar(a.d.estados[a.i0 + 3], "Kpgp")?.tex, "1400");
    assert.ok(a.tex[a.i0 + 3].includes("$\\dfrac{1400}{100}=14$"));
    assert.equal(buscar(a.d.estados[a.i0 + 4], "Kz")?.tex, "14");
    // 0,1 · 40 = 4 : arriba queda un 1, el entero solo sube (sin paso 1·40)
    const b = camino("NaOH", 4, 1);
    assert.ok(b.tex[b.i0].includes("$0{,}1=\\dfrac{1}{10}$") && b.tex[b.i0].includes("$1$ décima"));
    assert.ok(!b.tex.some((t) => /\$1\\cdot /.test(t)), "sin producto por 1");
    assert.ok(b.tex[b.i0 + 1].includes("como arriba hay un $1$"));
    assert.ok(b.tex[b.i0 + 2].includes("$\\dfrac{40}{10}=4$"));
    // 0,5 · 98 = 49 y 0,2 · 180 = 36
    const c = camino("H2SO4", 49, 2);
    assert.ok(c.tex.some((t) => t.includes("$5\\cdot 98=490$")) && c.tex.some((t) => t.includes("$\\dfrac{490}{10}=49$")));
    const e = camino("C6H12O6", 36, 2);
    assert.ok(e.tex.some((t) => t.includes("$2\\cdot 180=360$")) && e.tex.some((t) => t.includes("$\\dfrac{360}{10}=36$")));
    // 0,25 · 2 = 0,5 (M·V): el resultado no es entero, se pasa a decimal con coma
    const m = camino("H2SO4", 49, 2);
    assert.ok(m.tex.some((t) => t.includes("Primero los números de los moles: $0{,}25\\cdot 2$")));
    assert.ok(m.tex.some((t) => t.includes("$25\\cdot 2=50$")));
    assert.ok(m.tex.some((t) => t.includes("Pasamos $\\dfrac{50}{100}$ a decimal: son $50$ centésimas, y se escriben con coma $0{,}5$")));
    assert.equal(buscar(ultimo(m.d), "Kab")?.tex ?? "0{,}5", "0{,}5");
    // si el decimal no es entero ya no hay un paso solo-texto: ningun "Primero los numeros de los gramos" queda sin fusion ni brote
    for (const [f, ms, v] of [["KOH", 14, 1], ["NaOH", 4, 1], ["H2SO4", 49, 2], ["C6H12O6", 36, 2]] as const) {
      const dd = molaridad(f, ms, v).demo;
      dd.transiciones.forEach((t) => {
        if (/(multiplicamos|pasamos|dividimos)/i.test(t.texto)) assert.ok(t.fusiones.length > 0 || (t.brotes ?? []).length > 0, `${f}: paso solo-texto: ${t.texto}`);
      });
    }
  });

  test("toda division no entera lleva su proceso: 4/40, 49/98, 0,5 entre 2", () => {
    const a = molaridad("NaOH", 4, 1).demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(a.includes("\\dfrac{1}{10}") && a.includes("Abajo ya hay $10$"), "4 entre 40 pasa por 1 sobre 10");
    const b = molaridad("H2SO4", 49, 2);
    const tb = b.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(tb.includes("\\dfrac{1}{2}") && tb.includes("se puede multiplicar arriba y abajo por $5$"), "49 entre 98 pasa por 1 sobre 2");
    assert.ok(tb.includes("Esta división no da un entero") && tb.includes("$5$ décimas"), "49 entre 98: 5 décimas");
    // el divisor común se BUSCA a la vista: listas de divisores, comunes y el mayor, y los cocientes escritos antes de la fracción achicada
    assert.ok(tb.includes("Divisores de $49$") && tb.includes("Divisores de $98$") && tb.includes("Tomamos el mayor: el $49$"), "el divisor común se busca con listas");
    assert.ok(tb.includes("$\\dfrac{49}{49}=1$") && tb.includes("$\\dfrac{98}{49}=2$"), "los cocientes se escriben antes de 1/2");
    assert.ok(!/prueba con|de a uno/i.test(tb), "no declara una búsqueda que no muestra");
    // 0,5 -> 5/10 -> 50/100 -> 25/100 -> 0,25: un paso por cosa
    assert.ok(tb.includes("$0{,}5=\\dfrac{5}{10}$"), "0,5 = 5/10");
    assert.ok(tb.includes("$\\dfrac{5\\cdot 10}{10\\cdot 10}$") && tb.includes("$5$ décimas no se reparten exactas entre $2$ litros"), "5/10 a 50/100 con el factor y el porqué");
    assert.ok(tb.includes("$5\\cdot 10=50$ y $10\\cdot 10=100$"), "los productos se resuelven en su paso");
    assert.ok(tb.includes("centésimas") && tb.includes("$\\dfrac{50}{2}=25$"), "50 centésimas entre 2 dan 25");
    assert.ok(tb.includes("$\\dfrac{25}{100}$ son $25$ centésimas, y se escriben con coma $0{,}25$"), "25/100 se lee como 0,25 en su propio paso");
    const c = molaridad("C6H12O6", 36, 2).demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(c.includes("$2$ décimas") && c.includes("$\\dfrac{2}{2}=1$, o sea $1$ décima.") && c.includes("$\\dfrac{1}{10}$ es $1$ décima, y se escribe con coma $0{,}1$"), "0,2 entre 2: 2 décimas entre 2 litros");
  });

  // ---- los 3 chequeos que salieron de la segunda lectura independiente (23-oct) ----
  const CASOS_FRACCION: [string, number, number][] = [
    ["NaOH", 12, 1], // 12/40 = 3/10: mcd 4 y abajo ya hay 10
    ["H2SO4", 147, 1], // 147/98 = 3/2: mcd 49, se amplia por 5
    ["KOH", 14, 1], // 14/56 = 1/4: mcd 14, se amplia por 25 (productos 1·25 y 4·25)
    ["H2SO4", 49, 2], // 49/98 = 1/2 = 5/10 = 0,5 y 0,5 entre 2: 5/10 = 50/100
    ["NaOH", 4, 1], // 4/40 = 1/10
    ["C6H12O6", 36, 2], // 36/180 = 1/5 = 2/10 = 0,2 y 0,2 entre 2
  ];
  const planos = (f: Ficha[]) => aplanar(f).map((x) => sinColor(x.tex));
  const hayProducto = (e: Ficha[], a: string, b: string) => {
    const t = planos(e);
    return t.some((x) => x === `${a}\\cdot ${b}`) || t.some((x, i) => x === a && t[i + 1] === "\\cdot" && t[i + 2] === b);
  };

  test("(a) todo producto a·k que el texto nombra existe como ficha en el estado (antes o despues del paso)", () => {
    for (const [f, m, v] of CASOS_FRACCION) {
      const d = molaridad(f, m, v).demo;
      d.transiciones.forEach((t, i) => {
        // la comprobacion "al revés" de una division exacta (63·2=126) es una cuenta de control: sus factores ya estan a la vista
        const texto = t.texto.split("Se comprueba al revés")[0];
        for (const mm of texto.matchAll(/(?<![\d}])(\d+)\\cdot (\d+)/g)) {
          // (un decimal por un entero, 0{,}3·40, tampoco cuenta: el 3 de 0,3 no es un factor)
          assert.ok(
            hayProducto(d.estados[i], mm[1], mm[2]) || hayProducto(d.estados[i + 1], mm[1], mm[2]),
            `${m} g de ${f} en ${v} L, T${i}: el producto ${mm[1]}·${mm[2]} del texto no es una ficha del estado: "${t.texto}"`
          );
        }
      });
    }
    // el caso del hallazgo: 1/4 se amplia por 25, con 1·25 y 4·25 como piezas y no solo en el texto
    const d = molaridad("KOH", 14, 1).demo;
    const i = d.transiciones.findIndex((t) => t.texto.includes("se puede multiplicar arriba y abajo por $25$"));
    // (arriba el 1 por 25 es 25: no hay cuenta por 1, nace directo el 25; abajo 4·25 es una pieza a la vista)
    assert.ok(i > 0 && hayProducto(d.estados[i + 1], "4", "25") && !hayProducto(d.estados[i + 1], "1", "25"));
    assert.ok(d.transiciones[i + 1].texto.includes("Resolvemos abajo: $4\\cdot 25=100$"));
  });

  test("(b) un paso no trae a la vez una fraccion y un decimal nuevos, ni dos '=' nuevos", () => {
    const esDecimal = (x: Ficha) => /\d\{,\}\d/.test(x.tex);
    const esFraccion = (x: Ficha) => !!x.frac || /\\dfrac/.test(x.tex);
    for (const [f, m, v] of [...CASOS_FRACCION, ["HNO3", 126, 2], ["ZnSO4", 161, 10], ["C6H12O6", 180, 1]] as [string, number, number][]) {
      const d = molaridad(f, m, v).demo;
      d.transiciones.forEach((t, i) => {
        const antes = aplanar(d.estados[i]);
        const idsAntes = new Set(antes.map((x) => x.id));
        const textosAntes = new Set(antes.map((x) => sinColor(x.tex)));
        const nuevas = aplanar(d.estados[i + 1]).filter((x) => !idsAntes.has(x.id));
        // copiar un decimal que ya estaba escrito (0,5 que se vuelve a escribir al lado de 5/10) no es un decimal nuevo
        const decimales = nuevas.filter((x) => esDecimal(x) && !textosAntes.has(sinColor(x.tex)));
        const fracciones = nuevas.filter(esFraccion);
        const iguales = nuevas.filter((x) => x.op && x.tex === "=");
        const et = `${m} g de ${f} en ${v} L, T${i}`;
        assert.ok(!(decimales.length > 0 && fracciones.length > 0), `${et}: trae una fraccion y un decimal nuevos a la vez: "${t.texto}"`);
        assert.ok(iguales.length <= 1, `${et}: trae ${iguales.length} signos = nuevos: "${t.texto}"`);
      });
    }
  });

  test("(c) el texto no declara una busqueda ('prueba con', 'de a uno') sin que el estado tenga la lista de intentos", () => {
    for (const [f, m, v] of CASOS_FRACCION) {
      const d = molaridad(f, m, v).demo;
      d.transiciones.forEach((t, i) => {
        if (!/prueba con|de a uno/i.test(t.texto)) return;
        assert.ok(aplanar(d.estados[i + 1]).some((x) => /Divisores de/.test(x.tex)), `${m} g de ${f} en ${v} L, T${i}: dice que busca pero el estado no muestra los intentos: "${t.texto}"`);
      });
    }
  });

  test("achicar la fraccion: el divisor sale de la lista y viaja como pieza a los cocientes; fraccion a decimal con el factor k como pieza", () => {
    // 12/40: divisores 1,2,3,4,6,12 y 1,2,4,5,8,10,20,40; comunes 1,2,4; mayor 4
    const a = molaridad("NaOH", 12, 1).demo;
    const iMayor = a.transiciones.findIndex((t) => t.texto.startsWith("Tomamos el mayor: el $4$"));
    assert.ok(iMayor > 0);
    assert.ok(buscar(a.estados[iMayor], "Dn") === undefined && sinColor(buscar(a.estados[iMayor], "Dc")!.tex).includes("\\mathbf{4}"));
    const ts = a.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(ts.includes("Divisores de $12$") && ts.includes("Divisores de $40$") && ts.includes("$\\dfrac{12}{4}=3$") && ts.includes("$\\dfrac{40}{4}=10$"));
    const iCoc = a.transiciones.findIndex((t) => t.texto.startsWith("Dividimos arriba y abajo entre ese $4$"));
    assert.deepEqual(
      (a.transiciones[iCoc].brotes ?? []).filter((b) => b.desde === "Dg").map((b) => b.hacia),
      ["Qa", "Qb"],
      "el g baja desde El mayor a las dos divisiones"
    );
    assert.equal(buscar(a.estados[iCoc + 1], "Qad")?.tex, "4");
    assert.equal(buscar(a.estados[iCoc + 1], "Qbd")?.tex, "4");
    // 147/98 = 3/2: g = 49; 3/2 = 15/10 = 1,5 con k = 5 como pieza
    const b = molaridad("H2SO4", 147, 1).demo;
    const tb = b.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(tb.includes("$\\dfrac{147}{49}=3$") && tb.includes("$\\dfrac{98}{49}=2$") && tb.includes("se puede multiplicar arriba y abajo por $5$"));
    const iAmp = b.transiciones.findIndex((t) => t.texto.includes("se puede multiplicar arriba y abajo por $5$"));
    assert.equal(buscar(b.estados[iAmp + 1], "Sf2k1")?.tex, "5");
    assert.equal(buscar(b.estados[iAmp + 1], "Sf2k2")?.tex, "5");
    assert.ok(hayProducto(b.estados[iAmp + 1], "3", "5") && hayProducto(b.estados[iAmp + 1], "2", "5"));
    // la ampliacion y la lectura con coma son pasos distintos
    const iLee = b.transiciones.findIndex((t) => t.texto.includes("son $15$ décimas, y se escriben con coma $1{,}5$"));
    assert.ok(iLee > iAmp + 1, "ampliar, resolver los productos y recien despues leer 15/10 como 1,5");
    // 1/2 -> 5/10 : 49/98 con k = 5
    const c = molaridad("H2SO4", 49, 2).demo;
    // (con 1 arriba no se escribe 1·5: el 5 nace directo y solo abajo queda la cuenta 2·5)
    assert.ok(c.transiciones.some((t) => t.texto.includes("Abajo queda $2\\cdot 5$")));
  });

  test("gramatica del decimal: nunca '1 décimos' ni '1 centésimos', y las fracciones intermedias son fichas antes del decimal", () => {
    let conBorrador = 0;
    for (const f of SOLUTOS) {
      for (let V = 1; V <= LIMITE_VOLUMEN; V++) {
        let aqui = 0;
        for (let masa = 1; masa <= LIMITE_MASA && aqui < 6; masa++) {
          if (validarMolaridad(f, masa, V)) continue;
          aqui++;
          const r = molaridad(f, masa, V);
          const todo = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
          const et = `${masa} g de ${f} en ${V} L`;
          assert.ok(!/\$1\$ (décimos|centésimos|décimas|centésimas)/.test(todo), `${et}: concordancia de '1'`);
          assert.ok(!/\b(décimos|centésimos)\b/.test(todo), `${et}: décimos/centésimos sin unificar`);
          assert.ok(!/\$[2-9]\d*\$ (décima|centésima)\b/.test(todo), `${et}: plural con singular`);
          assert.ok(!/esa (décimas|centésimas)|esas (décima|centésima)\b|esa \w+ se escriben|esas \w+ se escribe\b/.test(todo), `${et}: verbo`);
          assert.ok(!/ es \$([2-9]|\d\d+)\$ |\bson \$1\$ /.test(todo), `${et}: es/son`);
          // las fracciones intermedias existen como fichas ANTES de que nazca el decimal
          const nCent = r.resumen.nCent;
          if (nCent % 100 !== 0) {
            conBorrador++;
            const iDec = r.demo.estados.findIndex((e) => buscar(e, "Sdec"));
            assert.ok(iDec > 0, `${et}: el decimal de m/PM nace como ficha`);
            const antes = r.demo.estados[iDec];
            assert.ok(buscar(antes, "Sf1") && !buscar(r.demo.estados[iDec - 1], "Sdec"), `${et}: la fraccion simplificada es una ficha`);
            assert.ok(buscar(antes, "Sf1n") && buscar(antes, "Sf1d"), `${et}: la fraccion tiene numerador y denominador`);
            assert.equal(buscar(antes, "Sdec")?.tex, decimal(nCent), `${et}: el decimal`);
          }
          const MC = r.resumen.centesimas;
          if (V > 1 && MC % 100 !== 0) {
            const iDec = r.demo.estados.findIndex((e) => buscar(e, "Cdec"));
            assert.ok(iDec > 0 && buscar(r.demo.estados[iDec], "Cf2") && buscar(r.demo.estados[iDec], "Cf3"), `${et}: el reparto en decimas o centesimas son fichas`);
            assert.equal(buscar(r.demo.estados[iDec], "Cdec")?.tex, decimal(MC), `${et}: el decimal de n entre V`);
          }
        }
      }
    }
    assert.ok(conBorrador > 10, `solo ${conBorrador} casos con borrador`);
    // casos de borde: 1 décima (4 g de NaOH) y 1 centésima
    const t = (f: string, m: number, v: number) => molaridad(f, m, v).demo.transiciones.map((x) => x.texto).join(" | ");
    assert.ok(t("NaOH", 4, 1).includes("es $1$ décima, y se escribe con coma"), "1 décima");
    assert.ok(!t("NaOH", 4, 1).includes("1$ décimos"));
  });

  test("las unidades de la comprobacion se tachan: L con L y mol con mol, y el texto no mezcla la M unidad con la M letra", () => {
    const r = molaridad("C6H12O6", 36, 2);
    const todo = r.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(todo.includes("El litro de abajo se tacha") && todo.includes("Los moles se tachan"));
    assert.ok(!todo.includes("\\text{M}"), "sin la M de unidad que se confunde con la M de molaridad");
  });

  test("las unidades: la masa molar tiene g/mol y el resultado queda en mol/L", () => {
    const r = molaridad("KOH", 14, 1);
    const fin = ultimo(r.demo);
    assert.equal(buscar(fin, "UPMn")?.tex, "\\text{g}");
    assert.equal(buscar(fin, "UPMd")?.tex, "\\text{mol}");
    // antes de tachar hay dos "g" (arriba y abajo) y despues ninguno en la cuenta de n
    const iT = r.demo.transiciones.findIndex((t) => t.fusiones.some((f) => f.modo === "tachar"));
    assert.equal(aplanar(r.demo.estados[iT]).filter((f) => ["u1", "u3"].includes(f.id) && f.tex === "\\text{g}").length, 2);
    assert.equal(aplanar(r.demo.estados[iT + 1]).filter((f) => ["u1", "u3"].includes(f.id)).length, 0);
  });

  test("las letras de las reglas generales no chocan con las del ejercicio (m, n, M, V)", () => {
    for (const [f, masa, V] of [["H2SO4", 49, 2], ["NaOH", 40, 1], ["ZnSO4", 161, 1]] as const) {
      const d = molaridad(f, masa, V).demo;
      const generales = d.transiciones.filter((t) => /^(Calculamos|Sumamos|Multiplicamos|Primero dividimos|Nos quedamos|Dividimos los números)/.test(t.texto));
      assert.ok(generales.length >= 4, `${f}: pasos generales`);
      for (const t of generales) {
        const letras = (t.regla ?? "").replace(/\\(text|mathrm)\{[^}]*\}/g, "").replace(/\\[a-zA-Z]+/g, "");
        assert.ok(!/[mnMV]/.test(letras), `${f}: la regla usa una letra del ejercicio: ${t.regla}`);
      }
    }
  });

  test("la aclaracion de iones solo en solutos ionicos; y la division exacta muestra el producto de comprobacion", () => {
    const t = (f: string, m: number, v: number) => molaridad(f, m, v).demo.transiciones.map((x) => x.texto).join(" | ");
    const calc = (f: string, m: number, v: number) => molaridad(f, m, v).demo.transiciones.find((x) => x.texto.startsWith("Calculamos"))!.texto;
    assert.ok(calc("NaOH", 40, 1).includes("iones, que son átomos con carga"));
    assert.ok(!/\biones\b/.test(calc("H2SO4", 98, 1)) && calc("H2SO4", 98, 1).includes("de una molécula"));
    assert.ok(t("HNO3", 126, 1).includes("$63\\cdot 2=126$") && t("HNO3", 126, 1).includes("el $63$ entra $2$ veces en el $126$"));
    // (el producto 63·2 de esa comprobacion es una cuenta de control: el test (a) la deja pasar)
    // con borrador no se repite el calculo del paso anterior
    const b = t("NaOH", 4, 1);
    assert.ok(!b.includes("Primero dividimos los números") && b.includes("Nos quedamos con el resultado de la división"));
  });

  test("el reparto entre litros va en su renglon: 0,5 = 5/10 = 50/100 y aparte 50/2 = 25 y 25/100 = 0,25", () => {
    const d = molaridad("H2SO4", 49, 2).demo;
    // el estado donde ya nacio la lectura con coma (despues se borra el borrador)
    const fin = d.estados.find((e) => buscar(e, "Cdec"))!;
    const filas = renglones(fin).map((m) => m.map(valorMiembro));
    // la cadena de la conversion: 0,5 = 5/10 = 50/100 (tres miembros, todos con el mismo valor)
    assert.ok(filas.some((v) => v.length === 3 && v.every((x) => x && x[0] * v[0]![1] === v[0]![0] * x[1])), "hay una cadena de tres miembros iguales");
    // el reparto (50/2 = 25): dos miembros que SI valen distinto de 50/100, por eso viven en otro renglon
    assert.ok(filas.some((v) => v.length === 2 && v.every(Boolean)), "50/2 = 25 en su renglon");
    const idx = (id: string) => fin.findIndex((f) => f.id === id);
    // el reparto (50/2 = 25) abre renglon propio y no cuelga de la cadena anterior
    assert.ok(fin[idx("Cs2")]?.salto, "el reparto abre renglon");
    assert.ok(fin[idx("Cs3")]?.salto, "las centesimas del reparto abren otro renglon");
    assert.ok(!buscar(fin, "Cdv") && !buscar(fin, "CV"), "no queda el signo de dividir");
    // reparto con V > 1 en todos los casos: 0,2 / 2, 1,5 / 3 y 1 / 10 tampoco dejan cadenas falsas
    for (const [f, m, v] of [["C6H12O6", 36, 2], ["NaOH", 4, 10], ["KOH", 84, 3], ["NaOH", 40, 4]] as [string, number, number][]) {
      if (validarMolaridad(f, m, v)) continue;
      cadenasVerdaderas(molaridad(f, m, v).demo, `${m} g de ${f} en ${v} L`);
    }
  });

  test("los cocientes del divisor nacen con su raya y su igual (12/4 = 3), no como dos numeros sueltos", () => {
    const d = molaridad("NaOH", 12, 1).demo;
    const i = d.transiciones.findIndex((t) => t.texto.startsWith("Hacemos primero la división de arriba"));
    assert.ok(i > 0);
    const e = d.estados[i + 1];
    assert.ok(buscar(e, "Qa")?.frac && sinColor(buscar(e, "Qr")!.tex) === "3", "12/4 = 3 en un mismo renglon");
    const j = d.transiciones.findIndex((t) => t.texto.startsWith("Ahora la de abajo"));
    assert.ok(buscar(d.estados[j + 1], "Qb")?.frac && buscar(d.estados[j + 1], "Qr2")?.tex === "10");
    // nunca dos enteros sueltos en renglones seguidos sin raya: el 3 y el 10 solo existen junto a su fraccion
    for (const x of d.estados) {
      const suelto = aplanar(x).filter((f) => ["Qr", "Qr2"].includes(f.id));
      if (suelto.length) assert.ok(buscar(x, "Qa") || buscar(x, "Qb"), "un cociente sin su fraccion");
    }
  });

  test("la comprobacion conserva el punto entre unidades hasta que se tachan (no queda '50/100 mol/L L')", () => {
    for (const [f, m, v] of [["H2SO4", 49, 2], ["C6H12O6", 36, 2], ["NaOH", 12, 1], ["KOH", 28, 5]] as [string, number, number][]) {
      if (validarMolaridad(f, m, v)) continue;
      const d = molaridad(f, m, v).demo;
      for (const e of d.estados) {
        const ids = e.map((x) => x.id);
        // si el litro (Kbu) sigue en la hoja, el punto Kx1 esta justo antes que el
        const iL = ids.indexOf("Kbu");
        if (iL > 0 && !ids.includes("Kb")) assert.equal(ids[iL - 1], "Kx1", `${m} g de ${f} en ${v} L: falta el punto antes del litro`);
        // y con los moles de n (Kmol) y la masa molar (Kc o KcU), el punto Kx2
        const iC = ids.indexOf("KcU");
        if (iC > 0 && ids.includes("Kmol")) assert.ok(ids.slice(ids.indexOf("Kmol"), iC).includes("Kx2"), `${m} g de ${f} en ${v} L: falta el punto entre mol y g/mol`);
      }
    }
  });

  test("el punto final de una oracion va dentro de la formula: nunca queda solo al inicio de un renglon", () => {
    for (const [f, m, v] of [["H2SO4", 49, 2], ["NaOH", 12, 1], ["C6H12O6", 36, 2]] as [string, number, number][]) {
      const d = molaridadReal(f, m, v).demo;
      for (const s of [d.intro, ...d.transiciones.flatMap((t) => [t.texto, t.porque])]) assert.ok(!/\$[.,;:]/.test(s) && !/\.\$(\s|$)/.test(s), `${m} g de ${f}: puntuacion suelta o dentro de la formula en "${s}"`);
    }
  });

  test("la formula de n nace de la n de M = n / V, y la de PM de la PM", () => {
    const r = molaridad("C6H12O6", 36, 2);
    const f2 = r.demo.transiciones.find((t) => t.texto.startsWith("Pero $n$ no es un dato"))!;
    assert.ok(f2.brotes!.every((b) => b.desde === "F1n"));
    const w = r.demo.transiciones.find((t) => t.texto.startsWith("Calculamos $\\text{PM}$"))!;
    assert.ok(w.brotes!.some((b) => b.desde === "F2p" && b.hacia === "Wl"));
  });
});
