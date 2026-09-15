# Auditoría pedagógica · informe

Encargo de §8 de la bitácora: leer el contenido con ojos de un alumno que ve el
tema por primera vez y marcar lo que da por sabido.

**15 lecciones auditadas**: las 9 del plan gratis (se priorizaron porque son las
que ve cualquiera que llega sin pagar, D2) más las 6 de matemática y física con
más peso en el examen.

| Lección | Lagunas | Errores de contenido |
|---|---|---|
| divisiones-economia | 12 | 2 |
| escasez-necesidades | 10 | 3 |
| nociones-quimica | 15 | 4 |
| segmentos-angulos | 10 | 2 |
| vectores-fisica | 13 | 2 |
| operaciones-fundamentales | 11 | 3 |
| lectura-comprension | 19 | 4 |
| metodologia-leyes | 14 | 1 |
| perspectiva-historica-economia | 17 | 4 |
| potenciacion | 8 | 0 |
| radicacion | 10 | 4 |
| mcd-mcm | 10 | 1 |
| operaciones-radicales | 8 | 4 |
| triangulos | 13 | 2 |
| cinematica-1d | 13 | 5 |
| **Total** | **183** | **41** |

Quedan **88 lecciones** y **64 láminas** sin auditar.

## Qué ya está corregido y qué no

**Corregido y en `main`** (solo lo que no admitía discusión, y cada cosa
verificada a mano antes de tocarla):

- El AutoCheck de la distributiva, que daba por correcta una respuesta falsa.
- La explicación de `lectura-comprension` que citaba datos inexistentes.
- 22 casos de voseo en 16 archivos.
- El arco de `AnguloVisual` (`segmentos-angulos`), que dibujaba mal 270° y 360°.
- El presupuesto de la familia López, que no cerraba, y el "¿?" del ahorro.
- La verificación de los 720° que daba el número bien por una razón falsa.
- Los dos AutoCheck de `operaciones-radicales` con dos opciones correctas.
- El producto vectorial en 2D y el `arctan` sin corrección de cuadrante.
- "Sumar exponentes" donde había que restar (`nociones-quimica`).
- Inducción y deducción, que estaban definidas al revés y sin ejemplo.
- La ley de demanda enunciada al revés (`metodologia-leyes`).
- "Síntesis neoclásica" atribuida a Marshall, en tres lugares.
- `√(9+16) NO es √9 + √4`, que se contradecía con su propia línea siguiente.
- **La rejilla del componente compartido `Ejes`** (ver abajo).

**Todo lo demás de este informe NO está corregido.** Los errores de contenido
que quedan necesitan una decisión o una verificación contra la guía oficial
antes de tocarlos, y las lagunas de redacción son muchas como para meterlas sin
que alguien las lea.

---

## 1. ERRORES DE CONTENIDO

No son problemas de redacción: es contenido que le enseña mal al alumno.

### 1.1 Corregidos

- **`operaciones-fundamentales` · el ejercicio de la distributiva enseñaba el
  error que quería evitar.** Preguntaba "¿cuánto es 7 · (10 + 2)?" con las
  opciones `["72", "70 + 2 = 72", "7 · 12 = 84", "Las dos b) y c)"]` y marcaba
  como correcta la última. O sea que daba por **válida** la opción "70 + 2 = 72",
  que es exactamente el error clásico de la distributiva: multiplicar el 7 solo
  por el primer número de adentro. La explicación, además, se contradecía sola
  (decía "70 + 14 = 84"). Como remate, "las dos b) y c)" citaba etiquetas que el
  alumno no ve: `AutoCheck` no rotula las opciones con letras. Reescrito con
  "70 + 2 = 72" como distractor, que es su lugar.
- **`lectura-comprension` · una explicación inventaba datos.** Afirmaba que "el
  texto menciona específicamente a los bancos centrales (Reserva Federal, Banco
  Central Europeo)". El texto de esa lectura no nombra a ninguno de los dos.
  Pasaba justo en la lección que enseña la "Trampa 3 · verdadera pero ajena"
  ("si no está en el texto, NO es la respuesta").

