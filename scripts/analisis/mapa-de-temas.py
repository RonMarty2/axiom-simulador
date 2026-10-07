# Mapa de temas del banco de examenes cruzado con lecciones y laminas.
#
# Regenerar el informe (desde la raiz del repo):
#   node scripts/analisis/extraer-banco.mjs
#   PYTHONIOENCODING=utf-8 python scripts/analisis/mapa-de-temas.py
#
# Solo LEE el banco, las lecciones y las laminas. Escribe docs/mapa-de-temas.md.
# Todo numero del informe sale de este script. Las "familias" de temas salen de
# reglas de palabras clave (familias.py): son una aproximacion, no una verdad.
import json, os, re, sys, collections, itertools, unicodedata

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", ".."))
sys.path.insert(0, AQUI)
from familias import familia, limpiar  # noqa: E402

SALIDA = os.path.join(RAIZ, "docs", "mapa-de-temas.md")
datos = json.load(open(os.path.join(AQUI, "banco-extraido.json"), encoding="utf-8"))
EX = datos["examenes"]

# ---------------------------------------------------------------- utilidades
ACENTOS = {
    "Teorema del resto y division de polinomios": "Teorema del resto y división de polinomios",
    "Factorizacion y productos notables": "Factorización y productos notables",
    "Cuadraticas, Vieta y naturaleza de raices": "Cuadráticas, Vieta y naturaleza de raíces",
    "Funciones (dominio, grafica, inversa)": "Funciones (dominio, gráfica, inversa)",
    "Divisores, MCD, MCM y numeracion": "Divisores, MCD, MCM y numeración",
    "Porcentajes, interes, mezclas y costos": "Porcentajes, interés, mezclas y costos",
    "Problemas de moviles, edades y planteo": "Problemas de móviles, edades y planteo",
    "Operaciones, exponentes y aritmetica basica": "Operaciones, exponentes y aritmética básica",
    "Identidades trigonometricas": "Identidades trigonométricas",
    "Ecuaciones trigonometricas": "Ecuaciones trigonométricas",
    "Reduccion al primer cuadrante y angulos notables": "Reducción al primer cuadrante y ángulos notables",
    "Angulos doble, mitad, suma y producto (trigonometria)": "Ángulos doble, mitad, suma y producto (trigonometría)",
    "Razones trigonometricas y triangulo rectangulo": "Razones trigonométricas y triángulo rectángulo",
    "Funciones trigonometricas (grafica, inversas)": "Funciones trigonométricas (gráfica, inversas)",
    "Circunferencia: angulos, tangentes, cuerdas": "Circunferencia: ángulos, tangentes, cuerdas",
    "Poligonos y cuadrilateros": "Polígonos y cuadriláteros",
    "Triangulos (lineas notables, semejanza)": "Triángulos (líneas notables, semejanza)",
    "Segmentos y angulos (rectas, paralelas)": "Segmentos y ángulos (rectas, paralelas)",
    "Geometria analitica (recta, circunferencia, parabola)": "Geometría analítica (recta, circunferencia, parábola)",
    "Areas y perimetros": "Áreas y perímetros",
    "Tiro parabolico y proyectiles": "Tiro parabólico y proyectiles",
    "Cinematica 1D (MRU, MRUV, caida libre, encuentro)": "Cinemática 1D (MRU, MRUV, caída libre, encuentro)",
    "Dinamica: Newton, poleas y friccion": "Dinámica: Newton, poleas y fricción",
    "Estatica y equilibrio": "Estática y equilibrio",
    "Trabajo, energia y potencia": "Trabajo, energía y potencia",
    "Vectores y analisis dimensional": "Vectores y análisis dimensional",
    "Estequiometria, reactivo limitante y rendimiento": "Estequiometría, reactivo limitante y rendimiento",
    "Masa, formula molecular y composicion": "Masa, fórmula molecular y composición",
    "Estructura atomica y numeros cuanticos": "Estructura atómica y números cuánticos",
    "Densidad, temperatura y calorimetria": "Densidad, temperatura y calorimetría",
    "Organica, nomenclatura y otros": "Orgánica, nomenclatura y otros",
    "Genetica mendeliana y herencia": "Genética mendeliana y herencia",
    "Acidos nucleicos (ADN, ARN)": "Ácidos nucleicos (ADN, ARN)",
    "Biomoleculas (proteinas, lipidos, carbohidratos, agua)": "Biomoléculas (proteínas, lípidos, carbohidratos, agua)",
    "Clasificacion, taxonomia y reinos": "Clasificación, taxonomía y reinos",
    "Biodiversidad y conservacion": "Biodiversidad y conservación",
    "Contaminacion y problemas ambientales": "Contaminación y problemas ambientales",
    "Ecologia (ecosistema, cadenas troficas, biomas)": "Ecología (ecosistema, cadenas tróficas, biomas)",
    "Celula, organelos y division celular": "Célula, organelos y división celular",
    "Metabolismo (fotosintesis, respiracion, Krebs)": "Metabolismo (fotosíntesis, respiración, Krebs)",
    "Evolucion y origen de la vida": "Evolución y origen de la vida",
    "Reproduccion, histologia y salud": "Reproducción, histología y salud",
    "Niveles de organizacion y definicion de biologia": "Niveles de organización y definición de biología",
    "Estrategias y tecnicas de estudio (todo junto)": "Estrategias y técnicas de estudio (todo junto)",
    "Semantica y definicion": "Semántica y definición",
    "Oracion, sintaxis y funciones": "Oración, sintaxis y funciones",
    "Ortografia y puntuacion": "Ortografía y puntuación",
    "Soluciones, concentraciones y titulacion": "Soluciones, concentraciones y titulación",
    "Capacitores y electrostatica": "Capacitores y electrostática",
}
A = lambda n: ACENTOS.get(n, n)
SIN_FAMILIA = "(sin agrupar)"
MATERIA = {
    "aritmetica_algebra": "Aritmética-Álgebra", "geometria_trigonometria": "Geometría-Trigonometría",
    "fisica": "Física", "quimica": "Química", "biologia": "Biología",
    "estrategias_aprendizaje": "Estrategias de aprendizaje", "matematicas": "Matemáticas",
    "historia": "Historia", "lenguaje": "Lenguaje",
    "morfofuncion": "Morfofunción", "biologia_celular": "Biología Celular",
}
FACULTAD = {"ingenieria": "Ingeniería", "economicas": "Económicas", "medicina": "Medicina"}
pct = lambda a, b: (f"{100*a/b:.1f}%" if b else "-")


def tabla(cab, filas):
    s = "| " + " | ".join(cab) + " |\n|" + "|".join("---" for _ in cab) + "|\n"
    for f in filas:
        s += "| " + " | ".join(str(x) for x in f) + " |\n"
    return s


# ---------------------------------------------------------------- aplanar
P = []  # una fila por pregunta
for e in EX:
    for p in e["preguntas"]:
        P.append(dict(fac=e["facultad"], ex=e["archivo"], anio=e["anio"], cat=e["categoria"], id=p["id"], n=p["n"],
                      area=p["area"], tema=p["tema"], afirm=p["tiene_afirmaciones"]))
