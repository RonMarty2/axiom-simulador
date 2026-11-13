"""Genera data/examenes/umss/medicina/2025-examen-final-curso-basico-2024-2025.md

Uso (desde la raíz del repo):
    node scripts/medicina/extraer.mjs med-2024-25-fin --salida=<dir>
    python scripts/medicina/lotes/med-2024-25-fin.py <dir>

Toma el texto de las preguntas del borrador del extractor, la clave OFICIAL leída de la
cartilla del patrón (pág. 109 del PDF maestro, archivo .clave.json) y los veredictos por
afirmación de .datos.py. Antes de escribir nada comprueba, pregunta por pregunta, que la
letra que sale de los veredictos coincide con la clave oficial: si no coincide, el script
se detiene (así se detectan tanto errores de lectura de la cartilla como de veredicto).
"""
import json
import re
import sys
from pathlib import Path

AQUI = Path(__file__).parent
BORRADOR = Path(sys.argv[1]) / "med-2024-25-fin.json"
SALIDA = AQUI.parents[2] / "data/examenes/umss/medicina/2025-examen-final-curso-basico-2024-2025.md"
FUENTE = "examenes pasados/MEDICINA/examenes-2021-2026/MED_Examenes-curso-basico-2021-2026_William-Osler.pdf"

ns = {}
exec((AQUI / "med-2024-25-fin.datos.py").read_text(encoding="utf8"), ns)
D = ns["D"]
CLAVE = json.loads((AQUI / "med-2024-25-fin.clave.json").read_text(encoding="utf8"))
borrador = json.loads(BORRADOR.read_text(encoding="utf8"))

assert sorted(int(n) for n in CLAVE) == list(range(1, 101)), "la clave no trae las 100 letras"
assert all(len(c) == 1 for c in CLAVE.values()), "hay marcas dobles en la clave"

ESQUEMA = {
    2: {"VF": "A", "FV": "B", "VV": "C", "FF": "D"},
    3: {"VFF": "A", "FVF": "B", "FFV": "C", "VVV": "D", "FFF": "E"},
}


def limpiar(t):
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"\s+II\.\s*A continuaci.*$", "", t)  # cola del encabezado de la sección II (pregunta 50)
    t = t.replace("–", ",").replace("—", ",")
    t = re.sub(r",\s*,", ",", t)
    return t


def area(n):
    return "morfofuncion" if n <= 25 or 51 <= n <= 75 else "biologia_celular"


preguntas = {p["numero"]: p for p in borrador["preguntas"]}
assert sorted(preguntas) == list(range(1, 101)), "el borrador no trae las 100 preguntas"

SC = "Sin confirmar con el libro de la gestión (Tortora/Alberts)."
# Preguntas cuya letra oficial no se sostiene y no hay letra que represente lo correcto: van a `faltantes`.
FALTANTES = {
    31: f"La cartilla del patrón da D (ambas falsas), pero la afirmación 2 (el modelo de Watson y Crick es de 1953) es verdadera, lo que daría B. {SC}",
    73: f"La cartilla del patrón da E (ninguna), pero la afirmación 1 (el ramo posterior inerva los músculos profundos y la piel del dorso) es verdadera, así que E no puede ser. {SC}",
    81: f"La cartilla del patrón da B, pero son verdaderas la 2 y la 3 (casquete de GTP-tubulina en el extremo que crece); \"dos de tres\" no tiene letra en la clave. {SC}",
    85: f"La cartilla del patrón da B, pero son verdaderas la 2 y la 3 (el genotipo son los alelos heredados); \"dos de tres\" no tiene letra en la clave. {SC}",
}

errores = []
for n in range(1, 101):
    if n in FALTANTES:
        continue
    p = preguntas[n]
    tema, v, razones, nota = D[n]
    k = len(p["afirmaciones"])
    if k != (2 if n <= 50 else 3) or not (len(v) == k == len(razones)):
        errores.append(f"{n}: {k} afirmaciones {p['afirmaciones']} | veredicto {v}")
    elif ESQUEMA[k][v] != CLAVE[str(n)]:
        errores.append(f"{n}: veredictos dan {ESQUEMA[k][v]}, clave {CLAVE[str(n)]} | {p['enunciado']} | {p['afirmaciones']} | {v}")
