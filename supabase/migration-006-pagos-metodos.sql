-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN 006 — Métodos de pago: se suman Binance Pay y RedotPay
-- ═══════════════════════════════════════════════════════════════════════════
-- Ejecutar UNA VEZ en el SQL Editor de Supabase, ANTES de que un alumno intente
-- pagar con Binance Pay o RedotPay. Sin esto, la base rechaza esos pagos y
-- /api/pagos le responde al alumno que el método "todavía no está habilitado".
--
-- Tigo Money y transferencia se conservan en la restricción: hay pagos
-- históricos con esos valores y no se pueden borrar ni dejar inválidos.
-- Es idempotente: si ya está aplicada, no cambia nada.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE pagos DROP CONSTRAINT IF EXISTS pagos_metodo_check;
ALTER TABLE pagos ADD CONSTRAINT pagos_metodo_check
  CHECK (metodo IN ('tigo_money', 'qr_bancario', 'transferencia', 'binance_pay', 'redotpay'));

-- Verificar
SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE conname = 'pagos_metodo_check';
