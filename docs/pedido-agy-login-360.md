# Pedido a agy: por qué el botón de Google se ve angosto en /login a 360 px (solo lectura, no edites nada)

Usa la skill `director-arte-coherencia` como criterio. Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto: C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md; el agente «director-arte-coherencia»: 10.TRABAJO_LOCAL|axiom-simulador\.claude\agents\director-arte-coherencia.md.

## Qué pasa
En `src/app/login/page.tsx`, a 360 px de ancho, el botón «Continuar con Google» queda angosto (unos 186 px dentro de una tarjeta de 294 px) y su texto se parte en 3 líneas, con el logo de Google diminuto a la izquierda.

## Qué hacer
Encuentra el JSX y los estilos en línea del botón y de su contenedor. Dime qué propiedad lo deja angosto (por ejemplo `width`, `maxWidth`, `display: inline-flex`, `flex`, `whiteSpace`, padding del contenedor).

## Formato de la respuesta
Tres líneas: (1) archivo y líneas del botón y de su contenedor; (2) propiedad concreta que causa el ancho angosto, citando la línea; (3) cambio mínimo sugerido (una o dos propiedades), sin reescribir nada más.
