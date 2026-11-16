"""Auditoría de clave de Medicina (auditor-clave-oficial), en dos pasos.

  python scripts/medicina/auditar_clave.py ciego <examen.md> <salida.md>
      Saca enunciado y afirmaciones SIN respuesta ni explicación (para que agy
      busque el pasaje del libro sin conocer la clave).

  python scripts/medicina/auditar_clave.py comparar <examen.md> <veredictos.jsonl>
      Lee los veredictos (una línea JSON por pregunta: {"n":12,"v":["V","F","?"],
      "citas":[...]}) y deriva la letra con la clave del encabezado
      (misma cuenta que letraDeVeredicto de src/lib/axiom/combinacion.ts).
      En las preguntas "señale lo incorrecto" la letra marca la falsa.
      Imprime solo lo que no coincide o no se puede derivar.
"""
import json
import re
import sys


def preguntas(ruta):
    texto = open(ruta, encoding="utf-8").read()
    bloques = re.split(r"^## Pregunta (\d+)\s*$", texto, flags=re.M)
    for i in range(1, len(bloques), 2):
        n = int(bloques[i])
        cuerpo = bloques[i + 1].split("\n---")[0]
        area = re.search(r"^area:\s*(\S+)", cuerpo, re.M)
        resp = re.search(r"^\*\*respuesta:\*\*\s*(\S+)", cuerpo, re.M)
        lineas = cuerpo.split("\n")
        enun, afs = [], []
        for ln in lineas:
            m = re.match(r"^- (\d)\)\s*(.*)", ln)
            if m:
                afs.append(m.group(2).strip())
            elif ln.startswith("**respuesta"):
                break
            elif afs and ln.strip() and not ln.startswith(("area:", "tema:", "dificultad:")):
                afs[-1] += " " + ln.strip()
            elif not afs and ln.strip() and not re.match(r"^(area|tema|dificultad):", ln):
                enun.append(ln.strip())
        yield {
            "n": n,
            "area": area.group(1) if area else "?",
            "enunciado": " ".join(enun),
            "afirmaciones": afs,
            "respuesta": resp.group(1) if resp else None,
        }


def es_incorrecto(enun):
    return bool(re.search(r"incorrect|fals[oa]|no es cierto|excepto", enun, re.I))


def letra(vs):
    c = sum(vs)
    if len(vs) == 2:
        return "C" if c == 2 else "D" if c == 0 else ("A" if vs[0] else "B")
    if len(vs) == 3:
        if c == 3:
            return "D"
        if c == 0:
            return "E"
        if c == 2:
            return "2de3"
        return "A" if vs[0] else "B" if vs[1] else "C"
    return "?"


def ciego(examen, salida):
    out = []
    for p in preguntas(examen):
        out.append(f"## {p['n']} · {p['area']}")
        if p["enunciado"]:
            out.append(p["enunciado"])
        for i, a in enumerate(p["afirmaciones"], 1):
            out.append(f"{i}) {a}")
        out.append("")
    open(salida, "w", encoding="utf-8").write("\n".join(out))
    print(f"{salida}: {sum(1 for l in out if l.startswith('## '))} preguntas")


def comparar(examen, jsonl):
    ver = {}
    for ln in open(jsonl, encoding="utf-8"):
        ln = ln.strip()
        if ln:
            d = json.loads(ln)
            ver[int(d["n"])] = d
    total = coinc = 0
    for p in preguntas(examen):
        total += 1
        d = ver.get(p["n"])
        if not d:
            print(f"P{p['n']}: SIN VEREDICTO")
            continue
        vs = d["v"]
        if "?" in vs or len(vs) != len(p["afirmaciones"]):
            print(f"P{p['n']}: no derivable {vs} (md={p['respuesta']})")
            continue
        b = [x == "V" for x in vs]
        inc = es_incorrecto(p["enunciado"])
        if inc:
            b = [not x for x in b]
        l = letra(b)
        if l == p["respuesta"]:
            coinc += 1
        else:
            print(f"P{p['n']}: md={p['respuesta']} derivada={l} v={vs}{' (incorrecto)' if inc else ''}")
    print(f"total={total} coinciden={coinc}")


if __name__ == "__main__":
    {"ciego": ciego, "comparar": comparar}[sys.argv[1]](*sys.argv[2:])
