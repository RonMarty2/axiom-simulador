# Pedido a agy: CHECKLIST de contenidos PSA-2027 Medicina contra lo que YA tiene el simulador

Lee y sigue las reglas del proyecto: `CLAUDE.md` de la raíz del repo, y los agentes `.claude/agents/libro-audio-tts.md` y `.claude/agents/transcriptor-medicina.md` (solo para saber dónde vive cada cosa). NO decides criterio ni cambias nada: SOLO inventarías y reportas.

## Entrada
`docs/psa-2027/LISTA_CONTENIDOS_PSA2027.txt` (lista oficial del examen de ingreso PSA 2027, Medicina UMSS): Morfofunción (Saladin, capítulos listados), Educación en Salud e Investigación (Partes I, II, III con páginas), Biología Celular (Calvo, capítulos listados), Matemáticas, Física y Química (libro minedu 4096.pdf, páginas indicadas), Comprensión lectora (7 habilidades).

## Qué revisar, por CADA ítem de la lista (cada capítulo / parte / habilidad)
1. **Texto del libro**: ¿existe el texto literal? (`examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/`, `libros_extraidos/`). Nombre del archivo.
2. **Audio**: ¿hay audio? en `_MOTOR_AUDIO/_AUDIO_V2/` (nuevo) y/o `AUDIOS_MEDICINA_UMSS/` (publicado). Solo lista nombres de archivo, no abras audio.
3. **Preguntas**: ¿hay banco de autoevaluación (`_AUTOEVALUACIONES_BANCO_PREGUNTAS_MD/`) y/o preguntas en exámenes pasados (`data/examenes/umss/medicina/*.md`) de ese tema? Cuántas aprox. (cuenta por tema/etiqueta si existe; si no hay etiqueta, dilo).
4. **En la app (SaaS)**: busca en `src/`, `data/`, `public/` si ese contenido ya está cargado/visible para el estudiante (módulo, ruta, json). Ruta exacta o «no encontrado».
5. Para Matemáticas/Física/Química: ¿existe el libro minedu 4096 o su texto en el repo? ¿hay preguntas de esas áreas en `data/examenes/umss/`?
6. Comprensión lectora: ¿hay preguntas o material de esas 7 habilidades?

## Formato de la respuesta (RESPUESTA.md)
Una tabla por materia: | Ítem de la lista | Texto (sí/no + archivo) | Audio (V2 / publicado / no) | Preguntas (cuántas, dónde) | En la app (ruta / no) | Falta crear |
Al final: (a) lista corta de lo que FALTA CREAR, ordenada por materia; (b) capítulos que tenemos y NO están en la lista PSA-2027 (sobran para este examen); (c) dudas que no pudiste resolver. Cada «sí» con la ruta que lo prueba. Si no encuentras algo, escribe «no encontrado» (no supongas).
