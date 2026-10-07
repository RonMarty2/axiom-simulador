// Generadores de Algebra: arman la animacion completa para CUALQUIER numero
// dentro de los limites. Todo texto del alumno va en LaTeX entre $...$ (MathText):
// fracciones con raya, nunca "/" ni "÷". Las barras invertidas van dobles.
import { fr, type Ficha, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));

/** numero con signo para mostrar: -3, 5 */
const num = (n: number) => `${n}`;
/** fraccion con raya y signo delante: -\dfrac{3}{4} */
const fracTex = (n: number, d: number) => `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`;
/** termino con signo: +5 o -5 */
const conSigno = (n: number) => (n < 0 ? `-${-n}` : `+${n}`);

/**
 * Simplifica la fraccion n/d (g = mcd > 1) SIN saltos: primero se ve de donde sale el g
 * (numerador y denominador se escriben como producto por g), despues se tacha el g repetido.
 * `antes` son las fichas que acompañan (x, =) y se quedan quietas; `idDesde` es la ficha de la fraccion.
 */
function simplificar(
  estados: Ficha[][],
  trans: Transicion[],
  antes: Ficha[],
  idDesde: string,
  n: number,
  d: number,
  g: number
) {
  const nn = Math.abs(n) / g;
  const dd = d / g;
  const signo = n < 0 ? "-" : "";
  const factDen = dd === 1 ? `${g}` : `${dd}\\cdot ${g}`;
  estados.push([...antes, { id: "hf", tex: `${signo}\\dfrac{${nn}\\cdot ${g}}{${factDen}}` }]);
  trans.push({
    fusiones: [{ desde: [idDesde], hacia: "hf" }],
    descompone: true,
    texto: `Buscamos un factor que se repita arriba y abajo: el $${g}$. Escribimos $${Math.abs(n)}=${nn}\\cdot ${g}$ y $${d}=${factDen}$.`,
    porque: `Un número se puede escribir como producto de sus divisores. Así se ve que el $${g}$ está arriba y abajo.`,
  });
  const resultado = dd === 1 ? `${n / g}` : fracTex(n / g, dd);
  estados.push([...antes, { id: "r", tex: resultado }]);
  trans.push({
    fusiones: [{ desde: ["hf"], hacia: "r", modo: "tachar" }],
    texto: `El $${g}$ de arriba y el $${g}$ de abajo se tachan. Queda $${resultado}$.`,
    porque: `Un número dividido entre sí mismo vale $1$, y multiplicar por $1$ no cambia nada. Por eso se puede tachar.`,
    regla: `$\\dfrac{a\\cdot c}{b\\cdot c}=\\dfrac{a}{b}$`,
  });
}

export function validarEcuacionLineal(a: number, b: number, c: number): string | null {
  if (![a, b, c].every(Number.isInteger)) return "Escribe números enteros.";
  if (a < 2 || a > 12) return "El número que multiplica a x debe estar entre 2 y 12.";
  if (b === 0 || Math.abs(b) > 30) return "El número que se suma a x debe ser distinto de 0 y de 30 como máximo (puede ser negativo).";
  if (Math.abs(c) > 99) return "El número de la derecha debe estar entre -99 y 99.";
  return null;
}

