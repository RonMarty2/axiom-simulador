# Plan de refuerzo intermitente

Diseñado por `disenador-refuerzo` el 1-nov-2026. Es un plan: no se tocó `src/`, no se commiteó y no se corrió ningún comando de prueba. Lo ejecuta `agy` en un `git worktree` (`docs/estado-trabajo.md:54`). Claude lo verifica con `verificador` y commitea uno por lote (`docs/estado-trabajo.md:55-58`).

Casillas: `[ ]` pendiente, `[x]` hecho. Los textos al alumno van en tuteo y la prosa del doc en rioplatense (`CLAUDE.md:11-12`).

## 0. Resumen y hallazgos que condicionan el plan

AXIOM no registra hoy ninguna señal de hábito, solo resultados de simulacros.

- No hay racha, ni "última actividad", ni evento de lección terminada.
- Lo que sí hay y alcanza para medir: `historial` (una fila por simulacro, con `fecha` y `desglose` por área) y `errores` (con `caja`, `proximo` y `dominada_en`).
- Todo el refuerzo se puede montar sobre esos datos, sin tablas nuevas.

Cuatro hallazgos cambian el diseño:

1. **Hay una falsedad visible hoy, y tiene que arreglarse antes de sumar cualquier refuerzo.** `src/app/simulador/[simId]/resultados/page.tsx:68` excluye "el simulacro actual" con `h.id !== simId`.
   - `h.id` es `h-…` (`src/lib/data-store.ts:484`) y `simId` es `sim-…` (`src/lib/axiom/simulador-builder.ts:48,189,346`), así que nunca coinciden.
   - Resultado: `anterior` es el simulacro que se acaba de rendir, la diferencia da 0 y el chip de `:281` dice "= mismo puntaje que el anterior" siempre.
   - Es la regla dura 1 rota. La comparación correcta es la mejor base fija para un refuerzo honesto.
2. **El simulacro no da feedback mientras se rinde** (`src/app/simulador/[simId]/page.tsx:143-158` solo guarda la letra). La corrección llega recién en resultados. Un refuerzo por respuesta correcta sería imposible, y mostrar "acertaste" durante el examen rompería el formato del examen real. Todo el refuerzo va después de finalizar.
3. **"Hoy" es ambiguo en el código actual.** `historial.fecha` se guarda con `toISOString()`, o sea UTC (`src/lib/data-store.ts:485`), y La Paz es UTC-4. Un simulacro rendido a las 21:00 de La Paz cae al día siguiente en UTC. `inicioSemanaISO` usa la hora local de la máquina (`src/lib/plan.ts:76-82`), así que servidor y celular discrepan. Todo cálculo de días del refuerzo usa un desfase fijo de -240 min, sin depender de la zona de la máquina.
4. **Los tests corren con `node --test` y sin alias `@/`.** `package.json` define `"test": "node --test \"src/**/*.test.ts\""`. Los módulos puros tienen que usar imports relativos con extensión `.ts`, como `src/lib/avisos.ts:21-22` y `src/lib/axiom/repaso.test.ts:3`. Un `import "@/lib/..."` de valor rompe el test.

## 1. Inventario de eventos de esfuerzo que ya existen

### 1.1 Eventos y dónde viven

