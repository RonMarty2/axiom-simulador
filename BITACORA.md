# 📒 Bitácora · AXIOM Simulador UMSS

> **Documento vivo.** Si sos una IA o un dev nuevo leyendo esto: acá está TODO lo que necesitás para entender el proyecto, sus decisiones y su historia. Leé las secciones en orden — están pensadas para que en 10 minutos sepas dónde estás parado.

**Última actualización:** 2026-08-03 (Láminas de Repaso: estructura módulo → láminas atómicas + mapa de 64 láminas para Aritmética-Álgebra, §4.5)
**Versión de la bitácora:** v1.6
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

## 4.5. Sistema de "Láminas de Repaso" (contenido premium, formato hoja-de-referencia)

**Origen:** Ronald mostró un producto externo (ScienceProo · "Estadística Visual", venta por $17 con 250 láminas PDF) como inspiración para una línea de contenido premium en AXIOM. Se decidió: (a) vive DENTRO de la app (no PDF descargable), (b) arranca por Aritmética-Álgebra de Ingeniería como piloto, (c) el banco de exámenes UMSS se usa como MAPA de qué temas cubrir y con qué frecuencia aparecen — nunca como guion literal de una pregunta puntual; cada lámina enseña el concepto general (ver punto 6 de esta sección).

Se iteró un mockup 4 veces (artifact, no código de producción todavía) hasta llegar a una plantilla aprobada por Ronald. Las primeras 3 versiones fallaron por razones específicas — documentarlas para no repetir el error:

- **v1 (rechazada — "nada didáctico, muchas cajas negras, no se siente que se aprende"):** copiaba el formato del producto de referencia: tarjetas de colores, fórmula "armada en piezas" sin explicar por qué, todo dentro de cajas con fondo oscuro. Es un formato de **repaso** (para quien ya sabe el tema), no de **enseñanza** (para quien lo ve por primera vez). AXIOM necesita lo segundo.
- **v2 (mejor, pero incompleta):** sacó las cajas oscuras, agregó una demostración real ("por qué funciona"), pero la demostración asumía que el lector ya entendía qué es "dividir un polinomio" — saltaba directo a notación nueva (`P(x) = (x-a)Q(x) + R`) sin conectarla a nada conocido. Feedback de Ronald probándolo sin saber el tema: "no me queda claro".
- **v3 (mejor todavía, pero con un salto lógico):** agregó un **puente** al inicio (ver regla 1 abajo) que ancló todo a la división con resto de la primaria (17÷5 = 3, resto 2). Mejoró mucho, pero a mitad de la demostración volvió a soltar la mano del puente y metió dos ideas nuevas en un solo paso sin justificarlas ("R es un número fijo" + "podés meter cualquier x") — Ronald: "empieza muy bien pero me perdía en medio camino".
- **v4 (aprobada — "está excelente"):** separó esas dos ideas en pasos distintos, sacó la que no era esencial para el argumento ("R no tiene x") del camino lógico principal y la bajó a un dato-extra al pie, y dejó como paso explícito y justificado la idea que sí hacía falta: la igualdad P(x)=(x-a)Q(x)+R vale para **cualquier** x, por eso podés elegir meter x=a a propósito.

**Reglas fijas para toda lámina nueva** (aplicar desde el primer borrador, no como corrección posterior):

