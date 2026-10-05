import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  METODOS_ACTIVOS, ORDEN_METODOS, esMetodoActivo, etiquetaMetodo, metodoDisponible, qrVigente,
} from "./pagos-config.ts";
import { PRECIOS_BOB, PRECIOS_USDT, formatearMonto, montoCambioFacultadEn, montoPlanEn } from "./precios.ts";

// Trinquetes de los métodos de pago. Existen porque el cobro depende de cuatro
// cosas que tienen que decir lo mismo y que viven en lugares distintos: la
// lista de acá, la restricción de la tabla `pagos` en Supabase, la validación
// del servidor y lo que se le muestra al alumno.

const raiz = process.cwd();
const leer = (ruta: string) => readFileSync(join(raiz, ruta), "utf8");

test("cada método activo tiene su imagen de QR en public/", () => {
  for (const m of Object.values(METODOS_ACTIVOS)) {
    assert.ok(existsSync(join(raiz, "public", m.qr)), `falta public${m.qr} (${m.id})`);
  }
});

test("el orden de la pantalla cubre exactamente los métodos activos", () => {
  assert.deepEqual([...ORDEN_METODOS].sort(), Object.keys(METODOS_ACTIVOS).sort());
});

test("la tabla pagos no restringe el método: la validación es del servidor", () => {
  const schema = leer("supabase/schema.sql");
  const migracion = leer("supabase/migration-006-pagos-metodos.sql");
  assert.equal(/metodo\s+TEXT NOT NULL CHECK/.test(schema), false, "schema.sql volvió a restringir el método");
  assert.ok(migracion.includes("DROP CONSTRAINT IF EXISTS pagos_metodo_check"));
  assert.equal(/ADD CONSTRAINT pagos_metodo_check/.test(migracion), false);
});

test("pagos-qr.json: monto positivo o null, vencimiento AAAA-MM-DD o null", () => {
  const qr = JSON.parse(leer("src/lib/pagos-qr.json"));
  assert.deepEqual(Object.keys(qr).sort(), Object.keys(METODOS_ACTIVOS).sort());
  for (const [id, d] of Object.entries(qr) as [string, { monto: number | null; vence: string | null }][]) {
    assert.ok(d.monto === null || d.monto > 0, `${id}: monto inválido`);
    assert.ok(d.vence === null || /^\d{4}-\d{2}-\d{2}$/.test(d.vence), `${id}: vence inválido`);
  }
});

test("el servidor valida el método contra la lista, no acepta cualquier texto", () => {
  const ruta = leer("src/app/api/pagos/route.ts");
  assert.ok(ruta.includes("esMetodoActivo("), "/api/pagos no valida el método");
});

test("esMetodoActivo rechaza lo que no se ofrece", () => {
  assert.equal(esMetodoActivo("binance_pay"), true);
  assert.equal(esMetodoActivo("tigo_money"), false);
  assert.equal(esMetodoActivo("transferencia"), false);
  assert.equal(esMetodoActivo("cualquier_cosa"), false);
  assert.equal(esMetodoActivo(undefined), false);
});

test("los métodos viejos igual tienen etiqueta legible en las tablas", () => {
  assert.equal(etiquetaMetodo("tigo_money"), "Tigo Money");
  assert.equal(etiquetaMetodo("binance_pay"), METODOS_ACTIVOS.binance_pay.nombre);
});

// Métodos de prueba: no dependen del QR que esté cargado hoy en pagos-qr.json.
const prueba = (qrMonto: number | null, qrVence: string | null, conId = false) => ({
  ...METODOS_ACTIVOS.qr_bancario,
  qrMonto,
  qrVence,
  destinatario: conId ? { etiqueta: "ID", valor: "1" } : undefined,
});

test("el QR con monto grabado solo se ofrece para ese monto", () => {
  const m = prueba(100, null);
  assert.equal(qrVigente(m, 100), true);
  assert.equal(qrVigente(m, 50), false, "el QR de 100 no sirve para 50");
  assert.equal(qrVigente(prueba(null, null), 7), true, "sin monto grabado sirve para cualquiera");
});

test("un QR vencido no se ofrece", () => {
  const m = prueba(null, "2026-10-05");
  assert.equal(qrVigente(m, 100, new Date("2026-10-05T10:00:00Z")), true, "el último día todavía sirve");
  assert.equal(qrVigente(m, 100, new Date("2026-10-06T10:00:00Z")), false);
});

test("sin QR vigente ni usuario o ID, el método no se ofrece; con ID sí", () => {
  assert.equal(metodoDisponible(prueba(100, null), 50), false);
  assert.equal(metodoDisponible(prueba(100, null, true), 50), true);
  assert.equal(metodoDisponible(prueba(null, null), 7), true);
});

test("el monto depende de la moneda del método", () => {
  assert.equal(montoPlanEn("premium", "BOB"), PRECIOS_BOB.premium);
  assert.equal(montoPlanEn("premium", "USDT"), PRECIOS_USDT.premium);
  assert.equal(montoCambioFacultadEn("USDT"), PRECIOS_USDT.cambioFacultad);
  assert.equal(formatearMonto(10, "USDT"), "10 USDT");
  assert.equal(formatearMonto(100, "BOB"), "Bs. 100");
});

test("la pantalla de pago ya no tiene datos de demostración", () => {
  const src = leer("src/app/pagar/page.tsx");
  for (const mala of ["demostración", "DEMO", "7000-0000", "10000123456789", "Axiom SRL"]) {
    assert.equal(src.includes(mala), false, `/pagar todavía dice "${mala}"`);
  }
});
