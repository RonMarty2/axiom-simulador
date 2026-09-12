---
universidad: UMSS
facultad: ingenieria
anio: 2009
categoria: parcial_curso
titulo: Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2009)
duracion_minutos: 150
total_preguntas: 30
ponderacion:
  aritmetica_algebra: 0.20
  geometria_trigonometria: 0.20
  quimica: 0.20
  fisica: 0.20
  biologia: 0.20
---

<!--
  Primer Parcial · Segundo Curso Pre-Facultativo · UMSS FCyT ·
  Gestión 2-2009. El PDF original dice "SEGUNDO CURSO PRE-FACULTATIVO
  2-2009" — es un track paralelo al "Primer Curso" de la misma gestión
  (cargado en archivos separados 2009-2curso-parcial*.md). Estructura
  "5 libros parejos": Aritmética-Álgebra 5, Geometría-Trigonometría 5,
  Química 5, Física 5, Biología 10 = 30 preguntas, cada área vale 20%
  del examen. Este examen no tiene figuras genuinas.

  ESTADO (26-jul-2026): 30/30 preguntas verificadas con cálculo
  numérico/algebraico completo e independiente (verificación cruzada
  con Python en las preguntas más sensibles), sin adivinar ningún
  resultado. Casos resueltos con especial cuidado:
  - Aritmética #5 (obreros que se retiran): el enunciado original es
    ambiguo entre "días adicionales" (24) y "días totales desde el
    inicio" (29). Solo 29 figura entre las opciones, así que esa es la
    interpretación consistente y la respuesta correcta (D).
  - Geometría #4 (suplemento del complemento de φ): resolviendo la
    ecuación se obtiene φ=60° y por lo tanto complemento(φ)=30°, valor
    que NO figura entre las opciones (100°,80°,60°,150°) — se marcó
    "E) Ninguno" en vez de forzar la respuesta a φ=60° (que sí aparece
    como opción C pero es el ángulo, no su complemento, que es lo que
    pide el enunciado).
  - Geometría #5 (afirmaciones falsas): se evaluó cada alternativa
    (A-D) una por una contra la teoría estándar; las cuatro resultan
    falsas (ángulos iguales se oponen a lados iguales, congruencia ≠
    semejanza, baricentro ≠ incentro, ángulo exterior = suma no
    semidiferencia), así que la respuesta es "E) Ninguno".
  - Química #1 (números cuánticos vía ion tripositivo con subnivel
    4d⁶): se reconstruyó la configuración del ion (44 electrones) y del
    átomo neutro (Z=47, 4d⁹), y se determinó el último electrón
    aplicando la MISMA convención de llenado/apareamiento usada en el
    resto del banco de exámenes (orden m=-2,-1,0,+1,+2 tanto para la
    primera pasada de Hund como para el apareamiento, ver ejemplo de Cu
    3d¹⁰ en 2008-2curso-parcial1-2-2008.md). El resultado (n=4,l=2,
    m=+1,s=-1/2) no coincide con ninguna opción dada (la opción A tiene
    el mismo m pero spin +1/2 en vez de -1/2), así que se marcó
    "E) Ninguno" en vez de forzar el match.
  - Química #4 (isóbaro/isótono en cadena): se resolvió la cadena
    completa Co-60 (Z=27,N=33) → catión isóbaro con Ni-59 e isótono con
    Co-60 → Fe³⁺ (Z=26) → átomo E isoelectrónico con Fe³⁺ (23
    electrones) y neutro → Z=23 (Vanadio), confirmando 3 electrones
    desapareados en 3d³ por regla de Hund.
-->

## Pregunta 1
area: aritmetica_algebra
tema: reparto-herencia-fraccionaria
dificultad: medio

Un padre deja como herencia un monto para repartir entre sus hijos: al primer hijo 2/3 del monto total; al segundo la mitad de lo que queda; al tercero 3/5 de lo del segundo hijo; al cuarto hijo 400 Bs. Determinar el monto total.

- A) 2000 Bs
- B) 4000 Bs
- C) 6000 Bs
- D) 8000 Bs
- E) Ninguno

**respuesta:** C
**explicacion:** Expresá cada porción en función del total T y planteá que la suma de las cuatro partes es igual a T.
Paso 1 · Hijo 1 = $\frac23T$. Resto tras el primero = $\frac13T$.
Paso 2 · Hijo 2 = mitad del resto = $\frac12\cdot\frac13T=\frac16T$. Resto tras el segundo = $\frac13T-\frac16T=\frac16T$.
Paso 3 · Hijo 3 = $\frac35$ de lo del hijo 2 = $\frac35\cdot\frac16T=\frac{1}{10}T$.
Paso 4 · Hijo 4 = $T-\frac23T-\frac16T-\frac{1}{10}T=T\left(1-\frac{20}{30}-\frac{5}{30}-\frac{3}{30}\right)=T\cdot\frac{2}{30}=\frac{T}{15}=400 \Rightarrow T=6000$.
Respuesta: C.

