# 📒 Bitácora · AXIOM Simulador UMSS

> **Documento vivo.** Si sos una IA o un dev nuevo leyendo esto: acá está TODO lo que necesitás para entender el proyecto, sus decisiones y su historia. Leé las secciones en orden — están pensadas para que en 10 minutos sepas dónde estás parado.

**Última actualización:** 2026-09-12 (notación química del banco de Ingeniería, landing pública migrada al rediseño, y la Pregunta 1 del 2023 resuelta)
**Versión de la bitácora:** v2.0
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
| Auth/DB | Supabase (Postgres) + sesión por cookie firmada | — |
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

### Pivote de formato: de scroll único a tarjetas (v5 — FORMATO FINAL)

El v4 de arriba (aprobado, portado a producción, probado en `axiom-simulador.vercel.app/laminas/teorema-del-resto/teorema-del-resto`) se armó como **una sola página con scroll continuo**. Ronald lo probó en el celular real (no solo en la compu) y lo rechazó — no por el contenido, sino por el formato contenedor: *"no me gusta la idea de aprender mientras haces scroll, soy más de aprendo, next, aprendo, next, me perdí de algo regreso, pero no quiero que esté horrible con siguiente o atrás, algo más visual."*

Se iteró un mockup v5 (artifact) con formato de **tarjetas/diapositivas** — aprobado sin cambios: *"Me gusta, está genial."* **Este es ahora el formato final y obligatorio para TODAS las láminas de TODAS las facultades/carreras** — no es una variante opcional, es la base sobre la que se construye cada lámina nueva de acá en adelante. Cualquier lámina que se agregue para otra carrera tiene que usar este mismo contenedor, no un scroll largo ni ningún otro formato.

**Qué cambia respecto a v4 (contenedor/navegación):**
- Cada sección de la estructura de la regla 5 (Gancho, Puente, cada Paso de la demostración por separado, Aplicándolo, Ojo, Generalización, Practicalo vos) es **una tarjeta propia**, no un bloque más en un scroll. Una idea por tarjeta — esto en realidad refuerza la regla 2 (un salto lógico por paso), porque ahora cada paso literalmente ocupa toda la pantalla y no compite visualmente con el resto.
- **Navegación SOLO con íconos, nunca texto.** Nada de botones "Siguiente" / "Anterior" escritos (eso es justo lo que LeccionShell —el wizard de `/aprende`— hace y que Ronald marcó como "horrible"). Dos círculos con flecha (◀ / ▶), el de avanzar resaltado en violeta.
- **Puntitos de progreso arriba, tocables.** No es solo un indicador visual — tocar cualquier punto salta directo a esa tarjeta. Es la respuesta concreta a "me perdí de algo, regreso": no hace falta retroceder tarjeta por tarjeta.
- **Swipe (deslizar) además de tocar.** Gesto táctil izquierda/derecha para pasar de tarjeta, más los botones y los costados de la pantalla tocables — varias formas de hacer lo mismo, todas sin texto.
- Mockup de referencia (artifact, congelar como snapshot visual — no es código de producción): contenido exacto de Teorema del Resto re-cortado en 10 tarjetas.

**Qué NO cambia (sigue aplicando igual, es contenido, no contenedor):** reglas 1, 2, 3, 6, 7, 9 completas, y el orden de la regla 5 (Gancho→Puente→Por qué funciona→Aplicándolo→Ojo→Generalización→Practicalo vos) — sigue siendo la secuencia correcta, ahora repartida en tarjetas en vez de un solo scroll. La regla 4 ("menos cajas, más prosa corrida") sigue valiendo DENTRO de cada tarjeta — la tarjeta llena la pantalla y adentro sigue siendo prosa fluida con acentos puntuales, no un grid de mini-tarjetas de colores como v1 (esa seguía siendo la razón de que v1 fallara: v1 era una grilla de MUCHAS cajas chicas visibles a la vez, compitiendo entre sí; v5 es UNA tarjeta grande a pantalla completa por idea, todas las demás ocultas hasta que avanzás — son cosas distintas, no una contradicción).

