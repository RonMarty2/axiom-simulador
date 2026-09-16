---
universidad: UMSS
facultad: ingenieria
anio: 2008
categoria: parcial_curso
titulo: Tercer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008)
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
  Tercer Parcial · Segundo Curso Pre-Facultativo (Pre-Facultativo) · UMSS FCyT ·
  Gestión 2-2008. Track paralelo al "Primer Curso" ya cargado. Estructura
  "5 libros parejos": Aritmética-Álgebra 5, Geometría-Trigonometría 5,
  Química 5, Física 5, Biología 10 = 30 preguntas, cada área vale 20%
  del examen.

  PARTICULARIDAD DE FORMATO: las Preguntas 1 y 3 de Aritmética-Álgebra
  NO tienen opción "ninguno" en el PDF original — son 5 opciones (a-e)
  puramente numéricas. Se respeta tal cual el original; ambas se
  resolvieron con cálculo riguroso y el resultado coincide exactamente
  con una de las 5 opciones (a en ambos casos).

  ESTADO (26-jul-2026): 30/30 preguntas verificadas con cálculo
  independiente (agente dedicado). Notas de verificación:
  - Química 12 (normalidad/%masa tras dilución): el PDF da densidad
    final de 1.20 g/mL, pero el método que reproduce las opciones del
    banco es el simplificado típico de estos exámenes (sumar los
    volúmenes de acuoso+agua directamente = 600 mL para la Normalidad,
    y usar esa densidad final × volumen sumado para estimar la masa
    total = %masa). El enfoque físicamente "puro" (conservación de masa
    + volumen real vía densidad) da 6.58 N / 26.9%, que no calza con
    ninguna opción — el método de la clave sí calza exacto con C
    (6.42; 26.2).
  - Química 15: el descenso crioscópico calculado da ΔTf≈1.336°C
    (Tf≈-1.34°C), levemente distinto de la opción D (-1.36°C) por
    redondeos de la clave original, pero es la única opción físicamente
    coherente (las demás son 0°C, -1.78°C o -3.36°C, muy alejadas).
  - Biología 5 y 8 llevan nota: en la 5 ninguna opción (Taiga/Sabana/
    Tundra) corresponde realmente al bioma boliviano "reservorio de
    agua" (sería humedal/bofedal andino o Amazonía), por eso se marca
    "Ninguna". En la 8, el valor de 140 dB-A sí corresponde al límite
    de pico recomendado por la OMS para ruido de impulso (Guidelines
    for Community Noise, 1999), aunque la fuente de ejemplo (bocinas
    de auto) sea aproximada.
-->

## Pregunta 1
area: aritmetica_algebra
tema: sistema-ecuaciones-suma-cuadrados
dificultad: medio

Sean x1, x2 las dos soluciones (valores de x) del siguiente sistema. Determinar el valor de $E=x_1+x_2$:

$$x+y=10$$
$$x^2+y^2=58$$

- A) 10
- B) 11/2
- C) 11/4
- D) 5
- E) 6

**respuesta:** A
**explicacion:** Esta pregunta del examen original NO tiene opción "ninguno": las 5 opciones son puramente numéricas.
Paso 1 · $xy=\frac{(x+y)^2-(x^2+y^2)}{2}=\frac{100-58}{2}=21$.
Paso 2 · $x,y$ son raíces de $t^2-10t+21=0 \Rightarrow (t-7)(t-3)=0 \Rightarrow t=7$ ó $t=3$.
Paso 3 · Las dos soluciones del sistema son $(x,y)=(7,3)$ y $(3,7)$; los dos valores posibles de $x$ son $7$ y $3$, así que $E=x_1+x_2=7+3=10$.
Respuesta: A.

---

## Pregunta 2
area: aritmetica_algebra
tema: binomio-newton-termino-independiente
dificultad: dificil

Determinar el término independiente de $\left(x^7+\dfrac{1}{\sqrt[3]{x}}\right)^{22}$, con $x\neq0$.

