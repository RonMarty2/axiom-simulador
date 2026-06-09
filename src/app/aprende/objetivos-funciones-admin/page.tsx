"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Resumen,
  EscenaRica, PracticaFinal,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="Conceptos fundamentales de la administración"
      escenas={[
        { titulo: "Las 5 funciones administrativas", componente: Esc01 },
        { titulo: "Planificación", componente: Esc02 },
        { titulo: "Organización", componente: Esc03 },
        { titulo: "Integrar personal", componente: Esc04 },
        { titulo: "Dirección", componente: Esc05 },
        { titulo: "Control", componente: Esc06 },
        { titulo: "Por qué son un ciclo", componente: Esc07 },
        { titulo: "Práctica final", componente: Esc08 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>Las 5 funciones de la administración</Titulo>
      <Parrafo>
        Toda actividad gerencial puede ubicarse en una de estas cinco funciones, que son la espina
        dorsal del proceso administrativo:
      </Parrafo>
      <Resumen>
        <strong>1. Planificación</strong> — definir objetivos y estrategias.<br />
        <strong>2. Organización</strong> — estructurar recursos y actividades.<br />
        <strong>3. Integrar personal</strong> — cubrir y mantener cubiertos los puestos.<br />
        <strong>4. Dirección</strong> — motivar y liderar a las personas.<br />
        <strong>5. Control</strong> — monitorear y corregir el desempeño.
      </Resumen>
      <PorQue>
        Las cinco funciones se cruzan e interactúan: no son una secuencia rígida, sino un sistema. Pero
        sí tienen un orden lógico.
      </PorQue>

      <Hook>
        Las 5 funciones POIDC son <strong>la pregunta más repetida del bloque de administración</strong>
        en el examen UMSS. Memorizarlas en orden te garantiza varias respuestas correctas.
      </Hook>

      <Mnemotecnia>
        <strong>"POIDC"</strong>:<br />
        <strong>P</strong>laneación · <strong>O</strong>rganización · <strong>I</strong>ntegrar
        personal · <strong>D</strong>irección · <strong>C</strong>ontrol.<br /><br />
        Frase mnemónica: <em>"Para Obtener Ingresos, Dirigí Controlando"</em>.
      </Mnemotecnia>

      <Misconception titulo="No son fases separadas en el tiempo">
        Algunos creen que primero se planea TODO, luego se organiza TODO, etc. Falso: un gerente
        planea de mañana y controla de tarde el mismo día. Las 5 funciones <strong>conviven en
        simultáneo</strong>, no son etapas cronológicas.
      </Misconception>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>1 · Planificación</Titulo>
      <Definicion termino="planificación">
        Proceso de <strong>definir objetivos</strong>, establecer estrategias para alcanzarlos y desarrollar
        planes detallados para integrar y coordinar actividades.
      </Definicion>
      <Parrafo>
        Incluye la anticipación de eventos futuros y la preparación para enfrentar desafíos. Sin un
        plan, las otras funciones no tienen rumbo.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>2 · Organización</Titulo>
      <Definicion termino="organización">
        Estructurar los recursos y las actividades de la empresa de manera eficiente. Implica la
        definición de <strong>roles, responsabilidades, jerarquías</strong> y la asignación de recursos.
      </Definicion>
      <Parrafo>
        Asegura que las tareas se realicen de manera coordinada, sin duplicaciones ni huecos. Diseña la
        estructura sobre la que se actuará.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>3 · Integrar Personal</Titulo>
      <Definicion termino="integrar personal">
        Asegurar que los puestos dentro de la estructura organizacional <strong>estén ocupados y se
        mantengan cubiertos</strong>.
      </Definicion>
      <Resumen>
        Implica:<br />
        • Identificar las necesidades de recursos humanos.<br />
        • Evaluar la disponibilidad de candidatos.<br />
        • Gestionar reclutamiento, selección, asignación, promoción y evaluación.<br />
        • Planificar el desarrollo profesional (formación continua, compensación adecuada).
      </Resumen>
      <PorQue>
        Una buena estructura sin la gente correcta no produce nada. Esta función es el "puente" entre el
        diseño organizacional y la acción real.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>4 · Dirección</Titulo>
      <Definicion termino="dirección">
        Motivación, liderazgo y comunicación con los empleados para guiar sus esfuerzos hacia el
        cumplimiento de los objetivos organizacionales.
      </Definicion>
      <Parrafo>
        Incluye la <strong>toma de decisiones</strong>, la <strong>resolución de conflictos</strong> y el
        <strong> fomento de un ambiente positivo</strong> de trabajo.
      </Parrafo>
      <Ejemplo>
        Un gerente de ventas planifica cuotas (planeación), organiza al equipo en territorios
        (organización), cubre vacantes (integración) — y entonces dirige: reúne al equipo, comunica las
        metas, motiva y resuelve los conflictos del día a día.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>5 · Control</Titulo>
      <Definicion termino="control">
        Monitorear y evaluar el desempeño organizacional <strong>en relación con los objetivos
        establecidos</strong>.
      </Definicion>
      <Resumen>
        Incluye:<br />
        • Identificar desviaciones de los estándares.<br />
        • Implementar medidas correctivas.<br />
        • Retroalimentación continua para mejorar procesos.
      </Resumen>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Por qué son un ciclo</Titulo>
      <Parrafo>
        La administración NO es una fórmula lineal "planificar → organizar → dirigir → controlar y
        terminar". Es un <strong>ciclo</strong>: cada control alimenta una nueva planificación, una
        reorganización si hace falta, una nueva dirección.
      </Parrafo>
      <Resumen>
        Las cinco funciones se realizan <strong>simultáneamente</strong> y se afectan mutuamente. Un
        gerente piensa en planificar mientras dirige, y mientras controla detecta que hay que
        reorganizar.
      </Resumen>

      <WorkedExample titulo="Las 5 funciones en un solo día de un gerente">
        Lucía dirige una empresa de software de 30 personas en Cochabamba.<br /><br />

        <strong>8:00 AM (Planeación):</strong> revisa OKRs del trimestre con su equipo de
        leadership.<br />
        <strong>10:00 (Organización):</strong> firma cambio de organigrama: el equipo de QA pasa a
        reportar a CTO en vez de a Operaciones.<br />
        <strong>11:30 (Integración):</strong> entrevista a 2 candidatos para el puesto de Backend
        Senior.<br />
        <strong>14:00 (Dirección):</strong> reunión 1-on-1 con un líder que tiene conflictos con su
        equipo: escucha, da feedback, decide acompañar.<br />
        <strong>16:00 (Control):</strong> revisa dashboard de ventas, detecta que un cliente
        importante atrasó pago — activa al área comercial.<br /><br />

        <strong>En 8 horas Lucía aplicó las 5 funciones</strong>. No las hizo "una después de la
        otra": las intercaló según lo que el día requería. Eso es la administración real.
      </WorkedExample>

      <Conexion>
        Cada una de las 5 funciones tiene su propia unidad en el Bloque 1 Unidad 4. Esta lección
        es solo el MAPA: las próximas son la profundización de cada función con teorías, técnicas
        y casos.
      </Conexion>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Definir objetivos y estrategias corresponde a:", o: [
          "control", "dirección", "planificación", "organización",
        ], c: 2, ex: "Es la primera función: el QUÉ y el CÓMO." },
        { p: "Diseñar el organigrama corresponde a:", o: [
          "planificación", "organización", "integración personal", "dirección",
        ], c: 1, ex: "Estructurar roles y jerarquías = organización." },
        { p: "Reclutar, seleccionar y formar empleados es:", o: [
          "integración personal", "dirección", "organización", "control",
        ], c: 0, ex: "Cubrir y mantener cubiertos los puestos = integrar personal." },
        { p: "Motivar y comunicar con el equipo es:", o: [
          "planificación", "dirección", "control", "organización",
        ], c: 1, ex: "Guiar esfuerzos hacia los objetivos = dirección." },
        { p: "Comparar resultados reales con objetivos planeados es:", o: [
          "dirección", "control", "auditoría externa", "evaluación de desempeño individual",
        ], c: 1, ex: "Monitoreo + corrección = control." },
      ]} />
    </EscenaRica>
  );
}