`LaminaShell.tsx` ya está reescrito para tarjetas y Teorema del Resto ya está re-portada al formato final (10 tarjetas) — ver reglas 10-12 abajo, agregadas después de rondas de feedback sobre esa misma lámina ya en tarjetas.

### Reglas 10-12: encontradas probando la lámina ya en tarjetas

10. **Cada tarjeta necesita un diagrama propio, no solo prosa con formato.** El formato tarjetas (v5) resuelve la navegación, pero no resuelve solo por existir que una tarjeta "enseñe visualmente" — Ronald probó las primeras 2 tarjetas (Gancho y Puente) y eran básicamente texto con una etiqueta de color arriba: *"no veo ahí una lámina, no veo diseños, no veo enseñanza visual, guiada, didáctica, veo simplemente texto y que me dice que está haciendo en lugar de enseñarme."* Cada tarjeta necesita su propio dispositivo visual — no decorativo, uno que **haga ver** la idea en vez de solo describirla en palabras. Ejemplos ya construidos y reutilizables como plantilla:
    - Comparación tachado→resaltado (expresión vieja tachada, flecha, resultado nuevo destacado) — para el Gancho.
    - Traducción por rol: lista de filas "papel conocido → papel nuevo" (ej. 17→P(x), 5→(x−a)) en vez de una oración declarando la equivalencia — para el Puente.
    - Ecuación conocida (atenuada) apilada sobre la nueva (flecha entre ambas) — para conectar un paso de la demostración con el hecho numérico que lo respalda.
    - Chips de verificación (ej. "x=1 ✓ x=7 ✓ x=a ✓") — para concretar una afirmación de "vale para cualquier valor" en vez de solo enunciarla.
    - Cadena vertical de sustitución (valor → flecha → resultado → flecha → resultado final) — para mostrar un reemplazo paso a paso, no solo el resultado.
    - Comparación lado a lado en dos colores (verde=caso correcto, rojo=trampa común) — para un "Ojo"/error típico.
11. **Nada de guiones largos ("—") como separador de frases, en ningún lado de la lámina.** En una app de matemática se confunden con el signo menos, sobre todo si hay números o variables cerca (ej. "no depende de nada — 2x−1=0" se lee ambiguo). Usar punto, coma o dos puntos para separar cláusulas — nunca el guion largo como recurso de estilo.
12. **Toda expresión matemática se renderiza con `MathText`, nunca como texto plano.** Ni siquiera cosas cortas como "x=1/2" o un polinomio con superíndices unicode (x⁴) sueltos en un string — si es matemática, va entre `$...$` y pasa por `MathText`, sin excepción. Y cuando se resalta/tacha una parte de una ecuación (ej. el término que "desaparece" en una demostración), la ecuación mostrada tiene que quedar **completa** (con su lado izquierdo y todo) — mostrar solo un fragmento tachado sin el resto de la ecuación se lee como una ecuación cortada a medias, no como una ecuación completa con una parte resaltada.
    - **Ojo con una segunda forma de "ecuación cortada" que no es de contenido, es de CSS**: si el `<span>` inline que arma KaTeX no tiene `white-space: nowrap`, el navegador puede insertar un salto de línea DENTRO de la fórmula (ej. "x + 1" se parte en "x +" / "1" en el borde de la tarjeta) — se ve exactamente igual de cortada que si faltara contenido, pero la causa es puramente visual. Ya arreglado a nivel de componente compartido (`src/app/components/MathText.tsx`), no hace falta repetir el arreglo lámina por lámina — pero si alguna fórmula larga se sale del costado de una fila angosta (con una etiqueta al lado, por ejemplo), la solución es apilar esa fila (etiqueta arriba, fórmula abajo con todo el ancho) en vez de ponerlas lado a lado.

