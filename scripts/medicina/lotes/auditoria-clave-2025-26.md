# Auditoría de clave · Curso Básico de Medicina 2025-2026 (16-nov-2026)

Agente: `auditor-clave-oficial`. Libros de la gestión: Saladin 6.ª ed. (morfofunción), Calvo 1.ª ed. (biología celular), *Educación en Salud e Investigación, Curso Básico 2025-2026* (EdS) y sus «Temas faltantes» (escaneado, pasado por OCR; en las citas, páginas 1001 en adelante = página 1, 2… de ese PDF).

## Cómo se hizo
1. `auditar_clave.py ciego`: afirmaciones sin clave ni explicación.
2. `candidatos_libro.py`: 3 pasajes candidatos por afirmación (6 en la segunda vuelta) buscados en el libro del área.
3. agy (nivel criterio, Hydrogen High; entregas `20261116-0859xx_clave1..6` y `20261116-0910xx_clave7..9`) marca V/F/? con una cita copiada del candidato. **No decidió nada.**
4. `comprobar_citas.py`: 707 de 709 citas están literales en el libro (las 2 que fallan no cambian nada).
5. `auditar_clave.py comparar`: deriva la letra y la compara con `**respuesta:**`. Claude revisó a mano, con el pasaje a la vista, cada diferencia y las 10 notas «Revisión pendiente» que el libro resolvió.

Evidencia por pregunta: `clave-<examen>.jsonl` en esta carpeta (veredicto, cita, página).

## Totales (calculados con el script)

| Examen | Preguntas | Letra del libro = clave | Diferencias | Sin veredicto completo |
|---|---|---|---|---|
| 1er parcial (22-12-2025) | 99 | 84 | 1 (P99) | 14 |
| 2do parcial | 96 | 81 | 1 (P37) + 1 ambigua (P96) | 13 |
| Final | 100 | 88 | 1 (P92) + 2 que no son error (P41, P49) | 8 + P99 ambigua |

**Ninguna letra se cambió.** Las del grupo «sin veredicto completo» son compatibles con la clave (lo que sí se pudo decidir no la contradice).

## Diferencias

| Examen · P | `.md` | Libro | Clasificación | Cita |
|---|---|---|---|---|
| 1er parcial · 99 | D | E | **Clave oficial dudosa** | EdS p. 62: «El marco teórico tiene como objetivo situar el problema y el resultado de su análisis dentro del conjunto de conocimientos existentes, y orientar… todo el proceso de investigación (Neupert, 1977)». Ninguna de las 3 opciones lo es. |
| 2do parcial · 37 | D | B | **Clave oficial dudosa** | Calvo p. 370: SMN «se localiza tanto en el citoplasma como en los cuerpos de Cajal» → la afirmación 2 es verdadera. |
| Final · 92 | C | 1 y 3 (sin letra) | **Clave oficial dudosa** | EdS p. 127: los objetivos son «Diferenciar las formas de representación gráfica…» (af. 1) y «Construir gráficas e interpretarlas según el tipo de variable…» (af. 3). Dos de tres: como en P60/P91 de 2024-25, candidata a `faltantes`. 16-11, decisión de Ronald: pasa a `faltantes` (dos de tres sin letra). |
| Final · 49 | A | (D literal) | Errata del original, no error | EdS p. 113: el primer intervalo es «cerrado en ambos extremos [45 – 50]». El contenido de la af. 1 es cierto; la notación «(li-Is]» es errata de imprenta. |
| Final · 41 | C | (A literal) | No es error | EdS p. 98: «los métodos estadísticos ofrecen dos tipos de muestreo: probabilístico y no probabilístico». agy lo tomó demasiado al pie de la letra. |
| 2do parcial · 96 | C | (F en af. 3) | Ambigua | Temas faltantes p. 34: «No se construye un marco teórico sino que se analiza el contenido de la información, que se convierte en estructuras…». La lectura de la clave (af. 3) es defendible. |
| Final · 99 | D | 1 y 2 V; 3 no lo dice | Ambigua | EdS p. 134: con más de 4 categorías «se debe usar el diagrama de barras». No limita las barras a menos de 4. |

