---
universidad: UMSS
facultad: ingenieria
anio: 2008
categoria: parcial_curso
titulo: Primer Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008)
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
  Primer Parcial · SEGUNDO Curso Pre-Facultativo · UMSS FCyT · Gestión
  2-2008. OJO: este es un track DISTINTO del "Primer Curso Pre-Facultativo
  2-2008" (archivos 2008-parcial1-2-2008.md y 2008-parcial2-2-2008.md ya
  cargados en el banco) — la UMSS corrió dos cursos pre-facultativos en
  paralelo esa gestión, con exámenes propios para cada uno. Por eso el
  título dice explícitamente "Segundo Curso" para no confundirlo con el
  otro.

  Estructura "5 libros parejos": Aritmética-Álgebra 5, Geometría-Trigonometría
  5, Química 5, Física 5, Biología 10 = 30 preguntas, cada área vale 20%
  del examen.

  ESTADO (26-jul-2026): 30/30 preguntas verificadas con cálculo numérico
  independiente. Dos catches de rigor en Química (Preguntas 13 y 15):
  la Pregunta 13 pide la frecuencia explícitamente en MHz (no en Hz),
  lo que descarta la opción "obvia" en Hz; la Pregunta 15 depende de
  contar bien cuántos enlaces S=O tiene el sulfato (dos) vs. cuántos
  Si=O tiene el silicato (uno), para no confundir $\mathrm{K_{2}SO_{4}}$ con K2SiO3.
  Las 5 preguntas de Geometría se resolvieron con álgebra/vectores desde
  cero y coinciden con las lecturas ya validadas por Ronald (en particular,
  Pregunta 6: la lectura correcta es CD=4·AC, no AC=CD/4 al revés, que
  deja el problema indeterminado).
-->

## Pregunta 1
area: aritmetica_algebra
tema: numero-divisores-factorizacion
dificultad: facil

El número de divisores de 280 es:

- A) 12
- B) 16
- C) 18
- D) 15
- E) ninguno

**respuesta:** B
**explicacion:** Descomponé en factores primos y aplicá $(e_1+1)(e_2+1)\cdots$ con los exponentes.
Paso 1 · $280=2^3\times5\times7$.
Paso 2 · Nº divisores $=(3+1)(1+1)(1+1)=4\times2\times2=16$.
Respuesta: B.

---

## Pregunta 2
area: aritmetica_algebra
tema: mcm-viajeros
dificultad: medio

Tres viajeros salen de una ciudad A el mismo día y retornan periódicamente: el primero cada 15 días, el segundo cada 24 días, el tercero cada 46 días. ¿Luego de cuántos días volverán a encontrarse simultáneamente los tres en la ciudad A?

- A) 6240
- B) 5148
- C) 7410
- D) 2760
- E) ninguno

**respuesta:** D
**explicacion:** Los tres coinciden de nuevo al cabo del mínimo común múltiplo de sus períodos.
Paso 1 · $15=3\times5$, $24=2^3\times3$, $46=2\times23$.
Paso 2 · $mcm(15,24,46)=2^3\times3\times5\times23=8\times3\times5\times23=2760$.
Respuesta: D.

---

## Pregunta 3
area: aritmetica_algebra
tema: area-costo-adoquines
dificultad: medio

Se compra a 5000 bolivianos el millar de adoquines. ¿Cuánto costará (en Bs) el total de adoquines necesarios para pavimentar una calle rectangular de 60 metros de largo y 8,50 metros de ancho, si cada adoquín cubre 80 cm²?

- A) 315000
- B) 318750
- C) 325000
- D) 341250
- E) ninguno

**respuesta:** B
**explicacion:** Convertí todo a las mismas unidades (cm²) antes de dividir por el área de cada adoquín.
Paso 1 · Área total $=60\times8.5=510\ m^2=5\,100\,000\ cm^2$.
Paso 2 · Nº de adoquines $=5\,100\,000/80=63\,750$.
Paso 3 · Costo $=\frac{63\,750}{1000}\times5000=318\,750$ Bs.
Respuesta: B.

---

## Pregunta 4
area: aritmetica_algebra
tema: regla-tres-compuesta
dificultad: medio

3 hombres trabajando 10 días a 8 horas diarias avanzan 80 metros de una obra. ¿Cuántos días necesitarán 5 hombres, trabajando 6 horas diarias, para avanzar 60 metros de la misma obra?