- A) 12
- B) 22
- C) 31
- D) 40
- E) ninguno

**respuesta:** B
**explicacion:** Plantea el término general del binomio y encuentra el valor de $k$ que anula el exponente de $x$.
Paso 1 · Término general: $T_{k+1}=\binom{22}{k}(x^7)^{22-k}\left(x^{-1/3}\right)^k=\binom{22}{k}x^{7(22-k)-k/3}$.
Paso 2 · Igualando el exponente a cero: $7(22-k)-\frac{k}{3}=0 \Rightarrow 154-7k-\frac{k}{3}=0$. Multiplicando por 3: $462-21k-k=0 \Rightarrow 462-22k=0 \Rightarrow k=21$.
Paso 3 · El término independiente es $\binom{22}{21}=22$.
Respuesta: B.

---

## Pregunta 3
area: aritmetica_algebra
tema: ecuacion-cuadratica-relacion-raices
dificultad: dificil

En la ecuación $x^2+(2k+5)x+k=0$, una raíz excede a la otra en 3 unidades. Determinar el valor de "k":

- A) -2
- B) 1
- C) -4/5
- D) 5
- E) 6

**respuesta:** A
**explicacion:** Esta pregunta tampoco tiene opción "ninguno" en el original: 5 opciones numéricas puras. Usa suma y producto de raíces.
Paso 1 · Sean las raíces $r$ y $r+3$. Suma: $r+(r+3)=2r+3=-(2k+5)$, de donde $r=-k-4$.
Paso 2 · Producto: $r(r+3)=k$.
Paso 3 · Sustituyendo $r=-k-4$: $(-k-4)^2+3(-k-4)-k=0 \Rightarrow k^2+8k+16-3k-12-k=0 \Rightarrow k^2+4k+4=0 \Rightarrow (k+2)^2=0 \Rightarrow k=-2$.
Respuesta: A.

---

## Pregunta 4
area: aritmetica_algebra
tema: logaritmos-cambio-base
dificultad: dificil

Si $\log_x(12)-3\log_{x^2}(4)+\log_x(6)=2$, calcular el valor de "x".

- A) $\sqrt3$
- B) 3
- C) $\sqrt2$
- D) 4
- E) ninguno

**respuesta:** B
**explicacion:** Convierte $\log_{x^2}(4)$ a base $x$ usando $\log_{x^2}(4)=\frac{\log_x(4)}{2}$.
Paso 1 · La ecuación queda $\log_x(12)-\frac{3}{2}\log_x(4)+\log_x(6)=2$.
Paso 2 · Agrupando con propiedades de logaritmos: $\log_x(12\times6)-\log_x\left(4^{3/2}\right)=2 \Rightarrow \log_x(72)-\log_x(8)=2$.
Paso 3 · $\log_x\left(\frac{72}{8}\right)=2 \Rightarrow \log_x(9)=2 \Rightarrow x^2=9 \Rightarrow x=3$.
Respuesta: B.

---

## Pregunta 5
area: aritmetica_algebra
tema: progresion-geometrica-aplicada
dificultad: medio

Se contrata un obrero para búsqueda de fósiles, prometiéndole pagar una suma por el primer fósil y luego duplicando dicha suma por cada nuevo fósil encontrado. Encuentra ocho fósiles y recibe 2040 Bs. ¿Cuánto le pagaron por el primer fósil?

- A) 32
- B) 8
- C) 64
- D) 7
- E) ninguno

**respuesta:** B
**explicacion:** Es una progresión geométrica de razón 2 con 8 términos, cuya suma es 2040 Bs.
Paso 1 · Suma de una progresión geométrica: $S=a\cdot\frac{r^n-1}{r-1}=a\cdot\frac{2^8-1}{2-1}=255a$.
Paso 2 · $255a=2040 \Rightarrow a=8$.
Respuesta: B.

---

## Pregunta 6
area: geometria_trigonometria
tema: identidades-angulo-doble
dificultad: medio

