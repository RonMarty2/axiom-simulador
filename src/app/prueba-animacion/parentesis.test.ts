import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CASOS_POR_TIPO } from "./casos.ts";
import { construir, type Tipo } from "./construir.ts";
import { hijas, type Demo, type Ficha } from "./datos.ts";
import { CASOS } from "./huellas.ts";
import { validarCuadratica } from "./generadores-cuadratica.ts";

// Error del 30-oct: la ayuda "a lapiz" partia un producto que venia DESPUES de un menos y dejaba la suma parcial sin
// parentesis: 144-(10·9+2·9) se mostraba como 144-10·9+2·9 (otro valor), y 4-8·(-12) pasaba a 4--8·12.
// Dos vigilancias, en TODOS los tipos (casos dificiles, casos del registro y un barrido de cuadraticas):
//   1) forma: ninguna pieza con un + o - suelto (fuera de parentesis) va detras de un `-` o un `·`; ningun signo doble.
//   2) valor: la expresion numerica pura de una raiz no cambia de valor de un estado al siguiente.

const sinColor = (s: string) => s.replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/g, "$1").trim();

/** true si hay un + o - binario fuera de todo parentesis o llave (el primer caracter, si es el signo de la pieza, no cuenta aparte) */
function tieneSignoSuelto(tex: string): boolean {
  let prof = 0;
  for (let i = 0; i < tex.length; i++) {
    const c = tex[i];
    if (c === "(" || c === "{") prof++;
    else if (c === ")" || c === "}") prof--;
    else if (prof === 0 && (c === "+" || c === "-") && i > 0) return true;
  }
  return false;
}

/** problemas de forma en un grupo de hermanas (la fila de un estado, o lo que lleva dentro una raiz o fraccion) */
function formaDe(fichas: Ficha[]): string[] {
  const malos: string[] = [];
  for (let i = 1; i < fichas.length; i++) {
    const prev = sinColor(fichas[i - 1].tex);
    const cur = sinColor(fichas[i].tex);
    if (!cur) continue;
    const prevMenos = prev === "-" || prev === "\\minus";
    const prevMas = prev === "+";
    const prevPor = prev === "\\cdot" || prev === "\\times";
    if ((prevMenos || prevMas) && cur.startsWith("-")) malos.push(`signo doble: «${prev}» seguido de «${cur}»`);
    if (prevMenos && cur.startsWith("+")) malos.push(`signo doble: «${prev}» seguido de «${cur}»`);
    if ((prevMenos || prevPor) && tieneSignoSuelto(cur)) malos.push(`«${prev}» seguido de «${cur}»: la suma o resta lleva parentesis`);
    if (prevPor && cur.startsWith("-")) malos.push(`«${prev}» seguido del negativo «${cur}» sin parentesis`);
  }
  for (const f of fichas) {
    const h = hijas(f);
    if (h.length) malos.push(...formaDe(f.rad ?? []), ...formaDe(f.frac?.nPiezas ?? []), ...formaDe(f.frac?.dPiezas ?? []));
  }
  return malos;
}

/** la forma del texto unido, por si una pieza lleva el signo doble por dentro: «4--8», «+-3» */
const signoDobleEnTexto = (fichas: Ficha[]): string[] => {
  const t = fichas.map((f) => sinColor(f.tex)).join("");
  return /--|\+-|-\+/.test(t.replace(/\\pm/g, "")) ? [`signo doble en «${t}»`] : [];
};

function hallazgosForma(d: Demo, etiqueta: string): string[] {
  const malos: string[] = [];
  d.estados.forEach((e, i) => {
    for (const m of [...formaDe(e), ...signoDobleEnTexto(e)]) malos.push(`${etiqueta} E${i}: ${m}`);
  });
  return malos;
}

