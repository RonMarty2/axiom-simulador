# Aceptación: EdS_Parte3_1_LITERAL_TTS

- **Texto:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\examenes pasados\MEDICINA\PSA_2027_FUENTES\audio_eds\EdS_Parte3_1_LITERAL_TTS.md"
- **Audio:** sin revisar (no se pasó audio)
- **Referencia PDF:** "C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\docs\audio-bloques\..\..\examenes pasados\MEDICINA\LIBROS DE MEDICINA\libros_extraidos\EdS_texto_paginas.txt"
- **Fecha:** 2026-11-16 13:30:11
- **Veredicto final:** **FALLA** (revisiones con fallas: 1, 2, 3, 5, 6, 7)

| # | Revisión | Sobre | Estado | Fallas / Revisado | Ejemplos (máx. 10) |
|---|---|---|---|---|---|
| 1 | Literalidad (texto vs PDF crudo) | texto | FALLA | 33 / 239 párrafos | P45 (86.8%): Tomando específicamente por ejemplo la talla en metros de un grupo de personas, en...; P87 (0.0%): Colegios públicos: siete mil dividido entre diez mil igual a cero coma siete cero...; P89 (41.7%): Colegios públicos: cero coma setenta por seiscientos igual a cuatrocientos veinte... (+7 más en Detalle) |
| 2 | Omisiones (PDF -> texto) | texto | FALLA | 50 / 174 párrafos PDF | PDF#12 (33.3%): del siglo XVII e inicios del siglo XVIII, algunos matemáticos como Ber-; PDF#14 (83.3%): A finales del siglo XIX, Sir Francis Gaston ideó el método cono-; PDF#35 (83.3%): nado, lo que facilita la comparación entre ellos y es posible diferen- (+7 más en Detalle) |
| 3 | Relleno leído (biblio, autoeval, créditos, portada) | texto | FALLA | 1 / 9194 palabras | Autoevaluación: ejercicios de aplicación |
| 4 | Notas al pie (llamadas y glosas) | texto | APRUEBA | 0 / 9194 palabras | — |
| 5 | Figuras y tablas (sin 'ver figura', descripción) | texto + imagen | FALLA | 9 / 9194 palabras (Solo texto; verificación con imagen requiere auditor-figuras) | Ref. visual: en la tabla cuatro; Ref. visual: la tabla cuatro; Ref. visual: en la tabla ocho (+3 más en Detalle) |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | FALLA | 4 / 9194 palabras | Miles como decimal: uno coma seis nueve ocho; Miles como decimal: cinco coma seis cero seis; Miles como decimal: seis coma seis cero seis (+1 más en Detalle) |
| 7 | Siglas, números de sección y títulos en su línea | texto | FALLA | 23 / 9194 palabras | Sigla en mayúsculas: AR; Título pegado al párrafo: las relaciones. uno punto dos Definición Para definir la Estadíst; Título pegado al párrafo: de una muestra. uno punto tres Categorías La estadística persigue (+7 más en Detalle) |
| 8 | Palabras partidas y ligaduras | texto | APRUEBA | 0 / 9194 palabras | — |
| 9 | Audio = texto (Whisper pista entera) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 10 | Cortes (título, cierre, 3-20 min, sin desvanecido) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 11 | Volumen y silencios (ffmpeg) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |
| 12 | Voz y modelo únicos (manifiesto) | audio | sin revisar | sin revisar (No se pasó audio) | sin revisar |

## Detalle de hallazgos (hasta 10 por revisión)

### 1. Literalidad (texto vs PDF crudo) (33 fallas / 239 párrafos)
- P45 (86.8%): Tomando específicamente por ejemplo la talla en metros de un grupo de personas, en...
- P87 (0.0%): Colegios públicos: siete mil dividido entre diez mil igual a cero coma siete cero...
- P89 (41.7%): Colegios públicos: cero coma setenta por seiscientos igual a cuatrocientos veinte...
- P115 (50.0%): Tabla. Para cada Nivel, se dan: número de personas. Primaria: veinte. Bachillerato...
- P118 (0.0%): Tabla. Para cada número de hijos, se dan: número de personas. cero: diecisiete. un...
- P122 (0.0%): R igual a, L s menos L i
- P126 (33.3%): La tabla recoge el tiempo, en minutos, de cada una de las cincuenta personas.
- P128 (0.0%): Li igual a cuarenta y cinco minutos, Ls igual a setenta y cinco minutos y R igual...
- P131 (0.0%): m igual a uno más tres coma tres log, n
- P134 (0.0%): m igual a uno más tres coma tres por logaritmo de cincuenta m igual a uno más tres...

### 2. Omisiones (PDF -> texto) (50 fallas / 174 párrafos PDF)
- PDF#12 (33.3%): del siglo XVII e inicios del siglo XVIII, algunos matemáticos como Ber-
- PDF#14 (83.3%): A finales del siglo XIX, Sir Francis Gaston ideó el método cono-
- PDF#35 (83.3%): nado, lo que facilita la comparación entre ellos y es posible diferen-
- PDF#47 (69.2%): la muestra: k=N/n. El número i que se emplea como punto de
- PDF#74 (83.3%): ción por la cantidad de datos que pudieron ser generados en el pro-
- PDF#79 (83.3%): tiva discreta se emplean escalas numéricas y se ordena en forma cre-
- PDF#81 (83.3%): valos o clases, amplitud del intervalo de clase, límites de los interva-
- PDF#100 (84.6%): x Se denomina frecuencia absoluta ( ni ) a la cantidad de veces que se
- PDF#101 (78.6%): presenta el valor i de la variable X en la muestra o la población.
- PDF#105 (61.5%): ble X es la adición de las frecuencias absolutas ni hasta alcanzar la

### 3. Relleno leído (biblio, autoeval, créditos, portada) (1 fallas / 9194 palabras)
- Autoevaluación: ejercicios de aplicación

### 5. Figuras y tablas (sin 'ver figura', descripción) (9 fallas / 9194 palabras)
- Ref. visual: en la tabla cuatro
- Ref. visual: la tabla cuatro
- Ref. visual: en la tabla ocho
- Ref. visual: en la tabla nueve
- Ref. visual: En la tabla doce
- Ref. visual: la tabla dieciséis

### 6. Símbolos, iones, fórmulas, unidades, griegas, miles (4 fallas / 9194 palabras)
- Miles como decimal: uno coma seis nueve ocho
- Miles como decimal: cinco coma seis cero seis
- Miles como decimal: seis coma seis cero seis
- Miles como decimal: cuatro coma dos ocho cinco

### 7. Siglas, números de sección y títulos en su línea (23 fallas / 9194 palabras)
- Sigla en mayúsculas: AR
- Título pegado al párrafo: las relaciones. uno punto dos Definición Para definir la Estadíst
- Título pegado al párrafo: de una muestra. uno punto tres Categorías La estadística persigue
- Título pegado al párrafo: s del muestreo. uno punto cuatro Unidad de análisis o de investigació
- Título pegado al párrafo: dos mil cinco. uno punto cinco Población La población o universo e
- Título pegado al párrafo: sitio y demás. uno punto seis Muestra La muestra se define como u
- Título pegado al párrafo: denomina censo. uno punto siete Parámetros y estadígrafos Los parám
- Título pegado al párrafo: a la población. uno punto ocho Variables Se considera como variabl
- Título pegado al párrafo: séis coma ocho. uno punto nueve Escalas de medición La escala de me
- Título pegado al párrafo: en estadística. dos punto uno Métodos de muestreo probabilístico
