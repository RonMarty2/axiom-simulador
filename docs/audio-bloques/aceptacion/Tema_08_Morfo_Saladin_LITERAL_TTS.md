# Aceptación: Tema_08_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_08_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:47:04
- **Veredicto final:** **FALLA** (revisiones con fallas: 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 53 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 45 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 21365 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 43 / 21365 palabras | Llamada numérica: coronaria5; Llamada numérica: timpánica8; Llamada numérica: mastoidea9 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 13 / 21365 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en el cuadro ocho coma dos; Ref. visual: en la figura ocho coma dos; Ref. visual: la CUADRO ocho coma dos (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 86 / 21365 palabras | Dígito sin convertir: n para la 1a. a 10a.; Dígito sin convertir: la 1a. a 10a. costill; Dígito sin convertir: porque la 11a. y 12a. (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 30 / 21365 palabras | Sigla en mayúsculas: FONDO; Sigla en mayúsculas: IM; Sección con 'coma': . ocho coma un R (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 27 / 21365 palabras | Corte por guion: mar- cuatro; Corte por guion: cavi- siete; Corte por guion: per- diecinueve (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 21365 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (43 fallas / 21365 palabras)
- Llamada numérica: coronaria5
- Llamada numérica: timpánica8
- Llamada numérica: mastoidea9
- Llamada numérica: esfenoides12
- Llamada numérica: pterigoideas14
- Llamada numérica: etmoides15
- Llamada numérica: cribosa16
- Llamada numérica: nasales17
- Llamada numérica: cigomáticos18
- Llamada numérica: hioides19

### 5. Figuras y tablas (sin 'ver figura', descripción) (13 fallas / 21365 palabras)
- Ref. visual: en el cuadro ocho coma dos
- Ref. visual: en la figura ocho coma dos
- Ref. visual: la CUADRO ocho coma dos
- Ref. visual: El cuadro ocho coma tres
- Ref. visual: La figura ocho coma dos dos
- Ref. visual: La figura ocho coma dos nueve
- Ref. visual: En el cuadro ocho coma cuatro
- Ref. visual: véase la figura
- Ref. visual: en la figura ocho coma tres seis
- Ref. visual: En el cuadro ocho coma cinco y

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (86 fallas / 21365 palabras)
- Dígito sin convertir: n para la 1a. a 10a.
- Dígito sin convertir: la 1a. a 10a. costill
- Dígito sin convertir: porque la 11a. y 12a.
- Dígito sin convertir: la 11a. y 12a. costill
- Dígito sin convertir: s para la 1a. y 10a.
- Dígito sin convertir: la 1a. y 10a. a 12a.
- Dígito sin convertir: y 10a. a 12a. costill
- Dígito sin convertir: rdaderas, 1a. a 7a.,
- Dígito sin convertir: as, 1a. a 7a., T12 T1
- Dígito sin convertir: s falsas, 8a. a 12a.,

### 7. Siglas, números de sección y títulos en su línea (30 fallas / 21365 palabras)
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: IM
- Sección con 'coma': . ocho coma un R
- Sección con 'coma': . ocho coma dos E
- Sección con 'coma': . ocho coma tres L
- Sección con 'coma': . ocho coma cuatro L
- Sección con 'coma': ocho coma cinco L
- Título pegado al párrafo: reinta y seis,. ocho coma un Revisión general del esqueleto Resu
- Título pegado al párrafo: , médico danés. CUADRO ocho coma un Huesos del sistema óse
- Título pegado al párrafo: o y un agujero. ocho coma dos El cráneo Resultados esperados del

### 8. Palabras partidas y ligaduras (27 fallas / 21365 palabras)
- Corte por guion: mar- cuatro
- Corte por guion: cavi- siete
- Corte por guion: per- diecinueve
- Corte por guion: supe- veintidós
- Corte por guion: vérte- veinticuatro
- Corte por guion: epi- treinta
- Corte por guion: auricu- cuarenta
- Ligadura partida: fl anqueado
- Ligadura partida: fi brocartílago
- Ligadura partida: fi la