| # | Evento | Dónde ocurre (archivo:línea) | Dónde se guarda | Qué recibe el alumno hoy |
|---|---|---|---|---|
| 1 | Responder una pregunta | `src/app/simulador/[simId]/page.tsx:143-158` (opción), `:162-180` (texto), `:182-195` (marcar) | `localStorage` por `guardarSimulador` (`:151`, `:174`) y PATCH best-effort a `/api/axiom/simulador/[id]` (`:153-157`) | Solo "N de M respondidas" (`:255`). Sin feedback de acierto |
| 2 | Terminar una hoja (área) del simulacro | `src/app/simulador/[simId]/page.tsx:234-243` (`intentarContinuar`), modal `:639-688` (avance en `:675-679`) | Solo `useState` (`areaActualIdx`, `:33`). **No se guarda** | "Hoja i de n" (`:441`, `:572`) |
| 3 | Terminar un simulacro (manual o por tiempo) | `finalizar` en `src/app/simulador/[simId]/page.tsx:79-93`. El cronómetro dispara lo mismo al llegar a 0 (`:101-115`, llamada en `:109`) | POST `src/app/api/axiom/simulador/[id]/finalizar/route.ts:10-116`: califica `:58`, `updateSimulador` `:60-66`, historial `:83-100`, stats del usuario `:102-110` | Pantalla de resultados con nota, desglose y revisión |
| 4 | Fila de historial | `agregarHistorial` en `src/lib/data-store.ts:481-495`. Tipo en `:97-112` (`fecha`, `nota`, `correctas`, `incorrectas`, `sin_responder`, `desglose`, `simulador_id`) | Tabla `historial`. `simulador_id` viene de `supabase/migration-005-historial-simulador.sql` | `/historial` (`src/app/historial/page.tsx:69-87`), `/progreso`, dashboard |
| 5 | Error nuevo guardado | `filasDespuesDeExamen` en `src/lib/axiom/errores-db.ts:38-68` y `actualizarErrores` en `:80-113`. Se llama desde `finalizar/route.ts:72-77` | Tabla `errores` (migraciones 003 y 007) | `/errores` (`src/app/errores/page.tsx:94-103`) |
| 6 | Error corregido (acierto en su fecha, sube de caja) | `programar` en `src/lib/axiom/repaso.ts:22-31`. Intervalos en `:10` (`[1, 3, 7]`) | `errores.caja` y `errores.proximo` | Nada específico. El alumno no se entera de que subió de caja |
| 7 | Error dominado (3 aciertos seguidos) | `src/lib/axiom/repaso.ts:29` (`dominada_en`) | `errores.dominada_en` (no se borra) | Solo un conteo: `/api/axiom/errores/route.ts:37` y `src/app/errores/page.tsx:56` ("Ya dominaste N") |
| 8 | Repaso hecho (modo `mis_errores`) | Armado en `src/lib/axiom/simulador-builder.ts:324-345`. Solo entran las que tocan (`repaso.ts:34-37`). Entrada en `src/app/practicar/page.tsx:394-413` y `src/app/errores/page.tsx:84-90` | Es un simulacro más, entra al historial con `modo: "mis_errores"` | Aviso en `src/app/practicar/page.tsx:183-188` |
| 9 | Practicar un área débil desde resultados | `practicarArea` en `src/app/simulador/[simId]/resultados/page.tsx:123-147`, botón en `:640-648`. `reforzarMisErrores` en `:149-180` | Un simulacro nuevo | Botón "Practicar 10 →" |
| 10 | Mejora por área (derivable) | El historial ya guarda el porcentaje por área en `desglose` (`data-store.ts:110`). Hoy solo se promedia en `src/app/progreso/page.tsx:75-86` | `historial.desglose` | Barras por área en `/progreso` (`:135-155`) y curva (`:133`, `:183-226`) |
| 11 | Día con actividad (derivable) | No existe. Se deduce de `historial.fecha` (`/api/historial/route.ts:5-9`) | `historial.fecha` | Nada. Hay "Esta semana: N" (`src/app/dashboard/page.tsx:65`, `:91`), pero con la semana en hora local |
| 12 | Lección terminada / escena vista | `src/app/aprende/_components/LeccionShell.tsx:22-24` (índice en `useState`), "Terminar" es un `Link` sin registro (`:112-118`) | **No se guarda nada** | Barra de progreso (`:54-60`) y contador `i / n` (`:49-51`) |
| 13 | Quiz dentro de lección | `PracticaFinal` (`src/app/aprende/_components/pedagogia.tsx:167-234`), `LecturaQuiz` (`:253-372`), `MiniQuiz` (`:470-522`), `AutoCheck` (`:528-588`) | Solo `useState`. No se guarda | Corrección inmediata con ✓/✗ y explicación (`:202`, `:334`, `:506`) |

**No son esfuerzo y nunca se refuerzan:**

- Abrir la app, entrar a `/dashboard`, `/progreso` o `/historial`.
- Iniciar un simulacro (`src/app/practicar/page.tsx:149-170`; es una elección, no un logro).
- Tiempo en pantalla.

### 1.2 Lo que NO existe (hay que proponerlo, no asumirlo)

- Última actividad y racha. El modelo `Usuario` (`src/lib/data-store.ts:55-68`) no guarda nada de eso. `BITACORA.md:444` lo tiene como pendiente "Planear antes de tocar código".
- Qué errores se dominaron en *este* simulacro. `actualizarErrores` devuelve solo cuántas filas cambió (`errores-db.ts:105`, `:112`), y `finalizar/route.ts:72` ni usa el valor.
- Persistencia del avance de lecciones. La métrica "cuántas escenas completa un usuario" sigue en `BITACORA.md:457`.
- Un registro de "sorpresa mostrada". Este plan evita crearlo (ver §5).

### 1.3 Defectos y pendientes encontrados leyendo (ver §7)

El de `resultados/page.tsx:68` va como prerrequisito en el Lote 2. Los demás quedan anotados como pendientes fuera de lote.

## 2. Reglas del diseño, aplicadas

Son las reglas duras del agente, traducidas a decisiones de este plan.

1. **La verdad es fija.** Nota, desglose, corrección y explicación no cambian. La sorpresa es una línea de texto *extra* con un dato real calculado del historial. Nunca se inventa un número y nunca reemplaza una explicación.
2. **Solo se premia esfuerzo real.** Un simulacro cuenta si el alumno respondió al menos la mitad (`esfuerzoMinimo = 0.5`). La nota no cuenta: un 30/100 con esfuerzo también reconoce constancia. Entregar en blanco no premia.
3. **Una tirada por simulacro terminado, determinista y sin "pesca".** La tirada es una función pura de `(usuario, simulacro)`: el azar sale de `fnv1a(usuarioId + "|" + simId)`. Recargar la pantalla da el mismo resultado, así que no se puede apretar F5 hasta que salga el premio. Una tirada nueva exige esfuerzo nuevo.
4. **Tope y salida fácil.** Máximo 2 sorpresas por visita a resultados y 5 por día La Paz. Es un bloque en la página (no un modal): no tapa nada, no se repite en bucle, sin sonido, sin cuenta regresiva y sin "pierdes tu racha". Lleva partículas y brillo breves (menos de 2 s, se apagan con `prefers-reduced-motion`), decisión de Ronald del 1-nov. Si se corta una pausa, el texto habla de retomar, nunca de lo perdido. Se propone un interruptor "No mostrar mensajes de ánimo" (D5).
5. **El plan de pago no cambia nada.** `decidirRefuerzo` no recibe plan, y un test lo vigila leyendo el código fuente.
6. **Una fuente de verdad.** Probabilidades y topes viven solo en `src/lib/refuerzo-config.ts`, con tests que fallan si cambian sin querer. Nada de números en el JSX.
7. **Funciona sin red.** La lógica es pura y los topes viven en `localStorage` (como el patrón de `src/lib/sim-storage.ts` y `errores-storage.ts`). Si falla `/api/historial`, simplemente no hay sorpresa.