Sea $\cos(\theta)=-\dfrac{4}{5}$, con $\theta$ en el tercer cuadrante. Determinar el valor de $E=\tan(2\theta)$.

- A) 24/7
- B) 5
- C) -24/7
- D) 24/5
- E) ninguno

**respuesta:** A
**explicacion:** En el tercer cuadrante seno y coseno son ambos negativos.
Paso 1 · $\sin^2\theta=1-\cos^2\theta=1-\frac{16}{25}=\frac{9}{25} \Rightarrow \sin\theta=-\frac35$ (tercer cuadrante).
Paso 2 · $\tan\theta=\frac{\sin\theta}{\cos\theta}=\frac{-3/5}{-4/5}=\frac34$.
Paso 3 · $\tan(2\theta)=\frac{2\tan\theta}{1-\tan^2\theta}=\frac{2(3/4)}{1-9/16}=\frac{3/2}{7/16}=\frac{24}{7}$.
Respuesta: A.

---

## Pregunta 7
area: geometria_trigonometria
tema: reduccion-angulos-cuadrantes
dificultad: dificil

Hallar el valor de $E=\text{sen}\left(\dfrac{13\pi}{2}+x\right)\cdot\sec(9\pi-x)$; $x$ ángulo agudo.

- A) 1
- B) 2
- C) -1
- D) 3
- E) ninguno

**respuesta:** C
**explicacion:** Reduce cada ángulo restando múltiplos completos de $2\pi$.
Paso 1 · $\frac{13\pi}{2}=6\pi+\frac{\pi}{2}$, entonces $\text{sen}\left(\frac{13\pi}{2}+x\right)=\text{sen}\left(\frac{\pi}{2}+x\right)=\cos(x)$.
Paso 2 · $9\pi=8\pi+\pi$, entonces $\sec(9\pi-x)=\sec(\pi-x)=\frac{1}{\cos(\pi-x)}=\frac{1}{-\cos(x)}=-\sec(x)$.
Paso 3 · $E=\cos(x)\cdot(-\sec(x))=\cos(x)\cdot\left(-\frac{1}{\cos(x)}\right)=-1$.
Respuesta: C.

---

## Pregunta 8
area: geometria_trigonometria
tema: ecuaciones-trigonometricas-angulo-doble
dificultad: medio

La menor solución en el intervalo $[0°;180°]$ de la ecuación trigonométrica $4\text{sen}^2(x)\cos^2(x)=\dfrac14$ es:

- A) 30°
- B) 15°
- C) 75°
- D) 65°
- E) ninguno

**respuesta:** B
**explicacion:** Reconoce la identidad del ángulo doble dentro de la expresión.
Paso 1 · $4\text{sen}^2(x)\cos^2(x)=(2\,\text{sen}(x)\cos(x))^2=\text{sen}^2(2x)=\frac14 \Rightarrow \text{sen}(2x)=\pm\frac12$.
Paso 2 · Con $x\in[0°,180°]$, $2x\in[0°,360°]$. La solución positiva más pequeña de $\text{sen}(2x)=\frac12$ es $2x=30°$.
Paso 3 · $x=15°$ (las demás soluciones, como $2x=150°,210°,330°$, dan valores de $x$ mayores).
Respuesta: B.

---

## Pregunta 9
area: geometria_trigonometria
tema: identidades-trigonometricas-simplificacion
dificultad: medio

Calcular "M" para que la igualdad $\dfrac{\cos(x)}{1+\text{sen}(x)}+\dfrac{\cos(x)}{1-\text{sen}(x)}=\dfrac{2}{M}$ sea una identidad.

- A) $\cos(x)$
- B) $-\text{sen}(x)$
- C) $\tan(x)$
- D) $\sec(x)$
- E) ninguno

