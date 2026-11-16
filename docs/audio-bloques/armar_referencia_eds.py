"""Arma libros_extraidos/EdS_texto_paginas.txt (formato «===== PAGINA N =====», el que lee aceptacion.py)
para calibrar las revisiones 1 y 2 del Libro 3 (EdS). Antes se comparaba contra Saladin (16-nov).
- Págs. con texto seleccionable: pdftotext del PDF del curso.
- Págs. 32-74 (escaneadas): las transcripciones limpias cotejadas con la imagen (PSA_2027_FUENTES/EdS_p*_limpio.*,
  marcas «[p.N]» o «=== p.N ===»); si una página no está ahí, el OCR crudo EdS_p32-74_texto_crudo.txt.
  OJO: para 32-74 la referencia es una transcripción, no el PDF; la rev. 1 ahí mide contra esa transcripción.
Uso: python armar_referencia_eds.py"""
import os, re, subprocess

AQUI = os.path.dirname(os.path.abspath(__file__))
MED = os.path.join(AQUI, "..", "..", "examenes pasados", "MEDICINA")
EXT = os.path.join(MED, "LIBROS DE MEDICINA", "libros_extraidos")
PDF = os.path.join(EXT, "Libros del curso básico de Medicina UMSS.Prepa William Osler", "EDUCACION EN SALUD E INVESTIGACION.pdf")
OCR = os.path.join(MED, "PSA_2027_FUENTES", "EdS_p32-74_texto_crudo.txt")
SAL = os.path.join(EXT, "EdS_texto_paginas.txt")

import glob
_MARCA = re.compile(r"^(?:\[p\.(\d+)\]|===\s*p\.(\d+)\s*===)$")


def leer_por_pagina(ruta: str) -> dict[int, list[str]]:
    d: dict[int, list[str]] = {}
    pag = None
    for linea in open(ruta, encoding="utf-8", errors="replace"):
        m = _MARCA.match(linea.strip())
        if m:
            pag = int(m.group(1) or m.group(2)); d[pag] = []
        elif pag is not None:
            d[pag].append(linea.rstrip("\n"))
    return d


ocr = leer_por_pagina(OCR)
for f in sorted(glob.glob(os.path.join(MED, "PSA_2027_FUENTES", "EdS_p*_limpio.*"))):
    for k, v in leer_por_pagina(f).items():
        if 32 <= k <= 74:
            ocr[k] = v

todo = subprocess.run(["pdftotext", "-layout", "-enc", "UTF-8", PDF, "-"], capture_output=True).stdout.decode("utf-8", "replace")
paginas = todo.split("\f")
out = []
for i, txt in enumerate(paginas, 1):
    if not txt.strip() and i > len(paginas) - 1:
        continue
    cuerpo = "\n".join(ocr[i]) if (i in ocr and (32 <= i <= 74 or len(txt.split()) < 30)) else re.sub(r"[ \t]+", " ", txt)
    out.append("===== PAGINA %d =====\n%s\n" % (i, cuerpo.strip()))
open(SAL, "w", encoding="utf-8").write("\n".join(out))
print("páginas:", len(out), "con OCR:", sum(1 for i in ocr if i <= len(paginas)), "->", SAL)
