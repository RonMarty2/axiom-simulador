import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { aplanar, type Demo, type Ficha } from "./datos.ts";
import { revisar } from "./revisar.ts";
import {
  REACCIONES,
  SUSTANCIAS,
  atomos,
  decimal,
  estequiometria,
  molesDeAtomos,
  validarEstequiometria,
  validarMolesDeAtomos,
  type Pide,
} from "./generadores-quimica.ts";

// Tabla y conteo PROPIOS del test (no los del generador), para que la cuenta se compruebe de forma independiente.
const MASA: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, K: 39, Ca: 40, Fe: 56, Zn: 65 };
function contar(formula: string): Record<string, number> {
  const c: Record<string, number> = {};
  const re = /([A-Z][a-z]?)(\d*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(formula))) c[m[1]] = (c[m[1]] ?? 0) + (m[2] ? Number(m[2]) : 1);
  return c;
}
const M = (f: string) => Object.entries(contar(f)).reduce((s, [e, n]) => s + n * MASA[e], 0);
const sinColor = (tex: string) => tex.replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/g, "$1");
// masas validas que se prueban por combinacion (sustancia y elemento, o reaccion, par de sustancias y unidad):
// todas las combinaciones quedan cubiertas sin que la suite tarde
const POR_COMBINACION = 4;
const ultimo = (d: Demo) => d.estados[d.estados.length - 1];
const buscar = (e: Ficha[], id: string) => aplanar(e).find((f) => f.id === id);

/** comprobaciones comunes a toda animacion de estequiometria */
function comun(d: Demo, etiqueta: string, esperado: string, unidad: string) {
  revisar(d, etiqueta);
  // la respuesta llega al "?" del enunciado y es la esperada
  const fin = ultimo(d);
  assert.equal(buscar(fin, "qR")?.tex, esperado, `${etiqueta}: la respuesta del enunciado`);
  assert.equal(buscar(fin, "res")?.tex, esperado, `${etiqueta}: el resultado de la cuenta`);
  // sobrevive la unidad que piden
  assert.equal(buscar(fin, "lu")?.tex, unidad, `${etiqueta}: la unidad que queda`);
  assert.equal(buscar(fin, "uq")?.tex, unidad, `${etiqueta}: la unidad que piden`);
  // cada tachado cancela la MISMA unidad de la MISMA sustancia, una arriba y otra abajo (4 piezas: unidad y sustancia dos veces)
  d.transiciones.forEach((t, i) => {
    for (const f of t.fusiones.filter((f) => f.modo === "tachar")) {
      assert.equal(f.desde.length, 4, `${etiqueta}: T${i} tacha de a una unidad`);
      const tex = f.desde.map((id) => buscar(d.estados[i], id)!.tex);
      assert.equal(tex[0], tex[2], `${etiqueta}: T${i} la unidad de arriba y la de abajo son la misma`);
      assert.equal(tex[1], tex[3], `${etiqueta}: T${i} la sustancia de arriba y la de abajo son la misma`);
      assert.ok(tex[0] === "\\text{g}" || tex[0] === "\\text{mol}", `${etiqueta}: T${i} tacha una unidad`);
    }
  });
  // lo que no cambia queda quieto: las piezas del enunciado siguen en todos los estados (salvo el "?", que se vuelve la respuesta)
  const enunciado = d.estados[0].map((f) => f.id).filter((id) => id !== "q");
  for (const e of d.estados) for (const id of enunciado) assert.ok(e.some((f) => f.id === id), `${etiqueta}: la pieza ${id} del enunciado se movio`);
  // ARRASTRE: en todo paso que mueve piezas ("viajar"), cada pieza nueva nace de una que se va o que se queda (brote)
  d.transiciones.forEach((t, i) => {
    const viajan = t.fusiones.filter((f) => f.modo === "viajar");
    for (const f of viajan) {
      const destinos = (Array.isArray(f.hacia) ? f.hacia : [f.hacia as string]).filter((h) => !buscar(d.estados[i + 1], h)?.frac && !buscar(d.estados[i + 1], h)?.op);
      for (const h of destinos) assert.ok((t.brotes ?? []).some((b) => b.hacia === h), `${etiqueta}: T${i} la pieza ${h} aparece sin viajar desde su origen`);
    }
  });
  // cada paso dice su porque y su regla; el texto del alumno va en tuteo, sin "/" ni "÷"
  for (const t of d.transiciones) {
    assert.ok(t.regla && t.regla.includes("$"), `${etiqueta}: paso sin regla: ${t.texto}`);
    for (const s of [t.texto, t.porque, d.intro]) {
      assert.ok(!/\b(podés|tenés|hacé|mirá|fijate|sabés|querés|vos)\b/i.test(s), `${etiqueta}: voseo en "${s}"`);
      assert.ok(!s.replace(/\$[^$]*\$/g, "").includes("/"), `${etiqueta}: barra suelta en "${s}"`);
    }
  }
}

