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

## 0. Convención de notación matemática al cargar un examen nuevo

> Lección aprendida (18-jul-2026): en el 1-2023 varias preguntas se cargaron
> con fracciones/exponentes compuestos como texto plano ("3x³/y²", "b/(2√3)",
> "[sen(2θ)−sen(4θ)]/[...]") y Ronald lo vio como texto plano feo, sin
> parecido al examen real. El renderer (`MathText.tsx`) YA soporta LaTeX
> real vía KaTeX — el problema no era el componente, era que el `.md` no lo
> usaba. A partir de ahora, todo examen nuevo debe cargarse así:

**Usar `$...$` (inline) o `$$...$$` (display) en el `.md` fuente cuando:**
- Hay una **fracción algebraica** (con letras/paréntesis), no un número suelto:
  `$\dfrac{3x^3}{y^2}$`, `$\dfrac{H-4}{H}$`. Mal: `3x³/y²` o `(H-4)/H` en texto plano.
- Hay un **binomio o expresión elevada a una potencia con paréntesis**:
  `$\left(\dfrac{3x^3}{y^2} + \dfrac{y^4}{9x^6}\right)^{12}$`.
- Hay una **ecuación completa** con fracciones a ambos lados del "=" (identidades
  trigonométricas, fórmulas físicas con despeje): `$E = \dfrac{B}{5a^2} + \dfrac{A\tan\theta}{a}$`.
- Hay **notación con barra** para representar cifras/vectores: número de dos
  cifras $\overline{ab}$ (NO "ab (número de dos cifras)" entre paréntesis).
- Raíces con expresión adentro: `$\sqrt{3}$`, `$2\sqrt{3}+1$` (mejor que "2√3+1"
  suelto si está dentro de una fracción o ecuación más grande).

**Dejar como texto/unicode plano (no hace falta LaTeX) cuando:**
- Es una **unidad** (g/mol, m/s², N/C, kN/C) — se lee bien tal cual.
- Es una **división numérica de un solo paso** (738/41 = 18, 72/12 = 6) — no
  es una fórmula, es una cuenta.
- Es un **exponente simple sobre una sola letra/número** sin fracción ni
  paréntesis alrededor (a², x³, 10⁻⁶, ML²T⁻²) — el superíndice unicode ya se
  ve como exponente real.
- Fórmulas de química con subíndices (C₆H₁₂O₆, Li₂S) — el unicode de
  subíndice ya es legible.

**Fidelidad de figuras (lección del 19-jul-2026):** el motor de geometría
garantiza los ÁNGULOS y direcciones, pero la COMPOSICIÓN es otra cosa: dónde
va cada etiqueta, si el plano es banda o línea, si el cuadrado va relleno,
qué textos NO están en el PDF (nada de agregar "μ = 0.25" o leyendas que el
original no tiene). Al reconstruir una figura: (1) inventario elemento por
elemento del recorte del PDF ANTES de dibujar (qué hay, dónde está, qué
estilo tiene), (2) render y comparación lado a lado DESPUÉS, ítem por ítem.
"Se parece" no alcanza: Ronald compara contra el PDF y tiene razón en
exigir idéntico.

**Reglas técnicas del parser/renderer (para no romper nada):**
- `MathText.tsx` separa segmentos con la regex `\$([^$\n]+)\$` para inline:
  el contenido **no puede tener un salto de línea** dentro del mismo `$...$`.
  Si una fórmula empieza en una línea del "Paso X" y termina en la siguiente,
  hay que abrir y cerrar el `$...$` DENTRO de esa misma línea.
- Verificar antes de subir que el archivo tiene la misma cantidad de `$` por
  línea es par (ningún `$` suelto) — un one-liner rápido:
  ```python
  for i, l in enumerate(open("archivo.md", encoding="utf-8"), 1):
      if l.count("$") % 2: print(i, l)
  ```
- KaTeX soporta `\text{...}` para palabras dentro de una fórmula (ej.
  `\text{sen}`, ya que KaTeX no trae `\sen` como los paquetes en español) y
  `\dfrac{}{}` para fracciones a tamaño completo (no `\frac`, que sale chico
  en modo inline).

---

## Índice de exámenes cubiertos

| Examen | Archivo fuente | Preguntas | Estado |
|---|---|---|---|
| 1-2023 (1ra Opción), 19-dic-2022 | `2023-1op-1-2023.md` | 20 | ✅ Mapeado completo |
| 2-2025 (1ra Opción), 21-jul-2025 | `2025-1op-2-2025.md` | 15 | ✅ Mapeado completo |
| 2-2025 (2da Opción), 30-jul-2025 | `2025-2op-2-2025.md` | 13 | ✅ Mapeado completo |
| 2-2025 (2da Opción, Versión B), 30-jul-2025 | `2025-2op-2-2025-version-b.md` | 4 | ✅ Mapeado completo |
| 1-2025 (3ra Opción), 20-feb-2025 | `2025-3op-1-2025.md` | 12 | ✅ Mapeado completo |
| 2-2022 (1ra Opción), 31-may-2022 | `2022-1op-2-2022.md` | 20 | ✅ Mapeado — F11 con nota abierta (ver más abajo) |
| 1-2023 (2da Opción), 19-ene-2023 | `2023-2op-1-2023.md` | 20 | ⚠️ 15/20 mapeadas — G5,G6,G7,F9,F12 marcadas VERIFICAR (sin figura) |
| 2-2022 (2da Opción), 28-jun-2022 | `2022-2op-2-2022.md` | 20 | ⚠️ 18/20 mapeadas — G7,F9 marcadas VERIFICAR (sin figura nítida) |
| 1-2023 (3ra Opción), 7-feb-2023 | `2023-3op-1-2023.md` | 20 | ⚠️ 19/20 mapeadas — G8 marcada VERIFICAR (sin figura nítida) |
| 2-2022 (3ra Opción), 5-ago-2022 | `2022-3op-2-2022.md` | 20 | ⚠️ 18/20 mapeadas — G7,F10 marcadas VERIFICAR (sin figura nítida) |
| 1-2005 (1ra Opción) | `2005-1op-1-2005.md` | 20 | ✅ Mapeado completo (100%) — examen más antiguo del banco, sin sección de Biología |
| 1-2005 (2da Opción) | `2005-2op-1-2005.md` | 20 | ✅ Mapeado completo (100%) — Q13 (calcio en tejido óseo) es un "Ninguno" real, verificado |
| 2-2005 (1ra Opción) | `2005-1op-2-2005.md` | 20 | ✅ Mapeado completo (100%) — Q12 (números cuánticos) es un "Ninguno" real |
| 2-2005 (2da Opción) | `2005-2op-2-2005.md` | 20 | ✅ Mapeado completo (100%) — Q20 (potencial eléctrico) es un "Ninguno" demostrable algebraicamente |
| 1-2006 (1ra Opción) | `2006-1op-1-2006.md` | 20 | ✅ Mapeado completo (100%) — primer examen viejo CON Biología; A4 es un "Ninguno" real |
| 1-2006 (2da Opción) | `2006-2op-1-2006.md` | 20 | ⚠️ 19/20 mapeadas — F12 (circuito de 4 resistencias) marcada VERIFICAR (topología ambigua) |
| Primer Parcial Propedéutico I-2006 | `2006-parcial1-1-2006.md` | 38 | ⚠️ 37/38 mapeadas — **categoría `parcial_curso`, separada de Admisión** — G12 es un "Ninguno" real |

**Total preguntas mapeadas: 322** (311 resueltas con certeza + 11 pendientes de figura, documentadas igual).

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

**F11 · Campo eléctrico MÍNIMO para equilibrio de un péndulo cargado** (difícil)
- 🎯 Técnica: equilibrio de 3 fuerzas en un péndulo (peso, tensión del hilo, fuerza eléctrica). Descomponer el peso a lo largo del hilo (lo absorbe la tensión: mg·cos α) y perpendicular al hilo (mg·sen α, lo debe cubrir qE).
- ⚡ Atajo clave (el corazón del "mínimo"): la fuerza mínima para sostener un péndulo desviado es SIEMPRE perpendicular al hilo — cualquier otra dirección desperdicia componente a lo largo del hilo (que la tensión ya cubre gratis) y exige un campo mayor. Con eso, E_min = mg·sen α / q, directo, sin plantear el sistema completo de equilibrio.
- ⚠️ Trampa: quien no conoce el argumento del mínimo intenta plantear equilibrio general con dirección de E desconocida (dos ecuaciones, dos incógnitas) y pierde muchísimo tiempo. La figura ayuda: las líneas de campo están dibujadas perpendiculares al hilo.
- 📝 Nota de curaduría (19-jul-2026): esta pregunta estuvo un tiempo mal transcripta como "partícula sobre plano inclinado" — el número final coincidía de casualidad (ambos setups dan mg·sen α/q) pero el enunciado, la figura y el razonamiento eran de OTRO problema. Corregida contra el PDF: es un péndulo colgando de un hilo. Lección: verificar el SETUP físico contra la figura del PDF, no solo el resultado numérico.

**F12 · Circuito resistivo, resistencia equivalente A-B** (difícil) — **respuesta real: E) Ninguno (Req = 18,75 Ω)**
- 🎯 Técnica: reducción serie/paralelo por etapas, PERO empezando por nombrar los nodos (riel superior T, riel inferior D, riel de B). Reducción: 10∥10 = 5 entre B y D; de T a B dos caminos: 5 directo ∥ (10 izquierdo + 5) = 3,75; el 15 Ω en serie obligada (único cable a A): 15 + 3,75 = 18,75.
- ⚠️ **Trampa fuerte** (tercer "Ninguno" real del examen, junto con G5 y G7): 18,75 no está entre las opciones (5, 10, 20, 15), todas "con pinta de correctas" (valores redondos de la lista de resistencias). El examen caza al que fuerza su resultado hacia la opción más parecida en vez de confiar en su cálculo.
- ⚡ Atajo de chequeo: el 15 Ω en serie obligada implica Req > 15 al toque — eso ya descarta A, B y D en segundos, y solo queda verificar si es exactamente 20 o Ninguno.
- 📝 Nota de curaduría (19-jul-2026): resuelta con certeza recién al recibir el recorte nítido del PDF. Con la lectura alternativa de la figura (5 Ω en serie solo con el 10 Ω derecho) daría 31 Ω — también Ninguno, así que la respuesta E es robusta a la ambigüedad. La respuesta "B) 10" que estuvo marcada antes (con VERIFICAR) era incorrecta.

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

## 6. Examen 2-2022 (1ra Opción) · 31-may-2022

> Primer examen cargado por el pipeline "PDF adjuntado al chat → Claude
> resuelve directamente" (sin pasar por otra IA/megaprompt). Las 20
> respuestas se verificaron con cálculo numérico independiente (script
> Python) antes de escribir el `.md`. Las 6 figuras se construyeron con el
> motor de geometría — son un primer borrador esquemático (sin recorte
> nítido del PDF por pregunta para comparar lado a lado como se hizo con
> el examen 2023): pendiente de que Ronald las compare contra el original.

### Aritmética-Álgebra

