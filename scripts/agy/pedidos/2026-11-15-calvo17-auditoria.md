# Pedido: auditar la lección nueva Calvo 17 (Respuesta inmunitaria) ANTES de pasarla al proyecto. SOLO LEER y reportar; NO edites nada.

Lección a auditar: `C:/Users/lmigu/AppData/Local/axiom-agy/20261115-195258_codigo/repo/src/app/aprende/bcm-respuesta-inmunitaria/page.tsx` (2366 líneas, 10 escenas, 3 o más diagramas SVG).
Fuente que MANDA: `C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/Tema_17_Biologia_Celular_LITERAL_TTS.md` (texto adaptado a voz: números en palabras, «coma» por decimal).

Lee y aplica estas dos recetas del repo: `.claude/agents/auditor-pedagogico.md` (errores de contenido primero, después lagunas, tuteo, MathText, respuestas repartidas) y `.claude/agents/auditor-figuras.md` (SOLO la parte de dibujo: coordenadas calculadas, etiquetas que se pisan o salen del viewBox, texto del SVG que contradice el texto de la escena, que quepa en 360 px).

## Qué verificar, en este orden
1. **Datos que NO están en el capítulo** (lo más grave): por cada cifra, nombre propio, año, clasificación o sigla (kDa, Jenner 1796, Behring y Kitasato, Köhler y Milstein, ELISA, Western blot, ZAP-70, T-bet, etc.), busca la frase en el .md y anota número de línea. Si NO está, márcalo «FUERA DEL CAPÍTULO» (regla de Ronald: para Medicina solo lo del libro).
2. Errores de contenido: cada AutoCheck, ¿la clave es correcta según el capítulo? ¿las letras correctas están repartidas (no todas iguales)? ¿alguna escena contradice a otra?
3. Siglas sin expandir la primera vez (también en los SVG), voseo, `<ul>`/`<div>` dentro de `<Parrafo>`, coma decimal, matemática fuera de `<MathText>{"$...$"}`.
4. Figuras: lista cada SVG, si usa coordenadas con nombre o a ojo, etiquetas que se pisan o quedan fuera del viewBox, y si lo que dice el dibujo coincide con el texto.
5. Lagunas pedagógicas (criterios 1 a 6 de la receta): cita corta + propuesta de reemplazo en tuteo.
6. Largo: ¿hay escenas con demasiado contenido para un alumno que ve el tema por primera vez? Propón qué recortar SIN salirse del capítulo.

## Formato de respuesta (texto, en tu respuesta final, no archivos)
Tabla por hallazgo: nº | gravedad (ERROR / FUERA DEL CAPÍTULO / LAGUNA / FORMA) | línea del page.tsx | cita corta | qué está mal | corrección propuesta exacta. Al final: conteos por gravedad (contados, no de memoria) y los 3 hallazgos más graves.
