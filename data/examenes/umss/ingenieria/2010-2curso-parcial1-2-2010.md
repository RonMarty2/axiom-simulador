---
universidad: UMSS
facultad: ingenieria
anio: 2010
categoria: parcial_curso
titulo: Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2010)
duracion_minutos: 150
total_preguntas: 29
ponderacion:
  aritmetica_algebra: 0.20
  geometria_trigonometria: 0.20
  quimica: 0.20
  fisica: 0.20
  biologia: 0.20
---

<!--
  Primer Parcial · SEGUNDO Curso Pre-Facultativo · UMSS FCyT · Gestión
  2-2010. Track paralelo al "Primer Curso Pre-Facultativo 2-2010" (archivos
  2010-parcial1-2-2010.md, etc. ya cargados en el banco) — la UMSS corrió
  dos cursos pre-facultativos en paralelo esa gestión, con exámenes propios
  para cada uno. Por eso el título dice explícitamente "Segundo Curso".

  OJO ARITMÉTICA-ÁLGEBRA: el PDF fuente trae 5 preguntas originales para esta
  área, pero la pregunta A5 aparece TACHADA/ANULADA en el propio documento
  (texto con tachado explícito), es decir que fue invalidada oficialmente
  por la organización del examen. Por eso acá Aritmética-Álgebra tiene solo
  4 preguntas (1-4) en vez de 5, y el banco sigue ponderando el área al 20%
  igual que las demás (indicación explícita de Ronald, no es un error).

  Estructura: Aritmética-Álgebra 4, Geometría-Trigonometría 5, Química 5,
  Física 5, Biología 10 = 29 preguntas.

  ESTADO (26-jul-2026): 29/29 preguntas verificadas con cálculo numérico
  independiente, sin redondeos a ojo. Puntos de rigor especial:
  - Aritmética #2 (división por defecto/exceso): el divisor se obtiene como
    la SUMA de ambos restos (31+21=52), no su resta; con esa base el sistema
    da cociente=17 y dividendo=915.
  - Geometría #3: se resolvió con coordenadas explícitas (no solo álgebra de
    ángulos) para confirmar sin ambigüedad que ∠BCA=75° (∠ACD=50°+∠DCB=25°).
  - Geometría #5: el lado del rombo inscrito con vértice común en B sale de
    igualar componentes vectoriales sobre AC; da exactamente s=3, coincide
    con la fórmula análoga al cuadrado inscrito (AB·BC)/(AB+BC).
  - Química #1: la escala nueva da exactamente 354 (no aproximado) al usar
    los dos puntos de referencia dados de forma lineal.
  - Química #4: se descartó KNO3 (solo 1 K+, no puede dar "dos" enlaces
    iónicos) y Na2CO3 (el carbono no necesita enlaces coordinados para
    completar sus 4 enlaces); Li2SO4 es el único que encaja con la
    estructura de Lewis del sulfato sin octeto expandido.
  - Física #1 y #2: sistemas de ecuaciones y promedios ponderados por tiempo
    vs. por distancia verificados paso a paso (55.22 km/h para el viaje
    completo ida+vuelta).
  - Biología: 4 de las 10 preguntas dieron "E) Ninguna" tras verificar que
    ninguna opción literal coincidía con el resultado correcto (cruce
    genético NN×Nn da 50%/50%, no las proporciones ofrecidas; albino×albino
    da 0% hijos pigmentados; "gen" y "proteína transportadora" no estaban
    entre las opciones listadas).
-->

## Pregunta 1
area: aritmetica_algebra
tema: resta-minuendo-sustraendo-diferencia
dificultad: facil

La suma del minuendo, sustraendo y diferencia de una resta es 32. Hallar el minuendo.

- A) 16
- B) 10
- C) 12
- D) 18
- E) Ninguno

**respuesta:** A
**explicacion:** En toda resta, minuendo − sustraendo = diferencia.
Paso 1 · Sea M el minuendo, S el sustraendo, D la diferencia: $M-S=D$ y $M+S+D=32$.
Paso 2 · Sustituyendo $D=M-S$ en la segunda ecuación: $M+S+(M-S)=2M=32$.
Paso 3 · $M=16$.
Respuesta: A.

---

## Pregunta 2
area: aritmetica_algebra
tema: division-defecto-exceso
dificultad: dificil

Al dividir 2 números por defecto y por exceso se obtuvo como residuo 31 y 21 respectivamente. Si la suma del dividendo, divisor y cociente es 984. Hallar el dividendo.