**A1 · Suma de recíprocos de logaritmos, identidad $\log_{abc}$** (difícil)
- 🎯 Técnica: meter el "1" de cada denominador DENTRO del logaritmo ($1=\log_a a$) para armar $\log_a(abc)$, $\log_b(abc)$, $\log_c(abc)$, y después aplicar cambio de base ($1/\log_a N=\log_N a$).
- ⚡ Atajo: una vez que los tres términos son $\log_{abc}a+\log_{abc}b+\log_{abc}c$, la suma es directamente $\log_{abc}(abc)=1$ — no hace falta asumir valores numéricos de $a,b,c$ para nada, la identidad es general.
- ⚠️ Trampa: quien no ve el truco de "meter el 1 adentro" intenta resolver con valores numéricos concretos de prueba, lo cual funciona pero es mucho más lento y no generaliza (funciona en este caso porque la respuesta es una constante).

**A2 · Sistema exponencial-logarítmico, factorización en potencias de 2 y 3** (medio)
- 🎯 Técnica: resolver primero la ecuación logarítmica (más simple) para expresar $y$ en términos de $x$, sustituir, y factorizar el número dado (576) en sus factores primos para igualar bases.
- ⚡ Atajo: factorizar 576=2⁶·3² ANTES de sustituir hace que $(3\cdot2)^x\cdot2^4=2^6\cdot3^2$ se resuelva en un paso ($6^x=36$), en vez de tantear valores de $x$.

**A3 · Teorema del resto, sin dividir de verdad** (medio)
- 🎯 Técnica: teorema del resto — el resto de dividir $P(x)$ entre $(x-a)$ es simplemente $P(a)$. No hace falta hacer la división larga.
- ⚠️ Trampa: quien no recuerda el teorema del resto pierde mucho tiempo hacienda la división polinómica completa dos veces.

**A4 · Progresión aritmética, suma de términos centrales** (difícil)
- 🎯 Técnica: en una PA, dos términos simétricos respecto al centro SIEMPRE suman lo mismo que los extremos — eso convierte "suma de 6 términos centrales" en "3 veces la suma de los extremos" sin necesidad de plantear 6 ecuaciones.
- ⚡ Atajo: con $a_1+a_{16}$ y $a_1\cdot a_{16}$ conocidos, se arma una ecuación cuadrática de dos incógnitas resuelta por Vieta (raíces que suman y multiplican los valores dados) en vez de despejar un sistema lineal más largo.

### Geometría-Trigonometría

**G5 · Triángulo equilátero con equilátero inscrito, PQ⊥BC** (difícil)
- 🎯 Técnica: plantear coordenadas, usar que P y Q comparten abscisa (por la perpendicularidad) y que R se obtiene rotando 60° — un problema de geometría sintética resuelto con álgebra de coordenadas en vez de trigonometría pura.
- ⚡ Atajo: la razón de áreas es directamente el cuadrado de la razón de lados (semejanza) — no hace falta calcular las áreas por separado con fórmula de Herón o similar.
- 📝 Resultado curioso: esta configuración (PQ⊥BC) da la razón MÍNIMA posible (3) entre un triángulo equilátero y uno inscrito — es la configuración "más apretada" de las infinitas posibles.

**G6 · Cuadrilátero con dos incírculos, radio de triángulo rectángulo** (difícil)
- 🎯 Técnica: fórmula directa del radio inscrito en un triángulo RECTÁNGULO, $r=\frac{a+b-c}{2}$ (con $c$ la hipotenusa) — mucho más rápida que área/semiperímetro para este caso particular.
- ⚡ Atajo: sumar directamente las dos ecuaciones de perímetro parcial ($PQ+QR=PR+6$ y $PS+RS=PR+4$) da el perímetro total en función de una sola incógnita ($PR$), sin necesitar los 4 lados individuales.

**G7 · Reducción al primer cuadrante con múltiplos de $\pi$** (medio)
- 🎯 Técnica: usar que seno y coseno tienen período $2\pi$ para restar/sumar múltiplos completos ANTES de aplicar identidades de co-función o de simetría — reduce cada término a un ángulo simple ($\theta$, $\pi/2-\theta$, $\pi+\theta$) antes de tocar los datos del enunciado.
- ⚠️ Trampa: el signo de $\text{sen}(\pi+\theta)=-\text{sen}\theta$ es fácil de olvidar; y ubicar bien el cuadrante (tercer cuadrante: seno y coseno AMBOS negativos) es la otra fuente típica de error de signo.

**G8 · Identidad de ángulo múltiple, desarrollo de $\sin^4\theta$** (difícil)
- ⚡ Atajo clave: en vez de "reconocer" la identidad a ojo, desarrollar $\sin^4\theta$ y $\cos^4\theta$ por separado con las fórmulas de ángulo doble aplicadas DOS veces (una para $\sin^2$, otra para $\cos^2(2\theta)$) y comparar signo del término del medio — el signo negativo de $-\frac12\cos2\theta$ es lo que distingue $\sin^4\theta$ de $\cos^4\theta$ (que da signo positivo ahí).

### Física

**F9 · MRU, ecuación de velocidad constante entre dos tramos** (medio)
- 🎯 Técnica: en velocidad constante, el cociente distancia/tiempo da el MISMO valor en cualquier tramo — esa igualdad ES la ecuación a resolver, no hace falta ninguna fórmula de cinemática más compleja.

**F10 · Bloques en contacto, fuerza de compresión** (medio)
- 🎯 Técnica: primero el SISTEMA completo (para la aceleración común), después AISLAR un solo bloque (para la fuerza de contacto entre ellos) — es el patrón estándar de "bloques que se tocan y se mueven juntos".
- ⚠️ Trampa: el rozamiento actúa SOLO sobre uno de los bloques (dato explícito del enunciado) — aplicarlo a los dos por costumbre da un resultado incorrecto.

**F11 · Dos lanzamientos perpendiculares (uno horizontal, otro vertical) desde el mismo punto** (difícil) — **respuesta real: E) Ninguno**
- 🎯 Técnica: cuando dos móviles parten del MISMO punto pero uno se mueve solo horizontal y el otro solo vertical, cada desplazamiento se calcula por separado (tiro horizontal para uno, caída con velocidad inicial para el otro) y la separación final es la HIPOTENUSA del triángulo rectángulo que forman $\Delta x$ y $\Delta y$ — no una simple resta ni una simple suma.
- ⚠️ Trampa fuerte: 90 (la $\Delta x$ sola) y 60 (la $\Delta y$ sola) son DISTRACTORES DIRECTOS — cada una es una opción real (B y C) para quien calcula solo una de las dos componentes y se olvida de combinarlas con Pitágoras. El resultado real (30√13≈108,2) no está entre las opciones: la respuesta es Ninguno.
- 📝 Nota de curaduría (19-jul-2026): esta pregunta se corrigió DOS veces. Primero se leyó como "sentidos horizontales opuestos" (por una descripción de texto imprecisa), dando 150 m — coincidía por casualidad con la opción A. Con la imagen nítida del PDF se vio que en realidad es un lanzamiento horizontal (30 m/s) + uno vertical hacia abajo (20 m/s) desde el mismo punto, dando el resultado real de arriba. Lección repetida: cuando hay ambigüedad de figura, esperar la imagen nítida antes de fijar una respuesta — un resultado "limpio" que coincide con una opción NO es garantía de que la lectura de la figura sea la correcta.

**F12 · Plano inclinado con fuerza aplicada HORIZONTAL (no a lo largo del plano)** (difícil)
- 🎯 Técnica: cuando la fuerza aplicada NO es paralela al plano (acá es horizontal), hay que descomponerla en dos direcciones igual que al peso — es un paso extra que no aparece en los problemas típicos de plano inclinado con fuerza ya alineada.
- ⚠️ Trampa fuerte: hay que verificar hacia dónde tiende a moverse el bloque ANTES de asumir la dirección de la fricción — acá $F\cos37°$ (160 N, hacia arriba) es MENOR que $mg\,\text{sen}37°$ (300 N, hacia abajo), así que el bloque desliza hacia abajo y la fricción actúa hacia ARRIBA (fácil de asumir al revés si no se verifica).
- ⚡ Atajo de verificación: comparar las dos componentes SIN fricción primero define el sentido del movimiento en un paso, antes de calcular la normal y la fricción.

### Química

**Q13 · Estequiometría con reactivo limitante, moles desde gas y desde molaridad** (difícil)
- 🎯 Técnica: hallar los moles de CADA reactivo por una vía distinta (ecuación de gases ideales para el Cl₂, molaridad×volumen para el NaOH) y comparar contra la proporción estequiométrica para identificar el limitante ANTES de calcular el producto.
- ⚠️ Trampa: la opción "7450" (sin convertir a kg) es un distractor directo para quien calcula bien pero olvida la conversión de unidades del enunciado.

**Q14 · Balanceo redox por ion-electrón, coeficientes de productos** (difícil)
- 🎯 Técnica: identificar las dos semirreacciones (oxidación del Hg⁰→Hg²⁺, reducción de N⁺⁵→N⁺²) e igualar electrones por mínimo común múltiplo — método mucho más confiable que balancear por tanteo en una reacción con 3 reactivos y 4 productos.
- ⚡ Atajo: como todo el nitrógeno del reactivo termina como NO (no hay otro producto nitrogenado), el coeficiente de LiNO₃ es IGUAL al de NO — evita tener que rastrear el nitrógeno por separado.

**Q15 · Presión parcial desde fracción molar relativa** (medio)
- 🎯 Técnica: plantear la fracción molar de un gas como múltiplo de la del otro, usar que las fracciones molares suman 1, y aplicar la ley de Dalton directamente.

**Q16 · Descenso de presión de vapor (Raoult), masa molar de un soluto** (difícil)
- 🎯 Técnica: la ley de Raoult da la fracción molar del SOLVENTE; de ahí se despeja la del soluto, y combinando con la composición en masa (% p/p) se arma una ecuación con una sola incógnita (los moles del soluto).
- ⚠️ Trampa: mezclar "gramos de soluto" con "porcentaje de la solución total" en vez de la masa real (82 g de 100 g de solución, no 82 g sueltos) es el error más común en este tipo de problema.

### Biología

**B17-B20 · Preguntas de definición directa** (fáciles, sin trampa matemática)
- 🎯 Técnica: memorización de conceptos base (estructura del nucleótido, funciones de lípidos/proteínas, jerarquía taxonómica). B19 es la más sutil de las 4: tanto "digestión" (enzimas=proteínas) como "defensa" (anticuerpos=proteínas) son funciones reales de las proteínas, pero el examen espera la respuesta más clásica del temario (defensa en la sangre); vale la pena reforzar en Aprende que la función enzimática TAMBIÉN es una función proteica, para que el alumno entienda por qué B es un distractor plausible y no un error del examen.

---

## 7. Examen 1-2023 (2da Opción) · 19-ene-2023

> Cargado bajo la directiva "agreguemos todos de una vez y después
> arreglamos" (19-jul-2026): prioridad en CONTENIDO verificado, figuras
> deferidas. 15/20 respuestas verificadas con cálculo numérico
> independiente. Las 5 preguntas que dependen de una figura geométrica o
> vectorial precisa (G5, G6, G7, F9, F12) NO se pudieron resolver con
> certeza solo desde el texto — quedan marcadas `**respuesta:** E` como
> placeholder explícito con `VERIFICAR` en la explicación, pendientes del
> recorte nítido del PDF. Ninguna figura fue construida todavía para este
> examen.

### Aritmética-Álgebra

