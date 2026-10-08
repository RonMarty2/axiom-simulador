# Plan de animaciones: qué tipos de resolución animar primero

> Generado por `scripts/analisis/plan-animaciones.py` (lee el banco en `data/examenes/umss/` y reusa las familias de `scripts/analisis/familias.py`, las mismas del `docs/mapa-de-temas.md`). Regenerar: `python -I -X utf8 scripts/analisis/plan-animaciones.py` (con `-I` hay que poner `-X utf8`; ver lecciones). No modifica banco ni código. **Todo número sale de ese script.** Lo que NO sale de un comando son los **juicios** (facilidad 1 a 5, recurso visual, cobertura de cada generador): están marcados como juicio y viven en la lista `TIPOS` del script, para que Ronald los discuta y se cambien en un solo lugar.

## 0. Qué se midió y qué no

- **Universo:** 3750 preguntas de Ingeniería (3569) y Económicas (181) en 149 exámenes. **Medicina queda afuera**: es un solo examen con otro formato (afirmaciones y clave de combinación), no sirve para medir tipos (98 etiquetas distintas, ninguna repetida, según el mapa de temas).
- **Facultad, no carrera.** El banco solo distingue `facultad` (ingenieria, economicas); no hay etiqueta de carrera. Todo se corta por facultad.
- **Económicas:** solo cuento **Matemáticas** (99 preguntas). Lenguaje e Historia (82) no tienen cálculo que animar con este motor, y sus secciones están incompletas (`secciones_pendientes`). Las Matemáticas de Económicas están **completas** en todos los exámenes (lo pendiente es solo Lenguaje e Historia); una sola pregunta del banco figura como faltante (2011-2op, la 7).
- **Ingeniería mezcla** exámenes de admisión y parciales del Curso Básico (2006-2011, 2013-2014 y 2024-2025). Para ver la **evolución por gestión uso solo admisión**, porque los parciales están concentrados en 2006-2011 y inflarían el primer periodo. Los periodos son 2005-09, 2010-14, 2015-19 y 2020-25; admisión tiene 320, 240, 480 y 384 preguntas en cada uno.
- **Tipo = familia** del mapa de temas (agrupación por palabras clave sobre el `tema`; es una aproximación, ver el mapa). Una familia puede esconder subtipos con animaciones distintas (en Cinemática, MRU y encuentro no se animan igual).
- **Tendencia:** solo se habla de subida o caída si el tipo tiene **30 o más** preguntas de admisión, y se compara el peso de 2005-14 contra 2015-25 (sube si multiplica por 1.5 o más, baja si queda en 2/3 o menos). Con menos, la tabla dice «muestra chica» y no se interpreta. En Económicas no hay serie: son 5 gestiones (2011 a 2014 y 2023) y 3 a 14 preguntas por tipo.

## 1. Los tipos de problema con proceso que más caen

### Ingeniería: los 20 con más preguntas (se saltaron las familias conceptuales de Biología y Estrategias, que no tienen cálculo)