- A) 910
- B) 17
- C) 915
- D) 14
- E) Ninguno

**respuesta:** C
**explicacion:** En una división por defecto, dividendo$=$divisor$\times$cociente$+r_{def}$. En la división por exceso (mismo dividendo y divisor, cociente aumentado en 1), dividendo$=$divisor$\times$(cociente+1)$-r_{exc}$.
Paso 1 · Igualando ambas expresiones del dividendo: $divisor\times cociente+31=divisor\times cociente+divisor-21 \Rightarrow divisor=31+21=52$.
Paso 2 · Con dividendo+divisor+cociente$=984$: dividendo+cociente$=984-52=932$.
Paso 3 · Además dividendo$=52\times cociente+31$. Sustituyendo: $52\,q+31+q=932 \Rightarrow 53q=901 \Rightarrow q=17$.
Paso 4 · dividendo$=52\times17+31=884+31=915$.
Paso 5 · Verificación: $915+52+17=984$. ✓
Respuesta: C.

---

## Pregunta 3
area: aritmetica_algebra
tema: mcd-envases-capacidad
dificultad: medio

Se desea depositar el aceite de tres barriles de 210, 600 y 420 litros en envases iguales entre sí. ¿Cuál es la MENOR cantidad de envases para que todos estén llenos sin desperdiciar aceite?

- A) 29
- B) 17
- C) 4
- D) 41
- E) Ninguno

**respuesta:** D
**explicacion:** El envase más grande posible (para minimizar la cantidad de envases) tiene como capacidad el MCD de los tres volúmenes.
Paso 1 · $210=2\times3\times5\times7$, $600=2^3\times3\times5^2$, $420=2^2\times3\times5\times7$.
Paso 2 · $MCD(210,600,420)=2\times3\times5=30$ litros por envase.
Paso 3 · Envases: $210/30=7$, $600/30=20$, $420/30=14$.
Paso 4 · Total $=7+20+14=41$.
Respuesta: D.

---

## Pregunta 4
area: aritmetica_algebra
tema: mcd-producto-diferencia
dificultad: medio

Dos números naturales A y B: su producto es 7425, su diferencia A−B=120, su MCD es 15. Hallar A.

- A) 105
- B) 45
- C) 165
- D) 241
- E) Ninguno

**respuesta:** C
**explicacion:** Escribí $A=15a$, $B=15b$ con $a,b$ primos entre sí (coprimos) y $a>b$.
Paso 1 · $A-B=15(a-b)=120 \Rightarrow a-b=8$.
Paso 2 · $A\times B=225\,ab=7425 \Rightarrow ab=33$.
Paso 3 · Con $a-b=8$ y $ab=33$: $b(b+8)=33 \Rightarrow b^2+8b-33=0 \Rightarrow b=\frac{-8+\sqrt{64+132}}{2}=\frac{-8+14}{2}=3$; $a=11$.
Paso 4 · $mcd(11,3)=1$ ✓ (coprimos, condición requerida).
Paso 5 · $A=15\times11=165$.
Respuesta: C.

---

## Pregunta 5
area: geometria_trigonometria
tema: segmentos-colineales
dificultad: medio

Puntos consecutivos A, B, D en una recta. Entre B y D se toma C tal que 6·AC=CD. BD−6·AB=42. Determinar BC.

- A) 6
- B) 7
- C) 8
- D) 5
- E) Ninguno

**respuesta:** A
**explicacion:** El orden final sobre la recta, al insertar C entre B y D, es A, B, C, D. Expresá todo en función de $AB=a$ y $BC=x$.
Paso 1 · $AC=AB+BC=a+x$. La condición $CD=6\cdot AC$ da $CD=6(a+x)$.
Paso 2 · $BD=BC+CD=x+6(a+x)=6a+7x$.
Paso 3 · $BD-6AB=42 \Rightarrow (6a+7x)-6a=42 \Rightarrow 7x=42 \Rightarrow x=6$.
Paso 4 · El resultado $BC=6$ es independiente del valor de $AB$.
Respuesta: A.

---

## Pregunta 6
area: geometria_trigonometria
tema: angulos-adyacentes-bisectrices
dificultad: dificil

La diferencia de los ángulos formados por las bisectrices de dos ángulos adyacentes y el lado común mide 10°. Hallar el séxtuplo del complemento del menor ángulo.

- A) 45
- B) 60
- C) 50
- D) 75
- E) Ninguno

