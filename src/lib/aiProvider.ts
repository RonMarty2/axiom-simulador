// Unified AI provider — supports all major providers.
// Per-service configuration: each service can use a different provider + model.

import {
  isProviderCapacityError,
  isTokenLimitError,
  maxCompletionTokensForProvider,
  nextGroqRetryTokenBudget,
} from "@/lib/aiTokenPolicy.mjs";
import { logError } from "@/lib/memoryStore";
import { loadFromDisk } from "@/lib/persistence";
import { generateMockResponse, shouldUseMockMode } from "@/lib/aiMockProvider";

export interface AICallResult {
  text: string;
  provider: string;
  model: string;
}

// ── Provider catalog ──────────────────────────────────────────────────────────

export interface AIProviderInfo {
  id: string;
  name: string;
  color: string;
  website: string;
  apiDocsUrl: string;
  defaultModel: string;
  models: { id: string; label: string; contextK: number }[];
  authHeader: "Bearer" | "x-api-key";
  endpoint: string;
  format: "openai" | "anthropic" | "google";
}

export const AI_PROVIDERS: AIProviderInfo[] = [
  {
    id: "groq",
    name: "Groq",
    color: "#f97316",
    website: "https://groq.com",
    apiDocsUrl: "https://console.groq.com/keys",
    defaultModel: "llama-3.3-70b-versatile",
    models: [
      { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B (recomendado)", contextK: 128 },
      { id: "llama-3.1-8b-instant",    label: "Llama 3.1 8B (rápido)",        contextK: 128 },
      { id: "mixtral-8x7b-32768",      label: "Mixtral 8x7B",                 contextK: 32  },
      { id: "gemma2-9b-it",            label: "Gemma 2 9B",                   contextK: 8   },
    ],
    authHeader: "Bearer",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    format: "openai",
  },
  {
    id: "openai",
    name: "OpenAI",
    color: "#4ade80",
    website: "https://openai.com",
    apiDocsUrl: "https://platform.openai.com/api-keys",
    defaultModel: "gpt-4o-mini",
    models: [
      { id: "gpt-4o-mini",   label: "GPT-4o Mini (económico)",  contextK: 128 },
      { id: "gpt-4o",        label: "GPT-4o (potente)",         contextK: 128 },
      { id: "gpt-4-turbo",   label: "GPT-4 Turbo",              contextK: 128 },
      { id: "o1-mini",       label: "o1-mini (razonamiento)",   contextK: 128 },
    ],
    authHeader: "Bearer",
    endpoint: "https://api.openai.com/v1/chat/completions",
    format: "openai",
  },
  {
    id: "lmstudio",
    name: "LM Studio Local",
    color: "#8b5cf6",
    website: "http://localhost:1234",
    apiDocsUrl: "http://localhost:1234",
    defaultModel: "google/gemma-4-e4b",
    models: [
      {
        id: "google/gemma-4-e4b",
        label: "Gemma 4 E4B local (LM Studio)",
        contextK: 128,
      },
    ],
    authHeader: "Bearer",
    endpoint: "http://localhost:1234/v1/chat/completions",
    format: "openai",
  },
  {
    id: "anthropic",
    name: "Anthropic (Claude)",
    color: "#a78bfa",
    website: "https://anthropic.com",
    apiDocsUrl: "https://console.anthropic.com/settings/keys",
    defaultModel: "claude-haiku-4-5-20251001",
    models: [
      { id: "claude-haiku-4-5-20251001",  label: "Claude Haiku 4.5 (rápido)",    contextK: 200 },
      { id: "claude-sonnet-4-6",          label: "Claude Sonnet 4.6 (balanceado)",contextK: 200 },
      { id: "claude-opus-4-7",            label: "Claude Opus 4.7 (máx calidad)", contextK: 200 },
    ],
    authHeader: "x-api-key",
    endpoint: "https://api.anthropic.com/v1/messages",
    format: "anthropic",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    color: "#60a5fa",
    website: "https://ai.google.dev",
    apiDocsUrl: "https://aistudio.google.com/app/apikey",
    defaultModel: "gemini-2.5-pro",
    models: [
      { id: "gemini-2.5-pro",       label: "Gemini 2.5 Pro (máx calidad)", contextK: 1000 },
      { id: "gemini-2.5-flash",     label: "Gemini 2.5 Flash (balanceado)",contextK: 1000 },
      { id: "gemini-2.0-flash",     label: "Gemini 2.0 Flash (rápido)",    contextK: 1000 },
    ],
    authHeader: "Bearer",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models",
    format: "google",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    color: "#fb923c",
    website: "https://mistral.ai",
    apiDocsUrl: "https://console.mistral.ai/api-keys",
    defaultModel: "mistral-small-latest",
    models: [
      { id: "mistral-small-latest",  label: "Mistral Small (económico)", contextK: 32  },
      { id: "mistral-medium-latest", label: "Mistral Medium",            contextK: 32  },
      { id: "mistral-large-latest",  label: "Mistral Large (potente)",   contextK: 128 },
      { id: "open-mistral-nemo",     label: "Mistral Nemo (libre)",      contextK: 128 },
    ],
    authHeader: "Bearer",
    endpoint: "https://api.mistral.ai/v1/chat/completions",
    format: "openai",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    color: "#22d3ee",
    website: "https://deepseek.com",
    apiDocsUrl: "https://platform.deepseek.com/api_keys",
    defaultModel: "deepseek-chat",
    models: [
      { id: "deepseek-chat",      label: "DeepSeek V3 (general)",     contextK: 64 },
      { id: "deepseek-reasoner",  label: "DeepSeek R1 (razonamiento)", contextK: 64 },
    ],
    authHeader: "Bearer",
    endpoint: "https://api.deepseek.com/v1/chat/completions",
    format: "openai",
  },
  {
    id: "xai",
    name: "xAI (Grok)",
    color: "#e2e8f0",
    website: "https://x.ai",
    apiDocsUrl: "https://console.x.ai",
    defaultModel: "grok-2-latest",
    models: [
      { id: "grok-2-latest",    label: "Grok 2 (avanzado)",   contextK: 131 },
      { id: "grok-beta",        label: "Grok Beta",            contextK: 131 },
    ],
    authHeader: "Bearer",
    endpoint: "https://api.x.ai/v1/chat/completions",
    format: "openai",
  },
  {
    id: "cohere",
    name: "Cohere",
    color: "#34d399",
    website: "https://cohere.com",
    apiDocsUrl: "https://dashboard.cohere.com/api-keys",
    defaultModel: "command-r-plus",
    models: [
      { id: "command-r-plus",   label: "Command R+ (potente)",  contextK: 128 },
      { id: "command-r",        label: "Command R (balanceado)", contextK: 128 },
      { id: "command-light",    label: "Command Light (rápido)", contextK: 4   },
    ],
    authHeader: "Bearer",
    endpoint: "https://api.cohere.ai/v1/chat",
    format: "openai",
  },
  {
    id: "together",
    name: "Together AI",
    color: "#c084fc",
    website: "https://together.ai",
    apiDocsUrl: "https://api.together.xyz/settings/api-keys",
    defaultModel: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
    models: [
      { id: "meta-llama/Llama-3.3-70B-Instruct-Turbo", label: "Llama 3.3 70B Turbo",   contextK: 131 },
      { id: "mistralai/Mixtral-8x22B-Instruct-v0.1",   label: "Mixtral 8x22B",          contextK: 65  },
      { id: "Qwen/Qwen2.5-72B-Instruct-Turbo",         label: "Qwen 2.5 72B",           contextK: 32  },
    ],
    authHeader: "Bearer",
    endpoint: "https://api.together.xyz/v1/chat/completions",
    format: "openai",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    color: "#38bdf8",
    website: "https://perplexity.ai",
    apiDocsUrl: "https://www.perplexity.ai/settings/api",
    defaultModel: "llama-3.1-sonar-large-128k-online",
    models: [
      { id: "llama-3.1-sonar-large-128k-online",  label: "Sonar Large (con búsqueda web)", contextK: 128 },
      { id: "llama-3.1-sonar-small-128k-online",  label: "Sonar Small (rápido + web)",     contextK: 128 },
      { id: "llama-3.1-sonar-large-128k-chat",    label: "Sonar Large (sin web)",          contextK: 128 },
    ],
    authHeader: "Bearer",
    endpoint: "https://api.perplexity.ai/chat/completions",
    format: "openai",
  },
];

export function getProviderInfo(id: string): AIProviderInfo | undefined {
  return AI_PROVIDERS.find(p => p.id === id);
}

// ── Per-service config (in-memory, loaded from /api/admin/ai-config) ──────────

interface ServiceConfig {
  provider_id: string;
  model: string;
  api_key: string;
}

const serviceConfigCache = new Map<string, ServiceConfig>();
const serviceIncidentCache = new Map<string, {
  servicio_id: string;
  provider_id: string;
  provider_name: string;
  model: string;
  kind: "token_limit" | "provider_capacity";
  level: "critical" | "warning";
  message: string;
  updated_at: string;
}>();
const incidentThrottleCache = new Map<string, number>();

function setServiceIncident(
  servicioId: string,
  cfg: { provider_id: string; model: string },
  rawMessage: string
) {
  if (!isProviderCapacityError(rawMessage)) return;

  const provider = getProviderInfo(cfg.provider_id);
  const normalized = String(rawMessage ?? "");
  const kind: "token_limit" | "provider_capacity" = isTokenLimitError(normalized)
    ? "token_limit"
    : "provider_capacity";
  const incident = {
    servicio_id: servicioId,
    provider_id: cfg.provider_id,
    provider_name: provider?.name ?? cfg.provider_id,
    model: cfg.model,
    kind,
    level: "critical" as const,
    message: normalized,
    updated_at: new Date().toISOString(),
  };

  serviceIncidentCache.set(servicioId, incident);

  const throttleKey = `${servicioId}:${cfg.provider_id}:${cfg.model}:${kind}`;
  const now = Date.now();
  const last = incidentThrottleCache.get(throttleKey) ?? 0;
  if (now - last < 10 * 60 * 1000) return;
  incidentThrottleCache.set(throttleKey, now);

  logError({
    nivel: "critical",
    etapa: `ai:${servicioId}`,
    service_id: servicioId,
    mensaje:
      kind === "token_limit"
        ? `Servicio ${servicioId} sin creditos/tokens en ${cfg.provider_id}`
        : `Servicio ${servicioId} con proveedor no disponible (${cfg.provider_id})`,
    detalle: normalized,
  });
}

function clearServiceIncident(servicioId: string) {
  serviceIncidentCache.delete(servicioId);
}

export function getServiceIncident(servicioId: string) {
  return serviceIncidentCache.get(servicioId) ?? null;
}

export function listServiceIncidents() {
  return [...serviceIncidentCache.values()].sort((a, b) =>
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}

export function setServiceAIConfig(servicioId: string, cfg: ServiceConfig) {
  serviceConfigCache.set(servicioId, cfg);
  clearServiceIncident(servicioId);
}

export function getServiceAIConfig(servicioId: string): ServiceConfig | undefined {
  hydrateAIConfigFromDisk();
  return serviceConfigCache.get(servicioId);
}

export function getServiceAIStatus(servicioId: string) {
  const cfg = getServiceAIConfig(servicioId);
  if (!cfg) {
    return { configured: false, provider_id: "", provider_name: "", model: "", key_source: "none" as const };
  }
  const provider = getProviderInfo(cfg.provider_id);
  // Una config se considera "configurada" si:
  //   (a) tiene una api_key personal guardada en el panel admin, O
  //   (b) el provider correspondiente tiene su env var seteada (uso compartido)
  // Antes solo el caso (a) contaba — esto causaba que el workspace dijera
  // "IA sin configurar" aunque el admin haya elegido provider+model y haya
  // env var (caso típico: Gemini con GEMINI_API_KEY en Vercel).
  const personalKey = Boolean(cfg.api_key);
  const envKey = Boolean(getProviderKey(cfg.provider_id));
  const configured = personalKey || envKey;
  return {
    configured,
    provider_id: cfg.provider_id,
    provider_name: provider?.name ?? cfg.provider_id,
    model: cfg.model,
    key_source: personalKey ? ("personal" as const) : envKey ? ("env" as const) : ("none" as const),
  };
}

// ── Provider-level API keys (stored separately, loaded from env or admin) ─────

const providerKeyCache = new Map<string, string>([
  ["groq",      process.env.GROQ_API_KEY      ?? ""],
  ["anthropic", process.env.ANTHROPIC_API_KEY ?? ""],
  ["openai",    process.env.OPENAI_API_KEY    ?? ""],
  ["lmstudio",  process.env.LMSTUDIO_API_KEY  ?? "lm-studio-local"],
  ["gemini",    process.env.GEMINI_API_KEY    ?? ""],
  ["mistral",   process.env.MISTRAL_API_KEY   ?? ""],
  ["deepseek",  process.env.DEEPSEEK_API_KEY  ?? ""],
  ["xai",       process.env.XAI_API_KEY       ?? ""],
  ["cohere",    process.env.COHERE_API_KEY     ?? ""],
  ["together",  process.env.TOGETHER_API_KEY  ?? ""],
  ["perplexity",process.env.PERPLEXITY_API_KEY?? ""],
]);

let diskConfigHydrated = false;

/**
 * Carga sincrónica desde .store/data.json. Útil para dev local sin Supabase.
 * En Vercel serverless prácticamente nunca encuentra nada (filesystem ephemeral),
 * pero corre rápido y no estorba — la fuente real ahora es Supabase via
 * hydrateAIConfigAsync().
 */
export function hydrateAIConfigFromDisk() {
  if (diskConfigHydrated) return;
  diskConfigHydrated = true;
  try {
    const disk = loadFromDisk();
    const aiConfig = (disk as { aiConfig?: Record<string, unknown> }).aiConfig ?? {};
    const providerKeys = (aiConfig.providerKeys ?? {}) as Record<string, string>;
    for (const [providerId, key] of Object.entries(providerKeys)) {
      if (key) providerKeyCache.set(providerId, key);
    }

    const serviceConfigs = (aiConfig.serviceConfigs ?? {}) as Record<string, ServiceConfig>;
    for (const [serviceId, cfg] of Object.entries(serviceConfigs)) {
      if (!cfg?.provider_id || !cfg?.model) continue;
      serviceConfigCache.set(serviceId, {
        ...cfg,
        api_key: providerKeys[cfg.provider_id] || cfg.api_key || "",
      });
    }
  } catch {
    /* Persistence is optional in development. */
  }
}

/**
 * Carga async desde Supabase. Llamar al inicio de cada API route que use IA
 * (en Vercel serverless cada invocación arranca con caches vacíos). Cachea
 * el resultado por 60s para evitar hits repetidos a Supabase en la misma
 * invocación caliente.
 */
let lastSupabaseHydrate = 0;
const HYDRATE_TTL_MS = 60_000;

export async function hydrateAIConfigAsync(): Promise<void> {
  const now = Date.now();
  if (now - lastSupabaseHydrate < HYDRATE_TTL_MS) return;
  lastSupabaseHydrate = now;

  // Lazy-load para no romper desarrollo sin Supabase ni el bundle.
  const { dbLoadAIConfig } = await import("@/lib/db/aiConfig");
  const { providerKeys, serviceConfigs } = await dbLoadAIConfig();

  for (const [providerId, key] of Object.entries(providerKeys)) {
    if (key) providerKeyCache.set(providerId, key);
  }
  for (const [serviceId, cfg] of Object.entries(serviceConfigs)) {
    if (!cfg?.provider_id || !cfg?.model) continue;
    serviceConfigCache.set(serviceId, cfg);
  }
}

export function setProviderKey(providerId: string, key: string) {
  providerKeyCache.set(providerId, key);
}

export function getProviderKey(providerId: string): string {
  hydrateAIConfigFromDisk();
  return providerKeyCache.get(providerId) ?? "";
}

export function hasProviderKey(providerId: string): boolean {
  hydrateAIConfigFromDisk();
  return !!providerKeyCache.get(providerId);
}

// ── Low-level callers ─────────────────────────────────────────────────────────

async function callOpenAIFormat(
  endpoint: string, apiKey: string, authHeader: "Bearer" | "x-api-key",
  model: string, system: string, user: string, maxTokens: number
): Promise<string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authHeader === "Bearer") headers["Authorization"] = `Bearer ${apiKey}`;
  else headers["x-api-key"] = apiKey;

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
      temperature: 0.35,
      max_tokens: maxTokens,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json() as { choices?: Array<{ message?: { content?: string }; finish_reason?: string }> };
  const text = data.choices?.[0]?.message?.content;
  if (typeof text !== "string" || text.length === 0) {
    const reason = data.choices?.[0]?.finish_reason;
    throw new Error(`OpenAI devolvió respuesta vacía${reason ? ` (finish_reason: ${reason})` : ""}.`);
  }
  return text;
}

