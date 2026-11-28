"use client";

import LeccionShell from "../_components/LeccionShell";
import MathText from "../../components/MathText";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo,
  Parrafo,
  Definicion,
  Puente,
  PorQue,
  Ejemplo,
  Cuidado,
  Resumen,
  EscenaRica,
  AutoCheck,
  Hook,
  Misconception,
  Mnemotecnia,
  Conexion,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="BCM-10"
      tituloUnidad="Sistema de endomembranas y peroxisomas"
      escenas={[
        {
          titulo: "Panorama del sistema de endomembranas y la ruta biosintética-secretora",
          componente: EscPanorama,
        },
        {
          titulo: "Retículo endoplasmático rugoso (RER) y plegamiento de proteínas",
          componente: EscRER,
        },
        {
          titulo: "Retículo endoplasmático liso (REL): lípidos, calcio y detoxificación",
          componente: EscREL,
        },
        {
          titulo: "Complejo de Golgi: caras cis/trans, glucosilación y clasificación",
          componente: EscGolgi,
        },
        {
          titulo: "Tráfico vesicular, endosomas y lisosomas",
          componente: EscTraficoLisosomas,
        },
        {
          titulo: "Peroxisomas: oxidación, catalasa y plasmalógenos",
          componente: EscPeroxisomas,
        },
        {
          titulo: "Lo que más se pregunta y práctica final",
          componente: EscPracticaFinal,
        },
      ]}
    />
  );
}

/* ============================================================================
 * Diagramas SVG científicos (viewBox 0 0 360 H con H <= 375 y fontSize >= 13)
 * ============================================================================ */

