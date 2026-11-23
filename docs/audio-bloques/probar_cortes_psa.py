# -*- coding: utf-8 -*-
"""Pruebas unitarias para mapa_titulos_psa.py, proponer_cortes.py y cortar_audiolibro.py."""

from __future__ import annotations

import json
import math
import shutil
import struct
import sys
import tempfile
import unittest
import wave
from pathlib import Path

DIR_ACTUAL = Path(__file__).resolve().parent
if str(DIR_ACTUAL) not in sys.path:
    sys.path.insert(0, str(DIR_ACTUAL))

import cortar_audiolibro as ca  # noqa: E402
import mapa_titulos_psa as mt  # noqa: E402
import proponer_cortes as pc  # noqa: E402


class TestProponerCortes(unittest.TestCase):
    """Pruebas del algoritmo de propuesta de cortes por subtítulo (PLAN_CORTE_POR_SUBTITULO.md)."""

    def test_1_agrupa_subtitulos_cortos_en_partes_5_a_15_min_sin_perder_palabras(self):
        # 10 subtítulos cortos de 350 palabras (~2.3 min) cada uno = 3500 palabras totales
        titulos = [
            {"nivel": 1, "numero": f"1.{i}", "titulo": f"Subtema {i}", "palabra": i * 350, "narrable": True}
            for i in range(10)
        ]
        mapa = {
            "capitulo": "EdS_Test_Cortos",
            "libro": "EdS",
            "titulo_capitulo": "Capítulo con subtemas cortos",
            "palabras_texto": 3500,
            "titulos": titulos,
        }
        prop = pc.proponer_cortes_capitulo(mapa)
        self.assertGreaterEqual(len(prop.partes), 2)
        self.assertEqual(sum(p.palabras for p in prop.partes), 3500)
        for p in prop.partes:
            self.assertGreaterEqual(p.palabras, pc.OBJ_MIN_PALABRAS)
            self.assertLessEqual(p.palabras, pc.OBJ_MAX_PALABRAS)

    def test_2_divide_subtitulo_nivel1_mayor_20_min_con_hijos_nivel2_y_3(self):
        # Nivel 1 de 5500 palabras (> 20 min) con un hijo nivel 2 normal (1500) y otro largo (3900) con hijos nivel 3
        mapa = {
            "capitulo": "Saladin_tema_99",
            "libro": "Saladin",
            "titulo_capitulo": "Capítulo jerárquico largo",
            "palabras_texto": 5500,
            "titulos": [
                {"nivel": 1, "numero": "99.1", "titulo": "Sección muy larga", "palabra": 100, "narrable": True},
                {"nivel": 2, "numero": "", "titulo": "Subtema A", "palabra": 200, "narrable": True},
                {"nivel": 2, "numero": "", "titulo": "Subtema B extenso", "palabra": 1700, "narrable": True},
                {"nivel": 3, "numero": "", "titulo": "Detalle B1", "palabra": 1800, "narrable": True},
                {"nivel": 3, "numero": "", "titulo": "Detalle B2", "palabra": 3700, "narrable": True},
            ],
        }
        prop = pc.proponer_cortes_capitulo(mapa)
        self.assertEqual(sum(p.palabras for p in prop.partes), 5500)
        self.assertEqual(len(prop.partes), 3)
        for p in prop.partes:
            self.assertLessEqual(p.palabras, pc.ACEPTABLE_MAX_PALABRAS)
            self.assertGreaterEqual(p.palabras, pc.ACEPTABLE_MIN_PALABRAS)

    def test_3_subtitulo_mayor_20_min_sin_hijos_queda_entero_y_anotado(self):
        mapa = {
            "capitulo": 3,
            "titulo_capitulo": "Estructura de la membrana",
            "palabras_texto": 5800,
            "titulos": [
                {"nivel": 1, "titulo": "Introducción", "palabra": 50, "narrable": True},
                {"nivel": 1, "titulo": "Lípidos de membrana", "palabra": 1000, "narrable": True},
                {"nivel": 1, "titulo": "Glucocáliz", "palabra": 5000, "narrable": True},
            ],
        }
        prop = pc.proponer_cortes_capitulo(mapa)
        self.assertEqual(sum(p.palabras for p in prop.partes), 5800)
        largas = [p for p in prop.partes if p.palabras > pc.ACEPTABLE_MAX_PALABRAS]
        self.assertEqual(len(largas), 1)
        self.assertEqual(largas[0].palabras, 4000)
        self.assertIn(">20 min (sin sub-subtítulos)", largas[0].nota)

    def test_4_excluye_estrictamente_secciones_no_narrables(self):
        mapa = {
            "capitulo": "Saladin_tema_06",
            "libro": "Saladin",
            "titulo_capitulo": "El sistema tegumentario",
            "palabras_texto": 5000,
            "titulos": [
                {"nivel": 1, "numero": "6.1", "titulo": "Piel", "palabra": 50, "narrable": True},
                {"nivel": 1, "numero": "6.2", "titulo": "Pelo y uñas", "palabra": 1800, "narrable": True},
                {"nivel": 1, "numero": "", "titulo": "Temas de conexión", "palabra": 3600, "narrable": False},
                {"nivel": 1, "numero": "", "titulo": "Guía de estudio", "palabra": 4100, "narrable": False},
                {"nivel": 1, "numero": "", "titulo": "Bibliografía", "palabra": None, "narrable": False},
            ],
        }
        prop = pc.proponer_cortes_capitulo(mapa)
        self.assertEqual(prop.palabras_narrables, 3600)
        self.assertEqual(sum(p.palabras for p in prop.partes), 3600)
        todos_tits = " ".join(t for p in prop.partes for t in p.titulos).lower()
        self.assertNotIn("guía de estudio", todos_tits)
        self.assertNotIn("temas de conexión", todos_tits)
        self.assertNotIn("bibliografía", todos_tits)

    def test_5_capitulo_corto_menor_o_igual_15_min_queda_en_una_sola_parte(self):
        mapa = {
            "capitulo": "EdS_Parte3_3",
            "libro": "EdS",
            "titulo_capitulo": "Asimetría y curtosis",
            "palabras_texto": 1200,
            "titulos": [
                {"nivel": 3, "numero": "10.1.3", "titulo": "Coeficiente de Fisher", "palabra": 0, "narrable": True},
                {"nivel": 2, "numero": "10.2", "titulo": "Curtosis", "palabra": 600, "narrable": True},
            ],
        }
        prop = pc.proponer_cortes_capitulo(mapa)
        self.assertEqual(len(prop.partes), 1)
        self.assertEqual(prop.partes[0].titulos, ["Completo"])
        self.assertEqual(prop.partes[0].palabras, 1200)
        self.assertEqual(prop.partes[0].minutos, 8.0)

    def test_6_tramo_huerfano_al_final_se_absorbe_hasta_20_min(self):
        # 2000 + 300 = 2300 palabras (15.3 min <= 20 min): el cierre de 300 pal (< 3 min) no queda huérfano
        mapa = {
            "capitulo": "EdS_Huerfano",
            "libro": "EdS",
            "titulo_capitulo": "Prueba de absorción",
            "palabras_texto": 4300,
            "titulos": [
                {"nivel": 1, "numero": "1", "titulo": "Bloque 1", "palabra": 0, "narrable": True},
                {"nivel": 1, "numero": "2", "titulo": "Bloque 2", "palabra": 2000, "narrable": True},
                {"nivel": 1, "numero": "3", "titulo": "Cierre breve", "palabra": 4000, "narrable": True},
            ],
        }
        prop = pc.proponer_cortes_capitulo(mapa)
        self.assertEqual(len(prop.partes), 2)
        self.assertEqual(prop.partes[0].palabras, 2000)
        self.assertEqual(prop.partes[1].palabras, 2300)
        self.assertEqual(sum(p.palabras for p in prop.partes), 4300)

    def test_11_absorcion_tramo_corto_inicial_con_bloque_con_hijos(self):
        # Caso real EdS_Parte3_1: Introducción (220 pal) + bloque nivel 1 (2786 pal) con hijos nivel 2
        # 220 + 2786 = 3006 > 3000 -> debe expandir bloque 1 a sus hijos y absorber Introducción sin <3 min
        mapa = {
            "capitulo": "EdS_Parte3_1",
            "libro": "EdS",
            "titulo_capitulo": "CONCEPTOS GENERALES SOBRE ESTADÍSTICA",
            "palabras_texto": 5017,
            "titulos": [
                {"nivel": 1, "numero": "", "titulo": "Introducción", "palabra": 0, "narrable": True},
                {"nivel": 1, "numero": "1", "titulo": "CONCEPTOS GENERALES SOBRE ESTADÍSTICA", "palabra": 220, "narrable": True},
                {"nivel": 2, "numero": "1.1", "titulo": "Historia", "palabra": 291, "narrable": True},
                {"nivel": 2, "numero": "1.2", "titulo": "Definición", "palabra": 976, "narrable": True},
                {"nivel": 2, "numero": "1.3", "titulo": "Categorías", "palabra": 1136, "narrable": True},
                {"nivel": 2, "numero": "1.4", "titulo": "Unidad de análisis", "palabra": 1277, "narrable": True},
                {"nivel": 2, "numero": "1.5", "titulo": "Población", "palabra": 1357, "narrable": True},
                {"nivel": 2, "numero": "1.6", "titulo": "Muestra", "palabra": 1514, "narrable": True},
                {"nivel": 2, "numero": "1.7", "titulo": "Parámetros", "palabra": 1676, "narrable": True},
                {"nivel": 2, "numero": "1.8", "titulo": "Variables", "palabra": 1738, "narrable": True},
                {"nivel": 2, "numero": "1.9", "titulo": "Escalas de medición", "palabra": 2335, "narrable": True},
                {"nivel": 1, "numero": "2", "titulo": "INTRODUCCIÓN A LOS TIPOS DE MUESTREO", "palabra": 3006, "narrable": True},
            ],
        }
        prop = pc.proponer_cortes_capitulo(mapa)
        self.assertEqual(sum(p.palabras for p in prop.partes), 5017)
        cortas = [p for p in prop.partes if p.palabras < pc.ACEPTABLE_MIN_PALABRAS]
        self.assertEqual(cortas, [], f"No debía quedar ninguna parte < 3 min: {cortas}")
        for p in prop.partes:
            self.assertGreaterEqual(p.palabras, pc.ACEPTABLE_MIN_PALABRAS)
            self.assertLessEqual(p.palabras, pc.ACEPTABLE_MAX_PALABRAS)
        self.assertIn("Introducción", prop.partes[0].titulos[0])
        self.assertGreaterEqual(len(prop.partes[0].titulos), 2)

    def test_12_absorcion_simetrica_tramo_corto_final_con_bloque_con_hijos(self):
        # Bloque nivel 1 (2800 pal) con hijos nivel 2 + cierre corto (300 pal < 450); 2800 + 300 = 3100 > 3000
        mapa = {
            "capitulo": "EdS_Cierre_Corto",
            "libro": "EdS",
            "titulo_capitulo": "Prueba de absorción simétrica final",
            "palabras_texto": 3100,
            "titulos": [
                {"nivel": 1, "numero": "1", "titulo": "BLOQUE EXTENSO CON HIJOS", "palabra": 0, "narrable": True},
                {"nivel": 2, "numero": "1.1", "titulo": "Primera mitad", "palabra": 0, "narrable": True},
                {"nivel": 2, "numero": "1.2", "titulo": "Segunda mitad", "palabra": 1400, "narrable": True},
                {"nivel": 1, "numero": "", "titulo": "Conclusiones", "palabra": 2800, "narrable": True},
            ],
        }
        prop = pc.proponer_cortes_capitulo(mapa)
        self.assertEqual(sum(p.palabras for p in prop.partes), 3100)
        cortas = [p for p in prop.partes if p.palabras < pc.ACEPTABLE_MIN_PALABRAS]
        self.assertEqual(cortas, [], f"No debía quedar cierre huérfano < 3 min: {cortas}")
        self.assertEqual(len(prop.partes), 2)
        self.assertEqual(prop.partes[0].palabras, 1400)
        self.assertEqual(prop.partes[1].palabras, 1700)
        self.assertIn("Conclusiones", prop.partes[-1].titulos)


