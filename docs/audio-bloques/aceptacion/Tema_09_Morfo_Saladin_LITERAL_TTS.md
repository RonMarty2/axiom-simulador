# Aceptación: Tema_09_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_09_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:47:40
- **Veredicto final:** **FALLA** (revisiones con fallas: 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 37 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 39 párrafos PDF | PDF#37 (84.3%): Las mejoras en la tecnología han llevado a prótesis de larga duración. Más de 75%... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 7 / 15027 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Encabezado/autor/portada: PARTE DOS Soporte y movimiento |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 28 / 15027 palabras | Llamada numérica: sinartrosis4; Llamada numérica: sindesmosis6; Llamada numérica: artrosis7 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 6 / 15027 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en el cuadro ocho coma dos; Ref. visual: En la figura ocho; Ref. visual: en la figura nueve (+2 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 43 / 15027 palabras | Dígito sin convertir: gura ocho.10b, p. dosc; Dígito sin convertir: Clavícula 1a. costill; Dígito sin convertir: ue une la 1a. costill (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 65 / 15027 palabras | Sigla en mayúsculas: FONDO; Sigla en mayúsculas: VM; Sigla en mayúsculas: LE (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 24 / 15027 palabras | Corte por guion: des- cinco; Corte por guion: expli- dieciséis; Ligadura partida: anfi artrosis (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 2. Omisiones (PDF -> texto) (1 fallas / 39 párrafos PDF)
- PDF#37 (84.3%): Las mejoras en la tecnología han llevado a prótesis de larga duración. Más de 75%...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (7 fallas / 15027 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Encabezado/autor/portada: PARTE DOS Soporte y movimiento

### 4. Notas al pie (llamadas y glosas) (28 fallas / 15027 palabras)
- Llamada numérica: sinartrosis4
- Llamada numérica: sindesmosis6
- Llamada numérica: artrosis7
- Llamada numérica: sincondrosis8
- Llamada numérica: diartrosis10
- Llamada numérica: retracción17
- Llamada numérica: circunducción18
- Llamada numérica: supinación19
- Llamada numérica: inversión23
- Llamada numérica: eversión24

### 5. Figuras y tablas (sin 'ver figura', descripción) (6 fallas / 15027 palabras)
- Ref. visual: en el cuadro ocho coma dos
- Ref. visual: En la figura ocho
- Ref. visual: en la figura nueve
- Ref. visual: la figura nueve
- Ref. visual: en el cuadro nueve coma un

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (43 fallas / 15027 palabras)
- Dígito sin convertir: gura ocho.10b, p. dosc
- Dígito sin convertir: Clavícula 1a. costill
- Dígito sin convertir: ue une la 1a. costill
- Dígito sin convertir: ura nueve.4b y c, com
- Dígito sin convertir: ura nueve.8b se muest
- Dígito sin convertir: ura nueve.13a, es el a
- Dígito sin convertir: ura nueve.13b, es el m
- Dígito sin convertir: ura nueve.14a, es un m
- Dígito sin convertir: ura nueve.15a, es el m
- Dígito sin convertir: ura nueve.18b, es el m

### 7. Siglas, números de sección y títulos en su línea (65 fallas / 15027 palabras)
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: VM
- Sigla en mayúsculas: LE
- Sigla en mayúsculas: LR
- Sigla en mayúsculas: EFR
- Sigla en mayúsculas: FRE
- Sigla en mayúsculas: REF
- Sigla en mayúsculas: ACL
- Sigla en mayúsculas: PCL
- Sigla en mayúsculas: THR

### 8. Palabras partidas y ligaduras (24 fallas / 15027 palabras)
- Corte por guion: des- cinco
- Corte por guion: expli- dieciséis
- Ligadura partida: anfi artrosis
- Ligadura partida: fi brocartílago
- Ligadura partida: fl exibilidad
- Ligadura partida: fi sioterapeutas
- Ligadura partida: fi broblastos
- Ligadura partida: fl exionar
- Ligadura partida: fl exionan
- Ligadura partida: fl exione
