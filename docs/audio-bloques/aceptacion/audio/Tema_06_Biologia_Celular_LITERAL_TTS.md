# Aceptación: Tema_06_Biologia_Celular_LITERAL_TTS

- **Texto:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_06_Biologia_Celular_LITERAL_TTS.md"
- **Audio:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_MOTOR_AUDIO\_AUDIO_V2\Tema_06_Biologia_Celular_LITERAL_TTS.wav"
- **Referencia PDF:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Calvo_texto_paginas.txt"
- **Fecha:** 2026-11-24 14:21:33
- **Veredicto final:** **FALLA** (revisiones con fallas: 9, 10, 11)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 71 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 41 párrafos PDF (1 excepción(es) revisada(s): «Especializaciones de la membrana plasmát»: portada del capítulo: se quitó el nombre del autor (regla 10 de libro-audio-tts); el título y los objetivos están completos (Claude 19-11)) | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 10750 palabras (1 excepción(es) revisada(s): «Cita bibliográfica: Masson»: «tinción tricrómica de Masson» es técnica histológica del cuerpo del capítulo, no cita editorial (Claude 19-11)) | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 10750 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 10750 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 10750 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 10750 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 10750 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | FALLA | 9 / 10588 palabras (similitud 95.4%) | [replace] esperado: 'extracelular mv microvellosidad pb' vs oído: 'extracellular m v microbellosidad p'; [replace] esperado: 'dos microvellosidades a representacion esq...' vs oído: 'representaciones quematica'; [replace] esperado: 'gc glucocaliz mv microvellosidades' vs oído: 'g glucocalis m microbellosidades' (+6 más en Detalle) |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | FALLA | 1 / 1 partes (77.1 min) | Duración fuera de rango (77.1 min; esperado 3-20 min) |
| 11 | Volumen y silencios (ffmpeg) | audio | FALLA | 1 / 1 pistas (medio -20.3 dB, pico -0.0 dB) | Saturación / clipping: pico -0.0 dB (>= -0.1 dB) |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (21/137 bloques sin campo modelo en manifiesto) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 9. Audio = texto (Whisper pista entera) (9 fallas / 10588 palabras)
- [replace] esperado: 'extracelular mv microvellosidad pb' vs oído: 'extracellular m v microbellosidad p'
- [replace] esperado: 'dos microvellosidades a representacion esq...' vs oído: 'representaciones quematica'
- [replace] esperado: 'gc glucocaliz mv microvellosidades' vs oído: 'g glucocalis m microbellosidades'
- [replace] esperado: 'bullous pemphingoid antigen dos' vs oído: 'buleus penthingoid antigendos'
- [replace] esperado: 'igsf cam v igsf cam' vs oído: 'igsfcam versus igsfcam'
- [replace] esperado: 'zo uno zo dos' vs oído: 'zouno zodos'
- [replace] esperado: 'i ii iii v' vs oído: 'uno dos tres cinco'
- [replace] esperado: 'glucosaminoglucanos gag proteoglucanos pg' vs oído: 'glucosamino glucanos g a g proteo...
- [replace] esperado: 'sotres' vs oído: 's o tres menos'

### 10. Cortes (título, cierre, 3-20 min, sin desvanecido) (1 fallas / 1 partes)
- Duración fuera de rango (77.1 min; esperado 3-20 min)

### 11. Volumen y silencios (ffmpeg) (1 fallas / 1 pistas)
- Saturación / clipping: pico -0.0 dB (>= -0.1 dB)
