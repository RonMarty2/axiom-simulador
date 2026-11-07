# Plan visual de AXIOM (coherencia gráfica: colores, textos, páginas, posiciones)

Creado el 07-11-2026 (ventana 86d9e903 del taller). Pedido de Ronald: que la landing y todas las pantallas tengan sentido visual y coherencia, sin que se rompa nada. NO es marketing por ahora. Criterio de Ronald: «si mañana quiero otro color, ¿será fácil?» -> todo color por `var(--...)` de `src/app/globals.css`, un solo lugar (ya escrito en `.claude/agents/director-arte-coherencia.md` y su espejo `agentes/`).

## Agentes que se usan
`director-arte-coherencia` (manda), `revisor-visual`, `auditor-pantallas-movil`, `optimizador-landing`, `disenador-refuerzo` (solo el bloque del premio). Falta crear `auditor-anti-slop` (reglas sueltas: sin emojis, sin texto dentro de imágenes de IA, sin franjas vacías, sin cifras inventadas).

## Reglas permanentes
- Toda mejora visible se muestra a Ronald en su TABLET (USB) ANTES de subir a main. Se piensa para escritorio, celular (320/360/412) y tablet.
- No tocar inicio, simulacro, zonas táctiles: los trabaja la ventana `cf89ae39` (`simulador/**`, `dashboard/**`, `practicar/**`, `page.tsx`).
- agy ejecuta, Claude arquitecto y revisa contra casilleros; si agy se sale del pedido, Claude hace la cirugía mínima. Cuenta de hoy: agy dañó un comentario (caracteres japoneses) y reescribió textos no pedidos en `examenes/page.tsx` -> se hizo a mano.

## Hecho (07-11) — TODO SIN COMMITEAR, en el árbol de trabajo
1. Inventario visual por agy (`docs/pedido-agy-inventario-visual.md`): 37 hallazgos, 20 verificados por grep (todos ciertos).
2. 11 colores sueltos -> variables, a mano, en: `login`, `errores`, `debilidades`, `components/AppHeader.tsx` (línea ~357), `examenes`, `components/BottomNav.tsx`, `precios`, `globals.css` (línea ~365: foco violeta -> `var(--accent-soft)`).
3. Paleta de dibujos: 55 variables `--dib-<color>-<tono>` en `globals.css` (después de `--warning-light`), con el MISMO valor que el hex anterior. Reemplazados 952 hex en 75 lecciones de `src/app/aprende/**` con `scripts/tokenizar_colores.py <carpeta> --aplicar` (ensayo sin el flag). Quedan 0 hex en `aprende`. `laminas/` ya no tenía.
4. Comprobado: `tsc` 0 errores, lint 0 errores, `npm test` 614/614. En navegador real `var(--dib-amber-600)` = `rgb(217,119,6)` = el `#d97706` anterior.
5. `agentes/` y `.claude/agents/` sincronizados con `node scripts/sincronizar-agentes.mjs` (una prueba lo exige).

## CUIDADO al commitear
El árbol tiene cambios de OTRAS ventanas (más de 90 archivos). Mi parte son: los 8 archivos del punto 2, `globals.css`, `director-arte-coherencia.md` (+ espejo en `agentes/`), `scripts/tokenizar_colores.py`, `docs/pedido-agy-*.md`, `docs/plan-visual-axiom.md` y los .tsx de `src/app/aprende/**` donde solo cambian colores. Cuatro lecciones también las tocó la ventana de agy-ediciones (`ciclo-contable`, `analogias-verbales`, `bcm-expresion-genica`, `plan-redaccion`): revisar con `git diff` que no se mezclen. No commitear con `git add -A`.

## Falta (en este orden)
1. **Pruebas pesadas:** `npm run test:pantallas` quedó cortada por poca memoria. Línea base ANTES de mis cambios: 24 pasan y 2 fallan (`simulacro-por-facultad` a 343 y 375 px, es del simulacro, no de colores). Debe dar igual. Correr sola, con pocas ventanas abiertas.
2. **Capturas antes/después** de 4-6 lecciones (iguales por construcción) y de `login`, `errores`, `debilidades`, `examenes`, `precios` (cambian apenas: rojos `#ef4444/#b91c1c` -> `var(--error)` `#b3341f`). Mostrar a Ronald en la tablet; recién ahí commit y subir.
3. **Lote 2 de colores (pantallas del alumno, quedan ~110):** `ranking`(18) `cuenta`(17) `login`(8) `AppHeader`(7) `dashboard`(6) `FiguraExamen`(5) `Header`(4) y ~20 más de 1-3. `dashboard`/`practicar`/`simulador`/`page.tsx` esperan a `cf89ae39`. Decisión de Ronald pendiente: colores del podio (`ranking`), degradé dorado de `cuenta` (~229), `AppHeader` ~275. Canvas (`Reconocimiento`, `pagar`, `prueba-animacion/Fusion`): `var()` no sirve en canvas, se resuelven con `getComputedStyle`.
4. **Títulos:** `examenes` y `simulador/[simId]` sin Crimson Pro; h1 de 27 a 40 px (`practicar` 27, `dashboard` 34). **Botones:** radio 4 en `dashboard`, 12, 14. **Anchos:** 680 a 1240 px; márgenes laterales 12/20/24 en vez de 16. **Textos:** emoji `⏱` en `page.tsx` ~309, `PRECIO_CAMBIO_BOB = 50` clavado en `cambiar-facultad` ~13 (importar de `@/lib/precios`), «click» -> «toca» en `resueltos` ~188.
5. Crear `auditor-anti-slop` y unificar la línea gráfica en una página.
6. Medida de salud: `grep -rEoh '#[0-9a-fA-F]{6}' --include=*.tsx src/app` (sin admin/api/prueba) debe tender a 0; al cerrar cada lote decirle a Ronald cuántos quedan.
