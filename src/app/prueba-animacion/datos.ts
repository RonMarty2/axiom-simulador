// PRUEBA TEMPORAL de animacion por "fusion": las piezas que se operan se
// marcan, se juntan y se funden en el resultado; debajo va el por que.
// Se borra cuando se decida el estilo final.
//
// Todo texto que ve el alumno (intro, texto, porque) va con las formulas entre
// $...$ para que se pinten con KaTeX (MathText): fracciones con raya, nunca "/"
// ni "÷".
export interface Ficha {
  id: string;
  tex: string;
  /** operador (+, =): se pinta mas suave */
  op?: boolean;
  /** pegada a la anterior (3x = "3" + "x") */
  pegado?: boolean;
  /** exponente: ficha chica y levantada, pegada a su base */
  sup?: boolean;
  /** etiqueta escrita DEBAJO de la pieza (LaTeX SIN signos de dolar, con color si hace falta): la letra o el rol que cumple (a = 1, "masa", "velocidad") */
  debajo?: string;
  /** la pieza empieza en un renglon nuevo (la formula debajo de la ecuacion) */
  salto?: boolean;
  /** fraccion con partes propias: se pueden señalar como "<id>.n" (numerador) y "<id>.d" (denominador) */
  frac?: { n: string; d: string };
}

/** fraccion con numerador y denominador como piezas separadas */
export const fr = (id: string, n: string, d: string, op?: boolean): Ficha => ({
  id,
  tex: `§${n}§${d}`,
  frac: { n, d },
  ...(op ? { op } : {}),
});
export interface Fusion {
  /** ids del estado actual que se juntan. Ninguno puede seguir existiendo en el estado siguiente. */
  desde: string[];
  /** id(s) del resultado en el estado siguiente; null = se cancelan y desaparecen */
  hacia: string | string[] | null;
  /** ficha que se QUEDA: las de `desde` se deslizan hacia ella y se unen (no cambia, solo late) */
  ancla?: string;
  /** "tachar": una raya cruza las piezas y se desvanecen en su lugar (no viajan al centro).
   *  "viajar": las piezas NO se juntan: se quedan donde estan y cada una viaja hasta su lugar nuevo (un `brote` por cada una) */
  modo?: "tachar" | "viajar";
}
/** una pieza nueva que NACE de una que ya existe: sale de ella y viaja a su lugar (no aparece de la nada) */
export interface Brote {
  /** ficha que se queda y de la que sale el brote */
  desde: string;
  /** id de la ficha nueva en el estado siguiente */
  hacia: string;
}
export interface Transicion {
  fusiones: Fusion[];
  brotes?: Brote[];
  /** fichas que se marcan para que el alumno las mire (patron que se reconoce), sin cambiar nada */
  resaltar?: string[];
  texto: string;
  porque: string;
  /** la formula, identidad o propiedad que justifica el paso, escrita general ($a^m\cdot a^n=a^{m+n}$); en modo "resolver" va dentro del porque, en "ensenar" en su propio recuadro */
  regla?: string;
  /** el paso solo REESCRIBE un valor como producto o potencia (448 = 2^6·7, 6 = 3·2): traer varios numeros a la vez es valido */
  descompone?: boolean;
}
export interface Demo {
  titulo: string;
  nota: string;
  intro: string;
  estados: Ficha[][];
  transiciones: Transicion[];
}

