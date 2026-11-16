# -*- coding: utf-8 -*-
"""Pruebas obligatorias del protocolo único de aceptación (aceptacion.py)."""

from __future__ import annotations

import contextlib
import io
import json
import sys
import tempfile
import unittest
import wave
from pathlib import Path
from unittest import mock

DIR_ACTUAL = Path(__file__).resolve().parent
if str(DIR_ACTUAL) not in sys.path:
    sys.path.insert(0, str(DIR_ACTUAL))

import aceptacion as ac  # noqa: E402


PDF_BASE = (
    "=== PÁGINA 1 ===\n"
    "1\n"
    "Organización de las células\n"
    "La estructura celular interna básica de las células eucariotas está bastante "
    "conservada en los distintos organismos. Su característica fundamental es la presencia "
    "de núcleo, que contiene el material genético en forma de ADN y regula la síntesis "
    "de proteínas.\n\n"
    "Las membranas biológicas están formadas por una bicapa lipídica semipermeable que "
    "rodea a la célula y regula el paso selectivo de sustancias entre el interior y el "
    "exterior celular.\n"
)

TEXTO_LIMPIO = (
    "Organización de las células\n\n"
    "La estructura celular interna básica de las células eucariotas está bastante "
    "conservada en los distintos organismos. Su característica fundamental es la presencia "
    "de núcleo, que contiene el material genético en forma de A D N y regula la síntesis "
    "de proteínas.\n\n"
    "Las membranas biológicas están formadas por una bicapa lipídica semipermeable que "
    "rodea a la célula y regula el paso selectivo de sustancias entre el interior y el "
    "exterior celular.\n"
)


def _rev(resultado: ac.ResultadoCapitulo, numero: int) -> ac.ResultadoRevision:
    for r in resultado.revisiones:
        if r.numero == numero:
            return r
    raise KeyError(f"Revisión {numero} no encontrada")