class TestParsersTitulosPSA(unittest.TestCase):
    """Pruebas de extracción de títulos para EdS y Saladin (fixtures en memoria)."""

    def test_7_parser_eds_parte3_ignora_contenido_y_detecta_niveles_1_2_3(self):
        texto_eds_p3 = (
            "Introducción\n\n"
            "La estadística descriptiva organiza y resume datos clínicos de una población.\n\n"
            "uno CONCEPTOS GENERALES SOBRE ESTADÍSTICA\n\n"
            "Objetivos:\n"
            "- Conocer los conceptos fundamentales.\n\n"
            "Contenido:\n"
            "uno punto uno Historia\n"
            "uno punto dos Variables\n\n"
            "uno punto uno Historia\n\n"
            "La estadística tiene antecedentes en los censos del antiguo Egipto y Roma.\n\n"
            "uno punto dos Variables\n\n"
            "Las variables representan características medibles o descriptibles.\n\n"
            "uno punto dos punto uno Variables cualitativas\n\n"
            "Describen atributos o categorías sin escala numérica.\n\n"
            "dos INTRODUCCIÓN A LOS TIPOS DE MUESTREO\n\n"
            "Contenido:\n"
            "dos punto uno Muestreo probabilístico\n\n"
            "dos. INTRODUCCIÓN A LOS TIPOS DE MUESTREO\n\n"
            "El muestreo permite estimar parámetros poblacionales con menor costo.\n\n"
            "dos punto uno. Muestreo probabilístico\n\n"
            "Todos los elementos tienen igual probabilidad de ser elegidos.\n"
        )
        mapa = mt.extraer_titulos_eds("EdS_Parte3_1", texto_eds_p3)
        self.assertEqual(mapa["capitulo"], "EdS_Parte3_1")
        self.assertEqual(mapa["libro"], "EdS")

        tits = mapa["titulos"]
        resumen = [(t["nivel"], t["numero"], t["titulo"]) for t in tits]
        self.assertEqual(
            resumen,
            [
                (1, "", "Introducción"),
                (1, "1", "CONCEPTOS GENERALES SOBRE ESTADÍSTICA"),
                (2, "1.1", "Historia"),
                (2, "1.2", "Variables"),
                (3, "1.2.1", "Variables cualitativas"),
                (1, "2", "INTRODUCCIÓN A LOS TIPOS DE MUESTREO"),
                (2, "2.1", "Muestreo probabilístico"),
            ],
        )
        # Posiciones estrictamente crecientes y el bloque Contenido: no fue marcado
        posiciones = [t["palabra"] for t in tits]
        self.assertEqual(posiciones, sorted(posiciones))
        self.assertEqual(len(set(posiciones)), len(posiciones))
        # «uno punto uno Historia» debe ubicarse DESPUÉS de las palabras del bloque Contenido
        idx_contenido = mt.norm(texto_eds_p3).index("contenido")
        hist = next(t for t in tits if t["numero"] == "1.1")
        self.assertGreater(hist["palabra"], idx_contenido + 5)

    def test_8_parser_eds_parte1_detecta_mayusculas_y_excluye_ruido(self):
        texto_p1 = (
            "Parte uno\n"
            "EDUCACIÓN EN SALUD\n\n"
            "La educación en salud fortalece la participación comunitaria y la prevención.\n"
            "EVOLUCIÓN DEL CONCEPTO DE SALUD\n"
            "La comprensión de la salud pasó por etapas históricas relevantes:\n"
            "uno. Visión biomédica\n"
            "La salud se entendía únicamente como ausencia de enfermedad en el organismo.\n"
            "Transición epidemiológica\n"
            "Describe cómo cambian las causas principales de morbilidad y mortalidad.\n"
            "Gráfica uno. Evolución temporal de la mortalidad.\n"
            "Tabla uno. Indicadores sanitarios básicos.\n"
            "Fuente: Ministerio de Salud.\n"
        )
        mapa = mt.extraer_titulos_eds("EdS_Parte1", texto_p1)
        tits = [(t["nivel"], t["titulo"]) for t in mapa["titulos"]]
        self.assertIn((1, "EDUCACIÓN EN SALUD"), tits)
        self.assertIn((1, "EVOLUCIÓN DEL CONCEPTO DE SALUD"), tits)
        self.assertIn((2, "Visión biomédica"), tits)
        self.assertIn((2, "Transición epidemiológica"), tits)
        nombres = " ".join(t["titulo"] for t in mapa["titulos"])
        self.assertNotIn("Gráfica", nombres)
        self.assertNotIn("Tabla", nombres)
        self.assertNotIn("Fuente", nombres)

    def test_9_parser_saladin_extrae_secciones_subsecciones_y_no_narrables(self):
        pdf_fixture = (
            "===== PAGINA 17 =====\n"
            "ESQUEMA\nDEL CAPÍTULO\n"
            " 12.1 Muestra preliminar 440\n"
            "• Subtema preliminar 441\n"
            "CONOCIMIENTO\nMÁS A FONDO\n"
            "===== PAGINA 23 =====\n"
            "Contenido\n"
            "Capítulo 6\n"
            "El sistema tegumentario 180\n"
            "6.1\n"
            "Piel y tejido\n"
            "subcutáneo 181\n"
            "6.2\n"
            "Pelo y uñas 190\n"
            "Temas de conexión 202\n"
            "Guía de estudio 203\n"
            "Apéndice A: Tabla periódica A-1\n"
            "===== PAGINA 27 =====\n"
            "Carta a los estudiantes\n"
            "===== PAGINA 208 =====\n"
            "ESQUEMA\n"
            "DEL CAPÍTULO\n"
            " 6.1 Piel y tejido subcutáneo 181\n"
            "• Epidermis 182\n"
            "• Dermis 185\n"
            " 6.2 Pelo y uñas 190\n"
            "• Pelo 190\n"
            "• Uñas 194\n"
            "Temas de conexión 202\n"
            "Guía de estudio 203\n"
            "CONOCIMIENTO\n"
            "MÁS A FONDO\n"
        )
        tts_fixture = (
            "EL SISTEMA TEGUMENTARIO\n\n"
            "La piel es el órgano más grande y protege contra la deshidratación.\n\n"
            "seis punto uno Piel y tejido subcutáneo\n\n"
            "Resultados esperados del aprendizaje. Describir la epidermis y la dermis con detalle.\n"
            "Epidermis La epidermis es un epitelio escamoso estratificado queratinizado.\n"
            "Dermis Es una capa de tejido conjuntivo situada debajo de la epidermis.\n\n"
            "seis punto dos Pelo y uñas\n\n"
            "El pelo y las uñas son anexos cutáneos queratinizados. Pelo El pelo crece en folículos.\n"
            "Uñas Las uñas protegen los extremos distales de los dedos.\n"
        )
        indice = mt.extraer_indice_saladin(pdf_fixture)
        esquemas = mt.extraer_esquemas_saladin(pdf_fixture)

        self.assertIn(6, indice)
        self.assertEqual(indice[6]["titulo_capitulo"], "El sistema tegumentario")
        self.assertNotIn(12, esquemas)  # El esquema de muestra en pág. 17 se ignora
        self.assertIn(6, esquemas)

        mapa = mt.construir_mapa_saladin(6, indice, esquemas, tts_fixture)
        self.assertEqual(mapa["capitulo"], "Saladin_tema_06")
        self.assertEqual(mapa["libro"], "Saladin")
        self.assertEqual(mapa["titulo_capitulo"], "El sistema tegumentario")

        por_titulo = {t["titulo"]: t for t in mapa["titulos"]}
        self.assertEqual(por_titulo["Piel y tejido subcutáneo"]["nivel"], 1)
        self.assertEqual(por_titulo["Piel y tejido subcutáneo"]["numero"], "6.1")
        self.assertIsNotNone(por_titulo["Piel y tejido subcutáneo"]["palabra"])
        self.assertEqual(por_titulo["Epidermis"]["nivel"], 2)
        self.assertIsNotNone(por_titulo["Epidermis"]["palabra"])
        self.assertIsNotNone(por_titulo["Dermis"]["palabra"])
        self.assertGreater(por_titulo["Dermis"]["palabra"], por_titulo["Epidermis"]["palabra"])
        self.assertGreater(por_titulo["Pelo y uñas"]["palabra"], por_titulo["Dermis"]["palabra"])
        self.assertGreater(por_titulo["Uñas"]["palabra"], por_titulo["Pelo"]["palabra"])

        # Secciones no narrables marcadas estrictamente narrable=False
        self.assertFalse(por_titulo["Temas de conexión"]["narrable"])
        self.assertFalse(por_titulo["Guía de estudio"]["narrable"])
        for no_narr in (
            "Guía de estudio",
            "Prueba tus conocimientos",
            "Autoevaluación",
            "Preguntas de repaso",
            "Glosario",
            "Bibliografía",
            "Lecturas recomendadas",
            "Respuestas",
        ):
            self.assertFalse(mt._es_narrable(no_narr), f"Debió marcar no narrable: {no_narr}")

    def test_10_renderizado_markdown_incluye_muestra_ronald_y_resumen(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            dir_mapas = Path(tmpdir) / "mapas"
            dir_mapas.mkdir()
            (dir_mapas / "Calvo_tema_03.json").write_text(
                json.dumps(
                    {
                        "capitulo": 3,
                        "titulo_capitulo": "Estructura de la membrana plasmática",
                        "palabras_texto": 3000,
                        "titulos": [
                            {"nivel": 1, "titulo": "Introducción", "palabra": 50, "narrable": True},
                            {"nivel": 1, "titulo": "Lípidos de membrana", "palabra": 1400, "narrable": True},
                        ],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            (dir_mapas / "EdS_Parte3_1.json").write_text(
                json.dumps(
                    {
                        "capitulo": "EdS_Parte3_1",
                        "libro": "EdS",
                        "titulo_capitulo": "CONCEPTOS GENERALES SOBRE ESTADÍSTICA",
                        "palabras_texto": 3200,
                        "titulos": [
                            {"nivel": 1, "numero": "1", "titulo": "CONCEPTOS GENERALES", "palabra": 0, "narrable": True},
                            {"nivel": 2, "numero": "1.1", "titulo": "Historia", "palabra": 100, "narrable": True},
                            {"nivel": 2, "numero": "1.2", "titulo": "Variables", "palabra": 1600, "narrable": True},
                        ],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )
            propuestas = pc.evaluar_catalogo_psa(dir_mapas)
            self.assertEqual(len(propuestas), 39)
            md = pc.renderizar_propuesta_markdown(propuestas)
            self.assertIn("## Resumen ejecutivo", md)
            self.assertIn("## Muestra para OK de Ronald (2 capítulos)", md)
            self.assertIn("### Tema_03_Biologia_Celular (Calvo)", md)
            self.assertIn("### EdS_Parte3_1 (Educación en Salud)", md)

    def test_13_parser_calvo_subtitulos_nivel2_y_exclusiones(self):
        pdf_calvo_fixture = (
            "=== PÁGINA 2 ===\n"
            "2\n"
            "Table of Contents\n"
            "Capítulo 3: Estructura de la membrana plasmática\n"
            "Introducción\n"
            "Lípidos de membrana\n"
            "El mosaico proteico\n"
            "Cuestiones\n"
            "Respuestas\n"
            "Índice alfabético\n"
            "=== PÁGINA 12 ===\n"
            "12\n"
            "Índice de capítulos\n"
            "Capítulo 3: Estructura de la membrana plasmática\n"
            "Introducción\n"
            "=== PÁGINA 120 ===\n"
            "120\n"
            "CAPÍTULO 3\n"
            "=== PÁGINA 121 ===\n"
            "121\n"
            "Estructura de la membrana plasmática\n"
            "Carlos Bravo\n"
            "Alfonso Calvo\n"
            "Objetivos de aprendizaje\n"
            "• Comprender los lípidos de membrana y el mosaico proteico.\n"
            "• Analizar la bicapa lipídica en detalle.\n"
            "=== PÁGINA 122 ===\n"
            "122\n"
            "Introducción\n"
            "En todas las células existe una fina envoltura laminar que recubre su contenido y define sus límites externos.\n"
            "=== PÁGINA 129 ===\n"
            "129\n"
            "Lípidos de membrana\n"
            "Bicapa lipídica\n"
            "Los lípidos de membrana comprenden un grupo heterogéneo de biomoléculas orgánicas anfipáticas formadas por carbono.\n"
            "Tabla 3-1\n"
            "Contenido en lípidos y proteínas\n"
            "de las membranas biológicas\n"
            "\n"
            "FIGURA 3-1 Esquema general de la bicapa lipídica y las moléculas anfipáticas. (Ilustración de: E. Maldonado.)\n"
            "Ácidos grasos\n"
            "Los ácidos grasos son ácidos orgánicos con largas cadenas hidrocarbonadas de entre doce y veinte átomos de carbono.\n"
            "\n"
            "Fluidez de la bicapa lipídica\n"
            "La bicapa lipídica es un fluido bidimensional encerrado en la interfaz de dos medios acuosos donde sus lípidos difunden.\n"
            "=== PÁGINA 145 ===\n"
            "145\n"
            "El mosaico proteico\n"
            "Las proteínas normalmente suponen la mitad de la masa de la membrana y le confieren su funcionalidad específica.\n"
            "\n"
            "Proteínas integrales o intrínsecas de membrana\n"
            "Las proteínas integrales se encuentran íntimamente unidas a la bicapa lipídica y poseen dominios hidrófobos transmembrana.\n"
            "\n"
            "Lecturas recomendadas\n"
            "Singer SJ, Nicolson GL. The fluid mosaic model. Science. 1972.\n"
            "\n"
            "Preguntas de autoevaluación\n"
            "1. Señale la afirmación correcta sobre los lípidos:\n"
            "a. Son completamente polares.\n"
            "Respuesta correcta: a.\n"
        )
        tts_calvo_fixture = (
            "CAPÍTULO tres\n\n"
            "Estructura de la membrana plasmática Objetivos de aprendizaje "
            "• Comprender los lípidos de membrana y el mosaico proteico. "
            "• Analizar la bicapa lipídica en detalle.\n\n"
            "Introducción\n\n"
            "En todas las células existe una fina envoltura laminar que recubre su contenido y define sus límites externos.\n\n"
            "Lípidos de membrana Bicapa lipídica Los lípidos de membrana comprenden un grupo heterogéneo de biomoléculas orgánicas.\n"
            "FIGURA tres a uno Esquema general de la bicapa lipídica. "
            "Ácidos grasos Los ácidos grasos son ácidos orgánicos con largas cadenas hidrocarbonadas.\n"
            "Fluidez de la bicapa lipídica La bicapa lipídica es un fluido bidimensional en la interfaz de dos medios acuosos.\n\n"
            "El mosaico proteico Las proteínas normalmente suponen la mitad de la masa de la membrana.\n"
            "Proteínas integrales o intrínsecas de membrana Las proteínas integrales se encuentran íntimamente unidas a la bicapa.\n"
        )

        indice = mt.extraer_indice_calvo(pdf_calvo_fixture)
        cuerpos = mt.extraer_cuerpos_calvo(pdf_calvo_fixture)
        self.assertIn(3, indice)
        self.assertIn(3, cuerpos)

        mapa = mt.construir_mapa_calvo(3, indice, cuerpos, tts_calvo_fixture)
        self.assertEqual(mapa["capitulo"], "Calvo_tema_03")
        self.assertEqual(mapa["libro"], "Calvo")
        self.assertEqual(mapa["titulo_capitulo"], "Estructura de la membrana plasmática")

        por_titulo = {t["titulo"]: t for t in mapa["titulos"]}
        # Nivel 1 conservados y no narrables marcados correctamente
        self.assertEqual(por_titulo["Introducción"]["nivel"], 1)
        self.assertEqual(por_titulo["Lípidos de membrana"]["nivel"], 1)
        self.assertEqual(por_titulo["El mosaico proteico"]["nivel"], 1)
        self.assertFalse(por_titulo["Cuestiones"]["narrable"])
        self.assertFalse(por_titulo["Respuestas"]["narrable"])

        # Nivel 2 detectados y ubicados monotónicamente dentro de su sección padre
        for sub in (
            "Bicapa lipídica",
            "Ácidos grasos",
            "Fluidez de la bicapa lipídica",
            "Proteínas integrales o intrínsecas de membrana",
        ):
            self.assertIn(sub, por_titulo, f"Faltó detectar subtítulo nivel 2: {sub}")
            self.assertEqual(por_titulo[sub]["nivel"], 2)
            self.assertIsNotNone(por_titulo[sub]["palabra"])

        self.assertGreater(por_titulo["Bicapa lipídica"]["palabra"], por_titulo["Lípidos de membrana"]["palabra"])
        self.assertGreater(por_titulo["Ácidos grasos"]["palabra"], por_titulo["Bicapa lipídica"]["palabra"])
        self.assertGreater(por_titulo["Fluidez de la bicapa lipídica"]["palabra"], por_titulo["Ácidos grasos"]["palabra"])
        self.assertGreater(por_titulo["El mosaico proteico"]["palabra"], por_titulo["Fluidez de la bicapa lipídica"]["palabra"])
        self.assertGreater(
            por_titulo["Proteínas integrales o intrínsecas de membrana"]["palabra"],
            por_titulo["El mosaico proteico"]["palabra"],
        )

        # Exclusiones: ni figuras, ni tablas, ni lecturas recomendadas ni autoevaluación
        todos_nombres = " ".join(t["titulo"] for t in mapa["titulos"])
        self.assertNotIn("FIGURA", todos_nombres)
        self.assertNotIn("Tabla 3-1", todos_nombres)
        self.assertNotIn("Contenido en lípidos", todos_nombres)
        self.assertNotIn("Lecturas recomendadas", todos_nombres)
        self.assertNotIn("Preguntas de autoevaluación", todos_nombres)


class TestCortadorAudiolibro(unittest.TestCase):
    """Pruebas del alineador Whisper, control de calidad 16-11 y corte real con ffmpeg."""

    def test_14_alineacion_fronteras_whisper_orden_creciente_y_punto_medio_pausa(self):
        # Construir texto .md sintético de 3 secciones y timestamps Whisper con pausas exactas
        sec1 = "Introducción La estadística descriptiva resume los datos obtenidos en un estudio clínico."
        sec2 = "Lípidos de membrana Los lípidos de membrana forman una bicapa anfipática estable."
        sec3 = "El mosaico proteico Las proteínas embebidas en la bicapa confieren su funcionalidad."

        pal_md = ca.norm_palabras(f"{sec1} {sec2} {sec3}")
        p1_len = len(ca.norm_palabras(sec1))
        p2_len = len(ca.norm_palabras(sec2))
        p3_len = len(ca.norm_palabras(sec3))
        total_pal = p1_len + p2_len + p3_len

        partes = [
            pc.PartePropuesta(indice=1, titulos=["Introducción"], inicio=0, fin=p1_len, palabras=p1_len, minutos=5.0),
            pc.PartePropuesta(indice=2, titulos=["Lípidos de membrana"], inicio=p1_len, fin=p1_len + p2_len, palabras=p2_len, minutos=6.0),
            pc.PartePropuesta(indice=3, titulos=["El mosaico proteico"], inicio=p1_len + p2_len, fin=total_pal, palabras=p3_len, minutos=5.5),
        ]

        # Timestamps Whisper:
        # Sec 1 termina en t=100.0; pausa [100.0, 101.2] -> punto medio = 100.6
        # Sec 2 termina en t=210.0; pausa [210.0, 211.0] -> punto medio = 210.5
        palabras_w: list[dict[str, object]] = []
        w1 = sec1.split()
        for idx, w in enumerate(w1):
            t0 = 0.5 + idx * (99.0 / len(w1))
            t1 = 100.0 if idx == len(w1) - 1 else t0 + 0.4
            palabras_w.append({"word": w, "start": round(t0, 3), "end": round(t1, 3)})

        w2 = sec2.split()
        for idx, w in enumerate(w2):
            t0 = 101.2 + idx * (108.0 / len(w2))
            t1 = 210.0 if idx == len(w2) - 1 else t0 + 0.4
            palabras_w.append({"word": w, "start": round(t0, 3), "end": round(t1, 3)})

        w3 = sec3.split()
        for idx, w in enumerate(w3):
            t0 = 211.0 + idx * (100.0 / len(w3))
            t1 = 315.0 if idx == len(w3) - 1 else t0 + 0.4
            palabras_w.append({"word": w, "start": round(t0, 3), "end": round(t1, 3)})

        tramos = ca.alinear_fronteras_whisper(
            partes,
            pal_md,
            palabras_w,
            duracion_total_s=316.0,
            palabras_totales_mapa=total_pal,
            capitulo="Tema_03_Biologia_Celular",
        )
        self.assertEqual(len(tramos), 3)
        # Orden estrictamente creciente
        self.assertLess(tramos[0]["t_inicio"], tramos[1]["t_inicio"])
        self.assertLess(tramos[1]["t_inicio"], tramos[2]["t_inicio"])
        self.assertLess(tramos[2]["t_inicio"], tramos[2]["t_fin"])
        # Punto medio exacto de cada pausa
        self.assertAlmostEqual(tramos[1]["t_inicio"], 100.6, places=2)
        self.assertAlmostEqual(tramos[2]["t_inicio"], 210.5, places=2)
        self.assertGreater(tramos[1]["confianza"], 0.7)
        self.assertGreater(tramos[2]["confianza"], 0.7)

    def test_15_control_cortes_falla_si_una_sola_parte_falla_y_aprueba_si_todas_pasan(self):
        def _parte_ok(idx: int, titulo: str) -> dict[str, object]:
            return {
                "archivo": f"Cap_P0{idx}_parte.mp3",
                "etiqueta": f"P0{idx}",
                "titulos": [titulo],
                "t_inicio": (idx - 1) * 600.0,
                "t_fin": idx * 600.0,
                "duracion_s": 600.0,
                "max_volume_db": -1.6,
                "mean_volume_db": -16.2,
                "silencio_inicio_s": 0.25,
                "silencio_fin_s": 1.0,
                "caida_final_db": 1.2,
                "titulo_inicio_esperado": titulo,
                "texto_oido_inicio": f"{titulo}. Explicación clara del tema correspondiente.",
                "texto_oido_fin": "De esta manera concluye la explicación completa de este apartado.",
                "nota_propuesta": "",
            }

        todas_ok = [
            _parte_ok(1, "Introducción"),
            _parte_ok(2, "Lípidos de membrana"),
            _parte_ok(3, "El mosaico proteico"),
        ]
        res_ok = ca.evaluar_veredicto_cortes(todas_ok)
        self.assertEqual(res_ok["veredicto"], "APRUEBA")
        self.assertEqual(res_ok["aprobadas"], 3)
        self.assertEqual(res_ok["fallidas"], 0)

        # 1 sola parte < 3 min -> FALLA global
        caso_corta = [dict(x) for x in todas_ok]
        caso_corta[1]["duracion_s"] = 120.0
        res_corta = ca.evaluar_veredicto_cortes(caso_corta)
        self.assertEqual(res_corta["veredicto"], "FALLA")
        self.assertEqual(res_corta["fallidas"], 1)

        # 1 sola parte con clipping 0.0 dB -> FALLA global
        caso_clip = [dict(x) for x in todas_ok]
        caso_clip[2]["max_volume_db"] = 0.0
        res_clip = ca.evaluar_veredicto_cortes(caso_clip)
        self.assertEqual(res_clip["veredicto"], "FALLA")
        self.assertEqual(res_clip["fallidas"], 1)

        # 1 sola parte cuyo inicio no coincide con su título -> FALLA global
        caso_titulo = [dict(x) for x in todas_ok]
        caso_titulo[0]["texto_oido_inicio"] = "Texto completamente distinto sin el encabezado esperado."
        res_titulo = ca.evaluar_veredicto_cortes(caso_titulo)
        self.assertEqual(res_titulo["veredicto"], "FALLA")
        self.assertEqual(res_titulo["fallidas"], 1)

    def test_16_corte_real_ffmpeg_wav_sintetico_4s(self):
        if shutil.which("ffmpeg") is None or shutil.which("ffprobe") is None:
            self.skipTest("ffmpeg o ffprobe no disponible en PATH")

        with tempfile.TemporaryDirectory(prefix="axiom_test_ffmpeg_") as tmpdir:
            base = Path(tmpdir)
            ruta_wav = base / "sintetico.wav"

            # Generar WAV mono 44100 Hz de 4.0 s: [0.0..1.75] tono 440 Hz, [1.75..2.25] silencio, [2.25..4.0] tono 520 Hz
            sr = 44100
            n_frames = sr * 4
            with wave.open(str(ruta_wav), "wb") as wf:
                wf.setnchannels(1)
                wf.setsampwidth(2)
                wf.setframerate(sr)
                frames = bytearray()
                for n in range(n_frames):
                    t = n / sr
                    if t < 1.75:
                        val = 0.25 * math.sin(2.0 * math.pi * 440.0 * t)
                    elif t < 2.25:
                        val = 0.0
                    else:
                        val = 0.25 * math.sin(2.0 * math.pi * 520.0 * t)
                    frames.extend(struct.pack("<h", int(max(-1.0, min(1.0, val)) * 32767)))
                wf.writeframes(bytes(frames))

            ruta_mapa = base / "Demo_Cap.json"
            ruta_mapa.write_text(
                json.dumps(
                    {
                        "capitulo": "Demo_Cap",
                        "libro": "Demo",
                        "titulo_capitulo": "Capítulo sintético de prueba",
                        "palabras_texto": 3600,
                        "titulos": [
                            {"nivel": 1, "numero": "1", "titulo": "Primera parte", "palabra": 0, "narrable": True},
                            {"nivel": 1, "numero": "2", "titulo": "Segunda parte", "palabra": 1800, "narrable": True},
                        ],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )

            ruta_md = base / "Demo_Cap_LITERAL_TTS.md"
            ruta_md.write_text(
                "Primera parte Explicación inicial completa. Segunda parte Explicación final completa.\n",
                encoding="utf-8",
            )

            ruta_whisper = base / "whisper_sim.json"
            ruta_whisper.write_text(
                json.dumps(
                    {
                        "duracion_s": 4.0,
                        "palabras": [
                            {"word": "Primera", "start": 0.10, "end": 0.45},
                            {"word": "parte", "start": 0.50, "end": 0.85},
                            {"word": "Explicación", "start": 0.90, "end": 1.30},
                            {"word": "inicial.", "start": 1.35, "end": 1.70},
                            {"word": "Segunda", "start": 2.30, "end": 2.65},
                            {"word": "parte", "start": 2.70, "end": 3.05},
                            {"word": "Explicación", "start": 3.10, "end": 3.50},
                            {"word": "final.", "start": 3.55, "end": 3.90},
                        ],
                    },
                    ensure_ascii=False,
                ),
                encoding="utf-8",
            )

            dir_salida = base / "salida_cortes"
            res = ca.ejecutar_corte_capitulo(
                capitulo="Demo_Cap",
                raiz=base,
                ruta_mapa=ruta_mapa,
                ruta_texto=ruta_md,
                ruta_audio=ruta_wav,
                ruta_transcripcion=ruta_whisper,
                dir_salida=dir_salida,
                sin_rewhisper_bordes=True,
                usar_loudness_skill=False,
            )

            self.assertEqual(len(res["tramos"]), 2)
            # El corte debe caer en el silencio central [1.70..2.30]
            self.assertGreaterEqual(res["tramos"][1]["t_inicio"], 1.70)
            self.assertLessEqual(res["tramos"][1]["t_inicio"], 2.30)

            self.assertTrue((dir_salida / "Demo_Cap_Completo.mp3").is_file())
            self.assertTrue((dir_salida / "plan_cortes_aplicado.json").is_file())
            self.assertTrue((dir_salida / "REPORTE_CORTES.md").is_file())

            for tramo in res["tramos"]:
                mp3_path = dir_salida / tramo["archivo"]
                self.assertTrue(mp3_path.is_file(), f"No se generó {mp3_path}")
                self.assertGreater(mp3_path.stat().st_size, 1000)

                vol = ca.medir_volumedetect(mp3_path)
                self.assertLess(vol["max_volume"], -0.1, f"Clipping detectado en {mp3_path.name}: {vol}")

                dur_real = ca.medir_duracion_ffprobe(mp3_path)
                sils = ca.medir_silencios(mp3_path, ruido_db=-40.0, min_dur=0.1)
                _, sil_fin, _ = ca.calcular_silencios_borde(sils, dur_real)
                self.assertGreaterEqual(sil_fin, 0.7, f"Silencio final muy corto en {mp3_path.name}: {sil_fin}s")
                self.assertLessEqual(sil_fin, 1.8, f"Silencio final inesperado en {mp3_path.name}: {sil_fin}s")


def main() -> int:
    mt._configurar_stdout_utf8()
    suite = unittest.defaultTestLoader.loadTestsFromModule(sys.modules[__name__])
    runner = unittest.TextTestRunner(verbosity=2)
    resultado = runner.run(suite)
    total = resultado.testsRun
    fallos = len(resultado.failures) + len(resultado.errors)
    if resultado.wasSuccessful():
        print(f"OK: {total}/{total} pruebas pasaron.")
        return 0
    print(f"FALLA: {total - fallos}/{total} pruebas pasaron ({fallos} con error).")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
