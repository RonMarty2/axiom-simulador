# Aceptación: Tema_05_Biologia_Celular_LITERAL_TTS

- **Texto:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_05_Biologia_Celular_LITERAL_TTS.md"
- **Audio:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_MOTOR_AUDIO\_AUDIO_V2\Tema_05_Biologia_Celular_LITERAL_TTS.wav"
- **Referencia PDF:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Calvo_texto_paginas.txt"
- **Fecha:** 2026-11-24 14:19:31
- **Veredicto final:** **FALLA** (revisiones con fallas: 9, 10, 11)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 52 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 33 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 12374 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 12374 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 12374 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 12374 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 12374 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 12374 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | FALLA | 4 / 12200 palabras (similitud 96.7%) | [replace] esperado: 'cinco a veintiuno a' vs oído: 'quinientos veintiunoa'; [replace] esperado: 'vy tsnare' vs oído: 'b y t snare'; [replace] esperado: 'inmunodepresores plasmaferesis inmunoglobu...' vs oído: 'immunodepresores plasma feres... (+1 más en Detalle) |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | FALLA | 1 / 1 partes (86.2 min) | Duración fuera de rango (86.2 min; esperado 3-20 min) |
| 11 | Volumen y silencios (ffmpeg) | audio | FALLA | 1 / 1 pistas (medio -20.6 dB, pico -0.0 dB) | Saturación / clipping: pico -0.0 dB (>= -0.1 dB) |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (37/156 bloques sin campo modelo en manifiesto) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 9. Audio = texto (Whisper pista entera) (4 fallas / 12200 palabras)
- [replace] esperado: 'cinco a veintiuno a' vs oído: 'quinientos veintiunoa'
- [replace] esperado: 'vy tsnare' vs oído: 'b y t snare'
- [replace] esperado: 'inmunodepresores plasmaferesis inmunoglobu...' vs oído: 'immunodepresores plasma feres...
- [replace] esperado: 'bacilo grampositivo intracelular' vs oído: 'vacilo gran positivo intracellular'

### 10. Cortes (título, cierre, 3-20 min, sin desvanecido) (1 fallas / 1 partes)
- Duración fuera de rango (86.2 min; esperado 3-20 min)

### 11. Volumen y silencios (ffmpeg) (1 fallas / 1 pistas)
- Saturación / clipping: pico -0.0 dB (>= -0.1 dB)