**Pendiente:** decidir si Números Complejos entra como módulo de 1 lámina o se pospone; aplicar las reglas 10-12 como checklist al portar cada una de las 63 láminas restantes (no solo a Teorema del Resto).

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
| 2026-09-12 | Pregunta marcada D con una explicación que calculaba $-23/55$ y terminaba en "…revisar" | Ítem del roadmap §8 | Un "revisar" escrito en el texto se publica igual que el resto: o se resuelve antes de subir, o no se sube |
| 2026-09-12 | Un regex de fórmulas químicas convirtió "Física #2 (F2)" en flúor gaseoso y "Aritmética P4" en fósforo | Barrido con lista de elementos reales | Para tocar el banco en masa hace falta lista blanca de compuestos, no un patrón genérico: las etiquetas de pregunta parecen fórmulas |
| 2026-09-12 | `\sen` (seno en español) no existe en KaTeX: 22 expresiones se veían en rojo | Renderizar todo el banco con `throwOnError:true` | El resto del banco ya usaba `\text{sen}`; validar el LaTeX entero, no confiar en que "se ve bien" |
| 2026-09-13 | 29 preguntas con `figura:` sin dibujo mostraban solo el enunciado, como si estuvieran completas | Test nuevo que cuenta figuras faltantes | Cuando falta un pedazo de contenido hay que DECIRLO en pantalla: "no renderizar nada" se lee como "no hacía falta nada" |
| 2026-09-13 | ESLint estaba apagado: `FlatCompat` producía una config vacía y `npm run lint` pasaba sin correr una sola regla | Sospecha al ver que nunca fallaba | Un linter que nunca falla no está pasando, está apagado. Al prenderlo, lo primero que encontró fue un bug real de hidratación |
| 2026-09-13 | El login maestro aceptaba intentos ilimitados | Revisión de seguridad | Toda ruta que compara un secreto necesita rate limit y comparación en tiempo constante |
| 2026-09-13 | 10 preguntas marcadas "E (provisorio)" porque el transcriptor no podía leer la figura del escaneo | Abrir el PDF original en alta resolución | Los facsímiles están en `examenes pasados/`: antes de publicar un "no se puede determinar", abrir el PDF. Ninguna de las 10 era E |

---

## 8. Roadmap / pendientes

### Crítico — bloqueantes para salir a producción y cobrar

Relevado el 2026-09-13. El circuito de cobro **existe y funciona** (pago manual declarado por el alumno → admin aprueba en `/admin/pagos` → `agregarOExtenderSuscripcion` da un mes de esa facultad; el plan se deriva de las suscripciones vigentes y vence solo). Lo que falta no es la plomería, es esto:

- [ ] **Datos de cobro reales en `/pagar`.** Hoy son de demostración y lo dicen en pantalla: Tigo Money `+591 6 7000-0000`, un "QR" que es un damero CSS con la leyenda QR DEMO, y banco `Axiom SRL · Banco Unión · 10000123456789`. Nadie puede pagar. Deberían salir de config/DB, no estar hardcodeados.
- [ ] **El contenido pago no está protegido.** Las ~110 lecciones de `/aprende/*` y las 64 láminas de `/laminas/*` son páginas cliente sin ningún chequeo de plan: el candado se ve en la lista, pero entrando por URL directa se abren enteras. Lo mismo `/laminas/[modulo]`, que solo valida login y facultad. Mínimo: un `layout.tsx` server que redirija a `/precios` si no hay suscripción activa. (El gateo de simulacros e IA sí está en el servidor, en `api/axiom/simulador` y `api/axiom/plan-personalizado`.)
- [ ] **El alumno no sube comprobante.** `/pagar` solo pide un número de referencia tipeado a mano, así que el admin aprueba a ciegas. Falta subir la foto del comprobante (Supabase Storage) y verla en `/admin/pagos`.
- [ ] **No hay Términos y Condiciones ni Política de Privacidad.** Para cobrar y para guardar datos de menores de edad hacen falta, y la PWA las va a pedir si alguna vez va a una store.
- [ ] Los precios están escritos dos veces: `api/pagos/route.ts` (servidor, el que vale) y `pagar/page.tsx:30` (cliente). Hoy coinciden en 100 / 50 / 50, pero es cuestión de tiempo.
- [ ] **Rotar la contraseña del login maestro** (se compartió en un chat el 2026-09-12).