**A1 · Edades proporcionales, condición futura** (medio)
- 🎯 Técnica: "proporcional a" se traduce en escribir cada cantidad como $k\times$razón — convierte un reparto proporcional con condición futura en una sola ecuación lineal en $k$, igualando dos razones cualquiera.
- Sin trampa mayor una vez planteada la ecuación — cuidado solo con no confundir a quién corresponde cada razón.

**A2 · Binomio de Newton vía diferencia de potencias, término N-ésimo** (difícil)
- 🎯 Técnica: reconocer $\dfrac{a^{10}-b^{10}}{a-b}$ como la suma de 10 términos de una progresión geométrica de exponentes (no como un binomio de Newton clásico) — factorización de diferencia de potencias iguales.
- ⚠️ Trampa: contar bien el índice del "sexto término" ($k=5$ si el primero es $k=0$) — un desfase de índice cambia el exponente final.

**A3 · Identidad logarítmica numérica** (difícil)
- 🎯 Técnica: cuando bases y argumentos son múltiplos entre sí con una relación oculta (acá $12\times18=6^3$, $24\times54=6^4$), la expresión colapsa a una constante — la vía más rápida y confiable es verificar numéricamente con calculadora en vez de buscar la identidad algebraica exacta.
- ⚡ Atajo: sustitución numérica directa (cambio de base) en vez de perseguir una demostración algebraica general.

**A4 · Teorema del resto con divisor cuadrático (sistema de 3 ecuaciones)** (difícil)
- 🎯 Técnica: teorema del resto generalizado — dividir por $x^2+5x+6=(x+2)(x+3)$ con resto lineal $(-11x+13)$ significa que $P(-2)$ y $P(-3)$ son ESE resto evaluado en cada raíz, dando 2 ecuaciones más (junto con $P(1)=2$) para un sistema de 3 incógnitas ($a,b,c$).
- ⚠️ Trampa: factorizar bien el divisor cuadrático antes de evaluar — si no se factoriza correctamente, no se puede aplicar el teorema del resto a cada raíz por separado.

### Geometría-Trigonometría

**G5 · Cuatro semicircunferencias en un cuadrado, radio de circunferencia central** (difícil) — **VERIFICAR (sin figura)**
- ⚠️ No resoluble desde el texto: probé la lectura "obvia" (semicircunferencia con diámetro = lado completo, radio 2) y encontré una CONTRADICCIÓN geométrica real — con ese radio las 4 semicircunferencias se tocan exactamente en el centro del cuadrado, sin dejar lugar a una circunferencia central de radio positivo. Eso prueba que el radio/apoyo real de las semicircunferencias es otro, pero no se puede determinar sin ver la figura. Marcada E (Ninguno) como placeholder, no como respuesta verificada.

**G6 · Tres cuadrados + triángulo equilátero, área del triángulo** (difícil) — **VERIFICAR (sin figura)**
- ⚠️ No resoluble desde el texto: la disposición de los 3 cuadrados de lado 12 (en fila, en escalera, u otra) y por qué vértices específicos pasan los 2 lados del triángulo determinan toda la geometría — sin verla, cualquier respuesta sería adivinada.

**G7 · Cuadrado + triángulo equilátero, área sombreada** (difícil) — **VERIFICAR (sin figura)**
- ⚠️ No resoluble desde el texto: "el triángulo oscuro" es una región sombreada específica que cambia completamente de área según la posición relativa del triángulo equilátero respecto al cuadrado.

**G8 · Suma de diagonales desde un vértice en hexágono regular** (medio)
- 🎯 Técnica: memorizar las 3 distancias típicas desde un vértice de un hexágono regular de lado $L$: al adyacente $L$, a la diagonal corta (salta 1 vértice) $L\sqrt3$, al opuesto (diámetro) $2L$ — evita tener que recalcular cada distancia con ley de cosenos.
- ⚡ Atajo: por simetría, $\overline{AE}$ (4 pasos) es igual a la diagonal corta del otro lado ($\sqrt3$) sin necesidad de recalcularla — no hace falta ley de cosenos para ninguna de las tres distancias si se memoriza el patrón.

### Física

**F9 · Suma de cuatro vectores en una circunferencia** (difícil) — **VERIFICAR (sin figura)**
- ⚠️ No resoluble desde el texto: la suma vectorial depende críticamente de la dirección exacta de cada uno de los 4 vectores (ángulos entre sí). Probé una lectura razonable de los 30° marcados y el resultado no coincidió limpio con ninguna opción — señal de lectura incorrecta, no de error de cálculo. Marcada VERIFICAR en vez de forzar una respuesta.

**F10 · Vectores suma/resta con ángulo entre resultantes, hallar módulo de A** (difícil)
- 🎯 Técnica: cuando dan $\vec P=\vec A+\vec B$ y $\vec Q=\vec A-\vec B$, sumar las dos ecuaciones cancela $\vec B$ directamente ($\vec P+\vec Q=2\vec A$) — no hace falta despejar $\vec B$ para nada.
- ⚡ Atajo: aplicar la fórmula del módulo de una suma de vectores ($|\vec P+\vec Q|^2=P^2+Q^2+2PQ\cos\theta$) sobre $\vec P+\vec Q$ directamente, en vez de descomponer todo en componentes x/y.

**F11 · MRU, hora de alcance con salida retrasada** (medio)
- 🎯 Técnica: medir la posición de cada móvil como fracción de la distancia total en función del tiempo transcurrido desde un ORIGEN COMÚN, con el móvil que sale después usando $(t-\text{retraso})$ en su ecuación.
- ⚠️ Trampa: mismo patrón que P6 del examen 2-2025 — olvidar el desfase de la hora de salida (usar $t$ en vez de $t-1$ para el auto) da una ecuación y una hora de encuentro incorrectas.

**F12 · Circuito con dos fuentes ideales, lectura de amperímetro** (difícil) — **VERIFICAR (sin figura)**
- ⚠️ No resoluble desde el texto: resolver por mallas/nodos requiere saber la topología exacta (qué elemento está en qué rama, dónde está el amperímetro) — imposible de reconstruir con certeza sin el diagrama.

### Química

**Q13 · Estequiometría redox (NaMnO₄+HCl→Cl₂), pureza + rendimiento + gas** (difícil)
- 🎯 Técnica multi-paso: balancear por electrones (Mn⁺⁷→Mn⁺² gana 5e⁻, 2Cl⁻¹→Cl₂ pierde 2e⁻, mcm=10) antes de tocar estequiometría, luego masa→pureza→moles→proporción→rendimiento→gases ideales.
- ⚠️ Doble trampa: (1) pureza del ácido comercial (36,5%, no HCl puro), (2) rendimiento del 80% se aplica DESPUÉS del cálculo estequiométrico teórico, no antes.

**Q14 · Descenso crioscópico, mezcla anticongelante+agua, temperatura de congelación** (difícil)
- 🎯 Técnica: misma familia que Q14/Q16 del examen 1ra Opción 2023 — $\Delta T_f=K_c\cdot m$ con molalidad = moles de soluto / kg de SOLVENTE (agua), no de la mezcla total.
- ⚠️ Trampa: convertir volumen a masa con la densidad de CADA sustancia por separado (el anticongelante y el agua tienen densidades distintas) antes de calcular moles y molalidad.

**Q15 · Dilución de HCl concentrado a una solución menos concentrada** (medio)
- 🎯 Técnica: lo que se conserva al diluir es la MASA del soluto puro (HCl), no el volumen ni la concentración — igualar masa de HCl en la solución concentrada (antes de diluir) con la masa de HCl en la solución final.
- ⚠️ Trampa: usar densidades DISTINTAS para la solución concentrada (1,25 g/mL) y la final (1,00 g/mL) — mezclar cuál densidad va con cuál volumen es el error típico.

**Q16 · Descomposición de KClO₃, moles desde volumen de O₂ en gases ideales** (medio)
- 🎯 Técnica: primero hallar moles de gas con $PV=nRT$, RECIÉN después aplicar la proporción estequiométrica de la ecuación balanceada ($2\text{KClO}_3\rightarrow2\text{KCl}+3\text{O}_2$).
- Sin trampa mayor más allá de balancear correctamente la ecuación y no invertir la proporción 2:3.

### Biología

**B17-B20 · Preguntas de definición directa** (fáciles/medias, sin trampa matemática)
- 🎯 Técnica: memorización de conceptos base (virus como parásitos intracelulares obligados, nucleótidos como unidad de ácidos nucleicos, clasificación mono/di/polisacáridos por tamaño, esteroides como subclase de lípidos).
- ⚠️ B17 repite el mismo patrón de trampa de vocabulario coloquial que B19 del examen 2-2022: "replicarse por sí mismos" suena a algo que un virus SÍ hace coloquialmente, pero técnicamente es justo lo que NO puede hacer sin una célula huésped.
- ⚠️ B19 (disacáridos) tiene 2 distractores por categoría vecina: la opción A mezcla un polisacárido (celulosa) con un disacárido real (lactosa), y la opción C tiene dos monosacáridos — hay que verificar que AMBOS elementos de la opción pertenezcan a la categoría pedida, no solo uno.

---

## 8. Examen 2-2022 (2da Opción) · 28-jun-2022

> Mismo pipeline "PDF adjuntado al chat → Claude resuelve directamente".
> 18/20 respuestas verificadas con cálculo numérico independiente (Python).
> G7 (área sombreada entre dos cuadrados con arcos) y F9 (altura máxima de
> tiro parabólico con puntos A/B intermedios) quedan marcadas VERIFICAR:
> ambas dependen de una lectura exacta de la figura que no pude confirmar
> con certeza — en ambos casos probé la lectura más directa/plausible y el
> resultado no coincidió limpio con ninguna opción, señal de que la lectura
> de la figura no es la correcta, no de un error de cálculo.

### Aritmética-Álgebra

**A1 · Trabajo con obreros, regla de tres inversa tras retirar personal** (fácil)
- 🎯 Técnica: medir el trabajo en "obrero-días" (constante para una misma fracción de obra) — convierte el problema en una simple división, sin necesitar plantear una regla de tres compuesta explícita.
- Sin trampa mayor más allá de no perder de vista que falta $\frac13$ de la obra (no la obra completa) para el segundo tramo.

**A2 · Identidad logarítmica con cambio de base** (difícil)
- 🎯 Técnica: mismo patrón que A1 del examen 1-2023 (1ra Opción) — usar variables auxiliares ($X=\log_ab$, $Y=\log_ac$) y la identidad de cambio de base $\log_ba=1/\log_ab$ para reescribir TODO el problema en términos de $X/Y$, sin necesitar valores numéricos concretos de $a,b,c$.
- ⚡ Atajo: una vez que $X/Y=a$ (del dato), $E$ resulta ser exactamente $\log_a(Y/X)=\log_a(1/a)=-1$ — sale directo sin manipular logaritmos compuestos adicionales.

**A3 · Progresión geométrica, razón desde relación entre sumas parciales** (medio)
- 🎯 Técnica: plantear $S_6=9S_3$ con la fórmula de suma de PG, sustituir $u=r^3$ para reducir a una ecuación cuadrática simple en $u$.
- ⚠️ Trampa: la ecuación factorizada da dos soluciones ($u=1$ o $u=8$) — $u=1$ corresponde a $r=1$, un caso degenerado (la fórmula de suma de PG no aplica con $r=1$, división por cero), hay que descartarlo y quedarse con $u=8\Rightarrow r=2$.

