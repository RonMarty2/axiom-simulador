// Trigonometria del triangulo rectangulo: hallar un lado con sen, cos o tan de un angulo notable.
// Patron "ANOTAR Y REEMPLAZAR" (Ronald, 7-oct):
//   1. los datos tal como vienen (angulo, lado que conocemos, lado que buscamos) y que significa cada razon;
//   2. ELEGIR la razon: la que usa justo el lado que conocemos y el que buscamos; las otras dos se descartan;
//   3. la razon se escribe primero con LETRAS (sen θ = op / hip) y se reemplaza UNA letra por vez;
//      cada valor sale de su dato (brote), no aparece de la nada;
//   4. el valor notable (sen 30° = 1/2) se arma a la vista: una fila con los lados rotulados del triangulo conocido
//      (op = 1, hip = 2), de ahi nace la fila de la tabla (sen 30° = 1/2), que se queda hasta el final, y de la tabla
//      viaja el valor a la ecuacion;
//   5. se despeja ARRASTRANDO las piezas con su id (el lado que divide pasa multiplicando; si la incognita divide,
//      primero ella pasa multiplicando y luego el denominador del valor notable);
//   6. COMPROBACION contra la razon original: el cociente de los lados encontrados (nace de los dos lados) da el valor
//      de la tabla; y al final la x viaja a la fila de datos (op = 5).
// Por ahora solo las razones que valen 1/2 o 1 (sen 30°, cos 60°, tan 45°): dan resultados enteros sin raices.
// Las que valen raiz (sen 45°, cos 30°, tan 60°...) no se animan: el panel avisa.
// Todo texto del alumno va en LaTeX entre $...$ (MathText). Las barras invertidas van dobles.
import { fr, frPiezas, type Ficha, type Figura, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

export type Lado = "op" | "ady" | "hip";
export type Razon = "sen" | "cos" | "tan";

const LADOS: Lado[] = ["op", "ady", "hip"];
const RAZONES: Razon[] = ["sen", "cos", "tan"];
const DEF: Record<Razon, { n: Lado; d: Lado }> = {
  sen: { n: "op", d: "hip" },
  cos: { n: "ady", d: "hip" },
  tan: { n: "op", d: "ady" },
};
// cada nombre lleva su articulo (el seno, el coseno, la tangente; el cateto, la hipotenusa): el genero NO se improvisa en el texto
const LADO_ART: Record<Lado, string> = { op: "el cateto opuesto", ady: "el cateto adyacente", hip: "la hipotenusa" };
// con preposicion "a": "al cateto ..." / "a la hipotenusa" (nunca "a el")
const A_LADO: Record<Lado, string> = { op: "al cateto opuesto", ady: "al cateto adyacente", hip: "a la hipotenusa" };
const RAZON_ART: Record<Razon, string> = { sen: "el seno", cos: "el coseno", tan: "la tangente" };
const NOMBRE_RAZON: Record<Razon, string> = { sen: "seno", cos: "coseno", tan: "tangente" };
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const desconocido = (l: Lado) => (l === "hip" ? "desconocida" : "desconocido");
/** razones que valen 1/q con q entero: ángulo -> q (solo las que se animan) */
const Q: Record<Razon, Partial<Record<number, number>>> = {
  sen: { 30: 2 },
  cos: { 60: 2 },
  tan: { 45: 1 },
};

const razonDe = (a: string, b: string): Razon | null => RAZONES.find((r) => (DEF[r].n === a && DEF[r].d === b) || (DEF[r].n === b && DEF[r].d === a)) ?? null;

export function validarTrigonometria(angulo: number, dado: string, valor: number, buscado: string): string | null {
  if (![angulo, valor].every(Number.isInteger)) return "Escribe números enteros.";
  if (![30, 45, 60].includes(angulo)) return "El ángulo debe ser 30, 45 o 60 grados.";
  if (!LADOS.includes(dado as Lado) || !LADOS.includes(buscado as Lado)) return "Elige lados válidos: cateto opuesto, cateto adyacente o hipotenusa.";
  if (dado === buscado) return "El lado que conoces y el que buscas deben ser distintos.";
  if (valor < 1 || valor > 99) return "La medida del lado debe estar entre 1 y 99.";
  const r = razonDe(dado, buscado)!;
  const q = Q[r][angulo];
  if (q === undefined) {
    return `Con ${NOMBRE_RAZON[r]} de ${angulo}° el valor lleva una raíz cuadrada y por ahora no se anima. Prueba con seno de 30° (opuesto e hipotenusa), coseno de 60° (adyacente e hipotenusa) o tangente de 45° (los dos catetos).`;
  }
  const incognitaArriba = DEF[r].n === buscado;
  if (incognitaArriba && valor % q !== 0) return `Con este ángulo la razón vale 1 sobre ${q}: usa una medida par para que el resultado sea un número entero.`;
  return null;
}

const par = (n: number) => `${n}`;
const letras0 = (l: Lado) => l;

/** Triangulo rectangulo con el angulo de la ficha en el vertice izquierdo y el recto abajo a la derecha.
 *  Los lados son las tres letras op / ady / hip; `rotulos` dice que se escribe junto a cada uno y `resaltados` cuales se marcan. */
function figuraTriangulo(angulo: number, theta: string, rotulos: Partial<Record<Lado, string>>, resaltados: Lado[], opc: { referencia?: boolean; thetaRes?: boolean } = {}): Figura {
  const rad = (angulo * Math.PI) / 180;
  const L = 170;
  const b = L * Math.cos(rad);
  const h = L * Math.sin(rad);
  const W = 300;
  const H = Math.round(h + 56);
  const x0 = (W - b) / 2;
  const y0 = H - 26;
  const f = (n: number) => Math.round(n * 10) / 10;
  const A = [x0, y0];
  const C = [x0 + b, y0];
  const B = [x0 + b, y0 - h];
  const r = 12;
  const arco = 30;
  const lin = (p: number[], q2: number[]) => `M${f(p[0])} ${f(p[1])} L${f(q2[0])} ${f(q2[1])}`;
  const lineas: Figura["lineas"] = [
    { d: lin(C, B), resaltada: resaltados.includes("op"), discontinua: opc.referencia },
    { d: lin(A, C), resaltada: resaltados.includes("ady"), discontinua: opc.referencia },
    { d: lin(A, B), resaltada: resaltados.includes("hip"), discontinua: opc.referencia },
    // marca del angulo recto
    { d: `M${f(C[0] - r)} ${f(C[1])} L${f(C[0] - r)} ${f(C[1] - r)} L${f(C[0])} ${f(C[1] - r)}` },
    // arco del angulo
    { d: `M${f(A[0] + arco)} ${f(A[1])} A${arco} ${arco} 0 0 0 ${f(A[0] + arco * Math.cos(rad))} ${f(A[1] - arco * Math.sin(rad))}` },
  ];
  const lista: Figura["rotulos"] = [{ x: f(A[0] + 64 * Math.cos(rad / 2)), y: f(A[1] - 64 * Math.sin(rad / 2) + 5), t: theta, resaltado: opc.thetaRes }];
  if (opc.referencia) lista.push({ x: W / 2, y: 14, t: "triángulo de referencia" });
  if (rotulos.op) lista.push({ x: f(C[0] + 8), y: f(C[1] - h / 2 + 5), t: rotulos.op, ancla: "start", resaltado: resaltados.includes("op") });
  if (rotulos.ady) lista.push({ x: f(x0 + b / 2), y: f(y0 + 20), t: rotulos.ady, resaltado: resaltados.includes("ady") });
  if (rotulos.hip) lista.push({ x: f(x0 + b / 2 - 10 * Math.sin(rad) - 4), y: f(y0 - h / 2 - 10 * Math.cos(rad)), t: rotulos.hip, ancla: "end", resaltado: resaltados.includes("hip") });
  const nombres: Record<Lado, string> = { op: "cateto opuesto", ady: "cateto adyacente", hip: "hipotenusa" };
  const resaltadosTxt = (resaltados.length ? ` Se marca: ${resaltados.map((l) => nombres[l]).join(" y ")}.` : "") + (opc.thetaRes ? " Se marca el ángulo." : "") + (opc.referencia ? " Es un triángulo de referencia, con líneas punteadas, distinto del del ejercicio." : "");
  return {
    vb: [W, H],
    lineas,
    rotulos: lista,
    descripcion: `Triángulo rectángulo con un ángulo de ${angulo} grados, con el cateto opuesto, el cateto adyacente y la hipotenusa rotulados.${resaltadosTxt}`,
  };
}

export function trigonometria(angulo: number, dado: string, valor: number, buscado: string): Resultado {
  const K = dado as Lado;
  const U = buscado as Lado;
  const rz = razonDe(K, U)!;
  const q = Q[rz][angulo]!;
  const def = DEF[rz];
  const incognitaArriba = def.n === U;
  const res = incognitaArriba ? valor / q : valor * q;
  const razTex = `\\text{${rz}}`;
  const letras = (l: Lado) => `\\text{${l}}`;
  const reglaRazon = (r: Razon) => `$${`\\text{${r}}`}\\,\\theta=\\dfrac{${letras(DEF[r].n)}}{${letras(DEF[r].d)}}$`;
  const angTex = `${angulo}^\\circ`;

  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];
  // marcas: indice de transicion de los pasos que la figura necesita ubicar (no se cuentan a mano)
  const marca: Record<string, number> = {};

  // ----- datos del enunciado (se quedan a la vista todo el ejercicio: de ahi salen los valores)
  const Dt: Ficha = { id: "Dt", tex: `\\theta=${angTex}` };
  const Dk: Ficha = { id: "Dk", tex: `${letras(K)}=${valor}` };
  const Du: Ficha = { id: "Du", tex: `${letras(U)}=x` };
  const datos = [Dt, Dk, Du];

  // ----- las tres razones con letras
  const fila = (r: Razon): Ficha[] => [
    { id: `${r}f`, tex: `\\text{${r}}`, salto: true },
    { id: `${r}t`, tex: "\\theta", pegado: true },
    { id: `${r}e`, tex: "=", op: true },
    frPiezas(`${r}q`, [{ id: `${r}n`, tex: letras(DEF[r].n) }], [{ id: `${r}d`, tex: letras(DEF[r].d) }]),
  ];
  const ids = (r: Razon) => [`${r}f`, `${r}t`, `${r}e`, `${r}q`];
  // el primer estado trae SOLO los datos: cada razon nace en su propio paso (ver abajo)
  estados.push([...datos]);

  // ----- 1) nombres: el angulo, cada lado, y recien despues el dato y la incognita (la figura marca uno por paso)
  marca.theta = trans.length;
  estados.push(estados[0]);
  trans.push({
    fusiones: [],
    resaltar: ["Dt"],
    texto: `Trabajamos con un triángulo rectángulo que tiene un ángulo de $${angTex}$. Primero le ponemos nombre a ese ángulo: lo llamamos $\\theta$ (una letra griega, que se lee «teta»), y en este ejercicio $\\theta=${angTex}$.`,
    porque: `Una letra corta es más cómoda que escribir «el ángulo» cada vez. Los datos de arriba se quedan a la vista: de ahí vamos a sacar los números.`,
  });
  const nombreLado: { l: Lado; texto: string; porque: string }[] = [
    { l: "op", texto: `Ahora los lados. El cateto opuesto es el que está enfrente del ángulo $\\theta$, sin tocarlo. Lo abreviamos $\\text{op}$.`, porque: `Los catetos son los dos lados que forman el ángulo recto; este es el que queda frente a $\\theta$.` },
    { l: "ady", texto: `El cateto adyacente es el otro cateto, el que toca al ángulo $\\theta$. Lo abreviamos $\\text{ady}$.`, porque: `Adyacente significa «al lado de»: está pegado al ángulo.` },
    { l: "hip", texto: `La hipotenusa es el lado más largo, el que está enfrente del ángulo recto. La abreviamos $\\text{hip}$.`, porque: `Siempre es el lado más largo del triángulo rectángulo.` },
  ];
  // cada abreviatura nace como una nota junto a los datos y se va cuando ya se usaron los nombres (el dato y la incognita)
  const notas: Ficha[] = [];
  nombreLado.forEach((n) => {
    marca[n.l] = trans.length;
    notas.push({ id: `N${n.l}`, tex: `\\text{${n.l}}=\\text{${LADO_ART[n.l].replace(/^(el cateto|la) /, "")}}`, salto: true });
    estados.push([...datos, ...notas]);
    trans.push({ fusiones: [], brotes: [{ desde: "Dt", hacia: `N${n.l}` }], texto: n.texto, porque: n.porque });
  });
  marca.dato = trans.length;
  estados.push([...datos]);
  trans.push({
    fusiones: [{ desde: notas.map((f) => f.id), hacia: null }],
    resaltar: ["Dk", "Du"],
    texto: `Ya tenemos los nombres. En este ejercicio conocemos ${LADO_ART[K]} ($\\text{${K}}$), que mide $${valor}$, y buscamos ${LADO_ART[U]} ($\\text{${U}}$), ${U === "hip" ? "a la que" : "al que"} llamamos $x$: todavía no sabemos cuánto mide.`,
    porque: `Las notas con los nombres se van porque ya las usamos; estos dos datos se quedan a la vista todo el ejercicio. Conocer un lado y buscar otro es lo que va a decirnos qué razón usar, porque cada razón compara dos lados del triángulo.`,
  });
  const significado: Record<Razon, string> = {
    sen: `El seno del ángulo es el cateto opuesto dividido entre la hipotenusa.`,
    cos: `El coseno del ángulo es el cateto adyacente dividido entre la hipotenusa.`,
    tan: `La tangente del ángulo es el cateto opuesto dividido entre el cateto adyacente.`,
  };
  RAZONES.forEach((r, i) => {
    estados.push([...datos, ...RAZONES.slice(0, i + 1).flatMap(fila)]);
    marca[`sig_${r}`] = trans.length;
    trans.push({
      fusiones: [],
      brotes: ids(r).map((hacia) => ({ desde: "Dt", hacia })),
      texto: `${significado[r]} La escribimos así: ${reglaRazon(r)}.`,
      porque:
        r === "tan"
          ? `Ya están las tres razones. Se recuerdan con la sigla SOH, CAH, TOA: SOH es seno (S) igual a opuesto (O) sobre hipotenusa (H); CAH es coseno (C) igual a adyacente (A) sobre hipotenusa (H); TOA es tangente (T) igual a opuesto (O) sobre adyacente (A).`
          : `Es una razón: un lado entre otro. No depende del tamaño del triángulo, solo del ángulo.`,
      regla: reglaRazon(r),
    });
  });

  // ----- 2) elegir la razon
  marca.elegir = trans.length;
  estados.push(estados[estados.length - 1]);
  trans.push({
    fusiones: [],
    resaltar: ["Dk", "Du", `${rz}n`, `${rz}d`],
    texto: `Tenemos ${LADO_ART[K]} y buscamos ${LADO_ART[U]}. La razón que usa justo esos dos lados es ${RAZON_ART[rz]}: ${reglaRazon(rz)}.`,
    porque: `Elegimos la razón que contiene el lado que conocemos y el que buscamos. Así en la ecuación queda una sola incógnita.`,
    regla: reglaRazon(rz),
  });
  const otras = RAZONES.filter((r) => r !== rz);
  marca.otras = trans.length;
  const filaElegida = fila(rz);
  estados.push([...datos, ...filaElegida]);
  trans.push({
    fusiones: otras.map((r) => ({ desde: ids(r), hacia: null })),
    texto: `Las otras dos razones usan un lado que no nos interesa, así que las dejamos de lado. Trabajamos con ${RAZON_ART[rz]}.`,
    porque: `Esas razones usan ${LADO_ART[LADOS.find((l) => l !== K && l !== U)!]}, que ni conocemos ni buscamos: con él en la ecuación tendríamos dos incógnitas y no podríamos despejar.`,
  });

  // ----- 3) reemplazar UNA letra por vez
  const eqF: Ficha = { id: `${rz}e`, tex: "=", op: true };
  const RC = `${rz}q`;
  const idN = `${rz}n`;
  const idD = `${rz}d`;
  const Lv: Ficha = { id: "Lv", tex: angTex, pegado: true };
  const fraccion = (n: Ficha[], d: Ficha[]) => frPiezas(RC, n, d);
  const letraN: Ficha = { id: idN, tex: letras(def.n) };
  const letraD: Ficha = { id: idD, tex: letras(def.d) };
  const etiqueta: Ficha = { id: `${rz}f`, tex: razTex, salto: true };

  const ecu0: Ficha[] = [etiqueta, Lv, eqF, fraccion([letraN], [letraD])];
  estados.push([...datos, ...ecu0]);
  trans.push({
    fusiones: [{ desde: [`${rz}t`], hacia: "Lv", modo: "viajar" }],
    brotes: [{ desde: "Dt", hacia: "Lv" }],
    texto: `Reemplazamos $\\theta$ por $${angTex}$: el valor del ángulo sale de los datos y ocupa el lugar de la letra. La $\\theta$ aparece una sola vez.`,
    porque: `$\\theta$ es solo la letra que representa al ángulo. En este ejercicio el ángulo vale $${angTex}$.`,
  });

  // ----- valor notable (sen 30 = 1/2): primero el triangulo conocido con sus lados rotulados, luego la fila de la tabla
  const lado0 = (f: Ficha): Ficha => ({ ...f, salto: true });
  const lado = lado0;
  const sinSalto = (f: Ficha): Ficha => ({ ...f, salto: undefined });
  const dot = (id: string): Ficha => ({ id, tex: "\\cdot", op: true });
  const Tro: Ficha = { id: "Tro", tex: `${letras(def.n)}=1`, salto: true };
  const Trd: Ficha = { id: "Trd", tex: `${letras(def.d)}=${q}` };
  const textoTriangulo: Record<Razon, string> = {
    sen: `Para el ángulo de $${angTex}$ usamos un triángulo que se conoce bien: la mitad de un triángulo equilátero de lado $2$. En él, el cateto opuesto a $${angTex}$ mide $1$ y la hipotenusa mide $2$. Anotamos esos dos lados.`,
    cos: `Para el ángulo de $${angTex}$ usamos un triángulo que se conoce bien: la mitad de un triángulo equilátero de lado $2$. En él, el cateto adyacente a $${angTex}$ mide $1$ y la hipotenusa mide $2$. Anotamos esos dos lados.`,
    tan: `Para el ángulo de $${angTex}$ usamos un triángulo rectángulo con otro ángulo de $${angTex}$: sus dos catetos miden lo mismo, por ejemplo $1$ y $1$. Anotamos esos dos lados.`,
  };
  const porqueTriangulo: Record<Razon, string> = {
    sen: `Un triángulo equilátero tiene sus tres ángulos de $60^\\circ$. Al cortarlo por la mitad queda un triángulo rectángulo con ángulos de $30^\\circ$, $60^\\circ$ y $90^\\circ$, y su lado más corto, enfrente de los $30^\\circ$, es la mitad del lado: $1$.`,
    cos: `Un triángulo equilátero tiene sus tres ángulos de $60^\\circ$. Al cortarlo por la mitad queda un triángulo rectángulo con ángulos de $30^\\circ$, $60^\\circ$ y $90^\\circ$, y el lado que toca al ángulo de $60^\\circ$ es la mitad del lado: $1$.`,
    tan: `Si un triángulo rectángulo tiene un ángulo de $45^\\circ$, el otro ángulo también mide $45^\\circ$ y los dos catetos son iguales.`,
  };
  estados.push([...datos, ...ecu0, Tro, Trd]);
  trans.push({
    fusiones: [],
    brotes: [
      { desde: "Dt", hacia: "Tro" },
      { desde: "Dt", hacia: "Trd" },
    ],
    texto: `${textoTriangulo[rz]} Este es un triángulo de referencia, dibujado con líneas punteadas: no es el triángulo de tu ejercicio, y sus medidas no cambian los datos de arriba.`,
    porque: porqueTriangulo[rz],
  });

  // la fila de la tabla: se queda a la vista hasta el final (la comprobacion la vuelve a usar)
  const introTabla = `Con esos dos lados armamos una fila de la tabla de valores notables: una lista corta con el seno, el coseno y la tangente de $30^\\circ$, $45^\\circ$ y $60^\\circ$.`;
  const Rv: Ficha = q === 1 ? { id: "Rv", tex: "1" } : frPiezas("Rv", [{ id: "Rvn", tex: "1" }], [{ id: "Rvd", tex: `${q}` }]);
  const ref: Ficha[] = [{ id: "Rl", tex: `\\text{Tabla: }${razTex}\\,${angTex}`, salto: true }, { id: "Re", tex: "=", op: true }, Rv];
  estados.push([...datos, ...ecu0, ...ref]);
  trans.push({
    fusiones: [{ desde: ["Tro", "Trd"], hacia: "Rv" }],
    brotes: [{ desde: `${rz}f`, hacia: "Rl" }],
    texto:
      q === 1
        ? `${introTabla} La tangente es el cateto opuesto entre el adyacente: $\\dfrac{1}{1}=1$. Así queda la fila de la tabla de valores notables: la tangente de $${angTex}$ vale $1$. Los valores de esa tabla suelen aprenderse de memoria; aquí los armamos con el triángulo.`
        : `${introTabla} ${cap(RAZON_ART[rz])} es $\\dfrac{${letras(def.n)}}{${letras(def.d)}}=\\dfrac{1}{${q}}$. Así queda la fila de la tabla de valores notables: ${RAZON_ART[rz]} de $${angTex}$ vale $\\dfrac{1}{${q}}$. Los valores de esa tabla suelen aprenderse de memoria; aquí los armamos con el triángulo.`,
    porque: q === 1 ? `Esos valores se usan tanto que conviene tenerlos a mano. Un número entre sí mismo da $1$. La fila se queda a la vista: la vamos a usar otra vez al final.` : `Esos valores se usan tanto que conviene tenerlos a mano. La razón no depende del tamaño del triángulo, solo del ángulo, y este triángulo da siempre la misma. La fila se queda a la vista: la vamos a usar otra vez al final.`,
    regla: q === 1 ? `$\\text{tan}\\,45^\\circ=1$` : `$${razTex}\\,${angTex}=\\dfrac{1}{2}$`,
  });

  // el valor de la tabla viaja a la ecuacion, en lugar de "sen 30°"
  const Vn: Ficha = { id: "Vn", tex: "1" };
  const Vd: Ficha = { id: "Vd", tex: `${q}` };
  const Vcont = (): Ficha => (q === 1 ? { id: "V", tex: "1" } : frPiezas("V", [Vn], [Vd]));
  const E = (...fs: Ficha[]): Ficha[] => [...datos, ...fs, ...ref];
  estados.push(E(lado0(Vcont()), eqF, fraccion([letraN], [letraD])));
  trans.push({
    fusiones: [{ desde: [`${rz}f`, "Lv"], hacia: "V", modo: "viajar" }],
    brotes: [{ desde: "Rv", hacia: "V" }],
    texto: `Escribimos en la ecuación el valor de la tabla, ${q === 1 ? "$1$" : `$\\dfrac{1}{${q}}$`}, en lugar de $${razTex}\\,${angTex}$.`,
    porque: `Son lo mismo: la tabla dice que ${RAZON_ART[rz]} de $${angTex}$ vale ${q === 1 ? "$1$" : `$\\dfrac{1}{${q}}$`}.`,
    regla: q === 1 ? `$\\text{tan}\\,45^\\circ=1$` : `$${razTex}\\,${angTex}=\\dfrac{1}{2}$`,
  });

  // reemplazar la letra del lado que conocemos y luego la de la incognita
  const piezaK: Ficha = { id: "K", tex: par(valor) };
  const piezaX: Ficha = { id: "X", tex: "x" };
  const idLetraK = incognitaArriba ? idD : idN;
  const idLetraU = incognitaArriba ? idN : idD;
  const nArr = (n: Ficha, d: Ficha) => fraccion([n], [d]);
  {
    const n1 = incognitaArriba ? letraN : piezaK;
    const d1 = incognitaArriba ? piezaK : letraD;
    estados.push(E(lado0(Vcont()), eqF, nArr(n1, d1)));
    trans.push({
      fusiones: [{ desde: [idLetraK], hacia: "K", modo: "viajar" }],
      brotes: [{ desde: "Dk", hacia: "K" }],
      texto: `Reemplazamos $${letras(K)}$ por $${valor}$: el valor sale de los datos y ocupa el lugar de la letra. Aparece una sola vez.`,
      porque: `${cap(LADO_ART[K])} es el lado que conocemos: mide $${valor}$.`,
    });
    estados.push(E(lado0(Vcont()), eqF, nArr(incognitaArriba ? piezaX : piezaK, incognitaArriba ? piezaK : piezaX)));
    trans.push({
      fusiones: [{ desde: [idLetraU], hacia: "X", modo: "viajar" }],
      brotes: [{ desde: "Du", hacia: "X" }],
      texto: `Reemplazamos $${letras(U)}$ por $x$: en los datos ${LADO_ART[U]} ya se llama $x$, así que solo cambia el nombre, su medida todavía no la conocemos. Ya no quedan letras de la razón: solo el $x$ que queremos despejar.`,
      porque: `${cap(LADO_ART[U])} es ${desconocido(U)}, así que ${U === "hip" ? "la" : "lo"} llamamos $x$.`,
    });
  }

  // ----- 4) despejar x ARRASTRANDO piezas (cada una conserva su id)
  const eqId = eqF.id;
  let rid: string;
  const Xl = (): Ficha => lado({ id: "X", tex: "x" });
  const Kp = (): Ficha => ({ id: "K", tex: par(valor) });

  if (incognitaArriba) {
    // V = x / K  ->  x / K = V (se lee al reves)  ->  x = K · V (el K viaja con su id)
    estados.push(E(lado0(fraccion([piezaX], [piezaK])), eqF, sinSalto(Vcont())));
    trans.push({
      fusiones: [],
      resaltar: [RC, "V"],
      texto: `La $x$ tiene que quedar sola, y ahora está del lado derecho. La igualdad se puede leer al revés: lo de la izquierda pasa a la derecha y lo de la derecha a la izquierda. Queda $\\dfrac{x}{${valor}}=${q === 1 ? "1" : `\\dfrac{1}{${q}}`}$.`,
      porque: `Si dos cosas son iguales, da lo mismo en qué orden las escribas.`,
      regla: `$a=b\\ \\Leftrightarrow\\ b=a$`,
    });
    estados.push(E(Xl(), eqF, Kp(), dot("Dot"), sinSalto(Vcont())));
    trans.push({
      fusiones: [{ desde: [RC], hacia: null, modo: "viajar" }],
      brotes: [{ desde: RC, hacia: "Dot" }],
      texto: `Queremos dejar $x$ sola. El $${valor}$ divide a $x$: pasa al otro lado multiplicando y viaja hasta el lado derecho. Ahora $x=${valor}\\cdot ${q === 1 ? "1" : `\\dfrac{1}{${q}}`}$.`,
      porque: `Un número que está abajo, como divisor, pasa multiplicando. Es lo mismo que multiplicar los dos lados por $${valor}$: del lado de $x$ se cancela con la división y del otro lado queda escrito.`,
      regla: `$c=\\dfrac{a}{b}\\ \\Rightarrow\\ a=b\\cdot c$`,
    });
    if (q === 1) {
      estados.push(E(Xl(), eqF, { id: "r", tex: `${res}` }));
      trans.push({
        fusiones: [{ desde: ["K", "Dot", "V"], hacia: "r" }],
        texto: `Multiplicamos: $${valor}\\cdot 1=${res}$. Entonces $x=${res}$.`,
        porque: `Multiplicar por $1$ no cambia el número.`,
        regla: `$n\\cdot 1=n$`,
      });
      rid = "r";
    } else {
      // el K y su punto viajan al numerador de la fraccion (mismos ids)
      const Nn: Ficha = { id: "Nn", tex: par(valor) };
      estados.push(E(Xl(), eqF, frPiezas("V", [Nn], [Vd])));
      trans.push({
        fusiones: [{ desde: ["K", "Dot", "Vn"], hacia: "Nn" }],
        texto: `El $${valor}$ multiplica al $1$ de arriba de la fracción: $${valor}\\cdot 1=${valor}$. El denominador $${q}$ se queda quieto: queda $\\dfrac{${valor}}{${q}}$.`,
        porque: `Un número por una fracción es el número por el numerador, sobre el mismo denominador. Y multiplicar por $1$ no cambia el número.`,
        regla: `$a\\cdot\\dfrac{b}{c}=\\dfrac{a\\cdot b}{c}$`,
      });
      estados.push(E(Xl(), eqF, { id: "r", tex: `${res}` }));
      trans.push({
        fusiones: [{ desde: ["V"], hacia: "r" }],
        texto: `Dividimos: $\\dfrac{${valor}}{${q}}=${res}$. Entonces $x=${res}$.`,
        porque: `Una fracción es una división: el numerador entre el denominador.`,
        regla: `$\\dfrac{a}{b}=a:b$`,
      });
      rid = "r";
    }
  } else if (q === 2) {
    // 1/2 = K / x  ->  1/2 · x = K (la x viaja)  ->  1 · x = 2 · K (el 2 viaja)  ->  x = r
    estados.push(E(lado0(Vcont()), dot("DotA"), { id: "X", tex: "x" }, eqF, Kp()));
    trans.push({
      fusiones: [{ desde: [RC], hacia: null, modo: "viajar" }],
      brotes: [{ desde: RC, hacia: "DotA" }],
      texto: `La $x$ está abajo, dividiendo al $${valor}$. Pasa al otro lado multiplicando y viaja hasta la izquierda, junto a $\\dfrac{1}{${q}}$. Queda $\\dfrac{1}{${q}}\\cdot x=${valor}$.`,
      porque: `Un número que está abajo, como divisor, pasa multiplicando. Es lo mismo que multiplicar los dos lados por $x$: del lado derecho se cancela con la división y del izquierdo queda escrito.`,
      regla: `$b=\\dfrac{a}{x}\\ \\Rightarrow\\ b\\cdot x=a$`,
    });
    estados.push(E(lado0({ id: "Vn", tex: "1" }), dot("DotA"), { id: "X", tex: "x" }, eqF, { id: "Vd", tex: `${q}` }, dot("DotB"), Kp()));
    trans.push({
      fusiones: [{ desde: ["V"], hacia: null, modo: "viajar" }],
      brotes: [{ desde: "V", hacia: "DotB" }],
      texto: `Ahora el $${q}$ divide al $1$: pasa al otro lado multiplicando y viaja hasta la derecha, junto al $${valor}$. Queda $1\\cdot x=${q}\\cdot ${valor}$.`,
      porque: `Igual que antes: un número que está abajo pasa multiplicando. Es lo mismo que multiplicar los dos lados por $${q}$.`,
      regla: `$\\dfrac{a}{b}\\cdot x=c\\ \\Rightarrow\\ a\\cdot x=b\\cdot c$`,
    });
    estados.push(E(Xl(), eqF, { id: "Vd", tex: `${q}` }, dot("DotB"), Kp()));
    trans.push({
      fusiones: [{ desde: ["Vn", "DotA"], hacia: null, ancla: "X" }],
      texto: `Del lado izquierdo, $1\\cdot x=x$: el $1$ y su punto se unen a la $x$, que queda igual.`,
      porque: `Multiplicar por $1$ no cambia nada.`,
      regla: `$1\\cdot a=a$`,
    });
    estados.push(E(Xl(), eqF, { id: "r", tex: `${res}` }));
    trans.push({
      fusiones: [{ desde: ["Vd", "DotB", "K"], hacia: "r" }],
      texto: `Del lado derecho multiplicamos: $${q}\\cdot ${valor}=${res}$. Entonces $x=${res}$.`,
      porque: `Ya no queda nada por despejar: $x$ está sola y el otro lado es un número.`,
      regla: `$m\\cdot n=p$`,
    });
    rid = "r";
  } else {
    // tan 45 = K / x  ->  1 · x = K (la x viaja)  ->  x = K
    estados.push(E(lado0(Vcont()), dot("DotA"), { id: "X", tex: "x" }, eqF, Kp()));
    trans.push({
      fusiones: [{ desde: [RC], hacia: null, modo: "viajar" }],
      brotes: [{ desde: RC, hacia: "DotA" }],
      texto: `La $x$ está abajo, dividiendo al $${valor}$. Pasa al otro lado multiplicando y viaja hasta la izquierda, junto al $1$. Queda $1\\cdot x=${valor}$.`,
      porque: `Un número que está abajo, como divisor, pasa multiplicando. Es lo mismo que multiplicar los dos lados por $x$.`,
      regla: `$b=\\dfrac{a}{x}\\ \\Rightarrow\\ b\\cdot x=a$`,
    });
    estados.push(E(Xl(), eqF, Kp()));
    trans.push({
      fusiones: [{ desde: ["V", "DotA"], hacia: null, ancla: "X" }],
      texto: `Del lado izquierdo, $1\\cdot x=x$. Entonces $x=${valor}$.`,
      porque: `Multiplicar por $1$ no cambia nada. Los dos catetos miden lo mismo, como esperábamos.`,
      regla: `$1\\cdot a=a$`,
    });
    rid = "K";
  }

  // ----- 5) comprobacion contra la razon ORIGINAL (la fila de la tabla sigue a la vista)
  const numVal = incognitaArriba ? res : valor;
  const denVal = incognitaArriba ? valor : res;
  const numId = incognitaArriba ? rid : "Dk";
  const denId = incognitaArriba ? "Dk" : rid;
  const ultimo = estados[estados.length - 1];
  const CS: Ficha = { id: "CS", tex: "\\text{Comprobación:}", salto: true };
  const Cv = (): Ficha => (q === 1 ? { id: "Cv", tex: "1" } : frPiezas("Cv", [{ id: "Cvn", tex: "1" }], [{ id: "Cvd", tex: `${q}` }]));
  const Cq = (): Ficha => fr("Cq", `${numVal}`, `${denVal}`);
  const CE: Ficha = { id: "CE", tex: "=", op: true };
  estados.push([...ultimo, CS, Cv(), CE, Cq()]);
  trans.push({
    fusiones: [],
    brotes: [
      { desde: eqId, hacia: "CS" },
      { desde: "Rv", hacia: "Cv" },
      { desde: eqId, hacia: "CE" },
      { desde: numId, hacia: "Cq.n" },
      { desde: denId, hacia: "Cq.d" },
    ],
    texto: `Comprobamos: según la tabla, ${RAZON_ART[rz]} de $${angTex}$ vale ${q === 1 ? "$1$" : `$\\dfrac{1}{${q}}$`}. Los lados que tenemos ahora, ${LADO_ART[def.n]} entre ${LADO_ART[def.d]}, tienen que dar lo mismo: $\\dfrac{${numVal}}{${denVal}}$.`,
    porque: `Si el lado está bien calculado, la razón de los lados es el valor notable del ángulo.`,
    regla: reglaRazon(rz),
  });
  if (q === 1) {
    const C1: Ficha = { id: "C1", tex: "1" };
    estados.push([...ultimo, CS, Cv(), CE, C1]);
    trans.push({
      fusiones: [{ desde: ["Cq"], hacia: "C1" }],
      texto: `Los dos lados miden $${numVal}$: $\\dfrac{${numVal}}{${denVal}}=1$.`,
      porque: `Un número entre sí mismo da $1$.`,
      regla: `$\\dfrac{a}{a}=1\\quad (a\\neq 0)$`,
    });
    estados.push([...ultimo, CS, { id: "ok", tex: `1=1\\ \\checkmark` }]);
    trans.push({
      fusiones: [{ desde: ["Cv", "CE", "C1"], hacia: "ok" }],
      texto: `Los dos miembros de la igualdad valen $1$: la igualdad se cumple. ${cap(LADO_ART[U])} mide $${res}$.`,
      porque: `La razón de los lados coincide con la tangente de $${angTex}$, así que el resultado es correcto.`,
    });
  } else {
    const CA1: Ficha = { id: "CA1", tex: "1" };
    const CAd = dot("CAd");
    const CA3: Ficha = { id: "CA3", tex: `${denVal}` };
    const CB1: Ficha = { id: "CB1", tex: `${q}` };
    const CBd = dot("CBd");
    const CB3: Ficha = { id: "CB3", tex: `${numVal}` };
    estados.push([...ultimo, CS, CA1, CAd, CA3, CE, CB1, CBd, CB3]);
    trans.push({
      fusiones: [{ desde: ["Cv", "Cq"], hacia: ["CA1", "CAd", "CA3", "CB1", "CBd", "CB3"], modo: "viajar" }],
      brotes: [
        { desde: "Cv", hacia: "CA1" },
        { desde: "Cv", hacia: "CAd" },
        { desde: "Cv", hacia: "CB1" },
        { desde: "Cv", hacia: "CBd" },
        { desde: "Cq", hacia: "CA3" },
        { desde: "Cq", hacia: "CB3" },
      ],
      texto: `Para ver si las dos fracciones son iguales, multiplicamos en cruz: $1\\cdot ${denVal}=${q}\\cdot ${numVal}$.`,
      porque: `Tenemos dos fracciones: $\\dfrac{1}{${q}}$ (la de la tabla) y $\\dfrac{${numVal}}{${denVal}}$ (la de los lados). Si el resultado es correcto, son iguales, como $\\dfrac{5}{10}=\\dfrac{1}{2}$. Dos fracciones son iguales si sus productos cruzados son iguales.`,
      regla: `$\\dfrac{a}{b}=\\dfrac{c}{d}\\ \\Leftrightarrow\\ a\\cdot d=b\\cdot c$`,
    });
    estados.push([...ultimo, CS, { id: "Cl", tex: `${denVal}` }, CE, { id: "Cr", tex: `${q * numVal}` }]);
    trans.push({
      fusiones: [
        { desde: ["CA1", "CAd", "CA3"], hacia: "Cl" },
        { desde: ["CB1", "CBd", "CB3"], hacia: "Cr" },
      ],
      texto: `Hacemos las dos cuentas: $1\\cdot ${denVal}=${denVal}$ y $${q}\\cdot ${numVal}=${q * numVal}$.`,
      porque: `Multiplicar por $1$ no cambia el número; la otra es una multiplicación común.`,
      regla: `$m\\cdot n=p$`,
    });
    estados.push([...ultimo, CS, { id: "ok", tex: `${denVal}=${denVal}\\ \\checkmark` }]);
    trans.push({
      fusiones: [{ desde: ["Cl", "CE", "Cr"], hacia: "ok" }],
      texto: `Los dos miembros de la igualdad valen $${denVal}$: la igualdad se cumple. ${cap(LADO_ART[U])} mide $${res}$.`,
      porque: `La razón de los lados coincide con ${RAZON_ART[rz]} de $${angTex}$, así que el resultado es correcto.`,
    });
  }

  // ----- 6) la respuesta viaja a la fila de datos: la x pasa a valer su medida
  const previo = estados[estados.length - 1];
  estados.push(previo.filter((f) => !["X", eqId, rid].includes(f.id)).map((f) => (f.id === "Du" ? { ...f, tex: `${letras(U)}=${res}` } : f)));
  trans.push({
    fusiones: [{ desde: ["X", eqId, rid], hacia: null, ancla: "Du" }],
    texto: `Anotamos la respuesta en los datos: la $x$ vale $${res}$, así que ${LADO_ART[U]} mide $${res}$.`,
    porque: `En los datos habíamos llamado $x$ ${A_LADO[U]}. Ya sabemos cuánto vale, y se anota donde estaba la incógnita.`,
  });

  // ----- la figura del triangulo: el mismo dibujo en todos los pasos, cambia el resaltado y los rotulos
  const iTheta = trans.findIndex((t) => t.brotes?.some((b) => b.hacia === "Lv"));
  const iNotIni = trans.findIndex((t) => t.brotes?.some((b) => b.hacia === "Tro"));
  const iNotFin = trans.findIndex((t) => t.brotes?.some((b) => b.hacia === "Rl"));
  const iK = trans.findIndex((t) => t.brotes?.some((b) => b.hacia === "K"));
  const iU = trans.findIndex((t) => t.brotes?.some((b) => b.hacia === "X"));
  const iRes = trans.findIndex((t) => t.brotes?.some((b) => b.hacia === "CS"));
  const iUltimo = trans.length - 1;
  trans.forEach((t, i) => {
    const rotulos: Partial<Record<Lado, string>> = {};
    let resaltados: Lado[] = [];
    let theta = "θ";
    if (i >= iTheta) theta = `${angulo}°`;
    if (i >= iNotIni && i <= iNotFin) {
      rotulos[def.n] = `${letras0(def.n)} = 1`;
      rotulos[def.d] = `${letras0(def.d)} = ${q}`;
      resaltados = [def.n, def.d];
    } else {
      LADOS.forEach((l) => (rotulos[l] = l));
      if (i >= marca.dato) rotulos[K] = `${K} = ${valor}`;
      if (i >= marca.dato) rotulos[U] = `${U} = ${i >= iRes ? res : "x"}`;
      const iSig = RAZONES.find((r) => i === marca[`sig_${r}`]);
      if (i === marca.op || i === marca.ady || i === marca.hip) resaltados = [LADOS.find((l) => marca[l] === i)!];
      else if (i === marca.dato || i === marca.elegir || i === marca.otras) resaltados = [K, U];
      else if (iSig) resaltados = [DEF[iSig].n, DEF[iSig].d];
      else if (i === iK) resaltados = [K];
      else if (i === iU) resaltados = [U];
      else if (i === iRes) resaltados = [def.n, def.d];
      else if (i === iUltimo) resaltados = [U];
    }
    t.figura = figuraTriangulo(angulo, theta, rotulos, resaltados, { referencia: i >= iNotIni && i <= iNotFin, thetaRes: i === marca.theta });
  });

  // Un `salto` es un corte de renglon de ALTO CERO: su texto, si lo tiene, cae encima del renglon siguiente («Tabla: sen 30°» pisada por
  // su «= 1/2», «sen» sin espacio antes de «op»). Cada ficha que abre renglon y lleva contenido se parte en un corte vacio (`<id>~s`) y la
  // ficha misma, sin salto, que queda como primera pieza de su renglon.
  // El id del corte es su numero de orden en el estado (no el de la ficha): si un renglon se reemplaza por otro, el corte sigue siendo el mismo y no "viaja".
  const conCorte = (fs: Ficha[]): Ficha[] => {
    let n = 0;
    return fs.flatMap((f) => (f.salto && (f.tex !== "" || f.frac) ? [{ id: `corte${n++}`, tex: "", salto: true }, { ...f, salto: undefined }] : [f]));
  };
  const estadosCorte = estados.map(conCorte);

  return {
    demo: {
      titulo: "",
      nota: "",
      intro: `Triángulo rectángulo con un ángulo de $${angTex}$. Conocemos ${LADO_ART[K]} ($${valor}$) y buscamos ${LADO_ART[U]}. Elegimos la razón trigonométrica que sirve y despejamos paso a paso.`,
      estados: estadosCorte,
      transiciones: trans,
      figura: figuraTriangulo(angulo, "θ", { op: "op", ady: "ady", hip: "hip" }, []),
    },
    resumen: { angulo, valor, q, resultado: res, razon: RAZONES.indexOf(rz), incognitaArriba: incognitaArriba ? 1 : 0 },
  };
}
