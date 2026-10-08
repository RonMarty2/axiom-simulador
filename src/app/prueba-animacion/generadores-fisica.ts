// Generadores de Fisica (piloto): MRUV y ley de Charles, con el patron "ANOTAR Y REEMPLAZAR":
//   1. los datos del enunciado tal como vienen (numero y unidad, cada uno su pieza) y POR QUE se usa esa ley;
//   2. ORDENAR antes de reemplazar: "parte del reposo" es 0, "frena" es aceleracion negativa,
//      los grados Celsius pasan a kelvin (+273) y las presiones a la misma unidad (factor de conversion);
//   3. ETIQUETAR debajo de cada dato su letra, de a una y con su color;
//   4. la FORMULA con letras debajo (nace de la incognita), y si hace falta se DESPEJA con letras, arrastrando piezas;
//   5. REEMPLAZAR una letra por vez: el numero y la unidad VUELAN desde el dato (brotes) al lugar de la letra;
//   6. CALCULAR una operacion por paso: numeros con numeros, y las unidades se TACHAN de a una;
//   7. COMPROBAR con los datos del enunciado (salvo en la distancia del MRUV, ver el informe del agente).
// Los datos quedan arriba hasta el final: son la fila de referencia de la que nace la comprobacion.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas y etiquetas en LaTeX sin $. Barras dobles.
// La animacion no calcula: cada numero que se escribe sale de una cuenta hecha aqui y comprobada en el test.
import { aplanar, frPiezas, sustituir, type Brote, type Ficha, type Fusion, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

// ---------------------------------------------------------------------------
// Utilidades comunes

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
  /** cambia las piezas contiguas `viejos` por `nuevos` (a cualquier profundidad) */
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

/** numero para mostrar, con coma decimal (notacion del colegio): 1,25 */
export const nf = (x: number): string => {
  const r = Math.round(x * 1000) / 1000;
  const s = String(Math.abs(r)).replace(".", "{,}");
  return r < 0 ? `-${s}` : s;
};
/** un negativo que va despues de un signo se escribe entre parentesis */
const par = (x: number) => (x < 0 ? `(${nf(x)})` : nf(x));
/** cuantos decimales tiene x (hasta 6) */
const decimales = (x: number) => {
  for (let k = 0; k <= 6; k++) if (Math.abs(x * 10 ** k - Math.round(x * 10 ** k)) < 1e-9) return k;
  return 99;
};

const CHECK = "\\textcolor{#16a34a}{\\checkmark}";

// Unidades. Las de velocidad y aceleracion son fracciones CON PIEZAS (el m arriba y la s abajo), para poder tachar.
type U = "m" | "s" | "s2" | "ms" | "ms2" | "mL" | "L" | "K" | "C" | "atm" | "torr" | "mmHg";
const SIMPLE: Record<Exclude<U, "ms" | "ms2">, string> = {
  m: "\\text{m}",
  s: "\\text{s}",
  s2: "\\text{s}^{2}",
  mL: "\\text{mL}",
  L: "\\text{L}",
  K: "\\text{K}",
  C: "{}^{\\circ}\\text{C}",
  atm: "\\text{atm}",
  torr: "\\text{torr}",
  mmHg: "\\text{mmHg}",
};
/** la unidad para escribirla en un texto (LaTeX) */
const uTex = (u: U) => (u === "ms" ? "\\dfrac{\\text{m}}{\\text{s}}" : u === "ms2" ? "\\dfrac{\\text{m}}{\\text{s}^{2}}" : SIMPLE[u]);
/** la unidad como pieza de la hoja; m/s y m/s^2 son fracciones con piezas `<id>n` (arriba) y `<id>d` (abajo) */
function uPieza(id: string, u: U): Ficha {
  if (u === "ms" || u === "ms2") return frPiezas(id, [{ id: `${id}n`, tex: "\\text{m}" }], [{ id: `${id}d`, tex: u === "ms" ? "\\text{s}" : "\\text{s}^{2}" }]);
  return { id, tex: SIMPLE[u] };
}
/** cantidad con su unidad para un texto: 10 m/s */
const cant = (x: number, u: U) => `${nf(x)}\\ ${uTex(u)}`;

// ---------------------------------------------------------------------------
// MRUV: comun a velocidad final, distancia y tiempo

type Clave = "v0" | "vf" | "a" | "t";
const LETRA: Record<Clave, string> = { v0: "v_{0}", vf: "v_{f}", a: "a", t: "t" };
const UNI: Record<Clave, U> = { v0: "ms", vf: "ms", a: "ms2", t: "s" };
// colores por rol, los mismos de la formula general (se ven en tema claro y oscuro)
const COLOR: Record<Clave, string> = { v0: "#2563eb", a: "#16a34a", t: "#ea580c", vf: "#9333ea" };
const col = (k: Clave, tex: string) => `\\textcolor{${COLOR[k]}}{${tex}}`;
const NOMBRE: Record<Clave, string> = {
  v0: "la velocidad con la que empieza: la velocidad inicial",
  vf: "la velocidad con la que termina: la velocidad final",
  a: "cuánto cambia la velocidad en cada segundo: la aceleración",
  t: "cuánto dura el movimiento: el tiempo",
};

/** fila de datos tal como los da el enunciado: numero y unidad son piezas distintas (cada una viaja a su lugar) */
function filaDatos(orden: Clave[], val: Record<Clave, number>, incognita: string): Ficha[] {
  const fs: Ficha[] = [];
  for (const k of orden) {
    if ((k === "v0" || k === "vf") && val[k] === 0) fs.push({ id: `D${k}w`, tex: k === "v0" ? "\\text{parte del reposo}" : "\\text{se detiene}" });
    else if (k === "a" && val.a < 0) fs.push({ id: "Daw", tex: `\\text{frena}\\ ${nf(-val.a)}` }, uPieza("Dau", "ms2"));
    else fs.push({ id: `D${k}`, tex: nf(val[k]) }, uPieza(`D${k}u`, UNI[k]));
    fs.push({ id: `Dc${k}`, tex: ",", op: true });
  }
  fs.push({ id: "Dq", tex: `${incognita}=\\ ?` });
  return fs;
}

/** pasos 1 a 3 del MRUV: por que MRUV, ordenar (reposo, frena) y etiquetar cada dato con su letra */
function inicioMruv(h: Hoja, orden: Clave[], val: Record<Clave, number>, incognita: string) {
  const datos = orden.map((k) => (h.fichas.some((f) => f.id === `D${k}`) ? `D${k}` : `D${k}w`));
  h.paso({
    fusiones: [],
    resaltar: [...datos, "Dq"],
    texto: `Anotamos los datos del enunciado y lo que piden, $${incognita}$. La velocidad cambia, así que es un movimiento con aceleración (MRUV): no sirve $d=v\\cdot t$, que es solo para velocidad constante.`,
    porque: `En el MRUV la velocidad cambia lo mismo en cada segundo. Todos los datos ya están en metros y segundos, así que no hay que convertir unidades.`,
    regla: `$\\text{MRUV}:\\ a\\ \\text{constante}$`,
  });
  // ordenar: las palabras del enunciado se vuelven numeros
  for (const k of orden) {
    if ((k === "v0" || k === "vf") && val[k] === 0) {
      h.cambiar([`D${k}w`], [{ id: `D${k}`, tex: "0" }, uPieza(`D${k}u`, "ms")]);
      h.paso({
        fusiones: [{ desde: [`D${k}w`], hacia: [`D${k}`, `D${k}u`] }],
        texto:
          k === "v0"
            ? `"Parte del reposo" quiere decir que al principio está quieto: su velocidad inicial es $${cant(0, "ms")}$.`
            : `"Se detiene" quiere decir que al final queda quieto: su velocidad final es $${cant(0, "ms")}$.`,
        porque: `Un cuerpo quieto no avanza: su velocidad es cero. Es un dato aunque el enunciado no escriba el número.`,
        regla: `$\\text{quieto}\\ \\Rightarrow\\ v=0$`,
      });
    }
    if (k === "a" && val.a < 0) {
      h.cambiar(["Daw"], [{ id: "Da", tex: nf(val.a) }]);
      h.paso({
        fusiones: [{ desde: ["Daw"], hacia: "Da" }],
        texto: `"Frena" quiere decir que la velocidad baja: la aceleración va en contra del movimiento y se escribe con signo menos, $${cant(val.a, "ms2")}$.`,
        porque: `Si la velocidad sube, la aceleración es positiva; si baja, es negativa.`,
        regla: `$\\text{frena}\\ \\Rightarrow\\ a<0$`,
      });
    }
  }
  // etiquetar, de a uno
  for (const k of orden) {
    h.poner(`D${k}`, { tex: col(k, nf(val[k])), debajo: col(k, LETRA[k]) });
    h.paso({
      fusiones: [],
      resaltar: [`D${k}`],
      texto: `$${cant(val[k], UNI[k])}$ es ${NOMBRE[k]}. La llamamos $${LETRA[k]}$.`,
      porque:
        k === "a" && val.a < 0
          ? `El signo menos es parte del dato: viaja con él a la fórmula.`
          : val[k] === 0
            ? `Aunque valga $0$, es un dato: también va a la fórmula.`
            : `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
      regla: `$${LETRA[k]}=${cant(val[k], UNI[k])}$`,
    });
  }
}

/** la formula nace de la incognita (Dq): un brote por cada pieza que no es operador */
function nacerFormula(h: Hoja, piezas: Ficha[], texto: string, porque: string, regla: string) {
  h.agregar(piezas);
  h.paso({
    fusiones: [],
    brotes: piezas.filter((f) => !f.op).map((f) => ({ desde: "Dq", hacia: f.id })),
    texto,
    porque,
    regla,
  });
}

/** reemplaza la letra `letraId` por el numero y la unidad del dato `k`: los dos vuelan desde el dato */
function reemplazo(h: Hoja, letraId: string, k: Clave, val: number, n: string, u: string, conPar: boolean) {
  h.cambiar([letraId], [{ id: n, tex: col(k, conPar ? par(val) : nf(val)) }, uPieza(u, UNI[k])]);
  return {
    fusion: { desde: [letraId], hacia: [n, u], modo: "viajar" } as Fusion,
    brotes: [
      { desde: `D${k}`, hacia: n },
      { desde: `D${k}u`, hacia: u },
    ] as Brote[],
  };
}

const textoReemplazo = (k: Clave, val: number, extra = "") =>
  `Reemplazamos $${LETRA[k]}$ por $${cant(val, UNI[k])}$: el número y la unidad salen del dato y ocupan el lugar de la letra.${extra}`;
const porqueReemplazo = (val: number) =>
  val < 0 ? `Como el número es negativo, va entre paréntesis para que su signo no se confunda con una resta.` : `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`;

/**
 * Tacha unidades. `sueltas` son piezas que se van (el punto, la s que multiplica); `abajo` es la pieza del
 * denominador de la fraccion `frac` que se tacha. Si la fraccion se queda sin nada abajo, lo de arriba sale de la
 * raya y queda como pieza `nuevoId` (viaja, no aparece).
 */
function tachar(h: Hoja, frac: string, abajo: string[], sueltas: string[], nuevoId: string | null): { fusiones: Fusion[]; brotes?: Brote[] } {
  const f = h.pieza(frac);
  const quedaAbajo = (f.frac?.dPiezas ?? []).filter((p) => !abajo.includes(p.id));
  const fusiones: Fusion[] = [{ desde: [...abajo, ...sueltas], hacia: null, modo: "tachar" }];
  h.quitar(...abajo, ...sueltas);
  if (quedaAbajo.length > 0 || !nuevoId) return { fusiones };
  const arriba = f.frac?.nPiezas ?? [];
  if (arriba.length !== 1) throw new Error("tachar: arriba debe quedar una sola pieza");
  h.cambiar([frac], [{ id: nuevoId, tex: arriba[0].tex }]);
  fusiones.push({ desde: [frac, arriba[0].id], hacia: nuevoId, modo: "viajar" });
  return { fusiones, brotes: [{ desde: arriba[0].id, hacia: nuevoId }] };
}

const REGLA_PRODUCTO = `$(m\\ u)\\cdot(n\\ w)=(m\\cdot n)\\ (u\\cdot w)$`;
const REGLA_TACHAR = `$\\dfrac{u}{w}\\cdot w=u$`;
const REGLA_SUMA_UNIDAD = `$m\\ u+n\\ u=(m+n)\\ u$`;
const porqueSignoProducto = (x: number, y: number) =>
  x < 0 && y < 0
    ? `Un negativo por un negativo da positivo.`
    : x < 0 || y < 0
      ? `Un negativo por un positivo da negativo.`
      : `En física se multiplican los números entre sí y las unidades entre sí.`;

// ---------------------------------------------------------------------------
// MRUV 1: velocidad final, v_f = v_0 + a·t

export function validarMruvVelocidad(v0: number, a: number, t: number): string | null {
  if (![v0, a, t].every(Number.isInteger)) return "Escribe números enteros.";
  if (v0 < 0 || v0 > 50) return "La velocidad inicial debe estar entre 0 y 50 m/s.";
  if (a === 0) return "Con aceleración 0 la velocidad no cambia: eso es MRU, no MRUV.";
  if (Math.abs(a) > 10) return "La aceleración debe estar entre -10 y 10 m/s².";
  if (t < 1 || t > 20) return "El tiempo debe estar entre 1 y 20 s.";
  if (v0 + a * t < 0) return "Con estos números el móvil se detendría antes de ese tiempo. Usa un tiempo más corto o una aceleración menor.";
  return null;
}

/** v_f = v_0 + a·t con sus unidades; comprueba con la definicion de aceleracion */
export function mruvVelocidad(v0: number, a: number, t: number, enunciado?: string): Resultado {
  const val: Record<Clave, number> = { v0, a, t, vf: v0 + a * t };
  const at = a * t;
  const vf = val.vf;
  const h = new Hoja(filaDatos(["v0", "a", "t"], val, "v_{f}"));
  const intro = enunciado ?? `Un móvil ${v0 === 0 ? "parte del reposo" : `va a $${cant(v0, "ms")}$`} y ${a < 0 ? "frena" : "acelera"} a razón de $${cant(Math.abs(a), "ms2")}$ durante $${cant(t, "s")}$. ¿Con qué velocidad termina? Vamos a escribir cada paso, como a lápiz.`;
  inicioMruv(h, ["v0", "a", "t"], val, "v_{f}");

  nacerFormula(
    h,
    [
      { id: "S", tex: "", salto: true },
      { id: "Fvf", tex: "v_{f}" },
      { id: "Fe", tex: "=", op: true },
      { id: "Fv0", tex: col("v0", "v_{0}") },
      { id: "Fp", tex: "+", op: true },
      { id: "Fa", tex: col("a", "a") },
      { id: "Fm", tex: "\\cdot", op: true },
      { id: "Ft", tex: col("t", "t") },
    ],
    `Escribimos debajo la fórmula que da la velocidad final, todavía con letras. Cada letra tiene el color de su dato.`,
    `A la velocidad del principio se le suma lo que cambió: $a$ en cada segundo, durante $t$ segundos.`,
    `$v_{f}=v_{0}+a\\cdot t$`
  );

  for (const [k, letra] of [["v0", "Fv0"], ["a", "Fa"], ["t", "Ft"]] as const) {
    const r = reemplazo(h, letra, k, val[k], `N${k}`, `U${k}`, k === "a");
    h.paso({ fusiones: [r.fusion], brotes: r.brotes, texto: textoReemplazo(k, val[k]), porque: porqueReemplazo(val[k]), regla: `$${LETRA[k]}=${cant(val[k], UNI[k])}$` });
  }

  // a·t: numeros
  h.cambiar(["Na"], [{ id: "Nat", tex: par(at) }]);
  h.quitar("Nt");
  h.paso({
    fusiones: [{ desde: ["Na", "Nt"], hacia: "Nat" }],
    texto: `Primero la multiplicación. Multiplicamos los números: $${par(a)}\\cdot ${t}=${nf(at)}$. Las unidades esperan su turno.`,
    porque: porqueSignoProducto(a, t),
    regla: REGLA_PRODUCTO,
  });
  // a·t: unidades. s^2 = s·s y se tacha una s
  h.cambiar(["Uad"], [{ id: "Uad1", tex: "\\text{s}" }, { id: "Uadx", tex: "\\cdot", op: true }, { id: "Uad2", tex: "\\text{s}" }]);
  h.paso({
    fusiones: [{ desde: ["Uad"], hacia: ["Uad1", "Uadx", "Uad2"] }],
    descompone: true,
    texto: `Ahora las unidades. Para poder tachar, escribimos $\\text{s}^{2}$ como $\\text{s}\\cdot\\text{s}$.`,
    porque: `El exponente $2$ dice que la unidad está multiplicada dos veces.`,
    regla: `$\\text{s}^{2}=\\text{s}\\cdot\\text{s}$`,
  });
  const t1 = tachar(h, "Ua", ["Uad2", "Uadx"], ["Fm", "Ut"], null);
  h.paso({
    ...t1,
    texto: `Una $\\text{s}$ de abajo se tacha con la $\\text{s}$ que multiplica. Queda $${uTex("ms")}$, una velocidad.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
    regla: `$\\dfrac{u}{w\\cdot w}\\cdot w=\\dfrac{u}{w}$`,
  });
  // signos: sumar un negativo es restar
  let mas = "Fp";
  let nat = "Nat";
  if (at < 0) {
    h.cambiar(["Fp"], [{ id: "Fpm", tex: "-", op: true }]);
    h.cambiar(["Nat"], [{ id: "Nat2", tex: nf(-at) }]);
    h.paso({
      fusiones: [{ desde: ["Fp", "Nat"], hacia: ["Fpm", "Nat2"] }],
      texto: `Cuidamos los signos: sumar un negativo es restar, $+${par(at)}=-${nf(-at)}$.`,
      porque: `Más por menos da menos.`,
      regla: `$+(-n)=-n$`,
    });
    mas = "Fpm";
    nat = "Nat2";
  }
  // la suma: misma unidad
  h.cambiar(["Nv0"], [{ id: "Nvf", tex: nf(vf) }]);
  h.quitar(mas, nat, "Ua");
  h.paso({
    fusiones: [
      { desde: ["Nv0", mas, nat], hacia: "Nvf" },
      { desde: ["Ua"], hacia: null, ancla: "Uv0" },
    ],
    texto: `Las dos velocidades tienen la misma unidad, $${uTex("ms")}$: ${at < 0 ? "restamos" : "sumamos"} los números, $${v0}${at < 0 ? "-" : "+"}${nf(Math.abs(at))}=${nf(vf)}$, y la unidad queda una sola vez. Resultado: $v_{f}=${cant(vf, "ms")}$.`,
    porque: `Solo se pueden sumar cantidades de la misma unidad, como metros con metros.`,
    regla: REGLA_SUMA_UNIDAD,
  });

  // comprobacion: la definicion de aceleracion, a = (vf - v0) / t, tiene que dar el dato a
  const fila: Ficha[] = [
    { id: "CS", tex: "", salto: true },
    { id: "Ca", tex: nf(a) },
    { id: "Ce", tex: "=", op: true },
    frPiezas(
      "CF",
      [
        { id: "Cvf", tex: nf(vf) },
        { id: "Cmn", tex: "-", op: true },
        { id: "Cv0", tex: nf(v0) },
      ],
      [{ id: "Ct", tex: nf(t) }]
    ),
  ];
  h.agregar(fila);
  // la fraccion nace del resultado (un solo brote: sus piezas la siguen); v0 y t se marcan en la fila de datos
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "Nvf", hacia: "CS" },
      { desde: "Da", hacia: "Ca" },
      { desde: "Nvf", hacia: "CF" },
    ],
    resaltar: ["Dv0", "Dt"],
    texto: `Comprobamos con la definición de aceleración: lo que cambió la velocidad, dividido entre el tiempo, tiene que dar el dato $a=${nf(a)}$. Copiamos $a$, el resultado $${nf(vf)}$ y los datos marcados, $${nf(v0)}$ y $${t}$.`,
    porque: `Si la velocidad final está bien, al deshacer la cuenta se vuelve al dato del enunciado.`,
    regla: `$a=\\dfrac{v_{f}-v_{0}}{t}$`,
  });
  const dif = vf - v0;
  h.cambiar(["Cvf", "Cmn", "Cv0"], [{ id: "Cdif", tex: nf(dif) }]);
  h.paso({
    fusiones: [{ desde: ["Cvf", "Cmn", "Cv0"], hacia: "Cdif" }],
    texto: `Arriba restamos: $${nf(vf)}-${nf(v0)}=${nf(dif)}$.`,
    porque: dif < 0 ? `Al restarle a un número otro más grande, el resultado es negativo: la velocidad bajó.` : `Es lo que subió la velocidad en todo el movimiento.`,
    regla: `$a-b=c$`,
  });
  h.cambiar(["CF"], [{ id: "Cq", tex: nf(a) }]);
  h.paso({
    fusiones: [{ desde: ["CF"], hacia: "Cq" }],
    texto: `Dividimos: $\\dfrac{${nf(dif)}}{${t}}=${nf(a)}$.`,
    porque: dif < 0 ? `Un negativo entre un positivo da negativo.` : `La fracción es una división: el número de arriba entre el de abajo.`,
    regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
  });
  h.agregar([{ id: "Cok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Ce", hacia: "Cok" }],
    resaltar: ["Ca", "Cq"],
    texto: `Los dos lados dan $${nf(a)}$, el mismo dato del enunciado. La respuesta es $v_{f}=${cant(vf, "ms")}$.`,
    porque: `Al volver a calcular la aceleración con el resultado, sale la del enunciado: la cuenta está bien.`,
    regla: `$v_{f}=v_{0}+a\\cdot t$`,
  });
  return { demo: { titulo: "", nota: "", intro, estados: h.estados, transiciones: h.trans }, resumen: { v0, a, t, vf } };
}

