"""Genera data/examenes/umss/medicina/2026-segundo-parcial-curso-basico-2025-2026.md

Uso (desde la raíz del repo):
    python scripts/medicina/lotes/med-2025-26-p2.py

Lee el texto del PDF maestro (págs. 118 a 124) con `pdftotext -layout` (el borrador de extraer.mjs
sale incompleto en este examen: 99 de 100 preguntas y decenas con enunciado vacío), la clave OFICIAL
de .clave.json (cartilla firmada de la pág. 125 + recuadro «Corrección») y los veredictos de .datos.py.
Se detiene si la letra que sale de los veredictos no coincide con la clave oficial.
Las preguntas 95, 97 y 100 (la facultad aceptó «A o C») van a `faltantes`.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

AQUI = Path(__file__).parent
RAIZ = AQUI.parents[2]
SALIDA = RAIZ / "data/examenes/umss/medicina/2026-segundo-parcial-curso-basico-2025-2026.md"
FUENTE = "examenes pasados/MEDICINA/examenes-2021-2026/MED_Examenes-curso-basico-2021-2026_William-Osler.pdf"

ns = {}
exec((AQUI / "med-2025-26-p2.datos.py").read_text(encoding="utf8"), ns)
D = ns["D"]
K = json.loads((AQUI / "med-2025-26-p2.clave.json").read_text(encoding="utf8"))
CARTILLA, CORRECCION = K["cartilla"], K["correccion"]
CLAVE = {n: CORRECCION.get(n, CARTILLA[n]) for n in CARTILLA}

ESQUEMA = {
    2: {"VF": "A", "FV": "B", "VV": "C", "FF": "D"},
    3: {"VFF": "A", "FVF": "B", "FFV": "C", "VVV": "D", "FFF": "E"},
}


def texto_pdf():
    out = subprocess.run(
        ["pdftotext", "-layout", "-enc", "UTF-8", "-f", "118", "-l", "124", str(RAIZ / FUENTE), "-"],
        capture_output=True,
    ).stdout.decode("utf8")
    ls = [l.strip() for l in out.splitlines()]
    ls = [l for l in ls if l and "PREPARATORIA WILLIAM OSLER" not in l and "WhatsApp" not in l]
    return re.sub(r"\s+", " ", " ".join(ls))


def partir_preguntas(s):
    i = s.index("D)Si ninguno es correcto") + len("D)Si ninguno es correcto")
    s = s[i:]
    s = re.sub(
        r"Considere lo siguiente:\s*A\) Si 1 es correcto\s*D\) Si todos son correctos\s*B\) Si 2 es correcto"
        r"\s*C\) Si 3 es correcto\s*E\) Si ninguno es correcto",
        "",
        s,
    )
    pos, cur = [], 0
    for n in range(1, 101):
        m = re.compile(rf"(?:(?<=\s)|^){n}(?:\.(?!\s*-)\s*|\s+(?=1\s*[\.\-]))").search(s, cur)
        assert m, f"no encontré la pregunta {n}"
        pos.append((n, m.start(), m.end()))
        cur = m.end()
    return {n: s[b:(pos[k + 1][1] if k < 99 else len(s))].strip() for k, (n, a, b) in enumerate(pos)}


def trocear(t):
    marcas, cur = [], 0
    for k in (1, 2, 3):
        m = re.compile(rf"(?:(?<=\s)|^){k}\s*(?:\.\s*-?|-)\s*(?=\S)").search(t, cur)
        if not m:
            break
        marcas.append((m.start(), m.end()))
        cur = m.end()
    enun = t[: marcas[0][0]].strip()
    af = [t[b : (marcas[j + 1][0] if j + 1 < len(marcas) else len(t))].strip() for j, (a, b) in enumerate(marcas)]
    return enun, af


# Lo que el troceo automático no resuelve (comprobado contra el render de las págs. 118 a 124):
OVERRIDE = {
    19: ("Es cierto sobre la velocidad de conducción de las fibras nerviosas:",
         ["Las señales nerviosas viajan a 0.5 a 2.0 m/s en fibras pequeñas amielinicas (2 a 4 μm de diámetro) y a 1 a 3 m/s en fibras mielinicas del mismo tamaño.",
          "En fibras mielinicas largas (hasta 20 μm de diámetro), llegan a alcanzar 120 m/s."]),
    73: ("En relación con la penilinfa, la endolinfa tiene potencial eléctrico de casi:",
         ["-40 mV", "+55 mV", "80 mV"]),
}


def limpiar(t):
    t = re.sub(r"\s+", " ", t).strip()
    t = t.replace("–", ",").replace("—", ",")
    t = re.sub(r"^\.", "", t)
    t = t.replace("!Il", "III")
    t = re.sub(r"\bIl\b", "II", t)
    t = re.sub(r"(?<=-)ll\b", "II", t)
    t = re.sub(r"(?<=transferasa-)l\b", "I", t)
    t = re.sub(r"“|”", '"', t)
    return t


def area(n):
    if n <= 25 or 51 <= n <= 75:
        return "morfofuncion"
    if 26 <= n <= 40 or 76 <= n <= 90:
        return "biologia_celular"
    return "investigacion"  # 41-50 y 91-100: Educación en Salud e Investigación


crudo = partir_preguntas(texto_pdf())
INCORRECTO = {84}
SIN_RESPUESTA = {
    94: "La cartilla del patrón da D (las tres verdaderas), pero la afirmación 2 («solo puede aplicarse en poblaciones pequeñas») es falsa según el criterio habitual del muestreo probabilístico; con la 2 falsa, la 1 y la 3 verdaderas no tienen letra en la clave. Sin confirmar, porque no hay libro de la gestión para Educación en Salud e Investigación en el repo.",
}
bloques, revisiones, sin_enunciado, faltantes, detalle_falt = [], [], [], [], {}
for n in range(1, 101):
    enun, af = OVERRIDE[n] if n in OVERRIDE else trocear(crudo[n])
    af = [limpiar(a) for a in af]
    k = len(af)
    assert k == (2 if n <= 50 else 3), f"pregunta {n}: {k} afirmaciones"
    tema, v, razones, nota = D[n]
    assert len(v) == k == len(razones), f"pregunta {n}: {k} afirmaciones, {len(v)} veredictos, {len(razones)} razones"
    oficial = CLAVE[str(n)]
    if oficial == "A o C":
        faltantes.append(n)
        detalle_falt[n] = ("La facultad aceptó A o C (corrección impresa junto a la cartilla; la cartilla marcaba "
                           f"{CARTILLA[str(n)]}). Con la clave de 3 afirmaciones, la 1 y la 3 son correctas y no existe una letra para \"1 y 3\".")
        continue
    if n in SIN_RESPUESTA:  # la clave oficial no se sostiene y no hay letra que represente lo correcto
        faltantes.append(n)
        detalle_falt[n] = SIN_RESPUESTA[n]
        continue
    if nota and nota.startswith("Revisión pendiente"):
        revisiones.append(n)
    letra = ESQUEMA[k].get(v)
    assert letra is not None, f"pregunta {n}: veredicto {v} sin letra en la clave"
    assert letra == oficial, f"pregunta {n}: los veredictos dan {letra} y la clave oficial es {oficial}"
    enun = limpiar(enun)
    if not enun:
        enun = "Considera las siguientes afirmaciones:"
        sin_enunciado.append(n)
    lineas = [f"## Pregunta {n}", f"area: {area(n)}", f"tema: {tema}", "dificultad: medio", "", enun, ""]
    for i, a in enumerate(af, 1):
        lineas.append(f"- {i}) {a}")
    et = {"V": "es la incorrecta (la que pide el enunciado)", "F": "es correcta"} if n in INCORRECTO else {"V": "verdadera", "F": "falsa"}
    expl = [f"Afirmación {i} ({et[c]}): {r}" for i, (c, r) in enumerate(zip(v, razones), 1)]
    if nota:
        expl.append(nota if nota.startswith("Nota:") else f"Nota: {nota}")
    lineas += ["", f"**respuesta:** {letra}", "**explicacion:** " + "\n".join(expl)]
    bloques.append("\n".join(lineas))

fal = "\n".join(
    f"  - numero: {n}\n    motivo: sin-respuesta\n    fuente: {FUENTE}, pág. 125\n    detalle: {detalle_falt[n]}"
    for n in sorted(faltantes)
)

front = f"""---
universidad: UMSS
facultad: medicina
anio: 2026
categoria: parcial_curso
titulo: Segundo Parcial · Curso Básico 2025-2026
fecha_examen: 2026-01-19
duracion_minutos: 90
total_preguntas: 100
ponderacion:
  morfofuncion: 0.5
  biologia_celular: 0.3
  investigacion: 0.2
