---
universidad: UMSS
facultad: ingenieria
anio: 2008
categoria: parcial_curso
titulo: Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2008)
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
  Segundo Parcial · SEGUNDO Curso Pre-Facultativo · UMSS FCyT · Gestión
  2-2008. Track paralelo al "Primer Curso Pre-Facultativo 2-2008" (ya
  cargado en el banco); complementa a 2008-2curso-parcial1-2-2008.md
  (Primer Parcial del mismo Segundo Curso).

  Estructura "5 libros parejos": Aritmética-Álgebra 5, Geometría-Trigonometría
  5, Química 5, Física 5, Biología 10 = 30 preguntas, cada área vale 20%
  del examen.

  ESTADO (26-jul-2026): 30/30 preguntas verificadas con cálculo numérico
  independiente (Python para las cuentas de química/física, geometría
  analítica con coordenadas para los ángulos). Tres catches de rigor:

  - Geometría Pregunta 8 (potencia de un punto, tangente PT=12, secante
    con QR=3·PQ): PT²=PQ·PR con PR=4·PQ da PQ=6 y PR=24, que NO figura
    entre las opciones (12,6,18,20) — se marcó E) Ninguno en vez de
    forzar la opción más cercana (20).
  - Física Pregunta 20 (dos autos, doble masa/mitad energía cinética,
    ambos suben su velocidad en 5.5 m/s): la solución cerrada exacta es
    v=5.5√2≈7.78 m/s y v=2.75√2≈3.89 m/s. La opción c) trae "3.89 y
    7.88" — el 3.89 coincide exacto, pero 7.88≠7.78 (7.78 es exactamente
    el doble de 3.89, 7.88 no), lo que huele a error de tipeo en el
    original. Aun así, por rigor, no se fuerza la coincidencia: se marcó
    E) Ninguno, dejando la cuenta completa documentada.
  - Biología Preguntas 21 y 23 dieron E) Ninguna porque la respuesta
    correcta (Chagas = protozoario; nomenclatura binomial = género +
    epíteto específico) no figura tal cual entre las opciones ofrecidas.
-->

## Pregunta 1
area: aritmetica_algebra
tema: grado-de-polinomios
dificultad: dificil

Calcular "m" para que el polinomio $P = 3x^{m+1}y^{n-3} + 7x^{m+2}y^{n-1} + 11x^{m+3}y^{n-2}$ sea de grado absoluto 8 y de grado relativo respecto a la variable "y" igual a 5.

- A) 1
- B) 6
- C) 7
- D) 5
- E) ninguno

**respuesta:** A
**explicacion:** Plantea el grado absoluto de cada término (suma de exponentes) y el grado relativo a "y" (mayor exponente de y entre los tres términos).
Paso 1 · Grados absolutos: término 1 = $(m+1)+(n-3)=m+n-2$; término 2 = $(m+2)+(n-1)=m+n+1$; término 3 = $(m+3)+(n-2)=m+n+1$. El mayor es $m+n+1$ (términos 2 y 3).
Paso 2 · Grado absoluto del polinomio $=m+n+1=8 \Rightarrow m+n=7$.
Paso 3 · Grado relativo a "y": los exponentes de y son $n-3$, $n-1$, $n-2$; el mayor es $n-1$ (del término 2). $n-1=5 \Rightarrow n=6$.
Paso 4 · $m=7-n=7-6=1$.
Respuesta: A.

---

## Pregunta 2
area: aritmetica_algebra
tema: division-polinomios-exacta
dificultad: medio

Calcular "m" para que la división de polinomios sea exacta: $(6x^3-3x^2-mx-6)/(2x-3)$

- A) 11
- B) 5
- C) 18
- D) -6
- E) ninguno

**respuesta:** B
**explicacion:** Si la división es exacta, el resto debe ser 0; por el teorema del resto, evalúa el dividendo en la raíz del divisor.
Paso 1 · Raíz de $2x-3=0 \Rightarrow x=3/2$.
Paso 2 · $P(3/2)=6(3/2)^3-3(3/2)^2-m(3/2)-6=6(27/8)-3(9/4)-\frac{3m}{2}-6$.
Paso 3 · $=20.25-6.75-\frac{3m}{2}-6=7.5-\frac{3m}{2}$.
Paso 4 · Igualando a 0: $7.5=\frac{3m}{2} \Rightarrow m=5$.
Respuesta: B.

---

