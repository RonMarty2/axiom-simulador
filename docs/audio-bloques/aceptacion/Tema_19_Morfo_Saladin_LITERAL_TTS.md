# Aceptación: Tema_19_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_19_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:53:50
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 31 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 59 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 12 / 20027 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 42 / 20027 palabras | Llamada numérica: cardiovascular2; Llamada numérica: aurículas7; Llamada numérica: ventrículos8 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 14 / 20027 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: véanse también las figuras; Ref. visual: en el cuadro diecinueve coma tres; Ref. visual: en la figura diecinueve coma un cero (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 65 / 20027 palabras | Dígito sin convertir: iecinueve.10c., En cua; Dígito sin convertir: S2 S3 S3 1a 1b 1c S1; Dígito sin convertir: S3 S3 1a 1b 1c S1 1a (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 191 / 20027 palabras | Sigla en mayúsculas: AV; Sigla en mayúsculas: LCA; Sigla en mayúsculas: LAD (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 15 / 20027 palabras | Corte por guion: vál- un; Corte por guion: hipocalce- treinta; Ligadura partida: fl uía (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (12 fallas / 20027 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (42 fallas / 20027 palabras)
- Llamada numérica: cardiovascular2
- Llamada numérica: aurículas7
- Llamada numérica: ventrículos8
- Llamada numérica: trabécula10
- Llamada numérica: papilares11
- Llamada numérica: infarto13
- Llamada numérica: pecho14
- Llamada numérica: isquemia15
- Llamada numérica: miogénicos17
- Llamada numérica: estenosis26

### 5. Figuras y tablas (sin 'ver figura', descripción) (14 fallas / 20027 palabras)
- Ref. visual: véanse también las figuras
- Ref. visual: en el cuadro diecinueve coma tres
- Ref. visual: en la figura diecinueve coma un cero
- Ref. visual: La figura diecinueve coma nueve
- Ref. visual: en la figura diecinueve
- Ref. visual: la figura diecinueve coma un cuatro
- Ref. visual: La figura diecinueve coma un cinco
- Ref. visual: En la figura diecinueve coma un seis
- Ref. visual: en el cuadro diecinueve coma un y
- Ref. visual: la figura diecinueve coma un siete

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (65 fallas / 20027 palabras)
- Dígito sin convertir: iecinueve.10c., En cua
- Dígito sin convertir: S2 S3 S3 1a 1b 1c S1
- Dígito sin convertir: S3 S3 1a 1b 1c S1 1a
- Dígito sin convertir: S3 1a 1b 1c S1 1a 1b
- Dígito sin convertir: 1b 1c S1 1a 1b 1c S2
- Dígito sin convertir: 1c S1 1a 1b 1c S2 Ll
- Dígito sin convertir: S1 1a 1b 1c S2 Llena
- Dígito sin convertir: ntricular 1c Sístole
- Dígito sin convertir: ntricular 1a Llenado
- Dígito sin convertir: do rápido 1b Diastasi

### 7. Siglas, números de sección y títulos en su línea (191 fallas / 20027 palabras)
- Sigla en mayúsculas: AV
- Sigla en mayúsculas: LCA
- Sigla en mayúsculas: LAD
- Sigla en mayúsculas: RCA
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: SA
- Sigla en mayúsculas: PVC
- Sigla en mayúsculas: PQ
- Sigla en mayúsculas: QRS
- Sigla en mayúsculas: ST

### 8. Palabras partidas y ligaduras (15 fallas / 20027 palabras)
- Corte por guion: vál- un
- Corte por guion: hipocalce- treinta
- Ligadura partida: fl uía
- Ligadura partida: circunfl eja
- Ligadura partida: sufi ciente
- Ligadura partida: específi camente
- Ligadura partida: unifi cada
- Ligadura partida: específi co
- Ligadura partida: manifi estamente
- Ligadura partida: fl uirá