1. **Puente obligatorio al inicio.** Nunca arrancar con notación nueva. Conectar el concepto con algo que el lector ya sabe de memoria (aritmética básica, algo de la vida diaria, un caso ya visto), y mantener esa comparación activa —lado a lado— durante toda la demostración, no solo en la primera línea.
2. **Un salto lógico nuevo por paso, nunca dos.** Si una idea no es estrictamente necesaria para llegar a la conclusión (aunque sea cierta e interesante), sacarla del camino principal y ponerla como "dato extra" al final, no en medio del argumento.
3. **Explicitar el paso "obvio" que en realidad no lo es.** El salto que más pierde al lector suele ser el que el autor da por sentado (ac: "por qué puedo meter cualquier valor de x"). Nombrarlo y justificarlo explícitamente, no asumir que se infiere solo.
4. **Menos cajas, más prosa corrida.** Nada de grids de tarjetas de colores ni fondos oscuros como estructura principal. Acentos puntuales sí (una línea con borde de color para el gancho inicial, una conclusión centrada, un "Ojo" para el error típico) pero la mayoría del contenido es texto fluido, como si alguien te lo estuviera explicando, no una hoja de referencia para repasar algo que ya sabés.
5. **Estructura recomendada (probada, no romper el orden):** Gancho (pregunta que engancha) → Puente (conexión con lo 100% conocido) → Por qué funciona (demostración paso a paso, sin saltos, con el puente presente) → Aplicándolo (un ejemplo trabajado, narrado, integrado en el texto) → Ojo (el error típico, conectado a un paso específico de la demostración, no una regla suelta para memorizar) → Generalización (mismo concepto en otras formas — esto es lo que evita que la lámina sea "solo esa pregunta de examen") → Practicalo vos (un ejercicio con solución colapsable) → pie con prerequisito/siguiente tema.
6. **El banco de exámenes es mapa, no guion.** Usar `data/examenes/umss/ingenieria/*.md` (campo `tema:`) para saber qué está cubierto y con qué frecuencia — pero cada lámina debe enseñar la familia de conceptos completa (ej. "medidas de tendencia central" en general, no solo "media aritmética" porque fue lo que preguntó un examen puntual). El etiquetado `tema:` del banco es muy granular (para Aritmética-Álgebra de Ingeniería: 653 preguntas en 496 tags distintos, con bastante redundancia semántica entre tags parecidos) — hace falta agruparlos en familias de temas reales antes de mapear 1 lámina = 1 tema.
7. **Figuras (geometría, gráficos): SIEMPRE con coordenadas calculadas, nunca a mano.** Cuando una lámina necesita una figura (triángulos, circunferencias, ángulos, tangentes, gráficos de función), construirla con geometría/trigonometría real (coordenadas exactas calculadas, no aproximadas ni "dibujadas a ojo") y renderizarla como SVG a partir de esas coordenadas — igual que ya se exige para las animaciones de lección (`Ejes`, `scalerX`/`scalerY` en `lienzo.tsx`). Un dibujo que "se ve más o menos como" la figura pero no es geométricamente exacto es peor que no tener figura, porque enseña mal. Nada de aproximaciones visuales sueltas.
8. **Reutilizar `src/app/aprende/_components/pedagogia.tsx` y `lienzo.tsx`** para la versión de producción (colores, tipografía, componentes `WorkedExample`/`Misconception`/`Resumen` ya existen y cubren casi 1:1 los bloques de la lámina) — el mockup en HTML/CSS standalone fue solo para iterar el diseño rápido con Ronald, no es el código final.
9. **Altamente didáctico, visual y con ejemplos — no negociable.** No alcanza con prosa bien escrita: cada lámina necesita al menos un ejemplo numérico completo trabajado paso a paso (no solo el resultado) y, cuando el tema lo permite, apoyo visual real (figura con coordenadas calculadas —regla 7— o un esquema simple del tipo "puente" como el 17÷5). Ronald lo remarcó explícitamente después de ver la lista de 64 láminas: el objetivo es que se sienta una clase bien dada, no una hoja de fórmulas prolija.

**Estructura confirmada — familias como módulos, no como láminas:** una familia de temas grande (ej. "Logaritmos", 101 preguntas en el banco) NO es una lámina — es un **módulo** que se abre en varias **láminas atómicas**, cada una enseñando un solo concepto concreto de cero, encadenadas entre sí con el pie "Necesitás antes / Te abre la puerta a" (regla 5). Ejemplo real (módulo Logaritmos): ¿Qué es un logaritmo? → Propiedades → Cambio de base → Ecuaciones exponenciales → Ecuaciones logarítmicas simples → Ecuaciones logarítmicas complejas → Dominio de func. logarítmicas → Aplicaciones (crecimiento/decaimiento). Mismo criterio aplicado a las 24 familias de Aritmética-Álgebra de Ingeniería da **64 láminas atómicas** (65 si se suma Números Complejos, familia de 1 sola pregunta histórica — pendiente decidir si vale la pena o queda para después). Lista completa de módulos y su desglose en láminas: `/tmp/claude-0/-home-user-axiom-simulador/53c85eee-7bad-5b14-bd8c-7a119b7647f2/scratchpad/agrupar_temas.py` (script de agrupación) — mover a un lugar permanente del repo cuando se arranque a picar código de producción.

**Rollout confirmado:** una lámina a la vez, con revisión de Ronald antes de pasar a la siguiente (no por tandas). El piloto "Teorema del Resto" (mockup v4, sección arriba) es la primera de las 5 láminas del módulo "Teorema del Resto y división de polinomios".

**Pendiente:** decidir si Números Complejos entra como módulo de 1 lámina o se pospone; empezar a portar el mockup a código de producción real (`pedagogia.tsx`/`lienzo.tsx`) para la primera lámina.

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
- [x] Banco de Ingeniería: 139 exámenes reales 2005-2025, incluye categoría PRE-U 2024-2025 (ver §11).
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

### 2026-08-03 (Láminas de Repaso: mapa completo de módulos para Aritmética-Álgebra Ingeniería)

