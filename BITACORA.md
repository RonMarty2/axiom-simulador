# 📒 Bitácora · AXIOM Simulador UMSS

> **Documento vivo.** Si sos una IA o un dev nuevo leyendo esto: acá está TODO lo que necesitás para entender el proyecto, sus decisiones y su historia. Leé las secciones en orden — están pensadas para que en 10 minutos sepas dónde estás parado.

**Última actualización:** 2026-10-05 (ter) (flujo de trabajo: sección "Cómo trabajar" y verificador ampliado)
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
  - **Actualización 4-oct-2026:** ya NO fuerzan la navegación de celular. Qué nav se ve lo decide el ancho (modo compacto vs. amplio, ver §11 del 4-oct); en una tablet instalada tiene que verse el nav amplio. Lo único que queda forzado por display-mode es el comportamiento táctil.

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
| 2026-09-27 | Los agentes no llegaban de la PC a la laptop | Ronald lo reportó: "no viajan, por un punto o algo así" | Synology Drive no suele sincronizar carpetas que empiezan con punto, y `.claude/` es una. Lo que tiene que viajar por Synology va en una carpeta visible; si una herramienta exige un nombre con punto, se copia ahí de forma automática, enganchada a algo que el usuario ya hace (`npm install`, `npm run dev`), no a un paso nuevo que tenga que acordarse |
| 2026-09-18 | Un `git checkout -- <archivo>` para deshacer una inyección de prueba se llevó puestas diez preguntas recién escritas y no commiteadas | Volver a correr el script que las había generado | `git checkout --` descarta **todo** lo no commiteado de ese archivo, no solo el último cambio. Para deshacer una inyección hay que revertir la cadena exacta que se inyectó. Lo que salvó el trabajo fue que cada tanda se escribe como un script con `assert` y no como edición manual: el efecto colateral no buscado es que **el trabajo se puede reproducir** |
| 2026-09-18 | Diez exámenes de Económicas declaraban sus secciones de Lenguaje e Historia como `no-encontrado-en-los-pdf`, y la de Lenguaje estaba en el PDF de Lenguaje | Abrir el archivo y mirar las páginas una por una | **Afirmar una ausencia obliga a buscar en todos los archivos, y eso se escribió para diez exámenes de una sola vez.** El descarte puntual que estaba anotado (la página 30 no es de ese examen) estaba bien hecho; lo que falló fue el inventario, que se armó con OCR sobre PDF sin capa de texto y no llegó a mostrar las páginas buenas. Un inventario incompleto no autoriza a escribir "no existe": autoriza a escribir "no lo encontré todavía" |
| 2026-09-18 | Dos errores de conteo en el mismo día: *"tres de cuatro respuestas mal"* cuando eran dos, y *"58 auditadas de 88"* cuando eran 50 (se sumaban 8 de un muestreo anterior que no forma parte de la lista) | Recalcular con el script en vez de escribir el número de memoria | Los conteos que sostienen una decisión (cuánto falta, qué tan malo es el banco) **se calculan, no se recuerdan**. Los dos números estaban inflados y los dos apuntaban en la misma dirección: hacer parecer el problema más grande y el avance mayor. Hay un script que cruza las listas; una corrida cuesta menos que corregir el changelog dos veces |
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
  - **Actualización 4-oct (quater):** Ronald mandó los QR y quedaron cargados (BNB, Binance Pay, RedotPay; ver §11). Tigo y transferencia se sacaron. **Falta:** (1) un QR de BNB sin monto y sin vencimiento (el que mandó es de Bs. 100 y vence el 5-oct), (2) correr `supabase/migration-006-pagos-metodos.sql` en Supabase, (3) probar un pago de punta a punta. **Actualización 5-oct:** (1) resuelto a medias, hay QR de BNB de Bs. 100 válido hasta 2028 (falta uno de Bs. 50 para el cambio de facultad); (2) corrida el 4-oct; (3) sigue sin hacerse.
  - ~~Bloqueado esperando a Ronald~~ (decisión del 2026-09-13: se deja para después). Hacen falta tres datos que solo él tiene: (1) número real de Tigo Money, (2) la imagen del QR bancario, (3) cuenta bancaria — banco, número y titular.
  - Cuando lleguen: no hardcodearlos. Van a config/DB (tabla de configuración o `admin/config`, que ya existe) para poder cambiarlos sin deploy, y el QR a Supabase Storage. Están en `src/app/pagar/page.tsx`, líneas ~176-200.
  - Todo lo demás del circuito de cobro YA funciona: el alumno declara el pago, queda pendiente, el admin lo aprueba en `/admin/pagos` y `agregarOExtenderSuscripcion` le da el mes.
