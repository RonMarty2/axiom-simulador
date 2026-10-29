# cortex-js/compute-engine (evaluado 29-oct-2026)

## 1. Qué es de verdad
Motor matemático en TypeScript, del equipo de MathLive: parsea LaTeX a MathJSON, evalúa, simplifica, resuelve, expande y factoriza. NO da pasos intermedios (busqué "step/explain" en README y ROADMAP: nada que sirva).

## 2. Licencia
LICENSE leído: MIT (CortexJS). Uso comercial permitido.

## 3. Salud
Último commit 2026-10-28; versión 0.173.0 publicada el 28-oct. Muy activo. Sigue en 0.x: la API cambia entre versiones.

## 4. Peso y dónde corre
JS/TS, corre en cliente y servidor. Pesa: 25,7 MB desempacado; `dist/esm-min` 18 MB, de los cuales `integration-rules.js` solo 7 MB; todos los .js juntos comprimidos con gzip dan 2,4 MB. El cliente carga solo los chunks que use, pero NO lo medí con un bundler. Pide Node >= 22.12. Dependencias: complex.js y @arnog/colors. Para celulares de gama baja es pesado: medir antes de justificarlo.

## 5. Mapa contra Axiom
- Fila 11 (entrada de respuestas matemáticas): es el único del grupo que corre en el navegador y entiende lo que escribe el alumno. Afecta `/practicar` y `/simulador`. Hoy no existe.
- Fila 10: podría validar equivalencia de respuestas (`x+1` vs `\frac{x^2-1}{x-1}`).
- Fila 3: igual que sympy en aritmética básica.
- Filas 1 y 2: no reemplaza KaTeX ni los generadores; no da pasos.

## 6. Prueba chica
Instalado en el scratchpad (`npm i` normal falló por una regla de scripts del entorno; usé `npm pack`, copié a node_modules e instalé las 2 dependencias). Script `scratchpad\ce\t.mjs`:
- `\frac12+\frac13` = Rational(5,6) OK
- `\frac12-\frac34-(-\frac56)` = 7/12 OK (coincide con sympy)
- `\sqrt{50}` = 5\sqrt{2} OK
- `\frac{x^2-1}{x-1}` simplify = x+1 OK
- `x^2-5x+6=0` solve('x') = [3, 2]; Expand `(x+2)^2` = x^2+4x+4; Factor = (x-3)(x-2) OK
Tropiezo mío: con la cadena sin `String.raw` las barras `\f` y `\s` se interpretaron y salió basura (`5acr`). En código real se usa `String.raw`. No probé unidades ni química (no las trae).

## 7. Costo de integrar
Medio. Campo de entrada (LaTeX o MathLive) más función de equivalencia, con import dinámico solo en las pantallas que lo usen. 3 a 5 archivos más cambio al modelo de pregunta (hoy solo opción múltiple). Riesgo: bundle, API 0.x y la decisión de producto.

## 8. Decisión
**USAR, condicionado**: solo si Ronald decide que el alumno escriba respuestas. Si no, **DESCARTAR** por ahora; como herramienta de desarrollo no aporta sobre sympy.
Agente que mejora: ninguno hoy; abre la capacidad 11.

Confianza: alta en las cuentas (probado), media en el peso (no medido en bundle).

## Para Ronald
¿Quieres que el alumno pueda escribir su respuesta? Si sí, este es el motor candidato; antes hay que medir los KB en un celular real. Ver también `mathlive.md`.

## Lecciones nuevas
En el scratchpad `npm i` puede fallar por la regla de scripts; `npm pack` y copiar a node_modules funciona.