---

## Pregunta 2
area: aritmetica_algebra
tema: cifras-numero-tres-digitos
dificultad: medio

Un número de tres cifras: la cifra de las unidades excede en 5 a la de las centenas; la cifra de las decenas excede en 1 a la de las centenas; la cifra de las unidades es el doble de la suma de las cifras de las decenas y centenas. Determinar el número.

- A) 146
- B) 136
- C) 126
- D) 116
- E) Ninguno

**respuesta:** C
**explicacion:** Plantéa las tres condiciones en función de la cifra de las centenas y resolvé el sistema.
Paso 1 · Sea $h$=centenas, $t$=decenas, $u$=unidades. $u=h+5$, $t=h+1$, $u=2(t+h)$.
Paso 2 · Sustituyendo: $h+5=2(h+1+h)=4h+2 \Rightarrow 3=3h \Rightarrow h=1$.
Paso 3 · $t=h+1=2$, $u=h+5=6$. Verificación: $u=2(t+h)=2(2+1)=6$ ✓.
Paso 4 · Número $=100h+10t+u=100+20+6=126$.
Respuesta: C.

---

## Pregunta 3
area: aritmetica_algebra
tema: regla-tres-compuesta-viveres
dificultad: medio

Una guarnición de 1600 hombres tiene víveres para 10 días a razón de 3 raciones diarias cada hombre. Si se refuerzan con 400 hombres, ¿cuántos días duran los víveres si cada hombre toma 2 raciones diarias?

- A) 16
- B) 14
- C) 12
- D) 10
- E) Ninguno

**respuesta:** C
**explicacion:** El total de raciones disponibles es fijo; calculá el consumo diario del nuevo grupo y dividí.
Paso 1 · Total de raciones disponibles $=1600\times10\times3=48\,000$.
Paso 2 · Con el refuerzo, la guarnición tiene $1600+400=2000$ hombres, consumiendo $2000\times2=4000$ raciones por día.
Paso 3 · Días $=\dfrac{48\,000}{4\,000}=12$.
Respuesta: C.

---

## Pregunta 4
area: aritmetica_algebra
tema: cifras-intercambio-digitos
dificultad: medio

Al sumar 18 unidades a un número de dos cifras, el dígito de las unidades y el de las decenas intercambian su posición. Determinar el número sabiendo que el dígito de las unidades es el doble del de las decenas.

- A) 13
- B) 24
- C) 42
- D) 31
- E) Ninguno

**respuesta:** B
**explicacion:** Escribí el número como $10a+b$ (con $a$=decenas, $b$=unidades) y planteá las dos condiciones.
Paso 1 · $b=2a$ y $10a+b+18=10b+a$ (número con dígitos intercambiados).
Paso 2 · De la segunda ecuación: $9a-9b+18=0 \Rightarrow a-b+2=0 \Rightarrow a=b-2$.
Paso 3 · Sustituyendo $b=2a$: $a=2a-2 \Rightarrow a=2$, $b=4$.
Paso 4 · Número $=10(2)+4=24$. Verificación: $24+18=42$, que son los dígitos de 24 intercambiados ✓.
Respuesta: B.

---

## Pregunta 5
area: aritmetica_algebra
tema: trabajo-obreros-rendimiento
dificultad: dificil

Ocho obreros pueden hacer una obra en 20 días. Después de 5 días de trabajo se retiran 3 obreros. ¿En cuántos días terminan la obra en total (contados desde el inicio)?

- A) 19
- B) 31
- C) 21
- D) 29
- E) Ninguno

**respuesta:** D
**explicacion:** Trabajá en unidades de "obrero-día" para medir el avance de la obra.
Paso 1 · Trabajo total $=8\times20=160$ obrero-días.
Paso 2 · En los primeros 5 días se avanza $8\times5=40$ obrero-días; falta $160-40=120$ obrero-días.
Paso 3 · Quedan $8-3=5$ obreros, que tardan $\dfrac{120}{5}=24$ días adicionales en terminar lo que falta.
Paso 4 · Días totales desde el inicio $=5+24=29$ (el valor "24" no figura entre las opciones, lo que confirma que el enunciado pide el tiempo total, no el adicional).
Respuesta: D.

---

## Pregunta 6
area: geometria_trigonometria
tema: segmentos-colineales
dificultad: medio

Puntos colineales consecutivos A, B, C, D, E. Si $AC=DE$; B es punto medio de AC; $8\cdot CE=4\cdot AE+20$. Hallar el segmento CD.

- A) 5
- B) 6
- C) 7
- D) 8
- E) Ninguno