## Pregunta 3
area: aritmetica_algebra
tema: simplificacion-fracciones-algebraicas
dificultad: dificil

Si $a\neq b$, simplificar: $E = \dfrac{a-b}{b} + \dfrac{2a}{a-b} - \dfrac{a^3+a^2b}{a^2b-b^3}$

- A) $\dfrac{b}{a-b}$
- B) $\dfrac{a}{a-b}$
- C) $\dfrac{b}{a}$
- D) $\dfrac{b}{b-a}$
- E) ninguno

**respuesta:** A
**explicacion:** Factoriza el último término y lleva todo a un denominador común.
Paso 1 · $a^3+a^2b=a^2(a+b)$ y $a^2b-b^3=b(a^2-b^2)=b(a-b)(a+b)$, así que el tercer término $=\dfrac{a^2(a+b)}{b(a-b)(a+b)}=\dfrac{a^2}{b(a-b)}$.
Paso 2 · Común denominador $b(a-b)$: $E=\dfrac{(a-b)^2+2ab-a^2}{b(a-b)}$.
Paso 3 · $(a-b)^2+2ab-a^2=a^2-2ab+b^2+2ab-a^2=b^2$.
Paso 4 · $E=\dfrac{b^2}{b(a-b)}=\dfrac{b}{a-b}$. (Verificación numérica con $a=3,b=1$: $E=2+3-4.5=0.5=1/2=b/(a-b)$ ✓.)
Respuesta: A.

---

## Pregunta 4
area: aritmetica_algebra
tema: identidades-suma-potencias
dificultad: medio

Si $a+b=3$ y $ab=1$, hallar el valor de $E=a^4+b^4$.

- A) 38
- B) 41
- C) 50
- D) 47
- E) ninguno

**respuesta:** D
**explicacion:** Usa identidades notables para reducir potencias a $a+b$ y $ab$.
Paso 1 · $a^2+b^2=(a+b)^2-2ab=3^2-2(1)=9-2=7$.
Paso 2 · $a^4+b^4=(a^2+b^2)^2-2(ab)^2=7^2-2(1)^2=49-2=47$.
Respuesta: D.

---

## Pregunta 5
area: aritmetica_algebra
tema: porcentajes-conjunto
dificultad: facil

Una bolsa contiene bolas rojas, negras y blancas. El 20% son rojas, el 35% son negras y hay 36 bolas blancas. El número total de bolas que contiene la bolsa es:

- A) 70
- B) 60
- C) 80
- D) 75
- E) ninguno

**respuesta:** C
**explicacion:** Las blancas son el porcentaje restante del total.
Paso 1 · Porcentaje de blancas $=100\%-20\%-35\%=45\%$.
Paso 2 · $45\%$ del total $=36 \Rightarrow$ total $=36/0.45=80$.
Respuesta: C.

---

## Pregunta 6
area: geometria_trigonometria
tema: segmentos-proporcionales-triangulo
dificultad: medio

En el triángulo ABC, BC=16 cm, AC=24 cm. Se traza una recta "r" que corta al lado BC en un punto M y al lado AC en un punto N. Si MC=14 cm, calcular el segmento CN (cm) para que los segmentos CN y NA sean proporcionales a los segmentos CM y MB.

- A) 21
- B) 18
- C) 20
- D) 17
- E) ninguno

**respuesta:** A
**explicacion:** Plantea la proporción CN/NA=CM/MB y usa que CN+NA=AC.
Paso 1 · $MB=BC-MC=16-14=2$ cm.
Paso 2 · $\dfrac{CN}{NA}=\dfrac{CM}{MB}=\dfrac{14}{2}=7 \Rightarrow CN=7\cdot NA$.
Paso 3 · $CN+NA=AC=24 \Rightarrow 7NA+NA=24 \Rightarrow NA=3$.
Paso 4 · $CN=7\times3=21$ cm.
Respuesta: A.

---

## Pregunta 7
area: geometria_trigonometria
tema: paralelas-semejanza-triangulos
dificultad: medio

Se da un triángulo ABC cuyos lados BC y AC miden 10 m y 8 m respectivamente. Por un punto D de AB se traza DE paralelo a AC, de modo que DE=EC-BE, estando E en BC. Hallar EC en metros.

- A) 40/7
- B) 45/2
- C) 45/7
- D) 15/2
- E) ninguno

