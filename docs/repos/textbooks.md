# mathigon/textbooks (evaluado 29-oct-2026)

Decisión: **DESCARTAR el contenido y el código (no tienen licencia de uso). TOMAR LA IDEA pedagógica, sin copiar ni una frase.**

## 1. Qué es de verdad
Código y contenido de los cursos interactivos de Mathigon (35 cursos: cuadráticas, funciones, fracciones, geometría, etc.). Cada curso = `content.md` (markdown propio con elementos interactivos), `functions.ts` (código de los interactivos), imágenes, audio, `hints.yaml` (mensajes del tutor virtual). Se compila con `@mathigon/studio`. NO es una librería: es un sitio completo.

## 2. Licencia (punto crítico)
- No existe archivo `LICENSE` en el repo (ls verificado).
- `package.json`: `"license": "UNLICENSED"`.
- Final del README: «© Mathigon 2016–2022, All rights reserved».
Conclusión: contenido y código están **todos los derechos reservados**. No se puede copiar, adaptar ni redistribuir en un producto de pago. Que el repo sea público en GitHub no da licencia. (Las librerías de Mathigon en npm, como hilbert, sí son MIT; este repo no.) Los demás archivos: no revisé licencias de `content/shared/vendor`.

## 3. Salud
Último commit 1-ago-2024 (más de 2 años). No archivado. Mantenimiento casi nulo.

## 4. Peso y dónde corre
Clon superficial: 598 MB (contenido 301 MB, 1.229 imágenes/videos). Es un sitio Node con su propio servidor y build; no corre dentro de Next ni en la PWA. Solo sirve como referencia de lectura.

## 5. Mapa contra Axiom
- Fila 9 (lecciones y láminas): sus lecciones son narrativas con una situación real (ej. cuadráticas: una empresa de patinetas con costos y demanda), pregunta antes de explicar, interactivo en cada paso. Es el estilo de «descubrir antes de que te lo digan».
- Fila 10 (práctica): `hints.yaml` es un tutor que da pistas según el error (`data-error="wrong-chart-1"`). Idea para pistas por distractor.
- Filas 2 y 6: tienen gráficas interactivas (`x-coordinate-system`, `fn="0.6x + 2"`). Idea, no código.
- Todo texto está en inglés, sin tuteo: aunque tuviera licencia no sirve tal cual.

## 6. Prueba chica
No probada: no se puede ni se debe usar. Solo leí `content/quadratics/content.md` (introducción con la empresa SkateSum, preguntas de elección de gráfico y ecuaciones interactivas `x-equation(solution="5000+30×n")`).

## 7. Costo de integrar
Copiar: imposible por licencia. Tomar la idea: costo cero en código; es criterio pedagógico para `autor-laminas` y `auditor-pedagogico`.

## 8. Decisión
**DESCARTAR** como fuente (UNLICENSED). **TOMAR LA IDEA** de estructura, escrita desde cero con ejemplos de Cochabamba: situación concreta, pregunta antes de la fórmula, un interactivo por paso, pistas por tipo de error.
Agente que mejora: `autor-laminas` (agregar a su guía: abrir con situación y pregunta, no con definición) y `auditor-pedagogico`.
Confianza: alta en licencia (archivos abiertos), media en el resto (solo leído).

## Para Ronald
Nada de este repo debe copiarse: «All rights reserved». Si quieren su contenido, habría que pedirles permiso a Mathigon (dev@mathigon.org). Recomiendo no hacerlo; basta con la idea.

## Lecciones nuevas
- Que un repo sea público no implica licencia. Revisar si existe `LICENSE` y qué dice `package.json` y el pie del README; aquí el repo tiene `UNLICENSED` aunque sus librerías hermanas sean MIT.
- Clonar este repo cuesta 598 MB; con `--depth 1` igual. Para solo leer, mejor bajar un archivo con `curl` de `raw.githubusercontent.com`.
