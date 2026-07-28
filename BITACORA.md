# 📒 Bitácora · AXIOM Simulador UMSS

> **Documento vivo.** Si sos una IA o un dev nuevo leyendo esto: acá está TODO lo que necesitás para entender el proyecto, sus decisiones y su historia. Leé las secciones en orden — están pensadas para que en 10 minutos sepas dónde estás parado.

**Última actualización:** 2026-07-28 (banco de exámenes Ingeniería UMSS completo, 2005-2025)
**Versión de la bitácora:** v1.3
**Mantenedor:** Ronald (RonMarty2)

---

## 0. Reglas para mantener esta bitácora

**Cuándo se actualiza:** después de cualquier cambio significativo (feature nuevo, refactor importante, bug serio resuelto, decisión arquitectónica).

**Quién la actualiza:** la IA o el dev que acaba de hacer el cambio. PROPONE el cambio en formato diff, y el mantenedor (Ronald) lo aprueba con un *"sí, actualizá la bitácora"* o equivalente.

**Qué se actualiza:**
- Sección **§ Roadmap / pendientes** → tachar lo hecho, agregar lo nuevo.
- Sección **§ Cambios mayores** → nueva entrada al inicio con fecha + descripción.
- Sección **§ Decisiones arquitectónicas** → solo si hay un nuevo principio.
- Sección **§ Errores garrafales** → cuando se descubra y corrija uno.
- Resto de secciones → solo si cambian de raíz.

**Nunca se actualiza sin autorización.** Si la IA hace un cambio y propone tocar la bitácora, debe pedir luz verde antes. Ronald dijo: *"con mi autorización"*.

**Formato de las entradas:** español rioplatense informal, sin emojis decorativos en el contenido (los emojis solo viven en los títulos de sección si ayudan a navegar).

---

## 1. Identidad del proyecto

**Nombre:** AXIOM — Simulador UMSS
**Slug repo:** `ronmarty2/axiom-simulador`
**URL producción:** `axiom-simulador.vercel.app`

**Idea central:** plataforma web/PWA para que estudiantes bolivianos se preparen al **examen de admisión de la Universidad Mayor de San Simón (UMSS)** en Cochabamba. Combina lecciones animadas estilo 3Blue1Brown con un simulador que replica el examen real.

**Por qué importa:** el examen UMSS es muy específico (preguntas multi-paso, 5 opciones con "Ninguno" trampa). Las plataformas genéricas no preparan para ESE examen. AXIOM sí.

**Facultades cubiertas (banco de exámenes):** Ciencias Económicas, Ingeniería, Medicina, Derecho. La más desarrollada es Económicas.

**Plan de monetización:** Unidad 01 de cada bloque GRATIS, resto premium. Banner de Vercel + Stripe (placeholder).

---

## 2. Stack técnico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 15+ |
| Lenguaje | TypeScript | 5+ |
| UI lib | React | 19 |
| Animaciones | Framer Motion | latest |
| Estilos | Tailwind CSS v4 + CSS módulos | — |
| PWA | Service Worker manual + manifest | — |
| Hosting | Vercel | — |
| Auth/DB | API routes + memoryStore (no DB persistente en MVP) | — |
| IA (futuro) | Anthropic Claude (provider configurable) | — |

**Convenciones de código:**
- Imports relativos: `../_components/foo`.
- Componentes en TSX + `"use client"` cuando son interactivos.
- Sin emojis en código (solo en docs/UI explícita si Ronald los pide).
- Comentarios solo cuando el "por qué" no es obvio. NUNCA "qué hace el código".

---

## 3. Estructura del producto

### 3.1 Rutas principales (`src/app/...`)

