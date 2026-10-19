// Generador de Economicas: interes simple I = C·r·t y monto M = C + I, con el patron "ANOTAR Y REEMPLAZAR":
//   1. los datos del enunciado tal como vienen (capital en Bs, tasa en %, tiempo en anios o meses);
//   2. ORDENAR antes de reemplazar: la tasa % pasa a fraccion (5 % = 5/100) y, si el tiempo esta en meses, se pasa a
//      anios con un factor de conversion (1 anio / 12 meses), se tachan los meses y se simplifica la fraccion;
//   3. ETIQUETAR debajo de cada dato su letra (C, r, t), de a una y con su color;
//   4. la FORMULA con letras debajo (nace de lo que piden), y se REEMPLAZA una letra por vez: cada dato VUELA a su lugar;
//   5. CALCULAR una operacion por paso (numero por fraccion: el numero entra arriba, se multiplica, se divide);
//   6. el MONTO: M = C + I con su propia formula y sus letras;
//   7. COMPROBAR: el interes en otro orden (C·t·r) y el monto menos el capital.
// Los datos quedan arriba hasta el final: son la fila de referencia de la que nace la comprobacion.
// Las cuentas van solo con numeros (todo esta en bolivianos); la unidad Bs vuelve al final desde el dato.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas y etiquetas en LaTeX sin $. Barras dobles.
// La animacion no calcula: cada numero que se escribe sale de una cuenta hecha aqui y comprobada en el test.
import { aplanar, frPiezas, sustituir, type Ficha, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

// ---------------------------------------------------------------------------
// Utilidades

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

const REGLA_PRODUCTO = `$m\\cdot n=p$`;
const REGLA_NUM_POR_FRAC = `$n\\cdot\\dfrac{a}{b}=\\dfrac{n\\cdot a}{b}$`;
const REGLA_DIVISION = `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`;
const PORQUE_FRAC = `Multiplicar un número por una fracción es multiplicar el número por el numerador.`;
const PORQUE_DIV = `La fracción es una división: el número de arriba entre el de abajo.`;
const PORQUE_LETRA = `Se reemplaza una letra por vez, para no perder ningún dato.`;

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

/** I = C·r·t y M = C + I; el tiempo en meses se pasa a anios antes de reemplazar */
export function interesSimple(C: number, r: number, t: number, unidad: UnidadTiempo, enunciado?: string): Resultado {
  const meses = unidad === "meses";
  const g = meses ? mcd(t, 12) : 1;
  const tn = meses ? t / g : t; // el tiempo en anios es tn/td
  const td = meses ? 12 / g : 1;
  const tFrac = td > 1;
  const q1 = r2((C * r) / 100); // lo que gana el capital en un anio
  const I = r2((C * r * tn) / (100 * td));
  const M = r2(C + I);
  const cantC = `${nf(C)}\\ \\text{Bs}`;
  const cantT = tFrac ? `\\dfrac{${tn}}{${td}}\\ \\text{años}` : `${tn}\\ \\text{años}`;

  const h = new Hoja([
    { id: "Dc", tex: nf(C) },
    { id: "Dcu", tex: "\\text{Bs}" },
    { id: "Dc1", tex: ",", op: true },
    { id: "Dr", tex: nf(r) },
    { id: "Drp", tex: "\\%" },
    { id: "Dra", tex: "\\text{anual}" },
    { id: "DS1", tex: "", salto: true },
    { id: "Dt", tex: nf(t) },
    { id: "Dtu", tex: `\\text{${unidad}}` },
    { id: "DS2", tex: "", salto: true },
    { id: "Dq1", tex: "I=\\ ?" },
    { id: "Dq2c", tex: ",", op: true },
    { id: "Dq2", tex: "M=\\ ?" },
  ]);
  const intro =
    enunciado ??
    `Se deposita un capital de $${cantC}$ al $${nf(r)}\\ \\%$ de interés simple anual durante $${t}\\ \\text{${unidad}}$. ¿Cuál es el interés y cuál es el monto? Vamos a escribir cada paso, como a lápiz.`;

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
    texto: `El símbolo $\\%$ quiere decir "por cada cien": $${nf(r)}\\ \\%$ es $\\dfrac{${nf(r)}}{100}$.${meses ? "" : " El tiempo ya está en años, igual que la tasa: no hay que convertirlo."}`,
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
      texto: `La tasa es anual: dice cuánto se gana por cada año. Pero el tiempo está en meses. Hay que pasar los $${t}$ meses a años.`,
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
      texto: `Los $\\text{meses}$ de arriba se tachan con los $\\text{meses}$ de abajo. Queda solo $\\text{año}$.`,
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
      texto: `El $${t}$ entra arriba, multiplicando al $1$ ($${t}\\cdot 1=${t}$), y el $12$ queda abajo. Ya tenemos el tiempo en años: $\\dfrac{${t}}{12}\\ \\text{años}$.`,
      porque: `Multiplicar un número por una fracción es multiplicar el número por el numerador. Por $1$ no cambia nada.`,
      regla: REGLA_NUM_POR_FRAC,
    });
    tv = "Tf";
    tnId = "Tfn";
    tdId = "Tfd";
    if (t % 12 === 0) {
      h.cambiar(["Tf"], [{ id: "Tv", tex: nf(tn) }]);
      h.paso({
        fusiones: [{ desde: ["Tf"], hacia: "Tv" }],
        texto: `Dividimos: $\\dfrac{${t}}{12}=${tn}$. Son años completos.`,
        porque: PORQUE_DIV,
        regla: REGLA_DIVISION,
      });
      tv = "Tv";
      tnId = "Tv";
    } else if (g > 1) {
      h.paso({
        fusiones: [],
        resaltar: ["Tfn", "Tfd"],
        texto: `¿Se puede simplificar? Divisores de $${t}$: ${lista(divisores(t))}. Divisores de $12$: ${lista(divisores(12))}. El mayor que está en las dos listas es el $${g}$.`,
        porque: `Para simplificar hace falta un número que divida al de arriba y al de abajo.`,
        regla: `$\\dfrac{a\\cdot g}{b\\cdot g}=\\dfrac{a}{b}$`,
      });
      h.cambiar(["Tfn"], [{ id: "Tna", tex: nf(tn) }, { id: "Tnx", tex: "\\cdot", op: true }, { id: "Tng", tex: String(g) }]);
      h.cambiar(["Tfd"], [{ id: "Tda", tex: nf(td) }, { id: "Tdx", tex: "\\cdot", op: true }, { id: "Tdg", tex: String(g) }]);
      h.paso({
        fusiones: [
          { desde: ["Tfn"], hacia: ["Tna", "Tnx", "Tng"] },
          { desde: ["Tfd"], hacia: ["Tda", "Tdx", "Tdg"] },
        ],
        descompone: true,
        texto: `Escribimos arriba y abajo como un producto por $${g}$: $${t}=${tn}\\cdot ${g}$ y $12=${td}\\cdot ${g}$.`,
        porque: `Así se ve el $${g}$ que se repite arriba y abajo.`,
        regla: `$n=a\\cdot g$`,
      });
      h.quitar("Tnx", "Tng", "Tdx", "Tdg");
      h.paso({
        fusiones: [{ desde: ["Tnx", "Tng", "Tdx", "Tdg"], hacia: null, modo: "tachar" }],
        texto: `Tachamos el $${g}$ de arriba con el $${g}$ de abajo. Queda $\\dfrac{${tn}}{${td}}\\ \\text{años}$.`,
        porque: `Un número dividido entre sí mismo vale $1$: por eso se tacha.`,
        regla: `$\\dfrac{a\\cdot g}{b\\cdot g}=\\dfrac{a}{b}$`,
      });
      tnId = "Tna";
      tdId = "Tda";
    } else {
      h.paso({
        fusiones: [],
        resaltar: ["Tfn", "Tfd"],
        texto: `¿Se puede simplificar? Divisores de $${t}$: ${lista(divisores(t))}. Divisores de $12$: ${lista(divisores(12))}. El único que está en las dos listas es el $1$, así que no hay nada que tachar: $\\dfrac{${t}}{12}$ ya es la fracción más simple.`,
        porque: `Con solo el $1$ en común no se puede simplificar más.`,
        regla: `$\\dfrac{a\\cdot g}{b\\cdot g}=\\dfrac{a}{b}$`,
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
  h.cambiar(["P1a", "P1x", "P1b"], [{ id: "P1n", tex: nf(C * r) }]);
  h.paso({
    fusiones: [{ desde: ["P1a", "P1x", "P1b"], hacia: "P1n" }],
    texto: `Multiplicamos arriba: $${nf(C)}\\cdot ${nf(r)}=${nf(C * r)}$.`,
    porque: `En una fracción, primero se hacen las cuentas de arriba y las de abajo.`,
    regla: REGLA_PRODUCTO,
  });
  h.cambiar(["P1"], [{ id: "Q1", tex: nf(q1) }]);
  h.paso({
    fusiones: [{ desde: ["P1"], hacia: "Q1" }],
    texto: `Dividimos: $\\dfrac{${nf(C * r)}}{100}=${nf(q1)}$. Es lo que gana el capital en un año.`,
    porque: PORQUE_DIV,
    regla: REGLA_DIVISION,
  });
  // ahora por el tiempo
  if (tFrac) {
    h.cambiar(
      ["Q1", "Fm2", "Nt"],
      [
        frPiezas(
          "P2",
          [
            { id: "P2a", tex: nf(q1) },
            { id: "P2x", tex: "\\cdot", op: true },
            { id: "P2b", tex: nf(tn) },
          ],
          [{ id: "P2d", tex: nf(td) }]
        ),
      ]
    );
    h.paso({
      fusiones: [{ desde: ["Q1", "Fm2", "Nt"], hacia: "P2", modo: "viajar" }],
      brotes: [
        { desde: "Q1", hacia: "P2a" },
        { desde: "Nt", hacia: "P2b" },
        { desde: "Nt", hacia: "P2d" },
      ],
      texto: `Ahora por el tiempo: $${nf(q1)}\\cdot\\dfrac{${tn}}{${td}}=\\dfrac{${nf(q1)}\\cdot ${tn}}{${td}}$. El número entra arriba, multiplicando.`,
      porque: PORQUE_FRAC,
      regla: REGLA_NUM_POR_FRAC,
    });
    h.cambiar(["P2a", "P2x", "P2b"], [{ id: "P2n", tex: nf(r2(q1 * tn)) }]);
    h.paso({
      fusiones: [{ desde: ["P2a", "P2x", "P2b"], hacia: "P2n" }],
      texto: `Multiplicamos arriba: $${nf(q1)}\\cdot ${tn}=${nf(r2(q1 * tn))}$.`,
      porque: `En una fracción, primero se hacen las cuentas de arriba y las de abajo.`,
      regla: REGLA_PRODUCTO,
    });
    h.cambiar(["P2"], [{ id: "Ires", tex: nf(I) }]);
    h.paso({
      fusiones: [{ desde: ["P2"], hacia: "Ires" }],
      texto: `Dividimos: $\\dfrac{${nf(r2(q1 * tn))}}{${td}}=${nf(I)}$.`,
      porque: PORQUE_DIV,
      regla: REGLA_DIVISION,
    });
  } else {
    h.cambiar(["Q1", "Fm2", "Nt"], [{ id: "Ires", tex: nf(I) }]);
    h.paso({
      fusiones: [{ desde: ["Q1", "Fm2", "Nt"], hacia: "Ires" }],
      texto: `Ahora por el tiempo: $${nf(q1)}\\cdot ${tn}=${nf(I)}$. En ${tn === 1 ? "un año" : `${tn} años`} gana ${tn === 1 ? "lo de un año" : `${tn} veces lo de un año`}.`,
      porque: `El interés simple crece lo mismo cada año: es lo de un año por la cantidad de años.`,
      regla: REGLA_PRODUCTO,
    });
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

  // ---- 8. comprobar el interes: el mismo producto en otro orden (C·t·r)
  const tChk: Ficha = tFrac ? frPiezas("Ct", [{ id: "Ctn", tex: nf(tn) }], [{ id: "Ctd", tex: nf(td) }]) : { id: "Ct", tex: nf(tn) };
  const fila: Ficha[] = [
    { id: "CS", tex: "", salto: true },
    { id: "Cc", tex: nf(C) },
    { id: "Cm1", tex: "\\cdot", op: true },
    tChk,
    { id: "Cm2", tex: "\\cdot", op: true },
    frPiezas("Cr", [{ id: "Crn", tex: nf(r) }], [{ id: "Crd", tex: "100" }]),
  ];
  h.agregar(fila);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "Ires", hacia: "CS" },
      { desde: "Dc", hacia: "Cc" },
      ...(tFrac
        ? [
            { desde: tv, hacia: "Ct" },
            { desde: tnId, hacia: "Ctn" },
            { desde: tdId, hacia: "Ctd" },
          ]
        : [{ desde: tv, hacia: "Ct" }]),
      { desde: "Drf", hacia: "Cr" },
      { desde: "Drn", hacia: "Crn" },
      { desde: "Drd", hacia: "Crd" },
    ],
    texto: `Comprobamos el interés multiplicando en otro orden: primero el capital por el tiempo y al final por la tasa. Copiamos los datos del enunciado y tiene que dar lo mismo que $${nf(I)}$.`,
    porque: `El orden de los factores no cambia el producto.`,
    regla: `$C\\cdot t\\cdot r=C\\cdot r\\cdot t$`,
  });
  let previo: string; // la pieza con el resultado parcial de C·t
  if (tFrac) {
    h.cambiar(
      ["Cc", "Cm1", "Ct"],
      [
        frPiezas(
          "R1",
          [
            { id: "R1a", tex: nf(C) },
            { id: "R1x", tex: "\\cdot", op: true },
            { id: "R1b", tex: nf(tn) },
          ],
          [{ id: "R1d", tex: nf(td) }]
        ),
      ]
    );
    h.paso({
      fusiones: [{ desde: ["Cc", "Cm1", "Ct"], hacia: "R1", modo: "viajar" }],
      brotes: [
        { desde: "Cc", hacia: "R1a" },
        { desde: "Ct", hacia: "R1b" },
        { desde: "Ct", hacia: "R1d" },
      ],
      texto: `Primero el capital por el tiempo: $${nf(C)}\\cdot\\dfrac{${tn}}{${td}}=\\dfrac{${nf(C)}\\cdot ${tn}}{${td}}$. El número entra arriba, multiplicando.`,
      porque: PORQUE_FRAC,
      regla: REGLA_NUM_POR_FRAC,
    });
    h.cambiar(["R1a", "R1x", "R1b"], [{ id: "R1n", tex: nf(C * tn) }]);
    h.paso({
      fusiones: [{ desde: ["R1a", "R1x", "R1b"], hacia: "R1n" }],
      texto: `Multiplicamos arriba: $${nf(C)}\\cdot ${tn}=${nf(C * tn)}$.`,
      porque: `En una fracción, primero se hacen las cuentas de arriba y las de abajo.`,
      regla: REGLA_PRODUCTO,
    });
    h.cambiar(["R1"], [{ id: "R2", tex: nf(r2((C * tn) / td)) }]);
    h.paso({
      fusiones: [{ desde: ["R1"], hacia: "R2" }],
      texto: `Dividimos: $\\dfrac{${nf(C * tn)}}{${td}}=${nf(r2((C * tn) / td))}$.`,
      porque: PORQUE_DIV,
      regla: REGLA_DIVISION,
    });
    previo = "R2";
  } else {
    h.cambiar(["Cc", "Cm1", "Ct"], [{ id: "R2", tex: nf(C * tn) }]);
    h.paso({
      fusiones: [{ desde: ["Cc", "Cm1", "Ct"], hacia: "R2" }],
      texto: `Primero el capital por el tiempo: $${nf(C)}\\cdot ${tn}=${nf(C * tn)}$.`,
      porque: `Es el capital repetido tantas veces como años.`,
      regla: REGLA_PRODUCTO,
    });
    previo = "R2";
  }
  const ct = r2((C * tn) / td);
  h.cambiar(
    [previo, "Cm2", "Cr"],
    [
      frPiezas(
        "R3",
        [
          { id: "R3a", tex: nf(ct) },
          { id: "R3x", tex: "\\cdot", op: true },
          { id: "R3b", tex: nf(r) },
        ],
        [{ id: "R3d", tex: "100" }]
      ),
    ]
  );
  h.paso({
    fusiones: [{ desde: [previo, "Cm2", "Cr"], hacia: "R3", modo: "viajar" }],
    brotes: [
      { desde: previo, hacia: "R3a" },
      { desde: "Cr", hacia: "R3b" },
      { desde: "Cr", hacia: "R3d" },
    ],
    texto: `Ahora por la tasa: $${nf(ct)}\\cdot\\dfrac{${nf(r)}}{100}=\\dfrac{${nf(ct)}\\cdot ${nf(r)}}{100}$. El número entra arriba, multiplicando.`,
    porque: PORQUE_FRAC,
    regla: REGLA_NUM_POR_FRAC,
  });
  h.cambiar(["R3a", "R3x", "R3b"], [{ id: "R3n", tex: nf(r2(ct * r)) }]);
  h.paso({
    fusiones: [{ desde: ["R3a", "R3x", "R3b"], hacia: "R3n" }],
    texto: `Multiplicamos arriba: $${nf(ct)}\\cdot ${nf(r)}=${nf(r2(ct * r))}$.`,
    porque: `En una fracción, primero se hacen las cuentas de arriba y las de abajo.`,
    regla: REGLA_PRODUCTO,
  });
  h.cambiar(["R3"], [{ id: "Cres", tex: nf(I) }]);
  h.paso({
    fusiones: [{ desde: ["R3"], hacia: "Cres" }],
    texto: `Dividimos: $\\dfrac{${nf(r2(ct * r))}}{100}=${nf(I)}$.`,
    porque: PORQUE_DIV,
    regla: REGLA_DIVISION,
  });
  h.agregar([{ id: "Cok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Cres", hacia: "Cok" }],
    resaltar: ["Ires", "Cres"],
    texto: `Da $${nf(I)}$, igual que el interés de arriba. El interés es $I=${nf(I)}\\ \\text{Bs}$.`,
    porque: `Por dos caminos distintos sale lo mismo: la cuenta está bien.`,
    regla: `$I=C\\cdot r\\cdot t$`,
  });

  // ---- 9. comprobar el monto: M - C tiene que dar el interes
  h.agregar([
    { id: "MS", tex: "", salto: true },
    { id: "Mk1", tex: nf(M) },
    { id: "Mkm", tex: "-", op: true },
    { id: "Mk2", tex: nf(C) },
  ]);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "Mres", hacia: "MS" },
      { desde: "Mres", hacia: "Mk1" },
      { desde: "Dc", hacia: "Mk2" },
    ],
    texto: `Comprobamos el monto: si al monto le quitamos el capital, tiene que quedar el interés. Copiamos $${nf(M)}$ y el capital $${nf(C)}$.`,
    porque: `El monto es el capital más el interés: al restar el capital queda el interés.`,
    regla: `$M-C=I$`,
  });
  h.cambiar(["Mk1", "Mkm", "Mk2"], [{ id: "Mkr", tex: nf(I) }]);
  h.paso({
    fusiones: [{ desde: ["Mk1", "Mkm", "Mk2"], hacia: "Mkr" }],
    texto: `Restamos: $${nf(M)}-${nf(C)}=${nf(I)}$.`,
    porque: `Es lo que ganó el dinero.`,
    regla: `$a-b=c$`,
  });
  h.agregar([{ id: "Mok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Mkr", hacia: "Mok" }],
    resaltar: ["Ires", "Mkr"],
    texto: `Da $${nf(I)}$, el mismo interés. Respuesta: el interés es $I=${nf(I)}\\ \\text{Bs}$ y el monto es $M=${nf(M)}\\ \\text{Bs}$.`,
    porque: `El monto menos el capital da el interés: los dos resultados se corresponden.`,
    regla: `$M=C+I$`,
  });

  return {
    demo: { titulo: "", nota: "", intro, estados: h.estados, transiciones: h.trans },
    resumen: { C, r, t, meses: meses ? 1 : 0, tn, td, tAnios: tn / td, I, M, q1 },
  };
}
