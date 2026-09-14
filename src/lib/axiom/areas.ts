// Nombre lindo de cada área del examen, en un solo lugar.
//
// Estaba copiado en tres pantallas (resultados, debilidades y la biblioteca de
// exámenes) y a cada copia le faltaban áreas distintas: en la biblioteca no
// estaban "Cívica" ni "Historia", en debilidades faltaba "Estrategias de
// Aprendizaje". Al alumno le aparecía el id crudo, "estrategias_aprendizaje",
// según en qué pantalla estuviera.

export const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas",
  aritmetica_algebra: "Aritmética-Álgebra",
  geometria_trigonometria: "Geometría-Trigonometría",
  economicas: "Económicas",
  // La FCE toma Lenguaje e Historia General como áreas propias del examen —
  // no son "verbal" ni "razonamiento", que era lo que declaraba facultades.json
  // antes de contrastarlo con los facsímiles.
  lenguaje: "Lenguaje",
  verbal: "Verbal",
  razonamiento: "Razonamiento",
  fisica: "Física",
  quimica: "Química",
  biologia: "Biología",
  civica: "Cívica",
  historia: "Historia",
  estrategias_aprendizaje: "Estrategias de Aprendizaje",
  general: "General",
};

// Para áreas propias de una facultad que no estén en el mapa (ej. "libro_1")
// devuelve algo legible igual: "Libro 1".
export function etiquetaArea(area: string): string {
  if (ETIQUETAS_AREA[area]) return ETIQUETAS_AREA[area];
  return (area || "general")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
