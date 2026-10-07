# Auditoría pedagógica · Biología 1 (BIO-01 a BIO-04)

## Resumen para Ronald

1. Leí las 4 primeras lecciones de Biología como un alumno que ve el tema por primera vez. Ninguna está conectada al catálogo todavía.
2. Hay **6 errores graves** (marcados GRAVE abajo). Cuatro son datos falsos: el bocio explicado como "hipertiroidismo" (es lo contrario), un ejercicio del sudor que marca como correcta la propiedad equivocada del agua, "46 hebras pasan a 92" y "la meiosis da 4 gametos" (en la mujer da 1). Los otros dos son contradicciones que hacen fallar al que estudió bien: una lección dice que los lípidos no llevan nitrógeno y la siguiente que sí, y la tabla final de BIO-02 les da a los lípidos un "monómero" que la propia lección les niega.
3. Ninguna hay que rehacerla. Las cuatro se arreglan cambiando frases sueltas, no estructura.
4. Veredicto: las cuatro quedan en **ARREGLAR ANTES** de publicar. Genética es la más cerca de estar lista (el simulador de Punnett da bien en los 16 casos); Células es la que más trabajo pide, porque usa "cromátida", "2n" y "haploide" sin haberlos explicado nunca.
5. Problema que se repite: hay ejercicios que se aprueban sin leer. En BIO-01, 6 de 8 respuestas caen en el segundo botón; en BIO-03, 5 de 6 caen en el tercero.

| Lección | Errores de contenido | Lagunas | Veredicto |
|---|---|---|---|
| componentes-materia-viva (BIO-01) | 9 | 14 | ARREGLAR ANTES |
| bases-moleculares-vida (BIO-02) | 8 | 13 | ARREGLAR ANTES |
| bases-celulares-vida (BIO-03) | 8 | 14 | ARREGLAR ANTES |
| genetica-mendeliana (BIO-04) | 5 | 13 | ARREGLAR ANTES |
| **Total** | **30** | **54** | |

Formato: **E** = error de contenido (va primero, con la cuenta o el dato correcto); **L** = laguna o problema de forma, con el criterio de §4.5 (1 a 6) y una propuesta en tuteo. Los números de línea son del `page.tsx` de cada lección tal como estaba el 7-oct-2026. Lo marcado "Nota" es un dato a verificar y no entra en el conteo.

---

## componentes-materia-viva (BIO-01)

`src/app/aprende/componentes-materia-viva/page.tsx` · **ARREGLAR ANTES**

### Errores de contenido