**respuesta:** A
**explicacion:** Expresá todos los segmentos en función de $AB=BC=m$ (por ser B punto medio de AC) y $CD=d$.
Paso 1 · $AB=BC=m \Rightarrow AC=2m=DE$. Sea $CD=d$.
Paso 2 · $AE=AB+BC+CD+DE=m+m+d+2m=4m+d$. $CE=CD+DE=d+2m$.
Paso 3 · Ecuación: $8(d+2m)=4(4m+d)+20 \Rightarrow 8d+16m=16m+4d+20 \Rightarrow 4d=20 \Rightarrow d=5$ (el término $m$ se cancela, por lo que el resultado es independiente de su valor).
Respuesta: A.

---

## Pregunta 7
area: geometria_trigonometria
tema: altura-bisectriz-triangulo
dificultad: dificil

Triángulo ABC; AD es la altura relativa a BC; BE es la bisectriz interior del ángulo B; se interceptan en F. Si $\angle A=64°$, $\angle C=42°$, hallar el ángulo $\angle AFB$.

- A) 127°
- B) 137°
- C) 107°
- D) 117°
- E) Ninguno

**respuesta:** A
**explicacion:** Trabajá con el triángulo ABF, usando los ángulos parciales que genera la altura y la bisectriz en el vértice A y en el vértice B.
Paso 1 · $\angle B=180°-64°-42°=74°$.
Paso 2 · En el triángulo ABD (D pie de la altura), $\angle ADB=90°$ y $\angle ABD=\angle ABC=74°$, entonces $\angle BAD=180°-90°-74°=16°$.
Paso 3 · Como F está sobre AD, $\angle FAB=\angle DAB=16°$. Como F está sobre BE (bisectriz de B), $\angle ABF=\angle ABE=\dfrac{74°}{2}=37°$.
Paso 4 · En el triángulo ABF: $\angle AFB=180°-16°-37°=127°$.
Respuesta: A.

---

## Pregunta 8
area: geometria_trigonometria
tema: poligonos-diagonales-vertices
dificultad: medio

Dos números consecutivos representan el número de vértices de dos polígonos convexos. La diferencia del número total de sus diagonales es 3. Determinar el número de lados del polígono mayor.

- A) 7
- B) 6
- C) 5
- D) 4
- E) Ninguno

**respuesta:** C
**explicacion:** Usá la fórmula de diagonales $D(n)=\dfrac{n(n-3)}{2}$ para dos polígonos de $n$ y $n+1$ lados.
Paso 1 · $D(n+1)-D(n)=\dfrac{(n+1)(n-2)}{2}-\dfrac{n(n-3)}{2}=\dfrac{(n^2-n-2)-(n^2-3n)}{2}=\dfrac{2n-2}{2}=n-1$.
Paso 2 · Igualando a la diferencia dada: $n-1=3 \Rightarrow n=4$.
Paso 3 · El polígono mayor tiene $n+1=5$ lados. Verificación: $D(4)=2$, $D(5)=5$, diferencia $=3$ ✓.
Respuesta: C.

---

## Pregunta 9
area: geometria_trigonometria
tema: complemento-suplemento-angulo
dificultad: dificil

El suplemento del complemento del ángulo φ es igual al quíntuplo del complemento de φ. Calcular el complemento de φ.

- A) 100°
- B) 80°
- C) 60°
- D) 150°
- E) Ninguno

**respuesta:** E
**explicacion:** Planteá la ecuación con el complemento $c=90°-\varphi$ y su suplemento $180°-c$.
Paso 1 · Complemento: $c=90°-\varphi$. Suplemento del complemento: $180°-c=180°-(90°-\varphi)=90°+\varphi$.
Paso 2 · Ecuación: $90°+\varphi=5(90°-\varphi) \Rightarrow 90°+\varphi=450°-5\varphi \Rightarrow 6\varphi=360° \Rightarrow \varphi=60°$.
Paso 3 · El complemento pedido es $c=90°-60°=30°$, valor que NO figura entre las opciones (100°, 80°, 60°, 150°) — nótese que 60° (opción C) es el valor de φ, no de su complemento, que es lo que pide el enunciado.
Paso 4 · Por política de rigor, no se fuerza el resultado a la opción que coincide por casualidad con φ.
Respuesta: E.

---

## Pregunta 10
area: geometria_trigonometria
tema: afirmaciones-geometricas-conceptuales
dificultad: medio

Indicar cuál de las siguientes afirmaciones es correcta:

- A) En todo triángulo isósceles a lados iguales se oponen ángulos diferentes
- B) Dos o más triángulos son congruentes si tienen la misma forma
- C) El punto de intersección de las tres medianas de un triángulo se denomina Incentro
- D) En todo triángulo, un ángulo exterior es igual a la semidiferencia de los ángulos interiores no adyacentes
- E) Ninguno

