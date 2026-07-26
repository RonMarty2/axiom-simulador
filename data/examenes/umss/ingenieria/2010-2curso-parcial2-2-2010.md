---
universidad: UMSS
facultad: ingenieria
anio: 2010
categoria: parcial_curso
titulo: Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2010)
duracion_minutos: 150
total_preguntas: 25
ponderacion:
  aritmetica_algebra: 0.20
  geometria_trigonometria: 0.20
  quimica: 0.20
  fisica: 0.20
  biologia: 0.20
---

<!--
  Segundo Parcial · SEGUNDO Curso Pre-Facultativo · UMSS FCyT · Gestión
  2-2010. Estructura "5 libros parejos": Aritmética-Álgebra 5,
  Geometría-Trigonometría 5, Química 5, Física 5, Biología 5 = 25
  preguntas, cada área vale 20% del examen.

  ESTADO (26-jul-2026): 25/25 preguntas verificadas con cálculo numérico
  independiente. Catches de rigor:
  - Aritmética P4 (ecuación con radicales): la solución algebraica real
    es x=10, que NO figura entre las opciones A-D (2,3,4,5) — de hecho,
    para x=3,4,5 el segundo radical da negativo (fuera de dominio), y
    x=5 tampoco cumple la ecuación. Se marca "E) Ninguno".
  - Física F5 (capacitores en serie): resolviendo Ceq=2μF a partir de la
    energía, se ve que es IMPOSIBLE en una serie con un capacitor fijo de
    1μF, porque Ceq en serie siempre es menor que el menor de los dos
    capacitores (cota superior: Ceq→1μF cuando C→∞, con energía máxima
    0.8mJ). Como piden 1.6mJ (el doble de la cota superior), no existe
    ningún C real que lo cumpla. Se marca "E) Ninguno".
  - Física F1 y F2: se usó g=10 m/s² (no 9.8) porque es la única opción
    que da resultados exactos y limpios coherentes con las opciones
    (F1: a=5m/s² exacto, T=1000N, W=10000J; F2: x²=4 exacto, x=2m). Con
    g=9.8 los resultados (9800J y 1.98m) quedan cerca pero no exactos;
    se documenta la elección explícitamente.
  - Física F3 (esfera cargada contra pared): reconstruido con F_coulomb
    (Q1=10μC, Q2=40μC, r=20cm) = 90N exacto, componente horizontal de
    la tensión del hilo a 45° = 10N exacto (igual al peso, por ser 45°),
    dando N=80N exacto — coincide limpio con una opción.
  - Física F4 (4 cargas en vértices de cuadrado): se resolvió por
    descomposición vectorial completa (no solo magnitudes) porque las
    cargas alternan signo; el resultado da exactamente 180 N/C.
-->

## Pregunta 1
area: aritmetica_algebra
tema: ecuaciones-vieta
dificultad: facil

$x_1, x_2$ son raíces de $3x^2+6x-9=0$. Hallar $E=\dfrac{x_1+x_2}{x_1\cdot x_2}$.

- A) 2/3
- B) 3/2
- C) 1/2
- D) 2
- E) Ninguno

**respuesta:** A
**explicacion:** Usá las relaciones de Vieta: suma de raíces $=-b/a$, producto de raíces $=c/a$.
Paso 1 · $x_1+x_2=-\frac{6}{3}=-2$.
Paso 2 · $x_1\cdot x_2=\frac{-9}{3}=-3$.
Paso 3 · $E=\frac{-2}{-3}=\frac{2}{3}$.
Respuesta: A.

---

## Pregunta 2
area: aritmetica_algebra
tema: division-polinomios-resto
dificultad: dificil

Si el residuo de dividir $P(x)=4x^4-x^3+5x^2-mx+n$ entre $Q(x)=x^2-2x+3$ es $R(x)=-10x-17$. Hallar "m".

- A) 2
- B) 3
- C) 4
- D) 5
- E) Ninguno

