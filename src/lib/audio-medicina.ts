import { AUDIOLIBROS_MEDICINA } from "./audio-medicina-catalogo.ts";

export { AUDIOLIBROS_MEDICINA };

export const VELOCIDADES_AUDIO = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;

export type VelocidadAudio = (typeof VELOCIDADES_AUDIO)[number];

export type PistaAudio = {
  id: string;
  numero: number;
  titulo: string;
  rutaRelativa: string;
  tamanoMb?: number;
};

export type AudiolibroUnidad = {
  slug: string;
  libro: string;
  capitulo: string;
  gratis: boolean;
  pistas: PistaAudio[];
};

export type ProgresoAudio = {
  pistaIdx: number;
  tiempo: number;
  velocidad: number;
};

export function obtenerAudiolibro(slug: string): AudiolibroUnidad | null {
  if (!slug) return null;
  if (!Object.prototype.hasOwnProperty.call(AUDIOLIBROS_MEDICINA, slug)) {
    return null;
  }
  return AUDIOLIBROS_MEDICINA[slug];
}

export function tieneAudiolibro(slug?: string): boolean {
  if (!slug) return false;
  return obtenerAudiolibro(slug) !== null;
}

export function extraerSlugAprende(pathname: string | null | undefined): string | null {
  if (!pathname) return null;
  const sinQuery = pathname.split(/[?#]/)[0].replace(/\/+$/, "");
  const coincidencia = /^\/aprende\/([^/]+)$/.exec(sinQuery);
  if (!coincidencia) return null;
  try {
    return decodeURIComponent(coincidencia[1]);
  } catch {
    return coincidencia[1];
  }
}

export function construirUrlAudio(
  rutaRelativa: string,
  opts?: { baseUrl?: string; esDev?: boolean },
): string | null {
  const segmentos = rutaRelativa
    .replace(/^\/+/, "")
    .split("/")
    .filter((s) => s.length > 0);
  if (segmentos.length === 0) return null;

  const rutaCodificada = segmentos.map(encodeURIComponent).join("/");
  const baseCruda =
    opts && opts.baseUrl !== undefined
      ? opts.baseUrl
      : process.env.NEXT_PUBLIC_AUDIO_BASE_URL;
  const base = (baseCruda ?? "").trim().replace(/\/+$/, "");

  if (base.length > 0) {
    return `${base}/${rutaCodificada}`;
  }

  const esDev = opts?.esDev ?? process.env.NODE_ENV !== "production";
  if (esDev) {
    return `/api/dev-audio/${rutaCodificada}`;
  }

  return null;
}

export function formatearTiempoAudio(segundos: number): string {
  if (!Number.isFinite(segundos) || segundos <= 0) {
    return "00:00";
  }
  const total = Math.floor(segundos);
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segs = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  if (horas > 0) {
    return `${horas}:${pad(minutos)}:${pad(segs)}`;
  }
  return `${pad(minutos)}:${pad(segs)}`;
}

export function claveProgresoAudio(slug: string): string {
  return `axiom_audio_v1_${slug}`;
}

export function parsearProgresoAudio(
  raw: string | null,
  totalPistas: number,
): ProgresoAudio | null {
  if (!raw || !Number.isInteger(totalPistas) || totalPistas <= 0) {
    return null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return null;
  }

  const datos = parsed as Record<string, unknown>;
  if (typeof datos.pistaIdx !== "number" || !Number.isFinite(datos.pistaIdx)) {
    return null;
  }

  const pistaIdx = Math.min(totalPistas - 1, Math.max(0, Math.floor(datos.pistaIdx)));
  const tiempo =
    typeof datos.tiempo === "number" && Number.isFinite(datos.tiempo) && datos.tiempo >= 0
      ? datos.tiempo
      : 0;
  const velocidad =
    typeof datos.velocidad === "number" &&
    (VELOCIDADES_AUDIO as readonly number[]).includes(datos.velocidad)
      ? datos.velocidad
      : 1;

  return { pistaIdx, tiempo, velocidad };
}
