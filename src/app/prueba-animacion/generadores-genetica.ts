// Cruce MONOHIBRIDO con CUADRO DE PUNNETT, "como a lapiz" (Biologia):
//   1. el cruce tal como viene (Aa x Aa) y por que no se responde de golpe: cada hijo recibe UN alelo de cada padre;
//   2. ETIQUETAR debajo de cada alelo de que padre viene (padre 1 / padre 2), de uno en uno, cada padre con su color;
//   3. separar los GAMETOS: cada alelo del padre nace en un gameto (un gameto lleva un solo alelo);
//   4. el cuadro: una casilla por pareja (gameto del padre 1, gameto del padre 2). El gameto del padre 1 VISITA al
//      del padre 2 y los dos alelos VIAJAN a su casilla, de una casilla por paso;
//   5. CONTAR los genotipos: las casillas iguales se visitan entre si y nace "genotipo : cuantas";
//   6. proporcion genotipica (y se simplifica dividiendo entre el mayor numero que divide a todos);
//   7. FENOTIPOS: cada genotipo se etiqueta dominante o recesivo (de uno en uno), se suman los dominantes y se arma la proporcion fenotipica;
//   8. respuesta, comprobada contra el cruce original.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas en LaTeX sin $. Las barras van dobles.
// Arrastre: nada aparece de la nada; los alelos viajan del gameto a la casilla y los conteos nacen de las casillas.
import { frPiezas, type Ficha, type Transicion, type Brote, type Visita } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

const COLOR = { p1: "#2563eb", p2: "#ea580c", dom: "#16a34a", rec: "#9333ea" } as const;
const col = (c: string, tex: string) => `\\textcolor{${c}}{${tex}}`;
const mr = (s: string) => `\\mathrm{${s}}`;
const txt = (s: string) => `\\text{${s}}`;

// ---------------------------------------------------------------------------
// Validacion
export type Genotipo = [string, string];

/** lee un genotipo de dos letras del mismo gen (Aa, aA, AA, aa); devuelve [mayuscula primero]. null si no es valido */
export function leerGenotipo(g: string): Genotipo | null {
  const s = g.trim();
  if (!/^[A-Za-z]{2}$/.test(s)) return null;
  if (s[0].toLowerCase() !== s[1].toLowerCase()) return null;
  return s[0] === s[0].toLowerCase() && s[1] === s[1].toUpperCase() ? [s[1], s[0]] : [s[0], s[1]];
}

export function validarPunnett(padre1: string, padre2: string): string | null {
  const a = leerGenotipo(padre1);
  const b = leerGenotipo(padre2);
  if (!a) return "Escribe el genotipo del padre 1 con dos letras del mismo gen, por ejemplo Aa, AA o aa.";
  if (!b) return "Escribe el genotipo del padre 2 con dos letras del mismo gen, por ejemplo Aa, AA o aa.";
  if (a[0].toLowerCase() !== b[0].toLowerCase()) return "Los dos padres tienen que usar la misma letra, porque es el mismo gen. Por ejemplo: Aa y Aa.";
  return null;
}

const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));

