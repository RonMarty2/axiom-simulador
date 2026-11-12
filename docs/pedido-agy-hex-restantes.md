# Pedido agy: colores hex que quedan en src/app (SOLO LECTURA)

Carpeta: `src/app` (ignora `admin/`, `api/`, `prueba*/`, archivos `*_Conflict.tsx`, `simulador/`, `dashboard/`, `practicar/`, `page.tsx` de la raiz).
Busca colores escritos a mano (`#rgb`, `#rrggbb`) en .tsx/.ts/.css que NO esten dentro de `globals.css` como definicion de variable.

Para cada hallazgo devuelve una tabla Markdown: `archivo:linea | hex | contexto (1 frase: fondo/texto/borde/canvas/SVG) | ya existe variable de ese valor en src/app/globals.css (nombre, o "no") | nombre propuesto si no existe`.
Al final: cuantos hay por archivo y cuales estan dentro de `<canvas>`/`getContext` (esos NO se pueden pasar a `var()`).
No edites nada. Si no estas seguro, escribe "no verificado".
