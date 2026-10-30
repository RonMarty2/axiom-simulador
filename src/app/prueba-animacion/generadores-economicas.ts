// Generador de Economicas: interes simple I = C·r·t y monto M = C + I, con el patron "ANOTAR Y REEMPLAZAR":
//   1. los datos del enunciado tal como vienen (capital en Bs, tasa en %, tiempo en anios o meses);
//   2. ORDENAR antes de reemplazar: la tasa % pasa a fraccion (5 % = 5/100) y, si el tiempo esta en meses, se pasa a
//      anios con un factor de conversion (1 anio / 12 meses), se tachan los meses y se simplifica la fraccion
//      (las listas de divisores quedan escritas en la hoja, con el mayor comun resaltado);
//   3. ETIQUETAR debajo de cada dato su letra (C, r, t), de a una y con su color;
//   4. la FORMULA con letras debajo (nace de lo que piden), y se REEMPLAZA una letra por vez: cada dato VUELA a su lugar;
//   5. CALCULAR una operacion por paso. Todo se multiplica en UNA sola fraccion (C·r·t arriba, 100·denominador abajo), el
//      denominador del tiempo se tacha con un factor del numerador y recien al final se pasa a decimal con coma
//      (E enteros y R centesimas), de modo que NUNCA hay una cuenta con decimales a medio camino;
//   6. el MONTO: M = C + I con su propia formula y sus letras;
//   7. COMPROBAR: el monto menos el capital tiene que dar el interes.
// Los datos quedan arriba hasta el final: son la fila de referencia de la que nace la comprobacion.
// Las cuentas van solo con numeros (todo esta en bolivianos); la unidad Bs vuelve al final desde el dato.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas y etiquetas en LaTeX sin $. Barras dobles.
// La animacion no calcula: cada numero que se escribe sale de una cuenta hecha aqui y comprobada en el test.
import { aplanar, frPiezas, pegarUnidades, sustituir, type Brote, type Ficha, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";
import { productoALapiz, productoGrande, type AplicarPaso } from "./lapiz.ts";

// ---------------------------------------------------------------------------
// Utilidades

const clon = (e: Ficha[]): Ficha[] => JSON.parse(JSON.stringify(e));
/** la puntuacion que sigue a una formula va FUERA de ella, pegada con un word-joiner (U+2060) que MathText reconoce
 *  (mismo mecanismo que generadores-soluciones.ts): ni sube a la altura de la raya ni queda sola al inicio de un renglon */
const WJ = "⁠";
const pegarPunto = (s: string) => s.replace(/\$([.,;:])/g, `$${WJ}$1`);

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
  /** cambia las piezas `viejos` por `nuevos` (a cualquier profundidad) */
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
}

/** numero para mostrar, con coma decimal (notacion del colegio): 12,5 */
export const nf = (x: number): string => {
  const r = Math.round(x * 1000) / 1000;
  const s = String(Math.abs(r)).replace(".", "{,}");
  return r < 0 ? `-${s}` : s;
};
const r2 = (x: number) => Math.round(x * 100) / 100;
const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));
const divisores = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
const lista = (ds: number[]) => `$\\mathbf{${ds.join(",\\ ")}}$`;
/** "1 año" / "2 años"; "1 mes" / "5 meses" */
const anios = (n: number) => (n === 1 ? "año" : "años");
const mesesTxt = (n: number) => (n === 1 ? "mes" : "meses");
const centesimas = (n: number) => (n === 1 ? "centésima" : "centésimas");
const enteros = (n: number) => (n === 1 ? "entero" : "enteros");

const CHECK = "\\textcolor{#16a34a}{\\checkmark}";
// Colores de tres cifras A PROPOSITO (Fusion.tsx reserva bajo cada pieza con etiqueta un ancho que cuenta tambien las
// letras del color; con seis cifras no cabe en un renglon de celular). Se ven en tema claro y oscuro.
const COLOR = { C: "#27e", r: "#2a5", t: "#e50" } as const;
type Clave = keyof typeof COLOR;
const col = (k: Clave, tex: string) => `\\textcolor{${COLOR[k]}}{${tex}}`;

/** pinta de su color las piezas de una fraccion con piezas y le pone la letra debajo */
function etiquetarFrac(h: Hoja, id: string, k: Clave, letra: string) {
  const f = h.pieza(id);
  const n = (f.frac?.nPiezas ?? []).map((p) => ({ ...p, tex: col(k, p.tex) }));
  const d = (f.frac?.dPiezas ?? []).map((p) => ({ ...p, tex: col(k, p.tex) }));
  h.cambiar([id], [{ ...frPiezas(id, n, d), debajo: col(k, letra) }]);
}

/** un renglon "Divisores de n: 1, 2, 3 ..." con cada divisor como pieza propia (los datos en negrita; el rotulo, normal) */
function filaDivisores(pref: string, n: number): Ficha[] {
  return [
    { id: `${pref}S`, tex: "", salto: true },
    { id: `${pref}t`, tex: "\\text{Divisores de}", op: true },
    { id: `${pref}n`, tex: String(n) },
    { id: `${pref}c`, tex: ":\\ ", op: true, pegado: true },
    ...divisores(n).flatMap((d, i): Ficha[] => [...(i > 0 ? [{ id: `${pref}k${d}`, tex: ",", op: true, pegado: true }] : []), { id: `${pref}_${d}`, tex: `\\mathbf{${d}}` }]),
  ];
}

const REGLA_PRODUCTO = `$m\\cdot n=p$`;
const REGLA_NUM_POR_FRAC = `$n\\cdot\\dfrac{a}{b}=\\dfrac{n\\cdot a}{b}$`;
const REGLA_FRAC_POR_NUM = `$\\dfrac{a}{b}\\cdot n=\\dfrac{a\\cdot n}{b}$`;
const REGLA_FRAC_POR_FRAC = `$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a\\cdot c}{b\\cdot d}$`;
const REGLA_DIVISION = `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`;
const REGLA_SIMPLIFICAR = `$\\dfrac{a\\cdot g}{b\\cdot g}=\\dfrac{a}{b}$`;
const PORQUE_FRAC = `Multiplicar un número por una fracción es multiplicar el número por el numerador.`;
const PORQUE_DIV = `La fracción es una división: el número de arriba entre el de abajo.`;
const PORQUE_LETRA = `Se reemplaza una letra por vez, para no perder ningún dato.`;
const PORQUE_CALCULO = `En una fracción, primero se hacen las cuentas de arriba y las de abajo.`;

// ---------------------------------------------------------------------------
// Interes simple

export type UnidadTiempo = "años" | "meses";

export function validarInteres(C: number, r: number, t: number, unidad: string): string | null {
  if (unidad !== "años" && unidad !== "meses") return "El tiempo está en años o en meses.";
  if (![C, r, t].every(Number.isInteger)) return "Escribe números enteros.";
  if (C < 100 || C > 100000) return "El capital debe estar entre 100 y 100000 Bs.";
  if (r < 1 || r > 30) return "La tasa anual debe estar entre 1 % y 30 %.";
  if (unidad === "años" && (t < 1 || t > 10)) return "El tiempo debe estar entre 1 y 10 años.";
  if (unidad === "meses" && (t < 1 || t > 60)) return "El tiempo debe estar entre 1 y 60 meses.";
  const t12 = unidad === "meses" ? t : 12 * t; // el tiempo en doceavos de año
  if ((C * r * t12) % 12 !== 0) return "Con estos números el interés tendría más de 2 decimales. Prueba, por ejemplo, 2000 Bs, 5 % y 18 meses.";
  return null;
}