for p in P:
    p["fam"] = familia(p["fac"], p["area"], p["tema"]) if p["fac"] != "medicina" else None
    if p["fac"] != "medicina" and p["fam"] is None:
        p["fam"] = SIN_FAMILIA
FACS = ["ingenieria", "economicas", "medicina"]
por_fac = {f: [p for p in P if p["fac"] == f] for f in FACS}
ex_fac = {f: [e for e in EX if e["facultad"] == f] for f in FACS}

# ---------------------------------------------------------------- lecciones y laminas en disco
APP = os.path.join(RAIZ, "src", "app")
lecciones_disco = {}
ad = os.path.join(APP, "aprende")
for d in sorted(os.listdir(ad)):
    pg = os.path.join(ad, d, "page.tsx")
    if os.path.isdir(os.path.join(ad, d)) and not d.startswith("_") and os.path.exists(pg):
        lecciones_disco[d] = open(pg, encoding="utf-8").read()
laminas_disco = {}
ld = os.path.join(APP, "laminas")
for m in sorted(os.listdir(ld)):
    if m.startswith("_") or m.startswith("[") or not os.path.isdir(os.path.join(ld, m)):
        continue
    for l in sorted(os.listdir(os.path.join(ld, m))):
        pg = os.path.join(ld, m, l, "page.tsx")
        if os.path.exists(pg):
            laminas_disco[(m, l)] = open(pg, encoding="utf-8").read()

# catalogo "Aprende": que slugs ve cada facultad
cat = open(os.path.join(RAIZ, "src", "lib", "axiom", "catalogo-aprende.ts"), encoding="utf-8").read()
partes = re.split(r"\nconst (\w+)\b", cat)
bloque_slugs = {}
bloque_unidades = {}
for i in range(1, len(partes), 2):
    nombre, cuerpo = partes[i], partes[i + 1]
    bloque_slugs[nombre] = set(re.findall(r'slug:\s*"([^"]+)"', cuerpo))
    bloque_unidades[nombre] = re.findall(r"unidades:\s*(\w+)", cuerpo)
catalogo = {}
for fac, bl in (("economicas", "BLOQUES_ECONOMICAS"), ("ingenieria", "BLOQUES_INGENIERIA")):
    s = set()
    for u in bloque_unidades.get(bl, []):
        s |= bloque_slugs.get(u, set())
    catalogo[fac] = s
catalogo["medicina"] = set()
slugs_en_catalogo = catalogo["economicas"] | catalogo["ingenieria"]

# catalogo de laminas
lam_ts = open(os.path.join(RAIZ, "src", "lib", "axiom", "laminas.ts"), encoding="utf-8").read()
lam_catalogo = {}  # (modulo, lamina) -> publicada
mod_actual = None
for linea in lam_ts.splitlines():
    m = re.match(r'\s{8}slug:\s*"([^"]+)",', linea)
    if m:
        mod_actual = m.group(1)
    m = re.search(r'\{\s*slug:\s*"([^"]+)",\s*titulo:.*publicada:\s*(true|false)', linea)
    if m and mod_actual:
        lam_catalogo[(mod_actual, m.group(1))] = (m.group(2) == "true")
lam_facultades = re.findall(r'facultad:\s*"(\w+)"', lam_ts)

