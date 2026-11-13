"""Genera data/examenes/umss/medicina/2025-examen-final-curso-basico-2025-2026.md

Uso (desde la raíz del repo):
    node scripts/medicina/extraer.mjs med-2025-26-fin --salida=<dir>
    python scripts/medicina/lotes/med-2025-26-fin.py <dir>

Toma el texto del borrador del extractor, la clave OFICIAL leída de la cartilla del patrón
(pág. 132 del PDF maestro, archivo .clave.json) y los veredictos de .datos.py. Se detiene si
la letra que sale de los veredictos no coincide con la clave oficial.
"""
import json
import re
import sys
from pathlib import Path

AQUI = Path(__file__).parent
BORRADOR = Path(sys.argv[1]) / "med-2025-26-fin.json"
SALIDA = AQUI.parents[2] / "data/examenes/umss/medicina/2025-examen-final-curso-basico-2025-2026.md"
FUENTE = "examenes pasados/MEDICINA/examenes-2021-2026/MED_Examenes-curso-basico-2021-2026_William-Osler.pdf"

ns = {}
exec((AQUI / "med-2025-26-fin.datos.py").read_text(encoding="utf8"), ns)
D = ns["D"]
CLAVE = json.loads((AQUI / "med-2025-26-fin.clave.json").read_text(encoding="utf8"))
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
    if n == 44:  # la cola trae la pregunta 45 entera
        af[-1] = af[-1].split(" 45 1.-")[0].strip()
    if n == 50:  # cola: encabezado de la clave de la parte II
        af[-1] = re.sub(r"\s*Considere lo siguiente.*$", "", af[-1])
    if n == 82:  # marca suelta "X" al final del original
        af[-1] = re.sub(r"\s+X$", "", af[-1])
    while len(af) < esperadas:
        partes = SEP.split(af[-1], maxsplit=1)
        assert len(partes) == 2, f"pregunta {n}: no pude separar las afirmaciones"
        af[-1:] = partes
    # saca el numero que quede pegado al principio ("2. ", "3.")
    af = [re.sub(r"^[23]\s*[\.\-]+\s*", "", a) if i else re.sub(r"^1\s*[\.\-]+\s*", "", a) for i, a in enumerate(af)]
    assert len(af) == esperadas, (n, af)
    return af


def area(n):
    if n <= 25 or 51 <= n <= 75:
        return "morfofuncion"
    if 26 <= n <= 40 or 76 <= n <= 90:
        return "biologia_celular"
    return "investigacion"  # 41-50 y 91-100: Educación en Salud e Investigación


preguntas = {p["numero"]: p for p in borrador["preguntas"]}
assert 45 not in preguntas and 44 in preguntas, "se esperaba la 45 pegada a la 44"
# La 45 no tiene enunciado y quedó dentro de la última afirmación de la 44.
preguntas[45] = {"numero": 45, "enunciado": "", "afirmaciones": [
    "La Regla de Sturges permite obtener exactitud en el número de intervalos (m) para evitar extremos.",
    "La fórmula propuesta por Sturges es m = 1+ 3,3 *log(n), donde n es el número total de datos."]}
assert " 45 1.-" in preguntas[44]["afirmaciones"][-1]
assert sorted(preguntas) == list(range(1, 101)), "el borrador no trae las 100 preguntas"
assert sorted(CLAVE, key=int) == [str(i) for i in range(1, 101)]
INCORRECTO = set()  # ninguna pregunta trae enunciado «señale lo incorrecto» impreso

bloques = []
revisiones = []
sin_enunciado = []
for n in range(1, 101):
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

front = f"""---
universidad: UMSS
facultad: medicina
anio: 2026
categoria: parcial_curso
titulo: Examen Final · Curso Básico 2025-2026
fecha_examen: 2026-02-11
duracion_minutos: 90
total_preguntas: 100
ponderacion:
  morfofuncion: 0.5
  biologia_celular: 0.3
  investigacion: 0.2
formato: curso-basico-2025-26
---

<!--
  FUENTE · "{FUENTE}", páginas 126 a 132.
  ENCABEZADO IMPRESO (textual): "UNIVERSIDAD MAYOR DE SAN SIMON FACULTAD DE MEDICINA "DR. AURELIO MELEAN"" ·
  "CARRERA DE MEDICINA" · "CBBA, 11 de febrero de 2026" · "EXAMEN FINAL CURSO BASICO 2025-2026" · "NOMBRE COMPLETO" ·
  "Considere la siguiente clave: A) Si 1 es correcto B) Si 2 es correcto C) Si ambos son correctos D) Si ninguno es correcto".
  Tras la pregunta 50 se repite: "Considere lo siguiente: A) Si 1 es correcto B) Si 2 es correcto C) Si 3 es correcto
  D) Si todos son correctos E) Si ninguno es correcto".
  NO CONSTA impreso: duración, número total de preguntas, puntaje, división en partes ni nombres de áreas.
  Se tomó duracion_minutos 90 como SUPUESTO (la de los exámenes anteriores). Las preguntas van numeradas
  1 a 100: 1 a 50 con dos afirmaciones y 51 a 100 con tres.
  El PDF es el compilado de la Preparatoria William Osler; el examen y la cartilla son de la facultad.

  ÁREAS · NO están impresas; se asignan por el contenido y la bibliografía de la gestión (Saladin y Calvo):
  1 a 25 y 51 a 75 morfofunción; 26 a 40 y 76 a 90 biología celular; 41 a 50 y 91 a 100 Educación en Salud e
  Investigación (`investigacion`). Mismo reparto que el primer parcial 2025-2026, por eso lleva
  `formato: curso-basico-2025-26`. La ponderación sale de contar las preguntas (50/30/20).

  FECHA · 2026-02-11, impresa en el encabezado y escrita a mano en la cartilla.

  CLAVE · leída de la cartilla "Patrón Ex. Final 11/02/26" (pág. 132, con sello de notaría y firmas de la
  jefa de departamento de Morfología y de la coordinación general), círculos rellenados, 100 de 100 letras,
  leídas en cuatro columnas a 260 dpi. Se contrastó pregunta por pregunta con un veredicto propio, confirmado con
  Saladin (Morfo) y Calvo (Biología Celular) donde el texto estaba en el repo; Investigación no tiene libro y su
  veredicto es propio. Preguntas con "Nota: Revisión pendiente" (la clave oficial parece discrepar o no se
  pudo confirmar): {', '.join(str(r) for r in revisiones)}. Se transcribe la clave oficial.

  SIN ENUNCIADO · las preguntas {', '.join(str(r) for r in sin_enunciado)} no traen enunciado impreso (empiezan
  directo en "1.-"). El banco exige uno, así que se les puso "Considera las siguientes afirmaciones:" (texto
  añadido, no del original). En esas preguntas V marca la afirmación verdadera.

  PREGUNTA 45 · su texto quedó pegado al final de la 44 en el PDF; se separó a mano.
  ERRATAS DEL ORIGINAL · se transcriben como están impresas: "(li-Is]" (49), "Leidig" (52), "Mesecencefalo" (60),
  "N-myg" (79), "glisina" (85), "Calcitonia" (71) y otras erratas menores de ortografía y tildes.
-->

"""
texto = front + "\n\n---\n\n".join(bloques) + "\n"
assert "—" not in texto
SALIDA.write_text(texto, encoding="utf8", newline="\n")
print(f"{len(bloques)} preguntas escritas, revisiones pendientes: {revisiones}")
print(SALIDA)
