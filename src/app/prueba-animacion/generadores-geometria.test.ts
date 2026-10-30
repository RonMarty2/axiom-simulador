import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { aplanar, type Demo, type Ficha } from "./datos.ts";
import { revisar } from "./revisar.ts";
import { hallazgosEstilo } from "./estilo.ts";
import { pitagoras, validarPitagoras } from "./generadores-geometria.ts";

const MAX = 100;
const entero = (n: number) => {
  const r = Math.round(Math.sqrt(n));
  return r * r === n ? r : null;
};

/** todas las ternas permitidas, calculadas aparte del generador (fuerza bruta) */
const hipotenusas: [number, number][] = [];
const catetos: [number, number][] = [];
for (let x = 1; x <= MAX; x++) {
  for (let y = 1; y <= MAX; y++) {
    const c = entero(x * x + y * y);
    if (c !== null && c <= MAX) hipotenusas.push([x, y]);
    if (y < x && entero(x * x - y * y) !== null) catetos.push([x, y]);
  }
}

const textos = (d: Demo) => d.transiciones.map((t) => `${t.texto} ${t.porque}`);
const ultimo = (d: Demo) => aplanar(d.estados.at(-1)!);
const hay = (e: Ficha[], id: string, tex: string) => e.some((f) => f.id === id && f.tex === tex);
const limpia = (s: string) => s.replace(/\\ /g, "").replace(/\s+/g, "");

/** controles comunes, ademas de revisar() */
function controles(d: Demo, etiqueta: string) {
  revisar(d, etiqueta);
  assert.deepEqual(hallazgosEstilo(d, etiqueta, "movimiento"), [], `${etiqueta}: movimiento`);
  for (const [i, t] of d.transiciones.entries()) {
    assert.ok(t.regla, `${etiqueta}: T${i} sin regla`);
    for (const s of [t.texto, t.porque, d.intro]) {
      assert.ok(!/[/÷^]/.test(s.replace(/\$[^$]*\$/g, "")), `${etiqueta}: T${i} tiene / ÷ o ^ fuera de LaTeX: ${s}`);
      assert.ok(!/\b(podés|tenés|hacé|fijate|mirá|calculá|sabés|querés|usá|probá|escribí|reemplazá|anotá|vos)\b/i.test(s), `${etiqueta}: T${i} voseo: ${s}`);
      assert.ok(!/[—–]|\uD83C|\uD83D|✅/.test(s), `${etiqueta}: T${i} guion largo o emoji`);
    }
    // cada cuenta escrita en el texto es verdadera: n^{2}=m, a\cdot b=m, a+b=m, a-b=m
    for (const seg of t.texto.match(/\$[^$]+\$/g) ?? []) {
      const s = limpia(seg.slice(1, -1));
      let m = s.match(/^(\d+)\^\{2\}=(\d+)$/);
      if (m) assert.equal(Number(m[1]) ** 2, Number(m[2]), `${etiqueta}: T${i} cuenta falsa ${s}`);
      m = s.match(/^(\d+)\\cdot(\d+)=(\d+)$/);
      if (m) assert.equal(Number(m[1]) * Number(m[2]), Number(m[3]), `${etiqueta}: T${i} cuenta falsa ${s}`);
      m = s.match(/^(\d+)\+(\d+)=(\d+)$/);
      if (m) assert.equal(Number(m[1]) + Number(m[2]), Number(m[3]), `${etiqueta}: T${i} cuenta falsa ${s}`);
      m = s.match(/^(\d+)-(\d+)=(\d+)$/);
      if (m) assert.equal(Number(m[1]) - Number(m[2]), Number(m[3]), `${etiqueta}: T${i} cuenta falsa ${s}`);
      m = s.match(/^\\sqrt\{(\d+)\}=(\d+)$/);
      if (m) assert.equal(Number(m[2]) ** 2, Number(m[1]), `${etiqueta}: T${i} raiz falsa ${s}`);
    }
  }
  // LaTeX con doble barra: ninguna orden sin barra (revisar lo vigila en fichas y textos); aqui tambien en la intro
  assert.ok(!/(^|[^\\a-zA-Z])(cdot|dfrac|frac|sqrt|text)\b/.test(d.intro), `${etiqueta}: intro con LaTeX sin barra`);
  // nada de la animacion usa las ordenes sueltas "cdot" o "text" como palabra
  for (const e of d.estados) for (const f of aplanar(e)) assert.ok(!/(^|[^\\a-zA-Z])(cdot|text)\b/.test(f.tex), `${etiqueta}: ficha ${f.id} con LaTeX sin barra`);
}

