# Mapa de temas del banco

> Generado por `scripts/analisis/mapa-de-temas.py` (datos de `scripts/analisis/extraer-banco.mjs`, que usa el parser real del banco). Para regenerar: ver el encabezado del script. No modifica el banco ni las lecciones.

## Resumen

1. El banco tiene **3848 preguntas** en 150 exámenes: Ingeniería 3569, Económicas 181, Medicina 98. Medicina tiene un solo examen y todavía no sirve para medir temas.

2. Las etiquetas `tema` casi no se repiten (2415 de 2829 en Ingeniería se usan una sola vez), así que el conteo crudo no sirve. Las agrupé en familias con reglas de palabras: es una aproximación.

3. En Ingeniería, de 3420 preguntas en familias de 15 o más: **2218 (64.9%) tienen lección o lámina y el alumno las ve**, 827 (24.2%) tienen lección pero oculta, 270 (7.9%) están a medias y 105 (3.1%) sin nada. Aritmética-Álgebra es la mejor cubierta.

4. **Biología es la materia más grande de Ingeniería (924 preguntas, 25.9%) y sus 7 lecciones existen pero no están en el catálogo**: el alumno no las ve (son las 827 preguntas del punto anterior). Es el arreglo más barato con más efecto.

5. En Económicas, **Historia** (47 preguntas cargadas) no tiene ninguna lección y Lenguaje tiene cobertura parcial. Ojo: 9 de los 10 exámenes tienen secciones pendientes, así que esos conteos son una muestra.

## Los 15 temas que más caen

**Ingeniería.** Porcentaje sobre todas las preguntas de Ingeniería; cómo se decide el estado, en la sección 3.

| # | Tema (familia) | Materia | Preguntas | % de Ingeniería | Estado | Qué hay |
|---|---|---|---|---|---|---|
| 1 | Cinemática 1D (MRU, MRUV, caída libre, encuentro) | Física | 172 | 4.8% | Cubierto | lección: cinematica-1d |
| 2 | Estequiometría, reactivo limitante y rendimiento | Química | 168 | 4.7% | Cubierto | lección: estequiometria, reacciones-balanceo |
| 3 | Clasificación, taxonomía y reinos | Biología | 163 | 4.6% | Cubierto (oculto) | lección: diversidad-seres-vivos |
| 4 | Ecología (ecosistema, cadenas tróficas, biomas) | Biología | 149 | 4.2% | Cubierto (oculto) | lección: ecologia-medioambiente |
| 5 | Genética mendeliana y herencia | Biología | 133 | 3.7% | Cubierto (oculto) | lección: genetica-mendeliana |
| 6 | Circunferencia: ángulos, tangentes, cuerdas | Geometría-Trigonometría | 128 | 3.6% | Cubierto | lección: circunferencia |
| 7 | Dinámica: Newton, poleas y fricción | Física | 122 | 3.4% | Cubierto | lección: dinamica-newton |
| 8 | Biomoléculas (proteínas, lípidos, carbohidratos, agua) | Biología | 121 | 3.4% | Cubierto (oculto) | lección: bases-moleculares-vida, componentes-materia-viva |
| 9 | Tiro parabólico y proyectiles | Física | 115 | 3.2% | Cubierto | lección: cinematica-2d |
| 10 | Soluciones, concentraciones y titulación | Química | 92 | 2.6% | A medias | lección: soluciones (la lección no menciona: normalidad, titulación) |
| 11 | Polígonos y cuadriláteros | Geometría-Trigonometría | 87 | 2.4% | Cubierto | lección: poligonos-cuadrilateros |
| 12 | Triángulos (líneas notables, semejanza) | Geometría-Trigonometría | 86 | 2.4% | Cubierto | lección: triangulos, congruencia-semejanza |
| 13 | Identidades trigonométricas | Geometría-Trigonometría | 86 | 2.4% | Cubierto | lección: identidades-trigonometricas |
| 14 | Gases ideales y leyes de los gases | Química | 84 | 2.4% | Cubierto | lección: gases-ideales |
| 15 | Logaritmos | Aritmética-Álgebra | 75 | 2.1% | Cubierto | 8 lámina(s); lección: logaritmacion |

**Económicas** (muestra parcial, ver advertencia en la sección 1):

| # | Tema (familia) | Materia | Preguntas | % de Económicas | Estado | Qué hay |
|---|---|---|---|---|---|---|
| 1 | Historia de Bolivia | Historia | 25 | 13.8% | Hueco | ninguna |
| 2 | Historia universal | Historia | 22 | 12.2% | Hueco | ninguna |
| 3 | Problemas de móviles, edades y planteo | Matemáticas | 14 | 7.7% | A medias | lección: ecuaciones-primer-grado (la lección no menciona: planteo) |
| 4 | Oración, sintaxis y funciones | Lenguaje | 14 | 7.7% | A medias | lección: expresion-oracion (la lección no menciona: subordinad) |
| 5 | Operaciones, exponentes y aritmética básica | Matemáticas | 10 | 5.5% | Cubierto | lección: operaciones-fundamentales, potenciacion, teoria-exponentes |
| 6 | Sistemas de ecuaciones | Matemáticas | 10 | 5.5% | Cubierto | lección: sistemas-lineales |
| 7 | Semántica y definición | Lenguaje | 10 | 5.5% | A medias | lección: denotacion-connotacion, lexico-contextual (lección general, no dedicada al tema) |
| 8 | Funciones (dominio, gráfica, inversa) | Matemáticas | 9 | 5.0% | A medias | lección: funcion-lineal-cuadratica, dominio-rango (la lección no menciona: inversa) |
| 9 | Logaritmos | Matemáticas | 9 | 5.0% | Cubierto | lección: logaritmacion |
| 10 | Progresiones y sucesiones | Matemáticas | 8 | 4.4% | Cubierto | lección: sucesiones-series |
| 11 | Fracciones algebraicas y ecuaciones racionales | Matemáticas | 8 | 4.4% | A medias | lección: expresiones-algebraicas (lección general, no dedicada al tema) |
| 12 | Ecuaciones irracionales y radicales | Matemáticas | 8 | 4.4% | A medias | lección: radicacion, operaciones-radicales (lección general, no dedicada al tema) |
| 13 | Tiempos verbales y verbos | Lenguaje | 7 | 3.9% | Hueco | ninguna |
| 14 | Regla de tres, reparto y proporcionalidad | Matemáticas | 7 | 3.9% | Cubierto | lección: regla-de-tres, repartos-proporcionales, razones-proporciones |
| 15 | Ortografía y puntuación | Lenguaje | 4 | 2.2% | A medias | lección: expresion-oracion (la lección no menciona: ortograf, puntuaci) |

