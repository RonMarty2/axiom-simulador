# Mapa detallado de preguntas · FCyT UMSS (banco de exámenes)

> **Propósito de este archivo:** registro minucioso, NO genérico, de qué evalúa
> realmente cada pregunta del banco de exámenes de Ingreso FCyT. No basta con
> etiquetar "álgebra" o "física" — acá se documenta la TÉCNICA EXACTA que la
> pregunta busca, si hay una TRAMPA (de lectura, de unidades, de distractor
> plausible-pero-falso) y si premia un ATAJO específico frente al método
> "a lo bruto" (y cuánto tiempo/pasos ahorra ese atajo).
>
> Este documento es la base para: (a) detectar patrones repetidos entre
> exámenes distintos (mismo tipo de trampa reaparece), (b) diseñar lecciones
> de "Aprende" que enseñen explícitamente esas técnicas y adviertan esas
> trampas, (c) auditar la calidad del banco (ya encontramos y corregimos 9
> respuestas incoherentes gracias a este ejercicio de revisión rigurosa).
>
> **Convención de esta bitácora:**
> - 🎯 **Técnica exacta** — qué método/concepto puntual hay que aplicar.
> - ⚠️ **Trampa** — dónde y cómo se puede caer (si aplica).
> - ⚡ **Atajo** — cómo evitar el método largo (si aplica), y cuánto ahorra.
> - Sin ⚠️ ni ⚡ = pregunta de aplicación directa de fórmula/concepto, sin
>   vueltas — se anota igual para no dejar huecos de cobertura.
>
> **Última actualización:** 2026-07-18 · Responsable: Ronald (RonMarty2) + Claude

---

## Índice de exámenes cubiertos

| Examen | Archivo fuente | Preguntas | Estado |
|---|---|---|---|
| 1-2023 (1ra Opción), 19-dic-2022 | `2023-1op-1-2023.md` | 20 | ✅ Mapeado completo |
| 2-2025 (1ra Opción), 21-jul-2025 | `2025-1op-2-2025.md` | 15 | ✅ Mapeado completo |
| 2-2025 (2da Opción), 30-jul-2025 | `2025-2op-2-2025.md` | 13 | ✅ Mapeado completo |
| 2-2025 (2da Opción, Versión B), 30-jul-2025 | `2025-2op-2-2025-version-b.md` | 4 | ✅ Mapeado completo |
| 1-2025 (3ra Opción), 20-feb-2025 | `2025-3op-1-2025.md` | 12 | ✅ Mapeado completo |

**Total preguntas mapeadas: 64.**

---

## 1. Examen 1-2023 (1ra Opción) · 19-dic-2022

### Aritmética-Álgebra

**A1 · Media aritmética "ab"/"ba", hallar media geométrica** (dificultad: difícil)
- 🎯 Técnica: representar el número de 2 cifras como $10a+b$ (digit-number algebra) + usar la identidad $(a+b)^2 = a^2+2ab+b^2$ para despejar el PRODUCTO $ab$ directamente.
- ⚡ Atajo: NO hace falta resolver el sistema completo para hallar $a$ y $b$ por separado (lo cual llevaría a una ecuación cuadrática con raíces feas). Como lo pedido es la media geométrica $\sqrt{ab}$, alcanza con obtener el producto $ab$ vía la identidad del cuadrado de la suma — se salta por completo la resolución individual de $a$ y $b$. Ahorra ~50% de los pasos y evita manejar raíces.
- ⚠️ Trampa: quien no ve el atajo y arma el sistema literal para hallar $a,b$ individuales pierde tiempo y arriesga errores de signo.

**A2 · Reparto proporcional directo (738 en razón 32:9)** (fácil)
- 🎯 Técnica: reparto proporcional directo estándar, total/(suma de razones) × razón particular.
- ⚠️ Trampa: es una **trampa de lectura**, no matemática — piden explícitamente el MENOR número. El cálculo natural da ambos valores fácilmente (162 y 576); hay que prestar atención a CUÁL te piden, no asumir que es "el primero que sale".

**A3 · Aumentar 9 a ambos factores, producto aumenta 549, diferencia 18** (medio)
- 🎯 Técnica: plantear $(x+9)(y+9) = xy + 549$, expandir.
- ⚡ Atajo clave: al expandir, el término $xy$ se **cancela automáticamente** con el original, dejando una ecuación LINEAL simple en $(x+y)$ en vez de un sistema cuadrático. Quien no ve esta cancelación y sustituye $y=x-18$ directo en la ecuación cuadrática completa tarda mucho más y arriesga errores algebraicos.

**A4 · Binomio de Newton, término independiente de x Y de y** (difícil)
- 🎯 Técnica: fórmula del término general del binomio, igualar exponente de $x$ a 0 para hallar $k$.
- ⚠️ Trampa/verificación: pide que el término no tenga **ni x ni y** — hay que verificar que el mismo $k$ anula AMBOS exponentes (en este caso sí coincide, pero el examen espera que lo verifiques, no que lo asumas por "diseño del problema").
- ⚡ Atajo en el cálculo final: reconocer que $3^8/9^4 = 3^8/3^8 = 1$ (ya que $9^4=(3^2)^4=3^8$), evitando calcular $3^8=6561$ y $9^4=6561$ por separado y dividir números grandes.

### Geometría-Trigonometría

