# Auditoría pedagógica · Biología (tanda 2)

Tres lecciones de Biología de Ingeniería que todavía no están en el catálogo:
`energia-celular` (BIO-05), `diversidad-seres-vivos` (BIO-06) y
`ecologia-medioambiente` (BIO-07). Leídas como un alumno que ve el tema por
primera vez. Informe aparte de `auditoria-pedagogica.md` para no pisar a otro
auditor que corría en paralelo.

## Resumen para Ronald

1. Ninguna de las tres se puede publicar tal cual, pero ninguna hay que rehacerla: con arreglos chicos (una o dos líneas cada uno) quedan bien.
2. La tabla de ATP de `energia-celular` está bien (suma 38) y la cuenta de carbonos cierra; el problema es que el resto de la lección dice 36 en tres lugares y reparte el ATP por etapa de otra forma que la tabla, así que el alumno ve dos números distintos.
3. `diversidad-seres-vivos` tiene el cruce de la mula al revés (la mula es burro × yegua, no caballo × burra) y la fecha de Linneo mal; son datos que el examen puede preguntar.
4. `ecologia-medioambiente` es la que más errores tiene: el ejemplo de competencia es entre leones (misma especie, no "entre especies"), el ejemplo de pirámide invertida no muestra lo que dice, el ejercicio de las 10.000 kcal parte del Sol, y la reserva Eduardo Avaroa no incluye el Salar de Uyuni.
5. Hay varios datos de Bolivia (porcentaje de áreas protegidas, "14% de la biodiversidad mundial", "4 ecorregiones", Madidi en Beni) que conviene contrastar con la guía de la UMSS antes de publicar; no los di por errores seguros.

| Lección | Errores de contenido | Datos a verificar | Lagunas | Forma | Veredicto |
|---|---|---|---|---|---|
| energia-celular | 6 | 1 | 13 | 3 | ARREGLAR ANTES |
| diversidad-seres-vivos | 4 | 3 | 10 | 4 | ARREGLAR ANTES |
| ecologia-medioambiente | 8 | 5 | 13 | 4 | ARREGLAR ANTES (Pirámides y Ciclos piden figura nueva) |

Convención para contar con grep: cada hallazgo es una línea que empieza con
`- **[ERROR]**`, `- **[DATO]**` (dato dudoso que hay que contrastar con una
fuente antes de tocarlo), `- **[LAGUNA]**` o `- **[FORMA]**`.

**Patrón de las tres:** las 15 `AutoCheck` tienen la respuesta en el segundo o
el tercer botón (índices 1 y 2), salvo una en el cuarto; ninguna en el primero.
En `diversidad-seres-vivos`, 4 de 5 caen en el mismo botón.

**Nota sobre la regla 12:** las ecuaciones químicas (por ejemplo la global de
la respiración o la fotólisis del agua) van en texto plano con subíndices
unicode. La regla habla de "expresión matemática"; hay que decidir si cubre las
químicas. No lo conté como hallazgo.

---

## 1. `src/app/aprende/energia-celular/page.tsx` · ARREGLAR ANTES

**Cuentas rehechas y que SÍ dan.** Tabla de balance (L428-434): glicólisis
2 + 2·3 = 8; transición 2·3 = 6; Krebs 2 + 6·3 + 2·2 = 24; total 8 + 6 + 24 = 38.
Fila "Total directo": 4 ATP, 10 NADH, 2 FADH₂ → 4 + 30 + 4 = 38. Panorama
(L172-175): CO₂ = 2 (transición) + 4 (Krebs) = 6, igual que la ecuación global.
Glicólisis: −2 + 4 = 2 netos. Krebs por vuelta 3 NADH + 1 FADH₂ + 1 GTP + 2 CO₂,
por glucosa el doble, igual que la mnemotecnia de L331. Cadena: 10·3 + 2·2 = 34
(modelo 38) o 32 (modelo 36), así que "32–34" es coherente. Las dos ecuaciones
globales están balanceadas (C 6, H 12, O 18 de cada lado). Fotólisis balanceada
en átomos y carga. La figura de la cadena no dibuja bombeo de H⁺ en el complejo
II, que es lo correcto.

