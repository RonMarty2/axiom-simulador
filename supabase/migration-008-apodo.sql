-- Migración 008: apodo público para el ranking (6-nov-2026).
-- Hay alumnos menores: el ranking deja de mostrar el nombre real. Cada alumno
-- puede elegir un apodo; si no pone ninguno, aparece como "Alumno anónimo".
-- Solo agrega una columna vacía; no borra ni cambia nada.
--
-- Cómo aplicarla: Supabase → SQL Editor → pegar → Run.

ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS apodo TEXT;
