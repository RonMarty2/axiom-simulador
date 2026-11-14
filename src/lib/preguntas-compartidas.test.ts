import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  cargarReglasCompartidas,
  reglasActivasPara,
  prestarPreguntas,
  ampliarPoolConPrestadas,
} from "./preguntas-compartidas.ts";
import { vigenteDe, porIdDe, repartirCuotas, type FormatoExamen } from "./formatos-examen.ts";
import { parseExamenMD } from "./axiom/banco-parser.ts";
import { ocultarClave } from "./axiom/ocultar-clave.ts";
import type { ExamenBanco, ModoSimulacion, PreguntaBanco, Simulador } from "./axiom/types.ts";

const RAIZ_EXAMENES = join(process.cwd(), "data", "examenes", "umss");

function cargarFacultad(facultad: string): ExamenBanco[] {
  const dir = join(RAIZ_EXAMENES, facultad);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => parseExamenMD(readFileSync(join(dir, f), "utf-8")));
}

const examenesMedicina = cargarFacultad("medicina");
const examenesIngenieria = cargarFacultad("ingenieria");
const banco: ExamenBanco[] = [...examenesMedicina, ...examenesIngenieria];
const poolMedicina: PreguntaBanco[] = examenesMedicina.flatMap((e) => e.preguntas);
const poolIngenieria: PreguntaBanco[] = examenesIngenieria.flatMap((e) => e.preguntas);

const fichas = JSON.parse(
  readFileSync(join(process.cwd(), "data", "formatos-examen.json"), "utf-8")
) as FormatoExamen[];
const fichaPsa2027 = vigenteDe(fichas, "medicina");

function armarSegunFicha(pool: PreguntaBanco[], ficha: FormatoExamen): PreguntaBanco[] {
  const porArea = new Map<string, PreguntaBanco[]>();
  for (const p of pool) {
    const k = p.area ?? "";
    if (!porArea.has(k)) porArea.set(k, []);
    porArea.get(k)!.push(p);
  }
  const disponibles: Record<string, number> = {};
  for (const a of ficha.areas) disponibles[a.id] = porArea.get(a.id)?.length ?? 0;
  const cuotas = repartirCuotas(ficha, disponibles, ficha.preguntas);
  const elegidas: PreguntaBanco[] = [];
  for (const [area, n] of Object.entries(cuotas)) {
    elegidas.push(...(porArea.get(area) ?? []).slice(0, n));
  }
  return elegidas;
}