**G5 · Ángulos entre paralelas (poligonal zigzag con α, α, 95°, 40°, 2x)** (medio)
- 🎯 Técnica: trazar paralelas auxiliares por cada vértice interior, aplicar ángulos alternos internos/correspondientes en cascada. Requiere descomponer el ángulo compuesto (95°=40°+55°).
- ⚠️ **Trampa fuerte** (la respuesta real es **E) Ninguno**, x=17.5°): las opciones A-D (10°,20°,5°,15°) lucen todas plausibles (múltiplos de 5, valores "razonables" para un ángulo) pero NINGUNA es correcta. Quien no verifica su cálculo hasta el final y solo "reconoce el patrón" de la respuesta esperada cae en error. También depende del ángulo recto marcado en la figura — un dato pequeño y fácil de pasar por alto pero crítico para cerrar el problema.

**G6 · Cadena de triángulos isósceles (BC=BF=FE=ED=DA)** (difícil)
- 🎯 Técnica: reconocer el patrón RECURSIVO del ángulo exterior de un triángulo isósceles, que se DUPLICA en cada eslabón de la cadena (θ, 2θ, 3θ, 4θ...). Problema clásico de "isósceles telescópicos".
- ⚡ Atajo clave: en vez de resolver triángulo por triángulo con trigonometría o coordenadas (mucho más lento y con error acumulado), se reconoce el patrón aritmético y se llega a UNA sola ecuación final ($4\theta = 90-\theta/2$) que resuelve todo. Es de las preguntas más difíciles del examen precisamente porque exige VER el patrón, no aplicar una fórmula memorizada.

**G7 · Cuadrado inscrito en triángulo isósceles (ápice 120°)** (difícil)
- 🎯 Técnica: fórmula de cuadrado inscrito vía semejanza de triángulos (el triangulito sobre el cuadrado es semejante al triángulo completo), usando $\tan(30°)=1/\sqrt3$.
- ⚠️ **Trampa fuerte** (la respuesta real es **E) Ninguno**, $b=4+8\sqrt3\approx17.86$): mismo patrón que G5 — las opciones A-D son todas de la forma "entero + múltiplo de √3" (con "pinta" de ser la respuesta correcta) pero todas corresponden a un cuadrado mucho más chico (menor a 9). El examen evalúa si el alumno REALMENTE calcula o elige por "reconocimiento de formato" sin verificar.

**G8 · Identidad trigonométrica sen(2θ), sen(4θ)** (medio)
- 🎯 Técnica: fórmula de ángulo doble $\sin(4\theta)=2\sin(2\theta)\cos(2\theta)$, factorizar $\sin(2\theta)$ en numerador y denominador (se cancela), luego sustituir $\cos(2\theta)=2\cos^2\theta-1$.
- ⚡ Atajo: el ORDEN de operaciones importa — factorizar y cancelar $\sin(2\theta)$ ANTES de sustituir la fórmula del ángulo doble simplifica mucho más que sustituir todo de entrada y tratar de simplificar una expresión más compleja.

### Física

**F9 · Análisis dimensional, hallar dimensión de B en ecuación de energía** (medio)
- 🎯 Técnica: análisis dimensional puro, sustituir dimensiones conocidas y despejar.
- ⚡ Atajo: la ecuación tiene 2 términos con incógnitas distintas — hay que resolver PRIMERO el término con MENOS incógnitas (donde A=fuerza es dato conocido) para hallar la dimensión de "a", y RECIÉN CON ESO destrabar el primer término y hallar B. No se puede despejar B de una sola vez.
- ⚠️ Trampa: $\tan\theta$ es adimensional — asignarle dimensión arruina el cálculo.

**F10 · Plano inclinado con fricción, MRUA, hallar tiempo** (medio)
- 🎯 Técnica: fórmula de aceleración neta en plano con fricción $a=g(\sin\theta-\mu\cos\theta)$, luego cinemática básica.
- Sin atajo/trampa especial más allá de recordar bien la fórmula combinada (error común: olvidar el término de fricción o el signo).

**F11 · Campo eléctrico mínimo para equilibrio en plano inclinado** (difícil)
- 🎯 Técnica: equilibrio de fuerzas en plano inclinado, componente del peso paralela al plano igualada a la fuerza eléctrica $qE$.
- ⚠️ Trampa: depende crucialmente de la ORIENTACIÓN de las líneas de campo en la figura (para el mínimo E, el campo debe ser paralelo al plano). La lectura correcta de la figura es tan importante como la física en sí.

**F12 · Circuito resistivo, resistencia equivalente A-B** (difícil)
- 🎯 Técnica: reducción de resistencias en serie/paralelo por etapas.
- ⚠️ Trampa/dificultad real: identificar CORRECTAMENTE la topología (qué está en serie/paralelo respecto a los nodos A y B) es la parte difícil, no el cálculo aritmético. Este tipo de pregunta es notoriamente sensible a errores de lectura del diagrama — de hecho quedó sin resolver con certeza total por falta de nitidez de la figura original.

### Química

**Q13 · Balanceo redox (Li₂S + HNO₃), sumar coeficientes de productos** (difícil)
- 🎯 Técnica: método de electrones ganados=perdidos (ion-electrón simplificado). Identificar cambios de estado de oxidación: S(−2→0, pierde 2e⁻), N(+5→+2, gana 3e⁻).
- ⚡ Atajo: no hace falta escribir las semirreacciones completas con H⁺/H₂O — alcanza con CRUZAR los electrones intercambiados (3 y 2) como coeficientes mínimos de S y N, método de "tanteo por electrones cruzados".
- ⚠️ Trampa: piden la suma de coeficientes de PRODUCTOS específicamente (no de todos, no de reactivos) — hay que leer bien qué te piden sumar.