// ---------------------------------------------------------------------------
// MRUV 2: distancia, d = v_0·t + 1/2·a·t^2

export function validarMruvDistancia(v0: number, a: number, t: number): string | null {
  return validarMruvVelocidad(v0, a, t);
}

/** d = v0·t + ½·a·t² con sus unidades (cada termino por separado, y las unidades se tachan) */
export function mruvDistancia(v0: number, a: number, t: number, enunciado?: string): Resultado {
  const val: Record<Clave, number> = { v0, a, t, vf: v0 + a * t };
  const p1 = v0 * t;
  const t2 = t * t;
  const b = a * t2;
  const c = b / 2;
  const d = p1 + c;
  const h = new Hoja(filaDatos(["v0", "a", "t"], val, "d"));
  const intro = enunciado ?? `Un móvil ${v0 === 0 ? "parte del reposo" : `va a $${cant(v0, "ms")}$`} y ${a < 0 ? "frena" : "acelera"} a razón de $${cant(Math.abs(a), "ms2")}$ durante $${cant(t, "s")}$. ¿Qué distancia recorre? Vamos a escribir cada paso, como a lápiz.`;
  inicioMruv(h, ["v0", "a", "t"], val, "d");

  nacerFormula(
    h,
    [
      { id: "S", tex: "", salto: true },
      { id: "Fd", tex: "d" },
      { id: "Fe", tex: "=", op: true },
      { id: "Fv0", tex: col("v0", "v_{0}") },
      { id: "Fm1", tex: "\\cdot", op: true },
      { id: "Ft1", tex: col("t", "t") },
      { id: "Fp", tex: "+", op: true },
      { id: "Fh", tex: "\\dfrac{1}{2}" },
      { id: "Fm2", tex: "\\cdot", op: true },
      { id: "Fa", tex: col("a", "a") },
      { id: "Fm3", tex: "\\cdot", op: true },
      { id: "Ft2", tex: col("t", "t") },
      { id: "Fs2", tex: "2", sup: true },
    ],
    `Escribimos debajo la fórmula de la distancia en el MRUV, todavía con letras. Cada letra tiene el color de su dato.`,
    `El primer término es lo que avanzaría con su velocidad inicial; el segundo, lo que suma (o resta) la aceleración.`,
    `$d=v_{0}\\cdot t+\\dfrac{1}{2}\\cdot a\\cdot t^{2}$`
  );

  const r0 = reemplazo(h, "Fv0", "v0", v0, "Nv0", "Uv0", false);
  h.paso({ fusiones: [r0.fusion], brotes: r0.brotes, texto: textoReemplazo("v0", v0), porque: porqueReemplazo(v0), regla: `$v_{0}=${cant(v0, "ms")}$` });
  const ra = reemplazo(h, "Fa", "a", a, "Na", "Ua", true);
  h.paso({ fusiones: [ra.fusion], brotes: ra.brotes, texto: textoReemplazo("a", a), porque: porqueReemplazo(a), regla: `$a=${cant(a, "ms2")}$` });
  // t aparece dos veces; en t^2 va entre parentesis con su unidad (se eleva todo)
  h.cambiar(["Ft1"], [{ id: "Nt1", tex: col("t", nf(t)) }, { id: "Ut1", tex: "\\text{s}" }]);
  h.cambiar(["Ft2"], [{ id: "Pt2", tex: `(${col("t", nf(t))}\\ \\text{s})` }]);
  h.paso({
    fusiones: [
      { desde: ["Ft1"], hacia: ["Nt1", "Ut1"], modo: "viajar" },
      { desde: ["Ft2"], hacia: "Pt2", modo: "viajar" },
    ],
    brotes: [
      { desde: "Dt", hacia: "Nt1" },
      { desde: "Dtu", hacia: "Ut1" },
      { desde: "Dt", hacia: "Pt2" },
    ],
    texto: textoReemplazo("t", t, ` La $t$ aparece en dos lugares, en $v_{0}\\cdot t$ y en $t^{2}$, y en los dos se reemplaza.`),
    porque: `En $t^{2}$ el dato va entre paréntesis, porque se eleva al cuadrado todo: el número y la unidad.`,
    regla: `$t=${cant(t, "s")}$`,
  });

  // primer termino: v0·t
  h.cambiar(["Nv0"], [{ id: "N1", tex: nf(p1) }]);
  h.quitar("Nt1");
  h.paso({
    fusiones: [{ desde: ["Nv0", "Nt1"], hacia: "N1" }],
    texto: `Primer término. Multiplicamos los números: $${v0}\\cdot ${t}=${nf(p1)}$. Las unidades esperan su turno.`,
    porque: `En física se multiplican los números entre sí y las unidades entre sí.`,
    regla: REGLA_PRODUCTO,
  });
  const ta = tachar(h, "Uv0", ["Uv0d"], ["Fm1", "Ut1"], "Um1");
  h.paso({
    ...ta,
    texto: `Ahora sus unidades: la $\\text{s}$ de abajo se tacha con la $\\text{s}$ que multiplica. Queda $\\text{m}$, una distancia.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
    regla: REGLA_TACHAR,
  });

  // segundo termino: ½·a·t²
  h.cambiar(["Pt2", "Fs2"], [{ id: "N5", tex: nf(t) }, { id: "S5", tex: "2", sup: true }, { id: "Us2", tex: "\\text{s}^{2}" }]);
  h.paso({
    fusiones: [{ desde: ["Pt2", "Fs2"], hacia: ["N5", "S5", "Us2"] }],
    texto: `Segundo término. El cuadrado afecta al número y a la unidad: $(${t}\\ \\text{s})^{2}=${t}^{2}\\ \\text{s}^{2}$.`,
    porque: `Elevar al cuadrado un producto es elevar cada uno de sus factores.`,
    regla: `$(m\\cdot u)^{2}=m^{2}\\cdot u^{2}$`,
  });
  h.cambiar(["N5", "S5"], [{ id: "P55", tex: `${t}\\cdot ${t}` }]);
  h.paso({
    fusiones: [{ desde: ["N5", "S5"], hacia: "P55" }],
    descompone: true,
    texto: `El cuadrado de un número es ese número multiplicado por sí mismo: $${t}^{2}=${t}\\cdot ${t}$.`,
    porque: `El exponente $2$ dice cuántas veces se escribe el número en la multiplicación.`,
    regla: `$n^{2}=n\\cdot n$`,
  });
  h.cambiar(["P55"], [{ id: "N25", tex: nf(t2) }]);
  h.paso({
    fusiones: [{ desde: ["P55"], hacia: "N25" }],
    texto: `Multiplicamos: $${t}\\cdot ${t}=${t2}$.`,
    porque: `Un positivo por un positivo da positivo.`,
    regla: `$m\\cdot n=p$`,
  });
  h.cambiar(["Na"], [{ id: "Nb", tex: par(b) }]);
  h.quitar("N25");
  h.paso({
    fusiones: [{ desde: ["Na", "N25"], hacia: "Nb" }],
    texto: `Quedan tres números que se multiplican: $\\dfrac{1}{2}$, $${par(a)}$ y $${t2}$. Se hace de dos en dos: primero $${par(a)}\\cdot ${t2}=${nf(b)}$, y el $\\dfrac{1}{2}$ espera.`,
    porque: a < 0 ? `Un negativo por un positivo da negativo. El orden en que se multiplica no cambia el resultado.` : `El orden en que se multiplica no cambia el resultado: elegimos el que da números enteros.`,
    regla: `$\\dfrac{1}{2}\\cdot a\\cdot b=\\dfrac{1}{2}\\cdot(a\\cdot b)$`,
  });
  h.cambiar(["Fh"], [{ id: "Nc", tex: par(c) }]);
  h.quitar("Fm2", "Nb");
  h.paso({
    fusiones: [{ desde: ["Fh", "Fm2", "Nb"], hacia: "Nc" }],
    texto: `Multiplicar por $\\dfrac{1}{2}$ es sacar la mitad: la mitad de $${nf(b)}$ es $${nf(c)}$.`,
    porque: `$\\dfrac{1}{2}$ de algo es partirlo en dos partes iguales y quedarse con una.`,
    regla: `$\\dfrac{1}{2}\\cdot n=\\dfrac{n}{2}$`,
  });
  const tb = tachar(h, "Ua", ["Uad"], ["Fm3", "Us2"], "Um2");
  h.paso({
    ...tb,
    texto: `Sus unidades: el $\\text{s}^{2}$ de abajo se tacha con el $\\text{s}^{2}$ que multiplica. Queda $\\text{m}$, otra distancia.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
    regla: REGLA_TACHAR,
  });
  // signos y suma
  let mas = "Fp";
  let nc = "Nc";
  if (c < 0) {
    h.cambiar(["Fp"], [{ id: "Fpm", tex: "-", op: true }]);
    h.cambiar(["Nc"], [{ id: "Nc2", tex: nf(-c) }]);
    h.paso({
      fusiones: [{ desde: ["Fp", "Nc"], hacia: ["Fpm", "Nc2"] }],
      texto: `Cuidamos los signos: sumar un negativo es restar, $+${par(c)}=-${nf(-c)}$.`,
      porque: `Más por menos da menos: frenar le quita distancia a lo que avanzaría sin frenar.`,
      regla: `$+(-n)=-n$`,
    });
    mas = "Fpm";
    nc = "Nc2";
  }
  h.cambiar(["N1"], [{ id: "Nd", tex: nf(d) }]);
  h.quitar(mas, nc, "Um2");
  h.paso({
    fusiones: [
      { desde: ["N1", mas, nc], hacia: "Nd" },
      { desde: ["Um2"], hacia: null, ancla: "Um1" },
    ],
    texto: `Los dos términos están en metros: ${c < 0 ? "restamos" : "sumamos"} los números, $${nf(p1)}${c < 0 ? "-" : "+"}${nf(Math.abs(c))}=${nf(d)}$, y la unidad queda una sola vez. Resultado: $d=${cant(d, "m")}$.`,
    porque: `Solo se pueden sumar cantidades de la misma unidad: metros con metros.`,
    regla: REGLA_SUMA_UNIDAD,
  });
  return { demo: { titulo: "", nota: "", intro, estados: h.estados, transiciones: h.trans }, resumen: { v0, a, t, d, dDoble: 2 * p1 + b } };
}

