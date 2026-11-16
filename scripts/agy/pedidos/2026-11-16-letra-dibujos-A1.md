# Pedido agy · edición mecánica · Tanda A1: subir la letra de 49 dibujos de Medicina

Lee antes: el CLAUDE.md del proyecto y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md, regla 6). Usa la skill `auditor-pantallas-movil`.

## Qué
La auditoría `C:\Users\lmigu\AppData\Local\axiom-agy\20261116-100124_auditoria\RESPUESTA.md` lista los dibujos SVG de `src/app/aprende/*/page.tsx` que ni en «Ver en grande» con el celular girado (740x360) llegan a 11 px. Haz SOLO las filas con salida **`letra-mayor`** (son 49). Las de `menos-texto` y `partir` NO se tocan en esta tanda.

Los números de línea de la tabla pueden haberse corrido unas líneas: ubica cada `<svg>` por su viewBox y su contenido.

## Regla
- Dentro de cada uno de esos `<svg>`, todo `fontSize` (o `font-size`) menor a **11** pasa a **11**. Los que ya son 11 o más no se tocan.
- Si al subir la letra un texto se pisa con otro o se sale de su caja o del viewBox: mueve `x`/`y` lo justo, ensancha la caja (`width` del `rect`) o agranda el alto del viewBox. Si cambias el alto del viewBox, cambia el `alto` de la `<Pizarra>` que lo contiene en la misma proporción.
- No cambies ningún texto, color ni forma más allá de eso. No toques nada fuera de esos 49 `<svg>`. No toques AutoCheck ni `correctaIdx`.

## Control
Corre `node scripts/medir-letra-dibujos.mjs --json m.json` y comprueba que ninguno de los 49 queda con `letraGrandePx` < 11. Corre tsc, lint y `npm test`.

## Formato de la RESPUESTA
Una tabla: archivo:línea · letra mín antes → después · qué más moviste (posición, caja, alto) o «nada». Al final, cuántos de los 49 quedaron con `letraGrandePx` ≥ 11 según el medidor y la lista de los que no.
