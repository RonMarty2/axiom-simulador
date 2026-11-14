"""Genera data/examenes/umss/medicina/2025-primer-parcial-curso-basico-2025-2026.md

Uso (desde la raíz del repo):
    node scripts/medicina/extraer.mjs med-2025-26-p1 --salida=<dir>
    python scripts/medicina/lotes/med-2025-26-p1.py <dir>

Toma el texto del borrador del extractor, la clave OFICIAL leída de la cartilla del patrón
(pág. 117 del PDF maestro, archivo .clave.json) y los veredictos de .datos.py. Se detiene si
la letra que sale de los veredictos no coincide con la clave oficial.
"""
import json
import re
import sys
from pathlib import Path

AQUI = Path(__file__).parent
BORRADOR = Path(sys.argv[1]) / "med-2025-26-p1.json"
SALIDA = AQUI.parents[2] / "data/examenes/umss/medicina/2025-primer-parcial-curso-basico-2025-2026.md"
FUENTE = "examenes pasados/MEDICINA/examenes-2021-2026/MED_Examenes-curso-basico-2021-2026_William-Osler.pdf"

ns = {}
exec((AQUI / "med-2025-26-p1.datos.py").read_text(encoding="utf8"), ns)
D = ns["D"]
CLAVE = json.loads((AQUI / "med-2025-26-p1.clave.json").read_text(encoding="utf8"))
borrador = json.loads(BORRADOR.read_text(encoding="utf8"))

ESQUEMA = {
    2: {"VF": "A", "FV": "B", "VV": "C", "FF": "D"},
    3: {"VFF": "A", "FVF": "B", "FFV": "C", "VVV": "D", "FFF": "E"},
}
SEP = re.compile(r"\s+(?=[23]\s*[\.\-]+\s*\S)")


def limpiar(t):
    t = re.sub(r"\s+", " ", t).strip()
    t = t.replace("–", ",").replace("—", ",")
    t = re.sub(r",\s*,", ",", t)
    return t


def afirmaciones(n, p):
    esperadas = 2 if n <= 50 else 3
    af = [limpiar(a) for a in p["afirmaciones"]]
    if n == 35:  # la cola es el comienzo de la pregunta 36
        af[-1] = af[-1].replace("En los estudios históricos de Langmuir", "").strip()
    if n == 50:  # cola: encabezado de la clave de la parte II
        af[-1] = re.sub(r"\s*A PARTIR DE ESTA PREGUNTA.*$", "", af[-1])
    while len(af) < esperadas:
        partes = SEP.split(af[-1], maxsplit=1)
        assert len(partes) == 2, f"pregunta {n}: no pude separar las afirmaciones"
        af[-1:] = partes
    # saca el numero que quede pegado al principio ("2. ", "3.")
    af = [re.sub(r"^[23]\s*[\.\-]+\s*", "", a) if i else a for i, a in enumerate(af)]
    assert len(af) == esperadas, (n, af)
    return af


def area(n):
    if n <= 25 or 51 <= n <= 75:
        return "morfofuncion"
    if 26 <= n <= 40 or 76 <= n <= 90:
        return "biologia_celular"
    return "investigacion"  # 41-50 y 91-100: Educación en Salud e Investigación


preguntas = {p["numero"]: p for p in borrador["preguntas"]}
assert sorted(preguntas) == list(range(1, 101)), "el borrador no trae las 100 preguntas"
assert sorted(CLAVE, key=int) == [str(i) for i in range(1, 101)]
INCORRECTO = {81, 82, 83, 86, 88, 90}

# Preguntas cuya letra oficial no se sostiene con el libro y no hay letra que represente lo correcto: van a `faltantes`.
FALTANTES = {
    85: "La cartilla del patrón da C (solo la afirmación 3: en la técnica directa se necesita anticuerpo secundario). El libro de la gestión (Calvo, Tema 2) dice que en las técnicas directas el anticuerpo primario está conjugado con la sustancia detectable, y que el secundario conjugado se usa en las indirectas; por eso la afirmación 1 es verdadera y la 3 es falsa, y la letra que saldría es A. Se deja sin respuesta hasta confirmar la cartilla.",
}

