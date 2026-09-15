# Auditoría pedagógica · informe

Encargo de §8 de la bitácora: leer el contenido con ojos de un alumno que ve el
tema por primera vez y marcar lo que da por sabido. **Esto es un informe, no una
lista de cambios aplicados.** Nada de lo de acá está corregido todavía.

**Estado: 5 de las 9 lecciones gratis auditadas.** Las 4 restantes quedaron sin
correr porque se agotó el límite de API de la sesión, no porque estén bien.

| Lección | Estado | Lagunas | Errores de contenido |
|---|---|---|---|
| divisiones-economia | auditada | 12 | 2 |
| escasez-necesidades | auditada | 10 | 3 |
| nociones-quimica | auditada | 15 | 4 |
| segmentos-angulos | auditada | 10 | 2 |
| vectores-fisica | auditada | 13 | 2 |
| operaciones-fundamentales | **PENDIENTE** | — | — |
| lectura-comprension | **PENDIENTE** | — | — |
| metodologia-leyes | **PENDIENTE** | — | — |
| perspectiva-historica-economia | **PENDIENTE** | — | — |

Después de estas 9 (que son el plan gratis, D2) quedan las otras 94 lecciones y
las 64 láminas.

---

## 1. ERRORES DE CONTENIDO — lo que hay que mirar primero

No son problemas de redacción: es contenido que le enseña mal al alumno. Cada
uno necesita verificación antes de tocarlo.

### escasez-necesidades

- **Línea 294 · las cuentas no dan.** Total deseado 4.900 Bs. Si postergan el
  celular (−800) y no salen a comer (−150), gastan **3.950 Bs**, y sobre 4.500
  de ingreso **sobran 550**, no 250. El texto dice "quedan 4.750 Bs gastados"
  (restó solo los 150), y con 4.750 sobre 4.500 no sobraría nada: faltarían 250.
  Hay que rehacer el cierre del caso entero.
- **Líneas 251 y 456 vs 387 · contradicción que hace fallar el ejercicio.** La
  escena 4 y la práctica final dicen que el aire es el **único** bien libre; el
  AutoCheck de la escena 7 cuenta también la luz solar y la lluvia. Un alumno que
  estudió la escena 4 marca mal. Lo correcto es "el aire es el ejemplo clásico",
  no "el único".
- **Línea 485 · definición invertida.** "Si algo tiene precio, es escaso y
  requirió trabajo" da vuelta la definición de la línea 363, y no siempre se
  cumple (la tierra tiene precio sin requerir trabajo para existir).

### segmentos-angulos

- **Líneas 213-220 y 240-244 · la figura miente en dos de los botones.** En
  `AnguloVisual` el `large-arc-flag` del arco está fijo en 0, así que **Cóncavo
  (270°)** dibuja un arco chico de 90°, y **Completo (360°)** no dibuja arco
  ninguno (el punto final coincide con el inicial) y los dos lados se superponen,
  con lo que se ve idéntico a 0°. Los dos casos más difíciles de la escena
  muestran una figura falsa. Se arregla calculando la bandera
  (`large = medida > 180 ? 1 : 0`) y, para 360°, dibujando la circunferencia con
  dos arcos o un `<circle>`.
- **Líneas 509-510 · el número da, la razón es falsa.** "720 = 8 · 90 ✓ (la suma
  de los 8 ángulos es 4 vueltas / 2)". Son **2 vueltas** (360° por cada uno de
  los dos cruces). Y "8 · 90" sugiere que cada ángulo mide 90°, que es justo lo
  que el problema niega.

### vectores-fisica

- **Líneas 268-271 · se contradice con su propia definición.** "En 2D el producto
  vectorial es un escalar" contra la línea 243, que dice "Resultado: un VECTOR".
  El producto cruz siempre da un vector; en 2D apunta en z y lo que se calcula es
  su componente z. Además concluye |G⃗| = 67 salteándose que el módulo es el
  **valor absoluto** de esa componente. (La aritmética está bien: 67.)
- **Línea 148 · fórmula incompleta que da el ángulo equivocado.**
  `θ = arctan(vy/vx)` falla cuando vx < 0: con A⃗ = (−3, 4) la calculadora
  devuelve −53,1°, pero el vector está a 126,9°. Falta la corrección de cuadrante.

### nociones-quimica

- **Líneas 368-377 · el ejemplo resuelto se contradice solo.** Calcula bien
  (5/9)(134−32) = 56,67 °C y la diferencia 26,67 °C, y después dice "probablemente
  la respuesta era Ninguno porque no encajaba con las 4 opciones", sin mostrar las
  opciones. Peor: el paréntesis "(las diferencias no se convierten igual que las
  temperaturas absolutas)" no aplica acá, porque se convirtió una temperatura
  absoluta. El alumno queda pensando que el 26,67 que acaba de calcular está mal.
- **Línea 479 · "usar °C en Pitágoras de gases".** Pitágoras no tiene nada que
  ver con gases; parece un residuo pegado de otra lección.