**respuesta:** B
**explicacion:** Dos ángulos adyacentes que comparten el lado común y son suplementarios cumplen $\alpha+\beta=180°$. El ángulo entre cada bisectriz y el lado común es $\alpha/2$ y $\beta/2$.
Paso 1 · $\frac{\alpha}{2}-\frac{\beta}{2}=10° \Rightarrow \alpha-\beta=20°$.
Paso 2 · Con $\alpha+\beta=180°$ y $\alpha-\beta=20°$: sumando, $2\alpha=200° \Rightarrow \alpha=100°$; entonces $\beta=80°$.
Paso 3 · El menor ángulo es $80°$. Su complemento $=90°-80°=10°$.
Paso 4 · Séxtuplo del complemento $=6\times10°=60°$.
Respuesta: B.

---

## Pregunta 7
area: geometria_trigonometria
tema: triangulo-isosceles-doble-condicion
dificultad: dificil

Triángulo ABC, A=80°. Sobre AB se ubica D tal que BD=DC y DA=AC. Hallar el ángulo BCA.

- A) 75
- B) 56
- C) 90
- D) 46
- E) Ninguno

**respuesta:** A
**explicacion:** D está sobre el segmento AB, entre A y B. Como $DA=AC$, el triángulo $ADC$ es isósceles con vértice en A, y su ángulo en A coincide con el ángulo $BAC=80°$ (porque D está sobre el rayo AB).
Paso 1 · En el triángulo $ADC$: $\angle ADC=\angle ACD=\frac{180°-80°}{2}=50°$.
Paso 2 · Como D está sobre la recta AB, $\angle ADC$ y $\angle BDC$ son suplementarios: $\angle BDC=180°-50°=130°$.
Paso 3 · En el triángulo $BDC$ (isósceles, $BD=DC$, vértice en D): $\angle DBC=\angle DCB=\frac{180°-130°}{2}=25°$.
Paso 4 · El rayo CD divide al ángulo $\angle BCA$ en $\angle ACD$ y $\angle DCB$: $\angle BCA=\angle ACD+\angle DCB=50°+25°=75°$.
Paso 5 · Verificación con coordenadas: colocando $A=(0,0)$, $C=(1,0)$ (con $AC=1$), $D$ sobre el rayo a 80° de AC con $AD=1$ (ya que $DA=AC$), y $B$ sobre el mismo rayo más allá de D con $AB=2.2856$ (para que $BD=DC=1.2856$), el ángulo $\angle ACB$ calculado numéricamente da $75.01°$, confirmando el resultado analítico.
Respuesta: A.

---

## Pregunta 8
area: geometria_trigonometria
tema: poligono-angulo-interior
dificultad: medio

Si a un polígono regular se le disminuye un lado, su ángulo interior disminuye en 18°. Determinar el número de lados.

- A) 108
- B) 6
- C) 5
- D) 100
- E) Ninguno

**respuesta:** C
**explicacion:** El ángulo interior de un polígono regular de $n$ lados es $180-\frac{360}{n}$.
Paso 1 · La disminución al pasar de $n$ a $n-1$ lados: $I(n)-I(n-1)=\left(180-\frac{360}{n}\right)-\left(180-\frac{360}{n-1}\right)=\frac{360}{n-1}-\frac{360}{n}=18$.
Paso 2 · $360\left(\frac{1}{n-1}-\frac{1}{n}\right)=18 \Rightarrow 360\cdot\frac{1}{n(n-1)}=18 \Rightarrow n(n-1)=20$.
Paso 3 · $n=5$ satisface $5\times4=20$ (la otra raíz de la cuadrática es negativa y se descarta).
Respuesta: C.

---

## Pregunta 9
area: geometria_trigonometria
tema: rombo-inscrito-triangulo
dificultad: dificil

Triángulo ABC, AB=4m, BC=12m. Hallar el lado del rombo inscrito BMNP (M sobre BC, N sobre AC, P sobre AB).

- A) 3
- B) 7
- C) 5
- D) 4
- E) Ninguno

