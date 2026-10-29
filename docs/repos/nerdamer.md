# jiggzson/nerdamer (evaluado 29-oct-2026, modo solo lectura)

## 1. Qué es de verdad
Álgebra simbólica en JavaScript/TypeScript: simplifica, expande, factoriza, deriva, resuelve ecuaciones (`nerdamer.solve('x^2-4','x')`). Da el **resultado**, no los pasos. NO explica nada al alumno, NO trae textos, NO arma una resolución "como a lápiz".

Leído: README de la rama `master` (versión 2.0), lista de archivos del repo y del paquete npm.

## 2. Licencia
`LICENSE.md` leído: Apache 2.0. Uso comercial permitido (hay que conservar el aviso de licencia si se distribuye).

## 3. Salud
561 estrellas, último commit 2-oct-2026, 85 issues abiertos. Historia rara: la 1.1.13 es de nov-2021, después nada por casi 5 años, y la 2.0.0 (reescritura completa en TypeScript) salió el 2-oct-2026 tras dos release candidates en septiembre. Es decir: el código que se instalaría hoy tiene 4 semanas de vida pública.

## 4. Peso y dónde corre
npm 2.0.0: 3,1 MB desempaquetado; el bundle para navegador `dist/bundle.js` pesa 541 KB (sin comprimir). Una dependencia (`decimal.js`). Para el celular es demasiado sin una razón fuerte; en tests o servidor no habría problema.

## 5. Mapa contra Axiom
- **Fila 2 (animaciones paso a paso):** no ayuda. No da pasos; los generadores (`fraccionesRapido` en `generadores-algebra.ts`) deciden qué se escribe en cada renglón y por qué, y eso es justo lo que nerdamer no tiene. **Peor** (no aplica).
- **Fila 3 (exactitud):** podría servir de "segunda opinión" en tests para cuadráticas o despejes. Pero hoy:
  - fracciones ya se comprueban en `generadores-algebra.test.ts` sobre todas las combinaciones con multiplicación cruzada exacta (más de 5000 casos, sin decimales);
  - sympy ya quedó como USAR en desarrollo (`docs/repos/sympy.md`) y es mucho más confiable que una reescritura de un mes.
  **Igual** a lo que hay, con más riesgo.
- **Fila 11 (respuestas escritas):** podría comparar expresiones del alumno, pero Ronald dijo que no por ahora.

## 6. Prueba chica
**No probado (modo solo lectura).** Prueba exacta: en el scratchpad `npm i nerdamer@2.0.0` y correr
`nerdamer('1/2-5/3').text()` (esperado `-7/6`), `nerdamer('-3/4-(-5/6)').text()` (esperado `1/12`), `nerdamer.solve('2*x^2-7*x+3','x').text()` (esperado `[1/2,3]`, comparar con el caso de `casos.ts`). Mirar en especial si devuelve decimales en vez de fracciones.

## 7. Costo de integrar
Bajo si fuera solo devDependency en tests (1 o 2 archivos de test), pero no aporta sobre lo que ya hay.

## 8. Decisión
**DESCARTAR.** No da pasos (que es lo que Axiom necesita del álgebra), pesa 541 KB para el cliente, la 2.0 es una reescritura de 4 semanas, y la verificación exacta ya está cubierta por los tests propios y por sympy.

**Qué agente mejora:** ninguno.

## Lecciones nuevas
- 2026-10-29 · SUERTE · Un repo con "último commit hace días" puede ser una reescritura completa tras años parado; la fecha sola no dice que el código esté probado. · Mirar `npm view <paq> time` para ver si la versión actual es nueva de verdad.
