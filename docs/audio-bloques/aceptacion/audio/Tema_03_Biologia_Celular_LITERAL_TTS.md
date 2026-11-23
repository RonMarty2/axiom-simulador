# Aceptación: Tema_03_Biologia_Celular_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_TEXTO_LITERAL_VERIFICADO\Tema_03_Biologia_Celular_LITERAL_TTS.md"
- **Audio:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_MOTOR_AUDIO\_AUDIO_V2\Tema_03_Biologia_Celular_LITERAL_TTS.mp3"
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\Calvo_texto_paginas.txt"
- **Fecha:** 2026-11-22 20:04:17
- **Veredicto final:** **FALLA** (revisiones con fallas: 9, 10)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 62 párrafos | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 45 párrafos PDF | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 11417 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 11417 palabras (2 excepción(es) revisada(s): «alfa beta,dos»: notación molecular (dímero alfa-beta-2 de espectrina), no llamada de nota al pie (Claude 19-11); «alfa beta,dos»: notación molecular (dímero alfa-beta-2 de espectrina), no llamada de nota al pie (Claude 19-11)) | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 11417 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 11417 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 11417 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 11417 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | FALLA | 6 / 11397 palabras (similitud 96.9%) | [replace] esperado: 'tres a dos a' vs oído: 'tresadosa'; [replace] esperado: 'glucosilfosfatidilinositol' vs oído: 'glucosil fosfatidil y nocitol'; [replace] esperado: 'glucosilfosfatidilinositol' vs oído: 'glucosil fosfatidil y no citol' (+3 más en Detalle) |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | FALLA | 1 / 1 partes (80.3 min) | Duración fuera de rango (80.3 min; esperado 3-20 min) |
| 11 | Volumen y silencios (ffmpeg) | audio | APRUEBA | 0 / 1 pistas (medio -21.0 dB, pico -0.4 dB) | — |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (45/146 bloques sin campo modelo en manifiesto) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 9. Audio = texto (Whisper pista entera) (6 fallas / 11397 palabras)
- [replace] esperado: 'tres a dos a' vs oído: 'tresadosa'
- [replace] esperado: 'glucosilfosfatidilinositol' vs oído: 'glucosil fosfatidil y nocitol'
- [replace] esperado: 'glucosilfosfatidilinositol' vs oído: 'glucosil fosfatidil y no citol'
- [replace] esperado: 'coy nhde' vs oído: 'co y nh de'
- [replace] esperado: 'phosphatidylinositol glycan anchor biosynt...' vs oído: 'fosfatidilinositolglycananker...
- [replace] esperado: 'tres a diecisiete a' vs oído: 'trescientos diecisietea'

### 10. Cortes (título, cierre, 3-20 min, sin desvanecido) (1 fallas / 1 partes)
- Duración fuera de rango (80.3 min; esperado 3-20 min)