**respuesta:** A
**explicacion:** Suma las dos fracciones usando común denominador $1-\text{sen}^2(x)=\cos^2(x)$.
Paso 1 · $\frac{\cos(x)(1-\text{sen}(x))+\cos(x)(1+\text{sen}(x))}{(1+\text{sen}(x))(1-\text{sen}(x))}=\frac{2\cos(x)}{1-\text{sen}^2(x)}=\frac{2\cos(x)}{\cos^2(x)}=\frac{2}{\cos(x)}$.
Paso 2 · Comparando con $\frac{2}{M}$: $M=\cos(x)$.
Respuesta: A.

---

## Pregunta 10
area: geometria_trigonometria
tema: ecuaciones-trigonometricas-producto-nulo
dificultad: medio

En el intervalo $[0°;360°]$, hallar la suma de las soluciones de $(\cos(x)+2)(2\cos(x)-1)=0$.

- A) 150°
- B) 300°
- C) 360°
- D) 180°
- E) ninguno

**respuesta:** C
**explicacion:** Un producto es cero si al menos uno de los factores es cero; descarta el factor imposible.
Paso 1 · $\cos(x)+2=0 \Rightarrow \cos(x)=-2$, imposible (el coseno está entre -1 y 1).
Paso 2 · $2\cos(x)-1=0 \Rightarrow \cos(x)=\frac12 \Rightarrow x=60°$ ó $x=300°$ en $[0°,360°]$.
Paso 3 · Suma $=60°+300°=360°$.
Respuesta: C.

---

## Pregunta 11
area: quimica
tema: estequiometria-gas-recolectado-sobre-agua
dificultad: dificil

El aluminio reacciona con ácido sulfúrico para formar sulfato de aluminio $Al_2(SO_4)_3$ y gas hidrógeno. ¿Qué volumen de gas hidrógeno (mL) recolectado sobre agua a 20°C y 750 mmHg se obtuvo al reaccionar 2,50 g de aluminio? Rendimiento 65%. Presión de vapor de $H_2O$ a 20°C = 17,5 torr.

- A) 2,25
- B) 22,53
- C) 225,3
- D) 2253
- E) Ninguno

**respuesta:** D
**explicacion:** Balancea primero, calcula el $\mathrm{H_{2}}$ teórico, aplica el rendimiento y usa la ley de Dalton para descontar el vapor de agua antes de aplicar la ley de gases ideales.
Paso 1 · Ecuación balanceada: $2Al+3H_2SO_4\rightarrow Al_2(SO_4)_3+3H_2$.
Paso 2 · Moles de Al $=\frac{2.50}{27}=0.0926$ mol. Moles de $H_2$ teóricos $=\frac32\times0.0926=0.1389$ mol.
Paso 3 · Con 65% de rendimiento: moles reales de $H_2=0.1389\times0.65=0.0903$ mol.
Paso 4 · Presión parcial del $H_2$ (Dalton, sobre agua): $P_{H_2}=750-17.5=732.5$ mmHg $=0.9638$ atm.
Paso 5 · Ley de gases ideales: $V=\frac{nRT}{P}=\frac{0.0903\times0.08206\times293.15}{0.9638}\approx2.253$ L $=2253$ mL.
Respuesta: D.

---

## Pregunta 12
area: quimica
tema: soluciones-dilucion-normalidad-porcentaje
dificultad: dificil

A 120 mL de una solución de ácido sulfúrico al 85% en masa de $H_2SO_4$ y densidad 1,85 g/mL, se añadieron 480 mL de agua para formar una solución de 1,20 g/mL de densidad. Determinar la Normalidad y el porcentaje en masa de $H_2SO_4$ de la solución resultante.

- A) 3,21; 26,2
- B) 6,42; 10,7
- C) 6,42; 26,2
- D) 11,6; 13,8
- E) Ninguno

