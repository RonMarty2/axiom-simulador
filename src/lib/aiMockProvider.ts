// Stub liviano: el mock mode original devolvía contenido para monografías.
// En Axiom standalone solo activamos mock si NINGUNA env var de IA está set.

export function shouldUseMockMode(_providerKeyCache: Map<string, string>): boolean {
  return (
    !process.env.GROQ_API_KEY &&
    !process.env.ANTHROPIC_API_KEY &&
    !process.env.OPENAI_API_KEY &&
    !process.env.GEMINI_API_KEY &&
    !process.env.GOOGLE_API_KEY
  );
}

export function generateMockResponse(_system: string, _user: string): string {
  return "[MODO DEMO] No hay API keys configuradas. Configura GROQ_API_KEY en .env.local para respuestas reales.";
}
