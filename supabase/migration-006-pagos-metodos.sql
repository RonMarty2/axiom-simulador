-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN 006 — Métodos de pago: la base deja de restringirlos
-- ═══════════════════════════════════════════════════════════════════════════
-- Ejecutar UNA VEZ en el SQL Editor de Supabase, ANTES de que un alumno intente
-- pagar con Binance Pay o RedotPay. Sin esto, la base rechaza esos pagos.
--
-- Se QUITA la restricción en vez de agregar los métodos nuevos a la lista: así
-- sumar un método (o cambiar un QR) nunca más necesita una migración. La
-- validación vive en el servidor (esMetodoActivo en src/lib/pagos-config.ts).
-- Los pagos históricos (tigo_money, transferencia) quedan intactos.
-- Es idempotente: si ya está aplicada, no cambia nada.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE pagos DROP CONSTRAINT IF EXISTS pagos_metodo_check;

-- Verificar: no debe devolver ninguna fila.
SELECT conname FROM pg_constraint WHERE conname = 'pagos_metodo_check';
