-- Migración 007: repaso de errores con fecha (plan de mejoras 5.3, src/lib/axiom/repaso.ts).
-- «Mis errores» vuelve a preguntar las mismas preguntas falladas en su fecha, y una pregunta acertada
-- 3 veces seguidas queda dominada (sale de la lista, pero NO se borra).
--
-- Solo AGREGA columnas: no borra ni cambia ningún error guardado. Los errores que ya existen quedan en
-- la caja 0 y con fecha de hoy, o sea que tocan repasar apenas se aplique.
-- Hasta que se aplique, la app sigue funcionando como antes (errores-db.ts reintenta sin estas columnas).
--
-- Cómo aplicarla: Supabase → SQL Editor → pegar esto → Run.

ALTER TABLE errores ADD COLUMN IF NOT EXISTS caja        INTEGER     NOT NULL DEFAULT 0;
ALTER TABLE errores ADD COLUMN IF NOT EXISTS proximo     TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE errores ADD COLUMN IF NOT EXISTS dominada_en TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_errores_repaso ON errores(usuario_id, proximo) WHERE dominada_en IS NULL;
