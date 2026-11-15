# Pedido de lectura (solo lectura, no edites nada)

Lee `CLAUDE.md`, `docs/plan-medicina-psa.md` y `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO/TABLERO_SEGUIMIENTO_PRODUCCION.md`.

Contexto: los audiolibros de Medicina (Calvo «Biología Celular» y Saladin «Anatomía y Fisiología») se sintetizan desde los 50 archivos `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/*_LITERAL_TTS.md`. Deben contener SOLO el cuerpo del libro que estudia el alumno. Se encontró que muchos terminan con secciones que no sirven en audio (ej. Calvo tema 7 línea 109 «Lecturas recomendadas», 121 «Preguntas de autoevaluación»; Saladin tema 5 línea 93 «Guía de estudio y autoevaluación»).

Tarea A (por cada uno de los 50 archivos): lista CADA sección que no es cuerpo de lectura: bibliografía / lecturas recomendadas / referencias, autoevaluación / preguntas / guía de estudio / respuestas, glosario, actividad práctica, índice, créditos o autores sueltos, pies de página o encabezados repetidos, rótulos de figuras volcados como texto, objetivos de aprendizaje, resumen del capítulo, recuadros («Aplicación clínica», «Perspectiva…» y similares: anótalos aparte, NO los marques como basura). Para cada una: archivo, línea inicial y final, título, cantidad de palabras, y si está AL FINAL del archivo o EN MEDIO.

Tarea B (cobertura): con los PDF de `examenes pasados/MEDICINA/LIBROS DE MEDICINA/libros_extraidos/` (solo el índice y el inicio/fin de cada capítulo), di para cada capítulo del libro si existe su `_LITERAL_TTS.md`, y si el texto empieza y termina donde empieza y termina el capítulo del PDF (primera y última frase del cuerpo en el PDF vs en el .md). Señala capítulos faltantes, cortados o duplicados (ej. Tema_02 y Tema_02_Parte_2 de Calvo). Mira también `_AUTOEVALUACIONES_BANCO_PREGUNTAS_MD/` y di qué contiene.

Formato de respuesta: una tabla por tarea (Markdown), y al final un resumen de 10 líneas: cuántas palabras de basura hay en total por libro, cuántas están al final y cuántas en medio, y qué capítulos faltan o están cortados. Si algo no se puede leer, escribe «no verificado». No inventes. Máximo 250 líneas.