# ---------------------------------------------------------------- mapa familia -> contenido
# lecc: lecciones que tocan el tema. ded: la leccion esta dedicada al tema (no es una unidad general).
# faltan: terminos que, si NO aparecen en el texto de esas lecciones, bajan el estado a "a medias".
# lam: modulos de laminas (o (modulo, [laminas])). facil: 3 facil de ensenar, 2 medio, 1 dificil.
# Este mapa es JUICIO del analista, revisado leyendo los titulos de escenas de cada leccion.
RX_CIRC = r"\bperalte|\bp[eé]ndulo c[oó]nico|\brizo\b|\bloop\b"
MAPA = {
    # --- Aritmetica-Algebra (laminas solo existen para Ingenieria)
    "Teorema del resto y division de polinomios": dict(lecc=[], lam=["teorema-del-resto"], facil=3),
    "Binomio de Newton": dict(lecc=[], lam=["binomio-de-newton"], facil=3),
    "Logaritmos": dict(lecc=["logaritmacion"], ded=True, lam=[("logaritmos-y-exponenciales", None)], facil=3),
    "Ecuaciones exponenciales": dict(lecc=["teoria-exponentes"], ded=False, faltan=[r"exponencial"], lam=[("logaritmos-y-exponenciales", ["ecuaciones-exponenciales"])], facil=3),
    "Progresiones y sucesiones": dict(lecc=["sucesiones-series"], ded=True, lam=["progresiones"], facil=3),
    "Ecuaciones irracionales y radicales": dict(lecc=["radicacion", "operaciones-radicales"], ded=False, faltan=[r"irracional|extra[ñn]a"], lam=["ecuaciones-irracionales", "exponentes-y-radicales"], facil=3),
    "Cuadraticas, Vieta y naturaleza de raices": dict(lecc=["ecuaciones-segundo-grado"], ded=True, faltan=[r"vieta", r"discriminante"], lam=["cuadraticas-y-vieta"], facil=3),
    "Fracciones algebraicas y ecuaciones racionales": dict(lecc=["expresiones-algebraicas"], ded=False, faltan=[r"fracci[oó]n|racional"], lam=["ecuaciones-racionales", "funciones-racionales"], facil=3),
    "Sistemas de ecuaciones": dict(lecc=["sistemas-lineales"], ded=True, lam=["sistemas-de-ecuaciones"], facil=3),
    "Inecuaciones y desigualdades": dict(lecc=["desigualdades"], ded=True, lam=["inecuaciones"], facil=3),
    "Factorizacion y productos notables": dict(lecc=["factorizacion"], ded=True, lam=["factorizacion-productos-notables"], facil=3),
    "Polinomios (grado, coeficientes, raices)": dict(lecc=["expresiones-algebraicas"], ded=False, faltan=[r"grado"], lam=["polinomios-grado"], facil=3),
    "Funciones (dominio, grafica, inversa)": dict(lecc=["funcion-lineal-cuadratica", "dominio-rango"], ded=True, faltan=[r"inversa"], lam=["funciones-cuadraticas-optimizacion"], facil=2),
    "Divisores, MCD, MCM y numeracion": dict(lecc=["mcd-mcm"], ded=True, lam=["divisores-mcd-mcm", "problemas-de-cifras"], facil=3),
    "Porcentajes, interes, mezclas y costos": dict(lecc=["regla-de-tres"], ded=False, faltan=[r"porcentaj", r"mezcla"], lam=["porcentajes-mezclas-interes"], facil=3),
    "Regla de tres, reparto y proporcionalidad": dict(lecc=["regla-de-tres", "repartos-proporcionales", "razones-proporciones"], ded=True, lam=["regla-de-tres-y-reparto"], facil=3),
    "Problemas de trabajo, grifos y obreros": dict(lecc=[], lam=["trabajo-combinado"], facil=3),
    "Problemas de moviles, edades y planteo": dict(lecc=["ecuaciones-primer-grado"], ded=False, faltan=[r"edad", r"planteo"], tema_rx=r"planteo|edad", lam=["problemas-de-moviles", "problemas-de-edades", "planteo-verbal-general"], facil=3),
    "Operaciones, exponentes y aritmetica basica": dict(lecc=["operaciones-fundamentales", "potenciacion", "teoria-exponentes"], ded=True, lam=["exponentes-y-radicales"], facil=3),
    # --- Geometria-Trigonometria
    "Identidades trigonometricas": dict(lecc=["identidades-trigonometricas"], ded=True, facil=3),
    "Ecuaciones trigonometricas": dict(lecc=["identidades-trigonometricas"], ded=True, faltan=[r"ecuaciones trigonom"], facil=3),
    "Reduccion al primer cuadrante y angulos notables": dict(lecc=["razones-trigonometricas", "identidades-trigonometricas"], ded=False, faltan=[r"reducci[oó]n", r"primer cuadrante"], tema_rx=r"reduccion|cuadrante", facil=3),
    "Angulos doble, mitad, suma y producto (trigonometria)": dict(lecc=["identidades-trigonometricas"], ded=True, faltan=[r"[aá]ngulo doble", r"suma y diferencia"], facil=3),
    "Razones trigonometricas y triangulo rectangulo": dict(lecc=["razones-trigonometricas"], ded=True, facil=3),
    "Ley de senos y cosenos": dict(lecc=["ley-senos-cosenos"], ded=True, facil=3),
    "Funciones trigonometricas (grafica, inversas)": dict(lecc=[], facil=2),
    "Circunferencia: angulos, tangentes, cuerdas": dict(lecc=["circunferencia"], ded=True, facil=3),
    "Poligonos y cuadrilateros": dict(lecc=["poligonos-cuadrilateros"], ded=True, facil=3),
    "Triangulos (lineas notables, semejanza)": dict(lecc=["triangulos", "congruencia-semejanza"], ded=True, facil=3),
    "Segmentos y angulos (rectas, paralelas)": dict(lecc=["segmentos-angulos"], ded=True, facil=3),
    "Geometria analitica (recta, circunferencia, parabola)": dict(lecc=["ecuacion-recta", "circunferencia-parabola-analitica"], ded=True, facil=3),
    "Areas y perimetros": dict(lecc=["poligonos-cuadrilateros", "triangulos"], ded=False, faltan=[r"[aá]rea"], facil=3),
    # --- Fisica
    "Cinematica 1D (MRU, MRUV, caida libre, encuentro)": dict(lecc=["cinematica-1d"], ded=True, faltan=[r"encuentro"], facil=3),
    "Dinamica: Newton, poleas y friccion": dict(lecc=["dinamica-newton"], ded=True, faltan=[r"polea|atwood", r"fricci[oó]n"], facil=3),
    "Tiro parabolico y proyectiles": dict(lecc=["cinematica-2d"], ded=True, facil=3),
    "Movimiento circular": dict(lecc=["cinematica-2d"], ded=True, faltan=[RX_CIRC], etiquetas={RX_CIRC: "dinámica del movimiento circular: rizo, peralte, péndulo cónico"}, tema_rx=r"(dinamica|friccion|vertical|rizo|centripeta|critica).*circular|circular.*(dinamica|friccion|vertical|rizo|critica)|rizo|centripeta|loop|peralte", facil=3),
    "Capacitores y electrostatica": dict(lecc=["electrostatica"], ded=True, facil=3),
    "Circuitos y resistencias (corriente continua)": dict(lecc=["circuitos-dc"], ded=True, facil=3),
    "Trabajo, energia y potencia": dict(lecc=["trabajo-energia"], ded=True, facil=3),
    "Impulso y choques": dict(lecc=[], facil=3),
    "Estatica y equilibrio": dict(lecc=[], facil=2),
    "Vectores y analisis dimensional": dict(lecc=["vectores-fisica", "nociones-quimica"], ded=True, facil=3),
    "Ondas, sonido, calor y otros": dict(lecc=[], facil=1),
    # --- Quimica
    "Estequiometria, reactivo limitante y rendimiento": dict(lecc=["estequiometria", "reacciones-balanceo"], ded=True, facil=3),
    "Soluciones, concentraciones y titulacion": dict(lecc=["soluciones"], ded=True, faltan=[r"normalidad", r"titulaci[oó]n"], tema_rx=r"normalidad|normal|titulaci|neutraliz", facil=3),
    "Gases ideales y leyes de los gases": dict(lecc=["gases-ideales"], ded=True, facil=3),
    "Redox y balanceo": dict(lecc=["reacciones-balanceo"], ded=True, facil=3),
    "Masa, formula molecular y composicion": dict(lecc=["leyes-fundamentales-quimica"], ded=True, facil=3),
    "Estructura atomica y numeros cuanticos": dict(lecc=["estructura-atomica"], ded=True, faltan=[r"longitud de onda|fot[oó]n|electromagn"], etiquetas={r"longitud de onda|fot[oó]n|electromagn": "ondas electromagnéticas, longitud de onda, fotones"}, tema_rx=r"onda|frecuencia|electromagn|foto", facil=3),
    "Densidad, temperatura y calorimetria": dict(lecc=["nociones-quimica"], ded=True, faltan=[r"calorimetr|calor espec[ií]fico"], etiquetas={r"calorimetr|calor espec[ií]fico": "calorimetría, calor específico"}, tema_rx=r"calorimetr|calor", facil=3),
    "Propiedades coligativas": dict(lecc=["propiedades-coligativas"], ded=True, facil=3),
    "Enlaces y estructura de Lewis": dict(lecc=["enlace-quimico"], ded=True, facil=3),
    "Organica, nomenclatura y otros": dict(lecc=["nomenclatura-inorganica"], ded=False, faltan=[r"org[aá]nica"], facil=2),
    # --- Biologia
    "Clasificacion, taxonomia y reinos": dict(lecc=["diversidad-seres-vivos"], ded=True, facil=2),
    "Ecologia (ecosistema, cadenas troficas, biomas)": dict(lecc=["ecologia-medioambiente"], ded=True, facil=2),
    "Genetica mendeliana y herencia": dict(lecc=["genetica-mendeliana"], ded=True, facil=3),
    "Biomoleculas (proteinas, lipidos, carbohidratos, agua)": dict(lecc=["bases-moleculares-vida", "componentes-materia-viva"], ded=True, facil=2),
    "Biodiversidad y conservacion": dict(lecc=["diversidad-seres-vivos", "ecologia-medioambiente"], ded=True, faltan=[r"amenaza|extinci[oó]n"], facil=2),
    "Acidos nucleicos (ADN, ARN)": dict(lecc=["bases-moleculares-vida"], ded=True, facil=3),
    "Celula, organelos y division celular": dict(lecc=["bases-celulares-vida"], ded=True, facil=2),
    "Contaminacion y problemas ambientales": dict(lecc=["ecologia-medioambiente"], ded=True, faltan=[r"contaminaci[oó]n", r"erosi[oó]n"], tema_rx=r"erosion", facil=2),
    "Metabolismo (fotosintesis, respiracion, Krebs)": dict(lecc=["energia-celular"], ded=True, facil=3),
    "Evolucion y origen de la vida": dict(lecc=[], facil=2),
    "Niveles de organizacion y definicion de biologia": dict(lecc=["componentes-materia-viva"], ded=True, facil=2),
    "Reproduccion, histologia y salud": dict(lecc=[], facil=1),
    "Estrategias y tecnicas de estudio (todo junto)": dict(lecc=[], facil=2),
    # --- Economicas: Historia y Lenguaje
    "Historia de Bolivia": dict(lecc=[], facil=1),
    "Historia universal": dict(lecc=[], facil=1),
    "Semantica y definicion": dict(lecc=["denotacion-connotacion", "lexico-contextual"], ded=False, faltan=[r"sem[aá]ntic|sin[oó]nim"], facil=3),
    "Oracion, sintaxis y funciones": dict(lecc=["expresion-oracion"], ded=False, faltan=[r"subordinad|oraci[oó]n compuesta", r"sujeto"], tema_rx=r"subordinacion|compuesta|sintactica", facil=2),
    "Tiempos verbales y verbos": dict(lecc=[], facil=3),
    "Ortografia y puntuacion": dict(lecc=["expresion-oracion"], ded=False, faltan=[r"ortograf", r"puntuaci"], facil=3),
}