**Medicina**: no hay tabla. Un examen, 98 etiquetas distintas, ninguna repetida.

## 1. Frecuencia por facultad, materia y tema

Un "tema" acá es una **familia**: el banco tiene miles de etiquetas casi únicas (ver sección 2), así que las agrupé con reglas de palabras clave (archivo `familias.py`). Es una aproximación: revisa los cortes antes de decidir algo fino.

### Ingeniería: 139 exámenes, 3569 preguntas

| Materia (etiqueta `area`) | Preguntas | % de la facultad |
|---|---|---|
| Biología (`biologia`) | 924 | 25.9% |
| Química (`quimica`) | 661 | 18.5% |
| Aritmética-Álgebra (`aritmetica_algebra`) | 653 | 18.3% |
| Física (`fisica`) | 652 | 18.3% |
| Geometría-Trigonometría (`geometria_trigonometria`) | 618 | 17.3% |
| Estrategias de aprendizaje (`estrategias_aprendizaje`) | 49 | 1.4% |
| Matemáticas (`matematicas`) | 12 | 0.3% |

#### Biología: 924 preguntas

| Tema (familia) | Preguntas | % de la materia | 2005-09 | 2010-14 | 2015-25 | Tendencia |
|---|---|---|---|---|---|---|
| Clasificación, taxonomía y reinos | 163 | 17.6% | 16.2% (69) | 19.4% (54) | 18.2% (40) | sin tendencia |
| Ecología (ecosistema, cadenas tróficas, biomas) | 149 | 16.1% | 17.1% (73) | 14.4% (40) | 16.4% (36) | sin tendencia |
| Genética mendeliana y herencia | 133 | 14.4% | 13.4% (57) | 16.5% (46) | 13.6% (30) | sin tendencia |
| Biomoléculas (proteínas, lípidos, carbohidratos, agua) | 121 | 13.1% | 11.0% (47) | 15.1% (42) | 14.5% (32) | sin tendencia |
| Biodiversidad y conservación | 72 | 7.8% | 7.0% (30) | 9.7% (27) | 6.8% (15) | sin tendencia |
| Ácidos nucleicos (ADN, ARN) | 58 | 6.3% | 4.2% (18) | 7.6% (21) | 8.6% (19) | sin tendencia |
| Célula, organelos y división celular | 53 | 5.7% | 7.7% (33) | 1.4% (4) | 7.3% (16) | sin tendencia |
| (sin agrupar) | 51 | 5.5% | 6.3% (27) | 5.0% (14) | 4.5% (10) | sin tendencia |
| Contaminación y problemas ambientales | 44 | 4.8% | 4.7% (20) | 5.8% (16) | 3.6% (8) | sin tendencia |
| Metabolismo (fotosíntesis, respiración, Krebs) | 34 | 3.7% | 3.5% (15) | 3.2% (9) | 4.5% (10) | sin tendencia |
| Evolución y origen de la vida | 27 | 2.9% | 5.9% (25) | 0.7% (2) | 0.0% (0) | sin tendencia |
| Niveles de organización y definición de biología | 12 | 1.3% | 2.1% (9) | 0.7% (2) | 0.5% (1) | muestra chica |
| Reproducción, histología y salud | 7 | 0.8% | 0.7% (3) | 0.4% (1) | 1.4% (3) | muestra chica |

#### Química: 661 preguntas

| Tema (familia) | Preguntas | % de la materia | 2005-09 | 2010-14 | 2015-25 | Tendencia |
|---|---|---|---|---|---|---|
| Estequiometría, reactivo limitante y rendimiento | 168 | 25.4% | 30.2% (78) | 21.4% (39) | 23.1% (51) | sin tendencia |
| Soluciones, concentraciones y titulación | 92 | 13.9% | 12.0% (31) | 13.7% (25) | 16.3% (36) | sin tendencia |
| Gases ideales y leyes de los gases | 84 | 12.7% | 12.8% (33) | 10.4% (19) | 14.5% (32) | sin tendencia |
| Redox y balanceo | 73 | 11.0% | 5.8% (15) | 14.3% (26) | 14.5% (32) | sube |
| Masa, fórmula molecular y composición | 68 | 10.3% | 12.0% (31) | 11.5% (21) | 7.2% (16) | sin tendencia |
| Estructura atómica y números cuánticos | 59 | 8.9% | 7.4% (19) | 14.3% (26) | 6.3% (14) | sin tendencia |
| Densidad, temperatura y calorimetría | 48 | 7.3% | 9.7% (25) | 6.6% (12) | 5.0% (11) | sin tendencia |
| Propiedades coligativas | 40 | 6.1% | 7.0% (18) | 1.1% (2) | 9.0% (20) | sin tendencia |
| Enlaces y estructura de Lewis | 28 | 4.2% | 3.1% (8) | 6.6% (12) | 3.6% (8) | sin tendencia |
| (sin agrupar) | 1 | 0.2% | 0.0% (0) | 0.0% (0) | 0.5% (1) | muestra chica |

#### Aritmética-Álgebra: 653 preguntas

| Tema (familia) | Preguntas | % de la materia | 2005-09 | 2010-14 | 2015-25 | Tendencia |
|---|---|---|---|---|---|---|
| Logaritmos | 75 | 11.5% | 8.9% (23) | 10.8% (20) | 15.3% (32) | sube |
| Cuadráticas, Vieta y naturaleza de raíces | 69 | 10.6% | 9.3% (24) | 11.3% (21) | 11.5% (24) | sin tendencia |
| Progresiones y sucesiones | 58 | 8.9% | 7.0% (18) | 7.0% (13) | 12.9% (27) | sin tendencia |
| Divisores, MCD, MCM y numeración | 51 | 7.8% | 8.9% (23) | 9.1% (17) | 5.3% (11) | sin tendencia |
| Teorema del resto y división de polinomios | 50 | 7.7% | 11.2% (29) | 7.5% (14) | 3.3% (7) | baja |
| Sistemas de ecuaciones | 47 | 7.2% | 7.8% (20) | 7.5% (14) | 6.2% (13) | sin tendencia |
| Fracciones algebraicas y ecuaciones racionales | 45 | 6.9% | 5.8% (15) | 8.6% (16) | 6.7% (14) | sin tendencia |
| Ecuaciones irracionales y radicales | 44 | 6.7% | 7.0% (18) | 6.5% (12) | 6.7% (14) | sin tendencia |
| Porcentajes, interés, mezclas y costos | 28 | 4.3% | 4.3% (11) | 3.8% (7) | 4.8% (10) | sin tendencia |
| Regla de tres, reparto y proporcionalidad | 27 | 4.1% | 5.0% (13) | 3.2% (6) | 3.8% (8) | sin tendencia |
| Ecuaciones exponenciales | 27 | 4.1% | 0.8% (2) | 4.8% (9) | 7.7% (16) | sube |
| Binomio de Newton | 24 | 3.7% | 5.4% (14) | 2.7% (5) | 2.4% (5) | sin tendencia |
| Factorización y productos notables | 21 | 3.2% | 5.8% (15) | 2.2% (4) | 1.0% (2) | sin tendencia |
| Inecuaciones y desigualdades | 18 | 2.8% | 1.9% (5) | 3.2% (6) | 3.3% (7) | sin tendencia |
| Funciones (dominio, gráfica, inversa) | 18 | 2.8% | 0.4% (1) | 4.8% (9) | 3.8% (8) | sin tendencia |

