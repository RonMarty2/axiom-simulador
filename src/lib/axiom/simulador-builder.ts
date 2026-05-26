import crypto from "crypto";
import { getFacultad } from "@/lib/data-store";
import { cargarBanco } from "./banco-loader";
import { generarPreguntasIA } from "./generador-ia";
import { esRespuestaCorrecta } from "./respuestas";
import type {
  ConfiguracionSimulacion,
  ExamenBanco,
  PreguntaBanco,
  Simulador,
} from "./types";

export interface ResultadoConstruccion {
  simulador: Simulador;
  examenOrigen?: ExamenBanco;
}

export async function construirSimulador(
  config: ConfiguracionSimulacion,
  usuarioId: string
): Promise<ResultadoConstruccion> {
  // Modos que generan con IA (no requieren banco cargado):
  //  - "ia_generado": examen fresco siguiendo distribución oficial
  //  - "mis_errores": examen enfocado en temas que el usuario falló antes
  //                   (el cliente pasa los temas en config.temas_reforzar)
  if (config.modo === "ia_generado" || config.modo === "mis_errores") {
    if (config.modo === "mis_errores") {
      if (!config.temas_reforzar || config.temas_reforzar.length === 0) {
        throw new Error(
          "Aún no tienes errores guardados. Completa al menos un examen para que la IA pueda reforzar los temas que te cuestan."
        );
      }
    }

    const cantidad = config.cantidad_preguntas ?? 20;
    // Cargamos la facultad para que la IA genere según SUS secciones (no las de
    // Economía). Cada facultad define sus propias secciones y pesos.
    const fac = await getFacultad(config.facultad);
    const preguntasIA = await generarPreguntasIA({
      universidad: config.universidad,
      facultad: config.facultad,
      facultad_nombre: fac?.nombre,
      secciones: fac?.areas,
      ponderacion: fac?.ponderacion,
      cantidad,
      dificultad: config.dificultad,
      temas_reforzar: config.temas_reforzar,
      temas_evitar: config.temas_evitar,
    });

    const duracionIA = Math.max(15, preguntasIA.length * 2);
    const simuladorIA: Simulador = {
      id: `sim-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
      usuario_id: usuarioId,
      config,
      preguntas: preguntasIA,
      respuestas_usuario: {},
      marcadas: [],
      estado: "activo",
      fecha_inicio: new Date().toISOString(),
      duracion_minutos: duracionIA,
    };
    return { simulador: simuladorIA };
  }

  const banco = await cargarBanco();
  const uniL = config.universidad.toLowerCase();
  const facL = config.facultad.toLowerCase();

  const examenesFacultad = banco.filter(
    (e) =>
      e.universidad.toLowerCase() === uniL &&
      e.facultad.toLowerCase() === facL
  );

  if (examenesFacultad.length === 0) {
    throw new Error(
      `No hay exámenes cargados para ${config.universidad} / ${config.facultad}`
    );
  }

  let preguntas: PreguntaBanco[] = [];
  let examenOrigen: ExamenBanco | undefined;

  switch (config.modo) {
    case "examen_real": {
      if (!config.anio) {
        throw new Error("Modo 'examen_real' requiere 'anio'");
      }
      const ex = examenesFacultad.find((e) => e.anio === config.anio);
      if (!ex) {
        throw new Error(
          `No hay examen del año ${config.anio} para esa facultad`
        );
      }
      preguntas = ex.preguntas;
      examenOrigen = ex;
      break;
    }

    case "mixto": {
      const pool = examenesFacultad.flatMap((e) => e.preguntas);
      const cantidad = Math.min(config.cantidad_preguntas ?? 20, pool.length);
      preguntas = mezclar(pool).slice(0, cantidad);
      break;
    }

    case "por_tema": {
      if (!config.tema) {
        throw new Error("Modo 'por_tema' requiere 'tema'");
      }
      const pool = examenesFacultad
        .flatMap((e) => e.preguntas)
        .filter((p) => p.tema === config.tema);
      if (pool.length === 0) {
        throw new Error(`No hay preguntas del tema '${config.tema}'`);
      }
      const cantidad = config.cantidad_preguntas
        ? Math.min(config.cantidad_preguntas, pool.length)
        : pool.length;
      preguntas = mezclar(pool).slice(0, cantidad);
      break;
    }

    case "predictivo": {
      // Predictivo estadístico: pondera temas por frecuencia histórica
      const pool = examenesFacultad.flatMap((e) => e.preguntas);
      const frecuencia = new Map<string, number>();
      for (const p of pool) {
        frecuencia.set(p.tema, (frecuencia.get(p.tema) ?? 0) + 1);
      }
      // Selecciona pesando por frecuencia (los temas más comunes aparecen más)
      const cantidad = config.cantidad_preguntas ?? 20;
      preguntas = seleccionarPonderado(pool, frecuencia, cantidad);
      break;
    }

    // "ia_generado" y "mis_errores" se resuelven con early-return arriba (no llegan al switch)

    default: {
      const _exhaustive: never = config.modo;
      throw new Error(`Modo desconocido: ${_exhaustive}`);
    }
  }

  if (preguntas.length === 0) {
    throw new Error("No se pudieron seleccionar preguntas con esta configuración");
  }

  // Duracion: examenOrigen si existe, sino 2 min por pregunta (por defecto)
  const duracion =
    examenOrigen?.duracion_minutos ??
    Math.max(15, preguntas.length * 2);

  const simulador: Simulador = {
    id: `sim-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
    usuario_id: usuarioId,
    config,
    preguntas,
    respuestas_usuario: {},
    marcadas: [],
    estado: "activo",
    fecha_inicio: new Date().toISOString(),
    duracion_minutos: duracion,
  };

  return { simulador, examenOrigen };
}

export interface EvaluacionResultado {
  nota_final: number;
  desglose: Record<string, number>;
  total_preguntas: number;
  correctas: number;
  incorrectas: number;
  sin_responder: number;
  tiempo_usado_segundos: number;
}

export function evaluarSimulador(
  simulador: Simulador,
  examenOrigen?: ExamenBanco
): EvaluacionResultado {
  const preguntas = simulador.preguntas ?? [];
  if (preguntas.length === 0) {
    return {
      nota_final: 0,
      desglose: {},
      total_preguntas: 0,
      correctas: 0,
      incorrectas: 0,
      sin_responder: 0,
      tiempo_usado_segundos: 0,
    };
  }

  const desgloseStats: Record<string, { correctas: number; total: number }> = {};
  let correctas = 0;
  let incorrectas = 0;
  let sinResponder = 0;

  for (const p of preguntas) {
    const elegida = simulador.respuestas_usuario[p.id];
    if (!desgloseStats[p.area]) {
      desgloseStats[p.area] = { correctas: 0, total: 0 };
    }
    desgloseStats[p.area].total++;
    if (!elegida) {
      sinResponder++;
    } else if (esRespuestaCorrecta(p, elegida)) {
      desgloseStats[p.area].correctas++;
      correctas++;
    } else {
      incorrectas++;
    }
  }

  const desglose: Record<string, number> = {};
  for (const [area, stats] of Object.entries(desgloseStats)) {
    desglose[area] = stats.total > 0
      ? Math.round((stats.correctas / stats.total) * 100)
      : 0;
  }

  // Si hay examenOrigen con ponderación, usar nota ponderada por área
  let notaFinal: number;
  if (examenOrigen?.ponderacion && Object.keys(examenOrigen.ponderacion).length > 0) {
    let suma = 0;
    let pesoTotal = 0;
    for (const [area, peso] of Object.entries(examenOrigen.ponderacion)) {
      const porcArea = desglose[area] ?? 0;
      suma += porcArea * peso;
      pesoTotal += peso;
    }
    notaFinal = pesoTotal > 0 ? Math.round(suma / pesoTotal) : 0;
  } else {
    notaFinal = Math.round((correctas / preguntas.length) * 100);
  }

  const tiempoUsado = Math.floor(
    (Date.now() - new Date(simulador.fecha_inicio).getTime()) / 1000
  );

  return {
    nota_final: notaFinal,
    desglose,
    total_preguntas: preguntas.length,
    correctas,
    incorrectas,
    sin_responder: sinResponder,
    tiempo_usado_segundos: tiempoUsado,
  };
}

function mezclar<T>(arr: T[]): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function seleccionarPonderado<T extends { tema: string }>(
  pool: T[],
  pesos: Map<string, number>,
  cantidad: number
): T[] {
  // Agrupa por tema, luego mezcla cada grupo y toma proporcional al peso
  const porTema = new Map<string, T[]>();
  for (const item of pool) {
    if (!porTema.has(item.tema)) porTema.set(item.tema, []);
    porTema.get(item.tema)!.push(item);
  }

  const totalPeso = Array.from(pesos.values()).reduce((a, b) => a + b, 0);
  if (totalPeso === 0) return mezclar(pool).slice(0, cantidad);

  const resultado: T[] = [];
  for (const [tema, items] of porTema.entries()) {
    const peso = pesos.get(tema) ?? 0;
    const cuota = Math.max(1, Math.round((peso / totalPeso) * cantidad));
    resultado.push(...mezclar(items).slice(0, cuota));
  }
  return mezclar(resultado).slice(0, cantidad);
}
