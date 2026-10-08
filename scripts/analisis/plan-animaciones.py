# Plan de animaciones: que tipos de resolucion animar primero.
#
# Regenerar el informe (desde la raiz del repo):
#   node scripts/analisis/extraer-banco.mjs          # solo si cambio el banco
#   python -I -X utf8 scripts/analisis/plan-animaciones.py
# (OJO: con -I, Python ignora PYTHONIOENCODING; por eso va -X utf8.)
#
# Solo LEE el banco md y el codigo de los generadores. Escribe docs/plan-animaciones.md.
# Todo NUMERO del informe sale de este script. Lo que NO sale de un comando son los juicios
# (facilidad 1-5, recurso visual, cobertura de cada generador): estan en TIPOS, marcados como juicio.
import collections
import os
import re
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", ".."))
sys.path.insert(0, AQUI)
from datos_animaciones import cargar  # noqa: E402

SALIDA = os.path.join(RAIZ, "docs", "plan-animaciones.md")
GENS_DIR = os.path.join(RAIZ, "src", "app", "prueba-animacion")

Q = cargar()
ING = [x for x in Q if x["fac"] == "ingenieria"]
ECO = [x for x in Q if x["fac"] == "economicas"]
ECO_MAT = [x for x in ECO if x["area"] == "matematicas"]
N_ING, N_ECO, N_ECO_MAT = len(ING), len(ECO), len(ECO_MAT)

PERIODOS = [(2005, 2009), (2010, 2014), (2015, 2019), (2020, 2025)]


def periodo(a):
    for i, (x, y) in enumerate(PERIODOS):
        if x <= a <= y:
            return i


ADM = [x for x in ING if x["categoria"] == "admision"]
TOT_ADM = [sum(1 for x in ADM if periodo(x["anio"]) == i) for i in range(4)]


def pct(a, b):
    return f"{100 * a / b:.1f}%" if b else "-"