### Errores de contenido

- **[ERROR]** L39-40 · *"Cada segundo, tu cuerpo gasta y reproduce 10 millones de moléculas de ATP."* · El dato de 10 millones por segundo es **por célula**, no por cuerpo. El cuerpo entero recicla del orden de su propio peso en ATP por día (~50 kg ≈ 100 mol ≈ 6·10²⁵ moléculas/día ≈ 10²¹ por segundo): el texto se queda corto por unos 13 órdenes de magnitud. Reemplazo: *"Cada célula de tu cuerpo gasta unos 10 millones de moléculas de ATP por segundo."*
- **[ERROR]** L189-190 vs L169 y L20-22 · La mnemotecnia dice *"GLI – KREBS – CADENA… Tres etapas"* y *"las otras dos sí"*, pero la figura de arriba (ya corregida) dice *"Las 4 etapas"* e incluye el paso de transición. Además los títulos de escena numeran *"2. Ciclo de Krebs"* y *"3. Cadena respiratoria"*, y la figura numera Krebs 3 y Cadena 4. El alumno ve dos numeraciones distintas en la misma lección. Hay que alinear: o 4 etapas en todos lados (y la mnemotecnia pasa a "Glicólisis no necesita O₂; las otras tres sí"), o 3 etapas con la transición como "puente" sin número.
- **[ERROR]** L458-459, L643-645, L650-651, L655-656 · **La lección usa dos cuentas sin decir cuál.** La tabla da 38 y reparte por etapa 8 / 6 / 24. Pero: la mnemotecnia del balance dice *"36 ATP… El O₂ multiplica el rendimiento por 18"* (con la tabla de arriba, 38 / 2 = **19**); el resumen final dice *"glicólisis (2 ATP) → Krebs (2 ATP) → cadena (32 ATP) = 36+"*, que es otra forma de contar (ATP directo por etapa, y la cadena con 32, no los 34 de la tabla); y el Error 3 dice *"glicólisis solo aporta 2 ATP"* cuando la fila de la tabla dice 8. Un alumno que compare la tabla con el resumen encuentra la glicólisis con 8 y con 2. Propuesta: una frase puente en el balance, *"Fíjate que hay dos maneras de repartir: si cuentas solo el ATP que sale directo, la glicólisis da 2; si le sumas lo que después pagan sus NADH en la cadena, da 8. El total es el mismo."*, y unificar en 38 (o en 36 en todos lados, cambiando la tabla).
- **[ERROR]** L471-473 vs L477 · *"Las plantas son las únicas que pueden capturarla directamente"* y cuatro líneas abajo la definición dice *"plantas, algas y cianobacterias"*. La lección de ecología (L504-508) además enseña que el mayor productor del planeta son las algas. Reemplazo: *"Las plantas, las algas y algunas bacterias son los únicos seres vivos que pueden capturarla directamente…"*
- **[ERROR]** L600-601 · Tabla comparativa: *"Lugar: Mitocondria"* y *"Ocurre en: Todos los seres vivos"*. Leídas juntas dicen que todos los seres vivos tienen mitocondria, lo que contradice la lección BIO-06 (Monera: "sin organelos membranosos") y la propia escena 4 (la glicólisis es en el citoplasma). Reemplazo: Lugar *"Citoplasma + mitocondria"*; Ocurre en *"Casi todos (las bacterias, sin mitocondria, en su membrana)"*.
- **[ERROR]** L566-568 y L637-639 · *"Ocurre tanto de día como de noche"* y *"ocurre TODO el día, mientras haya ATP y NADPH (que se acumulan durante la fase luminosa)"*. El ATP y el NADPH no se acumulan: se gastan en segundos o minutos, y varias enzimas del ciclo de Calvin (la RuBisCO entre ellas) se activan con la luz. En la práctica el ciclo de Calvin ocurre de día, a la par de la fase luminosa. Lo correcto del mensaje es que "oscura" no significa "de noche". Reemplazo: *"Se llama oscura porque no usa la luz directamente, no porque ocurra de noche. En realidad funciona de día, al mismo tiempo que la fase luminosa, porque necesita el ATP y el NADPH que esta va fabricando."* Contrastar con la guía UMSS: algunos textos escolares dicen "ocurre con o sin luz", y si el examen lo pregunta así hay que decidir cómo enseñarlo.

