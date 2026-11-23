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


class TestRefuerzoSaladinYRev2(unittest.TestCase):
    """21-nov: detectores de Saladin en rev. 3/4 y mejoras de rev. 2 (guion doble salto + corte Excel)."""

    def test_rev3_parte_incrustado_en_medio_de_linea_y_palabra(self):
        txt1 = "recubre al útero.  PARTE UNO Organización corporal Después de la fijación.\n"
        r1 = ac._revision_3_relleno(txt1)
        self.assertEqual(r1.estado, "FALLA")
        self.assertTrue(any("PARTE" in ej for ej in r1.ejemplos))

        txt2 = "en las glánduPARTE CINCO Reproducción y desarrollo las mamarias.\n"
        r2 = ac._revision_3_relleno(txt2)
        self.assertEqual(r2.estado, "FALLA")
        self.assertTrue(any("PARTE CINCO" in ej for ej in r2.ejemplos))

    def test_rev3_capitulo_inicial_aprueba_y_repetido_falla(self):
        inicio = "CAPÍTULO uno Temas principales de anatomía y fisiología\n\n"
        cuerpo = "La anatomía estudia las estructuras del cuerpo humano y su organización tisular. " * 4
        r_ok = ac._revision_3_relleno(inicio + cuerpo)
        self.assertEqual(r_ok.estado, "APRUEBA")

        con_rep = inicio + cuerpo + "  CAPÍTULO uno Temas principales de anatomía y fisiología cadáveres.\n"
        r_mal = ac._revision_3_relleno(con_rep)
        self.assertEqual(r_mal.estado, "FALLA")
        self.assertTrue(any("CAPÍTULO repetido" in ej for ej in r_mal.ejemplos))

    def test_rev3_vinyeta_autoevaluacion_falla(self):
        txt = "con tres cadáveres. ● ¿Por qué los estudiantes de medicina deben estudiar más de un cadáver? Por supuesto.\n"
        r = ac._revision_3_relleno(txt)
        self.assertEqual(r.estado, "FALLA")
        self.assertTrue(any("●" in ej for ej in r.ejemplos))

    def test_rev4_glosas_hasta_cincuenta_y_biograficas_positivos_y_negativos(self):
        positivos = [
            "Texto. veintiuno osteo igual a hueso; cito igual a célula.",
            "Texto. veinticuatro esfint igual a aplastar, unir de manera apretada. veintiséis inter igual a entre; calado igual a insertado.",
            "Texto. treinta y un ácino igual a baya. treinta y tres cito igual a célula;",
            "Texto. cincuenta dermo igual a piel.",
            "Texto. catorce Caspar Bartholin, mil seiscientos cincuenta y cinco a mil setecientos treinta y ocho, anatomista danés.",
            "Texto. quince Alexander J. C. Skene, mil ochocientos treinta y ocho a mil novecientos, ginecólogo estadounidense.",
        ]
        for muestra in positivos:
            with self.subTest(muestra=muestra):
                r = ac._revision_4_notas_pie(muestra)
                self.assertEqual(r.estado, "FALLA")
                self.assertGreater(r.fallas, 0)

        negativos = (
            "gastro igual a una forma combinada que significa estómago. "
            "entero igual a una forma combinada que significa intestino delgado.\n\n"
            "La sangre mantiene un pH igual a siete coma cuatro y R igual a región.\n\n"
            "La presión igual a fuerza entre área y el producto es igual a la energía total.\n"
        )
        r_neg = ac._revision_4_notas_pie(negativos)
        self.assertEqual(r_neg.estado, "APRUEBA")
        self.assertEqual(r_neg.fallas, 0)

    def test_rev2_guion_con_doble_salto_no_genera_falsa_omision(self):
        pdf_eds = (
            "=== PÁGINA 180 ===\n"
            "180\n"
            "La distribución de Ber-\n\n"
            "noulli describe un experimento aleatorio con dos resultados posibles, éxito o fracaso, "
            "y constituye la base de la distribución binomial en bioestadística clínica.\n"
        )
        parrafos = ac._limpiar_paginas_pdf_crudo(pdf_eds)
        self.assertTrue(any("Bernoulli" in p for p in parrafos))
        self.assertFalse(any("Ber-" in p for p in parrafos))

        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            ruta_md = tmp / "EdS_Parte3_3.md"
            ruta_pdf = tmp / "EdS_texto_paginas.txt"
            ruta_md.write_text(
                "La distribución de Bernoulli describe un experimento aleatorio con dos resultados "
                "posibles, éxito o fracaso, y constituye la base de la distribución binomial en "
                "bioestadística clínica.\n",
                encoding="utf-8",
            )
            ruta_pdf.write_text(pdf_eds, encoding="utf-8")
            res = ac.evaluar_capitulo(ruta_texto=ruta_md, ruta_pdf_texto=ruta_pdf, dir_salida=tmp / "out")
            self.assertEqual(_rev(res, 2).estado, "APRUEBA")

    def test_rev2_corte_ejercicios_10_3_y_capitulo_11_excel(self):
        self.assertTrue(ac._PDF_FIN_NARRABLE_RE.search("10.3 Ejercicios de aplicación sobre probabilidades"))
        self.assertTrue(ac._PDF_FIN_NARRABLE_RE.search("11 ESTADÍSTICA DESCRIPTIVA MEDIANTE MICROSOFT EXCEL"))
        self.assertFalse(ac._PDF_FIN_NARRABLE_RE.search("10.2 Distribución normal estándar en medicina."))

        pdf_con_excel = (
            "=== PÁGINA 189 ===\n"
            "189\n"
            "La distribución normal estándar tiene media cero y desviación típica uno en toda "
            "población estadística continua empleada en ciencias de la salud.\n\n"
            "=== PÁGINA 191 ===\n"
            "191\n"
            "11 ESTADÍSTICA DESCRIPTIVA MEDIANTE MICROSOFT EXCEL\n\n"
            "Para calcular medidas de tendencia central en la hoja de cálculo abra el menú de "
            "herramientas de análisis de datos y seleccione estadística descriptiva.\n"
        )
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            ruta_md = tmp / "EdS_Parte3_3.md"
            ruta_pdf = tmp / "EdS_texto_paginas.txt"
            ruta_md.write_text(
                "La distribución normal estándar tiene media cero y desviación típica uno en toda "
                "población estadística continua empleada en ciencias de la salud.\n",
                encoding="utf-8",
            )
            ruta_pdf.write_text(pdf_con_excel, encoding="utf-8")
            res = ac.evaluar_capitulo(ruta_texto=ruta_md, ruta_pdf_texto=ruta_pdf, dir_salida=tmp / "out")
            self.assertEqual(_rev(res, 2).estado, "APRUEBA")


