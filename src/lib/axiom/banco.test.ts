import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { parseExamenMD } from "./banco-parser.ts";

// Tests sobre el banco REAL, con el parser REAL. La BITACORA §7 documenta
// varios casos en que un .md mal formado rompió el banco en silencio: el
// parser fallaba, el loader se comía el error con un console.error y el examen
// simplemente desaparecía de la lista sin que nadie lo notara. Esto lo levanta.

const require = createRequire(join(process.cwd(), "package.json"));
const katex = require("katex");

const RAIZ = join(process.cwd(), "data", "examenes", "umss");

function examenes(): { ruta: string; nombre: string; contenido: string }[] {
  const out = [];
  for (const facultad of readdirSync(RAIZ)) {
    const dir = join(RAIZ, facultad);
    for (const archivo of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const ruta = join(dir, archivo);
      out.push({ ruta, nombre: `${facultad}/${archivo}`, contenido: readFileSync(ruta, "utf8") });
    }
  }
  return out;
}

const TODOS = existsSync(RAIZ) ? examenes() : [];

describe("banco de exámenes", () => {
  test("hay exámenes que revisar", () => {
    assert.ok(TODOS.length > 100, `se esperaban >100 exámenes, hay ${TODOS.length}`);
  });

  test("todos parsean sin tirar error", () => {
    const rotos: string[] = [];
    for (const e of TODOS) {
      try {
        parseExamenMD(e.contenido);
      } catch (err) {
        rotos.push(`${e.nombre}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    assert.deepEqual(rotos, [], `exámenes que el parser no puede leer:\n${rotos.join("\n")}`);
  });

  test("cada respuesta correcta tiene una opción que le corresponde", () => {
    // El caso que más duele: la pregunta se muestra, el alumno responde, y
    // ninguna opción coincide con la respuesta marcada.
    const fallos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        const letras = p.opciones.map((o) => o.letra);
        if (!letras.includes(p.respuesta_correcta)) {
          fallos.push(`${e.nombre} · ${p.id}: respuesta ${p.respuesta_correcta}, opciones ${letras.join(",")}`);
        }
      }
    }
    assert.deepEqual(fallos, [], `respuestas sin opción:\n${fallos.join("\n")}`);
  });

  test("no hay ids repetidos en todo el banco", () => {
    // Dos exámenes con el mismo id hacen que uno tape al otro en la UI.
    const vistos = new Map<string, string>();
    const repetidos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      const previo = vistos.get(examen.id);
      if (previo) repetidos.push(`${examen.id}: ${previo} y ${e.nombre}`);
      else vistos.set(examen.id, e.nombre);
    }
    assert.deepEqual(repetidos, [], `ids de examen repetidos:\n${repetidos.join("\n")}`);
  });

  test("ninguna pregunta se queda sin opciones", () => {
    const fallos: string[] = [];
    for (const e of TODOS) {
      let examen;
      try { examen = parseExamenMD(e.contenido); } catch { continue; }
      for (const p of examen.preguntas) {
        if (p.opciones.length < 2) fallos.push(`${e.nombre} · ${p.id}: ${p.opciones.length} opciones`);
      }
    }
    assert.deepEqual(fallos, [], `preguntas sin opciones suficientes:\n${fallos.join("\n")}`);
  });

  // Trinquete: preguntas donde el alumno ve el cartel de "figura en
  // preparación" en vez del dibujo. Este test NO exige arreglarlas de golpe;
  // exige que el número no crezca. Cada figura que se dibuje, se baja el tope.
  // Si alguien agrega una pregunta nueva con figura sin implementarla, el test
  // lo frena en el acto.
  //
  // Se descuentan las que traen su propio <svg> en el enunciado: el render
  // prioriza figura_svg sobre figura (ver examenes/[id] y resueltos/[examenId]),
  // así que esas nunca llegan a FiguraExamen y se ven perfectas. El `figura:`
  // que arrastran es un resto muerto. Contarlas inflaba el problema.
  const FIGURAS_PENDIENTES_TOPE = 23;

  test("el banco no pide figuras nuevas sin dibujar", () => {
    // Los ids implementados se leen del propio definiciones.ts en vez de
    // importarlo: ese módulo importa "./motor" sin extensión, y node --test
    // ejecuta ESM, donde la extensión es obligatoria. Cambiar los imports de
    // la app para acomodar un test sería la cola moviendo al perro.
    const fuente = readFileSync(join(process.cwd(), "src", "lib", "figuras", "definiciones.ts"), "utf8");
    const mapa = fuente.slice(fuente.indexOf("CONSTRUCTORES"));
    const implementadas = new Set([...mapa.matchAll(/"([a-z0-9][a-z0-9-]*)"\s*:/g)].map((m) => m[1]));
    // Cordura: si el formato del archivo cambia y el regex deja de matchear,
    // esto avisa en vez de dar por "faltante" absolutamente todo.
    assert.ok(implementadas.size >= 10, `no se pudieron leer los ids de definiciones.ts (${implementadas.size})`);

    const faltantes = new Map<string, string[]>();
    for (const e of TODOS) {
      // Por bloque de pregunta, no por archivo: el <svg> de una no cubre a otra.
      for (const bloque of e.contenido.split(/^---\s*$/m)) {
        const m = bloque.match(/^figura:\s*([a-z0-9][a-z0-9-]*)\s*$/im);
        if (!m) continue;
        const id = m[1];
        if (implementadas.has(id)) continue;
        if (/<svg[\s>]/i.test(bloque)) continue;   // ya trae su propio dibujo
        if (!faltantes.has(id)) faltantes.set(id, []);
        faltantes.get(id)!.push(e.nombre);
      }
    }
    const total = [...faltantes.values()].reduce((n, xs) => n + xs.length, 0);
    assert.ok(
      total <= FIGURAS_PENDIENTES_TOPE,
      `Subió la cantidad de preguntas con figura sin dibujar: ${total} (tope ${FIGURAS_PENDIENTES_TOPE}).\n` +
        `Ids sin figura:\n${[...faltantes.keys()].sort().join("\n")}`,
    );
    if (total < FIGURAS_PENDIENTES_TOPE) {
      console.log(`  ℹ figuras pendientes: ${total} (el tope está en ${FIGURAS_PENDIENTES_TOPE}, se puede bajar)`);
    }
  });

  test("toda la matemática se renderiza en KaTeX", () => {
    // Este es el que habría cachado \sen: no existe en KaTeX, y las 22
    // expresiones que lo usaban se le mostraban al alumno en rojo.
    // Se usa el mismo regex que MathText para separar math de texto.
    const RE = /(\$\$([^$]+)\$\$|\$([^$\n]+)\$)/g;
    const rotas: string[] = [];
    let total = 0;
    for (const e of TODOS) {
      e.contenido.split("\n").forEach((linea, i) => {
        RE.lastIndex = 0;
        let m;
        while ((m = RE.exec(linea)) !== null) {
          const display = m[2] !== undefined;
          total++;
          try {
            katex.renderToString(display ? m[2] : m[3], {
              displayMode: display, throwOnError: true, strict: "ignore", output: "html",
            });
          } catch (err) {
            if (rotas.length < 20) {
              rotas.push(`${e.nombre}:${i + 1}  $${display ? m[2] : m[3]}$  ->  ${(err instanceof Error ? err.message : "").split("\n")[0]}`);
            }
          }
        }
      });
    }
    assert.ok(total > 1000, `se esperaban miles de expresiones, hubo ${total}`);
    assert.deepEqual(rotas, [], `LaTeX que el alumno vería en rojo:\n${rotas.join("\n")}`);
  });
});
