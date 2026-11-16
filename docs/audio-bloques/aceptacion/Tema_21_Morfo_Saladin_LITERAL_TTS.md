# Aceptación: Tema_21_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_21_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 18:21:54
- **Veredicto final:** **FALLA** (revisiones con fallas: 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 50 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 5 / 69 párrafos PDF | PDF#65 (24.8%): Para probar los conocimientos, analice los siguientes temas con un compañero de es...; PDF#66 (42.7%): CAPÍTULO 21 Los sistemas linfático e inmunitario 8. La historia de los linfocitos...; PDF#67 (21.5%): 1. Tres funciones importantes que pue- den efectuarse mal en la función inmunitari... (+2 más en Detalle) |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 13 / 25793 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Crédito: e, b, fue tomada de R. G. Kessel y R. H. Kardon, Tissu |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 25 / 25793 palabras | Llamada numérica: patógenos8; Llamada numérica: paracrinos15; Llamada numérica: diapédesis17 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 13 / 25793 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en el cuadro dieciocho coma seis; Ref. visual: véase también la figura; Ref. visual: en el cuadro dieciocho a seis (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 7 / 25793 palabras | Símbolo '+': C D ocho+ porque; Símbolo '~': s tiene ~cuatroci; Símbolo '+': ica dos +m dos +m (+2 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 20 / 25793 palabras | Sigla en mayúsculas: FONDO; Sigla en mayúsculas: TEMAS; Sigla en mayúsculas: TODOS (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 86 / 25793 palabras | Corte por guion: propó- trece; Ligadura partida: fl uya; Ligadura partida: neutrófi los (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 2. Omisiones (PDF -> texto) (5 fallas / 69 párrafos PDF)
- PDF#65 (24.8%): Para probar los conocimientos, analice los siguientes temas con un compañero de es...
- PDF#66 (42.7%): CAPÍTULO 21 Los sistemas linfático e inmunitario 8. La historia de los linfocitos...
- PDF#67 (21.5%): 1. Tres funciones importantes que pue- den efectuarse mal en la función inmunitari...
- PDF#68 (0.0%): e) El timo. 2. ¿Cuáles de las siguientes células intervienen en la resistencia ine...
- PDF#69 (60.0%): e) Un mastocito. 5. La acción citolítica del sistema de complementos es más pareci...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (13 fallas / 25793 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Crédito: e, b, fue tomada de R. G. Kessel y R. H. Kardon, Tissu

### 4. Notas al pie (llamadas y glosas) (25 fallas / 25793 palabras)
- Llamada numérica: patógenos8
- Llamada numérica: paracrinos15
- Llamada numérica: diapédesis17
- Llamada numérica: inmunitario20
- Llamada numérica: antígeno21
- Llamada numérica: anamnésica25
- Llamada numérica: laxis28
- Llamada numérica: sistémico34
- Llamada tras puntuación: de Langerhans.tres, Juegan u
- Llamada tras puntuación: rches de Peyer.cuatro Órganos l

### 5. Figuras y tablas (sin 'ver figura', descripción) (13 fallas / 25793 palabras)
- Ref. visual: en el cuadro dieciocho coma seis
- Ref. visual: véase también la figura
- Ref. visual: en el cuadro dieciocho a seis
- Ref. visual: en el cuadro veintiuno coma un
- Ref. visual: en el cuadro veintiuno coma cuatro
- Ref. visual: En la figura veintiuno coma un nueve
- Ref. visual: en el cuadro veintiuno coma cinco
- Ref. visual: el cuadro veintiuno coma cuatro
- Ref. visual: en la figura veintiuno coma dos dos
- Ref. visual: En el cuadro veintiuno coma cuatro

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (7 fallas / 25793 palabras)
- Símbolo '+': C D ocho+ porque
- Símbolo '~': s tiene ~cuatroci
- Símbolo '+': ica dos +m dos +m
- Símbolo '+': +m dos +m Retícu
- Letra griega: μ

### 7. Siglas, números de sección y títulos en su línea (20 fallas / 25793 palabras)
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: TEMAS
- Sigla en mayúsculas: TODOS
- Título pegado al párrafo: tema linfático. veintiuno punto uno El sistema linfático Resultados...
- Título pegado al párrafo: a misma manera. FIGURA veintiuno coma tres Capilares linfá
- Título pegado al párrafo: mista italiano. FIGURA veintiuno coma cinco Intercambio de
- Título pegado al párrafo: las fagocitan. FIGURA veintiuno coma ocho Folículo linfát
- Título pegado al párrafo: l a enfermedad. FIGURA veintiuno coma un tres Las amígdala
- Título pegado al párrafo: alas palatinas. veintiuno punto dos Resistencia inespecífica Result...
- Título pegado al párrafo: lula moribunda. FIGURA veintiuno coma un seis El complejo

### 8. Palabras partidas y ligaduras (86 fallas / 25793 palabras)
- Corte por guion: propó- trece
- Ligadura partida: fl uya
- Ligadura partida: neutrófi los
- Ligadura partida: fi nas
- Ligadura partida: ramifi cada
- Ligadura partida: fi ebre
- Ligadura partida: neutrófi lo
- Ligadura partida: eosinófi los
- Ligadura partida: basófi los
- Ligadura partida: específi cas
