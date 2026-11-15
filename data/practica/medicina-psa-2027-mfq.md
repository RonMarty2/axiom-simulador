---
universidad: UMSS
facultad: medicina
anio: 2027
titulo: Práctica PSA 2027 · Matemática, Física y Química
categoria: practica
total_preguntas: 98
---

<!--
  NO ES UN EXAMEN PASADO. Preguntas de práctica escritas para la PSA 2027 (docs/psa-2027/MFQ_INVENTARIO.md §4),
  verificadas (verificacion_MFQ_agy.md) y contrastadas con 4096.pdf (convocatoria_MFQ.md): solo las DENTRO.
  Quedan fuera las dudosas: F3.5, F4.5, F9.3, M2.4, M2.5, Q2.3, Q2.5. Generado por scripts/psa-mfq-a-banco.py: no editar a mano.
  Va fuera de data/examenes para no contarse como examen; entra a la práctica por data/preguntas-compartidas.json.
-->

## Pregunta 1
area: matematicas
tema: psa-logica-matematica-y-teoria-de-conjuntos
dificultad: media

Si la proposición $(p \land \neg q) \to r$ es falsa, determina los valores de verdad de $p$, $q$ y $r$ en ese orden.

- A) V, F, F
- B) V, V, F
- C) F, F, V
- D) V, F, V

**respuesta:** A
**explicacion:** Paso 1 · Una implicación $A \to B$ solo es falsa cuando $A$ es verdadera y $B$ es falsa. Aquí $r \equiv \text{F}$ y $(p \land \neg q) \equiv \text{V}$.
Paso 2 · Una conjunción es verdadera solo si ambos términos son verdaderos: $p \equiv \text{V}$ y $\neg q \equiv \text{V}$, de donde $q \equiv \text{F}$.
Paso 3 · Comprobación: $(\text{V} \land \neg \text{F}) \to \text{F} \equiv (\text{V} \land \text{V}) \to \text{F} \equiv \text{V} \to \text{F} \equiv \text{F}$.
Respuesta: A.

<!-- M1.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 2
area: matematicas
tema: psa-logica-matematica-y-teoria-de-conjuntos
dificultad: media

De 80 estudiantes de Medicina, 52 aprobaron Anatomía, 44 aprobaron Histología y 10 no aprobaron ninguna de las dos. ¿Cuántos aprobaron ambas materias?

- A) 24
- B) 26
- C) 28
- D) 30

**respuesta:** B
**explicacion:** Paso 1 · Quienes aprobaron al menos una materia son $n(A \cup H) = 80 - 10 = 70$.
Paso 2 · Por inclusión-exclusión: $n(A \cap H) = 52 + 44 - 70 = 96 - 70 = 26$.
Paso 3 · Comprobación por regiones disjuntas: solo Anatomía $52 - 26 = 26$, solo Histología $44 - 26 = 18$, ambas $26$, ninguna $10$; suma $= 26 + 18 + 26 + 10 = 80$.
Respuesta: B.

<!-- M1.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 3
area: matematicas
tema: psa-logica-matematica-y-teoria-de-conjuntos
dificultad: media

Simplifica la proposición $\neg(p \lor \neg q) \land q$ usando leyes lógicas.

- A) $p \land q$
- B) $\neg p \land q$
- C) $\neg p \lor q$
- D) $p \lor \neg q$

**respuesta:** B
**explicacion:** Paso 1 · Aplica De Morgan: $\neg(p \lor \neg q) \equiv \neg p \land q$.
Paso 2 · Por idempotencia: $(\neg p \land q) \land q \equiv \neg p \land (q \land q) \equiv \neg p \land q$.
Paso 3 · Comprobación con tabla: solo es verdadera si $q=\text{V}$ y $p=\text{F}$ (en los demás casos $q=\text{F}$ o $p=\text{V}$ anulan la expresión).
Respuesta: B.

<!-- M1.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 4
area: matematicas
tema: psa-logica-matematica-y-teoria-de-conjuntos
dificultad: media

Dado el conjunto $M = \{1, 2, \{3\}, 4\}$, ¿cuál de las siguientes afirmaciones es verdadera?

- A) $\{3\} \subset M$
- B) $3 \in M$
- C) $\{\{3\}\} \subset M$
- D) $|M| = 5$

**respuesta:** C
**explicacion:** Paso 1 · Los elementos de $M$ son $1$, $2$, el conjunto $\{3\}$ y $4$; por tanto $|M| = 4$.
Paso 2 · Como $\{3\} \in M$, el conjunto unitario formado por ese elemento sí es subconjunto de $M$: $\{\{3\}\} \subset M$.
Paso 3 · Comprobación: $3$ no es elemento directo de $M$ (lo es $\{3\}$), así que $3 \in M$ y $\{3\} \subset M$ son falsas.
Respuesta: C.

<!-- M1.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 5
area: matematicas
tema: psa-logica-matematica-y-teoria-de-conjuntos
dificultad: media

En un tamizaje clínico de 120 pacientes, 75 tienen fiebre, 60 tienen tos y 35 presentan ambos síntomas. ¿Cuántos pacientes presentan **solo** uno de los dos síntomas?

- A) 65
- B) 70
- C) 85
- D) 100

**respuesta:** A
**explicacion:** Paso 1 · Solo fiebre: $75 - 35 = 40$. Solo tos: $60 - 35 = 25$.
Paso 2 · Total con exactamente un síntoma: $40 + 25 = 65$.
Paso 3 · Comprobación: $n(F \cup T) - n(F \cap T) = (75 + 60 - 35) - 35 = 100 - 35 = 65$.
Respuesta: A.

<!-- M1.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 6
area: matematicas
tema: psa-numeros-imaginarios-y-complejos
dificultad: media

Calcula el valor de $i^{43} + i^{24} - i^{18}$, donde $i = \sqrt{-1}$.

- A) $2 - i$
- B) $-i$
- C) $2 + i$
- D) $i$

**respuesta:** A
**explicacion:** Paso 1 · Divide cada exponente entre $4$ para hallar el residuo: $43 = 4(10) + 3 \Rightarrow i^{43} = i^3 = -i$; $24 = 4(6) + 0 \Rightarrow i^{24} = 1$; $18 = 4(4) + 2 \Rightarrow i^{18} = i^2 = -1$.
Paso 2 · Sustituye: $(-i) + 1 - (-1) = 2 - i$.
Paso 3 · Comprobación: $i^{43} = (i^4)^{10} i^3 = -i$, $i^{24} = (i^2)^{12} = 1$, $i^{18} = (i^2)^9 = -1$, suma $1 - (-1) - i = 2 - i$.
Respuesta: A.

<!-- M2.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 7
area: matematicas
tema: psa-numeros-imaginarios-y-complejos
dificultad: media

Si $z_1 = 3 - 2i$ y $z_2 = 1 + 4i$, halla el producto $z_1 \cdot z_2$.

- A) $11 + 10i$
- B) $-5 + 10i$
- C) $11 - 10i$
- D) $3 - 8i$

**respuesta:** A
**explicacion:** Paso 1 · Multiplica distributivamente: $(3 - 2i)(1 + 4i) = 3 + 12i - 2i - 8i^2$.
Paso 2 · Como $i^2 = -1$: $3 + 10i - 8(-1) = 3 + 8 + 10i = 11 + 10i$.
Paso 3 · Comprobación por módulos: $|z_1|^2 = 9+4 = 13$, $|z_2|^2 = 1+16 = 17$; $|z_1 z_2|^2 = 11^2 + 10^2 = 221 = 13 \times 17$.
Respuesta: A.

<!-- M2.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 8
area: matematicas
tema: psa-numeros-imaginarios-y-complejos
dificultad: media

Expresa $\dfrac{5 + i}{1 - i}$ en forma binómica $a + bi$.

- A) $2 + 3i$
- B) $3 + 2i$
- C) $2 - 3i$
- D) $4 + 3i$

**respuesta:** A
**explicacion:** Paso 1 · Multiplica numerador y denominador por el conjugado $1 + i$: $\dfrac{(5+i)(1+i)}{(1-i)(1+i)}$.
Paso 2 · Numerador: $5 + 5i + i + i^2 = 4 + 6i$. Denominador: $1^2 - i^2 = 2$.
Paso 3 · Divide: $\dfrac{4+6i}{2} = 2 + 3i$. Comprobación inversa: $(2+3i)(1-i) = 2 - 2i + 3i - 3i^2 = 5 + i$.
Respuesta: A.

<!-- M2.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 9
area: matematicas
tema: psa-matematica-financiera
dificultad: media

Un laboratorio deposita Bs $4000$ al $6\%$ anual de interés simple durante $3$ años. ¿Cuál será el monto final?

- A) Bs $4720$
- B) Bs $4240$
- C) Bs $4600$
- D) Bs $4800$

**respuesta:** A
**explicacion:** Paso 1 · Calcula el interés: $I = C \cdot r \cdot t = 4000 \times 0{,}06 \times 3 = 720$.
Paso 2 · Monto final: $M = C + I = 4000 + 720 = 4720$.
Paso 3 · Comprobación: $6\%$ anual por $3$ años es $18\%$ total; $4000 \times 1{,}18 = 4720$.
Respuesta: A.

<!-- M3.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 10
area: matematicas
tema: psa-matematica-financiera
dificultad: media

¿Qué capital produce un interés simple de Bs $600$ en $8$ meses al $9\%$ anual?

- A) Bs $10\,000$
- B) Bs $8000$
- C) Bs $12\,000$
- D) Bs $9000$

**respuesta:** A
**explicacion:** Paso 1 · Convierte el tiempo a años: $t = \dfrac{8}{12} = \dfrac{2}{3}\ \text{años}$.
Paso 2 · Despeja $C = \dfrac{I}{r \cdot t} = \dfrac{600}{0{,}09 \times \frac{2}{3}} = \dfrac{600}{0{,}06} = 10\,000$.
Paso 3 · Comprobación: $10\,000 \times 0{,}09 \times \frac{8}{12} = 900 \times \frac{2}{3} = 600$.
Respuesta: A.

<!-- M3.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 11
area: matematicas
tema: psa-matematica-financiera
dificultad: media

Se invierten Bs $5000$ a una tasa de interés compuesto del $10\%$ anual durante $2$ años. ¿Cuál es el monto acumulado?

- A) Bs $6050$
- B) Bs $6000$
- C) Bs $6100$
- D) Bs $5500$

**respuesta:** A
**explicacion:** Paso 1 · Aplica $M = C(1 + r)^t = 5000(1 + 0{,}10)^2 = 5000(1{,}21) = 6050$.
Paso 2 · Comprobación año a año: año 1: $5000 + 500 = 5500$; año 2: $5500 + 550 = 6050$.
Respuesta: A.

<!-- M3.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 12
area: matematicas
tema: psa-matematica-financiera
dificultad: media

Una farmacia ofrece un medicamento de Bs $250$ con un descuento del $20\%$ y luego un descuento adicional del $10\%$ sobre el precio rebajado. ¿Cuánto paga el paciente?

- A) Bs $175$
- B) Bs $180$
- C) Bs $185$
- D) Bs $190$

