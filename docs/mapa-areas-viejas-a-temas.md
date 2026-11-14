# Mapa de equivalencias: área vieja a tema actual

Documento de mapeo entre los identificadores de área usados históricamente en los exámenes digitalizados del banco y la estructura actual (definida en `src/lib/axiom/areas.ts`, `src/lib/axiom/catalogo-aprende.ts`, `data/materias.json` y `data/formatos-examen.json`).

## 1. Medicina

| Área vieja (id usado en exámenes) | Épocas donde aparece | Área o tema actual que la reemplaza | Confianza | Nota |
|---|---|---|---|---|
| `morfofuncion` | Curso Básico 2023 a 2025-26 | `morfofuncion` | alta | Se mantiene idéntica en PSA 2027; su ponderación pasa de 50 % a 20 %. |
| `biologia_celular` | Curso Básico 2023 a 2025-26 | `biologia_celular` | alta | Se mantiene idéntica en PSA 2027; su ponderación pasa de 30-50 % a 20 %. |
| `investigacion` | Curso Básico 2025-26 | `investigacion` | alta | Ingresó en 2025-26 y se ratifica en PSA 2027 (Educación en Salud e Investigación). |

Nota sobre áreas nuevas: la convocatoria vigente PSA 2027 incorpora además `quimica`, `fisica`, `matematicas` y `comprension_lectora`. Ninguna de estas cuatro tiene preguntas en los exámenes pasados del Curso Básico de Medicina.

## 2. Ciencias Económicas

| Área vieja (id usado en exámenes) | Épocas donde aparece | Área o tema actual que la reemplaza | Confianza | Nota |
|---|---|---|---|---|
| `matematicas` | 2011 a 2023 (en los 10 exámenes) | `matematicas` | alta | Id idéntico; cubre aritmética, álgebra y funciones (bloque `razonamiento-matematico`). |
| `lenguaje` | 2011 a 2014 (9 exámenes) | `lenguaje` / `verbal` | alta | En `facultades.json` se llama `lenguaje`; en `materias.json` figura con área `verbal`. |
| `historia` | 2013 a 2014 (5 exámenes) | `historia` | media | Vigente en `facultades.json` (peso 0.33); no tiene lecciones en el catálogo actual de Económicas. |

Nota: en Económicas no hubo cambios de identificadores entre épocas; la variación es si el examen incluía o no la materia transcripta.

## 3. Ingeniería (FCyT)

| Área vieja (id usado en exámenes) | Épocas donde aparece | Área o tema actual que la reemplaza | Confianza | Nota |
|---|---|---|---|---|
| `aritmetica_algebra` | 2005 a 2025-1 (admisión y cursos) | `matematicas` | alta | Fusionada en `matematicas` en admisión 2025; bloque `matematicas` en catálogo. |
| `geometria_trigonometria` | 2005 a 2025-1 (admisión y cursos) | `matematicas` | alta | Integrada en `matematicas` en admisión 2025; bloque `geometria-trigonometria` en catálogo. |
| `fisica` | 2005 a 2025 (todas las convocatorias) | `fisica` | alta | Id idéntico; cubre mecánica, termodinámica y ondas (unidades FIS-01 a FIS-07). |
| `quimica` | 2005 a 2025 (todas las convocatorias) | `quimica` | alta | Id idéntico; cubre química general e inorgánica (unidades QUI-01 a QUI-10). |
| `biologia` | 2006 a 2025 (admisión y cursos) | `biologia` | media | Ausente en 2005 y en curso 2025; intermitente en admisión 2025. No consta vigencia 2027. |
| `estrategias_aprendizaje` | Cursos propedéuticos 2024 | sin equivalencia: no consta | alta | Exclusiva del curso 2024; retirada en 2025 sin tema de reemplazo en el sistema. |
| `matematicas` | Admisión 2-2025 y 3-2025 | `matematicas` | alta | Id unificado vigente que sustituye a álgebra y geometría en los exámenes más recientes. |

## 4. Ids de `area:` en exámenes que NO existen en `areas.ts` o `materias.json`

Contraste entre los 12 ids usados en exámenes (`aritmetica_algebra`, `geometria_trigonometria`, `fisica`, `quimica`, `biologia`, `estrategias_aprendizaje`, `matematicas`, `lenguaje`, `historia`, `morfofuncion`, `biologia_celular`, `investigacion`):

1. **En `src/lib/axiom/areas.ts`:**
   - Ninguno ausente: los 12 ids están definidos en `ETIQUETAS_AREA`.
2. **En `data/materias.json`:**
   - `aritmetica_algebra`: no existe como área en `materias.json` (agrupada en `matematicas`).
   - `geometria_trigonometria`: no existe como área en `materias.json` (agrupada en `matematicas`).
   - `biologia`: no existe como materia ni área en `materias.json` para Ingeniería.
   - `estrategias_aprendizaje`: no existe en `materias.json`.
   - `lenguaje`: no existe con ese id en `materias.json` (se registró con área `verbal`).
3. **En la unión (`areas.ts` y `materias.json`):**
   - No hay ningún id huérfano total: `areas.ts` contiene la totalidad de los ids empleados por el banco.
