# -*- coding: utf-8 -*-
"""Pone en su propia línea los títulos, pies de figura y recuadros que quedaron pegados al párrafo (regla 18).
SOLO inserta saltos de línea (no cambia ninguna palabra: la lectura es literal). Respaldo en bak_estructura_19nov.
Uso: arreglar_estructura.py <archivo.md> [--solo-reportar]"""
import os, re, shutil, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import aceptacion as ac

def arreglar(texto: str) -> tuple[str, int]:
    n = 0
    def sep(m):
        nonlocal n
        n += 1
        return "\n\n" + m.group(0).lstrip(" \t")
    texto = ac._REV7_TITULO_PEGADO_RE.sub(sep, texto)
    # recuadro «CONOCIMIENTO MÁS A FONDO» pegado a lo anterior (no si ya empieza línea)
    texto = re.sub(r"(?<=[^\n \t])[ \t]+(?=CONOCIMIENTO\s+M[ÁA]S\s+A\s+FONDO\b)", lambda m: (sep(m) and "") or "\n\n", texto) if False else \
        re.sub(r"(?<=[^\n])[ \t]+(CONOCIMIENTO\s+M[ÁA]S\s+A\s+FONDO\b)", lambda m: (globals().__setitem__("_c", 1) or "\n\n" + m.group(1)), texto)
    return texto, n

if __name__ == "__main__":
    ruta = sys.argv[1]
    t = open(ruta, encoding="utf-8").read()
    nuevo, n = arreglar(t)
    # verificación: sin las líneas nuevas el texto es idéntico
    assert re.sub(r"\s+", " ", nuevo).strip() == re.sub(r"\s+", " ", t).strip(), "cambió algo más que espacios"
    if "--solo-reportar" not in sys.argv and nuevo != t:
        bak = os.path.join(os.path.dirname(ruta), "bak_estructura_19nov"); os.makedirs(bak, exist_ok=True)
        b = os.path.join(bak, os.path.basename(ruta))
        if not os.path.exists(b): shutil.copy2(ruta, b)
        open(ruta, "w", encoding="utf-8", newline="").write(nuevo)
    print(os.path.basename(ruta), "titulos separados:", n, "| cambia" if nuevo != t else "| igual")