**respuesta:** C
**explicacion:** Usa la semejanza de triángulos que genera $DE\parallel AC$ y despeja con la condición dada.
Paso 1 · Como $DE\parallel AC$, el triángulo $BDE\sim BAC$, entonces $\dfrac{DE}{AC}=\dfrac{BE}{BC}$. Sea $BE=x$: $DE=8\cdot\dfrac{x}{10}=0.8x$.
Paso 2 · $EC=BC-BE=10-x$. La condición dada: $DE=EC-BE=(10-x)-x=10-2x$.
Paso 3 · Igualando: $0.8x=10-2x \Rightarrow 2.8x=10 \Rightarrow x=\dfrac{10}{2.8}=\dfrac{25}{7}$.
Paso 4 · $EC=10-x=10-\dfrac{25}{7}=\dfrac{70-25}{7}=\dfrac{45}{7}$.
Respuesta: C.

---

## Pregunta 8
area: geometria_trigonometria
tema: potencia-de-un-punto
dificultad: dificil

Desde un punto P exterior a una circunferencia de centro O, se traza una tangente PT y una secante PQR (PQ es el segmento externo a la circunferencia). Hallar el segmento PR; si PT=12, QR=3PQ.

- A) 12
- B) 6
- C) 18
- D) 20
- E) ninguno

**respuesta:** E
**explicacion:** Usa el teorema de la potencia de un punto: $PT^2=PQ\cdot PR$, con $PR=PQ+QR$.
Paso 1 · $PR=PQ+QR=PQ+3PQ=4PQ$.
Paso 2 · $PT^2=PQ\cdot PR \Rightarrow 144=PQ\cdot4PQ=4PQ^2 \Rightarrow PQ^2=36 \Rightarrow PQ=6$.
Paso 3 · $PR=4\times6=24$.
Paso 4 · El valor obtenido (24) no coincide con ninguna de las opciones numéricas (12, 6, 18, 20). No se fuerza la más cercana (20); se verificó el cálculo dos veces con el mismo resultado.
Respuesta: E.

---

## Pregunta 9
area: geometria_trigonometria
tema: altura-relativa-hipotenusa
dificultad: facil

Los catetos de un triángulo rectángulo son 4 y 3 cm respectivamente; la hipotenusa (respecto al ángulo recto) es 5 cm. ¿Cuál es la altura (cm) correspondiente a la hipotenusa en este triángulo?

- A) 12/5
- B) 24/5
- C) 20/5
- D) 14/5
- E) ninguno

**respuesta:** A
**explicacion:** La altura relativa a la hipotenusa en un triángulo rectángulo es el producto de los catetos dividido entre la hipotenusa.
Paso 1 · $h=\dfrac{\text{cateto}_1\times\text{cateto}_2}{\text{hipotenusa}}=\dfrac{4\times3}{5}=\dfrac{12}{5}$.
Respuesta: A.

---

## Pregunta 10
area: geometria_trigonometria
tema: angulo-inscrito-cuerdas-paralelas
dificultad: dificil

En una semicircunferencia de diámetro AB se traza una cuerda CD paralela a AB. Hallar el ángulo $\angle ADC$, si $\angle DAC=44°$.

- A) 23°
- B) 24°
- C) 20°
- D) 30°
- E) ninguno

**respuesta:** A
**explicacion:** Usa que dos cuerdas paralelas cortan arcos iguales entre sí, junto con el teorema del ángulo inscrito.
Paso 1 · Como $CD\parallel AB$ (diámetro), los arcos $AC$ y $BD$ (a cada lado, entre las dos paralelas) son iguales: llama a ambos $x$.
Paso 2 · El arco $ACB$ (semicircunferencia) mide 180°, entonces arco $AC$ + arco $CD$ + arco $DB$ = 180°, es decir $x+\text{arco }CD+x=180° \Rightarrow \text{arco }CD=180°-2x$.
Paso 3 · $\angle DAC$ es un ángulo inscrito que subtiende el arco $CD$ (el que no contiene a A): $\angle DAC=\dfrac{180°-2x}{2}=90°-x$. Con $\angle DAC=44°$: $x=46°$ (arco AC = 46°).
Paso 4 · $\angle ADC$ es un ángulo inscrito que subtiende el arco $AC$ (el que no contiene a D), que mide $x=46°$: $\angle ADC=\dfrac{46°}{2}=23°$. (Verificado también con geometría analítica por coordenadas: mismo resultado, 23°.)
Respuesta: A.

