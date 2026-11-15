# -*- coding: utf-8 -*-
"""Pruebas unitarias y de integracion para scripts/audio/bloques_afectados.py."""

from __future__ import annotations

import csv
import os
import re
import sys
import tempfile
import unittest
from pathlib import Path

DIR_SCRIPT = Path(__file__).resolve().parent
if str(DIR_SCRIPT) not in sys.path:
    sys.path.insert(0, str(DIR_SCRIPT))

import bloques_afectados as ba  # noqa: E402


def _normalizar_falso(
    texto: str,
    *,
    siglas=(),
    reemplazos=(),
    decimal: str = ",",
    quitar_figuras: bool = True,
    conservar_etiquetas: bool = True,
    notas_al_pie: bool = False,
) -> str:
    """Normalizador sintetico determinista para probar sin archivos reales."""
    t = texto
    for patron, sust in reemplazos:
        t = re.sub(patron, sust, t)
    t = re.sub(r"\bp\.\s*ej\.", "por ejemplo", t, flags=re.IGNORECASE)
    t = re.sub(r"([A-Za-z]+)-\s+([a-z]+)", r"\1\2", t)
    t = re.sub(r"\bfi\s+gura\b", "figura", t, flags=re.IGNORECASE)
    t = re.sub(r"[ \t]+,", ",", t)
    t = re.sub(r"[ \t]+", " ", t)
    return t.strip()


def _revisar_falso(texto: str, *, siglas=()) -> list[str]:
    """Revisor sintetico para pruebas aisladas sin depender de fonetica_es externo."""
    problemas: list[str] = []
    if re.search(r"\b(?:un|veinti[uú]n)\s+coma\b", texto, re.IGNORECASE):
        problemas.append("Uso de 'un coma' (1): un coma")
    m_corte = re.search(r"\b[A-Za-z]+-\s+[a-z]+\b", texto)
    if m_corte:
        problemas.append(f"Palabras cortadas (1): {m_corte.group(0)}")
    m_lig = re.search(r"\bfi\s+gura\b", texto, re.IGNORECASE)
    if m_lig:
        problemas.append(f"Ligadura partida (1): {m_lig.group(0)}")
    m_fig = re.search(r"\ben la figura \w+", texto, re.IGNORECASE)
    if m_fig:
        problemas.append(f"Referencias visuales en cuerpo (1): {m_fig.group(0)}")
    m_pag = re.search(r"\bpp?\.\s+[a-z]+\b", texto, re.IGNORECASE)
    if m_pag:
        problemas.append(f"Referencia de página (1): {m_pag.group(0)}")
    return problemas


class TestCorteBloques(unittest.TestCase):
    """Comprueba la regla de corte copiada de sintetizar_libro.py."""

    def test_texto_vacio(self):
        self.assertEqual(ba.dividir_capitulo_en_bloques(""), [])
        self.assertEqual(ba.dividir_capitulo_en_bloques("   \n\n  "), [])

    def test_agrupa_parrafos_cortos_hasta_max_palabras(self):
        p1 = " ".join(["celula"] * 40) + "."
        p2 = " ".join(["nucleo"] * 40) + "."
        p3 = " ".join(["mitocondria"] * 40) + "."
        texto = f"{p1}\n\n{p2}\n\n{p3}"

        bloques = ba.dividir_capitulo_en_bloques(texto, max_palabras=100)
        self.assertEqual(len(bloques), 2)
        self.assertEqual(bloques[0], f"{p1}\n\n{p2}")
        self.assertEqual(bloques[1], p3)

    def test_parte_parrafo_largo_por_oraciones(self):
        o1 = " ".join(["alfa"] * 55) + "."
        o2 = " ".join(["beta"] * 55) + "."
        o3 = " ".join(["gamma"] * 30) + "."
        texto = f"{o1} {o2} {o3}"

        bloques = ba.dividir_capitulo_en_bloques(texto, max_palabras=100)
        self.assertEqual(len(bloques), 2)
        self.assertEqual(bloques[0], o1)
        self.assertEqual(bloques[1], f"{o2} {o3}")

    def test_conserva_etiquetas_antes_de_sanitizar(self):
        texto = "Primera frase <long pause> segunda frase.\n\nOtro parrafo <chuckle>."
        bloques = ba.dividir_capitulo_en_bloques(texto, max_palabras=100)
        self.assertEqual(len(bloques), 1)
        self.assertIn("<long pause>", bloques[0])
        self.assertIn("<chuckle>", bloques[0])


