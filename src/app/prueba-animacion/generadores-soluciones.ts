// Soluciones: MOLARIDAD, M = n / V, "como a lapiz" y con el patron "ANOTAR Y REEMPLAZAR" (regla de Fisica y Quimica):
//   1. el enunciado tal como viene (masa de soluto, formula, volumen de solucion) y lo que piden; POR QUE no se divide directo;
//   2. cada dato y la incognita se ETIQUETAN debajo con su letra y su color, de a uno (m, V, M);
//   3. la formula M = n / V nace de la incognita; como n no es dato, n = m / PM nace de la n;
//   4. la MASA MOLAR PM se construye a la vista (masa atomica debajo de cada elemento, un termino n·A por elemento,
//      cada producto y cada suma en su paso), con su unidad g/mol;
//   5. se REEMPLAZA una letra por vez: el numero y la unidad VUELAN desde el dato (brotes) al lugar de la letra;
//   6. se CALCULA: numeros con numeros, y las unidades se TACHAN (g / (g/mol) -> mol); luego M = n / V;
//   7. la respuesta viaja al "?" y se COMPRUEBA hacia atras contra el enunciado original (M·V·PM = masa).
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas y etiquetas en LaTeX sin $. Barras dobles.
// La animacion no calcula: cada numero que se escribe sale de una cuenta hecha aqui y comprobada en el test.
// Los resultados de una cuenta van SIN color (el color se va cuando se calcula; ademas los digitos del color
// contarian como "numeros nuevos" en revisar.ts).
import { frPiezas, pegarUnidades, sustituir, aplanar, type Ficha, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";
import { MASAS_ATOMICAS, SUSTANCIAS, atomos, masaMolar, formulaTex, decimal } from "./generadores-quimica.ts";

/** solutos que se pueden usar (todos de la tabla de generadores-quimica; cada elemento aparece una sola vez) */
export const SOLUTOS = ["NaOH", "KOH", "H2SO4", "HNO3", "C6H12O6", "C2H6O", "NH3", "ZnSO4"] as const;
export const LIMITE_MASA = 2000;
export const LIMITE_VOLUMEN = 10;

const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));

/** n en centesimas de mol (masa·100 / PM), solo si es entero */
const molesCent = (masa: number, PM: number) => (masa * 100) / PM;

export function validarMolaridad(soluto: string, masa: number, volumen: number): string | null {
  if (!(SOLUTOS as readonly string[]).includes(soluto) || !atomos(soluto)) return "Elige un soluto de la lista.";
  if (!Number.isInteger(masa) || masa < 1 || masa > LIMITE_MASA) return `Escribe una masa entera entre 1 y ${LIMITE_MASA} gramos.`;
  if (!Number.isInteger(volumen) || volumen < 1 || volumen > LIMITE_VOLUMEN) return `Escribe un volumen entero entre 1 y ${LIMITE_VOLUMEN} litros.`;
  const PM = masaMolar(soluto);
  if ((masa * 100) % PM !== 0) {
    const paso = PM / mcd(PM, 100);
    return `Con ${masa} g los moles no dan exactos con dos decimales. Prueba con un múltiplo de ${paso}, por ejemplo ${paso} o ${paso * 2}.`;
  }
  const n = molesCent(masa, PM);
  if (n % volumen !== 0) return `Con ${volumen} L la molaridad no da exacta con dos decimales (los moles son ${decimal(n).replace("{,}", ",")}). Prueba con otro volumen o con otra masa.`;
  return null;
}

// ---------------------------------------------------------------------------
// Formato
const COLOR = { m: "#2563eb", V: "#ea580c", PM: "#16a34a", n: "#9333ea", M: "#dc2626", A: "#0891b2" } as const;
const col = (c: string, tex: string) => `\\textcolor{${c}}{${tex}}`;
const U = { g: "\\text{g}", mol: "\\text{mol}", L: "\\text{L}" } as const;
const PMtex = "\\text{PM}";
const elemTex = (e: string, n: number) => `\\mathrm{${n > 1 ? `${e}_{${n}}` : e}}`;
/** unidad en fraccion con piezas (arriba y abajo se pueden tachar o cambiar solas) */
const uFrac = (id: string, arriba: string, abajo: string): Ficha => frPiezas(id, [{ id: `${id}n`, tex: arriba }], [{ id: `${id}d`, tex: abajo }]);
const clon = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

// las letras de las reglas generales NO repiten las del ejercicio (m masa, n moles, M molaridad, V volumen, PM, A masa atomica)
const REGLA_DIVIDE = `$\\dfrac{a\\ c}{b\\ d}=\\dfrac{a}{b}\\cdot\\dfrac{c}{d}$`;
const REGLA_PM = `$\\text{PM}=k_{1}\\cdot A_{1}+k_{2}\\cdot A_{2}+\\dots$`;
/** solutos ionicos (bases y sales): no hay moleculas sueltas, la formula cuenta iones */
const IONICOS = ["NaOH", "KOH", "ZnSO4"];

