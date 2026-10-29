# microsoft/playwright (`@playwright/test`) (evaluado 29-oct-2026)

Cubre dos pedidos del área de calidad: (1) pruebas visuales en celular con comparación de capturas (`toHaveScreenshot`) y (4) detección de desbordes y texto cortado (no trae detector propio: se escribe un `page.evaluate`, abajo).

## 1. Qué es de verdad
Corredor de pruebas que maneja Chrome/Firefox/WebKit: abre páginas con el tamaño de un celular, hace clics, mide el DOM, saca capturas y las compara contra una referencia guardada (pixelmatch). Resuelve lo que hoy hacen `scripts/barrido.mjs` y `scripts/capturas.mjs` con CDP escrito a mano (~45 líneas de cañería cada uno), más la comparación antes/después que hoy se hace byte a byte a mano (lección 18-oct). NO trae un detector de "fórmula partida en un producto" ni de "texto cortado": eso hay que escribirlo (y ya lo tenemos a medias en `barrido/page.tsx`).

## 2. Licencia
`node_modules/playwright-core/LICENSE` y `@playwright/test/LICENSE` leídos: Apache 2.0. Uso comercial permitido. Solo herramienta de desarrollo/CI, no va al alumno.

## 3. Salud
GitHub API (29-oct-2026): 98,8 mil estrellas, último push hoy, no archivado, 229 issues abiertos. Versión 1.64.1. Muy activo (Microsoft).

## 4. Peso y dónde corre
Solo desarrollo y CI. `@playwright/test` 28 KB + `playwright-core` 14 MB + `playwright` 5 MB en `node_modules`. El navegador aparte: se puede usar el Chrome instalado (`channel: "chrome"`, así probé) o bajar Chromium (~150 MB, en CI se cachea). En la máquina de Ronald ya hay navegadores de Playwright en `%LOCALAPPDATA%\ms-playwright` (chromium-1234). Cero impacto en el bundle.

## 5. Mapa contra Axiom
- Fila 12 (agentes de calidad): la parte mecánica de `revisor-visual` (desborde, etiquetas montadas, piezas que cambian entre versiones) y de `auditor-pantallas-movil` (desborde horizontal, botones de menos de 44 px) pasa a test gratis. Lo que sigue necesitando ojos: corte feo de una fórmula en un operador, espacio excesivo, color confuso.
- Fila 2 (animaciones): `toHaveScreenshot` sobre `/prueba-animacion/barrido?tipo=X` de las animaciones YA APROBADAS congela su aspecto; si alguien toca `Fusion.tsx` y cambia un píxel en una aprobada, el test falla y muestra el diff. Es exactamente la "comparación byte a byte antes/después" de la lección 18-oct, automatizada.
- `scripts/barrido.mjs` y `capturas.mjs`: podrían reescribirse en Playwright (menos código), pero funcionan; no vale reescribirlos por reescribir.
- Pantallas del alumno (`/`, `/login`, `/aprende`, `/practicar`, `/precios`): hoy nadie las mide en celular salvo un agente a pedido.

## 6. Prueba chica
Servidor de Ronald en `localhost:3001` respondía 200 en `/`, pero `/prueba-animacion/barrido` daba **404** aunque el archivo existe y no llama `notFound()` (servidor dev desactualizado; no lo reinicié). Probé contra lo que respondía y contra dos HTML míos.