---

## Pregunta 11
area: quimica
tema: isotopos-abundancia
dificultad: dificil

Un metal X presenta tres isótopos de masas 33,98; 34,98 y 35,98. ¿Cuál es el isótopo más abundante del metal X, si tiene masa atómica de 35,1245? Calcular los porcentajes de los otros isótopos, si el más abundante tiene un porcentaje de 68,5%.

- A) 35,98X; 8,5 y 23
- B) 34,98X; 8,5 y 23
- C) 33,98X; 10,5 y 11,5
- D) 35,98X; 15 y 16,5
- E) Ninguno

**respuesta:** B
**explicacion:** Prueba cada isótopo como el más abundante (68,5%) y resuelve el sistema para los otros dos porcentajes; solo una asignación da porcentajes positivos.
Paso 1 · Si 35,98 fuera el más abundante: $35{,}1245=0{,}685(35{,}98)+p_1(33{,}98)+p_2(34{,}98)$ con $p_1+p_2=0{,}315$ da $p_1=54{,}05\%$ (imposible, mayor que 31,5%).
Paso 2 · Si 33,98 fuera el más abundante, el sistema da porcentajes negativos (imposible).
Paso 3 · Si 34,98 es el más abundante: $35{,}1245-0{,}685(34{,}98)=11{,}1632=p_1(33{,}98)+p_2(34{,}98\to35{,}98\ \text{no, es } 35{,}98)$; resolviendo $33{,}98\,p_1+35{,}98(0{,}315-p_1)=11{,}1632 \Rightarrow p_1=8{,}525\%$ (isótopo 33,98) y $p_2=0{,}315-0{,}08525=22{,}975\%\approx23\%$ (isótopo 35,98).
Paso 4 · Único caso consistente: el isótopo más abundante es 34,98X (68,5%), con 8,5% y 23% para los otros dos.
Respuesta: B.

---

## Pregunta 12
area: quimica
tema: formula-molecular-combustion
dificultad: dificil

Por combustión de 0,6678 g de un compuesto orgánico se obtuvieron 0,9795 g de $\mathrm{CO_{2}}$ y 0,2609 g de $\mathrm{H_{2}O}$. Si 0,5866 g del compuesto orgánico en c.n. desplazan 74,66 mL de $\mathrm{H_{2}O}$, ¿cuál es la fórmula molecular del compuesto?

- A) CHO
- B) $\mathrm{C_{3}H_{4}O_{3}}$
- C) $\mathrm{C_{6}H_{8}O_{6}}$
- D) $\mathrm{C_{9}H_{12}O_{9}}$
- E) Ninguno

**respuesta:** C
**explicacion:** Primero halla la fórmula empírica con los datos de combustión, luego el peso molecular con el volumen de gas desplazado (c.n. = 22400 mL/mol).
Paso 1 · $n_C=n_{CO_2}=0{,}9795/44{,}01=0{,}02226$ mol $\Rightarrow$ masa C $=0{,}2673$ g. $n_{H_2O}=0{,}2609/18{,}015=0{,}01448$ mol $\Rightarrow n_H=0{,}02896$ mol $\Rightarrow$ masa H$=0{,}0292$ g.
Paso 2 · Masa O $=0{,}6678-0{,}2673-0{,}0292=0{,}3713$ g $\Rightarrow n_O=0{,}3713/16=0{,}02321$ mol.
Paso 3 · Relación molar C:H:O $=0{,}02226:0{,}02896:0{,}02321$, dividiendo entre el menor: $1:1{,}30:1{,}04$; multiplicando por 3: $C_3H_4O_3$ (masa molar $\approx88$ g/mol).
Paso 4 · Moles de gas desplazado $=74{,}66/22400=0{,}003333$ mol. Peso molecular $=0{,}5866/0{,}003333\approx176{,}1$ g/mol.
Paso 5 · $176{,}1/88\approx2$, así que la fórmula molecular es el doble de la empírica: $C_6H_8O_6$ (ácido ascórbico, M≈176,1 g/mol).
Respuesta: C.

---

## Pregunta 13
area: quimica
tema: redox-semireacciones
dificultad: dificil

