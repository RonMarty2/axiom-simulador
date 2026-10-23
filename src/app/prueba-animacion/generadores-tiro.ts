// Generador de Fisica: tiro parabolico HORIZONTAL (se lanza con v0 desde una altura h; g = 10 m/s^2).
//   t = raiz(2h/g)  (tiempo de caida)   y   x = v0 · t  (alcance).
// Sigue el patron "ANOTAR Y REEMPLAZAR" y la regla de Fisica/Quimica/Geometria (Ronald, 18-oct):
//   1. los datos del enunciado tal como vienen (numero y unidad, cada uno su pieza) y POR QUE hay dos movimientos;
//   2. ETIQUETAR cada dato con su letra y su color, de a uno: h, v_0, g;
//   3. las formulas con letras NACEN de lo que se busca (x nace de la incognita; la caida nace de la t que falta);
//   4. DESPEJAR t^2 con letras ARRASTRANDO piezas (el 1/2 cruza el igual y pasa a 2; la g pasa dividiendo);
//   5. REEMPLAZAR una letra por vez: el numero y la unidad VUELAN desde su dato (brotes);
//   6. CALCULAR una operacion por paso; las unidades se simplifican de a una (extremos y medios, tachar);
//   7. la RAIZ se resuelve por su significado: "que numero (y que unidad) multiplicado por si mismo da esto?",
//      se escribe 9 = 3·3 y s^2 = s·s, cada pareja se junta en uno (ancla) y la raiz suelta lo que quedo;
//   8. COMPROBAR con la altura del enunciado: la caida con t = 3 s tiene que devolver los 45 m.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas en LaTeX sin $. Barras dobles.
// La animacion no calcula: cada numero que se escribe sale de una cuenta hecha aqui y comprobada en el test.
import { aplanar, frPiezas, pegarUnidades, raiz, sustituir, type Brote, type Ficha, type Fusion, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";
import { nf } from "./generadores-fisica.ts";

// ---------------------------------------------------------------------------
// Utilidades (la misma Hoja y las mismas unidades de generadores-fisica.ts, que no las exporta)

const clon = (e: Ficha[]): Ficha[] => JSON.parse(JSON.stringify(e));
/** la puntuacion que sigue a una formula va FUERA de ella, pegada con un word-joiner (U+2060) que MathText reconoce
 *  (mismo mecanismo que generadores-soluciones.ts): ni sube a la altura de la raya ni queda sola al inicio de un renglon */
const WJ = "⁠";
const pegarPunto = (s: string) => s.replace(/\$([.,;:])/g, `$${WJ}$1`);

class Hoja {
  fichas: Ficha[];
  readonly estados: Ficha[][] = [];
  readonly trans: Transicion[] = [];
  constructor(inicial: Ficha[]) {
    this.fichas = inicial;
    this.estados.push(clon(inicial));
  }
  paso(t: Transicion) {
    this.estados.push(clon(this.fichas));
    this.trans.push(t);
  }
  pieza(id: string): Ficha {
    const f = aplanar(this.fichas).find((x) => x.id === id);
    if (!f) throw new Error(`no existe la pieza ${id}`);
    return f;
  }
  cambiar(viejos: string[], nuevos: Ficha[]) {
    this.fichas = sustituir(this.fichas, viejos, nuevos);
  }
  quitar(...ids: string[]) {
    for (const id of ids) this.cambiar([id], []);
  }
  poner(id: string, parche: Partial<Ficha>) {
    this.cambiar([id], [{ ...this.pieza(id), ...parche }]);
  }
  agregar(fs: Ficha[]) {
    this.fichas = [...this.fichas, ...fs];
  }
  ordenar(ids: string[]) {
    const porId = new Map(this.fichas.map((f) => [f.id, f]));
    if (ids.length !== this.fichas.length || ids.some((id) => !porId.has(id))) throw new Error("ordenar: faltan piezas");
    this.fichas = ids.map((id) => porId.get(id) as Ficha);
  }
}

type U = "m" | "s" | "ms" | "ms2";
/** la unidad para escribirla en un texto (LaTeX) */
const uTex = (u: U) => (u === "ms" ? "\\dfrac{\\text{m}}{\\text{s}}" : u === "ms2" ? "\\dfrac{\\text{m}}{\\text{s}^{2}}" : u === "m" ? "\\text{m}" : "\\text{s}");
/** la unidad como pieza de la hoja; m/s y m/s^2 son fracciones con piezas `<id>n` (arriba) y `<id>d` (abajo), para poder tachar */
function uPieza(id: string, u: U): Ficha {
  if (u === "ms" || u === "ms2") return frPiezas(id, [{ id: `${id}n`, tex: "\\text{m}" }], [{ id: `${id}d`, tex: u === "ms" ? "\\text{s}" : "\\text{s}^{2}" }]);
  return { id, tex: uTex(u) };
}
const cant = (x: number, u: U) => `${nf(x)}\\ ${uTex(u)}`;

type Clave = "h" | "v" | "g" | "t";
const LETRA: Record<Clave, string> = { h: "h", v: "v_{0}", g: "g", t: "t" };
const UNI: Record<Clave, U> = { h: "m", v: "ms", g: "ms2", t: "s" };
// colores de tres cifras: la etiqueta bajo un dato reserva ancho segun la cantidad de letras de su LaTeX
const COLOR: Record<Clave, string> = { h: "#26e", v: "#1a4", g: "#e50", t: "#a3d" };
const col = (k: Clave, tex: string) => `\\textcolor{${COLOR[k]}}{${tex}}`;
const NOMBRE: Record<Exclude<Clave, "t">, string> = {
  h: "la altura desde la que se lanza el objeto",
  v: "la velocidad horizontal con la que sale: la velocidad inicial",
  g: "la aceleración de la gravedad: cuánto aumenta cada segundo la velocidad con la que cae",
};

const CHECK = "\\textcolor{#16a34a}{\\checkmark}";
const REGLA_PRODUCTO = `$(m\\ u)\\cdot(n\\ w)=(m\\cdot n)\\ (u\\cdot w)$`;
const REGLA_TACHAR = `$\\dfrac{u}{w}\\cdot w=u$`;

/** el piso de cada valor que se reemplaza: el numero y la unidad vuelan desde el dato (o desde un resultado) */
function reemplazo(h: Hoja, letraId: string, k: Clave, valor: number, n: string, u: string, origen: { num: string; uni: string }, conParentesis = false) {
  // `conParentesis`: el dato queda como DIVISOR de una fraccion con unidades; (10 m/s^2) entre parentesis se distingue de la raya de la unidad
  const pa: Ficha[] = conParentesis ? [{ id: `${n}pa`, tex: "(" }] : [];
  const pb: Ficha[] = conParentesis ? [{ id: `${n}pb`, tex: ")" }] : [];
  h.cambiar([letraId], [...pa, { id: n, tex: col(k, nf(valor)) }, uPieza(u, UNI[k]), ...pb]);
  return {
    fusion: { desde: [letraId], hacia: [...pa.map((f) => f.id), n, u, ...pb.map((f) => f.id)], modo: "viajar" } as Fusion,
    brotes: [
      { desde: origen.num, hacia: n },
      { desde: origen.uni, hacia: u },
    ] as Brote[],
  };
}

/** tacha unidades de abajo de la fraccion `frac` junto con piezas sueltas; si abajo no queda nada, lo de arriba sale de la raya */
function tachar(h: Hoja, frac: string, abajo: string[], sueltas: string[], nuevoId: string, cortes: string[] = []): { fusiones: Fusion[]; brotes: Brote[] } {
  const f = h.pieza(frac);
  const arriba = f.frac?.nPiezas ?? [];
  if (arriba.length !== 1) throw new Error("tachar: arriba debe quedar una sola pieza");
  h.quitar(...abajo, ...sueltas, ...cortes);
  h.cambiar([frac], [{ id: nuevoId, tex: arriba[0].tex }]);
  return {
    fusiones: [
      { desde: [...abajo, ...sueltas], hacia: null, modo: "tachar" },
      { desde: [frac, arriba[0].id, ...cortes], hacia: nuevoId, modo: "viajar" },
    ],
    brotes: [{ desde: arriba[0].id, hacia: nuevoId }],
  };
}

// ---------------------------------------------------------------------------
// Tiro horizontal

const G = 10;
/** alturas con tiempo de caida entero (t de 2 a 9 s): h = 5 t^2 */
export const ALTURAS_TIRO: number[] = [2, 3, 4, 5, 6, 7, 8, 9].map((t) => 5 * t * t);

export function validarTiro(h: number, v0: number): string | null {
  if (![h, v0].every(Number.isInteger)) return "Escribe números enteros.";
  if (v0 < 1 || v0 > 50) return "La velocidad horizontal debe estar entre 1 y 50 m/s.";
  if (!ALTURAS_TIRO.includes(h)) return `Con g = 10 m/s² el tiempo de caída sale exacto solo con alturas de ${ALTURAS_TIRO.join(", ")} m. Prueba con 45.`;
  return null;
}

/** t = raiz(2h/g) y x = v0·t, con sus unidades y la raiz resuelta por su significado. Comprueba con la altura. */
export function tiroHorizontal(h: number, v0: number, enunciado?: string): Resultado {
  const dosH = 2 * h;
  const t2 = dosH / G; // t al cuadrado (numero)
  const t = Math.sqrt(t2);
  if (!Number.isInteger(t)) throw new Error(`tiroHorizontal: t no es entero para h=${h}`);
  const x = v0 * t;
  const val: Record<Clave, number> = { h, v: v0, g: G, t };
  const tNum = col("t", nf(t));

  const intro =
    enunciado ??
    `Se lanza un objeto horizontalmente con $${cant(v0, "ms")}$ desde una altura de $${cant(h, "m")}$. Usa $g=${cant(G, "ms2")}$. ¿A qué distancia horizontal del punto de lanzamiento cae? Vamos a escribir cada paso, como a lápiz.`;

  const hoja = new Hoja([
    { id: "Dh", tex: nf(h) },
    uPieza("Dhu", "m"),
    { id: "Dc1", tex: ",", op: true },
    { id: "Dv", tex: nf(v0) },
    uPieza("Dvu", "ms"),
    { id: "DS1", tex: "", salto: true },
    { id: "Dg", tex: nf(G) },
    uPieza("Dgu", "ms2"),
    { id: "DS2", tex: "", salto: true },
    { id: "Dq", tex: "x=\\ ?" },
  ]);

  // ---- 1. los datos y por que hay dos movimientos
  hoja.paso({
    fusiones: [],
    resaltar: ["Dh", "Dv", "Dg", "Dq"],
    texto: `Anotamos los datos del enunciado: la altura, la velocidad con la que sale y la gravedad, y lo que piden, $x$. El objeto avanza hacia adelante y cae al mismo tiempo: son dos movimientos que duran lo mismo, el tiempo $t$.`,
    porque: `Como sale horizontal, al principio no tiene velocidad hacia abajo: cae solo por la gravedad. Hacia adelante nada lo frena ni lo empuja, así que esa velocidad no cambia. Todos los datos ya están en metros y segundos, no hay que convertir unidades.`,
    regla: `$\\text{un solo tiempo}\\ t\\ \\text{para la caída y para el avance}$`,
  });

  // ---- 2. etiquetar, de a uno
  for (const k of ["h", "v", "g"] as const) {
    const id = k === "h" ? "Dh" : k === "v" ? "Dv" : "Dg";
    hoja.poner(id, { tex: col(k, nf(val[k])), debajo: col(k, LETRA[k]) });
    hoja.paso({
      fusiones: [],
      resaltar: [id],
      texto: `$${cant(val[k], UNI[k])}$ es ${NOMBRE[k]}. La llamamos $${LETRA[k]}$.`,
      porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
      regla: `$${LETRA[k]}=${cant(val[k], UNI[k])}$`,
    });
  }

  // ---- 3a. el alcance: la formula nace de lo que piden
  const formulaX: Ficha[] = [
    { id: "SA", tex: "", salto: true },
    { id: "Ax", tex: "x" },
    { id: "Ae", tex: "=", op: true },
    { id: "Av", tex: col("v", "v_{0}") },
    { id: "Am", tex: "\\cdot", op: true },
    { id: "At", tex: col("t", "t") },
  ];
  hoja.agregar(formulaX);
  hoja.paso({
    fusiones: [],
    brotes: formulaX.filter((f) => !f.op && !f.salto).map((f) => ({ desde: "Dq", hacia: f.id })),
    texto: `Escribimos debajo cómo se halla el alcance, todavía con letras: lo que avanza es la velocidad horizontal por el tiempo. Pero no conocemos $t$.`,
    porque: `Hacia adelante la velocidad no cambia (es un movimiento uniforme), así que la distancia es velocidad por tiempo.`,
    regla: `$x=v_{0}\\cdot t$`,
  });

  // ---- 3b. el tiempo sale de la caida: primero se anota que falta (t = ?), y de ahi nace la formula
  hoja.agregar([
    { id: "SA2", tex: "", salto: true },
    { id: "Dtq", tex: col("t", "t=\\ ?") },
  ]);
  hoja.paso({
    fusiones: [],
    brotes: [{ desde: "At", hacia: "Dtq" }],
    texto: `En la fórmula del alcance aparece la $t$, y no la conocemos. Anotamos debajo que ahora lo que buscamos es $t$: hay que hallarla antes de calcular $x$.`,
    porque: `Para el alcance hace falta el tiempo. Lo averiguamos con el otro movimiento, la caída.`,
    regla: `$\\text{para hallar}\\ x\\ \\text{hace falta}\\ t$`,
  });
  const formulaCaida: Ficha[] = [
    { id: "SB", tex: "", salto: true },
    { id: "Bh", tex: col("h", "h") },
    { id: "Be", tex: "=", op: true },
    frPiezas("Bf", [{ id: "Bf1", tex: "1" }], [{ id: "Bf2", tex: "2" }]),
    { id: "Bm2", tex: "\\cdot", op: true },
    { id: "Bg", tex: col("g", "g") },
    { id: "Bm3", tex: "\\cdot", op: true },
    { id: "Bt", tex: col("t", "t") },
    { id: "Bs", tex: "2", sup: true },
  ];
  hoja.agregar(formulaCaida);
  hoja.paso({
    fusiones: [],
    brotes: formulaCaida.filter((f) => !f.op && !f.salto).map((f) => ({ desde: "Dtq", hacia: f.id })),
    texto: `Para hallar $t$ usamos la caída. En vertical parte sin velocidad hacia abajo y la gravedad lo hace caer: la altura es la mitad de $g$ por $t$ al cuadrado. Cada letra tiene el color de su dato.`,
    porque: `Como sale horizontal, su velocidad inicial hacia abajo es $0$: por eso en esta fórmula no hay un término de velocidad inicial.`,
    regla: `$h=\\dfrac{1}{2}\\cdot g\\cdot t^{2}$`,
  });

  // ---- 4. despejar t^2 con letras, ARRASTRANDO
  // el 2 de abajo del 1/2 cruza el igual y pasa multiplicando a la h; el 1 de arriba se queda donde estaba (no se pierde: se tacha en el paso siguiente)
  hoja.cambiar(["Bf"], [{ id: "Bu", tex: "1" }]);
  hoja.agregar([
    { id: "Cf", tex: "2" },
    { id: "Cm", tex: "\\cdot", op: true },
  ]);
  {
    const ids = hoja.fichas.map((f) => f.id).filter((i) => i !== "Cf" && i !== "Cm");
    ids.splice(ids.indexOf("Bh"), 0, "Cf", "Cm");
    hoja.ordenar(ids);
  }
  hoja.paso({
    fusiones: [{ desde: ["Bf", "Bf1", "Bf2"], hacia: ["Bu", "Cf"], modo: "viajar" }],
    brotes: [
      { desde: "Bf1", hacia: "Bu" },
      { desde: "Bf2", hacia: "Cf" },
    ],
    texto: `Pasamos el $\\dfrac{1}{2}$ al lado izquierdo. El $2$ de abajo estaba dividiendo y al cruzar la igualdad pasa multiplicando: va junto a la $h$. En el lado derecho queda el $1$ de arriba.`,
    porque: `Es lo mismo que multiplicar por $2$ los dos lados: a la derecha el $2$ cancela al $2$ de abajo y a la izquierda queda escrito multiplicando.`,
    regla: `$c=\\dfrac{1}{2}\\cdot b\\ \\Rightarrow\\ 2\\cdot c=1\\cdot b$`,
  });
  // el 1 que sobra se tacha junto con su punto
  hoja.quitar("Bu", "Bm2");
  hoja.paso({
    fusiones: [{ desde: ["Bu", "Bm2"], hacia: null, modo: "tachar" }],
    texto: `Del lado derecho queda $1\\cdot g\\cdot t^{2}$. Multiplicar por $1$ no cambia nada: el $1$ se tacha junto con su punto.`,
    porque: `Un factor $1$ no cambia el producto: $1\\cdot g$ es lo mismo que $g$.`,
    regla: `$1\\cdot a=a$`,
  });
  // la g pasa dividiendo: lo de la izquierda queda arriba de la raya y la g abajo
  hoja.cambiar(["Cf"], [frPiezas("BR", [{ id: "Rf", tex: "2" }, { id: "Rm", tex: "\\cdot", op: true }, { id: "Rh", tex: col("h", "h") }], [{ id: "Rg", tex: col("g", "g") }])]);
  hoja.quitar("Cm", "Bh", "Bg", "Bm3");
  hoja.paso({
    fusiones: [{ desde: ["Cf", "Cm", "Bh", "Bg", "Bm3"], hacia: "BR", modo: "viajar" }],
    brotes: [
      { desde: "Cf", hacia: "Rf" },
      { desde: "Bh", hacia: "Rh" },
      { desde: "Bg", hacia: "Rg" },
    ],
    texto: `La $g$ multiplica a $t^{2}$: pasa al otro lado dividiendo, debajo de todo lo que hay ahí.`,
    porque: `Es lo mismo que dividir los dos lados entre $g$: a la derecha $g$ se cancela y queda $t^{2}$ sola.`,
    regla: `$a\\cdot c=b\\ \\Rightarrow\\ c=\\dfrac{b}{a}$`,
  });
  {
    const cola = ["Bt", "Bs", "Be", "BR"];
    hoja.ordenar(hoja.fichas.map((f) => f.id).filter((i) => !cola.includes(i)).concat(cola));
  }
  hoja.paso({
    fusiones: [],
    resaltar: ["Bt", "BR"],
    texto: `Damos vuelta la igualdad para que $t^{2}$ quede a la izquierda: $t^{2}=\\dfrac{2\\cdot h}{g}$.`,
    porque: `Una igualdad dice lo mismo leída de izquierda a derecha que de derecha a izquierda.`,
    regla: `$a=b\\ \\iff\\ b=a$`,
  });

  // ---- 5. reemplazar una letra por vez (los valores vuelan desde sus datos)
  {
    const r = reemplazo(hoja, "Rh", "h", h, "Nh", "Uh", { num: "Dh", uni: "Dhu" });
    hoja.paso({
      fusiones: [r.fusion],
      brotes: r.brotes,
      texto: `Reemplazamos $h$ por $${cant(h, "m")}$: el número y la unidad salen del dato y ocupan el lugar de la letra. El $2$ de la fórmula se queda.`,
      porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
      regla: `$h=${cant(h, "m")}$`,
    });
  }
  {
    const r = reemplazo(hoja, "Rg", "g", G, "Ng", "Ug", { num: "Dg", uni: "Dgu" }, true);
    hoja.paso({
      fusiones: [r.fusion],
      brotes: r.brotes,
      texto: `Reemplazamos $g$ por $${cant(G, "ms2")}$: el número y la unidad salen del dato y van abajo de la raya, entre paréntesis para que se lea como un solo divisor.`,
      porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
      regla: `$g=${cant(G, "ms2")}$`,
    });
  }

  // ---- 6. calcular: arriba 2·h, luego dividir, luego las unidades
  hoja.cambiar(["Rf"], [{ id: "N2h", tex: nf(dosH) }]);
  hoja.quitar("Rm", "Nh");
  hoja.paso({
    fusiones: [{ desde: ["Rf", "Rm", "Nh"], hacia: "N2h" }],
    texto: `Primero la multiplicación de arriba. Multiplicamos los números: $2\\cdot ${h}=${nf(dosH)}$. La unidad espera su turno.`,
    porque: `En física se multiplican los números entre sí y las unidades entre sí.`,
    regla: REGLA_PRODUCTO,
  });
  hoja.quitar("N2h", "Ng");
  hoja.cambiar(["BR"], [{ id: "Nt2", tex: nf(t2) }, { ...hoja.pieza("BR") }]);
  hoja.paso({
    fusiones: [{ desde: ["N2h", "Ng"], hacia: "Nt2" }],
    texto: `Dividimos los números: $\\dfrac{${nf(dosH)}}{${G}}=${nf(t2)}$. Las unidades quedan en su fracción, para simplificarlas aparte.`,
    porque: `Los números se dividen entre sí y las unidades entre sí.`,
    regla: `$\\dfrac{m\\ u}{n\\ w}=\\dfrac{m}{n}\\cdot\\dfrac{u}{w}$`,
  });
  // unidades: m / (m/s^2) = (m·s^2) / m   (extremos y medios: primero se SEÑALAN, despues cada pieza viaja a su lugar)
  // los extremos quedan marcados (destacada) mientras dure el proceso: quietos, el gesto de `resaltar` no se ve
  hoja.poner("Uh", { destacada: true });
  hoja.poner("Ugd", { destacada: true });
  hoja.paso({
    fusiones: [],
    resaltar: ["Uh", "Ugd"],
    texto: `Ahora las unidades: $\\text{m}$ dividida entre la fracción $\\dfrac{\\text{m}}{\\text{s}^{2}}$. Primero señalamos los extremos, que son los de afuera: la $\\text{m}$ de arriba y la $\\text{s}^{2}$ de abajo del todo.`,
    porque: `En una división de este tipo se llaman extremos a la primera y a la última pieza, y medios a las que quedan en el centro.`,
    regla: `$\\text{extremos: la primera y la última pieza}$`,
  });
  hoja.poner("Ugn", { destacada: true });
  hoja.paso({
    fusiones: [],
    resaltar: ["Ugn"],
    texto: `El medio es el que queda adentro: la $\\text{m}$ de arriba de la fracción de abajo. Los extremos siguen marcados.`,
    porque: `Extremos arriba y medios abajo es la forma de resolver una fracción que tiene otra fracción adentro.`,
    regla: `$\\text{medios: las piezas del centro}$`,
  });
  hoja.cambiar(
    ["BR"],
    [
      frPiezas(
        "UG",
        [
          { id: "g1", tex: "\\text{m}" },
          { id: "gx1", tex: "\\cdot", op: true },
          { id: "g2", tex: "\\text{s}^{2}" },
        ],
        [{ id: "g3", tex: "\\text{m}" }]
      ),
    ]
  );
  hoja.paso({
    fusiones: [{ desde: ["BR", "Uh", "Ug", "Ugn", "Ugd", "Ngpa", "Ngpb"], hacia: "UG", modo: "viajar" }],
    brotes: [
      { desde: "Uh", hacia: "g1" },
      { desde: "Ugd", hacia: "g2" },
      { desde: "Ugn", hacia: "g3" },
    ],
    texto: `Extremos arriba y medios abajo: arriba va el producto de los extremos, $\\text{m}\\cdot\\text{s}^{2}$, y abajo va el medio, $\\text{m}$.`,
    porque: `Dividir entre una fracción es multiplicar por esa fracción dada vuelta.`,
    regla: `$\\dfrac{\\;a\\;}{\\dfrac{b}{c}}=\\dfrac{a\\cdot c}{b}$`,
  });
  hoja.quitar("g1", "gx1", "g3");
  hoja.cambiar(["UG"], [{ id: "Us2", tex: "\\text{s}^{2}" }]);
  hoja.paso({
    fusiones: [
      { desde: ["g1", "gx1", "g3"], hacia: null, modo: "tachar" },
      { desde: ["UG", "g2"], hacia: "Us2", modo: "viajar" },
    ],
    brotes: [{ desde: "g2", hacia: "Us2" }],
    texto: `El $\\text{m}$ de arriba se tacha con el $\\text{m}$ de abajo. Queda $\\text{s}^{2}$: segundos al cuadrado. Entonces $t^{2}=${nf(t2)}\\ \\text{s}^{2}$.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
    regla: REGLA_TACHAR,
  });

  // ---- 7. la raiz, por su significado
  // 7a. el exponente 2 viaja al otro lado y se vuelve raiz (lo de la derecha se mete adentro)
  hoja.cambiar(["Nt2", "Us2"], [raiz("Rz", [hoja.pieza("Nt2"), hoja.pieza("Us2")])]);
  hoja.quitar("Bs");
  hoja.paso({
    fusiones: [{ desde: ["Bs"], hacia: "Rz", modo: "viajar" }],
    brotes: [{ desde: "Bs", hacia: "Rz" }],
    texto: `Buscamos $t$, no $t^{2}$. El exponente $2$ pasa al otro lado y se vuelve raíz cuadrada de todo lo que hay ahí: $t=\\sqrt{${nf(t2)}\\ \\text{s}^{2}}$.`,
    porque: `Es lo mismo que sacar raíz cuadrada a los dos lados: a la izquierda la raíz deshace el cuadrado y queda $t$ sola. Como $t$ es un tiempo, nos quedamos solo con el valor positivo.`,
    regla: `$t^{2}=b\\ \\Rightarrow\\ t=\\sqrt{b}$`,
  });
  // 7b. que significa la raiz
  hoja.paso({
    fusiones: [],
    resaltar: ["Nt2", "Us2"],
    texto: `Antes de resolverla, recordamos qué es la raíz cuadrada: el número que, multiplicado por sí mismo, da lo de adentro. Buscamos qué número por sí mismo da $${nf(t2)}$ y qué unidad por sí misma da $\\text{s}^{2}$.`,
    porque: `La raíz cuadrada deshace al cuadrado: pregunta "¿qué se multiplicó por sí mismo para llegar aquí?". Con las unidades pasa igual.`,
    regla: `$\\sqrt{a}=b\\ \\iff\\ b\\cdot b=a$`,
  });
  // 7b2. el tanteo se ESCRIBE en la hoja: cada prueba es una pieza; se para donde el producto da justo lo de adentro
  // de a DOS pruebas por pieza (un renglon cada una): con t = 9 son 5 renglones en vez de 8, y el tanteo se sigue viendo entero
  const parejas = Array.from({ length: Math.ceil(t / 2) }, (_, i) => i + 1);
  const idsPrueba = ["SQ", ...parejas.map((p) => `Z${p}`)];
  const prueba = (k: number) => `${k}\\cdot ${k}=${k * k}${k < t ? "," : ""}`;
  hoja.agregar([
    { id: "SQ", tex: "", salto: true },
    // la coma que separa va dentro de la prueba (como pieza suelta se iba sola al inicio de un renglon)
    ...parejas.map((p): Ficha => ({ id: `Z${p}`, tex: `\\small ${[2 * p - 1, 2 * p].filter((k) => k <= t).map(prueba).join("\\ \\ ")}` })),
  ]);
  hoja.paso({
    fusiones: [],
    brotes: parejas.map((p) => ({ desde: "Nt2", hacia: `Z${p}` })),
    texto: `Probamos con los números en orden, uno por uno, y escribimos cuánto da cada uno multiplicado por sí mismo, hasta llegar a $${nf(t2)}$.`,
    porque: `Cuando un número por sí mismo da menos que lo de adentro, hay que probar con el siguiente. Paramos cuando da justo lo que buscamos.`,
    regla: `$\\sqrt{a}=b\\ \\iff\\ b\\cdot b=a$`,
  });
  hoja.paso({
    fusiones: [],
    resaltar: [`Z${Math.ceil(t / 2)}`, "Nt2"],
    texto: `El último intento, $${nf(t)}\\cdot ${nf(t)}=${nf(t2)}$, da justo $${nf(t2)}$. ${t === 2 ? "El anterior dio menos y por eso seguimos." : "Los anteriores daban menos y por eso seguimos."} Entonces el número que buscamos es el $${nf(t)}$.`,
    porque: `El número que, multiplicado por sí mismo, da lo de adentro es el que la raíz va a devolver.`,
    regla: `$b\\cdot b=a\\ \\Rightarrow\\ \\sqrt{a}=b$`,
  });
  hoja.quitar(...idsPrueba);
  hoja.paso({
    fusiones: [{ desde: idsPrueba, hacia: null }],
    texto: `Ya encontramos el número, así que borramos las pruebas.`,
    porque: `Las pruebas ya cumplieron su trabajo: solo sirvieron para hallar el $${nf(t)}$.`,
    regla: `$b\\cdot b=a\\ \\Rightarrow\\ \\sqrt{a}=b$`,
  });
  // 7c. el numero se escribe como producto de dos iguales (y queda multiplicando a la unidad)
  hoja.cambiar(["Nt2"], [{ id: "Qa", tex: nf(t) }, { id: "Qx", tex: "\\cdot", op: true }, { id: "Qb", tex: nf(t) }, { id: "Qm", tex: "\\cdot", op: true }]);
  hoja.paso({
    fusiones: [{ desde: ["Nt2"], hacia: ["Qa", "Qx", "Qb", "Qm"] }],
    descompone: true,
    texto: `Como $${nf(t)}\\cdot ${nf(t)}=${nf(t2)}$, escribimos $${nf(t2)}$ como $${nf(t)}\\cdot ${nf(t)}$.`,
    porque: `El número que buscamos es el que se repite en el producto.`,
    regla: `$n=b\\cdot b$`,
  });
  // 7d. la unidad, igual
  hoja.cambiar(["Us2"], [{ id: "Sa", tex: "\\text{s}" }, { id: "Sx", tex: "\\cdot", op: true }, { id: "Sb", tex: "\\text{s}" }]);
  hoja.paso({
    fusiones: [{ desde: ["Us2"], hacia: ["Sa", "Sx", "Sb"] }],
    descompone: true,
    texto: `La unidad igual: $\\text{s}^{2}$ es $\\text{s}\\cdot\\text{s}$.`,
    porque: `El exponente $2$ dice que la unidad está multiplicada dos veces.`,
    regla: `$\\text{s}^{2}=\\text{s}\\cdot\\text{s}$`,
  });
  // 7e. reconocer las dos parejas
  hoja.paso({
    fusiones: [],
    resaltar: ["Qa", "Qb", "Sa", "Sb"],
    texto: `Hay dos parejas de iguales: los dos $${nf(t)}$ y las dos $\\text{s}$.`,
    porque: `La raíz cuadrada saca un factor por cada pareja de factores iguales que hay adentro.`,
    regla: `$\\sqrt{b\\cdot b}=b$`,
  });
  // 7f. cada pareja se junta en uno
  hoja.quitar("Qx", "Qb", "Sx", "Sb");
  hoja.paso({
    fusiones: [
      { desde: ["Qx", "Qb"], hacia: null, ancla: "Qa" },
      { desde: ["Sx", "Sb"], hacia: null, ancla: "Sa" },
    ],
    texto: `Cada pareja cuenta como uno solo: los dos $${nf(t)}$ se juntan en un $${nf(t)}$ y las dos $\\text{s}$ en una $\\text{s}$. Lo que queda dentro de la raíz todavía no es el valor de $t$: es lo que la raíz va a soltar.`,
    porque: `Lo que se repite no desaparece: se queda uno de cada pareja, y es el que va a salir de la raíz.`,
    regla: `$\\sqrt{b\\cdot b}=b$`,
  });
  // 7g. la raiz suelta lo que quedo
  hoja.cambiar(["Rz"], [{ id: "T3", tex: tNum }, { id: "Ts", tex: "\\text{s}" }]);
  hoja.paso({
    fusiones: [{ desde: ["Rz", "Qa", "Qm", "Sa"], hacia: ["T3", "Ts"], modo: "viajar" }],
    brotes: [
      { desde: "Qa", hacia: "T3" },
      { desde: "Sa", hacia: "Ts" },
    ],
    texto: `La raíz ya hizo su trabajo y suelta lo que quedó: el $${nf(t)}$ y la $\\text{s}$. Resultado: $t=${cant(t, "s")}$.`,
    porque: `Por eso el tiempo de caída sale en segundos: $\\text{s}$ es la unidad que, multiplicada por sí misma, da $\\text{s}^{2}$.`,
    regla: `$t=${cant(t, "s")}$`,
  });

  // ---- 8. con t ya conocido, volver a la formula del alcance y reemplazar
  {
    const r = reemplazo(hoja, "Av", "v", v0, "Nv", "Uv", { num: "Dv", uni: "Dvu" });
    hoja.paso({
      fusiones: [r.fusion],
      brotes: r.brotes,
      texto: `Volvemos a la fórmula del alcance, $x=v_{0}\\cdot t$. Reemplazamos $v_{0}$ por $${cant(v0, "ms")}$: el número y la unidad salen del dato.`,
      porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
      regla: `$v_{0}=${cant(v0, "ms")}$`,
    });
  }
  {
    const r = reemplazo(hoja, "At", "t", t, "Nt", "Ut", { num: "T3", uni: "Ts" });
    hoja.paso({
      fusiones: [r.fusion],
      brotes: r.brotes,
      texto: `Reemplazamos $t$ por $${cant(t, "s")}$: el número y la unidad salen del resultado que acabamos de hallar.`,
      porque: `El tiempo que sale de la caída es el mismo tiempo que dura el avance.`,
      regla: `$t=${cant(t, "s")}$`,
    });
  }
  hoja.cambiar(["Nv"], [{ id: "Nx", tex: nf(x) }]);
  hoja.quitar("Nt");
  hoja.paso({
    fusiones: [{ desde: ["Nv", "Nt"], hacia: "Nx" }],
    texto: `Multiplicamos los números: $${v0}\\cdot ${t}=${nf(x)}$. Las unidades esperan su turno.`,
    porque: `En física se multiplican los números entre sí y las unidades entre sí.`,
    regla: REGLA_PRODUCTO,
  });
  {
    const ta = tachar(hoja, "Uv", ["Uvd"], ["Am", "Ut"], "Um");
    hoja.paso({
      ...ta,
      texto: `Ahora sus unidades: la $\\text{s}$ de abajo se tacha con la $\\text{s}$ que multiplica. Queda $\\text{m}$, una distancia. Resultado: $x=${cant(x, "m")}$.`,
      porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
      regla: REGLA_TACHAR,
    });
  }

  // ---- 9. comprobar con la altura del enunciado: la formula de la caida se escribe de nuevo CON LETRAS y se reemplaza una letra por vez, con sus unidades
  const t9 = t * t;
  const gt = G * t9;
  hoja.agregar([
    { id: "KS", tex: "", salto: true },
    { id: "Kq", tex: "\\footnotesize\\text{Comprobación:}" },
  ]);
  hoja.paso({
    fusiones: [],
    brotes: [{ desde: "T3", hacia: "Kq" }],
    texto: `Ya tenemos $t=${cant(t, "s")}$. Para saber si está bien, lo usamos en la fórmula de la caída: tiene que volver a salir la altura del enunciado, $${cant(h, "m")}$. Lo escribimos debajo.`,
    porque: `Si el tiempo está bien, al caer ese tiempo el objeto recorre justo la altura del enunciado.`,
    regla: `$\\text{con el}\\ t\\ \\text{hallado, la caída da}\\ h$`,
  });
  hoja.agregar([
    { id: "KS2", tex: "", salto: true },
    { id: "Kh", tex: col("h", "h") },
    // corte fijo de todo el tramo: la altura arriba y la igualdad abajo (cortes vacios, nunca con texto)
    { id: "KS3", tex: "", salto: true },
    { id: "Ke", tex: "=", op: true },
    { id: "Kf", tex: "\\dfrac{1}{2}" },
    { id: "Km1", tex: "\\cdot", op: true },
    { id: "Kg", tex: col("g", "g") },
    { id: "Km2", tex: "\\cdot", op: true },
    { id: "KS4", tex: "", salto: true },
    { id: "Kt", tex: col("t", "t") },
    { id: "Ks", tex: "2", sup: true },
  ]);
  hoja.paso({
    fusiones: [],
    brotes: ["Kh", "Kf", "Kg", "Kt", "Ks"].map((id) => ({ desde: "Kq", hacia: id })),
    texto: `Escribimos la fórmula de la caída, todavía con letras: la altura es la mitad de $g$ por $t$ al cuadrado. Cada letra tiene el color de su dato.`,
    porque: `Es la misma fórmula con la que despejamos $t$; ahora la usamos al derecho, con el $t$ ya conocido.`,
    regla: `$h=\\dfrac{1}{2}\\cdot g\\cdot t^{2}$`,
  });
  {
    const r = reemplazo(hoja, "Kh", "h", h, "Wh", "Whu", { num: "Dh", uni: "Dhu" });
    hoja.paso({
      fusiones: [r.fusion],
      brotes: r.brotes,
      texto: `Reemplazamos $h$ por $${cant(h, "m")}$, la altura del enunciado: es el valor que tiene que volver a salir en el otro lado.`,
      porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
      regla: `$h=${cant(h, "m")}$`,
    });
  }
  {
    const r = reemplazo(hoja, "Kg", "g", G, "Wg", "Wgu", { num: "Dg", uni: "Dgu" });
    hoja.paso({
      fusiones: [r.fusion],
      brotes: r.brotes,
      texto: `Reemplazamos $g$ por $${cant(G, "ms2")}$: el número y la unidad salen del dato.`,
      porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
      regla: `$g=${cant(G, "ms2")}$`,
    });
  }
  // la t esta elevada al cuadrado: va entre parentesis con su unidad (se eleva todo)
  hoja.cambiar(["Kt"], [{ id: "Wp", tex: `(${tNum}\\ \\text{s})` }]);
  hoja.paso({
    fusiones: [{ desde: ["Kt"], hacia: "Wp", modo: "viajar" }],
    brotes: [{ desde: "T3", hacia: "Wp" }],
    texto: `Reemplazamos $t$ por $${cant(t, "s")}$, el tiempo que hallamos. Como $t$ está al cuadrado, va entre paréntesis: se eleva el número y la unidad.`,
    porque: `En $t^{2}$ el dato va entre paréntesis, porque se eleva al cuadrado todo: el número y la unidad.`,
    regla: `$t=${cant(t, "s")}$`,
  });
  hoja.cambiar(["Wp", "Ks"], [{ id: "W3", tex: nf(t) }, { id: "W3s", tex: "2", sup: true }, { id: "Wus2", tex: "\\text{s}^{2}", pegado: true }]);
  hoja.paso({
    fusiones: [{ desde: ["Wp", "Ks"], hacia: ["W3", "W3s", "Wus2"] }],
    descompone: true,
    texto: `El cuadrado afecta al número y a la unidad: $(${nf(t)}\\ \\text{s})^{2}=${nf(t)}^{2}\\ \\text{s}^{2}$.`,
    porque: `Elevar al cuadrado un producto es elevar cada uno de sus factores.`,
    regla: `$(m\\cdot u)^{2}=m^{2}\\cdot u^{2}$`,
  });
  hoja.cambiar(["W3", "W3s"], [{ id: "W33", tex: `${nf(t)}\\cdot ${nf(t)}` }]);
  hoja.paso({
    fusiones: [{ desde: ["W3", "W3s"], hacia: "W33" }],
    descompone: true,
    texto: `Primero el cuadrado: $${nf(t)}^{2}$ es $${nf(t)}\\cdot ${nf(t)}$.`,
    porque: `El exponente $2$ dice cuántas veces se escribe el número en la multiplicación.`,
    regla: `$n^{2}=n\\cdot n$`,
  });
  hoja.cambiar(["W33"], [{ id: "W9", tex: nf(t9) }]);
  hoja.paso({
    fusiones: [{ desde: ["W33"], hacia: "W9" }],
    texto: `Multiplicamos: $${nf(t)}\\cdot ${nf(t)}=${nf(t9)}$.`,
    porque: `Un positivo por un positivo da positivo.`,
    regla: `$m\\cdot n=p$`,
  });
  hoja.cambiar(["Wg"], [{ id: "Wgt", tex: nf(gt) }]);
  hoja.quitar("W9");
  hoja.paso({
    fusiones: [{ desde: ["Wg", "W9"], hacia: "Wgt" }],
    texto: `Quedan tres números que se multiplican: $\\dfrac{1}{2}$, $${G}$ y $${nf(t9)}$. Se hace de dos en dos: primero $${G}\\cdot ${nf(t9)}=${nf(gt)}$, y el $\\dfrac{1}{2}$ espera. Las unidades esperan su turno.`,
    porque: `El orden en que se multiplica no cambia el resultado: elegimos el que da números enteros.`,
    regla: `$\\dfrac{1}{2}\\cdot a\\cdot b=\\dfrac{1}{2}\\cdot(a\\cdot b)$`,
  });
  {
    const ta = tachar(hoja, "Wgu", ["Wgud"], ["Km2", "Wus2"], "Wum", ["KS4"]);
    hoja.paso({
      ...ta,
      texto: `Ahora las unidades: la $\\text{s}^{2}$ de abajo se tacha con la $\\text{s}^{2}$ que multiplica. Queda $\\text{m}$, una distancia.`,
      porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
      regla: REGLA_TACHAR,
    });
  }
  hoja.cambiar(["Kf"], [{ id: "Wmit", tex: nf(gt / 2) }]);
  hoja.quitar("Km1", "Wgt");
  hoja.paso({
    fusiones: [{ desde: ["Kf", "Km1", "Wgt"], hacia: "Wmit" }],
    texto: `Multiplicar por $\\dfrac{1}{2}$ es sacar la mitad: la mitad de $${nf(gt)}$ es $${nf(gt / 2)}$.`,
    porque: `$\\dfrac{1}{2}$ de algo es partirlo en dos partes iguales y quedarse con una.`,
    regla: `$\\dfrac{1}{2}\\cdot n=\\dfrac{n}{2}$`,
  });
  hoja.agregar([{ id: "Kok", tex: CHECK }]);
  hoja.paso({
    fusiones: [],
    brotes: [{ desde: "Ke", hacia: "Kok" }],
    resaltar: ["Wh", "Wmit"],
    texto: `Los dos lados dan $${cant(h, "m")}$, la altura del enunciado: el tiempo de caída es correcto. El objeto cae a $x=${cant(x, "m")}$ del punto de lanzamiento.`,
    porque: `Al volver a calcular la altura con el tiempo que hallamos, sale la del enunciado: la cuenta está bien.`,
    regla: `$h=\\dfrac{1}{2}\\cdot g\\cdot t^{2}$`,
  });

  const ret = {
    intro: pegarPunto(intro),
    estados: hoja.estados.map(pegarUnidades),
    transiciones: hoja.trans.map((tr) => ({ ...tr, texto: pegarPunto(tr.texto), porque: pegarPunto(tr.porque), ...(tr.regla ? { regla: pegarPunto(tr.regla) } : {}) })),
  };
  return { demo: { titulo: "", nota: "", ...ret }, resumen: { h, v0, g: G, t, x } };
}
