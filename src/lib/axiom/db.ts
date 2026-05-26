// axiomDB: persistencia de simuladores y entidades menores.
// Simuladores -> tabla `simuladores` en Supabase si está configurado.
// ExamenConfig y PlanPersonalizado: in-memory por ahora (no críticos).

import { supabaseAdmin, supabaseConfigurado } from "@/lib/supabase";
import type { ExamenConfig, Simulador, PlanPersonalizado } from "./types";

const configStore: Record<string, ExamenConfig> = {};
const simuladorStore: Record<string, Simulador> = {};
const planStore: Record<string, PlanPersonalizado> = {};

function db() { return supabaseAdmin(); }

export const axiomDB = {
  // ─── Config (in-memory) ───────────────────────────────────────
  async getConfig(id: string): Promise<ExamenConfig | null> {
    return configStore[id] || null;
  },
  async createConfig(config: ExamenConfig): Promise<ExamenConfig> {
    configStore[config.id] = config;
    return config;
  },
  async updateConfig(id: string, updates: Partial<ExamenConfig>): Promise<ExamenConfig> {
    const config = configStore[id];
    if (!config) throw new Error("Config not found");
    Object.assign(config, updates);
    return config;
  },

  // ─── Simuladores ──────────────────────────────────────────────
  async getSimulador(id: string): Promise<Simulador | null> {
    if (supabaseConfigurado()) {
      const { data, error } = await db().from("simuladores").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return (data ?? null) as Simulador | null;
    }
    return simuladorStore[id] || null;
  },

  async getSimuladorById(id: string): Promise<Simulador | null> {
    return this.getSimulador(id);
  },

  async getSimuladoresByUsuario(usuarioId: string): Promise<Simulador[]> {
    if (supabaseConfigurado()) {
      const { data, error } = await db()
        .from("simuladores")
        .select("*")
        .eq("usuario_id", usuarioId)
        .order("fecha_inicio", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Simulador[];
    }
    return Object.values(simuladorStore).filter((s) => s.usuario_id === usuarioId);
  },

  async createSimulador(simulador: Simulador): Promise<Simulador> {
    if (supabaseConfigurado()) {
      const { data, error } = await db().from("simuladores").upsert(simulador).select().single();
      if (error) throw error;
      return data as Simulador;
    }
    simuladorStore[simulador.id] = simulador;
    return simulador;
  },

  async updateSimulador(id: string, updates: Partial<Simulador>): Promise<Simulador> {
    if (supabaseConfigurado()) {
      const { data, error } = await db().from("simuladores").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data as Simulador;
    }
    const simulador = simuladorStore[id];
    if (!simulador) throw new Error("Simulador not found");
    Object.assign(simulador, updates);
    return simulador;
  },

  async saveRespuestas(simuladorId: string, respuestas: Record<string, string>): Promise<void> {
    if (supabaseConfigurado()) {
      const { error } = await db()
        .from("simuladores")
        .update({ respuestas_usuario: respuestas })
        .eq("id", simuladorId);
      if (error) throw error;
      return;
    }
    const simulador = simuladorStore[simuladorId];
    if (simulador) simulador.respuestas_usuario = respuestas;
  },

  // ─── Plans (in-memory) ────────────────────────────────────────
  async createPlan(plan: PlanPersonalizado): Promise<PlanPersonalizado> {
    planStore[plan.id] = plan;
    return plan;
  },
  async getPlan(id: string): Promise<PlanPersonalizado | null> {
    return planStore[id] || null;
  },
};