- [x] ~~El contenido pago no está protegido.~~ Resuelto: guard de servidor en `aprende/layout.tsx` y `laminas/layout.tsx`, con la lógica en `src/lib/acceso-contenido.ts` (ver §11). Frena el acceso por URL, que es el problema real; **no** esconde el contenido de quien lea el bundle de JavaScript — para eso habría que mover las lecciones a datos pedidos al servidor.
- [x] ~~La biblioteca de exámenes regalaba las soluciones.~~ Resuelto el 14-sep: `/api/axiom/examenes/[id]` no miraba la sesión, así que los 140 exámenes con respuesta y paso a paso se bajaban con un `curl` sin login. Ahora resuelve el plan en el servidor y filtra (ver §11 y D8).
- [x] ~~El plan no mira facultad.~~ Ya estaba resuelto y figuraba abierto: `puedeVerResolucionBiblioteca(usuario, facultadDelExamen)` recibe la facultad del examen desde `fd17d4c`. Verificado en el código el 16-sep.
- [x] ~~**El alumno no sube comprobante.**~~ Resuelto el 4-oct (nonies). `/pagar` solo pide un número de referencia tipeado a mano, así que el admin aprueba a ciegas. Falta subir la foto del comprobante (Supabase Storage) y verla en `/admin/pagos`.
- [x] ~~No hay Términos y Condiciones ni Política de Privacidad.~~ Escritos el 4-oct (ter), ver §11 y `docs/legal-revision.md`. **Actualización 5-oct:** `titular` y `whatsapp` ya están cargados en `src/lib/legal.ts`. **Falta que un abogado los lea.**
- [~] **Botón para borrar la cuenta** hecho el 4-oct (decies); **falta salir del ranking** sin borrar (`/cuenta`). Los textos legales lo ofrecen "a pedido"; hoy sería a mano en Supabase.
- [x] ~~Los precios están escritos dos veces.~~ Eran **tres** (servidor, `/pagar` y `/precios`). Resuelto el 16-sep: salen de `src/lib/precios.ts`, con trinquete que frena si vuelven a escribirse a mano (ver §11).
- [~] **Aviso a Ronald cuando entra un pago:** el código está hecho (5-oct bis, `docs/avisos-telegram.md`); **falta que Ronald cree el bot y cargue `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` en Vercel.** Hasta entonces los avisos no llegan.
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
- [ ] **Probar la tablet en un aparato físico** (acostada y parada, con la app instalada). Lo de la entrada del 4-oct se verificó solo con viewports emulados.
- [x] ~~Examen en tablet acostada: panel lateral con el mapa de la hoja~~ Hecho el 4-oct (bis), ver §11. Sigue sin probarse en tablet física.
- [ ] **Compilar y firmar la app de Android (TWA)** y reemplazar el ícono provisional (ver §5.1). Mientras tanto la web instalada desde Chrome es la vía directa.
- [x] Láminas de Repaso: las 64 de Aritmética-Álgebra Ingeniería en producción, 23 módulos (ver §11).
- [ ] Láminas para las otras materias de Ingeniería (Geometría, Física, Química) y para las demás facultades.
- [ ] Animar las lecciones que aún son solo cards (revisar `grep -c "motion\." | sort` para identificarlas).
- [x] Sistema real de auth + DB persistente: Supabase (Postgres), con cron diario para que no se pause por inactividad.
- [x] Tests automatizados: 20 con `node --test`, el de banco corre sobre los 139 exámenes reales con el parser real. Los 4 que se sumaron el 14-sep son trinquetes de curaduría (ver §11).
- [x] CI: GitHub Actions con tipos, lint, tests y build en cada push.
- [x] Todas las preguntas con `figura:` tienen su dibujo — el trinquete del test está en 0 (ver §11).
- [x] ~~El banco le hablaba de vos al alumno.~~ Pasado a tuteo el 14-sep, 3.144 reemplazos en 129 archivos, con trinquete en 0 para que no vuelva a entrar (ver §11).
- [ ] **1 enunciado nombra una figura que no existe, y es el único que el facsímil NO resuelve.** La `2010-parcial1-2` P7 tiene la figura en el PDF, pero la marca del ángulo 3 está suelta, sin apoyarse en ninguna intersección, ni a 800 dpi (queda como E; ver `docs/figuras-pendientes.md`). **Ese 1 ya no baja leyendo PDF**: bajarlo es decidir qué hacer con una pregunta que el examen original dejó ambigua. Arrancó en 130 el 14-sep: 106 se resolvieron sin abrir un PDF (98 reescribiendo el enunciado, que ya traía la configuración, y 14 dibujando la figura cuando los datos la determinaban), el 16-sep se dibujaron 12 más leyendo los facsímiles en local (los cinco PDF de la gestión 1-2016, que quedó terminada) y el 17-sep otras 29 (los cinco de 2017, las ocho del prefacultativo 2024, seis de 2018/2019/2023, cuatro sueltas de geometría de 2008 a 2015 y las cuatro de física, que dejaron **dos respuestas corregidas**). Qué hace falta para cada una, y las tres formas de desbloquearlo, están en [`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md). El test `ningún enunciado nuevo promete una figura que no está` tiene el tope en 1 y solo puede bajar.
- [x] ~~**88 preguntas que el trinquete no ve, y hay que contrastar contra su facsímil.**~~ **TERMINADO el 18-sep: las 88 auditadas, las 88 con la respuesta bien.** Los 15 problemas encontrados eran todos de texto (3 enunciados rotos, 3 descripciones que no eran la figura, 9 a las que les sacaron la figura y no pusieron nada). Se dibujaron 10 figuras. Detalle en [`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md). Filtro barato para lo que queda: las que **no tienen paréntesis descriptivo** son las sospechosas de modo 4 (le sacaron la figura y no pusieron nada). Son las que la pasada del 14-sep sacó de la cuenta reescribiendo el enunciado, y que hoy no declaran `figura:`. Son 88 y no 72 porque el 17-sep `PIDE_FIGURA` se hizo más ancho: **regenerar la lista con el script antes de seguir**. Van 20 auditadas con 7 problemas, en tres modos de falla distintos (la respuesta mal: 2; el enunciado roto por la propia pasada: 3; la descripción que no es la figura aunque la respuesta esté bien: 2). El modo del enunciado roto se encuentra **sin abrir un PDF**, buscando enunciados que arranquen con coma o minúscula, y debería ser lo primero. Lista completa y definición exacta del filtro en [`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md), sección "El 1 es un piso, no un techo".
- [ ] **Y una tercera categoría, que ningún chequeo automático puede encontrar: las que NI SIQUIERA prometen una figura.** El primer caso es `2017-3op-1` P5, que habla de un cuadrado con arcos sin nombrar ninguna figura y cuyo sombreado el texto no determina (está marcada E). El trinquete solo ve las que prometen un dibujo; estas aparecen únicamente abriendo el PDF. Se anotan en la sección homónima de [`docs/figuras-pendientes.md`](../docs/figuras-pendientes.md) a medida que se encuentran.
- [x] ~~**Ningún test construye las figuras, así que sus verificaciones geométricas no corren en CI.**~~ **Resuelto el 18-sep**: `src/lib/figuras/figuras.test.ts` construye las 104 y además chequea que toda figura que el banco declara se pueda dibujar. Se destrabó poniendo la extensión en el import de `motor` (`allowImportingTsExtensions` ya estaba activo), y se verificó que el test puede fallar rompiendo una figura a propósito.
- [x] ~~Guiones largos en el banco.~~ Resuelto el 16-sep: 244 reemplazos en 67 archivos, con el trinquete `el banco no usa guion largo en el texto del alumno` en 0 (ver §11).
- [ ] Las respuestas del ácido fosfórico (`2010-2op-1 P16`, `1-2015 P16`, `2-2015 P16`) quedaron como estaban porque tres gestiones distintas ofrecen el mismo par y lo dan por bueno, pero **no se pudo contrastar contra el facsímil**: los PDF no están en el repo. Anotado en los tres archivos por si aparecen.
- [ ] ~~Stripe~~: descartado para Bolivia. El modelo es pago manual (Tigo Money / QR / transferencia) con aprobación del admin; lo que falta está en §8 Crítico.
- [x] ~~Auditoría visual sistemática en móvil~~ — hecha el 13-sep a 375px, pantalla por pantalla (ver §11). Salió el corte de las fórmulas, el avatar aplastado y cuatro bugs más.
- [ ] **App Android (TWA) sin publicar.** El proyecto está en `android/` (ver §5.1) pero falta lo que solo puede hacer Ronald en su máquina: compilar en Android Studio, generar el keystore firmado y pegar su SHA-256 en `android/app/src/main/res/values/strings.xml` y en `public/.well-known/assetlinks.json` (hoy tiene un placeholder), más la cuenta de Play Console. Ese paso es además el que le saca la barra de direcciones a la app.
- [x] ~~Los modos Premium bloqueados no hacen nada al tocarlos en `/practicar`.~~ Resuelto el 16-sep: llevan a `/precios` con el motivo de lo que el alumno quiso hacer (ver §11).
- [ ] Borrar (o rescatar) los 8 componentes muertos de la landing anterior: `Header.tsx`, `CTANew`, `HeroSectionNew`, `StatsNew`, `RankingSectionNew`, `RankingCardNew`, `QuickActionsNew`, `PricingSectionAxiom`. Cero imports. Ahí vive casi todo el violeta que queda.
- [ ] Terminar de sacar los emojis usados como iconografía: ya salieron los de la landing, el chrome y **todas** las pantallas del alumno. Quedan 1 en componentes compartidos, 166 en las lecciones de `/aprende` (33 archivos) y 77 en admin (12 archivos) — los de admin son los menos urgentes, no los ve el alumno.
- [ ] Banco de Económicas: hay **10 exámenes** contra los 139 de Ingeniería, y además cada uno estaba **solo con la sección de Matemáticas**. El 18-sep se agregaron **35 preguntas de Lenguaje a 9 de los 10** (las verificables: gramática, semántica y ortografía), con cada emparejamiento confirmado abriendo el encabezado de la página y comparando la línea de carreras o programas y la fecha. De paso se corrigió una fecha (`2012-1op-1`, 26 → 28 de enero) y se completó otra que estaba vacía (`2012-2op-1`, 8 de febrero). Falta: **(a)** el `2023-2op-1`, que NO está en estos PDF (van de 2008 a 2015) y necesita otra fuente; **(b)** decidir qué hacer con las 15 de comprensión lectora por examen, que el facsímil no permite verificar y **las marcas a mano no sirven como clave** (tres verificaciones independientes y las tres fallan, incluyendo preguntas con DOS marcas distintas); **(c)** seguir con Historia: el PDF `FCE_Guia_HistoriaGeneral.pdf` tiene **dos partes**, una guía de práctica (páginas 1 a ~68) y **los exámenes reales en las páginas 69 a 84**. Ya se transcribieron dos: la del `2013-2op-2` (8 de 10, página 73) y la del `2013-1op-2` (**las 10**, página 74). Quedan identificadas por encabezado las del `2014-1op-1` (p. 79), `2014-1op-2` (p. 81) y `2014-2op-1` (p. 84), más varias de exámenes que no están en el banco; **(d)** la guía de práctica en sí, que son cientos de preguntas de Historia General numeradas en secuencia y podría ser un banco de práctica aparte, no atado a un examen.

### Infraestructura de agentes (desde el 27-sep, ver §11)
- [ ] **Probar cada agente en una tarea real y corregir su texto con lo que falle.** Orden sugerido: `cronista` (barato, sin PDF), `verificador` sobre el próximo cambio, `auditor-pedagogico` sobre 3 lecciones de la Unidad 01, y los dos que necesitan PDF en la máquina de Ronald.
- [ ] **Versionar los scripts reutilizables en `scripts/`.** Hoy viven en scratchpads que se pierden al cerrar la sesión: el que cruza listas para contar la auditoría, la comparación palabra por palabra contra `HEAD`, el que regenera la lista de figuras invisibles, el de la banda superior de páginas. Los agentes dicen "calculalo con un script" y no tienen uno a mano; con esto la regla de "los conteos se calculan" (§7, 18-sep) deja de depender de que alguien lo reescriba.
- [ ] **Hook de `SessionStart` que haga `git fetch origin main` y muestre `HEAD..origin/main`.** Convierte la regla de oro 1 de `CLAUDE.md` de pedido en automática. Dos veces se trabajó sobre un `main` viejo (15-sep y 16-sep).
- [ ] **Agente `auditor-movil`**: recorrido de las pantallas del alumno a 375px con Playwright. De la auditoría del 13-sep salieron el corte de fórmulas, el botón muerto y el `demo-user`; hoy no hay nada que la repita. Conviene hacerlo después de tener un script que levante la app con datos de prueba.

### Pendiente (anotado el 7-oct-2026, "retomaremos después")

Sale del análisis de competencia ([`docs/analisis-competencia.md`](../docs/analisis-competencia.md)) y del mapa de temas ([`docs/mapa-de-temas.md`](../docs/mapa-de-temas.md)). Decisiones de Ronald ese día: el cobro sigue **mes a mes**, **no** se pone su cara ni nombre en la landing, no hay fecha oficial del examen UMSS ni alumnos de prueba (por eso no hay testimonios).

- [ ] **Probar un pago real de punta a punta** y activar el bot de Telegram. Es lo que bloquea todo lo demás: no sirve atraer gente si no se puede cobrar.
- [ ] **Biología de Ingeniería, ya conectada pero sin publicar.** Las 7 lecciones (BIO-01 a BIO-07) se auditaron, se corrigieron 48 errores y se conectaron en `catalogo-aprende.ts`; **todo quedó sin commitear**. Falta: (1) mirarlas en celular (pizarra de mitosis y celda larga de lípidos de BIO-02 pueden verse cortadas; nadie las vio renderizadas), (2) decidir si energía celular enseña 38 ATP o el rango 36–38, (3) contrastar los ~12 datos dudosos con la guía UMSS (ecorregiones de Bolivia: 4 vs 12, áreas protegidas, año de la sal yodada), (4) redibujar dos figuras de ecología (pirámide invertida, ciclo del carbono), (5) las ~90 lagunas de explicación, de a una lección. Informes: `docs/auditoria-biologia-1.md` y `-2.md`.
- [ ] **Racha de estudio simple** (días seguidos con actividad). Planear antes de tocar código.
- [ ] **Datos del mapa de temas por limpiar:** 44 preguntas de 2025 con el sufijo del examen pegado en `tema`, 12 con `area: matematicas` mal puesta en Ingeniería, y la bitácora dice que Derecho está en el banco pero no hay carpeta.
- [ ] **Ideas descartadas por ahora** (retomar si cambia el contexto): prueba gratis sin registro, fecha de examen del alumno con cuenta regresiva, pase único hasta el examen, garantía de devolución, tutor IA, referidos, curso en vivo, expandir a otras universidades.
- [ ] Faltan escribir las 5 piezas de contenido que el mapa de temas marca como hueco (normalidad y titulación, dinámica del movimiento circular, impulso y choques, reducción al primer cuadrante, ondas electromagnéticas) y una lección de Historia para Económicas.

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

### 2026-10-08 (ter) (visto bueno por tipo: lo aprobado sale de `/prueba-animacion`)

- Pedido de Ronald: cada tipo de animación se aprueba con su visto bueno y, una vez aprobado, se marca con ✓ y se quita de lo que él prueba.
- `data/registro-visto-bueno.json` guarda la huella de lo aprobado; `/prueba-animacion` (ya no estática) muestra solo lo no aprobado o cambiado después, con el contador «N por revisar · M aprobadas ✓». Se aprueba con `node src/app/prueba-animacion/aprobar-animacion.ts <id>` y **solo cuando Ronald lo dice**; `--quitar <id>` lo devuelve a revisión.
- Los tipos de álgebra aprobados el 7-oct reaparecían porque cambiaron después (arreglos del auditor): quedan pendientes hasta que Ronald los vuelva a aprobar.

### 2026-10-08 (bis) (piloto de animaciones de Física y Química, y plan de qué animar primero)

- **Plan:** `docs/plan-animaciones.md` (lo genera `scripts/analisis/plan-animaciones.py`) mide qué tipos de problema caen más. Ranking por impacto (preguntas x facilidad, la facilidad es juicio): Cinemática, Estequiometría, Gases, Genética, Soluciones. SVG con el motor de fusión alcanza para los 27 tipos; 3D casi no hace falta (13 de 3569 preguntas de Ingeniería nombran un sólido); las partículas serían explicación de conceptos, no resolución. Económicas Matemáticas está explicada en prosa (1% con «Paso N»): hay que reescribir antes de animar.
- **Generadores nuevos** (en `src/app/prueba-animacion/`): `generadores-fisica.ts` (MRUV velocidad, distancia, tiempo y «se multiplica la velocidad»; gases de Charles) y `generadores-quimica.ts` (moles de átomos y estequiometría con 14 reacciones). Número y unidad son piezas aparte, las unidades se tachan de a una, la masa molar se arma a la vista. Cada cuenta se comprueba con tabla propia en el test y los casos de referencia salen del banco (2024-010, 2018-014, 2024-016).
- **Conectados** a `/prueba-animacion` (4 tarjetas «NUEVO») y a `huellas.ts`; registro de auditoría en «pendiente». tsc, lint y tests verdes.
- **Pendiente:** ver en celular a 375 px; pasar `auditor-de-pasos`; que Ronald los mire. Conocidos: la estequiometría no simplifica antes de multiplicar (160/160), el balance se cuenta solo en el texto, `mruvDistancia` sin comprobación final, un brote a una pieza interna mueve también su fracción contenedora (limitación del motor). Faltan despejes de t, km/h→m/s, Charles con otra incógnita, rendimiento/pureza/limitante. Siguiente en el ranking: Genética (Punnett, pide componente nuevo) y Soluciones.

### 2026-10-08 (la fórmula general con raya real: fracciones y raíces con piezas adentro)

- **Qué:** en la ecuación de segundo grado, la fórmula general ya no es texto en línea con "entre": es una fracción con raya real y la raíz abarca su radicando. Cada letra y número de adentro es una pieza con id (se marca, se tacha, viaja, nace por brote). Se sacó el paso "entre es la raya" (1 paso menos).
- **Cómo:** `Ficha` suma `frac.nPiezas/dPiezas` y `rad`; helpers `aplanar`, `hijas`, `frPiezas`, `raiz`, `sustituir` en `datos.ts`; `Fusion.tsx` dibuja las piezas internas (`interna`/`compuesta`) y achica la fracción según el ancho de pantalla. x2 se copia por brote de la fracción de x1.
- **Probado:** `tsc`, lint y 76 tests verdes; visto en pantalla (el Δ ahora tiene aire sobre la raya, `paddingBottom` 1.05em).
- **Pendiente (registro `auditoria-pasos`, "con-hallazgos"):** fila de referencia sin rótulo; (-1)^2 en un paso en la comprobación; 4·1 repetido con a=c=1; reglas "2n=n+n" y "x=3"; rótulo Δ sin valor. Falta ver en celular de 375 px y pasar el `auditor-de-pasos` con las piezas nuevas.

### 2026-10-07 (ter) (punto 1 del repaso del flujo: el test de voseo cubre toda la interfaz)
- **Corrección a lo que dije al principio:** había propuesto "un validador del banco en CI" porque creía que el banco tenía pocos tests. Era falso. `banco.test.ts` ya trae 15 chequeos (opciones, respuesta que existe, ids únicos, enunciado, figuras, KaTeX, tuteo, guion largo, precios, coherencia de repetidas) y hay tests de registro de verificación, faltantes y figuras. El banco **sí** está vigilado por mecanismo.
- **El hueco real que sí había:** el test de voseo de `contenido-lecciones.test.ts` solo miraba `aprende/` y `laminas/`. Login, resultados, landing y componentes no se vigilaban. Se amplió a todo `src/app` salvo `admin/` (ahí van prompts para IAs, en rioplatense a propósito) y se vaciaron los comentarios de bloque multilínea (un `{/* ... vos ... */}` en `login` daba falso positivo). Resultado hoy: cero casos. Se comprobó que **puede fallar** metiendo un "podés" en `login` (saltó) y restaurando.
- Lo que NO se hizo, a propósito: forzar `verificador` por mecanismo. Es un agente, no un script; en CI ya corren tsc, lint, tests y build, que es lo que de verdad frena.

### 2026-10-07 (bis) (la bitácora se acorta: el changelog viejo pasa a `docs/bitacora-historial.md`)
- La bitácora tenía casi 2000 líneas y una IA nueva no la lee entera con atención. Se movieron **tal cual, sin cambiar una línea**, las entradas de §11 del 30-sep-2026 hacia atrás a `docs/bitacora-historial.md` (1295 líneas). `BITACORA.md` baja a unas 690. Se comprobó por script que no se perdió ninguna línea.
- No se tocó §0 a §10, así que todas las referencias `§N` de CLAUDE.md, los agentes y el código siguen valiendo. Las entradas nuevas se siguen escribiendo al inicio de §11. Reversible con `git revert`.

### 2026-10-07 (competencia, mapa de temas y Biología de Ingeniería conectada)
- **Análisis de competencia:** 13 sitios revisados, 10 leídos, 3 no competían y 3 no cargaron. Informe con opciones, consecuencias y riesgos en `docs/analisis-competencia.md`. No se encontró ninguna plataforma para la UMSS ni Bolivia. Decisiones de Ronald: cobro mes a mes, sin su cara en la landing, sin fecha oficial de examen ni alumnos de prueba. Lo descartado y lo pendiente está en §8, "Pendiente (anotado el 7-oct-2026)".
- **Mapa de temas** (`docs/mapa-de-temas.md`, scripts en `scripts/analisis/`): frecuencia por materia y tema sobre los 150 exámenes con el parser real. Hallazgo: **las 7 lecciones de Biología (BIO-01 a BIO-07) existían desde junio y ningún catálogo las listaba**, aunque Biología pesa 20% del examen de Ingeniería (924 preguntas en el banco).
- **Auditoría de esas 7 lecciones** (`docs/auditoria-biologia-1.md` y `-2.md`): 48 errores de contenido, ~90 lagunas y ~12 datos dudosos. Ninguna se podía publicar tal cual, ninguna había que rehacer. Se corrigieron los 48 errores con cambios mínimos (bocio es hipotiroidismo, el sudor enfría por calor de vaporización, la meiosis femenina da 1 óvulo y 3 cuerpos polares, mula = burro × yegua, Linneo 1753, coherencia 38 ATP, regla del 10%, etc.) y se conectaron como bloque "Biología" en `BLOQUES_INGENIERIA` (`catalogo-aprende.ts`). La Unidad 01 queda gratis y el resto es de pago, igual que los demás bloques.
- **No se tocó:** los datos dudosos (hay que contrastarlos con la guía UMSS), las lagunas, las respuestas de los AutoCheck, ni dos figuras de ecología que hay que redibujar. **Nadie vio las lecciones renderizadas**: la pizarra de mitosis de BIO-03 y una celda larga de BIO-02 pueden verse cortadas. Falta mirarlas en celular.
- Las 18 lecciones de Medicina siguen sin catálogo, a propósito (Medicina solo tiene un examen cargado).

### 2026-10-07 (animación de resoluciones: el motor de fusión, en prototipo)
- **Pedido de Ronald:** la resolución animada tiene que verse como una operación, no como fichas que aparecen y desaparecen. Ejemplo suyo: en 2 + 3 + 4, el 3 y el 4 se juntan y se funden en 7; con ley de signos igual, y debajo dice por qué. Y que valga para todas las materias y exámenes, no solo para matemática.
- **Decisión:** la jugada es **marcar, juntar, fundir y explicar el porqué**. Motor: Framer Motion. Se probó GSAP Flip y se descartó. La división se muestra como fracción (9 sobre 3), no con ÷. Lo que no cambia se queda quieto (en 2³·2² la base no se anima, solo se funden los exponentes).
- **Prototipo:** `src/app/prueba-animacion/` (`datos.ts` con 8 ejemplos: suma, ley de signos, ecuación, potencias, raíces, fracciones, multiplicación con signos, diferencia de cuadrados; `Fusion.tsx`; `Tex.tsx`). Ronald lo aprobó en lo visual ("me gusta un montón"). **No se sube a `main`** mientras sea una ruta pública.
- **Agentes:** `animador-resolucion` ahora lleva la jugada, el modelo de datos (`estados` + `transiciones` con `desde`/`hacia`/`porque`), las reglas de verificación y una tabla de cómo se extrapola a Física, Química, Económicas, Medicina/Biología, Lenguaje, lógica e Historia. `animador-conceptos` apunta a esa tabla para lo que es cuenta o proceso con pasos. Lecciones en `docs/lecciones-agentes.md`.
- **Segunda vuelta (mismo día):** el texto del "¿Por qué?" va en LaTeX con `MathText` (fracciones con raya, nada de `/` ni `÷`); las raíces muestran el proceso completo (16 = 4², raíz → exponente ½, 2/2, se tachan, exponente 1), también cuando no son exactas (√12 = 2√3); se agregaron `ancla`, `sup`, `modo: "tachar"` y `hacia` en lista. **Para cualquier nivel de exponente** hay generadores (`generadores.ts`: potencias de igual base, raíz de cualquier índice y exponente, raíz con parte exacta y resto) con campos para elegir los números, y un test que corre cientos de combinaciones. Faltan generadores para división de potencias, exponentes negativos y raíces de números que hay que factorizar (72, 150).
- **Tercera vuelta:** criterio de calidad fijado por Ronald: "al ver se entienda la resolución", sin leer. Se corrigieron cuatro `cdot` que se veían como texto (LaTeX con una sola barra en TypeScript), la suma de fracciones (los números nuevos nacen del denominador de la otra fracción, con `brotes`) y la diferencia de cuadrados (ahora 6 pasos con `resaltar`). El test vigila LaTeX sin barra y la coherencia de brotes y resaltados.
- **Pendiente:** (1) probar el prototipo en celular a 375 px y con `prefers-reduced-motion` (no se pudo ver en un navegador desde la sesión); (2) promoverlo a `src/app/components/animaciones/fusion/` y conectarlo a `SolucionPasos`; (3) agregar ficha de texto plano para materias no numéricas; (4) piloto con 3 a 5 preguntas reales, empezando por las explicaciones ya reescritas de `2006-2op` y `2006-parcial1`; (5) probar una plantilla de Física (unidades que se cancelan) y una de Química (balanceo) para confirmar que la jugada alcanza.
- **Subido a `main` (7-oct, por pedido de Ronald):** el prototipo `src/app/prueba-animacion/` (con `Generador.tsx`, `generadores.ts` y su test) ya está en `main`, contra lo que decía la línea del prototipo. Es una ruta pública: se le puso `robots: noindex` para que no la indexen. tsc, lint, 115 tests y build en verde.
- **Cuarta vuelta: Álgebra con generadores (7-oct, noche).** Archivo nuevo `generadores-algebra.ts` + `generadores-algebra.test.ts` + `revisar.ts` (la vara común de coherencia, compartida por todos los tests de generadores). Generadores: ecuación `ax+b=c`, suma y resta de fracciones, diferencia de cuadrados `x²−k²=0`, suma de logaritmos de igual base. Cada uno se prueba con todas las combinaciones válidas (miles) y la cuenta se comprueba con enteros, no con decimales. Panel de prueba con cuatro cuadros "NUEVO" arriba de la página.
- **Reglas que fijó Ronald en esta vuelta (todas están escritas en `agentes/animador-resolucion.md`; léelas antes de animar algo):** (1) **Un concepto "de memoria" se construye a la vista**: el logaritmo se resuelve primero por su significado (cuántos `b` se multiplican para llegar a `m`: descomponer en factores, contar, exponente) y recién después se suma o se aplica la propiedad; (2) **simplificar nunca es "dividimos entre g"**: se ve de dónde sale el `g` y se tacha (`simplificar`); (3) **dividir los dos lados de una ecuación también se ve**; (4) **cada mejora se aplica en retrospectiva** a todo lo ya hecho, con un test que falle si el paso vuelve a faltar; (5) **cada resolución muestra la regla que la justifica** (`regla`, fórmula general): en `modo="resolver"` dentro del "¿Por qué?", en `modo="ensenar"` destacada en su recuadro; (6) **al informar, solo lo nuevo**; (7) **toda lección se anota en el momento en tres lugares**: agente, cuaderno y test.
- **Para quien retome (otra sesión, otra IA, otra cuenta):** lee `agentes/animador-resolucion.md` (reglas), `docs/lecciones-agentes.md` sección "Animación de resoluciones" (los errores con las palabras de Ronald) y corre `node --test src/app/prueba-animacion/*.test.ts`. Si `tsc` o `next` "desaparecen", `unset npm_config_allow_scripts; npm ci --ignore-scripts`. LaTeX en código: solo con Write o Edit, nunca con heredoc, `sed` ni Python (se comen las barras).
- **Quinta vuelta (7-oct, noche): patrón "anotar y reemplazar" y agente `auditor-de-pasos`.** Ronald: la fórmula general "no se notaba" y los errores se repetían porque nada los vigilaba. Se creó el agente `auditor-de-pasos` (criterio "como a lápiz", para toda materia) y tres varas en `revisar.ts` válidas para todo generador: conservación (nada aparece ni se va sin fusión o brote), máximo 2 números nuevos por paso (`descompone: true` para factorizaciones), sin pasos vacíos, y una operación por fusión. El motor ganó `debajo` (etiqueta bajo la ficha) y `salto` (renglón nuevo). La ecuación de segundo grado se rehízo con el orden que propuso Ronald: ecuación → por qué no se despeja → ordenar un término por paso (con `brotes`, sumando semejantes y constantes) → etiquetas con color debajo de cada término → fórmula debajo con las mismas letras de colores → reemplazar una letra por vez → una operación por paso → comprobación contra la ecuación original. Seis campos (los dos lados). La primera auditoría real del agente encontró 8 fallas que se corrigieron (producto de dos en dos, reglas según el signo, Δ definido, comprobación final). Detalle del patrón en `agentes/animador-resolucion.md`.
- **Sexta vuelta (7-oct, noche): arrastrar en todo y mostrar cada mejora.** (1) Ronald prefirió **arrastrar** la misma pieza (mismo `id`, cambia de signo al cruzar el `=`) en vez de escribir el opuesto en los dos lados: aplicado en la ecuación de segundo grado, la lineal (el factor pasa dividiendo) y la diferencia de cuadrados. (2) Ronald pidió que se use **"en todos los lugares que se pueda"**: la regla del agente es "si una pieza desaparece en un sitio y aparece en otro, viaja" (potencias, exponente negativo, sacar de la raíz, producto cruzado, unidades, despejes, Punnett, Lenguaje). **Falta revisar con esa regla los generadores ya hechos** (potencias, raíces, fracciones, logaritmos). (3) Regla: **cada mejora visual se le muestra a Ronald** (rótulo CAMBIÓ en `page.tsx`, captura propia si el navegador responde, y pedirle que recargue). (4) Se subió el espacio entre ecuación con etiquetas y fórmula (72 px), porque quedaba "muy aglomerado"; **sin verificar en pantalla** (el navegador se cortó).
- **Séptima vuelta (7-oct): la pieza viaja y no se salta ningún paso.** Ronald vio tres saltos. (1) Ecuación lineal: el `3` ya no se funde con el número; **viaja** hasta debajo y queda de denominador (nueva `modo: "viajar"` en `Fusion`, con un `brote` por pieza; `revisar.ts` acepta que el origen de un brote desaparezca si lo consume una fusión `viajar`). (2) Diferencia de cuadrados: entre `x²−9` y los paréntesis ahora van: nombrar `a=x`, `b=3` debajo, escribir la fórmula con letras, reemplazar las letras, y cambiar la izquierda por el lado derecho de la fórmula. (3) De `(x−3)(x+3)=0` a `x−3=0 ó x+3=0` ahora hay dos pasos: una ecuación por factor (con paréntesis) y luego se quitan los paréntesis. Cuadrados pasó de 8 a 11 pasos. tsc, lint y tests en verde; **mirado en pantalla solo el paso de la lineal**, los de cuadrados sin ver. Regla que queda: si una pieza cambia de forma (paréntesis, letra, fórmula), se muestra cada forma intermedia.
- **Registro de auditoría de pasos (7-oct, noche).** `data/registro-auditoria-pasos.json` guarda por generador `pendiente | con-hallazgos | auditado` y la **huella** (hash de su salida con casos fijos, `huellas.ts`). El test `registro-auditoria.test.ts` frena si un generador auditado cambia o si hay uno sin registrar; se marca con `registrar-auditoria.ts`. Así no se vuelve a auditar lo que no cambió. Protocolo en `agentes/auditor-de-pasos.md`. Primera pasada: los 9 generadores quedaron `con-hallazgos`. Causas comunes: fichas únicas con varios números (la fórmula `F`, la raíz, la fracción) donde los valores no pueden viajar; reemplazos de varias letras en un solo paso; resultados intermedios que solo están en el texto; falta de comprobación final. `cuadrados` ya arreglado en parte (9→3·3→3², `a` y `b` por separado, un arrastre por paso). **Siguiente:** motor para partir fichas en piezas con id, y arreglar `lineal`, `fracciones`, `cuadratica`, raíces y logaritmos con un test cada uno.
- **Auditoría independiente (8-oct).** Tras arreglar los 9 generadores, tres auditores que no escribieron el arreglo leyeron las animaciones: los 9 siguen `con-hallazgos` (ninguno con saltos de conservación; sí comprobaciones que reconstruyen datos, tex únicos con varios números, resultados solo en el texto, ~7 pasos sobrantes en la cuadrática). Todo el detalle y los tests propuestos están en `docs/hallazgos-auditoria-pasos.md`; las lecciones, en `docs/lecciones-agentes.md`. **Regla nueva:** `registrar-auditoria.ts` exige `--independiente` para marcar `auditado`: el que arregla no se audita. Siguiente ronda: arreglar lo de ese documento (fila de referencia con el enunciado, `fr` con partes, cuentas como estado), generalizar los tests a `revisar.ts` y volver a auditar.
- **Ronda 2 de arreglos y ronda 3 de auditoría (9-oct).** Tres agentes arreglaron lo pendiente (fila de referencia con el enunciado, piezas que viajan, cadenas de productos parciales, cuadrática de 44 a ~35 pasos, comprobaciones con pasos) y tres auditores independientes volvieron a leer: los 9 siguen `con-hallazgos`, pero **ya sin saltos graves**; lo que queda son saltos finos, sobre todo en las comprobaciones (detalle en `docs/hallazgos-auditoria-pasos.md`, "Ronda 3"). Rendimientos decrecientes: ningún agente vio la pantalla. **Siguiente:** que Ronald mire la página (aire, largo, 375 px), decidir qué de la ronda 3 se arregla, y generalizar los tests a `revisar.ts`. 75 tests, tsc y lint en verde.
- **Retoques visuales y de control (9-oct).** (1) Pausar / Continuar en la reproducción (el paso en curso termina; después Atrás y Siguiente; Continuar sigue desde donde quedó). (2) Exponentes pegados a su base, fracción como exponente más grande y elevada, piezas con etiqueta (`debajo`) reservan el ancho de su etiqueta para que no se monten (se vio en la raíz abierta en índice, base y exponente). (3) Gesto de visita (`visitas`) para multiplicaciones. (4) **Enlace directo a un paso:** `/prueba-animacion?<tipo>=<paso>` (por ejemplo `?raiz=4`, `?cuadrados=17`; los tipos son los de `Generador.tsx`) abre esa tarjeta en ese paso; úsalo en vez de recorrer a clics. Las etiquetas de piezas elevadas llevan un ajuste de +0.6em medido a ojo en una captura: revisar con otros tamaños de pantalla.
- **Cómo retomar esto sin la conversación (cualquier sesión, IA o cuenta):** (a) `git pull`; (b) `unset npm_config_allow_scripts; npm ci --ignore-scripts` si `tsc` o `next` no aparecen; (c) leer `agentes/animador-resolucion.md` (todas las reglas, con su origen) y `agentes/auditor-de-pasos.md`; (d) leer la sección "Animación de resoluciones" de `docs/lecciones-agentes.md`; (e) `node --test src/app/prueba-animacion/*.test.ts` (137 tests, todos deben pasar); (f) `npm run dev` y abrir `localhost:3001/prueba-animacion` (muestra solo lo pendiente de revisar); (g) antes de enseñarle algo a Ronald, pasarlo por el agente `auditor-de-pasos`. **Siguiente trabajo, en orden:** revisar los generadores existentes con la regla de arrastrar; sistemas 2×2, factorización de trinomios y proporciones; después Física y Química con el patrón "anotar y reemplazar"; al final, promover el prototipo a `src/app/components/animaciones/fusion/` y conectarlo a `SolucionPasos`.
- **Pendiente de esta vuelta:** (0) Ronald debe mirar el DISEÑO de las etiquetas debajo y de la fórmula en renglón nuevo, y falta que el valor "viaje" desde la etiqueta a la fórmula con `brotes`; (1) Ronald debe mirar en pantalla el tachado y el recuadro de la regla (no se vieron desde la sesión); (2) más tipos de Álgebra (segundo grado, sistemas, factorización) y luego Física (movimiento, no solo fusión); (3) la auditoría retroactiva se repite con cada regla nueva; (4) esta vuelta se subió a `main` el 7-oct: se fusionó con lo que otra sesión ya tenía (fracciones con numerador y denominador como piezas, `noindex`); `revisar.ts` reconoce las partes `f.n` y `f.d`. tsc, lint (0 errores), 123 tests y build en verde.

### 2026-10-05 (agentes de animación: `animador-resolucion` y `animador-conceptos`)
- **Pedido de Ronald:** mejorar cómo se muestran las resoluciones (hoy `SolucionPasos` revela texto paso a paso) con animaciones por tipo de problema, y poder hacer lo mismo para Medicina.
- **`agentes/animador-resolucion.md`:** plantillas React (SVG + Framer Motion) por TIPO de problema, con los datos como props. No calcula: el paso a paso sale del banco. Si una pregunta no tiene pasos usables la registra como `falta-resolucion` y la devuelve al `resolutor-exacto`.
- **`agentes/animador-conceptos.md`:** conceptos que se ven (anatomía, ciclos, células) con SVG de partes nombradas, capas o imágenes con licencia. El contenido sale de lecciones y banco, no se inventa. Flow solo en publicidad, nunca en la app.
- **`data/registro-animaciones.json`:** plantillas y estado por pregunta (`pendiente | falta-resolucion | animada | bloqueada`). Vacío por ahora.
- **Pendiente:** piloto con una plantilla (cinemática o ecuación de primer grado) y la mejora "capa 0" de `SolucionPasos` (resaltar qué cambia entre pasos). Las mismas plantillas se renderizan a mp4 para publicidad con `director-motion`.

### 2026-10-05 (ter) (una plantilla de flujo de trabajo, comparada con lo que ya teníamos)

Ronald trajo una plantilla de `CLAUDE.md` muy difundida (planificar primero, subagentes, bucle de autocorrección, verificar antes de dar por hecho, elegancia, arreglar bugs solo, `tasks/todo.md` y `tasks/lessons.md`) y pidió ver si sirve y aplicarla donde corresponda.

**Se comparó punto por punto antes de copiar nada.** Ya teníamos tres de las seis ideas: el cuaderno de lecciones (`docs/lecciones-agentes.md`, regla 6), los subagentes con tabla y flujo, y la bitácora que documenta resultados.

**Se adoptó solo lo que faltaba:**
- **`CLAUDE.md`, sección nueva "Cómo trabajar"** (6 reglas cortas): planificar lo grande y **frenar y replanificar cuando algo sale torcido** (es lo que habría evitado las 14 preguntas vaciadas); una corrección de Ronald se anota en el momento; verificar antes de dar por terminado (en celular y en tablet si es interfaz, reproducir el fallo si es un bug); bugs y CI rojo se arreglan sin pedir permiso, con la causa raíz; el cambio más chico que sirva. La regla 6 ahora vale para **cualquier** tanda y no solo las del banco.
- **`agentes/verificador.md`:** su alcance estaba pensado para banco, figuras y contenido. Se amplió a **cobros, textos legales, interfaz y arreglos de bugs**, con los chequeos que salieron de esta sesión (que un aviso fallido no tumbe un pago, que lo que dice el texto legal se pueda comprobar en el código, que un precio escrito en una pantalla coincida con el código que decide, mirar la interfaz en tres tamaños, que un bug tenga su test) y cierra con la pregunta del ingeniero senior.
- **`agentes/cronista.md`:** la tarea D también asienta las correcciones que Ronald le hace a la IA en la conversación.

**Lo que NO se adoptó, y por qué:**
- **`tasks/todo.md` y `tasks/lessons.md`:** serían una segunda copia de §8 de la bitácora y del cuaderno. Con varias sesiones en paralelo, dos listas de lo mismo se desincronizan.
- **"Modo plan para cualquier tarea de más de 3 pasos":** demasiado pesado para un flujo donde Ronald dice "sigue". Se pide solo para lo grande o irreversible.
- **"Usar subagentes con generosidad":** acá cada subagente arranca en frío y cuesta; se usan para lo paralelizable.
- **"Elegancia" como paso aparte:** se resumió en la última regla, para no empujar a sobrediseñar.

**No se creó ningún skill nuevo.** Una instrucción de cierre ("verificar, bitácora, lecciones, subir") ya la cubren `verificador` y `cronista`; un skill con el mismo contenido sería una tercera copia.

### 2026-10-05 (bis) (aviso por Telegram cuando entra un pago)

Ronald pidió el aviso de pagos ("Hacelo"). Era un hueco de lanzamiento: el pago es manual, la app promete activar en 24 horas y nada le avisaba a Ronald que había uno esperando.

- **`src/lib/avisos.ts`**: `avisarPago` manda un mensaje por Telegram (alumno, qué compró, monto, método, referencia, si trae foto, enlace a `/admin/pagos`). **Nunca lanza**: si Telegram falla o no está configurado, el pago ya está guardado y solo se pierde el aviso. Sin las variables de entorno no hace nada, así que el desarrollo local y los tests andan sin configurar. Texto plano, sin `parse_mode`: un guion bajo en un nombre rompería el mensaje.
- **`/api/pagos`** avisa con `after()`, o sea después de responderle al alumno: un Telegram lento no demora el "pago registrado". Cubre el pago de plan y el cambio de facultad.
- **Variables:** `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`, a cargar en Vercel con un redeploy. **Hasta que Ronald las cargue, los avisos no llegan.** Guía paso a paso en [`docs/avisos-telegram.md`](../docs/avisos-telegram.md) y ayudante `scripts/telegram-chat-id.mjs` (busca el chat y manda un mensaje de prueba).
- **Privacidad:** el aviso lleva el nombre del alumno, así que la Política de Privacidad suma a Telegram como proveedor. No viaja el correo ni la foto del comprobante.
- **`src/lib/avisos.test.ts`** (6 tests): contenido del mensaje, que sin variables no llame a Telegram, que con variables mande a la URL correcta en texto plano, que un fallo no lance, y que el servidor avise con `after()` en los dos tipos de pago.
- **No se probó contra Telegram de verdad** (no hay token en este entorno): el mensaje real hay que verlo después de configurar y hacer un pago de prueba.

### 2026-10-05 (QR de BNB con dos años de vigencia, titular y contacto en los Términos)

- **QR de BNB reemplazado** con `scripts/cambiar-qr.mjs qr_bancario ... --monto 100 --vence 2028-10-03`. El anterior vencía ese mismo día; el nuevo sigue siendo de **Bs. 100 grabados** (no es un QR sin monto) pero vale hasta el **3-oct-2028**. Consecuencia: sirve para Premium y **no para el cambio de facultad (Bs. 50)**, que por ahora solo se puede pagar con Binance Pay o RedotPay. Para cubrirlo hace falta un segundo QR de BNB de Bs. 50; hoy la configuración admite un solo QR por método.
- **`src/lib/legal.ts`: titular y contacto reales.** `titular: "Ronald Martinez Jimenes"` y `whatsapp: "+591 64805522"`. **El número lo dio Ronald junto con su nombre y se asumió que es su WhatsApp**; si es otra cosa, corregir. A título personal, sin razón social. Los Términos y la Privacidad ya muestran un canal de contacto, así que ya existe un camino para pedir reembolsos o que se borren datos. Falta un correo si se quiere uno, y que un abogado lea los textos (`docs/legal-revision.md`). Fecha de vigencia de ambos textos actualizada.
- **CI:** el test `agentes del proyecto` exige que `agentes/` y `.claude/agents/` tengan lo mismo en el repo, y el agente `resolutor-exacto` se había subido solo en `agentes/`. Se subió también la copia de `.claude/agents/`.

### 2026-10-04 (duodecies) (agente nuevo `resolutor-exacto`)
- **Pedido de Ronald:** un agente que resuelva sin errores y muestre los pasos "bonitos" como en las fotos de los institutos (una operación por línea, el truco escrito, verificación al final).
- **`agentes/resolutor-exacto.md`:** primero la respuesta, demostrada (resolver a ciegas, comprobar con código exacto `sympy`/`Fraction`, segundo camino distinto, recién después mirar las opciones y el banco); después la explicación en el formato del banco. Si discrepa con el banco o el instituto, no cambia nada: devuelve las dos cuentas y el código. Lo nuevo frente a `analista-resolucion`/`redactor-explicaciones`: la exactitud sale del código y del segundo camino, no de la lectura.
- **Primera prueba (2008-1op-1, P1 a P8 de matemática):** las 8 letras del banco confirmadas con código y segundo camino, sin discrepancias. Reescribió 3 explicaciones (P2, P4, P8) y sumó una verificación a P7; las otras 4 ya estaban bien. Se probó con un agente general que siguió el archivo, porque el agente nuevo solo se carga en una sesión nueva. **SUERTE:** el examen ya traía letras correctas, así que no prueba el caso con letras dudosas. Aprendizaje: para resolver a ciegas hay que extraer solo los enunciados (paso 0 agregado al agente).

### 2026-10-04 (undecies) (primera tanda de verificación contra facsímil: 5 exámenes de Ingeniería)
- **Hecho:** 5 agentes `auditor-facsimil` en paralelo contrastaron `2005-1op-1`, `2006-parcial1-1`, `2006-2op-1`, `2007-1op-1` y `2008-1op-1` contra sus PDF. Registro: 6 exámenes (con el `2006-1op-1` del paso 1), **144 de 150 sin registrar**. Completos (se mostrarían como digitalizados): `2006-parcial1-1`, `2006-2op-1`, `2007-1op-1`, `2008-1op-1`. Incompleto: `2005-1op-1` (faltan las figuras de P16 y P18, hay que dibujarlas con `auditor-figuras`).
- **Errores reales encontrados y corregidos en el banco:** reacciones químicas balanceadas de más (3 exámenes), enunciados y opciones resumidos (4 de 5), un orden de Física alterado (`2006-parcial1-1` P25 a P28), y **una respuesta mal**: `2006-2op-1` P12 es **3 Ω (A)** y no 2 Ω (B). La figura estaba dibujada como tres ramas en paralelo; en el PDF la R de abajo vuelve al nodo del medio. Redibujada la figura, corregidas respuesta y explicación (lo comprobé yo mirando el PDF).
- **Ojo:** el reorden de P25 a P28 cambia esos ids y la tabla `errores` los guarda. Con pocos alumnos el impacto es mínimo; si importa, migrar esas filas.
- **Pendiente:** las explicaciones de `2007-1op-1` P13, `2008-1op-1` P15 y `2006-2op-1` P13 deberían mostrar el paso de balancear la reacción (ahora el enunciado viene sin coeficientes). Faltan los 144 exámenes restantes, la página de impresión con marca de agua y el botón "Ver examen".
- **Agentes:** mejorar `transcriptor-examenes` (no balancear ni abreviar, copiar opciones literales) y `auditor-facsimil` (contar figuras en el PDF, verificar orden por tema, renderizar con PyMuPDF). Lecciones en `docs/lecciones-agentes.md`.

### 2026-10-04 (decies) (borrar la cuenta)
- **`DELETE /api/cuenta`** + sección plegable "Borrar mi cuenta" al pie de `/cuenta` (hay que escribir BORRAR). `eliminarUsuario` en `data-store.ts` borra a mano `simuladores`, `errores` y `suscripciones` (sin clave foránea) y después el usuario; `pagos`, `historial` y comprobantes se van por CASCADE. No borra cuentas admin ni tester.
- **Por decidir:** los pagos también se borran con la cuenta. Si se quiere conservarlos por contabilidad, hay que anonimizar en vez de borrar.
- **Sigue pendiente:** salir del ranking sin borrar la cuenta.

### 2026-10-04 (nonies) (foto del comprobante de pago)
- **Cierra el pendiente de §8 "El alumno no sube comprobante".** En `/pagar` hay un campo de foto (opcional, recomendado). El navegador la reduce a 1200 px en JPEG antes de enviarla (el celular manda 4-8 MB) y `/api/pagos` la valida (data URL de imagen, tope ~1,4 MB).
- **Dónde se guarda:** tabla nueva `pagos_comprobantes` (en la migración 006 y en `schema.sql`), aparte de `pagos` para que las listas no carguen imágenes. Se decidió guardarla en la base y no en Supabase Storage para no sumar infraestructura; si crece mucho, mover a Storage.
- **Quién la ve:** `GET /api/pagos/[id]/comprobante` solo para el admin y el alumno dueño. `/admin/pagos` muestra "Ver foto del comprobante" o "Sin foto".
- **Si falta correr la 006:** el pago se registra igual, sin foto (guardar el comprobante no puede tumbar el pago).

### 2026-10-04 (octies) (cambiar un QR sin tocar código y sin migraciones)
- **Pedido de Ronald:** dejar el cobro robusto para que cualquier QR nuevo se cambie sencillo. El pago sigue siendo manual (el alumno declara, el admin aprueba en `/admin/pagos`).
- **`src/lib/pagos-qr.json`**: imagen, monto grabado y vencimiento de cada QR, separados del resto de la configuración. `pagos-config.ts` los lee de ahí.
- **`node scripts/cambiar-qr.mjs <metodo> <imagen> [--monto N | --sin-monto] [--vence AAAA-MM-DD | --sin-vencimiento]`**: copia la imagen a `public/pagos/` (con fecha en el nombre, para que el navegador no muestre el viejo), borra la anterior y actualiza el JSON. Para el QR de BNB definitivo: `--sin-monto --sin-vencimiento`.
- **La tabla `pagos` ya no restringe el método** (`schema.sql` y migración 006 reescrita para quitar el CHECK). Sumar un método ya no necesita migración; lo valida el servidor con `esMetodoActivo`. La 006 (con la tabla `pagos_comprobantes`) la corrió Ronald en Supabase el 4-oct.
- Los tests de vigencia de QR usan métodos de prueba, no el QR cargado hoy (si no, cada cambio de QR los rompía).

### 2026-10-04 (septies) (paso 1 del examen digitalizado verificado: registro y agente `auditor-facsimil`)
- **Idea de Ronald:** que al elegir un "Examen real" el alumno vea el examen digitalizado (limpio, con su orden y título) y pueda descargarlo en PDF con marca de agua, sin salir del simulacro; y que solo se ofrezca donde hay respaldo en el escaneo real. Los demás dirán "En desarrollo". Plan completo en el plan de la sesión (visor + PDF imprimible con marca configurable, PDF sin respuestas y gratis).
- **Hecho (solo el paso 1, "poco a poco"):** `data/registro-verificacion.json` (arranca vacío: ningún examen está verificado, y no se asume), `src/lib/axiom/verificacion.ts` (`estaVerificado`, `idsVerificados`; se muestra solo si nivel >= `contra-facsimil` y `completo: true`), `verificacion.test.ts` (4 tests: la entrada apunta a un examen real con su id, nivel/fecha/fuente válidos, `completo` coherente con `faltantes`/`secciones_pendientes`) y el agente `auditor-facsimil`. La clave del registro es `facultad/archivo` (la misma que usa `scripts/registro-examenes.mjs`) y cada entrada guarda además el `id` del banco.
- **Hallazgo de la exploración:** el parser descarta el comentario con la FUENTE, las instrucciones, el encabezado y los títulos de sección; el banco no guarda de qué PDF salió cada examen. Solo 10 archivos (9 de Económicas y 1 de Medicina) traen `FUENTE` y página, y los 9 de Económicas solo tienen Matemáticas (incompletos, no entrarían). Ingeniería tiene PDF para casi todo pero ninguna ficha por examen.
- **Primera prueba del agente (`ingenieria/2006-1op-1-2006`, 20 preguntas):** halló 2 errores reales de transcripción que el comentario "100 % verificado" del `.md` no había evitado: P12 con las opciones C y D invertidas (11/23 y 77/26 en vez de 23/11 y 26/77; la capa de texto del PDF pone el denominador antes) y P11 sin la frase final del enunciado. Corregidos en el `.md`; las respuestas no cambian. P6 opción A (3√3) queda como duda: el radical no se dibuja en el PDF. P11 y P12 tienen figura en el PDF y el banco no la dibuja, así que el examen queda registrado con `completo: false` y NO se mostraría al alumno hasta que `auditor-figuras` las dibuje. Costo: ~24 llamadas y ~2 min por examen sin figuras. El agente salió mejorado (receta de PDF, regla de fracciones, clasificación de desviaciones) y las lecciones están en `docs/lecciones-agentes.md`.
- **Pendiente (pasos siguientes):** verificar una primera tanda (~10 exámenes completos de Ingeniería) con el agente, página imprimible `examenes/[id]/imprimir` con marca configurable en `src/lib/marca-agua.ts`, botón "Ver examen" en `/practicar` y en el header del simulador, y `verificado` en `/api/axiom/banco/info`. Decisión abierta: si el visor dentro del simulacro muestra el examen entero (por defecto) o solo la hoja actual.

### 2026-10-04 (sexies) (app nativa: estado y decisiones pendientes)
- **Estado:** el TWA de `android/` (commit `bcfea25`, 3-ago-2026, hecho por una sesión web) nunca se compiló ni se probó. Falta todo lo de §5.1: correrla en Android Studio, ícono real, keystore + SHA-256 en `strings.xml` y `assetlinks.json`, cuenta de Play Console.
- **Decisión de Ronald:** quiere app nativa. Se recomienda publicar primero solo Android con el TWA (USD 25 único). iPhone queda para después (USD 99 al año, necesita Mac y Capacitor; Apple puede rechazar un envoltorio web por la regla 4.2). Una reescritura nativa de verdad (React Native/Flutter) no se justifica: todo el valor ya está en la web.
- **Pendiente de verificar antes de publicar:** Google Play suele exigir su propio sistema de cobro (comisión 15-30 %) para suscripciones digitales dentro de la app; hoy se cobra por QR de BNB, Binance Pay y RedotPay. Revisar las políticas vigentes de Play para Bolivia antes de pagar la cuenta. No se sabe cómo aplican, no asumirlo.
- **Compilada y probada (2026-10-04):** el TWA compila sin tocar nada (JDK de Android Studio + Gradle 8.4; el único tropiezo fue un `local.properties` con la ruta del SDK mal escapada: usar barras `/`). Instalada en la tablet JMS-L03. Con la huella de la llave de **depuración** en `public/.well-known/assetlinks.json`, Android marca el dominio como `verified` y la barra morada desaparece. **Esa huella es provisoria:** para Play hay que generar la llave de publicación y agregar su SHA-256 como segunda entrada del arreglo. La PWA instalada desde Chrome (WebAPK) es otra instalación distinta y nunca tuvo barra.
- **Visto de paso:** la pantalla de login dice "acceso interno" abajo (jerga que el alumno no entiende). Sin tocar, a decidir.
- **Agentes:** no hacen falta para la app nativa (pasos de una sola vez, con llave y cuenta de Ronald). Útil: `cronista` vigilando que el placeholder de `assetlinks.json` no llegue a producción.

### 2026-10-04 (quinquies) (PUBLICIDAD: primer video de prueba, con voz y efectos, y agentes de marketing mejorados)
- **+** `PUBLICIDAD/` entra al repo (solo lo liviano): guion, brief, agentes, `lecciones.md`, proyecto de motion `motion/axiom-v1/` (HTML determinista por `render(t)`, `render.py`, `warp.py`, `mix.py`), voz y los mp4 de prueba en `final/`. Los frames PNG, las referencias y las descargas quedan en `.gitignore`.
- **+** Video de prueba de 38 s (9:16): motion graphics + voz de Gemini TTS (voz Nika, aprobada por Ronald) + efectos de sonido sintetizados. Es solo una prueba: los videos reales se hacen cuando Axiom esté terminado.
- **+** Agente nuevo `revisor-video` (revisa como alguien que no conoce Axiom) y mejoras a `estratega-marketing` (serie de 3 videos: gancho, lo gratis, Premium), `director-motion` y `productor-audio`. Ideas tomadas de `product-launch-motion`, `claude-video-studio` y `marketing-claude-code`; no se instaló nada de ellos.
- **Pendiente:** corregir la nota "Unidad 01" del cierre (es jerga interna), las etiquetas de años cortadas en la escena 6 y el clip de Flow de la escena 4. Detalle en `PUBLICIDAD/lecciones.md`.
- **+** Entran también agentes de otras sesiones que estaban sin subir (`analista-resolucion`, `analista-temas`, `catalogador-fotos`, `probador-app`, `redactor-explicaciones`), `docs/registro-examenes.md`, `scripts/registro-examenes.mjs` y el catálogo `data/research/fotos/` (solo JSON, sin fotos).

### 2026-10-04 (quater) (datos de cobro reales: QR de BNB, Binance Pay y RedotPay)

Ronald mandó tres QR (BNB, RedotPay con 10 USDT y Binance Pay "RonMarty") y no usa Tigo Money ni cuenta bancaria. Se reemplazaron los datos de demostración de `/pagar`, que era el bloqueante de §8.

- **`src/lib/pagos-config.ts`**: una sola fuente de a dónde se paga. Cada método declara su imagen de QR (`public/pagos/`), la moneda, el usuario o ID, qué comprobante se pide, y si el QR trae un **monto grabado** (`qrMonto`) o una **fecha de vencimiento** (`qrVence`). `/pagar` deja de ofrecer un QR que no corresponde (monto distinto o vencido) en vez de mandar al alumno a escanear algo que su banco va a rechazar.
- **Métodos activos:** `qr_bancario` (BNB, Bs.), `binance_pay` (USDT, usuario `RonMarty`) y `redotpay` (USDT, ID `1939601201`). **Tigo Money y transferencia ya no se ofrecen**, pero siguen en el tipo y en la restricción de la tabla porque hay pagos históricos con esos valores.
- **`src/lib/precios.ts`** suma `PRECIOS_USDT` (pro 5, premium 10, cambio de facultad 5) y las funciones `montoPlanEn` / `montoCambioFacultadEn` / `formatearMonto`. Premium = 10 USDT es lo que ya trae grabado el QR de RedotPay; **los otros dos montos en USDT son una suposición mía** (la misma proporción que en Bs.) y Ronald puede cambiarlos. No hay conversión automática: el tipo de cambio paralelo se mueve y el monto en USDT se fija a mano.
- **`/api/pagos`** ahora valida el método contra la lista (antes aceptaba cualquier texto), calcula el monto en la moneda del método y, si la base rechaza el método por su restricción, responde un mensaje claro en vez de un error de base de datos. `/cuenta` y `/admin/pagos` muestran la moneda (`10 USDT` / `Bs. 100`) y el nombre del método.
- **`supabase/migration-006-pagos-metodos.sql`** amplía la restricción `pagos_metodo_check`. **HAY QUE CORRERLA UNA VEZ en el SQL Editor de Supabase** antes de que alguien pague con Binance o RedotPay; sin eso la base los rechaza (y el alumno ve "todavía no está habilitado"). `schema.sql` ya la incluye para instalaciones nuevas.
- **Textos legales y de precios** actualizados: métodos, que el cripto no se puede deshacer y que los reembolsos en USDT se devuelven en USDT.
- **`src/lib/pagos-config.test.ts`** (11 tests): cada QR existe en `public/`, la restricción de la base admite todos los métodos, el servidor valida el método, el QR con monto solo se ofrece para ese monto, un QR vencido no se ofrece, y `/pagar` ya no tiene datos de demostración.

**El QR de BNB que mandó Ronald es de un solo uso y vence mañana, y no sirve para cobrar de verdad.** Trae **Bs. 100.00 grabados** y dice **"Válido hasta: 5 de octubre de 2026"**. Por eso la pantalla lo oculta solo para el cambio de facultad (Bs. 50) y desde el 6-oct. **Falta un QR de BNB sin monto y sin vencimiento** (un QR de cobro reutilizable): cuando esté, se reemplaza `public/pagos/qr-bnb.png` y en `pagos-config.ts` se ponen `qrMonto: null` y `qrVence: null`. Hasta entonces, desde el 6-oct, el alumno solo ve Binance Pay y RedotPay.

**Decisión de diseño:** las imágenes van en `public/` y no en Supabase Storage. Cambiar un QR requiere subir a `main` (lo hace la IA), pero evita sumar infraestructura el día del lanzamiento. Si se vuelve molesto, el paso siguiente es moverlos a una tabla de configuración.

**Verificado en local:** la pantalla con los tres métodos (premium) y con dos (cambio de facultad), registrar un pago de RedotPay (queda `10 USDT`), y que el servidor rechaza `tigo_money` y un método inventado. **No se probó pagar de verdad con ninguno de los tres.**

**Pendiente:** el alumno sigue sin poder adjuntar la foto del comprobante; el admin aprueba mirando el número que el alumno escribe (§8).

### 2026-10-04 (ter) (Términos y Condiciones y Política de Privacidad)

Era el pendiente de §8 "No hay Términos y Condiciones ni Política de Privacidad": hacen falta para cobrar y para guardar datos de menores, y la tienda de Android los pide. Ronald pidió hacerlos.

- **`/terminos` y `/privacidad`** (`src/app/terminos`, `src/app/privacidad`), públicas, en tuteo, con un resumen corto arriba y secciones numeradas. Estructura común en `src/app/components/LegalPagina.tsx`.
- **Se redactaron desde lo que la app hace de verdad**, leyendo el código antes de escribir: Google con `openid email profile`, tablas con datos del alumno, una sola cookie `httpOnly` de 30 días, ninguna analítica, y qué se le manda a la IA (enunciados fallados y temas, nunca nombre ni correo). La lista de lo verificado está en [`docs/legal-revision.md`](../docs/legal-revision.md).
- **`src/lib/legal.ts`**: fecha de vigencia, ciudad y los datos de contacto en un solo lugar. Los precios salen de `src/lib/precios.ts` (el texto no escribe ningún monto).
- **Enlazadas desde** login ("Al continuar aceptas..."), landing (pie), `/pagar` (junto al botón de registrar el pago), `/precios` y `/cuenta`.
- **`src/lib/legal.test.ts`** (6 tests): existen las páginas, las cuatro pantallas las enlazan, tuteo, sin precios a mano, sin guion largo, y la fecha no se duplica.
- **De paso se corrigió un dato falso del propio alumno:** el login decía "2 simulacros al mes" y `/precios` "2 simulacros por semana". El código (`plan.ts`) da **2 de exámenes pasados y 2 predictivos por semana**. Como los Términos dicen que la descripción de Precios forma parte del contrato, tenía que coincidir.

**Lo que NO está resuelto, y bloquea cobrar:** el titular y el canal de contacto están en `null` en `legal.ts`. Las páginas lo dicen con todas las letras en la sección de contacto, pero **sin canal nadie puede pedir un reembolso ni que le borren los datos**. Ronald tiene que dar un nombre (o razón social) y un correo o WhatsApp.

**Los textos los escribió una IA, no un abogado.** `docs/legal-revision.md` lista las decisiones tomadas por defecto (reembolsos, edad, jurisdicción, límite de responsabilidad) y lo que conviene que mire un abogado boliviano. Y dos cosas que los textos ofrecen y la app no tiene: **borrar la cuenta y salir del ranking no tienen botón** (hoy sería a mano en Supabase).

### 2026-10-04 (bis) (panel lateral del examen en tablet acostada y pantalla ancha)

Era el pendiente que quedó abierto en la entrada de la tablet: el examen era una sola columna larga (50 preguntas por hoja) y en una pantalla ancha sobraba un tercio de la pantalla.

- **`src/app/simulador/[simId]/page.tsx`: desde 1024px de ancho aparece un panel fijo a la derecha** (280px) con un mapa de la hoja en curso: una casilla por pregunta, llena si ya la respondiste, con estrella si la marcaste, y con un borde oscuro la que tienes a la vista. Tocar una casilla lleva a esa pregunta. Arriba, el contador "X de Y respondidas"; abajo, el botón de **continuar a la hoja siguiente / finalizar**, que antes solo estaba al final de una hoja de 50 preguntas.
- **Respeta la regla del examen real** (§6, D6): el panel solo muestra y salta dentro de la HOJA ACTUAL; las hojas anteriores no son navegables y el panel lo recuerda ("Pasar de hoja es irreversible"). No se agregó ninguna forma de volver atrás.
- **Un solo handler para "continuar"** (`intentarContinuar`): lo usan el botón del final de la hoja y el del panel. Antes la lógica vivía en una función anónima dentro del JSX. Si faltan preguntas, muestra el aviso y lleva a la primera sin responder; si no, abre la confirmación.
- **Debajo de 1024px no hay panel**: tablet parada y celular se ven exactamente como antes (verificado a 800x1280 y 390x844).
- **Detalle que costó:** el panel usa `position: sticky` dentro de un hijo de la grilla. Con `items-start` en la grilla el contenedor mide lo mismo que el panel y el sticky no tiene recorrido: el panel desaparecía al hacer scroll. La grilla tiene que estirar al hijo (sin `items-start`). Anotado en el cuaderno.

**Verificado:** tsc, lint (0 errores; las 4 advertencias del archivo ya estaban), 82 tests y build. Con Playwright en 1280x800 y 1024x768: responder tres preguntas, marcar una, saltar desde el panel, y "continuar" con preguntas sin responder (aviso y salto a la primera). **No hay test automático de esta pantalla** (no existe infraestructura de pruebas de UI en el repo) y **no se probó en una tablet física**.

### 2026-10-04 (la tablet: la app instalada dejaba de verse como app de tablet)

Ronald pidió que la app se use **lo mejor posible en celular y en tablet**, y dijo que en tablet es donde más se luce. Se midió antes de tocar: capturas con Playwright a 1280x800 (tablet acostada), 800x1280 (tablet parada), 768x1024, 390x844 y 850x390 (celular acostado), en navegador y con la clase `axiom-pwa`.

**Lo que se encontró (tres causas, ninguna era "falta de pantallas responsive"):**
1. **La app instalada forzaba SIEMPRE la vista de celular.** Dos reglas de `globals.css` (`html.axiom-pwa` y `@media (display-mode: standalone)`) escondían el nav de escritorio y mostraban la hamburguesa sin mirar el ancho. En una tablet instalada se veía el menú de celular y la barra inferior sobre 1280px. Las reglas existían por el caso "celular con Sitio de escritorio activado", que da un viewport de 980px.
2. **El manifest tenía `orientation: "portrait"`**, así que la app instalada quedaba trabada en vertical también en tablet.
3. **Las lecciones y láminas se diseñaron para una columna de celular** (720px la lección, 560px la lámina): en una tablet acostada, una columna chica con 500px vacíos al lado y texto de 13-15px.

**Lo que NO era problema:** el dashboard, practicar, el simulacro (opciones en dos columnas) y la biblioteca ya se adaptaban bien. No se tocaron.

**Qué se cambió:**
- **`globals.css`, un solo criterio de "modo compacto"** para hamburguesa, nav de escritorio y barra inferior: `(max-width: 767px), (max-height: 500px), (max-device-width: 600px)`. Cubre el celular parado, el celular acostado (mide ~850px de ancho pero solo ~390 de alto) y la pantalla física chica (el caso del Sitio de escritorio). Una tablet queda en modo amplio, parada o acostada. Se sacaron los dos forzados de standalone; el umbral pasó de 880 a 768.
- **Tablet parada (768 a 1023px):** el nav amplio entra justo; el quinto link bajaba a otra línea. Se achicó el espaciado en ese rango.
- **`manifest.ts`: `orientation: "any"`.**
- **Lecciones y láminas se escalan con `zoom` por escalones** (`.ax-leccion-escena`, `.ax-lamina-tarjeta`, `.ax-lamina-contenido`): 1.2 desde 900x600, 1.35 desde 1200x900, y las láminas también en tablet parada. `zoom` escala texto, SVG y cajas por igual, así que no cambia el diseño ni hay que tocar las 103 lecciones ni las 64 láminas. Un celular no entra en ningún escalón y se ve idéntico (verificado con captura a 390px).

**Verificado:** tsc, lint (0 errores), 82 tests y build, y capturas antes/después en las cinco medidas. Con `zoom`, `Stage` (el componente que escala las animaciones al ancho disponible) sigue funcionando: se miró la lección de regla de tres, que lo usa.

**Límites, para no sobreprometer:**
- **No se probó en una tablet física.** Un viewport emulado no dice nada del tacto ni del teclado en pantalla.
- `max-device-width` está deprecada en el estándar pero Chrome de Android la sigue respetando. Si algún día deja de hacerlo, el celular con Sitio de escritorio vuelve a ver el nav amplio; no se rompe nada más.
- `zoom` no existía en Firefox antes de la 126: ahí se ve como antes.
- Observación vieja, no de esta tanda: en `regla-de-tres` las escenas con `Stage` quedan ~25px corridas a la izquierda del centro de la columna, con o sin zoom.
- La app de Play Store (`android/`) sigue **sin compilar ni firmar** (§5.1). Lo de arriba aplica igual a la web instalada y a la TWA, porque la TWA muestra la misma web.

**Para quien siga:** el servidor de desarrollo de Turbopack sirvió un CSS viejo después de agregar un bloque a `globals.css` (la regla nueva no llegaba al navegador aunque PostCSS la compilaba bien por separado). Se arregló matando el proceso y borrando `.next`. Anotado también en `docs/lecciones-agentes.md`.

> **Entradas del 30-sep-2026 hacia atrás:** están en [docs/bitacora-historial.md](./docs/bitacora-historial.md), sin cambios. Buscá ahí si necesitás el detalle de una tanda vieja (Económicas, auditoría de figuras, Medicina, agentes iniciales).

---

*Fin de la bitácora v1.9 — Crecé conmigo.*

