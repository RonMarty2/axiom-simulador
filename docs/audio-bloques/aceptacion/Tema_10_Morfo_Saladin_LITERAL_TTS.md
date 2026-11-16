# Aceptación: Tema_10_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_10_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:48:16
- **Veredicto final:** **FALLA** (revisiones con fallas: 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 75 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 3 / 67 párrafos PDF | PDF#1 (50.0%): e) Del tobillo. 9. El doblado hacia atrás de la cintura incluye la __________ de l...; PDF#2 (31.2%): e) flexión. 10. El manguito de los rotadores incluye los tendones de todos los sig...; PDF#3 (7.4%): e) El redondo menor. 11. Al lubricante de una diartrosis se le denomina __________... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 27867 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 27 / 27867 palabras | Llamada numérica: músculo2; Llamada numérica: fusiformes8; Llamada numérica: peniformes9 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 23 / 27867 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en la figura diez coma cuatro y; Ref. visual: en la figura diez coma cuatro; Ref. visual: La figura diez coma cinco (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 11 / 27867 palabras | Dígito sin convertir: uras diez.31b y diez c; Dígito sin convertir: gura diez.20c: el elev; Dígito sin convertir: gura diez.23b y d. Nom (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 41 / 27867 palabras | Sigla en mayúsculas: FONDO; Sigla en mayúsculas: FIGURE; Sigla en mayúsculas: SIRS (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 9 / 27867 palabras | Ligadura partida: fl exionar; Ligadura partida: fl exionará; Ligadura partida: fi jador (+3 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 2. Omisiones (PDF -> texto) (3 fallas / 67 párrafos PDF)
- PDF#1 (50.0%): e) Del tobillo. 9. El doblado hacia atrás de la cintura incluye la __________ de l...
- PDF#2 (31.2%): e) flexión. 10. El manguito de los rotadores incluye los tendones de todos los sig...
- PDF#3 (7.4%): e) El redondo menor. 11. Al lubricante de una diartrosis se le denomina __________...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 27867 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (27 fallas / 27867 palabras)
- Llamada numérica: músculo2
- Llamada numérica: fusiformes8
- Llamada numérica: peniformes9
- Llamada numérica: sinergista12
- Llamada numérica: antagonista13
- Llamada numérica: superciliar16
- Llamada numérica: modiolo18
- Llamada numérica: externos42
- Llamada numérica: lumbricales50
- Llamada numérica: lata53

### 5. Figuras y tablas (sin 'ver figura', descripción) (23 fallas / 27867 palabras)
- Ref. visual: en la figura diez coma cuatro y
- Ref. visual: en la figura diez coma cuatro
- Ref. visual: La figura diez coma cinco
- Ref. visual: La figura diez coma seis
- Ref. visual: en la figura nueve coma dos cero
- Ref. visual: en la figura diez coma ocho
- Ref. visual: en el cuadro diez coma seis
- Ref. visual: en el cuadro diez coma ocho
- Ref. visual: la figura diez coma un siete
- Ref. visual: en la figura diez

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (11 fallas / 27867 palabras)
- Dígito sin convertir: uras diez.31b y diez c
- Dígito sin convertir: gura diez.20c: el elev
- Dígito sin convertir: gura diez.23b y d. Nom
- Dígito sin convertir: uras diez.23c y d,. El
- Dígito sin convertir: figura B.19a, p. tres
- Dígito sin convertir: figura B-19b, p. tres
- Dígito sin convertir: xionado a 45º en relac
- Dígito sin convertir: gura diez.40a y d,. Po
- Unidad/símbolo suelto: kg
- Uso de 'un coma': un coma

### 7. Siglas, números de sección y títulos en su línea (41 fallas / 27867 palabras)
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: FIGURE
- Sigla en mayúsculas: SIRS
- Sección con 'coma': . diez coma un O
- Sección con 'coma': . diez coma dos M
- Sección con 'coma': diez coma tres M
- Sección con 'coma': . diez coma cuatro M
- Sección con 'coma': . diez coma cinco M
- Título pegado al párrafo: los controlan. diez coma un Organización estructural y funcional
- Título pegado al párrafo: tos y directos. FIGURA diez coma tres Compartimientos musc

### 8. Palabras partidas y ligaduras (9 fallas / 27867 palabras)
- Ligadura partida: fl exionar
- Ligadura partida: fl exionará
- Ligadura partida: fi jador
- Ligadura partida: fi jadores
- Ligadura partida: fotográfi co
- Ligadura partida: fi jarse
