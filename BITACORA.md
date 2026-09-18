# 📒 Bitácora · AXIOM Simulador UMSS

> **Documento vivo.** Si sos una IA o un dev nuevo leyendo esto: acá está TODO lo que necesitás para entender el proyecto, sus decisiones y su historia. Leé las secciones en orden — están pensadas para que en 10 minutos sepas dónde estás parado.

**Última actualización:** 2026-09-16 (los modos Premium de /practicar dejan de ser botones muertos, y los precios pasan a un solo lugar)
**Versión de la bitácora:** v2.2
**Mantenedor:** Ronald (RonMarty2)

---

## 0. Reglas para mantener esta bitácora

**Cuándo se actualiza:** después de cualquier cambio significativo (feature nuevo, refactor importante, bug serio resuelto, decisión arquitectónica).

**Antes de tocar una sola línea de código: traé `main` y leé ESA bitácora.** No la que tenías abierta desde que arrancó la sesión. Corré `git fetch origin main` y mirá qué se movió. Hay varias sesiones trabajando en paralelo sobre este repo y este archivo es el único lugar donde se cruzan; entre que abrís la sesión y que empezás a escribir código, `main` ya avanzó. El 15-sep esto costó trabajo tirado (ver §7).

**Quién la actualiza:** la IA o el dev que acaba de hacer el cambio, **en el mismo commit que lo hace**. Regla de Ronald del 15-sep-2026: *"cada que hagas algo tú también agregar lo que hiciste para no pisarse entre versiones y siempre subir todo a main"*. O sea: agregar tu entrada ya NO necesita luz verde, y dejar un cambio sin anotar es el error. Lo que sí sigue necesitando su OK explícito es **reescribir o borrar** lo que ya está escrito, y tocar decisiones (§6) o reglas.

**Qué se actualiza:**
- Sección **§ Roadmap / pendientes** → tachar lo hecho, agregar lo nuevo.
- Sección **§ Cambios mayores** → nueva entrada al inicio con fecha + descripción.
- Sección **§ Decisiones arquitectónicas** → solo si hay un nuevo principio.
- Sección **§ Errores garrafales** → cuando se descubra y corrija uno.
- Resto de secciones → solo si cambian de raíz.

**Y se sube a `main`.** Una rama sin mergear es invisible para la sesión que entra después, y eso es exactamente cómo se pisa el trabajo. Si el cambio está listo y verificado, va a `main`.

**Formato de las entradas:** español rioplatense informal, sin emojis decorativos en el contenido (los emojis solo viven en los títulos de sección si ayudan a navegar).

**Ojo con el idioma, son dos.** Esta bitácora, los comentarios y los commits van en rioplatense. **El texto que ve el alumno va en TUTEO**, porque los alumnos son de Cochabamba: "puedes", no "podés". Ver §11 (13-sep-2026).

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
- **Manifest** en `src/app/manifest.ts`. Display `standalone`, `scope: "/"`.
  - **`display_override` NO debe incluir `minimal-ui`.** Estuvo como `["standalone", "minimal-ui"]` con el comentario de que servía para "forzar vista app", y hacía exactamente lo contrario: `minimal-ui` **es** una ventana con barra de direcciones, o sea que le dábamos permiso explícito al navegador para mostrar la barra que queríamos evitar. Corregido el 15-sep a `["standalone"]`.
  - **`scope` va declarado explícito.** Sin él, el alcance se deduce de `start_url` (que es `/dashboard`) y queda a interpretación del navegador: si alguno lo lee como `/dashboard`, entonces `/aprende`, `/practicar` y `/laminas` quedan fuera de la app instalada y Chrome abre una barra con la URL al navegar ahí.
  - **La WebAPK congela el manifest del día que se instaló.** Cambiar el manifest no arregla una instalación vieja: hay que desinstalar el ícono y volver a instalar. Es lo primero que hay que preguntar cuando alguien reporta "la app instalada me muestra una barra".
- **PWARegister.tsx** registra el SW, detecta modo standalone, y maneja:
  - Aplicar clase `axiom-pwa` al `<html>` cuando corre instalada.
  - Suprimir el banner `beforeinstallprompt` en desktop (UA detection).
  - **OTA automática:** detecta SW nuevo → manda `SKIP_WAITING` → cuando cambia el controller, `window.location.reload()` UNA sola vez. Sin reinstalar.
- **CSS forzado por display-mode:** las reglas `@media (display-mode: standalone)` se aplican sin esperar a JS, garantizando vista app.

### 5.1 App Android para Play Store (TWA) — existe en `android/`, todavía sin publicar

El repo tiene un proyecto de Android Studio en `android/`: es un **TWA** (Trusted Web Activity), la forma oficial de Google de llevar una PWA a Play Store. No es una segunda app ni una reescritura — abre la misma web en vivo, así que un deploy a `main` actualiza la web Y la app a la vez. Solo hay que re-publicar el `.aab` si cambia algo del propio proyecto Android (el ícono, por ejemplo). Instrucciones completas en `android/README.md`.

**Estado: falta todo lo que necesita la máquina de Ronald.** No se pudo compilar ni probar desde la sandbox (tiene bloqueado el acceso a los servidores de Google). Falta: compilar en Android Studio, generar el keystore firmado, y pegar su SHA-256 en dos lugares que hoy tienen un placeholder — `android/app/src/main/res/values/strings.xml` y `public/.well-known/assetlinks.json`, que dice literal `REEMPLAZAR_CON_EL_SHA256_DE_TU_KEYSTORE_DE_FIRMA`. Más la cuenta de Play Console (USD 25, pago único).

**El aviso de navegador embebido (`AvisoNavegadorApp.tsx`).** Messenger, Instagram, Facebook y TikTok no abren los links en el navegador del celular: los abren adentro de la propia app, en un WebView con su barra de color arriba. Ahí la PWA **no se puede instalar** (esos WebView no disparan `beforeinstallprompt`), así que el alumno ve una web con la barra de otra app encima y no tiene forma de enterarse de que existe una app de verdad. Y ese es el camino **normal**, no el raro: el link de AXIOM se reparte justamente por esas apps. El componente detecta el WebView por user agent, nombra la app concreta ("estás viendo AXIOM dentro de Messenger") y explica el gesto de salida (⋮ → Abrir en Chrome). Se cierra para siempre con una X.
- **WhatsApp en Android no se detecta y es a propósito:** usa Chrome Custom Tabs, que comparte el user agent de Chrome y es indistinguible desde JavaScript. El menú del propio Custom Tab igual ofrece "Abrir en Chrome".
- Arranca oculto y se enciende en un `useEffect`: el user agent no existe en el servidor y renderizarlo distinto en los dos lados rompe la hidratación.

**La barra del navegador que se ve arriba NO es un bug de CSS.** Cuando el link se abre desde otra app (WhatsApp y compañía), Android usa un Custom Tab: esa barra con la X, el ícono de compartir y los tres puntos es chrome del navegador y ningún estilo la puede sacar. Y si aparece de color raro (violeta, por ejemplo) tampoco es nuestro: el `theme_color` de AXIOM es `#1a1f2e`, ese color lo pone la app que abrió el link. Se saca de dos formas, las dos ya contempladas: instalando la PWA (el manifest ya está en `standalone`) o con el TWA una vez verificado el dominio con el SHA-256 de arriba.

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

### D8. En la biblioteca de exámenes, el enunciado se lee gratis y la solución se paga
El corte del plan gratis no es "ves el examen o no lo ves": son las **3.579 soluciones paso a paso**. Cualquiera puede leer los 140 exámenes completos, porque eso es el catálogo y es lo que engancha; la respuesta correcta y la explicación piden plan activo. El filtro vive en el servidor (`/api/axiom/examenes/[id]`), no en la pantalla: filtrar en el cliente no sirve, la respuesta del fetch se lee igual desde el navegador. Ojo con la excepción que ya existía y sigue valiendo: en los resultados de un simulacro que el alumno acaba de rendir, el paso a paso **sí** se muestra a todos, porque es parte de sus 2 simulacros gratis por semana.

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
| 2026-09-13 | Todo el contenido pago (110 lecciones, 64 láminas) se abría escribiendo la URL: el candado era solo un dibujo en el índice | Relevamiento de qué faltaba para cobrar | Un candado que no se verifica en el servidor no es un candado. El gateo tiene que estar donde se sirve el contenido, no donde se lista |
| 2026-09-13 | En `next dev`, un usuario premium se veía bloqueado: el toggle de plan escribía en una copia del cache en memoria y el guard leía otra | Log en el layout contra `/api/auth/me` | Route handlers y componentes de servidor son bundles distintos con su propia instancia de cada módulo. El estado global de dev va en `globalThis` o el local miente |
| 2026-09-13 | La fórmula de la Pregunta 1 se cortaba en el celular: el alumno no podía leer la consigna. El `overflow-x: auto` estaba puesto pero nunca se activaba | Auditoría a 375px | Un ítem flex tiene `min-width: auto` y **crece** con su contenido en vez de encoger: sin `min-w-0` en el padre, ningún `overflow` del hijo llega a funcionar |
| 2026-09-13 | `/progreso` le mostraba a todos las estadísticas de `demo-user` | Leer la pantalla al rehacerla | Un id de prueba escrito a mano en un fetch sobrevive a todo: no hay error, no hay pantalla vacía, solo datos de otro |
| 2026-09-13 | Un botón que se ve habilitado y no hace nada: `disabled` y `opacity` tenían condiciones distintas | Probar el flujo sin elegir examen | Si el estado deshabilitado se calcula dos veces, se van a desincronizar. Una sola variable, y que además diga QUÉ falta |
| 2026-09-13 | Un reemplazo masivo convirtió "presentes" en "presientes" en 4 archivos | Revisar el `git diff` antes de commitear | `node -e` desde bash se come los backslashes: `\p{L}` llegó como `[p{L}]` y la clase matcheó cualquier cosa. Todo script con regex Unicode o acentos va en un ARCHIVO, no en `-e` |
| 2026-09-14 | `/api/axiom/examenes/[id]` devolvía los 140 exámenes con respuesta y paso a paso sin mirar la sesión: un `curl` sin login se bajaba el producto entero | Barrer qué se abre con plan gratis | `plan.ts` YA definía `puedeVerResolucionBiblioteca()` con el comentario "solo pago", y no la llamaba nadie. Una función de permiso que nadie invoca es una intención, no un candado: grepear los helpers de plan para ver cuáles están muertos |
| 2026-09-14 | El banco quedó entero en voseo (2.249 de 3.579 preguntas) después de que la app pasara a tuteo | Censo del texto que ve el alumno | La normalización del 13-sep barrió `src/` y nadie miró `data/`. El contenido es texto del alumno tanto como la UI, y es el que más lee |
| 2026-09-14 | 130 enunciados prometían una figura que no existe, y el trinquete de figuras marcaba 0 | Chequeo nuevo, escrito a mano | Un trinquete mide lo que sabe mirar: contaba las que DECLARAN `figura:`, y el problema vivía justo en las que no lo declaran. Un contador en cero no prueba que no haya problema, prueba que ese contador no lo ve |
| 2026-09-14 | Tres preguntas de química calculaban "20 y 80" y cerraban marcando la opción "80 y 20", tapándolo con un paréntesis explicativo | Chequeo de coherencia explicación↔respuesta | Es la misma lección del 12-sep en otra forma: si hace falta un paréntesis para explicar por qué la respuesta no coincide con el cálculo, eso no se arregla con el paréntesis |
| 2026-09-14 | La misma pregunta de Mendel respondía "segunda ley" en un examen y "tercera" en otro, con opciones idénticas | Chequeo de duplicados contradictorios | Comparar la LETRA marcada da 47 falsos positivos, porque el orden de las opciones cambia entre gestiones. Hay que comparar el TEXTO de la opción marcada |
| 2026-09-15 | Se reescribió desde cero el parseo de títulos de examen que ya existía en `main`, testeado, ocho commits antes (`etiqueta-examen.ts`, commit `ed0c006`) | Al mergear aparecieron dos implementaciones del mismo parseo | La bitácora envejece mientras trabajás: se leyó al abrir la sesión y `main` avanzó 22 commits antes del primer edit. Leer al empezar no alcanza, hay que `git fetch` + releer justo antes de escribir código. De acá salió la regla de §0 |
| 2026-09-15 | El manifest pedía `display_override: ["standalone", "minimal-ui"]` "para forzar vista app", y `minimal-ui` **es** el modo CON barra de direcciones | Ronald reportó tres veces una barra con la URL en la app instalada, y se le contestó tres veces que era culpa del navegador | Dos errores encadenados. Uno: un fallback puede contradecir lo que el campo principal pide; leer qué significa cada valor, no confiar en el comentario de al lado (que decía lo contrario de lo que hacía el código). Dos, peor: se diagnosticó por la captura ("es Messenger") en vez de preguntar **cómo abrís la app**. La pregunta correcta llegó recién a la tercera queja, y la respuesta ("la instalé desde la página") descartaba toda la teoría anterior. Cuando el usuario insiste, el que está equivocado es el diagnóstico |
| 2026-09-17 | **14 preguntas tenían el enunciado vacío**: el alumno veía las cinco opciones sin ninguna pregunta arriba. Las rompieron los tres commits del 16-sep que DECLARARON las figuras, insertando `figura:` en lugar de la línea en blanco que separa el encabezado del enunciado | Un barrido de gramática sobre todo el banco, sin abrir ningún PDF | Un script que inserta una línea en un formato estructurado se verifica **re-parseando**, no con un grep. El grep habría confirmado que la línea `figura:` estaba bien puesta, y habría tenido razón: lo que estaba mal era la línea que se pisó. Había test para las opciones, para la respuesta y para el LaTeX; el campo más importante era el único sin medir. Ahora el parser corta el encabezado en la primera línea que no es `clave: valor`, y hay un test de una línea que lo habría cazado el mismo día |
| 2026-09-17 | Tres enunciados quedaron arrancando con una coma suelta desde el 14-sep (*", dos masas están sobre una mesa…"*), porque la pasada que les sacó la mención a la figura no revisó cómo quedaba la frase | Buscar enunciados que empiecen con coma o minúscula | Una reescritura masiva necesita un chequeo masivo. El costo de encontrarlos era CERO (un regex sobre el primer carácter) y estuvieron tres días a la vista del alumno. Cuando se toca un campo en 98 archivos, hay que dejar corriendo la verificación de que el campo sigue bien formado |
| 2026-09-17 | Dos respuestas de física salieron mal de "probar combinaciones hasta que una dé un número de la lista": el circuito del 2009 (10 Ω en vez de 3 Ω) y el del 2025 (marcado E en vez de 20 Ω) | Abrir el facsímil | Probar variantes y quedarse con la que calza **no es resolver el problema, es adivinar con más pasos**. En el del 2025 el archivo hasta anotaba que el resultado "se mantuvo robusto al probar variantes razonables": las cuatro variantes probadas compartían el supuesto equivocado, así que la robustez no medía nada. Cuando el enunciado nombra una figura que no está, la respuesta honesta es E con una nota, no la opción que cierre |
| 2026-09-17 | Se buscó la geometría en la página 2 porque en los otros exámenes del prefacultativo estaba ahí, y en el de 2010 la página 2 es Física | Leer el título de cada página antes de recortar | El orden de las secciones cambia de año en año en esta colección. Una estructura que se cumple en tres archivos no es una regla: cuesta menos recortar la banda de títulos de las cinco páginas y mirarlas juntas que leer la página equivocada |
| 2026-09-17 | Cinco PDF de la colección tienen el nombre equivocado: tres dicen 2018 y son de 2019, uno dice "2ra opción" y es la 3ra, y dos traen el año mal en el propio encabezado | Leer el encabezado y la fecha de cada uno antes de asociarlo | En esta colección **el nombre del archivo no identifica el examen**. Los PDF llegaron de compiladores distintos y nadie verificó los nombres. Antes de trabajar con uno hay que abrirlo: el encabezado da la gestión y la opción, y cuando el encabezado también miente (los dos de agosto de 2016) manda la FECHA |
| 2026-09-17 | Una verificación de paralelismo explotó diciendo "debería medir 0° pero mide 180°" con dos rectas que SÍ eran paralelas | Construir la figura | Comparar `anguloHacia` contra `anguloHacia` no mide paralelismo: da 180 cuando las dos rectas van paralelas pero recorridas al revés. Hay que plegar a módulo 180 (`desvioParalelas`). El patrón frágil quedó en tres figuras anteriores donde funciona de casualidad |
| 2026-09-17 | Dos respuestas del 2024 estaban mal, y las dos venían de un archivo que AVISABA que no había podido leer la figura ("no permite una reconstrucción topológica 100% inequívoca… se adoptó la lectura más simple") | Abrir los facsímiles a 400 dpi | Cuando el `.md` documenta que la figura no se pudo leer, lo que hay abajo no es una respuesta: es una apuesta, y se publica igual. Peor: en la red de capacitores la lectura "más simple" (los cuatro en paralelo, 6C = 54 µF) era **exactamente el distractor** del ejercicio. La suposición razonable y la trampa del examen son, con frecuencia, la misma cosa. Cualquier nota del tipo "no se pudo verificar" es una marca de prioridad, no una aclaración |
| 2026-09-17 | Dos figuras de 2017 son el mismo dibujo con distinto sombreado, y reusar una para las dos le habría puesto a una la respuesta de la otra (1/13 contra 9/44) | Comparar los dos facsímiles antes de compartir el id | En el lote anterior tres figuras se reusaron tal cual y estuvo bien; acá dos parecían iguales y no lo eran. Lo que decide no es el parecido del trazo: es si los DATOS y lo MARCADO coinciden. Antes de compartir un dibujo hay que mirar las dos imágenes, no una y el enunciado de la otra |
| 2026-09-17 | Una verificación de área se comparaba consigo misma: `verificarDistancia("área", area, area)` | Releer el código antes de commitear | Una comprobación que no puede fallar es peor que no tenerla, porque el verde miente. La versión buena mide el polígono que se va a DIBUJAR (shoelace) y lo contrasta con la fórmula: así, si el dibujo y la cuenta se separan, explota |
| 2026-09-16 | Dos preguntas decían "ver figura 3" sin tener figura, y el trinquete las daba por limpias. Es el tercer agujero del mismo tipo en un día | Abrir el facsímil de preguntas que NADIE había pedido | Tres trinquetes, tres agujeros, y los tres del mismo tipo: enumeraban formas de decir algo y alguien dijo lo mismo de otra manera ("tocar" que faltaba, "sumale" que nadie generó, "ver figura" que el regex no cubría). El patrón para la próxima: cuando un chequeo se basa en una lista de expresiones, la pregunta no es si está completa — no lo está — sino cuánto cuesta ampliarla. Acá costó cero porque se midió DESPUÉS de arreglar los casos |
| 2026-09-16 | 54 casos de voseo vivos en texto del alumno, con dos trinquetes que decían que todo estaba limpio | Barrer a mano al mergear, no un test | Un trinquete que enumera casos solo cubre lo que alguien escribió. 40 de los 54 eran imperativo con el pronombre pegado ("sumale", "convertila"), una forma que NADIE había listado; los otros 14 eran siete infinitivos que faltaban. Si el chequeo se puede generar (de "sumar" salen todas sus formas), generarlo; una lista a mano envejece el día que se escribe |
| 2026-09-16 | Un script de puntuación dio 77 dos puntos y 147 puntos, exactamente al revés de lo medido antes de tocar nada | Los números no cuadraban con la medición previa | Corriendo sobre el archivo entero, el `:` de `**explicacion:**` cuenta como puntuación de la prosa. El resultado era gramatical igual, así que ningún test lo habría cantado: medí ANTES, y si después no cuadra, es el script, no el dato |
| 2026-09-16 | 8 commits de una sesión de la nube (los diagramas de 6 lecciones) llevaban días sin llegar a `main`, y nadie lo sabía | Ronald preguntó si estaba todo en `main` | Un branch remoto que nadie mergea no es trabajo hecho, es trabajo escondido. Con varias sesiones en paralelo hay que mirar `git branch -av` y contar `main..<branch>` para CADA rama, no solo mirar si el árbol local está limpio. Y cuanto más se tarda, peor: este quedó 92 commits atrás y hubo que resolver tres conflictos a mano |
| 2026-09-16 | Al resolver un conflicto, tomar el lado de `main` habría dejado un pie que describía un componente que el otro lado ya había reescrito ("toca para resaltar los factores comunes", en un dibujo que ya no se toca) | Leer qué hacía cada lado antes de elegir | En un merge, "quedarse con una de las dos versiones" es la opción por defecto y a veces las DOS están mal. El arreglo de `main` era sobre código que el branch borró: hay que mirar qué quería cada cambio, no qué líneas trae |
| 2026-09-16 | La P7 del 1-2016 1ra necesitaba su figura y no estaba en la lista de pendientes: la pasada del 14-sep le había sacado la mención, dejando además el enunciado roto y la explicación con el triángulo al revés | Abrir el facsímil de un examen del que solo se habían pedido otras tres figuras | Un trinquete que se puede bajar **reescribiendo el texto** mide la métrica, no el problema. Es la lección del 14-sep ("mide lo que sabe mirar") una vuelta más adentro: esta vez el contador no estaba ciego, lo cegamos nosotros al bajarlo. Cuando la forma de bajar un número es editar lo que el número busca, hay que anotar cuántas salieron de la cuenta por esa vía — son 74 — y contra qué se verifican |

