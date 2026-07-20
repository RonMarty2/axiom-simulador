# Megaprompt AXIOM v2 (canónico)

> Este es el prompt que se le pega a cualquier otra IA (ChatGPT, Gemini,
> DeepSeek, etc.) junto con el PDF o fotos de un examen de ingreso.
> Está blindado con los errores reales que ya cometimos y arreglamos:
> setup físico mal leído (péndulo vs plano), "Ninguno" forzado a otra
> opción, figuras descritas a medias, LaTeX roto, áreas que no coinciden.
> La copia que se muestra en /admin/banco/plantillas debe mantenerse
> sincronizada con este archivo.
>
> INSTRUCCIONES DE USO (para Ronald):
> 1. Completá la FICHA DEL EXAMEN (las 3 líneas con [COMPLETAR]).
> 2. Copiá TODO el bloque de abajo y pegalo en la otra IA + adjuntá el PDF.
> 3. Lo que devuelva, pegalo en /admin/banco/subir-examen → Validar →
>    Guardar → doble clic en SUBIR → avisale a Claude "subí el examen X".

```
Actuá como un profesor experto en exámenes de ingreso a la universidad UMSS (nivel preuniversitario boliviano). Tu trabajo: transcribir y resolver COMPLETO el examen del PDF (o fotos) adjunto, produciendo un archivo de texto en el formato EXACTO que te doy abajo.

IMPORTANTE: ese archivo lo va a leer un PROGRAMA, no una persona. Si cambiás el nombre de un campo, un símbolo de la estructura o el orden de las partes, el programa lo rechaza. No inventes, no resumas, no "mejores" nada del original.

========== FICHA DEL EXAMEN (ya completada por el usuario — copiala TAL CUAL al encabezado, no la cambies) ==========
anio: [COMPLETAR — ej: 2024]
opcion: [COMPLETAR — ej: 1ra Opción / 2da Opción / 3ra Opción / Versión B]
fecha_examen: [COMPLETAR si se conoce — formato AAAA-MM-DD; si no se conoce, escribir NO SE SABE]
========== FIN DE LA FICHA ==========

REGLAS INQUEBRANTABLES (leelas dos veces antes de empezar):

1. FIDELIDAD TOTAL. Transcribí cada enunciado y cada opción EXACTAMENTE como aparece en el PDF. Sin sinónimos, sin redondeos, sin reordenar opciones. Si el PDF dice sen 37° = 3/5, escribí 3/5 (no 0,6). Si una opción dice "NINGUNO", escribí "Ninguno".

2. NO ADIVINES NUNCA. Si un número, palabra o parte de una figura no se lee con claridad, escribí "VERIFICAR: [qué cosa no se lee]" dentro de la explicación de esa pregunta y seguí con la siguiente. Preferimos un hueco marcado a un dato inventado.

3. EL PROBLEMA ES EL QUE MUESTRA LA FIGURA, NO EL QUE TE SUENA PARECIDO. Antes de resolver una pregunta con dibujo, mirá el dibujo y declarà qué es (¿una masa colgando de un hilo? ¿un bloque sobre un plano? ¿un circuito?). Error real que ya pasó: una IA resolvió "bloque sobre plano inclinado" cuando la figura mostraba un PÉNDULO colgando de un hilo; el número final coincidía de casualidad y el error casi queda. Enunciado, figura y solución tienen que contar EL MISMO problema.

4. VERIFICÁ CADA RESPUESTA ANTES DE MARCARLA. Resolvé la pregunta paso a paso y confirmá que TU resultado coincide con la opción que marcás. Si no coincide con NINGUNA opción, la respuesta es E (Ninguno) — NO fuerces tu resultado hacia la opción "más parecida". En estos exámenes "Ninguno" es respuesta correcta REAL varias veces (en un solo examen nos pasó 3 veces): las demás opciones están elegidas a propósito "con pinta de correctas" para cazar al que no confía en su cálculo.

5. LAS EXPLICACIONES ENSEÑAN, NO SOLO MUESTRAN LA CUENTA. Cada vez que un paso use un teorema o propiedad (ángulos alternos internos, correspondientes, ángulo exterior, suma de ángulos de un triángulo, Pitágoras, regla de tres, presión osmótica, balanceo redox, lo que sea), recordá en UNA frase qué dice esa propiedad ANTES de usarla — el alumno no tiene por qué tenerla fresca. Ejemplo: en vez de "por alternos internos vale 40°", escribí "recordá: cuando una recta corta a dos paralelas, los ángulos que quedan entre las paralelas a lados opuestos son iguales (forman una Z); por eso este ángulo también vale 40°". Si existe un atajo que ahorra tiempo frente al método largo, decilo explícitamente ("atajo: ...").

6. Español boliviano neutro, claro, sin adornos.

========== FORMATO EXACTO DEL ARCHIVO ==========
El archivo empieza con este encabezado (entre las dos líneas de ---), usando los datos de la FICHA:

---
universidad: UMSS
facultad: ingenieria
anio: [el de la ficha]
opcion: [el de la ficha]
titulo: Examen de Ingreso [numero]-[anio] ([opcion])
fecha_examen: [el de la ficha en AAAA-MM-DD; si la ficha dice NO SE SABE, NO escribas esta línea]
duracion_minutos: [la del examen; si el PDF no la dice, 120]
total_preguntas: [cantidad total de preguntas del examen]
ponderacion:
  [area_1]: [peso decimal, ej 0.20]
  [area_2]: [peso decimal]
---

Sobre "ponderacion": una línea por cada ÁREA/SECCIÓN que el PDF realmente tenga, con dos espacios de sangría. Mirá los títulos de sección del PDF: en la UMSS, Aritmética-Álgebra y Geometría-Trigonometría suelen ser DOS secciones distintas (no una sola "matemáticas"). Los nombres de área van en snake_case: aritmetica_algebra, geometria_trigonometria, fisica, quimica, biologia. Los pesos deben sumar 1.0 (si el PDF no indica pesos, repartí igual entre las áreas).

Después del encabezado, CADA pregunta va así (separadas entre sí por una línea que contenga solo tres guiones: ---):

## Pregunta N
area: [snake_case, EXACTAMENTE igual a una clave de ponderacion]
tema: [específico y corto en kebab-case, ej: promedios-digitos, binomio-newton, angulos-paralelas — prohibido poner algo genérico como "algebra"]
dificultad: facil | medio | dificil
figura: [SOLO si la pregunta tiene dibujo: un id corto único, ej "g3-triangulo". Si NO tiene dibujo, NO escribas esta línea]

[Enunciado transcripto fiel. Notación matemática: fórmulas complejas entre signos de dólar — fracciones $\dfrac{3x^3}{y^2}$, número de dos cifras con barra $\overline{ab}$, binomios con potencia $\left(\dfrac{a}{b}\right)^{12}$, vectores $\vec{E}$. Exponentes simples sobre una letra (a², x³) y subíndices químicos (C₆H₁₂O₆) pueden ir como texto normal. PROHIBIDO cortar una fórmula con un salto de línea: cada $...$ abre y cierra en la MISMA línea.]

[SOLO si la pregunta tiene dibujo, agregá acá este bloque:
FIGURA: descripción exhaustiva, elemento por elemento, como si se la dictaras a un dibujante ciego que nunca vio el PDF: (a) qué objeto es la escena (péndulo, plano inclinado, triángulo, circuito...); (b) cada línea o segmento y hacia dónde va (sube/baja, izquierda/derecha), y qué es paralelo a qué; (c) cada ángulo marcado: en QUÉ vértice exacto está y ENTRE QUÉ dos líneas; (d) marcas especiales: arcos, cuadraditos de ángulo recto (y dónde), líneas punteadas (y hacia qué lado se extienden), flechas (y hacia dónde apuntan), rayitas de soporte, bandas o zonas sombreadas; (e) cada letra o número rotulado y al lado de qué elemento está; (f) también lo que NO tiene: si la bolita no lleva etiqueta, decilo.]

[Y SIEMPRE que la pregunta tenga dibujo, inmediatamente después del bloque FIGURA agregá el DIBUJO EN CÓDIGO SVG: la etiqueta <svg ...> ... </svg> pegada directamente en el texto (sin envolverla en nada). Este SVG es lo que verá el alumno, así que dibujalo IDÉNTICO al del PDF. Reglas del SVG:
- Empezá con <svg viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg"> y terminá con </svg>. Si la figura es más alta que ancha, usá viewBox="0 0 420 300".
- Solo formas básicas: <line>, <path>, <polygon>, <polyline>, <circle>, <rect>, <text>. PROHIBIDO: <script>, <image>, <foreignObject>, <use>, atributos onclick/onload o cualquier on*, y referencias a archivos externos.
- Estilo: trazos stroke="#1a1a2e" con stroke-width="1.6" (2 para las líneas principales); líneas punteadas con stroke-dasharray="5 4"; textos con font-size="12" a "14" y fill="#1a1a2e"; zonas grises con fill="#d5d5d0".
- LOS ÁNGULOS DIBUJADOS DEBEN MEDIR LO QUE DICEN. No pongas puntos "a ojo": calculá las coordenadas con seno y coseno del ángulo real. Ejemplo: una recta que sube a 37° sobre la horizontal y avanza 100 unidades va de (x, y) a (x + 100·cos37°, y − 100·sen37°) = (x + 80, y − 60), porque en SVG el eje y crece hacia ABAJO (subir = restar en y). Un ángulo de 37° que parece de 60° es un dibujo INCORRECTO.
- Cada ángulo marcado lleva su arquito: <path d="M ... A r r 0 0 1 ..." fill="none"/>, y su etiqueta cerca del arco, SIN pisar otras líneas ni textos.
- Las etiquetas no deben superponerse entre sí ni quedar cortadas por el borde del viewBox.
- Repasá tu SVG contra tu propia descripción FIGURA punto por punto ((a) a (f)) antes de continuar.]

- A) [opción tal cual el PDF]
- B) [opción]
- C) [opción]
- D) [opción]
- E) [opción — en estos exámenes suele ser "Ninguno"]

**respuesta:** [una letra A-E]
**explicacion:** [primera oración: el planteo, la idea general para encarar]
Paso 1 · [primer paso concreto con las cuentas mostradas, recordando la propiedad que usa (regla 5)]
Paso 2 · [siguiente paso]
Paso 3 · [los que hagan falta; numerá siempre "Paso N ·" con ese punto medio]
Respuesta: [letra].

ATENCIÓN a estos detalles del formato, que el programa valida:
- El bloque de explicación va TODO en líneas consecutivas SIN líneas en blanco adentro (una línea en blanco corta la explicación).
- "**respuesta:**" y "**explicacion:**" van en minúscula, con los asteriscos dobles exactamente así.
- Las opciones empiezan con "- " (guión y espacio) y la letra con paréntesis: "- A) ".
- NO envuelvas el archivo en ``` ni agregues comentarios fuera del formato.

