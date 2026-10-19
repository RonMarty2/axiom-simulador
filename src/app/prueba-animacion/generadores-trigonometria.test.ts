import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { revisar } from "./revisar.ts";
import { hallazgosEstilo } from "./estilo.ts";
import { trigonometria, validarTrigonometria } from "./generadores-trigonometria.ts";

const LADOS = ["op", "ady", "hip"] as const;
const ANGULOS = [30, 45, 60];

// valor exacto de la razon como fraccion 1/q (independiente del generador) y su version decimal
const decimal = (razon: number, angulo: number) => {
  const r = (angulo * Math.PI) / 180;
  return [Math.sin(r), Math.cos(r), Math.tan(r)][razon];
};

function* combinaciones() {
  for (const angulo of ANGULOS)
    for (const dado of LADOS)
      for (const buscado of LADOS)
        for (let valor = 1; valor <= 99; valor++) yield { angulo, dado, buscado, valor };
}

describe("trigonometria del triangulo rectangulo", () => {
  test("toda combinacion permitida pasa revisar, el resultado es entero y la razon da el valor notable", () => {
    let casos = 0;
    const razonesVistas = new Set<string>();
    for (const { angulo, dado, buscado, valor } of combinaciones()) {
      if (validarTrigonometria(angulo, dado, valor, buscado)) continue;
      const nombre = `${angulo} ${dado}=${valor} busca ${buscado}`;
      const r = trigonometria(angulo, dado, valor, buscado);
      revisar(r.demo, nombre);
      const { resultado, razon, incognitaArriba } = r.resumen;
      assert.ok(Number.isInteger(resultado) && resultado > 0, `${nombre}: resultado ${resultado}`);
      // la razon de los dos lados (numerador entre denominador) es el valor notable, con fracciones exactas y en decimal
      const num = incognitaArriba ? resultado : valor;
      const den = incognitaArriba ? valor : resultado;
      assert.ok(Math.abs(num / den - decimal(razon, angulo)) < 1e-9, `${nombre}: ${num}/${den} no es la razon del angulo`);
      // cuenta exacta con enteros: cociente = 1/q  <=>  den = q * num
      assert.equal(den, r.resumen.q * num, `${nombre}: cuenta`);
      // el movimiento tambien: nada desaparece y reaparece igual sin viajar
      assert.deepEqual(hallazgosEstilo(r.demo, nombre, "movimiento"), [], `${nombre}: movimiento`);
      razonesVistas.add(`${angulo}-${razon}-${incognitaArriba}`);
      casos++;
    }
    assert.ok(casos > 400, `pocos casos: ${casos}`);
    // las seis combinaciones limpias: sen30, cos60, tan45, cada una con la incognita arriba y abajo
    assert.equal(razonesVistas.size, 6);
  });

  test("el ejemplo clasico: hipotenusa 10, angulo 30, cateto opuesto = 5, con todos los pasos", () => {
    const r = trigonometria(30, "hip", 10, "op");
    assert.equal(r.resumen.resultado, 5);
    const texto = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of ["opuesto dividido entre la hipotenusa", "SOH, CAH, TOA", "Reemplazamos $\\theta$", "tabla de valores notables", "Reemplazamos $\\text{hip}$", "pasa al otro lado multiplicando", "Comprobamos"]) {
      assert.ok(texto.includes(pista), `falta el paso: ${pista}`);
    }
    // se reemplaza una letra por vez: el angulo, el lado conocido y la incognita son pasos separados
    const reemplazos = r.demo.transiciones.filter((t) => t.texto.startsWith("Reemplazamos"));
    assert.equal(reemplazos.length, 3);
  });

  test("la hipotenusa se halla pasando de a una las piezas al otro lado (sin cruz de golpe) y la tangente de 45 da catetos iguales", () => {
    const a = trigonometria(30, "op", 7, "hip");
    assert.equal(a.resumen.resultado, 14);
    assert.ok(a.demo.transiciones.some((t) => t.texto.includes("pasa al otro lado multiplicando")));
    const b = trigonometria(45, "ady", 9, "op");
    assert.equal(b.resumen.resultado, 9);
    const c = trigonometria(45, "op", 9, "ady");
    assert.equal(c.resumen.resultado, 9);
    // tan 45 con la incognita abajo (rama propia del despeje)
    const d = trigonometria(45, "op", 6, "ady");
    assert.equal(d.resumen.resultado, 6);
    assert.equal(d.resumen.incognitaArriba, 0);
    revisar(d.demo, "45 op=6 busca ady");
  });

  test("T1 define theta y cada abreviatura de los datos; el porque de descartar nombra el lado que sobra", () => {
    for (const [ang, k, v, u, sobra] of [[30, "hip", 10, "op", "cateto adyacente"], [60, "ady", 8, "hip", "cateto opuesto"], [45, "op", 6, "ady", "hipotenusa"]] as const) {
      const r = trigonometria(ang, k, v, u);
      // los nombres se dan de a poco: theta, luego cada lado y recien despues el dato y la incognita
      const t1 = r.demo.transiciones.slice(0, 5).map((t) => t.texto).join(" ");
      assert.ok(r.demo.transiciones[0].texto.includes("lo llamamos $\\theta$") && !r.demo.transiciones[0].texto.includes("cateto"), "T1 define algo mas que theta");
      for (const l of [k, u]) assert.ok(t1.includes(`$\\text{${l}}$`), `T1 no define ${l}`);
      assert.ok(t1.includes("cateto opuesto") && t1.includes("cateto adyacente") && t1.includes("hipotenusa"));
      const descarte = r.demo.transiciones.find((t) => t.texto.startsWith("Las otras dos razones"))!;
      assert.ok(descarte.porque.includes(sobra), `descarte no nombra ${sobra}`);
      // la tabla se presenta en un paso aparte del triangulo, y ningun porque adelanta la comprobacion
      const iTri = r.demo.transiciones.findIndex((t) => t.texto.includes("Anotamos esos dos lados"));
      assert.ok(!r.demo.transiciones[iTri].texto.includes("tabla de valores notables"), "triangulo y tabla en el mismo paso");
      assert.ok(r.demo.transiciones[iTri + 1].texto.includes("tabla de valores notables"));
      assert.ok(!r.demo.transiciones.slice(0, -4).some((t) => t.porque.includes("Se comprueba")), "porque adelanta la comprobacion");
    }
  });

  test("las razones no existen en el estado 0: cada una nace en la transicion que la nombra", () => {
    const r = trigonometria(30, "hip", 10, "op");
    const { estados, transiciones } = r.demo;
    for (const id of ["senf", "cosf", "tanf"]) {
      assert.ok(!estados[0].some((f) => f.id === id), `${id} ya esta en el estado 0`);
      const i = transiciones.findIndex((t) => (t.brotes ?? []).some((b) => b.hacia === id));
      assert.ok(i >= 0, `${id} nunca nace`);
      assert.ok(!estados[i].some((f) => f.id === id), `${id} ya existia antes de nacer`);
      assert.ok(estados[i + 1].some((f) => f.id === id), `${id} no existe despues de nacer`);
    }
  });

  test("validacion: raices, impares, lados repetidos y rangos", () => {
    assert.ok(validarTrigonometria(45, "hip", 10, "op")?.includes("raíz"), "sen 45 lleva raiz");
    assert.ok(validarTrigonometria(30, "hip", 10, "ady")?.includes("raíz"), "cos 30 lleva raiz");
    assert.ok(validarTrigonometria(60, "ady", 5, "op")?.includes("raíz"), "tan 60 lleva raiz");
    assert.ok(validarTrigonometria(30, "hip", 7, "op")?.includes("par"), "mitad de impar no es entera");
    assert.ok(validarTrigonometria(30, "op", 7, "hip") === null, "con la incognita abajo cualquier medida sirve");
    assert.ok(validarTrigonometria(30, "hip", 10, "hip"));
    assert.ok(validarTrigonometria(20, "hip", 10, "op"));
    assert.ok(validarTrigonometria(30, "hip", 0, "op"));
    assert.ok(validarTrigonometria(30, "hip", 100, "op"));
    assert.ok(validarTrigonometria(30.5, "hip", 10, "op"));
    assert.equal(validarTrigonometria(30, "hip", 10, "op"), null);
  });

  test("la regla de cada razon se muestra y el LaTeX lleva doble barra (nunca palabras sueltas)", () => {
    const r = trigonometria(60, "hip", 8, "ady");
    const reglas = r.demo.transiciones.map((t) => t.regla ?? "").join(" ");
    assert.ok(reglas.includes("\\text{cos}\\,\\theta=\\dfrac{\\text{ady}}{\\text{hip}}"));
    const todo = [r.demo.intro, ...r.demo.transiciones.flatMap((t) => [t.texto, t.porque, t.regla ?? ""])].join(" ");
    assert.ok(!/(^|[^\\a-zA-Z])(cdot|dfrac|text|theta|circ)\b/.test(todo), "orden de LaTeX sin barra");
    assert.ok(todo.includes("\\cdot"));
  });

  test("gramatica, SOH CAH TOA tras las tres razones y tabla presentada antes de usarse", () => {
    for (const [ang, d, v, b] of [[30, "hip", 10, "op"], [30, "op", 7, "hip"], [60, "hip", 8, "ady"], [45, "ady", 9, "op"]] as const) {
      const r = trigonometria(ang, d, v, b);
      const ts = r.demo.transiciones;
      const todo = [r.demo.intro, ...ts.flatMap((t) => [t.texto, t.porque])].join(" ");
      assert.ok(!todo.includes(" a el ") && !todo.includes(" de el "), "contraccion a el / de el");
      const iSoh = ts.findIndex((t) => t.porque.includes("SOH"));
      const iTan = ts.findIndex((t) => (t.brotes ?? []).some((x) => x.hacia === "tanf"));
      assert.equal(iSoh, iTan, "SOH CAH TOA va en el paso que crea la tercera razon");
      assert.ok(ts[iSoh].porque.includes("(S)") && ts[iSoh].porque.includes("(H)"));
      const iTabla = ts.findIndex((t) => t.texto.includes("tabla de valores notables"));
      const iUso = ts.findIndex((t) => t.texto.includes("Así queda la fila"));
      assert.ok(iTabla >= 0 && iTabla <= iUso, "la tabla se presenta antes de decir que queda una fila");
    }
  });

  test("estado final: sin fichas sueltas sin rotulo", () => {
    const r = trigonometria(30, "hip", 10, "op");
    const ult = r.demo.estados[r.demo.estados.length - 1];
    assert.ok(ult.every((f) => f.tex !== "" || f.salto), "ficha vacia");
    // ningun corte de renglon lleva texto (un salto tiene alto cero y el texto pisaria el renglon siguiente)
    assert.ok(ult.every((f) => !f.salto || (f.tex === "" && !f.frac)), "un salto con contenido");
    assert.ok(ult.some((f) => f.tex.includes("Comprobación")) && ult.some((f) => f.tex.includes("Tabla")));
  });

  test("la figura acompaña cada paso: resaltados de la razon, rotulos con el valor y triangulo de referencia marcado", () => {
    const DE: Record<string, string[]> = { sen: ["op", "hip"], cos: ["ady", "hip"], tan: ["op", "ady"] };
    const lado = (t: string) => t.split(" ")[0];
    const marcados = (f: { rotulos: { t: string; resaltado?: boolean }[] }) => f.rotulos.filter((r) => r.resaltado && /^(op|ady|hip)\b/.test(r.t)).map((r) => lado(r.t)).sort();
    const casos = [[30, "hip", 10, "op"], [30, "op", 7, "hip"], [60, "hip", 8, "ady"], [45, "ady", 9, "op"], [45, "op", 6, "ady"]] as const;
    for (const [ang, K, v, U] of casos) {
      const nombre = `${ang} ${K}=${v} busca ${U}`;
      const r = trigonometria(ang, K, v, U);
      const ts = r.demo.transiciones;
      const res = r.resumen.resultado;
      ts.forEach((t, i) => assert.ok(t.figura && t.figura.rotulos.length > 0, `${nombre}: paso ${i} sin figura`));
      const idx = (f: (t: (typeof ts)[number]) => boolean) => ts.findIndex(f);
      // nombres de a uno: theta, op, ady, hip y despues el dato y la incognita
      const iDato = idx((t) => t.texto.startsWith("Ya tenemos los nombres"));
      assert.equal(iDato, 4, `${nombre}: el dato y la incognita van despues de theta y los tres lados`);
      assert.ok(ts[0].figura!.rotulos.some((x) => x.resaltado && x.t.includes("θ")), `${nombre}: paso 0 no marca theta`);
      ["op", "ady", "hip"].forEach((l, k) => assert.deepEqual(marcados(ts[1 + k].figura!), [l], `${nombre}: el paso del ${l} no marca solo ese lado`));
      assert.deepEqual(marcados(ts[iDato].figura!), [K, U].sort(), `${nombre}: el paso del dato no marca los dos lados`);
      assert.ok(ts[iDato].figura!.rotulos.some((x) => x.t === `${K} = ${v}`), `${nombre}: el rotulo del lado conocido no lleva su valor`);
      // eleccion de razon: los resaltados son los dos lados de cada razon
      for (const rz of ["sen", "cos", "tan"]) {
        const i = idx((t) => (t.brotes ?? []).some((b) => b.hacia === `${rz}f`));
        assert.deepEqual(marcados(ts[i].figura!), [...DE[rz]].sort(), `${nombre}: ${rz} no marca sus dos lados`);
      }
      const iElegir = idx((t) => t.texto.startsWith("Tenemos "));
      assert.deepEqual(marcados(ts[iElegir].figura!), [K, U].sort(), `${nombre}: elegir no marca el conocido y el buscado`);
      // rotulos: K lleva su valor y U es x hasta la comprobacion, luego su resultado; solo el triangulo de referencia cambia los numeros
      const iCS = idx((t) => (t.brotes ?? []).some((b) => b.hacia === "CS"));
      let enReferencia = 0;
      ts.forEach((t, i) => {
        const rot = t.figura!.rotulos.map((x) => x.t);
        const referencia = rot.includes("triángulo de referencia");
        if (referencia) {
          enReferencia++;
          assert.ok(t.figura!.lineas.slice(0, 3).every((l) => l.discontinua), `${nombre}: paso ${i} la referencia no se dibuja distinta`);
          assert.ok(/triángulo de referencia/.test(t.texto) || i > idx((x) => /triángulo de referencia/.test(x.texto)), `${nombre}: paso ${i} no menciona la referencia`);
          return;
        }
        for (const x of rot) {
          const m = /^(op|ady|hip) = (.+)$/.exec(x);
          if (!m) continue;
          if (m[1] === K) assert.equal(m[2], `${v}`, `${nombre}: paso ${i} rotulo de ${K}`);
          else if (m[1] === U) assert.equal(m[2], i >= iCS ? `${res}` : "x", `${nombre}: paso ${i} rotulo de ${U}`);
          else assert.fail(`${nombre}: paso ${i} rotula el lado que no es dato ni incognita: ${x}`);
        }
        if (i >= iDato) {
          assert.ok(rot.includes(`${K} = ${v}`), `${nombre}: paso ${i} sin el valor de ${K}`);
          assert.ok(rot.includes(`${U} = ${i >= iCS ? res : "x"}`), `${nombre}: paso ${i} rotulo de ${U}`);
        }
      });
      assert.ok(enReferencia >= 2, `${nombre}: el triangulo de referencia no se marca`);
      // el triangulo de referencia se menciona en el texto del paso donde aparece
      const iRef = idx((t) => t.figura!.rotulos.some((x) => x.t === "triángulo de referencia"));
      assert.ok(ts[iRef].texto.includes("triángulo de referencia") && ts[iRef].texto.includes("no es el triángulo de tu ejercicio"), `${nombre}: el texto no dice que es otro triangulo`);
    }
  });

  test("tuteo: nada de voseo en el texto del alumno", () => {
    const r = trigonometria(30, "op", 6, "hip");
    const todo = [r.demo.intro, ...r.demo.transiciones.flatMap((t) => [t.texto, t.porque])].join(" ");
    assert.ok(!/\b(podés|hacé|vos|tenés|mirá|fijate|usá|elegí)\b/i.test(todo));
  });
});