| # | Tipo | Materia | Preguntas | % de Ingeniería | Adm. 2005-09 | Adm. 2010-14 | Adm. 2015-19 | Adm. 2020-25 | Tendencia | Con «Paso N» | Con figura |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Cinemática 1D (MRU, MRUV, caída libre, encuentro) | Física | 172 | 4.8% | 16 (5.0%) | 11 (4.6%) | 37 (7.7%) | 22 (5.7%) | estable | 92.4% | 5.8% |
| 2 | Estequiometría (mol, masa, rendimiento, pureza) | Química | 168 | 4.7% | 23 (7.2%) | 9 (3.8%) | 20 (4.2%) | 20 (5.2%) | estable | 98.2% | 0.0% |
| 3 | Genética mendeliana (cruces, probabilidades) | Biología | 133 | 3.7% | 4 (1.2%) | 6 (2.5%) | 12 (2.5%) | 10 (2.6%) | estable | 62.4% | 0.0% |
| 4 | Circunferencia (ángulos, tangentes, cuerdas) | Geometría | 128 | 3.6% | 11 (3.4%) | 7 (2.9%) | 27 (5.6%) | 23 (6.0%) | sube | 93.0% | 23.4% |
| 5 | Dinámica (Newton, poleas, fricción) | Física | 122 | 3.4% | 10 (3.1%) | 7 (2.9%) | 16 (3.3%) | 16 (4.2%) | estable | 94.3% | 10.7% |
| 6 | Tiro parabólico y proyectiles | Física | 115 | 3.2% | 10 (3.1%) | 10 (4.2%) | 19 (4.0%) | 17 (4.4%) | estable | 93.9% | 5.2% |
| 7 | Soluciones, concentraciones y titulación | Química | 92 | 2.6% | 14 (4.4%) | 8 (3.3%) | 19 (4.0%) | 10 (2.6%) | estable | 95.7% | 0.0% |
| 8 | Polígonos y cuadriláteros | Geometría | 87 | 2.4% | 10 (3.1%) | 4 (1.7%) | 10 (2.1%) | 7 (1.8%) | estable | 97.7% | 13.8% |
| 9 | Triángulos (líneas notables, semejanza) | Geometría | 86 | 2.4% | 5 (1.6%) | 5 (2.1%) | 14 (2.9%) | 6 (1.6%) | estable | 95.3% | 11.6% |
| 10 | Identidades trigonométricas | Trigonometría | 86 | 2.4% | 6 (1.9%) | 7 (2.9%) | 18 (3.8%) | 7 (1.8%) | estable | 98.8% | 0.0% |
| 11 | Gases ideales y leyes de los gases | Química | 84 | 2.4% | 6 (1.9%) | 2 (0.8%) | 12 (2.5%) | 15 (3.9%) | sube | 100.0% | 0.0% |
| 12 | Logaritmos (propiedades, ecuaciones, cambio de base) | Álgebra | 75 | 2.1% | 12 (3.8%) | 7 (2.9%) | 14 (2.9%) | 13 (3.4%) | estable | 100.0% | 0.0% |
| 13 | Redox y balanceo | Química | 73 | 2.0% | 3 (0.9%) | 10 (4.2%) | 12 (2.5%) | 16 (4.2%) | estable | 97.3% | 0.0% |
| 14 | Cuadráticas, Vieta y naturaleza de raíces | Álgebra | 69 | 1.9% | 11 (3.4%) | 8 (3.3%) | 16 (3.3%) | 4 (1.0%) | estable | 97.1% | 0.0% |
| 15 | Capacitores y electrostática | Física | 69 | 1.9% | 6 (1.9%) | 7 (2.9%) | 4 (0.8%) | 5 (1.3%) | muestra chica | 97.1% | 8.7% |
| 16 | Masa molar, fórmula molecular y composición | Química | 68 | 1.9% | 9 (2.8%) | 2 (0.8%) | 9 (1.9%) | 2 (0.5%) | muestra chica | 98.5% | 0.0% |
| 17 | Segmentos y ángulos (rectas, paralelas) | Geometría | 67 | 1.9% | 11 (3.4%) | 4 (1.7%) | 1 (0.2%) | 3 (0.8%) | muestra chica | 100.0% | 3.0% |
| 18 | Ecuaciones trigonométricas | Trigonometría | 66 | 1.8% | 9 (2.8%) | 9 (3.8%) | 8 (1.7%) | 6 (1.6%) | baja | 100.0% | 0.0% |
| 19 | Estructura atómica y números cuánticos | Química | 59 | 1.7% | 6 (1.9%) | 10 (4.2%) | 8 (1.7%) | 2 (0.5%) | muestra chica | 96.6% | 0.0% |
| 20 | Progresiones y sucesiones | Álgebra | 58 | 1.6% | 7 (2.2%) | 4 (1.7%) | 14 (2.9%) | 9 (2.3%) | estable | 98.3% | 0.0% |

«Con Paso N» es el porcentaje de preguntas cuya explicación trae pasos numerados (`Paso 1 ·`...): son las que se pueden animar sin reescribir. «Con figura» es el porcentaje con figura en el enunciado. Los siguientes en la lista, ya fuera del corte: Divisores, MCD, MCM y numeracion (51), Movimiento circular (51), Circuitos y resistencias (corriente continua) (51), Teorema del resto y division de polinomios (50), Razones trigonometricas y triangulo rectangulo (49), Densidad, temperatura y calorimetria (48).

**Qué dice la evolución (solo admisión, ver la regla en la sección 0):** sube: Circunferencia, Gases ideales y leyes de los gases. Baja: Ecuaciones trigonométricas. Estable: 13 tipos. Muestra chica (menos de 30 preguntas de admisión, no se interpreta): Capacitores y electrostática, Masa molar, fórmula molecular y composición, Segmentos y ángulos, Estructura atómica y números cuánticos. Los que figuran como «sube» o «baja» lo hacen por poco margen (el corte es 1.5 veces o 2/3) y con periodos desparejos: sirven para desempatar, no para decidir. Lo que sí es claro: entre los 16 tipos con muestra suficiente, ninguno tiene un periodo en cero (verificado).

### Económicas: tipos de Matemáticas (los 15 con más preguntas)