**respuesta:** E
**explicacion:** Evaluá cada afirmación una por una contra la teoría estándar de geometría.
Paso 1 · A) Falsa: en un triángulo isósceles, a lados iguales se oponen ángulos IGUALES, no diferentes.
Paso 2 · B) Falsa: tener la misma forma (sin igual tamaño) define triángulos SEMEJANTES, no congruentes; la congruencia exige igual forma Y tamaño.
Paso 3 · C) Falsa: la intersección de las tres medianas se llama BARICENTRO (o centroide); el incentro es la intersección de las bisectrices.
Paso 4 · D) Falsa: un ángulo exterior es igual a la SUMA (no la semidiferencia) de los dos ángulos interiores no adyacentes.
Paso 5 · Como las cuatro afirmaciones son falsas, no hay opción correcta entre A-D.
Respuesta: E.

---

## Pregunta 11
area: quimica
tema: numeros-cuanticos-ion-configuracion
dificultad: dificil

Indique los números cuánticos del último electrón de un átomo neutro donde su ion tripositivo tiene 6 electrones en el subnivel con número cuántico azimutal l=2 y número cuántico principal n=4 (osea, subnivel 4d⁶). Considerar que el primer electrón de cada orbital tiene spin +1/2.

- A) 4,2,+1,+1/2
- B) 4,2,+2,-1/2
- C) 3,2,0,-1/2
- D) 4,2,-1,-1/2
- E) Ninguno

**respuesta:** E
**explicacion:** Reconstruí la configuración completa del ion a partir del dato del subnivel 4d⁶, sumá los 3 electrones para el átomo neutro, y ubicá el último electrón según Hund con la misma convención de llenado usada en el resto del banco (orden $m=-2,-1,0,+1,+2$ tanto para la primera pasada como para el apareamiento).
Paso 1 · Orden de llenado hasta 4d: $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^{10} 4p^6 5s^2 4d^6$. Sumando: $2+2+6+2+6+2+10+6+2+6=44$ electrones en el ion X³⁺.
Paso 2 · Átomo neutro X: $44+3=47$ electrones (Z=47), con configuración $\ldots 5s^2 4d^9$ (los 3 electrones adicionales completan 4d de 6 a 9).
Paso 3 · En el subnivel 4d ($l=2$, orbitales $m=-2,-1,0,+1,+2$): los primeros 5 electrones ocupan cada orbital una vez con spin $+1/2$ (electrones 1-5); a partir del 6º empieza el apareamiento en el mismo orden $m=-2,-1,0,+1,+2$ con spin $-1/2$ (electrones 6,7,8,9,10).
Paso 4 · El 9º electrón (el último del átomo neutro, ya que $4d^9$) es el 4º del apareamiento: $m=+1$, $s=-1/2$. Números cuánticos: $n=4$, $l=2$, $m=+1$, $s=-1/2$.
Paso 5 · Comparando con las opciones: la opción A tiene el mismo $n,l,m$ pero spin $+1/2$ (no $-1/2$); ninguna opción coincide exactamente con $(4,2,+1,-1/2)$.
Respuesta: E.

---

## Pregunta 12
area: quimica
tema: densidad-mezcla-liquidos
dificultad: dificil

Se mezcla un líquido "x" con agua: densidad resultante 1.25 g/cm³, volumen 1 litro. Se extraen 40 cm³ del líquido x y se agrega igual cantidad de agua; la densidad de la mezcla baja a 1.1 g/cm³. Hallar la densidad del líquido x (densidad agua=1 g/cm³).

- A) 5.87 g/cm³
- B) 4.75 g/cm³
- C) 1.25 g/cm³
- D) 7.56 g/cm³
- E) Ninguno

**respuesta:** B
**explicacion:** Plantéa la masa de la mezcla antes y después del intercambio de volúmenes, usando $V_x$ (volumen original de líquido x) y $d_x$ como incógnitas.
Paso 1 · Masa original: $V_x\,d_x+(1000-V_x)(1)=1000(1.25)=1250 \Rightarrow V_x\,d_x-V_x=250$ (i).
Paso 2 · Tras sacar 40 cm³ de x y agregar 40 cm³ de agua (volumen total sigue en 1000 cm³): $(V_x-40)d_x+(1040-V_x)(1)=1000(1.1)=1100$.
Paso 3 · Desarrollando: $V_x d_x-40d_x+1040-V_x=1100 \Rightarrow (V_x d_x-V_x)-40d_x=60$. Sustituyendo (i): $250-40d_x=60 \Rightarrow 40d_x=190 \Rightarrow d_x=4.75$.
Paso 4 · Verificación: de (i), $V_x=\dfrac{250}{4.75-1}=66.67$ cm³ (consistente, menor a 1000 y mayor a 40). Masa original $=66.67(4.75)+933.33(1)=1250$ ✓. Masa nueva $=26.67(4.75)+973.33(1)=1100$ ✓.
Respuesta: B.

