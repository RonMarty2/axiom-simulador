# Mejoras obligatorias para las otras facultades (se anotan mientras se cierra Medicina)

Regla de Ronald (13-nov-2026): la prioridad es Medicina, pero todo lo que se descubre ahí y también debe corregirse en las demás se anota aquí, sin olvidarlo. Al cerrar una, marcar la fila.

| Facultad | Qué falta | Origen | Estado |
|---|---|---|---|
| Todas | Ficha de formato de examen (áreas, pesos, preguntas, minutos) en lugar de UNA config por facultad; simulacro mixto/predictivo y práctica deben leerla | docs/plan-formatos-examen.md | pendiente (Medicina primero) |
| Todas | Casilla «Días al examen» en el dashboard: agregar `fecha_examen` en data/facultades.json cuando salga cada convocatoria; sin fecha no se muestra nada | dashboard 13-nov | listo el mecanismo; faltan fechas |
| Todas | Rotular «estimado» toda cifra (preguntas, minutos, pesos) que la convocatoria no publique | aviso de /practicar solo para Medicina | pendiente en las demás |
| Económicas | Config dice 100 preguntas/180 min/3 áreas; los exámenes reales tienen 9-24 preguntas, 60-70 min; 2025 sin Historia. 7 formatos distintos | inventario-formatos-examen.md | pendiente |
| Ingeniería | 23 formatos (muchos casi iguales: agrupar). Los parciales de curso (30-42 preguntas, 130-150 min) no encajan con la config de admisión (20 preguntas, 5 áreas de 20 %) | inventario-formatos-examen.md | pendiente |
| Derecho | No existe data/examenes/umss/derecho: sin banco; el simulacro no tiene qué armar | inventario-formatos-examen.md | pendiente |
| Todas | Verificación contra el original: Económicas 0 de 10, Medicina 0 de 5, Ingeniería 74 de 139 | registro-verificacion.json | pendiente |
| Todas | Dashboard: texto «Postulas a ... Sigue practicando» está en voseo/mezcla; revisar tuteo | informe del agente 13-nov | pendiente |
| Todas | Dashboard sin avance por área (no existe agregación por área del alumno) | informe del agente 13-nov | pendiente; en Medicina primero |
| Todas | Vistas de la casilla «Días al examen» a 360 px y escritorio (solo se vio en tablet) | regla 9 | pendiente |
