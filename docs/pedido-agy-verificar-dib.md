# Pedido a agy: verificar el tokenizado de colores (solo lectura, no edites nada)

Usa la skill `director-arte-coherencia` para esta revisión. Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; el agente «director-arte-coherencia»: 10.TRABAJO_LOCAL|axiom-simulador\.claude\agents\director-arte-coherencia.md.

Agente a seguir: lee y sigue `agentes/director-arte-coherencia.md` (regla: todo color por `var(--...)` de `src/app/globals.css`).

## Qué comprobar
`git diff -- src/app/aprende` cambió 75 archivos: cada `#rrggbb` pasó a `var(--dib-<color>-<tono>)` o `var(--bg-base|--accent|...)`.
1. En `src/app/globals.css` hay 55 variables `--dib-*` y las de la tabla TW/APP de `scripts/tokenizar_colores.py`. Comprueba que CADA variable usada en `src/app/aprende/**/page.tsx` (sin archivos `*Conflict*`) está definida en `globals.css` o en `:root`.
2. Comprueba que el valor de cada variable `--dib-*` coincide con el hex que la tabla `TW` del script le asigna.
3. En el diff, ¿hay alguna línea cambiada que NO sea un reemplazo de color (texto, números, estructura)? Cuenta y lista.
4. Cualquier clase de Tailwind con valor arbitrario y color introducida: lista.

## Formato de la respuesta
Cuatro secciones numeradas 1 a 4. Cada una: OK o la lista exacta (archivo:línea, qué pasa). Sin opiniones, solo evidencia.