## 3. Mapa evento → refuerzo

`p` es la probabilidad de que salga la sorpresa cuando el evento es elegible. El tope es global: 2 por visita y 5 por día.

| Evento | Elegible cuando… | Base fija (siempre, sin azar) | Sorpresa variable | `p` | Por qué no es manipuladora |
|---|---|---|---|---|---|
| `simulacro_terminado` | Terminó un simulacro con `esfuerzoReal` (≥ 50 % respondido), cualquier nota | Nota, desglose y comparación honesta con el simulacro anterior | Línea con el total real de simulacros completados | 0,25 | El dato es verdadero y verificable. Si no sale, no se pierde nada: la base fija ya está |
| `mejora_area_debil` | Un área tenía promedio previo < 60 (con ≥ 2 simulacros previos) y ahora subió ≥ 10 puntos | El desglose por área ya visible | "En {área} subiste de {antes} % a {ahora} %" | 0,60 | Evento raro y real. `p` alta porque se premia una mejora genuina, no un reparto al azar |
| `error_corregido` | Simulacro `mis_errores` con ≥ 1 acierto (cada acierto avanza la caja, `repaso.ts:28-31`) | Línea fija "Repasaste N preguntas que habías fallado: acertaste K" | "Esta vez acertaste K que habías fallado antes" | 0,35 | Refuerza el comportamiento que la app más quiere (repasar) sin esconder el avance real |
| `retorno_tras_pausa` | Había ≥ 1 día calendario sin actividad antes de hoy y hoy terminó un bloque con esfuerzo | Nada (no se muestra pausa ni culpa) | "Volviste a practicar después de {d} días" | 0,50 | Premia la acción difícil (retomar). Prohibido nombrar "racha perdida" |
| `error_dominado` | `dominada_en` posterior al inicio del simulacro | Línea fija "Dominaste N preguntas: ya no te toca repasarlas" (siempre, N ≥ 1) | Ninguna | 1 (fijo) | Hito discreto y real. Ocultarlo al azar sería arbitrario, así que es razón fija y no cuenta para el tope |
| `dia_con_actividad` | Siempre que haya historial | "Practicaste N de los últimos 7 días" (solo si N ≥ 1) | Ninguna | 1 (fijo) | Ventana móvil de 7 días, no racha estricta. No se muestra nunca un 0 |
| `hoja_terminada`, `respuesta`, cronómetro | No aplica | Lo que ya existe | **Ninguna, a propósito** | 0 | Es el simulacro tipo examen real. No se interrumpe |
| `leccion_terminada` | Hoy no se registra (§1.2) | La barra de progreso existente | Ninguna hasta el Lote 5 | 0 | No hay dato real que mostrar |

### 3.1 Cómo se decide

1. Se arma la lista de eventos elegibles con `elegiblesDe(contexto)`.
2. Se toma el de mayor prioridad: `retorno_tras_pausa` > `error_corregido` > `mejora_area_debil` > `simulacro_terminado`.
3. Se tira **una sola vez** con la `p` de ese evento. Si falla, no hay segunda tirada con un evento menor. Es simple de auditar y de testear.
4. Antes de tirar se chequea el tope: si `sorpresasHoy >= 5` o el interruptor está apagado, no hay sorpresa y no se llama al azar.

Frecuencia esperada: con un simulacro por día y sin eventos raros, sale una línea cada 4 días en promedio. Con retorno o mejora real, sale cerca de la mitad de las veces. Nunca más de 2 al día.

### 3.2 Catálogo de textos propuestos (tuteo; Ronald los aprueba, ver D6)

- `simulacro_terminado`: "Terminaste otro simulacro. Con este ya son {n} los que completaste."
- `mejora_area_debil`: "En {área} subiste de {antes} % a {ahora} % frente a tus simulacros anteriores."
- `error_corregido`: "Esta vez acertaste {k} {pregunta|preguntas} que habías fallado antes."
- `retorno_tras_pausa`: "Volviste a practicar después de {d} {día|días} sin hacerlo. Retomar es lo más difícil y ya lo hiciste."
- Fijo `error_dominado`: "Dominaste {n} {pregunta|preguntas}: ya no te toca repasarla(s)."
- Fijo repaso: "Repasaste {n} preguntas que habías fallado: acertaste {k}."
- Fijo constancia: "Practicaste {n} de los últimos 7 días."

Todos los números salen de los datos y ninguno está escrito a mano. No se usa ninguna cifra de "otros alumnos".

### 3.3 Diseño aprobado por Ronald (1-nov, visto en la pantalla real a 375 px)

- La pantalla de resultados sigue crema como hoy. Solo el bloque del premio usa el lenguaje de los anuncios: color pleno de la facultad (`var(--accent)`), resplandor, cifras en el tono claro, partículas y brillo.
- El color sale de `[data-facultad]` en `globals.css`; el tono claro por facultad está en `docs/identidad-visual.md`. Prohibido escribir hex a mano en el JSX.
- Va justo debajo de la cabecera (etiquetas) y antes de la tarjeta "A reforzar". Franja "Practicaste N de los últimos 7 días" fija debajo.
- Cifras con números alineados (no los antiguos de Crimson Pro): `font-variant-numeric: lining-nums`.
- Maqueta de referencia: https://claude.ai/artifact/6p3M8SWT5uxMSJ3oFxFDZC (versión 6).

## 4. Lo que queda fijo a propósito

El refuerzo se monta encima de esto y no lo reemplaza.

