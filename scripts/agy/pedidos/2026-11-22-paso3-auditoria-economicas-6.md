# Pedido (SOLO LECTURA): Auditoría de los 6 borradores recientes de Económicas (II-2024 a I-2026)

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`
- `docs/lecciones-agentes.md` del proyecto.

Este pedido es **SOLO LECTURA** (`--solo-texto`). NO modifiques ni crees ningún archivo.

## Archivos exactos que debes leer
1. Referencia del formato válido en el repo (en tu copia):
   - `data/examenes/umss/economicas/2023-2op-1-2023.md`
   - `src/lib/axiom/banco.test.ts`
   - `data/formatos-examen.json`
2. Los 6 borradores `.banco.md` de Económicas (lee por su ruta REAL en solo lectura):
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\borradores_economicas\2024-II-2op.banco.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\borradores_economicas\2025-I-3op.banco.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\borradores_economicas\2025-II-1op.banco.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\borradores_economicas\2025-II-2op.banco.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\borradores_economicas\2026-I-1op.banco.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\borradores_economicas\2026-I-2op.banco.md`

## Qué revisar en CADA uno de los 6 borradores
1. **Frontmatter YAML y nombre de archivo destino** (`data/examenes/umss/economicas/<archivo>.md`): si cumple exactamente el esquema de `2023-2op-1-2023.md`, `banco.test.ts` y `formatos-examen.json` (campos `id`, `facultad`, `gestion`, `opcion`, `formato`, `duracion_minutos`, `preguntas_total`, etc.).
2. **Completitud:** cuántas preguntas trae (esperado 30), si falta algún enunciado, opción o clave (`correcta`), o si tiene marcas tipo `ILEGIBLE`, `PENDIENTE`, `[?]`, `sin clave`, `faltan opciones` o figura faltante.
3. **Verificación rápida de calidad:** si hay voseo, errores evidentes de LaTeX (barras comidas, `$` sin cerrar), o explicaciones vacías/inconsistentes con la letra marcada en `correcta`.
4. **Dictamen por examen:**
   - `LISTO` (entra limpio a `data/examenes/umss/economicas/` con ajustes mínimos de frontmatter/formato)
   - `CON AJUSTES` (lista exacta de preguntas # y qué corregir)
   - `BLOQUEADO POR FOTO/ILEGIBLE` (si alguna pregunta no se puede completar sin foto original de Ronald)

## Formato de la respuesta final
1. **Tabla resumen de los 6 exámenes:** Examen | Archivo destino propuesto | Preguntas | Frontmatter OK? | Preguntas con marcas/ilegibles/dudas | Dictamen.
2. **Detalle concreto por examen** (solo las preguntas con problema o diferencia de formato, indicando `#pregunta` y qué falta exactamente — si un examen no tiene problemas, pon «Sin hallazgos»).
3. **Nota sobre `data/registro-verificacion.json`:** recuerda si los exámenes nuevos se muestran o no sin entrada en `registro-verificacion.json` (verifícalo leyendo `src/lib/axiom/banco.test.ts` o `src/lib/axiom/banco.ts`).
