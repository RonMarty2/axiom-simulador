// Progresion aritmetica: hallar el termino n-esimo a_n = a_1 + (n-1)·d. Patron "ANOTAR Y REEMPLAZAR":
//   1. la sucesion tal como viene, y por que no se sigue "sumando de a uno" (lugares grandes);
//   2. de donde sale d: se restan terminos consecutivos (cada resta se escribe, se convierte si resta un negativo, se calcula);
//   3. ETIQUETAR debajo de cada dato la letra que le toca (a_1, d, n), de uno en uno, cada una con su color;
//   4. escribir la formula DEBAJO, en PIEZAS con id, con letras del mismo color (nace del "termino numero" del enunciado);
//   5. REEMPLAZAR una letra por vez: el valor VUELA desde su etiqueta hasta el lugar de la letra (la n aparece dos veces);
//   6. quitar el ejercicio y las etiquetas, y CALCULAR una operacion por paso: primero el parentesis, luego el producto, luego la suma;
//   7. comprobar con la sucesion del enunciado.
// Todo texto del alumno va en LaTeX entre $...$ (MathText); las fichas van en LaTeX sin $. Las barras van dobles.
import type { Ficha, Transicion, Fusion } from "./datos.ts";
import type { Resultado } from "./generadores.ts";

type Clase = "a" | "d" | "n";
const COLOR: Record<Clase, string> = { a: "#2563eb", d: "#16a34a", n: "#ea580c" };
const col = (k: Clase, tex: string) => `\\textcolor{${COLOR[k]}}{${tex}}`;
const par = (n: number) => (n < 0 ? `(${n})` : `${n}`);

/** solo se animan progresiones con numeros enteros, diferencia distinta de 0 y un lugar entre 5 y 30 */
export function validarProgresion(a1: number, d: number, n: number): string | null {
  if (![a1, d, n].every(Number.isInteger)) return "Escribe números enteros.";
  if (Math.abs(a1) > 20) return "El primer término debe estar entre -20 y 20.";
  if (d === 0) return "Con diferencia 0 todos los términos son iguales y no hay nada que calcular. Prueba con otra diferencia, por ejemplo 4.";
  if (Math.abs(d) > 10) return "La diferencia debe estar entre -10 y 10.";
  // con n = 3 el enunciado ya trae el termino que piden (la sucesion se muestra hasta el tercero) y con n = 4 la ultima pista (a_4) es el propio ejercicio
  if (n < 5 || n > 30) return "El lugar del término que piden debe estar entre 5 y 30.";
  return null;
}

interface Par {
  k: number;
  /** minuendo y sustraendo (los dos terminos consecutivos) */
  a: number;
  b: number;
  ida: string;
  io: string;
  ib: string;
  /** true si el sustraendo es negativo y la resta se convirtio en suma */
  suma: boolean;
}

