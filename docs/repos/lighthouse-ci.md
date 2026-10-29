# GoogleChrome/lighthouse-ci (`@lhci/cli`) (evaluado 29-oct-2026)

## 1. Qué es de verdad
Corre Lighthouse (el informe de Chrome) varias veces sobre URLs, guarda los resultados y falla si se pasan umbrales que uno fija ("peso total menor a X", "CLS menor a 0,1", "accesibilidad mayor a 0,9"). Emula un celular de gama media con 4G lento y CPU 4 veces más lenta. NO revisa la PWA: **Lighthouse 12 sacó la categoría PWA** (instalable, service worker); el informe que bajé no tiene ninguna auditoría de manifest ni service worker. Tampoco mide el peso por paquete (eso sería size-limit o el analizador de Next).

## 2. Licencia
`@lhci/cli/LICENSE` y `lighthouse/LICENSE` leídos: Apache 2.0. Uso comercial permitido. Solo CI.

## 3. Salud
GitHub API: 7,1 mil estrellas, último push 28-oct-2026, no archivado, 164 issues. `@lhci/cli` 0.15.1, que trae Lighthouse 12.6.1 adentro (el último Lighthouse suelto es 13.6.0; lhci va una versión atrás).

## 4. Peso y dónde corre
Solo CI/desarrollo. `@lhci/cli` 935 KB, pero arrastra `lighthouse` (22 MB) y `puppeteer-core` (16 MB). Necesita un Chrome. Cero impacto en el bundle.

## 5. Mapa contra Axiom
- Restricción "PWA para celulares de gama baja": hoy nadie mide cuánto pesa ni cuánto tarda la app en un celular lento. Un umbral en CI atraparía, por ejemplo, que alguien meta una librería de 300 KB al cliente sin darse cuenta (justo lo que el inventario pide justificar).
- Fila 12: no reemplaza a ningún agente actual (ninguno mide rendimiento). Es cobertura nueva, no ahorro de tokens.
- Accesibilidad: repite lo que axe ya da (Lighthouse usa axe por dentro), con menos detalle.

## 6. Prueba chica
`npx lhci collect --url=http://localhost:3001/ --url=http://localhost:3001/login -n 1`, 45 s las dos. Resultados en `scratchpad\calidad\.lighthouseci\`:
- `/`: rendimiento 43, accesibilidad 89, buenas prácticas 96, SEO 100. LCP 8,3 s, bloqueo 1.470 ms, CLS 0, peso total 3.365 KB.
- `/login`: rendimiento 63, accesibilidad 87. LCP 7,5 s, peso 1.009 KB.
- `lhci assert` con umbrales de ejemplo (`lighthouserc.json`): falla bien, "accesibilidad 0,89 < 0,9" y "peso 3.445.836 > 800.000".

**Estos números NO valen**: es el servidor de desarrollo (sin minificar, con recarga en caliente). Para números reales hay que correrlo contra `next build && next start`, que no hice porque escribiría `.next` dentro del proyecto. Probé que corre y que el umbral frena; no probé cuánto pesa la app de verdad.

## 7. Costo de integrar
Un `lighthouserc.json` y un paso en `ci.yml` después del Build (`lhci autorun` levanta `next start` solo). Cada URL 3 corridas = unos 20 a 40 s por URL. Riesgo: Lighthouse varía entre corridas (sobre todo el rendimiento en máquinas de CI compartidas); conviene poner umbrales solo en cosas estables (peso total en bytes, CLS) y no en la nota de rendimiento. Las pantallas con login no se miden sin armar sesión.

## 8. Decisión
**USAR, pero después de Playwright y axe**, y solo con umbral de peso total y CLS en 3 o 4 rutas públicas (`/`, `/login`, `/precios`, una lección gratis). Medir primero contra un build de producción para fijar el umbral con el número real (cifra que salga de la medición, no inventada).
Agente que mejora: ninguno de los actuales; el `verificador` gana una línea: "si el diff agrega una dependencia al cliente, mirar el paso de Lighthouse".

Confianza: media (corre y frena, pero no lo medí sobre un build de producción).

## Para Ronald
Si querés que el CI frene cuando la app se ponga pesada para celulares baratos, esto es lo que lo hace. Es la última prioridad del grupo: no ahorra tokens de agentes, cuida el peso.

## Lecciones nuevas
- 2026-10-29 · SUERTE · Iba a evaluar "Lighthouse para la PWA" y Lighthouse ya no tiene categoría PWA desde la versión 12. · Antes de proponer una herramienta por una función, comprobar que la versión actual la sigue teniendo.
- 2026-10-29 · ACIERTO · Medir Lighthouse contra `npm run dev` da 3,3 MB y LCP de 8 s: es el servidor sin minificar. · Solo medir rendimiento sobre `next build && next start`.
