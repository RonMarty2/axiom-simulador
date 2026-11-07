"""Genera data/examenes/umss/medicina/2023-primer-parcial-curso-basico-2023-2024.md

Uso (desde la raíz del repo):
    node scripts/medicina/extraer.mjs med-2023-24-p1 --salida=<dir>
    python scripts/medicina/lotes/med-2023-24-p1.py <dir>

Toma el texto del borrador del extractor, la clave OFICIAL de la cartilla del patrón (pág. 63 del
PDF maestro, archivo .clave.json) y los veredictos por afirmación de .datos.py. Antes de escribir
comprueba, pregunta por pregunta, que la letra que sale de los veredictos coincide con la clave
oficial: si no coincide, se detiene.
Las preguntas 24, 55 y 62 NO están impresas en el facsímil (la numeración salta de 23 a 25, de 54 a
56 y de 61 a 63) y van a `faltantes`.
"""
import json
import re
import sys
from pathlib import Path

AQUI = Path(__file__).parent
BORRADOR = Path(sys.argv[1]) / "med-2023-24-p1.json"
SALIDA = AQUI.parents[2] / "data/examenes/umss/medicina/2023-primer-parcial-curso-basico-2023-2024.md"
FUENTE = "examenes pasados/MEDICINA/examenes-2021-2026/MED_Examenes-curso-basico-2021-2026_William-Osler.pdf"

ns = {}
exec((AQUI / "med-2023-24-p1.datos.py").read_text(encoding="utf8"), ns)
D = ns["D"]
CLAVE = json.loads((AQUI / "med-2023-24-p1.clave.json").read_text(encoding="utf8"))
borrador = json.loads(BORRADOR.read_text(encoding="utf8"))

AUSENTES = (24, 55, 62)

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
assert sorted(preguntas) == [n for n in range(1, 101) if n not in AUSENTES], "el borrador no trae las 97 preguntas"
assert sorted(int(n) for n in CLAVE) == sorted(preguntas), "la clave no cubre exactamente las 97 preguntas"

# El extractor pegó la afirmación 3 de la pregunta 84 dentro de la 2 (la separa un "3:" en vez de "3.-").
_a = preguntas[84]["afirmaciones"]
if len(_a) == 2 and " 3: " in _a[1]:
    _a2, _a3 = _a[1].split(" 3: ", 1)
    preguntas[84]["afirmaciones"] = [_a[0], _a2, _a3]

errores = []
for n, p in preguntas.items():
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

faltantes = "".join(
    f"""  - numero: {n}
    motivo: pagina-ausente
    fuente: {FUENTE}, págs. 55 a 63
    detalle: La pregunta {n} no está impresa en el facsímil (la numeración salta). La cartilla del patrón trae una letra para ella ({d}).
"""
    for n, d in ((24, "A"), (55, "A-C, doble marca"), (62, "C"))
)

front = f"""---
universidad: UMSS
facultad: medicina
anio: 2023
categoria: parcial_curso
titulo: Primer Parcial · Curso Básico 2023-2024
duracion_minutos: 90
total_preguntas: 100
ponderacion:
  morfofuncion: 0.5
  biologia_celular: 0.5
faltantes:
{faltantes}---

<!--
  FUENTE · "{FUENTE}", páginas 55 a 63:
  encabezado textual "UNIVERSIDAD MAYOR DE SAN SIMON · FACULTAD DE MEDICINA Dr. Aurelio Melean ·
  CURSO BASICO - CARRERA DE MEDICINA 2023-2024 · PRIMER EXAMEN PARCIAL". 100 preguntas de selección
  alternativa, 90 minutos. La parte I (1 a 50, dos afirmaciones) usa la clave A solo 1, B solo 2,
  C ambas, D ninguna; la parte II (51 a 100, tres afirmaciones) usa A solo 1, B solo 2, C solo 3,
  D todas, E ninguna. El PDF es el compilado de la Preparatoria William Osler; el examen y el patrón
  ("PATRON PRIMER PARCIAL", pág. 63) son de la facultad.

  FECHA · el examen no trae fecha impresa: solo la gestión 2023-2024. No se inventa fecha_examen.

  CLAVE · leída de la capa de texto de la cartilla (pág. 63); las de 1, 2, 3 y 87 se leyeron a la vista
  porque la capa de texto no las traía. Se contrastó pregunta por pregunta con un veredicto propio
  de cada afirmación, hecho de memoria de Tortora y Alberts (sin el libro a mano). Se transcribe la
  clave oficial, no la propia. Las preguntas con "Nota: Revisión pendiente" son las que la clave
  oficial parece discrepar del libro: hay que confirmarlas con el libro antes de darlas por cerradas.
  Las razones de cada afirmación son redacción de apoyo y parafrasean el enunciado impreso.

  AUSENTES · 24, 55 y 62 no están impresas en el facsímil (la numeración salta). La cartilla da
  24=A, 55=A-C y 62=C, pero sin enunciado no hay pregunta que cargar.

  ÁREAS · 1 a 25 y 51 a 75: morfofunción; 26 a 50 y 76 a 100: biología celular.
-->

"""
texto = front + "\n\n---\n\n".join(bloques) + "\n"
assert "—" not in texto
SALIDA.write_text(texto, encoding="utf8", newline="\n")
print(f"{len(bloques)} preguntas escritas, 3 en faltantes, revisiones pendientes: {revisiones}")
print(SALIDA)
