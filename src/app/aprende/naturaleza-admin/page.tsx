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
      unidad="03"
      tituloUnidad="Conceptos fundamentales de la administración"
      escenas={[
        { titulo: "Qué es la administración", componente: Esc01 },
        { titulo: "Importancia en las organizaciones", componente: Esc02 },
        { titulo: "Administración vs. gestión", componente: Esc03 },
        { titulo: "Los 3 niveles", componente: Esc04 },
        { titulo: "Concepto de empresa y tipos", componente: Esc05 },
        { titulo: "La empresa como sistema abierto", componente: Esc06 },
        { titulo: "Recursos del sistema", componente: Esc07 },
        { titulo: "Empresa y su entorno", componente: Esc08 },
        { titulo: "Práctica final", componente: Esc09 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es la administración?</Titulo>
      <Definicion termino="administración">
        Proceso que implica <strong>planificar, organizar, integrar personal, dirigir y controlar</strong>
        los recursos de una organización para alcanzar objetivos específicos de manera <strong>eficiente
        y eficaz</strong>.
      </Definicion>
      <Parrafo>
        Es una disciplina fundamental en las ciencias sociales aplicadas. Proporciona las herramientas y
        técnicas para gestionar organizaciones de cualquier sector: empresas, ONG, instituciones
        públicas, equipos deportivos, hospitales.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Importancia en las organizaciones</Titulo>
      <Parrafo>
        La administración es vital para el éxito de cualquier organización porque:
      </Parrafo>
      <Resumen>
        • Asegura la <strong>utilización óptima</strong> de los recursos.<br />
        • Facilita la <strong>coordinación</strong> entre departamentos.<br />
        • Fomenta la <strong>innovación</strong> y la adaptación al entorno cambiante.<br />
        • Contribuye al logro de <strong>metas</strong> a corto y largo plazo.
      </Resumen>
      <Cuidado>
        Sin administración efectiva, las organizaciones enfrentan ineficiencias, desmotivación del
        personal y dificultades para competir.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>Administración vs. gestión</Titulo>
      <Parrafo>
        Aunque a menudo se usan como sinónimos, son conceptualmente distintas:
      </Parrafo>
      <Resumen>
        <strong>Administración</strong> — diseña y planifica las estrategias. Define el <strong>QUÉ</strong> y
        el <strong>POR QUÉ</strong>.<br /><br />
        <strong>Gestión</strong> — implementa y ejecuta esas estrategias. Define el <strong>CÓMO</strong>.
      </Resumen>
      <Ejemplo>
        Administración: "este año queremos abrir 3 nuevas sucursales para captar el mercado del sur".<br />
        Gestión: "Pedro coordina la apertura, María contrata al personal, el equipo de marketing lanza la
        campaña".
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Los 3 niveles de administración</Titulo>
      <Resumen>
        <strong>1. Administración estratégica</strong> — largo plazo. Define visión, misión y objetivos
        generales. Analiza entorno externo e interno. La hace la alta dirección.<br /><br />
        <strong>2. Administración táctica</strong> — corto y mediano plazo. Implementa las estrategias
        del nivel anterior. Coordina recursos. La hacen gerencias de nivel medio.<br /><br />
        <strong>3. Administración operativa</strong> — actividades diarias y tareas rutinarias. Garantiza
        la eficiencia en la producción de bienes y servicios.
      </Resumen>
      <PorQue>
        Los tres niveles trabajan en cascada: lo estratégico decide a dónde vamos, lo táctico decide
        cómo llegamos en concreto, lo operativo lo hace.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Concepto de empresa</Titulo>
      <Definicion termino="empresa">
        Entidad organizada que combina recursos <strong>humanos, financieros, tecnológicos y materiales</strong>
        para producir bienes o servicios, satisfacer necesidades del mercado y generar beneficios.
      </Definicion>
      <Resumen>
        <strong>Tipos de empresas:</strong><br /><br />
        • <strong>Públicas</strong> — propiedad del Estado, orientadas al servicio público.<br />
        • <strong>Privadas</strong> — propiedad de individuos o grupos privados con fines de lucro.<br />
        • <strong>Mixtas</strong> — combinan capital público y privado.<br />
        • <strong>Multinacionales</strong> — operan en múltiples países, aprovechando ventajas globales.
      </Resumen>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>La empresa como sistema abierto</Titulo>
      <Definicion termino="sistema abierto">
        Una organización es un sistema abierto porque <strong>interactúa continuamente con su entorno</strong>:
        recibe insumos, los transforma internamente y devuelve productos o servicios.
      </Definicion>
      <Parrafo>
        Esa interacción implica que las empresas deben <strong>adaptarse</strong> a cambios en factores
        económicos, sociales, tecnológicos y legales para mantener su competitividad y sostenibilidad.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Recursos del sistema empresarial</Titulo>
      <Resumen>
        <strong>Recursos humanos</strong> — el personal. Su gestión eficaz es crucial.<br /><br />
        <strong>Recursos financieros</strong> — capital para operar, invertir y expandirse.<br /><br />
        <strong>Recursos tecnológicos</strong> — herramientas y tecnologías que mejoran la productividad.<br /><br />
        <strong>Recursos materiales</strong> — insumos físicos utilizados en la producción.
      </Resumen>
      <PorQue>
        La <strong>interrelación</strong> entre estos cuatro componentes determina la capacidad de la
        empresa para alcanzar sus objetivos. Ningún recurso, solo, logra nada.
      </PorQue>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <Titulo>La empresa y su entorno</Titulo>
      <Parrafo>
        La empresa <strong>no opera en aislamiento</strong>. Está influenciada por factores externos:
      </Parrafo>
      <Resumen>
        • Economía (PIB, inflación, tipo de cambio).<br />
        • Competencia (otras empresas del sector).<br />
        • Regulaciones gubernamentales.<br />
        • Tendencias culturales y tecnológicas.
      </Resumen>
      <Cuidado>
        Una gestión efectiva implica <strong>monitorear</strong> estos factores, <strong>anticipar</strong>
        cambios y <strong>adaptar</strong> estrategias para minimizar riesgos y aprovechar oportunidades.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc09() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Las funciones administrativas básicas son:", o: [
          "planificar y vender",
          "planificar, organizar, integrar personal, dirigir, controlar",
          "ganar dinero",
          "auditar, registrar, publicar",
        ], c: 1, ex: "5 funciones que veremos en detalle en la Unidad 4." },
        { p: "Decir 'qué y por qué' corresponde a:", o: [
          "gestión", "administración", "ejecución", "supervisión",
        ], c: 1, ex: "Administración = diseño. Gestión = ejecución (cómo)." },
        { p: "Las decisiones de largo plazo y visión corresponden al nivel:", o: [
          "operativo", "táctico", "estratégico", "logístico",
        ], c: 2, ex: "Visión, misión, objetivos generales = nivel estratégico." },
        { p: "Una empresa de capital público + privado se llama:", o: [
          "pública", "mixta", "multinacional", "privada",
        ], c: 1, ex: "Mixtas combinan ambas fuentes de capital." },
        { p: "La empresa como sistema ABIERTO significa que:", o: [
          "todos pueden entrar a trabajar",
          "interactúa permanentemente con su entorno",
          "no tiene jefes",
          "publica sus estados financieros",
        ], c: 1, ex: "Recibe insumos, transforma, devuelve productos. Y se adapta al entorno." },
      ]} />
    </EscenaRica>
  );
}