async function callAnthropic(
  apiKey: string, model: string, system: string, user: string, maxTokens: number
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message || `HTTP ${res.status}`);
  }
  const data = await res.json() as { content?: Array<{ type?: string; text?: string }>; stop_reason?: string };
  // Anthropic puede devolver múltiples bloques; tomamos el primer text block.
  const textBlock = data.content?.find(b => b.type === "text" || typeof b.text === "string");
  const text = textBlock?.text;
  if (typeof text !== "string" || text.length === 0) {
    throw new Error(`Anthropic devolvió respuesta vacía${data.stop_reason ? ` (stop_reason: ${data.stop_reason})` : ""}.`);
  }
  return text;
}

async function callGemini(
  apiKey: string, model: string, system: string, user: string, maxTokens: number
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // ⚙️ Gemini 2.5 maneja "thinking mode" distinto según variante:
  //   - Pro: thinking SIEMPRE activo, NO se puede desactivar (budget=0 da error 400)
  //   - Flash / Flash-lite: thinking opcional, se puede desactivar con budget=0
  //
  // El thinking consume tokens del budget. Para Pro, compensamos sumando un buffer
  // interno al maxOutputTokens para que después del razonamiento quede espacio para
  // la respuesta real. Para Flash, lo desactivamos directamente.
  const isFlash = /gemini-2\.5-flash/.test(model);
  const isPro = /gemini-2\.5-pro/.test(model);
  // Para Pro: el thinking consume parte del budget. Compensamos con +20% del budget
  // solicitado (con mínimo de 3000 y máximo de 15000). Antes era fijo +3000 que para
  // tareas grandes como ph-latex (50K tokens) resultaba insuficiente y el modelo
  // resumía contenido para entrar en el espacio.
  const proBuffer = isPro ? Math.min(15000, Math.max(3000, Math.floor(maxTokens * 0.2))) : 0;
  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: maxTokens + proBuffer,
    temperature: 0.35,
  };
  if (isFlash) {
    // Flash: desactivar thinking para que todo el budget sea para output.
    generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }
  // Pro: dejar thinking default (no se puede apagar), ya compensamos con +3000 al budget.

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err) || `HTTP ${res.status}`);
  }
  // Parser defensivo: Gemini puede devolver respuestas vacías por safety filters,
  // recitation, max tokens alcanzado sin contenido, o estructuras inesperadas.
  // Antes hacíamos data.candidates[0].content.parts[0].text → crash con undefined.
  const data = await res.json() as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
      finishReason?: string;
    }>;
    promptFeedback?: { blockReason?: string };
  };

  // Caso 1: prompt bloqueado antes de generar (safety)
  if (data.promptFeedback?.blockReason) {
    throw new Error(`Gemini bloqueó el prompt: ${data.promptFeedback.blockReason}`);
  }

  // Caso 2: sin candidates
  const candidate = data.candidates?.[0];
  if (!candidate) {
    throw new Error(`Gemini no devolvió respuesta. Detalle: ${JSON.stringify(data).slice(0, 250)}`);
  }

  // Caso 3: razones específicas de no-contenido
  const reason = candidate.finishReason;
  if (reason === "SAFETY") throw new Error("Gemini bloqueó la respuesta por filtros de seguridad.");
  if (reason === "RECITATION") throw new Error("Gemini bloqueó la respuesta por posible copia de fuente.");
  if (reason === "PROHIBITED_CONTENT") throw new Error("Gemini detectó contenido prohibido en la respuesta.");

  // Caso 4: hay candidate pero sin content/parts/text
  const text = candidate.content?.parts?.[0]?.text;
  if (typeof text !== "string" || text.length === 0) {
    const reasonMsg = reason ? ` (finishReason: ${reason})` : "";
    throw new Error(`Gemini devolvió respuesta vacía${reasonMsg}. Prueba con menos tokens o reformula el prompt.`);
  }

  return text;
}

