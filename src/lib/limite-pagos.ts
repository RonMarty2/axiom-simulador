// Tope de avisos de pago por alumno. Se cuenta con los pagos que ya están en la base
// (no con memoria del proceso, que en Vercel no sirve: cada instancia tiene la suya).
// Evita que una cuenta llene el panel de Ronald y su Telegram con avisos repetidos.

export const MAX_PAGOS_POR_HORA = 5;
export const MAX_PAGOS_PENDIENTES = 3;

export interface PagoMinimo {
  fecha: string;
  estado: string;
}

/** Devuelve el motivo si el alumno ya pasó el tope, o null si puede registrar otro pago. */
export function motivoLimitePagos(pagos: PagoMinimo[], ahora: Date = new Date()): string | null {
  const haceUnaHora = ahora.getTime() - 3_600_000;
  const recientes = pagos.filter((p) => new Date(p.fecha).getTime() >= haceUnaHora).length;
  if (recientes >= MAX_PAGOS_POR_HORA) {
    return "Registraste muchos pagos en poco tiempo. Espera un rato y vuelve a intentar.";
  }
  const pendientes = pagos.filter((p) => p.estado === "pendiente").length;
  if (pendientes >= MAX_PAGOS_PENDIENTES) {
    return "Ya tienes varios pagos esperando revisión. Te avisaremos cuando se aprueben.";
  }
  return null;
}
