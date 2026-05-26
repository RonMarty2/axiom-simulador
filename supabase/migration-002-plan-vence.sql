-- Migración 002: vencimiento del plan de pago.
-- Agrega la fecha hasta la que el plan Premium está activo. Cuando pasa esa
-- fecha, el sistema devuelve automáticamente al usuario al plan gratis.
--
-- Cómo aplicarla: pegá este SQL en Supabase → SQL Editor → Run.

ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS plan_vence DATE;
