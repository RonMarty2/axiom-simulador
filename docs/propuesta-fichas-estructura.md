# Propuesta de fichas de estructura: Económicas, Ingeniería (FCyT) y Derecho

13-nov-2026. PROPUESTA: no se tocó `data/formatos-examen.json` ni código. Molde: las fichas de Medicina (`psa-2027`, `curso-basico`, `curso-basico-2025-26`). Esquema: id, facultad, nombre, areas[{id,peso}], preguntas, minutos, estimado, vigente, fuente.

Recuento hecho de nuevo sobre `data/examenes/umss/<facultad>/` (13-nov): Económicas 10, Ingeniería 139, Derecho 0 (carpeta inexistente). El inventario NO estaba viejo en conteo: en el disco no hay exámenes de Económicas 2025-26 (el último es `2023-2op-1-2023.md`, y también falta en `origin/main`). Si Ronald los tiene en otra máquina o en el SaaS, no llegaron a este árbol.

Regla de lectura: «peso» = proporción real de preguntas por área, salvo que se diga otra cosa. «Preguntas» = las transcriptas en el banco, que en Económicas NO es el examen completo (ver abajo).

---

## 1. Ingeniería (FCyT): 139 exámenes -> 7 fichas

Se agruparon los 23 formatos del inventario por época y tipo (admisión o curso). Las diferencias dentro de cada grupo son de 1 o 2 preguntas por área.

| Ficha propuesta | Exámenes | Años | Áreas y pesos | Preg. | Min | estimado | vigente |
|---|---|---|---|---|---|---|---|
| `fcyt-admision-2005` | 4 | 2005 | aritmetica_algebra 0.35, geometria_trigonometria 0.15, fisica 0.25, quimica 0.25 (sin biología) | 20 | 120 | no | no |
| `fcyt-admision-5-areas` | 65 | 2006-2025 (1ra opción y 2da de 2025 incluidas) | aritmetica_algebra 0.2, geometria_trigonometria 0.2, fisica 0.2, quimica 0.2, biologia 0.2 | 20 | 120 | no | no (ver duda 1) |
| `fcyt-admision-2025-2` | 4 | 2025 (2-2025 y 3ra opción) | matematicas 0.27, fisica 0.30, quimica 0.27, biologia 0.16 (según lo cargado; ver abajo) | 15 | 120 | sí | SÍ (propuesto, ver duda 1) |
| `fcyt-curso-2006-2008` | 23 | 2006-2008 | biologia 0.35, aritmetica_algebra 0.16, geometria_trigonometria 0.16, fisica 0.16, quimica 0.17 | 30-42 (usar 38) | 150 | no | no |
| `fcyt-curso-2009-2014` | 34 | 2009-2014 | biologia 0.31, aritmetica_algebra 0.17, geometria_trigonometria 0.17, fisica 0.17, quimica 0.17 | 25-34 (usar 30) | 120-150 (usar 130) | no | no |
| `fcyt-curso-2024` | 6 | 2024 | biologia 0.225, estrategias_aprendizaje 0.225, aritmetica_algebra 0.14, geometria_trigonometria 0.14, fisica 0.14, quimica 0.14 | 30-40 (usar 40) | 120-150 | no | no |
| `fcyt-curso-2025` | 3 | 2025 (parcial 1, parcial 2, final) | aritmetica_algebra 0.25, geometria_trigonometria 0.25, fisica 0.25, quimica 0.25 | 20 | 100 | no | SÍ para la vía «curso» |

Notas de la tabla:
- Conteo de control: 4 + 65 + 4 + 23 + 34 + 6 + 3 = 139.
- `fcyt-admision-5-areas` mezcla los formatos 5, 6, 8 y 11 del inventario (reparto 4/4/4/4/4 en 54 exámenes; 3 a 6 por área en los otros 11). Si se quiere más fino: partir en «2006-2011» (reparto desigual) y «2012-2025» (4 por área).
- `fcyt-admision-2025-2`: el peso de cada examen cargado cambia (2025-1op-2: 5/5/5 de matemáticas, física y química; 2025-2op-2: 5/4/4; 3op-1: 1/4/3/4 con biología; versión B: 1 matemática y 3 biología). No consta cuál es la estructura completa: los 4 archivos tienen 4, 12, 13 y 15 preguntas, no 20. Los pesos de la ficha son la suma de lo cargado.
- `fcyt-curso-2006-2008` y `fcyt-curso-2009-2014`: en cada una hay exámenes de 25 a 42 preguntas; la ficha usa un valor típico y la duración real queda en cada examen.