### Dato a verificar

- **[DATO]** L452 · *"En la célula real varía entre 30 y 38, porque mover los NADH hacia la mitocondria cuesta energía."* La razón principal de los 30-32 actuales es que cada NADH rinde ~2,5 ATP y cada FADH₂ ~1,5, no 3 y 2; el transporte de NADH explica solo la diferencia 36/38. No es falso, pero está incompleto. Para el examen alcanza con "36–38".

### Lagunas

- **[LAGUNA]** L52, L80, L91 · **Pi** nunca se explica. Criterio 4. Propuesta: *"Pi es un fosfato suelto (la «i» es de «inorgánico»): el tercer fosfato que se le soltó al ATP."*
- **[LAGUNA]** L52 · *"ATP ⇌ ADP + Pi (libera energía)"*: la doble flecha no dice en qué sentido se libera. Criterio 3. Propuesta: *"ATP → ADP + Pi libera energía. Al revés, ADP + Pi → ATP, la gasta: así se recarga la «pila»."*
- **[LAGUNA]** L68, L91 · *"7.3 kcal/mol"* sin decir qué es kcal/mol. Criterio 3. Propuesta: *"kcal/mol es la energía que se suelta al romper ese enlace en un mol de moléculas (el «paquete» que viste en química)."*
- **[LAGUNA]** L172-175, L276, L343, L417 · **NADH y FADH₂ nunca se definen**, y toda la cuenta de los 38 depende de ellos ("NADH ≈ 3 ATP"). Es la laguna más grande de la lección. Criterio 3/5. Propuesta, como `Definicion` en el panorama: *"NADH y FADH₂ son «camiones de electrones»: se cargan en la glicólisis y en Krebs, y descargan en la cadena respiratoria. Cada NADH que descarga paga unos 3 ATP; cada FADH₂, unos 2."*
- **[LAGUNA]** L173, L276, L293 · **Acetil-CoA** aparece sin explicar qué es ni de dónde sale; el paso de transición se agregó a la figura pero no tiene texto. Criterio 3/5. Propuesta en la escena de Krebs: *"Antes de entrar, cada piruvato (3 C) suelta un carbono como CO₂. Los 2 C que quedan (el acetilo) se enganchan a una molécula transportadora, la coenzima A: eso es el acetil-CoA."*
- **[LAGUNA]** L313 · *"1 GTP (≈ATP)"*: GTP no se presenta. Criterio 4. Propuesta: *"El GTP es casi igual al ATP (cambia la adenina por guanina) y la célula lo canjea por un ATP; por eso en la tabla cuenta como ATP."*
- **[LAGUNA]** L129, L136, L143-144 · *"CATABOLISMO… LIBERA ATP"*: sugiere que el ATP estaba guardado adentro de los polímeros. Lo que se libera es energía, que la célula usa para fabricar ATP. Y *"Ana sube; Cata baja"* no dice qué sube ni qué baja. Criterio 5. Propuesta: *"LIBERA ENERGÍA (que se guarda como ATP)"* y *"Ana sube (de piezas chicas a grandes); Cata baja (de grandes a chicas)."*
- **[LAGUNA]** L190 · *"Glicólisis no necesita O₂; las otras dos sí"*: Krebs no usa O₂ en ninguna reacción, y el alumno que lea la escena de Krebs no lo va a encontrar. Criterio 1. Propuesta: *"Krebs no usa O₂ directamente, pero sin O₂ la cadena se atasca, los «camiones» NADH no pueden descargar y Krebs se frena."*
- **[LAGUNA]** L345 · *"generando un gradiente"*: palabra nueva sin puente. Criterio 3. Propuesta: *"se juntan muchos H⁺ de un lado y pocos del otro, como agua detrás de una represa (piensa en Misicuni). Al volver por la ATP sintasa, mueven una «turbina» que arma ATP."*
- **[LAGUNA]** L349-391 · La figura de la cadena no dibuja lo que dice el texto: no aparecen los NADH entrando, ni los electrones, ni el O₂ que se vuelve H₂O al final. Además el rótulo *"ADP+Pi → ATP"* (x = 580, y = 130) cae encima de las palabras "ATP" y "sintasa" de la caja (centrada en x = 630, y 128-140): probable superposición, no lo vi renderizado. Criterio 6.
- **[LAGUNA]** L291-295 · Figura de Krebs: la caja de acetil-CoA (x 140-240) se mete dentro del círculo (borde izquierdo en x = 230) y la flecha de entrada mide unos 11 px y apunta hacia afuera del ciclo. El alumno no ve "entra acá". Criterio 6.
- **[LAGUNA]** L501-506, L540, L555-561 · *"tilacoides"* y *"estroma"* se nombran sin señalarlos: la figura del cloroplasto dibuja las pilas de discos pero no las rotula. Lo mismo con **NADPH**, que aparece sin puente con el NADH. Criterio 3. Propuesta: rotular *"tilacoides (las pilas de discos)"* y *"estroma (el líquido de alrededor)"*, y agregar *"el NADPH es el primo del NADH que usan las plantas; también es un camión de electrones"*.
- **[LAGUNA]** L631-633 · *"Por eso de noche las plantas consumen O₂"*: las plantas consumen O₂ siempre. Criterio 5. Propuesta: *"De día la fotosíntesis fabrica más O₂ del que la respiración gasta. De noche solo queda la respiración, y la planta consume O₂ sin reponerlo."*