**respuesta:** B
**explicacion:** Paso 1 · Primer descuento ($20\%$): queda $250 \times 0{,}80 = 200$.
Paso 2 · Segundo descuento ($10\%$): $200 \times 0{,}90 = 180$.
Paso 3 · Comprobación con descuento único equivalente: $1 - (0{,}8)(0{,}9) = 0{,}28$ ($28\%$); $250 \times 0{,}72 = 180$.
Respuesta: B.

<!-- M3.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 13
area: matematicas
tema: psa-matematica-financiera
dificultad: media

¿A qué tasa anual de interés simple se duplica un capital en $5$ años?

- A) $15\%$
- B) $20\%$
- C) $25\%$
- D) $10\%$

**respuesta:** B
**explicacion:** Paso 1 · Si se duplica, $I = C$, entonces $C = C \cdot r \cdot 5 \Rightarrow 5r = 1 \Rightarrow r = 0{,}20 = 20\%$.
Paso 2 · Comprobación: con $C = 100$, $I = 100 \times 0{,}20 \times 5 = 100$, monto $= 200$.
Respuesta: B.

<!-- M3.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 14
area: matematicas
tema: psa-analisis-combinatorio-y-binomio-de-newton
dificultad: media

Un equipo de guardia médica requiere $1$ cirujano, $1$ anestesiólogo y $1$ enfermero. Si hay $4$ cirujanos, $3$ anestesiólogos y $5$ enfermeros disponibles, ¿de cuántas maneras distintas puede formarse el equipo?

- A) $12$
- B) $60$
- C) $47$
- D) $30$

**respuesta:** B
**explicacion:** Paso 1 · Por el principio de multiplicación: $4 \times 3 \times 5 = 60$.
Paso 2 · Comprobación: por cada par cirujano-anestesiólogo ($4 \times 3 = 12$ pares), hay $5$ opciones de enfermero: $12 \times 5 = 60$.
Respuesta: B.

<!-- M4.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 15
area: matematicas
tema: psa-analisis-combinatorio-y-binomio-de-newton
dificultad: media

¿Cuántos comités de $3$ médicos se pueden formar a partir de un grupo de $7$ médicos?

- A) $210$
- B) $35$
- C) $21$
- D) $42$

**respuesta:** B
**explicacion:** Paso 1 · El orden no importa, luego es una combinación: $\binom{7}{3} = \dfrac{7!}{3!\,4!} = \dfrac{7 \times 6 \times 5}{3 \times 2 \times 1} = 35$.
Paso 2 · Comprobación: variaciones $V_7^3 = 210$, divididas entre $3! = 6$ permutaciones: $210 / 6 = 35$.
Respuesta: B.

<!-- M4.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 16
area: matematicas
tema: psa-analisis-combinatorio-y-binomio-de-newton
dificultad: media

¿De cuántas formas distintas pueden ordenarse las letras de la palabra `DOSIS`?

- A) $120$
- B) $60$
- C) $24$
- D) $30$

**respuesta:** B
**explicacion:** Paso 1 · Hay $5$ letras en total y la letra `S` se repite $2$ veces: $P_5^{(2)} = \dfrac{5!}{2!} = \dfrac{120}{2} = 60$.
Paso 2 · Comprobación: elige los $2$ lugares para la `S` ($\binom{5}{2} = 10$) y ordena las otras $3$ letras ($3! = 6$): $10 \times 6 = 60$.
Respuesta: B.

<!-- M4.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 17
area: matematicas
tema: psa-analisis-combinatorio-y-binomio-de-newton
dificultad: media

Halla el coeficiente del término que contiene $x^3$ en el desarrollo de $(x + 2)^5$.

- A) $40$
- B) $80$
- C) $10$
- D) $20$

**respuesta:** A
**explicacion:** Paso 1 · El término con $x^3$ tiene $k = 2$ (ya que $5 - k = 3$): $T_3 = \binom{5}{2} x^3 (2)^2$.
Paso 2 · Calcula el coeficiente: $\binom{5}{2} \cdot 4 = 10 \times 4 = 40$.
Paso 3 · Comprobación con fila 5 de Pascal $(1, 5, 10, 10, 5, 1)$: el tercer término es $10 \cdot 2^2 = 40$.
Respuesta: A.

<!-- M4.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 18
area: matematicas
tema: psa-analisis-combinatorio-y-binomio-de-newton
dificultad: media

¿Cuántos números pares de $3$ cifras distintas se pueden formar con los dígitos $\{1, 2, 3, 4, 5\}$?

- A) $24$
- B) $48$
- C) $30$
- D) $12$

**respuesta:** A
**explicacion:** Paso 1 · Para que sea par, la última cifra solo puede ser $2$ o $4$ ($2$ opciones).
Paso 2 · Quedan $4$ dígitos para la primera cifra y $3$ para la segunda: $4 \times 3 \times 2 = 24$.
Paso 3 · Comprobación: si termina en $2$, hay $V_4^2 = 12$ números; si termina en $4$, otros $12$; total $12 + 12 = 24$.
Respuesta: A.

<!-- M4.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 19
area: matematicas
tema: psa-estadistica-descriptiva
dificultad: media

Las edades de $6$ pacientes en consulta son $18, 22, 20, 24, 20, 16$. Determina la media aritmética y la moda.

- A) Media $20$, moda $20$
- B) Media $21$, moda $20$
- C) Media $20$, moda $22$
- D) Media $19$, moda $20$

**respuesta:** A
**explicacion:** Paso 1 · Media: $\bar{x} = \dfrac{18+22+20+24+20+16}{6} = \dfrac{120}{6} = 20$.
Paso 2 · Moda: $20$ aparece $2$ veces (los demás, $1$ vez).
Paso 3 · Comprobación por desvíos respecto a $20$: $(-2)+(+2)+0+(+4)+0+(-4) = 0$, luego la media es $20$.
Respuesta: A.

<!-- M5.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 20
area: matematicas
tema: psa-estadistica-descriptiva
dificultad: media

Halla la mediana del conjunto de datos: $12, 7, 15, 9, 10, 14$.

- A) $10$
- B) $11$
- C) $12$
- D) $11{,}5$

**respuesta:** B
**explicacion:** Paso 1 · Ordena de menor a mayor: $7, 9, 10, 12, 14, 15$.
Paso 2 · Como hay $6$ datos (par), la mediana es el promedio de los dos centrales ($10$ y $12$): $\dfrac{10+12}{2} = 11$.
Paso 3 · Comprobación: quedan $3$ datos menores que $11$ ($7,9,10$) y $3$ mayores ($12,14,15$).
Respuesta: B.

<!-- M5.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 21
area: matematicas
tema: psa-estadistica-descriptiva
dificultad: media

Calcula la varianza poblacional de los datos $2, 4, 6, 8$.

- A) $4$
- B) $5$
- C) $\sqrt{5}$
- D) $10$

**respuesta:** B
**explicacion:** Paso 1 · Media: $\mu = \dfrac{2+4+6+8}{4} = 5$.
Paso 2 · Desvíos al cuadrado: $(2-5)^2 + (4-5)^2 + (6-5)^2 + (8-5)^2 = 9 + 1 + 1 + 9 = 20$.
Paso 3 · Varianza: $\sigma^2 = \dfrac{20}{4} = 5$. Comprobación: $\dfrac{\sum x_i^2}{N} - \mu^2 = \dfrac{4+16+36+64}{4} - 25 = 30 - 25 = 5$.
Respuesta: B.

<!-- M5.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 22
area: matematicas
tema: psa-estadistica-descriptiva
dificultad: media

En una distribución simétrica de $40$ observaciones, el promedio es $65$. Si se añade una nueva observación igual a $65$, ¿qué ocurre con la media?

- A) Aumenta en $1{,}6$
- B) Disminuye ligeramente
- C) Permanece igual ($65$)
- D) Aumenta a $66$

**respuesta:** C
**explicacion:** Paso 1 · Suma inicial: $40 \times 65 = 2600$. Nueva suma: $2600 + 65 = 2665$.
Paso 2 · Nueva media: $\dfrac{2665}{41} = 65$.
Paso 3 · Comprobación algebraica: $\dfrac{n\bar{x} + \bar{x}}{n+1} = \dfrac{(n+1)\bar{x}}{n+1} = \bar{x}$.
Respuesta: C.

<!-- M5.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 23
area: matematicas
tema: psa-estadistica-descriptiva
dificultad: media

En una tabla de frecuencias de $50$ historias clínicas, el intervalo $[20, 30)$ tiene frecuencia absoluta $15$. ¿Cuál es su frecuencia relativa porcentual?

- A) $15\%$
- B) $25\%$
- C) $30\%$
- D) $35\%$

**respuesta:** C
**explicacion:** Paso 1 · Frecuencia relativa: $h_i = \dfrac{15}{50} = 0{,}30$.
Paso 2 · En porcentaje: $0{,}30 \times 100\% = 30\%$.
Paso 3 · Comprobación: $30\%$ de $50 = 0{,}3 \times 50 = 15$.
Respuesta: C.

<!-- M5.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 24
area: matematicas
tema: psa-cuerpos-geometricos-en-el-espacio
dificultad: media

Un frasco cilíndrico de radio $3\ \text{cm}$ y altura $10\ \text{cm}$ se llena por completo con suero. ¿Cuál es su volumen?

- A) $30\pi\ \text{cm}^3$
- B) $60\pi\ \text{cm}^3$
- C) $90\pi\ \text{cm}^3$
- D) $120\pi\ \text{cm}^3$

**respuesta:** C
**explicacion:** Paso 1 · $V = \pi r^2 h = \pi (3)^2 (10) = 90\pi\ \text{cm}^3$.
Paso 2 · Comprobación: área de la base $A_b = 9\pi\ \text{cm}^2$, por altura $10\ \text{cm}$ da $90\pi\ \text{cm}^3$.
Respuesta: C.

<!-- M6.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 25
area: matematicas
tema: psa-cuerpos-geometricos-en-el-espacio
dificultad: media

Si se duplica el radio de una esfera, ¿en qué factor aumenta su volumen?

- A) $2$
- B) $4$
- C) $6$
- D) $8$

**respuesta:** D
**explicacion:** Paso 1 · $V_1 = \dfrac{4}{3}\pi r^3$ y $V_2 = \dfrac{4}{3}\pi (2r)^3 = 8 \left(\dfrac{4}{3}\pi r^3\right) = 8 V_1$.
Paso 2 · Comprobación numérica: con $r=1$, $V_1 = \frac{4}{3}\pi$; con $r=2$, $V_2 = \frac{32}{3}\pi = 8 V_1$.
Respuesta: D.

<!-- M6.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 26
area: matematicas
tema: psa-cuerpos-geometricos-en-el-espacio
dificultad: media

Halla el área total de un cubo cuya diagonal de una cara mide $4\sqrt{2}\ \text{cm}$.

- A) $64\ \text{cm}^2$
- B) $96\ \text{cm}^2$
- C) $48\ \text{cm}^2$
- D) $128\ \text{cm}^2$

**respuesta:** B
**explicacion:** Paso 1 · Si la arista es $a$, la diagonal de la cara es $a\sqrt{2} = 4\sqrt{2} \Rightarrow a = 4\ \text{cm}$.
Paso 2 · Área total de las $6$ caras: $A_T = 6a^2 = 6(4)^2 = 96\ \text{cm}^2$.
Paso 3 · Comprobación: cada cara mide $4 \times 4 = 16\ \text{cm}^2$; $6 \times 16 = 96\ \text{cm}^2$.
Respuesta: B.