**Q14 · Presión osmótica de fructosa → concentración en g/L** (medio)
- 🎯 Técnica: $\pi=MRT$, despejar M, convertir a g/L con masa molar.
- ⚠️ **Trampa de unidades** clásica: la temperatura se da en °C (87°C) y HAY que convertir a Kelvin antes de usar la fórmula. Error frecuente: usar 87 directo sin sumar 273.

**Q15 · Estequiometría con pureza + reactivo limitante + gas en CN** (difícil)
- 🎯 Técnica multi-paso: masa pura → moles → identificar reactivo limitante → estequiometría → volumen molar en CN.
- ⚠️ Doble trampa: (1) la pureza se da sobre la "arena" (100 g de arena con 60% SiO₂, NO 100 g de SiO₂ puro) — quien no descuenta la pureza se equivoca; (2) hay que identificar CUÁL reactivo es el limitante (SiO₂, no el carbón que está en exceso) antes de calcular — usar el reactivo equivocado da una respuesta mayor a la real.

**Q16 · Presión osmótica de urea → masa en gramos** (medio)
- 🎯 Técnica: igual familia que Q14 pero inversa (dado π, hallar masa).
- ⚠️ Doble trampa de unidades: temperatura en °C (convertir a K) Y volumen en cm³ (convertir a L, 1000 cm³=1L). Además, la masa molar de la urea CO(NH₂)₂ requiere multiplicar N y H por 2 correctamente (por los DOS grupos NH₂) — error común: olvidar ese factor 2.

### Biología

**B17 · Nucleótido que NO corresponde al ARN** (fácil)
- 🎯 Técnica: memorización directa — el ARN usa A, G, C, U (uracilo); el ADN usa A, G, C, T (timina).
- ⚠️ Trampa de "sonido similar": timidina monofosfato suena parecida a los otros nucleótidos listados, fácil de confundir si no se tiene clarísimo que la TIMINA es exclusiva del ADN.

**B18 · Lípidos insaponificables** (medio)
- ⚠️ **Trampa fuerte** (respuesta real: **E) Ninguna**): las 4 opciones (ceras, triacilglicéridos, fosfolípidos, glicerofosfolípidos) son en realidad TODAS saponificables (tienen ácidos grasos con enlace éster). Patrón de trampa: "todos los distractores pertenecen a la categoría OPUESTA a la preguntada". Hay que conocer que los insaponificables reales (esteroides, terpenos, prostaglandinas) NO aparecen en la lista, para no elegir por descarte apresurado.

**B19 · Característica que NO tienen los virus** (fácil)
- ⚠️ Trampa conceptual de vocabulario coloquial vs técnico: "replicarse por sí mismos" suena como algo que un virus SÍ hace (coloquialmente "se reproduce"), pero técnicamente los virus son parásitos intracelulares OBLIGADOS — no se replican de forma autónoma, necesitan la maquinaria de una célula huésped.

**B20 · Genética mendeliana, genotipos parentales desde el fenotipo del hijo** (medio)
- 🎯 Técnica: razonamiento hacia atrás — desde el fenotipo recesivo del hijo (gg) inferir que ambos padres deben ser heterocigotos (Gg).
- ⚡ Atajo: no hace falta armar el cuadro de Punnett completo con las 4 combinaciones — basta razonar "para que salga gg, cada padre debe tener al menos un g; para ser fenotípicamente dominante, cada padre debe tener al menos un G → única combinación consistente es Gg×Gg". Razonamiento lógico directo en vez de enumeración exhaustiva.

---

## 2. Examen 2-2025 (1ra Opción) · 21-jul-2025

**P1 · Edades relación 11:10, luego 8:7 hace 9 años** (difícil)
- 🎯 Técnica: plantear razones como $J=11k$, $F=10k$, trasladar la condición "hace 9 años" a una ecuación con $k$. Problema de varios pasos temporales encadenados (edad actual → edad futura → edad del hijo).
- ⚠️ Trampa: fácil perder de vista CUÁNTOS años hay que sumar en cada tramo (edad de Fernando cuando nace el hijo ≠ edad de Fernando hoy). Hay que rastrear 3 momentos temporales distintos sin confundirlos.

**P2 · Progresión aritmética (ejercicios que crecen 2 por día)** (fácil)
- 🎯 Técnica: fórmula directa del término general $a_n=a_1+(n-1)d$. Sin trampa ni atajo especial — aplicación directa.

**P3 · Múltiplos de 6 terminados en 2, entre 120 y 1236** (medio)
- 🎯 Técnica: reconocer que "múltiplos de 6 terminados en 2" forman una progresión aritmética propia (12, 42, 72...) con razón 30 (no razón 6), y contar términos en un rango con la fórmula del término general.
- ⚡ Atajo: en vez de listar/contar uno por uno los múltiplos de 6 y filtrar cuáles terminan en 2 (lentísimo dado el rango hasta 1236), se detecta que estos números forman DIRECTAMENTE una PA de razón 30, reduciendo el conteo a resolver 2 desigualdades simples.