### Crítico — contenido
- [ ] Reescribir **examen 2024** UMSS Económicas con preguntas multi-paso (paralelo a lo que se hizo con 2023).
- [x] Pregunta 1 del examen 2023 (fracciones anidadas): resuelta con aritmética racional exacta, da $-23/55$ y ninguna opción coincide → **E) Ninguno** (ver §11).
- [x] Banco de Ingeniería: 139 exámenes reales 2005-2025, incluye categoría PRE-U 2024-2025 (ver §11).
- [ ] Crear bancos serios para Medicina, Derecho (mismo patrón que Ingeniería, ver §11).

### Importante
- [x] Láminas de Repaso: las 64 de Aritmética-Álgebra Ingeniería en producción, 23 módulos (ver §11).
- [ ] Láminas para las otras materias de Ingeniería (Geometría, Física, Química) y para las demás facultades.
- [ ] Animar las lecciones que aún son solo cards (revisar `grep -c "motion\." | sort` para identificarlas).
- [x] Sistema real de auth + DB persistente: Supabase (Postgres), con cron diario para que no se pause por inactividad.
- [x] Tests automatizados: 16 con `node --test`, el de banco corre sobre los 139 exámenes reales con el parser real (ver §11).
- [x] CI: GitHub Actions con tipos, lint, tests y build en cada push.
- [x] Todas las preguntas con `figura:` tienen su dibujo — el trinquete del test está en 0 (ver §11).
- [ ] ~~Stripe~~: descartado para Bolivia. El modelo es pago manual (Tigo Money / QR / transferencia) con aprobación del admin; lo que falta está en §8 Crítico.
- [ ] Auditoría visual sistemática en móvil: probar cada pantalla en device toolbar.
- [ ] Terminar de sacar los emojis usados como iconografía: ya salieron los de la landing, el chrome y **todas** las pantallas del alumno. Quedan 1 en componentes compartidos, 166 en las lecciones de `/aprende` (33 archivos) y 77 en admin (12 archivos) — los de admin son los menos urgentes, no los ve el alumno.
- [ ] Banco de Económicas: hay **un solo examen** (2023) contra los 139 de Ingeniería.

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

### 2026-09-13 (las 17 figuras que faltaban · 11 respuestas corregidas · linter, tests y CI)

**Las preguntas con figura mostraban solo el enunciado.** 29 preguntas del banco de Ingeniería declaran `figura: <id>` pero ese id no tenía constructor en `definiciones.ts`. `FiguraExamen` devolvía `null`, así que el alumno veía el texto *"en la figura adjunta…"* y abajo nada — y nada se lee como *"no hacía falta ningún dibujo"*, no como *"acá falta algo"*. Ahora devuelve `<FiguraPendiente />`, un recuadro punteado que lo dice. De ahí salió el trabajo de dibujarlas.

**Se dibujaron las 17 que faltaban de verdad** (las otras 12 del conteo original traían su propio `<svg>` en el enunciado o eran duplicados entre exámenes). El trinquete del test arrancó en 34, se fue bajando commit a commit y **hoy está en 0**. Entre ellas: tres circuitos, polea, proyectil, esfera pendular, moscas y sombras, carrito acelerado, ángulo de visión de un cuadro, cadena, pentágono, cuadrilátero, tres cargas simétricas.

**Y de paso se corrigieron 11 respuestas.** Diez estaban marcadas *"E (provisorio — pendiente de la figura real)"* porque el transcriptor no podía fijar la geometría desde el escaneo de baja resolución; una (2006 2da opción) estaba en E con una nota que decía *"encontré DOS topologías que dan resultados limpios pero diferentes"*. Los PDF originales están en `examenes pasados/` y se pueden leer directo. Leyéndolos en alta resolución se resolvieron las once, y **ninguna era E**:

| Pregunta | Era | Es | Lo que no se veía en el escaneo |
|---|---|---|---|
| f12 circuito 4 resistencias (2006) | E | B | Tres ramas en paralelo, no la topología que se supuso |
| g7 dos cuadrados con arcos (2-2022) | E | B | Hay una **diagonal** además de los dos arcos; las tres regiones suman 36 y los π se cancelan |
| f9 y f10 tiro parabólico (2-2022, 3-2022) | E | D | **A es el vértice**, no un punto cualquiera de la trayectoria |
| g7 cámaras de seguridad (3-2022) | E | B | 5α = 180 fija α = 36°, y `(tanα·tan2α + 1)·cos2α = 1` es identidad |
| g5 cuatro semicircunferencias (2-2023) | E | A | El diámetro es **medio lado**, no el lado entero |
| g6 triángulo sobre tres cuadrados (2-2023) | E | D | El lado pasa por el vértice externo del cuadrado |
| g7 triángulo oscuro (2-2023) | E | A | Base 4, altura 2 |
| f9 cuatro vectores (2-2023) | E | C | Los dos ángulos son 30° (el escaneo hacía ver 50°), y D sale de la punta de C |
| g8 octógono y secantes (3-2023) | E | A | La diagonal forma 22,5° con la horizontal |
| g5 semicírculo + cuarto (1-2024) | E | A | La **tangencia** fija el alto que "no estaba dado" |

**El motor de figuras solo sabía dibujar arcos por el lado corto.** `arcoAngulo` barre siempre el menor de los dos caminos, que sirve para marcar un ángulo pero no para una semicircunferencia ni una cuarta de circunferencia. Se sumaron `arcoDe` (el signo de `a2 - a1` elige por dónde va, así que es imposible equivocarse de lado en silencio), `sigueArco` para encadenar dentro de un path, `circuloPath` y `cota` (línea acotada con topes, las "30 m" de los PDF). Cada figura nueva se autoverifica con `verificarAngulo`/`verificarDistancia`: las 41 del banco construyen sin tirar error.

**El linter estaba apagado.** `eslint.config.mjs` usaba `FlatCompat` para cargar `eslint-config-next`, que desde la 15.3 ya trae config flat nativa: el resultado era una config vacía y `npm run lint` pasaba siempre porque no corría ninguna regla. Reescrito a `eslint-config-next/core-web-vitals` + `/typescript`. Lo primero que encontró al prenderse fue **un bug real de hidratación**. Dos reglas quedan relajadas a propósito: `react/no-unescaped-entities` (1.925 hits sobre prosa en español, apóstrofes y comillas legítimas) y `react-hooks/set-state-in-effect` a warning (5 patrones que están bien).

**Primeros tests del proyecto y CI.** 16 tests con `node --test` sobre TypeScript directo. El de banco corre contra los **139 exámenes reales con el parser real**: que todos parseen, que cada `respuesta` tenga una opción que le corresponda, que no haya ids repetidos, que ninguna pregunta quede sin opciones, el trinquete de figuras, y que las ~27.400 expresiones LaTeX rendericen en KaTeX con `throwOnError: true`. Se verificó que los tests **pueden fallar**: se inyectó a mano un `\sen` roto, se borró una línea de opción y se agregó una figura inventada — cada uno falló con archivo, línea y detalle. GitHub Actions corre tipos, lint, tests y build en cada push.

**Login maestro con rate limit.** Aceptaba intentos ilimitados. Ahora 5 cada 15 minutos por IP y comparación con `timingSafeEqual`. El limitador es en memoria: en Vercel eso es **por instancia**, así que frena el ataque desde una IP pero no es una barrera global — está documentado en el propio archivo.

**Facultades sin banco: "Próximamente".** Se ofrecían las cuatro facultades por Bs. 50 y tres estaban vacías. `/api/facultades` ahora devuelve `examenes` contando el banco real, y el onboarding muestra las vacías como no disponibles. Se autocorrige solo: cuando se cargue el banco, dejan de aparecer así.

