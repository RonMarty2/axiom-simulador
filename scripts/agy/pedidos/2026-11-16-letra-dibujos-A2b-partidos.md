# Pedido agy · criterio · A2b: rehacer a 360 de ancho las mitades de 4 dibujos partidos

Lee antes: el CLAUDE.md del proyecto, el agente «autor-laminas» (.claude\agents\autor-laminas.md), el agente «auditor-figuras» (.claude\agents\auditor-figuras.md) y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md, regla 6). Usa esas skills.

## Punto de partida
Las 4 lecciones todavía NO están en tu copia con la versión buena. Copia estos archivos de la carpeta de Ronald a tu copia, en la misma ruta, y trabaja sobre ellos:
- `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\src\app\aprende\diversidad-seres-vivos\page.tsx`
- `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\src\app\aprende\eds-epidemiologia\page.tsx`
- `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\src\app\aprende\sistema-cardiovascular\page.tsx`
- `C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\src\app\aprende\sistema-nervioso\page.tsx`

## Qué
En la tanda anterior se partió en dos `<Pizarra>` un dibujo de cada lección, pero las mitades quedaron con viewBox de **720** de ancho: en un celular vertical de 360 su letra se ve a 4,8 px. Son estas (líneas aproximadas):
- diversidad-seres-vivos ~471 y ~505 (invertebrados / vertebrados)
- eds-epidemiologia ~123 y ~152 (cadena epidemiológica en dos partes)
- sistema-cardiovascular ~222 y ~255 (corazón / válvulas)
- sistema-nervioso ~644 y ~681 (arco reflejo 1/2 y 2/2)

Rehaz cada mitad con viewBox de **360 de ancho** (alto el que haga falta; puedes apilar en vertical lo que antes iba en fila) y **toda letra ≥ 13** en el viewBox (13 × 312/360 = 11,3 px en celular). Ajusta el `alto` de su `<Pizarra>` a la nueva proporción (alto ≈ 312 × altoViewBox / 360, redondeado). Mismo contenido, mismas palabras, mismos colores (`LIENZO.*`); nada pisado, nada fuera del viewBox. Si una mitad no entra ni así, pártela en una tercera `<Pizarra>` antes de achicar la letra.

No toques nada más de las lecciones: ni otros dibujos, ni AutoCheck ni `correctaIdx`, ni textos de las tarjetas.

## Control
`node scripts/medir-letra-dibujos.mjs --json m.json`: las mitades rehechas con `letraMinPx` ≥ 11 a 360. Corre tsc, lint y `npm test`.

## Formato de la RESPUESTA
Tabla: archivo:línea · viewBox antes → después · letra mín · alto de la Pizarra · cómo se reacomodó (fila → columna, etc.).
