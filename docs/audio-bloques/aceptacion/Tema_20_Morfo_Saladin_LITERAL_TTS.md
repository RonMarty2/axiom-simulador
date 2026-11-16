# Aceptación: Tema_20_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_20_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:54:16
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 53 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 71 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 18 / 30854 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Crédito: a un ocho Ilustración de De Motu Cordis, de William Ha (+1 más en Detalle) |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 41 / 30854 palabras | Llamada numérica: metaarteriolas3; Llamada numérica: aneurisma2; Llamada numérica: subclavia8 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 16 / 30854 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: la figura veinte coma un dos; Ref. visual: la figura veinte coma un seis; Ref. visual: En la figura veinte coma un ocho (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 159 / 30854 palabras | Dígito sin convertir: aquí como 3salida., E; Dígito sin convertir: oncótica: 28entrada –; Dígito sin convertir: entrada – 8salida igu (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 80 / 30854 palabras | Sigla en mayúsculas: LM; Sigla en mayúsculas: SEM; Sigla en mayúsculas: FONDO (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 30 / 30854 palabras | Corte por guion: quí- treinta; Ligadura partida: fl uyan; Ligadura partida: fl uctuaciones (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (18 fallas / 30854 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Crédito: a un ocho Ilustración de De Motu Cordis, de William Ha
- Encabezado/autor/portada: Regulación y mantenimiento lunático

### 4. Notas al pie (llamadas y glosas) (41 fallas / 30854 palabras)
- Llamada numérica: metaarteriolas3
- Llamada numérica: aneurisma2
- Llamada numérica: subclavia8
- Llamada numérica: yugular12
- Llamada numérica: frénicas13
- Llamada numérica: toracoacromial14
- Llamada numérica: hemiácigos16
- Llamada numérica: celiaco17
- Llamada numérica: gastroepiploica18
- Llamada numérica: vesical19

### 5. Figuras y tablas (sin 'ver figura', descripción) (16 fallas / 30854 palabras)
- Ref. visual: la figura veinte coma un dos
- Ref. visual: la figura veinte coma un seis
- Ref. visual: En la figura veinte coma un ocho
- Ref. visual: en el cuadro veinte coma cinco
- Ref. visual: en la figura veinte coma dos cinco
- Ref. visual: véanse también las figuras
- Ref. visual: en el cuadro veinte coma seis
- Ref. visual: En el cuadro veinte coma seis
- Ref. visual: véanse las figuras
- Ref. visual: en la figura veinte coma tres siete

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (159 fallas / 30854 palabras)
- Dígito sin convertir: aquí como 3salida., E
- Dígito sin convertir: oncótica: 28entrada –
- Dígito sin convertir: entrada – 8salida igu
- Dígito sin convertir: a igual a 20entrada. L
- Dígito sin convertir: sanguínea 28entrada CO
- Dígito sin convertir: tisular – 8salida Pre
- Dígito sin convertir: oncótica 20entrada FI
- Dígito sin convertir: tica neta 33salida Pre
- Dígito sin convertir: ncótica – 20entrada Pr
- Dígito sin convertir: ción neta 13salida La

### 7. Siglas, números de sección y títulos en su línea (80 fallas / 30854 palabras)
- Sigla en mayúsculas: LM
- Sigla en mayúsculas: SEM
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: MAP
- Sigla en mayúsculas: ACE
- Sigla en mayúsculas: COP
- Sigla en mayúsculas: NFP
- Sigla en mayúsculas: IVC
- Sigla en mayúsculas: AV
- Sigla en mayúsculas: LVR

### 8. Palabras partidas y ligaduras (30 fallas / 30854 palabras)
- Corte por guion: quí- treinta
- Ligadura partida: fl uyan
- Ligadura partida: fl uctuaciones
- Ligadura partida: fl uyendo
- Ligadura partida: específi cos
- Ligadura partida: específi cas
- Ligadura partida: sufi ciente
- Ligadura partida: fi broblastos
- Ligadura partida: fi nes
- Ligadura partida: fl uiría
