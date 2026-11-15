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
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="BCM-06"
      tituloUnidad="BCM · Especializaciones de la membrana e interacción celular"
      escenas={[
        { titulo: "Microvellosidades y micropliegues", componente: EscMicrovellosidades },
        { titulo: "Moléculas de adhesión (CAM)", componente: EscMoleculasAdhesion },
        { titulo: "Uniones adherentes y desmosomas", componente: EscAdherentesDesmosomas },
        { titulo: "Hemidesmosomas, adhesiones focales y ocluyentes", componente: EscIntegrinasYOcluyentes },
        { titulo: "Uniones comunicantes (gap)", componente: EscUnionesGap },
        { titulo: "Membrana basal y lámina basal", componente: EscMembranaBasal },
        { titulo: "Matriz extracelular: fibras y colágeno", componente: EscFibrasMEC },
        { titulo: "Sustancia fundamental y glucoproteínas", componente: EscSustanciaFundamental },
        { titulo: "Repaso y práctica", componente: EscPractica },
      ]}
    />
  );
}

/* ---------------- Esquemas SVG con coordenadas calculadas ---------------- */

function SvgMicrovellosidades() {
  const W = 360;
  const H = 220;
  const MV_X = [36, 86, 136];
  const MV_W = 28;
  const TOP_Y = 28;
  const BASE_Y = 128;
  const LABEL_X = 202;
  const FOLD_BASE_Y = 166;
  const FOLD_BOT_Y = 204;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} rx={10} fill={LIENZO.bgSoft} />
        <text x={108} y={16} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontWeight={700}>
          Superficie apical (1 x 0,08 μm)
        </text>

        {MV_X.map((mx, idx) => {
          const cx = mx + MV_W / 2;
          return (
            <g key={mx}>
              <rect
                x={mx - 4}
                y={TOP_Y - 4}
                width={MV_W + 8}
                height={BASE_Y - TOP_Y + 6}
                rx={(MV_W + 8) / 2}
                fill="none"
                stroke={LIENZO.warn}
                strokeWidth={1.2}
                strokeDasharray="3 2"
              />
              <rect
                x={mx}
                y={TOP_Y}
                width={MV_W}
                height={BASE_Y - TOP_Y + 8}
                rx={MV_W / 2}
                fill={LIENZO.bg}
                stroke={LIENZO.fg}
                strokeWidth={1.6}
              />
              {[-5, 0, 5].map((dx) => (
                <line
                  key={dx}
                  x1={cx + dx}
                  y1={TOP_Y + 12}
                  x2={cx + dx}
                  y2={BASE_Y + 8}
                  stroke={LIENZO.accent}
                  strokeWidth={1.5}
                />
              ))}
              {[TOP_Y + 26, TOP_Y + 48, TOP_Y + 70].map((by) => (
                <line key={by} x1={cx - 6} y1={by} x2={cx + 6} y2={by} stroke={LIENZO.fg} strokeWidth={1.2} />
              ))}
              {[TOP_Y + 34, TOP_Y + 60, TOP_Y + 84].map((sy) => (
                <g key={sy}>
                  <line x1={mx + 2} y1={sy} x2={cx - 6} y2={sy - 3} stroke={LIENZO.ok} strokeWidth={1.3} />
                  <line x1={mx + MV_W - 2} y1={sy} x2={cx + 6} y2={sy - 3} stroke={LIENZO.ok} strokeWidth={1.3} />
                </g>
              ))}
              {idx === 2 && (
                <g>
                  <line x1={mx + MV_W + 4} y1={TOP_Y + 6} x2={LABEL_X - 4} y2={30} stroke={LIENZO.warn} strokeWidth={1} />
                  <line x1={cx + 5} y1={TOP_Y + 26} x2={LABEL_X - 4} y2={58} stroke={LIENZO.accent} strokeWidth={1} />
                  <line x1={mx + MV_W - 1} y1={TOP_Y + 60} x2={LABEL_X - 4} y2={88} stroke={LIENZO.ok} strokeWidth={1} />
                </g>
              )}
            </g>
          );
        })}

        <rect x={22} y={BASE_Y} width={164} height={14} rx={4} fill={LIENZO.bg} stroke={LIENZO.fgFaint} strokeWidth={1} />
        <line x1={26} y1={BASE_Y + 7} x2={182} y2={BASE_Y + 7} stroke={LIENZO.fgDim} strokeWidth={2} strokeDasharray="5 3" />
        <line x1={186} y1={BASE_Y + 7} x2={LABEL_X - 4} y2={122} stroke={LIENZO.fgDim} strokeWidth={1} />

        <line x1={14} y1={150} x2={346} y2={150} stroke={LIENZO.fgFaint} strokeWidth={1} strokeDasharray="4 4" />
        <text x={20} y={163} fill={LIENZO.fgDim} fontSize={9.5} fontWeight={700}>
          Zona basal
        </text>
        <path
          d={`M 30 ${FOLD_BASE_Y} L 54 ${FOLD_BASE_Y} L 54 ${FOLD_BOT_Y} L 74 ${FOLD_BOT_Y} L 74 ${FOLD_BASE_Y} L 98 ${FOLD_BASE_Y} L 98 ${FOLD_BOT_Y} L 118 ${FOLD_BOT_Y} L 118 ${FOLD_BASE_Y} L 142 ${FOLD_BASE_Y} L 142 ${FOLD_BOT_Y} L 162 ${FOLD_BOT_Y} L 162 ${FOLD_BASE_Y} L 184 ${FOLD_BASE_Y}`}
          fill="none"
          stroke={LIENZO.fg}
          strokeWidth={1.6}
        />
        <ellipse cx={86} cy={184} rx={7} ry={13} fill={LIENZO.warn} opacity={0.35} stroke={LIENZO.warn} strokeWidth={1.2} />
        <ellipse cx={130} cy={184} rx={7} ry={13} fill={LIENZO.warn} opacity={0.35} stroke={LIENZO.warn} strokeWidth={1.2} />

        <text x={LABEL_X} y={33} fill={LIENZO.warn} fontSize={10} fontWeight={700}>
          Glucocáliz (PAS+)
        </text>
        <text x={LABEL_X} y={61} fill={LIENZO.accent} fontSize={10} fontWeight={700}>
          Actina + villina/fimbrina
        </text>
        <text x={LABEL_X} y={91} fill={LIENZO.ok} fontSize={10} fontWeight={700}>
          Miosina I + calmodulina
        </text>
        <text x={LABEL_X} y={125} fill={LIENZO.fg} fontSize={10} fontWeight={700}>
          Red terminal (espectrina)
        </text>
        <text x={LABEL_X} y={180} fill={LIENZO.fg} fontSize={10} fontWeight={700}>
          Pliegues basales
        </text>
        <text x={LABEL_X} y={194} fill={LIENZO.fgDim} fontSize={9.5}>
          + mitocondrias (túbulo distal)
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgFamiliasCAM() {
  const W = 360;
  const H = 228;
  const PAD_X = 10;
  const GAP_X = 10;
  const CARD_W = (W - PAD_X * 2 - GAP_X) / 2;
  const CARD_H = 90;
  const ROW_Y = [26, 126];
  const COL_X = [PAD_X, PAD_X + CARD_W + GAP_X];

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} rx={10} fill={LIENZO.bgSoft} />
        <text x={W / 2} y={16} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={700}>
          Cuatro familias de moléculas de adhesión celular
        </text>

        {/* Cadherinas */}
        <g>
          <rect x={COL_X[0]} y={ROW_Y[0]} width={CARD_W} height={CARD_H} rx={8} fill={LIENZO.bg} stroke={LIENZO.fgFaint} />
          <text x={COL_X[0] + CARD_W / 2} y={ROW_Y[0] + 15} textAnchor="middle" fill={LIENZO.accent} fontSize={10.5} fontWeight={700}>
            1. Cadherinas
          </text>
          <line x1={COL_X[0] + 24} y1={ROW_Y[0] + 32} x2={COL_X[0] + 76} y2={ROW_Y[0] + 32} stroke={LIENZO.accent} strokeWidth={3} />
          <line x1={COL_X[0] + 89} y1={ROW_Y[0] + 32} x2={COL_X[0] + 141} y2={ROW_Y[0] + 32} stroke={LIENZO.accent} strokeWidth={3} />
          <circle cx={COL_X[0] + 82.5} cy={ROW_Y[0] + 32} r={5} fill={LIENZO.warn} />
          <text x={COL_X[0] + CARD_W / 2} y={ROW_Y[0] + 58} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={600}>
            Homodímeros · unión homófila
          </text>
          <text x={COL_X[0] + CARD_W / 2} y={ROW_Y[0] + 74} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
            Con Ca²⁺ · adhesión célula-célula
          </text>
        </g>

        {/* Integrinas */}
        <g>
          <rect x={COL_X[1]} y={ROW_Y[0]} width={CARD_W} height={CARD_H} rx={8} fill={LIENZO.bg} stroke={LIENZO.fgFaint} />
          <text x={COL_X[1] + CARD_W / 2} y={ROW_Y[0] + 15} textAnchor="middle" fill={LIENZO.ok} fontSize={10.5} fontWeight={700}>
            2. Integrinas (α y β)
          </text>
          <path d={`M ${COL_X[1] + 45} ${ROW_Y[0] + 42} L ${COL_X[1] + 58} ${ROW_Y[0] + 25}`} stroke={LIENZO.ok} strokeWidth={3.5} />
          <path d={`M ${COL_X[1] + 70} ${ROW_Y[0] + 42} L ${COL_X[1] + 64} ${ROW_Y[0] + 25}`} stroke={LIENZO.accent} strokeWidth={3.5} />
          <rect x={COL_X[1] + 82} y={ROW_Y[0] + 25} width={44} height={14} rx={3} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} />
          <text x={COL_X[1] + 104} y={ROW_Y[0] + 35} textAnchor="middle" fill={LIENZO.fg} fontSize={8.5} fontWeight={700}>
            RGD
          </text>
          <text x={COL_X[1] + CARD_W / 2} y={ROW_Y[0] + 58} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={600}>
            Heterodímeros · unión heterófila
          </text>
          <text x={COL_X[1] + CARD_W / 2} y={ROW_Y[0] + 74} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
            Ca²⁺/Mg²⁺ · une RGD / leucocitos
          </text>
        </g>

        {/* Selectinas */}
        <g>
          <rect x={COL_X[0]} y={ROW_Y[1]} width={CARD_W} height={CARD_H} rx={8} fill={LIENZO.bg} stroke={LIENZO.fgFaint} />
          <text x={COL_X[0] + CARD_W / 2} y={ROW_Y[1] + 15} textAnchor="middle" fill={LIENZO.warn} fontSize={10.5} fontWeight={700}>
            3. Selectinas (L, P, E)
          </text>
          <line x1={COL_X[0] + 36} y1={ROW_Y[1] + 33} x2={COL_X[0] + 78} y2={ROW_Y[1] + 33} stroke={LIENZO.warn} strokeWidth={3} />
          <circle cx={COL_X[0] + 86} cy={ROW_Y[1] + 33} r={6} fill={LIENZO.warn} />
          <polygon
            points={`${COL_X[0] + 104},${ROW_Y[1] + 27} ${COL_X[0] + 122},${ROW_Y[1] + 27} ${COL_X[0] + 128},${ROW_Y[1] + 33} ${COL_X[0] + 122},${ROW_Y[1] + 39} ${COL_X[0] + 104},${ROW_Y[1] + 39}`}
            fill="none"
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <text x={COL_X[0] + CARD_W / 2} y={ROW_Y[1] + 58} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={600}>
            Monómeros · unión heterófila
          </text>
          <text x={COL_X[0] + CARD_W / 2} y={ROW_Y[1] + 74} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
            Ca²⁺ · reconoce azúcares (temporal)
          </text>
        </g>

        {/* IgSF-CAM */}
        <g>
          <rect x={COL_X[1]} y={ROW_Y[1]} width={CARD_W} height={CARD_H} rx={8} fill={LIENZO.bg} stroke={LIENZO.fgFaint} />
          <text x={COL_X[1] + CARD_W / 2} y={ROW_Y[1] + 15} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={700}>
            4. IgSF-CAM
          </text>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={COL_X[1] + 48 + i * 14} cy={ROW_Y[1] + 33} r={6} fill="none" stroke={LIENZO.accent} strokeWidth={1.8} />
          ))}
          {[0, 1].map((i) => (
            <circle key={i} cx={COL_X[1] + 98 + i * 14} cy={ROW_Y[1] + 33} r={6} fill="none" stroke={LIENZO.ok} strokeWidth={1.8} />
          ))}
          <text x={COL_X[1] + CARD_W / 2} y={ROW_Y[1] + 58} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={600}>
            Lazos · homófila o heterófila
          </text>
          <text x={COL_X[1] + CARD_W / 2} y={ROW_Y[1] + 74} textAnchor="middle" fill={LIENZO.ok} fontSize={9} fontWeight={700}>
            INDEPENDIENTE de Ca²⁺
          </text>
        </g>
      </svg>
    </Pizarra>
  );
}

