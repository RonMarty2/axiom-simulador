"use client";

import LeccionShell from "../_components/LeccionShell";
import MathText from "../../components/MathText";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo,
  Parrafo,
  Definicion,
  PorQue,
  Ejemplo,
  Cuidado,
  Resumen,
  EscenaRica,
  AutoCheck,
  Puente,
  Hook,
  Mnemotecnia,
  Conexion,
} from "../_components/pedagogia";

// ─── Esquemas SVG con coordenadas calculadas (viewBox 360px) ───────────────────

function SvgCuatroTejidos() {
  const W = 360;
  const H = 220;
  const PAD = 10;
  const GAP = 10;
  const TOP = 26;
  const BOX_W = (W - 2 * PAD - GAP) / 2;
  const BOX_H = 88;
  const ROW2_Y = TOP + BOX_H + GAP;

  const cajas = [
    { x: PAD, y: TOP, titulo: "1. Epitelial", desc: "Células muy juntas · casi sin matriz", color: "var(--dib-sky-500)" },
    { x: PAD + BOX_W + GAP, y: TOP, titulo: "2. Conjuntivo", desc: "Células separadas · matriz abundante", color: "var(--dib-amber-600)" },
    { x: PAD, y: ROW2_Y, titulo: "3. Nervioso", desc: "Neuronas y glía · impulsos", color: "var(--dib-violet-600)" },
    { x: PAD + BOX_W + GAP, y: ROW2_Y, titulo: "4. Muscular", desc: "Fibras contráctiles · casi sin matriz", color: "var(--dib-red-600)" },
  ];

  const EPI_CELL_W = 22;
  const EPI_CELL_H = 26;
  const EPI_START_X = PAD + (BOX_W - 4 * EPI_CELL_W) / 2;
  const EPI_Y = TOP + 30;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill={LIENZO.fg}>
        Los 4 tejidos primarios: células vs matriz
      </text>

      {cajas.map((c) => (
        <g key={c.titulo}>
          <rect
            x={c.x}
            y={c.y}
            width={BOX_W}
            height={BOX_H}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <text x={c.x + BOX_W / 2} y={c.y + 16} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={c.color}>
            {c.titulo}
          </text>
          <text x={c.x + BOX_W / 2} y={c.y + BOX_H - 9} textAnchor="middle" fontSize={8.2} fill={LIENZO.fgDim}>
            {c.desc}
          </text>
        </g>
      ))}

      {/* Epitelial: 4 celulas adosadas sobre membrana basal */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`epi-${i}`}>
          <rect
            x={EPI_START_X + i * EPI_CELL_W}
            y={EPI_Y}
            width={EPI_CELL_W - 1}
            height={EPI_CELL_H}
            rx={3}
            fill="var(--dib-sky-500)"
            fillOpacity={0.14}
            stroke="var(--dib-sky-500)"
            strokeWidth={1.2}
          />
          <circle
            cx={EPI_START_X + i * EPI_CELL_W + (EPI_CELL_W - 1) / 2}
            cy={EPI_Y + 14}
            r={3.5}
            fill="var(--dib-violet-600)"
          />
        </g>
      ))}
      <line
        x1={EPI_START_X - 4}
        y1={EPI_Y + EPI_CELL_H + 2}
        x2={EPI_START_X + 4 * EPI_CELL_W + 4}
        y2={EPI_Y + EPI_CELL_H + 2}
        stroke="var(--dib-blue-800)"
        strokeWidth={2}
      />

      {/* Conjuntivo: matriz abundante con fibras y celulas dispersas */}
      <rect
        x={cajas[1].x + 22}
        y={TOP + 24}
        width={BOX_W - 44}
        height={38}
        rx={6}
        fill="var(--dib-amber-50)"
        stroke="var(--dib-amber-400)"
        strokeWidth={1}
      />
      <line x1={cajas[1].x + 26} y1={TOP + 34} x2={cajas[1].x + BOX_W - 26} y2={TOP + 54} stroke="var(--dib-amber-500)" strokeWidth={1.6} />
      <line x1={cajas[1].x + 30} y1={TOP + 55} x2={cajas[1].x + BOX_W - 30} y2={TOP + 30} stroke="var(--dib-amber-600)" strokeWidth={1.2} strokeDasharray="3 2" />
      <ellipse cx={cajas[1].x + 54} cy={TOP + 38} rx={7} ry={4} fill="var(--dib-amber-600)" />
      <ellipse cx={cajas[1].x + 110} cy={TOP + 49} rx={7} ry={4} fill="var(--dib-amber-600)" />

      {/* Nervioso: neurona simple + glia */}
      <line x1={cajas[2].x + 34} y1={ROW2_Y + 33} x2={cajas[2].x + 52} y2={ROW2_Y + 42} stroke="var(--dib-violet-500)" strokeWidth={1.5} />
      <line x1={cajas[2].x + 32} y1={ROW2_Y + 51} x2={cajas[2].x + 52} y2={ROW2_Y + 44} stroke="var(--dib-violet-500)" strokeWidth={1.5} />
      <circle cx={cajas[2].x + 58} cy={ROW2_Y + 43} r={9} fill="var(--dib-violet-400)" fillOpacity={0.25} stroke="var(--dib-violet-500)" strokeWidth={1.5} />
      <circle cx={cajas[2].x + 58} cy={ROW2_Y + 43} r={3.5} fill="var(--dib-violet-700)" />
      <line x1={cajas[2].x + 67} y1={ROW2_Y + 43} x2={cajas[2].x + 126} y2={ROW2_Y + 43} stroke="var(--dib-violet-500)" strokeWidth={2} />
      <circle cx={cajas[2].x + 92} cy={ROW2_Y + 31} r={4} fill="var(--dib-emerald-500)" />

      {/* Muscular: fibras alargadas juntas */}
      {[0, 1, 2].map((i) => {
        const my = ROW2_Y + 26 + i * 13;
        const mx = cajas[3].x + 26;
        return (
          <g key={`musc-${i}`}>
            <rect x={mx} y={my} width={BOX_W - 52} height={10} rx={4} fill="var(--dib-red-100)" stroke="var(--dib-red-500)" strokeWidth={1.1} />
            <ellipse cx={mx + 26} cy={my + 5} rx={4} ry={2.2} fill="var(--dib-violet-600)" />
            <ellipse cx={mx + 82} cy={my + 5} rx={4} ry={2.2} fill="var(--dib-violet-600)" />
          </g>
        );
      })}
    </svg>
  );
}

function SvgEpitelios() {
  const W = 360;
  const H = 226;
  const PAD = 10;
  const GAP = 8;
  const COLS = 3;
  const COL_W = (W - 2 * PAD - (COLS - 1) * GAP) / COLS;
  const TOP = 24;
  const MEMB_Y = 148;
  const BASE_H = 12;

  const colX = (i: number) => PAD + i * (COL_W + GAP);

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={15} textAnchor="middle" fontSize={11} fontWeight={700} fill={LIENZO.fg}>
        Clasificación epitelial y nutrición por difusión
      </text>

      {[0, 1, 2].map((i) => (
        <rect
          key={`ecol-${i}`}
          x={colX(i)}
          y={TOP}
          width={COL_W}
          height={MEMB_Y - TOP}
          rx={8}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.fgFaint}
          strokeWidth={1}
        />
      ))}

      {/* Col 0: Pavimentoso simple */}
      <text x={colX(0) + COL_W / 2} y={TOP + 15} textAnchor="middle" fontSize={9.2} fontWeight={700} fill="var(--dib-blue-800)">
        Pavimentoso simple
      </text>
      {[0, 1].map((i) => {
        const cx = colX(0) + 12 + i * 43;
        return (
          <g key={`pav-${i}`}>
            <rect
              x={cx}
              y={MEMB_Y - 14}
              width={41}
              height={13}
              rx={5}
              fill="var(--dib-sky-500)"
              fillOpacity={0.18}
              stroke="var(--dib-sky-500)"
              strokeWidth={1.3}
            />
            <ellipse cx={cx + 20.5} cy={MEMB_Y - 7.5} rx={6} ry={2.8} fill="var(--dib-violet-600)" />
          </g>
        );
      })}
      <text x={colX(0) + COL_W / 2} y={TOP + 54} textAnchor="middle" fontSize={8.5} fill={LIENZO.fgDim}>
        1 capa delgada
      </text>
      <text x={colX(0) + COL_W / 2} y={TOP + 66} textAnchor="middle" fontSize={8.5} fill={LIENZO.fgDim}>
        Difusión rápida
      </text>

      {/* Col 1: Seudoestratificado */}
      <text x={colX(1) + COL_W / 2} y={TOP + 15} textAnchor="middle" fontSize={9.2} fontWeight={700} fill="var(--dib-emerald-800)">
        Seudoestratificado
      </text>
      {[
        { h: 66, ny: MEMB_Y - 40 },
        { h: 36, ny: MEMB_Y - 18 },
        { h: 66, ny: MEMB_Y - 28 },
        { h: 66, ny: MEMB_Y - 46 },
      ].map((cell, i) => {
        const cw = 20;
        const cx = colX(1) + 13 + i * cw;
        return (
          <g key={`pse-${i}`}>
            <rect
              x={cx}
              y={MEMB_Y - cell.h}
              width={cw - 1}
              height={cell.h - 1}
              rx={3}
              fill="var(--dib-emerald-100)"
              stroke="var(--dib-emerald-500)"
              strokeWidth={1.2}
            />
            <ellipse cx={cx + (cw - 1) / 2} cy={cell.ny} rx={3.5} ry={5} fill="var(--dib-violet-600)" />
            {cell.h > 50 && (
              <>
                <line x1={cx + 4} y1={MEMB_Y - cell.h} x2={cx + 4} y2={MEMB_Y - cell.h - 5} stroke="var(--dib-emerald-800)" strokeWidth={1} />
                <line x1={cx + 10} y1={MEMB_Y - cell.h} x2={cx + 10} y2={MEMB_Y - cell.h - 5} stroke="var(--dib-emerald-800)" strokeWidth={1} />
                <line x1={cx + 15} y1={MEMB_Y - cell.h} x2={cx + 15} y2={MEMB_Y - cell.h - 5} stroke="var(--dib-emerald-800)" strokeWidth={1} />
              </>
            )}
          </g>
        );
      })}
      <text x={colX(1) + COL_W / 2} y={TOP + 34} textAnchor="middle" fontSize={8} fill={LIENZO.fgDim}>
        Todas tocan la base
      </text>

      {/* Col 2: Estratificado */}
      <text x={colX(2) + COL_W / 2} y={TOP + 15} textAnchor="middle" fontSize={9.2} fontWeight={700} fill="var(--dib-amber-700)">
        Estratificado
      </text>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => {
          const cw = 27;
          const ch = row === 3 ? 10 : 14;
          const ry = MEMB_Y - 15 - row * 13;
          const rx = colX(2) + 13 + col * cw;
          return (
            <g key={`est-${row}-${col}`}>
              <rect
                x={rx}
                y={ry}
                width={cw - 1}
                height={ch - 1}
                rx={row === 3 ? 4 : 2}
                fill={row === 3 ? "var(--dib-amber-200)" : "var(--dib-amber-50)"}
                stroke="var(--dib-amber-500)"
                strokeWidth={1.1}
              />
              {row < 3 && <circle cx={rx + (cw - 1) / 2} cy={ry + 6.5} r={2.8} fill="var(--dib-violet-600)" />}
            </g>
          );
        }),
      )}
      <text x={colX(2) + COL_W / 2} y={TOP + 34} textAnchor="middle" fontSize={8} fill={LIENZO.fgDim}>
        Solo basal toca base
      </text>

      {/* Membrana basal */}
      <rect x={PAD} y={MEMB_Y} width={W - 2 * PAD} height={BASE_H} rx={4} fill="var(--dib-sky-500)" fillOpacity={0.22} stroke="var(--dib-blue-500)" strokeWidth={1.2} />
      <text x={W / 2} y={MEMB_Y + 9} textAnchor="middle" fontSize={8.5} fontWeight={700} fill="var(--dib-blue-800)">
        Membrana basal (colágeno y glucoproteínas)
      </text>

      {/* Conjuntivo laxo con vasos debajo */}
      <rect x={PAD} y={MEMB_Y + BASE_H + 4} width={W - 2 * PAD} height={46} rx={8} fill="var(--dib-red-50)" stroke="var(--dib-red-400)" strokeWidth={1} />
      <circle cx={34} cy={MEMB_Y + BASE_H + 27} r={8} fill="var(--dib-red-500)" opacity={0.85} />
      <circle cx={326} cy={MEMB_Y + BASE_H + 27} r={8} fill="var(--dib-red-500)" opacity={0.85} />
      <text x={W / 2} y={MEMB_Y + BASE_H + 22} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-red-600)">
        Tejido conjuntivo laxo vascularizado
      </text>
      <text x={W / 2} y={MEMB_Y + BASE_H + 36} textAnchor="middle" fontSize={8.5} fill={LIENZO.fgDim}>
        Difusión de nutrientes hacia el epitelio avascular
      </text>
    </svg>
  );
}

