// Ecuacion de segundo grado por formula general: ax^2 + bx + c = 0.
// Se resuelve "como a lapiz": se DEFINE cada letra, se escribe la formula con letras, se REEMPLAZA una letra
// por vez y se calcula UNA operacion por paso. Ningun numero aparece sin haberse escrito antes.
// Todo texto del alumno va en LaTeX entre $...$ (MathText). Las barras van dobles.
import type { Ficha, Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

const conSigno = (n: number) => (n < 0 ? `-${-n}` : `+${n}`);
const par = (n: number) => (n < 0 ? `(${n})` : `${n}`);
const raizEntera = (n: number): number | null => {
  if (n < 0) return null;
  const r = Math.round(Math.sqrt(n));
  return r * r === n ? r : null;
};

/** solo se animan ecuaciones con soluciones enteras: el discriminante es un cuadrado perfecto y todo se divide exacto */
export function validarCuadratica(a: number, b: number, c: number): string | null {
  if (![a, b, c].every(Number.isInteger)) return "Escribe números enteros.";
  if (a < 1 || a > 5) return "El número de x² debe estar entre 1 y 5.";
  if (Math.abs(b) > 20 || Math.abs(c) > 30) return "b debe estar entre -20 y 20, y c entre -30 y 30.";
  const D = b * b - 4 * a * c;
  const d = raizEntera(D);
  if (d === null) return "Con estos números el discriminante no es un cuadrado perfecto (o es negativo), y las soluciones no son enteras. Prueba, por ejemplo, 1, -5, 6.";
  if ((-b + d) % (2 * a) !== 0 || (-b - d) % (2 * a) !== 0) return "Con estos números las soluciones no son enteras. Prueba, por ejemplo, 1, -5, 6.";
  return null;
}

// partes de la formula que se van reemplazando, una por una
interface Formula {
  neg: string; // -b
  sq: string; // b^2
  prod: string; // 4ac
  den: string; // 2a
  rad?: string; // lo de adentro de la raiz, ya calculado en parte
  raiz?: string; // si ya se saco la raiz, su valor
}
const texFormula = (f: Formula) =>
  f.raiz !== undefined
    ? `x=\\dfrac{${f.neg}\\pm ${f.raiz}}{${f.den}}`
    : `x=\\dfrac{${f.neg}\\pm\\sqrt{${f.rad ?? `${f.sq}-${f.prod}`}}}{${f.den}}`;

export function cuadratica(a: number, b: number, c: number): Resultado {
  const D = b * b - 4 * a * c;
  const d = raizEntera(D) as number;
  const P = b * b;
  const Q = 4 * a * c;
  const den = 2 * a;
  const x1 = (-b + d) / den;
  const x2 = (-b - d) / den;
  const termA = a === 1 ? "x^{2}" : `${a}x^{2}`;
  const formulaLetras = "x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}";

  const ecuacion: Ficha[] = [
    { id: "A", tex: termA },
    { id: "B", tex: Math.abs(b) === 1 ? `${b < 0 ? "-" : "+"}x` : b === 0 ? "+0x" : `${conSigno(b)}x` },
    { id: "C", tex: conSigno(c) },
    { id: "eq", tex: "=", op: true },
    { id: "z", tex: "0" },
  ];

  const estados: Ficha[][] = [ecuacion];
  const trans: Transicion[] = [];
  const quieta = () => estados.push(estados[estados.length - 1]);

  // 1) DEFINIR cada letra, de una en una
  for (const [id, letra, valor, que] of [
    ["A", "a", a, "el número que acompaña a $x^{2}$"],
    ["B", "b", b, "el número que acompaña a $x$"],
    ["C", "c", c, "el número que va solo, sin $x$"],
  ] as const) {
    quieta();
    trans.push({
      fusiones: [],
      resaltar: [id],
      texto: `$${letra}$ es ${que}, con su signo: $${letra}=${valor}$.`,
      porque:
        id === "A" && a === 1
          ? `Aquí no hay número delante de $x^{2}$, y eso significa que hay un $1$: $1\\cdot x^{2}=x^{2}$.`
          : `Cada letra de la forma general es el número que ocupa su lugar en la ecuación. El signo va incluido.`,
      regla: `$ax^{2}+bx+c=0$`,
    });
  }

  // 2) ESCRIBIR la formula con letras (nace de la igualdad a cero)
  estados.push([...ecuacion, { id: "F", tex: formulaLetras }]);
  trans.push({
    fusiones: [],
    brotes: [{ desde: "eq", hacia: "F" }],
    texto: `La ecuación está igualada a cero, así que podemos escribir la fórmula general, todavía con letras.`,
    porque: `Esta fórmula resuelve cualquier ecuación de la forma de arriba. Primero se escribe con letras y después se reemplaza cada una.`,
    regla: `$${formulaLetras}$`,
  });

  // 3) REEMPLAZAR una letra por vez
  const f: Formula = { neg: "-b", sq: "b^{2}", prod: "4ac", den: "2a" };
  let ultimo = "F";
  let n = 0;
  const siguiente = () => `F${++n}`;
  const paso = (desde: string[], tex: string, texto: string, porque: string, regla: string) => {
    const id = siguiente();
    const resto = estados[estados.length - 1].filter((x) => !desde.includes(x.id));
    estados.push([...resto, { id, tex }]);
    trans.push({ fusiones: [{ desde, hacia: id }], texto, porque, regla });
    ultimo = id;
  };

  f.prod = `4\\cdot ${a}\\cdot c`;
  f.den = `2\\cdot ${a}`;
  paso(
    ["F"],
    texFormula(f),
    `Reemplazamos $a$ por $${a}$ (el valor que anotamos arriba) en todos los lugares donde aparece: en $4ac$ y en $2a$.`,
    `La letra $a$ aparece dos veces en la fórmula, así que se reemplaza las dos veces.`,
    `$a=${a}$`
  );
  // con b positivo, -b ya queda como el numero negativo; con b negativo o cero queda -(b) y se calcula despues
  f.neg = b > 0 ? `${-b}` : `-${par(b)}`;
  f.sq = `${par(b)}^{2}`;
  paso(
    [ultimo],
    texFormula(f),
    `Reemplazamos $b$ por $${par(b)}$ (el valor que anotamos arriba) en los dos lugares: en $-b$ y en $b^{2}$.`,
    `${b < 0 ? "Como $b$ es negativo, va entre paréntesis para que no se confunda su signo con una resta." : `Se reemplaza tal cual. En $-b$, el signo menos de adelante queda delante del $${b}$: $-${b}$.`}`,
    `$b=${b}$`
  );
  f.prod = `4\\cdot ${par(a)}\\cdot ${par(c)}`;
  paso(
    [ultimo],
    texFormula(f),
    `Reemplazamos $c$ por $${par(c)}$ (el valor que anotamos arriba).`,
    `${c < 0 ? "Como $c$ es negativo, va entre paréntesis." : "Se reemplaza tal cual."} Ya no quedan letras: todo son números.`,
    `$c=${c}$`
  );

  // la ecuacion ya cumplio su papel
  estados.push(estados[estados.length - 1].filter((x) => !["A", "B", "C", "eq", "z"].includes(x.id)));
  trans.push({
    fusiones: [{ desde: ["A", "B", "C", "eq", "z"], hacia: null }],
    texto: `Ya tenemos todos los valores dentro de la fórmula, así que la ecuación de arriba ya no se necesita.`,
    porque: `Los números $a$, $b$ y $c$ quedaron escritos en la fórmula.`,
    regla: `$x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$`,
  });

  // 4) CALCULAR una operacion por paso
  if (b <= 0) {
    f.neg = `${-b}`;
    paso(
      [ultimo],
      texFormula(f),
      `Primera cuenta: el opuesto de $${par(b)}$. $-(${b})=${-b}$.`,
      b < 0 ? `Menos por menos da más: el signo de adelante cambia el de $b$.` : `El opuesto de cero es cero.`,
      `$-(-n)=n$`
    );
  }
  f.sq = `${P}`;
  paso(
    [ultimo],
    texFormula(f),
    `Segunda cuenta: la potencia. $(${b})^{2}=${par(b)}\\cdot ${par(b)}=${P}$.`,
    `Elevar al cuadrado es multiplicar el número por sí mismo. Un negativo por un negativo da positivo, por eso $(${b})^{2}$ nunca es negativo.`,
    `$(-n)^{2}=n^{2}$`
  );
  f.prod = par(Q);
  paso(
    [ultimo],
    texFormula(f),
    `Tercera cuenta: el producto. $4\\cdot ${par(a)}\\cdot ${par(c)}=${Q}$.`,
    `Se multiplica de izquierda a derecha: $4\\cdot ${par(a)}=${4 * a}$ y luego $${4 * a}\\cdot ${par(c)}=${Q}$.`,
    `$\\text{negativo}\\cdot\\text{positivo}=\\text{negativo}$`
  );
  f.rad = `${D}`;
  paso(
    [ultimo],
    texFormula(f),
    `Restamos: $${P}-${par(Q)}=${D}$. Ese resultado se llama discriminante.`,
    `${Q < 0 ? "Restar un número negativo es sumarlo. " : ""}El discriminante nos dice cuántas soluciones hay: aquí ${D === 0 ? "es cero, así que hay una sola" : "es positivo, así que hay dos"}.`,
    `$a-(-b)=a+b$`
  );
  f.den = `${den}`;
  paso(
    [ultimo],
    texFormula(f),
    `Abajo: $2\\cdot ${a}=${den}$.`,
    `Es el doble de $a$. Es el número entre el que se divide todo lo de arriba.`,
    `$2a$`
  );
  f.raiz = `${d}`;
  paso(
    [ultimo],
    texFormula(f),
    `Sacamos la raíz: $\\sqrt{${D}}=${d}$.`,
    `Porque $${d}\\cdot ${d}=${D}$. Como el discriminante es un cuadrado perfecto, la raíz sale exacta.`,
    `$\\sqrt{n^{2}}=n$`
  );

  // 5) abrir el mas o menos
  if (d === 0) {
    estados.push([{ id: "R", tex: `x=${x1}` }]);
    trans.push({
      fusiones: [{ desde: [ultimo], hacia: "R" }],
      texto: `Como la raíz vale $0$, sumar $0$ o restar $0$ da lo mismo: $\\dfrac{${-b}}{${den}}=${x1}$. Hay una sola solución, $x=${x1}$.`,
      porque: `$\\pm 0$ no cambia nada, así que las dos soluciones coinciden.`,
      regla: `$x=\\dfrac{-b}{2a}\\quad (\\Delta=0)$`,
    });
  } else {
    estados.push([
      { id: "x1", tex: `x_{1}=\\dfrac{${-b}+${d}}{${den}}` },
      { id: "o", tex: "\\text{ ó }", op: true },
      { id: "x2", tex: `x_{2}=\\dfrac{${-b}-${d}}{${den}}` },
    ]);
    trans.push({
      fusiones: [{ desde: [ultimo], hacia: ["x1", "o", "x2"] }],
      texto: `El $\\pm$ se abre en dos caminos: uno suma $${d}$ y el otro resta $${d}$.`,
      porque: `El signo $\\pm$ significa "más o menos": son dos soluciones distintas, una por cada signo.`,
      regla: `$\\pm\\ \\Rightarrow\\ \\text{dos soluciones}$`,
    });
    estados.push([
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
    estados.push([
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

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos resolver $${termA}${conSigno(b)}x${conSigno(c)}=0$ con la fórmula general. Vamos a escribir cada paso, como a lápiz.`,
      estados,
      transiciones: trans,
    },
    resumen: { a, b, c, D, d, x1, x2 },
  };
}