### Forma

- **[FORMA]** L642 · Título *"Toda la energía del ATP viene de glicólisis"* no se entiende ("la energía del ATP"). Mejor: *"Error 3 · 'Casi todo el ATP sale de la glicólisis'"*.
- **[FORMA]** L691 · *"lactato"* en la explicación; la lección dijo *"ácido láctico"* (L255). Usar la misma palabra o avisar que son lo mismo.
- **[FORMA]** L661-704 · Respuestas en los índices 1, 2, 1, 1, 2: nunca en el primer ni en el último botón.

---

## 2. `src/app/aprende/diversidad-seres-vivos/page.tsx` · ARREGLAR ANTES

**Cuentas rehechas:** 8 niveles taxonómicos listados = 8 anunciados. 17 países
megadiversos con ~70% de las especies: correcto. Invertebrados 95% /
vertebrados 5%: correcto (~66.000 vertebrados de ~1,5 millones de animales
descritos). Artrópodos ~85% e insectos ~3 de cada 4: dentro de lo que se cita.
Las figuras de bacterias y de taxonomía (Dominio ancho, Especie angosta) dicen
lo mismo que el texto.

### Errores de contenido

- **[ERROR]** L60 · *"Caballo × Burra = Mula (estéril)"*. Está al revés: la **mula** es hija de **burro × yegua**. Caballo × burra da el **burdégano**, que también es estéril. El ejemplo sirve igual, pero el cruce es un dato que se pregunta. Reemplazo: *"Burro × Yegua = Mula (estéril) → distinta especie."* (El Error 2 de L590-591 está bien porque no dice quién es el padre.)
- **[ERROR]** L126 · *"Nomenclatura binomial (Linneo, 1735)"*. En 1735 Linneo publicó la primera edición de *Systema Naturae*, todavía sin nombres binomiales sistemáticos. La nomenclatura binomial se fija con *Species Plantarum* (**1753**) para plantas y la 10.ª edición de *Systema Naturae* (1758) para animales; la fecha que se enseña es **1753**. Contrastar con la guía UMSS.
- **[ERROR]** L612 · Resumen: *"Bolivia: top 10 megadiverso."* La misma lección dice dos veces (L40, L532) que Bolivia es uno de los **17** megadiversos, y no hay un ranking aceptado que la ponga en un "top 10". Reemplazo: *"Bolivia: uno de los 17 países megadiversos."*
- **[ERROR]** L596-598 · *"Las arqueas viven en ambientes extremos (volcanes, salinas, intestinos)."* El intestino no es un ambiente extremo, así que el ejemplo contradice la frase. Además las arqueas no viven solo en ambientes extremos. Reemplazo: *"Muchas arqueas viven en ambientes extremos (aguas termales, salares como el de Uyuni), pero también hay en el suelo, en el mar y en tu intestino."*