- **E1 · L36-37 vs L400 · la cuenta de elementos no cierra.** El hook dice "4 elementos... El otro 4% se reparte entre 22 elementos más" (4 + 22 = **26**); el resumen dice "Solo **27** elementos hacen toda la vida". Y la lección nombra solo 22 (6 primarios + 5 secundarios + 11 oligoelementos). Hay que elegir una cifra y usarla en los dos lugares, o mejor no dar una exacta: "unos 25 a 30 elementos, según cómo se cuenten".
- **E2 · L385-388 · bocio explicado al revés (GRAVE).** "el altiplano boliviano sufrió de bocio (**hipertiroidismo**) por déficit de yodo". La falta de yodo produce **hipotiroidismo**: sin yodo la tiroides no puede fabricar sus hormonas y crece tratando de compensar. La misma lección lo dice bien en L414 ("sin I, hipotiroidismo"), así que se contradice sola. Reemplazo: "bocio: la tiroides se agranda porque, sin yodo, no puede fabricar sus hormonas (hipotiroidismo)".
- **E3 · L449-454 (y L266) · el ejercicio del sudor marca la propiedad equivocada (GRAVE).** Pregunta "¿Qué propiedad del agua permite que el sudor enfríe el cuerpo?" y da por correcta "Alto calor específico", con la explicación "absorbe MUCHO calor antes de evaporarse". Lo que enfría al evaporarse es el **alto calor de vaporización** (cada gramo de sudor que se evapora se lleva unas 540 cal de la piel). El calor específico explica otra cosa: que el agua del cuerpo tarda en calentarse y amortigua los cambios de temperatura. La pizarra de L266 dice solo "Alto calor", que no distingue las dos. Arreglo: opción "Alto calor de vaporización", y en la pizarra separar "calor específico alto: tarda en calentarse" de "calor de vaporización alto: al evaporarse se lleva mucho calor".
- **E4 · L166 · "N: en proteínas y ácidos nucleicos (NO en glúcidos ni lípidos)" es falso y lo desmiente la lección siguiente (GRAVE).** La quitina, que BIO-02 L157 pone como glúcido, está hecha de un azúcar con nitrógeno (N-acetilglucosamina). Y BIO-02 L597 dice que "los fosfolípidos además llevan P y N". El alumno que pasa de BIO-01 a BIO-02 encuentra dos afirmaciones opuestas. Reemplazo: "N: siempre en proteínas y ácidos nucleicos; también en algunos glúcidos (quitina) y en algunos lípidos (varios fosfolípidos)".
- **E5 · L186, L370 · el calcio no cabe en su propia categoría.** Secundarios = "0.1–1%", pero el calcio es ~1,5% de la masa del cuerpo humano: más que el fósforo (~1%) y el azufre (~0,3%), que están entre los primarios. El alumno que compara con la pizarra de L139-144 no entiende por qué Ca es "secundario". Propuesta: "La clasificación es la tradicional de los libros y los límites son aproximados: el calcio pasa un poco del 1%, pero por costumbre se lo cuenta entre los secundarios."
- **E6 · L334 · par amortiguador equivocado.** "Regulador de pH: bicarbonato/carbonato (HCO₃⁻/CO₃²⁻)". El que regula el pH de la sangre es el par **ácido carbónico/bicarbonato** (H₂CO₃/HCO₃⁻).
- **E7 · L167 · la metionina no forma puentes disulfuro.** "S: en proteínas con cisteína/metionina (puentes disulfuro)". Los puentes S-S los forma solo la cisteína (dos cisteínas enfrentadas). Reemplazo: "S: en dos aminoácidos, cisteína y metionina; los puentes disulfuro los forman las cisteínas".
- **E8 · L324-325 y L345 · sales precipitadas mal asignadas (leve).** La pizarra pone SiO₂ junto a "huesos, dientes, conchas"; la sílice está en caparazones de diatomeas y en hojas de gramíneas, no en huesos ni dientes. Y la explicación dice "fosfato tricálcico [...] (hidroxiapatita)" como si fueran lo mismo: la hidroxiapatita es otra sal de calcio y fosfato, Ca₁₀(PO₄)₆(OH)₂. Para el examen alcanza con "fosfato de calcio".
- **E9 · L391-394 · causa inventada.** "En zonas de altura, el cuerpo produce más glóbulos rojos [...] Por eso la dieta andina (quinua, amaranto) es rica en Fe." La dieta no es rica en hierro *porque* el cuerpo fabrique más glóbulos rojos. Además el título "Anemia en altura" junta dos cosas opuestas: en la altura sube la cantidad de glóbulos rojos; la anemia es cuando faltan. Reemplazo: "En la altura tu cuerpo fabrica más glóbulos rojos para captar el poco oxígeno, y cada uno necesita hierro. Si comes poco hierro, aparece la anemia. La quinua y el amaranto son buenas fuentes de hierro."
- Nota · L387 · "desde 1980 toda la sal de consumo se yoda obligatoriamente": no pude verificar el año. Confirmarlo contra la norma boliviana antes de publicar.

### Lagunas

