# Muestra TODOS los hallazgos (revisiones 3-8) de un capítulo con ±N caracteres de contexto del texto. Uso: contexto_hallazgos.py <cap> [N]
import os, re, sys
from pathlib import Path
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
import aceptacion as A

LIB = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA")
cap = sys.argv[1].replace(".md", ""); N = int(sys.argv[2]) if len(sys.argv) > 2 else 220
if not cap.endswith("_LITERAL_TTS"): cap += "_LITERAL_TTS"
ruta = os.path.join(LIB, "PSA_2027_FUENTES", "audio_eds", cap + ".md") if cap.startswith("EdS_") else os.path.join(LIB, "LIBROS DE MEDICINA", "_TEXTO_LITERAL_VERIFICADO", cap + ".md")
t = open(ruta, encoding="utf-8").read()
siglas = A._cargar_siglas_medicina()
A_orig = A._dedup_limitar
A._dedup_limitar = lambda ej, limite=500: A_orig(ej, limite=500)
revs = [
    A._revision_3_relleno(t),
    A._revision_4_notas_pie(t),
    A._revision_5_figuras_tablas(t),
    A._revision_6_simbolos_iones_miles(t),
    A._revision_7_siglas_secciones_titulos(t, siglas),
    A._revision_8_palabras_partidas(t),
]
A.aplicar_excepciones(cap, revs)
for r in revs:
    if not r.ejemplos:
        continue
    print(f"\n=== REV {r.numero} ### {r.numero}. {r.nombre} ({r.fallas} fallas)")
    for h in r.ejemplos:
        s = h.split(": ", 1)[-1].strip()
        s = re.sub(r"^[.…\s]+|[.…\s]+$", "", s)
        pat = re.sub(r"\\\s+", r"\\s+", re.escape(s)) if s else ""
        pos = [m.start() for m in re.finditer(pat, t)] if pat else []
        print("-", h[:100], "| n=", len(pos))
        ventana = 950 if ("Antes de proseguir" in h or "Responda las siguientes" in h) else N
        for p in pos[:25]:
            print("     «" + t[max(0, p - 120 if ventana > N else p - N):p + len(s) + ventana].replace("\n", "¶") + "»")