| # | Tipo | Preguntas | % de Matemáticas de Económicas | Por gestión | Con explicación (≥200 car.) | Con «Paso N» |
|---|---|---|---|---|---|---|
| 1 | Planteo de ecuaciones (edades, móviles, mezclas, trabajo) | 14 | 14.1% | 2011: 2, 2012: 3, 2013: 4, 2014: 4, 2023: 1 | 92.9% | 0.0% |
| 2 | Operaciones, exponentes y aritmética básica | 10 | 10.1% | 2011: 3, 2012: 1, 2013: 1, 2014: 4, 2023: 1 | 90.0% | 0.0% |
| 3 | Sistemas de ecuaciones | 10 | 10.1% | 2011: 3, 2012: 2, 2013: 1, 2014: 3, 2023: 1 | 90.0% | 0.0% |
| 4 | Funciones (dominio, gráfica, inversa) | 9 | 9.1% | 2011: 2, 2012: 2, 2013: 2, 2014: 2, 2023: 1 | 100.0% | 0.0% |
| 5 | Logaritmos (propiedades, ecuaciones, cambio de base) | 9 | 9.1% | 2011: 1, 2012: 2, 2013: 2, 2014: 3, 2023: 1 | 88.9% | 0.0% |
| 6 | Progresiones y sucesiones | 8 | 8.1% | 2011: 2, 2012: 1, 2013: 2, 2014: 3 | 100.0% | 0.0% |
| 7 | Fracciones algebraicas y ecuaciones racionales | 8 | 8.1% | 2011: 1, 2012: 1, 2013: 2, 2014: 2, 2023: 2 | 87.5% | 12.5% |
| 8 | Ecuaciones irracionales y radicales | 8 | 8.1% | 2011: 1, 2012: 1, 2013: 3, 2014: 3 | 100.0% | 0.0% |
| 9 | Regla de tres, reparto y proporcionalidad | 7 | 7.1% | 2012: 2, 2013: 2, 2014: 2, 2023: 1 | 85.7% | 0.0% |
| 10 | Porcentajes, interes, mezclas y costos | 3 | 3.0% | 2011: 1, 2012: 1, 2014: 1 | 100.0% | 0.0% |
| 11 | Problemas de trabajo, grifos y obreros | 2 | 2.0% | 2011: 2 | 100.0% | 0.0% |
| 12 | Inecuaciones y desigualdades | 2 | 2.0% | 2011: 1, 2023: 1 | 50.0% | 0.0% |
| 13 | Cuadráticas, Vieta y naturaleza de raíces | 2 | 2.0% | 2012: 2 | 100.0% | 0.0% |
| 14 | Ecuaciones exponenciales | 2 | 2.0% | 2013: 1, 2014: 1 | 100.0% | 0.0% |
| 15 | Factorizacion y productos notables | 1 | 1.0% | 2012: 1 | 100.0% | 0.0% |

Ojo: en Económicas **solo 1.0% de las preguntas de Matemáticas tiene «Paso N»**, pero 91.9% tiene una explicación de 200 caracteres o más. Es decir: están explicadas, en prosa con fórmulas en bloque, pero no en el formato que el animador espera. Antes de animar Económicas hay que reescribirlas a «Paso N» (el animador las clasifica como `falta-resolucion`).

## 2. Qué cubre hoy cada generador

Hay **9 funciones generadoras** exportadas (cuadratica, diferenciaCuadrados, ecuacionLineal, fracciones, potenciaProducto, raizConFactor, raizGeneral, sumaLogaritmos, sumaLogaritmosPropiedad) y **8 tarjetas** en `/prueba-animacion` (lineal, cuadrados, fracciones, potencia, raiz, raizResto, logaritmos, cuadratica). Sirven de patrón, pero **todos son de Álgebra**: no hay ni un solo generador de Física, Química, Biología ni Geometría.

| Generador | Qué enseña | Preguntas de Ingeniería con etiqueta de esa forma | Preguntas de Económicas (Mat.) |
|---|---|---|---|
| `ecuacionLineal` | ecuación de primer grado `ax + b = c` | 1 | 0 |
| `fracciones` | suma y resta de dos fracciones numéricas | 2 | 3 |
| `potenciaProducto` | producto de potencias de igual base (`aᵐ·aⁿ`) | 1 | 8 |
| `raizGeneral`, `raizConFactor` | raíz de una potencia y raíz con resto (`√12 = 2√3`) | 4 | 3 |
| `sumaLogaritmos`, `sumaLogaritmosPropiedad` | suma de logaritmos de igual base (producto) | 8 | 9 |
| `diferenciaCuadrados` | `x² − k²` y la ecuación `x² − k² = 0` | 4 | 0 |
| `cuadratica` | `ax² + bx + c = 0` por fórmula general | 1 | 1 |

Esa columna es una **cota por etiqueta**, no una medición de cuántas preguntas se animarían: el generador enseña un movimiento (sumar logaritmos, resolver `ax²+bx+c`) y la mayoría de las preguntas del banco piden otra cosa (ecuaciones logarítmicas, Vieta, simplificar expresiones largas). Hay 21 preguntas de Ingeniería y 24 de Económicas con una etiqueta que nombra directamente la forma de algún generador, de 3569 y 99.

Cobertura por tipo (juicio): de los 27 tipos del análisis, **21 no tienen ningún generador** (1859 preguntas) y **6 están cubiertos a medias** (307 preguntas): Logaritmos (propiedades, ecuaciones, cambio de base), Cuadráticas, Vieta y naturaleza de raíces, Planteo de ecuaciones (edades, móviles, mezclas, trabajo), Operaciones, exponentes y aritmética básica, Fracciones algebraicas y ecuaciones racionales, Ecuaciones irracionales y radicales. Ninguno está cubierto del todo. Total de preguntas en estos tipos: 2166 (una pregunta cuenta una vez; Logaritmos, Progresiones y otros que aparecen en las dos facultades suman ambas).

