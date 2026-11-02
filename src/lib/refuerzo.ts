import { REFUERZO, type EventoRefuerzo } from "./refuerzo-config.ts";

export type { EventoRefuerzo };

export type Elegible =
  | { evento: "retorno_tras_pausa"; dias: number }
  | { evento: "error_corregido"; correctas: number }
  | { evento: "mejora_area_debil"; area: string; antes: number; ahora: number }
  | { evento: "simulacro_terminado"; totalSimulacros: number };

export type DecisionRefuerzo = Elegible;

export interface ContextoRefuerzo {
  esfuerzo: boolean;
  ahora: string;
  fechasPrevias: string[];
  desgloseActual: Record<string, number>;
  desglosesPrevios: Record<string, number>[];
  modo?: string;
  correctasRepaso?: number;
  totalSimulacros: number;
}

const MS_POR_MINUTO = 60_000;
const MS_POR_DIA = 86_400_000;

export function fnv1a(texto: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function crearAzar(semilla: number): () => number {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function diaLaPaz(iso: string): string {
  const ms = Date.parse(iso);
  const desplazado = new Date(ms + REFUERZO.zonaOffsetMin * MS_POR_MINUTO);
  return desplazado.toISOString().slice(0, 10);
}

export function inicioDiaLaPazISO(iso: string): string {
  const dia = diaLaPaz(iso);
  const msMedianocheLaPaz =
    Date.parse(`${dia}T00:00:00.000Z`) - REFUERZO.zonaOffsetMin * MS_POR_MINUTO;
  return new Date(msMedianocheLaPaz).toISOString();
}

export function desdeValido(s: string | null): string | null {
  if (!s || typeof s !== "string") return null;
  const limpio = s.trim();
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(limpio)) {
    return null;
  }
  const ms = Date.parse(limpio);
  if (!Number.isFinite(ms)) return null;
  return limpio;
}

export function esfuerzoReal(r: {
  correctas: number;
  incorrectas: number;
  sin_responder: number;
}): boolean {
  const respondidas = Math.max(0, r.correctas) + Math.max(0, r.incorrectas);
  const total = respondidas + Math.max(0, r.sin_responder);
  if (total <= 0) return false;
  return respondidas / total >= REFUERZO.esfuerzoMinimo;
}

function msDiaCalendario(diaYYYYMMDD: string): number {
  return Date.parse(`${diaYYYYMMDD}T00:00:00.000Z`);
}

export function diasDePausa(fechas: string[], ahora: string): number | null {
  const hoy = diaLaPaz(ahora);
  let ultimoDia: string | null = null;
  for (const f of fechas) {
    if (!f || !Number.isFinite(Date.parse(f))) continue;
    const d = diaLaPaz(f);
    if (d < hoy && (ultimoDia === null || d > ultimoDia)) {
      ultimoDia = d;
    }
  }
  if (ultimoDia === null) return null;
  const diffDias = Math.round((msDiaCalendario(hoy) - msDiaCalendario(ultimoDia)) / MS_POR_DIA);
  return Math.max(0, diffDias - 1);
}

export function diasConPractica(
  fechas: string[],
  ahora: string,
  ventana: number = REFUERZO.ventanaDias,
): number {
  if (ventana <= 0) return 0;
  const hoy = diaLaPaz(ahora);
  const msHoy = msDiaCalendario(hoy);
  const unicos = new Set<string>();
  for (const f of fechas) {
    if (!f || !Number.isFinite(Date.parse(f))) continue;
    const d = diaLaPaz(f);
    const diffDias = Math.round((msHoy - msDiaCalendario(d)) / MS_POR_DIA);
    if (diffDias >= 0 && diffDias < ventana) {
      unicos.add(d);
    }
  }
  return unicos.size;
}

export function mejoraEnAreaDebil(
  actual: Record<string, number>,
  previos: Record<string, number>[],
): { area: string; antes: number; ahora: number } | null {
  if (previos.length < REFUERZO.mejora.previosMin) return null;
  const areas = Object.keys(actual).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  let mejor: { area: string; antes: number; ahora: number; subida: number } | null = null;

  for (const area of areas) {
    const valActual = actual[area];
    if (typeof valActual !== "number" || !Number.isFinite(valActual)) continue;
    const valsPrevios: number[] = [];
    for (const p of previos) {
      const v = p[area];
      if (typeof v === "number" && Number.isFinite(v)) {
        valsPrevios.push(v);
      }
    }
    if (valsPrevios.length < REFUERZO.mejora.previosMin) continue;
    const promedio = valsPrevios.reduce((acc, n) => acc + n, 0) / valsPrevios.length;
    const antes = Math.round(promedio);
    const ahora = Math.round(valActual);
    if (antes >= REFUERZO.mejora.umbralDebil) continue;
    const subida = ahora - antes;
    if (subida < REFUERZO.mejora.subidaMin) continue;
    if (mejor === null || subida > mejor.subida) {
      mejor = { area, antes, ahora, subida };
    }
  }

  return mejor ? { area: mejor.area, antes: mejor.antes, ahora: mejor.ahora } : null;
}

export function elegiblesDe(ctx: ContextoRefuerzo): Elegible[] {
  if (!ctx.esfuerzo) return [];
  const lista: Elegible[] = [];

  const pausa = diasDePausa(ctx.fechasPrevias, ctx.ahora);
  if (pausa !== null && pausa >= REFUERZO.retorno.pausaMinDias) {
    lista.push({ evento: "retorno_tras_pausa", dias: pausa });
  }

  if (ctx.modo === "mis_errores" && (ctx.correctasRepaso ?? 0) >= 1) {
    lista.push({ evento: "error_corregido", correctas: ctx.correctasRepaso ?? 0 });
  }

  const mejora = mejoraEnAreaDebil(ctx.desgloseActual, ctx.desglosesPrevios);
  if (mejora !== null) {
    lista.push({
      evento: "mejora_area_debil",
      area: mejora.area,
      antes: mejora.antes,
      ahora: mejora.ahora,
    });
  }

  if (ctx.totalSimulacros >= 1) {
    lista.push({ evento: "simulacro_terminado", totalSimulacros: ctx.totalSimulacros });
  }

  return lista;
}

export function decidirRefuerzo(
  e: { elegibles: Elegible[]; sorpresasHoy: number; activo: boolean },
  azar: () => number,
): DecisionRefuerzo | null {
  if (!e.activo || e.sorpresasHoy >= REFUERZO.tope.porDia || e.elegibles.length === 0) {
    return null;
  }

  let candidato: Elegible | null = null;
  for (const ev of REFUERZO.prioridad) {
    const encontrado = e.elegibles.find((item) => item.evento === ev);
    if (encontrado) {
      candidato = encontrado;
      break;
    }
  }
  if (!candidato) return null;

  const p = REFUERZO.probabilidad[candidato.evento];
  return azar() < p ? candidato : null;
}

export function plural(n: number, uno: string, varios: string): string {
  return n === 1 ? uno : varios;
}

export function textoRefuerzo(d: DecisionRefuerzo): string {
  switch (d.evento) {
    case "simulacro_terminado":
      return `Terminaste otro simulacro. Con este ya son ${d.totalSimulacros} los que completaste.`;
    case "mejora_area_debil":
      return `En ${d.area} subiste de ${d.antes} % a ${d.ahora} % frente a tus simulacros anteriores.`;
    case "error_corregido":
      return `Esta vez acertaste ${d.correctas} ${plural(d.correctas, "pregunta", "preguntas")} que habías fallado antes.`;
    case "retorno_tras_pausa":
      return `Volviste a practicar después de ${d.dias} ${plural(d.dias, "día", "días")} sin hacerlo. Retomar es lo más difícil y ya lo hiciste.`;
  }
}

export function textoRepasoFijo(n: number, k: number): string {
  if (n < 1) return "";
  return `Repasaste ${n} ${plural(n, "pregunta", "preguntas")} que habías fallado: acertaste ${k}.`;
}

export function textoDominadas(n: number): string {
  if (n < 1) return "";
  return `Dominaste ${n} ${plural(n, "pregunta", "preguntas")}: ya no te toca ${plural(n, "repasarla", "repasarlas")}.`;
}

export function textoConstancia(n: number): string {
  if (n < 1) return "";
  return `Practicaste ${n} de los últimos ${REFUERZO.ventanaDias} días.`;
}
