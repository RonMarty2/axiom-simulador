// Cómo se nombra un examen en una tarjeta del listado.
//
// El alumno busca por gestión y por curso, no por pregunta: dos exámenes de
// 2014 primera opción son dos exámenes DISTINTOS si uno es de la convocatoria
// 1/2014 y el otro de la 2/2014. La tarjeta mostraba solo el año y la opción,
// así que esos dos quedaban idénticos en pantalla.
//
// Peor todavía: los 66 parciales de curso pre-facultativo no tienen `opcion`,
// y la tarjeta caía en un texto fijo que decía "Examen de admisión". Un
// parcial del propedéutico no es un examen de admisión.
//
// El `titulo` del frontmatter ya trae todo lo que hace falta, con una forma
// constante en los 140 archivos: un nombre y un paréntesis al final.
//   "Examen de Admisión 2/2014 (1ra Opción)"
//   "Tercer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008)"
// Esto lo parte en esas dos mitades para poder darles peso visual distinto.

export interface EtiquetaExamen {
  /** Lo que va en negrita: qué examen es. */
  principal: string;
  /** Lo que va abajo en color, si el título traía paréntesis. */
  secundaria: string | null;
}

export function etiquetarExamen(
  titulo: string | null | undefined,
  opcion?: string | null,
): EtiquetaExamen {
  const limpio = (titulo ?? "").trim();

  if (!limpio) {
    // Sin título no se inventa nada: se cae a la opción, y si tampoco hay,
    // a un genérico que no afirma de qué tipo de examen se trata.
    return { principal: opcion?.trim() || "Examen", secundaria: null };
  }

  const m = limpio.match(/^(.*?)\s*\(([^()]*)\)\s*$/);
  if (!m) return { principal: limpio, secundaria: opcion?.trim() || null };

  const principal = m[1].trim();
  const secundaria = m[2].trim();
  if (!principal) return { principal: secundaria, secundaria: null };

  return { principal, secundaria: secundaria || null };
}
