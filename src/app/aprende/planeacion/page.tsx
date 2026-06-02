"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="04"
      tituloUnidad="Proceso administrativo"
      escenas={[
        { titulo: "Qué es la planeación", componente: Esc01 },
        { titulo: "Importancia", componente: Esc02 },
        { titulo: "Los 3 tipos de planeación", componente: Esc03 },
        { titulo: "El proceso · 5 etapas", componente: Esc04 },
        { titulo: "Relación con las otras funciones", componente: Esc05 },
        { titulo: "Práctica final", componente: Esc06 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es la planeación?</Titulo>
      <Definicion termino="planeación">
        Proceso mediante el cual se <strong>determinan los objetivos</strong> de una organización y se
        desarrollan las estrategias necesarias para alcanzarlos.
      </Definicion>
      <Parrafo>
        Incluye la identificación de recursos, la evaluación de alternativas y la toma de decisiones que
        guiarán a la organización hacia sus metas. Una planeación efectiva <strong>alinea los esfuerzos
        de todos los miembros</strong> hacia un propósito común.
      </Parrafo>
      <PorQue>
        La planeación no es solo "hacer un plan". Es <strong>anticipar cambios y adaptar estrategias</strong>
        en un entorno dinámico — ser proactivo en lugar de reactivo.
      </PorQue>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>¿Por qué es importante planificar?</Titulo>
      <Resumen>
        <strong>1. Prevenir crisis</strong> — al anticipar problemas, evitar crisis y estar preparados
        para cambios inesperados.<br /><br />
        <strong>2. Optimizar recursos</strong> — mejor utilización → ahorro de costos y aumento de
        productividad.<br /><br />
        <strong>3. Establecer metas claras</strong> — medibles, lo que facilita el seguimiento.<br /><br />
        <strong>4. Coordinar esfuerzos</strong> — entre departamentos y niveles, asegurando que todos
        trabajen en la misma dirección.
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Los 3 tipos de planeación</Titulo>
      <Resumen>
        <strong>1. Planeación estratégica</strong> — <em>largo plazo</em>. Afecta la dirección general
        de la organización. Identifica metas a largo plazo y desarrolla estrategias amplias.<br /><br />
        <strong>2. Planeación táctica</strong> — <em>mediano plazo</em>. Se enfoca en cómo se llevarán a
        cabo las estrategias estratégicas. La hacen gerentes de nivel medio.<br /><br />
        <strong>3. Planeación operativa</strong> — <em>corto plazo</em>. Operaciones diarias. Programación
        de actividades específicas y asignación de recursos.
      </Resumen>
      <Ejemplo>
        Estratégica: "ser líderes del mercado en 5 años".<br />
        Táctica: "abrir 3 sucursales este año en el sur".<br />
        Operativa: "esta semana, capacitar al equipo de la sucursal 1".
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>El proceso de planeación · 5 etapas</Titulo>
      <Resumen>
        <strong>1. Establecimiento de objetivos</strong> — identificar lo que la organización quiere
        alcanzar.<br /><br />
        <strong>2. Evaluación de situaciones</strong> — análisis del entorno interno y externo:
        recursos, capacidades, limitaciones.<br /><br />
        <strong>3. Desarrollo de estrategias</strong> — generar alternativas y elegir las más apropiadas.<br /><br />
        <strong>4. Implementación</strong> — poner en práctica: asignación de recursos y comunicación
        de los planes.<br /><br />
        <strong>5. Control y evaluación</strong> — mecanismos para evaluar el progreso y realizar
        ajustes.
      </Resumen>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Relación con las otras funciones</Titulo>
      <Parrafo>
        La planeación no opera aislada. Su relación con las otras funciones gerenciales es esencial:
      </Parrafo>
      <Resumen>
        <strong>Con la organización</strong> — la planeación define <em>qué</em> hacer; la organización
        asigna recursos y diseña la estructura para hacerlo.<br /><br />
        <strong>Con la dirección</strong> — los objetivos planeados guían a líderes y empleados. La
        dirección motiva al equipo a perseguirlos.<br /><br />
        <strong>Con el control</strong> — sin planeación, no hay estándares contra qué comparar. La
        retroalimentación del control mejora la siguiente planeación.
      </Resumen>
      <PorQue>
        La planeación es un <strong>proceso continuo</strong> que establece el rumbo y el contexto donde
        las demás funciones se realizan.
      </PorQue>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "La planeación es el proceso para:", o: [
          "ejecutar tareas",
          "determinar objetivos y desarrollar estrategias",
          "evaluar el desempeño individual",
          "auditar resultados",
        ], c: 1, ex: "Definición central de planeación." },
        { p: "Definir 'ser líderes del mercado en 5 años' es:", o: [
          "operativa", "táctica", "estratégica", "informal",
        ], c: 2, ex: "Largo plazo, dirección general = estratégica." },
        { p: "Programar las tareas semanales de un equipo es:", o: [
          "estratégica", "táctica", "operativa", "fiscal",
        ], c: 2, ex: "Corto plazo, día a día = operativa." },
        { p: "El proceso de planeación tiene:", o: [
          "3 etapas", "5 etapas", "7 etapas", "10 etapas",
        ], c: 1, ex: "Objetivos → evaluación → estrategias → implementación → control." },
        { p: "La planeación es importante porque:", o: [
          "evita crisis y optimiza recursos",
          "garantiza ganancias",
          "elimina los conflictos",
          "no requiere control",
        ], c: 0, ex: "Esos son dos de sus 4 grandes beneficios." },
      ]} />
    </EscenaRica>
  );
}
