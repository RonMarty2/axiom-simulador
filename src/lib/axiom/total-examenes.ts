import { listarMetadata } from "./banco-loader";

// Cantidad de exámenes del banco, calculada del banco mismo (solo servidor).
// Única fuente para textos como "139 exámenes": si se agrega un examen, todo se actualiza.
export async function totalExamenes(): Promise<number> {
  return (await listarMetadata()).length;
}