### Datos a verificar

- **[DATO]** L564-565 · El bufeo boliviano (*Inia boliviensis*) como endémico ("solo viven aquí"): su área incluye el tramo brasileño del río Iténez/Guaporé y el alto Madeira. Mejor: *"casi exclusivo de Bolivia"*. Las dos parabas sí son endémicas.
- **[DATO]** L538 · *"Más de 20.000 especies de plantas"*: el Catálogo de plantas vasculares de Bolivia (2014) registra unas 12.000 nativas; el 20.000 aparece en estimaciones que suman no vasculares. Contrastar con la guía.
- **[DATO]** L534-536 · *"Cuatro grandes regiones naturales: Amazonía, Chaco, Andes y Cerrado."* La clasificación de referencia (Ibisch, 2003) tiene 12 ecorregiones, y en el colegio se suele enseñar altiplano / valles / llanos. Falta el Pantanal. Hay que ver qué usa la guía; si se cambia, cambiarlo también en `ecologia-medioambiente`, que dice lo mismo.

### Lagunas

- **[LAGUNA]** L95, L130-131 · La figura pone *"Especie: sapiens"* y la definición dice que la segunda palabra es la *"Especie"*. El alumno aprende que la especie humana se llama "sapiens". Criterio 5. Propuesta: *"La especie se nombra con las dos palabras juntas: Homo sapiens. La segunda palabra sola no alcanza, porque se repite en especies de géneros distintos."*
- **[LAGUNA]** L133 · *"en cursiva o subrayadas"*: no dice cuándo subrayar. Criterio 1. Propuesta: *"A mano no puedes escribir en cursiva, por eso en el cuaderno se subraya."*
- **[LAGUNA]** L176-186 · La aclaración de dominios y reinos es un párrafo largo sin dibujo, justo donde el tema es una jerarquía. Criterio 6. Propuesta: un árbol mínimo, tres cajas (Bacteria, Archaea, Eukarya), debajo de Eukarya las cuatro de Protista, Fungi, Plantae y Animalia, y una llave "Monera" abrazando a las dos primeras.
- **[LAGUNA]** L200-204 · La tabla usa *"Procariota / Eucariota"* antes de la escena de Monera. Criterio 3. Propuesta: en la cabecera, *"Tipo de célula (procariota = sin núcleo; eucariota = con núcleo, Unidad 3)"*.
- **[LAGUNA]** L262 · *"Espirilos… Treponema (sífilis)"*: Treponema es una **espiroqueta**, que la mayoría de los textos separa de los espirilos. Criterio 5 (dato impreciso). Propuesta: ejemplo *Spirillum*, o *"espirilos y espiroquetas (Treponema, sífilis)"*.
- **[LAGUNA]** L338-339 · Chagas *"frecuente en zonas chaqueñas"*: para un alumno de Cochabamba falta lo principal, los valles de Cochabamba, Chuquisaca y Tarija están entre las zonas con más Chagas del país. Criterio 5. Propuesta: *"…(mal de Chagas, que transmite la vinchuca; frecuente en los valles y el Chaco, Cochabamba incluida)"*.
- **[LAGUNA]** L366 · *"cuerpos fructíferos"* sin explicar, y la palabra *esporas* no aparece en toda la escena. Criterio 3. Propuesta: *"cuerpo fructífero: la parte que el hongo saca afuera para soltar sus esporas, como el fruto en una planta."*
- **[LAGUNA]** L460-464 · Dos saltos en un paso: habla de sistema nervioso y concluye sobre moverse. Criterio 2. Propuesta: *"Las esponjas no tienen sistema nervioso y viven pegadas a una roca sin moverse, y aun así son animales porque comen tragando partículas. Por eso lo que define al reino es cómo comen, no si se mueven."*
- **[LAGUNA]** L534-536 · *"Que quepan las cuatro en un mismo país es justamente lo que lo hace megadiverso"*: megadiverso se define por número de especies, no de regiones. Criterio 1. Propuesta: *"Tener regiones tan distintas, desde nevados de 6.000 m hasta llanura tropical, hace que en un mismo país vivan especies muy distintas. Por eso Bolivia tiene tantas, y eso es lo que la hace megadiversa."*
- **[LAGUNA]** L626 · *"las bacterias, peptidoglicano"*: palabra nueva en la explicación de un ejercicio, nunca presentada. Criterio 3. Propuesta: sacarla, o agregar en Monera *"pared de peptidoglicano (ni celulosa ni quitina)"*.

