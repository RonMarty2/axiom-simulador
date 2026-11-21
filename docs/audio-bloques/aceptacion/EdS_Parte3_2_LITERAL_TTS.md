# Aceptación: EdS_Parte3_2_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte3_2_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-21 12:11:15
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 100 / 262 párrafos | P9 (71.4%): Tabla. Para cada Institución, se dan: Calidad académica, Antigüedad en años. uno:...; P14 (24.0%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A...; P19 (20.8%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A... (+7 más en Detalle) |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 52 / 168 párrafos PDF | PDF#2 (66.7%): En la tabla 21 sólo se muestran los datos para las primeras 10 insti-; PDF#3 (57.1%): se describe en la tabla 22, con la síntesis de los datos para las insti-; PDF#5 (0.0%): las demás frecuencias. Como se observa en la tabla 22, los totales de (+7 más en Detalle) |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 9764 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 9764 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | APRUEBA | 0 / 9764 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | — |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | APRUEBA | 0 / 9764 palabras | — |
| 7 | Siglas, números de sección y títulos en su línea | texto | APRUEBA | 0 / 9764 palabras | — |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 9764 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (100 fallas / 262 párrafos)
- P9 (71.4%): Tabla. Para cada Institución, se dan: Calidad académica, Antigüedad en años. uno:...
- P14 (24.0%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A...
- P19 (20.8%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A...
- P23 (20.8%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A...
- P24 (86.5%): De las tablas anteriores se deduce que en la categoría de buena calidad académica,...
- P34 (0.0%): equis barra igual a sigma, i igual a uno hasta n, x i dividido entre n
- P35 (62.5%): Donde equis barra: media aritmética de la muestra
- P36 (67.9%): n: total de datos de la muestra x i: dato de la variable sigma, i igual a uno hast...
- P38 (30.8%): La media aritmética es equis barra igual a, dos más cuatro más tres más cinco, sob...
- P41 (0.0%): equis barra igual a sigma, i igual a uno hasta n, x i n i, sobre n

### 2. Omisiones (PDF -> texto) (52 fallas / 168 párrafos PDF)
- PDF#2 (66.7%): En la tabla 21 sólo se muestran los datos para las primeras 10 insti-
- PDF#3 (57.1%): se describe en la tabla 22, con la síntesis de los datos para las insti-
- PDF#5 (0.0%): las demás frecuencias. Como se observa en la tabla 22, los totales de
- PDF#7 (76.9%): Al convertir las frecuencias de la tabla 22 a porcentajes de fila o de
- PDF#9 (50.0%): Realice las tablas de contingencia de porcentaje de fila y de columna
- PDF#34 (53.8%): i i Los valores que corresponden a las posiciones 4 y 5 en el conjunto
- PDF#53 (53.8%): En la tabla 30 se observa que el color con mayor frecuencia es el azul,
- PDF#59 (0.0%): Basada en la encuesta a estudiantes de grado once de un colegio femenino ubicado e...
- PDF#73 (58.3%): Ejemplo: en la tabla 33 se presentan los datos ordenados de la esta-
- PDF#74 (69.2%): 2. Se ubica el intervalo que contiene a k(n /4) en la frecuencia