def limpiar_rx(rx):
    """Etiqueta legible de una regex de busqueda (primera alternativa)."""
    t = rx.split("|")[0]
    for a, b in (("[oó]", "ó"), ("[aá]", "á"), ("[ií]", "í"), ("[ñn]", "ñ"), ("[eé]", "é")):
        t = t.replace(a, b)
    return t.replace("\\b", "")


def laminas_de(spec):
    """Laminas publicadas Y presentes en disco para el mapa de una familia."""
    out = []
    for item in spec.get("lam", []):
        mod, solo = (item, None) if isinstance(item, str) else item
        for (m, l), pub in lam_catalogo.items():
            if m == mod and (solo is None or l in solo) and pub and (m, l) in laminas_disco:
                out.append(f"{m}/{l}")
    return out


def estado(fac, nombre):
    """-> (estado, detalle, visible)"""
    spec = MAPA.get(nombre)
    if spec is None:
        return ("Sin mapear", "", "-")
    lam = laminas_de(spec) if fac == "ingenieria" else []
    lecc = [s for s in spec.get("lecc", []) if s in lecciones_disco]
    texto = " ".join(lecciones_disco[s] for s in lecc)
    faltan = [rx for rx in spec.get("faltan", []) if not re.search(rx, texto, re.I)]
    vis_lecc = any(s in catalogo.get(fac, set()) for s in lecc)
    partes = []
    if lam:
        partes.append(f"{len(lam)} lámina(s)")
    if lecc:
        partes.append("lección: " + ", ".join(lecc))
    det = "; ".join(partes)
    if lam:
        st = "Cubierto"
    elif lecc and spec.get("ded") and not faltan:
        st = "Cubierto"
    elif lecc:
        st = "A medias"
        if faltan:
            det += " (la lección no menciona: " + ", ".join(spec.get("etiquetas", {}).get(f, limpiar_rx(f)) for f in faltan) + ")"
        else:
            det += " (lección general, no dedicada al tema)"
    else:
        st = "Hueco"
        det = "ninguna"
    visible = "sí" if (lam or vis_lecc) else "no"
    if st != "Hueco" and visible == "no" and fac != "medicina":
        st_txt = st + " (oculto)"
    else:
        st_txt = st
    return (st_txt, det, visible)


# ---------------------------------------------------------------- 1. frecuencia
def periodo(a):
    return "2005-09" if a <= 2009 else ("2010-14" if a <= 2014 else "2015-25")


PERIODOS = ["2005-09", "2010-14", "2015-25"]
ex_por_periodo = collections.Counter(periodo(e["anio"]) for e in ex_fac["ingenieria"])

out = []
w = out.append


def tendencia(n, por_p, tot_p):
    if n < 15:
        return "muestra chica"
    if min(tot_p.values()) < 30:
        return "sin dato"
    s = [100 * por_p[p] / tot_p[p] for p in PERIODOS]
    d = s[2] - s[0]
    if abs(d) >= 6 and ((s[1] - s[0]) * d >= 0) and ((s[2] - s[1]) * d >= 0):
        return "sube" if d > 0 else "baja"
    return "sin tendencia"


def seccion_frecuencia():
    w("## 1. Frecuencia por facultad, materia y tema\n")
    w("Un \"tema\" acá es una **familia**: el banco tiene miles de etiquetas casi únicas (ver sección 2), así que las agrupé con reglas de palabras clave (archivo `familias.py`). Es una aproximación: revisa los cortes antes de decidir algo fino.\n")
    for fac in FACS:
        ps = por_fac[fac]
        exs = ex_fac[fac]
        w(f"### {FACULTAD[fac]}: {len(exs)} exámenes, {len(ps)} preguntas\n")
        if fac == "medicina":
            c = collections.Counter(p["area"] for p in ps)
            temas = collections.Counter(p["tema"] for p in ps)
            w(f"Hay **un solo examen** (Segundo Parcial 2024-2025). {len(ps)} preguntas con {len(temas)} etiquetas de tema distintas: ninguna se repite, así que **no se puede decir qué tema cae más**. Por materia: " + ", ".join(f"{MATERIA[a]} {n}" for a, n in c.items()) + ". Formato propio (afirmaciones y clave de combinación), no comparable con Ingeniería. Para medir temas hacen falta más exámenes de Medicina.\n")
            continue
        areas = collections.Counter(p["area"] for p in ps)
        w(tabla(["Materia (etiqueta `area`)", "Preguntas", "% de la facultad"], [(MATERIA.get(a, a) + f" (`{a}`)", n, pct(n, len(ps))) for a, n in areas.most_common()]))
        if fac == "economicas":
            w("**Ojo con Económicas:** de los 10 exámenes, 9 tienen secciones pendientes. Matemáticas está completa; **Lenguaje tiene solo las preguntas verificables** (gramática, semántica, ortografía; falta comprensión lectora) e **Historia solo está en 5 exámenes**. Por eso los porcentajes entre materias de Económicas NO reflejan lo que cae realmente, y un tema de Historia o Lenguaje \"ausente\" en un año no se puede leer como que no cayó.\n")
        for area, _n in areas.most_common():
            q = [p for p in ps if p["area"] == area]
            if len(q) < 20:
                w(f"**{MATERIA.get(area, area)}** (`{area}`): solo {len(q)} preguntas, ver sección 2.\n")
                continue
            fam = collections.Counter(p["fam"] for p in q)
            w(f"#### {MATERIA.get(area, area)}: {len(q)} preguntas\n")
            filas = []
            for nombre, n in fam.most_common(15):
                fila = [A(nombre) if nombre != SIN_FAMILIA else nombre, n, pct(n, len(q))]
                if fac == "ingenieria":
                    por_p, tot_p = {}, {}
                    for pr in PERIODOS:
                        tot_p[pr] = sum(1 for p in q if periodo(p["anio"]) == pr)
                        por_p[pr] = sum(1 for p in q if p["fam"] == nombre and periodo(p["anio"]) == pr)
                    fila += [f"{pct(por_p[pr], tot_p[pr])} ({por_p[pr]})" for pr in PERIODOS]
                    fila.append(tendencia(n, por_p, tot_p))
                filas.append(fila)
            cab = ["Tema (familia)", "Preguntas", "% de la materia"]
            if fac == "ingenieria":
                cab += PERIODOS + ["Tendencia"]
            w(tabla(cab, filas))
            if len(fam) > 15:
                w(f"({len(fam) - 15} familias más con menos preguntas.)\n")
        if fac == "ingenieria":
            w("Columnas de períodos: % de las preguntas de esa materia en esos años (entre paréntesis, cuántas). Exámenes por período: " + ", ".join(f"{p} = {ex_por_periodo[p]}" for p in PERIODOS) + ". **Tendencia**: solo se opina con 15 o más preguntas del tema y una diferencia de al menos 6 puntos entre el primer y el último período, en el mismo sentido; si no, \"sin tendencia\". Los formatos de examen cambiaron con los años (PRE-U, parciales), así que una \"subida\" puede ser cambio de formato y no de gusto del examinador.\n")
        else:
            w("Económicas no lleva columna por año: son 10 exámenes de 2011 a 2014 más uno de 2023 (solo Matemáticas, 10 preguntas), todos con secciones pendientes. Una muestra así no es tendencia.\n")