class TestPatronMiles(unittest.TestCase):
    """Comprueba deteccion de miles leidos como decimal en palabras."""

    def test_casos_positivos(self):
        casos = [
            "Hace un coma cinco cero cero millones de celulas.",
            "Habia dos coma cero cero cero bacterias en la muestra.",
            "Cerca de treinta y cinco coma cuatro cero cero pacientes.",
            "Un total de veintiún coma cero cero cero registros.",
            "Aproximadamente ciento veinticinco coma tres dos uno casos.",
            "Un coma cinco cero cero",
            "Dos coma cero cero cero y mas tarde otros tantos.",
        ]
        for texto in casos:
            with self.subTest(texto=texto):
                matches = ba.detectar_miles_en_palabras(texto)
                self.assertTrue(len(matches) >= 1, f"Debio detectar miles en: {texto}")

    def test_casos_negativos_decimales_reales_y_otros(self):
        casos = [
            "La concentracion fue de cero coma cinco cero cero mg por ml.",
            "El valor promedio fue de un coma cinco por ciento.",
            "En la seccion dos coma tres cuatro del libro.",
            "Medida precisa de un coma dos tres cuatro cinco unidades.",
            "Se obtuvieron un coma cinco cero ceros adicionales.",
            "Noventa y nueve coma cinco por ciento de confianza.",
        ]
        for texto in casos:
            with self.subTest(texto=texto):
                matches = ba.detectar_miles_en_palabras(texto)
                self.assertEqual(matches, [], f"Falso positivo en: {texto}")


class TestAnalisisBloque(unittest.TestCase):
    """Comprueba deteccion combinada con normalizar, revisar y extractos."""

    def test_bloque_limpio_no_se_reporta(self):
        bloque = "La celula eucariota posee un nucleo definido y membrana plasmatica."
        hallazgos, tiene_miles = ba.analizar_bloque(
            "Tema_Test_LITERAL_TTS.md",
            1,
            bloque,
            _normalizar_falso,
            _revisar_falso,
        )
        self.assertEqual(hallazgos, [])
        self.assertFalse(tiene_miles)

    def test_detecta_miles_y_cambio_en_normalizar_y_revisar(self):
        relleno = "texto previo limpio " * 12
        bloque = (
            f"{relleno}En el estudio , p. ej. con micro- scopio y en la fi gura dos, "
            "se contaron un coma cinco cero cero celulas y dos coma un gramos, "
            "vease p. setecientos."
        )
        hallazgos, tiene_miles = ba.analizar_bloque(
            "Tema_Test_LITERAL_TTS.md",
            3,
            bloque,
            _normalizar_falso,
            _revisar_falso,
        )
        self.assertTrue(tiene_miles)
        tipos = [h.tipo_problema for h in hallazgos]
        self.assertIn("miles leídos como decimal", tipos)
        self.assertIn("cambio en normalizar", tipos)
        self.assertIn("revisar: Uso de 'un coma'", tipos)
        self.assertIn("revisar: Uso de 'coma un'", tipos)
        self.assertIn("revisar: Palabras cortadas", tipos)
        self.assertIn("revisar: Ligadura partida", tipos)
        self.assertIn("revisar: Referencias visuales en cuerpo", tipos)
        self.assertIn("revisar: Referencia de página", tipos)

        for h in hallazgos:
            self.assertEqual(h.bloque, "003")
            self.assertLessEqual(len(h.extracto_viejo), 80)
            self.assertLessEqual(len(h.extracto_nuevo), 80)

    def test_bloque_solo_dos_coma_cero_cero_cero(self):
        bloque = "Se registraron dos coma cero cero cero muestras."
        hallazgos, tiene_miles = ba.analizar_bloque(
            "Tema_Test_LITERAL_TTS.md",
            2,
            bloque,
            _normalizar_falso,
            _revisar_falso,
        )
        self.assertTrue(tiene_miles)
        self.assertEqual(
            [h.tipo_problema for h in hallazgos],
            ["miles leídos como decimal"],
        )
        self.assertIn("dos coma cero cero cero", hallazgos[0].extracto_viejo)
        self.assertTrue(hallazgos[0].extracto_nuevo.startswith("[sin cambio]"))


