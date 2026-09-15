import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parseExamenMD } from "./banco-parser.ts";

// La convención de "lo que no se puede leer" está escrita en
// examenes pasados/INVENTARIO.md. Lo que se cuida acá es que una pregunta que
// no se pudo transcribir quede DECLARADA en su número, en vez de saltearse:
// si se saltea, el examen pasa de 10 preguntas a 9 sin que nadie se entere y
// las que siguen se corren un lugar, con lo cual ya no se puede cruzar con el
// facsímil.

const CABECERA = [
  "---",
  "universidad: UMSS",
  "facultad: economicas",
  "anio: 2011",
  "duracion_minutos: 60",
  "total_preguntas: 2",
].join("\n");

function examenCon(bloqueFaltantes: string[], cuerpo?: string): string {
  return [
    CABECERA,
    ...bloqueFaltantes,
    "---",
    "",
    cuerpo ??
      [
        "## Pregunta 1",
        "area: matematicas",
        "tema: prueba",
        "dificultad: facil",
        "",
        "¿Cuánto es dos más dos?",
        "",
        "- A) 4",
        "- B) 5",
        "- C) 6",
        "- D) 7",
        "- E) Ninguno",
        "",
        "**respuesta:** A",
        "**explicacion:** Cuatro.",
      ].join("\n"),
  ].join("\n");
}

describe("faltantes · el parser", () => {
  test("lee una entrada completa", () => {
    const e = parseExamenMD(examenCon([
      "faltantes:",
      "  - numero: 7",
      "    motivo: ilegible",
      '    fuente: "FCE/bancos-de-practica/Banco.pdf p.21"',
      "    detalle: no se leen los exponentes",
    ]));
    assert.deepEqual(e.faltantes, [{
      numero: 7,
      motivo: "ilegible",
      fuente: "FCE/bancos-de-practica/Banco.pdf p.21",
      detalle: "no se leen los exponentes",
    }]);
  });

  test("lee varias y las deja ordenadas por número", () => {
    const e = parseExamenMD(examenCon([
      "faltantes:",
      "  - numero: 12",
      "    motivo: pagina-ausente",
      "    fuente: Banco.pdf p.11",
      "  - numero: 3",
      "    motivo: sin-opciones",
      "    fuente: Banco.pdf p.9",
    ]));
    assert.deepEqual(e.faltantes?.map((f) => f.numero), [3, 12]);
  });

  test("sin bloque faltantes, el campo queda sin definir", () => {
    assert.equal(parseExamenMD(examenCon([])).faltantes, undefined);
  });

  test("el bloque no se come la clave que viene después", () => {
    const e = parseExamenMD(examenCon([
      "faltantes:",
      "  - numero: 7",
      "    motivo: ilegible",
      "    fuente: Banco.pdf p.21",
      "opcion: 2da Opción",
      "titulo: Examen de prueba",
    ]));
    assert.equal(e.opcion, "2da Opción");
    assert.equal(e.titulo, "Examen de prueba");
    assert.equal(e.faltantes?.length, 1);
  });

  // Un `faltantes` mal escrito es peor que no tenerlo: diría que falta una
  // pregunta que en realidad está. Y el loader se come los errores del parser
  // con un console.error, así que un dato malo en silencio no lo ve nadie.
  test("rechaza un motivo que no está en la convención", () => {
    assert.throws(
      () => parseExamenMD(examenCon([
        "faltantes:",
        "  - numero: 7",
        "    motivo: no-se-entiende",
        "    fuente: Banco.pdf p.21",
      ])),
      /motivo/,
    );
  });

  test("rechaza una entrada sin fuente", () => {
    assert.throws(
      () => parseExamenMD(examenCon([
        "faltantes:",
        "  - numero: 7",
        "    motivo: ilegible",
      ])),
      /fuente/,
    );
  });

  test("rechaza un número repetido", () => {
    assert.throws(
      () => parseExamenMD(examenCon([
        "faltantes:",
        "  - numero: 7",
        "    motivo: ilegible",
        "    fuente: Banco.pdf p.21",
        "  - numero: 7",
        "    motivo: ilegible",
        "    fuente: Banco.pdf p.22",
      ])),
      /dos veces/,
    );
  });

  test("rechaza un número que no es un entero positivo", () => {
    for (const malo of ["0", "-3", "siete"]) {
      assert.throws(
        () => parseExamenMD(examenCon([
          "faltantes:",
          `  - numero: ${malo}`,
          "    motivo: ilegible",
          "    fuente: Banco.pdf p.21",
        ])),
        /numero/,
        `debería rechazar numero: ${malo}`,
      );
    }
  });
});

describe("faltantes · contra el banco real", () => {
  const RAIZ = join(process.cwd(), "data", "examenes", "umss");

  function todos() {
    if (!existsSync(RAIZ)) return [];
    const out = [];
    for (const facultad of readdirSync(RAIZ)) {
      const dir = join(RAIZ, facultad);
      for (const archivo of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
        try {
          out.push({
            nombre: `${facultad}/${archivo}`,
            examen: parseExamenMD(readFileSync(join(dir, archivo), "utf8")),
          });
        } catch { /* el test del banco ya se queja de los que no parsean */ }
      }
    }
    return out;
  }

  // ESTE es el que atrapa una pregunta perdida. Si alguien transcribe 9 de 10
  // y no declara la que falta, el frontmatter sigue diciendo 10 y esto avisa.
  test("las preguntas transcriptas más las declaradas dan el total del examen", () => {
    const fallos: string[] = [];
    for (const { nombre, examen } of todos()) {
      if (!examen.total_preguntas) continue;   // los que no lo declaran
      const reales = examen.preguntas.length + (examen.faltantes?.length ?? 0);
      if (reales !== examen.total_preguntas) {
        fallos.push(`${nombre}: declara ${examen.total_preguntas} y tiene ${reales} (${examen.preguntas.length} transcriptas + ${examen.faltantes?.length ?? 0} declaradas)`);
      }
    }
    assert.deepEqual(fallos, [], `exámenes a los que les falta una pregunta sin declararla:\n${fallos.join("\n")}`);
  });

  test("una pregunta no puede estar transcripta y declarada faltante a la vez", () => {
    const fallos: string[] = [];
    for (const { nombre, examen } of todos()) {
      const numeros = new Set(examen.preguntas.map((p) => p.numero));
      for (const f of examen.faltantes ?? []) {
        if (numeros.has(f.numero)) fallos.push(`${nombre}: la ${f.numero} está en las dos listas`);
      }
    }
    assert.deepEqual(fallos, [], fallos.join("\n"));
  });

  test("dentro de un examen no hay dos preguntas con el mismo número", () => {
    const fallos: string[] = [];
    for (const { nombre, examen } of todos()) {
      const vistos = new Set<number>();
      for (const p of examen.preguntas) {
        if (vistos.has(p.numero)) fallos.push(`${nombre}: la ${p.numero} aparece dos veces`);
        vistos.add(p.numero);
      }
    }
    assert.deepEqual(fallos, [], fallos.join("\n"));
  });
});
