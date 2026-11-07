# Pedido agy: revisar artefactos del examen final de Medicina 2023-24 (solo lectura)

Lee el CLAUDE.md del proyecto y `agentes/transcriptor-medicina.md`. NO ejecutes comandos, no edites archivos.

Archivo a revisar: `data/examenes/umss/medicina/2023-examen-final-curso-basico-2023-2024.md` (100 preguntas, la 100 va a `faltantes`; este archivo salió de un extractor de PDF que a veces pega texto de una pregunta dentro de otra).

Busca, pregunta por pregunta:
1. Enunciados o afirmaciones con texto que no les corresponde (otra pregunta pegada, encabezados como «II.-», «PREPARATORIA», «WhatsApp», «A continuación se presentan...», una numeración «NN:» a mitad de línea).
2. Preguntas con una cantidad de afirmaciones distinta de la esperada (preguntas 1 a 50: 2 afirmaciones; 51 a 100: 3).
3. Palabras cortadas o unidas por la extracción (ej. «lasuperficie»), y voseo en la explicación (debe ser tuteo).

Formato de la respuesta (en el mensaje final, sin escribir archivos): lista `pregunta N: problema (cita corta)`. Si no hay problemas, di «sin hallazgos». No reescribas nada.
