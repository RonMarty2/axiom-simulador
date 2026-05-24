// Stub para Axiom standalone: aiProvider intenta cargar config de IA desde DB
// (Supabase) como segundo fallback. Aqui retornamos vacio — las keys vienen
// de process.env (.env.local).

export async function dbLoadAIConfig(): Promise<{
  providerKeys: Record<string, string>;
  serviceConfigs: Record<string, unknown>;
}> {
  return { providerKeys: {}, serviceConfigs: {} };
}