---

## 8. Roadmap / pendientes

### Crítico — bloqueantes para salir a producción y cobrar

Relevado el 2026-09-13. El circuito de cobro **existe y funciona** (pago manual declarado por el alumno → admin aprueba en `/admin/pagos` → `agregarOExtenderSuscripcion` da un mes de esa facultad; el plan se deriva de las suscripciones vigentes y vence solo). Lo que falta no es la plomería, es esto:

- [ ] **Datos de cobro reales en `/pagar`.** ⬅ **ESTE ES EL QUE FALTA PARA COBRAR.** Hoy son de demostración y lo dicen en pantalla: Tigo Money `+591 6 7000-0000`, un "QR" que es un damero CSS con la leyenda QR DEMO, y banco `Axiom SRL · Banco Unión · 10000123456789`. Mientras estén así, **un alumno que quiera pagar no puede**: no hay a dónde mandar la plata.
  - **Bloqueado esperando a Ronald** (decisión del 2026-09-13: se deja para después). Hacen falta tres datos que solo él tiene: (1) número real de Tigo Money, (2) la imagen del QR bancario, (3) cuenta bancaria — banco, número y titular.
  - Cuando lleguen: no hardcodearlos. Van a config/DB (tabla de configuración o `admin/config`, que ya existe) para poder cambiarlos sin deploy, y el QR a Supabase Storage. Están en `src/app/pagar/page.tsx`, líneas ~176-200.
  - Todo lo demás del circuito de cobro YA funciona: el alumno declara el pago, queda pendiente, el admin lo aprueba en `/admin/pagos` y `agregarOExtenderSuscripcion` le da el mes.
- [x] ~~El contenido pago no está protegido.~~ Resuelto: guard de servidor en `aprende/layout.tsx` y `laminas/layout.tsx`, con la lógica en `src/lib/acceso-contenido.ts` (ver §11). Frena el acceso por URL, que es el problema real; **no** esconde el contenido de quien lea el bundle de JavaScript — para eso habría que mover las lecciones a datos pedidos al servidor.
- [x] ~~La biblioteca de exámenes regalaba las soluciones.~~ Resuelto el 14-sep: `/api/axiom/examenes/[id]` no miraba la sesión, así que los 140 exámenes con respuesta y paso a paso se bajaban con un `curl` sin login. Ahora resuelve el plan en el servidor y filtra (ver §11 y D8).
- [x] ~~El plan no mira facultad.~~ Ya estaba resuelto y figuraba abierto: `puedeVerResolucionBiblioteca(usuario, facultadDelExamen)` recibe la facultad del examen desde `fd17d4c`. Verificado en el código el 16-sep.
- [ ] **El alumno no sube comprobante.** `/pagar` solo pide un número de referencia tipeado a mano, así que el admin aprueba a ciegas. Falta subir la foto del comprobante (Supabase Storage) y verla en `/admin/pagos`.
- [ ] **No hay Términos y Condiciones ni Política de Privacidad.** Para cobrar y para guardar datos de menores de edad hacen falta, y la PWA las va a pedir si alguna vez va a una store.
- [x] ~~Los precios están escritos dos veces.~~ Eran **tres** (servidor, `/pagar` y `/precios`). Resuelto el 16-sep: salen de `src/lib/precios.ts`, con trinquete que frena si vuelven a escribirse a mano (ver §11).
- [ ] **Rotar la contraseña del login maestro** (se compartió en un chat el 2026-09-12).

### ENCARGO ABIERTO · Auditoría pedagógica de las 167 piezas de contenido

> **Para la IA o el dev que tome esto: esta sección es autocontenida.** No hace falta el historial de la sesión donde salió. Leé §4.5 (reglas de escritura) y §7 (errores históricos) antes de empezar, y §0 antes de commitear.
>
> **EN CURSO desde el 15-sep. El informe vive en [`docs/auditoria-pedagogica.md`](../docs/auditoria-pedagogica.md)** — van ~25 lecciones auditadas de 103, y las láminas sin empezar. Lo ya encontrado **está corregido y en `main`** (ver §11). El hallazgo que cambia el encargo: además de las lagunas de explicación que se buscaban, aparecieron ~50 **errores de contenido** — cuentas que no dan, ejercicios cuya respuesta correcta contradice lo que enseña su propia lección, figuras dibujadas a ojo que contradicen su texto. Mirá eso primero en cada pieza, antes de tocar redacción.

**Por qué existe este encargo.** El 15-sep Ronald leyó una escena de `mcd-mcm` que daba por buena y encontró varias lagunas de golpe: *"creí que se entiende pero ahorita que lo revisé me quedaron muchas lagunas, me da miedo que haya muchas partes donde exista el mismo problema"*. Se arreglaron esa y tres más, y se barrieron los 167 archivos con un script buscando simbología cruda. **El script encontró lo que era un símbolo, y nada más.** El peor problema de esa pantalla no era un carácter raro: era la frase *"El 0 tampoco (tiene infinitos divisores, lo divide cualquier número > 0)"*, una afirmación tirada sin fundamentar. Ningún grep la habría marcado. Por eso hace falta leer.

**Alcance:** 167 piezas.
- 103 lecciones: `src/app/aprende/*/page.tsx`
- 64 láminas: `src/app/laminas/*/*/page.tsx`

**Cómo leer cada pieza.** Con los ojos de un alumno de secundaria de Cochabamba que ve el tema **por primera vez**, no de alguien que lo está repasando. La pregunta en cada párrafo es "¿de dónde salió esto?", no "¿es correcto esto?". Casi todo el contenido es correcto; el problema es lo que da por sabido.

**Qué marcar (los criterios ya son reglas del proyecto, §4.5):**
1. **Afirmación sin fundamentar** (regla 3). Algo que se declara como cierto sin decir por qué, donde el "por qué" no es obvio para quien recién llega. El caso del 0 es el ejemplo canónico.
2. **Dos saltos lógicos en un mismo paso** (regla 2). Si una idea no hace falta para llegar a la conclusión, va como dato extra al final, no en medio del argumento.
3. **Notación nueva sin puente** (regla 1). Un símbolo o una forma de escribir que aparece sin conectarse con algo que el alumno ya sabe de memoria.
4. **Abreviaturas y simbología de quien escribió el código.** Ya salieron dos casos: `2 r 2` por "resto" y el `·` haciendo de multiplicación y de separador a la vez. Si hay que explicar la abreviatura, no es abreviatura, es un problema.
5. **El paso "obvio" que no lo es** (regla 3). El que más pierde al lector suele ser el que el autor ni nombró.
6. **Prosa sin dispositivo visual** donde el tema lo pide (reglas 9 y 10), sobre todo en láminas.

**Qué entregar.** Un informe por pieza, no un reescritura masiva. Para cada archivo: la ruta, y por cada laguna encontrada la cita textual, qué da por sabido, y una propuesta concreta de reemplazo. Priorizar por dónde duele más: **Unidad 01 de cada bloque primero**, porque es el contenido gratis y es lo primero que ve cualquiera que llega (D2). Después el resto.

**Qué NO hacer.**
- No reescribir las 167 de una pasada sin que Ronald vea el informe. El 31-jul se documentó en §4.5 que él revisa de a una, y hay 4 iteraciones de mockup rechazadas que explican por qué.
- No tocar el sentido matemático. Si algo parece un error de contenido y no de explicación, reportarlo aparte, no corregirlo de taquito.
- No meter emojis ni cambiar la paleta (§4, §0).
- El texto nuevo va en **TUTEO** (§0): "puedes", no "podés".

