"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Introducción general a la ciencia económica"
      escenas={[
        { titulo: "El problema económico fundamental", componente: Esc01 },
        { titulo: "La escasez de recursos", componente: Esc02 },
        { titulo: "La lámpara de Aladino (Meyers)", componente: Esc03 },
        { titulo: "Las necesidades ilimitadas", componente: Esc04 },
        { titulo: "Bienes libres vs económicos", componente: Esc05 },
        { titulo: "Práctica final", componente: Esc06 },
      ]}
    />
  );
}

// Balanza: necesidades ilimitadas vs recursos limitados.
function BalanzaEscasez() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={200} onClick={() => setOn((v) => !v)}>
        <svg width="100%" height="100%" viewBox="0 0 480 200"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <line x1="240" x2="240" y1="50" y2="160" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="210" x2="270" y1="160" y2="160" stroke={LIENZO.fg} strokeWidth="2" />
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: on ? -16 : 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            style={{ transformOrigin: "240px 50px" }}>
            <line x1="100" x2="380" y1="50" y2="50" stroke={LIENZO.fg} strokeWidth="3" strokeLinecap="round" />
            <line x1="110" x2="110" y1="50" y2="80" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="60" y="80" width="100" height="40" rx="6"
              fill={LIENZO.accent} fillOpacity="0.18" stroke={LIENZO.accent} strokeWidth="2" />
            <text x="110" y="103" textAnchor="middle" fontSize="13" fill={LIENZO.accent} fontWeight="700">Necesidades</text>
            <text x="110" y="116" textAnchor="middle" fontSize="10" fill={LIENZO.accent}>ilimitadas</text>
            <line x1="370" x2="370" y1="50" y2="80" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="320" y="80" width="100" height="40" rx="6"
              fill={LIENZO.ok} fillOpacity="0.18" stroke={LIENZO.ok} strokeWidth="2" />
            <text x="370" y="103" textAnchor="middle" fontSize="13" fill={LIENZO.ok} fontWeight="700">Recursos</text>
            <text x="370" y="116" textAnchor="middle" fontSize="10" fill={LIENZO.ok}>limitados</text>
          </motion.g>
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim }}>
        {on
          ? <>Las necesidades pesan más → <b style={{ color: LIENZO.accent }}>escasez</b>: hay que elegir.</>
          : <span style={{ fontStyle: "italic", color: LIENZO.fgFaint }}>Tocá la balanza</span>}
      </div>
    </div>
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>El problema económico fundamental</Titulo>
      <Parrafo>
        Como observa Richardson, <strong>"la teoría económica se ocupa de la forma en que son utilizados los
        recursos escasos"</strong>. La historia económica se resume en la lucha de las sociedades por
        superar el problema de la escasez frente a los crecientes deseos de la colectividad.
      </Parrafo>
      <BalanzaEscasez />
      <Resumen>
        Los recursos humanos y patrimoniales son <strong>siempre escasos</strong>. En contrapartida, las
        necesidades y deseos humanos parecen no tener límites. De ese desbalance surge la economía como
        ciencia.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>La escasez de recursos</Titulo>
      <Parrafo>
        Todas las sociedades —antiguas, modernas, ricas o pobres— se enfrentan con la <strong>limitación
        de sus recursos productivos</strong>: humanos y patrimoniales.
      </Parrafo>
      <Resumen>
        • La tecnología y la capacidad científica son <strong>limitadas</strong>.<br />
        • La fuerza de trabajo de un país es enorme, pero <strong>no infinita</strong>.<br />
        • Aún el aparato industrial más avanzado no produce <em>todo</em> lo que se desea.<br /><br />
        Y la experiencia demuestra que, a medida que los recursos productivos se extienden y
        perfeccionan, los deseos crecen <strong>más que proporcionalmente</strong>.
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>La lámpara de Aladino de Meyers</Titulo>
      <Parrafo>
        Albert L. Meyers (<em>Elements of Modern Economics</em>, 1937) explica la ley de la escasez con
        una metáfora:
      </Parrafo>
      <Ejemplo>
        "Si cada uno de nosotros poseyera una lámpara de Aladino, nos bastaría con friccionarla para que
        nuestros deseos fueran inmediatamente atendidos. No existirían problemas económicos y no habría
        lugar para una ciencia económica."
      </Ejemplo>
      <PorQue>
        Pero la realidad es muy distinta. <strong>Sólo el aire es un bien libre</strong>. Incluso el agua,
        en las sociedades modernas, se transformó en un bien económico — su obtención y distribución
        requieren trabajo.
      </PorQue>
      <Resumen>
        "Comerás el pan con el sudor de tu frente" — la sentencia bíblica resume la <strong>ley
        milenaria de la escasez</strong>. Más válida que el poder mágico de cualquier lámpara.
      </Resumen>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Las necesidades ilimitadas</Titulo>
      <Parrafo>
        Podríamos pensar que en las economías ricas y modernas la ley de la escasez ya estaría superada.
        No es así: hay dos razones.
      </Parrafo>
      <Resumen>
        <strong>1.</strong> Las necesidades primarias (biológicas) se <strong>renuevan día a día</strong>:
        comer, vestirse, abrigarse, curarse. Su producción es perpetua.<br /><br />
        <strong>2.</strong> En las economías de tecnología avanzada el problema de la escasez se vuelve
        más grave: cada bien que se satisface masivamente es compensado por la <strong>creación de nuevos
        deseos</strong>.
      </Resumen>
      <Cuidado>
        Las grandes empresas <strong>presionan publicitariamente</strong> para generar nueva insatisfacción
        material. Coches, electrodomésticos, equipos sofisticados — multiplican deseos más allá de las
        necesidades mínimas.
      </Cuidado>
      <PorQue>
        Como observaba Gide: "civilizar un pueblo sólo es despertarlo a necesidades nuevas". En ninguna
        época una economía consiguió satisfacer plenamente las necesidades sociales.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Bienes libres vs. bienes económicos</Titulo>
      <Definicion termino="bien libre">
        Bien disponible en <strong>cantidad ilimitada</strong> sin esfuerzo, por lo que no tiene precio.
        Ejemplo clásico: el aire que respiramos.
      </Definicion>
      <Definicion termino="bien económico">
        Bien <strong>escaso</strong> que requiere trabajo para obtenerlo y tiene precio. Casi todo lo
        que estudia la economía pertenece a esta categoría.
      </Definicion>
      <Cuidado>
        El <strong>agua potable</strong> es un bien <em>económico</em>: cuesta tratarla y distribuirla.
        El agua de lluvia es libre. La distinción no es absoluta: depende del contexto.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "El problema económico fundamental es:", o: [
          "la inflación",
          "necesidades ilimitadas y recursos limitados",
          "el comercio internacional",
          "la planificación central",
        ], c: 1, ex: "Esa es la ley de la escasez: la base de toda la economía." },
        { p: "Según Meyers, el único bien claramente libre es:", o: [
          "el agua",
          "los alimentos",
          "el aire",
          "el sol",
        ], c: 2, ex: "El aire. Incluso el agua, hoy, requiere tratamiento → bien económico." },
        { p: "En economías ricas la escasez:", o: [
          "desaparece por completo",
          "se vuelve más grave por nuevos deseos",
          "se reduce a las necesidades biológicas",
          "depende solo del gobierno",
        ], c: 1, ex: "Cada nuevo bien masivo genera nuevos deseos: la insatisfacción persiste." },
        { p: "Un bien con precio es típicamente:", o: [
          "un bien libre",
          "un bien económico",
          "un bien intermedio",
          "un bien moral",
        ], c: 1, ex: "El precio nace de la escasez: bien económico." },
        { p: "La frase 'civilizar es despertar nuevas necesidades' es de:", o: [
          "Smith", "Marx", "Charles Gide", "Marshall",
        ], c: 2, ex: "Gide, en su Curso de Economía Política." },
      ]} />
    </EscenaRica>
  );
}