- **`Ejes` (`_components/lienzo.tsx`) · la rejilla tapaba el gráfico.** El
  componente ponía una marca por **cada número entero** entre el mínimo y el
  máximo del eje. En los gráficos de cinemática, que van en kilómetros y llegan a
  250, eso son **260 líneas de rejilla sobre 200px de alto**: un bloque gris
  sólido encima de la curva. Medido en el navegador: 260 y 266 líneas antes, 20 y
  14 después. Ahora el paso sale del rango con la escalera 1-2-5-10, apuntando a
  una docena de marcas; en los ejes chicos (−6 a 6) sigue dando paso 1, así que
  los 12 archivos que usan `Ejes` y ya se veían bien no cambian.

### 1.2 Pendientes de decidir

**`escasez-necesidades`**
- **L294 · las cuentas no dan.** Total deseado 4.900 Bs. Si postergan el celular
  (−800) y no salen a comer (−150), gastan **3.950**, y sobre 4.500 de ingreso
  **sobran 550**, no 250. El texto dice "quedan 4.750 gastados" (restó solo los
  150), y con 4.750 sobre 4.500 faltarían 250, no sobrarían. Hay que rehacer el
  cierre del caso.
- **L251 y L456 vs L387 · contradicción que hace fallar el ejercicio.** La escena
  4 y la práctica final dicen que el aire es el **único** bien libre; el AutoCheck
  de la escena 7 cuenta también la luz solar y la lluvia. El que estudió la
  escena 4 marca mal. Lo correcto es "el ejemplo clásico", no "el único".
- **L485 · definición invertida.** "Si algo tiene precio, es escaso y requirió
  trabajo" da vuelta la definición de L363, y no siempre se cumple: la tierra
  tiene precio sin requerir trabajo para existir.

**`segmentos-angulos`**
- **L213-220 y L240-244 · la figura miente en dos botones.** En `AnguloVisual` el
  `large-arc-flag` está fijo en 0, así que **Cóncavo (270°)** dibuja un arco de
  90°, y **Completo (360°)** no dibuja arco ninguno (punto final = inicial) y se
  ve idéntico a 0°. Son los dos casos más difíciles de la escena. Se arregla
  calculando la bandera (`large = medida > 180 ? 1 : 0`) y, para 360°, usando dos
  arcos o un `<circle>`.
- **L509-510 · el número da, la razón es falsa.** "720 = 8 · 90 ✓ (4 vueltas / 2)".
  Son **2 vueltas** (360° por cada cruce). Y "8 · 90" sugiere que cada ángulo mide
  90°, que es justo lo que el problema niega.

**`vectores-fisica`**
- **L268-271 · se contradice con su propia definición.** "En 2D el producto
  vectorial es un escalar" contra L243, "Resultado: un VECTOR". El producto cruz
  siempre da un vector; en 2D apunta en z y se calcula su componente z. Además
  concluye |G⃗| = 67 salteándose que el módulo es el **valor absoluto**.
- **L148 · fórmula incompleta que da el ángulo equivocado.** `θ = arctan(vy/vx)`
  falla con vx < 0: para (−3, 4) la calculadora da −53,1° pero el vector está a
  126,9°. Falta la corrección de cuadrante.

**`nociones-quimica`**
- **L368-377 · el ejemplo resuelto se contradice solo.** Calcula bien 56,67 °C y
  la diferencia 26,67 °C, y después dice "probablemente la respuesta era Ninguno",
  sin mostrar las opciones. El paréntesis "(las diferencias no se convierten igual
  que las absolutas)" no aplica acá. El alumno queda pensando que lo que calculó
  está mal.
- **L479 · "usar °C en Pitágoras de gases".** Pitágoras no tiene nada que ver con
  gases: parece un residuo pegado de otra lección.
