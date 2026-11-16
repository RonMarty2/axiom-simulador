# -*- coding: utf-8 -*-
"""Pruebas unitarias para corregir_textos_v2.py (Python 3.11 puro, unittest)."""

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path

import corregir_textos_v2 as C


class TestLigadurasPartidas(unittest.TestCase):
    def test_une_ligaduras_seguras_y_conserva_palabras_legitimas(self) -> None:
        entrada = (
            "En la fi gura se observa un corte superfi cial con signifi cado "
            "para el fl ujo de fisiología, donde el valor fi es constante y hay wifi para todos."
        )
        esperado = (
            "En la figura se observa un corte superficial con significado "
            "para el flujo de fisiología, donde el valor fi es constante y hay wifi para todos."
        )
        res = C.corregir_ligaduras_partidas(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 4)
        self.assertEqual(res.no_resueltos, [])

    def test_reporta_corte_por_guion_sin_adivinar(self) -> None:
        entrada = "Se ubica en el mar- cuatro del margen."
        res = C.corregir_ligaduras_partidas(entrada)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertTrue(any("mar- cuatro" in x for x in res.no_resueltos))


class TestIones(unittest.TestCase):
    def test_convierte_iones_con_carga_y_respeta_palabras_con_na(self) -> None:
        entrada = (
            "Los iones Na+, K+, Ca2+, Cl–, H+, HCO3– y Mg2+ participan en "
            "Natación con NaCl y Na sin carga."
        )
        esperado = (
            "Los iones sodio, potasio, calcio, cloruro, hidrógeno, bicarbonato y magnesio participan en "
            "Natación con NaCl y Na sin carga."
        )
        res = C.corregir_iones(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 7)

    def test_reporta_iones_mal_convertidos_previos(self) -> None:
        entrada = "Aumentan NA más y CA2 más en el medio."
        res = C.corregir_iones(entrada)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertEqual(len(res.no_resueltos), 2)


class TestConversionesRotas(unittest.TestCase):
    def test_convierte_loci_cromosomicos_y_reporta_otros_codigos(self) -> None:
        entrada = (
            "Afecta al cromosoma 12p13. Otra mutación en el cromosoma 19q13.un,. "
            "También en la subunidad β1."
        )
        esperado = (
            "Afecta al cromosoma doce p trece. Otra mutación en el cromosoma diecinueve q trece punto uno,. "
            "También en la subunidad β1."
        )
        res = C.corregir_conversiones_rotas(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 2)
        self.assertTrue(any("β1" in x for x in res.no_resueltos))


class TestCreditos(unittest.TestCase):
    def test_elimina_creditos_sin_romper_cuerpo(self) -> None:
        entrada = (
            "Presión del agua. , Ilustración de: E. Maldonado., El flujo sigue. "
            "Fuente: archivo institucional. "
            "La fuente principal es la energía."
        )
        esperado = "Presión del agua. El flujo sigue. La fuente principal es la energía."
        res = C.eliminar_creditos(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 2)

    def test_elimina_etiqueta_credito_vacia_sin_borrar_texto_siguiente(self) -> None:
        entrada = "Entre eritrocitos. , Procedente de: Hongos Los hongos son eucariotas."
        esperado = "Entre eritrocitos. Hongos Los hongos son eucariotas."
        res = C.eliminar_creditos(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 1)


class TestReferenciasFiguras(unittest.TestCase):
    def test_elimina_referencias_y_conserva_pies_y_oraciones(self) -> None:
        entrada = (
            "El cráneo (véase la figura ocho coma dos) protege el encéfalo. "
            "El esqueleto , fi gura ocho coma un, se divide en dos. "
            "Como se muestra en la figura ocho coma tres, el tejido es denso. "
            "FIGURA ocho coma dos Características anatómicas de los huesos."
        )
        esperado = (
            "El cráneo protege el encéfalo. "
            "El esqueleto se divide en dos. "
            "El tejido es denso. "
            "FIGURA ocho coma dos Características anatómicas de los huesos."
        )
        res = C.eliminar_referencias_figuras(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 3)

    def test_no_rompe_oracion_donde_figura_es_sujeto_y_la_reporta(self) -> None:
        entrada = "La figura ocho coma dos muestra las cavidades."
        res = C.eliminar_referencias_figuras(entrada)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertTrue(res.no_resueltos)


class TestSiglas(unittest.TestCase):
    def test_deletrea_siglas_de_lista_y_reporta_desconocidas(self) -> None:
        entrada = "Aumentan AMPc, ECJ, MALT y TMJ junto con ATPasa y factor XYZ en el Capítulo IV."
        esperado = "Aumentan A M P c, E C J, M A L T y T M J junto con ATPasa y factor XYZ en el Capítulo IV."
        res = C.corregir_siglas(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 4)
        self.assertEqual(res.no_resueltos, ["Sigla fuera de lista: XYZ"])


class TestIntegracionRespaldoEIdempotencia(unittest.TestCase):
    def test_idempotencia_respaldo_y_solo_reportar(self) -> None:
        contenido_orig = (
            "En la fi gura se ve Na+ y AMPc (véase la figura ocho coma dos). "
            ", Ilustración de: E. Maldonado., Cromosoma 19q13.un."
        )
        with tempfile.TemporaryDirectory() as tmp:
            carpeta = Path(tmp)
            archivo = carpeta / "Tema_99_Morfo_Saladin_LITERAL_TTS.md"
            archivo.write_text(contenido_orig, encoding="utf-8")

            # 1) --solo-reportar no modifica ni crea respaldo
            res_rep = C.procesar_archivo(archivo, solo_reportar=True)
            self.assertFalse(res_rep.modificado)
            self.assertIsNone(res_rep.respaldo)
            self.assertEqual(archivo.read_text(encoding="utf-8"), contenido_orig)
            self.assertFalse((carpeta / C.NOMBRE_DIR_RESPALDO).exists())

            # 2) Primera ejecución real: respalda y corrige
            res1 = C.procesar_archivo(archivo, solo_reportar=False)
            self.assertTrue(res1.modificado)
            ruta_bak = carpeta / C.NOMBRE_DIR_RESPALDO / archivo.name
            self.assertTrue(ruta_bak.is_file())
            self.assertEqual(ruta_bak.read_text(encoding="utf-8"), contenido_orig)
            texto_pasada1 = archivo.read_text(encoding="utf-8")

            # 3) Segunda ejecución: idempotente y nunca sobrescribe respaldo
            res2 = C.procesar_archivo(archivo, solo_reportar=False)
            self.assertFalse(res2.modificado)
            self.assertEqual(sum(res2.cambios_por_tipo.values()), 0)
            self.assertEqual(archivo.read_text(encoding="utf-8"), texto_pasada1)
            self.assertEqual(ruta_bak.read_text(encoding="utf-8"), contenido_orig)


if __name__ == "__main__":
    unittest.main()