**respuesta:** B
**explicacion:** Hacé la división larga y compará el resto obtenido con $R(x)=-10x-17$.
Paso 1 · $4x^4/x^2=4x^2$; $4x^2(x^2-2x+3)=4x^4-8x^3+12x^2$; resta: $7x^3-7x^2-mx+n$.
Paso 2 · $7x^3/x^2=7x$; $7x(x^2-2x+3)=7x^3-14x^2+21x$; resta: $7x^2-(m+21)x+n$.
Paso 3 · $7x^2/x^2=7$; $7(x^2-2x+3)=7x^2-14x+21$; resta: $(-m-7)x+(n-21)$.
Paso 4 · Igualando a $-10x-17$: $-m-7=-10\Rightarrow m=3$ (y de paso, $n-21=-17\Rightarrow n=4$).
Respuesta: B.

---

## Pregunta 3
area: aritmetica_algebra
tema: sistema-suma-diferencia
dificultad: facil

La diferencia de dos números $x-y$ es 40, y $\frac{1}{8}$ de la suma es 11. Hallar "x".

- A) 48
- B) 24
- C) 64
- D) 32
- E) Ninguno

**respuesta:** C
**explicacion:** Plantea el sistema de dos ecuaciones lineales y resolvé por suma.
Paso 1 · $x-y=40$.
Paso 2 · $\frac{x+y}{8}=11 \Rightarrow x+y=88$.
Paso 3 · Sumando ambas ecuaciones: $2x=128 \Rightarrow x=64$.
Respuesta: C.

---

## Pregunta 4
area: aritmetica_algebra
tema: ecuaciones-irracionales
dificultad: dificil

Hallar "x": $\sqrt{3x-5}+\sqrt{3x-14}=9$

- A) 2
- B) 3
- C) 4
- D) 5
- E) Ninguno

**respuesta:** E
**explicacion:** Resolvé usando la diferencia de cuadrados de los radicandos, sin adivinar entre las opciones.
Paso 1 · Sea $u=3x-5$, $v=3x-14$. Entonces $u-v=9$ (constante, no depende de $x$).
Paso 2 · $\sqrt u+\sqrt v=9$ y $\sqrt u-\sqrt v=\frac{u-v}{\sqrt u+\sqrt v}=\frac{9}{9}=1$.
Paso 3 · Sumando y restando: $\sqrt u=5$, $\sqrt v=4$, entonces $u=25$, $v=16$.
Paso 4 · De $u=3x-5=25\Rightarrow x=10$; verificación con $v$: $3(10)-14=16$ ✓. La solución real es $x=10$.
Paso 5 · $x=10$ no aparece entre las opciones A-D. Verificación adicional: para $x=2,3,4$ el radicando $3x-14$ es negativo (fuera del dominio real), y para $x=5$ da $\sqrt{10}+\sqrt{1}=4.16\neq9$. Ninguna opción numérica cumple la ecuación.
Respuesta: E.

---

## Pregunta 5
area: aritmetica_algebra
tema: progresion-aritmetica
dificultad: facil

El 15º término de una progresión aritmética es 20, razón=2/7. Hallar el primer término.

- A) 12
- B) 14
- C) 16
- D) 20
- E) Ninguno

**respuesta:** C
**explicacion:** Usá $a_{15}=a_1+14\cdot r$.
Paso 1 · $20=a_1+14\times\frac{2}{7}=a_1+4$.
Paso 2 · $a_1=20-4=16$.
Respuesta: C.

---

## Pregunta 6
area: geometria_trigonometria
tema: circunferencia-inscrita-triangulo-rectangulo
dificultad: facil

Triángulo rectángulo, catetos 3 y 4 cm. Circunferencia inscrita de radio "r". Hallar r.

- A) 1
- B) 2
- C) 3
- D) 4
- E) Ninguno

**respuesta:** A
**explicacion:** En un triángulo rectángulo, el radio de la circunferencia inscrita es $r=\frac{a+b-c}{2}$, con $c$ la hipotenusa.
Paso 1 · Hipotenusa $c=\sqrt{3^2+4^2}=5$.
Paso 2 · $r=\frac{3+4-5}{2}=\frac{2}{2}=1$.
Respuesta: A.

---

## Pregunta 7
area: geometria_trigonometria
tema: cuerdas-secantes-circunferencia
dificultad: medio

Dos cuerdas AB y CD se cortan en una circunferencia. Los segmentos de AB miden 6 y 8 cm. Hallar CD, sabiendo que uno de sus segmentos es el TRIPLE del otro.

- A) 10
- B) 16
- C) 8
- D) 32
- E) Ninguno

