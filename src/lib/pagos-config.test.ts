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

test("la restricción de la base (schema y migración 006) admite todos los métodos activos", () => {
  const schema = leer("supabase/schema.sql");
  const migracion = leer("supabase/migration-006-pagos-metodos.sql");
  for (const id of Object.keys(METODOS_ACTIVOS)) {
    assert.ok(schema.includes(`'${id}'`), `schema.sql no admite ${id}`);
    assert.ok(migracion.includes(`'${id}'`), `la migración 006 no admite ${id}`);
  }
  // Los viejos se conservan: hay pagos históricos con esos valores.
  for (const viejo of ["tigo_money", "transferencia"]) {
    assert.ok(schema.includes(`'${viejo}'`) && leer("supabase/migration-006-pagos-metodos.sql").includes(`'${viejo}'`));
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

test("el QR con monto grabado solo se ofrece para ese monto", () => {
  const bnb = METODOS_ACTIVOS.qr_bancario;
  const antes = new Date("2026-10-04T12:00:00Z");
  assert.equal(qrVigente(bnb, PRECIOS_BOB.premium, antes), true);
  assert.equal(qrVigente(bnb, PRECIOS_BOB.cambioFacultad, antes), false, "el QR de Bs. 100 no sirve para Bs. 50");
  const redot = METODOS_ACTIVOS.redotpay;
  assert.equal(qrVigente(redot, PRECIOS_USDT.premium, antes), true);
  assert.equal(qrVigente(redot, PRECIOS_USDT.cambioFacultad, antes), false);
});

test("un QR vencido no se ofrece", () => {
  const bnb = METODOS_ACTIVOS.qr_bancario;
  assert.equal(qrVigente(bnb, PRECIOS_BOB.premium, new Date("2026-10-05T10:00:00Z")), true, "el último día todavía sirve");
  assert.equal(qrVigente(bnb, PRECIOS_BOB.premium, new Date("2026-10-06T10:00:00Z")), false);
});

test("sin QR vigente ni usuario o ID, el método no se ofrece; con ID sí", () => {
  const bnb = METODOS_ACTIVOS.qr_bancario;
  assert.equal(metodoDisponible(bnb, PRECIOS_BOB.cambioFacultad, new Date("2026-10-04T12:00:00Z")), false);
  // RedotPay con otro monto: el QR no sirve pero queda el ID.
  assert.equal(metodoDisponible(METODOS_ACTIVOS.redotpay, PRECIOS_USDT.cambioFacultad), true);
  // Binance no trae monto: sirve siempre.
  assert.equal(metodoDisponible(METODOS_ACTIVOS.binance_pay, 7), true);
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
