"""Genera data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md

Uso (desde la raíz del repo):
    node scripts/medicina/extraer.mjs med-2024-25-p2 --salida=<dir>
    python scripts/medicina/lotes/med-2024-25-p2.py <dir>

Toma el texto de las preguntas del borrador del extractor, la clave OFICIAL leída de la
cartilla del patrón (pág. 100 del PDF maestro, archivo .clave.json) y los veredictos por
afirmación de .datos.py. Antes de escribir nada comprueba, pregunta por pregunta, que la
letra que sale de los veredictos coincide con la clave oficial: si no coincide, el script
se detiene (así se detectan tanto errores de lectura de la cartilla como de veredicto).
Las dos preguntas con marca doble (60 y 91: "A o C") no caben en una sola letra y van a
`faltantes`.
"""
import json
import re
import sys
from pathlib import Path

AQUI = Path(__file__).parent
BORRADOR = Path(sys.argv[1]) / "med-2024-25-p2.json"
SALIDA = AQUI.parents[2] / "data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md"
FUENTE = "examenes pasados/MEDICINA/examenes-2021-2026/MED_Examenes-curso-basico-2021-2026_William-Osler.pdf"

ns = {}
exec((AQUI / "med-2024-25-p2.datos.py").read_text(encoding="utf8"), ns)
D = ns["D"]
CLAVE = json.loads((AQUI / "med-2024-25-p2.clave.json").read_text(encoding="utf8"))
borrador = json.loads(BORRADOR.read_text(encoding="utf8"))

DOBLES = [n for n, c in CLAVE.items() if " o " in c]
assert sorted(DOBLES, key=int) == ["60", "91"], DOBLES

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

bloques = []
revisiones = []
for n in range(1, 101):
    if n in (60, 91):
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

front = f"""---
universidad: UMSS
facultad: medicina
anio: 2025
categoria: parcial_curso
titulo: Segundo Parcial · Curso Básico 2024-2025
fecha_examen: 2025-01-23
duracion_minutos: 90
total_preguntas: 100
ponderacion:
  morfofuncion: 0.5
  biologia_celular: 0.5
faltantes:
  - numero: 60
    motivo: sin-respuesta
    fuente: {FUENTE}, pág. 100
    detalle: La facultad aceptó A o C (la cartilla del patrón tiene dos marcas). Con la clave de 3 afirmaciones, la 1 y la 3 son correctas y no existe una letra para "1 y 3".
  - numero: 91
    motivo: sin-respuesta
    fuente: {FUENTE}, pág. 100
    detalle: La facultad aceptó A o C (la cartilla del patrón tiene dos marcas). Son correctas la 1 y la 3, sin letra propia en la clave.
---

<!--
  FUENTE · "{FUENTE}", páginas 92 a 100:
  encabezado textual "UNIVERSIDAD MAYOR DE SAN SIMON · FACULTAD DE MEDICINA dr. Aurelio melean ·
  CURSO BASICO 2024-2025 · SEGUNDO EXAMEN PARCIAL". 100 preguntas de selección alternativa, 90
  minutos. La parte I (1 a 50, dos afirmaciones) usa la clave A solo 1, B solo 2, C ambas, D ninguna;
  la parte II (51 a 100, tres afirmaciones) usa A solo 1, B solo 2, C solo 3, D todas, E ninguna.
  El PDF es el compilado de la Preparatoria William Osler; el examen y el patrón son de la facultad.

  FECHA · 2025-01-23: es la fecha escrita a mano en la cartilla del patrón (pág. 100). El examen
  no trae otra fecha impresa. Si aparece un escaneo con sello, verificar.

  CLAVE · leída de la cartilla del patrón (círculos rellenados a mano, firmada por los coordinadores)
  y contrastada pregunta por pregunta con un veredicto propio de cada afirmación, hecho SIN el libro
  de la gestión a mano (de memoria de Tortora y Alberts). Las 98 letras coinciden con ese veredicto
  salvo 4 (20, 51, 56 y 85, marcadas "Nota: Revisión pendiente"), donde la clave oficial parece
  discrepar del libro: hay que confirmarlas con el libro antes de darlas por cerradas. Se transcribe
  la clave oficial, no la propia. Que coincidan las 94 restantes también valida la lectura de la
  cartilla, pero no reemplaza la verificación con el libro.
  Las preguntas 60 y 91 traen DOS marcas (A o C) y van en `faltantes`: la respuesta es una sola letra.

  ERRATAS DEL ORIGINAL · se transcriben como están impresas: "Fd" por F0 (77), "O2" por alfa-1 (13),
  "citrunculina" por latrunculina (32), "nódulo sino auricular", "adicción" por adición (87).

  ÁREAS · 1 a 25 y 51 a 75: morfofunción; 26 a 50 y 76 a 100: biología celular. Este examen no trae
  preguntas de Educación en Salud e Investigación.
-->

"""
texto = front + "\n\n---\n\n".join(bloques) + "\n"
assert "—" not in texto
SALIDA.write_text(texto, encoding="utf8", newline="\n")
print(f"{len(bloques)} preguntas escritas, 2 en faltantes, revisiones pendientes: {revisiones}")
print(SALIDA)