| Ruta | Propósito |
|------|-----------|
| `/` | Landing pública |
| `/dashboard` | Home logueado: stats + acciones rápidas |
| `/aprende` | Índice de áreas y unidades (colapsable) |
| `/aprende/[slug]` | Lección individual (animada o no) |
| `/simulador` | Crear simulacro |
| `/simulador/[simId]` | Tomar el examen |
| `/simulador/[simId]/resultados` | Calificación + feedback |
| `/practicar` | Modos de práctica focalizada |
| `/errores` | Repaso de errores cometidos |
| `/ranking` | Top 10 |
| `/cuenta` | Plan, perfil |
| `/precios` | Página de precios |
| `/admin/banco` | Panel para curar el banco de preguntas |

### 3.2 Contenido pedagógico (bloques)

Los bloques se ven en `/aprende`. Tres áreas grandes:

**BLOQUE 1 · Fundamentos económicos, contables y administrativos** (alineado con la guía oficial FCE-UMSS 2024)
- Unidad 01: Introducción general a la ciencia económica (6 lecciones).
- Unidad 02: Introducción a la contabilidad (4 lecciones).
- Unidad 03: Conceptos fundamentales de la administración (4 lecciones).
- Unidad 04: Proceso administrativo (5 lecciones).

**BLOQUE 2 · Razonamiento matemático** (11 unidades)
- Operaciones fundamentales, MCD/MCM, Potenciación, Radicación, Operaciones con radicales (Unidad 01).
- Razones y proporciones, Regla de tres, Repartos proporcionales (Unidad 02).
- Álgebra (Unidad 03), Funciones y gráficas (Unidad 04).
- Ecuaciones 1er grado, sistemas, ecuaciones 2do grado, desigualdades.
- Logaritmación, Sucesiones y series, Teoría de exponentes.

**BLOQUE 3 · Razonamiento verbal y lógico** (10 unidades, alineado con guía oficial FCE-UMSS)
- Comprensión de lectura, Denotación/connotación, Léxico contextual.
- Cohesión, Plan de redacción, Expresión correcta.
- Analogías verbales, Aseveraciones y cuantificadores, Silogismos, Secuencias lógicas.

### 3.3 Componentes compartidos (`src/app/aprende/_components/`)

- `LeccionShell.tsx` — shell común de cualquier lección (header sticky, progreso, footer con navegación).
- `lienzo.tsx` — sistema visual: paleta LIENZO, componentes Pizarra, Ejes, Pot (potencia), Frac (fracción), Raiz, EcuacionFinal, Repetir.
- `pedagogia.tsx` — bloques de contenido: Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen, EscenaRica, AutoCheck, **PracticaFinal**, **LecturaQuiz**, **+ Kit didáctico modular (v1.1):** Hook (gancho amarillo), CasoBolivia (azul cielo), Misconception (rojo), Mnemotecnia (violeta), Conexion (gris dim), WorkedExample (violeta accent), MiniQuiz.
- `atoms.tsx` — tokens visuales y helpers (Stage, escenaWrap, etc.).

### 3.4 Banco de exámenes (`data/examenes/umss/`)

Markdown por año, con frontmatter YAML + preguntas. Estructura:

```
data/examenes/umss/
├── economicas/
│   ├── 2023.md  ← examen real curado (10 preguntas multi-paso)
│   └── 2024.md  ← AÚN nivel "simplón", pendiente reescribir
├── ingenieria/...
├── medicina/...
└── derecho/...
```

El parser está en `src/lib/axiom/banco-parser.ts`. Acepta 4-5 opciones (A-E).

---

## 4. Sistema visual "LIENZO"

**Inspiración:** 3Blue1Brown.

**Paleta:**
| Token | Valor | Uso |
|-------|-------|-----|
| `bg` | `#fafaf7` | Fondo principal (off-white cálido) |
| `bgSoft` | `#f1f0eb` | Áreas elevadas |
| `fg` | `#1a1a2e` | Texto principal (navy oscuro) |
| `fgDim` | `#5a5a6e` | Texto secundario |
| `fgFaint` | `#b8b8c4` | Bordes, líneas, faded |
| `accent` | `#6d28d9` | Acento violeta profundo |
| `ok` | `#059669` | Verde bosque |
| `warn` | `#d97706` | Ámbar |
| `bad` | `#dc2626` | Rojo |