## 3. Recurso visual para lo que falta

Respuesta corta y honesta (con una salvedad: **no probé ninguna de estas animaciones**; que SVG alcance es una evaluación de diseño, y la de Punnett y diagrama de fuerzas es una hipótesis que el piloto tiene que confirmar): **el SVG con el motor de fusión alcanza para los 27 tipos.** No encontré ninguno que pida 3D, y las partículas no resuelven nada que la fórmula o el cuadro no resuelvan mejor. Lo que cambia es cuánto trabajo es cada uno:

- **Motor de fusión tal cual** (fórmula, reemplazo, despeje, unidades): gases, progresiones, cinemática, estequiometría, soluciones, masa molar, sistemas, regla de tres. Es el patrón de la cuadrática (`dato vuela a la fórmula`) y de la raíz (`tachar`). Ya probado y aprobado en lo visual.
- **Motor + un componente SVG chico**: cuadro de Punnett (genética), diagrama de cuerpo libre (dinámica), trayectoria con vx/vy (tiro), contador de átomos (balanceo), diagonal de Aufbau (estructura atómica), círculo unitario (ecuaciones trigonométricas). Cada uno es un componente nuevo que sirve para toda su familia.
- **Figura con coordenadas calculadas** (geometría plana): circunferencia, triángulos, polígonos y segmentos suman 368 preguntas y 54 tienen figura en el enunciado. Se puede, pero el costo es por figura, no por tipo; no la pondría entre las primeras.
- **3D:** el banco no lo pide. Busqué `tema` con prisma, cilindro, esfera, cono, poliedro, sólido o cubo en Ingeniería: 13 preguntas de 3569 (0.4%), repartidas en 6 familias (Densidad, temperatura y calorimetria: 5, Movimiento circular: 3, Capacitores y electrostatica: 2, Circunferencia: angulos, tangentes, cuerdas: 1, Poligonos y cuadrilateros: 1, Gases ideales y leyes de los gases: 1), y ninguna es geometría del espacio como tema propio: el sólido es el escenario de una densidad, un gas o un movimiento circular. No hay motivo para 3D hoy.
- **Partículas:** servirían para **explicar** (gases, soluciones, genética), pero eso es `animador-conceptos`, no resolución. No las necesita ningún tipo del ranking para resolver el ejercicio.

Detalle por tipo (recurso y por qué; la facilidad es un juicio):

