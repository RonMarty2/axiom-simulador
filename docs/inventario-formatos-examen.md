# Inventario de formatos de examen del banco UMSS

Generado por conteo automático de los `.md` en `data/examenes/umss/<facultad>/` (frontmatter + bloques `## Pregunta N` con su `area:`). Verificación leída de `data/registro-verificacion.json` (clave `<facultad>/<archivo>`). Sin cambios en código ni datos.

Notas de lectura:
- «Nº preguntas» = bloques `## Pregunta` transcriptos. «Faltantes» = preguntas declaradas en `faltantes` del frontmatter (no transcriptas). «Dur.» = `duracion_minutos` del frontmatter.
- «Verificado» viene del registro: `sí (completo)` o `sí (parcial, nivel contra-facsimil)`. `completo: false` significa que faltan figuras u otras piezas, no solo preguntas.
- Convocatoria: `1op`/`2op`/`3op`/`Única` son admisión por opción; `parcial`/`final` son del curso propedéutico (`categoria: parcial_curso`).

## Resumen

| Facultad | Exámenes | Verificados | Formatos distintos | Duraciones distintas (min) |
|---|---|---|---|---|
| Ciencias Económicas | 10 | 0 | 7 | 60, 70 |
| Ingeniería (FCyT) | 139 | 74 | 23 | 100, 120, 130, 140, 150 |
| Medicina | 5 | 0 | 4 | 90 |
| Derecho | 0 | 0 | 0 | - |

## Ciencias Económicas (`economicas`)

### Exámenes por gestión

| Archivo | Año | Tipo | Convocatoria | Dur. (min) | Nº preguntas (transcriptas / frontmatter) | Faltantes | Áreas (nº preguntas) | Verificado |
|---|---|---|---|---|---|---|---|---|
| 2011-1op-1-2011.md | 2011 | admisión | 1op-1 | 70 | 14 / 14 | 0 | matematicas 10, lenguaje 4 | no |
| 2011-2op-1-2011.md | 2011 | admisión | 2op-1 | 60 | 13 / 14 | 1 | matematicas 9, lenguaje 4 | no |
| 2012-1op-1-2012.md | 2012 | admisión | 1op-1 | 60 | 13 / 13 | 0 | matematicas 10, lenguaje 3 | no |
| 2012-2op-1-2012.md | 2012 | admisión | 2op-1 | 60 | 14 / 14 | 0 | matematicas 10, lenguaje 4 | no |
| 2013-1op-2-2013.md | 2013 | admisión | 1op-2 | 60 | 24 / 24 | 0 | matematicas 10, historia 10, lenguaje 4 | no |
| 2013-2op-2-2013.md | 2013 | admisión | 2op-2 | 60 | 22 / 22 | 0 | matematicas 10, historia 8, lenguaje 4 | no |
| 2014-1op-1-2014.md | 2014 | admisión | 1op-1 | 60 | 24 / 24 | 0 | matematicas 10, historia 10, lenguaje 4 | no |
| 2014-1op-2-2014.md | 2014 | admisión | 1op-2 | 60 | 24 / 24 | 0 | matematicas 10, historia 10, lenguaje 4 | no |
| 2014-2op-1-2014.md | 2014 | admisión | 2op-1 | 60 | 23 / 23 | 0 | matematicas 10, historia 9, lenguaje 4 | no |
| 2023-2op-1-2023.md | 2023 | admisión | 2op-1 | 60 | 10 / 10 | 0 | matematicas 10 | no |

### Formatos (agrupados por áreas y conteo)

| Formato | Exámenes | Gestiones | Nº preguntas | Áreas (nº y % real) | Duración (min) | Tipo | Verificados |
|---|---|---|---|---|---|---|---|
| Formato 1 | 2 | 2011, 2012 | 14 | matematicas 10 (71.4%), lenguaje 4 (28.6%) | 70/60 | admisión | 0 |
| Formato 2 | 1 | 2011 | 13 | matematicas 9 (69.2%), lenguaje 4 (30.8%) | 60 | admisión | 0 |
| Formato 3 | 1 | 2012 | 13 | matematicas 10 (76.9%), lenguaje 3 (23.1%) | 60 | admisión | 0 |
| Formato 4 | 3 | 2013, 2014 | 24 | matematicas 10 (41.7%), historia 10 (41.7%), lenguaje 4 (16.7%) | 60 | admisión | 0 |
| Formato 5 | 1 | 2013 | 22 | matematicas 10 (45.5%), historia 8 (36.4%), lenguaje 4 (18.2%) | 60 | admisión | 0 |
| Formato 6 | 1 | 2014 | 23 | matematicas 10 (43.5%), historia 9 (39.1%), lenguaje 4 (17.4%) | 60 | admisión | 0 |
| Formato 7 | 1 | 2023 | 10 | matematicas 10 (100.0%) | 60 | admisión | 0 |

Nota: el «Formato» es el mismo conjunto de áreas con el mismo nº de preguntas por área (la duración puede variar dentro de un formato y se lista aparte).

### Ponderación de `facultades.json` vs. formatos reales

Config actual: áreas ["matematicas","lenguaje","historia"]; ponderación {"matematicas":0.34,"lenguaje":0.33,"historia":0.33}; 100 preguntas; 180 min.

