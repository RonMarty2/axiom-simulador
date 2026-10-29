# Plan de mejoras con repositorios externos (desde 29-oct-2026)

**Para retomar desde una ventana nueva:** leé este archivo entero, después `docs/inventario-capacidades.md` y el informe de `docs/repos/<repo>.md` del paso que toque. Marcá cada paso `[x]` en el mismo commit que lo termina. El paso siguiente es el primero sin marcar.

Ronald aprobó todo lo de este plan el 29-oct-2026 («sí a todo lo que mejore»), con una condición: **no romper nada de lo que ya funciona.**

## Reglas para no romper nada (valen para cada paso)

1. **Un paso = un commit.** Si algo sale mal, se deshace con `git revert <commit>` sin tocar lo demás.
2. **Antes de cada commit:** `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`. Las cuatro en verde o no se sube. El mismo control corre en el CI (`.github/workflows/ci.yml`).
3. **Las herramientas nuevas no entran a la app del alumno** salvo en la fase 5. Van como `devDependencies`, scripts de `scripts/` o Python fuera del repo. El peso de la PWA no cambia hasta la fase 5.
4. **Los tests nuevos de pantallas (Playwright) no cambian `npm test`.** Van en un comando aparte (`npm run test:pantallas`), así un fallo ahí no frena lo que ya funciona.
5. **Lo que el alumno ve (fase 5) primero se prueba en una sola pieza.** Yo lo miro en celular y tablet, después Ronald da el visto bueno, y recién entonces se extiende.
6. **No tocar** los generadores de animaciones ni el banco salvo en los pasos que lo dicen. Las versiones rápidas de las animaciones están PAUSADAS (la siguiente era `estequiometria`); se retoman cuando Ronald diga.
7. Texto que ve el alumno: tuteo. Docs y código: rioplatense.
8. Al terminar cada paso: entrada corta en `BITACORA.md`, lecciones en `docs/lecciones-agentes.md`, commit y push a `main` (hay sesiones en paralelo: `git fetch` y `git pull` antes).

## Agentes: qué cambia

- **Nuevo (ya creado):** `evaluador-repositorios`. Revisa repos externos con un protocolo fijo. Se usa solo cuando haya repos nuevos para evaluar.
- **No se crean más agentes.** Se mejoran los que ya existen, cada uno en el paso indicado:

| Agente | Qué gana | Paso |
|---|---|---|
| `resolutor-exacto`, `analista-resolucion`, `redactor-explicaciones` | Comprueban cuentas, unidades y química con un script fijo en vez de código suelto | 2.1 |
| `verificador` | Corre el script de cuentas y el test de pantallas antes de aprobar | 2.1 y 3.3 |
| `revisor-visual`, `auditor-pantallas-movil` | Corren primero el test automático (gratis); el agente caro solo mira lo que el test no ve | 3.3 |
| `transcriptor-examenes`, `transcriptor-medicina`, `auditor-facsimil` | Parten de un borrador de MinerU en vez de mirar páginas enteras como imagen | 4.2 |
| `autor-laminas`, `auditor-figuras` | Pueden usar gráficas (Mafs) y moléculas (smilesDrawer) | 5.1 y 5.2 |

## Fase 0 · Evaluación (HECHO, 29-oct)
- [x] Inventario de lo que hace Axiom: `docs/inventario-capacidades.md`.
- [x] Agente `evaluador-repositorios`.
- [x] 27 repos evaluados a fondo y 17 descartados con una línea, en dos tandas; informes en `docs/repos/`. Pruebas útiles copiadas a `docs/repos/anexos/` (las rutas internas apuntan a la carpeta temporal de la sesión del 29-oct: ajustarlas al usar).

## Fase 1 · Arreglos seguros (no cambian lo que el alumno ve, salvo el zoom y el contraste)
- [x] **1.1 Esconder `/prueba-animacion/barrido` en producción.** Hoy no tiene la protección que sí tiene `/prueba-animacion` (`page.tsx:51`, `notFound()` fuera de desarrollo). Es una página `"use client"`: agregar `src/app/prueba-animacion/barrido/layout.tsx` (servidor) que llame a `notFound()` si `NODE_ENV !== "development"`. Comprobar: en dev responde 200 (`curl localhost:3001/prueba-animacion/barrido`), y `npm run build && npm start` da 404.
- [x] **1.2 Permitir zoom.** `src/app/layout.tsx`: quitar `maximumScale: 1` y `userScalable: false` del `viewport`. Riesgo: en iPhone, un campo de texto con letra menor a 16 px hace zoom solo al tocarlo; revisar con grep los `input` y `textarea` del login, registro y pagar, y subirlos a 16 px si hace falta. Comprobar en celular: login, simulador, una lección.
- [x] **1.3 Una sola lista de nombres de elementos.** `NOMBRE_ELEMENTO` está en `generadores-quimica.ts:33` y en `generadores-redox.ts:16`, con diferencias. Dejar una sola (unir las dos, exportarla desde un lugar) e importar en el otro. Comprobar: `npm test` (los tests de química y redox recorren todas las combinaciones).
- [x] **1.4 Botón «Explicada» que se sale de la pantalla** en `/prueba-animacion` (40 px en 375 y 72 px en 343; solo panel de desarrollo). En `Generador.tsx`, que la fila de botones haga `flexWrap: "wrap"`. Comprobar con el detector de `docs/repos/anexos/desborde.mjs`.
- [x] **1.5 Contraste bajo** en `/` (3 casos), `/login` (4) y `/precios` (4); el peor es un enlace gris claro (1,83 de contraste, el mínimo es 4,5). Ver `docs/repos/axe-core.md`. Cambiar el color en el token de LIENZO correspondiente (bitácora §4), no pieza por pieza. Comprobar con axe y a ojo en celular.

