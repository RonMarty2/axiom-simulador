# Aceptación: Tema_16_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_16_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-21 13:03:10
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 3 / 65 párrafos | P27 (84.1%): diecinueve ot igual a oído; itis igual a inflamación. veinte tympan igual a tambor...; P48 (77.8%): treinta y ocho Friedrich S. Schlemm, mil setecientos noventa y cinco a mil ochocie...; P64 (25.0%): PARTE TRES Integración y control cincuenta y seis a igual a no; sep igual a pudrir... |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 58 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 29885 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 32 / 29885 palabras | Llamada numérica: nocirreceptores1; Llamada numérica: analgésico8; Llamada numérica: liformes13 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 18 / 29885 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en la figura dieciséis coma dos y; Ref. visual: en el cuadro dieciséis coma un; Ref. visual: el cuadro trece coma un y (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 14 / 29885 palabras | Dígito sin convertir: dieciséis.6c y d,. Se; Dígito sin convertir: dieciséis.13b. Es impo; Dígito sin convertir: dieciséis.12b y c,. El (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 1 / 29885 palabras | Sigla en mayúsculas: HC |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 10 / 29885 palabras | Corte por guion: timpá- diecisiete; Corte por guion: célu- veintisiete; Ligadura partida: endorfi nas (+6 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (3 fallas / 65 párrafos)
- P27 (84.1%): diecinueve ot igual a oído; itis igual a inflamación. veinte tympan igual a tambor...
- P48 (77.8%): treinta y ocho Friedrich S. Schlemm, mil setecientos noventa y cinco a mil ochocie...
- P64 (25.0%): PARTE TRES Integración y control cincuenta y seis a igual a no; sep igual a pudrir...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 29885 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (32 fallas / 29885 palabras)
- Llamada numérica: nocirreceptores1
- Llamada numérica: analgésico8
- Llamada numérica: liformes13
- Llamada numérica: foliadas14
- Llamada numérica: fungiformes15
- Llamada numérica: valadas16
- Llamada numérica: timpánica17
- Llamada numérica: modiolo21
- Llamada numérica: otitis19
- Llamada numérica: tectoria24

### 5. Figuras y tablas (sin 'ver figura', descripción) (18 fallas / 29885 palabras)
- Ref. visual: en la figura dieciséis coma dos y
- Ref. visual: en el cuadro dieciséis coma un
- Ref. visual: el cuadro trece coma un y
- Ref. visual: la figura trece coma cinco
- Ref. visual: En la figura dieciséis coma tres
- Ref. visual: En la figura dieciséis coma cinco
- Ref. visual: El FIGURA dieciséis coma siete
- Ref. visual: en la figura dieciséis
- Ref. visual: En la figura dieciséis
- Ref. visual: la figura dieciséis coma dos nueve

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (14 fallas / 29885 palabras)
- Dígito sin convertir: dieciséis.6c y d,. Se
- Dígito sin convertir: dieciséis.13b. Es impo
- Dígito sin convertir: dieciséis.12b y c,. El
- Dígito sin convertir: dieciséis.19c se muest
- Dígito sin convertir: ángulo de 90º, pero sí
- Dígito sin convertir: dieciséis.33b,. Ocasio
- Dígito sin convertir: dieciséis.33c,. Se cor
- Símbolo '+': estino. + – – Cor
- Símbolo '+': de casi +ochenta
- Letra griega: μ

### 7. Siglas, números de sección y títulos en su línea (1 fallas / 29885 palabras)
- Sigla en mayúsculas: HC

### 8. Palabras partidas y ligaduras (10 fallas / 29885 palabras)
- Corte por guion: timpá- diecisiete
- Corte por guion: célu- veintisiete
- Ligadura partida: endorfi nas
- Ligadura partida: fi liformes
- Ligadura partida: fl uyan
- Ligadura partida: fl ores
- Ligadura partida: fl oral
- Ligadura partida: reunifi carse
- Ligadura partida: interfi eran