function SvgAnclajeCelula() {
  const W = 360;
  const H = 220;
  const P1_X = 8;
  const PW = 166;
  const P2_X = 186;
  const CX1 = P1_X + PW / 2;
  const CX2 = P2_X + PW / 2;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} rx={10} fill={LIENZO.bgSoft} />

        <rect x={P1_X} y={8} width={PW} height={H - 16} rx={8} fill={LIENZO.bg} stroke={LIENZO.fgFaint} />
        <text x={CX1} y={24} textAnchor="middle" fill={LIENZO.accent} fontSize={10.5} fontWeight={700}>
          Zonula adherens
        </text>
        <text x={CX1} y={37} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Cinturón continuo (apical)
        </text>

        <line x1={CX1 - 18} y1={50} x2={CX1 - 18} y2={132} stroke={LIENZO.fg} strokeWidth={2} />
        <line x1={CX1 + 18} y1={50} x2={CX1 + 18} y2={132} stroke={LIENZO.fg} strokeWidth={2} />
        <rect x={CX1 - 30} y={64} width={12} height={54} rx={2} fill={LIENZO.accent} opacity={0.28} stroke={LIENZO.accent} />
        <rect x={CX1 + 18} y={64} width={12} height={54} rx={2} fill={LIENZO.accent} opacity={0.28} stroke={LIENZO.accent} />
        {[74, 91, 108].map((y) => (
          <g key={y}>
            <line x1={CX1 - 18} y1={y} x2={CX1 + 18} y2={y} stroke={LIENZO.accent} strokeWidth={2.2} />
            <line x1={CX1 - 68} y1={y} x2={CX1 - 30} y2={y} stroke={LIENZO.ok} strokeWidth={2} />
            <line x1={CX1 + 30} y1={y} x2={CX1 + 68} y2={y} stroke={LIENZO.ok} strokeWidth={2} />
          </g>
        ))}

        <text x={CX1} y={150} textAnchor="middle" fill={LIENZO.ok} fontSize={9.5} fontWeight={700}>
          Filamentos de actina
        </text>
        <text x={CX1} y={165} textAnchor="middle" fill={LIENZO.fg} fontSize={9}>
          Cateninas α y β en placa
        </text>
        <text x={CX1} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Espesor 0,1-0,5 μm
        </text>
        <text x={CX1} y={195} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Espacio intercelular 20-40 nm
        </text>

        <rect x={P2_X} y={8} width={PW} height={H - 16} rx={8} fill={LIENZO.bg} stroke={LIENZO.fgFaint} />
        <text x={CX2} y={24} textAnchor="middle" fill={LIENZO.warn} fontSize={10.5} fontWeight={700}>
          Desmosoma (macula)
        </text>
        <text x={CX2} y={37} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Botón puntiforme resistente
        </text>

        <line x1={CX2 - 18} y1={50} x2={CX2 - 18} y2={132} stroke={LIENZO.fg} strokeWidth={2} />
        <line x1={CX2 + 18} y1={50} x2={CX2 + 18} y2={132} stroke={LIENZO.fg} strokeWidth={2} />
        <rect x={CX2 - 31} y={64} width={13} height={54} rx={5} fill={LIENZO.warn} opacity={0.35} stroke={LIENZO.warn} />
        <rect x={CX2 + 18} y={64} width={13} height={54} rx={5} fill={LIENZO.warn} opacity={0.35} stroke={LIENZO.warn} />
        {[72, 85, 98, 111].map((y) => (
          <line key={y} x1={CX2 - 18} y1={y} x2={CX2 + 18} y2={y} stroke={LIENZO.warn} strokeWidth={2.2} />
        ))}
        <path
          d={`M ${CX2 - 66} 62 C ${CX2 - 38} 72, ${CX2 - 38} 110, ${CX2 - 66} 120`}
          fill="none"
          stroke={LIENZO.bad}
          strokeWidth={2.2}
        />
        <path
          d={`M ${CX2 + 66} 62 C ${CX2 + 38} 72, ${CX2 + 38} 110, ${CX2 + 66} 120`}
          fill="none"
          stroke={LIENZO.bad}
          strokeWidth={2.2}
        />

        <text x={CX2} y={150} textAnchor="middle" fill={LIENZO.bad} fontSize={9.5} fontWeight={700}>
          Filamentos intermedios
        </text>
        <text x={CX2} y={165} textAnchor="middle" fill={LIENZO.fg} fontSize={9}>
          Desmogleínas y desmocolinas
        </text>
        <text x={CX2} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Sin cateninas α ni β
        </text>
        <text x={CX2} y={195} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Queratina · desmina · vimentina
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgEpitelioPolarizado() {
  const W = 360;
  const H = 236;
  const C1_X = 14;
  const CW = 94;
  const GAP = 14;
  const C2_X = C1_X + CW + GAP;
  const CELL_TOP = 36;
  const CELL_BOT = 180;
  const LABEL_X = 230;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} rx={10} fill={LIENZO.bgSoft} />
        <text x={115} y={20} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontWeight={700}>
          Dominio apical (luz)
        </text>

        <rect x={C1_X} y={CELL_TOP} width={CW} height={CELL_BOT - CELL_TOP} rx={6} fill={LIENZO.bg} stroke={LIENZO.fg} strokeWidth={1.6} />
        <rect x={C2_X} y={CELL_TOP} width={CW} height={CELL_BOT - CELL_TOP} rx={6} fill={LIENZO.bg} stroke={LIENZO.fg} strokeWidth={1.6} />

        {[50, 60, 70].map((y) => (
          <path
            key={y}
            d={`M ${C1_X + CW} ${y} L ${C1_X + CW + GAP / 2} ${y - 4} L ${C2_X} ${y}`}
            fill="none"
            stroke={LIENZO.accent}
            strokeWidth={2.2}
          />
        ))}
        <line x1={C2_X} y1={58} x2={LABEL_X - 4} y2={58} stroke={LIENZO.accent} strokeWidth={1} />
        <text x={LABEL_X} y={54} fill={LIENZO.accent} fontSize={10} fontWeight={700}>
          Unión ocluyente
        </text>
        <text x={LABEL_X} y={67} fill={LIENZO.fgDim} fontSize={9}>
          Ocludinas + claudinas + ZO
        </text>

        {/* Adhesión focal en zona basal lateral */}
        <line x1={C2_X + 34} y1={116} x2={C2_X + 76} y2={116} stroke={LIENZO.ok} strokeWidth={2.2} />
        <rect x={C2_X + 74} y={108} width={10} height={16} rx={2} fill={LIENZO.ok} />
        <line x1={C2_X + 84} y1={116} x2={LABEL_X - 4} y2={112} stroke={LIENZO.ok} strokeWidth={1} />
        <text x={LABEL_X} y={108} fill={LIENZO.ok} fontSize={10} fontWeight={700}>
          Adhesión focal
        </text>
        <text x={LABEL_X} y={121} fill={LIENZO.fgDim} fontSize={9}>
          Actina + talina + FAK (móvil)
        </text>

        {/* Hemidesmosoma basal */}
        <rect x={C2_X + 26} y={CELL_BOT - 12} width={40} height={12} rx={3} fill={LIENZO.warn} opacity={0.4} stroke={LIENZO.warn} />
        <path d={`M ${C2_X + 34} ${CELL_BOT - 30} Q ${C2_X + 46} ${CELL_BOT - 8} ${C2_X + 58} ${CELL_BOT - 30}`} fill="none" stroke={LIENZO.bad} strokeWidth={2} />
        <line x1={C2_X + 42} y1={CELL_BOT} x2={C2_X + 42} y2={CELL_BOT + 12} stroke={LIENZO.warn} strokeWidth={2.4} />
        <line x1={C2_X + 52} y1={CELL_BOT} x2={C2_X + 52} y2={CELL_BOT + 12} stroke={LIENZO.warn} strokeWidth={2.4} />
        <line x1={C2_X + 66} y1={CELL_BOT - 6} x2={LABEL_X - 4} y2={164} stroke={LIENZO.warn} strokeWidth={1} />
        <text x={LABEL_X} y={160} fill={LIENZO.warn} fontSize={10} fontWeight={700}>
          Hemidesmosoma
        </text>
        <text x={LABEL_X} y={173} fill={LIENZO.fgDim} fontSize={9}>
          α6β4 + BPGA2 + queratina
        </text>

        <rect x={C1_X} y={CELL_BOT + 8} width={CW * 2 + GAP} height={34} rx={5} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} />
        <text x={C1_X + CW + GAP / 2} y={CELL_BOT + 29} textAnchor="middle" fill={LIENZO.fg} fontSize={10} fontWeight={700}>
          Membrana basal (sustrato)
        </text>
        <text x={LABEL_X} y={208} fill={LIENZO.fgDim} fontSize={9}>
          Fija epitelio a la MEC
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgConexon() {
  const W = 360;
  const H = 220;
  const CX = 86;
  const CY = 104;
  const RING_R = 32;
  const SUB_R = 11.5;
  const RX = 266;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} rx={10} fill={LIENZO.bgSoft} />

        <text x={CX} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={700}>
          Conexón (vista frontal)
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = (i * Math.PI) / 3;
          const sx = CX + RING_R * Math.cos(ang);
          const sy = CY + RING_R * Math.sin(ang);
          return (
            <circle key={i} cx={sx} cy={sy} r={SUB_R} fill={LIENZO.bg} stroke={LIENZO.accent} strokeWidth={2.2} />
          );
        })}
        <circle cx={CX} cy={CY} r={11} fill={LIENZO.ok} opacity={0.25} stroke={LIENZO.ok} strokeWidth={1.6} />
        <text x={CX} y={CY + 3.5} textAnchor="middle" fill={LIENZO.ok} fontSize={8.5} fontWeight={700}>
          poro
        </text>

        <text x={CX} y={168} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={700}>
          6 conexinas en hexágono
        </text>
        <text x={CX} y={183} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Canal 1,5-2 nm (pasa ≤ 1,2 nm)
        </text>
        <text x={CX} y={198} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Diámetro ~6,5 nm · separación 2-5 nm
        </text>

        <line x1={174} y1={16} x2={174} y2={204} stroke={LIENZO.fgFaint} strokeWidth={1} strokeDasharray="4 4" />

        {/* Estado abierto */}
        <rect x={188} y={16} width={158} height={90} rx={8} fill={LIENZO.bg} stroke={LIENZO.ok} strokeWidth={1.4} />
        <text x={RX} y={32} textAnchor="middle" fill={LIENZO.ok} fontSize={10} fontWeight={700}>
          Canal ABIERTO
        </text>
        <line x1={204} y1={48} x2={328} y2={48} stroke={LIENZO.fgDim} strokeWidth={2} />
        <line x1={204} y1={68} x2={328} y2={68} stroke={LIENZO.fgDim} strokeWidth={2} />
        <rect x={252} y={40} width={28} height={36} rx={4} fill={LIENZO.ok} opacity={0.22} stroke={LIENZO.ok} strokeWidth={1.6} />
        <text x={RX} y={61} textAnchor="middle" fill={LIENZO.ok} fontSize={9} fontWeight={700}>
          ↓↑
        </text>
        <text x={RX} y={92} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Iones, aa, nucleótidos, AMPc
        </text>

        {/* Estado cerrado */}
        <rect x={188} y={116} width={158} height={90} rx={8} fill={LIENZO.bg} stroke={LIENZO.bad} strokeWidth={1.4} />
        <text x={RX} y={132} textAnchor="middle" fill={LIENZO.bad} fontSize={10} fontWeight={700}>
          Canal CERRADO
        </text>
        <line x1={204} y1={148} x2={328} y2={148} stroke={LIENZO.fgDim} strokeWidth={2} />
        <line x1={204} y1={168} x2={328} y2={168} stroke={LIENZO.fgDim} strokeWidth={2} />
        <rect x={256} y={142} width={20} height={32} rx={3} fill={LIENZO.bad} opacity={0.25} stroke={LIENZO.bad} strokeWidth={1.6} />
        <line x1={258} y1={152} x2={274} y2={164} stroke={LIENZO.bad} strokeWidth={2} />
        <line x1={274} y1={152} x2={258} y2={164} stroke={LIENZO.bad} strokeWidth={2} />
        <text x={RX} y={190} textAnchor="middle" fill={LIENZO.bad} fontSize={9} fontWeight={700}>
          ↑ Ca²⁺ intracelular o ↓ pH
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgMembranaBasal() {
  const W = 360;
  const H = 224;
  const LX = 12;
  const LW = 192;
  const RX = 216;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} rx={10} fill={LIENZO.bgSoft} />

        {/* Célula epitelial */}
        <rect x={LX} y={14} width={LW} height={36} rx={6} fill={LIENZO.bg} stroke={LIENZO.fg} strokeWidth={1.6} />
        <text x={LX + LW / 2} y={36} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={700}>
          Célula epitelial (base)
        </text>
        {[48, 108, 168].map((x) => (
          <line key={x} x1={x} y1={50} x2={x} y2={62} stroke={LIENZO.ok} strokeWidth={2.5} />
        ))}
        <text x={RX} y={36} fill={LIENZO.ok} fontSize={9.5} fontWeight={700}>
          Integrinas de membrana
        </text>

        {/* Lámina lúcida */}
        <rect x={LX} y={56} width={LW} height={30} rx={4} fill={LIENZO.bg} stroke={LIENZO.fgFaint} />
        <text x={LX + LW / 2} y={75} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5} fontWeight={700}>
          Lámina lúcida / rara (40-60 nm)
        </text>
        <text x={RX} y={74} fill={LIENZO.fg} fontSize={9.5}>
          Laminina fija integrinas
        </text>

        {/* Lámina densa */}
        <rect x={LX} y={88} width={LW} height={48} rx={4} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} />
        <line x1={22} y1={104} x2={192} y2={120} stroke={LIENZO.accent} strokeWidth={1.4} />
        <line x1={22} y1={120} x2={192} y2={104} stroke={LIENZO.accent} strokeWidth={1.4} />
        <text x={LX + LW / 2} y={108} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={700}>
          Lámina densa (red 3-4 nm)
        </text>
        <text x={LX + LW / 2} y={124} textAnchor="middle" fill={LIENZO.fg} fontSize={9}>
          − Perlecano (heparán sulfato) −
        </text>
        <text x={RX} y={107} fill={LIENZO.accent} fontSize={9.5} fontWeight={700}>
          Colágeno IV + entactina
        </text>
        <text x={RX} y={122} fill={LIENZO.fgDim} fontSize={9}>
          Carga (−) filtra proteínas
        </text>

        {/* Lámina fibrorreticular */}
        <rect x={LX} y={140} width={LW} height={42} rx={4} fill={LIENZO.bg} stroke={LIENZO.warn} />
        <line x1={24} y1={152} x2={188} y2={172} stroke={LIENZO.warn} strokeWidth={1.4} strokeDasharray="4 3" />
        <line x1={24} y1={172} x2={188} y2={152} stroke={LIENZO.warn} strokeWidth={1.4} strokeDasharray="4 3" />
        <text x={LX + LW / 2} y={165} textAnchor="middle" fill={LIENZO.warn} fontSize={10} fontWeight={700}>
          Lámina fibrorreticular
        </text>
        <text x={RX} y={160} fill={LIENZO.warn} fontSize={9.5} fontWeight={700}>
          Fibras reticulares
        </text>
        <text x={RX} y={173} fill={LIENZO.fgDim} fontSize={9}>
          Tejido conjuntivo (plata+)
        </text>

        <text x={W / 2} y={206} textAnchor="middle" fill={LIENZO.fg} fontSize={9} fontWeight={700}>
          Membrana basal (0,5-1,5 μm) = Lámina basal + fibrorreticular
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgFibrasMEC() {
  const W = 360;
  const H = 224;
  const ROD_W = 128;
  const GAP = 16;
  const SHIFT = 32;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} rx={10} fill={LIENZO.bgSoft} />

        <text x={W / 2} y={18} textAnchor="middle" fill={LIENZO.accent} fontSize={10.5} fontWeight={700}>
          Colágeno · tropocolágeno (280 nm) escalonado
        </text>
        {[0, 1, 2, 3].map((row) => {
          const y = 32 + row * 14;
          const x1 = 22 + row * SHIFT;
          const x2 = x1 + ROD_W + GAP;
          return (
            <g key={row}>
              <rect x={x1} y={y} width={ROD_W} height={8} rx={4} fill={LIENZO.accent} opacity={0.8} />
              {x2 + 60 < W - 16 && (
                <rect x={x2} y={y} width={W - 18 - x2} height={8} rx={4} fill={LIENZO.accent} opacity={0.55} />
              )}
            </g>
          );
        })}
        {[54, 86, 118, 150, 182].map((gx) => (
          <line key={gx} x1={gx} y1={28} x2={gx} y2={92} stroke={LIENZO.fgDim} strokeWidth={1} strokeDasharray="3 2" />
        ))}
        <text x={W / 2} y={106} textAnchor="middle" fill={LIENZO.fg} fontSize={9} fontWeight={700}>
          Estriación cada 67 nm · hueco cabeza-cola 37 nm · se repite cada 5 hileras
        </text>

        <line x1={14} y1={118} x2={346} y2={118} stroke={LIENZO.fgFaint} strokeWidth={1} />

        <text x={W / 2} y={136} textAnchor="middle" fill={LIENZO.warn} fontSize={10.5} fontWeight={700}>
          Fibra elástica (estira hasta 1,5 veces)
        </text>
        <rect x={44} y={148} width={272} height={36} rx={18} fill={LIENZO.warn} opacity={0.22} stroke={LIENZO.warn} strokeWidth={1.6} />
        {[148, 153, 180, 185].map((fy) => (
          <line key={fy} x1={52} y1={fy} x2={308} y2={fy} stroke={LIENZO.fg} strokeWidth={1.4} strokeDasharray="8 3" />
        ))}
        <text x={W / 2} y={170} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={700}>
          Centro amorfo: elastina (desmosina e isodesmosina)
        </text>
        <text x={W / 2} y={204} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Periferia: microfibrillas de fibrilina (10-12 nm, periodicidad 56 nm)
        </text>
      </svg>
    </Pizarra>
  );
}