- **L1 · L36-38 · la pregunta del hook nunca se contesta.** "¿Por qué la vida usa tan pocos materiales de los 118?" Criterio 5. La respuesta está a medias en L171-174 (carbono) y no se conecta. Propuesta, al final del Cuidado del carbono: "Esta es la respuesta a la pregunta del principio: como el carbono puede unirse a otros cuatro átomos y formar cadenas, con pocos elementos se arman millones de moléculas distintas."
- **L2 · L56-58 vs L136 · ¿son 4 primarios o 6?** La mnemotecnia dice "los 4 bioelementos primarios" y una escena después la pizarra dice "6 bioelementos primarios". Criterio 2. Propuesta: "C, H, O y N son los 4 más abundantes. Con S y P forman los 6 bioelementos primarios."
- **L3 · L139-144 · porcentajes sin decir de qué.** "18%", "65%"... ¿de qué? Criterio 5. Propuesta en el título de la pizarra: "% de la masa de tu cuerpo". Y una línea: "El oxígeno es el que más pesa porque casi todo tu cuerpo es agua (H₂O)."
- **L4 · L143 · "aa cisteína".** Abreviatura del autor. Criterio 4. Propuesta: "aminoácidos cisteína y metionina".
- **L5 · L197-221 · la pizarra mezcla secundarios y oligoelementos sin rótulo.** Dos columnas (Ca, Na, K, Mg, Cl / Fe, I, Zn, Cu, F) sin encabezado: el alumno no sabe que la derecha son los oligoelementos. Criterio 6. Propuesta: encabezar "Secundarios" y "Oligoelementos". "Hemocianina" aparece sin explicar (criterio 3): "hemocianina (la 'hemoglobina' azul de pulpos y caracoles)".
- **L6 · L251-254 · polar, dipolo y carga parcial, todo de una y sin dibujo.** Criterio 3 y 6. Propuesta: dibujar la molécula en V con δ− en el O y δ+ en cada H, y el texto: "El oxígeno atrae a los electrones más que los hidrógenos. Por eso su punta queda un poco negativa y los hidrógenos un poco positivos: la molécula tiene dos 'polos', como un imán."
- **L7 · L263 · "polar disuelve polar".** Criterio 1. Propuesta: "El agua disuelve la sal porque sus polos rodean a cada ion: el lado negativo del agua rodea al Na⁺ y el lado positivo rodea al Cl⁻."
- **L8 · L266-267 · rótulos telegráficos.** "Alto calor", "Densidad anomalía". Criterio 4. Propuesta: "Calor específico alto", "Densidad anómala". (El primero está atado a E3.)
- **L9 · L260 vs L292-293 · dos listas de "6" distintas.** La pizarra trae 6 propiedades y la mnemotecnia 6 funciones (lubricante, reactivo, estructural...) que no se explican en ningún lado. Criterio 2. Propuesta: explicar cada función con un ejemplo de una línea, o sacar la mnemotecnia.
- **L10 · L305 · notación de iones sin puente.** Na⁺, HCO₃⁻, PO₄³⁻, Ca²⁺ aparecen sin decir qué es el signo de arriba. Criterio 3. Propuesta: "El signo de arriba indica la carga: Na⁺ es sodio que perdió un electrón; Ca²⁺ perdió dos; Cl⁻ ganó uno."
- **L11 · L393 · "baja PO₂".** Criterio 4. Propuesta: "porque en la altura cada vez que respiras entra menos oxígeno".
- **L12 · L41-48 · la materia viva "tiene capacidad de reproducción".** Lo que se reproduce es el ser vivo, no "un conjunto de sustancias". Criterio 1. Propuesta: "Las sustancias que forman a los seres vivos. Los seres vivos, a su vez, crecen, se reproducen y tienen metabolismo."
- **L13 · AutoCheck · 6 de 8 respuestas en el segundo botón** (L116, L233, L445, L452, L459, L466). Se aprueba sin leer. Mezclar posiciones.
- **L14 · L136 y L159 · guion largo** pegado a símbolos químicos ("primarios — CHONSP", "CHON SP — pronunciado"). Cambiar por dos puntos.

---

## bases-moleculares-vida (BIO-02)

`src/app/aprende/bases-moleculares-vida/page.tsx` · **ARREGLAR ANTES**

### Errores de contenido