- **Líneas 485-488 · el título enseña la operación equivocada.** "Error 3 · sumar
  exponentes en cambio de prefijo": el factor 10⁹ para pasar de km a μm sale de
  **restar**, 3 − (−6) = 9. El cierre repite "cuidado al sumar exponentes".
- **Línea 412 · símbolo que choca con Física.** Usa γ para gravedad específica;
  γ es convencionalmente el peso específico. Lo habitual para densidad relativa
  es *s*, *d* o ρ_r.

### divisiones-economia

- **Línea 155-156 · inducción y deducción mal definidas.** "Si parte de una parte
  conocida hacia hipótesis → deducción" no es una definición comprensible ni
  correcta: la deducción va de lo general a lo particular. Hay que reescribir las
  dos con un ejemplo cada una.
- **Línea 151 · "la económica descriptiva"** — typo por "economía descriptiva".

---

## 2. VIOLACIONES DE LA REGLA DE TUTEO

Regla 2 de CLAUDE.md: el texto del alumno va en tuteo. La normalización del
13-sep dejó estos afuera.

- `nociones-quimica:56` — "el aire que respirás" → "respiras"
- `nociones-quimica:347` — "Mueves el slider y mirás" → "miras"
- `vectores-fisica:168` — "colocá B⃗ a continuación" → "coloca"
- `escasez-necesidades:163` — "Esto que te pasa a tú" → "a ti" (esto lo rompió la
  propia normalización a tuteo)

---

## 3. LAGUNAS POR LECCIÓN

Formato: línea · qué pasa → qué propone.

### divisiones-economia

1. **L36** — Se anuncian tres etapas: descripción, sistematización y
   **normalización**. "Normalización" no se define nunca y jamás se retoma: el
   alumno queda con una palabra suelta. Hay que cerrarla contra ideología /
   política económica, que es a lo que corresponde.
2. **L41 vs L78** — "credulidad" en la escena 1 y "credibilidad" en la escena 2.
   Son palabras distintas con significados distintos.
3. **L41** — "destreza" como rasgo del sentido común, sin explicar en qué sentido.
4. **L79** — "sostenido por la credibilidad derivada de tentativas primitivas y
   sin explicación": jerga académica traducida literal, ilegible para un alumno.
5. **L96** — "Consistencia: resistencia a la argumentación contraria" se define
   con palabras igual de abstractas y sin ejemplo.
6. **L117** — "Como dice Demo" — nunca se dice quién es Demo.
7. **L212** — "Samuelson:" — igual, se cita sin presentar.
8. **L112** — "necesidad de legitimación de un orden institucional": muy
   abstracto, sin bajar a un ejemplo.
9. **L157** — "interpenetración" — palabra rarísima, sin explicar.
10. **L185** — "pegging del boliviano al dólar" — extranjerismo técnico sin
    traducir.
11. **L58** — la mnemotecnia "SC-CI" no se corresponde con las iniciales que
    lista (S, C, I). Confunde en vez de ayudar.
12. **L129-191** — las tres divisiones se definen por separado y nunca se ve un
    mismo hecho económico mirado por las tres. Falta el puente (regla 1 de §4.5).

### escasez-necesidades

1. **L191** — "Como observa Richardson" sin decir quién es.
2. **L227** — "Principio 1 de Mankiw" y "disyuntivas": ni quién es Mankiw ni qué
   es una disyuntiva.
3. **L251** — usa "bien libre" cuatro escenas antes de definirlo, y no dice por
   qué el aire lo es.
4. **L257** — "ley milenaria de la escasez" aparece una sola vez, sin definir, y
   no se explica qué tiene que ver el pan con el sudor.
5. **L280** — "Ahorrar para emergencias · ¿?": el signo de pregunta no se cierra
   y el ahorro no entra en el total de 4.900 Bs.
6. **L324** — "Charles Gide (siglo XIX) decía" sin decir quién fue.
7. **L335** — "la industria publicitaria existe para CREAR necesidades" se
   declara sin fundamentar.
8. **L375** — "SeLA", "SeMAPA": siglas sin desarrollar.
9. **L169** — "Mueves los sliders": extranjerismo.
10. **L472** — la opción correcta dice que en economías ricas la escasez "se
    vuelve más grave", pero la escena 6 enseña que "cambia de cara". El que
    estudió la escena 6 marca mal.

### nociones-quimica

1. **L62-64** — las primeras fórmulas (H₂O, NaCl, C₆H₁₂O₆) aparecen sin decir
   nunca qué es un subíndice ni cómo se lee una fórmula.
2. **L68** — "una sola fase visible": "fase" es la palabra clave de la escena y
   no se traduce.
3. **L75** — "filtración, destilación, decantación": tres métodos nombrados y
   nunca explicados.
4. **L245** — "fracciones que equivalen a 1" se afirma sin decir por qué, y es la
   idea entera del método de conversión.
5. **L249** — "SI" nunca se expande, y se usan potencias 30 líneas antes de la
   escena que las enseña.