**A4 · Descuentos sucesivos, factor multiplicativo** (fácil)
- 🎯 Técnica: los descuentos sucesivos se combinan MULTIPLICANDO los factores "lo que queda" (no sumando los porcentajes) — error clásico sumar 25+40+20=85% en vez de multiplicar los factores complementarios.

### Geometría-Trigonometría

**G5 · Mediatriz de un lado, hallar segmento usando triángulos isósceles en cadena** (difícil)
- 🎯 Técnica: la propiedad clave de la mediatriz (todo punto sobre ella equidista de los extremos del segmento) genera DOS triángulos isósceles encadenados — el primero ($EBC$) da el ángulo, el segundo ($ABE$) da el lado buscado, sin necesitar ley de cosenos ni coordenadas.
- ⚡ Atajo: no hace falta calcular $BC$ ni $AC$ numéricamente para resolver — el argumento de ángulos (isósceles en cadena) da $EC=AB$ directamente en este caso particular. (Se verificó igual con ley de senos para confirmar: coincide exacto.)

**G6 · Diagonales medias entre puntos medios de lados consecutivos** (difícil) — **respuesta real: E) Ninguno**
- 🎯 Técnica: mismo tipo de razonamiento que "diagonales trazadas desde $k$ vértices consecutivos de un polígono" pero aplicado a puntos medios de lados — tratar los $m$ puntos medios como una CADENA (no un ciclo cerrado), y las diagonales son los pares no-adyacentes: $\binom{m}{2}-(m-1)=\frac{(m-1)(m-2)}{2}$.
- ⚠️ **Trampa fuerte**: resolviendo $(m-1)(m-2)=30$ da $m=7$ (exacto, sin resto) y por lo tanto $n=m+4=11$ — un valor que NO está entre las opciones (8,7,6,9), todas números "razonables" para un polígono. Incluso probando la lectura alternativa más simple (sin excluir los pares adyacentes, $\binom{m}{2}=15$) da $n=10$, tampoco en las opciones. Bajo cualquier interpretación razonable, la respuesta es Ninguno.

**G7 · Área sombreada entre semicircunferencias y cuartas circunferencias en 2 cuadrados** (difícil) — **VERIFICAR (sin figura confirmada)**
- ⚠️ No resoluble con certeza desde el texto+imagen disponible: reconstruí la figura con el arco pequeño (semicircunferencia, diámetro = lado) centrado en el punto medio del lado, y el arco grande (cuarta circunferencia, radio = lado completo) centrado en el vértice opuesto — el área de la región encerrada entre ambos da $18\pi\approx56{,}5$ por cuadrado, un valor CON $\pi$ que no coincide con ninguna opción (todas son enteros limpios). Esto indica que mi lectura de cuál es exactamente la región sombreada (o el centro/radio exacto de algún arco) no es la correcta.

**G8 · Triángulo equilátero inscrito en circunferencia, área en función del radio** (medio)
- 🎯 Técnica: fórmula directa lado-radio de un equilátero inscrito ($s=r\sqrt3$), sustituida en la fórmula de área de equilátero ($A=\frac{\sqrt3}{4}s^2$). Sin trampa, aplicación directa de dos fórmulas encadenadas.

### Física

**F9 · Tiro parabólico, altura máxima con puntos intermedios A y B** (difícil) — **VERIFICAR (sin figura confirmada)**
- ⚠️ No resoluble con certeza desde el texto+imagen disponible: la lectura más directa (repartir el tiempo total $t_{AB}=2$s proporcionalmente a las distancias horizontales 30m y 45m, asumiendo que el punto de separación entre ambas ES la vertical del vértice) da una altura de ascenso desde A de apenas 3,2 m — absurdamente chico frente a las opciones (62 a 280 m). Esto sugiere que A y B son puntos intermedios de una trayectoria mucho más grande, y falta un dato (altura de A/B respecto al suelo, o el ángulo de lanzamiento) que no pude confirmar sin el recorte nítido.

**F10 · Circuito serie con dos fuentes, diferencia de potencial entre 2 puntos** (difícil)
- 🎯 Técnica: recorrer la rama sumando cada caída/subida de potencial en el orden en que aparecen los elementos — resistencias siempre CAEN en el sentido de la corriente asumida, las fuentes según su polaridad dibujada.
- ⚡ Atajo de verificación: entre las 4 combinaciones posibles de signos de las 2 fuentes, solo UNA da un valor que coincide con alguna opción de respuesta (16V) — esto sirve como comprobación indirecta de la polaridad correcta cuando el texto extraído no preserva perfectamente los símbolos +/− del dibujo original.

**F11 · Dos masas por polea, velocidad al encontrarse** (difícil)
- 🎯 Técnica: cuando dos masas cuelgan de una misma cuerda por una polea separadas verticalmente por $h$, se "encuentran" cuando cada una se desplazó $h/2$ (la brecha se cierra al doble de lo que se mueve cada una individualmente) — no $h$ completo.
- ⚡ Atajo de verificación cruzada: resolver por cinemática ($v^2=2ad$) Y por conservación de energía (diferencia de EP = EC total) da el MISMO resultado (12 m/s) — buena práctica para confirmar un resultado antes de darlo por bueno, sobre todo cuando hay dos interpretaciones posibles de qué representa $h$ en la figura (la opción D, $12\sqrt2$, es exactamente el resultado que se obtendría con la lectura alternativa "cada masa recorre $h$ completo" — un distractor bien diseñado para quien no distingue las dos lecturas).

**F12 · Aceleración total en superficie esférica con rozamiento** (difícil) — **respuesta real: E) Ninguno**
- 🎯 Técnica: la aceleración total en movimiento circular con rozamiento combina DOS componentes perpendiculares (centrípeta $v^2/R$ y tangencial, por el peso menos la fricción) — el módulo final es la suma vectorial (Pitágoras) de ambas.
- ⚠️ **Trampa fuerte**: calculando por separado da $a_c=4$ m/s² (que coincide EXACTO con la opción D) y $a_t=5$ m/s² — quien olvida sumar vectorialmente y solo reporta la componente centrípeta cae directo en el distractor D. El módulo real es $\sqrt{4^2+5^2}=\sqrt{41}\approx6{,}40$ m/s², que no está entre las opciones.

### Química

**Q13 · Estequiometría redox (Zn+HNO₃→NH₄NO₃), pureza + densidad** (difícil)
- 🎯 Técnica: identificar que el nitrógeno se reduce hasta NH₄⁺ (de +5 a −3, salto de 8 electrones) en vez del NO habitual — cambia por completo el balanceo frente a la reacción "clásica" de Cu+HNO₃ vista en otros exámenes de este banco.
- ⚡ Atajo de verificación: con masa molar de Zn=65 g/mol, los moles de Zn dan exactamente 1,00 — un número redondo que confirma que la masa molar usada en el diseño del problema es la simplificada (65, no 65,4).

**Q14 · Balanceo redox (H₂S+Br₂→HBr+H₂SO₄), suma de coeficientes de productos** (difícil)
- 🎯 Técnica: igual método que Q13 del examen 1-2023 (1ra Opción) — identificar oxidación (S: −2→+6, pierde 8e⁻) y reducción (Br₂: 0→−1×2, gana 2e⁻ por molécula), igualar por mínimo común múltiplo de electrones.

**Q15 · Ley de difusión de Graham, masa molar de un gas desconocido** (medio)
- 🎯 Técnica: aplicación directa de $v_1/v_2=\sqrt{M_2/M_1}$ — el gas MÁS RÁPIDO es el MÁS LIVIANO, cuidado con no invertir la razón (poner la masa molar mayor en el numerador equivocado).

**Q16 · Presiones parciales con captura de vapor de agua** (medio)
- 🎯 Técnica: una vez retirado un componente de la mezcla (el vapor de agua, capturado por el sólido), las fracciones molares de los gases RESTANTES deben sumar 1 ENTRE ELLOS SOLOS (no considerar la fracción molar original del agua) — error común es no "renormalizar" las fracciones tras quitar un componente.

### Biología

**B17 · Primer nivel trófico de una pirámide ecológica** (medio) — **respuesta real: E) Ninguna**
- ⚠️ **Trampa fuerte**: el primer nivel trófico son los PRODUCTORES (autótrofos), no los consumidores primarios (que ocupan el SEGUNDO nivel) — "productores" no aparece entre las opciones, así que ninguna es correcta. Mismo patrón de trampa que B18 del examen anterior (2-2022 1ra Opción): opciones que pertenecen a una categoría VECINA pero incorrecta a la preguntada.

**B18 · Función de la respiración celular** (fácil)
- ⚠️ Trampa conceptual: las opciones A y B describen la FOTOSÍNTESIS (proceso opuesto: producir materia orgánica, liberar O₂), no la respiración celular (que consume O₂ y libera energía de los nutrientes) — hay que distinguir bien ambos procesos, que suelen confundirse por presentarse siempre "en pareja" en el temario.

**B19 · Proteína con estructura cuaternaria** (medio)
- 🎯 Técnica: la estructura cuaternaria requiere 2+ cadenas polipeptídicas independientes asociadas — la mioglobina es el ejemplo clásico de proteína de UNA sola cadena (solo terciaria, sin cuaternaria, típicamente contrastada con la hemoglobina de 4 cadenas); el colágeno es el ejemplo clásico de estructura cuaternaria real (triple hélice, 3 cadenas).

**B20 · División celular que reduce el número de cromosomas** (fácil)
- 🎯 Técnica: memorización directa — la mitosis MANTIENE el número de cromosomas, la MEIOSIS lo REDUCE a la mitad (genera gametos haploides).

---

## 9. Examen 1-2023 (3ra Opción) · 7-feb-2023

> Mismo pipeline "PDF adjuntado al chat → Claude resuelve directamente".
> 19/20 respuestas verificadas con cálculo numérico independiente (Python)
> — la mejor proporción de este proyecto hasta ahora. Solo G8 (ángulo entre
> dos secantes a un octógono regular) queda marcada VERIFICAR: depende de
> identificar con exactitud qué vértices toca cada recta en la figura, algo
> que no pude confirmar con certeza desde el recorte disponible.

### Aritmética-Álgebra

**A1 · Número de divisores desde descomposición canónica con incógnita** (medio)
- 🎯 Técnica: descomponer $15^n\times75$ en potencias primas ($3^{n+1}\cdot5^{n+2}$) y aplicar la fórmula del número de divisores $(a+1)(b+1)$ directamente sobre los exponentes.
- ⚡ Atajo: al igualar $(n+2)(n+3)=17(n+2)$, se puede DIVIDIR ambos lados entre $(n+2)$ (válido porque $n+2\ne0$) en vez de expandir y resolver una cuadrática completa — reduce el problema a una ecuación lineal trivial.

**A2 · Ecuación exponencial con radicales anidados, suma de raíces** (difícil)
- 🎯 Técnica: reducir toda la expresión de la izquierda (una suma de 3 radicales aparentemente distintos) a una ÚNICA potencia de la misma base ($\sqrt3$) antes de comparar exponentes con el lado derecho.
- ⚡ Atajo: los tres términos ($2\sqrt{12}$, $3\sqrt3$, $6\sqrt{1/3}$) son en realidad múltiplos de $\sqrt3$ disfrazados — sumarlos directamente evita tener que elevar a potencias fraccionarias términos separados.