/** Version RAPIDA: lo que se escribe en el examen (formulas, reemplazar con la tasa y el tiempo ya como fracciones, multiplicar,
 *  dividir, monto). Sin etiquetas de cada dato, sin listas de divisores, sin simplificar y sin comprobacion. Mismo `resumen`. */
function interesRapido(C: number, r: number, t: number, unidad: UnidadTiempo): Resultado {
  const meses = unidad === "meses";
  const g = meses ? mcd(t, 12) : 1;
  const tn = meses ? t / g : t;
  const td = meses ? 12 / g : 1;
  const q1 = r2((C * r) / 100);
  const Y = 100 * (meses ? 12 : 1);
  const X = C * r * t;
  const I = r2(X / Y);
  const M = r2(C + I);
  const unidadDato = meses ? mesesTxt(t) : anios(t);
  const S = (id: string): Ficha => ({ id, tex: "", salto: true });
  const O = (id: string, tex: string): Ficha => ({ id, tex, op: true });
  const P = (id: string, tex: string): Ficha => ({ id, tex });

  const dat: Ficha[] = [
    P("Dc", `C=${nf(C)}\\ \\text{Bs}`),
    O("Dc1", ","),
    P("Dr", `r=${nf(r)}\\ \\%\\ \\text{anual}`),
    O("Dc2", ","),
    P("Dt", `t=${nf(t)}\\ \\text{${unidadDato}}`),
    S("DS1"),
    P("Dq1", "I=\\ ?"),
    O("Dq2c", ","),
    P("Dq2", "M=\\ ?"),
  ];
  let rI: Ficha[] = [];
  let rM: Ficha[] = [];
  const estados: Ficha[][] = [clon(dat)];
  const trans: Transicion[] = [];
  const paso = (tr: Transicion) => {
    estados.push(clon([...dat, ...rI, ...rM]));
    trans.push({ ...tr, texto: pegarPunto(tr.texto), porque: pegarPunto(tr.porque) });
  };
  const tFrac = meses ? `\\dfrac{${t}}{12}` : `${t}`;

  // 1) las dos formulas, con letras
  rI = [S("S1"), P("I0", "I"), O("Ie", "="), P("Cc", "C"), O("m1", "\\cdot"), P("Rr", "r"), O("m2", "\\cdot"), P("Tt", "t")];
  rM = [S("S2"), P("M0", "M"), O("Me", "="), P("Mc", "C"), O("Mp", "+"), P("Mi", "I")];
  paso({
    fusiones: [],
    brotes: [
      { desde: "Dq1", hacia: "S1" },
      { desde: "Dq1", hacia: "I0" },
      { desde: "Dq1", hacia: "Cc" },
      { desde: "Dq1", hacia: "Rr" },
      { desde: "Dq1", hacia: "Tt" },
      { desde: "Dq2", hacia: "S2" },
      { desde: "Dq2", hacia: "M0" },
      { desde: "Dq2", hacia: "Mc" },
      { desde: "Dq2", hacia: "Mi" },
    ],
    texto: `Es interés simple: el interés $I$ es el capital $C$ por la tasa $r$ por el tiempo $t$, y el monto $M$ es el capital más el interés.`,
    porque: `El interés simple siempre se calcula sobre el capital del principio. El monto es todo el dinero al final: lo que había más lo que ganó.`,
    regla: `$I=C\\cdot r\\cdot t,$ $M=C+I$`,
  });

  // 2) reemplazar: la tasa como fraccion de 100 y, si hace falta, el tiempo en anios
  rI = [S("S1"), P("I0", "I"), O("Ie", "="), P("C2", nf(C)), O("m1", "\\cdot"), P("R2", `\\dfrac{${nf(r)}}{100}`), O("m2", "\\cdot"), P("T2", tFrac)];
  paso({
    fusiones: [
      { desde: ["Cc"], hacia: "C2" },
      { desde: ["Rr"], hacia: "R2" },
      { desde: ["Tt"], hacia: "T2" },
    ],
    texto: `Reemplazamos: $C=${nf(C)}$; la tasa $${nf(r)}\\ \\%$ es $\\dfrac{${nf(r)}}{100}$ (por cada cien)${meses ? `; y como la tasa es anual, los $${t}$ ${mesesTxt(t)} se pasan a años: $\\dfrac{${t}}{12}$ (un año tiene $12$ meses)` : `; el tiempo ya está en años: $t=${t}$`}.`,
    porque: `Un porcentaje es una fracción de $100$.${meses ? " La tasa y el tiempo tienen que usar la misma unidad: años." : ""}`,
    regla: `$n\\ \\%=\\dfrac{n}{100}$`,
  });

  // 3) multiplicar todo en una sola fraccion
  rI = [S("S1"), P("I0", "I"), O("Ie", "="), P("Ix", `\\dfrac{${nf(X)}}{${Y}}`)];
  paso({
    fusiones: [{ desde: ["C2", "m1", "R2", "m2", "T2"], hacia: "Ix" }],
    texto: `Multiplicamos todo en una sola fracción: arriba $${nf(C)}\\cdot ${nf(r)}${meses ? `\\cdot ${t}` : `\\cdot ${t}`}=${nf(X)}$ y abajo $100${meses ? "\\cdot 12" : ""}=${Y}$.`,
    porque: `Multiplicar fracciones es multiplicar numerador con numerador y denominador con denominador; un número entero es una fracción sobre $1$.`,
    regla: `$\\dfrac{a}{b}\\cdot\\dfrac{c}{d}=\\dfrac{a\\cdot c}{b\\cdot d}$`,
  });

  // 4) dividir
  rI = [S("S1"), P("I0", "I"), O("Ie", "="), P("Iv", `${nf(I)}\\ \\text{Bs}`)];
  paso({
    fusiones: [{ desde: ["Ix"], hacia: "Iv" }],
    texto: `Dividimos: $\\dfrac{${nf(X)}}{${Y}}=${nf(I)}$. El interés es $I=${nf(I)}\\ \\text{Bs}$.`,
    porque: `La raya de la fracción es una división.`,
  });

  // 5) reemplazar en el monto
  rM = [S("S2"), P("M0", "M"), O("Me", "="), P("Mc2", nf(C)), O("Mp", "+"), P("Mi2", nf(I))];
  paso({
    fusiones: [
      { desde: ["Mc"], hacia: "Mc2" },
      { desde: ["Mi"], hacia: "Mi2" },
    ],
    texto: `Reemplazamos en el monto: $C=${nf(C)}$ e $I=${nf(I)}$.`,
    porque: `Cada letra se cambia por su valor.`,
  });

  // 6) el monto
  rM = [S("S2"), P("M0", "M"), O("Me", "="), P("Mv", `${nf(M)}\\ \\text{Bs}`)];
  paso({
    fusiones: [{ desde: ["Mc2", "Mp", "Mi2"], hacia: "Mv" }],
    texto: `Sumamos: $${nf(C)}+${nf(I)}=${nf(M)}$. El monto es $M=${nf(M)}\\ \\text{Bs}$.`,
    porque: `El monto es el capital más lo que ganó.`,
    regla: `$M=C+I$`,
  });

  const intro = `Se deposita un capital de $${nf(C)}\\ \\text{Bs}$ al $${nf(r)}\\ \\%$ de interés simple anual durante $${t}\\ \\text{${unidadDato}}$. ¿Cuál es el interés y cuál es el monto? Es la versión rápida: lo que se escribe en el examen.`;
  return { demo: { titulo: "", nota: "", intro: pegarPunto(intro), estados, transiciones: trans }, resumen: { C, r, t, meses: meses ? 1 : 0, tn, td, tAnios: tn / td, I, M, q1 } };
}

