// Almacenamiento client-side de simuladores activos.
// Razon: Vercel es serverless, cada request va a una lambda distinta y el
// estado in-memory de axiomDB no persiste. Hasta que conectemos BD real
// (Supabase), guardamos el simulador en localStorage del navegador.

import type { Simulador } from "@/lib/axiom/types";

const PREFIX = "axiom_sim_";

export function guardarSimulador(sim: Simulador): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PREFIX + sim.id, JSON.stringify(sim));
  } catch (e) {
    console.error("[sim-storage] no se pudo guardar:", e);
  }
}

export function leerSimulador(id: string): Simulador | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREFIX + id);
    if (!raw) return null;
    return JSON.parse(raw) as Simulador;
  } catch {
    return null;
  }
}

export function actualizarSimulador(id: string, updates: Partial<Simulador>): Simulador | null {
  const sim = leerSimulador(id);
  if (!sim) return null;
  const actualizado = { ...sim, ...updates };
  guardarSimulador(actualizado);
  return actualizado;
}

export function eliminarSimulador(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PREFIX + id);
}

export function listarSimuladoresActivos(): Simulador[] {
  if (typeof window === "undefined") return [];
  const sims: Simulador[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(PREFIX)) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) sims.push(JSON.parse(raw));
      } catch {}
    }
  }
  return sims;
}