**respuesta:** A
**explicacion:** Con vértice común en B, sea $s$ el lado del rombo. $P$ está sobre $BA$ con $BP=s$, $M$ está sobre $BC$ con $BM=s$, y por ser BMNP un paralelogramo (rombo), $N=B+\vec{BM}+\vec{BP}$.
Paso 1 · Con $B=(0,0)$, $u=$ dirección unitaria de BA, $v=$ dirección unitaria de BC: $A=4u$, $C=12v$, $P=su$, $M=sv$, $N=s(u+v)$.
Paso 2 · $N$ debe estar sobre la recta $AC$: $N=A+t(C-A)=(4-4t)u+12t\,v$ para algún $t\in[0,1]$.
Paso 3 · Igualando coeficientes de $u$ y $v$ (linealmente independientes): $s=4-4t$ y $s=12t$.
Paso 4 · De $s=12t \Rightarrow t=s/12$. Sustituyendo: $s=4-4(s/12)=4-s/3 \Rightarrow s+s/3=4 \Rightarrow \frac{4s}{3}=4 \Rightarrow s=3$.
Paso 5 · Coincide con la fórmula análoga al cuadrado inscrito: $s=\frac{AB\times BC}{AB+BC}=\frac{4\times12}{16}=3$.
Respuesta: A.

---

## Pregunta 10
area: quimica
tema: escala-termometrica-lineal
dificultad: medio

Nueva escala de temperatura: punto de congelación del agua=-6, temperatura de inflamación de la madera (45°F)=20. ¿Cuál es la temperatura del agua hirviente en la nueva escala?

- A) 180
- B) 212
- C) 354
- D) 100
- E) Ninguno

**respuesta:** C
**explicacion:** Convertí 45°F a Celsius y planteá la relación lineal $N=a\cdot C+b$ entre la escala Celsius y la nueva escala N, usando los dos puntos de referencia dados.
Paso 1 · $45°F \to °C$: $(45-32)\times\frac{5}{9}=13\times\frac{5}{9}=\frac{65}{9}°C\approx7.222°C$.
Paso 2 · Punto de congelación: $C=0 \Rightarrow N=-6$, entonces $b=-6$.
Paso 3 · Segundo punto: $C=\frac{65}{9} \Rightarrow N=20$: $20=a\cdot\frac{65}{9}-6 \Rightarrow 26=\frac{65a}{9} \Rightarrow a=\frac{234}{65}=3.6$.
Paso 4 · Agua hirviente ($C=100$): $N=3.6\times100-6=360-6=354$.
Respuesta: C.

---

## Pregunta 11
area: quimica
tema: formula-molecular-combustion
dificultad: dificil

Combustión de 0.685g de compuesto orgánico (C,H,O) formó 1.882g CO2 y 0.514g H2O. Hallar la fórmula molecular, si 3.857g de vapor del compuesto ocupa 450mL en c.n.

- A) C12H16O2
- B) C6H8O
- C) C16H14O2
- D) C6H2O
- E) Ninguno

**respuesta:** A
**explicacion:** Primero hallá la fórmula empírica a partir de las masas de C, H y O (por diferencia), y luego escalá a la fórmula molecular usando la masa molar obtenida de la densidad de vapor en condiciones normales (c.n.).
Paso 1 · $n_{CO_2}=1.882/44.01=0.04276\ mol \Rightarrow$ masa C $=0.04276\times12.011=0.5136\ g$.
Paso 2 · $n_{H_2O}=0.514/18.015=0.02853\ mol \Rightarrow n_H=0.05706\ mol \Rightarrow$ masa H $=0.05706\times1.008=0.05752\ g$.
Paso 3 · masa O $=0.685-0.5136-0.05752=0.11388\ g \Rightarrow n_O=0.11388/16.00=0.007117\ mol$.
Paso 4 · Relación molar (dividiendo entre $n_O$): C$\approx6.01$, H$\approx8.02$, O$=1$. Fórmula empírica: $C_6H_8O$ (masa $=96.13\ g/mol$).
Paso 5 · Masa molar real: $n=450/22400=0.020089\ mol \Rightarrow M=3.857/0.020089=192.0\ g/mol$.
Paso 6 · $192.0/96.13\approx2$, entonces la fórmula molecular es $(C_6H_8O)\times2=C_{12}H_{16}O_2$ (masa molar teórica $=192.26\ g/mol$, coincide).
Respuesta: A.

---

## Pregunta 12
area: quimica
tema: isotopos-abundancia-masa-atomica
dificultad: dificil

Elemento con isótopos 13.95, 14.95, 15.95. Masa atómica=15.033. Más abundante 65%. Calcular porcentajes de los otros.

- A) 4.25 y 70.75
- B) 7.35 y 17.65
- C) 20.5 y 54.5
- D) 13.35 y 21.65
- E) Ninguno