# ---------------------------------------------------------------- el catalogo de tipos
# JUICIO (no sale de un comando): facilidad 1-5, recurso, cobertura.
# Facilidad:
#   5 = el motor de fusion alcanza tal cual con un generador nuevo (formula/ecuacion, sin figura)
#   4 = motor + un gesto que ya existe (el dato vuela a la formula, unidades que se tachan)
#   3 = motor + un componente SVG nuevo y simple (cuadro, diagrama de fuerzas, tabla)
#   2 = figura geometrica con coordenadas calculadas + construccion
#   1 = 3D, o proceso sin forma comun
# fams: familias de familias.py (las mismas del mapa de temas). cob: cubierto | parcial | no.
T = lambda **k: k  # noqa: E731
TIPOS = [
    T(key="cin", nombre="Cinemática 1D (MRU, MRUV, caída libre, encuentro)", mat="Física", ing=["Cinematica 1D (MRU, MRUV, caida libre, encuentro)"], eco=[], facil=4, cob="no",
      recurso="Motor de fusión + dato que vuela a la fórmula + unidades que se tachan. Un generador por subtipo (MRU, MRUV, caída libre, encuentro). Opcional: tira de posición en SVG.",
      por="Es fórmula, reemplazo y despeje: justo lo que el motor ya hace con la cuadrática. SVG alcanza; no hace falta 3D ni partículas."),
    T(key="est", nombre="Estequiometría (mol, masa, rendimiento, pureza)", mat="Química", ing=["Estequiometria, reactivo limitante y rendimiento"], eco=[], facil=4, cob="no",
      recurso="Cadena de factores de conversión (fracciones con unidades que se tachan en diagonal, ya existe `modo: tachar`). Una fila de fracciones que se arma de izquierda a derecha.",
      por="Es la jugada de la raíz y las fracciones, con unidades en vez de números. SVG alcanza; las partículas serían decoración."),
    T(key="gen", nombre="Genética mendeliana (cruces, probabilidades)", mat="Biología", ing=["Genetica mendeliana y herencia"], eco=[], facil=3, cob="no",
      recurso="Cuadro de Punnett en SVG: los alelos de cada padre bajan a filas y columnas y se funden en cada casilla; después se cuentan casillas. Nuevo componente de tabla.",
      por="El proceso ES un cuadro: se entiende mejor viéndolo armarse que leyéndolo. No requiere 3D."),
    T(key="gas", nombre="Gases ideales y leyes de los gases", mat="Química", ing=["Gases ideales y leyes de los gases"], eco=[], facil=5, cob="no",
      recurso="Motor de fusión: fórmula con piezas con id, los datos vuelan a sus letras (patrón de la cuadrática), °C→K como paso propio. Partículas solo si luego se quiere un animador-conceptos aparte.",
      por="PV=nRT y la ley combinada son una fórmula con letras: calco directo del patrón anotar-y-reemplazar."),
    T(key="sol", nombre="Soluciones, concentraciones y titulación", mat="Química", ing=["Soluciones, concentraciones y titulacion"], eco=[], facil=4, cob="no",
      recurso="Igual que estequiometría: fórmula (M = n/V, N, % en masa) y cadena de factores. Una barra de mezcla en SVG para diluciones es opcional.",
      por="Mismo motor que estequiometría y gases; se reutiliza casi todo."),
    T(key="din", nombre="Dinámica (Newton, poleas, fricción)", mat="Física", ing=["Dinamica: Newton, poleas y friccion"], eco=[], facil=3, cob="no",
      recurso="Diagrama de cuerpo libre en SVG con flechas calculadas (las fuerzas aparecen una por una y se descomponen) + las ecuaciones ΣF = ma con el motor de fusión.",
      por="Hace falta el dibujo para que se entienda de dónde sale cada término de la ecuación. SVG con coordenadas calculadas alcanza."),
    T(key="tiro", nombre="Tiro parabólico y proyectiles", mat="Física", ing=["Tiro parabolico y proyectiles"], eco=[], facil=3, cob="no",
      recurso="SVG: trayectoria con coordenadas calculadas, velocidad que se descompone en vx y vy (triángulo), y las ecuaciones con el motor de fusión.",
      por="La descomposición del vector es el paso que más cuesta y es puro dibujo. SVG alcanza; 3D no aporta."),
    T(key="log", nombre="Logaritmos (propiedades, ecuaciones, cambio de base)", mat="Álgebra", ing=["Logaritmos"], eco=["Logaritmos"], facil=4, cob="parcial",
      recurso="Extender los generadores existentes: ecuación logarítmica → misma base → argumentos iguales → cuadrática (reusa `cuadratica`) → comprobar el dominio. Cambio de base como fracción.",
      por="El motor ya hace la suma de logaritmos; la ecuación se arma encadenando generadores que ya existen."),
    T(key="cuad", nombre="Cuadráticas, Vieta y naturaleza de raíces", mat="Álgebra", ing=["Cuadraticas, Vieta y naturaleza de raices"], eco=["Cuadraticas, Vieta y naturaleza de raices"], facil=4, cob="parcial",
      recurso="Reusar las piezas de `cuadratica` para suma y producto de raíces (−b/a, c/a) y discriminante. Sin recurso nuevo.",
      por="Ya existe la fórmula general animada; Vieta es el mismo cuadro de letras a, b, c con otras fórmulas."),
    T(key="pro", nombre="Progresiones y sucesiones", mat="Álgebra", ing=["Progresiones y sucesiones"], eco=["Progresiones y sucesiones"], facil=5, cob="no",
      recurso="Motor de fusión: aₙ = a₁ + (n−1)d y Sₙ, datos que vuelan a la fórmula, despeje. Tira de términos en SVG opcional.",
      por="Fórmula y reemplazo, sin figura: el caso más barato."),
    T(key="mas", nombre="Masa molar, fórmula molecular y composición", mat="Química", ing=["Masa, formula molecular y composicion"], eco=[], facil=4, cob="no",
      recurso="Tabla de átomos × masa atómica que se suma por filas, y de ahí a mol. Motor de fusión con una pieza por término.",
      por="Es una suma con una pieza por átomo; el motor la hace sin problema."),
    T(key="id", nombre="Identidades trigonométricas", mat="Trigonometría", ing=["Identidades trigonometricas"], eco=[], facil=3, cob="no",
      recurso="Motor de fusión por reescritura (sen²+cos²→1, tan→sen/cos), una sustitución por paso. Sin figura. Hace falta un catálogo de identidades.",
      por="Es reemplazar una pieza por otra equivalente; SVG alcanza, pero la variedad de identidades es grande (la facilidad baja a 3)."),
    T(key="red", nombre="Redox y balanceo", mat="Química", ing=["Redox y balanceo"], eco=[], facil=3, cob="no",
      recurso="Contador de átomos por lado en SVG (fichas por elemento) que se iguala moviendo coeficientes; semirreacciones con electrones como fichas para redox.",
      por="Balancear es contar y comparar: se ve mejor con fichas que con texto. SVG alcanza; no hace falta simulación de partículas."),
    T(key="cap", nombre="Capacitores y electrostática", mat="Física", ing=["Capacitores y electrostatica"], eco=[], facil=3, cob="no",
      recurso="Fórmula con el motor (C = Q/V, Coulomb) y, para serie/paralelo, diagrama SVG del circuito que se reduce.",
      por="Mitad fórmula, mitad esquema de circuito; SVG alcanza."),
    T(key="atom", nombre="Estructura atómica y números cuánticos", mat="Química", ing=["Estructura atomica y numeros cuanticos"], eco=[], facil=3, cob="no",
      recurso="Diagrama de configuración electrónica (diagonal de Aufbau) que se llena casilla a casilla; flechitas de espín en SVG.",
      por="Es un llenado ordenado: la animación lo explica mucho mejor que una lista. SVG alcanza."),
    T(key="etrig", nombre="Ecuaciones trigonométricas", mat="Trigonometría", ing=["Ecuaciones trigonometricas"], eco=[], facil=3, cob="no",
      recurso="Motor de fusión + círculo unitario en SVG para ubicar las soluciones en cada cuadrante.",
      por="El círculo explica por qué hay dos soluciones; SVG con coordenadas calculadas alcanza."),
    T(key="circ", nombre="Circunferencia (ángulos, tangentes, cuerdas)", mat="Geometría", ing=["Circunferencia: angulos, tangentes, cuerdas"], eco=[], facil=2, cob="no",
      recurso="Figura SVG con coordenadas calculadas (regla 7 de la bitácora) y construcción que resalta cada ángulo o segmento; la cuenta, con el motor.",
      por="Depende de la figura; cada problema pide una distinta. Es caro por pregunta, no por tipo."),
    T(key="pol", nombre="Polígonos y cuadriláteros", mat="Geometría", ing=["Poligonos y cuadrilateros"], eco=[], facil=2, cob="no",
      recurso="Igual que circunferencia: figura calculada + construcción + cuenta.", por="Mismo costo por figura."),
    T(key="tri", nombre="Triángulos (líneas notables, semejanza)", mat="Geometría", ing=["Triangulos (lineas notables, semejanza)"], eco=[], facil=2, cob="no",
      recurso="Igual: figura calculada + construcción. La semejanza se ve bien con un triángulo que se superpone al otro.", por="Mismo costo por figura."),
    T(key="seg", nombre="Segmentos y ángulos (rectas, paralelas)", mat="Geometría", ing=["Segmentos y angulos (rectas, paralelas)"], eco=[], facil=2, cob="no",
      recurso="Figura calculada + cuenta; los segmentos colineales se resuelven con una recta numérica en SVG (barata).",
      por="La recta numérica es fácil; los ángulos entre paralelas piden figura."),
    # ---- tipos que aparecen sobre todo por Económicas (y Álgebra de Ingeniería)
    T(key="plan", nombre="Planteo de ecuaciones (edades, móviles, mezclas, trabajo)", mat="Álgebra", ing=["Problemas de moviles, edades y planteo"], eco=["Problemas de moviles, edades y planteo"], facil=3, cob="parcial",
      recurso="Gesto nuevo: subrayar frases del enunciado y que cada una vuele a su término de la ecuación (texto → ecuación). Después se resuelve con `ecuacionLineal` (ya existe). Tabla de edades en SVG para edades.",
      por="Lo difícil no es resolver (eso ya está animado) sino plantear; el gesto de traducir texto es lo único nuevo."),
    T(key="sis", nombre="Sistemas de ecuaciones", mat="Álgebra", ing=["Sistemas de ecuaciones"], eco=["Sistemas de ecuaciones"], facil=4, cob="no",
      recurso="Motor de fusión: sustitución y reducción (sumar ecuaciones, una variable se cancela con `tachar`). Reusa el generador lineal para el último despeje.",
      por="Es reescritura de ecuaciones: lo que el motor hace bien."),
    T(key="ops", nombre="Operaciones, exponentes y aritmética básica", mat="Álgebra", ing=["Operaciones, exponentes y aritmetica basica"], eco=["Operaciones, exponentes y aritmetica basica"], facil=5, cob="parcial",
      recurso="Extender `potenciaProducto`/`raizGeneral`: cociente de potencias, exponente negativo y fraccionario, operaciones combinadas. Sin recurso nuevo.",
      por="Es la misma familia de generadores que ya está aprobada."),
    T(key="fun", nombre="Funciones (dominio, gráfica, inversa)", mat="Álgebra", ing=["Funciones (dominio, grafica, inversa)"], eco=["Funciones (dominio, grafica, inversa)"], facil=2, cob="no",
      recurso="Ejes en SVG con la curva calculada, más el motor para despejar la inversa. Ya hay `Ejes` en las lecciones.",
      por="Gráficas con coordenadas exactas: SVG alcanza, pero cada función es un dibujo."),
    T(key="fal", nombre="Fracciones algebraicas y ecuaciones racionales", mat="Álgebra", ing=["Fracciones algebraicas y ecuaciones racionales"], eco=["Fracciones algebraicas y ecuaciones racionales"], facil=4, cob="parcial",
      recurso="Factorizar y tachar factores iguales arriba y abajo (`modo: tachar` + `frPiezas`, ya existen). Suma de fracciones numéricas ya está.",
      por="Son las piezas de `fracciones` y `diferenciaCuadrados` combinadas."),
    T(key="rad", nombre="Ecuaciones irracionales y radicales", mat="Álgebra", ing=["Ecuaciones irracionales y radicales"], eco=["Ecuaciones irracionales y radicales"], facil=4, cob="parcial",
      recurso="Aislar la raíz, elevar al cuadrado, resolver y COMPROBAR cada solución (raíz extraña). Reusa `raizGeneral` y `cuadratica`.",
      por="Los generadores de raíz ya existen; falta encadenarlos y la comprobación."),
    T(key="r3", nombre="Regla de tres, reparto y proporcionalidad", mat="Aritmética", ing=["Regla de tres, reparto y proporcionalidad"], eco=["Regla de tres, reparto y proporcionalidad"], facil=5, cob="no",
      recurso="Tabla de dos filas con flechas en cruz (producto cruzado) y para el reparto una barra dividida en partes. Motor de fusión para la cuenta.",
      por="Es una proporción: dos fracciones iguales; el motor la resuelve con el mismo despeje de `ecuacionLineal`."),
]
POR_KEY = {t["key"]: t for t in TIPOS}


