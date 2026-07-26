---
universidad: UMSS
facultad: ingenieria
anio: 2009
categoria: parcial_curso
titulo: Segundo Parcial · Segundo Curso Pre-Facultativo (Gestión 2-2009)
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
  Segundo Parcial · Segundo Curso Pre-Facultativo · UMSS FCyT ·
  Gestión 2-2009. Aunque el examen se rindió físicamente el 16 y 17 de
  enero de 2010 (Aritmética-Álgebra y Geometría-Trigonometría el sábado,
  Química y Física el domingo), corresponde a la gestión académica
  "2-2009" y por eso el frontmatter usa anio: 2009. Estructura "5 libros
  parejos": Aritmética-Álgebra 5, Geometría-Trigonometría 5, Química 5,
  Física 5, Biología 10 = 30 preguntas, cada área vale 20% del examen.

  ESTADO (26-jul-2026): 30/30 preguntas verificadas con cálculo
  numérico/algebraico completo, sin adivinar ningún resultado. Este
  examen no tiene figuras genuinas (los enunciados de geometría son
  autocontenidos con datos numéricos). Casos resueltos con especial
  cuidado:
  - Aritmética #5 y Geometría #5 (definiciones falsas): se evaluó cada
    alternativa una por una contra la teoría estándar antes de concluir.
  - Geometría #1 (bisectriz con ∠A=2∠C): se demostró la relación
    AB²=BE·BC con ley de senos completa (no se asumió la fórmula sin
    prueba).
  - Química #1 (redox ion-electrón): se balanceó la ecuación completa
    (3NiS+8HNO3→3Ni(NO3)2+2NO+3S+4H2O) y se verificó el balance de
    todos los átomos antes de calcular x.
  - Química #3 (fórmula molecular): se calculó %C, %H, %N desde los
    datos de combustión (suman ~100%, confirmando ausencia de oxígeno)
    antes de derivar la fórmula empírica y escalarla con la masa molar
    de la densidad de vapor.
  - Química #5 (abundancia isotópica): se probaron las 3 asignaciones
    posibles del isótopo mayoritario; solo una da porcentajes positivos
    consistentes con las opciones.
-->

## Pregunta 1
area: aritmetica_algebra
tema: grado-relativo-monomio
dificultad: dificil

Sea el monomio $M=\dfrac{x^n\,y^m\,z^{5n}}{x^{1-m}\,y^{n-3}\,z^{m-2}}$. Si el grado relativo a "x" es 12 y el grado relativo a "y" es 10, hallar el grado relativo a "z".

- A) 12
- B) 7
- C) 14
- D) 21
- E) Ninguno

**respuesta:** B
**explicacion:** Simplificá el monomio restando exponentes de igual base y planteá un sistema con los dos datos.
Paso 1 · Grado en x: $n-(1-m)=n+m-1=12 \Rightarrow n+m=13$.
Paso 2 · Grado en y: $m-(n-3)=m-n+3=10 \Rightarrow m-n=7$.
Paso 3 · Sumando ambas ecuaciones: $2m=20 \Rightarrow m=10$, y entonces $n=3$. (Verificación: $m-n=10-3=7$ ✓.)
Paso 4 · Grado en z $=5n-(m-2)=5n-m+2=5(3)-10+2=15-10+2=7$.
Respuesta: B.

---

## Pregunta 2
area: aritmetica_algebra
tema: grado-absoluto-polinomio
dificultad: dificil

Determinar el grado absoluto del polinomio Q, si el grado absoluto de P es 20 y el mayor exponente de "y" en Q es 10.
$P=3x^{n+7}y^{m-1}+6x^{n+8}y^m+5x^n y^{m+1}$.
$Q=4x^{m+1}y^n+7x^{m+2}y^{n+1}+8x^{m+3}y^{n+2}$.

- A) 54
- B) 63
- C) 21
- D) 17
- E) Ninguno