describe("estequiometria: tablas", () => {
  test("toda reaccion de la tabla esta balanceada (conteo propio del test)", () => {
    for (const [nombre, r] of Object.entries(REACCIONES)) {
      const lado = (xs: [number, string][]) => {
        const c: Record<string, number> = {};
        for (const [k, f] of xs) for (const [e, n] of Object.entries(contar(f))) c[e] = (c[e] ?? 0) + k * n;
        return c;
      };
      assert.deepEqual(lado(r.reactivos), lado(r.productos), `${nombre} no esta balanceada`);
      for (const [, f] of [...r.reactivos, ...r.productos]) assert.ok(f in SUSTANCIAS, `${nombre}: ${f} no esta en la tabla de sustancias`);
    }
  });
  test("toda sustancia se lee bien y su masa molar coincide con la tabla propia", () => {
    for (const f of Object.keys(SUSTANCIAS)) {
      const at = atomos(f);
      assert.ok(at, `${f} no se puede leer`);
      assert.deepEqual(Object.fromEntries(at!), contar(f));
    }
    assert.equal(M("C6H12O6"), 180);
    assert.equal(M("H2O"), 18);
  });
  test("una reaccion desbalanceada se rechaza", () => {
    REACCIONES["_mal"] = { reactivos: [[1, "H2"], [1, "O2"]], productos: [[1, "H2O"]] };
    try {
      assert.ok(validarEstequiometria("_mal", "H2", "H2O", 2, "g"));
    } finally {
      delete REACCIONES["_mal"];
    }
  });
  test("decimal con coma del colegio", () => {
    assert.equal(decimal(100), "1");
    assert.equal(decimal(250), "2{,}5");
    assert.equal(decimal(225), "2{,}25");
    assert.equal(decimal(5), "0{,}05");
  });
});

