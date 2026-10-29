# JSXGraph (jsxgraph/jsxgraph) - evaluado 29-oct-2026

## 1. Qué es
Biblioteca de geometría y gráficas interactivas (construcciones tipo GeoGebra: puntos, rectas, círculos, funciones, deslizadores) en SVG/canvas. NO es motor de pasos ni de álgebra. Más grande y general que Mafs; no es React.

## 2. Licencia
Leí `LICENSE.MIT` y `LICENSE.LGPL`; `package.json` dice `(MIT OR LGPL-3.0-or-later)`. Se puede usar bajo MIT (doble licencia): apto para producto de pago. `3rdparty/` y `doc/` no los revisé.

## 3. Salud
Último commit 28-oct-2026; versiones 1.14.0 (5-oct), 1.14.1 (21-oct), 1.14.2 (26-oct). Muy activo. Issues no verificados (no hay `gh`).

## 4. Peso y dónde corre
`jsxgraphcore.mjs` 1,03 MB (259 KB gzip) más `jsxgraph.css`. El paquete en disco pesa 74,6 MB (casi todo mapas y docs; no llega al cliente). Corre en cliente (necesita DOM). Pesado para gama baja.

## 5. Mapa contra Axiom
- Fila 6: cubriría gráficas y geometría interactiva (arrastrar vértices, ver ángulos). Mejor que Mafs en construcciones; peor en peso e integración con React.
- No toca otras filas con dolor real.
Afectaría: `src/lib/figuras/` y lecciones de geometría.

## 6. Prueba chica
En el scratchpad (`t/jg.mjs`), con jsdom: tablero con x²-4x+3 y los puntos (1,0), (3,0), (2,-1). `f.Y(1)=0`, `f.Y(3)=0`, `f.Y(2)=-1`: coincide. Generó SVG de 22,5 KB con 7 paths. Jsdom mostró un aviso en el manejo de redimensionado (no frenó el resultado). No probado: interacción ni aspecto en navegador.

## 7. Costo de integrar
Medio: envoltorio React con `useEffect`, carga diferida obligatoria (259 KB gzip), CSS y limpieza del tablero al desmontar. Aporta poco sobre Mafs para lo que Axiom hace hoy.

## 8. Decisión
**DESCARTAR** por ahora: Mafs cubre las gráficas con 15 KB; este pesa unas 17 veces más. Reabrir si se pide geometría de construcción interactiva.
Agente que mejora: ninguno hoy.

## Para Ronald
Nada urgente. Confianza: media (corre y calcula bien, sin ver en navegador).

## Lecciones nuevas
- `npm view` da 74,6 MB para el paquete, pero lo que llega al cliente es 1 MB: mirar el archivo del bundle, no el tamaño del paquete.