**respuesta:** D
**explicacion:** El grado absoluto de un polinomio es la mayor suma de exponentes entre todos sus términos.
Paso 1 · Grados de los términos de P: $(n+7)+(m-1)=n+m+6$; $(n+8)+m=n+m+8$; $n+(m+1)=n+m+1$. El mayor es $n+m+8=20 \Rightarrow n+m=12$.
Paso 2 · El mayor exponente de "y" en Q es el del tercer término: $n+2=10 \Rightarrow n=8$, y entonces $m=12-8=4$.
Paso 3 · Grados de los términos de Q: $(m+1)+n=m+n+1=13$; $(m+2)+(n+1)=m+n+3=15$; $(m+3)+(n+2)=m+n+5=17$. El mayor es 17.
Respuesta: D.

---

## Pregunta 3
area: aritmetica_algebra
tema: teorema-del-resto
dificultad: medio

Calcular "m" si el resto de dividir $P(x)=x^3-mx^2+7x-1$ entre $(x-2)$ es igual al triple del resto de dividir $Q(x)=x^2-(m+2)x-11$ entre $(x+2)$.

- A) 3
- B) 12
- C) 6
- D) 9
- E) Ninguno

**respuesta:** A
**explicacion:** Aplicá el teorema del resto: el resto de dividir entre $(x-a)$ es el valor del polinomio en $a$.
Paso 1 · Resto de P entre $(x-2)$: $P(2)=8-4m+14-1=21-4m$.
Paso 2 · Resto de Q entre $(x+2)$: $Q(-2)=4+2(m+2)-11=2m-3$.
Paso 3 · Condición: $21-4m=3(2m-3)=6m-9 \Rightarrow 30=10m \Rightarrow m=3$.
Respuesta: A.

---

## Pregunta 4
area: aritmetica_algebra
tema: sistema-ecuaciones-numeros
dificultad: medio

Expresar 196 como suma de tres números enteros positivos $x+y+z=196$, tales que $y=2x$ y $x+y$ excede a $z$ en 20 unidades ($x+y=z+20$). Hallar $E=y+z$.

- A) 130
- B) 190
- C) 160
- D) 109
- E) Ninguno

**respuesta:** C
**explicacion:** Plantéa el sistema de tres ecuaciones y resolvé por sustitución.
Paso 1 · De $x+y+z=196$ con $y=2x$: $3x+z=196$.
Paso 2 · De $x+y=z+20$ con $y=2x$: $3x=z+20 \Rightarrow z=3x-20$.
Paso 3 · Sustituyendo: $3x+(3x-20)=196 \Rightarrow 6x=216 \Rightarrow x=36$.
Paso 4 · $z=3(36)-20=88$, $y=2(36)=72$. Verificación: $36+72+88=196$ ✓, $36+72=108=88+20$ ✓.
Paso 5 · $E=y+z=72+88=160$.
Respuesta: C.

---

## Pregunta 5
area: aritmetica_algebra
tema: definiciones-algebra
dificultad: medio

Indicar cuál de las siguientes definiciones es FALSA:

- A) Monomio es una expresión algebraica que tiene un solo término algebraico
- B) Polinomio es una expresión algebraica que tiene dos o más términos algebraicos
- C) Polinomio idénticamente nulo es si sus coeficientes son iguales a cero
- D) El grado absoluto de un monomio está dado por la suma de los exponentes de todas sus letras
- E) Ninguno

**respuesta:** E
**explicacion:** Evaluá cada definición contra la teoría estándar de expresiones algebraicas antes de concluir.
Paso 1 · A) es la definición correcta y estándar de monomio.
Paso 2 · B) es la definición correcta y estándar de polinomio.
Paso 3 · C) es correcta: un polinomio es idénticamente nulo si y solo si todos sus coeficientes son cero.
Paso 4 · D) es correcta: el grado absoluto de un monomio es la suma de los exponentes de todas sus variables.
Paso 5 · Las cuatro definiciones son matemáticamente correctas; ninguna es falsa.
Respuesta: E.

---

## Pregunta 6
area: geometria_trigonometria
tema: bisectriz-triangulo-angulo-doble
dificultad: dificil

Triángulo ABC; $\angle A=2\angle C$; se traza la bisectriz interior AE (E sobre BC). Calcular AB, si $BE=4$ cm, $EC=5$ cm.