(5 familias más con menos preguntas.)

#### Física: 652 preguntas

| Tema (familia) | Preguntas | % de la materia | 2005-09 | 2010-14 | 2015-25 | Tendencia |
|---|---|---|---|---|---|---|
| Cinemática 1D (MRU, MRUV, caída libre, encuentro) | 172 | 26.4% | 24.6% (61) | 22.5% (41) | 31.5% (70) | sin tendencia |
| Dinámica: Newton, poleas y fricción | 122 | 18.7% | 17.3% (43) | 19.8% (36) | 19.4% (43) | sin tendencia |
| Tiro parabólico y proyectiles | 115 | 17.6% | 14.5% (36) | 19.8% (36) | 19.4% (43) | sin tendencia |
| Capacitores y electrostática | 69 | 10.6% | 11.7% (29) | 14.3% (26) | 6.3% (14) | sin tendencia |
| Movimiento circular | 51 | 7.8% | 7.3% (18) | 7.7% (14) | 8.6% (19) | sin tendencia |
| Circuitos y resistencias (corriente continua) | 51 | 7.8% | 12.5% (31) | 5.5% (10) | 4.5% (10) | baja |
| Impulso y choques | 29 | 4.4% | 2.8% (7) | 5.5% (10) | 5.4% (12) | sin tendencia |
| Trabajo, energía y potencia | 25 | 3.8% | 7.3% (18) | 2.2% (4) | 1.4% (3) | sin tendencia |
| Vectores y análisis dimensional | 15 | 2.3% | 1.6% (4) | 2.7% (5) | 2.7% (6) | sin tendencia |
| Ondas, sonido, calor y otros | 1 | 0.2% | 0.4% (1) | 0.0% (0) | 0.0% (0) | muestra chica |
| (sin agrupar) | 1 | 0.2% | 0.0% (0) | 0.0% (0) | 0.5% (1) | muestra chica |
| Estática y equilibrio | 1 | 0.2% | 0.0% (0) | 0.0% (0) | 0.5% (1) | muestra chica |

#### Geometría-Trigonometría: 618 preguntas

| Tema (familia) | Preguntas | % de la materia | 2005-09 | 2010-14 | 2015-25 | Tendencia |
|---|---|---|---|---|---|---|
| Circunferencia: ángulos, tangentes, cuerdas | 128 | 20.7% | 17.2% (40) | 14.1% (25) | 30.1% (63) | sin tendencia |
| Polígonos y cuadriláteros | 87 | 14.1% | 20.3% (47) | 10.2% (18) | 10.5% (22) | sin tendencia |
| Triángulos (líneas notables, semejanza) | 86 | 13.9% | 15.9% (37) | 11.9% (21) | 13.4% (28) | sin tendencia |
| Identidades trigonométricas | 86 | 13.9% | 8.6% (20) | 20.3% (36) | 14.4% (30) | sin tendencia |
| Segmentos y ángulos (rectas, paralelas) | 67 | 10.8% | 16.8% (39) | 11.9% (21) | 3.3% (7) | baja |
| Ecuaciones trigonométricas | 66 | 10.7% | 11.2% (26) | 12.4% (22) | 8.6% (18) | sin tendencia |
| Razones trigonométricas y triángulo rectángulo | 49 | 7.9% | 1.7% (4) | 11.3% (20) | 12.0% (25) | sube |
| Reducción al primer cuadrante y ángulos notables | 20 | 3.2% | 3.4% (8) | 3.4% (6) | 2.9% (6) | sin tendencia |
| Ángulos doble, mitad, suma y producto (trigonometría) | 10 | 1.6% | 1.7% (4) | 1.7% (3) | 1.4% (3) | muestra chica |
| Ley de senos y cosenos | 7 | 1.1% | 0.9% (2) | 1.1% (2) | 1.4% (3) | muestra chica |
| Geometría analítica (recta, circunferencia, parábola) | 5 | 0.8% | 0.9% (2) | 1.1% (2) | 0.5% (1) | muestra chica |
| (sin agrupar) | 4 | 0.6% | 1.3% (3) | 0.0% (0) | 0.5% (1) | muestra chica |
| Funciones trigonométricas (gráfica, inversas) | 2 | 0.3% | 0.0% (0) | 0.6% (1) | 0.5% (1) | muestra chica |
| Áreas y perímetros | 1 | 0.2% | 0.0% (0) | 0.0% (0) | 0.5% (1) | muestra chica |

#### Estrategias de aprendizaje: 49 preguntas

| Tema (familia) | Preguntas | % de la materia | 2005-09 | 2010-14 | 2015-25 | Tendencia |
|---|---|---|---|---|---|---|
| Estrategias y técnicas de estudio (todo junto) | 49 | 100.0% | - (0) | - (0) | 100.0% (49) | sin dato |

**Matemáticas** (`matematicas`): solo 12 preguntas, ver sección 2.

Columnas de períodos: % de las preguntas de esa materia en esos años (entre paréntesis, cuántas). Exámenes por período: 2005-09 = 47, 2010-14 = 38, 2015-25 = 54. **Tendencia**: solo se opina con 15 o más preguntas del tema y una diferencia de al menos 6 puntos entre el primer y el último período, en el mismo sentido; si no, "sin tendencia". Los formatos de examen cambiaron con los años (PRE-U, parciales), así que una "subida" puede ser cambio de formato y no de gusto del examinador.

### Económicas: 10 exámenes, 181 preguntas

| Materia (etiqueta `area`) | Preguntas | % de la facultad |
|---|---|---|
| Matemáticas (`matematicas`) | 99 | 54.7% |
| Historia (`historia`) | 47 | 26.0% |
| Lenguaje (`lenguaje`) | 35 | 19.3% |