1. **Corrección y explicación.** `PreguntaRevision` (`resultados/page.tsx:654`) y los ✓/✗ de los quizzes de lección (`pedagogia.tsx:202,334,506`). Siempre iguales.
2. **Nota y desglose.** `evaluarSimulador` (`simulador-builder.ts:213-286`) y su pantalla (`resultados/page.tsx:205-206,265,347-349`). Sin azar.
3. **Mensajes por nota.** `nivelDeNota` (`resultados/page.tsx:565-596`) y `tituloFb` (`:239`). Dependen de la nota, nunca de una tirada.
4. **El simulacro mientras se rinde.** `src/app/simulador/[simId]/page.tsx`: cero sorpresas al responder, al pasar de hoja (`:675-679`) ni en el cronómetro (`:730-748`). Siguen fijos los contadores "N de M respondidas" y "Hoja i de n".
5. **El repaso espaciado.** `DIAS_POR_CAJA = [1, 3, 7]` (`repaso.ts:10`). Los intervalos no se aleatorizan: eso sería esconder cuándo toca repasar.
6. **Los candados freemium.** `src/app/api/axiom/simulador/route.ts:46-90` y `src/lib/plan.ts:10-11`. El refuerzo no se vende ni se condiciona al plan.
7. **Barras y contadores de progreso.** Dashboard (`src/app/dashboard/page.tsx:87-92`), `/progreso` (`:118-131`), `LeccionShell` (`:49-60`).
8. **Sin racha estricta.** Se usa la ventana de 7 días. Nunca "pierdes tu racha", y no se renderiza ningún contador en 0.
9. **Sin comparación social.** Ranking, "Top 10" y similares no se usan como refuerzo.
10. **Sin push ni cuenta regresiva.** `BITACORA.md:451` (push) y `BITACORA.md:446` (fecha de examen con cuenta regresiva: idea descartada).

## 5. Métricas

Salen de lo que ya guarda la app. No se agrega ningún evento nuevo de espionaje y no se registra qué sorpresa se mostró.

| # | Métrica | Fórmula | Dato |
|---|---|---|---|
| M1 | Retorno al día siguiente | De los usuarios con ≥ 1 simulacro el día D (La Paz), % con ≥ 1 el día D+1 | `historial.fecha` + `diaLaPaz` |
| M2 | Retorno en 7 días | De los activos el día D, % con ≥ 1 simulacro entre D+1 y D+7 | `historial.fecha` |
| M3 | Bloques por usuario activo por semana | Media y mediana de simulacros por semana lunes-domingo La Paz entre usuarios con ≥ 1 | `historial` |
| M4 | Días con práctica por semana | Días distintos con actividad, por usuario activo | `historial` |
| M5 | Errores dominados por semana | Conteo de `errores.dominada_en` por semana | `errores`. Solo por usuario hoy (`getErroresUsuario`); fase 2 |

**Vigilancia (no deben empeorar):**

- Nota media por simulacro.
- % de simulacros entregados con menos del 50 % respondido. Si sube, el refuerzo está empujando a "terminar vacío".
- Tiempo por simulacro.

**Cómo leerlas, sin autoengaño:**

- No se interpreta ninguna diferencia con menos de 30 usuarios activos por semana (`MIN_USUARIOS_PARA_LEER = 30`, en la config). Hoy no hay alumnos de prueba (`BITACORA.md:440`). Con n chico se reportan números absolutos y se dice "sin muestra suficiente".
- La comparación es antes/después de la fecha de lanzamiento. No se propone grupo de control (D7).
- Resultado en `GET /api/admin/retencion` (solo admin, Lote 4). Nunca en `/api/estadisticas-globales`, que es público.

## 6. Lotes para `agy`

Un lote cerrado por vez. Cada lote es un commit propio, después de `verificador`. Antes del Lote 1: `git fetch origin main`, leer `docs/lecciones-agentes.md` y anotar el número base de `npm test` (536 el 30-oct, `docs/estado-trabajo.md:29`). Al cerrar cada lote: entrada en `BITACORA.md` y actualizar `docs/estado-trabajo.md`.

### Lote 0: arreglo del chip "vs tu último examen" (hecho antes de cualquier refuerzo)

- [x] **Objetivo:** que `resultados/page.tsx` excluya el simulacro actual comparando por `simulador_id` y no `h.id !== simId` (`:68`). Con ids reales el chip deja de decir siempre "= mismo puntaje".
- **Archivos:** `src/app/simulador/[simId]/resultados/page.tsx` y, si hace falta, un test chico de la función de comparación.
- **Comprobación:** `npx tsc --noEmit`, `npm run lint`, `npm test`.
- **NO tocar:** nada más.

### Lote 1: núcleo puro, config y textos (sin UI)

- [x] **Objetivo:** toda la lógica de decisión como funciones puras, con azar inyectable y tests fuertes. No se toca ninguna pantalla.
- **Archivos nuevos:**
  - `src/lib/refuerzo-config.ts`
  - `src/lib/refuerzo.ts`
  - `src/lib/refuerzo-config.test.ts`
  - `src/lib/refuerzo.test.ts`