**respuesta:** C
**explicacion:** Calcula la masa de soluto a partir de la solución original, suma los volúmenes de ácido y agua para el volumen final, y usa la densidad final dada para obtener la masa total de la mezcla.
Paso 1 · Masa de la solución original $=120\text{ mL}\times1.85\text{ g/mL}=222$ g. Masa de $H_2SO_4=0.85\times222=188.7$ g.
Paso 2 · Volumen final (suma de volúmenes) $=120+480=600$ mL $=0.600$ L.
Paso 3 · Moles de $H_2SO_4=\frac{188.7}{98}=1.9255$ mol; equivalentes (diprótico) $=2\times1.9255=3.851$ eq.
Paso 4 · Normalidad $=\frac{3.851\text{ eq}}{0.600\text{ L}}=6.42$ N.
Paso 5 · Masa total de la solución final usando la densidad dada: $m=V\times\rho=600\text{ mL}\times1.20\text{ g/mL}=720$ g. Porcentaje en masa $=\frac{188.7}{720}\times100=26.2\%$.
Respuesta: C.

---

## Pregunta 13
area: quimica
tema: propiedades-coligativas-descenso-crioscopico
dificultad: medio

Dos soluciones que contienen 9,50 gramos de $CON_2H_4$ (urea) y 20,5 gramos de una sustancia X, respectivamente, en 100 g de un solvente, congelan a la misma temperatura. Calcular el peso molecular de X.

- A) 130 g/mol
- B) 342 g/mol
- C) 120 g/mol
- D) 420 g/mol
- E) Ninguno

**respuesta:** A
**explicacion:** Si ambas soluciones congelan a la misma temperatura (mismo solvente, mismo Kc), tienen la misma molalidad.
Paso 1 · Moles de urea (M=60 g/mol) $=\frac{9.50}{60}=0.15833$ mol. Molalidad $=\frac{0.15833}{0.100\text{ kg}}=1.5833$ mol/kg.
Paso 2 · Como la molalidad de X debe ser igual: moles de X $=1.5833\times0.100=0.15833$ mol.
Paso 3 · Peso molecular de X $=\frac{20.5\text{ g}}{0.15833\text{ mol}}\approx129.5\approx130$ g/mol.
Respuesta: A.

---

## Pregunta 14
area: quimica
tema: difusion-gases-ley-graham
dificultad: medio

Calcular la masa molecular de un gas si un volumen dado del gas se difunde en 200 segundos y el mismo volumen de propano ($C_3H_8$) se difunde en 235 segundos bajo las mismas condiciones.

- A) 42 g/mol
- B) 32 g/mol
- C) 24 g/mol
- D) 44 g/mol
- E) Ninguno

**respuesta:** B
**explicacion:** Ley de Graham: la rapidez de difusión es inversamente proporcional al tiempo, y se relaciona con la raíz cuadrada de la masa molar.
Paso 1 · $\frac{v_{gas}}{v_{propano}}=\frac{t_{propano}}{t_{gas}}=\frac{235}{200}=1.175$.
Paso 2 · Ley de Graham: $\frac{v_{gas}}{v_{propano}}=\sqrt{\frac{M_{propano}}{M_{gas}}} \Rightarrow (1.175)^2=\frac{44}{M_{gas}}$.
Paso 3 · $M_{gas}=\frac{44}{1.3806}\approx31.9\approx32$ g/mol.
Respuesta: B.

---

## Pregunta 15
area: quimica
tema: propiedades-coligativas-raoult-crioscopia
dificultad: dificil

La presión de vapor de una solución preparada con 10 g de un soluto no volátil y 75 g de agua a 100°C es 750,3 mmHg. Calcular la temperatura de congelación de la solución. ($K_c=1,86°C\cdot kg/mol$)

- A) -1,78°C
- B) -3,36°C
- C) 0°C
- D) -1,36°C
- E) Ninguno