formato: curso-basico-2025-26
faltantes:
{fal}
---

<!--
  FUENTE · "{FUENTE}", páginas 118 a 125.
  ENCABEZADO IMPRESO (textual): "UNIVERSIDAD MAYOR DE SAN SIMON" · "CBBA, 19 de enero de 2026" ·
  "FACULTAD DE MEDICINA "DR. AURELIO MELEAN" · "CARRERA DE MEDICINA" ·
  "SEGUNDO EXAMEN PARCIAL CURSO BASICO 2025-2026" · "NOMBRE COMPLETO:" ·
  "Considere la siguiente clave: A)Si 1 es correcto B)Si 2 es correcto C)Si ambos son correctos D)Si ninguno es correcto".
  Tras la pregunta 50: "Considere lo siguiente: A) Si 1 es correcto B) Si 2 es correcto C) Si 3 es correcto
  D) Si todos son correctos E) Si ninguno es correcto".
  NO CONSTA impreso: duración, número total de preguntas, puntaje, nombres de áreas. Se tomó duracion_minutos 90
  como SUPUESTO (la de los exámenes anteriores). Preguntas 1 a 100: 1 a 50 con dos afirmaciones y 51 a 100 con tres.
  El PDF es el compilado de la Preparatoria William Osler; el examen y la cartilla son de la facultad.

  ÁREAS · NO están impresas; se asignan por contenido, igual que en el primer parcial: 1 a 25 y 51 a 75
  morfofunción (50); 26 a 40 y 76 a 90 biología celular (30); 41 a 50 y 91 a 100 Educación en Salud e
  Investigación (`investigacion`, 20). Ponderación 0.5 / 0.3 / 0.2, `formato: curso-basico-2025-26`.

  CLAVE · cartilla "PATRÓN 2.º PARCIAL 19-01-26" firmada por jefes de departamento y notariada (pág. 125),
  100 de 100 filas leídas en cuatro columnas a 260 dpi. Encima, el recuadro impreso «Corrección»:
  "44. C  46. A  95. A o C  97. A o C  100. A o C". La corrección prevalece sobre la cartilla: la cartilla marcaba
  44 = B, 46 = B, 95 = C, 97 = B y 100 = A. 95, 97 y 100 van a `faltantes` (la facultad aceptó dos letras).
  La 94 también va a `faltantes`: la cartilla da D pero la afirmación 2 es falsa y no hay letra defendible.
  Veredictos propios hechos de memoria y contrastados con Saladin y Calvo solo donde la explicación cita el libro.
  Preguntas con "Nota: Revisión pendiente" (la clave oficial parece discrepar): {', '.join(str(r) for r in revisiones)}.
  Se transcribe la clave oficial. La pregunta 84 dice "es incorrecto": la letra marca la afirmación incorrecta.

  SIN ENUNCIADO · las preguntas {', '.join(str(r) for r in sin_enunciado)} no traen enunciado impreso (empiezan directo en
  "1."). El banco exige uno, así que se les puso "Considera las siguientes afirmaciones:" (texto añadido, no del original).

  REPETIDA · la pregunta 74 es idéntica a la 60 en el original.
  ERRATAS DEL ORIGINAL · se transcriben como están impresas: "penilinfa" (73, por perilinfa), "camitina" (90),
  "neurotrasnmisor" (63), "Es color de la luz" (75), "diferencias33" (48), y la afirmación 2 de la 50 termina en
  "sea mayor" sin completarse. En la 73 el original imprime "3-80 mV" y se leyó como 80 mV.
-->

"""
texto = front + "\n\n---\n\n".join(bloques) + "\n"
assert "—" not in texto
SALIDA.write_text(texto, encoding="utf8", newline="\n")
print(f"{len(bloques)} preguntas escritas, faltantes: {faltantes}, revisiones pendientes: {revisiones}")
print(SALIDA)
