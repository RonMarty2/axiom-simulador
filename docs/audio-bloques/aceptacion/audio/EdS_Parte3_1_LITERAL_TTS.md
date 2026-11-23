# Aceptación: EdS_Parte3_1_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte3_1_LITERAL_TTS.md"
- **Audio:** "examenes pasados\MEDICINA\LIBROS DE MEDICINA\_MOTOR_AUDIO\_AUDIO_V2\EdS_Parte3_1_LITERAL_TTS.mp3"
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-22 13:50:49
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 9, 10, 11)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 2 / 237 párrafos (3 excepción(es) revisada(s): «Tomando específicamente por ejemplo la t»: texto literal de EdS; baja a 86.8% por cifras/unidades verbalizadas (metros, intervalos) (Antigravity 22-11); «La tabla recoge el tiempo, en minutos, d»: introducción de tabla narrada de EdS (regla 7); texto verificado contra EdS_texto_paginas.txt (Antigravity 22-11); «m igual a uno más tres coma tres por log»: fórmula de Sturges (m = 1 + 3,3 log(50)) verbalizada según regla 4 de libro-audio-tts (Antigravity 22-11)) | P176 (50.0%): N i igual a sigma, k igual a uno a i, n k; P181 (50.0%): H i igual a sigma, k igual a uno a i, h k |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 3 / 78 párrafos PDF | PDF#45 (52.2%): accidente ocurrido a un grupo de empleados en una industria. Clasifique en cada un...; PDF#46 (0.0%): Personas con Amigos, familiares, pareja, compaquienes consume licor ñeros de traba...; PDF#55 (64.3%): la muestra: k=N/n. El número i que se emplea como punto de |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 9098 palabras (1 excepción(es) revisada(s): «Autoevaluación: ejercicios de aplicación»: mención descriptiva en la presentación del bloque sobre su estructura didáctica, no es sección de autoevaluación (Antigravity 21-11)) | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 9098 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 9098 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 9098 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 9098 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 9098 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | FALLA | 15 / 9087 palabras (similitud 97.0%) | [replace] esperado: 'censo uno punto siete parametros y estadig...' vs oído: 'senso'; [delete] esperado: 'uno punto ocho variables' vs oído: '(vacío)'; [delete] esperado: 'uno punto ocho punto uno variables cualita...' vs oído: '(vacío)' (+6 más en Detalle) |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | FALLA | 2 / 1 partes (62.7 min) | Duración fuera de rango (62.7 min; esperado 3-20 min); Inicio no coincide con un título del texto: 'Introducción La estadística ha cobrado gran importancia e...' |
| 11 | Volumen y silencios (ffmpeg) | audio | FALLA | 1 / 1 pistas (medio -19.6 dB, pico 0.0 dB) | Saturación / clipping: pico 0.0 dB (>= -0.1 dB) |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se encontró manifiesto.json) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (2 fallas / 237 párrafos)
- P176 (50.0%): N i igual a sigma, k igual a uno a i, n k
- P181 (50.0%): H i igual a sigma, k igual a uno a i, h k

### 2. Omisiones (PDF -> texto) (3 fallas / 78 párrafos PDF)
- PDF#45 (52.2%): accidente ocurrido a un grupo de empleados en una industria. Clasifique en cada un...
- PDF#46 (0.0%): Personas con Amigos, familiares, pareja, compaquienes consume licor ñeros de traba...
- PDF#55 (64.3%): la muestra: k=N/n. El número i que se emplea como punto de

### 9. Audio = texto (Whisper pista entera) (15 fallas / 9087 palabras)
- [replace] esperado: 'censo uno punto siete parametros y estadig...' vs oído: 'senso'
- [delete] esperado: 'uno punto ocho variables' vs oído: '(vacío)'
- [delete] esperado: 'uno punto ocho punto uno variables cualita...' vs oído: '(vacío)'
- [replace] esperado: 'mil' vs oído: 'coma cero cero cero'
- [delete] esperado: 'dos punto uno punto cuatro' vs oído: '(vacío)'
- [delete] esperado: 'dos punto tres punto dos' vs oído: '(vacío)'
- [replace] esperado: 'n i h i n i h i equis' vs oído: 'ni hi ni hi x'
- [replace] esperado: 'n i h i n i h i' vs oído: 'ni hi ni hi hi hi'
- [replace] esperado: 'n i h i' vs oído: 'ni hi'

### 10. Cortes (título, cierre, 3-20 min, sin desvanecido) (2 fallas / 1 partes)
- Duración fuera de rango (62.7 min; esperado 3-20 min)
- Inicio no coincide con un título del texto: 'Introducción La estadística ha cobrado gran importancia e...'

### 11. Volumen y silencios (ffmpeg) (1 fallas / 1 pistas)
- Saturación / clipping: pico 0.0 dB (>= -0.1 dB)