**Ojo con Económicas:** de los 10 exámenes, 9 tienen secciones pendientes. Matemáticas está completa; **Lenguaje tiene solo las preguntas verificables** (gramática, semántica, ortografía; falta comprensión lectora) e **Historia solo está en 5 exámenes**. Por eso los porcentajes entre materias de Económicas NO reflejan lo que cae realmente, y un tema de Historia o Lenguaje "ausente" en un año no se puede leer como que no cayó.

#### Matemáticas: 99 preguntas

| Tema (familia) | Preguntas | % de la materia |
|---|---|---|
| Problemas de móviles, edades y planteo | 14 | 14.1% |
| Operaciones, exponentes y aritmética básica | 10 | 10.1% |
| Sistemas de ecuaciones | 10 | 10.1% |
| Funciones (dominio, gráfica, inversa) | 9 | 9.1% |
| Logaritmos | 9 | 9.1% |
| Progresiones y sucesiones | 8 | 8.1% |
| Fracciones algebraicas y ecuaciones racionales | 8 | 8.1% |
| Ecuaciones irracionales y radicales | 8 | 8.1% |
| Regla de tres, reparto y proporcionalidad | 7 | 7.1% |
| Porcentajes, interés, mezclas y costos | 3 | 3.0% |
| Problemas de trabajo, grifos y obreros | 2 | 2.0% |
| Inecuaciones y desigualdades | 2 | 2.0% |
| Cuadráticas, Vieta y naturaleza de raíces | 2 | 2.0% |
| Ecuaciones exponenciales | 2 | 2.0% |
| (sin agrupar) | 2 | 2.0% |

(3 familias más con menos preguntas.)

#### Historia: 47 preguntas

| Tema (familia) | Preguntas | % de la materia |
|---|---|---|
| Historia de Bolivia | 25 | 53.2% |
| Historia universal | 22 | 46.8% |

#### Lenguaje: 35 preguntas

| Tema (familia) | Preguntas | % de la materia |
|---|---|---|
| Oración, sintaxis y funciones | 14 | 40.0% |
| Semántica y definición | 10 | 28.6% |
| Tiempos verbales y verbos | 7 | 20.0% |
| Ortografía y puntuación | 4 | 11.4% |

Económicas no lleva columna por año: son 10 exámenes de 2011 a 2014 más uno de 2023 (solo Matemáticas, 10 preguntas), todos con secciones pendientes. Una muestra así no es tendencia.

### Medicina: 1 exámenes, 98 preguntas

Hay **un solo examen** (Segundo Parcial 2024-2025). 98 preguntas con 98 etiquetas de tema distintas: ninguna se repite, así que **no se puede decir qué tema cae más**. Por materia: Morfofunción 49, Biología Celular 49. Formato propio (afirmaciones y clave de combinación), no comparable con Ingeniería. Para medir temas hacen falta más exámenes de Medicina.

## 2. Higiene de etiquetas (por qué el conteo crudo no sirve)

| Facultad | Preguntas | Etiquetas `tema` distintas | Tras quitar sufijos de examen/número | Etiquetas usadas una sola vez |
|---|---|---|---|---|
| Ingeniería | 3569 | 2829 | 2825 | 2415 (85.4%) |
| Económicas | 181 | 97 | 97 | 67 (69.1%) |
| Medicina | 98 | 98 | 96 | 98 (100.0%) |

- Preguntas sin `area`: **0**. Sin `tema`: **0**.

- Efecto práctico: en Ingeniería la etiqueta más repetida aparece **11 veces** de 3569. Con etiquetas crudas ningún tema "gana"; por eso este informe agrupa en familias.

- **Sufijo de examen pegado al tema**: 44 preguntas (ej. `edades-1op-2-2025`), de los exámenes 2025-1op-2-2025, 2025-2op-2-2025, 2025-2op-2-2025-version-b, 2025-3op-1-2025. Cada etiqueta así es única por construcción y no se puede contar.

- **Sufijo de numeración** (`-2`, `-ii`...): 5 preguntas, ej. `celulas-eucariontes-caracteristicas-2`, `genetica-cruce-monohibrido-3-1`, `progresion-geometrica-suma-potencias-2`, `regulacion-de-la-frecuencia-cardiaca-2`.

- **Área mal puesta, caso seguro**: 12 preguntas de Ingeniería (exámenes 2025-1op-2-2025, 2025-2op-2-2025, 2025-2op-2-2025-version-b, 2025-3op-1-2025) tienen `area: matematicas`, valor que el resto de Ingeniería no usa (usa `aritmetica_algebra` y `geometria_trigonometria`). Entre ellas hay un `monosacaridos` (Biología) metido en matemáticas. Económicas sí usa `matematicas`: la misma materia tiene dos esquemas de etiqueta según la facultad.

- **Mismo tema en dos áreas** (tras quitar sufijos): `ecuacion-exponencial` en ['aritmetica_algebra', 'matematicas']; `monosacaridos` en ['biologia', 'matematicas'].

- **Área dudosa por palabras** (3 preguntas; revisar a mano, la regla es tosca):

| Pregunta (fin del id) | área puesta | tema | parece de |
|---|---|---|---|
| nieria-2014-examen-de-ingreso-2-2014-008 | geometria_trigonometria | triangulo-rectangulo-progresion-aritmetica-area | aritmetica_algebra |
| men-de-ingreso-1-2015-segunda-opcion-002 | aritmetica_algebra | cinematica-alcance-encuentro | fisica |
| -examen-de-ingreso-2-2015-2da-opcion-008 | geometria_trigonometria | triangulo-rectangulo-progresion-aritmetica | aritmetica_algebra |


**Propuesta de fusiones** (NO aplicada, decide Ronald). Son etiquetas del mismo área cuyas palabras, sin contar plural ni artículos ni sufijos, son idénticas. Se propone dejar como etiqueta única la más frecuente. 197 grupos; los 25 con más preguntas:

