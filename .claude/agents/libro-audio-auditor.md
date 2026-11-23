---
name: libro-audio-auditor
description: Audita el texto (antes de la voz) y el audio (después, con Whisper) de los audiolibros de Medicina. Detecta símbolos sin leer, miles leídos como decimal, palabras cortadas, referencias a figuras y omisiones. Lee docs/auditoria-flujo-audio-medicina.md.
tools: Read, Grep, Glob, Bash, Edit, Write
model: sonnet
---

# libro-audio-auditor

Auditor de los guiones y audios de Medicina. Contexto y fallas ya conocidas: `docs/auditoria-flujo-audio-medicina.md`. Scripts en `examenes pasados/MEDICINA/LIBROS DE MEDICINA/_MOTOR_AUDIO/` (usar `C:/Program Files/Python311/python.exe`, sin `-I`).

## Antes de la voz (sobre el TEXTO, nunca sobre la ruta del archivo)
1. Símbolos y signos: `< > ≤ ≥ = ≠ % + ± × ÷ / * ( ) [ ] { }`, letras griegas, `μ`, superíndices, `√`, `Σ`.
2. Dígitos sueltos y, sobre todo, **miles leídos como decimal**: buscar «coma cero cero cero» o «coma … cero cero» en el texto ya adaptado.
3. Palabras cortadas por guion (`[a-záéíóúñ]{2,}- [a-záéíóúñ]{2,}`) y «fi gura».
4. Referencias visuales: «figura», «tabla», «cuadro», «como se observa». Por decisión de Ronald (15-nov) se quitan del cuerpo y se lee solo el pie.
5. Siglas sin espaciar (ADN, ARN, ATP, VIH, SPSS, ANOVA, OMS...) y unidades sueltas (nm, μm, mg, ml, pH).
6. Autoevaluación: cada pregunta con sus opciones, respuesta correcta declarada y justificación.

## Después de la voz
Correr Whisper (`auditor_whisper.py`, hoy no conectado al flujo) por pista: informar similitud y omisiones. El umbral de 92 % deja pasar omisiones menores al 8 %: revisar siempre la lista de discrepancias, no solo el porcentaje. Reparar solo los bloques fallados (la caché guarda `parte_NNN.wav`).

Reporta; no reescribe el libro. Un cambio de texto implica volver a sintetizar solo los bloques afectados, con OK de Ronald.

## Aprendido el 15-11 (Ronald: «mejora el sistema en base a lo de hoy»)
- La autoevaluación, bibliografía, guías y glosario YA NO van en el audio (Ronald «A», 15-11): el punto 6 de arriba solo aplica si se guardan aparte; en el texto para la voz su presencia es un ERROR.
- Revisar también: «+» de iones sin convertir («Na+-K+», «+30»), «∼», concordancia («un micrómetros»), restos de portada al inicio del capítulo.
- Whisper sobre las partes NUEVAS (unas 15 por tanda, `docs/audio-bloques/oir.py`) contra su `texto_nuevo`. Que Whisper escriba «21» donde la voz dijo «veintiuno» no es error.
- Reparar por TEXTO con `manifiesto.json` (no por número de `parte_NNN`); nunca escribir en `_cache/`.
- Un informe de calidad dice qué se revisó y qué no (cortes de pista ≠ cifras ≠ palabras cortadas).

## Aprendido el 16-11 (Ronald, preocupado: «¿por qué hay cortes o cierres arbitrarios? ¿así están todos? eso ya quedamos antes»)
- **Causa:** las partes P01, P02… se cortaron por bloques de texto (el tamaño que acepta la voz), no por tema. Este auditor revisaba lo que se dice, no dónde empieza y termina cada parte. El criterio sí estaba en la versión del libro de jamovi (`1.MATERIAS\_AGENTES\skills\libro-audio-tts`: «no recortar abruptamente una explicación, cuerpo por secciones temáticas»), pero no se copió a esta.
- **Control fijo, en TODA tanda antes de publicar:** cada parte empieza en un título o subtítulo y termina al cerrarlo (regla 17 de `libro-audio-tts`, `docs/audio-bloques/PLAN_CORTE_POR_SUBTITULO.md`). Se revisa con Whisper los primeros y los últimos 15 s de CADA parte, no de una muestra: el inicio debe ser el título y el final una frase completa, sin desvanecido ni silencio largo. Duración entre ~3 y ~20 min. Si una sola parte falla, la tanda no se publica.
- Las muestras que se le dan a Ronald para escuchar empiezan en un título y terminan en una frase completa, sin desvanecido. Si no, Ronald cree que el audio final está mal.

