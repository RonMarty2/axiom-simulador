# Pedido: Revisión de mapas de subtítulos pendientes de Saladin — Lote 1 (8 capítulos PSA 2027)

Usa las skills `libro-audio-tts` y `libro-audio-auditor` para esta revisión.
Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md`; el agente `libro-audio-auditor`: `.claude/agents/libro-audio-auditor.md` (y `agentes/libro-audio-auditor.md`); el agente `libro-audio-tts`: `.claude/agents/libro-audio-tts.md` (y `agentes/libro-audio-tts.md`, regla 0: solo capítulos PSA 2027; regla 10: sin autor/créditos/bibliografía/autoevaluación; reglas 17 y 18: títulos en su línea, partes 3–20 min).

## Objetivo (SOLO LECTURA, sin editar archivos)
Revisar los **8 mapas de subtítulos de Saladin PSA 2027 (Lote 1)** aún no auditados (09, 17, 20 y 21 ya fueron auditados; NO los toques):
- `Saladin_tema_01`, `Saladin_tema_05`, `Saladin_tema_06`, `Saladin_tema_08`
- `Saladin_tema_10`, `Saladin_tema_13`, `Saladin_tema_14`, `Saladin_tema_15`

## Archivos exactos a leer (USAR ESTAS RUTAS ABSOLUTAS — NO leer versiones viejas)
1. Mapas actuales en disco (`C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\`):
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Saladin_tema_01.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Saladin_tema_05.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Saladin_tema_06.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Saladin_tema_08.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Saladin_tema_10.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Saladin_tema_13.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Saladin_tema_14.json`
   - `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\mapa_titulos\Saladin_tema_15.json`
2. Textos TTS verificados (`C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\`):
   - `Tema_01_Morfo_Saladin_LITERAL_TTS.md`, `Tema_05_Morfo_Saladin_LITERAL_TTS.md`, `Tema_06_Morfo_Saladin_LITERAL_TTS.md`, `Tema_08_Morfo_Saladin_LITERAL_TTS.md`
   - `Tema_10_Morfo_Saladin_LITERAL_TTS.md`, `Tema_13_Morfo_Saladin_LITERAL_TTS.md`, `Tema_14_Morfo_Saladin_LITERAL_TTS.md`, `Tema_15_Morfo_Saladin_LITERAL_TTS.md`

## Qué verificar en cada uno de los 8 capítulos
1. **Títulos falsos marcados `narrable: true`:** créditos de figuras, encabezados de tablas, restos de portada, autoevaluaciones, "Temas de conexión", bibliografía o entradas con `"palabra": null`.
2. **Tramos >3000 palabras sin subtítulo** (especialmente si en el `.md` sí existe un subtítulo de nivel 2 que no se incluyó en el JSON — ojo con Saladin 08, 10, 14 que tienen partes >20 min).
3. **Coincidencia general de títulos con el `.md`** (solo señalar si algún título real NO existe en el `.md` o apunta a posición incorrecta; diferencias menores de siglas deletreadas `A D N` vs `ADN` solo resumir el conteo, no listarlas una por una).

## Formato de respuesta (obligatorio, máximo 60 líneas, en tu respuesta final)
1. **Tabla resumen** (8 filas):
   `| Capítulo | Títulos | Falsos / null | Tramos >3000 pal. (con subtítulo rescatable?) | Estado (LISTO / AJUSTAR) |`
2. **Lista de hallazgos accionables** (solo títulos falsos, `null`, posiciones malas o subtítulos nivel 2 rescatables para bajar tramos >3000 pal.; máx. 3 viñetas por capítulo).
3. **Regla estricta:** NO modifiques ningún archivo. Devuelve el informe completo en tu respuesta.
