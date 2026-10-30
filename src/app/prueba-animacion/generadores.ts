// Generadores: arman la animacion completa de una potencia o una raiz para
// CUALQUIER base, exponente e indice, en vez de escribirla a mano caso por caso.
// Todo el texto va en LaTeX entre $...$ (se pinta con MathText): fracciones con
// raya, nunca "/" ni "÷".
import { fr, frPiezas, type Demo, type Ficha, type Transicion } from "./datos.ts";

export type Base = number | "x";

const LIMITE = BigInt(10) ** BigInt(15);
const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));
const pot = (b: number, e: number): bigint => BigInt(b) ** BigInt(e);
const raiz = (k: number, dentro: string) => `\\sqrt${k === 2 ? "" : `[${k}]`}{${dentro}}`;
const frac = (a: number, b: number) => (b === 1 ? `${a}` : `\\tfrac{${a}}{${b}}`);
const potTex = (b: string, e: number) => (e === 1 ? b : `${b}^{${e}}`);
/** n factores iguales a la base: 2·2·2 (con puntos suspensivos si son muchos, para que quepa en el celular) */
const factores = (b: string, n: number) => (n <= 5 ? Array<string>(n).fill(b).join("\\cdot ") : `${b}\\cdot ${b}\\cdot \\cdots\\cdot ${b}`);
/** fraccion con partes propias, chica y levantada (un exponente fraccionario) */
const frSup = (id: string, n: string, d: string): Ficha => ({ ...fr(id, n, d), sup: true });
/** lo mismo pero con PIEZAS con id: lo que se tacha se ve pieza por pieza (el 1 de arriba y el 1 de abajo), no la fraccion entera */
const frSupPiezas = (id: string, n: Ficha[], d: Ficha[]): Ficha => ({ ...frPiezas(id, n, d), sup: true });
const punto = (id: string): Ficha => ({ id, tex: "\\cdot", op: true });

/** si la fila de factores lleva puntos suspensivos (mas de 5), se aclara cuantos son para que se puedan contar */
const etiquetaFactores = (n: number): Partial<Ficha> => (n > 5 ? { debajo: `${n}\\text{ factores}` } : {});
const divisores =(m: number): number[] => Array.from({ length: m }, (_, i) => i + 1).filter((d) => m % d === 0);
const coma = (xs: string[]) => xs.join(",\\ ");
/** «factor» o «factores» segun cuantos son (con 1 va en singular) */
const fact = (n: number) => (n === 1 ? "factor" : "factores");
/** «son 3 factores 5» o «es 1 factor 5» */
const sonFactores = (n: number, b: string) => `${n === 1 ? "es" : "son"} $${n}$ ${fact(n)} $${b}$`;

/**
 * Calcula base^exp con una cadena de productos parciales, como a lapiz: la potencia se abre en `exp` factores
 * en fila y se multiplica de a dos, un resultado por paso; la fila de factores que falta sigue a la vista.
 * Parte del ULTIMO estado de `estados` ([...antes, idB, idE, ...despues]) y deja el resultado en `idR`.
 */
