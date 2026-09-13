import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { consultarLimite, registrarFallo, limpiarLimite, ipDe } from "./rate-limit.ts";

// Cada test usa su propia clave para no pisarse con los demás: el limitador
// guarda estado en un Map a nivel de módulo.
let n = 0;
const clave = () => `test-${n++}-${Math.random()}`;

describe("limitador de intentos", () => {
  test("deja pasar mientras no se pase del máximo", () => {
    const k = clave();
    for (let i = 0; i < 4; i++) {
      assert.equal(consultarLimite(k, { maxIntentos: 5 }).permitido, true);
      registrarFallo(k, { maxIntentos: 5 });
    }
    assert.equal(consultarLimite(k, { maxIntentos: 5 }).permitido, true);
  });

  test("bloquea al llegar al máximo de intentos", () => {
    const k = clave();
    for (let i = 0; i < 5; i++) registrarFallo(k, { maxIntentos: 5 });
    const r = consultarLimite(k, { maxIntentos: 5 });
    assert.equal(r.permitido, false);
    assert.ok(r.esperaSegundos > 0, "tiene que decir cuánto falta para reintentar");
  });

  test("informa cuántos intentos quedan", () => {
    const k = clave();
    assert.equal(consultarLimite(k, { maxIntentos: 5 }).restantes, 5);
    registrarFallo(k, { maxIntentos: 5 });
    assert.equal(registrarFallo(k, { maxIntentos: 5 }).restantes, 3);
  });

  test("un login exitoso limpia el contador", () => {
    const k = clave();
    for (let i = 0; i < 5; i++) registrarFallo(k, { maxIntentos: 5 });
    assert.equal(consultarLimite(k, { maxIntentos: 5 }).permitido, false);
    limpiarLimite(k);
    assert.equal(consultarLimite(k, { maxIntentos: 5 }).permitido, true);
  });

  test("la ventana vencida reinicia el contador", async () => {
    const k = clave();
    for (let i = 0; i < 5; i++) registrarFallo(k, { maxIntentos: 5, ventanaMs: 20, bloqueoMs: 20 });
    assert.equal(consultarLimite(k, { maxIntentos: 5, ventanaMs: 20 }).permitido, false);
    await new Promise((r) => setTimeout(r, 40));
    assert.equal(consultarLimite(k, { maxIntentos: 5, ventanaMs: 20 }).permitido, true);
  });

  test("cada clave (IP) se cuenta por separado", () => {
    const a = clave(), b = clave();
    for (let i = 0; i < 5; i++) registrarFallo(a, { maxIntentos: 5 });
    assert.equal(consultarLimite(a, { maxIntentos: 5 }).permitido, false);
    assert.equal(consultarLimite(b, { maxIntentos: 5 }).permitido, true, "bloquear una IP no puede bloquear a las demás");
  });
});

describe("ipDe", () => {
  const req = (h: Record<string, string>) => new Request("https://x.test", { headers: h });

  test("toma el primer valor de x-forwarded-for (el cliente, no los proxies)", () => {
    assert.equal(ipDe(req({ "x-forwarded-for": "1.2.3.4, 10.0.0.1, 10.0.0.2" })), "1.2.3.4");
  });

  test("usa x-real-ip si no hay x-forwarded-for", () => {
    assert.equal(ipDe(req({ "x-real-ip": "5.6.7.8" })), "5.6.7.8");
  });

  test("sin cabeceras devuelve una clave fija, para limitar de más y no de menos", () => {
    assert.equal(ipDe(req({})), "desconocida");
  });
});
