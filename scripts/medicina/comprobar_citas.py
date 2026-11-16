"""Comprueba que cada cita de un veredictos.jsonl esté LITERAL en el libro y en la página dicha.

  python scripts/medicina/comprobar_citas.py <veredictos.jsonl> <carpeta con *_texto_paginas.txt>

Compara sin espacios repetidos ni guiones de corte de línea. Acepta la página dicha o
la siguiente/anterior (el pasaje puede cruzar la marca). Imprime solo las que fallan.
"""
import json
import re
import sys
from pathlib import Path

LIBRO = {"saladin": "Saladin", "calvo": "Calvo", "eds": "EdS", "educación": "EdS", "educacion": "EdS"}


def norm(s):
    s = s.replace("­", "").replace("ﬁ", "fi").replace("ﬂ", "fl")
    s = re.sub(r"\s+", "", s)
    return s.lower()


def paginas(ruta):
    partes = re.split(r"=+ P[AÁ]GINA (\d+) =+", ruta.read_text(encoding="utf-8"))
    return {int(partes[i]): norm(partes[i + 1]) for i in range(1, len(partes), 2)}


def main(jsonl, carpeta):
    libros = {}
    for f in Path(carpeta).glob("*_texto_paginas.txt"):
        libros[f.name.split("_")[0]] = paginas(f)
    ok = mal = 0
    for ln in open(jsonl, encoding="utf-8"):
        if not ln.strip():
            continue
        d = json.loads(ln)
        for c in d.get("citas", []):
            nombre = LIBRO.get(str(c.get("libro", "")).split()[0].lower().strip(".,"), c.get("libro"))
            pags = libros.get(nombre)
            t = norm(c.get("texto", ""))
            pag = int(c.get("pag") or 0)
            if not pags or not t:
                print(f"P{d['n']} af{c.get('af')}: libro/texto vacío ({c.get('libro')})")
                mal += 1
                continue
            cerca = "".join(pags.get(p, "") for p in (pag - 1, pag, pag + 1))
            if t in cerca:
                ok += 1
            elif any(t in v for v in pags.values()):
                ok += 1
                print(f"P{d['n']} af{c.get('af')}: literal pero en otra página (dijo {pag})")
            else:
                mal += 1
                print(f"P{d['n']} af{c.get('af')}: NO LITERAL «{c.get('texto','')[:90]}»")
    print(f"citas literales={ok} fallan={mal}")


if __name__ == "__main__":
    main(*sys.argv[1:])