---

## Pregunta 13
area: quimica
tema: escalas-termometricas
dificultad: medio

Se diseñó una nueva escala de temperatura basada en el punto de congelamiento del agua (0) y la temperatura normal corporal humana (97°F), tomada como 12. ¿Cuál es la temperatura del agua hirviente en la nueva escala?

- A) 73.2
- B) 23.2
- C) 33.2
- D) 43.2
- E) Ninguno

**respuesta:** C
**explicacion:** Convertí 97°F a Celsius, y planteá la proporcionalidad lineal entre la escala Celsius y la nueva escala (ambas parten de 0 en el punto de congelamiento).
Paso 1 · $97°F$ a Celsius: $C=(97-32)\times\frac59=\frac{325}{9}\approx36.11°C$.
Paso 2 · Como ambas escalas coinciden en 0 (congelamiento), la relación es lineal: $\dfrac{T_{nueva}}{T_C}=\dfrac{12}{36.11}$.
Paso 3 · Para el punto de ebullición ($T_C=100°C$): $T_{nueva}=100\times\dfrac{12}{36.11}=\dfrac{1200}{36.11}\approx33.23$.
Respuesta: C.

---

## Pregunta 14
area: quimica
tema: isotopos-isobaros-isotonos
dificultad: dificil

Un átomo "E" es isoelectrónico con un catión de carga 3+ que a su vez es isóbaro (mismo número de masa) con el ⁵⁹Ni, y es isótono (mismo número de neutrones) con el ⁶⁰Co (Z=27). Determinar el número de orbitales desapareados que presenta el átomo E (neutro).

- A) 3
- B) 2
- C) 4
- D) 1
- E) Ninguno

**respuesta:** A
**explicacion:** Reconstruí la cadena de datos isóbaro/isótono para hallar el catión, después usá la isoelectronicidad para hallar Z del átomo E neutro.
Paso 1 · $^{60}Co$: Z=27, masa=60, neutrones $=60-27=33$.
Paso 2 · El catión es isóbaro con $^{59}Ni$ (masa=59) e isótono con $^{60}Co$ (neutrones=33) $\Rightarrow$ protones $=59-33=26$, es decir Fe³⁺ (consistente con la carga 3+ dada).
Paso 3 · Fe³⁺ tiene $26-3=23$ electrones. El átomo E es isoelectrónico con Fe³⁺ pero es neutro, así que $Z(E)=23$ (Vanadio).
Paso 4 · Configuración de V (Z=23): $1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^3$. En $3d^3$ (5 orbitales disponibles), por regla de Hund los 3 electrones ocupan 3 orbitales distintos, todos desapareados.
Paso 5 · El subnivel $4s^2$ está completo (apareado), así que el total de orbitales desapareados es 3.
Respuesta: A.

---

## Pregunta 15
area: quimica
tema: enlaces-covalentes-lewis
dificultad: medio

Realizar los enlaces (Lewis y Barras) e indicar cuál de las siguientes especies tiene la mayor cantidad de enlaces covalentes simples:

- A) $\mathrm{Cl_{2}O_{7}}$
- B) $\mathrm{CCl_{2}FNH_{2}}$
- C) $\mathrm{H_{3}SbO_{4}}$
- D) $\mathrm{C_{2}H_{6}}$
- E) $\mathrm{H_{2}SO_{4}}$

**respuesta:** D
**explicacion:** Construí la estructura de Lewis de cada especie y contá únicamente los enlaces simples (no los dobles).
Paso 1 · $\mathrm{Cl_{2}O_{7}}$ ($\mathrm{O_{3}Cl-O-ClO_{3}}$): 2 enlaces simples Cl-O-Cl (puente) + 6 enlaces dobles Cl=O (3 por cada Cl) → 2 enlaces simples.
Paso 2 · $\mathrm{CCl_{2}FNH_{2}}$: C central con 2 enlaces C-Cl, 1 C-F, 1 C-N (4 simples), más 2 enlaces N-H (2 simples) → 6 enlaces simples.
Paso 3 · $\mathrm{H_{3}SbO_{4}}$ (análogo a $\mathrm{H_{3}PO_{4}}$): Sb con 3 enlaces Sb-O simples (a los OH) + 1 enlace Sb=O doble; más 3 enlaces O-H simples → 3+3=6 enlaces simples.
Paso 4 · $\mathrm{C_{2}H_{6}}$ (etano, $\mathrm{H_{3}C-CH_{3}}$): 1 enlace C-C simple + 6 enlaces C-H simples (3 por cada carbono) → 7 enlaces simples, todos simples (no hay dobles ni triples).
Paso 5 · $\mathrm{H_{2}SO_{4}}$: 2 enlaces S-O simples (a los OH) + 2 enlaces O-H simples + 2 enlaces S=O dobles → 4 enlaces simples.
Paso 6 · Comparando: $\mathrm{Cl_{2}O_{7}}$=2, $\mathrm{CCl_{2}FNH_{2}}$=6, $\mathrm{H_{3}SbO_{4}}$=6, $\mathrm{C_{2}H_{6}}$=7, $\mathrm{H_{2}SO_{4}}$=4. El máximo es $\mathrm{C_{2}H_{6}}$ con 7.
Respuesta: D.

