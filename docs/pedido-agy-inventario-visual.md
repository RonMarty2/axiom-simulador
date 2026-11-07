# Pedido de lectura (solo lectura, no edites nada): inventario de coherencia visual de las pantallas del alumno

Usa la skill `director-arte-coherencia` (lee `.claude/agents/director-arte-coherencia.md`), `docs/identidad-visual.md` y `CLAUDE.md` del repo. Esas reglas mandan; no las copies ni las reinterpretes.

## Qué leer (solo esto)
- `src/app/globals.css` (tokens `:root` y `[data-facultad]`).
- `src/app/layout.tsx`, `src/app/page.tsx` (landing).
- Las pantallas del alumno: `src/app/{login,register,onboarding,dashboard,practicar,simulador,examenes,resueltos,errores,debilidades,progreso,historial,ranking,cuenta,precios,pagar,cambiar-facultad}/**/page.tsx`.
- `src/app/components/*.tsx` (sin tests).
- NO leas `src/app/laminas`, `src/app/aprende`, `src/app/admin`, `src/app/api`, ni `node_modules`/`.git`.

## Qué buscar (cada hallazgo con archivo:línea)
1. **Color:** hex o rgb escritos a mano en JSX/CSS en vez de `var(--...)`; colores que no existen en `globals.css`; fondos oscuros dentro de la app (salvo el bloque del premio).
2. **Tipografía:** fuentes distintas de Crimson Pro (títulos, cifras) y Atkinson Hyperlegible (texto/UI); tamaños de título que cambian de una pantalla a otra para el mismo nivel (h1/h2); pesos inconsistentes.
3. **Espaciado y posición:** padding lateral de página distinto de `px-4`; anchos máximos distintos entre pantallas hermanas; botones principales en posición distinta entre pantallas parecidas.
4. **Botones y tarjetas:** estilos de botón primario/secundario distintos entre pantallas (radio, alto, color, sombra); tarjetas con bordes/sombras distintos.
5. **Texto:** voseo (podés, hacé, tenés) en lugar de tuteo; emojis; textos en inglés visibles; mayúsculas/minúsculas y puntuación inconsistentes en botones del mismo tipo.
6. **Landing (`page.tsx` y sus componentes):** secciones cuyo estilo no coincide con el resto de la app.

## Formato de respuesta (máximo 60 líneas, no la alargues)
Tabla `# | archivo:línea | categoría (1-6) | qué se ve | arreglo mínimo`. Máximo 40 filas, las más visibles primero. Al final, 5 líneas: patrón dominante de cada categoría (p. ej. «los botones primarios usan X en 9 pantallas y Y en 2»).

## Reglas de respuesta
- Cita solo lo que veas; si no estás seguro, escribe «NO VERIFICADO». No inventes líneas ni cifras.
- No cuentes totales: da ejemplos con línea; los conteos los hace un script aparte.
- No propongas rediseños; solo diferencias con la regla o entre pantallas hermanas.
