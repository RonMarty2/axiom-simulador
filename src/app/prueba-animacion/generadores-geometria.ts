// Generadores de Geometria (piloto): teorema de Pitagoras con el patron "ANOTAR Y REEMPLAZAR":
//   1. los datos del enunciado tal como vienen (numero y unidad) y que lado es cada uno (catetos / hipotenusa);
//   2. ETIQUETAR debajo de cada dato su letra (a, b, c), de a una y con su color: de ahi NACE la formula;
//   3. la FORMULA c^2 = a^2 + b^2 con letras debajo (nace de la incognita); si la incognita es un cateto se ORDENA
//      arrastrando piezas (a^2 pasa al otro lado y cambia de signo, despues se da vuelta la igualdad);
//   4. REEMPLAZAR una letra por vez: el numero vuela desde el dato a su lugar (la unidad se deja para el final);
//   5. CALCULAR una operacion por paso: cada cuadrado se abre (3^2 = 3.3) y se multiplica; despues la suma o la resta;
//   6. la RAIZ por su significado: x^2 = x.x, "que numero multiplicado por si mismo da 25?", se tantea, se encuentra, y
//      recien ahi se escribe que eso es la raiz cuadrada;
//   7. COMPROBAR con los tres lados: a^2 + b^2 = c^2 con los numeros (el resultado contra los datos del enunciado).
// Los datos quedan arriba hasta el final: son la fila de referencia de la que nacen la formula, los numeros y la comprobacion.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas en LaTeX sin $. Barras dobles.
// La animacion no calcula: cada numero que se escribe sale de una cuenta hecha aqui y comprobada en el test.
// Limite: lados enteros de 1 a 100 (terna pitagorica exacta). Sin figura SVG: el motor solo pinta fichas de texto.
import { aplanar, sustituir, type Brote, type Ficha, type Transicion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

export type TipoPitagoras = "hipotenusa" | "cateto";

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

// ---------------------------------------------------------------------------
// Limites y validacion

const MAX = 100;

/** raiz entera exacta de n, o null si n no es un cuadrado perfecto */
function raizEntera(n: number): number | null {
  if (n < 1) return null;
  const r = Math.round(Math.sqrt(n));
  return r * r === n ? r : null;
}

/**
 * hipotenusa: `x` e `y` son los dos catetos y se busca la hipotenusa.
 * cateto: `x` es la hipotenusa, `y` el cateto que se conoce, y se busca el otro cateto.
 */
export function validarPitagoras(tipo: TipoPitagoras, x: number, y: number): string | null {
  if (tipo !== "hipotenusa" && tipo !== "cateto") return "Elige si buscas la hipotenusa o un cateto.";
  if (!Number.isInteger(x) || !Number.isInteger(y)) return "Escribe números enteros.";
  if (x < 1 || y < 1) return "Los lados deben ser mayores que 0.";
  if (tipo === "hipotenusa") {
    const c = raizEntera(x * x + y * y);
    if (c === null) return "Con esos catetos la hipotenusa no da un número entero. Prueba con 3 y 4, 5 y 12, 8 y 15 o 20 y 21.";
    if (c > MAX) return `Los lados deben ser de ${MAX} o menos. Baja los catetos.`;
    return null;
  }
  if (y >= x) return "La hipotenusa es el lado más largo: debe ser mayor que el cateto.";
  if (x > MAX) return `Los lados deben ser de ${MAX} o menos. Baja la hipotenusa.`;
  if (raizEntera(x * x - y * y) === null) return "Con esa hipotenusa y ese cateto el otro cateto no da un número entero. Prueba con 5 y 3, 13 y 5, 17 y 8 o 25 y 7.";
  return null;
}

// ---------------------------------------------------------------------------
// Roles y colores (fijos en todo el ejercicio; se ven en tema claro y oscuro)

type Rol = "a" | "b" | "c";
const COLOR: Record<Rol, string> = { a: "#2563eb", b: "#16a34a", c: "#ea580c" };
const col = (r: Rol, tex: string) => `\\textcolor{${COLOR[r]}}{${tex}}`;
const CM = "\\text{cm}";
const CHECK = "\\textcolor{#16a34a}{\\checkmark}";

/** cantidad con su unidad para un texto: 3 cm */
const cant = (x: number) => `${x}\\ ${CM}`;

/** teorema de Pitagoras animado: la hipotenusa (x, y = catetos) o un cateto (x = hipotenusa, y = cateto conocido) */
export function pitagoras(tipo: TipoPitagoras, x: number, y: number, enunciado?: string): Resultado {
  const esHip = tipo === "hipotenusa";
  const a = esHip ? x : y;
  const c = esHip ? Math.round(Math.sqrt(x * x + y * y)) : x;
  const b = esHip ? y : Math.round(Math.sqrt(x * x - y * y));
  const val: Record<Rol, number> = { a, b, c };
  const incog: Rol = esHip ? "c" : "b";
  const dados: Rol[] = esHip ? ["a", "b"] : ["c", "a"];
  const r = val[incog]; // la raiz que se busca
  const NOM: Record<Rol, string> = esHip
    ? { a: "un cateto", b: "el otro cateto", c: "la hipotenusa" }
    : { a: "el cateto que conocemos", b: "el cateto que buscamos", c: "la hipotenusa" };

  // --- fila de datos: numero y unidad son piezas distintas; la incognita es un "?" ---
  const datos: Ficha[] = [];
  dados.forEach((k, i) => {
    datos.push({ id: `D${k}`, tex: String(val[k]) }, { id: `D${k}u`, tex: CM });
    datos.push({ id: `Ds${i}`, tex: ",", op: true, pegado: true });
  });
  datos.push({ id: "Dq", tex: "?" });
  const h = new Hoja(datos);

  const intro =
    enunciado ??
    (esHip
      ? `Un triángulo rectángulo tiene catetos de $${cant(a)}$ y $${cant(b)}$. ¿Cuánto mide la hipotenusa? Vamos a escribir cada paso, como a lápiz.`
      : `Un triángulo rectángulo tiene hipotenusa de $${cant(c)}$ y un cateto de $${cant(a)}$. ¿Cuánto mide el otro cateto? Vamos a escribir cada paso, como a lápiz.`);

  // 1) datos tal como vienen y por que Pitagoras
  h.paso({
    fusiones: [],
    resaltar: [...dados.map((k) => `D${k}`), "Dq"],
    texto: esHip
      ? `Anotamos los datos: los catetos miden $${cant(a)}$ y $${cant(b)}$, y piden la hipotenusa. Los catetos son los dos lados que forman el ángulo recto; la hipotenusa es el lado de enfrente, el más largo.`
      : `Anotamos los datos: la hipotenusa mide $${cant(c)}$ y un cateto mide $${cant(a)}$; piden el otro cateto. La hipotenusa es el lado de enfrente del ángulo recto, el más largo; los catetos son los otros dos.`,
    porque: `Como el triángulo es rectángulo, sus tres lados cumplen siempre la misma relación (teorema de Pitágoras). Por eso, con dos lados se encuentra el tercero.`,
    regla: `$\\text{triángulo rectángulo}\\ \\Rightarrow\\ c^{2}=a^{2}+b^{2}$`,
  });

  // 2) etiquetar, de a uno: cada dato recibe su letra y su color
  for (const k of dados) {
    h.poner(`D${k}`, { tex: col(k, String(val[k])), debajo: col(k, k) });
    h.paso({
      fusiones: [],
      resaltar: [`D${k}`],
      texto: `$${cant(val[k])}$ es ${NOM[k]}. La llamamos $${k}$.`,
      porque: k === "c" ? `La hipotenusa siempre se llama $c$: es el lado opuesto al ángulo recto.` : `Cada dato se anota con su letra y su color, para seguirlo hasta la fórmula.`,
      regla: `$${k}=${cant(val[k])}$`,
    });
  }
  h.poner("Dq", { tex: col(incog, "?"), debajo: col(incog, incog) });
  h.paso({
    fusiones: [],
    resaltar: ["Dq"],
    texto: `Lo que piden es ${NOM[incog]}. Lo llamamos $${incog}$.`,
    porque: `La incógnita también lleva su letra y su color: es el lado que vamos a encontrar.`,
    regla: `$${incog}=\\ ?$`,
  });

  // 3) la formula nace de la incognita, con letras
  const formula: Ficha[] = [
    { id: "S", tex: "", salto: true },
    { id: "Fc", tex: col("c", "c") },
    { id: "Fc2", tex: "2", sup: true },
    { id: "Fe", tex: "=", op: true },
    { id: "Fa", tex: col("a", "a") },
    { id: "Fa2", tex: "2", sup: true },
    { id: "Fp", tex: "+", op: true },
    { id: "Fb", tex: col("b", "b") },
    { id: "Fb2", tex: "2", sup: true },
  ];
  h.agregar(formula);
  h.paso({
    fusiones: [],
    brotes: formula.filter((f) => !f.op).map((f) => ({ desde: "Dq", hacia: f.id })),
    texto: esHip
      ? `Escribimos debajo el teorema de Pitágoras, todavía con letras. Cada letra tiene el color de su dato. La incógnita $c^{2}$ ya está sola a la izquierda: no hay que ordenar nada.`
      : `Escribimos debajo el teorema de Pitágoras, todavía con letras. Cada letra tiene el color de su dato. Ojo: la incógnita $b^{2}$ está a la derecha; antes de reemplazar hay que ordenarla.`,
    porque: `El cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos.`,
    regla: `$c^{2}=a^{2}+b^{2}$`,
  });

  // 3b) ordenar cuando se busca un cateto: a^2 pasa al otro lado (viaja y cambia de signo) y se da vuelta la igualdad
  const prefijo = h.fichas.slice(0, h.fichas.length - formula.length).map((f) => f.id);
  if (!esHip) {
    h.poner("Fp", { tex: "-" });
    h.ordenar([...prefijo, "S", "Fc", "Fc2", "Fp", "Fa", "Fa2", "Fe", "Fb", "Fb2"]);
    h.paso({
      fusiones: [],
      resaltar: ["Fa", "Fa2", "Fp"],
      texto: `Queremos $b^{2}$ solo. El $a^{2}$ pasa al otro lado: viaja con su exponente y cambia de signo, de $+$ a $-$.`,
      porque: `Pasar un sumando al otro lado es lo mismo que restarlo en los dos lados: $c^{2}-a^{2}=a^{2}+b^{2}-a^{2}=b^{2}$.`,
      regla: `$x+y=z\\ \\Rightarrow\\ x=z-y$`,
    });
    h.ordenar([...prefijo, "S", "Fb", "Fb2", "Fe", "Fc", "Fc2", "Fp", "Fa", "Fa2"]);
    h.paso({
      fusiones: [],
      resaltar: ["Fb", "Fb2", "Fe"],
      texto: `Damos vuelta la igualdad para tener $b^{2}$ a la izquierda: $b^{2}=c^{2}-a^{2}$.`,
      porque: `Si dos cosas son iguales, no importa de qué lado se escriba cada una.`,
      regla: `$A=B\\ \\Rightarrow\\ B=A$`,
    });
  }

  // 4) reemplazar una letra por vez, en el orden en que aparecen en la formula
  const orden: Rol[] = esHip ? ["a", "b"] : ["c", "a"];
  const cuadrados = orden.map((k) => val[k]);
  for (const k of orden) {
    h.cambiar([`F${k}`], [{ id: `N${k}`, tex: col(k, String(val[k])) }]);
    h.paso({
      fusiones: [{ desde: [`F${k}`], hacia: `N${k}`, modo: "viajar" }],
      brotes: [{ desde: `D${k}`, hacia: `N${k}` }] as Brote[],
      texto: `Reemplazamos $${k}$ por $${val[k]}$: el número sale del dato, con su color, y ocupa el lugar de la letra. La $${k}$ aparece una sola vez en la fórmula. La unidad la dejamos para el final.`,
      porque: `Se reemplaza una letra por vez para no perder ningún dato.`,
      regla: `$${k}=${cant(val[k])}$`,
    });
  }

  // Cuadrado de un numero de dos cifras "a lapiz" (33·33 no se da de un golpe): se parte en decenas y unidades,
  // una parte por paso, y se suman. `desde` son las tres piezas n · n; el resultado queda en la pieza `pid`.
  const grande = (n: number) => n >= 11 && n % 10 !== 0;
  // `menos`: el cuadrado va despues de un signo menos (c² − a²): la suma parcial lleva parentesis mientras dure,
  // porque 10000 − 20·28 + 8·28 NO vale lo mismo que 10000 − (20·28 + 8·28)
  const cuadradoLapiz = (desde: string[], pid: string, n: number, menos = false) => {
    const u = n % 10;
    const T = n - u;
    const p1 = T * n;
    const p2 = u * n;
    const par = (s: string) => (menos ? `\\left(${s}\\right)` : s);
    const paso2 = (actual: string[], nid: string, tex: string, texto: string, porque: string, regla: string, descompone?: boolean) => {
      h.cambiar(actual, [{ id: nid, tex }]);
      h.paso({ fusiones: [{ desde: actual, hacia: nid }], descompone, texto, porque, regla });
      return [nid];
    };
    let ids = paso2(
      desde,
      `${pid}a`,
      par(`${T}\\cdot ${n}+${u}\\cdot ${n}`),
      `Multiplicamos $${n}\\cdot ${n}$, una cuenta con números de dos cifras. Partimos $${n}$ en $${T}+${u}$ y multiplicamos cada parte por $${n}$.${menos ? " Como este cuadrado se resta, lo dejamos entre paréntesis hasta tener el resultado." : ""}`,
      `Multiplicar una suma por un número es multiplicar cada parte y sumar los resultados.`,
      `$(a+b)\\cdot c=a\\cdot c+b\\cdot c$`,
      true
    );
    ids = paso2(ids, `${pid}b`, par(`${p1}+${u}\\cdot ${n}`), `Primera parte: $${T}\\cdot ${n}=${p1}$.`, `Una operación por vez: primero la parte de las decenas.`, `$m\\cdot n=p$`);
    ids = paso2(ids, `${pid}c`, par(`${p1}+${p2}`), `Segunda parte: $${u}\\cdot ${n}=${p2}$.`, `Ahora la parte de las unidades.`, `$m\\cdot n=p$`);
    paso2(ids, pid, String(n * n), `Sumamos las dos partes: $${p1}+${p2}=${n * n}$. Entonces $${n}^{2}=${n * n}$.`, `Al final se suman los resultados de las dos partes.`, `$a+b=c$`);
  };

  // 5) calcular una operacion por paso: cada cuadrado se abre y se multiplica
  for (const k of orden) {
    const n = val[k];
    h.cambiar([`N${k}`, `F${k}2`], [{ id: `${k}1`, tex: col(k, String(n)) }, { id: `${k}x`, tex: "\\cdot", op: true }, { id: `${k}2`, tex: col(k, String(n)) }]);
    h.paso({
      fusiones: [{ desde: [`N${k}`, `F${k}2`], hacia: [`${k}1`, `${k}x`, `${k}2`] }],
      descompone: true,
      texto: `Calculamos $${n}^{2}$. El exponente $2$ dice que el $${n}$ se multiplica por sí mismo: $${n}^{2}=${n}\\cdot ${n}$.`,
      porque: `Elevar al cuadrado es multiplicar un número por sí mismo, dos factores iguales.`,
      regla: `$n^{2}=n\\cdot n$`,
    });
    if (grande(n)) {
      cuadradoLapiz([`${k}1`, `${k}x`, `${k}2`], `P${k}`, n, !esHip && k === orden[1]);
      continue;
    }
    h.cambiar([`${k}1`, `${k}x`, `${k}2`], [{ id: `P${k}`, tex: String(n * n) }]);
    h.paso({
      fusiones: [{ desde: [`${k}1`, `${k}x`, `${k}2`], hacia: `P${k}` }],
      texto: `Multiplicamos: $${n}\\cdot ${n}=${n * n}$. Entonces $${n}^{2}=${n * n}$.`,
      porque: `Los dos factores son el mismo número, así que el resultado es su cuadrado.`,
      regla: `$n\\cdot n=n^{2}$`,
    });
  }
  const [k1, k2] = orden;
  const suma = esHip;
  const total = suma ? cuadrados[0] ** 2 + cuadrados[1] ** 2 : cuadrados[0] ** 2 - cuadrados[1] ** 2;
  h.cambiar([`P${k1}`, "Fp", `P${k2}`], [{ id: "Pres", tex: String(total) }]);
  h.paso({
    fusiones: [{ desde: [`P${k1}`, "Fp", `P${k2}`], hacia: "Pres" }],
    texto: suma
      ? `Sumamos los dos cuadrados: $${cuadrados[0] ** 2}+${cuadrados[1] ** 2}=${total}$. Queda $${incog}^{2}=${total}$.`
      : `Restamos: $${cuadrados[0] ** 2}-${cuadrados[1] ** 2}=${total}$. Queda $${incog}^{2}=${total}$.`,
    porque: suma ? `La fórmula pide sumar el cuadrado de los dos catetos.` : `Primero se resta y recién después se busca el lado: la fórmula dejó $b^{2}$ igual a esa resta.`,
    regla: suma ? `$a^{2}+b^{2}=c^{2}$` : `$c^{2}-a^{2}=b^{2}$`,
  });

  // 6) la raiz por su significado
  const uL = `F${incog}`;
  const uE = `F${incog}2`;
  h.cambiar([uL, uE], [{ id: "Q1", tex: col(incog, incog) }, { id: "Qx", tex: "\\cdot", op: true }, { id: "Q2", tex: col(incog, incog) }]);
  h.paso({
    fusiones: [{ desde: [uL, uE], hacia: ["Q1", "Qx", "Q2"] }],
    descompone: true,
    texto: `Tenemos $${incog}^{2}=${total}$, pero buscamos $${incog}$, no $${incog}^{2}$. El exponente $2$ dice que $${incog}^{2}=${incog}\\cdot ${incog}$. Entonces la pregunta es: ¿qué número, multiplicado por sí mismo, da $${total}$?`,
    porque: `Para encontrar el lado hay que deshacer el cuadrado. Un cuadrado es un número por sí mismo.`,
    regla: `$x^{2}=x\\cdot x$`,
  });
  // tanteo de la raiz. Raiz de una cifra o decena justa (r <= 10 o r multiplo de 10): un numero que se queda corto y el justo.
  // Raiz de dos cifras: primero entre que decenas esta, despues la ultima cifra (que cifras al cuadrado terminan igual
  // que el numero) y recien ahi se prueban los pocos candidatos: el alumno no tiene que adivinar 64 o 65.
  type Fila = { id: string; m: number; resultado: number; nota: string };
  const filas: Fila[] = [];
  const dec = Math.floor(r / 10) * 10;
  const porDecenas = r > 10 && r % 10 !== 0;
  const ultima = total % 10;
  const digitos = porDecenas ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => (d * d) % 10 === ultima) : [];
  const todosCand = digitos.map((d) => dec + d); // los que anuncia el texto
  const candidatos = todosCand.filter((m) => m <= r); // los que se prueban: se corta en el justo
  const lad = (ms: number[]) => ms.map((m) => `$${m}\\cdot ${m}=${m * m}$`).join(", ");
  const serie = (de: number, hasta: number, paso: number) => Array.from({ length: Math.max(0, Math.floor((hasta - de) / paso) + 1) }, (_, i) => de + i * paso);
  const nuevaFila = (m: number, nota: string, k: number): Ficha[] => [
    { id: `W${k}s`, tex: "", salto: true },
    { id: `W${k}a`, tex: String(m) },
    { id: `W${k}x`, tex: "\\cdot", op: true },
    { id: `W${k}b`, tex: String(m) },
    { id: `W${k}e`, tex: "=", op: true },
    { id: `W${k}v`, tex: String(m * m), debajo: nota },
  ];
  const idsFila = (k: number) => [`W${k}s`, `W${k}a`, `W${k}x`, `W${k}b`, `W${k}e`, `W${k}v`];
  let k = 0;
  const poner = (m: number, nota: string, desde: string) => {
    filas.push({ id: String(k), m, resultado: m * m, nota });
    h.agregar(nuevaFila(m, nota, k));
    const ids = idsFila(k);
    k++;
    return ids.map((hacia) => ({ desde, hacia }));
  };
  if (porDecenas) {
    const b1 = poner(dec, "\\text{corto}", "Q1");
    const b2 = poner(dec + 10, "\\text{se pasa}", "Q1");
    h.paso({
      fusiones: [],
      brotes: [...b1, ...b2],
      texto: `Probamos de diez en diez: ${lad(serie(10, dec, 10))}. ${dec === 10 ? "Da" : "Todos dan"} menos que $${total}$: nos quedamos cortos. Con $${dec + 10}\\cdot ${dec + 10}=${(dec + 10) ** 2}$ ya nos pasamos. Entonces el número está entre $${dec}$ y $${dec + 10}$.`,
      porque: `Si un número da menos y el siguiente da más, lo que buscamos está entre los dos.`,
      regla: `$${dec}^{2}<${total}<${dec + 10}^{2}$`,
    });
    const dig = digitos.map((d) => `$${d}\\cdot ${d}=${d * d}$`).join(" y ");
    h.paso({
      fusiones: [],
      resaltar: ["Pres"],
      texto: `Ahora la última cifra. $${total}$ termina en $${ultima}$. Al multiplicar un número por sí mismo, la última cifra sale de multiplicar la última cifra. Miramos las cifras del $0$ al $9$ y solo estas terminan en $${ultima}$: ${dig}. Entonces el número termina en ${digitos.length === 1 ? `$${digitos[0]}$` : `$${digitos[0]}$ o en $${digitos[1]}$`}. Entre $${dec}$ y $${dec + 10}$ y con esa última cifra ${todosCand.length === 1 ? `queda solo el $${todosCand[0]}$` : `hay dos: $${todosCand[0]}$ y $${todosCand[1]}$. Probamos primero el menor`}.`,
      porque: `La última cifra de un producto depende solo de las últimas cifras de los factores. Así quedan pocos números para probar.`,
      regla: `$${digitos.map((d) => `${d}\\cdot ${d}=${d * d}`).join(",\\ ")}$`,
    });
  }
  // m·m de un candidato: si tiene dos cifras no se da el resultado de golpe, se escribe partido en decenas y unidades
  const prodTexto = (m: number) =>
    grande(m)
      ? `${m}\\cdot ${m}=${m - (m % 10)}\\cdot ${m}+${m % 10}\\cdot ${m}=${(m - (m % 10)) * m}+${(m % 10) * m}=${m * m}`
      : `${m}\\cdot ${m}=${m * m}`;
  const probar = porDecenas ? candidatos : r > 10 ? [r - 10, r] : r > 1 ? [r - 1, r] : [r];
  probar.forEach((m, i) => {
    const ultimo = m === r;
    const desde = ultimo ? "Q2" : "Q1";
    const brotes = poner(m, ultimo ? "\\text{justo}" : "\\text{corto}", desde);
    h.paso({
      fusiones: [],
      brotes,
      texto: porDecenas
        ? ultimo
          ? `Probamos con ${todosCand.length === 1 ? "" : i === 0 ? "el primer candidato, " : "el segundo candidato, "}$${m}$: $${prodTexto(m)}$. Justo lo que pedía la pregunta.${todosCand.some((x) => x > r) ? ` Ya no hace falta probar el $${todosCand.find((x) => x > r)}$.` : ""}`
          : `Probamos con el primer candidato, $${m}$: $${prodTexto(m)}$. Es menos que $${total}$: nos quedamos cortos.`
        : ultimo
          ? `Probamos con el siguiente, $${m}$: $${m}\\cdot ${m}=${total}$. Justo lo que pedía la pregunta.`
          : `Probamos los números en orden, ${r > 10 ? "de diez en diez" : "desde $1$"}: ${lad(r > 10 ? serie(10, m, 10) : serie(1, m, 1))}. ${(r > 10 ? serie(10, m, 10) : serie(1, m, 1)).length === 1 ? "Da" : "Todos dan"} menos que $${total}$: nos quedamos cortos.`,
      porque: ultimo ? `Si multiplicado por sí mismo da $${total}$, ese número es el que buscamos.` : `Buscar la raíz es probar números: si el producto no llega a lo que piden, hay que subir el número.`,
      regla: ultimo ? `$${m}\\cdot ${m}=${total}$` : `$${m}\\cdot ${m}=${m * m}<${total}$`,
    });
  });
  // se encuentra: x.x y r.r valen lo mismo, asi que x = r
  const ultimaFila = k - 1;
  const tanteo = Array.from({ length: k }, (_, i) => idsFila(i)).flat().filter((id) => id !== `W${ultimaFila}a`);
  h.cambiar(["Q1", "Qx", "Q2"], [{ id: "XL", tex: col(incog, incog) }]);
  h.cambiar(["Pres"], [{ id: "XR", tex: String(r) }]);
  h.quitar(`W${ultimaFila}a`, ...tanteo);
  h.paso({
    fusiones: [
      { desde: ["Q1", "Qx", "Q2"], hacia: "XL" },
      { desde: [`W${ultimaFila}a`, "Pres"], hacia: "XR" },
      { desde: tanteo, hacia: null, modo: "tachar" },
    ],
    texto: `$${incog}\\cdot ${incog}$ y $${r}\\cdot ${r}$ dan lo mismo, $${total}$. Entonces $${incog}=${r}$. Eso es sacar la raíz cuadrada: $\\sqrt{${total}}=${r}$.`,
    porque: `La raíz cuadrada de un número es el número que, multiplicado por sí mismo, lo da. Es la operación que deshace el cuadrado.`,
    regla: `$x^{2}=n\\ \\Rightarrow\\ x=\\sqrt{n}$`,
  });
  // la unidad vuelve desde los datos
  h.agregar([{ id: "Ru", tex: CM }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: `D${dados[0]}u`, hacia: "Ru" }],
    resaltar: [`D${dados[0]}u`],
    texto: `Los lados estaban en centímetros: el $${CM}$ del dato pasa al resultado. ${esHip ? "La hipotenusa" : "El otro cateto"} mide $${incog}=${cant(r)}$.`,
    porque: `El número es una longitud, así que lleva la unidad de los datos.`,
    regla: `$${incog}=${cant(r)}$`,
  });

  // 7) comprobacion con los tres lados: a^2 + b^2 = c^2
  const fuente: Record<Rol, string> = { a: "Da", b: esHip ? "Db" : "XR", c: esHip ? "XR" : "Dc" };
  const comprob: Ficha[] = [
    { id: "CS", tex: "", salto: true },
    { id: "Ca", tex: String(a) },
    { id: "Ca2", tex: "2", sup: true },
    { id: "Cp", tex: "+", op: true },
    { id: "Cb", tex: String(b) },
    { id: "Cb2", tex: "2", sup: true },
    { id: "Ce", tex: "=", op: true },
    { id: "Cc", tex: String(c) },
    { id: "Cc2", tex: "2", sup: true },
  ];
  h.agregar(comprob);
  h.paso({
    fusiones: [],
    brotes: [
      { desde: "XL", hacia: "CS" },
      { desde: fuente.a, hacia: "Ca" },
      { desde: "XL", hacia: "Ca2" },
      { desde: fuente.b, hacia: "Cb" },
      { desde: "XL", hacia: "Cb2" },
      { desde: fuente.c, hacia: "Cc" },
      { desde: "XL", hacia: "Cc2" },
    ],
    resaltar: dados.map((k) => `D${k}`),
    texto: `Comprobamos con los tres lados: $${a}^{2}+${b}^{2}$ tiene que dar $${c}^{2}$. Los datos marcados y el resultado $${r}$ ocupan su lugar.`,
    porque: `Si el lado que encontramos está bien, el teorema de Pitágoras se cumple con los tres números.`,
    regla: `$a^{2}+b^{2}=c^{2}$`,
  });
  // un cuadrado por paso, con su producto escrito (el alumno ve 3·3 = 9, no solo el 9)
  for (const [l, n] of [["a", a], ["b", b], ["c", c]] as const) {
    if (grande(n)) {
      h.cambiar([`C${l}`, `C${l}2`], [{ id: `C${l}1`, tex: String(n) }, { id: `C${l}x`, tex: "\\cdot", op: true }, { id: `C${l}3`, tex: String(n) }]);
      h.paso({
        fusiones: [{ desde: [`C${l}`, `C${l}2`], hacia: [`C${l}1`, `C${l}x`, `C${l}3`] }],
        descompone: true,
        texto: `Calculamos $${n}^{2}$: el exponente $2$ dice que el $${n}$ se multiplica por sí mismo, $${n}^{2}=${n}\\cdot ${n}$.`,
        porque: l === "a" ? `Es el número multiplicado por sí mismo, como hicimos arriba.` : l === "b" ? `Igual que con $a$, ahora con $b$.` : `Y por último el lado más largo: la hipotenusa.`,
        regla: `$n^{2}=n\\cdot n$`,
      });
      cuadradoLapiz([`C${l}1`, `C${l}x`, `C${l}3`], `K${l}`, n);
      continue;
    }
    h.cambiar([`C${l}`, `C${l}2`], [{ id: `K${l}`, tex: String(n * n) }]);
    h.paso({
      fusiones: [{ desde: [`C${l}`, `C${l}2`], hacia: `K${l}` }],
      texto: `Calculamos $${n}^{2}$: $${n}^{2}=${n}\\cdot ${n}=${n * n}$.`,
      porque: l === "a" ? `Es el número multiplicado por sí mismo, como hicimos arriba.` : l === "b" ? `Igual que con $a$, ahora con $b$.` : `Y por último el lado más largo: la hipotenusa.`,
      regla: `$n^{2}=n\\cdot n$`,
    });
  }
  h.cambiar(["Ka", "Cp", "Kb"], [{ id: "Ks", tex: String(a * a + b * b) }]);
  h.paso({
    fusiones: [{ desde: ["Ka", "Cp", "Kb"], hacia: "Ks" }],
    texto: `Sumamos los catetos al cuadrado: $${a * a}+${b * b}=${a * a + b * b}$.`,
    porque: `Es el lado izquierdo de la fórmula.`,
    regla: `$a^{2}+b^{2}$`,
  });
  h.agregar([{ id: "Cok", tex: CHECK }]);
  h.paso({
    fusiones: [],
    brotes: [{ desde: "Ce", hacia: "Cok" }],
    resaltar: ["Ks", "Kc"],
    texto: `Los dos lados dan $${c * c}$: se cumple el teorema. ${esHip ? "La hipotenusa" : "El otro cateto"} mide $${incog}=${cant(r)}$.`,
    porque: `Al comprobar con los tres lados la igualdad se cumple, así que la respuesta es correcta.`,
    regla: `$c^{2}=a^{2}+b^{2}$`,
  });

  return {
    demo: { titulo: "", nota: "", intro, estados: h.estados, transiciones: h.trans },
    resumen: { a, b, c, r },
  };
}