| Formato | Áreas reales | Coincide con config? | Diferencias (real % vs config %) |
|---|---|---|---|
| Formato 1 | lenguaje, matematicas | no: áreas distintas, preguntas no (14 vs 100) | lenguaje: 28.6% vs 33%; matematicas: 71.4% vs 34%; historia: 0.0% vs 33% |
| Formato 2 | lenguaje, matematicas | no: áreas distintas, preguntas no (13 vs 100) | lenguaje: 30.8% vs 33%; matematicas: 69.2% vs 34%; historia: 0.0% vs 33% |
| Formato 3 | lenguaje, matematicas | no: áreas distintas, preguntas no (13 vs 100) | lenguaje: 23.1% vs 33%; matematicas: 76.9% vs 34%; historia: 0.0% vs 33% |
| Formato 4 | historia, lenguaje, matematicas | no: áreas ok, preguntas no (24 vs 100) | historia: 41.7% vs 33%; lenguaje: 16.7% vs 33%; matematicas: 41.7% vs 34% |
| Formato 5 | historia, lenguaje, matematicas | no: áreas ok, preguntas no (22 vs 100) | historia: 36.4% vs 33%; lenguaje: 18.2% vs 33%; matematicas: 45.5% vs 34% |
| Formato 6 | historia, lenguaje, matematicas | no: áreas ok, preguntas no (23 vs 100) | historia: 39.1% vs 33%; lenguaje: 17.4% vs 33%; matematicas: 43.5% vs 34% |
| Formato 7 | matematicas | no: áreas distintas, preguntas no (10 vs 100) | matematicas: 100.0% vs 34%; lenguaje: 0.0% vs 33%; historia: 0.0% vs 33% |

Ponderación de config como % (suma 100%).

## Ingeniería (FCyT) (`ingenieria`)

### Exámenes por gestión

