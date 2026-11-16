# Aceptación: Tema_14_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_14_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:51:04
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 59 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 69 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 12 / 26420 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 36 / 26420 palabras | Llamada numérica: caudal2; Llamada numérica: cerebelo3; Llamada numérica: telencéfalo7 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 21 / 26420 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: el cuadro trece coma un; Ref. visual: La figura catorce coma cuatro; Ref. visual: en la figura catorce (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 31 / 26420 palabras | Dígito sin convertir: a catorce.1b y c; fig; Dígito sin convertir: a catorce.1c. Un espa; Dígito sin convertir: a catorce.9c, que es (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 84 / 26420 palabras | Sigla en mayúsculas: FONDO; Sigla en mayúsculas: HIV; Sigla en mayúsculas: PET (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 27 / 26420 palabras | Corte por guion: secre- veintiuno; Corte por guion: por- veintidós; Corte por guion: impor- veinticinco (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (12 fallas / 26420 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (36 fallas / 26420 palabras)
- Llamada numérica: caudal2
- Llamada numérica: cerebelo3
- Llamada numérica: telencéfalo7
- Llamada numérica: metencéfalo9
- Llamada numérica: lemniscos12
- Llamada numérica: tegmento15
- Llamada numérica: reticular16
- Llamada numérica: pedúnculos20
- Llamada numérica: ínsula23
- Llamada numérica: putamen26

### 5. Figuras y tablas (sin 'ver figura', descripción) (21 fallas / 26420 palabras)
- Ref. visual: el cuadro trece coma un
- Ref. visual: La figura catorce coma cuatro
- Ref. visual: en la figura catorce
- Ref. visual: la figura trece
- Ref. visual: en el cuadro catorce coma un
- Ref. visual: la figura catorce
- Ref. visual: la figura catorce coma cuatro
- Ref. visual: la figura catorce coma nueve
- Ref. visual: el FIGURA catorce coma un dos
- Ref. visual: en la figura catorce coma un cinco

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (31 fallas / 26420 palabras)
- Dígito sin convertir: a catorce.1b y c; fig
- Dígito sin convertir: a catorce.1c. Un espa
- Dígito sin convertir: a catorce.9c, que es
- Dígito sin convertir: ura trece.5a, p. cuat
- Dígito sin convertir: a catorce.9c, se ven
- Dígito sin convertir: a catorce.9b. Estos e
- Dígito sin convertir: a catorce.9b, está do
- Dígito sin convertir: a catorce.9b. Los otr
- Dígito sin convertir: a catorce.9a., El núc
- Dígito sin convertir: a catorce.8b, pero no

### 7. Siglas, números de sección y títulos en su línea (84 fallas / 26420 palabras)
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: HIV
- Sigla en mayúsculas: PET
- Sigla en mayúsculas: ADHD
- Sigla en mayúsculas: REM
- Sigla en mayúsculas: SWS
- Sigla en mayúsculas: SCN
- Sigla en mayúsculas: MFB
- Sigla en mayúsculas: MRI
- Sigla en mayúsculas: IVV

### 8. Palabras partidas y ligaduras (27 fallas / 26420 palabras)
- Corte por guion: secre- veintiuno
- Corte por guion: por- veintidós
- Corte por guion: impor- veinticinco
- Corte por guion: sig- treinta
- Ligadura partida: sofi sticado
- Ligadura partida: fi no
- Ligadura partida: colifl or
- Ligadura partida: fi broblastos
- Ligadura partida: fl uctuaciones
- Ligadura partida: tráfi co
