# Aceptación: Tema_02_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_02_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:43:15
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 41 párrafos | P30 (84.2%): de hidrógeno, en lugar del carbono adyacente, de modo que puede agregarse hidrógen... |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 43 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 8 / 24129 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 24 / 24129 palabras | Llamada numérica: coloides9; Llamada numérica: catabolismo11; Llamada numérica: anabolismo13 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 15 / 24129 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En el cuadro dos coma un; Ref. visual: En el cuadro dos coma cuatro; Ref. visual: En el cuadro dos coma cinco (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 292 / 24129 palabras | Dígito sin convertir: rbono, C, 6p+, 6e–, 6; Dígito sin convertir: , C, 6p+, 6e–, 6n0 Nú; Dígito sin convertir: 6p+, 6e–, 6n0 Número (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 168 / 24129 palabras | Sigla en mayúsculas: LO; Sigla en mayúsculas: DNA; Sigla en mayúsculas: FONDO (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 458 / 24129 palabras | Corte por guion: ele- mentos; Corte por guion: proce- so; Corte por guion: ató- mico (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 41 párrafos)
- P30 (84.2%): de hidrógeno, en lugar del carbono adyacente, de modo que puede agregarse hidrógen...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (8 fallas / 24129 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (24 fallas / 24129 palabras)
- Llamada numérica: coloides9
- Llamada numérica: catabolismo11
- Llamada numérica: anabolismo13
- Llamada numérica: carbohidrato17
- Llamada numérica: glucógeno19
- Llamada numérica: eicosanoides22
- Llamada numérica: terciaria24
- Llamada numérica: cuaternaria25
- Llamada tras puntuación: nadas isótopos,dos que sólo
- Llamada tras puntuación: llama isómeros.cuatro Por ejem-

### 5. Figuras y tablas (sin 'ver figura', descripción) (15 fallas / 24129 palabras)
- Ref. visual: En el cuadro dos coma un
- Ref. visual: En el cuadro dos coma cuatro
- Ref. visual: En el cuadro dos coma cinco
- Ref. visual: la figura dos
- Ref. visual: en la figura dos
- Ref. visual: Como se observa
- Ref. visual: En el cuadro dos coma siete
- Ref. visual: en la figura dos coma un nueve
- Ref. visual: En la figura dos coma dos ocho
- Ref. visual: véase la figura

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (292 fallas / 24129 palabras)
- Dígito sin convertir: rbono, C, 6p+, 6e–, 6
- Dígito sin convertir: , C, 6p+, 6e–, 6n0 Nú
- Dígito sin convertir: 6p+, 6e–, 6n0 Número
- Dígito sin convertir: ógeno, N, 7p+, 7e–, 7
- Dígito sin convertir: , N, 7p+, 7e–, 7n0 Nú
- Dígito sin convertir: 7p+, 7e–, 7n0 Número
- Dígito sin convertir: odio, Na, 11p+, 11e–,
- Dígito sin convertir: Na, 11p+, 11e–, 12n0 N
- Dígito sin convertir: p+, 11e–, 12n0 Número
- Dígito sin convertir: tasio, K, 19p+, 19e–,

### 7. Siglas, números de sección y títulos en su línea (168 fallas / 24129 palabras)
- Sigla en mayúsculas: LO
- Sigla en mayúsculas: DNA
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: SOD
- Sigla en mayúsculas: MW
- Sigla en mayúsculas: OH
- Sigla en mayúsculas: CI
- Sigla en mayúsculas: AB
- Sigla en mayúsculas: CD
- Sigla en mayúsculas: AC

### 8. Palabras partidas y ligaduras (458 fallas / 24129 palabras)
- Corte por guion: ele- mentos
- Corte por guion: proce- so
- Corte por guion: ató- mico
- Corte por guion: apéndi- ce
- Corte por guion: parti- cipan
- Corte por guion: carbo- no
- Corte por guion: clo- ro
- Corte por guion: minera- les
- Corte por guion: mem- branas
- Corte por guion: funcio- nes
