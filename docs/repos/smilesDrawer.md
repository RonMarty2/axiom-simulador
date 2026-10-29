# smilesDrawer (reymond-group/smilesDrawer) - evaluado 29-oct-2026

## 1. Qué es
Dibuja fórmulas estructurales a partir de un texto SMILES (`CC(=O)O` = ácido acético), en SVG puro de JavaScript, sin servidor ni plantillas. NO resuelve: nombrar moléculas, calcular masas ni predecir reacciones (hay `ReactionDrawer`, pero solo dibuja).

## 2. Licencia
`LICENSE.md` leído: MIT (c) 2017 GDB / Reymond Research Group. Uso comercial permitido. Dependencia directa `chroma-js` (su licencia no la verifiqué).

## 3. Salud
Último commit 21-oct-2026 (merge de dependabot). Versión 2.4.1 publicada el 26-jun-2026. Sin archivar. Issues abiertos: no verificados (no hay `gh` en esta máquina).

## 4. Peso y dónde corre
`dist/smiles-drawer.min.mjs` 197 KB (59 KB gzip). Una sola dependencia. Corre en cliente y también en Node con jsdom (probado). Sirve en scripts y en la app.

## 5. Mapa contra Axiom
- Fila 7 (moléculas, hoy "nada, solo texto"): lo resuelve. Mejora clara.
- Fila 5 (química): complemento visual de `generadores-quimica.ts` y `generadores-redox.ts`; cada compuesto puede llevar su SMILES como dato.
- Fila 6 (figuras de examen): serviría para preguntas del banco con estructuras (ver `docs/figuras-pendientes.md`) sin dibujarlas a mano en `definiciones.ts`.
Afecta: `src/lib/figuras/` (un tipo "molécula"), `agentes/auditor-figuras.md`, `agentes/autor-laminas.md`.

## 6. Prueba chica
En el scratchpad (`t/sd2.mjs`), con jsdom, `SmilesDrawer.parse` + `SvgDrawer(300x200)`:
- `CCO`, `CC(=O)O`, `c1ccccc1`, ibuprofeno `CC(C)Cc1ccc(cc1)C(C)C(=O)O`, glucosa `OCC1OC(O)C(O)C(O)C1O`: todos dibujan. Ibuprofeno = 3,3 KB de SVG; glucosa = 6 KB con 6 etiquetas de texto.
- Ion `[NH4+]`: dibuja (1 etiqueta de texto, 819 bytes).
- `C(C` (inválido): error claro "number of opening parentheses does not match...". Sirve para validar datos.
No probado: cómo SE VE el SVG (no lo abrí en un navegador ni lo convertí a imagen) ni la medida de texto sin `canvas` en Node (jsdom avisa "getContext not implemented"). El SVG trae un bloque `<style>` y una `<mask>` propios; el sanitizador de `src/lib/figuras/` podría quitarlos. Revisar antes de integrar.

## 7. Costo de integrar
Bajo a medio: un componente `Molecula.tsx` con carga diferida (solo lecciones de química), o un script que pre-renderice SVG estático (así el celular no baja los 59 KB), y una lista de SMILES como dato único. Unos 3 a 5 archivos nuevos, no rompe tests existentes. Riesgo: sanitizado del SVG y colores en modo oscuro. Estimación mía, no medida.

## 8. Decisión
**USAR**, empezando por un script que genera SVG estático desde SMILES (sin tocar el bundle) y, si hace falta interactividad, el componente con carga diferida.
Agente que mejora: `auditor-figuras` pasa a dibujar estructuras con un SMILES verificable en vez de pintarlas a mano; `autor-laminas` puede pedir la molécula por su SMILES.

## Para Ronald
Confirmar si Medicina y Química necesitan estructuras en pantalla; si sí, vale la pena. Confianza: media (corre y dibuja, falta ver el resultado).

## Lecciones nuevas
- jsdom no define `SVGSVGElement` ni `getComputedStyle` como globales: hay que copiarlos de `dom.window` a `globalThis`.
