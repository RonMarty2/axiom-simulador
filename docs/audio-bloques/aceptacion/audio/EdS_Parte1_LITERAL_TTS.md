# Aceptación: EdS_Parte1_LITERAL_TTS

- **Texto:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte1_LITERAL_TTS.md"
- **Audio:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_MOTOR_AUDIO\_AUDIO_V2\EdS_Parte1_LITERAL_TTS.wav"
- **Referencia PDF:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-24 14:18:29
- **Veredicto final:** **FALLA** (revisiones con fallas: 9, 10, 11)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 32 párrafos (1 excepción(es) revisada(s): «Diferencias entre Promoción de la Salud »: tabla del libro (pág. 20) narrada fila por fila, regla 7; las palabras añadidas son los encabezados de columna (Claude 16-11)) | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 240 párrafos PDF (1 excepción(es) revisada(s): «promedio de 799 casos/mes»: el párrafo está en el texto (línea «promedio de setecientos noventa y nueve casos por mes… coinfección con V I H»); la similitud baja por cifras verbalizadas (Claude 21-11)) | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 7483 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 7483 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 7483 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 7483 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 7483 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 7483 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | FALLA | 7 / 7385 palabras (similitud 97.5%) | [delete] esperado: 'prevencion de enfermedades integrando el e...' vs oído: '(vacío)'; [insert] esperado: '(vacío)' vs oído: 'gestionando recursos y desarrollando una e...'; [delete] esperado: 'la atencion primaria de salud' vs oído: '(vacío)' (+4 más en Detalle) |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | FALLA | 2 / 1 partes (55.6 min) | Duración fuera de rango (55.6 min; esperado 3-20 min); Final sin cierre de frase: 'mbientales, ecológicos que favorecen la aparición o reemergenc...' |
| 11 | Volumen y silencios (ffmpeg) | audio | FALLA | 1 / 1 pistas (medio -19.0 dB, pico -0.0 dB) | Saturación / clipping: pico -0.0 dB (>= -0.1 dB) |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se encontró manifiesto.json) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 9. Audio = texto (Whisper pista entera) (7 fallas / 7385 palabras)
- [delete] esperado: 'prevencion de enfermedades integrando el e...' vs oído: '(vacío)'
- [insert] esperado: '(vacío)' vs oído: 'gestionando recursos y desarrollando una e...'
- [delete] esperado: 'la atencion primaria de salud' vs oído: '(vacío)'
- [replace] esperado: 'vih y sida e its' vs oído: 'vihs eits'
- [delete] esperado: 'diagnostico y el tratamiento oportuno dos' vs oído: '(vacío)'
- [delete] esperado: 'de vacunacion masiva en escolares gestante...' vs oído: '(vacío)'
- [delete] esperado: 'rurales fronterizas comunidades indigenas...' vs oído: '(vacío)'

### 10. Cortes (título, cierre, 3-20 min, sin desvanecido) (2 fallas / 1 partes)
- Duración fuera de rango (55.6 min; esperado 3-20 min)
- Final sin cierre de frase: 'mbientales, ecológicos que favorecen la aparición o reemergenc...'

### 11. Volumen y silencios (ffmpeg) (1 fallas / 1 pistas)
- Saturación / clipping: pico -0.0 dB (>= -0.1 dB)
