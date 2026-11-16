# Aceptación: Tema_08_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_08_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 14:53:56
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 61 párrafos | P26 (56.0%): veinte font igual a fuente; ella igual a pequeño. veintiuno met igual a más allá;... |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 45 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 21371 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 43 / 21371 palabras | Llamada numérica: coronaria5; Llamada numérica: timpánica8; Llamada numérica: mastoidea9 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 13 / 21371 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en el cuadro ocho coma dos; Ref. visual: en la figura ocho coma dos; Ref. visual: la CUADRO ocho coma dos (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 83 / 21371 palabras | Dígito sin convertir: n para la 1a. a 10a.; Dígito sin convertir: la 1a. a 10a. costill; Dígito sin convertir: porque la 11a. y 12a. (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 16 / 21371 palabras | Título pegado al párrafo: reinta y seis,. ocho punto uno Revisión general del esqueleto Resu; Título pegado al párrafo: , médico danés. CUADRO ocho coma un Huesos del sistema óse; Título pegado al párrafo: o y un agujero. ocho punto dos El cráneo Resultados esperados del (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 27 / 21371 palabras | Corte por guion: mar- cuatro; Corte por guion: cavi- siete; Corte por guion: per- diecinueve (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 61 párrafos)
- P26 (56.0%): veinte font igual a fuente; ella igual a pequeño. veintiuno met igual a más allá;...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 21371 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (43 fallas / 21371 palabras)
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

### 5. Figuras y tablas (sin 'ver figura', descripción) (13 fallas / 21371 palabras)
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

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (83 fallas / 21371 palabras)
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

### 7. Siglas, números de sección y títulos en su línea (16 fallas / 21371 palabras)
- Título pegado al párrafo: reinta y seis,. ocho punto uno Revisión general del esqueleto Resu
- Título pegado al párrafo: , médico danés. CUADRO ocho coma un Huesos del sistema óse
- Título pegado al párrafo: o y un agujero. ocho punto dos El cráneo Resultados esperados del
- Título pegado al párrafo: sos del cuerpo. FIGURA ocho coma tres Vista anterior del c
- Título pegado al párrafo: corte frontal,. FIGURA ocho coma ocho Los senos paranasale
- Título pegado al párrafo: igual a cabeza. CUADRO ocho coma tres Huesos y sus agujero
- Título pegado al párrafo: El esfenoides. FIGURA ocho coma un dos El etmoides, vista
- Título pegado al párrafo: ntras responde. ocho punto tres La columna vertebral y la caja torác
- Título pegado al párrafo: umna vertebral. FIGURA ocho coma un nueve Curvaturas de la
- Título pegado al párrafo: gual a pequeño. FIGURA ocho coma dos un Curvaturas anormal

### 8. Palabras partidas y ligaduras (27 fallas / 21371 palabras)
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
