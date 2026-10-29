# Mafs (stevenpetryk/mafs) - evaluado 29-oct-2026

## 1. Qué es
Componentes React para gráficas de matemática (plano cartesiano, funciones, puntos, vectores, líneas, elementos arrastrables), en SVG y con etiquetas en KaTeX. NO resuelve: geometría de construcción compleja, 3D ni cálculo simbólico.

## 2. Licencia
`LICENSE` leído: MIT (c) 2021 Steven Petryk. Dependencias: `katex` (ya está en Axiom), `@use-gesture/react`, `use-resize-observer`, `tiny-invariant`, `computer-modern` (fuente). Las licencias de estas no las verifiqué una por una.

## 3. Salud
Último commit y última versión (0.21.0): 30-mar-2025. Casi 19 meses sin cambios. No está archivado según el repo; issues no verificados (no hay `gh`). Riesgo: abandono. Mitigación: es chico y se puede copiar al proyecto.

## 4. Peso y dónde corre
`build/index.js` 64 KB (15 KB gzip), más CSS (`core.css`, `font.css`). Peer `react >=18`; Axiom usa React 19 (probado con react 19). Corre en cliente y en render de servidor (probado). Sirve en la app.

## 5. Mapa contra Axiom
- Fila 6 ("no hay gráficas de funciones interactivas"): lo resuelve directamente.
- Fila 2 (animaciones): en cuadrática y tiro/MRUV permitiría mostrar la parábola o el gráfico v-t junto al paso a paso. No reemplaza `Fusion.tsx`.
- Fila 9 (lecciones y láminas): un componente `Grafica` en el kit `pedagogia.tsx` / `lienzo.tsx`.
- Fila 10 (práctica): permitiría ejercicios tipo "mueve el punto hasta el vértice" en el futuro.
Afecta: `src/app/prueba-animacion/` (cuadrática), `agentes/autor-laminas.md`.

## 6. Prueba chica
En el scratchpad (`t/mf.mjs`), `renderToString` con react 19 de `<Mafs><Plot.OfX y={x=>x*x-4*x+3}/><Point x=2 y=-1/></Mafs>`, una cuadrática como las de Axiom (raíces 1 y 3, vértice (2,-1)): produce el SVG con la curva (path con coordenadas calculadas) y el punto (círculo). Con ejes `Coordinates.Cartesian` salen 14,6 KB de HTML. No probado: arrastre, zoom, aspecto en celular ni comportamiento con Next 16 (`'use client'`).

## 7. Costo de integrar
Bajo: `npm i mafs`, un componente envoltorio con carga diferida, import de dos CSS. 2 a 4 archivos. Riesgo: dependencia semi-abandonada y estilos propios que hay que alinear con el tema LIENZO. Los coeficientes deben salir del mismo caso que usa el generador (fuente única), no clavados.

## 8. Decisión
**USAR** (primero en una lección de cuadrática, probando en celular antes de generalizar).
Agente que mejora: `autor-laminas` y el generador de cuadrática ganan una gráfica con los mismos números que ya calculan; `auditor-figuras` puede verificar la parábola contra raíces y vértice.

## Para Ronald
¿Quieres gráficas en las lecciones? Es decisión de producto. Confianza: media (render de servidor probado, navegador no).

## Lecciones nuevas
- El render de servidor de Mafs funciona sin DOM; sirve para probarlo en scripts.
