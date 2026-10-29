"""Borrador de un examen: pasa un facsimil PDF a markdown con MinerU, EN LOCAL, y lo deja fuera del banco.
Solo en la maquina con los PDF (la de Ronald). Lo usan transcriptor-examenes, transcriptor-medicina y auditor-facsimil
como punto de partida; el borrador INVENTA cosas (caracteres chinos en escaneos, opciones mezcladas, borra la fecha del
encabezado), asi que nunca se copia al banco sin contrastarlo contra el render del PDF. Ver docs/repos/MinerU.md.

Instalacion, una vez (ruta corta: en rutas largas pip falla por el limite de Windows; la primera corrida baja 0,8 GB de modelos):
    python -m venv %LOCALAPPDATA%\\axiom-mineru
    %LOCALAPPDATA%\\axiom-mineru\\Scripts\\python -m pip install mineru

Uso:
    python scripts/pdf-a-borrador.py "examenes pasados/FCYT/2025-1-1op.pdf" [carpeta_salida] [--paginas 1-2]
Deja <carpeta_salida>/<nombre del pdf>.md (por defecto %TEMP%/axiom-borradores) e imprime la ruta.
NUNCA usa --remote: eso manda el PDF a mineru.net.
"""
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")


def mineru_kit():
    local = Path(os.environ.get("LOCALAPPDATA", "")) / "axiom-mineru" / "Scripts" / "mineru-kit.exe"
    if local.exists():
        return str(local)
    en_path = shutil.which("mineru-kit")
    if en_path:
        return en_path
    sys.exit("No encuentro mineru-kit. Instalalo como dice el encabezado de este script.")


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 2
    if any(a.startswith("--remote") or a == "--api-key" for a in argv):
        print("No: --remote manda el PDF a un servidor externo. Este script solo trabaja en local.")
        return 2
    paginas = None
    if "--paginas" in argv:
        i = argv.index("--paginas")
        paginas = argv[i + 1]
        argv = argv[:i] + argv[i + 2 :]
    pdf = Path(argv[0])
    if not pdf.is_file():
        print(f"No existe {pdf}")
        return 2
    salida = Path(argv[1]) if len(argv) > 1 else Path(tempfile.gettempdir()) / "axiom-borradores"
    salida.mkdir(parents=True, exist_ok=True)
    destino = salida / (pdf.stem + ".md")
    orden = [mineru_kit(), "parse", str(pdf), "-o", str(destino), "--tier", "basic"]
    if paginas:
        orden += ["--pages", paginas]
    r = subprocess.run(orden)
    if r.returncode != 0:
        print(f"MinerU fallo (salida {r.returncode})")
        return 1
    # segun la version, -o puede quedar como archivo o como carpeta con el .md adentro
    if destino.is_dir():
        mds = sorted(destino.rglob("*.md"))
        if not mds:
            print(f"MinerU no dejo ningun .md en {destino}")
            return 1
        destino = mds[0]
    print(f"Borrador: {destino}")
    print("Recordatorio: contar y leer las cinco opciones de cada pregunta contra el PDF, y sacar la fecha del encabezado del PDF.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
