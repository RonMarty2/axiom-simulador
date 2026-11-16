# Aceptación: Tema_18_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_18_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:53:28
- **Veredicto final:** **FALLA** (revisiones con fallas: 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 32 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 1 / 56 párrafos PDF | PDF#4 (82.1%): e) Describir en términos generales cómo se produce la sangre. Funciones del aparat... |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 10 / 22053 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 27 / 22053 palabras | Llamada numérica: cardiovascular1; Llamada numérica: mieloide6; Llamada numérica: apoferritina9 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 11 / 22053 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: En el cuadro dieciocho coma un; Ref. visual: como se observa; Ref. visual: En la figura dieciocho coma nueve (+6 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 214 / 22053 palabras | Dígito sin convertir: ura media 38ºC, cien.4; Dígito sin convertir: 8ºC, cien.4ºF, pH sie; Símbolo '+': HPO4 dos+, un com (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 141 / 22053 palabras | Sigla en mayúsculas: HDL; Sigla en mayúsculas: LDL; Sigla en mayúsculas: COP (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 68 / 22053 palabras | Ligadura partida: específi co; Ligadura partida: Neutrófi los; Ligadura partida: Eosinófi los (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 2. Omisiones (PDF -> texto) (1 fallas / 56 párrafos PDF)
- PDF#4 (82.1%): e) Describir en términos generales cómo se produce la sangre. Funciones del aparat...

### 3. Relleno leído (biblio, autoeval, créditos, portada) (10 fallas / 22053 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (27 fallas / 22053 palabras)
- Llamada numérica: cardiovascular1
- Llamada numérica: mieloide6
- Llamada numérica: apoferritina9
- Llamada numérica: hipoplásica17
- Llamada numérica: hemostasia22
- Llamada numérica: tromboplastina27
- Llamada tras puntuación: na hematología.dos El propós
- Llamada tras puntuación: na hemopoyesis.cinco El conoci
- Llamada tras puntuación: es principales:un recoger o
- Llamada tras puntuación: astroferritina,ocho producida

### 5. Figuras y tablas (sin 'ver figura', descripción) (11 fallas / 22053 palabras)
- Ref. visual: En el cuadro dieciocho coma un
- Ref. visual: como se observa
- Ref. visual: En la figura dieciocho coma nueve
- Ref. visual: En el cuadro dieciocho coma cuatro
- Ref. visual: En la figura dieciocho coma un dos
- Ref. visual: en el cuadro dieciocho coma seis
- Ref. visual: en el cuadro dieciocho coma siete
- Ref. visual: la figura dieciocho coma dos tres
- Ref. visual: En el cuadro dieciocho coma ocho

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (214 fallas / 22053 palabras)
- Dígito sin convertir: ura media 38ºC, cien.4
- Dígito sin convertir: 8ºC, cien.4ºF, pH sie
- Símbolo '+': HPO4 dos+, un com
- Símbolo '~': o. Mide ~siete co
- Símbolo '+': ión CO2 + H2O → ←
- Símbolo '+': a de Fe2++ y hier
- Símbolo '+': de Fe2++ y hierr
- Símbolo '+': tivo, Rh+, si tie
- Símbolo '+': n como O+ para el
- Símbolo '+': s son Rh+ y quinc

### 7. Siglas, números de sección y títulos en su línea (141 fallas / 22053 palabras)
- Sigla en mayúsculas: HDL
- Sigla en mayúsculas: LDL
- Sigla en mayúsculas: COP
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: HSC
- Sigla en mayúsculas: PPSC
- Sigla en mayúsculas: CAH
- Sigla en mayúsculas: CH
- Sigla en mayúsculas: COOH
- Sigla en mayúsculas: HC

### 8. Palabras partidas y ligaduras (68 fallas / 22053 palabras)
- Ligadura partida: específi co
- Ligadura partida: Neutrófi los
- Ligadura partida: Eosinófi los
- Ligadura partida: Basófi los
- Ligadura partida: fl uya
- Ligadura partida: transfi ere
- Ligadura partida: específi cos
- Ligadura partida: fi jado
- Ligadura partida: efi cacia
- Ligadura partida: interfi ere
