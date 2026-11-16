"""Mide cómo empiezan y terminan los MP3 publicados (AUDIOS_MEDICINA_UMSS).
Whisper (small, cpu) a los primeros y últimos 15 s de cada parte. Criterios provisionales
(sin mapa de títulos): frase completa al cerrar, no cerrar en material no narrable
(preguntas, glosario, tabla), duración 3-20 min. Salida: medicion_cierres.csv (se reanuda)."""
import csv, glob, os, re, subprocess, tempfile
from faster_whisper import WhisperModel

AQUI = os.path.dirname(os.path.abspath(__file__))
R = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA", "LIBROS DE MEDICINA", "AUDIOS_MEDICINA_UMSS")
OUT = os.path.join(AQUI, "medicion_cierres.csv")
NO_NARRABLE = re.compile(r"autoevaluaci|preguntas? de|glosario|bibliograf|ejercicio|iguala|verdadero|falso|describa|explique|responda|cuestionario", re.I)


def dur(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).decode().strip())


def trozo(m, f, ini, t):
    w = tempfile.mktemp(suffix=".wav")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(max(0, ini)), "-t", str(t), "-i", f, "-ac", "1", "-ar", "16000", w], check=True)
    s, _ = m.transcribe(w, language="es")
    txt = " ".join(x.text.strip() for x in s)
    os.remove(w)
    return txt


hechos = set()
if os.path.exists(OUT):
    hechos = {r["archivo"] for r in csv.DictReader(open(OUT, encoding="utf-8"))}
m = WhisperModel("small", device="cpu", compute_type="int8")
nuevo = not os.path.exists(OUT)
fh = open(OUT, "a", newline="", encoding="utf-8")
w = csv.writer(fh)
if nuevo:
    w.writerow(["archivo", "es_completo", "min", "inicio", "final", "frase_completa", "no_narrable", "dur_ok"])
for f in sorted(glob.glob(os.path.join(R, "**", "*.mp3"), recursive=True)):
    b = os.path.basename(f)
    if b in hechos:
        continue
    d = dur(f)
    ini = trozo(m, f, 0, 15)
    fin = trozo(m, f, d - 15, 15)
    comp = bool(re.search(r"[.?!»”\"]\s*$", fin.strip()))
    nn = bool(NO_NARRABLE.search(fin))
    es_c = "_Completo_" in b
    w.writerow([b, int(es_c), round(d / 60, 1), ini[:120], fin[-160:], int(comp), int(nn), int(es_c or 3 <= d / 60 <= 20)])
    fh.flush()
print("FIN")
