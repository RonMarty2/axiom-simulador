# Plan: estructura de examen por carrera y pestañas de «Nuevo simulacro»

Origen: Ronald, 13-nov-2026 (tarde). Estado: PLAN, nada implementado. Decisión de nombre tomada por Ronald: la pestaña nueva se llama **«Simular examen de ingreso»**.

## Principios (dichos por Ronald)
1. Cada carrera es aparte (usuarios, exámenes, estructura). Lo que se haga para Medicina debe valer para Económicas, Ingeniería y Derecho.
2. El contenido (lecciones, láminas) se reutiliza entre carreras; solo se ajustan los ejemplos. Medicina suma física, química y matemáticas, que comparte con Tecnología; Tecnología comparte con Económicas.
3. Los exámenes de ingreso difieren entre carreras y dentro de una misma carrera: cambian áreas, pesos, áreas que se quitan o agregan.
4. Hoy falta la figura clara de «estructura de examen» y por eso las pestañas se confunden.

## Qué hay hoy
- `data/formatos-examen.json` ya tiene fichas (áreas, pesos, preguntas, minutos, vigente) pero solo de Medicina.
- Pestañas actuales de «Nuevo simulacro»: Examen real, Mixto, Por tema, Mis errores, Simulacro inteligente.

## Pestañas propuestas (nombres a confirmar con Ronald, salvo el primero)
- **Simular examen de ingreso** (NUEVA, nombre de Ronald): practicar con la estructura vigente de la carrera (Medicina: PSA 2027), con sus áreas, pesos, preguntas y tiempo.
- **Exámenes anteriores** (hoy «Examen real»): el examen completo de un año, con la estructura de ese año.
- **Mezcla de años** (hoy «Mixto»): preguntas de varios años, solo de áreas que hoy evalúa la carrera.
- **Por tema:** temas de la estructura vigente; las preguntas viejas se asignan a su tema actual.
- **Mis errores:** agrupados por tema actual; un área vieja se reubica en el tema que la reemplaza.
- **Simulacro inteligente:** IA arma un examen con la estructura vigente y los puntos débiles del alumno.

## Pasos
1. Definir la ficha de estructura por carrera y por año (áreas, pesos, preguntas, minutos, vigente) para TODAS las carreras, no solo Medicina.
2. Tabla de equivalencias área vieja -> tema actual, por carrera.
3. Conectar las pestañas a esa ficha (primero Medicina, luego las demás).
4. Renombrar y explicar cada opción en tuteo.
5. Verlo en la PC (escritorio y celular) antes de subir.

## Pendientes ligados (Medicina)
- Gestiones mal agrupadas (Primer Parcial 2025-26 cae en 2025).
- Lista dice «100 preguntas» pero hay 96-99 cargadas.
- Preguntas 31/73/81/85 del final 2024-25 sin clave oficial (recomendado: dejarlas `faltantes`).