function cadenaPotencia(
  estados: Ficha[][],
  trans: Transicion[],
  o: { antes: Ficha[]; despues: Ficha[]; idB: string; idE: string; idR: string; base: number; exp: number; pre: string; cierre?: string }
) {
  const { antes, despues, idB, idE, idR, base, exp, pre } = o;
  const b = String(base);
  const fid = (i: number) => `${pre}f${i}`;
  const cid = (i: number) => `${pre}c${i}`;
  const pid = (i: number) => (i === exp ? idR : `${pre}p${i}`);
  const fichaF = (i: number): Ficha => ({ id: fid(i), tex: b });
  const fichaC = (i: number): Ficha => ({ id: cid(i), tex: "\\cdot", op: true });
  // fila restante a partir del factor i: f_i · f_(i+1) · ... · f_exp
  const resto = (i: number): Ficha[] => {
    const r: Ficha[] = [];
    for (let j = i; j <= exp; j++) {
      if (j > i) r.push(fichaC(j - 1));
      r.push(fichaF(j));
    }
    return r;
  };
  const todos: string[] = [];
  for (let j = 1; j <= exp; j++) {
    todos.push(fid(j));
    if (j < exp) todos.push(cid(j));
  }
  estados.push([...antes, ...resto(1), ...despues]);
  trans.push({
    fusiones: [{ desde: [idB, idE], hacia: todos }],
    texto: `Abrimos la potencia: $${b}^{${exp}}$ son $${exp}$ factores $${b}$ en fila. Los vamos a multiplicar de a dos.`,
    porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma.`,
    regla: `$a^{n}=a\\cdot a\\cdots a\\ (n\\text{ factores})$`,
  });
  let parcial = BigInt(base);
  for (let j = 1; j < exp; j++) {
    const nuevo = parcial * BigInt(base);
    const ultimo = j === exp - 1;
    const izq: string = j === 1 ? fid(1) : pid(j);
    estados.push([...antes, { id: pid(j + 1), tex: `${nuevo}` }, ...(ultimo ? [] : [fichaC(j + 1), ...resto(j + 2)]), ...despues]);
    trans.push({
      fusiones: [{ desde: [izq, cid(j), fid(j + 1)], hacia: pid(j + 1) }],
      texto: ultimo
        ? `${exp === 2 ? "Multiplicamos los dos factores" : "Multiplicamos los dos últimos"}: $${parcial}\\cdot ${b}=${nuevo}$. Ya no quedan factores: $${b}^{${exp}}=${nuevo}$.${o.cierre ?? ""}`
        : `${j === 1 ? "Multiplicamos los dos primeros" : "Seguimos con el resultado parcial y el factor que sigue"}: $${parcial}\\cdot ${b}=${nuevo}$.`,
      // el porque respeta el caso limite: en el ultimo producto ya no queda ningun factor en la fila
      porque: ultimo
        ? exp === 2
          ? `Se multiplican los dos factores entre sí. No queda ningún otro en la fila, así que ese es el valor de la potencia.`
          : `Se multiplica de a dos: el resultado parcial por el último factor. No queda ningún otro en la fila, así que ese es el valor de la potencia.`
        : `Se multiplica de a dos: el resultado parcial por el siguiente factor. Los factores que faltan siguen en la fila.`,
    });
    parcial = nuevo;
  }
}

export interface Resultado {
  demo: Demo;
  /** datos para comprobar la cuenta en un test; no se muestran */
  resumen: Record<string, number>;
}

export function validarPotencia(base: Base, m: number, n: number): string | null {
  if (!Number.isInteger(m) || !Number.isInteger(n) || m < 1 || n < 1 || m > 12 || n > 12) return "Los exponentes deben ser enteros entre 1 y 12.";
  if (base !== "x" && (!Number.isInteger(base) || base < 2 || base > 20)) return "La base debe ser un entero entre 2 y 20, o la letra x.";
  if (base !== "x" && pot(base, m + n) > LIMITE) return "El resultado es demasiado grande; baja la base o los exponentes.";
  return null;
}

export function validarRaiz(base: Base, n: number, k: number): string | null {
  if (!Number.isInteger(n) || n < 2 || n > 12) return "El exponente debe ser un entero entre 2 y 12.";
  if (!Number.isInteger(k) || k < 2 || k > 6) return "El índice de la raíz debe ser un entero entre 2 y 6.";
  if (base !== "x" && (!Number.isInteger(base) || base < 2 || base > 20)) return "La base debe ser un entero entre 2 y 20, o la letra x.";
  if (base !== "x" && pot(base, n) > LIMITE) return "El número dentro de la raíz es demasiado grande; baja la base o el exponente.";
  return null;
}

/** a^m · a^n = a^(m+n) */
export function potenciaProducto(base: Base, m: number, n: number): Resultado {
  const b = String(base);
  const s = m + n;
  const linea: Ficha[] = [
    { id: "b1", tex: b },
    { id: "e1", tex: `${m}`, sup: true },
    { id: "t", tex: "\\cdot", op: true },
    { id: "b2", tex: b },
    { id: "e2", tex: `${n}`, sup: true },
  ];
  // la segunda linea (en un renglon aparte): cada potencia escrita como sus factores
  const salto: Ficha = { id: "S", tex: "", salto: true };
  // con exponente 1 es UN factor: singular y sin parentesis (un solo factor no se agrupa; auditor, 29-oct: «son 1 factores», «(5)»)
  const grupo = (k: number) => (k === 1 ? b : `(${factores(b, k)})`);
  const g1: Ficha = { id: "g1", tex: grupo(m), debajo: `${m}\\text{ ${fact(m)}}` };
  const tx: Ficha = { id: "tx", tex: "\\cdot", op: true };
  const g2: Ficha = { id: "g2", tex: grupo(n), debajo: `${n}\\text{ ${fact(n)}}` };
  const g: Ficha = { id: "g", tex: factores(b, s), debajo: `${s}\\text{ factores}` };
  const estados: Ficha[][] = [
    linea,
    [...linea, salto, g1, tx, g2],
    [...linea, salto, g],
    // la segunda base se une a la primera y el "por" entre las potencias VIAJA a ser el "mas" entre los exponentes (mismo id)
    [
      { id: "b1", tex: b },
      { id: "e1", tex: `${m}`, sup: true },
      { id: "t", tex: "+", sup: true, op: true },
      { id: "e2", tex: `${n}`, sup: true },
      salto,
      g,
    ],
    [
      { id: "b1", tex: b },
      { id: "e5", tex: `${s}`, sup: true },
    ],
  ];
  const trans: Transicion[] = [
    {
      fusiones: [],
      brotes: [
        { desde: "b1", hacia: "S" },
        { desde: "b1", hacia: "g1" },
        { desde: "t", hacia: "tx" },
        { desde: "b2", hacia: "g2" },
      ],
      texto: `Recuerda qué es una potencia: $${b}^{${m}}$ ${sonFactores(m, b)}${m === 1 ? "" : " multiplicados"}, y $${b}^{${n}}$ ${sonFactores(n, b)}. Los escribimos debajo.`,
      porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma.`,
      regla: `$a^{n}=a\\cdot a\\cdots a\\ (n\\text{ factores})$`,
    },
    {
      fusiones: [{ desde: ["g1", "tx", "g2"], hacia: "g" }],
      texto: `Juntamos todo en una sola fila: ${m === 1 ? "es $1$ factor" : `son $${m}$ factores`} y ${n === 1 ? "otro $1$ factor" : `otros $${n}$ factores`}, es decir $${s}$ factores $${b}$ multiplicados.`,
      porque:
        m === 1 && n === 1
          ? `Multiplicar un factor por otro solo los pone uno al lado del otro.`
          : `Multiplicar un grupo de factores por otro solo los junta en una fila: los paréntesis ya no hacen falta.`,
    },
    {
      fusiones: [{ desde: ["b2"], hacia: null, ancla: "b1" }],
      texto: `Las dos bases son iguales: la segunda se une a la primera y se escribe una sola vez. El $\\cdot$ entre las potencias se vuelve un $+$ entre los exponentes.`,
      porque: `Abajo hay $${s}$ factores iguales: la base se escribe una vez y los exponentes cuentan los dos grupos, $${m}$ y $${n}$, uno junto al otro.`,
    },
    {
      fusiones: [
        { desde: ["e1", "t", "e2"], hacia: "e5" },
        { desde: ["S", "g"], hacia: null },
      ],
      texto: `Se suman los exponentes: $${m}+${n}=${s}$, los mismos $${s}$ factores que contamos abajo.`,
      porque: `En total hay $${s}$ factores iguales a $${b}$.`,
      regla: `$a^{m}\\cdot a^{n}=a^{m+n}$`,
    },
  ];
  if (base !== "x") {
    cadenaPotencia(estados, trans, { antes: [], despues: [], idB: "b1", idE: "e5", idR: "r", base, exp: s, pre: "w" });
  }
  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos calcular $${b}^{${m}}\\cdot ${b}^{${n}}$. Las dos tienen la misma base.`,
      estados,
      transiciones: trans,
    },
    resumen: { m, n, s },
  };
}

/** raiz de indice k de base^n, para cualquier base, exponente e indice */
export function raizGeneral(
  base: Base,
  n: number,
  k: number,
  opciones: { extra?: Ficha[]; empezarEnQ?: boolean } = {}
): Resultado & { idsFinales: string[] } {
  const extra = opciones.extra ?? [];
  const b = String(base);
  const numerica = base !== "x";
  const valor = numerica ? pot(base, n) : null;
  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];
  let intro: string;

  // Estado inicial
  if (opciones.empezarEnQ) {
    estados.push([{ id: "q", tex: raiz(k, potTex(b, n)) }]);
    intro = "";
  } else if (numerica) {
    // 64 = 2·2·2·2·2·2 = 2^6: los factores se escriben y se cuentan antes de usar el exponente
    estados.push([{ id: "r", tex: raiz(k, `${valor}`) }]);
    estados.push([{ id: "rf", tex: raiz(k, factores(b, n)), ...etiquetaFactores(n) }]);
    estados.push([{ id: "q", tex: raiz(k, potTex(b, n)) }]);
    intro = `Queremos calcular $${raiz(k, `${valor}`)}$. Veamos qué pasa por dentro.`;
    trans.push({
      fusiones: [{ desde: ["r"], hacia: "rf" }],
      descompone: true,
      texto: `Escribimos $${valor}$ como un producto de factores iguales: $${valor}=${factores(b, n)}$, con $${n}$ factores $${b}$.`,
      porque: `Buscamos un número que, multiplicado por sí mismo $${n}$ veces, dé $${valor}$. Ese número es $${b}$.`,
    });
    trans.push({
      fusiones: [{ desde: ["rf"], hacia: "q" }],
      descompone: true,
      texto: `Contamos los factores: hay $${n}$ veces el $${b}$, y eso se escribe $${b}^{${n}}$.`,
      porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma.`,
      regla: `$a\\cdot a\\cdots a=a^{n}\\ (n\\text{ factores})$`,
    });
  } else {
    estados.push([{ id: "q", tex: raiz(k, potTex(b, n)) }]);
    intro = `Queremos simplificar $${raiz(k, potTex(b, n))}$.`;
  }

  // Se abre la raiz en sus tres partes: indice, base y exponente (piezas sueltas, cada una con su etiqueta)
  estados.push([
    { id: "ik", tex: `${k}`, sup: true, debajo: "\\text{índice}" },
    { id: "b", tex: b, debajo: "\\text{base}" },
    { id: "x", tex: `${n}`, sup: true, debajo: "\\text{exponente}" },
  ]);
  trans.push({
    fusiones: [{ desde: ["q"], hacia: ["ik", "b", "x"] }],
    texto: `Abrimos la raíz en sus partes: el índice $${k}$, la base $${b}$ y el exponente $${n}$.`,
    porque: `Para pasar una raíz a exponente necesitamos cada parte por separado.${k === 2 ? " En la raíz cuadrada el índice $2$ no se escribe, pero está." : ""}`,
  });

  // La raiz se vuelve exponente 1/k: el indice VIAJA al denominador, la base y el exponente se quedan y se encierran entre parentesis
  estados.push([
    { id: "o", tex: "(" },
    { id: "b", tex: b },
    { id: "x", tex: `${n}`, sup: true },
    { id: "c", tex: ")" },
    frSup("h", "1", `${k}`),
  ]);
  trans.push({
    fusiones: [{ desde: ["ik"], hacia: "h", modo: "viajar" }],
    brotes: [
      { desde: "ik", hacia: "h.d" },
      { desde: "ik", hacia: "h.n" },
      { desde: "b", hacia: "o" },
      { desde: "x", hacia: "c" },
    ],
    texto: `La raíz se vuelve el exponente $\\tfrac{1}{${k}}$: el índice $${k}$ viaja al denominador y arriba va un $1$. La base y su exponente se encierran entre paréntesis.`,
    porque: `Una raíz de índice $${k}$ es un exponente fraccionario: el índice se escribe abajo y el $1$ arriba. Los paréntesis agrupan $${potTex(b, n)}$ para que el $\\tfrac{1}{${k}}$ afecte a todo.`,
    regla: `$${raiz(k, "a")}=a^{\\frac{1}{${k}}}$`,
  });

  // Potencia de potencia: el parentesis de la izquierda se une a la base, el de la derecha se vuelve el "por" entre los exponentes
  estados.push([
    { id: "b", tex: b },
    { id: "x", tex: `${n}`, sup: true },
    { id: "c", tex: "\\cdot", sup: true, op: true },
    frSup("h", "1", `${k}`),
  ]);
  trans.push({
    fusiones: [{ desde: ["o"], hacia: null, ancla: "b" }],
    texto: `Es una potencia de potencia: el paréntesis de la izquierda se une a la base y el de la derecha se vuelve el $\\cdot$ que une los dos exponentes.`,
    porque: `Siempre se cumple $(a^{m})^{p}=a^{m\\cdot p}$: la base se queda y los exponentes se multiplican.`,
    regla: `$(a^{m})^{p}=a^{m\\cdot p}$`,
  });

  // n = n/1: el exponente entero se escribe como fraccion ANTES de multiplicar; el 1 de abajo nace del mismo n
  // (el n es la misma pieza: pasa a ser el numerador)
  estados.push([
    { id: "b", tex: b },
    frSupPiezas("x2a", [{ id: "x", tex: `${n}` }], [{ id: "xu2", tex: "1" }]),
    { id: "c", tex: "\\cdot", sup: true, op: true },
    frSup("h", "1", `${k}`),
  ]);
  trans.push({
    fusiones: [],
    brotes: [
      { desde: "x", hacia: "x2a" },
      { desde: "x", hacia: "xu2" },
    ],
    descompone: true,
    texto: `Para multiplicar por una fracción, escribimos también el $${n}$ como fracción: $${n}=\\tfrac{${n}}{1}$. El $1$ de abajo sale del mismo $${n}$.`,
    porque: `Todo número es igual a sí mismo dividido entre $1$, así que no cambia nada. Ahora los dos exponentes son fracciones.`,
    regla: `$a=\\dfrac{a}{1}$`,
  });

  // n/1 · 1/k: numerador por numerador y denominador por denominador. El 1 de 1/k sube junto al n, el k baja junto al 1 de n/1,
  // y el · entre los exponentes viaja a ser el · de arriba (el de abajo es su copia)
  estados.push([
    { id: "b", tex: b },
    frSupPiezas(
      "x2a",
      [{ id: "x", tex: `${n}` }, { id: "c", tex: "\\cdot", op: true }, { id: "xu1", tex: "1" }],
      [{ id: "xu2", tex: "1" }, punto("xo2"), { id: "xk", tex: `${k}` }]
    ),
  ]);
  trans.push({
    fusiones: [{ desde: ["h", "h.n", "h.d"], hacia: ["xu1", "xk"], modo: "viajar" }],
    brotes: [
      { desde: "h.n", hacia: "xu1" },
      { desde: "h.d", hacia: "xk" },
      { desde: "c", hacia: "xo2" },
    ],
    resaltar: ["x", "xu2"],
    texto: `Multiplicamos los exponentes: $\\tfrac{${n}}{1}\\cdot\\tfrac{1}{${k}}=\\tfrac{${n}\\cdot 1}{1\\cdot ${k}}$. Arriba van los dos numeradores, $${n}$ y $1$; abajo, los dos denominadores, $1$ y $${k}$.`,
    porque: `Para multiplicar fracciones se multiplican los numeradores entre sí y los denominadores entre sí.`,
    regla: `$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a\\cdot c}{b\\cdot d}$`,
  });
  estados.push([{ id: "b", tex: b }, frSupPiezas("x2a", [{ id: "x", tex: `${n}` }], [{ id: "xk", tex: `${k}` }])]);
  trans.push({
    // se tachan SOLO los dos 1 (con su punto), uno arriba y otro abajo; el n y el k se quedan en su lugar
    fusiones: [
      { desde: ["c", "xu1"], hacia: null, modo: "tachar" },
      { desde: ["xu2", "xo2"], hacia: null, modo: "tachar" },
    ],
    texto: `Multiplicar por $1$ no cambia nada: se tachan los dos $1$ y queda $\\tfrac{${n}}{${k}}$.`,
    porque: `Un número multiplicado por $1$ es el mismo número.`,
    regla: `$a\\cdot 1=a$`,
  });

  // Simplificar la fraccion del exponente: primero se ve de donde sale el g, despues se tacha
  const g = mcd(n, k);
  const n1 = n / g;
  const k1 = k / g;
  // el exponente fraccionario y sus piezas de arriba y de abajo (de ahi nacen las cuentas que siguen)
  let expId = "x2a";
  let expN = "x";
  let expD = "xk";
  if (n === k) {
    // rama corta: arriba y abajo el mismo numero (2/2). No hace falta buscar divisores: un numero entre si mismo da 1
    estados.push([{ id: "b", tex: b }, { id: "x3", tex: "1", sup: true }]);
    trans.push({
      fusiones: [{ desde: ["x2a"], hacia: "x3" }],
      texto: `El exponente es $\\tfrac{${n}}{${k}}$: arriba y abajo está el mismo número, así que vale $1$.`,
      porque: `Un número dividido entre sí mismo da $1$: $${n}$ cabe exactamente una vez en $${k}$.`,
      regla: `$\\dfrac{a}{a}=1$`,
    });
    expId = "x3";
  } else if (g > 1) {
    // los divisores de cada numero se ven en la hoja y los comunes van en negrita
    const dn = divisores(n);
    const dk = divisores(k);
    const comunes = new Set(dn.filter((d) => k % d === 0));
    const lista = (ds: number[]) => coma(ds.map((d) => (comunes.has(d) ? `\\mathbf{${d}}` : `${d}`)));
    // mismo rotulo que en lineal y fracciones: «Divisores de 9:» en un renglon (los dos puntos dentro del texto, sin espacio antes)
    const rotulo = (m: number, ds: number[]) => `\\scriptsize\\text{Divisores de ${m}:}\\ \\ ${lista(ds)}`;
    const fx2 = estados[estados.length - 1].find((f) => f.id === "x2a")!;
    estados.push([
      { id: "b", tex: b },
      fx2,
      { id: "Sg", tex: "", salto: true },
      { id: "dvn", tex: rotulo(n, dn) },
      { id: "Sg2", tex: "", salto: true },
      { id: "dvk", tex: rotulo(k, dk) },
    ]);
    trans.push({
      fusiones: [],
      brotes: [
        { desde: "x", hacia: "Sg" },
        { desde: "x", hacia: "dvn" },
        { desde: "xk", hacia: "Sg2" },
        { desde: "xk", hacia: "dvk" },
      ],
      texto: `Para simplificar buscamos el mayor número que divide a $${n}$ y a $${k}$. Escribimos los divisores de cada uno y marcamos en negrita los que se repiten.`,
      porque: `Un divisor de un número es otro número que lo divide sin dejar resto. Los que están en las dos listas dividen a la vez al numerador y al denominador.`,
    });
    estados.push([
      { id: "b", tex: b },
      fx2,
      { id: "Sg", tex: "", salto: true },
      { id: "gg", tex: `${g}`, debajo: "\\text{mayor común}" },
    ]);
    trans.push({
      fusiones: [{ desde: ["dvn", "Sg2", "dvk"], hacia: "gg" }],
      texto: `De los divisores comunes, el mayor es el $${g}$.`,
      porque: `Dividir arriba y abajo entre el mayor divisor común deja la fracción lo más simple posible en un solo paso.`,
    });
    estados.push([
      { id: "b", tex: b },
      frSupPiezas(
        "xg",
        [{ id: "xn1", tex: `${n1}` }, punto("xp1"), { id: "xg1", tex: `${g}` }],
        [{ id: "xk1", tex: `${k1}` }, punto("xp2"), { id: "xg2", tex: `${g}` }]
      ),
    ]);
    trans.push({
      fusiones: [
        { desde: ["x2a"], hacia: "xg" },
        { desde: ["Sg", "gg"], hacia: null, modo: "viajar" },
      ],
      brotes: [
        { desde: "gg", hacia: "xg1" },
        { desde: "gg", hacia: "xg2" },
      ],
      descompone: true,
      texto: `Escribimos $${n}=${n1}\\cdot ${g}$ y $${k}=${k1}\\cdot ${g}$: el $${g}$ baja a multiplicar arriba y abajo.`,
      porque: `Un número se puede escribir como producto de sus divisores. Así se ve que el $${g}$ está arriba y abajo.`,
    });
    estados.push([{ id: "b", tex: b }, frSupPiezas("xg", [{ id: "xn1", tex: `${n1}` }], [{ id: "xk1", tex: `${k1}` }])]);
    trans.push({
      // se tachan SOLO el g de arriba y el g de abajo (con su punto); lo que queda se queda en su lugar, arriba y abajo de la raya
      fusiones: [
        { desde: ["xp1", "xg1"], hacia: null, modo: "tachar" },
        { desde: ["xp2", "xg2"], hacia: null, modo: "tachar" },
      ],
      texto: `El $${g}$ de arriba y el $${g}$ de abajo se tachan. Quedan $${n1}$ arriba y $${k1}$ abajo: $\\tfrac{${n1}}{${k1}}$.`,
      porque: `Dividir el numerador y el denominador entre el mismo número, $${g}$, no cambia la fracción.`,
      regla: `$\\dfrac{a\\cdot c}{b\\cdot c}=\\dfrac{a}{b}$`,
    });
    expId = "xg";
    expN = "xn1";
    expD = "xk1";
    if (k1 === 1) {
      // un numero entre 1 es el mismo numero: el exponente queda entero (el numerador es el que se queda)
      estados.push([{ id: "b", tex: b }, { id: "x3", tex: `${n1}`, sup: true }]);
      trans.push({
        fusiones: [{ desde: ["xg"], hacia: "x3" }],
        // con letra no hay potencia que calcular despues: este es el ultimo paso y cierra volviendo al enunciado
        texto: `Un número entre $1$ es el mismo número: $\\tfrac{${n1}}{1}=${n1}$. El exponente es un número entero.${numerica ? "" : ` Queda $${potTex(b, n1)}$. Entonces $${raiz(k, potTex(b, n))}=${potTex(b, n1)}$.`}`,
        porque: `Dividir entre $1$ no cambia nada.`,
        regla: `$\\dfrac{a}{1}=a$`,
      });
      expId = "x3";
    }
  }

  const resumen: Record<string, number> = { n, k, g, n1, k1 };

  if (k1 === 1) {
    // Exponente entero: n1
    if (n1 === 1) {
      estados.push([{ id: "b", tex: b }]);
      trans.push({
        fusiones: [{ desde: [expId], hacia: null, ancla: "b" }],
        // se nombra lo que esta en la hoja (la raiz de b^n), no el numero calculado que nunca se escribio
        texto: `Elevar a $1$ no cambia nada: $${raiz(k, potTex(b, n))}=${b}$.${numerica && !opciones.empezarEnQ ? ` Entonces $${raiz(k, `${valor}`)}=${b}$.` : ""}`,
        porque: `Cualquier número elevado a $1$ es el mismo número.`,
        regla: `$a^{1}=a$`,
      });
    } else if (numerica) {
      const v = pot(base as number, n1);
      cadenaPotencia(estados, trans, {
        antes: [],
        despues: [],
        idB: "b",
        idE: expId,
        idR: "f",
        base: base as number,
        exp: n1,
        pre: "w",
        // en raizConFactor (empezarEnQ) la hoja tiene la raiz de b^n, no la del numero: se nombra lo que se ve
        cierre: ` Entonces $${opciones.empezarEnQ ? raiz(k, potTex(b, n)) : raiz(k, `${valor}`)}=${v}$.`,
      });
    }
    resumen.q = n1;
    resumen.r = 0;
  } else {
    const q = Math.floor(n1 / k1);
    const r = n1 % k1;
    resumen.q = q;
    resumen.r = r;
    const reglaRaiz = `$a^{\\frac{m}{p}}=\\sqrt[p]{a^{m}}$`;
    // el exponente fraccionario se abre en indice (el denominador viaja a la izquierda) y exponente (el numerador se queda con la base)
    // idArriba e idAbajo: las partes de la fraccion ("er.n") o sus piezas, si la fraccion esta armada con piezas
    const abrirFraccion = (idFrac: string, idArriba: string, idAbajo: string, baseTex: string, idNum: string, numTex: string) => {
      trans.push({
        fusiones: [{ desde: [...new Set([idFrac, idArriba, idAbajo])], hacia: ["ik2", idNum], modo: "viajar" }],
        brotes: [
          { desde: idAbajo, hacia: "ik2" },
          { desde: idArriba, hacia: idNum },
        ],
        texto: `Un exponente fraccionario es una raíz: el denominador $${k1}$ viaja a la izquierda y es el índice; el numerador $${numTex}$ queda como exponente de $${baseTex}$.`,
        porque: `En $a^{\\frac{m}{p}}$ el denominador $p$ es el índice de la raíz y el numerador $m$ es el exponente de lo que está adentro.`,
        regla: reglaRaiz,
      });
    };
    // el indice de la raiz va siempre con su etiqueta, para que no flote sin nombre
    const ik2: Ficha = { id: "ik2", tex: `${k1}`, sup: true, debajo: "\\text{índice}" };
    // la raiz se cierra con el radicando YA calculado (3^2 se calcula antes de meterlo: queda raiz de 9, no raiz de 3^2)
    const radicando = numerica ? String(pot(base as number, r)) : potTex(b, r);
    if (q === 0) {
      const calcula = numerica && n1 > 1;
      const radicandoQ0 = numerica ? String(pot(base as number, n1)) : potTex(b, n1);
      estados.push([ik2, { id: "b", tex: b }, { id: "nn", tex: `${n1}`, sup: true }]);
      abrirFraccion(expId, expN, expD, b, "nn", `${n1}`);
      if (calcula) {
        cadenaPotencia(estados, trans, { antes: [ik2], despues: [], idB: "b", idE: "nn", idR: "rr", base: base as number, exp: n1, pre: "u" });
        estados.push([{ id: "f", tex: raiz(k1, radicandoQ0) }]);
        trans.push({
          fusiones: [{ desde: ["ik2", "rr"], hacia: "f" }],
          texto: `Metemos el $${radicandoQ0}$ dentro de la raíz de índice $${k1}$: $${b}^{${frac(n1, k1)}}=${raiz(k1, potTex(b, n1))}=${raiz(k1, radicandoQ0)}$.`,
          porque: `No se puede sacar nada de la raíz porque el exponente de adentro, $${n1}$, es menor que el índice, $${k1}$. Queda la raíz del número ya calculado.`,
          regla: reglaRaiz,
        });
      } else {
        estados.push([{ id: "f", tex: raiz(k1, potTex(b, n1)) }]);
        trans.push({
          fusiones: [{ desde: ["ik2", "b", "nn"], hacia: "f" }],
          texto: `Metemos la base y su exponente dentro de la raíz de índice $${k1}$: $${b}^{${frac(n1, k1)}}=${raiz(k1, potTex(b, n1))}$.`,
          porque: `No se puede sacar nada de la raíz porque el exponente de adentro, $${n1}$, es menor que el índice, $${k1}$. Es la forma más simple.`,
          regla: reglaRaiz,
        });
      }
    } else {
      const radical = raiz(k1, radicando);
      // 0) cociente y resto como estado: n1 = q·k1 + r (el cociente y el resto llevan su etiqueta)
      const fracExp = estados[estados.length - 1].find((f) => f.id === expId)!;
      estados.push([
        { id: "b", tex: b },
        fracExp,
        { id: "Sq", tex: "", salto: true },
        { id: "dn", tex: `${n1}` },
        { id: "de", tex: "=", op: true },
        { id: "pq", tex: `${q}`, debajo: "\\text{cociente}" },
        { id: "dx", tex: "\\cdot", op: true },
        { id: "dk", tex: `${k1}` },
        { id: "dp", tex: "+", op: true },
        { id: "dr", tex: `${r}`, debajo: "\\text{resto}" },
      ]);
      trans.push({
        fusiones: [],
        brotes: [
          { desde: expId, hacia: "Sq" },
          { desde: expN, hacia: "dn" },
          { desde: expN, hacia: "pq" },
          { desde: expD, hacia: "dk" },
          { desde: expN, hacia: "dr" },
        ],
        texto: `Vemos cuántas veces cabe el $${k1}$ en el $${n1}$: cabe $${q}$ ${q === 1 ? "vez" : "veces"} ($${q}\\cdot ${k1}=${q * k1}$) y sobra $${r}$. Lo escribimos así: $${n1}=${q}\\cdot ${k1}+${r}$.`,
        porque: `Todo número es igual al cociente por el divisor más el resto.`,
        regla: `$n=q\\cdot p+r$`,
      });
      // 1) la fraccion se separa en entero + resto: n1/k1 = q + r/k1 (el cociente sube a ser el exponente entero)
      estados.push([{ id: "b", tex: b }, { id: "pq", tex: `${q}`, sup: true }, { id: "pt", tex: "+", sup: true, op: true }, frSup("er", `${r}`, `${k1}`)]);
      trans.push({
        fusiones: [{ desde: [expId, "Sq", "dn", "de", "dx", "dk", "dp", "dr"], hacia: ["pt", "er"] }],
        descompone: true,
        texto: `Separamos el exponente: $${frac(n1, k1)}=${q}+${frac(r, k1)}$. El cociente $${q}$ sube a ser la parte entera y el resto $${r}$ queda sobre el $${k1}$.`,
        porque: `Si $${n1}=${q}\\cdot ${k1}+${r}$, al dividir entre $${k1}$ queda $\\tfrac{${n1}}{${k1}}=${q}+\\tfrac{${r}}{${k1}}$.`,
      });
      // 2) b^(q + r/k) = b^q · b^(r/k): la base se copia (una copia VIAJA) y el + se vuelve por
      estados.push([
        { id: "b", tex: b },
        { id: "pq", tex: `${q}`, sup: true },
        { id: "pt", tex: "\\cdot", op: true },
        { id: "b2", tex: b },
        frSup("er", `${r}`, `${k1}`),
      ]);
      trans.push({
        fusiones: [],
        brotes: [{ desde: "b", hacia: "b2" }],
        texto: `Una suma en el exponente es un producto de potencias: $${b}^{${q}+${frac(r, k1)}}=${b}^{${q}}\\cdot ${b}^{${frac(r, k1)}}$. La base se copia (la copia viaja desde la $${b}$) y el $+$ se vuelve $\\cdot$.`,
        porque: `$${b}^{${q}}$ es la parte entera y $${b}^{${frac(r, k1)}}$ es la parte que sigue siendo raíz.`,
        regla: `$a^{p+q}=a^{p}\\cdot a^{q}$`,
      });
      // 3) el exponente r/k de la segunda base se abre en indice y exponente
      estados.push([
        { id: "b", tex: b },
        { id: "pq", tex: `${q}`, sup: true },
        { id: "pt", tex: "\\cdot", op: true },
        ik2,
        { id: "b2", tex: b },
        { id: "rn", tex: `${r}`, sup: true },
      ]);
      abrirFraccion("er", "er.n", "er.d", b, "rn", `${r}`);
      // 4) se meten en la raiz (si la potencia de adentro es un numero, primero se calcula)
      const entero: Ficha[] = [{ id: "b", tex: b }, { id: "pq", tex: `${q}`, sup: true }, { id: "pt", tex: "\\cdot", op: true }];
      if (numerica && r > 1) {
        cadenaPotencia(estados, trans, { antes: [...entero, ik2], despues: [], idB: "b2", idE: "rn", idR: "rr", base: base as number, exp: r, pre: "u" });
        estados.push([...entero, { id: "pr", tex: radical }]);
        trans.push({
          fusiones: [{ desde: ["ik2", "rr"], hacia: "pr" }],
          texto: `Metemos el $${radicando}$ dentro de la raíz de índice $${k1}$: $${b}^{${frac(r, k1)}}=${raiz(k1, potTex(b, r))}=${radical}$.`,
          porque: `Esta raíz no se puede resolver exacta, así que se deja escrita, con el número de adentro ya calculado.`,
          regla: reglaRaiz,
        });
      } else {
        estados.push([...entero, { id: "pr", tex: radical }]);
        trans.push({
          fusiones: [{ desde: ["ik2", "b2", "rn"], hacia: "pr" }],
          texto: `Metemos la base y su exponente dentro de la raíz de índice $${k1}$: $${b}^{${frac(r, k1)}}=${radical}$.`,
          porque: `${r === 1 ? `Como el exponente de adentro es $1$, no se escribe: $${b}^{1}=${b}$. ` : ""}Esta raíz no se puede resolver exacta, así que se deja escrita.`,
          regla: reglaRaiz,
        });
      }
      if (q === 1) {
        // b^1 = b
        estados.push([
          { id: "b", tex: b },
          { id: "pt", tex: "\\cdot", op: true },
          { id: "pr", tex: radical },
        ]);
        trans.push({
          fusiones: [{ desde: ["pq"], hacia: null, ancla: "b" }],
          texto: `Elevar a $1$ no cambia nada: $${b}^{1}=${b}$.`,
          porque: `Cualquier número elevado a $1$ es el mismo número.`,
          regla: `$a^{1}=a$`,
        });
      }
      if (numerica) {
        const coef = pot(base as number, q);
        const coefId = q === 1 ? "b" : "co";
        if (q > 1) {
          cadenaPotencia(estados, trans, {
            antes: [],
            despues: [{ id: "pt", tex: "\\cdot", op: true }, { id: "pr", tex: radical }],
            idB: "b",
            idE: "pq",
            idR: "co",
            base: base as number,
            exp: q,
            pre: "w",
            cierre: " Esa es la parte entera.",
          });
        }
        estados.push([{ id: "fin", tex: `${coef}${radical}` }]);
        trans.push({
          fusiones: [{ desde: [coefId, "pt", "pr"], hacia: "fin" }],
          texto: `El $${coef}$ ya está fuera de la raíz: lo pegamos delante de ella. Queda $${raiz(k, `${valor}`)}=${coef}${radical}$.`,
          porque: `El $\\cdot$ entre un número y una raíz se puede omitir. La raíz que queda no se puede resolver exacta, así que se deja escrita: ese es el resultado simplificado.`,
        });
        resumen.coef = Number(coef);
      }
    }
  }

  const idsFinales = estados[estados.length - 1].map((f) => f.id);
  // lo que va al lado (el «· ∛3» de raizConFactor) es parte de la expresion principal: va ANTES del primer salto de renglon.
  // Si va al final, cae en el renglon de una lista temporal (los divisores, el cociente y el resto) y se lee «Divisores de 3: 1, 3 · ∛3» (29-oct).
  const conExtra = (e: Ficha[]) => {
    const s = e.findIndex((f) => f.salto);
    return s < 0 ? [...e, ...extra] : [...e.slice(0, s), ...extra, ...e.slice(s)];
  };
  return {
    demo: { titulo: "", nota: "", intro, estados: estados.map(conExtra), transiciones: trans },
    resumen,
    idsFinales,
  };
}

