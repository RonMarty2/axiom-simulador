// Stub liviano: en Axiom standalone no usamos persistencia de configs IA
// en disco. aiProvider lee las keys directamente de process.env.

export function loadFromDisk(): Record<string, unknown> {
  return {};
}

export function saveToDisk(_data: Record<string, unknown>): void {
  // no-op en Axiom standalone
}

export function reloadFromDisk(): Record<string, unknown> {
  return {};
}