- A) 8
- B) 9
- C) 7
- D) 6
- E) Ninguno

**respuesta:** D
**explicacion:** Usá la bisectriz para generar un triángulo isósceles auxiliar y después ley de senos.
Paso 1 · Sea $\angle C=\gamma$, entonces $\angle A=2\gamma$ y la bisectriz AE forma $\angle BAE=\angle EAC=\gamma$.
Paso 2 · En el triángulo AEC: $\angle EAC=\gamma=\angle ACE$, por lo tanto es isósceles con $AE=EC=5$.
Paso 3 · El ángulo $\angle AEC=180°-2\gamma$, y su suplementario $\angle AEB=2\gamma$. En el triángulo ABE los ángulos son $\gamma$ (en A), $2\gamma$ (en E) y $180°-3\gamma$ (en B).
Paso 4 · Ley de senos en ABE: $\dfrac{AE}{\sin(180°-3\gamma)}=\dfrac{BE}{\sin\gamma} \Rightarrow \dfrac{5}{\sin3\gamma}=\dfrac{4}{\sin\gamma}$. Usando $\sin3\gamma=3\sin\gamma-4\sin^3\gamma$: $5\sin\gamma=4(3\sin\gamma-4\sin^3\gamma) \Rightarrow 7=16\sin^2\gamma \Rightarrow \cos^2\gamma=9/16 \Rightarrow \cos\gamma=3/4$.
Paso 5 · Ley de senos: $\dfrac{AB}{\sin(2\gamma)}=\dfrac{BE}{\sin\gamma} \Rightarrow AB=BE\cdot\dfrac{2\sin\gamma\cos\gamma}{\sin\gamma}=2\cdot BE\cdot\cos\gamma=2(4)(3/4)=6$.
Paso 6 · Verificación cruzada: $AB^2=BE\cdot BC=4\times9=36 \Rightarrow AB=6$ ✓ (coincide).
Respuesta: D.

---

## Pregunta 7
area: geometria_trigonometria
tema: relaciones-metricas-triangulo-rectangulo
dificultad: facil

Triángulo rectángulo ABC ($\angle B=90°$). Se traza la altura relativa a la hipotenusa BH. El punto H divide la hipotenusa en segmentos de 3 m y 27 m. Hallar BH.

- A) 6
- B) 8
- C) 9
- D) 10
- E) Ninguno

**respuesta:** C
**explicacion:** La altura sobre la hipotenusa es media proporcional entre los dos segmentos que determina.
Paso 1 · $BH^2=3\times27=81$.
Paso 2 · $BH=\sqrt{81}=9$.
Respuesta: C.

---

## Pregunta 8
area: geometria_trigonometria
tema: angulo-inscrito-central
dificultad: medio

OA y OB son radios de una circunferencia de centro O. Sobre el menor arco AB se toma un punto F. El ángulo $\angle AFB$ mide 130°. Hallar la medida del ángulo $\angle AOB$.

- A) 70°
- B) 80°
- C) 75°
- D) 100°
- E) Ninguno

**respuesta:** D
**explicacion:** Un ángulo inscrito equivale a la mitad del arco que no contiene su vértice.
Paso 1 · Como F está en el arco MENOR AB, el ángulo inscrito $\angle AFB$ subtiende el arco MAYOR AB: arco mayor $=2\times130°=260°$.
Paso 2 · Arco menor $=360°-260°=100°$.
Paso 3 · El ángulo central $\angle AOB$ (no reflejo) es igual al arco menor que subtiende: $\angle AOB=100°$.
Respuesta: D.

---

## Pregunta 9
area: geometria_trigonometria
tema: cuadrado-inscrito-triangulo-rectangulo
dificultad: medio

Triángulo rectángulo ABC ($\angle B=90°$), $AB=12$, $BC=4$. Un cuadrado inscrito tiene dos de sus lados sobre los catetos del triángulo (un vértice del cuadrado coincide con B). Hallar el lado del cuadrado.

- A) 4
- B) 3
- C) 6
- D) 5
- E) Ninguno