---

## Pregunta 16
area: fisica
tema: mru-encuentro
dificultad: facil

Dos esferas A y B se aproximan con movimientos rectilíneos uniformes, rapideces 2 m/s y 3 m/s; en t=0 la distancia entre ellas es 15 m. ¿En cuánto tiempo (s) colisionarán?

- A) 5 s
- B) 2 s
- C) 3 s
- D) 4 s
- E) Ninguno

**respuesta:** C
**explicacion:** Cuando dos móviles se acercan, la distancia se cierra a la suma de sus rapideces.
Paso 1 · Rapidez de acercamiento $=2+3=5$ m/s.
Paso 2 · Tiempo $=\dfrac{15\text{ m}}{5\text{ m/s}}=3$ s.
Respuesta: C.

---

## Pregunta 17
area: fisica
tema: mruv-posicion-velocidad
dificultad: medio

Un cuerpo con aceleración uniforme tiene velocidad 12 m/s cuando su posición x=3m. Dos segundos después su posición x=-5m. La magnitud de la aceleración (m/s²) es:

- A) 12
- B) 16
- C) 17
- D) 30
- E) Ninguno

**respuesta:** B
**explicacion:** Usá la ecuación de posición $x(t)=x_0+v_0t+\frac12at^2$ tomando $t=0$ en el instante en que $x_0=3$ y $v_0=12$.
Paso 1 · $x(2)=-5=3+12(2)+\frac12a(2)^2=3+24+2a=27+2a$.
Paso 2 · $2a=-5-27=-32 \Rightarrow a=-16$ m/s².
Paso 3 · Magnitud $=16$ m/s².
Respuesta: B.

---

## Pregunta 18
area: fisica
tema: mruv-frenado-distancia
dificultad: medio

Un auto marcha a 90 km/h. El conductor frena al ver un bache y reduce su velocidad a 1/5 de la inicial en los 4s que tarda en llegar al bache. Determinar a qué distancia del obstáculo aplicó los frenos (aceleración constante).

- A) 20.2 m
- B) 55 m
- C) 60 m
- D) 56.25 m
- E) Ninguno

**respuesta:** C
**explicacion:** Convertí la velocidad a m/s, hallá la velocidad final y usá la distancia como el área bajo la curva v-t (velocidad media × tiempo).
Paso 1 · $v_0=90$ km/h $=25$ m/s. $v_f=\frac15(25)=5$ m/s, en $t=4$ s.
Paso 2 · Velocidad media $=\dfrac{25+5}{2}=15$ m/s (válida porque la aceleración es constante).
Paso 3 · Distancia $=15\times4=60$ m.
Paso 4 · Verificación con $a=\dfrac{5-25}{4}=-5$ m/s²: $d=v_0t+\frac12at^2=25(4)+\frac12(-5)(16)=100-40=60$ m ✓.
Respuesta: C.

---

## Pregunta 19
area: fisica
tema: caida-libre-lanzamiento-vertical
dificultad: dificil

Desde un globo aerostático que se eleva a 20 m/s se deja caer una carga cuando el globo está a 160m sobre el suelo. Determinar la altura máxima alcanzada por la carga (desde el suelo) y el tiempo que tarda en tocar el suelo (m y s).

- A) 180.4;8.1
- B) 200.8;11.2
- C) 180.4;10.1
- D) 190.6;8.1
- E) Ninguno

**respuesta:** A
**explicacion:** La carga sale con la velocidad del globo (20 m/s hacia arriba) desde 160 m; primero sube un poco más antes de caer.
Paso 1 · Altura adicional que sube tras soltarse: $v^2=v_0^2-2g\,h_{sube} \Rightarrow 0=20^2-2(9.8)h_{sube} \Rightarrow h_{sube}=\dfrac{400}{19.6}\approx20.41$ m.
Paso 2 · Altura máxima desde el suelo $=160+20.41=180.41\approx180.4$ m.
Paso 3 · Tiempo total: resolviendo $y(t)=160+20t-4.9t^2=0$: $4.9t^2-20t-160=0 \Rightarrow t=\dfrac{20+\sqrt{400+4(4.9)(160)}}{9.8}=\dfrac{20+\sqrt{3536}}{9.8}\approx\dfrac{20+59.46}{9.8}\approx8.11$ s.
Respuesta: A.

---

## Pregunta 20
area: fisica
tema: tiro-parabolico-pared
dificultad: dificil