| Tipo | Materia | Facilidad (1-5) | Recurso visual | Por qué |
|---|---|---|---|---|
| Cinemática 1D (MRU, MRUV, caída libre, encuentro) | Física | 4 | Motor de fusión + dato que vuela a la fórmula + unidades que se tachan. Un generador por subtipo (MRU, MRUV, caída libre, encuentro). Opcional: tira de posición en SVG. | Es fórmula, reemplazo y despeje: justo lo que el motor ya hace con la cuadrática. SVG alcanza; no hace falta 3D ni partículas. |
| Estequiometría (mol, masa, rendimiento, pureza) | Química | 4 | Cadena de factores de conversión (fracciones con unidades que se tachan en diagonal, ya existe `modo: tachar`). Una fila de fracciones que se arma de izquierda a derecha. | Es la jugada de la raíz y las fracciones, con unidades en vez de números. SVG alcanza; las partículas serían decoración. |
| Genética mendeliana (cruces, probabilidades) | Biología | 3 | Cuadro de Punnett en SVG: los alelos de cada padre bajan a filas y columnas y se funden en cada casilla; después se cuentan casillas. Nuevo componente de tabla. | El proceso ES un cuadro: se entiende mejor viéndolo armarse que leyéndolo. No requiere 3D. |
| Gases ideales y leyes de los gases | Química | 5 | Motor de fusión: fórmula con piezas con id, los datos vuelan a sus letras (patrón de la cuadrática), °C→K como paso propio. Partículas solo si luego se quiere un animador-conceptos aparte. | PV=nRT y la ley combinada son una fórmula con letras: calco directo del patrón anotar-y-reemplazar. |
| Soluciones, concentraciones y titulación | Química | 4 | Igual que estequiometría: fórmula (M = n/V, N, % en masa) y cadena de factores. Una barra de mezcla en SVG para diluciones es opcional. | Mismo motor que estequiometría y gases; se reutiliza casi todo. |
| Dinámica (Newton, poleas, fricción) | Física | 3 | Diagrama de cuerpo libre en SVG con flechas calculadas (las fuerzas aparecen una por una y se descomponen) + las ecuaciones ΣF = ma con el motor de fusión. | Hace falta el dibujo para que se entienda de dónde sale cada término de la ecuación. SVG con coordenadas calculadas alcanza. |
| Tiro parabólico y proyectiles | Física | 3 | SVG: trayectoria con coordenadas calculadas, velocidad que se descompone en vx y vy (triángulo), y las ecuaciones con el motor de fusión. | La descomposición del vector es el paso que más cuesta y es puro dibujo. SVG alcanza; 3D no aporta. |
| Logaritmos (propiedades, ecuaciones, cambio de base) | Álgebra | 4 | Extender los generadores existentes: ecuación logarítmica → misma base → argumentos iguales → cuadrática (reusa `cuadratica`) → comprobar el dominio. Cambio de base como fracción. | El motor ya hace la suma de logaritmos; la ecuación se arma encadenando generadores que ya existen. |
| Cuadráticas, Vieta y naturaleza de raíces | Álgebra | 4 | Reusar las piezas de `cuadratica` para suma y producto de raíces (−b/a, c/a) y discriminante. Sin recurso nuevo. | Ya existe la fórmula general animada; Vieta es el mismo cuadro de letras a, b, c con otras fórmulas. |
| Progresiones y sucesiones | Álgebra | 5 | Motor de fusión: aₙ = a₁ + (n−1)d y Sₙ, datos que vuelan a la fórmula, despeje. Tira de términos en SVG opcional. | Fórmula y reemplazo, sin figura: el caso más barato. |
| Masa molar, fórmula molecular y composición | Química | 4 | Tabla de átomos × masa atómica que se suma por filas, y de ahí a mol. Motor de fusión con una pieza por término. | Es una suma con una pieza por átomo; el motor la hace sin problema. |
| Identidades trigonométricas | Trigonometría | 3 | Motor de fusión por reescritura (sen²+cos²→1, tan→sen/cos), una sustitución por paso. Sin figura. Hace falta un catálogo de identidades. | Es reemplazar una pieza por otra equivalente; SVG alcanza, pero la variedad de identidades es grande (la facilidad baja a 3). |
| Redox y balanceo | Química | 3 | Contador de átomos por lado en SVG (fichas por elemento) que se iguala moviendo coeficientes; semirreacciones con electrones como fichas para redox. | Balancear es contar y comparar: se ve mejor con fichas que con texto. SVG alcanza; no hace falta simulación de partículas. |
| Capacitores y electrostática | Física | 3 | Fórmula con el motor (C = Q/V, Coulomb) y, para serie/paralelo, diagrama SVG del circuito que se reduce. | Mitad fórmula, mitad esquema de circuito; SVG alcanza. |
| Estructura atómica y números cuánticos | Química | 3 | Diagrama de configuración electrónica (diagonal de Aufbau) que se llena casilla a casilla; flechitas de espín en SVG. | Es un llenado ordenado: la animación lo explica mucho mejor que una lista. SVG alcanza. |
| Ecuaciones trigonométricas | Trigonometría | 3 | Motor de fusión + círculo unitario en SVG para ubicar las soluciones en cada cuadrante. | El círculo explica por qué hay dos soluciones; SVG con coordenadas calculadas alcanza. |
| Circunferencia (ángulos, tangentes, cuerdas) | Geometría | 2 | Figura SVG con coordenadas calculadas (regla 7 de la bitácora) y construcción que resalta cada ángulo o segmento; la cuenta, con el motor. | Depende de la figura; cada problema pide una distinta. Es caro por pregunta, no por tipo. |
| Polígonos y cuadriláteros | Geometría | 2 | Igual que circunferencia: figura calculada + construcción + cuenta. | Mismo costo por figura. |
| Triángulos (líneas notables, semejanza) | Geometría | 2 | Igual: figura calculada + construcción. La semejanza se ve bien con un triángulo que se superpone al otro. | Mismo costo por figura. |
| Segmentos y ángulos (rectas, paralelas) | Geometría | 2 | Figura calculada + cuenta; los segmentos colineales se resuelven con una recta numérica en SVG (barata). | La recta numérica es fácil; los ángulos entre paralelas piden figura. |
| Planteo de ecuaciones (edades, móviles, mezclas, trabajo) | Álgebra | 3 | Gesto nuevo: subrayar frases del enunciado y que cada una vuele a su término de la ecuación (texto → ecuación). Después se resuelve con `ecuacionLineal` (ya existe). Tabla de edades en SVG para edades. | Lo difícil no es resolver (eso ya está animado) sino plantear; el gesto de traducir texto es lo único nuevo. |
| Sistemas de ecuaciones | Álgebra | 4 | Motor de fusión: sustitución y reducción (sumar ecuaciones, una variable se cancela con `tachar`). Reusa el generador lineal para el último despeje. | Es reescritura de ecuaciones: lo que el motor hace bien. |
| Operaciones, exponentes y aritmética básica | Álgebra | 5 | Extender `potenciaProducto`/`raizGeneral`: cociente de potencias, exponente negativo y fraccionario, operaciones combinadas. Sin recurso nuevo. | Es la misma familia de generadores que ya está aprobada. |
| Funciones (dominio, gráfica, inversa) | Álgebra | 2 | Ejes en SVG con la curva calculada, más el motor para despejar la inversa. Ya hay `Ejes` en las lecciones. | Gráficas con coordenadas exactas: SVG alcanza, pero cada función es un dibujo. |
| Fracciones algebraicas y ecuaciones racionales | Álgebra | 4 | Factorizar y tachar factores iguales arriba y abajo (`modo: tachar` + `frPiezas`, ya existen). Suma de fracciones numéricas ya está. | Son las piezas de `fracciones` y `diferenciaCuadrados` combinadas. |
| Ecuaciones irracionales y radicales | Álgebra | 4 | Aislar la raíz, elevar al cuadrado, resolver y COMPROBAR cada solución (raíz extraña). Reusa `raizGeneral` y `cuadratica`. | Los generadores de raíz ya existen; falta encadenarlos y la comprobación. |
| Regla de tres, reparto y proporcionalidad | Aritmética | 5 | Tabla de dos filas con flechas en cruz (producto cruzado) y para el reparto una barra dividida en partes. Motor de fusión para la cuenta. | Es una proporción: dos fracciones iguales; el motor la resuelve con el mismo despeje de `ecuacionLineal`. |

