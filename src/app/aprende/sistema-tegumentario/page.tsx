"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MED-02"
      tituloUnidad="Sistema tegumentario · Piel y anexos"
      escenas={[
        { titulo: "La piel · órgano más grande", componente: EscIntro },
        { titulo: "Capas de la piel", componente: EscCapas },
        { titulo: "Anexos cutáneos", componente: EscAnexos },
        { titulo: "Funciones de la piel", componente: EscFunciones },
        { titulo: "Termorregulación", componente: EscTermo },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Piel · el órgano más grande del cuerpo</Titulo>

      <Hook>
        Pesás 70 kg. De esos, 4 kg son piel. Si la estiraras, cubriría 2 m².
        Es tu interfaz con el mundo: te aísla, te defiende, te enfría, te
        avisa cuando algo quema.
      </Hook>

      <Definicion termino="Sistema tegumentario">
        Conjunto de piel y sus anexos (pelo, uñas, glándulas). Cubre toda la
        superficie corporal. Del latín <em>tegumentum</em> = cobertura.
      </Definicion>

      <Mnemotecnia>
        <strong>"4 kg, 2 m², 16% del peso corporal."</strong> Es el órgano más
        grande y pesado.
      </Mnemotecnia>

      <Conexion>
        La piel integra los 4 tejidos básicos: epitelial (epidermis), conectivo
        (dermis), muscular (erectores del pelo) y nervioso (receptores).
      </Conexion>
    </EscenaRica>
  );
}