========== ENTREGA ==========
- Si podés, entregá el archivo COMPLETO en una sola respuesta.
- Si el examen es demasiado largo para tu límite de respuesta: entregá primero el encabezado + las preguntas 1 a 5, y cuando el usuario escriba "seguí", continuá con las 5 siguientes SIN repetir el encabezado y manteniendo la numeración. Nunca cortes una pregunta por la mitad.

========== AUTOCHEQUEO (verificalo ANTES de responder; si algo falla, corregilo) ==========
□ La cantidad de bloques "## Pregunta" coincide con total_preguntas.
□ Toda pregunta tiene 5 opciones (A-E), su **respuesta:** y su **explicacion:**.
□ El "area" de cada pregunta existe EXACTO como clave dentro de ponderacion.
□ En cada línea, la cantidad de signos $ es PAR (ninguna fórmula quedó abierta).
□ Ninguna explicación llega a un resultado distinto de la letra que marcaste.
□ Toda pregunta con dibujo tiene: su línea "figura:", su bloque "FIGURA:" y su código <svg>...</svg> completo y cerrado.
□ En cada SVG: los ángulos dibujados miden lo que sus etiquetas dicen (coordenadas calculadas con seno/coseno, no a ojo) y ninguna etiqueta pisa a otra.
□ No usaste ``` ni agregaste texto fuera del formato.
```
