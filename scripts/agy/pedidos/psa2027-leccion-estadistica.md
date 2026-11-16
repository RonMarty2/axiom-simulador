# Pedido a agy · Lección nueva «Estadística descriptiva» (Medicina PSA 2027, Educación en Salud e Investigación, Parte III)

Nivel: criterio. Escribes una lección para alumnos que preparan la PSA 2027 de Medicina UMSS (Cochabamba).

## Lee antes (y síguelos)
- `src/app/aprende/eds-epidemiologia/page.tsx` y `src/app/aprende/eds-investigacion-bioetica/page.tsx`: COPIA su estructura, componentes, imports y estilo (es la misma materia). No inventes componentes: usa solo los que ya importan esas páginas.
- `.claude/agents/resolutor-exacto.md`: todo número de un ejemplo tiene que ser exacto y comprobable.
- `.claude/agents/animador-resolucion.md`: solo para saber cómo se muestran cálculos paso a paso si las lecciones EdS ya lo usan; si no lo usan, NO lo metas.
- Fuente ÚNICA del contenido: `examenes pasados/MEDICINA/PSA_2027_FUENTES/EdS_p84-91_limpio.txt` … `EdS_p180-189_limpio.txt` (Parte III, «Elementos básicos de estadística descriptiva», pág. 84-189). Son de SOLO LECTURA.
- Para ver qué se pregunta: en el banco las etiquetas `tema:` de `area: investigacion` (en `data/examenes/umss/medicina/*.md`): diagrama de barras, diagrama circular, histograma, ojivas, regla de Sturges, número de intervalos, límites de intervalos, rango, escalas de medición (nominal, ordinal…), variables cuantitativas discretas/continuas, muestreo, tamaño de muestra, sesgo de muestreo. Lee esas preguntas para que la lección prepare para ellas (no las copies).

## Qué escribir
1. `src/app/aprende/eds-estadistica-descriptiva/page.tsx`: lección nueva. Secciones, en este orden y siguiendo el compendio (usa SUS definiciones y SU notación; si el compendio da una fórmula de Sturges u otra, usa esa):
   1. Conceptos generales: población, muestra, unidad de observación, dato, estadística descriptiva vs inferencial.
   2. Variables y escalas de medición (cualitativas nominal/ordinal; cuantitativas discretas/continuas; intervalo y razón si el compendio las trae).
   3. Muestreo (tipos que nombre el compendio) y sesgo.
   4. Tablas de distribución de frecuencias: frecuencia absoluta, relativa, acumulada; datos agrupados: rango, número de intervalos (Sturges), amplitud, límites y marca de clase. UN ejemplo completo con datos de salud (p. ej. edades o pesos de 20 pacientes) resuelto paso a paso.
   5. Gráficos: barras, circular (sectores: grados = fr × 360), histograma, polígono de frecuencias, ojiva; cuándo se usa cada uno según el tipo de variable.
   6. Medidas de tendencia central y de dispersión SOLO si el compendio las trae en esas páginas (si no, omítelas y dilo en la respuesta).
   Cierra con un resumen corto «Lo que más se pregunta» (lista).
2. En `src/lib/axiom/catalogo-aprende.ts`, en `INVESTIGACION_MED_UNIDADES`, agrega después de la unidad "03":
   `{ numero: "04", titulo: "Estadística descriptiva", lecciones: [{ slug: "eds-estadistica-descriptiva", titulo: "Variables, tablas de frecuencia y gráficos" }] },`
   Nada más en ese archivo.

## Reglas
- Texto que ve el alumno: TUTEO (puedes, haz, tú), nunca voseo. Sin emojis.
- Ningún dato fuera del compendio. Ningún número inventado sin cuenta: el ejemplo de la tabla de frecuencias tiene que cerrar (suma de fi = n, suma de hi = 1, Fi final = n, grados del circular suman 360).
- Al final de RESPUESTA.md, pega el ejemplo numérico completo (datos crudos y cada valor calculado) para que Claude lo recalcule por código.
- No toques nada más: ni `examenes pasados/`, ni `data/`, ni `docs/audio-bloques`.

## Respuesta (RESPUESTA.md)
- Secciones escritas y de qué páginas del compendio salió cada una (archivo + página).
- Lo que el compendio trae y dejaste fuera, y por qué.
- El ejemplo numérico completo.
