# Pedido a agy: correr controles de 6 lecciones (solo ejecutar y reportar)

Usa la skill ejecutor-agy: lee y sigue `C:\Users\lmigu\SynologyDrive\12.NUBES\_AGENTES_CENTRAL\skills\ejecutor-agy\SKILL.md`. Rol: albañil. No decides criterio ni editas nada.

Corre en la copia del repo, sin modificar archivos:
1. `npx eslint` sobre estos 6 archivos: `src/app/aprende/gases-ideales/page.tsx`, `trabajo-energia`, `ecuaciones-segundo-grado`, `logaritmacion`, `razones-trigonometricas`, `electrostatica` (cada uno `page.tsx`). Lista TODOS los `error` (no los warning) con archivo:línea y mensaje.
2. `npx tsc --noEmit`: lista errores en esos 6 archivos.
3. `npm test`: copia las líneas `ℹ tests`, `ℹ pass`, `ℹ fail` y los nombres de los tests que fallen.

Formato de respuesta: tres bloques (LINT, TSC, TESTS), cada uno con «OK» o la lista literal. No corrijas nada.