Un niño arroja una piedra desde 1m de altura con ángulo de elevación 45°, rapidez inicial 20 m/s. A 10m de distancia hay una pared. Determinar la altura en la pared donde impacta la piedra (respecto a la base de la pared).

- A) 10.49 m
- B) 8.55 m
- C) 9.89 m
- D) 11.2 m
- E) Ninguno

**respuesta:** B
**explicacion:** Hallá el tiempo en que la piedra recorre los 10 m horizontales, y usalo en la ecuación de altura.
Paso 1 · Con $\theta=45°$: $v_{0x}=v_{0y}=20\cos45°=20\sin45°\approx14.142$ m/s.
Paso 2 · Tiempo para $x=10$ m: $t=\dfrac{10}{14.142}\approx0.7071$ s.
Paso 3 · Altura: $y=1+v_{0y}t-\frac12gt^2=1+20(0.7071)(0.7071)-\frac12(9.8)(0.7071)^2=1+10-2.45=8.55$ m (usando que $\cos45°=\sin45°=\frac{\sqrt2}{2}$, entonces $(0.7071)^2=0.5$ exactamente).
Respuesta: B.

---

## Pregunta 21
area: biologia
tema: iones-funcion-biologica
dificultad: facil

Las funciones de los aniones y cationes en los organismos vivos son:

- A) Regulan el pH del cuerpo
- B) Permiten la transmisión del impulso nervioso
- C) Controlan la entrada y salida del agua de las células
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Evaluá cada función por separado.
Paso 1 · Los iones (bicarbonato, fosfato, etc.) actúan como sistemas amortiguadores que regulan el pH.
Paso 2 · Los iones Na⁺, K⁺, Ca²⁺ y Cl⁻ generan los potenciales eléctricos que permiten la transmisión del impulso nervioso.
Paso 3 · Los gradientes iónicos controlan la ósmosis, regulando la entrada y salida de agua de las células.
Paso 4 · Las tres funciones son correctas.
Respuesta: D.

---

## Pregunta 22
area: biologia
tema: acidos-nucleicos-composicion
dificultad: medio

Los ácidos nucleicos están compuestos por:

- A) Carbohidratos, lípidos y proteínas
- B) Bases púricas solamente
- C) Cadenas largas de carbohidratos
- D) Todas
- E) Ninguna

**respuesta:** E
**explicacion:** Compará cada opción con la estructura real de un ácido nucleico (nucleótidos: pentosa + fosfato + base nitrogenada).
Paso 1 · A) Falsa: los ácidos nucleicos no contienen lípidos ni proteínas, solo pentosa, fosfato y bases nitrogenadas.
Paso 2 · B) Falsa: contienen tanto bases púricas (adenina, guanina) como pirimídicas (citosina, timina/uracilo), no solo púricas.
Paso 3 · C) Falsa: no son simplemente cadenas de carbohidratos; son cadenas de nucleótidos (pentosa+fosfato+base).
Paso 4 · Como ninguna opción describe correctamente la composición, la respuesta es "Ninguna".
Respuesta: E.

---

## Pregunta 23
area: biologia
tema: genetica-cruza-monohibrida
dificultad: facil

Si cruzamos un gato negro puro (NN) con una gata blanca recesiva (nn), fenotípicamente las crías serán:

- A) Todos negros
- B) 75% negros y 25% blancos
- C) 50% negros y 50% blancos
- D) Todas
- E) Ninguna

**respuesta:** A
**explicacion:** Es un cruce monohíbrido entre un homocigoto dominante y un homocigoto recesivo.
Paso 1 · $NN\times nn\rightarrow$ toda la descendencia es $Nn$ (heterocigota).
Paso 2 · Como N (negro) es dominante sobre n (blanco), el 100% de las crías expresa el fenotipo negro.
Respuesta: A.

---

## Pregunta 24
area: biologia
tema: leyes-mendel-proporcion-fenotipica
dificultad: medio

La frecuencia fenotípica 9:3:3:1 en la $\mathrm{F_{2}}$ corresponde a:

- A) La primera Ley de Mendel
- B) La segunda Ley de Mendel
- C) La cuarta Ley de Mendel
- D) Todas
- E) Ninguna

**respuesta:** B
**explicacion:** La proporción 9:3:3:1 es la firma clásica de un cruce dihíbrido.
Paso 1 · La primera Ley de Mendel (segregación) explica la proporción 3:1 de un cruce monohíbrido, no 9:3:3:1.
Paso 2 · La segunda Ley de Mendel (distribución/segregación independiente de los caracteres) es la que explica que dos genes se hereden de forma independiente, generando la proporción 9:3:3:1 en un cruce dihíbrido.
Paso 3 · No existe una "cuarta Ley de Mendel" reconocida en la genética clásica (Mendel formuló dos leyes fundamentales).
Respuesta: B.

