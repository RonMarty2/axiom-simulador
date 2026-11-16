# Aceptación: Tema_17_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_17_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:52:53
- **Veredicto final:** **FALLA** (revisiones con fallas: 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 41 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 65 párrafos PDF | PDF#49 (82.4%): CAPÍTULO 17 Sistema endocrino 17.7 Trastornos endocrinos Resultados esperados del... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 14 / 26275 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 26 / 26275 palabras | Llamada numérica: paraventriculares7; Llamada numérica: pineal13; Llamada numérica: glomerulosa17 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 16 / 26275 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en el cuadro diecisiete coma dos; Ref. visual: en el cuadro diecisiete coma cuatro; Ref. visual: En la figura diecisiete coma seis (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 64 / 26275 palabras | Dígito sin convertir: y catorce.12b, p. quin; Dígito sin convertir: iecisiete.11b, que pre; Dígito sin convertir: iecisiete.9b. cuatro (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 245 / 26275 palabras | Sigla en mayúsculas: ACTH; Sigla en mayúsculas: ANP; Sigla en mayúsculas: CRH (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 31 / 26275 palabras | Corte por guion: paí- treinta; Ligadura partida: específi cos; Ligadura partida: fi jarlos (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 2. Omisiones (PDF -> texto) (1 fallas / 65 párrafos PDF)
- PDF#49 (82.4%): CAPÍTULO 17 Sistema endocrino 17.7 Trastornos endocrinos Resultados esperados del...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (14 fallas / 26275 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (26 fallas / 26275 palabras)
- Llamada numérica: paraventriculares7
- Llamada numérica: pineal13
- Llamada numérica: glomerulosa17
- Llamada numérica: fasciculada18
- Llamada numérica: reticular19
- Llamada numérica: natriurético24
- Llamada numérica: gastrina27
- Llamada numérica: eicosanoides29
- Llamada numérica: mellitus32
- Llamada tras puntuación: eta paracrinas,un que se di

### 5. Figuras y tablas (sin 'ver figura', descripción) (16 fallas / 26275 palabras)
- Ref. visual: en el cuadro diecisiete coma dos
- Ref. visual: en el cuadro diecisiete coma cuatro
- Ref. visual: En la figura diecisiete coma seis
- Ref. visual: En la figura diecisiete coma siete
- Ref. visual: En el cuadro diecisiete coma cinco
- Ref. visual: En la figura diecisiete coma un cinco
- Ref. visual: el cuadro dos coma ocho
- Ref. visual: En la figura diecisiete coma un siete
- Ref. visual: la figura diecisiete coma un siete
- Ref. visual: en la figura diecisiete

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (64 fallas / 26275 palabras)
- Dígito sin convertir: y catorce.12b, p. quin
- Dígito sin convertir: iecisiete.11b, que pre
- Dígito sin convertir: iecisiete.9b. cuatro
- Símbolo '+': duran- + + + Tir
- Símbolo '+': uran- + + + Tirol
- Símbolo '+': an- + + + Tirolib
- Símbolo '+': hibidor + Efecto
- Símbolo '×': y cinco × ciento
- Símbolo '+': 2 OH OH + CH2 O O
- Símbolo '+': , T4, H + FIGURA

### 7. Siglas, números de sección y títulos en su línea (245 fallas / 26275 palabras)
- Sigla en mayúsculas: ACTH
- Sigla en mayúsculas: ANP
- Sigla en mayúsculas: CRH
- Sigla en mayúsculas: DHEA
- Sigla en mayúsculas: EPO
- Sigla en mayúsculas: FSH
- Sigla en mayúsculas: GH
- Sigla en mayúsculas: GHRH
- Sigla en mayúsculas: IGF
- Sigla en mayúsculas: LH

### 8. Palabras partidas y ligaduras (31 fallas / 26275 palabras)
- Corte por guion: paí- treinta
- Ligadura partida: específi cos
- Ligadura partida: fi jarlos
- Ligadura partida: hipófi sis
- Ligadura partida: adenohipófi sis
- Ligadura partida: sufi jo
- Ligadura partida: fi lósofo
- Ligadura partida: fi siólogos
- Ligadura partida: específi co
- Ligadura partida: cromafi nes
