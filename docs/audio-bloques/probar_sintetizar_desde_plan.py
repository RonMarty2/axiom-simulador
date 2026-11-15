# -*- coding: utf-8 -*-
"""Pruebas unitarias y de integracion para sintetizar_desde_plan.py."""

from __future__ import annotations

import contextlib
import hashlib
import io
import json
import re
import sys
import tempfile
import types
import unittest
import wave
from pathlib import Path
from unittest import mock

DIR_ACTUAL = Path(__file__).resolve().parent
if str(DIR_ACTUAL) not in sys.path:
    sys.path.insert(0, str(DIR_ACTUAL))

import sintetizar_desde_plan as sp  # noqa: E402


def _hacer_bloque(etiqueta: str, extra: str = "", n_relleno: int = 75) -> str:
    """Construye un parrafo de ~80 palabras para ocupar exactamente un bloque de <=100."""
    cuerpo = " ".join(["celula"] * n_relleno)
    if extra:
        return f"Bloque {etiqueta} {cuerpo} {extra}."
    return f"Bloque {etiqueta} {cuerpo}."


def _bytes_wav_falso(semilla: int, n_muestras: int = 700) -> bytes:
    """Construye bytes de un archivo WAV valido >1000 bytes identificable por semilla."""
    muestra = bytes([(semilla * 17 + i) % 251 for i in range(n_muestras * 2)])
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(24000)
        wf.writeframes(muestra)
    contenido = buf.getvalue()
    assert len(contenido) > 1000
    return contenido


def _escribir_wav_falso(ruta: Path, semilla: int, n_muestras: int = 700) -> bytes:
    """Escribe un WAV valido >1000 bytes en disco y devuelve su contenido."""
    ruta.parent.mkdir(parents=True, exist_ok=True)
    contenido = _bytes_wav_falso(semilla, n_muestras=n_muestras)
    ruta.write_bytes(contenido)
    return contenido


def _resumir(texto: str) -> str:
    """Equivalente a plan_sintesis.resumir_inicio para construir planes falsos."""
    return re.sub(r"\s+", " ", texto).strip()[:60]


