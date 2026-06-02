"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Introducción a la contabilidad"
      escenas={[
        { titulo: "Qué es la contabilidad", componente: Esc01 },
        { titulo: "Historia: de Mesopotamia a Pacioli", componente: Esc02 },
        { titulo: "Luca Pacioli y la partida doble", componente: Esc03 },
        { titulo: "Objetivos de la contabilidad", componente: Esc04 },
        { titulo: "Por qué es importante", componente: Esc05 },
        { titulo: "Práctica final", componente: Esc06 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es la contabilidad?</Titulo>
      <Definicion termino="contabilidad">
        Proceso de <strong>identificar, medir, registrar, clasificar, resumir, interpretar y comunicar</strong>
        la información financiera de una entidad económica. Es una disciplina que se encarga de
        proporcionar información útil para la toma de decisiones económicas.
      </Definicion>
      <Parrafo>
        No solo se aplica a empresas: también abarca personas e instituciones gubernamentales. Su
        objetivo principal es reflejar la <strong>situación económica y financiera</strong> de una
        entidad, mostrando sus activos, pasivos, patrimonio, ingresos y gastos.
      </Parrafo>
      <Resumen>
        La contabilidad lleva un registro <strong>detallado y sistemático</strong> de todas las
        operaciones que realiza una organización.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Historia: de Mesopotamia a la actualidad</Titulo>
      <Parrafo>
        Los registros financieros existen desde las primeras civilizaciones. Sirven para controlar
        intercambios y transacciones.
      </Parrafo>
      <Ejemplo titulo="Mesopotamia y Egipto">
        Se registraban bienes, pagos y tributos. La <strong>escritura cuneiforme</strong> y los
        <strong> papiros</strong> servían para llevar cuentas.
      </Ejemplo>
      <Ejemplo titulo="Grecia y Roma">
        Se perfeccionaron los métodos de registro para la administración de impuestos y la gestión de
        recursos públicos.
      </Ejemplo>
      <Ejemplo titulo="Contabilidad contemporánea">
        Con la industrialización y la globalización, la contabilidad evolucionó hacia un sistema
        <strong> normado y estandarizado</strong>, con informes transparentes para distintos usuarios.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Luca Pacioli y la partida doble (1494)</Titulo>
      <Parrafo>
        El gran salto histórico: en <strong>1494</strong>, el monje franciscano <strong>Luca Pacioli</strong>
        publica la obra que introduce el sistema de <strong>partida doble</strong>, considerado el pilar
        de la contabilidad actual.
      </Parrafo>
      <Definicion termino="partida doble">
        Cada transacción tiene al menos <strong>un débito y un crédito</strong> que deben equilibrarse
        entre sí. Si compro algo por 100, anoto +100 en una cuenta y −100 en otra. Las dos caras de la
        misma moneda.
      </Definicion>
      <PorQue>
        Esa idea aparentemente simple le da a la contabilidad su <strong>autocoherencia</strong>: si los
        débitos no igualan a los créditos, hay un error. Es lo que hace posible verificar libros.
      </PorQue>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Los 5 objetivos de la contabilidad</Titulo>
      <Resumen>
        <strong>1. Registro sistemático de operaciones</strong> — toda transacción queda documentada
        para permitir control.<br /><br />
        <strong>2. Información financiera clara y precisa</strong> — datos útiles para directivos,
        empleados, inversionistas y otros tomadores de decisiones.<br /><br />
        <strong>3. Evaluación financiera</strong> — permite conocer rentabilidad, solvencia y liquidez.<br /><br />
        <strong>4. Cumplimiento de normativas legales</strong> — facilita pagos de impuestos y otras
        obligaciones legales.<br /><br />
        <strong>5. Control interno</strong> — actúa como sistema de control, permite detectar errores y
        posibles fraudes.
      </Resumen>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>¿Por qué es tan importante?</Titulo>
      <Resumen>
        <strong>Facilita la toma de decisiones</strong> — los gerentes usan la información contable para
        planificar, identificar riesgos y ajustar estrategias.<br /><br />
        <strong>Permite el control financiero</strong> — mantiene un registro exacto de ingresos y gastos
        que ayuda al equilibrio financiero.<br /><br />
        <strong>Es una herramienta de transparencia</strong> — proporciona datos verificables que
        generan confianza entre inversores, socios y autoridades.<br /><br />
        <strong>Es base para la planificación</strong> — ayuda a proyectar y planificar a largo plazo,
        previendo futuros escenarios financieros.
      </Resumen>
      <Cuidado>
        Sin contabilidad, una organización está "ciega": no sabe cuánto gana, cuánto debe, ni cuánto
        vale. Es la base de cualquier decisión seria.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "La contabilidad NO incluye:", o: [
          "identificar las transacciones",
          "medirlas y registrarlas",
          "tomar decisiones políticas del país",
          "comunicar información financiera",
        ], c: 2, ex: "Es identificar, medir, registrar, clasificar, resumir, interpretar y comunicar." },
        { p: "El padre de la contabilidad moderna es:", o: [
          "Adam Smith", "Karl Marx", "Luca Pacioli", "Frederick Taylor",
        ], c: 2, ex: "Pacioli, monje franciscano, publicó la partida doble en 1494." },
        { p: "El principio de partida doble dice que:", o: [
          "todo se registra dos veces seguidas",
          "cada transacción tiene un débito y un crédito iguales",
          "se llevan dos libros independientes",
          "se mide en dos monedas",
        ], c: 1, ex: "Por eso los libros 'cuadran'. Si no, hay un error." },
        { p: "Uno de los objetivos centrales de la contabilidad es:", o: [
          "ganar más dinero",
          "evaluar la situación financiera",
          "vender bienes al exterior",
          "fijar precios",
        ], c: 1, ex: "Junto con el registro, el control y el cumplimiento legal." },
        { p: "La contabilidad sirve para:", o: [
          "solo grandes empresas",
          "solo entes públicos",
          "empresas, personas y entes públicos",
          "solo organizaciones con fines de lucro",
        ], c: 2, ex: "Cualquier entidad económica puede usarla." },
      ]} />
    </EscenaRica>
  );
}