- **L485-488 · el título enseña la operación equivocada.** "Error 3 · sumar
  exponentes": el factor 10⁹ de km a μm sale de **restar**, 3 − (−6) = 9.
- **L412 · símbolo que choca con Física.** Usa γ para gravedad específica; γ es
  convencionalmente el peso específico.

**`operaciones-fundamentales`**
- **L734-736 · la justificación de PEMDAS no se sostiene.** "Si fuera al revés no
  habría forma de escribir 'el doble de algo más uno' sin paréntesis" es falso:
  con el orden invertido solo cambiarían de lugar los paréntesis. El argumento
  real es de economía de escritura en álgebra (2x + 5 y 3x² + 2x + 1 se escriben
  sin un solo paréntesis).
- **L606 vs L641 y L935 · separador decimal inconsistente.** "0.25" con punto y
  "3,5" con coma, en escenas distintas. Conviene coma en todos (uso boliviano).

**`lectura-comprension`**
- **L501/504 · un ejercicio tiene dos opciones correctas.** Se marca "El acceso a
  mercados más amplios", pero "La ausencia de barreras geográficas" también es una
  ventaja que el texto afirma, y la propia explicación la cita. Hay que reformular
  la segunda para que sea falsa.
- **L718 · opción correcta circular.** "Los impuestos progresivos son efectivos
  cuando la riqueza se redistribuye de manera equitativa" es circular, y el texto
  no enuncia esa condición. El texto sí da una real: que no obstaculice el
  dinamismo económico.
- **L249/L258 · la opción es más fuerte que el texto.** Dice "No se aplica
  **ninguna** política de redistribución"; el texto dice "si no se aplican
  **adecuadamente**".
- **L48-51 · atribución dudosa.** La definición de comprensión lectora se cierra
  con "(RAE)" y la RAE no la define así.

**`perspectiva-historica-economia`**
- **L21, L58, L137 · "síntesis neoclásica" mal atribuida a Marshall.** Marshall
  (*Principles*, 1890) funda la economía neoclásica. "Síntesis neoclásica" es otra
  cosa y posterior: la fusión de Keynes con lo neoclásico por Hicks y Samuelson
  después de 1945. Puede hacer fallar una pregunta de examen.
- **L39-40 · atribución que invierte a Aristóteles.** Él separaba la *oikonomía*
  (administrar la casa) de la *crematística*, el "arte de la adquisición", que
  criticaba. Presentar lo segundo como su definición de economía lo da vuelta.
- **L36 · "oikonomia significa 'el que administra una casa'".** Eso es
  *oikonómos*; *oikonomía* es la administración o las reglas de la casa. El propio
  ejercicio de L229 da como correcta "administrar una casa".
- **L127 · título de la obra de Marx.** Cita "Introducción a la Crítica de la
  Economía Política"; la obra publicada es *Contribución a la crítica de la
  economía política* (1859).

**`metodologia-leyes`**
- **L162 · la ley de demanda enunciada al revés.** "Por la ley de demanda baja el
  precio". La ley relaciona una baja de precio con una suba de la cantidad
  demandada; no predice el precio.

**`triangulos`**
- **L326-344 · la figura de Pitágoras no muestra el teorema.** Los "cuadrados"
  sobre los catetos son **rectángulos** (120×60 y 50×100) y **no hay ningún
  cuadrado sobre la hipotenusa**, mientras el texto de al lado promete "el
  cuadrado sobre la hipotenusa = la suma de los cuadrados sobre los catetos". Es
  la figura central del teorema más famoso de la lección.
- **L342-344 · los lados están intercambiados** respecto de la convención que
  enseña la propia lección en L116 (cada lado lleva la letra del vértice
  opuesto): con el ángulo recto en B, la hipotenusa es AC, que sería *b*, pero la
  figura la rotula *c*.
- **L681 y L727 · un ejercicio sobre un tema que nunca se enseña.** El ejercicio 7
  se resuelve con la desigualdad triangular, que no aparece en ninguna de las 10
  escenas, y el cierre manda a "repasar" algo que no está.