| Archivo | Año | Tipo | Convocatoria | Dur. (min) | Nº preguntas (transcriptas / frontmatter) | Faltantes | Áreas (nº preguntas) | Verificado |
|---|---|---|---|---|---|---|---|---|
| 2005-1op-1-2005.md | 2005 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 9, quimica 5, fisica 5, geometria_trigonometria 1 | si (parcial, nivel contra-facsimil) |
| 2005-1op-2-2005.md | 2005 | admisión | 1op-2 | 120 | 19 / 20 | 1 | aritmetica_algebra 6, fisica 5, geometria_trigonometria 4, quimica 4 | si (parcial, nivel contra-facsimil) |
| 2005-2op-1-2005.md | 2005 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 8, quimica 5, fisica 5, geometria_trigonometria 2 | si (completo) |
| 2005-2op-2-2005.md | 2005 | admisión | 2op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (completo) |
| 2006-1op-1-2006.md | 2006 | admisión | 1op-1 | 120 | 20 / 20 | 0 | geometria_trigonometria 5, fisica 4, quimica 4, biologia 4, aritmetica_algebra 3 | si (parcial, nivel contra-facsimil) |
| 2006-2op-1-2006.md | 2006 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 6, fisica 4, quimica 4, biologia 4, geometria_trigonometria 2 | si (completo) |
| 2006-parcial1-1-2006.md | 2006 | parcial/final de curso | parcial1-1 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | si (completo) |
| 2006-parcial1-2-2006.md | 2006 | parcial/final de curso | parcial1-2 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | si (completo) |
| 2006-parcial2-1-2006.md | 2006 | parcial/final de curso | parcial2-1 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2006-parcial2-2-2006.md | 2006 | parcial/final de curso | parcial2-2 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2006-parcial3-1-2006.md | 2006 | parcial/final de curso | parcial3-1 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2006-parcial3-2-2006.md | 2006 | parcial/final de curso | parcial3-2 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2006-parcial4-1-2006.md | 2006 | parcial/final de curso | parcial4-1 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2006-parcial4-2-2006.md | 2006 | parcial/final de curso | parcial4-2 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2006-unica-2-2006.md | 2006 | admisión | unica-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, quimica 4, fisica 4, biologia 4 | no |
| 2007-1op-1-2007.md | 2007 | admisión | 1op-1 | 120 | 20 / 20 | 0 | geometria_trigonometria 4, aritmetica_algebra 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2007-2op-1-2007.md | 2007 | admisión | 2op-1 | 120 | 20 / 20 | 0 | geometria_trigonometria 4, aritmetica_algebra 4, fisica 4, quimica 4, biologia 4 | no |
| 2007-parcial1-1-2007.md | 2007 | parcial/final de curso | parcial1-1 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2007-parcial1-2-2007.md | 2007 | parcial/final de curso | parcial1-2 | 150 | 42 / 42 | 0 | biologia 16, quimica 8, fisica 8, aritmetica_algebra 5, geometria_trigonometria 5 | no |
| 2007-parcial2-1-2007.md | 2007 | parcial/final de curso | parcial2-1 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2007-parcial2-2-2007.md | 2007 | parcial/final de curso | parcial2-2 | 150 | 36 / 36 | 0 | biologia 16, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2007-parcial3-1-2007.md | 2007 | parcial/final de curso | parcial3-1 | 150 | 38 / 38 | 0 | biologia 10, aritmetica_algebra 7, geometria_trigonometria 7, quimica 7, fisica 7 | no |
| 2007-parcial3-2-2007.md | 2007 | parcial/final de curso | parcial3-2 | 150 | 36 / 36 | 0 | biologia 16, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2007-unica-2-2007.md | 2007 | admisión | unica-2 | 120 | 20 / 20 | 0 | geometria_trigonometria 5, fisica 4, quimica 4, biologia 4, aritmetica_algebra 3 | no |
| 2008-1op-1-2008.md | 2008 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 5, fisica 4, quimica 4, biologia 4, geometria_trigonometria 3 | si (completo) |
| 2008-2curso-parcial1-2-2008.md | 2008 | parcial/final de curso | 2curso-parcial1-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2008-2curso-parcial2-2-2008.md | 2008 | parcial/final de curso | 2curso-parcial2-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2008-2curso-parcial3-2-2008.md | 2008 | parcial/final de curso | 2curso-parcial3-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2008-2op-1-2008.md | 2008 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 6, fisica 4, quimica 4, biologia 4, geometria_trigonometria 2 | no |
| 2008-parcial1-1-2008.md | 2008 | parcial/final de curso | parcial1-1 | 150 | 42 / 42 | 0 | biologia 20, quimica 7, aritmetica_algebra 5, geometria_trigonometria 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2008-parcial1-2-2008.md | 2008 | parcial/final de curso | parcial1-2 | 150 | 42 / 42 | 0 | biologia 20, quimica 7, aritmetica_algebra 5, geometria_trigonometria 5, fisica 5 | no |
| 2008-parcial2-1-2008.md | 2008 | parcial/final de curso | parcial2-1 | 150 | 42 / 42 | 0 | biologia 20, quimica 7, aritmetica_algebra 5, geometria_trigonometria 5, fisica 5 | no |
| 2008-parcial2-2-2008.md | 2008 | parcial/final de curso | parcial2-2 | 150 | 42 / 42 | 0 | biologia 20, quimica 7, aritmetica_algebra 5, geometria_trigonometria 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2008-parcial3-1-2008.md | 2008 | parcial/final de curso | parcial3-1 | 150 | 42 / 42 | 0 | biologia 20, quimica 7, aritmetica_algebra 5, geometria_trigonometria 5, fisica 5 | no |
| 2008-parcial3-2-2008.md | 2008 | parcial/final de curso | parcial3-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2008-unica-2-2008.md | 2008 | admisión | unica-2 | 120 | 20 / 20 | 0 | geometria_trigonometria 4, aritmetica_algebra 4, fisica 4, quimica 4, biologia 4 | no |
| 2009-1op-1-2009.md | 2009 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2009-2curso-parcial1-2-2009.md | 2009 | parcial/final de curso | 2curso-parcial1-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2009-2curso-parcial2-2-2009.md | 2009 | parcial/final de curso | 2curso-parcial2-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2009-2op-1-2009.md | 2009 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 5, fisica 4, quimica 4, biologia 4, geometria_trigonometria 3 | no |
| 2009-parcial1-1-2009.md | 2009 | parcial/final de curso | parcial1-1 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2009-parcial1-2-2009.md | 2009 | parcial/final de curso | parcial1-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2009-parcial2-1-2009.md | 2009 | parcial/final de curso | parcial2-1 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2009-parcial2-2-2009.md | 2009 | parcial/final de curso | parcial2-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2009-parcial3-1-2009.md | 2009 | parcial/final de curso | parcial3-1 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2009-parcial3-2-2009.md | 2009 | parcial/final de curso | parcial3-2 | 150 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2009-unica-2-2009.md | 2009 | admisión | unica-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 5, fisica 4, quimica 4, biologia 4, geometria_trigonometria 3 | si (parcial, nivel contra-facsimil) |
| 2010-1op-1-2010.md | 2010 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2010-2curso-final-2-2010.md | 2010 | parcial/final de curso | 2curso-final-2 | 150 | 34 / 34 | 0 | biologia 10, aritmetica_algebra 6, geometria_trigonometria 6, quimica 6, fisica 6 | si (parcial, nivel contra-facsimil) |
| 2010-2curso-parcial1-2-2010.md | 2010 | parcial/final de curso | 2curso-parcial1-2 | 150 | 29 / 29 | 0 | biologia 10, geometria_trigonometria 5, quimica 5, fisica 5, aritmetica_algebra 4 | no |
| 2010-2curso-parcial2-2-2010.md | 2010 | parcial/final de curso | 2curso-parcial2-2 | 150 | 25 / 25 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5, biologia 5 | no |
| 2010-2op-1-2010.md | 2010 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2010-final-2-2010.md | 2010 | parcial/final de curso | final-2 | 150 | 34 / 34 | 0 | biologia 10, aritmetica_algebra 6, geometria_trigonometria 6, quimica 6, fisica 6 | no |
| 2010-parcial1-1-2010.md | 2010 | parcial/final de curso | parcial1-1 | 150 | 25 / 25 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5, biologia 5 | si (parcial, nivel contra-facsimil) |
| 2010-parcial1-2-2010.md | 2010 | parcial/final de curso | parcial1-2 | 150 | 25 / 25 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5, biologia 5 | si (parcial, nivel contra-facsimil) |
| 2010-parcial2-1-2010.md | 2010 | parcial/final de curso | parcial2-1 | 150 | 25 / 25 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5, biologia 5 | no |
| 2010-parcial2-2-2010.md | 2010 | parcial/final de curso | parcial2-2 | 150 | 25 / 25 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5, biologia 5 | no |
| 2010-parcial3-1-2010.md | 2010 | parcial/final de curso | parcial3-1 | 150 | 25 / 25 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5, biologia 5 | no |
| 2010-unica-2-2010.md | 2010 | admisión | unica-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 5, fisica 4, quimica 4, biologia 4, geometria_trigonometria 3 | no |
| 2011-1op-1-2011.md | 2011 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 5, fisica 4, quimica 4, biologia 4, geometria_trigonometria 3 | si (completo) |
| 2011-2op-1-2011.md | 2011 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 6, fisica 4, quimica 4, biologia 4, geometria_trigonometria 2 | no |
| 2011-final-1-2011.md | 2011 | parcial/final de curso | final-1 | 150 | 34 / 34 | 0 | biologia 10, aritmetica_algebra 6, geometria_trigonometria 6, quimica 6, fisica 6 | no |
| 2011-final-2-2011.md | 2011 | parcial/final de curso | final-2 | 130 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2011-parcial1-1-2011.md | 2011 | parcial/final de curso | parcial1-1 | 150 | 34 / 34 | 0 | biologia 10, aritmetica_algebra 6, geometria_trigonometria 6, quimica 6, fisica 6 | no |
| 2011-parcial1-2-2011.md | 2011 | parcial/final de curso | parcial1-2 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2011-parcial2-1-2011.md | 2011 | parcial/final de curso | parcial2-1 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2011-parcial2-2-2011.md | 2011 | parcial/final de curso | parcial2-2 | 130 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2011-unica-2-2011.md | 2011 | admisión | unica-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 5, fisica 4, quimica 4, biologia 4, geometria_trigonometria 3 | no |
| 2012-1op-1-2012.md | 2012 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2012-2op-1-2012.md | 2012 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2013-final-2-2013.md | 2013 | parcial/final de curso | final-2 | 130 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2013-parcial1-1-2013.md | 2013 | parcial/final de curso | parcial1-1 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2013-parcial1-2-2013.md | 2013 | parcial/final de curso | parcial1-2 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2013-parcial2-1-2013.md | 2013 | parcial/final de curso | parcial2-1 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2013-parcial2-2-2013.md | 2013 | parcial/final de curso | parcial2-2 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2013-unica-2-2013.md | 2013 | admisión | unica-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2014-1op-1-2014.md | 2014 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2014-2op-1-2014.md | 2014 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2014-final-1-2014.md | 2014 | parcial/final de curso | final-1 | 130 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2014-final-2-2014.md | 2014 | parcial/final de curso | final-2 | 130 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2014-parcial1-1-2014.md | 2014 | parcial/final de curso | parcial1-1 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2014-parcial1-2-2014.md | 2014 | parcial/final de curso | parcial1-2 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2014-parcial2-1-2014.md | 2014 | parcial/final de curso | parcial2-1 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2014-parcial2-2-2014.md | 2014 | parcial/final de curso | parcial2-2 | 120 | 30 / 30 | 0 | biologia 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2014-unica-2-2014.md | 2014 | admisión | unica-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2015-1op-1-2015.md | 2015 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2015-1op-2-2015.md | 2015 | admisión | 1op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2015-2op-1-2015.md | 2015 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2015-2op-2-2015.md | 2015 | admisión | 2op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2016-1op-1-2016.md | 2016 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2016-1op-2-2016.md | 2016 | admisión | 1op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2016-2op-1-2016.md | 2016 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2016-2op-2-2016.md | 2016 | admisión | 2op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2016-3op-1-2016.md | 2016 | admisión | 3op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2017-1op-1-2017.md | 2017 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2017-1op-2-2017.md | 2017 | admisión | 1op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2017-2op-1-2017.md | 2017 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2017-2op-2-2017.md | 2017 | admisión | 2op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2017-3op-1-2017.md | 2017 | admisión | 3op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2018-1op-1-2018.md | 2018 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2018-1op-2-2018.md | 2018 | admisión | 1op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2018-2op-1-2018.md | 2018 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2018-2op-2-2018.md | 2018 | admisión | 2op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2018-3op-1-2018.md | 2018 | admisión | 3op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2019-1op-1-2019.md | 2019 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2019-1op-2-2019.md | 2019 | admisión | 1op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2019-2op-1-2019.md | 2019 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2019-2op-2-2019.md | 2019 | admisión | 2op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2019-3op-1-2019.md | 2019 | admisión | 3op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2020-1op-1-2020.md | 2020 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2020-2op-1-2020.md | 2020 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | no |
| 2020-3op-1-2020.md | 2020 | admisión | 3op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2022-1op-2-2022.md | 2022 | admisión | 1op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2022-2op-2-2022.md | 2022 | admisión | 2op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2022-3op-2-2022.md | 2022 | admisión | 3op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2023-1op-1-2023.md | 2023 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2023-1op-2-2023.md | 2023 | admisión | 1op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2023-2op-1-2023.md | 2023 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2023-2op-2-2023.md | 2023 | admisión | 2op-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2023-3op-1-2023.md | 2023 | admisión | 3op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (completo) |
| 2024-1op-1-2024.md | 2024 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2024-2op-1-2024.md | 2024 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2024-3op-1-2024.md | 2024 | admisión | 3op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2024-Uop-2-2024.md | 2024 | admisión | Uop-2 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2024-final-1-2024.md | 2024 | parcial/final de curso | final-1 | 150 | 40 / 40 | 0 | biologia 10, estrategias_aprendizaje 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2024-final-2-2024.md | 2024 | parcial/final de curso | final-2 | 130 | 30 / 30 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5, biologia 5, estrategias_aprendizaje 5 | si (parcial, nivel contra-facsimil) |
| 2024-parcial1-1-2024.md | 2024 | parcial/final de curso | parcial1-1 | 150 | 40 / 40 | 0 | biologia 10, estrategias_aprendizaje 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2024-parcial1-2-2024.md | 2024 | parcial/final de curso | parcial1-2 | 140 | 38 / 38 | 0 | biologia 9, estrategias_aprendizaje 9, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2024-parcial2-1-2024.md | 2024 | parcial/final de curso | parcial2-1 | 150 | 40 / 40 | 0 | biologia 10, estrategias_aprendizaje 10, aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2024-parcial2-2-2024.md | 2024 | parcial/final de curso | parcial2-2 | 120 | 30 / 30 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5, biologia 5, estrategias_aprendizaje 5 | si (parcial, nivel contra-facsimil) |
| 2025-1op-1-2025.md | 2025 | admisión | 1op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2025-1op-2-2025.md | 2025 | admisión | 1op-2 | 120 | 15 / 15 | 0 | matematicas 5, fisica 5, quimica 5 | no |
| 2025-2op-1-2025.md | 2025 | admisión | 2op-1 | 120 | 20 / 20 | 0 | aritmetica_algebra 4, geometria_trigonometria 4, fisica 4, quimica 4, biologia 4 | si (parcial, nivel contra-facsimil) |
| 2025-2op-2-2025-version-b.md | 2025 | admisión | 2op-2-2025-version-b | 120 | 4 / 4 | 0 | biologia 3, matematicas 1 | no |
| 2025-2op-2-2025.md | 2025 | admisión | 2op-2 | 120 | 13 / 13 | 0 | matematicas 5, fisica 4, quimica 4 | no |
| 2025-3op-1-2025.md | 2025 | admisión | 3op-1 | 120 | 12 / 12 | 0 | fisica 4, biologia 4, quimica 3, matematicas 1 | si (parcial, nivel contra-facsimil) |
| 2025-final-1-2025.md | 2025 | parcial/final de curso | final-1 | 100 | 20 / 20 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |
| 2025-parcial1-1-2025.md | 2025 | parcial/final de curso | parcial1-1 | 100 | 20 / 20 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | no |
| 2025-parcial2-1-2025.md | 2025 | parcial/final de curso | parcial2-1 | 100 | 20 / 20 | 0 | aritmetica_algebra 5, geometria_trigonometria 5, quimica 5, fisica 5 | si (parcial, nivel contra-facsimil) |