- **E1 · L141-143 · una línea de la pizarra queda fuera del dibujo.** El SVG mide `viewBox="0 0 720 240"` y el texto "al unirse sale una molécula de agua: por eso 'libera H₂O'" está en `y={248}`: queda recortado y el alumno no lo ve. Además las comillas citan "libera H₂O" como si se hubiera dicho antes, y no se dijo. Subir `alto` y `viewBox` a 260 y redactar: "Al unirse dos azúcares, sale una molécula de agua."
- **E2 · L83-84 vs L612-617 · la mnemotecnia enseña el error que la lección refuta después.** Escena 1: "Proteínas = músculo" como traducción "callejera". Escena 9: "Error 1 · 'Las proteínas son solo músculo'". Reemplazo: "Proteínas = las obreras (hacen casi todo)".
- **E3 · L579 vs L77 y L598 · la tabla le da monómero a los lípidos (GRAVE).** La escena 1 dice "Los lípidos son la excepción" (no son polímeros) y el resumen repite "no se arman como collares", pero la tabla final pone "Monómero: ácido graso / glicerol". El que contesta "¿cuál es el monómero de los lípidos?" mirando la tabla se equivoca según la propia lección. Reemplazo de la celda: "no tiene (no es polímero); se arma con glicerol + ácidos grasos".
- **E4 · L270-272 · el huevo cocido explicado al revés.** "Los puentes S-S [...] son los que hacen que un huevo cocido no vuelva a ser crudo." Pero en L295-298 la desnaturalización es *perder* la forma 3D, y esa forma la sostienen justamente esos enlaces. Si los S-S sostienen la forma del huevo crudo, no pueden ser la razón de que el cocido no vuelva atrás. Al cocinar, la proteína se desarma y sus cadenas se enredan entre ellas de otra manera. Reemplazo: "Los puentes S-S unen dos azufres y son mucho más firmes que los puentes de hidrógeno." El huevo, solo en Desnaturalización: "Al cocinarlo, las proteínas se desarman y se enredan unas con otras; por eso no vuelve a ser crudo."
- **E5 · L339 vs L384 · dos cifras distintas para lo mismo.** Hook: "Aceleran [...] hasta 10⁶ veces". Lista: "aceleran 10⁴–10⁸ veces". "Hasta 10⁶" y "hasta 10⁸" no pueden ser las dos ciertas. Usar una sola, y aclarar que hay enzimas que aceleran mucho más.
- **E6 · L411-413 · dos datos falsos en el hook del ADN.** (a) "daría 100 vueltas al sistema solar": 2 m × ~10¹³ células con núcleo ≈ 2 × 10¹⁰ km. Una vuelta a la órbita de Neptuno mide ~2,8 × 10¹⁰ km, así que no llega ni a una vuelta, mucho menos a 100. Cifra defendible: "alcanzaría para ir y volver del Sol unas 60 veces" (ida y vuelta = 3 × 10⁸ km). (b) "todo el 'manual' para fabricarte cabe en un solo óvulo": el óvulo lleva **la mitad** (23 cromosomas); el manual completo está en el **cigoto**, el óvulo ya fecundado. BIO-03 enseña justo eso.
- **E7 · L596-597 · "los fosfolípidos además llevan P y N, de ahí su nombre".** El nombre viene solo del fósforo (fosfo-). Y choca con BIO-01 L166, que dice que los lípidos no tienen N (ver E4 de BIO-01: los dos textos tienen que ponerse de acuerdo). Reemplazo: "los fosfolípidos además llevan P (de ahí 'fosfo') y muchos llevan N".
- **E8 · L455 · atribución equivocada (leve).** "Reglas de complementariedad (Chargaff)" para "A con T, G con C". El apareamiento lo propusieron Watson y Crick; Chargaff midió las proporciones (A = T, G = C). La propia lección usa "Chargaff" para las proporciones en L467. Propuesta: "Apareamiento de bases (Watson y Crick)" aquí y "Regla de Chargaff" allá.
- Nota · L639 · "Cada examen FCyT trae 1–2 preguntas": dato sin fuente. Contarlo con script contra el banco antes de publicar, o sacarlo.

### Lagunas

