# Recorrido de la app Rindex en el celular (6-nov-2026)

Hecho con `adb` (depuración USB) sobre el celular de Ronald, cuenta de Ronald, versión 0.13.0+10. Solo se miró: no se compró, no se guardó nada y no se empezó ningún simulacro (habría quedado registrado en su cuenta). Las capturas están en la carpeta temporal de la sesión y no se suben al repo porque muestran correo y nombre.

Completa `docs/informe-rindex-2026-11-06.md` (análisis del APK). Donde el informe decía "el precio no es público", ahora se sabe.

## Lo que hay, pantalla por pantalla

- **Inicio:** saludo, racha (llama con número), campana. Una sola tarjeta grande "Siguiente paso" (hoy: "Repasa tus 12 errores"). Tarjeta "Tu meta" (universidad y facultad, fecha de examen opcional, "Plan de hoy 13/20" con barra). Lista "Formas de practicar": Simulacro, Por área, Repaso de errores (con contador), Flashcards. Luego "Tu progreso" (promedio, mejor, simulacros) y "Recientes".
- **Practicar:** tres atajos (Por área, Repaso de errores, Flashcards), un simulacro armado "para tu meta" (40 preguntas de tus 16 exámenes, 60 min), buscador y filtro por institución sobre el banco de exámenes. Cada examen marca "Para tu meta".
- **Detalle de examen:** preguntas, áreas, duración sugerida; "Simulacro de ranking" (50 preguntas, 50 min, corrección al final, es el único que cuenta para el ranking); botón "Configurar simulacro".
- **Configurar simulacro:** modo Alternativas / Respuesta abierta (candado), cantidad de preguntas con control y barra, Corrección Al instante (candado) / Al final, "Más opciones" (estrategia, duración), "Reglas del simulacro". Pie: "Práctica libre · no cuenta para el ranking".
- **Por área:** 3 pasos; áreas separadas en "De tu examen" y "Todas las áreas", con cantidad de preguntas y de temas.
- **Repaso de errores:** lista de preguntas falladas con "Fallaste 1 vez / Vista 1 vez", muestra la correcta y "Ver las otras 4 opciones"; botón "Practicar errores".
- **Flashcards:** mazos por materia (Computación, Física, Lenguaje, Matemáticas...), de 6 a 30 tarjetas cada uno; filtros "Con pendientes / En curso / Sin empezar"; "Aprender tarjetas nuevas".
- **Progreso:** promedio, mejor, precisión; "Preparación para UMSS" ("Dominas 0 de N preguntas", por área, y comparación "postulantes a UMSS 10 %" con cuántos postulantes hay); evolución 30 días (90 con candado); "Tu posición" (ranking); pestañas Por área / Por examen / Historial; cada área con etiqueta "Débil / Pocos datos" y "0 de 80 correctas".
- **Ranking:** por examen. Hace falta **3 simulacros de ranking en 2 días distintos** para tener posición; mientras tanto "En evaluación". La nota es "ajustada de los últimos 5 simulacros".
- **Privacidad del ranking:** apodo generado (recomendado), nombre y foto, o anónimo; vista previa "Así te ven".
- **Perfil:** Mi plan, Mi meta, Privacidad del ranking, Ajustes, Centro de ayuda, Acerca de, Cerrar sesión.
- **Ajustes:** tema claro/oscuro, tamaño de texto, densidad visual, y notificaciones por tipo (recordatorios de práctica y racha, cuenta regresiva del examen, preguntas nuevas para tu meta, resumen semanal).
- **Premium:** "Practicar como en el examen real es gratis. Premium suma lo que te ayuda a entender y mejorar". Precios (pago único, no se renueva, pago con Google Play): 1 mes Bs 29,99; 3 meses Bs 59,99 (recomendado); 6 meses Bs 119,99; 1 año Bs 149,99.

## Qué tiene Rindex que Axiom no mostró (para decidir, no es tarea)

1. Una sola tarjeta de "siguiente paso" en el inicio que dice qué hacer hoy.
2. Ranking que solo cuenta simulacros de ranking (corrección al final) y exige 3 en 2 días distintos: dificulta trampa y rrachas de suerte.
3. Comparación del alumno con otros postulantes de su misma universidad en las mismas preguntas.
4. Flashcards con repetición espaciada (no encontré equivalente en el código de Axiom).
5. Plan de hoy con barra (13/20) y cuenta regresiva a la fecha del examen.
6. Notificaciones configurables por tipo, y resumen semanal.
7. Paquetes por periodo (1, 3, 6, 12 meses) sin renovación.

## Dónde Axiom está mejor o Rindex flaquea

- Las áreas del banco de Rindex son gruesas: un examen entero queda en un solo área "General" (4848 preguntas en un balde). Axiom tiene temas, lecciones y láminas.
- No hay lecciones ni explicaciones paso a paso visibles en su menú; Axiom enseña, Rindex solo practica.
- Precisión "1 %" y "0 % dominado" se muestran en frío; con poco uso la pantalla Progreso desanima.
- No se vio ninguna pantalla del examen en curso (no se empezó uno). Pendiente si Ronald quiere comparar el cronómetro y la navegación.