- **Reglas de import:** solo relativos con `.ts` (por ejemplo `./refuerzo-config.ts`). Nada de `@/` en valores, ni React ni `Date.now()` oculto: la hora entra por parámetro.
- **`refuerzo-config.ts`** exporta un `REFUERZO` `as const`:
  - `zonaOffsetMin: -240`
  - `esfuerzoMinimo: 0.5`
  - `tope: { porVisita: 2, porDia: 5 }`
  - `prioridad: ["retorno_tras_pausa", "error_corregido", "mejora_area_debil", "simulacro_terminado"]`
  - `probabilidad: { retorno_tras_pausa: 0.6, error_corregido: 0.45, mejora_area_debil: 0.7, simulacro_terminado: 0.33 }`
  - `retorno: { pausaMinDias: 1 }`
  - `mejora: { previosMin: 2, subidaMin: 10, umbralDebil: 60 }`
  - `ventanaDias: 7`
  - `MIN_USUARIOS_PARA_LEER: 30`
  - `export type EventoRefuerzo`
- **Funciones puras de `refuerzo.ts`:**
  - `fnv1a(texto: string): number`
  - `crearAzar(semilla: number): () => number` (mulberry32, devuelve [0, 1))
  - `diaLaPaz(iso: string): string` ("YYYY-MM-DD" con desfase fijo)
  - `inicioDiaLaPazISO(iso: string): string`
  - `desdeValido(s: string | null): string | null`
  - `esfuerzoReal(r: { correctas: number; incorrectas: number; sin_responder: number }): boolean`
  - `diasDePausa(fechas: string[], ahora: string): number | null` (días calendario sin actividad antes de hoy; excluye hoy; `null` si no hubo actividad previa)
  - `diasConPractica(fechas: string[], ahora: string, ventana?: number): number`
  - `mejoraEnAreaDebil(actual: Record<string, number>, previos: Record<string, number>[]): { area: string; antes: number; ahora: number } | null` (mayor subida; empate por orden alfabético)
  - `elegiblesDe(ctx): Elegible[]`, con `ctx = { esfuerzo, ahora, fechasPrevias, desgloseActual, desglosesPrevios, modo, correctasRepaso, totalSimulacros }`
  - `decidirRefuerzo(e: { elegibles: Elegible[]; sorpresasHoy: number; activo: boolean }, azar: () => number): DecisionRefuerzo | null`
  - `plural(n: number, uno: string, varios: string): string`
  - `textoRefuerzo(d: DecisionRefuerzo): string`
  - `textoRepasoFijo(n: number, k: number): string`
  - `textoDominadas(n: number): string` (vacío si `n < 1`)
  - `textoConstancia(n: number): string` (vacío si `n < 1`)
- **Tests exactos que deben existir:**
  - `refuerzo-config.test.ts`:
    - "la config de refuerzo no cambió sin querer" (`deepStrictEqual` contra el literal completo)
    - "toda probabilidad es mayor que 0 y menor que 1"
    - "el tope por visita no supera el tope por día (visita 2, día 5)"
    - "la lista de prioridad coincide con los eventos que tienen probabilidad"
    - "la config no menciona plan, precio ni premium" (lee el archivo fuente)
  - `refuerzo.test.ts`:
    - "fnv1a es determinista y distingue entradas"
    - "crearAzar repite la secuencia con la misma semilla y queda en [0, 1)"
    - "con p = 0,33 sobre 20000 semillas la frecuencia cae entre 0,31 y 0,35"
    - "diaLaPaz: 03:59:59Z es el día anterior y 04:00:00Z el mismo día" (salidas fijas, sin depender de TZ)
    - "inicioDiaLaPazISO devuelve 04:00:00.000Z del mismo día La Paz"
    - "esfuerzoReal: 10 de 20 sí, 9 de 20 no, 0 preguntas no, todo sin responder no, nota baja con esfuerzo sí"
    - "diasDePausa: sin previas es null, ayer es 0, anteayer es 1, repetir fechas el mismo día no cambia"
    - "diasConPractica: duplicados del mismo día cuentan una vez, el día 8 queda fuera, máximo 7"
    - "mejoraEnAreaDebil: menos de 2 previos null, área fuerte null, subida de 9 null, subida de 10 sí, empate alfabético, área sin previos se ignora"
    - "decidirRefuerzo: con 5 sorpresas hoy devuelve null y no llama al azar"
    - "decidirRefuerzo: apagado devuelve null"
    - "decidirRefuerzo: sin elegibles devuelve null y no llama al azar"
    - "decidirRefuerzo: la prioridad gana a un evento menor"
    - "decidirRefuerzo: azar 0,99 no sale y azar 0,0 sí sale"
    - "misma entrada y misma semilla dan el mismo resultado (recargar no cambia)"
    - "refuerzo.ts no depende del plan" (el fuente no contiene `esPago`, `premium`, `@/lib/plan` ni `@/lib/precios`)
    - "los textos no usan voseo" (`podés|tenés|hacé|sos|vos|mirá|fijate`)
    - "los textos no tienen emojis ni culpa ni cuenta regresiva" (`pierd|perdiste|racha|castig|quedan|expira|apúrate`)
    - "los textos no inventan cifras ni comparan con otros" (los dígitos del texto son exactamente los de los datos; sin `compañeros|otros alumnos|la mayoría`)
    - "plural correcto: 1 pregunta y 2 preguntas, 1 día y 3 días"
    - "textoDominadas y textoConstancia con 0 devuelven cadena vacía"
- **Comprobación:**
  ```bash
  node --test src/lib/refuerzo.test.ts src/lib/refuerzo-config.test.ts
  npx tsc --noEmit
  npm run lint
  npm test
  ```
- **Cierre:** `npm test` sube solo por los tests nuevos y no baja ninguno de los 536.
- **NO tocar:** `src/app/**`, `src/lib/axiom/**`, `supabase/**`, `src/lib/plan.ts`, `src/lib/data-store.ts`.

