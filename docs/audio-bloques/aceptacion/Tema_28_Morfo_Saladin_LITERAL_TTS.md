# Aceptación: Tema_28_Morfo_Saladin_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_28_Morfo_Saladin_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Saladin_texto_paginas.txt"
- **Fecha:** 2026-11-19 07:57:01
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 4, 5, 6, 7, 8)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 1 / 45 párrafos | P23 (0.0%): veintitrés lute igual a amarillo. veinticuatro alb igual a blanco. |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 3 / 63 párrafos PDF | PDF#4 (71.4%): f) Describir la estructura de la mama no lactante. 1 ou = huevo; arium = lugar para.; PDF#9 (46.2%): ●¿Qué propósitos tienen estos cilios? 7 myo = músculo; metr = útero. 8 endo = dent...; PDF#12 (83.3%): CIN I: displasia media con cambios celulares que suelen relacio- narse con HPV. |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 12 / 22176 palabras | Autoevaluación: Antes de proseguir; Autoevaluación: Responda las siguientes preguntas |
| 4 | Notas al pie (llamadas y glosas) | texto | FALLA | 26 / 22176 palabras | Llamada numérica: infundíbulo4; Llamada numérica: útero6; Llamada numérica: miometrio7 (+7 más en Detalle) |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 2 / 22176 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: véase la figura; Detalle solo visual: flecha |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 12 / 22176 palabras | Dígito sin convertir: figura A.5a, p. trei; Dígito sin convertir: ogénesis, 2n 2n n n n; Dígito sin convertir: nesis, 2n 2n n n n n (+7 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 3 / 22176 palabras | Sigla en mayúsculas: FONDO; Sigla en mayúsculas: TEMAS; Recuadro pegado al párrafo: yen a la estimuCONOCIMIENTO MÁS A FONDO veintiocho coma un Aplicaci... |
| 8 | Palabras partidas y ligaduras | texto | FALLA | 20 / 22176 palabras | Corte por guion: trom- dos; Corte por guion: meioGonado- liberina; Corte por guion: progestero- veinticinco (+7 más en Detalle) |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (1 fallas / 45 párrafos)
- P23 (0.0%): veintitrés lute igual a amarillo. veinticuatro alb igual a blanco.

### 2. Omisiones (PDF -> texto) (3 fallas / 63 párrafos PDF)
- PDF#4 (71.4%): f) Describir la estructura de la mama no lactante. 1 ou = huevo; arium = lugar para.
- PDF#9 (46.2%): ●¿Qué propósitos tienen estos cilios? 7 myo = músculo; metr = útero. 8 endo = dent...
- PDF#12 (83.3%): CIN I: displasia media con cambios celulares que suelen relacio- narse con HPV.

### 3. Relleno leído (biblio, autoeval, créditos, portada) (12 fallas / 22176 palabras)
- Autoevaluación: Antes de proseguir
- Autoevaluación: Responda las siguientes preguntas

### 4. Notas al pie (llamadas y glosas) (26 fallas / 22176 palabras)
- Llamada numérica: infundíbulo4
- Llamada numérica: útero6
- Llamada numérica: miometrio7
- Llamada numérica: endometrio8
- Llamada numérica: vagina11
- Llamada numérica: estrógenos16
- Llamada numérica: teca20
- Llamada numérica: oófero21
- Llamada numérica: ectópico31
- Llamada numérica: gravídica32

### 5. Figuras y tablas (sin 'ver figura', descripción) (2 fallas / 22176 palabras)
- Ref. visual: véase la figura
- Detalle solo visual: flecha

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (12 fallas / 22176 palabras)
- Dígito sin convertir: figura A.5a, p. trei
- Dígito sin convertir: ogénesis, 2n 2n n n n
- Dígito sin convertir: nesis, 2n 2n n n n n
- Dígito sin convertir: n n n n n 2n Multipli
- Dígito sin convertir: os a cero.3ºC, cero c
- Dígito sin convertir: ro a cero.6ºF,. Esto
- Dígito sin convertir: eintiocho.20a y b,. El
- Posible mil como decimal: coma un cero cero
- Miles como decimal: cuatro cero coma cero nueve cero
- Miles como decimal: cero coma un cero cero

### 7. Siglas, números de sección y títulos en su línea (3 fallas / 22176 palabras)
- Sigla en mayúsculas: FONDO
- Sigla en mayúsculas: TEMAS
- Recuadro pegado al párrafo: yen a la estimuCONOCIMIENTO MÁS A FONDO veintiocho coma un Aplicaci...

### 8. Palabras partidas y ligaduras (20 fallas / 22176 palabras)
- Corte por guion: trom- dos
- Corte por guion: meioGonado- liberina
- Corte por guion: progestero- veinticinco
- Ligadura partida: fl anquea
- Ligadura partida: atrofi an
- Ligadura partida: fi nas
- Ligadura partida: efi caz
- Ligadura partida: sufi ciente
- Ligadura partida: prolífi co
- Ligadura partida: fi brinolisina
