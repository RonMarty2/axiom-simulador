# -*- coding: utf-8 -*-
"""Genera un plan de sintesis TTS que reusa bloques de cache por texto exacto."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path

_SCRIPT_DIR = Path(__file__).resolve().parent
for _cand in (_SCRIPT_DIR / "script_agy", _SCRIPT_DIR / "scripts" / "audio"):
    if (_cand / "bloques_afectados.py").is_file() and str(_cand) not in sys.path:
        sys.path.insert(0, str(_cand))
        break

import bloques_afectados as B  # noqa: E402

MAX_PALABRAS_BLOQUE = 100
TAMANO_MIN_WAV = 1000
LARGO_INICIO = 60
NOMBRE_RESPALDO = "_RESPALDO_TEXTO_LITERAL_2026-11-15_antes_de_recorte"
NOMBRE_TEXTOS = "_TEXTO_LITERAL_VERIFICADO"
DIR_SALIDA_DEFECTO = "plan"

# Misma logica de cuentaA.py separada por tipo para detallar el motivo.
IONES_RE = re.compile(r"\b(?:Na|K|Ca|Cl|H|Mg|Fe|Zn|Cu)\d?[+\u2212-](?=\W|$)")
MU_RE = re.compile(r"[\u00b5\u03bc](?:m|mol|g|l|L)\b")


@dataclass
class ResumenCapitulo:
    """Resumen del plan calculado para un capitulo."""

    capitulo: str
    carpeta_cache: str
    mapeable: bool
    bloques_viejos: int
    bloques_nuevos: int
    audios_cache: int
    reusar: int
    sintetizar_nuevos: int
    sintetizar_error: int
    motivo_sin_mapa: str = ""


def carpeta_cache_de_stem(stem: str) -> str:
    """Aplica la regla de coincide.py para mapear el nombre del .md a su carpeta en _cache."""
    m = re.match(r"Tema_(\d+)_Morfo_Saladin", stem)
    if m:
        return f"Morfo_Cap_{m[1]}_Saladin_LITERAL_TTS"
    if stem.startswith("Atlas_B"):
        return "Morfo_Atlas_B_Saladin_LITERAL_TTS"
    return stem


def detectar_error_audible(texto_bloque: str) -> list[str]:
    """
    Detecta errores audibles con la misma logica de cuentaA.py:
    iones (Na+, K+, Ca2+, Cl−...), micro (μm/μmol/μg/μl/μL) o miles leidos como decimal.
    """
    razones: list[str] = []
    if IONES_RE.search(texto_bloque):
        razones.append("iones")
    if MU_RE.search(texto_bloque):
        razones.append("mu")
    if B.detectar_miles_en_palabras(texto_bloque):
        razones.append("miles como decimal")
    return razones


def resumir_inicio(texto_bloque: str, max_chars: int = LARGO_INICIO) -> str:
    """Devuelve los primeros max_chars caracteres en una sola linea."""
    limpio = re.sub(r"\s+", " ", texto_bloque).strip()
    return limpio[:max_chars]


def _contar_wavs_validos(dir_cache: Path) -> int:
    """Cuenta archivos parte_*.wav validos (>1000 bytes), o -1 si no existe la carpeta."""
    if not dir_cache.is_dir():
        return -1
    return sum(
        1
        for w in dir_cache.glob("parte_*.wav")
        if w.is_file() and w.stat().st_size > TAMANO_MIN_WAV
    )


def planificar_capitulo(
    ruta_md_actual: Path,
    dir_respaldo: Path,
    dir_cache_raiz: Path,
) -> tuple[list[dict] | None, ResumenCapitulo]:
    """
    Calcula el plan de un capitulo comparando texto actual, respaldo y _cache.
    Devuelve (lista_items, resumen); lista_items es None cuando el capitulo es SIN_MAPA.
    """
    stem = ruta_md_actual.stem
    carpeta_cache = carpeta_cache_de_stem(stem)
    dir_cache = dir_cache_raiz / carpeta_cache

    texto_actual = ruta_md_actual.read_text(encoding="utf-8")
    bloques_nuevos = B.dividir_capitulo_en_bloques(
        texto_actual, max_palabras=MAX_PALABRAS_BLOQUE
    )

    ruta_respaldo = dir_respaldo / ruta_md_actual.name
    num_wavs = _contar_wavs_validos(dir_cache)

    if not ruta_respaldo.is_file():
        return None, ResumenCapitulo(
            capitulo=stem,
            carpeta_cache=carpeta_cache,
            mapeable=False,
            bloques_viejos=0,
            bloques_nuevos=len(bloques_nuevos),
            audios_cache=num_wavs,
            reusar=0,
            sintetizar_nuevos=0,
            sintetizar_error=0,
            motivo_sin_mapa="sin archivo de respaldo",
        )

    texto_viejo = ruta_respaldo.read_text(encoding="utf-8")
    bloques_viejos = B.dividir_capitulo_en_bloques(
        texto_viejo, max_palabras=MAX_PALABRAS_BLOQUE
    )

    mapeable = (
        dir_cache.is_dir()
        and len(bloques_viejos) > 0
        and num_wavs == len(bloques_viejos)
        and all(
            (dir_cache / f"parte_{i:03d}.wav").is_file()
            and (dir_cache / f"parte_{i:03d}.wav").stat().st_size > TAMANO_MIN_WAV
            for i in range(1, len(bloques_viejos) + 1)
        )
    )

    if not mapeable:
        motivo = (
            "sin carpeta en cache"
            if num_wavs < 0
            else "cantidad distinta de bloques viejos y wavs"
        )
        return None, ResumenCapitulo(
            capitulo=stem,
            carpeta_cache=carpeta_cache,
            mapeable=False,
            bloques_viejos=len(bloques_viejos),
            bloques_nuevos=len(bloques_nuevos),
            audios_cache=num_wavs,
            reusar=0,
            sintetizar_nuevos=0,
            sintetizar_error=0,
            motivo_sin_mapa=motivo,
        )

    indice_viejo_por_texto: dict[str, int] = {}
    for i, b_viejo in enumerate(bloques_viejos, start=1):
        indice_viejo_por_texto.setdefault(b_viejo, i)

    plan: list[dict] = []
    reusar = 0
    sintetizar_nuevos = 0
    sintetizar_error = 0

    for j, b_nuevo in enumerate(bloques_nuevos, start=1):
        i_viejo = indice_viejo_por_texto.get(b_nuevo)
        inicio = resumir_inicio(b_nuevo)

        if i_viejo is None:
            sintetizar_nuevos += 1
            plan.append(
                {
                    "j": j,
                    "accion": "SINTETIZAR",
                    "origen": None,
                    "motivo": "nuevo",
                    "texto_inicio": inicio,
                }
            )
            continue

        parte_origen = f"parte_{i_viejo:03d}.wav"
        errores = detectar_error_audible(b_nuevo)
        if errores:
            sintetizar_error += 1
            plan.append(
                {
                    "j": j,
                    "accion": "SINTETIZAR",
                    "origen": None,
                    "motivo": f"error audible ({', '.join(errores)}; antes {parte_origen})",
                    "texto_inicio": inicio,
                }
            )
        else:
            reusar += 1
            plan.append(
                {
                    "j": j,
                    "accion": "REUSAR",
                    "origen": parte_origen,
                    "motivo": "texto identico",
                    "texto_inicio": inicio,
                }
            )

    resumen = ResumenCapitulo(
        capitulo=stem,
        carpeta_cache=carpeta_cache,
        mapeable=True,
        bloques_viejos=len(bloques_viejos),
        bloques_nuevos=len(bloques_nuevos),
        audios_cache=num_wavs,
        reusar=reusar,
        sintetizar_nuevos=sintetizar_nuevos,
        sintetizar_error=sintetizar_error,
    )
    return plan, resumen


def formatear_resumen(resumenes: list[ResumenCapitulo]) -> str:
    """Genera el texto completo de RESUMEN.txt con mapeables, SIN_MAPA y totales."""
    mapeables = [r for r in resumenes if r.mapeable]
    sin_mapa = [r for r in resumenes if not r.mapeable]

    lineas: list[str] = ["=== CAPITULOS MAPEABLES ==="]
    if mapeables:
        lineas.append(
            f"{'Capitulo':<48} | {'Bloques':>7} | {'Reusar':>6} | {'Sint.nuevo':>10} | {'Sint.error':>10}"
        )
        lineas.append("-" * 92)
        for r in mapeables:
            lineas.append(
                f"{r.capitulo:<48} | {r.bloques_nuevos:>7} | {r.reusar:>6} | {r.sintetizar_nuevos:>10} | {r.sintetizar_error:>10}"
            )
        lineas.append("-" * 92)
        tot_bloques = sum(r.bloques_nuevos for r in mapeables)
        tot_reusar = sum(r.reusar for r in mapeables)
        tot_nuevos = sum(r.sintetizar_nuevos for r in mapeables)
        tot_error = sum(r.sintetizar_error for r in mapeables)
        lineas.append(
            f"{'TOTAL MAPEABLES':<48} | {tot_bloques:>7} | {tot_reusar:>6} | {tot_nuevos:>10} | {tot_error:>10}"
        )
    else:
        lineas.append("(ninguno)")

    lineas.append("")
    lineas.append("=== SIN_MAPA (no se tocan) ===")
    if sin_mapa:
        for r in sin_mapa:
            lineas.append(
                f"{r.capitulo}: texto_viejo {r.bloques_viejos} / audio {r.audios_cache} "
                f"(texto_actual {r.bloques_nuevos}) [{r.motivo_sin_mapa}]"
            )
    else:
        lineas.append("(ninguno)")

    lineas.append("")
    lineas.append("=== TOTALES GLOBALES ===")
    lineas.append(f"Capitulos analizados: {len(resumenes)}")
    lineas.append(f"Capitulos mapeables : {len(mapeables)}")
    lineas.append(f"Capitulos SIN_MAPA  : {len(sin_mapa)}")
    lineas.append(
        f"Bloques nuevos totales (mapeables): {sum(r.bloques_nuevos for r in mapeables)}"
    )
    lineas.append(f"Reusar              : {sum(r.reusar for r in mapeables)}")
    lineas.append(
        f"Sintetizar (nuevo)  : {sum(r.sintetizar_nuevos for r in mapeables)}"
    )
    lineas.append(
        f"Sintetizar (error)  : {sum(r.sintetizar_error for r in mapeables)}"
    )
    return "\n".join(lineas) + "\n"


def ejecutar(ruta_motor_audio: Path, dir_salida: Path) -> list[ResumenCapitulo]:
    """Analiza todos los *_LITERAL_TTS.md y escribe <capitulo>.json y RESUMEN.txt."""
    motor = ruta_motor_audio.resolve()
    base_libros = motor.parent
    dir_textos = base_libros / NOMBRE_TEXTOS
    dir_respaldo = base_libros / NOMBRE_RESPALDO
    dir_cache_raiz = motor / "_cache"

    if not dir_textos.is_dir():
        raise FileNotFoundError(f"No existe la carpeta de textos: {dir_textos}")
    if not dir_respaldo.is_dir():
        raise FileNotFoundError(f"No existe la carpeta de respaldo: {dir_respaldo}")

    archivos = sorted(dir_textos.glob("*_LITERAL_TTS.md"))
    if not archivos:
        raise FileNotFoundError(
            f"No se encontraron archivos *_LITERAL_TTS.md en: {dir_textos}"
        )

    dir_salida.mkdir(parents=True, exist_ok=True)
    resumenes: list[ResumenCapitulo] = []

    for ruta_md in archivos:
        plan, resumen = planificar_capitulo(
            ruta_md_actual=ruta_md,
            dir_respaldo=dir_respaldo,
            dir_cache_raiz=dir_cache_raiz,
        )
        resumenes.append(resumen)
        if plan is not None:
            ruta_json = dir_salida / f"{ruta_md.stem}.json"
            ruta_json.write_text(
                json.dumps(plan, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )

    ruta_resumen = dir_salida / "RESUMEN.txt"
    ruta_resumen.write_text(formatear_resumen(resumenes), encoding="utf-8")
    return resumenes


def main(argv: list[str] | None = None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    parser = argparse.ArgumentParser(
        description=(
            "Genera planes de sintesis que reusan bloques de _cache por texto exacto."
        )
    )
    parser.add_argument("ruta_motor_audio", help="Ruta a la carpeta _MOTOR_AUDIO")
    parser.add_argument(
        "--salida",
        default=DIR_SALIDA_DEFECTO,
        help=f"Carpeta de salida para <capitulo>.json y RESUMEN.txt (por defecto: {DIR_SALIDA_DEFECTO})",
    )
    args = parser.parse_args(argv)

    try:
        resumenes = ejecutar(
            ruta_motor_audio=Path(args.ruta_motor_audio),
            dir_salida=Path(args.salida),
        )
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(formatear_resumen(resumenes))
    print(f"Plan generado en: {Path(args.salida).resolve()}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
