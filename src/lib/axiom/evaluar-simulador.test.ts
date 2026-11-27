import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parseExamenMD } from "./banco-parser.ts";
import {
  evaluarSimulador,
  resolverExamenOrigen,
  type FuentesBancoExamen,
} from "./evaluar-simulador.ts";
import type { ExamenBanco, PreguntaBanco, Simulador } from "./types.ts";

function cargarDesdeDisco(relPath: string): ExamenBanco {
  const full = path.join(process.cwd(), relPath);
  return parseExamenMD(fs.readFileSync(full, "utf-8"));
}

function crearFuentes(examenes: ExamenBanco[]): FuentesBancoExamen {
  return {
    cargarExamen: async (id) => examenes.find((e) => e.id === id) ?? null,
    cargarBanco: async () => examenes,
  };
}

function armarSimulador(
  examen: ExamenBanco,
  config: NonNullable<Simulador["config"]>,
  respuestas: Record<string, string>,
): Simulador {
  return {
    id: "sim-test",
    usuario_id: "u-test",
    config,
    preguntas: examen.preguntas,
    respuestas_usuario: respuestas,
    estado: "activo",
    fecha_inicio: "2026-11-27T12:00:00.000Z",
  };
}

test("reproduce y corrige: examen_real con examen_id sin anio encuentra el examen y aplica ponderación", async () => {
  const ex2025 = cargarDesdeDisco("data/examenes/umss/economicas/2025-2op-2-2025.md");
  const fuentes = crearFuentes([ex2025]);

  // Así lo enviaba /practicar: examen_id sin anio
  const config = {
    modo: "examen_real" as const,
    universidad: "UMSS",
    facultad: "economicas",
    examen_id: ex2025.id,
  };

  const examenOrigen = await resolverExamenOrigen(config, fuentes);
  assert.ok(examenOrigen, "Debe resolver examenOrigen usando config.examen_id");
  assert.equal(examenOrigen.id, ex2025.id);

  // Acertar SOLO las 10 preguntas de matemáticas (10/30 = 33 % simple, pero peso oficial = 0.34 => 34/100)
  const respuestas: Record<string, string> = {};
  for (const p of ex2025.preguntas) {
    if (p.area === "matematicas") respuestas[p.id] = p.respuesta_correcta;
  }

  const sim = armarSimulador(ex2025, config, respuestas);
  const res = evaluarSimulador(sim, examenOrigen);
  assert.equal(res.desglose.matematicas, 100);
  assert.equal(res.nota_final, 34);
});

test("examen_real con examen_id y anio resuelve por examen_id aunque el id tenga sufijo de convocatoria", async () => {
  const ex1 = cargarDesdeDisco("data/examenes/umss/economicas/2025-1op-2-2025.md");
  const ex2 = cargarDesdeDisco("data/examenes/umss/economicas/2025-2op-2-2025.md");
  const fuentes = crearFuentes([ex1, ex2]);

  const examenOrigen = await resolverExamenOrigen(
    {
      modo: "examen_real",
      universidad: "UMSS",
      facultad: "economicas",
      anio: 2025,
      examen_id: ex2.id,
    },
    fuentes,
  );
  assert.equal(examenOrigen?.id, ex2.id);
});

test("examen_real legacy solo con anio resuelve si es único y devuelve undefined si hay varios en ese año", async () => {
  const ex1 = cargarDesdeDisco("data/examenes/umss/economicas/2025-1op-2-2025.md");
  const ex2 = cargarDesdeDisco("data/examenes/umss/economicas/2025-2op-2-2025.md");

  const unico = await resolverExamenOrigen(
    { modo: "examen_real", universidad: "UMSS", facultad: "economicas", anio: 2025 },
    crearFuentes([ex1]),
  );
  assert.equal(unico?.id, ex1.id);

  const ambiguo = await resolverExamenOrigen(
    { modo: "examen_real", universidad: "UMSS", facultad: "economicas", anio: 2025 },
    crearFuentes([ex1, ex2]),
  );
  assert.equal(ambiguo, undefined);
});

test("ponderación con pesos desiguales difiere claramente del promedio simple", () => {
  const mk = (id: string, area: string): PreguntaBanco => ({
    id,
    universidad: "UMSS",
    facultad: "economicas",
    anio: 2025,
    numero: 1,
    area,
    tema: "t",
    dificultad: "medio",
    enunciado: "?",
    opciones: [
      { letra: "A", texto: "si" },
      { letra: "B", texto: "no" },
    ],
    respuesta_correcta: "A",
  });

  const preguntas = [
    mk("a1", "matematicas"),
    mk("a2", "matematicas"),
    ...Array.from({ length: 8 }, (_, k) => mk(`b${k}`, "economicas")),
  ];
  const examen: ExamenBanco = {
    id: "umss-economicas-2025-test",
    universidad: "UMSS",
    facultad: "economicas",
    anio: 2025,
    duracion_minutos: 60,
    total_preguntas: 10,
    ponderacion: { matematicas: 0.8, economicas: 0.2 },
    preguntas,
  };

  // 2/2 en matemáticas (peso 0.80) y 0/8 en económicas (peso 0.20):
  // simple = 2/10 = 20; ponderada = 100 * 0.80 + 0 * 0.20 = 80
  const sim = armarSimulador(
    examen,
    { modo: "examen_real", universidad: "UMSS", facultad: "economicas", examen_id: examen.id },
    { a1: "A", a2: "A" },
  );

  assert.equal(evaluarSimulador(sim, undefined).nota_final, 20);
  assert.equal(evaluarSimulador(sim, examen).nota_final, 80);
});

test("examen con secciones_pendientes normaliza la ponderación sobre las áreas presentes", () => {
  const ex2011 = cargarDesdeDisco("data/examenes/umss/economicas/2011-1op-1-2011.md");
  // En 2011-1op-1-2011 historia (0.33) está pendiente y no tiene preguntas.
  const todasCorrectas: Record<string, string> = {};
  const soloLenguaje: Record<string, string> = {};
  for (const p of ex2011.preguntas) {
    todasCorrectas[p.id] = p.respuesta_correcta;
    if (p.area === "lenguaje") soloLenguaje[p.id] = p.respuesta_correcta;
  }

  const cfg = {
    modo: "examen_real" as const,
    universidad: "UMSS",
    facultad: "economicas",
    examen_id: ex2011.id,
  };
  assert.equal(evaluarSimulador(armarSimulador(ex2011, cfg, todasCorrectas), ex2011).nota_final, 100);
  // 100 * 0.33 / (0.34 + 0.33) = 49.25 -> 49
  assert.equal(evaluarSimulador(armarSimulador(ex2011, cfg, soloLenguaje), ex2011).nota_final, 49);
});
