# Aceptación: Atlas_A_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Atlas_A_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:41:30
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 19 párrafos | P12 (88.3%): El organismo tiene múltiples cavidades corporales, figura A.siete, cuadro A.dos, c... |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 2 / 15 párrafos PDF | PDF#1 (75.4%): Atlas A Exploración de MRI a color de todo el cuerpo. A.1 Terminología anatómica g...; PDF#11 (57.1%): Cavidad pélvica Vejiga, recto, órganos reproductores Peritoneo 11 mediastino = en... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 4538 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 55 / 4538 palabras | Llamada numérica: sagital1; Llamada numérica: vísceras10; Llamada numérica: parietal14 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 6 / 4538 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: como se observa en la figura; Ref. visual: véase la figura; Ref. visual: ver las figuras (+2 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 8 / 4538 palabras | Dígito sin convertir: figura A.4a,. Otros; Dígito sin convertir: figura A.4b,. Un pla; Dígito sin convertir: figura A.4c, y lo di (+5 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 10 / 4538 palabras | Sigla en mayúsculas: MRI; Sigla en mayúsculas: CT; Sigla en mayúsculas: RUQ (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 63 / 4538 palabras | Corte por guion: supo- sición; Corte por guion: per- manece; Corte por guion: resul- taría (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 19 párrafos)
- P12 (88.3%): El organismo tiene múltiples cavidades corporales, figura A.siete, cuadro A.dos, c...

### 2. Omisiones (PDF -> texto) (2 fallas / 15 párrafos PDF)
- PDF#1 (75.4%): Atlas A Exploración de MRI a color de todo el cuerpo. A.1 Terminología anatómica g...
- PDF#11 (57.1%): Cavidad pélvica Vejiga, recto, órganos reproductores Peritoneo 11 mediastino = en...

### 4. Notas al pie (llamadas y glosas) (55 fallas / 4538 palabras)
- Llamada numérica: sagital1
- Llamada numérica: vísceras10
- Llamada numérica: parietal14
- Llamada tras puntuación: ón corporal A.un Terminolo
- Llamada tras puntuación: ente, figura A.un,. Sin est
- Llamada tras puntuación: s, fi gu- ra A.dos,. La dife
- Llamada tras puntuación: úbito FIGURA A.un Posición
- Llamada tras puntuación: ente. FIGURA A.dos Supinació
- Llamada tras puntuación: rsal, figura A.tres,. Un plan
- Llamada tras puntuación: parasagitales.dos Un plano

### 5. Figuras y tablas (sin 'ver figura', descripción) (6 fallas / 4538 palabras)
- Ref. visual: como se observa en la figura
- Ref. visual: véase la figura
- Ref. visual: ver las figuras
- Ref. visual: ver la figura
- Detalle solo visual: flecha

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (8 fallas / 4538 palabras)
- Dígito sin convertir: figura A.4a,. Otros
- Dígito sin convertir: figura A.4b,. Un pla
- Dígito sin convertir: figura A.4c, y lo di
- Dígito sin convertir: figura A.6a y b. Por
- Dígito sin convertir: figura A.6c y d,. A
- Dígito sin convertir: figura A.8a, la cual
- Dígito sin convertir: figura A.8b,. Al igu
- Dígito sin convertir: figura A.7a,; contie

### 7. Siglas, números de sección y títulos en su línea (10 fallas / 4538 palabras)
- Sigla en mayúsculas: MRI
- Sigla en mayúsculas: CT
- Sigla en mayúsculas: RUQ
- Sigla en mayúsculas: RLQ
- Sigla en mayúsculas: LUQ
- Sigla en mayúsculas: LLQ
- Título pegado al párrafo: acia el frente. FIGURA A.dos Supinación y pronación del an
- Título pegado al párrafo: en esta figura? FIGURA A.cuatro Vistas del cuerpo en los t
- Título pegado al párrafo: ad abdominales. CUADRO A.un Términos direccionales en la a
- Título pegado al párrafo: de doble pared. CUADRO A.dos Cavidades y membranas corpora

### 8. Palabras partidas y ligaduras (63 fallas / 4538 palabras)
- Corte por guion: supo- sición
- Corte por guion: per- manece
- Corte por guion: resul- taría
- Corte por guion: cora- zón
- Corte por guion: ante- rior
- Corte por guion: arri- ba
- Corte por guion: gu- ra
- Corte por guion: pro- na
- Corte por guion: órga- nos
- Corte por guion: ros- tral