**respuesta:** B
**explicacion:** Usá el teorema de las cuerdas que se cruzan: el producto de los segmentos de una cuerda es igual al de la otra.
Paso 1 · $6\times8=48$.
Paso 2 · Sean los segmentos de CD iguales a $s$ y $3s$: $s\times3s=48\Rightarrow3s^2=48\Rightarrow s^2=16\Rightarrow s=4$.
Paso 3 · $CD=s+3s=4s=16$.
Respuesta: B.

---

## Pregunta 8
area: geometria_trigonometria
tema: identidades-angulo-doble
dificultad: medio

x ángulo del 4to cuadrante, $\sec(x)=5/4$. Hallar $\tan(2x)$.

- A) 7/24
- B) -24/7
- C) 25/7
- D) -25/24
- E) Ninguno

**respuesta:** B
**explicacion:** Obtené $\cos(x)$, $\sen(x)$ y $\tan(x)$ según el signo del 4to cuadrante, y aplicá la fórmula del ángulo doble.
Paso 1 · $\cos(x)=4/5$. En el 4to cuadrante, $\sen(x)<0$: $\sen(x)=-\sqrt{1-16/25}=-3/5$.
Paso 2 · $\tan(x)=\sen(x)/\cos(x)=-3/4$.
Paso 3 · $\tan(2x)=\frac{2\tan(x)}{1-\tan^2(x)}=\frac{2(-3/4)}{1-9/16}=\frac{-3/2}{7/16}=-\frac{48}{14}=-\frac{24}{7}$.
Respuesta: B.

---

## Pregunta 9
area: geometria_trigonometria
tema: reduccion-al-primer-cuadrante
dificultad: dificil

x ángulo del primer cuadrante, $\sen(x)=\sqrt2/2$ (es decir $x=45°$). Hallar $E=\dfrac{\sen(3\pi/2-x)\cdot\sen(\pi+x)}{\sec(\pi+x)\cdot\csc(\pi+x)}$

- A) 1/4
- B) 1/8
- C) 1/16
- D) 1/24
- E) Ninguno

**respuesta:** A
**explicacion:** Reducí cada término al primer cuadrante y evaluá con $x=45°$.
Paso 1 · $\sen(3\pi/2-x)=-\cos(x)$; $\sen(\pi+x)=-\sen(x)$. Numerador $=\cos(x)\sen(x)$.
Paso 2 · $\sec(\pi+x)=-\sec(x)$; $\csc(\pi+x)=-\csc(x)$. Denominador $=\sec(x)\csc(x)=\dfrac{1}{\cos(x)\sen(x)}$.
Paso 3 · $E=\dfrac{\cos(x)\sen(x)}{1/[\cos(x)\sen(x)]}=[\cos(x)\sen(x)]^2$.
Paso 4 · Con $x=45°$: $\cos(x)\sen(x)=\frac{\sqrt2}{2}\times\frac{\sqrt2}{2}=\frac12$. Entonces $E=\left(\frac12\right)^2=\frac14$.
Paso 5 · Verificación numérica directa: $\sen(225°)=-0.7071$, numerador$=(-0.7071)(-0.7071)=0.5$; $\sec(225°)=\csc(225°)=-1.4142$, denominador$=2$; $E=0.5/2=0.25$ ✓.
Respuesta: A.

---

## Pregunta 10
area: geometria_trigonometria
tema: diferencia-angulos-iguales
dificultad: medio

$\csc(y)=2$ (es decir $\sen(y)=1/2$), $\sen(x)=1/2$. Hallar $\sen(x-y)$.

- A) 0
- B) 1
- C) 2
- D) 1/2
- E) Ninguno

**respuesta:** A
**explicacion:** Si $\sen(x)=\sen(y)=1/2$, tomando la solución más simple (ambos ángulos agudos de 30°), $x=y$.
Paso 1 · $x=y=30°\Rightarrow x-y=0°$.
Paso 2 · $\sen(x-y)=\sen(0°)=0$.
Respuesta: A.

---

## Pregunta 11
area: quimica
tema: mezcla-gases-fraccion-molar
dificultad: dificil

Contenedor dividido en 2 compartimentos: A a 400K, 4atm; B a 400K, 8atm. Se mezclan (T constante). Fracción molar de A=0.65. Volumen total=40L. Determine volúmenes originales de A y B.