<!-- M6.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 27
area: matematicas
tema: psa-cuerpos-geometricos-en-el-espacio
dificultad: media

Calcula el volumen de un cono recto de radio $6\ \text{cm}$ y generatriz $10\ \text{cm}$.

- A) $96\pi\ \text{cm}^3$
- B) $120\pi\ \text{cm}^3$
- C) $288\pi\ \text{cm}^3$
- D) $60\pi\ \text{cm}^3$

**respuesta:** A
**explicacion:** Paso 1 · Halla la altura por Pitágoras: $h = \sqrt{g^2 - r^2} = \sqrt{10^2 - 6^2} = \sqrt{64} = 8\ \text{cm}$.
Paso 2 · Volumen: $V = \dfrac{1}{3}\pi r^2 h = \dfrac{1}{3}\pi (36)(8) = 12 \times 8\pi = 96\pi\ \text{cm}^3$.
Paso 3 · Comprobación: un cilindro de igual base y altura tendría $V_{\text{cil}} = 36 \times 8\pi = 288\pi$, y $\frac{288\pi}{3} = 96\pi$.
Respuesta: A.

<!-- M6.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 28
area: matematicas
tema: psa-cuerpos-geometricos-en-el-espacio
dificultad: media

Una caja ortoédrica de reactivos mide $5\ \text{cm} \times 4\ \text{cm} \times 3\ \text{cm}$. ¿Cuál es su área superficial total?

- A) $60\ \text{cm}^2$
- B) $94\ \text{cm}^2$
- C) $47\ \text{cm}^2$
- D) $120\ \text{cm}^2$

**respuesta:** B
**explicacion:** Paso 1 · $A_T = 2(ab + bc + ac) = 2(5\cdot 4 + 4\cdot 3 + 5\cdot 3) = 2(20 + 12 + 15) = 2(47) = 94\ \text{cm}^2$.
Paso 2 · Comprobación: dos tapas de $20$ ($40$), dos laterales de $12$ ($24$) y dos frentes de $15$ ($30$); $40+24+30 = 94\ \text{cm}^2$.
Respuesta: B.

<!-- M6.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 29
area: matematicas
tema: psa-secciones-conicas-elipse-e-hiperbola
dificultad: media

Dada la elipse $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$, determina la distancia entre sus focos.

- A) $4$
- B) $8$
- C) $10$
- D) $6$

**respuesta:** B
**explicacion:** Paso 1 · Aquí $a^2 = 25$ y $b^2 = 9$, luego $c^2 = a^2 - b^2 = 25 - 9 = 16 \Rightarrow c = 4$.
Paso 2 · La distancia focal es $2c = 2(4) = 8$.
Paso 3 · Comprobación: los focos están en $(\pm 4, 0)$, separados $4 - (-4) = 8$.
Respuesta: B.

<!-- M7.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 30
area: matematicas
tema: psa-secciones-conicas-elipse-e-hiperbola
dificultad: media

Halla la excentricidad de la elipse $9x^2 + 25y^2 = 225$.

- A) $\dfrac{3}{5}$
- B) $\dfrac{4}{5}$
- C) $\dfrac{5}{4}$
- D) $\dfrac{16}{25}$

**respuesta:** B
**explicacion:** Paso 1 · Divide entre $225$: $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$, así $a = 5$ y $b = 3$.
Paso 2 · $c = \sqrt{25 - 9} = 4$, luego $e = \dfrac{c}{a} = \dfrac{4}{5}$.
Paso 3 · Comprobación: $e = \sqrt{1 - \frac{b^2}{a^2}} = \sqrt{1 - \frac{9}{25}} = \sqrt{\frac{16}{25}} = \frac{4}{5}$.
Respuesta: B.

<!-- M7.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 31
area: matematicas
tema: psa-secciones-conicas-elipse-e-hiperbola
dificultad: media

Determina las ecuaciones de las asíntotas de la hipérbola $\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1$.

- A) $y = \pm \dfrac{3}{4}x$
- B) $y = \pm \dfrac{4}{3}x$
- C) $y = \pm \dfrac{9}{16}x$
- D) $y = \pm \dfrac{5}{4}x$

**respuesta:** A
**explicacion:** Paso 1 · Con $a = 4$ y $b = 3$ (eje transverso horizontal), las asíntotas son $y = \pm \dfrac{b}{a}x = \pm \dfrac{3}{4}x$.
Paso 2 · Comprobación: igualando a cero $\dfrac{x^2}{16} - \dfrac{y^2}{9} = 0 \Rightarrow \dfrac{y^2}{x^2} = \dfrac{9}{16} \Rightarrow y = \pm \dfrac{3}{4}x$.
Respuesta: A.

<!-- M7.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 32
area: matematicas
tema: psa-secciones-conicas-elipse-e-hiperbola
dificultad: media

¿Cuál es la longitud del eje transverso de la hipérbola $\dfrac{(y - 2)^2}{36} - \dfrac{(x + 1)^2}{64} = 1$?

- A) $6$
- B) $12$
- C) $16$
- D) $20$

**respuesta:** B
**explicacion:** Paso 1 · El término positivo tiene denominador $a^2 = 36 \Rightarrow a = 6$.
Paso 2 · Longitud del eje transverso: $2a = 12$.
Paso 3 · Comprobación: los vértices están en $(-1, 2+6) = (-1, 8)$ y $(-1, 2-6) = (-1, -4)$; distancia $= 8 - (-4) = 12$.
Respuesta: B.

<!-- M7.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 33
area: matematicas
tema: psa-secciones-conicas-elipse-e-hiperbola
dificultad: media

Halla la ecuación de la elipse con centro en el origen, foco en $(0, 3)$ y semieje mayor $a = 5$.

- A) $\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$
- B) $\dfrac{x^2}{16} + \dfrac{y^2}{25} = 1$
- C) $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$
- D) $\dfrac{x^2}{9} + \dfrac{y^2}{25} = 1$

**respuesta:** B
**explicacion:** Paso 1 · Como el foco está en el eje $Y$, la elipse es vertical ($a^2 = 25$ bajo $y^2$).
Paso 2 · Con $c = 3$: $b^2 = a^2 - c^2 = 25 - 9 = 16$, luego $\dfrac{x^2}{16} + \dfrac{y^2}{25} = 1$.
Paso 3 · Comprobación: en $x = 0$, $y = \pm 5$ (vértices mayores); en $y = 0$, $x = \pm 4$ (vértices menores); $c = \sqrt{25-16} = 3$.
Respuesta: B.

<!-- M7.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 34
area: matematicas
tema: psa-introduccion-al-analisis-matematico
dificultad: media

Calcula el límite $\lim_{x \to 3} \dfrac{x^2 - 9}{x - 3}$.

- A) $0$
- B) $3$
- C) $6$
- D) No existe

**respuesta:** C
**explicacion:** Paso 1 · Factoriza el numerador: $\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$ (para $x \neq 3$).
Paso 2 · Evalúa en $x = 3$: $3 + 3 = 6$.
Paso 3 · Comprobación con $x = 3{,}001$: $\dfrac{3{,}001^2 - 9}{0{,}001} = \dfrac{0{,}006001}{0{,}001} = 6{,}001 \to 6$.
Respuesta: C.

<!-- M8.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 35
area: matematicas
tema: psa-introduccion-al-analisis-matematico
dificultad: media

Halla la derivada $f'(x)$ de $f(x) = 3x^4 - 5x^2 + 7x - 2$.

- A) $12x^3 - 10x + 7$
- B) $12x^3 - 5x + 7$
- C) $3x^3 - 10x + 7$
- D) $12x^4 - 10x^2 + 7$

**respuesta:** A
**explicacion:** Paso 1 · Aplica $(x^n)' = nx^{n-1}$ término a término: $3(4x^3) - 5(2x) + 7(1) - 0 = 12x^3 - 10x + 7$.
Paso 2 · Comprobación en $x = 1$: $f'(1) = 12 - 10 + 7 = 9$.
Respuesta: A.

<!-- M8.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 36
area: matematicas
tema: psa-introduccion-al-analisis-matematico
dificultad: media

Determina la pendiente de la recta tangente a la curva $y = x^3 - 2x$ en el punto donde $x = 2$.

- A) $4$
- B) $10$
- C) $12$
- D) $8$

**respuesta:** B
**explicacion:** Paso 1 · Deriva: $y' = 3x^2 - 2$.
Paso 2 · Evalúa en $x = 2$: $m = 3(2)^2 - 2 = 12 - 2 = 10$.
Paso 3 · Comprobación aproximada con $\Delta x = 0{,}01$: $y(2) = 4$, $y(2{,}01) = 8{,}120601 - 4{,}02 = 4{,}100601$; cociente $\approx 10{,}06 \to 10$.
Respuesta: B.

<!-- M8.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 37
area: matematicas
tema: psa-introduccion-al-analisis-matematico
dificultad: media

Calcula la integral definida $\int_0^2 (3x^2 + 2x)\,dx$.

- A) $10$
- B) $12$
- C) $8$
- D) $14$

**respuesta:** B
**explicacion:** Paso 1 · Antiderivada: $F(x) = x^3 + x^2$.
Paso 2 · Evalúa por Barrow: $F(2) - F(0) = (2^3 + 2^2) - 0 = 8 + 4 = 12$.
Paso 3 · Comprobación: $\int_0^2 3x^2\,dx = 8$ y $\int_0^2 2x\,dx$ (triángulo de base $2$ y altura $4$) $= \frac{2 \times 4}{2} = 4$; suma $8 + 4 = 12$.
Respuesta: B.

<!-- M8.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 38
area: matematicas
tema: psa-introduccion-al-analisis-matematico
dificultad: media

Calcula $\lim_{x \to \infty} \dfrac{4x^2 + 3x - 1}{2x^2 - 5}$.

- A) $0$
- B) $2$
- C) $4$
- D) $\infty$

**respuesta:** B
**explicacion:** Paso 1 · Divide numerador y denominador entre $x^2$: $\dfrac{4 + \frac{3}{x} - \frac{1}{x^2}}{2 - \frac{5}{x^2}}$.
Paso 2 · Cuando $x \to \infty$, los términos con $x$ en el denominador tienden a $0$: $\dfrac{4}{2} = 2$.
Paso 3 · Comprobación con $x = 100$: $\dfrac{40\,299}{19\,995} \approx 2{,}015 \to 2$.
Respuesta: B.

<!-- M8.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 39
area: fisica
tema: psa-mediciones-cifras-significativas-errores-y-convers
dificultad: media

¿Cuántas cifras significativas tiene la medición $0{,}04050\ \text{kg}$?

- A) $3$
- B) $4$
- C) $5$
- D) $6$

**respuesta:** B
**explicacion:** Paso 1 · Los ceros a la izquierda ($0{,}0$) no son significativos; los dígitos desde el primer no nulo ($4$) hasta el final, incluido el cero final tras la coma decimal, sí lo son: $4, 0, 5, 0$.
Paso 2 · Comprobación en notación científica: $4{,}050 \times 10^{-2}\ \text{kg}$ muestra exactamente $4$ dígitos significativos.
Respuesta: B.

<!-- F1.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 40
area: fisica
tema: psa-mediciones-cifras-significativas-errores-y-convers
dificultad: media