### Formatos (agrupados por áreas y conteo)

| Formato | Exámenes | Gestiones | Nº preguntas | Áreas (nº y % real) | Duración (min) | Tipo | Verificados |
|---|---|---|---|---|---|---|---|
| Formato 1 | 1 | 2005 | 20 | aritmetica_algebra 9 (45.0%), quimica 5 (25.0%), fisica 5 (25.0%), geometria_trigonometria 1 (5.0%) | 120 | admisión | 1 |
| Formato 2 | 1 | 2005 | 19 | aritmetica_algebra 6 (31.6%), fisica 5 (26.3%), geometria_trigonometria 4 (21.1%), quimica 4 (21.1%) | 120 | admisión | 1 |
| Formato 3 | 1 | 2005 | 20 | aritmetica_algebra 8 (40.0%), quimica 5 (25.0%), fisica 5 (25.0%), geometria_trigonometria 2 (10.0%) | 120 | admisión | 1 |
| Formato 4 | 4 | 2005, 2025 | 20 | aritmetica_algebra 5 (25.0%), geometria_trigonometria 5 (25.0%), quimica 5 (25.0%), fisica 5 (25.0%) | 120/100 | admisión/parcial/final de curso | 3 |
| Formato 5 | 2 | 2006, 2007 | 20 | geometria_trigonometria 5 (25.0%), fisica 4 (20.0%), quimica 4 (20.0%), biologia 4 (20.0%), aritmetica_algebra 3 (15.0%) | 120 | admisión | 1 |
| Formato 6 | 3 | 2006, 2008, 2011 | 20 | aritmetica_algebra 6 (30.0%), fisica 4 (20.0%), quimica 4 (20.0%), biologia 4 (20.0%), geometria_trigonometria 2 (10.0%) | 120 | admisión | 1 |
| Formato 7 | 11 | 2006, 2007 | 38 | biologia 10 (26.3%), aritmetica_algebra 7 (18.4%), geometria_trigonometria 7 (18.4%), quimica 7 (18.4%), fisica 7 (18.4%) | 150 | parcial/final de curso | 2 |
| Formato 8 | 54 | 2006–2025 | 20 | aritmetica_algebra 4 (20.0%), geometria_trigonometria 4 (20.0%), quimica 4 (20.0%), fisica 4 (20.0%), biologia 4 (20.0%) | 120 | admisión | 42 |
| Formato 9 | 1 | 2007 | 42 | biologia 16 (38.1%), quimica 8 (19.0%), fisica 8 (19.0%), aritmetica_algebra 5 (11.9%), geometria_trigonometria 5 (11.9%) | 150 | parcial/final de curso | 0 |
| Formato 10 | 2 | 2007 | 36 | biologia 16 (44.4%), aritmetica_algebra 5 (13.9%), geometria_trigonometria 5 (13.9%), quimica 5 (13.9%), fisica 5 (13.9%) | 150 | parcial/final de curso | 0 |
| Formato 11 | 6 | 2008, 2009, 2010, 2011 | 20 | aritmetica_algebra 5 (25.0%), fisica 4 (20.0%), quimica 4 (20.0%), biologia 4 (20.0%), geometria_trigonometria 3 (15.0%) | 120 | admisión | 3 |
| Formato 12 | 27 | 2008–2014 | 30 | biologia 10 (33.3%), aritmetica_algebra 5 (16.7%), geometria_trigonometria 5 (16.7%), quimica 5 (16.7%), fisica 5 (16.7%) | 150/130/120 | parcial/final de curso | 7 |
| Formato 13 | 5 | 2008 | 42 | biologia 20 (47.6%), quimica 7 (16.7%), aritmetica_algebra 5 (11.9%), geometria_trigonometria 5 (11.9%), fisica 5 (11.9%) | 150 | parcial/final de curso | 2 |
| Formato 14 | 4 | 2010, 2011 | 34 | biologia 10 (29.4%), aritmetica_algebra 6 (17.6%), geometria_trigonometria 6 (17.6%), quimica 6 (17.6%), fisica 6 (17.6%) | 150 | parcial/final de curso | 1 |
| Formato 15 | 1 | 2010 | 29 | biologia 10 (34.5%), geometria_trigonometria 5 (17.2%), quimica 5 (17.2%), fisica 5 (17.2%), aritmetica_algebra 4 (13.8%) | 150 | parcial/final de curso | 0 |
| Formato 16 | 6 | 2010 | 25 | aritmetica_algebra 5 (20.0%), geometria_trigonometria 5 (20.0%), quimica 5 (20.0%), fisica 5 (20.0%), biologia 5 (20.0%) | 150 | parcial/final de curso | 2 |
| Formato 17 | 3 | 2024 | 40 | biologia 10 (25.0%), estrategias_aprendizaje 10 (25.0%), aritmetica_algebra 5 (12.5%), geometria_trigonometria 5 (12.5%), quimica 5 (12.5%), fisica 5 (12.5%) | 150 | parcial/final de curso | 3 |
| Formato 18 | 2 | 2024 | 30 | aritmetica_algebra 5 (16.7%), geometria_trigonometria 5 (16.7%), quimica 5 (16.7%), fisica 5 (16.7%), biologia 5 (16.7%), estrategias_aprendizaje 5 (16.7%) | 130/120 | parcial/final de curso | 2 |
| Formato 19 | 1 | 2024 | 38 | biologia 9 (23.7%), estrategias_aprendizaje 9 (23.7%), aritmetica_algebra 5 (13.2%), geometria_trigonometria 5 (13.2%), quimica 5 (13.2%), fisica 5 (13.2%) | 140 | parcial/final de curso | 1 |
| Formato 20 | 1 | 2025 | 15 | matematicas 5 (33.3%), fisica 5 (33.3%), quimica 5 (33.3%) | 120 | admisión | 0 |
| Formato 21 | 1 | 2025 | 4 | biologia 3 (75.0%), matematicas 1 (25.0%) | 120 | admisión | 0 |
| Formato 22 | 1 | 2025 | 13 | matematicas 5 (38.5%), fisica 4 (30.8%), quimica 4 (30.8%) | 120 | admisión | 0 |
| Formato 23 | 1 | 2025 | 12 | fisica 4 (33.3%), biologia 4 (33.3%), quimica 3 (25.0%), matematicas 1 (8.3%) | 120 | admisión | 1 |