| Facultad | area | Preguntas | Etiqueta propuesta | Se fusionan |
|---|---|---|---|---|
| Ingeniería | aritmetica_algebra | 15 | `division-polinomios-teorema-resto` | `teorema-del-resto-division-polinomios` (5), `teorema-resto-division-polinomios` (3) |
| Ingeniería | biologia | 13 | `amenazas-biodiversidad` | `biodiversidad-amenazas` (2) |
| Ingeniería | quimica | 11 | `numeros-cuanticos-configuracion-electronica` | `configuracion-electronica-numeros-cuanticos` (1) |
| Ingeniería | geometria_trigonometria | 11 | `identidades-trigonometricas-simplificacion` | `identidad-trigonometrica-simplificacion` (2) |
| Ingeniería | biologia | 9 | `clasificacion-vertebrados` | `vertebrados-clasificacion` (3) |
| Ingeniería | aritmetica_algebra | 9 | `ecuaciones-irracionales` | `ecuacion-irracional` (1) |
| Ingeniería | aritmetica_algebra | 9 | `ecuaciones-logaritmicas` | `ecuacion-logaritmica` (4) |
| Ingeniería | aritmetica_algebra | 9 | `progresion-aritmetica` | `progresiones-aritmeticas` (1) |
| Ingeniería | geometria_trigonometria | 8 | `ecuacion-trigonometrica-suma-soluciones` | `ecuaciones-trigonometricas-suma-soluciones` (3) |
| Ingeniería | quimica | 8 | `estequiometria-gases-ideales` | `estequiometria-gas-ideal` (3) |
| Ingeniería | quimica | 8 | `mezcla-soluciones-normalidad` | `mezclas-soluciones-normalidad` (1), `normalidad-mezcla-soluciones` (1), `soluciones-mezcla-normalidad` (1) |
| Ingeniería | aritmetica_algebra | 8 | `ecuacion-logaritmica-cambio-base` | `ecuaciones-logaritmicas-cambio-base` (3), `ecuaciones-logaritmicas-cambio-de-base` (1) |
| Ingeniería | quimica | 8 | `formula-molecular-combustion` | `formula-molecular-por-combustion` (1) |
| Ingeniería | aritmetica_algebra | 8 | `regla-de-tres-compuesta` | `regla-tres-compuesta` (1) |
| Ingeniería | biologia | 8 | `biomas-de-bolivia` | `biomas-bolivia` (3) |
| Ingeniería | biologia | 8 | `funciones-lipidos` | `lipidos-funciones` (3), `funciones-de-los-lipidos` (1) |
| Ingeniería | biologia | 7 | `funciones-proteinas` | `funciones-de-las-proteinas` (2) |
| Ingeniería | quimica | 7 | `redox-ion-electron-balanceo` | `redox-balanceo-ion-electron` (2), `balanceo-redox-ion-electron` (1) |
| Ingeniería | fisica | 7 | `resistencias-en-paralelo` | `resistencias-paralelo` (3) |
| Ingeniería | geometria_trigonometria | 6 | `poligono-regular-angulo-interior` | `angulos-interiores-poligonos-regulares` (1) |
| Ingeniería | geometria_trigonometria | 6 | `diagonales-de-poligonos` | `diagonales-poligono` (2), `poligono-diagonales` (1), `poligonos-diagonales` (1) |
| Ingeniería | aritmetica_algebra | 6 | `inecuacion-racional` | `inecuaciones-racionales` (2) |
| Ingeniería | geometria_trigonometria | 6 | `identidades-angulo-doble` | `identidad-angulo-doble` (1) |
| Ingeniería | aritmetica_algebra | 6 | `binomio-newton-termino-independiente` | `binomio-de-newton-termino-independiente` (1) |
| Ingeniería | aritmetica_algebra | 6 | `progresion-geometrica` | `progresiones-geometricas` (2) |


Además hay 114 pares de etiquetas muy parecidas (comparten al menos 80% de sus palabras) que **no** son idénticas y conviene mirar uno a uno antes de fusionar. Los 15 con más preguntas:

| Facultad | Etiqueta 1 | Etiqueta 2 | Parecido |
|---|---|---|---|
| Ingeniería | `numeros-cuanticos-configuracion-electronica` (10) | `numeros-cuanticos-configuracion-electronica-cationes` (1) | 0.80 |
| Ingeniería | `numeros-cuanticos-configuracion-electronica` (10) | `numeros-cuanticos-configuracion-electronica-cation` (1) | 0.80 |
| Ingeniería | `numeros-cuanticos-configuracion-electronica` (10) | `numeros-cuanticos-catión-configuracion-electronica` (1) | 0.80 |
| Ingeniería | `poligono-regular-angulo-interior` (5) | `poligono-regular-suma-angulos-interiores` (1) | 0.80 |
| Ingeniería | `redox-ion-electron-balanceo` (4) | `balanceo-redox-ion-electron-coeficientes` (2) | 0.80 |
| Ingeniería | `estequiometria-reactivo-limitante-gases` (4) | `estequiometria-volumenes-gases-reactivo-limitante` (1) | 0.80 |
| Ingeniería | `estequiometria-reactivo-limitante-gases` (4) | `estequiometria-reactivo-limitante-gas-humedo` (1) | 0.80 |
| Ingeniería | `redox-ion-electron-balanceo` (4) | `redox-balanceo-ion-electron-coeficientes` (1) | 0.80 |
| Ingeniería | `cuadrado-inscrito-triangulo-rectangulo` (3) | `cuadrado-inscrito-triangulo-rectangulo-trapecio` (1) | 0.80 |
| Ingeniería | `redox-balanceo-ion-electron` (2) | `balanceo-redox-ion-electron-coeficientes` (2) | 0.80 |
| Ingeniería | `estequiometria-reactivo-limitante-rendimiento` (3) | `estequiometria-redox-reactivo-limitante-rendimiento` (1) | 0.80 |
| Ingeniería | `redox-balanceo-agente-oxidante-reductor` (1) | `redox-balanceo-agente-oxidante` (3) | 0.80 |
| Ingeniería | `redox-balanceo-agente-oxidante` (3) | `redox-balanceo-agente-reductor-oxidante` (1) | 0.80 |
| Ingeniería | `redox-balanceo-agente-oxidante` (3) | `redox-balanceo-coeficiente-agente-oxidante` (1) | 0.80 |
| Ingeniería | `redox-ion-electron-acido` (2) | `redox-ion-electron-medio-acido` (2) | 0.80 |

## 3. Cobertura: cada tema frecuente contra lecciones y láminas

Cómo se decide el estado (se mide **existencia y alcance, no calidad**; la calidad está en `docs/auditoria-pedagogica.md`):

- **Cubierto**: hay lámina publicada del tema (solo Ingeniería, solo Aritmética-Álgebra), o una lección dedicada al tema cuyo texto menciona los términos clave que pide el banco.
- **A medias**: hay lección, pero es general o no menciona un término que el banco pregunta mucho (se indica cuál; lo comprobé buscando la palabra en el código de la lección).
- **Hueco**: no hay nada.
- **(oculto)**: el contenido existe en disco pero la facultad no lo lista en el catálogo, así que el alumno no lo ve.

### Ingeniería: familias con 15 o más preguntas

