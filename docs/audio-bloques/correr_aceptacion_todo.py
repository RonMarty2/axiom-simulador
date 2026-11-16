"""Corre aceptacion.py (revisiones 1-8, texto) sobre TODOS los textos que van a _AUDIO_V2
(_TEXTO_LITERAL_VERIFICADO + audio_eds del Libro 3) y arma docs/audio-bloques/aceptacion/RESUMEN.md
(tabla: por revisión, qué capítulos fallan). Las revisiones de audio (9-12) quedan «sin revisar»
hasta pasar el audio. Se puede relanzar: salta los capítulos con informe más nuevo que el texto."""
import glob, os, re, subprocess, sys, time

AQUI = os.path.dirname(os.path.abspath(__file__))
PY = sys.executable
LIB = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA")
OUT = os.path.join(AQUI, "aceptacion")
TXT = os.path.join(LIB, "LIBROS DE MEDICINA", "_TEXTO_LITERAL_VERIFICADO")
EXT = os.path.join(LIB, "LIBROS DE MEDICINA", "libros_extraidos")
os.makedirs(OUT, exist_ok=True)

textos = sorted(glob.glob(os.path.join(TXT, "*_LITERAL_TTS.md"))) + sorted(glob.glob(os.path.join(LIB, "PSA_2027_FUENTES", "audio_eds", "EdS_*_LITERAL_TTS.md")))
filas = {}
for f in textos:
    nombre = os.path.basename(f)[:-3]
    informe = os.path.join(OUT, nombre + ".md")
    # 16-nov: también se re-evalúa si cambió el evaluador o las excepciones revisadas
    dep = max(os.path.getmtime(f), os.path.getmtime(os.path.join(AQUI, "aceptacion.py")),
              os.path.getmtime(os.path.join(OUT, "excepciones.json")) if os.path.exists(os.path.join(OUT, "excepciones.json")) else 0)
    if not (os.path.exists(informe) and os.path.getmtime(informe) > dep):
        cmd = [PY, os.path.join(AQUI, "aceptacion.py"), f, "--salida", OUT]
        if "Saladin" in nombre:
            cmd += ["--pdf-texto", os.path.join(EXT, "Saladin_texto_paginas.txt")]
        elif "Biologia_Celular" in nombre:
            cmd += ["--pdf-texto", os.path.join(EXT, "Calvo_texto_paginas.txt")]
        elif nombre.startswith("EdS_"):  # 16-nov: antes caía en Saladin; armar_referencia_eds.py arma esta
            cmd += ["--pdf-texto", os.path.join(EXT, "EdS_texto_paginas.txt")]
        t = time.time()
        r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=1800)
        print("%-60s %5.0fs rc=%s" % (nombre, time.time() - t, r.returncode), flush=True)
    if not os.path.exists(informe):
        filas[nombre] = None
        continue
    est = {}
    for l in open(informe, encoding="utf-8"):
        m = re.match(r"\|\s*(\d+)\s*\|[^|]*\|[^|]*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|", l)
        if m:
            est[int(m.group(1))] = (m.group(2), m.group(3))
    filas[nombre] = est

L = ["# Resumen de aceptación: textos que van a V2 (revisiones 1-8)", "",
     "Generado por `correr_aceptacion_todo.py`. Las revisiones 9-12 (audio) siguen «sin revisar» hasta pasar el audio. Los 496 publicados: ver sección final.", "",
     "## Capítulos que fallan, por revisión", ""]
nombres = [n for n in filas]
for r in range(1, 9):
    mal = [n for n in nombres if filas[n] and filas[n].get(r, ("",))[0] == "FALLA"]
    sin = [n for n in nombres if filas[n] and filas[n].get(r, ("",))[0] == "sin revisar"]
    L.append("- **Revisión %d**: %d de %d fallan%s" % (r, len(mal), len(nombres), (" (sin revisar: %d)" % len(sin)) if sin else ""))
    if mal:
        L.append("  - " + ", ".join(n.replace("_LITERAL_TTS", "") for n in mal))
aprueban = [n for n in nombres if filas[n] and all(filas[n].get(r, ("",))[0] in ("APRUEBA",) for r in range(1, 9))]
L += ["", "**Aprueban las 8 de texto:** %d de %d" % (len(aprueban), len(nombres))]
if aprueban:
    L.append("- " + ", ".join(n.replace("_LITERAL_TTS", "") for n in aprueban))
L += ["", "## Tabla por capítulo (fallas / revisado en cada revisión)", "", "| Capítulo | " + " | ".join(str(r) for r in range(1, 9)) + " |", "|---|" + "---|" * 8]
for n in nombres:
    e = filas[n]
    L.append("| %s | " % n.replace("_LITERAL_TTS", "") + " | ".join(("%s" % (e[r][1] if e and r in e else "?")) for r in range(1, 9)) + " |")
# 16-nov: sección de los publicados (AUDIOS_MEDICINA_UMSS), desde medir_cierres_publicados.py -> medicion_cierres.csv
CSV = os.path.join(AQUI, "medicion_cierres.csv")
if os.path.exists(CSV):
    import csv
    filas_p = list(csv.DictReader(open(CSV, encoding="utf-8")))
    partes = [f for f in filas_p if f["es_completo"] == "0"]
    comp = [f for f in filas_p if f["es_completo"] == "1"]

    def cuenta(grupo, campo, malo="0"):
        return sum(1 for f in grupo if f[campo] == malo)

    alguna = [f for f in partes if f["frase_completa"] == "0" or f["no_narrable"] == "1" or f["dur_ok"] == "0"]
    L += ["", "## Los %d publicados (AUDIOS_MEDICINA_UMSS): solo bordes (rev. 10 parcial)" % len(filas_p), "",
          "Medido con Whisper sobre los primeros y últimos segundos de cada MP3 (`medir_cierres_publicados.py`). "
          "Las demás revisiones de audio (9, 11, 12) siguen sin revisar en los publicados.", "",
          "| Falla | Partes (%d) | Completos (%d) |" % (len(partes), len(comp)), "|---|---|---|",
          "| Termina a media frase | %d | %d |" % (cuenta(partes, "frase_completa"), cuenta(comp, "frase_completa")),
          "| Termina en material no narrable (bibliografía, preguntas, créditos) | %d | %d |" % (cuenta(partes, "no_narrable", "1"), cuenta(comp, "no_narrable", "1")),
          "| Duración fuera de 3-20 min | %d | no aplica |" % cuenta(partes, "dur_ok"), "",
          "**Partes con al menos una falla de borde:** %d de %d. Ninguno se reemplaza sin OK de Ronald." % (len(alguna), len(partes))]
open(os.path.join(OUT, "RESUMEN.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")
print("RESUMEN.md listo:", len(nombres), "capitulos")