**P4 · Tangente a circunferencia desde punto exterior (diámetro y distancia dados)** (medio)
- 🎯 Técnica: Teorema de Pitágoras aplicado al triángulo rectángulo formado por el radio (perpendicular a la tangente), la tangente, y la distancia centro-punto.
- ⚠️ Trampa de unidades: dan el DIÁMETRO, no el radio — hay que dividir entre 2 antes de aplicar Pitágoras. Error común: usar el diámetro directo como si fuera el radio.

**P5 · Circunferencia tangente a una recta, ecuación general** (medio) — *[respuesta corregida en esta sesión: A→B]*
- 🎯 Técnica: el radio es la distancia del centro a la recta (fórmula punto-recta), luego expandir la ecuación canónica a la forma general.
- ⚠️ Trampa operativa: al expandir $(x-2)^2+(y+1)^2=9$ hay que restar el 9 del lado derecho correctamente para llegar a la forma general — un simple error de signo al pasar términos cambia la respuesta a otra opción parecida (por eso este ítem tenía la letra incorrecta marcada originalmente).

**P6 · Encuentro de dos móviles (MRU vs MRUA con retraso de salida)** (medio)
- 🎯 Técnica: plantear posiciones con tiempos DESFASADOS (el segundo móvil parte 2 s después, así que su tiempo de viaje es $t-2$, no $t$).
- ⚠️ Trampa clásica de "encuentro con salida retrasada": si no se resta el desfase (usar $t-2$ en vez de $t$ para el segundo móvil), toda la ecuación cuadrática resultante es incorrecta.

**P7 · Tiro parabólico, altura de impacto en pared a distancia fija** (difícil)
- 🎯 Técnica: descomponer velocidad en componentes, hallar tiempo para alcanzar la distancia horizontal dada, sustituir ese tiempo en la ecuación de altura vertical (que incluye el término de caída $-\frac12gt^2$).
- ⚠️ Trampa: no es tiro parabólico "completo" (alcance máximo) sino evaluado en un punto intermedio — hay que parar el cálculo en el tiempo exacto que corresponde a la pared, no en el tiempo de alcance total.

**P8 · Proyectil horizontal a blanco móvil (cañón + tanque que se aleja)** (difícil) — *[respuesta corregida: C→B]*
- 🎯 Técnica: tiempo de caída libre pura (independiente de la velocidad horizontal) determina cuándo el proyectil llega al suelo; en ese mismo tiempo, calcular cuánto se movió el blanco desde SU posición inicial.
- ⚠️ Trampa de planteo: la distancia $d$ inicial del tanque + lo que se mueve en el tiempo de vuelo debe IGUALAR el alcance horizontal del proyectil — confundir "sumar" con "restar" (o plantear la ecuación con el signo invertido) es el error más común en este tipo de problema de encuentro proyectil-blanco móvil.

**P9 · Fricción de frenado (distancia mínima con μ dado)** (medio)
- 🎯 Técnica: $d=v^2/(2\mu g)$ — aplicación directa de cinemática con desaceleración por fricción. Sin trampa especial, solo cuidado con la aritmética de decimales.

**P10 · Resorte comprimido, sube por plano inclinado (conservación de energía)** (difícil)
- 🎯 Técnica: igualar energía potencial elástica del resorte ($\frac12kx^2$) con energía potencial gravitatoria en la altura alcanzada ($mgh$) — el ángulo del plano (37°) es un DISTRACTOR en este caso particular, porque la altura $h$ ya es vertical y no requiere descomponerla con el ángulo (la energía se conserva independientemente de la trayectoria).
- ⚡ Atajo: no hace falta calcular la distancia RECORRIDA sobre el plano inclinado (que sí dependería del ángulo) — como piden la ALTURA, el ángulo de 37° resulta ser información que no se usa en el cálculo final, solo describe el contexto físico.

**P11 · Fórmula general de carbohidratos, hallar n desde masa molar** (fácil)
- 🎯 Técnica: masa molar de la unidad repetitiva $CH_2O$ (30 g/mol), dividir masa molar total entre esa unidad. Aplicación directa, sin trampa.

**P12 · Configuración electrónica terminada en 3d⁷, hallar número de masa** (medio)
- 🎯 Técnica: reconstruir la configuración completa hasta el orbital dado (siguiendo el orden de llenado de Aufbau), sumar todos los electrones para obtener Z, luego $A=Z+n$.
- ⚠️ Trampa: hay que ESCRIBIR toda la configuración completa (no solo contar el último orbital) para no perder electrones de niveles internos — un error común es sumar solo los electrones "visibles" en el orbital mencionado.

**P13 · Balanceo redox (Cu+HNO₃), coeficiente del agente oxidante** (medio)
- 🎯 Técnica: balancear por el método de electrones ganados/perdidos, luego identificar cuál sustancia es el agente OXIDANTE (la que se reduce, no la que se oxida) y dar SU coeficiente.
- ⚠️ Trampa conceptual: confundir agente oxidante (se reduce él mismo, oxida a otro) con agente reductor es el error más común en este tipo de pregunta — hay que tener clarísima la definición antes de leer el coeficiente.

**P14 · Molaridad y normalidad de ácido diprótico con pureza y densidad** (medio) — *[respuesta corregida: A→E]*
- 🎯 Técnica multi-paso: usar densidad para hallar masa total en 1L, aplicar pureza para hallar masa del soluto puro, convertir a moles y luego a Molaridad, y multiplicar por la atomicidad de H⁺ (2, por ser diprótico) para la Normalidad.
- ⚠️ Trampa: olvidar el factor 2 al pasar de Molaridad a Normalidad en ácidos poli-próticos es el error más frecuente de esta familia de preguntas.