| Tema (familia) | Materia | Preguntas | Estado | Qué hay |
|---|---|---|---|---|
| Cinemática 1D (MRU, MRUV, caída libre, encuentro) | Física | 172 | Cubierto | lección: cinematica-1d |
| Estequiometría, reactivo limitante y rendimiento | Química | 168 | Cubierto | lección: estequiometria, reacciones-balanceo |
| Clasificación, taxonomía y reinos | Biología | 163 | Cubierto (oculto) | lección: diversidad-seres-vivos |
| Ecología (ecosistema, cadenas tróficas, biomas) | Biología | 149 | Cubierto (oculto) | lección: ecologia-medioambiente |
| Genética mendeliana y herencia | Biología | 133 | Cubierto (oculto) | lección: genetica-mendeliana |
| Circunferencia: ángulos, tangentes, cuerdas | Geometría-Trigonometría | 128 | Cubierto | lección: circunferencia |
| Dinámica: Newton, poleas y fricción | Física | 122 | Cubierto | lección: dinamica-newton |
| Biomoléculas (proteínas, lípidos, carbohidratos, agua) | Biología | 121 | Cubierto (oculto) | lección: bases-moleculares-vida, componentes-materia-viva |
| Tiro parabólico y proyectiles | Física | 115 | Cubierto | lección: cinematica-2d |
| Soluciones, concentraciones y titulación | Química | 92 | A medias | lección: soluciones (la lección no menciona: normalidad, titulación) |
| Polígonos y cuadriláteros | Geometría-Trigonometría | 87 | Cubierto | lección: poligonos-cuadrilateros |
| Triángulos (líneas notables, semejanza) | Geometría-Trigonometría | 86 | Cubierto | lección: triangulos, congruencia-semejanza |
| Identidades trigonométricas | Geometría-Trigonometría | 86 | Cubierto | lección: identidades-trigonometricas |
| Gases ideales y leyes de los gases | Química | 84 | Cubierto | lección: gases-ideales |
| Logaritmos | Aritmética-Álgebra | 75 | Cubierto | 8 lámina(s); lección: logaritmacion |
| Redox y balanceo | Química | 73 | Cubierto | lección: reacciones-balanceo |
| Biodiversidad y conservación | Biología | 72 | Cubierto (oculto) | lección: diversidad-seres-vivos, ecologia-medioambiente |
| Cuadráticas, Vieta y naturaleza de raíces | Aritmética-Álgebra | 69 | Cubierto | 5 lámina(s); lección: ecuaciones-segundo-grado |
| Capacitores y electrostática | Física | 69 | Cubierto | lección: electrostatica |
| Masa, fórmula molecular y composición | Química | 68 | Cubierto | lección: leyes-fundamentales-quimica |
| Segmentos y ángulos (rectas, paralelas) | Geometría-Trigonometría | 67 | Cubierto | lección: segmentos-angulos |
| Ecuaciones trigonométricas | Geometría-Trigonometría | 66 | Cubierto | lección: identidades-trigonometricas |
| Estructura atómica y números cuánticos | Química | 59 | A medias | lección: estructura-atomica (la lección no menciona: ondas electromagnéticas, longitud de onda, fotones) |
| Progresiones y sucesiones | Aritmética-Álgebra | 58 | Cubierto | 6 lámina(s); lección: sucesiones-series |
| Ácidos nucleicos (ADN, ARN) | Biología | 58 | Cubierto (oculto) | lección: bases-moleculares-vida |
| Célula, organelos y división celular | Biología | 53 | Cubierto (oculto) | lección: bases-celulares-vida |
| Divisores, MCD, MCM y numeración | Aritmética-Álgebra | 51 | Cubierto | 4 lámina(s); lección: mcd-mcm |
| Movimiento circular | Física | 51 | A medias | lección: cinematica-2d (la lección no menciona: dinámica del movimiento circular: rizo, peralte, péndulo cónico) |
| Circuitos y resistencias (corriente continua) | Física | 51 | Cubierto | lección: circuitos-dc |
| Teorema del resto y división de polinomios | Aritmética-Álgebra | 50 | Cubierto | 5 lámina(s) |
| Razones trigonométricas y triángulo rectángulo | Geometría-Trigonometría | 49 | Cubierto | lección: razones-trigonometricas |
| Estrategias y técnicas de estudio (todo junto) | Estrategias de aprendizaje | 49 | Hueco | ninguna |
| Densidad, temperatura y calorimetría | Química | 48 | A medias | lección: nociones-quimica (la lección no menciona: calorimetría, calor específico) |
| Sistemas de ecuaciones | Aritmética-Álgebra | 47 | Cubierto | 4 lámina(s); lección: sistemas-lineales |
| Fracciones algebraicas y ecuaciones racionales | Aritmética-Álgebra | 45 | Cubierto | 6 lámina(s); lección: expresiones-algebraicas |
| Ecuaciones irracionales y radicales | Aritmética-Álgebra | 44 | Cubierto | 4 lámina(s); lección: radicacion, operaciones-radicales |
| Contaminación y problemas ambientales | Biología | 44 | A medias (oculto) | lección: ecologia-medioambiente (la lección no menciona: erosión) |
| Propiedades coligativas | Química | 40 | Cubierto | lección: propiedades-coligativas |
| Metabolismo (fotosíntesis, respiración, Krebs) | Biología | 34 | Cubierto (oculto) | lección: energia-celular |
| Impulso y choques | Física | 29 | Hueco | ninguna |
| Porcentajes, interés, mezclas y costos | Aritmética-Álgebra | 28 | Cubierto | 3 lámina(s); lección: regla-de-tres |
| Enlaces y estructura de Lewis | Química | 28 | Cubierto | lección: enlace-quimico |
| Regla de tres, reparto y proporcionalidad | Aritmética-Álgebra | 27 | Cubierto | 3 lámina(s); lección: regla-de-tres, repartos-proporcionales, razones-proporciones |
| Ecuaciones exponenciales | Aritmética-Álgebra | 27 | Cubierto | 1 lámina(s); lección: teoria-exponentes |
| Evolución y origen de la vida | Biología | 27 | Hueco | ninguna |
| Trabajo, energía y potencia | Física | 25 | Cubierto | lección: trabajo-energia |
| Binomio de Newton | Aritmética-Álgebra | 24 | Cubierto | 3 lámina(s) |
| Factorización y productos notables | Aritmética-Álgebra | 21 | Cubierto | 3 lámina(s); lección: factorizacion |
| Reducción al primer cuadrante y ángulos notables | Geometría-Trigonometría | 20 | A medias | lección: razones-trigonometricas, identidades-trigonometricas (la lección no menciona: primer cuadrante) |
| Inecuaciones y desigualdades | Aritmética-Álgebra | 18 | Cubierto | 2 lámina(s); lección: desigualdades |
| Funciones (dominio, gráfica, inversa) | Aritmética-Álgebra | 18 | Cubierto | 2 lámina(s); lección: funcion-lineal-cuadratica, dominio-rango |
| Problemas de móviles, edades y planteo | Aritmética-Álgebra | 17 | Cubierto | 3 lámina(s); lección: ecuaciones-primer-grado |
| Vectores y análisis dimensional | Física | 15 | Cubierto | lección: vectores-fisica, nociones-quimica |