function SvgSustanciaFundamental() {
  const W = 360;
  const H = 220;
  const HIAL_X1 = 22;
  const HIAL_X2 = 166;
  const HIAL_Y = 104;
  const CROSS_X = 266;
  const CROSS_TOP = 42;
  const CROSS_BOT = 158;
  const ARM_Y = 78;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <rect x={0} y={0} width={W} height={H} rx={10} fill={LIENZO.bgSoft} />

        {/* Izquierda: agregado de PG + hialuronato */}
        <text x={94} y={20} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={700}>
          Agregado de proteoglucanos
        </text>
        <line x1={HIAL_X1} y1={HIAL_Y} x2={HIAL_X2} y2={HIAL_Y} stroke={LIENZO.accent} strokeWidth={3.2} />
        {[48, 94, 140].map((px, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          const yEnd = HIAL_Y + dir * 48;
          return (
            <g key={px}>
              <line x1={px} y1={HIAL_Y} x2={px} y2={yEnd} stroke={LIENZO.fg} strokeWidth={2.2} />
              {[14, 24, 34, 42].map((dy) => (
                <line
                  key={dy}
                  x1={px - 11}
                  y1={HIAL_Y + dir * dy}
                  x2={px + 11}
                  y2={HIAL_Y + dir * dy}
                  stroke={LIENZO.ok}
                  strokeWidth={1.6}
                />
              ))}
            </g>
          );
        })}
        <text x={94} y={176} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={700}>
          Eje: hialuronato (no sulfatado)
        </text>
        <text x={94} y={191} textAnchor="middle" fill={LIENZO.ok} fontSize={9}>
          Cargas (−) atraen Na⁺ y agua
        </text>
        <text x={94} y={205} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Turgencia frente a compresión
        </text>

        <line x1={182} y1={14} x2={182} y2={208} stroke={LIENZO.fgFaint} strokeWidth={1} strokeDasharray="4 4" />

        {/* Derecha: laminina en cruz latina */}
        <text x={CROSS_X} y={20} textAnchor="middle" fill={LIENZO.warn} fontSize={10} fontWeight={700}>
          Laminina (cruz latina, 850 kDa)
        </text>
        <line x1={CROSS_X} y1={CROSS_TOP} x2={CROSS_X} y2={CROSS_BOT} stroke={LIENZO.warn} strokeWidth={4} strokeLinecap="round" />
        <line x1={CROSS_X - 44} y1={ARM_Y} x2={CROSS_X + 44} y2={ARM_Y} stroke={LIENZO.accent} strokeWidth={3.5} strokeLinecap="round" />
        <text x={CROSS_X - 48} y={ARM_Y + 3} textAnchor="end" fill={LIENZO.accent} fontSize={9} fontWeight={700}>
          β
        </text>
        <text x={CROSS_X + 48} y={ARM_Y + 3} textAnchor="start" fill={LIENZO.accent} fontSize={9} fontWeight={700}>
          γ
        </text>
        <text x={CROSS_X + 10} y={132} fill={LIENZO.warn} fontSize={9.5} fontWeight={700}>
          α
        </text>
        <text x={CROSS_X} y={176} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={700}>
          Une integrina, colágeno IV,
        </text>
        <text x={CROSS_X} y={191} textAnchor="middle" fill={LIENZO.fg} fontSize={9.5} fontWeight={700}>
          entactina y heparán sulfato
        </text>
        <text x={CROSS_X} y={205} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
          Exclusiva de lámina basal
        </text>
      </svg>
    </Pizarra>
  );
}

/* ------------------------------ Escenas ------------------------------ */