/** a·x + b = c  →  x = (c - b) / a, para a >= 2 y cualquier signo de b y c */
export function ecuacionLineal(a: number, b: number, c: number): Resultado {
  const n = c - b;
  const g = mcd(n, a);
  const exacta = n % a === 0;
  const opuesto = conSigno(-b);

  const inicio: Ficha[] = [
    { id: "a", tex: `${a}` },
    { id: "x", tex: "x", pegado: true },
    { id: "b", tex: conSigno(b) },
    { id: "eq", tex: "=", op: true },
    { id: "c", tex: num(c) },
  ];
  // El termino que estorba SE ARRASTRA al otro lado (la misma pieza viaja) y cambia de signo al cruzar la igualdad.
  const estados: Ficha[][] = [
    inicio,
    [
      { id: "a", tex: `${a}` },
      { id: "x", tex: "x", pegado: true },
      { id: "eq", tex: "=", op: true },
      { id: "c", tex: num(c) },
      { id: "b", tex: opuesto },
    ],
    [
      { id: "a", tex: `${a}` },
      { id: "x", tex: "x", pegado: true },
      { id: "eq", tex: "=", op: true },
      { id: "n", tex: num(n) },
    ],
    [
      { id: "x", tex: "x" },
      { id: "eq", tex: "=", op: true },
      fr("fr", num(n), `${a}`),
    ],
  ];
  const trans: Transicion[] = [
    {
      fusiones: [],
      resaltar: ["b"],
      texto: `Queremos dejar $x$ sola. Pasamos el $${conSigno(b)}$ al otro lado. Al cruzar la igualdad cambia de signo: ahora es $${opuesto}$.`,
      porque: `Es lo mismo que sumar $${opuesto}$ en los dos lados: a la izquierda se cancela con $${conSigno(b)}$ y a la derecha queda escrito.`,
      regla: `$a+b=c\\ \\Rightarrow\\ a=c-b$`,
    },
    {
      fusiones: [{ desde: ["c", "b"], hacia: "n" }],
      texto: `Los dos números ya están del mismo lado: los sumamos. $${c}${opuesto}=${n}$.`,
      porque: `Del lado derecho sí hay que hacer la cuenta.`,
      regla: `$a+b=c$`,
    },
    {
      // el 3 NO se funde con el numero: viaja hasta debajo de el y se queda de denominador
      fusiones: [{ desde: ["a", "n"], hacia: "fr", modo: "viajar" }],
      brotes: [
        { desde: "n", hacia: "fr.n" },
        { desde: "a", hacia: "fr.d" },
      ],
      texto: `El $${a}$ multiplica a $x$. Pasa al otro lado dividiendo: viaja hasta debajo del $${n}$ y queda $x=${fracTex(n, a)}$.`,
      porque: `Lo que multiplicaba pasa dividiendo: ahora es el denominador. Es lo mismo que dividir los dos lados entre $${a}$. La fracción es una división: $${Math.abs(n)}$ entre $${a}$.`,
      regla: `$a\\cdot x=n\\ \\Rightarrow\\ x=\\dfrac{n}{a}\\quad (a\\neq 0)$`,
    },
  ];

  if (g > 1) {
    simplificar(estados, trans, [estados[3][0], estados[3][1]], "fr", n, a, g);
    if (exacta) trans[trans.length - 1].porque += ` La fracción sale exacta, así que $x=${n / a}$ es la solución de la ecuación.`;
  } else {
    // ya es irreducible: se cierra marcando el resultado
    trans[trans.length - 1].porque += ` No se puede simplificar más, así que esa fracción es la solución.`;
  }

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos hallar $x$ en $${a}x${conSigno(b)}=${c}$. Dejamos $x$ sola paso a paso.`,
      estados,
      transiciones: trans,
    },
    resumen: { a, b, c, n, g, exacta: exacta ? 1 : 0 },
  };
}

// ---------------------------------------------------------------------------
// Suma y resta de fracciones: n1/d1 ± n2/d2

export function validarFracciones(n1: number, d1: number, n2: number, d2: number): string | null {
  if (![n1, d1, n2, d2].every(Number.isInteger)) return "Escribe números enteros.";
  if (n1 < 1 || n1 > 20 || n2 < 1 || n2 > 20) return "Los numeradores deben estar entre 1 y 20.";
  if (d1 < 2 || d1 > 12 || d2 < 2 || d2 > 12) return "Los denominadores deben estar entre 2 y 12.";
  return null;
}

export function fracciones(n1: number, d1: number, n2: number, d2: number, resta = false): Resultado {
  const op = resta ? "-" : "+";
  const palabra = resta ? "Restamos" : "Sumamos";
  const iguales = d1 === d2;
  const D = d1 * d2;
  const A = n1 * d2;
  const B = n2 * d1;
  const sumaN = resta ? (iguales ? n1 - n2 : A - B) : iguales ? n1 + n2 : A + B;
  const den = iguales ? d1 : D;
  const g = mcd(sumaN, den);
  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];

  estados.push([
    { id: "f1", tex: `\\dfrac{${n1}}{${d1}}` },
    { id: "p", tex: op, op: true },
    { id: "f2", tex: `\\dfrac{${n2}}{${d2}}` },
  ]);

  if (!iguales) {
    estados.push([
      { id: "f1", tex: `\\dfrac{${n1}}{${d1}}` },
      { id: "k1", tex: `\\cdot\\dfrac{${d2}}{${d2}}`, op: true },
      { id: "p", tex: op, op: true },
      { id: "f2", tex: `\\dfrac{${n2}}{${d2}}` },
      { id: "k2", tex: `\\cdot\\dfrac{${d1}}{${d1}}`, op: true },
    ]);
    trans.push({
      fusiones: [],
      brotes: [
        { desde: "f2", hacia: "k1" },
        { desde: "f1", hacia: "k2" },
      ],
      texto: `Los denominadores son distintos. Multiplicamos cada fracción por el denominador de la otra, arriba y abajo: $\\dfrac{${n1}}{${d1}}$ por $\\dfrac{${d2}}{${d2}}$ y $\\dfrac{${n2}}{${d2}}$ por $\\dfrac{${d1}}{${d1}}$.`,
      porque: `$\\dfrac{${d2}}{${d2}}=1$ y $\\dfrac{${d1}}{${d1}}=1$: multiplicar por $1$ no cambia el valor, pero hace que los dos denominadores queden iguales.`,
      regla: `$\\dfrac{a}{b}=\\dfrac{a}{b}\\cdot\\dfrac{c}{c}\\quad\\text{porque}\\quad\\dfrac{c}{c}=1$`,
    });
    estados.push([
      { id: "g1", tex: `\\dfrac{${A}}{${D}}` },
      { id: "p", tex: op, op: true },
      { id: "g2", tex: `\\dfrac{${B}}{${D}}` },
    ]);
    trans.push({
      fusiones: [
        { desde: ["f1", "k1"], hacia: "g1" },
        { desde: ["f2", "k2"], hacia: "g2" },
      ],
      texto: `Multiplicamos numeradores y denominadores: $\\dfrac{${n1}\\cdot${d2}}{${d1}\\cdot${d2}}=\\dfrac{${A}}{${D}}$ y $\\dfrac{${n2}\\cdot${d1}}{${d2}\\cdot${d1}}=\\dfrac{${B}}{${D}}$.`,
      porque: `Ahora las dos fracciones tienen el mismo denominador, $${D}$: las partes son del mismo tamaño y se pueden ${resta ? "restar" : "sumar"}.`,
    });
  }

  const ids = iguales ? ["f1", "p", "f2"] : ["g1", "p", "g2"];
  const cuenta = iguales ? `${n1}${op}${n2}` : `${A}${op}${B}`;
  estados.push([{ id: "h", tex: fracTex(sumaN, den) }]);
  trans.push({
    fusiones: [{ desde: ids, hacia: "h" }],
    texto: iguales
      ? `Los denominadores ya son iguales. ${palabra} los numeradores, $${cuenta}=${sumaN}$, y el $${den}$ se queda.`
      : `${palabra} los numeradores, $${cuenta}=${sumaN}$, y el $${den}$ se queda.`,
    porque: `Con partes del mismo tamaño, solo se cuenta cuántas partes hay ${resta ? "de diferencia" : "en total"}.`,
    regla: resta ? `$\\dfrac{a}{c}-\\dfrac{b}{c}=\\dfrac{a-b}{c}$` : `$\\dfrac{a}{c}+\\dfrac{b}{c}=\\dfrac{a+b}{c}$`,
  });

  if (sumaN === 0) {
    estados.push([{ id: "r", tex: "0" }]);
    trans.push({
      fusiones: [{ desde: ["h"], hacia: "r" }],
      texto: `Cero partes de cualquier tamaño es $0$.`,
      porque: `Las dos fracciones valían lo mismo, y al restarlas no queda nada.`,
    });
  } else if (g > 1) {
    simplificar(estados, trans, [], "h", sumaN, den, g);
    if (den / g === 1) trans[trans.length - 1].porque += ` La fracción sale exacta: es un número entero.`;
  } else {
    trans[trans.length - 1].porque += ` Esta fracción ya no se puede simplificar.`;
  }

  const rn = sumaN / g;
  const rd = den / g;
  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos calcular $\\dfrac{${n1}}{${d1}}${op}\\dfrac{${n2}}{${d2}}$.${iguales ? " Los denominadores son iguales." : " Los denominadores son distintos."}`,
      estados,
      transiciones: trans,
    },
    resumen: { n1, d1, n2, d2, rn, rd, resta: resta ? 1 : 0 },
  };
}

