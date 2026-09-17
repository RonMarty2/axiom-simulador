# Figuras que faltan: qué necesito de los facsímiles

**Generado el 2026-09-16. Actualizado el 2026-09-16**, al empezar a leer los
PDF en local. Actualizar cuando cambie el conteo.

Quedan **15 preguntas** cuyo enunciado nombra una figura que el alumno no ve.
El test `ningún enunciado nuevo promete una figura que no está` las cuenta, con
el tope en 15; cada una que se resuelva baja el tope.

**Y hay 72 más que el test no ve**, más una tercera categoría que ni el test ni
esa lista alcanzan. Es lo primero que hay que leer de este archivo: está abajo,
en "El 15 es un piso, no un techo".

## Por qué están frenadas

Las 106 que ya se resolvieron salieron sin abrir un PDF: o el enunciado traía la
configuración escrita y alcanzó con reescribirlo, o los datos determinaban la
figura entera y se pudo construir con geometría real. **Estas no.** Acá el
enunciado no alcanza: la figura carga información que no está en el texto.

La regla 7 de §4.5 de la bitácora es explícita: una figura que *"se ve más o menos
como"* la real es **peor que no tener figura**, porque enseña mal. Por eso no se
dibujan a ojo.

## Qué hace falta, en concreto

Para cada una de la lista: **la imagen de esa pregunta en el facsímil**. Alcanza
con un recorte de la hoja donde se vea el dibujo. No hace falta el PDF entero.

Los PDF están en `examenes pasados/` (FCYT y FCE) en la máquina de Ronald, fuera
del repo por peso (225 MB, ver `.gitignore` y `examenes pasados/INVENTARIO.md`).

## La lista

### Ya dibujadas

Todas leídas el 16-sep-2026 abriendo el PDF acá, en la máquina de Ronald (el
camino 3 de más abajo). La columna de la derecha es lo que **no** estaba pedido
y el facsímil traía igual.

| examen | facsímil | de la lista | de arriba, y faltaba |
|---|---|---|---|
| `2016-1op-1-2016` | `141_1ra-op-1-2016.pdf` | P5, P6, P10 | **P7** |
| `2016-2op-1-2016` | `142_2da-op-1-2016.pdf` | P5, P8, P10 | — |
| `2016-3op-1-2016` | `143_2ra-op-1-2016.pdf` | P5, P8 | **P6** |
| `2016-1op-2-2016` | `144_1ra-op-2-2016.pdf` | P5, P11 | **P6** |
| `2016-2op-2-2016` | `145_2da-op-2-2016.pdf` | P5, P11 | **P6** |
| `2017-1op-1-2017` | `146_1ra-op-1-2017.pdf` | P10 | — |
| `2017-2op-1-2017` | `147_2da-op-1-2017.pdf` | P6, P7 | — |
| `2017-3op-1-2017` | `148_3ra-op-1-2017.pdf` | P6, P7 | — |
| `2017-1op-2-2017` | `149_1ra-op-2-2017.pdf` | P7 | — |
| `2017-2op-2-2017` | `150_2da-op-2-2017.pdf` | — | **P5** |
| `2024-parcial1-1-2024` | `2024-1-preu.pdf` p.2 | P6, P8, P9 | — |
| `2024-parcial2-1-2024` | `2024-1-preu.pdf` p.10 | P19 | — |
| `2024-final-1-2024` | `2024-1-preu.pdf` p.14 | P6 | — |
| `2024-parcial1-2-2024` | `2024-2-preu.pdf` p.2 | P6, P8, P9 | — |

**13 preguntas, 13 figuras, 10 dibujos**: tres se comparten porque el facsímil
es literalmente el mismo. `2016-2op-1` P10 usa la del `2016-1op-1` P10 (mismo
enunciado, mismos números, mismo dibujo), y las dos opciones de agosto
comparten la Figura 3 y la del F11.