function SvgMapaEndomembranas() {
  return (
    <Pizarra alto={324}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 324"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Mapa de flujo del sistema de endomembranas desde envoltura nuclear y RER hacia Golgi, membrana plasmática y lisosomas, separando mitocondrias y peroxisomas"
      >
        <title>Flujo del sistema de endomembranas</title>
        <defs>
          <marker id="arrEndoAcc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
          </marker>
          <marker id="arrEndoOk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
          </marker>
        </defs>

        <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
          Flujo del sistema de endomembranas
        </text>

        {/* Fila superior: Envoltura nuclear = RER = REL (continuidad de membrana) */}
        <rect x={16} y={36} width={104} height={48} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} strokeWidth={1.4} />
        <text x={68} y={57} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
          Envoltura
        </text>
        <text x={68} y={74} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          nuclear
        </text>

        <line x1={120} y1={56} x2={136} y2={56} stroke={LIENZO.fgDim} strokeWidth={2} />
        <line x1={120} y1={64} x2={136} y2={64} stroke={LIENZO.fgDim} strokeWidth={2} />

        <rect x={136} y={36} width={96} height={48} rx={8} fill={LIENZO.accent} fillOpacity={0.12} stroke={LIENZO.accent} strokeWidth={1.6} />
        <text x={184} y={57} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          RER
        </text>
        <text x={184} y={74} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          Proteínas
        </text>

        <line x1={232} y1={56} x2={248} y2={56} stroke={LIENZO.warn} strokeWidth={2} />
        <line x1={232} y1={64} x2={248} y2={64} stroke={LIENZO.warn} strokeWidth={2} />

        <rect x={248} y={36} width={96} height={48} rx={8} fill={LIENZO.warn} fillOpacity={0.12} stroke={LIENZO.warn} strokeWidth={1.6} />
        <text x={296} y={57} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          REL
        </text>
        <text x={296} y={74} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          Lípidos
        </text>

        {/* Flecha vesicular RER -> Golgi */}
        <line x1={184} y1={84} x2={184} y2={116} stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrEndoAcc)" />
        <text x={196} y={105} textAnchor="start" fill={LIENZO.accent} fontSize={13} fontWeight={600}>
          Vesículas
        </text>

        {/* Complejo de Golgi */}
        <rect x={46} y={118} width={268} height={50} rx={10} fill={LIENZO.ok} fillOpacity={0.1} stroke={LIENZO.ok} strokeWidth={1.6} />
        <text x={180} y={139} textAnchor="middle" fill={LIENZO.ok} fontSize={13.5} fontWeight={700}>
          Complejo de Golgi
        </text>
        <text x={180} y={158} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          cis → medial → trans
        </text>

        {/* Salidas hacia membrana y lisosomas */}
        <line x1={124} y1={168} x2={96} y2={198} stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#arrEndoOk)" />
        <line x1={236} y1={168} x2={264} y2={198} stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrEndoAcc)" />

        <rect x={16} y={200} width={154} height={46} rx={8} fill={LIENZO.ok} fillOpacity={0.12} stroke={LIENZO.ok} strokeWidth={1.5} />
        <text x={93} y={220} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          Membrana
        </text>
        <text x={93} y={237} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          y secreción
        </text>

        <rect x={190} y={200} width={154} height={46} rx={8} fill={LIENZO.accent} fillOpacity={0.12} stroke={LIENZO.accent} strokeWidth={1.5} />
        <text x={267} y={220} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          Endosomas
        </text>
        <text x={267} y={237} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          y lisosomas
        </text>

        {/* Separador y orgánulos fuera del sistema */}
        <line x1={16} y1={258} x2={344} y2={258} stroke={LIENZO.fgFaint} strokeWidth={1.2} strokeDasharray="5 4" />

        <rect x={16} y={268} width={328} height={48} rx={8} fill={LIENZO.bad} fillOpacity={0.08} stroke={LIENZO.bad} strokeWidth={1.4} strokeDasharray="4 3" />
        <text x={180} y={288} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>
          Fuera del tráfico vesicular:
        </text>
        <text x={180} y={307} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          Mitocondrias · Peroxisomas
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgTranslocacionRER() {
  return (
    <Pizarra alto={368}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 368"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Translocación cotraduccional al RER en tres bandas: Citosol, Membrana RER y Luz del RER. Etapa 1: ribosoma con ARNm, péptido señal amino terminal, SRP y receptor de SRP en la membrana. Transición: hidrólisis de GTP libera SRP. Etapa 2: cadena atraviesa el translocón, la peptidasa señal en la cara luminal corta el péptido señal y la proteína se pliega en la luz"
      >
        <title>Translocación cotraduccional al RER</title>
        <defs>
          <marker id="arrRerWarn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.warn} />
          </marker>
        </defs>

        <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
          Translocación cotraduccional al RER
        </text>

        {/* BANDA 1: CITOSOL */}
        <rect x={14} y={30} width={330} height={132} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
        <text x={24} y={48} textAnchor="start" fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>
          Citosol
        </text>
        <text x={128} y={48} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          1. Reconoce
        </text>
        <text x={274} y={48} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          2. Transloca
        </text>

        {/* Etapa 1: ARNm + ribosoma + péptido señal N-terminal + SRP */}
        <text x={24} y={72} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>
          ARNm
        </text>
        <line x1={32} y1={82} x2={138} y2={82} stroke={LIENZO.fgDim} strokeWidth={1.6} />
        <ellipse cx={92} cy={76} rx={15} ry={7} fill={LIENZO.accent} fillOpacity={0.18} stroke={LIENZO.accent} strokeWidth={1.4} />
        <ellipse cx={92} cy={90} rx={21} ry={10} fill={LIENZO.accent} fillOpacity={0.18} stroke={LIENZO.accent} strokeWidth={1.4} />

        {/* Péptido señal N-terminal emergiendo del ribosoma */}
        <line x1={92} y1={100} x2={92} y2={134} stroke={LIENZO.bad} strokeWidth={3.2} strokeLinecap="round" />
        <text x={84} y={122} textAnchor="end" fill={LIENZO.bad} fontSize={13} fontWeight={700}>
          Señal N
        </text>

        {/* Partícula SRP unida al péptido señal */}
        <rect x={99} y={110} width={44} height={24} rx={6} fill={LIENZO.warn} fillOpacity={0.22} stroke={LIENZO.warn} strokeWidth={1.5} />
        <text x={121} y={127} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          SRP
        </text>

        {/* Acople de SRP hacia su receptor en la membrana */}
        <line x1={110} y1={134} x2={110} y2={156} stroke={LIENZO.warn} strokeWidth={1.6} strokeDasharray="3 2" />

        {/* Transición: GTP -> GDP libera SRP */}
        <text x={182} y={76} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          GTP → GDP
        </text>
        <line x1={148} y1={90} x2={216} y2={90} stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#arrRerWarn)" />
        <text x={182} y={110} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          Libera SRP
        </text>

        {/* Etapa 2: ribosoma acoplado sobre el translocón */}
        <text x={286} y={110} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          Ribosoma
        </text>
        <line x1={212} y1={134} x2={292} y2={134} stroke={LIENZO.fgDim} strokeWidth={1.6} />
        <ellipse cx={248} cy={128} rx={15} ry={7} fill={LIENZO.ok} fillOpacity={0.18} stroke={LIENZO.ok} strokeWidth={1.4} />
        <ellipse cx={248} cy={142} rx={21} ry={10} fill={LIENZO.ok} fillOpacity={0.18} stroke={LIENZO.ok} strokeWidth={1.4} />

        {/* BANDA 3: LUZ DEL RER (fondo primero para que los canales sobresalgan) */}
        <rect x={14} y={196} width={330} height={160} rx={8} fill={LIENZO.bg} stroke={LIENZO.fgFaint} strokeWidth={1} />

        {/* BANDA 2: MEMBRANA RER */}
        <rect x={14} y={162} width={330} height={34} fill={LIENZO.warn} fillOpacity={0.18} />
        <line x1={14} y1={162} x2={344} y2={162} stroke={LIENZO.warn} strokeWidth={1.8} />
        <line x1={14} y1={196} x2={344} y2={196} stroke={LIENZO.warn} strokeWidth={1.8} />

        {/* Receptor de SRP incrustado en la membrana */}
        <rect x={98} y={156} width={24} height={44} rx={5} fill={LIENZO.warn} fillOpacity={0.35} stroke={LIENZO.warn} strokeWidth={1.8} />

        {/* Rótulo de membrana dentro de la bicapa */}
        <text x={178} y={184} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          Membrana RER
        </text>

        {/* Translocón (canal proteico con poro central) */}
        <rect x={234} y={156} width={10} height={46} rx={3} fill={LIENZO.accent} fillOpacity={0.28} stroke={LIENZO.accent} strokeWidth={1.6} />
        <rect x={252} y={156} width={10} height={46} rx={3} fill={LIENZO.accent} fillOpacity={0.28} stroke={LIENZO.accent} strokeWidth={1.6} />

        {/* Etiqueta del receptor de SRP con conector */}
        <line x1={110} y1={200} x2={110} y2={210} stroke={LIENZO.warn} strokeWidth={1.4} />
        <text x={24} y={226} textAnchor="start" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          Receptor de SRP
        </text>

        {/* Peptidasa señal en la cara luminal de la membrana */}
        <rect x={212} y={196} width={20} height={16} rx={4} fill={LIENZO.bad} fillOpacity={0.28} stroke={LIENZO.bad} strokeWidth={1.5} />
        <line x1={222} y1={212} x2={206} y2={244} stroke={LIENZO.bad} strokeWidth={1.3} />
        <text x={202} y={260} textAnchor="end" fill={LIENZO.bad} fontSize={13} fontWeight={700}>
          Peptidasa señal
        </text>
        <text x={202} y={278} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>
          corta al emerger
        </text>

        {/* Cadena atravesando el translocón + corte del péptido señal */}
        <line x1={248} y1={152} x2={248} y2={212} stroke={LIENZO.bad} strokeWidth={3} />
        <line x1={234} y1={212} x2={262} y2={212} stroke={LIENZO.bad} strokeWidth={1.8} strokeDasharray="3 2" />

        {/* Proteína ya libre plegándose en la luz */}
        <path
          d="M 248 212 Q 248 232 262 244 C 284 252, 246 270, 268 282 C 292 292, 296 266, 282 256"
          fill="none"
          stroke={LIENZO.ok}
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* Rótulo del translocón con conector */}
        <line x1={262} y1={198} x2={276} y2={212} stroke={LIENZO.accent} strokeWidth={1.3} />
        <text x={338} y={224} textAnchor="end" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          Translocón
        </text>

        {/* Rótulos en la parte inferior de la luz */}
        <text x={24} y={342} textAnchor="start" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          Luz del RER
        </text>
        <text x={338} y={322} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          Proteína liberada
        </text>
        <text x={338} y={342} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>
          se pliega en la luz
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgFuncionesREL() {
  return (
    <Pizarra alto={352}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 352"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Diagrama estructural de túbulos lisos interconectados del REL sin ribosomas: en la membrana ocurren síntesis de lípidos y esteroides con escramblasas, detoxificación por citocromo P450 y liberación de glucosa por glucosa-6-fosfatasa; en la luz tubular se almacena y libera calcio como en el retículo sarcoplásmico"
      >
        <title>REL: túbulos lisos y cuatro funciones clave</title>
        <defs>
          <marker id="arrRelCa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.bad} />
          </marker>
        </defs>

        <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
          REL: túbulos lisos sin ribosomas
        </text>

        {/* Función 1: Membrana tubular -> Lípidos y esteroides */}
        <text x={16} y={48} textAnchor="start" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          1. Lípidos y esteroides
        </text>
        <text x={16} y={66} textAnchor="start" fill={LIENZO.fg} fontSize={13}>
          En la membrana
        </text>
        <text x={16} y={84} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>
          (escramblasas)
        </text>
        <line x1={76} y1={92} x2={76} y2={134} stroke={LIENZO.accent} strokeWidth={1.6} />

        {/* Función 2: Membrana tubular -> Detoxificación P450 */}
        <text x={344} y={48} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          2. Detoxificación
        </text>
        <text x={344} y={66} textAnchor="end" fill={LIENZO.fg} fontSize={13}>
          Citocromo P450
        </text>
        <text x={344} y={84} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>
          Membrana (hígado)
        </text>
        <line x1={280} y1={92} x2={280} y2={146} stroke={LIENZO.ok} strokeWidth={1.6} />

        {/* Red de túbulos lisos interconectados (pared de membrana + luz tubular) */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Pared externa de la membrana tubular */}
          <path
            d="M 40 150 Q 110 132 180 150 Q 250 168 320 150 M 40 202 Q 110 220 180 202 Q 250 184 320 202 M 110 142 L 110 210 M 250 160 L 250 192"
            stroke={LIENZO.warn}
            strokeWidth={24}
          />
          {/* Luz interior continua de los túbulos */}
          <path
            d="M 40 150 Q 110 132 180 150 Q 250 168 320 150 M 40 202 Q 110 220 180 202 Q 250 184 320 202 M 110 142 L 110 210 M 250 160 L 250 192"
            stroke={LIENZO.bg}
            strokeWidth={18}
          />
          <path
            d="M 40 150 Q 110 132 180 150 Q 250 168 320 150 M 40 202 Q 110 220 180 202 Q 250 184 320 202 M 110 142 L 110 210 M 250 160 L 250 192"
            stroke={LIENZO.warn}
            strokeOpacity={0.12}
            strokeWidth={16}
          />
        </g>

        {/* Puntos de anclaje sobre la membrana (funciones 1, 2 y 3) */}
        <circle cx={76} cy={136} r={4} fill={LIENZO.accent} />
        <circle cx={280} cy={148} r={4} fill={LIENZO.ok} />
        <circle cx={76} cy={216} r={4} fill={LIENZO.warn} />

        {/* Iones de calcio almacenados dentro de la luz tubular derecha */}
        <circle cx={264} cy={196} r={3.2} fill={LIENZO.bad} />
        <circle cx={278} cy={199} r={3.2} fill={LIENZO.bad} />
        <circle cx={294} cy={201} r={3.2} fill={LIENZO.bad} />
        <circle cx={309} cy={202} r={3.2} fill={LIENZO.bad} />

        {/* Etiqueta central señalando la luz interior del túbulo */}
        <line x1={180} y1={168} x2={180} y2={152} stroke={LIENZO.fgDim} strokeWidth={1.2} />
        <circle cx={180} cy={152} r={2.6} fill={LIENZO.fgDim} />
        <text x={180} y={182} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13} fontWeight={600}>
          Luz tubular
        </text>

        {/* Función 3: Membrana tubular -> Glucógeno */}
        <line x1={76} y1={220} x2={76} y2={256} stroke={LIENZO.warn} strokeWidth={1.6} />
        <text x={16} y={276} textAnchor="start" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          3. Glucógeno
        </text>
        <text x={16} y={295} textAnchor="start" fill={LIENZO.fg} fontSize={13}>
          Glucosa-6-fosfatasa
        </text>
        <text x={16} y={314} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>
          Membrana (hígado)
        </text>
        <text x={16} y={333} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>
          libera glucosa
        </text>

        {/* Función 4: Desde la luz tubular -> Almacén y liberación de Ca2+ */}
        <line x1={278} y1={204} x2={278} y2={254} stroke={LIENZO.bad} strokeWidth={2} markerEnd="url(#arrRelCa)" />
        <text x={344} y={276} textAnchor="end" fill={LIENZO.bad} fontSize={13} fontWeight={700}>
          4. Almacén de Ca²⁺
        </text>
        <text x={344} y={295} textAnchor="end" fill={LIENZO.fg} fontSize={13}>
          En la luz tubular
        </text>
        <text x={344} y={314} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>
          Retículo sarcoplásmico
        </text>
        <text x={344} y={333} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>
          (músculo)
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgGolgiCaras() {
  return (
    <Pizarra alto={330}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 330"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Polaridad del aparato de Golgi en cinco compartimentos: CGN marca con M6P, cis retira manosas, medial añade GlcNAc, trans añade galactosa y ácido siálico, y TGN sulfata y clasifica hacia membrana, secreción y lisosomas"
      >
        <title>Polaridad del aparato de Golgi</title>
        <defs>
          <marker id="arrGolgiDown" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
          </marker>
          <marker id="arrGolgiOut" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
          </marker>
        </defs>

        <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
          Polaridad del aparato de Golgi
        </text>

        {/* Flecha vertical de maduración cis -> trans */}
        <line x1={22} y1={44} x2={22} y2={236} stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrGolgiDown)" />

        {/* 1. CGN */}
        <rect x={36} y={36} width={144} height={34} rx={12} fill={LIENZO.accent} fillOpacity={0.14} stroke={LIENZO.accent} strokeWidth={1.5} strokeDasharray="4 2" />
        <text x={108} y={58} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          CGN (entrada)
        </text>
        <text x={188} y={58} textAnchor="start" fill={LIENZO.fg} fontSize={13}>
          Marca con M6P
        </text>

        {/* 2. Cisterna cis */}
        <rect x={42} y={78} width={132} height={34} rx={12} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.5} />
        <text x={108} y={100} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
          Cisterna cis
        </text>
        <text x={188} y={100} textAnchor="start" fill={LIENZO.fg} fontSize={13}>
          Retira manosas
        </text>

        {/* 3. Cisterna medial */}
        <rect x={38} y={120} width={140} height={34} rx={12} fill={LIENZO.warn} fillOpacity={0.12} stroke={LIENZO.warn} strokeWidth={1.5} />
        <text x={108} y={142} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          Cisterna medial
        </text>
        <text x={188} y={142} textAnchor="start" fill={LIENZO.fg} fontSize={13}>
          Añade GlcNAc
        </text>

        {/* 4. Cisterna trans */}
        <rect x={42} y={162} width={132} height={34} rx={12} fill={LIENZO.bgSoft} stroke={LIENZO.ok} strokeWidth={1.5} />
        <text x={108} y={184} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
          Cisterna trans
        </text>
        <text x={188} y={184} textAnchor="start" fill={LIENZO.fg} fontSize={13}>
          Galactosa y siálico
        </text>

        {/* 5. TGN */}
        <rect x={36} y={204} width={144} height={34} rx={12} fill={LIENZO.ok} fillOpacity={0.14} stroke={LIENZO.ok} strokeWidth={1.5} strokeDasharray="4 2" />
        <text x={108} y={226} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          TGN (salida)
        </text>
        <text x={188} y={226} textAnchor="start" fill={LIENZO.fg} fontSize={13}>
          Sulfata · clasifica
        </text>

        {/* Ramificación hacia los 3 destinos de salida */}
        <line x1={108} y1={238} x2={108} y2={254} stroke={LIENZO.ok} strokeWidth={1.8} />
        <line x1={67} y1={254} x2={293} y2={254} stroke={LIENZO.ok} strokeWidth={1.8} />
        <line x1={67} y1={254} x2={67} y2={270} stroke={LIENZO.ok} strokeWidth={1.8} markerEnd="url(#arrGolgiOut)" />
        <line x1={180} y1={254} x2={180} y2={270} stroke={LIENZO.ok} strokeWidth={1.8} markerEnd="url(#arrGolgiOut)" />
        <line x1={293} y1={254} x2={293} y2={270} stroke={LIENZO.ok} strokeWidth={1.8} markerEnd="url(#arrGolgiOut)" />

        <rect x={16} y={272} width={102} height={46} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
        <text x={67} y={292} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
          Membrana
        </text>
        <text x={67} y={309} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          plasmática
        </text>

        <rect x={129} y={272} width={102} height={46} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
        <text x={180} y={292} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
          Secreción
        </text>
        <text x={180} y={309} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          al exterior
        </text>

        <rect x={242} y={272} width={102} height={46} rx={8} fill={LIENZO.accent} fillOpacity={0.12} stroke={LIENZO.accent} strokeWidth={1.4} />
        <text x={293} y={292} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          Lisosomas
        </text>
        <text x={293} y={309} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          (M6P)
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgTraficoYLisosoma() {
  return (
    <Pizarra alto={340}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 340"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Tráfico vesicular con cubiertas COPII anterógrado, COPI retrógrado KDEL y clatrina hacia endosoma tardío y lisosoma con bomba V-ATPasa a pH 5, más el reconocimiento por Rab y fusión por v-SNARE y t-SNARE"
      >
        <title>Cubiertas vesiculares y vía lisosomal</title>
        <defs>
          <marker id="arrTrafOk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
          </marker>
          <marker id="arrTrafWarn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.warn} />
          </marker>
          <marker id="arrTrafAcc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
          </marker>
        </defs>

        <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
          Cubiertas vesiculares y vía lisosomal
        </text>

        {/* Zona superior: RER <-> Golgi */}
        <rect x={16} y={54} width={86} height={56} rx={8} fill={LIENZO.accent} fillOpacity={0.12} stroke={LIENZO.accent} strokeWidth={1.5} />
        <text x={59} y={78} textAnchor="middle" fill={LIENZO.accent} fontSize={13.5} fontWeight={700}>
          RER
        </text>
        <text x={59} y={97} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          Salida
        </text>

        <rect x={258} y={54} width={86} height={56} rx={8} fill={LIENZO.ok} fillOpacity={0.12} stroke={LIENZO.ok} strokeWidth={1.5} />
        <text x={301} y={78} textAnchor="middle" fill={LIENZO.ok} fontSize={13.5} fontWeight={700}>
          Golgi
        </text>
        <text x={301} y={97} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          CGN/TGN
        </text>

        {/* COPII anterógrado */}
        <text x={180} y={45} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          COPII (anterógrado)
        </text>
        <line x1={106} y1={68} x2={252} y2={68} stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#arrTrafOk)" />

        {/* COPI retrógrado */}
        <line x1={252} y1={96} x2={106} y2={96} stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#arrTrafWarn)" />
        <text x={180} y={124} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          COPI (retorno KDEL)
        </text>

        {/* Separador */}
        <line x1={16} y1={134} x2={344} y2={134} stroke={LIENZO.fgFaint} strokeWidth={1} strokeDasharray="4 4" />

        {/* Zona media: Clatrina -> Endosoma tardío -> Lisosoma */}
        <rect x={16} y={148} width={92} height={74} rx={8} fill={LIENZO.accent} fillOpacity={0.1} stroke={LIENZO.accent} strokeWidth={1.5} />
        <text x={62} y={171} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          Clatrina
        </text>
        <text x={62} y={191} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          TGN y
        </text>
        <text x={62} y={209} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          endocitosis
        </text>

        <line x1={109} y1={185} x2={122} y2={185} stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrTrafAcc)" />

        <rect x={124} y={148} width={92} height={74} rx={8} fill={LIENZO.warn} fillOpacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} />
        <text x={170} y={171} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          Endosoma
        </text>
        <text x={170} y={191} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          tardío
        </text>
        <text x={170} y={209} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          suelta M6P
        </text>

        <line x1={217} y1={185} x2={230} y2={185} stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrTrafAcc)" />

        <rect x={232} y={148} width={112} height={74} rx={8} fill={LIENZO.bad} fillOpacity={0.1} stroke={LIENZO.bad} strokeWidth={1.5} />
        <text x={288} y={171} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>
          Lisosoma
        </text>
        <text x={288} y={191} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          pH ~5
        </text>
        <text x={288} y={209} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          V-ATPasa H⁺
        </text>

        {/* Zona inferior: Rab + SNARE */}
        <rect x={16} y={240} width={328} height={88} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
        <text x={180} y={262} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
          Reconocimiento y fusión de membrana
        </text>

        <rect x={24} y={272} width={136} height={46} rx={7} fill={LIENZO.bg} stroke={LIENZO.accent} strokeWidth={1.3} />
        <text x={92} y={292} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          Rab-GTP
        </text>
        <text x={92} y={310} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          dirige a la diana
        </text>

        <rect x={168} y={272} width={168} height={46} rx={7} fill={LIENZO.bg} stroke={LIENZO.ok} strokeWidth={1.3} />
        <text x={252} y={292} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          v-SNARE + t-SNARE
        </text>
        <text x={252} y={310} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          anclan y fusionan
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgPeroxisoma() {
  return (
    <Pizarra alto={364}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 364"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Peroxisoma de membrana simple: ácido graso de cadena muy larga más oxígeno entran a oxidasas y producen dos salidas separadas, acetil-CoA que sale hacia la mitocondria y dos moléculas de peróxido de hidrógeno que la catalasa transforma en dos moléculas de agua más oxígeno"
      >
        <title>Peroxisoma: oxidación y catalasa</title>
        <defs>
          <marker id="arrPerWarn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.warn} />
          </marker>
          <marker id="arrPerBad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.bad} />
          </marker>
          <marker id="arrPerAcc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
          </marker>
          <marker id="arrPerOk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
          </marker>
        </defs>

        <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
          Peroxisoma: oxidación y catalasa
        </text>

        {/* Membrana simple del peroxisoma */}
        <rect x={14} y={32} width={330} height={268} rx={24} fill={LIENZO.bgSoft} stroke={LIENZO.ok} strokeWidth={2.4} />
        <text x={30} y={54} textAnchor="start" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          Membrana simple (sin ADN)
        </text>

        {/* REACCIÓN 1: Ácido graso de cadena muy larga + O2 -> Oxidasa */}
        <rect x={22} y={66} width={184} height={46} rx={8} fill={LIENZO.bg} stroke={LIENZO.warn} strokeWidth={1.5} />
        <text x={114} y={86} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          Ácido graso muy largo
        </text>
        <text x={114} y={104} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          + O₂ (beta-oxidación)
        </text>

        <line x1={206} y1={89} x2={228} y2={89} stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#arrPerWarn)" />

        <rect x={230} y={70} width={102} height={38} rx={19} fill={LIENZO.warn} fillOpacity={0.18} stroke={LIENZO.warn} strokeWidth={1.6} />
        <text x={281} y={94} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
          Oxidasa
        </text>

        {/* Bifurcación clara en DOS salidas separadas */}
        {/* Salida 1 (izquierda): 2 H2O2 */}
        <path d="M 262 108 L 262 124 L 98 124 L 98 142" fill="none" stroke={LIENZO.bad} strokeWidth={2} markerEnd="url(#arrPerBad)" />
        <rect x={26} y={144} width={144} height={48} rx={8} fill={LIENZO.bad} fillOpacity={0.12} stroke={LIENZO.bad} strokeWidth={1.5} />
        <text x={98} y={165} textAnchor="middle" fill={LIENZO.bad} fontSize={13.5} fontWeight={700}>
          2 H₂O₂
        </text>
        <text x={98} y={183} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
          tóxico (+ calor)
        </text>

        {/* Salida 2 (derecha): Acetil-CoA hacia la mitocondria */}
        <line x1={296} y1={108} x2={296} y2={142} stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrPerAcc)" />
        <rect x={192} y={144} width={142} height={48} rx={8} fill={LIENZO.bg} stroke={LIENZO.accent} strokeWidth={1.5} />
        <text x={263} y={165} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          Acetil-CoA
        </text>
        <text x={263} y={183} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          cadena acortada
        </text>

        {/* REACCIÓN 2: 2 H2O2 -> Catalasa -> 2 H2O + O2 */}
        <line x1={76} y1={192} x2={76} y2={224} stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#arrPerOk)" />

        <rect x={26} y={228} width={100} height={40} rx={20} fill={LIENZO.ok} fillOpacity={0.18} stroke={LIENZO.ok} strokeWidth={1.6} />
        <text x={76} y={253} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          Catalasa
        </text>

        <line x1={126} y1={248} x2={148} y2={248} stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#arrPerOk)" />

        <rect x={150} y={224} width={104} height={48} rx={8} fill={LIENZO.ok} fillOpacity={0.12} stroke={LIENZO.ok} strokeWidth={1.5} />
        <text x={202} y={245} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
          2 H₂O + O₂
        </text>
        <text x={202} y={263} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
          inocuo
        </text>

        {/* Flecha de salida de Acetil-CoA cruzando la membrana hacia la mitocondria */}
        <line x1={296} y1={192} x2={296} y2={316} stroke={LIENZO.accent} strokeWidth={2} strokeDasharray="4 3" markerEnd="url(#arrPerAcc)" />

        {/* Destino externo y nota de plasmalógenos */}
        <text x={22} y={332} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>
          También inicia
        </text>
        <text x={22} y={350} textAnchor="start" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
          plasmalógenos
        </text>

        <rect x={154} y={318} width={190} height={38} rx={8} fill={LIENZO.accent} fillOpacity={0.1} stroke={LIENZO.accent} strokeWidth={1.4} />
        <text x={249} y={342} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
          Hacia la mitocondria
        </text>
      </svg>
    </Pizarra>
  );
}