- A) 6 días
- B) 8 días
- C) 5 días
- D) 10 días
- E) ninguno

**respuesta:** A
**explicacion:** El cociente (hombres×días×horas)/metros es constante para el mismo tipo de obra.
Paso 1 · $\frac{3\times10\times8}{80}=\frac{240}{80}=3$.
Paso 2 · $\frac{5\times d\times6}{60}=\frac{30d}{60}=0.5d$.
Paso 3 · Igualando: $3=0.5d \Rightarrow d=6$.
Respuesta: A.

---

## Pregunta 5
area: aritmetica_algebra
tema: porcentaje-costo-ganancia
dificultad: medio

Un propietario no quiso vender una movilidad cuando le ofrecieron 3000 dólares, con lo cual hubiera ganado el 25% del costo que pagó; pero poco después la vendió a 2760 dólares. ¿Qué porcentaje del costo que pagó ganó el propietario?

- A) 12%
- B) 16%
- C) 15%
- D) 10%
- E) ninguno

**respuesta:** C
**explicacion:** Primero hallá el costo real usando la oferta hipotética, después calculá la ganancia efectiva.
Paso 1 · $3000=C+0.25C=1.25C \Rightarrow C=2400$.
Paso 2 · Ganancia real $=2760-2400=360$.
Paso 3 · $\%=\frac{360}{2400}\times100=15\%$.
Respuesta: C.

---

## Pregunta 6
area: geometria_trigonometria
tema: segmentos-colineales
dificultad: medio

Sobre una recta se tienen los puntos consecutivos A, B y D. Entre B y D se toma un punto C, tal que AC=CD/4 (es decir CD es cuatro veces AC). Determinar BC sabiendo que BD−4·AB=20.

- A) 7
- B) 6
- C) 4
- D) 5
- E) ninguno

**respuesta:** C
**explicacion:** Con C insertado entre B y D, el orden final sobre la recta es A, B, C, D. Expresá todo en función de $AB=a$ y $BC=x$.
Paso 1 · $AC=AB+BC=a+x$. La condición $CD=4\cdot AC$ da $CD=4(a+x)$.
Paso 2 · $BD=BC+CD=x+4(a+x)=4a+5x$.
Paso 3 · $BD-4AB=20 \Rightarrow (4a+5x)-4a=20 \Rightarrow 5x=20 \Rightarrow x=4$.
Paso 4 · El resultado $BC=4$ es independiente del valor de $AB$.
Respuesta: C.

---

## Pregunta 7
area: geometria_trigonometria
tema: poligono-angulo-interior
dificultad: medio

Si a un polígono convexo regular se le aumenta un lado, cada ángulo interior aumenta en 12°. Hallar el número de lados.

- A) 5
- B) 4
- C) 9
- D) 7
- E) ninguno

**respuesta:** A
**explicacion:** El ángulo interior de un polígono regular de $n$ lados es $180-\frac{360}{n}$.
Paso 1 · Aumento del ángulo interior al pasar de $n$ a $n+1$ lados: $\left(180-\frac{360}{n+1}\right)-\left(180-\frac{360}{n}\right)=\frac{360}{n}-\frac{360}{n+1}=12$.
Paso 2 · $360\left(\frac{1}{n}-\frac{1}{n+1}\right)=12 \Rightarrow 360\cdot\frac{1}{n(n+1)}=12 \Rightarrow n(n+1)=30$.
Paso 3 · $n=5$ satisface $5\times6=30$ (la otra raíz de la cuadrática es negativa y se descarta).
Respuesta: A.

---

## Pregunta 8
area: geometria_trigonometria
tema: angulos-adyacentes-bisectrices
dificultad: dificil

La diferencia de los ángulos formados por las bisectrices de dos ángulos adyacentes y el lado común mide 8°. Hallar el complemento del menor de los ángulos adyacentes.

- A) 16°
- B) 41°
- C) 8°
- D) 9°
- E) ninguno

