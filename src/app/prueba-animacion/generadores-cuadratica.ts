// Ecuacion de segundo grado por formula general. Patron "ANOTAR Y REEMPLAZAR":
//   1. la ecuacion tal como viene y POR QUE no se puede despejar x directamente;
//   2. ORDENARLA a la forma ax^2 + bx + c = 0 (pasar terminos, agrupar semejantes, sumar constantes), un termino por paso;
//   3. ETIQUETAR debajo de cada termino la letra que le toca (a = 1, b = -5, c = 6), cada letra con su color;
//   4. escribir la formula DEBAJO, con letras del mismo color;
//   5. REEMPLAZAR una letra por vez (el numero conserva el color de su letra);
//   6. CALCULAR una operacion por paso.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas y etiquetas van en LaTeX sin $. Las barras van dobles.
import type { Ficha, Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

type Clase = "a" | "b" | "c";
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

// partes de la formula que se van reemplazando, una por una (cada una ya con su color)
interface Formula {
  neg: string;
  sq: string;
  prod: string;
  den: string;
  rad?: string;
  raiz?: string;
}
const texFormula = (f: Formula) =>
  f.raiz !== undefined
    ? `x=\\dfrac{${f.neg}\\pm ${f.raiz}}{${f.den}}`
    : `x=\\dfrac{${f.neg}\\pm\\sqrt{${f.rad ?? `${f.sq}-${f.prod}`}}}{${f.den}}`;

export function cuadratica(a1: number, b1: number, c1: number, a2 = 0, b2 = 0, c2 = 0): Resultado {
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
  const clases: Clase[] = ["a", "b", "c"];

  // ----- lienzo: izquierda, igual, derecha y piezas extra (la formula)
  let izq: Ficha[] = [];
  let der: Ficha[] = [];
  let extra: Ficha[] = [];
  const eq: Ficha = { id: "eq", tex: "=", op: true };
  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];
  const copia = (fs: Ficha[]) => fs.map((f) => ({ ...f }));
  let conIgual = true; // el signo = se dibuja mientras la ecuacion este a la vista
  const foto = () => estados.push([...copia(izq), ...(conIgual ? [{ ...eq }] : []), ...copia(der), ...copia(extra)]);
  const poner = (id: string, parche: Partial<Ficha>) => {
    izq = izq.map((f) => (f.id === id ? { ...f, ...parche } : f));
    der = der.map((f) => (f.id === id ? { ...f, ...parche } : f));
  };
  const texDe = (id: string) => [...izq, ...der].find((f) => f.id === id)?.tex ?? "";

  // ----- estado inicial: la ecuacion tal como viene
  for (const k of clases) if (izqCoef[k] !== 0) izq.push({ id: ID[k], tex: termino(k, izqCoef[k], izq.length === 0) });
  for (const k of clases) if (derCoef[k] !== 0) der.push({ id: `R${ID[k]}`, tex: termino(k, derCoef[k], der.length === 0) });
  if (der.length === 0) der.push({ id: "z", tex: "0" });
  const yaEstandar = der.length === 1 && der[0].id === "z" && izq.length === 3 && izq.every((f, i) => f.id === ID[clases[i]]);
  const intro = `Queremos resolver $${[...izq].map((f) => f.tex).join("")}=${der.map((f) => f.tex).join("")}$. Vamos a escribir cada paso, como a lápiz.`;
  foto();

  // ----- 1) por que no se puede despejar
  const conX = [...izq, ...der].filter((f) => f.id.replace("R", "") === "A" || f.id.replace("R", "") === "B").map((f) => f.id);
  foto();
  trans.push({
    fusiones: [],
    resaltar: conX,
    texto: yaEstandar
      ? `La $x$ aparece de dos formas, como $x^{2}$ y como $x$. Así no se puede despejar con las operaciones de siempre: usaremos la fórmula general. La ecuación ya está ordenada (todo a la izquierda y $0$ a la derecha), así que no hay que prepararla.`
      : `La $x$ aparece de dos formas, como $x^{2}$ y como $x$, y además hay términos en los dos lados. Así no se puede despejar con las operaciones de siempre: usaremos la fórmula general, pero primero hay que ordenar la ecuación.`,
    porque: `La fórmula general solo funciona si la ecuación tiene la forma $ax^{2}+bx+c=0$: todo de un lado y un cero del otro.`,
    regla: `$ax^{2}+bx+c=0$`,
  });

  // ----- 2) ordenar: pasar cada termino de la derecha a la izquierda
  if (!yaEstandar) {
    const restantes = () => der.filter((f) => f.id !== "z").length;
    for (const k of [...clases].reverse()) {
      if (derCoef[k] === 0) continue;
      const idR = `R${ID[k]}`;
      const opuesto = termino(k, -derCoef[k], false);
      const mL = `m${ID[k]}`;
      const nR = `n${ID[k]}`;
      const original = texDe(idR);
      izq.push({ id: mL, tex: opuesto });
      der.push({ id: nR, tex: opuesto });
      foto();
      trans.push({
        fusiones: [],
        brotes: [
          { desde: idR, hacia: mL },
          { desde: idR, hacia: nR },
        ],
        texto: `Para pasar $${original}$ al lado izquierdo, escribimos su opuesto, $${opuesto}$, en los dos lados.`,
        porque: `Lo que haces de un lado debes hacerlo del otro, así la igualdad se mantiene.`,
        regla: `$a=b\\ \\Rightarrow\\ a+c=b+c$`,
      });
      const ultimo = restantes() === 2; // solo quedan este termino y su opuesto
      der = der.filter((f) => f.id !== idR && f.id !== nR);
      if (ultimo) der.push({ id: "z", tex: "0" });
      foto();
      trans.push({
        fusiones: [{ desde: [idR, nR], hacia: ultimo ? "z" : null }],
        texto: ultimo
          ? `En el lado derecho, $${original}$ y $${opuesto}$ se cancelan: queda $0$.`
          : `En el lado derecho, $${original}$ y $${opuesto}$ se cancelan.`,
        porque: `Un número más su opuesto da cero y desaparece.`,
        regla: `$a+(-a)=0$`,
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
    // sumar semejantes, una clase por paso
    for (const k of clases) {
      if (!par2(k)) continue;
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
            : `Sumamos ${nombre(k)}: $${antes[0]}${antes[1]}=${termino(k, fin[k], k === "a")}$. Se suman los números que las acompañan: $${l}${-r < 0 ? "-" : "+"}${Math.abs(r)}=${fin[k]}$.`,
        porque: k === "c" ? `Los números solos se suman entre sí.` : `Es como sumar objetos iguales: los $${cuerpo(k, 1)}$ se cuentan y se suman sus cantidades.`,
        regla: k === "c" ? `$a+b=c$` : `$m\\cdot u+n\\cdot u=(m+n)\\cdot u$`,
      });
    }
  }
  const idFin = (k: Clase) => (izq.find((f) => f.id === `${ID[k]}f`) ? `${ID[k]}f` : izq.find((f) => f.id === ID[k]) ? ID[k] : `m${ID[k]}`);

  // ----- 3) etiquetar debajo de cada termino la letra que le toca, con su color
  for (const k of clases) {
    const id = idFin(k);
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

  // ----- 4) la formula con letras, DEBAJO de la ecuacion (nace de la igualdad a cero)
  const formulaLetras = `x=\\dfrac{-${col("b", "b")}\\pm\\sqrt{${col("b", "b")}^{2}-4${col("a", "a")}${col("c", "c")}}}{2${col("a", "a")}}`;
  extra = [{ id: "F", tex: formulaLetras, salto: true }];
  foto();
  trans.push({
    fusiones: [],
    brotes: [{ desde: "eq", hacia: "F" }],
    texto: `Ahora que está igualada a cero, escribimos debajo la fórmula general, todavía con letras. Cada letra tiene el color de su término.`,
    porque: `Esta fórmula resuelve cualquier ecuación de la forma de arriba. Primero se escribe con letras y después se reemplaza cada una.`,
    regla: `$x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$`,
  });

  // ----- 5) reemplazar una letra por vez
  const f: Formula = { neg: `-${col("b", "b")}`, sq: `${col("b", "b")}^{2}`, prod: `4${col("a", "a")}${col("c", "c")}`, den: `2${col("a", "a")}` };
  let ultimoId = "F";
  let n = 0;
  const paso = (tex: string, texto: string, porque: string, regla: string) => {
    const id = `F${++n}`;
    extra = [{ id, tex, salto: true }];
    foto();
    trans.push({ fusiones: [{ desde: [ultimoId], hacia: id }], texto, porque, regla });
    ultimoId = id;
  };

  f.prod = `4\\cdot ${col("a", String(a))}\\cdot ${col("c", "c")}`;
  f.den = `2\\cdot ${col("a", String(a))}`;
  paso(
    texFormula(f),
    `Reemplazamos $a$ por $${a}$ (el valor que anotamos debajo de la ecuación) en todos los lugares donde aparece: en $4ac$ y en $2a$.`,
    `La letra $a$ aparece dos veces en la fórmula, así que se reemplaza las dos veces. El número conserva el color de su letra.`,
    `$a=${a}$`
  );
  f.neg = `-${col("b", `(${b})`)}`;
  f.sq = `${col("b", par(b))}^{2}`;
  paso(
    texFormula(f),
    `Reemplazamos $b$ por $${b}$ (el valor que anotamos debajo) en los dos lugares: en $-b$ queda $-(${b})$ y en $b^{2}$ queda $${par(b)}^{2}$.`,
    b < 0
      ? `Como $b$ es negativo, va entre paréntesis para que no se confunda su signo con una resta.`
      : `En $-b$ el número va entre paréntesis para no perder el signo menos de adelante: $-(${b})$.`,
    `$b=${b}$`
  );
  f.prod = `4\\cdot ${col("a", String(a))}\\cdot ${col("c", par(c))}`;
  paso(
    texFormula(f),
    `Reemplazamos $c$ por $${par(c)}$ (el valor que anotamos debajo).`,
    `${c < 0 ? "Como $c$ es negativo, va entre paréntesis." : "Se reemplaza tal cual."} Ya no quedan letras: todo son números.`,
    `$c=${c}$`
  );

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
  let cuenta = 0;
  const ordinal = () => ["Primera", "Segunda", "Tercera", "Cuarta", "Quinta", "Sexta", "Séptima"][cuenta++];
  f.neg = `${-b}`;
  paso(
    texFormula(f),
    `${ordinal()} cuenta: el opuesto de $${b}$. $-(${b})=${-b}$.`,
    b < 0 ? `Menos por menos da más: el signo de adelante cambia el de $b$.` : `Un signo menos delante de un número positivo lo vuelve negativo.`,
    b < 0 ? `$-(-n)=n$` : `$-(n)=-n$`
  );
  f.sq = `${P}`;
  paso(
    texFormula(f),
    `${ordinal()} cuenta: la potencia. $${par(b)}^{2}=${par(b)}\\cdot ${par(b)}=${P}$.`,
    b < 0
      ? `Elevar al cuadrado es multiplicar el número por sí mismo. Un negativo por un negativo da positivo, por eso el resultado no es negativo.`
      : `Elevar al cuadrado es multiplicar el número por sí mismo: $${b}\\cdot ${b}=${P}$.`,
    b < 0 ? `$(-n)^{2}=n^{2}$` : `$n^{2}=n\\cdot n$`
  );
  f.prod = `${4 * a}\\cdot ${par(c)}`;
  paso(
    texFormula(f),
    `${ordinal()} cuenta: el producto de tres números se hace de dos en dos, de izquierda a derecha. Primero $4\\cdot ${a}=${4 * a}$.`,
    `Todavía no tocamos el $${par(c)}$: se queda esperando su turno.`,
    `$(m\\cdot n)\\cdot p=m\\cdot(n\\cdot p)$`
  );
  f.prod = par(Q);
  paso(
    texFormula(f),
    `${ordinal()} cuenta: seguimos con $${4 * a}\\cdot ${par(c)}=${Q}$.`,
    c < 0 ? `Un positivo por un negativo da negativo.` : `Un positivo por un positivo da positivo.`,
    c < 0 ? `$\\text{positivo}\\cdot\\text{negativo}=\\text{negativo}$` : `$\\text{positivo}\\cdot\\text{positivo}=\\text{positivo}$`
  );
  f.rad = `${D}`;
  paso(
    texFormula(f),
    `${ordinal()} cuenta: restamos lo de adentro de la raíz: $${P}-${par(Q)}=${D}$. Ese resultado se llama discriminante y se escribe $\\Delta$.`,
    `${Q < 0 ? "Restar un número negativo es sumarlo. " : ""}El discriminante nos dice cuántas soluciones hay: aquí ${D === 0 ? "es cero, así que hay una sola" : "es positivo, así que hay dos"}.`,
    Q < 0 ? `$\\Delta=b^{2}-4ac\\quad\\text{y}\\quad a-(-b)=a+b$` : `$\\Delta=b^{2}-4ac$`
  );
  f.den = `${den}`;
  paso(
    texFormula(f),
    `${ordinal()} cuenta: abajo, el $2\\cdot ${a}$ del denominador: $2\\cdot ${a}=${den}$.`,
    `Es el doble de $a$. Es el número entre el que se divide todo lo de arriba.`,
    `$2\\cdot n=n+n$`
  );
  f.raiz = `${d}`;
  paso(
    texFormula(f),
    `${ordinal()} cuenta: sacamos la raíz del discriminante: $\\sqrt{${D}}=${d}$.`,
    `Porque $${d}\\cdot ${d}=${D}$. Como el discriminante es un cuadrado perfecto, la raíz sale exacta.`,
    `$\\sqrt{n^{2}}=n$`
  );

  // ----- 7) abrir el mas o menos
  const sola = (fs: Ficha[]) => {
    extra = [];
    izq = fs;
    der = [];
    estados.push(copia(fs));
  };
  if (d === 0) {
    paso(
      `x=\\dfrac{${-b}}{${den}}`,
      `Como la raíz vale $0$, sumar $0$ o restar $0$ da lo mismo: se quita el $\\pm$ y queda $\\dfrac{${-b}}{${den}}$.`,
      `$\\pm 0$ no cambia nada, así que las dos soluciones coinciden y hay una sola.`,
      `$a\\pm 0=a$`
    );
    sola([{ id: "R", tex: `x=${x1}` }]);
    trans.push({
      fusiones: [{ desde: [ultimoId], hacia: "R" }],
      texto: `Dividimos: $\\dfrac{${-b}}{${den}}=${x1}$. Hay una sola solución, $x=${x1}$.`,
      porque: `La fracción es una división: el número de arriba entre el de abajo.`,
      regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
    });
  } else {
    sola([
      { id: "x1", tex: `x_{1}=\\dfrac{${-b}+${d}}{${den}}` },
      { id: "o", tex: "\\text{ ó }", op: true },
      { id: "x2", tex: `x_{2}=\\dfrac{${-b}-${d}}{${den}}` },
    ]);
    trans.push({
      fusiones: [{ desde: [ultimoId], hacia: ["x1", "o", "x2"] }],
      texto: `El $\\pm$ se abre en dos caminos: uno suma $${d}$ y el otro resta $${d}$.`,
      porque: `El signo $\\pm$ significa "más o menos": son dos soluciones distintas, una por cada signo.`,
      regla: `$\\pm\\ \\Rightarrow\\ \\text{dos soluciones}$`,
    });
    sola([
      { id: "s1", tex: `x_{1}=\\dfrac{${-b + d}}{${den}}` },
      { id: "o", tex: "\\text{ ó }", op: true },
      { id: "s2", tex: `x_{2}=\\dfrac{${-b - d}}{${den}}` },
    ]);
    trans.push({
      fusiones: [
        { desde: ["x1"], hacia: "s1" },
        { desde: ["x2"], hacia: "s2" },
      ],
      texto: `Hacemos la suma y la resta de arriba: $${-b}+${d}=${-b + d}$ y $${-b}-${d}=${-b - d}$.`,
      porque: `Cada camino se calcula por separado.`,
      regla: `$a+b\\quad\\text{y}\\quad a-b$`,
    });
    sola([
      { id: "r1", tex: `x_{1}=${x1}` },
      { id: "o", tex: "\\text{ ó }", op: true },
      { id: "r2", tex: `x_{2}=${x2}` },
    ]);
    trans.push({
      fusiones: [
        { desde: ["s1"], hacia: "r1" },
        { desde: ["s2"], hacia: "r2" },
      ],
      texto: `Dividimos cada una entre $${den}$: $\\dfrac{${-b + d}}{${den}}=${x1}$ y $\\dfrac{${-b - d}}{${den}}=${x2}$. Soluciones: $x=${x1}$ o $x=${x2}$.`,
      porque: `La fracción es una división: el número de arriba entre el de abajo.`,
      regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
    });
  }

  // ----- 8) comprobar cada solucion en la ECUACION ORIGINAL (no en la ordenada)
  const lado = (x: number, ca: number, cb: number, cc: number) => ca * x * x + cb * x + cc;
  const visto = `\\textcolor{#16a34a}{\\checkmark}`;
  const comprobar = (x: number, texto: string) => {
    const izqV = lado(x, a1, b1, c1);
    const derV = lado(x, a2, b2, c2);
    return {
      texto: `Comprobamos ${texto} en la ecuación original: a la izquierda queda $${izqV}$ y a la derecha queda $${derV}$. Son iguales, así que sirve.`,
      porque: `Se reemplaza $x$ por $${x}$ en los dos lados de la ecuación del principio y se calcula. Si los dos lados dan lo mismo, ese valor es solución.`,
      regla: `$\\text{izquierda}=\\text{derecha}\\ \\Rightarrow\\ x\\ \\text{es solución}$`,
    };
  };
  if (d === 0) {
    sola([{ id: "Rc", tex: `x=${x1}\\ ${visto}` }]);
    trans.push({ fusiones: [{ desde: ["R"], hacia: "Rc" }], ...comprobar(x1, `$x=${x1}$`) });
  } else {
    sola([
      { id: "c1", tex: `x_{1}=${x1}\\ ${visto}` },
      { id: "o", tex: "\\text{ ó }", op: true },
      { id: "r2", tex: `x_{2}=${x2}` },
    ]);
    trans.push({ fusiones: [{ desde: ["r1"], hacia: "c1" }], ...comprobar(x1, `$x_{1}=${x1}$`) });
    sola([
      { id: "c1", tex: `x_{1}=${x1}\\ ${visto}` },
      { id: "o", tex: "\\text{ ó }", op: true },
      { id: "c2", tex: `x_{2}=${x2}\\ ${visto}` },
    ]);
    trans.push({ fusiones: [{ desde: ["r2"], hacia: "c2" }], ...comprobar(x2, `$x_{2}=${x2}$`) });
  }

  return {
    demo: { titulo: "", nota: "", intro, estados, transiciones: trans },
    resumen: { a, b, c, a1, b1, c1, a2, b2, c2, D, d, x1, x2 },
  };
}
