# dequelabs/axe-core + `@axe-core/playwright` (evaluado 29-oct-2026)

## 1. Qué es de verdad
Motor de reglas de accesibilidad (WCAG) que corre dentro de la página y devuelve las violaciones: contraste de color, imágenes sin `alt`, botones sin nombre, zoom bloqueado, títulos, etc. `@axe-core/playwright` lo inyecta en un test de Playwright en una línea. NO detecta desbordes horizontales ni texto cortado (eso es Playwright + detector propio), y no juzga si un texto se entiende.

## 2. Licencia
`axe-core/LICENSE` y `@axe-core/playwright/LICENSE` leídos: Mozilla Public License 2.0. Permite uso comercial; el copyleft es por archivo y solo obliga si se modifican y distribuyen sus archivos. Acá corre en desarrollo/CI sin modificar y no se entrega al alumno: sin riesgo práctico.

## 3. Salud
GitHub API: axe-core 7,7 mil estrellas, último push 26-oct-2026; axe-core-npm 728 estrellas, push 27-oct-2026. Ninguno archivado. Versión 4.14.0. Mantenido por Deque (empresa de accesibilidad).

## 4. Peso y dónde corre
Solo desarrollo/CI. `axe-core` 3,4 MB desempaquetado, `@axe-core/playwright` 48 KB. Depende de Playwright. Cero impacto en el bundle.

## 5. Mapa contra Axiom
- Fila 12: `auditor-pantallas-movil` revisa "botones inaccesibles" a ojo; axe mide contraste y nombres de botones gratis. Tap targets de 44 px: axe 4.x tiene `target-size` (WCAG 2.2, 24 px), no los 44 px del agente; eso va en el detector propio de Playwright.
- No toca matemática, banco ni animaciones. Lo que aporta es a la interfaz general de la PWA.

## 6. Prueba chica
Mismo montaje que `playwright.md` (`scratchpad\calidad\pruebas\axiom.spec.mjs` y `detalle.spec.mjs`), reglas `wcag2a` + `wcag2aa`, en 343 y 375 px.
- HTML malo mío: detecta `color-contrast`, `document-title`, `image-alt`. HTML bueno: 0. Correcto.
- Axiom real (servidor dev de Ronald):
  - En TODAS las rutas: `meta-viewport` — `src/app/layout.tsx` líneas 82-83 tienen `maximumScale: 1` y `userScalable: false`: el alumno no puede hacer zoom con dos dedos.
  - `/`: 3 contrastes insuficientes. `/login`: 4. `/precios`: 4. Ejemplos de `/login`: texto `#d97706` sobre `#fef7eb` (2,99, pide 4,5) a 11 px; un enlace `#bdbfc7` sobre blanco (1,83) a 11 px. Algunos son enlaces de entrada de desarrollo (`/api/auth/dev-login?rol=admin`) que el alumno no ve.
  - `/aprende`, `/practicar`, `/prueba-animacion`: solo `meta-viewport`.
- Cada análisis tarda menos de 1 s por página.

## 7. Costo de integrar
Una devDependency más sobre Playwright y 3 líneas por ruta en el mismo archivo de pruebas. Riesgo: el primer día falla por lo que ya existe (zoom bloqueado y contrastes). Hay que arrancar con esas reglas en lista de "conocidas" (trinquete, como ya hace el repo con otros tests) y que falle solo lo nuevo.

## 8. Decisión
**USAR**, junto con Playwright (mismo archivo de pruebas), con trinquete: lo existente se anota y solo frena lo nuevo.
Agente que mejora: `auditor-pantallas-movil` deja de opinar sobre contraste y nombres de botones (lo mide axe) y se queda con lo que necesita ojos (cifras partidas en 3 renglones, espacio desperdiciado).

Confianza: alta (probado contra el servidor real y contra HTML bueno/malo).

## Para Ronald
- **Zoom bloqueado** (`userScalable: false`): es decisión de producto. Ayuda a que la PWA se sienta app y evita zoom accidental en las animaciones, pero un alumno con vista baja no puede agrandar una fórmula chica. Recomiendo permitir el zoom (sacar `maximumScale` y `userScalable`) y mirar si algo se rompe; si preferís mantenerlo, se marca como conocido en el test.
- Contrastes bajos en `/`, `/login`, `/precios`: textos naranja claro y gris claro a 11 px. Son pocos; los decide quien lleva el diseño.

## Lecciones nuevas
- 2026-10-29 · ACIERTO · axe encontró en 1 s por página lo que un agente de pantallas no había reportado (zoom bloqueado en toda la app, contrastes de 1,83 a 3,37). · Pasar lo medible a test y dejar al agente lo que necesita ojo.
