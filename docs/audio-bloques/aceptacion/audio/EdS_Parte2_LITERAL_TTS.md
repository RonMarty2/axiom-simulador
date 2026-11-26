# Aceptación: EdS_Parte2_LITERAL_TTS

- **Texto:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte2_LITERAL_TTS.md"
- **Audio:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_MOTOR_AUDIO\_AUDIO_V2\EdS_Parte2_LITERAL_TTS.wav"
- **Referencia PDF:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-24 14:18:47
- **Veredicto final:** **FALLA** (revisiones con fallas: 9, 10)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 162 párrafos (3 excepción(es) revisada(s): «Variable independiente X uno y Variable »: esquema de la pág. 72 transcrito de la imagen y dicho en palabras (regla 2, opción A); falta revisión de auditor-figuras (Claude 16-11); «Estudio en grupo variable independiente»: esquema de la pág. 72 dicho en palabras (regla 2) (Claude 16-11); «Circular del cordón umbilical variable i»: esquema de la págs. 72-73 dicho en palabras (regla 2) (Claude 16-11)) | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 101 párrafos PDF (3 excepción(es) revisada(s): «[Esquema transcrito desde la imagen»: los mismos 3 esquemas: en el libro usan X1/V.I, la voz dice «X uno», «variable independiente» (Claude 16-11); «[Esquema transcrito desde la imagen»: los mismos 3 esquemas: en el libro usan X1/V.I, la voz dice «X uno», «variable independiente» (Claude 16-11); «[Esquema transcrito desde la imagen»: los mismos 3 esquemas: en el libro usan X1/V.I, la voz dice «X uno», «variable independiente» (Claude 16-11)) | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 11181 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 11181 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 11181 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 11181 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 11181 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 11181 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | FALLA | 4 / 11195 palabras (similitud 99.0%) | [delete] esperado: 'hoda rashad dos mil seis' vs oído: '(vacío)'; [delete] esperado: 'caracteristicas de los objetivos' vs oído: '(vacío)'; [delete] esperado: 'el marco teorico en la investigacion cuali...' vs oído: '(vacío)' (+1 más en Detalle) |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | FALLA | 1 / 1 partes (76.0 min) | Duración fuera de rango (76.0 min; esperado 3-20 min) |
| 11 | Volumen y silencios (ffmpeg) | audio | APRUEBA | 0 / 1 pistas (medio -19.5 dB, pico -0.2 dB) | — |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se encontró manifiesto.json) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 9. Audio = texto (Whisper pista entera) (4 fallas / 11195 palabras)
- [delete] esperado: 'hoda rashad dos mil seis' vs oído: '(vacío)'
- [delete] esperado: 'caracteristicas de los objetivos' vs oído: '(vacío)'
- [delete] esperado: 'el marco teorico en la investigacion cuali...' vs oído: '(vacío)'
- [insert] esperado: '(vacío)' vs oído: 'siete deben tener un alcance'

### 10. Cortes (título, cierre, 3-20 min, sin desvanecido) (1 fallas / 1 partes)
- Duración fuera de rango (76.0 min; esperado 3-20 min)
