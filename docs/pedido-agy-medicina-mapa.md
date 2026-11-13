# Pedido de lectura (solo lectura, no edites nada)

Lee `CLAUDE.md` y `docs/plan-medicina-psa.md`.

Contexto: la convocatoria PSA 2027 de Medicina (UMSS) tiene 7 áreas: Matemáticas, Física, Química, Comprensión Lectora, Biología Celular, Morfofunción y **Educación en Salud e Investigación**. Hoy el código llama a la séptima «Introducción a la Investigación» (`investigacion`). Ronald quiere dejar ya armados los lugares donde entrará el material oficial (temario, banco, audiolibros) cuando le den acceso.

Tarea: reportar, con `archivo:línea`, TODOS los lugares del código y los datos donde Medicina está definido, para poder: (1) renombrar la 7.ª área a «Educación en Salud e Investigación» sin romper nada; (2) saber dónde se declara la ponderación, la duración y el número de preguntas; (3) saber dónde entraría un campo nuevo «audio» por unidad; (4) saber cómo se rotula el formato de un examen (Curso Básico viejo vs PSA).

Mira: `data/facultades.json`, `data/materias.json`, `src/lib/axiom/catalogo-aprende.ts` (bloques de Medicina, unidades MED-, EDS-, QUI-, FIS-, etc.), `src/lib/axiom/**`, `src/app/aprende`, `src/app/simulador`, `src/app/examenes`, `data/examenes/umss/medicina`, tests que mencionen `investigacion` o las unidades EDS-.

Formato de la respuesta (tablas cortas, solo lo comprobado; si no estás seguro escribe «no verificado»):
1. Dónde aparece `investigacion` / «Introducción a la Investigación» (archivo:línea, y si es id interno, nombre visible o test).
2. Dónde están ponderación, duración y número de preguntas.
3. Cómo se arma la lista de unidades de Medicina y qué campos tiene cada unidad.
4. Cómo se distingue hoy un examen por formato/serie.
5. Tests que se romperían al renombrar.
Máximo 60 líneas.