**P15 · Crioscopía de NaCl (temperatura de congelación)** (medio)
- 🎯 Técnica: $\Delta T=K_c \cdot m$ (molalidad), restar de 0°C.
- ⚠️ **Nota importante de calidad de examen:** rigurosamente el NaCl se disocia en 2 iones y debería aplicarse el factor de van't Hoff ($i=2$), pero NINGUNA opción de este ítem coincide con el resultado riguroso — solo coincide con la versión SIN el factor $i$. Esto revela que el examen simplifica el modelo en este punto específico (trata a los electrolitos fuertes como si no se disociaran). Vale la pena señalarlo al estudiante para que sepa que en un contexto más riguroso (ver unidad de Propiedades Coligativas) SÍ debe aplicar $i$, pero en ESTE examen puntual no se espera.

---

## 3. Examen 2-2025 (2da Opción) · 30-jul-2025

**P1 · División de polinomios con resto dado, hallar m+n+p** (difícil) — *[explicación reescrita con derivación completa; letra A se mantuvo]*
- 🎯 Técnica: plantear el cociente genérico $Ax^2+Bx+C$ (por diferencia de grados 5-3=2), usar el algoritmo de la división (dividendo = divisor·cociente + resto) y comparar coeficiente a coeficiente en potencias descendentes de $x$.
- ⚠️ Trampa/dificultad real: NO se puede "adivinar" el cociente por inspección rápida — hay que resolver el sistema de 6 coeficientes en orden (de $x^5$ hacia $x^0$, cada uno depende de los anteriores). Saltarse pasos o adivinar el cociente (como hacía la versión anterior de esta explicación, con un cociente incorrecto) lleva a una respuesta equivocada aunque "por casualidad" coincida con alguna opción.

**P2 · Ecuación exponencial de grado 4 en $e^x$, suma de soluciones** (difícil)
- 🎯 Técnica: sustitución $u=e^x$ para convertir la ecuación exponencial en una polinómica de grado 4 en $u$, factorizar por inspección de raíces enteras (probar $u=\pm1$), descartar soluciones con $u\le0$ (porque $e^x>0$ siempre).
- ⚡ Atajo: NO hace falta resolver la cuártica por fórmulas generales — al detectar 2 raíces por inspección ($u=1,u=-1$) se factoriza el polinomio en 2 cuadráticos y el resto sale con factorización simple.
- ⚠️ Trampa: la solución $u=-1$ da $e^x=-1$, que NO tiene solución real (hay que descartarla) — incluirla por error en la suma final da una respuesta incorrecta.

**P3 · Número de 2 cifras, decenas=2×unidades, invertido menos 27** (fácil)
- 🎯 Técnica: digit-number algebra estándar ($\overline{ab}=10a+b$), plantear las 2 condiciones como ecuaciones lineales simultáneas.
- Sin trampa mayor — aplicación directa una vez planteadas las ecuaciones correctamente.

**P4 · Tres circunferencias tangentes exteriores, distancia centro-punto de tangencia** (difícil)
- 🎯 Técnica: usar que los centros de circunferencias tangentes exteriormente están separados por la SUMA de sus radios, y aplicar Pitágoras en el triángulo isósceles formado por los 3 centros (el punto de tangencia T es el punto medio de uno de los lados).
- ⚠️ Trampa: identificar CORRECTAMENTE qué segmento es la hipotenusa y cuáles catetos en el triángulo formado por los centros — un error de asignación da una raíz distinta (fácil confundir $\sqrt{19}$, $\sqrt{29}$, $\sqrt{39}$ si se calculan mal los catetos).

**P5 · Ángulo entre bisectrices de 2 ángulos de un cuadrilátero** (difícil) — *[explicación reescrita con derivación correcta; letra D se mantuvo]*
- 🎯 Técnica: el ángulo entre las bisectrices de 2 ángulos ADYACENTES de un polígono se halla armando el TRIÁNGULO que forman esas bisectrices con el lado común, y usando que la suma de ángulos internos de ESE triángulo es 180° (no una fórmula memorizada de memoria sin entender de dónde sale).
- ⚠️ Trampa fuerte: existe una "fórmula rápida" mal recordada que muchos aplican sin entenderla (como la explicación original, que daba un resultado imposible de 195° para un ángulo interior) — es más seguro rearmar el triángulo y aplicar suma de ángulos internos = 180° que memorizar una fórmula de memoria sin comprenderla.

**P6 · MRUA — distancia recorrida entre 2 instantes, hallar distancia en tramo anterior** (medio)
- 🎯 Técnica: plantear la distancia recorrida ENTRE dos tiempos (no desde el inicio) como $\Delta x=\frac12 a(t_2^2-t_1^2)$, despejar $a$, y luego SÍ calcular la distancia desde el inicio con esa $a$.
- ⚠️ Trampa: confundir "distancia entre el segundo 5 y el 10" con "distancia en los primeros 10 segundos menos primeros 5" es matemáticamente lo mismo, pero plantear mal la resta de cuadrados ($t_2^2-t_1^2$, no $(t_2-t_1)^2$) es el error más común.

