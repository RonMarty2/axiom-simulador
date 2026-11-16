# Pedido agy · criterio · B1b: corrección sobre tu entrega B1 (misma conversación)

Bien hecho: los 7 dibujos dan 11,3 px a 360 en vertical. Pero `npm test` falló en `src/lib/letra-dibujos.test.ts`: con «Ver en grande» y el celular girado (740×360), la pantalla tiene 360 de alto y un dibujo alto se achica. Allí la letra queda en 13 × 360 / altoViewBox px. Para que sea ≥ 11, **el alto del viewBox no puede pasar de 425**.

Fallan dos:
- ~línea 62: viewBox 360×525 → 8,9 px en grande
- ~línea 197: viewBox 360×450 → 10,4 px en grande

Parte cada uno en dos `<Pizarra>` seguidas, cada una a 360 de ancho con alto ≤ 400 y letra ≥ 13, y el `alto` de cada Pizarra ≈ 312 × altoVB / 360. Corta por un lugar natural del dibujo (por ejemplo, un gráfico por Pizarra) y pon en cada `titulo` qué parte es. Mismo contenido y mismas palabras. No toques los otros 5 dibujos, las tarjetas ni las AutoCheck.

Control: `node scripts/medir-letra-dibujos.mjs --json m.json` (en este archivo, `letraMinPx` ≥ 11 y `letraGrandePx` ≥ 11 en todas) y `npm test` sin fallas.
Respuesta: tabla línea · viewBox · letraMinPx · letraGrandePx · alto.