## Fase 2 · Comprobar cuentas con herramientas (solo desarrollo)
- [x] **2.1 Script fijo de verificación** `scripts/verificar-cuenta.py` con sympy (cuentas exactas), pint (unidades) y chempy (masas molares y balanceo). Dependencias en `scripts/requirements-dev.txt`. En esta máquina se llama `python`, no `python3`, y es la 3.11: fijar `pint<0.26`. Casos que deben pasar: `1/2-3/4+5/6 = 7/12`, raíces de `x²-5x+6`, `√50 = 5√2`, `72 km/h = 20 m/s`, `5 m + 3 s` debe dar error, balanceo de `Fe + O2`. Después, actualizar los agentes de la tabla de arriba para que lo llamen. Ver `docs/repos/sympy.md`, `pint.md`, `chempy.md`.
- [x] **2.2 Test de masas atómicas** (JS, sin dependencias): un `.test.ts` que compare `MASAS_ATOMICAS` de Axiom con valores de referencia de PubChem (dominio público) escritos en el test, con tolerancia 0,5. Antes de agregar Cl o Cu, confirmar en un PDF del banco si la UMSS usa 35,5 y 63,5. Ver `docs/repos/Periodic-Table-JSON.md` y `anexos/comparar-masas.cjs`.

## Fase 3 · Revisar pantallas en celular sin agentes caros
- [x] **3.1 Playwright + axe** como `devDependencies` (`@playwright/test`, `@axe-core/playwright`). Tests en `pruebas-pantallas/` (fuera de `src/`, así `npm test` no los toma). Comando `npm run test:pantallas`. Rutas del alumno en 343 y 375 px: `/`, `/login`, `/aprende`, `/practicar`, `/precios`. Detector de desbordes **elemento por elemento** (la receta de `document.scrollWidth` no ve lo que esconde un padre con `overflow: hidden`): partir de `anexos/desborde.mjs` y `anexos/axiom.spec.mjs`. Ojo con npm en esta máquina: hay variables de entorno (`npm_config_allow_scripts`, `npm_config_local_prefix`) que hacen fallar `npm i`. Ver `docs/repos/playwright.md`.
- [x] **3.2 CI:** paso aparte en `ci.yml`, después del build, con el servidor de producción. axe con **trinquete**: la cantidad de fallas actuales no puede subir, pero no frena por las que ya existen. Sin comparación de capturas en CI (las referencias dependen del sistema operativo); esas, solo en local.
- [x] **3.3 Actualizar agentes:** `revisor-visual`, `auditor-pantallas-movil` y `verificador` corren primero `npm run test:pantallas` y solo miran lo que el test no puede ver.

## Fase 4 · Borrador automático de exámenes con MinerU (solo en la PC de Ronald)
- [x] **4.1 Script `scripts/pdf-a-borrador.py`** que corre `mineru-kit parse <pdf> -o <carpeta> --tier basic` y deja el `.md` crudo en una carpeta temporal (fuera del banco). Instalación aparte: `py -3.11 -m venv` + `pip install mineru` (0,8 GB de modelos). **Nunca usar `--remote`**: manda el PDF a un servidor externo. Ver `docs/repos/MinerU.md`.
- [x] **4.2 Actualizar agentes** `transcriptor-examenes`, `transcriptor-medicina` y `auditor-facsimil`: parten del borrador y contrastan contra el render del PDF. El borrador INVENTA cosas (caracteres chinos en un escaneo, opciones mezcladas, borra la fecha del encabezado): **contar y leer siempre las cinco opciones** y sacar la fecha del PDF.
- [x] **4.3 Medir** en un examen real cuántos tokens cuesta con y sin borrador. Si no ahorra, se descarta y se anota.
- [ ] **4.4 Créditos:** agregar una línea de créditos a MinerU (licencia con cláusula de atribución; ver el informe).

## Fase 5 · Lo que el alumno ve (de a una pieza, con visto bueno de Ronald)
- [ ] **5.1 Gráficas de funciones con Mafs** (HECHA en la rama `prueba-mafs`, falta el visto bueno de Ronald) en UNA lección de cuadrática (parábola con raíces y vértice). Mirar en celular y tablet, peso agregado (~15 KB gzip). Riesgo: sin commits desde marzo de 2025; si se abandona, se copia al repo (es chico). Ver `docs/repos/mafs.md`.
- [ ] **5.2 Moléculas con smilesDrawer** como imágenes SVG fijas generadas por un script (no se carga nada en el celular). Empezar con 3 o 4 moléculas de una lámina de química o medicina. Ojo: el SVG trae `<style>` y `<mask>` que el sanitizador de figuras (`svg-sanitizar.ts`) podría quitar. Ver `docs/repos/smilesDrawer.md`.
- [ ] **5.3 Repaso de errores con ts-fsrs (versión 5.x, no la 6, que pide Node 24).** Decidido por Ronald: «Mis errores» vuelve a preguntar las mismas preguntas falladas en su fecha de repaso, y una pregunta acertada 2 o 3 veces seguidas sale de la lista. **Toca la base de datos (Supabase): plan propio antes de empezar**, con migración que no borre los errores guardados. Ver `docs/repos/ts-fsrs.md`.
- [ ] **5.4 Dificultad real de cada pregunta** con un Elo propio (unas 10 líneas, idea de jsCAT) sobre las respuestas guardadas en `simuladores`. Primero como reporte interno en `/admin`, que el alumno no ve. Ver `docs/repos/jsCAT.md`.

## Descartado (no volver a evaluar)
Lista completa en `docs/inventario-capacidades.md`, sección «Ya evaluados». Respuestas escritas por el alumno (MathLive, compute-engine, kas): **no por ahora**, el examen UMSS es de opción múltiple.
