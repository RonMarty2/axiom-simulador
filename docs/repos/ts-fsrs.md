# open-spaced-repetition/ts-fsrs (evaluado 29-oct-2026, modo solo lectura)

## 1. Qué es de verdad
Librería TypeScript que, dada una "tarjeta" (una pregunta) y cómo le fue al alumno (Otra vez / Difícil / Bien / Fácil), calcula cuándo conviene volver a preguntársela. Es el algoritmo FSRS, el mismo que usa Anki. Resuelve el CUÁNDO repasar. NO elige preguntas, NO tiene interfaz, NO guarda nada: devuelve un objeto con la fecha de la próxima vez y su memoria estimada (estabilidad, dificultad) y uno lo guarda donde quiera.

Leído: README de 6.0.0 y 5.4.2 (jsDelivr), lista de archivos de `dist/`. No leí el código del modelo.

## 2. Licencia
`LICENSE` leído en GitHub: MIT, "Copyright (c) 2026 Open Spaced Repetition". Uso comercial permitido.
Ojo: la 6.0.0 trae una dependencia nueva, `@open-spaced-repetition/srs-kit`, con licencia BSD-3-Clause según npm (no abrí su LICENSE). También permite uso comercial. La 5.4.2 no tiene dependencias.

## 3. Salud
Muy sana. 835 estrellas, último commit en `main` el 29-oct-2026 (hoy), 4 issues abiertos (3 son de la propia automatización). La 6.0.0 salió ayer (28-oct-2026) después de 15 betas; la 5.4.2 es del 1-sep-2026.
Cuidado: la 6.0.0 exige Node `>=24` y cambió toda la forma de usarla (`DefaultScheduler()` asincrónico, modelo FSRS-7 por defecto). La 5.4.2 pide Node `>=20`, igual que Axiom (`package.json` dice `>=20.0.0`). Recomiendo la 5.x hasta que la 6 tenga un par de meses.

## 4. Peso y dónde corre
npm: 5.4.2 = 706 KB desempaquetado; 6.0.0 = 861 KB + srs-kit 502 KB. Eso cuenta todos los formatos (cjs, mjs, umd, tipos). Lo que se carga de verdad es mucho menos: en 6.0.0 `dist/index.mjs` pesa 43 KB sin comprimir. Corre en cliente o servidor. Para Axiom va en el **servidor** (la ruta que cierra el simulacro), así que no suma nada al celular.

## 5. Mapa contra Axiom
- **Fila 10 (práctica y simulador), dolor real hoy:** leí `src/lib/axiom/errores-db.ts`, `api/axiom/errores`, `api/axiom/debilidades` y `simulador-builder.ts`. Hoy:
  - una pregunta fallada se guarda en la tabla `errores` con un contador `veces`, y **nunca sale de ahí** aunque después el alumno la acierte;
  - el modo "Mis errores" **no vuelve a preguntar esas preguntas**: le pasa a la IA los temas más fallados (`temasReforzarDeErrores`) y genera preguntas nuevas;
  - no hay ninguna fecha de "repasar esto el jueves".
  ts-fsrs cubre justo ese hueco: cada pregunta fallada pasa a tener su próxima fecha, cada acierto la aleja y cada fallo la acerca, y "Repasar ahora" sería "lo que vence hoy". Esto haría **mejor** que lo de hoy (hoy no existe).
- **Fila 12 (agentes):** no toca.
- Adaptación necesaria: FSRS espera que la persona se califique a sí misma (4 botones). En opción múltiple hay dos resultados: fallo → `Again`, acierto → `Good`. Con 4 o 5 opciones un acierto puede ser suerte; FSRS no lo sabe. No es grave para repasar errores, pero conviene no usar "Fácil".

## 6. Prueba chica
**No probado (modo solo lectura).** Prueba exacta a correr en el scratchpad:
```
npm init -y && npm i ts-fsrs@5.4.2
node -e "const {fsrs,createEmptyCard,Rating}=require('ts-fsrs');const f=fsrs({enable_fuzz:false});let c=createEmptyCard(new Date('2026-10-01'));
for(const [dia,ok] of [['2026-10-01',0],['2026-10-02',1],['2026-10-05',1],['2026-10-15',0]]){const r=f.next(c,new Date(dia),ok?Rating.Good:Rating.Again);c=r.card;console.log(dia,ok?'acierta':'falla','-> proxima',c.due.toISOString().slice(0,10),'estab',c.stability.toFixed(2))}"
```
Qué mirar: que después de fallar la próxima fecha sea el mismo día o el siguiente, que cada acierto la aleje (días → semanas) y que el fallo del 15 la vuelva a acercar. También: que el objeto `card` se pueda guardar como JSON en Supabase y leerse de vuelta (`due` vuelve como texto; hay que pasarlo a `Date`).

## 7. Costo de integrar
Estimado, no medido. Unos 6 a 8 archivos, todos del lado servidor salvo la página:
1. `supabase/migration-007-repaso.sql`: columnas nuevas en `errores` (`fsrs` JSONB y `proximo` TIMESTAMPTZ con índice).
2. `src/lib/axiom/errores-db.ts`: al guardar un fallo, `next(..., Again)`; agregar una función para los aciertos (hoy solo se guardan fallos) y una `vencidosHoy(usuario)`.
3. `src/app/api/axiom/simulador/[id]/finalizar/route.ts`: pasar también las acertadas que ya estaban en `errores`.
4. `src/lib/axiom/simulador-builder.ts` y `types.ts`: modo nuevo (o cambio en "Mis errores") que arma el examen con las preguntas vencidas.
5. `src/app/errores/page.tsx` y `practicar/page.tsx`: mostrar "Tienes N para repasar hoy".
Riesgo: bajo para tests (lógica nueva aislada); medio en la base (migración en producción). El bundle del cliente no cambia.

## 8. Decisión
**USAR** (versión 5.x, en el servidor), pero después de la decisión de producto de abajo. Razón: es lo único de esta tanda que tapa un hueco real y visible para el alumno, con licencia MIT, sin peso en el celular y muy mantenido.
Alternativa si no se quiere dependencia: TOMAR LA IDEA con cajas de Leitner (fallo → caja 1, mañana; acierto → sube de caja: 3, 7, 21 días). Son 20 líneas propias; peor estimación que FSRS, pero cero dependencias.

**Qué agente mejora:** ninguno de calidad. Si se integra, `verificador` debería sumar a su lista "toda ruta que cierra un simulacro actualiza el repaso de las preguntas ya guardadas, también las acertadas".

## Para Ronald
1. ¿"Mis errores" debe volver a preguntar **las mismas preguntas** que el alumno falló, en la fecha que toque? Hoy pregunta otras, generadas por la IA, del mismo tema. Recomiendo: sí, las mismas (es lo que más ayuda a no repetir el error), y dejar las generadas como extra.
2. ¿Una pregunta que el alumno acierta 2 o 3 veces seguidas en el repaso sale de "Mis errores"? Recomiendo: sí, pasa a "dominadas".

## Lecciones nuevas
- 2026-10-29 · SUERTE · ts-fsrs sacó la versión mayor 6.0.0 el día anterior a la evaluación, con Node >=24 y API distinta. · Mirar `npm view <paq> time` y `engines`, no solo "latest"; fijar la última estable de la versión anterior si la nueva tiene días.
- 2026-10-29 · ACIERTO · Leer `errores-db.ts` antes de evaluar mostró que el dolor real no era "falta repetición espaciada" en abstracto sino que los errores nunca se borran y no se vuelven a preguntar. · Abrir el código de la capacidad antes de medir un repo contra ella.