**P7 · Tiro parabólico llenando un contenedor cilíndrico (rapidez mínima)** (difícil)
- 🎯 Técnica: para la rapidez MÍNIMA que aún permite que el chorro entre al contenedor, el agua debe pasar exactamente rozando el BORDE SUPERIOR más cercano del contenedor (no el más lejano) — hay que identificar cuál punto geométrico define el caso límite.
- ⚠️ Trampa conceptual: elegir el punto de referencia equivocado (borde lejano en vez de cercano, o la base en vez de la altura del borde) cambia completamente el planteamiento y la respuesta.

**P8 · Paquete soltado desde globo ascendente (velocidad inicial no nula)** (medio)
- 🎯 Técnica: la velocidad inicial del paquete NO es cero — hereda la velocidad de ascenso del globo (+5 m/s hacia arriba) en el instante de soltarlo. Ecuación de posición con término lineal positivo antes del término cuadrático negativo.
- ⚠️ Trampa clásica: tratar el problema como "caída libre desde el reposo" (ignorando que el paquete sube unos instantes antes de caer, por inercia del globo) da un tiempo total incorrecto.

**P9 · Potencia de motor de elevador, pasajeros máximo** (difícil) — *[respuesta corregida: A→B]*
- 🎯 Técnica: potencia = fuerza × velocidad, hallar la fuerza máxima que el motor puede ejercer a la velocidad de operación dada, igualar esa fuerza al peso total (elevador + pasajeros).
- ⚠️ Trampa de redondeo: el resultado matemático da un número NO entero de pasajeros (28.2) — hay que truncar hacia ABAJO (no redondear al entero más cercano) porque el motor no puede levantar una fracción de pasajero extra; el máximo real es 28, no 29 ni 28.2.

**P10 · Átomos de oxígeno en masa dada de NO** (fácil)
- 🎯 Técnica: masa molar → moles → multiplicar por átomos de O por molécula → multiplicar por número de Avogadro. Aplicación directa en cadena, sin trampa mayor salvo no perder ningún factor de conversión.

**P11 · Hidrato Na₂CO₃·10H₂O, moles de agua dados, hallar moléculas de la sal** (medio)
- 🎯 Técnica: usar la PROPORCIÓN del hidrato (10 moles de agua por cada 1 mol de sal) para pasar de moles de agua a moles de sal, luego a moléculas con Avogadro.
- ⚠️ Trampa: confundir la dirección de la proporción (multiplicar por 10 en vez de dividir entre 10) es el error más común en preguntas de hidratos.

**P12 · Electrones en orbitales "s" del Silicio** (fácil)
- 🎯 Técnica: escribir la configuración electrónica completa y sumar SOLO los electrones que están en orbitales tipo s (ignorar los p).
- ⚠️ Trampa: contar todos los electrones de Z=14 en vez de filtrar solo los de orbitales s es el error más común.

**P13 · Molaridad y normalidad de ácido diprótico (variante con otra pureza/densidad)** (medio)
- 🎯 Técnica: idéntica a P14 del examen 1ra Opción (misma familia de pregunta, distintos números) — densidad → masa total → pureza → masa soluto → moles → M → N (×2 por diprótico).
- 📌 Nota de patrón: esta es la MISMA estructura de pregunta que aparece repetida entre distintas opciones del mismo año (ver también 1op-P14) — el examen reutiliza plantillas de problema cambiando solo los números. Vale la pena que el estudiante practique esta plantilla exacta hasta dominarla, porque reaparece.

---

## 4. Examen 2-2025 (2da Opción · Versión B, con Biología) · 30-jul-2025

**P1 · Monosacáridos entre las opciones dadas** (fácil)
- 🎯 Técnica: memorización de clasificación de carbohidratos (mono/di/polisacáridos). Sin trampa ni atajo — solo conocimiento directo.

**P2 · Nomenclatura binomial, mismo género o no (Panthera tigris vs Leopardus tigrinus)** (medio)
- 🎯 Técnica: en nomenclatura binomial, la PRIMERA palabra es el género — comparar géneros, no especies completas.
- ⚠️ Trampa de "sonido similar": ambos nombres científicos "suenan" a felinos parecidos (tigre-like), tentando a asumir que son la misma especie o género — hay que fijarse específicamente en la primera palabra (Panthera ≠ Leopardus).

**P3 · A qué se alimentan los consumidores primarios en una cadena trófica** (fácil)
- 🎯 Técnica: memorización directa de niveles tróficos (productores → consumidores primarios → secundarios...). Sin trampa mayor.

**P4 · Cuáles son vertebrados entre las opciones** (fácil)
- 🎯 Técnica: memorización de clasificación taxonómica básica (vertebrados vs invertebrados). Sin trampa mayor, salvo recordar que anfibios SÍ son vertebrados (a veces se confunden con otros grupos por su piel/hábitat acuático).

---

## 5. Examen 1-2025 (3ra Opción) · 20-feb-2025

**P1 · Triángulos fractales, suma de áreas infinitas** (difícil) — *[explicación reescrita con derivación rigurosa; letra D se mantuvo]*
- 🎯 Técnica: identificar que en cada "paso" de la subdivisión se generan 4 triángulos nuevos de área $(1/4)^n$, y sumar la serie geométrica de TODOS los pasos (no solo el área final "residual", sino la suma acumulada de cada generación de triángulos creados).
- ⚠️ Trampa de interpretación: el resultado depende CRÍTICAMENTE de si se cuenta o no el triángulo original como parte de la suma — dos interpretaciones razonables del enunciado dan $4/3$ (si se excluye el original, sumando solo lo "generado" desde la primera división) o $7/3$ (si se incluye) — y AMBOS valores aparecen como opciones de respuesta (A y D), lo cual sugiere que el examen diseñó la trampa a propósito para separar a quien interpreta correctamente qué cuenta como "generado".
- ⚡ Atajo: reconocer la serie geométrica de razón 1/4 (primer término = 1) y aplicar la fórmula de suma infinita $S=a/(1-r)$ directamente, en vez de sumar términos uno por uno.