**`cinematica-1d`**
- **L430 · signo mal despejado.** De `0 = v₀² + 2ad` se escribe `d = v₀²/(2a)`,
  cuando da `d = −v₀²/(2a)`. El resultado final sale bien solo porque después se
  sustituye *a* positiva, contradiciendo la línea que la declaró negativa.
- **L416 · redondeo que no cierra.** Con el a = 5,33 que se le da al alumno,
  ½(5,33)(25) = 66,63, no 66,67 (ese sale de a = 16/3).
- **Los rótulos de los ejes mienten en todos los gráficos.** `Ejes` rotula
  siempre "x" al horizontal e "y" al vertical. En un gráfico x-t el horizontal es
  **t** y el vertical es **x**, así que queda un eje que dice "x" con la etiqueta
  "Δt = 4 h" encima. Arreglarlo pide agregarle rótulos configurables al
  componente compartido.
- **L279-292 · la escena es MRU y el ejemplo usa ½at²**, que es MRUA y se define
  recién dos escenas después.

**`radicacion`**
- **L812-820 · dos ejercicios flojos**: uno tiene un distractor muerto ("12/2",
  que nadie elige) y otro pide "reescribir sin exponente fraccionario" pero todas
  las opciones vienen ya evaluadas, así que se responde por el número.

**`divisiones-economia`**
- **L155-156 · inducción y deducción mal definidas.** "Si parte de una parte
  conocida hacia hipótesis → deducción" no es comprensible ni correcto: la
  deducción va de lo general a lo particular.
- **L151 · "la económica descriptiva"** — typo por "economía descriptiva".

---

## 2. PATRONES QUE SE REPITEN

No son 121 problemas distintos: son cinco patrones que vuelven en casi todas.

1. **Autor citado sin presentar** (11 casos). "Como dice Demo", "Samuelson:",
   "Richardson", "Mankiw", "Charles Gide", "Zamora", "Lange", "Quesnay",
   "Ricardo". El alumno no tiene idea de quiénes son y la cita no le agrega nada.
   Alcanza con una aposición de seis palabras: quién fue, de dónde, por qué
   importa.
2. **Término anunciado en una lista y nunca retomado** (9 casos). El más claro:
   `divisiones-economia` promete "descripción, sistematización y **normalización**"
   y nunca define la tercera. Igual con "modelo", "más exacta", "Trampa 3".
3. **Jerga académica traducida literal** (más de 20 casos). "Sostenido por la
   credibilidad derivada de tentativas primitivas", "proceso apriorístico",
   "interpenetración", "resultado global de una infinidad de hechos elementales".
   Son frases de manual universitario copiadas tal cual.
4. **Notación que entra sin puente** (14 casos). El sombrerito de los versores,
   las barras de valor absoluto, Δ, ρ, γ, α, los subíndices de las fórmulas
   químicas, 6,022 × 10²³, `C = f(Y)`. Aparecen y se usan en la misma línea.
5. **Extranjerismo sin traducir** (5 casos). "pegging", "peg", "slider",
   "e-commerce", "PyMEs".

Y uno más chico pero que vale: **la misma idea con dos nombres distintos entre
escenas** (8 casos), del tipo "credulidad" y "credibilidad", o "idea principal",
"tema central", "idea central" y "eje" para lo mismo. Varias veces eso hace que
el ejercicio contradiga a la escena que lo precede.

---

## 3. LAGUNAS POR LECCIÓN

El detalle línea por línea, con la propuesta de reemplazo de cada una, está en
los informes de los agentes. Acá va el índice de lo más importante de cada
lección; lo demás cae en los cinco patrones de arriba.

- **divisiones-economia** — "normalización" nunca se cierra (L36);
  "credulidad"/"credibilidad" (L41 vs L78); la mnemotecnia "SC-CI" no se
  corresponde con las iniciales que lista (L58); las tres divisiones nunca se ven
  aplicadas a un mismo hecho económico.
