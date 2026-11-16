"""Mapa de títulos de Calvo: índice (Table of Contents, págs 2-~12 de Calvo_texto_paginas.txt)
-> por capítulo, lista de títulos en orden; luego ubica cada título dentro del texto de audio
(_TEXTO_LITERAL_VERIFICADO/Tema_NN_Biologia_Celular_LITERAL_TTS.md) y dice posición en palabras.
Salida: docs/audio-bloques/mapa_titulos/Calvo_tema_NN.json. Solo reporta; no reescribe nada."""
import json, os, re, sys, unicodedata
AQUI = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA", "LIBROS DE MEDICINA")
OUT = os.path.join(AQUI, "mapa_titulos"); os.makedirs(OUT, exist_ok=True)
NO_NARR = re.compile(r"^(cuestiones|respuestas|bibliograf|autoevaluaci|glosario|lecturas recomendadas|ejercicios)", re.I)

def norm(s):
    s = unicodedata.normalize("NFD", s.lower()); s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]+", " ", s).split()

lineas = open(os.path.join(LIB, "libros_extraidos", "Calvo_texto_paginas.txt"), encoding="utf-8").read().split("\n")
caps, cur = [], None
for l in lineas[:600]:
    l = l.strip()
    if l.startswith("=== PÁGINA") or not l or re.fullmatch(r"\d+", l) or l == "Table of Contents": continue
    m = re.match(r"Cap[ií]tulo (\d+): (.*)", l)
    if m:
        if any(c["capitulo"] == int(m.group(1)) for c in caps): break  # el índice se repite: parar
        cur = {"capitulo": int(m.group(1)), "titulo_capitulo": m.group(2), "titulos": []}; caps.append(cur)
    elif cur is not None and len(l) > 3:
        cur["titulos"].append(l)
print("capitulos en el indice:", len(caps))

def ubicar(palabras, tit, desde):
    t = norm(tit); n = len(t)
    if n == 0: return None
    for i in range(desde, len(palabras) - n + 1):
        if palabras[i:i + n] == t: return i
    return None

for c in caps:
    f = os.path.join(LIB, "_TEXTO_LITERAL_VERIFICADO", "Tema_%02d_Biologia_Celular_LITERAL_TTS.md" % c["capitulo"])
    if not os.path.exists(f): continue
    txt = open(f, encoding="utf-8").read(); pal = norm(txt); pos = 0; res = []
    for t in c["titulos"]:
        i = ubicar(pal, t, pos)
        res.append({"nivel": 1, "titulo": t, "palabra": i, "narrable": not NO_NARR.match(t)})
        if i is not None: pos = i
    json.dump({"capitulo": c["capitulo"], "titulo_capitulo": c["titulo_capitulo"], "palabras_texto": len(pal), "titulos": res},
              open(os.path.join(OUT, "Calvo_tema_%02d.json" % c["capitulo"]), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    ok = sum(1 for r in res if r["palabra"] is not None)
    print("Tema %02d: %d titulos, ubicados %d" % (c["capitulo"], len(res), ok))