**respuesta:** B
**explicacion:** Para un cuadrado inscrito con un vértice en el ángulo recto y lados sobre ambos catetos, el lado es la media armónica (dividida entre 2) de los catetos.
Paso 1 · Fórmula: lado $=\dfrac{cateto_1\times cateto_2}{cateto_1+cateto_2}$.
Paso 2 · Lado $=\dfrac{12\times4}{12+4}=\dfrac{48}{16}=3$.
Respuesta: B.

---

## Pregunta 10
area: geometria_trigonometria
tema: definiciones-semejanza
dificultad: dificil

Indicar cuál de las siguientes definiciones es FALSA:

- A) Dos triángulos son semejantes cuando tienen sus dos lados proporcionales
- B) Dos triángulos son semejantes si tienen sus lados respectivamente paralelos o perpendiculares
- C) Dos triángulos rectángulos son semejantes cuando tienen un ángulo agudo igual
- D) Dos triángulos son semejantes cuando tienen un ángulo igual y los lados que lo forman proporcionales
- E) Ninguno

**respuesta:** A
**explicacion:** Compará cada enunciado contra los criterios de semejanza (AA, LAL, LLL) reconocidos en geometría.
Paso 1 · A) afirma que basta con "dos lados proporcionales" para garantizar semejanza, sin exigir el ángulo comprendido igual (criterio LAL) ni el tercer lado (criterio LLL). Dos lados proporcionales por sí solos NO garantizan semejanza: es un enunciado incompleto y por lo tanto FALSO.
Paso 2 · B) es el criterio válido de "lados respectivamente paralelos o perpendiculares" (verdadero).
Paso 3 · C) es el criterio AA aplicado a triángulos rectángulos (verdadero).
Paso 4 · D) es el criterio LAL completo, con ángulo Y lados proporcionales que lo forman (verdadero).
Respuesta: A.

---

## Pregunta 11
area: quimica
tema: redox-ion-electron
dificultad: dificil

Reacción: $NiS + HNO_3 \rightarrow Ni(NO_3)_2 + NO + S + H_2O$ (balanceá por ion-electrón). Hallar $x=\dfrac{\text{coeficiente(sustancia oxidada)}}{\text{coeficiente(agente oxidante)}-\text{coeficiente(agente reductor)}}$.

- A) -3/5
- B) 8/5
- C) 3/5
- D) -8/5
- E) Ninguno

**respuesta:** C
**explicacion:** Balanceá las semirreacciones de oxidación y reducción, igualá electrones y completá la ecuación molecular.
Paso 1 · Oxidación: $S^{2-}\rightarrow S^0+2e^-$ (en NiS). Reducción: $NO_3^-+4H^++3e^-\rightarrow NO+2H_2O$.
Paso 2 · Igualando electrones (mcm=6): oxidación$\times3$ y reducción$\times2$: $3NiS\rightarrow3Ni^{2+}+3S+6e^-$; $2NO_3^-+8H^++6e^-\rightarrow2NO+4H_2O$.
Paso 3 · Sumando y agregando los $NO_3^-$ espectadores que acompañan a $Ni^{2+}$ (6 más, para formar $3\,Ni(NO_3)_2$): ecuación balanceada final: $3NiS+8HNO_3\rightarrow3Ni(NO_3)_2+2NO+3S+4H_2O$ (verificado: Ni 3=3, S 3=3, H 8=8, N 8=6+2, O 24=18+2+4).
Paso 4 · Sustancia oxidada = agente reductor = NiS, coeficiente 3. Agente oxidante = $HNO_3$, coeficiente 8.
Paso 5 · $x=\dfrac{3}{8-3}=\dfrac{3}{5}$.
Respuesta: C.

---

## Pregunta 12
area: quimica
tema: formula-empirica-proteina-metal
dificultad: medio

Una proteína tiene 3 átomos de hierro por molécula y contiene 1.4% en masa de hierro. Calcular la masa molecular de la proteína.

- A) 17000
- B) 12000
- C) 65000
- D) 16000
- E) Ninguno