describe("Pitagoras: validacion", () => {
  test("acepta exactamente las ternas pitagoricas de lados de 1 a 100", () => {
    assert.ok(hipotenusas.length > 100, `solo ${hipotenusas.length} ternas de hipotenusa`);
    assert.ok(catetos.length > 100, `solo ${catetos.length} ternas de cateto`);
    for (let x = 1; x <= MAX + 3; x++) {
      for (let y = 1; y <= MAX + 3; y++) {
        const okH = hipotenusas.some(([p, q]) => p === x && q === y);
        assert.equal(validarPitagoras("hipotenusa", x, y) === null, okH, `hipotenusa ${x},${y}`);
        const okC = catetos.some(([p, q]) => p === x && q === y);
        assert.equal(validarPitagoras("cateto", x, y) === null, okC, `cateto ${x},${y}`);
      }
    }
  });

  test("rechaza lo que no es terna, lo no entero y lo fuera de limite, con un mensaje", () => {
    for (const [t, x, y] of [
      ["hipotenusa", 3, 5],
      ["hipotenusa", 0, 4],
      ["hipotenusa", 3.5, 4],
      ["hipotenusa", 60, 80.0000001],
      ["hipotenusa", 75, 100], // c = 125
      ["cateto", 5, 5],
      ["cateto", 5, 13],
      ["cateto", 13, 6],
      ["cateto", 101, 20],
      ["cateto", 13, 0],
      ["cateto", Number.NaN, 5],
    ] as const) {
      const m = validarPitagoras(t, x, y);
      assert.ok(m && m.length > 10, `${t} ${x},${y} debia dar un mensaje`);
    }
    assert.match(validarPitagoras("hipotenusa", 3, 5)!, /entero/);
    assert.match(validarPitagoras("cateto", 5, 13)!, /mayor/);
  });
});

