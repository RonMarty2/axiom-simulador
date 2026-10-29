# mathigon/hilbert.js (evaluado 29-oct-2026)

Decisión: **DESCARTAR** (kas de Khan hace lo mismo mejor; hilbert no simplifica).

## 1. Qué es de verdad
Librería TypeScript de 1.370 líneas: parsea expresiones (`1/2 + 1/3`), las evalúa numéricamente y las convierte a MathML y a texto hablado. Clases: `Expression`, `evaluate`, `substitute`, `simplified`, `toMathML`, `toVoice`. NO resuelve: el propio README lista como pendiente «CAS Expression simplification algorithms, equals() and same() methods» y no hay `simplify` ni `equals` reales.

## 2. Licencia
`LICENSE` leído: MIT, Copyright Mathigon. `package.json`: MIT. Uso comercial permitido. Los README piden firmar un CLA solo para contribuir.

## 3. Salud
Versión 1.1.25, último commit 17-nov-2025 (11 meses sin cambios). No archivado. Mantenimiento bajo.

## 4. Peso y dónde corre
npm `unpackedSize` 294 KB (incluye sourcemaps). Con dependencias `@mathigon/core` (248 KB) y `@mathigon/fermat` (407 KB) en disco. Corre en cliente o servidor. El bundle real no lo medí.

## 5. Mapa contra Axiom
- Fila 1 (fórmulas): produce MathML; Axiom usa katex (TeX). Peor/ no aporta.
- Fila 3 (exactitud): evalúa con decimales, no exacto. Peor que `Fraction`/sympy.
- Fila 11 (entrada de respuestas): parsea lo que escribe el alumno, pero no compara equivalencia. Menos que `kas` de Khan.
- Resto de filas: no toca.

## 6. Prueba chica (scratchpad, `npm i @mathigon/hilbert`)
- `1/2 + 1/3`: parsea, MathML ok, `evaluate()` da `0.8333333333333333` (decimal, no 5/6).
- `1/2 - 3/4 - (-1/3)`: `evaluate()` da `0.08333333333333331` (error de coma flotante, la respuesta exacta es 1/12).
- `x^2 - 5x + 6` con x=2 da 0, con x=4 da 2 (correcto).
- `5 m/s * 3.6` y `2x+3x` sin valores: error «Undefined variable»; no simplifica ni entiende unidades.
- Métodos del prototipo: `evaluate, interval, substitute, simplified, variables, functions, toString, toMathML, toVoice, collapse`; no hay `equals` ni `simplify` útil.

## 7. Costo de integrar
No integrar. Si se quisiera `toVoice` (leer fórmulas en voz alta para los audiolibros), sería un script chico en scripts/, sin tocar la app.

## 8. Decisión
**DESCARTAR.** No suma sobre katex + aritmética propia, y para comparar respuestas es mejor `@khanacademy/kas` (ver `perseus.md`).
Idea rescatable (**TOMAR LA IDEA**): `toVoice` convierte expresiones a texto leído; podría inspirar el fonetizado de `libro-audio-tts` para fórmulas. Agente que mejora: `libro-audio-tts` (idea, no dependencia).
Confianza: alta (probado).

## Lecciones nuevas
- El título «CAS» del README engaña: hilbert parsea y evalúa, no simplifica ni compara. Probar `equals`/`simplify` antes de creer la descripción.