function SvgConjuntivo() {
  const W = 360;
  const H = 210;
  const PAD = 8;
  const GAP = 6;
  const COLS = 4;
  const COL_W = (W - 2 * PAD - (COLS - 1) * GAP) / COLS;
  const TOP = 26;
  const CARD_H = 142;

  const cats = [
    { titulo: "1. Fibroso", l1: "Laxo: areolar,", l2: "reticular", l3: "Denso: regular", l4: "e irregular", c: "var(--dib-amber-700)", bg: "var(--dib-amber-50)" },
    { titulo: "2. Adiposo", l1: "Grasa blanca", l2: "(adulto, reserva)", l3: "Grasa parda", l4: "(lactante, calor)", c: "var(--dib-emerald-800)", bg: "var(--dib-emerald-50)" },
    { titulo: "3. Soporte", l1: "Cartílago:", l2: "sin capilares", l3: "Hueso:", l4: "osteonas", c: "var(--dib-blue-800)", bg: "var(--dib-slate-200)" },
    { titulo: "4. Líquido", l1: "Sangre:", l2: "matriz plasma", l3: "Eritrocitos,", l4: "leucocitos, plaq.", c: "var(--dib-red-600)", bg: "var(--dib-red-50)" },
  ];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill={LIENZO.fg}>
        Las 4 categorías del tejido conjuntivo
      </text>

      {cats.map((cat, i) => {
        const x = PAD + i * (COL_W + GAP);
        const cx = x + COL_W / 2;
        return (
          <g key={cat.titulo}>
            <rect x={x} y={TOP} width={COL_W} height={CARD_H} rx={8} fill={cat.bg} fillOpacity={0.75} stroke={cat.c} strokeWidth={1.1} />
            <text x={cx} y={TOP + 16} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={cat.c}>
              {cat.titulo}
            </text>
            {i === 0 && (
              <g>
                <line x1={x + 12} y1={TOP + 34} x2={x + COL_W - 12} y2={TOP + 54} stroke={cat.c} strokeWidth={1.6} />
                <line x1={x + 12} y1={TOP + 54} x2={x + COL_W - 12} y2={TOP + 34} stroke={cat.c} strokeWidth={1.2} strokeDasharray="3 2" />
                <ellipse cx={cx} cy={TOP + 44} rx={8} ry={4.5} fill="var(--dib-amber-500)" />
              </g>
            )}
            {i === 1 && (
              <g>
                <circle cx={cx} cy={TOP + 45} r={14} fill="#fff" stroke={cat.c} strokeWidth={1.4} />
                <circle cx={cx + 10} cy={TOP + 36} r={3} fill="var(--dib-violet-600)" />
              </g>
            )}
            {i === 2 && (
              <g>
                <circle cx={cx} cy={TOP + 45} r={14} fill="#fff" stroke={cat.c} strokeWidth={1.2} />
                <circle cx={cx} cy={TOP + 45} r={8} fill="none" stroke={cat.c} strokeWidth={1} />
                <circle cx={cx} cy={TOP + 45} r={3} fill={cat.c} />
              </g>
            )}
            {i === 3 && (
              <g>
                <circle cx={cx - 10} cy={TOP + 42} r={7} fill="var(--dib-red-400)" />
                <circle cx={cx + 11} cy={TOP + 48} r={7} fill="#fff" stroke="var(--dib-violet-500)" strokeWidth={1.2} />
                <circle cx={cx + 11} cy={TOP + 48} r={3} fill="var(--dib-violet-600)" />
              </g>
            )}
            <text x={cx} y={TOP + 78} textAnchor="middle" fontSize={8} fill={LIENZO.fg}>{cat.l1}</text>
            <text x={cx} y={TOP + 90} textAnchor="middle" fontSize={8} fill={LIENZO.fgDim}>{cat.l2}</text>
            <text x={cx} y={TOP + 109} textAnchor="middle" fontSize={8} fill={LIENZO.fg}>{cat.l3}</text>
            <text x={cx} y={TOP + 121} textAnchor="middle" fontSize={8} fill={LIENZO.fgDim}>{cat.l4}</text>
          </g>
        );
      })}

      <rect x={PAD} y={TOP + CARD_H + 8} width={W - 2 * PAD} height={24} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
      <text x={W / 2} y={TOP + CARD_H + 23} textAnchor="middle" fontSize={9} fontWeight={600} fill={LIENZO.fg}>
        Rasgo común: matriz extracelular (fibras + gel) &gt; células
      </text>
    </svg>
  );
}

function SvgNeurona() {
  const W = 360;
  const H = 188;
  const SOMA_X = 112;
  const SOMA_Y = 88;
  const SOMA_R = 23;
  const AXON_END = 318;

  const dendritas = [
    { x1: SOMA_X - 18, y1: SOMA_Y - 12, x2: 52, y2: 50 },
    { x1: 68, y1: 60, x2: 46, y2: 70 },
    { x1: SOMA_X - 22, y1: SOMA_Y, x2: 44, y2: 88 },
    { x1: SOMA_X - 18, y1: SOMA_Y + 13, x2: 50, y2: 124 },
    { x1: 68, y1: 114, x2: 44, y2: 106 },
  ];

  const glia = [
    { x: 185, y: 54 },
    { x: 248, y: 118 },
    { x: 158, y: 124 },
  ];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill={LIENZO.fg}>
        Tejido nervioso: neurona y neuroglia
      </text>

      {dendritas.map((d, i) => (
        <line key={`den-${i}`} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke="var(--dib-violet-500)" strokeWidth={2} strokeLinecap="round" />
      ))}

      <line x1={SOMA_X + SOMA_R - 2} y1={SOMA_Y} x2={AXON_END} y2={SOMA_Y} stroke="var(--dib-violet-600)" strokeWidth={3.5} />
      <line x1={AXON_END} y1={SOMA_Y} x2={342} y2={72} stroke="var(--dib-violet-600)" strokeWidth={2} />
      <line x1={AXON_END} y1={SOMA_Y} x2={342} y2={88} stroke="var(--dib-violet-600)" strokeWidth={2} />
      <line x1={AXON_END} y1={SOMA_Y} x2={342} y2={104} stroke="var(--dib-violet-600)" strokeWidth={2} />

      <circle cx={SOMA_X} cy={SOMA_Y} r={SOMA_R} fill="var(--dib-violet-400)" fillOpacity={0.25} stroke="var(--dib-violet-600)" strokeWidth={2} />
      <circle cx={SOMA_X} cy={SOMA_Y} r={9} fill="var(--dib-violet-700)" />

      {glia.map((g, i) => (
        <g key={`glia-${i}`}>
          <circle cx={g.x} cy={g.y} r={8} fill="var(--dib-emerald-100)" stroke="var(--dib-emerald-500)" strokeWidth={1.4} />
          <circle cx={g.x} cy={g.y} r={3} fill="var(--dib-emerald-800)" />
        </g>
      ))}

      <text x={52} y={40} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-violet-700)">
        Dendritas
      </text>
      <text x={SOMA_X} y={54} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-violet-700)">
        Neurosoma
      </text>
      <text x={244} y={76} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-violet-700)">
        Axón (fibra nerviosa)
      </text>
      <text x={252} y={38} textAnchor="middle" fontSize={8.5} fontWeight={600} fill="var(--dib-emerald-800)">
        Neuroglia (sostén y protección)
      </text>

      <line x1={48} y1={156} x2={312} y2={156} stroke={LIENZO.accent} strokeWidth={1.8} />
      <polygon points="312,152 320,156 312,160" fill={LIENZO.accent} />
      <text x={180} y={174} textAnchor="middle" fontSize={9} fontWeight={600} fill={LIENZO.fgDim}>
        Dendritas reciben · neurosoma integra · axón envía
      </text>
    </svg>
  );
}

