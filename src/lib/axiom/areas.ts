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
  // Curso Básico de Medicina (UMSS): las tres materias reales del examen.
  morfofuncion: "Morfofunción",
  biologia_celular: "Biología Celular",
  investigacion: "Educación en Salud e Investigación",
  comprension_lectora: "Comprensión Lectora",
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

// Equivalencia entre los ids de `area:` usados en exámenes históricos del banco
// y el tema actual que los reemplaza en la estructura vigente de cada carrera
// (ver docs/mapa-areas-viejas-a-temas.md).
// Un área vieja sin correspondencia (ej. `estrategias_aprendizaje` en Ingeniería)
// conserva su propio id y su nombre en `etiquetaArea`, así no se pierde ninguna pregunta.
// Una facultad sin ficha vigente (Económicas) no transforma sus áreas y se comporta como hoy.
export const MAPA_AREAS_VIEJAS_A_TEMAS: Record<string, Record<string, string>> = {
  medicina: {
    morfofuncion: "morfofuncion",
    biologia_celular: "biologia_celular",
    investigacion: "investigacion",
    quimica: "quimica",
    fisica: "fisica",
    matematicas: "matematicas",
    comprension_lectora: "comprension_lectora",
  },
  ingenieria: {
    aritmetica_algebra: "matematicas",
    geometria_trigonometria: "matematicas",
    matematicas: "matematicas",
    fisica: "fisica",
    quimica: "quimica",
    biologia: "biologia",
  },
  derecho: {
    civica: "civica",
    historia: "historia",
    verbal: "verbal",
    razonamiento: "razonamiento",
  },
};

export interface FichaAreasMin {
  areas: readonly { id: string; peso?: number }[];
}

export interface TemaCarrera {
  id: string;
  nombre: string;
  area: string;
  cantidad: number;
  vigente: boolean;
}

/**
 * Devuelve el tema actual al que corresponde `area` en `facultad`.
 * - Si la facultad no tiene ficha vigente (`fichaVigente === null` o `false`, ej. Económicas),
 *   devuelve `area` tal cual viene del banco.
 * - Si el área vieja tiene correspondencia en `MAPA_AREAS_VIEJAS_A_TEMAS`, devuelve el tema actual.
 * - Si el área vieja no tiene correspondencia (ej. `estrategias_aprendizaje`), devuelve su propio id
 *   para que se muestre con su nombre propio y no se pierda ninguna pregunta.
 */
export function temaActualDeArea(
  facultad: string,
  area: string,
  fichaVigente?: FichaAreasMin | boolean | null
): string {
  const areaBase = (area || "general").trim() || "general";
  if (fichaVigente === null || fichaVigente === false) {
    return areaBase;
  }
  const facL = (facultad || "").trim().toLowerCase();
  const mapa = MAPA_AREAS_VIEJAS_A_TEMAS[facL];
  if (!mapa) {
    return areaBase;
  }
  const destino = mapa[areaBase];
  if (!destino) {
    return areaBase;
  }
  if (typeof fichaVigente === "object" && Array.isArray(fichaVigente.areas)) {
    const enFicha = fichaVigente.areas.some((a) => a.id === destino);
    return enFicha ? destino : areaBase;
  }
  return destino;
}

/**
 * Agrupa una lista de preguntas o errores por los temas actuales de la carrera.
 * - Con ficha vigente: ordena primero los temas de la ficha vigente (con preguntas > 0)
 *   y luego cualquier área vieja sin correspondencia con su nombre propio (`vigente: false`).
 * - Sin ficha vigente (ej. Económicas): conserva las áreas tal cual vienen del banco.
 */
export function temasPorCarrera(
  facultad: string,
  items: readonly { area: string }[],
  fichaVigente?: FichaAreasMin | null
): TemaCarrera[] {
  const facL = (facultad || "").trim().toLowerCase();
  const mapa = MAPA_AREAS_VIEJAS_A_TEMAS[facL];
  const sinFicha = fichaVigente === null || (!fichaVigente && !mapa);

  const conteo = new Map<string, number>();
  for (const item of items) {
    const id = temaActualDeArea(facL, item.area, fichaVigente);
    conteo.set(id, (conteo.get(id) ?? 0) + 1);
  }

  if (sinFicha) {
    return Array.from(conteo.entries())
      .map(([id, cantidad]) => ({
        id,
        nombre: etiquetaArea(id),
        area: id,
        cantidad,
        vigente: false,
      }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }

  const idsFicha = fichaVigente?.areas.map((a) => a.id) ?? [];
  const setFicha = new Set(idsFicha);
  const visitados = new Set<string>();
  const resultado: TemaCarrera[] = [];

  for (const id of idsFicha) {
    const cantidad = conteo.get(id) ?? 0;
    if (cantidad > 0 && !visitados.has(id)) {
      visitados.add(id);
      resultado.push({
        id,
        nombre: etiquetaArea(id),
        area: id,
        cantidad,
        vigente: true,
      });
    }
  }

  for (const [id, cantidad] of conteo.entries()) {
    if (cantidad > 0 && !visitados.has(id)) {
      visitados.add(id);
      resultado.push({
        id,
        nombre: etiquetaArea(id),
        area: id,
        cantidad,
        vigente: setFicha.has(id) || Boolean(mapa?.[id]),
      });
    }
  }

  return resultado;
}

/**
 * Devuelve el conteo `{ [temaActual]: cantidad }` para agrupar preguntas o errores.
 */
export function agruparPorTemaActual(
  facultad: string,
  items: readonly { area: string }[],
  fichaVigente?: FichaAreasMin | null
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const t of temasPorCarrera(facultad, items, fichaVigente)) {
    out[t.id] = t.cantidad;
  }
  return out;
}

/**
 * Filtra preguntas o errores que pertenecen al tema actual `temaBuscado`
 * (o cuyo `tema` / `area` / `materia_id` coincide directamente).
 */
export function filtrarPorTemaActual<
  T extends { area: string; tema?: string; materia_id?: string }
>(
  facultad: string,
  items: readonly T[],
  temaBuscado: string,
  fichaVigente?: FichaAreasMin | null
): T[] {
  const buscado = (temaBuscado || "").trim();
  if (!buscado) return [...items];
  return items.filter(
    (item) =>
      temaActualDeArea(facultad, item.area, fichaVigente) === buscado ||
      item.area === buscado ||
      item.tema === buscado ||
      item.materia_id === buscado
  );
}