// ---------------------------------------------------------------------------
// MRUV 3: tiempo, despejado de v_f = v_0 + a·t

export function validarMruvTiempo(v0: number, vf: number, a: number): string | null {
  if (![v0, vf, a].every(Number.isInteger)) return "Escribe números enteros.";
  if (v0 < 0 || v0 > 60 || vf < 0 || vf > 60) return "Las velocidades deben estar entre 0 y 60 m/s.";
  if (v0 === vf) return "Si la velocidad no cambia no hay aceleración: eso es MRU, no MRUV.";
  if (a === 0 || Math.abs(a) > 10) return "La aceleración debe estar entre -10 y 10 m/s², sin ser 0.";
  if ((vf > v0 && a < 0) || (vf < v0 && a > 0)) return vf > v0 ? "Si la velocidad sube, la aceleración debe ser positiva." : "Si la velocidad baja (frena), la aceleración debe ser negativa.";
  if ((vf - v0) % a !== 0) return "Con estos números el tiempo no es un número entero de segundos. Prueba, por ejemplo, 10, 30 y 2.";
  return null;
}

/** t a partir de v0, vf y a: se despeja con letras (arrastrando piezas), se reemplaza y las unidades se simplifican hasta s */
export function mruvTiempo(v0: number, vf: number, a: number, enunciado?: string): Resultado {
  const dif = vf - v0;
  const t = dif / a;
  const val: Record<Clave, number> = { v0, vf, a, t };
  const h = new Hoja(filaDatos(["v0", "vf", "a"], val, "t"));
  const intro =
    enunciado ??
    `Un móvil ${v0 === 0 ? "parte del reposo" : `va a $${cant(v0, "ms")}$`}, ${a < 0 ? "frena" : "acelera"} a razón de $${cant(Math.abs(a), "ms2")}$ y ${vf === 0 ? "se detiene" : `llega a $${cant(vf, "ms")}$`}. ¿Cuánto tiempo tarda? Vamos a escribir cada paso, como a lápiz.`;
  inicioMruv(h, ["v0", "vf", "a"], val, "t");

  nacerFormula(
    h,
    [
      { id: "S", tex: "", salto: true },
      { id: "Fvf", tex: col("vf", "v_{f}") },
      { id: "Fe", tex: "=", op: true },
      { id: "Fv0", tex: col("v0", "v_{0}") },
      { id: "Fp", tex: "+", op: true },
      { id: "Fa", tex: col("a", "a") },
      { id: "Fm", tex: "\\cdot", op: true },
      { id: "Ft", tex: "t" },
    ],
    `Escribimos debajo la fórmula que une las dos velocidades con la aceleración y el tiempo. Lo que buscamos, $t$, no está solo: primero hay que despejarlo.`,
    `Despejar con letras primero deja la cuenta más corta: después se reemplaza una sola vez.`,
    `$v_{f}=v_{0}+a\\cdot t$`
  );
  // despejar: v0 pasa al otro lado restando (la misma pieza viaja y cambia de signo)
  h.poner("Fv0", { tex: col("v0", "-v_{0}") });
  h.quitar("Fp");
  {
    const ids = h.fichas.map((f) => f.id).filter((id) => id !== "Fv0");
    ids.splice(ids.indexOf("Fvf") + 1, 0, "Fv0");
    h.ordenar(ids);
  }
  h.paso({
    fusiones: [{ desde: ["Fp"], hacia: null }],
    resaltar: ["Fv0"],
    texto: `Pasamos $v_{0}$ al lado izquierdo. Al cruzar la igualdad cambia de signo: estaba sumando y ahora resta.`,
    porque: `Es lo mismo que restar $v_{0}$ en los dos lados: a la derecha se cancela y a la izquierda queda escrito.`,
    regla: `$a+b=c\\ \\Rightarrow\\ b=c-a$`,
  });
  // a pasa dividiendo: lo de la izquierda queda arriba de la raya y a abajo
  h.cambiar(["Fvf"], [frPiezas("FR", [{ id: "Gvf", tex: col("vf", "v_{f}") }, { id: "Gv0", tex: col("v0", "-v_{0}") }], [{ id: "Ga", tex: col("a", "a") }])]);
  h.quitar("Fv0", "Fa", "Fm");
  h.paso({
    fusiones: [{ desde: ["Fvf", "Fv0", "Fa", "Fm"], hacia: "FR", modo: "viajar" }],
    brotes: [
      { desde: "Fvf", hacia: "Gvf" },
      { desde: "Fv0", hacia: "Gv0" },
      { desde: "Fa", hacia: "Ga" },
    ],
    texto: `La $a$ multiplica a $t$: pasa al otro lado dividiendo, debajo de todo lo que hay ahí.`,
    porque: `Es lo mismo que dividir los dos lados entre $a$: a la derecha $a$ se cancela y queda $t$ sola.`,
    regla: `$a\\cdot t=b\\ \\Rightarrow\\ t=\\dfrac{b}{a}$`,
  });
  h.ordenar(h.fichas.map((f) => f.id).filter((id) => !["FR", "Fe", "Ft"].includes(id)).concat(["Ft", "Fe", "FR"]));
  h.paso({
    fusiones: [],
    resaltar: ["Ft", "FR"],
    texto: `Damos vuelta la igualdad para que $t$ quede a la izquierda: $t=\\dfrac{v_{f}-v_{0}}{a}$.`,
    porque: `Una igualdad dice lo mismo leída de izquierda a derecha que de derecha a izquierda.`,
    regla: `$a=b\\ \\iff\\ b=a$`,
  });

  // reemplazar de a una letra (los valores vuelan desde sus datos)
  const rvf = reemplazo(h, "Gvf", "vf", vf, "Nvf", "Uvf", false);
  h.paso({ fusiones: [rvf.fusion], brotes: rvf.brotes, texto: textoReemplazo("vf", vf), porque: porqueReemplazo(vf), regla: `$v_{f}=${cant(vf, "ms")}$` });
  h.cambiar(["Gv0"], [{ id: "Gmn", tex: "-", op: true }, { id: "Nv0", tex: col("v0", nf(v0)) }, uPieza("Uv0", "ms")]);
  h.paso({
    fusiones: [{ desde: ["Gv0"], hacia: ["Gmn", "Nv0", "Uv0"], modo: "viajar" }],
    brotes: [
      { desde: "Dv0", hacia: "Nv0" },
      { desde: "Dv0u", hacia: "Uv0" },
    ],
    texto: textoReemplazo("v0", v0, ` El signo menos de adelante se queda.`),
    porque: `El menos es de la fórmula (estamos restando $v_{0}$), no del dato.`,
    regla: `$v_{0}=${cant(v0, "ms")}$`,
  });
  const ra = reemplazo(h, "Ga", "a", a, "Na", "Ua", false);
  h.paso({ fusiones: [ra.fusion], brotes: ra.brotes, texto: textoReemplazo("a", a, ` Va abajo de la raya.`), porque: a < 0 ? `El signo menos de la aceleración viaja con el número.` : `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`, regla: `$a=${cant(a, "ms2")}$` });

  // arriba: restar las velocidades (misma unidad)
  h.cambiar(["Nvf"], [{ id: "Ndif", tex: nf(dif) }]);
  h.quitar("Gmn", "Nv0", "Uv0");
  h.paso({
    fusiones: [
      { desde: ["Nvf", "Gmn", "Nv0"], hacia: "Ndif" },
      { desde: ["Uv0"], hacia: null, ancla: "Uvf" },
    ],
    texto: `Arriba, las dos velocidades tienen la misma unidad: restamos los números, $${nf(vf)}-${nf(v0)}=${nf(dif)}$, y la unidad queda una sola vez.`,
    porque: dif < 0 ? `Al restarle a un número otro más grande, el resultado es negativo: la velocidad bajó.` : `Solo se pueden restar cantidades de la misma unidad.`,
    regla: `$m\\ u-n\\ u=(m-n)\\ u$`,
  });
  // dividir los numeros; las unidades quedan en su fraccion
  h.cambiar(["FR"], [{ id: "Nt", tex: nf(t) }, { ...h.pieza("FR") }]);
  h.quitar("Ndif", "Na");
  h.paso({
    fusiones: [{ desde: ["Ndif", "Na"], hacia: "Nt" }],
    texto: `Dividimos los números: $\\dfrac{${nf(dif)}}{${nf(a)}}=${nf(t)}$. Las unidades quedan en su fracción, para simplificarlas aparte.`,
    porque: dif < 0 ? `Un negativo entre un negativo da positivo: el tiempo siempre sale positivo.` : `Los números se dividen entre sí y las unidades entre sí.`,
    regla: `$\\dfrac{m\\ u}{n\\ w}=\\dfrac{m}{n}\\cdot\\dfrac{u}{w}$`,
  });
  // unidades: (m/s) / (m/s^2) = (m·s^2) / (s·m)  (extremos y medios: cada pieza viaja a su lugar)
  h.cambiar(
    ["FR"],
    [
      frPiezas(
        "UG",
        [
          { id: "g1", tex: "\\text{m}" },
          { id: "gx1", tex: "\\cdot", op: true },
          { id: "g2", tex: "\\text{s}^{2}" },
        ],
        [
          { id: "g3", tex: "\\text{s}" },
          { id: "gx2", tex: "\\cdot", op: true },
          { id: "g4", tex: "\\text{m}" },
        ]
      ),
    ]
  );
  h.paso({
    fusiones: [{ desde: ["FR", "Uvf", "Uvfn", "Uvfd", "Ua", "Uan", "Uad"], hacia: "UG", modo: "viajar" }],
    brotes: [
      { desde: "Uvfn", hacia: "g1" },
      { desde: "Uad", hacia: "g2" },
      { desde: "Uvfd", hacia: "g3" },
      { desde: "Uan", hacia: "g4" },
    ],
    texto: `Ahora las unidades: una fracción dividida entre otra. Por extremos y medios, arriba va el producto de los de afuera, $\\text{m}\\cdot\\text{s}^{2}$, y abajo el de los de adentro, $\\text{s}\\cdot\\text{m}$.`,
    porque: `Dividir entre una fracción es multiplicar por esa fracción dada vuelta.`,
    regla: `$\\dfrac{\\;\\dfrac{a}{b}\\;}{\\dfrac{c}{d}}=\\dfrac{a\\cdot d}{b\\cdot c}$`,
  });
  h.quitar("g1", "gx1", "gx2", "g4");
  h.paso({
    fusiones: [{ desde: ["g1", "gx1", "gx2", "g4"], hacia: null, modo: "tachar" }],
    texto: `El $\\text{m}$ de arriba se tacha con el $\\text{m}$ de abajo.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
    regla: `$\\dfrac{u\\cdot w}{v\\cdot u}=\\dfrac{w}{v}$`,
  });
  h.cambiar(["g2"], [{ id: "g2a", tex: "\\text{s}" }, { id: "g2x", tex: "\\cdot", op: true }, { id: "g2b", tex: "\\text{s}" }]);
  h.paso({
    fusiones: [{ desde: ["g2"], hacia: ["g2a", "g2x", "g2b"] }],
    descompone: true,
    texto: `Para tachar la $\\text{s}$ de abajo, escribimos $\\text{s}^{2}$ como $\\text{s}\\cdot\\text{s}$.`,
    porque: `El exponente $2$ dice que la unidad está multiplicada dos veces.`,
    regla: `$\\text{s}^{2}=\\text{s}\\cdot\\text{s}$`,
  });
  // tachar una s de arriba con la de abajo: abajo no queda nada y la s de arriba sale de la raya
  h.quitar("g2x", "g2b", "g3");
  h.cambiar(["UG"], [{ id: "Us", tex: "\\text{s}" }]);
  h.paso({
    fusiones: [
      { desde: ["g2x", "g2b", "g3"], hacia: null, modo: "tachar" },
      { desde: ["UG", "g2a"], hacia: "Us", modo: "viajar" },
    ],
    brotes: [{ desde: "g2a", hacia: "Us" }],
    texto: `Una $\\text{s}$ de arriba se tacha con la $\\text{s}$ de abajo. Queda $\\text{s}$: segundos, un tiempo. Resultado: $t=${cant(t, "s")}$.`,
    porque: `Que la unidad termine en segundos confirma que la fórmula se usó bien: buscábamos un tiempo.`,
    regla: `$\\dfrac{u\\cdot u}{u}=u$`,
  });

  // comprobacion: el tiempo en la formula del principio, con los datos
  const at = a * t;
  h.agregar([
    { id: "CS", tex: "", salto: true },
    { id: "Cvf", tex: nf(vf) },
    { id: "Ce", tex: "=", op: true },
    { id: "Cv0", tex: nf(v0) },
    { id: "Cp", tex: "+", op: true },
    { id: "Ca", tex: par(a) },
    { id: "Cm", tex: "\\cdot", op: true },
    { id: "Ct", tex: nf(t) },
  ]);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "Nt", hacia: "CS" },
      { desde: "Dvf", hacia: "Cvf" },
      { desde: "Dv0", hacia: "Cv0" },
      { desde: "Da", hacia: "Ca" },
      { desde: "Nt", hacia: "Ct" },
    ],
    texto: `Comprobamos: copiamos la fórmula del principio con los datos del enunciado y el tiempo que salió, $${nf(t)}$. Los dos lados tienen que dar lo mismo.`,
    porque: `Si el tiempo está bien, al reemplazarlo en $v_{f}=v_{0}+a\\cdot t$ se cumple la igualdad.`,
    regla: `$v_{f}=v_{0}+a\\cdot t$`,
  });
  h.cambiar(["Ca"], [{ id: "Cat", tex: par(at) }]);
  h.quitar("Cm", "Ct");
  h.paso({
    fusiones: [{ desde: ["Ca", "Cm", "Ct"], hacia: "Cat" }],
    texto: `Primero la multiplicación: $${par(a)}\\cdot ${nf(t)}=${nf(at)}$.`,
    porque: a < 0 ? `Un negativo por un positivo da negativo.` : `Primero se multiplica y después se suma.`,
    regla: `$m\\cdot n=p$`,
  });
  let cmas = "Cp";
  let cat = "Cat";
  if (at < 0) {
    h.cambiar(["Cp"], [{ id: "Cpm", tex: "-", op: true }]);
    h.cambiar(["Cat"], [{ id: "Cat2", tex: nf(-at) }]);
    h.paso({
      fusiones: [{ desde: ["Cp", "Cat"], hacia: ["Cpm", "Cat2"] }],
      texto: `Cuidamos los signos: sumar un negativo es restar, $+${par(at)}=-${nf(-at)}$.`,
      porque: `Más por menos da menos.`,
      regla: `$+(-n)=-n$`,
    });
    cmas = "Cpm";
    cat = "Cat2";
  }
  h.cambiar(["Cv0"], [{ id: "Csum", tex: nf(v0 + at) }]);
  h.quitar(cmas, cat);
  h.paso({
    fusiones: [{ desde: ["Cv0", cmas, cat], hacia: "Csum" }],
    texto: `${at < 0 ? "Restamos" : "Sumamos"}: $${nf(v0)}${at < 0 ? "-" : "+"}${nf(Math.abs(at))}=${nf(v0 + at)}$.`,
    porque: `Queda un solo número de cada lado para compararlos.`,
    regla: `$a+b=c$`,
  });
  h.agregar([{ id: "Cok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Ce", hacia: "Cok" }],
    resaltar: ["Cvf", "Csum"],
    texto: `Los dos lados dan $${nf(vf)}$: el tiempo cumple la fórmula. La respuesta es $t=${cant(t, "s")}$.`,
    porque: `Al reemplazar el tiempo, la velocidad final que sale es la del enunciado.`,
    regla: `$v_{f}=v_{0}+a\\cdot t$`,
  });
  return { demo: { titulo: "", nota: "", intro, estados: h.estados, transiciones: h.trans }, resumen: { v0, vf, a, t } };
}

// ---------------------------------------------------------------------------
// MRUV 4: "multiplica su velocidad" (duplica, triplica...) en d metros y t segundos: hallar a.
// Dos incognitas (v0 y a), dos formulas: de la primera sale v0 = c1·a y se reemplaza en la segunda.
// Es la explicacion del banco (UMSS Ingenieria 2024, 1ra opcion, pregunta 10) paso por paso.
// Las cuentas del sistema van solo con numeros (todo esta en metros y segundos); la unidad de a se arma al final
// con las unidades de los datos.

const VECES: Record<number, string> = { 2: "duplica", 3: "triplica", 4: "cuadruplica", 5: "quintuplica" };
// Colores de tres cifras A PROPOSITO (los mismos tonos que #db2777 y #ea580c): Fusion.tsx reserva bajo cada pieza con
// etiqueta un ancho que cuenta tambien las letras del color (`\textcolor{#db2777}{d}` cuenta 9 letras, no 1), y con
// seis cifras "200 m , 10 s" no cabe en un renglon de celular. Si el motor deja de contar el color, se pueden volver a seis.
const COLOR_M = { d: "#d27", t: "#e50", a: "#16a34a" } as const;
const colM = (k: keyof typeof COLOR_M, tex: string) => `\\textcolor{${COLOR_M[k]}}{${tex}}`;

export function validarMruvMultiplica(k: number, d: number, t: number): string | null {
  if (![k, d, t].every(Number.isInteger)) return "Escribe números enteros.";
  if (k < 2 || k > 5) return "Cuántas veces cambia la velocidad: entre 2 (duplica) y 5 (quintuplica).";
  if (t < 2 || t > 20 || t % 2 !== 0) return "El tiempo debe ser un número par de segundos, entre 2 y 20.";
  if (t % (k - 1) !== 0) return `Con estos números la velocidad inicial no sale como un número entero por $a$: el tiempo debe poder dividirse entre ${k - 1}.`;
  if (d < 1 || d > 2000) return "La distancia debe estar entre 1 y 2000 m.";
  const c4 = (t * t) / (k - 1) + (t * t) / 2;
  const a = d / c4;
  if (decimales(a) > 2) return "Con estos números la aceleración tiene muchos decimales. Prueba, por ejemplo, 3, 200 y 10.";
  if (decimales((t / (k - 1)) * a) > 1) return "Con estos números la velocidad inicial tiene muchos decimales. Prueba con otra distancia.";
  return null;
}

export function mruvMultiplica(k: number, d: number, t: number, enunciado?: string): Resultado {
  const c1 = t / (k - 1); // v0 = c1·a
  const c2 = t * c1; // t·v0 = c2·a
  const t2 = t * t;
  const c3 = t2 / 2; // ½·a·t² = c3·a
  const c4 = c2 + c3;
  const a = d / c4;
  const v0 = c1 * a;
  const vf = k * v0;
  const vf2 = vf * vf;
  const v02 = v0 * v0;
  const dosA = 2 * a;
  const dosAd = dosA * d;
  // los datos en tres renglones (en un celular no caben en uno): la relacion de velocidades, los datos con unidad
  // (llevaran su letra debajo, y el salto les deja lugar) y lo que piden. "quintuplica su velocidad" va en dos
  // piezas para que pueda partirse si no cabe entera.
  const h = new Hoja([
    { id: "Dkw1", tex: `\\text{${VECES[k]}}` },
    { id: "Dkw2", tex: "\\text{su velocidad}" },
    { id: "DS1", tex: "", salto: true },
    { id: "Dd", tex: nf(d) },
    { id: "Ddu", tex: "\\text{m}" },
    { id: "Dcd", tex: ",", op: true },
    { id: "Dt", tex: nf(t) },
    { id: "Dtu", tex: "\\text{s}" },
    { id: "DS2", tex: "", salto: true },
    { id: "Dq", tex: "a=\\ ?" },
  ]);
  const intro = enunciado ?? `Un móvil que viaja con MRUV ${VECES[k]} su velocidad luego de recorrer $${cant(d, "m")}$ empleando $${cant(t, "s")}$. ¿Cuál es su aceleración? Vamos a escribir cada paso, como a lápiz.`;
  h.paso({
    fusiones: [],
    resaltar: ["Dkw1", "Dkw2", "Dd", "Dt", "Dq"],
    texto: `Anotamos los datos y lo que piden, $a$. No sabemos la velocidad inicial ni la aceleración: son dos incógnitas, y con una sola fórmula no alcanza. Usaremos dos fórmulas del MRUV.`,
    porque: `Con dos incógnitas hacen falta dos ecuaciones: de una se despeja una incógnita y se reemplaza en la otra.`,
    regla: `$2\\ \\text{incógnitas}\\ \\Rightarrow\\ 2\\ \\text{ecuaciones}$`,
  });
  h.cambiar(["Dkw1", "Dkw2"], [{ id: "Dk", tex: `v_{f}=${k}v_{0}` }]);
  h.paso({
    fusiones: [{ desde: ["Dkw1", "Dkw2"], hacia: "Dk" }],
    texto: `"${VECES[k][0].toUpperCase()}${VECES[k].slice(1)} su velocidad" quiere decir que la velocidad final es ${k} veces la inicial: $v_{f}=${k}v_{0}$.`,
    porque: `No sabemos cuánto vale $v_{0}$, pero sí cómo se relaciona con $v_{f}$: eso también es un dato.`,
    regla: `$\\text{${VECES[k]}}\\ \\Rightarrow\\ v_{f}=${k}\\cdot v_{0}$`,
  });
  for (const [id, kk, letra, v, u] of [
    ["Dd", "d", "d", d, "m"],
    ["Dt", "t", "t", t, "s"],
  ] as const) {
    h.poner(id, { tex: colM(kk, nf(v)), debajo: colM(kk, letra) });
    h.paso({
      fusiones: [],
      resaltar: [id],
      texto: `$${cant(v, u)}$ es ${kk === "d" ? "lo que recorre: la distancia" : "lo que tarda: el tiempo"}. La llamamos $${letra}$.`,
      porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
      regla: `$${letra}=${cant(v, u)}$`,
    });
  }

  // ---- primera formula: la de la velocidad, de la que sale v0 en funcion de a
  nacerFormula(
    h,
    [
      { id: "S1", tex: "", salto: true },
      { id: "G1vf", tex: "v_{f}" },
      { id: "G1e", tex: "=", op: true },
      { id: "G1v0", tex: "v_{0}" },
      { id: "G1p", tex: "+", op: true },
      { id: "G1a", tex: "a" },
      { id: "G1m", tex: "\\cdot", op: true },
      { id: "G1t", tex: colM("t", "t") },
    ],
    `Primera fórmula: la de la velocidad, todavía con letras.`,
    `Sirve porque el enunciado dice cómo cambia la velocidad.`,
    `$v_{f}=v_{0}+a\\cdot t$`
  );
  h.cambiar(["G1vf"], [{ id: "K1", tex: `${k}v_{0}` }]);
  h.paso({
    fusiones: [{ desde: ["G1vf"], hacia: "K1", modo: "viajar" }],
    brotes: [{ desde: "Dk", hacia: "K1" }],
    texto: `Reemplazamos $v_{f}$ por $${k}v_{0}$, lo que dice el enunciado.`,
    porque: `Así en la fórmula queda una sola velocidad desconocida, $v_{0}$.`,
    regla: `$v_{f}=${k}v_{0}$`,
  });
  h.cambiar(["G1t"], [{ id: "N1t", tex: colM("t", nf(t)) }]);
  h.paso({
    fusiones: [{ desde: ["G1t"], hacia: "N1t", modo: "viajar" }],
    brotes: [{ desde: "Dt", hacia: "N1t" }],
    texto: `Reemplazamos $t$ por $${t}$. Escribimos solo los números: todos los datos están en metros y segundos, y la unidad de la respuesta la armamos al final.`,
    porque: `Si todo está en las mismas unidades, las cuentas con números dan lo mismo que con unidades.`,
    regla: `$t=${cant(t, "s")}$`,
  });
  h.quitar("G1m", "N1t");
  h.cambiar(["G1a"], [{ id: "N1tb", tex: nf(t) }, { id: "G1a", tex: "a", pegado: true }]);
  h.paso({
    fusiones: [{ desde: ["G1m", "N1t"], hacia: "N1tb" }],
    texto: `El número se escribe delante de la letra: $a\\cdot ${t}=${t}a$.`,
    porque: `El orden de los factores no cambia el producto.`,
    regla: `$a\\cdot b=b\\cdot a$`,
  });
  // v0 pasa al otro lado restando (la misma pieza viaja y cambia de signo)
  h.quitar("G1p");
  h.poner("G1v0", { tex: "-v_{0}" });
  {
    const ids = h.fichas.map((f) => f.id).filter((id) => id !== "G1v0");
    ids.splice(ids.indexOf("K1") + 1, 0, "G1v0");
    h.ordenar(ids);
  }
  h.paso({
    fusiones: [{ desde: ["G1p"], hacia: null }],
    resaltar: ["G1v0"],
    texto: `Juntamos las $v_{0}$ a la izquierda: pasamos $v_{0}$ y, al cruzar la igualdad, cambia de signo.`,
    porque: `Es lo mismo que restar $v_{0}$ en los dos lados: a la derecha se cancela y a la izquierda queda escrito.`,
    regla: `$a=b+c\\ \\Rightarrow\\ a-b=c$`,
  });
  const k1 = k - 1;
  h.cambiar(["K1", "G1v0"], [{ id: "K2", tex: k1 === 1 ? "v_{0}" : `${k1}v_{0}` }]);
  h.paso({
    fusiones: [{ desde: ["K1", "G1v0"], hacia: "K2" }],
    texto: `Restamos los términos semejantes: $${k}v_{0}-v_{0}=${k1 === 1 ? "v_{0}" : `${k1}v_{0}`}$.`,
    porque: `Es como tener ${k} objetos iguales y quitar uno: quedan ${k1}.`,
    regla: `$m\\cdot u-u=(m-1)\\cdot u$`,
  });
  // de donde sale el "c1·a" que viaja a la segunda formula
  let origenV0 = "N1tb";
  if (k1 > 1) {
    h.cambiar(["K2"], [{ id: "Kv0", tex: "v_{0}" }]);
    h.cambiar(["N1tb", "G1a"], [frPiezas("FR1", [{ id: "N1n", tex: nf(t) }, { id: "N1a", tex: "a", pegado: true }], [{ id: "N1d", tex: `${k1}` }])]);
    h.paso({
      fusiones: [
        { desde: ["K2"], hacia: "Kv0", modo: "viajar" },
        { desde: ["N1tb", "G1a"], hacia: "FR1", modo: "viajar" },
      ],
      brotes: [
        { desde: "K2", hacia: "Kv0" },
        { desde: "K2", hacia: "N1d" },
        { desde: "N1tb", hacia: "N1n" },
        { desde: "G1a", hacia: "N1a" },
      ],
      texto: `El $${k1}$ multiplica a $v_{0}$: pasa al otro lado dividiendo.`,
      porque: `Es lo mismo que dividir los dos lados entre $${k1}$: a la izquierda se cancela y $v_{0}$ queda sola.`,
      regla: `$m\\cdot x=b\\ \\Rightarrow\\ x=\\dfrac{b}{m}$`,
    });
    h.cambiar(["FR1"], [{ id: "K5", tex: `${nf(c1)}a` }]);
    h.paso({
      fusiones: [{ desde: ["FR1"], hacia: "K5" }],
      texto: `Dividimos el número: $\\dfrac{${t}}{${k1}}=${nf(c1)}$. Queda $v_{0}=${nf(c1)}a$: ya sabemos cuánto vale $v_{0}$ si conocemos $a$.`,
      porque: `La letra $a$ se queda: solo se dividen los números.`,
      regla: `$\\dfrac{m\\cdot a}{n}=\\dfrac{m}{n}\\cdot a$`,
    });
    origenV0 = "K5";
  } else {
    h.paso({
      fusiones: [],
      resaltar: ["K2", "N1tb", "G1a"],
      texto: `Queda $v_{0}=${t}a$: ya sabemos cuánto vale $v_{0}$ si conocemos $a$.`,
      porque: `$v_{0}$ ya está sola: no hay nada que despejar.`,
      regla: `$v_{0}=${t}a$`,
    });
  }

  // ---- segunda formula: la de la distancia; v0 se reemplaza por c1·a
  nacerFormula(
    h,
    [
      { id: "S2", tex: "", salto: true },
      { id: "H2d", tex: colM("d", "d") },
      { id: "H2e", tex: "=", op: true },
      { id: "H2v0", tex: "v_{0}" },
      { id: "H2m1", tex: "\\cdot", op: true },
      { id: "H2t1", tex: colM("t", "t") },
      { id: "H2p", tex: "+", op: true },
      { id: "H2h", tex: "\\dfrac{1}{2}" },
      { id: "H2m2", tex: "\\cdot", op: true },
      { id: "H2a", tex: "a" },
      { id: "H2m3", tex: "\\cdot", op: true },
      { id: "H2t2", tex: colM("t", "t") },
      { id: "H2s", tex: "2", sup: true },
    ],
    `Segunda fórmula: la de la distancia, todavía con letras. Tiene las dos incógnitas, $v_{0}$ y $a$.`,
    `Con la primera fórmula ya sabemos escribir $v_{0}$ con $a$: así esta quedará con una sola incógnita.`,
    `$d=v_{0}\\cdot t+\\dfrac{1}{2}\\cdot a\\cdot t^{2}$`
  );
  h.cambiar(["H2d"], [{ id: "N2d", tex: colM("d", nf(d)) }]);
  h.paso({
    fusiones: [{ desde: ["H2d"], hacia: "N2d", modo: "viajar" }],
    brotes: [{ desde: "Dd", hacia: "N2d" }],
    texto: `Reemplazamos $d$ por $${d}$.`,
    porque: `Se reemplaza una letra por vez, para no perder ningún dato.`,
    regla: `$d=${cant(d, "m")}$`,
  });
  h.cambiar(["H2t1"], [{ id: "N2t1", tex: colM("t", nf(t)) }]);
  h.cambiar(["H2t2"], [{ id: "N2t2", tex: colM("t", nf(t)) }]);
  h.paso({
    fusiones: [
      { desde: ["H2t1"], hacia: "N2t1", modo: "viajar" },
      { desde: ["H2t2"], hacia: "N2t2", modo: "viajar" },
    ],
    brotes: [
      { desde: "Dt", hacia: "N2t1" },
      { desde: "Dt", hacia: "N2t2" },
    ],
    texto: `Reemplazamos $t$ por $${t}$. La $t$ aparece en dos lugares, en $v_{0}\\cdot t$ y en $t^{2}$, y en los dos se reemplaza.`,
    porque: `Una letra vale lo mismo en todos los lugares donde aparece.`,
    regla: `$t=${cant(t, "s")}$`,
  });
  h.quitar("H2m1", "N2t1");
  h.cambiar(["H2v0"], [{ id: "N2tb", tex: nf(t) }, { id: "H2v0", tex: "v_{0}", pegado: true }]);
  h.paso({
    fusiones: [{ desde: ["H2m1", "N2t1"], hacia: "N2tb" }],
    texto: `El número se escribe delante de la letra: $v_{0}\\cdot ${t}=${t}v_{0}$.`,
    porque: `El orden de los factores no cambia el producto.`,
    regla: `$a\\cdot b=b\\cdot a$`,
  });
  h.cambiar(["H2v0"], [{ id: "V5a", tex: `(${nf(c1)}a)`, pegado: true }]);
  h.paso({
    fusiones: [{ desde: ["H2v0"], hacia: "V5a", modo: "viajar" }],
    brotes: [{ desde: origenV0, hacia: "V5a" }],
    texto: `Usamos la primera fórmula: en lugar de $v_{0}$ escribimos $${nf(c1)}a$. Va entre paréntesis porque el $${t}$ multiplica a todo.`,
    porque: `$v_{0}$ y $${nf(c1)}a$ son lo mismo, así que uno puede ocupar el lugar del otro. Ahora solo queda la incógnita $a$.`,
    regla: `$v_{0}=${nf(c1)}a$`,
  });
  h.cambiar(["N2tb"], [{ id: "T1a", tex: `${nf(c2)}a` }]);
  h.quitar("V5a");
  h.paso({
    fusiones: [{ desde: ["N2tb", "V5a"], hacia: "T1a" }],
    texto: `Multiplicamos los números, $${t}$ por $${nf(c1)}$: $${t}(${nf(c1)}a)=${nf(c2)}a$.`,
    porque: `La letra se queda; se multiplican los números.`,
    regla: `$m\\cdot(n\\cdot a)=(m\\cdot n)\\cdot a$`,
  });
  h.cambiar(["N2t2", "H2s"], [{ id: "P2t", tex: `${t}\\cdot ${t}` }]);
  h.paso({
    fusiones: [{ desde: ["N2t2", "H2s"], hacia: "P2t" }],
    descompone: true,
    texto: `El cuadrado: $${t}^{2}=${t}\\cdot ${t}$.`,
    porque: `El exponente $2$ dice cuántas veces se escribe el número en la multiplicación.`,
    regla: `$n^{2}=n\\cdot n$`,
  });
  h.cambiar(["P2t"], [{ id: "N2t2b", tex: nf(t2) }]);
  h.paso({
    fusiones: [{ desde: ["P2t"], hacia: "N2t2b" }],
    texto: `Multiplicamos: $${t}\\cdot ${t}=${t2}$.`,
    porque: `Un positivo por un positivo da positivo.`,
    regla: `$m\\cdot n=p$`,
  });
  h.cambiar(["H2h"], [{ id: "T2a", tex: `${nf(c3)}a` }]);
  h.quitar("H2m2", "H2a", "H2m3", "N2t2b");
  h.paso({
    fusiones: [{ desde: ["H2h", "H2m2", "H2a", "H2m3", "N2t2b"], hacia: "T2a" }],
    texto: `Multiplicar por $\\dfrac{1}{2}$ es sacar la mitad: la mitad de $${t2}$ es $${nf(c3)}$. Queda $${nf(c3)}a$.`,
    porque: `El orden en que se multiplica no cambia el resultado: primero los números, y la letra se escribe al final.`,
    regla: `$\\dfrac{1}{2}\\cdot a\\cdot n=\\dfrac{n}{2}\\cdot a$`,
  });
  h.cambiar(["T1a", "H2p", "T2a"], [{ id: "T3a", tex: `${nf(c4)}a` }]);
  h.paso({
    fusiones: [{ desde: ["T1a", "H2p", "T2a"], hacia: "T3a" }],
    texto: `Sumamos los términos semejantes: $${nf(c2)}a+${nf(c3)}a=${nf(c4)}a$.`,
    porque: `Es como sumar objetos iguales: se suman sus cantidades y la letra se queda.`,
    regla: `$m\\cdot a+n\\cdot a=(m+n)\\cdot a$`,
  });
  {
    const ids = h.fichas.map((f) => f.id).filter((id) => !["N2d", "H2e", "T3a"].includes(id));
    h.ordenar([...ids, "T3a", "H2e", "N2d"]);
  }
  h.paso({
    fusiones: [],
    resaltar: ["T3a"],
    texto: `Damos vuelta la igualdad para que la incógnita quede a la izquierda: $${nf(c4)}a=${nf(d)}$.`,
    porque: `Una igualdad dice lo mismo leída de izquierda a derecha que de derecha a izquierda.`,
    regla: `$a=b\\ \\iff\\ b=a$`,
  });
  h.cambiar(["T3a"], [{ id: "Ax", tex: colM("a", "a") }]);
  h.cambiar(["N2d"], [frPiezas("FR2", [{ id: "N2dn", tex: nf(d) }], [{ id: "N2c4", tex: nf(c4) }])]);
  h.paso({
    fusiones: [
      { desde: ["T3a"], hacia: "Ax", modo: "viajar" },
      { desde: ["N2d"], hacia: "FR2", modo: "viajar" },
    ],
    brotes: [
      { desde: "T3a", hacia: "Ax" },
      { desde: "T3a", hacia: "N2c4" },
      { desde: "N2d", hacia: "N2dn" },
    ],
    texto: `El $${nf(c4)}$ multiplica a $a$: pasa al otro lado dividiendo.`,
    porque: `Es lo mismo que dividir los dos lados entre $${nf(c4)}$: a la izquierda se cancela y $a$ queda sola.`,
    regla: `$m\\cdot x=b\\ \\Rightarrow\\ x=\\dfrac{b}{m}$`,
  });
  h.cambiar(["FR2"], [{ id: "Ares", tex: nf(a) }]);
  h.paso({
    fusiones: [{ desde: ["FR2"], hacia: "Ares" }],
    texto: `Dividimos: $\\dfrac{${nf(d)}}{${nf(c4)}}=${nf(a)}$.`,
    porque: `La fracción es una división: el número de arriba entre el de abajo.`,
    regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
  });
  // la unidad de a se arma con las unidades de los datos: metros entre segundos al cuadrado
  h.cambiar(["Ares"], [h.pieza("Ares"), frPiezas("UA", [{ id: "UAn", tex: "\\text{m}" }], [{ id: "UAd", tex: "\\text{s}^{2}" }])]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Dtu", hacia: "UA" }],
    resaltar: ["Ddu", "Dtu"],
    texto: `La unidad: la distancia está en $\\text{m}$ y el tiempo en $\\text{s}$; como en $\\dfrac{1}{2}\\cdot a\\cdot t^{2}$ el tiempo va al cuadrado, para que dé metros $a$ va en $\\dfrac{\\text{m}}{\\text{s}^{2}}$. Resultado: $a=${cant(a, "ms2")}$.`,
    porque: `En $a\\cdot t^{2}$ los $\\text{s}^{2}$ de abajo de $a$ se tachan con los del tiempo y quedan metros, como debe dar una distancia.`,
    regla: `$\\dfrac{\\text{m}}{\\text{s}^{2}}\\cdot\\text{s}^{2}=\\text{m}$`,
  });

  // ---- verificacion del banco: v0 = c1·a, vf = k·v0, y v_f^2 = v_0^2 + 2ad
  // v0: en la primera fila, a vale lo que salio
  const idA1 = k1 > 1 ? "K5" : "G1a";
  if (k1 > 1) {
    h.cambiar(["K5"], [{ id: "K5n", tex: `${nf(c1)}\\cdot ${nf(a)}` }]);
    h.paso({
      fusiones: [{ desde: ["K5"], hacia: "K5n", modo: "viajar" }],
      brotes: [{ desde: "Ares", hacia: "K5n" }],
      texto: `Verificamos. Primero, cuánto valía $v_{0}$: en $v_{0}=${nf(c1)}a$ reemplazamos $a$ por $${nf(a)}$.`,
      porque: `Con $a$ ya conocida, la primera fórmula da la velocidad inicial.`,
      regla: `$v_{0}=${nf(c1)}a$`,
    });
  } else {
    h.cambiar(["N1tb", "G1a"], [{ id: "K5n", tex: `${nf(t)}\\cdot ${nf(a)}` }]);
    h.paso({
      fusiones: [{ desde: ["N1tb", idA1], hacia: "K5n", modo: "viajar" }],
      brotes: [{ desde: "Ares", hacia: "K5n" }],
      texto: `Verificamos. Primero, cuánto valía $v_{0}$: en $v_{0}=${t}a$ reemplazamos $a$ por $${nf(a)}$.`,
      porque: `Con $a$ ya conocida, la primera fórmula da la velocidad inicial.`,
      regla: `$v_{0}=${t}a$`,
    });
  }
  h.cambiar(["K5n"], [{ id: "V0r", tex: nf(v0) }]);
  h.paso({
    fusiones: [{ desde: ["K5n"], hacia: "V0r" }],
    texto: `Multiplicamos: $${nf(c1)}\\cdot ${nf(a)}=${nf(v0)}$. La velocidad inicial era $${cant(v0, "ms")}$.`,
    porque: `Un positivo por un positivo da positivo.`,
    regla: `$m\\cdot n=p$`,
  });
  // vf: debajo del dato v_f = k·v0
  h.agregar([
    { id: "S3", tex: "", salto: true },
    { id: "W1", tex: "v_{f}" },
    { id: "W1e", tex: "=", op: true },
    { id: "W1k", tex: `${k}` },
    { id: "W1m", tex: "\\cdot", op: true },
    { id: "W1v", tex: nf(v0) },
  ]);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "Dk", hacia: "S3" },
      { desde: "Dk", hacia: "W1" },
      { desde: "Dk", hacia: "W1k" },
      { desde: "V0r", hacia: "W1v" },
    ],
    texto: `La velocidad final es ${k} veces la inicial: copiamos $v_{f}=${k}v_{0}$ con el valor de $v_{0}$.`,
    porque: `Es el dato del enunciado, ahora con números.`,
    regla: `$v_{f}=${k}v_{0}$`,
  });
  h.cambiar(["W1k", "W1m", "W1v"], [{ id: "W1r", tex: nf(vf) }]);
  h.paso({
    fusiones: [{ desde: ["W1k", "W1m", "W1v"], hacia: "W1r" }],
    texto: `Multiplicamos: $${k}\\cdot ${nf(v0)}=${nf(vf)}$. La velocidad final era $${cant(vf, "ms")}$.`,
    porque: `Un positivo por un positivo da positivo.`,
    regla: `$m\\cdot n=p$`,
  });
  // la tercera formula, con letras, y despues una letra por vez
  h.agregar([
    { id: "S4", tex: "", salto: true },
    { id: "X1", tex: "v_{f}" },
    { id: "X1s", tex: "2", sup: true },
    { id: "X1e", tex: "=", op: true },
    { id: "X2", tex: "v_{0}" },
    { id: "X2s", tex: "2", sup: true },
    { id: "X1p", tex: "+", op: true },
    { id: "X3", tex: "2" },
    { id: "X3m", tex: "\\cdot", op: true },
    { id: "X4", tex: colM("a", "a") },
    { id: "X4m", tex: "\\cdot", op: true },
    { id: "X5", tex: colM("d", "d") },
  ]);
  h.paso({
    fusiones: [],
    brotes: ["S4", "X1", "X1s", "X2", "X2s", "X3", "X4", "X5"].map((id) => ({ desde: "Dq", hacia: id })),
    texto: `Para verificar usamos otra fórmula del MRUV, que no usamos para resolver: la que une las velocidades con la distancia, sin el tiempo.`,
    porque: `Si la respuesta está bien, tiene que cumplir también una fórmula distinta de las que usamos.`,
    regla: `$v_{f}^{2}=v_{0}^{2}+2\\cdot a\\cdot d$`,
  });
  for (const [letra, id, nuevo, valor, origen, nombre] of [
    ["v_{f}", "X1", "Y1", vf, "W1r", "la velocidad final"],
    ["v_{0}", "X2", "Y2", v0, "V0r", "la velocidad inicial"],
    ["a", "X4", "Y4", a, "Ares", "la aceleración que salió"],
    ["d", "X5", "Y5", d, "Dd", "el dato de la distancia"],
  ] as const) {
    h.cambiar([id], [{ id: nuevo, tex: nf(valor) }]);
    h.paso({
      fusiones: [{ desde: [id], hacia: nuevo, modo: "viajar" }],
      brotes: [{ desde: origen, hacia: nuevo }],
      texto: `Reemplazamos $${letra}$ por $${nf(valor)}$, ${nombre}.`,
      porque: `Se reemplaza una letra por vez.`,
      regla: `$${letra}=${nf(valor)}$`,
    });
  }
  h.cambiar(["Y1", "X1s"], [{ id: "Z1", tex: `${nf(vf)}\\cdot ${nf(vf)}` }]);
  h.cambiar(["Y2", "X2s"], [{ id: "Z2", tex: `${nf(v0)}\\cdot ${nf(v0)}` }]);
  h.paso({
    fusiones: [
      { desde: ["Y1", "X1s"], hacia: "Z1" },
      { desde: ["Y2", "X2s"], hacia: "Z2" },
    ],
    descompone: true,
    texto: `Los dos cuadrados: $${nf(vf)}^{2}=${nf(vf)}\\cdot ${nf(vf)}$ y $${nf(v0)}^{2}=${nf(v0)}\\cdot ${nf(v0)}$.`,
    porque: `Son dos cuentas independientes, así que van a la vez.`,
    regla: `$n^{2}=n\\cdot n$`,
  });
  h.cambiar(["Z1"], [{ id: "Z1r", tex: nf(vf2) }]);
  h.cambiar(["Z2"], [{ id: "Z2r", tex: nf(v02) }]);
  h.paso({
    fusiones: [
      { desde: ["Z1"], hacia: "Z1r" },
      { desde: ["Z2"], hacia: "Z2r" },
    ],
    texto: `Multiplicamos: $${nf(vf)}\\cdot ${nf(vf)}=${nf(vf2)}$ y $${nf(v0)}\\cdot ${nf(v0)}=${nf(v02)}$.`,
    porque: `Son dos cuentas independientes, así que van a la vez.`,
    regla: `$m\\cdot n=p$`,
  });
  h.cambiar(["X3", "X3m", "Y4"], [{ id: "Z3", tex: nf(dosA) }]);
  h.paso({
    fusiones: [{ desde: ["X3", "X3m", "Y4"], hacia: "Z3" }],
    texto: `El producto de tres números se hace de dos en dos. Primero $2\\cdot ${nf(a)}=${nf(dosA)}$.`,
    porque: `Una multiplicación por vez, de izquierda a derecha.`,
    regla: `$(m\\cdot n)\\cdot p=m\\cdot(n\\cdot p)$`,
  });
  h.cambiar(["Z3", "X4m", "Y5"], [{ id: "Z4", tex: nf(dosAd) }]);
  h.paso({
    fusiones: [{ desde: ["Z3", "X4m", "Y5"], hacia: "Z4" }],
    texto: `Después $${nf(dosA)}\\cdot ${nf(d)}=${nf(dosAd)}$.`,
    porque: `Primero se multiplica y después se suma.`,
    regla: `$m\\cdot n=p$`,
  });
  h.cambiar(["Z2r", "X1p", "Z4"], [{ id: "Z5", tex: nf(v02 + dosAd) }]);
  h.paso({
    fusiones: [{ desde: ["Z2r", "X1p", "Z4"], hacia: "Z5" }],
    texto: `Sumamos: $${nf(v02)}+${nf(dosAd)}=${nf(v02 + dosAd)}$.`,
    porque: `Queda un solo número de cada lado para compararlos.`,
    regla: `$a+b=c$`,
  });
  h.agregar([{ id: "Zok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "X1e", hacia: "Zok" }],
    resaltar: ["Z1r", "Z5"],
    texto: `Los dos lados dan $${nf(vf2)}$: la aceleración cumple también esta fórmula. La respuesta es $a=${cant(a, "ms2")}$.`,
    porque: `Una respuesta correcta cumple todas las fórmulas del movimiento, no solo las que usamos para hallarla.`,
    regla: `$v_{f}^{2}=v_{0}^{2}+2\\cdot a\\cdot d$`,
  });
  return {
    demo: { titulo: "", nota: "", intro, estados: h.estados, transiciones: h.trans },
    resumen: { k, d, t, c1, c4, a, v0, vf, vf2, v02, dosAd },
  };
}