**respuesta:** C
**explicacion:** Dos ángulos adyacentes que comparten el lado común y son suplementarios cumplen $\alpha+\beta=180°$. El ángulo entre cada bisectriz y el lado común es $\alpha/2$ y $\beta/2$ respectivamente.
Paso 1 · $\frac{\alpha}{2}-\frac{\beta}{2}=8° \Rightarrow \alpha-\beta=16°$.
Paso 2 · Con $\alpha+\beta=180°$ y $\alpha-\beta=16°$: sumando, $2\alpha=196° \Rightarrow \alpha=98°$; entonces $\beta=82°$.
Paso 3 · El menor de los ángulos es $82°$. Su complemento $=90°-82°=8°$.
Respuesta: C.

---

## Pregunta 9
area: geometria_trigonometria
tema: romboide-angulo-vectorial
dificultad: dificil

Se tiene un romboide ABCD, en el que AD=2AB. Se toma T, punto medio de BC. Hallar el ángulo ∠ATD.

- A) 60°
- B) 45°
- C) 130°
- D) 90°
- E) ninguno

**respuesta:** D
**explicacion:** Usá vectores con $A=0$, $B=\vec b$, $D=\vec d$ (con $|\vec d|=2|\vec b|$) y $C=\vec b+\vec d$ (propiedad del paralelogramo ABCD).
Paso 1 · $T=$ punto medio de $BC=\left(\vec b+(\vec b+\vec d)\right)/2=\vec b+\vec d/2$.
Paso 2 · $\vec{TA}=-\vec b-\vec d/2$, $\quad\vec{TD}=\vec d/2-\vec b$.
Paso 3 · $\vec{TA}\cdot\vec{TD}=-\vec b\cdot\vec d/2+|\vec b|^2-|\vec d|^2/4+\vec d\cdot\vec b/2=|\vec b|^2-|\vec d|^2/4$.
Paso 4 · Con $|\vec d|=2|\vec b|$: $|\vec d|^2/4=|\vec b|^2$, entonces el producto punto $=0$, para cualquier forma del romboide. Verificado numéricamente con un caso concreto (ángulo del romboide de 60°): el producto punto da cero igual.
Paso 5 · Producto punto nulo $\Rightarrow$ $\angle ATD=90°$.
Respuesta: D.

---

## Pregunta 10
area: geometria_trigonometria
tema: segmentos-punto-medio
dificultad: medio

Sobre una línea recta se tienen los puntos consecutivos A, B, C y D. Si M es punto medio de AB; AC+BC=28. Calcular la longitud del segmento MC.

- A) 12
- B) 8
- C) 14
- D) 10
- E) ninguno

**respuesta:** C
**explicacion:** Con $A=0$, $B=2m$ (así $M=m$), y $BC=x$, $C=2m+x$.
Paso 1 · $AC=2m+x$, $BC=x$. $AC+BC=2m+2x=28 \Rightarrow m+x=14$.
Paso 2 · $MC=C-M=(2m+x)-m=m+x=14$.
Paso 3 · El resultado es independiente de los valores individuales de $m$ y $x$ (verificado con dos casos numéricos distintos que cumplen $m+x=14$).
Respuesta: C.

---

## Pregunta 11
area: quimica
tema: densidad-mezcla-suspension
dificultad: medio

Una suspensión consta de una sustancia y agua; densidad de la suspensión 1,5 g/ml, densidad del agua 1,00 g/ml, densidad de la sustancia 5,00 g/ml. Calcular el porcentaje en peso de la sustancia para una mezcla total de 1 litro de suspensión.

- A) 31,7%
- B) 41,7%
- C) 21,7%
- D) 11,7%
- E) Ninguno

**respuesta:** B
**explicacion:** Usá conservación de masa y de volumen: la masa total sale de la densidad de la suspensión, y los volúmenes de sustancia y agua se suman al volumen total.
Paso 1 · Masa total $=1000\ ml\times1.5\ g/ml=1500\ g$. Sea $x=$ masa de sustancia, $1500-x=$ masa de agua.
Paso 2 · Volumen total: $\frac{x}{5}+\frac{1500-x}{1}=1000$.
Paso 3 · $\frac{x}{5}+1500-x=1000 \Rightarrow -\frac{4x}{5}=-500 \Rightarrow x=625\ g$.
Paso 4 · $\%=\frac{625}{1500}\times100=41.67\%\approx41.7\%$.
Respuesta: B.

---

## Pregunta 12
area: quimica
tema: escala-termometrica-lineal
dificultad: medio

