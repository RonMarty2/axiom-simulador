# Aceptación: EdS_Parte3_3_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte3_3_LITERAL_TTS.md"
- **Audio:** "examenes pasados\MEDICINA\LIBROS DE MEDICINA\_MOTOR_AUDIO\_AUDIO_V2\EdS_Parte3_3_LITERAL_TTS.mp3"
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-22 13:18:38
- **Veredicto final:** **FALLA** (revisiones con fallas: 9, 10)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 29 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 8 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 1187 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 1187 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 1187 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 1187 palabras (1 excepción(es) revisada(s): «uno coma dos cero ocho»: decimal real de curtosis (1,208) en pág. 185 de EdS, verificado contra EdS_texto_paginas.txt, no es millar (Antigravity 22-11)) | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 1187 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 1187 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | FALLA | 5 / 1187 palabras (similitud 91.8%) | [replace] esperado: 'g uno igual a' vs oído: 'guno iguala'; [replace] esperado: 'n s a la' vs oído: 'ns al'; [replace] esperado: 'equis barra x i' vs oído: 'xbarra xc' |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | FALLA | 2 / 1 partes (8.1 min) | Inicio no coincide con un título del texto: '10 .1 .3. ¿Coeficiente de asimetría de Fisher? El coefici...'; Final sin cierre de frase: 'concentración de los datos alrededor de los valores centrales...' |
| 11 | Volumen y silencios (ffmpeg) | audio | APRUEBA | 0 / 1 pistas (medio -20.4 dB, pico -0.9 dB) | — |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se encontró manifiesto.json) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 9. Audio = texto (Whisper pista entera) (5 fallas / 1187 palabras)
- [replace] esperado: 'g uno igual a' vs oído: 'guno iguala'
- [replace] esperado: 'n s a la' vs oído: 'ns al'
- [replace] esperado: 'equis barra x i' vs oído: 'xbarra xc'

### 10. Cortes (título, cierre, 3-20 min, sin desvanecido) (2 fallas / 1 partes)
- Inicio no coincide con un título del texto: '10 .1 .3. ¿Coeficiente de asimetría de Fisher? El coefici...'
- Final sin cierre de frase: 'concentración de los datos alrededor de los valores centrales...'