Escala de facilidad: 5 = el motor alcanza con un generador nuevo; 4 = motor + gesto que ya existe; 3 = motor + componente SVG chico; 2 = figura con coordenadas calculadas; 1 = 3D o proceso sin forma común.

## 4. Ranking: qué animar primero

Impacto = preguntas del tipo (Ingeniería + Económicas) × facilidad. Es una **heurística**: el número de preguntas es medido, la facilidad es mi juicio. Si Ronald cambia una facilidad, el ranking se recalcula con el script.

| # | Tipo | Ing. | Econ. | Total | Facilidad (juicio) | Impacto = total × facilidad | Generador existente |
|---|---|---|---|---|---|---|---|
| 1 | Cinemática 1D (MRU, MRUV, caída libre, encuentro) | 172 | 0 | 172 | 4 | 688 | hueco |
| 2 | Estequiometría (mol, masa, rendimiento, pureza) | 168 | 0 | 168 | 4 | 672 | hueco |
| 3 | Gases ideales y leyes de los gases | 84 | 0 | 84 | 5 | 420 | hueco |
| 4 | Genética mendeliana (cruces, probabilidades) | 133 | 0 | 133 | 3 | 399 | hueco |
| 5 | Soluciones, concentraciones y titulación | 92 | 0 | 92 | 4 | 368 | hueco |
| 6 | Dinámica (Newton, poleas, fricción) | 122 | 0 | 122 | 3 | 366 | hueco |
| 7 | Tiro parabólico y proyectiles | 115 | 0 | 115 | 3 | 345 | hueco |
| 8 | Logaritmos (propiedades, ecuaciones, cambio de base) | 75 | 9 | 84 | 4 | 336 | parcial |
| 9 | Progresiones y sucesiones | 58 | 8 | 66 | 5 | 330 | hueco |
| 10 | Cuadráticas, Vieta y naturaleza de raíces | 69 | 2 | 71 | 4 | 284 | parcial |
| 11 | Masa molar, fórmula molecular y composición | 68 | 0 | 68 | 4 | 272 | hueco |
| 12 | Identidades trigonométricas | 86 | 0 | 86 | 3 | 258 | hueco |
| 13 | Circunferencia (ángulos, tangentes, cuerdas) | 128 | 0 | 128 | 2 | 256 | hueco |
| 14 | Sistemas de ecuaciones | 47 | 10 | 57 | 4 | 228 | hueco |
| 15 | Redox y balanceo | 73 | 0 | 73 | 3 | 219 | hueco |
| 16 | Fracciones algebraicas y ecuaciones racionales | 45 | 8 | 53 | 4 | 212 | parcial |
| 17 | Ecuaciones irracionales y radicales | 44 | 8 | 52 | 4 | 208 | parcial |
| 18 | Capacitores y electrostática | 69 | 0 | 69 | 3 | 207 | hueco |
| 19 | Ecuaciones trigonométricas | 66 | 0 | 66 | 3 | 198 | hueco |
| 20 | Estructura atómica y números cuánticos | 59 | 0 | 59 | 3 | 177 | hueco |
| 21 | Polígonos y cuadriláteros | 87 | 0 | 87 | 2 | 174 | hueco |
| 22 | Triángulos (líneas notables, semejanza) | 86 | 0 | 86 | 2 | 172 | hueco |
| 23 | Regla de tres, reparto y proporcionalidad | 27 | 7 | 34 | 5 | 170 | hueco |
| 24 | Segmentos y ángulos (rectas, paralelas) | 67 | 0 | 67 | 2 | 134 | hueco |
| 25 | Planteo de ecuaciones (edades, móviles, mezclas, trabajo) | 17 | 14 | 31 | 3 | 93 | parcial |
| 26 | Operaciones, exponentes y aritmética básica | 6 | 10 | 16 | 5 | 80 | parcial |
| 27 | Funciones (dominio, gráfica, inversa) | 18 | 9 | 27 | 2 | 54 | hueco |

