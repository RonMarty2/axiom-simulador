// Ecuacion de segundo grado por formula general. Patron "ANOTAR Y REEMPLAZAR":
//   1. la ecuacion tal como viene y POR QUE no se puede despejar x directamente;
//   2. ORDENARLA a la forma ax^2 + bx + c = 0 (pasar terminos, agrupar semejantes, sumar constantes), un termino por paso;
//   3. ETIQUETAR debajo de cada termino la letra que le toca (a = 1, b = -5, c = 6), cada letra con su color;
//   4. escribir la formula DEBAJO, en PIEZAS con id (-b, b^2, 4ac, 2a, la raiz, el mas o menos), con letras del mismo color;
//   5. REEMPLAZAR una letra por vez: el valor VUELA desde su etiqueta (brote) hasta el lugar de la letra;
//   6. CALCULAR una operacion por paso, y cada resultado intermedio (25 = 5.5, 36 = 6.6 = 6^2) es un estado de la hoja;
//   7. COMPROBAR cada solucion en la ecuacion ORIGINAL, mostrando la sustitucion y cada cuenta.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas y etiquetas van en LaTeX sin $. Las barras van dobles.
// La formula es una fraccion CON PIEZAS (`frPiezas`, raya real desde que aparece) y la raiz abarca su radicando (`raiz`):
// cada letra es una pieza con id dentro de la raya, asi que su valor puede volar hasta ella.
import { aplanar, frPiezas, raiz, sustituir, type Ficha, type Transicion, type Fusion, type Brote } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

type Clase = "a" | "b" | "c";
const CLASES: Clase[] = ["a", "b", "c"];
const COLOR: Record<Clase, string> = { a: "#2563eb", b: "#16a34a", c: "#ea580c" };
const ID: Record<Clase, string> = { a: "A", b: "B", c: "C" };
const col = (k: Clase, tex: string) => `\\textcolor{${COLOR[k]}}{${tex}}`;

const par = (n: number) => (n < 0 ? `(${n})` : `${n}`);
const raizEntera = (n: number): number | null => {
  if (n < 0) return null;
  const r = Math.round(Math.sqrt(n));
  return r * r === n ? r : null;
};
const cuerpo = (k: Clase, abs: number) => (k === "a" ? (abs === 1 ? "x^{2}" : `${abs}x^{2}`) : k === "b" ? (abs === 1 ? "x" : `${abs}x`) : `${abs}`);
/** termino con su signo; el primero de un lado no lleva "+" */
const termino = (k: Clase, coef: number, primero: boolean) => `${coef < 0 ? "-" : primero ? "" : "+"}${cuerpo(k, Math.abs(coef))}`;
const nombre = (k: Clase) => (k === "a" ? "los de $x^{2}$" : k === "b" ? "los de $x$" : "los números solos");

export interface Lado {
  a: number;
  b: number;
  c: number;
}

/** solo se animan ecuaciones con soluciones enteras, y que despues de ordenar tengan los tres terminos */
export function validarCuadratica(a1: number, b1: number, c1: number, a2 = 0, b2 = 0, c2 = 0): string | null {
  const todos = [a1, b1, c1, a2, b2, c2];
  if (!todos.every(Number.isInteger)) return "Escribe números enteros.";
  if (todos.some((n) => Math.abs(n) > 30)) return "Usa números entre -30 y 30.";
  if (a1 < 1) return "El primer número (el de x² del lado izquierdo) debe ser 1 o más.";
  const [a, b, c] = [a1 - a2, b1 - b2, c1 - c2];
  if (a < 1 || a > 5) return `Después de ordenar, el número de x² queda ${a}; debe estar entre 1 y 5.`;
  if (b === 0 || c === 0) return `Después de ordenar queda ${b === 0 ? "sin término con x" : "sin número solo"}: esa ecuación se resuelve más fácil sin la fórmula general. Prueba con otros números.`;
  if (Math.abs(b) > 20 || Math.abs(c) > 30) return "Después de ordenar, b debe estar entre -20 y 20, y c entre -30 y 30.";
  const D = b * b - 4 * a * c;
  const d = raizEntera(D);
  if (d === null) return "Con estos números el discriminante no es un cuadrado perfecto (o es negativo), y las soluciones no son enteras. Prueba, por ejemplo, 1, -5, 6.";
  if ((-b + d) % (2 * a) !== 0 || (-b - d) % (2 * a) !== 0) return "Con estos números las soluciones no son enteras. Prueba, por ejemplo, 1, -5, 6.";
  return null;
}

// ---------------------------------------------------------------------------
// Comprobacion: un termino de la ecuacion original pasa por etapas (sustituir, potencia como producto, potencia,
// multiplicar). Cada etapa es un texto que existe como pieza de la hoja.
interface Termino {
  k: Clase;
  m: number;
  neg: boolean;
  lead: boolean;
}
const terminosDe = (cs: Record<Clase, number>): Termino[] => {
  const t: Termino[] = [];
  for (const k of CLASES) if (cs[k] !== 0) t.push({ k, m: Math.abs(cs[k]), neg: cs[k] < 0, lead: t.length === 0 });
  return t;
};
// k1 sustituir, k3 calcular la potencia (n^2 = n.n ya se enseno al calcular b^2), k4 multiplicar por el coeficiente
type Etapa = "k1" | "k3" | "k4";
interface Etapas {
  ini: string;
  /** valor con el que el termino entra a la suma (el primero lleva su signo; los demas, su magnitud) */
  val: number;
  tex: Partial<Record<Etapa, string>>;
  frase: Partial<Record<Etapa, string>>;
}
function etapasTermino(t: Termino, s: number): Etapas {
  const pre = t.lead && t.neg ? "-" : "";
  const sg = pre ? -1 : 1;
  const mc = t.m > 1 ? `${t.m}\\cdot ` : "";
  if (t.k === "c") return { ini: `${pre}${t.m}`, val: sg * t.m, tex: {}, frase: {} };
  if (t.k === "b") {
    const val = sg * t.m * s;
    const k1 = `${pre}${mc}${par(s)}`;
    const e: Etapas = { ini: `${pre}${t.m > 1 ? t.m : ""}x`, val, tex: { k1 }, frase: {} };
    // un termino que no es el primero y vale menos que cero se escribe entre parentesis: "+(-10)", nunca "+-10"
    const fin = !t.lead && val < 0 ? `(${val})` : `${val}`;
    if (fin !== k1) {
      e.tex.k4 = fin;
      e.frase.k4 = t.m > 1 ? `$${pre}${t.m}\\cdot ${par(s)}=${val}$` : pre ? `$-${par(s)}=${val}$` : `$(${s})=${s}$`;
    }
    return e;
  }
  const sq = s * s;
  const val = sg * t.m * sq;
  const k3 = `${pre}${mc}${sq}`;
  const e: Etapas = {
    ini: `${pre}${t.m > 1 ? t.m : ""}x^{2}`,
    val,
    tex: { k1: `${pre}${mc}${par(s)}^{2}`, k3 },
    frase: { k3: `$${par(s)}^{2}=${sq}$` },
  };
  if (`${val}` !== k3) {
    e.tex.k4 = `${val}`;
    e.frase.k4 = `$${pre}${t.m}\\cdot ${sq}=${val}$`;
  }
  return e;
}

/** Version RAPIDA: lo que se escribe en el examen (ordenar, a b c, formula, reemplazar, calcular, soluciones). Sin etiquetas de
 *  cada termino, sin la fila de referencia y sin comprobar las soluciones en la ecuacion original. Mismo `resumen` que la explicada. */
