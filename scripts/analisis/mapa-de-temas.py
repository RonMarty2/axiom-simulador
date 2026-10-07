# Mapa de temas del banco. Uso: PYTHONIOENCODING=utf-8 python scripts/analisis/mapa-de-temas.py
# Solo LEE el banco; escribe data JSON a la carpeta indicada (por defecto la temporal)
import re, glob, os, json, sys, collections
RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, "scripts", "analisis", "mapa-de-temas.json")
preg = []; examenes = []
for f in sorted(glob.glob(os.path.join(RAIZ, "data/examenes/umss/*/*.md"))):
    t = open(f, encoding="utf-8").read()
    fac = f.replace("\\", "/").split("/")[-2]
    m = re.match(r"---\n(.*?)\n---\n(.*)", t, re.S)
    fm, body = m.group(1), m.group(2)
    anio = re.search(r"^anio:\s*(\d+)", fm, re.M)
    anio = int(anio.group(1)) if anio else None
    declarado = re.search(r"^total_preguntas:\s*(\d+)", fm, re.M)
    declarado = int(declarado.group(1)) if declarado else None
    parcial = bool(re.search(r"^secciones_pendientes:", fm, re.M))
    falt = bool(re.search(r"^faltantes:", fm, re.M))
    bloques = re.split(r"^## Pregunta (\d+)\s*$", body, flags=re.M)
    n = 0
    for i in range(1, len(bloques), 2):
        num = int(bloques[i]); b = bloques[i+1]
        head = b.split("\n\n")[0]
        a = re.search(r"^area:\s*(.*)$", head, re.M); te = re.search(r"^tema:\s*(.*)$", head, re.M)
        preg.append(dict(fac=fac, ex=os.path.basename(f)[:-3], anio=anio, num=num,
                         area=a.group(1).strip() if a else None, tema=te.group(1).strip() if te else None))
        n += 1
    examenes.append(dict(fac=fac, ex=os.path.basename(f)[:-3], anio=anio, n=n, declarado=declarado, parcial=parcial, falt=falt))
json.dump(dict(preg=preg, examenes=examenes), open(OUT, "w", encoding="utf-8"), ensure_ascii=False)
print(len(examenes), "examenes", len(preg), "preguntas")
for fac in ["ingenieria","economicas","medicina"]:
    ex=[e for e in examenes if e["fac"]==fac]; print(fac, len(ex), sum(e["n"] for e in ex), "parciales:", sum(e["parcial"] for e in ex), "con faltantes:", sum(e["falt"] for e in ex), "no cuadran n vs declarado:", [(e["ex"],e["n"],e["declarado"]) for e in ex if e["declarado"]!=e["n"]][:15])
print("sin area", sum(p["area"] is None for p in preg), "sin tema", sum(p["tema"] is None for p in preg))
