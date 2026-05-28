-- Migración 003: errores del estudiante guardados en la base (por usuario).
-- Antes vivían solo en el navegador (localStorage), así que se perdían al
-- cambiar de dispositivo. Ahora se guardan atados a la cuenta.
--
-- Cómo aplicarla: Supabase → SQL Editor → Run.

CREATE TABLE IF NOT EXISTS errores (
  id                TEXT PRIMARY KEY,
  usuario_id        TEXT NOT NULL,
  pregunta_id       TEXT NOT NULL,
  pregunta          JSONB NOT NULL,
  respuesta_elegida TEXT,
  area              TEXT,
  tema              TEXT,
  simulador_id      TEXT,
  veces             INTEGER NOT NULL DEFAULT 1,
  fecha             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (usuario_id, pregunta_id)
);
CREATE INDEX IF NOT EXISTS idx_errores_usuario ON errores(usuario_id);