**Ojo con los nombres de archivo.** `143_2ra-op-1-2016.pdf` dice "2ra" y
adentro es la **3ra** opción (31-mar-2016). Y los dos de agosto traen
"EXAMEN-INGRESO 1-2016" en el encabezado siendo de la gestión **2/2016**: el
error es del facsímil y los nombres del repo ya están bien. Antes de asociar un
PDF a un examen hay que abrirlo y mirar la FECHA, no el encabezado. Los cinco
de 2017 (146 a 150), en cambio, coinciden: el problema era propio de esos dos.

**Dos figuras de 2017 se parecen y no son la misma.** La "FIGURA 1" del
`2017-2op-1` y la del `2017-3op-1` son el mismo dibujo (dos cuadrados de lado 1
y dos rectas desde el vértice inferior izquierdo) con dos diferencias que solo
están en la imagen: la cota del dato (4/13 contra 3/11) y **cuál de los dos
cuadrados está sombreado** — el izquierdo en una, el derecho en la otra. De ahí
que una dé g/4 = 1/13 y la otra 3g/4 = 9/44. Si se hubieran compartido el
dibujo, una de las dos habría quedado con la respuesta de la otra.

### Lo que apareció al abrirlos

- **`2016-1op-2` P11 y `2016-2op-2` P11 dejan de estar descartadas.** Eran las
  dos que este archivo daba por imposibles ("no queda claro cómo están montadas
  las dos poleas"). El facsímil lo aclara, y **no era lo que decía el texto**:
  la mesa tiene un HUECO en el medio, con una pared que baja en cada borde
  interno y una polea montada arriba de cada pared. El enunciado decía "polea
  fija en el borde de la mesa", que sugiere el borde de afuera. Se corrigió la
  descripción en los dos.
- **Tres P6 no estaban pedidas y necesitaban la figura.** `2016-3op-1` P6 venía
  de las 74 (le habían sacado la mención). Las otras dos son un agujero NUEVO
  del regex: decían *"ver figura 3"*, y `PIDE_FIGURA` no entendía ni "ver
  figura" ni "la figura 3 muestra". Se le agregaron las dos formas, con costo
  cero porque para entonces ya tenían su dibujo.

### fisica (5)

| examen | preg. | qué dice el enunciado |
|---|---|---|
| `2009-parcial3-2-2009` | 19 | Circuito con un resistor de 3Ω, un resistor de 2Ω y un resistor de 5Ω según la figura. La resistencia equivalente (Ω) es… |
| `2014-final-2-2014` | 19 | La estructura que se muestra en la figura adjunta gira alrededor del eje vertical AB, con una velocidad angular de 10 ra… |
| `2014-final-2-2014` | 20 | Una masa $m_1$ se suelta desde el reposo en un tazón semihemisférico liso de radio $R$, desde la posición que se muestra… |
| `2018-2op-1-2018` | 11 | En la figura se muestra un automovilista en una acción temeraria venciendo a la gravedad. Si se conocen los valores de $… |
| `2025-final-1-2025` | 20 | En el circuito que se muestra en la figura, el amperímetro $A_1$ marca 10,0 A y las baterías tienen una resistencia inte… |

### geometria_trigonometria (10)

| examen | preg. | qué dice el enunciado |
|---|---|---|
| `2008-parcial2-2-2008` | 7 | En la figura, las cuerdas $AB$ y $CD$ de una circunferencia se cruzan en el punto interior $O$. Se sabe que $BO=9$ m, $O… |
| `2010-parcial1-2-2010` | 7 | $AB$ y $CD$ son paralelas. Dos transversales se cruzan formando los ángulos 1, 2 y 3 marcados en la figura, con ángulo 1… |
| `2012-2op-1-2012` | 6 | Se conoce que un ángulo inscrito en una circunferencia vale la mitad del ángulo central que subtiende el mismo arco. En … |
| `2014-parcial1-2-2014` | 7 | Calcular el área A de la figura: un sector circular de radio 5 cm con ángulo central de 60°; A es la región sombreada co… |
| `2015-1op-2-2015` | 7 | En la figura $AE=8$, $EC=3$, $DB=5$ y $AB$ es paralelo a $DC$, entonces $BE-ED$ es igual a:… |
| `2018-2op-1-2018` | 7 | En la figura, O es el centro de la circunferencia. Si AB//RT y ∡AOC=94º; calcular la medida del ángulo α.… |
| `2018-3op-1-2018` | 7 | En la figura, O es el centro de la circunferencia circunscrita a un pentágono regular y "t" es una tangente a la circunf… |
| `2019-3op-1-2019` | 6 | En la figura, O es el centro de la circunferencia circunscrita a un pentágono regular y "t" es una tangente a la circunf… |
| `2023-3op-1-2023` | 5 | En la figura adjunta se tienen dos triángulos rectángulos tal que $\tan(\alpha)=\dfrac{7}{15}$ y $\tan(\beta)=\dfrac{9}{… |
| `2023-3op-1-2023` | 7 | En la figura se tienen cinco cuadrados de lados 1, 2, 3, 4 y 5 respectivamente, entonces el área sombreada es igual a:… |

## El 15 es un piso, no un techo

El test cuenta enunciados que **todavía nombran** una figura ausente. Entonces
hay dos formas de bajar el número, y solo una es progreso:

1. **Dibujar la figura.** La pregunta pasa a ser resoluble.
2. **Reescribir el enunciado para que no la nombre.** El número baja igual y la
   pregunta queda como estaba, pero ahora **ninguna herramienta la ve**.

La pasada del 14-sep hizo la 2 con 98 enunciados (commit `f3f276a`). La mayoría
estaban bien: el transcriptor ya había puesto la configuración en un paréntesis
y el texto se sostiene solo. Pero no todos, y el caso que lo probó apareció el
16-sep con el primer facsímil que se abrió:

> **`2016-1op-1-2016` P7.** El facsímil tiene la figura (es la "Figura 3" de la
> tira de la página 1). La pasada le sacó el "como en la figura" y dejó el
> enunciado gramaticalmente roto — *"un triángulo equilátero de lado 6 se halla,
> sabiendo que…"*. Peor: la explicación que quedó escrita ponía el triángulo
> **apoyado sobre su base**, y en el PDF está **dado vuelta**, colgando de su
> lado horizontal de arriba y tocando el piso con un solo vértice. El resultado
> (12) es el mismo por casualidad aritmética, así que ningún test lo iba a
> agarrar: el trinquete de figuras no la veía, el de "la explicación no se
> contradice con la respuesta" tampoco.

**Las candidatas son 72.** Definición exacta, para poder regenerar la lista: el
enunciado ANTES de `f3f276a` matcheaba el regex `PIDE_FIGURA` de
`src/lib/axiom/banco.test.ts`, el de hoy no lo matchea, y hoy sigue sin declarar
`figura:`. Se saca con un script de tres pasos: `git show f3f276a~1:<archivo>`
para el texto viejo, el archivo de trabajo para el nuevo, y el regex del test
sobre los dos.

**No son 72 figuras para dibujar.** Son 72 preguntas para **abrir contra su
facsímil** y decidir: o el paréntesis describe bien la configuración y no hace
falta nada, o falta el dibujo (y entonces va a la lista de arriba), o —como la
P7— la descripción está mal y hay que corregir también la explicación. Lo que
NO se puede es darlas por buenas: nadie las verificó contra el PDF, y una ya
falló.

| examen | preg. | qué dice hoy el enunciado |
|---|---|---|
| `2005-1op-1-2005` | 18 | Un bloque se suelta del punto A, ubicado a 27 m de altura: baja por una rampa lisa de A a B, rec… |
| `2005-2op-1-2005` | 17 | Encuentra el valor del coeficiente de fricción, si el sistema se mueve con una aceleración de 2… |
| `2005-2op-1-2005` | 20 | Para un circuito donde $I=11/2$ A, $R_1=1\,\Omega$, $R_2=2\,\Omega$ y $R_3=3\,\Omega$ (los tres… |
| `2006-1op-1-2006` | 12 | Para un circuito eléctrico formado por una fuente de 10V, una resistencia de 4Ω en serie con la… |
| `2008-parcial1-1-2008` | 9 | En un pentágono cóncavo de vértices A, B, C, O, D (en ese orden), el ángulo menor visible en O (… |
| `2008-parcial2-1-2008` | 10 | En un círculo, las cuerdas AB y CD se cruzan en el punto interior O: AO=4 cm, OB=12 cm; Si DO=3·… |
| `2011-final-1-2011` | 23 | Encuentre las aceleraciones, en m/s², de los bloques m1=4 Kg y m2=1 Kg, con m2 sobre una mesa ho… |
| `2011-final-2-2011` | 8 | En una circunferencia, el arco BC = 40° (el ángulo central correspondiente) y arco DE = 80°; ent… |
| `2011-final-2-2011` | 19 | En los vértices de un cuadrado se colocan consecutivamente 20 μC, Q y 20 μC, con Q en el vértice… |
| `2011-unica-2-2011` | 11 | Determinar la aceleración en un sistema formado por una polea fija ideal sujeta al techo, con un… |
| `2013-final-2-2013` | 17 | , dos masas, $m_1$ y $m_2$, están sobre una mesa sin fricción, y la masa $m_3$ cuelga de $m_1$ m… |
| `2013-parcial1-1-2013` | 16 | Dos cuerpos A y B se lanzan con velocidades horizontales de $v_{0A}=50\text{ m/s}$ y $v_{0B}=2\t… |
| `2013-parcial1-1-2013` | 19 | Un bloque de masa $m$ se suelta a partir del reposo de la parte más alta de un plano inclinado (… |
| `2013-parcial1-2-2013` | 18 | Una roca está rodando horizontalmente hacia el borde de un acantilado que está a una altura h =… |
| `2013-parcial2-2-2013` | 20 | , dos masas, $m_1=2$ kg y $m_2=1$ kg, están sobre una mesa sin fricción, y la masa $m_3=3$ kg cu… |
| `2013-unica-2-2013` | 9 | Desde un automóvil con movimiento rectilíneo uniforme se toca el claxon (instrumento musical) y… |
| `2014-2op-1-2014` | 9 | Se lanza horizontalmente una piedra desde una altura de 45 m sobre el suelo; la piedra golpea el… |
| `2014-final-1-2014` | 19 | En un sistema donde el coeficiente de rozamiento entre el bloque $m_1$ y la superficie es de $1/… |
| `2014-final-1-2014` | 20 | Se impulsa un objeto de masa $m=1/2\ kg$ con un resorte cuya constante de rigidez es $k=500\ N/m… |
| `2014-parcial1-1-2014` | 8 | El valor de $x$ es (en un triángulo rectángulo con cateto vertical de 85, ángulo recto en la bas… |
| `2014-parcial2-1-2014` | 16 | El bloque A pesa 2 N, y el bloque B pesa 4 N. El bloque B está apoyado encima del bloque A, y A… |
| `2014-parcial2-2-2014` | 16 | El bloque A tiene una masa de 0,20 Kg, el bloque B tiene una masa de 0,40 Kg. El coeficiente de… |
| `2014-unica-2-2014` | 7 | En un triángulo equilátero de lado 13, se inscriben dos cuadrados idénticos (apilados uno sobre… |
| `2014-unica-2-2014` | 10 | Se tiene un sistema de poleas diseñado por un estudiante, instalado sobre una mesa y diseñado pa… |
| `2015-2op-2-2015` | 7 | En un triángulo equilátero de lado 13, se inscribe dos cuadrados idénticos, entonces el lado de… |
| `2016-3op-1-2016` | 10 | Un bloque de 1 kg de masa se mueve en un plano horizontal rugoso con un coeficiente de fricción… |
| `2016-3op-1-2016` | 11 | Se tienen esferitas iguales con cargas iguales pero opuestas y masas iguales. Una de ellas se cu… |
| `2017-1op-1-2017` | 9 | En un rizo, el bloque se suelta del punto A ubicado a 27 [m] de altura. Si el bloque completa un… |
| `2017-1op-2-2017` | 9 | Dos bloques se mueven en sentidos contrarios con $V_A=15\text{[m/s]}$ y $V_B=5\text{[m/s]}$ (A s… |
| `2017-2op-1-2017` | 11 | Dos esferas de masas $M_1$ y $M_2=2M_1$. Si $V_1=30[m/s]$ y $V_2=0$, y el choque es completament… |
| `2017-2op-2-2017` | 12 | Una persona se dirige hacia un muro con rapidez constante de $v_p=5\,[m/s]$, si lanza un grito c… |
| `2017-3op-1-2017` | 9 | Se lanza una pequeña pelota con un ángulo de $45°$ con respecto a la horizontal. Si $g=10\,[m/s^… |
| `2018-1op-1-2018` | 5 | Se sabe que AB$\parallel$DE y DF$\perp$CE. Determinar el perímetro del $\triangle CDE$. (Los pun… |
| `2018-1op-1-2018` | 11 | Un bloque de $m=3\,[kg]$ de masa es empujado contra una pared mediante una fuerza $P$ que forma… |
| `2018-1op-2-2018` | 3 | Un alambre de 10 cm de largo se corta en dos trozos, uno de longitud x y el otro de longitud 10… |
| `2018-1op-2-2018` | 5 | Se sabe que AB$\parallel$DE y AF$\perp$BC. Determinar el perímetro del $\triangle ABC$. (Los pun… |
| `2018-1op-2-2018` | 7 | Hallar el área sombreada, si los tres círculos con radios de 1, 2 y 3 pies son externamente tang… |
| `2018-1op-2-2018` | 8 | Para medir la altura de la cubierta de nubes en un aeropuerto, un trabajador dirige un reflector… |
| `2018-2op-1-2018` | 9 | ¿Qué distancia en metros recorre en 10 segundos el objeto cuya gráfica velocidad contra tiempo s… |
| `2018-2op-2-2018` | 2 | Encuentre un polinomio de grado tres, cuya gráfica cumple lo siguiente. (La curva corta el eje x… |
| `2018-2op-2-2018` | 5 | Hallar x si el pentágono y el hexágono son regulares. (Un pentágono regular y un hexágono regula… |
| `2018-2op-2-2018` | 6 | La semicircunferencia de centro O, tiene radio 1. El área del rectángulo ABCD en función de θ es… |
| `2018-2op-2-2018` | 7 | Si m $\parallel$ n, calcular el ángulo x. (Dos rectas paralelas horizontales m (arriba) y n (aba… |
| `2018-3op-1-2018` | 9 | Un astronauta que construye una estación espacial empuja un bloque de masa $m_1$ con una fuerza… |
| `2018-3op-1-2018` | 10 | Se lanza una pequeña pelota con un ángulo de $45°$ con respecto a la horizontal. Si $g=10\,[m/s^… |
| `2019-1op-1-2019` | 5 | Demostrar que $\alpha+\beta=\gamma$, y calcular $\tan\gamma$. (Hay dos triángulos rectángulos co… |
| `2019-1op-1-2019` | 8 | Se construirá un canal de agua de lluvia a partir de una hoja de metal de 30 cm de ancho, doblan… |
| `2019-1op-2-2019` | 6 | Se dan dos circunferencias secantes cuyos radios miden 12 cm. y 4 cm. respectivamente. Si la cir… |
| `2019-1op-2-2019` | 8 | La esquina inferior derecha de una pieza de papel de 6 pulg de ancho se dobla a la izquierda com… |
| `2019-1op-2-2019` | 12 | Por una semiesfera de radio $R=100\,cm$ se desliza sin fricción una pequeña esfera de masa $m$.… |
| `2019-2op-1-2019` | 5 | Si $m\parallel n$, hallar $x$: (Dos rectas paralelas horizontales, $m$ arriba y $n$ abajo. $A$ e… |
| `2019-2op-1-2019` | 11 | Una persona de pie en la cima de una roca semiesférica de radio $R=10\,m$ patea un balón (inicia… |
| `2019-2op-2-2019` | 5 | Si $M$ es punto de tangencia de la circunferencia inscrita en el $\triangle ABC$, $r=4$, $\angle… |
| `2019-2op-2-2019` | 8 | Calcular la altura $H$ de una montaña, sabiendo que se toman 2 visuales de la cima desde 2 posic… |
| `2019-2op-2-2019` | 10 | Si el bloque $A$ sube con una rapidez de $10\,m/s$. Determinar la rapidez con que sube el bloque… |
| `2019-2op-2-2019` | 11 | Determine la mínima velocidad angular con que rota el cilindro, de tal forma que el bloque no re… |
| `2019-2op-2-2019` | 12 | Un bloque de $10\,kg$ se libera desde el punto A. La pista no tiene fricción excepto por la porc… |
| `2019-3op-1-2019` | 7 | Calcular $\angle A+\angle B+\angle C$. [Sugerencia: aplicar la fórmula de adición de $\tan(A+B)$… |
| `2019-3op-1-2019` | 9 | En el mismo instante en el que se abandona la esfera A, se lanza la esfera B con velocidad inici… |
| `2020-1op-1-2020` | 5 | Un triángulo equilátero está inscrito a una circunferencia de radio 2 cm. Hallar el área sombrea… |
| `2020-1op-1-2020` | 12 | Se deja caer un objeto desde un plano inclinado sin fricción cuya base es $4\,m$ y altura $3\,m$… |
| `2020-2op-1-2020` | 5 | Si $m\parallel n$, calcular la medida del ángulo $x$: (Hay dos rectas paralelas horizontales, $m… |
| `2020-2op-1-2020` | 6 | Hallar la longitud del lado de un triángulo equilátero, si el lado del cuadrado interior es igua… |
| `2020-2op-1-2020` | 10 | En el mismo instante en el que se abandona la esfera A, se lanza la esfera B con velocidad inici… |
| `2020-2op-1-2020` | 12 | Dos esferas de masas $M_1$ y $M_2=2M_1$. Si $V_1=30\,[m/s]$ y el choque es completamente elástic… |
| `2020-3op-1-2020` | 5 | Hallar "x", si la medida del arco AB es 58°. (Hay una circunferencia tangente a la recta E-D-P e… |
| `2020-3op-1-2020` | 8 | Calcular el área de la región sombreada. ABCD es un cuadrado cuyo lado mide 8 cm. $\overline{BD}… |
| `2024-final-2-2024` | 18 | Dos cuerpos $m_1$ y $m_2$ están unidos por una cuerda que pasa por una polea móvil y otra fija,… |
| `2024-parcial2-1-2024` | 20 | Una persona en reposo levanta un bloque de 15 kg mediante una polea sin fricción con una fuerza… |
| `2024-parcial2-2-2024` | 16 | Un electrón es lanzado con una velocidad inicial de $2\times10^7$ m/s a lo largo del eje central… |
| `2025-3op-1-2025` | 5 | Bloque de 10 kg se libera desde punto A. Pista sin fricción excepto entre B y C (longitud 6 m).… |
| `2025-parcial2-1-2025` | 18 | , una partícula cargada permanece estacionaria entre las dos placas cargadas horizontales. La se… |

### El lote 2024 y las dos respuestas que estaban mal

Los tres exámenes del prefacultativo de cada gestión vienen en UN PDF de 18
páginas (`2024-1-preu.pdf` y `2024-2-preu.pdf`), con las secciones siempre en
el mismo orden: Aritmética, Geometría, Química, Física, Biología y Estrategias.
Así que el primer parcial ocupa las páginas 1-6, el segundo las 7-12 y el final
las 13-18. Se ubicaron renderizando solo la banda superior de las 18 páginas y
leyéndolas juntas.

**Dos de las ocho estaban mal, y las dos por la misma razón: el escaneo no daba
para leer la figura y se había adoptado una lectura "razonable".**

- **`2024-parcial1-1` P6: era E, es D (5π/2).** La explicación decía *"cuartos
  de disco centrados en A y en B que se cruzan en un punto O cerca de E"*. A
  400 dpi son TRES arcos y ninguno sale de A ni de B: el cuarto centrado en **D**
  de radio 4 (de A a C), el cuarto centrado en **E** de radio 2 (de D a O, con
  su radio OE dibujado) y la semicircunferencia de diámetro EC. Los dos chicos
  caen enteros dentro del grande, así que 4π − π − π/2 = 5π/2.
- **`2024-parcial2-1` P19: era C (54 μF), es D (10 μF).** Esta es la que la
  bitácora del 14-sep listaba entre las tres peores ("no se sabe la topología de
  la red de capacitores" — esa frase se perdió al reescribir el ítem el 16-sep,
  queda en el commit `3c4f3bc`), y el propio archivo lo admitía: *"no permite una
  reconstrucción topológica 100% inequívoca… se adoptó la lectura más simple…
  los cuatro en paralelo"*. A 400 dpi el circuito no tiene ambigüedad: entre a
  y d hay un bloque con dos ramas en paralelo (arriba dos C en serie, abajo un
  2C) y de d a b va otro 2C en serie con todo. Eso da 10C/9 = 10 μF. **Y los
  54 μF eran el distractor**: es exactamente 6C, lo que sale de suponer todo en
  paralelo.

Las otras seis estaban bien. Van **4 respuestas corregidas** en los cuatro
lotes (las dos de acá más `2016-1op-1` P7 y `2016-3op-1` P6, que eran de
descripción y no de respuesta).

**Un dibujo que a propósito NO está a escala.** El `2024-final-1` P6 tiene
AD = DC = 15 y CB = x = 4: a escala es una astilla de 7,5 a 1 donde no entra
ninguna etiqueta, y el propio facsímil lo dibuja esquemático. Lo que sí está
exacto, y verificado, es la topología — D es el punto medio de AC y DE es
paralelo a CB, que es lo único que el alumno tiene que leer del dibujo. Las
longitudes van rotuladas. Es la primera excepción declarada a la regla 7 de
§4.5 de la bitácora, y está anotada en el código.

### Lo que dio el muestreo de 2017

De las 72, seis eran de 2017 y se abrieron todas contra su facsímil. **Las seis
salieron bien**: el paréntesis que les dejó la pasada del 14-sep describe la
configuración correctamente y la respuesta marcada es la que da el cálculo. Es
el primer tramo que sale limpio — los dos primeros que se habían abierto
(`2016-1op-1` P7 y `2016-3op-1` P6) estaban mal. Con 8 de 78 revisadas no se
puede extrapolar todavía, pero conviene anotar la proporción a medida que se
avanza.

A una se le dibujó la figura igual: `2017-2op-2` P5 se sostenía con un
paréntesis de cuatro líneas que describía el dibujo entero. Ahora tiene la
figura y el enunciado volvió a ser el del facsímil.

## Y una tercera categoría: las que NI SIQUIERA prometen una figura

`2017-3op-1` **P5** no está en ninguna de las dos listas y necesita su dibujo.
Su enunciado no nombra ninguna figura — *"Se tiene un cuadrado ABCD, el punto de
intersección de las diagonales es E y los arcos son cuartos de circunferencia,
sabiendo que el lado del cuadrado es 4, entonces el área sombreada es igual a"* —
pero el facsímil trae un cuadrado con cuatro arcos y una trama de sombreado que
el texto **no alcanza a determinar**: no dice cuáles de las regiones que esos
arcos recortan están sombreadas, y hay varias. Está marcada **E**.

No se dibujó en el lote de 2017 a propósito: reconstruirla pide medir el
sombreado arco por arco y la respuesta marcada es un "ninguna de las
anteriores", que es justo el caso en que conviene no apurarse. Queda como el
primer caso de esta categoría, que por definición **ningún regex puede
encontrar**: solo aparece abriendo el PDF. Si aparecen más, van acá.

## Cómo desbloquear esto: trabajar en local

**Resuelto el 16-sep-2026: se está usando el camino 3.** Claude Code corriendo
en la máquina de Ronald abre los PDF directo de `examenes pasados/`, y así
salieron las cuatro figuras del 1-2016 1ra. Lo que sigue queda como referencia
de por qué, y para la sesión que corra en la web.

El problema de fondo era simple: **la sesión de Claude que corre en la web
trabaja sobre un clon del repo en un contenedor, y ese clon no tiene los PDF**
(están en `.gitignore`). No hay forma de que esa sesión "mire" una carpeta de la
máquina de Ronald.

Tres caminos, del más barato al más caro.

### 1. Mandar recortes, sin cambiar nada del setup

Para las preguntas puntuales que se vayan a dibujar: abrir el PDF, recortar la
hoja donde está la figura y mandar la imagen por el chat. Es lo más rápido y no
toca el repo ni la configuración.

Ventaja: cero setup. Desventaja: hay que hacerlo cada vez.

### 2. Versionar solo los recortes, no los PDF

Crear `data/figuras-fuente/` y guardar ahí el recorte de cada figura que haga
falta, como PNG o WebP de unos pocos KB:

```
data/figuras-fuente/
└── ingenieria/
    ├── 2017-3op-1-2017-p07.png
    └── 2016-2op-1-2016-p08.png
```

Eso SÍ se puede versionar: son imágenes chicas, no los escaneos de 225 MB. El
`.gitignore` actual excluye `examenes pasados/**/*.pdf`, así que esta carpeta no
está afectada.

Ventaja: queda en el repo, cualquier sesión futura lo ve, y sirve de respaldo de
qué se usó para dibujar cada figura. Es el camino recomendado si esto se va a
hacer en varias tandas.

### 3. Correr Claude Code en la máquina de Ronald

**Es el que se está usando.** Es la única opción en la que Claude lee la carpeta
`examenes pasados/` directamente, porque corre en la misma máquina donde están
los PDF.

```bash
npm install -g @anthropic-ai/claude-code
cd <la carpeta del repo>
claude
```

Ahí el PDF se abre con la herramienta de lectura por rangos de página, que es
como se cargaron los PRE-U en su momento (ver bitácora §11, 2026-07-30).

Para medir una figura no alcanza con la página entera: se renderiza a 300 dpi
con `pdftoppm -r 300 -png` y se recorta la zona del dibujo con `sharp` (ya está
en `node_modules`). Así se leyeron las cuatro del 1-2016 1ra.

Ventaja: acceso directo a los 225 MB sin subir nada. Desventaja: hay que tener el
repo clonado y las dependencias instaladas en esa máquina.

### Lo que NO conviene

Meter los PDF al repo con Git LFS. Resuelve el acceso pero complica el clonado
para todos y arrastra 225 MB en cada checkout, para un problema que se resuelve
con recortes de unos KB.