export const DEMOS: Demo[] = [
  {
    titulo: "1 · Suma",
    nota: "2 + 3 + 4",
    intro: "Queremos calcular $2+3+4$. Vamos de a una operación.",
    estados: [
      [
        { id: "n2", tex: "2" },
        { id: "p1", tex: "+", op: true },
        { id: "n3", tex: "3" },
        { id: "p2", tex: "+", op: true },
        { id: "n4", tex: "4" },
      ],
      [
        { id: "n2", tex: "2" },
        { id: "p1", tex: "+", op: true },
        { id: "s34", tex: "7" },
      ],
      [{ id: "r", tex: "9" }],
    ],
    transiciones: [
      {
        fusiones: [{ desde: ["n3", "p2", "n4"], hacia: "s34" }],
        texto: "Sumamos $3+4$ y se juntan en un solo número: $7$.",
        porque: "Sumar es juntar cantidades: $3$ cosas y $4$ cosas son $7$ cosas.",
      },
      {
        fusiones: [{ desde: ["n2", "p1", "s34"], hacia: "r" }],
        texto: "Ahora sumamos $2+7$ y queda $9$.",
        porque: "Cuando queda una sola suma, la resolvemos y terminamos.",
      },
    ],
  },
  {
    titulo: "2 · Ley de signos",
    nota: "5 − (−3)",
    intro: "Queremos calcular $5-(-3)$. Ojo con los dos signos menos juntos.",
    estados: [
      [
        { id: "a", tex: "5" },
        { id: "m", tex: "-", op: true },
        { id: "par", tex: "(-3)" },
      ],
      [
        { id: "a", tex: "5" },
        { id: "r1", tex: "+3" },
      ],
      [{ id: "r2", tex: "8" }],
    ],
    transiciones: [
      {
        fusiones: [{ desde: ["m", "par"], hacia: "r1" }],
        texto: "Los dos signos menos se combinan y dan un más: $-(-3)=+3$.",
        porque: "Menos por menos da más. Restar un número negativo es lo mismo que sumarlo.",
      },
      {
        fusiones: [{ desde: ["a", "r1"], hacia: "r2" }],
        texto: "Sumamos $5+3$ y queda $8$.",
        porque: "Ya no hay signos dobles: es una suma común.",
      },
    ],
  },
  {
    titulo: "3 · Ecuación",
    nota: "3x + 2 = 11",
    intro: "Queremos hallar $x$ en $3x+2=11$. Dejamos $x$ sola paso a paso.",
    estados: [
      [
        { id: "c3", tex: "3" },
        { id: "x", tex: "x", pegado: true },
        { id: "p", tex: "+", op: true },
        { id: "d2", tex: "2" },
        { id: "eq", tex: "=", op: true },
        { id: "e11", tex: "11" },
      ],
      [
        { id: "c3", tex: "3" },
        { id: "x", tex: "x", pegado: true },
        { id: "p", tex: "+", op: true },
        { id: "d2", tex: "2" },
        { id: "s1", tex: "-2" },
        { id: "eq", tex: "=", op: true },
        { id: "e11", tex: "11" },
        { id: "s2", tex: "-2" },
      ],
      [
        { id: "c3", tex: "3" },
        { id: "x", tex: "x", pegado: true },
        { id: "eq", tex: "=", op: true },
        { id: "n9", tex: "9" },
      ],
      [
        { id: "x", tex: "x" },
        { id: "eq", tex: "=", op: true },
        { id: "fr", tex: "\\dfrac{9}{3}" },
      ],
      [
        { id: "x", tex: "x" },
        { id: "eq", tex: "=", op: true },
        { id: "r3", tex: "3" },
      ],
    ],
    transiciones: [
      {
        fusiones: [],
        brotes: [
          { desde: "d2", hacia: "s1" },
          { desde: "d2", hacia: "s2" },
        ],
        texto: "Restamos $2$ en los dos lados de la igualdad: el $2$ que queremos quitar sale una vez de cada lado.",
        porque: "Lo que haces de un lado debes hacerlo del otro, así la igualdad se mantiene.",
      },
      {
        fusiones: [
          { desde: ["p", "d2", "s1"], hacia: null },
          { desde: ["e11", "s2"], hacia: "n9" },
        ],
        texto: "$+2$ y $-2$ se cancelan. Y del otro lado, $11-2=9$.",
        porque: "Un número más su opuesto da cero y desaparece.",
      },
      {
        fusiones: [{ desde: ["c3", "n9"], hacia: "fr" }],
        texto: "El $3$ pasa al otro lado dividiendo: queda $\\dfrac{9}{3}$.",
        porque: "El $3$ multiplicaba a $x$. Para dejar $x$ sola, dividimos los dos lados entre $3$.",
      },
      {
        fusiones: [{ desde: ["fr"], hacia: "r3" }],
        texto: "$\\dfrac{9}{3}=3$. Entonces $x=3$.",
        porque: "La fracción es una división: $9$ entre $3$ da $3$. Esa es la solución de la ecuación.",
      },
    ],
  },
  {
    titulo: "4 · Suma de fracciones",
    nota: "1/2 + 1/3",
    intro: "Queremos calcular $\\dfrac{1}{2}+\\dfrac{1}{3}$. Los denominadores son distintos.",
    estados: [
      [fr("f1", "1", "2"), { id: "p", tex: "+", op: true }, fr("f2", "1", "3")],
      [
        fr("f1", "1", "2"),
        { id: "m1", tex: "\\cdot", op: true },
        fr("k1", "3", "3"),
        { id: "p", tex: "+", op: true },
        fr("f2", "1", "3"),
        { id: "m2", tex: "\\cdot", op: true },
        fr("k2", "2", "2"),
      ],
      [fr("g1", "1\\cdot 3", "2\\cdot 3"), { id: "p", tex: "+", op: true }, fr("g2", "1\\cdot 2", "3\\cdot 2")],
      [fr("u1", "3", "6"), { id: "p", tex: "+", op: true }, fr("u2", "2", "6")],
      [fr("s", "3+2", "6")],
      [fr("h", "5", "6")],
    ],
    transiciones: [
      {
        fusiones: [],
        brotes: [
          { desde: "f2.d", hacia: "k1.n" },
          { desde: "f2.d", hacia: "k1.d" },
          { desde: "f1.d", hacia: "k2.n" },
          { desde: "f1.d", hacia: "k2.d" },
        ],
        texto: "El $3$ de abajo de $\\dfrac{1}{3}$ se queda y se copia arriba y abajo de la primera fracción. El $2$ de abajo de $\\dfrac{1}{2}$ se copia en la segunda.",
        porque: "Así formamos $\\dfrac{3}{3}$ y $\\dfrac{2}{2}$, que valen $1$: multiplicar por $1$ no cambia el valor, pero hace que los dos denominadores queden iguales.",
      },
      {
        fusiones: [
          { desde: ["f1", "m1", "k1"], hacia: "g1" },
          { desde: ["f2", "m2", "k2"], hacia: "g2" },
        ],
        texto: "Multiplicamos arriba con arriba y abajo con abajo.",
        porque: "Para multiplicar fracciones se multiplican los numeradores entre sí y los denominadores entre sí.",
      },
      {
        fusiones: [
          { desde: ["g1"], hacia: "u1" },
          { desde: ["g2"], hacia: "u2" },
        ],
        texto: "Hacemos las multiplicaciones: $1\\cdot3=3$, $2\\cdot3=6$ y $1\\cdot2=2$, $3\\cdot2=6$.",
        porque: "Las dos fracciones ahora tienen el mismo denominador, $6$: las partes son del mismo tamaño y se pueden sumar.",
      },
      {
        fusiones: [{ desde: ["u1", "p", "u2"], hacia: "s" }],
        texto: "Con el mismo denominador, sumamos los numeradores y el $6$ se queda.",
        porque: "Con partes del mismo tamaño, solo se cuentan cuántas partes hay en total.",
      },
      {
        fusiones: [{ desde: ["s"], hacia: "h" }],
        texto: "Calculamos $3+2=5$. Resultado: $\\dfrac{5}{6}$.",
        porque: "$3$ partes más $2$ partes son $5$ partes de las $6$ en que está dividido el entero.",
      },
    ],
  },
  {
    titulo: "5 · Multiplicación con signos",
    nota: "(−2)(−4)",
    intro: "Queremos calcular $(-2)\\cdot(-4)$.",
    estados: [
      [
        { id: "a", tex: "(-2)" },
        { id: "t", tex: "\\cdot", op: true },
        { id: "b", tex: "(-4)" },
      ],
      [{ id: "r", tex: "8" }],
    ],
    transiciones: [
      {
        fusiones: [{ desde: ["a", "t", "b"], hacia: "r" }],
        texto: "Multiplicamos los números, $2\\cdot4=8$, y los signos: menos por menos da más.",
        porque: "Signos iguales dan más; signos distintos dan menos.",
      },
    ],
  },
  {
    titulo: "6 · Diferencia de cuadrados",
    nota: "x² − 9 = 0",
    intro: "Queremos resolver $x^{2}-9=0$.",
    estados: [
      [
        { id: "a", tex: "x^2" },
        { id: "m", tex: "-", op: true },
        { id: "n", tex: "9" },
        { id: "eq", tex: "=", op: true },
        { id: "z", tex: "0" },
      ],
      [
        { id: "a", tex: "x^2" },
        { id: "m", tex: "-", op: true },
        { id: "n3", tex: "3^2" },
        { id: "eq", tex: "=", op: true },
        { id: "z", tex: "0" },
      ],
      [
        { id: "a", tex: "x^2" },
        { id: "m", tex: "-", op: true },
        { id: "n3", tex: "3^2" },
        { id: "eq", tex: "=", op: true },
        { id: "z", tex: "0" },
      ],
      [
        { id: "f1", tex: "(x-3)" },
        { id: "f2", tex: "(x+3)" },
        { id: "eq", tex: "=", op: true },
        { id: "z", tex: "0" },
      ],
      [
        { id: "f1", tex: "(x-3)" },
        { id: "f2", tex: "(x+3)" },
        { id: "eq", tex: "=", op: true },
        { id: "z", tex: "0" },
      ],
      [
        { id: "e1", tex: "x-3=0" },
        { id: "or", tex: "\\text{ ó }", op: true },
        { id: "e2", tex: "x+3=0" },
      ],
      [
        { id: "s1", tex: "x=3" },
        { id: "or", tex: "\\text{ ó }", op: true },
        { id: "s2", tex: "x=-3" },
      ],
    ],
    transiciones: [
      {
        fusiones: [{ desde: ["n"], hacia: "n3" }],
        texto: "Escribimos $9$ como un cuadrado: $9=3\\cdot3=3^{2}$.",
        porque: "Para usar la fórmula necesitamos que los dos números estén elevados al cuadrado: $x^{2}$ ya lo está, y el $9$ es $3^{2}$.",
      },
      {
        fusiones: [],
        resaltar: ["a", "m", "n3"],
        texto: "Reconocemos el patrón $a^{2}-b^{2}$: aquí $a=x$ y $b=3$.",
        porque: "Es una resta de dos cuadrados. Esa forma se llama diferencia de cuadrados y siempre se factoriza igual.",
      },
      {
        fusiones: [{ desde: ["a", "m", "n3"], hacia: ["f1", "f2"] }],
        texto: "Aplicamos la fórmula $a^{2}-b^{2}=(a-b)(a+b)$ con $a=x$ y $b=3$: queda $(x-3)(x+3)$.",
        porque: "Se puede comprobar: $(x-3)(x+3)=x^{2}+3x-3x-9=x^{2}-9$. Los términos $3x$ y $-3x$ se cancelan.",
      },
      {
        fusiones: [],
        resaltar: ["f1", "f2"],
        texto: "Tenemos un producto de dos factores igual a $0$.",
        porque: "Un producto solo da $0$ si al menos uno de sus factores vale $0$. Si ninguno fuera $0$, el producto tampoco lo sería.",
      },
      {
        fusiones: [{ desde: ["f1", "f2", "eq", "z"], hacia: ["e1", "or", "e2"] }],
        texto: "Igualamos cada factor a cero: $x-3=0$ o $x+3=0$.",
        porque: "Cada factor puede ser el que vale $0$, así que se resuelve una ecuación para cada uno.",
      },
      {
        fusiones: [
          { desde: ["e1"], hacia: "s1" },
          { desde: ["e2"], hacia: "s2" },
        ],
        texto: "Despejamos $x$: el $-3$ pasa como $+3$ y el $+3$ pasa como $-3$.",
        porque: "Al pasar un número al otro lado de la igualdad cambia de signo. Soluciones: $x=3$ o $x=-3$.",
      },
    ],
  },
];
