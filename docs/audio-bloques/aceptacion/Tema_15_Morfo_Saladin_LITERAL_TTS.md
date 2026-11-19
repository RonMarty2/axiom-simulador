# Aceptación: Tema_15_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_15_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-19 08:25:18
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 3, 4, 7)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 30 párrafos | P28 (27.8%): PARTE TRES Integración y control doce mime igual a imitación. trece lys igual a de... |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 21 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 4 / 9763 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 9 / 9763 palabras | Llamada tras puntuación: porción cuatro:un, y aunque; Llamada tras puntuación: mal, de Chagas.once Entre otr; Llamada tras puntuación: ropa belladona.catorce En la Eda (+6 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 9763 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 9763 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 1 / 9763 palabras | Título pegado al párrafo: undo mensajero. CUADRO quince coma cinco Efectos de los si |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 9763 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 30 párrafos)
- P28 (27.8%): PARTE TRES Integración y control doce mime igual a imitación. trece lys igual a de...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (4 fallas / 9763 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (9 fallas / 9763 palabras)
- Llamada tras puntuación: porción cuatro:un, y aunque
- Llamada tras puntuación: mal, de Chagas.once Entre otr
- Llamada tras puntuación: ropa belladona.catorce En la Eda
- Nota al pie leída: . un uiscer igual a órganos internos.
- Nota al pie leída: . dos bar igual a pesado, grave.
- Nota al pie leída: . cinco syn igual a con, unión; path igual a sentimiento.
- Nota al pie leída: . siete intra igual a dentro de; mur igual a pared.
- Nota al pie leída: . nueve enter igual a intestinos; ik igual a perteneciente a.
- Nota al pie leída: . trece lys igual a descomponer, destruir.

### 7. Siglas, números de sección y títulos en su línea (1 fallas / 9763 palabras)
- Título pegado al párrafo: undo mensajero. CUADRO quince coma cinco Efectos de los si
