// Stub para Axiom standalone: aiProvider intenta cargar config de IA desde DB
// (Supabase) como segundo fallback. Aqui retornamos vacio — las keys vienen
// de process.env (.env.local).

interface ServiceConfigShape {
  provider_id: string;
  model: string;
  api_key: string;
}

export async function dbLoadAIConfig(): Promise<{
  providerKeys: Record<string, string>;
  serviceConfigs: Record<string, ServiceConfigShape>;
}> {
  return { providerKeys: {}, serviceConfigs: {} };
}