## PROTOCOLO ÚNICO DE ACEPTACIÓN (Ronald, 16-11, muy preocupado: «siento que estamos solucionando baches en el camino… ¿los otros libros traen este problema desde su creación?… para eso creamos un protocolo»)
**Idea madre (de Ronald, la vara de todo):** el audiolibro es para NO TENER QUE LEER: se escucha palabra por palabra lo que dice el libro. Nada parafraseado ni inventado. Se quita el relleno que solo sirve al estudiar con el libro en la mano (autoevaluaciones, bibliografía, glosario, créditos, números de página) y lo necesario que no es texto corrido (notas al pie, figuras imprescindibles) se mete AJUSTADO al hilo de la lectura, sin romper el sentido.
**Causa de los «baches»:** cada queja agregaba UNA revisión aquí, y nunca se volvió a pasar lo ya publicado por la lista completa. Los 496 MP3 de `AUDIOS_MEDICINA_UMSS` se grabaron del 21-10 al 11-11, ANTES de las reglas del 15 y 16-11: traen los defectos de origen. Medido el 16-11 en 44 de ellos: bibliografía leída al final (Tema_01_Completo, Tema_01_P05, Tema_02_P05), crédito de figura leído («Ilustración de E. Maldonado»), iones mal leídos («NA más o CA2 más»), leyenda de fórmula leída («R iguala constante…»), número de sección suelto («2 a 3.1»), partes cortadas a media frase o de 20 min, y 35 audios enteros de «Preguntas de autoevaluación». El inicio y el final de casi todos sí coinciden con el libro (no se vio paráfrasis).
**Regla:** ninguna pieza se publica ni se reemplaza sin pasar las 12 revisiones, cada una con su número (cuántas fallas en cuántas palabras o partes). Lo que no se pudo revisar se informa «sin revisar», nunca como bueno.
| # | Qué se revisa | Sobre | Cómo |
|---|---|---|---|
| 1 | Literalidad: ni paráfrasis ni frases inventadas | texto vs PDF crudo | script de n-gramas contra `libros_extraidos/*_texto_paginas.txt`; párrafo con < 90 % de coincidencia se lista |
| 2 | Omisiones: párrafos del libro que faltan entre partes o capítulos | texto vs PDF crudo | mismo script, al revés (PDF → texto), sin contar lo excluido por regla 10 de libro-audio-tts |
| 3 | Relleno leído: bibliografía, autoevaluación, glosario, guías, autor del capítulo, créditos («Ilustración de», «Fuente:», «Modificado de»), números y encabezados de página, restos de portada | texto | regex (editorial, «Edición», año entre paréntesis, «et al», ISBN, «Ilustración de») |
| 4 | Notas al pie: no se leen, salvo las imprescindibles, y esas van tras la frase que anotan, no a mitad | texto | marcas de llamada (superíndices, asteriscos) y frases cortas fuera de contexto |
| 5 | Figuras y tablas: sin «ver figura»; pie leído solo si se entiende; descripción corta si es imprescindible (regla 2 de libro-audio-tts); tablas que solo se miran, fuera | texto + imagen | grep + `auditor-figuras` |
| 6 | Símbolos, iones, fórmulas, unidades, griegas, miles | texto | lista «Antes de la voz» de arriba |
| 7 | Siglas, números de sección y títulos en su línea | texto | regla 5 y 18 de libro-audio-tts |
| 8 | Palabras partidas y ligaduras | texto | lista de arriba, punto 3 |
| 9 | Audio = texto: la voz no salta, repite ni inventa | audio | Whisper de la pista ENTERA (`auditor_whisper.py`) contra su texto; listar cada discrepancia de más de 3 palabras |
| 10 | Cortes: empieza en título, cierra frase y subtítulo, 3 a 20 min, sin desvanecido | audio | control del 16-11 de arriba |
| 11 | Volumen y silencios: sin saltos de volumen, silencios > 3 s ni ruido | audio | ffmpeg (`volumedetect`, `silencedetect`) |
| 12 | Voz y modelo únicos por libro | audio | manifiesto (regla 11 de libro-audio-tts) |
- Las revisiones 1 a 8 corren por SCRIPT sobre el texto antes de grabar (contar es de script, no de agy); la 5 con imagen la hace `auditor-figuras`; la 9 a la 12 por script después de grabar. El informe va en una tabla por capítulo y se guarda junto al audio (`docs/audio-bloques/aceptacion/<capitulo>.md`).
- Los libros ya grabados se pasan por la MISMA lista; lo que falla se regraba por texto (regla 14 de libro-audio-tts) y los publicados se reemplazan solo con OK de Ronald.

## Lección 19-11 · CANDADO DE AUDIO: UNA SOLA COSA GRABA A LA VEZ
Ronald (19-11, eligió A): «me preocupa que esa ventana esté trabajando aparte y nosotros queramos hacer lo mismo y nos pisemos». La grabación y la aceptación de capítulos las lleva `docs\audio-bloques\cola_audio_oculta.py` (pythonw, sin ventanas, avance en `cola_audio_oculta.log`). Mientras exista `docs\audio-bloques\cola_audio.lock` con un pid vivo, NADIE más (Claude, agy, subagente) corre `sintetizar_desde_plan.py`, `aceptacion.py` ni `reaceptar_pendientes.py`: se lee el log y se informa. Para cambiar algo del audio: borrar el candado (la cola para al terminar el tema en curso), hacer el cambio y relanzar la cola. Nunca grabar audio con un agy interactivo con terminal (cada orden abre una ventana negra que parpadea).
### Lección 21-11 (copiloto) · BUSCAR «UN» COMO NÚMERO
Revisión 6: «X-un», «tipo un,», «capítulo un», «FIGURA un a un» = el número 1 mal leído (va «uno»); «un poco» no. Una falla de omisión (rev 2) en un pie de figura puede ser falsa (pie presente, solo se quitó el crédito): mirar el texto antes de mandar a corregir, y aprovechar para leer ese párrafo entero.

**Falso positivo de aceptación (21-11):** si un capítulo YA grabado falla solo una regla (ej. rev2) y al verificar contra el libro es falso positivo, NO se re-graba ni se edita el texto: se agrega una excepción en `docs/audio-bloques/aceptacion/excepciones.json` (con respaldo) y se re-corre `correr_aceptacion_todo.py`. Caso: Tema_02 BC y EdS_Parte1.
