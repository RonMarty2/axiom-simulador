# Pedido agy · lectura · Auditar la lección «Citoesqueleto» antes de subirla

Lee y sigue estas reglas antes de empezar: el CLAUDE.md del proyecto (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md), el agente «auditor-pedagogico» (.claude\agents\auditor-pedagogico.md) y el agente «auditor-pantallas-movil» (.claude\agents\auditor-pantallas-movil.md, regla 6). Usa las skills `auditor-pedagogico` y `auditor-pantallas-movil`.

## Qué leer
`src/app/aprende/bio-citoesqueleto/page.tsx` de la carpeta `C:\Users\lmigu\AppData\Local\axiom-agy\20261116-095013_leccion\repo\` (la lección nueva; todavía no está en tu copia).

## Qué hacer (solo leer; NO edites nada)
1. **Como alumno nuevo (auditor-pedagogico):** errores de contenido, saltos sin explicar, términos usados antes de definirlos, pantallas con demasiado de golpe. Es para postulantes de Medicina; el temario oficial pide el capítulo 12 de Calvo entero. Marca lo que sea más detalle del que un postulante puede retener.
2. **Tuteo:** cualquier voseo (podés, tenés, mirá, hacé…) con número de línea. Emojis: ninguno permitido.
3. **Regla 6 (letra de los dibujos):** para cada `<svg>` con viewBox de 100 o más de ancho, calcula letra mínima en celular = fontSize más chico × 312 / ancho del viewBox. Lista los que den menos de 11 px y para cada uno propone UNA salida (menos texto: cuáles salen a la tarjeta; letra mayor: a cuánto, y si entra sin pisarse; o partir: dónde).
4. Las 6 AutoCheck: comprueba que la `correctaIdx` señale la opción que de verdad es correcta según el texto de la propia lección.

## Formato de la RESPUESTA
Tres tablas: (A) contenido/pedagogía: línea | problema | gravedad alta/media/baja | arreglo propuesto; (B) dibujos: línea | viewBox | letra mín | px en celular | salida; (C) AutoCheck: n.º | correctaIdx | ¿correcta? | por qué. Al final, 3 líneas: lo más grave.