**Tipografía:**
- `var(--font-crimson)` — Crimson Pro serif para títulos, ecuaciones y matemática.
- `var(--font-atkinson)` — Atkinson Hyperlegible sans para cuerpo.

**Principios de animación (probados a sangre):**
1. **Matemática como HTML real, no como SVG suelto.** Para potencias, fracciones, raíces, usar `<sup>` nativo, `flexbox` y SVG inline integrado. NUNCA dibujar números flotando con coordenadas SVG sueltas — se ven mal.
2. **En `motion.text` SVG NO mezclar atributo `x/y` con `x/y` de `animate`.** El segundo es un *translate*; si los dos están, el elemento se va al doble de distancia. Bug pasado.
3. **Raíz cuadrada en UN solo SVG.** Check (✓) + vínculo superior + radicando en el mismo dibujo. Si separás trazos, se desconectan.
4. **Animaciones deben coincidir con el texto.** Si el texto dice "X pesa más", visualmente X debe ir HACIA ABAJO (física básica). Verificar.

---

## 5. PWA y actualización OTA

- **Service Worker** en `public/sw.js`. Estrategia **network-first** con fallback a cache.
- **Manifest** en `src/app/manifest.ts`. Display `standalone`.
- **PWARegister.tsx** registra el SW, detecta modo standalone, y maneja:
  - Aplicar clase `axiom-pwa` al `<html>` cuando corre instalada.
  - Suprimir el banner `beforeinstallprompt` en desktop (UA detection).
  - **OTA automática:** detecta SW nuevo → manda `SKIP_WAITING` → cuando cambia el controller, `window.location.reload()` UNA sola vez. Sin reinstalar.
- **CSS forzado por display-mode:** las reglas `@media (display-mode: standalone)` se aplican sin esperar a JS, garantizando vista app.

---

## 6. Decisiones arquitectónicas (las que importa entender)

### D1. Áreas y unidades colapsables, **cerradas por default**
Las 35+ unidades hacen la página /aprende muy larga. Cerrar todo por default permite que el usuario abra lo que le interesa.

### D2. Plan free limitado a Unidad 01 de cada bloque
Decidido por Ronald. El resto es premium. Las unidades premium muestran su título y "🔒 SOLO PREMIUM" para que el usuario sepa qué hay.

### D3. Componentes pedagógicos compartidos antes que copiar
Toda lección importa de `_components/pedagogia.tsx`. Si querés cambiar el estilo visual de TODAS las lecciones, tocás un archivo, no 30.

### D4. Animación = ilustración de teoría, no decoración
Cada animación debe ilustrar UN concepto específico. Si la animación no enseña algo distinto al texto, no debería estar.

### D5. Markdown como formato del banco de preguntas
Más fácil de auditar y editar a mano que JSON. Frontmatter YAML + bloques `## Pregunta N`. Parser tolerante.

### D6. Examen real al nivel del examen real
Las preguntas del simulador deben replicar la dificultad del examen UMSS auténtico: multi-paso, 5 opciones con "Ninguno" trampa. Las preguntas "de 1 paso" no preparan para nada. Por eso 2023.md fue reescrito desde el facsímil oficial.

### D7. Kit didáctico modular (v1.1)
Cada lección que requiere profundidad pedagógica usa 6 componentes opcionales además del esqueleto base: **Hook** (peso en el examen), **Mnemotecnia** (acrónimo o regla memorable), **Misconception** (error típico al detalle), **CasoBolivia** (aplicación local), **Conexion** (mapa con otras unidades), **WorkedExample** (problema resuelto paso a paso con verificación). Estos componentes son reutilizables y consistentes. Si una lección usa diseño totalmente custom (como `potenciacion` estilo 3Blue1Brown), respetar su coherencia y no forzar el kit.

---

