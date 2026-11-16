# Pedido agy · criterio · Tanda A2: 20 dibujos de Medicina con texto de más o para partir

Lee antes: el CLAUDE.md del proyecto, el agente «autor-laminas» (.claude\agents\autor-laminas.md) y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md, regla 6). Usa esas dos skills.

## Qué
La auditoría `C:\Users\lmigu\AppData\Local\axiom-agy\20261116-100124_auditoria\RESPUESTA.md` lista los dibujos SVG de `src/app/aprende/*/page.tsx` que ni en «Ver en grande» con el celular girado (740x360) llegan a 11 px. La tanda A1 ya hizo las de `letra-mayor`. Haz SOLO las filas con salida **`menos-texto`** (16) y **`partir`** (4). La columna «detalle» de cada fila dice qué hacer.

Los números de línea pueden haberse corrido: ubica cada `<svg>` por su viewBox y su contenido.

## Reglas
- **menos-texto:** la frase o nota larga sale del dibujo y pasa a un `<Parrafo>` justo debajo de su `<Pizarra>` (o a la `<Definicion>` vecina), con las mismas palabras, sin perder información. Si se acorta una celda, la idea completa tiene que quedar en el texto de afuera. Después, todo `fontSize` menor a 11 de ese `<svg>` pasa a 11. Si quedó espacio vacío abajo, reduce el alto del viewBox y el `alto` de la `<Pizarra>` en la misma proporción.
- **partir:** el dibujo se convierte en dos `<Pizarra>` seguidas, cortando donde dice la auditoría, cada una con su título; letra 11 o más. Nada de su contenido se pierde.
- Nada pisado, nada fuera del viewBox, nada recortado. Tuteo, sin emojis. Nada de datos nuevos. No toques AutoCheck ni `correctaIdx`, ni otros dibujos ni otras lecciones.

## Control
`node scripts/medir-letra-dibujos.mjs --json m.json`: ninguno de los 20 (ni los nuevos que resulten de partir) con `letraGrandePx` < 11. Corre tsc, lint y `npm test`.

## Formato de la RESPUESTA
Tabla: archivo:línea · salida · letra mín antes → después · qué texto salió a la tarjeta (literal, corto) o cómo quedó partido. Al final, cuántos de los 20 quedaron con `letraGrandePx` ≥ 11 y la lista de los que no.
