// Generadores: arman la animacion completa de una potencia o una raiz para
// CUALQUIER base, exponente e indice, en vez de escribirla a mano caso por caso.
// Todo el texto va en LaTeX entre $...$ (se pinta con MathText): fracciones con
// raya, nunca "/" ni "÷".
import type { Demo, Ficha, Transicion } from "./datos.ts";

export type Base = number | "x";

const LIMITE = BigInt(10) ** BigInt(15);
const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));
const pot = (b: number, e: number): bigint => BigInt(b) ** BigInt(e);
const raiz = (k: number, dentro: string) => `\\sqrt${k === 2 ? "" : `[${k}]`}{${dentro}}`;
const frac = (a: number, b: number) => (b === 1 ? `${a}` : `\\tfrac{${a}}{${b}}`);
const potTex = (b: string, e: number) => (e === 1 ? b : `${b}^{${e}}`);

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
  const estados: Ficha[][] = [
    [
      { id: "b1", tex: b },
      { id: "e1", tex: `${m}`, sup: true },
      { id: "t", tex: "\\cdot", op: true },
      { id: "b2", tex: b },
      { id: "e2", tex: `${n}`, sup: true },
    ],
    [
      { id: "b1", tex: b },
      { id: "e1", tex: `${m}`, sup: true },
      { id: "e2", tex: `+${n}`, sup: true },
    ],
    [
      { id: "b1", tex: b },
      { id: "e5", tex: `${s}`, sup: true },
    ],
  ];
  const trans: Transicion[] = [
    {
      fusiones: [{ desde: ["t", "b2"], hacia: null, ancla: "b1" }],
      texto: `Las dos bases son iguales: se unen en una sola y los exponentes quedan juntos.`,
      porque: `$${b}^{${m}}\\cdot ${b}^{${n}}$ tiene $${m}$ factores $${b}$ por otros $${n}$ factores $${b}$: todos son $${b}$, no hace falta repetir la base.`,
    },
    {
      fusiones: [{ desde: ["e1", "e2"], hacia: "e5" }],
      texto: `Se suman los exponentes: $${m}+${n}=${s}$.`,
      porque: `En total hay $${s}$ factores iguales a $${b}$.`,
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
    estados.push([{ id: "r", tex: raiz(k, `${valor}`) }]);
    estados.push([{ id: "q", tex: raiz(k, potTex(b, n)) }]);
    intro = `Queremos calcular $${raiz(k, `${valor}`)}$. Veamos qué pasa por dentro.`;
    trans.push({
      fusiones: [{ desde: ["r"], hacia: "q" }],
      texto: `Escribimos $${valor}$ como una potencia: $${valor}=${potTex(b, n)}$.`,
      porque: `Buscamos un número que, multiplicado por sí mismo $${n}$ veces, dé $${valor}$. Ese número es $${b}$.`,
    });
  } else {
    estados.push([{ id: "q", tex: raiz(k, potTex(b, n)) }]);
    intro = `Queremos simplificar $${raiz(k, potTex(b, n))}$.`;
  }

  // La raiz se vuelve exponente 1/k
  estados.push([
    { id: "o", tex: "(" },
    { id: "b", tex: b },
    { id: "x", tex: `${n}`, sup: true },
    { id: "c", tex: ")" },
    { id: "h", tex: `\\tfrac{1}{${k}}`, sup: true },
  ]);
  trans.push({
    fusiones: [{ desde: ["q"], hacia: ["o", "b", "x", "c", "h"] }],
    texto: `La raíz de índice $${k}$ se convierte en el exponente $\\tfrac{1}{${k}}$.`,
    porque: `Sacar la raíz de índice $${k}$ es lo mismo que elevar a $\\tfrac{1}{${k}}$: $${raiz(k, "a")}=a^{\\frac{1}{${k}}}$.`,
  });

  // Potencia de potencia: se multiplican los exponentes
  estados.push([
    { id: "b", tex: b },
    { id: "x", tex: `${n}`, sup: true },
    { id: "h", tex: `\\cdot\\tfrac{1}{${k}}`, sup: true },
  ]);
  trans.push({
    fusiones: [{ desde: ["o", "c"], hacia: null, ancla: "b" }],
    texto: `Es una potencia de potencia: los paréntesis se unen a la base y los exponentes quedan juntos.`,
    porque: `Siempre se cumple $(a^{m})^{p}=a^{m\\cdot p}$: la base se queda y los exponentes se multiplican.`,
  });

  estados.push([
    { id: "b", tex: b },
    { id: "x2", tex: `\\tfrac{${n}}{${k}}`, sup: true },
  ]);
  trans.push({
    fusiones: [{ desde: ["x", "h"], hacia: "x2" }],
    texto: `Multiplicamos los exponentes: $${n}\\cdot\\tfrac{1}{${k}}=\\tfrac{${n}}{${k}}$.`,
    porque: `Un número por una fracción: se multiplica por el numerador y se divide entre el denominador.`,
  });

  // Simplificar la fraccion del exponente
  const g = mcd(n, k);
  const n1 = n / g;
  const k1 = k / g;
  let expId = "x2";
  if (g > 1) {
    estados.push([
      { id: "b", tex: b },
      { id: "x3", tex: frac(n1, k1), sup: true },
    ]);
    trans.push({
      fusiones: [{ desde: ["x2"], hacia: "x3", modo: "tachar" }],
      texto: `Se tacha el factor $${g}$ de arriba y de abajo: $\\tfrac{${n}}{${k}}=${frac(n1, k1)}$.`,
      porque: `Dividir el numerador y el denominador entre el mismo número, $${g}$, no cambia la fracción.${k1 === 1 ? " Como el denominador queda en $1$, el exponente es un número entero." : ""}`,
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
    if (q === 0) {
      estados.push([{ id: "f", tex: raiz(k1, potTex(b, n1)) }]);
      trans.push({
        fusiones: [{ desde: ["b", expId], hacia: "f" }],
        texto: `Un exponente fraccionario es una raíz: $${b}^{${frac(n1, k1)}}=${raiz(k1, potTex(b, n1))}$.`,
        porque: `No se puede sacar nada de la raíz porque el exponente de adentro, $${n1}$, es menor que el índice, $${k1}$. Es la forma más simple.`,
      });
    } else {
      const radical = raiz(k1, potTex(b, r));
      estados.push([
        { id: "pb", tex: b },
        { id: "pq", tex: `${q}`, sup: true },
        { id: "pt", tex: "\\cdot", op: true },
        { id: "pr", tex: radical },
      ]);
      trans.push({
        fusiones: [{ desde: ["b", expId], hacia: ["pb", "pq", "pt", "pr"] }],
        texto: `Separamos el exponente: $${frac(n1, k1)}=${q}+${frac(r, k1)}$. Una parte es entera y la otra sigue siendo raíz.`,
        porque: `$${b}^{${q}+${frac(r, k1)}}=${b}^{${q}}\\cdot ${b}^{${frac(r, k1)}}$, y $${b}^{${frac(r, k1)}}=${radical}$.`,
      });
      if (numerica) {
        const coef = pot(base as number, q);
        estados.push([
          { id: "co", tex: `${coef}` },
          { id: "pt", tex: "\\cdot", op: true },
          { id: "pr", tex: radical },
        ]);
        trans.push({
          fusiones: [{ desde: ["pb", "pq"], hacia: "co" }],
          texto: `Calculamos la parte entera: $${b}^{${q}}=${coef}$.`,
          porque: `El exponente dice cuántas veces se multiplica la base por sí misma.`,
        });
        estados.push([{ id: "fin", tex: `${coef}${radical}` }]);
        trans.push({
          fusiones: [{ desde: ["co", "pt", "pr"], hacia: "fin" }],
          texto: `El $${coef}$ sale de la raíz y multiplica: $${raiz(k, `${valor}`)}=${coef}${radical}$.`,
          porque: `La raíz que queda no se puede resolver exacta, así que se deja escrita. Ese es el resultado simplificado.`,
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
  const valor = pot(a, n) * BigInt(c);
  const t: Ficha = { id: "t", tex: "\\cdot", op: true };
  const rc: Ficha = { id: "rc", tex: raiz(k, `${c}`) };
  const inner = raizGeneral(a, n, k, { extra: [t, rc], empezarEnQ: true });
  const v = pot(a, n / k);
  const finalDesde = [...inner.idsFinales, "t", "rc"];
  const resultado = `${v}${raiz(k, `${c}`)}`;

  const estados: Ficha[][] = [
    [{ id: "r0", tex: raiz(k, `${valor}`) }],
    [{ id: "q0", tex: raiz(k, `${potTex(String(a), n)}\\cdot ${c}`) }],
    ...inner.demo.estados,
    [{ id: "fin", tex: resultado }],
  ];
  const trans: Transicion[] = [
    {
      fusiones: [{ desde: ["r0"], hacia: "q0" }],
      texto: `Buscamos una potencia perfecta que divida a $${valor}$: $${valor}=${potTex(String(a), n)}\\cdot ${c}$.`,
      porque: `$${potTex(String(a), n)}$ tiene raíz de índice $${k}$ exacta. El $${c}$ no la tiene, así que se queda como está.`,
    },
    {
      fusiones: [{ desde: ["q0"], hacia: ["q", "t", "rc"] }],
      texto: `La raíz de un producto se separa en el producto de las raíces.`,
      porque: `$${raiz(k, "a\\cdot b")}=${raiz(k, "a")}\\cdot ${raiz(k, "b")}$, porque los dos factores se multiplican.`,
    },
    ...inner.demo.transiciones,
    {
      fusiones: [{ desde: finalDesde, hacia: "fin" }],
      texto: `El $${v}$ sale de la raíz y multiplica: $${raiz(k, `${valor}`)}=${resultado}$.`,
      porque: `$${raiz(k, `${c}`)}$ no se puede resolver exacta, porque $${c}$ no es una potencia perfecta de exponente $${k}$. Se deja escrita: ese es el resultado simplificado.`,
    },
  ];
  return {
    demo: { titulo: "", nota: "", intro: `Queremos simplificar $${raiz(k, `${valor}`)}$. El $${valor}$ no es una potencia perfecta, pero tiene una parte que sí lo es.`, estados, transiciones: trans },
    resumen: { ...inner.resumen, valor: Number(valor), v: Number(v), c },
  };
}