describe("preguntas compartidas (Ingeniería -> Medicina en predictivo)", () => {
  test("(a) con la regla activa, predictivo de medicina incluye preguntas con prestada y con área destino", () => {
    assert.ok(fichaPsa2027, "debe existir ficha vigente de medicina (psa-2027)");
    const reglas = cargarReglasCompartidas();
    const activas = reglasActivasPara(reglas, "medicina");
    assert.equal(activas.length, 1);
    assert.equal(activas[0].id, "medicina-desde-ingenieria");
    assert.equal(activas[0].origen, "ingenieria");

    const poolAmpliado = ampliarPoolConPrestadas({
      modo: "predictivo",
      facultad: "medicina",
      pool: poolMedicina,
      banco,
      ficha: fichaPsa2027,
      reglas,
    });

    const prestadas = poolAmpliado.filter((p) => p.prestada !== undefined);
    assert.ok(prestadas.length > 0, "el pool ampliado debe incluir preguntas prestadas");

    const areasPrestadas = new Set(prestadas.map((p) => p.area));
    assert.deepEqual(
      [...areasPrestadas].sort(),
      ["fisica", "matematicas", "quimica"],
      "las áreas destino de las prestadas deben ser física, matemáticas y química"
    );

    for (const p of prestadas) {
      assert.ok(p.id.startsWith("prestada:"), `id sin prefijo prestada:: ${p.id}`);
      assert.deepEqual(p.prestada, {
        desde: "ingenieria",
        etiqueta: "Pregunta de práctica de Ingeniería",
        nota: "Provisional hasta tener el temario oficial de la PSA 2027.",
      });
    }

    const seleccionadas = armarSegunFicha(poolAmpliado, fichaPsa2027);
    assert.equal(seleccionadas.length, fichaPsa2027.preguntas);
    const prestadasEnExamen = seleccionadas.filter((p) => p.prestada !== undefined);
    const propiasEnExamen = seleccionadas.filter((p) => p.prestada === undefined);
    assert.ok(prestadasEnExamen.length > 0, "el examen predictivo debe incluir prestadas");
    assert.ok(propiasEnExamen.length > 0, "el examen predictivo debe conservar preguntas propias de medicina");
    for (const area of ["quimica", "fisica", "matematicas"]) {
      assert.ok(
        prestadasEnExamen.some((p) => p.area === area),
        `el examen armado debe incluir preguntas prestadas del área ${area}`
      );
    }

    // Sobrevive a ocultarClave y serialización JSON (localStorage / API)
    const sim: Simulador = {
      id: "sim-test",
      usuario_id: "u-1",
      estado: "activo",
      fecha_inicio: new Date().toISOString(),
      respuestas_usuario: {},
      preguntas: seleccionadas,
    };
    const serializado = JSON.parse(JSON.stringify(ocultarClave(sim))) as Simulador;
    const prestadasDespues = (serializado.preguntas ?? []).filter((p) => p.prestada !== undefined);
    assert.equal(prestadasDespues.length, prestadasEnExamen.length);
    assert.deepEqual(prestadasDespues[0].prestada, prestadasEnExamen[0].prestada);
  });

  test("(b) con activo: false no aparece ninguna pregunta prestada", () => {
    const reglasInactivas = cargarReglasCompartidas().map((r) => ({
      ...r,
      activo: false,
    }));

    assert.equal(reglasActivasPara(reglasInactivas, "medicina").length, 0);
    assert.equal(
      prestarPreguntas(poolIngenieria, reglasInactivas[0], fichaPsa2027).length,
      0
    );

    const pool = ampliarPoolConPrestadas({
      modo: "predictivo",
      facultad: "medicina",
      pool: poolMedicina,
      banco,
      ficha: fichaPsa2027,
      reglas: reglasInactivas,
    });

    assert.equal(pool.length, poolMedicina.length);
    assert.equal(pool.some((p) => p.prestada !== undefined), false);
    assert.equal(pool.some((p) => p.id.startsWith("prestada:")), false);
  });

  test("(c) el banco original no queda mutado", () => {
    const fotoIngenieria = poolIngenieria.map((p) => ({
      id: p.id,
      area: p.area,
      enunciado: p.enunciado,
      primeraOpcion: p.opciones[0]?.texto,
      prestada: p.prestada,
    }));

    const reglas = cargarReglasCompartidas();
    const pool = ampliarPoolConPrestadas({
      modo: "predictivo",
      facultad: "medicina",
      pool: poolMedicina,
      banco,
      ficha: fichaPsa2027,
      reglas,
    });

    const unaPrestada = pool.find((p) => p.prestada !== undefined);
    assert.ok(unaPrestada);
    unaPrestada.area = "mutada";
    unaPrestada.enunciado = "mutado";
    unaPrestada.opciones[0].texto = "opcion mutada";
    unaPrestada.prestada!.nota = "nota mutada";

    poolIngenieria.forEach((p, idx) => {
      assert.equal(p.id, fotoIngenieria[idx].id);
      assert.equal(p.area, fotoIngenieria[idx].area);
      assert.equal(p.enunciado, fotoIngenieria[idx].enunciado);
      assert.equal(p.opciones[0]?.texto, fotoIngenieria[idx].primeraOpcion);
      assert.equal(p.prestada, undefined);
    });
    assert.equal(poolMedicina.some((p) => p.prestada !== undefined), false);
  });

  test("(d) todos los ids del pool ampliado son únicos y las prestadas llevan prefijo prestada:", () => {
    const reglas = cargarReglasCompartidas();
    const pool = ampliarPoolConPrestadas({
      modo: "predictivo",
      facultad: "medicina",
      pool: poolMedicina,
      // Incluso si el origen trajera elementos repetidos, no debe haber ids duplicados
      preguntasOrigen: [...poolIngenieria, ...poolIngenieria.slice(0, 10)],
      ficha: fichaPsa2027,
      reglas,
    });

    const ids = pool.map((p) => p.id);
    const unicos = new Set(ids);
    assert.equal(unicos.size, ids.length, "no debe haber ningún id repetido");
    for (const p of pool) {
      if (p.prestada) {
        assert.ok(p.id.startsWith("prestada:"), `pregunta prestada sin prefijo: ${p.id}`);
      } else {
        assert.ok(!p.id.startsWith("prestada:"), `pregunta propia con prefijo prestada: ${p.id}`);
      }
    }
  });

  test("(e) mixto, por_tema y examen_real nunca incluyen preguntas prestadas (ni si la ficha no pide el área)", () => {
    const reglas = cargarReglasCompartidas();
    const modosSinPrestadas: ModoSimulacion[] = [
      "mixto",
      "por_tema",
      "examen_real",
      "ia_generado",
      "mis_errores",
    ];

    for (const modo of modosSinPrestadas) {
      const pool = ampliarPoolConPrestadas({
        modo,
        facultad: "medicina",
        pool: poolMedicina,
        banco,
        ficha: fichaPsa2027,
        reglas,
      });
      assert.equal(
        pool.some((p) => p.prestada !== undefined || p.id.startsWith("prestada:")),
        false,
        `el modo ${modo} nunca debe incluir preguntas prestadas`
      );
      assert.equal(pool.length, poolMedicina.length);
    }

    // Si la ficha vigente no incluye las áreas destino (ej. curso-basico), tampoco se agregan en predictivo
    const fichaCursoBasico = porIdDe(fichas, "curso-basico");
    assert.ok(fichaCursoBasico);
    const poolSinAreas = ampliarPoolConPrestadas({
      modo: "predictivo",
      facultad: "medicina",
      pool: poolMedicina,
      banco,
      ficha: fichaCursoBasico,
      reglas,
    });
    assert.equal(poolSinAreas.some((p) => p.prestada !== undefined), false);
    assert.equal(poolSinAreas.length, poolMedicina.length);
  });
});
