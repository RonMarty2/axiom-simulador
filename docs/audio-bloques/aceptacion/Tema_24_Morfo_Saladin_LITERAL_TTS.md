# Aceptación: Tema_24_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_24_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-19 08:25:57
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 19 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 35 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 2 / 13879 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 2 / 13879 palabras | Llamada tras puntuación: elación veinte:un de HCO3 –; Llamada tras puntuación: elación veinte:un entre los |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 13879 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 12 / 13879 palabras | Símbolo '+': HCO3 – + hidróge; Símbolo '+': pirado, + H2O Por; Símbolo '+': en CO2 + H2O, pa (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 1 / 13879 palabras | Recuadro pegado al párrafo: y acidobásico Conocimiento más a fondo veinticuatro coma dos. Aplic... |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 2 / 13879 palabras | Ligadura partida: sufi ciente |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (2 fallas / 13879 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (2 fallas / 13879 palabras)
- Llamada tras puntuación: elación veinte:un de HCO3 –
- Llamada tras puntuación: elación veinte:un entre los

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (12 fallas / 13879 palabras)
- Símbolo '+': HCO3 – + hidróge
- Símbolo '+': pirado, + H2O Por
- Símbolo '+': en CO2 + H2O, pa
- Símbolo '+': rbonato + CO2 HCO
- Símbolo '+': a Clave + CO2 un
- Símbolo '+': dio NH3 + sodio O
- Símbolo '+': rbonato + bicarbo
- Símbolo '+': rbonato + cloruro
- Símbolo '+': o NH4Cl + hidróge
- Símbolo '+': Na2HPO4 + hidróge

### 7. Siglas, números de sección y títulos en su línea (1 fallas / 13879 palabras)
- Recuadro pegado al párrafo: y acidobásico Conocimiento más a fondo veinticuatro coma dos. Aplic...

### 8. Palabras partidas y ligaduras (2 fallas / 13879 palabras)
- Ligadura partida: sufi ciente
