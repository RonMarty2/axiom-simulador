// Repaso de errores por cajas (decision de Ronald, plan de mejoras 5.3): «Mis errores» vuelve a preguntar
// LAS MISMAS preguntas falladas en su fecha de repaso, y una pregunta acertada 3 veces seguidas sale de la lista.
// Se eligio esto y no ts-fsrs: hace exactamente la regla pedida, son pocas lineas y no agrega dependencias.
//   falla             -> caja 0, repasar en 1 dia
//   acierta (caja 0)  -> caja 1, en 3 dias
//   acierta (caja 1)  -> caja 2, en 7 dias
//   acierta (caja 2)  -> dominada (sale de la lista; no se borra)
// Un acierto solo cuenta si la pregunta ya tocaba repasar: acertarla dos veces el mismo dia no la «domina».

export const DIAS_POR_CAJA = [1, 3, 7];
export const ACIERTOS_PARA_DOMINAR = DIAS_POR_CAJA.length;

export interface EstadoRepaso {
  caja: number;
  proximo: string; // ISO
  dominada_en: string | null;
}

const masDias = (ahora: Date, dias: number) => new Date(ahora.getTime() + dias * 86_400_000).toISOString();

/** lo que pasa con una pregunta guardada como error despues de responderla */
export function programar(previo: EstadoRepaso | null, acierto: boolean, ahora: Date): EstadoRepaso | null {
  if (!acierto) return { caja: 0, proximo: masDias(ahora, DIAS_POR_CAJA[0]), dominada_en: null };
  // acertar algo que nunca fallo no la mete en la lista; acertar algo dominado no cambia nada
  if (!previo || previo.dominada_en) return previo;
  // todavia no le tocaba: no cuenta (evita dominarla repitiendola el mismo dia)
  if (new Date(previo.proximo).getTime() > ahora.getTime()) return previo;
  const caja = previo.caja + 1;
  if (caja >= ACIERTOS_PARA_DOMINAR) return { caja, proximo: previo.proximo, dominada_en: ahora.toISOString() };
  return { caja, proximo: masDias(ahora, DIAS_POR_CAJA[caja]), dominada_en: null };
}

/** le toca repasar hoy: no esta dominada y su fecha ya llego (sin fecha, como los errores viejos, toca ya) */
export function tocaRepasar(e: Partial<EstadoRepaso>, ahora: Date): boolean {
  if (e.dominada_en) return false;
  return !e.proximo || new Date(e.proximo).getTime() <= ahora.getTime();
}

/** la fecha del repaso mas cercano entre las que todavia no tocan (null si no hay) */
export function proximoRepaso(es: Partial<EstadoRepaso>[], ahora: Date): string | null {
  const futuras = es
    .filter((e) => !e.dominada_en && e.proximo && new Date(e.proximo).getTime() > ahora.getTime())
    .map((e) => e.proximo as string)
    .sort();
  return futuras[0] ?? null;
}