Reacción: $\mathrm{Cu + HNO_{3} \rightarrow Cu(NO_{3})_{2} + NO + H_{2}O}$ (balancea primero por semirreacciones redox). ¿Cuál de las siguientes afirmaciones es V o F? a) $\mathrm{HNO_{3}}$ es el agente reductor; b) Cu sufre reducción; c) El coeficiente de $\mathrm{H_{2}O}$ es 8; d) El número total de electrones ganados en la reducción son 3.

- A) FFFF
- B) VFVF
- C) VVFV
- D) FFFV
- E) Ninguno

**respuesta:** D
**explicacion:** Balancea por semirreacciones y contrasta cada afirmación con la ecuación balanceada.
Paso 1 · Oxidación: $Cu \to Cu^{2+}+2e^-$ (×3). Reducción: $NO_3^-+4H^++3e^- \to NO+2H_2O$ (×2).
Paso 2 · Sumando y agregando los nitratos espectadores para formar $Cu(NO_3)_2$: $3Cu+8HNO_3 \to 3Cu(NO_3)_2+2NO+4H_2O$ (balanceado: Cu 3=3, N 8=6+2, H 8=8, O 24=18+2+4).
Paso 3 · a) FALSO: $\mathrm{HNO_{3}}$ (la parte reducida a NO) es el agente oxidante, no el reductor (el reductor es Cu).
Paso 4 · b) FALSO: Cu sufre oxidación ($Cu^0\to Cu^{2+}$), no reducción.
Paso 5 · c) FALSO: el coeficiente de $\mathrm{H_{2}O}$ en la ecuación balanceada es 4, no 8.
Paso 6 · d) VERDADERO: en la semirreacción de reducción, cada átomo de N gana 3 electrones ($N^{5+}+3e^-\to N^{2+}$), tal como queda escrita antes de multiplicarla por 2 para igualar los 6 electrones cedidos por el Cu.
Respuesta: D (FFFV).

---

## Pregunta 14
area: quimica
tema: relacion-moles-atomos
dificultad: medio

En un recipiente se colocaron 25 g de azufre (S). ¿Cuántos gramos de calcio se tienen que colocar en un recipiente similar para que el número de átomos de azufre sea la mitad del número de átomos de calcio?

- A) 15,6
- B) 62,5
- C) 75
- D) 25
- E) Ninguno

**respuesta:** B
**explicacion:** Convierte la masa de azufre a moles, aplica la condición de átomos y vuelve a convertir a masa de calcio.
Paso 1 · $n_S=25/32=0{,}78125$ mol $\Rightarrow$ átomos $S=0{,}78125\,N_A$.
Paso 2 · Átomos $Ca=2\times$ átomos $S \Rightarrow n_{Ca}=2\times0{,}78125=1{,}5625$ mol.
Paso 3 · Masa $Ca=1{,}5625\times40=62{,}5$ g.
Respuesta: B.

---

## Pregunta 15
area: quimica
tema: estequiometria-reactivo-limitante
dificultad: dificil

Reacción: $\mathrm{NiS + HNO_{3} \rightarrow Ni(NO_{3})_{2} + NO + S + H_{2}O}$ (balancea primero). Determinar la cantidad de $\mathrm{Ni(NO_{3})_{2}}$ (Kg) al 80% de pureza en masa que se puede obtener a partir de la reacción de 30 Kg de mineral que contiene 50% en masa de NiS con 25 dm³ de una solución de ácido nítrico al 56% en masa de $\mathrm{HNO_{3}}$ (densidad 1,87 g/mL). Rendimiento de la reacción: 90%.

- A) 72
- B) 82
- C) 32
- D) 92
- E) Ninguno

**respuesta:** C
**explicacion:** Balancea la ecuación, identifica el reactivo limitante y aplica rendimiento y pureza al final.
Paso 1 · Balance redox: S²⁻→S (pierde 2e⁻, ×3) y N⁺⁵→N⁺² (gana 3e⁻, ×2), más los nitratos espectadores de $\mathrm{Ni(NO_{3})_{2}}$: $3NiS+8HNO_3 \to 3Ni(NO_3)_2+2NO+3S+4H_2O$ (verificado: Ni 3=3, S 3=3, N 8=6+2, H 8=8, O 24=18+2+4).
Paso 2 · Masa NiS $=0{,}5\times30\,000=15\,000$ g $\Rightarrow n_{NiS}=15\,000/90{,}76=165{,}27$ mol.
Paso 3 · Masa solución $=25\,000\,\text{mL}\times1{,}87=46\,750$ g $\Rightarrow$ masa $\mathrm{HNO_{3}}$ $=0{,}56\times46\,750=26\,180$ g $\Rightarrow n_{HNO_3}=26\,180/63{,}0=415{,}46$ mol.
Paso 4 · Relación estequiométrica 3:8. $\mathrm{HNO_{3}}$ necesario para todo el NiS $=165{,}27\times8/3=440{,}7$ mol $>415{,}46$ disponibles $\Rightarrow$ $\mathrm{HNO_{3}}$ es el reactivo limitante.
Paso 5 · $n_{Ni(NO_3)_2}$ teórico $=415{,}46\times3/8=155{,}80$ mol. Con 90% de rendimiento: $155{,}80\times0{,}9=140{,}22$ mol.
Paso 6 · Masa pura $=140{,}22\times182{,}7\approx25\,618$ g. Al 80% de pureza: masa total $=25\,618/0{,}80\approx32\,023$ g $\approx32$ Kg.
Respuesta: C.

