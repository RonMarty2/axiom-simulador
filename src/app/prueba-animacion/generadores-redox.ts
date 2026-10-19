// Numero de oxidacion de un elemento en un compuesto, "como a lapiz":
//   1. el compuesto tal como viene, y por que no se lee directo (el numero del elemento depende del compuesto);
//   2. cada atomo se ETIQUETA debajo, de uno en uno: su numero conocido (color) o x (la incognita);
//   3. de las etiquetas NACE la ecuacion: un termino n·N por elemento (el subindice y el numero salen de su elemento),
//      y el "= 0" nace de que el compuesto es neutro;
//   4. cada producto en su paso; los numeros sueltos (sin x) se suman de a dos;
//   5. el numero suelto PASA AL OTRO LADO (la misma pieza viaja y cambia de signo), se suma con el 0 y,
//      si x tiene un numero delante, ese numero viaja a dividir;
//   6. la respuesta viaja al "?" del enunciado y se COMPRUEBA con el compuesto original: la suma da 0.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas en LaTeX sin $. Las barras van dobles.
import { fr, sustituir, type Ficha, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

// ---------------------------------------------------------------------------
// Tablas
export const NOMBRE_ELEMENTO: Record<string, string> = {
  H: "hidrógeno",
  C: "carbono",
  N: "nitrógeno",
  O: "oxígeno",
  Na: "sodio",
  Mg: "magnesio",
  Al: "aluminio",
  P: "fósforo",
  S: "azufre",
  Cl: "cloro",
  K: "potasio",
  Ca: "calcio",
  Cr: "cromo",
  Mn: "manganeso",
  Fe: "hierro",
  Cu: "cobre",
  Zn: "zinc",
};

/** los elementos cuyo numero de oxidacion se da por conocido (en los compuestos de la tabla) y la razon que se le dice al alumno */
export const CONOCIDOS: Record<string, { valor: number; razon: string }> = {
  H: { valor: 1, razon: "El hidrógeno, cuando se une a no metales, tiene número de oxidación $+1$." },
  O: { valor: -2, razon: "El oxígeno tiene $-2$ en casi todos sus compuestos (las excepciones, como los peróxidos, no aparecen aquí)." },
  K: { valor: 1, razon: "El potasio es un metal del grupo 1 (alcalino) y siempre tiene $+1$." },
  Na: { valor: 1, razon: "El sodio es un metal del grupo 1 (alcalino) y siempre tiene $+1$." },
  Mg: { valor: 2, razon: "El magnesio es un metal del grupo 2 y siempre tiene $+2$." },
  Ca: { valor: 2, razon: "El calcio es un metal del grupo 2 y siempre tiene $+2$." },
  Zn: { valor: 2, razon: "El zinc, en sus compuestos comunes, tiene $+2$." },
  Al: { valor: 3, razon: "El aluminio siempre tiene $+3$." },
};

/** compuestos que se pueden usar (formulas sin parentesis; cada elemento aparece una sola vez; neutros) */
export const COMPUESTOS: Record<string, string> = {
  KMnO4: "permanganato de potasio",
  K2MnO4: "manganato de potasio",
  MnO2: "dióxido de manganeso",
  Mn2O7: "heptóxido de dimanganeso",
  K2Cr2O7: "dicromato de potasio",
  K2CrO4: "cromato de potasio",
  Cr2O3: "óxido de cromo (III)",
  CrO3: "trióxido de cromo",
  H2SO4: "ácido sulfúrico",
  H2SO3: "ácido sulfuroso",
  SO2: "dióxido de azufre",
  SO3: "trióxido de azufre",
  Na2SO4: "sulfato de sodio",
  Na2S2O3: "tiosulfato de sodio",
  H2S: "ácido sulfhídrico",
  HNO3: "ácido nítrico",
  HNO2: "ácido nitroso",
  NO: "monóxido de nitrógeno",
  NO2: "dióxido de nitrógeno",
  N2O: "óxido nitroso",
  N2O3: "trióxido de dinitrógeno",
  N2O5: "pentóxido de dinitrógeno",
  NH3: "amoníaco",
  H3PO4: "ácido fosfórico",
  P2O5: "pentóxido de difósforo",
  HClO: "ácido hipocloroso",
  HClO3: "ácido clórico",
  HClO4: "ácido perclórico",
  KClO3: "clorato de potasio",
  KClO4: "perclorato de potasio",
  NaClO: "hipoclorito de sodio",
  HCl: "ácido clorhídrico",
  NaCl: "cloruro de sodio",
  CO: "monóxido de carbono",
  CO2: "dióxido de carbono",
  CH4: "metano",
  CaCO3: "carbonato de calcio",
  Na2CO3: "carbonato de sodio",
  FeO: "óxido de hierro (II)",
  Fe2O3: "óxido de hierro (III)",
  CuO: "óxido de cobre (II)",
  Cu2O: "óxido de cobre (I)",
};

/** atomos de una formula sin parentesis, en el orden en que se escriben: K2Cr2O7 -> [K,2] [Cr,2] [O,7] */
export function contarAtomos(formula: string): [string, number][] | null {
  if (!/^([A-Z][a-z]?\d*)+$/.test(formula)) return null;
  const out: [string, number][] = [];
  for (const m of formula.matchAll(/([A-Z][a-z]?)(\d*)/g)) {
    if (!(m[1] in NOMBRE_ELEMENTO) || out.some(([e]) => e === m[1])) return null;
    const n = m[2] ? Number(m[2]) : 1;
    if (n < 1) return null;
    out.push([m[1], n]);
  }
  return out;
}

/** formula en LaTeX: K2Cr2O7 -> \mathrm{K_{2}Cr_{2}O_{7}} */
export const formulaTex = (f: string) => `\\mathrm{${(contarAtomos(f) ?? []).map(([e, n]) => (n > 1 ? `${e}_{${n}}` : e)).join("")}}`;
const elemTex = (e: string, n: number) => `\\mathrm{${n > 1 ? `${e}_{${n}}` : e}}`;

/** elementos de un compuesto cuyo numero de oxidacion se puede hallar: todos los demas son conocidos y la cuenta sale entera */
export function incognitasPosibles(compuesto: string): string[] {
  return (contarAtomos(compuesto) ?? []).map(([e]) => e).filter((e) => validarOxidacion(compuesto, e) === null);
}

// ---------------------------------------------------------------------------
// Validacion
export function validarOxidacion(compuesto: string, elemento: string): string | null {
  if (!(compuesto in COMPUESTOS)) return "Elige un compuesto de la lista.";
  const at = contarAtomos(compuesto);
  if (!at) return "No se puede leer esa fórmula.";
  const k = at.find(([e]) => e === elemento);
  if (!k) return `El $${formulaTex(compuesto)}$ no tiene $\\mathrm{${elemento}}$.`;
  const sinConocer = at.find(([e]) => e !== elemento && !(e in CONOCIDOS));
  if (sinConocer) {
    return `Si buscas el $\\mathrm{${elemento}}$, quedaría sin conocer el $\\mathrm{${sinConocer[0]}}$ y habría dos incógnitas. Elige el $\\mathrm{${sinConocer[0]}}$ para ese compuesto.`;
  }
  const suma = at.reduce((s, [e, n]) => (e === elemento ? s : s + n * CONOCIDOS[e].valor), 0);
  if (suma === 0) return `En el $${formulaTex(compuesto)}$ los demás átomos ya suman $0$: el $\\mathrm{${elemento}}$ tendría $0$ y no hay nada que despejar. Elige otro caso.`;
  if (suma % k[1] !== 0) return `En el $${formulaTex(compuesto)}$ el número de oxidación del $\\mathrm{${elemento}}$ no sale entero con esta cuenta. Elige otro caso.`;
  return null;
}

// ---------------------------------------------------------------------------
// Formato
const COLOR = { conocido: "#2563eb", incognita: "#ea580c", resultado: "#16a34a" } as const;
const col = (c: string, tex: string) => `\\textcolor{${c}}{${tex}}`;
/** numero con signo explicito: +1, -2 */
const sg = (v: number) => (v < 0 ? `-${-v}` : `+${v}`);
/** numero dentro de una suma: los negativos van entre parentesis */
const par = (v: number) => (v < 0 ? `(${v})` : `${v}`);
/** numero en una posicion: al comienzo del renglon el negativo va sin parentesis */
const enPos = (v: number, primero: boolean) => (primero ? `${v}` : par(v));
const razonSuma = (a: number, b: number) =>
  a < 0 && b < 0
    ? `Con el mismo signo se suman los valores y se conserva el signo.`
    : a > 0 && b > 0
      ? `Se suman los dos números.`
      : `Con signos distintos se restan los valores y queda el signo del mayor.`;

// ---------------------------------------------------------------------------
function construir(compuesto: string, elemento: string): Resultado {
  const at = contarAtomos(compuesto)!;
  const ix = at.findIndex(([e]) => e === elemento);
  const nx = at[ix][1];
  const valor = (i: number) => CONOCIDOS[at[i][0]].valor;
  const suma = at.reduce((s, [, n], i) => (i === ix ? s : s + n * valor(i)), 0);
  const x = -suma / nx;
  const nom = (e: string) => NOMBRE_ELEMENTO[e];
  const F = formulaTex(compuesto);
  const X = `\\mathrm{${elemento}}`;
  const nombreComp = `${COMPUESTOS[compuesto]} ($${F}$)`;

  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];
  // renglones: compuesto, lo que piden, ecuacion, comprobacion
  let D: Ficha[] = [];
  let P: Ficha[] = [];
  let W: Ficha[] = [];
  let K: Ficha[] = [];
  const foto = () => estados.push([...D, ...P, ...W, ...K].map((f) => ({ ...f })));
  const paso = (t: Transicion) => {
    foto();
    trans.push(t);
  };
  const cambiar = (viejos: string[], nuevos: Ficha[]) => {
    D = sustituir(D, viejos, nuevos);
    P = sustituir(P, viejos, nuevos);
    W = sustituir(W, viejos, nuevos);
    K = sustituir(K, viejos, nuevos);
  };
  const etiquetar = (id: string, debajo: string | undefined) => {
    D = D.map((f) => (f.id === id ? { ...f, debajo } : f));
  };
  const primeroDe = (fila: Ficha[], id: string) => fila.filter((f) => !f.salto)[0]?.id === id;

  // ----- estado inicial: el compuesto tal como viene y lo que piden
  D = [
    { id: "tD", tex: "\\text{Compuesto:}", op: true },
    ...at.map(([e, n], i): Ficha => ({ id: `a${i}`, tex: elemTex(e, n), ...(i > 0 ? { pegado: true } : {}) })),
  ];
  P = [
    { id: "SP", tex: "", salto: true },
    { id: "tP", tex: "\\text{Piden:}", op: true },
    { id: "pn", tex: `N(${X})` },
    { id: "pe", tex: "=", op: true },
    { id: "q", tex: "?" },
  ];
  const intro = `Queremos hallar el número de oxidación del ${nom(elemento)} ($${X}$) en el ${nombreComp}. Lo escribimos $N(${X})$. Vamos a escribir cada paso, como a lápiz.`;
  foto();

  // ----- 1) por que no se lee directo, y la regla que se va a usar
  paso({
    fusiones: [],
    resaltar: at.map((_, i) => `a${i}`),
    texto: `El número de oxidación del ${nom(elemento)} no está en ninguna tabla: depende del compuesto. En cambio, los de los otros átomos sí los conocemos. Y todo compuesto cumple algo: es neutro, así que los números de oxidación de todos sus átomos suman $0$. Aquí $n$ es la cantidad de átomos de cada elemento y $N$ su número de oxidación.`,
    porque: `Un compuesto no tiene carga en total: lo que unos átomos ceden, otros lo reciben. Por eso los números de oxidación de todos sus átomos se compensan.`,
    regla: `$n_{1}\\cdot N_{1}+n_{2}\\cdot N_{2}+\\dots=0$`,
  });

  // ----- 2) etiquetas de a una: primero los conocidos, al final la incognita
  at.forEach(([e, n], i) => {
    if (i === ix) return;
    const v = valor(i);
    etiquetar(`a${i}`, col(COLOR.conocido, sg(v)));
    paso({
      fusiones: [],
      resaltar: [`a${i}`],
      texto: `${CONOCIDOS[e].razon} Lo anotamos debajo del $\\mathrm{${e}}$: $${sg(v)}$.${n > 1 ? ` Vale para cada uno de los $${n}$ átomos.` : ""}`,
      porque: `Cada elemento se comporta de una forma conocida en estos compuestos; por eso su número de oxidación se anota sin calcular.`,
      regla: `$N(\\mathrm{${e}})=${sg(v)}$`,
    });
  });
  etiquetar(`a${ix}`, col(COLOR.incognita, "x"));
  paso({
    fusiones: [],
    resaltar: [`a${ix}`],
    texto: `Del ${nom(elemento)} no sabemos el número de oxidación: lo llamamos $x$ y lo anotamos debajo del $${X}$. Es lo que vamos a buscar.${nx > 1 ? ` Los $${nx}$ átomos de ${nom(elemento)} valen lo mismo.` : ""}`,
    porque: `Una letra guarda el lugar de un número que todavía no conocemos.`,
    regla: `$N(${X})=x$`,
  });

  // ----- 3) la ecuacion nace de las etiquetas: un termino n·N por elemento, de izquierda a derecha
  const reglaT = `$n_{1}\\cdot N_{1}+n_{2}\\cdot N_{2}+\\dots$`;
  at.forEach(([e, n], i) => {
    const cuantos = n === 1 ? `el $\\mathrm{${e}}$ no lleva subíndice: hay $1$ átomo` : `el subíndice del $\\mathrm{${e}}$ es $${n}$: hay $${n}$ átomos`;
    const v = i === ix ? null : valor(i);
    const termino: Ficha[] =
      v === null
        ? [
            { id: "xn", tex: `${n}` },
            { id: "xd", tex: "\\cdot", op: true },
            { id: "xx", tex: col(COLOR.incognita, "x") },
          ]
        : [{ id: `t${i}`, tex: `${n}\\cdot(${col(COLOR.conocido, sg(v))})` }];
    const nuevos = i === 0 ? [{ id: "S", tex: "", salto: true }, ...termino] : [{ id: `p${i}`, tex: "+", op: true }, ...termino];
    W = [...W, ...nuevos];
    const escrito = v === null ? `${n}\\cdot x` : `${n}\\cdot(${sg(v)})`;
    paso({
      fusiones: [],
      brotes: [...(i === 0 ? [{ desde: "a0", hacia: "S" }] : []), ...termino.filter((f) => !f.op).map((f) => ({ desde: `a${i}`, hacia: f.id }))],
      texto:
        i === 0
          ? `Armamos la suma, un término por elemento, de izquierda a derecha. Empezamos por el ${nom(e)}: ${cuantos}, y a cada uno le toca ${v === null ? "$x$" : `$${sg(v)}$`}. Escribimos $${escrito}$.`
          : `Seguimos con el ${nom(e)}: ${cuantos}, y a cada uno le toca ${v === null ? "$x$" : `$${sg(v)}$`}. Escribimos $${escrito}$ y lo sumamos.`,
      porque: `Cada átomo aporta su número de oxidación. Si hay $n$ átomos del mismo elemento, aportan $n$ veces ese número.`,
      regla: reglaT,
    });
  });
  W = [...W, { id: "eq", tex: "=", op: true }, { id: "z", tex: "0" }];
  paso({
    fusiones: [],
    brotes: [
      { desde: "a0", hacia: "eq" },
      { desde: "a0", hacia: "z" },
    ],
    texto: `La suma de todos los números de oxidación tiene que dar $0$, porque el compuesto es neutro. Lo escribimos como una igualdad.`,
    porque: `Un compuesto no tiene carga total, y la suma de las cargas de sus átomos es justamente su carga.`,
    regla: `$n_{1}\\cdot N_{1}+n_{2}\\cdot N_{2}+\\dots=0$`,
  });

  // ----- 4) un producto por paso (sirve igual para la ecuacion y para la comprobacion)
  const producto = (idT: string, idR: string, n: number, v: number, fila: Ficha[]) => {
    const r = n * v;
    const pr = primeroDe(fila, idT);
    cambiar([idT], [{ id: idR, tex: enPos(r, pr) }]);
    paso({
      fusiones: [{ desde: [idT], hacia: idR }],
      texto: `Multiplicamos: $${n}\\cdot ${par(v)}=${r}$.`,
      porque:
        n === 1
          ? `Un solo átomo aporta justo su número de oxidación.`
          : `Los $${n}$ átomos aportan $${n}$ veces $${par(v)}$: juntos suman $${r}$.${v < 0 ? " Positivo por negativo da negativo." : ""}`,
      regla: n === 1 ? `$1\\cdot N=N$` : `$n\\cdot N=N+N+\\dots+N$`,
    });
    return r;
  };
  const sumar = (fila: Ficha[], cur: string, op: string, sig: string, a: number, b: number, nid: string, extra = "") => {
    const pr = primeroDe(fila, cur);
    cambiar([cur, op, sig], [{ id: nid, tex: enPos(a + b, pr) }]);
    paso({
      fusiones: [{ desde: [cur, op, sig], hacia: nid }],
      texto: `Sumamos: $${par(a)}+${par(b)}=${a + b}$.${extra}`,
      porque: razonSuma(a, b),
      regla: `$a+b=c$`,
    });
    return a + b;
  };

  const rv = new Map<number, number>(); // valor del producto de cada elemento conocido
  at.forEach(([, n], i) => {
    if (i === ix) {
      if (nx === 1) {
        cambiar(["xn", "xd"], []);
        paso({
          fusiones: [{ desde: ["xn", "xd"], hacia: null, modo: "tachar" }],
          texto: `Hay un solo átomo de ${nom(elemento)}: $1\\cdot x=x$. El $1$ no cambia nada, se tacha.`,
          porque: `Multiplicar por $1$ no cambia el número.`,
          regla: `$1\\cdot x=x$`,
        });
      }
      return;
    }
    rv.set(i, producto(`t${i}`, `r${i}`, n, valor(i), W));
  });

  // ----- 5) los numeros sueltos (sin x) se juntan: de a dos
  const sueltos = at.map((_, i) => i).filter((i) => i !== ix);
  let cur = `r${sueltos[0]}`;
  let c = rv.get(sueltos[0])!;
  if (sueltos.length >= 2) {
    paso({
      fusiones: [],
      resaltar: sueltos.map((i) => `r${i}`),
      texto: `Marcamos los números sueltos, los que no tienen $x$: ${sueltos.map((i) => `$${par(rv.get(i)!)}$`).join(" y ")}.`,
      porque: `Los números sin $x$ se pueden sumar entre sí; el término con $x$ se queda aparte.`,
      regla: `$a+b=c$`,
    });
    sueltos.slice(1).forEach((i, j) => {
      const nid = `g${j + 1}`;
      c = sumar(W, cur, `p${i}`, `r${i}`, c, rv.get(i)!, nid);
      cur = nid;
    });
  }

  // ----- 6) el numero suelto PASA AL OTRO LADO: la misma pieza viaja y cambia de signo
  const iC = W.findIndex((f) => f.id === cur);
  const antesDeX = iC < W.findIndex((f) => f.id === "xx");
  const opId = (antesDeX ? W[iC + 1] : W[iC - 1]).id;
  const cv = -c;
  W = W.filter((f) => f.id !== cur && f.id !== opId);
  W = [...W, { id: "pz", tex: "+", op: true }, { id: "cz", tex: par(cv) }];
  paso({
    fusiones: [{ desde: [cur, opId], hacia: ["pz", "cz"], modo: "viajar" }],
    brotes: [
      { desde: cur, hacia: "cz" },
      { desde: opId, hacia: "pz" },
    ],
    texto: `Queremos dejar $x$ sola. Pasamos el $${par(c)}$ al otro lado de la igualdad. Al cruzar cambia de signo: ahora es $${par(cv)}$.`,
    porque: `Es lo mismo que sumar $${par(cv)}$ en los dos lados: a la izquierda se cancela con $${par(c)}$ y a la derecha queda escrito.`,
    regla: `$a+b=c\\ \\Rightarrow\\ a=c-b$`,
  });
  W = [...W.filter((f) => !["z", "pz", "cz"].includes(f.id)), { id: "R", tex: `${cv}` }];
  paso({
    fusiones: [{ desde: ["z", "pz", "cz"], hacia: "R" }],
    texto: `Sumamos del lado derecho: $0+${par(cv)}=${cv}$.${nx === 1 ? ` Como $x$ quedó sola, ya tenemos la respuesta: $x=${x}$.` : ""}`,
    porque: `Sumar $0$ no cambia el número.`,
    regla: `$0+a=a$`,
  });

  // ----- 7) si x tiene un numero delante, ese numero viaja a dividir
  let fin = "R";
  if (nx > 1) {
    W = W.filter((f) => f.id !== "xn" && f.id !== "xd").map((f) => (f.id === "R" ? fr("fr", `${cv}`, `${nx}`) : f));
    paso({
      fusiones: [{ desde: ["xn", "xd", "R"], hacia: "fr", modo: "viajar" }],
      brotes: [
        { desde: "R", hacia: "fr.n" },
        { desde: "xn", hacia: "fr.d" },
      ],
      texto: `El $${nx}$ multiplica a $x$. Pasa al otro lado dividiendo: viaja hasta debajo del $${cv}$ y queda $x=\\dfrac{${cv}}{${nx}}$.`,
      porque: `Lo que multiplicaba pasa dividiendo: ahora es el denominador. Es lo mismo que dividir los dos lados entre $${nx}$.`,
      regla: `$a\\cdot x=m\\ \\Rightarrow\\ x=\\dfrac{m}{a}\\quad (a\\neq 0)$`,
    });
    W = W.map((f) => (f.id === "fr" ? { id: "X", tex: `${x}` } : f));
    paso({
      fusiones: [{ desde: ["fr"], hacia: "X" }],
      texto: `Dividimos: $\\dfrac{${cv}}{${nx}}=${x}$. Se comprueba al revés: $${x}\\cdot ${nx}=${cv}$.`,
      porque: `La raya de la fracción es una división: el número de arriba entre el de abajo.${cv < 0 ? " Negativo entre positivo da negativo." : ""}`,
      regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
    });
    fin = "X";
  }

  // ----- 8) la respuesta viaja al "?" y la etiqueta x se vuelve el numero hallado
  cambiar(["q"], [{ id: "qR", tex: sg(x) }]);
  etiquetar(`a${ix}`, col(COLOR.resultado, sg(x)));
  paso({
    fusiones: [{ desde: ["q"], hacia: "qR", modo: "viajar" }],
    brotes: [{ desde: fin, hacia: "qR" }],
    texto: `Respuesta: el número de oxidación del ${nom(elemento)} en el $${F}$ es $${sg(x)}$. Lo escribimos en el lugar del signo de pregunta, y también debajo del $${X}$, donde estaba la $x$.`,
    porque: `El valor que quedó en lugar de $x$ responde lo que pide el enunciado.`,
    regla: `$N(${X})=${sg(x)}$`,
  });

  // ----- 9) comprobacion contra el compuesto ORIGINAL: con las etiquetas, la suma da 0
  const kTerm = (i: number): Ficha => {
    const [, n] = at[i];
    return { id: `k${i}`, tex: i === ix ? `${n}\\cdot(${col(COLOR.resultado, sg(x))})` : `${n}\\cdot(${col(COLOR.conocido, sg(valor(i)))})` };
  };
  K = at.flatMap((_, i): Ficha[] => (i === 0 ? [{ id: "kS", tex: "", salto: true }, kTerm(i)] : [{ id: `kp${i}`, tex: "+", op: true }, kTerm(i)]));
  K = [...K, { id: "ke", tex: "=", op: true }, { id: "kz", tex: "0" }];
  paso({
    fusiones: [],
    brotes: [
      { desde: "a0", hacia: "kS" },
      ...at.map((_, i) => ({ desde: `a${i}`, hacia: `k${i}` })),
      { desde: "a0", hacia: "ke" },
      { desde: "a0", hacia: "kz" },
    ],
    texto: `Comprobamos con el compuesto original: de cada átomo tomamos su cantidad y el número que tiene debajo (en el ${nom(elemento)} ya está el $${sg(x)}$) y volvemos a armar la suma. Tiene que dar $0$.`,
    porque: `Una solución es buena si, al ponerla en lugar de $x$, la suma de los números de oxidación da $0$ como pide un compuesto neutro.`,
    regla: reglaT,
  });
  const qv: number[] = [];
  at.forEach(([, n], i) => {
    qv.push(producto(`k${i}`, `q${i}`, n, i === ix ? x : valor(i), K));
  });
  let kc = `q0`;
  let ka = qv[0];
  for (let i = 1; i < at.length; i++) {
    const nid = `ks${i}`;
    ka = sumar(K, kc, `kp${i}`, `q${i}`, ka, qv[i], nid);
    kc = nid;
  }
  if (ka !== 0) throw new Error(`la comprobación de ${compuesto} no da 0`);
  K = [{ id: "kS", tex: "", salto: true }, { id: "kok", tex: "0=0\\ \\checkmark" }];
  paso({
    fusiones: [{ desde: [kc, "ke", "kz"], hacia: "kok" }],
    texto: `Los dos lados valen $0$: la igualdad se cumple. Entonces el número de oxidación del ${nom(elemento)} en el $${F}$ es $${sg(x)}$.`,
    porque: `Si al reemplazar $x$ la suma da $0$, el valor es correcto.`,
    regla: `$n_{1}\\cdot N_{1}+n_{2}\\cdot N_{2}+\\dots=0$`,
  });

  return {
    demo: { titulo: "", nota: "", intro, estados, transiciones: trans },
    resumen: { x, nx, suma, c, pasos: trans.length },
  };
}

// ---------------------------------------------------------------------------
/** numero de oxidacion de `elemento` en `compuesto` (Mn en KMnO4 -> +7). Validar antes con validarOxidacion. */
export function numeroOxidacion(compuesto: string, elemento: string): Resultado {
  return construir(compuesto, elemento);
}