def cuenta(t, fac):
    fams = t["ing"] if fac == "ing" else t["eco"]
    base = ING if fac == "ing" else ECO_MAT
    return [x for x in base if x["familia"] in fams]


for t in TIPOS:
    t["qi"], t["qe"] = cuenta(t, "ing"), cuenta(t, "eco")
    t["ni"], t["ne"] = len(t["qi"]), len(t["qe"])
    t["n"] = t["ni"] + t["ne"]
    t["impacto"] = t["n"] * t["facil"]


def tendencia(qs):
    """Solo con admision y n>=30. Compara el peso (% de las preguntas de admision de cada periodo) de 2005-14 contra 2015-25."""
    adm = [x for x in qs if x["categoria"] == "admision"]
    if len(adm) < 30:
        return "muestra chica", [sum(1 for x in adm if periodo(x["anio"]) == i) for i in range(4)]
    cnt = [sum(1 for x in adm if periodo(x["anio"]) == i) for i in range(4)]
    a = (cnt[0] + cnt[1]) / (TOT_ADM[0] + TOT_ADM[1])
    b = (cnt[2] + cnt[3]) / (TOT_ADM[2] + TOT_ADM[3])
    r = b / a if a else 99
    return ("sube" if r >= 1.5 else "baja" if r <= 0.67 else "estable"), cnt


def tab(cab, filas):
    s = "| " + " | ".join(cab) + " |\n|" + "|".join("---" for _ in cab) + "|\n"
    for f in filas:
        s += "| " + " | ".join(str(c) for c in f) + " |\n"
    return s