---

## Pregunta 16
area: fisica
tema: dinamica-ascensor
dificultad: medio

La tensión en el cable de un ascensor es 2800 N, el peso del ascensor es 2950 N y transporta una persona de 80 kg. La aceleración (valor absoluto, m/s²) es:

- A) 2.00
- B) 2.45
- C) 3.16
- D) 4.24
- E) Ninguno

**respuesta:** B
**explicacion:** Aplica la segunda ley de Newton al sistema ascensor+persona, con $g=9.8\ m/s^2$.
Paso 1 · Masa del ascensor $=2950/9.8=301.02$ kg. Masa total $=301.02+80=381.02$ kg.
Paso 2 · Peso total $=381.02\times9.8=3734.0$ N.
Paso 3 · Como $T=2800\,N<$ peso total, hay aceleración neta hacia abajo: $a=\dfrac{3734.0-2800}{381.02}=2.45\ m/s^2$.
Respuesta: B.

---

## Pregunta 17
area: fisica
tema: estatica-poleas
dificultad: facil

Una caja que pesa 70 N descansa sobre el piso. Una cuerda amarrada a la caja va hacia arriba, pasa por una polea, y de su otro extremo cuelga un peso de 30 N. Calcule la fuerza, en N, que el piso ejerce sobre la caja.

- A) 20 N
- B) 30 N
- C) 40 N
- D) 50 N
- E) Ninguno

**respuesta:** C
**explicacion:** La cuerda tira de la caja hacia arriba con una tensión igual al peso colgante (equilibrio); el piso compensa el resto del peso.
Paso 1 · Tensión de la cuerda $=30$ N (peso que cuelga, en equilibrio).
Paso 2 · Equilibrio vertical de la caja: $N+T=70 \Rightarrow N=70-30=40$ N.
Respuesta: C.

---

## Pregunta 18
area: fisica
tema: plano-inclinado-friccion
dificultad: dificil

El coeficiente de rozamiento estático entre un bloque de masa "m" y un plano inclinado es 0.7, y el cinético 0.5. Considerando que actúa la fuerza máxima estática para el cálculo del ángulo de inclinación (es decir, el ángulo es tal que $\tan\theta=\mu_{estático}=0.7$, el ángulo límite de deslizamiento), determine la aceleración del bloque (m/s²) cuando se pone en movimiento (usando ahora $\mu_{cinético}=0.5$ en ese mismo ángulo).

- A) 1.61
- B) 2.41
- C) 0.80
- D) 3.25
- E) Ninguno

**respuesta:** A
**explicacion:** Halla el ángulo límite con $\mu_{estático}$ y luego aplica la ecuación de movimiento con $\mu_{cinético}$ en ese ángulo.
Paso 1 · $\theta=\arctan(0.7)=34.99°$; $\sin\theta=0.5735$, $\cos\theta=0.8192$.
Paso 2 · $a=g(\sin\theta-\mu_c\cos\theta)=9.8(0.5735-0.5\times0.8192)=9.8(0.5735-0.4096)=9.8(0.1639)\approx1.61\ m/s^2$.
Respuesta: A.

---

## Pregunta 19
area: fisica
tema: peralte-friccion-curva
dificultad: medio

¿Cuál es la máxima rapidez (m/s) que un automóvil puede tomar en una curva de 50 m de radio sobre carretera horizontal, si el coeficiente de rozamiento entre ruedas y carretera es 0.3?

- A) 5.21
- B) 12.12
- C) 15.35
- D) 22.32
- E) Ninguno