// ── Main caller — uses provider config ───────────────────────────────────────

export async function llamarIAConConfig(
  providerId: string,
  model: string,
  apiKey: string,
  system: string,
  user: string,
  maxTokens: number
): Promise<string> {
  const info = getProviderInfo(providerId);
  if (!info) throw new Error(`Proveedor desconocido: ${providerId}`);
  if (!apiKey) throw new Error(`API key no configurada para ${info.name}`);

  if (info.format === "anthropic") {
    return callAnthropic(apiKey, model, system, user, maxTokens);
  }
  if (info.format === "google") {
    return callGemini(apiKey, model, system, user, maxTokens);
  }
  // openai-compatible (Groq, OpenAI, Mistral, DeepSeek, xAI, Cohere, Together, Perplexity)
  if (providerId === "groq") {
    // Groq free/dev limits can reject a request when prompt + completion exceed TPM.
    let lastErr = "";
    const tokenBudget = maxCompletionTokensForProvider(providerId, maxTokens);
    try {
      return await callOpenAIFormat(info.endpoint, apiKey, info.authHeader, model, system, user, tokenBudget);
    } catch (e) {
      lastErr = (e as Error).message;
      if (!isTokenLimitError(lastErr)) throw e;
    }

    const retryTokenBudget = nextGroqRetryTokenBudget(tokenBudget);
    if (retryTokenBudget) {
      try {
        return await callOpenAIFormat(info.endpoint, apiKey, info.authHeader, model, system, user, retryTokenBudget);
      } catch (e) {
        lastErr = (e as Error).message;
        if (!isTokenLimitError(lastErr)) throw e;
      }
    }
    throw new Error(lastErr);
  }
  return callOpenAIFormat(info.endpoint, apiKey, info.authHeader, model, system, user, maxTokens);
}

