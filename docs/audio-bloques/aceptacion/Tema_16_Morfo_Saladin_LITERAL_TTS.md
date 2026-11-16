# Aceptación: Tema_16_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_16_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:52:19
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 56 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 58 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 29856 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 32 / 29856 palabras | Llamada numérica: nocirreceptores1; Llamada numérica: analgésico8; Llamada numérica: liformes13 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 18 / 29856 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en la figura dieciséis coma dos y; Ref. visual: en el cuadro dieciséis coma un; Ref. visual: el cuadro trece coma un y (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 59 / 29856 palabras | Dígito sin convertir: dieciséis.6c y d,. Se; Dígito sin convertir: dieciséis.13b. Es impo; Dígito sin convertir: dieciséis.12b y c,. El (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 67 / 29856 palabras | Sigla en mayúsculas: EPSP; Sigla en mayúsculas: IPSP; Sigla en mayúsculas: CNS (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 50 / 29856 palabras | Corte por guion: timpá- diecisiete; Corte por guion: célu- veintisiete; Ligadura partida: codifi cada (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 29856 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (32 fallas / 29856 palabras)
- Llamada numérica: nocirreceptores1
- Llamada numérica: analgésico8
- Llamada numérica: liformes13
- Llamada numérica: foliadas14
- Llamada numérica: fungiformes15
- Llamada numérica: valadas16
- Llamada numérica: timpánica17
- Llamada numérica: otitis19
- Llamada numérica: modiolo21
- Llamada numérica: tectoria24

### 5. Figuras y tablas (sin 'ver figura', descripción) (18 fallas / 29856 palabras)
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

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (59 fallas / 29856 palabras)
- Dígito sin convertir: dieciséis.6c y d,. Se
- Dígito sin convertir: dieciséis.13b. Es impo
- Dígito sin convertir: dieciséis.12b y c,. El
- Dígito sin convertir: dieciséis.19c se muest
- Dígito sin convertir: ángulo de 90º, pero sí
- Dígito sin convertir: dieciséis.33b,. Ocasio
- Dígito sin convertir: dieciséis.33c,. Se cor
- Símbolo '+': estino. + – – Cor
- Símbolo '+': de casi +ochenta
- Símbolo '°': treinta° con rel

### 7. Siglas, números de sección y títulos en su línea (67 fallas / 29856 palabras)
- Sigla en mayúsculas: EPSP
- Sigla en mayúsculas: IPSP
- Sigla en mayúsculas: CNS
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: IHC
- Sigla en mayúsculas: OHC
- Sigla en mayúsculas: UV
- Sigla en mayúsculas: IR
- Sigla en mayúsculas: SEM
- Sigla en mayúsculas: CH

### 8. Palabras partidas y ligaduras (50 fallas / 29856 palabras)
- Corte por guion: timpá- diecisiete
- Corte por guion: célu- veintisiete
- Ligadura partida: codifi cada
- Ligadura partida: fi nas
- Ligadura partida: fi na
- Ligadura partida: específi cas
- Ligadura partida: específi cos
- Ligadura partida: fi broblastos
- Ligadura partida: Ruffi ni
- Ligadura partida: fi siólogos