// ---------------------------------------------------------------------------
/** Cruce Aa x Aa (u otro de AA, Aa, aa). Validar antes con validarPunnett. */
export function punnett(padre1: string, padre2: string): Resultado {
  const g1 = leerGenotipo(padre1)!;
  const g2 = leerGenotipo(padre2)!;
  const D = g1[0].toUpperCase();
  const r = D.toLowerCase();
  const esDom = (a: string) => a === D;

  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];
  const F: Ficha[] = [];
  const foto = () => estados.push(F.map((f) => ({ ...f })));
  const paso = (t: Transicion) => {
    foto();
    trans.push(t);
  };
  const ver = (id: string, parche: Partial<Ficha>) => {
    const i = F.findIndex((f) => f.id === id);
    F[i] = { ...F[i], ...parche };
  };
  /** cambia las piezas `viejos` (contiguas) por `nuevos` */
  const cambiar = (viejos: string[], nuevos: Ficha[]) => {
    const i = F.findIndex((f) => f.id === viejos[0]);
    const resto = F.filter((f) => !viejos.includes(f.id));
    resto.splice(i, 0, ...nuevos);
    F.length = 0;
    F.push(...resto);
  };
  const salto = (id: string): Ficha => ({ id, tex: "", salto: true });
  const op = (id: string, tex: string): Ficha => ({ id, tex, op: true });

  const nomP = (g: Genotipo) => `$${mr(g[0] + g[1])}$`;
  const intro = `Cruzamos a dos padres, uno con genotipo ${nomP(g1)} y otro con ${nomP(g2)}, y queremos saber cómo van a ser sus hijos. Cada letra es un alelo, una versión del gen: la mayúscula $${mr(D)}$ es el alelo dominante y la minúscula $${mr(r)}$ es el recesivo. El genotipo es la pareja de alelos que tiene cada uno, y el fenotipo es el rasgo que se ve. Vamos a escribir cada paso, como a lápiz.`;

  // ----- estado inicial: el cruce tal como viene
  const alelos: [string, string][] = [
    ["p1a", g1[0]],
    ["p1b", g1[1]],
    ["p2a", g2[0]],
    ["p2b", g2[1]],
  ];
  F.push({ id: "p1a", tex: g1[0] }, { id: "p1b", tex: g1[1], pegado: true }, salto("xs"), { id: "xx", tex: "\\times", op: true }, { id: "p2a", tex: g2[0] }, { id: "p2b", tex: g2[1], pegado: true });
  foto();

  // ----- 1) por que no se responde de golpe
  paso({
    fusiones: [],
    resaltar: alelos.map(([id]) => id),
    texto: `Tenemos cuatro alelos: dos de cada padre. Cada hijo va a recibir solo uno de cada padre, y no sabemos cuál de los dos. Por eso hay que revisar todas las parejas posibles.`,
    porque: `Un hijo tiene dos alelos: uno que le da el padre 1 y otro que le da el padre 2. Lo primero es dejar claro qué alelo viene de quién.`,
    regla: `$\\text{hijo}=\\text{alelo del padre 1}$ $+$ $\\text{alelo del padre 2}$`,
  });

  // ----- 2) etiquetar de que padre viene cada alelo, de uno en uno
  const ORD = ["primer", "segundo"];
  alelos.forEach(([id, a], i) => {
    const padre = i < 2 ? 1 : 2;
    const color = padre === 1 ? COLOR.p1 : COLOR.p2;
    ver(id, { tex: col(color, a), debajo: col(color, txt(`padre ${padre}`)) });
    paso({
      fusiones: [],
      resaltar: [id],
      texto: `Anotamos debajo del alelo $${mr(a)}$ de qué padre viene: es el ${ORD[i % 2]} alelo del padre ${padre}. Le damos el color de ese padre.`,
      porque: i === 0 ? `Los dos alelos de un padre forman su genotipo. Si cada alelo lleva escrito de quién es y su color, después no se mezclan.` : `Cada alelo conserva el color del padre del que viene, y así se sigue su camino hasta el hijo.`,
      regla: `$\\text{padre 1}\\rightarrow\\text{azul},$ $\\text{padre 2}\\rightarrow\\text{naranja}$`,
    });
  });

  // ----- 3) gametos: cada alelo nace en un gameto. Los del padre 1 quedan a la izquierda (uno por renglon: seran las FILAS) y
  // los del padre 2 arriba (seran las COLUMNAS). Asi cada paso ya es un cuadro de Punnett y cabe en 343 px.
  const gam: string[][] = [
    ["g1a", "g1b"],
    ["g2a", "g2b"],
  ];
  const FANT = "\\phantom{\\mathrm{A}}"; // hueco del ancho de una letra
  // padre 1: un gameto por renglon, a la izquierda
  // cada renglon lleva, invisibles, las tres piezas de cada casilla que falta (raya y dos alelos, con las letras que van a tener):
  // asi las columnas quedan alineadas con las de arriba aunque el cuadro se arme de a una casilla. Cada marcador se va cuando llega su casilla.
  const marcadores = (i: number): Ficha[] =>
    [0, 1].flatMap((j) => {
      const a = g1[i];
      const b = g2[j];
      const [x, y] = !esDom(a) && esDom(b) ? [b, a] : [a, b];
      return [op(`ph${i}${j}s`, "\\phantom{\\mid}"), { id: `ph${i}${j}a`, tex: `\\phantom{${mr(x)}}` }, { id: `ph${i}${j}b`, tex: `\\phantom{${mr(y)}}`, pegado: true }];
    });
  F.push(salto("GS1a"), { id: gam[0][0], tex: col(COLOR.p1, mr(g1[0])) }, ...marcadores(0), salto("GS1b"), { id: gam[0][1], tex: col(COLOR.p1, mr(g1[1])) }, ...marcadores(1));
  paso({
    fusiones: [],
    brotes: [
      { desde: "p1a", hacia: "GS1a" },
      { desde: "p1a", hacia: gam[0][0] },
      ...["00s", "00a", "00b", "01s", "01a", "01b"].map((k) => ({ desde: "p1a", hacia: `ph${k}` })),
      { desde: "p1b", hacia: "GS1b" },
      { desde: "p1b", hacia: gam[0][1] },
      ...["10s", "10a", "10b", "11s", "11a", "11b"].map((k) => ({ desde: "p1b", hacia: `ph${k}` })),
    ],
    texto:
      g1[0] === g1[1]
        ? `El padre 1 tiene dos alelos iguales, $${mr(g1[0])}$ y $${mr(g1[1])}$. Separa sus alelos en dos gametos (las células sexuales) y los dos gametos llevan $${mr(g1[0])}$. Los ponemos uno debajo del otro: serán las filas del cuadro.`
        : `El padre 1 separa sus dos alelos en dos gametos (las células sexuales): un gameto lleva $${mr(g1[0])}$ y el otro lleva $${mr(g1[1])}$. Los ponemos uno debajo del otro: serán las filas del cuadro.`,
    porque: `Un gameto lleva un solo alelo de cada par, no los dos. Cada alelo del padre baja a un gameto distinto.`,
    regla: `$\\text{un gameto}$ $=$ $\\text{un solo alelo del par}$`,
  });
  // padre 2: un gameto por columna, arriba (el renglon de arriba lleva huecos del ancho de la fila y de las rayas para que las columnas queden alineadas)
  {
    const i0 = F.findIndex((f) => f.id === "GS1a");
    F.splice(i0, 0, salto("GS2"), op("sp", FANT), op("hm0", "\\phantom{\\mid}"), { id: gam[1][0], tex: col(COLOR.p2, `\\hphantom{\\mathrm{a}}${mr(g2[0])}\\hphantom{\\mathrm{a}}`) }, op("hm1", "\\phantom{\\mid}"), { id: gam[1][1], tex: col(COLOR.p2, `\\hphantom{\\mathrm{a}}${mr(g2[1])}\\hphantom{\\mathrm{a}}`) });
    paso({
      fusiones: [],
      brotes: [
        { desde: "p2a", hacia: "GS2" },
        { desde: "p2a", hacia: "sp" },
        { desde: "p2a", hacia: "hm0" },
        { desde: "p2a", hacia: gam[1][0] },
        { desde: "p2b", hacia: "hm1" },
        { desde: "p2b", hacia: gam[1][1] },
      ],
      texto:
        g2[0] === g2[1]
          ? `El padre 2 tiene dos alelos iguales, $${mr(g2[0])}$ y $${mr(g2[1])}$. Separa sus alelos en dos gametos y los dos gametos llevan $${mr(g2[0])}$. Los ponemos arriba, uno al lado del otro: serán las columnas del cuadro.`
          : `El padre 2 separa sus dos alelos en dos gametos: un gameto lleva $${mr(g2[0])}$ y el otro lleva $${mr(g2[1])}$. Los ponemos arriba, uno al lado del otro: serán las columnas del cuadro.`,
      porque: `Cada padre aporta un solo gameto al hijo. Con los gametos del padre 1 en las filas y los del padre 2 en las columnas, cada casilla junta una pareja.`,
      regla: `$\\text{un gameto}$ $=$ $\\text{un solo alelo del par}$`,
    });
  }

  // ----- 4) el cuadro de Punnett: una casilla por paso
  // ids de cada casilla en el orden en que se escriben (la mayuscula primero)
  const cel: string[][][] = [[[], []], [[], []]];
  const cg: string[][] = [[], []];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const a1 = g1[i];
      const a2 = g2[j];
      const swap = !esDom(a1) && esDom(a2);
      const idA = `c${i}${j}a`; // alelo que viene del padre 1
      const idB = `c${i}${j}b`; // alelo que viene del padre 2
      const pA: Ficha = { id: idA, tex: col(COLOR.p1, mr(a1)) };
      const pB: Ficha = { id: idB, tex: col(COLOR.p2, mr(a2)) };
      const orden: Ficha[] = swap ? [{ ...pB }, { ...pA, pegado: true }] : [{ ...pA }, { ...pB, pegado: true }];
      cel[i][j] = orden.map((f) => f.id);
      cg[i][j] = swap ? a2 + a1 : a1 + a2;
      const brotes: Brote[] = [
        { desde: gam[0][i], hacia: idA },
        { desde: gam[1][j], hacia: idB },
      ];
      const sep = op(`tm${i}${j}`, "\\mid");
      brotes.push({ desde: gam[0][i], hacia: sep.id });
      // la casilla ocupa el lugar de sus marcadores invisibles, en el renglon de su gameto
      const marcas = [`ph${i}${j}s`, `ph${i}${j}a`, `ph${i}${j}b`];
      F.splice(F.findIndex((f) => f.id === marcas[0]), 3, sep, ...orden);
      const visitas: Visita[] = [{ desde: gam[0][i], hacia: [gam[1][j]] }];
      const inicio = i === 0 && j === 0 ? `Armamos el cuadro de Punnett: las filas son los gametos del padre 1 y las columnas, los del padre 2. ` : "";
      paso({
        fusiones: [{ desde: marcas, hacia: null }],
        visitas,
        brotes,
        texto: `${inicio}Fila ${i + 1}, columna ${j + 1}: el gameto $${mr(a1)}$ del padre 1 se junta con el gameto $${mr(a2)}$ del padre 2. Los dos alelos pasan a la casilla (el de la izquierda y el de arriba) y forman el genotipo $${mr(cg[i][j])}$.${swap ? ` Se escribe primero la mayúscula, y por eso queda $${mr(cg[i][j])}$: $${mr(a1 + a2)}$ y $${mr(a2 + a1)}$ son el mismo genotipo.` : ""}`,
        porque: `El hijo recibe un alelo de cada padre. El cuadro de Punnett junta cada gameto del padre 1 con cada gameto del padre 2, y cada casilla es un hijo posible; todas valen lo mismo.`,
        regla: `$\\text{casilla}$ $=$ $\\text{fila}+\\text{columna}$`,
      });
    }
  }

  // ----- 5) contar los genotipos
  const todas = [`${D}${D}`, `${D}${r}`, `${r}${r}`];
  const cuenta = (k: string) => [0, 1].flatMap((i) => [0, 1].map((j) => [i, j] as const)).filter(([i, j]) => cg[i][j] === k);
  const clases = todas.filter((k) => cuenta(k).length > 0);
  const n = (k: string) => cuenta(k).length;
  // los padres ya cumplieron su papel (sus alelos estan en el cuadro): se recogen para que lo que sigue no quede dos pantallas mas abajo
  {
    const ids = ["p1a", "p1b", "xs", "xx", "p2a", "p2b"];
    for (const id of ids) F.splice(F.findIndex((f) => f.id === id), 1);
    paso({
      fusiones: [{ desde: ids, hacia: null }],
      texto: `El cuadro ya está completo y los alelos de los padres están dentro de él. Quitamos el cruce de arriba para tener lugar.`,
      porque: `Los padres ya no se necesitan: cada casilla guarda el alelo que puso cada uno. Ahora hay que contar las casillas.`,
      regla: `$\\text{casilla}=\\text{un hijo posible}$`,
    });
  }
  clases.forEach((K, k) => {
    const casillas = cuenta(K);
    const primera = casillas[0];
    const idPrimera = cel[primera[0]][primera[1]][0];
    const idSegunda = cel[primera[0]][primera[1]][1];
    const cant = casillas.length;
    const brotes: Brote[] = [
      { desde: idPrimera, hacia: `gt${k}` },
      { desde: idSegunda, hacia: `cn${k}` },
      { desde: idPrimera, hacia: `tc${k}` },
    ];
    // un renglon por genotipo ("AA : 1"): en una sola linea no cabe en 343 px con su etiqueta debajo
    F.push(salto(`GR${k}`));
    brotes.push({ desde: idPrimera, hacia: `GR${k}` });
    F.push({ id: `gt${k}`, tex: mr(K) }, op(`tc${k}`, ":"), { id: `cn${k}`, tex: `${cant}` });
    const visitas: Visita[] = cant > 1 ? [{ desde: idPrimera, hacia: casillas.slice(1).map(([i, j]) => cel[i][j][0]), etiqueta: mr(K) }] : [];
    paso({
      fusiones: [],
      resaltar: casillas.flatMap(([i, j]) => cel[i][j]),
      ...(visitas.length > 0 ? { visitas } : {}),
      brotes,
      texto:
        cant > 1
          ? `Buscamos las casillas con genotipo $${mr(K)}$ y las contamos: hay $${cant}$. Anotamos el genotipo y cuántas casillas tiene.`
          : `Buscamos las casillas con genotipo $${mr(K)}$: solo hay $1$. Anotamos el genotipo y cuántas casillas tiene.`,
      porque: `Cada casilla es un hijo posible. Contar las casillas iguales dice cuántos hijos de cada genotipo se esperan.`,
      regla: `$\\text{hijos de un genotipo}$ $=$ $\\text{casillas con ese genotipo}$`,
    });
  });

  // el cuadro ya dio sus conteos: se quita para que lo que sigue no quede dos pantallas mas abajo
  {
    const ids = F.filter((f) => !/^(GR|gt|tc|cn)\d$/.test(f.id)).map((f) => f.id);
    for (const id of ids) F.splice(F.findIndex((f) => f.id === id), 1);
    paso({
      fusiones: [{ desde: ids, hacia: null }],
      texto: `Ya contamos todas las casillas. Quitamos el cuadro para tener lugar y nos quedamos con los conteos.`,
      porque: `Los conteos ya guardan lo que importa del cuadro: cuántos hijos hay de cada genotipo.`,
      regla: `$\\text{conteos}=\\text{casillas de cada genotipo}$`,
    });
  }

  // ----- 6) proporcion (con simplificacion) de una lista de cantidades
  /** arma `etiqueta  nombre : nombre = n : n` con piezas que nacen de sus cantidades; si hay un divisor comun, lo simplifica */
  const razon = (
    pref: string,
    etiqueta: string,
    items: { nombre: string; desdeNombre: string; valor: number; desdeValor: string }[],
    t: Pick<Transicion, "texto" | "porque" | "regla">
  ): string[] => {
    const brotes: Brote[] = [];
    F.push(salto(`${pref}S`), op(`${pref}L`, `\\small ${txt(etiqueta)}`), salto(`${pref}S2`));
    brotes.push({ desde: items[0].desdeValor, hacia: `${pref}S` }, { desde: items[0].desdeValor, hacia: `${pref}L` }, { desde: items[0].desdeValor, hacia: `${pref}S2` }, { desde: items[0].desdeValor, hacia: `${pref}S3` });
    items.forEach((it, k) => {
      if (k > 0) F.push(op(`${pref}mc${k}`, ":"));
      F.push({ id: `${pref}m${k}`, tex: it.nombre });
      brotes.push({ desde: it.desdeNombre, hacia: `${pref}m${k}` });
    });
    F.push(salto(`${pref}S3`), op(`${pref}e`, "="));
    items.forEach((it, k) => {
      if (k > 0) F.push(op(`${pref}nc${k}`, ":"));
      F.push({ id: `${pref}n${k}`, tex: `${it.valor}` });
      brotes.push({ desde: it.desdeValor, hacia: `${pref}n${k}` });
    });
    const valores = items.map((it) => it.valor);
    const g = valores.reduce(mcd);
    paso({ fusiones: [], brotes, ...t, texto: g === 1 ? `${t.texto} Una proporción se simplifica si todos sus números se dividen entre el mismo; aquí no se puede: ningún número mayor que $1$ divide a todos.` : t.texto });
    if (g === 1) return items.map((_, k) => `${pref}n${k}`);
    // simplificar: cada numero se escribe como fraccion entre el divisor comun, y luego se divide
    const fusA = valores.map((v, k) => {
      const f = frPiezas(`${pref}f${k}`, [{ id: `${pref}f${k}n`, tex: `${v}` }], [{ id: `${pref}f${k}d`, tex: `${g}` }]);
      cambiar([`${pref}n${k}`], [f]);
      return { desde: [`${pref}n${k}`], hacia: [`${pref}f${k}`, `${pref}f${k}n`, `${pref}f${k}d`], modo: "viajar" as const };
    });
    paso({
      fusiones: fusA,
      brotes: valores.flatMap((_, k) => [
        { desde: `${pref}n${k}`, hacia: `${pref}f${k}n` },
        { desde: `${pref}n${k}`, hacia: `${pref}f${k}d` },
      ]),
      texto: `Buscamos el mayor número que divide a todos los números de la proporción: es $${g}$. Escribimos cada número como una fracción entre $${g}$.`,
      porque: `Una proporción no cambia si todos sus números se dividen entre el mismo número. Se hace para dejarla lo más pequeña posible.`,
      regla: `$a:b=\\dfrac{a}{g}:\\dfrac{b}{g}$`,
    });
    valores.forEach((v, k) => cambiar([`${pref}f${k}`], [{ id: `${pref}s${k}`, tex: `${v / g}` }]));
    paso({
      fusiones: valores.map((_, k) => ({ desde: [`${pref}f${k}`], hacia: `${pref}s${k}` })),
      texto: `Dividimos cada número: ${valores.map((v) => `$\\dfrac{${v}}{${g}}=${v / g}$`).join(", ")}.`,
      porque: `La raya de la fracción es una división: el número de arriba entre el de abajo.`,
      regla: `$\\dfrac{a}{b}=c\\ \\iff\\ a=b\\cdot c$`,
    });
    return items.map((_, k) => `${pref}s${k}`);
  };

  const unaClase = (frase: string, id: string, texto: string) =>
    paso({
      fusiones: [],
      resaltar: [id],
      texto: `${texto}`,
      porque: frase,
      regla: `$\\text{casillas iguales}$ $\\Rightarrow$ $\\text{hijos iguales}$`,
    });

  const idsGen = clases.length > 1
    ? razon(
        "rg",
        "Proporción genotípica:",
        clases.map((K, k) => ({ nombre: mr(K), desdeNombre: `gt${k}`, valor: n(K), desdeValor: `cn${k}` })),
        {
          texto: `Escribimos las cantidades como una proporción: ${clases.map((K) => `$${mr(K)}$`).join(", ")} en ese orden, con ${clases.map((K) => `$${n(K)}$`).join(", ")} casillas.`,
          porque: `Una proporción compara cuántos hijos hay de cada genotipo, sin importar cuántos hijos haya en total.`,
          regla: `$a:b:c\\ \\text{(casillas de cada genotipo)}$`,
        }
      )
    : (unaClase(
        `Si todas las casillas son iguales, no hay nada que comparar: todos los hijos tienen el mismo genotipo.`,
        "cn0",
        `Las $4$ casillas tienen el mismo genotipo, $${mr(clases[0])}$, así que cualquier hijo sale $${mr(clases[0])}$. No hay proporción entre genotipos distintos.`
      ),
      ["cn0"]);

  // ----- 7) fenotipos: cada genotipo se etiqueta dominante o recesivo, de uno en uno
  clases.forEach((K, k) => {
    const dominante = K.includes(D);
    const color = dominante ? COLOR.dom : COLOR.rec;
    // la etiqueta va AL LADO de su conteo ("AA : 1 dominante"): debajo quedaba a mitad de camino entre dos renglones
    F.splice(F.findIndex((f) => f.id === `cn${k}`) + 1, 0, { id: `fe${k}`, tex: col(color, `\\small ${txt(dominante ? "dominante" : "recesivo")}`) });
    paso({
      fusiones: [],
      resaltar: [`gt${k}`],
      brotes: [{ desde: `gt${k}`, hacia: `fe${k}` }],
      texto: dominante
        ? `El genotipo $${mr(K)}$ tiene ${K[0] === K[1] ? "dos alelos" : "un alelo"} $${mr(D)}$ (dominante). El dominante manda: en el fenotipo (el rasgo que se ve) los hijos $${mr(K)}$ muestran el rasgo dominante. Lo anotamos al lado.`
        : `El genotipo $${mr(K)}$ no tiene ningún alelo $${mr(D)}$ que lo tape, así que el recesivo se nota: los hijos $${mr(K)}$ muestran el rasgo recesivo. Lo anotamos al lado.`,
      porque: dominante ? `El alelo dominante se nota aunque venga solo una vez: tapa al recesivo.` : `El alelo recesivo solo se nota cuando el hijo recibió dos copias de él, porque no hay un dominante que lo tape.`,
      regla: dominante ? `$\\text{al menos un alelo dominante}$ $\\Rightarrow$ $\\text{rasgo dominante}$` : `$\\text{dos alelos recesivos}$ $\\Rightarrow$ $\\text{rasgo recesivo}$`,
    });
  });

  const clDom = clases.map((K, k) => ({ K, k })).filter(({ K }) => K.includes(D));
  const clRec = clases.map((K, k) => ({ K, k })).filter(({ K }) => !K.includes(D));
  const totDom = clDom.reduce((s, { K }) => s + n(K), 0);
  const totRec = clRec.reduce((s, { K }) => s + n(K), 0);

  // fila de dominantes
  let idDom: string | null = null;
  if (clDom.length > 0) {
    const brotes: Brote[] = [{ desde: `cn${clDom[0].k}`, hacia: "DS" }, { desde: `cn${clDom[0].k}`, hacia: "dl" }];
    F.push(salto("DS"), op("dl", col(COLOR.dom, `\\small ${txt("Dominantes:")}`)));
    clDom.forEach(({ K, k }, j) => {
      if (j > 0) F.push(op(`dp${j}`, "+"));
      F.push({ id: `d${j}`, tex: `${n(K)}` });
      brotes.push({ desde: `cn${k}`, hacia: `d${j}` });
    });
    paso({
      fusiones: [],
      brotes,
      texto:
        clDom.length > 1
          ? `Los hijos con rasgo dominante son los de genotipo ${clDom.map(({ K }) => `$${mr(K)}$`).join(" y ")}. Traemos sus cantidades para sumarlas.`
          : `Los hijos con rasgo dominante son los de genotipo $${mr(clDom[0].K)}$. Traemos su cantidad.`,
      porque: `El fenotipo es lo que se ve. Todos los genotipos que tienen el alelo dominante se ven igual, así que se cuentan juntos.`,
      regla: `$\\text{dominantes}$ $=$ $\\text{casillas con al menos un alelo}\\ ${mr(D)}$`,
    });
    idDom = "d0";
    if (clDom.length > 1) {
      cambiar(["d0", "dp1", "d1"], [{ id: "dT", tex: `${totDom}` }]);
      paso({
        fusiones: [{ desde: ["d0", "dp1", "d1"], hacia: "dT" }],
        texto: `Sumamos: $${n(clDom[0].K)}+${n(clDom[1].K)}=${totDom}$.`,
        porque: `Se suman las casillas de todos los genotipos que muestran el mismo rasgo.`,
        regla: `$a+b=c$`,
      });
      idDom = "dT";
    }
  }
  // fila de recesivos
  let idRec: string | null = null;
  if (clRec.length > 0) {
    F.push(salto("RS"), op("rl", col(COLOR.rec, `\\small ${txt("Recesivos:")}`)), { id: "rr0", tex: `${n(clRec[0].K)}` });
    paso({
      fusiones: [],
      brotes: [
        { desde: `cn${clRec[0].k}`, hacia: "RS" },
        { desde: `cn${clRec[0].k}`, hacia: "rl" },
        { desde: `cn${clRec[0].k}`, hacia: "rr0" },
      ],
      texto: `El único genotipo con rasgo recesivo es $${mr(clRec[0].K)}$. Traemos su cantidad.`,
      porque: `El rasgo recesivo solo aparece cuando los dos alelos son recesivos.`,
      regla: `$\\text{recesivos}=\\text{casillas}\\ ${mr(r + r)}$`,
    });
    idRec = "rr0";
  }

  let idsFen: string[];
  if (idDom && idRec) {
    const nd = col(COLOR.dom, `\\small ${txt("dominante")}`);
    const nr = col(COLOR.rec, `\\small ${txt("recesivo")}`);
    idsFen = razon(
      "rf",
      "Proporción fenotípica:",
      [
        { nombre: nd, desdeNombre: "dl", valor: totDom, desdeValor: idDom },
        { nombre: nr, desdeNombre: "rl", valor: totRec, desdeValor: idRec },
      ],
      {
        texto: `Escribimos la proporción entre los hijos con rasgo dominante (${totDom}) y con rasgo recesivo (${totRec}).`,
        porque: `La proporción fenotípica compara cuántos hijos se ven de cada tipo, sin mirar el genotipo que tienen por dentro.`,
        regla: `$\\text{dominantes}:\\text{recesivos}$`,
      }
    );
  } else {
    const unico = (idDom ?? idRec)!;
    const dom = idDom !== null;
    unaClase(
      `Si todos los hijos muestran el mismo rasgo, no hay nada que comparar.`,
      unico,
      `Todos los hijos muestran el mismo rasgo: ${dom ? "dominante" : "recesivo"}. No hay proporción entre rasgos distintos.`
    );
    idsFen = [unico];
  }

  // ----- 8) respuesta, comprobada con el cruce original
  const razG = clases.map((K) => n(K));
  const textoGen = clases.length > 1 ? `$${clases.map((K) => mr(K)).join(":")}=${razG.map((v) => v / razG.reduce(mcd)).join(":")}$` : `todos $${mr(clases[0])}$`;
  const textoFen =
    totDom > 0 && totRec > 0
      ? `$${txt("dominante")}:${txt("recesivo")}=${totDom / mcd(totDom, totRec)}:${totRec / mcd(totDom, totRec)}$, o sea ${totDom} de cada 4 hijos con rasgo dominante y ${totRec} de cada 4 con rasgo recesivo`
      : `todos los hijos con rasgo ${totDom > 0 ? "dominante" : "recesivo"}`;
  paso({
    fusiones: [],
    resaltar: [...idsGen, ...idsFen],
    texto: `Respuesta: en el cruce ${nomP(g1)} $\\times$ ${nomP(g2)}, la proporción genotípica es ${textoGen} y la fenotípica es ${textoFen}.`,
    porque: `Las casillas salen de juntar los dos gametos de un padre con los dos del otro, y los conteos de las casillas dan las dos proporciones.`,
    regla: `$\\text{proporción}=\\text{conteos simplificados}$`,
  });
  // comprobacion: los conteos tienen que sumar las 4 casillas del cuadro
  paso({
    fusiones: [],
    resaltar: clases.map((_, k) => `cn${k}`),
    texto: `Comprobamos con los conteos: ${clases.length > 1 ? `los genotipos suman $${clases.map((K) => n(K)).join("+")}=4$` : "las $4$ casillas son del mismo genotipo"}${totDom > 0 && totRec > 0 ? ` y los rasgos suman $${totDom}+${totRec}=4$` : ""}. Son $4$ casillas, como esperábamos.`,
    porque: `Cada padre da $2$ gametos, y $2\\cdot 2=4$ casillas. Si los conteos no sumaran $4$, habría una casilla mal contada.`,
    regla: `$\\text{suma de los conteos}=\\text{casillas}=4$`,
  });

  return {
    demo: { titulo: "", nota: "", intro, estados, transiciones: trans },
    resumen: {
      AA: n(`${D}${D}`),
      Aa: n(`${D}${r}`),
      aa: n(`${r}${r}`),
      dominantes: totDom,
      recesivos: totRec,
    },
  };
}