Convierte la rapidez de la sangre en una arteria de $36\ \text{km/h}$ a $\text{m/s}$.

- A) $10\ \text{m/s}$
- B) $12\ \text{m/s}$
- C) $15\ \text{m/s}$
- D) $3{,}6\ \text{m/s}$

**respuesta:** A
**explicacion:** Paso 1 · Divide entre $3{,}6$: $\dfrac{36}{3{,}6} = 10\ \text{m/s}$.
Paso 2 · Comprobación por factores: $36\,\dfrac{\text{km}}{\text{h}} \times \dfrac{1000\ \text{m}}{1\ \text{km}} \times \dfrac{1\ \text{h}}{3600\ \text{s}} = \dfrac{36\,000}{3600} = 10\ \text{m/s}$.
Respuesta: A.

<!-- F1.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 41
area: fisica
tema: psa-mediciones-cifras-significativas-errores-y-convers
dificultad: media

Una jeringa tiene una capacidad de $5\ \text{mL}$. ¿A cuántos metros cúbicos ($\text{m}^3$) equivale?

- A) $5 \times 10^{-3}\ \text{m}^3$
- B) $5 \times 10^{-5}\ \text{m}^3$
- C) $5 \times 10^{-6}\ \text{m}^3$
- D) $5 \times 10^{-9}\ \text{m}^3$

**respuesta:** C
**explicacion:** Paso 1 · $1\ \text{mL} = 1\ \text{cm}^3 = (10^{-2}\ \text{m})^3 = 10^{-6}\ \text{m}^3$.
Paso 2 · Por tanto, $5\ \text{mL} = 5 \times 10^{-6}\ \text{m}^3$. Comprobación: $1\ \text{m}^3 = 1000\ \text{L} = 10^6\ \text{mL}$, luego $\frac{5}{10^6} = 5 \times 10^{-6}\ \text{m}^3$.
Respuesta: C.

<!-- F1.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 42
area: fisica
tema: psa-mediciones-cifras-significativas-errores-y-convers
dificultad: media

Al medir la masa de una muestra se obtiene $(20{,}0 \pm 0{,}5)\ \text{g}$. ¿Cuál es el error porcentual de la medición?

- A) $0{,}5\%$
- B) $2{,}5\%$
- C) $4{,}0\%$
- D) $5{,}0\%$

**respuesta:** B
**explicacion:** Paso 1 · Error relativo: $e_r = \dfrac{0{,}5}{20{,}0} = 0{,}025$.
Paso 2 · Error porcentual: $0{,}025 \times 100\% = 2{,}5\%$. Comprobación: $2{,}5\%$ de $20 = \frac{2{,}5 \times 20}{100} = 0{,}5$.
Respuesta: B.

<!-- F1.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 43
area: fisica
tema: psa-mediciones-cifras-significativas-errores-y-convers
dificultad: media

Realiza la suma respetando cifras significativas: $12{,}45\ \text{g} + 3{,}2\ \text{g} + 0{,}128\ \text{g}$.

- A) $15{,}778\ \text{g}$
- B) $15{,}78\ \text{g}$
- C) $15{,}8\ \text{g}$
- D) $16\ \text{g}$

**respuesta:** C
**explicacion:** Paso 1 · Suma exacta: $12{,}45 + 3{,}2 + 0{,}128 = 15{,}778\ \text{g}$.
Paso 2 · En suma/resta manda el sumando con menos decimales ($3{,}2$ tiene $1$ decimal); redondeando $15{,}778$ a $1$ decimal queda $15{,}8\ \text{g}$.
Respuesta: C.

<!-- F1.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 44
area: fisica
tema: psa-ondas-mecanicas-electromagneticas-y-sonido
dificultad: media

Un equipo de ecografía médica emite ultrasonido de frecuencia $2\ \text{MHz}$ que se propaga en tejido blando a $1500\ \text{m/s}$. ¿Cuál es su longitud de onda?

- A) $0{,}75\ \text{mm}$
- B) $1{,}5\ \text{mm}$
- C) $3{,}0\ \text{mm}$
- D) $0{,}30\ \text{mm}$

**respuesta:** A
**explicacion:** Paso 1 · $\lambda = \dfrac{v}{f} = \dfrac{1500\ \text{m/s}}{2 \times 10^6\ \text{Hz}} = 7{,}5 \times 10^{-4}\ \text{m}$.
Paso 2 · En milímetros: $7{,}5 \times 10^{-4} \times 10^3 = 0{,}75\ \text{mm}$. Comprobación: $f \cdot \lambda = (2 \times 10^6)(7{,}5 \times 10^{-4}) = 1500\ \text{m/s}$.
Respuesta: A.

<!-- F2.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 45
area: fisica
tema: psa-ondas-mecanicas-electromagneticas-y-sonido
dificultad: media

Una onda periódica tiene un período $T = 0{,}02\ \text{s}$. ¿Cuál es su frecuencia?

- A) $20\ \text{Hz}$
- B) $50\ \text{Hz}$
- C) $100\ \text{Hz}$
- D) $0{,}02\ \text{Hz}$

**respuesta:** B
**explicacion:** Paso 1 · $f = \dfrac{1}{T} = \dfrac{1}{0{,}02\ \text{s}} = \dfrac{100}{2} = 50\ \text{Hz}$.
Paso 2 · Comprobación: $50\ \text{ciclos/s} \times 0{,}02\ \text{s/ciclo} = 1$.
Respuesta: B.

<!-- F2.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 46
area: fisica
tema: psa-ondas-mecanicas-electromagneticas-y-sonido
dificultad: media

Una persona emite un grito frente a un muro y escucha el eco $1{,}6\ \text{s}$ después. Si la rapidez del sonido es $340\ \text{m/s}$, ¿a qué distancia está el muro?

- A) $544\ \text{m}$
- B) $272\ \text{m}$
- C) $136\ \text{m}$
- D) $340\ \text{m}$

**respuesta:** B
**explicacion:** Paso 1 · El sonido recorre ida y vuelta ($2d = v \cdot t$): $d = \dfrac{340 \times 1{,}6}{2} = 340 \times 0{,}8 = 272\ \text{m}$.
Paso 2 · Comprobación: tarda $0{,}8\ \text{s}$ en ir ($340 \times 0{,}8 = 272\ \text{m}$) y $0{,}8\ \text{s}$ en volver; total $1{,}6\ \text{s}$.
Respuesta: B.

<!-- F2.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 47
area: fisica
tema: psa-ondas-mecanicas-electromagneticas-y-sonido
dificultad: media

¿Cuál de las siguientes ondas **no** puede propagarse en el vacío?

- A) Rayos X
- B) Luz visible
- C) Ultrasonido
- D) Microondas

**respuesta:** C
**explicacion:** Paso 1 · El ultrasonido es una onda mecánica (sonora de alta frecuencia) y requiere un medio material elástico.
Paso 2 · Comprobación: rayos X, luz visible y microondas pertenecen al espectro electromagnético y sí viajan en el vacío.
Respuesta: C.

<!-- F2.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 48
area: fisica
tema: psa-ondas-mecanicas-electromagneticas-y-sonido
dificultad: media

Un pulso electromagnético en el vacío ($c = 3 \times 10^8\ \text{m/s}$) tiene longitud de onda $\lambda = 600\ \text{nm}$. ¿Cuál es su frecuencia?

- A) $5 \times 10^{14}\ \text{Hz}$
- B) $2 \times 10^{14}\ \text{Hz}$
- C) $5 \times 10^{11}\ \text{Hz}$
- D) $1{,}8 \times 10^{17}\ \text{Hz}$

**respuesta:** A
**explicacion:** Paso 1 · Convierte $\lambda = 600 \times 10^{-9}\ \text{m} = 6 \times 10^{-7}\ \text{m}$.
Paso 2 · $f = \dfrac{c}{\lambda} = \dfrac{3 \times 10^8}{6 \times 10^{-7}} = 0{,}5 \times 10^{15} = 5 \times 10^{14}\ \text{Hz}$.
Paso 3 · Comprobación: $(5 \times 10^{14})(6 \times 10^{-7}) = 30 \times 10^7 = 3 \times 10^8\ \text{m/s}$.
Respuesta: A.

<!-- F2.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 49
area: fisica
tema: psa-optica-geometrica
dificultad: media

Un rayo de luz incide desde el aire ($n_1 = 1$) sobre un vidrio formando $30^\circ$ con la normal. Si el índice de refracción del vidrio es $1{,}5$, ¿cuál es el seno del ángulo de refracción?

- A) $\dfrac{1}{3}$
- B) $\dfrac{1}{2}$
- C) $\dfrac{3}{4}$
- D) $\dfrac{2}{3}$

**respuesta:** A
**explicacion:** Paso 1 · Ley de Snell: $n_1 \text{sen}\,\theta_1 = n_2 \text{sen}\,\theta_2 \Rightarrow 1 \cdot \text{sen}\,30^\circ = 1{,}5\,\text{sen}\,\theta_2$.
Paso 2 · $\text{sen}\,\theta_2 = \dfrac{0{,}5}{1{,}5} = \dfrac{1}{3}$. Comprobación: $1{,}5 \times \frac{1}{3} = 0{,}5 = \text{sen}\,30^\circ$.
Respuesta: A.

<!-- F3.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 50
area: fisica
tema: psa-optica-geometrica
dificultad: media

¿Cuál es la rapidez de la luz dentro de la córnea humana si su índice de refracción es aproximadamente $n = 1{,}38$? (Usa $c = 3{,}00 \times 10^8\ \text{m/s}$).

- A) $2{,}17 \times 10^8\ \text{m/s}$
- B) $4{,}14 \times 10^8\ \text{m/s}$
- C) $1{,}38 \times 10^8\ \text{m/s}$
- D) $2{,}50 \times 10^8\ \text{m/s}$

**respuesta:** A
**explicacion:** Paso 1 · $v = \dfrac{c}{n} = \dfrac{3{,}00 \times 10^8}{1{,}38} \approx 2{,}17 \times 10^8\ \text{m/s}$.
Paso 2 · Comprobación: $2{,}174 \times 1{,}38 \approx 3{,}00$.
Respuesta: A.

<!-- F3.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 51
area: fisica
tema: psa-optica-geometrica
dificultad: media

Un objeto se coloca a $30\ \text{cm}$ frente a una lente convergente de distancia focal $f = 10\ \text{cm}$. ¿A qué distancia de la lente se forma la imagen?

- A) $15\ \text{cm}$
- B) $20\ \text{cm}$
- C) $7{,}5\ \text{cm}$
- D) $30\ \text{cm}$

**respuesta:** A
**explicacion:** Paso 1 · Ecuación de lentes delgadas: $\dfrac{1}{f} = \dfrac{1}{d_o} + \dfrac{1}{d_i} \Rightarrow \dfrac{1}{10} = \dfrac{1}{30} + \dfrac{1}{d_i}$.
Paso 2 · $\dfrac{1}{d_i} = \dfrac{3 - 1}{30} = \dfrac{2}{30} = \dfrac{1}{15} \Rightarrow d_i = 15\ \text{cm}$.
Paso 3 · Comprobación por fórmula directa: $d_i = \dfrac{d_o f}{d_o - f} = \dfrac{30 \times 10}{30 - 10} = \dfrac{300}{20} = 15\ \text{cm}$.
Respuesta: A.