Nota: el «Formato» es el mismo conjunto de áreas con el mismo nº de preguntas por área (la duración puede variar dentro de un formato y se lista aparte).

### Ponderación de `facultades.json` vs. formatos reales

Config actual: áreas ["aritmetica_algebra","geometria_trigonometria","fisica","quimica","biologia"]; ponderación {"aritmetica_algebra":0.2,"geometria_trigonometria":0.2,"fisica":0.2,"quimica":0.2,"biologia":0.2}; 20 preguntas; 120 min.

| Formato | Áreas reales | Coincide con config? | Diferencias (real % vs config %) |
|---|---|---|---|
| Formato 1 | aritmetica_algebra, fisica, geometria_trigonometria, quimica | no: áreas distintas, preguntas sí | aritmetica_algebra: 45.0% vs 20%; fisica: 25.0% vs 20%; geometria_trigonometria: 5.0% vs 20%; quimica: 25.0% vs 20%; biologia: 0.0% vs 20% |
| Formato 2 | aritmetica_algebra, fisica, geometria_trigonometria, quimica | no: áreas distintas, preguntas no (19 vs 20) | aritmetica_algebra: 31.6% vs 20%; fisica: 26.3% vs 20%; geometria_trigonometria: 21.1% vs 20%; quimica: 21.1% vs 20%; biologia: 0.0% vs 20% |
| Formato 3 | aritmetica_algebra, fisica, geometria_trigonometria, quimica | no: áreas distintas, preguntas sí | aritmetica_algebra: 40.0% vs 20%; fisica: 25.0% vs 20%; geometria_trigonometria: 10.0% vs 20%; quimica: 25.0% vs 20%; biologia: 0.0% vs 20% |
| Formato 4 | aritmetica_algebra, fisica, geometria_trigonometria, quimica | no: áreas distintas, preguntas sí | aritmetica_algebra: 25.0% vs 20%; fisica: 25.0% vs 20%; geometria_trigonometria: 25.0% vs 20%; quimica: 25.0% vs 20%; biologia: 0.0% vs 20% |
| Formato 5 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | sí | aritmetica_algebra: 15.0% vs 20%; biologia: 20.0% vs 20%; fisica: 20.0% vs 20%; geometria_trigonometria: 25.0% vs 20%; quimica: 20.0% vs 20% |
| Formato 6 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | sí | aritmetica_algebra: 30.0% vs 20%; biologia: 20.0% vs 20%; fisica: 20.0% vs 20%; geometria_trigonometria: 10.0% vs 20%; quimica: 20.0% vs 20% |
| Formato 7 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | no: áreas ok, preguntas no (38 vs 20) | aritmetica_algebra: 18.4% vs 20%; biologia: 26.3% vs 20%; fisica: 18.4% vs 20%; geometria_trigonometria: 18.4% vs 20%; quimica: 18.4% vs 20% |
| Formato 8 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | sí | aritmetica_algebra: 20.0% vs 20%; biologia: 20.0% vs 20%; fisica: 20.0% vs 20%; geometria_trigonometria: 20.0% vs 20%; quimica: 20.0% vs 20% |
| Formato 9 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | no: áreas ok, preguntas no (42 vs 20) | aritmetica_algebra: 11.9% vs 20%; biologia: 38.1% vs 20%; fisica: 19.0% vs 20%; geometria_trigonometria: 11.9% vs 20%; quimica: 19.0% vs 20% |
| Formato 10 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | no: áreas ok, preguntas no (36 vs 20) | aritmetica_algebra: 13.9% vs 20%; biologia: 44.4% vs 20%; fisica: 13.9% vs 20%; geometria_trigonometria: 13.9% vs 20%; quimica: 13.9% vs 20% |
| Formato 11 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | sí | aritmetica_algebra: 25.0% vs 20%; biologia: 20.0% vs 20%; fisica: 20.0% vs 20%; geometria_trigonometria: 15.0% vs 20%; quimica: 20.0% vs 20% |
| Formato 12 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | no: áreas ok, preguntas no (30 vs 20) | aritmetica_algebra: 16.7% vs 20%; biologia: 33.3% vs 20%; fisica: 16.7% vs 20%; geometria_trigonometria: 16.7% vs 20%; quimica: 16.7% vs 20% |
| Formato 13 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | no: áreas ok, preguntas no (42 vs 20) | aritmetica_algebra: 11.9% vs 20%; biologia: 47.6% vs 20%; fisica: 11.9% vs 20%; geometria_trigonometria: 11.9% vs 20%; quimica: 16.7% vs 20% |
| Formato 14 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | no: áreas ok, preguntas no (34 vs 20) | aritmetica_algebra: 17.6% vs 20%; biologia: 29.4% vs 20%; fisica: 17.6% vs 20%; geometria_trigonometria: 17.6% vs 20%; quimica: 17.6% vs 20% |
| Formato 15 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | no: áreas ok, preguntas no (29 vs 20) | aritmetica_algebra: 13.8% vs 20%; biologia: 34.5% vs 20%; fisica: 17.2% vs 20%; geometria_trigonometria: 17.2% vs 20%; quimica: 17.2% vs 20% |
| Formato 16 | aritmetica_algebra, biologia, fisica, geometria_trigonometria, quimica | no: áreas ok, preguntas no (25 vs 20) | aritmetica_algebra: 20.0% vs 20%; biologia: 20.0% vs 20%; fisica: 20.0% vs 20%; geometria_trigonometria: 20.0% vs 20%; quimica: 20.0% vs 20% |
| Formato 17 | aritmetica_algebra, biologia, estrategias_aprendizaje, fisica, geometria_trigonometria, quimica | no: áreas distintas, preguntas no (40 vs 20) | aritmetica_algebra: 12.5% vs 20%; biologia: 25.0% vs 20%; estrategias_aprendizaje: 25.0% vs 0%; fisica: 12.5% vs 20%; geometria_trigonometria: 12.5% vs 20%; quimica: 12.5% vs 20% |
| Formato 18 | aritmetica_algebra, biologia, estrategias_aprendizaje, fisica, geometria_trigonometria, quimica | no: áreas distintas, preguntas no (30 vs 20) | aritmetica_algebra: 16.7% vs 20%; biologia: 16.7% vs 20%; estrategias_aprendizaje: 16.7% vs 0%; fisica: 16.7% vs 20%; geometria_trigonometria: 16.7% vs 20%; quimica: 16.7% vs 20% |
| Formato 19 | aritmetica_algebra, biologia, estrategias_aprendizaje, fisica, geometria_trigonometria, quimica | no: áreas distintas, preguntas no (38 vs 20) | aritmetica_algebra: 13.2% vs 20%; biologia: 23.7% vs 20%; estrategias_aprendizaje: 23.7% vs 0%; fisica: 13.2% vs 20%; geometria_trigonometria: 13.2% vs 20%; quimica: 13.2% vs 20% |
| Formato 20 | fisica, matematicas, quimica | no: áreas distintas, preguntas no (15 vs 20) | fisica: 33.3% vs 20%; matematicas: 33.3% vs 0%; quimica: 33.3% vs 20%; aritmetica_algebra: 0.0% vs 20%; geometria_trigonometria: 0.0% vs 20%; biologia: 0.0% vs 20% |
| Formato 21 | biologia, matematicas | no: áreas distintas, preguntas no (4 vs 20) | biologia: 75.0% vs 20%; matematicas: 25.0% vs 0%; aritmetica_algebra: 0.0% vs 20%; geometria_trigonometria: 0.0% vs 20%; fisica: 0.0% vs 20%; quimica: 0.0% vs 20% |
| Formato 22 | fisica, matematicas, quimica | no: áreas distintas, preguntas no (13 vs 20) | fisica: 30.8% vs 20%; matematicas: 38.5% vs 0%; quimica: 30.8% vs 20%; aritmetica_algebra: 0.0% vs 20%; geometria_trigonometria: 0.0% vs 20%; biologia: 0.0% vs 20% |
| Formato 23 | biologia, fisica, matematicas, quimica | no: áreas distintas, preguntas no (12 vs 20) | biologia: 33.3% vs 20%; fisica: 33.3% vs 20%; matematicas: 8.3% vs 0%; quimica: 25.0% vs 20%; aritmetica_algebra: 0.0% vs 20%; geometria_trigonometria: 0.0% vs 20% |