function cuadraticaRapida(a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): Resultado {
  const izqCoef: Record<Clase, number> = { a: a1, b: b1, c: c1 };
  const derCoef: Record<Clase, number> = { a: a2, b: b2, c: c2 };
  const a = a1 - a2;
  const b = b1 - b2;
  const c = c1 - c2;
  const fin: Record<Clase, number> = { a, b, c };
  const D = b * b - 4 * a * c;
  const d = raizEntera(D) as number;
  const P = b * b;
  const Q = 4 * a * c;
  const den = 2 * a;
  const x1 = (-b + d) / den;
  const x2 = (-b - d) / den;
  const S = (id: string): Ficha => ({ id, tex: "", salto: true });
  const O = (id: string, tex: string): Ficha => ({ id, tex, op: true });
  const Pz = (id: string, tex: string): Ficha => ({ id, tex });

  // la ecuacion tal como viene
  const izq: Ficha[] = [];
  const der: Ficha[] = [];
  for (const k of CLASES) if (izqCoef[k] !== 0) izq.push(Pz(ID[k], termino(k, izqCoef[k], izq.length === 0)));
  for (const k of CLASES) if (derCoef[k] !== 0) der.push(Pz(`m${ID[k]}`, termino(k, derCoef[k], der.length === 0)));
  if (der.length === 0) der.push(Pz("z", "0"));
  const yaEstandar = der.length === 1 && der[0].id === "z" && izq.length === 3 && izq.every((f, i) => f.id === ID[CLASES[i]]);
  const intro = `Queremos resolver $${izq.map((f) => f.tex).join("")}=${der.map((f) => f.tex).join("")}$. Es la versión rápida: lo que se escribe en el examen.`;

  let eqRow: Ficha[] = [...izq, O("eq", "="), ...der];
  let rAbc: Ficha[] = [];
  let rF: Ficha[] = [];
  const estados: Ficha[][] = [JSON.parse(JSON.stringify(eqRow))];
  const trans: Transicion[] = [];
  const paso = (t: Transicion) => {
    estados.push(JSON.parse(JSON.stringify([...eqRow, ...rAbc, ...rF])));
    trans.push(t);
  };

  // 1) ordenar: cada clase de terminos (los de x^2, los de x, los numeros) se junta de los dos lados en un solo termino
  const idFin = {} as Record<Clase, string>;
  if (!yaEstandar) {
    const fusiones: Fusion[] = [];
    const nuevos: Ficha[] = [];
    for (const k of CLASES) {
      const desde = [...(izqCoef[k] !== 0 ? [ID[k]] : []), ...(derCoef[k] !== 0 ? [`m${ID[k]}`] : [])];
      if (derCoef[k] === 0) {
        idFin[k] = ID[k];
        nuevos.push(Pz(ID[k], termino(k, fin[k], k === "a")));
      } else {
        idFin[k] = `N${ID[k]}`;
        nuevos.push(Pz(`N${ID[k]}`, termino(k, fin[k], k === "a")));
        fusiones.push({ desde, hacia: `N${ID[k]}` });
      }
    }
    eqRow = [...nuevos, O("eq", "="), Pz("z", "0")];
    paso({
      fusiones,
      brotes: [{ desde: "eq", hacia: "z" }],
      texto: `La fórmula general pide la forma $ax^{2}+bx+c=0$. Pasamos todo a la izquierda (cada término que cruza el igual cambia de signo) y juntamos los semejantes: $${nuevos.map((f) => f.tex).join("")}=0$.`,
      porque: `La fórmula general solo funciona si la ecuación tiene un cero de un lado y todos los términos del otro.`,
      regla: `$ax^{2}+bx+c=0$`,
    });
  } else {
    for (const k of CLASES) idFin[k] = ID[k];
  }

  // 2) a, b y c
  rAbc = [S("S1"), Pz("Ra", `a=${a}`), O("Rc1", ","), Pz("Rb", `b=${b}`), O("Rc2", ","), Pz("Rc", `c=${c}`)];
  paso({
    fusiones: [],
    brotes: [
      { desde: idFin.a, hacia: "S1" },
      { desde: idFin.a, hacia: "Ra" },
      { desde: idFin.b, hacia: "Rb" },
      { desde: idFin.c, hacia: "Rc" },
    ],
    texto: `Comparamos con $ax^{2}+bx+c=0$: $a=${a}$ es el número de $x^{2}$, $b=${b}$ es el de $x$ y $c=${c}$ es el número solo (con su signo).`,
    porque: `Cada letra de la fórmula es el número que acompaña a su término, con el signo que tiene.`,
    regla: `$a=${a},$ $b=${b},$ $c=${c}$`,
  });

  // 3) la formula, con letras
  const frac = (n: Ficha[], dd: Ficha[]) => frPiezas("Ff", n, dd);
  const lettersRad: Ficha[] = [Pz("Fb2", "b^{2}"), O("Fmn", "-"), Pz("F4", "4"), O("Fmc", "\\cdot"), Pz("Fa", "a"), O("Fmd", "\\cdot"), Pz("Fc", "c")];
  rF = [S("S2"), Pz("Fx", "x"), O("Fe", "="), frac([Pz("Fnb", "-b"), O("Fpm", "\\pm"), raiz("Fr", lettersRad)], [Pz("Fd2", "2"), O("Fdm", "\\cdot"), Pz("Fda", "a")])];
  paso({
    fusiones: [],
    brotes: [
      { desde: "Ra", hacia: "S2" },
      { desde: "Ra", hacia: "Fx" },
      { desde: "Ra", hacia: "Ff" },
    ],
    texto: `Escribimos la fórmula general, todavía con letras.`,
    porque: `Esta fórmula da las dos soluciones de cualquier ecuación $ax^{2}+bx+c=0$.`,
    regla: `$x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$`,
  });

  // 4) reemplazar las letras
  const rad2: Ficha[] = [Pz("Gb2", `${par(b)}^{2}`), O("Fmn", "-"), Pz("F4", "4"), O("Fmc", "\\cdot"), Pz("Ga", `${par(a)}`), O("Fmd", "\\cdot"), Pz("Gc", `${par(c)}`)];
  rF = [S("S2"), Pz("Fx", "x"), O("Fe", "="), frac([Pz("Gnb", `-${par(b)}`), O("Fpm", "\\pm"), raiz("Fr", rad2)], [Pz("Fd2", "2"), O("Fdm", "\\cdot"), Pz("Gda", `${par(a)}`)])];
  paso({
    fusiones: [
      { desde: ["Fnb"], hacia: "Gnb" },
      { desde: ["Fb2"], hacia: "Gb2" },
      { desde: ["Fa"], hacia: "Ga" },
      { desde: ["Fc"], hacia: "Gc" },
      { desde: ["Fda"], hacia: "Gda" },
    ],
    texto: `Reemplazamos cada letra por su número: $a=${a}$, $b=${b}$ y $c=${c}$. Los números negativos van entre paréntesis.`,
    porque: `Cada letra se cambia por su valor, con su signo.`,
  });

  // 5) las cuentas sueltas: -b, b^2, 4ac y 2a
  rF = [
    S("S2"),
    Pz("Fx", "x"),
    O("Fe", "="),
    frac([Pz("Hnb", `${-b}`), O("Fpm", "\\pm"), raiz("Fr", [Pz("Hb2", `${P}`), O("Fmn", "-"), Pz("Hq", `${par(Q)}`)])], [Pz("Hd", `${den}`)]),
  ];
  paso({
    fusiones: [
      { desde: ["Gnb"], hacia: "Hnb" },
      { desde: ["Gb2"], hacia: "Hb2" },
      { desde: ["F4", "Fmc", "Ga", "Fmd", "Gc"], hacia: "Hq" },
      { desde: ["Fd2", "Fdm", "Gda"], hacia: "Hd" },
    ],
    texto: `Hacemos las cuentas sueltas: $-(${b})=${-b}$, $(${b})^{2}=${P}$, $4\\cdot ${par(a)}\\cdot ${par(c)}=${Q}$ y $2\\cdot ${a}=${den}$.`,
    porque: `Primero se resuelven las potencias y los productos; el signo menos delante de un paréntesis cambia el signo del número.`,
  });

  // 6) el discriminante
  rF = [S("S2"), Pz("Fx", "x"), O("Fe", "="), frac([Pz("Hnb", `${-b}`), O("Fpm", "\\pm"), raiz("Fr", [Pz("HD", `${D}`)])], [Pz("Hd", `${den}`)])];
  paso({
    fusiones: [{ desde: ["Hb2", "Fmn", "Hq"], hacia: "HD" }],
    texto: `Restamos dentro de la raíz: $${P}-${par(Q)}=${D}$.`,
    porque: `Lo de adentro de la raíz es el discriminante $b^{2}-4ac$: dice si las soluciones son enteras.`,
    regla: `$D=b^{2}-4ac$`,
  });

  // 7) la raiz
  rF = [S("S2"), Pz("Fx", "x"), O("Fe", "="), frac([Pz("Hnb", `${-b}`), O("Fpm", "\\pm"), Pz("Hr", `${d}`)], [Pz("Hd", `${den}`)])];
  paso({
    fusiones: [{ desde: ["Fr"], hacia: "Hr" }],
    texto: `La raíz: $\\sqrt{${D}}=${d}$, porque $${d}\\cdot ${d}=${D}$.`,
    porque: `La raíz cuadrada es el número que, multiplicado por sí mismo, da lo de adentro.`,
    regla: `$\\sqrt{a\\cdot a}=a$`,
  });

  // 8) separar el mas o menos en dos soluciones (o una sola si la raiz es 0)
  const suma = (s: string) => `${-b}${s}${d}`;
  if (d === 0) {
    rF = [S("S2"), Pz("Y1", `x=\\dfrac{${-b}}{${den}}`)];
    paso({
      fusiones: [{ desde: ["Fx", "Fe", "Ff"], hacia: "Y1" }],
      texto: `La raíz es $0$, así que $\\pm 0$ no cambia nada: hay una sola solución, $x=\\dfrac{${-b}}{${den}}$.`,
      porque: `Sumar o restar cero da lo mismo: las dos soluciones coinciden.`,
    });
    rF = [S("S2"), Pz("Z1", `x=${x1}`)];
    paso({
      fusiones: [{ desde: ["Y1"], hacia: "Z1" }],
      texto: `Dividimos: $\\dfrac{${-b}}{${den}}=${x1}$. La solución es $x=${x1}$.`,
      porque: `La raya de la fracción es una división.`,
    });
  } else {
    rF = [S("S2"), Pz("Y1", `x_{1}=\\dfrac{${suma("+")}}{${den}}`), O("Yc", ","), Pz("Y2", `x_{2}=\\dfrac{${suma("-")}}{${den}}`)];
    paso({
      fusiones: [{ desde: ["Fx", "Fe", "Ff"], hacia: ["Y1", "Yc", "Y2"] }],
      texto: `El $\\pm$ da dos soluciones: una sumando y otra restando. $x_{1}=\\dfrac{${suma("+")}}{${den}}$ y $x_{2}=\\dfrac{${suma("-")}}{${den}}$.`,
      porque: `El signo $\\pm$ quiere decir "más" en una solución y "menos" en la otra.`,
    });
    rF = [S("S2"), Pz("Z1", `x_{1}=${x1}`), O("Yc", ","), Pz("Z2", `x_{2}=${x2}`)];
    paso({
      fusiones: [
        { desde: ["Y1"], hacia: "Z1" },
        { desde: ["Y2"], hacia: "Z2" },
      ],
      texto: `Calculamos: $\\dfrac{${suma("+")}}{${den}}=${x1}$ y $\\dfrac{${suma("-")}}{${den}}=${x2}$. Las soluciones son $x_{1}=${x1}$ y $x_{2}=${x2}$.`,
      porque: `Primero se suma o resta arriba y después se divide entre $${den}$.`,
    });
  }

  return { demo: { titulo: "", nota: "", intro, estados, transiciones: trans }, resumen: { a, b, c, a1, b1, c1, a2, b2, c2, D, d, x1, x2 } };
}

