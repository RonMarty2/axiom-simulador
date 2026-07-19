# Prompt para pedirle a otra IA que resuelva un examen (y que Claude lo integre rápido)

> Instrucciones de uso: copiá TODO el bloque de abajo (entre las líneas ```),
> pegalo en la otra IA (ChatGPT, Gemini, etc.) junto con el PDF o las fotos
> del examen, y mandame el resultado que te devuelva. Yo lo reviso, lo
> verifico pregunta por pregunta, le agrego las figuras si hace falta, y lo
> integro al banco — mucho más rápido que armarlo desde cero.

```
Actuá como un profesor experto en exámenes de ingreso universitario (nivel
preuniversitario boliviano, UMSS). Te voy a pasar un examen de ingreso en
PDF o como fotos. Tu tarea es transcribirlo y resolverlo COMPLETO en el
siguiente formato Markdown exacto — no cambies la estructura ni los
nombres de los campos.

FORMATO EXACTO (repetir para cada pregunta):

---
universidad: UMSS
facultad: ingenieria
anio: [año del examen, ej 2024]
opcion: [ej "2da Opción" — a qué convocatoria del año pertenece, si el
  examen lo indica; si no lo indica, escribí "1ra Opción"]
titulo: [ej "Examen de Ingreso 2-2024 (2da Opción)"]
fecha_examen: [fecha exacta en formato AAAA-MM-DD si aparece en el PDF]
duracion_minutos: [duración total, normalmente 120]
total_preguntas: [cantidad total de preguntas]
ponderacion:
  [area_1]: [peso decimal, ej 0.20]
  [area_2]: [peso decimal]
  (una línea por cada área/materia que separe el examen — mirá el PDF
  para saber cómo lo divide REALMENTE: Aritmética-Álgebra y
  Geometría-Trigonometría suelen ser DOS áreas distintas, no una)
---

## Pregunta 1
area: [snake_case, ej: aritmetica_algebra, geometria_trigonometria, fisica,
  quimica, biologia — tiene que coincidir EXACTO con una clave de
  ponderacion de arriba]
tema: [snake-case corto y específico del tema puntual, ej:
  promedios-digitos, binomio-newton, angulos-paralelas — NO algo genérico
  como "algebra"]
dificultad: facil | medio | dificil
figura: [SOLO si la pregunta depende de un dibujo/diagrama — poné un id
  corto como "g1-triangulo"; si no hay figura, no pongas esta línea]

[Enunciado completo de la pregunta, transcripto fiel al PDF. Si hay una
fórmula matemática (fracción, potencia con paréntesis, ecuación completa,
identidad trigonométrica, número con barra/overline), escribila en LaTeX
entre signos $ $, ej: $\dfrac{3x^3}{y^2}$, $\overline{ab}$, $x^{12}$.
Si es solo un exponente simple sobre una letra sola (a², x³) podés dejarlo
como texto normal, no hace falta LaTeX para eso.]

[SI la pregunta depende de una figura/diagrama: agregá acá, antes de las
opciones, un párrafo así:

FIGURA: [descripción PRECISA y completa en palabras de todo lo que se ve
  en el dibujo — qué líneas hay, qué son paralelas, dónde está cada
  vértice relativo a los demás (arriba/abajo/izquierda/derecha), qué
  ángulos están marcados y EN QUÉ VÉRTICE exacto, qué letras rotulan qué
  punto, si hay algún ángulo recto marcado y dónde. Sé exhaustivo: yo voy
  a dibujar el SVG a partir de tu descripción, así que si describís mal
  una posición relativa (ej "el ángulo de 40° está a la izquierda del
  vértice X"), el dibujo va a salir mal. Mejor sobra detalle que falte.]
]

- A) [opción]
- B) [opción]
- C) [opción]
- D) [opción]
- E) Ninguno

**respuesta:** [letra A-E]
**explicacion:** [primera oración: el planteo/idea general para resolverla]
Paso 1 · [primer paso concreto, con las cuentas mostradas]
Paso 2 · [segundo paso]
Paso 3 · [si hace falta más pasos, seguir numerando]
Respuesta: [letra].

---

(repetir "## Pregunta N" para cada pregunta del examen, todas dentro del
mismo archivo, separadas por una línea con solo "---")

REGLAS IMPORTANTES:
1. NO inventes ni un solo dato del examen. Si no podés leer algo con
   claridad en el PDF (un número borroso, una figura poco nítida), escribí
   explícitamente "VERIFICAR: [qué no se lee bien]" en la explicación en
   vez de adivinar.
2. VERIFICÁ tu propia respuesta antes de escribirla: resolvé la pregunta
   vos mismo paso a paso y confirmá que el resultado coincide con la
   opción que marcás como **respuesta**. Si tu cálculo no coincide con
   ninguna opción, marcá "E) Ninguno" y explicá por qué en la explicación
   (no fuerces una respuesta que no cierra matemáticamente).
3. Los pasos de la explicación tienen que ENSEÑAR, no solo mostrar la
   cuenta. Regla de oro: si un paso usa un teorema o propiedad (ángulos
   alternos internos, correspondientes, suma de ángulos de un triángulo,
   Pitágoras, regla de tres, ley de gases, etc.), recordá en UNA frase qué
   dice esa propiedad ANTES de usarla — el alumno no tiene por qué tenerla
   fresca. Ejemplo: en vez de "por alternos internos vale 40°", escribí
   "recordá: cuando una recta corta a dos paralelas, los ángulos entre las
   paralelas a lados opuestos son iguales (forman una Z); por eso este
   ángulo también vale 40°". Si además hay un atajo o técnica que acorta
   el camino frente al método "a lo bruto", mencionalo.
4. Mantené el identificador de área EXACTO entre la pregunta y la
   ponderacion del frontmatter (si escribís "area: geometria_trigonometria"
   en una pregunta, tiene que existir esa misma clave en ponderacion).
5. Devolveme el archivo COMPLETO de una sola vez, no lo cortes a la mitad.
```

## Qué hago yo con lo que te devuelva

1. Guardo el `.md` en `data/examenes/umss/ingenieria/` con un nombre único
   (año + opción, ej `2024-1op-2-2024.md`) para que no choque con otros
   exámenes del mismo año.
2. Reviso cada pregunta: si algo no cierra matemáticamente o el LaTeX está
   mal escrito, lo corrijo.
3. Si hay preguntas con `FIGURA: ...`, dibujo el SVG a partir de esa
   descripción usando los helpers de geometría dirigida (los que exigen
   que el signo de cada dirección sea correcto o explotan al renderizar) y
   lo verifico con un render real antes de mostrártelo.
4. Sumo el examen al mapa de técnicas/trampas/atajos
   (`tecnologia-mapa-preguntas.md`).
5. Te aviso cuando esté listo para revisar en `/resueltos`.

Así vos aportás el contenido (con la otra IA haciendo el trabajo pesado de
transcribir y resolver) y yo me encargo de la parte técnica: formato,
figuras, verificación y que quede integrado en el sitio.
