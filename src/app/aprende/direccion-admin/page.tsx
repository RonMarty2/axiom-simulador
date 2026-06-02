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
        { titulo: "Concepto de dirección", componente: Esc01 },
        { titulo: "Motivación · intrínseca y extrínseca", componente: Esc02 },
        { titulo: "Comunicación", componente: Esc03 },
        { titulo: "Estilos de liderazgo", componente: Esc04 },
        { titulo: "Supervisión", componente: Esc05 },
        { titulo: "Coordinación", componente: Esc06 },
        { titulo: "Relación con las otras funciones", componente: Esc07 },
        { titulo: "Práctica final", componente: Esc08 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>Concepto de dirección</Titulo>
      <Definicion termino="dirección">
        Gestión diaria de las actividades organizacionales. Su objetivo es <strong>convertir los planes
        en acciones</strong> mediante la orientación del personal.
      </Definicion>
      <Parrafo>
        Su función no se limita a emitir órdenes. Busca la <strong>integración armónica</strong> entre
        recursos humanos y estrategias organizacionales.
      </Parrafo>
      <Resumen>
        La efectividad de la dirección depende de la habilidad del administrador para:<br />
        • Comunicarse<br />
        • Motivar al equipo<br />
        • Resolver conflictos<br />
        • Liderar con ejemplo
      </Resumen>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Motivación</Titulo>
      <Parrafo>
        Un trabajador motivado no solo cumple con sus responsabilidades — también <strong>aporta ideas
        y mejoras</strong>. La motivación es fundamental.
      </Parrafo>
      <Resumen>
        Dos tipos de factores motivacionales:<br /><br />
        <strong>Intrínsecos</strong> — impulsos internos: satisfacción personal, deseo de superación,
        propósito.<br /><br />
        <strong>Extrínsecos</strong> — recompensas externas: incentivos económicos, ascensos,
        reconocimientos.
      </Resumen>
      <PorQue>
        Las principales teorías de motivación que ya viste en la lección anterior (Maslow, Herzberg) son
        el marco para entender qué impulsa a cada empleado y adaptar las estrategias motivacionales.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>Comunicación</Titulo>
      <Parrafo>
        La comunicación garantiza que todos los miembros de la organización estén <strong>alineados con
        los objetivos</strong> y sepan qué se espera de ellos.
      </Parrafo>
      <Resumen>
        Tipos:<br /><br />
        <strong>Comunicación formal</strong> — instrucciones escritas, reuniones, memos. Sigue la
        estructura jerárquica.<br /><br />
        <strong>Comunicación informal</strong> — interacciones casuales, pasillos, chats. Surge
        espontáneamente.
      </Resumen>
      <Parrafo>
        Una comunicación eficaz no es solo <em>transmitir información</em>. Es también{" "}
        <strong>escuchar y brindar retroalimentación</strong>. Los gerentes deben adaptar su estilo
        según el receptor y el contexto.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Estilos de liderazgo</Titulo>
      <Definicion termino="liderazgo">
        Capacidad de <strong>influir</strong> en los colaboradores para que trabajen con entusiasmo
        hacia la consecución de las metas.
      </Definicion>
      <Resumen>
        <strong>Liderazgo autocrático</strong> — el líder decide solo, sin consultar. Útil en
        <em> emergencias</em>: la rapidez es vital.<br /><br />
        <strong>Liderazgo democrático</strong> — el líder fomenta la participación activa del equipo en
        las decisiones. Genera mayor compromiso y motivación.<br /><br />
        <strong>Liderazgo laissez-faire</strong> — libertad total al equipo. Útil cuando el equipo está
        altamente capacitado y es autónomo.
      </Resumen>
      <PorQue>
        No hay un estilo "mejor" universal: el liderazgo efectivo se adapta al equipo, al momento y al
        contexto. Incluye empatía, resolución de conflictos y capacidad de inspirar.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Supervisión</Titulo>
      <Definicion termino="supervisión">
        Seguimiento continuo del desempeño del equipo para garantizar que las tareas se cumplan según los
        estándares.
      </Definicion>
      <Parrafo>
        Permite identificar problemas o desviaciones en <strong>tiempo real</strong> y aplicar medidas
        correctivas inmediatas.
      </Parrafo>
      <Resumen>
        Una buena supervisión:<br />
        • <strong>Evita el microgestionamiento</strong> — promueve la autonomía.<br />
        • Es fuente constante de <strong>retroalimentación</strong>.<br />
        • Alimenta el proceso de control y la mejora continua.
      </Resumen>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Coordinación de los esfuerzos</Titulo>
      <Parrafo>
        La coordinación asegura que todas las partes de la organización <strong>trabajen
        armoniosamente</strong> hacia objetivos comunes. Implica la integración de áreas funcionales
        para evitar duplicidades.
      </Parrafo>
      <Resumen>
        La coordinación NO es solo responsabilidad de los niveles superiores. Debe darse en{" "}
        <strong>todos los niveles</strong>. Los gerentes deben fomentar la colaboración entre
        departamentos y asegurar que cada área entienda cómo su trabajo contribuye al éxito global.
      </Resumen>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Relación con las otras funciones</Titulo>
      <Resumen>
        <strong>Con la planeación</strong> — la dirección ejecuta los planes establecidos, alineando
        esfuerzos con los objetivos.<br /><br />
        <strong>Con la organización</strong> — la dirección se basa en la estructura para delegar
        tareas y asignar responsabilidades.<br /><br />
        <strong>Con la integración de personal</strong> — reclutar bien facilita el proceso de
        dirección. Un equipo competente es más fácil de gestionar.<br /><br />
        <strong>Con el control</strong> — la dirección proporciona retroalimentación constante al proceso
        de control y aplica las correcciones en tiempo real.
      </Resumen>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "El objetivo central de la dirección es:", o: [
          "controlar el dinero",
          "convertir planes en acciones a través de las personas",
          "hacer organigramas",
          "reclutar más gente",
        ], c: 1, ex: "Definición central de la guía." },
        { p: "Una recompensa económica externa es un motivador:", o: [
          "intrínseco", "extrínseco", "estructural", "subordinado",
        ], c: 1, ex: "Intrínseco viene de adentro (satisfacción). Extrínseco viene de afuera (plata)." },
        { p: "En una emergencia, el estilo más útil es típicamente:", o: [
          "laissez-faire", "democrático", "autocrático", "estratégico",
        ], c: 2, ex: "Por la rapidez requerida; el equipo no puede deliberar." },
        { p: "Microgestionar al equipo es:", o: [
          "supervisión eficiente",
          "señal de buena dirección",
          "un anti-patrón a evitar",
          "delegación clara",
        ], c: 2, ex: "Asfixia la autonomía y desmotiva. Se evita conscientemente." },
        { p: "La coordinación es responsabilidad de:", o: [
          "solo el CEO",
          "solo los gerentes",
          "todos los niveles de la organización",
          "solo RRHH",
        ], c: 2, ex: "Debe darse en cada nivel: el cuerpo entero coordina." },
      ]} />
    </EscenaRica>
  );
}
