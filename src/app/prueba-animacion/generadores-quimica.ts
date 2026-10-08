// Estequiometria por FACTORES DE CONVERSION, "como a lapiz":
//   1. el enunciado tal como viene (dato, lo que piden y, si hay, la ecuacion balanceada) y POR QUE no se pasa directo;
//   2. (reaccion) se comprueba que la ecuacion esta balanceada contando atomos a cada lado;
//   3. el dato se copia en un renglon nuevo: la CADENA, que se ira multiplicando por factores;
//   4. la MASA MOLAR se construye a la vista: masa atomica anotada debajo de cada elemento (de a uno),
//      un termino n·A por elemento (el subindice y la masa NACEN de su elemento), cada producto y cada suma en su paso;
//   5. "1 mol pesa M g" se escribe como igualdad y esa igualdad VIAJA a la cadena como fraccion (la raya sale del =);
//   6. las unidades que quedan arriba y abajo se TACHAN de a una (g, mol, ...), apenas se puede;
//   7. la relacion en moles sale de la ecuacion (coeficientes) o de la formula (subindice): sus numeros nacen ahi y viajan;
//   8. todo se junta en UNA fraccion (las piezas viajan), se multiplica de a dos y se divide una vez;
//   9. el resultado viaja al "?" del enunciado y se comprueba que la unidad que sobrevivio es la que piden.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas en LaTeX sin $. Las barras van dobles.
// Arrastre: una pieza que cambia de lugar se va con una fusion "viajar" y su copia nace con un brote en el destino.
import { frPiezas, sustituir, aplanar, type Ficha, type Transicion, type Brote } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

// ---------------------------------------------------------------------------
// Tablas. Masas atomicas redondeadas a enteros, como en el colegio y en el banco (UMSS usa C=12, H=1, O=16).
export const MASAS_ATOMICAS: Record<string, number> = {
  H: 1,
  C: 12,
  N: 14,
  O: 16,
  Na: 23,
  Mg: 24,
  Al: 27,
  S: 32,
  K: 39,
  Ca: 40,
  Fe: 56,
  Zn: 65,
};
const NOMBRE_ELEMENTO: Record<string, string> = {
  H: "hidrógeno",
  C: "carbono",
  N: "nitrógeno",
  O: "oxígeno",
  Na: "sodio",
  Mg: "magnesio",
  Al: "aluminio",
  S: "azufre",
  K: "potasio",
  Ca: "calcio",
  Fe: "hierro",
  Zn: "zinc",
};
/** sustancias que se pueden usar (formulas sin parentesis; cada elemento aparece una sola vez) */
export const SUSTANCIAS: Record<string, string> = {
  H2: "hidrógeno",
  O2: "oxígeno",
  N2: "nitrógeno",
  C: "carbono",
  Na: "sodio",
  Mg: "magnesio",
  Al: "aluminio",
  Fe: "hierro",
  Zn: "zinc",
  H2O: "agua",
  CO2: "dióxido de carbono",
  CH4: "metano",
  C3H8: "propano",
  C2H6O: "etanol",
  C6H12O6: "glucosa",
  NH3: "amoníaco",
  CaCO3: "carbonato de calcio",
  CaO: "óxido de calcio",
  MgO: "óxido de magnesio",
  Fe2O3: "óxido de hierro",
  Al2O3: "óxido de aluminio",
  SO2: "dióxido de azufre",
  SO3: "trióxido de azufre",
  NaOH: "hidróxido de sodio",
  KOH: "hidróxido de potasio",
  H2SO4: "ácido sulfúrico",
  HNO3: "ácido nítrico",
  ZnSO4: "sulfato de zinc",
};

export interface Reaccion {
  reactivos: [number, string][];
  productos: [number, string][];
}
/** reacciones balanceadas (el test y `validarEstequiometria` comprueban el balance contando atomos) */
export const REACCIONES: Record<string, Reaccion> = {
  "formacion-agua": { reactivos: [[2, "H2"], [1, "O2"]], productos: [[2, "H2O"]] },
  "combustion-metano": { reactivos: [[1, "CH4"], [2, "O2"]], productos: [[1, "CO2"], [2, "H2O"]] },
  "combustion-propano": { reactivos: [[1, "C3H8"], [5, "O2"]], productos: [[3, "CO2"], [4, "H2O"]] },
  "combustion-etanol": { reactivos: [[1, "C2H6O"], [3, "O2"]], productos: [[2, "CO2"], [3, "H2O"]] },
  "combustion-carbono": { reactivos: [[1, "C"], [1, "O2"]], productos: [[1, "CO2"]] },
  "respiracion-glucosa": { reactivos: [[1, "C6H12O6"], [6, "O2"]], productos: [[6, "CO2"], [6, "H2O"]] },
  haber: { reactivos: [[1, "N2"], [3, "H2"]], productos: [[2, "NH3"]] },
  "descomposicion-caliza": { reactivos: [[1, "CaCO3"]], productos: [[1, "CaO"], [1, "CO2"]] },
  "oxidacion-magnesio": { reactivos: [[2, "Mg"], [1, "O2"]], productos: [[2, "MgO"]] },
  "oxidacion-hierro": { reactivos: [[4, "Fe"], [3, "O2"]], productos: [[2, "Fe2O3"]] },
  "oxidacion-aluminio": { reactivos: [[4, "Al"], [3, "O2"]], productos: [[2, "Al2O3"]] },
  "oxidacion-so2": { reactivos: [[2, "SO2"], [1, "O2"]], productos: [[2, "SO3"]] },
  "sodio-agua": { reactivos: [[2, "Na"], [2, "H2O"]], productos: [[2, "NaOH"], [1, "H2"]] },
  "zinc-acido": { reactivos: [[1, "Zn"], [1, "H2SO4"]], productos: [[1, "ZnSO4"], [1, "H2"]] },
};

