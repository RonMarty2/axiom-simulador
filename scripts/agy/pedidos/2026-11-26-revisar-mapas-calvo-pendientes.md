# Pedido: Revisión de mapas de subtítulos pendientes de Calvo (PSA 2027)

Usa las skills `libro-audio-tts` y `libro-audio-auditor` para esta revisión.
Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`; el agente `libro-audio-auditor`: `.claude/agents/libro-audio-auditor.md` (y `agentes/libro-audio-auditor.md`); el agente `libro-audio-tts`: `.claude/agents/libro-audio-tts.md` (y `agentes/libro-audio-tts.md`, regla 0: solo capítulos PSA 2027; regla 10: sin autor/créditos/bibliografía/autoevaluación; reglas 17 y 18: títulos en su línea, partes 3–20 min).

## Objetivo (SOLO LECTURA, sin editar archivos)
Revisar los **7 mapas de subtítulos de Calvo PSA 2027** que aún no fueron auditados (07, 10, 11 y 17 ya están auditados; NO los toques ni los incluyas):
- `Calvo_tema_08`
- `Calvo_tema_09`
- `Calvo_tema_12`
- `Calvo_tema_13`
- `Calvo_tema_14`
- `Calvo_tema_15`
- `Calvo_tema_18`

## Archivos exactos a leer (USAR ESTAS RUTAS ABSOLUTAS — NO leer los archivos viejos de `repo/docs/audio-bloques/mapa_titulos/`)
1. Mapas actuales en disco (`C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\`):
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Calvo_tema_08.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Calvo_tema_09.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Calvo_tema_12.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Calvo_tema_13.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Calvo_tema_14.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Calvo_tema_15.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Calvo_tema_18.json`
2. Textos TTS verificados correspondientes (`C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\`):
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_08_Biologia_Celular_LITERAL_TTS.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_09_Biologia_Celular_LITERAL_TTS.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_12_Biologia_Celular_LITERAL_TTS.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_13_Biologia_Celular_LITERAL_TTS.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_14_Biologia_Celular_LITERAL_TTS.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_15_Biologia_Celular_LITERAL_TTS.md`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_18_Biologia_Celular_LITERAL_TTS.md`

## Qué verificar en cada uno de los 7 capítulos
1. **Coincidencia de títulos:** comprobar que cada título marcado `"narrable": true` en el JSON aparece en el `.md` del capítulo en una posición coherente con su campo `"palabra"` (si alguno no coincide literalmente con el texto TTS, o si tiene siglas/números que en el `.md` están deletreados distinto, marcarlo).
2. **Títulos faltantes o sobrantes:** detectar si en el `.md` hay algún subtítulo importante omitido en el JSON que provocaría un tramo >20 min (~3000 palabras), o si en el JSON quedó algún título falso / no narrable (autoevaluación, bibliografía, figura).
3. **Nombre de autor en cabecera:** revisar las primeras 15 líneas de cada `.md` e indicar si quedó algún nombre de autor del capítulo (ej. "José Luis...") después del título del capítulo.

## Formato de respuesta (obligatorio, máximo 60 líneas, en tu respuesta final)
1. **Tabla resumen** (7 filas, una por capítulo):
   `| Capítulo | Títulos en mapa | Coinciden con .md | Autor en cabecera (sí/no + cita) | Estado (LISTO / AJUSTAR) |`
2. **Lista de hallazgos accionables** (solo para los capítulos en `AJUSTAR`, máx. 3 viñetas por capítulo, citando título exacto y línea/palabra). Si todos están listos, escribe «Sin ajustes necesarios en los 7 mapas».
3. **Regla estricta:** NO modifiques ningún archivo. Devuelve el informe completo en tu respuesta.