### Forma

- **[FORMA]** L66, L108 · Guion largo en texto del alumno (*"Mendel — Unidad 4"*, *"— Dominio, Reino…"*). Reemplazar por punto o dos puntos.
- **[FORMA]** L108-109 · La mnemotecnia en inglés (*"Did King Phillip…"*) no le sirve a un alumno de Cochabamba; sacarla.
- **[FORMA]** L147 · *"Bacteria E. coli"* abrevia el género antes de presentarlo, contra la regla que la misma escena enseña en L163-165 (*"la primera vez SIEMPRE completo"*). Usar *"Bacteria del intestino"*.
- **[FORMA]** L615-648 · 4 de las 5 `AutoCheck` tienen la respuesta en el tercer botón (índice 2); la otra, en el cuarto. Se aprueba sin leer. Además L605-606: *"unas 3 de cada 4 especies animales conocidas es un insecto"* → *"son insectos"*.

---

## 3. `src/app/aprende/ecologia-medioambiente/page.tsx` · ARREGLAR ANTES

**Cuentas rehechas:** 6 niveles de organización = 6 del resumen. 7 relaciones en
la figura = 7 del resumen. Regla del 10%: 10.000 → 1.000 → 100 da bien *si se
parte de la energía guardada en el productor* (ver error abajo). Las flechas del
ciclo del carbono van en el sentido correcto.

### Errores de contenido

- **[ERROR]** L165 · Competencia: *"leones por presa"*. Leones contra leones es competencia **intraespecífica** (dentro de la misma especie), y la escena se llama *"Relaciones entre especies"* y el resumen (L520) dice *"7 relaciones interespecíficas"*. Reemplazo: *"puma y zorro andino por la vizcacha"* o *"león y hiena por la presa"*.
- **[ERROR]** L198-199 · *"La energía y materia fluyen del SOL hacia los descomponedores."* La materia no viene del Sol, y la misma lección enseña en el Error 2 (L498-501) que la materia se recicla y la energía fluye. Reemplazo: *"La energía entra con el Sol y fluye en un solo sentido hasta perderse como calor. La materia, en cambio, da vueltas: los productores la toman del aire y del suelo, y los descomponedores la devuelven."*
- **[ERROR]** L211 y L198 · *"Consumidor III: cóndor (carroñero)"* después de *"cada eslabón es comido por el siguiente"*. El cóndor no caza al puma: come animales muertos de cualquier nivel (vicuñas incluidas), así que no es el 4.º eslabón de esa cadena. Reemplazo: una cadena real de cuatro niveles (*pasto → saltamontes → sapo → serpiente*), o dejar *pasto → vicuña → puma* y poner al cóndor aparte como carroñero.
- **[ERROR]** L84 · Figura de niveles: el ancho de cada barra es `580 - i * 20`, así que **el individuo es la barra más ancha y la biosfera la más angosta**. La metáfora visual dice lo contrario del texto (*"De a uno a todos"*, *"Cada nivel es un grupo del anterior"*). Hay que invertir los anchos (individuo angosto, biosfera ancha) o dibujar cajas anidadas.
- **[ERROR]** L279 · Pirámide de energía con base *"100% en el sol"*. La base de la pirámide son los productores; el Sol no es un nivel trófico. Reemplazo: *"base: la energía que guardan los productores"*.
- **[ERROR]** L300-303 · *"Las otras dos a veces se INVIERTEN: ej. un solo árbol grande (biomasa grande) con miles de insectos (números grandes)."* El ejemplo invierte solo la de **números** (1 árbol abajo, miles de insectos arriba). La de **biomasa** sigue derecha, porque el árbol pesa más que los insectos, como dice el propio paréntesis. El ejemplo clásico de biomasa invertida es el mar: poco fitoplancton en un momento dado, que se reproduce muy rápido, sostiene más masa de zooplancton. Reemplazo: un ejemplo por pirámide.
- **[ERROR]** L540-543 · *"Si un productor recibe 10.000 kcal del sol, ¿cuántas llegan al consumidor secundario?"* → 100. La regla del 10% va **de un nivel trófico al siguiente**; del Sol al productor no pasa el 10% (una planta guarda alrededor del 1% de la luz que recibe). Si el productor *recibe* 10.000 del Sol, guarda ~100 y al consumidor secundario llega ~1. Reemplazo del enunciado: *"Si los productores guardan 10.000 kcal, ¿cuántas llegan al consumidor secundario?"* (la respuesta 100 queda igual).
- **[ERROR]** L448 · *"Eduardo Avaroa (Potosí): Salar de Uyuni, lagunas altiplánicas."* La Reserva Eduardo Avaroa está en Sud Lípez y **no incluye el Salar de Uyuni**, que queda más al norte. Reemplazo: *"Eduardo Avaroa (Potosí): Laguna Colorada, Laguna Verde, flamencos."*