// ---------------------------------------------------------------------------
// Diferencia de cuadrados: x^2 - k^2 = 0

export function validarCuadrados(k: number): string | null {
  if (!Number.isInteger(k) || k < 2 || k > 15) return "El número que se eleva al cuadrado debe ser un entero entre 2 y 15. Escribe la raíz: 3 para x² − 9.";
  return null;
}

export function diferenciaCuadrados(k: number): Resultado {
  const q = k * k;
  const base: Ficha[] = [
    { id: "a", tex: "x^2" },
    { id: "m", tex: "-", op: true },
  ];
  const cola: Ficha[] = [
    { id: "eq1", tex: "=", op: true },
    { id: "z1", tex: "0" },
  ];
  const factores: Ficha[] = [
    { id: "f1", tex: `(x-${k})` },
    { id: "f2", tex: `(x+${k})` },
  ];
  // la letra que cumple cada pieza en la formula (a = x, b = k), escrita debajo
  const baseEtiquetada: Ficha[] = [
    { id: "a", tex: "x^2", debajo: "a=x" },
    { id: "m", tex: "-", op: true },
  ];
  const n3Etiquetado: Ficha = { id: "n3", tex: `${k}^2`, debajo: `b=${k}` };
  const formulaLetras = "a^{2}-b^{2}=(a-b)(a+b)";
  const formulaNumeros = `x^{2}-${k}^{2}=(x-${k})(x+${k})`;
  const estados: Ficha[][] = [
    [...base, { id: "n", tex: `${q}` }, ...cola],
    [...base, { id: "n3", tex: `${k}^2` }, ...cola],
    // se nombran a y b
    [...baseEtiquetada, n3Etiquetado, ...cola],
    // la formula general aparece debajo (con letras)
    [...baseEtiquetada, n3Etiquetado, ...cola, { id: "F", tex: formulaLetras, salto: true }],
    // se reemplazan a y b por lo que valen (x y k) en la formula
    [...baseEtiquetada, n3Etiquetado, ...cola, { id: "F", tex: formulaNumeros, salto: true }],
    // la izquierda se reemplaza por lo que dice la formula: los dos parentesis
    [...factores, ...cola],
    [...factores, ...cola],
    // un factor por ecuacion, todavia con parentesis
    [
      { id: "f1", tex: `(x-${k})` },
      { id: "eq1", tex: "=", op: true },
      { id: "z1", tex: "0" },
      { id: "or", tex: "\\text{ ó }", op: true },
      { id: "f2", tex: `(x+${k})` },
      { id: "eq2", tex: "=", op: true },
      { id: "z2", tex: "0" },
    ],
    // los parentesis solo agrupaban: se quitan y quedan las piezas sueltas
    [
      { id: "x1", tex: "x" },
      { id: "m1", tex: `-${k}` },
      { id: "eq1", tex: "=", op: true },
      { id: "z1", tex: "0" },
      { id: "or", tex: "\\text{ ó }", op: true },
      { id: "x2", tex: "x" },
      { id: "m2", tex: `+${k}` },
      { id: "eq2", tex: "=", op: true },
      { id: "z2", tex: "0" },
    ],
    // el -k y el +k se ARRASTRAN al otro lado y cambian de signo
    [
      { id: "x1", tex: "x" },
      { id: "eq1", tex: "=", op: true },
      { id: "z1", tex: "0" },
      { id: "m1", tex: `+${k}` },
      { id: "or", tex: "\\text{ ó }", op: true },
      { id: "x2", tex: "x" },
      { id: "eq2", tex: "=", op: true },
      { id: "z2", tex: "0" },
      { id: "m2", tex: `-${k}` },
    ],
    [
      { id: "x1", tex: "x" },
      { id: "eq1", tex: "=", op: true },
      { id: "r1", tex: `${k}` },
      { id: "or", tex: "\\text{ ó }", op: true },
      { id: "x2", tex: "x" },
      { id: "eq2", tex: "=", op: true },
      { id: "r2", tex: `-${k}` },
    ],
  ];
  const trans: Transicion[] = [
    {
      fusiones: [{ desde: ["n"], hacia: "n3" }],
      texto: `Escribimos $${q}$ como un cuadrado: $${q}=${k}\\cdot${k}=${k}^{2}$.`,
      porque: `Para usar la fórmula necesitamos que los dos números estén elevados al cuadrado: $x^{2}$ ya lo está, y el $${q}$ es $${k}^{2}$.`,
    },
    {
      fusiones: [],
      resaltar: ["a", "n3"],
      texto: `Reconocemos el patrón $a^{2}-b^{2}$: aquí $a=x$ y $b=${k}$. Lo anotamos debajo de cada número.`,
      porque: `Es una resta de dos cuadrados. Esa forma se llama diferencia de cuadrados y siempre se factoriza igual.`,
    },
    {
      fusiones: [],
      brotes: [{ desde: "eq1", hacia: "F" }],
      texto: `Escribimos debajo la fórmula de la diferencia de cuadrados: $a^{2}-b^{2}=(a-b)(a+b)$.`,
      porque: `Es una fórmula que vale para cualquier $a$ y cualquier $b$. Con ella una resta de cuadrados se convierte en un producto.`,
      regla: `$a^{2}-b^{2}=(a-b)(a+b)$`,
    },
    {
      fusiones: [],
      resaltar: ["F", "a", "n3"],
      texto: `En la fórmula ponemos lo que vale cada letra: $a=x$ y $b=${k}$. Queda $x^{2}-${k}^{2}=(x-${k})(x+${k})$.`,
      porque: `Donde la fórmula dice $a$ escribimos $x$, y donde dice $b$ escribimos $${k}$. Se puede comprobar: $(x-${k})(x+${k})=x^{2}+${k}x-${k}x-${q}=x^{2}-${q}$. Los términos $${k}x$ y $-${k}x$ se cancelan.`,
    },
    {
      fusiones: [{ desde: ["a", "m", "n3", "F"], hacia: ["f1", "f2"] }],
      texto: `Lo de la izquierda, $x^{2}-${k}^{2}$, vale lo mismo que lo de la derecha de la fórmula. Lo cambiamos: queda $(x-${k})(x+${k})$.`,
      porque: `La fórmula dice que son iguales, así que podemos escribir uno en lugar del otro sin cambiar la ecuación.`,
    },
    {
      fusiones: [],
      resaltar: ["f1", "f2"],
      texto: `Tenemos un producto de dos factores igual a $0$.`,
      porque: `Un producto solo da $0$ si al menos uno de sus factores vale $0$. Si ninguno fuera $0$, el producto tampoco lo sería.`,
      regla: `$a\\cdot b=0\\ \\Rightarrow\\ a=0\\ \\text{ ó }\\ b=0$`,
    },
    {
      fusiones: [],
      brotes: [
        { desde: "eq1", hacia: "eq2" },
        { desde: "z1", hacia: "z2" },
        { desde: "eq1", hacia: "or" },
      ],
      texto: `Igualamos cada factor a cero: $(x-${k})=0$ o $(x+${k})=0$. Copiamos el $=0$ para el segundo factor.`,
      porque: `Cada factor puede ser el que vale $0$, así que se resuelve una ecuación para cada uno.`,
    },
    {
      fusiones: [
        { desde: ["f1"], hacia: ["x1", "m1"] },
        { desde: ["f2"], hacia: ["x2", "m2"] },
      ],
      texto: `Quitamos los paréntesis: $(x-${k})$ queda $x-${k}$ y $(x+${k})$ queda $x+${k}$. Ahora el $x$ y el número están sueltos.`,
      porque: `Un paréntesis que no tiene nada multiplicando por fuera solo agrupa; se puede quitar sin cambiar el valor.`,
    },
    {
      fusiones: [],
      resaltar: ["m1", "m2"],
      texto: `Para dejar $x$ sola, pasamos el $-${k}$ al otro lado: cambia de signo y queda $+${k}$. En la otra ecuación, el $+${k}$ pasa como $-${k}$.`,
      porque: `Es lo mismo que sumar el opuesto en los dos lados: al cruzar la igualdad un número cambia de signo.`,
      regla: `$a+b=c\\ \\Rightarrow\\ a=c-b$`,
    },
    {
      fusiones: [
        { desde: ["z1", "m1"], hacia: "r1" },
        { desde: ["z2", "m2"], hacia: "r2" },
      ],
      texto: `A la derecha, $0+${k}=${k}$ y $0-${k}=-${k}$. Soluciones: $x=${k}$ o $x=-${k}$.`,
      porque: `Sumar $0$ no cambia el número.`,
      regla: `$0+a=a$`,
    },
  ];
  return {
    demo: { titulo: "", nota: "", intro: `Queremos resolver $x^{2}-${q}=0$.`, estados, transiciones: trans },
    resumen: { k, q },
  };
}