/** valor de una expresion numerica pura (solo cifras, + - · y parentesis), o null si tiene letras u otra cosa */
function valorNumerico(piezas: Ficha[]): number | null {
  if (piezas.length === 0 || piezas.some((p) => p.sup || hijas(p).length)) return null;
  const s = piezas
    .map((p) => sinColor(p.tex))
    .join("")
    .replace(/\\left/g, "")
    .replace(/\\right/g, "")
    .replace(/\\cdot/g, "*")
    .replace(/\{,\}/g, ".")
    .replace(/\s+/g, "");
  if (!/^[0-9+\-*().]+$/.test(s)) return null;
  try {
    const v = Function(`"use strict"; return (${s});`)();
    return typeof v === "number" && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

function hallazgosValor(d: Demo, etiqueta: string): string[] {
  const malos: string[] = [];
  for (let i = 0; i + 1 < d.estados.length; i++) {
    const antes = new Map<string, number>();
    for (const f of d.estados[i]) {
      const v = f.rad ? valorNumerico(f.rad) : null;
      if (v !== null) antes.set(f.id, v);
    }
    for (const f of d.estados[i + 1]) {
      const v = f.rad ? valorNumerico(f.rad) : null;
      const a = antes.get(f.id);
      if (v !== null && a !== undefined && Math.abs(v - a) > 1e-9) malos.push(`${etiqueta} E${i}->E${i + 1}: la raiz pasa de valer ${a} a ${v}`);
    }
  }
  return malos;
}

// Valor por TRAMO: la tira de piezas seguidas que son aritmetica pura (144 - ( 90 + 18 )) que rodea a lo que se fusiona.
// Se compara el tramo antes y despues de cada fusion: si el valor cambia, algun parentesis se perdio.
const esAritmetica = (f: Ficha): boolean => !f.sup && !f.salto && hijas(f).length === 0 && !f.debajo && /^[0-9+\-*().\s,]*$/.test(texNum(f.tex)) && sinColor(f.tex) !== "";
const texNum = (t: string) => sinColor(t).replace(/\\left/g, "").replace(/\\right/g, "").replace(/\\cdot/g, "*").replace(/\{,\}/g, ".");
const evaluar = (piezas: Ficha[]): number | null => {
  const s = piezas.map((p) => texNum(p.tex)).join("").replace(/\s+/g, "");
  if (!s || !/^[0-9+\-*().]+$/.test(s) || /[+\-*]$/.test(s) || /^[*]/.test(s)) return null;
  try {
    const v = Function(`"use strict"; return (${s});`)();
    return typeof v === "number" && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
};
function tramo(grupo: Ficha[], idx: number): Ficha[] {
  let a = idx;
  let b = idx;
  while (a > 0 && esAritmetica(grupo[a - 1])) a--;
  while (b + 1 < grupo.length && esAritmetica(grupo[b + 1])) b++;
  return grupo.slice(a, b + 1);
}
const grupos = (fichas: Ficha[]): Ficha[][] => [fichas, ...fichas.flatMap((f) => [f.rad ?? [], f.frac?.nPiezas ?? [], f.frac?.dPiezas ?? []].flatMap((g) => (g.length ? grupos(g) : [])))];

function hallazgosTramo(d: Demo, etiqueta: string): { malos: string[]; comparados: number } {
  const malos: string[] = [];
  let comparados = 0;
  d.transiciones.forEach((t, i) => {
    for (const fu of t.fusiones) {
      if (fu.modo === "tachar" || typeof fu.hacia !== "string") continue;
      const H = fu.hacia;
      // el tramo antes: el que contiene la primera pieza de `desde`; el tramo despues: el que contiene `hacia`
      const antes = grupos(d.estados[i]).map((g) => ({ g, k: g.findIndex((f) => f.id === fu.desde[0]) })).find((x) => x.k >= 0);
      const despues = grupos(d.estados[i + 1]).map((g) => ({ g, k: g.findIndex((f) => f.id === H) })).find((x) => x.k >= 0);
      if (!antes || !despues) continue;
      const ta = tramo(antes.g, antes.k);
      const td = tramo(despues.g, despues.k);
      if (!ta.some((f) => fu.desde.includes(f.id)) || !td.some((f) => f.id === H)) continue;
      // solo si el tramo "antes" es completo (todas las desde estan dentro) y los vecinos a ambos lados son los mismos
      const ids = (x: Ficha[]) => x.map((f) => f.id);
      const rest = (x: Ficha[], quitar: string[]) => ids(x).filter((id) => !quitar.includes(id)).join(",");
      if (!fu.desde.every((id) => ta.some((f) => f.id === id)) || rest(ta, fu.desde) !== rest(td, [H])) continue;
      const va = evaluar(ta);
      const vd = evaluar(td);
      if (va === null || vd === null) continue;
      comparados++;
      if (Math.abs(va - vd) > 1e-6) malos.push(`${etiqueta} T${i + 1}: «${ta.map((f) => sinColor(f.tex)).join(" ")}» vale ${va} y despues «${td.map((f) => sinColor(f.tex)).join(" ")}» vale ${vd}`);
    }
  });
  return { malos, comparados };
}

function* todosLosDemos(): Generator<[string, Demo]> {
  for (const [tipo, casos] of Object.entries(CASOS_POR_TIPO) as [Tipo, (typeof CASOS_POR_TIPO)[Tipo]][]) {
    for (const c of casos) {
      const r = construir(tipo, c.v);
      if ("demo" in r) yield [`${tipo}/${c.nombre}`, r.demo];
    }
  }
  for (const [id, demos] of Object.entries(CASOS)) {
    const ds = demos();
    for (let k = 0; k < ds.length; k++) yield [`${id}#${k}`, ds[k]];
  }
  // barrido de cuadraticas con soluciones enteras: a de 1 a 5, b y c que dan numeros grandes (los que activan el lapiz)
  for (let a = 1; a <= 5; a++)
    for (let b = -20; b <= 20; b += 1)
      for (let c = -30; c <= 30; c += 3) {
        if (validarCuadratica(a, b, c) !== null) continue;
        for (const rapido of [false]) {
          const r = construir("cuadratica", [String(a), String(b), String(c), "0", "0", "0"], rapido);
          if ("demo" in r) yield [`cuadratica(${a},${b},${c})`, r.demo];
        }
      }
}

// Trinquete: deuda conocida, por tipo (prefijo de la etiqueta). NO puede subir; al arreglarla se borra la fila.
// Vacio desde el 30-oct (pitagoras: `cuadradoLapiz` dejaba 10000-20·28+8·28 sin parentesis; arreglado con `menos`).
const DEUDA: Record<string, number> = {};

describe("parentesis y signos en los estados (todos los tipos)", () => {
  test("ninguna suma partida queda sin parentesis tras un menos o un por, ni signos dobles", () => {
    const malos: string[] = [];
    for (const [etiqueta, d] of todosLosDemos()) malos.push(...hallazgosForma(d, etiqueta));
    const unicos = [...new Set(malos)];
    const nuevos = unicos.filter((m) => !Object.keys(DEUDA).some((p) => m.startsWith(p)));
    assert.deepEqual(nuevos.slice(0, 20), []);
    for (const [p, tope] of Object.entries(DEUDA)) {
      const n = unicos.filter((m) => m.startsWith(p)).length;
      assert.ok(n <= tope, `${p} tiene ${n} hallazgos de parentesis y el tope es ${tope}: se arregla, no se sube el tope`);
    }
  });
  test("la expresion numerica de una raiz no cambia de valor entre estados", () => {
    const malos: string[] = [];
    for (const [etiqueta, d] of todosLosDemos()) malos.push(...hallazgosValor(d, etiqueta));
    assert.deepEqual([...new Set(malos)].slice(0, 20), []);
  });
  test("el tramo de aritmetica que rodea a cada fusion vale lo mismo antes y despues", () => {
    const malos: string[] = [];
    let comparados = 0;
    for (const [etiqueta, d] of todosLosDemos()) {
      const r = hallazgosTramo(d, etiqueta);
      malos.push(...r.malos);
      comparados += r.comparados;
    }
    assert.ok(comparados > 500, `el test casi no compara nada (${comparados}): revisa que los tramos se detecten`);
    const unicos = [...new Set(malos)];
    assert.deepEqual(unicos.filter((m) => !Object.keys(DEUDA).some((p) => m.startsWith(p))).slice(0, 20), []);
  });
});

describe("el detector atrapa los errores conocidos", () => {
  const f = (id: string, tex: string, extra: Partial<Ficha> = {}): Ficha => ({ id, tex, ...extra });
  const op = (id: string, tex: string) => f(id, tex, { op: true });
  test("144-10·9+2·9 sin parentesis", () => {
    assert.equal(formaDe([f("a", "144"), op("m", "-"), f("p", "10\\cdot 9+2\\cdot 9")]).length, 1);
    assert.deepEqual(formaDe([f("a", "144"), op("m", "-"), f("p", "\\left(10\\cdot 9+2\\cdot 9\\right)")]), []);
  });
  test("4--8·12 y 4-8·(-12)", () => {
    assert.equal(formaDe([f("a", "4"), op("m", "-"), f("p", "-8\\cdot 12")]).length, 1);
    assert.deepEqual(formaDe([f("a", "4"), op("m", "-"), f("p", "(-8\\cdot 12)")]), []);
    assert.deepEqual(formaDe([f("a", "4"), op("m", "-"), f("p", "8\\cdot(-12)")]), []);
    assert.equal(signoDobleEnTexto([f("a", "4-"), f("p", "-8\\cdot 12")]).length, 1);
  });
  test("el valor de la raiz cambia si se pierde un parentesis", () => {
    const rad = (tex: string[]) => f("r", "\\sqrt{}", { rad: tex.map((t, i) => f(`n${i}`, t)) });
    const bien: Demo = { titulo: "", nota: "", intro: "", transiciones: [], estados: [[rad(["144", "-", "\\left(10\\cdot 9+2\\cdot 9\\right)"])], [rad(["144", "-", "10\\cdot 9+2\\cdot 9"])]] };
    assert.equal(hallazgosValor(bien, "x").length, 1);
  });
});
