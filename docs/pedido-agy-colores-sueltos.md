# Pedido de edición: colores escritos a mano -> variables de la app (lote 1, pantallas libres)

Usa la skill `director-arte-coherencia` (`.claude/agents/director-arte-coherencia.md`), `docs/identidad-visual.md` y `CLAUDE.md` del repo. Regla central: en la app todo color va por `var(--...)`, nunca el hex a mano. Tokens que ya existen en `src/app/globals.css`: `--error`, `--error-light`, `--warning`, `--warning-light`, `--success`, `--green`, `--green-bg`, `--bg-base`, `--bg-subtle`, `--bg-card`, `--fg-primary`, `--fg-secondary`, `--border`, `--accent`, `--accent-soft`, `--shadow-sm|md|lg`. NO crees tokens nuevos.

## Cambios exactos (solo estas líneas, en estos archivos)
1. `src/app/login/page.tsx` línea ~41: `background:"white"` -> `var(--bg-card)`; `color:"#1f2937"` -> `var(--fg-primary)`.
2. `src/app/login/page.tsx` línea ~63: `rgba(239,68,68,0.08)` -> `var(--error-light)`; `#b91c1c` -> `var(--error)`.
3. `src/app/errores/page.tsx` línea ~85: el degradé `linear-gradient(135deg, #ef4444, #dc2626)` -> `var(--error)` plano.
4. `src/app/debilidades/page.tsx` línea ~26: `#f59e0b` -> `var(--warning)`; `#ef4444` -> `var(--error)`.
5. `src/app/components/AppHeader.tsx` línea ~357: `#ef4444` -> `var(--error)`.
6. `src/app/examenes/page.tsx` línea ~63: `text-[#171545]` -> color `var(--fg-primary)` (con style o clase equivalente que ya use el archivo); línea ~118: la sombra `shadow-[0_14px_36px_rgba(24,24,70,0.08)]` -> `var(--shadow-md)`.
7. `src/app/components/BottomNav.tsx` línea ~101 y `src/app/precios/page.tsx` línea ~243: `rgba(156, 61, 28, 0.35)` -> `color-mix(in srgb, var(--accent) 35%, transparent)` (así sigue la facultad).
8. `src/app/globals.css` línea ~365: `rgba(139, 92, 246, 0.1)` (violeta) -> `var(--accent-soft)`.

## NO tocar (casilleros de exclusión)
- `AppHeader.tsx` línea ~275 (`#fbbf24`, `#a78bfa`, `#1e1b4b`), `cuenta/page.tsx` línea ~229 y `ranking/page.tsx` (`COLORES_PODIO`): son decisión de Ronald, solo repórtalos en la respuesta con la línea.
- `src/app/dashboard/**`, `src/app/simulador/**`, `src/app/practicar/**`, `src/app/page.tsx` y cualquier otro archivo no listado arriba: los trabaja otra ventana.
- Tamaños, márgenes, textos, estructura y lógica: no cambian. Solo el valor del color/sombra.

## Casilleros de aceptación (los verifica Claude con evidencia propia)
- [ ] `git diff --stat` muestra SOLO: login, errores, debilidades, AppHeader, examenes, BottomNav, precios, globals.css.
- [ ] Cada línea listada ya no contiene el hex/rgba indicado (grep).
- [ ] No hay archivos nuevos ni tokens nuevos en `globals.css`.
- [ ] `npx tsc --noEmit`, `npm run lint` y `npm test` pasan.
- [ ] Respuesta de máximo 25 líneas: por archivo, qué línea cambió y de qué a qué; y las líneas que no pudiste cambiar con el motivo.
