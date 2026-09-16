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

export const MONEDA = "BOB";

// Monto de un pago de plan. Un solo lugar donde se decide cuánto sale cada uno.
export function precioPlan(plan: "pro" | "premium"): number {
  return plan === "premium" ? PRECIOS_BOB.premium : PRECIOS_BOB.pro;
}

// Lo que se muestra en pantalla: "Bs. 100".
export function formatearBs(monto: number): string {
  return `Bs. ${monto}`;
}