// ---------------------------------------------------------------------------
// Suma de logaritmos de igual base: log_b(m) + log_b(n) = log_b(m·n) = k

/** exponente k si p = b^k, o null */
export function exponenteDe(b: number, p: number): number | null {
  let v = 1;
  for (let k = 0; k <= 12; k++) {
    if (v === p) return k;
    v *= b;
    if (v > p) return null;
  }
  return null;
}

export function validarLogaritmos(b: number, m: number, n: number): string | null {
  if (![b, m, n].every(Number.isInteger)) return "Escribe números enteros.";
  if (b < 2 || b > 10) return "La base debe estar entre 2 y 10.";
  if (m < 2 || n < 2 || m > 1000 || n > 1000) return "Los números dentro de cada logaritmo deben estar entre 2 y 1000.";
  const k = exponenteDe(b, m * n);
  if (k === null || k < 1) return `Para que el resultado sea un número entero, el producto de los dos números debe ser una potencia de ${b}. Prueba, por ejemplo, base 2 con 4 y 8.`;
  return null;
}

/**
 * Cada logaritmo se resuelve por su SIGNIFICADO antes de sumar: log_b(m) pregunta cuantos b hay que
 * multiplicar para llegar a m. Se escribe m como b·b·b, se cuentan, y asi nace el valor. Solo aplica
 * si m y n son potencias de b; si no, se usa el camino por propiedad.
 */