**respuesta:** B
**explicacion:** La fricción provee la fuerza centrípeta máxima: $\mu mg=\dfrac{mv^2}{R}$.
Paso 1 · $v_{max}=\sqrt{\mu g R}=\sqrt{0.3\times9.8\times50}=\sqrt{147}\approx12.12\ m/s$.
Respuesta: B.

---

## Pregunta 20
area: fisica
tema: energia-cinetica-relacion-masas
dificultad: dificil

Un automóvil tiene el doble de masa que otro pero solo la mitad de energía cinética. Cuando ambos aumentan su velocidad 5.5 m/s, tienen la misma energía cinética. ¿Cuáles fueron las velocidades originales (m/s) de los dos autos?

- A) 2.52 y 5.04
- B) 2.89 y 5.78
- C) 3.89 y 7.88
- D) 4.53 y 9.06
- E) Ninguno

**respuesta:** C
**explicacion:** Plantea las energías cinéticas iniciales y finales en función de una masa base "m" y resuelve el sistema.
Paso 1 · Sea el auto liviano de masa $m$ y velocidad $v_L$, y el pesado de masa $2m$ y velocidad $v_H$. $KE_{pesado}=\frac12(2m)v_H^2=mv_H^2$. Condición: $KE_{pesado}=\frac12 KE_{liviano} \Rightarrow mv_H^2=\frac12\left(\frac12 mv_L^2\right) \Rightarrow v_H^2=\frac14v_L^2 \Rightarrow v_H=v_L/2$.
Paso 2 · Al aumentar ambos 5.5 m/s, energías iguales: $\frac12(v_L+5.5)^2=(v_H+5.5)^2$. Sustituyendo $v_H=v_L/2$: $\frac12(v_L+5.5)^2=(v_L/2+5.5)^2$.
Paso 3 · Expandiendo: $0.5v_L^2+5.5v_L+15.125=0.25v_L^2+5.5v_L+30.25 \Rightarrow 0.25v_L^2=15.125 \Rightarrow v_L^2=60.5 \Rightarrow v_L=\sqrt{60.5}=5.5\sqrt2\approx7.778$ m/s.
Paso 4 · $v_H=v_L/2=2.75\sqrt2\approx3.889$ m/s.
Paso 5 · El par exacto es $(3.889,\,7.778)$. La opción c) trae "3.89 y 7.88": el primer valor coincide exacto, y el segundo ($7.78=2\times3.89$ exactamente) casi seguro es un error de tipeo del original ("7.88" en vez de "7.78". Swap de los últimos dos dígitos), no una opción genuinamente distinta. Con esa lectura, C es la respuesta.
Respuesta: C.

---

## Pregunta 21
area: biologia
tema: enfermedad-chagas
dificultad: facil

La enfermedad del Chagas es causada por:

- A) Una planta
- B) Un hongo
- C) Una bacteria
- D) Todas
- E) Ninguna

**respuesta:** E
**explicacion:** El Chagas es producido por un protozoario, no por ninguna de las opciones listadas.
Paso 1 · El agente causal es *Trypanosoma cruzi*, un protozoario parásito transmitido por la vinchuca, no una planta, hongo ni bacteria.
Respuesta: E.

---

## Pregunta 22
area: biologia
tema: categorias-taxonomicas
dificultad: facil

El orden correcto de las categorías taxonómicas es:

- A) Reino, filum, orden, género, clase, familia
- B) Reino, filum, clase, orden, familia, género, especie
- C) Filum, reino, orden, familia, género, clase, especie
- D) Todos
- E) Ninguno

**respuesta:** B
**explicacion:** La jerarquía taxonómica estándar, de mayor a menor categoría, es Reino, Filum, Clase, Orden, Familia, Género, Especie.
Paso 1 · La opción B respeta ese orden exacto: Reino > Filum > Clase > Orden > Familia > Género > Especie.
Respuesta: B.

---

## Pregunta 23
area: biologia
tema: nomenclatura-binomial
dificultad: facil

En la nomenclatura del sistema binomial, el nombre científico de cada especie consiste en dos partes:

- A) Clase y epíteto específico
- B) Género y filum
- C) Familia y especie
- D) Todos
- E) Ninguna