## 7. Errores garrafales detectados y corregidos (lecciones aprendidas)

| Fecha | Error | Cómo se detectó | Lección |
|-------|-------|----------------|---------|
| 2026-06 | Balanza de escasez giraba al revés (necesidades arriba en vez de abajo) | Ronald al revisar | Si una metáfora física, simulala mentalmente |
| 2026-06 | Indicador "6 ⌃" parecía "6 elevado a algo" (potencia) | Ronald al revisar móvil | Carácter `⌃` se renderiza elevado; usar SVG chevron |
| 2026-06 | Flujo circular económico tenía flechas en un solo sentido con etiquetas mezcladas | Auditoría posterior | Dibujar AMBOS flujos (bienes/dinero en sentidos opuestos) |
| 2026-06 | Banner "Instalar app" aparecía en PC | Ronald al revisar | `beforeinstallprompt` se intercepta solo en mobile UA |
| 2026-06 | Pull-to-refresh deshabilitado en modo PWA | Ronald al revisar | `overscroll-behavior-y: contain` lo bloqueaba; cambiar a `auto` |
| 2026-06 | Parser de banco rechazaba preguntas con 5 opciones | Al cargar examen real | Validador exigía `length === 4`; relajar a `4 || 5` |
| 2026-06 | Layout 2fr/1fr aplastaba columna derecha del dashboard en móvil | Ronald al revisar móvil | Grid responsivo con media query |
| 2026-06 | `motion.text` SVG con `y=` atributo + `y` en animate duplicaba posición | Múltiples animaciones rotas | Usar solo animate (translate) o solo atributo, no ambos |
| 2026-06 | Raíz `√` dibujada como trazo SVG + borde HTML separado, se desconectaba | Lección Potenciación | Un solo SVG con todo el dibujo |

---

## 8. Roadmap / pendientes

### Crítico
- [ ] Reescribir **examen 2024** UMSS Económicas con preguntas multi-paso (paralelo a lo que se hizo con 2023).
- [ ] Verificar respuesta de Pregunta 1 del examen 2023 (fracciones anidadas). Mi cálculo discrepa del oficial; revisar a mano o con sympy.
- [x] Banco de Ingeniería: 126 exámenes reales 2005-2025 (ver §11, entrada 2026-07-28).
- [ ] Crear bancos serios para Medicina, Derecho (mismo patrón que Ingeniería, ver §11).

### Importante
- [ ] Animar las lecciones que aún son solo cards (revisar `grep -c "motion\." | sort` para identificarlas).
- [ ] Sistema real de auth + DB persistente (hoy es memoryStore).
- [ ] Stripe/pagos: hoy precios es placeholder.
- [ ] Auditoría visual sistemática en móvil: probar cada pantalla en device toolbar.

### Nice-to-have
- [ ] Editor admin de banco con WYSIWYG (parser markdown ya existe).
- [ ] Sistema de notificaciones (PWA push) para racha de estudio.
- [ ] Drag-and-drop para "Plan de redacción" (Unidad 5 de razonamiento verbal).
- [ ] Diagrama de Venn para silogismos (Unidad 9 razonamiento verbal) ya está hecho parcialmente.

### Investigación
- [ ] Costos de IA cuando se active generador-ia.ts.
- [ ] Métricas de retención: cuántas escenas completa un usuario.

---

## 9. Convenciones de Git y commits

- Branch principal: `main`. Push directo (no PR) para iteración rápida.
- Mensajes: estilo conventional commits **opcional**, prosa clara siempre. Ejemplos del repo:
  - `fix(aprende): chevron SVG en vez del carácter ⌃`
  - `feat(simulador): examen 2023 con preguntas del nivel REAL UMSS`
  - `fix(pwa): oculta el banner de instalación en desktop`
- Cuerpo del commit en español, explicando POR QUÉ del cambio.
- Sin firmas "Generated by AI" — no se incluyen en el repo.

---

## 10. Cómo retomar el proyecto (guía para otra IA / dev)