# ---------------------------------------------------------------- 2. higiene
STOP = {"de", "del", "la", "el", "los", "las", "en", "y", "con", "por", "a", "al", "un", "una", "para", "vs", "o"}


def stem(t):
    t = unicodedata.normalize("NFD", t)
    t = "".join(c for c in t if not unicodedata.combining(c)).lower()
    for suf in ("es", "s"):
        if len(t) > 4 and t.endswith(suf):
            return t[: -len(suf)]
    return t


def clave(tema):
    return frozenset(stem(x) for x in limpiar(tema).split("-") if x and x not in STOP and not x.isdigit())


def higiene():
    r = {}
    ps = [p for p in P if p["fac"] != "medicina"]
    r["sin_area"] = sum(1 for p in P if not p["area"])
    r["sin_tema"] = sum(1 for p in P if not p["tema"])
    r["tags"] = {f: len({(p["area"], p["tema"]) for p in por_fac[f]}) for f in FACS}
    r["tags_limpios"] = {f: len({(p["area"], limpiar(p["tema"])) for p in por_fac[f]}) for f in FACS}
    r["singletons"] = {}
    for f in FACS:
        c = collections.Counter((p["area"], p["tema"]) for p in por_fac[f])
        r["singletons"][f] = (sum(1 for v in c.values() if v == 1), len(c))
    r["sufijo_examen"] = [p for p in P if re.search(r"-\dop-", p["tema"])]
    r["sufijo_num"] = [p for p in P if re.search(r"-(ii|iii|iv|v|\d)$", p["tema"]) and not re.search(r"-\dop-", p["tema"])]
    grupos = collections.defaultdict(lambda: collections.defaultdict(int))
    for p in ps:
        grupos[(p["fac"], p["area"], clave(p["tema"]))][p["tema"]] += 1
    r["grupos_exactos"] = []
    for k, v in grupos.items():
        if len(v) > 1 and k[2]:
            r["grupos_exactos"].append((k[0], k[1], dict(v), sum(v.values())))
    r["grupos_exactos"].sort(key=lambda x: -x[3])
    r["pares"] = []
    por_area = collections.defaultdict(collections.Counter)
    for p in ps:
        por_area[(p["fac"], p["area"])][p["tema"]] += 1
    for (fac, area), c in por_area.items():
        tags = [(t, clave(t), n) for t, n in c.items() if len(clave(t)) >= 3]
        for (t1, k1, n1), (t2, k2, n2) in itertools.combinations(tags, 2):
            if k1 == k2:
                continue
            j = len(k1 & k2) / len(k1 | k2)
            if j >= 0.8:
                r["pares"].append((fac, area, t1, n1, t2, n2, j))
    r["pares"].sort(key=lambda x: -(x[3] + x[5]))
    r["area_matematicas_ing"] = [p for p in por_fac["ingenieria"] if p["area"] == "matematicas"]
    tema_areas = collections.defaultdict(set)
    for p in ps:
        tema_areas[(p["fac"], limpiar(p["tema"]))].add(p["area"])
    r["tema_en_varias_areas"] = {k: v for k, v in tema_areas.items() if len(v) > 1}
    FUERTE = {
        "quimica": r"estequiometr|molaridad|redox|reactivo-limitante|numeros-cuanticos|coligativ|crioscop|calorimetr|gases-ideales|isotop",
        "fisica": r"cinematica|friccion|capacitor|tiro-parabolico|plano-inclinado|coulomb|resorte|ley-de-ohm|campo-electrico",
        "biologia": r"genetica|taxonom|fotosintesis|mitosis|meiosis|ecosistema|monosacarido|adn|biodiversidad|cadena-trofica",
        "geometria_trigonometria": r"trigonometric|identidades-trigonom|poligono|circunferencia|trapecio|tangente",
        "aritmetica_algebra": r"logaritm|progresion|binomio-newton|teorema-del-resto|vieta|polinomio",
    }
    r["area_dudosa"] = []
    for p in por_fac["ingenieria"]:
        if p["area"] not in FUERTE:
            continue
        t = limpiar(p["tema"])
        for a2, rx in FUERTE.items():
            if a2 != p["area"] and re.search(rx, t) and not re.search(FUERTE[p["area"]], t):
                r["area_dudosa"].append((p, a2))
                break
    return r


