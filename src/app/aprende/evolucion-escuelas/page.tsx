"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, Misconception, Mnemotecnia, Conexion,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="Conceptos fundamentales de la administración"
      escenas={[
        { titulo: "De la antigüedad al siglo XX", componente: Esc01 },
        { titulo: "La Revolución Industrial", componente: Esc02 },
        { titulo: "Taylor · Administración científica", componente: Esc03 },
        { titulo: "Fayol · Los 14 principios", componente: Esc04 },
        { titulo: "Mayo · Relaciones humanas", componente: Esc05 },
        { titulo: "Escuela de sistemas", componente: Esc06 },
        { titulo: "Escuela contemporánea", componente: Esc07 },
        { titulo: "Práctica final", componente: Esc08 },
      ]}
    />
  );
}

// Listado interactivo de los 14 principios de Fayol
function CatorcePrincipios() {
  const principios = [
    { n: 1, t: "División del trabajo", e: "Una fábrica con líneas separadas: motor, carrocería, eléctrica." },
    { n: 2, t: "Autoridad y responsabilidad", e: "El gerente decide PERO también responde por los resultados." },
    { n: 3, t: "Disciplina", e: "Código de conducta y normas de comportamiento." },
    { n: 4, t: "Unidad de mando", e: "Cada empleado, un solo jefe directo." },
    { n: 5, t: "Unidad de dirección", e: "Un solo plan; todos los departamentos hacia los mismos objetivos." },
    { n: 6, t: "Subordinación del interés individual al general", e: "Aceptar tareas no preferidas si benefician a la empresa." },
    { n: 7, t: "Remuneración del personal", e: "Compensación justa y motivadora; bonificaciones por metas." },
    { n: 8, t: "Centralización", e: "Equilibrio entre autoridad central y autonomía local." },
    { n: 9, t: "Jerarquía", e: "Cadena de mando clara, como en una organización militar." },
    { n: 10, t: "Orden", e: "Recursos y personas organizados; cada cosa en su lugar." },
    { n: 11, t: "Equidad", e: "Justicia e imparcialidad al asignar responsabilidades." },
    { n: 12, t: "Estabilidad del personal", e: "Minimizar rotación; retener talento clave." },
    { n: 13, t: "Iniciativa", e: "Permitir y premiar nuevas ideas de los empleados." },
    { n: 14, t: "Espíritu de equipo", e: "Promover cohesión y colaboración entre los miembros." },
  ];
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4,
        marginBottom: 12,
      }}>
        {principios.map((p) => (
          <button key={p.n} onClick={() => setSel(p.n === sel ? null : p.n)}
            style={{
              width: "100%", aspectRatio: "1", border: "none",
              borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer",
              fontFamily: "var(--font-crimson), serif",
              background: sel === p.n ? LIENZO.accent : LIENZO.bgSoft,
              color: sel === p.n ? "#fff" : LIENZO.fg,
              transition: "all 0.2s",
            }}>{p.n}</button>
        ))}
      </div>
      {sel !== null && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "12px 16px", border: `1.5px solid ${LIENZO.accent}`,
            borderRadius: 12, background: `${LIENZO.accent}10`,
          }}>
          <div style={{ fontSize: 11, color: LIENZO.accent, fontWeight: 700, letterSpacing: 1.2 }}>
            PRINCIPIO {sel}
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, color: LIENZO.fg, marginTop: 4 }}>
            {principios[sel - 1].t}
          </div>
          <div style={{ fontSize: 13, color: LIENZO.fgDim, marginTop: 4 }}>
            {principios[sel - 1].e}
          </div>
        </motion.div>
      )}
      <div style={{ textAlign: "center", fontSize: 12, color: LIENZO.fgFaint, fontStyle: "italic", marginTop: 8 }}>
        Toca cualquier número para ver el principio.
      </div>
    </div>
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>De la antigüedad al siglo XX</Titulo>
      <Parrafo>
        Las sociedades necesitaron organizarse desde siempre. La administración no es invención del
        siglo XX:
      </Parrafo>
      <Resumen>
        <strong>Egipto</strong>: organización de obras públicas (pirámides) y gestión de cultivos.<br /><br />
        <strong>Grecia y Roma</strong>: conceptos de liderazgo, organización militar y administración
        pública que sentaron las bases.
      </Resumen>
      <PorQue>
        Lo nuevo en el siglo XX no es la práctica, sino su <strong>sistematización como teoría
        científica</strong>. Eso es lo que estudiarás aquí.
      </PorQue>

      <Hook>
        El examen UMSS pregunta MUCHO sobre los <strong>4 autores clave</strong> de esta unidad:
        Taylor, Fayol, Mayo y la escuela contemporánea. Asociar cada nombre con su idea central
        es lo único que necesitas.
      </Hook>

      <Mnemotecnia>
        <strong>"T-F-M-S-C" · 5 escuelas en orden cronológico</strong>:<br />
        <strong>T</strong>aylor (1911): <em>científica</em>: estandarización.<br />
        <strong>F</strong>ayol (1916): <em>clásica</em>: 14 principios + funciones.<br />
        <strong>M</strong>ayo (1930s): <em>relaciones humanas</em>: efecto Hawthorne.<br />
        <strong>S</strong>istemas (1950s): empresa como sistema abierto.<br />
        <strong>C</strong>ontingencia/calidad/caos (1970+): adaptación al contexto.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>La Revolución Industrial</Titulo>
      <Parrafo>
        La Revolución Industrial (siglos XVIII–XIX) transformó la producción y la economía: la
        producción <strong>masiva</strong> y las grandes organizaciones impusieron una nueva necesidad:         métodos eficientes de gestión.
      </Parrafo>
      <Resumen>
        De ahí surgen las teorías y escuelas administrativas, todas tratando de responder: <strong>¿cómo
        gestionar grandes organizaciones de forma eficiente?</strong>
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Taylor · La administración científica</Titulo>
      <Parrafo>
        <strong>Frederick Winslow Taylor</strong>, padre de la administración científica. Pasó de
        aprendiz a ingeniero en jefe en una acería, lo que le dio una mirada completa: del obrero al
        gerente.
      </Parrafo>
      <Definicion termino="administración científica">
        Optimización de tareas y eficiencia laboral a través de la <strong>estandarización</strong> y el
        <strong> análisis científico del trabajo</strong>.
      </Definicion>
      <Resumen>
        En 1911 publica "Los Principios de la Administración Científica". Sus 5 principios fundamentales:<br /><br />
        <strong>1.</strong> Reemplazar reglas impositivas con ciencia.<br />
        <strong>2.</strong> Armonía en la acción de grupo, más que discordia.<br />
        <strong>3.</strong> Cooperación humana, más que individualismo caótico.<br />
        <strong>4.</strong> Trabajar para la máxima producción, más que producción restringida.<br />
        <strong>5.</strong> Desarrollar a todos los trabajadores al mayor grado posible.
      </Resumen>

      <Misconception titulo="Taylor ≠ 'explotador de obreros'">
        El cliché dice que Taylor era inhumano por cronometrar a los obreros. Es injusto: Taylor
        buscaba <strong>aumentar el bienestar del obrero</strong> a través del aumento de
        productividad. Su error fue NO considerar los factores sociales (eso vino con Mayo). Pero
        la estandarización de procesos sigue vigente: la usas cada vez que haces "checklist".
      </Misconception>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Fayol · Los 14 principios de la administración</Titulo>
      <Parrafo>
        El francés <strong>Henri Fayol</strong> es considerado el verdadero padre de la teoría
        administrativa moderna. Identificó 14 principios flexibles (no absolutos) que siguen vigentes.
      </Parrafo>
      <CatorcePrincipios />
      <PorQue>
        Fayol también definió las funciones administrativas básicas: <strong>planificación, organización,
        dirección, coordinación y control</strong>. Es la base de lo que viste en la lección anterior.
      </PorQue>

      <Conexion>
        Las funciones administrativas que Fayol definió (planear, organizar, dirigir, controlar)
        son exactamente las que estudias en POIDC en las unidades de Bloque 1 Unidad 4. Fayol
        es el padre del modelo POIDC que sigue vigente 100 años después.
      </Conexion>

      <Misconception titulo="Los 14 principios NO son una receta absoluta">
        Fayol los llamó "principios flexibles", no leyes. Algunos pierden vigencia en
        organizaciones modernas: "Unidad de mando" no encaja en estructuras matriciales donde
        un empleado responde a 2 jefes (producto + función). En el examen, sin embargo, valen
        como están enunciados.
      </Misconception>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Mayo · Escuela de Relaciones Humanas</Titulo>
      <Parrafo>
        <strong>Elton Mayo</strong> y Roethlisberger, en los famosos experimentos de Hawthorne (Western
        Electric, 1927–1932), descubrieron algo inesperado.
      </Parrafo>
      <Ejemplo titulo="El experimento de Hawthorne">
        Investigaban si cambiar la iluminación afectaba la productividad. Para su sorpresa, la
        productividad mejoraba <strong>aumentando o disminuyendo</strong> la luz. Iban a declararlo un
        fracaso, pero Mayo vio otra cosa: <strong>la productividad subía porque los obreros se sentían
        observados y valorados</strong>.
      </Ejemplo>
      <Definicion termino="efecto Hawthorne">
        El simple hecho de que las personas <strong>sean notadas</strong> mejora su desempeño.
      </Definicion>
      <Resumen>
        Mayo demostró que la productividad depende de factores sociales: <strong>moral, relaciones
        satisfactorias entre los miembros del grupo</strong> (sentido de pertenencia) y administración
        atenta al comportamiento humano.
      </Resumen>

      <Conexion>
        El efecto Hawthorne conecta directamente con las <strong>teorías de motivación</strong>
        que viste en Integración de Personal (Maslow, Herzberg, McGregor). Mayo fue el primero
        que demostró científicamente que las personas no son máquinas: abrió el camino a toda
        la psicología organizacional moderna.
      </Conexion>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Escuela de Sistemas</Titulo>
      <Definicion termino="enfoque de sistemas">
        Ve a la organización como un <strong>sistema abierto</strong> que interactúa con su entorno.
      </Definicion>
      <Resumen>
        Destaca:<br />
        • La <strong>interdependencia</strong> entre departamentos.<br />
        • La importancia de la <strong>adaptación y flexibilidad</strong> organizacional.<br />
        • El entorno como factor crítico, no como ruido externo.
      </Resumen>
      <PorQue>
        Es un salto conceptual: la empresa deja de verse como una máquina cerrada (Taylor) y pasa a
        verse como un organismo vivo que responde y se adapta.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Escuela contemporánea</Titulo>
      <Parrafo>
        Incluye diversas teorías que abordan la complejidad de las organizaciones modernas:
      </Parrafo>
      <Resumen>
        • <strong>Teoría del caos</strong>: pequeñas variaciones generan grandes efectos.<br />
        • <strong>Teoría de la contingencia</strong>: no hay receta única; depende del contexto.<br />
        • <strong>Calidad total</strong>: mejora continua centrada en el cliente.<br />
        • <strong>Gestión del conocimiento</strong>: el saber como activo estratégico.
      </Resumen>
      <Cuidado>
        Estos enfoques reconocen la <strong>dinámica y la incertidumbre</strong> del entorno empresarial
        actual. No buscan reglas absolutas, sino marcos para decidir mejor en cada caso.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "El padre de la administración científica fue:", o: [
          "Fayol", "Mayo", "Taylor", "Drucker",
        ], c: 2, ex: "Taylor, con su obra 'Principios de la Administración Científica' (1911)." },
        { p: "Quien estableció las funciones administrativas y los 14 principios fue:", o: [
          "Taylor", "Fayol", "Mintzberg", "Mayo",
        ], c: 1, ex: "Henri Fayol, industrial francés." },
        { p: "El experimento de Hawthorne demostró que la productividad depende de:", o: [
          "la iluminación",
          "los incentivos económicos",
          "factores sociales y reconocimiento",
          "el tipo de máquina",
        ], c: 2, ex: "Lo descubrió Elton Mayo: efecto Hawthorne." },
        { p: "Decir 'no hay receta universal: depende del contexto' es la idea de:", o: [
          "Taylor",
          "Escuela de relaciones humanas",
          "Teoría de la contingencia",
          "Fayol",
        ], c: 2, ex: "Contingencia: las decisiones deben adaptarse al caso." },
        { p: "El principio 4 de Fayol dice que cada empleado debe:", o: [
          "tener varios jefes",
          "tener UN solo superior",
          "decidir sin reportar",
          "ascender automáticamente",
        ], c: 1, ex: "Principio 4: Unidad de mando." },
      ]} />
    </EscenaRica>
  );
}
