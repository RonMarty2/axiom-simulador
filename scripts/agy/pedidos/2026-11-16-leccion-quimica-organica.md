# Pedido: lección nueva «Química orgánica» para Medicina PSA 2027

Agentes cuyas reglas sigues (léelos primero, en tu copia): `agentes/autor-laminas.md`, `agentes/auditor-pantallas-movil.md` (regla 6: letra de dibujos), `agentes/resolutor-exacto.md` (ejercicios), y `docs/lecciones-agentes.md`.

## Qué crear (SOLO este archivo)
`src/app/aprende/quimica-organica/page.tsx`. Copia la ESTRUCTURA, componentes, imports y estilo de `src/app/aprende/eds-estadistica-descriptiva/page.tsx` (la lección modelo: mismas piezas, mismo tipo de dibujos SVG en la Pizarra/lienzo, mismo formato de ejercicios). No toques ningún otro archivo (NO el catálogo `src/lib/axiom/catalogo-aprende.ts`: el enlace lo pone Claude).

## Contenido: SOLO lo de la lista oficial
Fuente oficial: `docs/psa-2027/LISTA_CONTENIDOS_PSA2027.txt` línea 79 («QUÍMICA … 4096.pdf ▪ Pág. 34 - 38») → texto del libro del Ministerio en `docs/psa-2027/4096_p29-45_texto.txt`, líneas 435-480 (libro p. 38; el archivo está en latin-1). Los subtemas permitidos, tal cual:
- QUÍMICA DEL CARBONO: diferencia de compuestos orgánicos e inorgánicos; composición de las sustancias orgánicas; propiedades del átomo del carbono; enlace sigma y pi; clases de fórmulas; importancia de la química del carbono.
- LOS HIDROCARBUROS: notación y nomenclatura de los hidrocarburos (alcanos, alquenos, alquinos; cadena principal, numeración, radicales); importancia y uso.
- FUNCIONES ORGÁNICAS OXIGENADAS: notación y nomenclatura de alcoholes, aldehídos y cetonas, ácidos carboxílicos, ésteres.
- SUSTANCIAS ORGÁNICAS NITROGENADAS: notación y nomenclatura de aminas, amidas y nitrilos; la urea.
Nada fuera de esa lista (no mecanismos de reacción, no estereoquímica avanzada). Pon al inicio de la lección, en texto visible corto, la fuente: «Temario oficial PSA 2027: libro del Ministerio de Educación, p. 38».

## Ejercicios: preguntas reales del banco
Incluye como ejercicios resueltos estas 4 preguntas reales (cópialas literal, con su respuesta del banco; resuelve paso a paso al estilo de `resolutor-exacto`: una operación por línea, dato nombrado, verificación al final; comprueba cada cuenta dos veces):
- `data/examenes/umss/ingenieria/2007-parcial1-1-2007.md` Pregunta 20
- `data/examenes/umss/ingenieria/2007-parcial2-1-2007.md` Pregunta 21
- `data/examenes/umss/ingenieria/2008-parcial2-2-2008.md` Pregunta 11
- `data/examenes/umss/ingenieria/2024-parcial1-1-2024.md` Pregunta 12
Busca además en `data/practica/medicina-psa-2027-mfq.md` preguntas de orgánica (nomenclatura, carbono, grupos funcionales) y usa hasta 5 como ejercicios (cita su id). Si tu resultado no coincide con la respuesta del banco, NO la cambies: anótalo en ENTREGA_AGY.md.

## Reglas de forma (obligatorias)
- Texto para el alumno en TUTEO (puedes, haz, tú), nunca voseo. Sin emojis.
- Dibujos SVG: ancho de viewBox 360, alto ≤ 425, letra (font-size) ≥ 13 en todo texto del dibujo. Fórmulas estructurales (cadenas de carbono, grupos funcionales) dibujadas simples y legibles a 360 px.
- Sin cifras de catálogo clavadas (ni cantidades de exámenes ni precios).
- Que compile: `npx tsc --noEmit` y `npm run lint` sin errores nuevos.

## Entrega
En ENTREGA_AGY.md: lista de secciones, cuántos dibujos y su letra mínima, los ejercicios usados (archivo + número) y cualquier discrepancia con el banco.