/** atomos de una formula sin parentesis, en el orden en que se escriben: C6H12O6 -> [C,6] [H,12] [O,6] */
export function atomos(formula: string): [string, number][] | null {
  if (!/^([A-Z][a-z]?\d*)+$/.test(formula)) return null;
  const out: [string, number][] = [];
  for (const m of formula.matchAll(/([A-Z][a-z]?)(\d*)/g)) {
    if (!(m[1] in MASAS_ATOMICAS) || out.some(([e]) => e === m[1])) return null;
    const n = m[2] ? Number(m[2]) : 1;
    if (n < 1) return null;
    out.push([m[1], n]);
  }
  return out;
}
export const masaMolar = (formula: string) => (atomos(formula) ?? []).reduce((s, [e, n]) => s + n * MASAS_ATOMICAS[e], 0);

/** cuenta los atomos de cada elemento a un lado de la reaccion */
export function contarLado(lado: [number, string][]): Record<string, number> {
  const c: Record<string, number> = {};
  for (const [k, f] of lado) for (const [e, n] of atomos(f) ?? []) c[e] = (c[e] ?? 0) + k * n;
  return c;
}
export function balanceada(r: Reaccion): boolean {
  const a = contarLado(r.reactivos);
  const b = contarLado(r.productos);
  const els = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...els].every((e) => a[e] === b[e]);
}

// ---------------------------------------------------------------------------
// Formato
const COLOR = { dato: "#2563eb", masa: "#16a34a", relacion: "#ea580c" } as const;
const col = (c: string, tex: string) => `\\textcolor{${c}}{${tex}}`;
/** formula en LaTeX: C6H12O6 -> \mathrm{C_{6}H_{12}O_{6}} */
export const formulaTex = (f: string) => `\\mathrm{${(atomos(f) ?? []).map(([e, n]) => (n > 1 ? `${e}_{${n}}` : e)).join("")}}`;
const elemTex = (e: string, n: number) => `\\mathrm{${n > 1 ? `${e}_{${n}}` : e}}`;
const nombreSust = (f: string) => `${SUSTANCIAS[f] ?? f} ($${formulaTex(f)}$)`;
/** numero en centesimas a texto con coma decimal del colegio: 250 -> 2{,}5 ; 100 -> 1 */
export function decimal(centesimas: number): string {
  const ent = Math.floor(centesimas / 100);
  const r = centesimas % 100;
  if (r === 0) return `${ent}`;
  return `${ent}{,}${r % 10 === 0 ? r / 10 : String(r).padStart(2, "0")}`;
}
const UNIDAD = { g: "\\text{g}", mol: "\\text{mol}" } as const;
const dot = (id: string): Ficha => ({ id, tex: "\\cdot", op: true });

// ---------------------------------------------------------------------------
// Validacion
const LIMITE_MASA = 2000;
function validarMasa(masa: number): string | null {
  if (!Number.isInteger(masa) || masa < 1 || masa > LIMITE_MASA) return `Escribe una masa entera entre 1 y ${LIMITE_MASA} gramos.`;
  return null;
}
/** el resultado tiene que ser exacto con hasta dos decimales (si no, la animacion tendria que redondear) */
const exacto = (N: number, D: number) => (N * 100) % D === 0;

export function validarMolesDeAtomos(compuesto: string, elemento: string, masa: number): string | null {
  const at = compuesto in SUSTANCIAS ? atomos(compuesto) : null;
  if (!at) return "Elige una sustancia de la lista.";
  if (at.length === 1 && at[0][1] === 1) return `El ${SUSTANCIAS[compuesto]} ya es un elemento suelto: sus moles de átomos son sus moles. Elige un compuesto o una molécula como $\\mathrm{O_{2}}$.`;
  if (!at.some(([e]) => e === elemento)) return `El $${formulaTex(compuesto)}$ no tiene $\\mathrm{${elemento}}$.`;
  const m = validarMasa(masa);
  if (m) return m;
  const k = at.find(([e]) => e === elemento)![1];
  const M = masaMolar(compuesto);
  if (!exacto(masa * k, M)) return `Con ${masa} g el resultado no es exacto con dos decimales. Prueba con un múltiplo de ${M}, por ejemplo ${M} o ${M * 2}.`;
  return null;
}

export type Pide = "g" | "mol";
export function validarEstequiometria(reaccion: string, dado: string, pedido: string, masa: number, pide: Pide): string | null {
  const r = REACCIONES[reaccion];
  if (!r) return "Elige una reacción de la lista.";
  if (!balanceada(r)) return "Esa reacción no está balanceada.";
  const todas = [...r.reactivos, ...r.productos];
  const a = todas.find(([, f]) => f === dado);
  const b = todas.find(([, f]) => f === pedido);
  if (!a || !b) return "Las dos sustancias tienen que estar en la reacción.";
  if (dado === pedido) return "Elige dos sustancias distintas.";
  const m = validarMasa(masa);
  if (m) return m;
  const N = masa * b[0] * (pide === "g" ? masaMolar(pedido) : 1);
  const D = masaMolar(dado) * a[0];
  if (!exacto(N, D)) return `Con ${masa} g el resultado no es exacto con dos decimales. Prueba con un múltiplo de ${masaMolar(dado)}.`;
  return null;
}

// ---------------------------------------------------------------------------
// Motor comun
type Relacion =
  | { tipo: "atomos"; elemento: string; k: number }
  | { tipo: "reaccion"; reaccion: Reaccion; pedido: string; a: number; b: number; pide: Pide };

