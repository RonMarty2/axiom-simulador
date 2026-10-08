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
  // las listas son ESTADO (cada una nace del numerador o del denominador), de a una por paso
  const base = estados[estados.length - 1];
  const conPartes = !!base.find((f) => f.id === desde)?.frac;
  const origenN = conPartes ? `${desde}.n` : desde;
  const origenD = conPartes ? `${desde}.d` : desde;
  // Una lista larga no cabe en un celular (columna de 343 px) y KaTeX no parte
  // una ficha: si no entra en un renglon (medido: 34 caracteres caben, 36 se salen 1 px), el rotulo va
  // arriba y los numeros en renglones parejos de hasta 24 caracteres (sin un numero suelto al final).
  const enFilas = (xs: number[]) => {
    let filas: number[][] = [xs];
    for (let k = 2; k <= xs.length; k++) {
      const t = Math.ceil(xs.length / k);
      filas = Array.from({ length: Math.ceil(xs.length / t) }, (_, i) => xs.slice(i * t, i * t + t));
      if (filas.every((f) => f.join(", ").length + 1 <= 20)) break;
    }
    return filas;
  };
  const lista = (rotulo: string, xs: number[]) => {
    // el rotulo va normal y los datos en negrita, con un espacio mayor despues de los dos puntos
    const neg = (ys: number[]) => ys.map((y) => `\\mathbf{${y}}`).join(",\\ ");
    if (`${rotulo} ${xs.join(", ")}`.length <= 26) return `\\scriptsize\\text{${rotulo}}\\ \\ ${neg(xs)}`;
    const filas = enFilas(xs);
    const renglones = filas.map((f, i) => `\\scriptsize ${neg(f)}${i < filas.length - 1 ? "," : ""}`);
    return `\\begin{array}{l}\\scriptsize\\text{${rotulo}}\\\\ ${renglones.join("\\\\ ")}\\end{array}`;
  };
  // en la explicacion, una lista larga va en varias formulas $...$ para que MathText pueda partir el renglon
  const enTexto = (xs: number[]) => {
    if (xs.join(", ").length <= 34) return `$${xs.join(",\\ ")}$`;
    const filas = enFilas(xs);
    return filas.map((f, i) => `$${f.join(",\\ ")}${i < filas.length - 1 ? "," : ""}$`).join(" ");
  };
  const Sa: Ficha = { id: "Sa", tex: "", salto: true };
  const Sb: Ficha = { id: "Sb", tex: "", salto: true };
  const Dn: Ficha = { id: "Dn", tex: lista(`Divisores de ${Math.abs(n)}:`, dn) };
  const Dd: Ficha = { id: "Dd", tex: lista(`Divisores de ${d}:`, dd2) };
  const Dc: Ficha = { id: "Dc", tex: lista("En las dos listas:", comunes) };
  const Dg: Ficha = { id: "Dg", tex: `\\scriptsize\\text{El mayor:}\\ \\ \\mathbf{${g}}` };
  estados.push([...base, Sa, Dn]);
  trans.push({
    fusiones: [],
    brotes: [
      { desde: origenN, hacia: "Sa" },
      { desde: origenN, hacia: "Dn" },
    ],
    texto: `Para simplificar necesitamos un número que divida al de arriba y al de abajo. Divisores de $${Math.abs(n)}$: ${enTexto(dn)}.`,
    porque: `Un divisor es un número que entra exacto en otro. Los escribimos todos, empezando por los del numerador.`,
  });
  estados.push([...base, Sa, Dn, Sb, Dd]);
  trans.push({
    fusiones: [],
    brotes: [
      { desde: origenD, hacia: "Sb" },
      { desde: origenD, hacia: "Dd" },
    ],
    texto: `Ahora lo mismo con el denominador. Divisores de $${d}$: ${enTexto(dd2)}.`,
    porque: `Hacemos la misma lista para el denominador.`,
  });
  estados.push([...base, Sa, Dc]);
  trans.push({
    fusiones: [{ desde: ["Dn", "Sb", "Dd"], hacia: "Dc" }],
    texto: `Los que están en las dos listas: ${enTexto(comunes)}.`,
    porque: `Un número que está en las dos listas divide al de arriba y al de abajo a la vez.`,
  });
  estados.push([...base, Sa, Dg]);
  trans.push({
    fusiones: [{ desde: ["Dc"], hacia: "Dg" }],
    texto: `Tomamos el mayor: $${g}$.`,
    porque: `Con el mayor se simplifica todo de una vez; se llama máximo común divisor.`,
  });

  estados.push([...antes, { id: "hf", tex: `${signo}\\dfrac{${nn}\\cdot ${g}}{${factDen}}` }]);
  trans.push({
    fusiones: [{ desde: [desde, "Sa", "Dg"], hacia: "hf" }],
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
    texto:
      dd === 1
        ? `El $${g}$ de arriba y el $${g}$ de abajo se tachan. Abajo queda $1$ y un número entre $1$ es él mismo: queda $${resultado}$.`
        : `El $${g}$ de arriba y el $${g}$ de abajo se tachan. Queda $${resultado}$.`,
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
      texto: `El $${a}$ multiplica a $x$. Pasa al otro lado dividiendo: viaja hasta debajo del $${n}$ y queda $x=\\dfrac{${n}}{${a}}$.`,
      porque: `Lo que multiplicaba pasa dividiendo: ahora es el denominador. Es lo mismo que dividir los dos lados entre $${a}$. La fracción es una división: $${n}$ entre $${a}$.`,
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

  {
    // comprobacion contra el enunciado ORIGINAL, una operacion por paso; x puede ser entero o fraccion (p/q ya simplificada)
    const pp = n / g;
    const qq = a / g;
    const ultimo = estados[estados.length - 1];
    const idX = ultimo.some((f) => f.id === "r") ? "r" : "fr";
    // se escribe igual que se ve en la hoja: la fraccion irreducible lleva el signo en el numerador
    const xTex = qq === 1 ? `${pp}` : idX === "fr" ? `\\dfrac{${pp}}{${qq}}` : fracTex(pp, qq);
    const vTex = pp < 0 ? `(${xTex})` : xTex;
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
    estados.push([...ultimo, S, Ca, { id: "Cr", tex: `\\cdot ${vTex}`, pegado: true }, Cb, Ce, Cc]);
    trans.push({
      fusiones: [{ desde: ["Cx"], hacia: "Cr" }],
      brotes: [{ desde: idX, hacia: "Cr" }],
      texto: `Reemplazamos $x$ por su valor, $${xTex}$.`,
      porque: `Donde la ecuación dice $x$ escribimos el número que encontramos.`,
    });
    if (qq === 1) {
      estados.push([...ultimo, S, { id: "Cp", tex: `${n}` }, Cb, Ce, Cc]);
      trans.push({
        fusiones: [{ desde: ["Ca", "Cr"], hacia: "Cp" }],
        texto: `Primero la multiplicación: $${a}\\cdot ${vTex}=${n}$.`,
        porque: `En una expresión, la multiplicación se hace antes que la suma.`,
      });
    } else {
      // x fraccionaria: el a viaja al numerador, se multiplica arriba y se divide (una operacion por paso)
      const Cm = fr("Cm", `${pp < 0 ? "-" : ""}${a}\\cdot ${Math.abs(pp)}`, `${qq}`);
      estados.push([...ultimo, S, Cm, Cb, Ce, Cc]);
      trans.push({
        fusiones: [{ desde: ["Ca", "Cr"], hacia: "Cm", modo: "viajar" }],
        brotes: [
          { desde: "Ca", hacia: "Cm.n" },
          { desde: "Cr", hacia: "Cm.d" },
        ],
        texto: `Primero la multiplicación: $${a}\\cdot ${vTex}$. El $${a}$ viaja al numerador de la fracción y el denominador $${qq}$ se queda: queda $\\dfrac{${pp < 0 ? "-" : ""}${a}\\cdot ${Math.abs(pp)}}{${qq}}$.`,
        porque: `En una expresión, la multiplicación se hace antes que la suma. Un número por una fracción es el número por el numerador, sobre el mismo denominador.`,
        regla: `$a\\cdot\\dfrac{b}{c}=\\dfrac{a\\cdot b}{c}$`,
      });
      estados.push([...ultimo, S, fr("Cm2", `${a * pp}`, `${qq}`), Cb, Ce, Cc]);
      trans.push({
        fusiones: [{ desde: ["Cm"], hacia: "Cm2" }],
        texto: `Hacemos la cuenta de arriba: $${a}\\cdot ${pp < 0 ? `(${pp})` : pp}=${a * pp}$. Queda $\\dfrac{${a * pp}}{${qq}}$.`,
        porque: `Solo se multiplica el numerador: el denominador no cambia.`,
      });
      estados.push([...ultimo, S, { id: "Cp", tex: `${n}` }, Cb, Ce, Cc]);
      trans.push({
        fusiones: [{ desde: ["Cm2"], hacia: "Cp" }],
        texto: `Dividimos: $\\dfrac{${a * pp}}{${qq}}=${n}$.`,
        porque: `La división sale exacta, y se comprueba multiplicando: $${qq}\\cdot ${n < 0 ? `(${n})` : n}=${a * pp}$. Una fracción es una división: el numerador entre el denominador.`,
      });
    }
    estados.push([...ultimo, S, { id: "Cs", tex: `${c}` }, Ce, Cc]);
    trans.push({
      fusiones: [{ desde: ["Cp", "Cb"], hacia: "Cs" }],
      texto: `Ahora la suma: $${n}${conSigno(b)}=${c}$.`,
      porque: `Con la multiplicación hecha, solo queda sumar.`,
    });
    estados.push([...ultimo, S, { id: "ok", tex: `${c}=${c}\\ \\checkmark` }]);
    trans.push({
      fusiones: [{ desde: ["Cs", "Ce", "Cc"], hacia: "ok" }],
      texto: `Los dos lados valen $${c}$: la igualdad se cumple. Entonces $x=${xTex}$ es solución de $${a}x${conSigno(b)}=${c}$.`,
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
    fusiones: [
      { desde: [`${x2}.d`], hacia: null, ancla: `${x1}.d` },
      // el numerador de la segunda fraccion VIAJA (mismo lugar de salida, nueva ficha w2): no desaparece y reaparece
      { desde: [`${x2}.n`], hacia: "w2", modo: "viajar" },
    ],
    brotes: [{ desde: `${x2}.n`, hacia: "w2" }],
    texto: `El $${den}$ de la segunda fracción se une al $${den}$ de la primera: se escribe una sola vez. El numerador de la segunda, $${nx2}$, viaja al lado de la primera fracción.`,
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
  // solo se calcula: el numerador queda con su signo (si es negativo, el paso del signo es el siguiente)
  estados.push([{ id: "h", tex: `\\dfrac{${sumaN}}{${den}}` }]);
  trans.push({
    fusiones: [{ desde: ["h0"], hacia: "h" }],
    texto: `${palabra} los numeradores: $${cuenta}=${sumaN}$. El $${den}$ se queda.`,
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
    simplificar(estados, trans, [], "h", sumaN, den, g);
    if (den / g === 1) trans[trans.length - 1].porque += ` La fracción sale exacta: es un número entero.`;
  } else {
    trans[trans.length - 1].porque += ` Esta fracción ya no se puede simplificar.`;
  }

  const rn = sumaN / g;
  const rd = den / g;

  // FILA DE REFERENCIA: el enunciado se anota abajo desde el primer paso y se queda hasta el final,
  // asi la comprobacion nace de ahi y no de numeros que ya no estan en pantalla
  const SR: Ficha = { id: "SR", tex: "", salto: true };
  const cola: Ficha[] = [SR, fr("R1", `${n1}`, `${d1}`), { id: "Rp", tex: op, op: true }, fr("R2", `${n2}`, `${d2}`)];
  const final: Ficha[][] = [estados[0], ...estados.map((e) => [...e, ...cola])];
  const trs: Transicion[] = [
    {
      fusiones: [],
      brotes: [
        { desde: "p", hacia: "SR" },
        { desde: "f1", hacia: "R1" },
        { desde: "p", hacia: "Rp" },
        { desde: "f2", hacia: "R2" },
      ],
      texto: `Antes de empezar, anotamos el ejercicio debajo, tal como viene: lo vamos a necesitar para comprobar al final.`,
      porque: `Mientras trabajamos, las fracciones de arriba van a cambiar. Con el ejercicio escrito abajo podemos volver a él cuando queramos.`,
    },
    ...trans,
  ];

  // COMPROBACION: se multiplica todo por el denominador comun D y deben salir enteros iguales a los dos lados
  {
    const D = den;
    const resId = estados[estados.length - 1][0].id;
    const base = estados[estados.length - 1];
    const v1 = (n1 * D) / d1;
    const v2 = (n2 * D) / d2;
    const v3 = (rn * D) / rd;
    const s = resta ? v1 - v2 : v1 + v2;
    // la respuesta se escribe como se ve en la hoja: el signo menos delante de la fraccion
    const rTex = rd === 1 ? `${rn}\\cdot ${D}` : rn < 0 ? `(-\\dfrac{${-rn}}{${rd}})\\cdot ${D}` : `\\dfrac{${rn}}{${rd}}\\cdot ${D}`;
    const SC: Ficha = { id: "SC", tex: "", salto: true };
    const Kp: Ficha = { id: "Kp", tex: op, op: true };
    const Ke: Ficha = { id: "Ke", tex: "=", op: true };
    const base0 = [...base, ...cola];
    const fila = (...fs: Ficha[]) => final.push([...base0, SC, ...fs]);
    fila({ id: "Ka", tex: `\\dfrac{${n1}}{${d1}}\\cdot ${D}` }, Kp, { id: "Kb", tex: `\\dfrac{${n2}}{${d2}}\\cdot ${D}` }, Ke, { id: "Kc", tex: rTex });
    trs.push({
      fusiones: [],
      brotes: [
        { desde: "Rp", hacia: "SC" },
        { desde: "R1", hacia: "Ka" },
        { desde: "Rp", hacia: "Kp" },
        { desde: "R2", hacia: "Kb" },
        { desde: "Rp", hacia: "Ke" },
        { desde: resId, hacia: "Kc" },
      ],
      texto: `Comprobamos: ${resta ? "la resta" : "la suma"} del ejercicio tiene que ser igual a la respuesta. Para quitar los denominadores multiplicamos cada término por $${D}$, el denominador común: a la izquierda las dos fracciones del ejercicio, y a la derecha la respuesta.`,
      porque: `Si dos números son iguales, siguen siendo iguales al multiplicarlos por lo mismo. Multiplicar por $${D}$ deja números enteros, que son más fáciles de comparar.`,
      regla: `$a=b\\ \\Rightarrow\\ a\\cdot c=b\\cdot c$`,
    });
    // el factor entra al numerador (la fraccion por un entero)
    fila(fr("Ka2", `${n1}\\cdot ${D}`, `${d1}`), Kp, fr("Kb2", `${n2}\\cdot ${D}`, `${d2}`), Ke, rd === 1 ? { id: "Kc", tex: rTex } : fr("Kc2", `${rn}\\cdot ${D}`, `${rd}`));
    trs.push({
      fusiones: [
        { desde: ["Ka"], hacia: "Ka2" },
        { desde: ["Kb"], hacia: "Kb2" },
        ...(rd === 1 ? [] : [{ desde: ["Kc"], hacia: "Kc2" }]),
      ],
      texto: `Multiplicar una fracción por $${D}$ es multiplicar solo su numerador: el $${D}$ pasa arriba.`,
      porque: `Una fracción por un número entero: el entero multiplica al numerador y el denominador se queda igual.`,
      regla: `$\\dfrac{a}{b}\\cdot c=\\dfrac{a\\cdot c}{b}$`,
    });
    // se hace la multiplicacion de arriba
    const Kc3: Ficha = rd === 1 ? { id: "Kv3", tex: `${v3}` } : fr("Kc3", `${rn * D}`, `${rd}`);
    fila(fr("Ka3", `${n1 * D}`, `${d1}`), Kp, fr("Kb3", `${n2 * D}`, `${d2}`), Ke, Kc3);
    trs.push({
      fusiones: [
        { desde: ["Ka2"], hacia: "Ka3" },
        { desde: ["Kb2"], hacia: "Kb3" },
        { desde: [rd === 1 ? "Kc" : "Kc2"], hacia: Kc3.id },
      ],
      texto: `Hacemos las multiplicaciones de arriba: $${n1}\\cdot ${D}=${n1 * D}$, $${n2}\\cdot ${D}=${n2 * D}$ y $${rn}\\cdot ${D}=${rn * D}$.`,
      porque: `Cada fracción queda con su numerador calculado; los denominadores no cambian.`,
    });
    // se divide
    fila({ id: "Kv1", tex: `${v1}` }, Kp, { id: "Kv2", tex: `${v2}` }, Ke, { id: "Kv3", tex: `${v3}` });
    trs.push({
      fusiones: [
        { desde: ["Ka3"], hacia: "Kv1" },
        { desde: ["Kb3"], hacia: "Kv2" },
        ...(rd === 1 ? [] : [{ desde: ["Kc3"], hacia: "Kv3" }]),
      ],
      texto: `Ahora las divisiones, que salen exactas: $\\dfrac{${n1 * D}}{${d1}}=${v1}$, $\\dfrac{${n2 * D}}{${d2}}=${v2}$${rd === 1 ? "" : ` y $\\dfrac{${rn * D}}{${rd}}=${v3}$`}.`,
      porque: `El denominador común $${D}$ se puede repartir exacto entre cada denominador, por eso quedan números enteros.`,
    });
    // la suma o resta de la izquierda
    fila({ id: "Ks", tex: `${s}` }, Ke, { id: "Kv3", tex: `${v3}` });
    trs.push({
      fusiones: [{ desde: ["Kv1", "Kp", "Kv2"], hacia: "Ks" }],
      texto: `${resta ? "Restamos" : "Sumamos"} a la izquierda: $${v1}${op}${v2 < 0 ? `(${v2})` : v2}=${s}$.`,
      porque: `Es la misma cuenta que hicimos con la fracción, pero con números enteros.`,
    });
    // se comparan los dos lados
    final.push([...base0, SC, { id: "ok", tex: `${s}=${v3}\\ \\checkmark` }]);
    trs.push({
      fusiones: [{ desde: ["Ks", "Ke", "Kv3"], hacia: "ok" }],
      texto: `A la izquierda queda $${s}$ y a la derecha $${v3}$: son iguales. La respuesta es correcta.`,
      porque: `Si multiplicar por $${D}$ deja los dos lados iguales, los dos lados eran iguales desde antes.`,
    });
  }

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos calcular $\\dfrac{${n1}}{${d1}}${op}\\dfrac{${n2}}{${d2}}$.${iguales ? " Los denominadores son iguales." : " Los denominadores son distintos."}`,
      estados: final,
      transiciones: trs,
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
  const kk = `${k}`;
  // FILA DE REFERENCIA: el ejercicio se anota abajo en el primer paso y se queda hasta el final,
  // asi la comprobacion nace de ahi y no de numeros que ya no estan en pantalla
  const SR: Ficha = { id: "SR", tex: "", salto: true };
  const ref: Ficha = { id: "ref", tex: `x^{2}-${q}=0` };
  const cola: Ficha[] = [SR, ref];

  const igual: Ficha[] = [
    { id: "eq1", tex: "=", op: true },
    { id: "z1", tex: "0" },
  ];
  const base: Ficha[] = [
    { id: "a", tex: "x^2" },
    { id: "m", tex: "-", op: true },
  ];
  // las etiquetas (a = x, b = k) se escriben DEBAJO de cada pieza, de a una
  const aEt: Ficha = { id: "a", tex: "x^2", debajo: "a=x" };
  const bEt: Ficha = { id: "n3", tex: `${k}^2`, debajo: `b=${k}` };
  const baseEt: Ficha[] = [aEt, { id: "m", tex: "-", op: true }];
  const Sf: Ficha = { id: "S", tex: "", salto: true };
  // la formula en PIEZAS sueltas, una por cada lugar donde aparece cada letra (tres lugares la a, tres la b):
  // asi cada valor puede VOLAR desde su etiqueta hasta su lugar
  const formula = (aListo: boolean, bListo: boolean): Ficha[] => [
    Sf,
    aListo ? { id: "Fax", tex: "x" } : { id: "Fa", tex: "a" },
    { id: "Fa2", tex: "2", sup: true },
    { id: "Fm", tex: "-", op: true },
    bListo ? { id: "Fbk", tex: kk } : { id: "Fb", tex: "b" },
    { id: "Fb2", tex: "2", sup: true },
    { id: "Fe", tex: "=", op: true },
    { id: "fo1", tex: "(" },
    aListo ? { id: "x1", tex: "x", pegado: true } : { id: "ra1", tex: "a", pegado: true },
    { id: "fs1", tex: "-", op: true, pegado: true },
    bListo ? { id: "k1", tex: kk, pegado: true } : { id: "rb1", tex: "b", pegado: true },
    { id: "fc1", tex: ")", pegado: true },
    { id: "fo2", tex: "(" },
    aListo ? { id: "x2", tex: "x", pegado: true } : { id: "ra2", tex: "a", pegado: true },
    { id: "fs2", tex: "+", op: true, pegado: true },
    bListo ? { id: "k2", tex: kk, pegado: true } : { id: "rb2", tex: "b", pegado: true },
    { id: "fc2", tex: ")", pegado: true },
  ];
  // comprobacion de la formula con estos numeros: se multiplican los parentesis
  const SE: Ficha = { id: "SE", tex: "", salto: true };
  const e1: Ficha = { id: "e1", tex: "x^{2}" };
  const e2: Ficha = { id: "e2", tex: `+${k}x` };
  const e3: Ficha = { id: "e3", tex: `-${k}x` };
  const e4: Ficha = { id: "e4", tex: `-${k}^{2}` };
  // los productos antes de calcularlos (el signo de cada termino va dentro)
  const p1: Ficha = { id: "p1", tex: "x\\cdot x" };
  const o1: Ficha = { id: "o1", tex: "+", op: true };
  const p2: Ficha = { id: "p2", tex: `x\\cdot ${k}` };
  const p3: Ficha = { id: "p3", tex: `-${k}\\cdot x` };
  const p4: Ficha = { id: "p4", tex: `-${k}\\cdot ${k}` };
  // la ecuacion con los dos factores (sus piezas ya vienen de la formula)
  const factor1: Ficha[] = [
    { id: "fo1", tex: "(" },
    { id: "x1", tex: "x", pegado: true },
    { id: "fs1", tex: "-", op: true, pegado: true },
    { id: "k1", tex: kk, pegado: true },
    { id: "fc1", tex: ")", pegado: true },
  ];
  const factor2: Ficha[] = [
    { id: "fo2", tex: "(" },
    { id: "x2", tex: "x", pegado: true },
    { id: "fs2", tex: "+", op: true, pegado: true },
    { id: "k2", tex: kk, pegado: true },
    { id: "fc2", tex: ")", pegado: true },
  ];
  const fila2: Ficha[] = [
    { id: "eq2", tex: "=", op: true },
    { id: "z2", tex: "0" },
  ];
  const o: Ficha = { id: "or", tex: "\\text{ ó }", op: true };

  const estados: Ficha[][] = [
    // 0
    [...base, { id: "n", tex: `${q}` }, ...igual],
    // 1: 9 = 3 por 3
    [...base, { id: "nn", tex: `${k}\\cdot ${k}` }, ...igual],
    // 2: 3 por 3 = 3 al cuadrado
    [...base, { id: "n3", tex: `${k}^2` }, ...igual],
    // 3: se reconoce el patron (resaltar)
    [...base, { id: "n3", tex: `${k}^2` }, ...igual],
    // 4: se nombra la a, debajo de x^2
    [...baseEt, { id: "n3", tex: `${k}^2` }, ...igual],
    // 5: se nombra la b, debajo de k^2
    [...baseEt, bEt, ...igual],
    // 6: la formula general aparece debajo (con letras)
    [...baseEt, bEt, ...igual, ...formula(false, false)],
    // 7: la a se reemplaza por x en sus tres lugares: vuela desde su etiqueta
    [...baseEt, bEt, ...igual, ...formula(true, false)],
    // 8: la b se reemplaza por k en sus tres lugares
    [...baseEt, bEt, ...igual, ...formula(true, true)],
    // 9: se multiplican los parentesis, "como a lapiz": primero el x del primer parentesis por cada termino del segundo
    [...baseEt, bEt, ...igual, ...formula(true, true), SE, p1, o1, p2],
    // 10: se calculan esos dos productos
    [...baseEt, bEt, ...igual, ...formula(true, true), SE, e1, e2],
    // 11: ahora el -k del primer parentesis por cada termino del segundo
    [...baseEt, bEt, ...igual, ...formula(true, true), SE, e1, e2, p3, p4],
    // 12: se calculan los otros dos productos
    [...baseEt, bEt, ...igual, ...formula(true, true), SE, e1, e2, e3, e4],
    // 10: kx y -kx se cancelan
    [...baseEt, bEt, ...igual, ...formula(true, true), SE, e1, e4],
    // 11: queda x^2 - k^2, igual que el lado izquierdo (se marca)
    [...baseEt, bEt, ...igual, ...formula(true, true), SE, e1, e4],
    // 12: los dos parentesis suben a la ecuacion, en lugar de x^2 - k^2
    [...factor1, ...factor2, ...igual],
    // 13: un producto igual a cero (se marca)
    [...factor1, ...factor2, ...igual],
    // 14: un factor por ecuacion, todavia con parentesis
    [...factor1, ...igual, o, ...factor2, ...fila2],
    // 15: los parentesis solo agrupaban: se quitan y el signo se junta con el numero
    [
      { id: "x1", tex: "x" },
      { id: "m1", tex: `-${k}` },
      ...igual,
      o,
      { id: "x2", tex: "x" },
      { id: "m2", tex: `+${k}` },
      ...fila2,
    ],
    // 16: primero se ARRASTRA el -k de la primera ecuacion y cambia de signo
    [
      { id: "x1", tex: "x" },
      ...igual,
      { id: "m1", tex: `+${k}` },
      o,
      { id: "x2", tex: "x" },
      { id: "m2", tex: `+${k}` },
      ...fila2,
    ],
    // 17: despues el +k de la segunda
    [
      { id: "x1", tex: "x" },
      ...igual,
      { id: "m1", tex: `+${k}` },
      o,
      { id: "x2", tex: "x" },
      ...fila2,
      { id: "m2", tex: `-${k}` },
    ],
    // 18: soluciones
    [
      { id: "x1", tex: "x" },
      { id: "eq1", tex: "=", op: true },
      { id: "r1", tex: `${k}` },
      o,
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
      texto: `Reconocemos el patrón: una resta de dos cuadrados, $x^{2}-${k}^{2}$. Es de la forma $a^{2}-b^{2}$.`,
      porque: `Es una resta de dos cuadrados. Esa forma se llama diferencia de cuadrados y siempre se factoriza igual.`,
    },
    {
      fusiones: [],
      resaltar: ["a"],
      texto: `El primer cuadrado es $x^{2}$: aquí $a=x$. Lo anotamos debajo.`,
      porque: `En la fórmula, $a$ es lo que está elevado al cuadrado en el primer término.`,
    },
    {
      fusiones: [],
      resaltar: ["n3"],
      texto: `El segundo cuadrado es $${k}^{2}$: aquí $b=${k}$. Lo anotamos debajo.`,
      porque: `En la fórmula, $b$ es lo que está elevado al cuadrado en el segundo término.`,
    },
    {
      fusiones: [],
      brotes: formula(false, false).map((f) => ({ desde: "eq1", hacia: f.id })),
      texto: `Escribimos debajo la fórmula de la diferencia de cuadrados: $a^{2}-b^{2}=(a-b)(a+b)$.`,
      porque: `Es una fórmula que vale para cualquier $a$ y cualquier $b$. Con ella una resta de cuadrados se convierte en un producto.`,
      regla: `$a^{2}-b^{2}=(a-b)(a+b)$`,
    },
    {
      // la a VUELA desde su etiqueta a los tres lugares donde aparece
      fusiones: [{ desde: ["Fa", "ra1", "ra2"], hacia: ["Fax", "x1", "x2"], modo: "viajar" }],
      brotes: ["Fax", "x1", "x2"].map((hacia) => ({ desde: "a", hacia })),
      texto: `Reemplazamos primero la $a$: vale $x$. El $x$ sale de su etiqueta y va a los tres lugares donde la fórmula dice $a$.`,
      porque: `La $a$ aparece en tres lugares de la fórmula: en $a^{2}$ y en cada uno de los dos paréntesis. Se cambia en los tres.`,
    },
    {
      // la b VUELA desde su etiqueta a los tres lugares donde aparece
      fusiones: [{ desde: ["Fb", "rb1", "rb2"], hacia: ["Fbk", "k1", "k2"], modo: "viajar" }],
      brotes: ["Fbk", "k1", "k2"].map((hacia) => ({ desde: "n3", hacia })),
      texto: `Ahora la $b$: vale $${k}$. El $${k}$ sale de su etiqueta y va a los tres lugares donde la fórmula dice $b$. Queda $x^{2}-${k}^{2}=(x-${k})(x+${k})$.`,
      porque: `Igual que la $a$, la $b$ aparece en tres lugares: en $b^{2}$ y en los dos paréntesis. Se cambia en los tres.`,
    },
    {
      // primero el x del primer parentesis por cada termino del segundo
      fusiones: [],
      // el x del primer parentesis VIAJA al x y al numero del segundo: se ve con quien se multiplica
      visitas: [{ desde: "x1", hacia: ["x2", "k2"] }],
      brotes: [
        { desde: "Fe", hacia: "SE" },
        { desde: "x1", hacia: "p1" },
        { desde: "x2", hacia: "o1" },
        { desde: "x1", hacia: "p2" },
      ],
      texto: `Comprobamos que la fórmula es cierta con estos números: multiplicamos los paréntesis. Primero el $x$ del primer paréntesis viaja a cada término del segundo: se multiplica con el $x$ y con el $${k}$. Salen $x\\cdot x$ y $x\\cdot ${k}$.`,
      porque: `Para multiplicar dos paréntesis, cada término de uno se multiplica por cada término del otro. Empezamos con el primer término del primero.`,
      regla: `$(a+b)(c+d)=ac+ad+bc+bd$`,
    },
    {
      fusiones: [
        { desde: ["p1"], hacia: "e1" },
        { desde: ["o1", "p2"], hacia: "e2" },
      ],
      texto: `Calculamos: $x\\cdot x=x^{2}$ y $x\\cdot ${k}=${k}x$.`,
      porque: `Un número por sí mismo es ese número al cuadrado, y el número y la letra se escriben juntos.`,
    },
    {
      // ahora el -k del primer parentesis por cada termino del segundo
      fusiones: [],
      // el -k (con su signo) viaja al x y al numero del segundo parentesis
      visitas: [{ desde: "k1", hacia: ["x2", "k2"], etiqueta: `-${k}` }],
      brotes: [
        { desde: "k1", hacia: "p3" },
        { desde: "k1", hacia: "p4" },
      ],
      texto: `Ahora el $-${k}$ del primer paréntesis viaja a cada término del segundo: se multiplica con el $x$ y con el $${k}$. Salen $-${k}\\cdot x$ y $-${k}\\cdot ${k}$.`,
      porque: `Seguimos con el segundo término del primer paréntesis, que es $-${k}$: lleva su signo menos.`,
    },
    {
      fusiones: [
        { desde: ["p3"], hacia: "e3" },
        { desde: ["p4"], hacia: "e4" },
      ],
      texto: `Calculamos: $-${k}\\cdot x=-${k}x$ y $-${k}\\cdot ${k}=-${k}^{2}$.`,
      porque: `Un número negativo por uno positivo da negativo. Y $${k}\\cdot ${k}$ es $${k}$ al cuadrado.`,
    },
    {
      fusiones: [{ desde: ["e2", "e3"], hacia: null, modo: "tachar" }],
      texto: `Los términos $+${k}x$ y $-${k}x$ son opuestos: se cancelan.`,
      porque: `Un número más su opuesto da $0$: $${k}x-${k}x=0$.`,
      regla: `$a+(-a)=0$`,
    },
    {
      fusiones: [],
      resaltar: ["e1", "e4", "Fax", "Fbk"],
      texto: `Queda $x^{2}-${k}^{2}=x^{2}-${q}$: justo lo que tenía la ecuación. La fórmula se cumple.`,
      porque: `Multiplicar los paréntesis devuelve la resta de cuadrados, así que podemos usar el producto en lugar de la resta.`,
    },
    {
      // los dos parentesis de la formula VIAJAN a la ecuacion (mismas piezas); lo de la izquierda y el resto de la formula se van
      fusiones: [{ desde: ["a", "m", "n3", "S", "Fax", "Fa2", "Fm", "Fbk", "Fb2", "Fe", "SE", "e1", "e4"], hacia: null }],
      texto: `La fórmula dice que $x^{2}-${k}^{2}$ es igual a $(x-${k})(x+${k})$. Subimos los dos paréntesis a la ecuación, en lugar de $x^{2}-${k}^{2}$.`,
      porque: `La fórmula dice que son iguales, así que podemos escribir uno en lugar del otro sin cambiar la ecuación.`,
    },
    {
      fusiones: [],
      resaltar: ["fo1", "fc1", "fo2", "fc2"],
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
        { desde: ["fo1", "fc1"], hacia: null },
        { desde: ["fs1", "k1"], hacia: "m1" },
        { desde: ["fo2", "fc2"], hacia: null },
        { desde: ["fs2", "k2"], hacia: "m2" },
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

  // el ejercicio se anota abajo desde el primer paso
  const final: Ficha[][] = [estados[0], ...estados.map((e) => [...e, ...cola])];
  const trs: Transicion[] = [
    {
      fusiones: [],
      brotes: [
        { desde: "eq1", hacia: "SR" },
        { desde: "eq1", hacia: "ref" },
      ],
      texto: `Antes de empezar, anotamos el ejercicio debajo, tal como viene: lo vamos a necesitar para comprobar las soluciones al final.`,
      porque: `Mientras trabajamos, la ecuación de arriba va a cambiar. Con el ejercicio escrito abajo podemos volver a él cuando queramos.`,
    },
    ...trans,
  ];

  // COMPROBACION de las dos soluciones contra el ejercicio ORIGINAL (la fila de referencia), una operacion por paso
  {
    const fin = estados[estados.length - 1];
    const Sc = (n: number): Ficha => ({ id: `SC${n}`, tex: "", salto: true });
    const fil = (n: number, ...fs: Ficha[]): Ficha[] => [Sc(n), ...fs];
    const par = (n: number, tex: string, id: string): Ficha[] => [
      { id: `${id}${n}`, tex },
      { id: `B${n}`, tex: "-", op: true },
      { id: `C${n}`, tex: `${q}` },
      { id: `D${n}`, tex: "=", op: true },
      { id: `Z${n}`, tex: "0" },
    ];
    const antes = [...fin, ...cola];
    final.push([...antes, ...fil(1, ...par(1, `${k}^{2}`, "A")), ...fil(2, ...par(2, `(-${k})^{2}`, "A"))]);
    trs.push({
      fusiones: [],
      brotes: [1, 2].flatMap((n) => [
        { desde: "ref", hacia: `SC${n}` },
        { desde: n === 1 ? "r1" : "r2", hacia: `A${n}` },
        { desde: "ref", hacia: `B${n}` },
        { desde: "ref", hacia: `C${n}` },
        { desde: "ref", hacia: `D${n}` },
        { desde: "ref", hacia: `Z${n}` },
      ]),
      texto: `Comprobamos las dos soluciones en el ejercicio original. Volvemos a escribirlo dos veces, y en cada una reemplazamos $x$ por su valor: $${k}$ en la primera y $-${k}$ en la segunda.`,
      porque: `Una solución es buena si, al ponerla en lugar de $x$ en la ecuación original, la igualdad se cumple.`,
    });
    final.push([
      ...antes,
      ...fil(1, { id: "P1", tex: `${q}` }, ...par(1, "", "A").slice(1)),
      ...fil(2, { id: "P2", tex: `${q}` }, ...par(2, "", "A").slice(1)),
    ]);
    trs.push({
      fusiones: [
        { desde: ["A1"], hacia: "P1" },
        { desde: ["A2"], hacia: "P2" },
      ],
      texto: `Primero la potencia: $${k}^{2}=${q}$ y $(-${k})^{2}=${q}$.`,
      porque: `Elevar al cuadrado es multiplicar el número por sí mismo. En la segunda, $(-${k})\\cdot(-${k})=${q}$ porque menos por menos da más.`,
      regla: `$(-a)\\cdot(-a)=a^{2}$`,
    });
    final.push([
      ...antes,
      ...fil(1, { id: "Q1", tex: "0" }, ...par(1, "", "A").slice(3)),
      ...fil(2, { id: "Q2", tex: "0" }, ...par(2, "", "A").slice(3)),
    ]);
    trs.push({
      fusiones: [
        { desde: ["P1", "B1", "C1"], hacia: "Q1" },
        { desde: ["P2", "B2", "C2"], hacia: "Q2" },
      ],
      texto: `Ahora la resta: $${q}-${q}=0$ en las dos.`,
      porque: `Un número menos él mismo da $0$.`,
      regla: `$a-a=0$`,
    });
    final.push([
      ...antes,
      ...fil(1, { id: "ok1", tex: "0=0\\ \\checkmark" }),
      ...fil(2, { id: "ok2", tex: "0=0\\ \\checkmark" }),
    ]);
    trs.push({
      fusiones: [
        { desde: ["Q1", "D1", "Z1"], hacia: "ok1" },
        { desde: ["Q2", "D2", "Z2"], hacia: "ok2" },
      ],
      texto: `Los dos lados valen $0$ en las dos filas: la igualdad se cumple. Entonces $x=${k}$ y $x=-${k}$ son soluciones de $x^{2}-${q}=0$.`,
      porque: `Si al reemplazar $x$ los dos lados dan lo mismo, la solución es correcta.`,
    });
  }

  return {
    demo: { titulo: "", nota: "", intro: `Queremos resolver $x^{2}-${q}=0$.`, estados: final, transiciones: trs },
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
 * Fila de referencia de los logaritmos: el ejercicio (log_b(m) + log_b(n)) se anota abajo en el primer paso y se queda
 * hasta el final. La comprobacion nace de esa fila, no de numeros que ya no estan en pantalla.
 */
function conReferencia(estados: Ficha[][], trans: Transicion[], b: number, m: number, n: number, origen: string) {
  const SR: Ficha = { id: "SR", tex: "", salto: true };
  const ref: Ficha = { id: "ref", tex: `\\log_{${b}}(${m})+\\log_{${b}}(${n})` };
  const cola = [SR, ref];
  const final: Ficha[][] = [estados[0], ...estados.map((e) => [...e, ...cola])];
  const trs: Transicion[] = [
    {
      fusiones: [],
      brotes: [
        { desde: origen, hacia: "SR" },
        { desde: origen, hacia: "ref" },
      ],
      texto: `Antes de empezar, anotamos el ejercicio debajo, tal como viene: lo vamos a necesitar para comprobar al final.`,
      porque: `Mientras trabajamos, el ejercicio de arriba va a cambiar. Con el ejercicio escrito abajo podemos volver a él cuando queramos.`,
    },
    ...trans,
  ];
  return { final, trs, cola };
}

/**
 * Comprobacion con la definicion, nacida de la fila de referencia: b^k tiene que ser m·n. Se desarrolla la potencia
 * (b·b·...·b) y se multiplica de a dos, una operacion por paso, hasta comparar con m·n.
 * `base` es lo que queda arriba (el resultado), `valorId` la ficha que tiene el valor k.
 */
function comprobarPotencia(
  final: Ficha[][],
  trs: Transicion[],
  base: Ficha[],
  cola: Ficha[],
  b: number,
  k: number,
  m: number,
  n: number,
  valorId: string
) {
  const P = m * n;
  const antes = [...base, ...cola];
  const SC: Ficha = { id: "SC", tex: "", salto: true };
  const ce: Ficha = { id: "ce", tex: "=", op: true };
  const cd: Ficha = { id: "cd", tex: "\\cdot", op: true };
  const cm: Ficha = { id: "cm", tex: `${m}` };
  const cn: Ficha = { id: "cn", tex: `${n}` };
  const wb: Ficha = { id: "wb", tex: `${b}` };
  const wk: Ficha = { id: "wk", tex: `${k}`, sup: true };
  const cP: Ficha = { id: "cP", tex: `${P}` };

  final.push([...antes, SC, wb, wk, ce, cm, cd, cn]);
  trs.push({
    fusiones: [],
    brotes: [
      { desde: "ref", hacia: "SC" },
      { desde: "ref", hacia: "wb" },
      { desde: valorId, hacia: "wk" },
      { desde: "ref", hacia: "ce" },
      { desde: "ref", hacia: "cm" },
      { desde: "ref", hacia: "cd" },
      { desde: "ref", hacia: "cn" },
    ],
    texto: `Comprobamos con la definición. Por la propiedad del producto, la suma de los dos logaritmos es el logaritmo de $${m}\\cdot ${n}$; si vale $${k}$, entonces $${b}^{${k}}$ tiene que ser $${m}\\cdot ${n}$. Lo escribimos debajo: la base $${b}$ y los números $${m}$ y $${n}$ salen del ejercicio anotado, y el $${k}$ es el resultado.`,
    porque: `Un logaritmo es un exponente: $\\log_{${b}}(a)=y$ significa $${b}^{y}=a$.`,
    regla: `$\\log_{${b}}(a)=y\\ \\iff\\ ${b}^{y}=a$`,
  });

  final.push([...antes, SC, wb, wk, ce, cP]);
  trs.push({
    fusiones: [{ desde: ["cm", "cd", "cn"], hacia: "cP" }],
    texto: `Hacemos la multiplicación: $${m}\\cdot ${n}=${P}$.`,
    porque: `A la derecha tiene que quedar un solo número para poder compararlo.`,
  });

  if (k === 1) {
    final.push([...antes, SC, { id: "wv", tex: `${b}` }, ce, cP]);
    trs.push({
      fusiones: [{ desde: ["wb", "wk"], hacia: "wv" }],
      texto: `Con exponente $1$: $${b}^{1}=${b}$.`,
      porque: `Un número elevado a $1$ es ese mismo número.`,
      regla: `$a^{1}=a$`,
    });
  } else {
    // b^k se desarrolla: b·b·...·b (el primer b es el mismo; los demas NACEN del exponente)
    const dots = (j: number): Ficha[] => [{ id: `wt${j}`, tex: "\\cdot", op: true }, { id: `wf${j}`, tex: `${b}` }];
    const resto = (desde: number): Ficha[] => Array.from({ length: k - desde + 1 }, (_, i) => dots(desde + i)).flat();
    final.push([...antes, SC, wb, ...resto(2), ce, cP]);
    trs.push({
      fusiones: [{ desde: ["wk"], hacia: resto(2).map((f) => f.id) }],
      texto: `Desarrollamos la potencia: $${b}^{${k}}$ es el $${b}$ multiplicado por sí mismo $${k}$ veces.`,
      porque: `El exponente cuenta cuántas veces se multiplica la base.`,
      regla: `$a^{n}=\\underbrace{a\\cdot a\\cdots a}_{n}$`,
    });
    // se multiplica de a dos: el producto parcial y el siguiente b
    for (let j = 2; j <= k; j++) {
      const prev = j === 2 ? "wb" : `wa${j - 1}`;
      const nuevo = j === k ? "wv" : `wa${j}`;
      final.push([...antes, SC, { id: nuevo, tex: `${b ** j}` }, ...resto(j + 1), ce, cP]);
      trs.push({
        fusiones: [{ desde: [prev, `wt${j}`, `wf${j}`], hacia: nuevo }],
        texto: `$${b ** (j - 1)}\\cdot ${b}=${b ** j}$.`,
        porque: j === 2 ? `Se multiplican de a dos: primero los dos primeros $${b}$.` : `Al producto que llevamos le multiplicamos el siguiente $${b}$.`,
      });
    }
  }

  final.push([...antes, SC, { id: "ok", tex: `${P}=${P}\\ \\checkmark` }]);
  trs.push({
    fusiones: [{ desde: ["wv", "ce", "cP"], hacia: "ok" }],
    texto: `$${b}^{${k}}=${P}$ y $${m}\\cdot ${n}=${P}$: los dos lados valen $${P}$. Se cumple, la respuesta $${k}$ es correcta.`,
    porque: `Si $${b}$ elevado a $${k}$ da justo el producto de lo que había dentro de los logaritmos, el logaritmo vale $${k}$.`,
  });
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
  // (si el numero es justo la base, hay un solo factor: la pieza ya es el primer b y no hace falta un paso mas)
  const separado = (l: Lado): Ficha[] => [
    { id: `${l.id}o`, tex: `\\log_{${b}}(` },
    { id: l.valor === 1 ? `${l.id}f1` : `${l.id}m`, tex: `${l.m}` },
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
    const uno = l.valor === 1;
    // 1) separamos el logaritmo: base y parentesis por un lado, el numero de adentro por otro
    poner(l, separado(l));
    trans.push({
      fusiones: [{ desde: [`${l.id}l`], hacia: separado(l).map((f) => f.id) }],
      texto: `Resolvemos $${L(`${l.m}`)}$ solo: pregunta ¿cuántas veces hay que multiplicar el $${b}$ para llegar a $${l.m}$? Primero separamos el logaritmo (con su base) del número de adentro, $${l.m}$.${uno ? ` Ese $${l.m}$ es justo $${b}$: hay un solo $${b}$.` : ""}`,
      porque: `Un logaritmo es un exponente: cuenta cuántos $${b}$ se multiplican para formar $${l.m}$. La base $${b}$ es la que se va a multiplicar.`,
      regla: `$\\log_{${b}}(a)=y\\ \\iff\\ ${b}^{y}=a$`,
    });
    // 2) el numero de adentro se escribe con la base: el primer b es el mismo numero; los demas NACEN de la base del log
    const fs = factores(l);
    if (!uno) {
      poner(l, fs);
      trans.push({
        fusiones: [{ desde: [`${l.id}m`], hacia: `${l.id}f1` }],
        brotes: fs.filter((f) => !/^(.)(o|c|f1)$/.test(f.id)).map((f) => ({ desde: `${l.id}o`, hacia: f.id })),
        texto: `Escribimos $${l.m}$ como producto de $${b}$: $${vecesB}=${l.m}$. Cada $${b}$ sale de la base del logaritmo.`,
        porque: `Un logaritmo con base $${b}$ pregunta por los $${b}$ que se multiplican. Por eso escribimos el número de adentro con esa base.`,
      });
    }
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
  estados.push([{ id: "tot", tex: `${k}` }]);
  trans.push({
    fusiones: [{ desde: ["ae", "p", "ze"], hacia: "tot" }],
    texto: `Ahora sí sumamos los resultados: $${e1}+${e2}=${k}$.`,
    porque: `Cada logaritmo ya es un número, así que solo queda sumar.`,
  });

  // fila de referencia + comprobacion nacida de ahi (definicion, con la potencia desarrollada)
  const { final, trs, cola } = conReferencia(estados, trans, b, m, n, "p");
  comprobarPotencia(final, trs, estados[estados.length - 1], cola, b, k, m, n, "tot");

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos calcular $${L(`${m}`)}+${L(`${n}`)}$. Recuerda: $\\log_{${b}}(a)$ es el exponente al que hay que elevar $${b}$ para obtener $a$. Resolvemos cada uno y después sumamos.`,
      estados: final,
      transiciones: trs,
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
  // con k = 1 el producto ya ES el unico b: la pieza se llama f1 desde que se calcula (no hay paso de "escribirlo como b")
  const idProducto = k === 1 ? "f1" : "v";
  const estados: Ficha[][] = [dos, dos, unico, [unico[0], { id: idProducto, tex: `${p}` }, unico[4]]];
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
      fusiones: [{ desde: ["m", "dot", "n"], hacia: idProducto }],
      texto: `Hacemos la multiplicación de adentro: $${m}\\cdot ${n}=${p}$.${k === 1 ? ` Y $${p}$ es justo $${b}$: hay un solo $${b}$.` : ""}`,
      porque: `Ahora hay un solo logaritmo con un solo número adentro.`,
    },
  ];
  if (k > 1) {
    trans.push({
      // el primer b es el mismo numero; los demas NACEN de la base del log
      fusiones: [{ desde: ["v"], hacia: "f1" }],
      brotes: factores.filter((f) => !["o", "c", "f1"].includes(f.id)).map((f) => ({ desde: "o", hacia: f.id })),
      texto: `Escribimos $${p}$ como una multiplicación de $${b}$ por sí mismo: $${vecesB}=${p}$. Cada $${b}$ sale de la base del logaritmo.`,
      porque: `El logaritmo pregunta: ¿a qué exponente hay que elevar $${b}$ para obtener $${p}$? Para verlo, conviene escribir $${p}$ usando $${b}$.`,
    });
    estados.push(factores);
  }

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

  // fila de referencia + comprobacion nacida de ahi (definicion, con la potencia desarrollada)
  const { final, trs, cola } = conReferencia(estados, trans, b, m, n, "p");
  comprobarPotencia(final, trs, estados[estados.length - 1], cola, b, k, m, n, "e");

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Queremos calcular $${L(`${m}`)}+${L(`${n}`)}$. Recuerda: $\\log_{${b}}(a)$ es el exponente al que hay que elevar $${b}$ para obtener $a$.`,
      estados: final,
      transiciones: trs,
    },
    resumen: { b, m, n, p, k },
  };
}