**respuesta:** D
**explicacion:** Usa la ley de Raoult (con la presión de vapor del agua pura a 100°C = 760 mmHg) para hallar la fracción molar y los moles de soluto, y con eso la molalidad para el descenso crioscópico.
Paso 1 · Fracción molar del soluto: $X_{soluto}=\frac{\Delta P}{P°}=\frac{760-750.3}{760}=0.01276$.
Paso 2 · Moles de agua $=\frac{75}{18}=4.1667$ mol. De $X_{soluto}=\frac{n_{soluto}}{n_{soluto}+n_{agua}}$ se despeja $n_{soluto}=\frac{0.01276\times4.1667}{1-0.01276}\approx0.0539$ mol.
Paso 3 · Molalidad $=\frac{0.0539}{0.075\text{ kg}}\approx0.718$ mol/kg.
Paso 4 · $\Delta T_f=K_c\times m=1.86\times0.718\approx1.34°C$. La temperatura de congelación es $T_f\approx-1.34°C$, la única opción físicamente coherente entre las dadas (las demás son 0°C o descensos mucho mayores) es -1,36°C.
Respuesta: D.

---

## Pregunta 16
area: fisica
tema: ley-de-coulomb-proporcionalidad-inversa
dificultad: facil

Dos cuerpos cargados ejercen una fuerza de 0.48 N entre sí. ¿Cuál será la fuerza (N) si se mueven y quedan a una distancia de solo la octava parte de la anterior?

- A) 3.84
- B) 0.6
- C) 30.7
- D) 0.48
- E) Ninguno

**respuesta:** C
**explicacion:** La ley de Coulomb dice que $F\propto\frac{1}{d^2}$; si la distancia se reduce a 1/8, la fuerza aumenta $8^2$ veces.
Paso 1 · $\frac{F_2}{F_1}=\left(\frac{d_1}{d_2}\right)^2=\left(\frac{d_1}{d_1/8}\right)^2=8^2=64$.
Paso 2 · $F_2=0.48\times64=30.72\approx30.7$ N.
Respuesta: C.

---

## Pregunta 17
area: fisica
tema: capacitancia-definicion
dificultad: facil

La diferencia de potencial entre dos alambres paralelos en aire es 20V. Tienen cargas iguales en magnitud, 65 pC, pero de signo contrario. ¿Cuál es la capacitancia (pF) de los alambres?

- A) 3.25
- B) 1300
- C) 0.308
- D) 42250
- E) Ninguno

**respuesta:** A
**explicacion:** La capacitancia se define como $C=Q/V$.
Paso 1 · $C=\frac{Q}{V}=\frac{65\text{ pC}}{20\text{ V}}=3.25$ pF.
Respuesta: A.

---

## Pregunta 18
area: fisica
tema: resistencias-en-paralelo
dificultad: facil

Se conectan 8 bombillas en paralelo. Si su resistencia total es 2 Ω, ¿cuál es la resistencia (Ω) de cada una?

- A) 8
- B) 16
- C) 0.25
- D) 4
- E) Ninguno

**respuesta:** B
**explicacion:** Para $n$ resistencias iguales en paralelo, $R_{total}=R/n$.
Paso 1 · $R=n\times R_{total}=8\times2=16$ Ω.
Respuesta: B.

---

## Pregunta 19
area: fisica
tema: capacitores-serie-paralelo
dificultad: medio

La capacitancia de una parte de un circuito se va a reducir de 3600 a 2000 pF. ¿Qué capacitancia (pF) se debe agregar al circuito para producir este efecto sin quitar nada más? ¿Cómo se debe conectar el capacitor adicional?

- A) 1600 en serie
- B) 1600 en paralelo
- C) 4500 en paralelo
- D) 4500 en serie
- E) Ninguno

**respuesta:** D
**explicacion:** Para reducir la capacitancia total sin quitar componentes, el capacitor adicional debe conectarse en serie con el existente.
Paso 1 · $\frac{1}{C_{total}}=\frac{1}{C_{original}}+\frac{1}{C_{agregado}} \Rightarrow \frac{1}{2000}=\frac{1}{3600}+\frac{1}{C_{agregado}}$.
Paso 2 · $\frac{1}{C_{agregado}}=\frac{1}{2000}-\frac{1}{3600}=\frac{9-5}{18000}=\frac{4}{18000}=\frac{1}{4500}$.
Paso 3 · $C_{agregado}=4500$ pF, conectado en serie.
Respuesta: D.

