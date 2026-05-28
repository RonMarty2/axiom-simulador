-- Migración 005: guardar el simulador_id en cada entrada del historial
-- para poder volver a abrir su resolución desde "Mis exámenes".
--
-- Cómo aplicarla: Supabase → SQL Editor → Run.

ALTER TABLE historial ADD COLUMN IF NOT EXISTS simulador_id TEXT;
CREATE INDEX IF NOT EXISTS idx_historial_simulador ON historial(simulador_id);