function EscMicrovellosidades() {
  return (
    <EscenaRica>
      <Titulo>Superficie libre y basal · microvellosidades y micropliegues</Titulo>

      <Hook>
        Tu intestino mide varios metros, pero necesita absorber nutrientes para todo el
        cuerpo en cuestión de horas. ¿Cómo logra multiplicar por decenas su superficie de
        absorción sin ocupar más espacio? Plegando su membrana plasmática en millones de
        prolongaciones microscópicas.
      </Hook>

      <Puente>
        Piensa en una toalla extendida frente a la misma toalla doblada en acordeón: tiene
        mucha más tela que una superficie lisa del mismo ancho. En un epitelio, la célula
        divide su membrana en <strong>superficie libre</strong> (hacia la luz) y{" "}
        <strong>superficie de contacto</strong> (hacia otras células o hacia la matriz
        extracelular, MEC). Además, la mayoría de las células necesitan estar adheridas para
        sobrevivir: si pierden contacto mueren por <strong>anoikis</strong> (apoptosis por
        falta de adhesión).
      </Puente>

      <SvgMicrovellosidades />

      <Definicion termino="Microvellosidades">
        Proyecciones digitiformes de la superficie apical que aumentan el área de absorción;
        miden aproximadamente{" "}
        <MathText>{"$1\\,\\mu\\mathrm{m}$"}</MathText> de largo por{" "}
        <MathText>{"$0{,}08\\,\\mu\\mathrm{m}$"}</MathText> de ancho. Su eje tiene 20 a 30{" "}
        <strong>filamentos de actina</strong> enlazados entre sí por{" "}
        <strong>villina y fimbrina</strong>, y fijados a la membrana plasmática por{" "}
        <strong>miosina I y calmodulina</strong>. En su base se anclan a la{" "}
        <strong>red o velo terminal</strong> (con espectrina, miosina y filamentos
        intermedios de queratina). Presentan un <strong>glucocáliz</strong> desarrollado
        teñible con PAS.
      </Definicion>

      <Definicion termino="Micropliegues: interdigitaciones y pliegues basales">
        Invaginaciones angostas en la superficie de contacto: las{" "}
        <strong>interdigitaciones</strong> refuerzan la unión en caras laterales, mientras
        que los <strong>pliegues basales</strong> (profundos en el túbulo contorneado
        distal del riñón) aumentan el área para transportadores iónicos y alojan numerosas{" "}
        <strong>mitocondrias</strong> entre ellos para aportar energía al intercambio iónico
        y osmótico.
      </Definicion>

      <PorQue>
        Al microscopio óptico, las microvellosidades densas forman la{" "}
        <strong>chapa estriada</strong> del epitelio intestinal y el{" "}
        <strong>ribete en cepillo</strong> del túbulo contorneado proximal del riñón;
        también abundan en los plexos coroideos. En la superficie libre existen además cilios
        y flagelos, cuyo detalle estructural se explica en el capítulo 12 del texto.
      </PorQue>

      <Ejemplo titulo="Clínica del capítulo: intolerancia a la lactosa y hemocromatosis">
        En la membrana microvellosa intestinal hay enzimas y transportadores esenciales:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Intolerancia a la lactosa:</strong> déficit de <strong>lactasas</strong>{" "}
            en microvellosidades de enterocitos; no se desdobla la lactosa en glucosa y
            galactosa y aparece diarrea.
          </li>
          <li>
            <strong>Hemocromatosis:</strong> enfermedad genética autosómica recesiva por
            mutación del gen <strong>HFE</strong>, con sobreexpresión del transportador{" "}
            <strong>DMT-1</strong> en microvellosidades intestinales y absorción excesiva de
            hierro que se acumula en hígado, corazón (miocardiopatía) e hipófisis
            (hipogonadismo hipogonadotrópico).
          </li>
        </ul>
      </Ejemplo>

      <Cuidado>
        No confundas el <strong>túbulo contorneado proximal</strong> del riñón (ribete en
        cepillo = microvellosidades apicales) con el{" "}
        <strong>túbulo contorneado distal</strong> (pliegues basales ricos en
        mitocondrias). Y recuerda: el capítulo 6 trata las microvellosidades y los
        micropliegues, mientras que cilios y flagelos quedan para el capítulo 12 (y los
        estereocilios no forman parte de este tema).
      </Cuidado>

      {/* basado en: formato Medicina 2 afirmaciones (2025-primer-parcial-curso-basico-2024-2025.md P26-50) */}
      <AutoCheck
        pregunta={
          "Respecto a las diferenciaciones de la membrana plasmática:\n" +
          "1) Las microvellosidades contienen 20 a 30 filamentos de actina enlazados por villina y fimbrina, fijados a la membrana por miosina I y calmodulina.\n" +
          "2) Los pliegues basales del túbulo contorneado distal albergan abundantes mitocondrias en la superficie libre luminal."
        }
        opciones={["Solo 1", "Solo 2", "1 y 2 (ambas)", "Ninguna"]}
        correctaIdx={0}
        explicacion="La afirmación 1 es verdadera. La afirmación 2 es falsa: los pliegues basales están en la superficie basal de contacto, no en la superficie libre luminal."
      />
    </EscenaRica>
  );
}