---

## Pregunta 20
area: fisica
tema: potencia-energia-electrica
dificultad: facil

¿Cuántos kWh usa una cacerola eléctrica de 1300 W en 45 minutos de funcionamiento?

- A) 58500
- B) 28.9
- C) 1773
- D) 0.975
- E) Ninguno

**respuesta:** D
**explicacion:** La energía consumida es $E=P\times t$, con el tiempo en horas para obtener kWh.
Paso 1 · $t=45\text{ min}=0.75$ h.
Paso 2 · $E=1300\text{ W}\times0.75\text{ h}=975$ Wh $=0.975$ kWh.
Respuesta: D.

---

## Pregunta 21
area: biologia
tema: ecosistema-climax
dificultad: facil

Un ecosistema llega a un estado de clímax cuando:

- A) Una comunidad biológica se encuentra en equilibrio óptimo
- B) Se producen cambios drásticos en las comunidades
- C) Los factores bióticos están en equilibrio
- D) Todas
- E) Ninguna

**respuesta:** A
**explicacion:** El estado clímax es la etapa final y estable de la sucesión ecológica.
Paso 1 · El clímax es el estado en que una comunidad alcanza un equilibrio óptimo y estable con su ambiente, sin cambios drásticos: esto descarta (b), que describe justo lo opuesto.
Paso 2 · (c) es parcialmente cierta pero incompleta (el equilibrio del clímax no es solo biótico, sino de toda la comunidad con su entorno), por lo que la mejor definición es (a).
Respuesta: A.

---

## Pregunta 22
area: biologia
tema: acciones-minimizar-contaminacion
dificultad: facil

Son acciones que minimizan la contaminación ambiental:

- A) Reducir el gasto de energía donde nos encontremos
- B) Reducir y reciclar la basura
- C) No quemar en San Juan
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Evalúa cada acción por separado.
Paso 1 · Reducir el gasto energético disminuye emisiones asociadas a la generación de electricidad.
Paso 2 · Reducir y reciclar basura disminuye la contaminación de suelos y la necesidad de nuevos recursos.
Paso 3 · No quemar en San Juan evita la contaminación del aire por quema de leña/llantas, una práctica muy señalada en la educación ambiental boliviana.
Respuesta: D.

---

## Pregunta 23
area: biologia
tema: piramide-biomasa-niveles-troficos
dificultad: medio

En una cadena trófica la menor cantidad de biomasa es producida por:

- A) Consumidores primarios
- B) Consumidores secundarios
- C) Consumidores terciarios
- D) Todas
- E) Ninguna

**respuesta:** C
**explicacion:** En la pirámide de biomasa, la energía y la biomasa disponible disminuyen en cada nivel trófico superior (regla del 10%).
Paso 1 · Los productores tienen la mayor biomasa, seguidos por consumidores primarios, luego secundarios, y por último los terciarios en la cima de la pirámide.
Paso 2 · Los consumidores terciarios, al estar en el nivel más alto, tienen la menor biomasa de la cadena.
Respuesta: C.

---

## Pregunta 24
area: biologia
tema: autotrofos-definicion
dificultad: facil

Organismos que producen o sintetizan su propia materia orgánica a partir de sustancias inorgánicas se denominan:

- A) Autótrofos
- B) Heterótrofos
- C) Simbiosis
- D) Todas
- E) Ninguna

**respuesta:** A
**explicacion:** Definición directa del término.
Paso 1 · Los autótrofos (como las plantas, mediante fotosíntesis) sintetizan su propia materia orgánica a partir de sustancias inorgánicas.
Respuesta: A.

---

## Pregunta 25
area: biologia
tema: biomas-bolivia-reservorio-agua
dificultad: dificil

Considerado uno de los biomas más importantes de Bolivia y el mundo por estar formado por reservorios de agua:

- A) Taiga
- B) Sabana
- C) Tundra
- D) Todas
- E) Ninguna