<!-- F3.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 52
area: fisica
tema: psa-optica-geometrica
dificultad: media

Un espejo esférico cóncavo tiene radio de curvatura $R = 40\ \text{cm}$. ¿Cuál es su distancia focal?

- A) $10\ \text{cm}$
- B) $20\ \text{cm}$
- C) $40\ \text{cm}$
- D) $80\ \text{cm}$

**respuesta:** B
**explicacion:** Paso 1 · En espejos esféricos, $f = \dfrac{R}{2} = \dfrac{40}{2} = 20\ \text{cm}$.
Paso 2 · Comprobación: $R = 2f = 2(20) = 40\ \text{cm}$.
Respuesta: B.

<!-- F3.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 53
area: fisica
tema: psa-calor-y-temperatura
dificultad: media

La temperatura corporal normal es $37\,^\circ\text{C}$. ¿A cuántos grados Fahrenheit ($^\circ\text{F}$) equivale?

- A) $96{,}8\,^\circ\text{F}$
- B) $98{,}6\,^\circ\text{F}$
- C) $100{,}4\,^\circ\text{F}$
- D) $94{,}6\,^\circ\text{F}$

**respuesta:** B
**explicacion:** Paso 1 · $T_F = \dfrac{9}{5}T_C + 32 = 1{,}8(37) + 32 = 66{,}6 + 32 = 98{,}6\,^\circ\text{F}$.
Paso 2 · Comprobación inversa: $T_C = \dfrac{5}{9}(98{,}6 - 32) = \dfrac{5}{9}(66{,}6) = 5 \times 7{,}4 = 37\,^\circ\text{C}$.
Respuesta: B.

<!-- F4.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 54
area: fisica
tema: psa-calor-y-temperatura
dificultad: media

Un paciente presenta un aumento de temperatura de $\Delta T = 2{,}5\,^\circ\text{C}$. ¿A cuánto equivale esa variación en kelvins ($\text{K}$)?

- A) $275{,}65\ \text{K}$
- B) $2{,}5\ \text{K}$
- C) $4{,}5\ \text{K}$
- D) $270{,}65\ \text{K}$

**respuesta:** B
**explicacion:** Paso 1 · Las divisiones de las escalas Celsius y Kelvin tienen el mismo tamaño, por lo que $\Delta T(\text{K}) = \Delta T(^\circ\text{C}) = 2{,}5\ \text{K}$.
Paso 2 · Comprobación: $(39{,}5 + 273{,}15) - (37 + 273{,}15) = 2{,}5\ \text{K}$.
Respuesta: B.

<!-- F4.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 55
area: fisica
tema: psa-calor-y-temperatura
dificultad: media

Una varilla metálica de $2\ \text{m}$ de longitud ($\alpha = 1{,}5 \times 10^{-5}\ ^\circ\text{C}^{-1}$) se calienta de $20\,^\circ\text{C}$ a $120\,^\circ\text{C}$. ¿Cuánto se dilata?

- A) $1{,}5\ \text{mm}$
- B) $3{,}0\ \text{mm}$
- C) $0{,}30\ \text{mm}$
- D) $6{,}0\ \text{mm}$

**respuesta:** B
**explicacion:** Paso 1 · $\Delta L = L_0 \alpha \Delta T = 2 \times (1{,}5 \times 10^{-5}) \times (120 - 20) = 2 \times 1{,}5 \times 10^{-5} \times 100 = 3{,}0 \times 10^{-3}\ \text{m}$.
Paso 2 · En milímetros: $3{,}0\ \text{mm}$. Comprobación: cada metro se alarga $1{,}5 \times 10^{-3}\ \text{m}$ en $100\,^\circ\text{C}$; $2\ \text{m}$ se alargan $3{,}0\ \text{mm}$.
Respuesta: B.

<!-- F4.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 56
area: fisica
tema: psa-calor-y-temperatura
dificultad: media

¿Cuánto calor se necesita para elevar la temperatura de $500\ \text{g}$ de agua ($c = 1\ \text{cal/g}\cdot^\circ\text{C}$) desde $20\,^\circ\text{C}$ hasta $80\,^\circ\text{C}$?

- A) $30\ \text{kcal}$
- B) $40\ \text{kcal}$
- C) $10\ \text{kcal}$
- D) $300\ \text{kcal}$

**respuesta:** A
**explicacion:** Paso 1 · $Q = m c \Delta T = 500 \times 1 \times (80 - 20) = 500 \times 60 = 30\,000\ \text{cal} = 30\ \text{kcal}$.
Paso 2 · Comprobación: $0{,}5\ \text{kg} \times 1\ \text{kcal/kg}\cdot^\circ\text{C} \times 60\,^\circ\text{C} = 30\ \text{kcal}$.
Respuesta: A.

<!-- F4.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 57
area: fisica
tema: psa-estatica-y-maquinas-simples
dificultad: media

Un hueso del antebrazo actúa como palanca con un brazo de resistencia de $30\ \text{cm}$ sosteniendo una carga de $40\ \text{N}$. Si el bíceps tira a $5\ \text{cm}$ del codo (fulcro), ¿qué fuerza muscular mínima requiere para mantener el equilibrio?

- A) $240\ \text{N}$
- B) $120\ \text{N}$
- C) $600\ \text{N}$
- D) $150\ \text{N}$

**respuesta:** A
**explicacion:** Paso 1 · Equilibrio de torques respecto al codo: $F \cdot d_F = R \cdot d_R \Rightarrow F(5) = 40(30)$.
Paso 2 · $F = \dfrac{1200}{5} = 240\ \text{N}$. Comprobación: la ventaja mecánica es $\frac{5}{30} = \frac{1}{6}$, luego $F = 6 \times 40 = 240\ \text{N}$.
Respuesta: A.

<!-- F5.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 58
area: fisica
tema: psa-estatica-y-maquinas-simples
dificultad: media

Una barra uniforme de $4\ \text{m}$ y peso despreciable está apoyada en su centro. En el extremo izquierdo se cuelga un peso de $60\ \text{N}$. ¿A qué distancia del apoyo (hacia la derecha) debe colocarse un peso de $80\ \text{N}$ para equilibrarla?

- A) $1{,}5\ \text{m}$
- B) $2{,}0\ \text{m}$
- C) $3{,}0\ \text{m}$
- D) $1{,}0\ \text{m}$

**respuesta:** A
**explicacion:** Paso 1 · Brazo izquierdo $= 2\ \text{m}$. Por suma de momentos nula: $60(2) = 80 \cdot x \Rightarrow x = \dfrac{120}{80} = 1{,}5\ \text{m}$ (cabe: el brazo derecho mide $2\ \text{m}$).
Paso 2 · Comprobación: torque horario $80 \times 1{,}5 = 120\ \text{N}\cdot\text{m}$ iguala al antihorario $60 \times 2 = 120\ \text{N}\cdot\text{m}$.
Respuesta: A.

<!-- F5.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 59
area: fisica
tema: psa-estatica-y-maquinas-simples
dificultad: media

Un bloque de $100\ \text{N}$ cuelga de un cable vertical y es jalado horizontalmente hasta que el cable forma $37^\circ$ con la vertical ($\cos 37^\circ = 0{,}8$, $\text{sen}\,37^\circ = 0{,}6$). ¿Cuál es la tensión del cable?

- A) $125\ \text{N}$
- B) $80\ \text{N}$
- C) $75\ \text{N}$
- D) $166{,}7\ \text{N}$

**respuesta:** A
**explicacion:** Paso 1 · Equilibrio vertical: $T \cos 37^\circ = W \Rightarrow T(0{,}8) = 100$.
Paso 2 · $T = \dfrac{100}{0{,}8} = 125\ \text{N}$. Comprobación: fuerza horizontal $F = T\,\text{sen}\,37^\circ = 125(0{,}6) = 75\ \text{N}$; $\sqrt{100^2 + 75^2} = 125\ \text{N}$.
Respuesta: A.

<!-- F5.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 60
area: fisica
tema: psa-estatica-y-maquinas-simples
dificultad: media

Un aparejo de poleas tiene una ventaja mecánica ideal de $4$. ¿Qué fuerza mínima se necesita para levantar un paciente de $800\ \text{N}$ sin fricción?

- A) $100\ \text{N}$
- B) $200\ \text{N}$
- C) $400\ \text{N}$
- D) $3200\ \text{N}$

**respuesta:** B
**explicacion:** Paso 1 · $F = \dfrac{W}{\text{VM}} = \dfrac{800}{4} = 200\ \text{N}$.
Paso 2 · Comprobación por trabajo virtual: si el peso sube $1\ \text{m}$ ($800\ \text{J}$), la mano jala $4\ \text{m}$ de cuerda: $200 \times 4 = 800\ \text{J}$.
Respuesta: B.

<!-- F5.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 61
area: fisica
tema: psa-estatica-y-maquinas-simples
dificultad: media

Un plano inclinado liso de $5\ \text{m}$ de longitud eleva una camilla de $600\ \text{N}$ hasta una altura de $1{,}5\ \text{m}$. ¿Qué fuerza paralela al plano se requiere para subirla a velocidad constante?

- A) $180\ \text{N}$
- B) $200\ \text{N}$
- C) $150\ \text{N}$
- D) $300\ \text{N}$

**respuesta:** A
**explicacion:** Paso 1 · $\text{sen}\,\theta = \dfrac{h}{L} = \dfrac{1{,}5}{5} = 0{,}3$.
Paso 2 · $F = W\,\text{sen}\,\theta = 600 \times 0{,}3 = 180\ \text{N}$. Comprobación por trabajo: $F \cdot L = 180 \times 5 = 900\ \text{J} = W \cdot h = 600 \times 1{,}5$.
Respuesta: A.

<!-- F5.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 62
area: fisica
tema: psa-dinamica-circular-y-gravitacion-universal
dificultad: media

Un rotor de centrífuga clínica de radio $0{,}10\ \text{m}$ gira a $100\ \text{rad/s}$. ¿Qué fuerza centrípeta actúa sobre una muestra de $0{,}02\ \text{kg}$?

- A) $20\ \text{N}$
- B) $2\ \text{N}$
- C) $200\ \text{N}$
- D) $0{,}2\ \text{N}$

**respuesta:** A
**explicacion:** Paso 1 · $F_c = m \omega^2 r = 0{,}02 \times (100)^2 \times 0{,}10 = 0{,}02 \times 10\,000 \times 0{,}10 = 20\ \text{N}$.
Paso 2 · Comprobación con $v = \omega r = 10\ \text{m/s}$: $F_c = \dfrac{mv^2}{r} = \dfrac{0{,}02 \times 100}{0{,}10} = 20\ \text{N}$.
Respuesta: A.

<!-- F6.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 63
area: fisica
tema: psa-dinamica-circular-y-gravitacion-universal
dificultad: media

Un automóvil de $1000\ \text{kg}$ toma una curva plana de radio $40\ \text{m}$ a $20\ \text{m/s}$. ¿Cuál es la fuerza de rozamiento estático necesaria para que no derrape?

- A) $5000\ \text{N}$
- B) $10\,000\ \text{N}$
- C) $20\,000\ \text{N}$
- D) $2500\ \text{N}$

