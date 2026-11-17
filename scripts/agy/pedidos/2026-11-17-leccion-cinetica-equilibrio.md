# Pedido · lección nueva «Cinética y equilibrio químico» (QUI-13)

Usa la skill `autor-laminas` y sigue el `CLAUDE.md` de la raíz del repo (texto del alumno en TUTEO, nunca voseo; sin cifras de catálogo a mano).

## Encargo
Crear `src/app/aprende/cinetica-equilibrio/page.tsx`: una lección con la MISMA estructura y los mismos componentes que el molde `src/app/aprende/quimica-organica/page.tsx` (unidad="QUI-13", tituloUnidad="Cinética y equilibrio químico", 5 o 6 escenas).

Fuente del temario: `docs/psa-2027/4096_p29-45_texto.txt`, líneas 383 a 393 (libro del Ministerio, p. 36). Cubre SOLO esos temas. Para los ejemplos reales, busca en `data/examenes/umss/` preguntas de velocidad de reacción, constante de equilibrio (Kc, Kp), principio de Le Châtelier, y cita examen y número de pregunta reales (nunca inventes un número de pregunta ni una etiqueta tipo «Q4.1»). Si encuentras menos de 3, pon las que haya.

Escenas sugeridas: 1) velocidad de reacción y factores; 2) ley de velocidad y orden; 3) equilibrio y Kc/Kp; 4) Le Châtelier; 5) ejercicios reales del banco resueltos paso a paso (una operación por línea, verificación por un segundo camino); 6) errores comunes y práctica (AutoCheck, la respuesta correcta NO siempre en la misma posición).

## Reglas duras (formato B de los dibujos, medibles)
- Todo SVG: viewBox de 360 de ancho, letra (font-size) ≥ 13, alto del viewBox ≤ 425. La explicación larga va fuera del dibujo, en la tarjeta.
- Nada de desborde horizontal a 360 px: fórmulas largas partidas en líneas propias.
- Toca SOLO `src/app/aprende/cinetica-equilibrio/page.tsx`. No toques el catálogo, ni otras lecciones, ni el banco.
- No leas fuera de `src/app/aprende/quimica-organica/`, `src/app/aprende/acido-base/`, `src/components/`, `docs/psa-2027/4096_p29-45_texto.txt`, `data/examenes/umss/` y los agentes. Si un archivo no existe, no insistas. Crea el archivo en los primeros minutos.
- Cada resultado numérico de un ejercicio, compruébalo dos veces.

## Casilleros de aceptación
1. `tsc --noEmit` y `lint` sin errores.
2. 0 apariciones de voseo («podés», «tenés», «hacé», «vos»).
3. Todos los `<text>` de los SVG con font-size ≥ 13 y viewBox 360 × ≤ 425.
4. Cada ejercicio «real» cita examen y pregunta que existen en `data/examenes/umss/` con la misma letra de respuesta.
5. Responde al final, en máximo 30 líneas: qué escenas hiciste, qué preguntas del banco usaste (archivo + número) y qué dudas quedaron.