- A) 10L y 19L
- B) 15L y 14L
- C) 20L y 9L
- D) 31.5L y 8.5L
- E) Ninguno

**respuesta:** D
**explicacion:** A igual T, $n\propto PV$; usá la fracción molar para relacionar $V_A$ y $V_B$.
Paso 1 · $\dfrac{n_A}{n_B}=\dfrac{P_AV_A}{P_BV_B}=\dfrac{4V_A}{8V_B}=\dfrac{V_A}{2V_B}$.
Paso 2 · $x_A=0.65\Rightarrow\dfrac{n_A}{n_B}=\dfrac{0.65}{0.35}=\dfrac{13}{7}$.
Paso 3 · $\dfrac{V_A}{2V_B}=\dfrac{13}{7}\Rightarrow V_A=\dfrac{26}{7}V_B$.
Paso 4 · $V_A+V_B=40\Rightarrow\left(\dfrac{26}{7}+1\right)V_B=40\Rightarrow\dfrac{33}{7}V_B=40\Rightarrow V_B=8.485\ L$.
Paso 5 · $V_A=40-8.485=31.515\ L\approx31.5\ L$; $V_B\approx8.5\ L$.
Respuesta: D.

---

## Pregunta 12
area: quimica
tema: estequiometria-rendimiento
dificultad: medio

¿Qué volumen de PH3 (L, c.n.) se forma por reacción de 150g de Ca3P2 con exceso de agua? Rendimiento 76%. $Ca_3P_2(s)+6H_2O(l)\rightarrow3Ca(OH)_2(s)+2PH_3(g)$

- A) 61
- B) 28
- C) 14
- D) 81
- E) Ninguno

**respuesta:** B
**explicacion:** Calculá el volumen teórico con la estequiometría y luego aplicá el rendimiento.
Paso 1 · $M(Ca_3P_2)=3(40.08)+2(30.97)=182.18\ g/mol$. $n=\dfrac{150}{182.18}=0.8233\ mol$.
Paso 2 · $n(PH_3)_{teo}=2\times0.8233=1.6466\ mol$.
Paso 3 · $V_{teo}=1.6466\times22.4=36.88\ L$ (c.n.).
Paso 4 · $V_{real}=36.88\times0.76=28.0\ L$.
Respuesta: B.

---

## Pregunta 13
area: quimica
tema: mezcla-soluciones-normalidad
dificultad: dificil

¿Qué volúmenes (mL) de dos soluciones H2SO4 (15% pureza, densidad 1.19; 55% pureza, densidad 1.25) deben mezclarse para preparar 250mL de solución 7N de H2SO4?

- A) 169 y 81
- B) 125 y 125
- C) 222 y 28
- D) 100 y 150
- E) Ninguno

**respuesta:** A
**explicacion:** Convertí cada solución a Normalidad (peso equivalente H2SO4=49) y planteá el balance de equivalentes.
Paso 1 · Solución 1: $g/mL=1.19\times0.15=0.1785$; $N_1=\dfrac{0.1785\times1000}{49}=3.643\ N$.
Paso 2 · Solución 2: $g/mL=1.25\times0.55=0.6875$; $N_2=\dfrac{0.6875\times1000}{49}=14.031\ N$.
Paso 3 · Balance: $N_1V_1+N_2(250-V_1)=7\times250=1750$.
Paso 4 · $3.643V_1+3507.65-14.031V_1=1750\Rightarrow-10.388V_1=-1757.65\Rightarrow V_1=169.2\ mL$.
Paso 5 · $V_2=250-169.2=80.8\ mL\approx$ 169 y 81.
Respuesta: A.

---

## Pregunta 14
area: quimica
tema: redox-ion-electron
dificultad: dificil

$Cu+HNO_3\rightarrow Cu(NO_3)_2+NO+H_2O$ (balanceá por ion-electrón). $x=\dfrac{\text{coef(sustancia oxidada)}}{\text{coef(agente oxidante)}-\text{coef(agente reductor)}}$

- A) -3/5
- B) 8/5
- C) -8/5
- D) 3/5
- E) Ninguno