def conpaso(qs):
    return sum(1 for x in qs if x["pasos"] >= 2)


def conexpl(qs):
    return sum(1 for x in qs if x["expl_len"] >= 200)


def config(qs):
    return sum(1 for x in qs if x["figura"])


# ---------------------------------------------------------------- 1. frecuencia
# Ingenieria: las 20 familias con mas preguntas que tienen proceso de calculo (se saltan las conceptuales de Biologia y Estrategias)
CONCEPTUALES = {
    "Clasificacion, taxonomia y reinos", "Ecologia (ecosistema, cadenas troficas, biomas)", "Biomoleculas (proteinas, lipidos, carbohidratos, agua)",
    "Biodiversidad y conservacion", "Acidos nucleicos (ADN, ARN)", "Celula, organelos y division celular", "Contaminacion y problemas ambientales",
    "Metabolismo (fotosintesis, respiracion, Krebs)", "Evolucion y origen de la vida", "Niveles de organizacion y definicion de biologia",
    "Reproduccion, histologia y salud", "Estrategias y tecnicas de estudio (todo junto)", "Enlaces y estructura de Lewis",
}
fam_ing = collections.Counter(x["familia"] for x in ING if x["familia"] and x["familia"] not in CONCEPTUALES)
top_ing = fam_ing.most_common(20)
nombre_de = {f: t for t in TIPOS for f in t["ing"]}
nombre_de_eco = {f: t for t in TIPOS for f in t["eco"]}
filas = []
for i, (f, n) in enumerate(top_ing, 1):
    t = nombre_de.get(f)
    qs = [x for x in ING if x["familia"] == f]
    tend, cnt = tendencia(qs)
    filas.append([i, t["nombre"] if t else f, t["mat"] if t else "", n, pct(n, N_ING),
                  *[f"{c} ({pct(c, TOT_ADM[k])})" for k, c in enumerate(cnt)], tend, pct(conpaso(qs), n), pct(config(qs), n)])
TEND = collections.defaultdict(list)
for f, n in top_ing:
    tp = nombre_de.get(f)
    TEND[tendencia([x for x in ING if x["familia"] == f])[0]].append(tp["nombre"].split(" (")[0] if tp else f)
tabla_ing = tab(["#", "Tipo", "Materia", "Preguntas", "% de Ingeniería", "Adm. 2005-09", "Adm. 2010-14", "Adm. 2015-19", "Adm. 2020-25", "Tendencia", "Con «Paso N»", "Con figura"], filas)
fam_ing_resto = [f for f, n in fam_ing.most_common(26)[20:]]
nxt = [(f, n) for f, n in fam_ing.most_common(26)[20:]]

fam_eco = collections.Counter(x["familia"] for x in ECO_MAT if x["familia"])
filas = []
for i, (f, n) in enumerate(fam_eco.most_common(15), 1):
    t = nombre_de_eco.get(f)
    qs = [x for x in ECO_MAT if x["familia"] == f]
    anios = collections.Counter(x["anio"] for x in qs)
    filas.append([i, t["nombre"] if t else f, n, pct(n, N_ECO_MAT), ", ".join(f"{a}: {c}" for a, c in sorted(anios.items())), pct(conexpl(qs), n), pct(conpaso(qs), n)])
tabla_eco = tab(["#", "Tipo", "Preguntas", "% de Matemáticas de Económicas", "Por gestión", "Con explicación (≥200 car.)", "Con «Paso N»"], filas)

# ---------------------------------------------------------------- 2. cobertura por generadores
GENS = [
    ("`ecuacionLineal`", "ecuación de primer grado `ax + b = c`", r"^ecuacion(es)?-(lineal|lineales|de-primer-grado)"),
    ("`fracciones`", "suma y resta de dos fracciones numéricas", r"^fracciones$|operaciones-combinadas-fracciones|suma-de-fracciones"),
    ("`potenciaProducto`", "producto de potencias de igual base (`aᵐ·aⁿ`)", r"teoria-de-exponentes|leyes-de-exponentes|^exponentes$"),
    ("`raizGeneral`, `raizConFactor`", "raíz de una potencia y raíz con resto (`√12 = 2√3`)", r"^radicales$|simplificacion-(de-)?radicales|radicales-simplificacion|radicales-potencias"),
    ("`sumaLogaritmos`, `sumaLogaritmosPropiedad`", "suma de logaritmos de igual base (producto)", r"^logaritmos$|propiedades-logaritmos|logaritmos-propiedades|suma-de-logaritmos"),
    ("`diferenciaCuadrados`", "`x² − k²` y la ecuación `x² − k² = 0`", r"diferencia-de-cuadrados|diferencia-cuadrados"),
    ("`cuadratica`", "`ax² + bx + c = 0` por fórmula general", r"^raices-ecuacion-cuadratica$|ecuacion-de-segundo-grado|^ecuaciones?-cuadraticas?$"),
]
filas = []
tot_forma = [0, 0]
for nom, forma, rx in GENS:
    ci = sum(1 for x in ING if re.search(rx, x["tema"]))
    ce = sum(1 for x in ECO_MAT if re.search(rx, x["tema"]))
    tot_forma[0] += ci
    tot_forma[1] += ce
    filas.append([nom, forma, ci, ce])
tabla_gen = tab(["Generador", "Qué enseña", "Preguntas de Ingeniería con etiqueta de esa forma", "Preguntas de Económicas (Mat.)"], filas)

# funciones exportadas y tarjetas (para contrastar con el pedido)
exportadas = set()
for f in os.listdir(GENS_DIR):
    if f.startswith("generadores") and f.endswith(".ts") and ".test." not in f:
        src = open(os.path.join(GENS_DIR, f), encoding="utf-8").read()
        exportadas |= set(re.findall(r"^export function ((?!validar)\w+)\(", src, re.M)) - {"exponenteDe"}