### Económicas: familias con 15 o más preguntas

| Tema (familia) | Materia | Preguntas | Estado | Qué hay |
|---|---|---|---|---|
| Historia de Bolivia | Historia | 25 | Hueco | ninguna |
| Historia universal | Historia | 22 | Hueco | ninguna |

### Huecos y "a medias", ordenados por frecuencia × facilidad de enseñar

Facilidad (juicio mío): **3** = concepto corto con fórmula o regla (cabe en una lámina), **2** = necesita figuras o es medianamente extenso, **1** = mucha memorización o temas muy heterogéneos. **Afectadas** = preguntas que dependen justo del contenido que falta (en los "a medias", solo las que mencionan el término faltante; en los huecos, toda la familia). Puntaje = afectadas × facilidad. Solo entran familias de 10 o más preguntas. "2015-25" = cuántas de la familia cayeron en esos años (Ingeniería).

| # | Facultad | Materia | Tema | Preguntas | Afectadas | Facilidad | Puntaje | 2015-25 | Estado | Qué falta |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Ingeniería | Física | Movimiento circular | 51 | 38 | 3 | 114 | 19 | A medias | lección: cinematica-2d (la lección no menciona: dinámica del movimiento circular: rizo, peralte, péndulo cónico) |
| 2 | Ingeniería | Estrategias de aprendizaje | Estrategias y técnicas de estudio (todo junto) | 49 | 49 | 2 | 98 | 49 | Hueco | ninguna |
| 3 | Ingeniería | Química | Soluciones, concentraciones y titulación | 92 | 32 | 3 | 96 | 36 | A medias | lección: soluciones (la lección no menciona: normalidad, titulación) |
| 4 | Ingeniería | Física | Impulso y choques | 29 | 29 | 3 | 87 | 12 | Hueco | ninguna |
| 5 | Ingeniería | Biología | Evolución y origen de la vida | 27 | 27 | 2 | 54 | 0 | Hueco | ninguna |
| 6 | Ingeniería | Geometría-Trigonometría | Reducción al primer cuadrante y ángulos notables | 20 | 18 | 3 | 54 | 6 | A medias | lección: razones-trigonometricas, identidades-trigonometricas (la lección no menciona: primer cuadrante) |
| 7 | Económicas | Matemáticas | Problemas de móviles, edades y planteo | 14 | 13 | 3 | 39 | - | A medias | lección: ecuaciones-primer-grado (la lección no menciona: planteo) |
| 8 | Económicas | Lenguaje | Semántica y definición | 10 | 10 | 3 | 30 | - | A medias | lección: denotacion-connotacion, lexico-contextual (lección general, no dedicada al tema) |
| 9 | Ingeniería | Química | Densidad, temperatura y calorimetría | 48 | 9 | 3 | 27 | 11 | A medias | lección: nociones-quimica (la lección no menciona: calorimetría, calor específico) |
| 10 | Económicas | Historia | Historia de Bolivia | 25 | 25 | 1 | 25 | - | Hueco | ninguna |
| 11 | Ingeniería | Química | Estructura atómica y números cuánticos | 59 | 8 | 3 | 24 | 14 | A medias | lección: estructura-atomica (la lección no menciona: ondas electromagnéticas, longitud de onda, fotones) |
| 12 | Económicas | Historia | Historia universal | 22 | 22 | 1 | 22 | - | Hueco | ninguna |
| 13 | Económicas | Lenguaje | Oración, sintaxis y funciones | 14 | 9 | 2 | 18 | - | A medias | lección: expresion-oracion (la lección no menciona: subordinad) |
| 14 | Ingeniería | Biología | Contaminación y problemas ambientales | 44 | 8 | 2 | 16 | 8 | A medias (oculto) | lección: ecologia-medioambiente (la lección no menciona: erosión) |

## 4. Las 5 piezas a escribir primero

**Antes de escribir nada:** mostrar en el catálogo de Ingeniería las 7 lecciones de Biología que ya existen (`BIO-01` a `BIO-07`). No requiere contenido nuevo y destapa la materia más grande del banco.

Salen de la lista de huecos (puntaje), salteando lo que no suma al examen de ingreso: **Estrategias de aprendizaje** aparece solo en los 6 parciales PRE-U 2024 (ningún examen de admisión la trae) y **Evolución** casi no cae desde 2010. Cada pieza trae preguntas reales del banco como ejemplo de **qué se pregunta** (el banco es mapa, no guion: la pieza enseña el concepto general). Ids completos del parser real.

**1. Movimiento circular** (Ingeniería, Física): 38 preguntas afectadas de 51 en la familia; completar la lección existente. lección: cinematica-2d (la lección no menciona: dinámica del movimiento circular: rizo, peralte, péndulo cónico).

- `umss-ingenieria-2025-examen-de-ingreso-1-2025-1ra-opcion-012` (P12, tema `dinamica-circular-tension-cuerda`)
- `umss-ingenieria-2025-examen-de-ingreso-1-2025-2da-opcion-011` (P11, tema `energia-rizo-circular`)
- `umss-ingenieria-2025-examen-de-ingreso-1-2025-2da-opcion-012` (P12, tema `dinamica-circular-friccion-curva`)
- `umss-ingenieria-2024-examen-de-ingreso-1-2024-2da-opcion-011` (P11, tema `movimiento-circular-vertical`)

**2. Soluciones, concentraciones y titulación** (Ingeniería, Química): 32 preguntas afectadas de 92 en la familia; completar la lección existente. lección: soluciones (la lección no menciona: normalidad, titulación).

- `umss-ingenieria-2025-examen-de-ingreso-1-2025-3ra-opcion-007` (P7, tema `titulacion-acido-base-3op-2025`)
- `umss-ingenieria-2025-segundo-parcial-curso-pre-u-gestion-1-2025-013` (P13, tema `solucion-normalidad-densidad-pureza`)
- `umss-ingenieria-2024-examen-final-curso-pre-u-gestion-1-2024-014` (P14, tema `disoluciones-normalidad-porcentaje`)
- `umss-ingenieria-2018-examen-de-ingreso-2-2018-1ra-opcion-013` (P13, tema `normalidad-dilucion-acido-sulfurico`)