def _escribir_wav_falso(ruta: Path, dur_seg: float = 1.0) -> None:
    ruta.parent.mkdir(parents=True, exist_ok=True)
    n_frames = int(16000 * dur_seg)
    with wave.open(str(ruta), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(16000)
        wf.writeframes(b"\x00\x00" * n_frames)


class TestAceptacionObligatoria(unittest.TestCase):
    """Los 7 casos reales medidos + texto limpio + audio y modo --resumen."""

    def _evaluar_texto(
        self,
        tmp: Path,
        nombre: str,
        texto: str,
        pdf_texto: str = PDF_BASE,
    ) -> ac.ResultadoCapitulo:
        ruta_md = tmp / f"{nombre}.md"
        ruta_pdf = tmp / "Libro_texto_paginas.txt"
        ruta_out = tmp / "aceptacion"
        ruta_md.write_text(texto, encoding="utf-8")
        ruta_pdf.write_text(pdf_texto, encoding="utf-8")
        return ac.evaluar_capitulo(
            ruta_texto=ruta_md,
            ruta_pdf_texto=ruta_pdf,
            dir_salida=ruta_out,
        )

    def test_1_bibliografia_leida_al_final_falla_rev_3(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            texto = (
                TEXTO_LIMPIO
                + "\nLecturas recomendadas\n"
                + "Ramón y Cajal S. Reglas y consejos sobre investigación científica. "
                + "Madrid: Austral; 2007.\n"
                + "Willey J, Sherwood L, Wolverton C. Prescott's Microbiology. "
                + "Novena Edición, McGraw Hill 2013.\n"
            )
            res = self._evaluar_texto(tmp, "Caso_01_Biblio", texto)
            self.assertEqual(res.veredicto, "FALLA")
            self.assertEqual(_rev(res, 3).estado, "FALLA")
            self.assertGreater(_rev(res, 3).fallas, 0)

    def test_2_credito_figura_maldonado_falla_rev_3(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            texto = TEXTO_LIMPIO + "\nIlustración de E. Maldonado.\n"
            res = self._evaluar_texto(tmp, "Caso_02_Credito", texto)
            self.assertEqual(res.veredicto, "FALLA")
            self.assertEqual(_rev(res, 3).estado, "FALLA")
            self.assertTrue(
                any("Maldonado" in ej or "Ilustración" in ej for ej in _rev(res, 3).ejemplos)
            )

    def test_3_iones_mal_leidos_falla_rev_6(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            texto = (
                TEXTO_LIMPIO
                + "\nLa bomba transporta iones NA más o CA2 más a través de la membrana.\n"
            )
            res = self._evaluar_texto(tmp, "Caso_03_Iones", texto)
            self.assertEqual(res.veredicto, "FALLA")
            self.assertEqual(_rev(res, 6).estado, "FALLA")
            self.assertGreater(_rev(res, 6).fallas, 0)

    def test_4_leyenda_formula_leida_falla_rev_6(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            texto = (
                TEXTO_LIMPIO
                + "\nEn la ecuación de estado, R iguala constante universal de los gases.\n"
            )
            res = self._evaluar_texto(tmp, "Caso_04_Formula", texto)
            self.assertEqual(res.veredicto, "FALLA")
            self.assertEqual(_rev(res, 6).estado, "FALLA")
            self.assertTrue(any("iguala" in ej for ej in _rev(res, 6).ejemplos))

    def test_5_numero_seccion_suelto_falla_rev_7(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            texto = (
                TEXTO_LIMPIO
                + "\n2 a 3.1 Microscopía de fluorescencia y confocal.\n"
            )
            res = self._evaluar_texto(tmp, "Caso_05_Seccion", texto)
            self.assertEqual(res.veredicto, "FALLA")
            self.assertEqual(_rev(res, 7).estado, "FALLA")
            self.assertTrue(any("2 a 3.1" in ej for ej in _rev(res, 7).ejemplos))

    def test_6_audio_entero_preguntas_autoevaluacion_falla_rev_3(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            # 6a. Como texto
            texto_auto = (
                "Preguntas de autoevaluación\n\n"
                "uno. ¿Cuál es la función de la mitocondria? "
                "A. Síntesis de lípidos. B. Producción de energía. "
                "C. Ninguna de las anteriores. Respuesta correcta: B.\n"
            )
            res_txt = self._evaluar_texto(tmp, "Caso_06_Autoeval_Txt", texto_auto)
            self.assertEqual(res_txt.veredicto, "FALLA")
            self.assertEqual(_rev(res_txt, 3).estado, "FALLA")

            # 6b. Como audio completo con Whisper simulado
            ruta_wav = tmp / "Tema_01_Autoevaluacion.wav"
            _escribir_wav_falso(ruta_wav, dur_seg=1.0)
            transcripcion_falsa = (
                "Preguntas de autoevaluación. Uno. ¿Cuál es la función principal? "
                "Respuesta correcta B.",
                [
                    {"word": "Preguntas", "start": 0.0, "end": 0.5},
                    {"word": "de", "start": 0.5, "end": 0.6},
                    {"word": "autoevaluación.", "start": 0.6, "end": 1.2},
                ],
                360.0,
            )
            with mock.patch.object(ac, "_obtener_duracion_ffprobe", return_value=360.0), mock.patch.object(
                ac, "_medir_volumedetect", return_value=(-18.0, -2.0)
            ), mock.patch.object(ac, "_detectar_silencios_ffmpeg", return_value=[]):
                res_aud = ac.evaluar_capitulo(
                    ruta_texto=None,
                    ruta_audio=ruta_wav,
                    dir_salida=tmp / "aceptacion",
                    transcribir_fn=lambda _: transcripcion_falsa,
                )
            self.assertEqual(res_aud.veredicto, "FALLA")
            self.assertEqual(_rev(res_aud, 3).estado, "FALLA")

    def test_7_parrafo_parafraseado_no_esta_en_pdf_falla_rev_1(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            texto_parafraseado = (
                "Organización de las células\n\n"
                "La envoltura externa de los seres vivos celulares consiste en una lámina "
                "doble de grasas que controla cuidadosamente qué partículas químicas pueden "
                "entrar o salir del citoplasma interior.\n"
            )
            res = self._evaluar_texto(tmp, "Caso_07_Parafrasis", texto_parafraseado)
            self.assertEqual(res.veredicto, "FALLA")
            self.assertEqual(_rev(res, 1).estado, "FALLA")
            self.assertGreater(_rev(res, 1).fallas, 0)

    def test_rev1_caso_real_adaptaciones_foneticas_aprueba(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            pdf = (
                PDF_BASE
                + "\nLas moléculas del CPH de clase I miden 10 μm, expresan la subunidad α1 "
                "a pH 7,4 y 37 °C con grupos COOH, la hormona PYY y la vía JAK y STAT.\n"
                "CONOCIMIENTO MÁS A FONDO 1.1\n"
                "Medicina evolutiva\n"
                "Vestigios de la evolución humana\n"
            )
            texto_tts = (
                TEXTO_LIMPIO
                + "\nLas moléculas del C P H de clase I miden diez micrómetros, expresan la subunidad alfa uno "
                "a pe hache siete coma cuatro y treinta y siete grados Celsius con grupos ce o o hache, "
                "la hormona P i griega i griega y la vía jak y stat.\n\n"
                "Conocimiento más a fondo uno punto uno. Medicina evolutiva: Vestigios de la evolución humana\n"
            )
            res = self._evaluar_texto(tmp, "Caso_Rev1_Adaptaciones_OK", texto_tts, pdf_texto=pdf)
            self.assertEqual(_rev(res, 1).estado, "APRUEBA")
            self.assertEqual(_rev(res, 1).fallas, 0)
            self.assertEqual(_rev(res, 2).estado, "APRUEBA")

    def test_rev1_parafrasis_real_con_adaptaciones_sigue_fallando(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            pdf = (
                PDF_BASE
                + "\nLas moléculas del CPH de clase I miden 10 μm y expresan la subunidad α1 en la membrana.\n"
            )
            texto_parafraseado = (
                TEXTO_LIMPIO
                + "\nLos complejos proteicos del C P H de clase I alcanzan diez micrómetros y muestran "
                "el receptor alfa uno sobre la superficie externa.\n"
            )
            res = self._evaluar_texto(tmp, "Caso_Rev1_Parafrasis_Falla", texto_parafraseado, pdf_texto=pdf)
            self.assertEqual(_rev(res, 1).estado, "FALLA")
            self.assertGreater(_rev(res, 1).fallas, 0)

    def test_falso_positivo_nombres_propios_con_digito_no_falla_rev_6(self):
        """Calibración 16-nov: E6, E7, H5N1, p53, CD4 son nombres propios, no dígitos sin convertir."""
        with tempfile.TemporaryDirectory() as tmpdir:
            texto = TEXTO_LIMPIO + "\nLas proteínas E6 y E7 inactivan a p53 y la gripe H5N1 infecta células CD4.\n"
            res = self._evaluar_texto(Path(tmpdir), "Caso_FP_Nombres", texto)
            self.assertNotIn("Dígito sin convertir", " ".join(_rev(res, 6).ejemplos))

    def test_falso_positivo_sigla_palabra_en_json_no_falla_rev_7(self):
        """Calibración rev. 7: siglas clasificadas 'palabra' en siglas_clasificadas.json no cuentan como falla."""
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            texto_ok = TEXTO_LIMPIO + "\nLas proteínas SNARE y el neurotransmisor GABA actúan en la sinapsis.\n"
            res_ok = self._evaluar_texto(tmp, "Caso_FP_Sigla_Palabra", texto_ok)
            self.assertEqual(_rev(res_ok, 7).estado, "APRUEBA")

            texto_mal = TEXTO_LIMPIO + "\nEl factor XYZ sigue sin clasificarse.\n"
            res_mal = self._evaluar_texto(tmp, "Caso_Sigla_Desconocida", texto_mal)
            self.assertEqual(_rev(res_mal, 7).estado, "FALLA")
            self.assertTrue(any("Sigla en mayúsculas: XYZ" in ej for ej in _rev(res_mal, 7).ejemplos))

    def test_dato_sin_convertir_sigue_fallando_rev_6(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            texto = TEXTO_LIMPIO + "\nHay 35 células en el paso 3a del experimento.\n"
            res = self._evaluar_texto(Path(tmpdir), "Caso_Digito_Real", texto)
            self.assertEqual(_rev(res, 6).estado, "FALLA")

    def test_falso_positivo_indice_y_portada_no_cuentan_como_omision(self):
        self.assertTrue(ac._es_indice_o_portada("Capítulo 1: Introducción Organización celular Capítulo 2: Cómo se estudian las células"))
        self.assertTrue(ac._es_indice_o_portada("Introducción " + "Microscopía óptica convencional " * 6))
        self.assertFalse(ac._es_indice_o_portada("La célula es la unidad básica de la vida. " * 5))

    def test_falso_positivo_autoevaluacion_y_esquema_del_pdf_no_son_omision(self):
        """Calibración 16-nov: Saladin daba ~1700 omisiones; la autoevaluación y el esquema se quitan a propósito."""
        self.assertTrue(ac._PDF_FIN_NARRABLE_RE.search("CAPÍTULO 8 El sistema óseo Para probar sus conocimientos, analice"))
        self.assertTrue(ac._PDF_NO_NARRABLE_RE.search("Módulo 5: Sistema esquelético ESQUEMA DEL CAPÍTULO 8.1 Revisión"))
        self.assertFalse(ac._PDF_FIN_NARRABLE_RE.search("El hueso temporal se articula con la mandíbula."))

    def test_texto_limpio_pasa_y_marca_audio_sin_revisar(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            res = self._evaluar_texto(tmp, "Caso_08_Limpio", TEXTO_LIMPIO)
            self.assertEqual(res.veredicto, "APRUEBA")
            for num in range(1, 9):
                self.assertEqual(_rev(res, num).estado, "APRUEBA", f"Falló revisión {num}")
            for num in range(9, 13):
                self.assertEqual(_rev(res, num).estado, "sin revisar")

            self.assertIsNotNone(res.ruta_reporte)
            reporte = res.ruta_reporte.read_text(encoding="utf-8")
            self.assertIn("**APRUEBA**", reporte)
            self.assertIn("sin revisar", reporte)
            self.assertNotIn("| bien |", reporte.lower())

    def test_revisiones_2_4_5_y_8_adicionales(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            # Omisión del segundo párrafo del PDF (rev 2)
            solo_primer_parrafo = (
                "Organización de las células\n\n"
                "La estructura celular interna básica de las células eucariotas está bastante "
                "conservada en los distintos organismos. Su característica fundamental es la presencia "
                "de núcleo, que contiene el material genético en forma de A D N y regula la síntesis "
                "de proteínas.\n"
            )
            res_om = self._evaluar_texto(tmp, "Caso_Omision", solo_primer_parrafo)
            self.assertEqual(_rev(res_om, 2).estado, "FALLA")

            # Nota al pie (rev 4), ref visual (rev 5) y palabra partida/ligadura (rev 8)
            texto_defectos = (
                TEXTO_LIMPIO
                + "\nEl ectodermo,cuatro se desarrolla temprano; véase la figura 1.2 para detalles.\n"
                + "Las fibras coa- gulaban con fi gura nítida.\n"
            )
            res_d = self._evaluar_texto(tmp, "Caso_Varios", texto_defectos)
            self.assertEqual(_rev(res_d, 4).estado, "FALLA")
            self.assertEqual(_rev(res_d, 5).estado, "FALLA")
            self.assertEqual(_rev(res_d, 8).estado, "FALLA")

    def test_audio_completo_12_revisiones_y_resumen(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            ruta_md = tmp / "Tema_01_Limpio.md"
            ruta_pdf = tmp / "Calvo_texto_paginas.txt"
            ruta_wav = tmp / "Tema_01_P01_Limpio.wav"
            ruta_man = tmp / "manifiesto.json"

            ruta_md.write_text(TEXTO_LIMPIO, encoding="utf-8")
            ruta_pdf.write_text(PDF_BASE, encoding="utf-8")
            _escribir_wav_falso(ruta_wav, dur_seg=1.0)
            ruta_man.write_text(
                json.dumps(
                    [
                        {
                            "j": 1,
                            "accion": "SINTETIZAR",
                            "origen": None,
                            "modelo": ac.MODELO_TTS_OFICIAL,
                            "voz": ac.VOZ_OFICIAL,
                            "texto_inicio": "Organización de las células",
                            "sha1": "abc",
                        }
                    ]
                ),
                encoding="utf-8",
            )

            transcripcion_ok = (
                TEXTO_LIMPIO.replace("A D N", "ADN").strip(),
                [
                    {"word": "Organización", "start": 0.1, "end": 0.8},
                    {"word": "de", "start": 0.8, "end": 1.0},
                    {"word": "las", "start": 1.0, "end": 1.2},
                    {"word": "células", "start": 1.2, "end": 1.8},
                    {"word": "exterior", "start": 298.0, "end": 298.6},
                    {"word": "celular.", "start": 298.6, "end": 299.2},
                ],
                300.0,
            )

            with mock.patch.object(ac, "_obtener_duracion_ffprobe", return_value=300.0), mock.patch.object(
                ac, "_medir_volumedetect", return_value=(-18.0, -2.0)
            ), mock.patch.object(ac, "_detectar_silencios_ffmpeg", return_value=[]):
                res_ok = ac.evaluar_capitulo(
                    ruta_texto=ruta_md,
                    ruta_audio=ruta_wav,
                    ruta_pdf_texto=ruta_pdf,
                    ruta_manifiesto=ruta_man,
                    dir_salida=tmp / "aceptacion",
                    transcribir_fn=lambda _: transcripcion_ok,
                )
            self.assertEqual(res_ok.veredicto, "APRUEBA")
            for num in range(1, 13):
                self.assertEqual(_rev(res_ok, num).estado, "APRUEBA", f"Falló rev {num}")

            # Modo --resumen sobre carpeta de MP3 publicados
            carpeta_mp3 = tmp / "AUDIOS_MEDICINA_UMSS"
            mp3_1 = carpeta_mp3 / "Tema_01_P01.mp3"
            mp3_2 = carpeta_mp3 / "Tema_01_P02.mp3"
            mp3_1.parent.mkdir(parents=True, exist_ok=True)
            mp3_1.write_bytes(b"ID3")
            mp3_2.write_bytes(b"ID3")

            def fake_transcribir_resumen(ruta: Path):
                if ruta.name == "Tema_01_P01.mp3":
                    return (
                        "Preguntas de autoevaluación. Respuesta correcta B.",
                        [{"word": "Preguntas", "start": 0.0, "end": 0.5}],
                        240.0,
                    )
                return (
                    "La bomba usa NA más y R iguala constante. Ilustración de E. Maldonado.",
                    [{"word": "La", "start": 0.0, "end": 0.2}],
                    240.0,
                )

            with mock.patch.object(ac, "_obtener_duracion_ffprobe", return_value=240.0), mock.patch.object(
                ac, "_medir_volumedetect", return_value=(-18.0, -2.0)
            ), mock.patch.object(ac, "_detectar_silencios_ffmpeg", return_value=[]):
                resumen = ac.resumir_carpeta_mp3(
                    carpeta_mp3,
                    usar_whisper=True,
                    transcribir_fn=fake_transcribir_resumen,
                )
            self.assertEqual(resumen["total_mp3"], 2)
            self.assertEqual(resumen["piezas_con_falla"][3], 2)
            self.assertEqual(resumen["piezas_con_falla"][6], 1)
            self.assertNotIn("Tema_01_P01.mp3", resumen["texto"])
            self.assertNotIn("| # |", resumen["texto"])

    def test_rev3_temas_de_conexion_saladin(self):
        """16-nov, Ronald «a»: el recuadro «Temas de conexión» de Saladin es relleno (regla 19)."""
        txt = "Texto narrado del capítulo.\n\nTemas de conexión: el tejido óseo en el cuerpo\n\nAPARATO REPRODUCTOR La cintura pélvica protege.\n"
        r = ac._revision_3_relleno(txt)
        self.assertEqual(r.estado, "FALLA")
        self.assertTrue(any("Temas de conexión" in e for e in r.ejemplos))
        self.assertEqual(ac._revision_3_relleno("Texto narrado del capítulo, sin recuadro.\n").estado, "APRUEBA")
        self.assertTrue(ac._PDF_FIN_NARRABLE_RE.search("Temas de conexión: el tejido óseo"))

    def test_rev7_recuadro_conocimiento_mas_a_fondo_en_frase_falla_y_movido_aprueba(self):
        """16-nov, Ronald «a»: recuadro CONOCIMIENTO MÁS A FONDO en medio de una frase falla rev. 7; movido aprueba."""
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            pdf_recuadro = (
                PDF_BASE
                + "Este hábitat arbóreo tal vez les dio la capacidad de agarrarse a las ramas.\n"
                + "CONOCIMIENTO MÁS A FONDO 1.1\n"
                + "Medicina evolutiva\n"
                + "Vestigios de la evolución humana\n"
                + "Una de las líneas clásicas de evidencia en favor de la evolución son las estructuras vestigiales.\n"
            )
            texto_mal = (
                TEXTO_LIMPIO
                + "\nEste hábitat arbóreo tal vez les dio CONOCIMIENTO MÁS A FONDO un coma un "
                "Medicina evolutiva Vestigios de la evolución humana "
                "Una de las líneas clásicas de evidencia en favor de la evolución son las estructuras vestigiales. "
                "la capacidad de agarrarse a las ramas.\n"
            )
            res_mal = self._evaluar_texto(tmp, "Caso_Fondo_Pegado", texto_mal, pdf_texto=pdf_recuadro)
            self.assertEqual(_rev(res_mal, 7).estado, "FALLA")
            self.assertTrue(any("Recuadro pegado al párrafo" in ej for ej in _rev(res_mal, 7).ejemplos))

            texto_ok = (
                TEXTO_LIMPIO
                + "\nEste hábitat arbóreo tal vez les dio la capacidad de agarrarse a las ramas.\n\n"
                "Conocimiento más a fondo uno punto uno. Medicina evolutiva: Vestigios de la evolución humana\n"
                "Una de las líneas clásicas de evidencia en favor de la evolución son las estructuras vestigiales.\n"
            )
            res_ok = self._evaluar_texto(tmp, "Caso_Fondo_Movido", texto_ok, pdf_texto=pdf_recuadro)
            self.assertEqual(_rev(res_ok, 7).estado, "APRUEBA")

    def test_cli_con_rutas_con_espacios(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir) / "carpeta con espacios"
            tmp.mkdir()
            ruta_md = tmp / "Tema 01 Prueba.md"
            ruta_pdf = tmp / "Calvo texto_paginas.txt"
            ruta_out = tmp / "salida aceptacion"
            ruta_md.write_text(TEXTO_LIMPIO, encoding="utf-8")
            ruta_pdf.write_text(PDF_BASE, encoding="utf-8")

            buf = io.StringIO()
            with contextlib.redirect_stdout(buf):
                rc = ac.main(
                    [
                        str(ruta_md),
                        "--pdf-texto",
                        str(ruta_pdf),
                        "--salida",
                        str(ruta_out),
                    ]
                )
            self.assertEqual(rc, 0)
            self.assertTrue((ruta_out / "Tema 01 Prueba.md").is_file())


def main() -> int:
    ac._configurar_stdout_utf8()
    resultado = unittest.main(module=__name__, exit=False, verbosity=2)
    return 0 if resultado.result.wasSuccessful() else 1


class TestRev7TituloEnLineaAparte(unittest.TestCase):
    """16-nov: un pie que ya empieza en línea nueva no cuenta como pegado (falso positivo en Calvo 18)."""

    def test_pie_en_linea_nueva_no_esta_pegado(self):
        self.assertIsNone(ac._REV7_TITULO_PEGADO_RE.search("en los tejidos adultos.\nFIGURA E18-un Jerarquía"))

    def test_pie_pegado_sigue_detectado(self):
        self.assertIsNotNone(ac._REV7_TITULO_PEGADO_RE.search("en los tejidos adultos. FIGURA E18-un Jerarquía"))


if __name__ == "__main__":
    raise SystemExit(main())
