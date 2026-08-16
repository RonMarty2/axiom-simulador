"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="04"
      tituloUnidad="Proceso administrativo"
      escenas={[
        { titulo: "Qué es integrar personal", componente: Esc01 },
        { titulo: "Planificación de RRHH", componente: Esc02 },
        { titulo: "Reclutamiento", componente: Esc03 },
        { titulo: "Selección de personal", componente: Esc04 },
        { titulo: "Capacitación y desarrollo", componente: Esc05 },
        { titulo: "Evaluación del desempeño", componente: Esc06 },
        { titulo: "Motivación · teorías", componente: Esc07 },
        { titulo: "Retención del talento", componente: Esc08 },
        { titulo: "Práctica final", componente: Esc09 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es integrar personal?</Titulo>
      <Definicion termino="integración de personal">
        Asegurar que los puestos dentro de la estructura organizacional <strong>estén ocupados y se
        mantengan cubiertos</strong> por las personas adecuadas, en el momento oportuno.
      </Definicion>
      <Parrafo>
        La gestión de recursos humanos (RRHH) es vital porque <strong>las personas son uno de los activos
        más importantes</strong> de cualquier organización. Toda buena estrategia falla sin la gente
        correcta para ejecutarla.
      </Parrafo>
      <Resumen>
        Las principales funciones de RRHH son: planificación de la mano de obra, reclutamiento,
        selección, capacitación, evaluación de desempeño, desarrollo de carreras y retención.
      </Resumen>

      <Hook>
        La <strong>I</strong> de POIDC. Después de planear (P) y organizar (O), hay que llenar los
        puestos con personas. Es la función más HUMANA de la administración: la única donde el
        "recurso" piensa, siente y puede renunciar.
      </Hook>

      <Mnemotecnia>
        <strong>"P-R-S-C-E-D-R"</strong> · las 7 funciones de RRHH en orden cronológico:<br />
        <strong>P</strong>lanificación → <strong>R</strong>eclutamiento → <strong>S</strong>elección →
        <strong> C</strong>apacitación → <strong>E</strong>valuación → <strong>D</strong>esarrollo →
        <strong> R</strong>etención.<br /><br />
        Mismo flujo que el ciclo de vida del empleado en la empresa.
      </Mnemotecnia>

      <Misconception titulo="RRHH ≠ solo contratar y despedir">
        Mucha gente cree que RRHH es solo el área que contrata o "echa" personal. Esa visión cubre
        el 20% del trabajo. El otro 80% es: capacitar, motivar, evaluar, planificar carreras,
        manejar conflictos, retener talento.
      </Misconception>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Planificación de recursos humanos</Titulo>
      <Definicion termino="planificación de RRHH">
        Prever las <strong>necesidades futuras de personal</strong> y compararlas con la oferta disponible
        dentro y fuera de la organización.
      </Definicion>
      <Resumen>
        Herramientas fundamentales:<br /><br />
        <strong>Auditoría de RRHH</strong>: evaluación del inventario de habilidades y capacidades de
        los empleados existentes.<br /><br />
        <strong>Análisis de puestos</strong>: describe responsabilidades y habilidades requeridas para
        un puesto determinado. Base para las descripciones de trabajo.
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Reclutamiento</Titulo>
      <Parrafo>
        El reclutamiento atrae un número suficiente de candidatos calificados. Puede ser <strong>interno
        o externo</strong>:
      </Parrafo>
      <Resumen>
        <strong>Reclutamiento interno</strong>: promover empleados actuales a través de ascensos o
        transferencias. <em>Ventaja</em>: motiva al equipo. <em>Riesgo</em>: puede generar resentimiento
        si no se maneja bien.<br /><br />
        <strong>Reclutamiento externo</strong>: agencias de empleo, instituciones educativas, publicidad,
        redes sociales. <em>Ventaja</em>: nuevas ideas. <em>Desventaja</em>: más costoso y lento.
      </Resumen>

      <CasoBolivia>
        En Bolivia, el reclutamiento se concentra en:<br />
        • <strong>Internas:</strong> LinkedIn (gerencias), Jobs.bo, Trabajopolis, redes
        Facebook/Instagram.<br />
        • <strong>Bolsas universitarias:</strong> UMSS, UMSA, UPB, UCB tienen oficinas de
        relaciones con empresas.<br />
        • <strong>Headhunters</strong> para cargos directivos (Cerebros, Manpower, etc.).<br />
        Para PyMEs, el "boca a boca" sigue siendo el canal #1.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Selección de personal</Titulo>
      <Definicion termino="selección">
        Proceso riguroso para garantizar que los candidatos no solo tengan las <strong>habilidades
        técnicas adecuadas</strong>, sino que también encajen en la <strong>cultura organizacional</strong>.
      </Definicion>
      <Resumen>
        Métodos comunes:<br /><br />
        <strong>Entrevistas</strong>: método más utilizado. Evalúa habilidades y compatibilidad cultural.<br /><br />
        <strong>Pruebas de habilidades y competencias</strong>: miden conocimientos técnicos, aptitudes
        específicas o psicológicas. Deben ser objetivas y alineadas con el puesto.<br /><br />
        <strong>Referencias laborales</strong>: confirman información y aportan datos sobre el
        rendimiento anterior.
      </Resumen>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Capacitación y desarrollo</Titulo>
      <Parrafo>
        Una vez seleccionados, los empleados deben ser capacitados <strong>continuamente</strong>:
      </Parrafo>
      <Resumen>
        <strong>Capacitación inicial o de inducción</strong>: el empleado conoce los procesos y la
        cultura desde el comienzo.<br /><br />
        <strong>Desarrollo continuo</strong>: programas de formación durante toda la carrera del
        empleado. Promueve crecimiento profesional y retención de talento.
      </Resumen>
      <PorQue>
        La capacitación no es un gasto, es una inversión. Un empleado capacitado es más productivo, más
        comprometido, más probable de quedarse.
      </PorQue>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Evaluación del desempeño</Titulo>
      <Definicion termino="evaluación del desempeño">
        Proceso sistemático mediante el cual los gerentes evalúan el trabajo de los empleados según
        ciertos criterios.
      </Definicion>
      <Parrafo>
        Los resultados ayudan a tomar decisiones sobre ascensos y remuneraciones, y proporcionan
        <strong> retroalimentación útil</strong> para el desarrollo del empleado.
      </Parrafo>
      <Resumen>
        Métodos comunes:<br />
        • <strong>Evaluación por objetivos</strong>: ¿cumplió las metas pactadas?<br />
        • <strong>Evaluación 360°</strong>: retroalimentación de superiores, pares y subordinados.<br />
        • <strong>Autoevaluación</strong>: el propio empleado se valora.
      </Resumen>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Motivación y satisfacción laboral</Titulo>
      <Parrafo>
        Para mantener a los empleados comprometidos y productivos, los gerentes deben conocer las
        teorías clásicas de motivación:
      </Parrafo>
      <Resumen>
        <strong>Jerarquía de necesidades de Maslow</strong>: las personas buscan satisfacer
        necesidades en un orden ascendente: fisiológicas → seguridad → sociales → estima →
        autorrealización.<br /><br />
        <strong>Teoría de los dos factores de Herzberg</strong>: distingue:<br />
        • <em>Factores higiénicos</em> (salario, condiciones físicas): su ausencia desmotiva, su
        presencia no motiva.<br />
        • <em>Factores motivadores</em> (responsabilidad, logro, reconocimiento): son los que motivan
        de verdad.<br /><br />
        <strong>Teoría X e Y de McGregor</strong>: distintos supuestos sobre cómo es el empleado y cómo
        debe ser dirigido.
      </Resumen>

      <WorkedExample titulo="Maslow aplicado · qué motiva en cada nivel de la pirámide">
        <strong>Nivel 1 · fisiológicas:</strong> salario que cubra comida, refugio.<br />
        → Empleado de salario mínimo de la construcción: lo motiva el sueldo y horas extras pagadas.
        <br /><br />

        <strong>Nivel 2 · seguridad:</strong> contrato estable, seguro de salud, AFP.<br />
        → Empleado con familia que busca trabajar en YPFB o el sector público.<br /><br />

        <strong>Nivel 3 · sociales:</strong> pertenecer a un buen equipo, amigos en el trabajo.<br />
        → Joven recién graduado que valora el clima y los after-office.<br /><br />

        <strong>Nivel 4 · estima:</strong> reconocimiento, ascensos, premios.<br />
        → Gerente medio que necesita su nombre en el organigrama y un cargo visible.<br /><br />

        <strong>Nivel 5 · autorrealización:</strong> hacer algo significativo, dejar huella.<br />
        → Profesional senior que quiere crear, enseñar, mentorear.<br /><br />

        <strong>Insight:</strong> si tu equipo está en nivel 1-2, subirles el sueldo motiva. Si ya
        están en nivel 4-5, lo que motiva es <em>responsabilidad y propósito</em>, no más plata.
      </WorkedExample>

      <Misconception titulo="Más sueldo NO siempre motiva más">
        Subir el salario motiva mucho cuando alguien no llega a fin de mes. Pero a partir de cierto
        nivel, motiva poco. Herzberg lo explicó: el dinero es factor higiénico, no motivador. Lo que
        motiva sostenidamente: <strong>reconocimiento, autonomía, responsabilidad, propósito</strong>.
      </Misconception>

      <Mnemotecnia>
        <strong>Maslow · pirámide</strong> de abajo arriba: <strong>"F-S-S-E-A"</strong> ·
        <em>Fisio-Seguridad-Social-Estima-Autorrealización</em>.<br /><br />
        En el examen, suelen mezclar el orden (poniendo Estima antes de Social, etc.). Si memorizás
        F-S-S-E-A no te confunden.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <Titulo>Retención del talento</Titulo>
      <Parrafo>
        Los altos niveles de rotación pueden ser <strong>costosos y perjudiciales</strong> para la moral
        del equipo. La retención es crucial.
      </Parrafo>
      <Resumen>
        Estrategias recomendadas:<br />
        • Políticas de compensación competitivas.<br />
        • Programas de reconocimiento.<br />
        • Oportunidades de desarrollo profesional.
      </Resumen>
      <Cuidado>
        Reemplazar a un empleado clave puede costar varias veces su salario anual (reclutamiento,
        formación, pérdida de productividad). Por eso retener vale tanto como contratar bien.
      </Cuidado>

      <Conexion>
        Esta es la <strong>I</strong> de POIDC. La siguiente función es <strong>D</strong>irección:
        una vez integrado el personal, hay que liderarlo. Y luego viene <strong>C</strong>ontrol:
        medir si los integrantes están cumpliendo objetivos.
      </Conexion>
    </EscenaRica>
  );
}

function Esc09() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Promover empleados actuales es reclutamiento:", o: [
          "interno", "externo", "mixto", "lateral",
        ], c: 0, ex: "Interno: motiva al equipo, pero requiere manejo cuidadoso." },
        { p: "Evaluar habilidades técnicas + ajuste cultural es parte de:", o: [
          "capacitación", "evaluación de desempeño", "selección", "motivación",
        ], c: 2, ex: "La selección busca ambas cosas, no solo habilidades técnicas." },
        { p: "La teoría de Maslow ordena las necesidades como:", o: [
          "del dinero a la espiritualidad",
          "de fisiológicas a autorrealización (ascendente)",
          "según la cultura del país",
          "según el cargo",
        ], c: 1, ex: "Pirámide de Maslow: 5 niveles en orden ascendente." },
        { p: "Para Herzberg, los factores higiénicos (como el salario):", o: [
          "motivan fuertemente",
          "su ausencia desmotiva, su presencia no motiva",
          "son los más importantes",
          "no aplican en oficinas",
        ], c: 1, ex: "Distinción clave: higiénicos vs motivadores." },
        { p: "La evaluación 360° incluye retroalimentación de:", o: [
          "solo el jefe",
          "solo pares",
          "superiores, pares y subordinados",
          "clientes externos solamente",
        ], c: 2, ex: "Por eso se llama 360°: mirada desde todos los ángulos." },
      ]} />
    </EscenaRica>
  );
}