function SvgMusculos() {
  const W = 360;
  const H = 228;
  const PAD = 10;
  const TOP = 24;
  const ROW_H = 60;
  const GAP = 8;
  const GRAPH_X = PAD + 10;
  const GRAPH_W = 160;
  const LABEL_X = GRAPH_X + GRAPH_W + 12;

  const rows = [
    { y: TOP, titulo: "1. Estriado (esquelético)", l1: "Estrías · núcleos periféricos", l2: "Cilindros largos · voluntario", color: "var(--dib-red-600)" },
    { y: TOP + ROW_H + GAP, titulo: "2. Cardiaco", l1: "Estrías · 1 núcleo central", l2: "Discos intercalados · involuntario", color: "var(--dib-amber-700)" },
    { y: TOP + 2 * (ROW_H + GAP), titulo: "3. Liso", l1: "Sin estrías · fusiforme", l2: "1 núcleo central · involuntario", color: "var(--dib-blue-800)" },
  ];

  const ESTRIAS_X = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill={LIENZO.fg}>
        Comparación de los 3 tipos de tejido muscular
      </text>

      {rows.map((r) => (
        <g key={r.titulo}>
          <rect x={PAD} y={r.y} width={W - 2 * PAD} height={ROW_H} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <text x={LABEL_X} y={r.y + 18} fontSize={9.8} fontWeight={700} fill={r.color}>
            {r.titulo}
          </text>
          <text x={LABEL_X} y={r.y + 34} fontSize={8.4} fill={LIENZO.fg}>
            {r.l1}
          </text>
          <text x={LABEL_X} y={r.y + 47} fontSize={8.4} fill={LIENZO.fgDim}>
            {r.l2}
          </text>
        </g>
      ))}

      {/* Fila 1: fibra estriada cilindrica con nucleos perifericos */}
      <rect x={GRAPH_X} y={rows[0].y + 16} width={GRAPH_W} height={28} rx={4} fill="var(--dib-red-100)" stroke="var(--dib-red-500)" strokeWidth={1.3} />
      {ESTRIAS_X.map((i) => (
        <line
          key={`s1-${i}`}
          x1={GRAPH_X + 10 + i * 12.5}
          y1={rows[0].y + 17}
          x2={GRAPH_X + 10 + i * 12.5}
          y2={rows[0].y + 43}
          stroke="var(--dib-red-400)"
          strokeWidth={1}
        />
      ))}
      <ellipse cx={GRAPH_X + 30} cy={rows[0].y + 20} rx={7} ry={2.8} fill="var(--dib-violet-600)" />
      <ellipse cx={GRAPH_X + 84} cy={rows[0].y + 40} rx={7} ry={2.8} fill="var(--dib-violet-600)" />
      <ellipse cx={GRAPH_X + 134} cy={rows[0].y + 20} rx={7} ry={2.8} fill="var(--dib-violet-600)" />

      {/* Fila 2: cardiocitos con discos intercalados y 1 nucleo central */}
      <rect x={GRAPH_X} y={rows[1].y + 18} width={77} height={24} rx={4} fill="var(--dib-amber-100)" stroke="var(--dib-amber-600)" strokeWidth={1.3} />
      <rect x={GRAPH_X + 81} y={rows[1].y + 18} width={79} height={24} rx={4} fill="var(--dib-amber-100)" stroke="var(--dib-amber-600)" strokeWidth={1.3} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <line
          key={`s2-${i}`}
          x1={GRAPH_X + 10 + i * 14.5}
          y1={rows[1].y + 19}
          x2={GRAPH_X + 10 + i * 14.5}
          y2={rows[1].y + 41}
          stroke="var(--dib-amber-500)"
          strokeWidth={0.9}
        />
      ))}
      <line x1={GRAPH_X + 79} y1={rows[1].y + 15} x2={GRAPH_X + 79} y2={rows[1].y + 45} stroke="var(--dib-red-600)" strokeWidth={3} />
      <ellipse cx={GRAPH_X + 39} cy={rows[1].y + 30} rx={7} ry={4} fill="var(--dib-violet-600)" />
      <ellipse cx={GRAPH_X + 121} cy={rows[1].y + 30} rx={7} ry={4} fill="var(--dib-violet-600)" />

      {/* Fila 3: musculo liso fusiforme sin estrias */}
      {[
        { x: GRAPH_X + 4, y: rows[2].y + 12, w: 94 },
        { x: GRAPH_X + 60, y: rows[2].y + 26, w: 94 },
        { x: GRAPH_X + 14, y: rows[2].y + 37, w: 90 },
      ].map((f, i) => (
        <g key={`liso-${i}`}>
          <ellipse
            cx={f.x + f.w / 2}
            cy={f.y + 6}
            rx={f.w / 2}
            ry={6.5}
            fill="var(--dib-sky-500)"
            fillOpacity={0.18}
            stroke="var(--dib-blue-500)"
            strokeWidth={1.2}
          />
          <ellipse cx={f.x + f.w / 2} cy={f.y + 6} rx={6} ry={2.8} fill="var(--dib-violet-600)" />
        </g>
      ))}
    </svg>
  );
}

function SvgUnionesGlandulas() {
  const W = 360;
  const H = 236;
  const PAD = 10;
  const TOP_Y = 24;
  const TOP_H = 104;
  const BOT_Y = TOP_Y + TOP_H + 10;
  const BOT_H = 92;
  const HALF_W = (W - 2 * PAD - 8) / 2;

  const CELL_W = 46;
  const CELL_H = 66;
  const C1_X = PAD + 14;
  const C2_X = C1_X + CELL_W + 4;
  const CELL_Y = TOP_Y + 18;
  const SEAM_X = C1_X + CELL_W + 2;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={15} textAnchor="middle" fontSize={11} fontWeight={700} fill={LIENZO.fg}>
        Uniones celulares y modos de secreción
      </text>

      <rect x={PAD} y={TOP_Y} width={W - 2 * PAD} height={TOP_H} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
      <rect x={C1_X} y={CELL_Y} width={CELL_W} height={CELL_H} rx={4} fill="var(--dib-sky-500)" fillOpacity={0.12} stroke="var(--dib-sky-500)" strokeWidth={1.3} />
      <rect x={C2_X} y={CELL_Y} width={CELL_W} height={CELL_H} rx={4} fill="var(--dib-sky-500)" fillOpacity={0.12} stroke="var(--dib-sky-500)" strokeWidth={1.3} />
      <line x1={C1_X - 4} y1={CELL_Y + CELL_H + 4} x2={C2_X + CELL_W + 4} y2={CELL_Y + CELL_H + 4} stroke="var(--dib-blue-800)" strokeWidth={2.5} />

      <rect x={SEAM_X - 4} y={CELL_Y + 6} width={8} height={8} rx={2} fill="var(--dib-emerald-500)" />
      <rect x={SEAM_X - 5} y={CELL_Y + 26} width={10} height={9} rx={2} fill="var(--dib-amber-600)" />
      <rect x={SEAM_X - 4} y={CELL_Y + 46} width={8} height={6} rx={2} fill="var(--dib-violet-600)" />
      <rect x={C1_X + 18} y={CELL_Y + CELL_H - 1} width={10} height={5} fill="var(--dib-red-500)" />

      <text x={138} y={TOP_Y + 22} fontSize={9} fontWeight={700} fill="var(--dib-emerald-800)">
        1. Hermética: sella borde apical
      </text>
      <text x={138} y={TOP_Y + 44} fontSize={9} fontWeight={700} fill="var(--dib-amber-700)">
        2. Desmosoma: broche anti-tensión
      </text>
      <text x={138} y={TOP_Y + 66} fontSize={9} fontWeight={700} fill="var(--dib-violet-700)">
        3. Comunicante: poro (conexón)
      </text>
      <text x={138} y={TOP_Y + 88} fontSize={9} fontWeight={700} fill="var(--dib-red-600)">
        4. Hemidesmosoma: ancla a la base
      </text>

      <rect x={PAD} y={BOT_Y} width={HALF_W} height={BOT_H} rx={8} fill="var(--dib-emerald-50)" stroke="var(--dib-emerald-500)" strokeWidth={1.1} />
      <text x={PAD + HALF_W / 2} y={BOT_Y + 16} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-emerald-800)">
        Merocrina (exocitosis)
      </text>
      <rect x={PAD + 26} y={BOT_Y + 26} width={44} height={36} rx={6} fill="#fff" stroke="var(--dib-emerald-500)" strokeWidth={1.3} />
      <circle cx={PAD + 48} cy={BOT_Y + 50} r={5} fill="var(--dib-violet-600)" />
      <circle cx={PAD + 84} cy={BOT_Y + 34} r={3.5} fill="var(--dib-emerald-800)" />
      <circle cx={PAD + 96} cy={BOT_Y + 42} r={3.5} fill="var(--dib-emerald-800)" />
      <circle cx={PAD + 88} cy={BOT_Y + 49} r={3.5} fill="var(--dib-emerald-800)" />
      <text x={PAD + HALF_W / 2} y={BOT_Y + 78} textAnchor="middle" fontSize={8.5} fill={LIENZO.fgDim}>
        Célula intacta · páncreas
      </text>

      <rect x={PAD + HALF_W + 8} y={BOT_Y} width={HALF_W} height={BOT_H} rx={8} fill="var(--dib-amber-50)" stroke="var(--dib-amber-500)" strokeWidth={1.1} />
      <text x={PAD + HALF_W + 8 + HALF_W / 2} y={BOT_Y + 16} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-amber-700)">
        Holocrina (se desintegra)
      </text>
      <rect x={PAD + HALF_W + 34} y={BOT_Y + 26} width={44} height={36} rx={6} fill="#fff" stroke="var(--dib-amber-600)" strokeWidth={1.3} strokeDasharray="3 2" />
      <circle cx={PAD + HALF_W + 52} cy={BOT_Y + 40} r={4} fill="var(--dib-amber-500)" />
      <circle cx={PAD + HALF_W + 64} cy={BOT_Y + 48} r={4} fill="var(--dib-amber-500)" />
      <circle cx={PAD + HALF_W + 96} cy={BOT_Y + 36} r={4} fill="var(--dib-amber-500)" />
      <circle cx={PAD + HALF_W + 108} cy={BOT_Y + 46} r={3.5} fill="var(--dib-violet-400)" />
      <text x={PAD + HALF_W + 8 + HALF_W / 2} y={BOT_Y + 78} textAnchor="middle" fontSize={8.5} fill={LIENZO.fgDim}>
        Célula se rompe · sebo
      </text>
    </svg>
  );
}

