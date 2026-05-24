const GROQ_DEFAULT_MAX_COMPLETION_TOKENS = 3000;
const GROQ_RETRY_MAX_COMPLETION_TOKENS = 1800;

export function maxCompletionTokensForProvider(providerId, requestedTokens) {
  if (providerId === "groq") {
    return Math.min(requestedTokens, GROQ_DEFAULT_MAX_COMPLETION_TOKENS);
  }
  return requestedTokens;
}

export function nextGroqRetryTokenBudget(currentTokens) {
  if (currentTokens <= GROQ_RETRY_MAX_COMPLETION_TOKENS) return null;
  return GROQ_RETRY_MAX_COMPLETION_TOKENS;
}

export function isTokenLimitError(message) {
  const normalized = message.toLowerCase();
  return normalized.includes("too large")
    || normalized.includes("rate limit")
    || normalized.includes("rate_limit")
    || normalized.includes("tokens per day")
    || normalized.includes("tokens per minute")
    || normalized.includes("quota")
    || normalized.includes("resource exhausted")
    || normalized.includes("request too large")
    || normalized.includes("please reduce your message size");
}

export function isProviderCapacityError(message) {
  const normalized = String(message ?? "").toLowerCase();
  return isTokenLimitError(normalized)
    || normalized.includes("unavailable")
    || normalized.includes("overloaded")
    || normalized.includes("temporarily unavailable")
    || normalized.includes("try again later");
}