### Lote 2: base honesta y primera sorpresa en resultados

- [x] **Depende de:** Lote 1 y decisiones D1, D3, D4 y D6.
- [x] **Objetivo:** arreglar el chip falso "vs tu último examen" y mostrar `simulacro_terminado` y `mejora_area_debil` en `/simulador/[simId]/resultados`.
- **Archivos nuevos:**
  - `src/lib/historial-calculos.ts` y `src/lib/historial-calculos.test.ts`
  - `src/lib/refuerzo-storage.ts` y `src/lib/refuerzo-storage.test.ts`
  - `src/app/components/Reconocimiento.tsx`
- **Archivo a modificar:** `src/app/simulador/[simId]/resultados/page.tsx`.
  - Corregir `:62-73`: reemplazar `h.id !== simId` por `h.simulador_id !== simId` y completar el tipo inline de `:65`.
  - Pedir `me.usuario.id` en `:63`, que hoy descarta todo menos el plan.
  - Calcular la decisión una vez que haya simulador calificado e historial cargado.
  - Renderizar `<Reconocimiento />` justo debajo del bloque de chips (después de `:292`, dentro del hero) y no como tarjeta nueva.
- **Funciones puras:**
  - `anteriorA(historial: { simulador_id?: string; fecha: string; nota: number }[], simId: string): { nota: number } | null`
  - En `refuerzo-storage.ts`:
    - `normalizarEstado(x: unknown): EstadoRefuerzo` (ignora JSON roto y valores raros)
    - `sorpresasDeHoy(estado, ahoraISO): number`
    - `decisionGuardada(estado, simId): DecisionRefuerzo | null | undefined`
    - `aplicarDecision(estado, simId, decision, ahoraISO): EstadoRefuerzo` (idempotente por `simId`, reinicia el contador al cambiar de día La Paz, guarda como máximo 20 decisiones)
    - `refuerzoActivo(): boolean`, con capa fina de `localStorage` en `axiom_refuerzo_v1` y `axiom_refuerzo_off`, dentro de `try/catch`, como `src/lib/axiom/errores-storage.ts`
- **Tests exactos:**
  - `historial-calculos.test.ts`:
    - "anteriorA excluye el simulacro actual por simulador_id y no por id"
    - "anteriorA con ids reales h-… y sim-… devuelve el anterior y no el actual" (regresión del bug)
    - "anteriorA devuelve null con un solo examen"
    - "anteriorA toma el más reciente distinto del actual aunque lleguen desordenados"
  - `refuerzo-storage.test.ts`:
    - "aplicarDecision es idempotente para el mismo simId"
    - "el contador se reinicia al pasar de día en La Paz"
    - "sorpresasDeHoy cuenta solo las de hoy"
    - "solo se guardan las últimas 20 decisiones"
    - "un estado corrupto se ignora y vuelve vacío"
- **Comprobación:**
  ```bash
  node --test src/lib/historial-calculos.test.ts src/lib/refuerzo-storage.test.ts
  npx tsc --noEmit
  npm run lint
  npm test
  npm run build
  ```
  Manual, a cargo de Claude: abrir `/simulador/<id>/resultados` en celular (375 px) y tablet, y comprobar tres cosas:
  - El chip de comparación ya muestra diferencias reales.
  - Recargar la misma página muestra la misma sorpresa o la misma ausencia.
  - Sin red o con `/api/historial` caído, la pantalla sigue igual que antes.
- **Cierre:** el chip falso deja de existir. Una sorpresa por visita como máximo. Una tirada nueva solo con un simulacro nuevo.
- **NO tocar:** `evaluarSimulador`, `finalizar/route.ts`, `nivelDeNota`, `tituloFb`, la revisión de preguntas (`:454-536`), `src/lib/plan.ts`, la base de datos.

### Lote 3: errores corregidos y retorno tras pausa

- [x] **Depende de:** Lote 2.
- [x] **Objetivo:** hacer visible el avance de «Mis errores» (base fija) y activar los eventos `error_corregido` y `retorno_tras_pausa`.
- **Archivos a modificar:**
  - `src/lib/axiom/repaso.ts`: agregar `contarDominadasDesde(es: Partial<EstadoRepaso>[], desdeISO: string): number`.
  - `src/lib/axiom/repaso.test.ts`: tests nuevos.
  - `src/app/api/axiom/errores/route.ts`: `GET(req: Request)` lee `?desde=<ISO>` con `desdeValido`, y suma `dominadas_desde` al JSON (`:30-38`). Es un campo aditivo, no cambia nada existente.
  - `src/app/errores/page.tsx`: pedir `?desde=` con `inicioDiaLaPazISO(ahora)` y mostrar `textoDominadas(n)` en el banner (`:84-88`) cuando `n ≥ 1`.
  - `src/app/simulador/[simId]/resultados/page.tsx`: pedir `?desde=` con `simulador.fecha_inicio` y mostrar `textoDominadas` y `textoRepasoFijo` (este último solo si `config.modo === "mis_errores"`) dentro de la tarjeta de feedback (`:329-337`). Sumar `error_corregido` y `retorno_tras_pausa` a `elegiblesDe`.
- **Tests exactos:**
  - En `repaso.test.ts`:
    - "contarDominadasDesde cuenta solo las dominadas desde esa fecha"
    - "contarDominadasDesde ignora las que no están dominadas y las dominadas antes"
    - "contarDominadasDesde con lista vacía devuelve 0"
  - En `refuerzo.test.ts`:
    - "desdeValido acepta un ISO y rechaza basura o vacío"
    - "textoRepasoFijo usa singular y plural"
    - los tests de texto del Lote 1 se extienden a `textoRepasoFijo` y `textoDominadas`