**Se terminó de sacar el emoji usado como iconografía** en el chrome del alumno (Practicar, Resultados, Ranking, Debilidades, Login, la señal de "esto se toca" de las lecciones) y el índigo que quedaba del tema anterior. `Icono.tsx` pasó de 13 a ~35 trazos. Detalle que costó encontrar: Tailwind preflight pone `svg { display: block }`, así que cada icono inline se iba a su propio renglón; se arregla con `display: inline-block` + `vertical-align: -0.18em` en el componente.

### 2026-09-12 (notación química del banco · landing al rediseño · Pregunta 1 del 2023)

**Banco de Ingeniería, notación química completa.** Una pasada anterior había envuelto fórmulas en `$\mathrm{}$` con un regex que solo tomaba símbolos en mayúscula: agarraba `HNO3`, `NH3` o `H2SO4`, pero dejaba crudo todo lo que tuviera una minúscula en el símbolo (`CCl4`, `CaSO3`, `FeS2`, `MgCO3`). Quedaban renglones a dos estilos, textual del banco: *"El benceno ($\mathrm{C_6H_6}$) y el tolueno (C7H8)"*. Se completó sobre los 139 exámenes: 212 fórmulas en 50 archivos, 11 ecuaciones de reacción envueltas enteras a mano (token por token quedaban como un mosaico de fragmentos compuestos y crudos), y las cargas plegadas dentro del LaTeX (`CO3²⁻` → `$\mathrm{CO_{3}^{2-}}$`).

**Tres cosas que salieron de ahí y conviene no olvidar:**
- El mismo regex había hecho 6 conversiones **al revés**: etiquetas de pregunta del PDF ("Física #2 (F2)", "Aritmética P4") convertidas en flúor gaseoso y fósforo blanco. Estaban dentro de bloques `<!-- -->`, así que no las veía el estudiante, pero confundían a cualquiera que leyera las notas. Los bloques de notas internas ahora se saltan a propósito.
- `\sen` no existe en KaTeX (el resto del banco usa `\text{sen}`, en 787 lugares): 22 expresiones de trigonometría se le mostraban **en rojo** al alumno, y ya estaban así en `main`. Arreglado.
- Lo que **no** se tocó: ~1.000 fórmulas que ya están en `$...$` pero en itálica en vez de recta. Se ven bien y con subíndices correctos; tocar 128 archivos por eso arriesga romper variables de física (`T₁`, `R₂`) que **deben** ir en itálica. Costo alto, beneficio bajo.

**Verificación usada (sirve para la próxima).** Se renderizaron las 27.421 expresiones LaTeX del banco con KaTeX en `throwOnError:true` — 0 fallan, contra 22 antes. Más los 139 exámenes y 3.569 preguntas parseados con los regex reales de `banco-parser.ts`, `tsc`, `next build` y chequeo en el navegador.

**Landing pública migrada al rediseño.** Era lo que había quedado pendiente en el commit del rediseño (`5785054` lo dice explícito). Seguía con emojis como iconografía y con el índigo de Tailwind hardcodeado (`rgba(99,102,241)`, `#4f46e5`) — el degradé del CTA final iba de terracota a índigo. Ahora usa `Icono.tsx`, que sumó 11 trazos (las cuatro facultades, documento, chispa, gráfico, birrete, más, probeta, herramienta) y un token `--accent-soft`.

**El emoji de cada facultad salía de Supabase.** El campo `facultad.emoji` es editable desde la base: alcanzaba con que alguien cargara otro emoji para que la iconografía del producto cambiara sola. Ahora se mapea por `id` en código con `iconoFacultad()`. Las cuatro tarjetas además pasaron a un solo acento: antes cada facultad pintaba su `f.color` (verde, azul, rojo, violeta), que es justo el problema que el rediseño vino a resolver.

