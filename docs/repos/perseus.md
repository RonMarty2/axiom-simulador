# khan/perseus (evaluado 29-oct-2026)

Decisión: **TOMAR LA IDEA** (y quizá USAR solo `@khanacademy/kas` en scripts). Perseus completo: DESCARTAR.

## 1. Qué es de verdad
El sistema de ejercicios de Khan Academy: toma un ejercicio en formato JSON propio, lo muestra, deja interactuar y lo corrige. Monorepo con 12 paquetes: `perseus` (renderer + widgets), `perseus-score` (corrección), `kas` (mini CAS que compara expresiones), `kmath`, `math-input` (teclado matemático para celular), `perseus-editor`, `perseus-linter`. NO resuelve: no genera ejercicios con números nuevos ni explica pasos; asume que el ejercicio ya viene escrito.

## 2. Licencia
`LICENSE` raíz leído: MIT, Copyright 2022 Khan Academy. `packages/kas/LICENSE.txt`: MIT 2014 Khan Academy. Todos los `package.json` de paquetes dicen MIT. Permite uso comercial. No encontré partes con licencia distinta en el repo de código. Ojo: el contenido de Khan Academy (los ejercicios reales) NO está acá; se rige por otra licencia (CC BY-NC-SA) y no lo revisé.

## 3. Salud
Último commit 28-oct-2026 (ayer). Releases npm el 28-oct. Muy activo, no archivado. Issues abiertos: no verificado (no hay `gh` en la máquina).

## 4. Peso y dónde corre
Tamaños npm (`unpackedSize`): perseus 4,3 MB, math-input 3,2 MB, perseus-score 247 KB, kmath 120 KB, **kas 395 KB (dist/index.js 93 KB, 20 KB gzip)**. `perseus` exige React, wonder-blocks (muchos paquetes peer), @dnd-kit, etc. Es de cliente, pesado y con un sistema de diseño ajeno: no cabe en una PWA de gama baja ni con el kit `lienzo.tsx`. `kas` es solo ESM sin dependencias salvo `perseus-utils`; sirve en cliente (20 KB gzip) y en scripts Node.

## 5. Mapa contra Axiom
- Fila 11 (entrada de respuestas matemáticas): `kas` + `math-input` es justo lo que falta. kas compara lo escrito por el alumno con la respuesta correcta (equivalencia algebraica). Mejor que hoy (hoy no existe).
- Fila 10 (práctica): el formato de ejercicio de Perseus (enunciado + widgets + respuesta + pistas) es buena referencia para ejercicios generados con corrección. Hoy no existe.
- Fila 3 (exactitud): `kas` simplifica y compara con fracciones exactas; puede ser capa única de verificación en scripts, alternativa a sympy.
- Fila 1 (fórmulas): kas imprime TeX (`\frac{1}{2}+...`) que katex renderiza. Igual que hoy.
- Fila 6 (gráficas): `interactive-graphs` es una gráfica de funciones interactiva; pesada dentro de perseus. Solo idea.
- Filas 2, 4, 5, 7, 8, 9: no toca.

## 6. Prueba chica (en scratchpad, `npm i @khanacademy/kas`)
Probado:
- `1/2 + 1/3` parsea y da TeX `\frac{1}{2}+\frac{1}{3}`.
- `1/2 - 3/4 + 1/3`: `.simplify()` da `1/12` exacto (correcto: 6/12-9/12+4/12). `.eval()` da decimal 0.0833...
- `compare('1/12', '1/2 - 3/4 + 1/3')` = igual (true). `compare('5/12', mismo)` = no igual (correcto).
- `compare('(x-2)(x-3)', 'x^2-5x+6')` = igual; con `x^2-5x+7` = no igual.
- `1/12` vs `0.0833` = no igual (no acepta decimales aproximados sin tolerancia).
- Fallos míos o del paquete: `.factor()` no existe (la cuadrática no se factoriza); `expand()` de `(x-2)(x-3)` devuelve `x*x+x*-3+-2*x+-2*-3`, no queda en forma `x^2-5x+6` (no colecciona términos). Mi prueba con `x=2 or x=3` y `sqrt(8)` abortó por un error mío de uso; no probado. Unidades (`5 m/s`) parsea como variables, no entiende unidades.
Perseus completo: no probado (exige pnpm, wonder-blocks, storybook); no tiene sentido por peso.

## 7. Costo de integrar
kas solo como verificador en scripts: 1 archivo nuevo (`scripts/verificar-equivalencia.mjs`), riesgo bajo, sin tocar el bundle. kas + entrada de respuestas en la app: nueva pantalla de práctica, 20 KB gzip al cliente más un teclado propio (math-input pesa 3,2 MB, no sirve); estimo 5 a 8 archivos y es decisión de producto. Perseus entero: reescribir práctica y simulador; no lo hagas.

## 8. Decisión
**TOMAR LA IDEA:** (a) el formato de ejercicio con corrección por equivalencia para `/practicar`; (b) opcional USAR `@khanacademy/kas` (MIT, 20 KB gzip) cuando se decida aceptar respuestas escritas (fila 11), con caso `compare` verificado.
Agente que mejora: `resolutor-exacto` podría comprobar «la respuesta del instituto es equivalente a la mía» con kas en un script fijo (aunque sympy hace más: factorizar, resolver).
Confianza: media-alta para kas (probado), media para el resto (leído).

## Para Ronald
Si algún día quieren que el alumno escriba la respuesta, la pieza a mirar es `kas`, no Perseus. Es decisión de producto.

## Lecciones nuevas
- El paquete `perseus` pesa 4 MB y exige un sistema de diseño ajeno; el valor está en paquetes chicos aislados (`kas`, `kmath`).
- En esta máquina la variable `npm_config_allow_scripts` rompe `npm i` en carpetas nuevas (error EALLOWSCRIPTS); hay que hacer `unset npm_config_allow_scripts npm_config_local_prefix` antes de instalar en el scratchpad.
