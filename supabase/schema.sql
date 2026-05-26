-- ═══════════════════════════════════════════════════════════════════════════
-- AXIOM — Schema de base de datos (Supabase / PostgreSQL)
-- ═══════════════════════════════════════════════════════════════════════════
-- Para crear: pegar TODO este archivo en el SQL Editor de Supabase y RUN.
-- Para re-crear desde cero: ejecutar primero las DROP TABLE comentadas abajo.
-- ═══════════════════════════════════════════════════════════════════════════

-- DROP TABLE IF EXISTS historial CASCADE;
-- DROP TABLE IF EXISTS pagos CASCADE;
-- DROP TABLE IF EXISTS simuladores CASCADE;
-- DROP TABLE IF EXISTS preguntas CASCADE;
-- DROP TABLE IF EXISTS materias CASCADE;
-- DROP TABLE IF EXISTS facultades CASCADE;
-- DROP TABLE IF EXISTS usuarios CASCADE;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. FACULTADES (UMSS Económicas, Ingeniería, Medicina, Derecho)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS facultades (
  id              TEXT PRIMARY KEY,
  nombre          TEXT NOT NULL,
  nombre_corto    TEXT NOT NULL,
  color           TEXT NOT NULL,
  color_secundario TEXT,
  emoji           TEXT,
  descripcion     TEXT,
  areas           JSONB NOT NULL DEFAULT '[]'::jsonb,
  ponderacion     JSONB NOT NULL DEFAULT '{}'::jsonb,
  duracion_minutos INTEGER NOT NULL DEFAULT 180,
  preguntas_examen INTEGER NOT NULL DEFAULT 100,
  ano_inicio_banco INTEGER,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. MATERIAS (por facultad)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS materias (
  id              TEXT PRIMARY KEY,
  facultad_id     TEXT NOT NULL REFERENCES facultades(id) ON DELETE CASCADE,
  nombre          TEXT NOT NULL,
  area            TEXT NOT NULL,
  libros_referencia JSONB NOT NULL DEFAULT '[]'::jsonb,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_materias_facultad ON materias(facultad_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. USUARIOS (estudiantes y docentes)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id              TEXT PRIMARY KEY,
  email           TEXT UNIQUE NOT NULL,
  nombre          TEXT NOT NULL,
  facultad_objetivo TEXT REFERENCES facultades(id) ON DELETE SET NULL,
  plan            TEXT NOT NULL DEFAULT 'gratis' CHECK (plan IN ('gratis', 'pro', 'premium')),
  avatar_color    TEXT,
  picture         TEXT,
  fecha_registro  DATE NOT NULL DEFAULT CURRENT_DATE,
  examenes_completados INTEGER NOT NULL DEFAULT 0,
  mejor_nota      INTEGER NOT NULL DEFAULT 0,
  nota_promedio   INTEGER NOT NULL DEFAULT 0,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_facultad ON usuarios(facultad_objetivo);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. PREGUNTAS (banco individual de preguntas)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS preguntas (
  id              TEXT PRIMARY KEY,
  universidad     TEXT NOT NULL DEFAULT 'UMSS',
  facultad        TEXT NOT NULL REFERENCES facultades(id) ON DELETE CASCADE,
  anio            INTEGER NOT NULL,
  numero          INTEGER,
  area            TEXT NOT NULL,
  tema            TEXT,
  dificultad      TEXT NOT NULL DEFAULT 'medio' CHECK (dificultad IN ('facil', 'medio', 'dificil')),
  tipo            TEXT NOT NULL DEFAULT 'seleccion_simple',
  enunciado       TEXT NOT NULL,
  opciones        JSONB NOT NULL DEFAULT '[]'::jsonb,
  respuesta_correcta TEXT NOT NULL,
  explicacion     TEXT,
  tags            JSONB DEFAULT '[]'::jsonb,
  materia_id      TEXT REFERENCES materias(id) ON DELETE SET NULL,
  pares_emparejamiento JSONB,
  espacios_completar JSONB,
  creado_por      TEXT,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_preguntas_facultad ON preguntas(facultad);
CREATE INDEX IF NOT EXISTS idx_preguntas_area ON preguntas(area);
CREATE INDEX IF NOT EXISTS idx_preguntas_anio ON preguntas(anio);
CREATE INDEX IF NOT EXISTS idx_preguntas_dificultad ON preguntas(dificultad);

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. SIMULADORES (sesiones de examen activas / completadas)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS simuladores (
  id              TEXT PRIMARY KEY,
  usuario_id      TEXT NOT NULL,
  config          JSONB NOT NULL,
  preguntas       JSONB NOT NULL DEFAULT '[]'::jsonb,
  respuestas_usuario JSONB NOT NULL DEFAULT '{}'::jsonb,
  marcadas        JSONB DEFAULT '[]'::jsonb,
  estado          TEXT NOT NULL DEFAULT 'activo' CHECK (estado IN ('activo', 'completado', 'calificado')),
  fecha_inicio    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  fecha_fin       TIMESTAMPTZ,
  nota_final      INTEGER,
  desglose        JSONB,
  tiempo_usado_segundos INTEGER,
  duracion_minutos INTEGER
);
CREATE INDEX IF NOT EXISTS idx_simuladores_usuario ON simuladores(usuario_id);
CREATE INDEX IF NOT EXISTS idx_simuladores_estado ON simuladores(estado);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. PAGOS (Tigo Money / QR / Transferencia)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pagos (
  id              TEXT PRIMARY KEY,
  usuario_id      TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  plan            TEXT NOT NULL CHECK (plan IN ('pro', 'premium')),
  monto           NUMERIC NOT NULL,
  moneda          TEXT NOT NULL DEFAULT 'BOB',
  metodo          TEXT NOT NULL CHECK (metodo IN ('tigo_money', 'qr_bancario', 'transferencia')),
  estado          TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
  fecha           DATE NOT NULL DEFAULT CURRENT_DATE,
  referencia      TEXT,
  valido_hasta    DATE,
  motivo_rechazo  TEXT,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pagos_usuario ON pagos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_pagos_estado ON pagos(estado);

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. HISTORIAL (examenes terminados por usuario)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS historial (
  id              TEXT PRIMARY KEY,
  usuario_id      TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  facultad        TEXT NOT NULL,
  fecha           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  modo            TEXT NOT NULL,
  anio_examen     INTEGER,
  tema            TEXT,
  nota            INTEGER NOT NULL,
  correctas       INTEGER NOT NULL DEFAULT 0,
  incorrectas     INTEGER NOT NULL DEFAULT 0,
  sin_responder   INTEGER NOT NULL DEFAULT 0,
  tiempo_segundos INTEGER NOT NULL DEFAULT 0,
  desglose        JSONB
);
CREATE INDEX IF NOT EXISTS idx_historial_usuario ON historial(usuario_id);
CREATE INDEX IF NOT EXISTS idx_historial_fecha ON historial(fecha DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY: deshabilitado por ahora (usamos service_role en backend)
-- Cuando expongamos endpoints públicos directos a Supabase, habilitar y crear policies.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE facultades DISABLE ROW LEVEL SECURITY;
ALTER TABLE materias DISABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE preguntas DISABLE ROW LEVEL SECURITY;
ALTER TABLE simuladores DISABLE ROW LEVEL SECURITY;
ALTER TABLE pagos DISABLE ROW LEVEL SECURITY;
ALTER TABLE historial DISABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════════════════
-- FIN del schema. Después de ejecutar, corre seed.sql para datos iniciales.
-- ═══════════════════════════════════════════════════════════════════════════
