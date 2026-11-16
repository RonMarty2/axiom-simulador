# Pedido agy · criterio · B2: las 3 lecciones de EdS que quedan, con todos sus dibujos legibles en el celular

Lee antes: el CLAUDE.md del proyecto, el agente «autor-laminas» (.claude\agents\autor-laminas.md, sección «Dibujos legibles en celular»), el agente «auditor-figuras» (.claude\agents\auditor-figuras.md) y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md, **regla 6**). Usa esas skills.

## Archivos (solo estos tres)
- `src/app/aprende/eds-determinantes-salud/page.tsx`: Pizarras de las líneas ~69, ~114, ~155 y ~197 (viewBox 720 de ancho, letra 11 → 4,8 px en el celular)
- `src/app/aprende/eds-investigacion-bioetica/page.tsx`: ~38, ~142, ~193 y ~229 (720 de ancho, letra 11)
- `src/app/aprende/eds-epidemiologia/page.tsx`: ~69, ~221 y ~280 (720 de ancho, letra 11). **NO toques** las de ~122 y ~161: ya están rehechas.

## Qué
Rehaz cada uno de esos 11 dibujos con estas tres condiciones:
1. viewBox de **360 de ancho**;
2. **toda letra ≥ 13** en el viewBox (13 × 312/360 = 11,3 px en el celular);
3. **alto del viewBox ≤ 425**. Con «Ver en grande» y el celular girado (740×360) la letra mide 13 × 360 / alto, y por encima de 425 baja de 11 px. Si un dibujo no entra en 425, pártelo en dos `<Pizarra>` seguidas, cada una con las tres condiciones, y pon en su `titulo` o en su título interno «(1/2)» y «(2/2)».

Lo que iba en fila puede ir en columna. Ajusta el `alto` de cada `<Pizarra>` a la proporción nueva (alto ≈ 312 × altoViewBox / 360, redondeado). Antes que achicar la letra, partir.

Mismo contenido: las mismas palabras, números, flechas y colores (`LIENZO.*`). Una frase larga se puede cortar en dos renglones, pero no se cambian sus palabras. Nada pisado y nada fuera del viewBox.

No toques nada más: ni los textos de las tarjetas, ni las `AutoCheck`, ni `correctaIdx`, ni el orden de las tarjetas, ni otros archivos.

## Control
`node scripts/medir-letra-dibujos.mjs --json m.json`: en estos 3 archivos, todas las Pizarras con `letraMinPx` ≥ 11 **y** `letraGrandePx` ≥ 11. Corre tsc, lint y `npm test` (el trinquete de `src/lib/letra-dibujos.test.ts` debe pasar; no cambies sus techos).

## Formato de la RESPUESTA
Una tabla: archivo:línea · viewBox antes → después · letraMinPx · letraGrandePx · alto de la Pizarra · cómo se reacomodó.
