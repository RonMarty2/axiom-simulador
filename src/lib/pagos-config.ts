// A dónde y cómo se le paga a AXIOM, en UN solo lugar.
//
// Por qué existe: hasta el 4-oct-2026 /pagar tenía datos de demostración
// escritos en el JSX (un número de Tigo falso, un "QR" hecho con CSS y una
// cuenta inventada). Ahora cada método sale de acá, y el servidor valida que el
// método elegido esté en esta lista antes de crear el pago.
//
// El pago sigue siendo manual: el alumno paga, declara el pago y Ronald lo
// aprueba en /admin/pagos. Esto solo dice dónde se paga.
//
// Para cambiar un QR: `node scripts/cambiar-qr.mjs <metodo> <imagen>` (ver el
// script) y subir a main. Si el QR tiene monto o fecha de vencimiento grabados
// se declaran ahí y la pantalla deja de ofrecerlo cuando no corresponde, en vez
// de mandar al alumno a escanear algo que su banco va a rechazar.
// Para sumar un método nuevo: agregarlo acá, en pagos-qr.json y en ORDEN_METODOS.
// La tabla `pagos` NO restringe el método (la validación es esMetodoActivo en
// /api/pagos), así que no hace falta migración.
//
// Este archivo no importa nada del servidor: lo usa también la pantalla.

import { type Moneda } from "./precios.ts";
import qrDatos from "./pagos-qr.json" with { type: "json" };

// Los QR (imagen, monto grabado, vencimiento) viven en pagos-qr.json y se
// cambian con `node scripts/cambiar-qr.mjs`, sin tocar este archivo.
type DatosQr = { imagen: string; monto: number | null; vence: string | null };
const QR = qrDatos as Record<MetodoActivo, DatosQr>;

export type MetodoActivo = "qr_bancario" | "binance_pay" | "redotpay";
// Tigo Money y transferencia ya no se ofrecen, pero hay pagos viejos (y datos
// de ejemplo) con esos valores: el tipo y la tabla de pagos los siguen aceptando.
export type MetodoPago = MetodoActivo | "tigo_money" | "transferencia";

export interface ConfigMetodo {
  id: MetodoActivo;
  nombre: string;
  descripcion: string;
  moneda: Moneda;
  // Imagen del QR, dentro de public/.
  qr: string;
  // Monto grabado en el QR. null = el QR no trae monto y lo escribe el alumno.
  qrMonto: number | null;
  // Fecha (AAAA-MM-DD) hasta la que el QR sirve. null = no vence.
  qrVence: string | null;
  // Dato para pagar sin escanear (usuario o ID), si el método lo tiene.
  destinatario?: { etiqueta: string; valor: string };
  // Qué comprobante se le pide al alumno.
  referencia: { etiqueta: string; ejemplo: string };
  // Cripto: el pago no se puede deshacer, así que se avisa.
  irreversible: boolean;
}

const BASE: Record<MetodoActivo, Omit<ConfigMetodo, "qr" | "qrMonto" | "qrVence">> = {
  qr_bancario: {
    id: "qr_bancario",
    nombre: "QR bancario (BNB)",
    descripcion: "Escanea el QR y paga desde la app de tu banco",
    moneda: "BOB",
    referencia: { etiqueta: "Número de comprobante", ejemplo: "El que te muestra tu banco al pagar" },
    irreversible: false,
  },
  binance_pay: {
    id: "binance_pay",
    nombre: "Binance Pay (USDT)",
    descripcion: "Escanea el QR con la app de Binance o busca el usuario",
    moneda: "USDT",
    destinatario: { etiqueta: "Usuario de Binance Pay", valor: "RonMarty" },
    referencia: { etiqueta: "ID de la orden", ejemplo: "Lo ves en el detalle del pago en Binance" },
    irreversible: true,
  },
  redotpay: {
    id: "redotpay",
    nombre: "RedotPay (USDT)",
    descripcion: "Escanea el QR con la app de RedotPay o usa el ID",
    moneda: "USDT",
    destinatario: { etiqueta: "ID de RedotPay", valor: "1939601201" },
    referencia: { etiqueta: "ID de la transacción", ejemplo: "Lo ves en el detalle del pago en RedotPay" },
    irreversible: true,
  },
};

export const METODOS_ACTIVOS = Object.fromEntries(
  (Object.keys(BASE) as MetodoActivo[]).map((id) => [
    id,
    { ...BASE[id], qr: QR[id].imagen, qrMonto: QR[id].monto, qrVence: QR[id].vence },
  ]),
) as Record<MetodoActivo, ConfigMetodo>;

export const ORDEN_METODOS: MetodoActivo[] = ["qr_bancario", "binance_pay", "redotpay"];

export function esMetodoActivo(x: unknown): x is MetodoActivo {
  return typeof x === "string" && x in METODOS_ACTIVOS;
}

const ETIQUETAS_VIEJAS: Record<string, string> = {
  tigo_money: "Tigo Money",
  transferencia: "Transferencia",
};

// Para las tablas de /cuenta y /admin/pagos.
export function etiquetaMetodo(id: string): string {
  if (esMetodoActivo(id)) return METODOS_ACTIVOS[id].nombre;
  return ETIQUETAS_VIEJAS[id] ?? id.replace("_", " ");
}

// ¿Se puede ofrecer el QR de este método para este monto, hoy?
export function qrVigente(m: ConfigMetodo, monto: number, hoy: Date = new Date()): boolean {
  if (m.qrMonto !== null && m.qrMonto !== monto) return false;
  if (m.qrVence !== null && hoy.toISOString().slice(0, 10) > m.qrVence) return false;
  return true;
}

// ¿Tiene el método alguna forma de pagar este monto? Si el QR no sirve y no hay
// usuario o ID para pagar a mano, no se ofrece.
export function metodoDisponible(m: ConfigMetodo, monto: number, hoy: Date = new Date()): boolean {
  return qrVigente(m, monto, hoy) || m.destinatario !== undefined;
}
