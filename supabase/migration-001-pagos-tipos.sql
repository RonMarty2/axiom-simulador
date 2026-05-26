-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN 001 — Pagos pueden ser de tipo "plan" o "cambio_facultad"
-- ═══════════════════════════════════════════════════════════════════════════
-- Ejecutar UNA VEZ en el SQL Editor de Supabase después del schema inicial.
-- Si ya está aplicada, los CREATE/ALTER con IF NOT EXISTS son no-op (seguros).
-- ═══════════════════════════════════════════════════════════════════════════

-- 1) Agregar columna `tipo` (plan vs cambio_facultad)
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS tipo TEXT NOT NULL DEFAULT 'plan';
ALTER TABLE pagos DROP CONSTRAINT IF EXISTS pagos_tipo_check;
ALTER TABLE pagos ADD CONSTRAINT pagos_tipo_check CHECK (tipo IN ('plan', 'cambio_facultad'));

-- 2) Agregar columna `destino_facultad` (a qué facultad cambia, solo aplica si tipo=cambio_facultad)
ALTER TABLE pagos ADD COLUMN IF NOT EXISTS destino_facultad TEXT REFERENCES facultades(id) ON DELETE SET NULL;

-- 3) Aflojar el constraint de `plan` para permitir NULL cuando es cambio_facultad
ALTER TABLE pagos ALTER COLUMN plan DROP NOT NULL;
ALTER TABLE pagos DROP CONSTRAINT IF EXISTS pagos_plan_check;
ALTER TABLE pagos ADD CONSTRAINT pagos_plan_check CHECK (plan IS NULL OR plan IN ('pro', 'premium'));

-- Verificar
SELECT column_name, data_type, is_nullable FROM information_schema.columns
WHERE table_name = 'pagos' AND column_name IN ('tipo', 'destino_facultad', 'plan');