Archivos: `C:\Users\lmigu\AppData\Local\Temp\claude\C--Users-lmigu-SynologyDrive-10-TRABAJO-LOCAL-axiom-simulador\43a89cb4-026f-4b6b-8af3-66679e531c28\scratchpad\calidad\pruebas\` (`desborde.mjs`, `axiom.spec.mjs`, `html.spec.mjs`, `romper.spec.mjs`) y `playwright.config.mjs` (proyectos 343x800 y 375x812, `isMobile`, escala 2).

- **Detector con bueno y malo:** HTML bueno: 0 desbordes. HTML malo (fórmula `1/2 + 1/3 = 3/6 + ...` con `nowrap`, botón con `overflow:hidden`): detecta desborde de 136 px en 343 y 104 px en 375, y el botón recortado 128 px. La PRIMERA versión del detector no vio la fórmula: el `<p>` mide lo mismo que el contenedor aunque su texto se salga. Se arregló midiendo `scrollWidth` (misma lección del 17-oct con `offsetWidth`).
- **Axiom real, 6 rutas x 2 anchos, 52 s:** `/`, `/login`, `/aprende`, `/practicar`, `/precios`: 0 desbordes. `/prueba-animacion`: **hallazgo real**, el botón «Explicada» se sale 40 px en 375 y 72 px en 343 (lo confirmé mirando la captura: queda cortado en el borde). La comprobación típica de internet (`document.scrollWidth > clientWidth`) da **0** ahí, porque `section.axiom-shell` tiene `overflow: hidden`: el desborde queda escondido, no desaparece. Solo lo ve el chequeo por elemento.
- **Comparación de capturas:** primera corrida crea la referencia (falla a propósito, así funciona); segunda corrida pasa en los dos anchos (estable, sin falsos). Con `letter-spacing: 0.5px` inyectado en los títulos: falla con 750 píxeles distintos (1 %). Funciona.
- La consola del navegador tiró 1 o 2 «404 Not Found» de recursos en `/`, `/aprende`, `/practicar`, `/precios` (no investigué cuál).

Núcleo del detector (lo que vale copiar):
```js
const derecha = cs.overflowX === "visible" ? Math.max(r.right, r.left + e.scrollWidth) : r.right;
if (derecha > vw + 1 || r.left < -1) { /* se sale */ }
if (e.scrollWidth > e.clientWidth + 1 && /hidden|clip/.test(cs.overflowX)) { /* recortado */ }
// saltear hijos de <svg> (trazos de KaTeX), esperar document.fonts.ready antes de medir
```

## 7. Costo de integrar
- 1 devDependency (`@playwright/test`), 1 `playwright.config.ts`, 1 carpeta `e2e/` con 2 o 3 archivos, 1 script `test:pantallas` en `package.json`. No toca generadores ni componentes. `npm test` (node --test) no se entera.
- **Riesgo 1, capturas por sistema operativo:** las referencias quedan como `login-cel375-win32.png`; en CI (Ubuntu) las fuentes se dibujan distinto y no coinciden. Hay que elegir: referencias generadas en Linux (la imagen Docker oficial de Playwright) o comparación de capturas solo local y en CI solo el detector de desbordes (que no depende de píxeles).
- **Riesgo 2, servidor:** CI hoy no levanta servidor. Playwright lo hace con `webServer: { command: "npm run start" }` después del build. Pero `/prueba-animacion` hace `notFound()` fuera de dev, así que el barrido de animaciones en CI necesitaría `next dev` (lento en frío; lección 09-oct: 59 falsos justo después de arrancar) o dejar el barrido como hoy, local.
- Las pantallas con login (`/dashboard`) piden sesión; no las probé.
- Tiempo en CI: estimo 2 a 4 min más (bajar Chromium + build ya hecho + recorrido). No medido en CI.

## 8. Decisión
**USAR**, en este orden:
1. Test de desbordes y botones por ruta del alumno (343, 360, 375, 412) en CI, sin capturas: barato, sin falsos por fuentes.
2. Local: referencias de capturas de las animaciones aprobadas en el barrido, para atrapar cambios no buscados al tocar `Fusion.tsx`.
3. Más adelante, si se quiere en CI, referencias generadas en Linux.

Agente que mejora: `revisor-visual` deja de buscar desbordes y piezas montadas (lo hace el test) y se concentra en lo que solo un ojo ve; `auditor-pantallas-movil` pasa de "sacar captura con Playwright y mirar" a correr el test y mirar solo las pantallas que fallan. `verificador` agrega `npx playwright test` a sus cuatro verificaciones cuando el diff toca interfaz.

Confianza: alta (probado contra el servidor real y contra HTML bueno/malo). No probado: barrido de animaciones (404), CI en Linux, pantallas con login.

## Para Ronald
- El botón «Explicada» de `/prueba-animacion` se corta en celular (página interna, no la ve el alumno).
- `/prueba-animacion/barrido` no tiene el `notFound()` que sí tiene `/prueba-animacion`: leyendo el código, en producción quedaría pública. No lo comprobé en producción.

## Lecciones nuevas
- 2026-10-29 · ERROR · La receta común de desborde (`document.scrollWidth > clientWidth`) dio 0 en `/prueba-animacion` aunque un botón se salía 40 px: un padre con `overflow: hidden` esconde el desborde. · Medir por elemento (caja y `scrollWidth`), no solo la página.
- 2026-10-29 · ERROR · Mi detector, primera versión, no vio una fórmula `nowrap` que se salía del `<p>`: la caja del `<p>` no crece con su texto. · Medir `scrollWidth` en elementos con `overflow: visible` y probar siempre con un caso malo hecho a propósito.