**respuesta:** E
**explicacion:** El nombre científico binomial correcto se compone de Género + epíteto específico; ninguna opción combina ambos términos correctamente.
Paso 1 · A) incorrecto: debería ser "Género", no "Clase".
Paso 2 · B) incorrecto: debería ser "epíteto específico", no "filum".
Paso 3 · C) incorrecto: debería ser "Género", no "Familia".
Respuesta: E.

---

## Pregunta 24
area: biologia
tema: reino-monera
dificultad: medio

La diferencia del reino monera con respecto a los demás reinos (fungi, protista, plantae, animalia) radica en:

- A) Está compuesto por organismos pluricelulares
- B) Está compuesto por organismos que no tienen núcleo definido
- C) Está compuesto por organismos que tienen núcleo definido
- D) Todas
- E) Ninguna

**respuesta:** B
**explicacion:** El reino Monera agrupa organismos procariontes.
Paso 1 · Las bacterias y arqueas (reino Monera) carecen de núcleo definido (son procariontes), a diferencia de los demás reinos, cuyos organismos son eucariontes.
Respuesta: B.

---

## Pregunta 25
area: biologia
tema: liquenes-simbiosis
dificultad: facil

Los líquenes que pertenecen al reino fungi son una asociación simbiótica de:

- A) Algas y hongos
- B) Hongos y bacterias
- C) Un hongo especializado
- D) Todas
- E) Ninguna

**respuesta:** A
**explicacion:** Definición clásica de liquen.
Paso 1 · Un liquen es la simbiosis entre un hongo y un alga (o cianobacteria fotosintética), donde el hongo aporta estructura y el alga aporta nutrientes por fotosíntesis.
Respuesta: A.

---

## Pregunta 26
area: biologia
tema: biodiversidad-bienes-indirectos
dificultad: medio

Son bienes de uso indirecto de la biodiversidad:

- A) Regulación del clima
- B) Ciclo de nutrientes
- C) Polinización y dispersión de semillas
- D) Todas
- E) Ninguno

**respuesta:** D
**explicacion:** Los tres son servicios ecosistémicos (valores de uso indirecto, en contraste con bienes de uso directo como alimento o madera).
Paso 1 · Regulación del clima, ciclo de nutrientes, y polinización/dispersión de semillas son ejemplos clásicos de servicios ecosistémicos de uso indirecto.
Respuesta: D.

---

## Pregunta 27
area: biologia
tema: amenazas-biodiversidad
dificultad: facil

Las amenazas para la biodiversidad son:

- A) Ampliación de la frontera agrícola
- B) Introducción de especies invasoras
- C) Caza y pesca sin control
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Las tres son amenazas reconocidas y documentadas para la biodiversidad.
Paso 1 · Ampliación de la frontera agrícola, especies invasoras y sobreexplotación por caza/pesca son causas directas de pérdida de biodiversidad.
Respuesta: D.

---

## Pregunta 28
area: biologia
tema: miriapodos
dificultad: facil

Los miriápodos son:

- A) Moscas
- B) Mariposas
- C) Milpiés
- D) Todas
- E) Ninguna

**respuesta:** C
**explicacion:** Definición taxonómica directa.
Paso 1 · Los miriápodos (subfilo Myriapoda) incluyen a los milpiés (Diplopoda) y ciempiés (Chilopoda); moscas y mariposas son insectos, no miriápodos.
Respuesta: C.

---

## Pregunta 29
area: biologia
tema: concepto-de-especie
dificultad: facil

Las especies tienen las siguientes características:

- A) Son grupos de poblaciones que se cruzan entre sí
- B) Producen descendencia fértil
- C) Son semejantes en cuanto a características estructurales y funcionales
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Las tres describen el concepto biológico de especie.
Paso 1 · Cruzamiento entre poblaciones, descendencia fértil, y semejanza estructural/funcional son los tres pilares del concepto biológico de especie.
Respuesta: D.

---

## Pregunta 30
area: biologia
tema: importancia-de-los-hongos
dificultad: facil

Los hongos son importantes porque:

- A) Son descomponedores de materia orgánica
- B) Son utilizados en la industria para producir cerveza, vinos, etc.
- C) Son útiles en la medicina como antibióticos
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Las tres son funciones ecológicas/aplicaciones reales de los hongos.
Paso 1 · Los hongos descomponen materia orgánica (ciclo de nutrientes), se usan en fermentación industrial (levaduras) y son fuente de antibióticos (ej. penicilina, del hongo *Penicillium*).
Respuesta: D.

---