---

## Pregunta 25
area: biologia
tema: adn-localizacion-celular
dificultad: facil

El ADN se encuentra en:

- A) El núcleo de las células
- B) Mitocondrias de las células
- C) Cloroplastos de las células vegetales
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** El ADN no está únicamente en el núcleo; también existe ADN en organelos con capacidad de autoduplicación.
Paso 1 · El núcleo contiene la mayor parte del ADN (cromosómico).
Paso 2 · Las mitocondrias tienen su propio ADN circular (ADN mitocondrial).
Paso 3 · Los cloroplastos de las células vegetales también tienen su propio ADN circular (ADN de cloroplasto).
Respuesta: D.

---

## Pregunta 26
area: biologia
tema: biomoleculas-fundamentales
dificultad: facil

Todo ser vivo tiene las siguientes biomoléculas:

- A) Proteínas
- B) Carbohidratos
- C) Ácidos nucleicos
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Estas tres son biomoléculas fundamentales presentes en todo ser vivo (junto con los lípidos).
Paso 1 · Todas las células tienen proteínas (estructurales, enzimáticas), carbohidratos (energía, estructura) y ácidos nucleicos (ADN/ARN, información genética).
Respuesta: D.

---

## Pregunta 27
area: biologia
tema: propiedades-agua-biologica
dificultad: facil

Propiedad(es) del agua de importancia biológica:

- A) Principal disolvente biológico
- B) Elevada capacidad térmica
- C) Termorregulador
- D) Todos
- E) Ninguno

**respuesta:** D
**explicacion:** Las tres propiedades son reales y de gran relevancia biológica.
Paso 1 · El agua es el principal disolvente de las reacciones bioquímicas (medio acuoso intracelular).
Paso 2 · Su elevada capacidad térmica amortigua los cambios bruscos de temperatura.
Paso 3 · Gracias a esa capacidad térmica y a su calor de evaporación, actúa como termorregulador (ej. sudoración).
Respuesta: D.

---

## Pregunta 28
area: biologia
tema: genetica-cruzamiento-prueba
dificultad: medio

Procedimiento que permite determinar si un individuo con carácter dominante es homocigótico o heterocigótico:

- A) Cruzamiento recíproco
- B) Cruzamiento retrógrado
- C) Cruzamiento de prueba
- D) Todos
- E) Ninguno

**respuesta:** C
**explicacion:** Distinguí cada tipo de cruce genético y su propósito específico.
Paso 1 · El cruzamiento recíproco intercambia los roles de macho/hembra entre dos cruces para detectar efectos maternos o ligados al sexo, no para determinar zigosidad.
Paso 2 · El cruzamiento retrógrado (retrocruza) cruza un híbrido con uno de sus progenitores, usado típicamente en mejoramiento genético, no específicamente para determinar zigosidad.
Paso 3 · El cruzamiento de prueba (testcross) consiste en cruzar el individuo de fenotipo dominante desconocido con un homocigoto recesivo: si aparece algún descendiente recesivo, el individuo era heterocigoto; si toda la descendencia es dominante, era homocigoto. Este es precisamente el procedimiento estándar para este fin.
Respuesta: C.

---

## Pregunta 29
area: biologia
tema: bioelementos-primarios
dificultad: medio

Los siguientes elementos constituyen los bioelementos primarios de los seres vivos:

- A) Ca,K,O,Au,Cl
- B) Si,Al,Cr
- C) Au,K,Na,Cl,Fe
- D) Todas
- E) Ninguna

**respuesta:** E
**explicacion:** Los bioelementos primarios reales son C, H, O y N (constituyen ~95-99% de la materia viva); ninguna opción los lista correctamente.
Paso 1 · A) Incluye Au (oro), que no es un bioelemento; el oro no cumple función biológica conocida.
Paso 2 · B) Si, Al y Cr son a lo sumo oligoelementos o elementos no esenciales para la mayoría de los organismos, no bioelementos primarios.
Paso 3 · C) También incluye Au, que no es bioelemento, y omite C, H, O, N.
Paso 4 · Como ninguna lista contiene los verdaderos bioelementos primarios (C, H, O, N), la respuesta es "Ninguna".
Respuesta: E.

---

## Pregunta 30
area: biologia
tema: nucleotido-composicion
dificultad: facil

Compuesto formado por una base nitrogenada, una pentosa y ácido fosfórico:

- A) Nucleótido
- B) Grupo amino
- C) Lípido
- D) Todas
- E) Ninguna

**respuesta:** A
**explicacion:** Es la definición estructural exacta de un nucleótido.
Paso 1 · Un nucleótido está formado por tres componentes: una base nitrogenada (púrica o pirimídica), una pentosa (ribosa o desoxirribosa) y un grupo fosfato (derivado del ácido fosfórico).
Respuesta: A.

---