### Datos a verificar

- **[DATO]** L443 · *"Madidi (La Paz, Beni)"*: hasta donde sé, el Parque Madidi está entero en el norte de La Paz (limita con Beni, no entra). Verificar en SERNAP.
- **[DATO]** L440-441 · *"22 áreas protegidas… que cubren el 17% del territorio"*: con unas 17,2 millones de ha sobre 109,9 millones da ~15,6%. Hay fuentes que redondean a 16 o 17%. Verificar en SERNAP.
- **[DATO]** L479-480 · *"14% de la biodiversidad mundial. Información típica del examen."* El 14% no aparece en ningún otro lugar de las dos lecciones ni tiene fuente, y "típica del examen" es una afirmación que nadie comprobó contra el banco. No publicar sin fuente.
- **[DATO]** L456, L479 · *"4 ecorregiones"*: ver el mismo punto en `diversidad-seres-vivos` (12 según Ibisch 2003). Además la mnemotecnia lo presenta como dato de examen.
- **[DATO]** L399-400 y L491-495 · *"calentamiento global es la CAUSA; cambio climático es la CONSECUENCIA"*. En el uso científico (IPCC) el calentamiento es parte del cambio climático, y la causa son las emisiones de gases de efecto invernadero. Muchos textos escolares lo enseñan como está; ver qué dice la guía antes de tocarlo.

### Lagunas

