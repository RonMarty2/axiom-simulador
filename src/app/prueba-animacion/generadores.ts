// Generadores: arman la animacion completa de una potencia o una raiz para
// CUALQUIER base, exponente e indice, en vez de escribirla a mano caso por caso.
// Todo el texto va en LaTeX entre $...$ (se pinta con MathText): fracciones con
// raya, nunca "/" ni "÷".
import { fr, type Demo, type Ficha, type Transicion } from "./datos.ts";

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
  const g1: Ficha = { id: "g1", tex: `(${factores(b, m)})`, debajo: `${m}\\text{ factores}` };
  const tx: Ficha = { id: "tx", tex: "\\cdot", op: true };
  const g2: Ficha = { id: "g2", tex: `(${factores(b, n)})`, debajo: `${n}\\text{ factores}` };
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
      texto: `Recuerda qué es una potencia: $${b}^{${m}}$ son $${m}$ factores $${b}$ multiplicados, y $${b}^{${n}}$ son $${n}$ factores $${b}$. Los escribimos debajo.`,
      porque: `El exponente cuenta cuántas veces se multiplica la base por sí misma.`,
      regla: `$a^{n}=a\\cdot a\\cdots a\\ (n\\text{ factores})$`,
    },
    {
      fusiones: [{ desde: ["g1", "tx", "g2"], hacia: "g" }],
      texto: `Juntamos todo en una sola fila: son $${m}$ factores y otros $${n}$ factores, es decir $${s}$ factores $${b}$ multiplicados.`,
      porque: `Multiplicar un grupo de factores por otro grupo de factores solo los junta: los paréntesis ya no hacen falta.`,
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
    const v = pot(base, s);
    estados.push([{ id: "r", tex: `${v}` }]);
    trans.push({
      fusiones: [{ desde: ["b1", "e5"], hacia: "r" }],
      texto: `Calculamos $${b}^{${s}}=${v}$.`,
      porque: `El exponente dice cuántas veces se multiplica la base por sí misma.`,
    });
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
    estados.push([{ id: "rf", tex: raiz(k, factores(b, n)) }]);
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

  // n · (1/k): el n queda arriba y el k abajo
  estados.push([{ id: "b", tex: b }, frSup("x2", `${n}`, `${k}`)]);
  trans.push({
    fusiones: [{ desde: ["x", "c", "h"], hacia: "x2", modo: "viajar" }],
    brotes: [
      { desde: "x", hacia: "x2.n" },
      { desde: "h", hacia: "x2.d" },
    ],
    texto: `Multiplicamos los exponentes: $${n}\\cdot\\tfrac{1}{${k}}=\\tfrac{${n}}{${k}}$. El $${n}$ queda arriba y el $${k}$ abajo.`,
    porque: `Un número por una fracción: se multiplica por el numerador y se divide entre el denominador. Como el numerador es $1$, el $${n}$ queda igual.`,
  });

  // Simplificar la fraccion del exponente: primero se ve de donde sale el g, despues se tacha
  const g = mcd(n, k);
  const n1 = n / g;
  const k1 = k / g;
  let expId = "x2";
  if (g > 1) {
    estados.push([{ id: "b", tex: b }, frSup("xg", `${n1}\\cdot ${g}`, `${k1}\\cdot ${g}`)]);
    trans.push({
      fusiones: [{ desde: ["x2"], hacia: "xg" }],
      descompone: true,
      texto: `Buscamos el mayor número que divide a $${n}$ y a $${k}$: es el $${g}$. Escribimos $${n}=${n1}\\cdot ${g}$ y $${k}=${k1}\\cdot ${g}$.`,
      porque: `Un número se puede escribir como producto de sus divisores. Así se ve que el $${g}$ está arriba y abajo.`,
    });
    estados.push([{ id: "b", tex: b }, k1 === 1 ? { id: "x3", tex: `${n1}`, sup: true } : frSup("x3", `${n1}`, `${k1}`)]);
    trans.push({
      fusiones: [{ desde: ["xg"], hacia: "x3", modo: "tachar" }],
      texto: `El $${g}$ de arriba y el $${g}$ de abajo se tachan: $\\tfrac{${n1}\\cdot ${g}}{${k1}\\cdot ${g}}=${frac(n1, k1)}$.`,
      porque: `Dividir el numerador y el denominador entre el mismo número, $${g}$, no cambia la fracción.${k1 === 1 ? " Como el denominador queda en $1$, el exponente es un número entero." : ""}`,
      regla: `$\\dfrac{a\\cdot c}{b\\cdot c}=\\dfrac{a}{b}$`,
    });
    expId = "x3";
  }

  const resumen: Record<string, number> = { n, k, g, n1, k1 };

  if (k1 === 1) {
    // Exponente entero: n1
    if (n1 === 1) {
      estados.push([{ id: "b", tex: b }]);
      trans.push({
        fusiones: [{ desde: [expId], hacia: null, ancla: "b" }],
        texto: `Elevar a $1$ no cambia nada: ${numerica ? `$${raiz(k, `${valor}`)}=${b}$` : `queda $${b}$`}.`,
        porque: `Cualquier número elevado a $1$ es el mismo número.`,
        regla: `$a^{1}=a$`,
      });
    } else if (numerica) {
      const v = pot(base as number, n1);
      estados.push([{ id: "f", tex: `${v}` }]);
      trans.push({
        fusiones: [{ desde: ["b", expId], hacia: "f" }],
        texto: `Calculamos $${b}^{${n1}}=${v}$. Entonces $${raiz(k, `${valor}`)}=${v}$.`,
        porque: `El exponente dice cuántas veces se multiplica la base por sí misma.`,
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
    const abrirFraccion = (idFrac: string, baseTex: string, idNum: string, numTex: string) => {
      trans.push({
        fusiones: [{ desde: [idFrac, `${idFrac}.n`, `${idFrac}.d`], hacia: ["ik2", idNum], modo: "viajar" }],
        brotes: [
          { desde: `${idFrac}.d`, hacia: "ik2" },
          { desde: `${idFrac}.n`, hacia: idNum },
        ],
        texto: `Un exponente fraccionario es una raíz: el denominador $${k1}$ viaja a la izquierda y es el índice; el numerador $${numTex}$ queda como exponente de $${baseTex}$.`,
        porque: `En $a^{\\frac{m}{p}}$ el denominador $p$ es el índice de la raíz y el numerador $m$ es el exponente de lo que está adentro.`,
        regla: reglaRaiz,
      });
    };
    if (q === 0) {
      estados.push([
        { id: "ik2", tex: `${k1}`, sup: true },
        { id: "b", tex: b },
        { id: "nn", tex: `${n1}`, sup: true },
      ]);
      abrirFraccion(expId, b, "nn", `${n1}`);
      estados.push([{ id: "f", tex: raiz(k1, potTex(b, n1)) }]);
      trans.push({
        fusiones: [{ desde: ["ik2", "b", "nn"], hacia: "f" }],
        texto: `Metemos la base y su exponente dentro de la raíz de índice $${k1}$: $${b}^{${frac(n1, k1)}}=${raiz(k1, potTex(b, n1))}$.`,
        porque: `No se puede sacar nada de la raíz porque el exponente de adentro, $${n1}$, es menor que el índice, $${k1}$. Es la forma más simple.`,
        regla: reglaRaiz,
      });
    } else {
      const radical = raiz(k1, potTex(b, r));
      // 1) la fraccion se separa en entero + resto: n1/k1 = q + r/k1
      estados.push([{ id: "b", tex: b }, { id: "pq", tex: `${q}`, sup: true }, { id: "pt", tex: "+", sup: true, op: true }, frSup("er", `${r}`, `${k1}`)]);
      trans.push({
        fusiones: [{ desde: [expId], hacia: ["pq", "pt", "er"] }],
        descompone: true,
        texto: `Separamos el exponente: $${frac(n1, k1)}=${q}+${frac(r, k1)}$. Una parte es entera y la otra sigue siendo fracción.`,
        porque: `En $${n1}$ cabe $${q}$ veces el $${k1}$ (porque $${q}\\cdot ${k1}=${q * k1}$) y sobra $${r}$. Por eso $\\tfrac{${n1}}{${k1}}=${q}+\\tfrac{${r}}{${k1}}$.`,
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
        { id: "ik2", tex: `${k1}`, sup: true },
        { id: "b2", tex: b },
        { id: "rn", tex: `${r}`, sup: true },
      ]);
      abrirFraccion("er", b, "rn", `${r}`);
      // 4) se meten en la raiz
      estados.push([
        { id: "b", tex: b },
        { id: "pq", tex: `${q}`, sup: true },
        { id: "pt", tex: "\\cdot", op: true },
        { id: "pr", tex: radical },
      ]);
      trans.push({
        fusiones: [{ desde: ["ik2", "b2", "rn"], hacia: "pr" }],
        texto: `Metemos la base y su exponente dentro de la raíz de índice $${k1}$: $${b}^{${frac(r, k1)}}=${radical}$.`,
        porque: `${r === 1 ? `Como el exponente de adentro es $1$, no se escribe: $${b}^{1}=${b}$. ` : ""}Esta raíz no se puede resolver exacta, así que se deja escrita.`,
        regla: reglaRaiz,
      });
      if (!numerica && q === 1) {
        // x^1 = x
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
        estados.push([
          { id: "co", tex: `${coef}` },
          { id: "pt", tex: "\\cdot", op: true },
          { id: "pr", tex: radical },
        ]);
        trans.push({
          fusiones: [{ desde: ["b", "pq"], hacia: "co" }],
          texto: `Calculamos la parte entera: $${b}^{${q}}=${coef}$.`,
          porque: `El exponente dice cuántas veces se multiplica la base por sí misma.`,
        });
        estados.push([{ id: "fin", tex: `${coef}${radical}` }]);
        trans.push({
          fusiones: [{ desde: ["co", "pt", "pr"], hacia: "fin" }],
          texto: `El $${coef}$ ya está fuera de la raíz: lo pegamos delante de ella. Queda $${raiz(k, `${valor}`)}=${coef}${radical}$.`,
          porque: `El $\\cdot$ entre un número y una raíz se puede omitir. La raíz que queda no se puede resolver exacta, así que se deja escrita: ese es el resultado simplificado.`,
        });
        resumen.coef = Number(coef);
      }
    }
  }

  const idsFinales = estados[estados.length - 1].map((f) => f.id);
  return {
    demo: { titulo: "", nota: "", intro, estados: estados.map((e) => [...e, ...extra]), transiciones: trans },
    resumen,
    idsFinales,
  };
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

  const estados: Ficha[][] = [
    [{ id: "r0", tex: raiz(k, `${valor}`) }],
    // se abre la raiz: indice y radicando
    [ik0, { id: "nv", tex: `${valor}`, debajo: "\\text{radicando}" }],
    // 12 = 4 · 3
    [ikSin, { id: "pv", tex: `${exacta}` }, t, pc],
    [ikSin, { id: "pv", tex: `${exacta}` }, t, pc],
    // 4 = 2 · 2 = 2^2
    [ikSin, { id: "pf", tex: factores(String(a), n) }, t, pc],
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
      fusiones: [{ desde: ["nv"], hacia: ["pv", "t", "pc"] }],
      descompone: true,
      texto: `Buscamos una potencia perfecta que divida a $${valor}$: $${valor}=${exacta}\\cdot ${c}$.`,
      porque: `Un número se puede escribir como producto de dos números. Elegimos que uno de ellos tenga raíz de índice $${k}$ exacta; el otro, $${c}$, se queda como está.`,
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
      texto: `La raíz de un producto se separa en dos raíces, y cada una necesita su índice. Copiamos el $${k}$: la copia viaja junto al $${c}$.`,
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
      porque: `$${raiz(k, `${c}`)}$ no se puede resolver exacta, porque $${c}$ no es una potencia perfecta de exponente $${k}$. Se deja escrita: ese es el resultado simplificado.`,
    },
  ];
  return {
    demo: { titulo: "", nota: "", intro: `Queremos simplificar $${raiz(k, `${valor}`)}$. El $${valor}$ no es una potencia perfecta, pero tiene una parte que sí lo es.`, estados, transiciones: trans },
    resumen: { ...inner.resumen, valor: Number(valor), v: Number(v), c },
  };
}