def seccion_higiene():
    h = higiene()
    w("## 2. Higiene de etiquetas (por qué el conteo crudo no sirve)\n")
    filas = []
    for f in FACS:
        s, t = h["singletons"][f]
        filas.append((FACULTAD[f], len(por_fac[f]), h["tags"][f], h["tags_limpios"][f], f"{s} ({pct(s, t)})"))
    w(tabla(["Facultad", "Preguntas", "Etiquetas `tema` distintas", "Tras quitar sufijos de examen/número", "Etiquetas usadas una sola vez"], filas))
    w(f"- Preguntas sin `area`: **{h['sin_area']}**. Sin `tema`: **{h['sin_tema']}**.\n")
    top = collections.Counter((p["area"], p["tema"]) for p in por_fac["ingenieria"]).most_common(3)
    w(f"- Efecto práctico: en Ingeniería la etiqueta más repetida aparece **{top[0][1]} veces** de {len(por_fac['ingenieria'])}. Con etiquetas crudas ningún tema \"gana\"; por eso este informe agrupa en familias.\n")
    if h["sufijo_examen"]:
        w(f"- **Sufijo de examen pegado al tema**: {len(h['sufijo_examen'])} preguntas (ej. `{h['sufijo_examen'][0]['tema']}`), de los exámenes {', '.join(sorted({p['ex'] for p in h['sufijo_examen']}))}. Cada etiqueta así es única por construcción y no se puede contar.\n")
    w(f"- **Sufijo de numeración** (`-2`, `-ii`...): {len(h['sufijo_num'])} preguntas" + (", ej. " + ", ".join(f"`{p['tema']}`" for p in h['sufijo_num'][:4]) if h['sufijo_num'] else "") + ".\n")
    w(f"- **Área mal puesta, caso seguro**: {len(h['area_matematicas_ing'])} preguntas de Ingeniería (exámenes {', '.join(sorted({p['ex'] for p in h['area_matematicas_ing']}))}) tienen `area: matematicas`, valor que el resto de Ingeniería no usa (usa `aritmetica_algebra` y `geometria_trigonometria`). Entre ellas hay un `monosacaridos` (Biología) metido en matemáticas. Económicas sí usa `matematicas`: la misma materia tiene dos esquemas de etiqueta según la facultad.\n")
    if h["tema_en_varias_areas"]:
        w("- **Mismo tema en dos áreas** (tras quitar sufijos): " + "; ".join(f"`{k[1]}` en {sorted(v)}" for k, v in list(h["tema_en_varias_areas"].items())[:10]) + ".\n")
    else:
        w("- Ningún tema aparece en dos áreas distintas dentro de la misma facultad.\n")
    w(f"- **Área dudosa por palabras** ({len(h['area_dudosa'])} preguntas; revisar a mano, la regla es tosca):\n")
    filas = [(p["id"][-40:], p["area"], p["tema"], a2) for p, a2 in h["area_dudosa"][:20]]
    if filas:
        w(tabla(["Pregunta (fin del id)", "área puesta", "tema", "parece de"], filas))
    w(f"\n**Propuesta de fusiones** (NO aplicada, decide Ronald). Son etiquetas del mismo área cuyas palabras, sin contar plural ni artículos ni sufijos, son idénticas. Se propone dejar como etiqueta única la más frecuente. {len(h['grupos_exactos'])} grupos; los 25 con más preguntas:\n")
    filas = []
    for fac, area, v, tot in h["grupos_exactos"][:25]:
        orden = sorted(v.items(), key=lambda kv: -kv[1])
        filas.append((FACULTAD[fac], area, tot, f"`{orden[0][0]}`", ", ".join(f"`{t}` ({n})" for t, n in orden[1:])))
    w(tabla(["Facultad", "area", "Preguntas", "Etiqueta propuesta", "Se fusionan"], filas))
    w(f"\nAdemás hay {len(h['pares'])} pares de etiquetas muy parecidas (comparten al menos 80% de sus palabras) que **no** son idénticas y conviene mirar uno a uno antes de fusionar. Los 15 con más preguntas:\n")
    filas = [(FACULTAD[f], f"`{t1}` ({n1})", f"`{t2}` ({n2})", f"{j:.2f}") for f, a, t1, n1, t2, n2, j in h["pares"][:15]]
    w(tabla(["Facultad", "Etiqueta 1", "Etiqueta 2", "Parecido"], filas))
    return h


# ---------------------------------------------------------------- inconsistencias de datos
def seccion_datos():
    w("## 5. Inconsistencias de datos y límites del conteo\n")
    mal = [(e["archivo"], e["total_declarado"], len(e["preguntas"]), e["faltantes"]) for e in EX if e["total_declarado"] != len(e["preguntas"])]
    w("**`total_preguntas` del encabezado contra las preguntas que realmente hay** (parser real del banco):\n")
    if mal:
        w(tabla(["Examen", "Declara", "Tiene", "Faltantes declarados"], mal))
        w("Las diferencias se explican por `faltantes` (preguntas que existen en el examen y no se pudieron transcribir). No son errores: son preguntas que el conteo por tema no puede ver.\n")
    else:
        w("Todos coinciden.\n")
    w("**Secciones declaradas en `ponderacion` sin ninguna pregunta cargada** (no son \"temas ausentes\", son secciones que faltan):\n")
    filas = []
    for e in EX:
        cont = collections.Counter(p["area"] for p in e["preguntas"])
        for a in e["ponderacion"]:
            if cont.get(a, 0) == 0:
                filas.append((e["facultad"], e["archivo"], a, (e["secciones_pendientes"] or {}).get(a, "no declarada como pendiente")))
    resumen = collections.Counter((fa, a, m) for fa, _, a, m in filas)
    if resumen:
        w(tabla(["Facultad", "Área", "Motivo declarado", "Exámenes"], [(FACULTAD[fa], a, m, n) for (fa, a, m), n in sorted(resumen.items())]))
    sin_decl = [f for f in filas if f[3] == "no declarada como pendiente"]
    if sin_decl:
        w(f"**{len(sin_decl)} secciones vacías que nadie declaró como pendientes**: " + ", ".join(f"{a} en {b}" for _, b, a, _ in sin_decl[:12]) + ".\n")
    else:
        w("Toda sección vacía está declarada como pendiente.\n")
    comp = {}
    for f in FACS:
        exs = ex_fac[f]
        comp[f] = (len(exs), sum(1 for e in exs if e["secciones_pendientes"]), sum(1 for e in exs if e["faltantes"]),
                   sum(1 for e in exs if not e["secciones_pendientes"] and not e["faltantes"]))
    w("**Exámenes completos y no completos:**\n")
    w(tabla(["Facultad", "Exámenes", "Con `secciones_pendientes`", "Con `faltantes`", "Completos"], [(FACULTAD[f], *v) for f, v in comp.items()]))
    return comp


def seccion_huerfanos():
    w("**Robustez: ¿cambia el top 15 si solo se cuentan exámenes de admisión?**\n")
    cat_ing = collections.Counter((p["cat"]) for p in por_fac["ingenieria"])
    w("Ingeniería por categoría de examen: " + ", ".join(f"{k} = {v} preguntas" for k, v in cat_ing.items()) + ".\n")
    def top(ps):
        c = collections.Counter((p["area"], p["fam"]) for p in ps if p["area"] != "matematicas" and p["fam"] != SIN_FAMILIA)
        return [k for k, _ in c.most_common(15)]
    t_todo = top(por_fac["ingenieria"])
    t_adm = top([p for p in por_fac["ingenieria"] if p["cat"] == "admision"])
    w(f"De los 15 temas del top, **{len(set(t_todo) & set(t_adm))} siguen en el top 15** si se cuentan solo las {sum(1 for p in por_fac['ingenieria'] if p['cat'] == 'admision')} preguntas de exámenes de admisión. Los que cambian: " + (", ".join(A(k[1]) for k in t_todo if k not in t_adm) or "ninguno") + ".\n")
    estr = sorted({(p["ex"], p["cat"]) for p in por_fac["ingenieria"] if p["area"] == "estrategias_aprendizaje"})
    w(f"`estrategias_aprendizaje` aparece en {len(estr)} exámenes, todos de categoría {', '.join(sorted({c for _, c in estr}))} (ninguno de admisión).\n")
    w("**Lecciones y láminas: lo que está en disco y lo que ve el alumno**\n")
    huerf = sorted(s for s in lecciones_disco if s not in slugs_en_catalogo)
    sin_dir = sorted(s for s in slugs_en_catalogo if s not in lecciones_disco)
    w(f"- Lecciones en disco: **{len(lecciones_disco)}**. Listadas en el catálogo \"Aprende\" de Ingeniería: {len(catalogo['ingenieria'] & set(lecciones_disco))}; de Económicas: {len(catalogo['economicas'] & set(lecciones_disco))}.\n")
    w(f"- **Lecciones en disco que ninguna facultad lista en el catálogo: {len(huerf)}**: " + ", ".join(f"`{s}`" for s in huerf) + ". Medicina no tiene catálogo propio (decisión documentada en `catalogo-aprende.ts`). Pero las 7 de Biología (`BIO-01` a `BIO-07`) son de Ingeniería y están **ocultas**.\n")
    w(f"- BITACORA.md (sección de identidad del proyecto) dice que el banco cubre Ciencias Económicas, Ingeniería, Medicina y **Derecho**, pero `data/examenes/umss/` tiene carpetas: {', '.join(sorted(os.listdir(os.path.join(RAIZ, 'data', 'examenes', 'umss'))))}. No hay exámenes de Derecho (sí una lección `derecho-introduccion`).\n")
    w(f"- Slugs del catálogo sin carpeta en disco: {len(sin_dir)}" + (": " + ", ".join(sin_dir) if sin_dir else "") + ".\n")
    pub = [k for k, v in lam_catalogo.items() if v]
    sin_pag = [k for k in pub if k not in laminas_disco]
    sin_cat = [k for k in laminas_disco if k not in lam_catalogo]
    w(f"- Láminas: **{len(laminas_disco)}** en disco, {len(pub)} publicadas en `laminas.ts`; publicadas sin página: {len(sin_pag)}; en disco sin entrada en el catálogo: {len(sin_cat)}. Facultades con láminas: {', '.join(sorted(set(lam_facultades)))}. **Solo Aritmética-Álgebra de Ingeniería tiene láminas.**\n")
    return huerf