Ponderación de config como % (suma 100%).

## Medicina (`medicina`)

### Exámenes por gestión

| Archivo | Año | Tipo | Convocatoria | Dur. (min) | Nº preguntas (transcriptas / frontmatter) | Faltantes | Áreas (nº preguntas) | Verificado |
|---|---|---|---|---|---|---|---|---|
| 2023-examen-final-curso-basico-2023-2024.md | 2023 | parcial/final de curso | examen-final-curso-basico-2023 | 90 | 99 / 100 | 1 | morfofuncion 50, biologia_celular 49 | no |
| 2023-primer-parcial-curso-basico-2023-2024.md | 2023 | parcial/final de curso | primer-parcial-curso-basico-2023 | 90 | 97 / 100 | 3 | biologia_celular 50, morfofuncion 47 | no |
| 2023-segundo-parcial-curso-basico-2023-2024.md | 2023 | parcial/final de curso | segundo-parcial-curso-basico-2023 | 90 | 98 / 100 | 2 | morfofuncion 49, biologia_celular 49 | no |
| 2025-primer-parcial-curso-basico-2024-2025.md | 2025 | parcial/final de curso | primer-parcial-curso-basico-2024 | 90 | 99 / 100 | 1 | biologia_celular 50, morfofuncion 49 | no |
| 2025-segundo-parcial-curso-basico-2024-2025.md | 2025 | parcial/final de curso | segundo-parcial-curso-basico-2024 | 90 | 98 / 100 | 2 | morfofuncion 49, biologia_celular 49 | no |