- **L1 · L101-102 · dos fórmulas seguidas sin puente y en texto plano.** "Cn(H₂O)n" y enseguida "(CH₂O)n". El subíndice n no se ve como subíndice. Criterio 3 y regla 12. Propuesta: "Por cada carbono hay una molécula de agua: la glucosa, C₆H₁₂O₆, son 6 veces CH₂O. De ahí el nombre 'hidratos de carbono'."
- **L2 · L256, L261, L549 · "aa".** Abreviatura del autor. Criterio 4. Escribir "aminoácidos".
- **L3 · L324-325 y L550 · abreviaturas en inglés.** "Leu, Ile, Lys, Met, Phe, Thr, Trp, Val, His" y "AUG = Met". Criterio 4. Propuesta: nombres completos (leucina, isoleucina, lisina, metionina, fenilalanina, treonina, triptófano, valina, histidina) y "AUG = metionina".
- **L4 · L249 · "100,000".** En Bolivia la coma es decimal: se lee "cien". Criterio 4. Escribir "100 000" o "cien mil".
- **L5 · L280-291 · los 4 niveles de las proteínas, solo con texto.** "α-hélice", "lámina β", "estructura 3D" en cajas de texto. Es el tema que más pide dibujo. Criterio 6. Propuesta: en cada caja, un mini-dibujo (cuentas en fila; un resorte; un ovillo; dos o más ovillos juntos) y "α-hélice (un resorte)", "lámina β (una hoja plegada como acordeón)".
- **L6 · L344 · "Reduce la energía de activación, sin alterar el equilibrio".** Dos ideas nuevas en una línea. Criterio 3. Propuesta: "Toda reacción necesita un 'empujón' inicial para arrancar (energía de activación). La enzima achica ese empujón, y por eso la reacción va más rápido."
- **L7 · L386, L391 · "T".** Criterio 4. Escribir "temperatura".
- **L8 · L399 · "DNA polimerasa".** Mezcla la sigla inglesa con ADN, que usa toda la lección. Criterio 4. "ADN polimerasa".
- **L9 · L417-418 · el nucleótido sin dibujo.** "base nitrogenada + azúcar + grupo fosfato" pide un esquema de tres piezas. Criterio 6. Propuesta: círculo (fosfato) unido a un pentágono (azúcar) unido a un rectángulo (base).
- **L10 · L469 · "purinas (A+G) [...] pirimidinas (T+C)".** Nunca se definen. Criterio 3. Propuesta: "Las bases son de dos familias: purinas (A y G, más grandes) y pirimidinas (T, C y U, más chicas). Cada pareja junta una de cada familia."
- **L11 · L548-549 · "64 codones" y "DEGENERADO".** No se dice de dónde sale 64. Criterio 1. Propuesta: "Hay 4 bases y cada codón usa 3, así que hay 4 × 4 × 4 = 64 codones. Como solo hay 20 aminoácidos, a varios les toca más de un codón: por eso se dice que el código es 'degenerado'."
- **L12 · L224-225 · "Por eso engordan más fácil".** Más energía por gramo no explica sola que engorden. Criterio 1. Propuesta: "Por eso un poco de grasa aporta mucha energía; si comes más de la que gastas, el cuerpo la guarda."
- **L13 · L457-458 · guion largo entre bases.** "A — T", "G — C", "A — U". Cambiar por "A con T".

---

## bases-celulares-vida (BIO-03)

`src/app/aprende/bases-celulares-vida/page.tsx` · **ARREGLAR ANTES** (la que más trabajo pide)

### Errores de contenido

- **E1 · L356 · "Las 46 hebras pasan a 92" (GRAVE).** Confunde hebra, cromosoma y cromátida. En la fase S cada uno de los 46 cromosomas se copia y queda con **dos cromátidas** (92 cromátidas), pero siguen siendo **46 cromosomas**. Y "hebra" en BIO-02 es otra cosa (cada mitad de la doble hélice: antes de copiarse, 46 cromosomas ya son 92 hebras de ADN). Reemplazo: "S (Síntesis): se copia el ADN. Cada uno de los 46 cromosomas queda formado por dos copias idénticas unidas (cromátidas hermanas)."
- **E2 · L440 y L523 · "la meiosis da 4 gametos" (GRAVE).** Vale para los espermatozoides; en la ovogénesis sale **1 óvulo** y 3 células pequeñas que se descartan (cuerpos polares). Es pregunta clásica de examen. Reemplazo en la definición: "cuatro células hijas haploides. En el hombre, las cuatro son espermatozoides; en la mujer, solo una llega a ser óvulo." En el resumen: "Meiosis = 4 células con la mitad de cromosomas".
- **E3 · L251-252 vs L215 · "únicos organelos con ADN propio".** La pizarra de la misma escena pone al **núcleo** como organelo y con "ADN". Leída como está, la frase es falsa. Reemplazo: "Fuera del núcleo, mitocondrias y cloroplastos son los únicos organelos con su propio ADN (distinto del ADN del núcleo) y sus propios ribosomas."
- **E4 · L418-420 vs L502-506 · la mitosis hace y no hace reproducción.** "Función biológica" dice que la mitosis sirve para "reproducción asexual"; el "Error 2 · 'Mitosis = reproducción'" dice que es solo para crecimiento y reparación. El alumno no sabe a cuál creerle. El error real es pensar que la mitosis produce **gametos**. Reemplazo del título: "Error 2 · 'La mitosis fabrica gametos'"; en Realidad: "En ti, la mitosis sirve para crecer y reparar. Los gametos los hace la meiosis."
- **E5 · L329-343 · el gráfico de torta no coincide con su leyenda.** La leyenda dice G2 ~15% y M ~10%; los arcos dibujados miden **45° cada uno, o sea 12,5% y 12,5%**: G2 y M se ven iguales. De (−70, 0) a (−50, −50) son 45°, y de (−50, −50) a (0, −70) otros 45°. Para 15% el arco de G2 tiene que medir 54° y el de M 36°: el punto de corte va en (−41,1; −56,6) en vez de (−50; −50).
- **E6 · L441 y L460 · dónde ocurre la meiosis (leve).** "Ocurre solo en gametogénesis" y "Tipo de célula: gametos". La meiosis ocurre en células germinales (que son 2n) y **produce** gametos; en plantas y hongos produce esporas. Reemplazo: "En los animales, ocurre en ovarios y testículos y produce los gametos." Celda: "células germinales → gametos".
- **E7 · L222 y L240 vs L302-305 · cloroplastos: ¿solo plantas, o plantas y algas?** La pizarra dice "solo plantas", la definición "plantas y algas", y el ejercicio pregunta qué organelo está "SOLO en células vegetales" mientras su explicación dice "plantas y algas". Unificar en "plantas y algas" y reformular la pregunta: "¿Qué organelo tienen las células vegetales y NO las animales?"
- **E8 · L392-404 · probable texto encimado en la pizarra de mitosis (verificar en pantalla).** Las cajas miden 180 de ancho, pero "se separan cromátidas hermanas (a los polos)" (~44 caracteres a 11 px ≈ 250 px) y "2 células diploides (2n) idénticas a la madre" no caben: el texto de Anafase invadiría el de Metafase. El `split(",")` solo parte la línea donde hay coma, y estas frases no la tienen.

