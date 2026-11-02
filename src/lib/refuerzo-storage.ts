import { diaLaPaz, type DecisionRefuerzo } from "./refuerzo.ts";

export const STORAGE_KEY = "axiom_refuerzo_v1";
export const OFF_KEY = "axiom_refuerzo_off";
export const MAX_DECISIONES = 20;

export interface RegistroDecision {
  simId: string;
  decision: DecisionRefuerzo | null;
  dia: string;
}

export interface EstadoRefuerzo {
  dia: string;
  sorpresasHoy: number;
  decisiones: RegistroDecision[];
}

export function estadoVacio(): EstadoRefuerzo {
  return {
    dia: "",
    sorpresasHoy: 0,
    decisiones: [],
  };
}

function esDiaValido(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function esDecisionValida(d: unknown): d is DecisionRefuerzo {
  if (!d || typeof d !== "object") return false;
  const obj = d as Record<string, unknown>;
  switch (obj.evento) {
    case "simulacro_terminado":
      return (
        typeof obj.totalSimulacros === "number" &&
        Number.isFinite(obj.totalSimulacros) &&
        obj.totalSimulacros >= 1
      );
    case "mejora_area_debil":
      return (
        typeof obj.area === "string" &&
        obj.area.length > 0 &&
        typeof obj.antes === "number" &&
        Number.isFinite(obj.antes) &&
        typeof obj.ahora === "number" &&
        Number.isFinite(obj.ahora)
      );
    case "error_corregido":
      return (
        typeof obj.correctas === "number" &&
        Number.isFinite(obj.correctas) &&
        obj.correctas >= 1
      );
    case "retorno_tras_pausa":
      return (
        typeof obj.dias === "number" &&
        Number.isFinite(obj.dias) &&
        obj.dias >= 1
      );
    default:
      return false;
  }
}

export function normalizarEstado(x: unknown): EstadoRefuerzo {
  let valor: unknown = x;
  if (typeof valor === "string") {
    try {
      valor = JSON.parse(valor);
    } catch {
      return estadoVacio();
    }
  }
  if (!valor || typeof valor !== "object" || Array.isArray(valor)) {
    return estadoVacio();
  }

  const obj = valor as Record<string, unknown>;
  const dia = esDiaValido(obj.dia) ? obj.dia : "";
  const sorpresasHoy =
    dia &&
    typeof obj.sorpresasHoy === "number" &&
    Number.isFinite(obj.sorpresasHoy) &&
    obj.sorpresasHoy >= 0
      ? Math.floor(obj.sorpresasHoy)
      : 0;

  const decisiones: RegistroDecision[] = [];
  const vistos = new Set<string>();
  if (Array.isArray(obj.decisiones)) {
    for (const item of obj.decisiones) {
      if (!item || typeof item !== "object") continue;
      const r = item as Record<string, unknown>;
      if (typeof r.simId !== "string" || r.simId.trim() === "") continue;
      if (vistos.has(r.simId)) continue;
      const dec = r.decision;
      if (dec !== null && !esDecisionValida(dec)) continue;
      const diaItem = esDiaValido(r.dia) ? r.dia : dia;
      vistos.add(r.simId);
      decisiones.push({
        simId: r.simId,
        decision: dec,
        dia: diaItem,
      });
    }
  }

  return {
    dia,
    sorpresasHoy,
    decisiones: decisiones.slice(-MAX_DECISIONES),
  };
}

export function sorpresasDeHoy(estado: EstadoRefuerzo, ahoraISO: string): number {
  if (!ahoraISO || !Number.isFinite(Date.parse(ahoraISO))) return 0;
  const hoy = diaLaPaz(ahoraISO);
  if (estado.dia !== hoy) return 0;
  return Math.max(0, estado.sorpresasHoy);
}

export function decisionGuardada(
  estado: EstadoRefuerzo,
  simId: string,
): DecisionRefuerzo | null | undefined {
  if (!simId) return undefined;
  const hallado = estado.decisiones.find((d) => d.simId === simId);
  return hallado ? hallado.decision : undefined;
}

export function aplicarDecision(
  estado: EstadoRefuerzo,
  simId: string,
  decision: DecisionRefuerzo | null,
  ahoraISO: string,
): EstadoRefuerzo {
  if (!simId) return estado;
  if (estado.decisiones.some((d) => d.simId === simId)) {
    return estado;
  }

  const hoy = diaLaPaz(ahoraISO);
  const baseHoy = estado.dia === hoy ? Math.max(0, estado.sorpresasHoy) : 0;
  const sorpresasHoy = decision !== null ? baseHoy + 1 : baseHoy;
  const nuevasDecisiones = [
    ...estado.decisiones,
    { simId, decision, dia: hoy },
  ].slice(-MAX_DECISIONES);

  return {
    dia: hoy,
    sorpresasHoy,
    decisiones: nuevasDecisiones,
  };
}

function inWindow(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function refuerzoActivo(): boolean {
  if (!inWindow()) return true;
  try {
    const val = localStorage.getItem(OFF_KEY);
    return val !== "1" && val !== "true";
  } catch {
    return true;
  }
}

export function setRefuerzoActivo(activo: boolean): void {
  if (!inWindow()) return;
  try {
    if (activo) {
      localStorage.removeItem(OFF_KEY);
    } else {
      localStorage.setItem(OFF_KEY, "1");
    }
  } catch {
    /* noop */
  }
}

export function leerEstadoRefuerzo(): EstadoRefuerzo {
  if (!inWindow()) return estadoVacio();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return estadoVacio();
    return normalizarEstado(raw);
  } catch {
    return estadoVacio();
  }
}

export function guardarEstadoRefuerzo(estado: EstadoRefuerzo): void {
  if (!inWindow()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch {
    /* noop */
  }
}