**A3 · MCM para encuentro periódico de tres viajeros** (medio)
- 🎯 Técnica: "vuelven a coincidir todos" es directamente el MCM de los tres periodos — sin trampa ni atajo especial, aplicación directa una vez identificado que es un problema de MCM (no de MCD).

**A4 · Número de dos cifras invertido, razón entre original e invertido** (difícil)
- 🎯 Técnica: notación algebraica estándar $\overline{ab}=10a+b$, combinada con la condición de la razón (original/invertido=7/4) para armar un sistema de 2 ecuaciones lineales.
- ⚠️ Trampa de dirección: hay que tener cuidado con CUÁL número (original o invertido) va en el numerador de la razón dada — invertir el orden lleva a una ecuación sin solución entera válida (se puede detectar rápido si el sistema da un dígito negativo, señal de haber invertido la razón).

### Geometría-Trigonometría

**G5 · Dos triángulos rectángulos superpuestos, base del triángulo de solapamiento** (difícil)
- 🎯 Técnica: NO hace falta hallar el punto de cruce de las hipotenusas — el "triángulo negro" es simplemente la zona de SOLAPAMIENTO entre las bases de los dos triángulos grandes, calculable con solo tangentes y una resta.
- ⚡ Atajo: calcular la base de cada triángulo grande por separado (con $\tan\alpha$ y $\tan\beta$), sumar ambas bases, y restar la base total dada — la diferencia ES directamente la respuesta, sin necesitar coordenadas ni sistemas de ecuaciones para hallar el punto de intersección de las diagonales.

**G6 · Poste quebrado por rayo, ángulo entre las dos partes** (medio)
- 🎯 Técnica: el punto de quiebre, el pie del poste y el punto de apoyo de la parte caída forman un triángulo RECTÁNGULO (poste vertical + suelo horizontal) — el ángulo dado (60°) es el ángulo interior en el vértice de quiebre, entre el cateto (parte que queda en pie) y la hipotenusa (parte caída).
- ⚠️ Trampa: preguntan por la parte MÁS LARGA — hay que comparar $h$ contra $30-h$ al final, no asumir cuál es mayor de entrada.

**G7 · Área sombreada bajo una diagonal en escalera de cuadrados crecientes** (difícil)
- 🎯 Técnica: en vez de buscar una fórmula global, descomponer el problema en un trapecio por cada cuadrado (columna), usando la ecuación de la única diagonal que atraviesa toda la figura para hallar la altura de esa diagonal en cada borde de columna.
- ⚡ Atajo de verificación: la suma de las áreas "por encima" de la diagonal en las 5 columnas da un número que coincide EXACTO con una opción (35/2); la suma "por debajo" (75/2) no está entre las opciones — confirma que la región sombreada es la de ARRIBA de la diagonal, no la de abajo.

**G8 · Ángulo entre dos secantes a un octógono regular** (difícil) — **VERIFICAR (sin figura confirmada)**
- ⚠️ No resoluble con certeza desde el texto+imagen disponible: este es el equivalente poligonal del teorema de "ángulo entre dos secantes externas a una circunferencia" (semidiferencia de arcos interceptados), pero acá cada "arco" entre vértices consecutivos del octógono vale $45°$ — el resultado depende EXACTAMENTE de cuántos vértices salta cada recta, algo que no pude contar con certeza en el recorte disponible.

### Física

**F9 · Campo eléctrico mínimo para equilibrio de partícula cargada (péndulo)** (difícil)
- 🎯 Técnica: idéntica a F11 del examen 2-2022 (1ra Opción) — la fuerza eléctrica MÍNIMA para sostener un péndulo cargado desviado un ángulo $\alpha$ es siempre PERPENDICULAR al hilo, dando $E_{min}=mg\,\text{sen}\alpha/q$ directo, sin plantear el sistema completo de 3 fuerzas.
- 📌 Nota de patrón: esta es la SEGUNDA vez que aparece esta plantilla exacta de pregunta en el banco (ver también F11, 2-2022 1ra Opción) — confirma que "campo/fuerza mínima perpendicular al hilo" es una plantilla recurrente que vale la pena dominar a fondo.

**F10 · Campo eléctrico resultante de dos cargas puntuales en un punto entre ellas** (medio)
- 🎯 Técnica: identificar el SENTIDO de cada campo individual antes de sumar — con el punto entre las dos cargas, el campo de la positiva apunta alejándose de ella (hacia la otra carga) y el de la negativa apunta hacia ella (también hacia la otra carga): AMBOS apuntan en el mismo sentido en este caso particular, así que se suman.
- ⚠️ Trampa: la intuición de "cargas de signo opuesto → campos que se restan" NO aplica automáticamente — depende de la posición del punto respecto a ambas cargas; hay que analizar cada campo por separado antes de decidir si se suman o se restan.

**F11 · Encuentro de dos vehículos con aceleraciones distintas y salida distanciada** (difícil)
- 🎯 Técnica: mismo patrón que P6 (2-2025) y F11 (1-2023, 2da Opción) — plantear ambas posiciones desde un ORIGEN COMÚN, restando la distancia inicial al vehículo que arranca más atrás, en vez de plantear ecuaciones separadas con orígenes distintos.
- ⚡ Atajo: no hace falta hallar $t$ numéricamente antes de hallar $d$ — se puede despejar $d=0{,}3t^2$ simbólicamente y sustituir $t^2=150$ (ya conocido por el dato del camión) directamente, sin sacar la raíz cuadrada de $t$ en ningún momento.

**F12 · Caída libre con velocidad inicial no nula (paquete soltado desde globo ascendente)** (medio)
- 🎯 Técnica: misma plantilla que P8 del examen 1-2025 (3ra Opción) — el paquete hereda la velocidad de ascenso del globo (+5 m/s) en el instante de soltarlo, no parte del reposo.
- ⚠️ Trampa: la ecuación cuadrática da una raíz negativa (matemáticamente válida pero físicamente absurda, tiempo negativo) — hay que descartarla y quedarse solo con la raíz positiva.

### Química

**Q13 · Crioscopía "al revés": hallar masa de solvente desde $\Delta T_f$ conocido** (medio)
- 🎯 Técnica: variante de la familia crioscópica ya vista en Q14/Q16 (1-2023, 2da Opción) pero invertida — acá se conoce $\Delta T_f$ y hay que despejar la masa de SOLVENTE (no la de soluto ni la temperatura final).

**Q14 · Balanceo redox (KMnO₄+NH₃), suma de coeficientes de productos** (difícil)
- 🎯 Técnica: identificar reducción del Mn ($+7\to+4$, gana 3e⁻) y oxidación del N ($-3\to+5$, pierde 8e⁻), igualar por mínimo común múltiplo (24), y balancear K, H, O por sustitución en ese orden.
- ⚠️ Trampa: hay DOS productos que contienen K (KNO₃ y KOH) — no alcanza con balancear el K contra un solo producto, hay que dejar el coeficiente de KOH como incógnita hasta el final.

**Q15 · Estequiometría con reactivos en proporción exacta (ninguno limitante)** (medio)
- 🎯 Técnica: siempre convertir a moles antes de comparar cantidades — en este caso particular, ambos reactivos resultan estar en la proporción EXACTA que pide la reacción (1:1), así que ninguno sobra ni es limitante.
- 📌 Nota de patrón: los números fueron diseñados para dar moles redondos (0,1 mol cada uno) — una señal de que el problema quiere que verifiques la proporción exacta, no que asumas de entrada cuál reactivo es limitante.

**Q16 · Estequiometría con producto férrico (Fe³⁺), volumen de gas en CNPT** (medio)
- 🎯 Técnica: cuando el producto es "cloruro FÉRRICO" (no ferroso), el hierro pierde 3 electrones (no 2) — cambia la proporción Fe:H₂ de la reacción "típica" (Fe+HCl→FeCl₂+H₂, 1:1) a esta variante (2Fe+6HCl→2FeCl₃+3H₂, 2:3).
- ⚠️ Trampa de lectura: quien asume automáticamente la reacción "clásica" 1:1 (con cloruro ferroso) sin leer que el enunciado pide específicamente cloruro FÉRRICO obtiene una proporción y un resultado incorrectos.

### Biología

**B17 · Fotosíntesis en cloroplastos, transformación de energía** (fácil)
- 🎯 Técnica: memorización directa — fotosíntesis transforma energía LUMINOSA en energía QUÍMICA. Las opciones que describen "liberar CO₂" o transformar energía química en otra forma corresponden a la respiración celular (proceso opuesto), no a la fotosíntesis.

**B18 · Clasificación taxonómica, Reino Fungi** (fácil)
- 🎯 Técnica: memorización directa — levaduras y mohos son hongos (Reino Fungi); algas y protozoos pertenecen a Protista, bacterias a Monera. Sin trampa mayor salvo confundir reinos vecinos.

**B19 · Probabilidad genética dihíbrida, genes independientes** (medio)
- 🎯 Técnica: cuando dos genes se heredan de forma independiente, la probabilidad conjunta es el PRODUCTO de las probabilidades individuales de cada gen por separado ($1/4\times1/4=1/16$) — no hace falta armar el cuadro de Punnett de 16 casillas completo si ya se conoce la probabilidad de cada gen aislado.

**B20 · Estructura de doble hélice, ADN vs ARN** (fácil)
- 🎯 Técnica: memorización directa — solo el ADN forma doble hélice (dos cadenas complementarias); todos los tipos de ARN listados son de cadena simple (aunque algunos se plieguen sobre sí mismos).

---

## 10. Examen 2-2022 (3ra Opción) · 5-ago-2022

> Mismo pipeline "PDF adjuntado al chat → Claude resuelve directamente".
> 18/20 respuestas verificadas con cálculo numérico independiente (Python).
> F10 es LITERALMENTE la misma pregunta (mismo enunciado, misma figura,
> mismas opciones) que F9 del examen 2-2022 (2da Opción) — la segunda vez
> que aparece este problema en el banco, y sigue sin poderse resolver con
> certeza por la misma ambigüedad de figura. G7 (distancia entre agentes,
> ángulos 2α/α/2α) también queda VERIFICAR.

### Aritmética-Álgebra

**A1 · Divisibilidad de $x^4+4$, identidad de Sophie Germain** (difícil)
- 🎯 Técnica: reconocer la factorización especial $x^4+4=(x^2-2x+2)(x^2+2x+2)$ (identidad de Sophie Germain) en vez de intentar división polinómica o tanteo de coeficientes.
- ⚡ Atajo: de los dos factores posibles, la condición $a,b>0$ del enunciado descarta automáticamente uno de los dos sin necesitar verificar nada más.

**A2 · Ecuación con raíces anidadas, verificación de dominio** (difícil)
- 🎯 Técnica: elevar al cuadrado dos veces (agrupando el término con raíz restante entre paso y paso), y SIEMPRE verificar la solución final en la ecuación original — elevar al cuadrado puede introducir raíces falsas.
- ⚠️ Trampa: la ecuación cuadrática final da DOS soluciones ($x=5$ y $x=6/5$), pero $x=5$ viola la condición de dominio intermedia ($5-3x\ge0$) — hay que descartarla explícitamente, no solo tomar "la solución que se ve más razonable".

