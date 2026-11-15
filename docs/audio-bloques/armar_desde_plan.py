# -*- coding: utf-8 -*-
"""Arma los WAV reusables en un directorio destino a partir de un plan de sintesis."""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from pathlib import Path

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))

from plan_sintesis import TAMANO_MIN_WAV, carpeta_cache_de_stem  # noqa: E402


def resolver_dir_cache_capitulo(ruta_motor_audio: Path, stem_plan: str) -> Path:
    """Ubica la carpeta del capitulo dentro de _MOTOR_AUDIO/_cache."""
    cache_raiz = ruta_motor_audio.resolve() / "_cache"
    candidato = cache_raiz / carpeta_cache_de_stem(stem_plan)
    if candidato.is_dir():
        return candidato
    if not stem_plan.endswith("_LITERAL_TTS"):
        candidato_tts = cache_raiz / carpeta_cache_de_stem(f"{stem_plan}_LITERAL_TTS")
        if candidato_tts.is_dir():
            return candidato_tts
    return candidato


def armar_desde_plan(
    ruta_motor_audio: Path,
    ruta_plan_json: Path,
    dir_destino: Path,
    seco: bool = False,
) -> tuple[int, list[dict]]:
    """
    Copia (sin mover) los bloques REUSAR a <dir_destino>/parte_{j:03d}.wav
    y devuelve (cantidad_reusados, lista_pendientes_sintetizar).
    """
    motor = ruta_motor_audio.resolve()
    plan_path = ruta_plan_json.resolve()
    destino = dir_destino.resolve()

    if not plan_path.is_file():
        raise FileNotFoundError(f"No existe el plan: {plan_path}")

    datos = json.loads(plan_path.read_text(encoding="utf-8"))
    if not isinstance(datos, list):
        raise ValueError(f"El plan debe ser una lista JSON: {plan_path}")

    dir_cache = resolver_dir_cache_capitulo(motor, plan_path.stem)
    if destino == dir_cache:
        raise ValueError(
            "El directorio --destino no puede ser la carpeta original de _cache."
        )

    pendientes: list[dict] = []
    por_copiar: list[tuple[int, Path, Path]] = []

    for item in sorted(datos, key=lambda x: int(x["j"])):
        j = int(item["j"])
        accion = item["accion"]
        if accion == "REUSAR":
            origen_str = str(item.get("origen") or "").strip()
            if not origen_str:
                raise ValueError(f"Bloque j={j} marcado REUSAR sin 'origen'.")
            if not origen_str.endswith(".wav"):
                origen_str = f"{origen_str}.wav"

            if "/" in origen_str or "\\" in origen_str:
                origen_wav = (motor / "_cache" / origen_str).resolve()
            else:
                origen_wav = (dir_cache / origen_str).resolve()

            if not origen_wav.is_file():
                raise FileNotFoundError(
                    f"No existe el audio origen para bloque {j}: {origen_wav}"
                )
            if origen_wav.stat().st_size <= TAMANO_MIN_WAV:
                raise ValueError(
                    f"Audio origen demasiado pequeno (<= {TAMANO_MIN_WAV} bytes): {origen_wav}"
                )

            destino_wav = destino / f"parte_{j:03d}.wav"
            por_copiar.append((j, origen_wav, destino_wav))
        elif accion == "SINTETIZAR":
            pendientes.append(item)
        else:
            raise ValueError(f"Accion desconocida en bloque j={j}: {accion}")

    if not seco and por_copiar:
        destino.mkdir(parents=True, exist_ok=True)

    prefijo = "[SECO] " if seco else ""
    for j, origen_wav, destino_wav in por_copiar:
        if not seco:
            shutil.copy2(origen_wav, destino_wav)
        print(f"{prefijo}REUSAR parte_{j:03d}.wav <- {origen_wav.name}")

    print("")
    print(
        f"Resumen ({plan_path.stem}): {len(por_copiar)} reusados, "
        f"{len(pendientes)} pendientes de sintetizar"
    )
    if pendientes:
        print("Pendientes SINTETIZAR:")
        for item in pendientes:
            j = int(item["j"])
            motivo = item.get("motivo", "")
            inicio = item.get("texto_inicio", "")
            print(f"  parte_{j:03d}.wav | {motivo} | {inicio}")

    return len(por_copiar), pendientes


def main(argv: list[str] | None = None) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    parser = argparse.ArgumentParser(
        description="Copia los WAV reusables segun un plan y lista los bloques a sintetizar."
    )
    parser.add_argument("ruta_motor_audio", help="Ruta a la carpeta _MOTOR_AUDIO")
    parser.add_argument("plan_json", help="Ruta al archivo plan/<capitulo>.json")
    parser.add_argument(
        "--destino",
        required=True,
        help="Carpeta destino donde copiar los parte_{j:03d}.wav reusables",
    )
    parser.add_argument(
        "--seco",
        action="store_true",
        help="Modo simulacion: solo imprime, no crea carpetas ni copia archivos",
    )
    args = parser.parse_args(argv)

    try:
        armar_desde_plan(
            ruta_motor_audio=Path(args.ruta_motor_audio),
            ruta_plan_json=Path(args.plan_json),
            dir_destino=Path(args.destino),
            seco=args.seco,
        )
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
