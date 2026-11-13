// Fichas de «formato de examen» (data/formatos-examen.json): áreas, pesos, preguntas y minutos de cada
// formato real. Lógica pura y sin imports con alias, para poder testearla con node --test.
// La lectura del archivo vive en data-store.ts (getFormatos / formatoVigente / formatoPorId).

export interface AreaFormato {
  id: string;
  peso: number;
}

export interface FormatoExamen {
  id: string;
  facultad: string;
  nombre: string;
  areas: AreaFormato[];
  preguntas: number;
  minutos: number;
  /** true si la convocatoria no publica la cifra y la estimamos. */
  estimado: boolean;
  /** El formato de la convocatoria que viene (el que debe practicar el alumno). */
  vigente: boolean;
  fuente: string;
}

export function vigenteDe(fichas: FormatoExamen[], facultadId: string): FormatoExamen | null {
  return fichas.find((f) => f.facultad === facultadId && f.vigente) ?? null;
}

export function porIdDe(fichas: FormatoExamen[], id: string): FormatoExamen | null {
  return fichas.find((f) => f.id === id) ?? null;
}

/**
 * Reparte `total` preguntas entre las áreas de la ficha según su peso. Las áreas sin preguntas en el banco
 * (disponibles[area] vacío o 0) se omiten y su peso se reparte entre las demás. Cada área recibe como mucho
 * lo que tiene disponible. Resto por mayor residuo. Si faltan preguntas por topes, se devuelve menos del total.
 * Nunca falla: si ninguna área tiene preguntas devuelve {}.
 */
export function repartirCuotas(
  ficha: Pick<FormatoExamen, "areas">,
  disponibles: Record<string, number>,
  total: number
): Record<string, number> {
  let activas = ficha.areas.filter((a) => (disponibles[a.id] ?? 0) > 0 && a.peso > 0);
  const cuotas: Record<string, number> = {};
  let restante = total;
  // Iterativo: si un área topa con su disponibilidad, se fija y el resto se reparte entre las demás.
  while (activas.length > 0 && restante > 0) {
    const suma = activas.reduce((s, a) => s + a.peso, 0);
    const crudo = activas.map((a) => ({ a, x: (a.peso / suma) * restante }));
    const topadas = crudo.filter(({ a, x }) => x >= (disponibles[a.id] ?? 0));
    if (topadas.length > 0) {
      for (const { a } of topadas) {
        cuotas[a.id] = disponibles[a.id];
        restante -= disponibles[a.id];
      }
      activas = activas.filter((a) => !topadas.some((t) => t.a.id === a.id));
      continue;
    }
    let asignado = 0;
    const base = crudo.map(({ a, x }) => {
      const b = Math.floor(x);
      asignado += b;
      return { a, b, r: x - b };
    });
    let faltan = restante - asignado;
    base.sort((p, q) => q.r - p.r);
    for (const e of base) {
      cuotas[e.a.id] = e.b + (faltan > 0 ? 1 : 0);
      if (faltan > 0) faltan--;
    }
    restante = 0;
  }
  return cuotas;
}

/** Texto del formato para el alumno (tuteo no aplica: es descriptivo). */
export function textoFormato(f: Pick<FormatoExamen, "nombre" | "preguntas" | "minutos" | "estimado">): string {
  return `Formato ${f.nombre}${f.estimado ? " (estimado)" : ""}: ${f.preguntas} preguntas en ${f.minutos} minutos.`;
}
