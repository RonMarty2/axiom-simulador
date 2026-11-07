"""Genera data/examenes/umss/medicina/2025-primer-parcial-curso-basico-2024-2025.md

Uso (desde la raíz del repo):
    node scripts/medicina/extraer.mjs med-2024-25-p1 --salida=<dir>
    python scripts/medicina/lotes/med-2024-25-p1.py <dir>

Toma el borrador del extractor, la clave OFICIAL de la cartilla (pág. 91 del PDF maestro, leída a la
vista, .clave.json) y los veredictos por afirmación de .datos.py. Antes de escribir comprueba que la
letra que sale de los veredictos coincide con la clave oficial: si no coincide, se detiene.
La 53 no aparece en el facsímil y va a `faltantes`.
"""
import json
import re
import sys
from pathlib import Path

AQUI = Path(__file__).parent
BORRADOR = Path(sys.argv[1]) / "med-2024-25-p1.json"
SALIDA = AQUI.parents[2] / "data/examenes/umss/medicina/2025-primer-parcial-curso-basico-2024-2025.md"
FUENTE = "examenes pasados/MEDICINA/examenes-2021-2026/MED_Examenes-curso-basico-2021-2026_William-Osler.pdf"

ns = {}
exec((AQUI / "med-2024-25-p1.datos.py").read_text(encoding="utf8"), ns)
D = ns["D"]
CLAVE = json.loads((AQUI / "med-2024-25-p1.clave.json").read_text(encoding="utf8"))
borrador = json.loads(BORRADOR.read_text(encoding="utf8"))

AUSENTES = (53,)

ESQUEMA = {
    2: {"VF": "A", "FV": "B", "VV": "C", "FF": "D"},
    3: {"VFF": "A", "FVF": "B", "FFV": "C", "VVV": "D", "FFF": "E"},
}


def limpiar(t):
    t = re.sub(r"\s+", " ", t).strip()
    t = t.replace("–", ",").replace("—", ",")
    t = re.sub(r",\s*,", ",", t)
    return t


def area(n):
    return "morfofuncion" if n <= 25 or 51 <= n <= 75 else "biologia_celular"


preguntas = {p["numero"]: p for p in borrador["preguntas"]}
# El extractor pegó la pregunta 3 como tercera afirmación de la 2 ("En relación a ...: 1. ... 2. ...").
_a = preguntas[2]["afirmaciones"]
if 3 not in preguntas and len(_a) == 3 and _a[2].startswith("En relación a los sistemas de retroalimentación negativa"):
    _m = re.match(r"(.*?:)\s*1\.\s*(.*?)\s*2\.\s*(.*)$", _a[2])
    preguntas[2]["afirmaciones"] = _a[:2]
    preguntas[3] = {"numero": 3, "enunciado": _m.group(1), "afirmaciones": [_m.group(2), _m.group(3)]}
preguntas[2]["enunciado"] = preguntas[2]["enunciado"].lstrip("-")  # guion sobrante del extractor
# La 52 trae al final un "1." sobrante (resto del salto de página donde falta la 53).
preguntas[52]["afirmaciones"][-1] = re.sub(r"\s*1\.\s*$", "", preguntas[52]["afirmaciones"][-1])

assert sorted(preguntas) == [n for n in range(1, 101) if n != 53], "el borrador no trae las 99 preguntas"
assert sorted(int(n) for n in CLAVE) == list(range(1, 101)), "la clave no cubre las 100 preguntas"


errores = []
for n, p in preguntas.items():
    if n in AUSENTES: continue
    tema, v, razones, nota = D[n]
    k = len(p["afirmaciones"])
    if not (len(v) == k == len(razones)):
        errores.append(f"{n}: {k} afirmaciones {p['afirmaciones']} | veredicto {v}")
    elif ESQUEMA[k][v] != CLAVE[str(n)]:
        errores.append(f"{n}: veredictos dan {ESQUEMA[k][v]}, clave {CLAVE[str(n)]} | {p['enunciado']} | {p['afirmaciones']} | {v}")
if errores:
    print("\n".join(errores))
    sys.exit(1)

bloques = []
revisiones = []
for n in range(1, 101):
    if n in AUSENTES:
        continue
    p = preguntas[n]
    tema, v, razones, nota = D[n]
    k = len(p["afirmaciones"])
    assert len(v) == k == len(razones), f"pregunta {n}: {k} afirmaciones, {len(v)} veredictos, {len(razones)} razones"
    letra = ESQUEMA[k][v]
    assert letra == CLAVE[str(n)], f"pregunta {n}: los veredictos dan {letra} y la clave oficial es {CLAVE[str(n)]}"
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

faltantes = f"""  - numero: 53
    motivo: pagina-ausente
    fuente: {FUENTE}, págs. 82 a 91
    detalle: La pregunta 53 no aparece en el facsímil (salto de página entre la 52 y la 54); no se pudo recuperar el enunciado. La cartilla trae la letra E.
"""
front = f"""---
universidad: UMSS
facultad: medicina
anio: 2025
categoria: parcial_curso
titulo: Primer Parcial · Curso Básico 2024-2025
duracion_minutos: 90
total_preguntas: 100
ponderacion:
  morfofuncion: 0.5
  biologia_celular: 0.5
faltantes:
{faltantes}---

<!--
  FUENTE · "{FUENTE}", páginas 82 a 91: primer examen parcial del Curso Básico de la Carrera de
  Medicina, gestión 2024-2025. 100 preguntas de selección alternativa, 90 minutos. La parte I (1 a 50,
  dos afirmaciones) usa la clave A solo 1, B solo 2, C ambas, D ninguna; la parte II (51 a 100, tres
  afirmaciones) usa A solo 1, B solo 2, C solo 3, D todas, E ninguna. El PDF es el compilado de la
  Preparatoria William Osler; el examen y la cartilla de respuestas (pág. 91) son de la facultad.

  FECHA · el examen no trae fecha impresa: solo la gestión 2024-2025. No se inventa fecha_examen.

  CLAVE · leída a la vista de la imagen de la cartilla (pág. 91). Se contrastó pregunta por pregunta
  con un veredicto propio de cada afirmación (sin el libro a mano). Se transcribe la clave oficial, no
  la propia. Las preguntas con "Nota: Revisión pendiente" son las que la clave oficial parece discrepar
  del libro: confirmarlas con el libro antes de darlas por cerradas. Las razones de cada afirmación son
  redacción de apoyo; las de 59 y 60 están escritas desde la clave y conviene revisarlas.

  AUSENTES · la 53 no aparece en el facsímil; la cartilla da 53=E, pero sin enunciado no hay pregunta.
  El extractor pegó la 3 dentro de la 2; el generador las separa.

  ÁREAS · 1 a 25 y 51 a 75: morfofunción; 26 a 50 y 76 a 100: biología celular.
-->

"""
texto = front + "\n\n---\n\n".join(bloques) + "\n"
assert "—" not in texto
SALIDA.write_text(texto, encoding="utf8", newline="\n")
print(f"{len(bloques)} preguntas escritas, 1 en faltantes, revisiones pendientes: {revisiones}")
print(SALIDA)