/* ============================================================================
 * ESCENA 1 · Panorama del sistema de endomembranas y ruta biosintética-secretora
 * ============================================================================ */

function EscPanorama() {
  return (
    <EscenaRica>
      <Titulo>El sistema de endomembranas: la red logística de la célula</Titulo>

      <Hook>
        Una célula acinar del páncreas fabrica y exporta de forma continua
        enzimas digestivas sin digerirse a sí misma, mientras un hepatocito
        sintetiza lípidos de membrana y detoxifica fármacos al mismo tiempo.
        ¿Cómo evita la célula que todas esas reacciones se mezclen en un solo
        caos?
      </Hook>

      <Puente>
        Imagina una fábrica moderna dividida en salas con puertas: una{" "}
        <strong>línea de ensamblaje</strong> donde se arman las piezas, un
        puesto de <strong>control de calidad</strong>, una{" "}
        <strong>oficina de correo</strong> que coloca etiquetas con dirección
        exacta, <strong>camiones sellados</strong> para el reparto y una{" "}
        <strong>planta de reciclaje</strong>. Así opera el sistema de
        endomembranas: compartimentos rodeados de membrana que trabajan en
        cadena sin mezclar sus contenidos.
      </Puente>

      <Definicion termino="¿Qué orgánulos integran el sistema de endomembranas?">
        Las células eucariotas (a diferencia de las procariotas) poseen una red
        de membranas internas comunicadas por continuidad directa o por
        vesículas de transporte:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Envoltura nuclear:</strong> está en continuidad física con
            las cisternas del retículo endoplasmático.
          </li>
          <li>
            <strong>Retículo endoplasmático rugoso (RER) y liso (REL):</strong>{" "}
            el RER fabrica y pliega proteínas; el REL sintetiza lípidos de
            membrana, detoxifica sustancias liposolubles, libera glucosa del
            glucógeno y almacena <MathText>{"$\\mathrm{Ca^{2+}}$"}</MathText>.
          </li>
          <li>
            <strong>Complejo (aparato) de Golgi:</strong> recibe lo que sale
            del retículo, completa su maduración química y lo clasifica.
          </li>
          <li>
            <strong>Endosomas, lisosomas y vesículas de transporte:</strong>{" "}
            mueven moléculas entre salas y digieren o reciclan materiales.
          </li>
        </ul>
      </Definicion>

      <Parrafo>
        Al marcar aminoácidos radiactivos en células acinares del páncreas se
        trazó la <strong>ruta biosintética-secretora</strong>: las proteínas
        nacen en el <strong>RER</strong>, pasan al <strong>Golgi</strong>, se
        empaquetan en vesículas y llegan a la membrana plasmática o a los
        lisosomas. Observa el mapa completo en la pizarra:
      </Parrafo>

      <SvgMapaEndomembranas />

      <Definicion termino="Qué NO pertenece al tráfico vesicular de endomembranas">
        Las <strong>mitocondrias</strong> y los <strong>peroxisomas</strong>{" "}
        quedan fuera del tráfico vesicular con el complejo de Golgi:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Importación postraduccional:</strong> sus proteínas
            codificadas en el núcleo se traducen completas en ribosomas libres
            del citosol (igual que las proteínas nucleares) y se importan
            después sin pasar por el Golgi.
          </li>
          <li>
            <strong>Llegada no vesicular de lípidos:</strong> a diferencia del
            sistema de endomembranas, los fosfolípidos fabricados en el REL no
            llegan a mitocondrias ni a peroxisomas mediante vesículas, sino por{" "}
            <strong>proteínas citosólicas intercambiadoras de fosfolípidos</strong>.
          </li>
          <li>
            <strong>Matiz sobre el peroxisoma (Calvo, caps. 10 y 11):</strong>{" "}
            la mitocondria tiene doble membrana y ADN propio; el peroxisoma
            tiene membrana simple y carece de ADN propio. Aunque su membrana se
            genera a partir del retículo endoplasmático (cap. 11), sus enzimas
            de la matriz entran de forma postraduccional desde el citosol y no
            intercambia vesículas con el Golgi (cap. 10).
          </li>
        </ul>
      </Definicion>

      <div style={{ width: "100%", maxWidth: 620, overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            tableLayout: "fixed",
            borderCollapse: "collapse",
            fontSize: 12.5,
            lineHeight: 1.4,
          }}
        >
          <thead>
            <tr style={{ background: LIENZO.bgSoft, color: LIENZO.fg }}>
              <th style={{ width: "24%", padding: "6px 5px", textAlign: "left", borderBottom: `2px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Criterio
              </th>
              <th style={{ width: "38%", padding: "6px 5px", textAlign: "left", borderBottom: `2px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Sistema de endomembranas
              </th>
              <th style={{ width: "38%", padding: "6px 5px", textAlign: "left", borderBottom: `2px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Mitocondrias y peroxisomas
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, fontWeight: 700, color: LIENZO.fg, overflowWrap: "break-word" }}>
                Orgánulos
              </td>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Envoltura nuclear, RER, REL, Golgi, endosomas, lisosomas y vesículas.
              </td>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Mitocondrias (doble membrana) y peroxisomas (membrana simple).
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, fontWeight: 700, color: LIENZO.fg, overflowWrap: "break-word" }}>
                Entrada de proteínas
              </td>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Importación cotraduccional al RER y tráfico vesicular por el Golgi.
              </td>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Importación postraduccional desde ribosomas libres del citosol.
              </td>
            </tr>
            <tr>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, fontWeight: 700, color: LIENZO.fg, overflowWrap: "break-word" }}>
                Llegada de lípidos
              </td>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Transporte vesicular desde el REL y el Golgi.
              </td>
              <td style={{ padding: "6px 5px", borderBottom: `1px solid ${LIENZO.fgFaint}`, overflowWrap: "break-word" }}>
                Proteínas citosólicas intercambiadoras de fosfolípidos.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </EscenaRica>
  );
}

/* ============================================================================
 * ESCENA 2 · Retículo endoplasmático rugoso (RER) y plegamiento de proteínas
 * ============================================================================ */

function EscRER() {
  return (
    <EscenaRica>
      <Titulo>Retículo endoplasmático rugoso (RER) y control de calidad</Titulo>

      <Puente>
        Volvamos a nuestra fábrica: el <strong>RER</strong> es la{" "}
        <strong>línea de ensamblaje con inspector de calidad</strong>. Cuando
        una pieza empieza a armarse con un código de destino, un guía detiene la
        cinta, la conecta a la compuerta del taller y solo la deja salir si su
        forma tridimensional aprueba la inspección.
      </Puente>

      <Parrafo>
        Aquí entran todas las proteínas destinadas a quedarse en el RER, pasar
        al Golgi, actuar en los lisosomas, insertarse en la membrana plasmática
        o secretarse fuera de la célula.
      </Parrafo>

      <Definicion termino="Estructura del RER, basofilia y microsomas">
        El RER es una red de <strong>sáculos (cisternas) aplanados</strong> con{" "}
        <strong>ribosomas adheridos</strong> en su cara citosólica, en
        continuidad con la envoltura nuclear y el REL. Su luz mide{" "}
        <strong>20 a 30 nm</strong> y su membrana mide <strong>5 a 6 nm</strong>.
        Existe en todas las células nucleadas{" "}
        <strong>excepto en los espermatozoides</strong>, y ocupa hasta el 20 %
        del volumen en células acinares del páncreas exocrino.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Basofilia citoplasmática:</strong> afinidad por colorantes
            básicos debida al ARN ribosómico abundante. Puede ser{" "}
            <strong>difusa</strong> (células plasmáticas, donde el Golgi queda
            como <em>zona Golgi negativa</em>), <strong>basal</strong> (páncreas
            exocrino y glándulas salivales) o <strong>en grumos</strong>{" "}
            (típica de hepatocitos y neuronas; en estas últimas las zonas
            basófilas reciben el nombre de{" "}
            <strong>grumos o cuerpos de Nissl</strong>).
          </li>
          <li>
            <strong>Microsomas:</strong> al fraccionar células por
            centrifugación diferencial, el retículo se fragmenta en vesículas de
            unos <strong>100 nm</strong> llamadas microsomas (rugosos y lisos,
            separables en gradiente de sacarosa).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Importación cotraduccional: hipótesis de la señal">
        Las proteínas que entran al RER llevan un{" "}
        <strong>péptido señal</strong> de <strong>16 a 30 aminoácidos</strong>{" "}
        en su extremo amino (N-terminal). Su entrada avanza a la vez que la
        traducción en cinco pasos:
        <ol style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            La traducción inicia en un ribosoma libre. Al asomar el péptido
            señal, lo reconoce la{" "}
            <strong>partícula de reconocimiento de la señal (SRP)</strong>,
            formada por <strong>1 ARN y 6 proteínas</strong>.
          </li>
          <li>
            La SRP <strong>detiene la traducción</strong> y cambia de forma para
            unirse a su <strong>receptor de SRP</strong> en la membrana del RER;
            el conjunto se acopla al canal proteico llamado{" "}
            <strong>translocador (translocón)</strong>.
          </li>
          <li>
            El translocón se abre y se reanuda la síntesis mientras la cadena
            cruza hacia la luz. La <strong>hidrólisis de GTP</strong> libera a
            la SRP.
          </li>
          <li>
            La <strong>peptidasa señal</strong>, situada en la cara luminal de
            la membrana, corta el péptido señal en cuanto emerge.
          </li>
          <li>
            La síntesis termina y la proteína queda en la luz. Si debe anclarse
            en la membrana (paso único o múltiple), posee{" "}
            <strong>secuencias hidrófobas de parada de la transferencia</strong>{" "}
            de 20 a 25 aminoácidos y señales internas según su orientación.
          </li>
        </ol>
      </Definicion>

      <SvgTranslocacionRER />

      <Definicion termino="N-glucosilación, puentes disulfuro y anclajes GPI">
        Solo las proteínas que atraviesan el RER se glucosilan, lo cual ayuda al
        plegamiento y evita que formen agregados:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>N-glucosilación inicial:</strong> una{" "}
            <strong>transferasa de oligosacáridos</strong> transfiere{" "}
            <strong>en bloque</strong> una cadena de{" "}
            <strong>14 azúcares</strong> (<strong>3 glucosas, 9 manosas y 2 N-acetilglucosaminas</strong>),
            armada sobre el lípido <strong>dolicoldifosfato</strong>, hacia una{" "}
            <strong>asparragina (Asn)</strong> en la secuencia{" "}
            <strong>Asn-X-Ser</strong> o <strong>Asn-X-Thr</strong>. En el RER
            se eliminan luego <strong>3 glucosas</strong> (primero 1 y luego 2)
            y <strong>1 manosa</strong>.
          </li>
          <li>
            <strong>Puentes disulfuro (S-S):</strong> la luz del RER mantiene un{" "}
            <strong>ambiente oxidante</strong> (el citosol es reductor). La{" "}
            <strong>isomerasa de puentes disulfuro (PDI)</strong> forma enlaces
            S-S entre cisteínas y cede electrones a la proteína{" "}
            <strong>Ero1</strong>.
          </li>
          <li>
            <strong>Anclajes GPI:</strong> ciertas proteínas se unen a un
            glucolípido con fosfatidilinositol (glucofosfatidilinositol o GPI)
            para quedar fijadas a la membrana.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Control de calidad: BiP, calnexina, calreticulina y degradación">
        Antes de salir hacia el Golgi, el plegamiento se revisa paso a paso:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Chaperonas del RER:</strong>{" "}
            <strong>BiP (proteína de choque térmico HSP-70)</strong> se une a la
            cadena naciente para facilitar su plegamiento.{" "}
            <strong>Calnexina</strong> (anclada en la membrana) y{" "}
            <strong>calreticulina</strong> (soluble en la luz) son lectinas
            dependientes de calcio que retienen proteínas incompletamente
            plegadas en el RER.
          </li>
          <li>
            <strong>Ciclo de inspección con calreticulina:</strong> tras
            eliminarse las dos primeras glucosas del oligosacárido, la proteína
            se une a <strong>calreticulina</strong>, que favorece su plegamiento
            y retira la tercera glucosa. Los sensores deciden entonces tres
            salidas: (a) si está bien plegada, sigue hacia el Golgi; (b) si está
            mal plegada, se reglucosila para volver a ser reconocida por la{" "}
            <strong>calreticulina</strong> y reintentar el plegamiento; (c) si
            el error es irresoluble, sale al citosol por{" "}
            <strong>retrotranslocación</strong> (vía de degradación asociada al
            RE o ERAD), pierde su azúcar por una <strong>N-glucanasa</strong>,
            se marca con ubiquitina (<strong>ubiquitinación</strong>) y se
            destruye en el <strong>proteasoma</strong>.
          </li>
          <li>
            <strong>Estrés del RER y UPR:</strong> ante hipertermia, hipoxia o
            ayuno se acumulan proteínas mal plegadas. <strong>BiP</strong>{" "}
            detecta ese estrés y dispara la{" "}
            <strong>respuesta ante proteínas mal plegadas (UPR)</strong>, que
            aumenta chaperonas y retrotranslocación. Los acúmulos pueden formar{" "}
            <strong>cuerpos de Russell</strong> en la luz o{" "}
            <strong>agresomas</strong> en el citosol, y se vinculan con
            Alzheimer, Parkinson, cáncer, obesidad y diabetes.
          </li>
        </ul>
      </Definicion>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="¿Qué afirmación describe con exactitud la translocación cotraduccional y el plegamiento de proteínas en el RER según Calvo?"
          opciones={[
            "La SRP acelera la síntesis proteica y corta el péptido señal en el citosol antes de tocar el retículo",
            "La luz del RER mantiene un ambiente reductor que impide formar puentes disulfuro en proteínas nuevas",
            "La SRP frena la traducción, guía el ribosoma al translocón y la peptidasa señal corta el péptido señal",
            "Las proteínas mal plegadas de forma irreversible se degradan dentro de la luz del RER sin exportarse",
          ]}
          correctaIdx={2}
          explicacion={
            "Paso 1: repasa la hipótesis de la señal en Calvo Cap. 10. La SRP detiene temporalmente la traducción al reconocer el péptido señal N-terminal, lleva el ribosoma al receptor junto al translocón y la peptidasa señal corta el péptido en la cara luminal.\n\n" +
            "Paso 2: descarta los errores en las demás afirmaciones. La SRP frena la síntesis en vez de acelerarla; la luz del RER es oxidante y forma puentes S-S con la PDI; y las proteínas irreparables salen por retrotranslocación al citosol para degradarse en el proteasoma tras N-glucanasa y ubiquitinación.\n\n" +
            "Conclusión: la afirmación correcta es que la SRP frena la traducción, guía el ribosoma al translocón y la peptidasa señal corta el péptido señal."
          }
        />
      </div>
    </EscenaRica>
  );
}

/* ============================================================================
 * ESCENA 3 · Retículo endoplasmático liso (REL): lípidos, calcio y detoxificación
 * ============================================================================ */

function EscREL() {
  return (
    <EscenaRica>
      <Titulo>Retículo endoplasmático liso (REL): cuatro funciones clave</Titulo>

      <Puente>
        Si el RER era la línea de ensamblaje de proteínas, el{" "}
        <strong>REL</strong> es el{" "}
        <strong>taller de materiales, depósito de calcio y planta depuradora</strong>{" "}
        de la fábrica. Comparte paredes con el RER, pero aquí no hay ribosomas:
        en sus túbulos se fabrican los lípidos de todas las membranas, se
        neutralizan químicos tóxicos y se guarda un interruptor de calcio listo
        para dispararse.
      </Puente>

      <Parrafo>
        El REL forma una red de <strong>túbulos membranosos</strong> con mayor
        proporción de lípidos que el RER. Alcanza gran desarrollo en{" "}
        <strong>hepatocitos</strong> (células del hígado), células productoras
        de <strong>hormonas esteroideas</strong> y{" "}
        <strong>fibras musculares</strong>. Observa en la pizarra dónde ocurre
        cada función:
      </Parrafo>

      <SvgFuncionesREL />

      <Definicion termino="1. Síntesis de lípidos, escramblasas y derivados lipídicos">
        La fabricación de lípidos ocurre en la{" "}
        <strong>hemimembrana citosólica</strong> del REL y abastece de membrana
        a toda la célula:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Fosfolípidos:</strong> dos ácidos grasos unidos a coenzima
            A se combinan con glicerol-3-fosfato formando{" "}
            <strong>ácido fosfatídico</strong>. Una fosfatasa lo transforma en{" "}
            <strong>diacilglicerol (DAG)</strong>, al que se unen cabezas
            polares para generar <strong>fosfatidilcolina, fosfatidiletanolamina y fosfatidilserina</strong>.
            El <strong>fosfatidilinositol</strong> se forma directamente desde
            el ácido fosfatídico.
          </li>
          <li>
            <strong>Escramblasas:</strong> como los fosfolípidos nacen solo en
            la cara citosólica, las enzimas <strong>escramblasas</strong>{" "}
            voltean fosfolípidos hacia la cara luminal para equilibrar la bicapa
            y construir su asimetría.
          </li>
          <li>
            <strong>Colesterol, ceramida y derivados:</strong> en el REL se
            sintetizan colesterol y ceramida (que en el Golgi dará glucolípidos
            y esfingomielina para las balsas lipídicas o <em>rafts</em>).
            También produce quilomicrones (enterocitos), lipoproteínas (LDL,
            VLDL, HDL, VHDL) y ácidos biliares (hígado), y{" "}
            <strong>hormonas esteroideas</strong> (testosterona, estradiol,
            cortisol, aldosterona) en cooperación con enzimas mitocondriales.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="2. Detoxificación de sustancias liposolubles (citocromo P450)">
        En los <strong>hepatocitos</strong>, el REL convierte sustancias tóxicas
        liposolubles (fármacos, alcohol, pesticidas, carcinógenos y metabolitos
        dañinos) en compuestos <strong>hidrosolubles</strong> fáciles de
        excretar. En la cara citosólica de su membrana residen las enzimas de la
        familia del <strong>citocromo P450</strong> (designadas{" "}
        <strong>CYP</strong>), que catalizan reacciones de oxidación, hidrólisis
        o reducción para disminuir su toxicidad; después, enzimas
        citoplasmáticas las conjugan con ácido glucurónico, sulfato o acetilo.
      </Definicion>

      <Definicion termino="3. Metabolismo del glucógeno y 4. Almacén de calcio">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Metabolismo del glucógeno:</strong> en el hígado, el REL se
            sitúa junto a los depósitos de glucógeno. En su cara citosólica está
            la <strong>glucosa-6-fosfatasa</strong>, que hidroliza la
            glucosa-6-fosfato en <strong>glucosa libre</strong> para liberarla a
            la sangre ante una baja de glucemia.
          </li>
          <li>
            <strong>Almacén de <MathText>{"$\\mathrm{Ca^{2+}}$"}</MathText>:</strong>{" "}
            bombas <strong><MathText>{"$\\mathrm{Ca^{2+}}$"}</MathText>-ATPasas</strong>{" "}
            concentran <MathText>{"$\\mathrm{Ca^{2+}}$"}</MathText> dentro de
            la luz tubular en contra de gradiente; su salida actúa como{" "}
            <strong>segundo mensajero</strong>. En el músculo esquelético, este
            REL especializado se llama <strong>retículo sarcoplásmico</strong>:
            envuelve las miofibrillas y libera{" "}
            <MathText>{"$\\mathrm{Ca^{2+}}$"}</MathText> con el impulso nervioso
            para iniciar la contracción.
          </li>
        </ul>
      </Definicion>

      <PorQue>
        ¿Por qué crece tanto el REL de los hepatocitos cuando se administran
        fármacos como el fenobarbital? Porque el hígado fabrica más membrana con
        citocromo P450 para eliminar la sustancia; al suspender el fármaco, ese
        exceso de REL se retira mediante <strong>autofagia</strong>.
      </PorQue>
    </EscenaRica>
  );
}

/* ============================================================================
 * ESCENA 4 · Complejo de Golgi: caras cis/trans, glucosilación y clasificación
 * ============================================================================ */

function EscGolgi() {
  return (
    <EscenaRica>
      <Titulo>Complejo de Golgi: polaridad, maduración y clasificación</Titulo>

      <Puente>
        Ahora el paquete recién ensamblado en el retículo entra en la{" "}
        <strong>oficina de acabado y correo</strong> de la fábrica: el{" "}
        <strong>complejo de Golgi</strong>. Ingresa por una ventanilla de
        recepción, avanza por estaciones ordenadas donde recibe sellos químicos
        y sale por el muelle opuesto con un código postal exacto.
      </Puente>

      <Parrafo>
        Descubierto por <strong>Camillo Golgi (1898)</strong> en neuronas de
        Purkinje del cerebelo mediante impregnación con sales de metales pesados
        (como osmio o plata) y vinculado con la secreción por{" "}
        <strong>Ramón y Cajal (1914)</strong>, el Golgi abunda en células que
        secretan glucoproteínas y proteoglucanos (acinos pancreáticos, células
        caliciformes, hepatocitos y neuronas).
      </Parrafo>

      <Definicion termino="Dictiosomas y polaridad en cinco compartimentos">
        Sus sáculos aplanados apilados en paralelo, junto con túbulos y
        vesículas, forman unidades llamadas <strong>dictiosomas</strong> (un
        hepatocito tiene hasta <strong>50 dictiosomas</strong>). Cada dictiosoma
        tiene una polaridad funcional desde la cara de entrada (<strong>cis</strong>)
        hasta la cara de salida (<strong>trans</strong>), dividida en cinco
        estaciones con enzimas propias:
        <ol style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Red del cis-Golgi (CGN):</strong> red tubular de entrada que
            añade grupos <strong>fosfato</strong> a manosas de futuras enzimas
            lisosómicas.
          </li>
          <li>
            <strong>Cisternas cis:</strong> retiran residuos de{" "}
            <strong>manosa</strong>.
          </li>
          <li>
            <strong>Cisternas mediales:</strong> añaden{" "}
            <strong>N-acetilglucosamina (GlcNAc)</strong>.
          </li>
          <li>
            <strong>Cisternas trans:</strong> añaden <strong>galactosa</strong>{" "}
            y <strong>ácido siálico</strong> (ácido neuramínico).
          </li>
          <li>
            <strong>Red del trans-Golgi (TGN):</strong> red tubular de salida
            donde las sulfotransferasas añaden <strong>grupos sulfato</strong> a
            tirosinas y se clasifican las vesículas.
          </li>
        </ol>
      </Definicion>

      <SvgGolgiCaras />

      <Definicion termino="Modificaciones postraduccionales en el Golgi">
        Los azúcares se añaden siempre hacia el interior (luz) de las cisternas:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Procesamiento de N-oligosacáridos:</strong> remodela la
            cadena iniciada en el RER generando tres tipos:{" "}
            <strong>ricos en manosa</strong>, <strong>complejos</strong>{" "}
            (manosa, GlcNAc, galactosa, ácido siálico y a veces fucosa) e{" "}
            <strong>híbridos</strong>.
          </li>
          <li>
            <strong>O-glucosilación en el Golgi:</strong> añade azúcares{" "}
            <strong>de modo secuencial</strong> (cadenas cortas de unos 10
            azúcares, a diferencia de la transferencia en bloque de la
            N-glucosilación en el RER) al grupo -OH de{" "}
            <strong>serina, treonina</strong> o <strong>hidroxilisina</strong>{" "}
            (unida a galactosa en el colágeno), característica de las{" "}
            <strong>mucinas</strong> y del colágeno.
          </li>
          <li>
            <strong>Proteoglucanos, ácido siálico y sulfatación:</strong> añade
            largas cadenas de <strong>glucosaminoglucanos</strong>. El{" "}
            <strong>ácido siálico</strong> (en cisternas trans) aporta carga
            negativa, abunda en células metastásicas y sirve de anclaje al{" "}
            <strong>virus de la gripe</strong>. En la TGN se sulfatan tirosinas
            de moléculas de adhesión, matriz extracelular y receptores acoplados
            a proteínas G.
          </li>
          <li>
            <strong>Proteólisis y condensación:</strong> corta precursores
            inactivos en pares de aminoácidos básicos (Lys-Lys, Lys-Arg,
            Arg-Arg, Arg-Lys) y condensa secreciones hasta{" "}
            <strong>200 veces</strong> con bombas de{" "}
            <MathText>{"$\\mathrm{H^+}$"}</MathText> (como los gránulos de
            zimógeno del páncreas).
          </li>
        </ul>
      </Definicion>

      <Ejemplo titulo="Ejemplo clásico de Calvo: maduración de la insulina">
        En las células beta del páncreas, el RER traduce la{" "}
        <strong>pre-proinsulina</strong>; al cortarse el péptido señal queda{" "}
        <strong>proinsulina</strong> plegada con puentes disulfuro. Luego pasa
        por el Golgi hacia gránulos inmaduros, donde proteasas (prohormona
        convertasa 1/3 y carboxipeptidasa E) la cortan generando{" "}
        <strong>insulina madura</strong> y <strong>péptido C</strong>, listos
        para exocitarse cuando sube la glucemia.
      </Ejemplo>

      <Definicion termino="Etiquetado con manosa-6-fosfato (M6P) y modelos de transporte">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Código postal M6P para lisosomas:</strong> en la{" "}
            <strong>CGN</strong>, la enzima{" "}
            <strong>N-acetilglucosamina fosfotransferasa</strong> añade un grupo
            fosfato (desde N-acetilglucosamina-UDP) al carbono 6 de manosas
            terminales de las hidrolasas ácidas. En la <strong>TGN</strong>, los{" "}
            <strong>receptores de M6P</strong> reconocen esa etiqueta y las
            empaquetan en vesículas de <strong>clatrina</strong> hacia el
            endosoma tardío.
          </li>
          <li>
            <strong>Transporte a través del Golgi:</strong> el modelo de{" "}
            <strong>transporte vesicular</strong> propone cisternas estáticas
            con carga viajando en vesículas; el modelo de{" "}
            <strong>maduración de cisternas</strong> propone que las cisternas
            avanzan de cis a trans mientras sus enzimas residentes regresan por
            transporte retrógrado. Hoy se acepta una{" "}
            <strong>mezcla de ambos modelos</strong>.
          </li>
          <li>
            <strong>Tres destinos de salida desde la TGN:</strong> membrana
            plasmática, secreción al exterior (constitutiva o regulada) y
            lisosomas, tal como muestra el diagrama superior (además de las
            proteínas que permanecen como residentes dentro del propio Golgi),
            manteniendo el equilibrio con la membrana que entra por endocitosis.
          </li>
        </ul>
      </Definicion>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="Sobre la polaridad y las funciones del aparato de Golgi, ¿cuál enunciado es correcto?"
          opciones={[
            "La O-glucosilación en el Golgi añade azúcares en secuencia sobre serina, treonina o hidroxilisina",
            "La N-glucosilación inicia en la red trans-Golgi añadiendo azúcares uno a uno sobre serina o treonina",
            "El marcaje con manosa-6-fosfato ocurre en cisternas trans y el ácido siálico se añade en la cara cis",
            "El modelo de maduración de cisternas plantea cisternas fijas sin transporte retrógrado de sus enzimas",
          ]}
          correctaIdx={0}
          explicacion={
            "Paso 1: distingue los dos tipos de glucosilación según Calvo Cap. 10. La N-glucosilación empieza en el RER transfiriendo en bloque un oligosacárido desde dolicoldifosfato sobre asparragina; en cambio, la O-glucosilación en el Golgi añade azúcares de forma secuencial en cadenas cortas sobre el grupo -OH de serina, treonina o hidroxilisina.\n\n" +
            "Paso 2: revisa la polaridad y los modelos de transporte. El marcaje con manosa-6-fosfato (M6P) comienza en la red cis-Golgi (CGN) y el ácido siálico se añade en cisternas trans; además, la maduración de cisternas requiere transporte retrógrado de enzimas residentes (las cisternas fijas corresponden al modelo de transporte vesicular).\n\n" +
            "Conclusión: la afirmación correcta es que la O-glucosilación en el Golgi añade azúcares en secuencia sobre serina, treonina o hidroxilisina."
          }
        />
      </div>
    </EscenaRica>
  );
}

/* ============================================================================
 * ESCENA 5 · Tráfico vesicular, endosomas y lisosomas
 * ============================================================================ */

function EscTraficoLisosomas() {
  return (
    <EscenaRica>
      <Titulo>Tráfico vesicular, endosomas y digestión lisosomal</Titulo>

      <Puente>
        Llegamos a los <strong>camiones sellados y la planta de reciclaje</strong>{" "}
        de nuestra fábrica. Cada ruta usa un camión con cubierta distinta, cada
        descarga exige comprobar la cerradura exacta de la puerta de destino y
        todo material gastado o importado termina en una cámara ácida donde se
        desmonta en piezas reutilizables.
      </Puente>

      <Parrafo>
        Las <strong>proteínas de revestimiento</strong> cumplen dos tareas al
        formar vesículas: aportar fuerza mecánica para curvar la membrana y
        atrapar los receptores de carga específicos.
      </Parrafo>

      <Definicion termino="Las tres cubiertas vesiculares y las dos vías secretoras">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>COPII (coatómero II):</strong> transporte{" "}
            <strong>anterógrado</strong> desde zonas sin ribosomas del RER (
            <em>exit sites</em> o lugares de salida) hacia el cis-Golgi sobre
            microtúbulos (reclutado por la GTPasa Sar1). Solo salen proteínas
            bien plegadas.
          </li>
          <li>
            <strong>COPI (coatómero I):</strong> vía <strong>retrógrada</strong>{" "}
            del Golgi al RER que recupera proteínas residentes solubles con
            señal carboxilo terminal <strong>KDEL</strong> (Lys-Asp-Glu-Leu,
            como BiP y PDI) y proteínas de membrana con señal{" "}
            <strong>KKXX</strong>. También media el tráfico entre cisternas del
            Golgi y, según Calvo, la secreción constitutiva desde la TGN
            (reclutado por la GTPasa ARF).
          </li>
          <li>
            <strong>Clatrina:</strong> forma vesículas desde la{" "}
            <strong>TGN hacia lisosomas</strong>, en la{" "}
            <strong>endocitosis mediada por receptor</strong> y en la{" "}
            <strong>exocitosis regulada</strong> (reclutada por ARF y adaptinas;
            pierde la cubierta apenas se desprende).
          </li>
          <li>
            <strong>Secreción constitutiva vs. regulada:</strong> la{" "}
            <strong>constitutiva</strong> funciona sin pausa en todas las
            células para renovar membrana y matriz extracelular; la{" "}
            <strong>regulada</strong> solo existe en células secretoras y libera
            hormonas, enzimas o neurotransmisores ante un estímulo.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Reconocimiento y fusión de membranas: Rab y SNARE">
        Antes de abrir una vesícula en su destino intervienen dos familias
        complementarias (Calvo, caps. 5 y 10):
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>GTPasas Rab:</strong> inactivas con GDP en el citosol, al
            activarse como <strong>Rab-GTP</strong> en la membrana vesicular
            reclutan <strong>efectores de Rab</strong> que dirigen y acercan la
            vesícula a su compartimento diana.
          </li>
          <li>
            <strong>Proteínas SNARE:</strong> proteínas transmembrana
            complementarias en la vesícula (<strong>v-SNARE</strong>) y en la
            membrana diana (<strong>t-SNARE</strong>, de <em>target</em>). Sus
            hélices se enrollan entre sí, acercan ambas bicapas a unos{" "}
            <strong>1,5 nm</strong>, expulsan el agua interpuesta y fusionan las
            membranas; después Rab hidroliza GTP a GDP y se recicla.
          </li>
        </ul>
      </Definicion>

      <SvgTraficoYLisosoma />

      <Definicion termino="Endosomas y lisosomas: pH ácido y fosfatasa ácida">
        Descubiertos por <strong>Christian De Duve</strong> (por su actividad{" "}
        <strong>fosfatasa ácida</strong>) y observados por{" "}
        <strong>Novikov</strong>, los <strong>lisosomas</strong> tienen membrana
        simple (<MathText>{"$0{,}2\\text{ a }0{,}5\\,\\mu\\text{m}$"}</MathText>) y abundan en fagocitos (neutrófilos, macrófagos,
        osteoclastos):
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Hidrolasas ácidas y marcador universal:</strong> reúnen
            hasta <strong>40 hidrolasas ácidas</strong> (nucleasas, proteasas,
            glucosidasas, lipasas). Todos comparten la{" "}
            <strong>fosfatasa ácida</strong>,{" "}
            <strong>marcador universal de lisosomas</strong>.
          </li>
          <li>
            <strong>pH cercano a 5 y protección de membrana:</strong> bombas de
            protones (<strong>V-ATPasa de <MathText>{"$\\mathrm{H^+}$"}</MathText></strong>)
            introducen <MathText>{"$\\mathrm{H^+}$"}</MathText> en contra de
            gradiente para mantener un <strong>pH de 4,5 a 5</strong>. Su
            membrana tiene proteínas muy glucosiladas que evitan la
            autodigestión y transportadores para devolver aminoácidos, azúcares
            y nucleótidos al citosol.
          </li>
          <li>
            <strong>De endosoma temprano a lisosoma secundario:</strong> el
            material endocitado llega al <strong>endosoma temprano</strong>{" "}
            (periférico), que madura (vía cuerpos multivesiculares) en{" "}
            <strong>endosoma tardío</strong> (más ácido). Al fusionarse las
            vesículas hidrolíticas del Golgi (<strong>lisosomas primarios</strong>),
            el pH ácido disocia la hidrolasa de su receptor de M6P (que regresa
            a la TGN en vesículas de <strong>retrómeros</strong>), se retira el
            fosfato y nace el <strong>lisosoma secundario</strong> activo. Los
            residuos no digeribles forman{" "}
            <strong>cuerpos residuales o gránulos de lipofuscina</strong>{" "}
            (pigmento de envejecimiento en neuronas y corazón).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Digestión extracelular, heterofagia y autofagia">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Digestión extracelular:</strong> por exocitosis lisosomal en
            el <strong>acrosoma</strong> del espermatozoide (atraviesa la zona
            pelúcida del ovocito) y en los <strong>osteoclastos</strong>{" "}
            (remodelación del hueso).
          </li>
          <li>
            <strong>Heterofagia vs. autofagia:</strong> la{" "}
            <strong>heterofagia</strong> digiere material del exterior
            (endocitosis o fagocitosis); la <strong>autofagia</strong> recicla
            componentes propios ante daño o ayuno (controlada por genes{" "}
            <strong>Atg</strong>, inhibida por <strong>insulina</strong> y la
            vía <strong>mTOR</strong>; la rapamicina inhibe mTOR e induce
            autofagia). La digestión de gránulos de secreción propios se llama{" "}
            <strong>crinofagia</strong>.
          </li>
          <li>
            <strong>Tres tipos de autofagia:</strong>{" "}
            <strong>macroautofagia</strong> (una membrana envuelve orgánulos en
            un <strong>autofagosoma</strong> que al fusionarse con el lisosoma
            forma un <strong>autolisosoma</strong>),{" "}
            <strong>microautofagia</strong> (invaginación directa de la membrana
            lisosomal) y <strong>autofagia mediada por chaperonas</strong>{" "}
            (proteínas citosólicas con secuencia <strong>KFERQ</strong>{" "}
            reconocidas por <strong>Hsc70</strong> e importadas por{" "}
            <strong>Lamp-2A</strong>).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Patologías lisosomales de examen (Calvo Cap. 10)">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Por ruptura de lisosomas:</strong> partículas no digeribles
            rompen la membrana y liberan hidrolasas, como los cristales de urato
            en la <strong>gota</strong> y el polvo de sílice en la{" "}
            <strong>silicosis</strong> (neumoconiosis de mineros: muerte de
            fagocitos, inflamación crónica, fibrosis pulmonar y mayor riesgo de
            tuberculosis y cáncer).
          </li>
          <li>
            <strong>Enfermedad de Fabry:</strong> déficit de{" "}
            <strong>alfa-galactosidasa A</strong>, herencia ligada al{" "}
            <strong>cromosoma X</strong> (más en varones). Acumula{" "}
            <strong>globotriaosilceramida (GL-3)</strong> en vasos, hígado,
            corazón, piel y cerebro (ardor en palmas, baja sudoración,
            angioqueratomas, fallo renal y opacidad corneal).
          </li>
          <li>
            <strong>Enfermedad de Gaucher:</strong> la enfermedad por
            almacenamiento lisosomal <strong>más común</strong>. Déficit de{" "}
            <strong>glucocerebrosidasa</strong> con acúmulo de{" "}
            <strong>glucocerebrósidos</strong>: tipo I (sin daño neurológico,
            con lesiones óseas y hepatoesplenomegalia), tipo II (infantil grave
            con daño del sistema nervioso central) y tipo III (neurológica
            intermedia).
          </li>
          <li>
            <strong>Mucolipidosis tipo II (enfermedad de células I):</strong>{" "}
            déficit de <strong>N-acetilglucosamina fosfotransferasa</strong>.
            Sin etiqueta <strong>M6P</strong>, los lisosomas quedan vacíos de
            hidrolasas y estas se secretan al exterior, apareciendo en el{" "}
            <strong>suero</strong> (diagnóstico en suero). Provoca
            malformaciones, retraso del crecimiento, hipotonía y muerte
            frecuente antes de los 5 años.
          </li>
        </ul>
      </Definicion>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="¿Qué combinación relaciona correctamente cada proteína o estructura con su función en el tráfico vesicular y los lisosomas?"
          opciones={[
            "COPII devuelve en sentido retrógrado proteínas residentes con señal KDEL del Golgi hacia el RER",
            "COPI lleva en sentido anterógrado proteínas recién plegadas desde el RER hacia la cara cis-Golgi",
            "La fosfatasa ácida es el marcador exclusivo del retículo liso y alcanza su máximo a pH alcalino",
            "La bomba V-ATPasa mantiene el pH ácido cercano a 5 en el lisosoma donde actúan las hidrolasas",
          ]}
          correctaIdx={3}
          explicacion={
            "Paso 1: comprueba la dirección de las cubiertas COP. COPII lleva carga en sentido anterógrado (del RER al cis-Golgi) y COPI realiza el retorno retrógrado (del Golgi al RER) de proteínas con señal KDEL o KKXX; por eso las dos afirmaciones sobre COP están invertidas.\n\n" +
            "Paso 2: revisa la enzima marcadora. La fosfatasa ácida es el marcador universal de los lisosomas, no del retículo endoplasmático liso, y trabaja de forma óptima en medio ácido.\n\n" +
            "Conclusión: la única afirmación correcta es que la bomba V-ATPasa mantiene el pH ácido cercano a 5 en el lisosoma para sus hidrolasas."
          }
        />
      </div>
    </EscenaRica>
  );
}

/* ============================================================================
 * ESCENA 6 · Peroxisomas (Calvo Cap. 11): oxidación, catalasa y plasmalógenos
 * ============================================================================ */

function EscPeroxisomas() {
  return (
    <EscenaRica>
      <Titulo>Peroxisomas: oxidación lipídica, catalasa y plasmalógenos</Titulo>

      <Puente>
        Fuera de la red principal de correos de la fábrica existe una{" "}
        <strong>cámara aislada para reacciones oxidativas peligrosas</strong>: el{" "}
        <strong>peroxisoma</strong>. Se rodea de una sola pared protectora para
        recortar grasas larguísimas y neutralizar al instante el peróxido
        tóxico que esa reacción genera, evitando que queme el resto de la célula.
      </Puente>

      <Parrafo>
        Abundan en <strong>hígado, riñón y pulmones</strong>. Su diámetro varía
        entre <MathText>{"$0{,}3\\text{ a }1{,}5\\,\\mu\\text{m}$"}</MathText>{" "}
        (desde un tamaño similar al de los lisosomas hasta bastante mayores
        según la célula), cumplen un metabolismo oxidativo propio y{" "}
        <strong>no</strong> intercambian vesículas con el aparato de Golgi.
      </Parrafo>

      <Definicion termino="Estructura, origen e importación postraduccional">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Membrana simple y cristaloide:</strong> delimitados por una
            sola membrana lipídica, sin material genético propio. En el interior
            de algunos peroxisomas se observa el <strong>cristaloide</strong>,
            formado habitualmente por precipitados cristalinos de la enzima{" "}
            <strong>urato oxidasa</strong>, y su{" "}
            <strong>marcador universal</strong> es la <strong>catalasa</strong>{" "}
            (enzima con grupo hemo, revelable con diaminobencidina y{" "}
            <MathText>{"$\\mathrm{H_2O_2}$"}</MathText>).
          </li>
          <li>
            <strong>Relación con el retículo e importación de proteínas:</strong>{" "}
            Calvo señala que la membrana peroxisómica se genera a partir del
            retículo endoplasmático (cap. 11), mientras que los fosfolípidos
            llegan por proteínas citosólicas intercambiadoras y sus más de 50
            enzimas de la matriz (codificadas en el núcleo) se traducen en
            ribosomas libres del citosol y entran por{" "}
            <strong>importación postraduccional</strong> (cap. 10). La mayoría
            lleva una señal en el extremo carboxilo (C-terminal,{" "}
            <strong>señal de direccionamiento peroxisómico o PTS</strong>),
            reconocida por receptores solubles y anclada a peroxinas con gasto
            de <strong>ATP</strong>, logrando importar{" "}
            <strong>proteínas completamente plegadas</strong> e incluso
            complejos oligoméricos.
          </li>
          <li>
            <strong>Control de su número:</strong> proliferan rápido ante
            estímulos lipídicos mediante el receptor nuclear{" "}
            <strong>PPAR-α</strong> (receptor activador de la proliferación de
            peroxisomas alfa) y se eliminan selectivamente por{" "}
            <strong>pexofagia</strong>.
          </li>
        </ul>
      </Definicion>

      <SvgPeroxisoma />

      <Definicion termino="Beta-oxidación, peróxido de hidrógeno y catalasa">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Ácidos grasos de cadena muy larga:</strong>{" "}
            solo los peroxisomas pueden acortarlos (junto con ácidos grasos
            dicarboxílicos, leucotrienos, prostaglandinas y precursores de
            ácidos biliares).
          </li>
          <li>
            <strong>Dos productos y sin ATP:</strong> al carecer de ciclo de
            Krebs y cadena respiratoria, las oxidasas dependientes de FAD ceden
            electrones al <MathText>{"$\\mathrm{O_2}$"}</MathText> generando{" "}
            <strong>peróxido de hidrógeno (<MathText>{"$\\mathrm{H_2O_2}$"}</MathText>)</strong>{" "}
            y disipando energía como <strong>calor (termogénesis)</strong>. Por
            otro lado, las cadenas acortadas (acetil-CoA, propionil-CoA y
            acil-CoA de cadena media) salen hacia la{" "}
            <strong>mitocondria</strong> para completar su oxidación hasta{" "}
            <MathText>{"$\\mathrm{CO_2}$"}</MathText> y{" "}
            <MathText>{"$\\mathrm{H_2O}$"}</MathText>.
          </li>
          <li>
            <strong>Defensa antioxidante:</strong> la <strong>catalasa</strong>{" "}
            transforma de inmediato el{" "}
            <MathText>{"$2\\,\\mathrm{H_2O_2}$"}</MathText> en{" "}
            <MathText>{"$2\\,\\mathrm{H_2O} + \\mathrm{O_2}$"}</MathText>. Con
            su actividad peroxidasa también usa{" "}
            <MathText>{"$\\mathrm{H_2O_2}$"}</MathText> para detoxificar{" "}
            <strong>etanol, metanol, fenol y nitritos</strong>, apoyada por
            superóxido dismutasa, glutatión peroxidasa y{" "}
            <strong>peroxirredoxina</strong>.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Funciones anabólicas: plasmalógenos y ácidos biliares">
        Los peroxisomas participan en la síntesis de{" "}
        <strong>ácidos biliares</strong> e inician la fabricación de{" "}
        <strong>plasmalógenos</strong>, fosfolípidos con un enlace{" "}
        <strong>éter alquílico</strong> en el carbono 1 del glicerol (cabeza de
        etanolamina o colina), abundantes en la <strong>mielina</strong>{" "}
        (tejido nervioso), el tejido cardiovascular y el sistema inmunitario.
        Sus primeros pasos usan <strong>DHAP aciltransferasa</strong> y{" "}
        <strong>alquil-DHAP sintasa</strong> en el peroxisoma (más la
        acil/alquil-DHAP reductasa compartida con el RE), y la síntesis termina
        en el retículo endoplasmático.
      </Definicion>

      <Definicion termino="Trastornos peroxisomales de examen (Calvo Cap. 11)">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Síndrome de Zellweger (síndrome cerebrohepatorrenal):</strong>{" "}
            defecto grave de la biogénesis peroxisómica por mutaciones en genes
            de <strong>peroxinas (PEX)</strong>; la causa más frecuente afecta a
            la <strong>peroxina PEX1</strong>, bloqueando la entrada de
            proteínas de matriz. Fallan la beta-oxidación de
            ácidos grasos de cadena muy larga y la síntesis de plasmalógenos;
            cursa con retraso mental, sordera, visión defectuosa, hepatomegalia,
            quistes renales y muerte en el primer año de vida.
          </li>
          <li>
            <strong>Adrenoleucodistrofia ligada al cromosoma X:</strong> es la
            enfermedad peroxisómica <strong>más frecuente</strong>. Mutaciones
            en el gen <strong>ABCD1</strong> (región <strong>Xq28</strong>)
            alteran el transportador de membrana peroxisómica{" "}
            <strong>ALDP</strong> (con dominio de unión a ATP o{" "}
            <em>ATP-binding cassette</em>). Impide oxidar ácidos grasos de
            cadena muy larga, que se acumulan en{" "}
            <strong>sistema nervioso, glándulas suprarrenales y testículos</strong>,
            produciendo desmielinización intensa y muerte prematura en niños.
          </li>
        </ul>
      </Definicion>

      <Conexion>
        En la unidad de bioenergética mitocondrial ya viste cómo la mitocondria
        completa el ciclo de Krebs y la fosforilación oxidativa; el peroxisoma
        complementa esa ruta acortando ácidos grasos de cadena muy larga antes
        de enviar el acetil-CoA a la mitocondria.
      </Conexion>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="Respecto a la estructura y el metabolismo de los peroxisomas en el capítulo 11 de Calvo, ¿cuál afirmación es correcta?"
          opciones={[
            "Tienen doble membrana y ADN circular propio para traducir todas las enzimas de la beta-oxidación",
            "Importan proteínas plegadas con ATP, generan peróxido de hidrógeno y lo degradan con catalasa",
            "Completan la oxidación hasta dióxido de carbono y agua en su cadena respiratoria generando ATP",
            "Reciben todas sus enzimas de matriz mediante vesículas de clatrina procedentes de la red trans-Golgi",
          ]}
          correctaIdx={1}
          explicacion={
            "Paso 1: separa rasgos mitocondriales y peroxisómicos. Los peroxisomas tienen membrana simple, carecen de ADN propio y no poseen ciclo de Krebs ni cadena respiratoria; por eso no completan la oxidación hasta dióxido de carbono y agua ni generan ATP en su beta-oxidación.\n\n" +
            "Paso 2: revisa cómo llegan sus enzimas. Sus proteínas de matriz no viajan en vesículas de clatrina desde el Golgi, sino que se importan de forma postraduccional desde el citosol, ya plegadas, con señal C-terminal y ATP.\n\n" +
            "Conclusión: la afirmación correcta es que importan proteínas plegadas con ATP, generan peróxido de hidrógeno y lo degradan con catalasa."
          }
        />
      </div>
    </EscenaRica>
  );
}

/* ============================================================================
 * ESCENA 7 · Lo que más se pregunta y práctica final
 * ============================================================================ */

function EscPracticaFinal() {
  return (
    <EscenaRica>
      <Titulo>Lo que más se pregunta y práctica final</Titulo>

      <Misconception titulo="Confusión 1 · 'Peroxisomas y mitocondrias pertenecen al tráfico vesicular con el Golgi'">
        <strong>Realidad:</strong> ni las mitocondrias ni los peroxisomas
        reciben proteínas por importación cotraduccional al RER ni intercambian
        vesículas con el complejo de Golgi. Sus proteínas nucleares entran por{" "}
        <strong>importación postraduccional</strong> desde ribosomas libres del
        citosol y sus fosfolípidos llegan mediante{" "}
        <strong>proteínas intercambiadoras de fosfolípidos</strong>.
      </Misconception>

      <Misconception titulo="Confusión 2 · 'COPII vuelve al RER y COPI sale del RER hacia el Golgi'">
        <strong>Realidad:</strong> no los inviertas. <strong>COPII</strong>{" "}
        transporta carga en sentido{" "}
        <strong>anterógrado del RER al cis-Golgi</strong>;{" "}
        <strong>COPI</strong> devuelve en sentido{" "}
        <strong>retrógrado del Golgi al RER</strong> las proteínas residentes
        con señal <strong>KDEL</strong> (solubles) o <strong>KKXX</strong> (de
        membrana), además de actuar entre cisternas del Golgi y en la secreción
        constitutiva según Calvo.
      </Misconception>

      <Misconception titulo="Confusión 3 · 'Los peroxisomas producen ATP con su beta-oxidación igual que las mitocondrias'">
        <strong>Realidad:</strong> los peroxisomas acortan ácidos grasos de
        cadena muy larga, pero{" "}
        <strong>no tienen cadena respiratoria ni ciclo de Krebs</strong>. Sus
        oxidasas generan <MathText>{"$\\mathrm{H_2O_2}$"}</MathText>{" "}
        (neutralizado por la <strong>catalasa</strong>) y disipan energía como{" "}
        <strong>calor</strong>, mientras el acetil-CoA resultante pasa después a
        la mitocondria.
      </Misconception>

      <Cuidado>
        En preguntas de examen suelen cruzar dos marcadores universales y las
        patologías lisosomales: el marcador universal del{" "}
        <strong>lisosoma</strong> es la <strong>fosfatasa ácida</strong> (pH
        cercano a 5 por bomba V-ATPasa), mientras que el marcador universal del{" "}
        <strong>peroxisoma</strong> es la <strong>catalasa</strong>. En clínica,
        recuerda que la <strong>mucolipidosis tipo II</strong> (células I) falla
        en el marcaje <strong>M6P</strong> y deja las hidrolasas en el{" "}
        <strong>suero</strong>; en cambio, <strong>Gaucher</strong>{" "}
        (glucocerebrosidasa, la más común) y <strong>Fabry</strong>{" "}
        (alfa-galactosidasa A, ligada al X) fallan en una sola hidrolasa.
      </Cuidado>

      <Mnemotecnia>
        Tres atajos rápidos para el examen:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>COP-II = Ida</strong> (sale del RER hacia el Golgi);{" "}
            <strong>COP-I = Inversa</strong> (vuelve del Golgi al RER con{" "}
            <strong>KDEL</strong>).
          </li>
          <li>
            <strong>N-RER en bloque, O-Golgi en secuencia:</strong> la
            N-glucosilación transfiere 14 azúcares en bloque sobre asparragina
            en el RER; la O-glucosilación en el Golgi añade cadenas cortas en
            secuencia sobre serina, treonina o hidroxilisina.
          </li>
          <li>
            <strong>Zellweger = peroxina PEX1 (sin peroxisoma funcional)</strong>;{" "}
            <strong>Adrenoleucodistrofia = ABCD1 / ALDP (ligada al X, la más frecuente)</strong>.
          </li>
        </ul>
      </Mnemotecnia>

      <Resumen>
        <strong>Síntesis de examen (Calvo, cap. 10 y peroxisomas de cap. 11):</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>RER:</strong> cisternas con ribosomas (ausente en
            espermatozoides); basofilia difusa (células plasmáticas), basal
            (páncreas exocrino y glándulas salivales) y en grumos (hepatocitos y
            neuronas, donde se llaman cuerpos de Nissl).
            Importación cotraduccional: péptido señal N-terminal (16 a 30
            aminoácidos), SRP (1 ARN y 6 proteínas), receptor de SRP,
            translocón, GTP y peptidasa señal. N-glucosilación en bloque de 14
            azúcares por transferasa de oligosacáridos; puentes S-S por PDI en
            ambiente oxidante; BiP, calnexina y calreticulina; retrotranslocación
            al proteasoma y UPR.
          </li>
          <li>
            <strong>REL:</strong> túbulos sin ribosomas. Cuatro funciones:
            lípidos y esteroides (escramblasas), detoxificación hepática
            (citocromo P450 / CYP), glucógeno (glucosa-6-fosfatasa) y almacén de{" "}
            <MathText>{"$\\mathrm{Ca^{2+}}$"}</MathText> (retículo
            sarcoplásmico en músculo).
          </li>
          <li>
            <strong>Golgi:</strong> dictiosomas en cinco estaciones (CGN marca
            M6P, cis retira manosa, medial añade GlcNAc, trans añade galactosa y
            ácido siálico, TGN sulfata y clasifica). O-glucosilación secuencial
            (sobre serina, treonina o hidroxilisina), proteólisis
            (pre-proinsulina → proinsulina → insulina + péptido C) y transporte
            mixto (vesicular y maduración de cisternas).
          </li>
          <li>
            <strong>Tráfico y lisosomas:</strong> COPII (RER → Golgi), COPI
            (Golgi → RER con KDEL/KKXX), clatrina (TGN → lisosomas, endocitosis,
            secreción regulada); Rab-GTP dirige y v-SNARE con t-SNARE fusionan.
            Lisosomas: fosfatasa ácida, pH cercano a 5 por V-ATPasa, hasta 40
            hidrolasas, autofagia (macro, micro y mediada por chaperonas con
            KFERQ, Hsc70 y Lamp-2A). Patologías: silicosis, Fabry
            (alfa-galactosidasa A, X), Gaucher (glucocerebrosidasa, más común) y
            mucolipidosis tipo II (sin M6P, hidrolasas en suero).
          </li>
          <li>
            <strong>Peroxisomas:</strong> membrana simple sin ADN, cristaloide
            de urato oxidasa, marcador catalasa, importación postraduccional de
            proteínas plegadas (señal C-terminal PTS y ATP), PPAR-α y pexofagia.
            Beta-oxidación de ácidos grasos de cadena muy larga generando
            acetil-CoA (hacia mitocondria),{" "}
            <MathText>{"$\\mathrm{H_2O_2}$"}</MathText> (degradado por catalasa
            en <MathText>{"$\\mathrm{H_2O} + \\mathrm{O_2}$"}</MathText>) y
            calor; síntesis de plasmalógenos y ácidos biliares. Zellweger
            (peroxina PEX1) y adrenoleucodistrofia ligada al X (ABCD1 / ALDP).
          </li>
        </ul>
      </Resumen>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="Según Calvo (cap. 10), ¿qué relación entre tipo de basofilia citoplasmática del RER y tipo celular es correcta?"
          opciones={[
            "La basofilia en grumos es típica de hepatocitos y neuronas, donde forman los cuerpos de Nissl",
            "La basofilia basal es propia de las células plasmáticas y deja una zona central Golgi positiva",
            "La basofilia difusa es característica del páncreas exocrino por su RER agrupado en el polo basal",
            "Los espermatozoides poseen la basofilia difusa más intensa por contener abundante RER activo",
          ]}
          correctaIdx={0}
          explicacion={
            "Paso 1: repasa los tres patrones de basofilia citoplasmática en Calvo Cap. 10. La basofilia difusa corresponde a células plasmáticas (con zona Golgi negativa, no positiva); la basofilia basal aparece en células epiteliales del páncreas exocrino y glándulas salivales; y la basofilia en grumos es típica de hepatocitos y neuronas, donde las zonas basófilas corresponden a los grumos o cuerpos de Nissl.\n\n" +
            "Paso 2: descarta la afirmación sobre espermatozoides porque Calvo señala expresamente que el RER está presente en todas las células nucleadas excepto los espermatozoides.\n\n" +
            "Conclusión: la relación correcta es que la basofilia en grumos es típica de hepatocitos y neuronas, donde forman los cuerpos de Nissl."
          }
        />
      </div>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="En el retículo endoplasmático liso (REL) de un hepatocito, ¿qué par de enzimas permite respectivamente detoxificar fármacos liposolubles y liberar glucosa libre hacia la sangre?"
          opciones={[
            "Peptidasa señal y transferasa de oligosacáridos",
            "Isomerasa de puentes disulfuro y sulfotransferasa",
            "Escramblasa y N-acetilglucosamina fosfotransferasa",
            "Citocromo P450 y glucosa-6-fosfatasa",
          ]}
          correctaIdx={3}
          explicacion={
            "Paso 1: ubica las enzimas del REL hepático. Las familias del citocromo P450 (CYP), ancladas en su cara citosólica, modifican fármacos y toxinas liposolubles; y la glucosa-6-fosfatasa hidroliza la glucosa-6-fosfato en glucosa libre hacia la sangre.\n\n" +
            "Paso 2: descarta los otros pares por compartimento. Peptidasa señal, transferasa de oligosacáridos e isomerasa de puentes disulfuro actúan en el RER, mientras que sulfotransferasa y N-acetilglucosamina fosfotransferasa actúan en el complejo de Golgi.\n\n" +
            "Conclusión: el par correcto es citocromo P450 y glucosa-6-fosfatasa."
          }
        />
      </div>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="Si un paciente presenta deficiencia genética de la enzima N-acetilglucosamina fosfotransferasa, ¿qué ocurre con las hidrolasas lisosómicas y cómo se denomina esta enfermedad?"
          opciones={[
            "Quedan retenidas dentro del RER formando cuerpos de Russell y originan la enfermedad de Gaucher",
            "No reciben manosa-6-fosfato, se secretan al suero y causan mucolipidosis tipo II (células I)",
            "Quedan atrapadas en los endosomas tempranos unidas a retrómeros y producen la enfermedad de Fabry",
            "Son desviadas por error hacia los peroxisomas por la peroxina PEX1 causando síndrome de Zellweger",
          ]}
          correctaIdx={1}
          explicacion={
            "Paso 1: recuerda la función de la N-acetilglucosamina fosfotransferasa en la red cis-Golgi (CGN): añade el grupo fosfato a manosas terminales para formar la etiqueta manosa-6-fosfato (M6P).\n\n" +
            "Paso 2: sigue la consecuencia clínica. Sin M6P, los receptores de la TGN no empaquetan las hidrolasas hacia los lisosomas; estas siguen la ruta secretora al exterior y aparecen en el suero. Gaucher y Fabry afectan a una sola hidrolasa, y la peroxina PEX1 pertenece al síndrome de Zellweger.\n\n" +
            "Conclusión: las hidrolasas no reciben manosa-6-fosfato, se secretan al suero y causan mucolipidosis tipo II (enfermedad de células I)."
          }
        />
      </div>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="¿Qué papel cumplen las proteínas Rab y SNARE cuando una vesícula de transporte alcanza su compartimento diana?"
          opciones={[
            "Las proteínas Rab arman la jaula de clatrina vesicular y las SNARE estrangulan su cuello al desprenderse",
            "Las v-SNARE actúan solo en la secreción constitutiva y las Rab sintetizan oligosacáridos de 14 azúcares",
            "Rab-GTP con sus efectores dirige la vesícula a su diana y v-SNARE con t-SNARE anclan y fusionan bicapas",
            "Las t-SNARE desmontan la cubierta COPII en el citosol y fosforilan manosas terminales en la red cis-Golgi",
          ]}
          correctaIdx={2}
          explicacion={
            "Paso 1: separa reconocimiento y fusión. Las GTPasas Rab, activas como Rab-GTP, se unen a efectores de Rab para dirigir y acercar la vesícula a su compartimento diana específico.\n\n" +
            "Paso 2: revisa la unión de membranas y descarta confusiones. El enrollamiento entre v-SNARE (vesícula) y t-SNARE (membrana diana) aproxima ambas bicapas a unos 1,5 nm y promueve la fusión; ni Rab arma clatrina ni sintetiza oligosacáridos, y las SNARE tampoco fosforilan manosas ni desmontan COPII.\n\n" +
            "Conclusión: Rab-GTP con sus efectores dirige la vesícula a su diana y v-SNARE con t-SNARE anclan y fusionan las bicapas."
          }
        />
      </div>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="Considera estas tres proposiciones sobre los lisosomas y sus trastornos: 1) La enfermedad de Gaucher es el trastorno de almacenamiento lisosomal más común y se debe al déficit de glucocerebrosidasa. 2) La enfermedad de Fabry se liga al cromosoma X y se debe al déficit de alfa-galactosidasa A con acumulación de GL-3. 3) En la autofagia mediada por chaperonas, proteínas con secuencia KFERQ son reconocidas por Hsc70 y entran al lisosoma por Lamp-2A. ¿Cuáles son correctas?"
          opciones={[
            "Las tres proposiciones (1, 2 y 3) son correctas",
            "Solo las proposiciones 1 y 2 son correctas",
            "Solo las proposiciones 2 y 3 son correctas",
            "Solo las proposiciones 1 y 3 son correctas",
          ]}
          correctaIdx={0}
          explicacion={
            "Paso 1: comprueba las enfermedades de almacenamiento de Calvo Cap. 10. Gaucher es la más frecuente y obedece al déficit de glucocerebrosidasa (proposición 1 verdadera); Fabry se hereda ligada al cromosoma X por déficit de alfa-galactosidasa A con acúmulo de GL-3 (proposición 2 verdadera).\n\n" +
            "Paso 2: verifica la autofagia mediada por chaperonas. Las proteínas citosólicas con secuencia KFERQ son reconocidas por la chaperona Hsc70 e ingresan al lisosoma mediante Lamp-2A (proposición 3 verdadera).\n\n" +
            "Conclusión: las tres proposiciones (1, 2 y 3) son correctas."
          }
        />
      </div>

      <div style={{ width: "100%", maxWidth: 620, whiteSpace: "pre-line" }}>
        <AutoCheck
          pregunta="Un niño presenta desmielinización intensa y acumulación de ácidos grasos de cadena muy larga en sistema nervioso, glándulas suprarrenales y testículos por mutación en el gen ABCD1 (región Xq28) que codifica el transportador ALDP. ¿A qué trastorno peroxisomal corresponde este cuadro?"
          opciones={[
            "Síndrome de Zellweger por mutación en PEX1",
            "Silicosis pulmonar por ruptura de los lisosomas",
            "Adrenoleucodistrofia ligada al cromosoma X",
            "Mucolipidosis tipo II por ausencia de M6P",
          ]}
          correctaIdx={2}
          explicacion={
            "Paso 1: identifica el gen y la proteína alterados en Calvo Cap. 11. Las mutaciones en ABCD1 (región Xq28) afectan al transportador peroxisómico ALDP e impiden la beta-oxidación de ácidos grasos de cadena muy larga, causando desmielinización intensa y acúmulo en sistema nervioso, suprarrenales y testículos.\n\n" +
            "Paso 2: descarta los otros cuadros. El síndrome de Zellweger se debe a fallos en peroxinas como PEX1 que impiden ensamblar el orgánulo, mientras que la silicosis y la mucolipidosis tipo II son patologías lisosomales.\n\n" +
            "Conclusión: este cuadro corresponde a la adrenoleucodistrofia ligada al cromosoma X."
          }
        />
      </div>
    </EscenaRica>
  );
}