Se diseñó una nueva escala de temperatura basada en el punto de congelación del agua tomado como 0 y la temperatura normal del cuerpo humano (98,5°F) tomada como 12. ¿Cuál es la temperatura del agua hirviente en la nueva escala?

- A) 32,5
- B) 20,5
- C) 38,5
- D) 12,7
- E) Ninguno

**respuesta:** A
**explicacion:** Convertí 98.5°F a Celsius y planteá la proporcionalidad lineal $N=k\cdot C$ (ya que $0°C\to0$ en la nueva escala).
Paso 1 · $C=(98.5-32)\times\frac{5}{9}=66.5\times\frac{5}{9}=36.944°C$.
Paso 2 · $12=k\times36.944 \Rightarrow k=\frac{12}{36.944}=0.3248$.
Paso 3 · Agua hirviente $=100°C$: $N=100\times0.3248=32.48\approx32.5$.
Respuesta: A.

---

## Pregunta 13
area: quimica
tema: frecuencia-longitud-onda
dificultad: medio

Calcular la frecuencia en MHz para una luz que tiene una longitud de onda de 700 nm.

- A) 4,3×10¹⁴
- B) 3,4×10¹¹
- C) 3,4×10¹³
- D) 4,3×10⁸
- E) Ninguno

**respuesta:** D
**explicacion:** Calculá primero la frecuencia en Hz con $\nu=c/\lambda$, y después convertila a MHz (la pregunta pide el resultado explícitamente en MHz, no en Hz).
Paso 1 · $\lambda=700\ nm=7\times10^{-7}\ m$. $\nu=\frac{3\times10^8}{7\times10^{-7}}=4.286\times10^{14}\ Hz$.
Paso 2 · Convertí a MHz dividiendo entre $10^6$: $\nu=\frac{4.286\times10^{14}}{10^6}=4.286\times10^8\ MHz\approx4.3\times10^8\ MHz$.
Paso 3 · La opción A ($4.3\times10^{14}$) es el valor en Hz, no en MHz — es la trampa para quien olvida la conversión de unidades pedida por el enunciado.
Respuesta: D.

---

## Pregunta 14
area: quimica
tema: numeros-cuanticos-iones-transicion
dificultad: dificil

Identificar los cuatro números cuánticos (n,l,m,s) del último electrón de: a) el ion manganeso(III) (Z=25) (↑+1/2); b) el ion cuproso (Z=29) (↑+1/2)

- A) a)3,2,0,+1/2; b)3,2,1,−1/2
- B) a)3,2,1,+1/2; b)3,2,2,−1/2
- C) a)3,2,0,−1/2; b)3,2,0,+1/2
- D) a)3,2,1,−1/2; b)3,1,0,−1/2
- E) Ninguno

**respuesta:** B
**explicacion:** Determiná la configuración electrónica de cada ion (incluyendo la excepción del cobre) y ubicá el orbital y espín del último electrón según Hund.
Paso 1 · Mn (Z=25) neutro: $[Ar]4s^23d^5$. Mn³⁺ pierde primero los 2 electrones de 4s y luego 1 de 3d: $[Ar]3d^4$.
Paso 2 · En $3d^4$, por Hund los 4 electrones ocupan orbitales distintos con spin paralelo ($m=-2,-1,0,+1$ en ese orden): el 4º electrón está en $m=+1$, $s=+1/2 \Rightarrow (3,2,1,+1/2)$.
Paso 3 · Cu (Z=29) neutro tiene configuración anómala $[Ar]4s^13d^{10}$ (por estabilidad del d lleno). Cu⁺ (ion cuproso) pierde el electrón de 4s: $[Ar]3d^{10}$.
Paso 4 · En $3d^{10}$ los 5 orbitales están completos (llenado en $m=-2,-1,0,1,2$ con spin $+1/2$, y luego el segundo paso de apareamiento en el mismo orden con spin $-1/2$); el 10º electrón (el último en aparearse) queda en $m=+2$, $s=-1/2 \Rightarrow (3,2,2,-1/2)$.
Respuesta: B.

---

## Pregunta 15
area: quimica
tema: enlaces-covalente-ionico-lewis
dificultad: dificil

De las siguientes especies, indique la molécula que tiene un enlace covalente doble y dos enlaces iónicos entre sus distintos enlaces.

