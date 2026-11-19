# astryx (meta/astryx) — evaluación 19-11-2026 (copiloto, evaluador-repositorios)

Confianza: MEDIA-ALTA (leí README, LICENSE, plugin y paquetes; CLI probado en el scratchpad el 19-11 con OK de Ronald; falta comparar en pantalla real de Axiom).

1. **Qué es.** Kit de pantallas de Meta: 150+ componentes React accesibles, temas por variables CSS, modo oscuro, plantillas, gráficos (`packages/charts`, `vega`), texto enriquecido y un CLI (`astryx build/search/component/docs`) pensado para que la IA arme pantallas desde plantillas. Trae plugin para Claude Code (`plugins/astryx`, skill de 2 KB que solo manda a usar el CLI). NO es: generador de contenido, ni sirve sin React.
2. **Licencia.** MIT (archivo LICENSE real, Meta 2026). Permite uso comercial (Axiom de pago).
3. **Salud.** 30 770 estrellas, último push 19-11-2026, no archivado. **Beta** (versión 0.7.17): la interfaz puede cambiar.
4. **Peso y dónde corre.** TypeScript, repo de 1,4 GB (la librería instalada pesa mucho menos). Exige **React 19+**. Corre en la web (Next/Vite); `packages/native` aparte.
5. **Mapa contra lo nuestro.**
   - axiom-simulador: Next 16 + React 19.2 + Tailwind 4 → **compatible** (Astryx acepta Tailwind por `className`). Toca `impeccable`, `ui-ux-pro-max` y `auditor-pantallas-movil`: hoy dan criterio de diseño; Astryx daría las piezas ya hechas (accesibles y con modo oscuro).
   - simuladorPRO: React 18 → **no compatible** sin subir de versión.
   - Materias (dossiers, exámenes, Moodle, Preguntados SCORM): no lo usan; sin efecto.
   - Centro de control (indicador .pyw): Python, sin efecto.
6. **Prueba chica (19-11 08:20, con OK de Ronald, en el scratchpad).** Hecha: proyecto vacío, `@astryxdesign/core` y `@astryxdesign/cli` **0.7.16** (la 0.7.17 del repo aún no está en npm). Resultados:
   - El buscador es por palabras y **no entiende español** («pregunta de opción múltiple…» → nada). En inglés sí: para «multiple choice quiz with countdown timer and score» no hay plantilla de quiz; propone `dashboard`, aunque sí trae las piezas sueltas `RadioList`, `ProgressBar`, `Timer`, `Stepper` y `Card`.
   - Las **plantillas** exigen el compilador **StyleX** en el proyecto. Axiom usa Tailwind 4, así que hay que configurarlo en Next. Los componentes sueltos traen CSS ya armado y no lo necesitan.
   - Al instalar, npm frenó los scripts `postinstall` de los dos paquetes y nadie los aprobó. Aun así, el CLI funcionó.
   - Falta comparar en 375 px contra la pantalla actual de Axiom: eso se hace en el piloto dentro de Axiom.
   Propuesta original del piloto: en el scratchpad, `astryx build` de UNA pantalla real de Axiom (pregunta de opción múltiple con temporizador) y compararla con la actual en 375 px con `auditor-pantallas-movil`.
7. **Costo de integrar.** Cambiar todas las pantallas de Axiom es grande y arriesgado (beta, y ya hay un estilo propio). Lo barato es probarlo en una pantalla NUEVA. Hay que instalarlo en las 2 PC (npm del proyecto) y el skill en las 3 cuentas (`conectar_central.py`).
8. **Decisión: TOMAR LA IDEA + PILOTO.** Idea: «empezar cada pantalla desde una plantilla probada, nunca desde cero» → regla en `impeccable`/`auditor-pantallas-movil`. Piloto: una pantalla nueva de Axiom con Astryx; si pasa la revisión de móvil, se decide si se usa más. No se migra lo existente.
   **Agente que mejora:** `impeccable` (Axiom): antes de diseñar, buscar una plantilla o pieza existente (Astryx si el piloto sale bien).

## Para Ronald
- 19-11: Ronald dio OK (A) a la prueba en carpeta aparte → hecha. Siguiente: piloto de UNA pantalla nueva dentro de Axiom con componentes sueltos (sin StyleX), revisado por auditor-pantallas-movil.
