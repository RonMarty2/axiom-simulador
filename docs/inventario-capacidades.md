# Inventario de capacidades de Axiom (29-oct-2026)

Sirve de vara para comparar repositorios externos: cada repo se mide contra una fila de esta tabla. Se arma leyendo la bitácora, el código y los agentes. Si algo cambia, se corrige acá.

## Qué hace hoy la plataforma y con qué

| # | Capacidad | Cómo se hace hoy | Dolor conocido |
|---|---|---|---|
| 1 | Fórmulas en pantalla | `katex` (solo render, no edita) vía `Tex.tsx` / `MathText` | Cortes de renglón dentro de fórmulas; se arregla a mano pieza por pieza (`pegado`, `salto`) |
| 2 | Animaciones de resolución paso a paso | Generadores propios en `src/app/prueba-animacion/` (17 mil líneas): fichas, fusiones, `Fusion.tsx` con framer-motion. Cada tipo escrito a mano (fracciones, cuadrática, molaridad, tiro, mruv, interés, etc.) | Cada materia nueva = un generador escrito desde cero; las cuentas se calculan con código propio y se auditan con agentes |
| 3 | Exactitud de las cuentas | Aritmética propia en TS + `resolutor-exacto` (usa sympy/Fraction en Python por Bash, a mano cada vez) | No hay una capa única: cada generador valida con su propio `validarX` |
| 4 | Unidades (m/s, mol/L, Bs) | `pegarUnidades` en `datos.ts` + texto escrito a mano en cada generador | Conversiones y tachado de unidades hechos caso por caso; "un tercio de los errores de física son de unidades" (resolutor-exacto) |
| 5 | Química (masas molares, estequiometría, óxido-reducción, moles) | Tablas y cálculo propios en `generadores-quimica.ts`, `generadores-redox.ts`, `generadores-soluciones.ts` | Tabla de elementos y reglas de oxidación mantenidas a mano |
| 6 | Figuras de examen (geometría) | `src/lib/figuras/motor.ts` + `definiciones.ts`: figuras declaradas (ángulos exactos), SVG sanitizado | Hay figuras pendientes (`docs/figuras-pendientes.md`); no hay gráficas de funciones interactivas |
| 7 | Moléculas / estructuras químicas | Nada (solo texto) | Medicina y Química piden fórmulas estructurales |
| 8 | Banco de exámenes | Markdown en `data/examenes/umss/` + parser `banco-parser.ts`; verificación contra PDF (`registro-verificacion.json`) | Transcripción PDF a `.md` con agentes, cara |
| 9 | Lecciones y láminas | TSX a mano con kit `pedagogia.tsx` / `lienzo.tsx` | Contenido escrito por agentes; sin motor de ejercicios generados |
| 10 | Práctica y simulador | `/practicar`, `/simulador`: preguntas fijas del banco | Sin ejercicios generados con números nuevos ni corrección con pistas |
| 11 | Entrada de respuestas matemáticas | Opción múltiple solamente | No se acepta una expresión escrita por el alumno |
| 12 | Agentes de calidad | `verificador`, `auditor-de-pasos`, `revisor-visual`, `auditor-pedagogico`, `auditor-figuras`, `auditor-facsimil`, `resolutor-exacto`, etc. (41 agentes en `agentes/`) | Se invocan a mano; cuestan 50 a 95 mil tokens cada uno |

## Dependencias del producto (package.json)
next 16, react 19, katex, framer-motion, supabase-js, jose. Nada de matemática simbólica, unidades ni gráficas en el cliente. Python 3.11 está disponible en la máquina de Ronald como `python` (no existe el comando `python3`); se usa para scripts.

## Ya evaluados (29-oct-2026, ver `docs/repos/`)
sympy, pint, chempy (USAR en desarrollo); smilesDrawer, Mafs (USAR, probar primero); compute-engine, kas, mathlive (solo si se aceptan respuestas escritas: Ronald dijo que no por ahora); Perseus completo, JSXGraph, hilbert.js, mathSteps (Stacktern), mathigon/textbooks (DESCARTAR). Segunda tanda: ts-fsrs, jsCAT, nerdamer, mathjs, Periodic-Table-JSON (y descartados con una línea: google/mathsteps, Algebrite, catjs-irt, pyBKT, supermemo). Calidad: playwright, axe-core, lighthouse-ci, languagetool, cspell (descartados con una línea: lost-pixel, BackstopJS, reg-suit, Argos, textlint; size-limit sin evaluar a fondo). No volver a evaluarlos.

Decisiones de Ronald (29-oct): sí moléculas dibujadas, sí gráficas de funciones, no respuestas escritas por ahora (el examen UMSS es de opción múltiple).

## Restricciones para cualquier repo candidato
- **Licencia:** Axiom cobra planes premium; hace falta licencia que permita uso comercial (MIT, Apache, BSD). CC-NC o GPL = riesgo, se reporta.
- **Peso:** la app es PWA para celulares de gama baja en Cochabamba. Un paquete que sume cientos de KB al cliente necesita justificación; en servidor o en scripts de desarrollo no hay problema.
- **Dónde corre:** cliente (alumno), servidor (Next), o herramienta de desarrollo (scripts/agentes). Un repo puede servir en un lugar y no en otro.
- **Single Source of Truth:** no clavar cifras a mano; lo que entre debe auto-calcularse.
- **Idioma:** todo texto al alumno en tuteo; si el repo trae textos en inglés, no sirven tal cual.
