"""Convierte docs/psa-2027/MFQ_INVENTARIO.md §4 en data/practica/medicina-psa-2027-mfq.md
(formato del banco). Deja fuera las DUDOSAS de docs/psa-2027/convocatoria_MFQ.md
(regla de Ronald: manda la lista oficial). Determinista: no reescribe texto."""
import re, sys, unicodedata
from pathlib import Path
R = Path(__file__).resolve().parent.parent
inv = (R / "docs/psa-2027/MFQ_INVENTARIO.md").read_text(encoding="utf-8")
conv = (R / "docs/psa-2027/convocatoria_MFQ.md").read_text(encoding="utf-8")
dudosas = set(re.findall(r"^\| ([MFQ]\d\.\d) \| (?:DUDOSA|FUERA)", conv, re.M))
dentro = set(re.findall(r"^\| ([MFQ]\d\.\d) \| DENTRO", conv, re.M))
AREA = {"M": "matematicas", "F": "fisica", "Q": "quimica"}
def slug(s):
    s = unicodedata.normalize("NFD", s); s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
cuerpo = inv[inv.index("## 4."):]
secciones = re.split(r"^#### ", cuerpo, flags=re.M)[1:]
salida, n, vistos = [], 0, set()
for sec in secciones:
    cab, _, resto = sec.partition("\n")
    m = re.match(r"([MFQ])(\d+)\.\s+(.+)", cab.strip()); assert m, cab
    letra, num, titulo = m.groups()
    tema = "psa-" + slug(re.sub(r"\(.*?\)", "", titulo))[:50].strip("-")
    preg = re.split(r"^(\d+)\. ", resto, flags=re.M)
    for i in range(1, len(preg), 2):
        k, txt = preg[i], preg[i + 1]
        codigo = f"{letra}{num}.{k}"; vistos.add(codigo)
        if codigo in dudosas: continue
        assert codigo in dentro, codigo
        txt = re.split(r"^---\s*$|^###", txt, flags=re.M)[0]
        enun, _, rest = txt.partition("\n   - A)")
        ops = re.findall(r"^\s+- ([A-E])\) (.*)$", "   - A)" + rest, re.M)
        resp = re.search(r"\*\*Respuesta:\*\*\s*([A-E])", rest).group(1)
        res = rest.split("**Resolución:**", 1)[1]
        pasos = [l.strip() for l in res.strip().splitlines() if l.strip()]
        assert len(ops) == 4 and resp in "ABCD" and pasos, codigo
        n += 1
        salida.append(f"## Pregunta {n}\narea: {AREA[letra]}\ntema: {tema}\ndificultad: media\n\n"
                      f"{enun.strip()}\n\n" + "\n".join(f"- {l}) {t.strip()}" for l, t in ops) +
                      f"\n\n**respuesta:** {resp}\n**explicacion:** " + "\n".join(pasos) +
                      f"\nRespuesta: {resp}.\n\n<!-- {codigo} de MFQ_INVENTARIO.md -->\n\n---\n")
faltan = dentro - vistos
assert not faltan, faltan
front = f"""---
universidad: UMSS
facultad: medicina
anio: 2027
titulo: Práctica PSA 2027 · Matemática, Física y Química
categoria: practica
total_preguntas: {n}
---

<!--
  NO ES UN EXAMEN PASADO. Preguntas de práctica escritas para la PSA 2027 (docs/psa-2027/MFQ_INVENTARIO.md §4),
  verificadas (verificacion_MFQ_agy.md) y contrastadas con 4096.pdf (convocatoria_MFQ.md): solo las DENTRO.
  Quedan fuera las dudosas: {", ".join(sorted(dudosas))}. Generado por scripts/psa-mfq-a-banco.py: no editar a mano.
  Va fuera de data/examenes para no contarse como examen; entra a la práctica por data/preguntas-compartidas.json.
-->

"""
out = R / "data/practica/medicina-psa-2027-mfq.md"
out.write_text(front + "\n".join(salida), encoding="utf-8")
print(n, "preguntas;", len(dudosas), "dudosas fuera:", sorted(dudosas))