**respuesta:** B
**explicacion:** Paso 1 · $f_s = F_c = \dfrac{mv^2}{r} = \dfrac{1000 \times 20^2}{40} = \dfrac{400\,000}{40} = 10\,000\ \text{N}$.
Paso 2 · Comprobación: $a_c = \frac{400}{40} = 10\ \text{m/s}^2$, luego $F_c = 1000 \times 10 = 10\,000\ \text{N}$.
Respuesta: B.

<!-- F6.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 64
area: fisica
tema: psa-dinamica-circular-y-gravitacion-universal
dificultad: media

Dos masas se atraen con una fuerza gravitatoria de $36\ \text{N}$ cuando están separadas una distancia $d$. Si la distancia se triplica ($3d$), ¿cuál será la nueva fuerza de atracción?

- A) $12\ \text{N}$
- B) $4\ \text{N}$
- C) $9\ \text{N}$
- D) $108\ \text{N}$

**respuesta:** B
**explicacion:** Paso 1 · Por la Ley de Gravitación Universal ($F \propto \dfrac{1}{d^2}$): al triplicar $d$, la fuerza disminuye por $3^2 = 9$.
Paso 2 · $F' = \dfrac{36}{9} = 4\ \text{N}$. Comprobación: $4 \times 3^2 = 36\ \text{N}$.
Respuesta: B.

<!-- F6.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 65
area: fisica
tema: psa-dinamica-circular-y-gravitacion-universal
dificultad: media

Un planeta orbita alrededor de una estrella de igual masa que el Sol, a una distancia media $4$ veces mayor que la distancia Tierra-Sol ($r = 4\ \text{UA}$). Según la 3ra Ley de Kepler, ¿cuál es su período orbital en años terrestres?

- A) $4\ \text{años}$
- B) $8\ \text{años}$
- C) $16\ \text{años}$
- D) $64\ \text{años}$

**respuesta:** B
**explicacion:** Paso 1 · $\left(\dfrac{T}{T_0}\right)^2 = \left(\dfrac{r}{r_0}\right)^3 \Rightarrow T^2 = 4^3 = 64$.
Paso 2 · $T = \sqrt{64} = 8\ \text{años}$. Comprobación: $8^2 = 64 = 4^3$.
Respuesta: B.

<!-- F6.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 66
area: fisica
tema: psa-dinamica-circular-y-gravitacion-universal
dificultad: media

En un punto a una altura igual al radio terrestre ($h = R_T$) sobre la superficie de la Tierra, ¿cuánto vale la aceleración de la gravedad en función de $g_0$ (en la superficie)?

- A) $\dfrac{g_0}{2}$
- B) $\dfrac{g_0}{4}$
- C) $\dfrac{g_0}{8}$
- D) $2g_0$

**respuesta:** B
**explicacion:** Paso 1 · La distancia al centro de la Tierra es $r = R_T + R_T = 2R_T$.
Paso 2 · Como $g = \dfrac{GM}{r^2}$, se obtiene $g = \dfrac{g_0}{2^2} = \dfrac{g_0}{4}$. Comprobación: $(2)^2 = 4$.
Respuesta: B.

<!-- F6.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 67
area: fisica
tema: psa-impulso-cantidad-de-movimiento-y-colisiones
dificultad: media

Una pelota de $0{,}4\ \text{kg}$ recibe un golpe de $100\ \text{N}$ durante $0{,}05\ \text{s}$ partiendo del reposo. ¿Qué rapidez adquiere?

- A) $12{,}5\ \text{m/s}$
- B) $5{,}0\ \text{m/s}$
- C) $25\ \text{m/s}$
- D) $2{,}0\ \text{m/s}$

**respuesta:** A
**explicacion:** Paso 1 · Impulso: $J = F \Delta t = 100 \times 0{,}05 = 5\ \text{N}\cdot\text{s}$.
Paso 2 · $J = m \Delta v \Rightarrow v = \dfrac{5}{0{,}4} = 12{,}5\ \text{m/s}$. Comprobación por cinemática: $a = \frac{100}{0{,}4} = 250\ \text{m/s}^2$, $v = 250 \times 0{,}05 = 12{,}5\ \text{m/s}$.
Respuesta: A.

<!-- F7.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 68
area: fisica
tema: psa-impulso-cantidad-de-movimiento-y-colisiones
dificultad: media

Un carrito de $3\ \text{kg}$ que viaja a $4\ \text{m/s}$ choca y queda pegado a otro de $1\ \text{kg}$ inicialmente en reposo. ¿Cuál es la rapidez común tras el choque?

- A) $3\ \text{m/s}$
- B) $2\ \text{m/s}$
- C) $1\ \text{m/s}$
- D) $4\ \text{m/s}$

**respuesta:** A
**explicacion:** Paso 1 · Conservación de $p$: $m_1 v_1 = (m_1 + m_2) v_f \Rightarrow 3(4) = (3 + 1)v_f$.
Paso 2 · $v_f = \dfrac{12}{4} = 3\ \text{m/s}$. Comprobación: momento inicial $12\ \text{kg}\cdot\text{m/s}$; momento final $4 \times 3 = 12\ \text{kg}\cdot\text{m/s}$.
Respuesta: A.

<!-- F7.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 69
area: fisica
tema: psa-impulso-cantidad-de-movimiento-y-colisiones
dificultad: media

Dos esferas de masas iguales chocan elásticamente de frente con rapideces de $6\ \text{m/s}$ hacia la derecha y $2\ \text{m/s}$ hacia la izquierda. ¿Cuál es la rapidez de la primera después del choque?

- A) $2\ \text{m/s}$ hacia la izquierda
- B) $6\ \text{m/s}$ hacia la izquierda
- C) $4\ \text{m/s}$ hacia la derecha
- D) $2\ \text{m/s}$ hacia la derecha

**respuesta:** A
**explicacion:** Paso 1 · En un choque elástico 1D de masas iguales, las partículas intercambian velocidades.
Paso 2 · La primera queda con $v_1' = -2\ \text{m/s}$ ($2\ \text{m/s}$ hacia la izquierda) y la segunda con $+6\ \text{m/s}$.
Paso 3 · Comprobación: $p_i = m(6-2) = 4m$, $p_f = m(-2+6) = 4m$; $e = \frac{6 - (-2)}{6 - (-2)} = 1$.
Respuesta: A.

<!-- F7.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 70
area: fisica
tema: psa-impulso-cantidad-de-movimiento-y-colisiones
dificultad: media

Un arma de $4\ \text{kg}$ dispara un proyectil de $20\ \text{g}$ a $400\ \text{m/s}$. ¿Cuál es la rapidez de retroceso del arma?

- A) $2\ \text{m/s}$
- B) $4\ \text{m/s}$
- C) $1\ \text{m/s}$
- D) $0{,}5\ \text{m/s}$

**respuesta:** A
**explicacion:** Paso 1 · $m_p = 0{,}02\ \text{kg}$. Conservación del momento (inicial $0$): $4 v_a = 0{,}02 \times 400 = 8$.
Paso 2 · $v_a = \dfrac{8}{4} = 2\ \text{m/s}$. Comprobación: $4 \times 2 = 8 = 0{,}02 \times 400$.
Respuesta: A.

<!-- F7.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 71
area: fisica
tema: psa-impulso-cantidad-de-movimiento-y-colisiones
dificultad: media

Una bola cae verticalmente y rebota alcanzando $1{,}44\ \text{m}$ tras caer desde $2{,}25\ \text{m}$. ¿Cuál es el coeficiente de restitución $e$ con el suelo?

- A) $0{,}64$
- B) $0{,}80$
- C) $0{,}75$
- D) $0{,}90$

**respuesta:** B
**explicacion:** Paso 1 · $e = \sqrt{\dfrac{h_{\text{rebote}}}{h_{\text{caída}}}} = \sqrt{\dfrac{1{,}44}{2{,}25}} = \dfrac{1{,}2}{1{,}5} = 0{,}80$.
Paso 2 · Comprobación con $g=10$: $v_{\text{antes}} = \sqrt{2(10)(2{,}25)} = \sqrt{45} = 3\sqrt{5}$, $v_{\text{después}} = \sqrt{2(10)(1{,}44)} = \sqrt{28{,}8} = 2{,}4\sqrt{5}$; $e = \frac{2{,}4}{3} = 0{,}80$.
Respuesta: B.

<!-- F7.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 72
area: fisica
tema: psa-hidrostatica-e-hidrodinamica
dificultad: media

Calcula la presión hidrostática ejercida por una columna de suero ($\rho = 1000\ \text{kg/m}^3$) de $1{,}2\ \text{m}$ de altura ($g = 10\ \text{m/s}^2$).

- A) $1200\ \text{Pa}$
- B) $12\,000\ \text{Pa}$
- C) $120\ \text{Pa}$
- D) $1{,}2 \times 10^5\ \text{Pa}$

**respuesta:** B
**explicacion:** Paso 1 · $P = \rho g h = 1000 \times 10 \times 1{,}2 = 12\,000\ \text{Pa}$.
Paso 2 · Comprobación: cada metro de agua aporta $10\,000\ \text{Pa}$; $1{,}2\ \text{m}$ aporta $12\,000\ \text{Pa}$.
Respuesta: B.

<!-- F8.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 73
area: fisica
tema: psa-hidrostatica-e-hidrodinamica
dificultad: media

En una prensa hidráulica, los émbolos tienen áreas de $5\ \text{cm}^2$ y $200\ \text{cm}^2$. Si se aplica $50\ \text{N}$ sobre el émbolo menor, ¿qué fuerza se obtiene en el mayor?

- A) $2000\ \text{N}$
- B) $1000\ \text{N}$
- C) $4000\ \text{N}$
- D) $500\ \text{N}$

**respuesta:** A
**explicacion:** Paso 1 · Principio de Pascal: $\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2} \Rightarrow F_2 = 50 \times \dfrac{200}{5} = 50 \times 40 = 2000\ \text{N}$.
Paso 2 · Comprobación: presión transmitida $P = \frac{50}{5} = 10\ \text{N/cm}^2$; $F_2 = 10 \times 200 = 2000\ \text{N}$.
Respuesta: A.

<!-- F8.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 74
area: fisica
tema: psa-hidrostatica-e-hidrodinamica
dificultad: media

Un objeto de volumen $2 \times 10^{-3}\ \text{m}^3$ se sumerge totalmente en agua ($\rho = 1000\ \text{kg/m}^3$, $g = 10\ \text{m/s}^2$). ¿Cuál es el empuje que recibe?

- A) $2\ \text{N}$
- B) $20\ \text{N}$
- C) $200\ \text{N}$
- D) $10\ \text{N}$

**respuesta:** B
**explicacion:** Paso 1 · Principio de Arquímedes: $E = \rho g V = 1000 \times 10 \times (2 \times 10^{-3}) = 20\ \text{N}$.
Paso 2 · Comprobación: $2 \times 10^{-3}\ \text{m}^3 = 2\ \text{L}$ de agua desalojada, cuya masa es $2\ \text{kg}$ y peso $2 \times 10 = 20\ \text{N}$.
Respuesta: B.

<!-- F8.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 75
area: fisica
tema: psa-hidrostatica-e-hidrodinamica
dificultad: media