// ---------------------------------------------------------------------------
/** M = n / V con n = m / PM. Validar antes con validarMolaridad. */
export function molaridad(soluto: string, masa: number, volumen: number): Resultado {
  const V = volumen;
  const PM = masaMolar(soluto);
  const at = atomos(soluto)!;
  const nCent = molesCent(masa, PM);
  const MCent = nCent / V;
  const nTxt = decimal(nCent);
  const MTxt = decimal(MCent);
  const nombre = SUSTANCIAS[soluto] ?? soluto;

  // ----- la hoja: una lista plana de fichas; cada renglon nuevo empieza con una ficha `salto`
  // la formula del soluto se lee como una palabra (KOH, H₂SO₄): el \! le quita el espacio fino que dejaba entre una pieza y otra
  const piezasSoluto: Ficha[] = at.map(([e, n], i) => ({ id: `a${i}`, tex: i > 0 ? `\\!\\!${elemTex(e, n)}` : elemTex(e, n), ...(i > 0 ? { pegado: true } : {}) }));
  let hoja: Ficha[] = [
    { id: "tD", tex: "\\text{Datos:}", op: true },
    { id: "Dm", tex: `${masa}` },
    { id: "Dmu", tex: U.g },
    { id: "Dde", tex: "\\text{de}", op: true },
    ...piezasSoluto,
    { id: "Den", tex: "\\text{en}", op: true },
    { id: "DV", tex: `${V}` },
    { id: "DVu", tex: U.L },
    { id: "SP", tex: "", salto: true },
    { id: "tP", tex: "\\text{Piden:}", op: true },
    { id: "q", tex: "?" },
    uFrac("uq", U.mol, U.L),
  ];
  const estados: Ficha[][] = [clon(hoja)];
  const trans: Transicion[] = [];
  const paso = (t: Transicion) => {
    estados.push(clon(hoja));
    trans.push(t);
  };
  const pieza = (id: string): Ficha => {
    const f = aplanar(hoja).find((x) => x.id === id);
    if (!f) throw new Error(`no existe la pieza ${id}`);
    return f;
  };
  const cambiar = (viejos: string[], nuevos: Ficha[]) => {
    hoja = sustituir(hoja, viejos, nuevos);
  };
  const quitar = (...ids: string[]) => ids.forEach((id) => cambiar([id], []));
  const poner = (id: string, parche: Partial<Ficha>) => cambiar([id], [{ ...pieza(id), ...parche }]);
  const agregar = (fs: Ficha[]) => {
    hoja = [...hoja, ...fs];
  };

  const intro = `Se disuelven $${masa}\\ \\text{g}$ de ${nombre} ($${formulaTex(soluto)}$) en agua hasta completar $${V}\\ \\text{L}$ de solución. ¿Cuál es la molaridad de la solución? Vamos a escribir cada paso, como a lápiz.`;

  // ----- 1) por que no se divide directo
  paso({
    fusiones: [],
    resaltar: ["Dmu", "DVu", "uq"],
    texto: `Nos dan $${masa}\\ \\text{g}$ de soluto y $${V}\\ \\text{L}$ de solución, y nos piden la molaridad, que se mide en $\\dfrac{\\text{mol}}{\\text{L}}$. Los gramos no son moles: un mol es una cantidad fija de partículas (átomos, moléculas o iones), igual que una docena es siempre $12$ cosas. Antes hay que averiguar cuántos moles son esos gramos.`,
    porque: `La molaridad cuenta cuántos moles de soluto hay en cada litro de solución. El soluto es lo que se disuelve y la solución es la mezcla completa, con el agua incluida.`,
    regla: `$M=\\dfrac{\\text{moles de soluto}}{\\text{litros de solución}}$`,
  });

  // ----- 2) etiquetar, de a uno: m, V y M
  poner("Dm", { tex: col(COLOR.m, `${masa}`), debajo: col(COLOR.m, "m") });
  paso({
    fusiones: [],
    resaltar: ["Dm"],
    texto: `$${masa}\\ \\text{g}$ es la masa de soluto que se disuelve. La llamamos $m$.`,
    porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
    regla: `$m=${masa}\\ \\text{g}$`,
  });
  poner("DV", { tex: col(COLOR.V, `${V}`), debajo: col(COLOR.V, "V") });
  paso({
    fusiones: [],
    resaltar: ["DV"],
    texto: `$${V}\\ \\text{L}$ es el volumen de toda la solución, no solo del agua. Lo llamamos $V$.`,
    porque: `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
    regla: `$V=${V}\\ \\text{L}$`,
  });
  poner("q", { tex: col(COLOR.M, "?"), debajo: col(COLOR.M, "M") });
  paso({
    fusiones: [],
    resaltar: ["q"],
    texto: `Lo que piden es la molaridad. La llamamos $M$.`,
    porque: `Lo que buscamos también lleva su letra y su color: así sabemos en qué lugar de la fórmula va a quedar.`,
    regla: `$M=\\ ?$`,
  });

  // ----- 3) la formula de la molaridad nace de la incognita
  agregar([
    { id: "S1", tex: "", salto: true },
    { id: "F1M", tex: col(COLOR.M, "M") },
    { id: "F1e", tex: "=", op: true },
    frPiezas("F1", [{ id: "F1n", tex: col(COLOR.n, "n") }], [{ id: "F1V", tex: col(COLOR.V, "V") }]),
  ]);
  paso({
    fusiones: [],
    brotes: [
      { desde: "q", hacia: "S1" },
      { desde: "q", hacia: "F1M" },
      { desde: "q", hacia: "F1" },
    ],
    texto: `Escribimos debajo la fórmula de la molaridad, todavía con letras: los moles de soluto, $n$, repartidos entre los litros de solución, $V$. Cada letra lleva el color de su dato: la $V$ ya la tenemos, pero la $n$ todavía no.`,
    porque: `Si en $V$ litros hay $n$ moles, en cada litro hay $n$ entre $V$.`,
    regla: `$M=\\dfrac{n}{V}$`,
  });

  // ----- 4) n no es dato: su formula nace de la n
  agregar([
    { id: "S2", tex: "", salto: true },
    { id: "F2n", tex: col(COLOR.n, "n") },
    { id: "F2e", tex: "=", op: true },
    frPiezas("F2", [{ id: "F2m", tex: col(COLOR.m, "m") }], [{ id: "F2p", tex: col(COLOR.PM, PMtex) }]),
  ]);
  paso({
    fusiones: [],
    brotes: [
      { desde: "F1n", hacia: "S2" },
      { desde: "F1n", hacia: "F2n" },
      { desde: "F1n", hacia: "F2" },
    ],
    texto: `Pero $n$ no es un dato: no nos lo dan. Los moles se sacan de la masa: se divide la masa $m$ entre la masa molar, $${PMtex}$. Escribimos esa fórmula debajo, también con letras.`,
    porque: `La masa molar dice cuántos gramos pesa un mol. Si cada mol pesa $${PMtex}$ gramos, en $m$ gramos caben $m$ entre $${PMtex}$ moles.`,
    regla: `$n=\\dfrac{m}{${PMtex}}$`,
  });

  // ----- 5) la masa molar a la vista: masa atomica anotada debajo de cada elemento, de a uno
  at.forEach(([e], i) => {
    poner(`a${i}`, { debajo: col(COLOR.A, `\\mathrm{${e}}=${MASAS_ATOMICAS[e]}`) });
    paso({
      fusiones: [],
      resaltar: [`a${i}`],
      texto:
        i === 0
          ? `Falta la masa molar $${PMtex}$: la sacamos de la tabla periódica. Empezamos por la masa atómica de cada elemento del soluto y la anotamos debajo de él. Para el $\\mathrm{${e}}$ es $${MASAS_ATOMICAS[e]}$.`
          : `En la tabla periódica, la masa atómica del $\\mathrm{${e}}$ es $${MASAS_ATOMICAS[e]}$. La anotamos debajo del $\\mathrm{${e}}$.`,
      porque:
        i === 0
          ? `Para saber cuánto pesa un mol de ${nombre} necesitamos lo que pesa cada átomo. La masa atómica, $A$, se lee en la tabla periódica; usamos el valor redondeado, como en el colegio.`
          : `Cada elemento tiene su propia masa atómica en la tabla periódica.`,
      regla: `$A_{\\mathrm{${e}}}=${MASAS_ATOMICAS[e]}$`,
    });
  });

  // un termino n·A por elemento: el subindice y la masa nacen de su elemento
  at.forEach(([e, n], i) => {
    // con n = 1 no hay producto que hacer (1·A = A): el termino se escribe directo y ya es el resultado `r`
    // tampoco hay producto si la masa atomica es 1 (k·1 = k): se escribe directo el resultado
    const directo = n === 1 || MASAS_ATOMICAS[e] === 1;
    const t: Ficha = directo ? { id: `r${i}`, tex: `${n * MASAS_ATOMICAS[e]}` } : { id: `t${i}`, tex: `${n}\\cdot ${MASAS_ATOMICAS[e]}` };
    const cuantos =
      n === 1
        ? `el $\\mathrm{${e}}$ no lleva subíndice, y eso quiere decir que hay $1$ átomo, de masa $${MASAS_ATOMICAS[e]}$: pesa $${MASAS_ATOMICAS[e]}$`
        : MASAS_ATOMICAS[e] === 1
          ? `hay $${n}$ átomos de $\\mathrm{${e}}$ (el subíndice), y cada uno tiene masa $1$: pesan $${n}$`
          : `hay $${n}$ átomos de $\\mathrm{${e}}$ (el subíndice), de masa $${MASAS_ATOMICAS[e]}$`;
    const escribimos = directo ? `Escribimos $${n * MASAS_ATOMICAS[e]}$.` : `Escribimos $${n}\\cdot ${MASAS_ATOMICAS[e]}$.`;
    if (i === 0) {
      agregar([{ id: "WS", tex: "", salto: true }, { id: "Wl", tex: col(COLOR.PM, PMtex) }, { id: "We", tex: "=", op: true }, t]);
      paso({
        fusiones: [],
        brotes: [
          { desde: "F2p", hacia: "WS" },
          { desde: "F2p", hacia: "Wl" },
          { desde: "a0", hacia: t.id },
        ],
        texto: `Calculamos $${PMtex}$: lo que pesan, juntos, todos los átomos de ${
          IONICOS.includes(soluto)
            ? "una unidad de la fórmula (esta sustancia no tiene moléculas sueltas, sino iones, que son átomos con carga; la fórmula dice cuántos van juntos)"
            : "una molécula"
        }. Empezamos por el $\\mathrm{${e}}$: ${cuantos}. ${escribimos}`,
        porque: `Cada elemento aporta su número de átomos, $k$, por su masa atómica, $A$.`,
        regla: REGLA_PM,
      });
    } else {
      agregar([{ id: `p${i}`, tex: "+", op: true }, t]);
      paso({
        fusiones: [],
        brotes: [{ desde: `a${i}`, hacia: t.id }],
        texto: `Sumamos lo que aporta el $\\mathrm{${e}}$: ${cuantos}. ${escribimos}`,
        porque: `Se suma un término por cada elemento de la fórmula.`,
        regla: REGLA_PM,
      });
    }
  });

  // cada producto en su paso
  at.forEach(([e, n], i) => {
    if (n === 1 || MASAS_ATOMICAS[e] === 1) return; // ya quedo escrito como r{i}
    const v = n * MASAS_ATOMICAS[e];
    cambiar([`t${i}`], [{ id: `r${i}`, tex: `${v}` }]);
    paso({
      fusiones: [{ desde: [`t${i}`], hacia: `r${i}` }],
      texto: `Multiplicamos: $${n}\\cdot ${MASAS_ATOMICAS[e]}=${v}$.`,
      porque: n === 1 ? `Un solo átomo pesa lo que dice su masa atómica.` : `Cada uno de los $${n}$ átomos pesa $${MASAS_ATOMICAS[e]}$: juntos pesan $${n}$ veces $${MASAS_ATOMICAS[e]}$.`,
      regla: n === 1 ? `$1\\cdot A=A$` : `$k\\cdot A=A+A+\\dots+A$`,
    });
  });

  // sumar de a dos, de izquierda a derecha
  let actual = "r0";
  let acum = at[0][1] * MASAS_ATOMICAS[at[0][0]];
  for (let i = 1; i < at.length; i++) {
    const vi = at[i][1] * MASAS_ATOMICAS[at[i][0]];
    const nid = `s${i}`;
    cambiar([actual, `p${i}`, `r${i}`], [{ id: nid, tex: `${acum + vi}` }]);
    paso({
      fusiones: [{ desde: [actual, `p${i}`, `r${i}`], hacia: nid }],
      texto: `Sumamos de a dos: $${acum}+${vi}=${acum + vi}$.`,
      porque: i === at.length - 1 ? `Es la última suma: la masa de una unidad de la fórmula es la suma de las masas de todos sus átomos.` : `Una suma por vez, de izquierda a derecha.`,
      regla: `$a+b=c$`,
    });
    acum += vi;
    actual = nid;
  }
  const PMv = actual;

  // la masa molar lleva su unidad; las etiquetas de masa atomica ya cumplieron su papel
  at.forEach((_, i) => poner(`a${i}`, { debajo: undefined }));
  agregar([uFrac("UPM", U.g, U.mol)]);
  paso({
    fusiones: [],
    brotes: [{ desde: PMv, hacia: "UPM" }],
    texto: `La masa molar se mide en gramos por mol: $${PMtex}=${PM}\\ \\dfrac{\\text{g}}{\\text{mol}}$. Un mol de ${nombre} pesa $${PM}\\ \\text{g}$. Las masas atómicas de abajo ya cumplieron su papel.`,
    porque: `Las masas atómicas de la tabla son los gramos que pesa un mol de cada átomo; por eso la suma da los gramos que pesa un mol de ${nombre}.`,
    regla: `$${PMtex}=\\dots\\ \\dfrac{\\text{g}}{\\text{mol}}$`,
  });

  // ----- 6) reemplazar de a una letra en n = m / PM: el numero y la unidad vuelan desde el dato
  cambiar(["F2m"], [{ id: "Nm", tex: col(COLOR.m, `${masa}`) }, { id: "Um", tex: U.g }]);
  paso({
    fusiones: [{ desde: ["F2m"], hacia: ["Nm", "Um"], modo: "viajar" }],
    brotes: [
      { desde: "Dm", hacia: "Nm" },
      { desde: "Dmu", hacia: "Um" },
    ],
    texto: `Reemplazamos $m$ por $${masa}\\ \\text{g}$: el número y la unidad salen del dato y ocupan el lugar de la letra.`,
    porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
    regla: `$m=${masa}\\ \\text{g}$`,
  });
  cambiar(["F2p"], [{ id: "Np", tex: col(COLOR.PM, `${PM}`) }, uFrac("Up", U.g, U.mol)]);
  paso({
    fusiones: [{ desde: ["F2p"], hacia: ["Np", "Up"], modo: "viajar" }],
    brotes: [
      { desde: PMv, hacia: "Np" },
      { desde: "UPM", hacia: "Up" },
    ],
    texto: `Reemplazamos $${PMtex}$ por $${PM}\\ \\dfrac{\\text{g}}{\\text{mol}}$: el número y la unidad salen de la masa molar que calculamos. Va abajo de la raya.`,
    porque: `La masa molar entra con su unidad, igual que cualquier dato.`,
    regla: `$${PMtex}=${PM}\\ \\dfrac{\\text{g}}{\\text{mol}}$`,
  });

  // si m / PM no es entera, el proceso va a la vista: simplificar la fraccion y pasarla a decimal (abajo 10 o 100)
  // las fracciones intermedias son fichas de un renglon de borrador; al dividir se funden en el resultado
  const borrador: string[] = [];
  const fr = (id: string, a: number, b: number): Ficha => frPiezas(id, [{ id: `${id}n`, tex: `${a}` }], [{ id: `${id}d`, tex: `${b}` }]);
  const idsFr = (id: string) => [id, `${id}n`, `${id}d`];
  const cant = (c: number, pot: number) => (pot === 10 ? (c === 1 ? "décima" : "décimas") : c === 1 ? "centésima" : "centésimas");
  if (nCent % 100 !== 0) {
    const g = mcd(masa, PM);
    const p = masa / g;
    const q = PM / g;
    if (g > 1) {
      // criterio para hallarlo: se prueba con el mas chico de los dos; si no entra justo en el otro, se baja a uno mas chico
      const chico = Math.min(masa, PM);
      const grande = Math.max(masa, PM);
      const criterioMcd =
        grande % chico === 0
          ? `Prueba con el más chico, el $${chico}$: ¿entra justo en $${grande}$? Sí, $${chico}\\cdot ${grande / chico}=${grande}$.`
          : `Prueba con el más chico, el $${chico}$: ¿entra justo en $${grande}$? No. Entonces prueba con números más chicos, de a uno, hasta dar con el más grande que entre en los dos.`;
      agregar([{ id: "Ss", tex: "", salto: true }, fr("Sf1", p, q)]);
      borrador.push("Ss", ...idsFr("Sf1"));
      paso({
        fusiones: [],
        resaltar: ["Nm", "Np"],
        brotes: [
          { desde: "Nm", hacia: "Ss" },
          { desde: "Nm", hacia: "Sf1" },
          { desde: "Np", hacia: "Sf1" },
        ],
        texto: `Esta división no da un número entero, así que achicamos la fracción $\\dfrac{${masa}}{${PM}}$. ¿Qué número entra justo en $${masa}$ y en $${PM}$? Busca el más grande que entre justo en los dos. ${criterioMcd} Es el $${g}$, porque $${g}\\cdot ${p}=${masa}$ y $${g}\\cdot ${q}=${PM}$. Al dividir arriba y abajo entre $${g}$, queda $\\dfrac{${p}}{${q}}$.`,
        porque: `Dividir arriba y abajo entre el mismo número no cambia el valor de la fracción, pero la deja más chica y más fácil de pasar a decimal.`,
        regla: `$\\dfrac{a\\cdot c}{b\\cdot c}=\\dfrac{a}{b}$`,
      });
    }
    const pot = 10 % q === 0 ? 10 : 100;
    const k = pot / q;
    const c = p * k;
    const previo =
      k === 1
        ? `Ahora la fracción $\\dfrac{${p}}{${q}}$ se escribe como decimal. Abajo ya hay $${pot}$: `
        : `Ahora el decimal de $\\dfrac{${p}}{${q}}$. Buscamos que abajo quede $${pot}$: como $${q}\\cdot ${k}=${pot}$, se puede multiplicar arriba y abajo por $${k}$ y queda $\\dfrac{${p}\\cdot ${k}}{${q}\\cdot ${k}}=\\dfrac{${c}}{${pot}}$. `;
    const brotesB: { desde: string; hacia: string }[] = [];
    const nuevas: Ficha[] = [];
    if (g === 1) {
      nuevas.push({ id: "Ss", tex: "", salto: true }, fr("Sf1", p, q));
      brotesB.push({ desde: "Nm", hacia: "Ss" }, { desde: "Nm", hacia: "Sf1" }, { desde: "Np", hacia: "Sf1" });
    }
    let previa = "Sf1";
    if (k > 1) {
      nuevas.push({ id: "Se1", tex: "=", op: true }, fr("Sf2", c, pot));
      brotesB.push({ desde: previa, hacia: "Sf2" });
      previa = "Sf2";
    }
    nuevas.push({ id: "Se2", tex: "=", op: true }, { id: "Sdec", tex: nTxt });
    brotesB.push({ desde: "Sf1", hacia: "Sdec" });
    agregar(nuevas);
    borrador.push(...nuevas.flatMap((f) => (f.id.startsWith("Sf") ? idsFr(f.id) : [f.id])));
    paso({
      fusiones: [],
      resaltar: ["Nm", "Np"],
      brotes: brotesB,
      texto: `${previo}$\\dfrac{${c}}{${pot}}$ ${c === 1 ? "es" : "son"} $${c}$ ${cant(c, pot)}, y ${c === 1 ? "se escribe" : "se escriben"} con coma $${nTxt}$.`,
      porque: `Una fracción con $${pot}$ abajo se lee directo como decimal: ${pot === 10 ? "un lugar después de la coma" : "dos lugares después de la coma"}.`,
      regla: pot === 10 ? `$\\dfrac{a}{10}=a\\ \\text{décimas}$` : `$\\dfrac{a}{100}=a\\ \\text{centésimas}$`,
    });
  }

  // dividir los numeros; las unidades quedan en su fraccion
  cambiar(["F2"], [{ id: "Nn", tex: nTxt }, { ...pieza("F2") }]);
  quitar("Nm", "Np", ...borrador.filter((id) => !/^Sf\d[nd]$/.test(id)));
  paso({
    fusiones: [{ desde: ["Nm", "Np", ...borrador], hacia: "Nn" }],
    texto:
      borrador.length > 0
        ? `Nos quedamos con el resultado de la división, $${nTxt}$, y borramos el borrador. Las unidades quedan en su fracción, para simplificarlas aparte.`
        : `Primero dividimos los números: $\\dfrac{${masa}}{${PM}}=${nTxt}$. Se comprueba al revés: $${PM}\\cdot ${nTxt}=${masa}$, o sea que el $${PM}$ entra ${nTxt === "1" ? "$1$ vez" : `$${nTxt}$ veces`} en el $${masa}$. Las unidades quedan en su fracción, para simplificarlas aparte.`,
    porque: `Los números se dividen entre sí y las unidades entre sí.`,
    regla: REGLA_DIVIDE,
  });

  // unidades: g / (g/mol) = g · (mol/g): una sola fraccion, cada pieza viaja a su lugar
  cambiar(
    ["F2"],
    [
      frPiezas(
        "UG",
        [
          { id: "u1", tex: U.g },
          { id: "ux", tex: "\\cdot", op: true },
          { id: "u2", tex: U.mol },
        ],
        [{ id: "u3", tex: U.g }]
      ),
    ]
  );
  paso({
    fusiones: [{ desde: ["F2", "Um", "Up", "Upn", "Upd"], hacia: ["UG", "u1", "ux", "u2", "u3"], modo: "viajar" }],
    brotes: [
      { desde: "Um", hacia: "u1" },
      { desde: "Upd", hacia: "u2" },
      { desde: "Upn", hacia: "u3" },
    ],
    texto: `Ahora las unidades: los gramos de arriba se dividen entre una fracción. Dividir entre $\\dfrac{\\text{g}}{\\text{mol}}$ es multiplicar por $\\dfrac{\\text{mol}}{\\text{g}}$, así que todo queda en una sola fracción.`,
    porque: `Dividir entre una fracción es multiplicar por esa fracción dada vuelta, igual que dividir entre $2$ es multiplicar por un medio.`,
    regla: `$\\dfrac{a}{\\;\\dfrac{b}{c}\\;}=\\dfrac{a\\cdot c}{b}$`,
  });
  quitar("u1", "ux", "u3");
  cambiar(["UG"], [{ id: "Umol", tex: U.mol }]);
  paso({
    fusiones: [
      { desde: ["u1", "ux", "u3"], hacia: null, modo: "tachar" },
      { desde: ["UG", "u2"], hacia: "Umol", modo: "viajar" },
    ],
    brotes: [{ desde: "u2", hacia: "Umol" }],
    texto: `Los gramos de arriba se tachan con los gramos de abajo. Queda $\\text{mol}$: moles, justo lo que buscábamos. Resultado: $n=${nTxt}\\ \\text{mol}$.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha. Que queden moles confirma que la fórmula se usó bien.`,
    regla: `$\\dfrac{u\\cdot w}{u}=w$`,
  });

  // ----- 7) reemplazar en M = n / V: n vuela desde el resultado de arriba, V desde el dato
  cambiar(["F1n"], [{ id: "Mn", tex: col(COLOR.n, nTxt) }, { id: "Mnu", tex: U.mol }]);
  paso({
    fusiones: [{ desde: ["F1n"], hacia: ["Mn", "Mnu"], modo: "viajar" }],
    brotes: [
      { desde: "Nn", hacia: "Mn" },
      { desde: "Umol", hacia: "Mnu" },
    ],
    texto: `Reemplazamos $n$ por $${nTxt}\\ \\text{mol}$: el número y la unidad salen del resultado de arriba y ocupan el lugar de la letra.`,
    porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
    regla: `$n=${nTxt}\\ \\text{mol}$`,
  });
  {
    // con V = 1 tambien se escribe el 1 (0,1 mol sobre 1 L): el reemplazo es de a una letra, y dividir entre 1 va en su propio paso
    cambiar(["F1V"], [{ id: "Mv", tex: col(COLOR.V, `${V}`) }, { id: "Mvu", tex: U.L }]);
    paso({
      fusiones: [{ desde: ["F1V"], hacia: ["Mv", "Mvu"], modo: "viajar" }],
      brotes: [
        { desde: "DV", hacia: "Mv" },
        { desde: "DVu", hacia: "Mvu" },
      ],
      texto: `Reemplazamos $V$ por $${V}\\ \\text{L}$: el número y la unidad salen del dato. Va abajo de la raya.`,
      porque: `Se reemplaza una letra por vez, con su unidad, para no perder ningún dato.`,
      regla: `$V=${V}\\ \\text{L}$`,
    });
    const borradorC: string[] = [];
    if (V > 1 && MCent % 100 !== 0) {
      // n / V no entera: se pasa a decimas o centesimas, se divide entre enteros y se vuelve a escribir con coma
      const f = nCent % 10 === 0 && MCent % 10 === 0 ? 10 : 100;
      const a = (nCent * f) / 100;
      const b = (MCent * f) / 100;
      const un = (c: number) => cant(c, f);
      // 0,5 = 5/10 = 50/100: el decimal, escrito en las partes en que se reparte (cada paso es una ficha del renglon de borrador)
      const cadena: Ficha[] = [{ id: "Cs", tex: "", salto: true }, { id: "Ca", tex: nTxt }];
      let eq = "";
      if (f === 100 && nCent % 10 === 0) {
        cadena.push({ id: "Ce1", tex: "=", op: true }, fr("Cf1", nCent / 10, 10));
        eq = `$${nTxt}=\\dfrac{${nCent / 10}}{10}=\\dfrac{${a}}{100}$`;
      } else {
        eq = `$${nTxt}=\\dfrac{${a}}{${f}}$`;
      }
      cadena.push({ id: "Ce2", tex: "=", op: true }, fr("Cf2", a, f));
      agregar(cadena);
      const idsC = cadena.flatMap((x) => (x.id.startsWith("Cf") ? idsFr(x.id) : [x.id]));
      paso({
        fusiones: [],
        resaltar: ["Mn", "Mv"],
        brotes: [
          { desde: "Mn", hacia: "Cs" },
          { desde: "Mn", hacia: "Ca" },
          { desde: "Mn", hacia: "Cf2" },
          ...(f === 100 && nCent % 10 === 0 ? [{ desde: "Mn", hacia: "Cf1" }] : []),
        ],
        texto: `Esta división no da un entero, así que la hacemos con enteros. ${
          f === 100 && nCent % 10 === 0
            ? `Escribimos $${nTxt}$ en décimas: $${nTxt}=\\dfrac{${nCent / 10}}{10}$. Pero $${nCent / 10}$ ${cant(nCent / 10, 10)} ${nCent / 10 === 1 ? "no se reparte exacta" : "no se reparten exactas"} entre $${V}$ litros, así que cada décima se parte en $10$ centésimas: arriba y abajo se multiplican por $10$, $\\dfrac{${nCent / 10}\\cdot 10}{10\\cdot 10}=\\dfrac{${a}}{100}$. Queda ${eq}.`
            : `Escribimos $${nTxt}$ en ${un(2)}: ${eq}.`
        } En cada unidad entera hay $${f}$ ${un(2)}, así que en $${nTxt}$ caben $${a}$ ${un(a)}.`,
        porque: `Es más fácil repartir enteros que decimales. Una fracción con $${f}$ abajo cuenta cuántas ${un(2)} hay, y se vuelve a escribir como decimal con coma.`,
        regla: `$${nTxt}=\\dfrac{${a}}{${f}}$`,
      });
      const resto: Ficha[] = [
        { id: "Cdv", tex: "\\div", op: true },
        { id: "CV", tex: `${V}` },
        { id: "Ce3", tex: "=", op: true },
        fr("Cf3", b, f),
        { id: "Ce4", tex: "=", op: true },
        { id: "Cdec", tex: MTxt },
      ];
      agregar(resto);
      idsC.push(...resto.flatMap((x) => (x.id.startsWith("Cf") ? idsFr(x.id) : [x.id])));
      paso({
        fusiones: [],
        resaltar: ["Mv"],
        brotes: [
          { desde: "Mv", hacia: "CV" },
          { desde: "Cf2", hacia: "Cf3" },
          { desde: "Cf2", hacia: "Cdec" },
        ],
        texto: `Repartimos $${a}$ ${un(a)} entre $${V}$ litros: $\\dfrac{${a}}{${V}}=${b}$, o sea $${b}$ ${un(b)}, y ${b === 1 ? `esa ${un(b)} se escribe` : `esas ${un(b)} se escriben`} con coma $${MTxt}$.${f === 100 && b < 10 ? ` Las centésimas son dos lugares después de la coma: ${b === 1 ? "el $1$" : `el $${b}$`} va en el segundo y el primero queda en $0$.` : ""}`,
        porque: `Repartir ${un(2)} es repartir enteros: $${a}$ entre $${V}$ da $${b}$, y cada una sigue siendo una ${cant(1, f)}.`,
        regla: `$\\dfrac{a}{b}=c$`,
      });
      borradorC.push(...idsC);
    }
    cambiar(["F1"], [{ id: "Mres", tex: MTxt }, { ...pieza("F1") }]);
    quitar("Mn", "Mv", ...borradorC.filter((id) => !/^Cf\d[nd]$/.test(id)));
    paso({
      fusiones: [{ desde: ["Mn", "Mv", ...borradorC], hacia: "Mres" }],
      texto:
        V === 1
          ? `Dividir entre $1$ no cambia el número: la molaridad queda con el mismo número de los moles, $${MTxt}$. Las unidades se quedan como están: $\\dfrac{\\text{mol}}{\\text{L}}$.`
          : `Dividimos los números: $\\dfrac{${nTxt}}{${V}}=${MTxt}$. Las unidades se quedan como están: $\\dfrac{\\text{mol}}{\\text{L}}$.`,
      porque:
        V === 1
          ? `En $1$ litro hay justo los moles de ese litro, así que el número no cambia. No hay nada que tachar: moles sobre litros es justo la unidad de la molaridad.`
          : `Los números se dividen entre sí y las unidades entre sí. No hay nada que tachar: moles sobre litros es justo la unidad de la molaridad.`,
      regla: V === 1 ? `$\\dfrac{a}{1}=a$` : REGLA_DIVIDE,
    });
  }

  // ----- 8) la respuesta viaja al "?" del enunciado
  cambiar(["q"], [{ id: "qR", tex: col(COLOR.M, MTxt), debajo: col(COLOR.M, "M") }]);
  paso({
    fusiones: [{ desde: ["q"], hacia: "qR", modo: "viajar" }],
    brotes: [{ desde: "Mres", hacia: "qR" }],
    texto: `Respuesta: la molaridad es $${MTxt}\\ \\dfrac{\\text{mol}}{\\text{L}}$. La escribimos en el lugar del signo de pregunta.`,
    porque: `El número que quedó, con la unidad que quedó, responde lo que pide el enunciado.`,
    regla: `$M=\\dfrac{n}{V}$`,
  });

  // ----- 9) comprobar hacia atras contra el enunciado original: M·V = n y n·PM = m, con las unidades que se tachan
  const fraccionMolL = (id: string) => uFrac(id, U.mol, U.L);
  /** decimal por entero con proceso a la vista: 0,25 · 56 -> 25/100 · 56 -> (25·56)/100 -> 1400/100 -> 14 (cada cifra es una ficha) */
  const productoDecimal = (p: string, aId: string, xId: string, bId: string, resId: string, aCent: number, b: number, resTxt: string, que: "moles" | "gramos") => {
    const den = aCent % 10 === 0 ? 10 : 100;
    const num = aCent / (100 / den);
    const T = num * b;
    const aTxt = decimal(aCent);
    const f = `${p}f`;
    const g = `${p}g`;
    // 1) el decimal se escribe como fraccion
    cambiar([aId], [fr(f, num, den)]);
    paso({
      fusiones: [{ desde: [aId], hacia: f }],
      texto: `Primero los números de los ${que}: $${aTxt}\\cdot ${b}$. Un decimal por un entero se hace con fracciones. Escribimos $${aTxt}$ como fracción: $${aTxt}=\\dfrac{${num}}{${den}}$, que ${num === 1 ? "es" : "son"} $${num}$ ${cant(num, den)}. Las unidades quedan aparte.`,
      porque: `Un decimal es una fracción con $${den}$ abajo: ${den === 10 ? "un lugar después de la coma son décimas" : "dos lugares después de la coma son centésimas"}.`,
      regla: `$${aTxt}=\\dfrac{${num}}{${den}}$`,
    });
    // 2) el entero se junta con el numerador (si arriba hay un 1, el entero queda solo: no hay producto que escribir)
    if (num === 1) {
      cambiar([f, xId, bId], [frPiezas(g, [{ id: `${p}gp`, tex: `${b}` }], [{ id: `${g}d`, tex: `${den}` }])]);
      paso({
        fusiones: [{ desde: [f, `${f}n`, `${f}d`, xId, bId], hacia: [g, `${p}gp`, `${g}d`], modo: "viajar" }],
        brotes: [
          { desde: bId, hacia: `${p}gp` },
          { desde: `${f}d`, hacia: `${g}d` },
        ],
        texto: `Ahora el $${b}$ multiplica a la fracción: como arriba hay un $1$, el $${b}$ no cambia y queda arriba, sobre el $${den}$.`,
        porque: `Multiplicar una fracción por un entero es multiplicar solo su numerador, y un número por $1$ queda igual.`,
        regla: `$\\dfrac{a}{b}\\cdot c=\\dfrac{a\\cdot c}{b}$`,
      });
    } else {
      cambiar([f, xId, bId], [
        frPiezas(g, [{ id: `${g}1`, tex: `${num}` }, { id: `${g}x`, tex: "\\cdot", op: true }, { id: `${g}2`, tex: `${b}` }], [{ id: `${g}d`, tex: `${den}` }]),
      ]);
      paso({
        fusiones: [{ desde: [f, `${f}n`, `${f}d`, xId, bId], hacia: [g, `${g}1`, `${g}x`, `${g}2`, `${g}d`], modo: "viajar" }],
        brotes: [
          { desde: `${f}n`, hacia: `${g}1` },
          { desde: bId, hacia: `${g}2` },
          { desde: `${f}d`, hacia: `${g}d` },
        ],
        texto: `Multiplicamos: el $${b}$ ${que === "moles" ? "de los litros" : "de la masa molar"} se junta con el $${num}$ de arriba, que queda $${num}\\cdot ${b}$, y el $${den}$ se queda abajo.`,
        porque: `Multiplicar una fracción por un entero es multiplicar solo su numerador.`,
        regla: `$\\dfrac{a}{b}\\cdot c=\\dfrac{a\\cdot c}{b}$`,
      });
      // 3) el producto de arriba
      cambiar([`${g}1`, `${g}x`, `${g}2`], [{ id: `${p}gp`, tex: `${T}` }]);
      paso({
        fusiones: [{ desde: [`${g}1`, `${g}x`, `${g}2`], hacia: `${p}gp` }],
        texto: `Multiplicamos arriba: $${num}\\cdot ${b}=${T}$.`,
        porque: `Una operación por vez: primero el producto de arriba.`,
        regla: `$a\\cdot b=c$`,
      });
    }
    // 4) la fraccion se pasa a entero o a decimal
    cambiar([g], [{ id: resId, tex: resTxt }]);
    paso({
      fusiones: [{ desde: [g, `${p}gp`, `${g}d`], hacia: resId }],
      texto:
        T % den === 0
          ? `Dividimos arriba entre abajo: $\\dfrac{${T}}{${den}}=${resTxt}$.`
          : `Pasamos $\\dfrac{${T}}{${den}}$ a decimal: ${T === 1 ? "es" : "son"} $${T}$ ${cant(T, den)}, y se escriben con coma $${resTxt}$.${
              den === 100 && T < 10
                ? ` Las centésimas son dos lugares después de la coma: el $${T}$ va en el segundo y el primero queda en $0$.`
                : den === 100 && T % 10 === 0
                  ? ` $${Math.floor(T / 100)}{,}${String(T % 100).padStart(2, "0")}$ es lo mismo que $${resTxt}$: el cero del final no cambia el valor.`
                  : ""
            }`,
      porque: `Una fracción con $${den}$ abajo se lee directo como decimal o se divide: es lo mismo que correr la coma.`,
      regla: `$\\dfrac{a}{b}=c$`,
    });
  };
  if (V === 1) {
    // M·1 = M: no se escribe esa multiplicacion; con V = 1 los moles son la molaridad
    agregar([{ id: "KS", tex: "", salto: true }, { id: "Kab", tex: MTxt }, { id: "Kmol", tex: U.mol }]);
    paso({
      fusiones: [],
      resaltar: ["Dm"],
      brotes: [
        { desde: "qR", hacia: "KS" },
        { desde: "qR", hacia: "Kab" },
        { desde: "uqn", hacia: "Kmol" },
      ],
      texto: `Comprobamos con el enunciado, al revés. Como el volumen es $1\\ \\text{L}$, los moles son iguales a la molaridad ($n=M$): copiamos $${MTxt}$ con la unidad $\\text{mol}$. Al final tiene que salir el dato marcado.`,
      porque: `Si la molaridad está bien, al deshacer la cuenta tienen que salir los gramos del enunciado.`,
      regla: `$n=M\\cdot V$`,
    });
  } else {
    agregar([
      { id: "KS", tex: "", salto: true },
      { id: "Ka", tex: MTxt },
      fraccionMolL("KaU"),
      { id: "Kx1", tex: "\\cdot", op: true },
      { id: "Kb", tex: `${V}` },
      { id: "Kbu", tex: U.L },
    ]);
    paso({
      fusiones: [],
      resaltar: ["Dm"],
      brotes: [
        { desde: "qR", hacia: "KS" },
        { desde: "qR", hacia: "Ka" },
        { desde: "uq", hacia: "KaU" },
        { desde: "DV", hacia: "Kb" },
        { desde: "DVu", hacia: "Kbu" },
      ],
      texto: `Comprobamos con el enunciado, al revés: con la molaridad y el volumen volvemos a los moles, $n=M\\cdot V$, y con los moles y la masa molar volvemos a los gramos, $m=n\\cdot ${PMtex}$. Copiamos la molaridad y el volumen, cada uno con su unidad. Al final tiene que salir el dato marcado.`,
      porque: `Si la molaridad está bien, al deshacer la cuenta tienen que salir los gramos del enunciado.`,
      regla: `$m=M\\cdot V\\cdot ${PMtex}$`,
    });
    if (MCent % 100 !== 0) {
      productoDecimal("Kv", "Ka", "Kx1", "Kb", "Kab", MCent, V, nTxt, "moles");
    } else {
      cambiar(["Ka", "Kx1", "Kb"], [{ id: "Kab", tex: nTxt }]);
      paso({
        fusiones: [{ desde: ["Ka", "Kx1", "Kb"], hacia: "Kab" }],
        texto: `Primero los números de los moles: $${MTxt}\\cdot ${V}=${nTxt}$. Las unidades quedan aparte.`,
        porque: `En $V$ litros hay $V$ veces los moles de cada litro.`,
        regla: `$n=M\\cdot V$`,
      });
    }
    cambiar(["KaU"], [{ id: "Kmol", tex: U.mol }]);
    quitar("Kbu");
    paso({
      fusiones: [
        { desde: ["KaUd", "Kbu"], hacia: null, modo: "tachar" },
        { desde: ["KaU", "KaUn"], hacia: "Kmol", modo: "viajar" },
      ],
      brotes: [{ desde: "KaUn", hacia: "Kmol" }],
      texto: `Ahora las unidades: $\\dfrac{\\text{mol}}{\\text{L}}\\cdot \\text{L}$. El litro de abajo se tacha con el litro que multiplica. Quedan $\\text{mol}$: son moles, como tenía que ser.`,
      porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
      regla: `$\\dfrac{u}{w}\\cdot w=u$`,
    });
  }
  agregar([{ id: "Kx2", tex: "\\cdot", op: true }, { id: "Kc", tex: `${PM}` }, uFrac("KcU", U.g, U.mol)]);
  paso({
    fusiones: [],
    brotes: [
      { desde: PMv, hacia: "Kc" },
      { desde: "UPM", hacia: "KcU" },
    ],
    texto: `Ahora los gramos, $m=n\\cdot ${PMtex}$: copiamos la masa molar, $${PM}\\ \\dfrac{\\text{g}}{\\text{mol}}$, con su unidad, al lado de los moles.`,
    porque: `Cada mol pesa $${PM}$ gramos: los moles se multiplican por esa masa molar.`,
    regla: `$m=n\\cdot ${PMtex}$`,
  });
  if (nCent % 100 !== 0) {
    productoDecimal("Kp", "Kab", "Kx2", "Kc", "Kz", nCent, PM, `${masa}`, "gramos");
  } else {
    cambiar(["Kab", "Kx2", "Kc"], [{ id: "Kz", tex: `${masa}` }]);
    paso({
      fusiones: [{ desde: ["Kab", "Kx2", "Kc"], hacia: "Kz" }],
      texto: `Primero los números de los gramos: $${nTxt}\\cdot ${PM}=${masa}$. Las unidades quedan aparte.`,
      porque: `Cada mol pesa $${PM}$ gramos, así que $${nTxt}$ moles pesan $${nTxt}$ veces $${PM}$.`,
      regla: `$m=n\\cdot ${PMtex}$`,
    });
  }
  cambiar(["KcU"], [{ id: "Kg", tex: U.g }]);
  quitar("Kmol");
  paso({
    fusiones: [
      { desde: ["Kmol", "KcUd"], hacia: null, modo: "tachar" },
      { desde: ["KcU", "KcUn"], hacia: "Kg", modo: "viajar" },
    ],
    brotes: [{ desde: "KcUn", hacia: "Kg" }],
    texto: `Ahora las unidades: $\\text{mol}\\cdot \\dfrac{\\text{g}}{\\text{mol}}$. Los moles se tachan con los moles de abajo. Quedan $\\text{g}$: son gramos, como tenía que ser.`,
    porque: `Una unidad dividida entre sí misma vale $1$, igual que un número: por eso se tacha.`,
    regla: `$w\\cdot \\dfrac{u}{w}=u$`,
  });
  agregar([{ id: "Kok", tex: "\\textcolor{#16a34a}{\\checkmark}" }]);
  paso({
    fusiones: [],
    brotes: [{ desde: "Kz", hacia: "Kok" }],
    resaltar: ["Dm", "Kz"],
    texto: `Salen $${masa}\\ \\text{g}$, los mismos gramos del enunciado. La molaridad es $${MTxt}\\ \\dfrac{\\text{mol}}{\\text{L}}$.`,
    porque: `Al deshacer la cuenta se vuelve al dato del enunciado: la cuenta está bien.`,
    regla: `$M=\\dfrac{n}{V}\\quad\\text{y}\\quad n=\\dfrac{m}{${PMtex}}$`,
  });

  return {
    demo: { titulo: "", nota: "", intro, estados: estados.map(pegarUnidades), transiciones: trans },
    resumen: { masa, PM, V, nCent, centesimas: MCent },
  };
}
