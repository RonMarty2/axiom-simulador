# Pedido: Medicina PSA 2027 — Láminas, catálogo, navegación y cero rastros de reutilización

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md`; usa la skill `verificador` (`agentes/verificador.md`) para cuidar tests, tuteo y coherencia.

## Contexto y decisión de Ronald (24-nov-2026)
Aunque Medicina reutilice módulos de Matemática o preguntas filtradas del banco de Ingeniería (alineadas con los libros del Ministerio de Educación que exige la lista oficial PSA 2027), **en ningún lugar visible al alumno de Medicina debe quedar rastro de que fue reutilizado de Ingeniería o Económicas**. Todo texto visible para el alumno debe ir en **tuteo** (nunca voseo) y sin emojis decorativos.

## Archivos permitidos (SOLO puedes modificar estos archivos)
1. `src/lib/axiom/laminas.ts`
2. `src/app/laminas/page.tsx`
3. `src/app/aprende/page.tsx`
4. `src/lib/axiom/catalogo-aprende.ts`
5. `src/app/components/AppHeader.tsx`
6. `data/preguntas-compartidas.json`
7. `src/lib/preguntas-compartidas.test.ts`
8. `data/materias.json`

## Cambios exactos a realizar

### 1. Habilitar Láminas de Matemática para Medicina (`src/lib/axiom/laminas.ts` y `src/app/laminas/page.tsx`)
- En `src/lib/axiom/laminas.ts`: extrae el array de 23 módulos de `ingenieria` a una constante `MODULOS_MATEMATICAS: Modulo[]` (sin cambiar ningún slug ni lámina de Ingeniería) y agrega una segunda entrada en `LAMINAS` para `medicina`:
  - `facultad: "medicina"`
  - `area: "matematicas"`
  - `areaLabel: "Matemáticas"`
  - `modulos: MODULOS_MATEMATICAS`
- En `src/app/laminas/page.tsx`: cambia el mensaje de fallback cuando `!facultadLaminas` (línea ~51) de `"Todavía no hay láminas para tu facultad — arrancamos por Ingeniería, el resto viene después."` a `"Todavía estamos preparando las láminas de repaso para tu facultad."` (sin mencionar Ingeniería ni usar raya larga innecesaria).
- En `src/app/aprende/page.tsx`: cambia el mensaje de fallback (línea ~134) de `"Todavía no hay lecciones para tu facultad. Arrancamos por Ingeniería y Economía, el resto viene después."` a `"Todavía estamos preparando las lecciones para tu facultad."`.

### 2. Quitar rastro de Ingeniería en preguntas compartidas (`data/preguntas-compartidas.json` y `src/lib/preguntas-compartidas.test.ts`)
- En `data/preguntas-compartidas.json`, en la regla `id: "medicina-desde-ingenieria"`:
  - Cambia `"etiqueta"` de `"Pregunta de práctica de Ingeniería"` a `"Pregunta de práctica PSA 2027"`.
  - Cambia `"nota"` de `"Viene de un examen de Ingeniería y es de un tema que pide la lista oficial de la PSA 2027."` a `"Pregunta de práctica alineada con el temario oficial de la PSA 2027."`.
  - NO cambies `id`, `origen`, `destino`, `areas`, `temas_excluidos`, `temas_permitidos` ni `activo`.
- En `src/lib/preguntas-compartidas.test.ts`: actualiza únicamente las aserciones que verificaban el texto viejo `"Pregunta de práctica de Ingeniería"` (o `"Ingeniería"`) para que verifiquen `"Pregunta de práctica PSA 2027"`.

### 3. Limpiar Comprensión Lectora y descripciones de Medicina (`src/lib/axiom/catalogo-aprende.ts` y `data/materias.json`)
- En `src/lib/axiom/catalogo-aprende.ts`:
  - Crea `COMPRENSION_LECTORA_MED_UNIDADES: Unidad[]` tomando únicamente las 5 unidades de lectura y texto de `RAZONAMIENTO_VERBAL_UNIDADES` cuyos slugs son: `lectura-comprension`, `denotacion-connotacion`, `lexico-contextual`, `cohesion-textual`, `plan-redaccion` (renumeradas `"01"` a `"05"`). Deja fuera las 5 unidades de razonamiento verbal/lógico de Económicas (`expresion-oracion`, `analogias-verbales`, `aseveraciones-cuantificadores`, `silogismos`, `secuencias-logicas`). NO modifiques `RAZONAMIENTO_VERBAL_UNIDADES` ni `BLOQUES_ECONOMICAS`.
  - En `BLOQUES_MEDICINA`, bloque `id: "comprension-lectora"`:
    - `titulo: "Comprensión Lectora"`
    - `descripcion: "Reconocimiento textual, paráfrasis, inferencia, vocabulario contextual, idea central y cohesión."`
    - `unidades: COMPRENSION_LECTORA_MED_UNIDADES`
  - En `BLOQUES_MEDICINA`, revisa los títulos y descripciones de los 7 bloques: asegúrate de que ninguno diga "para Ingeniería", "FCyT", "FCE" o "Económicas". Cambia el título del bloque `matematicas` de `"Matemáticas: aritmética y álgebra"` a `"Matemáticas"` (ya incluye geometría, trigonometría, complejos, combinatoria, estadística, cuerpos 3D, cónicas y análisis).
- En `data/materias.json`: revisa si existe alguna mención visible como `"Física para Ingeniería"`, `"Química para Ingeniería"`, `"FCyT"` o `"FCE"` en descripciones usadas por Medicina; si existe, hazla neutral (ej. `"Física"`, `"Química"`). Si no existe, no toques el archivo.

### 4. Aclarar navegación (`src/app/components/AppHeader.tsx`)
- En `src/app/components/AppHeader.tsx`, en la barra de navegación principal (desktop y móvil si aplica), cambia la etiqueta del enlace a `/historial` de `"Exámenes"` a `"Historial"`, para que no se confunda con `"Practicar"` (donde el alumno entra a rendir exámenes). NO cambies rutas ni otros enlaces.

## Criterios de cierre
- No toques ningún archivo fuera de los 8 permitidos.
- Respeta tuteo en todo texto visible.
- En tu respuesta final, resume en máximo 20 líneas exactamente qué cambiaste en cada archivo.