/** I = C·r·t y M = C + I; el tiempo en meses se pasa a anios antes de reemplazar */
export function interesSimple(C: number, r: number, t: number, unidad: UnidadTiempo, enunciado?: string, rapido = false): Resultado {
  if (rapido) return interesRapido(C, r, t, unidad);
  const meses = unidad === "meses";
  const g = meses ? mcd(t, 12) : 1;
  const tn = meses ? t / g : t; // el tiempo en anios es tn/td
  const td = meses ? 12 / g : 1;
  const tFrac = td > 1;
  const q1 = r2((C * r) / 100); // lo que gana el capital en un anio (solo para el resumen)
  const X1 = C * r; // C·r
  const X = X1 * tn; // C·r·tn
  const Y = X / td; // el interes en centesimas: es entero porque validarInteres lo exige
  const I = r2(Y / 100);
  const M = r2(C + I);
  const cantC = `${nf(C)}\\ \\text{Bs}`;
  const cantT = tFrac ? `\\dfrac{${tn}}{${td}}\\ \\text{años}` : `${tn}\\ \\text{${anios(tn)}}`;
  const unidadDato = meses ? mesesTxt(t) : anios(t);

  const h = new Hoja([
    { id: "Dc", tex: nf(C) },
    { id: "Dcu", tex: "\\text{Bs}" },
    { id: "Dc1", tex: ",", op: true, pegado: true },
    { id: "Dr", tex: nf(r) },
    { id: "Drp", tex: "\\%" },
    { id: "Dra", tex: "\\text{anual}" },
    { id: "DS1", tex: "", salto: true },
    { id: "Dt", tex: nf(t) },
    { id: "Dtu", tex: `\\text{${unidadDato}}` },
    { id: "DS2", tex: "", salto: true },
    { id: "Dq1", tex: "I=\\ ?" },
    { id: "Dq2c", tex: ",", op: true, pegado: true },
    { id: "Dq2", tex: "M=\\ ?" },
  ]);
  const intro =
    enunciado ??
    `Se deposita un capital de $${cantC}$ al $${nf(r)}\\ \\%$ de interés simple anual durante $${t}\\ \\text{${unidadDato}}$. ¿Cuál es el interés y cuál es el monto? Vamos a escribir cada paso, como a lápiz.`;

  // ---- 1. los datos tal como vienen
  h.paso({
    fusiones: [],
    resaltar: ["Dc", "Dcu", "Dr", "Drp", "Dra", "Dt", "Dtu", "Dq1", "Dq2"],
    texto: `Anotamos los datos del enunciado y lo que piden: el interés $I$ (lo que gana el dinero) y el monto $M$ (todo el dinero al final). Es interés simple: siempre se calcula sobre el capital del principio. ${meses ? "Pero la tasa viene en porcentaje y el tiempo en meses: hay que ordenarlos antes de usar la fórmula." : "Pero la tasa viene en porcentaje: hay que pasarla a fracción antes de usar la fórmula."}`,
    porque: `Un porcentaje no se puede multiplicar tal cual: es una fracción de $100$.${meses ? " Y la tasa es anual, así que el tiempo tiene que estar en años." : ""}`,
    regla: `$I=C\\cdot r\\cdot t$`,
  });

  // ---- 2a. ordenar: la tasa % pasa a fraccion
  h.cambiar(["Dr", "Drp"], [frPiezas("Drf", [{ id: "Drn", tex: nf(r) }], [{ id: "Drd", tex: "100" }])]);
  h.paso({
    fusiones: [{ desde: ["Dr", "Drp"], hacia: "Drf" }],
    resaltar: meses ? undefined : ["Dt", "Dtu", "Dra"],
    texto: `El símbolo $\\%$ quiere decir "por cada cien": $${nf(r)}\\ \\%$ es $\\dfrac{${nf(r)}}{100}$.${meses ? "" : ` El tiempo ya está en años, igual que la tasa: no hay que convertirlo.`}`,
    porque: `Un porcentaje es una fracción cuyo denominador es $100$.`,
    regla: `$n\\ \\%=\\dfrac{n}{100}$`,
  });

  // ---- 2b. ordenar: el tiempo en meses pasa a anios
  let tv = "Dt"; // pieza con el valor del tiempo en anios
  let tnId = "Dt";
  let tdId = "";
  if (meses) {
    h.paso({
      fusiones: [],
      resaltar: ["Dra", "Dtu"],
      texto: `La tasa es anual: dice cuánto se gana por cada año. Pero el tiempo está en meses. Un año tiene $12$ meses. Hay que pasar ${t === 1 ? "el" : "los"} $${t}$ ${mesesTxt(t)} a años.`,
      porque: `La tasa y el tiempo tienen que hablar de la misma unidad de tiempo, como sumar metros con metros.`,
      regla: `$1\\ \\text{año}=12\\ \\text{meses}$`,
    });
    h.cambiar(
      ["Dtu"],
      [
        h.pieza("Dtu"),
        { id: "Cx1", tex: "\\cdot", op: true },
        frPiezas(
          "FC",
          [
            { id: "FCn", tex: "1" },
            { id: "FCnu", tex: "\\text{año}" },
          ],
          [
            { id: "FCd", tex: "12" },
            { id: "FCdu", tex: "\\text{meses}" },
          ]
        ),
      ]
    );
    h.paso({
      fusiones: [],
      brotes: [{ desde: "Dra", hacia: "FC" }],
      texto: `Escribimos la equivalencia como fracción: $\\dfrac{1\\ \\text{año}}{12\\ \\text{meses}}$. Vale $1$, así que multiplicar por ella no cambia la cantidad de tiempo, solo la unidad.`,
      porque: `Un año y doce meses son el mismo tiempo: arriba y abajo hay lo mismo, y una fracción así vale $1$.`,
      regla: `$\\dfrac{1\\ \\text{año}}{12\\ \\text{meses}}=1$`,
    });
    h.quitar("Dtu", "FCdu");
    h.paso({
      fusiones: [{ desde: ["Dtu", "FCdu"], hacia: null, modo: "tachar" }],
      texto: `${t === 1 ? "El mes de arriba se tacha con los meses de abajo" : "Los $\\text{meses}$ de arriba se tachan con los $\\text{meses}$ de abajo"}. Queda solo $\\text{año}$.`,
      porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
      regla: `$\\dfrac{u}{u}=1$`,
    });
    h.cambiar(["Dt", "Cx1", "FC"], [frPiezas("Tf", [{ id: "Tfn", tex: nf(t) }], [{ id: "Tfd", tex: "12" }]), { id: "Tfu", tex: "\\text{años}" }]);
    h.paso({
      fusiones: [{ desde: ["Dt", "Cx1", "FC"], hacia: ["Tf", "Tfu"], modo: "viajar" }],
      brotes: [
        { desde: "Dt", hacia: "Tfn" },
        { desde: "FC", hacia: "Tfd" },
        { desde: "FC", hacia: "Tfu" },
      ],
      texto: `El $${t}$ entra arriba, multiplicando al $1$ $(${t}\\cdot 1=${t})$, y el $12$ queda abajo. Ya tenemos el tiempo en años: $\\dfrac{${t}}{12}\\ \\text{años}$.`,
      porque: `Multiplicar un número por una fracción es multiplicar el número por el numerador. Por $1$ no cambia nada.`,
      regla: REGLA_NUM_POR_FRAC,
    });
    tv = "Tf";
    tnId = "Tfn";
    tdId = "Tfd";

    // ¿se puede simplificar t/12? Las dos listas de divisores quedan en la hoja
    const comunes = divisores(t).filter((d) => 12 % d === 0);
    const fila1 = filaDivisores("L1", t);
    const fila2 = filaDivisores("L2", 12);
    const idsListas = [...fila1, ...fila2].map((f) => f.id);
    h.agregar([...fila1, ...fila2]);
    h.paso({
      fusiones: [],
      brotes: [
        ...fila1.filter((f) => !f.op && !f.salto).map((f): Brote => ({ desde: "Tfn", hacia: f.id })),
        ...fila2.filter((f) => !f.op && !f.salto).map((f): Brote => ({ desde: "Tfd", hacia: f.id })),
      ],
      texto: `¿Se puede simplificar $\\dfrac{${t}}{12}$? Hace falta un número que divida al de arriba y al de abajo. Los divisores de un número son los que lo dividen sin que sobre nada: escribimos los de $${t}$ y los de $12$.`,
      porque: `Para simplificar hace falta un número que divida al de arriba y al de abajo.`,
      regla: REGLA_SIMPLIFICAR,
    });
    h.paso({
      fusiones: [],
      resaltar: comunes.flatMap((d) => [`L1_${d}`, `L2_${d}`]),
      texto:
        g > 1
          ? `Los que están en las dos listas son ${lista(comunes)}. El mayor es el $${g}$.`
          : `El único que está en las dos listas es el $1$.`,
      porque: g > 1 ? `Dividir arriba y abajo entre el mayor número común deja la fracción lo más simple posible.` : `Con solo el $1$ en común no se puede simplificar más.`,
      regla: REGLA_SIMPLIFICAR,
    });
    if (g > 1) {
      // si el factor comun ES el numero (12 = 1·12), esa pieza viaja entera a su lugar (modo viajar) en vez de desaparecer
      h.cambiar(["Tfn"], [{ id: "Tna", tex: nf(tn) }, { id: "Tnx", tex: "\\cdot", op: true }, { id: "Tng", tex: String(g) }]);
      h.cambiar(["Tfd"], [{ id: "Tda", tex: nf(td) }, { id: "Tdx", tex: "\\cdot", op: true }, { id: "Tdg", tex: String(g) }]);
      h.paso({
        fusiones: [
          tn === 1 ? { desde: ["Tfn"], hacia: "Tng", modo: "viajar" } : { desde: ["Tfn"], hacia: ["Tna", "Tnx", "Tng"] },
          td === 1 ? { desde: ["Tfd"], hacia: "Tdg", modo: "viajar" } : { desde: ["Tfd"], hacia: ["Tda", "Tdx", "Tdg"] },
        ],
        brotes: [
          tn === 1 ? { desde: "Tfn", hacia: "Tng" } : { desde: `L1_${g}`, hacia: "Tng" },
          td === 1 ? { desde: "Tfd", hacia: "Tdg" } : { desde: `L2_${g}`, hacia: "Tdg" },
          ...(tn === 1 ? [{ desde: "L1_1", hacia: "Tna" }] : []),
          ...(td === 1 ? [{ desde: "L2_1", hacia: "Tda" }] : []),
        ],
        descompone: true,
        texto: `Escribimos arriba y abajo como un producto por $${g}$: $${t}=${tn}\\cdot ${g}$ y $12=${td}\\cdot ${g}$.`,
        porque: `Así se ve el $${g}$ que se repite arriba y abajo.`,
        regla: `$n=a\\cdot g$`,
      });
      h.quitar("Tnx", "Tng", "Tdx", "Tdg", ...idsListas);
      if (td === 1) h.poner("Tfu", { tex: `\\text{${anios(tn)}}` });
      h.paso({
        fusiones: [
          { desde: ["Tnx", "Tng", "Tdx", "Tdg"], hacia: null, modo: "tachar" },
          { desde: idsListas, hacia: null },
        ],
        texto: `Tachamos el $${g}$ de arriba con el $${g}$ de abajo. Queda $\\dfrac{${tn}}{${td}}\\ \\text{${td === 1 ? anios(tn) : "años"}}$. Las listas ya cumplieron su trabajo y se borran.`,
        porque: `Un número dividido entre sí mismo vale $1$: por eso se tacha.`,
        regla: REGLA_SIMPLIFICAR,
      });
      tnId = "Tna";
      tdId = "Tda";
      if (td === 1) {
        // a/1 = a: son años completos
        h.cambiar(["Tf"], [{ id: "Tv", tex: nf(tn) }]);
        h.paso({
          fusiones: [{ desde: ["Tf"], hacia: "Tv" }],
          texto: `Dividir entre $1$ no cambia el número: $\\dfrac{${tn}}{1}=${tn}$. ${tn === 1 ? "Es $1$ año completo" : `Son $${tn}$ años completos`}.`,
          porque: `Un número dividido entre $1$ queda igual.`,
          regla: `$\\dfrac{a}{1}=a$`,
        });
        tv = "Tv";
        tnId = "Tv";
      }
    } else {
      h.quitar(...idsListas);
      h.paso({
        fusiones: [{ desde: idsListas, hacia: null }],
        texto: `No hay nada que tachar: $\\dfrac{${t}}{12}$ ya es la fracción más simple. Las listas se borran.`,
        porque: `Con solo el $1$ en común no se puede simplificar más.`,
        regla: REGLA_SIMPLIFICAR,
      });
    }
  }

  // ---- 3. etiquetar, de a uno
  h.poner("Dc", { tex: col("C", nf(C)), debajo: col("C", "C") });
  h.paso({
    fusiones: [],
    resaltar: ["Dc"],
    texto: `$${cantC}$ es el dinero con el que empieza: el capital. Lo llamamos $C$.`,
    porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
    regla: `$C=${cantC}$`,
  });
  etiquetarFrac(h, "Drf", "r", "r");
  h.paso({
    fusiones: [],
    resaltar: ["Drf"],
    texto: `$\\dfrac{${nf(r)}}{100}$ es lo que gana el dinero por cada año: la tasa. La llamamos $r$.`,
    porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
    regla: `$r=\\dfrac{${nf(r)}}{100}\\ \\text{anual}$`,
  });
  if (tFrac) etiquetarFrac(h, tv, "t", "t");
  else h.poner(tv, { tex: col("t", nf(tn)), debajo: col("t", "t") });
  h.paso({
    fusiones: [],
    resaltar: [tv],
    texto: `$${cantT}$ es cuánto tiempo está el dinero: el tiempo. Lo llamamos $t$.`,
    porque: `La tasa es anual, por eso el tiempo tiene que estar en años.`,
    regla: `$t=${cantT}$`,
  });

  // ---- 4. la formula del interes nace de lo que piden
  const formula: Ficha[] = [
    { id: "S", tex: "", salto: true },
    { id: "FI", tex: "I" },
    { id: "Fe", tex: "=", op: true },
    { id: "Fc", tex: col("C", "C") },
    { id: "Fm1", tex: "\\cdot", op: true },
    { id: "Fr", tex: col("r", "r") },
    { id: "Fm2", tex: "\\cdot", op: true },
    { id: "Ft", tex: col("t", "t") },
  ];
  h.agregar(formula);
  h.paso({
    fusiones: [],
    brotes: formula.filter((f) => !f.op).map((f) => ({ desde: "Dq1", hacia: f.id })),
    texto: `Escribimos debajo la fórmula del interés simple, todavía con letras. Cada letra tiene el color de su dato.`,
    porque: `El interés es el capital por lo que gana en cada año ($r$) y por la cantidad de años ($t$).`,
    regla: `$I=C\\cdot r\\cdot t$`,
  });

  // ---- 5. reemplazar una letra por vez
  h.cambiar(["Fc"], [{ id: "Nc", tex: col("C", nf(C)) }]);
  h.paso({
    fusiones: [{ desde: ["Fc"], hacia: "Nc", modo: "viajar" }],
    brotes: [{ desde: "Dc", hacia: "Nc" }],
    texto: `Reemplazamos $C$ por $${nf(C)}$. Aparece una sola vez. Escribimos solo el número: todo está en bolivianos y la unidad la agregamos al final.`,
    porque: PORQUE_LETRA,
    regla: `$C=${cantC}$`,
  });
  h.cambiar(["Fr"], [frPiezas("Nr", [{ id: "Nrn", tex: col("r", nf(r)) }], [{ id: "Nrd", tex: col("r", "100") }])]);
  h.paso({
    fusiones: [{ desde: ["Fr"], hacia: "Nr", modo: "viajar" }],
    brotes: [
      { desde: "Drn", hacia: "Nrn" },
      { desde: "Drd", hacia: "Nrd" },
    ],
    texto: `Reemplazamos $r$ por $\\dfrac{${nf(r)}}{100}$, la tasa ya pasada a fracción. Aparece una sola vez.`,
    porque: PORQUE_LETRA,
    regla: `$r=\\dfrac{${nf(r)}}{100}$`,
  });
  if (tFrac) {
    h.cambiar(["Ft"], [frPiezas("Nt", [{ id: "Ntn", tex: col("t", nf(tn)) }], [{ id: "Ntd", tex: col("t", nf(td)) }])]);
  } else {
    h.cambiar(["Ft"], [{ id: "Nt", tex: col("t", nf(tn)) }]);
  }
  h.paso({
    fusiones: [{ desde: ["Ft"], hacia: "Nt", modo: "viajar" }],
    brotes: tFrac
      ? [
          { desde: tnId, hacia: "Ntn" },
          { desde: tdId, hacia: "Ntd" },
        ]
      : [{ desde: tv, hacia: "Nt" }],
    texto: `Reemplazamos $t$ por $${tFrac ? `\\dfrac{${tn}}{${td}}` : tn}$, el tiempo ya en años. Aparece una sola vez.`,
    porque: PORQUE_LETRA,
    regla: `$t=${cantT}$`,
  });

  // ---- 6. calcular, una operacion por paso. Primero C·r: el numero entra arriba de la fraccion
  if (r === 1) {
    // por 1 no cambia el numero: se dice en el mismo paso, sin un paso aparte para C·1
    h.cambiar(["Nc", "Fm1", "Nr"], [frPiezas("P1", [{ id: "P1n", tex: nf(C) }], [{ id: "P1d", tex: "100" }])]);
    h.paso({
      fusiones: [{ desde: ["Nc", "Fm1", "Nr"], hacia: "P1", modo: "viajar" }],
      brotes: [
        { desde: "Nc", hacia: "P1n" },
        { desde: "Nr", hacia: "P1d" },
      ],
      texto: `Primero el capital por la tasa: $${nf(C)}\\cdot\\dfrac{1}{100}=\\dfrac{${nf(C)}\\cdot 1}{100}=\\dfrac{${nf(C)}}{100}$. El número entra arriba, multiplicando, y multiplicar por $1$ no cambia nada.`,
      porque: PORQUE_FRAC,
      regla: REGLA_NUM_POR_FRAC,
    });
  } else {
    h.cambiar(
      ["Nc", "Fm1", "Nr"],
      [
        frPiezas(
          "P1",
          [
            { id: "P1a", tex: nf(C) },
            { id: "P1x", tex: "\\cdot", op: true },
            { id: "P1b", tex: nf(r) },
          ],
          [{ id: "P1d", tex: "100" }]
        ),
      ]
    );
    h.paso({
      fusiones: [{ desde: ["Nc", "Fm1", "Nr"], hacia: "P1", modo: "viajar" }],
      brotes: [
        { desde: "Nc", hacia: "P1a" },
        { desde: "Nr", hacia: "P1b" },
        { desde: "Nr", hacia: "P1d" },
      ],
      texto: `Primero el capital por la tasa: $${nf(C)}\\cdot\\dfrac{${nf(r)}}{100}=\\dfrac{${nf(C)}\\cdot ${nf(r)}}{100}$. El número entra arriba, multiplicando.`,
      porque: PORQUE_FRAC,
      regla: REGLA_NUM_POR_FRAC,
    });
    h.cambiar(["P1a", "P1x", "P1b"], [{ id: "P1n", tex: nf(X1) }]);
    h.paso({
      fusiones: [{ desde: ["P1a", "P1x", "P1b"], hacia: "P1n" }],
      texto: `Multiplicamos arriba: $${nf(C)}\\cdot ${nf(r)}=${nf(X1)}$.`,
      porque: PORQUE_CALCULO,
      regla: REGLA_PRODUCTO,
    });
  }
  // ahora por el tiempo: todo queda en UNA fraccion (nada de decimales a medio camino)
  h.cambiar(
    ["P1", "Fm2", "Nt"],
    [
      frPiezas(
        "P2",
        tn === 1
          ? [{ id: "P2n", tex: nf(X1) }]
          : [
              { id: "P2a", tex: nf(X1) },
              { id: "P2x", tex: "\\cdot", op: true },
              { id: "P2b", tex: nf(tn) },
            ],
        tFrac
          ? [
              { id: "P2d1", tex: "100" },
              { id: "P2dx", tex: "\\cdot", op: true },
              { id: "P2d2", tex: nf(td) },
            ]
          : [{ id: "P2d1", tex: "100" }]
      ),
    ]
  );
  h.paso({
    fusiones: [{ desde: ["P1", "Fm2", "Nt"], hacia: "P2", modo: "viajar" }],
    brotes: [
      { desde: "P1", hacia: tn === 1 ? "P2n" : "P2a" },
      { desde: "Nt", hacia: tn === 1 ? "P2n" : "P2b" },
      { desde: "P1", hacia: "P2d1" },
      ...(tFrac ? [{ desde: "Nt", hacia: "P2d2" }] : []),
    ],
    texto: tFrac
      ? tn === 1
        ? `Ahora el tiempo: $\\dfrac{${nf(X1)}}{100}\\cdot\\dfrac{1}{${td}}=\\dfrac{${nf(X1)}}{100\\cdot ${td}}$. Los denominadores van juntos abajo; arriba, multiplicar por $1$ no cambia el número.`
        : `Ahora el tiempo: $\\dfrac{${nf(X1)}}{100}\\cdot\\dfrac{${tn}}{${td}}=\\dfrac{${nf(X1)}\\cdot ${tn}}{100\\cdot ${td}}$. Al multiplicar fracciones, los numeradores van juntos arriba y los denominadores juntos abajo.`
      : tn === 1
        ? `Ahora el tiempo: $\\dfrac{${nf(X1)}}{100}\\cdot 1=\\dfrac{${nf(X1)}}{100}$. Es $1$ año, y multiplicar por $1$ no cambia nada.`
        : `Ahora el tiempo: $\\dfrac{${nf(X1)}}{100}\\cdot ${tn}=\\dfrac{${nf(X1)}\\cdot ${tn}}{100}$. El número entra arriba, multiplicando.`,
    porque: tFrac ? `Multiplicar fracciones es multiplicar arriba con arriba y abajo con abajo.` : PORQUE_FRAC,
    regla: tFrac ? REGLA_FRAC_POR_FRAC : REGLA_FRAC_POR_NUM,
  });
  if (tn !== 1) {
    h.cambiar(["P2a", "P2x", "P2b"], [{ id: "P2n", tex: nf(X) }]);
    h.paso({
      fusiones: [{ desde: ["P2a", "P2x", "P2b"], hacia: "P2n" }],
      texto: `Multiplicamos arriba: $${nf(X1)}\\cdot ${tn}=${nf(X)}$.`,
      porque: PORQUE_CALCULO,
      regla: REGLA_PRODUCTO,
    });
  }
  let Ynum = "P2n"; // la pieza de arriba que vale Y (el interes en centesimas)
  if (tFrac) {
    // el denominador del tiempo se saca de arriba y se tacha: X = Y·td (la division es exacta)
    h.cambiar(["P2n"], [{ id: "P2y", tex: nf(Y) }, { id: "P2yx", tex: "\\cdot", op: true }, { id: "P2yt", tex: nf(td) }]);
    h.paso({
      fusiones: [{ desde: ["P2n"], hacia: ["P2y", "P2yx", "P2yt"] }],
      brotes: [{ desde: "P2d2", hacia: "P2yt" }],
      descompone: true,
      texto: `Abajo está el $${td}$. Arriba, $${nf(X)}$ se divide exacto entre $${td}$ y da $${nf(Y)}$, así que $${nf(X)}=${nf(Y)}\\cdot ${td}$. Así aparece el $${td}$ también arriba, y así queda un número entero.`,
      porque: `Escribir un número como un producto no cambia su valor, y así se puede tachar lo que se repite.`,
      regla: `$n=a\\cdot g$`,
    });
    h.quitar("P2yx", "P2yt", "P2dx", "P2d2");
    h.paso({
      fusiones: [{ desde: ["P2yx", "P2yt", "P2dx", "P2d2"], hacia: null, modo: "tachar" }],
      texto: `Tachamos el $${td}$ de arriba con el $${td}$ de abajo. Queda $\\dfrac{${nf(Y)}}{100}$.`,
      porque: `Un número dividido entre sí mismo vale $1$: por eso se tacha.`,
      regla: REGLA_SIMPLIFICAR,
    });
    Ynum = "P2y";
  }

  // ---- el interes en centesimas (Y arriba, 100 abajo) se pasa a entero o a decimal con coma
  if (Y % 100 === 0) {
    // no se divide de un golpe un numero grande: Y = I·100, y el 100 de arriba se tacha con el de abajo
    h.cambiar([Ynum], [{ id: "Ia", tex: nf(I) }, { id: "Ix", tex: "\\cdot", op: true }, { id: "Ib", tex: "100" }]);
    h.paso({
      fusiones: [{ desde: [Ynum], hacia: ["Ia", "Ix", "Ib"] }],
      brotes: [{ desde: "P2d1", hacia: "Ib" }],
      descompone: true,
      texto: `Abajo hay un $100$ y arriba $${nf(Y)}$ termina en ceros: $${nf(Y)}=${nf(I)}\\cdot 100$. Así aparece el $100$ también arriba y no hace falta dividir un número grande.`,
      porque: `Escribir un número como un producto no cambia su valor, y así se puede tachar lo que se repite.`,
      regla: `$n=a\\cdot g$`,
    });
    h.quitar("Ix", "Ib", "P2d1");
    h.cambiar(["P2"], [{ id: "Ires", tex: nf(I) }]);
    h.paso({
      fusiones: [
        { desde: ["Ix", "Ib", "P2d1"], hacia: null, modo: "tachar" },
        { desde: ["P2"], hacia: "Ires", modo: "viajar" },
      ],
      brotes: [{ desde: "P2", hacia: "Ires" }],
      texto: `Tachamos el $100$ de arriba con el $100$ de abajo. Queda $${nf(I)}$.`,
      porque: `Un número dividido entre sí mismo vale $1$: por eso se tacha.`,
      regla: REGLA_SIMPLIFICAR,
    });
  } else {
    const E = Math.floor(Y / 100);
    const R = Y % 100;
    const Rs = R < 10 ? `0${R}` : String(R);
    const ceroFinal = R % 10 === 0;
    const idDec = ceroFinal ? "Dec" : "Ires";
    const leer = R < 10 ? ` Las centésimas son dos lugares después de la coma: el $${R}$ va en el segundo y el primero queda en $0$.` : "";
    if (E > 0) {
      // a) Y = E·100 + R
      h.cambiar(
        [Ynum],
        [
          { id: "Ea", tex: String(E) },
          { id: "Ex", tex: "\\cdot", op: true },
          { id: "Eb", tex: "100" },
          { id: "Ep", tex: "+", op: true },
          { id: "Ec", tex: String(R) },
        ]
      );
      h.paso({
        fusiones: [{ desde: [Ynum], hacia: ["Ea", "Ex", "Eb", "Ep", "Ec"] }],
        brotes: [{ desde: "P2d1", hacia: "Eb" }],
        descompone: true,
        texto: `Esta división no da un entero, así que miramos cuántos enteros caben. Cada $100$ centésimas forman $1$ entero: en $${nf(Y)}$ ${centesimas(Y)} caben $${E}$ ${enteros(E)} $(${E}\\cdot 100=${E * 100})$ y sobran $${R}$ ${centesimas(R)}. Entonces $${nf(Y)}=${E}\\cdot 100+${R}$.`,
        porque: `Escribir el número como enteros más lo que sobra no cambia su valor.`,
        regla: `$n=q\\cdot b+s$`,
      });
      // b) la suma de arriba se separa en dos fracciones con el mismo denominador
      h.cambiar(
        ["P2"],
        [
          frPiezas("Qa", [{ id: "Ea", tex: String(E) }, { id: "Ex", tex: "\\cdot", op: true }, { id: "Eb", tex: "100" }], [{ id: "P2d1", tex: "100" }]),
          { id: "Ep", tex: "+", op: true },
          frPiezas("Qb", [{ id: "Ec", tex: String(R) }], [{ id: "Qbd", tex: "100" }]),
        ]
      );
      h.paso({
        fusiones: [{ desde: ["P2"], hacia: ["Qa", "Qb"], modo: "viajar" }],
        brotes: [{ desde: "P2", hacia: "Qbd" }],
        texto: `Separamos la fracción en dos, cada sumando sobre el mismo $100$: $\\dfrac{${E}\\cdot 100}{100}+\\dfrac{${R}}{100}$.`,
        porque: `Sumar y dividir entre el mismo número se puede hacer por separado: es lo mismo que repartir cada sumando.`,
        regla: `$\\dfrac{a+b}{c}=\\dfrac{a}{c}+\\dfrac{b}{c}$`,
      });
      // c) el 100 de arriba se tacha con el de abajo: quedan los enteros
      h.quitar("Ex", "Eb", "P2d1");
      h.cambiar(["Qa"], [{ id: "Ei", tex: String(E) }]);
      h.paso({
        fusiones: [
          { desde: ["Ex", "Eb", "P2d1"], hacia: null, modo: "tachar" },
          { desde: ["Qa"], hacia: "Ei", modo: "viajar" },
        ],
        brotes: [{ desde: "Qa", hacia: "Ei" }],
        texto: `Tachamos el $100$ de arriba con el $100$ de abajo: $\\dfrac{${E}\\cdot 100}{100}$ queda en $${E}$ ${enteros(E)}. La otra fracción, $\\dfrac{${R}}{100}$, no se toca.`,
        porque: `Un número dividido entre sí mismo vale $1$: por eso se tacha.`,
        regla: REGLA_SIMPLIFICAR,
      });
      // d) leer con coma
      h.cambiar(["Ei", "Ep", "Qb"], [{ id: idDec, tex: `${E}{,}${Rs}` }]);
      h.paso({
        fusiones: [{ desde: ["Ei", "Ep", "Qb"], hacia: idDec }],
        texto: `$${E}$ ${enteros(E)} y $${R}$ ${centesimas(R)} se escriben juntos con coma: $${E}{,}${Rs}$.${leer}`,
        porque: `Los enteros van antes de la coma y las centésimas, que son dos lugares, después.`,
        regla: `$a+\\dfrac{b}{100}=a{,}b$`,
      });
    } else {
      // Y < 100: no hay enteros, solo centesimas
      h.cambiar(["P2"], [{ id: idDec, tex: `0{,}${Rs}` }]);
      h.paso({
        fusiones: [{ desde: ["P2"], hacia: idDec }],
        texto: `Esta división no da un entero: $\\dfrac{${R}}{100}$ son $${R}$ ${centesimas(R)}, menos de un entero. Se escriben con coma: $0{,}${Rs}$.${leer}`,
        porque: `Una fracción con $100$ abajo se lee directo como decimal: dos lugares después de la coma.`,
        regla: `$\\dfrac{a}{100}=a\\ \\text{centésimas}$`,
      });
    }
    if (ceroFinal) {
      h.cambiar(["Dec"], [{ id: "Ires", tex: nf(I) }]);
      h.paso({
        fusiones: [{ desde: ["Dec"], hacia: "Ires" }],
        texto: `El $0$ del final no cambia el valor: $${E > 0 ? `${E}{,}${Rs}` : `0{,}${Rs}`}$ es lo mismo que $${nf(I)}$.`,
        porque: `Un cero a la derecha de los decimales no cambia el número.`,
        regla: `$a{,}b0=a{,}b$`,
      });
    }
  }
  h.cambiar(["Ires"], [h.pieza("Ires"), { id: "Iu", tex: "\\text{Bs}" }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Dcu", hacia: "Iu" }],
    texto: `El capital estaba en $\\text{Bs}$, así que el interés también. Resultado: $I=${nf(I)}\\ \\text{Bs}$.`,
    porque: `Un número por un número de bolivianos da bolivianos: la unidad vuelve desde el dato.`,
    regla: `$I=${nf(I)}\\ \\text{Bs}$`,
  });

  // ---- 7. el monto: M = C + I
  const fM: Ficha[] = [
    { id: "S2", tex: "", salto: true },
    { id: "FM", tex: "M" },
    { id: "Fe2", tex: "=", op: true },
    { id: "Gc", tex: col("C", "C") },
    { id: "Gp", tex: "+", op: true },
    { id: "Gi", tex: "I" },
  ];
  h.agregar(fM);
  h.paso({
    fusiones: [],
    brotes: fM.filter((f) => !f.op).map((f) => ({ desde: "Dq2", hacia: f.id })),
    texto: `Para el monto escribimos otra fórmula, con letras: el capital más el interés.`,
    porque: `El monto es todo el dinero al final: el capital con el que empezó más lo que ganó.`,
    regla: `$M=C+I$`,
  });
  h.cambiar(["Gc"], [{ id: "Mc", tex: col("C", nf(C)) }, { id: "Mcu", tex: "\\text{Bs}" }]);
  h.paso({
    fusiones: [{ desde: ["Gc"], hacia: ["Mc", "Mcu"], modo: "viajar" }],
    brotes: [
      { desde: "Dc", hacia: "Mc" },
      { desde: "Dcu", hacia: "Mcu" },
    ],
    texto: `Reemplazamos $C$ por $${cantC}$: el número y la unidad salen del dato. Aparece una sola vez.`,
    porque: PORQUE_LETRA,
    regla: `$C=${cantC}$`,
  });
  h.cambiar(["Gi"], [{ id: "Mi", tex: nf(I) }, { id: "Miu", tex: "\\text{Bs}" }]);
  h.paso({
    fusiones: [{ desde: ["Gi"], hacia: ["Mi", "Miu"], modo: "viajar" }],
    brotes: [
      { desde: "Ires", hacia: "Mi" },
      { desde: "Iu", hacia: "Miu" },
    ],
    texto: `Reemplazamos $I$ por $${nf(I)}\\ \\text{Bs}$, el interés que acabamos de calcular.`,
    porque: PORQUE_LETRA,
    regla: `$I=${nf(I)}\\ \\text{Bs}$`,
  });
  h.cambiar(["Mc", "Gp", "Mi", "Miu"], [{ id: "Mres", tex: nf(M) }]);
  h.paso({
    fusiones: [
      { desde: ["Mc", "Gp", "Mi"], hacia: "Mres" },
      { desde: ["Miu"], hacia: null, ancla: "Mcu" },
    ],
    texto: `Las dos cantidades están en $\\text{Bs}$: sumamos los números, $${nf(C)}+${nf(I)}=${nf(M)}$, y la unidad queda una sola vez. Resultado: $M=${nf(M)}\\ \\text{Bs}$.`,
    porque: `Solo se pueden sumar cantidades de la misma unidad: bolivianos con bolivianos.`,
    regla: `$m\\ u+n\\ u=(m+n)\\ u$`,
  });

  // ---- 8. comprobar el INTERES por otro camino (M - C = I seria circular: devuelve el I que acabamos de usar).
  // Se calcula cuanto gana el capital en UN año (C·r/100) y se compara con el interes proporcional al tiempo:
  // I·td tiene que dar lo mismo que (interes de un año)·tn.
  const aLapiz = (p: AplicarPaso) => {
    h.cambiar(p.desde, [{ id: p.nuevoId, tex: p.tex }]);
    h.paso({ fusiones: [{ desde: p.desde, hacia: p.nuevoId }], descompone: p.descompone, texto: p.texto, porque: p.porque, regla: p.regla });
  };
  h.agregar([
    { id: "Ks", tex: "", salto: true },
    { id: "Kl", tex: "I_{1}" },
    { id: "Ke", tex: "=", op: true },
    frPiezas("Kf", r === 1 ? [{ id: "Kc", tex: nf(C) }] : [{ id: "Kc", tex: nf(C) }, { id: "Kx", tex: "\\cdot", op: true }, { id: "Kr", tex: nf(r) }], [{ id: "Kd", tex: "100" }]),
  ]);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "Mres", hacia: "Ks" },
      { desde: "Mres", hacia: "Kl" },
      { desde: "Mres", hacia: "Kf" },
      { desde: "Dc", hacia: "Kc" },
      ...(r === 1 ? [] : [{ desde: "Drf", hacia: "Kr" }]),
      { desde: "Drf", hacia: "Kd" },
    ],
    texto: `Comprobamos el interés por otro camino. Primero calculamos cuánto gana el capital en un solo año, $I_{1}=\\dfrac{C\\cdot r}{100}$, con los datos del enunciado: ${r === 1 ? `$\\dfrac{${nf(C)}}{100}$ (multiplicar por $1$ no cambia el capital)` : `$\\dfrac{${nf(C)}\\cdot ${nf(r)}}{100}$`}.`,
    porque: `Restar el capital al monto no sirve de comprobación: devuelve el mismo interés que usamos. En cambio, el interés de un año se calcula aparte, y después se compara con el del tiempo completo.`,
    regla: `$I_{1}=C\\cdot r$`,
  });
  const X1c = C * r;
  const idNum = r === 1 ? "Kc" : "Kn";
  if (r === 1) {
    // multiplicar por 1 no cambia nada: el numerador ya es el capital
  } else if (productoGrande(C, r)) {
    productoALapiz(C, r, ["Kc", "Kx", "Kr"], "Kn", nf, aLapiz);
  } else {
    h.cambiar(["Kc", "Kx", "Kr"], [{ id: "Kn", tex: nf(X1c) }]);
    h.paso({
      fusiones: [{ desde: ["Kc", "Kx", "Kr"], hacia: "Kn" }],
      texto: `Multiplicamos arriba: $${nf(C)}\\cdot ${nf(r)}=${nf(X1c)}$.`,
      porque: PORQUE_CALCULO,
      regla: REGLA_PRODUCTO,
    });
  }
  if (X1c % 100 === 0) {
    // no se divide de un golpe un numero grande: X1c = q1·100 y el 100 de arriba se tacha con el de abajo
    h.cambiar([idNum], [{ id: "Ka", tex: nf(q1) }, { id: "Kz", tex: "\\cdot", op: true }, { id: "Kb", tex: "100" }]);
    h.paso({
      fusiones: [{ desde: [idNum], hacia: ["Ka", "Kz", "Kb"] }],
      brotes: [{ desde: "Kd", hacia: "Kb" }],
      descompone: true,
      texto: `Abajo hay un $100$ y arriba $${nf(X1c)}$ termina en ceros: $${nf(X1c)}=${nf(q1)}\\cdot 100$. Así aparece el $100$ también arriba y no hace falta dividir un número grande.`,
      porque: `Escribir un número como un producto no cambia su valor, y así se puede tachar lo que se repite.`,
      regla: `$n=a\\cdot g$`,
    });
    h.quitar("Kz", "Kb", "Kd");
    h.cambiar(["Kf"], [{ id: "Kq", tex: nf(q1) }]);
    h.paso({
      fusiones: [
        { desde: ["Kz", "Kb", "Kd"], hacia: null, modo: "tachar" },
        { desde: ["Kf"], hacia: "Kq", modo: "viajar" },
      ],
      brotes: [{ desde: "Kf", hacia: "Kq" }],
      texto: `Tachamos el $100$ de arriba con el $100$ de abajo. Queda $${nf(q1)}$: en un año el capital gana $${nf(q1)}\\ \\text{Bs}$.`,
      porque: `Un número dividido entre sí mismo vale $1$: por eso se tacha.`,
      regla: `$\\dfrac{a\\cdot g}{g}=a$`,
    });
  } else {
    // el interes de un año tiene centavos: dividir entre 100 es correr la coma dos lugares (se mueve la misma pieza)
    h.cambiar(["Kf"], [{ id: "Kq", tex: nf(q1) }]);
    h.paso({
      fusiones: [{ desde: ["Kf"], hacia: "Kq", modo: "viajar" }],
      brotes: [{ desde: "Kf", hacia: "Kq" }],
      texto: `Dividimos entre $100$: el $${nf(X1c)}$ corre su coma dos lugares hacia la izquierda y queda $${nf(q1)}$. En un año el capital gana $${nf(q1)}\\ \\text{Bs}$.`,
      porque: `Dividir entre $100$ corre la coma dos lugares hacia la izquierda: es lo mismo que tomar cada $100$ centésimas como un entero.`,
      regla: `$\\dfrac{a}{100}=a\\ \\text{con la coma dos lugares a la izquierda}$`,
    });
  }
  // el tiempo: (interes de un año)·tn tiene que ser igual a I·td; el factor 1 no se escribe
  // la pieza del tiempo (en años) que sigue a la vista: de ahi nacen tn y td
  const origen = (...ids: string[]) => ids.find((id) => aplanar(h.fichas).some((f) => f.id === id)) ?? "Dra";
  const L = r2(q1 * tn);
  const Rr = r2(I * td);
  const izqF: Ficha[] = tn === 1 ? [{ id: "Wq", tex: nf(q1) }] : [{ id: "Wq", tex: nf(q1) }, { id: "Wx", tex: "\\cdot", op: true }, { id: "Wt", tex: nf(tn) }];
  const derF: Ficha[] = td === 1 ? [{ id: "Wi", tex: nf(I) }] : [{ id: "Wi", tex: nf(I) }, { id: "Wy", tex: "\\cdot", op: true }, { id: "Wd", tex: nf(td) }];
  h.agregar([{ id: "Ws", tex: "", salto: true }, ...izqF, { id: "We", tex: "=", op: true }, ...derF]);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "Kq", hacia: "Ws" },
      { desde: "Kq", hacia: "Wq" },
      ...(tn === 1 ? [] : [{ desde: origen("Tna", "Tv", "Dt", "Tfn"), hacia: "Wt" }]),
      { desde: "Ires", hacia: "Wi" },
      ...(td === 1 ? [] : [{ desde: origen("Tda", "Tfd"), hacia: "Wd" }]),
    ],
    texto: td === 1
      ? `Ahora el tiempo: son $${tn}$ ${anios(tn)}, y cada año gana lo mismo. Entonces el interés de un año por $${tn}$ tiene que dar el interés que calculamos: $${nf(q1)}${tn === 1 ? "" : `\\cdot ${tn}`}=${nf(I)}$.`
      : `Ahora el tiempo: son $\\dfrac{${tn}}{${td}}$ de año. El interés de un año por $${tn}$, dividido entre $${td}$, tiene que dar $I$. Para no dividir, comparamos $${nf(q1)}${tn === 1 ? "" : `\\cdot ${tn}`}$ con $${nf(I)}\\cdot ${td}$: tienen que ser iguales.`,
    porque: `El interés simple es proporcional al tiempo: en el doble de tiempo se gana el doble. Si el interés que calculamos está bien, los dos lados coinciden.`,
    regla: `$I=I_{1}\\cdot t$`,
  });
  const lado = (ids: string[], a: number, b: number, id: string, valor: number) => {
    if (ids.length === 1) return;
    if (productoGrande(a, b)) productoALapiz(a, b, ids, id, nf, aLapiz);
    else {
      h.cambiar(ids, [{ id, tex: nf(valor) }]);
      h.paso({
        fusiones: [{ desde: ids, hacia: id }],
        texto: `Multiplicamos: $${nf(a)}\\cdot ${nf(b)}=${nf(valor)}$.`,
        porque: PORQUE_CALCULO,
        regla: REGLA_PRODUCTO,
      });
    }
  };
  lado(izqF.map((f) => f.id), q1, tn, "Wl", L);
  lado(derF.map((f) => f.id), I, td, "Wr", Rr);
  h.agregar([{ id: "Mok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "We", hacia: "Mok" }],
    resaltar: ["Ires", tn === 1 ? "Wq" : "Wl"],
    texto: `Los dos lados dan $${nf(L)}$: el interés está bien. Respuesta: el interés es $I=${nf(I)}\\ \\text{Bs}$ y el monto es $M=${nf(M)}\\ \\text{Bs}$.`,
    porque: `El interés de un año, llevado al tiempo del enunciado, coincide con el que calculamos: los dos caminos se corresponden.`,
    regla: `$M=C+I$`,
  });

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: pegarPunto(intro),
      estados: h.estados.map(pegarUnidades),
      transiciones: h.trans.map((tr) => ({ ...tr, texto: pegarPunto(tr.texto), porque: pegarPunto(tr.porque), ...(tr.regla ? { regla: pegarPunto(tr.regla) } : {}) })),
    },
    resumen: { C, r, t, meses: meses ? 1 : 0, tn, td, tAnios: tn / td, I, M, q1 },
  };
}
