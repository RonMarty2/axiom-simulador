export interface FilaHistorialComparacion {
  id?: string;
  simulador_id?: string;
  fecha: string;
  nota: number;
}

export function anteriorA(
  historial: readonly FilaHistorialComparacion[],
  simId: string,
): { nota: number } | null {
  if (!Array.isArray(historial) || historial.length === 0) return null;
  const otros = historial
    .filter((h) => h.simulador_id !== simId)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
  const previo = otros[0];
  return previo ? { nota: previo.nota } : null;
}