**respuesta:** D
**explicacion:** Balanceá la ecuación completa e identificá los coeficientes pedidos.
Paso 1 · Ecuación balanceada: $3Cu+8HNO_3\rightarrow3Cu(NO_3)_2+2NO+4H_2O$ (verificado: Cu 3=3, N 8=6+2, H 8=8, O 24=18+2+4).
Paso 2 · Sustancia oxidada = Cu (pierde electrones, $Cu^0\rightarrow Cu^{2+}$), coeficiente = 3.
Paso 3 · Agente oxidante = HNO3 (coeficiente total en la ecuación = 8); agente reductor = Cu, coeficiente = 3.
Paso 4 · $x=\dfrac{3}{8-3}=\dfrac{3}{5}$.
Respuesta: D.

---

## Pregunta 15
area: quimica
tema: titulacion-acido-base
dificultad: medio

Calcular el volumen (mL) de HCl 0.2N para titular 0.35g de una muestra al 70% en masa de Na2CO3. $Na_2CO_3+2HCl\rightarrow2NaCl+CO_2+H_2O$

- A) 23
- B) 14
- C) 10.5
- D) 50
- E) Ninguno

**respuesta:** A
**explicacion:** Hallá la masa pura de Na2CO3, convertí a equivalentes y usá $N\times V=eq$.
Paso 1 · Masa Na2CO3 $=0.35\times0.70=0.245\ g$.
Paso 2 · $M(Na_2CO_3)=2(22.99)+12.01+3(16)=105.99\approx106\ g/mol$; peso equivalente $=106/2=53\ g/eq$ (2 H+ por fórmula).
Paso 3 · $eq=\dfrac{0.245}{53}=0.0046226\ eq$.
Paso 4 · $V=\dfrac{eq}{N}=\dfrac{0.0046226}{0.2}=0.023113\ L=23.1\ mL\approx23\ mL$.
Respuesta: A.

---

## Pregunta 16
area: fisica
tema: dinamica-polea-atwood-modificado
dificultad: dificil

Sistema de polea: bloque 2 sobre superficie horizontal (arrastrado por la cuerda vía polea), bloque 1 cuelga y desciende 10m. $m_1=m_2=200\ kg$, sin fricción. Determinar el trabajo neto que efectúa la TENSIÓN sobre el bloque 2.

- A) 10000J
- B) 20000J
- C) 30000J
- D) 40000J
- E) Ninguno

**respuesta:** A
**explicacion:** Aplicá 2ª ley de Newton a cada bloque (sistema tipo Atwood, con $g=10\ m/s^2$) y luego calculá el trabajo de la tensión sobre el bloque 2.
Paso 1 · Bloque 1 (cuelga): $m_1g-T=m_1a$. Bloque 2 (horizontal, sin fricción): $T=m_2a$.
Paso 2 · Sumando: $m_1g=(m_1+m_2)a\Rightarrow a=\dfrac{200\times10}{400}=5\ m/s^2$.
Paso 3 · $T=m_2a=200\times5=1000\ N$.
Paso 4 · El bloque 2 se desplaza 10m horizontalmente (misma magnitud que el descenso de 1, por la cuerda inextensible), en la misma dirección que $T$: $W=T\times d=1000\times10=10000\ J$.
Respuesta: A.

---

## Pregunta 17
area: fisica
tema: energia-resorte-rampa
dificultad: medio

Bloque de 100kg se suelta y desliza sin fricción por una rampa (altura vertical 2m) hasta llegar a un resorte K=1000N/m. Determinar la máxima deformación del resorte.

- A) 1m
- B) 2m
- C) 3m
- D) 4m
- E) Ninguno

**respuesta:** B
**explicacion:** Conservación de energía: toda la energía potencial gravitatoria se convierte en energía potencial elástica en la máxima deformación.
Paso 1 · $mgh=\frac12Kx^2$, con $g=10\ m/s^2$: $100\times10\times2=2000\ J$.
Paso 2 · $\frac12(1000)x^2=2000\Rightarrow500x^2=2000\Rightarrow x^2=4\Rightarrow x=2\ m$.
Respuesta: B.

---

## Pregunta 18
area: fisica
tema: electrostatica-equilibrio-pared
dificultad: dificil

Hallar la reacción normal de una pared vertical sobre una esfera cargada Q1 en equilibrio (sistema con otra esfera Q2 a 20cm de distancia, unidas por un hilo que forma 45° con la vertical, Q2=4·Q1=40μC entonces Q1=10μC, peso de la carga 1 = 10N).

