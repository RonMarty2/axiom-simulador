# Plan: «formato de examen» por facultad (13-nov-2026)

Origen: Ronald vio que simulacro y práctica se descuadran porque cada facultad tiene UNA sola lista de áreas, pesos, preguntas y minutos, pero los exámenes pasados son de convocatorias distintas. Datos: [inventario-formatos-examen.md](./inventario-formatos-examen.md).

## Hallazgos
- Banco: 154 exámenes (Ingeniería 139, Económicas 10, Medicina 5, Derecho 0).
- `examen_real` ya califica con la `ponderacion` propia de cada examen (simulador-builder.ts ~259-268): esa parte está bien.
- Se rompe en mixto/predictivo: la cantidad sale de `preguntas_examen` de la facultad (simulador-builder.ts:68, 137, 165), las áreas de la config solo llegan a la IA (:38-39) y `duracion_minutos` casi no entra (:183-186; practicar/page.tsx:190-191).
- Medicina: la config dice 7 áreas/100 preg/120 min; el banco solo tiene 5 parciales del Curso Básico (2 áreas, 98-99 preg, 90 min). El formato PSA 2027 no existe en el banco.

## Modelo
Una «ficha de formato» por formato real: id, facultad, nombre visible, áreas, peso por área, nº de preguntas, minutos, `estimado` (true si la convocatoria no da la cifra), vigente (el de la convocatoria nueva). Vive en `data/` (una sola fuente de verdad, regla 6); los exámenes del banco declaran a qué formato pertenecen.

## Pasos
1. Medicina primero: ficha «PSA 2027» (7 áreas, 120 min, cifras `estimado`) y ficha «Curso Básico» (los 5 exámenes).
2. Simulador mixto/predictivo y práctica leen la ficha elegida (por defecto la vigente), no `facultades.json`.
3. El alumno ve el nombre del formato y sus reglas; lo `estimado` se rotula.
4. Repetir el molde en Económicas, Ingeniería (agrupar los 23 formatos casi iguales) y Derecho (sin banco aún).
5. Cada paso visible: tablet y celular (regla 9), tests, verificador, bitácora.

## Pendiente de confirmar
- El 19-ene-2027 cae martes; la convocatoria (según resumen) decía miércoles: mirar el PDF.
- Qué hace el alumno cuando el formato vigente no tiene preguntas de un área (Medicina: 5 áreas vacías).
