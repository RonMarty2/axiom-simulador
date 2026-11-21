# Aceptación: Tema_18_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_18_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-21 13:03:57
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 2 / 43 párrafos | P2 (88.5%): dieciocho punto uno Introducción Resultados esperados del aprendizaje Cuando haya...; P8 (69.6%): FIGURA dieciocho coma tres Niños de Angola con kwashiorkor. Obsérvense las extremi... |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 56 párrafos PDF | PDF#4 (82.1%): e) Describir en términos generales cómo se produce la sangre. Funciones del aparat... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 22160 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 27 / 22160 palabras | Llamada numérica: cardiovascular1; Llamada numérica: mieloide6; Llamada numérica: apoferritina9 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 11 / 22160 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En el cuadro dieciocho coma un; Ref. visual: como se observa; Ref. visual: En la figura dieciocho coma nueve (+6 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 85 / 22160 palabras | Dígito sin convertir: ura media 38ºC, cien.4; Dígito sin convertir: 8ºC, cien.4ºF, pe hac; Símbolo '+': HPO4 dos+, uno co (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 6 / 22160 palabras | Sigla en mayúsculas: HC; Sigla en mayúsculas: FONDO; Recuadro pegado al párrafo: e bloquear los CONOCIMIENTO MÁS A FONDO dieciocho coma dos Historia... (+1 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 1 / 22160 palabras | Ligadura partida: azurófi los |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (2 fallas / 43 párrafos)
- P2 (88.5%): dieciocho punto uno Introducción Resultados esperados del aprendizaje Cuando haya...
- P8 (69.6%): FIGURA dieciocho coma tres Niños de Angola con kwashiorkor. Obsérvense las extremi...

### 2. Omisiones (PDF -> texto) (1 fallas / 56 párrafos PDF)
- PDF#4 (82.1%): e) Describir en términos generales cómo se produce la sangre. Funciones del aparat...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 22160 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (27 fallas / 22160 palabras)
- Llamada numérica: cardiovascular1
- Llamada numérica: mieloide6
- Llamada numérica: apoferritina9
- Llamada numérica: hipoplásica17
- Llamada numérica: hemostasia22
- Llamada numérica: tromboplastina27
- Llamada tras puntuación: na hematología.dos El propós
- Llamada tras puntuación: na hemopoyesis.cinco El conoci
- Llamada tras puntuación: es principales:un recoger o
- Llamada tras puntuación: astroferritina,ocho producida

### 5. Figuras y tablas (sin 'ver figura', descripción) (11 fallas / 22160 palabras)
- Ref. visual: En el cuadro dieciocho coma un
- Ref. visual: como se observa
- Ref. visual: En la figura dieciocho coma nueve
- Ref. visual: En el cuadro dieciocho coma cuatro
- Ref. visual: En la figura dieciocho coma un dos
- Ref. visual: en el cuadro dieciocho coma seis
- Ref. visual: en el cuadro dieciocho coma siete
- Ref. visual: la figura dieciocho coma dos tres
- Ref. visual: En el cuadro dieciocho coma ocho

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (85 fallas / 22160 palabras)
- Dígito sin convertir: ura media 38ºC, cien.4
- Dígito sin convertir: 8ºC, cien.4ºF, pe hac
- Símbolo '+': HPO4 dos+, uno co
- Símbolo '~': o. Mide ~siete co
- Símbolo '+': ión CO2 + H2O → ←
- Símbolo '+': a de Fe2++ y hier
- Símbolo '+': de Fe2++ y hierr
- Símbolo '+': tivo, Rh+, si tie
- Símbolo '+': n como O+ para el
- Símbolo '+': s son Rh+ y quinc

### 7. Siglas, números de sección y títulos en su línea (6 fallas / 22160 palabras)
- Sigla en mayúsculas: HC
- Sigla en mayúsculas: FONDO
- Recuadro pegado al párrafo: e bloquear los CONOCIMIENTO MÁS A FONDO dieciocho coma dos Historia...
- Recuadro pegado al párrafo: mantenimiento CONOCIMIENTO MÁS A FONDO dieciocho coma seis Aplicaci...

### 8. Palabras partidas y ligaduras (1 fallas / 22160 palabras)
- Ligadura partida: azurófi los