## Notas «Revisión pendiente» resueltas con el libro (la cita va ahora en la explicación)
1er parcial 82 (Calvo p. 79) · 2do parcial 88 (Calvo p. 409: «es de carácter reversible»; la nota vieja decía lo contrario de memoria) · Final 63 (Saladin p. 369), 73 (Saladin p. 848-849), 78 (Calvo p. 675-676), 80 (Calvo p. 679), 82 (Calvo p. 547, 552, 610), 83 (Calvo p. 590, 601), 85 (Calvo p. 673, 675), 94 (EdS p. 132). En todas, la clave oficial se sostiene.

Sigue pendiente: 1er parcial 21 (bolsa subescapular: depende de la figura del libro; no verificable en texto).

## Sin veredicto completo (no verificables con el texto)
- 1er parcial: 7, 21, 22, 42, 45, 46, 47, 48, 49, 50, 56, 57, 69, 90.
- 2do parcial: 2, 9, 16, 20, 25, 42, 63, 64, 67, 70, 75, 92, 98.
- Final: 1, 9, 21, 22, 52, 54, 97.

**16-nov, segunda vuelta de metodología** (agy `20261116-102858_auditoria` leyó las imágenes de «Temas faltantes» pp. 31-37 = libro 101-107; pedido `scripts/agy/pedidos/2026-11-16-clave-eds-cualitativa.md`; Claude comprobó la cita de la p. 103 en la imagen):
- 2do parcial 98 (clave B): af1 F, af2 V, af3 F → **B, se confirma la clave**. Temas faltantes p. 34 (libro 104): «recolección de datos sobre relatos narrativos, historias de vida y experiencias de personas… Los datos se obtienen de autobiografías, biografías, entrevistas y testimonios de personas», no de los investigadores.
- Final 97 (clave D): af2 también V con EdS p. 134 (el diagrama circular «se usa para representar variables de tipo cualitativas o cuantitativas discretas») → V V V = **D, se confirma la clave**.
- 2do parcial 42 y 92 siguen sin veredicto: p. 33 (libro 103) da «Los tipos más comunes… teoría fundamentada, etnográficos, investigación-acción, narrativos y estudios de caso, entre otros». Como la lista queda abierta, los «cartográficos» no se pueden descartar. El libro no habla de variables numéricas ni de generalizar resultados estadísticos (P92 af1/af3). Ninguna de las dos contradice la clave.

Por qué: rótulos de figuras sin texto (huesos, músculos), preguntas sobre ODS concretos (el texto de la cátedra solo los nombra en general), y datos que el buscador no encontró. Ninguna contradice la clave con lo que sí se decidió.

## Qué NO se auditó
2023-24 y 2024-25 (6 exámenes): sus libros (Tortora 15.ª ed., Alberts 5.ª ed.) no están en la PC. Quedan «no verificables» hasta tenerlos.

## Lecciones nuevas
- 16-nov · ERROR · agy no tiene terminal ni búsqueda en su copia: pedirle «busca en el libro» devuelve 0 líneas · darle los pasajes candidatos ya buscados por un script (`candidatos_libro.py`).
- 16-nov · ERROR · el buscador tiraba siglas cortas (CD4, VIH, ODS) y el texto de Calvo usa `=== PÁGINA n ===` (no `===== PAGINA n =====`): Biología Celular quedó vacía en la 1.ª corrida · aceptar ambos formatos y siglas con dígito.
- 16-nov · ACIERTO · comprobar cada cita contra el libro por script: 707/709 literales; así se puede confiar en la cita sin releer el libro.
- 16-nov · ACIERTO · las notas «de memoria» se equivocaron en las dos direcciones (2do parcial 88: «no es reversible», y el libro dice que sí lo es). Una nota sin página no sirve como prueba.
- 16-nov · SUERTE · «Temas faltantes de EdS» (escaneado) salió legible con Tesseract `spa` a 200 dpi; no generalizar a escaneos peores.

## 2023-24 y 2024-25: sin auditar
Falta el libro de esas gestiones: Tortora 15.ª / Alberts 5.ª. No están en la PC ni en el Drive del curso (que solo trae Calvo, EdS, Saladin y el temario). Por decisión de Ronald (16-11) no se auditan con otro libro.