bloques = []
revisiones = []
sin_enunciado = []
for n in range(1, 101):
    if n in FALTANTES:
        continue
    p = preguntas[n]
    tema, v, razones, nota = D[n]
    af = afirmaciones(n, p)
    k = len(af)
    assert len(v) == k == len(razones), f"pregunta {n}: {k} afirmaciones, {len(v)} veredictos, {len(razones)} razones"
    letra = ESQUEMA[k][v]
    assert letra == CLAVE[str(n)], f"pregunta {n}: los veredictos dan {letra} y la clave oficial es {CLAVE[str(n)]}"
    enun = limpiar(p["enunciado"])
    if not enun:  # el original no trae enunciado (va directo a las afirmaciones): el banco exige uno
        enun = "Considera las siguientes afirmaciones:"
        sin_enunciado.append(n)
    lineas = [f"## Pregunta {n}", f"area: {area(n)}", f"tema: {tema}", "dificultad: medio", "", enun, ""]
    for i, a in enumerate(af, 1):
        lineas.append(f"- {i}) {a}")
    if n in INCORRECTO:
        et = {"V": "es la incorrecta (la que pide el enunciado)", "F": "es correcta"}
    else:
        et = {"V": "verdadera", "F": "falsa"}
    expl = [f"Afirmación {i} ({et[c]}): {r}" for i, (c, r) in enumerate(zip(v, razones), 1)]
    if nota:
        expl.append(f"Nota: {nota}")
        if nota.startswith("Revisión pendiente"):
            revisiones.append(n)
    lineas += ["", f"**respuesta:** {letra}", "**explicacion:** " + "\n".join(expl)]
    bloques.append("\n".join(lineas))

FALT_YAML = "\n".join(
    f"  - numero: {n}\n    motivo: sin-respuesta\n    fuente: {FUENTE}, pág. 117\n    detalle: {d}"
    for n, d in FALTANTES.items()
)

front = f"""---
universidad: UMSS
facultad: medicina
anio: 2026
categoria: parcial_curso
titulo: Primer Parcial · Curso Básico 2025-2026
fecha_examen: 2025-12-22
duracion_minutos: 90
total_preguntas: 100
ponderacion:
  morfofuncion: 0.5
  biologia_celular: 0.3
  investigacion: 0.2
formato: curso-basico-2025-26
faltantes:
{FALT_YAML}
---

<!--
  FUENTE · "{FUENTE}", páginas 110 a 117.
  ENCABEZADO IMPRESO (textual): "UNIVERSIDAD MAYOR DE SAN SIMON FACULTAD DE MEDICINA DR. AURELIO MELEAN" ·
  "CBBA, 22 DE DICIEMBRE DE 2025" · "PRIMER EXAMEN CURSO BASICO 2025-2026" · "NOMBRE COMPLETO." ·
  "Considere la siguiente clave: A) Si 1 es correcto B) Si 2 es correcto C) Si ambos son correctos D) Si ninguno es correcto".
  En la pregunta 51 se repite: "A PARTIR DE ESTA PREGUNTA CONSIDERE LA SIGUIENTE CLAVE: A) Si 1 es correcto
  B) Si 2 es correcto C) Si 3 es correcto D) Si todos son correctos E) Si ninguno es correcto".
  NO CONSTA impreso: duración, número total de preguntas, puntaje, división en partes I/II ni nombres de
  áreas. Se tomó duracion_minutos 90 como SUPUESTO (la de los exámenes anteriores). Las preguntas van
  numeradas 1 a 100: 1 a 50 con dos afirmaciones y 51 a 100 con tres.
  El PDF es el compilado de la Preparatoria William Osler; el examen y la cartilla son de la facultad.

  ÁREAS · NO están impresas; se asignan por el contenido y la bibliografía de la gestión (Saladin y
  Calvo): 1 a 25 y 51 a 75 morfofunción; 26 a 40 y 76 a 90 biología celular; 41 a 50 y 91 a 100
  Educación en Salud e Investigación (`investigacion`). Por eso NO lleva `formato: curso-basico`
  (ese formato tiene solo dos áreas). La ponderación es la que salen de contar las preguntas (50/30/20).

  FECHA · 2025-12-22, impresa en el encabezado y escrita a mano en la cartilla.

  CLAVE · leída de la cartilla "PATRÓN 22/12/2025 1.a Parcial Curso Básico" (pág. 117, firmada por la
  coordinadora general), círculos rellenados, 100 de 100 letras, leídas en cuatro columnas a 260 dpi.
  Se contrastó pregunta por pregunta con un veredicto propio, hecho DE MEMORIA (los libros de la
  gestión no están en el repo). Preguntas con "Nota: Revisión pendiente" (la clave oficial parece
  discrepar): {', '.join(str(r) for r in revisiones)}. Se transcribe la clave oficial.
  Preguntas 81, 82, 83, 86, 88 y 90 dicen "señale lo incorrecto": la letra marca la incorrecta.

  SIN ENUNCIADO · las preguntas {', '.join(str(r) for r in sin_enunciado)} no traen enunciado impreso (empiezan directo en
  "1.-"). El banco exige uno, así que se les puso "Considera las siguientes afirmaciones:" (texto añadido, no del original).

  ERRATAS DEL ORIGINAL · se transcriben como están impresas: "facicular" (11), "0.02 mm" (11),
  "20 °C" sin signo (30), "siglo IX" por XX (80), "3.Inferior" (57), "pecesita" (85).
-->

"""
texto = front + "\n\n---\n\n".join(bloques) + "\n"
assert "—" not in texto
SALIDA.write_text(texto, encoding="utf8", newline="\n")
print(f"{len(bloques)} preguntas escritas, {len(FALTANTES)} en faltantes, revisiones pendientes: {revisiones}")
print(SALIDA)