function construir(masa: number, A: string, rel: Relacion): Resultado {
  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];
  // renglones: dato, lo que piden, ecuacion (si hay), cadena de factores, renglon de trabajo
  let D: Ficha[] = [];
  let P: Ficha[] = [];
  let E: Ficha[] = [];
  let C: Ficha[] = [];
  let W: Ficha[] = [];
  const foto = () => estados.push([...D, ...P, ...E, ...C, ...W].map((f) => ({ ...f })));
  const paso = (t: Transicion) => {
    foto();
    trans.push(t);
  };
  const filas = () => [D, P, E, C, W];
  const ponerFilas = (fs: Ficha[][]) => ([D, P, E, C, W] = fs);
  /** cambia una pieza (a cualquier profundidad) por otra con el mismo id o por varias */
  const cambiar = (viejos: string[], nuevos: Ficha[]) => ponerFilas(filas().map((fs) => sustituir(fs, viejos, nuevos)));
  const pieza = (id: string) => filas().flatMap((fs) => aplanar(fs)).find((f) => f.id === id) as Ficha;
  const parchear = (id: string, parche: Partial<Ficha>) => cambiar([id], [{ ...pieza(id), ...parche }]);

  const MA = masaMolar(A);
  const atA = atomos(A)!;
  const piezasDe = (pref: string, f: string): Ficha[] => (atomos(f) ?? []).map(([e, n], i) => ({ id: `${pref}${i}`, tex: elemTex(e, n), ...(i > 0 ? { pegado: true } : {}) }));

  // ----- estado inicial: el enunciado tal como viene
  D = [{ id: "tD", tex: "\\text{Dato:}", op: true }, { id: "m", tex: col(COLOR.dato, `${masa}`) }, { id: "ug", tex: UNIDAD.g }, ...piezasDe("a", A)];
  const pideU: Pide = rel.tipo === "atomos" ? "mol" : rel.pide;
  P = [
    { id: "SP", tex: "", salto: true },
    { id: "tP", tex: "\\text{Piden:}", op: true },
    { id: "q", tex: "?" },
    { id: "uq", tex: UNIDAD[pideU] },
    ...(rel.tipo === "atomos" ? [{ id: "x", tex: `\\mathrm{${rel.elemento}}` }] : piezasDe("b", rel.pedido)),
  ];
  // la ecuacion balanceada: un coeficiente (si no es 1) y una formula por sustancia
  const idEspecie = new Map<string, { coef: number; e: string; k: string | null; lado: "R" | "P" }>();
  if (rel.tipo === "reaccion") {
    E = [{ id: "SE", tex: "", salto: true }];
    let i = 0;
    const lado = (xs: [number, string][], l: "R" | "P") =>
      xs.forEach(([coef, f], j) => {
        if (j > 0) E.push({ id: `p${i}`, tex: "+", op: true });
        if (coef > 1) E.push({ id: `k${i}`, tex: `${coef}` });
        E.push({ id: `e${i}`, tex: formulaTex(f), ...(coef > 1 ? { pegado: true } : {}) });
        idEspecie.set(f, { coef, e: `e${i}`, k: coef > 1 ? `k${i}` : null, lado: l });
        i++;
      });
    lado(rel.reaccion.reactivos, "R");
    E.push({ id: "fl", tex: "\\longrightarrow", op: true });
    lado(rel.reaccion.productos, "P");
  }
  // la ecuacion del intro va en DOS formulas (reactivos con la flecha, y productos): una formula no se parte de
  // renglon (MathText es nowrap) y la de la glucosa entera casi no cabe en la leyenda de un celular
  const ecuacionTex =
    rel.tipo === "reaccion"
      ? [rel.reaccion.reactivos, rel.reaccion.productos]
          .map((xs) => xs.map(([k, f]) => `${k > 1 ? k : ""}${formulaTex(f)}`).join("+"))
          .join("\\longrightarrow$ $")
      : "";
  const unidadPedida = pideU === "g" ? "gramos" : "moles";
  let intro: string;
  if (rel.tipo === "atomos") {
    intro = `Queremos saber cuántos moles de átomos de ${NOMBRE_ELEMENTO[rel.elemento]} hay en $${masa}\\ \\text{g}$ de ${nombreSust(A)}. Vamos a escribir cada paso, como a lápiz.`;
  } else {
    const lA = idEspecie.get(A)!.lado;
    const lB = idEspecie.get(rel.pedido)!.lado;
    const verbo = lA === "R" && lB === "P" ? "se forman con" : lA === "P" && lB === "R" ? "se necesitan para formar" : lA === "R" ? "reaccionan con" : "se forman junto con";
    intro = `En la reacción $${ecuacionTex}$, queremos saber cuántos ${unidadPedida} de ${nombreSust(rel.pedido)} ${verbo} $${masa}\\ \\text{g}$ de ${nombreSust(A)}. Vamos a escribir cada paso, como a lápiz.`;
  }
  foto();

  // ----- 1) por que no se pasa directo
  if (rel.tipo === "atomos") {
    paso({
      fusiones: [],
      resaltar: ["ug", "uq"],
      texto: `Nos dan gramos de ${SUSTANCIAS[A]} y nos piden moles de átomos de ${NOMBRE_ELEMENTO[rel.elemento]}. Gramos y moles son unidades distintas: no se pasa de una a otra directo.`,
      porque: `Los gramos miden cuánto pesa algo y los moles cuentan partículas. El puente entre los dos es la masa molar, lo que pesa un mol.`,
      regla: `$\\text{g}\\ \\rightarrow\\ \\text{mol}\\ \\rightarrow\\ \\text{mol de cada elemento}$`,
    });
  } else {
    paso({
      fusiones: [],
      resaltar: ["ug", "uq", "a0", "b0"],
      texto: `Nos dan gramos de ${SUSTANCIAS[A]} y nos piden ${unidadPedida} de ${SUSTANCIAS[rel.pedido]}: son sustancias distintas, así que no se pasa de una a otra directo.`,
      porque: `La ecuación balanceada relaciona las sustancias contando moles, no gramos. Por eso el camino pasa por los moles.`,
      regla:
        rel.pide === "g"
          ? `$\\text{g A}\\ \\rightarrow\\ \\text{mol A}\\ \\rightarrow\\ \\text{mol B}\\ \\rightarrow\\ \\text{g B}$`
          : `$\\text{g A}\\ \\rightarrow\\ \\text{mol A}\\ \\rightarrow\\ \\text{mol B}$`,
    });
    // ----- 2) la ecuacion esta balanceada: se cuentan los atomos a cada lado
    const izq = contarLado(rel.reaccion.reactivos);
    const der = contarLado(rel.reaccion.productos);
    const cuentas = Object.keys(izq).map((e) => `$\\mathrm{${e}}$: $${izq[e]}$ y $${der[e]}$`);
    paso({
      fusiones: [],
      resaltar: E.filter((f) => !f.op && !f.salto).map((f) => f.id),
      texto: `Antes de usar la ecuación comprobamos que está balanceada: contamos los átomos de cada elemento a la izquierda y a la derecha. ${cuentas.join("; ")}.`,
      porque: `En una reacción los átomos no se crean ni se destruyen, solo se reacomodan: cada elemento tiene que sumar lo mismo a los dos lados. El número de adelante multiplica a toda la fórmula.`,
      regla: `$m_{\\text{reactivos}}=m_{\\text{productos}}$`,
    });
  }

  // ----- 3) la cadena: el dato se copia en un renglon nuevo
  C = [
    { id: "SC", tex: "", salto: true },
    { id: "cm", tex: col(COLOR.dato, `${masa}`) },
    { id: "cu", tex: UNIDAD.g },
    { id: "cs", tex: formulaTex(A) },
  ];
  paso({
    fusiones: [],
    brotes: [
      { desde: "m", hacia: "SC" },
      { desde: "m", hacia: "cm" },
      { desde: "ug", hacia: "cu" },
      { desde: "a0", hacia: "cs" },
    ],
    texto: `Copiamos el dato en un renglón nuevo. Lo vamos a multiplicar por factores de conversión, uno por vez, hasta que quede la unidad que piden.`,
    porque: `Un factor de conversión es una fracción con la misma cantidad arriba y abajo, escrita en unidades distintas: vale $1$, así que cambia la unidad sin cambiar la cantidad.`,
    regla: `$\\text{dato}\\cdot\\dfrac{\\text{lo que quiero}}{\\text{lo que tengo}}$`,
  });

  // ----- 4) masa molar a la vista; deja en W la igualdad "1 mol X = M g" con ids `${P}1`, `${P}mol`, `${P}s`, `${P}e`, `${P}v`, `${P}g`
  const reglaM = `$M=n_{1}\\cdot A_{1}+n_{2}\\cdot A_{2}+\\dots$`;
  const masaMolarAVista = (pref: string, pp: string, f: string, primera: boolean): string => {
    const at = atomos(f)!;
    const nom = SUSTANCIAS[f];
    // a) masa atomica anotada debajo de cada elemento, de a uno
    at.forEach(([e], i) => {
      parchear(`${pp}${i}`, { debajo: col(COLOR.masa, `\\mathrm{${e}}=${MASAS_ATOMICAS[e]}`) });
      paso({
        fusiones: [],
        resaltar: [`${pp}${i}`],
        texto: `Buscamos en la tabla periódica la masa atómica del ${NOMBRE_ELEMENTO[e]}: $${MASAS_ATOMICAS[e]}$. La anotamos debajo del $\\mathrm{${e}}$.`,
        porque:
          i === 0 && primera
            ? `Para saber cuánto pesa un mol de ${nom} necesitamos lo que pesa cada átomo. La masa atómica, $A$, se lee en la tabla periódica; usamos el valor redondeado, como en el colegio.`
            : `Cada elemento tiene su propia masa atómica en la tabla periódica.`,
        regla: `$A_{\\mathrm{${e}}}=${MASAS_ATOMICAS[e]}$`,
      });
    });
    // b) un termino n·A por elemento: el subindice y la masa nacen de su elemento
    at.forEach(([e, n], i) => {
      const t: Ficha = { id: `${pref}t${i}`, tex: `${n}\\cdot ${MASAS_ATOMICAS[e]}` };
      // cuantos atomos hay: el subindice, o el 1 que no se ve
      const cuantos =
        n === 1
          ? `el $\\mathrm{${e}}$ no lleva subíndice, y eso quiere decir que hay $1$ átomo, de masa $${MASAS_ATOMICAS[e]}$`
          : `hay $${n}$ átomos (el subíndice), de masa $${MASAS_ATOMICAS[e]}$`;
      if (i === 0) {
        W = [{ id: `${pref}S`, tex: "", salto: true }, { id: `${pref}M`, tex: "M" }, { id: `${pref}e`, tex: "=", op: true }, t];
        paso({
          fusiones: [],
          brotes: [
            { desde: `${pp}0`, hacia: `${pref}S` },
            { desde: `${pp}0`, hacia: `${pref}M` },
            { desde: `${pp}0`, hacia: t.id },
          ],
          texto: `Calculamos la masa molar $M$ de $${formulaTex(f)}$: lo que pesan todos sus átomos juntos. ${at.length === 1 ? `Tiene un solo elemento, el ${NOMBRE_ELEMENTO[e]}` : `Empezamos por el ${NOMBRE_ELEMENTO[e]}`}: ${cuantos}. Escribimos $${n}\\cdot ${MASAS_ATOMICAS[e]}$.`,
          porque: `$M$ es lo que pesa un mol de la sustancia. Cada elemento aporta su número de átomos, $n$, por su masa atómica, $A$.`,
          regla: reglaM,
        });
      } else {
        W = [...W, { id: `${pref}p${i}`, tex: "+", op: true }, t];
        paso({
          fusiones: [],
          brotes: [{ desde: `${pp}${i}`, hacia: t.id }],
          texto: `Sumamos lo que aporta el ${NOMBRE_ELEMENTO[e]}: ${cuantos}. Escribimos $${n}\\cdot ${MASAS_ATOMICAS[e]}$.`,
          porque: `Se suma un término por cada elemento de la fórmula.`,
          regla: reglaM,
        });
      }
    });
    // c) cada producto en su paso
    at.forEach(([e, n], i) => {
      const v = n * MASAS_ATOMICAS[e];
      cambiar([`${pref}t${i}`], [{ id: `${pref}r${i}`, tex: `${v}` }]);
      paso({
        fusiones: [{ desde: [`${pref}t${i}`], hacia: `${pref}r${i}` }],
        texto: `Multiplicamos: $${n}\\cdot ${MASAS_ATOMICAS[e]}=${v}$.`,
        porque: n === 1 ? `Un solo átomo pesa lo que dice su masa atómica.` : `Cada uno de los $${n}$ átomos pesa $${MASAS_ATOMICAS[e]}$: juntos pesan $${n}$ veces $${MASAS_ATOMICAS[e]}$.`,
        regla: n === 1 ? `$1\\cdot A=A$` : `$n\\cdot A=A+A+\\dots+A$`,
      });
    });
    // d) sumar de a dos, de izquierda a derecha
    let actual = `${pref}r0`;
    let acum = atomos(f)![0][1] * MASAS_ATOMICAS[at[0][0]];
    for (let i = 1; i < at.length; i++) {
      const vi = at[i][1] * MASAS_ATOMICAS[at[i][0]];
      const nid = `${pref}sum${i}`;
      cambiar([actual, `${pref}p${i}`, `${pref}r${i}`], [{ id: nid, tex: `${acum + vi}` }]);
      paso({
        fusiones: [{ desde: [actual, `${pref}p${i}`, `${pref}r${i}`], hacia: nid }],
        texto: `Sumamos de a dos: $${acum}+${vi}=${acum + vi}$.`,
        porque: i === at.length - 1 ? `Es la última suma: la masa de la molécula es la suma de las masas de todos sus átomos.` : `Una suma por vez, de izquierda a derecha.`,
        regla: `$a+b=c$`,
      });
      acum += vi;
      actual = nid;
    }
    const M = acum;
    // e) "M" se lee como "1 mol pesa M gramos": se escribe la igualdad; las etiquetas ya cumplieron su papel
    at.forEach((_, i) => parchear(`${pp}${i}`, { debajo: undefined }));
    W = [
      W[0],
      { id: `${pref}1`, tex: "1" },
      { id: `${pref}mol`, tex: UNIDAD.mol },
      { id: `${pref}s`, tex: formulaTex(f) },
      W[2],
      { id: actual, tex: col(COLOR.masa, `${M}`) },
      { id: `${pref}g`, tex: UNIDAD.g },
    ];
    paso({
      fusiones: [{ desde: [`${pref}M`], hacia: [`${pref}1`, `${pref}mol`] }],
      brotes: [
        { desde: `${pp}0`, hacia: `${pref}s` },
        { desde: actual, hacia: `${pref}g` },
      ],
      texto: `La masa molar es lo que pesa $1$ mol: $1\\ \\text{mol}$ de ${nom} pesa $${M}\\ \\text{g}$. Lo escribimos así. Las masas atómicas que anotamos debajo ya cumplieron su papel.`,
      porque: `Las masas atómicas de la tabla son los gramos que pesa un mol de cada átomo; por eso la suma da los gramos que pesa un mol de ${nom}.`,
      regla: `$1\\ \\text{mol}=M\\ \\text{g}$`,
    });
    return actual;
  };

  /** la igualdad del renglon de trabajo VIAJA a la cadena como fraccion (la raya sale del =).
   *  `arriba`/`abajo`: [pieza de W de la que sale, id nuevo]; una pieza puede dar dos (la sustancia va arriba y abajo). */
  let nFactor = 0;
  const factor = (arriba: [string, string][], abajo: [string, string][], t: Omit<Transicion, "fusiones" | "brotes">) => {
    nFactor++;
    const F = `F${nFactor}`;
    const n = arriba.map(([o, nid]) => ({ id: nid, tex: pieza(o).tex }));
    const d = abajo.map(([o, nid]) => ({ id: nid, tex: pieza(o).tex }));
    const fr = frPiezas(F, n, d);
    const desde = W.map((f) => f.id);
    W = [];
    C = [...C, dot(`d${nFactor}`), fr];
    paso({
      fusiones: [{ desde, hacia: [F, ...n.map((f) => f.id), ...d.map((f) => f.id)], modo: "viajar" }],
      brotes: [...arriba, ...abajo].map(([o, nid]): Brote => ({ desde: o, hacia: nid })),
      ...t,
    });
    return F;
  };
  /** tacha una unidad (con su sustancia) que esta arriba y abajo */
  const tachar = (ids: string[], t: Omit<Transicion, "fusiones">) => {
    for (const id of ids) cambiar([id], []);
    paso({ fusiones: [{ desde: ids, hacia: null, modo: "tachar" }], ...t });
  };

  // ----- 5) masa molar del dato y primer factor (g abajo)
  const vA = masaMolarAVista("A", "a", A, true);
  factor(
    [
      ["A1", "F1n"],
      ["Amol", "F1nu"],
      ["As", "F1ns"],
    ],
    [
      [vA, "F1d"],
      ["Ag", "F1du"],
      ["As", "F1ds"],
    ],
    {
      texto: `Con esa igualdad armamos el factor de conversión y lo multiplicamos al dato: $1\\ \\text{mol}$ arriba y $${MA}\\ \\text{g}$ abajo. La igualdad se vuelve la raya de la fracción.`,
      porque: `Ponemos los gramos abajo para que queden enfrentados con los gramos del dato, que están arriba. Como $1$ mol de ${SUSTANCIAS[A]} y $${MA}$ g de ${SUSTANCIAS[A]} son lo mismo, la fracción vale $1$.`,
      regla: `$\\dfrac{1\\ \\text{mol}}{M\\ \\text{g}}=1$`,
    }
  );
  tachar(["cu", "cs", "F1du", "F1ds"], {
    texto: `Los gramos de ${SUSTANCIAS[A]} están arriba (en el dato) y abajo (en el factor): se tachan.`,
    porque: `Una misma unidad arriba y abajo se cancela, igual que un número dividido entre sí mismo da $1$.`,
    regla: `$\\dfrac{\\text{g}}{\\text{g}}=1$`,
  });

  // ----- 6) la relacion en moles: de la formula (subindice) o de la ecuacion (coeficientes)
  if (rel.tipo === "atomos") {
    const j = atA.findIndex(([e]) => e === rel.elemento);
    const X = `\\mathrm{${rel.elemento}}`;
    W = [
      { id: "RS", tex: "", salto: true },
      { id: "Ra", tex: col(COLOR.relacion, "1") },
      { id: "Rmol", tex: UNIDAD.mol },
      { id: "Rs", tex: formulaTex(A) },
      { id: "Rf", tex: "\\longleftrightarrow", op: true },
      { id: "Rb", tex: col(COLOR.relacion, `${rel.k}`) },
      { id: "Rmol2", tex: UNIDAD.mol },
      { id: "Rs2", tex: X },
    ];
    paso({
      fusiones: [],
      brotes: [
        { desde: "a0", hacia: "RS" },
        { desde: "a0", hacia: "Ra" },
        { desde: "a0", hacia: "Rmol" },
        { desde: "a0", hacia: "Rs" },
        { desde: `a${j}`, hacia: "Rb" },
        { desde: `a${j}`, hacia: "Rmol2" },
        { desde: `a${j}`, hacia: "Rs2" },
      ],
      texto:
        rel.k === 1
          ? `Cada molécula de ${SUSTANCIAS[A]} tiene $1$ átomo de ${NOMBRE_ELEMENTO[rel.elemento]}: el $\\mathrm{${rel.elemento}}$ no lleva subíndice. Contado en moles: $1$ mol de ${SUSTANCIAS[A]} tiene $1$ mol de átomos de ${NOMBRE_ELEMENTO[rel.elemento]}.`
          : `Cada molécula de ${SUSTANCIAS[A]} tiene $${rel.k}$ átomos de ${NOMBRE_ELEMENTO[rel.elemento]}: es el subíndice de $${elemTex(rel.elemento, rel.k)}$. Contado en moles: $1$ mol de ${SUSTANCIAS[A]} tiene $${rel.k}$ mol de átomos de ${NOMBRE_ELEMENTO[rel.elemento]}.`,
      porque: `Un mol es siempre la misma cantidad de partículas. Si una molécula trae $${rel.k}$ ${rel.k === 1 ? "átomo" : "átomos"} de $${X}$, un mol de moléculas trae $${rel.k}$ ${rel.k === 1 ? "mol" : "moles"} de átomos de $${X}$.`,
      // corta: una formula no se parte de renglon (MathText es nowrap) y en un celular no cabia
      regla: `$1\\ \\text{mol de}\\ \\dots\\mathrm{X}_{n}\\dots\\longleftrightarrow n\\ \\text{mol de X}$`,
    });
  } else {
    const ea = idEspecie.get(A)!;
    const eb = idEspecie.get(rel.pedido)!;
    const srcA = ea.k ?? ea.e;
    const srcB = eb.k ?? eb.e;
    W = [
      { id: "RS", tex: "", salto: true },
      { id: "Ra", tex: col(COLOR.relacion, `${rel.a}`) },
      { id: "Rmol", tex: UNIDAD.mol },
      { id: "Rs", tex: formulaTex(A) },
      { id: "Rf", tex: "\\longleftrightarrow", op: true },
      { id: "Rb", tex: col(COLOR.relacion, `${rel.b}`) },
      { id: "Rmol2", tex: UNIDAD.mol },
      { id: "Rs2", tex: formulaTex(rel.pedido) },
    ];
    const sinCoef = [ea, eb].filter((x) => x.coef === 1).map((x) => (x === ea ? A : rel.pedido));
    const lA = ea.lado;
    const lB = eb.lado;
    const frase =
      lA === "R" && lB === "P"
        ? `por cada $${rel.a}$ mol de ${SUSTANCIAS[A]} que reaccionan se forman $${rel.b}$ mol de ${SUSTANCIAS[rel.pedido]}`
        : lA === "P" && lB === "R"
          ? `para formar $${rel.a}$ mol de ${SUSTANCIAS[A]} se necesitan $${rel.b}$ mol de ${SUSTANCIAS[rel.pedido]}`
          : lA === "R"
            ? `$${rel.a}$ mol de ${SUSTANCIAS[A]} reaccionan con $${rel.b}$ mol de ${SUSTANCIAS[rel.pedido]}`
            : `junto con $${rel.a}$ mol de ${SUSTANCIAS[A]} se forman $${rel.b}$ mol de ${SUSTANCIAS[rel.pedido]}`;
    paso({
      fusiones: [],
      brotes: [
        { desde: srcA, hacia: "RS" },
        { desde: srcA, hacia: "Ra" },
        { desde: srcA, hacia: "Rmol" },
        { desde: ea.e, hacia: "Rs" },
        { desde: srcB, hacia: "Rb" },
        { desde: srcB, hacia: "Rmol2" },
        { desde: eb.e, hacia: "Rs2" },
      ],
      texto: `De la ecuación balanceada leemos los números de adelante (los coeficientes) de las dos sustancias: $${rel.a}$ para $${formulaTex(A)}$ y $${rel.b}$ para $${formulaTex(rel.pedido)}$. Quieren decir que ${frase}.${sinCoef.length > 0 ? ` Delante de ${sinCoef.map((f) => `$${formulaTex(f)}$`).join(" y de ")} no hay número: eso significa $1$.` : ""}`,
      porque: `Los coeficientes cuentan moléculas, y un mol es siempre la misma cantidad de moléculas: por eso también cuentan moles.`,
      regla: `$a\\,\\text{A}\\rightarrow b\\,\\text{B}\\ \\Rightarrow\\ a\\ \\text{mol A}\\longleftrightarrow b\\ \\text{mol B}$`,
    });
  }
  const nomB = rel.tipo === "atomos" ? `átomos de ${NOMBRE_ELEMENTO[rel.elemento]}` : SUSTANCIAS[rel.pedido];
  factor(
    [
      ["Rb", "F2n"],
      ["Rmol2", "F2nu"],
      ["Rs2", "F2ns"],
    ],
    [
      ["Ra", "F2d"],
      ["Rmol", "F2du"],
      ["Rs", "F2ds"],
    ],
    {
      texto: `Con esa relación armamos el segundo factor: lo que buscamos (mol de ${nomB}) arriba y lo que ya tenemos (mol de ${SUSTANCIAS[A]}) abajo.`,
      porque: `Así los moles de ${SUSTANCIAS[A]} quedan arriba en el primer factor y abajo en este, y se van a poder tachar.`,
      regla: `$\\dfrac{\\text{mol de lo que buscamos}}{\\text{mol de lo que tenemos}}$`,
    }
  );
  tachar(["F1nu", "F1ns", "F2du", "F2ds"], {
    texto: `Los moles de ${SUSTANCIAS[A]} están arriba (en el primer factor) y abajo (en el segundo): se tachan.`,
    porque: `Una misma unidad arriba y abajo se cancela.`,
    regla: `$\\dfrac{\\text{mol}}{\\text{mol}}=1$`,
  });

  // ----- 7) si piden gramos: masa molar de lo pedido y tercer factor (mol abajo)
  let MB = 1;
  let quedan = ["F2nu", "F2ns"];
  if (rel.tipo === "reaccion" && rel.pide === "g") {
    const B = rel.pedido;
    MB = masaMolar(B);
    const vB = masaMolarAVista("B", "b", B, false);
    factor(
      [
        [vB, "F3n"],
        ["Bg", "F3nu"],
        ["Bs", "F3ns"],
      ],
      [
        ["B1", "F3d"],
        ["Bmol", "F3du"],
        ["Bs", "F3ds"],
      ],
      {
        texto: `Con esa igualdad armamos el tercer factor, esta vez al revés: $${MB}\\ \\text{g}$ arriba y $1\\ \\text{mol}$ abajo.`,
        porque: `Ahora los moles van abajo, para que se tachen con los moles de ${SUSTANCIAS[B]} que quedaron arriba, y arriba queden los gramos que piden.`,
        regla: `$\\dfrac{M\\ \\text{g}}{1\\ \\text{mol}}=1$`,
      }
    );
    tachar(["F2nu", "F2ns", "F3du", "F3ds"], {
      texto: `Los moles de ${SUSTANCIAS[B]} están arriba (en el segundo factor) y abajo (en el tercero): se tachan.`,
      porque: `Una misma unidad arriba y abajo se cancela.`,
      regla: `$\\dfrac{\\text{mol}}{\\text{mol}}=1$`,
    });
    quedan = ["F3nu", "F3ns"];
  }

  // ----- 8) todo en una sola fraccion: los numeros viajan (arriba con arriba, abajo con abajo) y la unidad que queda, al final
  const factores = Array.from({ length: nFactor }, (_, i) => `F${i + 1}`);
  const arribaIds = ["cm", ...factores.map((F) => `${F}n`)];
  const abajoIds = factores.map((F) => `${F}d`);
  const conPuntos = (ids: string[], pref: string): Ficha[] =>
    ids.flatMap((id, i) => [...(i > 0 ? [dot(`${pref}d${i}`)] : []), { id: `${pref}${i}`, tex: pieza(id).tex }]);
  const Tn = conPuntos(arribaIds, "Tn");
  const Td = conPuntos(abajoIds, "Td");
  const FT = frPiezas("FT", Tn, Td);
  const unidadFinal: Ficha[] = [
    { id: "lu", tex: pieza(quedan[0]).tex },
    { id: "ls", tex: pieza(quedan[1]).tex },
  ];
  const desdeC = aplanar(C)
    .map((f) => f.id)
    .filter((id) => id !== "SC");
  C = [C[0], FT, ...unidadFinal];
  const nombreUnidad = `$${pieza("lu").tex}$ de ${nomB}`;
  paso({
    fusiones: [{ desde: desdeC, hacia: ["FT", ...aplanar([FT]).slice(1).map((f) => f.id), "lu", "ls"], modo: "viajar" }],
    brotes: [
      ...arribaIds.map((o, i) => ({ desde: o, hacia: `Tn${i}` })),
      ...abajoIds.map((o, i) => ({ desde: o, hacia: `Td${i}` })),
      { desde: quedan[0], hacia: "lu" },
      { desde: quedan[1], hacia: "ls" },
    ],
    texto: `Ya se tacharon todas las unidades menos la que piden. Juntamos todo en una sola fracción: los números de arriba se multiplican arriba y los de abajo, abajo. La unidad que quedó, ${nombreUnidad}, pasa al final.`,
    porque: `Multiplicar fracciones es multiplicar los de arriba entre sí y los de abajo entre sí. El dato $${masa}$ es como $\\dfrac{${masa}}{1}$, por eso va arriba.`,
    regla: `$a\\cdot\\dfrac{b}{c}\\cdot\\dfrac{d}{e}=\\dfrac{a\\cdot b\\cdot d}{c\\cdot e}$`,
  });

  // ----- 9) multiplicar de a dos, primero arriba y despues abajo
  const valores = (ids: string[]) =>
    ids.map((id) => {
      const tex = pieza(id).tex.replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/, "$1");
      return Number(tex);
    });
  const multiplicar = (pref: string, vals: number[], donde: string) => {
    let actual = `${pref}0`;
    let acum = vals[0];
    for (let i = 1; i < vals.length; i++) {
      const nid = `${pref}p${i}`;
      const prod = acum * vals[i];
      cambiar([actual, `${pref}d${i}`, `${pref}${i}`], [{ id: nid, tex: `${prod}` }]);
      paso({
        fusiones: [{ desde: [actual, `${pref}d${i}`, `${pref}${i}`], hacia: nid }],
        texto: `Multiplicamos ${donde}, de a dos: $${acum}\\cdot ${vals[i]}=${prod}$.`,
        porque: vals[i] === 1 ? `Multiplicar por $1$ no cambia el número.` : acum === 1 ? `$1$ por cualquier número da ese mismo número.` : `Una multiplicación por vez, de izquierda a derecha.`,
        regla: vals[i] === 1 ? `$n\\cdot 1=n$` : acum === 1 ? `$1\\cdot n=n$` : `$(a\\cdot b)\\cdot c=a\\cdot(b\\cdot c)$`,
      });
      acum = prod;
      actual = nid;
    }
    return acum;
  };
  const vArriba = valores(arribaIds.map((_, i) => `Tn${i}`));
  const vAbajo = valores(abajoIds.map((_, i) => `Td${i}`));
  const N = multiplicar("Tn", vArriba, "arriba");
  const Dd = multiplicar("Td", vAbajo, "abajo");
  const cent = (N * 100) / Dd;
  const res = decimal(cent);

  // ----- 10) dividir una vez
  C = [C[0], { id: "res", tex: res }, ...unidadFinal];
  paso({
    fusiones: [{ desde: ["FT"], hacia: "res" }],
    texto: N === Dd ? `Arriba y abajo quedó el mismo número: $\\dfrac{${N}}{${Dd}}=1$.` : `Dividimos: $\\dfrac{${N}}{${Dd}}=${res}$. Se comprueba al revés: $${res}\\cdot ${Dd}=${N}$.`,
    porque: N === Dd ? `Un número dividido entre sí mismo da $1$.` : `La raya de la fracción es una división: el número de arriba entre el de abajo.`,
    regla: N === Dd ? `$\\dfrac{a}{a}=1$` : `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
  });

  // ----- 11) la respuesta viaja al "?" del enunciado y se comprueba la unidad
  cambiar(["q"], [{ id: "qR", tex: res }]);
  paso({
    fusiones: [{ desde: ["q"], hacia: "qR", modo: "viajar" }],
    brotes: [{ desde: "res", hacia: "qR" }],
    texto:
      rel.tipo === "atomos"
        ? `Respuesta: en $${masa}\\ \\text{g}$ de ${SUSTANCIAS[A]} hay $${res}$ mol de átomos de ${NOMBRE_ELEMENTO[rel.elemento]}. Lo escribimos en el lugar del signo de pregunta.`
        : `Respuesta: son $${res}\\ ${UNIDAD[rel.pide]}$ de ${SUSTANCIAS[rel.pedido]}. Lo escribimos en el lugar del signo de pregunta.`,
    porque: `El número que quedó, con la unidad que quedó, responde lo que pide el enunciado.`,
    regla: `$\\text{dato}\\cdot\\text{factor}\\cdot\\text{factor}=\\text{respuesta}$`,
  });
  paso({
    fusiones: [],
    resaltar: ["lu", "ls", "uq", ...P.filter((f) => /^(x|b\d+)$/.test(f.id)).map((f) => f.id)],
    texto: `Comprobamos con el enunciado: en la cuenta sobrevivió solo ${nombreUnidad}, y eso es justo lo que piden. Si hubiera quedado otra unidad, algún factor estaría al revés.`,
    porque: `Las unidades que se tachan y la que queda son el control de que la cuenta está bien armada.`,
    regla: `$\\dfrac{\\text{g}}{\\text{g}}=1\\quad\\text{y}\\quad\\dfrac{\\text{mol}}{\\text{mol}}=1$`,
  });

  return {
    demo: { titulo: "", nota: "", intro, estados, transiciones: trans },
    resumen: {
      masa,
      MA,
      MB,
      a: rel.tipo === "atomos" ? 1 : rel.a,
      b: rel.tipo === "atomos" ? rel.k : rel.b,
      N,
      D: Dd,
      centesimas: cent,
    },
  };
}

// ---------------------------------------------------------------------------
/** moles de atomos de un elemento en cierta masa de un compuesto (glucosa -> oxigeno). Validar antes con validarMolesDeAtomos. */
export function molesDeAtomos(compuesto: string, elemento: string, masa: number): Resultado {
  const k = atomos(compuesto)!.find(([e]) => e === elemento)![1];
  return construir(masa, compuesto, { tipo: "atomos", elemento, k });
}

/** de gramos de una sustancia a moles o gramos de otra, con la ecuacion balanceada. Validar antes con validarEstequiometria. */
export function estequiometria(reaccion: string, dado: string, pedido: string, masa: number, pide: Pide): Resultado {
  const r = REACCIONES[reaccion];
  const todas = [...r.reactivos, ...r.productos];
  const a = todas.find(([, f]) => f === dado)![0];
  const b = todas.find(([, f]) => f === pedido)![0];
  return construir(masa, dado, { tipo: "reaccion", reaccion: r, pedido, a, b, pide });
}
