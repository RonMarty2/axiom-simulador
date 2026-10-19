// Generador de Fisica: segunda ley de Newton (hallar la aceleracion), con el patron "ANOTAR Y REEMPLAZAR":
//   1. los datos del enunciado tal como vienen (numero y unidad, cada uno su pieza) y POR QUE se usa esa ley;
//   2. ETIQUETAR debajo de cada dato su letra, de a una y con su color;
//   3. si hay dos fuerzas opuestas: la formula de la fuerza neta NACE de los datos (F = F1 - F2), se reemplaza y se resta;
//   4. la segunda ley F = m·a NACE de los datos con letras (cada letra sale de su dato), y se DESPEJA la a arrastrando piezas;
//   5. REEMPLAZAR una letra por vez: el numero y la unidad VUELAN desde el dato al lugar de la letra;
//   6. CALCULAR una operacion por paso: los numeros se dividen y las unidades se simplifican de a una (N = kg·m/s^2);
//   7. COMPROBAR con los datos del enunciado: m·a tiene que dar la fuerza.
// Regla nueva (Ronald): en Fisica los datos del enunciado se vuelven formulas a la vista; nada aparece de la nada.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas y etiquetas en LaTeX sin $. Barras dobles.
// La animacion no calcula: cada numero que se escribe sale de una cuenta hecha aqui y comprobada en el test.
import { aplanar, frPiezas, pegarUnidades, sustituir, type Brote, type Ficha, type Fusion, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

const clon = (e: Ficha[]): Ficha[] => JSON.parse(JSON.stringify(e));

/** La hoja: las fichas que se ven ahora, y la lista de estados y transiciones que se va armando. */
class Hoja {
  fichas: Ficha[];
  readonly estados: Ficha[][] = [];
  readonly trans: Transicion[] = [];
  constructor(inicial: Ficha[]) {
    this.fichas = inicial;
    this.estados.push(clon(inicial));
  }
  /** fija el estado actual de la hoja como el resultado de la transicion `t` */
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
  /** reordena las fichas de primer nivel (las mismas piezas, en otro orden: viajan) */
  ordenar(ids: string[]) {
    const porId = new Map(this.fichas.map((f) => [f.id, f]));
    if (ids.length !== this.fichas.length || ids.some((id) => !porId.has(id))) throw new Error("ordenar: faltan piezas");
    this.fichas = ids.map((id) => porId.get(id) as Ficha);
  }
}

const CHECK = "\\textcolor{#16a34a}{\\checkmark}";
const KG = "\\text{kg}";
const NEWTON = "\\text{N}";
const MS2 = "\\dfrac{\\text{m}}{\\text{s}^{2}}";

type Rol = "m" | "F" | "F1" | "F2";
// colores de tres cifras por rol (se ven en tema claro y oscuro, y la etiqueta cabe bajo el dato)
const COLOR: Record<Rol, string> = { m: "#25e", F: "#1a4", F1: "#93c", F2: "#e60" };
const LETRA: Record<Rol, string> = { m: "m", F: "F", F1: "F_{1}", F2: "F_{2}" };
const col = (r: Rol, tex: string) => `\\textcolor{${COLOR[r]}}{${tex}}`;
const kg = (n: number) => `${n}\\ ${KG}`;
const nw = (n: number) => `${n}\\ ${NEWTON}`;

export function validarDinamica(m: number, F: number, Fop: number = 0): string | null {
  if (![m, F, Fop].every(Number.isInteger)) return "Escribe números enteros.";
  if (m < 1 || m > 50) return "La masa debe estar entre 1 y 50 kg.";
  if (F < 1 || F > 1000) return "La fuerza debe estar entre 1 y 1000 N.";
  if (Fop < 0 || Fop > 999) return "La fuerza en contra debe estar entre 0 y 999 N (pon 0 si no hay).";
  if (Fop === F) return "Si las dos fuerzas son iguales se cancelan: la fuerza neta es 0 y no hay aceleración. Cambia una de las dos.";
  if (Fop > F) return "La fuerza que va a favor debe ser mayor que la que va en contra, para que el cuerpo acelere hacia adelante.";
  if ((F - Fop) % m !== 0) return "Con estos números la aceleración no sale entera. Prueba, por ejemplo, masa 4, fuerza 20 y fuerza en contra 0.";
  return null;
}

/**
 * Segunda ley de Newton: a = F / m. Con `Fop = 0` la fuerza `F` es la fuerza neta; con `Fop > 0` hay dos fuerzas
 * opuestas (`F` a favor y `Fop` en contra) y primero se resta para hallar la fuerza neta.
 */
export function dinamica(m: number, F: number, Fop: number = 0, enunciado?: string): Resultado {
  const dos = Fop > 0;
  const neta = F - Fop;
  const a = neta / m;

  // fila de datos: la masa y la(s) fuerza(s), cada numero con su unidad en una pieza aparte
  const inicial: Ficha[] = dos
    ? [
        { id: "Dm", tex: `${m}` },
        { id: "Dmu", tex: KG },
        { id: "Sd", tex: "", salto: true },
        { id: "D1", tex: `${F}` },
        // la flecha va pegada a la unidad: apunta a favor (derecha) o en contra (izquierda) del movimiento
        { id: "D1u", tex: `${NEWTON}\\,\\rightarrow` },
        { id: "Dc", tex: ",", op: true },
        { id: "D2", tex: `${Fop}` },
        { id: "D2u", tex: `${NEWTON}\\,\\leftarrow` },
        { id: "Sq", tex: "", salto: true },
        { id: "Dq", tex: "a=\\ ?" },
      ]
    : [
        { id: "Dm", tex: `${m}` },
        { id: "Dmu", tex: KG },
        { id: "Dc", tex: ",", op: true },
        { id: "D1", tex: `${F}` },
        { id: "D1u", tex: NEWTON },
        { id: "Sq", tex: "", salto: true },
        { id: "Dq", tex: "a=\\ ?" },
      ];
  const h = new Hoja(inicial);
  const intro =
    enunciado ??
    (dos
      ? `Un cuerpo de $${kg(m)}$ es empujado hacia adelante con una fuerza de $${nw(F)}$, mientras otra fuerza de $${nw(Fop)}$ actúa en sentido contrario. ¿Qué aceleración adquiere? Vamos a escribir cada paso, como a lápiz.`
      : `Sobre un cuerpo de $${kg(m)}$ actúa una fuerza neta de $${nw(F)}$. ¿Qué aceleración adquiere? Vamos a escribir cada paso, como a lápiz.`);

  // 1. los datos tal como vienen, y por que se usa la segunda ley
  h.paso({
    fusiones: [],
    resaltar: dos ? ["Dm", "D1", "D2", "Dq"] : ["Dm", "D1", "Dq"],
    texto: dos
      ? `Anotamos los datos del enunciado y lo que piden, $a$. Hay dos fuerzas en sentidos contrarios, y la flecha de cada una lo muestra: $\\rightarrow$ va a favor del movimiento y $\\leftarrow$ va en contra. Lo que cuenta es la fuerza neta, la que queda al restarlas. Con ella se usa la segunda ley de Newton.`
      : `Anotamos los datos del enunciado y lo que piden, $a$. Una fuerza neta que actúa sobre un cuerpo con masa le cambia la velocidad: eso lo explica la segunda ley de Newton.`,
    porque: `Todos los datos ya están en kilogramos y newtons, así que no hay que convertir unidades.`,
    regla: `$F=m\\cdot a$`,
  });

  // 2. etiquetar, de a uno
  const etiquetas: { id: string; rol: Rol; num: number; texto: string; porque: string }[] = [
    { id: "Dm", rol: "m", num: m, texto: `$${kg(m)}$ es la masa: cuánta materia tiene el cuerpo. La llamamos $m$.`, porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.` },
  ];
  if (dos) {
    etiquetas.push(
      { id: "D1", rol: "F1", num: F, texto: `$${nw(F)}$ es la fuerza que empuja hacia adelante, a favor del movimiento (flecha $\\rightarrow$). La llamamos $F_{1}$.`, porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.` },
      { id: "D2", rol: "F2", num: Fop, texto: `$${nw(Fop)}$ es la fuerza que se opone al movimiento, en contra (flecha $\\leftarrow$). La llamamos $F_{2}$.`, porque: `Va con otra letra porque apunta en sentido contrario: por eso más adelante se va a restar.` }
    );
  } else {
    etiquetas.push({ id: "D1", rol: "F", num: F, texto: `$${nw(F)}$ es la fuerza neta: la fuerza total que actúa sobre el cuerpo. La llamamos $F$.`, porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.` });
  }
  for (const e of etiquetas) {
    h.poner(e.id, { tex: col(e.rol, `${e.num}`), debajo: col(e.rol, LETRA[e.rol]) });
    h.paso({
      fusiones: [],
      resaltar: [e.id],
      texto: e.texto,
      porque: e.porque,
      regla: `$${LETRA[e.rol]}=${e.rol === "m" ? kg(e.num) : nw(e.num)}$`,
    });
  }

  // 3. dos fuerzas: la fuerza neta nace de los datos con letras, se reemplaza y se resta
  // (de donde sale el numero y la unidad de la fuerza neta que usa despues la segunda ley)
  let origenF = { num: "D1", uni: "D1u" };
  if (dos) {
    h.agregar([
      { id: "Sn", tex: "", salto: true },
      { id: "Gn", tex: col("F", "F") },
      { id: "Gne", tex: "=", op: true },
      { id: "Gp1", tex: col("F1", "F_{1}") },
      { id: "Gmi", tex: "-", op: true },
      { id: "Gp2", tex: col("F2", "F_{2}") },
    ]);
    h.paso({
      fusiones: [],
      // la fuerza neta sale de las dos fuerzas; el signo menos sale de la que va en contra (flecha $\leftarrow$)
      brotes: [
        { desde: "D1", hacia: "Sn" },
        { desde: "D1", hacia: "Gn" },
        { desde: "D1", hacia: "Gp1" },
        { desde: "D2", hacia: "Gmi" },
        { desde: "D2", hacia: "Gp2" },
      ],
      texto: `Antes de usar la segunda ley necesitamos la fuerza neta, $F$: la que queda al restarle a la fuerza que empuja la que se opone. La escribimos debajo, con letras: la $F$ y la $F_{1}$ salen de la fuerza a favor, y la $F_{2}$ y el signo menos salen de la fuerza en contra, la de la flecha $\\leftarrow$. Cada letra tiene el color de su dato.`,
      porque: `Dos fuerzas en sentidos contrarios se restan: la mayor gana, y la diferencia es la fuerza que de verdad mueve al cuerpo. El signo menos viene de la fuerza que va en contra.`,
      regla: `$F=F_{1}-F_{2}$`,
    });
    for (const [rol, letraId, n, u, dato, datoU, valor] of [
      ["F1", "Gp1", "Nn1", "Un1", "D1", "D1u", F],
      ["F2", "Gp2", "Nn2", "Un2", "D2", "D2u", Fop],
    ] as const) {
      h.cambiar([letraId], [{ id: n, tex: col(rol, `${valor}`) }, { id: u, tex: NEWTON }]);
      h.paso({
        fusiones: [{ desde: [letraId], hacia: [n, u], modo: "viajar" } as Fusion],
        brotes: [
          { desde: dato, hacia: n },
          { desde: datoU, hacia: u },
        ] as Brote[],
        texto: `Reemplazamos $${LETRA[rol]}$ por $${nw(valor)}$: el número y la unidad salen del dato y ocupan el lugar de la letra.`,
        porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
        regla: `$${LETRA[rol]}=${nw(valor)}$`,
      });
    }
    h.cambiar(["Nn1"], [{ id: "Nn", tex: `${neta}` }]);
    h.quitar("Gmi", "Nn2", "Un2");
    h.paso({
      fusiones: [
        { desde: ["Nn1", "Gmi", "Nn2"], hacia: "Nn" },
        { desde: ["Un2"], hacia: null, ancla: "Un1" },
      ],
      texto: `Las dos fuerzas tienen la misma unidad, $${NEWTON}$: restamos los números, $${F}-${Fop}=${neta}$, y la unidad queda una sola vez. Resultado: $F=${nw(neta)}$.`,
      porque: `Solo se pueden restar cantidades de la misma unidad, como newtons con newtons.`,
      regla: `$p\\ u-q\\ u=(p-q)\\ u$`,
    });
    origenF = { num: "Nn", uni: "Un1" };
  }

  // 4. la segunda ley nace de los datos con letras (cada letra sale de su dato)
  h.agregar([
    { id: "Sl", tex: "", salto: true },
    { id: "Lf", tex: col("F", "F") },
    { id: "Le", tex: "=", op: true },
    { id: "Lm", tex: col("m", "m") },
    { id: "Lx", tex: "\\cdot", op: true },
    { id: "La", tex: "a" },
  ]);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "Dq", hacia: "Sl" },
      { desde: dos ? "Gn" : "D1", hacia: "Lf" },
      { desde: "Dm", hacia: "Lm" },
      { desde: "Dq", hacia: "La" },
    ],
    texto: dos
      ? `Escribimos debajo la segunda ley de Newton, todavía con letras. La $F$ es la fuerza neta que acabamos de calcular, la $m$ sale de la masa y la $a$ de lo que buscamos.`
      : `Escribimos debajo la segunda ley de Newton, todavía con letras. La $F$ sale de la fuerza neta, la $m$ de la masa y la $a$ de lo que buscamos.`,
    porque: `La fuerza neta sobre un cuerpo es su masa por la aceleración que adquiere: con más masa hace falta más fuerza para lograr la misma aceleración.`,
    regla: `$F=m\\cdot a$`,
  });

  // despejar la a, arrastrando piezas: la m pasa dividiendo debajo de la F
  h.cambiar(["Lf"], [frPiezas("FR", [{ id: "Gf", tex: col("F", "F") }], [{ id: "Gm", tex: col("m", "m") }])]);
  h.quitar("Lm", "Lx");
  h.paso({
    fusiones: [{ desde: ["Lf", "Lm", "Lx"], hacia: "FR", modo: "viajar" }],
    brotes: [
      { desde: "Lf", hacia: "Gf" },
      { desde: "Lm", hacia: "Gm" },
    ],
    texto: `Buscamos la $a$, que no está sola: la $m$ la multiplica. La $m$ pasa al otro lado dividiendo, debajo de la $F$.`,
    porque: `Es lo mismo que dividir los dos lados entre $m$: a la derecha $m$ se cancela y queda $a$ sola.`,
    regla: `$m\\cdot a=F\\ \\Rightarrow\\ a=\\dfrac{F}{m}$`,
  });
  h.ordenar(
    h.fichas
      .map((f) => f.id)
      .filter((id) => !["FR", "Le", "La"].includes(id))
      .concat(["La", "Le", "FR"])
  );
  h.paso({
    fusiones: [],
    resaltar: ["La", "FR"],
    texto: `Damos vuelta la igualdad para que $a$ quede a la izquierda: $a=\\dfrac{F}{m}$.`,
    porque: `Una igualdad dice lo mismo leída de izquierda a derecha que de derecha a izquierda.`,
    regla: `$a=b\\iff b=a$`,
  });

  // 5. reemplazar de a una letra (el numero y la unidad vuelan desde el dato)
  h.cambiar(["Gf"], [{ id: "Nf", tex: col("F", `${neta}`) }, { id: "Uf", tex: NEWTON }]);
  h.paso({
    fusiones: [{ desde: ["Gf"], hacia: ["Nf", "Uf"], modo: "viajar" }],
    brotes: [
      { desde: origenF.num, hacia: "Nf" },
      { desde: origenF.uni, hacia: "Uf" },
    ],
    texto: dos
      ? `Reemplazamos $F$ por la fuerza neta que calculamos, $${nw(neta)}$: el número y la unidad ocupan el lugar de la letra.`
      : `Reemplazamos $F$ por $${nw(neta)}$: el número y la unidad salen del dato y ocupan el lugar de la letra.`,
    porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
    regla: `$F=${nw(neta)}$`,
  });
  // con masa 1 el "1" no cambia nada al dividir: no se escribe y solo baja la unidad (se dice en una frase)
  const unoMasa = m === 1;
  if (unoMasa) {
    h.cambiar(["Gm"], [{ id: "Um", tex: KG }]);
    h.paso({
      fusiones: [{ desde: ["Gm"], hacia: ["Um"], modo: "viajar" }],
      brotes: [{ desde: "Dmu", hacia: "Um" }],
      texto: `Reemplazamos $m$ por $${kg(m)}$: como el número es $1$ y dividir entre $1$ no cambia nada, escribimos solo la unidad. Sale del dato y va debajo de la raya.`,
      porque: `Dividir entre $1$ deja el número igual, así que ese $1$ no hace falta. La unidad sí, para simplificarla después.`,
      regla: `$\\dfrac{n}{1}=n$`,
    });
  } else {
    h.cambiar(["Gm"], [{ id: "Nm", tex: col("m", `${m}`) }, { id: "Um", tex: KG }]);
    h.paso({
      fusiones: [{ desde: ["Gm"], hacia: ["Nm", "Um"], modo: "viajar" }],
      brotes: [
        { desde: "Dm", hacia: "Nm" },
        { desde: "Dmu", hacia: "Um" },
      ],
      texto: `Reemplazamos $m$ por $${kg(m)}$: el número y la unidad salen del dato. Va debajo de la raya.`,
      porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
      regla: `$m=${kg(m)}$`,
    });
  }

  // 6. calcular: primero los numeros, despues las unidades de a una
  h.cambiar(["FR"], [{ id: "Na", tex: `${a}` }, { ...h.pieza("FR") }]);
  h.quitar(...(unoMasa ? ["Nf"] : ["Nf", "Nm"]));
  h.paso({
    fusiones: [{ desde: unoMasa ? ["Nf"] : ["Nf", "Nm"], hacia: "Na" }],
    texto: unoMasa
      ? `El número de arriba, $${neta}$, ya está solo: no hay nada que dividir, así que ese es el número de la aceleración. Las unidades quedan en su fracción, para simplificarlas aparte.`
      : `Dividimos los números: $\\dfrac{${neta}}{${m}}=${a}$. Las unidades quedan en su fracción, para simplificarlas aparte.`,
    porque: `Los números se dividen entre sí y las unidades entre sí.`,
    regla: unoMasa ? `$\\dfrac{p\\ u}{w}=p\\cdot\\dfrac{u}{w}$` : `$\\dfrac{p\\ u}{q\\ w}=\\dfrac{p}{q}\\cdot\\dfrac{u}{w}$`,
  });
  // el newton esta hecho de kg, m y s: se escribe asi para poder simplificar
  h.cambiar(
    ["Uf"],
    [
      frPiezas(
        "UN",
        [
          { id: "Uk", tex: KG },
          { id: "Ux", tex: "\\cdot", op: true },
          { id: "Uma", tex: "\\text{m}" },
        ],
        [{ id: "Us", tex: "\\text{s}^{2}" }]
      ),
    ]
  );
  h.paso({
    fusiones: [{ desde: ["Uf"], hacia: "UN" }],
    descompone: true,
    texto: `Para simplificar las unidades hay que saber qué es un newton: la fuerza que le da a $${kg(1)}$ una aceleración de $1\\ ${MS2}$. Por eso $${NEWTON}=\\dfrac{${KG}\\cdot\\text{m}}{\\text{s}^{2}}$. Ojo: aquí $\\text{m}$ es metros y $\\text{s}$ es segundos; no es la $m$ de la masa.`,
    porque: `El newton no es una unidad suelta: está hecho de kilogramos, metros y segundos, y por eso se puede simplificar con los kilogramos de la masa.`,
    regla: `$1\\ ${NEWTON}=1\\ ${KG}\\cdot${MS2}$`,
  });
  // fraccion entre kg: queda el mismo numerador y el kg se suma al denominador (cada pieza viaja a su lugar)
  h.cambiar(
    ["FR"],
    [
      frPiezas(
        "UG",
        [
          { id: "g1", tex: KG },
          { id: "gx1", tex: "\\cdot", op: true },
          { id: "g2", tex: "\\text{m}" },
        ],
        [
          { id: "g3", tex: "\\text{s}^{2}" },
          { id: "gx2", tex: "\\cdot", op: true },
          { id: "g4", tex: KG },
        ]
      ),
    ]
  );
  h.paso({
    fusiones: [{ desde: ["FR", "UN", "Uk", "Ux", "Uma", "Us", "Um"], hacia: "UG", modo: "viajar" }],
    brotes: [
      { desde: "Uk", hacia: "g1" },
      { desde: "Uma", hacia: "g2" },
      { desde: "Us", hacia: "g3" },
      { desde: "Um", hacia: "g4" },
    ],
    texto: `Ahora las unidades. Dividir una fracción entre $${KG}$ es dejar el mismo numerador y multiplicar el denominador por $${KG}$: el $${KG}$ de abajo pasa a multiplicar a $\\text{s}^{2}$.`,
    porque: `Dividir entre $${KG}$ es multiplicar por $\\dfrac{1}{${KG}}$: los de arriba se multiplican entre sí y los de abajo también.`,
    regla: `$\\dfrac{\\;\\dfrac{a}{b}\\;}{c}=\\dfrac{a}{b\\cdot c}$`,
  });
  h.quitar("g1", "gx1", "gx2", "g4");
  h.paso({
    fusiones: [{ desde: ["g1", "gx1", "gx2", "g4"], hacia: null, modo: "tachar" }],
    texto: `El $${KG}$ de arriba se tacha con el $${KG}$ de abajo. Queda $${MS2}$: metros por segundo al cuadrado, una aceleración. Resultado: $a=${a}\\ ${MS2}$.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha. Que termine en metros sobre segundo al cuadrado confirma que buscábamos una aceleración.`,
    regla: `$\\dfrac{u\\cdot w}{v\\cdot u}=\\dfrac{w}{v}$`,
  });

  // 7. comprobar con los datos del enunciado: m·a tiene que dar la fuerza, tambien en unidades
  // (el kg, el m/s^2 y el N se copian junto al numero: la cuenta se hace con unidades)
  const ladoDerecho: Ficha[] = [
    { id: "Cm", tex: `${m}` },
    { id: "Cmu", tex: KG },
    { id: "Cx", tex: "\\cdot", op: true },
    { id: "Ca", tex: `${a}` },
    { id: "Cau", tex: MS2 },
  ];
  const brotesDerecho: Brote[] = [
    { desde: "Dm", hacia: "Cm" },
    { desde: "Dmu", hacia: "Cmu" },
    { desde: "Na", hacia: "Ca" },
    { desde: "UG", hacia: "Cau" },
  ];
  if (dos) {
    h.agregar([
      { id: "Sc", tex: "", salto: true },
      { id: "C1", tex: `${F}` },
      { id: "C1u", tex: NEWTON },
      { id: "Cmi", tex: "-", op: true },
      { id: "C2", tex: `${Fop}` },
      { id: "C2u", tex: NEWTON },
      { id: "Ce", tex: "=", op: true },
      ...ladoDerecho,
    ]);
    h.paso({
      fusiones: [],
      brotes: [
        { desde: "Na", hacia: "Sc" },
        { desde: "D1", hacia: "C1" },
        { desde: "D1u", hacia: "C1u" },
        { desde: "D2", hacia: "C2" },
        { desde: "D2u", hacia: "C2u" },
        ...brotesDerecho,
      ],
      texto: `Comprobamos con la segunda ley: la fuerza neta, $F_{1}-F_{2}$, tiene que ser igual a la masa por la aceleración, $m\\cdot a$. Copiamos las fuerzas y la masa del enunciado, cada una con su unidad, y la aceleración que salió, $${a}\\ ${MS2}$.`,
      porque: `Si la aceleración está bien, al multiplicarla por la masa se vuelve a la fuerza neta del enunciado.`,
      regla: `$F_{1}-F_{2}=m\\cdot a$`,
    });
    h.cambiar(["C1"], [{ id: "Cn", tex: `${neta}` }]);
    h.quitar("Cmi", "C2", "C2u");
    h.paso({
      fusiones: [
        { desde: ["C1", "Cmi", "C2"], hacia: "Cn" },
        { desde: ["C2u"], hacia: null, ancla: "C1u" },
      ],
      texto: `A la izquierda restamos: $${F}-${Fop}=${neta}$, y el newton queda una sola vez.`,
      porque: `Es la fuerza neta, la que queda al restar la que se opone. Los newtons se restan con newtons.`,
      regla: `$p\\ u-q\\ u=(p-q)\\ u$`,
    });
  } else {
    h.agregar([
      { id: "Sc", tex: "", salto: true },
      { id: "Cf", tex: `${neta}` },
      { id: "Cfu", tex: NEWTON },
      { id: "Ce", tex: "=", op: true },
      ...ladoDerecho,
    ]);
    h.paso({
      fusiones: [],
      brotes: [
        { desde: "Na", hacia: "Sc" },
        { desde: "D1", hacia: "Cf" },
        { desde: "D1u", hacia: "Cfu" },
        ...brotesDerecho,
      ],
      texto: `Comprobamos con la segunda ley: la masa por la aceleración tiene que dar la fuerza del enunciado, $${nw(neta)}$. Copiamos la fuerza y la masa del enunciado, cada una con su unidad, y la aceleración que salió, $${a}\\ ${MS2}$.`,
      porque: `Si la aceleración está bien, al multiplicarla por la masa se vuelve a la fuerza del enunciado.`,
      regla: `$F=m\\cdot a$`,
    });
  }
  // a la derecha: los numeros se multiplican y las unidades kg·m/s^2 se reescriben como newton
  h.cambiar(["Cm"], [{ id: "Cp", tex: `${m * a}` }]);
  h.quitar("Ca");
  const fusNumeros: Fusion = { desde: ["Cm", "Ca"], hacia: "Cp" };
  if (unoMasa) {
    // con masa 1 multiplicar no cambia el numero: se dice en una frase y las unidades se reescriben en el mismo paso
    h.cambiar(["Cmu"], [{ id: "Cun", tex: NEWTON }]);
    h.quitar("Cx", "Cau");
    h.paso({
      fusiones: [fusNumeros, { desde: ["Cmu", "Cx", "Cau"], hacia: "Cun" }],
      texto: `A la derecha, multiplicar por $1$ no cambia el número: queda $${a}$. Y las unidades, $${KG}\\cdot${MS2}$, son justamente un newton: $${NEWTON}$.`,
      porque: `El newton es la unidad de la fuerza, hecha de $${KG}\\cdot${MS2}$. Por eso la unidad también cuadra con la del enunciado.`,
      regla: `$${KG}\\cdot${MS2}=${NEWTON}$`,
    });
  } else {
    h.paso({
      fusiones: [fusNumeros],
      texto: `A la derecha multiplicamos los números: $${m}\\cdot ${a}=${m * a}$. Las unidades se quedan como están, para reescribirlas aparte.`,
      porque: `Un positivo por un positivo da positivo. Los números se multiplican entre sí y las unidades entre sí.`,
      regla: `$p\\cdot q=r$`,
    });
    h.cambiar(["Cmu"], [{ id: "Cun", tex: NEWTON }]);
    h.quitar("Cx", "Cau");
    h.paso({
      fusiones: [{ desde: ["Cmu", "Cx", "Cau"], hacia: "Cun" }],
      texto: `Ahora las unidades de la derecha: $${KG}\\cdot${MS2}$ es justamente un newton, $${NEWTON}$.`,
      porque: `El newton es la unidad de la fuerza, hecha de kilogramos por metros sobre segundo al cuadrado. Por eso la unidad también cuadra con la del enunciado.`,
      regla: `$${KG}\\cdot${MS2}=${NEWTON}$`,
    });
  }
  h.agregar([{ id: "Cok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Ce", hacia: "Cok" }],
    resaltar: [dos ? "Cn" : "Cf", "Cp"],
    texto: `Los dos lados dan $${nw(neta)}$: la aceleración cumple la segunda ley. La respuesta es $a=${a}\\ ${MS2}$.`,
    porque: `Al volver a calcular la fuerza con el resultado, sale la del enunciado: la cuenta está bien.`,
    regla: `$F=m\\cdot a$`,
  });

  return {
    demo: { titulo: "", nota: "", intro, estados: h.estados.map(pegarUnidades), transiciones: h.trans },
    resumen: { m, F, Fop, neta, a },
  };
}
