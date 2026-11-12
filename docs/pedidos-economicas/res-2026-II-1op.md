Usa la skill `transcriptor-examenes` (`.claude/agents/transcriptor-examenes.md`, secciones Resolver, Formato y Texto que ve el alumno) y las reglas de `CLAUDE.md` y `docs/lecciones-agentes.md`.

Archivos: fuente `examenes pasados/borradores_economicas/2026-II-1op.transcripcion.md` (transcripción literal de fotos de un parcial impreso de Económicas UMSS; las fotos están en `examenes pasados/`). Plantilla de formato: `data/examenes/umss/economicas/2013-1op-2-2013.md`.

Encargo: crear UN archivo nuevo `examenes pasados/borradores_economicas/2026-II-1op.banco.md` con TODAS las preguntas de la transcripción, resueltas por ti antes de mirar las opciones (nunca uses marcas verdes, a mano o de INAP como clave). Lo que no puedas resolver con seguridad va a `faltantes:` con motivo `sin-respuesta`. No toques data/, src/ ni otro archivo. No corras tsc, lint ni tests (los corre el script).

Al final de tu respuesta: cuántas preguntas escritas, cuántas en faltantes, y la lista de respuestas con tu seguridad (alta/media/baja).

Áreas: usa solo `matematicas`, `economicas` (contabilidad, economía y administración van aquí; el detalle va en `tema`), `verbal` y `razonamiento` (decisión de Ronald, 7-nov).
