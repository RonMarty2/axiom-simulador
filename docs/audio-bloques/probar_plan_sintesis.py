# -*- coding: utf-8 -*-
"""Pruebas unitarias y de integracion para plan_sintesis.py y armar_desde_plan.py."""

from __future__ import annotations

import contextlib
import io
import json
import sys
import tempfile
import unittest
import wave
from pathlib import Path

DIR_ACTUAL = Path(__file__).resolve().parent
if str(DIR_ACTUAL) not in sys.path:
    sys.path.insert(0, str(DIR_ACTUAL))

import armar_desde_plan as ap  # noqa: E402
import plan_sintesis as ps  # noqa: E402


def _hacer_bloque(etiqueta: str, extra: str = "", n_relleno: int = 75) -> str:
    """Construye un parrafo de ~80 palabras para ocupar exactamente un bloque de <=100."""
    cuerpo = " ".join(["celula"] * n_relleno)
    if extra:
        return f"Bloque {etiqueta} {cuerpo} {extra}."
    return f"Bloque {etiqueta} {cuerpo}."


def _escribir_wav_falso(ruta: Path, semilla: int) -> bytes:
    """Escribe un archivo WAV valido >1000 bytes con contenido identificable por semilla."""
    ruta.parent.mkdir(parents=True, exist_ok=True)
    # 700 muestras de 16 bits = 1400 bytes PCM + 44 bytes cabecera RIFF (> 1000 bytes)
    muestra = bytes([(semilla * 17 + i) % 251 for i in range(1400)])
    with wave.open(str(ruta), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(24000)
        wf.writeframes(muestra)
    contenido = ruta.read_bytes()
    assert len(contenido) > 1000
    return contenido


class TestPlanSintesisYArmado(unittest.TestCase):
    """Valida mapeo por texto, deteccion de errores audibles, SIN_MAPA y armado."""

    def _preparar_base(self, raiz: Path) -> tuple[Path, Path, Path, Path]:
        motor = raiz / "_MOTOR_AUDIO"
        cache = motor / "_cache"
        textos = raiz / "_TEXTO_LITERAL_VERIFICADO"
        respaldo = raiz / "_RESPALDO_TEXTO_LITERAL_2026-11-15_antes_de_recorte"
        cache.mkdir(parents=True)
        textos.mkdir(parents=True)
        respaldo.mkdir(parents=True)
        return motor, cache, textos, respaldo

    def test_bloque_quitado_al_medio_desplaza_y_nuevo_sintetizar(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, respaldo = self._preparar_base(raiz)
            cap = "Tema_01_Prueba_LITERAL_TTS"

            b1 = _hacer_bloque("uno")
            b2_quitado = _hacer_bloque("dos eliminado del medio")
            b3_desplazado = _hacer_bloque("tres que se conserva")
            b4_iones = _hacer_bloque("cuatro bomba", "transporta Na+ y K+ activos")
            b5_mu = _hacer_bloque("cinco tamano", "mide veinte \u03bcm de diametro")
            b6_miles = _hacer_bloque("seis conteo", "tiene un coma cinco cero cero poros")
            b_nuevo = _hacer_bloque("nuevo insertado despues del recorte")

            bloques_viejos = [b1, b2_quitado, b3_desplazado, b4_iones, b5_mu, b6_miles]
            (respaldo / f"{cap}.md").write_text(
                "\n\n".join(bloques_viejos), encoding="utf-8"
            )
            bloques_nuevos = [b1, b3_desplazado, b_nuevo, b4_iones, b5_mu, b6_miles]
            (textos / f"{cap}.md").write_text(
                "\n\n".join(bloques_nuevos), encoding="utf-8"
            )

            bytes_cache: dict[str, bytes] = {}
            for idx in range(1, len(bloques_viejos) + 1):
                nombre = f"parte_{idx:03d}.wav"
                bytes_cache[nombre] = _escribir_wav_falso(cache / cap / nombre, idx)

            dir_plan = raiz / "plan"
            buf_plan = io.StringIO()
            with contextlib.redirect_stdout(buf_plan):
                rc = ps.main([str(motor), "--salida", str(dir_plan)])
            self.assertEqual(rc, 0)

            ruta_plan = dir_plan / f"{cap}.json"
            self.assertTrue(ruta_plan.is_file())
            plan = json.loads(ruta_plan.read_text(encoding="utf-8"))
            self.assertEqual([x["j"] for x in plan], [1, 2, 3, 4, 5, 6])

            # j=1 reusa parte_001.wav
            self.assertEqual(plan[0]["accion"], "REUSAR")
            self.assertEqual(plan[0]["origen"], "parte_001.wav")
            # j=2 (antes bloque 3) reusa parte_003.wav desplazada
            self.assertEqual(plan[1]["accion"], "REUSAR")
            self.assertEqual(plan[1]["origen"], "parte_003.wav")
            # j=3 es nuevo -> SINTETIZAR
            self.assertEqual(plan[2]["accion"], "SINTETIZAR")
            self.assertIsNone(plan[2]["origen"])
            self.assertEqual(plan[2]["motivo"], "nuevo")
            # j=4,5,6 -> SINTETIZAR por error audible (iones, mu, miles)
            self.assertEqual(plan[3]["accion"], "SINTETIZAR")
            self.assertIn("error audible", plan[3]["motivo"])
            self.assertIn("iones", plan[3]["motivo"])
            self.assertEqual(plan[4]["accion"], "SINTETIZAR")
            self.assertIn("error audible", plan[4]["motivo"])
            self.assertIn("mu", plan[4]["motivo"])
            self.assertEqual(plan[5]["accion"], "SINTETIZAR")
            self.assertIn("error audible", plan[5]["motivo"])
            self.assertIn("miles", plan[5]["motivo"])

            for item in plan:
                self.assertLessEqual(len(item["texto_inicio"]), 60)

            resumen_txt = (dir_plan / "RESUMEN.txt").read_text(encoding="utf-8")
            self.assertIn(cap, resumen_txt)
            self.assertIn("TOTAL MAPEABLES", resumen_txt)

            # Armar en modo --seco: no crea destino ni copia
            destino = raiz / "ensamblado"
            buf_seco = io.StringIO()
            with contextlib.redirect_stdout(buf_seco):
                rc_seco = ap.main(
                    [str(motor), str(ruta_plan), "--destino", str(destino), "--seco"]
                )
            self.assertEqual(rc_seco, 0)
            self.assertFalse(destino.exists())
            self.assertIn("[SECO] REUSAR parte_002.wav <- parte_003.wav", buf_seco.getvalue())
            self.assertIn("Pendientes SINTETIZAR:", buf_seco.getvalue())

            # Armar real: copia (no mueve) y conserva intactos los originales
            buf_armar = io.StringIO()
            with contextlib.redirect_stdout(buf_armar):
                rc_armar = ap.main(
                    [str(motor), str(ruta_plan), "--destino", str(destino)]
                )
            self.assertEqual(rc_armar, 0)

            self.assertEqual((destino / "parte_001.wav").read_bytes(), bytes_cache["parte_001.wav"])
            self.assertEqual((destino / "parte_002.wav").read_bytes(), bytes_cache["parte_003.wav"])
            for j_pend in (3, 4, 5, 6):
                self.assertFalse((destino / f"parte_{j_pend:03d}.wav").exists())

            # Ningun archivo de la cache original fue borrado ni alterado
            for nombre, contenido_orig in bytes_cache.items():
                ruta_orig = cache / cap / nombre
                self.assertTrue(ruta_orig.is_file())
                self.assertEqual(ruta_orig.read_bytes(), contenido_orig)

    def test_cuenta_distinta_va_a_sin_mapa(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, respaldo = self._preparar_base(raiz)
            cap = "Tema_02_Desfasado_LITERAL_TTS"

            viejos = [_hacer_bloque("a"), _hacer_bloque("b"), _hacer_bloque("c")]
            nuevos = [_hacer_bloque("a"), _hacer_bloque("c")]
            (respaldo / f"{cap}.md").write_text("\n\n".join(viejos), encoding="utf-8")
            (textos / f"{cap}.md").write_text("\n\n".join(nuevos), encoding="utf-8")

            # Solo 2 wavs en cache frente a 3 bloques viejos -> SIN_MAPA
            w1 = _escribir_wav_falso(cache / cap / "parte_001.wav", 1)
            w2 = _escribir_wav_falso(cache / cap / "parte_002.wav", 2)

            dir_plan = raiz / "plan"
            resumenes = ps.ejecutar(motor, dir_plan)
            self.assertEqual(len(resumenes), 1)
            self.assertFalse(resumenes[0].mapeable)
            self.assertFalse((dir_plan / f"{cap}.json").exists())

            resumen_txt = (dir_plan / "RESUMEN.txt").read_text(encoding="utf-8")
            self.assertIn("SIN_MAPA", resumen_txt)
            self.assertIn(f"{cap}: texto_viejo 3 / audio 2", resumen_txt)

            # Cache intacta
            self.assertEqual((cache / cap / "parte_001.wav").read_bytes(), w1)
            self.assertEqual((cache / cap / "parte_002.wav").read_bytes(), w2)

    def test_regla_saladin_y_atlas(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, respaldo = self._preparar_base(raiz)

            cap_saladin = "Tema_05_Morfo_Saladin_LITERAL_TTS"
            cache_saladin = "Morfo_Cap_05_Saladin_LITERAL_TTS"
            cap_atlas = "Atlas_B_Histo_LITERAL_TTS"
            cache_atlas = "Morfo_Atlas_B_Saladin_LITERAL_TTS"

            b1 = _hacer_bloque("saladin uno")
            b2 = _hacer_bloque("saladin dos")
            (respaldo / f"{cap_saladin}.md").write_text(f"{b1}\n\n{b2}", encoding="utf-8")
            (textos / f"{cap_saladin}.md").write_text(b2, encoding="utf-8")
            _escribir_wav_falso(cache / cache_saladin / "parte_001.wav", 10)
            wav_s2 = _escribir_wav_falso(cache / cache_saladin / "parte_002.wav", 11)

            ba1 = _hacer_bloque("atlas uno")
            (respaldo / f"{cap_atlas}.md").write_text(ba1, encoding="utf-8")
            (textos / f"{cap_atlas}.md").write_text(ba1, encoding="utf-8")
            _escribir_wav_falso(cache / cache_atlas / "parte_001.wav", 12)

            dir_plan = raiz / "plan"
            ps.ejecutar(motor, dir_plan)

            plan_saladin = json.loads(
                (dir_plan / f"{cap_saladin}.json").read_text(encoding="utf-8")
            )
            self.assertEqual(len(plan_saladin), 1)
            self.assertEqual(plan_saladin[0]["accion"], "REUSAR")
            self.assertEqual(plan_saladin[0]["origen"], "parte_002.wav")

            plan_atlas = json.loads(
                (dir_plan / f"{cap_atlas}.json").read_text(encoding="utf-8")
            )
            self.assertEqual(plan_atlas[0]["accion"], "REUSAR")
            self.assertEqual(plan_atlas[0]["origen"], "parte_001.wav")

            destino_sal = raiz / "destino_saladin"
            buf = io.StringIO()
            with contextlib.redirect_stdout(buf):
                reusados, pendientes = ap.armar_desde_plan(
                    motor, dir_plan / f"{cap_saladin}.json", destino_sal
                )
            self.assertEqual(reusados, 1)
            self.assertEqual(pendientes, [])
            self.assertEqual((destino_sal / "parte_001.wav").read_bytes(), wav_s2)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    resultado = unittest.main(module=__name__, exit=False, verbosity=2)
    return 0 if resultado.result.wasSuccessful() else 1


if __name__ == "__main__":
    raise SystemExit(main())
