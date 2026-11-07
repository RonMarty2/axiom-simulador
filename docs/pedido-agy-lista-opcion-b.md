# Pedido agy: lista de lo que falta de la opción B (solo lectura)

Contexto: P4 del plan (`docs/plan-accion-2026-11.md`). Opción B = auditar contra el PDF solo los exámenes de Ingeniería de riesgo (BITACORA.md, entrada «Opción B de Ronald», 3-nov). Ya se registraron los lotes 1 y 2 el 6-nov.

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; usa la skill `auditor-facsimil` (agente: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-facsimil.md) y la skill `auditor-figuras` (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\.claude\agents\auditor-figuras.md) solo para saber qué cuenta como figura de riesgo. Esta tarea es de lectura: no audites los exámenes, solo lista.

## Qué hacer (solo leer, no editar nada)
1. En `data/examenes/umss/ingenieria/*.md` marca como RIESGO cada examen que tenga al menos una pregunta con `figura:` en el frontmatter de la pregunta, o cuyo enunciado diga «de la figura», «mostrado», «mostrada», «gráfica», «grafico» (sin tilde) sin tener `figura:`.
2. Quita los exámenes que YA están en `data/registro-verificacion.json` (el campo `id` de cada entrada es el `id` del frontmatter del .md). Quedan los pendientes.
3. Para cada pendiente busca su PDF en la carpeta `examenes pasados/` (de solo lectura, pasada con `--leer`): empareja por año, semestre y opción. Anota la ruta exacta o «SIN PDF».
4. Ordena los pendientes con PDF en lotes de 6 (por año ascendente) y numera los lotes desde 3.

## Formato de la respuesta (RESPUESTA.md, corto)
- Una línea de totales: riesgo total, ya registrados, pendientes con PDF, pendientes sin PDF.
- Tabla por lote: `lote | id del examen | nº de preguntas de riesgo | ruta del PDF`.
- Lista aparte de los «SIN PDF».
No inventes: si no puedes emparejar un PDF con seguridad, ponlo en «SIN PDF» y di por qué.