**A3 · Ecuación logarítmica con cambio de base, suma de dígitos** (difícil)
- 🎯 Técnica: mismo patrón que A2 (2-2022, 2da Opción) — usar una variable auxiliar ($t=\log_2x$) y las identidades de cambio de base para reducir toda la ecuación a una sola incógnita, evitando manipular logaritmos de bases distintas por separado.
- ⚠️ Trampa: la pregunta pide la suma de DÍGITOS de las soluciones (no la suma de las soluciones mismas) — fácil pasar por alto esta distinción y responder con la suma directa de $x$ (que sería 10 igual en este caso particular, pero no siempre coincide).

**A4 · Problema de reparto con costo total fijo, dos condiciones** (difícil)
- 🎯 Técnica: el costo TOTAL del bus es constante en los tres escenarios (original, +10 personas, −6 personas) — plantear esa igualdad para cada escenario da un sistema lineal de 2 ecuaciones con 2 incógnitas, sin necesitar ecuaciones cuadráticas.

### Geometría-Trigonometría

**G5 · Identidad trigonométrica con suma-producto de senos** (difícil)
- 🎯 Técnica: convertir la suma y diferencia de senos ($\text{sen}2\theta\pm\text{sen}4\theta$) a producto usando las fórmulas de suma-a-producto — el resultado se simplifica exactamente al recíproco negativo del segundo término de la expresión, cancelándose todo.
- ⚡ Atajo: no hace falta calcular ningún valor numérico de $\theta$ — la cancelación es simbólica y vale para cualquier $\theta$, dando 0 directamente.

**G6 · Triángulo isósceles circunscrito a circunferencia, lado en función del radio inscrito** (difícil)
- 🎯 Técnica: usar $r=\text{Área}/\text{semiperímetro}$ con el triángulo parametrizado por el lado igual $s$ y el ángulo entre ellos (120°), despejar $s$ en función de $R$, y recién ahí calcular el lado pedido con ley de cosenos.
- ⚠️ Trampa algebraica: racionalizar el denominador (con $2\sqrt3-3$) requiere cuidado — un error de signo en ese paso cambia completamente la forma final de la respuesta.

**G7 · Distancia entre agentes desde ángulos en un punto de observación** (difícil) — **VERIFICAR (sin figura confirmada)**
- ⚠️ No resoluble con certeza desde el texto+imagen disponible: los tres ángulos marcados en el punto H (2α, α, 2α) sugieren que suman 180° (por estar D-H-C alineados), lo que fijaría $\alpha=36°$ como valor numérico — pero calculando $CD=(m+n)\cos(2\alpha)$ con ese ángulo da un factor que no coincide con ninguna opción, y esa derivación NUNCA usa la relación dada $\tan\alpha\cdot\tan2\alpha=m/n$ (señal fuerte de que la asignación de ángulos leída no es la correcta).

**G8 · Razones trigonométricas de ángulo en cuadrante específico** (medio)
- 🎯 Técnica: para un ángulo definido por "está en el cuadrante X, sobre la recta Y=mX", basta tomar UN punto cualquiera de esa recta CON EL SIGNO correcto para el cuadrante pedido — no hace falta trabajar con la ecuación de la recta de forma abstracta.
- ⚠️ Trampa: si se toma un punto con signos incorrectos para el cuadrante (por ejemplo, del primer cuadrante en vez del tercero), el resultado de $\cos^2\theta$ no cambia (por el cuadrado) pero $\tan\theta$ sí puede cambiar de signo según qué par de signos se use — conviene verificar que el punto elegido realmente corresponda al cuadrante pedido.

### Física

**F9 · MRU en vías paralelas, distancia entre móviles en dos instantes** (difícil)
- 🎯 Técnica: la distancia entre dos móviles en vías paralelas combina la separación horizontal (que varía con $t$) con la separación vertical FIJA (Pitágoras) — plantear $d(t)$ y resolver para el valor pedido da una ecuación cuadrática con DOS soluciones (la distancia se achica hasta un mínimo y luego vuelve a crecer).
- ⚠️ Trampa: hay que identificar CUÁL de las dos soluciones es la "primera" y cuál la "segunda" vez que se cumple la condición — la menor corresponde al acercamiento, la mayor al alejamiento posterior al punto de máximo acercamiento.

**F10 · Tiro parabólico, altura máxima con puntos A y B** (difícil) — **VERIFICAR (misma ambigüedad ya vista)**
- ⚠️ Pregunta IDÉNTICA (mismo enunciado, misma figura, mismas opciones) a F9 del examen 2-2022 (2da Opción) — segunda aparición en el banco de este problema sin poder resolverlo con certeza. Ver la nota de esa pregunta para el detalle del intento de resolución y por qué no cuadra.

**F11 · Bloque contra pared vertical de un carro acelerado, fuerza mínima** (difícil)
- 🎯 Técnica: la fricción es la ÚNICA fuerza que sostiene verticalmente al bloque contra la cara del carro — como la fricción depende de la normal, y la normal depende de la aceleración horizontal, existe una aceleración MÍNIMA por debajo de la cual el bloque no puede sostenerse ($a_{min}=g/\mu_e$).
- ⚡ Atajo: como el piso es liso, la fuerza $F$ debe acelerar el SISTEMA COMPLETO ($M+m$) con esa aceleración mínima — no hace falta analizar a $M$ por separado con una ecuación adicional.

**F12 · Fuerza eléctrica con fricción, hallar masa desde la aceleración** (dificil)
- 🎯 Técnica: plantear la segunda ley de Newton con TODAS las fuerzas horizontales (fuerza eléctrica empujando, fricción oponiéndose, dependiente del peso) y despejar la masa como incógnita — la fricción depende de la MISMA masa que se busca, así que queda una ecuación lineal en $m$.

### Química

**Q13 · Fracción molar de un componente capturado, usando presión constante del resto** (medio)
- 🎯 Técnica: cuando un componente de una mezcla gaseosa se "captura" completamente sin afectar a los demás, la presión final es la presión PARCIAL del componente restante (que no cambió) — eso permite hallar la presión parcial inicial del componente capturado por diferencia.

**Q14 · Balanceo redox (HNO₃+Zn→N₂+H₂O+Zn(NO₃)₂), suma de coeficientes de productos** (difícil)
- 🎯 Técnica: identificar que el N se reduce hasta N₂ GASEOSO (no NO ni NH₄⁺ como en otras variantes de este banco) — cambia el número de electrones ganados por átomo (5, no 3 ni 8) y por lo tanto todo el balanceo.
- 📌 Nota de patrón: esta es la TERCERA variante distinta de "HNO₃+Zn/Cu→producto nitrogenado" vista en el banco (compárese con Q13 del 2-2022 2da Opción, que reduce hasta NH₄NO₃) — el estudiante debe identificar CUÁL es el producto nitrogenado específico de cada enunciado antes de asumir un balanceo memorizado.

**Q15 · Balanceo redox con cloro de doble papel (oxidado y espectador)** (difícil)
- 🎯 Técnica: en reacciones donde el HCl es tanto reductor (parte se oxida a Cl₂) como fuente de los aniones cloruro de las sales (LiCl, CrCl₃), hay que CONTAR TODO el cloro de los productos (no solo el que participa en el redox) para saber el coeficiente total de HCl.

**Q16 · Estequiometría redox, masa de reactivo desde masa de producto** (difícil)
- 🎯 Técnica: balancear por electrones (I₂→HIO₃ pierde 10e⁻ por molécula, HNO₃→NO gana 3e⁻) antes de cualquier cálculo de masa — luego es una conversión estándar masa→moles→proporción→masa.

### Biología

**B17 · Composición estructural de las proteínas** (fácil)
- 🎯 Técnica: memorización directa — la unidad repetitiva de las proteínas es el aminoácido (no nucleótidos ni fosfolípidos, que forman otras biomoléculas).

**B18 · Amenazas a la biodiversidad vs herramientas de protección** (fácil)
- ⚠️ Trampa conceptual: parques nacionales y reservas naturales son herramientas de PROTECCIÓN (lo opuesto de una amenaza) — quien lee rápido y asocia "naturaleza" con "positivo para la biodiversidad" sin pensar en la pregunta específica puede confundirse con las opciones distractoras.

**B19 · Definición de virus como agentes acelulares** (fácil)
- 🎯 Técnica: memorización directa — los virus son ACELULARES y parásitos intracelulares obligados; bacterias y hongos SÍ son organismos celulares capaces de replicarse por sí mismos.

**B20 · Expresión fenotípica de alelos recesivos** (medio)
- 🎯 Técnica: memorización directa — un alelo recesivo solo se expresa fenotípicamente en estado homocigótico recesivo (doble dosis); en heterocigosis o homocigosis dominante, el alelo dominante lo enmascara.

---

## 11. Examen 1-2005 (1ra Opción)

> Primer examen HISTÓRICO cargado (el más antiguo del banco hasta ahora).
> Formato distinto a los exámenes modernos: sin sección de Biología (solo
> Matemáticas 10 preguntas sin subdividir en el PDF, Química 5, Física 5),
> y sin fecha exacta en el PDF (solo "GESTIÓN I-2005"). Las 20 preguntas se
> verificaron con cálculo numérico independiente — 100% de este examen,
> el primero en llegar a ese nivel de cobertura sin ninguna VERIFICAR.

### Matemáticas (Aritmética-Álgebra + Trigonometría)

**1 · Edades, tres personas con condición temporal retrospectiva** (difícil)
- 🎯 Técnica: plantear una variable por persona y traducir CADA condición temporal (ahora / hace 8 años) en su propia ecuación lineal — con 3 incógnitas hacen falta 3 ecuaciones independientes, obtenidas sistemáticamente dato por dato.

**2 · Ecuación fraccionaria, suma de raíces sin resolver la cuadrática completa** (difícil)
- 🎯 Técnica: para una cuadrática $Ax^2+Bx+C=0$, la suma de raíces es directamente $-B/A$ — no hace falta resolver la ecuación completa (ni hallar $C$) para responder qué pide este tipo de pregunta.
- ⚡ Atajo: alcanza con identificar los coeficientes $A$ y $B$ tras multiplicar en cruz y agrupar, sin necesitar $C$ en absoluto.

**3 · Ecuación irracional, racionalización con conjugado** (difícil)
- 🎯 Técnica: cuando una fracción tiene denominador irracional de la forma $\sqrt a-\sqrt b$, racionalizar multiplicando por el conjugado ANTES de intentar despejar — simplifica la ecuación a una forma directa en vez de manipular raíces anidadas.

**4 · Progresión aritmética, medios interpolados desde la suma total** (medio)
- 🎯 Técnica: la fórmula de suma de PA usando solo extremos ($S=\frac{a_1+a_n}{2}\times n$) permite plantear directamente una ecuación en el número de términos, sin necesitar conocer la razón.

**5 · Identidad trigonométrica, suma de soluciones en un intervalo** (difícil)
- 🎯 Técnica: expresar TODO en senos y cosenos con denominador común hace aparecer la identidad pitagórica ($\text{sen}^2+\cos^2=1$) casi automáticamente, colapsando la ecuación a una forma simple factorizable.
- ⚠️ Trampa: una de las dos soluciones "candidatas" de la factorización ($\cos x=0$) hace indefinida la secante del enunciado original — hay que descartarla, no incluirla en la suma final.

**6 · División euclidiana, número de dos cifras desde dos condiciones de cociente/resto** (medio)
- 🎯 Técnica: cada condición de "dividendo=divisor×cociente+resto" se traduce directamente en una ecuación lineal — con dos condiciones (una por cada dígito como divisor) se arma un sistema de 2 ecuaciones con 2 incógnitas (las cifras).