**respuesta:** B
**explicacion:** El porcentaje en masa relaciona la masa total de Fe en la molécula con la masa molecular total.
Paso 1 · Masa de Fe en la molécula $=3\times56=168$ (usando masa atómica del Fe $\approx56$).
Paso 2 · $0.014\times M=168 \Rightarrow M=\dfrac{168}{0.014}=12\,000$.
Respuesta: B.

---

## Pregunta 13
area: quimica
tema: formula-molecular-combustion
dificultad: dificil

Combustión de 0.3082 g de hexametilenodiamina produjo 0.7003 g de $CO_2$ y 0.3821 g de $H_2O$. Análisis de N: 1.270 g de la muestra dieron 0.3723 g de $NH_3$. Densidad en estado vapor en c.n.=5.19 g/L. Hallar la fórmula molecular.

- A) C3H8N
- B) CHNO
- C) C6H7ON
- D) C6H16N2
- E) Ninguno

**respuesta:** D
**explicacion:** Calculá %C, %H, %N por separado, verificá que sumen ~100% (sin oxígeno), obtené la fórmula empírica y escalala con la masa molar real.
Paso 1 · %C: masa de C en $CO_2$ $=0.7003\times\frac{12.011}{44.01}=0.19112$ g $\Rightarrow \%C=\frac{0.19112}{0.3082}\times100=62.01\%$.
Paso 2 · %H: masa de H en $H_2O$ $=0.3821\times\frac{2.016}{18.015}=0.04276$ g $\Rightarrow \%H=\frac{0.04276}{0.3082}\times100=13.87\%$.
Paso 3 · %N: masa de N en $NH_3$ $=0.3723\times\frac{14.007}{17.031}=0.3063$ g $\Rightarrow \%N=\frac{0.3063}{1.270}\times100=24.12\%$. Suma: $62.01+13.87+24.12\approx100.0\%$, confirma que la molécula es solo C, H, N (sin O).
Paso 4 · Moles por 100 g: C $=62.01/12.011=5.163$; H $=13.87/1.008=13.76$; N $=24.12/14.007=1.722$. Dividiendo entre el menor (1.722): C$\approx3$, H$\approx8$, N$=1$. Fórmula empírica: $C_3H_8N$ (masa $=58.10$).
Paso 5 · Masa molar real $=$ densidad $\times22.4=5.19\times22.4=116.26$ g/mol. Razón $=116.26/58.10\approx2$.
Paso 6 · Fórmula molecular $=(C_3H_8N)\times2=C_6H_{16}N_2$.
Respuesta: D.

---

## Pregunta 14
area: quimica
tema: estequiometria-reactivo-limitante
dificultad: medio

Oxidación catalítica: $4NH_3(g)+5O_2(g)\rightarrow4NO(g)+6H_2O(g)$. Calcular el volumen (L) en c.n. de NO formado cuando reaccionan 1.5 g de $NH_3$ con 1.0 g de $O_2$, rendimiento 90%.

- A) 0.5
- B) 1.0
- C) 1.5
- D) 2
- E) Ninguno

**respuesta:** A
**explicacion:** Determiná el reactivo limitante comparando moles disponibles contra la relación estequiométrica.
Paso 1 · Moles $NH_3=1.5/17.031=0.0881$ mol. Moles $O_2=1.0/32.00=0.03125$ mol.
Paso 2 · Relación estequiométrica $4NH_3:5O_2$. Para consumir todo el $NH_3$ se necesitarían $0.0881\times5/4=0.1101$ mol de $O_2$ (no hay suficiente) $\Rightarrow O_2$ es el reactivo limitante.
Paso 3 · Moles de NO (teóricos) $=$ moles $O_2\times\dfrac{4}{5}=0.03125\times0.8=0.025$ mol.
Paso 4 · Con 90% de rendimiento: $0.025\times0.9=0.0225$ mol.
Paso 5 · Volumen en c.n. $=0.0225\times22.4=0.504\approx0.5$ L.
Respuesta: A.

---

## Pregunta 15
area: quimica
tema: isotopos-abundancia-masa-atomica
dificultad: dificil

Un elemento tiene tres isótopos con masas 23.95, 24.95 y 25.95. Masa atómica del elemento=25.053. Si el más abundante tiene 75%, calcular los porcentajes de abundancia de los otros dos isótopos.

