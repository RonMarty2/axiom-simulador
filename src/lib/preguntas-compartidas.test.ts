import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  cargarReglasCompartidas,
  reglasActivasPara,
  prestarPreguntas,
  ampliarPoolConPrestadas,
  cargarPreguntasArchivo,
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
    // Desde el 15-nov-2026 hay tres reglas activas: Ingeniería y la práctica PSA 2027 (data/practica: MFQ y Comprensión Lectora).
    assert.deepEqual(activas.map((r) => r.id).sort(), [
      "medicina-desde-ingenieria",
      "medicina-practica-psa-2027-lectura",
      "medicina-practica-psa-2027-mfq",
    ]);
    assert.equal(activas.find((r) => r.id === "medicina-desde-ingenieria")?.origen, "ingenieria");

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
        nota: "Viene de un examen de Ingeniería y es de un tema que pide la lista oficial de la PSA 2027.",
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

  test("(e) mixto y examen_real nunca incluyen preguntas prestadas (ni si la ficha no pide el área)", () => {
    const reglas = cargarReglasCompartidas();
    const modosSinPrestadas: ModoSimulacion[] = [
      "mixto",
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

  test("(f) por_tema también presta (15-nov-2026), con el área de Medicina", () => {
    const reglas = cargarReglasCompartidas();
    const pool = ampliarPoolConPrestadas({
      modo: "por_tema",
      facultad: "medicina",
      pool: poolMedicina,
      banco,
      ficha: fichaPsa2027,
      reglas,
    });
    const prestadas = pool.filter((p) => p.prestada !== undefined);
    assert.ok(prestadas.length > 0, "por_tema debe incluir prestadas");
    for (const p of prestadas) assert.ok(["matematicas", "fisica", "quimica"].includes(p.area), p.area);
  });

  test("(g) temas fuera de la Lista PSA 2027 (temas_excluidos) no se prestan", () => {
    const [regla] = reglasActivasPara(cargarReglasCompartidas(), "medicina");
    assert.ok(regla && (regla.temas_excluidos ?? []).length > 0);
    const base = poolIngenieria.find((p) => p.area === "quimica");
    assert.ok(base);
    const fuera = { ...base, id: "x-hess", tema: "ley-de-hess-calor-de-formacion" };
    const dentro = { ...base, id: "x-sol", tema: "molaridad-dilucion" };
    // Aquí se prueba solo la exclusión por patrón; la lista permitida se prueba en (h).
    const soloExcluidos = { ...regla, temas_permitidos: undefined };
    const ids = prestarPreguntas([fuera, dentro], soloExcluidos, fichaPsa2027).map((p) => p.id);
    assert.deepEqual(ids, ["prestada:x-sol"]);
    const todas = prestarPreguntas(poolIngenieria, regla, fichaPsa2027);
    const res = (regla.temas_excluidos ?? []).map((t) => new RegExp(t, "i"));
    assert.equal(todas.some((p) => res.some((r) => r.test(p.tema ?? ""))), false);
  });

  test("(h) con temas_permitidos solo se presta lo clasificado DENTRO del temario PSA 2027", () => {
    const [regla] = reglasActivasPara(cargarReglasCompartidas(), "medicina");
    assert.ok(regla?.temas_permitidos && regla.temas_permitidos.length > 0, "la regla debe traer la lista");
    const base = poolIngenieria.find((p) => p.area === "fisica");
    assert.ok(base);
    const r2 = { ...regla, temas_permitidos: ["mru-encuentro"] };
    const ids = prestarPreguntas(
      [{ ...base, id: "x-ok", tema: "mru-encuentro" }, { ...base, id: "x-nuevo", tema: "tema-sin-clasificar" }],
      r2,
      fichaPsa2027
    ).map((p) => p.id);
    assert.deepEqual(ids, ["prestada:x-ok"]);
    const permitidos = new Set(regla.temas_permitidos);
    const todas = prestarPreguntas(poolIngenieria, regla, fichaPsa2027);
    assert.ok(todas.length > 0);
    assert.equal(todas.every((p) => permitidos.has(p.tema ?? "")), true);
  });
});

describe("práctica PSA 2027 (data/practica, 15-nov-2026)", () => {
  const regla = cargarReglasCompartidas().find((r) => r.id === "medicina-practica-psa-2027-mfq");

  test("el archivo trae las 98 preguntas DENTRO de la convocatoria, solo de Matemática, Física y Química", () => {
    assert.ok(regla?.archivo, "debe existir la regla con archivo");
    const ps = cargarPreguntasArchivo(regla!.archivo!);
    assert.equal(ps.length, 98);
    assert.deepEqual([...new Set(ps.map((p) => p.area))].sort(), ["fisica", "matematicas", "quimica"]);
    for (const p of ps) {
      assert.equal(p.opciones.length, 4, p.id);
      assert.ok(p.opciones.some((o) => o.letra === p.respuesta_correcta), p.id);
    }
  });

  test("entran a «Por tema» de Medicina con su etiqueta propia y sin tocar los exámenes", () => {
    const ps = cargarPreguntasArchivo(regla!.archivo!);
    const pool = ampliarPoolConPrestadas({
      modo: "por_tema",
      facultad: "medicina",
      pool: [],
      preguntasOrigen: (orig) => (orig === "practica-psa-2027" ? ps : []),
      ficha: fichaPsa2027,
    });
    const propias = pool.filter((p) => p.prestada?.etiqueta === "Pregunta de práctica PSA 2027");
    assert.equal(propias.length, 98);
    assert.ok(propias.every((p) => p.id.startsWith("prestada:")));
  });

  test("no aparece como examen en data/examenes", () => {
    const titulos = cargarFacultad("medicina").map((e) => e.titulo ?? "");
    assert.ok(!titulos.some((t) => /Práctica PSA 2027/.test(t)));
  });
});

describe("práctica PSA 2027 · Comprensión Lectora (data/practica, 15-nov-2026)", () => {
  const regla = cargarReglasCompartidas().find((r) => r.id === "medicina-practica-psa-2027-lectura");

  test("el archivo trae 20 preguntas de comprension_lectora, 4 opciones y clave válida", () => {
    assert.ok(regla?.archivo, "debe existir la regla con archivo");
    const ps = cargarPreguntasArchivo(regla!.archivo!);
    assert.equal(ps.length, 20);
    assert.deepEqual([...new Set(ps.map((p) => p.area))], ["comprension_lectora"]);
    for (const p of ps) {
      assert.equal(p.opciones.length, 4, p.id);
      assert.ok(p.opciones.some((o) => o.letra === p.respuesta_correcta), p.id);
    }
  });

  test("tiene origen propio: no pisa al archivo de MFQ cuando el simulacro carga los dos", () => {
    const mfq = cargarReglasCompartidas().find((r) => r.id === "medicina-practica-psa-2027-mfq");
    assert.notEqual(regla!.origen.toLowerCase(), mfq!.origen.toLowerCase());
  });

  test("entran al simulacro (predictivo) de Medicina con la etiqueta de práctica PSA 2027", () => {
    const ps = cargarPreguntasArchivo(regla!.archivo!);
    const pool = ampliarPoolConPrestadas({
      modo: "predictivo",
      facultad: "medicina",
      pool: [],
      preguntasOrigen: (orig) => (orig === regla!.origen ? ps : []),
      ficha: fichaPsa2027,
    });
    const lectura = pool.filter((p) => p.area === "comprension_lectora" && p.prestada?.etiqueta === "Pregunta de práctica PSA 2027");
    assert.equal(lectura.length, 20);
  });
});