1. **Leé este archivo entero.** Sobre todo §3 (estructura), §4 (sistema visual), §6 (decisiones) y §7 (errores históricos).
2. Corré `npm install && npm run dev` para levantar local.
3. Para entender el estilo de las lecciones: abrí `src/app/aprende/potenciacion/page.tsx` (la más completa).
4. Para entender el banco de exámenes: leé `data/examenes/umss/economicas/2023.md` y el parser en `src/lib/axiom/banco-parser.ts`.
5. **Antes de tocar animaciones:** leé §4 "Principios de animación" — son lecciones aprendidas a fuerza de romper cosas.
6. **Antes de tocar PWA:** leé §5 — ya hay OTA y supresión condicional del banner; no romper eso.
7. Cuando hagas un cambio significativo, **proponé actualización a esta bitácora** y esperá luz verde.

---

## 11. Cambios mayores (changelog cronológico)

### 2026-07-28 (banco de exámenes Ingeniería UMSS completo · 126 exámenes, 2005-2025)

**Qué se cargó:** el archivo histórico completo de facsímiles UMSS Ingeniería que Ronald fue mandando en tandas de PDFs a lo largo de la sesión — **126 exámenes** en `data/examenes/umss/ingenieria/`, cubriendo gestiones 2005 a 2025 (falta 2021, no se mandó facsímil de ese año). Se separan por `categoria`: **69 Exámenes de Ingreso** (admisión, sin `categoria` en el frontmatter) y **57 Parciales/Finales de Curso Propedéutico/Pre-Facultativo** (`categoria: parcial_curso`) — la UI los muestra en tabs separados.

**Pipeline usado (turno por turno, sin Workflow autónomo):** por cada tanda de ~5 PDFs, se leían con el modelo principal (no OCR ciego — Claude lee el PDF directamente, texto + imagen), se pre-verificaban a mano los ítems más riesgosos (ecuaciones con exponentes que suelen perderse en la extracción, geometría dependiente de figura), y recién ahí se lanzaban agentes en paralelo (uno por examen) con instrucciones explícitas de resolver cada pregunta con cálculo completo antes de mirar las opciones. Cada archivo pasó por: (1) chequeo de estructura por regex (numeración secuencial, sin huecos, sin opciones en minúscula), (2) chequeo con el parser REAL (`banco-parser.ts`) contra todo el banco (0 colisiones de id, 0 errores de parseo, 0 casos donde la `respuesta_correcta` no tiene opción matching), (3) `tsc --noEmit`, (4) `npm run build`. Recién con las 4 verificaciones en verde se hacía commit + push.

**Política "no adivinar" (la más importante de esta sesión):** nunca se fuerza una respuesta a coincidir con una opción. Si el cálculo riguroso no da ninguna de las opciones listadas, se marca `E) Ninguno` con la explicación completa de por qué. Esto generó decenas de casos genuinos de "Ninguno" a lo largo del banco — son correctos, no errores de carga. Única excepción documentada caso por caso: cuando el resultado calza EXACTO salvo por un dígito faltante/transpuesto en la opción impresa (ej. "548.6" en vez de "3548.6", o "24π+16√2" en vez de "(24+16√2)π") — ahí se acepta la opción con nota explícita de que es un probable error de imprenta del examen original, nunca a ciegas.

**Bugs reales encontrados y corregidos durante la carga** (candidatos a §7 si se repiten):
- El parser de opciones (`^-\s+([A-E])\)`) solo reconoce mayúsculas. Varios PDFs originales usan "a) b) c)..." en Física/Biología; si un agente copiaba eso literal, rompía el archivo en silencio. Se agregó advertencia explícita en cada prompt de agente después de encontrar el primer caso.
- Una pregunta con `respuesta: E` sin su línea de opción `- E) Ninguno` correspondiente (el parser real no encuentra match y tira error) — encontrado con un script que recorre TODO el banco importando el parser real, no solo el archivo nuevo.
- Colisión de `id` entre dos exámenes de la misma gestión con el mismo `titulo` genérico (`construirId` prioriza `titulo` sobre `opcion` para el sufijo) — se resolvió agregando sufijo `(1ra/2da/3ra Opción)` al `titulo` en todos los exámenes de ingreso con múltiples opciones por gestión.
- 3 de los últimos 7 PDFs recibidos resultaron ser duplicados exactos de exámenes ya cargados antes en la sesión (mismo contenido, distinto nombre de archivo) — se detectaron comparando contra el repo antes de procesar, evitando trabajo repetido.