describe("Pitagoras: hipotenusa (c^2 = a^2 + b^2)", () => {
  test("toda terna permitida: revisar, cuenta exacta, resultado y comprobacion en la hoja", () => {
    for (const [a, b] of hipotenusas) {
      const r = pitagoras("hipotenusa", a, b);
      controles(r.demo, `hip ${a},${b}`);
      const c = Math.sqrt(a * a + b * b);
      assert.equal(r.resumen.c, c);
      assert.equal(r.resumen.a, a);
      assert.equal(r.resumen.b, b);
      assert.equal(a * a + b * b, c * c);
      const e = ultimo(r.demo);
      assert.ok(hay(e, "XR", String(c)), `hip ${a},${b}: falta el resultado ${c}`);
      assert.ok(hay(e, "Ru", "\\text{cm}"), `hip ${a},${b}: falta la unidad`);
      assert.ok(hay(e, "Ks", String(c * c)) && hay(e, "Kc", String(c * c)), `hip ${a},${b}: la comprobacion no cierra`);
      assert.ok(e.some((f) => f.id === "Cok"), `hip ${a},${b}: falta el visto bueno`);
    }
  });

  test("3 y 4: formula con letras, una letra por vez, un cuadrado por vez, raiz por su significado", () => {
    const d = pitagoras("hipotenusa", 3, 4).demo;
    const t = textos(d);
    // la formula nace con letras antes de que aparezca cualquier numero de reemplazo
    const iForm = d.transiciones.findIndex((x) => x.regla === "$c^{2}=a^{2}+b^{2}$" && x.brotes?.some((br) => br.hacia === "Fc"));
    const iA = d.transiciones.findIndex((x) => x.fusiones.some((f) => f.desde.includes("Fa") && f.hacia === "Na"));
    const iB = d.transiciones.findIndex((x) => x.fusiones.some((f) => f.desde.includes("Fb") && f.hacia === "Nb"));
    assert.ok(iForm >= 0 && iForm < iA && iA < iB, "orden: formula, reemplazo de a, reemplazo de b");
    // cada reemplazo toca una sola letra y el numero sale del dato
    assert.deepEqual(d.transiciones[iA].brotes, [{ desde: "Da", hacia: "Na" }]);
    assert.deepEqual(d.transiciones[iB].brotes, [{ desde: "Db", hacia: "Nb" }]);
    assert.ok(hay(aplanar(d.estados[iB + 1]), "Nb", "\\textcolor{#16a34a}{4}"), "el 4 conserva el color de b");
    // los datos tienen su etiqueta con letra
    const e1 = aplanar(d.estados[iForm]);
    assert.ok(e1.find((f) => f.id === "Da")!.debajo?.includes("a"));
    assert.ok(e1.find((f) => f.id === "Db")!.debajo?.includes("b"));
    assert.ok(e1.find((f) => f.id === "Dq")!.debajo?.includes("c"));
    // cuentas, una por paso
    for (const cuenta of ["$3^{2}=3\\cdot 3$", "$3\\cdot 3=9$", "$4\\cdot 4=16$", "$9+16=25$"]) assert.ok(t.some((x) => x.includes(cuenta)), `falta ${cuenta}`);
    // la raiz no salta: la pregunta, un tanteo corto, el justo y recien ahi la raiz cuadrada
    const iQ = t.findIndex((x) => x.includes("qué número, multiplicado por sí mismo, da $25$"));
    const iCorto = t.findIndex((x) => x.includes("$4\\cdot 4=16$") && x.includes("cortos"));
    const iJusto = t.findIndex((x) => x.includes("$5\\cdot 5=25$") && x.includes("Justo"));
    const iRaiz = t.findIndex((x) => x.includes("$\\sqrt{25}=5$"));
    assert.ok(iQ >= 0 && iQ < iCorto, "falta la pregunta antes de tantear");
    assert.ok(iCorto < iJusto && iJusto < iRaiz, "orden del tanteo y la raiz");
    assert.equal(iRaiz - iJusto, 1);
    // no hay "sqrt" antes de haber encontrado el numero
    assert.ok(!t.slice(0, iRaiz).some((x) => x.includes("\\sqrt")), "la raiz se nombra solo cuando ya se encontro el numero");
    // formulas con el color de su dato en la formula con letras
    assert.ok(hay(aplanar(d.estados[iForm + 1]), "Fa", "\\textcolor{#2563eb}{a}"));
    assert.ok(hay(aplanar(d.estados[iForm + 1]), "Fc", "\\textcolor{#ea580c}{c}"));
  });

  test("con la incognita ya a la izquierda no hay pasos de ordenar", () => {
    const d = pitagoras("hipotenusa", 5, 12).demo;
    assert.ok(!d.transiciones.some((x) => x.regla?.includes("\\Rightarrow\\ B=A") || x.regla?.includes("x=z-y")));
    assert.ok(!textos(d).some((x) => x.includes("cambia de signo")));
  });
});