**respuesta:** D
**explicacion:** Planteá el promedio ponderado con el isótopo de masa intermedia (14.95) como el más abundante (65%), y resolvé para los otros dos porcentajes.
Paso 1 · $13.95\,x_1+14.95(65)+15.95\,x_3=15.033\times100=1503.3$, con $x_1+x_3=35$.
Paso 2 · $14.95\times65=971.75 \Rightarrow 13.95x_1+15.95x_3=531.55$.
Paso 3 · Con $x_3=35-x_1$: $13.95x_1+15.95(35-x_1)=531.55 \Rightarrow 558.25-2x_1=531.55 \Rightarrow x_1=13.35$.
Paso 4 · $x_3=35-13.35=21.65$.
Paso 5 · Verificación: $13.95(13.35)+14.95(65)+15.95(21.65)=186.23+971.75+345.32=1503.3$ ✓ (nótese que asumir el isótopo de 15.95 como el más abundante da $x_1=56.7>35$, imposible, por lo que el isótopo de 14.95 es el correcto como mayoritario).
Respuesta: D.

---

## Pregunta 13
area: quimica
tema: enlaces-covalente-ionico-coordinado
dificultad: dificil

Representar por Lewis y barras: ¿cuál molécula tiene dos enlaces covalentes simples, dos enlaces iónicos y dos enlaces covalentes coordinados?

- A) KNO3
- B) Na2CO3
- C) Li2SO4
- D) Los incisos B y C
- E) Ninguno

**respuesta:** C
**explicacion:** Contá los enlaces de cada especie considerando cuántos iones metálicos hay (número de enlaces iónicos) y la estructura de Lewis del anión (enlaces covalentes normales vs. coordinados).
Paso 1 · KNO3: solo hay 1 K⁺, por lo tanto como máximo 1 enlace iónico — no puede cumplir "dos enlaces iónicos", queda descartado sin importar la estructura del NO3⁻ (que de hecho tiene 1 doble, 1 simple y 1 coordinado por los 5 electrones de valencia del N).
Paso 2 · Na2CO3: hay 2 Na⁺ (2 enlaces iónicos, correcto), pero el carbono tiene exactamente 4 electrones de valencia que alcanzan para formar 1 enlace doble C=O y 2 enlaces simples C-O de forma normal (1 electrón de C por cada enlace simple, 2 electrones de C para el doble), sin electrones sobrantes que requieran donar un par completo. Por eso CO3²⁻ no tiene enlaces coordinados.
Paso 3 · Li2SO4: hay 2 Li⁺ (2 enlaces iónicos, correcto). El azufre tiene 6 electrones de valencia y debe unirse a 4 oxígenos; usando la estructura de Lewis que respeta el octeto (sin expandirlo), S forma 2 enlaces simples normales (aportando 1 electrón a cada uno) y agota sus 2 pares libres restantes donando ambos electrones en 2 enlaces coordinados adicionales. Esto da exactamente 2 enlaces covalentes simples + 2 enlaces covalentes coordinados dentro del ion sulfato, más los 2 enlaces iónicos de los Li⁺.
Paso 4 · Solo Li2SO4 cumple simultáneamente los tres conteos pedidos (2 simples, 2 iónicos, 2 coordinados); por eso la opción D ("B y C") es incorrecta, ya que B no aporta enlaces coordinados.
Respuesta: C.

---

## Pregunta 14
area: quimica
tema: numeros-cuanticos-configuracion-electronica
dificultad: dificil

Hallar los 4 números cuánticos del PENÚLTIMO electrón del nivel de valencia para elemento Z=25 (Mn).

- A) 3,2,2,+1/2
- B) 4,0,0,+1/2
- C) 3,2,-2,-1/2
- D) 4,0,0,-1/2
- E) Ninguno

**respuesta:** B
**explicacion:** El nivel de valencia (mayor número cuántico principal, $n=4$) de Mn ($Z=25$, configuración $[Ar]4s^23d^5$) contiene únicamente los 2 electrones del subnivel $4s$.
Paso 1 · El primer electrón que ocupa el orbital $4s$ tiene $n=4,l=0,m_l=0,s=+1/2$.
Paso 2 · El segundo electrón (el último) debe tener espín opuesto por el principio de exclusión de Pauli: $n=4,l=0,m_l=0,s=-1/2$.
Paso 3 · De los 2 electrones del nivel de valencia, el "penúltimo" (el que se ubica antes que el último) es el primero: $(4,0,0,+1/2)$.
Respuesta: B.

