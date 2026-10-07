// Ecuacion de segundo grado por formula general: ax^2 + bx + c = 0.
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

export function cuadratica(a: number, b: number, c: number): Resultado {
  const D = b * b - 4 * a * c;
  const d = raizEntera(D) as number;
  const P = b * b;
  const Q = 4 * a * c;
  const den = 2 * a;
  const x1 = (-b + d) / den;
  const x2 = (-b - d) / den;
  const termA = a === 1 ? "x^{2}" : `${a}x^{2}`;

  const ecuacion: Ficha[] = [
    { id: "A", tex: termA },
    { id: "B", tex: `${conSigno(b)}x` },
    { id: "C", tex: conSigno(c) },
    { id: "eq", tex: "=", op: true },
    { id: "z", tex: "0" },
  ];
  const formula = "x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}";
  const sustituida = `x=\\dfrac{-${par(b)}\\pm\\sqrt{${par(b)}^{2}-4\\cdot ${par(a)}\\cdot ${par(c)}}}{2\\cdot ${par(a)}}`;
  const calculada = `x=\\dfrac{${-b}\\pm\\sqrt{${P}-${Q < 0 ? `(${Q})` : Q}}}{${den}}`;
  const discriminante = `x=\\dfrac{${-b}\\pm\\sqrt{${D}}}{${den}}`;
  const conRaiz = `x=\\dfrac{${-b}\\pm ${d}}{${den}}`;

  const estados: Ficha[][] = [
    ecuacion,
    ecuacion,
    [...ecuacion, { id: "F", tex: formula }],
    [{ id: "G", tex: sustituida }],
    [{ id: "H", tex: calculada }],
    [{ id: "I", tex: discriminante }],
    [{ id: "J", tex: conRaiz }],
  ];
  const trans: Transicion[] = [
    {
      fusiones: [],
      resaltar: ["A", "B", "C"],
      texto: `Reconocemos la forma $ax^{2}+bx+c=0$: aquí $a=${a}$, $b=${b}$ y $c=${c}$.`,
      porque: `Cada letra es el número que acompaña a cada término, con su signo. Si no hay número delante de $x^{2}$, es $1$.`,
      regla: `$ax^{2}+bx+c=0$`,
    },
    {
      fusiones: [],
      brotes: [{ desde: "eq", hacia: "F" }],
      texto: `Como la ecuación está igualada a cero, podemos usar la fórmula general.`,
      porque: `Esta fórmula resuelve cualquier ecuación de segundo grado que tenga la forma de arriba. Solo hay que poner $a$, $b$ y $c$.`,
      regla: `$${formula}$`,
    },
    {
      fusiones: [{ desde: ["F", "A", "B", "C", "eq", "z"], hacia: "G" }],
      texto: `Los valores van a su lugar en la fórmula: $a=${a}$, $b=${b}$, $c=${c}$. Los negativos van entre paréntesis.`,
      porque: `Un número negativo se encierra en paréntesis para no confundir su signo con una resta: $-(${b})$ y $(${b})^{2}$ no son lo mismo que sin paréntesis.`,
      regla: `$(-n)^{2}=n^{2}\\quad\\text{y}\\quad -(-n)=n$`,
    },
    {
      fusiones: [{ desde: ["G"], hacia: "H" }],
      texto: `Calculamos lo de afuera y lo de adentro de la raíz: $-(${b})=${-b}$, $(${b})^{2}=${P}$, $4\\cdot ${a}\\cdot (${c})=${Q}$ y $2\\cdot ${a}=${den}$.`,
      porque: `Se resuelven primero las potencias y las multiplicaciones. Por eso $(${b})^{2}$ da $${P}$ aunque $${b}$ sea ${b < 0 ? "negativo" : "positivo"}.`,
      regla: `$\\text{potencias y productos primero}$`,
    },
    {
      fusiones: [{ desde: ["H"], hacia: "I" }],
      texto: `Restamos lo de adentro de la raíz: $${P}-${Q < 0 ? `(${Q})` : Q}=${D}$. Ese número se llama discriminante.`,
      porque: `Restar un número negativo es sumarlo. El discriminante $b^{2}-4ac$ nos dice cuántas soluciones hay: aquí es ${D === 0 ? "cero, así que hay una sola" : "positivo, así que hay dos"}.`,
      regla: `$\\Delta=b^{2}-4ac$`,
    },
    {
      fusiones: [{ desde: ["I"], hacia: "J" }],
      texto: `Calculamos la raíz: $\\sqrt{${D}}=${d}$.`,
      porque: `Porque $${d}\\cdot ${d}=${D}$. Como el discriminante es un cuadrado perfecto, la raíz sale exacta.`,
      regla: `$\\sqrt{n^{2}}=n$`,
    },
  ];

  if (d === 0) {
    estados.push([{ id: "R", tex: `x=${x1}` }]);
    trans.push({
      fusiones: [{ desde: ["J"], hacia: "R" }],
      texto: `Como la raíz es $0$, sumar y restar da lo mismo: queda una sola solución, $x=${x1}$.`,
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
      fusiones: [{ desde: ["J"], hacia: ["x1", "o", "x2"] }],
      texto: `El $\\pm$ se abre en dos caminos: uno con $+${d}$ y otro con $-${d}$.`,
      porque: `El signo $\\pm$ significa "más o menos": son dos soluciones distintas, una por cada signo.`,
      regla: `$\\pm\\ \\Rightarrow\\ \\text{dos soluciones}$`,
    });
    estados.push([
      { id: "r1", tex: `x_{1}=${x1}` },
      { id: "o", tex: "\\text{ ó }", op: true },
      { id: "r2", tex: `x_{2}=${x2}` },
    ]);
    trans.push({
      fusiones: [
        { desde: ["x1"], hacia: "r1" },
        { desde: ["x2"], hacia: "r2" },
      ],
      texto: `Calculamos cada una: $\\dfrac{${-b + d}}{${den}}=${x1}$ y $\\dfrac{${-b - d}}{${den}}=${x2}$.`,
      porque: `Se suma o resta arriba y después se divide entre $${den}$. Soluciones: $x=${x1}$ o $x=${x2}$.`,
      regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
    });
  }

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos resolver $${termA}${conSigno(b)}x${conSigno(c)}=0$ con la fórmula general.`,
      estados,
      transiciones: trans,
    },
    resumen: { a, b, c, D, d, x1, x2 },
  };
}