- **Comprobación:**
  ```bash
  node --test src/lib/axiom/repaso.test.ts src/lib/refuerzo.test.ts
  npx tsc --noEmit
  npm run lint
  npm test
  npm run build
  ```
  Manual: hacer un repaso en dev con un error que toque su 3.er acierto y comprobar que aparece la línea fija "Dominaste…". Comprobar también que `/api/axiom/errores` sin `desde` devuelve lo mismo que antes.
- **Cierre:** con una pausa real en el historial, la sorpresa `retorno_tras_pausa` puede salir (p = 0,50) y nunca menciona una racha.
- **NO tocar:** `programar` y `DIAS_POR_CAJA` (los intervalos son fijos), `errores-db.ts`, `supabase/migration-007-*.sql`, `DELETE /api/axiom/errores`, `src/app/practicar/**`.

### Lote 4: constancia visible y métricas

- [x] **Depende de:** Lote 3 y decisión D2.
- [x] **Objetivo:** mostrar "Practicaste N de los últimos 7 días" (sin racha) y poder leer M1 a M4.
- **Archivos nuevos:**
  - `src/lib/metricas-retencion.ts` y `src/lib/metricas-retencion.test.ts`
  - `src/app/api/admin/retencion/route.ts` (solo admin, con `isAdmin()` como `src/app/api/estadisticas-globales/route.ts`; usa `getHistorial()`, `data-store.ts:459`)
- **Archivos a modificar:**
  - `src/app/dashboard/page.tsx`: una línea bajo el saludo (`:82-84`) con `textoConstancia`, que no se renderiza cuando N es 0.
  - `src/app/progreso/page.tsx`: tarjeta opcional "Días con práctica" en el bloque de `:118-131`.
- **Funciones puras:**
  - `retornoDiaSiguiente(filas: { usuario_id: string; fecha: string }[]): { activos: number; volvieron: number }`
  - `retornoSemana(filas): { activos: number; volvieron: number }`
  - `bloquesPorUsuarioActivoSemana(filas): { media: number; mediana: number; usuariosActivos: number }`
  - `semanaLaPaz(iso: string): string` (lunes a domingo La Paz)
  - `resumenMetricas(filas): { ..., insuficiente: boolean }`, con `insuficiente` si hay menos de 30 usuarios activos
- **Tests exactos:**
  - "retornoDiaSiguiente excluye a los usuarios que no estuvieron activos el día D"
  - "retornoSemana cuenta solo D+1 a D+7"
  - "la semana La Paz cierra el domingo a las 23:59 La Paz (no el lunes UTC)"
  - "mediana y media con número par e impar de usuarios"
  - "resumenMetricas marca insuficiente con menos de 30 usuarios activos"
  - "textoConstancia(0) es vacío y textoConstancia(3) dice 3 de los últimos 7 días"
- **Comprobación:**
  ```bash
  node --test src/lib/metricas-retencion.test.ts
  npx tsc --noEmit
  npm run lint
  npm test
  npm run build
  ```
  Manual: sin sesión de admin, `Invoke-WebRequest http://localhost:3001/api/admin/retencion` debe dar 403. Con admin, devuelve JSON con `insuficiente: true` mientras no haya 30 usuarios activos.
- **Cierre:** las métricas se leen con un solo `GET`, y hay un registro en BITACORA de la fecha de lanzamiento de los Lotes 1 a 3 (punto de corte antes/después).
- **NO tocar:** `/api/estadisticas-globales` (es público), `src/lib/data-store.ts`, `supabase/**`.

## 7. Pendientes fuera de lote (anotados, no se mezclan)

- Ruta `/api/axiom/errores`: el `DELETE` (`route.ts:42-46`) borra también lo dominado, y el conteo "dominadas" vuelve a 0. No lo llama ninguna de las pantallas leídas.
- `src/app/dashboard/page.tsx:155` dice "6 modos disponibles", pero `MODOS` tiene 5 (`src/app/practicar/page.tsx:69-73`). Va contra la regla 6.
- `src/app/dashboard/page.tsx:63` duplica el límite semanal (4) en vez de salir de `plan.ts:10-11`.
- `src/app/aprende/page.tsx:107` ("150 exámenes") y `:115` ("Bs 49") están quemados. Deberían salir de `listarMetadata()` y `@/lib/precios` (`src/lib/precios.ts:13`).
- `src/app/historial/page.tsx:29` (mes con `toISOString().slice(0, 7)`) y `src/lib/data-store.ts:515-516` (`examenes_hoy`) usan UTC, no La Paz.
- `src/lib/plan.ts:76-82` calcula la semana con la hora de la máquina, y el cliente (`dashboard/page.tsx:64`) y el servidor (`src/app/api/axiom/simulador/route.ts:66`) discrepan.
- `src/lib/axiom/errores-storage.ts` no tiene importadores: es código muerto. Borrarlo necesita el OK de Ronald (`CLAUDE.md:9`).
- La ruta vieja `/simulador` (`src/app/simulador/page.tsx`) sigue enlazada desde la landing (`Header.tsx:42,68`, `HeroSectionNew.tsx:135`, `CTANew.tsx:60`) y usa "economicas" como facultad por defecto (`:17`, `:26`). Finaliza por la misma ruta, así que el refuerzo funciona igual.
- Lote 5 (después de medir los Lotes 1 a 3): registrar lección terminada y escenas vistas, que hoy no se guardan (`LeccionShell.tsx:22`). Primero resolver D8.
- No se leyeron `/ranking`, `/debilidades` (enlazada en `resultados/page.tsx:541`) ni `/api/axiom/ranking`: quedaron fuera del encargo. El diseño no los usa como refuerzo.
- Notificaciones push de racha (`BITACORA.md:451`): no antes de medir los Lotes 1 a 3.