if errores:
    print("\n".join(errores))
    sys.exit(1)

bloques = []
revisiones = []
for n in range(1, 101):
    if n in FALTANTES:
        continue
    p = preguntas[n]
    tema, v, razones, nota = D[n]
    k = len(p["afirmaciones"])
    letra = ESQUEMA[k][v]
    lineas = [
        f"## Pregunta {n}",
        f"area: {area(n)}",
        f"tema: {tema}",
        "dificultad: medio",
        "",
        limpiar(p["enunciado"]),
        "",
    ]
    for i, a in enumerate(p["afirmaciones"], 1):
        lineas.append(f"- {i}) {limpiar(a)}")
    expl = [f"Afirmación {i} ({'verdadera' if c == 'V' else 'falsa'}): {r}" for i, (c, r) in enumerate(zip(v, razones), 1)]
    if nota:
        expl.append(f"Nota: {nota}")
        revisiones.append(n)
    lineas += ["", f"**respuesta:** {letra}", "**explicacion:** " + "\n".join(expl)]
    bloques.append("\n".join(lineas))

FALT_YAML = "\n".join(
    f"  - numero: {n}\n    motivo: sin-respuesta\n    fuente: {FUENTE}, pág. 109\n    detalle: {d}"
    for n, d in FALTANTES.items()
)

front = f"""---
universidad: UMSS
facultad: medicina
anio: 2025
categoria: parcial_curso
titulo: Examen Final · Curso Básico 2024-2025
duracion_minutos: 90
total_preguntas: 100
formato: curso-basico
ponderacion:
  morfofuncion: 0.5
  biologia_celular: 0.5
faltantes:
{FALT_YAML}
---

<!--
  FUENTE · "{FUENTE}", páginas 101 a 109:
  encabezado textual "UNIVERSIDAD MAYOR DE SAN SIMON · FACULTAD DE MEDICINA dr. Aurelio melean ·
  CURSO BASICO 2024-2025 · EXAMEN FINAL". 100 preguntas de selección alternativa, 90 minutos.
  La parte I (1 a 50, dos afirmaciones) usa la clave A solo 1, B solo 2, C ambas, D ninguna; la
  parte II (51 a 100, tres afirmaciones) usa A solo 1, B solo 2, C solo 3, D todas, E ninguna.
  El PDF es el compilado de la Preparatoria William Osler; el examen y el patrón (pág. 109) son
  de la facultad.

  FECHA · el examen no trae fecha impresa: solo la gestión 2024-2025. No se inventa fecha_examen.
  El anio 2025 sigue a los otros exámenes de la gestión (segundo parcial, enero de 2025).

  CLAVE · leída de la cartilla del patrón (pág. 109, imagen) y contrastada pregunta por pregunta
  con un veredicto propio de cada afirmación, hecho de memoria de Tortora y Alberts (sin el libro
  a mano). Se transcribe la clave oficial, no la propia. Las preguntas con "Nota: Revisión
  pendiente" ({", ".join(str(r) for r in revisiones)}) son las que la clave oficial parece discrepar del libro: hay que
  confirmarlas con el libro antes de darlas por cerradas. Las preguntas 31, 73, 81 y 85 van en
  `faltantes`: la letra oficial no se sostiene y no existe una letra que represente lo correcto. Las razones de cada afirmación son
  redacción de apoyo y parafrasean el enunciado impreso.

  ERRATAS DEL ORIGINAL · se transcriben como están impresas: "citosinas" por citocinas (65),
  "partes" por pares (69), "GO" por G1 (97), "ATPcatalasa" (76), entre otras.

  ÁREAS · 1 a 25 y 51 a 75: morfofunción; 26 a 50 y 76 a 100: biología celular. Este examen no
  trae preguntas de Educación en Salud e Investigación.
-->

"""
texto = front + "\n\n---\n\n".join(bloques) + "\n"
assert "—" not in texto
SALIDA.write_text(texto, encoding="utf8", newline="\n")
print(f"{len(bloques)} preguntas escritas, {len(FALTANTES)} en faltantes, revisiones pendientes: {revisiones}")
print(SALIDA)
