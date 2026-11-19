# -*- coding: utf-8 -*-
"""Pone cada título del mapa (mapa_titulos/Calvo_tema_NN.json) en su propia línea del texto de voz. SOLO espacios y saltos de línea.
Uso: separar_titulos.py Tema_NN_Biologia_Celular [--seco]"""
import json, os, re, shutil, sys, unicodedata
AQUI = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA", "LIBROS DE MEDICINA")
def norm(s):
    s = unicodedata.normalize("NFD", s.lower()); s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]+", " ", s).split()
cap = sys.argv[1].replace(".md", "").replace("_LITERAL_TTS", "")
nn = re.match(r"Tema_(\d+)_", cap).group(1)
mapa = json.load(open(os.path.join(AQUI, "mapa_titulos", "Calvo_tema_%s.json" % nn), encoding="utf-8"))
ruta = os.path.join(LIB, "_TEXTO_LITERAL_VERIFICADO", cap + "_LITERAL_TTS.md")
t = open(ruta, encoding="utf-8").read()
toks = []  # (inicio, fin) de la palabra-con-espacios que contiene cada token normalizado
for m in re.finditer(r"\S+", t):
    for _ in norm(m.group(0)): toks.append((m.start(), m.end()))
cortes = set()
for ti in [mapa["titulo_capitulo"]] if False else []: pass
for x in mapa["titulos"] + [{"titulo": mapa["titulo_capitulo"], "palabra": 0}]:
    i = x.get("palabra"); n = len(norm(x["titulo"]))
    if i is None or n == 0 or i + n > len(toks): continue
    cortes.add(toks[i][0]); cortes.add(toks[i + n - 1][1])
nuevo = []; prev = 0
for c in sorted(cortes):
    nuevo.append(t[prev:c]); prev = c; nuevo.append("\n\n")
nuevo.append(t[prev:])
r = re.sub(r"[ \t]*\n\n[ \t]*(?:\n\n[ \t]*)*", "\n\n", "".join(nuevo)).strip("\n") + ("\n" if t.endswith("\n") else "")
assert re.sub(r"\s+", " ", r).strip() == re.sub(r"\s+", " ", t).strip(), "cambió algo más que espacios"
print(cap, "títulos separados:", len(cortes) // 2, "cambia" if r != t else "igual")
if "--seco" not in sys.argv and r != t:
    b = os.path.join(os.path.dirname(ruta), "bak_titulos_19nov"); os.makedirs(b, exist_ok=True)
    if not os.path.exists(os.path.join(b, os.path.basename(ruta))): shutil.copy2(ruta, os.path.join(b, os.path.basename(ruta)))
    open(ruta, "w", encoding="utf-8", newline="").write(r)
