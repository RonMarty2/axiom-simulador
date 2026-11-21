# -*- coding: utf-8 -*-
"""Plan de sintesis «todo nuevo» para capitulos SIN_MAPA (20-11-2026, copiloto).

Por que: plan_sintesis.py deja fuera los capitulos cuyo _cache viejo (octubre) no
cuadra en numero con el texto: reusar por indice mezclaria audios de otro texto.
Sin plan, el vigilante (vigilar_cuota.sh) NUNCA los graba aunque esten aprobados.
Este script les da un plan donde TODO bloque es SINTETIZAR/«nuevo» (no reusa nada
de _cache) y un reextraido vacio ([]), que es lo que el vigilante exige.
Solo escribe plan/<cap>.json y reextraido/<cap>.json; no toca _cache ni textos.
No pisa un plan existente salvo con --forzar.

Uso: python docs/audio-bloques/plan_todo_nuevo.py "<_MOTOR_AUDIO>" CAP1 CAP2 ... [--forzar]
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(DIR))
import plan_sintesis as P  # noqa: E402
from sintetizar_desde_plan import resolver_ruta_md_actual  # noqa: E402


def guardar(ruta: Path, datos) -> None:
    tmp = ruta.with_suffix(ruta.suffix + ".tmp")
    tmp.write_text(json.dumps(datos, ensure_ascii=False, indent=1), encoding="utf-8")
    os.replace(tmp, ruta)


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ap = argparse.ArgumentParser()
    ap.add_argument("motor")
    ap.add_argument("capitulos", nargs="+")
    ap.add_argument("--forzar", action="store_true")
    a = ap.parse_args()
    motor = Path(a.motor)
    for cap in a.capitulos:
        ruta_plan = DIR / "plan" / f"{cap}.json"
        ruta_reext = DIR / "reextraido" / f"{cap}.json"
        if ruta_plan.exists() and not a.forzar:
            print(f"{cap}: ya tiene plan, no lo toco")
            continue
        md = resolver_ruta_md_actual(motor, cap)
        if not md.is_file():
            print(f"{cap}: ERROR no encuentro el texto {md}")
            continue
        bloques = P.B.dividir_capitulo_en_bloques(
            md.read_text(encoding="utf-8"), max_palabras=P.MAX_PALABRAS_BLOQUE
        )
        plan = [
            {"j": j, "accion": "SINTETIZAR", "origen": None,
             "motivo": "nuevo", "texto_inicio": P.resumir_inicio(b)}
            for j, b in enumerate(bloques, start=1)
        ]
        guardar(ruta_plan, plan)
        if not ruta_reext.exists():
            guardar(ruta_reext, [])
        print(f"{cap}: plan todo nuevo, {len(plan)} bloques")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