Por una arteria de sección $0{,}4\ \text{cm}^2$ fluye sangre a $25\ \text{cm/s}$. Si la arteria se estrecha a $0{,}2\ \text{cm}^2$, ¿cuál será la nueva rapidez de la sangre?

- A) $12{,}5\ \text{cm/s}$
- B) $50\ \text{cm/s}$
- C) $100\ \text{cm/s}$
- D) $25\ \text{cm/s}$

**respuesta:** B
**explicacion:** Paso 1 · Ecuación de continuidad: $A_1 v_1 = A_2 v_2 \Rightarrow 0{,}4(25) = 0{,}2\, v_2$.
Paso 2 · $v_2 = \dfrac{10}{0{,}2} = 50\ \text{cm/s}$. Comprobación: al reducirse el área a la mitad, la rapidez se duplica ($2 \times 25 = 50\ \text{cm/s}$).
Respuesta: B.

<!-- F8.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 76
area: fisica
tema: psa-hidrostatica-e-hidrodinamica
dificultad: media

Un tanque abierto de agua tiene un pequeño orificio a $5\ \text{m}$ por debajo de la superficie libre ($g = 10\ \text{m/s}^2$). ¿Con qué rapidez sale el agua por el orificio?

- A) $5\ \text{m/s}$
- B) $10\ \text{m/s}$
- C) $50\ \text{m/s}$
- D) $100\ \text{m/s}$

**respuesta:** B
**explicacion:** Paso 1 · Teorema de Torricelli: $v = \sqrt{2gh} = \sqrt{2(10)(5)} = \sqrt{100} = 10\ \text{m/s}$.
Paso 2 · Comprobación por energía: $\frac{1}{2}v^2 = gh \Rightarrow \frac{1}{2}(100) = 10(5) = 50\ \text{J/kg}$.
Respuesta: B.

<!-- F8.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 77
area: fisica
tema: psa-campo-magnetico-y-electromagnetismo
dificultad: media

Un protón ($q = 1{,}6 \times 10^{-19}\ \text{C}$) entra perpendicularmente a un campo magnético uniforme $B = 0{,}5\ \text{T}$ con rapidez $v = 2 \times 10^6\ \text{m/s}$. ¿Cuál es la magnitud de la fuerza magnética?

- A) $1{,}6 \times 10^{-13}\ \text{N}$
- B) $3{,}2 \times 10^{-13}\ \text{N}$
- C) $0{,}8 \times 10^{-13}\ \text{N}$
- D) $0\ \text{N}$

**respuesta:** A
**explicacion:** Paso 1 · $F = q v B\,\text{sen}\,90^\circ = (1{,}6 \times 10^{-19})(2 \times 10^6)(0{,}5)(1) = 1{,}6 \times 10^{-13}\ \text{N}$.
Paso 2 · Comprobación: $(2 \times 10^6)(0{,}5) = 10^6$, multiplicado por $1{,}6 \times 10^{-19}$ da $1{,}6 \times 10^{-13}\ \text{N}$.
Respuesta: A.

<!-- F9.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 78
area: fisica
tema: psa-campo-magnetico-y-electromagnetismo
dificultad: media

¿Qué fuerza magnética actúa sobre una carga positiva que se mueve **paralela** a las líneas de un campo magnético uniforme?

- A) Máxima ($qvB$)
- B) Cero
- C) $\frac{1}{2}qvB$
- D) Depende solo de la masa

**respuesta:** B
**explicacion:** Paso 1 · El ángulo entre $\vec{v}$ y $\vec{B}$ es $0^\circ$ (o $180^\circ$), por lo que $F = qvB\,\text{sen}\,0^\circ = 0$.
Paso 2 · Comprobación: el producto vectorial $\vec{v} \times \vec{B}$ de vectores paralelos es siempre el vector nulo.
Respuesta: B.

<!-- F9.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 79
area: fisica
tema: psa-campo-magnetico-y-electromagnetismo
dificultad: media

Si una partícula cargada ingresa perpendicularmente a un campo magnético uniforme y se duplica su rapidez $v$, ¿cómo cambia el radio $r$ de su trayectoria circular?

- A) Se reduce a la mitad
- B) Se duplica
- C) Se cuadruplica
- D) No cambia

**respuesta:** B
**explicacion:** Paso 1 · Igualando fuerza magnética y centrípeta: $qvB = \dfrac{mv^2}{r} \Rightarrow r = \dfrac{mv}{qB}$.
Paso 2 · Como $r \propto v$, al duplicar $v$ el radio también se duplica. Comprobación: $\frac{m(2v)}{qB} = 2\left(\frac{mv}{qB}\right)$.
Respuesta: B.

<!-- F9.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 80
area: fisica
tema: psa-campo-magnetico-y-electromagnetismo
dificultad: media

Un conductor recto largo transporta una corriente $I$. A una distancia $d$ produce un campo magnético $B$. ¿Cuánto vale el campo a una distancia $2d$?

- A) $2B$
- B) $\dfrac{B}{2}$
- C) $\dfrac{B}{4}$
- D) $4B$

**respuesta:** B
**explicacion:** Paso 1 · El campo de un hilo recto es $B = \dfrac{\mu_0 I}{2\pi d}$, inversamente proporcional a $d$.
Paso 2 · Al duplicar $d$, el campo se reduce a la mitad: $\dfrac{B}{2}$. Comprobación: $\frac{1}{2d} = \frac{1}{2}\left(\frac{1}{d}\right)$.
Respuesta: B.

<!-- F9.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 81
area: quimica
tema: psa-tabla-periodica-y-propiedades-periodicas
dificultad: media

Un átomo neutro tiene configuración electrónica $1s^2\,2s^2\,2p^6\,3s^2\,3p^4$. ¿A qué periodo y grupo pertenece?

- A) Periodo 3, Grupo VIA (16)
- B) Periodo 3, Grupo IVA (14)
- C) Periodo 4, Grupo VIA (16)
- D) Periodo 2, Grupo VIA (16)

**respuesta:** A
**explicacion:** Paso 1 · El nivel máximo ocupado es $n = 3$ (Periodo 3).
Paso 2 · Los electrones de valencia en $n=3$ son $2 + 4 = 6$ (Grupo VIA o 16). Comprobación: $Z = 16$ corresponde al azufre ($\mathrm{S}$), Periodo 3, Grupo 16.
Respuesta: A.

<!-- Q1.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 82
area: quimica
tema: psa-tabla-periodica-y-propiedades-periodicas
dificultad: media

Ordena de **menor a mayor** radio atómico los siguientes elementos del periodo 2: $\mathrm{Li}$ ($Z=3$), $\mathrm{C}$ ($Z=6$), $\mathrm{F}$ ($Z=9$).

- A) $\mathrm{F} < \mathrm{C} < \mathrm{Li}$
- B) $\mathrm{Li} < \mathrm{C} < \mathrm{F}$
- C) $\mathrm{C} < \mathrm{F} < \mathrm{Li}$
- D) $\mathrm{F} < \mathrm{Li} < \mathrm{C}$

**respuesta:** A
**explicacion:** Paso 1 · En un mismo periodo, al aumentar $Z$ crece la carga nuclear efectiva y atrae más a los electrones del mismo nivel, disminuyendo el radio.
Paso 2 · Por ello el más pequeño es $\mathrm{F}$ y el mayor es $\mathrm{Li}$: $\mathrm{F} < \mathrm{C} < \mathrm{Li}$. Comprobación: tendencia periódica de izquierda a derecha disminuye el radio.
Respuesta: A.

<!-- Q1.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 83
area: quimica
tema: psa-tabla-periodica-y-propiedades-periodicas
dificultad: media

¿Cuál de los siguientes elementos posee la **mayor electronegatividad**?

- A) $\mathrm{Na}$
- B) $\mathrm{Al}$
- C) $\mathrm{Cl}$
- D) $\mathrm{S}$

**respuesta:** C
**explicacion:** Paso 1 · Todos pertenecen al periodo 3 ($Z$: $\mathrm{Na}=11$, $\mathrm{Al}=13$, $\mathrm{S}=16$, $\mathrm{Cl}=17$).
Paso 2 · La electronegatividad aumenta de izquierda a derecha en un periodo (excluyendo gases nobles), siendo máxima en el halógeno $\mathrm{Cl}$.
Respuesta: C.

<!-- Q1.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 84
area: quimica
tema: psa-tabla-periodica-y-propiedades-periodicas
dificultad: media

Comparando $\mathrm{Na}$ ($Z=11$) con su catión $\mathrm{Na^+}$, ¿cuál tiene menor radio y por qué?

- A) $\mathrm{Na^+}$, porque pierde su nivel de valencia $3s^1$
- B) $\mathrm{Na}$, porque tiene mayor carga nuclear
- C) Tienen el mismo radio
- D) $\mathrm{Na^+}$, porque gana un protón

**respuesta:** A
**explicacion:** Paso 1 · $\mathrm{Na}$ tiene $11$ electrones ($[\mathrm{Ne}]3s^1$), mientras $\mathrm{Na^+}$ tiene $10$ ($[\mathrm{Ne}]$), perdiendo la capa $n=3$.
Paso 2 · Comprobación: todo catión es más pequeño que su átomo neutro porque conserva los mismos $11$ protones atrayendo a menos electrones.
Respuesta: A.

<!-- Q1.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 85
area: quimica
tema: psa-tabla-periodica-y-propiedades-periodicas
dificultad: media

La primera energía de ionización en un grupo de la tabla periódica (de arriba hacia abajo):

- A) Aumenta porque aumenta la masa atómica
- B) Disminuye porque el electrón más externo está más lejos del núcleo
- C) Permanece constante
- D) Aumenta porque hay más capas electrónicas

**respuesta:** B
**explicacion:** Paso 1 · Al bajar en un grupo aumenta $n$ (mayor tamaño atómico y mayor efecto pantalla).
Paso 2 · El electrón de valencia siente menor atracción efectiva y requiere menos energía para ser arrancado.
Respuesta: B.

<!-- Q1.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 86
area: quimica
tema: psa-cinetica-y-equilibrio-quimico
dificultad: media

Para la reacción reversible $2\,\mathrm{SO_2}(g) + \mathrm{O_2}(g) \rightleftharpoons 2\,\mathrm{SO_3}(g)$, ¿cuál es la expresión de $K_c$?

- A) $K_c = \dfrac{[\mathrm{SO_3}]^2}{[\mathrm{SO_2}]^2[\mathrm{O_2}]}$
- B) $K_c = \dfrac{[\mathrm{SO_2}]^2[\mathrm{O_2}]}{[\mathrm{SO_3}]^2}$
- C) $K_c = \dfrac{2[\mathrm{SO_3}]}{2[\mathrm{SO_2}][\mathrm{O_2}]}$
- D) $K_c = \dfrac{[\mathrm{SO_3}]}{[\mathrm{SO_2}][\mathrm{O_2}]}$

**respuesta:** A
**explicacion:** Paso 1 · Productos en el numerador, reactivos en el denominador, elevados a sus coeficientes estequiométricos: $K_c = \dfrac{[\mathrm{SO_3}]^2}{[\mathrm{SO_2}]^2[\mathrm{O_2}]}$.
Paso 2 · Comprobación: todos los componentes son gases, por lo que todos intervienen en $K_c$.
Respuesta: A.

<!-- Q2.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 87
area: quimica
tema: psa-cinetica-y-equilibrio-quimico
dificultad: media

