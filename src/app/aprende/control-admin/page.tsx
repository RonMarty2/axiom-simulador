"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
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
        { titulo: "Qué es el control", componente: Esc01 },
        { titulo: "Objetivos del control", componente: Esc02 },
        { titulo: "Las 4 fases del proceso", componente: Esc03 },
        { titulo: "Los 3 tipos de control", componente: Esc04 },
        { titulo: "Herramientas y técnicas", componente: Esc05 },
        { titulo: "Un sistema de control efectivo", componente: Esc06 },
        { titulo: "Limitaciones del control", componente: Esc07 },
        { titulo: "Práctica final", componente: Esc08 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>El control administrativo</Titulo>
      <Definicion termino="control">
        Componente central del proceso gerencial cuya finalidad es asegurar que las actividades
        planificadas se lleven a cabo correctamente.
      </Definicion>
      <Parrafo>
        El control es <strong>inseparable de la planificación</strong>. Si la planificación establece
        los objetivos y las estrategias, el control verifica que se cumplan. Actúa como sistema de
        retroalimentación.
      </Parrafo>
      <PorQue>
        Sin control, no se puede saber si lo planeado se está logrando. Es la última función del proceso
        administrativo, pero también la que <strong>cierra el ciclo</strong> hacia una nueva planeación.
      </PorQue>

      <Hook>
        La <strong>C</strong> de POIDC. Cierras el ciclo. Es la función más matemática: estándares vs
        realidad, desviaciones, métricas. <strong>"Lo que no se mide, no se mejora"</strong> (Peter
        Drucker).
      </Hook>

      <Misconception titulo="Control ≠ vigilancia ni castigo">
        El control administrativo NO es "vigilar para castigar". Es <strong>medir para corregir</strong>.
        Si un control solo busca encontrar culpables, los empleados ocultan errores y el sistema
        falla. Si busca aprender, se reportan a tiempo y se mejora.
      </Misconception>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Objetivos del control</Titulo>
      <Resumen>
        <strong>Mejorar la eficiencia</strong>: verifica que los recursos se utilicen óptimamente.<br /><br />
        <strong>Asegurar la calidad</strong>: controla que los productos o servicios cumplan los
        estándares.<br /><br />
        <strong>Facilitar la toma de decisiones</strong>: provee información relevante sobre el
        desempeño.<br /><br />
        <strong>Promover la transparencia</strong>: ayuda a evitar irregularidades mediante auditorías
        y revisiones.
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Las 4 fases del proceso de control</Titulo>
      <Resumen>
        <strong>1. Establecimiento de estándares</strong>: criterios específicos contra los cuales se
        medirá el desempeño.<br /><br />
        <strong>2. Medición del desempeño real</strong>: se recolectan datos sobre los resultados.<br /><br />
        <strong>3. Comparación con los estándares</strong>: identifica posibles desviaciones.<br /><br />
        <strong>4. Acciones correctivas</strong>: si las desviaciones son significativas, se toman
        medidas para corregirlas.
      </Resumen>

      <Mnemotecnia>
        <strong>"E-M-C-A"</strong>: las 4 fases del control:<br />
        <strong>E</strong>stándares · <strong>M</strong>edición · <strong>C</strong>omparación ·
        <strong> A</strong>cciones correctivas.<br /><br />
        Frase: <em>"Estándares Miden, Comparan, Actúan"</em>.
      </Mnemotecnia>

      <WorkedExample titulo="Control en acción · tienda de electrodomésticos en Cochabamba">
        Tienda con meta mensual de 200 ventas.<br /><br />

        <strong>1. Estándar:</strong> 200 ventas/mes = ~7 ventas/día (con 28 días hábiles). Cada
        vendedor: 70 ventas/mes.<br /><br />

        <strong>2. Medición:</strong> al día 15, llevamos 80 ventas (40% del objetivo).
        Vendedor A: 35. Vendedor B: 28. Vendedor C: 17.<br /><br />

        <strong>3. Comparación:</strong> esperaríamos 100 ventas al día 15. Estamos 20 por debajo
        (−10% del objetivo proyectado). El vendedor C está 50% bajo su meta.<br /><br />

        <strong>4. Acciones correctivas:</strong><br />
        • Capacitación express para vendedor C.<br />
        • Promoción especial los próximos 5 días (descuento 10%).<br />
        • Refuerzo de marketing en redes locales.<br /><br />

        <strong>Sin las 4 fases, el dueño se enteraría al fin de mes que falló: sin tiempo de
        corregir.</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Los 3 tipos de control</Titulo>
      <Resumen>
        <strong>1. Control preventivo</strong>: busca <em>anticipar</em> problemas antes de que
        ocurran. Ej: capacitación previa, mantenimiento programado.<br /><br />
        <strong>2. Control concurrente</strong>: se aplica <em>durante</em> la ejecución para resolver
        problemas en tiempo real. Ej: supervisión directa en la línea de producción.<br /><br />
        <strong>3. Control correctivo</strong> (o de retroalimentación): evalúa los resultados una vez
        <em> finalizadas</em> las actividades para identificar mejoras. Ej: auditorías de fin de mes.
      </Resumen>
      <Ejemplo>
        En una línea de producción, sensores de calidad detectan errores en tiempo real (concurrente).
        Si una máquina falla, el supervisor detiene la línea para ajustarla, evitando pérdidas mayores.
      </Ejemplo>

      <Mnemotecnia>
        <strong>"ANTES-DURANTE-DESPUÉS"</strong>: los 3 tipos:<br />
        <strong>P</strong>reventivo (ANTES) · <strong>C</strong>oncurrente (DURANTE) ·
        <strong> C</strong>orrectivo (DESPUÉS).<br /><br />
        En el examen suelen preguntar "¿cuál se aplica DURANTE la ejecución?" → siempre concurrente.
      </Mnemotecnia>

      <CasoBolivia>
        <strong>Control en una salteñería de El Prado:</strong><br />
        • <strong>Preventivo:</strong> capacitar al chef en proporciones para que cada salteña tenga
        exactamente 8 gramos de carne. Comprar carne fresca cada mañana.<br />
        • <strong>Concurrente:</strong> el dueño revisa cada bandeja al salir del horno: ¿buena
        coloración? ¿no se reventaron?<br />
        • <strong>Correctivo:</strong> al cierre, revisa ventas y feedback de clientes. ¿Hubo
        quejas? Mañana ajusta la receta.<br /><br />
        Los 3 tipos coexisten en una operación bien controlada.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Herramientas y técnicas</Titulo>
      <Resumen>
        <strong>Presupuestos</strong>: controlan gasto y asignación de recursos.<br /><br />
        <strong>Auditorías</strong> internas y externas: verifican integridad de procesos financieros y
        operativos.<br /><br />
        <strong>Cuadro de Mando Integral (Balanced Scorecard)</strong>: monitorea el desempeño desde
        diferentes perspectivas (financiera, procesos, aprendizaje, clientes).<br /><br />
        <strong>Benchmarking</strong>: compara el desempeño con empresas líderes del sector.
      </Resumen>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Características de un sistema de control efectivo</Titulo>
      <Resumen>
        <strong>Preciso</strong>: la información debe ser fiable y relevante.<br /><br />
        <strong>Flexible</strong>: capaz de adaptarse a cambios imprevistos.<br /><br />
        <strong>Oportuno</strong>: la información debe llegar a tiempo para tomar decisiones
        correctivas.<br /><br />
        <strong>Económico</strong>: el costo del control no debe exceder sus beneficios.<br /><br />
        <strong>Orientado a la acción</strong>: los controles deben facilitar decisiones rápidas y
        efectivas.
      </Resumen>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Limitaciones del control</Titulo>
      <Cuidado>
        <strong>Costo elevado</strong>: implementar sistemas de control puede ser caro.
      </Cuidado>
      <Cuidado>
        <strong>Resistencia del personal</strong>: los empleados pueden percibir el control como
        vigilancia excesiva, lo que afecta moral y motivación.
      </Cuidado>
      <Cuidado>
        <strong>Factores externos</strong>: cambios económicos o sociales pueden afectar los resultados
        sin que el control pueda hacer nada al respecto.
      </Cuidado>
      <PorQue>
        Conocer las limitaciones permite diseñar sistemas de control <strong>proporcionados</strong>: ni
        tan laxos que no detecten nada, ni tan estrictos que asfixien a la organización.
      </PorQue>

      <Misconception titulo="Más control NO siempre = mejor empresa">
        Si una empresa tiene 10 niveles de aprobación para comprar un lapicero, no controla mejor:
        se paraliza. El exceso de control mata la agilidad. El secreto: controlar lo CRÍTICO con
        rigor y soltar lo trivial.
      </Misconception>

      <Conexion>
        Con esta C cerramos las 5 funciones del proceso administrativo: <strong>P</strong>laneación,
        <strong> O</strong>rganización, <strong>I</strong>ntegración de personal,
        <strong> D</strong>irección, <strong>C</strong>ontrol. Pero el ciclo no termina: los
        resultados del control alimentan la próxima planeación. Es un BUCLE continuo.
      </Conexion>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "El control es inseparable de la:", o: [
          "auditoría externa", "planeación", "dirección", "supervisión técnica",
        ], c: 1, ex: "La planeación define qué controlar; el control verifica que se cumpla." },
        { p: "Las 4 fases del control son:", o: [
          "planear, ejecutar, medir, ajustar",
          "estándares, medición, comparación, acciones correctivas",
          "diagnóstico, tratamiento, control, alta",
          "auditar, evaluar, ajustar, comunicar",
        ], c: 1, ex: "Esa es la secuencia clásica del proceso de control." },
        { p: "El control que actúa DURANTE la ejecución es:", o: [
          "preventivo", "concurrente", "correctivo", "presupuestario",
        ], c: 1, ex: "Concurrente = en tiempo real, mientras se ejecuta." },
        { p: "Comparar el desempeño con empresas líderes del sector se llama:", o: [
          "auditoría", "presupuesto", "benchmarking", "scorecard",
        ], c: 2, ex: "Benchmarking: aprender de los mejores del rubro." },
        { p: "Una limitación del control es que:", o: [
          "es gratis",
          "todos los empleados lo aceptan con gusto",
          "su costo no debe exceder sus beneficios",
          "siempre garantiza el resultado",
        ], c: 2, ex: "Economía: la regla del costo/beneficio aplica al sistema de control mismo." },
      ]} />
    </EscenaRica>
  );
}
