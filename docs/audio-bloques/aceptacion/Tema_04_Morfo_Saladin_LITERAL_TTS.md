# Aceptación: Tema_04_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_04_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 17:11:49
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 38 párrafos | P6 (88.0%): PARTE UNO Organización corporal La estructura del D N A, que suele describirse com... |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 31 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 17790 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas; Crédito: da por la fotografía de Franklin, pronto pudieron ensam (+1 más en Detalle) |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 27 / 17790 palabras | Llamada numérica: smos2; Llamada numérica: homocigotos15; Llamada numérica: pleiotropía18 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 14 / 17790 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En la figura cuatro coma cinco; Ref. visual: en la figura cuatro coma un siete; Ref. visual: la figura cuatro coma ocho (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 4 / 17790 palabras | Dígito sin convertir: ra cuatro.18b, muestra; Símbolo '+': ibosome + Pi mRNA; Símbolo '+': i A D P + CUADRO (+1 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 22 / 17790 palabras | Sigla en mayúsculas: HC; Sigla en mayúsculas: NH; Sigla en mayúsculas: HO (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 310 / 17790 palabras | Corte por guion: proteí- nas; Corte por guion: inme- diato; Corte por guion: cromoso- mas (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 38 párrafos)
- P6 (88.0%): PARTE UNO Organización corporal La estructura del D N A, que suele describirse com...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 17790 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas
- Crédito: da por la fotografía de Franklin, pronto pudieron ensam
- Crédito: asombrosa ilustración de la forma en que se puede conf

### 4. Notas al pie (llamadas y glosas) (27 fallas / 17790 palabras)
- Llamada numérica: smos2
- Llamada numérica: homocigotos15
- Llamada numérica: pleiotropía18
- Llamada tras puntuación: ada cinetocoro,un que inter
- Llamada tras puntuación: ina mutaciones,tres pueden se
- Llamada tras puntuación: se. un Profase.cuatro En el ini
- Llamada tras puntuación: . dos Metafase.cinco Los cromo
- Llamada tras puntuación: llamada áster,seis que ancla
- Llamada tras puntuación: . tres Anafase.siete Inicia co
- Llamada tras puntuación: uatro Telofase.ocho El grupo

### 5. Figuras y tablas (sin 'ver figura', descripción) (14 fallas / 17790 palabras)
- Ref. visual: En la figura cuatro coma cinco
- Ref. visual: en la figura cuatro coma un siete
- Ref. visual: la figura cuatro coma ocho
- Ref. visual: en el cuadro cuatro
- Ref. visual: en el cuadro dos
- Ref. visual: En la figura cuatro coma un cero
- Ref. visual: la figura cuatro coma un un
- Ref. visual: como se ilustra en la figura
- Ref. visual: En el cuadro cuatro coma tres
- Ref. visual: En la figura cuatro coma un dos

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (4 fallas / 17790 palabras)
- Dígito sin convertir: ra cuatro.18b, muestra
- Símbolo '+': ibosome + Pi mRNA
- Símbolo '+': i A D P + CUADRO
- Miles como decimal: cuatro coma un dos Un

### 7. Siglas, números de sección y títulos en su línea (22 fallas / 17790 palabras)
- Sigla en mayúsculas: HC
- Sigla en mayúsculas: NH
- Sigla en mayúsculas: HO
- Sigla en mayúsculas: HN
- Sigla en mayúsculas: FONDO
- Título pegado al párrafo: sente capítulo. cuatro punto uno D N A y R N A: los ácidos nucleicos
- Título pegado al párrafo: os pirimidinas? FIGURA cuatro coma dos Estructura del D N
- Título pegado al párrafo: N A y el R N A. cuatro punto dos Genes y sus acciones Resultados esp
- Título pegado al párrafo: de un solo gen. FIGURA cuatro coma siete R N A de transfer
- Título pegado al párrafo: s y esteroides? cuatro punto tres Replicación del D N A y ciclo celula

### 8. Palabras partidas y ligaduras (310 fallas / 17790 palabras)
- Corte por guion: proteí- nas
- Corte por guion: inme- diato
- Corte por guion: cromoso- mas
- Corte por guion: hur- gar
- Corte por guion: hospi- tal
- Corte por guion: desoxirribo- nucleico
- Corte por guion: lla- mados
- Corte por guion: descrip- ción
- Corte por guion: alcan- zan
- Corte por guion: prome- dio