function SvgMembranas() {
  const W = 360;
  const H = 204;
  const PAD = 8;
  const GAP = 6;
  const COLS = 4;
  const COL_W = (W - 2 * PAD - (COLS - 1) * GAP) / COLS;
  const TOP = 26;
  const CARD_H = 166;

  const mems = [
    { titulo: "Cutánea", epi: "Epidermis seca", desc1: "Queratinizada", desc2: "+ dermis", color: "var(--dib-amber-700)", sinEpi: false },
    { titulo: "Mucosa", epi: "Epitelio + moco", desc1: "Vías abiertas", desc2: "+ lámina propia", color: "var(--dib-emerald-800)", sinEpi: false },
    { titulo: "Serosa", epi: "Mesotelio plano", desc1: "Cavidad cerrada", desc2: "+ tej. areolar", color: "var(--dib-blue-800)", sinEpi: false },
    { titulo: "Sinovial", epi: "Sin epitelio", desc1: "Articulaciones", desc2: "Solo conjuntivo", color: "var(--dib-red-600)", sinEpi: true },
  ];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={16} textAnchor="middle" fontSize={11} fontWeight={700} fill={LIENZO.fg}>
        Arquitectura en capas de las membranas
      </text>

      {mems.map((m, i) => {
        const x = PAD + i * (COL_W + GAP);
        const cx = x + COL_W / 2;
        return (
          <g key={m.titulo}>
            <rect x={x} y={TOP} width={COL_W} height={CARD_H} rx={8} fill={LIENZO.bgSoft} stroke={m.color} strokeWidth={1.1} />
            <text x={cx} y={TOP + 17} textAnchor="middle" fontSize={10} fontWeight={700} fill={m.color}>
              {m.titulo}
            </text>

            {!m.sinEpi ? (
              <rect
                x={x + 8}
                y={TOP + 30}
                width={COL_W - 16}
                height={i === 0 ? 34 : i === 1 ? 26 : 14}
                rx={3}
                fill={m.color}
                fillOpacity={0.22}
                stroke={m.color}
                strokeWidth={1.2}
              />
            ) : (
              <rect
                x={x + 8}
                y={TOP + 30}
                width={COL_W - 16}
                height={24}
                rx={3}
                fill="#fff"
                stroke={m.color}
                strokeWidth={1}
                strokeDasharray="3 2"
              />
            )}

            <rect
              x={x + 8}
              y={TOP + 70}
              width={COL_W - 16}
              height={34}
              rx={4}
              fill="var(--dib-amber-50)"
              stroke="var(--dib-amber-500)"
              strokeWidth={1}
            />
            <text x={cx} y={TOP + 90} textAnchor="middle" fontSize={7.8} fill={LIENZO.fgDim}>
              Tej. conjuntivo
            </text>

            <text x={cx} y={TOP + 123} textAnchor="middle" fontSize={8.2} fontWeight={700} fill={LIENZO.fg}>
              {m.epi}
            </text>
            <text x={cx} y={TOP + 139} textAnchor="middle" fontSize={7.8} fill={LIENZO.fgDim}>
              {m.desc1}
            </text>
            <text x={cx} y={TOP + 151} textAnchor="middle" fontSize={7.8} fill={LIENZO.fgDim}>
              {m.desc2}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function SvgCambiosTisulares() {
  const W = 360;
  const H = 216;
  const PAD = 10;
  const GAP = 8;
  const TOP_Y = 24;
  const TOP_H = 88;
  const COL3_W = (W - 2 * PAD - 2 * GAP) / 3;
  const BOT_Y = TOP_Y + TOP_H + 10;
  const BOT_H = 84;
  const COL2_W = (W - 2 * PAD - GAP) / 2;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={15} textAnchor="middle" fontSize={11} fontWeight={700} fill={LIENZO.fg}>
        Crecimiento, encogimiento y muerte celular
      </text>

      {/* Hiperplasia */}
      <rect x={PAD} y={TOP_Y} width={COL3_W} height={TOP_H} rx={8} fill="var(--dib-emerald-50)" stroke="var(--dib-emerald-500)" strokeWidth={1.1} />
      <text x={PAD + COL3_W / 2} y={TOP_Y + 15} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-emerald-800)">
        Hiperplasia
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={`hp-${i}`}
          x={PAD + 14 + (i % 3) * 28}
          y={TOP_Y + 24 + Math.floor(i / 3) * 18}
          width={22}
          height={14}
          rx={3}
          fill="#fff"
          stroke="var(--dib-emerald-500)"
          strokeWidth={1.1}
        />
      ))}
      <text x={PAD + COL3_W / 2} y={TOP_Y + 76} textAnchor="middle" fontSize={8.2} fill={LIENZO.fgDim}>
        Más células (mitosis)
      </text>

      {/* Hipertrofia */}
      <rect x={PAD + COL3_W + GAP} y={TOP_Y} width={COL3_W} height={TOP_H} rx={8} fill="var(--dib-sky-500)" fillOpacity={0.1} stroke="var(--dib-sky-500)" strokeWidth={1.1} />
      <text x={PAD + COL3_W + GAP + COL3_W / 2} y={TOP_Y + 15} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-blue-800)">
        Hipertrofia
      </text>
      {[0, 1].map((i) => (
        <rect
          key={`ht-${i}`}
          x={PAD + COL3_W + GAP + 16 + i * 40}
          y={TOP_Y + 26}
          width={34}
          height={32}
          rx={5}
          fill="#fff"
          stroke="var(--dib-blue-500)"
          strokeWidth={1.2}
        />
      ))}
      <text x={PAD + COL3_W + GAP + COL3_W / 2} y={TOP_Y + 76} textAnchor="middle" fontSize={8.2} fill={LIENZO.fgDim}>
        Células más grandes
      </text>

      {/* Atrofia */}
      <rect x={PAD + 2 * (COL3_W + GAP)} y={TOP_Y} width={COL3_W} height={TOP_H} rx={8} fill="var(--dib-amber-50)" stroke="var(--dib-amber-500)" strokeWidth={1.1} />
      <text x={PAD + 2 * (COL3_W + GAP) + COL3_W / 2} y={TOP_Y + 15} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-amber-700)">
        Atrofia
      </text>
      {[0, 1].map((i) => (
        <rect
          key={`at-${i}`}
          x={PAD + 2 * (COL3_W + GAP) + 28 + i * 28}
          y={TOP_Y + 34}
          width={16}
          height={12}
          rx={3}
          fill="#fff"
          stroke="var(--dib-amber-500)"
          strokeWidth={1.1}
        />
      ))}
      <text x={PAD + 2 * (COL3_W + GAP) + COL3_W / 2} y={TOP_Y + 76} textAnchor="middle" fontSize={8.2} fill={LIENZO.fgDim}>
        Encoge (desuso/edad)
      </text>

      {/* Apoptosis vs Necrosis */}
      <rect x={PAD} y={BOT_Y} width={COL2_W} height={BOT_H} rx={8} fill="var(--dib-violet-400)" fillOpacity={0.14} stroke="var(--dib-violet-500)" strokeWidth={1.1} />
      <text x={PAD + COL2_W / 2} y={BOT_Y + 16} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-violet-700)">
        Apoptosis (programada)
      </text>
      <circle cx={PAD + 58} cy={BOT_Y + 42} r={10} fill="#fff" stroke="var(--dib-violet-500)" strokeWidth={1.2} />
      <circle cx={PAD + 84} cy={BOT_Y + 38} r={4} fill="var(--dib-violet-400)" />
      <circle cx={PAD + 94} cy={BOT_Y + 46} r={3.5} fill="var(--dib-violet-400)" />
      <text x={PAD + COL2_W / 2} y={BOT_Y + 71} textAnchor="middle" fontSize={8.2} fill={LIENZO.fgDim}>
        Se encoge · SIN inflamación
      </text>

      <rect x={PAD + COL2_W + GAP} y={BOT_Y} width={COL2_W} height={BOT_H} rx={8} fill="var(--dib-red-50)" stroke="var(--dib-red-500)" strokeWidth={1.1} />
      <text x={PAD + COL2_W + GAP + COL2_W / 2} y={BOT_Y + 16} textAnchor="middle" fontSize={9.5} fontWeight={700} fill="var(--dib-red-600)">
        Necrosis (patológica)
      </text>
      <circle cx={PAD + COL2_W + GAP + 64} cy={BOT_Y + 42} r={15} fill="#fff" stroke="var(--dib-red-500)" strokeWidth={1.3} strokeDasharray="4 2" />
      <circle cx={PAD + COL2_W + GAP + 92} cy={BOT_Y + 34} r={2.5} fill="var(--dib-red-500)" />
      <circle cx={PAD + COL2_W + GAP + 98} cy={BOT_Y + 48} r={2.5} fill="var(--dib-red-500)" />
      <circle cx={PAD + COL2_W + GAP + 42} cy={BOT_Y + 48} r={2.5} fill="var(--dib-red-500)" />
      <text x={PAD + COL2_W + GAP + COL2_W / 2} y={BOT_Y + 71} textAnchor="middle" fontSize={8.2} fill={LIENZO.fgDim}>
        Se hincha y rompe · CON inflamación
      </text>
    </svg>
  );
}

// ─── Escena 1: Qué es un tejido y los 4 tipos primarios ──────────────────────