**P2 · Persecución (hombre corriendo alcanza microbús con aceleración)** (medio)
- 🎯 Técnica: plantear posiciones de ambos móviles en función del tiempo, igualar, resolver la ecuación cuadrática resultante.
- ⚠️ Trampa: la ecuación cuadrática da DOS soluciones positivas (t=2 y t=3) — hay que identificar cuál es el PRIMER encuentro (la menor), ya que después de alcanzarlo el microbús (que acelera) volvería a estar más adelante y "se encontrarían" matemáticamente de nuevo en la ecuación aunque físicamente ya lo pasó en el primer cruce.

**P3 · Pozo con eco (tiempo total = caída + sonido subiendo)** (difícil) — *[respuesta corregida: B→D]*
- 🎯 Técnica: separar el tiempo total en 2 tramos con física distinta (caída libre para la piedra, MRU para el sonido) que dependen ambos de la MISMA incógnita $h$, sumando ambos tiempos = tiempo dado.
- ⚡ Atajo: en vez de resolver la ecuación completa (que mezcla una raíz cuadrada con un término lineal, incómoda algebraicamente), conviene PROBAR valores redondos sugeridos por las opciones de respuesta (h=320 da tiempos exactos de 8s y 1s) — método de "verificación por sustitución de opciones", muy eficiente cuando la ecuación no es trivial de despejar analíticamente.
- ⚠️ Trampa: la explicación original de este ítem verificó correctamente que h=320 cuadra exacto, pero por error de transcripción había quedado marcada la opción con el valor NUMÉRICO equivocado (B=405 en vez de D=320) — un recordatorio de que verificar la propia respuesta final contra el cálculo mostrado es un hábito de estudio valioso.

**P4 · Ventilador desacelerando, vueltas hasta detenerse** (medio) — *[respuesta corregida: B→D]*
- 🎯 Técnica: cinemática angular análoga a la lineal ($\omega_f^2=\omega_0^2-2\alpha\theta$), luego convertir radianes a vueltas dividiendo entre $2\pi$.
- ⚠️ Trampa: olvidar la conversión final de radianes a VUELTAS (dejar la respuesta en radianes) es el error más común en preguntas de cinemática angular con esta estructura.

**P5 · Bloque-resorte con fricción en tramo B-C, hallar coeficiente μ** (difícil)
- 🎯 Técnica: balance de energía — energía potencial inicial (altura) = energía elástica final (resorte comprimido) + energía disipada por fricción. Despejar μ de la energía disipada.
- ⚡ Atajo: no hace falta calcular velocidades intermedias en cada punto de la trayectoria — el balance GLOBAL de energía (inicio vs. fin) evita tener que analizar el movimiento tramo por tramo con cinemática.

**P6 · Redox Cu+HNO₃, razón agente oxidante/agente reductor** (medio)
- 🎯 Técnica: idéntica a P13 del examen 1ra Opción (misma reacción, mismo balanceo) pero esta vez piden la RAZÓN entre los coeficientes de oxidante y reductor, no un coeficiente aislado.
- 📌 Nota de patrón: la reacción Cu+HNO₃ (cobre con ácido nítrico) es un "caballito de batalla" del examen de química FCyT — aparece balanceada casi idéntica en más de una convocatoria. Vale la pena que el estudiante memorice esta reacción balanceada de memoria ($3Cu+8HNO_3\rightarrow3Cu(NO_3)_2+2NO+4H_2O$).

**P7 · Titulación ácido-base (H₂SO₄ con NaOH), concentración molar** (fácil)
- 🎯 Técnica: equivalentes ácido = equivalentes base en el punto de neutralización (no moles = moles, sino equivalentes = equivalentes), luego convertir Normalidad a Molaridad dividiendo entre la atomicidad del ácido (2, por diprótico).
- ⚠️ Trampa: confundir equivalentes con moles directamente (olvidar dividir entre 2 al final para pasar de N a M) es el error típico en titulaciones con ácidos poli-próticos.

**P8 · Combustión de propano, moles de O₂ requeridos** (fácil)
- 🎯 Técnica: balancear la ecuación de combustión completa, usar la proporción molar directa (relación de coeficientes) escalada a la cantidad dada.
- Sin trampa mayor una vez balanceada correctamente la ecuación — aplicación directa de estequiometría simple.

**P9 · Clasificación de almidón y celulosa (polisacáridos)** (fácil)
- 🎯 Técnica: memorización directa de clasificación de carbohidratos por tamaño de polímero. Sin trampa.

**P10 · Tipo de división celular con cromosomas idénticos en 2 hijas** (fácil)
- 🎯 Técnica: distinguir mitosis (2 hijas idénticas, mismo número de cromosomas) de meiosis (4 hijas, mitad de cromosomas) por las palabras clave del enunciado ("copia de CADA cromosoma", "DOS células hijas").
- ⚠️ Trampa: quien lee rápido y ve "división celular" + "dos células" podría no diferenciar bien de meiosis si no presta atención a que menciona "copia de CADA cromosoma" (que implica número igual, no reducido).

