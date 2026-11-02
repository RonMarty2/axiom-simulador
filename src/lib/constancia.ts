import { REFUERZO } from "./refuerzo-config.ts";
import { diaLaPaz } from "./refuerzo.ts";

export interface CeldaConstancia {
  dia: string;
  letra: string;
  practicado: boolean;
  hoy: boolean;
}

const MS_POR_DIA = 86_400_000;
const LETRAS_SEMANA = ["D", "L", "M", "X", "J", "V", "S"] as const;

export function ultimos7Dias(
  fechas: string[],
  ahoraISO: string,
): CeldaConstancia[] {
  const hoy = diaLaPaz(ahoraISO);
  const msHoy = Date.parse(`${hoy}T00:00:00.000Z`);

  const practicados = new Set<string>();
  for (const f of fechas) {
    if (!f || typeof f !== "string" || !Number.isFinite(Date.parse(f))) continue;
    practicados.add(diaLaPaz(f));
  }

  const totalDias = REFUERZO.ventanaDias;
  const resultado: CeldaConstancia[] = [];

  for (let offset = totalDias - 1; offset >= 0; offset--) {
    const fechaUTC = new Date(msHoy - offset * MS_POR_DIA);
    const dia = fechaUTC.toISOString().slice(0, 10);
    const letra = LETRAS_SEMANA[fechaUTC.getUTCDay()];
    resultado.push({
      dia,
      letra,
      practicado: practicados.has(dia),
      hoy: offset === 0,
    });
  }

  return resultado;
}
