# Pedido de auditoría integral de plataforma · Sistema, presentación y lógica de aprendizaje (Medicina PSA 2027)

REPITE PORQUE: la corrida anterior (`20261124-153713_auditoria`) se cortó por `print_timeout` al suspenderse la PC entre 15:37 y 19:25 y no entregó el informe.

Lee y sigue estas reglas antes de empezar:
- `C:\SynologyDrive\SynologyDrive\axiom-simulador\CLAUDE.md`
- Usa las skills/agentes del proyecto: `probador-app` (`agentes/probador-app.md`), `auditor-pedagogico` (`agentes/auditor-pedagogico.md`), `auditor-pantallas-movil` (`agentes/auditor-pantallas-movil.md`) y `disenador-refuerzo` (`agentes/disenador-refuerzo.md`).

## Reglas duras
- MODO SOLO LECTURA (`--solo-texto`). NO edites ni crees archivos.
- Lee EXCLUSIVAMENTE las rutas exactas de abajo. Cada hallazgo debe citar archivo y línea real (cero suposiciones).
- Entrega tu informe directamente en la respuesta final, en español, máximo 90 líneas.

## Objetivo de Ronald (24-nov-2026)
Enfocarnos 100 % en la **plataforma, el sistema, la presentación y la lógica que garantice que un alumno de Medicina realmente APRENDA** y apruebe la PSA 2027 (examen 19-ene-2027).

## Archivos exactos a leer
1. `src/app/dashboard/page.tsx`
2. `src/app/aprende/page.tsx`
3. `src/app/aprende/_components/LeccionShell.tsx`
4. `src/app/practicar/page.tsx`
5. `src/app/simulador/[simId]/page.tsx`
6. `src/app/simulador/[simId]/resultados/page.tsx`
7. `src/app/errores/page.tsx`
8. `src/app/debilidades/page.tsx`
9. `src/app/components/MathText.tsx` (si no existe, busca en `src/components/MathText.tsx`) y las reglas `.katex` en `src/app/globals.css`

## Qué auditar y cómo estructurar la respuesta (4 bloques)

### 1. Circuito de aprendizaje (¿garantiza que el alumno aprenda?)
Evalúa con evidencia de código:
- **Guía diaria (`/dashboard`):** ¿le dice al alumno exactamente qué hacer hoy según sus debilidades y los días que faltan al examen, o queda genérico?
- **Progreso en `/aprende` y `LeccionShell`:** ¿se guarda/muestra qué lecciones completó el alumno por área? Al terminar una lección, ¿lo conecta a practicar preguntas de ese tema o queda suelto?
- **Ciclo error → estudio (`/resultados`, `/errores`, `/debilidades`):** cuando el alumno falla una pregunta o tiene un área débil, ¿lo lleva directo a la lección o lámina correspondiente para corregir el concepto?

### 2. Lógica y bugs reales detectados
- Revisa si sigue vivo el bug de fórmulas KaTeX en línea con scroll horizontal (ej. `.katex` con `overflow-x: auto` en `globals.css` o `MathText.tsx`) y si a 360 px los rótulos de hojas en `simulador/[simId]/page.tsx` se pegan.
- Detecta cualquier otro bug real de lógica, estado, tuteo/voseo o UX que corte el flujo de estudio en Medicina.

### 3. Presentación y claridad visual (360 / 800 / 1280)
- Problemas concretos de jerarquía, densidad, textos confusos o fricción en móvil/tablet/web en estas 8 pantallas.

### 4. Top 6 mejoras concretas ordenadas por impacto en aprendizaje
Tabla: `# | Mejora | Por qué garantiza más aprendizaje | Archivo(s) exactos | Esfuerzo (Bajo/Medio)`.
