import type { Simulador, ExamenConfig, RespuestaUsuario } from "./types";

interface EvaluacionResultado {
  nota_final: number;
  desglose: Record<string, number>;
  respuestas: RespuestaUsuario[];
}

export const axiomEvaluador = {
  evaluarSimulador(
    simulador: Simulador,
    config: ExamenConfig
  ): EvaluacionResultado {
    const respuestasPorArea: Record<string, { correctas: number; total: number }> = {};

    config.areas.forEach((area) => {
      respuestasPorArea[area.nombre] = { correctas: 0, total: 0 };
    });

    const respuestas: RespuestaUsuario[] = [];
    const preguntas = simulador.preguntas_generadas ?? simulador.preguntas ?? [];
    preguntas.forEach((pregunta) => {
      const respuestaUsuario = simulador.respuestas_usuario[pregunta.id];
      const correcta = respuestaUsuario === pregunta.respuesta_correcta;

      if (respuestasPorArea[pregunta.area]) {
        respuestasPorArea[pregunta.area].total += 1;
        if (correcta) respuestasPorArea[pregunta.area].correctas += 1;
      }

      respuestas.push({
        pregunta_id: pregunta.id,
        respuesta: respuestaUsuario || "",
        correcta,
        tiempo_segundos: 0,
      });
    });

    const desglose: Record<string, number> = {};
    let notaPonderada = 0;

    config.areas.forEach((area) => {
      const stats = respuestasPorArea[area.nombre];
      const porcentaje =
        stats.total > 0 ? (stats.correctas / stats.total) * 100 : 0;
      desglose[area.nombre] = Math.round(porcentaje);
      notaPonderada += porcentaje * area.ponderacion;
    });

    return {
      nota_final: Math.round(notaPonderada * 100) / 100,
      desglose,
      respuestas,
    };
  },

  generarMensajeMotivador(nota: number): string {
    if (nota >= 80) return "¡Excelente! Mejoraste significativamente.";
    if (nota >= 70) return "Buen trabajo. Sigue practicando.";
    if (nota >= 60) return "Vas bien. Enfócate en las áreas débiles.";
    return "Siguiente intento mejor preparado. Plan personalizado listo.";
  },
};