- A) 20N
- B) 40N
- C) 70N
- D) 80N
- E) Ninguno

**respuesta:** D
**explicacion:** La esfera Q1 está en equilibrio bajo su peso, la tensión del hilo (a 45°) y la fuerza de Coulomb de Q2 (que la empuja contra la pared); la pared reacciona con una normal horizontal.
Paso 1 · Fuerza de Coulomb: $F=\dfrac{kQ_1Q_2}{r^2}=\dfrac{(9\times10^9)(10\times10^{-6})(40\times10^{-6})}{(0.2)^2}=\dfrac{3.6}{0.04}=90\ N$.
Paso 2 · Equilibrio vertical del hilo (45° con la vertical): $T\cos45°=W\Rightarrow T=\dfrac{10}{\cos45°}=10\sqrt2\approx14.14\ N$.
Paso 3 · Componente horizontal de la tensión (por ser 45°, igual a la componente vertical): $T\sen45°=10\ N$, dirigida hacia afuera de la pared.
Paso 4 · Equilibrio horizontal: $F$ empuja la esfera contra la pared, y la normal $N$ junto con la componente horizontal del hilo se oponen: $N=F-T\sen45°=90-10=80\ N$.
Respuesta: D.

---

## Pregunta 19
area: fisica
tema: campo-electrico-cargas-cuadrado
dificultad: dificil

En los vértices de un cuadrado de 10cm de lado se colocan cargas puntuales (en orden alrededor del cuadrado): 200pC, -400pC, 100pC, -400pC. Determine la magnitud del campo eléctrico resultante en el CENTRO del cuadrado.

- A) 170 N/C
- B) 450 N/C
- C) 720 N/C
- D) 180 N/C
- E) Ninguno

**respuesta:** D
**explicacion:** Descomponé vectorialmente el campo de cada carga (la distancia de cada vértice al centro es la misma, $r=a/\sqrt2$) y sumá componente a componente.
Paso 1 · $r=\dfrac{0.10\sqrt2}{2}=0.07071\ m$; $r^2=0.005\ m^2$; $k/r^2=1.8\times10^{12}$.
Paso 2 · Magnitudes: $E_1=1.8\times10^{12}\times200\times10^{-12}=360\ N/C$ (V1,+200pC); $E_2=720\ N/C$ (V2,-400pC); $E_3=180\ N/C$ (V3,+100pC); $E_4=720\ N/C$ (V4,-400pC).
Paso 3 · Con $V_1=(0,0), V_2=(0.1,0), V_3=(0.1,0.1), V_4=(0,0.1)$ y centro $O=(0.05,0.05)$: cada campo apunta alejándose de la carga (si es +) o acercándose a ella (si es -), a $45°$ de los ejes.
Paso 4 · Sumando componentes x e y: $E_x=E_y=\dfrac{360+720-180-720}{\sqrt2}=\dfrac{180}{\sqrt2}=127.28\ N/C$.
Paso 5 · $E=\sqrt{E_x^2+E_y^2}=\sqrt{2}\times127.28=180\ N/C$ (exacto).
Respuesta: D.

---

## Pregunta 20
area: fisica
tema: capacitores-serie-energia
dificultad: dificil

Sistema de dos condensadores en serie: uno fijo de 1μF, otro "C" variable, conectados a fuente de 40V. El sistema almacena 1.6 milijoules de energía. Determine C.

- A) 4μF
- B) 3μF
- C) 2μF
- D) 1μF
- E) Ninguno

**respuesta:** E
**explicacion:** Calculá la capacitancia equivalente necesaria a partir de la energía y verificá si es alcanzable en serie con un capacitor fijo de 1μF.
Paso 1 · $E=\frac12C_{eq}V^2\Rightarrow1.6\times10^{-3}=\frac12C_{eq}(40)^2=800\,C_{eq}\Rightarrow C_{eq}=2\times10^{-6}\ F=2\ \mu F$.
Paso 2 · En serie, $C_{eq}=\dfrac{1\cdot C}{1+C}$ es siempre MENOR que el menor de los dos capacitores (aquí, menor que 1μF), sin importar cuán grande sea $C$: cuando $C\to\infty$, $C_{eq}\to1\ \mu F$ (cota superior, nunca alcanzada).
Paso 3 · La energía máxima posible en esa cota es $E_{max}=\frac12(1\times10^{-6})(1600)=0.8\times10^{-3}\ J=0.8\ mJ$, que es la MITAD de lo pedido (1.6mJ).
Paso 4 · Resolviendo algebraicamente $\frac{C}{1+C}=2\Rightarrow C=2+2C\Rightarrow C=-2\ \mu F$ (negativo, no físico). No existe ningún valor real de C que cumpla la condición en una configuración en serie con el capacitor fijo de 1μF.
Respuesta: E.