// ── Public API: llamarIA (default chain for backward compat) ─────────────────

export async function llamarIA(
  system: string,
  user: string,
  maxTokens = 7000,
  servicioId?: string
): Promise<AICallResult> {
  // 🧪 MODO MOCK AUTOMÁTICO — se activa SOLO si NO hay NINGUNA api key real
  // configurada en el entorno. Permite validar el flujo end-to-end sin
  // gastar tokens. Cuando el usuario agrega al menos una key real (Groq,
  // Anthropic, OpenAI, Gemini, etc.) este check pasa de largo y el sistema
  // usa el proveedor real con la cascada normal.
  if (shouldUseMockMode(providerKeyCache)) {
    console.log("[aiProvider] 🧪 MOCK MODE activo — no hay API keys configuradas. Devolviendo respuesta stub.");
    const text = generateMockResponse(system, user);
    return { text, provider: "mock", model: "mock-validator-v1" };
  }

  if (servicioId) {
    const cfg = getServiceAIConfig(servicioId);
    if (cfg && cfg.api_key) {
      try {
        const text = await llamarIAConConfig(cfg.provider_id, cfg.model, cfg.api_key, system, user, maxTokens);
        clearServiceIncident(servicioId);
        return { text, provider: cfg.provider_id, model: cfg.model };
      } catch (e) {
        const errMsg = (e as Error).message;
        setServiceIncident(servicioId, cfg, errMsg);
        // ⚠️ FALLBACK AUTOMÁTICO: si el proveedor configurado falla (saturación,
        // rate limit, timeout, etc.), reintentamos con la cascada de proveedores
        // disponibles en env vars. El usuario nunca ve el error si hay backup.
        console.warn(`[aiProvider] ${cfg.provider_id}/${cfg.model} falló: ${errMsg.slice(0, 200)}. Intentando cascada de fallback...`);
        const fallbackChain: { id: string; model: string }[] = [
          { id: "anthropic", model: "claude-haiku-4-5-20251001" },
          { id: "groq",      model: "llama-3.3-70b-versatile" },
          { id: "openai",    model: "gpt-4o-mini" },
          { id: "gemini",    model: "gemini-2.5-flash" },
        ].filter(p => p.id !== cfg.provider_id); // no reintentar con el mismo que falló

        for (const { id, model } of fallbackChain) {
          const key = getProviderKey(id);
          if (!key) continue;
          try {
            console.log(`[aiProvider] Fallback intentando ${id}/${model}...`);
            const text = await llamarIAConConfig(id, model, key, system, user, maxTokens);
            console.log(`[aiProvider] ✓ Fallback ${id}/${model} OK.`);
            return { text, provider: id, model };
          } catch (fbErr) {
            console.warn(`[aiProvider] Fallback ${id} también falló: ${(fbErr as Error).message.slice(0, 200)}`);
          }
        }
        // Si todos los fallbacks fallaron también, lanzar error amigable.
        throw new Error(`Estamos teniendo problemas temporales con los proveedores de IA. Por favor intenta de nuevo en unos minutos. Si el problema persiste contactá al equipo.`);
      }
    }
    throw new Error(`La inteligencia artificial no está configurada para este servicio. Si sos admin, configurala en Admin → Modelos & APIs.`);
  }

  // Legacy endpoints without service context keep the environment chain.
  const chain: { id: string; model: string }[] = [
    { id: "groq",      model: "llama-3.3-70b-versatile" },
    { id: "anthropic", model: "claude-haiku-4-5-20251001" },
    { id: "openai",    model: "gpt-4o-mini" },
  ];

  const errors: string[] = [];
  for (const { id, model } of chain) {
    const key = getProviderKey(id);
    if (!key) continue;
    try {
      const text = await llamarIAConConfig(id, model, key, system, user, maxTokens);
      return { text, provider: id, model };
    } catch (e) {
      errors.push(`${id}: ${(e as Error).message}`);
    }
  }

  throw new Error(
    `Ningún proveedor de IA disponible. Configura al menos una API key en el panel Admin → Modelos & APIs.\n${errors.join(" | ")}`
  );
}

// ── Helpers (backward compat) ─────────────────────────────────────────────────

export function extraerJSON(texto: string): Record<string, unknown> | null {
  const blockMatch = texto.match(/```json\s*([\s\S]*?)\s*```/);
  if (blockMatch) {
    try { return JSON.parse(blockMatch[1]); } catch { /* fall */ }
  }
  const start = texto.indexOf("{");
  const end = texto.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try { return JSON.parse(texto.slice(start, end + 1)); } catch { /* fall */ }
  }
  return null;
}

export interface CitaExtraida {
  autor: string; ano?: number; titulo_obra: string;
  fuente?: string; tipo?: string; formato_apa?: string; capitulo?: number;
}

export function extraerCitas(json: Record<string, unknown>): CitaExtraida[] {
  const keys = ["citas_registradas", "citas_cap1", "citas_cap2", "citas_cap3", "bibliografia_final"];
  for (const key of keys) {
    const val = json[key];
    if (Array.isArray(val) && val.length > 0) return val as CitaExtraida[];
  }
  return [];
}