---

## Pregunta 15
area: fisica
tema: mrua-posicion-tiempo
dificultad: medio

Auto parte del origen con MRUA en eje x. A t=2s y t=6s, posiciones son 4 y 16 respectivamente. Hallar la aceleración.

- A) 1/3 m/s²
- B) 22/5 m/s²
- C) 8/3 m/s²
- D) 46/5 m/s²
- E) Ninguno

**respuesta:** A
**explicacion:** Con $x_0=0$: $x(t)=v_0t+\frac12at^2$. Planteá el sistema con los dos datos.
Paso 1 · $t=2$: $4=2v_0+2a \Rightarrow v_0+a=2$.
Paso 2 · $t=6$: $16=6v_0+18a$, dividiendo entre 6: $v_0+3a=\frac{8}{3}$.
Paso 3 · Restando la primera ecuación de la segunda: $2a=\frac{8}{3}-2=\frac{2}{3} \Rightarrow a=\frac{1}{3}\ m/s^2$.
Paso 4 · Verificación: $v_0=2-\frac13=\frac53$. En $t=2$: $x=2(\frac53)+\frac12(\frac13)(4)=\frac{10}{3}+\frac23=4$ ✓. En $t=6$: $x=6(\frac53)+\frac12(\frac13)(36)=10+6=16$ ✓.
Respuesta: A.

---

## Pregunta 16
area: fisica
tema: velocidad-media-ida-vuelta
dificultad: dificil

Viaje de 10km (ida): mitad del TIEMPO a 40km/h, mitad del tiempo a 90km/h. Regreso (10km): mitad de la DISTANCIA a 60km/h, mitad de distancia a 40km/h. ¿Cuál es la rapidez promedio para TODO el viaje (ida+vuelta)?

- A) 32.00 km/h
- B) 55.22 km/h
- C) 56.00 km/h
- D) 42.22 km/h
- E) Ninguno

**respuesta:** B
**explicacion:** Calculá tiempo total de la ida (repartido por tiempo) y de la vuelta (repartida por distancia) por separado, y dividí la distancia total entre el tiempo total.
Paso 1 · Ida: sea $T$ el tiempo total de ida. Distancia $=40\cdot\frac{T}{2}+90\cdot\frac{T}{2}=65T=10\ km \Rightarrow T=\frac{10}{65}=\frac{2}{13}\ h\approx0.15385\ h$.
Paso 2 · Vuelta: 5km a 60km/h y 5km a 40km/h. Tiempo $=\frac{5}{60}+\frac{5}{40}=\frac{1}{12}+\frac{1}{8}=\frac{5}{24}\ h\approx0.20833\ h$.
Paso 3 · Distancia total $=10+10=20\ km$. Tiempo total $=\frac{2}{13}+\frac{5}{24}=\frac{48+65}{312}=\frac{113}{312}\ h\approx0.36218\ h$.
Paso 4 · $v_{media}=\frac{20}{113/312}=\frac{6240}{113}=55.22\ km/h$.
Respuesta: B.

---

## Pregunta 17
area: fisica
tema: tiro-vertical-quebrada
dificultad: medio

Piedra lanzada verticalmente hacia arriba desde una quebrada, v0=20m/s, cae al fondo 8 segundos después. Determine la altura del punto de lanzamiento medida desde el fondo. g=10 m/s².

- A) 160m
- B) 15m
- C) 80m
- D) 120m
- E) Ninguno

**respuesta:** A
**explicacion:** Con origen en el punto de lanzamiento y sentido positivo hacia arriba: $y(t)=v_0t-\frac12gt^2$. El fondo de la quebrada está a $y=-H$ (H=altura buscada, por debajo del lanzamiento).
Paso 1 · $y(8)=20(8)-\frac12(10)(64)=160-320=-160$.
Paso 2 · Como $y(8)=-H$: $H=160\ m$.
Respuesta: A.

---

## Pregunta 18
area: fisica
tema: tiro-parabolico-altura-maxima
dificultad: facil

Bola de tenis lanzada a 20 m/s, ángulo 30° con la horizontal. Determinar la altura máxima. g=10 m/s².

- A) 45m
- B) 5m
- C) 30m
- D) 15m
- E) Ninguno