### Qué ficha le toca a cada examen de Ingeniería (por nombre de archivo)

| Si el archivo es... | Ficha |
|---|---|
| `2005-*op-*` (4) | `fcyt-admision-2005` |
| `1op/2op/3op/unica/Uop` de 2006 a 2024, más `2025-1op-1` y `2025-2op-1` (65) | `fcyt-admision-5-areas` |
| `2025-1op-2`, `2025-2op-2`, `2025-2op-2-version-b`, `2025-3op-1` (4) | `fcyt-admision-2025-2` |
| `parcial*`, `final*`, `2curso-*` de 2006, 2007, 2008 (23) | `fcyt-curso-2006-2008` |
| `parcial*`, `final*`, `2curso-*` de 2009 a 2014 (34) | `fcyt-curso-2009-2014` |
| `parcial*`, `final*` de 2024 (6) | `fcyt-curso-2024` |
| `2025-parcial1-1`, `2025-parcial2-1`, `2025-final-1` (3) | `fcyt-curso-2025` |

Vigente por carrera: ver duda 1 (la vigente real depende de la convocatoria 2027, que no está en disco).

### Áreas que cambiaron o desaparecieron (Ingeniería)

| Área vieja | Dónde aparece | Área o tema actual | Observación |
|---|---|---|---|
| `aritmetica_algebra` + `geometria_trigonometria` | 2005 a 2025-1 | `matematicas` en los 4 exámenes de admisión 2-2025 y 3-2025 | Las dos se fusionan en una. Las preguntas viejas se asignan a matemáticas; no consta cómo se reparte álgebra/geometría dentro de las 5 o 10 preguntas nuevas. |
| `biologia` | 2006 en adelante | Desaparece de `2025-1op-2` y `2025-2op-2`; reaparece en `2025-3op-1` y en la versión B | No consta si biología sigue en 2026-27. |
| (sin biología) | 2005 | Biología aparece desde 2006 | En 2005 el examen tenía 4 áreas. |
| `estrategias_aprendizaje` | Solo cursos 2024 | No está en el curso 2025 | Desapareció. Sus preguntas no tienen área actual equivalente; no consta si se reubican en otro tema. |
| `biologia` (peso 0.31 a 0.35) | Cursos 2006-2014 | Peso 0.2 en admisión; 0 en curso 2025 | En el curso 2025 el área biología no se evaluó. |

El campo `tema` de las preguntas es un identificador propio de cada examen (por ejemplo `division-polinomios-2op-2-2025`), no un tema común: sirve de poco para armar la tabla vieja -> tema actual. Esa tabla hay que armarla por contenido, no por la etiqueta.

---

## 2. Económicas: 10 exámenes -> 3 fichas

IMPORTANTE: los 10 archivos son transcripciones PARCIALES. Cada examen real consta de tres secciones (Matemáticas, Lenguaje, Historia) y, según los encabezados citados en los comentarios de los archivos, cada sección tiene su propio tiempo (Matemáticas 60 min; Lenguaje 15 min). En el banco hay todo Matemáticas (9 a 10 preguntas), 3 a 4 de Lenguaje (las 4 verificables de 20) y 8 a 10 de Historia (desde 2013). Las cifras de «preguntas» y «minutos» del examen completo NO constan.

| Ficha propuesta | Exámenes | Años | Áreas y pesos (sobre lo cargado) | Preg. cargadas | Min | estimado | vigente |
|---|---|---|---|---|---|---|---|
| `fce-admision-2011-2012` | 4 (`2011-1op-1`, `2011-2op-1`, `2012-1op-1`, `2012-2op-1`) | 2011-2012 | matematicas 0.72, lenguaje 0.28 | 13-14 | 60 (70 en `2011-1op-1`) | sí | no |
| `fce-admision-2013-2014` | 5 (`2013-1op-2`, `2013-2op-2`, `2014-1op-1`, `2014-1op-2`, `2014-2op-1`) | 2013-2014 | matematicas 0.43, historia 0.40, lenguaje 0.17 | 22-24 | 60 | sí | no |
| `fce-admision-2023` | 1 (`2023-2op-1-2023`) | 2023 | matematicas 1.00 | 10 | 60 | sí | no (ver duda 2) |