function Escena1() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es un tejido? Los 4 tipos primarios</Titulo>

      <Hook>
        Tu cuerpo contiene cerca de 50 mil millones de células repartidas en unos 200 tipos distintos. Ninguna trabaja aislada: ¿cómo se organizan en equipos para formar un órgano como el estómago o el corazón?
      </Hook>

      <Definicion termino="Histología y tejido">
        La <strong>histología</strong> (anatomía microscópica) estudia los tejidos y su organización en órganos.
        Un <strong>tejido</strong> es un grupo de células y productos celulares similares que se forman en la misma región del embrión
        y colaboran para realizar una tarea estructural o fisiológica específica en un órgano.
      </Definicion>

      <Parrafo>
        Toda la anatomía humana se construye combinando apenas <strong>4 categorías primarias de tejidos</strong>:
        {" "}<strong>epitelial</strong>, <strong>conjuntivo</strong>, <strong>nervioso</strong> y <strong>muscular</strong>.
        Para distinguirlos al microscopio observa tres rasgos: el tipo de célula, las características de su{" "}
        <strong>matriz</strong> (proteínas fibrosas más un gel claro llamado sustancia fundamental o líquido extracelular)
        y la proporción entre células y matriz.
      </Parrafo>

      <Pizarra alto={224}>
        <SvgCuatroTejidos />
      </Pizarra>

      <PorQue>
        Todo órgano comienza con las <strong>3 capas germinales primarias</strong> del embrión, que reparten los papeles desde el inicio:
        el <strong>ectodermo</strong> (capa externa) origina la epidermis y el sistema nervioso;
        el <strong>endodermo</strong> (capa interna) forma el revestimiento mucoso del tubo digestivo, las vías respiratorias y las glándulas digestivas;
        y el <strong>mesodermo</strong> (capa media) forma el mesénquima que da origen al músculo, el hueso, la sangre y los demás tejidos conjuntivos.
      </PorQue>

      <Parrafo>
        Para estudiar estos tejidos bajo el microscopio se fijan (p. ej. con formalina), se cortan en rebanadas de 1 a 2 células de espesor y se tiñen.
        Según la dirección del corte verás un <strong>corte longitudinal (l.s.)</strong>, un <strong>corte transversal (c.s./x.s./t.s.)</strong>
        {" "}o un <strong>corte oblicuo</strong>. En tejidos líquidos como la sangre se usan <strong>frotis</strong>, y en membranas como el tejido areolar se usan <strong>dispersiones</strong>.
      </Parrafo>

      <Cuidado>
        No confundas <strong>matriz</strong> con citoplasma: la matriz es material extracelular ubicado <em>fuera</em> de las células.
        Y recuerda que casi cualquier órgano (un límite anatómico definido) reúne dos o más tejidos, y con frecuencia los cuatro primarios a la vez.
      </Cuidado>

      <AutoCheck
        pregunta="Con relación a los tejidos y capas embrionarias, evalúa: 1) El mesodermo origina las glándulas digestivas y las mucosas respiratorias. 2) En el tejido epitelial las células están muy juntas y apenas se ve matriz entre ellas."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Ambas (1 y 2) son correctas",
          "D) Ninguna es correcta",
        ]}
        correctaIdx={1}
        explicacion="La afirmación 1 es falsa porque las mucosas respiratorias y las glándulas digestivas provienen del endodermo (el mesodermo origina músculo, hueso, sangre y tejidos conjuntivos). La afirmación 2 es verdadera."
      />
    </EscenaRica>
  );
}

// ─── Escena 2: Tejido epitelial ──────────────────────────────────────────────

function Escena2() {
  return (
    <EscenaRica>
      <Titulo>Tejido epitelial: barreras e intercambio</Titulo>

      <Puente>
        Piensa en las tejas bien encajadas de un techo o en la cerámica pegada del baño: no dejan huecos entre sí y tienen una cara que mira hacia el cuarto y otra pegada a la pared.
      </Puente>

      <Definicion termino="Tejido epitelial y membrana basal">
        Es una lámina plana de células estrechamente adheridas (en una o más capas) con su cara <strong>apical</strong> expuesta a la superficie corporal o a una luz interna
        y su cara <strong>basal</strong> anclada a la <strong>membrana basal</strong> (colágeno y glucoproteínas). Es completamente <strong>avascular</strong>: no tiene vasos sanguíneos entre sus células.
      </Definicion>

      <PorQue>
        Cumple 6 funciones esenciales: <strong>protección</strong> contra lesiones y microbios, <strong>secreción</strong>, <strong>excreción</strong> de desechos,{" "}
        <strong>absorción</strong>, <strong>filtración</strong> y <strong>sensibilidad</strong>. Como es avascular, depende de que el oxígeno y los nutrientes difundan desde el{" "}
        <strong>tejido conjuntivo laxo subyacente</strong>, muy vascularizado, y compensa el roce con mitosis rápida en sus células basales.
      </PorQue>

      <Pizarra alto={230}>
        <SvgEpitelios />
      </Pizarra>

      <Parrafo>
        Se clasifica por el número de capas y la forma de sus células superficiales.
        En los <strong>epitelios simples</strong> todas las células tocan la membrana basal: <strong>pavimentoso simple</strong> (difusión rápida en alvéolos y vasos),{" "}
        <strong>cuboidal simple</strong> (absorción y secreción en túbulos renales y glándulas), <strong>cilíndrico simple</strong> (absorción intestinal con microvellosidades y{" "}
        <strong>células caliciformes</strong> que secretan mucina) y <strong>cilíndrico seudoestratificado</strong> (vías respiratorias, con núcleos a distintas alturas).
      </Parrafo>

      <Parrafo>
        Los <strong>epitelios estratificados</strong> tienen de 2 a 20 o más capas y solo la más profunda toca la membrana basal: se nombran por las células de la superficie.
        El <strong>pavimentoso estratificado queratinizado</strong> (epidermis, palmas y plantas) tiene células superficiales muertas con queratina y un glucolípido impermeable;
        el <strong>no queratinizado</strong> (lengua, mucosa bucal, esófago, vagina) es húmedo y resbaladizo. También existen cuboidal y cilíndrico estratificados (raro),
        y el <strong>epitelio transicional</strong> de las vías urinarias, con células superficiales redondeadas a veces binucleadas que se estira de 5 o 6 capas a 2 o 3.
      </Parrafo>

      <Ejemplo titulo="Aplicación clínica en el capítulo · Papanicolaou">
        Los epitelios renuevan sus células por <strong>exfoliación</strong> (descamación superficial).
        El <strong>examen de Papanicolaou</strong> aprovecha esta citología exfoliativa raspando suavemente células del cuello uterino para detectar signos tempranos de cáncer.
      </Ejemplo>

      <Cuidado>
        El epitelio <strong>cilíndrico seudoestratificado</strong> engaña a la vista: sus núcleos están en varios niveles y parece estratificado,
        pero todas sus células descansan sobre la membrana basal, por lo que pertenece a los epitelios simples.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md · Pregunta 66 */}
      <AutoCheck
        pregunta="Sobre el tejido epitelial, evalúa: 1) Es avascular y se nutre por difusión desde el tejido conjuntivo subyacente. 2) En el epitelio cilíndrico seudoestratificado todas las células tocan la membrana basal aunque no todas lleguen a la superficie. 3) El epitelio pavimentoso estratificado queratinizado cubre la epidermis y resiste la abrasión."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Solo 3 es correcta",
          "D) Todas son correctas",
        ]}
        correctaIdx={3}
        explicacion="Las tres afirmaciones coinciden con Saladin: el epitelio carece de vasos propios, en el seudoestratificado todas las células apoyan en la membrana basal y la epidermis es pavimentoso estratificado queratinizado."
      />
    </EscenaRica>
  );
}

// ─── Escena 3: Tejido conjuntivo ─────────────────────────────────────────────

function Escena3() {
  return (
    <EscenaRica>
      <Titulo>Tejido conjuntivo: sostén, relleno y transporte</Titulo>

      <Puente>
        Si los epitelios son el tapiz que forra las habitaciones, el tejido conjuntivo (también llamado conectivo) es la estructura del edificio: vigas, cemento, aislante térmico y tuberías de reparto.
      </Puente>

      <Definicion termino="Tejido conjuntivo">
        Es el tejido más abundante, variado y extendido del cuerpo. Sus células suelen estar muy separadas por abundante <strong>matriz extracelular</strong> compuesta por{" "}
        <strong>fibras proteicas</strong> y <strong>sustancia fundamental</strong>. Su vascularidad varía desde muy rica (tejido laxo) hasta nula (cartílago).
      </Definicion>

      <PorQue>
        Cumple 8 funciones clave: <strong>unión de órganos</strong> (tendones músculo a hueso y ligamentos hueso a hueso), <strong>soporte</strong>,{" "}
        <strong>protección física</strong>, <strong>protección inmunitaria</strong>, <strong>movimiento</strong> mediante palancas óseas,{" "}
        <strong>almacenamiento</strong> de energía en grasa y de calcio y fósforo en hueso, <strong>producción de calor</strong> (grasa parda) y <strong>transporte</strong> (sangre).
      </PorQue>

      <div style={{ fontSize: "clamp(16px, 2.1vw, 18px)", lineHeight: 1.6, color: LIENZO.fgDim, maxWidth: 600 }}>
        El tejido conjuntivo fibroso reúne:
        <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
          <li>
            <strong>Células (6):</strong> <strong>fibroblastos</strong> (fabrican fibras y sustancia fundamental), <strong>macrófagos</strong> (fagocitan desechos y activan la inmunidad),{" "}
            <strong>leucocitos</strong>, <strong>células plasmáticas</strong> (sintetizan anticuerpos), <strong>mastocitos</strong> (liberan <strong>heparina</strong> anticoagulante e <strong>histamina</strong> vasodilatadora) y <strong>adipocitos</strong>.
          </li>
          <li>
            <strong>Fibras (3):</strong> el <strong>colágeno</strong> (fibras blancas resistentes al estiramiento, ~25% de las proteínas del cuerpo), las <strong>reticulares</strong> (red esponjosa en bazo y ganglios) y las <strong>elásticas</strong> (amarillas con elastina, se estiran y recuperan su forma).
          </li>
          <li>
            <strong>Sustancia fundamental:</strong> glucosaminoglucanos (GAG, carga negativa que atrae{" "}<MathText>{"$\\text{Na}^+$"}</MathText>{" "}y{" "}<MathText>{"$\\text{K}^+$"}</MathText>{" "}para retener agua), proteoglucanos en escobilla y glucoproteínas adhesivas.
          </li>
        </ul>
      </div>

      <Pizarra alto={214}>
        <SvgConjuntivo />
      </Pizarra>

      <div style={{ fontSize: "clamp(16px, 2.1vw, 18px)", lineHeight: 1.6, color: LIENZO.fgDim, maxWidth: 600 }}>
        Se agrupa en 4 categorías:
        <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
          <li>
            <strong>1) Fibroso:</strong> laxo (<strong>areolar</strong> y <strong>reticular</strong>) y denso (<strong>denso regular</strong> con fibras paralelas en tendones y ligamentos, poco vascularizado y de curación lenta, más variante elástica; y <strong>denso irregular</strong> con fibras en toda dirección en dermis y cápsulas de órganos).
          </li>
          <li>
            <strong>2) Adiposo:</strong> <strong>grasa blanca</strong> (adultos, adipocitos de{" "}<MathText>{"$70$"}</MathText>{" "}a{" "}<MathText>{"$120\\,\\mu\\text{m}$"}</MathText>{" "}con un gran glóbulo de triglicéridos) y <strong>grasa parda</strong> (hasta 6% del peso del lactante, muchas mitocondrias generadoras de calor).
          </li>
          <li>
            <strong>3) De soporte:</strong> <strong>cartílago</strong> (hialino, elástico y fibrocartílago; condrocitos en <strong>lagunas</strong> (cavidades donde viven los condrocitos), sin capilares sanguíneos y rodeado de <strong>pericondrio</strong> salvo en fibrocartílago y cartílago articular) y <strong>hueso</strong> (compacto organizado en <strong>osteonas</strong> (unidades cilíndricas del hueso compacto) con conducto central y laminillas concéntricas, más esponjoso; ~<MathText>{"$1/3$"}</MathText>{" "}colágeno y GAG y{" "}<MathText>{"$2/3$"}</MathText>{" "}minerales de calcio y fosfato; cubierto por <strong>periostio</strong>).
          </li>
          <li>
            <strong>4) Líquido:</strong> <strong>sangre</strong>, con matriz líquida (<strong>plasma</strong>) y elementos formes: <strong>eritrocitos</strong> sin núcleo que transportan{" "}<MathText>{"$\\text{O}_2$"}</MathText>{" "}y{" "}<MathText>{"$\\text{CO}_2$"}</MathText>, 5 tipos de <strong>leucocitos</strong> con núcleo y <strong>plaquetas o trombocitos</strong> (fragmentos celulares para la coagulación).
          </li>
        </ul>
      </div>

      <Ejemplo titulo="Aplicación clínica en el capítulo · Síndrome de Marfan">
        Una mutación en el gen de la <strong>fibrilina</strong> (glucoproteína sobre la que se deposita la elastina) debilita las fibras elásticas.
        Causa dedos y extremidades largos, articulaciones hiperextensibles, hernias, alteraciones visuales y debilitamiento peligroso de las válvulas cardiacas y la pared de la aorta.
      </Ejemplo>

      <Cuidado>
        No pienses que un tejido conjuntivo siempre es sólido ni blando: tanto la <strong>sangre</strong> (matriz líquida) como el <strong>hueso</strong> (matriz mineralizada) son tejidos conjuntivos porque sus células viven separadas por abundante matriz extracelular.
      </Cuidado>

      <AutoCheck
        pregunta="Respecto al tejido conjuntivo, evalúa: 1) El cartílago carece de capilares sanguíneos y por eso sana con lentitud tras una lesión. 2) Los tendones están formados por tejido conjuntivo denso irregular que resiste tensiones en todas direcciones."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Ambas (1 y 2) son correctas",
          "D) Ninguna es correcta",
        ]}
        correctaIdx={0}
        explicacion="La afirmación 1 es verdadera: el cartílago no tiene vasos sanguíneos ni capilares, así que los nutrientes difunden lento y la reparación tarda. La 2 es falsa: los tendones y ligamentos son tejido conjuntivo denso regular (fibras paralelas)."
      />
    </EscenaRica>
  );
}

