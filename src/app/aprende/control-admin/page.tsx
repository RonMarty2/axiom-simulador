"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
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
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Objetivos del control</Titulo>
      <Resumen>
        <strong>Mejorar la eficiencia</strong> — verifica que los recursos se utilicen óptimamente.<br /><br />
        <strong>Asegurar la calidad</strong> — controla que los productos o servicios cumplan los
        estándares.<br /><br />
        <strong>Facilitar la toma de decisiones</strong> — provee información relevante sobre el
        desempeño.<br /><br />
        <strong>Promover la transparencia</strong> — ayuda a evitar irregularidades mediante auditorías
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
        <strong>1. Establecimiento de estándares</strong> — criterios específicos contra los cuales se
        medirá el desempeño.<br /><br />
        <strong>2. Medición del desempeño real</strong> — se recolectan datos sobre los resultados.<br /><br />
        <strong>3. Comparación con los estándares</strong> — identifica posibles desviaciones.<br /><br />
        <strong>4. Acciones correctivas</strong> — si las desviaciones son significativas, se toman
        medidas para corregirlas.
      </Resumen>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Los 3 tipos de control</Titulo>
      <Resumen>
        <strong>1. Control preventivo</strong> — busca <em>anticipar</em> problemas antes de que
        ocurran. Ej: capacitación previa, mantenimiento programado.<br /><br />
        <strong>2. Control concurrente</strong> — se aplica <em>durante</em> la ejecución para resolver
        problemas en tiempo real. Ej: supervisión directa en la línea de producción.<br /><br />
        <strong>3. Control correctivo</strong> (o de retroalimentación) — evalúa los resultados una vez
        <em> finalizadas</em> las actividades para identificar mejoras. Ej: auditorías de fin de mes.
      </Resumen>
      <Ejemplo>
        En una línea de producción, sensores de calidad detectan errores en tiempo real (concurrente).
        Si una máquina falla, el supervisor detiene la línea para ajustarla, evitando pérdidas mayores.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Herramientas y técnicas</Titulo>
      <Resumen>
        <strong>Presupuestos</strong> — controlan gasto y asignación de recursos.<br /><br />
        <strong>Auditorías</strong> internas y externas — verifican integridad de procesos financieros y
        operativos.<br /><br />
        <strong>Cuadro de Mando Integral (Balanced Scorecard)</strong> — monitorea el desempeño desde
        diferentes perspectivas (financiera, procesos, aprendizaje, clientes).<br /><br />
        <strong>Benchmarking</strong> — compara el desempeño con empresas líderes del sector.
      </Resumen>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Características de un sistema de control efectivo</Titulo>
      <Resumen>
        <strong>Preciso</strong> — la información debe ser fiable y relevante.<br /><br />
        <strong>Flexible</strong> — capaz de adaptarse a cambios imprevistos.<br /><br />
        <strong>Oportuno</strong> — la información debe llegar a tiempo para tomar decisiones
        correctivas.<br /><br />
        <strong>Económico</strong> — el costo del control no debe exceder sus beneficios.<br /><br />
        <strong>Orientado a la acción</strong> — los controles deben facilitar decisiones rápidas y
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
        <strong>Costo elevado</strong> — implementar sistemas de control puede ser caro.
      </Cuidado>
      <Cuidado>
        <strong>Resistencia del personal</strong> — los empleados pueden percibir el control como
        vigilancia excesiva, lo que afecta moral y motivación.
      </Cuidado>
      <Cuidado>
        <strong>Factores externos</strong> — cambios económicos o sociales pueden afectar los resultados
        sin que el control pueda hacer nada al respecto.
      </Cuidado>
      <PorQue>
        Conocer las limitaciones permite diseñar sistemas de control <strong>proporcionados</strong>: ni
        tan laxos que no detecten nada, ni tan estrictos que asfixien a la organización.
      </PorQue>
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