class TestSintetizarDesdePlan(unittest.TestCase):
    """Valida copia de REUSAR, sintesis de nuevos, --solo-nuevos, retoma, abortos y manifiesto."""

    def _preparar_entorno(self, raiz: Path) -> tuple[Path, Path, Path, Path]:
        motor = raiz / "_MOTOR_AUDIO"
        cache = motor / "_cache"
        textos = raiz / "_TEXTO_LITERAL_VERIFICADO"
        plan_dir = raiz / "plan"
        cache.mkdir(parents=True)
        textos.mkdir(parents=True)
        plan_dir.mkdir(parents=True)
        return motor, cache, textos, plan_dir

    def _construir_capitulo_falso(
        self,
        motor: Path,
        cache: Path,
        textos: Path,
        plan_dir: Path,
        capitulo: str = "Tema_01_Prueba_LITERAL_TTS",
    ) -> dict:
        carpeta_cache = sp.carpeta_cache_de_stem(capitulo)
        dir_cache_cap = cache / carpeta_cache

        b1 = _hacer_bloque("uno conservado")
        b2 = _hacer_bloque("tres desplazado")
        b3 = _hacer_bloque("nuevo bloque <short pause> agregado")
        b4 = _hacer_bloque("cuatro bomba", "transporta Na+ y K+ activos")

        bloques = [b1, b2, b3, b4]
        (textos / f"{capitulo}.md").write_text("\n\n".join(bloques), encoding="utf-8")

        wav_1 = _escribir_wav_falso(dir_cache_cap / "parte_001.wav", 1)
        wav_2 = _escribir_wav_falso(dir_cache_cap / "parte_002.wav", 2)
        wav_3 = _escribir_wav_falso(dir_cache_cap / "parte_003.wav", 3)
        wav_4 = _escribir_wav_falso(dir_cache_cap / "parte_004.wav", 4)

        plan = [
            {
                "j": 1,
                "accion": "REUSAR",
                "origen": "parte_001.wav",
                "motivo": "texto identico",
                "texto_inicio": _resumir(b1),
            },
            {
                "j": 2,
                "accion": "REUSAR",
                "origen": "parte_003.wav",
                "motivo": "texto identico",
                "texto_inicio": _resumir(b2),
            },
            {
                "j": 3,
                "accion": "SINTETIZAR",
                "origen": None,
                "motivo": "nuevo",
                "texto_inicio": _resumir(b3),
            },
            {
                "j": 4,
                "accion": "SINTETIZAR",
                "origen": None,
                "motivo": "error audible (iones; antes parte_004.wav)",
                "texto_inicio": _resumir(b4),
            },
        ]
        ruta_plan = plan_dir / f"{capitulo}.json"
        ruta_plan.write_text(json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8")

        return {
            "capitulo": capitulo,
            "carpeta_cache": carpeta_cache,
            "dir_cache_cap": dir_cache_cap,
            "ruta_plan": ruta_plan,
            "bloques": bloques,
            "bytes_cache": {
                "parte_001.wav": wav_1,
                "parte_002.wav": wav_2,
                "parte_003.wav": wav_3,
                "parte_004.wav": wav_4,
            },
        }

    def test_solo_nuevos_copia_sintetiza_arma_y_manifiesto(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, plan_dir = self._preparar_entorno(raiz)
            datos = self._construir_capitulo_falso(motor, cache, textos, plan_dir)

            llamadas: list[dict] = []
            wav_sintetizado = _bytes_wav_falso(99)

            def fake_sintesis(texto_limpio, destino_wav, modelo, keys_pool, estado_pool):
                llamadas.append(
                    {
                        "texto_limpio": texto_limpio,
                        "destino_wav": destino_wav,
                        "modelo": modelo,
                    }
                )
                destino_wav.parent.mkdir(parents=True, exist_ok=True)
                destino_wav.write_bytes(wav_sintetizado)

            buf = io.StringIO()
            with mock.patch.object(sp, "sintetizar_bloque_tts", side_effect=fake_sintesis):
                with contextlib.redirect_stdout(buf):
                    rc = sp.main(
                        [
                            str(motor),
                            str(datos["ruta_plan"]),
                            "--solo-nuevos",
                            "--modelo",
                            "gemini-3.1-flash-tts-preview",
                        ]
                    )

            self.assertEqual(rc, 0)
            # Solo se sintetizo el bloque j=3 ("nuevo"), con sanitizacion aplicada
            self.assertEqual(len(llamadas), 1)
            self.assertEqual(llamadas[0]["modelo"], "gemini-3.1-flash-tts-preview")
            self.assertNotIn("<short pause>", llamadas[0]["texto_limpio"])
            self.assertIn("nuevo bloque", llamadas[0]["texto_limpio"])

            dir_v2 = motor / "_cache_v2" / datos["carpeta_cache"]
            self.assertEqual(
                (dir_v2 / "parte_001.wav").read_bytes(),
                datos["bytes_cache"]["parte_001.wav"],
            )
            self.assertEqual(
                (dir_v2 / "parte_002.wav").read_bytes(),
                datos["bytes_cache"]["parte_003.wav"],
            )
            self.assertEqual((dir_v2 / "parte_003.wav").read_bytes(), wav_sintetizado)
            self.assertEqual(
                (dir_v2 / "parte_004.wav").read_bytes(),
                datos["bytes_cache"]["parte_004.wav"],
            )

            # _cache original permanece intacta
            self.assertEqual(
                sorted(p.name for p in datos["dir_cache_cap"].iterdir()),
                sorted(datos["bytes_cache"].keys()),
            )
            for nombre, contenido in datos["bytes_cache"].items():
                self.assertEqual((datos["dir_cache_cap"] / nombre).read_bytes(), contenido)

            # Audio final armado en _AUDIO_V2
            wav_master = motor / "_AUDIO_V2" / f"{datos['capitulo']}.wav"
            self.assertTrue(wav_master.is_file())
            with wave.open(str(wav_master), "rb") as wf:
                self.assertEqual(wf.getnframes(), 700 * 4)

            # Manifiesto completo con sha1, modelo y origen
            ruta_manifiesto = dir_v2 / "manifiesto.json"
            self.assertTrue(ruta_manifiesto.is_file())
            manifiesto = json.loads(ruta_manifiesto.read_text(encoding="utf-8"))
            self.assertEqual(len(manifiesto), 4)

            esperado_sha = [
                hashlib.sha1(b.encode("utf-8")).hexdigest() for b in datos["bloques"]
            ]
            self.assertEqual(manifiesto[0]["accion"], "REUSAR")
            self.assertEqual(manifiesto[0]["origen"], "parte_001.wav")
            self.assertIsNone(manifiesto[0]["modelo"])
            self.assertEqual(manifiesto[0]["sha1"], esperado_sha[0])

            self.assertEqual(manifiesto[1]["accion"], "REUSAR")
            self.assertEqual(manifiesto[1]["origen"], "parte_003.wav")
            self.assertIsNone(manifiesto[1]["modelo"])

            self.assertEqual(manifiesto[2]["accion"], "SINTETIZAR")
            self.assertIsNone(manifiesto[2]["origen"])
            self.assertEqual(manifiesto[2]["modelo"], "gemini-3.1-flash-tts-preview")
            self.assertEqual(manifiesto[2]["sha1"], esperado_sha[2])

            self.assertEqual(manifiesto[3]["accion"], "REUSAR_ANTERIOR")
            self.assertEqual(manifiesto[3]["origen"], "parte_004.wav")
            self.assertIsNone(manifiesto[3]["modelo"])
            self.assertEqual(manifiesto[3]["sha1"], esperado_sha[3])

    def test_sin_solo_nuevos_lista_pendiente_y_no_arma_capitulo(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, plan_dir = self._preparar_entorno(raiz)
            datos = self._construir_capitulo_falso(motor, cache, textos, plan_dir)

            llamadas: list[Path] = []

            def fake_sintesis(texto_limpio, destino_wav, modelo, keys_pool, estado_pool):
                llamadas.append(destino_wav)
                _escribir_wav_falso(destino_wav, 77)

            buf = io.StringIO()
            with mock.patch.object(sp, "sintetizar_bloque_tts", side_effect=fake_sintesis):
                with contextlib.redirect_stdout(buf):
                    rc = sp.main([str(motor), str(datos["ruta_plan"])])

            self.assertEqual(rc, 0)
            self.assertEqual(len(llamadas), 1)
            self.assertEqual(llamadas[0].name, "parte_003.wav")

            dir_v2 = motor / "_cache_v2" / datos["carpeta_cache"]
            self.assertTrue((dir_v2 / "parte_001.wav").is_file())
            self.assertTrue((dir_v2 / "parte_002.wav").is_file())
            self.assertTrue((dir_v2 / "parte_003.wav").is_file())
            self.assertFalse((dir_v2 / "parte_004.wav").exists())
            self.assertFalse((dir_v2 / "manifiesto.json").exists())
            self.assertFalse((motor / "_AUDIO_V2" / f"{datos['capitulo']}.wav").exists())
            self.assertIn("PENDIENTE parte_004.wav", buf.getvalue())
            self.assertIn("no se arma el capitulo", buf.getvalue())

    def test_retomar_no_rehace_wav_existente(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, plan_dir = self._preparar_entorno(raiz)
            datos = self._construir_capitulo_falso(motor, cache, textos, plan_dir)

            dir_v2 = motor / "_cache_v2" / datos["carpeta_cache"]
            wav_prev_1 = _escribir_wav_falso(dir_v2 / "parte_001.wav", 51)
            wav_prev_3 = _escribir_wav_falso(dir_v2 / "parte_003.wav", 53)

            llamadas: list[str] = []

            def fake_sintesis(texto_limpio, destino_wav, modelo, keys_pool, estado_pool):
                llamadas.append(destino_wav.name)
                _escribir_wav_falso(destino_wav, 88)

            buf = io.StringIO()
            with mock.patch.object(sp, "sintetizar_bloque_tts", side_effect=fake_sintesis):
                with contextlib.redirect_stdout(buf):
                    rc = sp.main(
                        [str(motor), str(datos["ruta_plan"]), "--solo-nuevos"]
                    )

            self.assertEqual(rc, 0)
            self.assertEqual(llamadas, [])
            self.assertEqual((dir_v2 / "parte_001.wav").read_bytes(), wav_prev_1)
            self.assertEqual((dir_v2 / "parte_003.wav").read_bytes(), wav_prev_3)
            self.assertTrue((dir_v2 / "manifiesto.json").is_file())

    def test_aborta_si_texto_inicio_no_coincide(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, plan_dir = self._preparar_entorno(raiz)
            datos = self._construir_capitulo_falso(motor, cache, textos, plan_dir)

            plan = json.loads(datos["ruta_plan"].read_text(encoding="utf-8"))
            plan[2]["texto_inicio"] = "Texto distinto que ya no coincide con el bloque"
            datos["ruta_plan"].write_text(
                json.dumps(plan, ensure_ascii=False, indent=2), encoding="utf-8"
            )

            llamadas: list[str] = []

            def fake_sintesis(texto_limpio, destino_wav, modelo, keys_pool, estado_pool):
                llamadas.append(destino_wav.name)

            buf_out = io.StringIO()
            buf_err = io.StringIO()
            with mock.patch.object(sp, "sintetizar_bloque_tts", side_effect=fake_sintesis):
                with contextlib.redirect_stdout(buf_out), contextlib.redirect_stderr(buf_err):
                    rc = sp.main(
                        [str(motor), str(datos["ruta_plan"]), "--solo-nuevos"]
                    )

            self.assertNotEqual(rc, 0)
            self.assertEqual(llamadas, [])
            self.assertIn("no coincide con texto_inicio", buf_err.getvalue())
            self.assertFalse((motor / "_cache_v2").exists())
            self.assertFalse((motor / "_AUDIO_V2").exists())

    def test_seco_no_crea_archivos_ni_llama_api(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, plan_dir = self._preparar_entorno(raiz)
            datos = self._construir_capitulo_falso(motor, cache, textos, plan_dir)

            llamadas: list[str] = []

            def fake_sintesis(texto_limpio, destino_wav, modelo, keys_pool, estado_pool):
                llamadas.append(destino_wav.name)

            buf = io.StringIO()
            with mock.patch.object(sp, "sintetizar_bloque_tts", side_effect=fake_sintesis):
                with contextlib.redirect_stdout(buf):
                    rc = sp.main(
                        [str(motor), str(datos["ruta_plan"]), "--solo-nuevos", "--seco"]
                    )

            self.assertEqual(rc, 0)
            self.assertEqual(llamadas, [])
            self.assertFalse((motor / "_cache_v2").exists())
            self.assertFalse((motor / "_AUDIO_V2").exists())
            self.assertIn("[SECO] SINTETIZAR parte_003.wav", buf.getvalue())

    def test_saladin_carpeta_cache_y_rotacion_429_mismo_modelo(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor, cache, textos, plan_dir = self._preparar_entorno(raiz)
            datos = self._construir_capitulo_falso(
                motor,
                cache,
                textos,
                plan_dir,
                capitulo="Tema_08_Morfo_Saladin_LITERAL_TTS",
            )
            self.assertEqual(datos["carpeta_cache"], "Morfo_Cap_08_Saladin_LITERAL_TTS")

            modelos_vistos: list[str] = []
            claves_vistas: list[str] = []
            intento = {"n": 0}
            wav_ok = _bytes_wav_falso(33)

            class FakeModels:
                def __init__(self, api_key: str):
                    self.api_key = api_key

                def generate_content(self, model: str, contents: str, config):
                    modelos_vistos.append(model)
                    claves_vistas.append(self.api_key)
                    intento["n"] += 1
                    if intento["n"] <= 2:
                        raise RuntimeError("429 RESOURCE_EXHAUSTED: quota exceeded")
                    return types.SimpleNamespace(
                        candidates=[
                            types.SimpleNamespace(
                                content=types.SimpleNamespace(
                                    parts=[
                                        types.SimpleNamespace(
                                            inline_data=types.SimpleNamespace(data=wav_ok)
                                        )
                                    ]
                                )
                            )
                        ]
                    )

            class FakeClient:
                def __init__(self, api_key: str):
                    self.models = FakeModels(api_key)

            fake_genai = types.SimpleNamespace(Client=FakeClient)
            fake_types = types.SimpleNamespace(
                GenerateContentConfig=lambda **kw: kw,
                SpeechConfig=lambda **kw: kw,
                VoiceConfig=lambda **kw: kw,
                PrebuiltVoiceConfig=lambda **kw: kw,
            )

            (motor / "google_api_keys.json").write_text(
                json.dumps({"api_keys": ["k1", "k2"]}), encoding="utf-8"
            )
            buf = io.StringIO()
            with mock.patch.dict(sp.os.environ, {"GEMINI_API_KEY": ""}), mock.patch.object(
                sp, "genai", fake_genai
            ), mock.patch.object(sp, "types", fake_types), mock.patch.object(
                sp.time, "sleep", return_value=None
            ):
                with contextlib.redirect_stdout(buf):
                    rc = sp.main(
                        [
                            str(motor),
                            str(datos["ruta_plan"]),
                            "--solo-nuevos",
                            "--modelo",
                            "gemini-3.1-flash-tts-preview",
                        ]
                    )

            self.assertEqual(rc, 0)
            self.assertEqual(claves_vistas, ["k1", "k2", "k1"])
            self.assertEqual(modelos_vistos, ["gemini-3.1-flash-tts-preview"] * 3)
            dir_v2 = motor / "_cache_v2" / "Morfo_Cap_08_Saladin_LITERAL_TTS"
            self.assertEqual((dir_v2 / "parte_003.wav").read_bytes(), wav_ok)
            self.assertTrue((dir_v2 / "manifiesto.json").is_file())
            self.assertTrue((motor / "_AUDIO_V2" / f"{datos['capitulo']}.wav").is_file())
            salida = buf.getvalue()
            self.assertIn("rotaciones_429=2", salida)
            self.assertIn("rondas_agotadas=1", salida)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    resultado = unittest.main(module=__name__, exit=False, verbosity=2)
    return 0 if resultado.result.wasSuccessful() else 1


if __name__ == "__main__":
    raise SystemExit(main())
