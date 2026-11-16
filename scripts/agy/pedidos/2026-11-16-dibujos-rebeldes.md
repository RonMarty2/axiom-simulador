# Pedido agy · lectura · Dibujos de /aprende que seguirían ilegibles en celular

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md) y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md). Usa la skill `auditor-pantallas-movil` para este trabajo.

Agente a seguir: `agentes/auditor-pantallas-movil.md`, regla 6 (letra de los dibujos ≥ 11 px a 360 px; arreglo en este orden: menos texto dentro del dibujo, letra más grande en el viewBox, versión partida/apilada en celular).

## Contexto
`docs/medicion-letra-dibujos-2026-11-16.json` tiene, por dibujo SVG de `src/app/aprende/*/page.tsx`: `archivo`, `linea`, `viewBox` (ancho x alto) y `letraMinViewBox` (fontSize más chico del dibujo). Se va a probar un arreglo general: en celular, tocar el dibujo lo abre a pantalla completa en horizontal, donde la escala es min(740/ancho, 360/alto). Un dibujo es REBELDE si `letraMinViewBox × min(740/ancho, 360/alto) < 11`.
Ejemplos ya calculados: 720x210 → escala 1,03; 480x260 → 1,38; 720x400 → 0,90 (con letra 11 da 9,9: rebelde).

## Qué hacer (solo leer; NO edites nada)
1. Del JSON, toma los dibujos de lecciones de Medicina primero (slugs que empiezan con `bcm-`, `eds-`, `sistema-`, `morfofuncion-`, y `energia-celular`, `diversidad-seres-vivos`, `ecologia-medioambiente`, `bases-celulares-vida`, `bases-moleculares-vida`, `componentes-materia-viva`) y calcula cuáles son rebeldes con la fórmula de arriba. Haz la cuenta con cuidado y muéstrala.
2. Para cada rebelde, abre el archivo en la línea y lee el dibujo: cuántos textos tiene, cuáles son frases largas que podrían ir fuera en la tarjeta, y si se puede partir en dos mitades sin que un texto cruce el corte.
3. Recomienda UNA salida por dibujo: `menos-texto` (di qué textos salen), `letra-mayor` (a qué fontSize, y si entra sin pisarse), o `partir` (dónde cortar, en x o en y).

## Formato de la RESPUESTA
Tabla Markdown: archivo:línea | viewBox | letra mín | escala horizontal | px resultante | salida | detalle (máx. 1 línea).
Al final: total de rebeldes de Medicina, cuántos por cada salida, y los 5 que más cuestan.