### Lagunas

- **L1 · toda la lección · el vocabulario de los cromosomas nunca se enseña.** Cromatina (L393), cromosoma, cromátidas hermanas (L395, L535), cromosomas homólogos (L476), 2n y n, diploide y haploide (L397, L439). Criterio 3 y 5. Es la laguna más grande de las cuatro lecciones: sin esto, mitosis y meiosis son palabras sueltas. Propuesta: una escena corta antes de Mitosis, con dibujo (un palito antes de la fase S; una X después), y este texto: "El ADN de tu núcleo está repartido en 46 pedazos: los cromosomas. Vienen de a pares: 23 de tu mamá y 23 de tu papá (los dos de cada par se llaman homólogos). Una célula con los pares completos es diploide (2n = 46); una con un solo cromosoma de cada par es haploide (n = 23). Cuando la célula copia su ADN, cada cromosoma queda con dos copias pegadas por el centro, como una X: cada mitad de la X es una cromátida."
- **L2 · L397 · "2n" antes de definirlo.** Aparece en Mitosis y recién se explica en Meiosis (L439). Criterio 3. Lo resuelve L1.
- **L3 · L104-106, L134 · abreviaturas.** "μm", "70S", "mit., cloro., RE", "Ma". Criterio 4. Propuesta: "micrómetros (milésimas de milímetro)", sacar "70S", "mitocondrias, cloroplastos, retículo endoplasmático", "hace 3500 millones de años".
- **L4 · L187 · "Ósmosis: paso de agua".** Falta hacia dónde. Criterio 5. Propuesta: "Ósmosis: el agua pasa desde donde hay menos sustancias disueltas hacia donde hay más."
- **L5 · L196-198 · "gradiente" se define después de usarlo**, y la lista de transportes no dice cuál va a favor y cuál en contra. Criterio 3. Propuesta: definirlo antes de la lista: "Gradiente: diferencia de concentración entre adentro y afuera. Las sustancias tienden a pasar solas de donde hay más a donde hay menos."
- **L6 · ATP nunca se define.** Se usa en L189, L216 y L236 y en los ejercicios. Criterio 3. Propuesta: "ATP: la molécula que la célula usa como 'moneda' de energía. Se gasta para hacer trabajo y se recarga en la mitocondria."
- **L7 · L236 · "fosforilación oxidativa".** Criterio 4. A este nivel basta: "Allí se fabrica la mayor parte del ATP, usando el oxígeno que respiras."
- **L8 · L355, L357 · "Gap 1", "Gap 2".** Inglés sin traducir. Criterio 4. Propuesta: "G1 (de *gap*, 'intervalo' en inglés)".
- **L9 · L363 · "puntos de control".** Criterio 3. Propuesta: "Entre fase y fase, la célula revisa que todo esté bien antes de seguir: son los puntos de control."
- **L10 · L392-397 · mitosis sin dibujo de las fases.** Cinco cajas de texto para un proceso que se aprende mirando. Criterio 6. Propuesta: en cada caja, un dibujo mínimo (cromosomas sueltos; en fila en el centro; mitades yendo a los polos; dos núcleos).
- **L11 · L444-479 · meiosis sin dibujo de sus dos divisiones** y crossing-over sin esquema. "Profase I" trae un "I" que no se explica. Criterio 6 y 3. Propuesta: esquema 1 → 2 → 4 células con el número de cromosomas en cada una, y la frase: "La meiosis tiene dos divisiones seguidas, meiosis I y meiosis II; cada una tiene su profase, metafase, anafase y telofase."
- **L12 · L412-414 · "PMAT [...] O en español: 'Picaron mi auto trapeando'".** PMAT ya está en castellano, así que "o en español" confunde. Criterio 4. Propuesta: "Para recordar PMAT: 'Picaron Mi Auto Trapeando'."
- **L13 · AutoCheck · 5 de 6 respuestas en el tercer botón** (L304, L530, L537, L544, L558). Se aprueba sin leer. Mezclar posiciones.
- **L14 · forma.** L235 "pliegada" → "plegada". L73 guion largo ("viene de otra" — base) → dos puntos.