- A) 4.25 y 70.75
- B) 7.35 y 17.65
- C) 20.5 y 54.5
- D) 11.35 y 63.65
- E) Ninguno

**respuesta:** B
**explicacion:** Probá cuál de los tres isótopos puede ser el mayoritario (75%) resolviendo el sistema en cada caso y descartando las asignaciones que den porcentajes negativos o inconsistentes.
Paso 1 · Si 23.95 fuera 75%: $23.95(0.75)+24.95a+25.95b=25.053$ con $a+b=0.25$ da $a=-0.603$ (negativo, inválido).
Paso 2 · Si 24.95 fuera 75%: $24.95(0.75)+23.95a+25.95b=25.053$ con $b=0.25-a$: $18.7125+23.95a+25.95(0.25-a)=25.053 \Rightarrow -2a=-0.147 \Rightarrow a=0.0735$ (7.35%) y $b=0.1765$ (17.65%). Ambos positivos y consistentes.
Paso 3 · Si 25.95 fuera 75%: el sistema análogo da $a=0.647$, mayor que 0.25 (inválido, ya que $a+b=0.25$).
Paso 4 · Única asignación válida: el isótopo de 24.95 es el 75% mayoritario; los otros dos tienen 7.35% (23.95) y 17.65% (25.95).
Respuesta: B.

---

## Pregunta 16
area: fisica
tema: segunda-ley-newton
dificultad: facil

Un auto de 950 kg se acelera desde el reposo hasta 70 km/h en 8 s. ¿De qué magnitud es la fuerza neta (N) necesaria?

- A) 1979
- B) 2262
- C) 2309
- D) 2500
- E) Ninguno

**respuesta:** C
**explicacion:** Convertí la velocidad a m/s, calculá la aceleración y aplicá $F=ma$.
Paso 1 · $70\ km/h=70000/3600=19.444\ m/s$.
Paso 2 · $a=\dfrac{19.444}{8}=2.4306\ m/s^2$.
Paso 3 · $F=950\times2.4306\approx2309\ N$.
Respuesta: C.

---

## Pregunta 17
area: fisica
tema: friccion-estatica-desaceleracion
dificultad: medio

Un recipiente con huevos descansa sobre el asiento horizontal de un auto. Coeficiente estático de rozamiento=0.55. Si el auto se mueve a 15 m/s, ¿cuál es la menor distancia (m) en la que puede detenerse sin que el recipiente resbale?

- A) 20.87
- B) 13.36
- C) 9.28
- D) 39.2
- E) Ninguno

**respuesta:** A
**explicacion:** La máxima desaceleración sin que el recipiente resbale está limitada por la fricción estática máxima.
Paso 1 · $a_{max}=\mu g=0.55\times9.8=5.39\ m/s^2$.
Paso 2 · Usando $v^2=2ad$ (frenado desde 15 m/s hasta 0): $d=\dfrac{v^2}{2a}=\dfrac{15^2}{2\times5.39}=\dfrac{225}{10.78}\approx20.87\ m$.
Respuesta: A.

---

## Pregunta 18
area: fisica
tema: movimiento-circular-friccion-pared
dificultad: dificil

Una motociclista viaja en círculo horizontal alrededor de las paredes verticales de un foso de radio R=6 m; coeficiente de rozamiento estático entre llantas y pared=0.9. La mínima rapidez (m/s) para no caer es:

- A) 6.85
- B) 7.38
- C) 8.08
- D) 9.33
- E) Ninguno

**respuesta:** C
**explicacion:** El peso debe ser sostenido por la fuerza de fricción estática, generada por la normal que provee la fuerza centrípeta.
Paso 1 · Condición límite: $mg=\mu N$, con $N=\dfrac{mv^2}{R}$ (fuerza centrípeta).
Paso 2 · $mg=\mu\dfrac{mv^2}{R} \Rightarrow v^2=\dfrac{gR}{\mu}=\dfrac{9.8\times6}{0.9}=65.333$.
Paso 3 · $v=\sqrt{65.333}\approx8.08\ m/s$.
Respuesta: C.