**P11 · Probabilidad genética, ojos azules recesivos, ambos padres de ojos azules** (medio)
- 🎯 Técnica: reconocer que si el rasgo recesivo SE EXPRESA en ambos padres, ambos son necesariamente homocigotos recesivos (aa) — no hay otra posibilidad genotípica para un rasgo recesivo fenotípicamente visible.
- ⚡ Atajo: no hace falta armar cuadro de Punnett — con aa×aa, el 100% de la descendencia es aa (ojos azules), por lo tanto la probabilidad de ojos cafés es directamente 0%, sin necesidad de calcular nada.
- ⚠️ Trampa: confundir esto con el caso de padres HETEROCIGOTOS (que sí requeriría Punnett) — la clave es notar que el enunciado dice que AMBOS padres YA tienen el fenotipo recesivo (ojos azules), lo cual fija su genotipo sin ambigüedad.

**P12 · Dónde ocurre el ciclo de Krebs** (fácil)
- 🎯 Técnica: memorización directa de biología celular (matriz mitocondrial). Sin trampa.

---

## 6. Patrones transversales detectados (entre exámenes)

Observaciones que se repiten en MÁS DE UN examen — útiles para diseñar
lecciones que ataquen el patrón, no solo el ejercicio puntual:

1. **"Ninguno" como respuesta correcta real** — en G5 y G7 (examen 2023), la
   trampa es que TODAS las opciones A-D parecen razonables pero ninguna es
   correcta. Esto refuerza que el alumno debe VERIFICAR su cálculo hasta el
   final, no "elegir la más parecida". Recomendación pedagógica: entrenar
   explícitamente a NO descartar la opción "Ninguno" solo porque las otras
   4 "suenan bien".

2. **Trampa de unidades de temperatura (°C vs K)** — aparece en Q14, Q16 (2023)
   y P15 (2025-1op) — SIEMPRE en fórmulas con presión osmótica o crioscopía.
   Es un patrón tan repetido que amerita una lección específica de "conversión
   de temperatura, primer paso obligatorio antes de cualquier fórmula de gases
   o soluciones".

3. **Reactivo limitante + pureza combinados** (Q15, 2023) — patrón de
   estequiometría con 2 trampas simultáneas (pureza Y limitante). Aparece
   también en preguntas de bancos de otros años (ver `data/examenes/umss/
   ingenieria/2025-*.md`, área química).

4. **Fórmula memorizada sin comprensión vs. re-derivación desde principios**
   — el caso más claro es P5 del examen 2da Opción (bisectrices de
   cuadrilátero): la explicación ORIGINAL de este ítem (antes de esta
   revisión) aplicaba una "fórmula rápida" mal recordada que daba un
   resultado imposible (195° como ángulo interior de un triángulo). La
   re-derivación desde suma de ángulos internos = 180° da el resultado
   correcto de forma mucho más confiable. Lección: preferir SIEMPRE
   re-derivar desde un principio básico (suma de ángulos, definición) antes
   que aplicar una fórmula memorizada de la que no se recuerda el origen.

5. **Preguntas "plantilla reutilizada" entre convocatorias del mismo año** —
   la pregunta de "molaridad y normalidad de ácido diprótico con pureza y
   densidad" aparece CASI IDÉNTICA en 1ra Opción (P14) y 2da Opción (P13)
   del examen 2-2025, solo cambiando los números. Esto sugiere que el banco
   de preguntas de la universidad reutiliza plantillas de problema entre
   convocatorias — vale la pena identificar estas "plantillas recurrentes"
   y asegurar que el estudiante las domine a fondo, porque tienen alta
   probabilidad de reaparecer con otros números.

6. **Redox Cu+HNO₃** — la MISMA reacción química aparece balanceada en 2
   preguntas distintas del banco 2025 (P13 de 1ra Opción y P6 de 3ra Opción),
   preguntando cosas ligeramente distintas sobre el mismo balanceo. Otra
   plantilla recurrente a memorizar de memoria.

7. **Errores de coherencia en el banco curado** — de las 64 preguntas
   mapeadas en este documento, **9 tenían la letra de respuesta marcada
   INCONSISTENTE con el propio cálculo mostrado en su explicación** (ver
   changelog de git del 2026-07-18). Esto es un recordatorio de que TODO
   contenido de banco de examen debe pasar por una revisión de coherencia
   interna (¿la letra marcada coincide con la matemática mostrada?) antes
   de darse por bueno — no alcanza con que "se vea resuelto", hay que
   verificar que la conclusión y la etiqueta coincidan.

---

## 7. Próximos pasos sugeridos

- [ ] Mapear con el mismo nivel de detalle los exámenes de Química/Física/
      Matemática que se carguen de OTRAS facultades (Medicina, Derecho) en
      archivos separados dentro de esta misma carpeta `data/research/umss/`.
- [ ] Cuando lleguen más facsímiles de FCyT, revisar si los "patrones
      transversales" de la sección 6 se repiten (validando o refutando cada
      patrón con más datos).
- [ ] Usar este mapa para priorizar qué lecciones de `/aprende` necesitan un
      refuerzo específico en la trampa/atajo detectado (por ejemplo: una
      lección corta y puntual sobre "conversión de temperatura obligatoria
      antes de fórmulas de gases y soluciones", ya que es el patrón #2 de la
      sección 6).