**Cómo seguir cargando más facultades/universidades:** el patrón de esta sesión (leer PDF → pre-verificar ítems riesgosos a mano → agentes en paralelo con "no adivinar" explícito → validación en 4 pasos → commit) es reutilizable tal cual para Medicina, Derecho u otras universidades bolivianas (ver roadmap §8).

### 2026-06-09 (sprint FCyT-Medicina · cobertura completa Tecnología y Medicina UMSS)

**Bloque Tecnología FCyT UMSS — cerrado (34 lecciones nuevas en el sprint):**
- **Química (10 unidades):** nociones-quimica, nomenclatura-inorganica, estructura-atomica, enlace-quimico, leyes-fundamentales-quimica, reacciones-balanceo, estequiometria (simulador combustión CH4), gases-ideales (simulador PV=nRT 3 sliders), soluciones (simulador molaridad con 5 compuestos), propiedades-coligativas (simulador ΔTb/ΔTc/π con factor i).
- **Biología (7 unidades):** componentes-materia-viva, bases-moleculares-vida, bases-celulares-vida, genetica-mendeliana (simulador Punnett interactivo), energia-celular, diversidad-seres-vivos, ecologia-medioambiente.
- (Geometría-Trig 10 y Física 7 quedaron de un sprint previo dentro de la misma corrida.)

**Bloque Medicina UMSS — completo end-to-end (18 lecciones):**
- **Morfofunción (12):** morfofuncion-introduccion, sistema-tegumentario, sistema-esqueletico, sistema-muscular, sistema-nervioso, sistema-endocrino, sistema-cardiovascular, sistema-linfatico-inmune, sistema-respiratorio, sistema-digestivo, sistema-urinario, sistema-reproductor.
- **Biología Celular y Molecular (3):** bcm-membrana-transporte, bcm-expresion-genica, bcm-bioenergetica-senalizacion.
- **Educación en Salud e Investigación (3):** eds-determinantes-salud, eds-epidemiologia, eds-investigacion-bioetica.

**Iteración de interactividad en Medicina:**
- `sistema-cardiovascular`: simulador "corazón latiendo" (SVG corazón pulsa según ciclo cardíaco en tiempo real, FC ajustable bradi/normal/taqui) + simulador de gasto cardíaco (GC = FC × VS con sliders y feedback).
- `sistema-nervioso`: simulador "potencial de acción" — botón "Disparar" que anima la curva de voltaje (−70 reposo → +30 pico → repolarización → hiperpolarización) graficada en SVG en tiempo real.

**Patrón didáctico aplicado en todo el sprint:**
- Cada lección sigue el esqueleto Hook → Definicion → Pizarra/SVG → WorkedExample → Mnemotecnia → Misconception → AutoCheck.
- Los simuladores interactivos son uno por unidad cuando el tema lo amerita.
- Contextualización Bolivia siempre presente (bocio yodo, altura/poliglobulia, megadiversidad, sistema sanitario boliviano, mortalidad materna).

**Pendientes asumidos para iterar:**
- Más simuladores en Medicina (urinario: filtración glomerular; respiratorio: mecánica ventilatoria; endocrino: glucemia).
- Crear banco de preguntas reales para Medicina UMSS (no hay facsímil oficial todavía).
- Atacar otras facultades UMSS (Derecho, Odontología, Bioquímica-Farmacia, Veterinaria, Agronomía, Arquitectura, Humanidades) y otras universidades públicas (UMSA, UAGRM, USFX, UAJMS, UTO, UATF, UPEA, UAB, UAP).