**Pregunta 1 del examen 2023 (pendiente crítico de §8).** Lo que se publicaba era peor que una respuesta equivocada: estaba marcada **D**, y la explicación calculaba $-23/55$ y terminaba diciendo *"…revisar; la respuesta marcada por la oficina es D"*. El alumno leía las dos cosas. Resuelta con aritmética racional exacta: $-23/55$, que no es ninguna de las cuatro opciones; se probaron además 7 lecturas alternativas del enunciado y ninguna da $\pm31/11$ ni $\pm11/31$. Por la política "no adivinar" queda **E) Ninguno** con la derivación en 6 pasos. **No se pudo contrastar contra el facsímil**: no hay PDF de Económicas en `examenes pasados/` (los 2023 de esa carpeta son de Ingeniería). Queda anotado en el archivo por si aparece.

**De paso, en el bloque de explicación de `/examenes/[id]`:** las fracciones `\dfrac` en línea miden ~35px contra los ~23px de un renglón con `leading-relaxed`, así que se montaban sobre la línea de arriba — pasa en toda explicación con fracciones, no solo en esa. Y salieron los `violet-*` de Tailwind, que eran de la paleta anterior al rediseño.

### 2026-08-26 / 08-27 (rediseño de Física, Química y Trigonometría con notación matemática real)

Nueve lecciones de `aprende/` reescritas para que la matemática se vea como matemática y no como texto plano, y para que cada concepto tenga su diagrama en vez de solo prosa. Es la misma lección aprendida produciendo láminas (reglas 10-12 de §4.5) aplicada ahora al contenido de lecciones.

- **Física (5):** cinemática en una dimensión, cinemática en dos dimensiones, dinámica de Newton (con diagramas de cuerpo libre), trabajo y energía, electrostática.
- **Química (2):** enlace químico (estructuras de Lewis dibujadas, no descriptas en texto) y reacciones y balanceo (con contador de átomos interactivo).
- **Trigonometría (2):** ley de senos y cosenos (triángulos dibujados con geometría real, no aproximada) e identidades trigonométricas (círculo unitario interactivo).

Bug encontrado en el camino: en `cinematica-1d` faltaba un espacio antes de una fórmula porque **JSX colapsa el espacio entre un texto y un `<MathText>` adyacente**. Ojo con eso al escribir lecciones nuevas.

### 2026-08-16 (dos fixes transversales sobre las 74 lecciones)

- **El índice de lecciones estaba hardcodeado a Económicas.** Cualquier alumno de otra facultad veía el índice equivocado. Ahora se arma según la facultad.
- **Se eliminó el guion largo (—) como separador y viñeta en todas las lecciones.** Es la regla 11 de §4.5, que hasta ahora solo se aplicaba a láminas nuevas; se aplicó retroactivamente al contenido viejo. El motivo es el mismo: cerca de números se confunde con el signo menos.

### 2026-08-09 / 08-10 (producción completa de las 64 láminas de Aritmética-Álgebra Ingeniería)

**El plan trazado el 2026-08-03 se terminó.** Las 64 láminas atómicas planificadas están en producción, repartidas en 23 módulos bajo `src/app/laminas/`. Fueron 63 commits en dos días.

| Módulo | Láminas | | Módulo | Láminas |
|---|---|---|---|---|
| logaritmos-y-exponenciales | 8 | | factorizacion-productos-notables | 3 |
| progresiones | 6 | | funciones-cuadraticas-optimizacion | 2 |
| teorema-del-resto | 5 | | funciones-racionales | 2 |
| cuadraticas-y-vieta | 5 | | inecuaciones | 2 |
| sistemas-de-ecuaciones | 4 | | combinatoria-basica | 1 |
| ecuaciones-racionales | 4 | | exponentes-y-radicales | 1 |
| ecuaciones-irracionales | 3 | | planteo-verbal-general | 1 |
| divisores-mcd-mcm | 3 | | polinomios-grado | 1 |
| regla-de-tres-y-reparto | 3 | | problemas-de-cifras | 1 |
| binomio-de-newton | 3 | | problemas-de-edades | 1 |
| porcentajes-mezclas-interes | 3 | | problemas-de-moviles | 1 |
| | | | trabajo-combinado | 1 |

