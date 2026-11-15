# Bloques de audio afectados por la pieza fonética nueva (15-nov-2026, sesión 3cae36fc)

Scripts: `script_agy/` (de agy, pedido `scripts/agy/pedidos/2026-11-15-bloques-afectados.md`, 10/10 pruebas), `audible.py`, `clases.py`, `coincide.py`, `oir.py` (míos). Correr con `C:/Program Files/Python311/python.exe` pasando la ruta de `_MOTOR_AUDIO`; los míos esperan `script_agy` como `scripts/audio/` al lado (o ajustar el `sys.path`).

## Resultado
- 10.947 bloques en 50 textos `_LITERAL_TTS.md`. Con la pieza nueva cambian 8.550 (agy, cuenta espacios); **7.280 con cambio audible** (sin contar espacios ni puntuación).
- Por tipo (bloque en su peor clase): miles leídos como decimal 27; símbolos/química (Na+, K+, CO2, μm, α, →) 2.541; ligaduras «fi gura»/«fl ujo» 1.598 (solo Saladin); otros (cortes «supo- sición», «p. ej.») 1.459.
- **Escucha con Whisper (oir.txt, Calvo t4):** la voz YA lee bien α («alfa») y «p. ej.» («por ejemplo»). Lee MAL «bomba Na+ o K+ ATPasa» («sodio KATP-ASA-ATP-ASA») y «cero,un μmol o l» («0,1 milimol o litros»). Los miles no se pueden juzgar con Whisper (escribe «2,000» oiga «dos mil» o «dos coma cero cero cero»).
- **Problema serio:** en 24 de 50 capítulos el texto actual tiene distinta cantidad de bloques que la caché (`coincide.py`; ej. Calvo t7: texto 282 / audio 223; Saladin cap 1: 260/264). El texto se editó después de sintetizar, así que `parte_NNN` NO corresponde al bloque NNN del texto: borrar una parte por número rompería el capítulo. El script de agy además busca la caché con el nombre del texto; la de Saladin se llama `Morfo_Cap_NN_Saladin_LITERAL_TTS` (y `Morfo_Atlas_B_...`).
- Nada se tocó: ni textos, ni caché, ni audios.
- Opción A (cuentaA.py): 393 partes en los 26 capítulos que coinciden, con iones, μ o miles. Las que más tienen: Calvo t4 83/204, Saladin cap 24 49/169 y cap 18 43/264.

## 15-nov, después: el contenido no está limpio
- 34 de 50 textos traen al final «Lecturas recomendadas»/bibliografía (se leen citas en voz alta), «Actividad práctica» y «Preguntas de autoevaluación» con respuestas (Calvo t7: ~2.000 de 21.800 palabras; Saladin cap 5: «Guía de estudio y autoevaluación», ~1.850). No se comprobó todavía si está el libro completo.
- agy EN CURSO (tarea bxt4id7k3): inventario de secciones que no sirven + cobertura contra los PDF. Pedido `scripts/agy/pedidos/2026-11-15-inventario-contenido-audio.md`; salida en `%LOCALAPPDATA%\axiom-agy\` carpeta `*_lectura` más nueva, RESPUESTA.md.
- Si la basura está al final, se quita borrando las últimas partes del audio sin rehacer nada más.

## Inventario de agy (20261115-082510_lectura) → `inventario-agy-contenido.md`, revisado por Claude
- Cobertura: dice que están los 18 temas de Calvo y los 29 capítulos + 2 Atlas de Saladin; Calvo t2 partido en dos archivos (`Tema_02` y `Tema_02_Parte_2`). La comprobación de inicio y fin contra el PDF la resume sin pruebas para Calvo 4-18 y Saladin 2-29: tomarla como «probable», no comprobada.
- FALSO en agy: «1 banco recopilatorio de Calvo». En `_AUTOEVALUACIONES_BANCO_PREGUNTAS_MD/` de Calvo solo está el tema 18 (células madre, ya en formato Axiom). Las de Calvo 1-17 no están guardadas aparte.
- Cifras de agy (96.340 palabras sobrantes, ~10 % de 915.000) SIN comprobar. Mi conteo: hay ≥25.500 palabras desde un título «Lecturas/Bibliografía/Autoevaluación/Guía» en 20 archivos. Además hay sobrantes sin título que mi búsqueda no agarra: Calvo t4 termina en preguntas con «Respuesta correcta: c»; Saladin t17 empieza con «ESQUEMA DEL CAPÍTULO» y números de página leídos en voz alta y termina con el encabezado «CAPÍTULO diecisiete Sistema endocrino».
- PRÓXIMO: lista exacta de cortes por archivo (línea inicial y final, y qué es), comprobada leyendo cada corte. Luego guardar aparte las autoevaluaciones de Calvo 1-17 (limpias, desde el PDF, para Axiom) y recién ahí recortar.
