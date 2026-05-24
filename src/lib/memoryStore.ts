// Stub liviano: en Axiom standalone solo necesitamos logError para que
// aiProvider compile y registre errores. Va a console (no a disk).

export interface LogErrorPayload {
  nivel: "info" | "warning" | "error" | "critical";
  etapa: string;
  service_id?: string;
  mensaje: string;
  detalle?: string;
}

export function logError(payload: LogErrorPayload): void {
  console.error(
    `[${payload.nivel.toUpperCase()}] ${payload.etapa}: ${payload.mensaje}`,
    payload.detalle ?? ""
  );
}
