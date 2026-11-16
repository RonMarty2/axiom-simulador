"""Para cada afirmación de un examen ciego, saca los pasajes del libro que más se le parecen.

  python scripts/medicina/candidatos_libro.py <examen.ciego.md> <carpeta libros> <salida.md> [k=3]

Sirve para que agy (que no puede buscar en archivos) lea solo los candidatos. Busca por
raíces de palabra (6 letras, sin tildes), pesadas por lo raras que son en el libro (IDF),
en trozos de ~600 caracteres con su número de página. No decide nada.
"""
import math
import re
import sys
import unicodedata
from collections import Counter
from pathlib import Path

LIBRO_AREA = {"morfofuncion": "Saladin", "biologia_celular": "Calvo", "investigacion": "EdS"}
VACIAS = set("""considera siguientes afirmaciones sobre cierto correcto incorrecto entre tiene tienen esta este
estos estas para como cual cuales donde desde hasta pero sino tambien porque segun mediante durante
cada todo todos todas otro otra otros otras mismo misma sus las los del una uno unos unas que con por
mas menos muy son ser esta estan fue han hay sin sobre tras puede pueden parte forma llamada llamado""".split())


CORTAS = set("vih adn arn pcr ods rna dna atp sida nk gtp oms".split())


def plano(s):
    s = unicodedata.normalize("NFD", s.lower())
    return "".join(c for c in s if unicodedata.category(c) != "Mn")


def raices(s):
    return [w[:6] for w in re.findall(r"[a-z0-9]+", plano(s)) if (len(w) >= 4 or (len(w) >= 2 and any(c.isdigit() for c in w)) or w in CORTAS) and w not in VACIAS]


def trozos(ruta, largo=600):
    partes = re.split(r"=+ P[AÁ]GINA (\d+) =+", ruta.read_text(encoding="utf-8"))
    out = []
    for i in range(1, len(partes), 2):
        pag, txt = int(partes[i]), re.sub(r"\s+", " ", partes[i + 1]).strip()
        for j in range(0, max(len(txt), 1), largo // 2):  # solapados a la mitad
            t = txt[j:j + largo]
            if len(t) > 80:
                out.append((pag, t, set(raices(t))))
    return out


def main(ciego, carpeta, salida, k="3"):
    k = int(k)
    libros = {}
    for nombre in set(LIBRO_AREA.values()):
        tr = trozos(Path(carpeta) / f"{nombre}_texto_paginas.txt")
        df = Counter(r for _, _, rs in tr for r in rs)
        libros[nombre] = (tr, {r: math.log(len(tr) / (1 + c)) for r, c in df.items()})
    out = []
    for bloque in re.split(r"^## ", Path(ciego).read_text(encoding="utf-8"), flags=re.M)[1:]:
        lineas = bloque.strip().split("\n")
        cab = lineas[0]
        area = cab.split("·")[1].strip()
        nombre = LIBRO_AREA.get(area, "Saladin")
        tr, idf = libros[nombre]
        out.append(f"## {cab}  [libro: {nombre}]")
        enun = [l for l in lineas[1:] if not re.match(r"^\d\)", l)]
        out.extend(enun)
        contexto = set(raices(" ".join(enun)))
        for l in lineas[1:]:
            m = re.match(r"^(\d)\)\s*(.*)", l)
            if not m:
                continue
            out.append(f"\n### Afirmación {m.group(1)}: {m.group(2)}")
            q = set(raices(m.group(2))) | contexto
            puntos = sorted(((sum(idf.get(r, 0) for r in q & rs), pag, t) for pag, t, rs in tr), reverse=True)
            vistos = set()
            n = 0
            for sc, pag, t in puntos:
                if n >= k or sc <= 0:
                    break
                if (pag, t[:60]) in vistos:
                    continue
                vistos.add((pag, t[:60]))
                n += 1
                out.append(f"- C{n} · {nombre} pág. {pag}: «{t}»")
        out.append("")
    Path(salida).write_text("\n".join(out), encoding="utf-8")
    print(salida, len("\n".join(out)), "caracteres")


if __name__ == "__main__":
    main(*sys.argv[1:])
