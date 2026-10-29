# MathLive (arnog/mathlive) - evaluado 29-oct-2026

## 1. Qué es
Campo de entrada de matemática (`<math-field>`) con teclado virtual; el alumno edita la fórmula visualmente y sale LaTeX. Trae también conversores de LaTeX a HTML, MathML y ASCII. NO compara expresiones por equivalencia (eso es otro paquete, Compute Engine, que no revisé ni probé).

## 2. Licencia
`LICENSE.txt` leído: MIT (c) 2017-presente Arno Gourdol. Apto para uso comercial. Las fuentes KaTeX incluidas tienen la licencia de KaTeX (no revisada aparte).

## 3. Salud
Último commit 9-oct-2026; versiones 0.111.1 (9-oct), 0.111.0 (30-sep), 0.110.0 (9-jun). Muy activo, aún 0.x. Issues no verificados (no hay `gh`).

## 4. Peso y dónde corre
`mathlive.min.mjs` 843 KB (228 KB gzip), más fuentes 300 KB y CSS. La variante `mathlive/ssr` pesa 398 KB y solo convierte. Corre en cliente (campo de entrada) y en Node (solo conversiones). Pesado para gama baja.

## 5. Mapa contra Axiom
- Fila 11 (entrada de respuestas matemáticas, hoy solo opción múltiple): es justo su uso. Habilitaría "escribe tu respuesta" en práctica (fila 10).
- Fila 1 (fórmulas en pantalla): no aporta; ya está KaTeX y dos motores de render serían duplicar.
Afectaría: `/practicar` y `/simulador`, solo si se cambia el formato de respuesta.

## 6. Prueba chica
En el scratchpad (`t/ml3.mjs`), módulo `mathlive/ssr`, caso `1/2 - 1/3 = 1/6`:
- `convertLatexToMathMl` genera `<mfrac>` correcto. `convertLatexToAsciiMath` da `(1)/(2)-(1)/(3)=(1)/(6)`; la fórmula cuadrática pasa a `(-b+-sqrt(b^2-4a c))/(2a)`.
- `convertLatexToSpeakableText` FALLA en Node (`textToSpeechRules` undefined).
- `validateLatex` con `\frac{1}{2` (llave sin cerrar) devuelve lista vacía: no detecta el error.
- `convertAsciiMathToLatex('(1/2)-(1/3)')` agrega `\left(` y `\right)`: no devuelve lo mismo que se escribió.
No probado: el campo en navegador, el teclado en celular ni la comparación de respuestas.

## 7. Costo de integrar
Alto: componente cliente con carga diferida, teclado virtual, estilos, pruebas en celular, y un verificador de equivalencia (Compute Engine u otro). Cambia el flujo de práctica y el banco (hoy opción múltiple). Es decisión de producto.

## 8. Decisión
**DESCARTAR** por ahora: no toca ningún dolor actual y pesa 228 KB gzip. Reabrir si Ronald decide aceptar respuestas escritas.
Agente que mejora: ninguno hoy. Idea suelta no probada: `convertLatexToAsciiMath` podría darle expresiones a `resolutor-exacto`, sin haber comprobado que sympy las lea bien.

## Para Ronald
¿Quieres que el alumno escriba sus respuestas? Si sí, MathLive es el candidato (más un verificador de equivalencia, por evaluar). Confianza: media.

## Lecciones nuevas
- En heredocs de Git Bash las `\f` de LaTeX se corrompieron ("rac"); usar `String.raw` en los scripts de prueba.