function sumaLogaritmosPorSignificado(b: number, m: number, n: number, e1: number, e2: number): Resultado {
  const L = (dentro: string) => `\\log_{${b}}(${dentro})`;
  type Lado = { id: string; valor: number; m: number };
  const lados: Lado[] = [
    { id: "a", valor: e1, m },
    { id: "z", valor: e2, m: n },
  ];

  const inicial = (l: Lado): Ficha[] => [{ id: `${l.id}l`, tex: L(`${l.m}`) }];
  const factores = (l: Lado): Ficha[] => {
    const fs: Ficha[] = [{ id: `${l.id}o`, tex: `\\log_{${b}}(` }];
    for (let i = 1; i <= l.valor; i++) {
      if (i > 1) fs.push({ id: `${l.id}t${i}`, tex: "\\cdot", op: true });
      fs.push({ id: `${l.id}f${i}`, tex: `${b}` });
    }
    fs.push({ id: `${l.id}c`, tex: ")" });
    return fs;
  };
  const agrupado = (l: Lado): Ficha[] => [
    { id: `${l.id}o`, tex: `\\log_{${b}}(` },
    { id: `${l.id}f1`, tex: `${b}` },
    { id: `${l.id}e`, tex: `${l.valor}`, sup: true },
    { id: `${l.id}c`, tex: ")" },
  ];
  const valor = (l: Lado): Ficha[] => [{ id: `${l.id}r`, tex: `${l.valor}` }];

  const p: Ficha = { id: "p", tex: "+", op: true };
  const juntar = (x: Ficha[], y: Ficha[]) => [...x, p, ...y];
  const estados: Ficha[][] = [juntar(inicial(lados[0]), inicial(lados[1]))];
  const trans: Transicion[] = [];

  // lo que ya esta resuelto de cada lado en cada momento
  const actual: Record<string, Ficha[]> = { a: inicial(lados[0]), z: inicial(lados[1]) };
  const poner = (l: Lado, fs: Ficha[]) => {
    actual[l.id] = fs;
    estados.push(juntar(actual.a, actual.z));
  };

  for (const l of lados) {
    const vecesB = Array.from({ length: l.valor }, () => `${b}`).join("\\cdot ");
    const fs = factores(l);
    poner(l, fs);
    trans.push({
      fusiones: [{ desde: [`${l.id}l`], hacia: fs.map((f) => f.id) }],
      texto: `Resolvemos $${L(`${l.m}`)}$ solo: pregunta ¿cuántas veces hay que multiplicar el $${b}$ para llegar a $${l.m}$? Escribimos $${vecesB}=${l.m}$.`,
      porque: `Un logaritmo es un exponente: cuenta cuántos $${b}$ se multiplican para formar $${l.m}$.`,
      regla: `$\\log_{${b}}(a)=y\\ \\iff\\ ${b}^{y}=a$`,
    });
    if (l.valor > 1) {
      poner(l, agrupado(l));
      const sobran = fs.filter((f) => f.id !== `${l.id}o` && f.id !== `${l.id}c` && f.id !== `${l.id}f1`).map((f) => f.id);
      trans.push({
        fusiones: [{ desde: sobran, hacia: `${l.id}e`, ancla: `${l.id}f1` }],
        texto: `Contamos: hay $${l.valor}$ veces el $${b}$. Se escribe una vez, con exponente $${l.valor}$: $${b}^{${l.valor}}$.`,
        porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma. La base $${b}$ se queda quieta.`,
        regla: `$\\underbrace{a\\cdot a\\cdots a}_{n}=a^{n}$`,
      });
    }
    const dentro = l.valor > 1 ? [`${l.id}o`, `${l.id}f1`, `${l.id}e`, `${l.id}c`] : [`${l.id}o`, `${l.id}f1`, `${l.id}c`];
    poner(l, valor(l));
    trans.push({
      fusiones: [{ desde: dentro, hacia: `${l.id}r` }],
      texto: `$${L(`${b}^{${l.valor}}`)}=${l.valor}$: el exponente al que elevamos $${b}$ es $${l.valor}$. Entonces $${L(`${l.m}`)}=${l.valor}$.`,
      porque: `El logaritmo devuelve justo el exponente que ya está escrito arriba de la $${b}$.`,
      regla: `$\\log_{${b}}(${b}^{n})=n$`,
    });
  }

  const k = e1 + e2;
  estados.push([{ id: "tot", tex: `${k}` }]);
  trans.push({
    fusiones: [{ desde: ["ar", "p", "zr"], hacia: "tot" }],
    texto: `Ahora sí sumamos los resultados: $${e1}+${e2}=${k}$.`,
    porque: `Comprobamos con la propiedad del producto: $\\log_{${b}}(${m}\\cdot ${n})=\\log_{${b}}(${m * n})=${k}$, porque $${b}^{${k}}=${m * n}$. Da lo mismo.`,
    regla: `$\\log_{${b}}(a)+\\log_{${b}}(c)=\\log_{${b}}(a\\cdot c)$`,
  });

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos calcular $${L(`${m}`)}+${L(`${n}`)}$. Recuerda: $\\log_{${b}}(a)$ es el exponente al que hay que elevar $${b}$ para obtener $a$. Resolvemos cada uno y después sumamos.`,
      estados,
      transiciones: trans,
    },
    resumen: { b, m, n, p: m * n, k, e1, e2 },
  };
}

/** suma de logaritmos de igual base: por significado si m y n son potencias de b; si no, por la propiedad del producto */
export function sumaLogaritmos(b: number, m: number, n: number): Resultado {
  const e1 = exponenteDe(b, m);
  const e2 = exponenteDe(b, n);
  if (e1 !== null && e2 !== null && e1 >= 1 && e2 >= 1) return sumaLogaritmosPorSignificado(b, m, n, e1, e2);
  return sumaLogaritmosPropiedad(b, m, n);
}

/** camino por la propiedad del producto (cuando m o n no son potencias de b, aunque m·n si lo sea) */
export function sumaLogaritmosPropiedad(b: number, m: number, n: number): Resultado {
  const p = m * n;
  const k = exponenteDe(b, p) as number;
  const L = (dentro: string) => `\\log_{${b}}(${dentro})`;
  const vecesB = Array.from({ length: k }, () => `${b}`).join("\\cdot ");

  // la ficha "p" del producto se descompone en k factores b: b · b · b ...
  const factores: Ficha[] = [{ id: "o", tex: `\\log_{${b}}(` }];
  for (let i = 1; i <= k; i++) {
    if (i > 1) factores.push({ id: `t${i}`, tex: "\\cdot", op: true });
    factores.push({ id: `f${i}`, tex: `${b}` });
  }
  factores.push({ id: "c", tex: ")" });

  const estados: Ficha[][] = [
    [
      { id: "l1", tex: L(`${m}`) },
      { id: "p", tex: "+", op: true },
      { id: "l2", tex: L(`${n}`) },
    ],
    [
      { id: "l1", tex: L(`${m}`) },
      { id: "p", tex: "+", op: true },
      { id: "l2", tex: L(`${n}`) },
    ],
    [{ id: "u", tex: L(`${m}\\cdot ${n}`) }],
    [{ id: "v", tex: L(`${p}`) }],
    factores,
  ];
  const trans: Transicion[] = [
    {
      fusiones: [],
      resaltar: ["l1", "l2"],
      texto: `Miramos las dos bases: las dos son $${b}$. Es la condición para poder juntar los logaritmos.`,
      porque: `Un logaritmo con otra base preguntaría otra cosa. Con la misma base, los dos preguntan por exponentes de $${b}$ y se pueden combinar.`,
    },
    {
      fusiones: [{ desde: ["l1", "p", "l2"], hacia: "u" }],
      texto: `Se juntan en un solo logaritmo, y lo de adentro se multiplica: $${m}\\cdot ${n}$.`,
      porque: `Sumar logaritmos de igual base es lo mismo que tomar el logaritmo del producto.`,
      regla: `$\\log_{${b}}(a)+\\log_{${b}}(c)=\\log_{${b}}(a\\cdot c)$`,
    },
    {
      fusiones: [{ desde: ["u"], hacia: "v" }],
      texto: `Hacemos la multiplicación de adentro: $${m}\\cdot ${n}=${p}$.`,
      porque: `Ahora hay un solo logaritmo con un solo número adentro.`,
    },
    {
      fusiones: [{ desde: ["v"], hacia: factores.map((f) => f.id) }],
      texto: k === 1 ? `Vemos que $${p}$ es justo $${b}$.` : `Escribimos $${p}$ como una multiplicación de $${b}$ por sí mismo: $${vecesB}=${p}$.`,
      porque: `El logaritmo pregunta: ¿a qué exponente hay que elevar $${b}$ para obtener $${p}$? Para verlo, conviene escribir $${p}$ usando $${b}$.`,
    },
  ];

  if (k > 1) {
    const grupo: Ficha[] = [
      { id: "o", tex: `\\log_{${b}}(` },
      { id: "f1", tex: `${b}` },
      { id: "e", tex: `${k}`, sup: true },
      { id: "c", tex: ")" },
    ];
    estados.push(grupo);
    const sobran = factores.filter((f) => f.id !== "o" && f.id !== "c" && f.id !== "f1").map((f) => f.id);
    trans.push({
      fusiones: [{ desde: sobran, hacia: "e", ancla: "f1" }],
      texto: `Contamos los factores: hay $${k}$ veces el $${b}$. Se escribe una sola vez, con exponente $${k}$: $${b}^{${k}}$.`,
      porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma. La base $${b}$ no cambia: se queda quieta.`,
      regla: `$\\underbrace{a\\cdot a\\cdots a}_{n}=a^{n}$`,
    });
  }

  const dentro: string[] = k > 1 ? ["o", "f1", "e", "c"] : ["o", "f1", "c"];
  const pregunta: Ficha[] = k > 1 ? estados[estados.length - 1] : factores;
  estados.push(pregunta);
  trans.push({
    fusiones: [],
    resaltar: k > 1 ? ["f1", "e"] : ["f1"],
    texto: `Ahora la pregunta se responde sola: ¿a qué exponente hay que elevar $${b}$ para obtener $${b}^{${k}}$?`,
    porque: `Justamente el que ya está escrito arriba de la $${b}$: $${k}$.`,
    regla: `$\\log_{${b}}(a)=y\\ \\iff\\ ${b}^{y}=a$`,
  });
  estados.push([{ id: "r", tex: `${k}` }]);
  trans.push({
    fusiones: [{ desde: dentro, hacia: "r" }],
    texto: `$\\log_{${b}}(${b}^{${k}})=${k}$. La respuesta es $${k}$.`,
    porque: `Para comprobar: $${b}^{${k}}=${p}$, y $${p}$ era el resultado de $${m}\\cdot ${n}$.`,
    regla: `$\\log_{${b}}(${b}^{n})=n$`,
  });

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos calcular $${L(`${m}`)}+${L(`${n}`)}$. Recuerda: $\\log_{${b}}(a)$ es el exponente al que hay que elevar $${b}$ para obtener $a$.`,
      estados,
      transiciones: trans,
    },
    resumen: { b, m, n, p, k },
  };
}
