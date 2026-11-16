# Aceptación: Tema_01_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_01_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:42:38
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 30 párrafos | P2 (86.9%): un coma un El ámbito de la anatomía y la fisiología Resultados esperados del apren... |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 18 párrafos PDF | PDF#4 (32.3%): ● ¿Por qué los estudiantes de medicina deben estudiar más de un cadáver? 1 palp =... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 17 / 19036 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Crédito: cal. Esta ilustración de un manuscrito médico del sigl (+2 más en Detalle) |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 26 / 19036 palabras | Llamada numérica: auscultación2; Llamada numérica: anatomía3; Llamada numérica: disección4 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 2 / 19036 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En la figura un coma ocho; Ref. visual: el cuadro un coma dos |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 93 / 19036 palabras | Dígito sin convertir: enos cero.5ºC respect; Dígito sin convertir: librio de 37ºC. La sud; Dígito sin convertir: debajo de 37ºC, las mi (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 69 / 19036 palabras | Sigla en mayúsculas: DNA; Sigla en mayúsculas: FONDO; Sigla en mayúsculas: TA (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 59 / 19036 palabras | Ligadura partida: fi namente; Ligadura partida: fi no; Ligadura partida: fi siología (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 30 párrafos)
- P2 (86.9%): un coma un El ámbito de la anatomía y la fisiología Resultados esperados del apren...

### 2. Omisiones (PDF -> texto) (1 fallas / 18 párrafos PDF)
- PDF#4 (32.3%): ● ¿Por qué los estudiantes de medicina deben estudiar más de un cadáver? 1 palp =...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (17 fallas / 19036 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Crédito: cal. Esta ilustración de un manuscrito médico del sigl
- Crédito: ubular. b Dibujo de Hooke de las células del corcho
- Encabezado/autor/portada: PARTE UNO Organización corporal

### 4. Notas al pie (llamadas y glosas) (26 fallas / 19036 palabras)
- Llamada numérica: auscultación2
- Llamada numérica: anatomía3
- Llamada numérica: disección4
- Llamada numérica: citología7
- Llamada numérica: siología8
- Llamada numérica: organelos13
- Llamada numérica: holismo14
- Llamada numérica: metabolismo15
- Llamada numérica: tomográfica20
- Llamada numérica: ecografía21

### 5. Figuras y tablas (sin 'ver figura', descripción) (2 fallas / 19036 palabras)
- Ref. visual: En la figura un coma ocho
- Ref. visual: el cuadro un coma dos

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (93 fallas / 19036 palabras)
- Dígito sin convertir: enos cero.5ºC respect
- Dígito sin convertir: librio de 37ºC. La sud
- Dígito sin convertir: debajo de 37ºC, las mi
- Dígito sin convertir: lentada a 127ºC, 260ºF,
- Dígito sin convertir: a 127ºC, 260ºF, junto
- Dígito sin convertir: al a casi 45ºC, 113ºF,
- Dígito sin convertir: asi 45ºC, 113ºF,. Por t
- Símbolo '×': scientos×, debido
- Símbolo '°': e veinte°C, reali
- Símbolo '°': y siete°C, noven

### 7. Siglas, números de sección y títulos en su línea (69 fallas / 19036 palabras)
- Sigla en mayúsculas: DNA
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: TA
- Sigla en mayúsculas: NA
- Sigla en mayúsculas: PET
- Sigla en mayúsculas: MRI
- Sigla en mayúsculas: CT
- Sigla en mayúsculas: CAT
- Sección con 'coma': . un coma un E
- Sección con 'coma': . un coma dos L

### 8. Palabras partidas y ligaduras (59 fallas / 19036 palabras)
- Ligadura partida: fi namente
- Ligadura partida: fi no
- Ligadura partida: fi siología
- Ligadura partida: fi siopatología
- Ligadura partida: fi sioterapia
- Ligadura partida: fi lósofos
- Ligadura partida: específi cas
- Ligadura partida: fi siólogo
- Ligadura partida: científi cos
- Ligadura partida: fi nos
