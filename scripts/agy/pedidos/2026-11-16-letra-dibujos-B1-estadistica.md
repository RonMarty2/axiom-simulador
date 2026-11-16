# Pedido agy · criterio · B1: la lección de Estadística descriptiva con todos sus dibujos legibles en celular

Lee antes: el CLAUDE.md del proyecto, el agente «autor-laminas» (.claude\agents\autor-laminas.md), el agente «auditor-figuras» (.claude\agents\auditor-figuras.md) y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md, **regla 6**). Usa esas skills.

## Archivo
Solo `src/app/aprende/eds-estadistica-descriptiva/page.tsx`. No toques ningún otro archivo.

## Qué
Esta lección tiene 7 `<Pizarra>` y en un celular vertical de 360 px ninguna se lee bien (la Pizarra se dibuja a 312 px de ancho):
- ~62: viewBox 720×210, letra mín. 11 → 4,8 px
- ~188: viewBox 720×220, letra 11 → 4,8 px
- ~313: viewBox 720×175, letra 11 → 4,8 px
- ~630: viewBox 0 0 360 240, letra 10 → 8,7 px
- ~666: viewBox 360 0 360 240, letra 11 → 9,5 px
- ~719: viewBox 0 0 360 240, letra 10 → 8,7 px
- ~780: viewBox 360 0 360 240, letra 10 → 8,7 px

Rehaz cada dibujo con un viewBox de **360 de ancho** (el alto que haga falta) y **toda letra ≥ 13** en el viewBox (13 × 312/360 = 11,3 px en el celular). Lo que antes iba en fila puede ir en columna. Si un dibujo no entra ni así, pártelo en dos `<Pizarra>` seguidas, cada una a 360 de ancho, antes de achicar la letra. Los que usan `viewBox="360 0 360 240"` (la mitad derecha de un dibujo de 720) pásalos a coordenadas propias que empiecen en 0. Ajusta el `alto` de cada `<Pizarra>` a la proporción nueva (alto ≈ 312 × altoViewBox / 360, redondeado).

Mismo contenido: las mismas palabras, números, ejes, barras y colores (`LIENZO.*`). Nada pisado y nada fuera del viewBox. Los datos de los gráficos (alturas de barras, frecuencias, marcas de clase) tienen que seguir diciendo lo mismo que el texto de la tarjeta.

No toques nada más: ni los textos de las tarjetas, ni las `AutoCheck`, ni `correctaIdx`, ni el orden de las tarjetas.

## Control
`node scripts/medir-letra-dibujos.mjs --json m.json`: todas las Pizarras de este archivo deben dar `letraMinPx` ≥ 11. Corre tsc, lint y `npm test`.

## Formato de la RESPUESTA
Una tabla: línea · viewBox antes → después · letra mín. en px · alto de la Pizarra · cómo se reacomodó (fila → columna, partida en dos, etc.).