describe("moles de atomos en un compuesto", () => {
  test("la pregunta real (UMSS Ingenieria 2024, 1ra opcion, P16): 30 g de glucosa tienen 1 mol de atomos de O, letra A", () => {
    // el enunciado y la clave se leen del banco, no se copian a mano
    const md = readFileSync("data/examenes/umss/ingenieria/2024-1op-1-2024.md", "utf8");
    const bloque = md.split("## Pregunta 16")[1].split("## Pregunta 17")[0];
    assert.ok(bloque.includes("30 g de glucosa"));
    const letra = bloque.match(/\*\*respuesta:\*\*\s*([A-E])/)![1];
    const opcion = bloque.match(new RegExp(`- ${letra}\\) (.+)`))![1].trim();
    assert.equal(validarMolesDeAtomos("C6H12O6", "O", 30), null);
    const r = molesDeAtomos("C6H12O6", "O", 30);
    comun(r.demo, "glucosa", "1", "\\text{mol}");
    assert.equal(sinColor(buscar(ultimo(r.demo), "qR")!.tex), opcion, "coincide con la opcion correcta del banco");
    // los numeros del paso a paso del banco: masa molar 180 y 6 atomos de O por molecula
    assert.equal(r.resumen.MA, 180);
    assert.equal(r.resumen.b, 6);
    const todo = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of ["tabla periódica", "$6\\cdot 12$", "$12\\cdot 1$", "$6\\cdot 16$", "$72+12=84$", "$84+96=180$", "pesa $180\\ \\text{g}$", "raya de la fracción", "se tachan", "subíndice", "$30\\cdot 6=180$", "\\dfrac{180}{180}=1", "signo de pregunta", "sobrevivió"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
  });

  test("toda combinacion permitida: revisar y cuenta comprobada con la tabla propia", () => {
    let casos = 0;
    for (const f of Object.keys(SUSTANCIAS)) {
      if (Object.keys(contar(f)).length === 1 && contar(f)[f] === 1) continue; // elemento suelto (Fe): no aplica
      for (const e of Object.keys(contar(f))) {
        let aqui = 0;
        for (let masa = 1; masa <= 2000 && aqui < POR_COMBINACION; masa++) {
          if (validarMolesDeAtomos(f, e, masa)) continue;
          aqui++;
          const r = molesDeAtomos(f, e, masa);
          const k = contar(f)[e];
          const MA = M(f);
          assert.equal(r.resumen.MA, MA, `${f}: masa molar`);
          // centesimas * M = masa * k * 100, en enteros (sin redondeo)
          assert.equal(r.resumen.centesimas * MA, masa * k * 100, `${masa} g de ${f}, ${e}`);
          comun(r.demo, `${masa}g ${f} -> mol ${e}`, decimal(r.resumen.centesimas), "\\text{mol}");
          casos++;
        }
        assert.ok(aqui > 0, `${f} con ${e}: ninguna masa valida`);
      }
    }
    assert.ok(casos > 150, `solo ${casos} casos`);
  });

  test("un elemento sin subindice (el O del agua) dice que hay 1 atomo", () => {
    const r = molesDeAtomos("H2O", "O", 36);
    const todo = r.demo.transiciones.map((t) => t.texto).join(" | ");
    assert.ok(todo.includes("no lleva subíndice"));
    assert.equal(buscar(ultimo(r.demo), "qR")!.tex, "2");
  });

  test("fuera de los limites el validador avisa", () => {
    assert.ok(validarMolesDeAtomos("Fe", "Fe", 56), "un elemento suelto no es una molecula");
    assert.ok(validarMolesDeAtomos("H2O", "C", 18), "el agua no tiene carbono");
    assert.ok(validarMolesDeAtomos("H2O", "O", 0));
    assert.ok(validarMolesDeAtomos("H2O", "O", 1.5));
    assert.ok(validarMolesDeAtomos("H2O", "O", 10), "10 entre 18 no es exacto");
    assert.ok(validarMolesDeAtomos("XYZ", "O", 10));
  });
});

describe("estequiometria con ecuacion balanceada", () => {
  test("toda combinacion permitida: revisar y cuenta comprobada con la tabla propia", () => {
    let casos = 0;
    for (const [nombre, r] of Object.entries(REACCIONES)) {
      const todas = [...r.reactivos, ...r.productos];
      for (const [a, A] of todas) {
        for (const [b, B] of todas) {
          if (A === B) continue;
          for (const pide of ["mol", "g"] as Pide[]) {
            let aqui = 0;
            for (let masa = 1; masa <= 2000 && aqui < POR_COMBINACION; masa++) {
              if (validarEstequiometria(nombre, A, B, masa, pide)) continue;
              aqui++;
              const res = estequiometria(nombre, A, B, masa, pide);
              // n_A = masa / M_A ; n_B = n_A * b / a ; m_B = n_B * M_B  (en enteros: centesimas * M_A * a = masa * b * (M_B) * 100)
              const MB = pide === "g" ? M(B) : 1;
              assert.equal(res.resumen.centesimas * M(A) * a, masa * b * MB * 100, `${nombre}: ${masa} g ${A} -> ${pide} ${B}`);
              assert.equal(res.resumen.MA, M(A));
              comun(res.demo, `${nombre}: ${masa}g ${A} -> ${pide} ${B}`, decimal(res.resumen.centesimas), pide === "g" ? "\\text{g}" : "\\text{mol}");
              // los coeficientes de la relacion nacen de la ecuacion
              const t = res.demo.transiciones.find((t) => t.texto.startsWith("De la ecuación balanceada"))!;
              assert.ok(t.brotes!.every((br) => /^[ke]\d+$/.test(br.desde)), "los numeros de la relacion salen de la ecuacion");
              casos++;
            }
            assert.ok(aqui > 0, `${nombre}: ${A} -> ${pide} ${B}: ninguna masa valida`);
          }
        }
      }
    }
    assert.ok(casos > 500, `solo ${casos} casos`);
  });

  test("8 g de H2 forman 72 g de agua: tres factores, tres tachados, la masa molar de los dos", () => {
    const r = estequiometria("formacion-agua", "H2", "H2O", 8, "g");
    assert.equal(buscar(ultimo(r.demo), "qR")!.tex, "72");
    assert.equal(r.demo.transiciones.filter((t) => t.fusiones.some((f) => f.modo === "tachar")).length, 3);
    const todo = r.demo.transiciones.map((t) => `${t.texto} ${t.porque}`).join(" | ");
    for (const pista of ["balanceada", "$\\mathrm{H}$: $4$ y $4$", "pesa $2\\ \\text{g}$", "pesa $18\\ \\text{g}$", "coeficientes", "al revés", "$16\\cdot 18=288$", "\\dfrac{288}{4}=72"]) {
      assert.ok(todo.includes(pista), `falta el paso: ${pista}`);
    }
  });

  test("un coeficiente que no se ve se dice: delante del O2 hay un 1", () => {
    const r = estequiometria("formacion-agua", "O2", "H2O", 32, "mol");
    const t = r.demo.transiciones.find((t) => t.texto.startsWith("De la ecuación balanceada"))!;
    assert.ok(t.texto.includes("no hay número: eso significa $1$"));
    assert.equal(buscar(ultimo(r.demo), "qR")!.tex, "2");
  });

  test("resultado con decimales: 10 g de CaCO3 dan 5,6 g de CaO", () => {
    assert.equal(validarEstequiometria("descomposicion-caliza", "CaCO3", "CaO", 10, "g"), null);
    const r = estequiometria("descomposicion-caliza", "CaCO3", "CaO", 10, "g");
    assert.equal(buscar(ultimo(r.demo), "qR")!.tex, "5{,}6");
  });

  test("fuera de los limites el validador avisa", () => {
    assert.ok(validarEstequiometria("formacion-agua", "H2", "H2", 2, "g"));
    assert.ok(validarEstequiometria("formacion-agua", "H2", "CO2", 2, "g"));
    assert.ok(validarEstequiometria("no-existe", "H2", "H2O", 2, "g"));
    assert.equal(validarEstequiometria("formacion-agua", "H2", "H2O", 3, "mol"), null, "3 g de H2 dan 1,5 mol de agua: exacto");
    assert.ok(validarEstequiometria("combustion-metano", "CH4", "CO2", 5, "mol"), "5 entre 16 da 0,3125: mas de dos decimales");
  });
});
