# Lee el banco (md) y arma la tabla de preguntas con lo que importa para decidir que animar.
# Solo LEE. Lo usa plan-animaciones.py. Reutiliza las familias de familias.py (mismas reglas del mapa de temas).
import json, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", ".."))
sys.path.insert(0, AQUI)
from familias import familia  # noqa: E402

BANCO = os.path.join(RAIZ, "data", "examenes", "umss")
EXTRAIDO = json.load(open(os.path.join(AQUI, "banco-extraido.json"), encoding="utf-8"))
IDS = {}  # (archivo, n) -> id
META = {}  # archivo -> examen
for e in EXTRAIDO["examenes"]:
    META[(e["facultad"], e["archivo"])] = e
    for p in e["preguntas"]:
        IDS[(e["facultad"], e["archivo"], p["n"])] = p["id"]


def cargar():
    """Devuelve la lista de preguntas de Ingenieria y Economicas (Medicina tiene otro formato y se analiza aparte)."""
    out = []
    for fac in ("ingenieria", "economicas"):
        carpeta = os.path.join(BANCO, fac)
        for f in sorted(os.listdir(carpeta)):
            if not f.endswith(".md"):
                continue
            arch = f[:-3]
            t = open(os.path.join(carpeta, f), encoding="utf-8").read()
            anio = int(re.search(r"^anio:\s*(\d+)", t, re.M).group(1))
            meta = META.get((fac, arch), {})
            cat = meta.get('categoria', '')
            parcial = bool(meta.get("secciones_pendientes")) or bool(meta.get("faltantes"))
            partes = re.split(r"^## Pregunta (\d+)\s*$", t, flags=re.M)
            for i in range(1, len(partes), 2):
                n = int(partes[i])
                cuerpo = partes[i + 1]
                area = (re.search(r"^area:\s*(\S+)", cuerpo, re.M) or [None, ""])[1]
                tema = (re.search(r"^tema:\s*(\S+)", cuerpo, re.M) or [None, ""])[1]
                resp = (re.search(r"^\*\*respuesta:\*\*\s*([A-E])", cuerpo, re.M) or [None, ""])[1]
                oE = (re.search(r"^- E\)\s*(.*)$", cuerpo, re.M) or [None, ""])[1].strip()
                fig = bool(re.search(r"^figura:", cuerpo, re.M))
                m = re.search(r"\*\*explicacion:\*\*(.*?)(?=^---\s*$|\Z)", cuerpo, re.M | re.S)
                expl = m.group(1) if m else ""
                pasos = len(re.findall(r"^\s*Paso\s+\d+\s*[·.:-]", expl, re.M))
                # enunciado = lo que va entre el encabezado y la primera opcion
                enun = re.split(r"^- [A-E]\)", cuerpo, flags=re.M)[0]
                enun = re.sub(r"^(area|tema|dificultad|figura):.*$", "", enun, flags=re.M).strip()
                out.append(
                    dict(
                        id=IDS.get((fac, arch, n), f"{fac}/{arch}#{n}"),
                        fac=fac, archivo=arch, anio=anio, n=n, area=area, tema=tema,
                        # area "matematicas" dentro de Ingenieria no existe como area del examen: queda fuera (igual que en mapa-de-temas)
                        familia=familia(fac, area, tema) if tema and not (fac == "ingenieria" and area == "matematicas") else None,
                        figura=fig, pasos=pasos, expl_len=len(expl), enunciado=enun,
                        parcial=parcial, categoria=cat, respuesta=resp, opcionE=oE,
                    )
                )
    return out


if __name__ == "__main__":
    q = cargar()
    print(len(q), sum(1 for x in q if x["familia"] is None))