---

## genetica-mendeliana (BIO-04)

`src/app/aprende/genetica-mendeliana/page.tsx` · **ARREGLAR ANTES** (la más cerca de publicable)

**El simulador de Punnett (L272-358) da bien.** Lo comprobé con un script sobre las 16 combinaciones de alelos de los dos padres: cuadro, conteos sobre 4 y fenotipo coinciden en todos los casos. También rehíce las cuentas de los ejemplos: 320/16 = 20; (3/4)⁴ = 81/256 ≈ 31,6%; ABO, 1/4 cada grupo; daltonismo, 1/4 de los hijos y 50% de los varones; 0% de hijas daltónicas; O × AB → A o B. Todas correctas.

### Errores de contenido

- **E1 · L218-222 · la ley de segregación enunciada como si fuera el resultado de una cruza.** "Al cruzar dos individuos HETEROCIGOTOS (Aa × Aa), los alelos se separan al formar gametos." La ley vale para **cualquier** individuo: cada gameto lleva un solo alelo de cada gen. El 3:1 es lo que se observa al cruzar dos heterocigotos, no la ley. Reemplazo: "Cada individuo tiene dos alelos de cada gen, pero al formar gametos se separan: cada gameto lleva solo uno. Por eso, al cruzar dos heterocigotos (Aa × Aa), la F2 sale así:"
- **E2 · L39-40 · fechas que se leen mal (leve).** "Murió en el olvido. 35 años después, lo redescubrieron": se lee como 35 años después de su muerte (1884 + 35 = 1919). Lo redescubrieron en 1900: 35 años después de presentar su trabajo (1865, publicado en 1866). Reemplazo: "En 1900, 35 años después de su trabajo y 16 después de su muerte, tres científicos lo redescubrieron."
- **E3 · L489-490 · "los varones no portan".** Se puede leer como "los varones no transmiten", y es al revés: un padre con Xᵃ se lo pasa a **todas** sus hijas (la propia lección lo usa en L609). Lo cierto es que un varón no puede ser portador *sano*. Reemplazo: "El hijo varón recibe su X de la mamá. Un varón no puede ser portador sano: si tiene el alelo, está enfermo."
- **E4 · L609 · "Es padre daltónico + madre portadora".** Dicho así parece la única combinación posible; también pasa con madre daltónica. Reemplazo: "Por ejemplo, con padre daltónico y madre portadora."
- **E5 · L615-616 · "La sumatoria de ambos determina el fenotipo".** "Sumatoria" contradice la dominancia que enseña la lección: Aa no es medio AA más medio aa, se ve igual que AA. Reemplazo: "La combinación de los dos alelos determina el fenotipo."
- Nota · L93-94 · el color de ojos como un solo gen con alelos B y b es una simplificación (depende de varios genes). Sirve, pero conviene un ejemplo mendeliano de verdad (guisantes o grupo sanguíneo).

### Lagunas

