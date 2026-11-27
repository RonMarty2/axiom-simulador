import { esRespuestaCorrecta } from "./respuestas.ts";
import type {
  ConfiguracionSimulacion,
  ExamenBanco,
  Simulador,
} from "./types.ts";

export interface EvaluacionResultado {
  nota_final: number;
  desglose: Record<string, number>;
  total_preguntas: number;
  correctas: number;
  incorrectas: number;
  sin_responder: number;
  tiempo_usado_segundos: number;
}

export interface FuentesBancoExamen {
  cargarExamen: (id: string) => Promise<ExamenBanco | null>;
  cargarBanco: () => Promise<ExamenBanco[]>;
}

/**
 * Resuelve el examen de origen para calificar un simulacro `examen_real` con su
 * ponderación oficial.
 */
export async function resolverExamenOrigen(
  config: ConfiguracionSimulacion | undefined,
  fuentes: FuentesBancoExamen,
): Promise<ExamenBanco | undefined> {
  if (config?.modo !== "examen_real") return undefined;
  if (config.examen_id) {
    return (await fuentes.cargarExamen(config.examen_id)) ?? undefined;
  }
  if (config.anio) {
    const idLegacy = [
      config.universidad,
      config.facultad,
      config.anio,
    ]
      .map((s) => String(s).toLowerCase().replace(/\s+/g, "-"))
      .join("-");
    const porId = await fuentes.cargarExamen(idLegacy);
    if (porId) return porId;

    const uniL = String(config.universidad ?? "").toLowerCase();
    const facL = String(config.facultad ?? "").toLowerCase();
    const banco = await fuentes.cargarBanco();
    const candidatos = banco.filter(
      (e) =>
        e.universidad.toLowerCase() === uniL &&
        e.facultad.toLowerCase() === facL &&
        e.anio === config.anio,
    );
    return candidatos.length === 1 ? candidatos[0] : undefined;
  }
  return undefined;
}

export function evaluarSimulador(
  simulador: Simulador,
  examenOrigen?: ExamenBanco,
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
    desglose[area] =
      stats.total > 0 ? Math.round((stats.correctas / stats.total) * 100) : 0;
  }

  // Si hay examenOrigen con ponderación, usar nota ponderada por área
  let notaFinal: number;
  if (examenOrigen?.ponderacion && Object.keys(examenOrigen.ponderacion).length > 0) {
    let suma = 0;
    let pesoTotal = 0;
    for (const [area, peso] of Object.entries(examenOrigen.ponderacion)) {
      if (!(area in desglose)) continue;
      const porcArea = desglose[area] ?? 0;
      suma += porcArea * peso;
      pesoTotal += peso;
    }
    notaFinal =
      pesoTotal > 0
        ? Math.round(suma / pesoTotal)
        : Math.round((correctas / preguntas.length) * 100);
  } else {
    notaFinal = Math.round((correctas / preguntas.length) * 100);
  }

  const tiempoUsado = Math.floor(
    (Date.now() - new Date(simulador.fecha_inicio).getTime()) / 1000,
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
