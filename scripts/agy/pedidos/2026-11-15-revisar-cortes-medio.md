# Pedido de lectura (solo lectura, no edites nada)

Usa la skill `libro-audio-auditor`. Lee y sigue estas reglas antes de empezar: C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/CLAUDE.md y el agente C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/.claude/agents/libro-audio-auditor.md.

Hay una lista de cortes para el audio de Medicina en `C:/Users/lmigu/AppData/Local/Temp/verif.txt` (una línea por tramo: archivo, líneas ini-fin/total, tipo, palabras, posición). Los textos están en `C:/Users/lmigu/SynologyDrive/10.TRABAJO_LOCAL/axiom-simulador/examenes pasados/MEDICINA/LIBROS DE MEDICINA/_TEXTO_LITERAL_VERIFICADO/`.

Regla de Ronald: se QUITA bibliografía, autoevaluación, guía de estudio, glosario, actividad práctica, índice/esquema con páginas, créditos y encabezados repetidos. Se QUEDAN objetivos, cuerpo, resumen y recuadros clínicos.

Tarea: para CADA línea de verif.txt marcada «(medio)» o «(inicio)», y para cualquier tramo de tipo `duda`, abre el texto en esas líneas (y 2 líneas antes y después) y responde:
- ¿El tramo contiene SOLO material a quitar? (sí / no)
- Si no: qué parte es cuerpo del libro (cita de 6 palabras exactas) y dónde debería empezar o terminar el corte (cita exacta).
- Si el corte empieza o termina A MITAD de una línea: la cita exacta de las 6 palabras justo antes del corte (lo último que se queda).

Formato: un bloque ```csv con cabecera `archivo;lineas;solo_basura;cuerpo_dentro;cita_ultima_que_queda;nota`, una fila por tramo revisado. Al final 5 líneas de resumen. No inventes; si no pudiste leer algo, «no leído».