# ---------------------------------------------------------------- 3. cobertura
def cobertura():
    w("## 3. Cobertura: cada tema frecuente contra lecciones y láminas\n")
    w("Cómo se decide el estado (se mide **existencia y alcance, no calidad**; la calidad está en `docs/auditoria-pedagogica.md`):\n")
    w("- **Cubierto**: hay lámina publicada del tema (solo Ingeniería, solo Aritmética-Álgebra), o una lección dedicada al tema cuyo texto menciona los términos clave que pide el banco.\n- **A medias**: hay lección, pero es general o no menciona un término que el banco pregunta mucho (se indica cuál; lo comprobé buscando la palabra en el código de la lección).\n- **Hueco**: no hay nada.\n- **(oculto)**: el contenido existe en disco pero la facultad no lo lista en el catálogo, así que el alumno no lo ve.\n")
    filas_todas = []
    for fac in ("ingenieria", "economicas"):
        ps = por_fac[fac]
        w(f"### {FACULTAD[fac]}: familias con 15 o más preguntas\n")
        fam = collections.Counter((p["area"], p["fam"]) for p in ps if not (fac == "ingenieria" and p["area"] == "matematicas"))
        filas = []
        for (area, nombre), n in fam.most_common():
            if nombre == SIN_FAMILIA:
                continue
            st, det, vis = estado(fac, nombre)
            filas_todas.append((fac, area, nombre, n, st, det, vis))
            if n >= 15:
                filas.append((A(nombre), MATERIA.get(area, area), n, st, det))
        w(tabla(["Tema (familia)", "Materia", "Preguntas", "Estado", "Qué hay"], filas))
    return filas_todas


def afectadas(fac, area, nombre, n):
    """Preguntas que dependen del contenido que falta. En 'a medias' con
    termino faltante conocido (tema_rx) se cuentan solo esas; si no, toda la familia."""
    spec = MAPA.get(nombre, {})
    rx = spec.get("tema_rx")
    if not rx:
        return n
    return sum(1 for p in por_fac[fac] if p["area"] == area and p["fam"] == nombre and re.search(rx, p["tema"]))


def recientes(fac, area, nombre):
    return sum(1 for p in por_fac[fac] if p["area"] == area and p["fam"] == nombre and periodo(p["anio"]) == "2015-25")


def huecos():
    w("### Huecos y \"a medias\", ordenados por frecuencia × facilidad de enseñar\n")
    w("Facilidad (juicio mío): **3** = concepto corto con fórmula o regla (cabe en una lámina), **2** = necesita figuras o es medianamente extenso, **1** = mucha memorización o temas muy heterogéneos. **Afectadas** = preguntas que dependen justo del contenido que falta (en los \"a medias\", solo las que mencionan el término faltante; en los huecos, toda la familia). Puntaje = afectadas × facilidad. Solo entran familias de 10 o más preguntas. \"2015-25\" = cuántas de la familia cayeron en esos años (Ingeniería).\n")
    cand = []
    for fac in ("ingenieria", "economicas"):
        fam = collections.Counter((p["area"], p["fam"]) for p in por_fac[fac] if p["fam"] != SIN_FAMILIA and not (fac == "ingenieria" and p["area"] == "matematicas"))
        for (area, nombre), n in fam.items():
            st, det, vis = estado(fac, nombre)
            if n >= 10 and (st.startswith("Hueco") or st.startswith("A medias")):
                f = MAPA.get(nombre, {}).get("facil", 2)
                af = afectadas(fac, area, nombre, n)
                rec = recientes(fac, area, nombre) if fac == "ingenieria" else "-"
                cand.append((af * f, fac, area, nombre, n, f, st, det, af, rec))
    cand.sort(key=lambda x: (-x[0], -x[4]))
    w(tabla(["#", "Facultad", "Materia", "Tema", "Preguntas", "Afectadas", "Facilidad", "Puntaje", "2015-25", "Estado", "Qué falta"],
            [(i + 1, FACULTAD[c[1]], MATERIA.get(c[2], c[2]), A(c[3]), c[4], c[8], c[5], c[0], c[9], c[6], c[7]) for i, c in enumerate(cand)]))
    return cand


# ---------------------------------------------------------------- 4. recomendacion
RX_EJ = {
    "Impulso y choques": r"choque|momento|momentum",
    "Soluciones, concentraciones y titulacion": r"normal|titulaci|neutraliz",
    "Movimiento circular": r"(dinamica|friccion|vertical|rizo|centripeta|critica).*circular|circular.*(dinamica|friccion|vertical|rizo|critica)|rizo|centripeta|loop|peralte",
    "Estructura atomica y numeros cuanticos": r"onda|frecuencia|electromagn",
    "Densidad, temperatura y calorimetria": r"calorimetria|calor",
    "Reduccion al primer cuadrante y angulos notables": r"reduccion|cuadrante|notables",
    "Contaminacion y problemas ambientales": r"erosion",
}


def ejemplos(fac, nombre, rx=None, k=4):
    q = [p for p in por_fac[fac] if p["fam"] == nombre and (rx is None or re.search(rx, p["tema"]))]
    q.sort(key=lambda p: (-p["anio"], p["ex"], p["n"]))
    vistos, sal = set(), []
    for p in q:
        if p["tema"] in vistos:
            continue
        vistos.add(p["tema"])
        sal.append(p)
        if len(sal) == k:
            break
    return sal


