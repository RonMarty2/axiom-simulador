# Aceptación: EdS_Parte3_2_LITERAL_TTS

- **Texto:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte3_2_LITERAL_TTS.md"
- **Audio:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\_MOTOR_AUDIO\_AUDIO_V2\EdS_Parte3_2_LITERAL_TTS.wav"
- **Referencia PDF:** "C:\SynologyDrive\SynologyDrive\axiom-simulador\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-24 14:19:02
- **Veredicto final:** **FALLA** (revisiones con fallas: 9, 10)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | APRUEBA | 0 / 262 párrafos (14 excepción(es) revisada(s): «De las tablas anteriores se deduce que e»: texto literal de EdS; baja a 86.5% por verbalizar cifras/porcentajes (Antigravity 22-11); «Retomando la información donde se analiz»: texto literal de EdS sin referencia visual a tabla (regla 2/5) (Antigravity 22-11); «Datos ordenados: tres, cuatro, cinco, se»: tabla/lista de posiciones i1..i5 verbalizada (regla 4/7) (Antigravity 22-11); «Los valores que corresponden a las posic»: texto literal de EdS con posiciones i4 e i5 verbalizadas (Antigravity 22-11); «Datos ordenados: cinco, cinco, siete, nu»: tabla/lista de posiciones i1..i8 verbalizada (regla 4/7) (Antigravity 22-11); «uno. Ubicar el intervalo, o los interval»: pasos literales de moda con subíndice ni separado en n i (Antigravity 22-11); «tres. Si i no es un número entero, se de»: paso literal de cuartiles con variable i (Antigravity 22-11); «En este caso, para el cuartil Q tres la »: texto literal de EdS con símbolo Q3 verbalizado Q tres (Antigravity 22-11); «tres. Si la posición i no es un número e»: paso literal de deciles con variable i (Antigravity 22-11); «tres. Si i no es un número entero, se de»: paso literal de cuartiles con variable i (Antigravity 22-11); «Rango igual a valor máximo menos valor m»: fórmula literal de rango verbalizada (regla 4) (Antigravity 22-11); «Donde: equis barra: media aritmética de »: leyenda literal de variables de fórmula de varianza muestral verbalizada (Antigravity 22-11); «En relación al denominador, n menos uno,»: texto literal de EdS con expresión n - 1 y año verbalizados (Antigravity 22-11); «Retomando la información sobre la estatu»: texto literal de EdS sin referencia visual a tabla (regla 2/5) (Antigravity 22-11)) | — |
| 2 | Omisiones (PDF -> texto) | texto | APRUEBA | 0 / 125 párrafos PDF (12 excepción(es) revisada(s): «Al convertir las frecuencias de la tabla»: presente en TTS sin referencia visual 'de la tabla 22' (regla 2/5) (Antigravity 22-11); «i i Los valores que corresponden a las p»: presente íntegro en TTS como 'posiciones i cuatro y i cinco' (Antigravity 22-11); «central fue la educación sexual, con pre»: sección 7.4 Ejercicios de aplicación (pág. 158), excluida por regla 10 (Antigravity 22-11); «Basada en la encuesta a estudiantes de g»: pie de tabla 32 dentro de 7.4 Ejercicios de aplicación (pág. 160), excluido por regla 10 (Antigravity 22-11); «2. Se ubica el intervalo que contiene a »: presente íntegro en TTS con fórmula k(n/4) verbalizada (Antigravity 22-11); «3. Si la posición no es un número entero»: presente íntegro en TTS como paso tres de deciles/percentiles (Antigravity 22-11); «Si la posición es un número entero, el d»: presente íntegro en TTS con notación verbalizada (Antigravity 22-11); «2. Calcular la posición con la ecuación:»: presente íntegro en TTS con ecuación verbalizada (Antigravity 22-11); «que aspiraban a los programas de Odontol»: sección 8.4 Ejercicios de aplicación (pág. 170), excluida por regla 10 (Antigravity 22-11); «oscila entre 150 y 175 cm. Si no se hace»: presente íntegro en TTS con 'ciento cincuenta y ciento setenta y cinco centímetros' (Antigravity 22-11); «que “la diferencia entre cada xi y el pr»: presente íntegro en TTS con xi y equis barra verbalizados (Antigravity 22-11); «Para una población con total de datos N »: presente íntegro en TTS con 'promedio mu' verbalizado (Antigravity 22-11)) | — |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 9764 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 9764 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 9764 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 9764 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 9764 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 9764 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | FALLA | 21 / 9725 palabras (similitud 94.0%) | [replace] esperado: 'a b c d e' vs oído: 'abcde'; [replace] esperado: 'i cuatro y i cinco' vs oído: 'icuatro e icinco'; [replace] esperado: 'n i f i n i f i equis' vs oído: 'ni fi ni fi x' (+7 más en Detalle) |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | FALLA | 2 / 1 partes (67.7 min) | Duración fuera de rango (67.7 min; esperado 3-20 min); Final sin cierre de frase: 'uerdo con la siguiente expresión ab igual a q3 más q1 menos 2m...' |
| 11 | Volumen y silencios (ffmpeg) | audio | APRUEBA | 0 / 1 pistas (medio -19.4 dB, pico -0.4 dB) | — |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se encontró manifiesto.json) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 9. Audio = texto (Whisper pista entera) (21 fallas / 9725 palabras)
- [replace] esperado: 'a b c d e' vs oído: 'abcde'
- [replace] esperado: 'i cuatro y i cinco' vs oído: 'icuatro e icinco'
- [replace] esperado: 'n i f i n i f i equis' vs oído: 'ni fi ni fi x'
- [delete] esperado: 'diecisiete dieciseis diecisiete dieciocho...' vs oído: '(vacío)'
- [delete] esperado: 'siete coma tres moda' vs oído: '(vacío)'
- [delete] esperado: 'uno tres por ciento' vs oído: '(vacío)'
- [replace] esperado: 'nota la descripcion de los componentes de...' vs oído: 'quno'
- [replace] esperado: 'p veinticinco q tres' vs oído: 'pveinticinco qtres'
- [replace] esperado: 'p diez d dos' vs oído: 'pdiez ddos'
- [replace] esperado: 'p veinte d tres' vs oído: 'pveinte dtres'

### 10. Cortes (título, cierre, 3-20 min, sin desvanecido) (2 fallas / 1 partes)
- Duración fuera de rango (67.7 min; esperado 3-20 min)
- Final sin cierre de frase: 'uerdo con la siguiente expresión ab igual a q3 más q1 menos 2m...'