function EscCapas() {
  return (
    <EscenaRica>
      <Titulo>3 capas · de afuera hacia adentro</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Corte transversal de la piel
          </text>
          {/* Epidermis */}
          <rect x={80} y={40} width={560} height={40} fill="#fbbf24" opacity={0.4} stroke="#d97706" strokeWidth={1.5} />
          <text x={650} y={65} textAnchor="end" fill="#d97706" fontSize={12} fontWeight={700}>EPIDERMIS</text>
          <text x={650} y={78} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>epitelio plano queratinizado · sin vasos</text>

          {/* Dermis */}
          <rect x={80} y={80} width={560} height={100} fill="#f87171" opacity={0.3} stroke="#dc2626" strokeWidth={1.5} />
          <text x={650} y={120} textAnchor="end" fill="#dc2626" fontSize={12} fontWeight={700}>DERMIS</text>
          <text x={650} y={135} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>tejido conjuntivo · vasos, nervios, anexos</text>
          {/* folículo */}
          <ellipse cx={250} cy={110} rx={8} ry={20} fill="#374151" opacity={0.7} />
          <line x1={250} y1={90} x2={250} y2={60} stroke="#374151" strokeWidth={3} />
          {/* glándula */}
          <circle cx={400} cy={140} r={12} fill="#0ea5e9" opacity={0.6} />
          <line x1={400} y1={128} x2={400} y2={60} stroke="#0ea5e9" strokeWidth={1.5} />

          {/* Hipodermis */}
          <rect x={80} y={180} width={560} height={60} fill="#a78bfa" opacity={0.3} stroke="#7c3aed" strokeWidth={1.5} />
          <text x={650} y={210} textAnchor="end" fill="#7c3aed" fontSize={12} fontWeight={700}>HIPODERMIS</text>
          <text x={650} y={225} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>tejido adiposo · aislante térmico, reserva</text>

          {/* Etiquetas izquierdas */}
          <text x={70} y={55} textAnchor="end" fill={LIENZO.fgDim} fontSize={9}>0.05–1.5 mm</text>
          <text x={70} y={130} textAnchor="end" fill={LIENZO.fgDim} fontSize={9}>1–4 mm</text>
          <text x={70} y={210} textAnchor="end" fill={LIENZO.fgDim} fontSize={9}>variable</text>
        </svg>
      </Pizarra>

      <Definicion termino="Epidermis (externa)">
        Epitelio plano estratificado queratinizado. SIN vasos sanguíneos. Tiene
        5 estratos (córneo, lúcido, granuloso, espinoso, basal). Se renueva
        cada ~28 días. Células principales: <strong>queratinocitos</strong>
        (95%) y <strong>melanocitos</strong> (pigmento).
      </Definicion>

      <Definicion termino="Dermis (media)">
        Tejido conjuntivo con colágeno y elastina. Aquí están vasos, nervios,
        folículos pilosos, glándulas sudoríparas y sebáceas.
      </Definicion>

      <Definicion termino="Hipodermis (interna)">
        Tejido adiposo subcutáneo. Aislante térmico, reserva energética,
        amortiguador mecánico.
      </Definicion>

      <Mnemotecnia>
        <strong>"E-D-H: Externa, Dura, Honda."</strong> Epidermis arriba,
        Dermis al medio, Hipodermis abajo.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscAnexos() {
  return (
    <EscenaRica>
      <Titulo>Anexos cutáneos</Titulo>

      <Definicion termino="Pelo">
        Filamento de queratina que nace del folículo piloso (en la dermis).
        Tiene raíz, tallo y bulbo. El músculo erector del pelo lo "para" al
        sentir frío o miedo (piloerección).
      </Definicion>

      <Definicion termino="Uñas">
        Láminas de queratina dura sobre los dedos. Crecen ~3 mm/mes (manos)
        y 1 mm/mes (pies).
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Glándulas de la piel
          </text>
          {[
            { x: 100, t: "Sudoríparas ecrinas", fn: "sudor acuoso (termorregulación)", c: "#06b6d4" },
            { x: 320, t: "Sudoríparas apocrinas", fn: "sudor + grasas (axila, pubis)", c: "#0ea5e9" },
            { x: 540, t: "Sebáceas", fn: "sebo (lubrica pelo y piel)", c: "#f59e0b" },
          ].map((g, i) => (
            <g key={i} transform={`translate(${g.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={90} fill={g.c} opacity={0.1} stroke={g.c} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={g.c} fontSize={12} fontWeight={700}>{g.t}</text>
              <text x={80} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{g.fn}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Sudor enfría, sebo lubrica, pelo abriga, uña corta."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscFunciones() {
  return (
    <EscenaRica>
      <Titulo>7 funciones de la piel</Titulo>

      <Pizarra alto={270}>
        <svg width="100%" height="100%" viewBox="0 0 720 270" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            La piel hace de TODO
          </text>
          {[
            { t: "Protección", d: "barrera contra microbios, UV, golpes" },
            { t: "Termorregulación", d: "sudor + vasodilatación enfrían" },
            { t: "Sensibilidad", d: "tacto, presión, dolor, T (receptores)" },
            { t: "Excreción", d: "sudor elimina urea, sales" },
            { t: "Síntesis de vitamina D", d: "con luz UV del sol" },
            { t: "Inmunidad", d: "células de Langerhans (defensa)" },
            { t: "Almacenamiento", d: "agua, lípidos, sangre" },
          ].map((f, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 30})`}>
              <rect width={580} height={24} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1} rx={4} />
              <text x={15} y={16} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{i + 1}. {f.t}</text>
              <text x={200} y={16} fill={LIENZO.fg} fontSize={11}>{f.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        En altura (Cochabamba 2570 msnm, La Paz 3650), la radiación UV es
        MUY intensa. Los melanocitos producen más melanina (bronceado
        protector). Sin protección, riesgo alto de cáncer de piel.
      </Cuidado>
    </EscenaRica>
  );
}

function EscTermo() {
  return (
    <EscenaRica>
      <Titulo>Termorregulación · cuando hace calor o frío</Titulo>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Respuestas de la piel al calor y al frío
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={130} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>CALOR</text>
            <text x={130} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Vasodilatación cutánea</text>
            <text x={130} y={66} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Sudoración (evaporación)</text>
            <text x={130} y={84} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• ↓ actividad muscular</text>
            <text x={130} y={110} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">resultado: pérdida de calor</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={130} fill="#0ea5e9" opacity={0.1} stroke="#0ea5e9" strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill="#0ea5e9" fontSize={13} fontWeight={700}>FRÍO</text>
            <text x={130} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Vasoconstricción cutánea</text>
            <text x={130} y={66} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Piloerección ("piel de gallina")</text>
            <text x={130} y={84} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Tiritar (contracción muscular)</text>
            <text x={130} y={110} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">resultado: conservación de calor</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Centro termorregulador">
        Hipotálamo (en el cerebro). Recibe señales de los termorreceptores de
        la piel y envía órdenes a glándulas sudoríparas y vasos cutáneos.
      </Definicion>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La piel no respira'">
        <strong>Pensar:</strong> que la piel solo cubre.<br />
        <strong>Realidad:</strong> intercambia O₂/CO₂ en pequeña cantidad y
        absorbe ciertas sustancias liposolubles (cremas, parches).
      </Misconception>

      <Misconception titulo="Error 2 · 'Bronceado es daño'">
        <strong>Pensar:</strong> que broncearse es siempre malo.<br />
        <strong>Realidad:</strong> es una respuesta PROTECTORA: más melanina
        bloquea más UV. El daño viene del exceso, no de la respuesta misma.
      </Misconception>

      <Misconception titulo="Error 3 · 'Sudar = perder grasa'">
        <strong>Pensar:</strong> que el sudor adelgaza.<br />
        <strong>Realidad:</strong> el sudor es agua + sales. Perdés peso por
        deshidratación, no por grasa. Volvés a tu peso al beber agua.
      </Misconception>

      <Resumen>
        Piel = órgano más grande. 3 capas: epidermis (sin vasos),
        dermis (vasos, nervios, anexos), hipodermis (grasa). Anexos: pelo,
        uñas, glándulas (sudoríparas y sebáceas). 7 funciones. Termorregulación
        por hipotálamo.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué capa de la piel contiene los vasos sanguíneos?"
        opciones={["Epidermis", "Dermis", "Hipodermis", "Estrato córneo"]}
        correctaIdx={1}
        explicacion="La epidermis NO tiene vasos. La dermis sí."
      />

      <AutoCheck
        pregunta="¿Qué pigmento da color a la piel?"
        opciones={["Hemoglobina", "Caroteno", "Melanina", "Queratina"]}
        correctaIdx={2}
        explicacion="La melanina, producida por los melanocitos en la epidermis."
      />

      <AutoCheck
        pregunta="¿Qué vitamina sintetiza la piel con luz solar?"
        opciones={["A", "C", "D", "K"]}
        correctaIdx={2}
        explicacion="Vitamina D, crucial para absorber calcio."
      />

      <AutoCheck
        pregunta="¿Cuál NO es función de la piel?"
        opciones={["protección", "producción de glóbulos rojos", "termorregulación", "excreción"]}
        correctaIdx={1}
        explicacion="Los glóbulos rojos los produce la médula ósea, no la piel."
      />
    </EscenaRica>
  );
}