**respuesta:** E
**explicacion:** Ninguno de los biomas listados se caracteriza por ser un reservorio de agua boliviano.
Paso 1 · La Taiga es un bosque de coníferas de climas fríos, la Sabana es un pastizal tropical y la Tundra es una llanura fría sin árboles: ninguno describe un "reservorio de agua".
Paso 2 · El bioma boliviano típicamente asociado a reservorios de agua serían los humedales/bofedales andinos o la Amazonía, que no figuran entre las opciones dadas.
Respuesta: E.

---

## Pregunta 26
area: biologia
tema: nicho-ecologico-definicion
dificultad: medio

El concepto de nicho ecológico se refiere a:

- A) Lugar que ocupa una determinada especie
- B) Conjunto de organismos de un ecosistema
- C) Papel funcional que desempeña una especie en una comunidad
- D) Todas
- E) Ninguna

**respuesta:** C
**explicacion:** Distingue nicho ecológico de hábitat.
Paso 1 · (a) describe en realidad el concepto de hábitat ("dirección" de la especie), no el de nicho.
Paso 2 · El nicho ecológico es el papel funcional o "profesión" que una especie desempeña dentro de su comunidad (qué come, cómo interactúa, qué recursos usa).
Respuesta: C.

---

## Pregunta 27
area: biologia
tema: cadena-trofica-componentes
dificultad: facil

Las cadenas tróficas están formadas por:

- A) Productores
- B) Consumidores
- C) Descomponedores
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Los tres son los componentes clásicos de toda cadena trófica.
Paso 1 · Productores (organismos autótrofos), consumidores (herbívoros, carnívoros, omnívoros) y descomponedores (bacterias, hongos) forman en conjunto la cadena trófica completa.
Respuesta: D.

---

## Pregunta 28
area: biologia
tema: contaminacion-acustica-limite-oms
dificultad: dificil

El límite de tolerancia de una emisión acústica recomendada por la OMS es de:

- A) 80 dB-A que produce una moto
- B) 65 dB-A un ambiente tranquilo
- C) 140 dB-A las bocinas de los autos
- D) Todas
- E) Ninguna

**respuesta:** C
**explicacion:** Compara cada valor con las guías reales de la OMS.
Paso 1 · Un ambiente "tranquilo" ronda los 30-50 dB, no 65 dB (b es poco preciso).
Paso 2 · Una moto emite típicamente entre 85-100 dB, no exactamente 80 dB de forma estándar (a es aproximado pero impreciso).
Paso 3 · La OMS (Guidelines for Community Noise, 1999) recomienda que el nivel de presión sonora pico, para ruidos de impulso, no exceda los 140 dB en adultos: este es el valor de tolerancia límite oficialmente citado, coincidiendo con la opción (c).
Respuesta: C.

---

## Pregunta 29
area: biologia
tema: nivel-trofico-definicion
dificultad: facil

La posición de los organismos en la cadena alimenticia se denomina:

- A) Nicho ecológico
- B) Nivel trófico
- C) Hábitat
- D) Todas
- E) Ninguna

**respuesta:** B
**explicacion:** Distingue nivel trófico de nicho ecológico y hábitat.
Paso 1 · El nivel trófico es específicamente la posición que ocupa un organismo en la cadena alimenticia (productor, consumidor primario, secundario, etc.).
Paso 2 · El nicho ecológico es el rol funcional, y el hábitat es el lugar físico: ninguno de los dos es "posición en la cadena alimenticia".
Respuesta: B.

---

## Pregunta 30
area: biologia
tema: erosion-eolica
dificultad: facil

La erosión eólica es producida por:

- A) El agua
- B) El viento
- C) La combinación del agua y el viento
- D) Todas
- E) Ninguna

**respuesta:** B
**explicacion:** Definición directa del término.
Paso 1 · "Eólica" proviene de Eolo, dios griego del viento; la erosión eólica es, por definición, la producida por la acción del viento.
Respuesta: B.

---
