# yeatmanlab/jsCAT (`@bdelab/jscat`) (evaluado 29-oct-2026, modo solo lectura)

## 1. Qué es de verdad
Librería TypeScript de examen adaptativo con Teoría de Respuesta al Ítem (IRT): con las respuestas acertadas/falladas del alumno estima su nivel (un número, "theta") y elige la siguiente pregunta que más información da. Viene del laboratorio Yeatman (Stanford), hecha para pruebas de lectura infantil.
Lo que NO hace, y es clave: **no calcula la dificultad de las preguntas**. Hay que dársela ya calculada (parámetros a, b, c, d de cada ítem), normalmente con el paquete `mirt` de R sobre cientos de respuestas. Tampoco guarda nada.

Leído: README, lista de `src/`, comienzo de `src/cat.ts`, nombres de funciones de `src/utils.ts`, `package.json`.

## 2. Licencia
`LICENSE` leído: texto MIT (sin título), "Copyright (c) 2023 Wanjing Anya Ma, Adam Richie-Halford". GitHub lo marca MIT; npm dice ISC. Las dos permiten uso comercial; la diferencia es solo de etiqueta.

## 3. Salud
20 estrellas. Último commit en `main` 19-may-2026 (versión 5.3.2), 11 issues abiertos. Vivo pero chico y de un solo grupo académico.
Señales de poco cuidado: el ejemplo del README no corre tal cual (`{[ ... ]}` no es JavaScript válido, y usa `new CAT` cuando la clase se llama `Cat`).

## 4. Peso y dónde corre
npm: 618 KB desempaquetado. Dependencias: lodash, seedrandom, `@types/node` (en producción, raro) y **`optimization-js` bajado directo de GitHub** (`github:yeatmanlab/optimization-js`), no de npm. Eso último es un riesgo: si el repo de GitHub cambia o desaparece, `npm install` se rompe. Correría en cliente o servidor.

## 5. Mapa contra Axiom
- **Fila 10 (práctica y simulador):** hoy la dificultad de cada pregunta la pone a mano quien transcribe (`dificultad: facil|medio|dificil` en el `.md`, por defecto `medio`, ver `banco-parser.ts`), y el alumno la elige en `/practicar`. Un examen adaptativo sería **mejor** en teoría.
- Pero el examen UMSS real es de forma fija; el simulacro tiene que parecerse al examen, no adaptarse. Lo adaptativo solo serviría en una práctica aparte o para estimar "con tu nivel actual, sacarías X".
- El dato para calibrar sí existe: la tabla `simuladores` guarda `preguntas` y `respuestas_usuario` de cada intento (`finalizar/route.ts`, `schema.sql`). Con suficientes alumnos se podría medir la dificultad real de cada pregunta. No sé cuántas respuestas hay hoy en producción.
- **Fila 12:** no toca.

## 6. Prueba chica
**No probado (modo solo lectura).** Prueba exacta: en el scratchpad `npm i @bdelab/jscat` (comprobar primero que la dependencia de GitHub se instala), cargar 3 ítems `{a:1,b:-1,c:0.25,d:1}`, `{a:1,b:0,c:0.25,d:1}`, `{a:1,b:1,c:0.25,d:1}` (c=0.25 por las 4 opciones), `new Cat({method:'EAP'})`, `updateAbilityEstimate(items,[1,1,0])` y ver que theta quede entre 0 y 1 y que `findNextItem` proponga el ítem de b más cercano a theta.

## 7. Costo de integrar
Alto para lo que da: primero hay que calibrar los ítems (script aparte, R o Python), guardar a/b/c por pregunta, y recién ahí usar jsCAT. Más una dependencia bajada de GitHub. Decenas de líneas y una tabla nueva; sin datos de calibración no sirve de nada.

## 8. Decisión
**TOMAR LA IDEA**, no la librería. La idea útil para Axiom es medir la dificultad real de cada pregunta con las respuestas que ya se guardan, en vez de la etiqueta puesta a mano. La forma barata es un **Elo**: cada pregunta y cada alumno tienen un puntaje; al responder, `esperado = 1/(1+10^((dif - nivel)/400))`, y los dos se mueven `K·(resultado - esperado)`. Son 10 líneas propias, se actualiza con cada respuesta (no hace falta esperar cientos), y con 4 opciones conviene arrancar el esperado en 0,25 en vez de 0. jsCAT sobra mientras el simulacro siga siendo de forma fija.

**Qué agente mejora:** `auditor-facsimil` / transcriptor dejarían de adivinar la dificultad: un script (`scripts/dificultad-real.mjs`, a crear) leería los simulacros calificados y reportaría preguntas marcadas "fácil" que casi todos fallan (puede ser una clave mal transcrita: serviría de alarma de calidad del banco; no comprobado con datos).

## Para Ronald
¿Quieres que la dificultad de cada pregunta salga de cómo responden los alumnos de verdad (cambiaría sola con el tiempo) en vez de la etiqueta puesta al transcribir? Recomiendo sí, empezando solo como reporte interno (no visible al alumno) para ver si hay preguntas con la respuesta mal cargada.

## Lecciones nuevas
- 2026-10-29 · ACIERTO · Al evaluar un repo de IRT, lo valioso no fue la librería sino notar que `simuladores` ya guarda cada respuesta: con eso se puede medir dificultad real y, de paso, detectar claves mal cargadas (hipótesis, sin probar). · Antes de evaluar un algoritmo de datos, ver qué datos ya guarda Axiom.
