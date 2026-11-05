import type { Simulador } from "./types";

// Mientras el examen está en curso, el navegador no debe recibir las
// respuestas correctas ni las explicaciones: se leían en la pestaña Network.
// Devuelve una copia (no muta lo guardado en el servidor). Una vez calificado
// se entrega completo, porque la pantalla de resultados lo necesita.
export function ocultarClave(simulador: Simulador): Simulador {
  if (simulador.estado === "calificado") return simulador;
  return {
    ...simulador,
    preguntas: simulador.preguntas?.map((p) => ({ ...p, respuesta_correcta: "", explicacion: "" })),
  };
}