**Económicas por separado** (el ranking de arriba lo domina Ingeniería porque tiene 20 veces más preguntas):

| # | Tipo | Preguntas Econ. | Facilidad | Impacto | Generador existente |
|---|---|---|---|---|---|
| 1 | Operaciones, exponentes y aritmética básica | 10 | 5 | 50 | parcial |
| 2 | Planteo de ecuaciones (edades, móviles, mezclas, trabajo) | 14 | 3 | 42 | parcial |
| 3 | Progresiones y sucesiones | 8 | 5 | 40 | hueco |
| 4 | Sistemas de ecuaciones | 10 | 4 | 40 | hueco |
| 5 | Logaritmos (propiedades, ecuaciones, cambio de base) | 9 | 4 | 36 | parcial |
| 6 | Regla de tres, reparto y proporcionalidad | 7 | 5 | 35 | hueco |
| 7 | Fracciones algebraicas y ecuaciones racionales | 8 | 4 | 32 | parcial |
| 8 | Ecuaciones irracionales y radicales | 8 | 4 | 32 | parcial |
| 9 | Funciones (dominio, gráfica, inversa) | 9 | 2 | 18 | hueco |
| 10 | Cuadráticas, Vieta y naturaleza de raíces | 2 | 4 | 8 | parcial |

Lectura: los 5 primeros del ranking general (Cinemática 1D, Estequiometría, Gases ideales y leyes de los gases, Genética mendeliana, Soluciones, concentraciones y titulación) suman 649 preguntas. Los tres primeros son Física y Química por fórmula y unidades, sin figura: ahí el motor ya sabe hacer casi todo. Para Económicas, el ranking pone primero Operaciones, exponentes y aritmética básica, Planteo de ecuaciones, Progresiones y sucesiones, Sistemas de ecuaciones. Exponentes, Logaritmos y Radicales son **extensiones de generadores ya aprobados**: se hacen casi sin recurso nuevo.

**Orden de construcción que propongo (juicio, no medición):** (1) Gases, porque es de los más baratos (facilidad 5) y confirma que el patrón de la cuadrática sirve en Química; (2) Estequiometría, Soluciones y Masa molar, que comparten la cadena de factores con unidades que se tachan (suman 328 preguntas con un solo recurso); (3) Cinemática; (4) Genética con el cuadro de Punnett, que decide si vale la pena un componente nuevo; (5) extensiones de lo ya hecho en Álgebra (Logaritmos, Progresiones, Cuadráticas).

## 5. Piloto: 5 preguntas reales

Elegidas por tres criterios: explicación con pasos numerados (menos la de Económicas), sin figura, y que la respuesta no sea la E (en el banco, 286 de 3750 preguntas tienen E como respuesta, 7.6%, y 262 de ellas son «Ninguno»; así la animación termina en una opción concreta). Cubren cuatro materias y los tres niveles de esfuerzo (motor tal cual, motor + gesto, componente nuevo).

| Id | Fac. | Año | Examen | Resp. | «Paso N» | Qué se anima | Qué prueba |
|---|---|---|---|---|---|---|---|
| `umss-ingenieria-2018-examen-de-ingreso-1-2018-3ra-opcion-014` | Ing. | 2018 | admision | D | 3 | Ley de Charles: hay que pasar °C a K y notar que 1,0 atm = 760 torr (la presión no cambia). Es el calco de la cuadrática: la fórmula con letras, cada dato vuela a su lugar. | Que el patrón anotar-y-reemplazar sirve en Química sin tocar el motor, y que «presión constante» se puede mostrar tachando P₁ = P₂. |
| `umss-ingenieria-2024-examen-de-ingreso-1-2024-1ra-opcion-016` | Ing. | 2024 | admision | A | 3 | Moles de átomos de O en 30 g de glucosa: masa molar → moles → átomos. Cadena de factores de conversión con unidades que se tachan. | Que `modo: tachar` alcanza para unidades; ese es el único gesto nuevo de estequiometría. |
| `umss-ingenieria-2024-examen-de-ingreso-1-2024-1ra-opcion-010` | Ing. | 2024 | admision | A | 3 | MRUV: dos ecuaciones con v₀ = 5a, se reemplaza y se despeja, más verificación. Reusa el despeje de `ecuacionLineal`. | Que Física entra con el mismo motor y que se pueden encadenar dos fórmulas con un reemplazo. |
| `umss-ingenieria-2023-examen-de-ingreso-1-2023-3ra-opcion-019` | Ing. | 2023 | admision | C | 3 | Dihíbrido CcDd × CcDd, probabilidad de CCDD = 1/4 × 1/4. Dos cuadros de Punnett 2×2 y el producto de fracciones. | El experimento honesto del piloto: es el único que exige un componente nuevo (cuadro). Dice si SVG alcanza para un diagrama no algebraico. |
| `umss-economicas-2011-examen-de-admision-1-2011-1ra-opcion-009` | Econ. | 2011 | admision | A | 0 | `log₃(4x+5) = log₃ x²` → argumentos iguales → `x² − 4x − 5 = 0` (la cuadrática ya animada) → comprobar el dominio de los DOS valores. La explicación trae una trampa pedagógica (no descartar −1). | Que se pueden encadenar generadores que ya existen, y que Económicas entra al piloto. Ojo: su explicación está en prosa (0 «Paso N»); hay que reescribirla antes (estado `falta-resolucion`). |

