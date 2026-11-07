# Pedido agy: opción B, lote 3 (6 exámenes de Ingeniería contra su PDF)

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; usa la skill `auditor-facsimil` (agente: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-facsimil.md) y la skill `auditor-figuras` (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-figuras.md) y lee `docs/lecciones-agentes.md` al empezar.

## Tarea
Audita SOLO las preguntas de riesgo de estos 6 exámenes (modo «opción B» de `auditor-facsimil`: muestra por riesgo). Las rutas de PDF son relativas a la carpeta `examenes pasados/` pasada con `--leer`. La lista completa de preguntas de riesgo por examen está en `docs/opcion-b-pendientes-2026-11-07.md` (viene con `--base`).

- `umss-ingenieria-2008-primer-parcial-curso-propedeutico-gestion-1-2008`: 1 pregunta de riesgo; PDF `FCYT/075_PrimerParcialCursoPropedeutico1-2008.pdf`
- `umss-ingenieria-2008-segundo-parcial-primer-curso-pre-facultativo-gestion-2-2008`: 2; PDF `FCYT/081_SegundoParcialPrimerCursoPre-Facultativo2-2008.pdf`
- `umss-ingenieria-2009-tercer-parcial-primer-curso-pre-facultativo-gestion-2-2009`: 1; PDF `FCYT/094_TercerParcialPrimerCursoPre-Facultativo2-2009.pdf`
- `umss-ingenieria-2009-examen-de-ingreso-2-2009-unica-opcion`: 1; PDF `FCYT/097_ExamenAdmisionUnicaOpcion2-2009.pdf`
- `umss-ingenieria-2010-examen-final-segundo-curso-pre-facultativo-gestion-2-2010`: 1; PDF `FCYT/107_ExamenFinalSegundoCursoPre-Facultativo2-2010.pdf`
- `umss-ingenieria-2010-primer-parcial-curso-pre-facultativo-gestion-1-2010`: 1; PDF `FCYT/101_PrimerParcialCursoPre-Facultativo1-2010.pdf`

Por cada examen: contrasta enunciado, opciones y figura de las preguntas de riesgo con el PDF; corrige el .md del banco solo si el PDF lo demuestra; registra el examen en `data/registro-verificacion.json` con `completo:false` y anota qué preguntas se miraron (no pongas `completo:true`: solo se miró lo de riesgo). Si una figura no puedes comprobarla, déjala anotada como pendiente; agy NO juzga figuras de circuitos: ponlas como pendiente de `auditor-figuras`.
No toques otros exámenes, lecciones ni código. Devuelve «Lecciones nuevas» y una tabla: examen | preguntas miradas | cambios | pendientes.
