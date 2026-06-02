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
      unidad="03"
      tituloUnidad="Conceptos fundamentales de la administración"
      escenas={[
        { titulo: "Habilidades del administrador", componente: Esc01 },
        { titulo: "Liderazgo y toma de decisiones", componente: Esc02 },
        { titulo: "Ética y RSE", componente: Esc03 },
        { titulo: "Gestión del cambio", componente: Esc04 },
        { titulo: "Retos: globalización y tecnología", componente: Esc05 },
        { titulo: "Sostenibilidad e innovación", componente: Esc06 },
        { titulo: "Productividad, eficacia, eficiencia", componente: Esc07 },
        { titulo: "Funciones gerenciales", componente: Esc08 },
        { titulo: "Práctica final", componente: Esc09 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>Habilidades del administrador</Titulo>
      <Parrafo>
        Robert Katz identificó tres habilidades clave que todo administrador necesita:
      </Parrafo>
      <Resumen>
        <strong>Técnicas</strong> — conocimientos específicos de tareas particulares (herramientas
        tecnológicas, procesos productivos, software).<br /><br />
        <strong>Humanas</strong> — interactuar eficazmente con otras personas: comunicación, empatía,
        negociación, trabajo en equipo.<br /><br />
        <strong>Conceptuales</strong> — comprender situaciones complejas, ver el panorama general y
        formular estrategias.
      </Resumen>
      <PorQue>
        A medida que un administrador sube en la jerarquía, las habilidades técnicas pesan menos y las
        conceptuales pesan más. Las humanas son cruciales en todos los niveles.
      </PorQue>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Liderazgo y toma de decisiones</Titulo>
      <Definicion termino="liderazgo">
        Capacidad de <strong>guiar equipos</strong> y motivar a empleados hacia el logro de los objetivos.
      </Definicion>
      <Definicion termino="toma de decisiones">
        Proceso de evaluar opciones, considerar consecuencias y <strong>seleccionar la acción más
        adecuada</strong> para enfrentar desafíos.
      </Definicion>
      <Parrafo>
        Las dos habilidades están entrelazadas: liderar bien es decidir bien y comunicar la decisión
        para que el equipo la siga.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Ética y Responsabilidad Social Empresarial (RSE)</Titulo>
      <Parrafo>
        Los administradores deben actuar con <strong>integridad y ética</strong>, promoviendo prácticas
        responsables que respeten los derechos humanos, el medio ambiente y las normativas legales.
      </Parrafo>
      <Definicion termino="RSE">
        Compromiso voluntario de la empresa con el bienestar de la sociedad y el medio ambiente, más
        allá de las obligaciones legales.
      </Definicion>
      <PorQue>
        La RSE se ha vuelto <strong>crucial para construir reputación</strong> y generar confianza con
        los stakeholders (clientes, empleados, inversores, comunidad).
      </PorQue>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Gestión del cambio</Titulo>
      <Parrafo>
        En un entorno empresarial en constante evolución, los administradores deben ser capaces de
        gestionar el cambio de manera efectiva.
      </Parrafo>
      <Resumen>
        Esto incluye:<br />
        • <strong>Anticipar</strong> cambios externos.<br />
        • <strong>Planificar</strong> transiciones.<br />
        • <strong>Comunicar</strong> con claridad.<br />
        • <strong>Apoyar</strong> a los empleados durante la adaptación.
      </Resumen>
      <Cuidado>
        El cambio sin gestión genera ansiedad, resistencia y pérdida de productividad. Por eso esta
        habilidad se volvió tan crítica.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Globalización y tecnología</Titulo>
      <Parrafo>
        Dos retos enormes que enfrenta la administración hoy:
      </Parrafo>
      <Resumen>
        <strong>Globalización</strong> — más oportunidades de negocio, pero también más complejidad:
        diversidad cultural, diferencias legales, competencia global. Requiere habilidades
        interculturales.<br /><br />
        <strong>Tecnología y digitalización</strong> — exige adoptar nuevas herramientas y procesos
        digitales para mantener la competitividad. Afecta todas las áreas: datos, comunicación,
        marketing.
      </Resumen>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Sostenibilidad e innovación</Titulo>
      <Resumen>
        <strong>Sostenibilidad y gestión ambiental</strong> — integrar la sostenibilidad en la
        estrategia, gestionar el impacto ambiental, cumplir regulaciones ecológicas.<br /><br />
        <strong>Innovación y emprendimiento</strong> — fomentar una cultura de creatividad, apoyar
        iniciativas emprendedoras y gestionar el desarrollo de nuevos productos y servicios.
      </Resumen>
      <PorQue>
        La innovación es clave para el crecimiento y la diferenciación. Sin innovación, una empresa
        envejece y pierde mercado frente a competidores más ágiles.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Productividad, eficacia y eficiencia</Titulo>
      <Definicion termino="productividad">
        Cociente <strong>producción / insumos</strong> dentro de un período, considerando la calidad.
      </Definicion>
      <Resumen>
        La productividad mejora por tres caminos:<br /><br />
        <strong>1.</strong> Aumentar la producción con los mismos insumos.<br />
        <strong>2.</strong> Reducir los insumos manteniendo la producción.<br />
        <strong>3.</strong> Aumentar producción y reducir insumos a la vez.
      </Resumen>
      <Definicion termino="efectividad">
        Logro de <strong>objetivos</strong>. Lograr lo que se quiso lograr.
      </Definicion>
      <Definicion termino="eficiencia">
        Alcanzar los fines con el <strong>mínimo de recursos</strong>.
      </Definicion>
      <Cuidado>
        Una empresa puede ser <strong>eficaz e ineficiente</strong>: logra metas pero gastando de más.
        La buena administración busca ser eficaz Y eficiente.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <Titulo>Las 5 funciones gerenciales (recordatorio)</Titulo>
      <Parrafo>
        Toda nueva idea o técnica de administración cabe en una de las 5 funciones gerenciales:
      </Parrafo>
      <Resumen>
        <strong>Planear</strong> — elegir misiones, objetivos y acciones. Un plan REAL existe solo
        cuando se toma una decisión y se comprometen recursos.<br /><br />
        <strong>Organizar</strong> — establecer una <strong>estructura intencional de funciones</strong>.
        Que cada persona aporte algo específico al esfuerzo del grupo.<br /><br />
        <strong>Integrar personal</strong> — cubrir y mantener cubiertos los puestos. Reclutar,
        seleccionar, evaluar, capacitar.<br /><br />
        <strong>Dirigir</strong> — influir en las personas para que contribuyan a las metas. Liderazgo,
        motivación y comunicación.<br /><br />
        <strong>Controlar</strong> — medir y corregir el desempeño para asegurar que los hechos se
        ajusten a los planes.
      </Resumen>
    </EscenaRica>
  );
}

function Esc09() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Las 3 habilidades del administrador son:", o: [
          "comerciales, financieras, técnicas",
          "técnicas, humanas, conceptuales",
          "estratégicas, tácticas, operativas",
          "públicas, privadas, mixtas",
        ], c: 1, ex: "Katz: técnicas, humanas y conceptuales." },
        { p: "Eficacia significa:", o: [
          "lograr el objetivo",
          "hacerlo con pocos recursos",
          "ser puntual",
          "tener buena imagen",
        ], c: 0, ex: "Eficacia = lograr el fin. Eficiencia = hacerlo con mínimos recursos." },
        { p: "Para mejorar la productividad puedo:", o: [
          "solo reducir insumos",
          "solo aumentar producción",
          "aumentar producción y/o reducir insumos",
          "ningún cambio",
        ], c: 2, ex: "Tres caminos posibles, no excluyentes." },
        { p: "La RSE se refiere a:", o: [
          "Recaudación Social del Estado",
          "Responsabilidad Social Empresarial",
          "Rentabilidad sobre acciones",
          "Reducción de Servicios Externos",
        ], c: 1, ex: "Práctica voluntaria de la empresa con la sociedad y el ambiente." },
        { p: "Drucker dice que la mayor oportunidad de mejora de productividad está en:", o: [
          "los obreros",
          "los equipos",
          "el conocimiento del trabajo, en especial la administración",
          "los financieros",
        ], c: 2, ex: "Cita textual de la guía: lo dijo el padre de la gerencia moderna." },
      ]} />
    </EscenaRica>
  );
}
