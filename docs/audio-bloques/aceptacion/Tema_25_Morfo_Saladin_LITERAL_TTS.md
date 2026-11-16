# Aceptación: Tema_25_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_25_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:56:08
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 42 párrafos | P32 (70.2%): PARTE CUATRO Regulación y mantenimiento H N H O C HO H N H O C HO No ocurre digest... |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 74 párrafos PDF | PDF#5 (82.1%): c) Describir el proceso químico básico que sustenta toda la digestión química, y m... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 14 / 26104 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 26 / 26104 palabras | Llamada numérica: caries7; Llamada numérica: antros10; Llamada numérica: emético12 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 6 / 26104 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: véase la figura; Ref. visual: véase también la figura; Ref. visual: en el cuadro veinte a ocho (+1 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 104 / 26104 palabras | Dígito sin convertir: inticinco.5b; véase t; Dígito sin convertir: inticinco.31b, que pas; Símbolo '+': CAH CO2 + H2O men (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 81 / 26104 palabras | Sigla en mayúsculas: GI; Sigla en mayúsculas: FONDO; Sigla en mayúsculas: LES (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 15 / 26104 palabras | Corte por guion: pregan- dos; Corte por guion: ni- siete; Ligadura partida: fi la (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 42 párrafos)
- P32 (70.2%): PARTE CUATRO Regulación y mantenimiento H N H O C HO H N H O C HO No ocurre digest...

### 2. Omisiones (PDF -> texto) (1 fallas / 74 párrafos PDF)
- PDF#5 (82.1%): c) Describir el proceso químico básico que sustenta toda la digestión química, y m...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (14 fallas / 26104 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (26 fallas / 26104 palabras)
- Llamada numérica: caries7
- Llamada numérica: antros10
- Llamada numérica: emético12
- Llamada numérica: caudado14
- Llamada numérica: íleon22
- Llamada tras puntuación: troenterología.un veinticin
- Llamada tras puntuación: vioso entérico,dos que regul
- Llamada tras puntuación: las figuras A.nueve y A.diez,
- Llamada tras puntuación: as A.nueve y A.diez, pp. trei
- Llamada tras puntuación: enomina fauces.cinco La boca e

### 5. Figuras y tablas (sin 'ver figura', descripción) (6 fallas / 26104 palabras)
- Ref. visual: véase la figura
- Ref. visual: véase también la figura
- Ref. visual: en el cuadro veinte a ocho
- Ref. visual: en la figura veinte coma tres cero

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (104 fallas / 26104 palabras)
- Dígito sin convertir: inticinco.5b; véase t
- Dígito sin convertir: inticinco.31b, que pas
- Símbolo '+': CAH CO2 + H2O men
- Símbolo '+': 3 menos + hidróge
- Símbolo '+': H2O CO2+ Ácido e
- Símbolo '+': mpático + + + + +
- Símbolo '+': ático + + + + + –
- Símbolo '+': ico + + + + + – –
- Símbolo '+': o + + + + + – – –
- Símbolo '+': + + + + + – – – F

### 7. Siglas, números de sección y títulos en su línea (81 fallas / 26104 palabras)
- Sigla en mayúsculas: GI
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: LES
- Sigla en mayúsculas: CAH
- Sigla en mayúsculas: SEM
- Sigla en mayúsculas: VIP
- Sigla en mayúsculas: GIP
- Sigla en mayúsculas: NPY
- Sigla en mayúsculas: AINE
- Sigla en mayúsculas: CCK

### 8. Palabras partidas y ligaduras (15 fallas / 26104 palabras)
- Corte por guion: pregan- dos
- Corte por guion: ni- siete
- Ligadura partida: fi la
- Ligadura partida: calcifi cada
- Ligadura partida: indefi ni
- Ligadura partida: específi cas
- Ligadura partida: afi la
- Ligadura partida: fl uyan
- Ligadura partida: fl uya
- Ligadura partida: fi ltren
