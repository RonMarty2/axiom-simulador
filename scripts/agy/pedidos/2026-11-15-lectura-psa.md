# Pedido: 20 preguntas de Comprensión Lectora para la PSA 2027 (Medicina), tanda 1

Lee y sigue estas reglas antes de empezar:
- El CLAUDE.md del proyecto (C:\Users\lmigu\SynologyDrive\10.TRABAJO_LOCAL\axiom-simulador\CLAUDE.md). Sobre todo la regla 2: todo el texto que ve el alumno va en TUTEO («identifica», «puedes»), nunca en voseo.
- Usa la skill `redactor-explicaciones` (agentes/redactor-explicaciones.md) para el estilo de la explicación: pasos cortos, dato nombrado y cierre con «Respuesta: X.».

## Qué crear
UN archivo nuevo: `data/practica/medicina-psa-2027-lectura.md`. No toques ningún otro archivo.

Copia el formato EXACTO de `data/practica/medicina-psa-2027-mfq.md`: encabezado YAML, comentario HTML, `## Pregunta N`, `area:`, `tema:`, `dificultad:`, opciones `- A)` a `- D)`, `**respuesta:**`, `**explicacion:**` y `---` entre preguntas. Mira las preguntas 1 y 2 de ese archivo.

Encabezado:
```
---
universidad: UMSS
facultad: medicina
anio: 2027
titulo: Práctica PSA 2027 · Comprensión Lectora
categoria: practica
total_preguntas: 20
---
```
Comentario: «NO ES UN EXAMEN PASADO. Textos y preguntas originales de práctica para la Comprensión Lectora de la PSA 2027 (lista oficial, 4096.pdf p.34-38). Entra a la práctica por data/preguntas-compartidas.json.»

## Contenido
- 4 textos ORIGINALES, escritos por ti y sin copiar libros ni artículos. Cada uno de 150 a 220 palabras, en español neutro, sobre temas de salud o ciencia aptos para un postulante a Medicina. Sugeridos: (1) lavado de manos e infecciones hospitalarias, (2) el sueño y la memoria, (3) la resistencia a los antibióticos, (4) la altura de Cochabamba y la adaptación del cuerpo (hemoglobina). No inventes cifras precisas que parezcan datos reales citables. Si usas una cifra, que sea redonda y prudente («cerca de», «más de la mitad»).
- 5 preguntas por texto, una por cada habilidad de la lista oficial, en este orden. El `tema:` va exacto:
  1. `psa-lectura-informacion-explicita`: dato dicho en el texto, preguntado con sinónimo o paráfrasis (no con las mismas palabras).
  2. `psa-lectura-inferencia`: algo que se deduce y el texto no dice literalmente.
  3. `psa-lectura-significado-contextual`: significado de una palabra o expresión del texto según el contexto.
  4. `psa-lectura-idea-central`: idea principal o mejor síntesis del texto.
  5. `psa-lectura-funcion-elemento-textual`: función de un conector, un párrafo o una oración (ejemplifica, contrasta, concluye...), o jerarquía de ideas.
- `area: comprension_lectora` en todas. `dificultad: media`, salvo 1 o 2 por texto en `alta`.
- El enunciado de CADA pregunta repite el texto completo en un bloque de cita (`> ` al inicio de cada línea), con su título en negrita. Después, una línea en blanco y la pregunta. Así se lee sola en el simulacro, que sortea las preguntas sueltas.
- 4 opciones (A-D). UNA sola defendible desde el texto. Los distractores deben ser plausibles: algo cierto en el mundo pero no dicho en el texto, una paráfrasis que cambia un matiz o una idea secundaria presentada como central. Reparte las claves (no más de 6 con la misma letra en total).
- Explicación: cita la frase del texto que prueba la clave y di en una línea por qué cada distractor falla. Termina con «Respuesta: X.».
- Sin LaTeX, sin emojis, sin «ninguna de las anteriores» ni «todas las anteriores».

## Al final
En tu respuesta, una tabla: N.º de pregunta, tema, clave y la frase del texto que la prueba. Así se revisa rápido.
