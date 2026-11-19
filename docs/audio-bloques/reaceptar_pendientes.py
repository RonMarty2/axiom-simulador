# Regenera los informes de aceptación (revisiones 1-8) de los capítulos que el vigilante espera. Uso: reaceptar_pendientes.py [nombre ...]
import glob, os, subprocess, sys
AQUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, AQUI)
from capitulo_aceptado import aceptado
LIB = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA"); EXT = os.path.join(LIB, "LIBROS DE MEDICINA", "libros_extraidos")
D = os.path.join(LIB, "LIBROS DE MEDICINA", "_TEXTO_LITERAL_VERIFICADO"); EDS = os.path.join(LIB, "PSA_2027_FUENTES", "audio_eds")
nombres = sys.argv[1:] or ([os.path.basename(p)[:-5] for p in sorted(glob.glob(os.path.join(AQUI, "plan", "*.json")))] + [os.path.basename(p)[:-3] for p in sorted(glob.glob(os.path.join(EDS, "EdS_*_LITERAL_TTS.md")))])
for n in nombres:
    n = n.replace(".md", ""); n = n if n.endswith("_LITERAL_TTS") else n + "_LITERAL_TTS"
    f = os.path.join(EDS if n.startswith("EdS_") else D, n + ".md")
    pdf = os.path.join(EXT, "EdS_texto_paginas.txt" if n.startswith("EdS_") else ("Saladin_texto_paginas.txt" if "Saladin" in n else "Calvo_texto_paginas.txt"))
    subprocess.run([sys.executable, os.path.join(AQUI, "aceptacion.py"), f, "--pdf-texto", pdf, "--salida", os.path.join(AQUI, "aceptacion")], capture_output=True)
    print("hecho", n, "ACEPTADO" if aceptado(n) else "no", flush=True)
