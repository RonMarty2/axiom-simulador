# -*- coding: utf-8 -*-
"""Aplica ediciones [{"capitulo","buscar","reemplazar"}] a los textos de voz. Cada «buscar» debe aparecer EXACTAMENTE una vez.
Respaldo único por capítulo en bak_ediciones_19nov/. Uso: aplicar_ediciones.py ediciones.json [--seco]"""
import json, os, shutil, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA")
def ruta(cap):
    cap = cap.replace(".md", "")
    if not cap.endswith("_LITERAL_TTS"): cap += "_LITERAL_TTS"
    return os.path.join(LIB, "PSA_2027_FUENTES", "audio_eds") if cap.startswith("EdS_") else os.path.join(LIB, "LIBROS DE MEDICINA", "_TEXTO_LITERAL_VERIFICADO"), cap + ".md"
ed = json.load(open(sys.argv[1], encoding="utf-8")); seco = "--seco" in sys.argv
por = {}
for e in ed:
    if e.get("reemplazar") is None or not e.get("buscar"): continue
    por.setdefault(e["capitulo"], []).append(e)
ok = mal = 0
for cap, lista in por.items():
    d, f = ruta(cap); p = os.path.join(d, f); t = open(p, encoding="utf-8").read(); o = t
    for e in lista:
        n = t.count(e["buscar"])
        if n != 1: mal += 1; print("NO APLICA (%d coincidencias) %s: %s" % (n, cap, e["buscar"][:70])); continue
        t = t.replace(e["buscar"], e["reemplazar"]); ok += 1
    if t != o and not seco:
        b = os.path.join(d, "bak_ediciones_19nov"); os.makedirs(b, exist_ok=True)
        if not os.path.exists(os.path.join(b, f)): shutil.copy2(p, os.path.join(b, f))
        open(p, "w", encoding="utf-8", newline="").write(t)
print("aplicadas", ok, "| no aplican", mal, "(seco)" if seco else "")
