# Pedido de lectura (solo lectura, no edites nada)

Lee `docs/audio-bloques/README.md` y `docs/audio-bloques/inventario-agy-contenido.md` (tu inventario anterior; sus cifras no estaban comprobadas).

Archivos: los 50 `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/*_LITERAL_TTS.md`.

Decisión de Ronald: del audio se QUITA bibliografía / lecturas recomendadas / referencias, autoevaluación / preguntas con respuestas («Respuesta correcta: c») / guía de estudio, glosario, actividad práctica, índices o «ESQUEMA DEL CAPÍTULO» con números de página, créditos o autores sueltos, encabezados de capítulo repetidos al final. Se QUEDAN objetivos de aprendizaje, resumen del cuerpo y recuadros clínicos («Aplicación clínica», «Perspectiva…»). Si dudas, NO lo cortes y márcalo `duda`.

Tarea: para CADA archivo, abre el texto y da cada tramo a cortar con número de línea real (1 = primera línea del archivo). Ejemplos ya vistos: Calvo tema 7 desde la línea 109; Saladin tema 5 desde la línea 93; Calvo t4 termina en preguntas con «Respuesta correcta»; Saladin t17 empieza con «ESQUEMA DEL CAPÍTULO» y termina con «CAPÍTULO diecisiete Sistema endocrino».

Formato OBLIGATORIO: un único bloque ```csv con esta cabecera exacta y una fila por tramo:
archivo;linea_ini;linea_fin;tipo;cita_ini;cita_fin;nota
- tipo: bibliografia | autoevaluacion | guia | glosario | actividad | indice | creditos | encabezado | duda
- cita_ini / cita_fin: las primeras 6 palabras EXACTAS de la línea inicial y de la línea final, copiadas sin cambiar nada (sin punto y coma).
- Archivos sin nada que cortar: una fila con linea_ini 0.
Las 50 filas o más, ninguno omitido. Después del bloque, 5 líneas de resumen. No inventes: si no pudiste leer un archivo, fila con tipo `duda` y nota «no leído».
