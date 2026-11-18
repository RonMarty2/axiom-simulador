# Pedido · lección nueva «Tabla periódica y propiedades periódicas» (QUI-14)

Usa la skill `autor-laminas` y sigue el `CLAUDE.md` de la raíz del repo (texto del alumno en TUTEO, nunca voseo; sin cifras de catálogo a mano).

## Encargo
Crear `src/app/aprende/tabla-periodica/page.tsx`: una lección con la MISMA estructura y los mismos componentes que el molde `src/app/aprende/cinetica-equilibrio/page.tsx` (unidad="QUI-14", tituloUnidad="Tabla periódica y propiedades periódicas", 5 o 6 escenas).

Fuente del temario: `docs/psa-2027/4096_p29-45_texto.txt`, líneas 313 a 325, PRIMERA columna (libro del Ministerio): historia de la tabla periódica, clasificación de los elementos, tabla moderna (grupos y periodos), propiedades periódicas (radio atómico, radio iónico, afinidad electrónica, electronegatividad, energía de ionización, carácter metálico), importancia de la tabla. Cubre SOLO esos temas. Las otras columnas (enlaces, igualación) NO.

Prácticas: usa como base el bloque «Q1. Tabla periódica y propiedades periódicas» de `docs/psa-2027/MFQ_INVENTARIO.md` (línea ~1089), sin copiar etiquetas tipo «Q1.1» ni números de pregunta inventados: titúlalas «Práctica PSA 2027».

Banco: comprobado por Claude, `data/examenes/umss/` NO tiene preguntas propias de propiedades periódicas. La única relacionada es `data/examenes/umss/ingenieria/2011-parcial1-2-2011.md`, Pregunta 13 (configuración 5s² 5p² → Sn, grupo 14, periodo 5; respuesta C). Úsala como «ejercicio relacionado del banco» (ubicar grupo y periodo desde la configuración) y di en la lección, en una línea honesta, que en los exámenes pasados este tema casi no aparece pero entra en la lista PSA 2027. No inventes otras preguntas «del banco».

No repitas tal cual la escena «Propiedades periódicas» de `src/app/aprende/estructura-atomica/page.tsx` (función `EscPeriodicas`): léela y ve más a fondo (radio iónico: catión menor y anión mayor que su átomo; carácter metálico; por qué cambian: capas y carga nuclear).

Escenas sugeridas: 1) historia y clasificación (metales, no metales, metaloides, gases nobles); 2) grupos y periodos, y cómo ubicar un elemento desde su configuración (bloques s, p, d, f); 3) radio atómico y radio iónico (dibujo de flechas de tendencia); 4) energía de ionización, afinidad electrónica, electronegatividad y carácter metálico (un dibujo-resumen de tendencias); 5) ejercicio relacionado del banco resuelto paso a paso (una operación por línea) + importancia de la tabla; 6) errores comunes y práctica (AutoCheck, la respuesta correcta NO siempre en la misma posición).

## Reglas duras (formato B de los dibujos, medibles)
- Todo SVG: viewBox de 360 de ancho, letra (font-size) ≥ 13, alto del viewBox ≤ 425. La explicación larga va fuera del dibujo, en la tarjeta.
- Nada de desborde horizontal a 360 px.
- Toca SOLO `src/app/aprende/tabla-periodica/page.tsx`. No toques el catálogo, ni otras lecciones, ni el banco.
- No leas fuera de `src/app/aprende/cinetica-equilibrio/`, `src/app/aprende/estructura-atomica/`, `src/components/`, `docs/psa-2027/`, `data/examenes/umss/ingenieria/2011-parcial1-2-2011.md` y los agentes. Si un archivo no existe, no insistas. Crea el archivo en los primeros minutos.
- Cada dato (Z, grupo, periodo, tendencia) compruébalo dos veces.

## Casilleros de aceptación
1. `tsc --noEmit` y `lint` sin errores.
2. 0 apariciones de voseo («podés», «tenés», «hacé», «vos»).
3. Todos los `<text>` de los SVG con font-size ≥ 13 y viewBox 360 × ≤ 425.
4. El único ejercicio «del banco» es 2011-parcial1-2-2011 P13 con respuesta C.
5. Responde al final, en máximo 30 líneas: qué escenas hiciste y qué dudas quedaron.

REPITE PORQUE: dos corridas seguidas se cortaron al arrancar por reinicio del servidor, sin crear nada (anterior: 20261118-074322_leccion y la siguiente), ahora con otro nivel