- A) $\mathrm{CH_{4}}$
- B) $\mathrm{CH_{3}CH_{3}}$
- C) $\mathrm{K_{2}SO_{4}}$
- D) $\mathrm{K_{2}SiO_{3}}$
- E) Ninguno

**respuesta:** D
**explicacion:** Contá los enlaces de la estructura de Lewis de cada especie, distinguiendo enlaces covalentes (dentro del anión) de enlaces iónicos (entre el catión y el anión).
Paso 1 · $\mathrm{CH_{4}}$ y $\mathrm{CH_{3}CH_{3}}$: solo tienen enlaces covalentes simples C-H (y C-C en el segundo caso); no hay enlaces dobles ni iónicos.
Paso 2 · $\mathrm{K_{2}SO_{4}}$: el anión sulfato ($\mathrm{SO_{4}^{2-}}$) se representa habitualmente con **dos** enlaces dobles S=O y dos enlaces simples S-O⁻, más 2 enlaces iónicos K⁺-O⁻. Tiene dos enlaces dobles, no uno solo.
Paso 3 · $\mathrm{K_{2}SiO_{3}}$: el anión metasilicato ($\mathrm{SiO_{3}^{2-}}$) se representa con **un** enlace doble Si=O y dos enlaces simples Si-O⁻ (cada uno con carga -1), y esos dos oxígenos cargados se unen iónicamente a los 2 K⁺. Esto da exactamente 1 enlace covalente doble y 2 enlaces iónicos.
Respuesta: D.

---

## Pregunta 16
area: fisica
tema: velocidad-media-ponderada
dificultad: facil

Un automóvil transita en línea recta con velocidad media de 80 km/h durante 2.5 h y luego 40 km/h durante 1.5 h. La velocidad media del viaje total, en km/h, es:

- A) 60
- B) 62.5
- C) 65
- D) 67.5
- E) Ninguno

**respuesta:** C
**explicacion:** La velocidad media del viaje total es la distancia total dividida entre el tiempo total (no el promedio simple de velocidades).
Paso 1 · $d_1=80\times2.5=200\ km$, $d_2=40\times1.5=60\ km$. Distancia total $=260\ km$.
Paso 2 · Tiempo total $=2.5+1.5=4\ h$.
Paso 3 · $v_{media}=\frac{260}{4}=65\ km/h$.
Respuesta: C.

---

## Pregunta 17
area: fisica
tema: encuentro-mru-opuestos
dificultad: facil

Un carguero viaja a 15 m/s dirección oeste hacia un automóvil que va a 30 m/s dirección este, en carril paralelo, con separación inicial de 500 m. Determine el tiempo, en segundos, para que se entrecrucen.

- A) 11.1
- B) 12.2
- C) 13.3
- D) 14.4
- E) Ninguno

**respuesta:** A
**explicacion:** Cuando dos móviles avanzan uno hacia el otro, la distancia entre ellos se cierra a la suma de sus velocidades.
Paso 1 · Velocidad de acercamiento $=15+30=45\ m/s$.
Paso 2 · $t=\frac{500}{45}=11.11\ s\approx11.1\ s$.
Respuesta: A.

---

## Pregunta 18
area: fisica
tema: frenado-distancia-minima
dificultad: medio

Un avión aterriza con velocidad de 100 m/s y desacelera a 5 m/s² hasta el reposo. La longitud mínima, en m, de la pista que necesita es:

- A) 900
- B) 1000
- C) 1200
- D) 1300
- E) Ninguno

**respuesta:** B
**explicacion:** Usá $v_f^2=v_0^2-2ad$ con $v_f=0$.
Paso 1 · $0=100^2-2(5)d \Rightarrow 10000=10d \Rightarrow d=1000\ m$.
Respuesta: B.

---

## Pregunta 19
area: fisica
tema: tiro-vertical-torre
dificultad: medio

Desde una torre de 110 m de altura se lanza una piedra hacia arriba con rapidez de 30 m/s. Calcule la velocidad, en m/s, con que llega al suelo.

- A) 45.5
- B) 50.5
- C) 55.3
- D) 60.2
- E) Ninguno

**respuesta:** C
**explicacion:** Usá $v^2=v_0^2+2gh$, donde $h=110\ m$ es la caída neta total desde el punto de lanzamiento hasta el suelo (con $g=9.8\ m/s^2$).
Paso 1 · $v^2=30^2+2(9.8)(110)=900+2156=3056$.
Paso 2 · $v=\sqrt{3056}=55.28\ m/s\approx55.3\ m/s$.
Respuesta: C.