function EscMoleculasAdhesion() {
  return (
    <EscenaRica>
      <Titulo>Moléculas de adhesión celular (CAM) · las cuatro familias</Titulo>

      <Hook>
        ¿Cómo logra una célula epitelial quedarse fija años en su lugar mientras un
        leucocito rueda por la pared de un vaso sanguíneo, frena de golpe y sale hacia un
        tejido infectado? Todo depende del tipo de velcro molecular que exponga su membrana.
      </Hook>

      <Puente>
        Si una proteína se pega a otra idéntica en la célula vecina es una{" "}
        <strong>unión homófila</strong> (como dos tiras iguales de velcro); si se une a una
        molécula diferente es una <strong>unión heterófila</strong> (como una llave con su
        cerradura). Algunas además necesitan{" "}
        <MathText>{"$\\text{Ca}^{2+}$"}</MathText> para mantenerse rígidas y activas.
      </Puente>

      <SvgFamiliasCAM />

      <Definicion termino="Las 4 familias principales de CAM">
        Glucoproteínas transmembrana que median uniones estables o transitorias (un{" "}
        <strong>monómero</strong> tiene 1 cadena; un <strong>homodímero</strong>, 2
        iguales; un <strong>heterodímero</strong>, 2 distintas):
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Cadherinas:</strong> homodímeros dependientes de{" "}
            <MathText>{"$\\text{Ca}^{2+}$"}</MathText> con uniones{" "}
            <strong>homófilas</strong> célula-célula.
          </li>
          <li>
            <strong>Integrinas:</strong> heterodímeros (<strong>α</strong> y{" "}
            <strong>β</strong>) dependientes de{" "}
            <MathText>{"$\\text{Ca}^{2+}$"}</MathText> o{" "}
            <MathText>{"$\\text{Mg}^{2+}$"}</MathText>, de unión <strong>heterófila</strong>{" "}
            célula-MEC (secuencia RGD) y célula-célula transitoria en inmunidad.
          </li>
          <li>
            <strong>Selectinas:</strong> monómeros dependientes de{" "}
            <MathText>{"$\\text{Ca}^{2+}$"}</MathText>, de unión <strong>heterófila</strong>{" "}
            a oligosacáridos de otra célula: <strong>L</strong> (leucocitos),{" "}
            <strong>P</strong> (plaquetas y endotelio, inducida por histamina/trombina y
            TNF-α) y <strong>E</strong> (endotelio, aumentada por TNF-α).
          </li>
          <li>
            <strong>IgSF-CAM (superfamilia de inmunoglobulinas):</strong> monómeros con
            lazos tipo inmunoglobulina, <strong>sin sitios de unión para{" "}
            <MathText>{"$\\text{Ca}^{2+}$"}</MathText></strong>{" "}
            (independientes del calcio); hacen uniones homófilas (como <strong>NCAM</strong>{" "}
            neuronal) o heterófilas (como <strong>ICAM</strong> y <strong>VCAM</strong>{" "}
            endoteliales con las integrinas leucocitarias <strong>LFA-1</strong> y{" "}
            <strong>Mac-1</strong>).
          </li>
        </ul>
      </Definicion>

      <PorQue>
        Sin adhesión estable no habría tejidos organizados; y sin la cascada transitoria de
        selectinas más IgSF-CAM e integrinas, los leucocitos no podrían adherirse al endotelio
        y migrar (extravasación) hacia un foco inflamatorio. Tanto selectinas como integrinas
        participan también en procesos tumorales y metástasis.
      </PorQue>

      <Ejemplo titulo="Clínica del capítulo: trasplantes y bloqueo anti-LFA-1">
        En trasplantes de órganos se utilizan anticuerpos <strong>anti-LFA-1</strong> para
        bloquear la unión heterófila entre la integrina LFA-1 de los linfocitos y su
        receptor ICAM en el endotelio; esto reduce la llegada de células inflamatorias al
        órgano trasplantado y frena la activación linfocitaria coestimulada, disminuyendo la
        tasa de rechazo.
      </Ejemplo>

      <Cuidado>
        Las <strong>IgSF-CAM son la única familia de las cuatro que NO depende de{" "}
        <MathText>{"$\\text{Ca}^{2+}$"}</MathText></strong>.
        Además, recuerda que las <strong>selectinas</strong> reconocen{" "}
        <strong>hidratos de carbono (oligosacáridos)</strong> en otra célula, por lo que su
        unión siempre es heterófila.
      </Cuidado>

      {/* basado en: formato Medicina 3 afirmaciones (2025-segundo-parcial-curso-basico-2024-2025.md P76-100) */}
      <AutoCheck
        pregunta={
          "Con relación a las familias de moléculas de adhesión celular:\n" +
          "1) Las selectinas forman homodímeros dependientes de Ca²⁺ con uniones homófilas entre leucocitos.\n" +
          "2) Las moléculas IgSF-CAM carecen de sitios de unión para Ca²⁺ y establecen tanto uniones homófilas (NCAM) como heterófilas (ICAM con integrinas).\n" +
          "3) Las cadherinas reconocen la secuencia RGD de la laminina mediante su subunidad β."
        }
        opciones={["Solo 1", "Solo 2", "Solo 3", "Todas (1, 2 y 3)", "Ninguna"]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es verdadera. Las selectinas son monómeros heterófilos que se unen a carbohidratos (1 falsa), y la secuencia RGD se une a la subunidad β de las integrinas, no a las cadherinas (3 falsa)."
      />
    </EscenaRica>
  );
}

function EscAdherentesDesmosomas() {
  return (
    <EscenaRica>
      <Titulo>Uniones de anclaje célula-célula · adherentes y desmosomas</Titulo>

      <Hook>
        En cada latido, tus células musculares cardíacas tiran unas de otras con fuerza. ¿Qué
        impide que el corazón o tu piel sometida a roce se desgarren en células sueltas?
      </Hook>

      <Puente>
        Para sostener una tela sometida a tensión puedes usar una costura corrida como un{" "}
        <strong>cinturón</strong> que abraza todo el borde apical, o bien{" "}
        <strong>remaches puntuales</strong> muy resistentes repartidos por las paredes
        laterales. Esas dos arquitecturas corresponden a la <em>zonula adherens</em> y al
        desmosoma.
      </Puente>

      <Definicion termino="Cadherinas en la adhesión epitelial">
        Proteínas de un solo paso transmembrana de 700 a 750 aminoácidos, con 5 dominios
        extracelulares (4 homólogos con sitios de <MathText>{"$\\text{Ca}^{2+}$"}</MathText>
        ). Comprenden más de 40 miembros, como la <strong>cadherina E</strong> (epitelios)
        y la <strong>cadherina N</strong> (tejido nervioso, cristalino y músculo esquelético
        y cardíaco).
      </Definicion>

      <SvgAnclajeCelula />

      <Definicion termino="Zonula adherens vs. Macula adherens (desmosoma)">
        Ambas dejan un espacio intercelular de{" "}
        <MathText>{"$20\\text{ a }40\\text{ nm}$"}</MathText> y miden alrededor de{" "}
        <MathText>{"$0{,}1\\text{ a }0{,}5\\,\\mu\\mathrm{m}$"}</MathText>, pero se anclan a
        distintos filamentos del citoesqueleto:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Zonula adherens (cinturón de adhesión):</strong> banda continua en la
            zona apical lateral; un complejo de <strong>cateninas α y β</strong> enlaza la
            placa (con desmoplaquina, placofilina y placoglobina o catenina γ) a{" "}
            <strong>filamentos de actina</strong>.
          </li>
          <li>
            <strong>Macula adherens (desmosoma):</strong> unión <strong>puntiforme</strong>{" "}
            lateral y en los <strong>discos intercalares cardíacos</strong>. Sus cadherinas
            son <strong>desmocolinas y desmogleínas</strong> (en epidermis, desmogleínas 1 y
            3), <strong>NO posee cateninas α ni β</strong>, y su placa ancla directamente{" "}
            <strong>filamentos intermedios</strong>: <strong>queratina</strong>{" "}
            (tonofilamentos) en piel, <strong>desmina</strong> en cardiomiocitos y{" "}
            <strong>vimentina</strong> en meninges.
          </li>
        </ul>
      </Definicion>

      <PorQue>
        La <em>zonula adherens</em> coordina la red contráctil de actina entre células
        epiteliales vecinas, mientras que los desmosomas distribuyen la tensión mecánica a
        través de toda la malla de filamentos intermedios de la piel y el miocardio.
      </PorQue>

      <Ejemplo titulo="Clínica del capítulo: pénfigo vulgar y pénfigo foliáceo">
        Cuando el sistema inmunitario produce autoanticuerpos IgG contra las desmogleínas de
        los queratinocitos epidérmicos, se desorganizan los desmosomas y las células se
        separan (<strong>acantólisis</strong>):
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Pénfigo vulgar (PV):</strong> anticuerpos contra{" "}
            <strong>desmogleína 3</strong> (capa basal de piel y mucosas) y/o{" "}
            <strong>desmogleína 1</strong>; origina acantólisis por encima de la capa basal
            con ampollas frágiles en piel y mucosa oral, dolor y riesgo de infección.
          </li>
          <li>
            <strong>Pénfigo foliáceo:</strong> anticuerpos solo contra{" "}
            <strong>desmogleína 1</strong>; las ampollas quedan en niveles superficiales de la
            epidermis y el pronóstico es mejor que en el PV.
          </li>
        </ul>
      </Ejemplo>

      <Cuidado>
        No confundas los filamentos que anclan: <strong>cinturón = actina</strong> (con
        cateninas α y β); <strong>desmosoma = filamentos intermedios</strong> (sin cateninas
        α ni β). Además, recuerda qué filamento intermedio usa el desmosoma según el tejido:
        queratina en epidermis, desmina en corazón y vimentina en meninges.
      </Cuidado>

      {/* basado en: formato Medicina 2 afirmaciones (2025-primer-parcial-curso-basico-2024-2025.md P26-50) */}
      <AutoCheck
        pregunta={
          "En relación con el desmosoma y sus patologías:\n" +
          "1) Es una unión puntiforme sin cateninas α ni β cuya placa se une a filamentos intermedios (como queratina en piel o desmina en cardiomiocitos).\n" +
          "2) En el pénfigo vulgar existen autoanticuerpos IgG dirigidos frente a la desmogleína 3 (y/o desmogleína 1), lo que provoca acantólisis y ampollas frágiles."
        }
        opciones={["Solo 1", "Solo 2", "1 y 2 (ambas)", "Ninguna"]}
        correctaIdx={2}
        explicacion="Ambas afirmaciones son verdaderas: los desmosomas anclan filamentos intermedios sin cateninas α y β, y en el pénfigo vulgar los IgG anti-desmogleína 3/1 rompen los desmosomas epidérmicos (acantólisis)."
      />
    </EscenaRica>
  );
}

function EscIntegrinasYOcluyentes() {
  return (
    <EscenaRica>
      <Titulo>Hemidesmosomas, adhesiones focales y uniones ocluyentes</Titulo>

      <Hook>
        Para que tu intestino absorba nutrientes sin dejar pasar bacterias ni tóxicos por los
        espacios entre células, necesita dos sistemas distintos: un sello hermético arriba y
        anclas firmes abajo contra la membrana basal.
      </Hook>

      <Puente>
        Imagina un departamento junto al río: necesitas un{" "}
        <strong>cierre hermético en las ventanas</strong> para que no se filtre el agua por
        las rendijas (unión ocluyente) y <strong>pilotes hundidos en el cimiento</strong>{" "}
        para que la estructura no se despegue del suelo (hemidesmosomas y adhesiones
        focales).
      </Puente>

      <SvgEpitelioPolarizado />

      <Definicion termino="Uniones célula-MEC por integrinas">
        Las integrinas tienen subunidad <strong>α</strong> (con sitios de{" "}
        <MathText>{"$\\text{Ca}^{2+}$"}</MathText> y{" "}
        <MathText>{"$\\text{Mg}^{2+}$"}</MathText>) y subunidad <strong>β</strong> (une el
        tripéptido <strong>RGD</strong> de fibronectina y laminina):
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Hemidesmosoma:</strong> unión <strong>estable</strong> en células
            sésiles ("medio desmosoma" basal). Usa <strong>integrina α6β4</strong>, la
            proteína transmembrana <strong>BPGA2</strong> y una placa de{" "}
            <strong>plaquinas</strong> que ancla{" "}
            <strong>filamentos intermedios de queratina (tonofilamentos)</strong> a la
            membrana basal.
          </li>
          <li>
            <strong>Adhesión focal:</strong> unión <strong>dinámica</strong> abundante en
            lamelipodios (prolongaciones móviles) de células migratorias. Sus integrinas conectan la MEC con haces de{" "}
            <strong>filamentos de actina</strong> mediante proteínas adaptadoras (
            <strong>talina, actinina α y vinculina</strong>). Al unirse al sustrato fosforilan
            la quinasa <strong>FAK</strong>, que impulsa la migración y protege contra la{" "}
            <strong>anoikis</strong>.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Unión ocluyente (zonula occludens o estrecha)">
        Cinturón de <MathText>{"$1\\,\\mu\\mathrm{m}$"}</MathText> de ancho casi exclusivo
        de epitelios, hecho de crestas de cierre anastomosadas de{" "}
        <strong>ocludinas y claudinas</strong> (familia de las tetraspaninas: 4 dominios
        transmembrana, 2 bucles externos y 2 colas cortas), ancladas intracelularmente a{" "}
        <strong>ZO-1, ZO-2 y ZO-3</strong>. Cumple dos funciones: (1) mantener la{" "}
        <strong>polaridad de membrana</strong> separando el dominio apical del basolateral y
        (2) <strong>impedir el paso paracelular</strong> entre células (en el intestino es
        regulable para dejar pasar exceso de aminoácidos y azúcares).
      </Definicion>

      <PorQue>
        Las uniones ocluyentes permiten que un epitelio mantenga bombas y transportadores
        diferentes arriba y abajo; los hemidesmosomas estabilizan los tejidos fijos sobre la
        matriz; y las adhesiones focales permiten cicatrizar y migrar (aunque la
        hiperactivación de FAK también aumenta la capacidad de metástasis tumoral).
      </PorQue>

      <Ejemplo titulo="Clínica del capítulo: mutación en claudina 16">
        En el epitelio del asa ascendente gruesa de Henle del riñón abunda la{" "}
        <strong>claudina 16</strong>, que regula la reabsorción paracelular de magnesio y
        parte del calcio. Sus mutaciones causan un síndrome con{" "}
        <strong>hipomagnesemia y convulsiones</strong>.
      </Ejemplo>

      <Cuidado>
        Trampa muy frecuente: el <strong>hemidesmosoma NO es medio desmosoma con cadherinas</strong>.
        No contiene cadherinas sino <strong>integrina α6β4</strong> (y BPGA2), y une la
        célula a la <strong>membrana basal</strong>, no a otra célula. Además, no confundas
        su citoesqueleto con el de la adhesión focal: hemidesmosoma ancla{" "}
        <strong>tonofilamentos de queratina</strong>; adhesión focal ancla{" "}
        <strong>actina</strong>.
      </Cuidado>

      {/* basado en: formato Medicina 2 afirmaciones (2025-primer-parcial-curso-basico-2024-2025.md P26-50) */}
      <AutoCheck
        pregunta={
          "Respecto a los hemidesmosomas y las uniones ocluyentes:\n" +
          "1) Los hemidesmosomas anclan filamentos de actina mediante cadherinas y cateninas α y β.\n" +
          "2) Las uniones ocluyentes están formadas por conexinas que impiden el mantenimiento de la polaridad entre los dominios apical y basolateral."
        }
        opciones={["Solo 1", "Solo 2", "1 y 2 (ambas)", "Ninguna"]}
        correctaIdx={3}
        explicacion="Ninguna es correcta. El hemidesmosoma usa integrina α6β4, BPGA2 y plaquinas unidas a queratina (1 falsa); las uniones ocluyentes usan ocludinas y claudinas (no conexinas) precisamente para mantener la polaridad apical-basolateral (2 falsa)."
      />
    </EscenaRica>
  );
}

function EscUnionesGap() {
  return (
    <EscenaRica>
      <Titulo>Uniones comunicantes · gap, nexo o hendidura</Titulo>

      <Hook>
        Cuando respiras polvo o moco, miles de células ciliadas de tus vías respiratorias
        baten en ola coordinada, y en tu corazón todas las fibras se contraen casi al mismo
        tiempo. ¿Cómo viaja tan rápido la señal de una célula a su vecina?
      </Hook>

      <Puente>
        Imagina dos departamentos contiguos unidos por un tubo angosto que perfora ambas
        paredes: por ese pasadizo pasan mensajes e insumos pequeños al instante, pero si en un
        departamento ocurre una avería peligrosa, una compuerta automática cierra el tubo
        para proteger al vecino.
      </Puente>

      <SvgConexon />

      <Definicion termino="Estructura del conexón">
        Uniones maculares (placas de hasta <MathText>{"$0{,}3\\text{ mm}$"}</MathText>) donde
        el espacio intercelular se estrecha a{" "}
        <MathText>{"$2\\text{ a }5\\text{ nm}$"}</MathText>. Cada{" "}
        <strong>conexón</strong> (<MathText>{"$\\approx 6{,}5\\text{ nm}$"}</MathText> de
        diámetro; centros separados <MathText>{"$9\\text{ nm}$"}</MathText>) reúne{" "}
        <strong>6 moléculas de conexina</strong> en hexágono alrededor de un canal central de{" "}
        <MathText>{"$1{,}5\\text{ a }2\\text{ nm}$"}</MathText>. Al acoplarse dos conexones
        de células vecinas dejan pasar moléculas de hasta{" "}
        <MathText>{"$1{,}2\\text{ nm}$"}</MathText>: iones inorgánicos, aminoácidos,
        oligosacáridos, nucleótidos, vitaminas y segundos mensajeros como{" "}
        <strong>AMPc</strong>.
      </Definicion>

      <PorQue>
        Permiten el <strong>acoplamiento eléctrico y químico</strong> en sinapsis eléctricas,
        músculo cardíaco y epitelios ciliados de las vías respiratorias (movimiento síncrono
        ciliar). Su formación es <strong>independiente de <MathText>{"$\\text{Ca}^{2+}$"}</MathText></strong>,
        pero el <strong>aumento de <MathText>{"$\\text{Ca}^{2+}$"}</MathText> intracelular</strong>{" "}
        o el <strong>descenso del pH</strong> cierran el canal: si una célula se lesiona y
        entra <MathText>{"$\\text{Ca}^{2+}$"}</MathText>, sus uniones gap se cierran para no
        dañar a las vecinas.
      </PorQue>

      <Ejemplo titulo="Clínica del capítulo: patologías por mutaciones de conexinas">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Conexina 26 (Cx26):</strong> causa más del 20 % de las{" "}
            <strong>sorderas infantiles</strong> (falla el reciclaje de{" "}
            <MathText>{"$\\text{K}^+$"}</MathText> en la cóclea; mutaciones frecuentes
            30delG y 167delT).
          </li>
          <li>
            <strong>Conexina 50 (Cx50):</strong> asociada a{" "}
            <strong>cataratas congénitas</strong> (ceguera).
          </li>
          <li>
            <strong>Conexina 43 (Cx43):</strong> mutaciones causan{" "}
            <strong>displasia oculodentodigital (ODD)</strong>; también conecta osteoblastos
            y osteocitos junto con Cx45.
          </li>
          <li>
            <strong>Conexina 32 (Cx32):</strong> relacionada con la neuropatía de{" "}
            <strong>Charcot-Marie-Tooth (CMT)</strong> (debilidad y atrofia distal,
            hipoestesia, marcha anómala y pie cavo).
          </li>
        </ul>
      </Ejemplo>

      <Mnemotecnia>
        <strong>Cx26 = oído (26 → cóclea), Cx50 = ojo (50 → cristalino), Cx32 = nervio (CMT).</strong>{" "}
        Y recuerda la regla de compuerta: <strong>mucho Ca²⁺ o pH ácido → se cierra el nexo</strong>.
      </Mnemotecnia>

      <Cuidado>
        No confundas el efecto del calcio aquí con el de las cadherinas: en las uniones gap,
        su formación no necesita <MathText>{"$\\text{Ca}^{2+}$"}</MathText>, y cuando sube
        el <MathText>{"$\\text{Ca}^{2+}$"}</MathText> dentro de la célula el poro{" "}
        <strong>SE CIERRA</strong> (protección ante daño celular), no se abre.
      </Cuidado>

      {/* basado en: formato Medicina 3 afirmaciones (2025-segundo-parcial-curso-basico-2024-2025.md P76-100) */}
      <AutoCheck
        pregunta={
          "En relación con las uniones comunicantes (tipo gap o nexo):\n" +
          "1) Cada conexón consta de cuatro subunidades de claudina y permite el paso libre de proteínas grandes mayores a 2 nm.\n" +
          "2) El aumento de la concentración intracelular de Ca²⁺ y el descenso del pH reducen o cierran la permeabilidad del canal, aislando células dañadas.\n" +
          "3) Las mutaciones de conexina 26 causan la enfermedad de Charcot-Marie-Tooth y las de conexina 32 provocan más del 20 % de las sorderas infantiles."
        }
        opciones={["Solo 1", "Solo 2", "Solo 3", "Todas (1, 2 y 3)", "Ninguna"]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es verdadera. El conexón tiene 6 conexinas y deja pasar moléculas de hasta ~1,2 nm (1 falsa), y los nombres clínicos están invertidos en 3: Cx26 causa sordera infantil y Cx32 la neuropatía de Charcot-Marie-Tooth."
      />
    </EscenaRica>
  );
}

function EscMembranaBasal() {
  return (
    <EscenaRica>
      <Titulo>Membrana basal · lámina basal y lámina fibrorreticular</Titulo>

      <Hook>
        Cada día tus glomérulos renales filtran plasma sanguíneo a alta presión sin dejar
        escapar proteínas útiles como la albúmina hacia la orina. ¿Qué filtro natural
        colocado justo debajo de los epitelios realiza esta selección milimétrica?
      </Hook>

      <Puente>
        Piensa en la base sobre la que se construye una casa: lleva primero una capa fina de
        nivelación puesta por quienes levantan las paredes (el epitelio) y debajo una base
        fibrosa que aporta el terreno subyacente (el tejido conjuntivo). Juntas forman la{" "}
        <strong>membrana basal</strong>.
      </Puente>

      <SvgMembranaBasal />

      <Definicion termino="Membrana basal al microscopio óptico y electrónico">
        Capa extracelular de soporte de{" "}
        <MathText>{"$0{,}5\\text{ a }1{,}5\\,\\mu\\mathrm{m}$"}</MathText> de espesor (hasta{" "}
        <MathText>{"$10\\,\\mu\\mathrm{m}$"}</MathText> en la membrana de Descemet de la
        córnea), positiva a <strong>PAS</strong>, sales de plata y anticuerpos{" "}
        <strong>anti-colágeno IV</strong>. Al microscopio electrónico se divide en:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Lámina basal (50 a 100 nm, producida por el epitelio):</strong> incluye la{" "}
            <strong>lámina lúcida o rara</strong> (40 a 60 nm, debajo de la membrana celular)
            y la <strong>lámina densa</strong> (filamentos de 3 a 4 nm). Contiene{" "}
            <strong>colágeno tipo IV</strong> (exclusivo de la lámina basal; red de 1,5 nm),{" "}
            <strong>laminina</strong> (une las integrinas celulares),{" "}
            <strong>entactina o nidógeno</strong> (enlace entre laminina y colágeno IV) y el
            proteoglucano <strong>perlecano</strong> (eje de 600 kDa con 2 a 15 cadenas de{" "}
            <strong>heparán sulfato</strong> que dan fuerte carga negativa).
          </li>
          <li>
            <strong>Lámina fibrorreticular:</strong> situada debajo, aporta fibras reticulares
            argirófilas (por eso la membrana basal se tiñe con plata).
          </li>
        </ul>
      </Definicion>

      <PorQue>
        Cumple cinco funciones: (1) sostén del epitelio, (2) <strong>filtro molecular pasivo</strong>{" "}
        por tamaño, forma y carga eléctrica negativa, (3) <strong>filtro celular</strong>{" "}
        (impide el paso de fibroblastos y células epiteliales pero deja pasar glóbulos
        blancos), (4) andamiaje para <strong>regeneración tisular</strong> tras lesiones y (5)
        organización y diferenciación celular. En <strong>alvéolos pulmonares</strong> y{" "}
        <strong>glomérulos renales</strong> se fusionan las membranas basales epitelial y
        endotelial para formar las barreras de difusión e intercambio.
      </PorQue>

      <Ejemplo titulo="Clínica del capítulo: diabetes, Alport y Goodpasture">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Diabetes mellitus:</strong> la membrana basal glomerular se engrosa (más
            colágeno IV y laminina), pero <strong>disminuye el heparán sulfato</strong>; al
            perder carga negativa aparece hiperfiltración,{" "}
            <strong>microalbuminuria</strong> (<MathText>{"$30\\text{–}300\\text{ mg/24 h}$"}</MathText>
            ), proteinuria e insuficiencia renal.
          </li>
          <li>
            <strong>Síndrome de Alport:</strong> alteración hereditaria (ligada al sexo) de
            la cadena <strong>α5 del colágeno IV</strong>; causa hematuria, nefritis con fallo
            renal, sordera neurosensorial (tonos agudos) y lenticono.
          </li>
          <li>
            <strong>Síndrome de Goodpasture:</strong> autoanticuerpos frente a la cadena{" "}
            <strong>α3 del colágeno IV</strong> en riñón y pulmón; causa{" "}
            <strong>hemoptisis</strong>, hematuria y glomerulonefritis rápidamente progresiva.
          </li>
        </ul>
      </Ejemplo>

      <Cuidado>
        No confundas <strong>lámina basal</strong> con <strong>membrana basal</strong>: la
        membrana basal completa suma la lámina basal (lúcida + densa) más la lámina
        fibrorreticular subyacente. Y en la diabetes recuerda la paradoja: la membrana está
        más gruesa, pero filtra más proteínas porque pierde carga negativa de heparán sulfato.
      </Cuidado>

      {/* basado en: formato Medicina 2 afirmaciones (2025-primer-parcial-curso-basico-2024-2025.md P26-50) */}
      <AutoCheck
        pregunta={
          "Con relación a la membrana basal y sus alteraciones:\n" +
          "1) La lámina basal contiene colágeno tipo IV, laminina, entactina (nidógeno) y perlecano rico en heparán sulfato.\n" +
          "2) En el síndrome de Goodpasture existen anticuerpos contra la cadena α3 del colágeno tipo IV de las membranas basales renal y pulmonar."
        }
        opciones={["Solo 1", "Solo 2", "1 y 2 (ambas)", "Ninguna"]}
        correctaIdx={2}
        explicacion="Ambas son verdaderas: esos cuatro componentes integran la lámina basal, y el síndrome de Goodpasture ataca específicamente la cadena α3 del colágeno IV en riñón y pulmón."
      />
    </EscenaRica>
  );
}

function EscFibrasMEC() {
  return (
    <EscenaRica>
      <Titulo>Matriz extracelular · fibras de colágeno, reticulares y elásticas</Titulo>

      <Hook>
        A igual diámetro, una fibra de colágeno resiste más tracción que el acero
        inoxidable, mientras que una fibra elástica de tus pulmones o de la aorta se estira
        hasta una vez y media su longitud en reposo y recupera su forma original sin
        romperse. ¿Cuál es el secreto molecular de cada una?
      </Hook>

      <Puente>
        En una obra de ingeniería no usas el mismo cable para un tirante rígido de puente que
        para un resorte amortiguador. La matriz extracelular (MEC) combina una sustancia
        fundamental en gel con tres tipos clásicos de fibras:{" "}
        <strong>colágeno</strong> (tracción), <strong>reticulares</strong> (redes finas de
        soporte) y <strong>elásticas</strong> (distensión reversible).
      </Puente>

      <SvgFibrasMEC />

      <Definicion termino="Fibras de colágeno y biogénesis">
        Aportan el 20 a 25 % de las proteínas corporales; son acidófilas (eosina rosa, Masson
        azul, Van Gieson rojo). Sus microfibrillas muestran estriación transversal cada{" "}
        <MathText>{"$67\\text{ nm}$"}</MathText> porque las moléculas de{" "}
        <strong>tropocolágeno</strong> (<MathText>{"$280\\text{ nm}$"}</MathText> de largo)
        se disponen una detrás de otra, dejando unos <MathText>{"$37\\text{ nm}$"}</MathText>{" "}
        entre el final de una y el comienzo de la siguiente; las hileras vecinas quedan
        desfasadas y la posición se repite cada 5 hileras. Cada tropocolágeno es una <strong>triple hélice dextrógira</strong> de 3
        cadenas α (~1000 aminoácidos, secuencia repetida <strong>Gly-X-Y</strong>: 33,5 %
        glicina, 12 % prolina, 10 % hidroxiprolina). La hidroxiprolina estabiliza la hélice
        por enlaces de H y la hidroxilisina permite enlaces covalentes y glucosilación.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Dentro de la célula (RER y Golgi):</strong> síntesis de preprocolágeno →
            hidroxilación de prolina y lisina (requiere <strong>vitamina C</strong>) →
            O-glucosilación → triple hélice soluble de <strong>procolágeno</strong> (los
            propéptidos impiden que precipite dentro de la célula) → paso por Golgi
            (N-glucosilación) y exocitosis.
          </li>
          <li>
            <strong>Fuera de la célula:</strong> las <strong>procolágeno peptidasas</strong>{" "}
            cortan los propéptidos dando <strong>tropocolágeno</strong> → autoensamblaje
            escalonado (<MathText>{"$67\\text{ nm}$"}</MathText>) y entrecruzamiento por{" "}
            <strong>lisil oxidasa</strong>.
          </li>
          <li>
            <strong>Familias:</strong> fibrillas largas (destaca el{" "}
            <strong>tipo I</strong>; además II, III, V, XI), FACIT (IX, XII, XIV), cadena
            corta (VIII, X), redes (destaca el <strong>tipo IV</strong>, en la lámina
            basal) y otros (VI, VII, XIII).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Fibras reticulares y elásticas">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Fibras reticulares:</strong> tipo de colágeno en redes delgadas (
            <MathText>{"$0{,}5\\text{ a }2\\,\\mu\\text{m}$"}</MathText>), <strong>argirófilas</strong> (sales de plata) y <strong>PAS+</strong> (6 a
            12 % de hexosas frente al 1 % del colágeno común); abundan en tejidos
            hemopoyéticos y linfopoyéticos (excepto el timo).
          </li>
          <li>
            <strong>Fibras elásticas:</strong> redes de{" "}
            <MathText>{"$0{,}2\\text{ a }1\\,\\mu\\text{m}$"}</MathText> (resorcina-fucsina u
            orceína) que se estiran hasta 1,5 veces en arterias elásticas, pulmón, cuerdas
            vocales, ligamentos amarillos, piel, cartílago elástico y vejiga. Tienen un{" "}
            <strong>centro amorfo de elastina</strong> (~750 aminoácidos, no glucosilada,
            con aminoácidos exclusivos <strong>desmosina e isodesmosina</strong>) y{" "}
            <strong>microfibrillas externas de fibrilina</strong> (10 a 12 nm).
          </li>
        </ul>
      </Definicion>

      <PorQue>
        Si falla cualquier paso enzimático de la síntesis o ensamblaje de estas fibras se
        deteriora la resistencia de encías, piel, huesos y grandes vasos sanguíneos.
      </PorQue>

      <Ejemplo titulo="Clínica del capítulo: escorbuto, Ehlers-Danlos, Marfan y cutis laxa">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Escorbuto:</strong> carencia de <strong>vitamina C</strong> (ácido
            ascórbico), necesaria para prolilhidroxilasa y lisilhidroxilasa; triple hélice
            inestable → encías sangrantes, dientes flojos y defectos de osteogenia en niños.
          </li>
          <li>
            <strong>Síndrome de Ehlers-Danlos:</strong> déficit genético de{" "}
            <strong>lisilhidroxilasa</strong> → enlaces anómalos de tropocolágeno,
            articulaciones hipermóviles, piel hiperextensible y mala cicatrización.
          </li>
          <li>
            <strong>Síndrome de Marfan:</strong> trastorno autosómico dominante por mutación
            en la <strong>fibrilina</strong> → extremidades largas, aracnodactilia,
            trastornos visuales, prolapso mitral y riesgo mortal de{" "}
            <strong>aneurisma y disección de la aorta</strong>.
          </li>
          <li>
            <strong>Cutis laxa (elastólisis):</strong> alteración de la{" "}
            <strong>elastina</strong> → la piel pierde retorno elástico y cuelga arrugada.
          </li>
        </ul>
      </Ejemplo>

      <Cuidado>
        Distinción clave de examen: el <strong>síndrome de Marfan</strong> afecta a la{" "}
        <strong>fibrilina</strong> (microfibrillas periféricas), mientras que la{" "}
        <strong>cutis laxa</strong> afecta a la <strong>elastina</strong> (centro amorfo). Y
        el corte de los propéptidos del procolágeno ocurre <strong>fuera de la célula</strong>,
        no en el RER.
      </Cuidado>

      {/* basado en: 2025-primer-parcial-curso-basico-2024-2025.md P88 (tema: elastina-matriz-extracelular) */}
      <AutoCheck
        pregunta={
          "Con respecto a las proteínas fibrosas de la matriz extracelular:\n" +
          "1) Las fibras elásticas poseen un centro amorfo de elastina con enlaces exclusivos de desmosina e isodesmosina, rodeado por microfibrillas de fibrilina.\n" +
          "2) El síndrome de Marfan se produce por una carencia dietética de vitamina C que impide hidroxilar la prolina.\n" +
          "3) Las fibras reticulares contienen menor porcentaje de hexosas que las fibras de colágeno común y predominan en el timo."
        }
        opciones={["Solo 1", "Solo 2", "Solo 3", "Todas (1, 2 y 3)", "Ninguna"]}
        correctaIdx={0}
        explicacion="Solo la afirmación 1 es verdadera. El déficit de vitamina C produce escorbuto y el síndrome de Marfan se debe a mutaciones en la fibrilina (2 falsa); las fibras reticulares tienen más hexosas (6-12 % vs 1 %) y aparecen en órganos linfopoyéticos excepto el timo (3 falsa)."
      />
    </EscenaRica>
  );
}

function EscSustanciaFundamental() {
  return (
    <EscenaRica>
      <Titulo>Sustancia fundamental · GAG, proteoglucanos y glucoproteínas adhesivas</Titulo>

      <Hook>
        ¿Cómo logra el cartílago de tu rodilla amortiguar cada paso durante décadas sin
        aplastarse, y al mismo tiempo frenar la propagación de bacterias invasoras entre las
        células?
      </Hook>

      <Puente>
        Imagina millones de escobillas químicas cargadas de electricidad negativa sumergidas en
        agua: al repelerse entre sí y atraer iones <MathText>{"$\\text{Na}^+$"}</MathText>{" "}
        cargan la matriz con tanta agua que forman un gel turgente y resbaladizo difícil de
        comprimir.
      </Puente>

      <SvgSustanciaFundamental />

      <Definicion termino="Glucosaminoglucanos (GAG) y proteoglucanos (PG)">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>GAG:</strong> cadenas largas no ramificadas de disacáridos repetidos
            (aminoglucano + ácido urónico) con cargas negativas (sulfato y carboxilo) que
            atraen <MathText>{"$\\text{Na}^+$"}</MathText> y agua generando{" "}
            <strong>turgencia</strong>. El <strong>hialuronato (ácido hialurónico)</strong>{" "}
            es el <strong>único GAG no sulfatado</strong> (hasta 25 000 disacáridos,{" "}
            <MathText>{"$2{,}5\\,\\mu\\text{m}$"}</MathText>),
            no se une covalentemente a proteína central y forma un gel viscoso que dificulta la
            invasión bacteriana (aunque bacterias invasivas secretan{" "}
            <strong>hialuronidasa</strong> para degradarlo). Los sulfatados son{" "}
            <strong>condroitín, dermatán, queratán y heparán sulfato</strong>.
          </li>
          <li>
            <strong>Proteoglucanos (PG):</strong> GAG sulfatados unidos covalentemente en el
            Golgi a un núcleo proteico; contienen hasta un{" "}
            <strong>95 % de carbohidratos</strong> (frente a un máximo del 60 % en
            glucoproteínas). Incluyen <strong>agrecano</strong> (cartílago/MEC, unido al
            hialuronato), <strong>perlecano</strong> (lámina basal),{" "}
            <strong>sindecano</strong> (transmembrana unido a actina interna y correceptor de
            FGF) y <strong>heparina</strong> (gránulos de mastocitos).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Glucoproteínas adhesivas">
        Conectan integrinas, colágeno y proteoglucanos entre sí:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Fibronectina:</strong> dímero en U de 440 kDa unido por puentes disulfuro,
            con secuencia <strong>RGD</strong> para integrinas (formas plasmática, superficie
            celular y matriz).
          </li>
          <li>
            <strong>Laminina:</strong> glucoproteína sulfatada de 850 kDa en forma de{" "}
            <strong>cruz latina</strong> (cadenas <strong>α, β, γ</strong>), exclusiva de la{" "}
            <strong>lámina basal</strong> y láminas externas (músculo, Schwann, adipocitos);
            une integrinas, colágeno IV, entactina y heparán sulfato.
          </li>
          <li>
            <strong>Entactina (nidógeno):</strong> une laminina con colágeno IV.{" "}
            <strong>Tenascina:</strong> hexámero presente en tejido embrionario (vías
            migratorias) y producido por células metastásicas.
          </li>
        </ul>
      </Definicion>

      <PorQue>
        Mientras los GAG y proteoglucanos aportan resistencia mecánica a la compresión y
        difusión rápida de metabolitos hidrosolubles, las glucoproteínas adhesivas anclan las
        células a la red extracelular y guían la migración normal (embrionaria) o patológica
        (metástasis).
      </PorQue>

      <Ejemplo titulo="Clínica del capítulo: déficit de cadena α2 de laminina">
        La carencia hereditaria (autosómica recesiva) de la{" "}
        <strong>cadena α2 de la laminina</strong> provoca una{" "}
        <strong>distrofia muscular congénita</strong> desde el nacimiento, con{" "}
        <strong>hipotonía grave generalizada</strong>, incapacidad para caminar e{" "}
        <strong>insuficiencia respiratoria</strong>.
      </Ejemplo>

      <Cuidado>
        Compara los porcentajes de azúcar: en las glucoproteínas los glúcidos llegan como
        máximo al <strong>60 %</strong>, mientras que en los proteoglucanos pueden alcanzar
        el <strong>95 %</strong>. Y recuerda que el <strong>hialuronato</strong> es el único
        GAG sin sulfato y sin unión covalente a un centro proteico.
      </Cuidado>

      {/* basado en: formato Medicina 2 afirmaciones (2025-primer-parcial-curso-basico-2024-2025.md P26-50) */}
      <AutoCheck
        pregunta={
          "Respecto a la sustancia fundamental y las glucoproteínas de la MEC:\n" +
          "1) La fibronectina adopta forma de cruz latina y se localiza exclusivamente en la lámina basal.\n" +
          "2) Los proteoglucanos presentan un contenido máximo de hidratos de carbono del 60 %, inferior al de las glucoproteínas adhesivas."
        }
        opciones={["Solo 1", "Solo 2", "1 y 2 (ambas)", "Ninguna"]}
        correctaIdx={3}
        explicacion="Ninguna es verdadera. La cruz latina exclusiva de la lámina basal es la laminina (la fibronectina es un dímero en U con secuencia RGD); y los proteoglucanos alcanzan hasta un 95 % de carbohidratos, mucho más que el tope de 60 % de las glucoproteínas."
      />
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Repaso y práctica · integrando el capítulo</Titulo>

      <Misconception titulo="Confusión 1: cadherinas siempre a filamentos intermedios">
        <strong>Falso.</strong> Tanto la <em>zonula adherens</em> como el desmosoma usan
        cadherinas, pero la <em>zonula adherens</em> se une a <strong>actina</strong> vía
        cateninas α y β, mientras que el desmosoma se une a{" "}
        <strong>filamentos intermedios</strong> sin cateninas α ni β. Por su parte, el
        hemidesmosoma se une a queratina usando <strong>integrina α6β4</strong>, no
        cadherinas.
      </Misconception>

      <Misconception titulo="Confusión 2: el calcio siempre abre o une todas las uniones">
        <strong>Falso.</strong> Cadherinas, integrinas y selectinas requieren{" "}
        <MathText>{"$\\text{Ca}^{2+}$"}</MathText> para adherirse, pero las{" "}
        <strong>IgSF-CAM</strong> son independientes del calcio, y en las{" "}
        <strong>uniones gap</strong> su formación no requiere{" "}
        <MathText>{"$\\text{Ca}^{2+}$"}</MathText> y un aumento de{" "}
        <MathText>{"$\\text{Ca}^{2+}$"}</MathText> intracelular <strong>cierra</strong> el
        canal.
      </Misconception>

      <Misconception titulo="Confusión 3: lámina basal = membrana basal">
        <strong>Falso.</strong> Al microscopio electrónico, la{" "}
        <strong>membrana basal</strong> equivale a la suma de la{" "}
        <strong>lámina basal</strong> (lámina lúcida + lámina densa, epitelial) y la{" "}
        <strong>lámina fibrorreticular</strong> subyacente (tejido conjuntivo).
      </Misconception>

      <Resumen>
        <Parrafo>
          Mapa rápido de las especializaciones y matriz en Calvo capítulo 6:
        </Parrafo>
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Superficie apical/basal:</strong> microvellosidades (actina + villina/fimbrina
            + miosina I/calmodulina; lactasas y DMT-1) y micropliegues (interdigitaciones
            laterales; pliegues basales con mitocondrias).
          </li>
          <li>
            <strong>Uniones de anclaje:</strong> <em>zonula adherens</em> (actina), desmosoma
            (filamentos intermedios; pénfigo), hemidesmosoma (integrina α6β4 + queratina) y
            adhesión focal (integrinas + talina/vinculina + actina + FAK).
          </li>
          <li>
            <strong>Uniones ocluyentes:</strong> ocludinas + claudinas + ZO; polaridad y sello
            paracelular (claudina 16).
          </li>
          <li>
            <strong>Uniones gap:</strong> 6 conexinas = conexón; paso{" "}
            <MathText>{"$\\le 1{,}2\\text{ nm}$"}</MathText>; cierra con ↑{" "}
            <MathText>{"$\\text{Ca}^{2+}$"}</MathText> o ↓ pH (Cx26, Cx50, Cx43, Cx32).
          </li>
          <li>
            <strong>Membrana basal y MEC:</strong> colágeno IV + laminina + entactina +
            perlecano (diabetes, Alport, Goodpasture); fibras de colágeno (escorbuto,
            Ehlers-Danlos), reticulares y elásticas (Marfan, cutis laxa); GAG (hialuronato),
            PG y glucoproteínas adhesivas.
          </li>
        </ul>
      </Resumen>

      {/* basado en: 2025-segundo-parcial-curso-basico-2024-2025.md P17 (tema: efectos-del-cigarrillo, epitelio ciliado respiratorio) */}
      <AutoCheck
        pregunta={
          "En relación con las especializaciones epiteliales de las vías respiratorias y el transporte celular:\n" +
          "1) En los epitelios ciliados de las vías respiratorias, las uniones comunicantes (tipo gap) permiten la comunicación rápida necesaria para el movimiento síncrono de los cilios.\n" +
          "2) El estudio detallado de los cilios y flagelos de la superficie celular libre constituye el tema central desarrollado extensamente dentro de este capítulo 6."
        }
        opciones={["Solo 1", "Solo 2", "1 y 2 (ambas)", "Ninguna"]}
        correctaIdx={0}
        explicacion="Solo la afirmación 1 es verdadera. El capítulo señala que las uniones gap coordinan el movimiento síncrono de los cilios respiratorios, pero remite la explicación detallada de cilios y flagelos al capítulo 12."
      />

      {/* basado en: formato Medicina 3 afirmaciones (2025-segundo-parcial-curso-basico-2024-2025.md P76-100) */}
      <AutoCheck
        pregunta={
          "Respecto a la correlación clínica de las uniones y proteínas de la MEC:\n" +
          "1) En el escorbuto, la falta de vitamina C impide la acción de prolil y lisilhidroxilasas y desestabiliza la triple hélice del colágeno.\n" +
          "2) En el síndrome de Ehlers-Danlos existe deficiencia de lisilhidroxilasa, generando articulaciones hipermóviles y piel hiperextensible.\n" +
          "3) En el síndrome de Alport está alterada la cadena α5 del colágeno tipo IV de la lámina densa."
        }
        opciones={["Solo 1", "Solo 2", "Solo 3", "Todas (1, 2 y 3)", "Ninguna"]}
        correctaIdx={3}
        explicacion="Todas (1, 2 y 3) son verdaderas según las descripciones clínicas del capítulo."
      />

      {/* basado en: formato Medicina 3 afirmaciones (2025-primer-parcial-curso-basico-2024-2025.md P76-100) */}
      <AutoCheck
        pregunta={
          "En relación con la señalización por adhesión y las uniones estrechas:\n" +
          "1) Las adhesiones focales son uniones inmóviles definitivas conectadas a tonofilamentos de queratina.\n" +
          "2) En las uniones ocluyentes del intestino nunca puede existir transporte paracelular de azúcares ni aminoácidos.\n" +
          "3) La fosforilación de FAK en las adhesiones focales protege a la célula de la anoikis, y su hiperactivación se asocia a metástasis."
        }
        opciones={["Solo 1", "Solo 2", "Solo 3", "Todas (1, 2 y 3)", "Ninguna"]}
        correctaIdx={2}
        explicacion="Solo la afirmación 3 es verdadera. Las adhesiones focales son dinámicas y se unen a actina (1 falsa), y las uniones estrechas intestinales son regulables ante exceso de aminoácidos y azúcares (2 falsa)."
      />

      {/* basado en: 2025-primer-parcial-curso-basico-2024-2025.md P88 (tema: elastina-matriz-extracelular) */}
      <AutoCheck
        pregunta={
          "Respecto a las patologías humanas de membrana basal y sustancia fundamental:\n" +
          "1) En la diabetes mellitus aumenta el heparán sulfato de la membrana basal glomerular y esto impide la microalbuminuria.\n" +
          "2) El déficit autosómico recesivo de la cadena α2 de la laminina origina una distrofia muscular congénita con hipotonía grave e insuficiencia respiratoria."
        }
        opciones={["Solo 1", "Solo 2", "1 y 2 (ambas)", "Ninguna"]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es verdadera. En la diabetes mellitus la membrana basal se engrosa por exceso de colágeno IV y laminina pero DISMINUYE el heparán sulfato, lo que favorece la hiperfiltración y microalbuminuria (1 falsa)."
      />
    </EscenaRica>
  );
}

/*
 * FUENTE: Tema_06_Biologia_Celular_LITERAL_TTS.md (Calvo Cap. 6: Especializaciones de la membrana plasmática e interacción de la célula con su entorno)
 *
 * Justificación literal de cada AutoCheck:
 *
 * - AutoCheck 1 (EscMicrovellosidades):
 *   "están estabilizadas por un fascículo de veinte a treinta filamentos de actina, unidos entre sí por villina y fimbrina y fijados a la membrana celular por medio de miosina I y calmodulina." (l. 7)
 *   "También pueden aparecer invaginaciones en la zona basal de la membrana de la membrana de células epiteliales, denominadas pliegues basales , fig. seis a tres, B, como es el caso de los túbulos contorneados distales del riñón... En el citoplasma que queda comprendido entre los pliegues basales se sitúan numerosas mitocondrias." (l. 11)
 *
 * - AutoCheck 2 (EscMoleculasAdhesion):
 *   "Establecen uniones heterófilas , interactuando con integrinas y selectinas, u homófilas , uniéndose entonces a otras IgSF-CAM... Las IgSF-CAM no tienen sitios de unión para el Ca2+" (l. 55)
 *   "Las proteínas de estas familias pueden ser monoméricas , IgSF-CAM y selectinas" (l. 13); "los receptores para las selectinas son oligosacáridos que forman parte de glucoproteínas , como las IgSF-CAM, o glucolípidos de la membrana plasmática." (l. 49)
 *   "El dominio extracelular de la subunidad β tiene capacidad de unión a la secuencia tripeptídica RGD... en proteínas extracelulares , laminina y fibronectina" (l. 33)
 *
 * - AutoCheck 3 (EscAdherentesDesmosomas):
 *   "los desmosomas... son de morfología puntiforme y no poseen cateninas α y β... la placa de adhesión del desmosoma se une directamente a filamentos intermedios... de queratina , tonofilamentos, de desmina en los discos intercalares de los cardiomiocitos y de vimentina en las meninges" (l. 29)
 *   "El pénfigo vulgar , PV... depósito de IgG... Los autoanticuerpos de los pacientes se dirigen frente a desmogleína tres... frente a desmogleína un... separación entre los queratinocitos de la piel, denominada acantólisis" (l. 31)
 *
 * - AutoCheck 4 (EscIntegrinasYOcluyentes):
 *   "La integrina que forma parte de los hemidesmosomas es la integrina α6β4, y las proteínas de la placa se denominan plaquinas... BPGA2... conectada por el lado citoplasmático a tonofilamentos" (l. 39)
 *   "Las uniones estrechas desempeñan dos funciones esenciales: un. Determinan la polaridad de la membrana... dos. Impiden el paso de sustancias entre las células epiteliales... particularmente ocludinas y claudinas" (l. 63)
 *
 * - AutoCheck 5 (EscUnionesGap):
 *   "cada conexón está constituido por seis moléculas de conexina... de un,cinco a dos nanómetros de diámetro... movimiento de moléculas de un tamaño máximo de un coma dos nanómetros... la permeabilidad del canal está regulada por el Ca2+ y el pH, de modo que se reduce al descender el pH o al aumentar la concentración intracelular de Ca2+." (l. 65)
 *   "Las mutaciones en la conexina veintiséis podrían ser responsables de más del veinte por ciento de los casos de sordera en la infancia... La mutación de la conexina treinta y dos se relaciona con una enfermedad denominada atrofia muscular de Charcot-Marie-Tooth , CMT,." (l. 67)
 *
 * - AutoCheck 6 (EscMembranaBasal):
 *   "La lámina basal se compone, fundamentalmente, de un fino reticulado de colágeno de tipo IV, glucoproteínas adhesivas , laminina y entactina, y proteoglucanos , principalmente el perlecano, que contiene heparán sulfato" (l. 71)
 *   "El síndrome de Goodpasture es una enfermedad que se basa en la presencia de anticuerpos frente a la cadena α3 del colágeno de tipo IV, típicamente presente en la membrana basal del riñón y del pulmón." (l. 73)
 *
 * - AutoCheck 7 (EscFibrasMEC):
 *   "las fibras elásticas contienen dos elementos: un centro amorfo con elastina y una región externa y angosta con microfibrillas... La fibrilina es la glucoproteína predominante... La presencia de aminoácidos de desmosina e isodesmosina es exclusiva de las fibras elásticas" (l. 101)
 *   "Los pacientes con síndrome de Marfan, que poseen mutaciones en la proteína fibrilina" (l. 101); "En el escorbuto, enfermedad producida por la carencia de vitamina C" (l. 85); "Fibras reticulares... tejidos hemopoyéticos y los linfopoyéticos , a excepción del timo... seis a doce por ciento de hexosas, mientras que las fibras de colágeno contienen únicamente un un por ciento." (l. 95)
 *
 * - AutoCheck 8 (EscSustanciaFundamental):
 *   "El contenido en hidratos de carbono puede alcanzar hasta el noventa y cinco por ciento, en los PG a diferencia de las glucoproteínas, que contienen como máximo el sesenta por ciento." (l. 117)
 *   "La laminina... en forma de cruz latina... Se localiza únicamente en la lámina basal y en las láminas externas" (l. 127); "La fibronectina... macromolécula en forma de U" (l. 123).
 *
 * - AutoCheck 9 (EscPractica - cilios y uniones gap):
 *   "El movimiento síncrono de los cilios para expulsar la mucosidad de las vías respiratorias requiere una comunicación rápida de las moléculas de señalización a través de los citoplasmas de células contiguas, lo que se consigue mediante uniones de tipo gap." (l. 67)
 *   "como las microvellosidades, los cilios y los flagelos , estas dos últimas diferenciaciones se explican en el capítulo doce," (l. 5)
 *
 * - AutoCheck 10 (EscPractica - patologías colágeno):
 *   "En el escorbuto, enfermedad producida por la carencia de vitamina C... necesaria para la prolilhidroxilasa y la lisilhidroxilasa" (l. 85)
 *   "La deficiencia de la enzima lisilhidroxilasa, trastorno genético que se conoce como síndrome de Ehlers-Danlos... articulaciones hipermóviles... y piel hiperextensible" (l. 87)
 *   "síndrome de Alport... Se produce por la alteración de la cadena α5 del colágeno de tipo IV presente en la lámina densa." (l. 73)
 *
 * - AutoCheck 11 (EscPractica - adhesiones focales y ocluyentes):
 *   "la interacción de las integrinas con el sustrato en las adhesiones focales tiene como consecuencia la fosforilación de la proteína tirosina quinasa de adhesión focal , FAK... protege a las células de la anoikis... La hiperactivación de FAK se ha asociado con una mayor capacidad de metástasis" (l. 43)
 *   "Así ocurre en el intestino con el exceso de aminoácidos y azúcares, que pueden incorporarse al organismo mediante un transporte paracelular." (l. 63)
 *
 * - AutoCheck 12 (EscPractica - diabetes y distrofia por laminina):
 *   "En la diabetes mellitus... La causa de este engrosamiento es un aumento de colágeno de tipo IV y laminina, aunque hay menos heparán sulfato... microalbuminuria" (l. 73)
 *   "Existe una distrofia muscular congénita causada por el déficit de la cadena α2 de la laminina, que se hereda de manera autosómica recesiva... con una hipotonía grave generalizada... cuadros de insuficiencia respiratoria" (l. 127)
 */