**7 · Relaciones de Vieta, suma de cuadrados de raíces** (medio)
- 🎯 Técnica: la identidad $\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta$ conecta directamente con las relaciones de Vieta ($\alpha+\beta=p$, $\alpha\beta=q$) sin necesitar hallar las raíces individuales — aplicación directa una vez reconocido el patrón.

**8 · Teorema del resto con divisor de coeficiente principal distinto de 1** (dificil)
- 🎯 Técnica: el teorema del resto sigue aplicando aunque el divisor no sea exactamente $(x-a)$ sino un múltiplo, como $4x+4=4(x+1)$ — el resto es el mismo que dividiendo entre $(x+1)$ directamente ($P(-1)$), solo cambia el cociente.

**9 · Sistema de ecuaciones con parámetro, usando una condición extra** (medio)
- 🎯 Técnica: usar la condición adicional ($a+b=3$) junto con la ecuación SIN el parámetro para hallar los valores numéricos primero — recién con $a,b$ conocidos se despeja el parámetro de la segunda ecuación.

**10 · Mezclas con reemplazo parcial por sustancia pura** (medio)
- 🎯 Técnica: al sacar $x$ litros de una MEZCLA, se pierde soluto en la MISMA proporción que existe en la mezcla (no el 100%) — y al reponer con sustancia pura, esos mismos $x$ litros SÍ aportan el 100%. Confundir estas dos proporciones es el error más común en este tipo de problema.

### Química

**11 · Conversión de escalas de temperatura, diferencia entre valores en distintas unidades** (medio)
- 🎯 Técnica: convertir AMBAS temperaturas a la misma escala antes de restar — mezclar unidades (restar directamente 134-30 sin convertir) es el error más común y da un resultado sin sentido físico.

**12 · Calorimetría, mezcla de dos masas de la misma sustancia** (medio)
- 🎯 Técnica: en un recipiente aislado, el calor perdido por la porción caliente iguala exactamente al calor ganado por la fría — como es la MISMA sustancia (agua), el calor específico se cancela en ambos lados, dejando una ecuación simple en masa y diferencia de temperatura.

**13 · Molalidad, masa de soluto desde definición directa** (medio)
- 🎯 Técnica: la molalidad usa KILOGRAMOS de solvente (no gramos ni masa de solución) — convertir unidades antes de despejar es el paso que más se pasa por alto.

**14 · Estequiometría con agua como reactivo (no solo medio)** (difícil)
- 🎯 Técnica: cuando el agua aparece como REACTIVO explícito en la ecuación (no solo como solvente), hay que balancearla como cualquier otra sustancia — contar bien H y O en ambos lados para no perder coeficientes.

**15 · Fórmula empírica desde composición porcentual, verificación de nomenclatura** (difícil) — **respuesta real: E) Ninguno**
- ⚠️ **Trampa fuerte**: el procedimiento estándar de fórmula empírica (moles por 100g, dividir entre el menor) da una proporción Cr:S:O=1:3:9 EXACTA (verificada al 0,01% contra los datos del enunciado) — pero esa proporción NO corresponde a ningún compuesto real con nomenclatura clásica "-oso/-ico" (que requeriría Cr²⁺ o Cr³⁺, dando proporciones Cr:S de 1:1 o 2:3, ninguna de las cuales es 1:3). Verificar los porcentajes de las opciones reales (ej. sulfito crómico real = 30,2% Cr) contra los datos del enunciado es la única forma de detectar que ninguna opción nombrada es correcta — quien solo identifica "sulfito" (por el O:S=3) y elige la opción con esa palabra sin verificar el Cr cae en el distractor.

### Física

**16 · Tiro parabólico simétrico horizontal, distancia total entre dos lanzamientos opuestos** (medio)
- 🎯 Técnica: cuando dos proyectiles parten del MISMO punto en sentidos horizontales opuestos con la misma rapidez y ángulo, la distancia total entre ellos al aterrizar es el DOBLE del alcance horizontal de uno solo — no hace falta descomponer velocidades verticales si el tiempo de vuelo ya viene dado directamente.

**17 · Coeficiente de restitución, altura tras el rebote** (medio)
- ⚠️ Trampa: el coeficiente de restitución relaciona VELOCIDADES ($v_{rebote}=e\cdot v_{impacto}$), pero como la altura depende del CUADRADO de la velocidad, la altura tras el rebote es $e^2$ veces la original, NO $e$ veces — un error muy común es aplicar $e$ directamente a la altura.

**18 · Rizo (loop) con fricción parcial, condición mínima en la cima** (difícil)
- 🎯 Técnica: la condición mínima para completar un rizo es que en el punto más alto, el peso solo alcance para proveer la fuerza centrípeta exacta ($v_{top}^2=gR$) — combinado con conservación de energía en los tramos SIN fricción y pérdida de energía explícita solo en el tramo CON fricción, se arma una ecuación lineal en $R$.

**19 · Campo eléctrico de dos cargas simétricas, cancelación de componentes** (difícil)
- 🎯 Técnica: cuando dos cargas iguales están dispuestas simétricamente respecto a la línea que las conecta con el punto de interés, las componentes PERPENDICULARES a esa línea se cancelan automáticamente por simetría — solo hace falta sumar las componentes a lo largo del eje de simetría, evitando descomponer vectores innecesariamente.

**20 · Capacitores, combinación serie dentro de paralelo** (medio)
- ⚠️ Trampa: capacitores en serie se combinan como resistencias en PARALELO (inversos) y capacitores en paralelo se SUMAN directamente — es el patrón EXACTAMENTE INVERSO al de resistencias, y confundirlo es el error más común en circuitos con capacitores.

---

## 12. Examen 1-2005 (2da Opción)

> Mismo formato histórico que 2005-1op-1-2005.md (Matemática 10, Química
> 5, Física 5, sin Biología). 20/20 preguntas verificadas con cálculo
> numérico independiente — Q13 dio un resultado (1,30 kg) que no coincide
> con ninguna opción numérica: un "Ninguno" real, no una falla de cálculo.

### Matemática

**1 · Inecuación fraccionaria, análisis de signo sin multiplicar en cruz** (medio)
- ⚠️ Trampa: multiplicar en cruz por $(x-5)$ sin saber su signo invierte la desigualdad en la mitad de los casos — la técnica segura es pasar todo a un lado y combinar en una sola fracción antes de analizar el signo del numerador y denominador por separado.

**2 · Binomio de Newton, identificar $k$ por el exponente correcto** (medio)
- ⚠️ Trampa: hay que igualar $k$ al exponente de la variable que aparece "en el lugar de $b$" en la fórmula general (acá $y$, con exponente 4), NO al exponente de $x$ — confundir cuál variable define $k$ da un término completamente distinto.

**3 · MCM para encuentro periódico de tres ciclistas** (medio)
- 🎯 Técnica: mismo patrón que A3 del examen 1-2023 (3ra Opción) — "vuelven a coincidir todos" es directamente el MCM de los periodos individuales.

**4 · Trabajo combinado de dos grifos, tasas que se suman** (fácil)
- 🎯 Técnica: las TASAS de trabajo (1/tiempo) se suman cuando dos agentes trabajan simultáneamente — sumar los TIEMPOS directamente es el error más común en este tipo de problema.

**5 · División polinómica exacta, raíces del divisor como raíces del numerador** (difícil)
- 🎯 Técnica: si la división es exacta, evaluar el numerador en cada raíz del divisor factorizado da un sistema de ecuaciones en los parámetros desconocidos — mucho más directo que hacer la división larga con coeficientes literales.

**6 · Perímetro de polígono regular inscrito, fórmula lado-radio** (medio)
- 🎯 Técnica: fórmula directa $\text{lado}=2R\,\text{sen}(180°/n)$ para un polígono regular de $n$ lados inscrito en circunferencia de radio $R$ — evita construir manualmente el triángulo isósceles central cada vez.

**7 · Ecuación fraccionaria simétrica, reagrupar por denominadores afines** (difícil)
- 🎯 Técnica: cuando una ecuación tiene 4 fracciones con denominadores en "pares simétricos" ($u\pm2$, $u\pm3$), reagrupar cada par a un mismo lado (en vez de sumar todo de entrada) genera una diferencia de cuadrados en cada denominador, mucho más simple de resolver.

**8 · Velocidad-tiempo-distancia fija, tiempo reducido con velocidad aumentada** (difícil)
- 🎯 Técnica: mismo patrón que A8 del examen 1-2005 (1ra Opción) — plantear velocidad=distancia/tiempo para ambos viajes con la MISMA distancia, relacionando tiempo y velocidad por las condiciones dadas, lleva a una ecuación cuadrática en $t$.

**9 · Área de polígono regular inscrito, diferencia con el círculo** (difícil)
- 🎯 Técnica: fórmula directa $A=\tfrac12nR^2\,\text{sen}(360°/n)$ para el área de un polígono regular inscrito — evita descomponerlo en $n$ triángulos manualmente.

**10 · Número de tres cifras con tres condiciones encadenadas** (medio)
- 🎯 Técnica: identificar cuál condición ya da un valor directo (acá, la cifra de las unidades) y sustituir en cadena desde ahí, en vez de armar un sistema simultáneo de 3 ecuaciones con 3 incógnitas.

### Química

**11 · Configuración electrónica de un ion, isótopos por número atómico** (difícil)
- ⚠️ Trampa conceptual: "isótopo" significa mismo Z (protones), NO misma masa — quien confunde esto podría buscar la opción con el mismo número de masa (72) en vez de la misma Z. También hay que recordar restar/sumar el electrón de más/menos según la carga del ion antes de contar Z.

**12 · Porcentaje de un elemento en una mezcla de dos compuestos** (difícil)
- 🎯 Técnica: cuando solo UNO de los compuestos de una mezcla aporta el elemento de interés, la masa de ese elemento depende únicamente de la fracción de la mezcla que es ESE compuesto — el otro componente de la mezcla es simplemente ignorado en el cálculo.

**13 · Porcentaje de un elemento dentro de un compuesto, dos pasos encadenados** (medio) — **respuesta real: E) Ninguno**
- 🎯 Técnica: dos pasos en cadena — masa del compuesto dentro de la muestra, luego fracción de ESE compuesto que es el elemento puro (usando la fórmula química para contar átomos).
- ⚠️ **Nota de calidad de examen**: el cálculo riguroso (7 kg × 48% × (120/310)) da 1,30 kg, un valor que no aparece entre las 4 opciones numéricas (0,96; 1,86; 1,98; 0,67) — verificado con múltiples variantes de la fórmula sin encontrar coincidencia, confirma que es un "Ninguno" genuino del banco, no un error de cálculo del proyecto.

**14 · Titulación con ácido diprótico, relación 1 mol ácido : 2 mol base** (medio)
- 🎯 Técnica: mismo patrón que Q15 del examen 1-2005 (1ra Opción, ácido sulfúrico como diprótico) — recordar que $H_2SO_4$ neutraliza el DOBLE de moles de base por cada mol de ácido.

**15 · Calorimetría, mezcla de dos masas de agua** (medio)
- 🎯 Técnica: mismo patrón que Q12 del examen 1-2005 (1ra Opción) — balance de calor perdido/ganado con el calor específico cancelado (misma sustancia en ambos lados).

### Física