---

## Pregunta 20
area: fisica
tema: tiro-parabolico-tiempo-dado
dificultad: dificil

Una pelota se patea a ras del campo y sube lo suficiente para pasar una cerca de 2.8 m de altura a 12 m de distancia, en un tiempo de 0.65 s. La magnitud de la velocidad inicial, en m/s, fue:

- A) 14.4
- B) 19.9
- C) 21.3
- D) 22.3
- E) Ninguno

**respuesta:** B
**explicacion:** Separá el movimiento en sus componentes horizontal (MRU) y vertical (con aceleración $-g$), usando el mismo tiempo $t=0.65\ s$ para ambas.
Paso 1 · Horizontal: $v_{0x}=\frac{12}{0.65}=18.46\ m/s$.
Paso 2 · Vertical: $2.8=v_{0y}(0.65)-\frac12(9.8)(0.65)^2 \Rightarrow 2.8=0.65v_{0y}-2.070 \Rightarrow v_{0y}=\frac{4.870}{0.65}=7.49\ m/s$.
Paso 3 · $v_0=\sqrt{v_{0x}^2+v_{0y}^2}=\sqrt{18.46^2+7.49^2}=\sqrt{340.8+56.1}=\sqrt{396.97}=19.92\approx19.9\ m/s$.
Respuesta: B.

---

## Pregunta 21
area: biologia
tema: purinas-bases-nitrogenadas
dificultad: facil

Las purinas (bases nitrogenadas) son:

- A) Adenina y Timina
- B) Citosina y Timina
- C) Adenina y Guanina
- D) Todas
- E) Ninguna

**respuesta:** c
**explicacion:** Las purinas son las bases nitrogenadas de estructura bicíclica.
Paso 1 · Las purinas son Adenina y Guanina; las pirimidinas son Citosina, Timina y Uracilo.
Respuesta: c.

---

## Pregunta 22
area: biologia
tema: cariotipo-definicion
dificultad: facil

Al conjunto de todos los cromosomas de un individuo ordenados según su forma y tamaño se denomina:

- A) Genoma
- B) Pedigrí
- C) Cariotipo
- D) Todas
- E) Ninguna

**respuesta:** c
**explicacion:** Definición directa del término.
Paso 1 · El cariotipo es la representación ordenada (por forma y tamaño) de la dotación cromosómica completa de un individuo.
Respuesta: c.

---

## Pregunta 23
area: biologia
tema: funciones-lipidos
dificultad: facil

Las funciones de los lípidos son:

- A) Cumplen funciones de regulación hormonal
- B) Forman parte de la estructura de la membrana celular
- C) Son utilizados como 2da fuente de energía celular
- D) Todas
- E) Ninguna

**respuesta:** d
**explicacion:** Evaluá cada afirmación por separado.
Paso 1 · a) Correcto: las hormonas esteroideas (derivadas del colesterol) son lípidos reguladores.
Paso 2 · b) Correcto: los fosfolípidos son el componente estructural principal de la membrana celular.
Paso 3 · c) Correcto: los lípidos son la segunda fuente de energía celular, después de los carbohidratos.
Respuesta: d.

---

## Pregunta 24
area: biologia
tema: biomoleculas-clasificacion
dificultad: facil

Las biomoléculas son:

- A) Ácidos nucleicos
- B) Carbohidratos
- C) Lípidos
- D) Todas
- E) Ninguna

**respuesta:** d
**explicacion:** Las tres son categorías reconocidas de biomoléculas orgánicas.
Paso 1 · Ácidos nucleicos, carbohidratos y lípidos son todos tipos de biomoléculas (junto con las proteínas).
Respuesta: d.

---

## Pregunta 25
area: biologia
tema: proteinas-transporte
dificultad: medio

Las proteínas que cumplen función de transporte son:

- A) Colágeno y queratina
- B) Cromoproteínas
- C) Hemoglobina
- D) Todas
- E) Ninguna

