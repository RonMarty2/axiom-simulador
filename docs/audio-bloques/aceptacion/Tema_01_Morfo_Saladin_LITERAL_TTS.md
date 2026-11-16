# Aceptación: Tema_01_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_01_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 14:51:58
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 2 / 37 párrafos | P2 (86.9%): uno punto uno El ámbito de la anatomía y la fisiología Resultados esperados del ap...; P14 (0.0%): nueve arbor igual a árbol; eo igual a perteneciente. |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 18 párrafos PDF | PDF#4 (32.3%): ● ¿Por qué los estudiantes de medicina deben estudiar más de un cadáver? 1 palp =... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 17 / 19147 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Crédito: cal. Esta ilustración de un manuscrito médico del sigl (+2 más en Detalle) |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 26 / 19147 palabras | Llamada numérica: auscultación2; Llamada numérica: anatomía3; Llamada numérica: disección4 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 2 / 19147 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En la figura uno coma ocho; Ref. visual: el cuadro uno coma dos |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 10 / 19147 palabras | Dígito sin convertir: enos cero.5ºC respect; Dígito sin convertir: librio de 37ºC. La sud; Dígito sin convertir: debajo de 37ºC, las mi (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 14 / 19147 palabras | Sigla en mayúsculas: FONDO; Título pegado al párrafo: otros animales. uno punto uno El ámbito de la anatomía y la fisiol; Título pegado al párrafo: s inaceptables. uno punto dos Los orígenes de la ciencia biomédica (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 59 / 19147 palabras | Ligadura partida: fi namente; Ligadura partida: fi no; Ligadura partida: fi siología (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (2 fallas / 37 párrafos)
- P2 (86.9%): uno punto uno El ámbito de la anatomía y la fisiología Resultados esperados del ap...
- P14 (0.0%): nueve arbor igual a árbol; eo igual a perteneciente.

### 2. Omisiones (PDF -> texto) (1 fallas / 18 párrafos PDF)
- PDF#4 (32.3%): ● ¿Por qué los estudiantes de medicina deben estudiar más de un cadáver? 1 palp =...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (17 fallas / 19147 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Crédito: cal. Esta ilustración de un manuscrito médico del sigl
- Crédito: ubular. b Dibujo de Hooke de las células del corcho
- Encabezado/autor/portada: PARTE UNO Organización corporal

### 4. Notas al pie (llamadas y glosas) (26 fallas / 19147 palabras)
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

### 5. Figuras y tablas (sin 'ver figura', descripción) (2 fallas / 19147 palabras)
- Ref. visual: En la figura uno coma ocho
- Ref. visual: el cuadro uno coma dos

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (10 fallas / 19147 palabras)
- Dígito sin convertir: enos cero.5ºC respect
- Dígito sin convertir: librio de 37ºC. La sud
- Dígito sin convertir: debajo de 37ºC, las mi
- Dígito sin convertir: lentada a 127ºC, 260ºF,
- Dígito sin convertir: a 127ºC, 260ºF, junto
- Dígito sin convertir: al a casi 45ºC, 113ºF,
- Dígito sin convertir: asi 45ºC, 113ºF,. Por t
- Símbolo '×': scientos×, debido
- Símbolo '+': color, + o, voca
- Símbolo '+': studio, + ia, pro

### 7. Siglas, números de sección y títulos en su línea (14 fallas / 19147 palabras)
- Sigla en mayúsculas: FONDO
- Título pegado al párrafo: otros animales. uno punto uno El ámbito de la anatomía y la fisiol
- Título pegado al párrafo: s inaceptables. uno punto dos Los orígenes de la ciencia biomédica
- Título pegado al párrafo: Hooke a Zeiss? uno punto tres El método científico Resultados espe
- Título pegado al párrafo: plique por qué. uno punto cuatro Orígenes y adaptaciones del ser huma
- Título pegado al párrafo: igual a visión. FIGURA uno coma seis Uso de herramienta pr
- Título pegado al párrafo: de pastizales. uno punto cinco Estructura humana Resultados esperad
- Título pegado al párrafo: ón de uno solo? uno punto seis Función humana Resultados esperados
- Título pegado al párrafo: igual a abajo. FIGURA uno coma ocho Variaciones anatómica
- Título pegado al párrafo: omo el efector? FIGURA uno coma un cero Retroalimentación

### 8. Palabras partidas y ligaduras (59 fallas / 19147 palabras)
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
