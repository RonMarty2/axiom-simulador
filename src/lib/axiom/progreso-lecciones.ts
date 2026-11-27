export const CLAVE_PROGRESO_LECCIONES = "axiom-lecciones-completadas";
export const CLAVE_ESCENAS_LECCIONES = "axiom-lecciones-escenas";
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

/** Clave en localStorage aislada por usuario (o global si no hay usuarioId). */
export function claveProgresoUsuario(base: string, usuarioId?: string | null): string {
  const uid = usuarioId?.trim();
  return uid ? `${base}:${uid}` : base;
}

/** Lee la lista deduplicada de slugs completados desde localStorage. Segura en SSR. */
export function leerLeccionesCompletadas(usuarioId?: string | null): string[] {
  if (typeof window === "undefined") return [];
  try {
    const clave = claveProgresoUsuario(CLAVE_PROGRESO_LECCIONES, usuarioId);
    const crudo = window.localStorage.getItem(clave);
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

/** Marca un slug como completado en localStorage (aislado por usuario) y notifica. Segura en SSR. */
export function marcarLeccionCompletada(
  slug: string,
  usuarioId?: string | null,
): string[] {
  const limpio = slug.trim();
  const actuales = leerLeccionesCompletadas(usuarioId);
  if (!limpio || typeof window === "undefined") return actuales;
  if (actuales.includes(limpio)) return actuales;
  const siguientes = [...actuales, limpio];
  try {
    const clave = claveProgresoUsuario(CLAVE_PROGRESO_LECCIONES, usuarioId);
    window.localStorage.setItem(clave, JSON.stringify(siguientes));
  } catch {
    // Si localStorage está bloqueado o lleno, devolvemos la lista en memoria igual.
  }
  window.dispatchEvent(new Event(EVENTO_PROGRESO_LECCIONES));
  return siguientes;
}

/** Indica si una lección está completada (usa la lista pasada o lee localStorage). */
export function estaLeccionCompletada(
  slug: string,
  lista?: string[],
  usuarioId?: string | null,
): boolean {
  const limpio = slug.trim();
  if (!limpio) return false;
  const fuente = lista ?? leerLeccionesCompletadas(usuarioId);
  return fuente.includes(limpio);
}

/** Lee el mapa `{ [slug]: indiceEscena }` guardado en localStorage para el usuario. Segura en SSR. */
export function leerMapaEscenas(usuarioId?: string | null): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const clave = claveProgresoUsuario(CLAVE_ESCENAS_LECCIONES, usuarioId);
    const crudo = window.localStorage.getItem(clave);
    if (!crudo) return {};
    const parsed: unknown = JSON.parse(crudo);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const limpio: Record<string, number> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      const slug = k.trim();
      if (slug && typeof v === "number" && Number.isFinite(v) && v >= 0) {
        limpio[slug] = Math.floor(v);
      }
    }
    return limpio;
  } catch {
    return {};
  }
}

/** Devuelve el índice de escena guardado para una lección, acotado a `[0, totalEscenas - 1]`. */
export function leerEscenaLeccion(
  slug: string,
  totalEscenas: number,
  usuarioId?: string | null,
): number {
  const limpio = slug.trim();
  if (!limpio || totalEscenas <= 1) return 0;
  const mapa = leerMapaEscenas(usuarioId);
  const guardado = mapa[limpio];
  if (typeof guardado !== "number") return 0;
  return Math.max(0, Math.min(totalEscenas - 1, Math.floor(guardado)));
}

/** Persiste el índice de escena actual de una lección en localStorage para el usuario. */
export function guardarEscenaLeccion(
  slug: string,
  escena: number,
  totalEscenas: number,
  usuarioId?: string | null,
): number {
  const limpio = slug.trim();
  const maxIdx = Math.max(0, totalEscenas - 1);
  const valor = Number.isFinite(escena)
    ? Math.max(0, Math.min(maxIdx, Math.floor(escena)))
    : 0;
  if (!limpio || typeof window === "undefined") return valor;
  const mapa = leerMapaEscenas(usuarioId);
  if (mapa[limpio] === valor) return valor;
  mapa[limpio] = valor;
  try {
    const clave = claveProgresoUsuario(CLAVE_ESCENAS_LECCIONES, usuarioId);
    window.localStorage.setItem(clave, JSON.stringify(mapa));
  } catch {
    // Si localStorage falla, no rompemos la navegación de la lección.
  }
  window.dispatchEvent(new Event(EVENTO_PROGRESO_LECCIONES));
  return valor;
}

/** Limpia la escena guardada de una lección (p. ej. al terminar, para que al volver arranque de 0). */
export function limpiarEscenaLeccion(
  slug: string,
  usuarioId?: string | null,
): void {
  const limpio = slug.trim();
  if (!limpio || typeof window === "undefined") return;
  const mapa = leerMapaEscenas(usuarioId);
  if (!(limpio in mapa)) return;
  delete mapa[limpio];
  try {
    const clave = claveProgresoUsuario(CLAVE_ESCENAS_LECCIONES, usuarioId);
    window.localStorage.setItem(clave, JSON.stringify(mapa));
  } catch {
    // noop
  }
  window.dispatchEvent(new Event(EVENTO_PROGRESO_LECCIONES));
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
