# Pedido (solo lectura, ver CLAUDE.md de la raiz)
Proyecto: axiom-simulador. En el celular de 360 px, el titulo «Aprende paso a paso» de la ruta /aprende sale en 2 renglones con un interlineado enorme (casi el doble de lo normal). En escritorio se ve bien.
Busca en src/app/aprende/page.tsx (y los componentes que importe, y src/app/globals.css) el elemento que dibuja ese titulo y dime:
1. Archivo y numero de linea del titulo, y el estilo exacto que lleva (fontSize, lineHeight, clamp, media queries, clases).
2. Cualquier regla de globals.css que afecte a ese elemento (h1, clases) con su linea.
3. Cual de esas reglas produce el interlineado grande (por ejemplo un lineHeight en px/rem fijo, o un lineHeight heredado de un contenedor).
Formato: lista corta con archivo:linea y el texto de cada regla, y una frase con la causa mas probable. No edites nada.