Se agrupó el banco de 653 preguntas de Aritmética-Álgebra de Ingeniería (496 tags `tema:` crudos) en **24 familias temáticas**. Ronald corrigió el enfoque inicial: una familia grande (ej. Logaritmos, 101 preguntas) NO debe convertirse en 1-2 láminas gigantes — cada familia es un **módulo** que se abre en varias **láminas atómicas**, una por concepto concreto, encadenadas con "Necesitás antes / Te abre la puerta a". Resultado: **64 láminas atómicas** planificadas (65 con Números Complejos, pendiente de confirmar por ser una familia de 1 sola pregunta). Se confirmó también el ritmo de producción: una lámina a la vez, con revisión de Ronald antes de la siguiente. Reforzado en §4.5 regla 9: cada lámina debe ser fuertemente visual y con ejemplos trabajados completos, no solo prosa. Todavía sin código de producción — sigue pendiente portar el mockup aprobado a `pedagogia.tsx`/`lienzo.tsx`.

### 2026-07-31 (diseño del sistema de "Láminas de Repaso" — sin código de producción todavía)

Se definió y validó con Ronald (4 iteraciones de mockup) el formato de una nueva línea de contenido premium: "láminas" de repaso visual dentro de la app, inspiradas en un producto externo pero con enfoque didáctico real (enseña desde cero, no repasa lo ya sabido). Reglas de diseño completas, con el ejemplo aprobado y la historia de qué falló en cada iteración, documentadas en **§4.5**. Piloto elegido: Aritmética-Álgebra de Ingeniería. Todavía no se escribió código de producción — el mockup vive en un artifact fuera del repo, pendiente portarlo a `pedagogia.tsx`/`lienzo.tsx` cuando se arranque a producir láminas reales.

### 2026-07-30 (banco de Ingeniería a 139 exámenes · categoría PRE-U 2024-2025 + materia nueva)

**Qué se cargó:** 13 exámenes más, después de que Ronald revisó su carpeta local y detectó que faltaban gestiones que no se habían mandado todavía. Con esto el banco de Ingeniería pasa de 126 a **139 exámenes**.

- **4 Exámenes de Ingreso estándar** (20 preguntas, 4 áreas × 5): 1-2024 Tercera Opción, 2-2024 Única Opción (primer archivo de esa gestión), 1-2025 Primera y Segunda Opción.
- **9 parciales/finales de una categoría nueva: "PRE-U"** — es el nombre que la UMSS le puso a partir de 2024 al mismo curso que antes se llamaba "Curso Pre-Facultativo"/"Curso Propedéutico" (misma `categoria: parcial_curso` del banco, no se creó una categoría nueva). Vienen en PDFs que bundlean 3 exámenes cada uno (Primer Parcial + Segundo Parcial + Final) en un solo archivo de hasta 18 páginas — hubo que Leer el PDF por rangos de página (`pages: "1-6"`, `"7-12"`, etc.) y despachar un agente por examen, no por PDF.
  - PRE-U 1-2024 (3 exámenes, 40 preguntas c/u: Aritmética 5, Geometría 5, Química 5, Física 5, Biología 10, **Estrategias de Aprendizaje 10**).
  - PRE-U 2-2024 (3 exámenes: el Primer Parcial tiene 38 preguntas —Biología y Estrategias con 9 c/u, no 10—, Segundo Parcial y Final tienen 30 —Biología y Estrategias con 5 c/u—. La estructura NO es uniforme entre gestiones ni entre parciales de la misma gestión; hay que leer cada PDF real, nunca asumir por patrón).
  - PRE-U 1-2025 (3 exámenes, 20 preguntas c/u: Aritmética 5, Geometría 5, Química 5, Física 5 — esta gestión NO tiene Biología ni Estrategias de Aprendizaje, volvió a la estructura de 4 áreas).

**Materia nueva: "Estrategias de Aprendizaje"** (`area: estrategias_aprendizaje`) — no es matemática/ciencia, son preguntas de técnicas de estudio (aprendizaje significativo, metacognición, ABP, etc.). No existía en el banco antes de 2024. Se agregó su etiqueta ("Estrategias de Aprendizaje") a los 3 mapas `ETIQUETAS_AREA` de la UI (`examenes/page.tsx`, `simulador/[simId]/page.tsx`, `simulador/[simId]/resultados/page.tsx`) — de paso se completaron ahí mismo `fisica`/`quimica`/`biologia`, que llevaban 87+ exámenes del banco mostrándose en texto crudo sin formatear porque nunca se habían agregado esas 3 etiquetas.

**Ponderación en exámenes de 6 áreas:** cuando un examen tiene Biología/Estrategias con el doble (o casi) de preguntas que las demás áreas, la ponderación sigue repartiéndose EN PARTES IGUALES entre las áreas presentes (16.67% × 6, o 25% × 4 en los PRE-U 1-2025 sin Bio/Estrategias) — es el mismo criterio de "área pesa igual sin importar cuántas preguntas tenga" que ya se usaba en el resto del banco. Decisión confirmada explícitamente por Ronald antes de cargar.

**Detección de duplicados:** de los 7 archivos originalmente identificados como "faltantes", 3 resultaron ser el mismo contenido que exámenes ya cargados en una tanda anterior de la sesión (con nombre de archivo distinto pero texto idéntico) — se descartaron sin re-procesar, comparando contra el repo antes de dispatchear agentes.

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