// ---------------------------------------------------------------------------
// Ley de Charles: V1/T1 = V2/T2 a presion constante, temperaturas en kelvin

export type UPresion = "atm" | "torr" | "mmHg";
export interface Presiones {
  p1: number;
  u1: UPresion;
  p2: number;
  u2: UPresion;
}
export interface OpcionesCharles {
  /** las temperaturas vienen en kelvin (si no, en grados Celsius) */
  kelvin?: boolean;
  /** las presiones del enunciado; si faltan, el enunciado dice "a presion constante" */
  presion?: Presiones;
  /** unidad del volumen */
  volumen?: "mL" | "L";
  enunciado?: string;
}
// tres cifras a proposito (los tonos de #2563eb, #16a34a y #ea580c): ver COLOR_M, el ancho de la etiqueta cuenta el color
const COLOR_G = { V1: "#26e", T1: "#1a4", T2: "#e50" } as const;
const colG = (k: keyof typeof COLOR_G, tex: string) => `\\textcolor{${COLOR_G[k]}}{${tex}}`;
const aAtm = (p: number, u: UPresion) => (u === "atm" ? p : p / 760);

export function validarCharles(V1: number, t1: number, t2: number, op: OpcionesCharles = {}): string | null {
  if (!(V1 > 0) || V1 > 10000 || decimales(V1) > 2) return "El volumen debe ser positivo, hasta 10000 y con dos decimales como mucho.";
  if (![t1, t2].every(Number.isInteger)) return "Escribe las temperaturas como números enteros.";
  const T1 = op.kelvin ? t1 : t1 + 273;
  const T2 = op.kelvin ? t2 : t2 + 273;
  if (T1 <= 0 || T2 <= 0) return "En kelvin la temperatura tiene que ser mayor que 0 (más de -273 °C).";
  if (T1 > 2000 || T2 > 2000) return "Usa temperaturas de hasta 2000 K.";
  if (T1 === T2) return "Si la temperatura no cambia, el volumen tampoco: no hace falta la ley de Charles.";
  if (decimales(T2 / T1) > 3) return "Con estas temperaturas la división $T_2$ entre $T_1$ no da un decimal corto. Prueba, por ejemplo, -33 °C y 27 °C.";
  if (decimales((V1 * T2) / T1) > 2) return "Con estos números el volumen final tiene muchos decimales. Prueba con otro volumen.";
  const p = op.presion;
  if (p) {
    if (!(p.p1 > 0 && p.p2 > 0)) return "Las presiones deben ser positivas.";
    if (p.u1 !== p.u2 && p.u1 !== "atm" && p.u2 !== "atm") return "Si las presiones están en unidades distintas, una debe estar en atm.";
    if (decimales(p.p1) > 2 || decimales(p.p2) > 2) return "Escribe las presiones con dos decimales como mucho.";
    if (Math.abs(aAtm(p.p1, p.u1) - aAtm(p.p2, p.u2)) > 1e-9) return "Las dos presiones no son iguales: la ley de Charles solo sirve a presión constante (con presiones distintas se usa la ley combinada).";
  }
  return null;
}