**respuesta:** B
**explicacion:** La altura máxima depende solo de la componente vertical de la velocidad inicial.
Paso 1 · $v_{0y}=20\sin30°=20\times0.5=10\ m/s$.
Paso 2 · $h_{max}=\frac{v_{0y}^2}{2g}=\frac{100}{20}=5\ m$.
Respuesta: B.

---

## Pregunta 19
area: fisica
tema: plano-inclinado-friccion
dificultad: dificil

Bloque inicia movimiento hacia ARRIBA en plano inclinado de 30°, v0=40 m/s, coeficiente de rozamiento μ=√3/3. Determinar la distancia recorrida antes de detenerse. g=10 m/s².

- A) 20m
- B) 80m
- C) 10m
- D) 50m
- E) Ninguno

**respuesta:** B
**explicacion:** Mientras el bloque sube, tanto la componente del peso a lo largo del plano como el rozamiento se oponen al movimiento, sumando sus efectos en la desaceleración.
Paso 1 · $a=g(\sin\theta+\mu\cos\theta)$, con $\theta=30°$, $\sin30°=0.5$, $\cos30°=\frac{\sqrt3}{2}$, $\mu=\frac{\sqrt3}{3}=\frac{1}{\sqrt3}$.
Paso 2 · $\mu\cos\theta=\frac{1}{\sqrt3}\times\frac{\sqrt3}{2}=\frac12=0.5$.
Paso 3 · $a=10(0.5+0.5)=10\ m/s^2$ (desaceleración).
Paso 4 · $v_0^2=2ad \Rightarrow d=\frac{40^2}{2\times10}=\frac{1600}{20}=80\ m$.
Respuesta: B.

---

## Pregunta 20
area: biologia
tema: funciones-lipidos
dificultad: facil

Los lípidos son importantes por ser:

- A) Fuente de almacenamiento de energía
- B) Componente estructural de las membranas celulares
- C) Hormonas de importancia
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Evaluá cada afirmación por separado.
Paso 1 · a) Correcto: las grasas son la principal reserva energética a largo plazo del organismo.
Paso 2 · b) Correcto: los fosfolípidos son el componente estructural principal de la membrana celular.
Paso 3 · c) Correcto: las hormonas esteroideas (testosterona, estrógeno, cortisol) son lípidos.
Respuesta: D.

---

## Pregunta 21
area: biologia
tema: genetica-codominancia-conejos
dificultad: dificil

Si se cruza un conejo macho negro (NN) con una coneja hembra gris (Nn) codominante, fenotípicamente las crías serán:

- A) Todas negros
- B) 75% negros y 25% blancos
- C) 100% blancos
- D) Todas
- E) Ninguna

**respuesta:** E
**explicacion:** Planteá el cruce genético con los genotipos dados y compará el resultado real contra las opciones ofrecidas.
Paso 1 · El progenitor NN solo puede aportar el alelo N. El progenitor Nn aporta N o n con igual probabilidad (50%/50%).
Paso 2 · Descendencia: 50% NN (fenotipo negro) y 50% Nn (fenotipo gris, por codominancia). No puede aparecer ningún individuo blanco (nn), porque el progenitor NN siempre aporta N.
Paso 3 · El resultado real (50% negros, 50% grises, 0% blancos) no coincide con "Todos negros" (A, falso, solo la mitad), ni con "75% negros y 25% blancos" (B, falso, proporción y fenotipo incorrectos), ni con "100% blancos" (C, falso). Como A, B y C son falsas, "Todas" (D) tampoco puede ser correcta.
Respuesta: E.

---

## Pregunta 22
area: biologia
tema: gen-definicion
dificultad: facil

Fragmento de ADN que contiene información para un carácter se conoce como:

- A) Peroxisoma
- B) Membrana celular
- C) Vacuola
- D) Todas
- E) Ninguna

**respuesta:** E
**explicacion:** El término correcto para un fragmento de ADN que codifica un carácter es "gen", que no figura entre las opciones ofrecidas.
Paso 1 · Peroxisoma, membrana celular y vacuola son estructuras u organelos celulares, no fragmentos de ADN.
Paso 2 · Ninguna de las tres opciones corresponde a la definición de gen.
Respuesta: E.

---

## Pregunta 23
area: biologia
tema: funciones-proteinas
dificultad: medio

Son funciones de las proteínas:

- A) Brindan energía a las células
- B) Permiten la transmisión de los impulsos nerviosos
- C) Cumplen funciones de regulación hormonal
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Evaluá cada función atribuida a las proteínas.
Paso 1 · a) Correcto: las proteínas pueden catabolizarse como fuente de energía (aunque sea una fuente secundaria, después de carbohidratos y lípidos).
Paso 2 · b) Correcto: canales iónicos y receptores de neurotransmisores son proteínas que permiten la transmisión del impulso nervioso.
Paso 3 · c) Correcto: hormonas peptídicas como la insulina y el glucagón son proteínas reguladoras.
Respuesta: D.

---

## Pregunta 24
area: biologia
tema: albinismo-herencia-recesiva
dificultad: medio

¿Cuál es la probabilidad de que dos padres albinos (recesivo) tengan un hijo pigmentado?

- A) 3/4
- B) 1/2
- C) 1/4
- D) Todas
- E) Ninguna

**respuesta:** E
**explicacion:** El albinismo es un carácter recesivo; ser albino implica ser homocigoto recesivo (aa).
Paso 1 · Ambos padres albinos son aa × aa. Ningún padre posee el alelo dominante A.
Paso 2 · Toda la descendencia será aa (albina); la probabilidad de un hijo pigmentado (que requeriría al menos un alelo A) es 0%.
Paso 3 · 0% no coincide con 3/4, 1/2 ni 1/4.
Respuesta: E.

---

## Pregunta 25
area: biologia
tema: monosacaridos-ejemplos
dificultad: facil

Son ejemplos de monosacáridos:

- A) Celulosa, lactosa
- B) Maltosa, lactosa
- C) Fructosa, glucosa
- D) Todas
- E) Ninguna

**respuesta:** C
**explicacion:** Distinguí monosacáridos de disacáridos y polisacáridos.
Paso 1 · Celulosa es un polisacárido; lactosa y maltosa son disacáridos.
Paso 2 · Fructosa y glucosa son monosacáridos (azúcares simples de 6 carbonos).
Respuesta: C.

---

## Pregunta 26
area: biologia
tema: proteinas-transporte
dificultad: medio

Un ejemplo de proteína transportadora:

- A) Vitaminas
- B) Glucosa
- C) Colágeno
- D) Todas
- E) Ninguna

**respuesta:** E
**explicacion:** Ninguna de las opciones listadas es una proteína transportadora.
Paso 1 · Las vitaminas no son proteínas.
Paso 2 · La glucosa es un monosacárido (es la sustancia transportada, no el transportador).
Paso 3 · El colágeno es una proteína estructural (tejido conectivo), no de transporte.
Respuesta: E.

---

## Pregunta 27
area: biologia
tema: insulina-hormona
dificultad: facil

Es una proteína que cumple función hormonal de regular el azúcar en la sangre:

- A) Insulina
- B) Queratina
- C) Quitina
- D) Todas
- E) Ninguna

**respuesta:** A
**explicacion:** Compará la función de cada sustancia listada.
Paso 1 · La insulina es la hormona proteica que regula la glucemia (azúcar en sangre).
Paso 2 · La queratina es estructural (piel, uñas, cabello); la quitina es un polisacárido estructural, ni siquiera es proteína.
Respuesta: A.

---

## Pregunta 28
area: biologia
tema: propiedades-agua
dificultad: facil

Propiedad(es) del agua de importancia biológica:

- A) Principal disolvente biológico
- B) Elevada capacidad térmica
- C) Termorregulador
- D) Todos
- E) Ninguno

**respuesta:** D
**explicacion:** Evaluá cada propiedad del agua.
Paso 1 · a) Correcto: el agua es el disolvente universal de los procesos biológicos.
Paso 2 · b) Correcto: el agua tiene un calor específico elevado.
Paso 3 · c) Correcto: precisamente por su alta capacidad térmica, el agua actúa como termorregulador biológico.
Respuesta: D.

---

## Pregunta 29
area: biologia
tema: bases-pirimidinicas
dificultad: facil

Son bases nitrogenadas pirimidínicas de los nucleótidos:

- A) Mitocondrias y vacuolas
- B) Adenina, guanina
- C) Citosina, timina, uracilo
- D) Todas
- E) Ninguno

**respuesta:** C
**explicacion:** Las pirimidinas son las bases nitrogenadas de estructura monocíclica.
Paso 1 · Mitocondrias y vacuolas son organelos, no bases nitrogenadas.
Paso 2 · Adenina y guanina son purinas (bicíclicas), no pirimidinas.
Paso 3 · Citosina, timina y uracilo son las pirimidinas.
Respuesta: C.

---
