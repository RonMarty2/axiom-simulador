"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, CasoBolivia, Misconception, Mnemotecnia,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Introducción a la contabilidad"
      escenas={[
        { titulo: "Usuarios de la información contable", componente: Esc01 },
        { titulo: "Usuarios internos", componente: Esc02 },
        { titulo: "Usuarios externos", componente: Esc03 },
        { titulo: "Qué son los PCGA", componente: Esc04 },
        { titulo: "Los 5 principios", componente: Esc05 },
        { titulo: "Práctica final", componente: Esc06 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Para quién es la información contable?</Titulo>
      <Parrafo>
        La información contable tiene una amplia gama de usuarios. Se dividen en dos grandes grupos
        según su relación con la organización:
      </Parrafo>
      <Resumen>
        <strong>Internos</strong>: están <em>dentro</em> de la organización: gerentes, directivos,
        empleados.<br /><br />
        <strong>Externos</strong>: están <em>fuera</em>: inversionistas, proveedores, gobierno,
        acreedores.
      </Resumen>

      <Hook>
        Esta unidad responde a "<strong>¿para quién contabilizo?</strong>". El examen UMSS suele
        pedir clasificar un agente como interno o externo. Si entiendes que la prueba es
        "<em>¿está dentro de la organización o fuera?</em>", aciertas todas.
      </Hook>

      <Mnemotecnia>
        <strong>"GED vs IPGA" · 2 grupos de usuarios</strong>:<br />
        <strong>Internos: G-E-D</strong> → <strong>G</strong>erentes, <strong>E</strong>mpleados,
        <strong> D</strong>irectivos.<br />
        <strong>Externos: I-P-G-A</strong> → <strong>I</strong>nversionistas,
        <strong> P</strong>roveedores, <strong>G</strong>obierno, <strong>A</strong>creedores.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Usuarios internos</Titulo>
      <Parrafo>
        Son las personas dentro de la organización que necesitan la información contable para la gestión
        diaria y la toma de decisiones operativas.
      </Parrafo>
      <Ejemplo titulo="Gerentes y directivos">
        Usan la información para supervisar el rendimiento de la empresa y tomar decisiones
        estratégicas.
      </Ejemplo>
      <Ejemplo titulo="Empleados">
        Pueden utilizarla para evaluar su propia productividad o el desempeño de su equipo.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>Usuarios externos</Titulo>
      <Parrafo>
        Son personas o entidades <em>fuera</em> de la organización que requieren la información para
        evaluar la situación financiera de la empresa.
      </Parrafo>
      <Resumen>
        <strong>Inversionistas</strong>: necesitan conocer la rentabilidad de sus inversiones.<br /><br />
        <strong>Proveedores</strong>: evalúan la capacidad de la empresa para cumplir con sus pagos.<br /><br />
        <strong>Gobierno y entidades fiscales</strong>: aseguran que la empresa cumpla con sus
        obligaciones tributarias.<br /><br />
        <strong>Acreedores</strong>: evalúan la solvencia y capacidad de pago de deudas.
      </Resumen>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Los PCGA</Titulo>
      <Definicion termino="PCGA (Principios de Contabilidad Generalmente Aceptados)">
        Conjunto de <strong>normas y directrices</strong> que rigen la práctica contable. Aseguran la
        <strong> uniformidad y comparabilidad</strong> de los estados financieros entre empresas y entre
        países.
      </Definicion>
      <PorQue>
        Sin PCGA, cada empresa registraría a su manera y sería imposible comparar. Con PCGA, un inversor
        puede mirar dos empresas distintas y saber que están midiendo las mismas cosas de forma
        consistente.
      </PorQue>

      <CasoBolivia>
        En Bolivia, los PCGA están regulados por el <strong>Colegio de Auditores y Contadores
        Públicos</strong> y se complementan con las <strong>Normas Internacionales de Información
        Financiera (NIIF)</strong> para empresas grandes. El SIN exige aplicar PCGA en
        declaraciones tributarias. No es opcional: una empresa que ignora los PCGA puede recibir
        sanciones tributarias.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Los 5 principios fundamentales</Titulo>
      <Resumen>
        <strong>1. Entidad económica</strong>: los registros se limitan a la empresa, sin mezclarlos
        con las cuentas personales de sus propietarios.<br /><br />
        <strong>2. Unidad monetaria</strong>: toda transacción se expresa en una unidad de medida común
        (la moneda del país).<br /><br />
        <strong>3. Periodo contable</strong>: la información se presenta en períodos regulares
        (anualmente, trimestralmente, etc.).<br /><br />
        <strong>4. Partida doble</strong>: cada transacción afecta al menos dos cuentas (un débito y un
        crédito), manteniendo el equilibrio.<br /><br />
        <strong>5. Devengado</strong>: las operaciones se registran cuando se genera la obligación o el
        derecho, NO cuando ocurre el pago.
      </Resumen>
      <Ejemplo titulo="Principio del devengado">
        Si firmo un contrato en diciembre por un servicio que cobraré en enero, lo registro en
        diciembre (cuando se devengó), no en enero (cuando me pagan).
      </Ejemplo>

      <Mnemotecnia>
        <strong>"E-U-P-P-D"</strong> · los 5 principios PCGA:<br />
        <strong>E</strong>ntidad económica · <strong>U</strong>nidad monetaria ·
        <strong> P</strong>eriodo contable · <strong>P</strong>artida doble ·
        <strong> D</strong>evengado.<br /><br />
        Frase: <em>"Empresa Usa Plata Por Definición"</em>.
      </Mnemotecnia>

      <Misconception titulo="Devengado vs efectivo NO son lo mismo">
        Mucha gente confunde "registrar" con "cobrar". El principio del devengado dice: registrá
        cuando OCURRE el hecho económico (cuando entregué el servicio, cuando me obligué a
        pagar), no cuando hay flujo de caja. Por eso una empresa puede tener UTILIDAD CONTABLE
        sin tener PLATA en caja. Son dos cosas distintas.
      </Misconception>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Un inversionista que compra acciones de una empresa es:", o: [
          "usuario interno", "usuario externo", "auditor", "regulador",
        ], c: 1, ex: "Está fuera de la empresa, usa la info para decidir su inversión." },
        { p: "El principio de entidad económica significa que:", o: [
          "todas las empresas son una sola",
          "los registros NO se mezclan con cuentas personales del dueño",
          "se contabiliza solo lo grande",
          "se registra en una sola moneda",
        ], c: 1, ex: "Empresa y dueño son entidades contables distintas." },
        { p: "El principio del devengado dice que se registra:", o: [
          "solo cuando hay pago en efectivo",
          "cuando se genera el derecho/obligación, no cuando se paga",
          "una vez por año",
          "al cierre del balance",
        ], c: 1, ex: "Por eso 'devengar' un ingreso o un gasto." },
        { p: "Los PCGA sirven para:", o: [
          "decidir el precio de los productos",
          "asegurar uniformidad y comparabilidad",
          "calcular impuestos solamente",
          "establecer salarios",
        ], c: 1, ex: "Permiten comparar empresas entre sí y a lo largo del tiempo." },
        { p: "Un acreedor de la empresa usa los estados financieros para:", o: [
          "decidir si reinvierte sus ahorros allí",
          "evaluar si le van a poder pagar la deuda",
          "auditar el cumplimiento legal",
          "negociar el sueldo de los gerentes",
        ], c: 1, ex: "Mide la solvencia: ¿podrán pagar lo que les presté?" },
      ]} />
    </EscenaRica>
  );
}
