# Muestra cada hallazgo (revisiones 3-8) de un capítulo con ±N caracteres de contexto del texto. Uso: contexto_hallazgos.py <cap> [N]
import os, re, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
LIB = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA")
cap = sys.argv[1].replace(".md", ""); N = int(sys.argv[2]) if len(sys.argv) > 2 else 160
if not cap.endswith("_LITERAL_TTS"): cap += "_LITERAL_TTS"
ruta = os.path.join(LIB, "PSA_2027_FUENTES", "audio_eds", cap + ".md") if cap.startswith("EdS_") else os.path.join(LIB, "LIBROS DE MEDICINA", "_TEXTO_LITERAL_VERIFICADO", cap + ".md")
t = open(ruta, encoding="utf-8").read()
rev = 0
for l in open(os.path.join(AQUI, "aceptacion", cap + ".md"), encoding="utf-8"):
    m = re.match(r"### (\d+)\.", l)
    if m: rev = int(m.group(1)); print("\n=== REV", rev, l.strip()); continue
    if rev in (1,2,9,10,11,12) or not l.startswith("- ") or l.startswith("- **"): continue
    h = l[2:].strip(); s = h.split(": ", 1)[-1].strip()
    s = re.sub(r"^[.…]+|[.…]+$", "", s)
    pos = [m.start() for m in re.finditer(re.escape(s), t)] if s else []
    print("-", h[:100], "| n=", len(pos))
    for p in pos[:2]:
        print("     «" + t[max(0, p - N):p + len(s) + N].replace("\n", "¶") + "»")