/**
 * raizConFactor elige a^n como la MAYOR potencia perfecta que divide a a^n·c. Eso solo es cierto si c no tiene
 * ningun factor primo repetido k veces o mas (con c = 8 y k = 2, el 4 de 8 tambien saldria de la raiz y el texto mentiria).
 */
export function validarRaizConFactor(a: number, n: number, k: number, c: number): string | null {
  const e = validarRaiz(a, n, k);
  if (e) return e;
  if (n % k !== 0) return "Para este ejemplo el índice debe dividir al exponente (por ejemplo 2 y 2, o 3 y 6).";
  if (!Number.isInteger(c) || c < 2 || c > 99) return "El resto debe ser un entero entre 2 y 99.";
  let m = c;
  for (let p = 2; p <= m; p++) {
    let veces = 0;
    while (m % p === 0) {
      m /= p;
      veces++;
    }
    if (veces >= k) return `El resto ${c} todavía tiene una parte que sale de la raíz (el ${p} se repite ${veces} veces); elige un resto sin factores repetidos ${k} veces.`;
    if (m === 1) break;
  }
  return null;
}

/** raiz de indice k de (a^n · c): la parte exacta pasa por el proceso completo y el resto se deja */
export function raizConFactor(a: number, n: number, k: number, c: number): Resultado {
  const exacta = pot(a, n);
  const valor = exacta * BigInt(c);
  const t: Ficha = { id: "t", tex: "\\cdot", op: true };
  const rc: Ficha = { id: "rc", tex: raiz(k, `${c}`) };
  const inner = raizGeneral(a, n, k, { extra: [t, rc], empezarEnQ: true });
  const v = pot(a, n / k);
  const finalDesde = [...inner.idsFinales, "t", "rc"];
  const resultado = `${v}${raiz(k, `${c}`)}`;
  const aTex = potTex(String(a), n);
  const ik0: Ficha = { id: "ik0", tex: `${k}`, sup: true, debajo: "\\text{índice}" };
  const ikSin: Ficha = { id: "ik0", tex: `${k}`, sup: true };
  const ik1: Ficha = { id: "ik1", tex: `${k}`, sup: true };
  const pc: Ficha = { id: "pc", tex: `${c}` };

  // lista de potencias perfectas de indice k que caben en el radicando (j^k con j = 2, 3, ...); la elegida es "pv"
  const maxJ = (() => {
    let j = 1;
    while (j < 8 && pot(j + 1, k) <= valor) j++;
    return j;
  })();
  const js: number[] = [];
  for (let j = 2; j <= Math.min(maxJ, 8); j++) js.push(j);
  const raizExacta = Number(pot(a, n / k));
  const hayPuntos = !js.includes(raizExacta);
  const listaIds: string[] = [];
  const listaFichas: Ficha[] = [];
  // la coma va PEGADA al numero de antes («4, 9», no «4 , 9»): si el renglon se parte, se parte despues de la coma
  const agregar = (id: string, tex: string, op = false) => {
    if (listaFichas.length > 0) {
      listaFichas.push({ id: `lq${listaFichas.length}`, tex: ",", op: true, pegado: true });
      listaIds.push(`lq${listaFichas.length - 1}`);
    }
    listaFichas.push({ id, tex, ...(op ? { op } : {}) });
    listaIds.push(id);
  };
  for (const j of js) agregar(j === raizExacta ? "pv" : `lp${j}`, `${pot(j, k)}`);
  if (hayPuntos) {
    agregar("lpe", "\\ldots", true);
    agregar("pv", `${exacta}`);
  }
  const Sl: Ficha = { id: "Sl", tex: "", salto: true };
  const Sd: Ficha = { id: "Sd", tex: "", salto: true };
  const cu: Ficha = fr("cu", `${valor}`, `${exacta}`);
  const ce: Ficha = { id: "ce", tex: "=", op: true };
  const pvF: Ficha = { id: "pv", tex: `${exacta}` };
  const nvF: Ficha = { id: "nv", tex: `${valor}`, debajo: "\\text{radicando}" };

  // Se busca la MAYOR potencia perfecta que divide: se prueba desde la mas grande de la lista hacia abajo.
  // Las que estan por encima de la elegida no dividen (se ve la cuenta con su resto) y se tachan; ahi se para.
  const mayores = js.filter((j) => j > raizExacta).reverse();
  const pruebas: Transicion[] = [];
  const listas: Ficha[][] = [listaFichas];
  let listaActual = listaFichas;
  for (const j of mayores) {
    const cand = pot(j, k);
    const id = `lp${j}`;
    const i = listaActual.findIndex((f) => f.id === id);
    const comaId = listaActual[i - 1].id;
    // se tacha SOLO el numero. La coma de antes no se marca ni se tacha (Ronald/revisor, 29-oct: se tachaba tambien): se vacia
    // en el mismo cambio de estado, sin gesto, y la pieza vacia se recoge junto con la lista (una pieza sin tinta no se marca)
    listaActual = listaActual.filter((f) => f.id !== id).map((f) => (f.id === comaId ? { ...f, tex: "" } : f));
    listas.push(listaActual);
    const cociente = valor / cand;
    const sobra = valor % cand;
    pruebas.push({
      fusiones: [{ desde: [id], hacia: null, modo: "tachar" }],
      resaltar: ["nv"],
      texto: `${pruebas.length === 0 ? "Probamos desde el mayor de la lista. " : "Seguimos con el que sigue. "}¿El $${cand}$ divide a $${valor}$? $${valor}=${cand}\\cdot ${cociente}+${sobra}$: sobra $${sobra}$, así que no. Lo tachamos.`,
      porque: `Un número divide a otro solo si la división no deja resto. Aquí sobra $${sobra}$.`,
      regla: `$n=q\\cdot p+r$`,
    });
  }
  const otrosDeLista = listaActual.map((f) => f.id).filter((id) => id !== "pv");
  // los mas chicos que tambien dividen (el 8 en 192): se dicen, para que se vea por que igual se elige el mayor
  const chicosQueDividen = js.filter((j) => j < raizExacta && valor % pot(j, k) === BigInt(0)).map((j) => `$${pot(j, k)}$`);
  const porQueSeElige =
    chicosQueDividen.length > 0
      ? ` También ${chicosQueDividen.length === 1 ? "divide el" : "dividen el"} ${chicosQueDividen.join(" y el ")}, pero ${chicosQueDividen.length === 1 ? "es más chico" : "son más chicos"}: con el mayor sale de la raíz todo lo que se puede de una vez.`
      : js.some((j) => j < raizExacta)
        ? " Es el mayor de la lista que divide: aquí paramos, los que quedan son más chicos."
        : mayores.length > 0
          ? " Es el mayor de la lista que divide."
          : "";

  const estados: Ficha[][] = [
    [{ id: "r0", tex: raiz(k, `${valor}`) }],
    // se abre la raiz: indice y radicando
    [ik0, nvF],
    // lista de potencias perfectas, las que no dividen tachadas de mayor a menor, y la cuenta 12 / 4 = 3
    ...listas.map((l) => [ik0, nvF, Sl, ...l]),
    [ik0, nvF, Sl, ...listaActual, Sd, cu, ce, pc],
    // 12 = 4 · 3
    [ikSin, pvF, t, pc],
    [ikSin, pvF, t, pc],
    // 4 = 2 · 2 = 2^2
    [ikSin, { id: "pf", tex: factores(String(a), n), ...etiquetaFactores(n) }, t, pc],
    [ikSin, { id: "pa", tex: aTex }, t, pc],
    // el indice se copia para que cada raiz tenga el suyo
    [ikSin, { id: "pa", tex: aTex }, t, ik1, pc],
    ...inner.demo.estados,
    [{ id: "fin", tex: resultado }],
  ];
  const trans: Transicion[] = [
    {
      fusiones: [{ desde: ["r0"], hacia: ["ik0", "nv"] }],
      texto: `Abrimos la raíz: su índice es $${k}$ y lo que hay adentro (el radicando) es $${valor}$.`,
      porque: `Vamos a trabajar con lo que hay adentro, y hay que recordar con qué índice se saca la raíz.${k === 2 ? " En la raíz cuadrada el índice $2$ no se escribe, pero está." : ""}`,
    },
    {
      fusiones: [],
      brotes: [
        { desde: "nv", hacia: "Sl" },
        ...listaIds.filter((id) => !id.startsWith("lq")).map((id) => ({ desde: "nv", hacia: id })),
      ],
      // cada potencia de la lista dice de donde sale (2·2 = 4, 3·3 = 9...), como a lapiz
      texto: `Buscamos la mayor potencia perfecta de índice $${k}$ que divida a $${valor}$. Escribimos las que caben en $${valor}$, multiplicando $${k}$ veces cada número: ${[...js, ...(hayPuntos ? [raizExacta] : [])].map((j) => `$${factores(String(j), k)}=${pot(j, k)}$`).join(", ")}.${hayPuntos ? " Las del medio no se escriben: en su lugar van los puntos suspensivos." : ""}`,
      porque: `Una potencia perfecta de índice $${k}$ es un número que sale de multiplicar $${k}$ veces el mismo número ($${js[0] ?? 2}^{${k}}=${pot(js[0] ?? 2, k)}$). Solo esas se pueden sacar de la raíz, y conviene la mayor: así sale todo lo posible.`,
    },
    ...pruebas,
    {
      fusiones: [],
      brotes: [
        { desde: "nv", hacia: "Sd" },
        { desde: "nv", hacia: "cu.n" },
        { desde: "pv", hacia: "cu.d" },
        { desde: "nv", hacia: "pc" },
      ],
      resaltar: ["pv"],
      texto: `${mayores.length > 0 ? "Seguimos con el que sigue: el" : js.length > 1 || hayPuntos ? "Probamos desde el mayor de la lista: el" : "El"} $${exacta}$ divide a $${valor}$ sin dejar resto: $\\tfrac{${valor}}{${exacta}}=${c}$.${porQueSeElige}`,
      porque: `Si la división da un número entero, el $${exacta}$ cabe justo en el $${valor}$ y el resultado, $${c}$, es el otro factor.`,
    },
    {
      fusiones: [{ desde: ["nv", "Sl", ...otrosDeLista, "Sd", "cu", "ce"], hacia: ["t"] }],
      descompone: true,
      texto: `Entonces $${valor}=${exacta}\\cdot ${c}$.`,
      porque: `Un número es igual al divisor por el cociente. Elegimos que uno de ellos tenga raíz de índice $${k}$ exacta; el otro, $${c}$, se queda como está.`,
    },
    {
      fusiones: [],
      resaltar: ["pv"],
      texto: `El $${exacta}$ es una potencia perfecta de índice $${k}$${k === 2 ? " (un cuadrado perfecto)" : ""}: sale de multiplicar $${k}$ veces el mismo número. El $${c}$ no lo es.`,
      porque: `Solo se puede sacar de la raíz lo que es una potencia perfecta del índice. Marcamos cuál es.`,
    },
    {
      fusiones: [{ desde: ["pv"], hacia: "pf" }],
      descompone: true,
      texto: `Escribimos $${exacta}$ como producto de factores iguales: $${exacta}=${factores(String(a), n)}$, con $${n}$ factores $${a}$.`,
      porque: `Buscamos el número que, multiplicado por sí mismo $${n}$ veces, da $${exacta}$. Ese número es $${a}$.`,
    },
    {
      fusiones: [{ desde: ["pf"], hacia: "pa" }],
      descompone: true,
      texto: `Contamos los factores: hay $${n}$ veces el $${a}$, y eso se escribe $${aTex}$. Entonces $${exacta}=${aTex}$.`,
      porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma.`,
      regla: `$a\\cdot a\\cdots a=a^{n}\\ (n\\text{ factores})$`,
    },
    {
      fusiones: [],
      brotes: [{ desde: "ik0", hacia: "ik1" }],
      texto: `La raíz de un producto se separa en dos raíces, y cada una necesita su índice. Copiamos el índice $${k}$: la copia viaja junto al factor $${c}$.`,
      porque: `Las dos raíces tienen el mismo índice que tenía la raíz original.`,
    },
    {
      fusiones: [
        { desde: ["ik0", "pa"], hacia: "q" },
        { desde: ["ik1", "pc"], hacia: "rc" },
      ],
      texto: `La raíz de un producto se separa en el producto de las raíces: cada número se mete en su raíz, con su índice.`,
      porque: `$${raiz(k, "a\\cdot b")}=${raiz(k, "a")}\\cdot ${raiz(k, "b")}$, porque los dos factores se multiplican.`,
      regla: `$\\sqrt[k]{a\\cdot b}=\\sqrt[k]{a}\\cdot\\sqrt[k]{b}$`,
    },
    ...inner.demo.transiciones,
    {
      fusiones: [{ desde: finalDesde, hacia: "fin" }],
      texto: `El $${v}$ ya salió de la raíz (era $${raiz(k, aTex)}$): lo pegamos delante de $${raiz(k, `${c}`)}$. Queda $${raiz(k, `${valor}`)}=${resultado}$.`,
      porque: `$${raiz(k, `${c}`)}$ no se puede resolver exacta, porque $${c}$ no es una potencia perfecta de índice $${k}$. Se deja escrita: ese es el resultado simplificado.`,
    },
  ];
  return {
    demo: { titulo: "", nota: "", intro: `Queremos simplificar $${raiz(k, `${valor}`)}$. El $${valor}$ no es una potencia perfecta, pero tiene una parte que sí lo es.`, estados, transiciones: trans },
    resumen: { ...inner.resumen, valor: Number(valor), v: Number(v), c },
  };
}
