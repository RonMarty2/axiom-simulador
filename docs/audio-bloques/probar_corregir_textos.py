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

    def test_aplica_siglas_clasificadas_y_no_toca_titulo_recuadro_ni_resto_figura(self) -> None:
        entrada = "El DNA interactúa con SNARE y grupos COOH. Además HO y CONOCIMIENTO MÁS A FONDO siguen."
        esperado = "El D N A interactúa con snare y grupos ce o o hache. Además HO y CONOCIMIENTO MÁS A FONDO siguen."
        res = C.corregir_siglas(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 3)
        self.assertTrue(any("FONDO" in x for x in res.no_resueltos))
        self.assertTrue(any("HO" in x for x in res.no_resueltos))

    def test_deletrea_y_como_i_griega(self) -> None:
        entrada = "La hormona PYY aumenta en el íleon."
        esperado = "La hormona P i griega i griega aumenta en el íleon."
        res = C.corregir_siglas(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 1)
        self.assertEqual(res.no_resueltos, [])

    def test_siglas_sin_json_sigue_igual_que_hoy(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            res = C.corregir_siglas(
                "El DNA y AMPc",
                ruta_clasificadas=Path(tmp) / "no_existe.json",
            )
            self.assertEqual(res.texto, "El DNA y A M P c")
            self.assertEqual(res.cambios, 1)
            self.assertEqual(res.no_resueltos, ["Sigla fuera de lista: DNA"])


class TestUnidadesEnPalabras(unittest.TestCase):
    def test_convierte_unidades_con_concordancia_y_ph(self) -> None:
        entrada = "Mide un μm, diez µm, uno coma cinco μm, treinta y un μm, el pH y veinte°C o un °C y noventa°."
        esperado = (
            "Mide un micrómetro, diez micrómetros, uno coma cinco micrómetros, "
            "treinta y un micrómetros, el pe hache y veinte grados Celsius o un grado Celsius y noventa grados."
        )
        res = C.corregir_unidades_en_palabras(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 8)
        self.assertEqual(res.no_resueltos, [])

    def test_convierte_resto_unidades_y_corrige_concordancia_previa(self) -> None:
        entrada = (
            "Usa cinco nm, dos mm, tres cm, cuatro ml, dos mL, seis mg, siete kg, "
            "ocho kDa, ciento veinte mmHg, diez kPa, sesenta y ocho°F y un micrómetros."
        )
        esperado = (
            "Usa cinco nanómetros, dos milímetros, tres centímetros, cuatro mililitros, "
            "dos mililitros, seis miligramos, siete kilogramos, ocho kilodaltons, "
            "ciento veinte milímetros de mercurio, diez kilopascales, sesenta y ocho grados Fahrenheit y un micrómetro."
        )
        res = C.corregir_unidades_en_palabras(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 12)

    def test_no_cambia_palabras_con_subcadenas_de_unidades(self) -> None:
        entrada = "En el campo inmune del alma no hay kilogramos ni amígdala."
        res = C.corregir_unidades_en_palabras(entrada)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertEqual(res.no_resueltos, [])


class TestGriegas(unittest.TestCase):
    def test_convierte_griegas_y_separa_numeros(self) -> None:
        entrada = "Subunidades α1, βdos, γ, δ, ε, ζ, η, θ, κ, λ, μ, µ, π, σ, τ, φ, χ, ψ, ω y ΔG con TNF-α."
        esperado = (
            "Subunidades alfa uno, beta dos, gamma, delta, épsilon, zeta, eta, theta, "
            "kappa, lambda, mi, mi, pi, sigma, tau, fi, ji, psi, omega y delta G con TNF-alfa."
        )
        res = C.corregir_griegas(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 21)
        self.assertEqual(res.no_resueltos, [])

    def test_no_convierte_mu_como_prefijo_de_unidad(self) -> None:
        entrada = "Mide diez μm, cinco µm, tres μg y dos μl."
        res = C.corregir_griegas(entrada)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertEqual(res.no_resueltos, [])


class TestUnComa(unittest.TestCase):
    def test_convierte_un_coma_decimal_y_seccion_en_su_linea(self) -> None:
        entrada = "Mide un coma cinco y veintiún coma dos. un coma un Medicina evolutiva"
        esperado = "Mide uno coma cinco y veintiuno coma dos.\n\nuno punto uno Medicina evolutiva"
        res = C.corregir_un_coma(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 3)
        self.assertEqual(res.no_resueltos, [])

    def test_no_cambia_en_coma_profundo_ni_miles_como_decimal(self) -> None:
        entrada = "Paciente en coma profundo o un coma diabético con un coma cinco cero cero células."
        res = C.corregir_un_coma(entrada)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertTrue(any("un coma cinco cero cero" in x for x in res.no_resueltos))


class TestIonesResiduales(unittest.TestCase):
    def test_convierte_iones_pegados_a_sigla_y_respeta_guiones(self) -> None:
        entrada = "Se reducen NAD+, NADP+ y FAD+ en presencia de TNF-α y COX-un."
        esperado = "Se reducen N A D más, N A D P más y F A D más en presencia de TNF-α y COX-un."
        res = C.corregir_iones_residuales(entrada)
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 3)
        self.assertEqual(res.no_resueltos, [])