- **[LAGUNA]** L38-40 · Hook: *"Si desaparecieran las abejas, en pocos años se colapsaría la agricultura."* Exagerado: maíz, trigo y arroz se polinizan con el viento. Criterio 1. Propuesta: *"…perderíamos buena parte de las frutas y verduras que comes, porque dependen de que una abeja lleve el polen de flor en flor."*
- **[LAGUNA]** L122, L128 · *"bact."* y *"T"* por temperatura. Criterio 4. Escribir *"bacterias"* y *"temperatura"*.
- **[LAGUNA]** L160 · *"líquenes"* como ejemplo de mutualismo sin decir qué son. Criterio 3. Propuesta: *"liquen: un hongo y un alga viviendo juntos; el alga fabrica azúcar y el hongo le da agua y refugio."*
- **[LAGUNA]** L234 · *"depredadores top"*: anglicismo, y el "por eso" salta de energía a número de individuos sin decirlo. Criterio 4/2. Propuesta: *"Como arriba llega tan poca energía, alcanza para pocos animales: por eso hay muchos productores y pocos depredadores en la cima."*
- **[LAGUNA]** L276-297 · Las tres pirámides se dibujan **idénticas** y no se muestra ninguna invertida, aunque el Cuidado de abajo habla de ellas. Criterio 6. Propuesta: dibujar al lado una pirámide de números invertida (un árbol, muchos insectos).
- **[LAGUNA]** L347 y L353 · En el ciclo del carbono, la flecha de respiración de las plantas va de (140,130) a (300,85) y la de fotosíntesis de (300,85) a (150,130): **son casi la misma línea** en sentidos opuestos, una encima de la otra, y el rótulo *"Respiración"* está lejos, junto a la flecha de los animales. Criterio 6. Separar las dos flechas y rotular cada una.
- **[LAGUNA]** L340-358 · El ciclo no cierra: nada entra a *"Combustibles fósiles"* (no se dice que son restos de seres vivos de hace millones de años) y no aparecen los descomponedores. Además el texto de esa caja es gris oscuro sobre gris (`#374151` sobre el mismo color al 50%), poco legible. Criterio 5/6. Propuesta: flecha *"restos enterrados (millones de años)"* de plantas y animales a combustibles, y flecha de descomponedores al CO₂.
- **[LAGUNA]** L370-371 · *"CO₂ ↔ fotosíntesis ↔ respiración ↔ combustión"*: la doble flecha entre procesos no significa nada (y la combustión no se revierte). Criterio 4. Propuesta: *"Las plantas sacan CO₂ del aire con la fotosíntesis; la respiración y la combustión lo devuelven."*
- **[LAGUNA]** L372-374 · Ciclo del nitrógeno: de *"muerte"* salta a *"desnitrificación"* sin descomponedores, y *Rhizobium* no está suelto en el suelo sino en las raíces de las leguminosas. Criterio 5. Propuesta: *"…fijación por bacterias (Rhizobium, en las raíces del frejol y la alfalfa) → plantas → animales → muerte → los descomponedores lo devuelven al suelo → otras bacterias lo devuelven al aire como N₂."*
- **[LAGUNA]** L401-402 · *"CFCs"* sin explicar; *"↑"* y *"↓"* como abreviaturas; *"↓ pulmones del planeta"* choca con el Error 3 de la misma lección (L507-508: el mayor productor son las algas, no la Amazonía). Criterio 4/1. Propuesta: *"CFC: gases de aerosoles y refrigeradores viejos"* y *"Deforestación: menos bosque, menos biodiversidad, más CO₂ en el aire"*.
- **[LAGUNA]** L418-423 · Efecto invernadero sin figura, y es el tema que más pide una (Sol → Tierra → calor que rebota en los gases). Criterio 6.
- **[LAGUNA]** L445 · *"ecotonos andino-amazónicos"* sin explicar. Criterio 3. Propuesta: *"donde los Andes se juntan con la Amazonía y se mezclan especies de los dos lados"*.
- **[LAGUNA]** L458-462 · En las 4 ecorregiones **no aparece Cochabamba** (ni los valles ni el Chapare). El alumno al que le habla la app no se encuentra en el mapa. Criterio 5. Propuesta: agregar *"Valles y Yungas: Cochabamba, Chuquisaca, Tarija"* o decir dónde cae Cochabamba.

### Forma

- **[FORMA]** L473 · *"Ley de la Madre Tierra (2010, 2012)"*: dos años sin decir que son dos leyes (Ley 071 de 2010 y Ley 300 de 2012).
- **[FORMA]** L533 · *"¿Qué tipo de relación es la entre garrapata y perro?"* → *"¿Qué relación hay entre la garrapata y el perro?"*
- **[FORMA]** L554 · El ejercicio dice *"bioma"* y la escena llamó a lo mismo *"ecorregión"*. Usar una sola palabra.
- **[FORMA]** L525-558 · Respuestas en los índices 1, 2, 2, 1, 2: nunca en el primero ni en el último botón.