6. **L289** — "1 ≤ |a| < 10": las barras de valor absoluto entran sin puente.
7. **L295** — 6,022 × 10²³ sin decir qué cuenta ni para qué sirve.
8. **L331** — "100° agua hierve (al nivel del mar)" sin decir por qué importa la
   aclaración, que es justo lo relevante para Cochabamba (a 2.570 m hierve a
   ~92 °C).
9. **L334** — "0 K es el cero absoluto" se declara sin fundamentar.
10. **L340** — °F = (9/5)°C + 32 cae del cielo; no se dice de dónde sale el 9/5
    ni el 32.
11. **L380** — Δ aparece por primera y única vez sin traducción.
12. **L392 y L412** — ρ y γ: letras griegas sin nombrar.
13. **L397 vs L418** — define las unidades en g/cm³ y el ejemplo resuelto usa
    g/mL sin avisar que son lo mismo.
14. **L482** — Boyle, Charles y gas ideal nombrados; el alumno no los vio ni los
    va a ver en esta lección.
15. **L485-488** — regla sin ejemplo trabajado (además del error de contenido).

### segmentos-angulos

1. **L42-58** — "no se definen porque son los ladrillos primarios" y justo abajo
   tres bloques `Definicion`. Se contradice.
2. **L64 y L132** — describe el símbolo con palabras ("AB con flechita arriba")
   y nunca lo muestra renderizado.
3. **L133** — "m(AB)" se introduce y no vuelve a aparecer en toda la lección.
4. **L146-152** — el título dice "AB ≠ BA si hablamos de notación" y el cuerpo
   dice que son la misma figura. Además "vectores", "opuestos" y "sentido"
   llegan sin explicación.
5. **L270-277** — enseña la notación ∠AOB con tres letras, pero el dibujo solo
   rotula O: A y B no existen en la figura.
6. **L282-284** — "la vuelta completa son 2π radianes" sin haber dicho nunca qué
   es un radián.
7. **L356** — "perpendicular" aparece sin explicar.
8. **L409-413** — "los que NO son adyacentes son IGUALES": "adyacentes" se
   explica recién 130 líneas después, la igualdad se afirma sin prueba, y no hay
   ningún dibujo de las dos rectas cortándose.
9. **L455-492 (la más grave)** — toda la escena de paralelas describe 8 ángulos y
   4 pares en puro texto, sin un solo dibujo. "Misma posición relativa respecto
   al cruce" es imposible de entender sin verlo.
10. **L500** — "los 8 ángulos solo pueden tener 2 medidas distintas": dos saltos
    lógicos en un mismo paso.

### vectores-fisica

1. **L93** — "5 m/s norte + 3 m/s este ≠ 8 m/s": dice que no da 8 pero nunca dice
   qué da (5,83 en diagonal), así que no se ve la regla nueva.
2. **L115** — la figura muestra componentes (tema de la escena siguiente)
   mientras el texto habla de módulo, dirección y sentido.
3. **L136** — el sombrerito (î, ĵ), el par ordenado y el punto como "escalar por
   vector" entran los tres de golpe.
4. **L167-170** — el método gráfico de suma se explica solo con palabras, sin
   dibujo.
5. **L209/211** — las dos fórmulas del producto escalar se dan sueltas, sin decir
   que son la misma cosa.
6. **L225 y L303** — **el mismo "·" cambia de significado a mitad de renglón**:
   "A⃗ · B⃗ = 3·1 + 4·2". A la izquierda es la operación nueva (producto escalar),
   a la derecha es multiplicación común. Es el mismo problema que ya se corrigió
   en `mcd-mcm`, y acá es peor porque el alumno está aprendiendo justamente a
   distinguir esa operación.
7. **L230** — "W = F⃗ · d⃗ = F·d·cos θ": "F·d" parece otro producto escalar.
8. **L244** — |A⃗ × B⃗| = |A||B| sen θ aparece sin ninguna razón (es el área del
   paralelogramo).
9. **L246** — "regla de la mano derecha" se nombra y no se explica ni se dibuja.
10. **L252** — la expresión 3D del producto cruz no se deriva, no se usa, y el
    ejemplo siguiente aplica otra regla distinta.
11. **L336** — el ejercicio 5 pide "vector unitario" y la lección nunca enseña
    cómo obtenerlo.

---

## 4. LO QUE FALTA

1. **Las 4 lecciones gratis pendientes**: `operaciones-fundamentales` (1.044
   líneas, la más larga), `lectura-comprension` (890), `metodologia-leyes` (238),
   `perspectiva-historica-economia` (253).
2. **Las otras 94 lecciones** de `src/app/aprende/*/page.tsx`.
3. **Las 64 láminas** de `src/app/laminas/*/*/page.tsx`.

El método que funcionó: un agente por lección, con instrucción de leer el archivo
completo, los 8 tipos de laguna de §8 de la bitácora, y ejemplos concretos de
calibración sacados de una lección ya auditada a mano. Los agentes que además
verificaron las cuentas encontraron los errores de contenido; los que solo
buscaron redacción, no.