**Ojo con el volumen.** Son 167 archivos grandes; conviene despachar agentes en paralelo, uno por pieza o por grupo chico, con este texto como instrucción. El patrón está probado en este repo: así se cargaron los 139 exámenes de Ingeniería (§11, 28-jul).

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
- [x] Tests automatizados: 20 con `node --test`, el de banco corre sobre los 139 exámenes reales con el parser real. Los 4 que se sumaron el 14-sep son trinquetes de curaduría (ver §11).
- [x] CI: GitHub Actions con tipos, lint, tests y build en cada push.
- [x] Todas las preguntas con `figura:` tienen su dibujo — el trinquete del test está en 0 (ver §11).
- [x] ~~El banco le hablaba de vos al alumno.~~ Pasado a tuteo el 14-sep, 3.144 reemplazos en 129 archivos, con trinquete en 0 para que no vuelva a entrar (ver §11).
- [ ] **1 enunciado nombra una figura que no existe, y es el único que el facsímil NO resuelve.** La `2010-parcial1-2` P7 tiene la figura en el PDF, pero la marca del ángulo 3 está suelta, sin apoyarse en ninguna intersección, ni a 800 dpi (queda como E; ver `docs/figuras-pendientes.md`). **Ese 1 ya no baja leyendo PDF**: bajarlo es decidir qué hacer con una pregunta que el examen original dejó ambigua. Arrancó en 130 el 14-sep: 106 se resolvieron sin abrir un PDF (98 reescribiendo el enunciado, que ya traía la configuración, y 14 dibujando la figura cuando los datos la determinaban), el 16-sep se dibujaron 12 más leyendo los facsímiles en local (los cinco PDF de la gestión 1-2016, que quedó terminada) y el 17-sep otras 29 (los cinco de 2017, las ocho del prefacultativo 2024, seis de 2018/2019/2023, cuatro sueltas de geometría de 2008 a 2015 y las cuatro de física, que dejaron **tres respuestas corregidas**). Qué hace falta para cada una, y las tres formas de desbloquearlo, están en [`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md). El test `ningún enunciado nuevo promete una figura que no está` tiene el tope en 1 y solo puede bajar.
- [ ] **88 preguntas que el trinquete no ve, y hay que contrastar contra su facsímil (van 20, con 7 problemas).** Son las que la pasada del 14-sep sacó de la cuenta reescribiendo el enunciado, y que hoy no declaran `figura:`. Son 88 y no 72 porque el 17-sep `PIDE_FIGURA` se hizo más ancho: **regenerar la lista con el script antes de seguir**. Van 20 auditadas con 7 problemas, en tres modos de falla distintos (la respuesta mal: 2; el enunciado roto por la propia pasada: 3; la descripción que no es la figura aunque la respuesta esté bien: 2). El modo del enunciado roto se encuentra **sin abrir un PDF**, buscando enunciados que arranquen con coma o minúscula, y debería ser lo primero. Lista completa y definición exacta del filtro en [`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md), sección "El 1 es un piso, no un techo".
- [ ] **Y una tercera categoría, que ningún chequeo automático puede encontrar: las que NI SIQUIERA prometen una figura.** El primer caso es `2017-3op-1` P5, que habla de un cuadrado con arcos sin nombrar ninguna figura y cuyo sombreado el texto no determina (está marcada E). El trinquete solo ve las que prometen un dibujo; estas aparecen únicamente abriendo el PDF. Se anotan en la sección homónima de [`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md) a medida que se encuentran.
- [ ] **Ningún test construye las figuras, así que sus verificaciones geométricas no corren en CI.** `verificarAngulo`/`verificarDistancia` explotan al CONSTRUIR la figura, y nada la construye en los tests: `banco.test.ts` lee el registro de `definiciones.ts` como texto, porque ese módulo importa `./motor` sin extensión y `node --test` corre ESM, donde la extensión es obligatoria. La sesión del 13-sep ya lo había topado y decidió no torcer los imports de la app para acomodar un test. Consecuencia: una figura con la verificación rota se commitea sin que nada avise y explota recién en el navegador, en esa sola pregunta. Salida sin tocar los imports: un paso aparte en CI que las construya con `tsx`, o copiar el módulo a un temp con la extensión puesta e importarlo — es lo que hicieron a mano los harness del 16 y 17-sep para los 19 dibujos de esas dos sesiones.
- [x] ~~Guiones largos en el banco.~~ Resuelto el 16-sep: 244 reemplazos en 67 archivos, con el trinquete `el banco no usa guion largo en el texto del alumno` en 0 (ver §11).
- [ ] Las respuestas del ácido fosfórico (`2010-2op-1 P16`, `1-2015 P16`, `2-2015 P16`) quedaron como estaban porque tres gestiones distintas ofrecen el mismo par y lo dan por bueno, pero **no se pudo contrastar contra el facsímil**: los PDF no están en el repo. Anotado en los tres archivos por si aparecen.
- [ ] ~~Stripe~~: descartado para Bolivia. El modelo es pago manual (Tigo Money / QR / transferencia) con aprobación del admin; lo que falta está en §8 Crítico.
- [x] ~~Auditoría visual sistemática en móvil~~ — hecha el 13-sep a 375px, pantalla por pantalla (ver §11). Salió el corte de las fórmulas, el avatar aplastado y cuatro bugs más.
- [ ] **App Android (TWA) sin publicar.** El proyecto está en `android/` (ver §5.1) pero falta lo que solo puede hacer Ronald en su máquina: compilar en Android Studio, generar el keystore firmado y pegar su SHA-256 en `android/app/src/main/res/values/strings.xml` y en `public/.well-known/assetlinks.json` (hoy tiene un placeholder), más la cuenta de Play Console. Ese paso es además el que le saca la barra de direcciones a la app.
- [x] ~~Los modos Premium bloqueados no hacen nada al tocarlos en `/practicar`.~~ Resuelto el 16-sep: llevan a `/precios` con el motivo de lo que el alumno quiso hacer (ver §11).
- [ ] Borrar (o rescatar) los 8 componentes muertos de la landing anterior: `Header.tsx`, `CTANew`, `HeroSectionNew`, `StatsNew`, `RankingSectionNew`, `RankingCardNew`, `QuickActionsNew`, `PricingSectionAxiom`. Cero imports. Ahí vive casi todo el violeta que queda.
- [ ] Terminar de sacar los emojis usados como iconografía: ya salieron los de la landing, el chrome y **todas** las pantallas del alumno. Quedan 1 en componentes compartidos, 166 en las lecciones de `/aprende` (33 archivos) y 77 en admin (12 archivos) — los de admin son los menos urgentes, no los ve el alumno.
- [ ] Banco de Económicas: hay **10 exámenes** contra los 139 de Ingeniería. (Decía "un solo examen"; quedó viejo, se corrigió el 16-sep contando los archivos.)

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

### Desde otra computadora, de cero

Todo lo que hace falta está en GitHub (`ronmarty2/axiom-simulador`, branch `main`). La conversación con la IA NO viaja; esta bitácora es el traspaso.

```bash
git clone https://github.com/ronmarty2/axiom-simulador.git
cd axiom-simulador
npm install
npm run dev          # queda en http://localhost:3001
```

Sin `.env.local` la app corre igual: no hay Supabase, los datos viven en memoria y se entra con `/api/auth/dev-login?rol=estudiante` (o `rol=tester`, o `rol=admin`). Ese login está **muerto en producción** por diseño. Para pegarle a la base real hacen falta las env vars de Supabase, que están en Vercel.

**Lo primero que conviene mirar:** §8 Crítico, que arranca con lo único que falta para poder cobrar.

### Orden de lectura

1. **Leé este archivo entero.** Sobre todo §3 (estructura), §4 (sistema visual), §6 (decisiones) y §7 (errores históricos).
2. Corré `npm install && npm run dev` para levantar local.
3. Para entender el estilo de las lecciones: abrí `src/app/aprende/potenciacion/page.tsx` (la más completa).
4. Para entender el banco de exámenes: leé `data/examenes/umss/economicas/2023.md` y el parser en `src/lib/axiom/banco-parser.ts`.
5. **Antes de tocar animaciones:** leé §4 "Principios de animación" — son lecciones aprendidas a fuerza de romper cosas.
6. **Antes de tocar PWA:** leé §5 — ya hay OTA y supresión condicional del banner; no romper eso.
7. Cuando hagas un cambio significativo, **proponé actualización a esta bitácora** y esperá luz verde.

---

## 11. Cambios mayores (changelog cronológico)

### 2026-09-17 (septies) (14 preguntas sin enunciado, y las rompió el arreglo de las figuras)

El barrido del "modo 2" (buscar enunciados con la gramática rota, sin abrir un solo PDF) encontró algo bastante peor que una coma mal puesta: **14 preguntas tenían el enunciado COMPLETAMENTE VACÍO**. El alumno abría la pregunta y veía las cinco opciones, la respuesta y la explicación, sin ninguna pregunta arriba.

## Las rompió el commit que las iba a arreglar

Lo peor no es el bug, es de dónde salió. Los tres commits del 16-sep que **declararon las figuras** —el trabajo hecho justamente para que el alumno vea el dibujo— son los que borraron el texto:

| commit | preguntas que dejó vacías |
|---|---|
| `e7cf339` "seis figuras mas, y se agota lo que se puede hacer sin los PDF" | 6 |
| `11f525f` "las primeras 5 preguntas dejan de pedir un dibujo que no existe" | 5 |
| `477db86` "tres figuras mas, y una que se descarto a proposito" | 3 |

El script que insertaba `figura: <id>` lo puso **en lugar de** la línea en blanco que separa el encabezado del enunciado, en vez de antes. Y el parser, al ver una línea que no es `clave: valor` dentro del bloque de claves, **la descartaba en silencio** y seguía buscando hasta la primera línea vacía, que ya estaba después del texto.

Estuvieron así un día. Antes del 16-sep las 14 estaban sanas: se verificó commit por commit.

## Ningún test lo podía ver

Y esto es lo que hay que aprender. Había tests para casi todo lo demás de la misma pregunta:

- las opciones estaban perfectas → el test de opciones pasaba
- la respuesta correspondía a una opción → ese test pasaba
- el LaTeX renderizaba → ese test lee las líneas crudas del archivo, así que ni se enteró
- el trinquete de figuras contaba `figura:`, que ahí estaba y bien escrito

**Nadie medía el largo del enunciado.** El campo más importante de la pregunta era el único sin chequear.

## Lo que se hizo, en tres capas

1. **Las 14 arregladas**, devolviendo la línea en blanco. Los enunciados estaban intactos, solo invisibles.
2. **El parser endurecido**: el bloque de claves ahora corta en la primera línea en blanco **o en la primera que no sea `clave: valor`**. Con eso, un archivo al que le falte la separación pierde la prolijidad pero no el texto. Se probó con un bloque sin línea en blanco: sobreviven el enunciado y la metadata.
3. **Test nuevo**: `ninguna pregunta se queda sin enunciado`. Es de una línea y habría cazado esto el mismo 16-sep.

## La lección, que es más general que este bug

**Un script que inserta una línea en un formato estructurado tiene que verificarse RE-PARSEANDO, no con un grep.** Un grep sobre los 14 archivos habría dicho "sí, la línea `figura:` está donde tiene que estar" y habría tenido razón: el problema no era la línea que se agregó, era la que se pisó. La única verificación que sirve es volver a leer el archivo con el mismo parser que usa la app y mirar que los campos sigan teniendo contenido.

Es la misma familia que el error del 15-sep de §7 (reescribir un parseo que ya existía testeado) y que el de las 98 reescrituras del 14-sep (cambiar un campo en masa sin chequear cómo quedaba la frase). Tres veces el mismo patrón: **edición masiva sin verificación masiva**.

## Y de paso, dos erratas de texto

El mismo barrido encontró dos cosas chicas y reales: un `.- ` que quedó pegado al principio de un enunciado de química del `2024-Uop-2` (resto de la numeración del PDF) y un espacio antes de una coma en el `2017-2op-1` P3. Las otras 22 "alertas" del barrido eran falsos positivos: paréntesis que el chequeo veía desbalanceados y son marcadores de lista (`a)`, `i)`, `I)`) o intervalos medio abiertos como `[0°,180°)`.

### 2026-09-17 (sexies) (arranca la auditoría de las invisibles: 20 de 88, y tres modos de falla)

Cerrada la lista del trinquete, empieza el trabajo que de verdad importa: las preguntas a las que el 14-sep se les **sacó la mención a la figura**. Hoy parecen sanas y ningún test las ve, pero nadie las comparó contra su facsímil.

**Primero, el número: son 88, no 72.** Y subió sin que nada empeore. El 17-sep se le agregaron dos formas a `PIDE_FIGURA` (*"ver figura"* y *"la figura N muestra"*), así que el regex reconoce más enunciados viejos como "prometía una figura". La lista de 72 de `docs/figuras-pendientes.md` es la del 16-sep; **hay que regenerarla con el script antes de seguir**, no confiar en la tabla.

## Van 20 auditadas, con 7 problemas, y no son de un solo tipo

Esto es lo más útil que salió del lote: hay **tres modos de falla distintos**, y solo el primero cambia la respuesta.

| modo | qué pasó | encontradas |
|---|---|---|
| **1 · la respuesta está mal** | el paréntesis describe otra figura y el resultado depende de eso | 2 (`2016-1op-1` P7, `2016-3op-1` P6) |
| **2 · el enunciado quedó roto** | le sacaron *"Como se muestra en la figura,"* y quedó arrancando con una coma suelta. El alumno lo ve así HOY | 3 |
| **3 · la descripción no es la figura** | el paréntesis dice algo que el facsímil contradice, pero la respuesta marcada igual es la correcta | 2 |

El **modo 2 se encuentra sin abrir un solo PDF**: alcanza con buscar enunciados que arranquen con coma o minúscula. Debería ser lo primero que corra la próxima sesión, porque es texto roto que el alumno está viendo.

El **modo 3 es el traicionero**, porque no hay test que lo pueda ver: la respuesta cierra, la explicación cierra, y lo único que está mal es el dibujo que el alumno se arma en la cabeza. Se encuentra únicamente abriendo el facsímil y leyendo el paréntesis al lado.

## Los tres enunciados rotos estaban bien de fondo

Se abrieron los tres facsímiles y tanto la configuración como los datos coinciden dígito por dígito. Lo único roto era el texto.

- `2013-final-2` P17 y `2013-parcial2-2` P20 son **la misma figura**. Se verificó que m₁ va ARRIBA de m₂, que es lo que decía el paréntesis: la normal entre los bloques es el peso del de arriba, así que leerlo al revés cambia la fricción, y en el final el sistema ni arrancaría (la T = 8m₃ pasaría a 10m₃).
- `2025-parcial2-1` P18 está en **E**, y una E siempre merece revisar los **datos** y no solo la figura: un dígito mal transcripto alcanza para que el valor real caiga fuera de las opciones sin que el examen tenga nada de raro. Los tres números coinciden con el facsímil, así que los 33,3 kV y la E quedan firmes.

En los tres se devolvió el *"Como se muestra en la figura,"* del original **y se dibujó la figura**, en lugar de parchear la gramática. Dos dibujos para tres preguntas: el par de 2013 comparte uno, y lo puede compartir justamente porque **el dibujo no lleva números** (el 2do parcial trae 2/1/3 kg y el final trae m₁ = 2m₃ = m₂/5).

## El lote 2019: las 9 respuestas bien, 2 descripciones mal

Nueve preguntas en dos facsímiles. Las nueve respuestas verificadas con la cuenta completa, las nueve correctas. Pero dos descripciones no son la figura:

- **`2019-1op-2` P12 · θ se mide desde la HORIZONTAL del borde**, no desde el eje vertical. La respuesta (0,9 m) no cambia porque θ no aparece en las opciones, pero el alumno que dibuje desde el texto se queda con 84° donde el examen marca 6°. La explicación arrastraba el mismo error de símbolo: se renombró el ángulo del eje a α y se aclaró que el θ del dibujo es el complemento.
- **`2019-2op-2` P10 · los dos rodetes externos se TOCAN**, no hay correa. Acá no es cosmético: con correa las dos poleas girarían en el MISMO sentido, y en contacto giran al revés. El facsímil saca la cuerda de A por la izquierda de su polea y la de B por la derecha *justamente* por eso, así que las dos suben; con la correa del texto, ese mismo dibujo tendría un bloque subiendo y el otro bajando. El número no cambia porque la condición de rodadura sin resbalar es la misma que la de la correa.

## La regla que se usó al dibujar: los datos sí, el paso no

Salió de una duda concreta y conviene dejarla escrita. Si el enunciado **dice** un dato ("la mesa no tiene fricción", "las placas están a 2,0 cm"), va rotulado en la figura. Si el dato hay que **combinarlo** para llegar al resultado (como el radio de giro de 50 cm del resorte, que sale de sumar 40 + 10), no va: eso es resolver el problema, no dibujarlo.

## Los dos trinquetes de idioma frenaron texto escrito hoy

Segunda vez en la misma jornada. El de voseo agarró *"Mirá"* y *"Seguí"* en el lote anterior; en este, el de **guion largo** frenó tres `—` que se habían colado en las explicaciones nuevas. Los dos son tests que se escribieron para limpiar deuda vieja y ahora están cazando errores frescos, que es exactamente para lo que sirven.

### 2026-09-17 (quinquies) (las cuatro de física, y tres respuestas que estaban mal)

**5 → 1.** Se terminó la lista: las cuatro que quedaban eran de física, una por facsímil. Fue el lote con **peor tasa de acierto de todo el trabajo — tres de cuatro estaban mal respondidas**, y no por casualidad: en los dos circuitos el propio archivo admitía que había adivinado la figura.

| examen | facsímil | pregunta | respuesta |
|---|---|---|---|
| `2009-parcial3-2-2009` | `094_…2-2009.pdf` p.4 | P19 · tres resistores | **B → C** |
| `2014-final-2-2014` | `136_final2-2014.pdf` p.4 | P19 · resorte que gira | C, ya estaba bien |
| `2014-final-2-2014` | `136_final2-2014.pdf` p.4 | P20 · tazón semiesférico | A, ya estaba bien |
| `2025-final-1-2025` | `2025-1-preu.pdf` p.12 | P20 · cinco amperímetros | **E → A** |

## El cable que nadie vio

El `2009-parcial3-2` P19 pide la resistencia equivalente de un 3 Ω, un 2 Ω y un 5 Ω "según la figura". El archivo decía, con todas las letras, que había *"probado las combinaciones serie/paralelo posibles"* hasta que una diera un número de la lista, y se había quedado con "los tres en serie" = 10 Ω.

El facsímil muestra un **cable pelado** que sale del nodo posterior al 3 Ω, cruza por arriba y baja al nodo posterior al 5 Ω. Cortocircuita la serie 2+5: **Req = 3 + (7 ∥ 0) = 3 Ω**, la opción C. Se renderizó a 600 dpi para confirmar dónde apoyan los dos pies del puente, porque de eso depende todo el resultado.

Lo que cierra el caso es la lista de distractores: 10 es "no vi el puente" — *justo* el error que se había cometido —, 7 es "el puente se comió el 3 en lugar del 2 y el 5", y 5 es el resistor solo. Cuando los cuatro distractores se explican solos con una lectura, esa lectura es la correcta.

## El amperímetro que era un cable

El `2025-final-1` P20 estaba en **E**, y con un razonamiento explícito: se había supuesto que el extremo lejano de R quedaba fijado en 160 V por la otra batería, lo que da R = (200−160)/10 = 4 Ω, un valor que no está entre las opciones. El archivo hasta anotaba que el resultado "se mantuvo robusto al probar variantes razonables" de cómo se conectan las otras ramas.

La figura dice otra cosa, y la pieza que cambia todo es **A₄: un amperímetro ideal es un cable**, y ese cable une el nodo donde termina R con el negativo de *la propia* batería de 200 V. O sea que R y esa batería forman un lazo cerrado y solo, y el resto de la red no interviene: **R = 200/10 = 20 Ω**, la opción A. Es el circuito clásico del Young & Freedman, y las otras cuatro lecturas (A₂ = 4, A₅ = 8, A₃ = 12, A₄ = 14) salen del lado de 160 V y sirven de chequeo.

La lección no es sobre este circuito: es que **"probé variantes y todas dan parecido" no es evidencia de nada** si ninguna de las variantes probadas era la real. Las cuatro que se probaron compartían el supuesto equivocado.

## En circuitos la verificación tiene que ser eléctrica

Todas las figuras del banco se verifican con geometría: ángulos, distancias, áreas. Un circuito no tiene nada de eso que mentir — un riel torcido dos grados no cambia ninguna respuesta. Lo que puede estar mal es la **topología**, y eso no lo agarra ningún `verificarAngulo`.

Así que las dos figuras de circuito se verifican con la cuenta eléctrica: se declaran los potenciales de nodo que impone la topología dibujada y se comprueba que la corriente por R dé los 10 A del enunciado. Esa verificación es exactamente la que distingue las dos lecturas posibles de la figura del 2025: con la topología del transcriptor daría 2 A y explota al construir. Es el patrón a repetir para cualquier figura donde lo que importa es qué está conectado con qué y no dónde está dibujado.

## Un PDF puede traer varios exámenes

El `2025-1-preu.pdf` tiene 12 páginas y son los **tres** exámenes de la gestión, cuatro páginas cada uno: 1er parcial (1-4), 2do parcial (5-8) y final (9-12). La física del final es la página 12, no la 4. Los `2024-*-preu.pdf` ya eran así. Van dos lotes seguidos con esta forma, así que conviene asumirla: mirar el encabezado de cada página antes de recortar sale más barato que recortar la página equivocada.

## Lo que el facsímil confirmó sin cambiar la respuesta

Las dos del `2014-final-2` ya estaban en C y A, pero el facsímil no solo confirma el número: confirma el **razonamiento**, que es lo que el alumno necesita. En la P19 el resorte y la varilla son **horizontales** — por eso la gravedad no entra en la ecuación y el radio de giro es el largo estirado (50 cm) y no el natural. En la P20, m₁ arranca **en el borde** del tazón, a una altura R sobre el fondo: es el único dato que el texto no da y del que depende todo el resultado.

## Y queda 1, que ya no baja leyendo PDF

El trinquete pasa de 5 a **1**, y el que queda es la `2010-parcial1-2` P7: la única del banco donde **tener el facsímil no alcanza** (la marca del ángulo 3 está suelta, ni a 800 dpi se sabe de qué vértice es; queda como E). Bajar ese 1 no es cuestión de conseguir un PDF, es decidir qué hacer con una pregunta que el examen original dejó ambigua.

Lo que sigue abierto es otra cosa: las **72 preguntas** que el trinquete no ve porque el 14-sep se les sacó la mención a la figura, y que hay que contrastar contra su facsímil. Van 2 malas de 8 revisadas.

## El test de voseo hizo su trabajo

Las dos explicaciones nuevas salieron con *"Mirá el cable de arriba"* y *"Seguí el camino de R"*. El test las frenó en el acto: es texto que ve el alumno, y va en tuteo ("Mira", "Sigue"). Es la primera vez que ese test agarra algo escrito en la misma sesión y no una deuda vieja — la reescritura del 17-sep, que lo generó desde los infinitivos en lugar de una lista a mano, es lo que lo hizo capaz de verlo.

### 2026-09-17 (quater) (las sueltas de geometría 2008-2015, y la única que el facsímil no resuelve)

**9 → 5.** Cuatro preguntas en cuatro PDF distintos, una por archivo: el tramo más caro en tiempo por figura de todo el trabajo. **Las cuatro estaban bien respondidas**, así que solo hubo que dibujar.

| examen | facsímil | pregunta |
|---|---|---|
| `2008-parcial2-2-2008` | `081_…2-2008.pdf` p.2 | P7 · dos cuerdas que se cruzan |
| `2012-2op-1-2012` | `120_SegundoExamenIngreso1-2012.pdf` | P6 · diámetro AOB y el ángulo ADC |
| `2014-parcial1-2-2014` | `134_1erparcial2-2014.pdf` p.2 | P7 · el segmento circular de 60° |
| `2015-1op-2-2015` | `139_1ra-op-2-2015.pdf` | P7 · diagonales, BE − ED |

## La única que el facsímil NO resuelve

**`2010-parcial1-2-2010` P7 queda como E.** Estaba marcada así, "provisorio", con el archivo admitiendo que *"depende de una figura del PDF original… que no está disponible en el texto extraído"*. Ahora el PDF se abrió, y **la figura está**: dos paralelas cortadas por dos transversales, con los ángulos 1 y 2 marcados sobre CD.

El problema es el ángulo 3: **su marca está suelta.** Se renderizó la página a **800 dpi** y los dos cuadraditos que dibujan esa marca quedan a ~100 px del único cruce cercano — unos 3 mm en la hoja. No hay forma de decir de qué vértice es el ángulo sin adivinar, y según de dónde se mida da 40°, 60° o 120°.

Es el primer caso del banco donde **tener el facsímil en la mano no alcanza**. Queda anotado en `docs/figuras-pendientes.md` para que la próxima sesión no vuelva a abrirlo esperando resolverlo. Es una distinción que vale la pena tener escrita: hasta hoy "pendiente" quería decir "falta el PDF"; esta es "el PDF está y no dice".

## El orden de las secciones cambia de año en año

Los exámenes viejos del prefacultativo traen **una sección por página**, pero el orden NO es estable:

- 2009 (3er parcial): Aritmética, Geometría, Química, Física, Biología
- 2010 (1er parcial): Aritmética, **Física**, Química, **Geometría**, Biología
- 2014 (1er parcial y final): Álgebra, Geometría, Química/Física según el caso, Biología

Buscar la geometría en la página 2 porque "siempre está ahí" hace perder el tiro: en el 2010 la página 2 es Física. Se resuelve recortando la banda de los títulos de las cinco páginas y mirándolas juntas, igual que con los `preu` de 2024 pero apuntando más abajo en la hoja (el título de sección va bajo el encabezado de la universidad).

## Una construcción que se verifica sola

La de las dos cuerdas tenía el riesgo de siempre: dibujar cuatro puntos "más o menos" en una circunferencia. Se armó al revés — las cuatro distancias a O las fija el enunciado (4, 9, 12 y 3), y el CENTRO sale del cruce de las dos mediatrices con `cruce`, con los cuatro radios verificados contra el primero. Si los cuatro puntos no fueran concíclicos, explota al construir. Es el patrón a repetir cuando la circunferencia es consecuencia y no dato.

### 2026-09-17 (ter) (el lote 2018/2019/2023: cae la última de "las tres peores")

**15 → 9.** Seis preguntas en cuatro facsímiles, y esta vez **las seis estaban bien respondidas**: no hubo nada que corregir, solo dibujar. Cuatro figuras nuevas, porque dos preguntas comparten una y otra reusa un dibujo que ya existía.

| examen | facsímil | preguntas |
|---|---|---|
| `2018-2op-1-2018` | `152_2da-op-1-2018.pdf` | P7, P11 |
| `2018-3op-1-2018` | `153_3ra-op-1-2018.pdf` | P7 |
| `2019-3op-1-2019` | `158_3ra-op-1-2018.pdf` | P6 |
| `2023-3op-1-2023` | `3-op-1-2023.pdf` | P5, P7 |

## Cae la última de "las tres peores"

El `2018-2op-1` P11 era la que quedaba en duda desde el 14-sep: *"no se sabe si es un rizo o una pared cilíndrica"*. El facsímil lo muestra sin lugar a dudas: es una **pared cilíndrica**, un tambor con el motociclista pegado a la pared interior, con μ y g marcados.

Y hay algo mejor: resultó ser **la misma pregunta** que el `2017-3op-1` P11 — mismo texto, mismos μ = 0,5 y r = 20 m — que ya tenía dibujado `f11-pared-de-la-muerte`. Así que la duda se cerró **sin dibujar nada nuevo**, solo declarando el id que ya existía. Con esto las tres que §8 marcaba como las peores están las tres resueltas.

## El pentágono que sí se podía compartir

El `2018-3op-1` P7 y el `2019-3op-1` P6 tienen el enunciado idéntico y la misma respuesta (108°). Se compararon **las dos imágenes** antes de compartir el dibujo — la lección del lote 2017, donde dos que parecían iguales no lo eran — y acá sí coinciden: mismo pentágono, misma tangente en el vértice de arriba a la izquierda, mismos X e Y. Un solo constructor para las dos.

El problema sale de los arcos y no depende del tamaño: con 72° entre vértices, X (dos secantes) vale (144−72)/2 = 36° y Y (tangente y secante) vale (216−72)/2 = 72°.

## Tres archivos más con el nombre mal

`156_1ra-op-1-2018.pdf`, `157_2da-op-1-2018.pdf` y `158_3ra-op-1-2018.pdf` dicen 2018 en el nombre y **adentro son 1-2019**. No es un dígito mal tipeado: son otro año. Los de 2018 de verdad son el 151 al 155. Van **cinco** archivos con el nombre mentiroso en cuatro lotes (estos tres más el `143_2ra-op-1-2016` que era la 3ra opción y los dos de agosto de 2016 con el encabezado equivocado). Queda anotado en `docs/figuras-pendientes.md`: **identificar un PDF por su nombre no funciona en esta colección**; hay que abrirlo y mirar el encabezado y la fecha.

## Dos helpers nuevos, y dos verificaciones que estaban mal escritas

Se sumaron a `definiciones.ts`:

- **`cruce(a1, a2, b1, b2)`** — intersección de dos rectas dadas por dos puntos cada una. Hacía falta porque en tres de estas figuras el punto que se pregunta ES una intersección (α en el cruce de dos cuerdas, X e Y del pentágono, el vértice del triangulito negro), y `hastaY` solo sirve cuando la otra recta es horizontal.
- **`desvioParalelas(a1, a2, b1, b2)`** — el desvío del paralelismo, plegado a [0, 90].

El segundo salió de un error propio: la verificación de `AB ∥ RT` explotó con *"debería medir 0° pero mide 180.00°"*. Las dos cuerdas SÍ eran paralelas; lo que estaba mal era la comprobación, porque comparar `anguloHacia` contra `anguloHacia` a secas da 180 cuando las rectas van paralelas pero recorridas en sentidos opuestos. Ese patrón frágil quedó en tres figuras de los lotes anteriores (`g8trapecioBaseMedia`, `g9trapecioCuartos`, `g6thalesDeParaleloCb`): ahí funciona de casualidad porque las direcciones coinciden, y conviene pasarlas al helper la próxima vez que se toquen.

La otra mal escrita era peor porque no podía fallar: en la escalera de cinco cuadrados puse `anguloEn(recta[0], escalera[0], …)` y esos dos son **el mismo punto**, así que el ángulo no medía nada. Se reemplazó por dos `verificarDistancia` que comprueban que la recta une la punta de arriba del primer cuadrado con la esquina de abajo del último. Es el segundo caso en dos días de una comprobación que daba verde sin comprobar nada.

### 2026-09-17 (bis) (el lote 2024: 8 figuras y DOS respuestas que estaban mal)

**23 → 15.** Se leyeron los dos PDF del prefacultativo de 2024 y se dibujaron las **8 figuras** que quedaban de esa gestión. Era el lote más rentable de los que quedaban: 8 preguntas en 2 archivos.

**Cómo están armados esos PDF.** Los tres exámenes de cada gestión vienen en UN PDF de 18 páginas, con las secciones siempre en el mismo orden (Aritmética, Geometría, Química, Física, Biología, Estrategias), así que el primer parcial ocupa las páginas 1-6, el segundo las 7-12 y el final las 13-18. Se ubicaron renderizando **solo la banda superior de las 18 páginas** y leyendo los encabezados juntos — 18 tiras de 78 px en una sola imagen. Vale la pena repetir el truco con los otros `preu`.

## Dos respuestas corregidas, y las dos por lo mismo

De las 8, **seis estaban bien y dos estaban mal**. Las dos fallaron por la misma causa: el escaneo de baja resolución no dejaba leer la figura y se había adoptado una lectura "razonable" en su lugar.

**`2024-parcial1-1` P6: era E, es D (5π/2).** La explicación decía *"cuartos de disco centrados en A y en B que se cruzan en un punto O cerca de E"*. Renderizado a 400 dpi y medido, son **tres** arcos y **ninguno sale de A ni de B**: el cuarto centrado en **D** de radio 4 (el lado, de A a C), el cuarto centrado en **E** de radio 2 (de D hasta O, con su radio OE dibujado) y la semicircunferencia de diámetro EC. Las dos regiones chicas caen enteras dentro del cuarto grande, así que la resta es directa: 4π − π − π/2 = **5π/2**.

**`2024-parcial2-1` P19: era C (54 μF), es D (10 μF).** Esta es una de las **tres peores** que la bitácora del 14-sep listaba en §8 (*"no se sabe la topología de la red de capacitores"*; esa frase se perdió al reescribir el ítem el 16-sep, está en el commit `3c4f3bc`), y el propio archivo lo admitía por escrito: *"no permite una reconstrucción topológica 100% inequívoca a partir del escaneo. Se adoptó la lectura más simple… los cuatro capacitores están todos en paralelo… 6C = 54 µF"*.

A 400 dpi el circuito no tiene nada de ambiguo: entre **a** y **d** hay un bloque con dos ramas en paralelo (arriba dos C en serie, abajo un 2C) y de **d** a **b** va otro 2C en serie con todo el bloque. Eso da (5C/2 en serie con 2C) = 10C/9 = **10 μF**.

**Y los 54 μF eran el distractor.** 6C es exactamente lo que sale de suponer los cuatro en paralelo: el error que el ejercicio está puesto para castigar. La lectura "más simple y consistente con el nivel del curso" era la trampa.

La lección no es nueva pero esta vez muerde más fuerte que el 13-sep: **cuando el archivo dice que no pudo leer la figura, lo que hay abajo no es una respuesta, es una apuesta.** Las dos quedaron anotadas en el bloque de comentario de su `.md`, reemplazando la nota que documentaba la suposición.

Con estas dos van **cuatro** correcciones en los cuatro lotes de figuras; las otras dos (`2016-1op-1` P7 y `2016-3op-1` P6) eran de descripción, no de respuesta.

## Un dibujo que a propósito NO está a escala

El `2024-final-1` P6 tiene AD = DC = 15 y CB = x = 4. A escala, ese triángulo es una **astilla de 7,5 a 1** donde no entra ninguna etiqueta — y el propio facsímil lo dibuja esquemático. Lo que sí está exacto, y verificado en el constructor, es la **topología**: D es el punto medio de AC y DE es paralelo a CB, que es lo único que el alumno tiene que leer del dibujo (los 15, el (x+2)/3 y la x van rotulados, no medidos).

Es la **primera excepción declarada** a la regla 7 de §4.5 ("figuras siempre con coordenadas calculadas"). La regla existe para que un dibujo no enseñe geometría falsa cuando el alumno tiene que LEER la forma; acá la forma no dice nada y las medidas son etiquetas. Queda escrito en el comentario del constructor y en `docs/figuras-pendientes.md` para que no se lea como un descuido.

## Detalle

Se sumó el helper `capacitor()` a `definiciones.ts`: dos placas IGUALES y paralelas, a diferencia de `pila()`, que las dibuja de largos distintos para marcar el polo. Y otra vez una verificación se ganó el sueldo: el `verificarAngulo` del trapecio explotó al construir porque puse el cruce de la diagonal en `3 + AB/2` cuando la intersección está en `(3 + AB)/2` — un error de aritmética mío que ningún test del banco habría visto.

### 2026-09-17 (el lote 2017: 7 figuras, el muestreo que sale limpio y una tercera categoría)

**29 → 23.** Se leyeron los cinco facsímiles de 2017 (146 a 150) y se dibujaron **7 figuras**: las 6 que estaban en la lista más la del `2017-2op-2` P5.

| examen | facsímil | de la lista | y además |
|---|---|---|---|
| `2017-1op-1-2017` | `146` | P10 | — |
| `2017-2op-1-2017` | `147` | P6, P7 | — |
| `2017-3op-1-2017` | `148` | P6, P7 | — |
| `2017-1op-2-2017` | `149` | P7 | — |
| `2017-2op-2-2017` | `150` | — | **P5** |

**Dos figuras que se parecen y NO son la misma.** La "FIGURA 1" del `2017-2op-1` y la del `2017-3op-1` son el mismo dibujo — dos cuadrados de lado 1 y dos rectas desde el vértice inferior izquierdo — con dos diferencias que **solo están en la imagen**: la cota del dato (4/13 contra 3/11) y **cuál de los dos cuadrados está sombreado**, el izquierdo en una y el derecho en la otra. Por eso una da g/4 = 1/13 y la otra 3g/4 = 9/44. Comparten builder pero NO figura: si se hubieran compartido el dibujo, una de las dos habría quedado con la respuesta de la otra. Es el contraejemplo del lote anterior, donde tres figuras sí se podían reusar tal cual.

En esas dos, además, **la cota es el único dato del problema**: sin el 4/13 (o el 3/11) la segunda recta podría ir a cualquier parte y no hay nada que calcular. Un enunciado que diga "dos cuadrados de lado 1, halle el área sombreada" no es una pregunta.

**El muestreo de las invisibles sale limpio por primera vez.** Seis de las 72 eran de 2017 y se abrieron todas: **las seis están bien**. El paréntesis que les dejó la pasada del 14-sep describe la configuración correctamente y la respuesta marcada coincide con el cálculo. Los dos primeros casos que se habían abierto (`2016-1op-1` P7 y `2016-3op-1` P6) estaban mal, así que van **2 malas de 8 revisadas**. Poco para extrapolar, pero conviene ir anotando la proporción.

A una se le dibujó la figura igual: el `2017-2op-2` P5 se sostenía con un paréntesis de cuatro líneas que describía el dibujo entero (dónde va el cuadrado, qué triángulo está sombreado). Ahora tiene la figura y el enunciado volvió a ser el del facsímil. Sus opciones son 4319, 4320, 4321 y 4322 sobre 289: acá no alcanzaba con "más o menos", y la verificación del área quedó escrita en la figura.

**Y aparece una TERCERA categoría, que ningún regex puede encontrar.** El `2017-3op-1` **P5** no está en ninguna de las dos listas y necesita su dibujo: su enunciado **no nombra ninguna figura** (*"Se tiene un cuadrado ABCD, el punto de intersección de las diagonales es E y los arcos son cuartos de circunferencia…"*), pero el facsímil trae un cuadrado con cuatro arcos y una trama de sombreado que el texto no determina — no dice cuáles de las regiones que esos arcos recortan están sombreadas, y hay varias. Está marcada E.

No se dibujó a propósito: reconstruirla pide medir el sombreado arco por arco, y la respuesta marcada es un "ninguna de las anteriores", que es justo el caso en el que conviene no apurarse. Queda anotada en `docs/figuras-pendientes.md` como el primer caso de esta categoría. **El trinquete solo ve las que PROMETEN una figura; esta no promete nada.** Solo aparece abriendo el PDF.

**Detalle de verificación:** las dos figuras de los cuadrados y la del 5-12-13 calculan el área del polígono que van a dibujar (shoelace, y de px a unidades dividiendo por ESC²) y la contrastan con la fórmula cerrada. La primera versión de esa comprobación se comparaba consigo misma — verdadera siempre, inútil siempre — y se corrigió antes de commitear.

### 2026-09-16 (octies) (el resto del 1-2016: 12 preguntas, 9 dibujos, y el tercer agujero del trinquete)

**38 → 29.** Se terminaron las otras cuatro opciones de 2016 leyendo sus facsímiles (142 a 145): 13 preguntas con figura, **9 dibujos nuevos**, porque tres se comparten. Como en el lote anterior, los facsímiles traían MÁS de lo que estaba pedido: de las 13, cuatro no estaban en ninguna lista.

| examen | facsímil | de la lista | y además |
|---|---|---|---|
| `2016-2op-1-2016` | `142_2da-op-1-2016.pdf` | P5, P8, P10 | — |
| `2016-3op-1-2016` | `143_2ra-op-1-2016.pdf` | P5, P8 | **P6** |
| `2016-1op-2-2016` | `144_1ra-op-2-2016.pdf` | P5, P11 | **P6** |
| `2016-2op-2-2016` | `145_2da-op-2-2016.pdf` | P5, P11 | **P6** |

**Tres figuras se comparten, y no por parecidas: el facsímil es el mismo.** `2016-2op-1` P10 tiene el enunciado, los números y el dibujo idénticos al `2016-1op-1` P10, así que reusa su id. Y las dos opciones de agosto comparten la Figura 3 y la del F11. Dos pares más comparten CONSTRUCTOR con distinto rótulo, porque la construcción es la misma y solo cambia el dato: el cuarto de círculo con el cuadradito tangente (una da el área del cuadradito y pide la sombreada; la otra da el área del sector y pide el lado — el dibujo es idéntico hasta la escala, porque a/L = 1 − 1/√2 siempre), y el triángulo rectángulo con bisectriz (17 y 8 en una, 16 y 8 en la otra).

**Las dos "descartadas a propósito" dejan de estarlo, y el texto estaba mal.** `docs/figuras-pendientes.md` las daba por imposibles: *"no queda claro cómo están montadas las dos poleas"*. El facsímil lo aclara y **no era lo que decía el enunciado**: la mesa tiene un HUECO en el medio, con una pared que baja en cada borde interno y una polea montada arriba de cada pared; A y B están sobre la mesa, uno a cada lado, y cada uno tira de su cuerda hasta C, que cuelga entre las dos. El texto decía "polea fija en el borde de la mesa", que sugiere el borde de afuera. Se corrigió en los dos exámenes. El resultado no cambia (a = 4,5 m/s², 9 m en 2 s), pero la figura sí.

**El tercer agujero del trinquete.** Después de los infinitivos que le faltaban al de voseo y del imperativo con pronombre pegado, ahora `PIDE_FIGURA`: no entendía **"ver figura 3"** ni **"la figura 3 muestra"**. Las dos P6 de agosto decían literalmente *"ver figura 3"*, prometiendo un dibujo que no existía, y el test las daba por limpias. Se le agregaron las dos formas y **costó cero**, porque para cuando se midió ya tenían su figura: lo que evitan es la próxima. Se verificó que funciona quitando una declaración a mano — la cantó con archivo y pregunta.

**Y algo para la próxima tanda: los nombres de archivo mienten.** `143_2ra-op-1-2016.pdf` dice "2ra" y adentro es la **3ra** opción. Peor: los dos PDF de agosto traen `EXAMEN-INGRESO 1-2016` en el encabezado siendo de la gestión **2/2016** — el error es del facsímil, y los nombres del repo ya están bien. Lo que distingue es la FECHA (10 y 31 de marzo contra 10 y 23 de agosto), no el encabezado. Se identificaron los cuatro renderizando solo la banda de arriba de la página 1 y leyéndolas juntas.

**Una verificación se ganó el sueldo.** El `verificarAngulo` del F11 explotó al construir: *"tramo de A horizontal debería medir 0° pero mide −21,12°"*. No era la figura, era la verificación — comparaba contra el CENTRO de la polea en vez del extremo del tramo, que entra por su tope. Es exactamente para lo que está: si la figura y su propia comprobación no coinciden, una de las dos está mal y hay que mirar cuál.

### 2026-09-16 (septies) (main se come el branch de la nube, y 54 casos de voseo que ningún trinquete veía)

**Ronald preguntó si estaba todo en `main`. No estaba.** El branch
`origin/claude/exam-simulator-m690mc` tenía **8 commits que nunca llegaron**:
los diagramas nuevos de ecuaciones de primer y segundo grado, logaritmación,
MCD-MCM algebraico, repartos proporcionales y sistemas lineales, más dos
arreglos de contenido. Estaba 92 commits atrás de `main`, así que el merge fue
a mano. Ya está adentro.

Lo que se revisó antes de tocar nada, porque la pregunta era si se perdía algo:

| Qué | Estado |
|---|---|
| `main` local vs `origin/main` | iguales, nada colgado |
| Los 9 commits de exámenes de FCE | **los 9 en `main`** |
| `origin/claude/exam-simulator-m690mc` | 8 commits afuera → **mergeados** |
| Los otros tres branches `claude/*` | 0 commits afuera, ya estaban |
| Branch local `master` | snapshot huérfano (historia sin relación) del ~14-sep. 21 archivos que `main` no tiene: `design/*.dc.html`, `data/research/`, `scripts/auditoria-*.mjs` y una captura. **No se mergeó a propósito**: no comparte raíz con `main` y sus otros 286 archivos son versiones viejas que pisarían lo de ahora. Si esos 21 tienen que entrar, van a mano y uno por uno |

**Nada de esto toca FCE.** El branch de la nube no tiene un solo archivo de
`economicas/`, y los 10 exámenes de Económicas que hay transcriptos están todos
en `main`. Si hay otra sesión trabajando en FCE, todavía no empujó nada.

**Cómo se resolvió el merge.** El contenido nuevo lo manda el branch — son las
escenas con apoyo visual, que es el trabajo que vino a hacer; de `main` se
preservan el tuteo y los arreglos de refactor y de token de color. Tres
conflictos, y el tercero es el que enseña algo:

- `ecuaciones-primer-grado`: choque de imports. Van las dos mitades, y el
  import de `lienzo` queda UNO, porque `main` tenía otro más abajo.
- `repartos-proporcionales`: `main` había convertido la etiqueta
  *"👆 REPARTIR…"* en el componente `EtiquetaToque`; el branch reemplazó esa
  escena entera por `BarraReparto`, un diagrama de verdad, accesible por
  teclado y sin el emoji. Gana la del branch: el refactor de `main` era sobre
  código que ya no existe.
- `mcd-mcm-algebraico`: el branch reescribió `CancelarTrampa` y la dejó
  estática. El pie al que `main` le había arreglado el voseo describía el
  componente VIEJO — *"toca para resaltar los factores comunes"*, y ya no se
  toca nada ni se habla del MCD. **Tomar cualquiera de los dos lados estaba
  mal**: el de `main` miente sobre el dibujo nuevo y el del branch deja la
  Pizarra sin pie. Se escribió uno que dice lo que el dibujo muestra.

**Dos cosas que el branch traía y no podían quedar.** Un `let acumulado = 0`
mutado adentro de un `.map()`, que el compilador de React rechaza y en el
branch no molestaba porque su base es anterior a esa regla. Y voseo, que abrió
lo que se llevó el resto de la sesión.

## Los 54 casos de voseo, y por qué los tests decían que estaba limpio

El branch se escribió antes de la normalización a tuteo del 14-sep, así que sus
líneas nuevas venían en rioplatense. El trinquete de lecciones cantó 6. Barrer
a mano encontró **54 en total**, en TODO el contenido — lecciones, láminas y
banco, la mayoría anteriores al branch. Dos agujeros distintos:

**1. Faltaban infinitivos.** El test genera las formas voseantes desde una
lista de infinitivos, y no tenía `tocar`, `sacar`, `sustituir`, `llevar`,
`cambiar`, `operar` ni `saltar`. Solo `tocar` eran 8 casos, casi todos el pie
de una Pizarra: *"Tocá para…"*.

**2. Nadie generaba el imperativo CON EL PRONOMBRE PEGADO**, que pierde la
tilde: *resolvela, sumale, convertila, igualalas, escribilo, Pensalo, Seguilo,
ponele*. Son 40 de los 54. Se pueden generar sin falsos positivos justamente
porque el tuteo lleva la tilde en la raíz (*súmale*, *conviértela*), salvo dos
colisiones con palabras que existen: `tomar`+`te` da el **tomate** y
`terminar`+`les` da las **terminales** nerviosas del diagrama de
`sistema-nervioso`. Quedan como excepción, anotadas en el código.

Los dos tests ahora generan encliticos, y **el del banco dejó de usar la lista
de 20 formas escritas a mano** y pasa a generar desde infinitivos, que es el
enfoque que `contenido-lecciones.test.ts` ya tenía probado y documentado. Esa
lista a mano era la que dejaba pasar 28 casos del banco.

Tres casos merecen mención aparte:

- **`2017-1op-2` P4**: la explicación CITABA el enunciado y le cambiaba el "tú"
  por "vos" tres veces. No era solo voseo: citaba mal el examen.
- **22 explicaciones del banco decían "Plantéa"** con tilde. El imperativo de
  tú es *Plantea*, llana terminada en vocal. Salieron en la misma pasada.
- **`sistema-nervioso`: "Terminales (salida)" no es voseo**, es el sustantivo.
  Es la segunda excepción del generador, y el recordatorio de que un generador
  de formas hay que mirarlo con los ojos antes de creerle.

Se verificó que los dos trinquetes **pueden fallar**: se reinyectó un caso en
cada lado (`Balanceala` en el banco, `sacalo` en `factorizacion`) y cada uno lo
cantó con archivo y línea.

### 2026-09-16 (sexies) (las cuatro figuras del 1-2016 1ra, leídas del facsímil, y el trinquete que no veía 74 preguntas)

**Primera sesión que corre en la máquina de Ronald**, así que por primera vez se pudo abrir `examenes pasados/` directo. Era el camino 3 de [`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md), el único que llega a los 225 MB de PDF sin subir nada al repo.

**Las cuatro figuras del examen 1-2016 (1ra opción) están dibujadas: 41 → 38.** El pedido eran tres (P5, P6 y P10, las que estaban en la lista) y el facsímil tiene cuatro.

Cómo se leen los dibujos: `pdftoppm -r 300 -png` sobre el PDF y recorte de la zona del dibujo con `sharp`, que ya está en `node_modules`. La página entera renderizada no alcanza para medir una figura — a ese tamaño no se distingue si un arco pasa por el vértice o cerca.

- `g5-cuadrado-tres-segmentos-5cm` (Figura 1) — los dos segmentos que salen de los vértices izquierdos llegan al MISMO punto interior, así que ese punto está en la línea media. Con $P=(s-5,\,s/2)$ sale $s=8$, y el dibujo usa el lado real para que las proporciones no mientan.
- `g6-cuarto-circulo-cuadrado-tangente` (Figura 2) — cuarto de disco centrado en el vértice inferior izquierdo con radio igual al lado, y el cuadrado chico (área 16) tocando el arco con su vértice más cercano al centro: $(L-4)\sqrt2=L$. La reconstrucción a nivel de píxel ya estaba en el comentario del `.md` desde julio; acá se dibujó y se verificó con `verificarDistancia`.
- `g7-equilatero-sombra-sol-30` (Figura 3) — **la que no estaba pedida.**
- `f10-colgante-dos-poleas-fijas` — una sola cuerda: del bloque 1 que cuelga, por la polea del techo, baja a la polea del piso, cuarto de vuelta y horizontal al bloque 2. Es lo que decide el problema y no se puede adivinar del texto.

**La P7 es el hallazgo de la sesión.** No estaba en la lista de pendientes, y el facsímil tiene su figura. Dos cosas mal a la vez:

1. La pasada mecánica del 14-sep le sacó el *"como en la figura"* y dejó el enunciado roto: *"un triángulo equilátero de lado 6 se halla, sabiendo que…"*.
2. La explicación que quedó escrita ponía el triángulo **apoyado sobre su base**. En el PDF está **dado vuelta**: el lado de 6 es el horizontal de arriba y abajo hay un solo vértice, que es el único que toca el piso.

El resultado (12) es el mismo en las dos orientaciones por casualidad aritmética — proyectando $(x,y)\mapsto x+y\sqrt3$, los vértices caen en 0, 6 y 12 en ambos casos — así que **ningún test lo iba a agarrar**: el trinquete de figuras no la veía y el de "la explicación no se contradice con la respuesta" tampoco, porque no se contradice.

**El tope del trinquete no mide el problema, mide las menciones.** De ahí salen dos formas de bajarlo y solo una es progreso: dibujar la figura, o reescribir el enunciado para que no la nombre. La pasada del 14-sep hizo lo segundo con 98 enunciados (`f3f276a`); la mayoría estaban bien porque el transcriptor ya había puesto la configuración en un paréntesis, pero las que no, quedaron invisibles. **Son 74.** Definición exacta para regenerar la lista (está entera en `docs/figuras-pendientes.md`): el enunciado antes de `f3f276a` matcheaba el regex `PIDE_FIGURA` del test, el de hoy no, y hoy sigue sin declarar `figura:`. No son 74 figuras para dibujar: son 74 preguntas para abrir contra su facsímil y decidir. Una ya falló.

**Dos helpers nuevos en `definiciones.ts`:** `rayado()` (el hachurado de piso y techo, que estaba copiado a mano dentro de cada figura de física) y `sol()`.

**Detalle de verificación que conviene saber.** Las verificaciones geométricas del motor (`verificarAngulo`/`verificarDistancia`) **no corren en CI**. `definiciones.ts` importa `./motor` sin extensión, que Next resuelve pero `node --test` no, así que el test lee el registro de constructores como TEXTO en vez de importarlo (está comentado en `banco.test.ts`) — y ninguna figura se construye. Las cuatro de esta sesión se verificaron a mano, con un harness en el scratchpad que copia el módulo con la extensión puesta, lo construye y reproduce el pintado de `ElementoSVG` para escupir el SVG y mirarlo. Queda como pendiente en §8: el harness se puede volver test.

### 2026-09-16 (quinquies) (los modos Premium dejan de ser botones muertos, y los precios pasan a un solo lugar)

**Los modos Premium de `/practicar` no hacían nada al tocarlos.** Se veían atenuados y con candado, así que no era el bug del botón muerto del 13-sep (ahí el botón parecía habilitado), pero el toque moría igual. Ahora llevan a `/precios` con el motivo de lo que el alumno acaba de pedir: "Mis errores" manda `motivo=errores` y "Simulacro inteligente" manda `motivo=ia-infinita`, y `/precios` le habla de eso en vez de mostrarle la lista de planes a secas. Es el mejor momento del producto para ofrecer el upgrade: el alumno ya dijo qué quería.

Para eso hubo que separar dos cosas que estaban pegadas en el componente `Fila`: **"se ve apagado" y "no se puede tocar" eran la misma prop**. Ahora `atenuado` es lo visual y `disabled` es lo funcional. Un modo de pago se ve apagado pero se toca; "Mis errores" sin errores guardados sigue deshabilitado de verdad, porque ahí todavía no hay nada que ofrecer.

Detalle que salió probándolo: para un alumno gratis SIN errores guardados, "Mis errores" mostraba *"Completa un examen para guardar errores"* estando bloqueado. Son dos cosas ciertas a la vez, pero la que le sirve es la del candado: lo primero que tiene que resolver es el plan. Si está bloqueado, gana ese mensaje.

**Los precios estaban escritos en TRES lugares, no en dos.** El roadmap decía dos (el servidor y `/pagar`); al ir a arreglarlo apareció el tercero, `/precios`, con el 100 hardcodeado en la tabla de planes. Coincidían de casualidad. Ahora salen de `src/lib/precios.ts` y las tres pantallas importan de ahí. **El que manda sigue siendo el servidor**: `/api/pagos` calcula el monto y nunca confía en lo que le manda el cliente; lo único que cambió es de dónde lee los números.

Se suma el trinquete `los precios salen de un solo lugar`, que exige que las tres pantallas importen de `@/lib/precios` y que no quede ningún número de precio escrito a mano. Se probó que puede fallar devolviendo el `100` a la tabla: lo cantó nombrando archivo y línea.

**Y dos pendientes de §8 que ya estaban hechos y figuraban abiertos.** Se verificaron en el código, no en el documento: el plan SÍ mira facultad desde `fd17d4c`, y Económicas tiene 10 exámenes, no uno. Es el costo de varias sesiones en paralelo: el roadmap envejece más rápido que el código.

### 2026-09-16 (quater) (seis figuras más, y se agotó lo que se puede hacer sin los PDF)

**41 enunciados quedan sin su dibujo** (venía de 47). Seis figuras nuevas:

| id | pregunta | verificación de la física |
|---|---|---|
| `f19-pendulos-choque-elastico` | 2-2014 parcial 2da P19 | v₁=√(2gL)=2√10; elástico v₂'=(4√10)/3; h=8/9 m (B) |
| `f10-tres-bloques-cable2` | 1-2016 2da P10 | a=F/12=0,25; el cable 2 solo arrastra a m₃: T=6·0,25=3/2 N (C) |
| `f18-plano-cuerda-equilibrio` | 2-2024 parcial 2da P18 | 100=200·senθ → θ=30°; L=4/tan30°=4√3≈7 m (B) |
| `f9-caida-y-lanzamiento-45` | 2-2017 1ra P9 | cazador y mono: tanθ=40/40 → θ=45° (D) |
| `f11-pared-de-la-muerte` | 3-2017 1ra P11 | v=√(gr/μ)=√400=20 (C) |
| `f20-dos-fuentes-nodo-comun` | 1-2024 final P20 | nodo a 12 V, I=4 A por el 5Ω, P=I²R=80 W (D) |

**La respuesta puede desambiguar el dibujo.** La del automovilista se había descartado antes por no saber si era un rizo o una pared cilíndrica. La respuesta lo resuelve: 20 m/s sale de v=√(gr/μ), que es la pared cilíndrica; un rizo daría √(gr)≈14,1 y ni usaría μ. Cuando el texto no alcanza, a veces la clave sí.

**Una verificación atajó un error real.** En la del muro, `verificarAngulo` explotó con *"debería medir 45° pero mide 135°"*: el ángulo se estaba midiendo contra la horizontal que apunta a la derecha, y el muro está a la IZQUIERDA de B. Es exactamente para lo que están esas verificaciones.

**Y otra vez, mirar el render encontró lo que los números no cantan.** En la de los péndulos, m₁ arrancaba en horizontal a la altura del pivote y la bola quedaba dibujada ENCIMA de la barra de soporte; se rehizo colgando los pivotes del techo con dos varillas cortas. En la de los tres bloques, `Y` y `ALTO` eran incoherentes (bloques de 20 px con centrado calculado para 40) y los cables corrían por el piso.

**Se agotó lo que se puede hacer sin los facsímiles.** De las 41 que quedan, ninguna se puede reconstruir del enunciado: la figura carga información que el texto no tiene. Qué hace falta para cada una, y las tres formas de desbloquearlo (mandar recortes, versionar recortes en `data/figuras-fuente/`, o correr Claude Code en la máquina donde están los PDF), quedó escrito en **[`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md)**, con la lista completa por examen y pregunta.

### 2026-09-16 (ter) (tres figuras más, y una que se descartó a propósito)

Sigue la tanda anterior. **47 enunciados quedan sin su dibujo** (venía de 50).

| id | pregunta | qué dibuja |
|---|---|---|
| `f12-energia-rampa-friccion` | 2-2014 única P12 | rampa lisa desde A (6 m), 9 m con μ=1/3, rampa lisa hasta B |
| `f6-secantes-potencia-punto` | 2-2008 parcial 2da P6 | dos secantes desde A externo, una por el centro |
| `f7-secantes-arcos-bde` | 1-2024 final P7 | secantes AB y AC, orden B-D-E-C, ∠BAC=80° y ∠BDE=x |

La física y la geometría se rehicieron antes de dibujar: 60−(1/3)(10)(9)=30 → h=3 m (A); potencia del punto 10(10+2r)=12·25 → r=10 (A); de (c−a)/2=80 con c=5a salen a=40, b=80, c=200, d=40 y ∠BDE=(b+c)/2=140° (A).

Las dos de circunferencia se construyen con los valores REALES, no aproximados: en la de potencia del punto el ángulo de la segunda secante se despeja de la cuadrática cuyas raíces son AB=12 y AC=25, y después se verifica que B y C caigan sobre la circunferencia; en la de arcos se recorre la circunferencia acumulando los cuatro arcos y se verifica que el ∠BAC dibujado dé 80° y el ∠BDE dé 140°.

**Una se descartó a propósito:** 1-2016 P11 y 2-2016 P11 (dos bloques sobre una mesa que sostienen entre los dos a un tercero colgado). La física cierra (a=9/2 y d=9 m), pero el texto dice que las dos cuerdas bajan verticales y en paralelo desde "el borde" de la mesa y no queda claro cómo están montadas las dos poleas. Dibujarla era suponer, y la regla 7 dice que eso es peor que no dibujar.

**Lo que volvió a confirmarse: construir sin error no alcanza.** Las tres pasaban todas las verificaciones numéricas y las tres tenían defectos que solo se ven mirando: en la de energía las cotas "6 m" y "h = ?" caían FUERA del lienzo (el ancho no daba); en la de potencia del punto las etiquetas de B y E se encimaban, y "10" con "12" también; en la de arcos el "80°" caía sobre la cuerda DE en vez de quedar bajo A, porque el radio de la etiqueta era casi la distancia de A a D. Se corrigieron mirando el render.

**Un bug propio del script de declaración**, que conviene no repetir: chequeaba `"figura:" in bloque` como subcadena para no pisar una declaración existente, y saltó en una pregunta cuyo ENUNCIADO dice *"(Ver figura: el bloque parte de A…)"*. No es una declaración, es prosa. Va anclado a inicio de línea (`^figura:`), como lo hace el parser.

### 2026-09-16 (bis) (las primeras 5 figuras faltantes, y por qué no se pueden hacer todas)

**Cinco preguntas dejaron de pedir un dibujo que no existía: 55 → 50.** Cuatro figuras nuevas en `definiciones.ts` (una sirve para dos exámenes con enunciado idéntico):

| id | preguntas | qué dibuja |
|---|---|---|
| `f24-tres-resistencias-paralelo` | 2-2010 final 2do curso P24 | fuente + 2Ω, 2Ω y 1Ω entre los mismos dos nodos |
| `f12-cuatro-resistencias-ab` | 1-2010 1ra P12 | A y B con dos ramas: R1+R2 y R3+R4 en serie |
| `f11/f19-atwood-separacion-h` | 2-2022 P11 y 1-2025 P19 | polea, m1=4 kg arriba, m2=1 kg abajo, cota h=24 m |
| `f17-plano-inclinado-rozamiento` | 2-2013 parcial 1ra P17 | rampa de catetos 10 y 5, bloque de 20 kg en A |

Antes de dibujar se rehizo la física de cada una para que el dibujo describa un problema cuya respuesta es la marcada: 1/R=2 → 0,5 Ω (A); (3+1)∥(2+4)=2,4 Ω (C); a=6 y se cruzan a h/2=12 → v=12 (A); 50−100μ=12,5 → μ=3/8 (C).

**El hallazgo importante: de las 55, solo 16 se pueden hacer sin el facsímil.** Se clasificaron por cuánta información trae el texto. Hay 26 donde el enunciado no dice nada y la figura carga todo el problema (*"En la figura 2, la altura h de la torre es igual a:"*), y 13 intermedias. Reconstruir esas 26 sería adivinar, y la regla 7 de §4.5 es explícita: una figura que "se ve más o menos como" la real es **peor que no tener figura**, porque enseña mal. **Para esas 39 hacen falta los PDF**, que no están en el repo.

**Ningún test construye las figuras.** Si una verificación de `verificarAngulo`/`verificarDistancia` explota, hoy se entera el alumno, no el CI. La sesión del 13-sep ya lo había topado y documentado: `definiciones.ts` importa `./motor` sin extensión y `node --test` corre ESM, donde la extensión es obligatoria; se decidió no torcer los imports de la app para acomodar un test. El hueco sigue abierto y queda anotado en §8.

**Verificar que construyen no alcanza: hay que mirarlas.** Se armó un render de las figuras a SVG suelto (replicando el dibujo de `FiguraExamen.tsx` sin React) y de ahí a PNG con Chromium. Las cuatro construían sin error y aun así dos estaban mal a la vista: en el circuito paralelo los rieles sobresalían del último resistor y quedaba un cable colgando, y en el Atwood la etiqueta "4 kg" caía pegada a la cota, donde se leía como si etiquetara la cota y no el bloque. Ninguna de las dos cosas la puede cantar una verificación numérica.

### 2026-09-16 (la regla 11 llega al banco: 244 guiones largos afuera)

La regla 11 de §4.5 (nada de guion largo cerca de matemática, se confunde con el signo menos) se había aplicado a las 74 lecciones el 16-ago y nunca al banco. Quedaban 253 guiones en 189 preguntas, y en 44 el guion estaba pegado a un número o una fórmula:

> "la suma de raíces es $-B/A$ — no hace falta resolver la cuadrática"

Ahora dice "$-B/A$: no hace falta resolver la cuadrática".

**Había dos estructuras y no se podían tratar igual.** 13 son INCISOS (guiones de a pares, pegados al texto que encierran) y pasan a paréntesis: *"reafirmando —no contradiciendo— las ideas"* queda *"reafirmando (no contradiciendo) las ideas"*. Los otros 227 son SEPARADORES (" — ") y pasan a dos puntos (143), punto y mayúscula (81) o coma (7, cuando lo que sigue es una conjunción). No se puede poner dos puntos siempre: 81 caen en una cláusula que YA tiene dos puntos y quedarían repetidos.

**El error propio de esta tanda, que vale más que el arreglo.** La primera corrida dio 77 dos puntos y 147 puntos, justo al revés de lo que se había medido antes de tocar nada. La causa: el script corre sobre el archivo entero y el `:` de `**explicacion:**` contaba como puntuación de la prosa, forzando punto donde correspondían dos puntos. Lo importante es que **el resultado habría sido gramatical igual**, así que ningún test lo habría cantado y el diff se habría leído bien. Solo se vio porque los números no cuadraban con la medición previa. Moraleja: medir ANTES de tocar, y si el después no cuadra, sospechar del script, no del dato.

Las notas del curador (`<!-- -->`) quedan afuera, con sus 148 guiones: van en rioplatense y no las ve el alumno.

**Quinto trinquete:** `el banco no usa guion largo en el texto del alumno`, que mira enunciado, opciones y explicación. Está en 0. Se probó que puede fallar inyectando un guion a mano.

**Verificación que sirve para la próxima:** como acá solo se tocaba puntuación, alcanzó con quitar TODA la puntuación y bajar a minúsculas a los 67 archivos y exigir que el texto quedara idéntico al de `main`. Si se hubiera movido una sola palabra, saltaba.

**Nota de proceso.** Esta tanda arrancó con el `main` del 14-sep y no se volvió a hacer `fetch` antes de escribir, que es justo lo que la regla 1 de CLAUDE.md pide desde el 15-sep. `main` había avanzado 43 commits. Salió barato de casualidad: la otra sesión no había tocado los guiones y solo un archivo se solapaba (`2016-1op-2-2016.md`, donde habían pasado una tabla a LaTeX en otra pregunta), así que el rebase entró limpio. La regla está para que la próxima vez no dependa de la suerte.

### 2026-09-15 (botón central en la barra · elegir examen pasa a ser navegación · la regla de leer-y-anotar)

**La barra inferior no llamaba a nada.** Los 5 tabs pesaban exactamente lo mismo y, peor, la acción que define el producto (armar un simulacro) estaba disfrazada de tab, al lado de Láminas. Ronald, probándola en el celular: *"los botones de abajo no son atractivos, por ejemplo un botón central clarísimo que llame a la acción"*. "Practicar" salió de la fila y pasó al medio como círculo elevado en terracota. No hubo que mover nada de producto: `/practicar` YA era la pantalla de armar simulacro (los 5 modos, examen real incluido) y es el mismo destino del CTA del dashboard, así que el tab se convirtió en el botón y siguen siendo 5 celdas.
- Dos cosas más que la dejaban apagada: el tab activo solo cambiaba de color (ahora el ícono va sobre una pastilla `accent-soft`, se siente un lugar y no un link) y los inactivos estaban a `opacity: 0.55` sobre navy, que los dejaba grises muertos (pasan a `--fg-muted`, el token que corresponde).
- El espaciador del final del documento subió de 58 a 74px: el círculo sobresale ~14px y tapaba la última tarjeta al scrollear hasta abajo.

**Elegir un examen dejó de ser un formulario y pasó a ser navegación.** Era un formulario de pasos apilados: elegías "Examen real" y aparecían los **139 exámenes de Ingeniería de corrido**, en una lista plana, con el botón de empezar al final de todo. Ronald: *"debo hacer un scroll horrible hacia abajo, no debería ser como una ramificación… si hago push en examen real, que pase a la lista de exámenes por año, luego al hacer push en el año que entre a todo lo que hay en ese año"*. Es el mismo pivote que las láminas hicieron el 5-ago (§4.5), ahora aplicado a la navegación. Quedó: tipo de práctica → gestión (20 filas en vez de 139) → examen de ese año (12 como mucho), y ahí el toque **ya arranca el simulacro**. Mixto, que no necesita más datos, arranca directo desde el primer nivel.
- **Cada nivel es su propia URL** (`?modo=…&anio=…`), así que el gesto de "atrás" del sistema y el botón de la pantalla hacen lo mismo, y se puede compartir el link de una gestión. Un `useState` habría sacado al alumno de `/practicar` entero al tocar atrás, que en PWA se siente roto.
- **Se cae el botón "Empezar simulacro"** y con él la clase de bug del 13-sep (`disabled` y `opacity` calculados dos veces): ya no existe un botón esperando que completes algo. En su lugar hay un overlay mientras se crea el examen, porque sin eso el toque no daba ninguna señal y se podían disparar dos simulacros.
- El separador quedaba huérfano: 120 de los 139 exámenes no traen `fecha_examen`, así que el detalle empezaba con "· 38 preguntas".
- Los títulos repetían tres veces lo que el alumno acababa de tocar ("Cuarto Parcial · Curso Propedéutico (Gestión 2-2006)" **dentro** de la pantalla de 2006 y del grupo Curso Propedéutico). Queda "Cuarto Parcial" y el resto baja al detalle. Ojo con el agrupado: el loader les pone `categoria: "admision"` a los de ingreso aunque el frontmatter no la traiga, así que separar por "no tiene categoría" deja el grupo vacío; hay que preguntar por `!== "parcial_curso"`.

**Tres cosas que salieron de probarlo en el celular, ya con el drill-down puesto:**
1. **Entrando por link directo, los otros modos dejaban de existir.** Ronald cayó en `?modo=mis_errores` y preguntó *"ahora perdí por completo esa sección donde podía simular, resolver aleatorio, ¿dónde está eso?"*. Tenía razón y la causa no era la pantalla: a `/practicar` se entra también por link directo (`/errores` tiene un "Repasar ahora" que apunta a `?modo=mis_errores`), así que se cae en un nivel interior **sin haber visto nunca la lista de modos**, y nada indicaba que arriba había más. Cada nivel interior ahora muestra su padre como miga de pan tocable ("NUEVO SIMULACRO", "EXAMEN REAL"). Lección general del drill-down: si a un nivel interior se puede entrar por URL, ese nivel tiene que decir de dónde cuelga.
2. **El cartel del formato oficial mentía.** Al reescribir la pantalla quedó como `modo !== "examen_real"`, así que "Mis errores" prometía *"seguirá el formato oficial de Ingeniería: 100 preguntas en 180 minutos"*, cuando ese modo arma el examen con lo que fallaste. Ahora cada modo tiene su aviso o no tiene ninguno.
3. **El área salía como `matematicas`**, el id crudo en minúscula y sin tilde. Es el mismo bug del 13-sep con "Economicas", y esta vez el helper ya existía: `etiquetaArea()` en `src/lib/axiom/areas.ts`. Van dos en la misma sesión (ver abajo): antes de escribir un formateo, grepear si ya está.

**Y la lección de la sesión: se duplicó trabajo que ya estaba hecho.** Esta sesión "descubrió" que las tarjetas de examen eran indistinguibles entre sí y escribió su propio parseo de títulos. Ya estaba resuelto en `main` ocho commits antes, con tests, en `src/lib/axiom/etiqueta-examen.ts` (commit `ed0c006`, del 14-sep). La bitácora se había leído al abrir la sesión, pero `main` avanzó 22 commits antes del primer edit. El código duplicado se borró y la pantalla usa el helper compartido (D3); lo único que quedó local es sacar el nombre del curso del título, y es a propósito: en `/practicar` el encabezado del grupo ya lo dice, en `/examenes` no hay tal encabezado y el título tiene que venir completo. De acá salieron **la regla nueva de §0** (traer `main` y releer justo antes de escribir; anotar en el mismo commit; subir a `main`) y la fila del 15-sep en §7.

**De paso se documentó la app Android**, que existía en `android/` desde el 14-sep y no estaba en ninguna parte de esta bitácora (ver §5.1). Incluye por qué la barra del navegador que se ve arriba en el celular no es un bug de CSS.

**La barra de direcciones en la app instalada: era el manifest, no el navegador.** Ronald reportó tres veces una barra con la URL y un botón de compartir arriba de AXIOM. Las dos primeras respuestas fueron que eso era chrome del navegador y no se podía tocar con CSS, diagnosticando por el ícono que se veía en su barra de estado ("es el WebView de Messenger"). **Estaba mal, y la pregunta que lo resolvió no se hizo hasta la tercera vez:** *¿cómo abrís la app?* La respuesta — *"es la que instalé desde la página, la tengo desde versiones anteriores"* — descartó toda la teoría: era la PWA instalada, y una PWA instalada no muestra barra. El problema estaba en `src/app/manifest.ts`:
- `display_override: ["standalone", "minimal-ui"]`, con un comentario que decía que servía para "forzar vista app". **`minimal-ui` es el modo CON barra de direcciones**: le estábamos dando permiso explícito al navegador para mostrar justo lo que queríamos evitar.
- Y `scope` no estaba declarado, así que el alcance se deducía de `start_url: "/dashboard"` — si el navegador lo lee como `/dashboard`, todo `/aprende`, `/practicar` y `/laminas` queda fuera de la app y se abre con barra.

Las dos cosas corregidas (ver §5). **Ojo con el final:** la WebAPK congela el manifest del día que se instaló, así que arreglar el manifest no arregla las instalaciones viejas. Hay que desinstalar el ícono y reinstalar. Es lo primero que hay que preguntar ante un reporte así.

**"12 ÷ 5 = 2 r 2": la lección hablaba en abreviatura de programador.** Ronald, leyendo la escena de divisores de `mcd-mcm`: *"¿qué significa ese 2r2? No entiendo, no uses simbología que solo para ti tenga sentido"*. La `r` era "resto", y la misma lección ya lo escribía bien dos párrafos arriba ("12 ÷ 5 = 2, resto 2"): la abreviatura estaba solo en el widget interactivo. Queda **"12 ÷ 5 = 2 y sobran 2"**, que además es literal de lo que muestra el dibujo (dos bolitas que no entran en ningún grupo). Se barrió el resto de `/aprende` y `/laminas` buscando abreviaturas del mismo tipo (`mod`, `gcd`, `lcm`, `iff`, `c.q.d`) y no hay más: era un caso aislado.
- De paso, ese texto estaba **escrito a mano como "2 r 2" aunque el divisor fuera una variable**. Daba la casualidad de que el único divisor que no entra en el recorrido es el 5, así que la cuenta era correcta; pero agregar un 7 o un 8 al widget habría mostrado una cuenta falsa sin que nadie se enterara. Ahora se calcula.
- Regla general para el contenido: si una abreviatura hay que explicarla, no es una abreviatura, es un problema. El alumno está viendo el tema por primera vez.

**El `·` significaba dos cosas en la misma línea.** Ronald, leyendo la escena de primos: *"hay partes como esta que creí que se entienden pero ahorita que lo revisé me quedaron muchas lagunas, me da miedo que haya muchas partes donde exista el mismo problema"*. Tenía razón: en `4 = 2·2 (tiene divisor 2) · 6 = 2·3 · 9 = 3·3`, el mismo `·` multiplicaba **y** separaba ejemplos, así que no se veía dónde terminaba una cuenta y empezaba la otra. Es la regla 11 de §4.5 (nada de guiones largos cerca de matemática) aplicada a otro carácter: **un símbolo de puntuación pegado a números se lee como operador**. Corregido poniendo un ejemplo por renglón, con `×` en lugar de `·`, en `mcd-mcm`, `teoria-exponentes` (3 bloques) y `ecuaciones-segundo-grado`.
- En la misma pantalla salieron otras dos lagunas: `>1` escrito así en prosa (queda "mayor que 1") y el *"El 0 tampoco (tiene infinitos divisores, lo divide cualquier número > 0)"*, que afirmaba sin explicar. Ahora dice por qué, con ejemplos: `0 = 5 × 0`, `0 = 7 × 0`.
- **Queda como encargo abierto en §8** la auditoría pedagógica de las 167 piezas, escrita ahí de forma autocontenida porque Ronald la va a hacer con otra IA. La conclusión que la motiva está abajo.
- **Lo que el barrido automático sí y no puede encontrar.** Se barrieron los 167 archivos de contenido (103 lecciones + 64 láminas) con un script: 0 casos de `*`, `mod`, `gcd`, `lcm`, `iff`; los `<` y `>` crudos que quedan (en `operaciones-fundamentales`) son legítimos, ahí el símbolo **es** el tema. El separador ambiguo tenía señal limpia (`&nbsp;·&nbsp;`) y salieron los 4 bloques ya corregidos. **Pero el grep solo encuentra símbolos, no lagunas de explicación**: lo del 0 no lo habría detectado ningún patrón, porque el problema no era un carácter sino una afirmación sin fundamentar. Auditar eso pide leer las 167 piezas con ojos de alguien que ve el tema por primera vez.

**De paso quedó `AvisoNavegadorApp.tsx`**, que sí resuelve el otro caso (el real, aunque no era el de Ronald): Messenger, Instagram, Facebook y TikTok abren los links en su propio WebView, y **desde ahí la PWA no se puede instalar**. Como el link se va a repartir por esas apps, cualquier alumno que entre así se quedaría sin enterarse de que existe una app. El componente lo detecta, nombra la app y explica el gesto para salir (ver §5.1). Verificado con los user agents reales de Messenger y de Chrome.

**La auditoría pedagógica arrancó de verdad, y lo que encontró no eran solo lagunas.** Ronald: *"hacelo vos"*, y después *"pero también terminá de una vez"*. Se despacharon agentes en paralelo, uno por grupo chico de lecciones, con el texto del encargo de §8 como instrucción. El informe vive en [`docs/auditoria-pedagogica.md`](../docs/auditoria-pedagogica.md). **La sorpresa fue el segundo montón:** además de las lagunas de explicación que se buscaban, aparecieron ~50 **errores de contenido** repartidos en 25 de las 103 lecciones — aproximadamente uno cada 300 líneas. Los peores:
- `energia-celular`: la tabla de ATP **no sumaba**. Listaba glicólisis (8) y Krebs (24) y anunciaba "≈36": faltaba la fila entera del **paso de transición** (2 NADH = 6 ATP). Ahora suma 38 y el paso está.
- `triangulos`: la figura de Pitágoras estaba dibujada a ojo y **el cuadrado de la hipotenusa no estaba**. Rehecha con coordenadas calculadas (regla 7 de §4.5: nunca "a ojo"), con los tres cuadrados reales.
- `propiedades-coligativas`: las dos pizarras gemelas **se contradecían entre sí**. La de congelación aplicaba el factor de van't Hoff (−3.72 = 1.86 × 1 × 2) y la de ebullición no (decía 100.52 en vez de 101.04). Corregida, y las dos ahora dicen "1 m NaCl, i = 2" en vez del críptico "1 m NaCl·i".
- El simulador de esa misma lección rotulaba `aprox M≈m`, que no le dice nada a nadie, **y dos escenas después la lección marca como error justamente usar m donde va M**. Ahora dice por qué la aproximación vale (solución diluida, solvente agua, 1 kg ≈ 1 L) y cuándo deja de valer.

**Por qué las lecciones acumularon esto y el banco no: el banco tiene tests desde el 13-sep.** De ahí salió `src/lib/contenido-lecciones.test.ts`, seis trinquetes sobre las 167 piezas (ver el commit `4252251` para el detalle de cada uno). Encontró dos bugs en la primera corrida. **Y también encontró su propio límite:** no cazó el "descontá" de `estequiometria`, porque la lista de verbos de voseo se escribió a mano y ese no estaba.

**De ahí salió la lección más reutilizable de la sesión: cómo NO escribir un chequeo de voseo.** Tres intentos:
1. **Enumerar las formas conjugadas a mano** ("podés", "mirá", "tenés"…). Es lo que había. Cubre exactamente lo que alguien se acordó de escribir, y nada más: dejó pasar "descontá".
2. **Buscar la terminación** `-ás` / `-és` / `-ís`. Peor: 35 marcas, 25 de ellas correctas. **"Aprobarás", "verás", "tendrás" y "comerás" son futuro de tú**, que es justo el tuteo que queremos; y "estrés", "cafés", "ciprés" y "comités" ni siquiera son verbos.
3. **Listar INFINITIVOS y generar sus formas voseantes.** De "mirar" salen "mirás" y "mirá", y el futuro de tú ("mirarás") no cae porque lleva el infinitivo entero adelante. Sumar un verbo nuevo es agregar una palabra. Es lo que quedó.

**Cazó 20 casos que la versión vieja no veía**, todos en texto del alumno, y los dos peores mezclaban los dos tratos **en la misma oración**: `odontologia-anatomia-dental` decía *"Cortá un factor, cortas la enfermedad"*, y la mnemotecnia de `sistema-urinario` decía *"Filtrás MUCHO, Reabsorbes CASI TODO, Secretas los desechos"* — tres verbos, dos tratos. Un alumno de Cochabamba lee eso y no sabe si le hablan a él. Los 20 corregidos.

**Lo que falta del encargo está en §8.** Quedan ~78 lecciones y las 64 láminas sin auditar, y el tope `TOPE_MISMO_BOTON = 23` (lecciones donde las 5 o 6 respuestas caen siempre en el mismo botón, o sea que se aprueban sin leer) espera que alguien baraje los índices.

### 2026-09-14 (la biblioteca regalaba las soluciones · el banco pasa a tuteo · cuatro auditorías quedan como test)

Sesión de pulido antes de tocar nada de cobro. Se arrancó auditando el banco con los regex del parser real y terminó saliendo un agujero de paywall más grande que el que se había cerrado el 13-sep.

**La biblioteca de exámenes regalaba las 3.579 soluciones.** `/api/axiom/examenes/[id]` no chequeaba absolutamente nada: sin cookie, sin sesión, sin plan, un `curl` devolvía cualquiera de los 140 exámenes con su respuesta correcta y su explicación paso a paso. El producto entero, gratis, sin cuenta.

Y el repo ya se contradecía solo: `plan.ts` define `puedeVerResolucionBiblioteca()` con el comentario *"Paso a paso al NAVEGAR la biblioteca (solo pago)"*, mientras el route handler decía *"son gratis para cualquier usuario, no hay gating acá"*. Esa función, más `puedeProgramaIA`, `puedeSimulacroIA` y `puedePracticaErrores`, no las llamaba nadie: código muerto desde que se escribió.

Ahora la ruta resuelve el plan en el servidor y saca `respuesta_correcta` y `explicacion` antes de responder si no es pago (decisión D8). El payload de un anónimo pasó de 24.758 a 12.912 bytes. En pantalla se dice en vez de dejar un botón muerto: las dos vistas de biblioteca explican por qué falta la solución y linkean a `/precios?motivo=resolucion`.

**El guard de lecciones NO estaba roto.** Ronald reportó que entraba a lecciones siendo free. Se probó con un usuario `plan: gratis` real, por URL directa y por navegación desde el índice (que es una petición RSC, camino distinto): las premium redirigen bien. Lo que estaba viendo era la Unidad 01, gratis por decisión D2. Los números exactos, por si hay que revisarlos: Económicas 12 de 49 lecciones abiertas, Ingeniería 9 de 57, láminas 0 de 64. Se verificó además que no hay fuga por colisión de slugs entre facultades.

**El banco pasa a tuteo: 3.144 reemplazos en 129 archivos.** La normalización del 13-sep barrió `src/` y dejó `data/` afuera, así que el 62,8% de las preguntas (2.249 de 3.579) le hablaban de vos al alumno. Casi toda explicación abría con *"Recordá"*, 1.692 veces.

No se hizo con una regla genérica. Se censó primero el banco entero (211 formas distintas con tilde final) y se armó una tabla explícita de 143 entradas, una por forma real, porque los verbos que diptongan no salen por regla: `recordá` no es "recorda", es **recuerda**; `contá` → cuenta, `resolvé` → resuelve, `descomponé` → descompón, `hacé` → haz. Y algunas ganan tilde donde el voseo no la lleva: `evaluá` → evalúa, `aislá` → aísla.

Tres cosas que conviene no reaprender:
- **`grep -P` miente con tildes.** Buscando el contexto de `hallá` dio cero resultados con 96 ocurrencias en el banco: `\b` después de una tilde no es confiable, y encima se le pidió contexto que no existe cuando la palabra abre el renglón. Censo y verificación van en Python con lookarounds sobre `[^\W\d_]` y `re.U`.
- **El censo por tilde final tiene un punto ciego**: los imperativos reflexivos con pronombre pegado no la llevan (`quedate` → quédate). Hubo que barrer `-ate/-ete/-ite` aparte.
- **La verificación que vale es comparar palabra por palabra contra `HEAD`** y exigir que toda diferencia sea un par de la tabla y que no cambie la cantidad de palabras. Eso habría atrapado el "presentes → presientes" del 13-sep.

Los bloques `<!-- -->` y el frontmatter se protegen antes de tocar nada: van en rioplatense por CLAUDE.md. Sobreviven 3 "vos" a propósito, que son diálogo citado del enunciado original de 2017 P2 entre dos personajes.

**Cuatro auditorías quedan como test.** Las cuatro salieron de encontrar el problema a mano; quedan como trinquete para no tener que volver a encontrarlo:

| chequeo | estado |
|---|---|
| la explicación no se contradice con la respuesta marcada | 0 |
| el banco le habla al alumno de tú, no de vos | 0 |
| una pregunta repetida no cambia de respuesta entre exámenes | 0 |
| ningún enunciado promete una figura que no está | 55, tope que solo baja |

El de duplicados se validó solo: al escribirlo falló, y lo único que agarró en los 140 exámenes fue una contradicción real. Detalle que importó: compara el **texto** de la opción marcada, no la letra. Sin eso daba 47 falsos positivos, porque el orden de las opciones cambia entre gestiones y ahí dos letras distintas son la misma respuesta.

**Mendel: la misma pregunta respondía distinto en dos exámenes.** La proporción 9:3:3:1 en F2 era "segunda ley" en `2009-parcial1-1 P29` y "tercera" en `2009-parcial1-2 P29`, con opciones idénticas. El desempate no fue una opinión: la propia pregunta de `parcial1-2` tiene `tema: segunda-ley-mendel-dihibrido` y marcaba C (tercera), o sea que se contradecía sola, y las otras dos copias de la misma gestión responden segunda. Se alineó a B.

Lo de fondo es que **las dos numeraciones conviven en el banco porque conviven en los exámenes reales**: el enunciado oficial de `2007-parcial2-2 P25` dice textual *"3ra Ley de Mendel (herencia independiente)"* y su P28 pone *"1ra Ley = uniformidad"*. No se puede fijar una convención global sin contradecir exámenes reales, así que las tres copias ahora cierran avisando de la doble numeración y de cómo darse cuenta mirando las opciones.

**Ácido fosfórico: el error del 12-sep otra vez.** Tres preguntas (`2010-2op-1 P16`, `1-2015 P16`, `2-2015 P16`) calculaban 20 g al 70% y 80 g al 20%, y cerraban marcando la opción que dice "80 y 20", tapando la diferencia con un paréntesis del tipo *"el par 20/80 se corresponde con la opción que lista 80 y 20"*. Las letras quedaron como estaban (tres gestiones distintas ofrecen ese par y lo dan por bueno, así que la clave toma el par sin orden); lo que se reescribió es la explicación, que ahora nombra el orden y le enseña al alumno a chequear a qué solución corresponde cada número. No se pudo contrastar contra el facsímil porque los PDF no están en el repo.

**98 enunciados dejan de prometer una figura que no existe: 130 → 55.** El trinquete viejo contaba las que DECLARAN `figura:` y estaba en 0; estas ni siquiera declaran el campo, así que el alumno leía *"en la figura adjunta…"* y abajo no aparecía nada.

Ninguno de los 98 cambia el problema: todos ya traían la configuración escrita en el propio texto, casi siempre en un paréntesis que el transcriptor puso en lugar del dibujo. 52 se reescribieron a mano cuando la mención sostenía la gramática, y 46 con una pasada mecánica sobre las menciones puramente decorativas (`(ver figura)`, `como se muestra en la figura`, y la etiqueta `(Figura: ` delante de una descripción que ya estaba). Un caso aparte: `2005-1op-1 P18` no traía descripción, pero `2017-1op-1 P9` es el mismo problema (mismos 27 m, mismo μ=1/5, ambos dan 10 m) y sí la traía; se le copió.

**No se les agregó `figura:` en masa a propósito.** Serviría para que salga el cartel de "figura en preparación", pero decidir cuáles lo necesitan es curaduría, no algo que pueda resolver un regex: la heurística que separaba "trae descripción" de "no trae" falló en varias (la del pentágono describe todo en palabras y cayó del lado equivocado), y ponerle el cartel a una pregunta que se resuelve igual es mentir al revés. El tope del test deja el trabajo medido y frena que crezca.

**Dos cosas detectadas y no arregladas** (están en §8): el plan no mira facultad, así que un premium de Económicas abre las soluciones de Ingeniería; y la regla 11 (nada de guiones largos cerca de matemática) nunca se aplicó al banco, quedan 189 preguntas con "—" y en 38 está pegado a un número o fórmula.

### 2026-09-13 (ter) (auditoría en celular · cinco arreglos del recorrido del alumno · la app pasa a tuteo)

**Auditoría en pantalla de celular (375px), pantalla por pantalla.** Era un pendiente de §8 que nunca se había hecho en serio. Lo peor que apareció:

- **La matemática se cortaba.** En el simulador, la fórmula de la Pregunta 1 del examen 2023 de Económicas quedaba cortada por el borde de la tarjeta: el alumno no podía leer la consigna completa. `MathText` ya traía `overflow-x: auto`, pero **nunca se activaba**: el contenedor flex crecía con su contenido en vez de encogerse, porque el default de un ítem flex es `min-width: auto`. Se agregó `min-w-0` en los 5 lugares donde un `flex-1` envuelve `MathText`.
- **Las fórmulas en línea se salían de la pantalla.** Consecuencia del `whiteSpace: nowrap` que `MathText` usa a propósito (para que el navegador no corte una fórmula a la mitad): una expresión más ancha que el celular no se podía partir y se derramaba. En la explicación paso a paso de esa misma pregunta había expresiones de 541px en una pantalla de 375. Dos detalles que costaron: por spec, si un eje de `overflow` deja de ser `visible` **el otro pasa a `auto` solo**, así que cada fracción se ganaba una barra de scroll VERTICAL al lado; y los `vlist` internos de KaTeX sobresalen ~6px de la caja y se recortaban al volverse contenedor de scroll (se arregla con padding + margen negativo que se cancelan, el truco clásico de KaTeX).
- El avatar de `/cuenta` se aplastaba a elipse (le faltaba `flexShrink: 0`), y varias pantallas le mostraban al alumno **"Economicas" sin tilde** porque imprimían el id crudo con `text-transform: capitalize`. Se agregó `nombreFacultad()` al lado de `iconoFacultad()`.

**Cinco cosas que salieron de esa auditoría y se arreglaron después:**

1. **La biblioteca mostraba las 4 carreras juntas.** `/api/axiom/examenes` devolvía el banco entero: un alumno de Económicas veía 140 exámenes, 139 de Ingeniería, y el suyo se perdía entre medio. Ahora filtra por la facultad de la sesión, **en el servidor** — para no mandarle 140 exámenes al celular y mostrar uno.
2. **`/progreso` le mostraba a todos los datos de `demo-user`.** Pedía `/api/axiom/progreso/estadisticas?usuario_id=demo-user`, con el id escrito a mano: nadie veía su propio progreso. Encima el desglose estaba clavado a `matematicas/economicas/verbal`, las áreas de Económicas, así que a alguien de Ingeniería no le correspondía ninguna. Se borró ese endpoint y la pantalla se rehizo sobre `/api/historial`, que resuelve el usuario por sesión. De paso recibió el rediseño (venía de un prototipo, sin AppHeader ni barra inferior): ahora tiene la evolución en una curva SVG hecha a mano — son pocos puntos y no justifica meter una librería de gráficos en el bundle que baja el alumno.
3. **"Empezar simulacro" no hacía nada.** La condición de `disabled` y la de `opacity` no eran la misma: eligiendo "Examen real" sin elegir CUÁL examen, el botón se veía habilitado, se podía apretar y no pasaba nada.
4. **La misma materia era debilidad y fortaleza a la vez.** En los resultados salía "Reforzar: Matemáticas 0%" y al lado "Tu fortaleza: Matemáticas 0%", porque el examen de Económicas tiene una sola área y peor == mejor.
5. **La paleta violeta del diseño anterior.** Las lecciones y las tarjetas de área seguían en violeta y celeste mientras el resto del producto ya era terracota: parecían dos apps distintas. `LIENZO.accent` (519 usos) pasó al token del rediseño. Se dejan como **hex literales y no `var(--token)`** porque se usan dentro de atributos SVG y props de framer-motion, donde una variable CSS no siempre interpola — si cambian los tokens de `globals.css`, hay que tocar `lienzo.tsx` también.

**La app pasa de voseo a tuteo (160 archivos).** Estaba escrita mitad y mitad: *"Practica con exámenes reales"* y *"Elige tu plan"* conviviendo con *"Tenés 4 simulacros"* y *"Pasate a Premium"*. El voseo no es como se habla en Cochabamba. Tres cosas que conviene no reaprender:
- **Los límites de palabra de `grep` no sirven acá.** Con `\b`, "aplicá" matchea DENTRO de "Aplicándolo" (la tilde no cuenta como letra en locale C) y el reemplazo corrompe la palabra. Hay que usar `(?<![\p{L}\p{N}])` en JS.
- **Los verbos que diptongan no salen por regla.** "buscás → buscas" es mecánico, pero "empezás → empiezas", "volvé → vuelve" y "pedís → pides" cambian la raíz. Tabla explícita.
- **Las terminaciones `-é` y `-í` quedan fuera de cualquier automatismo:** "comé" es imperativo voseo pero "compré" es primera persona del pretérito, y "partí" puede ser las dos cosas.
- Los **comentarios del código no se tocaron**: el repo sigue en rioplatense (ver §0 y CLAUDE.md), eso es para quien lee el código.

**Componentes muertos detectados, NO borrados** (esperan decisión): `Header.tsx`, `CTANew`, `HeroSectionNew`, `StatsNew`, `RankingSectionNew`, `RankingCardNew`, `QuickActionsNew`, `PricingSectionAxiom` — cero imports en todo el repo, restos de la landing anterior al rediseño. Ahí vive casi todo el violeta que queda, y por eso ensucia cualquier búsqueda futura de "¿está consistente la paleta?".

### 2026-09-13 (bis) (el paywall no existía: guard de servidor para lecciones y láminas)

**El contenido pago se abría escribiendo la URL.** Las ~110 lecciones de `/aprende` y las 64 láminas de `/laminas` son componentes cliente sin ningún chequeo de plan: el candado se veía en el índice, pero `/laminas/teorema-del-resto/teorema-del-resto` tipeado a mano se abría entero. Un link compartido en un grupo de WhatsApp y el paywall dejaba de existir. Los simulacros y la IA sí estaban protegidos en el servidor; las lecciones y láminas, no.

**Cómo quedó.** Un `layout.tsx` de servidor en cada una llama a `src/lib/acceso-contenido.ts`, que mira el plan (que ya se deriva de las suscripciones vigentes) y redirige antes de renderizar nada: sin sesión a `/login`, sin facultad a `/onboarding`, sin suscripción a `/precios?motivo=...` — con motivo, para que la pantalla explique *por qué* lo mandaron ahí en vez de aparecer de la nada con la lista de planes. Los índices `/aprende` y `/laminas` quedan abiertos a propósito: son el catálogo, y es donde se ve qué hay adentro.

**El plan gratis no cambió:** sigue teniendo la Unidad 01 de cada bloque (decisión D2), que son 15 lecciones. Para poder decidir eso en el servidor sin cargar la pantalla entera, el catálogo salió de `aprende/page.tsx` (cliente) a `src/lib/axiom/catalogo-aprende.ts`, que exporta además `SLUGS_GRATIS`.

**Por qué hay un `middleware.ts` y qué NO hace.** Un layout de App Router no recibe el pathname por ningún lado, y el guard necesita saber qué lección se está abriendo. El middleware lo único que hace es pasarlo en una cabecera. La verificación **no** puede ir ahí: el middleware corre en el Edge Runtime y `data-store.ts` importa `fs/promises`.

**Alcance honesto** (anotado también en el propio archivo): esto frena el acceso por URL, que es el problema real. No esconde el contenido de alguien que se ponga a leer el bundle de JavaScript — las lecciones son componentes estáticos y viajan compiladas al cliente. Esconderlas de verdad pide moverlas a datos que se pidan al servidor, y eso es refactorizar las 110 páginas.

**Bug de dev que salió de acá.** El cache en memoria de `data-store.ts` (el fallback cuando no hay Supabase) era una variable de módulo. En `next dev`, los route handlers y los componentes de servidor se cargan en bundles distintos, **cada uno con su propia instancia del módulo**: el toggle de plan escribía en una copia y el guard leía otra, así que en local un usuario premium se veía bloqueado y parecía un bug del guard. Ahora el cache cuelga de `globalThis`. En producción hay Supabase y nada de esto corre, pero el dev tiene que comportarse igual que producción o las pruebas locales mienten.

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