describe("Pitagoras: cateto (b^2 = c^2 - a^2)", () => {
  test("toda terna permitida: revisar, cuenta exacta, resultado y comprobacion en la hoja", () => {
    for (const [c, a] of catetos) {
      const r = pitagoras("cateto", c, a);
      controles(r.demo, `cat ${c},${a}`);
      const b = Math.sqrt(c * c - a * a);
      assert.equal(r.resumen.b, b);
      assert.equal(r.resumen.c, c);
      assert.equal(r.resumen.a, a);
      assert.equal(a * a + b * b, c * c);
      const e = ultimo(r.demo);
      assert.ok(hay(e, "XR", String(b)), `cat ${c},${a}: falta el resultado ${b}`);
      assert.ok(hay(e, "Ru", "\\text{cm}"), `cat ${c},${a}: falta la unidad`);
      assert.ok(hay(e, "Ks", String(c * c)) && hay(e, "Kc", String(c * c)), `cat ${c},${a}: la comprobacion no cierra`);
      assert.ok(e.some((f) => f.id === "Cok"), `cat ${c},${a}: falta el visto bueno`);
    }
  });

  test("13 y 5: a^2 viaja al otro lado y cambia de signo, se da vuelta la igualdad, y recien despues se reemplaza", () => {
    const d = pitagoras("cateto", 13, 5).demo;
    const t = textos(d);
    const iPasa = d.transiciones.findIndex((x) => x.regla === "$x+y=z\\ \\Rightarrow\\ x=z-y$");
    const iVuelta = d.transiciones.findIndex((x) => x.regla === "$A=B\\ \\Rightarrow\\ B=A$");
    const iPrimero = d.transiciones.findIndex((x) => x.fusiones.some((f) => f.modo === "viajar" && f.hacia === "Nc"));
    assert.ok(iPasa >= 0 && iPasa + 1 === iVuelta && iVuelta < iPrimero, "ordenar antes de reemplazar");
    // arrastra las mismas piezas (mismos ids), no escribe el opuesto en los dos lados
    const ids = (e: Ficha[]) => e.map((f) => f.id);
    assert.deepEqual(ids(d.estados[iPasa]).filter((i) => i.startsWith("F")), ["Fc", "Fc2", "Fe", "Fa", "Fa2", "Fp", "Fb", "Fb2"]);
    assert.deepEqual(ids(d.estados[iPasa + 1]).filter((i) => i.startsWith("F")), ["Fc", "Fc2", "Fp", "Fa", "Fa2", "Fe", "Fb", "Fb2"]);
    assert.deepEqual(ids(d.estados[iVuelta + 1]).filter((i) => i.startsWith("F")), ["Fb", "Fb2", "Fe", "Fc", "Fc2", "Fp", "Fa", "Fa2"]);
    assert.equal(aplanar(d.estados[iPasa]).find((f) => f.id === "Fp")!.tex, "+");
    assert.equal(aplanar(d.estados[iPasa + 1]).find((f) => f.id === "Fp")!.tex, "-");
    // cuentas: una por paso, con resta
    for (const cuenta of ["$13^{2}=13\\cdot 13$", "$10\\cdot 13=130$", "$3\\cdot 13=39$", "$130+39=169$", "$5\\cdot 5=25$", "$169-25=144$", "$\\sqrt{144}=12$"]) assert.ok(t.some((x) => x.includes(cuenta)), `falta ${cuenta}`);
    // el orden de reemplazo sigue el de la formula ordenada: primero c, despues a; b nunca se reemplaza
    const reemplazos = d.transiciones.flatMap((x) => x.fusiones.filter((f) => f.modo === "viajar" && /^N[abc]$/.test(String(f.hacia))).map((f) => f.hacia));
    assert.deepEqual(reemplazos, ["Nc", "Na"]);
  });

  test("la regla de signos solo aparece cuando se resta", () => {
    const hip = pitagoras("hipotenusa", 3, 4).demo;
    assert.ok(!hip.transiciones.some((x) => x.regla?.includes("c^{2}-a^{2}")));
    const cat = pitagoras("cateto", 5, 3).demo;
    assert.ok(cat.transiciones.some((x) => x.regla?.includes("c^{2}-a^{2}")));
  });
});