// ─── Escena 4: Tejido nervioso ───────────────────────────────────────────────

function Escena4() {
  return (
    <EscenaRica>
      <Titulo>Tejido nervioso: detección y mando rápido</Titulo>

      <Puente>
        Si apartas la mano de una olla caliente antes de pensarlo, un mensaje eléctrico recorrió un cableado celular especializado en milisegundos.
      </Puente>

      <Definicion termino="Excitabilidad y tejido nervioso">
        La <strong>excitabilidad</strong> es la capacidad de responder rápidamente a un estímulo cambiando el voltaje a través de la membrana plasmática (<strong>potencial de membrana</strong>); está muy desarrollada en los tejidos <strong>nervioso</strong> y <strong>muscular</strong>.
        El tejido nervioso se especializa en comunicarse mediante impulsos eléctricos y químicos en el encéfalo, la médula espinal, los nervios y los ganglios.
      </Definicion>

      <PorQue>
        Coordina las respuestas rápidas del organismo frente al entorno interno y externo, integrando información sensorial y emitiendo órdenes hacia músculos y glándulas. Para lograrlo combina dos clases de células: las <strong>neuronas</strong> que conducen la señal y la <strong>neuroglia</strong> que las sostiene y protege.
      </PorQue>

      <Pizarra alto={192}>
        <SvgNeurona />
      </Pizarra>

      <Parrafo>
        Cada <strong>neurona</strong> (célula nerviosa) tiene un <strong>neurosoma</strong> o cuerpo celular con el núcleo y casi todos los orgánulos,{" "}
        varias <strong>dendritas</strong> cortas y muy ramificadas que reciben señales entrantes, y por lo general un único <strong>axón</strong> o fibra nerviosa largo que envía señales de salida hacia otras células.
      </Parrafo>

      <Parrafo>
        La <strong>neuroglia</strong> (neurogliocitos) constituye la mayor parte del volumen del tejido nervioso. Sus células son mucho más pequeñas que las neuronas,{" "}
        pero las superan ampliamente en número (hay 6 tipos en el sistema nervioso) y se encargan de proteger, nutrir y asistir a las neuronas sin transmitir impulsos a larga distancia.
      </Parrafo>

      <Cuidado>
        Al mirar un corte de encéfalo o médula espinal al microscopio, no confundas todos los puntos pequeños alrededor de un neurosoma con otras neuronas: la gran mayoría son núcleos de <strong>neurogliocitos</strong> de soporte.
      </Cuidado>

      <AutoCheck
        pregunta="Sobre el tejido nervioso, evalúa estas afirmaciones: 1) Las dendritas conducen las señales de salida a larga distancia fuera del neurosoma. 2) La neuroglia genera las señales de larga distancia y es más grande que las neuronas. 3) El axón o fibra nerviosa transmite señales de salida hacia otras células."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Solo 3 es correcta",
          "D) Todas son correctas",
          "E) Ninguna es correcta",
        ]}
        correctaIdx={2}
        explicacion="La 1 es falsa porque las dendritas reciben señales entrantes hacia el neurosoma. La 2 es falsa porque los neurogliocitos son mucho más pequeños y protegen o ayudan a las neuronas. Solo la 3 es verdadera."
      />
    </EscenaRica>
  );
}

// ─── Escena 5: Tejido muscular ───────────────────────────────────────────────

function Escena5() {
  return (
    <EscenaRica>
      <Titulo>Tejido muscular: los 3 tipos contráctiles</Titulo>

      <Puente>
        Mover un brazo, bombear sangre sin descanso toda la vida y empujar comida por el intestino exigen fuerzas muy distintas. Por eso el cuerpo no usa un único músculo para todo.
      </Puente>

      <Definicion termino="Tejido muscular">
        Está compuesto por células alargadas y <strong>excitables</strong> especializadas en <strong>contraerse</strong> cuando reciben un estímulo, ejerciendo fuerza física sobre otros tejidos y órganos.
      </Definicion>

      <PorQue>
        Permite los movimientos corporales voluntarios, impulsa la sangre de manera rítmica en el corazón, regula la presión arterial al estrechar arterias y propulsa contenido a través de vísceras huecas. Existen <strong>3 tipos</strong> con estructura y control distintos:
      </PorQue>

      <Pizarra alto={232}>
        <SvgMusculos />
      </Pizarra>

      <Parrafo>
        <strong>1. Músculo estriado (esquelético):</strong> formado por fibras cilíndricas muy largas y no ramificadas, con <strong>estrías</strong> transversales alternas y <strong>varios núcleos</strong> aplanados pegados a la membrana plasmática. Suele insertarse en huesos y su control es <strong>voluntario</strong>.
      </Parrafo>

      <Parrafo>
        <strong>2. Músculo cardiaco:</strong> exclusivo del corazón. Sus miocitos (<strong>cardiocitos</strong>) son cortos, ramificados o con muescas, conservan <strong>estrías</strong> y tienen <strong>un solo núcleo central</strong> (rodeado de una zona clara con glucógeno). Se unen extremo con extremo mediante <strong>discos intercalados</strong> (uniones mecánicas y eléctricas), bajo control <strong>involuntario</strong>.
      </Parrafo>

      <Parrafo>
        <strong>3. Músculo liso:</strong> células cortas <strong>fusiformes</strong> (ahusadas en los extremos), <strong>sin estrías</strong> y con <strong>un núcleo central</strong>; control <strong>involuntario</strong>. Forma láminas en las paredes del tubo digestivo, vías respiratorias, útero, vejiga y vasos sanguíneos, además del iris, folículos pilosos y esfínteres involuntarios.
      </Parrafo>

      <Mnemotecnia>
        Regla rápida para las estrías y núcleos: <strong>Esquelético</strong> = muchos núcleos en la orilla y voluntario; <strong>Cardiaco</strong> = estrías + discos intercalados + 1 núcleo al centro; <strong>Liso</strong> = liso sin estrías + huso + 1 núcleo al centro.
      </Mnemotecnia>

      <Cuidado>
        No asocies automáticamente "estriado" con "voluntario": el <strong>músculo cardiaco</strong> también posee estrías bien marcadas, pero es completamente <strong>involuntario</strong> y uninucleado.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md · Pregunta 70 */}
      <AutoCheck
        pregunta="Evalúa estas afirmaciones sobre tejido muscular: 1) El músculo estriado esquelético tiene células cortas fusiformes con un único núcleo central. 2) El músculo cardiaco presenta estrías, un núcleo central y discos intercalados entre sus cardiocitos."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Ambas (1 y 2) son correctas",
          "D) Ninguna es correcta",
        ]}
        correctaIdx={1}
        explicacion="La afirmación 1 describe en realidad al músculo liso (células fusiformes con un núcleo central); el estriado esquelético tiene fibras largas multinucleadas periféricas. La afirmación 2 es verdadera."
      />
    </EscenaRica>
  );
}

// ─── Escena 6: Uniones celulares y glándulas ─────────────────────────────────

