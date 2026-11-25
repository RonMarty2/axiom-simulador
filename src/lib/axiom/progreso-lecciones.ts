export const CLAVE_PROGRESO_LECCIONES = "axiom-lecciones-completadas";
export const EVENTO_PROGRESO_LECCIONES = "axiom-progreso-lecciones";

const MAPA_BLOQUE_POR_AREA: Record<string, string> = {
  morfofuncion: "morfofuncion",
  biologia_celular: "biologia-celular",
  biologia: "biologia-celular",
  investigacion: "investigacion",
  educacion_salud: "investigacion",
  quimica: "quimica",
  fisica: "fisica",
  matematicas: "matematicas",
  aritmetica_algebra: "matematicas",
  geometria_trigonometria: "matematicas",
  comprension_lectora: "comprension-lectora",
  razonamiento: "comprension-lectora",
  lenguaje: "comprension-lectora",
  economicas: "economicas",
};

/** Lee la lista deduplicada de slugs completados desde localStorage. Segura en SSR. */
export function leerLeccionesCompletadas(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const crudo = window.localStorage.getItem(CLAVE_PROGRESO_LECCIONES);
    if (!crudo) return [];
    const parsed: unknown = JSON.parse(crudo);
    if (!Array.isArray(parsed)) return [];
    const limpios = parsed
      .filter((x): x is string => typeof x === "string")
      .map((s) => s.trim())
      .filter(Boolean);
    return Array.from(new Set(limpios));
  } catch {
    return [];
  }
}

/** Marca un slug como completado en localStorage y notifica a la ventana. Segura en SSR. */
export function marcarLeccionCompletada(slug: string): string[] {
  const limpio = slug.trim();
  const actuales = leerLeccionesCompletadas();
  if (!limpio || typeof window === "undefined") return actuales;
  if (actuales.includes(limpio)) return actuales;
  const siguientes = [...actuales, limpio];
  try {
    window.localStorage.setItem(CLAVE_PROGRESO_LECCIONES, JSON.stringify(siguientes));
  } catch {
    // Si localStorage está bloqueado o lleno, devolvemos la lista en memoria igual.
  }
  window.dispatchEvent(new Event(EVENTO_PROGRESO_LECCIONES));
  return siguientes;
}

/** Indica si una lección está completada (usa la lista pasada o lee localStorage). */
export function estaLeccionCompletada(slug: string, lista?: string[]): boolean {
  const limpio = slug.trim();
  if (!limpio) return false;
  const fuente = lista ?? leerLeccionesCompletadas();
  return fuente.includes(limpio);
}

/** Cuenta cuántas lecciones únicas de un bloque están completadas y su porcentaje entero. */
export function contarCompletadasEnBloque(
  slugsBloque: string[],
  completadas: Set<string>,
): { hechas: number; total: number; porcentaje: number } {
  const unicos = Array.from(
    new Set(slugsBloque.map((s) => s.trim()).filter(Boolean)),
  );
  const total = unicos.length;
  if (total === 0) return { hechas: 0, total: 0, porcentaje: 0 };
  let hechas = 0;
  for (const slug of unicos) {
    if (completadas.has(slug)) hechas++;
  }
  const porcentaje = Math.round((hechas / total) * 100);
  return { hechas, total, porcentaje };
}

/** Mapea un ID de área del banco o simulador al ID de bloque de aprende. */
export function bloqueDeArea(areaId: string): string {
  const clave = areaId.trim().toLowerCase();
  if (!clave) return "";
  return MAPA_BLOQUE_POR_AREA[clave] ?? clave.replace(/_/g, "-");
}