### Formatos (agrupados por áreas y conteo)

| Formato | Exámenes | Gestiones | Nº preguntas | Áreas (nº y % real) | Duración (min) | Tipo | Verificados |
|---|---|---|---|---|---|---|---|
| Formato 1 | 1 | 2023 | 99 | morfofuncion 50 (50.5%), biologia_celular 49 (49.5%) | 90 | parcial/final de curso | 0 |
| Formato 2 | 1 | 2023 | 97 | biologia_celular 50 (51.5%), morfofuncion 47 (48.5%) | 90 | parcial/final de curso | 0 |
| Formato 3 | 2 | 2023, 2025 | 98 | morfofuncion 49 (50.0%), biologia_celular 49 (50.0%) | 90 | parcial/final de curso | 0 |
| Formato 4 | 1 | 2025 | 99 | biologia_celular 50 (50.5%), morfofuncion 49 (49.5%) | 90 | parcial/final de curso | 0 |

Nota: el «Formato» es el mismo conjunto de áreas con el mismo nº de preguntas por área (la duración puede variar dentro de un formato y se lista aparte).

### Ponderación de `facultades.json` vs. formatos reales

Config actual: áreas ["morfofuncion","biologia_celular","investigacion","quimica","fisica","matematicas","comprension_lectora"]; ponderación {"morfofuncion":0.2,"biologia_celular":0.2,"investigacion":0.15,"quimica":0.15,"fisica":0.1,"matematicas":0.1,"comprension_lectora":0.1}; 100 preguntas; 120 min.

