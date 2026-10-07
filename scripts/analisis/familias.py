# Reglas para agrupar los `tema` crudos del banco en familias.
# El orden importa: gana la primera regla que coincide.
# Son reglas de palabras clave sobre el texto del tema (kebab), NO una decision
# pedagogica: se revisan a mano (ver docs/mapa-de-temas.md).
import re


def R(*pairs):
    return [(n, re.compile(p)) for n, p in pairs]


ARIT = R(
    ("Factorizacion y productos notables", r"cocientes?-notable|productos?-notable"),
    ("Funciones (dominio, grafica, inversa)", r"cociente-incremental|diferencia-cociente|asintota|restriccion-dominio|composicion-funciones|funciones-interseccion|optimizacion|extremos"),
    ("Regla de tres, reparto y proporcionalidad", r"regla-(de-)?tres|razones-proporciones|reparto"),
    ("Divisores, MCD, MCM y numeracion", r"mcd|mcm|minimo-comun"),
    ("Inecuaciones y desigualdades", r"inecuacion|desigualdad"),
    ("Teorema del resto y division de polinomios", r"teorema-del-resto|resto|ruffini|horner|residuo|division-(de-)?polinom|polinomios?-division|cociente|dividendo|divisibilidad-polinom"),
    ("Binomio de Newton", r"newton|binomio-de"),
    ("Logaritmos", r"logarit"),
    ("Ecuaciones exponenciales", r"exponencial"),
    ("Progresiones y sucesiones", r"progres|sucesion|serie-"),
    ("Ecuaciones irracionales y radicales", r"irracional|racionaliz|radical|raices-extra"),
    ("Cuadraticas, Vieta y naturaleza de raices", r"cuadratic|vieta|discriminante|raices|cubic|segundo-grado|ecuaciones-de-grado|ecuacion-de-grado|bicuadrad"),
    ("Fracciones algebraicas y ecuaciones racionales", r"fraccion|racional|simplificacion|literal|despeje"),
    ("Sistemas de ecuaciones", r"sistema|3x3|2x2|lineales|sustitucion|reemplazo"),
    ("Inecuaciones y desigualdades", r"inecuacion|desigualdad|intervalo|valor-absoluto"),
    ("Factorizacion y productos notables", r"factoriz|notable|producto-de-binomios|cuadrado-perfecto|binomios|identidad|cubos|diferencia-de-cuadrados"),
    ("Polinomios (grado, coeficientes, raices)", r"polinom|grado|coeficiente"),
    ("Funciones (dominio, grafica, inversa)", r"funcion|dominio|inversa|asintota|parabola|grafica|optimizacion|maximo|minimo"),
    ("Divisores, MCD, MCM y numeracion", r"divisor|mcd|mcm|multiplo|primos|numeracion|cifras|digitos|base-\d|numero|conteo|consecutivos|pares|descomposicion"),
    ("Porcentajes, interes, mezclas y costos", r"porcentaj|interes|mezcla|costo|ganancia|descuento|tasa|ingreso|precio|aleacion|proporcion"),
    ("Regla de tres, reparto y proporcionalidad", r"regla|reparto|proporcional|razon|variacion"),
    ("Problemas de trabajo, grifos y obreros", r"trabajo|obrero|grifo|tuberia|llenado|rendimiento|vaciado"),
    ("Problemas de moviles, edades y planteo", r"edad|movil|velocidad|encuentro|tiempo|distancia|planteo|problema|monedas|viveres|area|perimetro|rectangulo|ecuaci|ingenio|aplicad"),
    ("Operaciones, exponentes y aritmetica basica", r"potenc|exponente|aritmetic|operacion|fraccionaria|enteros|combinad|periodico|conjunto|euclid|verdader|definicion"),
)
GEOM = R(
    ("Ley de senos y cosenos", r"ley-de-(senos|cosenos)|reloj-ley|rumbos-ley"),
    ("Angulos doble, mitad, suma y producto (trigonometria)", r"suma-a-producto|producto-a-suma"),
    ("Identidades trigonometricas", r"identidad|simplificacion-trig|demostracion"),
    ("Ecuaciones trigonometricas", r"ecuaciones?-trigonom|trigonometrica-ecu|ecuacion-trig|soluciones"),
    ("Reduccion al primer cuadrante y angulos notables", r"reduccion|cuadrante|notables|signos"),
    ("Angulos doble, mitad, suma y producto (trigonometria)", r"doble|suma-de-angulos-trig|producto-a-suma|mitad|suma-y-producto|transformacion"),
    ("Razones trigonometricas y triangulo rectangulo", r"razones?-trigonom|trigonom|seno|coseno|cotangente|torre|sombra|elevacion|visual"),
    ("Ley de senos y cosenos", r"ley-de|senos|cosenos"),
    ("Funciones trigonometricas (grafica, inversas)", r"funcion|inversa|periodo|grafica|amplitud"),
    ("Circunferencia: angulos, tangentes, cuerdas", r"circunferencia|inscrito|tangente|secante|cuerda|arco|circulo|circunscrit|inscrit|central|sector|tangentes"),
    ("Poligonos y cuadrilateros", r"poligono|cuadrilatero|trapecio|rombo|hexagono|pentagono|cuadrado|diagonal|regular|paralelogramo"),
    ("Triangulos (lineas notables, semejanza)", r"triangulo|altura|mediana|bisectriz|ortocentro|baricentro|mediatriz|semejan|isosceles|equilatero|heron|pitagoras|hipotenusa|congruen|teorema"),
    ("Segmentos y angulos (rectas, paralelas)", r"segmento|colineal|angulo|paralela|perpendicular|complement|suplement|recta-y|puntos?-medio"),
    ("Geometria analitica (recta, circunferencia, parabola)", r"analitica|recta|ecuacion|punto|coordenada|parabola|distancia|pendiente|elipse|hiperbola|vector"),
    ("Areas y perimetros", r"area|perimetro|region|sombread|figura"),
)
FIS = R(
    ("Capacitores y electrostatica", r"capacitor|capacitancia|coulomb|electrostatic|campo-electric|carga|potencial-electric|corriente-electric"),
    ("Circuitos y resistencias (corriente continua)", r"resistencia|circuito|ohm|amperimetro|efecto-joule|energia-electrica|electricidad|calor-disipado"),
    ("Impulso y choques", r"choque|impulso|colision|momento-lineal|momentum|restitucion"),
    ("Tiro parabolico y proyectiles", r"tiro|parabolic|proyectil|lanzamiento|alcance|blanco"),
    ("Movimiento circular", r"circular|angular|rizo|loop|curva|ventilador|peralte"),
    ("Cinematica 1D (MRU, MRUV, caida libre, encuentro)", r"cinematic|mru|velocidad|caida|vertical|libre|encuentro|persecucion|movil|aceleracion|rapidez|desaceleracion|frenado|distancia|posicion|desplazamiento|tren|globo|pozo|eco|movimiento|tiempo|tunel|puente|horizontal|detencion|alto"),
    ("Dinamica: Newton, poleas y friccion", r"friccion|rozamiento|dinamica|newton|polea|atwood|inclinado|plano|tension|bloque|ascensor|fuerza|normal|cuerda|masa|contacto|segunda-ley|ley-de"),
    ("Estatica y equilibrio", r"estatica|equilibrio|torque|momento-de-fuerza|palanca"),
    ("Trabajo, energia y potencia", r"energia|trabajo|potencia|resorte|elastic|conservacion|joule|cinetica|maquina|elevador|disipada"),
    ("Impulso y choques", r"choque|impulso|colision|momento-lineal|inelastic|cantidad-de-movimiento"),
    ("Capacitores y electrostatica", r"capacitor|coulomb|electrostatic|campo|carga|potencial|electric|puntuales"),
    ("Circuitos y resistencias (corriente continua)", r"resistencia|circuito|ohm|serie|paralelo|corriente|equivalente"),
    ("Ondas, sonido, calor y otros", r"onda|sonido|pendulo|calor|termic|dilatacion|presion|fluido|hidrostatic|optica|lente|espejo|luz"),
    ("Vectores y analisis dimensional", r"vector|dimensional|analisis|suma|producto"),
)
QUI = R(
    ("Redox y balanceo", r"redox|balanceo"),
    ("Estequiometria, reactivo limitante y rendimiento", r"estequi"),
    ("Estructura atomica y numeros cuanticos", r"fotoelectrico|fotones|engranajes"),
    ("Propiedades coligativas", r"coligativ|crioscop|ebulloscop|raoult|descenso|ascenso|osmotica"),
    ("Gases ideales y leyes de los gases", r"gas|boyle|charles|graham|difusion|presion|dalton|ideal|humedo"),
    ("Soluciones, concentraciones y titulacion", r"soluci|molar|normal|molalidad|dilucion|concentracion|soluto|titulacion|neutraliz|acido|base|ph|osmot"),
    ("Redox y balanceo", r"redox|balanceo|oxidacion|oxidante|reductor|ion-electron(-|$)|electroquim"),
    ("Estequiometria, reactivo limitante y rendimiento", r"estequi|limitante|rendimiento|pureza|combustion|reaccion|coeficientes|reactivo|hidrato|mol-|moles|mol$|mineral"),
    ("Masa, formula molecular y composicion", r"formula|masa|composicion|empirica|molecular|porcentual|peso|abundancia|avogadro|molar|mezcla|conteo|atomos|moleculas"),
    ("Estructura atomica y numeros cuanticos", r"cuantic|configuracion|electron|isotop|atomic|neutron|proton|onda|longitud|frecuencia|electromagnet|numero-atomico"),
    ("Enlaces y estructura de Lewis", r"enlace|lewis|covalente|ionico|octeto|polaridad|coordinado"),
    ("Densidad, temperatura y calorimetria", r"densidad|temperatura|escala|termometric|calor|calorimetria|entalpia|hess|termoquimica|picnometro|especifico"),
    ("Organica, nomenclatura y otros", r"organica|nomenclatura|proteina|carbohidrato|hidrocarburo|alcano|funcion"),
)
BIO = R(
    ("Genetica mendeliana y herencia", r"genetic|mendel|herencia|dominancia|codominancia|monohibrid|dihibrid|fenotipo|genotipo|cruz|probabilidad|alelo|recesiv|letal|gen$|genes|cromosoma"),
    ("Acidos nucleicos (ADN, ARN)", r"adn|arn|nucleic|nucleotid|nitrogenada|pirimidin|purin|gen-definicion|replicacion|transcripcion|traduccion|codon"),
    ("Biomoleculas (proteinas, lipidos, carbohidratos, agua)", r"proteina|lipido|carbohidrato|biomolecula|aminoacido|polisacarido|monosacarido|colageno|bioelemento|enzima|agua|glucido|sacarido|vitamina|sales"),
    ("Clasificacion, taxonomia y reinos", r"taxonom|clasificacion|reino|binomial|nomenclatura|fungi|plantae|monera|animalia|protista|protozoario|angiosperma|gimnosperma|vertebrado|invertebrado|artropodo|categoria|especie|filo|virus|dominio"),
    ("Biodiversidad y conservacion", r"biodiversidad|amenaza|servicios|bienes|conservacion|endemic|extincion|areas-protegidas|bolivia|ecorregion"),
    ("Contaminacion y problemas ambientales", r"contaminacion|efecto-invernadero|gases-efecto|ambiental|erosion|calentamiento|deforestacion|residuos|impacto|cambio-climatico|lluvia-acida|ozono|desarrollo-sostenible|causas"),
    ("Ecologia (ecosistema, cadenas troficas, biomas)", r"ecolog|ecosistema|trofic[oa]s?|biocenosis|biotopo|comensalismo|cadena|bioma|nicho|poblacion|comunidad|factores|abiotic|biotic|interaccion|simbiosis|parasitismo|depredacion|biomasa|piramide|productores|descomponedores|climax|sucesion|flujo|ciclo-(del|de)|habitat"),
    ("Celula, organelos y division celular", r"celul|organelo|membrana|transporte-activo|cariotipo|mitosis|meiosis|eucarionte|procarionte|nucleo|mitocondria|ciclo-celular|citoplasma|cromatina|ribosoma"),
    ("Metabolismo (fotosintesis, respiracion, Krebs)", r"fosforilacion|reservas-energeticas|fotosintesis|respiracion|krebs|metabolismo|catabolismo|anabolismo|glucolisis|fermentacion|atp|energia|nutricion|autotrofo|heterotrofo"),
    ("Evolucion y origen de la vida", r"evolucion|origen|darwin|lamarck|especiacion|teoria|seleccion"),
    ("Reproduccion, histologia y salud", r"reproduccion|histolog|enfermedad|chagas|diabetes|tejido"),
    ("Niveles de organizacion y definicion de biologia", r"nivel|organizacion|jerarquia|definicion|concepto|caracteristicas|ramas|propiedades|biologia|seres-vivos|metodo"),
)
EST = R(("Estrategias y tecnicas de estudio (todo junto)", r"."),)
HIST = R(
    ("Historia de Bolivia", r"bolivia|chuquisaca|1825|1809|1830|santa-cruz|charana|republiquet|independencia|campero|pacifico|atacama|goma|plata|mineria|chaco|1952|1951|udp|mamertazo|cob|lechin|karachipampa|maritima|restauracion|decreto|despojo|elecciones"),
    ("Historia universal", r"."),
)
LEN = R(
    ("Semantica y definicion", r"semantic|definicion|concepto|sinonimia|campo"),
    ("Oracion, sintaxis y funciones", r"oracion|sintac|sujeto|complemento|objeto|sintagma|circunstancial|subordinacion|compuesta|funcion"),
    ("Tiempos verbales y verbos", r"verbal|tiempo|subjuntivo|perfecto|condicional|presente|formas|personales"),
    ("Ortografia y puntuacion", r"ortograf|puntuacion"),
)
REGLAS = {
    ("ingenieria", "aritmetica_algebra"): ARIT,
    ("ingenieria", "geometria_trigonometria"): GEOM,
    ("ingenieria", "fisica"): FIS,
    ("ingenieria", "quimica"): QUI,
    ("ingenieria", "biologia"): BIO,
    ("ingenieria", "estrategias_aprendizaje"): EST,
    ("economicas", "matematicas"): ARIT,
    ("economicas", "historia"): HIST,
    ("economicas", "lenguaje"): LEN,
}
SUFIJO = re.compile(r"-(\dop)(-\d)?-\d{4}(-version-?b)?$|-\d{4}$", re.I)


def limpiar(t):
    t = SUFIJO.sub("", t)
    t = re.sub(r"-(ii|iii|iv|v|\d)$", "", t)  # sufijos de numeracion
    return t


def familia(fac, area, tema):
    t = limpiar(tema)
    claves = [(fac, area)]
    if area == "matematicas" and fac == "ingenieria":
        claves = [("ingenieria", "geometria_trigonometria"), ("ingenieria", "aritmetica_algebra")]
    for k in claves:
        for nombre, rx in REGLAS.get(k, []):
            if rx.search(t):
                return nombre
    return None
