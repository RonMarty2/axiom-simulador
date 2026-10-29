# josdejong/mathjs (evaluado 29-oct-2026, modo solo lectura)

## 1. Qué es de verdad
Biblioteca grande de matemática para JavaScript: números, fracciones exactas (vía `fraction.js`), unidades físicas con conversión, matrices, un evaluador de expresiones y algo de simplificación simbólica (`simplify`, `rationalize`, `derivative`) con salida a LaTeX (`toTex`). NO da pasos explicados (eso era mathsteps, que la usaba por dentro y está archivado). NO tiene química (no hay "molar M").

Leído: página de unidades de la documentación oficial, datos de npm, lista de archivos del paquete. No abrí el código fuente.

## 2. Licencia
`LICENSE` leído (rama `develop`): Apache 2.0. Uso comercial permitido. Sus dependencias principales (`fraction.js`, `decimal.js`, `complex.js`) son MIT según npm (solo verifiqué `fraction.js`: MIT).

## 3. Salud
Muy sana: 15.099 estrellas, último commit 10-ago-2026, versión 15.2.0 del 7-abr-2026, 244 issues abiertos (normal para su tamaño). Un mantenedor principal desde hace 12 años.

## 4. Peso y dónde corre
npm: 9,4 MB desempaquetado; el bundle completo para navegador (`lib/browser/math.js`) 650 KB. Se puede importar por partes (`create({ fractionDependencies, unitDependencies })`), pero aun así no tiene sentido en el celular para lo que Axiom necesita. Sirve en **tests y scripts de desarrollo** (corre con Node, sin Python).

## 5. Mapa contra Axiom
- **Fila 2 (pasos):** no da pasos. No aplica.
- **Fila 3 (exactitud):** `fraction('1/2').sub('5/3')` daría `-7/6` exacto. Pero fracciones ya están cubiertas en `generadores-algebra.test.ts` (todas las combinaciones, multiplicación cruzada). **Igual**.
- **Fila 4 (unidades), el dolor más grande del inventario:** según la documentación, `unit('20 m/s').to('km/h')` da `72 km/h`, conoce `mol`, `L`, `g`, y puede trabajar con fracciones exactas (`unit(fraction(10),'inch').toNumeric('cm')` → `127/5`). Eso permitiría un test en `npm test` que recorra cada generador de física/química y compruebe que la conversión que muestra la animación es la misma que la de mathjs. Hoy eso lo hace `resolutor-exacto` a mano o pint en Python. **Mejor** en un punto concreto: corre dentro de `node --test`, sin Python, y por lo tanto en cada commit y no solo cuando alguien invoca un agente.
  Ojo: el cuaderno de lecciones registra (23-oct) que `python3` no estaba en la máquina en esa sesión, mientras el inventario dice que Python 3.11 está disponible. Si Python falta a veces, un verificador en JS es más confiable.
- **Fila 5 (química):** no tiene molaridad ni masas molares. No aplica.

## 6. Prueba chica
**No probado (modo solo lectura).** Prueba exacta en el scratchpad: `npm i mathjs@15.2.0` y
```
const m=require('mathjs');
m.unit('20 m/s').to('km/h').toString()          // esperado 72 km/h
m.unit(m.fraction(25),'m/s').toNumeric('km/h')  // esperado Fraction 90 (exacto)
m.unit('0.5 mol').divide(m.unit('250 mL')).toNumeric('mol/L') // esperado 2
m.fraction('-3/4').sub(m.fraction('-5/6')).toFraction() // esperado 1/12
```
Comparar con lo que muestran los generadores de mruv/tiro y de soluciones para los mismos datos.

## 7. Costo de integrar
Solo como `devDependency`: 1 línea en `package.json` y 1 o 2 tests nuevos (por ejemplo `src/app/prueba-animacion/unidades.test.ts`). No cambia el bundle del alumno si nadie lo importa desde `src/app` fuera de tests (habría que cuidarlo; un `import` accidental en un componente sumaría cientos de KB). Riesgo bajo.

## 8. Decisión
**USAR solo en tests de unidades** (devDependency), condicionado a la pregunta de abajo. Para fracciones y álgebra: no aporta. Razón: es el único candidato que ataca la fila 4 desde `npm test`, con licencia Apache y mantenimiento sólido.

**Qué agente mejora:** `resolutor-exacto` deja de revisar a mano las conversiones de unidades de los generadores: un test fijo las recorre todas. `verificador` lo corre sin hacer nada nuevo (ya corre `npm test`).

## Para Ronald
pint (Python) ya quedó como USAR en desarrollo para unidades. ¿Preferís que la comprobación de unidades viva en los tests de JavaScript (corre sola en cada commit, suma una dependencia de desarrollo) o en un script de Python que corren los agentes? Recomiendo JavaScript: no depende de que Python esté instalado y nadie tiene que acordarse de correrlo. No hace falta tener los dos.

## Lecciones nuevas
- 2026-10-29 · ACIERTO · Comparar contra los tests existentes (`generadores-algebra.test.ts` ya recorre >5000 fracciones con multiplicación cruzada) evitó proponer una librería para algo ya cubierto. · Antes de proponer un "verificador de cuentas", buscar qué comprueban ya los tests del generador.