| Formato | Áreas reales | Coincide con config? | Diferencias (real % vs config %) |
|---|---|---|---|
| Formato 1 | biologia_celular, morfofuncion | no: áreas distintas, preguntas no (99 vs 100) | biologia_celular: 49.5% vs 20%; morfofuncion: 50.5% vs 20%; investigacion: 0.0% vs 15%; quimica: 0.0% vs 15%; fisica: 0.0% vs 10%; matematicas: 0.0% vs 10%; comprension_lectora: 0.0% vs 10% |
| Formato 2 | biologia_celular, morfofuncion | no: áreas distintas, preguntas no (97 vs 100) | biologia_celular: 51.5% vs 20%; morfofuncion: 48.5% vs 20%; investigacion: 0.0% vs 15%; quimica: 0.0% vs 15%; fisica: 0.0% vs 10%; matematicas: 0.0% vs 10%; comprension_lectora: 0.0% vs 10% |
| Formato 3 | biologia_celular, morfofuncion | no: áreas distintas, preguntas no (98 vs 100) | biologia_celular: 50.0% vs 20%; morfofuncion: 50.0% vs 20%; investigacion: 0.0% vs 15%; quimica: 0.0% vs 15%; fisica: 0.0% vs 10%; matematicas: 0.0% vs 10%; comprension_lectora: 0.0% vs 10% |
| Formato 4 | biologia_celular, morfofuncion | no: áreas distintas, preguntas no (99 vs 100) | biologia_celular: 50.5% vs 20%; morfofuncion: 49.5% vs 20%; investigacion: 0.0% vs 15%; quimica: 0.0% vs 15%; fisica: 0.0% vs 10%; matematicas: 0.0% vs 10%; comprension_lectora: 0.0% vs 10% |

Ponderación de config como % (suma 100%).

## Derecho (`derecho`)

No hay archivos `.md` en `data/examenes/umss/derecho/`. Sin datos para inventariar.

## Cierre: qué se rompe hoy en simulacro y practicar

Cada examen real trae su propio formato; la configuración de `facultades.json` usa uno solo por facultad. Lo que choca:

1. **Áreas y pesos de la config no se usan en los modos con banco.** Solo `ia_generado` pasa `areas` y `ponderacion` a la IA (`src/lib/axiom/simulador-builder.ts:38-39`). Los modos con banco no balancean por área: `mixto` solo filtra por un área si el alumno la elige (`simulador-builder.ts:117-120`).
2. **La nota ponderada sale del examen, no de la facultad.** Todos los `.md` traen su propia `ponderacion` (139 de 139 en ingeniería, 10 de 10 en economicas, 5 de 5 en medicina). En `examen_real` se usa esa (`simulador-builder.ts:259-268`), y se aparta de la config: ingeniería 2005-2da declara aritmetica_algebra 0.40 y geometria 0.10, la config pone 0.20 cada una; ingeniería 2024 declara 6 áreas. Si no hay ponderación, la nota es % de correctas simple. `facultades.json` no entra en la nota.
3. **La duración de la config casi no entra.** `duracion_minutos` de la facultad no aparece en el builder: en `examen_real` se toma la del examen (`simulador-builder.ts:183-186`) y en los demás modos sale `max(15, preguntas × 2)`; solo se muestra como texto en `src/app/practicar/page.tsx:190-191`. Los parciales de curso duran 130-150 min y la config dice 120 (ingeniería) o 180 (economicas), y el alumno ve el texto de la config.
4. **La cantidad de preguntas del modo libre es la de la config.** `cantidadFormato` sale de `preguntas_examen` (`simulador-builder.ts:68`) y se usa en `mixto` y `predictivo` (`simulador-builder.ts:137`, `:165`). Como el pool junta admisión y parciales de curso sin distinguir formato, un simulacro «de 20» puede salir con preguntas de exámenes de 40 o de otra área.
5. **Medicina: la config describe un examen que no está en el banco.** `facultades.json` (7 áreas: morfofuncion, biologia_celular, investigacion, quimica, fisica, matematicas, comprension_lectora, 100 preguntas) no coincide con los 5 exámenes cargados, que son parciales de curso básico con solo 2 áreas (morfofuncion y biologia_celular, 98-99 preguntas, 90 min). Economicas tiene el mismo problema: su config tiene 100 preguntas y las gestiones reales tienen 9 a 24.
