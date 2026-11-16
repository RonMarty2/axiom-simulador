# Pedido agy · PSA 2027 Medicina · hueco 3: lección «Citoesqueleto»

Agentes a seguir: `agentes/autor-laminas.md` (forma de la lección) y `agentes/auditor-pedagogico.md` (léela al final como alumno nuevo y corrige lagunas).

## Qué hacer
1. Crea `src/app/aprende/bio-citoesqueleto/page.tsx`, una lección de Biología Celular sobre el citoesqueleto, con la MISMA estructura, componentes e imports que la lección ya existente `src/app/aprende/eds-estadistica-descriptiva/page.tsx` si existe en tu copia; si no, usa como molde la lección de Biología de Medicina más parecida que encuentres en `src/app/aprende/` (mira `src/lib/axiom/catalogo-aprende.ts` para ver cuáles son de Medicina).
2. Agrega la lección al catálogo `src/lib/axiom/catalogo-aprende.ts`, en la unidad de Biología Celular del bloque de Medicina (la que tenga célula/organelos). No cambies nada más del catálogo.

## Fuente (ÚNICA): Calvo, capítulo 12 (citoesqueleto)
Busca el texto de Calvo en `examenes pasados/MEDICINA/PSA_2027_FUENTES/` (archivos `*_texto_paginas.txt` o `*_limpio.txt` de Calvo; si no están ahí, busca en `examenes pasados/MEDICINA/`). TODO lo que escribas sale de ese capítulo; nada inventado ni de memoria. Para cada sección anota en tu RESPUESTA el archivo y la página de Calvo.

Contenido mínimo, si está en el capítulo: qué es el citoesqueleto y sus funciones; microfilamentos (actina: estructura, polimerización, funciones); filamentos intermedios (tipos, ejemplos por tejido); microtúbulos (tubulina α/β, polaridad, centrosoma/centríolos, inestabilidad dinámica); proteínas motoras (miosina, cinesina, dineína: hacia dónde caminan); cilios y flagelos (axonema 9+2, cuerpo basal 9+0 / tripletes); fármacos que lo afectan si Calvo los nombra. Al final: «Lo que más se pregunta», 2-3 errores típicos (Misconception) y 5-6 AutoCheck. Para las AutoCheck mira las preguntas con tema de célula/citoesqueleto en `data/examenes/umss/medicina/*.md` (solo LEER; no toques esa carpeta).

## Reglas
- Texto para el alumno en TUTEO (puedes, mira, haz), nunca voseo. Sin emojis.
- Una tabla comparativa de los 3 tipos de filamento (diámetro, proteína, función) con los números exactos de Calvo.
- Si haces un dibujo SVG, coordenadas calculadas, nada pisado, que entre en 360 px de ancho.
- No toques: data/examenes/umss/medicina, docs/audio-bloques, _MOTOR_AUDIO, PSA_2027_FUENTES (solo leer).
- Corre tsc, lint y npm test al final.

## Formato de la RESPUESTA
1. Lista de secciones con archivo y página de Calvo de cada una.
2. Lo que quedó fuera del capítulo y por qué.
3. Tabla de los números que usaste (diámetros, etc.) con la frase literal de Calvo de donde salen, para que Claude los compruebe.
4. Las AutoCheck con su respuesta correcta y la página que la justifica.