- **escasez-necesidades** — "bien libre" se usa cuatro escenas antes de definirlo
  (L251); "ley milenaria de la escasez" aparece una vez y sin definir (L257); un
  rubro del presupuesto queda con "¿?" y no entra en el total (L280).
- **nociones-quimica** — las primeras fórmulas aparecen sin decir nunca cómo se
  lee una fórmula (L62); "fase" es la palabra clave de la escena y no se traduce
  (L68); °F = (9/5)°C + 32 cae del cielo (L340); 6,022 × 10²³ sin decir qué cuenta
  (L295).
- **segmentos-angulos** — dice "no se definen porque son ladrillos primarios" y
  abajo pone tres `Definicion` (L42); enseña ∠AOB con tres letras pero el dibujo
  solo rotula O (L270); "2π radianes" sin haber dicho qué es un radián (L282);
  **toda la escena de paralelas describe 8 ángulos sin un solo dibujo** (L455-492,
  la peor de la lección).
- **vectores-fisica** — **el mismo "·" cambia de significado a mitad de renglón**
  ("A⃗ · B⃗ = 3·1 + 4·2", L225 y L303): a la izquierda es la operación nueva, a la
  derecha es multiplicación común, justo cuando el alumno está aprendiendo a
  distinguirla; el método gráfico de suma se explica sin dibujo (L167); el
  ejercicio 5 pide "vector unitario" y la lección nunca enseña a obtenerlo (L336).
- **operaciones-fundamentales** — **nunca se dice qué es un exponente** y sin
  embargo "3²" aparece en tres lugares (L91, L553, L757); "opuesto" se usa dos
  veces sin definir (L138, L322); restar un negativo se resuelve con una regla que
  no se enunció (L831); "−(−4)" aparece en la práctica sin haberse explicado
  (L940).
- **lectura-comprension** — "inferir" nunca se explica, siendo media lección
  (L44); la escena se llama "Ejemplo guiado" y no guía nada, el único caso resuelto
  paso a paso está recién en la escena 10 (L98); varios ejercicios no justifican
  por qué se descarta la opción tentadora (L261, L317), que en comprensión lectora
  es lo que hay que enseñar.
- **metodologia-leyes** — "apriorístico" sin traducir (L72); de las cuatro cosas
  que anuncia ("principios, teorías, leyes y modelos") solo desarrolla las leyes
  (L78); `C_D = f(P)` sin explicar la notación (L178).
- **perspectiva-historica-economia** — los mercantilistas se nombran y se les
  atribuye un giro histórico sin decir quiénes eran (L77); Quesnay, Ricardo y
  Lange aparecen sin presentación; la definición de Robbins, "la más preguntada
  del bloque", no tiene un solo ejemplo (L172); el título de una escena dice
  "Smith y Quesnay" y el índice dice "Smith y Ricardo" (L91 vs L19).

---

## 4. CÓMO SEGUIR

Faltan 94 lecciones (`src/app/aprende/*/page.tsx`) y 64 láminas
(`src/app/laminas/*/*/page.tsx`).

**El método que funcionó:** un agente por lección, con instrucción de leer el
archivo completo, los tipos de laguna de §8 de la bitácora, y **ejemplos
concretos de calibración sacados de una lección ya auditada a mano**. Sin esos
ejemplos los informes salen genéricos.

**Lo que más rindió:** pedirles explícitamente que **verifiquen las cuentas y
resuelvan los ejercicios** antes de darlos por buenos. Los errores más graves
—el de la distributiva, el presupuesto que no cierra, las dos opciones correctas—
salieron de ahí, no de leer la redacción. Un agente que solo busca prosa confusa
no los encuentra.

**Ojo con los falsos positivos al barrer voseo**: "sabes" es tuteo correcto, el
voseo es "sabés". Un patrón sin la tilde marca 87 líneas, casi todas buenas. Y
los comentarios de código van en rioplatense a propósito (regla 2): no son
errores.