> **Actualización 1-nov (Ronald):** el refuerzo debe ser más fuerte que lo propuesto al inicio, siempre con datos reales. Topes subidos a 2 por visita y 5 por día; probabilidades subidas en el Lote 1. Sigue vigente: nada falso, sin culpa ni cuentas regresivas, el plan de pago no cambia nada, la corrección no es intermitente. Cumplida D1 con estos valores.

## 8. Decisiones para Ronald

> 1-nov-2026: D1 a D6 se aplicaron con los valores recomendados por defecto (ventana de 7 días, esfuerzo mínimo 50 %, topes en el dispositivo, interruptor de mensajes de ánimo ya leído por el código sin pantalla en `/cuenta`, textos de `refuerzo.ts`). D7 y D8 siguen abiertas. Ronald puede cambiar cualquiera.

Una pregunta por vez, en este orden. La primera respuesta en blanco frena el Lote 1.

- [x] **D1. ¿Aprobás las reglas de tope?** Una tirada por simulacro terminado, máximo 2 sorpresas por visita y 5 por día (respuesta de Ronald: más fuerte, siempre con datos reales), sin modales ni cuenta regresiva. Respondé: `sí` o `otro número`. *Recomiendo `sí`. Bloquea el Lote 1.*
- [x] **D2. ¿Racha o ventana de 7 días?** Ventana: "Practicaste N de los últimos 7 días", sin culpa si falta un día. Racha: días seguidos, que castiga al cortar. Respondé: `ventana` o `racha`. *Recomiendo `ventana`. Bloquea el Lote 4.*
- [x] **D3. ¿Cuánto esfuerzo mínimo cuenta?** Hoy propongo la mitad de las preguntas respondidas, sin importar la nota. Respondé: `50` u otro número. *Bloquea el Lote 1.*
- [x] **D4. ¿Dónde guardamos los topes y las decisiones?** `dispositivo` (rápido, sin base de datos, el tope vale por celular) o `base` (migración 008, el tope vale por cuenta). Respondé: `dispositivo` o `base`. *Recomiendo `dispositivo` por ahora. Bloquea el Lote 2.*
- [x] **D5. ¿Agregamos el interruptor "No mostrar mensajes de ánimo" en `/cuenta`?** Respondé: `sí` o `no`. *Recomiendo `sí`. El código ya lo lee desde el Lote 2; solo falta la pantalla.*
- [x] **D6. ¿Aprobás los textos del §3.2?** Son texto para el alumno, en tuteo. Respondé: `ok` o pasame los cambios. *Bloquea el Lote 2.*
- [ ] **D7. ¿Grupo de control?** Dejar al 10 % de los usuarios sin sorpresas para medir el efecto. Con menos de 30 activos por semana no se puede leer. Respondé: `no ahora` o `sí`. *Recomiendo `no ahora`.*
- [ ] **D8. ¿Guardamos el avance de las lecciones?** Hoy no se guarda nada. Respondé: `dispositivo`, `base` o `después`. *Recomiendo `después`: primero medir los Lotes 1 a 3. Bloquea el Lote 5.*

## 9. Lecciones nuevas (para que el `cronista` las asiente)

- 2026-11-01 · ERROR · `resultados/page.tsx:68` compara `h.id` ("h-…") con `simId` ("sim-…"). Nunca coinciden, así que el chip "vs tu último examen" mostraba siempre diferencia 0. · Comparar por `simulador_id`, y probar siempre con ids reales y no con valores inventados que coincidan.
- 2026-11-01 · ACIERTO · `node --test` no resuelve `@/` en valores (`package.json`, script `test`). Los módulos testeables se escriben con imports relativos y extensión `.ts`, como `avisos.ts` y `repaso.test.ts`. · Todo módulo puro nuevo hace lo mismo desde la primera línea.
- 2026-11-01 · ERROR · `historial.fecha` se guarda en UTC (`data-store.ts:485`) y `inicioSemanaISO` usa la hora de la máquina (`plan.ts:76-82`). Cualquier "hoy" o "esta semana" cruzaba el día a las 20:00 en La Paz. · Los días del refuerzo se calculan con desfase fijo de -240 min (`diaLaPaz`). Antes de contar días con `Date` local, preguntarse en qué zona corre.
- 2026-11-01 · ACIERTO · Un azar sembrado con `usuario + simulacro` hace que recargar la pantalla no cambie el resultado y evita que se "pesque" una sorpresa. · Cualquier mecánica de azar visible al alumno nace determinista y con el generador inyectable, para que sea testeable.
- 2026-11-01 · ERROR · `dashboard/page.tsx:155` dice "6 modos disponibles" y `MODOS` tiene 5. Es una cifra de catálogo clavada a mano (`CLAUDE.md:18`, regla 6). · Contar con `MODOS.length` o sacarla del texto, y buscar el mismo patrón en `aprende/page.tsx:107,115`.
- 2026-11-01 · SUERTE · Todo el plan se apoya en que `/api/historial` ya devuelve `desglose` por área (lo usa `progreso/page.tsx:78`). No se verificó el esquema de la tabla `historial` en `supabase/schema.sql`. · Al empezar el Lote 2, comprobar con una fila real que `desglose` viene poblado antes de confiar en `mejora_area_debil`.