gen_src = open(os.path.join(GENS_DIR, "Generador.tsx"), encoding="utf-8").read()
tarjetas = re.findall(r'<Generador tipo="(\w+)"', open(os.path.join(GENS_DIR, "page.tsx"), encoding="utf-8").read())

# anomalias de etiquetas utiles para el plan
exp_fuera = [x for x in ING if re.search(r"exponente|potenciacion", x["tema"]) and x["familia"] != "Operaciones, exponentes y aritmetica basica"]
num_en_sistemas = [x for x in Q if x["familia"] == "Sistemas de ecuaciones" and re.search(r"numeracion", x["tema"])]
area_mal = [x for x in ING if x["area"] == "matematicas"]
sin_fam = [x for x in Q if x["familia"] is None and x["area"] != "estrategias_aprendizaje"]
solidos = [x for x in ING if re.search(r"prisma|cilindro|esfera|(^|-)cono(-|$)|poliedro|solido|(^|-)cubo(-|$)", x["tema"])]
sol_f = collections.Counter(x["familia"] for x in solidos)

# ---------------------------------------------------------------- 4. ranking
rank = sorted(TIPOS, key=lambda t: -t["impacto"])
filas = []
for i, t in enumerate(rank, 1):
    filas.append([i, t["nombre"], t["ni"], t["ne"], t["n"], t["facil"], t["impacto"], {"no": "hueco", "parcial": "parcial"}.get(t["cob"], t["cob"])])
tabla_rank = tab(["#", "Tipo", "Ing.", "Econ.", "Total", "Facilidad (juicio)", "Impacto = total × facilidad", "Generador existente"], filas)
rank_eco = sorted([t for t in TIPOS if t["ne"] > 0], key=lambda t: -(t["ne"] * t["facil"]))
tabla_rank_eco = tab(["#", "Tipo", "Preguntas Econ.", "Facilidad", "Impacto", "Generador existente"],
                     [[i, t["nombre"], t["ne"], t["facil"], t["ne"] * t["facil"], {"no": "hueco", "parcial": "parcial"}[t["cob"]]] for i, t in enumerate(rank_eco, 1)])

# ---------------------------------------------------------------- 5. piloto
n_E = sum(1 for x in Q if x["respuesta"] == "E")
n_ning = sum(1 for x in Q if x["respuesta"] == "E" and re.match(r"(?i)ning", x["opcionE"]))
PILOTO = [
    ("umss-ingenieria-2018-examen-de-ingreso-1-2018-3ra-opcion-014", "gas",
     "Ley de Charles: hay que pasar °C a K y notar que 1,0 atm = 760 torr (la presión no cambia). Es el calco de la cuadrática: la fórmula con letras, cada dato vuela a su lugar.",
     "Que el patrón anotar-y-reemplazar sirve en Química sin tocar el motor, y que «presión constante» se puede mostrar tachando P₁ = P₂."),
    ("umss-ingenieria-2024-examen-de-ingreso-1-2024-1ra-opcion-016", "est",
     "Moles de átomos de O en 30 g de glucosa: masa molar → moles → átomos. Cadena de factores de conversión con unidades que se tachan.",
     "Que `modo: tachar` alcanza para unidades; ese es el único gesto nuevo de estequiometría."),
    ("umss-ingenieria-2024-examen-de-ingreso-1-2024-1ra-opcion-010", "cin",
     "MRUV: dos ecuaciones con v₀ = 5a, se reemplaza y se despeja, más verificación. Reusa el despeje de `ecuacionLineal`.",
     "Que Física entra con el mismo motor y que se pueden encadenar dos fórmulas con un reemplazo."),
    ("umss-ingenieria-2023-examen-de-ingreso-1-2023-3ra-opcion-019", "gen",
     "Dihíbrido CcDd × CcDd, probabilidad de CCDD = 1/4 × 1/4. Dos cuadros de Punnett 2×2 y el producto de fracciones.",
     "El experimento honesto del piloto: es el único que exige un componente nuevo (cuadro). Dice si SVG alcanza para un diagrama no algebraico."),
    ("umss-economicas-2011-examen-de-admision-1-2011-1ra-opcion-009", "log",
     "`log₃(4x+5) = log₃ x²` → argumentos iguales → `x² − 4x − 5 = 0` (la cuadrática ya animada) → comprobar el dominio de los DOS valores. La explicación trae una trampa pedagógica (no descartar −1).",
     "Que se pueden encadenar generadores que ya existen, y que Económicas entra al piloto. Ojo: su explicación está en prosa (0 «Paso N»); hay que reescribirla antes (estado `falta-resolucion`)."),
]
IDX = {x["id"]: x for x in Q}
filas = []
for pid, key, desc, prueba in PILOTO:
    x = IDX.get(pid)
    if x is None:
        raise SystemExit(f"ID de piloto inexistente: {pid}")
    if x["figura"] or (x["fac"] == "ingenieria" and x["pasos"] < 3) or x["respuesta"] == "E":
        raise SystemExit(f"El piloto no cumple sus propios criterios: {pid}")
    filas.append([f"`{pid}`", {"ingenieria": "Ing.", "economicas": "Econ."}[x["fac"]], x["anio"], x["categoria"], x["respuesta"], x["pasos"], desc, prueba])
tabla_piloto = tab(["Id", "Fac.", "Año", "Examen", "Resp.", "«Paso N»", "Qué se anima", "Qué prueba"], filas)