function Escena6() {
  return (
    <EscenaRica>
      <Titulo>Uniones celulares y glándulas</Titulo>

      <Puente>
        Para que un epitelio funcione como muralla impermeable y un corazón lata al unísono, sus células necesitan coserse entre sí con distintos cierres. Además, muchas láminas epiteliales se hunden y forman fábricas secretoras: las glándulas.
      </Puente>

      <Definicion termino="Uniones intercelulares (3 tipos)">
        Son conexiones entre células adyacentes o con la matriz: las <strong>uniones herméticas</strong> rodean el borde apical sellando el paso entre células; los <strong>desmosomas</strong> son parches tipo broche unidos a filamentos intermedios que resisten tensiones mecánicas (y los <strong>hemidesmosomas</strong> anclan células basales a la membrana basal); y las <strong>uniones comunicantes</strong> forman anillos de seis proteínas (<strong>conexones</strong>) con un poro acuoso para el paso directo de iones (como{" "}<MathText>{"$\\text{Na}^+$"}</MathText>{" "}o{" "}<MathText>{"$\\text{Ca}^{2+}$"}</MathText>) y moléculas pequeñas.
      </Definicion>

      <PorQue>
        Las uniones herméticas impiden filtraciones (como el ácido gástrico hacia tejidos profundos), los desmosomas evitan que la epidermis o el músculo cardiaco se desgarren bajo tracción, y las uniones comunicantes propagan señales eléctricas rápidas entre cardiocitos y músculo liso (faltan en el músculo estriado).
      </PorQue>

      <Pizarra alto={240}>
        <SvgUnionesGlandulas />
      </Pizarra>

      <Definicion termino="Glándulas exocrinas y endocrinas">
        Una <strong>glándula</strong> es una célula u órgano epitelial que secreta sustancias útiles o elimina desechos (parénquima secretor sostenido por un <strong>estroma</strong> conjuntivo de cápsula y tabiques). Las <strong>exocrinas</strong> mantienen un conducto hacia la superficie corporal o una luz interna; las <strong>endocrinas</strong> carecen de conducto y secretan <strong>hormonas</strong> hacia los capilares sanguíneos. Órganos como páncreas, hígado, ovarios, testículos y riñones combinan ambos papeles.
      </Definicion>

      <div style={{ fontSize: "clamp(16px, 2.1vw, 18px)", lineHeight: 1.6, color: LIENZO.fgDim, maxWidth: 600 }}>
        Las glándulas exocrinas se clasifican según dos criterios:
        <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
          <li>
            <strong>Forma y tipo de secreción:</strong> unicelulares (<strong>células caliciformes</strong>) o multicelulares por conducto (<strong>simples</strong> sin ramificar o <strong>compuestas</strong> ramificadas) y porción secretora (<strong>tubulares</strong>, <strong>acinares</strong> o <strong>tubuloacinares</strong>). Sus secreciones son <strong>serosas</strong> (acuosas), <strong>mucosas</strong> (mucina más agua = moco), mixtas o <strong>citógenas</strong> (liberan células enteras: espermatozoides y óvulos).
          </li>
          <li>
            <strong>Modo de liberación:</strong> las <strong>merocrinas (ecrinas)</strong> usan exocitosis sin destruir la célula (páncreas, glándulas lacrimales) y las <strong>holocrinas</strong> acumulan secreción hasta desintegrarse por completo (glándulas sebáceas del cuero cabelludo y párpados).
          </li>
        </ul>
      </div>

      <Ejemplo titulo="Aplicación clínica en el capítulo · Pénfigo vulgar">
        En la enfermedad autoinmunitaria <strong>pénfigo vulgar</strong>, los anticuerpos destruyen las proteínas de los <strong>desmosomas</strong>, rompiendo el anclaje entre células epidérmicas y causando ampollas extensas en piel y mucosas.
      </Ejemplo>

      <Cuidado>
        Las glándulas sudoríparas axilares e inguinales y las glándulas mamarias se llaman históricamente <strong>apocrinas</strong>, pero Saladin aclara que su secreción real es por exocitosis (<strong>merocrina</strong>), no por desprendimiento de la punta celular.
      </Cuidado>

      <AutoCheck
        pregunta="Con relación a uniones celulares y glándulas: 1) Las glándulas endocrinas dependen de conductos excretores ramificados para verter sus hormonas al exterior. 2) En las glándulas merocrinas toda la célula se desintegra para liberar la secreción. 3) Los desmosomas actúan como broches que resisten tensiones mecánicas en epidermis y músculo cardiaco."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Solo 3 es correcta",
          "D) Todas son correctas",
          "E) Ninguna es correcta",
        ]}
        correctaIdx={2}
        explicacion="La afirmación 1 es falsa: las glándulas endocrinas no tienen conductos, vierten hormonas a los capilares sanguíneos. La 2 describe a las glándulas holocrinas, no a las merocrinas. Solo la 3 es verdadera."
      />
    </EscenaRica>
  );
}

// ─── Escena 7: Membranas del cuerpo ──────────────────────────────────────────

function Escena7() {
  return (
    <EscenaRica>
      <Titulo>Membranas del cuerpo</Titulo>

      <Puente>
        Cada compartimiento del cuerpo tiene un revestimiento hecho a medida: seco y duro donde da al aire exterior, húmedo en los pasillos abiertos, aceitado en cavidades internas y deslizante dentro de las articulaciones.
      </Puente>

      <Definicion termino="Membrana tisular">
        Es una lámina plana de tejido que recubre una superficie, reviste una cavidad o envuelve un órgano. La mayoría combina un epitelio con una capa subyacente de tejido conjuntivo, aunque existe una excepción clave en las articulaciones.
      </Definicion>

      <PorQue>
        Compartimentalizan el organismo, frenan la entrada de microorganismos, mantienen la humedad o lubricación y permiten que órganos como los pulmones o el corazón se deslicen sin fricción.
      </PorQue>

      <Pizarra alto={208}>
        <SvgMembranas />
      </Pizarra>

      <Parrafo>
        <strong>1. Membrana cutánea (piel):</strong> es la más grande del cuerpo; combina epitelio pavimentoso estratificado queratinizado (<strong>epidermis</strong>) sobre <strong>dermis</strong> (tejido areolar y denso irregular) y es relativamente seca.
        {" "}<strong>2. Membranas mucosas:</strong> revisten vías abiertas al exterior (digestiva, respiratoria, urinaria y reproductora); constan de epitelio más tejido conjuntivo areolar llamado <strong>lámina propia</strong> (a veces con muscular de la mucosa) y secretan moco.
      </Parrafo>

      <Parrafo>
        <strong>3. Membranas serosas:</strong> revisten cavidades cerradas y cubren vísceras internas (<strong>pleura</strong>, <strong>pericardio</strong> y <strong>peritoneo</strong>); están hechas de <strong>mesotelio</strong> (epitelio pavimentoso simple) sobre tejido areolar y producen líquido seroso acuoso.
        {" "}<strong>4. Endotelio:</strong> tapiza el interior de los vasos sanguíneos y del corazón (<strong>endocardio</strong>); también es epitelio pavimentoso simple sobre tejido areolar y lámina elástica, originado del mesodermo.
        {" "}<strong>5. Membranas sinoviales:</strong> revisten cavidades articulares y secretan líquido sinovial; están compuestas <strong>solo por tejido conjuntivo fibroso, sin epitelio</strong>.
      </Parrafo>

      <Conexion>
        En histología y anatomía digestiva o torácica volverás a encontrar estas capas: cuando se habla de la capa serosa de un órgano abdominal, su superficie es exactamente un <strong>mesotelio</strong> apoyado sobre tejido conjuntivo laxo.
      </Conexion>

      <Cuidado>
        Dos confusiones frecuentes de examen: primera, la <strong>membrana sinovial</strong> NO tiene tejido epitelial (es solo conjuntivo). Segunda, las <strong>mucosas</strong> comunican con el exterior del cuerpo, mientras que las <strong>serosas</strong> tapizan cavidades internas cerradas.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md · Pregunta 22 */}
      <AutoCheck
        pregunta="Con relación a las membranas del cuerpo, evalúa: 1) La membrana serosa está formada por mesotelio (epitelio pavimentoso simple) sobre tejido conjuntivo laxo areolar. 2) La membrana mucosa reviste conductos abiertos al exterior y su capa conjuntiva se denomina lámina propia."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Ambas (1 y 2) son correctas",
          "D) Ninguna es correcta",
        ]}
        correctaIdx={2}
        explicacion="Ambas afirmaciones son verdaderas según Saladin (y coinciden con preguntas reales de Morfofunción): la serosa combina mesotelio y tejido areolar, y la mucosa combina epitelio con lámina propia."
      />
    </EscenaRica>
  );
}

// ─── Escena 8: Crecimiento, reparación y degeneración tisular ────────────────

function Escena8() {
  return (
    <EscenaRica>
      <Titulo>Crecimiento, reparación y muerte tisular</Titulo>

      <Hook>
        Cuando te fracturas una pierna y pasas semanas con yeso, los músculos de esa pierna se encogen; en cambio, cuando levantas pesas, aumentan de tamaño. ¿Por qué los tejidos pueden remodelarse, cicatrizar o autodestruirse en silencio?
      </Hook>

      <Definicion termino="Hiperplasia, hipertrofia, neoplasia y metaplasia">
        Los tejidos crecen por <strong>hiperplasia</strong> (aumento en el número de células por mitosis, típico del crecimiento embrionario e infantil) o por <strong>hipertrofia</strong> (agrandamiento de células preexistentes, como músculo estriado y adipocitos).
        La <strong>neoplasia</strong> es el desarrollo de un tumor (benigno o maligno) de tejido anormal no funcional. La <strong>diferenciación</strong> especializa células inmaduras, mientras que la <strong>metaplasia</strong> transforma un tejido maduro en otro tipo maduro.
      </Definicion>

      <Pizarra alto={220}>
        <SvgCambiosTisulares />
      </Pizarra>

      <Ejemplo titulo="Ejemplos del capítulo · Metaplasia, infarto y gangrena">
        En la pubertad, el epitelio vaginal pasa de cuboidal simple a pavimentoso estratificado; y en los <strong>fumadores</strong> (o tras desbloquear una fosa nasal), el epitelio respiratorio seudoestratificado cambia a pavimentoso estratificado más resistente.
        Por otro lado, cuando falta sangre ocurre necrosis: en un <strong>infarto</strong> (miocárdico o cerebral) muere tejido por corte del riego sanguíneo, y en la <strong>gangrena</strong> (seca en diabéticos, úlcera por presión o gaseosa por bacterias) la necrosis compromete zonas amplias.
      </Ejemplo>

      <Parrafo>
        Los <strong>citoblastos (células madre)</strong> presentan cuatro grados de plasticidad: <strong>totipotentes</strong> (embrión temprano, cualquier célula más placenta y saco amniótico), <strong>pluripotentes</strong> (masa celular interna del blastocisto hacia el día 4, cualquier célula del cuerpo pero no tejidos accesorios), <strong>multipotentes</strong> (dos o más líneas, como la médula ósea que produce eritrocitos y los 5 leucocitos) y <strong>unipotentes</strong> (un solo tipo celular: queratinocitos, óvulos, espermatozoides).
      </Parrafo>

      <PorQue>
        Tras una lesión, el tejido se repara por <strong>regeneración</strong> (reemplazo con el mismo tipo celular, que <strong>restaura la función normal</strong>, como en heridas cutáneas menores o el hígado) o por <strong>fibrosis</strong> (reemplazo con <strong>tejido cicatrizal</strong> de colágeno fabricado por fibroblastos, que une la herida pero <strong>no restaura la función normal</strong>, como en quemaduras extensas, músculo o tuberculosis pulmonar). En una herida cutánea: hemorragia e histamina de mastocitos → coágulo/costra y macrófagos → <strong>tejido de granulación</strong> a los 3 o 4 días (fase fibroblástica hasta 2 semanas) → regeneración epidérmica y remodelación hasta por 2 años.
      </PorQue>

      <Parrafo>
        Por desgaste o lesión ocurren tres procesos opuestos al crecimiento: <strong>atrofia</strong> (encogimiento por pérdida de tamaño o número celular, ya sea senil o por desuso), <strong>necrosis</strong> (muerte prematura y patológica por traumatismo, toxina o falta de riego; la célula se hincha, se rompe y provoca inflamación) y <strong>apoptosis</strong> (muerte celular programada mediante receptores <strong>Fas</strong>; la célula se encoge y es fagocitada rápidamente sin derramar contenido ni causar inflamación, como al desaparecer las membranas entre los dedos del embrión).
      </Parrafo>

      <Cuidado>
        No confundas <strong>regeneración</strong> con <strong>fibrosis</strong> (cicatrizar no equivale a recuperar la función original del órgano), ni confundas <strong>necrosis</strong> (accidental e inflamatoria) con <strong>apoptosis</strong> (programada y limpia).
      </Cuidado>

      <AutoCheck
        pregunta="Con relación al crecimiento, reparación y muerte tisular: 1) La hipertrofia aumenta la cantidad de células mediante mitosis rápida sin agrandar las existentes. 2) La fibrosis restaura por completo la función original del tejido con células especializadas idénticas. 3) La apoptosis provoca hinchazón, rotura celular e inflamación alrededor del tejido muerto."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Solo 3 es correcta",
          "D) Todas son correctas",
          "E) Ninguna es correcta",
        ]}
        correctaIdx={4}
        explicacion="Las tres afirmaciones invierten conceptos: 1 describe hiperplasia (hipertrofia agranda células existentes); 2 describe regeneración (fibrosis forma cicatriz de colágeno sin restaurar función); 3 describe necrosis (apoptosis encoge la célula sin causar inflamación)."
      />
    </EscenaRica>
  );
}