export function progresionAritmetica(a1: number, d: number, n: number): Resultado {
  const t = (k: number) => a1 + (k - 1) * d;
  const [t1, t2, t3] = [t(1), t(2), t(3)];
  const an = t(n);
  const saltos = n - 1;
  const prod = saltos * d;
  const sube = d > 0;

  const estados: Ficha[][] = [];
  const trans: Transicion[] = [];
  const copia = (fs: Ficha[]) => fs.map((f) => ({ ...f }));

  // ----- lienzo: la sucesion, las restas, el enunciado del lugar pedido y la formula
  let seq: Ficha[] = [
    { id: "A1", tex: `${t1}` },
    { id: "C1", tex: ",", op: true, pegado: true },
    { id: "A2", tex: `${t2}` },
    { id: "C2", tex: ",", op: true, pegado: true },
    { id: "A3", tex: `${t3}` },
    { id: "C3", tex: ",", op: true, pegado: true },
    { id: "Pts", tex: "\\dots" },
  ];
  let difs: Ficha[] = [];
  let pregunta: Ficha[] = [
    { id: "Sq", tex: "", salto: true },
    { id: "Qt", tex: "\\text{término}" },
    { id: "Qn", tex: `${n}` },
  ];
  let formula: Ficha[] = [];
  let pistas: Ficha[] = []; // los primeros terminos escritos desde a_1: de ahi sale el n-1 de la formula
  const foto = () => estados.push([...copia(seq), ...copia(difs), ...copia(pregunta), ...copia(pistas), ...copia(formula)]);
  const empuja = (x: Transicion) => {
    foto();
    trans.push(x);
  };
  const poner = (id: string, parche: Partial<Ficha>) => {
    const f = (fs: Ficha[]) => fs.map((p) => (p.id === id ? { ...p, ...parche } : p));
    seq = f(seq);
    difs = f(difs);
    pregunta = f(pregunta);
  };
  const cambiar = (viejo: string, nuevo: Ficha) => {
    formula = formula.map((p) => (p.id === viejo ? nuevo : p));
  };

  const intro = `Tenemos la sucesión $${t1},\\ ${t2},\\ ${t3},\\ \\dots$ y queremos hallar el término número $${n}$. Vamos a escribir cada paso, como a lápiz.`;
  foto();

  // ----- 1) por que no se sigue sumando de a uno
  empuja({
    fusiones: [],
    resaltar: ["A1", "A2", "A3", "Pts", "Qn"],
    texto: `Esta sucesión ${sube ? "sube" : "baja"} siempre lo mismo de un término al siguiente: es una progresión aritmética. Para llegar al término número $${n}$ podríamos seguir sumando de a uno, pero con lugares grandes sería interminable. Usaremos una fórmula que sirve para cualquier lugar: la fórmula del término n-ésimo. Antes hay que saber de dónde sale cada dato.`,
    porque: `Una progresión aritmética es una lista donde cada número se obtiene sumando siempre el mismo número al anterior. Ese número fijo permite una fórmula que salta directo al lugar que quieras.`,
    regla: `$a_{k+1}=a_{k}+d$`,
  });

  // ----- 2) de donde sale d: restar terminos consecutivos
  const pares: Par[] = [
    { k: 1, a: t2, b: t1, ida: "P1a", io: "P1o", ib: "P1b", suma: false },
    { k: 2, a: t3, b: t2, ida: "P2a", io: "P2o", ib: "P2b", suma: false },
  ];
  difs = [
    { id: "S1", tex: "", salto: true },
    { id: "P1a", tex: `${t2}` },
    { id: "P1o", tex: "-", op: true },
    { id: "P1b", tex: par(t1) },
    { id: "S2", tex: "", salto: true },
    { id: "P2a", tex: `${t3}` },
    { id: "P2o", tex: "-", op: true },
    { id: "P2b", tex: par(t2) },
  ];
  empuja({
    fusiones: [],
    brotes: [
      { desde: "A1", hacia: "S1" },
      { desde: "A2", hacia: "P1a" },
      { desde: "A1", hacia: "P1b" },
      { desde: "A2", hacia: "S2" },
      { desde: "A3", hacia: "P2a" },
      { desde: "A2", hacia: "P2b" },
    ],
    texto: `Para ver cuánto ${sube ? "sube" : "baja"} la sucesión, restamos cada término menos el anterior: el segundo menos el primero y el tercero menos el segundo. Escribimos las dos restas.`,
    porque: `La diferencia entre dos términos seguidos mide el salto de uno al siguiente. Si es una progresión aritmética, ese salto es siempre el mismo.`,
    regla: `$d=a_{k+1}-a_{k}$`,
  });

  // restar un negativo es sumar su opuesto: se escribe la suma ANTES de calcularla
  const negativos = pares.filter((p) => p.b < 0);
  if (negativos.length > 0) {
    const fusiones: Fusion[] = [];
    const frases: string[] = [];
    for (const p of negativos) {
      const no = `P${p.k}p`;
      const nb = `P${p.k}c`;
      fusiones.push({ desde: [p.io, p.ib], hacia: [no, nb] });
      frases.push(`$${p.a}-(${p.b})=${p.a}+${-p.b}$`);
      difs = difs.flatMap((f) => (f.id === p.io ? [{ id: no, tex: "+", op: true }] : f.id === p.ib ? [{ id: nb, tex: `${-p.b}` }] : [f]));
      p.io = no;
      p.ib = nb;
      p.suma = true;
    }
    empuja({
      fusiones,
      texto: `Restar un número negativo es sumar su opuesto: ${frases.join(" y ")}.`,
      porque: `Quitar una cantidad negativa es lo mismo que agregar su opuesto: menos por menos da más.`,
      regla: `$a-(-b)=a+b$`,
    });
  }

  // las dos cuentas, a la vez (son independientes)
  {
    const fusiones: Fusion[] = [];
    const frases: string[] = [];
    for (const p of pares) {
      fusiones.push({ desde: [p.ida, p.io, p.ib], hacia: `D${p.k}` });
      frases.push(`$${p.a}${p.suma ? "+" : "-"}${p.suma ? -p.b : p.b}=${p.a - p.b}$`);
    }
    difs = [{ id: "S1", tex: "", salto: true }, { id: "D1", tex: `${t2 - t1}` }, { id: "S2", tex: "", salto: true }, { id: "D2", tex: `${t3 - t2}` }];
    empuja({
      fusiones,
      texto: `Calculamos las dos diferencias: ${frases.join(" y ")}.`,
      porque: `Son dos cuentas independientes, por eso van a la vez.`,
      regla: `$a-b=c$`,
    });
  }

  // las dos dan lo mismo: esa es d
  empuja({
    fusiones: [],
    resaltar: ["D1", "D2"],
    texto: `Las dos diferencias dan lo mismo: $${t2 - t1}$ y $${t3 - t2}$. La sucesión ${sube ? "sube" : "baja"} siempre $${Math.abs(d)}$ de un término al siguiente.`,
    porque: `Si dos saltos seguidos dieran distinto, no sería una progresión aritmética. Que den igual confirma que la diferencia es constante.`,
    regla: `$a_{2}-a_{1}=a_{3}-a_{2}$`,
  });
  difs = [{ id: "S1", tex: "", salto: true }, { id: "Dv", tex: `${d}` }];
  empuja({
    fusiones: [{ desde: ["D1", "S2", "D2"], hacia: "Dv" }],
    texto: `Como son iguales, queda un solo número: $${d}$. Ese número fijo se llama diferencia y se escribe $d$.`,
    porque: `Un salto que siempre es el mismo se anota una sola vez: es el número fijo que se suma de un término al siguiente.`,
    regla: `$d=a_{2}-a_{1}=a_{3}-a_{2}$`,
  });

  // ----- 3) etiquetar de uno en uno, cada letra con su color
  poner("A1", { tex: col("a", `${t1}`), debajo: col("a", `a_{1}=${t1}`) });
  empuja({
    fusiones: [],
    resaltar: ["A1"],
    texto: `El primer término es el primer número de la sucesión, con su signo: $a_{1}=${t1}$.`,
    porque: `Cada término lleva como nombre su lugar: $a_{1}$ es el que ocupa el lugar $1$, $a_{2}$ el lugar $2$, y así. Queda anotado debajo con su color.`,
    regla: `$a_{1}=\\text{primer término}$`,
  });
  poner("Dv", { tex: col("d", `${d}`), debajo: col("d", `d=${d}`) });
  empuja({
    fusiones: [],
    resaltar: ["Dv"],
    texto: `La diferencia que encontramos es $d=${d}$.`,
    porque: `Es el número que se suma cada vez para pasar de un término al siguiente. Queda anotado con su color.`,
    regla: `$d=a_{k+1}-a_{k}$`,
  });
  poner("Qn", { tex: col("n", `${n}`), debajo: col("n", `n=${n}`) });
  empuja({
    fusiones: [],
    resaltar: ["Qn"],
    texto: `El lugar del término que piden es $n=${n}$. El término que ocupa ese lugar se llama $a_{n}$ y es el que queremos hallar.`,
    porque: `La letra $n$ dice en qué lugar de la sucesión está el término que buscamos. Queda anotada con su color.`,
    regla: `$a_{n}=\\text{término del lugar }n$`,
  });

  // ----- 3b) de donde sale el n-1: cada termino es a_1 mas d tantas veces como saltos lo separan del primero
  const fila = (k: number): Ficha[] => [
    { id: `K${k}s`, tex: "", salto: true },
    { id: `K${k}t`, tex: `a_{${k}}` },
    { id: `K${k}e`, tex: "=", op: true },
    { id: `K${k}a`, tex: col("a", "a_{1}") },
    { id: `K${k}p`, tex: "+", op: true },
    { id: `K${k}c`, tex: `${k - 1}` },
    { id: `K${k}x`, tex: "\\cdot", op: true },
    { id: `K${k}d`, tex: col("d", "d") },
  ];
  pistas = [2, 3, 4].flatMap(fila);
  empuja({
    fusiones: [],
    brotes: [2, 3, 4].flatMap((k) => ["s", "t", "a", "c", "d"].map((x) => ({ desde: x === "a" ? "A1" : x === "d" ? "Dv" : "Qt", hacia: `K${k}${x}` }))),
    texto: `Antes de la fórmula, miremos cómo se llega a cada término partiendo del primero. Del primero al segundo hay $1$ salto, y se suma $d$ una vez: $a_{2}=a_{1}+1\\cdot d$. Al tercero hay $2$ saltos: $a_{3}=a_{1}+2\\cdot d$. Al cuarto, $3$ saltos: $a_{4}=a_{1}+3\\cdot d$. Siempre hay un salto menos que el lugar.`,
    porque: `Cada salto suma $d$. El término que ocupa el lugar $k$ está a $k-1$ saltos del primero, porque el primero ya está puesto y no necesita saltos.`,
    regla: `$a_{k}=a_{1}+(k-1)\\cdot d$`,
  });

  // ----- 4) la formula con letras, DEBAJO, en piezas con id (nace del "termino numero" del enunciado)
  formula = [
    { id: "Fs", tex: "", salto: true },
    { id: "Fan", tex: `a_{${col("n", "n")}}` },
    { id: "Fe", tex: "=", op: true },
    { id: "Fa1", tex: col("a", "a_{1}") },
    { id: "Fsp", tex: "", salto: true },
    { id: "Fp1", tex: "+", op: true },
    { id: "Fl", tex: "(", pegado: true },
    { id: "Fn", tex: col("n", "n"), pegado: true },
    { id: "Fm", tex: "-", op: true },
    { id: "Fu", tex: "1" },
    { id: "Fr", tex: ")", pegado: true },
    ...(d < 0 ? [{ id: "Fsd", tex: "", salto: true }] : []),
    { id: "Fdt", tex: "\\cdot", op: true },
    { id: "Fd", tex: col("d", "d") },
  ];
  empuja({
    fusiones: [],
    brotes: ["Fs", "Fan", "Fa1", "Fl", "Fn", "Fu", "Fr", "Fd"].map((id) => ({ desde: "Qt", hacia: id })),
    texto: `Ahora escribimos debajo la fórmula del término n-ésimo, todavía con letras. Es lo mismo que acabamos de ver, con $n-1$ saltos en lugar de $1$, $2$ o $3$. Cada letra tiene el color de su dato.`,
    porque: `Para llegar al término $n$ se parte del primero y se suma $d$ una vez por cada salto. Entre el primero y el término $n$ hay $n-1$ saltos, como vimos con $a_{2}$, $a_{3}$ y $a_{4}$.`,
    regla: `$a_{n}=a_{1}+(n-1)\\cdot d$`,
  });

  // ----- 5) reemplazar UNA letra por vez: el valor vuela desde su etiqueta
  cambiar("Fa1", { id: "Va1", tex: col("a", par(t1)) });
  empuja({
    fusiones: [{ desde: ["Fa1"], hacia: "Va1", modo: "viajar" }],
    brotes: [{ desde: "A1", hacia: "Va1" }],
    texto: `Reemplazamos $a_{1}$ por $${par(t1)}$: el valor que anotamos sale de su etiqueta y ocupa el lugar de la letra. El $a_{1}$ aparece una sola vez.`,
    porque: t1 < 0 ? `Como $a_{1}$ es negativo, va entre paréntesis para que no se confunda su signo con una resta o una suma.` : `Se reemplaza tal cual. El número conserva el color de su letra.`,
    regla: `$a_{1}=${t1}$`,
  });
  cambiar("Fd", { id: "Vd", tex: col("d", par(d)) });
  empuja({
    fusiones: [{ desde: ["Fd"], hacia: "Vd", modo: "viajar" }],
    brotes: [{ desde: "Dv", hacia: "Vd" }],
    texto: `Reemplazamos $d$ por $${par(d)}$: el valor sale de su etiqueta y ocupa el lugar de la letra. La $d$ aparece una sola vez, multiplicando al paréntesis.`,
    porque: d < 0 ? `Como $d$ es negativo, va entre paréntesis para que no se confunda su signo con una resta.` : `Igual que con $a_{1}$, se reemplaza tal cual. La $d$ queda multiplicando al paréntesis.`,
    regla: `$d=${d}$`,
  });
  cambiar("Fan", { id: "Van", tex: `a_{${col("n", `${n}`)}}` });
  cambiar("Fn", { id: "Vn", tex: col("n", `${n}`), pegado: true });
  empuja({
    fusiones: [
      { desde: ["Fan"], hacia: "Van", modo: "viajar" },
      { desde: ["Fn"], hacia: "Vn", modo: "viajar" },
    ],
    brotes: [
      { desde: "Qn", hacia: "Van" },
      { desde: "Qn", hacia: "Vn" },
    ],
    texto: `Reemplazamos $n$ por $${n}$: el valor sale de su etiqueta y ocupa el lugar de la letra en los dos lugares donde aparece. La $n$ está en $a_{n}$, que queda $a_{${n}}$, y dentro del paréntesis, que queda $(${n}-1)$.`,
    porque: `La letra $n$ aparece dos veces en la fórmula, así que se reemplaza las dos veces. El número conserva el color de su letra.`,
    regla: `$n=${n}$`,
  });

  // ----- 6) el ejercicio y las etiquetas ya cumplieron su papel
  // la diferencia (con su etiqueta d) se queda: la comprobacion final la necesita a la vista
  const aQuitar = [...seq, ...difs.filter((f) => f.id !== "Dv"), ...pregunta, ...pistas].map((f) => f.id);
  seq = [];
  difs = difs.filter((f) => f.id === "Dv");
  pregunta = [];
  pistas = [];
  empuja({
    fusiones: [{ desde: aQuitar, hacia: null }],
    texto: `Ya tenemos todos los valores dentro de la fórmula, así que la sucesión de arriba, sus etiquetas y los ejemplos de saltos ya no se necesitan. Dejamos solo la $d$ a la vista, porque la usaremos al comprobar.`,
    porque: `Los números $a_{1}$, $d$ y $n$ quedaron escritos en la fórmula.`,
    regla: `$a_{n}=a_{1}+(n-1)\\cdot d$`,
  });

  // ----- 7) calcular una operacion por paso: parentesis, producto, suma
  const orden = `$\\text{paréntesis}\\ \\to\\ \\text{producto}\\ \\to\\ \\text{suma}$`;
  let cuenta = 0;
  const ordinal = () => ["Primera", "Segunda", "Tercera"][cuenta++];
  formula = formula.flatMap((f) => (f.id === "Fl" ? [{ id: "Pp", tex: `${saltos}` }] : ["Vn", "Fm", "Fu", "Fr"].includes(f.id) ? [] : [f]));
  empuja({
    fusiones: [{ desde: ["Fl", "Vn", "Fm", "Fu", "Fr"], hacia: "Pp" }],
    texto: `${ordinal()} cuenta: el paréntesis. $${n}-1=${saltos}$.`,
    porque: `En una cuenta con paréntesis, producto y suma se hace primero el paréntesis. Además, $${saltos}$ es la cantidad de saltos que hay entre el primer término y el término $${n}$.`,
    regla: orden,
  });
  formula = formula.flatMap((f) => (f.id === "Pp" ? [{ id: "Pr", tex: par(prod) }] : ["Fdt", "Vd", "Fsd"].includes(f.id) ? [] : [f]));
  empuja({
    fusiones: [{ desde: ["Pp", "Fdt", "Vd"], hacia: "Pr" }],
    texto: `${ordinal()} cuenta: el producto. $${saltos}\\cdot ${par(d)}=${prod}$.${Math.abs(d) === 1 ? " Multiplicar por $1$ deja el número igual" + (d < 0 ? ", solo le pone el signo menos." : ".") : ""}`,
    porque: d < 0 ? `Un positivo por un negativo da negativo: son ${saltos} saltos que bajan $${-d}$ cada uno. El producto va antes que la suma.` : `Un positivo por un positivo da positivo: son ${saltos} saltos que suben $${d}$ cada uno. El producto va antes que la suma.`,
    regla: d < 0 ? `$\\text{positivo}\\cdot\\text{negativo}=\\text{negativo}$` : `$m\\cdot n=p$`,
  });
  let idOp = "Fp1";
  let idPr = "Pr";
  if (prod < 0) {
    // sumar un negativo es restar su opuesto: se escribe la resta ANTES de calcularla
    formula = formula.flatMap((f) => (f.id === "Fp1" ? [{ id: "Fp2", tex: "-", op: true }] : f.id === "Pr" ? [{ id: "Pr2", tex: `${-prod}` }] : [f]));
    empuja({
      fusiones: [{ desde: ["Fp1", "Pr"], hacia: ["Fp2", "Pr2"] }],
      texto: `Sumar un número negativo es restar su opuesto: $${par(t1)}+(${prod})=${par(t1)}-${-prod}$.`,
      porque: `Sumar una cantidad negativa es lo mismo que quitar su opuesto: más por menos da menos.`,
      regla: `$a+(-b)=a-b$`,
    });
    idOp = "Fp2";
    idPr = "Pr2";
  }
  formula = formula.flatMap((f) => (f.id === "Va1" ? [{ id: "R", tex: `${an}` }] : [idOp, idPr, "Fsp"].includes(f.id) ? [] : [f]));
  empuja({
    fusiones: [{ desde: ["Va1", idOp, idPr], hacia: "R" }],
    texto: `${ordinal()} cuenta: la suma. $${par(t1)}${prod < 0 ? "-" : "+"}${Math.abs(prod)}=${an}$.${t1 === 0 ? " Sumar $0$ no cambia nada: queda el producto." : ""}`,
    porque: `Ya no queda nada por hacer antes: solo una suma. Es el término número $${n}$ de la sucesión.`,
    regla: `$a+b=c$`,
  });

  // ----- 8) comprobar con la sucesion del enunciado
  empuja({
    fusiones: [],
    resaltar: ["Van", "Fe", "R"],
    texto: `Respuesta: el término número $${n}$ es $${an}$.`,
    porque: `Es el resultado de la fórmula con los tres datos: $a_{1}$, $d$ y $n$.`,
    regla: `$a_{${n}}=${an}$`,
  });
  // un salto hacia atras: el termino anterior sale de la resta y de el se vuelve con la suma
  formula = [
    ...formula,
    { id: "Cs", tex: "", salto: true },
    { id: "Ct", tex: `a_{${n - 1}}` },
    { id: "Cq", tex: "=", op: true },
    { id: "Ca", tex: `${an}` },
    { id: "Cm", tex: "-", op: true },
    { id: "Cd", tex: par(d) },
  ];
  empuja({
    fusiones: [],
    brotes: [
      { desde: "R", hacia: "Cs" },
      { desde: "R", hacia: "Ct" },
      { desde: "R", hacia: "Ca" },
      { desde: "Dv", hacia: "Cd" },
    ],
    texto: `Revisamos que el último salto encaje: al resultado, $${an}$, le restamos la diferencia $d=${par(d)}$. Eso tendría que darnos el término anterior, $a_{n-1}$, el del lugar $${n - 1}$.`,
    porque: `De un término al siguiente solo se suma $d$. Entonces, si al resultado le quitamos $d$, tiene que quedar el término anterior.`,
    regla: `$a_{n-1}=a_{n}-d$`,
  });
  let idM = "Cm";
  let idD = "Cd";
  if (d < 0) {
    // restar un negativo es sumar su opuesto: se escribe la suma ANTES de calcularla (la misma regla de arriba)
    formula = formula.flatMap((f) => (f.id === "Cm" ? [{ id: "Cm2", tex: "+", op: true }] : f.id === "Cd" ? [{ id: "Cd3", tex: `${-d}` }] : [f]));
    empuja({
      fusiones: [{ desde: ["Cm", "Cd"], hacia: ["Cm2", "Cd3"] }],
      texto: `Restar un número negativo es sumar su opuesto: $${an}-${par(d)}=${an}+${-d}$.`,
      porque: `Quitar una cantidad negativa es lo mismo que agregar su opuesto: menos por menos da más.`,
      regla: `$a-(-b)=a+b$`,
    });
    idM = "Cm2";
    idD = "Cd3";
  }
  formula = formula.flatMap((f) => (f.id === "Ca" ? [{ id: "Cr", tex: `${t(n - 1)}` }] : [idM, idD].includes(f.id) ? [] : [f]));
  empuja({
    fusiones: [{ desde: ["Ca", idM, idD], hacia: "Cr" }],
    texto: `Restamos: $${an}${d < 0 ? "+" + -d : "-" + d}=${t(n - 1)}$. Ese es el término anterior, $a_{${n - 1}}$: el del lugar $${n - 1}$.`,
    porque: `Quitar $d$ al resultado nos lleva un lugar hacia atrás en la sucesión.`,
    regla: d < 0 ? `$a+b=c$` : `$a-b=c$`,
  });
  formula = [
    ...formula,
    { id: "Cs2", tex: "", salto: true },
    { id: "Cw", tex: `${t(n - 1)}` },
    { id: "Cp", tex: "+", op: true },
    { id: "Cd2", tex: par(d) },
    { id: "Ce", tex: "=", op: true },
    { id: "Cv", tex: `${an}` },
  ];
  empuja({
    fusiones: [],
    brotes: [
      { desde: "Cr", hacia: "Cs2" },
      { desde: "Cr", hacia: "Cw" },
      { desde: "Dv", hacia: "Cd2" },
      { desde: "R", hacia: "Cv" },
    ],
    texto: `Y al revés: a ese término le sumamos $d$ y tiene que dar el resultado: $${t(n - 1)}+${par(d)}=${an}$. Encaja con el $${an}$ que obtuvimos.`,
    porque: `De un término al siguiente se suma $d$: ir hacia atrás y volver nos deja en el mismo lugar. Si no diera lo mismo, habría un error en alguna cuenta.`,
    regla: `$a_{n-1}+d=a_{n}$`,
  });

  return {
    demo: { titulo: "", nota: "", intro, estados, transiciones: trans },
    resumen: { a1, d, n, an, saltos, prod },
  };
}