---

## Pregunta 19
area: fisica
tema: energia-cinetica-velocidad
dificultad: medio

Si la energía cinética de un automóvil aumenta en una vez y media su valor inicial ($KE_{final}=2.5\times KE_{inicial}$), ¿en cuánto aumenta su rapidez?

- A) 1.11 veces
- B) 1.22 veces
- C) 1.5 veces
- D) 1.58 veces
- E) Ninguno

**respuesta:** D
**explicacion:** La energía cinética es proporcional al cuadrado de la velocidad.
Paso 1 · $KE=\frac12mv^2 \Rightarrow \dfrac{v_f}{v_i}=\sqrt{\dfrac{KE_f}{KE_i}}=\sqrt{2.5}$.
Paso 2 · $\sqrt{2.5}\approx1.5811$.
Respuesta: D.

---

## Pregunta 20
area: fisica
tema: energia-termica-friccion
dificultad: medio

Un niño de 25 kg desciende por una resbaladilla de 5.0 m de alto y llega abajo con velocidad 2.5 m/s. ¿Cuánta energía térmica por fricción se generó?

- A) 999
- B) 1009
- C) 1376
- D) 1147
- E) Ninguno

**respuesta:** D
**explicacion:** La energía térmica disipada es la diferencia entre la energía potencial inicial y la energía cinética final.
Paso 1 · $PE_{inicial}=mgh=25\times9.8\times5=1225\ J$.
Paso 2 · $KE_{final}=\frac12mv^2=\frac12\times25\times2.5^2=78.125\ J$.
Paso 3 · Energía térmica $=1225-78.125=1146.875\approx1147\ J$.
Respuesta: D.

---

## Pregunta 21
area: biologia
tema: amenazas-biodiversidad
dificultad: facil

La ampliación de la frontera agrícola, introducción de especies invasoras y caza/pesca sin control son consideradas como:

- A) Amenazas para la biodiversidad
- B) Fuentes de la biodiversidad
- C) Estudio de la biodiversidad
- D) Todas
- E) Ninguna

**respuesta:** A
**explicacion:** Estas actividades humanas degradan y reducen la biodiversidad, por lo que se clasifican como amenazas.
Paso 1 · Expansión agrícola, especies invasoras y sobreexplotación de fauna son las causas de pérdida de biodiversidad más citadas.
Respuesta: A.

---

## Pregunta 22
area: biologia
tema: servicios-biodiversidad
dificultad: facil

La polinización, dispersión de semillas, conservación del suelo y agua se conoce como:

- A) Amenazas de la biodiversidad
- B) Servicios de la biodiversidad
- C) Organización de la biodiversidad
- D) Todas
- E) Ninguna

**respuesta:** B
**explicacion:** Estos procesos son beneficios ecológicos que la biodiversidad presta a los ecosistemas y al ser humano.
Paso 1 · Polinización, dispersión de semillas y conservación de suelo/agua son ejemplos clásicos de servicios ecosistémicos.
Respuesta: B.

---

## Pregunta 23
area: biologia
tema: protozoarios-enfermedades
dificultad: facil

Los Protozoarios son causantes de enfermedades como:

- A) Diarreas
- B) Leishmaniasis
- C) Chagas
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Cada una de estas enfermedades está causada por un protozoario específico.
Paso 1 · Diarreas: Giardia lamblia, Entamoeba histolytica. Leishmaniasis: Leishmania spp. Chagas: Trypanosoma cruzi.
Paso 2 · Las tres son enfermedades protozoarias reconocidas, por lo tanto "Todas".
Respuesta: D.

---

## Pregunta 24
area: biologia
tema: bolivia-biodiversidad
dificultad: facil

Bolivia es considerada biodiversa por:

- A) Condiciones óptimas de hábitats
- B) Ambientes cálidos-húmedos, fríos-áridos
- C) Suelos diversos
- D) Presencia de los Andes y ubicación céntrica en el continente
- E) Todas