class TestCalibracionSaladinYEdS(unittest.TestCase):
    """22-nov: calibración de Rev 2 en Saladin, Rev 1/2 en EdS Parte 3 y negativos en Rev 6."""

    def test_rev2_saladin_ruido_pdf_crudo_no_dispara_falsa_omision(self):
        p1_ini = "El tejido epitelial recubre las superficies externas del cuerpo humano,"
        p1_fin = "reviste cavidades internas y forma glándulas secretoras especializadas."
        p2 = (
            "El tejido conjuntivo brinda soporte estructural, une órganos adyacentes y "
            "transporta nutrientes esenciales a través de la matriz extracelular."
        )
        pdf_saladin = (
            "=== PÁGINA 140 ===\n"
            "140\n"
            "CAPÍTULO 5 Histología\n"
            f"{p1_ini} PARTE UNO Organización corporal {p1_fin}\n\n"
            "● ¿Por qué los estudiantes de medicina deben estudiar más de un cadáver "
            "durante el curso inicial de anatomía humana práctica?\n\n"
            "●¿Cuál es la diferencia fundamental entre la epidermis queratinizada y la "
            "dermis reticular en la piel humana?\n\n"
            "1 palp = tocar; ación = acción. 9 pap = pezón; ila = pequeño. "
            "10 reti = red; cul = pequeño. "
            "12 Caspar Bartholin, 1655-1738, anatomista danés.\n\n"
            f"{p2}\n"
        )
        tts_limpio = f"{p1_ini} {p1_fin}\n\n{p2}\n"
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            ruta_pdf = tmp / "Saladin_texto_paginas.txt"
            ruta_pdf.write_text(pdf_saladin, encoding="utf-8")

            ruta_md = tmp / "Tema_05_Morfo_Saladin.md"
            ruta_md.write_text(tts_limpio, encoding="utf-8")
            res = ac.evaluar_capitulo(ruta_texto=ruta_md, ruta_pdf_texto=ruta_pdf, dir_salida=tmp / "out")
            self.assertEqual(_rev(res, 2).estado, "APRUEBA")
            self.assertEqual(_rev(res, 2).fallas, 0)
            self.assertEqual(_rev(res, 2).revisado, 2)

            # Verificar que no se borran párrafos narrables normales: omitir p2 debe fallar Rev 2
            ruta_md_om = tmp / "Tema_05_Morfo_Saladin_Om.md"
            ruta_md_om.write_text(f"{p1_ini} {p1_fin}\n", encoding="utf-8")
            res_om = ac.evaluar_capitulo(ruta_texto=ruta_md_om, ruta_pdf_texto=ruta_pdf, dir_salida=tmp / "out")
            self.assertEqual(_rev(res_om, 2).estado, "FALLA")
            self.assertEqual(_rev(res_om, 2).fallas, 1)

    def test_rev2_eds_intro_autoevaluacion_no_corta_y_seccion_real_si_corta(self):
        self.assertIsNone(
            ac._PDF_FIN_NARRABLE_RE.search(
                "Cada unidad incluye objetivos y Autoevaluación: ejercicios de aplicación para repasar."
            )
        )
        self.assertIsNone(
            ac._PDF_FIN_NARRABLE_RE.search(
                "Autoevaluación: ejercicios de aplicación al cierre de cada capítulo."
            )
        )
        self.assertIsNotNone(ac._PDF_FIN_NARRABLE_RE.search("Autoevaluación"))
        self.assertIsNotNone(ac._PDF_FIN_NARRABLE_RE.search("Preguntas de autoevaluación"))
        self.assertIsNotNone(
            ac._PDF_NO_NARRABLE_RE.search("5.3 Ejercicios de aplicación sobre frecuencias.")
        )
        self.assertIsNotNone(
            ac._PDF_NO_NARRABLE_RE.search("Realice las tablas de frecuencias correspondientes.")
        )
        self.assertIsNone(
            ac._PDF_NO_NARRABLE_RE.search("La mediana divide un conjunto ordenado en dos partes iguales.")
        )

        intro = (
            "Cada capítulo del manual incluye objetivos generales, desarrollo teórico detallado "
            "y una sección final llamada Autoevaluación: ejercicios de aplicación para consolidar "
            "el aprendizaje."
        )
        teoria_1_pdf = (
            "Como se observa en la tabla 22, la frecuencia relativa expresa la proporción de "
            "observaciones en cada categoría respecto al total de la muestra clínica estudiada."
        )
        teoria_1_tts = (
            "La frecuencia relativa expresa la proporción de observaciones en cada categoría "
            "respecto al total de la muestra clínica estudiada."
        )
        teoria_2_pdf = (
            "En la tabla 30 se observa que la distribución de frecuencias acumuladas permite "
            "identificar rápidamente los percentiles y cuartiles de cualquier conjunto ordenado "
            "de mediciones médicas."
        )
        teoria_2_tts = (
            "La distribución de frecuencias acumuladas permite identificar rápidamente los "
            "percentiles y cuartiles de cualquier conjunto ordenado de mediciones médicas."
        )
        pdf_eds = (
            "=== PÁGINA 1 ===\n"
            "1\n"
            f"{intro}\n\n"
            f"{teoria_1_pdf}\n\n"
            "5.3 Ejercicios de aplicación sobre organización tabular de variables cualitativas y "
            "cuantitativas continuas en encuestas de salud pública.\n\n"
            "Realice las tablas de distribución de frecuencias absolutas, relativas y acumuladas "
            "para los siguientes datos clínicos registrados.\n\n"
            f"{teoria_2_pdf}\n\n"
            "Autoevaluación\n\n"
            "Calcule la media aritmética, la mediana y la desviación estándar de las edades "
            "registradas en la encuesta hospitalaria del municipio.\n"
        )
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            ruta_pdf = tmp / "EdS_texto_paginas.txt"
            ruta_pdf.write_text(pdf_eds, encoding="utf-8")

            ruta_md = tmp / "EdS_Parte3_1.md"
            ruta_md.write_text(f"{intro}\n\n{teoria_1_tts}\n\n{teoria_2_tts}\n", encoding="utf-8")
            res = ac.evaluar_capitulo(ruta_texto=ruta_md, ruta_pdf_texto=ruta_pdf, dir_salida=tmp / "out")
            self.assertEqual(_rev(res, 2).estado, "APRUEBA")
            self.assertEqual(_rev(res, 2).fallas, 0)
            self.assertEqual(_rev(res, 2).revisado, 3)

            # Si el TTS omite teoria_2, Rev 2 debe fallar (la mención en intro NO cortó el PDF)
            ruta_md_om = tmp / "EdS_Parte3_1_Om.md"
            ruta_md_om.write_text(f"{intro}\n\n{teoria_1_tts}\n", encoding="utf-8")
            res_om = ac.evaluar_capitulo(ruta_texto=ruta_md_om, ruta_pdf_texto=ruta_pdf, dir_salida=tmp / "out")
            self.assertEqual(_rev(res_om, 2).estado, "FALLA")
            self.assertEqual(_rev(res_om, 2).fallas, 1)

    def test_rev1_tablas_narradas_y_formulas_verbalizadas_aprueban_y_prosa_inventada_falla(self):
        pdf_eds = (
            "=== PÁGINA 1 ===\n"
            "1\n"
            "Institución Calidad académica Antigüedad en años\n"
            "Universidad Mayor excelente 40 años\n"
            "Colegios públicos 7000 10000 0,70\n"
            "Sesgo para la puntuación en distribución asimétrica a la derecha.\n\n"
            "La media aritmética es la medida de tendencia central más utilizada en bioestadística "
            "para resumir variables cuantitativas continuas.\n"
        )
        tts_valido = (
            "La media aritmética es la medida de tendencia central más utilizada en bioestadística "
            "para resumir variables cuantitativas continuas.\n\n"
            "Tabla. Para cada Institución, se dan: Calidad académica, Antigüedad en años. "
            "uno: Universidad Mayor, excelente, cuarenta años.\n\n"
            "Tabla treinta y seis. Sesgo para la puntuación de colegios públicos.\n\n"
            "equis barra igual a sigma, i igual a uno hasta n, x i dividido entre n\n\n"
            "g uno igual a sigma, x i menos equis barra, al cubo sobre, n s al cubo\n\n"
            "Colegios públicos: siete mil dividido entre diez mil igual a cero coma siete cero\n\n"
            "Sesgo mayor que cero: sesgo positivo o a la derecha.\n"
        )
        with tempfile.TemporaryDirectory() as tmpdir:
            tmp = Path(tmpdir)
            ruta_pdf = tmp / "EdS_texto_paginas.txt"
            ruta_pdf.write_text(pdf_eds, encoding="utf-8")

            r_ok = ac._revision_1_literalidad(tts_valido, ruta_pdf)
            self.assertEqual(r_ok.estado, "APRUEBA")
            self.assertEqual(r_ok.fallas, 0)

            tts_prosa_inv = (
                tts_valido
                + "\nLos investigadores del laboratorio moderno diseñaron un microscopio digital "
                "para evaluar muestras biológicas complejas.\n"
            )
            r_prosa = ac._revision_1_literalidad(tts_prosa_inv, ruta_pdf)
            self.assertEqual(r_prosa.estado, "FALLA")
            self.assertEqual(r_prosa.fallas, 1)

            tts_tabla_inv = (
                tts_valido
                + "\nTabla. Para cada planeta lejano, se dan: galaxia dorada, cometa azul.\n"
            )
            r_tabla = ac._revision_1_literalidad(tts_tabla_inv, ruta_pdf)
            self.assertEqual(r_tabla.estado, "FALLA")
            self.assertEqual(r_tabla.fallas, 1)

    def test_rev6_decimales_negativos_aprueban_y_positivos_miles_fallan(self):
        self.assertIsNone(ac._REV6_MILES_PALABRAS_RE.search("menos uno coma siete nueve dos"))
        r_neg = ac._revision_6_simbolos_iones_miles(
            "La curtosis calculada es menos uno coma siete nueve dos en la muestra.\n"
            "Otro coeficiente resultó menos treinta y uno coma siete nueve dos.\n"
        )
        self.assertEqual(r_neg.estado, "APRUEBA")
        self.assertEqual(r_neg.fallas, 0)

        for positivo in (
            "uno coma cinco cero cero",
            "dos coma tres cuatro cinco",
            "uno coma dos cero ocho",
        ):
            with self.subTest(positivo=positivo):
                self.assertIsNotNone(ac._REV6_MILES_PALABRAS_RE.search(positivo))
                r_pos = ac._revision_6_simbolos_iones_miles(f"La población alcanza {positivo} habitantes.\n")
                self.assertEqual(r_pos.estado, "FALLA")
                self.assertGreater(r_pos.fallas, 0)


