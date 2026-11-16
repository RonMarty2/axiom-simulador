# Aceptación: EdS_Parte3_2_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte3_2_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-16 09:22:36
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 5, 6, 7)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 95 / 256 párrafos | P8 (71.4%): Tabla. Para cada Institución, se dan: Calidad académica, Antigüedad en años. uno:...; P13 (24.0%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A...; P18 (20.8%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A... (+7 más en Detalle) |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 50 / 165 párrafos PDF | PDF#2 (33.3%): En la tabla 21 sólo se muestran los datos para las primeras 10 insti-; PDF#5 (33.3%): las demás frecuencias. Como se observa en la tabla 22, los totales de; PDF#8 (0.0%): De las tablas anteriores se deduce que en la categoría de buena calidad (+7 más en Detalle) |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | APRUEBA | 0 / 9464 palabras | — |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 9464 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 16 / 9464 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en la tabla veintidós; Ref. visual: En la tabla veintidós; Ref. visual: la tabla veintidós (+7 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 2 / 9464 palabras | Miles como decimal: uno coma siete cinco tres; Miles como decimal: ocho coma siete cinco dos |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 11 / 9464 palabras | Título pegado al párrafo: idad académica. seis punto uno Tabla de contingencia de porcentaje; Título pegado al párrafo: mediana y moda. siete punto uno Media aritmética La media aritmétic; Título pegado al párrafo: ma dos minutos. siete punto dos Mediana La mediana en un conjunto d (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 9464 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (95 fallas / 256 párrafos)
- P8 (71.4%): Tabla. Para cada Institución, se dan: Calidad académica, Antigüedad en años. uno:...
- P13 (24.0%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A...
- P18 (20.8%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A...
- P22 (20.8%): Tabla. Para cada Calidad académica, se dan: Antigüedad, años: diez a diecinueve, A...
- P32 (0.0%): equis barra igual a sigma, i igual a uno hasta n, x i dividido entre n
- P33 (62.5%): Donde equis barra: media aritmética de la muestra
- P34 (67.9%): n: total de datos de la muestra x i: dato de la variable sigma, i igual a uno hast...
- P36 (30.8%): La media aritmética es equis barra igual a, dos más cuatro más tres más cinco, sob...
- P39 (0.0%): equis barra igual a sigma, i igual a uno hasta n, x i n i, sobre n
- P40 (75.0%): Donde n i es frecuencia absoluta para cada valor de la variable.

### 2. Omisiones (PDF -> texto) (50 fallas / 165 párrafos PDF)
- PDF#2 (33.3%): En la tabla 21 sólo se muestran los datos para las primeras 10 insti-
- PDF#5 (33.3%): las demás frecuencias. Como se observa en la tabla 22, los totales de
- PDF#8 (0.0%): De las tablas anteriores se deduce que en la categoría de buena calidad
- PDF#9 (50.0%): Realice las tablas de contingencia de porcentaje de fila y de columna
- PDF#34 (53.8%): i i Los valores que corresponden a las posiciones 4 y 5 en el conjunto
- PDF#59 (0.0%): Basada en la encuesta a estudiantes de grado once de un colegio femenino ubicado e...
- PDF#74 (75.0%): 2. Se ubica el intervalo que contiene a k(n /4) en la frecuencia
- PDF#77 (75.0%): Los deciles (Dk) son valores que fraccionan la distribución de los datos
- PDF#80 (0.0%): 3. Si la posición no es un número entero, se debe redondear al entero
- PDF#81 (33.3%): siguiente y el valor que ocupa esta posición será el cuartil requerido.

### 5. Figuras y tablas (sin 'ver figura', descripción) (16 fallas / 9464 palabras)
- Ref. visual: en la tabla veintidós
- Ref. visual: En la tabla veintidós
- Ref. visual: la tabla veintidós
- Ref. visual: la tabla veintidós a
- Ref. visual: la tabla doce
- Ref. visual: en la tabla doce
- Ref. visual: En la tabla treinta
- Ref. visual: en la tabla treinta y tres
- Ref. visual: la tabla treinta y tres
- Ref. visual: en la tabla treinta y cuatro

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (2 fallas / 9464 palabras)
- Miles como decimal: uno coma siete cinco tres
- Miles como decimal: ocho coma siete cinco dos

### 7. Siglas, números de sección y títulos en su línea (11 fallas / 9464 palabras)
- Título pegado al párrafo: idad académica. seis punto uno Tabla de contingencia de porcentaje
- Título pegado al párrafo: mediana y moda. siete punto uno Media aritmética La media aritmétic
- Título pegado al párrafo: ma dos minutos. siete punto dos Mediana La mediana en un conjunto d
- Título pegado al párrafo: dia aritmética. siete punto tres Moda En la vida cotidiana se escuch
- Título pegado al párrafo: de la mediana. ocho punto uno Cuartiles Los cuartiles, Q k, son v
- Título pegado al párrafo: , cuartil tres. ocho punto dos Deciles Los deciles, D k, son valor
- Título pegado al párrafo: , dos mil ocho. nueve punto uno Rango El rango es considerado como
- Título pegado al párrafo: co centímetros. nueve punto dos Rango intercuartil El rango intercu
- Título pegado al párrafo: en al gimnasio. nueve punto tres Varianza La varianza es una medida
- Título pegado al párrafo: ta y viceversa. nueve punto cinco Coeficiente de variación El coefici