Orden sugerido: gases y estequiometría primero (más baratas, confirman el patrón en Química), luego cinemática, luego Punnett (decide si el cuadro justifica un componente), y al final la de Económicas (necesita reescribir la explicación primero).

## 6. Inconsistencias de datos encontradas

- **Generadores:** el pedido hablaba de 9 generadores y listaba 8 nombres. En el código hay 9 funciones exportadas y 8 tarjetas; la diferencia es que `sumaLogaritmos` llama por dentro a `sumaLogaritmosPropiedad` (`generadores-algebra.ts`, cuando los números no son potencias de la base), así que esa función no tiene tarjeta propia.
- **`area` mal puesta:** 12 preguntas de Ingeniería tienen `area: matematicas`, que no es un área del examen de Ingeniería (las áreas son aritmética-álgebra y geometría-trigonometría). No entran en ninguna tabla; el mapa de temas tampoco las cuenta.
- **Exponentes subestimados en Ingeniería:** la familia «Operaciones, exponentes y aritmética básica» tiene solo 6 preguntas en Ingeniería porque la regla de palabras manda a otras familias las que dicen «exponente» o «potenciación» en el tema. Hay 8 preguntas de Ingeniería con esa palabra en el `tema` fuera de esa familia. El número real de preguntas de exponentes es mayor al de la tabla.
- **`sistemas-de-numeracion` cae en «Sistemas de ecuaciones»:** 1 pregunta(s) (sistemas-de-numeracion) por coincidir la palabra «sistema». Inflan por poco ese tipo (el mapa de temas tiene el mismo defecto).
- **Preguntas sin familia** (fuera de Estrategias): 79, de las cuales 12 son las del `area` mal puesta; el resto no lo reconocen las reglas de palabras. No cambian el ranking.
- **Formato de explicación:** Ingeniería usa «Paso N ·» (80.8% de sus preguntas); Económicas Matemáticas casi nunca (1.0%). Esto condiciona qué se puede animar ya.
- **Explicaciones con química en texto plano:** `C₆H₁₂O₆`, `30/180` en vez de fracción con raya. El animador tendrá que pasarlas a LaTeX (`\\dfrac`), y la regla del proyecto es que la división se muestra como fracción.


## 7. Lecciones nuevas

- 2026-10-08 · ERROR · `python -I` ignora `PYTHONIOENCODING`, así que un script que imprimía `₂` murió con `UnicodeEncodeError` (cp1252) aunque la variable estaba puesta. · Con `-I` usar `-X utf8`; mejor aún, escribir a archivo y leerlo con Read.
- 2026-10-08 · ERROR (evitado) · El primer borrador del informe traía frases de lectura escritas antes de ver los datos («ningún tipo sube o baja», «la novena función es…»). · Las frases que interpretan una tabla se generan desde los datos o se escriben después de correr el script, y se comprueban contra el código (la novena función resultó ser una llamada interna, no una tarjeta).
- 2026-10-08 · ERROR · Una regex de `tema` pensada para «geometría del espacio» (volumen, cono, esfera) traía ruido: «volumen» está en gases, «cono» y «esfera» en palabras sueltas, «pirámide» en ecología. · Antes de citar un conteo de regex, listar los `tema` que casan y leerlos.
- 2026-10-08 · ACIERTO · Medir el formato de la explicación por familia (¿trae «Paso N ·»?) cambió el plan: Ingeniería casi siempre sí; Económicas Matemáticas casi nunca, aunque estén explicadas en prosa. · Antes de elegir qué animar, medir si la fuente está en el formato que el animador acepta; si no, el costo real incluye reescribir.
- 2026-10-08 · ACIERTO · Filtrar candidatos de piloto por `respuesta != E` (la respuesta E es una pregunta de cada trece; ver el conteo en la sección 5) evita animar un ejercicio que termina en «ninguna opción sirve», que desorienta en una demostración. · Para piloto, preferir preguntas cuya respuesta sea una opción concreta.
- 2026-10-08 · SUERTE · Que los 5 tipos del tope del ranking sean Física y Química depende de mis facilidades (juicio) y de que Ingeniería tiene 20 veces más preguntas que Económicas; con otra facilidad para Genética o Dinámica el orden cambia. · No presentar el ranking como medición: los números son medidos, las facilidades son discutibles y viven en `TIPOS` para cambiarlas en un solo lugar.
