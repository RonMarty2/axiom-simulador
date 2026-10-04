// Los precios, en UN solo lugar.
//
// Por qué existe este archivo: estaban escritos tres veces (el route handler
// de /api/pagos, la pantalla /pagar y la pantalla /precios). Coincidían de
// casualidad en 100 / 50 / 50, y el día que alguien cambiara uno el alumno
// iba a ver un precio en la tabla, otro en la pantalla de pago, y el servidor
// le iba a cobrar un tercero sin que nada fallara.
//
// El que MANDA sigue siendo el servidor: `/api/pagos` calcula el monto con
// estas constantes y nunca confía en lo que le manda el cliente. Las pantallas
// importan de acá para MOSTRAR lo mismo que se va a cobrar.

export const PRECIOS_BOB = {
  pro: 50,
  premium: 100,
  cambioFacultad: 50,
} as const;

// Lo mismo en dólares digitales (USDT), para quien paga por Binance Pay o
// RedotPay. NO es una conversión automática: el tipo de cambio paralelo se
// mueve y Ronald fija el monto en USDT a mano. Premium = 10 USDT es el monto
// que ya trae grabado el QR de RedotPay; el resto sigue la misma proporción.
export const PRECIOS_USDT = {
  pro: 5,
  premium: 10,
  cambioFacultad: 5,
} as const;

export const MONEDA = "BOB";
export type Moneda = "BOB" | "USDT";

// Monto de un pago de plan. Un solo lugar donde se decide cuánto sale cada uno.
export function precioPlan(plan: "pro" | "premium"): number {
  return plan === "premium" ? PRECIOS_BOB.premium : PRECIOS_BOB.pro;
}

// Lo que se muestra en pantalla: "Bs. 100".
export function formatearBs(monto: number): string {
  return `Bs. ${monto}`;
}

// El monto de un pago según la moneda en la que se paga. El servidor lo usa
// para cobrar y las pantallas para mostrar: nunca se calcula en otro lado.
export function montoPlanEn(plan: "pro" | "premium", moneda: Moneda): number {
  const tabla = moneda === "USDT" ? PRECIOS_USDT : PRECIOS_BOB;
  return plan === "premium" ? tabla.premium : tabla.pro;
}

export function montoCambioFacultadEn(moneda: Moneda): number {
  return moneda === "USDT" ? PRECIOS_USDT.cambioFacultad : PRECIOS_BOB.cambioFacultad;
}

// "Bs. 100" o "10 USDT".
export function formatearMonto(monto: number, moneda: Moneda): string {
  return moneda === "USDT" ? `${monto} USDT` : formatearBs(monto);
}
