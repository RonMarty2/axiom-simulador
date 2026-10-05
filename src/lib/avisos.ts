// Avisos a Ronald cuando entra un pago, por Telegram.
//
// Por qué existe: el pago es manual (el alumno declara, Ronald aprueba en
// /admin/pagos) y la app promete activar el acceso en 24 horas. Sin un aviso,
// la única forma de enterarse de un pago nuevo era abrir /admin/pagos a cada
// rato.
//
// Reglas de diseño:
// - Un aviso que falla NUNCA tumba el pago. El alumno ya pagó y su pago ya
//   está guardado; si Telegram está caído o mal configurado, se pierde el
//   aviso y nada más. Por eso `avisarPago` jamás lanza.
// - Si las dos variables de entorno no están, no hace nada (así andan el
//   desarrollo local y los tests sin configurar nada).
// - Va en texto plano: con parse_mode habría que escapar los nombres de los
//   alumnos, y un guion bajo en un nombre rompería el mensaje.
//
// Variables (se cargan en Vercel, ver docs/avisos-telegram.md):
//   TELEGRAM_BOT_TOKEN   el que da @BotFather al crear el bot
//   TELEGRAM_CHAT_ID     el chat de Ronald con ese bot

import { etiquetaMetodo } from "./pagos-config.ts";
import { formatearMonto, type Moneda } from "./precios.ts";

export interface DatosAvisoPago {
  alumno: string;
  tipo: "plan" | "cambio_facultad";
  plan: string | null;
  destino: string | null;
  monto: number;
  moneda: Moneda;
  metodo: string;
  referencia: string;
  conFoto: boolean;
  urlAdmin: string;
}

export function textoAvisoPago(d: DatosAvisoPago): string {
  const que = d.tipo === "cambio_facultad"
    ? `Cambio de facultad a ${d.destino ?? "?"}`
    : `Plan ${d.plan ?? "?"}`;
  return [
    "Nuevo pago pendiente en AXIOM",
    `Alumno: ${d.alumno}`,
    `Qué: ${que}`,
    `Monto: ${formatearMonto(d.monto, d.moneda)}`,
    `Método: ${etiquetaMetodo(d.metodo)}`,
    `Referencia: ${d.referencia}`,
    `Foto del comprobante: ${d.conFoto ? "sí" : "no"}`,
    `Revisar y aprobar: ${d.urlAdmin}`,
  ].join("\n");
}

function config(): { token: string; chat: string } | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  return token && chat ? { token, chat } : null;
}

export function avisosConfigurados(): boolean {
  return config() !== null;
}

// Nunca lanza. Devuelve true solo si Telegram aceptó el mensaje.
export async function avisarPago(d: DatosAvisoPago): Promise<boolean> {
  const c = config();
  if (!c) return false;
  const corte = new AbortController();
  const reloj = setTimeout(() => corte.abort(), 5000);
  try {
    const res = await fetch(`https://api.telegram.org/bot${c.token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: c.chat, text: textoAvisoPago(d), disable_web_page_preview: true }),
      signal: corte.signal,
    });
    if (!res.ok) {
      // No se imprime el token ni el cuerpo del pedido: solo el código.
      console.error(`[avisos] Telegram respondió ${res.status}`);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[avisos] no se pudo avisar el pago:", e instanceof Error ? e.name : "error");
    return false;
  } finally {
    clearTimeout(reloj);
  }
}
