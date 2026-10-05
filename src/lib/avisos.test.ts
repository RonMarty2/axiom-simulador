import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { avisarPago, avisosConfigurados, textoAvisoPago, type DatosAvisoPago } from "./avisos.ts";

const datos: DatosAvisoPago = {
  alumno: "María_Pérez",
  tipo: "plan",
  plan: "premium",
  destino: null,
  monto: 10,
  moneda: "USDT",
  metodo: "redotpay",
  referencia: "TX-123",
  conFoto: true,
  urlAdmin: "https://axiom.example/admin/pagos",
};

// Las dos variables se limpian y se restauran: el resto de los tests no tiene
// que enterarse.
async function conEntorno(
  vars: { TELEGRAM_BOT_TOKEN?: string; TELEGRAM_CHAT_ID?: string },
  fn: () => Promise<void>,
) {
  const antes = { t: process.env.TELEGRAM_BOT_TOKEN, c: process.env.TELEGRAM_CHAT_ID, f: globalThis.fetch };
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  Object.assign(process.env, vars);
  try { await fn(); } finally {
    if (antes.t === undefined) delete process.env.TELEGRAM_BOT_TOKEN; else process.env.TELEGRAM_BOT_TOKEN = antes.t;
    if (antes.c === undefined) delete process.env.TELEGRAM_CHAT_ID; else process.env.TELEGRAM_CHAT_ID = antes.c;
    globalThis.fetch = antes.f;
  }
}

test("el mensaje trae quién, qué, cuánto, cómo y dónde aprobar", () => {
  const t = textoAvisoPago(datos);
  for (const esperado of ["María_Pérez", "Plan premium", "10 USDT", "RedotPay", "TX-123", "sí", "https://axiom.example/admin/pagos"]) {
    assert.ok(t.includes(esperado), `falta "${esperado}" en el aviso`);
  }
});

test("un cambio de facultad dice a cuál", () => {
  const t = textoAvisoPago({ ...datos, tipo: "cambio_facultad", plan: null, destino: "ingenieria", moneda: "BOB", monto: 50, metodo: "qr_bancario", conFoto: false });
  assert.ok(t.includes("Cambio de facultad a ingenieria"));
  assert.ok(t.includes("Bs. 50"));
  assert.ok(t.includes("Foto del comprobante: no"));
});

test("sin las variables de entorno no hace nada y no llama a Telegram", async () => {
  await conEntorno({}, async () => {
    globalThis.fetch = (() => { throw new Error("no debería llamar a fetch"); }) as typeof fetch;
    assert.equal(avisosConfigurados(), false);
    assert.equal(await avisarPago(datos), false);
  });
});

test("con las variables manda el aviso a Telegram, en texto plano", async () => {
  await conEntorno({ TELEGRAM_BOT_TOKEN: "123:ABC", TELEGRAM_CHAT_ID: "999" }, async () => {
    let url = "";
    let cuerpo: Record<string, unknown> = {};
    globalThis.fetch = (async (u: string, init: RequestInit) => {
      url = u;
      cuerpo = JSON.parse(init.body as string);
      return { ok: true, status: 200 } as Response;
    }) as unknown as typeof fetch;
    assert.equal(await avisarPago(datos), true);
    assert.equal(url, "https://api.telegram.org/bot123:ABC/sendMessage");
    assert.equal(cuerpo.chat_id, "999");
    assert.equal(cuerpo.parse_mode, undefined, "sin parse_mode: un guion bajo en un nombre rompería el mensaje");
    assert.ok(String(cuerpo.text).includes("María_Pérez"));
  });
});

test("si Telegram falla, avisarPago NO lanza (el pago ya está guardado)", async () => {
  await conEntorno({ TELEGRAM_BOT_TOKEN: "123:ABC", TELEGRAM_CHAT_ID: "999" }, async () => {
    globalThis.fetch = (async () => { throw new Error("red caída"); }) as unknown as typeof fetch;
    assert.equal(await avisarPago(datos), false);
    globalThis.fetch = (async () => ({ ok: false, status: 401 }) as Response) as unknown as typeof fetch;
    assert.equal(await avisarPago(datos), false);
  });
});

test("el servidor avisa DESPUÉS de responder, con after(), en los dos tipos de pago", () => {
  const ruta = readFileSync(join(process.cwd(), "src/app/api/pagos/route.ts"), "utf8");
  assert.ok(ruta.includes("after(() => avisarPago("), "/api/pagos no avisa con after()");
  assert.equal((ruta.match(/avisar\(pago,/g) ?? []).length, 2, "tienen que avisar el pago de plan y el de cambio de facultad");
});