- **L1 · notación con "^" en texto plano (la más visible).** "X^A X^a", "I^A i", "I^A I^B" aparecen literalmente con el acento circunflejo, en SVG y en texto (L458-462, L481-485, L503, L513-515, L547-550, L573, L579-580, L609, L644). Criterio 4 y regla 12. Propuesta: superíndice real (MathText, o `<tspan>` con `baseline-shift="super"` en el SVG) y una línea la primera vez: "La letra chiquita arriba del X es el alelo que lleva ese cromosoma: Xᴬ lleva el alelo normal y Xᵃ el del daltonismo."
- **L2 · L112-114 · "Homocigoto" y "Heterocigoto" sin definir.** Están como títulos de caja, con ejemplos pero sin la regla. Criterio 3. Propuesta: "Homo = igual: los dos alelos iguales (AA o aa). Hetero = distinto: un alelo de cada uno (Aa)."
- **L3 · L148, L179, L220 · P, F1, F2 sin definir.** Criterio 3. Propuesta: "P son los padres. F1 (primera generación) son sus hijos. F2 son los hijos de cruzar F1 con F1."
- **L4 · L201 y L563 · notación de gametos.** "Gametos: R, R × r, r" y "A o a × a, a": el × entre gametos y la mezcla de "o" y "," son del que escribió. Criterio 4. Propuesta: "Gametos del padre 1: R. Gametos del padre 2: r."
- **L5 · L399-402 · "A_B_" y qué es B.** El guion bajo no se explica, y nunca se dice que B = liso (solo A = amarillo, en L129). Criterio 4 y 5. Propuesta: "A = amarillo, a = verde; B = liso, b = rugoso. El guion bajo quiere decir 'cualquier alelo': A_ es AA o Aa, que se ven iguales."
- **L6 · L396 · el 9:3:3:1 cae del cielo.** No se muestra de dónde sale. Criterio 5. Propuesta: "Cada gen por separado da 3/4 dominante y 1/4 recesivo. Como se heredan independientes, se multiplican: 3/4 × 3/4 = 9/16 (los dos dominantes); 3/4 × 1/4 = 3/16; 1/4 × 3/4 = 3/16; 1/4 × 1/4 = 1/16."
- **L7 · L569-570 · (3/4)⁴ sin la regla del producto.** Usa "probabilidades independientes se multiplican" sin haberlo enseñado, y la potencia va en texto plano. Criterio 2 y regla 12. Se resuelve con L6, más: "Cada hijo es independiente del anterior: la probabilidad de que pasen las cuatro cosas es multiplicar 3/4 cuatro veces."
- **L8 · L527-530 · "sin antígenos", "sin anticuerpos".** Ni antígeno ni anticuerpo se explican. Criterio 3. Propuesta: "Los glóbulos rojos llevan 'etiquetas' (antígenos A, B y Rh). La sangre tiene defensas (anticuerpos) contra las etiquetas que no son suyas. O− no lleva etiquetas: nadie lo rechaza. AB+ no tiene defensas contra ninguna: puede recibir de todos."
- **L9 · L543-544 · "Por eso dices 'A+'".** El "por eso" no se sigue de lo anterior. Criterio 1. Propuesta: "Tu grupo completo combina los dos genes, ABO y Rh. Por ejemplo, 'A+' es grupo A con Rh positivo."
- **L10 · L54 · "¿Por qué guisantes?" sin respuesta.** Criterio 1. Propuesta: "Porque crecen rápido, dan muchas semillas, se pueden cruzar a mano y cada rasgo tiene solo dos formas fáciles de distinguir."
- **L11 · L301-302 · el simulador no dice qué estás eligiendo.** Cada padre tiene dos selectores y no se explica que son sus dos alelos ni que pasa uno solo. Criterio 5. Propuesta: "Cada padre tiene dos alelos: elige los dos de cada uno. En el cuadro, cada fila y cada columna es un alelo que ese padre puede pasar."
- **L12 · L134 · "se EXPRESA cuando hay un solo alelo".** Se puede leer como "solo cuando hay uno". Criterio 5. Propuesta: "basta con una copia para que se vea".
- **L13 · L416 · signo de pregunta duplicado.** "¿De 320 descendientes, ¿cuántos son aabb?" → "De 320 descendientes, ¿cuántos son aabb?".

---

## Patrones que se repiten en las cuatro

- **Contradicciones entre lecciones**, no solo dentro de una: el N en lípidos y glúcidos (BIO-01 E4 contra BIO-02 L157 y L597). Conviene que una sola persona lea las cuatro de corrido antes de publicar.
- **Abreviaturas de libro de texto** (aa, Met, T, PO₂, μm, Ma, 70S, A_, X^A): es la laguna que más se repite.
- **Tablas como único dispositivo visual**: niveles de proteína, mitosis y meiosis son procesos y piden dibujo, no cajas de texto.
- **Respuestas apiladas en el mismo botón** en BIO-01 y BIO-03.
- No encontré voseo en ninguna de las cuatro.
