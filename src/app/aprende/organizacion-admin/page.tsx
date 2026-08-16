"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
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
        { titulo: "Qué es organizar", componente: Esc01 },
        { titulo: "Los 4 principios", componente: Esc02 },
        { titulo: "Tipos de organización", componente: Esc03 },
        { titulo: "Departamentalización", componente: Esc04 },
        { titulo: "Delegación y descentralización", componente: Esc05 },
        { titulo: "Estructura formal e informal", componente: Esc06 },
        { titulo: "Coordinación y adaptación", componente: Esc07 },
        { titulo: "Práctica final", componente: Esc08 },
      ]}
    />
  );
}

// Organigrama interactivo: muestra estructura jerárquica con 4 niveles.
function OrganigramaSVG() {
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 480 260"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Dirección */}
          <motion.rect x="190" y="20" width="100" height="40" rx="8"
            fill={LIENZO.accent} fillOpacity="0.18" stroke={LIENZO.accent} strokeWidth="2"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
          <text x="240" y="45" textAnchor="middle" fontSize="13" fill={LIENZO.accent} fontWeight="700">Dirección</text>

          {/* Líneas a Gerencias */}
          <line x1="240" y1="60" x2="240" y2="80" stroke={LIENZO.fg} strokeWidth="1.5" />
          <line x1="120" y1="80" x2="360" y2="80" stroke={LIENZO.fg} strokeWidth="1.5" />
          <line x1="120" y1="80" x2="120" y2="100" stroke={LIENZO.fg} strokeWidth="1.5" />
          <line x1="240" y1="80" x2="240" y2="100" stroke={LIENZO.fg} strokeWidth="1.5" />
          <line x1="360" y1="80" x2="360" y2="100" stroke={LIENZO.fg} strokeWidth="1.5" />

          {/* Gerencias */}
          {[{ x: 70, lbl: "Ventas" }, { x: 190, lbl: "Producción" }, { x: 310, lbl: "Finanzas" }].map((g, i) => (
            <g key={g.lbl}>
              <motion.rect x={g.x} y={100} width={100} height={36} rx={7}
                fill={LIENZO.ok} fillOpacity={0.16} stroke={LIENZO.ok} strokeWidth={1.5}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.25 + i * 0.1 }} />
              <text x={g.x + 50} y={122} textAnchor="middle" fontSize={12} fill={LIENZO.ok} fontWeight={600}>{g.lbl}</text>
            </g>
          ))}

          {/* Equipos bajo cada gerencia */}
          {[{ x: 70, n: "Eq. comercial" }, { x: 190, n: "Eq. fabril" }, { x: 310, n: "Eq. contable" }].map((e, i) => (
            <g key={e.n}>
              <line x1={e.x + 50} y1={136} x2={e.x + 50} y2={160} stroke={LIENZO.fg} strokeWidth="1" />
              <motion.rect x={e.x + 5} y={160} width={90} height={32} rx={6}
                fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.55 + i * 0.1 }} />
              <text x={e.x + 50} y={180} textAnchor="middle" fontSize={11} fill={LIENZO.fgDim}>{e.n}</text>
            </g>
          ))}
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgDim, marginTop: 6 }}>
        Organigrama típico de 3 niveles · estructura intencional de funciones.
      </div>
    </div>
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es organizar?</Titulo>
      <Definicion termino="organización">
        Proceso estructural que permite <strong>agrupar y coordinar</strong> las actividades y recursos
        para alcanzar los objetivos de la empresa. Implica definir <strong>funciones, jerarquías y
        relaciones</strong> entre unidades de trabajo.
      </Definicion>
      <Hook>
        Es la <strong>O</strong> de POIDC. Sin organización, una empresa con 10 personas es un caos:
        nadie sabe a quién reportar, hay tareas duplicadas y otras sin dueño. Una buena estructura
        convierte 10 individuos en un equipo.
      </Hook>
      <Parrafo>
        Organizar no es solo "dividir tareas". También es <strong>alinear esfuerzos</strong> y optimizar
        recursos humanos, financieros y materiales en un marco colaborativo.
      </Parrafo>
      <OrganigramaSVG />
      <Misconception titulo="Organizar ≠ hacer un organigrama bonito">
        Mucha gente cree que "organizar" termina cuando dibujás el organigrama. Falso. El organigrama
        es el resultado <em>visible</em>, pero organizar implica definir <strong>qué hace cada
        puesto, con qué autoridad y con qué recursos</strong>. Un organigrama sin descripciones de
        puesto no organiza nada.
      </Misconception>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Los 4 principios esenciales</Titulo>
      <Resumen>
        <strong>1. Unidad de mando</strong>: cada subordinado recibe órdenes de UN solo superior. Evita
        confusión y duplicidad.<br /><br />
        <strong>2. Especialización</strong>: la división del trabajo permite que los empleados se
        concentren en tareas específicas. Aumenta eficiencia y productividad.<br /><br />
        <strong>3. Jerarquía</strong>: cadena de mando clara, asegurando que las decisiones fluyan
        desde la dirección hacia los niveles operativos.<br /><br />
        <strong>4. Amplitud de control</strong>: cuántos subordinados puede supervisar eficazmente un
        gerente.
      </Resumen>

      <Mnemotecnia>
        <strong>"U-E-J-A"</strong>: los 4 principios en orden:<br />
        <strong>U</strong>nidad de mando · <strong>E</strong>specialización ·
        <strong> J</strong>erarquía · <strong>A</strong>mplitud de control.<br /><br />
        Frase: <em>"Una Estructura Justa Aclara"</em>.
      </Mnemotecnia>

      <WorkedExample titulo="Amplitud de control · ¿cuántos pueden depender de un jefe?">
        Un jefe puede supervisar bien a entre <strong>5 y 15 personas</strong> según el tipo de trabajo:<br /><br />
        • Trabajo <strong>rutinario</strong> (línea de producción, call center): hasta 20-30 personas
        por supervisor.<br />
        • Trabajo <strong>complejo</strong> (desarrollo de software, investigación): solo 4-6 personas
        por supervisor.<br /><br />

        <strong>Ejemplo numérico:</strong> empresa de 100 personas.<br />
        • Si la amplitud es 5 → necesitás <em>100/5 = 20 supervisores</em>, más 4 gerentes
        (20/5), más 1 director. Total: ~125 personas. <strong>Estructura ALTA</strong>.<br />
        • Si la amplitud es 10 → necesitás <em>100/10 = 10 supervisores</em>, más 1 director. Total:
        ~111 personas. <strong>Estructura PLANA</strong>.<br /><br />

        Las estructuras planas son más ágiles pero exigen empleados autónomos. Las altas dan más
        control pero generan burocracia.
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>Tipos de organización</Titulo>
      <Resumen>
        <strong>Funcional</strong>: agrupa tareas por funciones específicas (ventas, finanzas,
        producción). La más común.<br /><br />
        <strong>Por productos</strong>: divide la empresa según las líneas de productos o servicios.<br /><br />
        <strong>Geográfica</strong>: basada en la ubicación geográfica. Común en multinacionales.<br /><br />
        <strong>Matricial</strong>: combina funcional con organización por proyectos. Da flexibilidad
        pero crea desafíos de coordinación (dos jefes a la vez).
      </Resumen>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Departamentalización</Titulo>
      <Definicion termino="departamentalización">
        Técnica para agrupar actividades relacionadas en <strong>unidades específicas</strong>.
      </Definicion>
      <Resumen>
        Criterios típicos:<br />
        • <strong>Por función</strong>: cada departamento, una actividad (producción, ventas).<br />
        • <strong>Por producto</strong>: según la línea ofrecida.<br />
        • <strong>Por clientes</strong>: orientada a tipos de cliente o mercado.<br />
        • <strong>Por zona geográfica</strong>: según la región donde opera.
      </Resumen>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Delegación y descentralización</Titulo>
      <Definicion termino="delegación">
        Asignar responsabilidades a los subordinados junto con la <strong>autoridad necesaria</strong>
        para cumplirlas.
      </Definicion>
      <Definicion termino="descentralización">
        Distribución del poder de decisión desde los niveles superiores hacia los más bajos.
      </Definicion>
      <Cuidado>
        La descentralización <strong>no se aplica igual en todas las organizaciones</strong>. Su grado
        depende de la naturaleza de la empresa, su tamaño y la capacidad de los empleados.
      </Cuidado>

      <Misconception titulo="Delegar ≠ tirar el problema y desentenderse">
        Delegar no es "yo no quiero hacer esto, hacelo vos". El jefe que delega <strong>conserva la
        responsabilidad final</strong>: si el subordinado falla, el jefe responde. Por eso delegás
        autoridad junto con la responsabilidad: y mantenés seguimiento.
      </Misconception>

      <CasoBolivia>
        <strong>Tigo Bolivia</strong> es una empresa con alta descentralización: los gerentes
        regionales de La Paz, Cochabamba y Santa Cruz tienen autoridad para promociones locales,
        contratación, ajustes de precio.<br /><br />
        En cambio, <strong>YPFB Refinación</strong> es muy centralizada: las decisiones de precio,
        producción y contratación se toman desde la matriz en La Paz. La diferencia tiene sentido:
        comercializar internet exige respuestas rápidas locales; refinar combustibles exige
        estandarización absoluta.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Estructura formal e informal</Titulo>
      <Definicion termino="estructura formal">
        La organización planificada <strong>oficialmente</strong>, con procedimientos y políticas claras.
        Es lo que el organigrama muestra.
      </Definicion>
      <Definicion termino="estructura informal">
        Surge <strong>espontáneamente</strong> entre los empleados. Puede influir positiva o
        negativamente en la toma de decisiones y el ambiente laboral.
      </Definicion>
      <PorQue>
        Un buen administrador <strong>conoce la estructura informal</strong> y la considera al tomar
        decisiones. Ignorarla es trabajar contra ella.
      </PorQue>

      <Misconception titulo="La estructura informal NO es 'mala'">
        Algunos creen que la estructura informal (amistades, redes de chisme, alianzas) es algo
        negativo que hay que eliminar. Es IMPOSIBLE de eliminar: surge sola siempre. Lo que hay
        que hacer es entenderla y aprovechar sus líderes naturales para difundir cambios.
      </Misconception>

      <Conexion>
        Esta unidad es la <strong>O</strong> de POIDC. Sin estructura definida acá, la siguiente
        función (<strong>I</strong>ntegración de personal) no sabe qué puestos llenar, y la
        <strong> D</strong>irección no sabe a quién dirigir.
      </Conexion>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Coordinación, control y adaptación</Titulo>
      <Resumen>
        <strong>Coordinación de actividades</strong>: asegurar que los departamentos trabajen
        alineados. Se logra con reuniones, sistemas de comunicación y tecnología adecuada.<br /><br />
        <strong>Control organizacional</strong>: mecanismos para verificar que las actividades se
        realicen según los planes. Detección de desviaciones en tiempo real.<br /><br />
        <strong>Adaptación y cambio</strong>: las organizaciones deben ser <strong>flexibles</strong> para
        responder a nuevas tecnologías o cambios del mercado. La capacidad de innovar y adaptarse rápido
        es clave para el éxito.
      </Resumen>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Cada subordinado tiene UN solo superior. Este principio es:", o: [
          "jerarquía", "unidad de mando", "amplitud de control", "especialización",
        ], c: 1, ex: "Principio 1 de la organización." },
        { p: "Una empresa que organiza sus áreas por funciones (ventas, finanzas, producción) usa estructura:", o: [
          "matricial", "funcional", "por producto", "por geografía",
        ], c: 1, ex: "La forma más común." },
        { p: "La descentralización implica:", o: [
          "centralizar más decisiones",
          "distribuir el poder de decisión a niveles más bajos",
          "auditar a los gerentes",
          "eliminar la jerarquía",
        ], c: 1, ex: "Implica delegación junto con la autoridad necesaria." },
        { p: "El organigrama refleja la estructura:", o: [
          "informal", "formal", "matricial siempre", "espontánea",
        ], c: 1, ex: "La estructura formal: la planeada oficialmente." },
        { p: "La estructura informal:", o: [
          "no debe considerarse",
          "siempre es positiva",
          "surge espontáneamente y puede afectar las decisiones",
          "la define el dueño",
        ], c: 2, ex: "Existe sí o sí. Hay que conocerla y manejarla." },
      ]} />
    </EscenaRica>
  );
}