# ---------------------------------------------------------------- numeros sueltos para la prosa
top5 = rank[:5]
sin_gen = [t for t in TIPOS if t["cob"] == "no"]
par_gen = [t for t in TIPOS if t["cob"] == "parcial"]
n_pool = sum(t["n"] for t in TIPOS)
n_sin = sum(t["n"] for t in sin_gen)
n_par = sum(t["n"] for t in par_gen)
paso_ing = pct(conpaso(ING), N_ING)
paso_eco = pct(conpaso(ECO_MAT), N_ECO_MAT)
expl_eco = pct(conexpl(ECO_MAT), N_ECO_MAT)
fig_ing = config(ING)
top5_n = sum(t["n"] for t in top5)
geom = [POR_KEY[k] for k in ("circ", "pol", "tri", "seg")]
geom_n = sum(t["n"] for t in geom)
geom_fig = sum(config(t["qi"]) for t in geom)
nxt_txt = ", ".join(f"{f} ({n})" for f, n in nxt)

# ---------------------------------------------------------------- el documento
D = []
w = D.append
w(f"""# Plan de animaciones: qué tipos de resolución animar primero

> Generado por `scripts/analisis/plan-animaciones.py` (lee el banco en `data/examenes/umss/` y reusa las familias de `scripts/analisis/familias.py`, las mismas del `docs/mapa-de-temas.md`). Regenerar: `python -I -X utf8 scripts/analisis/plan-animaciones.py` (con `-I` hay que poner `-X utf8`; ver lecciones). No modifica banco ni código. **Todo número sale de ese script.** Lo que NO sale de un comando son los **juicios** (facilidad 1 a 5, recurso visual, cobertura de cada generador): están marcados como juicio y viven en la lista `TIPOS` del script, para que Ronald los discuta y se cambien en un solo lugar.

## 0. Qué se midió y qué no

- **Universo:** {len(Q)} preguntas de Ingeniería ({N_ING}) y Económicas ({N_ECO}) en 149 exámenes. **Medicina queda afuera**: es un solo examen con otro formato (afirmaciones y clave de combinación), no sirve para medir tipos (98 etiquetas distintas, ninguna repetida, según el mapa de temas).
- **Facultad, no carrera.** El banco solo distingue `facultad` (ingenieria, economicas); no hay etiqueta de carrera. Todo se corta por facultad.
- **Económicas:** solo cuento **Matemáticas** ({N_ECO_MAT} preguntas). Lenguaje e Historia ({N_ECO - N_ECO_MAT}) no tienen cálculo que animar con este motor, y sus secciones están incompletas (`secciones_pendientes`). Las Matemáticas de Económicas están **completas** en todos los exámenes (lo pendiente es solo Lenguaje e Historia); una sola pregunta del banco figura como faltante (2011-2op, la 7).
- **Ingeniería mezcla** exámenes de admisión y parciales del Curso Básico (2006-2011, 2013-2014 y 2024-2025). Para ver la **evolución por gestión uso solo admisión**, porque los parciales están concentrados en 2006-2011 y inflarían el primer periodo. Los periodos son 2005-09, 2010-14, 2015-19 y 2020-25; admisión tiene {TOT_ADM[0]}, {TOT_ADM[1]}, {TOT_ADM[2]} y {TOT_ADM[3]} preguntas en cada uno.
- **Tipo = familia** del mapa de temas (agrupación por palabras clave sobre el `tema`; es una aproximación, ver el mapa). Una familia puede esconder subtipos con animaciones distintas (en Cinemática, MRU y encuentro no se animan igual).
- **Tendencia:** solo se habla de subida o caída si el tipo tiene **30 o más** preguntas de admisión, y se compara el peso de 2005-14 contra 2015-25 (sube si multiplica por 1.5 o más, baja si queda en 2/3 o menos). Con menos, la tabla dice «muestra chica» y no se interpreta. En Económicas no hay serie: son 5 gestiones (2011 a 2014 y 2023) y 3 a 14 preguntas por tipo.

## 1. Los tipos de problema con proceso que más caen

### Ingeniería: los 20 con más preguntas (se saltaron las familias conceptuales de Biología y Estrategias, que no tienen cálculo)

{tabla_ing}
«Con Paso N» es el porcentaje de preguntas cuya explicación trae pasos numerados (`Paso 1 ·`...): son las que se pueden animar sin reescribir. «Con figura» es el porcentaje con figura en el enunciado. Los siguientes en la lista, ya fuera del corte: {nxt_txt}.

**Qué dice la evolución (solo admisión, ver la regla en la sección 0):** sube: {", ".join(TEND["sube"]) or "ninguno"}. Baja: {", ".join(TEND["baja"]) or "ninguno"}. Estable: {len(TEND["estable"])} tipos. Muestra chica (menos de 30 preguntas de admisión, no se interpreta): {", ".join(TEND["muestra chica"]) or "ninguno"}. Los que figuran como «sube» o «baja» lo hacen por poco margen (el corte es 1.5 veces o 2/3) y con periodos desparejos: sirven para desempatar, no para decidir. Lo que sí es claro: entre los {sum(len(v) for k, v in TEND.items() if k != 'muestra chica')} tipos con muestra suficiente, ninguno tiene un periodo en cero ({'verificado' if all(min(tendencia([x for x in ING if x['familia'] == f])[1]) > 0 for f, _ in top_ing if tendencia([x for x in ING if x['familia'] == f])[0] != 'muestra chica') else 'ojo, alguno tiene un periodo en cero'}).

### Económicas: tipos de Matemáticas (los 15 con más preguntas)

{tabla_eco}
Ojo: en Económicas **solo {paso_eco} de las preguntas de Matemáticas tiene «Paso N»**, pero {expl_eco} tiene una explicación de 200 caracteres o más. Es decir: están explicadas, en prosa con fórmulas en bloque, pero no en el formato que el animador espera. Antes de animar Económicas hay que reescribirlas a «Paso N» (el animador las clasifica como `falta-resolucion`).

## 2. Qué cubre hoy cada generador

Hay **{len(exportadas)} funciones generadoras** exportadas ({", ".join(sorted(exportadas))}) y **{len(tarjetas)} tarjetas** en `/prueba-animacion` ({", ".join(tarjetas)}). Sirven de patrón, pero **todos son de Álgebra**: no hay ni un solo generador de Física, Química, Biología ni Geometría.

{tabla_gen}
Esa columna es una **cota por etiqueta**, no una medición de cuántas preguntas se animarían: el generador enseña un movimiento (sumar logaritmos, resolver `ax²+bx+c`) y la mayoría de las preguntas del banco piden otra cosa (ecuaciones logarítmicas, Vieta, simplificar expresiones largas). Hay {tot_forma[0]} preguntas de Ingeniería y {tot_forma[1]} de Económicas con una etiqueta que nombra directamente la forma de algún generador, de {N_ING} y {N_ECO_MAT}.

Cobertura por tipo (juicio): de los {len(TIPOS)} tipos del análisis, **{len(sin_gen)} no tienen ningún generador** ({n_sin} preguntas) y **{len(par_gen)} están cubiertos a medias** ({n_par} preguntas): {", ".join(t["nombre"] for t in par_gen)}. Ninguno está cubierto del todo. Total de preguntas en estos tipos: {n_pool} (una pregunta cuenta una vez; Logaritmos, Progresiones y otros que aparecen en las dos facultades suman ambas).

## 3. Recurso visual para lo que falta

Respuesta corta y honesta (con una salvedad: **no probé ninguna de estas animaciones**; que SVG alcance es una evaluación de diseño, y la de Punnett y diagrama de fuerzas es una hipótesis que el piloto tiene que confirmar): **el SVG con el motor de fusión alcanza para los {len(TIPOS)} tipos.** No encontré ninguno que pida 3D, y las partículas no resuelven nada que la fórmula o el cuadro no resuelvan mejor. Lo que cambia es cuánto trabajo es cada uno:

- **Motor de fusión tal cual** (fórmula, reemplazo, despeje, unidades): gases, progresiones, cinemática, estequiometría, soluciones, masa molar, sistemas, regla de tres. Es el patrón de la cuadrática (`dato vuela a la fórmula`) y de la raíz (`tachar`). Ya probado y aprobado en lo visual.
- **Motor + un componente SVG chico**: cuadro de Punnett (genética), diagrama de cuerpo libre (dinámica), trayectoria con vx/vy (tiro), contador de átomos (balanceo), diagonal de Aufbau (estructura atómica), círculo unitario (ecuaciones trigonométricas). Cada uno es un componente nuevo que sirve para toda su familia.
- **Figura con coordenadas calculadas** (geometría plana): circunferencia, triángulos, polígonos y segmentos suman {geom_n} preguntas y {geom_fig} tienen figura en el enunciado. Se puede, pero el costo es por figura, no por tipo; no la pondría entre las primeras.
- **3D:** el banco no lo pide. Busqué `tema` con prisma, cilindro, esfera, cono, poliedro, sólido o cubo en Ingeniería: {len(solidos)} preguntas de {N_ING} ({pct(len(solidos), N_ING)}), repartidas en {len(sol_f)} familias ({", ".join(f"{(f or 'sin familia').split(' (')[0]}: {n}" for f, n in sol_f.most_common())}), y ninguna es geometría del espacio como tema propio: el sólido es el escenario de una densidad, un gas o un movimiento circular. No hay motivo para 3D hoy.
- **Partículas:** servirían para **explicar** (gases, soluciones, genética), pero eso es `animador-conceptos`, no resolución. No las necesita ningún tipo del ranking para resolver el ejercicio.

Detalle por tipo (recurso y por qué; la facilidad es un juicio):

{tab(["Tipo", "Materia", "Facilidad (1-5)", "Recurso visual", "Por qué"], [[t["nombre"], t["mat"], t["facil"], t["recurso"], t["por"]] for t in TIPOS])}
Escala de facilidad: 5 = el motor alcanza con un generador nuevo; 4 = motor + gesto que ya existe; 3 = motor + componente SVG chico; 2 = figura con coordenadas calculadas; 1 = 3D o proceso sin forma común.

## 4. Ranking: qué animar primero

Impacto = preguntas del tipo (Ingeniería + Económicas) × facilidad. Es una **heurística**: el número de preguntas es medido, la facilidad es mi juicio. Si Ronald cambia una facilidad, el ranking se recalcula con el script.

{tabla_rank}
**Económicas por separado** (el ranking de arriba lo domina Ingeniería porque tiene 20 veces más preguntas):

{tabla_rank_eco}
Lectura: los {len(top5)} primeros del ranking general ({", ".join(t["nombre"].split(" (")[0] for t in top5)}) suman {top5_n} preguntas. Los tres primeros son Física y Química por fórmula y unidades, sin figura: ahí el motor ya sabe hacer casi todo. Para Económicas, el ranking pone primero {", ".join(t["nombre"].split(" (")[0] for t in rank_eco[:4])}. Exponentes, Logaritmos y Radicales son **extensiones de generadores ya aprobados**: se hacen casi sin recurso nuevo.

**Orden de construcción que propongo (juicio, no medición):** (1) Gases, porque es de los más baratos (facilidad 5) y confirma que el patrón de la cuadrática sirve en Química; (2) Estequiometría, Soluciones y Masa molar, que comparten la cadena de factores con unidades que se tachan (suman {sum(POR_KEY[k]["ni"] for k in ("est", "sol", "mas"))} preguntas con un solo recurso); (3) Cinemática; (4) Genética con el cuadro de Punnett, que decide si vale la pena un componente nuevo; (5) extensiones de lo ya hecho en Álgebra (Logaritmos, Progresiones, Cuadráticas).

## 5. Piloto: 5 preguntas reales

Elegidas por tres criterios: explicación con pasos numerados (menos la de Económicas), sin figura, y que la respuesta no sea la E (en el banco, {n_E} de {len(Q)} preguntas tienen E como respuesta, {pct(n_E, len(Q))}, y {n_ning} de ellas son «Ninguno»; así la animación termina en una opción concreta). Cubren cuatro materias y los tres niveles de esfuerzo (motor tal cual, motor + gesto, componente nuevo).

{tabla_piloto}
Orden sugerido: gases y estequiometría primero (más baratas, confirman el patrón en Química), luego cinemática, luego Punnett (decide si el cuadro justifica un componente), y al final la de Económicas (necesita reescribir la explicación primero).

## 6. Inconsistencias de datos encontradas

- **Generadores:** el pedido hablaba de 9 generadores y listaba 8 nombres. En el código hay {len(exportadas)} funciones exportadas y {len(tarjetas)} tarjetas; la diferencia es que `sumaLogaritmos` llama por dentro a `sumaLogaritmosPropiedad` (`generadores-algebra.ts`, cuando los números no son potencias de la base), así que esa función no tiene tarjeta propia.
- **`area` mal puesta:** {len(area_mal)} preguntas de Ingeniería tienen `area: matematicas`, que no es un área del examen de Ingeniería (las áreas son aritmética-álgebra y geometría-trigonometría). No entran en ninguna tabla; el mapa de temas tampoco las cuenta.
- **Exponentes subestimados en Ingeniería:** la familia «Operaciones, exponentes y aritmética básica» tiene solo {len(POR_KEY['ops']['qi'])} preguntas en Ingeniería porque la regla de palabras manda a otras familias las que dicen «exponente» o «potenciación» en el tema. Hay {len(exp_fuera)} preguntas de Ingeniería con esa palabra en el `tema` fuera de esa familia. El número real de preguntas de exponentes es mayor al de la tabla.
- **`sistemas-de-numeracion` cae en «Sistemas de ecuaciones»:** {len(num_en_sistemas)} pregunta(s) ({", ".join(sorted({x['tema'] for x in num_en_sistemas}))}) por coincidir la palabra «sistema». Inflan por poco ese tipo (el mapa de temas tiene el mismo defecto).
- **Preguntas sin familia** (fuera de Estrategias): {len(sin_fam)}, de las cuales {len(area_mal)} son las del `area` mal puesta; el resto no lo reconocen las reglas de palabras. No cambian el ranking.
- **Formato de explicación:** Ingeniería usa «Paso N ·» ({paso_ing} de sus preguntas); Económicas Matemáticas casi nunca ({paso_eco}). Esto condiciona qué se puede animar ya.
- **Explicaciones con química en texto plano:** `C₆H₁₂O₆`, `30/180` en vez de fracción con raya. El animador tendrá que pasarlas a LaTeX (`\\\\dfrac`), y la regla del proyecto es que la división se muestra como fracción.
""")
w(f"""
## 7. Lecciones nuevas

- 2026-10-08 · ERROR · `python -I` ignora `PYTHONIOENCODING`, así que un script que imprimía `₂` murió con `UnicodeEncodeError` (cp1252) aunque la variable estaba puesta. · Con `-I` usar `-X utf8`; mejor aún, escribir a archivo y leerlo con Read.
- 2026-10-08 · ERROR (evitado) · El primer borrador del informe traía frases de lectura escritas antes de ver los datos («ningún tipo sube o baja», «la novena función es…»). · Las frases que interpretan una tabla se generan desde los datos o se escriben después de correr el script, y se comprueban contra el código (la novena función resultó ser una llamada interna, no una tarjeta).
- 2026-10-08 · ERROR · Una regex de `tema` pensada para «geometría del espacio» (volumen, cono, esfera) traía ruido: «volumen» está en gases, «cono» y «esfera» en palabras sueltas, «pirámide» en ecología. · Antes de citar un conteo de regex, listar los `tema` que casan y leerlos.
- 2026-10-08 · ACIERTO · Medir el formato de la explicación por familia (¿trae «Paso N ·»?) cambió el plan: Ingeniería casi siempre sí; Económicas Matemáticas casi nunca, aunque estén explicadas en prosa. · Antes de elegir qué animar, medir si la fuente está en el formato que el animador acepta; si no, el costo real incluye reescribir.
- 2026-10-08 · ACIERTO · Filtrar candidatos de piloto por `respuesta != E` (la respuesta E es una pregunta de cada trece; ver el conteo en la sección 5) evita animar un ejercicio que termina en «ninguna opción sirve», que desorienta en una demostración. · Para piloto, preferir preguntas cuya respuesta sea una opción concreta.
- 2026-10-08 · SUERTE · Que los 5 tipos del tope del ranking sean Física y Química depende de mis facilidades (juicio) y de que Ingeniería tiene 20 veces más preguntas que Económicas; con otra facilidad para Genética o Dinámica el orden cambia. · No presentar el ranking como medición: los números son medidos, las facilidades son discutibles y viven en `TIPOS` para cambiarlas en un solo lugar.
""")
open(SALIDA, "w", encoding="utf-8").write("\n".join(D))
print("ok", SALIDA, len(Q), file=sys.stderr)