class TestIntegracionCLI(unittest.TestCase):
    """Prueba la ejecucion completa usando un entorno temporal aislado sin fitz."""

    def setUp(self):
        self._sys_path_orig = list(sys.path)
        self._env_orig = os.environ.get("AGENTES_CENTRAL")
        self._mod_extraer = sys.modules.pop("extraer_literal_pdf", None)
        self._mod_fonetica = sys.modules.pop("fonetica_es", None)
        self._tenia_fitz = "fitz" in sys.modules
        self._mod_fitz = sys.modules.get("fitz")

    def tearDown(self):
        sys.path[:] = self._sys_path_orig
        if self._env_orig is None:
            os.environ.pop("AGENTES_CENTRAL", None)
        else:
            os.environ["AGENTES_CENTRAL"] = self._env_orig

        sys.modules.pop("extraer_literal_pdf", None)
        if self._mod_extraer is not None:
            sys.modules["extraer_literal_pdf"] = self._mod_extraer

        sys.modules.pop("fonetica_es", None)
        if self._mod_fonetica is not None:
            sys.modules["fonetica_es"] = self._mod_fonetica

        if not self._tenia_fitz:
            sys.modules.pop("fitz", None)
        elif self._mod_fitz is not None:
            sys.modules["fitz"] = self._mod_fitz

    def _crear_entorno_temporal(self, raiz: Path) -> tuple[Path, Path]:
        motor_dir = raiz / "_MOTOR_AUDIO"
        textos_dir = raiz / "_TEXTO_LITERAL_VERIFICADO"
        central_dir = raiz / "_AGENTES_CENTRAL" / "herramientas"
        motor_dir.mkdir(parents=True)
        textos_dir.mkdir(parents=True)
        central_dir.mkdir(parents=True)

        (central_dir / "fonetica_es.py").write_text(
            """
import re

def normalizar(texto, *, siglas=(), reemplazos=(), decimal=",", quitar_figuras=True, conservar_etiquetas=True, notas_al_pie=False):
    t = texto
    for pat, sust in reemplazos:
        t = re.sub(pat, sust, t)
    t = re.sub(r"\\bp\\.\\s*ej\\.", "por ejemplo", t, flags=re.IGNORECASE)
    t = re.sub(r"[ \\t]+,", ",", t)
    return t.strip()

def revisar(texto, *, siglas=()):
    probs = []
    if re.search(r"\\b(?:un|veintiún)\\s+coma\\b", texto, re.IGNORECASE):
        probs.append("Uso de 'un coma' (1): un coma")
    m = re.search(r"\\bpp?\\.\\s+[a-z]+\\b", texto, re.IGNORECASE)
    if m:
        probs.append(f"Referencia de página (1): {m.group(0)}")
    return probs
""".strip(),
            encoding="utf-8",
        )

        (motor_dir / "extraer_literal_pdf.py").write_text(
            """
import os
import sys
import fitz

_central = os.path.join(os.environ["AGENTES_CENTRAL"], "herramientas")
if _central not in sys.path:
    sys.path.insert(0, _central)
import fonetica_es

SIGLAS_MEDICINA = ["ADN", "ARN"]
REEMPLAZOS_MEDICINA = [(r"\\bE\\.\\s*coli\\b", "E coli")]
""".strip(),
            encoding="utf-8",
        )

        os.environ["AGENTES_CENTRAL"] = str(raiz / "_AGENTES_CENTRAL")

        b1 = " ".join(["celula"] * 95) + "."
        b2 = (
            " ".join(["muestra"] * 85)
            + ". Se observaron un coma cinco cero cero bacterias en el cultivo."
        )
        b3 = "Las bacterias , p. ej. E. coli, viven en el intestino."
        (textos_dir / "Tema_01_Prueba_LITERAL_TTS.md").write_text(
            f"{b1}\n\n{b2}\n\n{b3}",
            encoding="utf-8",
        )

        (textos_dir / "Tema_02_Prueba_LITERAL_TTS.md").write_text(
            "En dos coma cero cero cero casos, consulte la p. setecientos.",
            encoding="utf-8",
        )
        return motor_dir, textos_dir

    def test_cli_todos_los_archivos_y_archivo_unico(self):
        with tempfile.TemporaryDirectory() as tmp:
            raiz = Path(tmp)
            motor_dir, _ = self._crear_entorno_temporal(raiz)
            csv_todos = raiz / "salida_todos.csv"

            rc = ba.main([str(motor_dir), "--salida", str(csv_todos)])
            self.assertEqual(rc, 0)
            self.assertTrue(csv_todos.is_file())

            with open(csv_todos, "r", encoding="utf-8", newline="") as f:
                filas = list(csv.DictReader(f))

            self.assertTrue(len(filas) >= 4)
            archivos_en_csv = {r["archivo"] for r in filas}
            self.assertEqual(
                archivos_en_csv,
                {"Tema_01_Prueba_LITERAL_TTS.md", "Tema_02_Prueba_LITERAL_TTS.md"},
            )
            bloques_t1 = {
                r["bloque"]
                for r in filas
                if r["archivo"] == "Tema_01_Prueba_LITERAL_TTS.md"
            }
            self.assertEqual(bloques_t1, {"002", "003"})

            for r in filas:
                self.assertEqual(len(r["bloque"]), 3)
                self.assertLessEqual(len(r["extracto_viejo"]), 80)
                self.assertLessEqual(len(r["extracto_nuevo"]), 80)

            csv_uno = raiz / "salida_uno.csv"
            rc2 = ba.main(
                [
                    str(motor_dir),
                    "Tema_02_Prueba_LITERAL_TTS.md",
                    "--salida",
                    str(csv_uno),
                ]
            )
            self.assertEqual(rc2, 0)
            with open(csv_uno, "r", encoding="utf-8", newline="") as f:
                filas_uno = list(csv.DictReader(f))

            self.assertEqual(
                {r["archivo"] for r in filas_uno},
                {"Tema_02_Prueba_LITERAL_TTS.md"},
            )
            tipos_uno = {r["tipo_problema"] for r in filas_uno}
            self.assertIn("miles leídos como decimal", tipos_uno)
            self.assertIn("revisar: Referencia de página", tipos_uno)


if __name__ == "__main__":
    unittest.main(verbosity=2)