// partes de un numero-resultado de la formula; ver cuadratica()
export function cuadratica(a1: number, b1: number, c1: number, a2 = 0, b2 = 0, c2 = 0, rapido = false): Resultado {
  if (rapido) return cuadraticaRapida(a1, b1, c1, a2, b2, c2);
  const izqCoef: Record<Clase, number> = { a: a1, b: b1, c: c1 };
  const derCoef: Record<Clase, number> = { a: a2, b: b2, c: c2 };
  const a = a1 - a2;
  const b = b1 - b2;
  const c = c1 - c2;
  const fin: Record<Clase, number> = { a, b, c };
  const D = b * b - 4 * a * c;
  const d = raizEntera(D) as number;
  const P = b * b;
  const Q = 4 * a * c;
  const den = 2 * a;
  const x1 = (-b + d) / den;
  const x2 = (-b - d) / den;
  const clases = CLASES;

  // ----- lienzo: izquierda, igual, derecha y piezas extra (la formula)
  let izq: Ficha[] = [];
  let der: Ficha[] = [];
  let extra: Ficha[] = [];
  const eq: Ficha = { id: "eq", tex: "=", op: true };
  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];
  const copia = (fs: Ficha[]) => fs.map((f) => ({ ...f }));
  let conIgual = true; // el signo = se dibuja mientras la ecuacion este a la vista
  // fila de REFERENCIA: copia del enunciado, nace en el primer paso y se queda abajo; la comprobacion final nace de ella
  const ref: Ficha[] = [];
  const foto = () => estados.push([...copia(izq), ...(conIgual ? [{ ...eq }] : []), ...copia(der), ...copia(extra), ...copia(ref)]);
  const poner = (id: string, parche: Partial<Ficha>) => {
    izq = izq.map((f) => (f.id === id ? { ...f, ...parche } : f));
    der = der.map((f) => (f.id === id ? { ...f, ...parche } : f));
  };
  const texDe = (id: string) => [...izq, ...der].find((f) => f.id === id)?.tex ?? "";

  // ----- estado inicial: la ecuacion tal como viene
  for (const k of clases) if (izqCoef[k] !== 0) izq.push({ id: ID[k], tex: termino(k, izqCoef[k], izq.length === 0) });
  for (const k of clases) if (derCoef[k] !== 0) der.push({ id: `m${ID[k]}`, tex: termino(k, derCoef[k], der.length === 0) });
  if (der.length === 0) der.push({ id: "z", tex: "0" });
  const yaEstandar = der.length === 1 && der[0].id === "z" && izq.length === 3 && izq.every((f, i) => f.id === ID[clases[i]]);
  const intro = `Queremos resolver $${[...izq].map((f) => f.tex).join("")}=${der.map((f) => f.tex).join("")}$. Vamos a escribir cada paso, como a lápiz.`;
  foto();

  // ----- 1) por que no se puede despejar
  const conX = [...izq, ...der].filter((f) => ["A", "B"].includes(f.id.replace(/^m/, ""))).map((f) => f.id);
  // la referencia: cada pieza nace de su par en la ecuacion que se ve
  const origenRef: Brote[] = [];
  const nuevaRef = (origen: string, f: Ficha) => {
    ref.push(f);
    origenRef.push({ desde: origen, hacia: f.id });
  };
  nuevaRef(izq[0].id, { id: "RefS", tex: "", salto: true });
  for (const k of clases) if (izqCoef[k] !== 0) nuevaRef(ID[k], { id: `Rl${ID[k]}`, tex: termino(k, izqCoef[k], ref.length === 1) });
  nuevaRef("eq", { id: "Re", tex: "=", op: true });
  if (!clases.some((k) => derCoef[k] !== 0)) nuevaRef("z", { id: "Rz", tex: "0" });
  let primeroDer = true;
  for (const k of clases) {
    if (derCoef[k] === 0) continue;
    nuevaRef(`m${ID[k]}`, { id: `Rr${ID[k]}`, tex: termino(k, derCoef[k], primeroDer) });
    primeroDer = false;
  }
  foto();
  trans.push({
    fusiones: [],
    brotes: origenRef,
    resaltar: conX,
    texto: yaEstandar
      ? `La $x$ aparece de dos formas, como $x^{2}$ y como $x$. Así no se puede despejar con las operaciones de siempre: usaremos la fórmula general. La ecuación ya está ordenada (todo a la izquierda y $0$ a la derecha), así que no hay que prepararla.`
      : `La $x$ aparece de dos formas, como $x^{2}$ y como $x$, y además hay términos en los dos lados. Así no se puede despejar con las operaciones de siempre: usaremos la fórmula general, pero primero hay que ordenar la ecuación.`,
    porque: `La fórmula general solo funciona si la ecuación tiene la forma $ax^{2}+bx+c=0$: todo de un lado y un cero del otro. Abajo queda una copia de la ecuación tal como vino, para comprobar las soluciones al final.`,
    regla: `$ax^{2}+bx+c=0$`,
  });

  // ----- 2) ordenar: pasar cada termino de la derecha a la izquierda
  if (!yaEstandar) {
    // Cada termino de la derecha SE ARRASTRA a la izquierda (la misma pieza viaja) y cambia de signo al cruzar la igualdad.
    for (const k of [...clases].reverse()) {
      if (derCoef[k] === 0) continue;
      const id = `m${ID[k]}`;
      const opuesto = termino(k, -derCoef[k], false);
      const original = texDe(id);
      der = der.filter((f) => f.id !== id);
      const vacia = der.filter((f) => f.id !== "z").length === 0;
      if (vacia) der.push({ id: "z", tex: "0" });
      izq.push({ id, tex: opuesto });
      foto();
      trans.push({
        fusiones: [],
        resaltar: [id],
        brotes: vacia ? [{ desde: id, hacia: "z" }] : undefined,
        texto: `Pasamos $${original}$ al lado izquierdo. Al cruzar la igualdad cambia de signo: ahora es $${opuesto}$.${vacia ? ` En la derecha queda $0$.` : ""}`,
        porque: `Es lo mismo que sumar $${opuesto}$ en los dos lados: a la derecha se cancela con $${original}$ y a la izquierda queda escrito.`,
        regla: `$a+b=c\\ \\Rightarrow\\ a=c-b$`,
      });
    }

    // ordenar y agrupar semejantes
    const par2 = (k: Clase) => izqCoef[k] !== 0 && derCoef[k] !== 0;
    const orden: string[] = [];
    for (const k of clases) {
      if (izqCoef[k] !== 0) orden.push(ID[k]);
      if (derCoef[k] !== 0) orden.push(`m${ID[k]}`);
    }
    const hayPares = clases.some(par2);
    if (izq.map((f) => f.id).join() !== orden.join()) {
      izq = orden.map((id) => izq.find((f) => f.id === id) as Ficha);
      foto();
      trans.push({
        fusiones: [],
        resaltar: orden,
        texto: hayPares
          ? `Agrupamos los términos semejantes (los que tienen la misma parte de letras) y ordenamos: primero $x^{2}$, luego $x$, luego los números.`
          : `Ordenamos de mayor a menor: primero $x^{2}$, luego $x$, luego el número solo.`,
        porque: `Solo se pueden sumar términos semejantes: $x^{2}$ con $x^{2}$, $x$ con $x$ y números con números. Cambiar el orden al sumar no cambia el resultado.`,
        regla: `$a+b=b+a$`,
      });
    }
    // sumar semejantes: una clase por paso (una operacion por paso)
    const pares = clases.filter(par2);
    for (const k of pares) {
      const nuevoId = `${ID[k]}f`;
      const l = izqCoef[k];
      const r = derCoef[k];
      const antes = [texDe(ID[k]), texDe(`m${ID[k]}`)];
      izq = izq.flatMap((f) => (f.id === ID[k] ? [{ id: nuevoId, tex: termino(k, fin[k], k === "a") } as Ficha] : f.id === `m${ID[k]}` ? [] : [f]));
      foto();
      trans.push({
        fusiones: [{ desde: [ID[k], `m${ID[k]}`], hacia: nuevoId }],
        texto:
          k === "c"
            ? `Sumamos ${nombre(k)}: $${l}${-r < 0 ? "-" : "+"}${Math.abs(r)}=${fin[k]}$.`
            : `Sumamos ${nombre(k)}: $${antes[0]}${antes[1]}=${termino(k, fin[k], k === "a")}$. Se suman sus números: $${l}${-r < 0 ? "-" : "+"}${Math.abs(r)}=${fin[k]}$.`,
        porque: k === "c" ? `Los números solos se suman entre sí.` : `Es como sumar objetos iguales: los $${cuerpo(k, 1)}$ se cuentan y se suman sus cantidades.`,
        regla: k !== "c" ? `$m\\cdot u+n\\cdot u=(m+n)\\cdot u$` : `$a+b=c$`,
      });
    }
  }
  const idFin = (k: Clase) => (izq.find((f) => f.id === `${ID[k]}f`) ? `${ID[k]}f` : izq.find((f) => f.id === ID[k]) ? ID[k] : `m${ID[k]}`);

  // ----- 3) etiquetar debajo de cada termino la letra que le toca, con su color
  const idEq: Record<Clase, string> = { a: idFin("a"), b: idFin("b"), c: idFin("c") };
  for (const k of clases) {
    const id = idEq[k];
    const letra = k;
    poner(id, { tex: col(k, texDe(id)), debajo: col(k, `${letra}=${fin[k]}`) });
    foto();
    trans.push({
      fusiones: [],
      resaltar: [id],
      texto: `${k === "a" ? `$a$ es el número que acompaña a $x^{2}$` : k === "b" ? `$b$ es el número que acompaña a $x$` : `$c$ es el número que va solo, sin $x$`}, con su signo: $${letra}=${fin[k]}$.`,
      porque:
        k === "a" && a === 1
          ? `Aquí no hay número delante de $x^{2}$, y eso significa que hay un $1$: $1\\cdot x^{2}=x^{2}$. Cada letra queda anotada debajo de su término, con su color.`
          : `Cada letra de la forma general es el número que ocupa su lugar en la ecuación, con su signo. Queda anotada debajo de su término, con su color.`,
      regla: `$ax^{2}+bx+c=0$`,
    });
  }

  // ----- 4) la formula con letras, DEBAJO de la ecuacion (nace de la igualdad a cero), EN PIEZAS con id
  const cb = col("b", "b");
  const ca = col("a", "a");
  const cc = col("c", "c");
  // la formula es una FRACCION CON PIEZAS (raya real) y la raiz ABARCA su radicando: cada letra es una pieza con id
  extra = [
    { id: "S", tex: "", salto: true },
    { id: "Fx", tex: "x" },
    { id: "Fe", tex: "=", op: true },
    frPiezas(
      "F",
      [
        { id: "Fneg", tex: "-" },
        { id: "Fb1", tex: cb, pegado: true },
        { id: "Fpm", tex: "\\pm", op: true },
        raiz("Fr", [
          { id: "Fb2", tex: cb },
          { id: "Fs2", tex: "2", sup: true },
          { id: "Fmn", tex: "-", op: true },
          { id: "F4", tex: "4" },
          { id: "Fa1", tex: ca, pegado: true },
          { id: "Fc", tex: cc, pegado: true },
        ]),
      ],
      [
        { id: "F2", tex: "2" },
        { id: "Fa2", tex: ca, pegado: true },
      ]
    ),
  ];
  foto();
  trans.push({
    fusiones: [],
    brotes: ["S", "Fx", "F"].map((id) => ({ desde: "eq", hacia: id })),
    texto: `Ahora que está igualada a cero, escribimos debajo la fórmula general, todavía con letras. Cada letra tiene el color de su término. La raya de la fracción dice que todo lo de arriba se divide entre $2a$.`,
    porque: `Esta fórmula resuelve cualquier ecuación de la forma de arriba. Primero se escribe con letras y después se reemplaza cada una.`,
    regla: `$x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$`,
  });

  // ----- helpers para cambiar piezas de la formula
  /** cambia las piezas `viejos` (contiguas) por `nuevos`, en el lugar de la primera */
  // (a cualquier profundidad: dentro de la fraccion o de la raiz; las que las contienen conservan su id)
  const subs = (viejos: string[], nuevos: Ficha[]) => {
    extra = sustituir(extra, viejos, nuevos);
  };
  const empuja = (t: Transicion) => {
    foto();
    trans.push(t);
  };

  // ----- 5) reemplazar UNA letra por vez: el valor vuela desde su etiqueta
  const dot = (id: string): Ficha => ({ id, tex: "\\cdot", op: true });
  // Con a = 1 la a se reemplaza al FINAL: si no, en el medio quedaria un 1 delante de la letra c (`4 . 1 c`).
  const reemplazaA = () => {
    subs(["Fa1"], [dot("Fd1"), { id: "Va1", tex: col("a", String(a)) }]);
    subs(["Fa2"], [dot("Fd3"), { id: "Va2", tex: col("a", String(a)) }]);
    empuja({
      fusiones: [
        { desde: ["Fa1"], hacia: ["Fd1", "Va1"], modo: "viajar" },
        { desde: ["Fa2"], hacia: ["Fd3", "Va2"], modo: "viajar" },
      ],
      brotes: [
        { desde: idEq.a, hacia: "Va1" },
        { desde: idEq.a, hacia: "Va2" },
      ],
      texto: `Reemplazamos $a$ por $${a}$: el valor que anotamos debajo de la ecuación sale de su etiqueta y ocupa el lugar de la letra. La $a$ aparece en dos lugares, en $4ac$ y en $2a$, y en los dos se reemplaza. Entre números aparece el punto de multiplicar.${a === 1 ? " Ya no quedan letras: todo son números." : ""}`,
      porque: `La letra $a$ aparece dos veces en la fórmula, así que se reemplaza las dos veces. El número conserva el color de su letra.`,
      regla: `$a=${a}$`,
    });
  };
  const reemplazaB = () => {
    subs(["Fb1"], [{ id: "Vb1", tex: col("b", `(${b})`), pegado: true }]);
    subs(["Fb2"], [{ id: "Vb2", tex: col("b", par(b)) }]);
    empuja({
      fusiones: [
        { desde: ["Fb1"], hacia: "Vb1", modo: "viajar" },
        { desde: ["Fb2"], hacia: "Vb2", modo: "viajar" },
      ],
      brotes: [
        { desde: idEq.b, hacia: "Vb1" },
        { desde: idEq.b, hacia: "Vb2" },
      ],
      texto: `Reemplazamos $b$ por $${b}$: el valor sale de su etiqueta y ocupa el lugar de la letra en los dos lugares donde aparece. En $-b$ queda $-(${b})$ y en $b^{2}$ queda $${par(b)}^{2}$.`,
      porque:
        b < 0
          ? `Como $b$ es negativo, va entre paréntesis para que no se confunda su signo con una resta.`
          : `En $-b$ el número va entre paréntesis para no perder el signo menos de adelante: $-(${b})$.`,
      regla: `$b=${b}$`,
    });
  };
  const reemplazaC = () => {
    subs(["Fc"], [dot("Fd2"), { id: "Vc", tex: col("c", par(c)) }]);
    empuja({
      fusiones: [{ desde: ["Fc"], hacia: ["Fd2", "Vc"], modo: "viajar" }],
      brotes: [{ desde: idEq.c, hacia: "Vc" }],
      texto: `Reemplazamos $c$ por $${par(c)}$: el valor sale de su etiqueta y ocupa el lugar de la letra. La $c$ aparece una sola vez, en $4ac$.${a === 1 ? "" : " Ya no quedan letras: todo son números."}`,
      porque: `${c < 0 ? "Como $c$ es negativo, va entre paréntesis." : "Se reemplaza tal cual."}${a === 1 ? " Todavía queda la $a$ por reemplazar; la dejamos para el final." : ""}`,
      regla: `$c=${c}$`,
    });
  };
  if (a === 1) {
    reemplazaB();
    reemplazaC();
    reemplazaA();
  } else {
    reemplazaA();
    reemplazaB();
    reemplazaC();
  }

  // la ecuacion y sus etiquetas ya cumplieron su papel
  const aQuitar = [...izq, eq, ...der].map((x) => x.id);
  izq = [];
  der = [];
  conIgual = false;
  foto();
  trans.push({
    fusiones: [{ desde: aQuitar, hacia: null }],
    texto: `Ya tenemos todos los valores dentro de la fórmula, así que la ecuación de arriba y sus etiquetas ya no se necesitan.`,
    porque: `Los números $a$, $b$ y $c$ quedaron escritos en la fórmula.`,
    regla: `$x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$`,
  });

  // ----- 6) calcular una operacion por paso (el color se va al calcular)
  // Los nombres de las cuentas se numeran segun las que de verdad hay (Primera, Segunda...). Cada regla y cada
  // "porque" que habla de un signo se elige segun los datos: nunca una regla de negativos con todo positivo.
  // Cada resultado intermedio (el producto de dos numeros, la suma que reemplaza a una resta, la potencia como
  // producto) es una pieza de la hoja, no solo un texto.
  let cuenta = 0;
  const ordinal = () => ["Primera", "Segunda", "Tercera", "Cuarta", "Quinta", "Sexta", "Séptima"][cuenta++];
  subs(["Fneg", "Vb1"], [{ id: "Rnb", tex: `${-b}` }]);
  empuja({
    fusiones: [{ desde: ["Fneg", "Vb1"], hacia: "Rnb" }],
    texto: `${ordinal()} cuenta: el opuesto de $${b}$. $-(${b})=${-b}$.`,
    porque: b < 0 ? `Menos por menos da más: el signo de adelante cambia el de $b$.` : `Un signo menos delante de un número positivo lo vuelve negativo.`,
    regla: b < 0 ? `$-(-n)=n$` : `$-(n)=-n$`,
  });
  // Producto "a lapiz": si los dos numeros son grandes (12.9, 12.12) no se da el resultado de golpe: se parte el
  // numero en decenas y unidades, se hace una cuenta por paso y se suman. Devuelve true si lo hizo.
  const grande = (m: number, n: number) => {
    const A = Math.abs(m);
    const B = Math.abs(n);
    return Math.max(A, B) >= 11 && Math.min(A, B) >= 6 && (A % 10 !== 0 || B % 10 !== 0);
  };
  const lapiz = (desde: string[], pid: string, m: number, n: number): void => {
    const L = Math.abs(m);
    const R = Math.abs(n);
    const neg = m * n < 0;
    const res = m * n;
    const partirIzq = L >= 11 && L % 10 !== 0;
    const gran = partirIzq ? L : R;
    const T = gran - (gran % 10);
    const u = gran % 10;
    const o = partirIzq ? R : L;
    const prod = (x: number) => (partirIzq ? `${x}\\cdot ${o}` : `${o}\\cdot ${x}`);
    const pre = neg ? "-\\left(" : "";
    const pos = neg ? "\\right)" : "";
    let actual = desde;
    let n0 = 0;
    const paso2 = (tex: string, texto: string, porque: string, regla: string, descompone?: boolean, ultimo?: boolean) => {
      const nid = ultimo ? pid : `${pid}${++n0}`;
      subs(actual, [{ id: nid, tex }]);
      empuja({ fusiones: [{ desde: actual, hacia: nid }], descompone, texto, porque, regla });
      actual = [nid];
    };
    if (m < 0 || n < 0) {
      paso2(
        `${neg ? "-" : ""}${L}\\cdot ${R}`,
        `${ordinal()} cuenta: primero el signo. $${par(m)}\\cdot ${par(n)}$ ${neg ? "da un resultado negativo" : "da un resultado positivo"}, así que multiplicamos $${L}\\cdot ${R}$${neg ? " y al final ponemos el signo menos" : ""}.`,
        neg ? `Un positivo por un negativo da negativo.` : `Un negativo por un negativo da positivo.`,
        neg ? `$\\text{positivo}\\cdot\\text{negativo}=\\text{negativo}$` : m === n ? `$(-n)^{2}=n^{2}$` : `$(-m)\\cdot(-n)=m\\cdot n$`,
        true
      );
    }
    paso2(
      `${pre}${prod(T)}+${prod(u)}${pos}`,
      `${m < 0 || n < 0 ? "Seguimos con" : `${ordinal()} cuenta:`} $${L}\\cdot ${R}$, una cuenta con números de dos cifras. Partimos $${gran}$ en $${T}+${u}$ y multiplicamos cada parte por $${o}$.`,
      `Multiplicar una suma por un número es multiplicar cada parte y sumar los resultados.`,
      `$(a+b)\\cdot c=a\\cdot c+b\\cdot c$`,
      true
    );
    const p1 = T * o;
    const p2 = u * o;
    paso2(
      `${pre}${p1}+${prod(u)}${pos}`,
      `Primera parte: $${prod(T)}=${p1}$.`,
      `Una operación por vez: primero la parte de las decenas.`,
      `$m\\cdot n=p$`
    );
    paso2(`${pre}${p1}+${p2}${pos}`, `Segunda parte: $${prod(u)}=${p2}$.`, `Ahora la parte de las unidades.`, `$m\\cdot n=p$`);
    paso2(
      par(res),
      `Sumamos las dos partes: $${p1}+${p2}=${L * R}$${neg ? `, y con el signo menos queda $${res}$` : ""}.`,
      `Al final se suman los resultados de las dos partes.`,
      `$a+b=c$`,
      false,
      true
    );
  };

  subs(["Vb2", "Fs2"], [{ id: "Pm", tex: `${par(b)}\\cdot ${par(b)}` }]);
  empuja({
    fusiones: [{ desde: ["Vb2", "Fs2"], hacia: "Pm" }],
    descompone: true,
    texto: `${ordinal()} cuenta: la potencia. Elevar al cuadrado es multiplicar el número por sí mismo: $${par(b)}^{2}=${par(b)}\\cdot ${par(b)}$.`,
    porque: `El exponente $2$ dice cuántas veces se escribe el número en la multiplicación.`,
    regla: `$n^{2}=n\\cdot n$`,
  });
  if (grande(b, b)) {
    lapiz(["Pm"], "Pn", b, b);
  } else {
    subs(["Pm"], [{ id: "Pn", tex: `${P}` }]);
    empuja({
      fusiones: [{ desde: ["Pm"], hacia: "Pn" }],
      texto: `Ahora multiplicamos: $${par(b)}\\cdot ${par(b)}=${P}$.`,
      porque:
        b < 0
          ? `Un negativo por un negativo da positivo, por eso el resultado no es negativo.`
          : `Un positivo por un positivo da positivo: $${b}\\cdot ${b}=${P}$.`,
      regla: b < 0 ? `$(-n)^{2}=n^{2}$` : `$m\\cdot n=p$`,
    });
  }
  if (a === 1) {
    // multiplicar por 1 no cambia el valor: el 1 se tacha con su punto, sin paso propio de cuenta
    subs(["Fd1", "Va1"], []);
    subs(["Fd3", "Va2"], []);
    empuja({
      fusiones: [
        { desde: ["Fd1", "Va1"], hacia: null, modo: "tachar" },
        { desde: ["Fd3", "Va2"], hacia: null, modo: "tachar" },
      ],
      texto: `Multiplicar por $1$ no cambia nada: tachamos el $\\cdot 1$ en $4\\cdot 1\\cdot ${par(c)}$ y en $2\\cdot 1$. Quedan $4\\cdot ${par(c)}$ y $2$.`,
      porque: `Cualquier número multiplicado por $1$ da el mismo número.`,
      regla: `$n\\cdot 1=n$`,
    });
  } else {
    subs(["F4", "Fd1", "Va1"], [{ id: "P4a", tex: `${4 * a}` }]);
    empuja({
      fusiones: [{ desde: ["F4", "Fd1", "Va1"], hacia: "P4a" }],
      texto: `${ordinal()} cuenta: el producto de tres números se hace de dos en dos, de izquierda a derecha. Primero $4\\cdot ${a}=${4 * a}$.`,
      porque: `Todavía no tocamos el $${par(c)}$: se queda esperando su turno.`,
      regla: `$(m\\cdot n)\\cdot p=m\\cdot(n\\cdot p)$`,
    });
  }
  const f4 = a === 1 ? "F4" : "P4a";
  if (grande(4 * a, c)) {
    lapiz([f4, "Fd2", "Vc"], "PQ", 4 * a, c);
  } else {
    subs([f4, "Fd2", "Vc"], [{ id: "PQ", tex: par(Q) }]);
    empuja({
      fusiones: [{ desde: [f4, "Fd2", "Vc"], hacia: "PQ" }],
      texto: a === 1 ? `${ordinal()} cuenta: $4\\cdot ${par(c)}=${Q}$.` : `${ordinal()} cuenta: seguimos con $${4 * a}\\cdot ${par(c)}=${Q}$.`,
      porque: c < 0 ? `Un positivo por un negativo da negativo.` : `Un positivo por un positivo da positivo.`,
      regla: c < 0 ? `$\\text{positivo}\\cdot\\text{negativo}=\\text{negativo}$` : `$\\text{positivo}\\cdot\\text{positivo}=\\text{positivo}$`,
    });
  }
  if (Q < 0) {
    // restar un negativo es sumar: se escribe la suma ANTES de calcularla
    subs(["Pn", "Fmn", "PQ"], [{ id: "Dm", tex: `${P}+${-Q}` }]);
    empuja({
      fusiones: [{ desde: ["Pn", "Fmn", "PQ"], hacia: "Dm" }],
      texto: `Restar un número negativo es sumar su opuesto: $${P}-${par(Q)}=${P}+${-Q}$.`,
      porque: `Restar un negativo es lo mismo que sumar su opuesto: quitar $${Q}$ es agregar $${-Q}$.`,
      regla: `$a-(-b)=a+b$`,
    });
    subs(["Dm"], [{ id: "Dd", tex: `${D}`, debajo: "\\Delta" }]);
    empuja({
      fusiones: [{ desde: ["Dm"], hacia: "Dd" }],
      texto: `${ordinal()} cuenta: sumamos lo de adentro de la raíz: $${P}+${-Q}=${D}$. Ese resultado se llama discriminante y se escribe $\\Delta$.`,
      porque: `El discriminante nos dice cuántas soluciones hay: aquí ${D === 0 ? "es cero, así que hay una sola" : "es positivo, así que hay dos"}.`,
      regla: `$\\Delta=b^{2}-4ac$`,
    });
  } else {
    subs(["Pn", "Fmn", "PQ"], [{ id: "Dd", tex: `${D}`, debajo: "\\Delta" }]);
    empuja({
      fusiones: [{ desde: ["Pn", "Fmn", "PQ"], hacia: "Dd" }],
      texto: `${ordinal()} cuenta: restamos lo de adentro de la raíz: $${P}-${par(Q)}=${D}$. Ese resultado se llama discriminante y se escribe $\\Delta$.`,
      porque: `El discriminante nos dice cuántas soluciones hay: aquí ${D === 0 ? "es cero, así que hay una sola" : "es positivo, así que hay dos"}.`,
      regla: `$\\Delta=b^{2}-4ac$`,
    });
  }
  // con a = 1 el denominador ya quedo en 2 (el 1 se tacho): la pieza es la misma `F2`
  const idDen = a === 1 ? "F2" : "Rden";
  if (a !== 1) {
    subs(["F2", "Fd3", "Va2"], [{ id: "Rden", tex: `${den}` }]);
    empuja({
      fusiones: [{ desde: ["F2", "Fd3", "Va2"], hacia: "Rden" }],
      texto: `${ordinal()} cuenta: abajo, el $2\\cdot ${a}$ del denominador: $2\\cdot ${a}=${den}$.`,
      porque: `Es el doble de $a$. Es el número entre el que se divide todo lo de arriba.`,
      regla: `$2\\cdot n=n+n$`,
    });
  }
  // la raiz: el discriminante se escribe como cuadrado y la raiz se cancela con el exponente.
  // Con D = 0 o D = 1 la raiz es trivial (0.0 = 0, 1.1 = 1) y va en un solo paso.
  if (d <= 1) {
    subs(["Fr"], [{ id: "Rd", tex: `${d}` }]);
    empuja({
      fusiones: [{ desde: ["Fr", "Dd"], hacia: "Rd" }],
      texto: `${ordinal()} cuenta: la raíz del discriminante. Queremos $\\sqrt{${D}}$: el número que multiplicado por sí mismo da $${D}$ es el $${d}$, porque $${d}$ por $${d}$ es $${D}$. Entonces $\\sqrt{${D}}=${d}$.`,
      porque: `Con el $0$ y con el $1$ el número no cambia al multiplicarse por sí mismo, así que la raíz es ese mismo número.`,
      regla: `$\\sqrt{n\\cdot n}=n$`,
    });
  } else {
    subs(["Dd"], [{ id: "Rdd", tex: `${d}\\cdot ${d}` }]);
    empuja({
      fusiones: [{ desde: ["Dd"], hacia: "Rdd" }],
      descompone: true,
      texto: `${ordinal()} cuenta: la raíz del discriminante. Queremos $\\sqrt{${D}}$: buscamos qué número multiplicado por sí mismo da $${D}$. Es el $${d}$, porque $${d}\\cdot ${d}=${D}$. Escribimos $${D}=${d}\\cdot ${d}$.`,
      porque: `Para sacar una raíz cuadrada hay que reconocer el número que, multiplicado por sí mismo, da el de adentro. Como es un cuadrado perfecto, existe.`,
      regla: `$\\sqrt{n\\cdot n}=n$`,
    });
    subs(["Rdd"], [{ id: "Rd", tex: `${d}` }, { id: "Rds", tex: "2", sup: true }]);
    empuja({
      fusiones: [{ desde: ["Rdd"], hacia: ["Rd", "Rds"] }],
      descompone: true,
      texto: `Un número multiplicado por sí mismo es ese número al cuadrado: $${d}\\cdot ${d}=${d}^{2}$.`,
      porque: `Así dentro de la raíz queda un cuadrado, y la raíz cuadrada es la operación contraria de elevar al cuadrado.`,
      regla: `$n\\cdot n=n^{2}$`,
    });
    // el signo de raiz y el exponente se van; el d sale de debajo de la raiz y queda en su lugar (la misma pieza)
    subs(["Fr"], [aplanar(extra).find((f) => f.id === "Rd") as Ficha]);
    empuja({
      fusiones: [{ desde: ["Fr", "Rds"], hacia: null, modo: "tachar" }],
      texto: `La raíz y el cuadrado se tachan, porque se deshacen entre sí: $\\sqrt{${d}^{2}}=${d}$. Queda el $${d}$.`,
      porque: `La raíz cuadrada deshace el cuadrado: el número que sale es la base, $${d}$.`,
      regla: `$\\sqrt{n^{2}}=n$`,
    });
  }

  // ----- 7) abrir el mas o menos
  // La formula sigue en `extra` hasta el final: las piezas VIAJAN (nada se reescribe de golpe en una sola ficha).
  const pieza = (id: string) => aplanar(extra).find((f) => f.id === id) as Ficha;
  if (d === 0) {
    subs(["Fpm", "Rd"], []);
    empuja({
      fusiones: [{ desde: ["Fpm", "Rd"], hacia: null, modo: "tachar" }],
      texto: `Como la raíz vale $0$, sumar $0$ o restar $0$ da lo mismo: se quita el $\\pm$ y queda $\\dfrac{${-b}}{${den}}$.`,
      porque: `$\\pm 0$ no cambia nada, así que las dos soluciones coinciden y hay una sola.`,
      regla: `$a\\pm 0=a$`,
    });
    extra = extra.map((f) => (f.id === "F" ? { id: "r1", tex: `${x1}` } : f));
    empuja({
      fusiones: [{ desde: ["F"], hacia: "r1" }],
      texto: `Dividimos: $\\dfrac{${-b}}{${den}}=${x1}$. Hay una sola solución, $x=${x1}$.`,
      porque: `La fracción es una división: el número de arriba entre el de abajo.`,
      regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
    });
  } else {
    // a) el +/- se abre en dos caminos: cada solucion tiene su renglon y sus propias piezas, copiadas de las que ya estan
    // la fraccion de x2 es una COPIA de la de arriba (nace de ella y baja a su renglon) con un menos en lugar del mas
    const F = sustituir([pieza("F")], ["Fpm"], [{ id: "Pl", tex: "+", op: true }])[0];
    const Q2 = frPiezas(
      "Q2",
      [
        { id: "N2", tex: pieza("Rnb").tex },
        { id: "Mi", tex: "-", op: true },
        { id: "D2", tex: pieza("Rd").tex },
      ],
      [{ id: "R2den", tex: pieza(idDen).tex }]
    );
    extra = [pieza("S"), { id: "X1", tex: "x_{1}" }, { ...pieza("Fe") }, F, { id: "S2", tex: "", salto: true }, { id: "X2", tex: "x_{2}" }, { id: "E2", tex: "=", op: true }, Q2];
    empuja({
      fusiones: [
        { desde: ["Fx"], hacia: "X1", modo: "viajar" },
        { desde: ["Fpm"], hacia: ["Pl", "Mi"] },
      ],
      brotes: [
        // renglon nuevo (vacio: solo corta la linea) para que x2 = ... quede en una sola linea
        { desde: "S", hacia: "S2" },
        { desde: "Fx", hacia: "X2" },
        { desde: "Fe", hacia: "E2" },
        { desde: "F", hacia: "Q2" },
      ],
      texto: `El $\\pm$ se abre en dos caminos: uno suma $${d}$ y el otro resta $${d}$. Llamamos $x_{1}$ y $x_{2}$ a las dos soluciones: cada una tiene su renglón, con la fracción copiada de la fórmula.`,
      porque: `El signo $\\pm$ significa "más o menos": son dos soluciones distintas, una por cada signo.`,
      regla: `$\\pm\\ \\Rightarrow\\ \\text{dos soluciones}$`,
    });
    // b) las dos sumas de arriba
    subs(["Rnb", "Pl", "Rd"], [{ id: "Ns1", tex: `${-b + d}` }]);
    subs(["N2", "Mi", "D2"], [{ id: "Ns2", tex: `${-b - d}` }]);
    empuja({
      fusiones: [
        { desde: ["Rnb", "Pl", "Rd"], hacia: "Ns1" },
        { desde: ["N2", "Mi", "D2"], hacia: "Ns2" },
      ],
      texto: `Hacemos la suma y la resta de arriba: $${-b}+${d}=${-b + d}$ y $${-b}-${d}=${-b - d}$.`,
      porque: `Cada camino se calcula por separado: son dos cuentas independientes, por eso van a la vez.`,
      regla: `$a+b=c$`,
    });
    // c) cada fraccion es una division
    extra = extra.map((f) => (f.id === "F" ? { id: "r1", tex: `${x1}` } : f.id === "Q2" ? { id: "r2", tex: `${x2}` } : f));
    empuja({
      fusiones: [
        { desde: ["F"], hacia: "r1" },
        { desde: ["Q2"], hacia: "r2" },
      ],
      texto: `Dividimos cada una: $\\dfrac{${-b + d}}{${den}}=${x1}$ y $\\dfrac{${-b - d}}{${den}}=${x2}$. Soluciones: $x=${x1}$ o $x=${x2}$.`,
      porque: `La fracción es una división: el número de arriba entre el de abajo.`,
      regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
    });
  }

  // ----- 8) comprobar cada solucion en la ECUACION ORIGINAL (no en la ordenada), con todas las cuentas a la vista
  const visto = `\\textcolor{#16a34a}{\\checkmark}`;
  interface Item {
    id: string;
    base: string;
    tex: string;
    val: number;
    et: Etapas | null;
    /** signo con el que se suma al anterior (el primero no tiene) */
    signo?: "+" | "-";
    opId?: string;
    /** pieza de la fila de referencia de la que nace este termino */
    ref: string;
  }
  const comprobar = (j: number, solId: string, nuevoId: string, nuevoTex: string, x: number, nombreSol: string) => {
    const lados: Item[][] = [terminosDe(izqCoef), terminosDe(derCoef)].map((ts, lado) => {
      const L = lado === 0 ? "L" : "R";
      if (ts.length === 0) return [{ id: `k${j}${L}0`, base: `k${j}${L}0`, tex: "0", val: 0, et: null, ref: "Rz" }];
      return ts.map((t, i) => {
        const et = etapasTermino(t, x);
        const base = `k${j}${L}${i}`;
        return { id: base, base, tex: et.ini, val: et.val, et, signo: i === 0 ? undefined : t.neg ? "-" : "+", opId: `${base}o`, ref: `${lado === 0 ? "Rl" : "Rr"}${ID[t.k]}` } as Item;
      });
    });
    const idE = `k${j}E`;
    const idS = `k${j}S`;
    const piezas = (): Ficha[] => {
      const lado = (items: Item[]) => items.flatMap((it, i) => (i === 0 ? [{ id: it.id, tex: it.tex }] : [{ id: it.opId as string, tex: it.signo as string, op: true }, { id: it.id, tex: it.tex }]));
      return [{ id: idS, tex: "", salto: true }, ...lado(lados[0]), { id: idE, tex: "=", op: true }, ...lado(lados[1])];
    };
    let chk = piezas();
    // la solucion que se esta comprobando (su nombre, el = y su valor) queda resaltada en TODO el proceso, para no olvidar cual se reemplaza
    const fila = [j === 1 ? "X1" : "X2", j === 1 ? "Fe" : "E2", solId];
    extra = extra.map((f) => (fila.includes(f.id) ? { ...f, destacada: true } : f));
    const nuevoEstado = () => estados.push([...copia(extra), ...copia(ref), ...copia(chk)]);
    // a) la ecuacion original se copia desde la fila de referencia (el enunciado), pieza por pieza
    nuevoEstado();
    const origenDe = new Map<string, string>([[idS, "RefS"]]);
    for (const items of lados) for (const it of items) origenDe.set(it.id, it.ref);
    trans.push({
      fusiones: [],
      brotes: chk.filter((f) => !f.op).map((f) => ({ desde: origenDe.get(f.id) as string, hacia: f.id })),
      texto: `Comprobamos ${nombreSol}. Copiamos la ecuación original, la del enunciado que dejamos guardada abajo, en un renglón nuevo para reemplazar $x$.`,
      porque: `Una solución sirve solo si, al reemplazar $x$ en la ecuación original, los dos lados dan lo mismo.`,
      regla: `$\\text{izquierda}=\\text{derecha}\\ \\Rightarrow\\ x\\ \\text{es solución}$`,
    });
    // b) sustituir, potencia como producto, potencia, multiplicar
    const nombresEtapa: Record<Etapa, { texto: (fr: string) => string; porque: string; regla: string }> = {
      k1: {
        texto: () => `Reemplazamos $x$ por $${x}$ en todos los lugares donde aparece: el valor sale de la solución y ocupa el lugar de cada $x$.`,
        porque: x < 0 ? `Como $x$ vale un número negativo, va entre paréntesis para que no se confunda su signo con una resta.` : `Donde estaba la letra $x$ ahora va el número $${x}$.`,
        regla: `$x=${x}$`,
      },
      k3: { texto: (cuenta) => `Calculamos la potencia: ${cuenta}.`, porque: `El exponente $2$ dice que el número se multiplica por sí mismo, como al calcular $b^{2}$. Las potencias se calculan antes que las multiplicaciones por un número.`, regla: `$n^{2}=n\\cdot n$` },
      k4: { texto: (cuenta) => `Multiplicamos cada número por su valor: ${cuenta}.`, porque: `Primero se hacen las multiplicaciones y después las sumas y restas.`, regla: `$m\\cdot n=p$` },
    };
    for (const kn of ["k1", "k3", "k4"] as Etapa[]) {
      const fusiones: Fusion[] = [];
      const brotes: Brote[] = [];
      const frases: string[] = [];
      for (const items of lados) {
        for (const it of items) {
          const nt = it.et?.tex[kn];
          if (!it.et || nt === undefined) continue;
          const nid = `${it.base}${kn}`;
          fusiones.push({ desde: [it.id], hacia: nid });
          if (kn === "k1") brotes.push({ desde: solId, hacia: nid });
          it.id = nid;
          it.tex = nt;
          const fr = it.et.frase[kn];
          if (fr) frases.push(fr);
        }
      }
      if (fusiones.length === 0) continue;
      chk = piezas();
      nuevoEstado();
      const e = nombresEtapa[kn];
      trans.push({
        fusiones,
        brotes: brotes.length > 0 ? brotes : undefined,
        texto: e.texto(frases.join(", ")),
        porque: e.porque,
        regla: e.regla,
      });
    }
    // c) restar o sumar un negativo: primero se escribe como suma o resta de un positivo
    {
      const fusiones: Fusion[] = [];
      const frases: string[] = [];
      for (const items of lados) {
        items.forEach((it, i) => {
          if (i === 0 || it.val >= 0) return;
          const nop = `${it.opId}c`;
          const nit = `${it.id}c`;
          fusiones.push({ desde: [it.opId as string, it.id], hacia: [nop, nit] });
          frases.push(it.signo === "-" ? `$-(${it.val})=+${-it.val}$` : `$+(${it.val})=-${-it.val}$`);
          it.opId = nop;
          it.signo = it.signo === "-" ? "+" : "-";
          it.id = nit;
          it.val = -it.val;
          it.tex = `${it.val}`;
        });
      }
      if (fusiones.length > 0) {
        chk = piezas();
        nuevoEstado();
        trans.push({
          fusiones,
          texto: `Antes de sumar, cuidamos los signos: ${frases.join(", ")}.`,
          porque: `Sumar un número negativo es restar su opuesto, y restar un negativo es sumar su opuesto.`,
          regla: `$-(-n)=+n\\quad\\text{y}\\quad +(-n)=-n$`,
        });
      }
    }
    // d) sumar y restar de a dos, de izquierda a derecha
    let n = 0;
    while (lados.some((items) => items.length > 1)) {
      const fusiones: Fusion[] = [];
      const frases: string[] = [];
      const ambos = lados.every((items) => items.length > 1);
      lados.forEach((items, lado) => {
        if (items.length < 2) return;
        const [p, q] = items;
        const res = p.val + (q.signo === "-" ? -1 : 1) * q.val;
        const nid = `k${j}${lado === 0 ? "L" : "R"}s${++n}`;
        fusiones.push({ desde: [p.id, q.opId as string, q.id], hacia: nid });
        frases.push(`${ambos ? (lado === 0 ? "a la izquierda " : "a la derecha ") : ""}$${p.tex}${q.signo}${q.tex}=${res}$`);
        items.splice(0, 2, { id: nid, base: nid, tex: `${res}`, val: res, et: null, ref: p.ref });
      });
      chk = piezas();
      nuevoEstado();
      trans.push({
        fusiones,
        texto: `Sumamos y restamos de a dos, de izquierda a derecha: ${frases.join(" y ")}.`,
        porque: `Una operación por vez: se junta el primer número con el siguiente y el resultado queda en su lugar.`,
        regla: `$a+b=c$`,
      });
    }
    // e) los dos lados quedaron con un solo numero: se comparan
    const Lp = lados[0][0];
    const Rp = lados[1][0];
    const quitar = [idS, Lp.id, idE, Rp.id];
    extra = extra.map((f) => (f.id === solId ? { id: nuevoId, tex: nuevoTex } : { ...f, destacada: false }));
    chk = [];
    nuevoEstado();
    trans.push({
      fusiones: [
        { desde: quitar, hacia: null },
        { desde: [solId], hacia: nuevoId },
      ],
      texto: `Comprobamos ${nombreSol}: a la izquierda queda $${Lp.val}$ y a la derecha queda $${Rp.val}$. Son iguales, así que sirve.`,
      porque: `Se reemplazó $x$ por $${x}$ en los dos lados de la ecuación del principio y se calculó. Si los dos lados dan lo mismo, ese valor es solución.`,
      regla: `$\\text{izquierda}=\\text{derecha}\\ \\Rightarrow\\ x\\ \\text{es solución}$`,
    });
  };

  if (d === 0) {
    comprobar(1, "r1", "c1", `${x1}\\ ${visto}`, x1, `$x=${x1}$`);
  } else {
    comprobar(1, "r1", "c1", `${x1}\\ ${visto}`, x1, `$x_{1}=${x1}$`);
    comprobar(2, "r2", "c2", `${x2}\\ ${visto}`, x2, `$x_{2}=${x2}$`);
  }

  return {
    demo: { titulo: "", nota: "", intro, estados, transiciones: trans },
    resumen: { a, b, c, a1, b1, c1, a2, b2, c2, D, d, x1, x2 },
  };
}