**16 · MRU, tiempo de retraso para llegada simultánea** (medio)
- 🎯 Técnica: si ambos corredores llegan en el MISMO instante absoluto, el tiempo total del más lento (desde que arrancó) debe igualar el retraso del más rápido MÁS el tiempo que este último tarda corriendo — plantear esa igualdad da el retraso directo.

**17 · Sistema de poleas con masas y fricción, hallar el coeficiente** (difícil)
- 🎯 Técnica: plantear la segunda ley de Newton para el SISTEMA COMPLETO (todas las masas juntas) en vez de analizar cada masa por separado — la fuerza motriz es el peso de la parte colgante, la fricción actúa solo sobre la masa en la superficie horizontal.

**18 · Colisión perfectamente inelástica, momento con signos opuestos** (medio)
- 🎯 Técnica: conservación de momento lineal (no de energía cinética) en una colisión donde los cuerpos quedan unidos — sumar los momentos CON SIGNO según el sentido de cada uno (direcciones opuestas se restan).

**19 · Energía con fricción como fracción constante del peso (no $\mu N$)** (difícil)
- 🎯 Técnica: cuando el enunciado da la fricción como una fracción FIJA del peso ($0{,}1mg$, no $\mu mg\cos\theta$), el balance de energía se simplifica mucho — trabajar todo en términos de "energía dividida entre $mg$" (equivalente a una altura) evita cargar la masa por todas las ecuaciones.

**20 · Circuito de tres resistencias en paralelo, corriente en una rama** (medio)
- 🎯 Técnica: en resistencias en PARALELO, la tensión es la MISMA en las tres — hallar esa tensión común a partir de la corriente TOTAL y la resistencia equivalente ($1/R_{eq}=\sum1/R_i$) permite luego calcular la corriente de cualquier rama individual directamente.

---

## 13. Exámenes 2-2005, 1-2006 y Primer Parcial Propedéutico I-2006

> **Cambio de metodología**: estos 5 exámenes (118 preguntas en total) se
> procesaron en PARALELO usando agentes independientes (uno por examen),
> cada uno con instrucciones explícitas de la misma rigurosidad usada
> manualmente en las secciones anteriores (verificación numérica completa
> mostrada antes del contenido final, política "no adivinar" con marca
> VERIFICAR para preguntas dependientes de figura, "Ninguno" cuando el
> cálculo no matchea ninguna opción). Cada resultado fue luego
> RE-VERIFICADO de forma independiente por Claude con Python antes de
> subir el archivo — no se confió ciegamente en ningún agente. Resultado:
> 116/118 preguntas resueltas con certeza total, 2 marcadas VERIFICAR por
> ambigüedad genuina de figura no incluida en el texto del PDF.

> **Categoría nueva**: el Primer Parcial Propedéutico I-2006 es el primer
> contenido cargado con `categoria: parcial_curso` en el frontmatter — el
> campo por defecto es `admision` (retrocompatible con todo lo cargado
> antes). `/resueltos` ahora muestra un toggle "Exámenes de Admisión" /
> "Parciales de Curso Propedéutico" cuando ambas categorías existen para
> la facultad del usuario, para no mezclar ambos tipos de contenido.

### Hallazgos "Ninguno" verificados en este lote

- **Q12 (2-2005, 1ra Opción, química)** — un ion con números cuánticos
  específicos, tras ganar 3 y perder 7 electrones, resulta ser Cloro
  (Z=17) por reconstrucción de la configuración electrónica — ninguna de
  las 4 opciones (Ca, Sc, Ti, V) es Cloro.
- **Q20 (2-2005, 2da Opción, física)** — pedían el punto donde el
  potencial eléctrico de DOS CARGAS POSITIVAS es cero; como $V=kq/r$ es
  escalar y ambos términos son positivos para cualquier carga positiva,
  la suma nunca puede ser cero en un punto finito — demostrable
  puramente algebraicamente, sin necesitar ningún dato numérico extra.
- **A4 (1-2006, 1ra Opción, aritmética)** — suma de progresión aritmética
  filtrada por una condición ("mayores que 67"): el resultado riguroso
  (410) no coincide con ninguna opción.
- **G12 (Parcial Propedéutico, geometría)** — ángulos conjugados externos
  con una condición de "triplicado", da dos valores posibles (55° y
  125°) y ninguno coincide con las 4 opciones.

### Preguntas VERIFICAR (figura no incluida en el texto)

- **F12 (1-2006, 2da Opción, física)** — circuito de 4 resistencias
  iguales entre los puntos "a" y "b". Se probaron 5 topologías serie/
  paralelo razonables; DOS de ellas (distintas entre sí) dan resultados
  "limpios" que coinciden con opciones DIFERENTES (3Ω y 2Ω) — ambigüedad
  genuina que solo la figura real puede resolver.
- La misma pregunta de circuito con 4 resistencias NO aparece en ningún
  otro examen del banco — a diferencia del patrón de F9/F10 (tiro
  parabólico con puntos A/B) que sí se repite exacto entre convocatorias.

### Técnicas y trampas más notables de este lote

- **Reconstrucción de datos truncados por OCR** (Parcial Propedéutico,
  preguntas de segmentos consecutivos G11 y A7): el PDF original tenía
  fórmulas parcialmente cortadas en la extracción de texto. En vez de
  adivinar, el agente probó relaciones adicionales razonables y se quedó
  con la que dio un resultado LIMPIO e INDEPENDIENTE de la variable libre
  restante (ej. $\overline{AE}=48$ sin importar el valor de $q$) — una
  señal fuerte de que la reconstrucción es correcta, documentada
  explícitamente en la explicación de cada pregunta para que quede claro
  que no es una lectura literal del PDF original.
- **Masa atómica con símbolo mal impreso** (Parcial Propedéutico, Q16
  química): el cálculo riguroso da masa atómica = 30,00 exacto, pero la
  opción B lista "30 Sn" (Sn real = 118,7, no 30) — se priorizó el
  VALOR NUMÉRICO verificado sobre el símbolo químico impreso, que
  parece ser un error de tipeo del banco original.
- **Sistema de ecuaciones con dos soluciones válidas, una sola en las
  opciones** (2-2006 2da Opción, A8: raíz triple de otra): la ecuación
  cuadrática en el parámetro $k$ da DOS soluciones matemáticamente
  válidas ($k=4$ y $k=44/3$), pero solo una está entre las opciones —
  recordatorio de verificar todas las raíces antes de descartar.
- **"Vendió/compró con pérdidas en cascada"** (Parcial Propedéutico, A7
  huevos): dos porcentajes de pérdida en cascada (rotura al comprar,
  regalo al vender) que hay que aplicar en el ORDEN correcto y en la
  dirección correcta (dividir para "deshacer" una pérdida, no restar el
  porcentaje directamente).
- **Ángulo entre bisectrices de la base de un triángulo isósceles**
  (Parcial Propedéutico, G10): fórmula reutilizada del ángulo del
  incentro ($90°+V/2$), la misma técnica de fondo que ya había aparecido
  en el examen de geometría 2-2025 (2da Opción) con el ángulo entre
  bisectrices de un cuadrilátero (patrón #4 de la sección de patrones
  transversales) — confirma que "no memorices la fórmula rápida, rederivá
  desde el incentro" es un principio recurrente en este banco.

---

## 14. Patrones transversales detectados (entre exámenes)

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

8. **Preguntas geométricas/vectoriales sin figura = no resolubles con certeza
   por texto solo** — el examen 1-2023 (2da Opción) confirma un patrón ya
   visto en F11 del 2-2022: cuando el enunciado describe una figura
   geométrica compleja (semicircunferencias, cuadrados superpuestos,
   vectores en una circunferencia, topología de circuito) sin dar TODAS las
   medidas/ángulos/conexiones en el texto, intentar resolver "a ojo" con la
   lectura más plausible es alto riesgo de error silencioso (una respuesta
   que "sale limpio" pero está mal). La política del proyecto es: marcar
   `VERIFICAR` explícito en vez de adivinar, y NO fijar la letra de
   respuesta hasta tener el recorte nítido — más vale una pregunta marcada
   pendiente que una respuesta falsa presentada como verificada.

9. **Distractor de "componente parcial" en preguntas de vector/aceleración
   total** — en F12 del examen 2-2022 (2da Opción), calcular SOLO la
   componente centrípeta ($a_c=4$ m/s²) da un valor que coincide EXACTO con
   una de las opciones (D), mientras que el módulo real (combinando
   centrípeta + tangencial por Pitágoras) es $\sqrt{41}\approx6{,}40$ y no
   está entre las opciones. Mismo patrón de fondo que el "distractor
   directo" documentado en F11 del 2-2022 (1ra Opción): cuando una pregunta
   pide una magnitud RESULTANTE de varias componentes, el banco casi
   siempre incluye como opción el valor de una sola componente aislada —
   hay que verificar explícitamente que se sumó TODO lo que pide el
   enunciado antes de aceptar un resultado que "coincide" con una opción.

10. **"Campo/fuerza mínima perpendicular al hilo" — plantilla recurrente de
    péndulo cargado** — la MISMA pregunta (partícula cargada en equilibrio
    sobre un péndulo desviado un ángulo $\alpha$, hallar el campo eléctrico
    MÍNIMO) aparece dos veces en el banco con distintos números: F11 del
    examen 2-2022 (1ra Opción) y F9 del examen 1-2023 (3ra Opción). En
    ambos casos la clave es la misma: la fuerza/campo mínimo siempre es
    PERPENDICULAR al hilo, dando $E_{min}=mg\,\text{sen}\alpha/q$ directo,
    sin plantear el sistema completo de 3 fuerzas. Vale la pena que el
    estudiante domine esta plantilla a fondo — tiene alta probabilidad de
    reaparecer.

11. **Misma pregunta repetida LITERALMENTE (mismo enunciado y figura) entre
    convocatorias distintas** — F10 del examen 2-2022 (3ra Opción) es
    exactamente la misma pregunta que F9 del examen 2-2022 (2da Opción):
    mismo enunciado, misma figura (Hmax, 30m, 45m, puntos A y B), mismas
    5 opciones. A diferencia del patrón #10 (misma TÉCNICA con números
    distintos), acá es la pregunta ENTERA sin cambios — sugiere que el
    banco de la universidad a veces reutiliza el ítem completo entre
    convocatorias del mismo año, no solo la plantilla. Consecuencia
    práctica para este proyecto: cuando finalmente se consiga la figura
    nítida de este problema (vía foto de Ronald), la solución resuelve
    DOS preguntas del banco a la vez, no solo una.

12. **Exámenes históricos (pre-2020) tienen un formato distinto al moderno**
    — el examen 1-2005 confirma que las convocatorias antiguas de FCyT NO
    siempre tienen las 5 áreas modernas (Aritmética-Álgebra, Geometría-
    Trigonometría, Física, Química, Biología a 4 preguntas cada una): este
    en particular tiene Matemáticas sin subdividir (10 preguntas), Química
    (5) y Física (5), SIN Biología. Consecuencia práctica: al cargar
    exámenes viejos, no asumir la estructura moderna de memoria — revisar
    el PDF real, clasificar cada pregunta de Matemáticas por su técnica
    real (álgebra vs trigonometría) para mantener la taxonomía del banco
    consistente, y ajustar el `ponderacion` del frontmatter a la
    composición REAL de ese examen específico (el campo es un
    `Record<string, number>` flexible, no requiere las 5 áreas).

---

## 15. Próximos pasos sugeridos

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