Ficha vigente más reciente de Económicas: la de 2023 es la más reciente pero está incompleta (solo matemáticas, convocatoria inferida por la fecha, sin facsímil). Se propone NO marcarla vigente. Mientras no haya convocatoria 2025-26, la vigente sería `fce-admision-2013-2014` (la última con las tres áreas), con `estimado: true`, o la ficha actual de `facultades.json` (matematicas 0.34, lenguaje 0.33, historia 0.33, 100 preg, 180 min, que no coincide con ningún examen real).

### Qué ficha le toca a cada examen de Económicas

| Archivo | Ficha |
|---|---|
| `2011-1op-1-2011`, `2011-2op-1-2011`, `2012-1op-1-2012`, `2012-2op-1-2012` | `fce-admision-2011-2012` |
| `2013-1op-2-2013`, `2013-2op-2-2013`, `2014-1op-1-2014`, `2014-1op-2-2014`, `2014-2op-1-2014` | `fce-admision-2013-2014` |
| `2023-2op-1-2023` | `fce-admision-2023` |

### Áreas (Económicas)

| Área | Estado |
|---|---|
| `matematicas` | En los 10 exámenes. |
| `lenguaje` | En 2011-2014. Falta en 2023 (no consta si no se tomó o si solo no se transcribió). |
| `historia` | Aparece en 2013-2014; no hay en 2011-2012 (`no-encontrado-en-los-pdf`: no consta si no se tomó). |

No hay cambios de nombre de área; hay áreas que aparecen o no aparecen entre épocas. La tabla área vieja -> tema actual no aplica hasta que exista un formato vigente con áreas distintas.

---

## 3. Derecho: 0 exámenes -> sin fichas reales

No hay carpeta `data/examenes/umss/derecho/` ni PDF cargado. `data/research/umss/derecho.md` es una plantilla vacía (cada dato dice «por confirmar»). Lo único que existe es la configuración de `data/facultades.json`: áreas civica 0.35, historia 0.30, verbal 0.25, razonamiento 0.10; 100 preguntas; 180 minutos; `ano_inicio_banco` 2021. Ninguna de esas cifras tiene fuente en disco.

| Ficha propuesta | Exámenes | Áreas y pesos | Preg. | Min | estimado | vigente |
|---|---|---|---|---|---|---|
| `derecho-provisoria` (opcional) | 0 | las de `facultades.json` | 100 | 180 | sí | sí (provisoria) |

Recomendación: no crear la ficha real hasta tener convocatoria o un examen. Si se crea la provisoria, que el texto de fuente diga «cifras de facultades.json sin respaldo». Datos que NO constan: modalidad de admisión (examen único, curso o vía alternativa), número de preguntas, duración, áreas y pesos, y si el área `civica` o `verbal` coincide con alguna lección existente.

---

## 4. Datos que no se pueden saber con lo que hay en disco

- Convocatoria 2027 de Ingeniería y de Económicas: estructura (áreas, preguntas, minutos). Solo hay exámenes pasados.
- Económicas: preguntas y minutos totales del examen completo; reparto real de Lenguaje (los comentarios dicen a la vez «20 preguntas» y «Número de preguntas: 10»); tiempo de Historia; si el examen 2023 tenía Lenguaje e Historia.
- Ingeniería 2025: si los 4 archivos son versiones/turnos de un mismo examen o exámenes distintos, y su estructura completa (están cargadas 4, 12, 13 y 15 preguntas de 20).
- Ingeniería: cómo se repartían álgebra y geometría dentro de `matematicas` en 2025.
- Derecho: todo.
- Económicas: no hay exámenes de 2025-26 en el árbol local ni en `origin/main`.

---

## 5. Dudas para Ronald

1. Ingeniería: ¿la estructura que rige para 2027 es la de 2-2025 (matemáticas, física, química, con o sin biología) o sigue la de 5 áreas por 4 preguntas? De eso depende cuál ficha es `vigente`. Propuesta provisoria: `fcyt-admision-2025-2` con `estimado: true`.
2. Económicas: ¿hay exámenes 2025-26 que no están en este árbol? Si es así, hace falta cargarlos antes de fijar la vigente.
3. Ingeniería: ¿hay una sola vigente por carrera o dos (admisión y curso PRE-U)? Medicina tiene una sola; aquí hay dos vías.
4. ¿Se parten las fichas de curso (2006-2014) en más grupos, o con las 2 propuestas alcanza?
5. Derecho: ¿se crea la ficha provisoria o se espera al primer examen?