/** V2 = V1·T2/T1, como en el banco: primero T2/T1 (decimal), despues por V1. Comprueba con el producto cruzado. */
export function charles(V1: number, t1: number, t2: number, op: OpcionesCharles = {}): Resultado {
  const kelvin = !!op.kelvin;
  const T1 = kelvin ? t1 : t1 + 273;
  const T2 = kelvin ? t2 : t2 + 273;
  const q = T2 / T1;
  const V2 = (V1 * T2) / T1;
  const uV: U = op.volumen ?? "mL";
  const uT: U = kelvin ? "K" : "C";
  const p = op.presion;
  // fila de datos: arriba el estado del principio, abajo el del final (en el orden del enunciado: T, P, V).
  // Cada estado en dos renglones (temperatura y presion; volumen): en un celular no caben en uno, y los saltos dejan
  // lugar a la letra que se anota debajo de cada dato (sin salto, la etiqueta cae encima del renglon de abajo).
  const fila: Ficha[] = [
    { id: "DT1", tex: nf(t1) },
    uPieza("DT1u", uT),
    ...(p ? [{ id: "Dc1", tex: ",", op: true }, { id: "DP1", tex: nf(p.p1) }, uPieza("DP1u", p.u1)] : []),
    { id: "DS1", tex: "", salto: true },
    { id: "DV1", tex: nf(V1) },
    uPieza("DV1u", uV),
    { id: "DS2", tex: "", salto: true },
    { id: "DT2", tex: nf(t2) },
    uPieza("DT2u", uT),
    ...(p ? [{ id: "Dc3", tex: ",", op: true }, { id: "DP2", tex: nf(p.p2) }, uPieza("DP2u", p.u2)] : []),
    { id: "DS3", tex: "", salto: true },
    { id: "Dq", tex: "V_{2}=\\ ?" },
  ];
  const h = new Hoja(fila);
  const tTex = (x: number) => `${nf(x)}\\ ${uTex(uT)}`;
  const intro =
    op.enunciado ??
    `El volumen de un gas a $${tTex(t1)}$${p ? ` y $${nf(p.p1)}\\ ${uTex(p.u1)}$` : ""} es $${cant(V1, uV)}$. ¿Qué volumen ocupará a $${tTex(t2)}$${p ? ` y $${nf(p.p2)}\\ ${uTex(p.u2)}$` : ", a presión constante"}? Vamos a escribir cada paso, como a lápiz.`;

  h.paso({
    fusiones: [],
    resaltar: ["DT1", "DV1", "DT2", "Dq"],
    texto: `Anotamos los datos: arriba, el gas al principio; abajo, al final. Cambian la temperatura y el volumen, y nos piden $V_{2}$.${p ? " Antes de elegir la ley hay que mirar la presión." : " El enunciado dice que la presión no cambia."}`,
    porque: `Cada ley de los gases sirve cuando una de las cantidades se mantiene igual. Con la presión igual, se usa la ley de Charles.`,
    regla: `$P\\ \\text{constante}\\ \\Rightarrow\\ \\dfrac{V_{1}}{T_{1}}=\\dfrac{V_{2}}{T_{2}}$`,
  });

  // ---- presiones: a la misma unidad, y se ve que son iguales
  if (p) {
    if (p.u1 !== p.u2) {
      // la que no esta en atm se convierte con el factor 1 atm = 760 torr
      const k = p.u1 === "atm" ? "2" : "1";
      const pv = k === "1" ? p.p1 : p.p2;
      const pu = k === "1" ? p.u1 : p.u2;
      const N = `DP${k}`;
      const Uid = `DP${k}u`;
      h.cambiar([Uid], [h.pieza(Uid), { id: "Dx", tex: "\\cdot", op: true }, frPiezas("DFx", [{ id: "Fx1", tex: "1" }, { id: "Fx1u", tex: "\\text{atm}" }], [{ id: "Fx2", tex: "760" }, { id: "Fx2u", tex: uTex(pu) }])]);
      h.paso({
        fusiones: [],
        brotes: [{ desde: Uid, hacia: "DFx" }],
        texto: `Las presiones están en unidades distintas. Pasamos $${nf(pv)}\\ ${uTex(pu)}$ a atmósferas: lo multiplicamos por $\\dfrac{1\\ \\text{atm}}{760\\ ${uTex(pu)}}$.`,
        porque: `Como $1\\ \\text{atm}$ es lo mismo que $760\\ ${uTex(pu)}$, esa fracción vale $1$: multiplicar por ella no cambia la presión, solo su unidad.`,
        regla: `$1\\ \\text{atm}=760\\ ${uTex(pu)}$`,
      });
      h.quitar(Uid, "Fx2u");
      h.paso({
        fusiones: [{ desde: [Uid, "Fx2u"], hacia: null, modo: "tachar" }],
        texto: `El $${uTex(pu)}$ del dato se tacha con el $${uTex(pu)}$ de abajo del factor.`,
        porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
        regla: REGLA_TACHAR,
      });
      h.cambiar(["Fx1"], [{ id: "Fx1b", tex: nf(pv) }]);
      h.quitar(N, "Dx");
      h.paso({
        fusiones: [{ desde: [N, "Dx", "Fx1"], hacia: "Fx1b" }],
        texto: `El número sube a multiplicar arriba de la raya: $${nf(pv)}\\cdot 1=${nf(pv)}$.`,
        porque: `Multiplicar por una fracción es multiplicar su número de arriba. Por $1$ no cambia.`,
        regla: `$a\\cdot\\dfrac{b}{c}=\\dfrac{a\\cdot b}{c}$`,
      });
      const enAtm = pv / 760;
      h.cambiar(["DFx"], [{ id: `${N}a`, tex: nf(enAtm) }, { id: `${N}au`, tex: "\\text{atm}" }]);
      h.paso({
        fusiones: [
          { desde: ["Fx1b", "Fx2"], hacia: `${N}a` },
          { desde: ["DFx", "Fx1u"], hacia: `${N}au`, modo: "viajar" },
        ],
        brotes: [{ desde: "Fx1u", hacia: `${N}au` }],
        texto: `Dividimos: $\\dfrac{${nf(pv)}}{760}=${nf(enAtm)}$. Queda $${nf(enAtm)}\\ \\text{atm}$.`,
        porque: pv === 760 ? `Un número dividido entre sí mismo da $1$.` : `La fracción es una división: el número de arriba entre el de abajo.`,
        regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
      });
      const otra = k === "1" ? "DP2" : "DP1";
      h.paso({
        fusiones: [],
        resaltar: [otra, `${N}a`],
        texto: `Ahora se ve: las dos presiones valen $${nf(aAtm(p.p1, p.u1))}\\ \\text{atm}$. La presión no cambia, así que usamos la ley de Charles.`,
        porque: `A presión constante, el volumen de un gas cambia en la misma proporción que su temperatura en kelvin.`,
        regla: `$P_{1}=P_{2}\\ \\Rightarrow\\ \\dfrac{V_{1}}{T_{1}}=\\dfrac{V_{2}}{T_{2}}$`,
      });
    } else {
      h.paso({
        fusiones: [],
        resaltar: ["DP1", "DP2"],
        texto: `Las dos presiones valen $${nf(p.p1)}\\ ${uTex(p.u1)}$: la presión no cambia, así que usamos la ley de Charles.`,
        porque: `A presión constante, el volumen de un gas cambia en la misma proporción que su temperatura en kelvin.`,
        regla: `$P_{1}=P_{2}\\ \\Rightarrow\\ \\dfrac{V_{1}}{T_{1}}=\\dfrac{V_{2}}{T_{2}}$`,
      });
    }
  }

  // ---- temperaturas a kelvin, de a una
  const idT: Record<"1" | "2", { n: string; u: string }> = { "1": { n: "DT1", u: "DT1u" }, "2": { n: "DT2", u: "DT2u" } };
  for (const [k, tc, T] of [["1", t1, T1], ["2", t2, T2]] as const) {
    if (kelvin) continue;
    h.cambiar([`DT${k}u`], [{ id: `DT${k}p`, tex: "+", op: true }, { id: `DT${k}k`, tex: "273" }, { id: `DT${k}K`, tex: "\\text{K}" }]);
    h.paso({
      fusiones: [{ desde: [`DT${k}u`], hacia: [`DT${k}p`, `DT${k}k`, `DT${k}K`] }],
      texto: `Las leyes de los gases usan la temperatura en kelvin. Para pasar $${tTex(tc)}$ a kelvin se le suma $273$.`,
      porque: `En la escala kelvin el cero es el punto más frío posible; por eso solo con kelvin el volumen es proporcional a la temperatura.`,
      regla: `$T(\\text{K})=t({}^{\\circ}\\text{C})+273$`,
    });
    h.cambiar([`DT${k}`], [{ id: `DT${k}n`, tex: nf(T) }]);
    h.quitar(`DT${k}p`, `DT${k}k`);
    h.paso({
      fusiones: [{ desde: [`DT${k}`, `DT${k}p`, `DT${k}k`], hacia: `DT${k}n` }],
      texto: `Sumamos: $${nf(tc)}+273=${nf(T)}$. Queda $${nf(T)}\\ \\text{K}$.`,
      porque: tc < 0 ? `Para sumar un negativo y un positivo se restan los números sin signo y queda el signo del mayor, que aquí es el $273$.` : `Es una suma común.`,
      regla: `$T(\\text{K})=t({}^{\\circ}\\text{C})+273$`,
    });
    idT[k] = { n: `DT${k}n`, u: `DT${k}K` };
  }

  // ---- etiquetar, de a uno
  for (const [k, id, v, u] of [
    ["V1", "DV1", V1, uV],
    ["T1", idT["1"].n, T1, "K"],
    ["T2", idT["2"].n, T2, "K"],
  ] as const) {
    h.poner(id, { tex: colG(k, nf(v)), debajo: colG(k, `${k[0]}_{${k[1]}}`) });
    h.paso({
      fusiones: [],
      resaltar: [id],
      texto: `$${cant(v, u)}$ es ${k === "V1" ? "el volumen del principio" : k === "T1" ? "la temperatura del principio" : "la temperatura del final"}. La llamamos $${k[0]}_{${k[1]}}$.`,
      porque: `El $1$ es el gas al principio y el $2$, al final. Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
      regla: `$${k[0]}_{${k[1]}}=${cant(v, u)}$`,
    });
  }

  // ---- la ley con letras, debajo (nace de la incognita)
  nacerFormula(
    h,
    [
      { id: "S", tex: "", salto: true },
      frPiezas("FL", [{ id: "FV1", tex: colG("V1", "V_{1}") }], [{ id: "FT1", tex: colG("T1", "T_{1}") }]),
      { id: "Fe", tex: "=", op: true },
      frPiezas("FR", [{ id: "FV2", tex: "V_{2}" }], [{ id: "FT2", tex: colG("T2", "T_{2}") }]),
    ],
    `Escribimos debajo la ley de Charles, todavía con letras. Cada letra tiene el color de su dato.`,
    `Dice que el volumen dividido entre la temperatura da lo mismo al principio y al final.`,
    `$\\dfrac{V_{1}}{T_{1}}=\\dfrac{V_{2}}{T_{2}}$`
  );
  // despejar V2: T2 pasa multiplicando (la misma pieza viaja)
  h.cambiar(["Fe"], [{ id: "Fm", tex: "\\cdot", op: true }, { id: "FT2b", tex: colG("T2", "T_{2}") }, h.pieza("Fe")]);
  h.cambiar(["FR"], [{ id: "FV2b", tex: "V_{2}" }]);
  h.paso({
    fusiones: [{ desde: ["FR", "FV2", "FT2"], hacia: ["FV2b", "FT2b", "Fm"], modo: "viajar" }],
    brotes: [
      { desde: "FT2", hacia: "FT2b" },
      { desde: "FV2", hacia: "FV2b" },
    ],
    texto: `Despejamos $V_{2}$. $T_{2}$ está dividiendo a $V_{2}$: pasa al otro lado multiplicando.`,
    porque: `Es lo mismo que multiplicar los dos lados por $T_{2}$: a la derecha se cancela y $V_{2}$ queda sola.`,
    regla: `$c=\\dfrac{a}{b}\\ \\Rightarrow\\ c\\cdot b=a$`,
  });
  h.ordenar(h.fichas.map((f) => f.id).filter((id) => !["FL", "Fm", "FT2b", "Fe", "FV2b"].includes(id)).concat(["FV2b", "Fe", "FL", "Fm", "FT2b"]));
  h.paso({
    fusiones: [],
    resaltar: ["FV2b"],
    texto: `Damos vuelta la igualdad para que $V_{2}$ quede a la izquierda.`,
    porque: `Una igualdad dice lo mismo leída de izquierda a derecha que de derecha a izquierda.`,
    regla: `$a=b\\ \\iff\\ b=a$`,
  });
  h.cambiar(["FL", "Fm", "FT2b"], [{ id: "GV1", tex: colG("V1", "V_{1}") }, { id: "Gm", tex: "\\cdot", op: true }, frPiezas("GF", [{ id: "GT2", tex: colG("T2", "T_{2}") }], [{ id: "GT1", tex: colG("T1", "T_{1}") }])]);
  h.paso({
    fusiones: [{ desde: ["FL", "FV1", "FT1", "Fm", "FT2b"], hacia: ["GV1", "Gm", "GF"], modo: "viajar" }],
    brotes: [
      { desde: "FV1", hacia: "GV1" },
      { desde: "FT2b", hacia: "GT2" },
      { desde: "FT1", hacia: "GT1" },
    ],
    texto: `Reordenamos: $V_{1}$ sale adelante y $T_{2}$ sube arriba de $T_{1}$. Así queda $V_{2}=V_{1}\\cdot\\dfrac{T_{2}}{T_{1}}$: cuántas veces cambió la temperatura, por el volumen del principio.`,
    porque: `Multiplicar por $T_{2}$ y dividir entre $T_{1}$ se puede hacer en cualquier orden: el resultado es el mismo.`,
    regla: `$\\dfrac{a}{b}\\cdot c=a\\cdot\\dfrac{c}{b}$`,
  });

  // ---- reemplazar de a una letra
  const reemplazar = (letra: string, k: keyof typeof COLOR_G, nDato: string, uDato: string, v: number, u: U, n: string, uid: string, extra: string) => {
    h.cambiar([letra], [{ id: n, tex: colG(k, nf(v)) }, uPieza(uid, u)]);
    h.paso({
      fusiones: [{ desde: [letra], hacia: [n, uid], modo: "viajar" }],
      brotes: [
        { desde: nDato, hacia: n },
        { desde: uDato, hacia: uid },
      ],
      texto: `Reemplazamos $${k[0]}_{${k[1]}}$ por $${cant(v, u)}$: el número y la unidad salen del dato y ocupan el lugar de la letra.${extra}`,
      porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
      regla: `$${k[0]}_{${k[1]}}=${cant(v, u)}$`,
    });
  };
  reemplazar("GV1", "V1", "DV1", "DV1u", V1, uV, "SV1", "SV1u", "");
  reemplazar("GT2", "T2", idT["2"].n, idT["2"].u, T2, "K", "ST2", "ST2u", " Va arriba de la raya.");
  reemplazar("GT1", "T1", idT["1"].n, idT["1"].u, T1, "K", "ST1", "ST1u", " Va abajo de la raya.");

  // ---- calcular: tachar K, dividir, multiplicar
  h.quitar("ST2u", "ST1u");
  h.paso({
    fusiones: [{ desde: ["ST2u", "ST1u"], hacia: null, modo: "tachar" }],
    texto: `Los $\\text{K}$ de arriba y de abajo se tachan.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha. El volumen queda en $${uTex(uV)}$.`,
    regla: `$\\dfrac{a\\ u}{b\\ u}=\\dfrac{a}{b}$`,
  });
  h.cambiar(["GF"], [{ id: "Q", tex: nf(q) }]);
  h.paso({
    fusiones: [{ desde: ["GF"], hacia: "Q" }],
    texto: `Dividimos: $\\dfrac{${nf(T2)}}{${nf(T1)}}=${nf(q)}$.`,
    porque: q > 1 ? `La fracción es una división. Da más de $1$ porque el gas se calienta: su volumen crece.` : `La fracción es una división. Da menos de $1$ porque el gas se enfría: su volumen baja.`,
    regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
  });
  h.cambiar(["SV1"], [{ id: "R", tex: nf(V2) }]);
  h.quitar("Gm", "Q");
  // la unidad del volumen se queda; va despues del resultado
  h.paso({
    fusiones: [{ desde: ["SV1", "Gm", "Q"], hacia: "R" }],
    texto: `Multiplicamos: $${nf(V1)}\\cdot ${nf(q)}=${nf(V2)}$. Resultado: $V_{2}=${cant(V2, uV)}$.`,
    porque: `El volumen del principio cambia tantas veces como cambió la temperatura.`,
    regla: `$V_{2}=V_{1}\\cdot\\dfrac{T_{2}}{T_{1}}$`,
  });

  // ---- comprobacion: producto cruzado con los datos y el resultado
  const P1 = V1 * T2;
  const P2 = V2 * T1;
  h.agregar([
    { id: "CS", tex: "", salto: true },
    { id: "C1", tex: nf(V1) },
    { id: "Cm1", tex: "\\cdot", op: true },
    { id: "C2", tex: nf(T2) },
    { id: "Ce", tex: "=", op: true },
    { id: "C3", tex: nf(V2) },
    { id: "Cm2", tex: "\\cdot", op: true },
    { id: "C4", tex: nf(T1) },
  ]);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "R", hacia: "CS" },
      { desde: "DV1", hacia: "C1" },
      { desde: idT["2"].n, hacia: "C2" },
      { desde: "R", hacia: "C3" },
      { desde: idT["1"].n, hacia: "C4" },
    ],
    texto: `Comprobamos con los datos: si $\\dfrac{V_{1}}{T_{1}}=\\dfrac{V_{2}}{T_{2}}$, multiplicando en cruz, $V_{1}\\cdot T_{2}$ tiene que dar lo mismo que $V_{2}\\cdot T_{1}$.`,
    porque: `En una igualdad de fracciones, el de arriba de una por el de abajo de la otra dan lo mismo.`,
    regla: `$\\dfrac{a}{b}=\\dfrac{c}{d}\\ \\iff\\ a\\cdot d=c\\cdot b$`,
  });
  h.cambiar(["C1", "Cm1", "C2"], [{ id: "CP1", tex: nf(P1) }]);
  h.cambiar(["C3", "Cm2", "C4"], [{ id: "CP2", tex: nf(P2) }]);
  h.paso({
    fusiones: [
      { desde: ["C1", "Cm1", "C2"], hacia: "CP1" },
      { desde: ["C3", "Cm2", "C4"], hacia: "CP2" },
    ],
    texto: `Multiplicamos cada lado: $${nf(V1)}\\cdot ${nf(T2)}=${nf(P1)}$ y $${nf(V2)}\\cdot ${nf(T1)}=${nf(P2)}$. Son dos cuentas independientes, así que van a la vez.`,
    porque: `Primero se multiplica en cada lado; después se comparan.`,
    regla: `$m\\cdot n=p$`,
  });
  h.agregar([{ id: "Cok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Ce", hacia: "Cok" }],
    resaltar: ["CP1", "CP2"],
    texto: `Los dos lados dan $${nf(P1)}$: el resultado cumple la ley. La respuesta es $V_{2}=${cant(V2, uV)}$.`,
    porque: `Si los productos en cruz son iguales, las dos fracciones son iguales.`,
    regla: `$\\dfrac{V_{1}}{T_{1}}=\\dfrac{V_{2}}{T_{2}}$`,
  });
  return {
    demo: { titulo: "", nota: "", intro, estados: h.estados, transiciones: h.trans },
    resumen: { V1, T1, T2, q, V2, P1, P2 },
  };
}