**3. Impulso y choques** (Ingeniería, Física): 29 preguntas afectadas de 29 en la familia; escribir lección o lámina nueva. ninguna.

- `umss-ingenieria-2020-examen-de-ingreso-1-2020-2da-opcion-010` (P10, tema `cinematica-cazador-mono-choque-caida-libre`)
- `umss-ingenieria-2020-examen-de-ingreso-1-2020-2da-opcion-012` (P12, tema `dinamica-choque-elastico-velocidades`)
- `umss-ingenieria-2020-examen-de-ingreso-1-2020-3ra-opcion-011` (P11, tema `choques-inelasticos-sucesivos-conservacion-momento`)
- `umss-ingenieria-2017-examen-de-ingreso-2-2017-1ra-opcion-012` (P12, tema `conservacion-momento-lineal-retroceso`)

**4. Reducción al primer cuadrante y ángulos notables** (Ingeniería, Geometría-Trigonometría): 18 preguntas afectadas de 20 en la familia; completar la lección existente. lección: razones-trigonometricas, identidades-trigonometricas (la lección no menciona: primer cuadrante).

- `umss-ingenieria-2025-segundo-parcial-curso-pre-u-gestion-1-2025-008` (P8, tema `angulo-doble-medio-cuadrantes`)
- `umss-ingenieria-2022-examen-de-ingreso-2-2022-1ra-opcion-007` (P7, tema `reduccion-al-primer-cuadrante`)
- `umss-ingenieria-2022-examen-de-ingreso-2-2022-3ra-opcion-008` (P8, tema `angulo-tercer-cuadrante-recta`)
- `umss-ingenieria-2020-examen-de-ingreso-1-2020-1ra-opcion-008` (P8, tema `angulos-cuadrantes-lado-terminal`)

**5. Problemas de móviles, edades y planteo** (Económicas, Matemáticas): 13 preguntas afectadas de 14 en la familia; completar la lección existente. lección: ecuaciones-primer-grado (la lección no menciona: planteo).

- `umss-economicas-2023-examen-de-ingreso-1-2023-2da-opcion-008` (P8, tema `ecuaciones`)
- `umss-economicas-2014-examen-de-admision-1-2014-1ra-opcion-001` (P1, tema `planteo-de-ecuaciones`)

## 5. Inconsistencias de datos y límites del conteo

**`total_preguntas` del encabezado contra las preguntas que realmente hay** (parser real del banco):

| Examen | Declara | Tiene | Faltantes declarados |
|---|---|---|---|
| 2011-2op-1-2011 | 14 | 13 | [7] |
| 2025-segundo-parcial-curso-basico-2024-2025 | 100 | 98 | [60, 91] |

Las diferencias se explican por `faltantes` (preguntas que existen en el examen y no se pudieron transcribir). No son errores: son preguntas que el conteo por tema no puede ver.

**Secciones declaradas en `ponderacion` sin ninguna pregunta cargada** (no son "temas ausentes", son secciones que faltan):

| Facultad | Área | Motivo declarado | Exámenes |
|---|---|---|---|
| Económicas | historia | no-encontrado-en-los-pdf | 4 |

Toda sección vacía está declarada como pendiente.

**Exámenes completos y no completos:**

| Facultad | Exámenes | Con `secciones_pendientes` | Con `faltantes` | Completos |
|---|---|---|---|---|
| Ingeniería | 139 | 0 | 0 | 139 |
| Económicas | 10 | 9 | 1 | 1 |
| Medicina | 1 | 0 | 1 | 0 |

**Robustez: ¿cambia el top 15 si solo se cuentan exámenes de admisión?**

Ingeniería por categoría de examen: admision = 1424 preguntas, parcial_curso = 2145 preguntas.

De los 15 temas del top, **11 siguen en el top 15** si se cuentan solo las 1424 preguntas de exámenes de admisión. Los que cambian: Genética mendeliana y herencia, Biomoléculas (proteínas, lípidos, carbohidratos, agua), Polígonos y cuadriláteros, Triángulos (líneas notables, semejanza).

`estrategias_aprendizaje` aparece en 6 exámenes, todos de categoría parcial_curso (ninguno de admisión).

**Lecciones y láminas: lo que está en disco y lo que ve el alumno**

- Lecciones en disco: **103**. Listadas en el catálogo "Aprende" de Ingeniería: 57; de Económicas: 49.

- **Lecciones en disco que ninguna facultad lista en el catálogo: 27**: `bases-celulares-vida`, `bases-moleculares-vida`, `bcm-bioenergetica-senalizacion`, `bcm-expresion-genica`, `bcm-membrana-transporte`, `componentes-materia-viva`, `derecho-introduccion`, `diversidad-seres-vivos`, `ecologia-medioambiente`, `eds-determinantes-salud`, `eds-epidemiologia`, `eds-investigacion-bioetica`, `energia-celular`, `genetica-mendeliana`, `morfofuncion-introduccion`, `odontologia-anatomia-dental`, `sistema-cardiovascular`, `sistema-digestivo`, `sistema-endocrino`, `sistema-esqueletico`, `sistema-linfatico-inmune`, `sistema-muscular`, `sistema-nervioso`, `sistema-reproductor`, `sistema-respiratorio`, `sistema-tegumentario`, `sistema-urinario`. Medicina no tiene catálogo propio (decisión documentada en `catalogo-aprende.ts`). Pero las 7 de Biología (`BIO-01` a `BIO-07`) son de Ingeniería y están **ocultas**.

- BITACORA.md (sección de identidad del proyecto) dice que el banco cubre Ciencias Económicas, Ingeniería, Medicina y **Derecho**, pero `data/examenes/umss/` tiene carpetas: economicas, ingenieria, medicina. No hay exámenes de Derecho (sí una lección `derecho-introduccion`).

- Slugs del catálogo sin carpeta en disco: 0.

- Láminas: **64** en disco, 64 publicadas en `laminas.ts`; publicadas sin página: 0; en disco sin entrada en el catálogo: 0. Facultades con láminas: ingenieria. **Solo Aritmética-Álgebra de Ingeniería tiene láminas.**

## Qué NO se pudo medir

- **Calidad** de las lecciones y láminas: solo si existen y qué términos mencionan.
- **Medicina**: el cruce por tema contra sus 18 lecciones necesita más exámenes.
- **Comprensión lectora** de Económicas y la parte de Historia pendiente: no están en el banco, así que no cuentan.
- **Preguntas repetidas entre exámenes** (el mismo ejercicio en dos convocatorias) no se descontaron: cuentan como pregunta nueva.
- Las **reglas de familia** pueden mandar alguna pregunta suelta a la familia equivocada; el orden de los primeros lugares es robusto, el de los últimos no.