Dos cosas que salieron de producir en volumen:

- **Se extrajo `laminas/_components/dispositivos.tsx`.** Los dispositivos visuales que se repetían entre láminas (esquema de Ruffini, comparaciones lado a lado, cadenas de sustitución) viven ahí en vez de copiarse en cada página. Es la decisión D3 aplicada a láminas.
- **Tres bugs reales aparecieron produciendo la lámina de división de polinomios** y se arreglaron ahí mismo. Producir en volumen encuentra cosas que revisar una sola lámina no encuentra.

### 2026-08-06 / 08-07 (cierre del piloto Teorema del Resto, antes de escalar)

Últimos retoques a la primera lámina antes de largarse a producir las 63 restantes:

- Se rediseñaron con enseñanza visual las 6 tarjetas restantes (el 2026-08-05 se habían hecho las primeras, faltaban estas).
- Se sacaron los guiones cerca de matemática y se matemizó el texto plano que quedaba suelto.
- Se partió la tarjeta de Generalización en 3, separando razonamiento de ejemplo.
- Se reescribió "Un dato escondido en palabras" con un ejemplo concreto resuelto.
- **Fix:** las fórmulas inline de `MathText` se cortaban a mitad de línea. La causa era CSS y quedó documentada como regla 12 en §4.5.

### 2026-08-05 (Láminas de Repaso: diagramas por tarjeta + reglas de escritura, ya con el formato de tarjetas)

Con el formato de tarjetas (v5) ya construido, Ronald probó las 10 tarjetas de Teorema del Resto y encontró 2 problemas nuevos, distintos al pivote de formato:

1. **Faltaba enseñanza visual de verdad.** Las tarjetas tenían navegación resuelta pero contenido que seguía siendo básicamente texto con una etiqueta arriba — "no veo diseños, no veo enseñanza visual, guiada, didáctica". Se rediseñaron las 10 tarjetas con un diagrama propio en cada una (comparación tachado→resaltado, traducción por rol, ecuaciones apiladas con flecha, chips de verificación, cadena de sustitución vertical, comparación lado a lado en dos colores) — documentado como regla 10 en §4.5.
2. **Guiones largos confundibles con el signo menos, y matemática en texto plano.** El texto usaba "—" como separador de frases (a veces pegado a expresiones con números), y algunas expresiones matemáticas cortas (como "x=1/2" o un polinomio con superíndices unicode) estaban sueltas como texto en vez de renderizadas con `MathText`. Una ecuación tachada además empezaba a mitad de camino, sin su lado izquierdo, y se leía cortada. Las tres cosas arregladas en las 10 tarjetas y documentadas como reglas 11-12.

Confirmado con Ronald que estas reglas (10-12) aplican como checklist para las 63 láminas restantes, no solo para esta.

### 2026-08-05 (Láminas de Repaso: pivote a formato de tarjetas — probado en celular real)

Ronald probó la primera lámina de producción (Teorema del Resto, formato v4 de scroll único) en su celular real por primera vez — hasta ahora solo se había revisado en PC. Rechazó el formato contenedor (no el contenido): quiere "aprendo, next, aprendo, next" con navegación 100% visual (íconos, sin texto "Siguiente/Anterior") y una forma de saltar hacia atrás cuando "se pierde" en el material. Se iteró un mockup v5 con formato de tarjetas/diapositivas (una idea por tarjeta, puntos de progreso tocables para saltar, swipe táctil) — aprobado sin cambios: "Me gusta, está genial". Documentado en §4.5 como el **formato final y obligatorio para todas las láminas de todas las facultades/carreras**, no solo el piloto de Ingeniería. Pendiente: reescribir `LaminaShell.tsx` para este formato y re-portar Teorema del Resto.

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

*Fin de la bitácora v1.9 — Crecé conmigo.*