class TestNoTocarPdfCrudo(unittest.TestCase):
    def test_reporta_sin_modificar_miles_y_potencias_con_por(self) -> None:
        entrada = "Hay tres × ciento seis células y un coma cinco cero cero gramos."
        res = C.reportar_errores_pdf_crudo(entrada)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertTrue(any("×" in x for x in res.no_resueltos))
        self.assertTrue(any("un coma cinco cero cero" in x for x in res.no_resueltos))


class TestMoverRecuadrosFondo(unittest.TestCase):
    def test_mueve_recuadro_tema_01_despues_del_parrafo_con_titulo_aparte(self) -> None:
        pdf_minimo = (
            "=== PÁGINA 34 ===\n"
            "1.2 Exploración de la evolución humana\n"
            "Este hábitat arbóreo, o arborícola, tal vez les dio\n"
            "CONOCIMIENTO MÁS A FONDO 1.1\n"
            "Medicina evolutiva\n"
            "Vestigios de la evolución humana\n"
            "Una de las líneas clásicas de evidencia en favor de la evo-\n"
            "lución son las estructuras vestigiales.\n"
            "La selección natural redujo su tamaño con el tiempo.\n"
            "=== PÁGINA 35 ===\n"
            "CAPÍTULO 1 Temas principales de anatomía y fisiología 13\n"
            "la capacidad de agarrarse a las ramas y, quizá, una mayor\n"
            "comprensión de los objetos. Esta característica se conserva.\n"
        )
        entrada = (
            "Este hábitat arbóreo, o arborícola, tal vez les dio "
            "CONOCIMIENTO MÁS A FONDO un coma un Medicina evolutiva Vestigios de la evolución humana "
            "Una de las líneas clásicas de evidencia en favor de la evolución son las estructuras vestigiales. "
            "La selección natural redujo su tamaño con el tiempo.\n\n"
            "la capacidad de agarrarse a las ramas y, quizá, una mayor comprensión de los objetos. "
            "Esta característica se conserva.\n"
        )
        res = C.mover_recuadros_fondo(entrada, texto_pdf=pdf_minimo)
        esperado = (
            "Este hábitat arbóreo, o arborícola, tal vez les dio la capacidad de agarrarse a las ramas y, quizá, una mayor comprensión de los objetos.\n\n"
            "Conocimiento más a fondo uno punto uno. Medicina evolutiva: Vestigios de la evolución humana\n"
            "Una de las líneas clásicas de evidencia en favor de la evolución son las estructuras vestigiales. "
            "La selección natural redujo su tamaño con el tiempo.\n\n"
            "Esta característica se conserva.\n"
        )
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 1)
        self.assertEqual(res.no_resueltos, [])

        # Al pasar luego R6_un_coma, «uno punto uno» se conserva intacto.
        res_coma = C.corregir_un_coma(res.texto)
        self.assertIn("Conocimiento más a fondo uno punto uno. Medicina evolutiva: Vestigios de la evolución humana\n", res_coma.texto)

    def test_recuadro_sin_fin_identificable_no_se_mueve_y_se_reporta(self) -> None:
        pdf_incompleto = (
            "=== PÁGINA 60 ===\n"
            "CONOCIMIENTO MÁS A FONDO 2.3\n"
            "Historia médica\n"
            "El origen del microscopio\n"
            "Otro texto distinto que no coincide con el cierre real.\n"
        )
        entrada = (
            "Los primeros naturalistas observaron células CONOCIMIENTO MÁS A FONDO "
            "dos coma tres Historia médica El origen del microscopio "
            "Leeuwenhoek talló lentes simples de gran aumento para estudiar gotas de agua.\n"
        )
        res = C.mover_recuadros_fondo(entrada, texto_pdf=pdf_incompleto)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertEqual(len(res.no_resueltos), 1)
        self.assertIn("2.3", res.no_resueltos[0])

    def test_texto_sin_recuadros_no_cambia(self) -> None:
        entrada = (
            "La membrana plasmática separa el medio intracelular del líquido extracelular.\n\n"
            "Su bicapa lipídica regula el transporte selectivo de sustancias.\n"
        )
        res = C.mover_recuadros_fondo(entrada)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertEqual(res.no_resueltos, [])

    def test_cuerpo_inicia_con_monosilabo_presente_en_titulo_no_se_pierde(self) -> None:
        pdf_minimo = (
            "=== PÁGINA 40 ===\n"
            "La postura bípeda humana permitió liberar las manos para manipular\n"
            "CONOCIMIENTO MÁS A FONDO 1.2\n"
            "Medicina evolutiva\n"
            "La evolución del arco plantar\n"
            "La adaptación gradual modificó los huesos del pie humano.\n"
            "=== PÁGINA 41 ===\n"
            "CAPÍTULO 1 Temas principales de anatomía y fisiología 15\n"
            "herramientas complejas durante la evolución.\n"
        )
        entrada = (
            "La postura bípeda humana permitió liberar las manos para manipular "
            "CONOCIMIENTO MÁS A FONDO un coma dos Medicina evolutiva "
            "La evolución del arco plantar "
            "La adaptación gradual modificó los huesos del pie humano.\n\n"
            "herramientas complejas durante la evolución.\n"
        )
        res = C.mover_recuadros_fondo(entrada, texto_pdf=pdf_minimo)
        esperado = (
            "La postura bípeda humana permitió liberar las manos para manipular herramientas complejas durante la evolución.\n\n"
            "Conocimiento más a fondo uno punto dos. Medicina evolutiva: La evolución del arco plantar\n"
            "La adaptación gradual modificó los huesos del pie humano.\n"
        )
        self.assertEqual(res.texto, esperado)
        self.assertEqual(res.cambios, 1)
        self.assertEqual(res.no_resueltos, [])

    def test_titulo_pdf_no_coincide_palabra_por_palabra_no_se_mueve(self) -> None:
        pdf_distinto = (
            "=== PÁGINA 40 ===\n"
            "CONOCIMIENTO MÁS A FONDO 1.3\n"
            "Medicina evolutiva\n"
            "Vestigios anatómicos del apéndice\n"
            "El apéndice cumple funciones inmunitarias en la mucosa intestinal.\n"
        )
        entrada = (
            "Texto principal previo.\n\n"
            "CONOCIMIENTO MÁS A FONDO un coma tres Medicina evolutiva "
            "Vestigios del apéndice "
            "El apéndice cumple funciones inmunitarias en la mucosa intestinal.\n"
        )
        res = C.mover_recuadros_fondo(entrada, texto_pdf=pdf_distinto)
        self.assertEqual(res.texto, entrada)
        self.assertEqual(res.cambios, 0)
        self.assertEqual(len(res.no_resueltos), 1)
        self.assertIn("1.3", res.no_resueltos[0])


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
