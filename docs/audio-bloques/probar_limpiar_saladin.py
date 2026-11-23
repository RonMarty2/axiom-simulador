# -*- coding: utf-8 -*-
"""Pruebas unitarias del limpiador de ruido Saladin (limpiar_saladin_ruido.py)."""

from __future__ import annotations

import contextlib
import io
import sys
import tempfile
import unittest
from pathlib import Path

DIR_ACTUAL = Path(__file__).resolve().parent
if str(DIR_ACTUAL) not in sys.path:
    sys.path.insert(0, str(DIR_ACTUAL))

import limpiar_saladin_ruido as lsr  # noqa: E402


class TestLimpiarSaladinRuido(unittest.TestCase):
    """Casos positivos reales, negativos críticos, idempotencia y selección PSA 2027."""

    def test_encabezados_parte_incrustados_y_palabra_partida(self):
        # Muestra real 1: espacio doble antes de PARTE
        txt1 = "HISTOLOGÍA  PARTE UNO Organización corporal C on sus cincuenta mil millones de células."
        out1, c1 = lsr.limpiar_texto_saladin(txt1)
        self.assertEqual(out1, "HISTOLOGÍA C on sus cincuenta mil millones de células.")
        self.assertEqual(c1["parte"], 1)
        self.assertEqual(c1["palabras_unidas"], 0)
        self.assertNotIn("  ", out1)

        # Muestra real 2: tras punto
        txt2 = "recubre al útero.  PARTE UNO Organización corporal Después de la fijación el tejido se corta."
        out2, c2 = lsr.limpiar_texto_saladin(txt2)
        self.assertEqual(out2, "recubre al útero. Después de la fijación el tejido se corta.")
        self.assertEqual(c2["parte"], 1)

        # Muestra real 3: palabra partida en dos por PARTE CINCO
        txt3 = "en las glánduPARTE CINCO Reproducción y desarrollo las mamarias del adulto."
        out3, c3 = lsr.limpiar_texto_saladin(txt3)
        self.assertEqual(out3, "en las glándulas mamarias del adulto.")
        self.assertEqual(c3["parte"], 1)
        self.assertEqual(c3["palabras_unidas"], 1)

        # Las otras 3 partes de Saladin
        txt4 = (
            "Tejido óseo. PARTE DOS Soporte y movimiento Los huesos protegen. "
            "Impulsos. PARTE TRES Integración y control interno Las neuronas conducen. "
            "Sangre. PARTE CUATRO Regulación y mantenimiento El plasma transporta."
        )
        out4, c4 = lsr.limpiar_texto_saladin(txt4)
        self.assertEqual(c4["parte"], 3)
        self.assertNotIn("PARTE ", out4)
        self.assertNotIn("  ", out4)

    def test_encabezados_capitulo_respeta_titulo_inicial_y_quita_repetidos(self):
        titulo_inicial = "CAPÍTULO uno Temas principales de anatomía y fisiología\n\n"
        cuerpo = (
            "La anatomía es el estudio de la estructura del cuerpo humano y la fisiología "
            "estudia la función de los órganos y sistemas en condiciones normales de vida. "
            "¿Qué observa en esta ilustración?  CAPÍTULO uno Temas principales de anatomía y fisiología "
            "cadáveres, sobre todo para comprender la variación anatómica.\n\n"
            "También en las glánduCAPÍTULO uno Temas principales de anatomía y fisiología las "
            "exocrinas se estudian ideas con una cantidad enorme de detalle."
        )
        texto = titulo_inicial + cuerpo
        limpio, c = lsr.limpiar_texto_saladin(texto)

        # El título inicial dentro de los primeros 200 caracteres se conserva intacto.
        self.assertTrue(limpio.startswith(titulo_inicial))
        # Los dos CAPÍTULO repetidos después de los 200 caracteres se eliminan.
        self.assertEqual(c["capitulo"], 2)
        self.assertEqual(c["palabras_unidas"], 1)
        self.assertIn("¿Qué observa en esta ilustración? cadáveres, sobre todo", limpio)
        self.assertIn("También en las glándulas exocrinas se estudian ideas", limpio)
        self.assertNotIn("CAPÍTULO uno", limpio[200:])

    def test_encabezado_capitulo_variante_por_prefijo_comun(self):
        prefijo_largo = "Introducción detallada sobre neuroanatomía humana. " * 6
        texto = (
            prefijo_largo
            + "Las raíces dorsales. CAPÍTULO trece Título Variante Especial fibras sensitivas. "
            + "Los reflejos. CAPÍTULO trece Título Variante Especial arcos reflejos."
        )
        limpio, c = lsr.limpiar_texto_saladin(texto)
        self.assertEqual(c["capitulo"], 2)
        self.assertNotIn("CAPÍTULO trece", limpio)
        self.assertIn("Las raíces dorsales. fibras sensitivas.", limpio)
        self.assertIn("Los reflejos. arcos reflejos.", limpio)

    def test_preguntas_vinyeta_todas_las_muestras_reales(self):
        casos = [
            (
                "con tres cadáveres. ● ¿Por qué los estudiantes de medicina deben estudiar más de un cadáver?  Por supuesto, hay variaciones.",
                "con tres cadáveres. Por supuesto, hay variaciones.",
            ),
            (
                "equilibrio termostático. ● ¿Qué componente del sistema de calefacción actúa como el sensor? ¿Y cuál lo hace como el efector? FIGURA uno coma diez.",
                "equilibrio termostático. FIGURA uno coma diez.",
            ),
            (
                "los vasos sanguíneos. ●¿Los cortes del huevo de la figura anterior se clasificarían como longitudinales, transversales u oblicuos? ¿Cuál sería el aspecto del huevo si fuera cortado en los otros dos planos?  b Elaborar un corte.",
                "los vasos sanguíneos. b Elaborar un corte.",
            ),
            (
                "la mucosa vaginal. ●Aparte de las encías y la vagina, mencione otro epitelio en el cuerpo que tendría este aspecto al microscopio electrónico de barrido.  PARTE UNO Organización corporal Después sigue.",
                "la mucosa vaginal. Después sigue.",
            ),
            (
                "en el molar. ●De todos los componentes mostrados aquí, ¿cuál o cuáles no corresponden a tejidos vivos? Nombres de los dientes incisivos.",
                "en el molar. Nombres de los dientes incisivos.",
            ),
            (
                "Cada célula tiene veintitrés pares. ●Aunque se pasen a los descendientes los mismos gametos que se heredan de los padres, no se pueden pasar los mismos cromosomas. ¿Qué proceso de esta figura es responsable de este último hecho?",
                "Cada célula tiene veintitrés pares.",
            ),
        ]
        for entrada, esperado in casos:
            with self.subTest(entrada=entrada[:50]):
                limpio, c = lsr.limpiar_texto_saladin(entrada)
                self.assertEqual(limpio, esperado)
                self.assertEqual(c["vinyeta"], 1)
                self.assertNotIn("●", limpio)
                self.assertNotIn("  ", limpio)

    def test_glosas_etimologicas_y_notas_biograficas_reales(self):
        muestra = (
            "El músculo bíceps flexiona el brazo. doce bi igual a dos; pedis igual a pie. "
            "La homeostasis mantiene el equilibrio. dieciocho homeo igual a igual; stasis igual a permanecer. "
            "Los epónimos históricos. diecinueve epo igual a a partir de, relacionado con; onomos igual a nombre. "
            "Los osteocitos viven en lagunas. veintiuno osteo igual a hueso; cito igual a célula.\n\n"
            "El músculo cardíaco. veinticuatro esfint igual a aplastar, unir de manera apretada. "
            "veinticinco mio igual a músculo; cito igual a célula. "
            "veintiséis inter igual a entre; calado igual a insertado. Sigue el texto.\n\n"
            "Las glándulas acinares. treinta y un ácino igual a baya. "
            "treinta y dos alveolo igual a recipiente, cavidad. "
            "treinta y tres cito igual a célula;\n\n"
            "Las glándulas vestibulares. "
            "catorce Caspar Bartholin, mil seiscientos cincuenta y cinco a mil setecientos treinta y ocho, anatomista danés. "
            "quince Alexander J. C. Skene, mil ochocientos treinta y ocho a mil novecientos, ginecólogo estadounidense. "
            "El conducto desemboca en el vestíbulo."
        )
        limpio, c = lsr.limpiar_texto_saladin(muestra)
        self.assertEqual(c["glosa"], 10)
        self.assertEqual(c["bio"], 2)
        self.assertNotIn("igual a", limpio)
        self.assertNotIn("Bartholin", limpio)
        self.assertNotIn("Skene", limpio)
        # Preserva saltos de párrafo y contenido útil
        self.assertIn("\n\n", limpio)
        self.assertIn("El músculo bíceps flexiona el brazo.", limpio)
        self.assertIn("Sigue el texto.", limpio)
        self.assertIn("El conducto desemboca en el vestíbulo.", limpio)
        self.assertNotIn("  ", limpio)

    def test_negativos_criticos_no_se_tocan(self):
        negativos = (
            "gastro igual a una forma combinada que significa estómago. "
            "entero igual a una forma combinada que significa intestino delgado.\n\n"
            "La sangre arterial mantiene un pH igual a siete coma cuatro en reposo.\n\n"
            "En la fórmula, R igual a región de resistencia vascular y presión igual a fuerza entre área.\n\n"
            "El gasto cardíaco es igual a la frecuencia por el volumen sistólico. "
            "Dos es igual a la mitad de cuatro. "
            "La arteria tiene un diámetro igual a cinco milímetros y Un volumen igual a diez mililitros es normal."
        )
        limpio, c = lsr.limpiar_texto_saladin(negativos)
        self.assertEqual(limpio, negativos)
        self.assertEqual(c["total"], 0)

    def test_idempotencia_y_preservacion_parrafos(self):
        texto = (
            "CAPÍTULO uno Temas principales de anatomía y fisiología\n\n"
            "Primer párrafo de introducción al estudio anatómico y fisiológico de los tejidos "
            "y sistemas corporales humanos en condiciones normales de salud.\n\n"
            "Segundo párrafo con ruido.  PARTE UNO Organización corporal "
            "en las glánduPARTE CINCO Reproducción y desarrollo las mamarias. "
            "● ¿Qué órgano se ilustra? ¿Cuál es su función? "
            "veinticuatro esfint igual a aplastar, unir de manera apretada. "
            "catorce Caspar Bartholin, mil seiscientos cincuenta y cinco a mil setecientos treinta y ocho, anatomista danés. "
            "CAPÍTULO uno Temas principales de anatomía y fisiología "
            "Cierre del segundo párrafo.\n\n"
            "Tercer párrafo limpio con presión igual a fuerza entre área."
        )
        paso1, c1 = lsr.limpiar_texto_saladin(texto)
        paso2, c2 = lsr.limpiar_texto_saladin(paso1)

        self.assertGreater(c1["total"], 0)
        self.assertEqual(paso2, paso1)
        self.assertEqual(c2["total"], 0)
        self.assertEqual(paso1.count("\n\n"), 3)
        self.assertIn("en las glándulas mamarias.", paso1)
        self.assertIn("Cierre del segundo párrafo.", paso1)
        self.assertIn("presión igual a fuerza entre área.", paso1)

    def test_seleccion_20_capitulos_psa_2027_todos_y_solo(self):
        self.assertEqual(len(lsr.CAPITULOS_PSA_2027_SALADIN), 20)
        self.assertEqual(
            lsr.CAPITULOS_PSA_2027_SALADIN,
            (
                "01", "05", "06", "08", "09", "10", "13", "14", "15", "16",
                "17", "18", "19", "20", "21", "22", "23", "25", "27", "28",
            ),
        )
        with tempfile.TemporaryDirectory() as tmpdir:
            carpeta = Path(tmpdir)
            for num in range(1, 30):
                (carpeta / f"Tema_{num:02d}_Morfo_Saladin_LITERAL_TTS.md").write_text(
                    "Texto base.\n", encoding="utf-8"
                )
            (carpeta / "Atlas_A_Morfo_Saladin_LITERAL_TTS.md").write_text("Atlas A.\n", encoding="utf-8")
            (carpeta / "Atlas_B_Morfo_Saladin_LITERAL_TTS.md").write_text("Atlas B.\n", encoding="utf-8")
            # Un archivo de otro libro (Calvo) no debe seleccionarse nunca
            (carpeta / "Tema_01_Biologia_Celular_Calvo_LITERAL_TTS.md").write_text("Calvo.\n", encoding="utf-8")

            por_defecto = lsr.seleccionar_archivos(carpeta)
            self.assertEqual(len(por_defecto), 20)
            nums_defecto = tuple(lsr._numero_capitulo_archivo(p) for p in por_defecto)
            self.assertEqual(nums_defecto, lsr.CAPITULOS_PSA_2027_SALADIN)

            todos = lsr.seleccionar_archivos(carpeta, todos=True)
            self.assertEqual(len(todos), 31)

            solo = lsr.seleccionar_archivos(carpeta, solo="Tema_08_Morfo_Saladin")
            self.assertEqual([p.name for p in solo], ["Tema_08_Morfo_Saladin_LITERAL_TTS.md"])

    def test_cli_seco_y_respaldo_unico(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            carpeta = Path(tmpdir)
            ruta = carpeta / "Tema_01_Morfo_Saladin_LITERAL_TTS.md"
            original = "Texto.  PARTE UNO Organización corporal doce bi igual a dos; pedis igual a pie. Fin.\n"
            ruta.write_text(original, encoding="utf-8")

            # Modo --seco: no modifica ni crea respaldo
            buf_seco = io.StringIO()
            with contextlib.redirect_stdout(buf_seco):
                rc_seco = lsr.main(["--seco", "--dir", str(carpeta)])
            self.assertEqual(rc_seco, 0)
            self.assertEqual(ruta.read_text(encoding="utf-8"), original)
            self.assertFalse((carpeta / lsr.NOMBRE_CARPETA_RESPALDO).exists())

            # Modo real: limpia y crea respaldo único
            buf_real = io.StringIO()
            with contextlib.redirect_stdout(buf_real):
                rc_real = lsr.main(["--dir", str(carpeta)])
            self.assertEqual(rc_real, 0)
            self.assertEqual(ruta.read_text(encoding="utf-8"), "Texto. Fin.\n")
            bak = carpeta / lsr.NOMBRE_CARPETA_RESPALDO / ruta.name
            self.assertTrue(bak.is_file())
            self.assertEqual(bak.read_text(encoding="utf-8"), original)

            # Segunda ejecución: idempotente y NO sobrescribe el respaldo original
            ruta.write_text("Texto. ● ¿Pregunta? Fin.\n", encoding="utf-8")
            with contextlib.redirect_stdout(io.StringIO()):
                rc_seg = lsr.main(["--dir", str(carpeta)])
            self.assertEqual(rc_seg, 0)
            self.assertEqual(ruta.read_text(encoding="utf-8"), "Texto. Fin.\n")
            self.assertEqual(bak.read_text(encoding="utf-8"), original)


def main() -> int:
    lsr._configurar_stdout_utf8()
    resultado = unittest.main(module=__name__, exit=False, verbosity=2)
    return 0 if resultado.result.wasSuccessful() else 1


if __name__ == "__main__":
    raise SystemExit(main())