describe("Pitagoras: casos difíciles y datos del enunciado", () => {
  const dificiles: [string, "hipotenusa" | "cateto", number, number, number][] = [
    ["terna mas chica", "hipotenusa", 3, 4, 5],
    ["catetos en orden inverso", "hipotenusa", 4, 3, 5],
    ["resultado de dos cifras", "hipotenusa", 5, 12, 13],
    ["multiplo de terna (el resultado termina en 0)", "hipotenusa", 30, 40, 50],
    ["terna grande, resultado en el limite", "hipotenusa", 60, 80, 100],
    ["terna grande con catetos de dos cifras", "hipotenusa", 33, 56, 65],
    ["cateto: el que se busca es el mas chico", "cateto", 5, 4, 3],
    ["cateto: hipotenusa de dos cifras", "cateto", 13, 5, 12],
    ["cateto: el conocido es el mayor", "cateto", 17, 15, 8],
    ["cateto: hipotenusa en el limite", "cateto", 100, 28, 96],
    ["cateto: resta que da tres cifras", "cateto", 85, 13, 84],
  ];
  for (const [nombre, tipo, x, y, esperado] of dificiles) {
    test(nombre, () => {
      assert.equal(validarPitagoras(tipo, x, y), null);
      const r = pitagoras(tipo, x, y);
      controles(r.demo, nombre);
      assert.equal(r.resumen.r, esperado);
      assert.ok(hay(ultimo(r.demo), "XR", String(esperado)));
    });
  }

  test("el enunciado propio reemplaza la intro y cada dato nace de la fila de datos", () => {
    const d = pitagoras("hipotenusa", 3, 4, "Mi enunciado.").demo;
    assert.equal(d.intro, "Mi enunciado.");
    const inicial = aplanar(d.estados[0]);
    assert.deepEqual(inicial.filter((f) => !f.op).map((f) => f.tex), ["3", "\\text{cm}", "4", "\\text{cm}", "?"]);
    // los numeros del reemplazo y de la comprobacion salen de los datos o del resultado, nunca de la nada
    const brotes = d.transiciones.flatMap((x) => x.brotes ?? []);
    for (const id of ["Na", "Nb", "Ca", "Cb"]) assert.ok(brotes.some((br) => br.hacia === id && ["Da", "Db"].includes(br.desde)), `${id} no nace de un dato`);
    assert.ok(brotes.some((br) => br.hacia === "Cc" && br.desde === "XR"), "el c de la comprobacion nace del resultado");
  });

  test("cantidad de pasos medida: 23 con hipotenusa, 37 con cateto (los dos pasos de ordenar, el tanteo por decenas y ultima cifra, y 13·13 y 12·12 a lapiz en el calculo y la comprobacion)", () => {
    assert.equal(pitagoras("hipotenusa", 3, 4).demo.transiciones.length, 23);
    assert.equal(pitagoras("cateto", 13, 5).demo.transiciones.length, 37);
  });
});

describe("Pitagoras: la raiz de dos cifras no se adivina", () => {
  // 33 y 56 dan 65: entre que decenas esta, que cifra termina, y recien ahi el numero que se prueba
  test("65: decenas, ultima cifra y el justo, en ese orden y sin raiz antes de tiempo", () => {
    const t = textos(pitagoras("hipotenusa", 33, 56).demo);
    const iDec = t.findIndex((x) => x.includes("entre $60$ y $70$"));
    const iCifra = t.findIndex((x) => x.includes("termina en $5$"));
    const iJusto = t.findIndex((x) => x.includes("$65\\cdot 65=60\\cdot 65+5\\cdot 65=3900+325=4225$") && x.includes("Justo"));
    const iRaiz = t.findIndex((x) => x.includes("$\\sqrt{4225}=65$"));
    assert.ok(iDec >= 0 && iDec < iCifra && iCifra < iJusto && iJusto < iRaiz, "orden: decenas, cifra, justo, raiz");
  });
  // 74: 5476 termina en 6, asi que 4 o 6: se prueba el 74 y es justo; 76 no hace falta
  test("cuando dos cifras terminan igual se prueban en orden y se corta en el justo", () => {
    const t = textos(pitagoras("hipotenusa", 51, 68).demo); // 85
    assert.ok(t.some((x) => x.includes("termina en $5$")), "85 termina en 5");
    const r = pitagoras("cateto", 85, 36); // el otro cateto: 77
    const u = textos(r.demo);
    assert.ok(u.some((x) => x.includes("termina en $9$") && x.includes("$3\\cdot 3=9$") && x.includes("$7\\cdot 7=49$")), "las dos cifras que terminan en 9");
    assert.ok(u.some((x) => x.includes("$77\\cdot 77=70\\cdot 77+7\\cdot 77=5390+539=5929$") && x.includes("Justo")));
    assert.ok(!u.some((x) => x.includes("$73\\cdot 73")) || u.some((x) => x.includes("$73\\cdot 73=70\\cdot 73+3\\cdot 73=5110+219=5329$") && x.includes("cortos")), "73 se prueba y se queda corto");
  });
});