### 2026-06-08 (continuación · upgrade didáctico masivo)
- **+** Kit didáctico modular agregado a `pedagogia.tsx` (Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion, WorkedExample, MiniQuiz). Componentes reutilizables y consistentes.
- **+** 45 lecciones upgradeadas con el kit, divididas por bloque:
  - **Razonamiento verbal-lógico (10):** analogias-verbales, aseveraciones-cuantificadores, cohesion-textual, denotacion-connotacion, expresion-oracion, lectura-comprension, lexico-contextual, plan-redaccion, secuencias-logicas, silogismos.
  - **Economía (6):** escasez-necesidades, diez-principios, modelos-economicos, divisiones-economia, metodologia-leyes, perspectiva-historica-economia.
  - **Contabilidad (4):** clasificacion-estados, ciclo-contable, contabilidad-intro, usuarios-pcga.
  - **Administración (9):** naturaleza-admin, objetivos-funciones-admin, rol-retos-admin, evolucion-escuelas, planeacion, organizacion-admin, integracion-personal, direccion-admin, control-admin.
  - **Matemáticas (16):** teoria-exponentes, repartos-proporcionales, regla-de-tres, razones-proporciones, ecuaciones-primer-grado, ecuaciones-segundo-grado, sistemas-lineales, desigualdades, dominio-rango, sucesiones-series, mcd-mcm-algebraico, logaritmacion, funcion-lineal-cuadratica, expresiones-algebraicas, factorizacion, operaciones-radicales, + 3 grandes con touch ligero (radicacion, mcd-mcm, operaciones-fundamentales).
- **+** Decisión arquitectónica D7 (kit didáctico modular).
- **Excluida intencionalmente:** `potenciacion` (diseño 3Blue1Brown custom; el kit visual rompe coherencia).
- **Pendiente:** otras facultades UMSS (Ingeniería, Medicina, Derecho), otras universidades públicas de Bolivia (UMSA La Paz, UAGRM Santa Cruz, UAJMS Tarija, UTO Oruro, USFX Sucre, UATF Potosí, UPEA El Alto, UAB Beni, UAP Pando).

### 2026-06-08
- **+** Bitácora inicial creada (este archivo).
- **+** Examen UMSS Económicas 2023 reescrito con 10 preguntas reales multi-paso del facsímil oficial. 5 opciones (A-E) con "Ninguno".
- **+** Parser `banco-parser.ts` ampliado para aceptar 4 o 5 opciones.
- **fix** Dashboard: grid 2fr/1fr ahora colapsa a 1 col en móvil ≤720px.
- **fix** Flujo circular económico: dibujado con 4 flechas (bienes/factores + dinero en sentidos opuestos).
- **fix** Balanza de escasez: rotación invertida; lo pesado va abajo.
- **fix** Indicador colapsable: `⌃` reemplazado por chevron SVG + píldora "N lecciones".
- **feat** PWA OTA: recarga automática al detectar nueva versión del SW.
- **fix** PWA: pull-to-refresh restaurado en modo standalone; banner de instalación suprimido en desktop.

### 2026-06 (sesiones previas, resumen)
- Bloque 1 (Fundamentos económicos) rehecho según guía oficial FCE-UMSS: 4 unidades, 19 lecciones.
- Bloque 3 (Razonamiento verbal-lógico) implementado completo: 10 unidades, ~85 escenas, ~120 ejercicios con feedback pedagógico.
- Sistema visual LIENZO migrado a paleta clara (era oscuro inicialmente).
- 19 lecciones de matemáticas refactorizadas con `pedagogia.tsx` compartido.
- Áreas y unidades hechas colapsables, default cerrado.

---

*Fin de la bitácora v1.2 — Crecé conmigo.*
