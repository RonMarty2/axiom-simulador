# Pedido (solo lectura): datos para diseñar el simulacro PSA-2027 de Medicina

Antes de empezar, lee y sigue las reglas del CLAUDE.md del proyecto (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md), en especial la regla 6: los conteos se calculan, no se escriben a mano. Usa la skill `analista-temas` para contar las preguntas por área.
No edites nada. Responde en texto, con el formato de abajo. Cita archivo:línea en cada dato. Si un dato no está escrito en ningún archivo, pon «NO ESTÁ» y no lo inventes.

## A. Formato del examen PSA-2027 (Medicina, UMSS)
Fuentes: docs/psa-2027/convocatoria_MFQ.md, docs/psa-2027/CHECKLIST_PSA2027.md, docs/psa-2027/4096_p29-45_texto.txt, docs/psa-2027/LISTA_CONTENIDOS_PSA2027.txt, docs/psa-2027/PROTOCOLO_EXAMEN_INGRESO.md, docs/psa-2027/MFQ_INVENTARIO.md.
1. Materias que entran al examen y cuántas preguntas tiene cada una (o el porcentaje).
2. Tiempo total del examen.
3. Puntaje mínimo de aprobación, si hay penalización por respuesta mala y cuántas opciones tiene cada pregunta.
4. Si hay más de una prueba o etapa (por ejemplo, una prueba de conocimientos y otra psicotécnica), cuáles son.

## B. Cómo arma la app un simulacro hoy
Fuentes: src/app/simulador/**, src/lib/** (busca «simulacro», «simulador», «generar», «armar examen», «proporcion», «facultad»), data/preguntas-compartidas.json y data/practica/medicina-psa-2027-mfq.md (solo el encabezado).
5. Qué archivo y qué función arman hoy un simulacro «tipo examen» de una facultad (si existe): de dónde sacan las preguntas, cómo deciden cuántas por materia y el tiempo.
6. Si ya existe una configuración por facultad con proporciones y tiempo, di dónde está y cómo se ve la entrada de Medicina (copia literal, 30 líneas como máximo).
7. Cuántas preguntas hay disponibles hoy para Medicina por materia (área) entre el banco de exámenes pasados de Medicina (data/examenes/umss/medicina) y data/practica/medicina-psa-2027-mfq.md. Cuéntalas con el campo `area:`.

## Formato de la respuesta
Las secciones A y B con los números 1 a 7. Cada punto, 1 a 5 líneas, con su cita archivo:línea. Al final, «Huecos»: lo que falta para armar un simulacro fiel.