En un recipiente de $2\ \text{L}$ en equilibrio para $\mathrm{H_2}(g) + \mathrm{I_2}(g) \rightleftharpoons 2\,\mathrm{HI}(g)$ hay $0{,}4\ \text{mol}$ de $\mathrm{H_2}$, $0{,}4\ \text{mol}$ de $\mathrm{I_2}$ y $1{,}6\ \text{mol}$ de $\mathrm{HI}$. Calcula $K_c$.

- A) $4$
- B) $16$
- C) $8$
- D) $2$

**respuesta:** B
**explicacion:** Paso 1 · Concentraciones: $[\mathrm{H_2}] = \frac{0{,}4}{2} = 0{,}2\ \text{M}$, $[\mathrm{I_2}] = 0{,}2\ \text{M}$, $[\mathrm{HI}] = \frac{1{,}6}{2} = 0{,}8\ \text{M}$.
Paso 2 · $K_c = \dfrac{(0{,}8)^2}{(0{,}2)(0{,}2)} = \dfrac{0{,}64}{0{,}04} = 16$. Comprobación en moles (porque $\Delta n = 0$): $\frac{1{,}6^2}{0{,}4 \times 0{,}4} = \frac{2{,}56}{0{,}16} = 16$.
Respuesta: B.

<!-- Q2.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 88
area: quimica
tema: psa-cinetica-y-equilibrio-quimico
dificultad: media

Para $\mathrm{CaCO_3}(s) \rightleftharpoons \mathrm{CaO}(s) + \mathrm{CO_2}(g)$, ¿cuál es la relación entre $K_p$ y $K_c$?

- A) $K_p = K_c$
- B) $K_p = K_c (RT)$
- C) $K_p = K_c (RT)^2$
- D) $K_p = K_c (RT)^{-1}$

**respuesta:** B
**explicacion:** Paso 1 · Solo cuentan los gases para $\Delta n$: $\Delta n = n_{\text{gas,prod}} - n_{\text{gas,react}} = 1 - 0 = 1$.
Paso 2 · $K_p = K_c(RT)^{\Delta n} = K_c(RT)^1 = K_c(RT)$.
Respuesta: B.

<!-- Q2.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 89
area: quimica
tema: psa-equilibrio-acido-base
dificultad: media

Calcula el pH de una solución acuosa de $\mathrm{HCl}$ $0{,}001\ \text{M}$ a $25\,^\circ\text{C}$ (ácido fuerte).

- A) $1$
- B) $2$
- C) $3$
- D) $11$

**respuesta:** C
**explicacion:** Paso 1 · $\mathrm{HCl}$ se disocia totalmente: $[\mathrm{H^+}] = 0{,}001 = 10^{-3}\ \text{M}$.
Paso 2 · $\text{pH} = -\log(10^{-3}) = 3$. Comprobación: $10^{-\text{pH}} = 10^{-3} = 0{,}001\ \text{M}$.
Respuesta: C.

<!-- Q3.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 90
area: quimica
tema: psa-equilibrio-acido-base
dificultad: media

Una solución de $\mathrm{NaOH}$ tiene una concentración $0{,}01\ \text{M}$ a $25\,^\circ\text{C}$. ¿Cuál es su pH?

- A) $2$
- B) $12$
- C) $10$
- D) $4$

**respuesta:** B
**explicacion:** Paso 1 · $[\mathrm{OH^-}] = 10^{-2}\ \text{M} \Rightarrow \text{pOH} = -\log(10^{-2}) = 2$.
Paso 2 · $\text{pH} = 14 - \text{pOH} = 14 - 2 = 12$. Comprobación: $[\mathrm{H^+}] = \frac{10^{-14}}{10^{-2}} = 10^{-12}\ \text{M} \Rightarrow \text{pH} = 12$.
Respuesta: B.

<!-- Q3.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 91
area: quimica
tema: psa-equilibrio-acido-base
dificultad: media

Según la teoría de Brønsted-Lowry, ¿cuál es el par ácido-base conjugado correcto en $\mathrm{NH_3} + \mathrm{H_2O} \rightleftharpoons \mathrm{NH_4^+} + \mathrm{OH^-}$?

- A) $\mathrm{NH_3}$ es ácido y $\mathrm{NH_4^+}$ es su base conjugada
- B) $\mathrm{H_2O}$ es ácido y $\mathrm{OH^-}$ es su base conjugada
- C) $\mathrm{NH_4^+}$ es base y $\mathrm{OH^-}$ es su ácido conjugado
- D) $\mathrm{H_2O}$ es base y $\mathrm{OH^-}$ es su ácido conjugado

**respuesta:** B
**explicacion:** Paso 1 · $\mathrm{H_2O}$ dona un protón ($\mathrm{H^+}$) al $\mathrm{NH_3}$, actuando como ácido.
Paso 2 · Al perder $\mathrm{H^+}$, el agua se transforma en $\mathrm{OH^-}$, que es su base conjugada.
Respuesta: B.

<!-- Q3.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 92
area: quimica
tema: psa-equilibrio-acido-base
dificultad: media

El pH normal de la sangre arterial humana es aproximadamente $7{,}4$. Si un paciente presenta un pH de $7{,}1$, ¿cómo cambió la concentración de $\mathrm{H^+}$ respecto a la normal?

- A) Disminuyó a la mitad
- B) Aumentó al doble ($\approx 2$ veces)
- C) Aumentó $0{,}3$ veces
- D) Disminuyó $10$ veces

**respuesta:** B
**explicacion:** Paso 1 · Al bajar el pH en $0{,}3$ unidades, $[\mathrm{H^+}]$ se multiplica por $10^{0{,}3}$.
Paso 2 · Como $\log 2 \approx 0{,}301$, se cumple $10^{0{,}3} \approx 2$. Comprobación: $10^{-7{,}1} / 10^{-7{,}4} = 10^{0{,}3} \approx 2$.
Respuesta: B.

<!-- Q3.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 93
area: quimica
tema: psa-equilibrio-acido-base
dificultad: media

¿Cuántos mililitros de $\mathrm{HCl}$ $0{,}2\ \text{M}$ se necesitan para neutralizar completamente $40\ \text{mL}$ de $\mathrm{NaOH}$ $0{,}1\ \text{M}$?

- A) $10\ \text{mL}$
- B) $20\ \text{mL}$
- C) $40\ \text{mL}$
- D) $80\ \text{mL}$

**respuesta:** B
**explicacion:** Paso 1 · Estequiometría $1:1$ ($N_a V_a = N_b V_b$): $0{,}2 \cdot V_a = 0{,}1 \times 40 = 4$.
Paso 2 · $V_a = \dfrac{4}{0{,}2} = 20\ \text{mL}$. Comprobación: moles $\mathrm{H^+} = 0{,}2 \times 0{,}02 = 0{,}004\ \text{mol}$; moles $\mathrm{OH^-} = 0{,}1 \times 0{,}04 = 0{,}004\ \text{mol}$.
Respuesta: B.

<!-- Q3.5 de MFQ_INVENTARIO.md -->

---

## Pregunta 94
area: quimica
tema: psa-quimica-organica
dificultad: media

¿Qué tipo de hibridación presenta el átomo de carbono en el metano ($\mathrm{CH_4}$) y cuántos enlaces $\sigma$ forma?

- A) $sp^2$ y $4$ enlaces $\sigma$
- B) $sp^3$ y $4$ enlaces $\sigma$
- C) $sp$ y $2$ enlaces $\sigma$
- D) $sp^3$ y $2$ enlaces $\sigma$

**respuesta:** B
**explicacion:** Paso 1 · El carbono del $\mathrm{CH_4}$ forma $4$ enlaces simples alrededor suyo, lo que corresponde a hibridación tetraédrica $sp^3$.
Paso 2 · Todo enlace simple es un enlace $\sigma$, por tanto tiene $4$ enlaces $\sigma$ y $0$ enlaces $\pi$.
Respuesta: B.

<!-- Q4.1 de MFQ_INVENTARIO.md -->

---

## Pregunta 95
area: quimica
tema: psa-quimica-organica
dificultad: media

¿Cuál es la fórmula molecular de un alqueno acíclico con $5$ átomos de carbono?

- A) $\mathrm{C_5H_{12}}$
- B) $\mathrm{C_5H_{10}}$
- C) $\mathrm{C_5H_8}$
- D) $\mathrm{C_5H_6}$

**respuesta:** B
**explicacion:** Paso 1 · La fórmula general de los alquenos (un doble enlace) es $\mathrm{C}_n\mathrm{H}_{2n}$.
Paso 2 · Para $n = 5$: $\mathrm{C_5H_{2(5)}} = \mathrm{C_5H_{10}}$. Comprobación: el pentano ($\mathrm{C_5H_{12}}$) pierde $2\ \mathrm{H}$ al formar un doble enlace.
Respuesta: B.

<!-- Q4.2 de MFQ_INVENTARIO.md -->

---

## Pregunta 96
area: quimica
tema: psa-quimica-organica
dificultad: media

Identifica el grupo funcional característico de los **aldehídos**.

- A) $-\mathrm{OH}$
- B) $-\mathrm{CHO}$
- C) $-\mathrm{CO}-$ (en carbono secundario)
- D) $-\mathrm{COOH}$

**respuesta:** B
**explicacion:** Paso 1 · El grupo carbonilo en un extremo de cadena unido a un hidrógeno ($-\mathrm{CHO}$) define a los aldehídos.
Paso 2 · Comprobación: $-\mathrm{OH}$ es alcohol, $-\mathrm{CO}-$ interno es cetona y $-\mathrm{COOH}$ es ácido carboxílico.
Respuesta: B.

<!-- Q4.3 de MFQ_INVENTARIO.md -->

---

## Pregunta 97
area: quimica
tema: psa-quimica-organica
dificultad: media

¿Cuál es el nombre IUPAC del compuesto $\mathrm{CH_3-CH_2-COOH}$?

- A) Ácido etanoico
- B) Ácido propanoico
- C) Propanona
- D) Propanol

**respuesta:** B
**explicacion:** Paso 1 · Cuenta los carbonos de la cadena principal incluido el del grupo $-\mathrm{COOH}$: son $3$ carbonos (prefijo *prop-*).
Paso 2 · Al tener función ácido carboxílico, su nombre es **ácido propanoico**.
Respuesta: B.

<!-- Q4.4 de MFQ_INVENTARIO.md -->

---

## Pregunta 98
area: quimica
tema: psa-quimica-organica
dificultad: media

La urea, $\mathrm{CO(NH_2)_2}$, principal producto nitrogenado de excreción proteica en humanos, pertenece a la función orgánica:

- A) Amina
- B) Amida
- C) Nitrilo
- D) Éster

**respuesta:** B
**explicacion:** Paso 1 · Presenta el grupo carbonilo ($\mathrm{C=O}$) unido directamente a átomos de nitrógeno ($-\mathrm{NH_2}$), estructura característica de las **amidas** (diamida del ácido carbónico).
Paso 2 · Comprobación: las aminas carecen de $\mathrm{C=O}$ unido al $\mathrm{N}$; los nitrilos tienen $-\mathrm{C\equiv N}$.
Respuesta: B.

<!-- Q4.5 de MFQ_INVENTARIO.md -->

---
