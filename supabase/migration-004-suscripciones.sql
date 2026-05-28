-- Migración 004: suscripciones por facultad.
-- Cada facultad es un producto mensual independiente, con su propia fecha de
-- vencimiento. Un usuario puede tener varias activas a la vez.
--
-- Cómo aplicarla: Supabase → SQL Editor → Run.

CREATE TABLE IF NOT EXISTS suscripciones (
  usuario_id  TEXT NOT NULL,
  facultad    TEXT NOT NULL REFERENCES facultades(id) ON DELETE CASCADE,
  vence       DATE NOT NULL,
  creado_en   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (usuario_id, facultad)
);
CREATE INDEX IF NOT EXISTS idx_suscripciones_usuario ON suscripciones(usuario_id);
