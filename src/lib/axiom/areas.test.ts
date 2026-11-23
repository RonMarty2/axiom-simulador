import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  ETIQUETAS_AREA,
  etiquetaArea,
  temaActualDeArea,
  temasPorCarrera,
  agruparPorTemaActual,
  filtrarPorTemaActual,
} from "./areas.ts";
import { parseExamenMD } from "./banco-parser.ts";
import { vigenteDe, type FormatoExamen } from "../formatos-examen.ts";

interface ItemPregunta {
  id: string;
  area: string;
}

const fichas = JSON.parse(
  readFileSync("data/formatos-examen.json", "utf-8"),
) as FormatoExamen[];

const RAIZ_UMSS = path.join("data", "examenes", "umss");

function cargarPreguntasFacultad(facultad: string): ItemPregunta[] {
  const dir = path.join(RAIZ_UMSS, facultad);
  const archivos = readdirSync(dir).filter((f) => f.endsWith(".md"));
  const out: ItemPregunta[] = [];
  for (const archivo of archivos) {
    const raw = readFileSync(path.join(dir, archivo), "utf-8");
    const ex = parseExamenMD(raw);
    for (const p of ex.preguntas) {
      out.push({ id: `${ex.id}_p${p.numero}`, area: p.area });
    }
  }
  return out;
}

describe("mapa de áreas viejas a temas actuales por carrera", () => {
  test("cada area: que existe en el banco tiene destino válido y no se pierde ninguna pregunta", () => {
    const facultades = readdirSync(RAIZ_UMSS, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    assert.ok(facultades.length >= 3);

    for (const fac of facultades) {
      const ficha = vigenteDe(fichas, fac);
      const preguntas: ItemPregunta[] = cargarPreguntasFacultad(fac);
      assert.ok(preguntas.length > 0, `banco vacío en ${fac}`);

      const areasVistas = new Set(preguntas.map((p) => p.area));
      for (const areaVieja of areasVistas) {
        const destino = temaActualDeArea(fac, areaVieja, ficha);
        assert.ok(destino.length > 0, `destino vacío para ${fac}/${areaVieja}`);
        assert.ok(
          destino in ETIQUETAS_AREA,
          `destino ${destino} (de ${fac}/${areaVieja}) no tiene etiqueta en ETIQUETAS_AREA`,
        );
      }

      const temas = temasPorCarrera(fac, preguntas, ficha);
      const sumaTemas = temas.reduce((acc, t) => acc + t.cantidad, 0);
      assert.equal(
        sumaTemas,
        preguntas.length,
        `en ${fac} la suma por temas (${sumaTemas}) no coincide con el total del banco (${preguntas.length})`,
      );
    }
  });

  test("Medicina agrupa y filtra por sus temas actuales de psa-2027", () => {
    const fichaMed = vigenteDe(fichas, "medicina");
    assert.equal(fichaMed?.id, "psa-2027");

    const preguntas: ItemPregunta[] = cargarPreguntasFacultad("medicina");
    const temas = temasPorCarrera("medicina", preguntas, fichaMed);
    const idsTemas = temas.map((t) => t.id);

    const idsVigentesEsperados = fichaMed!.areas
      .map((a) => a.id)
      .filter((id) => preguntas.some((p) => temaActualDeArea("medicina", p.area, fichaMed) === id));

    assert.deepEqual(
      idsTemas.slice(0, idsVigentesEsperados.length),
      idsVigentesEsperados,
    );
    assert.ok(idsTemas.includes("morfofuncion"));
    assert.ok(idsTemas.includes("biologia_celular"));
    assert.ok(idsTemas.includes("investigacion"));

    for (const t of temas) {
      const filtradas: ItemPregunta[] = filtrarPorTemaActual<ItemPregunta>(
        "medicina",
        preguntas,
        t.id,
        fichaMed,
      );
      assert.equal(filtradas.length, t.cantidad);
    }

    const conteoErrores = agruparPorTemaActual(
      "medicina",
      [
        { area: "morfofuncion" },
        { area: "biologia_celular" },
        { area: "investigacion" },
        { area: "morfofuncion" },
      ],
      fichaMed,
    );
    assert.deepEqual(conteoErrores, {
      morfofuncion: 2,
      biologia_celular: 1,
      investigacion: 1,
    });
  });

  test("Ingeniería agrupa áreas viejas de matemática en matematicas y conserva estrategias_aprendizaje con su nombre propio", () => {
    const fichaIng = vigenteDe(fichas, "ingenieria");
    assert.equal(fichaIng?.id, "fcyt-admision-2025-2");

    assert.equal(temaActualDeArea("ingenieria", "aritmetica_algebra", fichaIng), "matematicas");
    assert.equal(temaActualDeArea("ingenieria", "geometria_trigonometria", fichaIng), "matematicas");
    assert.equal(
      temaActualDeArea("ingenieria", "estrategias_aprendizaje", fichaIng),
      "estrategias_aprendizaje",
    );

    const preguntas: ItemPregunta[] = cargarPreguntasFacultad("ingenieria");
    const temas = temasPorCarrera("ingenieria", preguntas, fichaIng);
    const ids = temas.map((t) => t.id);

    assert.ok(!ids.includes("aritmetica_algebra"));
    assert.ok(!ids.includes("geometria_trigonometria"));
    assert.ok(ids.includes("matematicas"));

    const estrategias = temas.find((t) => t.id === "estrategias_aprendizaje");
    assert.ok(estrategias, "estrategias_aprendizaje debe conservarse como tema propio");
    assert.equal(estrategias.nombre, etiquetaArea("estrategias_aprendizaje"));
    assert.equal(estrategias.vigente, false);

    const filtradasMat: ItemPregunta[] = filtrarPorTemaActual<ItemPregunta>(
      "ingenieria",
      preguntas,
      "matematicas",
      fichaIng,
    );
    const esperadasMat: ItemPregunta[] = preguntas.filter(
      (p) =>
        p.area === "matematicas" ||
        p.area === "aritmetica_algebra" ||
        p.area === "geometria_trigonometria",
    );
    assert.equal(filtradasMat.length, esperadasMat.length);
  });

  test("Económicas con ficha vigente fce-admision-2025-2026 agrupa sus 3 temas y conserva lenguaje e historia", () => {
    const fichaEco = vigenteDe(fichas, "economicas");
    assert.ok(fichaEco);
    assert.equal(fichaEco.id, "fce-admision-2025-2026");

    const preguntas: ItemPregunta[] = cargarPreguntasFacultad("economicas");
    const temas = temasPorCarrera("economicas", preguntas, fichaEco);
    const vigentes = temas.filter((t) => t.vigente).map((t) => t.id);
    assert.deepEqual(vigentes, ["matematicas", "economicas", "razonamiento"]);

    const totalTemas = temas.reduce((s, t) => s + t.cantidad, 0);
    assert.equal(totalTemas, preguntas.length);

    // Las áreas históricas (2011-2014) se conservan con vigente: false sin perder preguntas
    for (const hist of ["lenguaje", "historia"]) {
      const t = temas.find((x) => x.id === hist);
      assert.ok(t, `${hist} debe conservarse como área histórica`);
      assert.equal(t.vigente, false);
    }

    // Sin ficha vigente (null) no transforma áreas
    const sinFicha = temasPorCarrera("economicas", preguntas, null);
    assert.equal(sinFicha.every((t) => t.vigente === false), true);
  });
});