---

## Pregunta 21
area: biologia
tema: reinos-clasificacion
dificultad: facil

Los seres vivos se clasifican en los siguientes reinos:

- A) Animal, Vegetal, Mineral
- B) Archeobacteria, Bacteria y Eucarya
- C) Monera, Protista, Fungi, Plantae y Animalia
- D) Todas
- E) Ninguna

**respuesta:** C
**explicacion:** Distinguí la clasificación por reinos de otras clasificaciones biológicas.
Paso 1 · "Animal, Vegetal, Mineral" es una clasificación antigua e incorrecta (Mineral no es un reino de seres vivos).
Paso 2 · "Archeobacteria, Bacteria y Eucarya" corresponde al sistema de tres DOMINIOS, no de reinos.
Paso 3 · El sistema de cinco reinos (Monera, Protista, Fungi, Plantae, Animalia) es la clasificación de reinos correcta. Como A es falso, "Todas" (D) no puede ser correcta.
Respuesta: C.

---

## Pregunta 22
area: biologia
tema: nomenclatura-binomial
dificultad: facil

En la nomenclatura del sistema binomial, el nombre científico consiste en dos partes:

- A) Familia y especie
- B) Género y especie
- C) Familia y especie
- D) Todos
- E) Ninguna

**respuesta:** B
**explicacion:** Definición directa del sistema de nomenclatura binomial de Linneo.
Paso 1 · El nombre científico de una especie se compone de Género (primera palabra, con mayúscula) y especie o epíteto específico (segunda palabra, minúscula).
Respuesta: B.

---

## Pregunta 23
area: biologia
tema: biodiversidad-bolivia
dificultad: medio

Bolivia es considerada biodiversa por:

- A) Condiciones óptimas de hábitats
- B) Ambientes cálidos-húmedos, fríos-áridos
- C) Suelos diversos
- D) Presencia de los Andes y ubicación céntrica en el continente
- E) Todas

**respuesta:** E
**explicacion:** Evaluá cada factor por separado.
Paso 1 · Bolivia tiene hábitats óptimos y muy variados (amazonía, altiplano, valles, chaco).
Paso 2 · Tiene ambientes climáticos muy contrastantes: cálido-húmedos en tierras bajas, fríos-áridos en el altiplano.
Paso 3 · Presenta suelos diversos según piso ecológico.
Paso 4 · La presencia de la cordillera de los Andes y su ubicación central en Sudamérica generan gradientes altitudinales que multiplican los ecosistemas.
Paso 5 · Todos los factores (A-D) son causas reales y complementarias de la biodiversidad boliviana.
Respuesta: E.

---

## Pregunta 24
area: biologia
tema: interacciones-especies
dificultad: facil

Tipo de interacciones entre las especies:

- A) Mutualismo
- B) Comensalismo
- C) Parasitismo
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Evaluá cada tipo de interacción.
Paso 1 · El mutualismo (ambas especies se benefician), el comensalismo (una se beneficia, la otra no se afecta) y el parasitismo (una se beneficia a costa de la otra) son los tres tipos clásicos de interacciones interespecíficas.
Respuesta: D.

---

## Pregunta 25
area: biologia
tema: clasificacion-plantas-angiospermas
dificultad: facil

Los tomates, las cebollas y los pepinos son:

- A) Briofitas
- B) Gimnospermas
- C) Angiospermas
- D) Todas
- E) Ninguna

**respuesta:** C
**explicacion:** Compará las características de cada grupo con las plantas mencionadas.
Paso 1 · Las briofitas (musgos) no tienen flores ni semillas verdaderas; las gimnospermas (coníferas) tienen semillas desnudas sin fruto.
Paso 2 · El tomate, la cebolla y el pepino son plantas con flor que producen semillas encerradas en un fruto (u órgano floral modificado), característica de las Angiospermas.
Respuesta: C.

---