**respuesta:** E
**explicacion:** Todas las razones listadas contribuyen efectivamente a la megadiversidad de Bolivia.
Paso 1 · Hábitats óptimos, variedad climática, suelos diversos y la presencia de los Andes con ubicación central en Sudamérica son factores reconocidos de la biodiversidad boliviana.
Respuesta: E.

---

## Pregunta 25
area: biologia
tema: clasificacion-invertebrados
dificultad: medio

Los equinodermos, artrópodos y anélidos son organismos:

- A) Vertebrados
- B) Talófitos
- C) Cormófitos
- D) Todos
- E) Ninguno

**respuesta:** E
**explicacion:** Ninguna de las opciones listadas describe correctamente a estos grupos animales.
Paso 1 · Equinodermos, artrópodos y anélidos son invertebrados, no vertebrados (descarta A).
Paso 2 · "Talófitos" y "Cormófitos" son categorías del reino vegetal (plantas sin y con estructuras verdaderas de raíz/tallo/hoja respectivamente), no aplican a animales (descarta B y C).
Paso 3 · Como ninguna opción es correcta, "Todos" tampoco puede serlo.
Respuesta: E.

---

## Pregunta 26
area: biologia
tema: reino-monera
dificultad: facil

En el sistema de cinco reinos, el reino que incluye bacterias y cianobacterias es:

- A) Plantae
- B) Monera
- C) Protista
- D) Todos
- E) Ninguno

**respuesta:** B
**explicacion:** El reino Monera agrupa a los organismos procariotas.
Paso 1 · Bacterias y cianobacterias (algas verdiazules) son organismos procariotas, clasificados en el reino Monera.
Respuesta: B.

---

## Pregunta 27
area: biologia
tema: categorias-taxonomicas
dificultad: medio

El orden correcto de las categorías taxonómicas es:

- A) Reino,filum,orden,género,clase,familia
- B) Reino,filum,especie,familia,orden,género
- C) Filum,reino,orden,familia,género,clase,especie
- D) Todos
- E) Ninguno

**respuesta:** E
**explicacion:** El orden taxonómico estándar es Reino, Filo, Clase, Orden, Familia, Género, Especie; ninguna opción lo respeta.
Paso 1 · A) intercala orden y género antes que clase y familia: secuencia incorrecta.
Paso 2 · B) coloca "especie" inmediatamente después de "filum", muy fuera de orden: incorrecta.
Paso 3 · C) empieza con "filum" antes que "reino" y desordena el resto: incorrecta.
Paso 4 · Como ninguna secuencia respeta el orden jerárquico real, la respuesta es "Ninguno".
Respuesta: E.

---

## Pregunta 28
area: biologia
tema: clasificacion-vertebrados
dificultad: medio

Los peces, anfibios, reptiles, aves y mamíferos son organismos:

- A) Talófitos
- B) Invertebrados
- C) Cormófitos
- D) Todos
- E) Ninguno

**respuesta:** E
**explicacion:** Estos cinco grupos son vertebrados, categoría que no figura entre las opciones dadas.
Paso 1 · Peces, anfibios, reptiles, aves y mamíferos son las cinco clases clásicas de vertebrados (poseen columna vertebral), no invertebrados (descarta B).
Paso 2 · "Talófitos" y "Cormófitos" son categorías vegetales, no aplican a animales (descarta A y C).
Respuesta: E.

---

## Pregunta 29
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
**explicacion:** La nomenclatura binomial de Linneo combina género y especie.
Paso 1 · El nombre científico de un organismo se compone del género (con mayúscula inicial) y el epíteto de especie (en minúscula), por ejemplo Homo sapiens.
Respuesta: B.

---

## Pregunta 30
area: biologia
tema: caracteristicas-celula-vegetal
dificultad: facil

Las especies vegetales poseen:

- A) Pared celular
- B) Cloroplastos
- C) Células eucariotas
- D) Todas
- E) Ninguna

**respuesta:** D
**explicacion:** Las tres características son propias de las células vegetales.
Paso 1 · Las plantas tienen pared celular (celulosa), cloroplastos (fotosíntesis) y células eucariotas (núcleo verdadero).
Paso 2 · Como las tres afirmaciones son ciertas, la respuesta es "Todas".
Respuesta: D.

---