// ─── Escena 9: Repaso y práctica ─────────────────────────────────────────────

function Escena9() {
  return (
    <EscenaRica>
      <Titulo>Repaso y práctica</Titulo>

      <Resumen>
        <strong>Epitelial:</strong> células juntas, avascular, membrana basal, simple vs estratificado (incluye seudoestratificado y transicional).{" "}
        <strong>Conjuntivo:</strong> matriz abundante &gt; células; fibroso (laxo/denso), adiposo (blanco/pardo), soporte (cartílago avascular/hueso osteona) y sangre.{" "}
        <strong>Nervioso y muscular:</strong> tejidos excitables; neurona + neuroglia; músculo estriado (voluntario, multinucleado), cardiaco (discos intercalados, 1 núcleo central) y liso (fusiforme, sin estrías).{" "}
        <strong>Uniones, glándulas, membranas y cambios:</strong> herméticas, desmosomas, comunicantes; exocrinas (merocrinas/holocrinas) vs endocrinas; cutánea, mucosa, serosa y sinovial (sin epitelio); regeneración vs fibrosis y necrosis vs apoptosis.
      </Resumen>

      <Parrafo>
        Pon a prueba lo aprendido con tres preguntas de afirmaciones combinadas en el formato real del examen de Medicina UMSS.
      </Parrafo>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md · Pregunta 55 */}
      <AutoCheck
        pregunta="Sobre citoblastos (células madre) y sangre: 1) Las células madre de la médula ósea son multipotentes y originan eritrocitos y los cinco tipos de leucocitos. 2) Los eritrocitos maduros humanos conservan un gran núcleo violeta multilobulado. 3) Las plaquetas o trombocitos son células enteras encargadas de secretar anticuerpos."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Solo 3 es correcta",
          "D) Todas son correctas",
          "E) Ninguna es correcta",
        ]}
        correctaIdx={0}
        explicacion="La afirmación 1 es verdadera. La 2 es falsa porque los eritrocitos humanos carecen de núcleo y aparecen como discos rosas. La 3 es falsa porque las plaquetas son pequeños fragmentos celulares (quienes producen anticuerpos son las células plasmáticas)."
      />

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md · Pregunta 66 */}
      <AutoCheck
        pregunta="Evalúa estas afirmaciones sobre variedades epiteliales y tejido de soporte: 1) El epitelio transicional de las vías urinarias disminuye su número aparente de capas cuando el órgano se estira. 2) La unidad cilíndrica básica del hueso compacto es la osteona, con laminillas concéntricas alrededor de un conducto central. 3) En el cartílago, los condrocitos viven encerrados en cavidades llamadas lagunas."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Solo 3 es correcta",
          "D) Todas son correctas",
          "E) Ninguna es correcta",
        ]}
        correctaIdx={3}
        explicacion="Todas son verdaderas: el epitelio transicional pasa de unas 5 o 6 capas a 2 o 3 al estirarse; el hueso compacto se organiza en osteonas con conducto central y laminillas; y los condrocitos residen en lagunas dentro de la matriz cartilaginosa."
      />

      <AutoCheck
        pregunta="Sobre el tejido conjuntivo fibroso y sus alteraciones: 1) El síndrome de Marfan se debe a un defecto en el colágeno mineralizado del hueso compacto. 2) Los mastocitos secretan heparina, que inhibe la coagulación sanguínea, e histamina, que dilata los vasos sanguíneos."
        opciones={[
          "A) Solo 1 es correcta",
          "B) Solo 2 es correcta",
          "C) Ambas (1 y 2) son correctas",
          "D) Ninguna es correcta",
        ]}
        correctaIdx={1}
        explicacion="La afirmación 1 es falsa: el síndrome de Marfan se produce por una mutación en el gen de la fibrilina relacionada con las fibras elásticas. La afirmación 2 es verdadera."
      />
    </EscenaRica>
  );
}

// ─── Export principal ────────────────────────────────────────────────────────

const escenas = [
  { titulo: "1. ¿Qué es un tejido? Los 4 tipos", componente: Escena1 },
  { titulo: "2. Tejido epitelial", componente: Escena2 },
  { titulo: "3. Tejido conjuntivo", componente: Escena3 },
  { titulo: "4. Tejido nervioso", componente: Escena4 },
  { titulo: "5. Tejido muscular", componente: Escena5 },
  { titulo: "6. Uniones celulares y glándulas", componente: Escena6 },
  { titulo: "7. Membranas del cuerpo", componente: Escena7 },
  { titulo: "8. Cambios, reparación y muerte", componente: Escena8 },
  { titulo: "9. Repaso y práctica", componente: Escena9 },
];

export default function HistologiaPage() {
  return (
    <LeccionShell
      unidad="MED-02"
      tituloUnidad="Histología"
      escenas={escenas}
    />
  );
}

/* FUENTE: Saladin, Anatomía y fisiología, cap. 5 Histología (Tema_05_Morfo_Saladin_LITERAL_TTS.md):
 *
 * AutoCheck 1 (Escena 1):
 *   - 5.1 Capas germinales primarias: el endodermo origina el revestimiento mucoso de las vías digestivas y respiratorias y las glándulas digestivas; el mesodermo forma músculo, hueso, sangre y otros tejidos conjuntivos.
 *   - 5.1 Estudio de los tejidos: en el tejido epitelial "las células están tan juntas que apenas puede verse la matriz".
 *
 * AutoCheck 2 (Escena 2):
 *   - 5.2 Propiedades del epitelio: no tiene vasos sanguíneos propios (avascular) y se nutre por difusión desde el tejido conjuntivo subyacente rico en vasos.
 *   - 5.2 Epitelio cilíndrico seudoestratificado: todas sus células tocan la membrana basal aunque no todas alcanzan la superficie libre.
 *   - 5.2 Epitelio pavimentoso estratificado queratinizado: cubre la epidermis con capas superficiales muertas con queratina y glucolípido resistente a la abrasión.
 *
 * AutoCheck 3 (Escena 3):
 *   - 5.3 Cartílago: carece de capilares sanguíneos propios y por ello sana con lentitud; tendones y ligamentos son tejido conjuntivo denso regular (fibras paralelas), no irregular.
 *
 * AutoCheck 4 (Escena 4):
 *   - 5.4 Tejido nervioso: las dendritas reciben señales hacia el neurosoma; el axón (fibra nerviosa) envía señales de salida; la neuroglia protege y ayuda a las neuronas con células mucho más pequeñas.
 *
 * AutoCheck 5 (Escena 5):
 *   - 5.4 Tejido muscular: el estriado esquelético tiene fibras largas con varios núcleos periféricos (voluntario); el cardiaco tiene estrías, un núcleo central y discos intercalados entre sus cardiocitos; el liso tiene células cortas fusiformes sin estrías.
 *
 * AutoCheck 6 (Escena 6):
 *   - 5.5 Uniones celulares y glándulas: las glándulas endocrinas carecen de conducto y vierten hormonas a los capilares; en las merocrinas la liberación es por exocitosis sin destruir la célula (las holocrinas se desintegran); los desmosomas resisten tensiones mecánicas en epidermis y músculo cardiaco.
 *
 * AutoCheck 7 (Escena 7):
 *   - 5.5 Membranas: la serosa consta de mesotelio (epitelio pavimentoso simple) sobre tejido areolar; la mucosa reviste vías abiertas al exterior y su capa conjuntiva es la lámina propia.
 *
 * AutoCheck 8 (Escena 8):
 *   - 5.6 Crecimiento, reparación y muerte celular: la hipertrofia agranda células preexistentes; la fibrosis forma tejido cicatrizal de colágeno sin restaurar la función normal; la apoptosis es muerte programada con encogimiento y fagocitosis rápida sin inflamación.
 *
 * AutoCheck 9A (Escena 9):
 *   - 5.3 Sangre y 5.6 Citoblastos: las células madre de la médula ósea son multipotentes y originan eritrocitos y los cinco tipos de leucocitos; los eritrocitos maduros carecen de núcleo; las plaquetas (trombocitos) son pequeños fragmentos celulares.
 *
 * AutoCheck 9B (Escena 9):
 *   - 5.2 Epitelio transicional y 5.3 Cartílago y hueso: el epitelio transicional reduce sus capas aparentes de 5-6 a 2-3 al estirarse; la osteona del hueso compacto presenta laminillas concéntricas alrededor de un conducto central; los condrocitos se alojan en lagunas.
 *
 * AutoCheck 9C (Escena 9):
 *   - 5.3 Tejido conjuntivo fibroso: el síndrome de Marfan se debe a una mutación en el gen de la fibrilina de las fibras elásticas; los mastocitos secretan heparina (inhibe coagulación) e histamina (vasodilatadora).
 */