**respuesta:** c
**explicacion:** Compará la función real de cada proteína listada.
Paso 1 · Colágeno y queratina son proteínas estructurales (tejido conectivo, piel/uñas/cabello), no de transporte — descarta a).
Paso 2 · "Cromoproteínas" es una clasificación estructural (proteína + grupo prostético coloreado) que incluye ejemplos con funciones muy diversas (citocromos en la cadena de transporte de electrones, flavoproteínas enzimáticas), no todas de transporte de sustancias — no es la respuesta más precisa.
Paso 3 · La hemoglobina es el ejemplo clásico y preciso de proteína de transporte (de $\mathrm{O_{2}}$ y $\mathrm{CO_{2}}$ en sangre).
Paso 4 · Como a) es falso, "Todas" (d) no puede ser correcta.
Respuesta: c.

---

## Pregunta 26
area: biologia
tema: mendel-segregacion-independiente
dificultad: medio

La ley de la transmisión o segregación independiente de los caracteres indica que las frecuencias son:

- A) 3:1
- B) 1:2:1
- C) 9:3:3:1
- D) Todas
- E) Ninguna

**respuesta:** c
**explicacion:** Distinguí la 1ª ley de Mendel (segregación, monohíbrida) de la 2ª ley (distribución o segregación independiente, dihíbrida).
Paso 1 · 3:1 es la proporción fenotípica monohíbrida (1ª ley); 1:2:1 es la proporción genotípica monohíbrida (1ª ley).
Paso 2 · La ley de la segregación independiente (2ª ley de Mendel) se refiere al cruce dihíbrido, cuya proporción fenotípica característica es 9:3:3:1.
Respuesta: c.

---

## Pregunta 27
area: biologia
tema: carbohidratos-tipos
dificultad: facil

Son ejemplos de carbohidratos:

- A) Monosacáridos
- B) Disacáridos
- C) Polisacáridos
- D) Todas
- E) Ninguna

**respuesta:** d
**explicacion:** Las tres son clasificaciones de carbohidratos según su grado de polimerización.
Paso 1 · Monosacáridos (glucosa), disacáridos (sacarosa) y polisacáridos (almidón, glucógeno, celulosa) son todos tipos de carbohidratos.
Respuesta: d.

---

## Pregunta 28
area: biologia
tema: colageno-proteina-estructural
dificultad: facil

La proteína más abundante encontrada en la piel, tendones, cartílagos es:

- A) Queratina
- B) Colágeno
- C) Fibrinógeno
- D) Todas
- E) Ninguna

**respuesta:** b
**explicacion:** Compará la ubicación característica de cada proteína.
Paso 1 · La queratina se encuentra en piel, uñas y cabello (capa córnea), no en tendones ni cartílagos.
Paso 2 · El fibrinógeno es una proteína plasmática de la coagulación, no estructural de tejido conectivo.
Paso 3 · El colágeno es la proteína más abundante del cuerpo humano y el componente estructural principal de piel, tendones y cartílagos.
Respuesta: b.

---

## Pregunta 29
area: biologia
tema: glucogeno-reserva-animal
dificultad: facil

El polisacárido de reserva en los animales es:

- A) Glucógeno
- B) Quitina
- C) Celulosa
- D) Todas
- E) Ninguna

**respuesta:** a
**explicacion:** Distinguí polisacáridos de reserva de polisacáridos estructurales.
Paso 1 · La quitina es estructural (exoesqueleto de artrópodos, pared celular de hongos); la celulosa es estructural (pared celular vegetal).
Paso 2 · El glucógeno es el polisacárido de reserva energética en animales (almacenado en hígado y músculo).
Respuesta: a.

---

## Pregunta 30
area: biologia
tema: biomoleculas-organicas-composicion
dificultad: facil

En relación a las biomoléculas orgánicas las siguientes premisas son correctas:

- A) Son compuestos de carbono
- B) Están compuestos por C-H-O-N-P-S
- C) Están compuestos por la combinación de bioelementos
- D) Todas
- E) Ninguna

**respuesta:** d
**explicacion:** Evaluá cada afirmación sobre la composición química de las biomoléculas.
Paso 1 · a) Correcto: toda biomolécula orgánica tiene el carbono como elemento base (química orgánica).
Paso 2 · b) Correcto: los bioelementos principales que forman las biomoléculas son C, H, O, N, P y S.
Paso 3 · c) Correcto: las biomoléculas son justamente combinaciones de esos bioelementos.
Respuesta: d.

---
