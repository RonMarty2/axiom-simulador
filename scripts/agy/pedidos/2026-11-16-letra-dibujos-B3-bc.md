# Pedido agy · criterio · B3: dos lecciones de Biología Celular, con todos sus dibujos legibles en el celular

Lee antes: el CLAUDE.md del proyecto, el agente «autor-laminas» (.claude\agents\autor-laminas.md, sección «Dibujos legibles en celular»), el agente «auditor-figuras» (.claude\agents\auditor-figuras.md) y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md, **regla 6**). Usa esas skills.

## Archivos (solo estos dos)
- `src/app/aprende/bases-celulares-vida/page.tsx`: las 8 Pizarras de las líneas ~52, ~92, ~159, ~217, ~273, ~330, ~395 y ~454 (viewBox 720 de ancho, letra 11-12 → ~5 px en el celular)
- `src/app/aprende/bcm-membrana-transporte/page.tsx`: ~48, ~144, ~186 y ~260 (720 de ancho, letra 11)

## Qué
Rehaz cada uno de esos 12 dibujos con estas tres condiciones:
1. viewBox de **360 de ancho**;
2. **toda letra ≥ 13** en el viewBox (13 × 312/360 = 11,3 px en el celular);
3. **alto del viewBox ≤ 425**. Con «Ver en grande» y el celular girado (740×360) la letra mide 13 × 360 / alto, y por encima de 425 baja de 11 px. Si un dibujo no entra en 425, pártelo en dos `<Pizarra>` seguidas, cada una con las tres condiciones, y pon en su `titulo` o en su título interno «(1/2)» y «(2/2)».

Lo que iba en fila puede ir en columna. Ajusta el `alto` de cada `<Pizarra>` a la proporción nueva (alto ≈ 312 × altoViewBox / 360, redondeado). Antes que achicar la letra, partir.

Mismo contenido: las mismas palabras, números, flechas y colores (`LIENZO.*`). Una frase larga se puede cortar en dos renglones, pero no se cambian sus palabras. Nada pisado y nada fuera del viewBox.

No toques nada más: ni los textos de las tarjetas, ni las `AutoCheck`, ni `correctaIdx`, ni el orden de las tarjetas, ni otros archivos.

## Control
`node scripts/medir-letra-dibujos.mjs --json m.json`: en estos 2 archivos, todas las Pizarras con `letraMinPx` ≥ 11 **y** `letraGrandePx` ≥ 11. Corre tsc, lint y `npm test` (el trinquete de `src/lib/letra-dibujos.test.ts` debe pasar; no cambies sus techos).

## Formato de la RESPUESTA
Una tabla: archivo:línea · viewBox antes → después · letraMinPx · letraGrandePx · alto de la Pizarra · cómo se reacomodó.