class TestCalibracionRev9Whisper(unittest.TestCase):
    """22-nov: calibración de _normalizar_para_whisper (miles con coma/punto y subtítulos numerados)."""

    def test_rev9_miles_con_coma_y_punto_no_generan_falsos_positivos(self):
        esperado = (
            "En la encuesta participaron mil personas, dos mil docentes, diez mil niños, "
            "cincuenta mil familias y un millón de habitantes en el país."
        )
        oido = (
            "En la encuesta participaron 1,000 personas, 2,000 docentes, 10,000 niños, "
            "50.000 familias y 1,000,000 de habitantes en el país."
        )
        r = ac._revision_9_whisper_vs_texto(esperado, (oido, [], 60.0))
        self.assertEqual(r.estado, "APRUEBA")
        self.assertEqual(r.fallas, 0)

        r_punto = ac._revision_9_whisper_vs_texto(
            "La muestra reúne mil observaciones clínicas válidas.",
            ("La muestra reúne 1.000 observaciones clínicas válidas.", [], 30.0),
        )
        self.assertEqual(r_punto.estado, "APRUEBA")
        self.assertEqual(r_punto.fallas, 0)

    def test_rev9_decimal_real_sigue_normalizando_como_decimal(self):
        self.assertEqual(
            ac._normalizar_para_whisper("1,208"),
            ["uno", "coma", "dos", "cero", "ocho"],
        )
        self.assertEqual(
            ac._normalizar_para_whisper("1,028"),
            ["uno", "coma", "cero", "dos", "ocho"],
        )
        self.assertEqual(
            ac._normalizar_para_whisper("3,14"),
            ["tres", "coma", "uno", "cuatro"],
        )
        r = ac._revision_9_whisper_vs_texto(
            "El resultado intermedio es uno coma dos cero ocho en la fórmula.",
            ("El resultado intermedio es 1,208 en la fórmula.", [], 20.0),
        )
        self.assertEqual(r.estado, "APRUEBA")
        self.assertEqual(r.fallas, 0)

    def test_rev9_subtitulos_numerados_dos_y_tres_niveles_aprueban(self):
        esperado = (
            "En este bloque veremos uno punto siete Parámetros y estadígrafos, "
            "uno punto ocho Variables y uno punto ocho punto uno Variables cualitativas "
            "desde un punto de vista aplicado."
        )
        oido = (
            "En este bloque veremos 1.7 Parámetros y estadígrafos, "
            "1.8 Variables y 1.8.1 Variables cualitativas "
            "desde un punto de vista aplicado."
        )
        r = ac._revision_9_whisper_vs_texto(esperado, (oido, [], 45.0))
        self.assertEqual(r.estado, "APRUEBA")
        self.assertEqual(r.fallas, 0)
        # «punto» en prosa normal no se altera
        self.assertIn("punto", ac._normalizar_para_whisper("desde un punto de vista aplicado"))

    def test_rev9_omision_real_de_numeracion_si_reporta_falla(self):
        esperado = (
            "A continuación estudiamos dos punto uno punto cuatro Muestreo aleatorio "
            "por conglomerados en estudios poblacionales."
        )
        oido = (
            "A continuación estudiamos Muestreo aleatorio "
            "por conglomerados en estudios poblacionales."
        )
        r = ac._revision_9_whisper_vs_texto(esperado, (oido, [], 30.0))
        self.assertEqual(r.estado, "FALLA")
        self.assertGreater(r.fallas, 0)


if __name__ == "__main__":
    raise SystemExit(main())
