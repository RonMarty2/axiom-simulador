export const REFUERZO = {
  zonaOffsetMin: -240,
  esfuerzoMinimo: 0.5,
  tope: { porVisita: 2, porDia: 5 },
  prioridad: [
    "retorno_tras_pausa",
    "error_corregido",
    "mejora_area_debil",
    "simulacro_terminado",
  ],
  probabilidad: {
    retorno_tras_pausa: 0.6,
    error_corregido: 0.45,
    mejora_area_debil: 0.7,
    simulacro_terminado: 0.33,
  },
  retorno: { pausaMinDias: 1 },
  mejora: { previosMin: 2, subidaMin: 10, umbralDebil: 60 },
  ventanaDias: 7,
  MIN_USUARIOS_PARA_LEER: 30,
} as const;

export type EventoRefuerzo = (typeof REFUERZO.prioridad)[number];
