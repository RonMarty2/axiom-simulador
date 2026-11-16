# Aceptación: Tema_07_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_07_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:46:27
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 38 párrafos | P37 (0.0%): Temas de conexión: el tejido óseo en el cuerpo |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 2 / 26 párrafos PDF | PDF#6 (76.9%): ●¿Cuál es la importancia funcional de que un hueso largo sea más ancho en la epífi...; PDF#16 (72.4%): ●¿Cuáles son las dos zonas de la figura que son responsables del crecimiento en al... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 11 / 15313 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Encabezado/autor/portada: PARTE DOS Soporte y movimiento |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 29 / 15313 palabras | Llamada numérica: osteoblastos11; Llamada numérica: osteoclastos13; Llamada numérica: intramembranosa20 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 12 / 15313 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En la figura siete coma un; Ref. visual: En la figura siete coma dos; Ref. visual: En la figura siete coma siete (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 29 / 15313 palabras | Dígito sin convertir: ras siete.17a y b,. En; Dígito sin convertir: o cifosis.20b y c,. La; Letra griega: μ (+5 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 53 / 15313 palabras | Sigla en mayúsculas: OH; Sigla en mayúsculas: FONDO; Sigla en mayúsculas: DNA (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 11 / 15313 palabras | Ligadura partida: fl exibilidad; Ligadura partida: osifi cada; Ligadura partida: calcifi cada (+4 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 38 párrafos)
- P37 (0.0%): Temas de conexión: el tejido óseo en el cuerpo

### 2. Omisiones (PDF -> texto) (2 fallas / 26 párrafos PDF)
- PDF#6 (76.9%): ●¿Cuál es la importancia funcional de que un hueso largo sea más ancho en la epífi...
- PDF#16 (72.4%): ●¿Cuáles son las dos zonas de la figura que son responsables del crecimiento en al...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (11 fallas / 15313 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Encabezado/autor/portada: PARTE DOS Soporte y movimiento

### 4. Notas al pie (llamadas y glosas) (29 fallas / 15313 palabras)
- Llamada numérica: osteoblastos11
- Llamada numérica: osteoclastos13
- Llamada numérica: intramembranosa20
- Llamada numérica: endocondral22
- Llamada numérica: acondroplásico25
- Llamada numérica: cálculo28
- Llamada numérica: hipercalcemia31
- Llamada numérica: callo35
- Llamada tras puntuación: o tejido óseo,tres es un tej
- Llamada tras puntuación: o un esqueleto.un Los hueso

### 5. Figuras y tablas (sin 'ver figura', descripción) (12 fallas / 15313 palabras)
- Ref. visual: En la figura siete coma un
- Ref. visual: En la figura siete coma dos
- Ref. visual: En la figura siete coma siete
- Ref. visual: En la figura siete coma nueve
- Ref. visual: la figura siete coma nueve
- Ref. visual: en la figura ocho coma tres cuatro
- Ref. visual: En la figura siete coma un dos
- Ref. visual: en la figura siete coma ocho
- Ref. visual: En la figura siete coma cinco
- Ref. visual: el cuadro siete coma dos y

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (29 fallas / 15313 palabras)
- Dígito sin convertir: ras siete.17a y b,. En
- Dígito sin convertir: o cifosis.20b y c,. La
- Letra griega: μ
- Unidad/símbolo suelto: pH
- Unidad/símbolo suelto: μm
- Unidad/símbolo suelto: cm
- Unidad/símbolo suelto: mg
- Unidad/símbolo suelto: ml

### 7. Siglas, números de sección y títulos en su línea (53 fallas / 15313 palabras)
- Sigla en mayúsculas: OH
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: DNA
- Sigla en mayúsculas: RNA
- Sigla en mayúsculas: PTH
- Sigla en mayúsculas: RANKL
- Sigla en mayúsculas: RANK
- Sigla en mayúsculas: HO
- Sigla en mayúsculas: DEXA
- Sección con 'coma': . siete coma un T

### 8. Palabras partidas y ligaduras (11 fallas / 15313 palabras)
- Ligadura partida: fl exibilidad
- Ligadura partida: osifi cada
- Ligadura partida: calcifi cada
- Ligadura partida: fortifi cada
- Ligadura partida: sufi ciente
- Ligadura partida: interfi ere
- Ligadura partida: alfi leres
