# -*- coding: utf-8 -*-
"""Re-grabar SOLO los bloques cuyo texto cambió en un capítulo ya grabado (21-11-2026, copiloto).

Por qué: tras corregir el texto de capítulos ya grabados (p. ej. «un» -> «uno», R6_un_numero),
plan_todo_nuevo.py --forzar re-graba TODO (pierde los REUSAR) y el plan viejo hace que el vigilante
salte el capítulo («PLAN VIEJO»). Este script compara cada bloque del texto actual con el sha1 del
manifiesto de _cache_v2 y cambia en el plan SOLO los bloques distintos a SINTETIZAR/«nuevo».
Los demás quedan igual: sintetizar_desde_plan.py los RETOMA (mismo sha1, misma acción/origen).
Si el número de bloques cambió, no se puede parchar: lo dice (regenerar con plan_sintesis/plan_todo_nuevo).

Uso: python docs/audio-bloques/regrabar_bloques.py CAP1 [CAP2 ...] [--seco]
     (CAP = nombre del plan sin .json, p. ej. Tema_01_Biologia_Celular_LITERAL_TTS)
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(DIR))
import sintetizar_desde_plan as S  # noqa: E402

MOTOR = DIR.parent.parent / "examenes pasados" / "MEDICINA" / "LIBROS DE MEDICINA" / "_MOTOR_AUDIO"


def guardar(ruta: Path, datos) -> None:
    tmp = ruta.with_suffix(ruta.suffix + ".tmp")
    tmp.write_text(json.dumps(datos, ensure_ascii=False, indent=1), encoding="utf-8")
    os.replace(tmp, ruta)


def parchar(cap: str, seco: bool) -> int:
    ruta_plan = DIR / "plan" / f"{cap}.json"
    ruta_reex = DIR / "reextraido" / f"{cap}.json"
    ruta_man = MOTOR / "_cache_v2" / cap / "manifiesto.json"
    if not ruta_man.exists():  # p. ej. Atlas_B_Morfo_Saladin -> Morfo_Atlas_B_Saladin
        ruta_man = MOTOR / "_cache_v2" / S.carpeta_cache_de_stem(cap) / "manifiesto.json"
    if not ruta_plan.exists():
        print(f"{cap}: SIN PLAN"); return 1
    if not ruta_man.exists():
        print(f"{cap}: sin manifiesto (no grabado): no hace falta, usar plan_sintesis/plan_todo_nuevo"); return 1
    plan = json.loads(ruta_plan.read_text(encoding="utf-8"))
    reex = json.loads(ruta_reex.read_text(encoding="utf-8")) if ruta_reex.exists() else []
    man = {r["j"]: r for r in json.loads(ruta_man.read_text(encoding="utf-8"))}
    md = S.resolver_ruta_md_actual(MOTOR, cap)
    bloques = S.B.dividir_capitulo_en_bloques(md.read_text(encoding="utf-8"), max_palabras=S.MAX_PALABRAS_BLOQUE)
    if len(bloques) != len(plan):
        print(f"{cap}: PLAN VIEJO (texto {len(bloques)} bloques / plan {len(plan)}): no se parcha; regenerar"); return 1
    reex_j = {int(r.get("j")): r for r in reex if isinstance(r, dict) and r.get("j") is not None}
    cambian = []
    for item in plan:
        j = int(item["j"]); sha = S._sha1_texto(bloques[j - 1])
        prev = man.get(j)
        if prev is not None and prev.get("sha1") == sha:
            continue  # se retoma tal cual
        r = reex_j.get(j)
        if r is not None and r.get("texto_nuevo") and S._sha1_texto(r["texto_nuevo"]) == (prev or {}).get("sha1"):
            continue  # bloque grabado desde reextraido, sin cambio
        cambian.append(j)
        item.update(accion="SINTETIZAR", origen=None, motivo="nuevo", texto_inicio=S.resumir_inicio(bloques[j - 1]))
        reex_j.pop(j, None)
    print(f"{cap}: {len(plan)} bloques · re-grabar {len(cambian)} {cambian} · el resto se conserva" + (" (seco)" if seco else ""))
    if cambian and not seco:
        guardar(ruta_plan, plan)
        if ruta_reex.exists():
            guardar(ruta_reex, [r for r in reex if not (isinstance(r, dict) and r.get("j") is not None and int(r["j"]) in cambian)])
    return 0


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    seco = "--seco" in sys.argv
    caps = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not caps:
        print(__doc__); return 2
    return max(parchar(c, seco) for c in caps)


if __name__ == "__main__":
    sys.exit(main())