def recomendacion(cand):
    w("## 4. Las 5 piezas a escribir primero\n")
    w("**Antes de escribir nada:** mostrar en el catálogo de Ingeniería las 7 lecciones de Biología que ya existen (`BIO-01` a `BIO-07`). No requiere contenido nuevo y destapa la materia más grande del banco.\n")
    w("Salen de la lista de huecos (puntaje), salteando lo que no suma al examen de ingreso: **Estrategias de aprendizaje** aparece solo en los 6 parciales PRE-U 2024 (ningún examen de admisión la trae) y **Evolución** casi no cae desde 2010. Cada pieza trae preguntas reales del banco como ejemplo de **qué se pregunta** (el banco es mapa, no guion: la pieza enseña el concepto general). Ids completos del parser real.\n")
    elegidos = []
    for c in cand:
        if c[3] in ("Estrategias y tecnicas de estudio (todo junto)",):
            continue
        if c[1] == "ingenieria" and c[9] == 0:
            continue
        elegidos.append(c)
        if len(elegidos) == 5:
            break
    for i, c in enumerate(elegidos):
        _, fac, area, nombre, n, f, st, det, af, rec = c
        accion = "completar la lección existente" if st.startswith("A medias") else "escribir lección o lámina nueva"
        w(f"**{i+1}. {A(nombre)}** ({FACULTAD[fac]}, {MATERIA.get(area, area)}): {af} preguntas afectadas de {n} en la familia; {accion}. {det}.\n")
        w("\n".join(f"- `{p['id']}` (P{p['n']}, tema `{p['tema']}`)" for p in ejemplos(fac, nombre, RX_EJ.get(nombre))) + "\n")
    return elegidos


def top15(fac):
    ps = [p for p in por_fac[fac] if not (fac == "ingenieria" and p["area"] == "matematicas") and p["fam"] != SIN_FAMILIA]
    fam = collections.Counter((p["area"], p["fam"]) for p in ps)
    filas = []
    for i, ((area, nombre), n) in enumerate(fam.most_common(15)):
        st, det, vis = estado(fac, nombre)
        filas.append((i + 1, A(nombre), MATERIA.get(area, area), n, pct(n, len(por_fac[fac])), st, det))
    return filas


def capturar(fn, *a):
    global out, w
    ant = out
    out = []
    w = out.append
    res = fn(*a)
    txt = "\n".join(x.rstrip("\n") + "\n" for x in out)
    out = ant
    w = out.append
    return txt, res


t_frec, _ = capturar(seccion_frecuencia)
t_hig, H = capturar(seccion_higiene)
t_cob, filas_todas = capturar(cobertura)
t_hue, cand = capturar(huecos)
t_rec, elegidos = capturar(recomendacion, cand)
t_dat, comp = capturar(seccion_datos)
t_hue2, huerf = capturar(seccion_huerfanos)

ing, eco, med = len(por_fac["ingenieria"]), len(por_fac["economicas"]), len(por_fac["medicina"])
tot = len(P)


def suma(fac, pref):
    return sum(n for (f, a, nm, n, st, det, vis) in filas_todas if f == fac and n >= 15 and st.startswith(pref))


base_ing = sum(n for (f, a, nm, n, st, det, vis) in filas_todas if f == "ingenieria" and n >= 15)
cub_ing = sum(n for (f, a, nm, n, st, det, vis) in filas_todas if f == "ingenieria" and n >= 15 and st == "Cubierto")
med_ing = sum(n for (f, a, nm, n, st, det, vis) in filas_todas if f == "ingenieria" and n >= 15 and st == "A medias")
hue_ing = suma("ingenieria", "Hueco")
oculto_ing = sum(n for (f, a, nm, n, st, det, vis) in filas_todas if f == "ingenieria" and n >= 15 and "oculto" in st)
bio_ing = sum(1 for p in por_fac["ingenieria"] if p["area"] == "biologia")
hist_n = sum(1 for p in por_fac["economicas"] if p["area"] == "historia")

md = []
md.append("# Mapa de temas del banco\n")
md.append("> Generado por `scripts/analisis/mapa-de-temas.py` (datos de `scripts/analisis/extraer-banco.mjs`, que usa el parser real del banco). Para regenerar: ver el encabezado del script. No modifica el banco ni las lecciones.\n")
md.append("## Resumen\n")
md.append(f"1. El banco tiene **{tot} preguntas** en {len(EX)} exámenes: Ingeniería {ing}, Económicas {eco}, Medicina {med}. Medicina tiene un solo examen y todavía no sirve para medir temas.\n")
md.append(f"2. Las etiquetas `tema` casi no se repiten ({H['singletons']['ingenieria'][0]} de {H['singletons']['ingenieria'][1]} en Ingeniería se usan una sola vez), así que el conteo crudo no sirve. Las agrupé en familias con reglas de palabras: es una aproximación.\n")
md.append(f"3. En Ingeniería, de {base_ing} preguntas en familias de 15 o más: **{cub_ing} ({pct(cub_ing, base_ing)}) tienen lección o lámina y el alumno las ve**, {oculto_ing} ({pct(oculto_ing, base_ing)}) tienen lección pero oculta, {med_ing} ({pct(med_ing, base_ing)}) están a medias y {hue_ing} ({pct(hue_ing, base_ing)}) sin nada. Aritmética-Álgebra es la mejor cubierta.\n")
md.append(f"4. **Biología es la materia más grande de Ingeniería ({bio_ing} preguntas, {pct(bio_ing, ing)}) y sus 7 lecciones existen pero no están en el catálogo**: el alumno no las ve (son las {oculto_ing} preguntas del punto anterior). Es el arreglo más barato con más efecto.\n")
md.append(f"5. En Económicas, **Historia** ({hist_n} preguntas cargadas) no tiene ninguna lección y Lenguaje tiene cobertura parcial. Ojo: 9 de los 10 exámenes tienen secciones pendientes, así que esos conteos son una muestra.\n")
md.append("## Los 15 temas que más caen\n")
md.append("**Ingeniería.** Porcentaje sobre todas las preguntas de Ingeniería; cómo se decide el estado, en la sección 3.\n")
md.append(tabla(["#", "Tema (familia)", "Materia", "Preguntas", "% de Ingeniería", "Estado", "Qué hay"], top15("ingenieria")))
md.append("**Económicas** (muestra parcial, ver advertencia en la sección 1):\n")
md.append(tabla(["#", "Tema (familia)", "Materia", "Preguntas", "% de Económicas", "Estado", "Qué hay"], top15("economicas")))
md.append("**Medicina**: no hay tabla. Un examen, 98 etiquetas distintas, ninguna repetida.\n")
for t in (t_frec, t_hig, t_cob, t_hue, t_rec, t_dat, t_hue2):
    md.append(t)
md.append("## Qué NO se pudo medir\n")
md.append("- **Calidad** de las lecciones y láminas: solo si existen y qué términos mencionan.\n- **Medicina**: el cruce por tema contra sus 18 lecciones necesita más exámenes.\n- **Comprensión lectora** de Económicas y la parte de Historia pendiente: no están en el banco, así que no cuentan.\n- **Preguntas repetidas entre exámenes** (el mismo ejercicio en dos convocatorias) no se descontaron: cuentan como pregunta nueva.\n- Las **reglas de familia** pueden mandar alguna pregunta suelta a la familia equivocada; el orden de los primeros lugares es robusto, el de los últimos no.\n")
open(SALIDA, "w", encoding="utf-8").write("\n".join(md))
print("escrito", SALIDA, len("\n".join(md)), "caracteres")
