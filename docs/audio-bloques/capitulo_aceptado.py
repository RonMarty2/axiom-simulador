"""Filtro del vigilante de voz: ¿el capítulo tiene informe de aceptación con las revisiones de TEXTO 1 a 8
aprobadas? Uso: capitulo_aceptado.py <nombre_sin_extension> -> exit 0 si APRUEBAN las 8, 1 si no (o sin informe).
Decisión del copiloto/Ronald 16-nov: solo se graba lo que pasó el protocolo."""
import os
import re
import sys

INFORMES = os.path.join(os.path.dirname(os.path.abspath(__file__)), "aceptacion")
_FILA = re.compile(r"^\|\s*(\d+)\s*\|[^|]*\|[^|]*\|\s*([^|]+?)\s*\|")


def estados_texto(nombre: str, carpeta: str = INFORMES) -> dict[int, str]:
    ruta = os.path.join(carpeta, nombre + ".md")
    if not os.path.isfile(ruta):
        return {}
    est: dict[int, str] = {}
    for linea in open(ruta, encoding="utf-8"):
        m = _FILA.match(linea)
        if m and 1 <= int(m.group(1)) <= 8:
            est[int(m.group(1))] = m.group(2).strip()
    return est


_TEXTO = re.compile(r'^- \*\*Texto:\*\* "?([^"\n]+?)"?\s*$')


def informe_vigente(nombre: str, carpeta: str = INFORMES) -> bool:
    """El informe debe ser más nuevo que el texto que revisó: si el texto se corrigió después, no vale."""
    ruta = os.path.join(carpeta, nombre + ".md")
    for linea in open(ruta, encoding="utf-8"):
        m = _TEXTO.match(linea.strip())
        if m:
            txt = m.group(1)
            if not os.path.isabs(txt):  # aceptacion.py escribe rutas relativas a la raíz del repo
                txt = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", txt)
            elif not os.path.isfile(txt):  # 19-11: informe hecho en OTRA PC (ruta absoluta de esa PC): se busca en esta
                raiz = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
                partes = re.split(r"[\\/]", txt)
                if "examenes pasados" in partes:
                    txt = os.path.join(raiz, *partes[partes.index("examenes pasados"):])
            return os.path.isfile(txt) and os.path.getmtime(ruta) >= os.path.getmtime(txt)
    return False


def aceptado(nombre: str, carpeta: str = INFORMES) -> bool:
    est = estados_texto(nombre, carpeta)
    return len(est) == 8 and all(v == "APRUEBA" for v in est.values()) and informe_vigente(nombre, carpeta)


if __name__ == "__main__":
    sys.exit(0 if len(sys.argv) > 1 and aceptado(sys.argv[1]) else 1)
