# Pedido agy · criterio · B3b: corrección sobre tu entrega B3 (misma conversación)

`bases-celulares-vida` quedó bien: sus 10 Pizarras pasan. Pero **no tocaste `src/app/aprende/bcm-membrana-transporte/page.tsx`**, y sus 4 Pizarras (~48, ~144, ~186 y ~260) siguen con viewBox de 720 de ancho y letra 11, que en el celular se ve a 4,8 px.

Hazle lo mismo que a la otra lección, con las tres condiciones: viewBox de 360 de ancho, toda letra ≥ 13, alto del viewBox ≤ 425 (si no entra, partir en dos Pizarras «(1/2)» y «(2/2)»), y `alto` de la Pizarra ≈ 312 × altoViewBox / 360. Mismo contenido y mismas palabras. No toques las tarjetas ni las AutoCheck, y no vuelvas a tocar `bases-celulares-vida`.

Control: `node scripts/medir-letra-dibujos.mjs --json m.json`: en `bcm-membrana-transporte`, todas con `letraMinPx` ≥ 11 y `letraGrandePx` ≥ 11. Corre `npm test`.
Respuesta: tabla línea · viewBox · letraMinPx · letraGrandePx · alto.
