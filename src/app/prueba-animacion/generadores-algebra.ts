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
  g: number,
  /** true si la ficha de origen ya trae el signo menos delante de la fraccion (no hay que moverlo) */
  signoYaAdelante = false
) {
  const nn = Math.abs(n) / g;
  const dd = d / g;
  const signo = n < 0 ? "-" : "";
  const factDen = dd === 1 ? `${g}` : `${dd}\\cdot ${g}`;
  let desde = idDesde;

  // con numerador negativo el signo pasa al frente de la fraccion: se dice y se muestra
  if (n < 0 && !signoYaAdelante) {
    estados.push([...antes, { id: "hs", tex: `-\\dfrac{${-n}}{${d}}` }]);
    trans.push({
      fusiones: [{ desde: [desde], hacia: "hs" }],
      texto: `El numerador es negativo. Dejamos el signo menos delante de toda la fracción: $\\dfrac{${n}}{${d}}=-\\dfrac{${-n}}{${d}}$.`,
      porque: `Un número negativo dividido entre uno positivo da un resultado negativo. El signo afecta a toda la fracción, así que se escribe delante y trabajamos con $${-n}$ y $${d}$.`,
      regla: `$\\dfrac{-a}{b}=-\\dfrac{a}{b}$`,
    });
    desde = "hs";
  }

  // como se halla el g: se listan los divisores de arriba y de abajo y se elige el mayor comun
  const divs = (v: number) => Array.from({ length: v }, (_, i) => i + 1).filter((k) => v % k === 0);
  const dn = divs(Math.abs(n));
  const dd2 = divs(d);
  const comunes = dn.filter((k) => dd2.includes(k));
  estados.push(estados[estados.length - 1]);
  trans.push({
    fusiones: [],
    resaltar: [desde],
    texto: `Para simplificar necesitamos un número que divida al de arriba y al de abajo. Divisores de $${Math.abs(n)}$: $${dn.join(",\\ ")}$. Divisores de $${d}$: $${dd2.join(",\\ ")}$. Los que están en las dos listas: $${comunes.join(",\\ ")}$. Tomamos el mayor: $${g}$.`,
    porque: `Un divisor es un número que entra exacto en otro. Si un número divide a los dos, se puede sacar de arriba y de abajo sin cambiar el valor.`,
  });

  estados.push([...antes, { id: "hf", tex: `${signo}\\dfrac{${nn}\\cdot ${g}}{${factDen}}` }]);
  trans.push({
    fusiones: [{ desde: [desde], hacia: "hf" }],
    descompone: true,
    texto:
      dd === 1
        ? `Buscamos un factor que se repita arriba y abajo: el $${g}$. Arriba escribimos $${Math.abs(n)}=${nn}\\cdot ${g}$. Abajo ya está el $${g}$.`
        : `Buscamos un factor que se repita arriba y abajo: el $${g}$. Escribimos $${Math.abs(n)}=${nn}\\cdot ${g}$ y $${d}=${factDen}$.`,
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

  if (n === 0) {
    // 0 entre a: no hay nada que simplificar (no se inventa "0 = 0 por a")
    estados.push([estados[3][0], estados[3][1], { id: "r", tex: "0" }]);
    trans.push({
      fusiones: [{ desde: ["fr"], hacia: "r" }],
      texto: `Cero entre $${a}$ es $0$. Entonces $x=0$.`,
      porque: `Si no hay nada que repartir, a cada parte le toca $0$. Cero dividido entre cualquier número distinto de $0$ es $0$. Así $x=0$ es la solución de la ecuación.`,
      regla: `$\\dfrac{0}{a}=0\\quad (a\\neq 0)$`,
    });
  } else if (g > 1) {
    simplificar(estados, trans, [estados[3][0], estados[3][1]], "fr", n, a, g);
    if (exacta) trans[trans.length - 1].porque += ` La fracción sale exacta, así que $x=${n / a}$ es la solución de la ecuación.`;
  } else {
    // ya es irreducible: se cierra marcando el resultado
    trans[trans.length - 1].porque += ` No se puede simplificar más, así que esa fracción es la solución.`;
  }

  if (exacta) {
    // comprobacion contra el enunciado ORIGINAL, una operacion por paso (solo con x entero; con fraccion queda anotado)
    const v = n / a;
    const vTex = v < 0 ? `(${v})` : `${v}`;
    const ultimo = estados[estados.length - 1];
    const linea: Ficha[] = [
      { id: "S", tex: "", salto: true },
      { id: "Ca", tex: `${a}` },
      { id: "Cx", tex: "x", pegado: true },
      { id: "Cb", tex: conSigno(b) },
      { id: "Ce", tex: "=", op: true },
      { id: "Cc", tex: `${c}` },
    ];
    estados.push([...ultimo, ...linea]);
    trans.push({
      fusiones: [],
      brotes: linea.map((f) => ({ desde: "eq", hacia: f.id })),
      texto: `Comprobamos: volvemos a escribir la ecuación del enunciado, $${a}x${conSigno(b)}=${c}$, debajo.`,
      porque: `Una solución es buena si, al ponerla en lugar de $x$ en la ecuación original, la igualdad se cumple.`,
    });
    const [S, Ca, , Cb, Ce, Cc] = linea;
    estados.push([...ultimo, S, Ca, { id: "Cr", tex: vTex, pegado: true }, Cb, Ce, Cc]);
    trans.push({
      fusiones: [{ desde: ["Cx"], hacia: "Cr" }],
      brotes: [{ desde: "r", hacia: "Cr" }],
      texto: `Reemplazamos $x$ por su valor, $${v}$.`,
      porque: `Donde la ecuación dice $x$ escribimos el número que encontramos.`,
    });
    estados.push([...ultimo, S, { id: "Cp", tex: `${a * v}` }, Cb, Ce, Cc]);
    trans.push({
      fusiones: [{ desde: ["Ca", "Cr"], hacia: "Cp" }],
      texto: `Primero la multiplicación: $${a}\\cdot ${vTex}=${a * v}$.`,
      porque: `En una expresión, la multiplicación se hace antes que la suma.`,
    });
    estados.push([...ultimo, S, { id: "Cs", tex: `${c}` }, Ce, Cc]);
    trans.push({
      fusiones: [{ desde: ["Cp", "Cb"], hacia: "Cs" }],
      texto: `Ahora la suma: $${a * v}${conSigno(b)}=${c}$.`,
      porque: `Con la multiplicación hecha, solo queda sumar.`,
    });
    estados.push([...ultimo, S, { id: "ok", tex: `${c}=${c}\\ \\checkmark` }]);
    trans.push({
      fusiones: [{ desde: ["Cs", "Ce", "Cc"], hacia: "ok" }],
      texto: `Los dos lados valen $${c}$: la igualdad se cumple. Entonces $x=${v}$ es solución de $${a}x${conSigno(b)}=${c}$.`,
      porque: `Si al reemplazar $x$ los dos lados dan lo mismo, la solución es correcta.`,
    });
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

  const p: Ficha = { id: "p", tex: op, op: true };
  estados.push([fr("f1", `${n1}`, `${d1}`), p, fr("f2", `${n2}`, `${d2}`)]);

  // ids de las dos fracciones cuando YA comparten denominador, y los numeradores que quedan
  let x1 = "f1";
  let x2 = "f2";
  let nx2 = `${n2}`;

  if (!iguales) {
    const m1: Ficha = { id: "m1", tex: "\\cdot", op: true };
    const m2: Ficha = { id: "m2", tex: "\\cdot", op: true };
    const k1 = fr("k1", `${d2}`, `${d2}`);
    const k2 = fr("k2", `${d1}`, `${d1}`);
    // 1) el 1 escrito como fraccion NACE del denominador de la otra fraccion, una fraccion por paso
    estados.push([fr("f1", `${n1}`, `${d1}`), m1, k1, p, fr("f2", `${n2}`, `${d2}`)]);
    trans.push({
      fusiones: [],
      brotes: [
        { desde: "f2.d", hacia: "m1" },
        { desde: "f2.d", hacia: "k1" },
      ],
      texto: `Los denominadores son distintos ($${d1}$ y $${d2}$). A la primera fracción la multiplicamos por $\\dfrac{${d2}}{${d2}}$: ese $${d2}$ sale del denominador de la segunda fracción.`,
      porque: `$\\dfrac{${d2}}{${d2}}=1$: multiplicar por $1$ no cambia el valor. Lo hacemos para que el denominador de la primera fracción también sea múltiplo de $${d2}$.`,
      regla: `$\\dfrac{a}{b}=\\dfrac{a}{b}\\cdot\\dfrac{c}{c}\\quad\\text{porque}\\quad\\dfrac{c}{c}=1$`,
    });
    estados.push([fr("f1", `${n1}`, `${d1}`), m1, k1, p, fr("f2", `${n2}`, `${d2}`), m2, k2]);
    trans.push({
      fusiones: [],
      brotes: [
        { desde: "f1.d", hacia: "m2" },
        { desde: "f1.d", hacia: "k2" },
      ],
      texto: `A la segunda fracción la multiplicamos por $\\dfrac{${d1}}{${d1}}$: ese $${d1}$ sale del denominador de la primera fracción.`,
      porque: `$\\dfrac{${d1}}{${d1}}=1$, así que tampoco cambia el valor. Con los dos pasos, los dos denominadores van a quedar iguales.`,
      regla: `$\\dfrac{a}{b}=\\dfrac{a}{b}\\cdot\\dfrac{c}{c}\\quad\\text{porque}\\quad\\dfrac{c}{c}=1$`,
    });
    // 2) primera fraccion: se multiplica arriba y abajo (se ve el producto escrito) y despues se calcula
    estados.push([fr("u1", `${n1}\\cdot ${d2}`, `${d1}\\cdot ${d2}`), p, fr("f2", `${n2}`, `${d2}`), m2, k2]);
    trans.push({
      fusiones: [{ desde: ["f1", "m1", "k1"], hacia: "u1" }],
      texto: `Multiplicamos la primera fracción: arriba $${n1}\\cdot ${d2}$ y abajo $${d1}\\cdot ${d2}$.`,
      porque: `Multiplicar fracciones es multiplicar numerador con numerador y denominador con denominador. Todavía no hacemos las cuentas.`,
      regla: `$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a\\cdot c}{b\\cdot d}$`,
    });
    estados.push([fr("g1", `${A}`, `${D}`), p, fr("f2", `${n2}`, `${d2}`), m2, k2]);
    trans.push({
      fusiones: [{ desde: ["u1"], hacia: "g1" }],
      texto: `Hacemos las cuentas: $${n1}\\cdot ${d2}=${A}$ arriba y $${d1}\\cdot ${d2}=${D}$ abajo. Queda $\\dfrac{${A}}{${D}}$.`,
      porque: `Es la misma fracción de antes, escrita con partes más chicas.`,
    });
    // 3) segunda fraccion, igual
    estados.push([fr("g1", `${A}`, `${D}`), p, fr("u2", `${n2}\\cdot ${d1}`, `${d2}\\cdot ${d1}`)]);
    trans.push({
      fusiones: [{ desde: ["f2", "m2", "k2"], hacia: "u2" }],
      texto: `Ahora la segunda fracción: arriba $${n2}\\cdot ${d1}$ y abajo $${d2}\\cdot ${d1}$.`,
      porque: `Igual que antes: numerador con numerador y denominador con denominador.`,
      regla: `$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a\\cdot c}{b\\cdot d}$`,
    });
    estados.push([fr("g1", `${A}`, `${D}`), p, fr("g2", `${B}`, `${D}`)]);
    trans.push({
      fusiones: [{ desde: ["u2"], hacia: "g2" }],
      texto: `Hacemos las cuentas: $${n2}\\cdot ${d1}=${B}$ arriba y $${d2}\\cdot ${d1}=${D}$ abajo. Queda $\\dfrac{${B}}{${D}}$.`,
      porque: `Ahora las dos fracciones tienen el mismo denominador, $${D}$: las partes son del mismo tamaño.`,
    });
    x1 = "g1";
    x2 = "g2";
    nx2 = `${B}`;
  }

  const nx1 = iguales ? `${n1}` : `${A}`;
  // se reconoce que los denominadores son iguales
  estados.push(estados[estados.length - 1]);
  trans.push({
    fusiones: [],
    resaltar: [`${x1}.d`, `${x2}.d`],
    texto: iguales
      ? `Los denominadores ya son iguales: los dos son $${den}$.`
      : `Mira los denominadores: los dos son $${den}$.`,
    porque: `Con el mismo denominador las partes son del mismo tamaño y se pueden ${resta ? "restar" : "sumar"} contando cuántas hay.`,
  });
  // el segundo denominador se funde con el primero (ancla): ya esta escrito, no hace falta repetirlo
  estados.push([fr(x1, nx1, `${den}`), p, { id: "w2", tex: nx2 }]);
  trans.push({
    fusiones: [{ desde: [`${x2}.d`], hacia: "w2", ancla: `${x1}.d` }],
    texto: `El $${den}$ de la segunda fracción se une al $${den}$ de la primera: se escribe una sola vez. De la segunda queda el numerador, $${nx2}$.`,
    porque: `Si las partes son del mismo tamaño, el denominador solo dice de qué tamaño son: no hace falta repetirlo.`,
  });
  // un solo denominador y los dos numeradores con su signo, todavia sin calcular
  const cuenta = `${nx1}${op}${nx2}`;
  estados.push([fr("h0", cuenta, `${den}`)]);
  trans.push({
    fusiones: [{ desde: [x1, "p", "w2"], hacia: "h0" }],
    texto: `Escribimos un solo denominador, $${den}$, y arriba los dos numeradores: $${cuenta}$.`,
    porque: `Con partes del mismo tamaño, solo se cuenta cuántas partes hay ${resta ? "de diferencia" : "en total"}.`,
    regla: resta ? `$\\dfrac{a}{c}-\\dfrac{b}{c}=\\dfrac{a-b}{c}$` : `$\\dfrac{a}{c}+\\dfrac{b}{c}=\\dfrac{a+b}{c}$`,
  });
  estados.push([{ id: "h", tex: fracTex(sumaN, den) }]);
  trans.push({
    fusiones: [{ desde: ["h0"], hacia: "h" }],
    texto: `${palabra} los numeradores: $${cuenta}=${sumaN}$. El $${den}$ se queda.${sumaN < 0 ? ` El resultado es negativo, así que el signo menos se escribe delante de la fracción.` : ""}`,
    porque: `Solo se hace la cuenta de arriba: el denominador no cambia.`,
  });

  if (sumaN === 0) {
    estados.push([{ id: "r", tex: "0" }]);
    trans.push({
      fusiones: [{ desde: ["h"], hacia: "r" }],
      texto: `Cero partes de cualquier tamaño es $0$.`,
      porque: `Las dos fracciones valían lo mismo, y al restarlas no queda nada.`,
    });
  } else if (g > 1) {
    simplificar(estados, trans, [], "h", sumaN, den, g, true);
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
  // la formula en PIEZAS sueltas, en un renglon aparte (S = el salto de renglon): cada parentesis tiene su id (f1, f2)
  // para poder viajar despues a la ecuacion
  const formula = (a2: string, b2: string, p1: string, p2: string): Ficha[] => [
    { id: "S", tex: "", salto: true },
    { id: "Fa", tex: a2 },
    { id: "Fm", tex: "-", op: true },
    { id: "Fb", tex: b2 },
    { id: "Fe", tex: "=", op: true },
    { id: "f1", tex: p1 },
    { id: "f2", tex: p2 },
  ];
  const formulaLetras = formula("a^{2}", "b^{2}", "(a-b)", "(a+b)");
  const formulaConX = formula("x^{2}", "b^{2}", "(x-b)", "(x+b)");
  const formulaNumeros = formula("x^{2}", `${k}^{2}`, `(x-${k})`, `(x+${k})`);
  const estados: Ficha[][] = [
    [...base, { id: "n", tex: `${q}` }, ...cola],
    [...base, { id: "nn", tex: `${k}\\cdot ${k}` }, ...cola],
    [...base, { id: "n3", tex: `${k}^2` }, ...cola],
    // se nombran a y b
    [...baseEtiquetada, n3Etiquetado, ...cola],
    // la formula general aparece debajo (con letras)
    [...baseEtiquetada, n3Etiquetado, ...cola, ...formulaLetras],
    // se reemplaza PRIMERO la a por x, despues la b por su numero
    [...baseEtiquetada, n3Etiquetado, ...cola, ...formulaConX],
    [...baseEtiquetada, n3Etiquetado, ...cola, ...formulaNumeros],
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
    // primero se ARRASTRA el -k de la primera ecuacion y cambia de signo
    [
      { id: "x1", tex: "x" },
      { id: "eq1", tex: "=", op: true },
      { id: "z1", tex: "0" },
      { id: "m1", tex: `+${k}` },
      { id: "or", tex: "\\text{ ó }", op: true },
      { id: "x2", tex: "x" },
      { id: "m2", tex: `+${k}` },
      { id: "eq2", tex: "=", op: true },
      { id: "z2", tex: "0" },
    ],
    // despues el +k de la segunda
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
      fusiones: [{ desde: ["n"], hacia: "nn" }],
      descompone: true,
      texto: `Escribimos $${q}$ como un producto de dos números iguales: $${q}=${k}\\cdot${k}$.`,
      porque: `Para usar la fórmula necesitamos que los dos números sean cuadrados. Buscamos qué número multiplicado por sí mismo da $${q}$: es el $${k}$.`,
    },
    {
      fusiones: [{ desde: ["nn"], hacia: "n3" }],
      texto: `Un número multiplicado por sí mismo es ese número al cuadrado: $${k}\\cdot${k}=${k}^{2}$.`,
      porque: `Así $x^{2}$ y $${k}^{2}$ quedan los dos elevados al cuadrado, como pide la fórmula.`,
    },
    {
      fusiones: [],
      resaltar: ["a", "n3"],
      texto: `Reconocemos el patrón $a^{2}-b^{2}$: aquí $a=x$ y $b=${k}$. Lo anotamos debajo de cada número.`,
      porque: `Es una resta de dos cuadrados. Esa forma se llama diferencia de cuadrados y siempre se factoriza igual.`,
    },
    {
      fusiones: [],
      brotes: ["S", "Fa", "Fm", "Fb", "Fe", "f1", "f2"].map((hacia) => ({ desde: "eq1", hacia })),
      texto: `Escribimos debajo la fórmula de la diferencia de cuadrados: $a^{2}-b^{2}=(a-b)(a+b)$.`,
      porque: `Es una fórmula que vale para cualquier $a$ y cualquier $b$. Con ella una resta de cuadrados se convierte en un producto.`,
      regla: `$a^{2}-b^{2}=(a-b)(a+b)$`,
    },
    {
      fusiones: [],
      resaltar: ["Fa", "f1", "f2", "a"],
      texto: `Reemplazamos primero la $a$: vale $x$. Donde la fórmula dice $a$ escribimos $x$.`,
      porque: `La $a$ aparece dos veces en la fórmula: en $a^{2}$ y en $(a-b)(a+b)$. Se cambia en los dos lugares.`,
    },
    {
      fusiones: [],
      resaltar: ["Fb", "f1", "f2", "n3"],
      texto: `Ahora la $b$: vale $${k}$. Queda $x^{2}-${k}^{2}=(x-${k})(x+${k})$.`,
      porque: `Donde la fórmula dice $b$ escribimos $${k}$. Se puede comprobar: $(x-${k})(x+${k})=x^{2}+${k}x-${k}x-${q}=x^{2}-${q}$. Los términos $${k}x$ y $-${k}x$ se cancelan.`,
    },
    {
      // los dos parentesis de la formula VIAJAN a la ecuacion (mismo id); lo de la izquierda y el resto de la formula se van
      fusiones: [{ desde: ["a", "m", "n3", "S", "Fa", "Fm", "Fb", "Fe"], hacia: null }],
      texto: `La fórmula dice que $x^{2}-${k}^{2}$ es igual a $(x-${k})(x+${k})$. Subimos los dos paréntesis a la ecuación, en lugar de $x^{2}-${k}^{2}$.`,
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
      resaltar: ["m1"],
      texto: `En la primera ecuación, para dejar $x$ sola, pasamos el $-${k}$ al otro lado: cambia de signo y queda $+${k}$.`,
      porque: `Es lo mismo que sumar el opuesto en los dos lados: al cruzar la igualdad un número cambia de signo.`,
      regla: `$a+b=c\\ \\Rightarrow\\ a=c-b$`,
    },
    {
      fusiones: [],
      resaltar: ["m2"],
      texto: `En la segunda ecuación, el $+${k}$ pasa al otro lado y queda $-${k}$.`,
      porque: `Igual que antes: al cruzar la igualdad cambia de signo.`,
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
  // el logaritmo se separa en base+parentesis y el numero de adentro
  const separado = (l: Lado): Ficha[] => [
    { id: `${l.id}o`, tex: `\\log_{${b}}(` },
    { id: `${l.id}m`, tex: `${l.m}` },
    { id: `${l.id}c`, tex: ")" },
  ];
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
  // el exponente VIAJA y es la respuesta: conserva el id, deja de ser exponente (la base y el log se van)
  const valor = (l: Lado): Ficha[] => [{ id: `${l.id}e`, tex: `${l.valor}` }];

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
    // 1) separamos el logaritmo: base y parentesis por un lado, el numero de adentro por otro
    poner(l, separado(l));
    trans.push({
      fusiones: [{ desde: [`${l.id}l`], hacia: separado(l).map((f) => f.id) }],
      texto: `Resolvemos $${L(`${l.m}`)}$ solo: pregunta ¿cuántas veces hay que multiplicar el $${b}$ para llegar a $${l.m}$? Primero separamos el logaritmo (con su base) del número de adentro, $${l.m}$.`,
      porque: `Un logaritmo es un exponente: cuenta cuántos $${b}$ se multiplican para formar $${l.m}$. La base $${b}$ es la que se va a multiplicar.`,
      regla: `$\\log_{${b}}(a)=y\\ \\iff\\ ${b}^{y}=a$`,
    });
    // 2) el numero de adentro se escribe con la base: el primer b es el mismo numero; los demas NACEN de la base del log
    const fs = factores(l);
    poner(l, fs);
    trans.push({
      fusiones: [{ desde: [`${l.id}m`], hacia: `${l.id}f1` }],
      brotes: fs.filter((f) => !/^(.)(o|c|f1)$/.test(f.id)).map((f) => ({ desde: `${l.id}o`, hacia: f.id })),
      texto:
        l.valor === 1
          ? `$${l.m}$ es justo $${b}$: hay un solo $${b}$.`
          : `Escribimos $${l.m}$ como producto de $${b}$: $${vecesB}=${l.m}$. Cada $${b}$ sale de la base del logaritmo.`,
      porque: `Un logaritmo con base $${b}$ pregunta por los $${b}$ que se multiplican. Por eso escribimos el número de adentro con esa base.`,
    });
    // 3) contar: el exponente nace de los b que se juntan (o, si hay uno solo, el exponente 1 que nunca se escribe)
    if (l.valor > 1) {
      poner(l, agrupado(l));
      const sobran = fs.filter((f) => f.id !== `${l.id}o` && f.id !== `${l.id}c` && f.id !== `${l.id}f1`).map((f) => f.id);
      trans.push({
        fusiones: [{ desde: sobran, hacia: `${l.id}e`, ancla: `${l.id}f1` }],
        texto: `Contamos: hay $${l.valor}$ veces el $${b}$. Se escribe una vez, con exponente $${l.valor}$: $${b}^{${l.valor}}$.`,
        porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma. La base $${b}$ se queda quieta.`,
        regla: `$\\underbrace{a\\cdot a\\cdots a}_{n}=a^{n}$`,
      });
    } else {
      poner(l, agrupado(l));
      trans.push({
        fusiones: [],
        brotes: [{ desde: `${l.id}f1`, hacia: `${l.id}e` }],
        texto: `El exponente $1$ nunca se escribe, pero está: $${b}=${b}^{1}$. Lo escribimos para ver la respuesta.`,
        porque: `Un número elevado a $1$ es ese mismo número. Se cuenta un solo $${b}$, así que el exponente es $1$.`,
        regla: `$a^{1}=a$`,
      });
    }
    // 4) el log y la base se van; el exponente viaja y ES la respuesta
    poner(l, valor(l));
    trans.push({
      fusiones: [{ desde: [`${l.id}o`, `${l.id}f1`, `${l.id}c`], hacia: null }],
      resaltar: [`${l.id}e`],
      texto: `$${L(`${b}^{${l.valor}}`)}=${l.valor}$: el exponente al que elevamos $${b}$ es $${l.valor}$. Entonces $${L(`${l.m}`)}=${l.valor}$.`,
      porque: `El logaritmo devuelve justo el exponente que ya está escrito arriba de la $${b}$: el logaritmo, la base y el paréntesis se van y el exponente se queda como respuesta.`,
      regla: `$\\log_{${b}}(${b}^{n})=n$`,
    });
  }

  const k = e1 + e2;
  const P = m * n;
  estados.push([{ id: "tot", tex: `${k}` }]);
  trans.push({
    fusiones: [{ desde: ["ae", "p", "ze"], hacia: "tot" }],
    texto: `Ahora sí sumamos los resultados: $${e1}+${e2}=${k}$.`,
    porque: `Cada logaritmo ya es un número, así que solo queda sumar.`,
  });
  // comprobacion con la propiedad del producto, paso a paso y a la vista
  estados.push([{ id: "tot", tex: `${k}` }, { id: "S", tex: "", salto: true }, { id: "q1", tex: L(`${m}\\cdot ${n}`) }]);
  trans.push({
    fusiones: [],
    brotes: [
      { desde: "tot", hacia: "S" },
      { desde: "tot", hacia: "q1" },
    ],
    texto: `Comprobamos con la propiedad del producto: la suma de los dos logaritmos debe ser el logaritmo del producto, $${L(`${m}\\cdot ${n}`)}$.`,
    porque: `Si $${L(`${m}`)}+${L(`${n}`)}=${k}$, entonces $${L(`${m}\\cdot ${n}`)}$ tiene que dar también $${k}$.`,
    regla: `$\\log_{${b}}(a)+\\log_{${b}}(c)=\\log_{${b}}(a\\cdot c)$`,
  });
  estados.push([{ id: "tot", tex: `${k}` }, { id: "S", tex: "", salto: true }, { id: "q2", tex: L(`${P}`) }]);
  trans.push({
    fusiones: [{ desde: ["q1"], hacia: "q2" }],
    texto: `Hacemos la multiplicación de adentro: $${m}\\cdot ${n}=${P}$.`,
    porque: `Ahora hay un solo logaritmo con un solo número adentro.`,
  });
  estados.push([{ id: "tot", tex: `${k}` }, { id: "S", tex: "", salto: true }, { id: "q3", tex: `${b}^{${k}}=${P}\\ \\checkmark` }]);
  trans.push({
    fusiones: [{ desde: ["q2"], hacia: "q3" }],
    texto: `$${L(`${P}`)}$ debe valer $${k}$: lo comprobamos con la definición, $${b}^{${k}}=${P}$. Se cumple.`,
    porque: `Un logaritmo es un exponente: $${L(`${P}`)}=${k}$ significa que $${b}$ elevado a $${k}$ da $${P}$. Da lo mismo que la suma.`,
    regla: `$\\log_{${b}}(a)=y\\ \\iff\\ ${b}^{y}=a$`,
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

  // los argumentos (m y n) son piezas con id: cruzan al logaritmo unico; los log, "+" y parentesis sobrantes se van
  const dos: Ficha[] = [
    { id: "o", tex: `\\log_{${b}}(` },
    { id: "m", tex: `${m}` },
    { id: "c1", tex: ")" },
    { id: "p", tex: "+", op: true },
    { id: "o2", tex: `\\log_{${b}}(` },
    { id: "n", tex: `${n}` },
    { id: "c2", tex: ")" },
  ];
  const unico: Ficha[] = [
    { id: "o", tex: `\\log_{${b}}(` },
    { id: "m", tex: `${m}` },
    { id: "dot", tex: "\\cdot", op: true },
    { id: "n", tex: `${n}` },
    { id: "c", tex: ")" },
  ];
  const estados: Ficha[][] = [dos, dos, unico, [unico[0], { id: "v", tex: `${p}` }, unico[4]]];
  const trans: Transicion[] = [
    {
      fusiones: [],
      resaltar: ["o", "o2"],
      texto: `Miramos las dos bases: las dos son $${b}$. Es la condición para poder juntar los logaritmos.`,
      porque: `Un logaritmo con otra base preguntaría otra cosa. Con la misma base, los dos preguntan por exponentes de $${b}$ y se pueden combinar.`,
    },
    {
      // m y n NO desaparecen: pasan al primer logaritmo, uno detras del otro, unidos por un producto
      fusiones: [{ desde: ["c1", "p", "o2", "c2"], hacia: ["dot", "c"] }],
      texto: `Se juntan en un solo logaritmo: el $${n}$ pasa dentro del primer paréntesis, al lado del $${m}$, y lo de adentro se multiplica: $${m}\\cdot ${n}$.`,
      porque: `Sumar logaritmos de igual base es lo mismo que tomar el logaritmo del producto.`,
      regla: `$\\log_{${b}}(a)+\\log_{${b}}(c)=\\log_{${b}}(a\\cdot c)$`,
    },
    {
      fusiones: [{ desde: ["m", "dot", "n"], hacia: "v" }],
      texto: `Hacemos la multiplicación de adentro: $${m}\\cdot ${n}=${p}$.`,
      porque: `Ahora hay un solo logaritmo con un solo número adentro.`,
    },
    {
      // el primer b es el mismo numero; los demas NACEN de la base del log
      fusiones: [{ desde: ["v"], hacia: "f1" }],
      brotes: factores.filter((f) => !["o", "c", "f1"].includes(f.id)).map((f) => ({ desde: "o", hacia: f.id })),
      texto: k === 1 ? `Vemos que $${p}$ es justo $${b}$.` : `Escribimos $${p}$ como una multiplicación de $${b}$ por sí mismo: $${vecesB}=${p}$. Cada $${b}$ sale de la base del logaritmo.`,
      porque: `El logaritmo pregunta: ¿a qué exponente hay que elevar $${b}$ para obtener $${p}$? Para verlo, conviene escribir $${p}$ usando $${b}$.`,
    },
  ];
  estados.push(factores);

  // contar: el exponente nace de los b que se juntan; con un solo b, el exponente 1 que nunca se escribe
  const grupo: Ficha[] = [
    { id: "o", tex: `\\log_{${b}}(` },
    { id: "f1", tex: `${b}` },
    { id: "e", tex: `${k}`, sup: true },
    { id: "c", tex: ")" },
  ];
  estados.push(grupo);
  if (k > 1) {
    const sobran = factores.filter((f) => f.id !== "o" && f.id !== "c" && f.id !== "f1").map((f) => f.id);
    trans.push({
      fusiones: [{ desde: sobran, hacia: "e", ancla: "f1" }],
      texto: `Contamos los factores: hay $${k}$ veces el $${b}$. Se escribe una sola vez, con exponente $${k}$: $${b}^{${k}}$.`,
      porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma. La base $${b}$ no cambia: se queda quieta.`,
      regla: `$\\underbrace{a\\cdot a\\cdots a}_{n}=a^{n}$`,
    });
  } else {
    trans.push({
      fusiones: [],
      brotes: [{ desde: "f1", hacia: "e" }],
      texto: `El exponente $1$ nunca se escribe, pero está: $${b}=${b}^{1}$. Lo escribimos para ver la respuesta.`,
      porque: `Un número elevado a $1$ es ese mismo número. Hay un solo $${b}$, así que el exponente es $1$.`,
      regla: `$a^{1}=a$`,
    });
  }

  const dentro: string[] = ["o", "f1", "c"];
  estados.push(grupo);
  trans.push({
    fusiones: [],
    resaltar: ["f1", "e"],
    texto: `Ahora la pregunta se responde sola: ¿a qué exponente hay que elevar $${b}$ para obtener $${b}^{${k}}$?`,
    porque: `Justamente el que ya está escrito arriba de la $${b}$: $${k}$.`,
    regla: `$\\log_{${b}}(a)=y\\ \\iff\\ ${b}^{y}=a$`,
  });
  // el logaritmo, la base y el parentesis se van; el exponente VIAJA (mismo id) y es la respuesta
  estados.push([{ id: "e", tex: `${k}` }]);
  trans.push({
    fusiones: [{ desde: dentro, hacia: null }],
    resaltar: ["e"],
    texto: `$\\log_{${b}}(${b}^{${k}})=${k}$. La respuesta es $${k}$.`,
    porque: `El logaritmo, la base y el paréntesis se van, y el exponente se queda como respuesta.`,
    regla: `$\\log_{${b}}(${b}^{n})=n$`,
  });
  // comprobacion a la vista: la definicion
  estados.push([{ id: "e", tex: `${k}` }, { id: "S", tex: "", salto: true }, { id: "w", tex: `${b}^{${k}}` }]);
  trans.push({
    fusiones: [],
    brotes: [
      { desde: "e", hacia: "S" },
      { desde: "e", hacia: "w" },
    ],
    texto: `Comprobamos con la definición: si el logaritmo vale $${k}$, entonces $${b}$ elevado a $${k}$ tiene que dar lo que había adentro.`,
    porque: `Un logaritmo es un exponente: $\\log_{${b}}(a)=${k}$ significa $${b}^{${k}}=a$.`,
    regla: `$\\log_{${b}}(a)=y\\ \\iff\\ ${b}^{y}=a$`,
  });
  estados.push([{ id: "e", tex: `${k}` }, { id: "S", tex: "", salto: true }, { id: "w2", tex: `${b}^{${k}}=${p}\\ \\checkmark` }]);
  trans.push({
    fusiones: [{ desde: ["w"], hacia: "w2" }],
    texto: `$${b}^{${k}}=${p}$, y $${p}$ es justo $${m}\\cdot ${n}$. Se cumple.`,
    porque: `Es el mismo producto que habíamos juntado dentro del logaritmo.`,
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
