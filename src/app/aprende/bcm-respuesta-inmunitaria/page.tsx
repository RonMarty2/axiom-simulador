"use client";

import LeccionShell from "../_components/LeccionShell";
import MathText from "../../components/MathText";
import {
  AutoCheck,
  Cuidado,
  Definicion,
  Ejemplo,
  EscenaRica,
  Misconception,
  Parrafo,
  PorQue,
  Puente,
  Resumen,
  Titulo,
} from "../_components/pedagogia";
import { LIENZO, Pizarra } from "../_components/lienzo";

function DiagramaInmunidadPRR() {
  const W = 360;
  const H = 204;
  const padX = 8;
  const gap = 22;
  const colW = (W - padX * 2 - gap) / 2;
  const leftX = padX;
  const rightX = leftX + colW + gap;
  const topY = 10;
  const boxH = 184;

  const rowX = leftX + 8;
  const rowW = colW - 16;
  const rowH = 30;
  const r1Y = 58;
  const r2Y = 94;
  const r3Y = 130;

  const subX = rightX + 8;
  const subW = colW - 16;
  const sub1Y = 58;
  const sub1H = 54;
  const sub2Y = 120;
  const sub2H = 54;

  const arrowX1 = leftX + colW + 2;
  const arrowX2 = rightX - 3;
  const arrowY = topY + boxH / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Inmunidad innata con receptores de patrones de reconocimiento y su coordinación con la inmunidad adaptativa humoral y celular"
    >
      <defs>
        <marker
          id="prr-arrow"
          markerWidth="7"
          markerHeight="7"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L5,3 z" fill={LIENZO.accent} />
        </marker>
      </defs>

      <rect
        x={leftX}
        y={topY}
        width={colW}
        height={boxH}
        rx={10}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={1.8}
      />
      <text
        x={leftX + colW / 2}
        y={topY + 18}
        textAnchor="middle"
        fill={LIENZO.ok}
        fontSize={10.5}
        fontWeight={700}
      >
        Inmunidad innata
      </text>
      <text
        x={leftX + colW / 2}
        y={topY + 32}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.8}
      >
        Rápida · PRR no polimórficos
      </text>

      <rect
        x={rowX}
        y={r1Y}
        width={rowW}
        height={rowH}
        rx={6}
        fill="#fff"
        stroke={LIENZO.fgFaint}
        strokeWidth={1}
      />
      <text
        x={rowX + rowW / 2}
        y={r1Y + 12}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        TLR
      </text>
      <text
        x={rowX + rowW / 2}
        y={r1Y + 24}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        Membrana externa y endosomas
      </text>

      <rect
        x={rowX}
        y={r2Y}
        width={rowW}
        height={rowH}
        rx={6}
        fill="#fff"
        stroke={LIENZO.fgFaint}
        strokeWidth={1}
      />
      <text
        x={rowX + rowW / 2}
        y={r2Y + 12}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        CLR
      </text>
      <text
        x={rowX + rowW / 2}
        y={r2Y + 24}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        Membrana plasmática externa
      </text>

      <rect
        x={rowX}
        y={r3Y}
        width={rowW}
        height={rowH}
        rx={6}
        fill="#fff"
        stroke={LIENZO.fgFaint}
        strokeWidth={1}
      />
      <text
        x={rowX + rowW / 2}
        y={r3Y + 12}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        NLR y RLR
      </text>
      <text
        x={rowX + rowW / 2}
        y={r3Y + 24}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        Sensores citosólicos
      </text>

      <text
        x={leftX + colW / 2}
        y={topY + boxH - 10}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={8.8}
        fontWeight={600}
      >
        Citoquinas + CPA maduras
      </text>

      <line
        x1={arrowX1}
        y1={arrowY}
        x2={arrowX2}
        y2={arrowY}
        stroke={LIENZO.accent}
        strokeWidth={2}
        markerEnd="url(#prr-arrow)"
      />

      <rect
        x={rightX}
        y={topY}
        width={colW}
        height={boxH}
        rx={10}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.accent}
        strokeWidth={1.8}
      />
      <text
        x={rightX + colW / 2}
        y={topY + 18}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={10.5}
        fontWeight={700}
      >
        Inmunidad adaptativa
      </text>
      <text
        x={rightX + colW / 2}
        y={topY + 32}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.8}
      >
        Específica · con memoria
      </text>

      <rect
        x={subX}
        y={sub1Y}
        width={subW}
        height={sub1H}
        rx={7}
        fill="#fff"
        stroke={LIENZO.accent}
        strokeWidth={1.2}
      />
      <text
        x={subX + subW / 2}
        y={sub1Y + 15}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        Humoral (linfocitos B)
      </text>
      <text
        x={subX + subW / 2}
        y={sub1Y + 29}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        Anticuerpos contra microbios
      </text>
      <text
        x={subX + subW / 2}
        y={sub1Y + 42}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        extracelulares y toxinas
      </text>

      <rect
        x={subX}
        y={sub2Y}
        width={subW}
        height={sub2H}
        rx={7}
        fill="#fff"
        stroke={LIENZO.warn}
        strokeWidth={1.2}
      />
      <text
        x={subX + subW / 2}
        y={sub2Y + 15}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        Celular (linfocitos T)
      </text>
      <text
        x={subX + subW / 2}
        y={sub2Y + 29}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        Elimina microbios
      </text>
      <text
        x={subX + subW / 2}
        y={sub2Y + 42}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        intracelulares (p. ej., virus)
      </text>
    </svg>
  );
}

function DiagramaAnticuerpoY() {
  const W = 360;
  const H = 216;
  const cx = 180;
  const hingeY = 114;
  const stemBotY = 188;
  const stemOffset = 7;

  const armLen = 60;
  const varLen = 26;
  const constLen = armLen - varLen;
  const leftTipX = cx - stemOffset - armLen;
  const rightTipX = cx + stemOffset + armLen;
  const armTopY = hingeY - armLen;

  // Cadena ligera paralela al brazo pesado (misma pendiente 45 grados, sin quiebre en V/C)
  const lightSep = 11;
  const lightStartT = 16;
  const lightMidT = constLen;
  const lightEndT = armLen;
  const ssArmT = 22;

  const leftLightStartX = cx - stemOffset - lightSep - lightStartT;
  const leftLightStartY = hingeY + lightSep - lightStartT;
  const leftLightMidX = cx - stemOffset - lightSep - lightMidT;
  const leftLightMidY = hingeY + lightSep - lightMidT;
  const leftLightEndX = cx - stemOffset - lightSep - lightEndT;
  const leftLightEndY = hingeY + lightSep - lightEndT;

  const rightLightStartX = cx + stemOffset + lightSep + lightStartT;
  const rightLightStartY = hingeY + lightSep - lightStartT;
  const rightLightMidX = cx + stemOffset + lightSep + lightMidT;
  const rightLightMidY = hingeY + lightSep - lightMidT;
  const rightLightEndX = cx + stemOffset + lightSep + lightEndT;
  const rightLightEndY = hingeY + lightSep - lightEndT;

  const leftHeavySsX = cx - stemOffset - ssArmT;
  const leftHeavySsY = hingeY - ssArmT;
  const leftLightSsX = cx - stemOffset - lightSep - ssArmT;
  const leftLightSsY = hingeY + lightSep - ssArmT;

  const rightHeavySsX = cx + stemOffset + ssArmT;
  const rightHeavySsY = hingeY - ssArmT;
  const rightLightSsX = cx + stemOffset + lightSep + ssArmT;
  const rightLightSsY = hingeY + lightSep - ssArmT;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Estructura simétrica en Y de un anticuerpo con dos cadenas pesadas, dos cadenas ligeras, dos sitios de unión al antígeno y región Fc"
    >
      <text
        x={cx}
        y={16}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={10.5}
        fontWeight={700}
      >
        2 sitios de unión al antígeno (VL + VH · CDR1, CDR2, CDR3)
      </text>

      <path
        d={`M ${leftLightEndX - 4} ${leftLightEndY - 4} Q ${leftTipX - 10} ${armTopY - 10}, ${leftTipX + 4} ${armTopY - 4}`}
        fill="none"
        stroke={LIENZO.accent}
        strokeWidth={1.8}
        strokeDasharray="3 2"
      />
      <path
        d={`M ${rightTipX - 4} ${armTopY - 4} Q ${rightTipX + 10} ${armTopY - 10}, ${rightLightEndX + 4} ${rightLightEndY - 4}`}
        fill="none"
        stroke={LIENZO.accent}
        strokeWidth={1.8}
        strokeDasharray="3 2"
      />
      <text
        x={56}
        y={38}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={9.5}
        fontWeight={700}
      >
        Sitio 1 (Ag)
      </text>
      <text
        x={304}
        y={38}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={9.5}
        fontWeight={700}
      >
        Sitio 2 (Ag)
      </text>

      {/* Puentes disulfuro S-S tocando ambas cadenas */}
      <line
        x1={cx - stemOffset}
        y1={126}
        x2={cx + stemOffset}
        y2={126}
        stroke={LIENZO.warn}
        strokeWidth={2.2}
      />
      <line
        x1={cx - stemOffset}
        y1={140}
        x2={cx + stemOffset}
        y2={140}
        stroke={LIENZO.warn}
        strokeWidth={2.2}
      />
      <line
        x1={leftHeavySsX}
        y1={leftHeavySsY}
        x2={leftLightSsX}
        y2={leftLightSsY}
        stroke={LIENZO.warn}
        strokeWidth={2.2}
      />
      <line
        x1={rightHeavySsX}
        y1={rightHeavySsY}
        x2={rightLightSsX}
        y2={rightLightSsY}
        stroke={LIENZO.warn}
        strokeWidth={2.2}
      />

      {/* Cadenas pesadas (H) */}
      <line
        x1={cx - stemOffset}
        y1={stemBotY}
        x2={cx - stemOffset}
        y2={hingeY}
        stroke={LIENZO.fg}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1={cx + stemOffset}
        y1={stemBotY}
        x2={cx + stemOffset}
        y2={hingeY}
        stroke={LIENZO.fg}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1={cx - stemOffset}
        y1={hingeY}
        x2={leftTipX}
        y2={armTopY}
        stroke={LIENZO.fg}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1={cx + stemOffset}
        y1={hingeY}
        x2={rightTipX}
        y2={armTopY}
        stroke={LIENZO.fg}
        strokeWidth={6}
        strokeLinecap="round"
      />

      {/* Puntas variables VH */}
      <line
        x1={leftTipX + varLen}
        y1={armTopY + varLen}
        x2={leftTipX}
        y2={armTopY}
        stroke={LIENZO.accent}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1={rightTipX - varLen}
        y1={armTopY + varLen}
        x2={rightTipX}
        y2={armTopY}
        stroke={LIENZO.accent}
        strokeWidth={6}
        strokeLinecap="round"
      />

      {/* Cadenas ligeras (L): CL + VL colineales */}
      <line
        x1={leftLightStartX}
        y1={leftLightStartY}
        x2={leftLightMidX}
        y2={leftLightMidY}
        stroke={LIENZO.ok}
        strokeWidth={5.5}
        strokeLinecap="round"
      />
      <line
        x1={leftLightMidX}
        y1={leftLightMidY}
        x2={leftLightEndX}
        y2={leftLightEndY}
        stroke={LIENZO.accent}
        strokeWidth={5.5}
        strokeLinecap="round"
      />
      <line
        x1={rightLightStartX}
        y1={rightLightStartY}
        x2={rightLightMidX}
        y2={rightLightMidY}
        stroke={LIENZO.ok}
        strokeWidth={5.5}
        strokeLinecap="round"
      />
      <line
        x1={rightLightMidX}
        y1={rightLightMidY}
        x2={rightLightEndX}
        y2={rightLightEndY}
        stroke={LIENZO.accent}
        strokeWidth={5.5}
        strokeLinecap="round"
      />

      {/* Rótulos izquierda y derecha */}
      <text
        x={72}
        y={122}
        textAnchor="middle"
        fill={LIENZO.ok}
        fontSize={9.6}
        fontWeight={700}
      >
        Cadena ligera (CL+VL)
      </text>
      <text
        x={72}
        y={135}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.6}
      >
        κ (60 %) o λ (40 %) · ~24 kDa
      </text>

      <text
        x={288}
        y={122}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.6}
        fontWeight={700}
      >
        Cadena pesada
      </text>
      <text
        x={288}
        y={135}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.6}
      >
        55 a 70 kDa · CH1–CH3 + VH
      </text>

      <text
        x={92}
        y={168}
        textAnchor="middle"
        fill={LIENZO.warn}
        fontSize={9.5}
        fontWeight={700}
      >
        Puentes disulfuro
      </text>
      <line
        x1={136}
        y1={164}
        x2={cx - stemOffset - 6}
        y2={142}
        stroke={LIENZO.warn}
        strokeWidth={1.2}
      />

      <text
        x={276}
        y={166}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10}
        fontWeight={700}
      >
        Región Fc
      </text>
      <text
        x={276}
        y={179}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.2}
      >
        Funciones efectoras (región C pesada)
      </text>
      <line
        x1={226}
        y1={166}
        x2={cx + stemOffset + 6}
        y2={166}
        stroke={LIENZO.fgDim}
        strokeWidth={1.2}
      />
    </svg>
  );
}

function DiagramaCPHyRCT() {
  const W = 360;
  const H = 200;
  const padX = 10;
  const gap = 16;
  const colW = (W - padX * 2 - gap) / 2;
  const c1X = padX;
  const c2X = c1X + colW + gap;
  const topY = 10;
  const cardH = 180;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Comparación entre CPH de clase I unido a CD8 y CPH de clase II unido a CD4 con el receptor de la célula T"
    >
      {/* Clase I */}
      <rect
        x={c1X}
        y={topY}
        width={colW}
        height={cardH}
        rx={10}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.accent}
        strokeWidth={1.8}
      />
      <text
        x={c1X + colW / 2}
        y={topY + 19}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={9.4}
        fontWeight={700}
      >
        CPH Clase I (HLA-A, B, C)
      </text>
      <rect
        x={c1X + 10}
        y={topY + 29}
        width={colW - 20}
        height={24}
        rx={6}
        fill="#fff"
        stroke={LIENZO.accent}
        strokeWidth={1.2}
      />
      <text
        x={c1X + colW / 2}
        y={topY + 45}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        RCT + correceptor CD8
      </text>

      <text
        x={c1X + colW / 2}
        y={topY + 72}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        Bolsillo α1–α2 cerrado
      </text>
      <text
        x={c1X + colW / 2}
        y={topY + 86}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        Péptido (8 a 10 aminoácidos)
      </text>

      <text
        x={c1X + colW / 2}
        y={topY + 108}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={8.6}
        fontWeight={600}
      >
        α3 (CD8) + β2-microglobulina
      </text>
      <text
        x={c1X + colW / 2}
        y={topY + 122}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        β2m: 12 kDa, no polimórfica
      </text>

      <line
        x1={c1X + 14}
        y1={topY + 136}
        x2={c1X + colW - 14}
        y2={topY + 136}
        stroke={LIENZO.fgFaint}
        strokeWidth={1}
      />
      <text
        x={c1X + colW / 2}
        y={topY + 153}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={8.4}
        fontWeight={600}
      >
        Casi todas las células nucleadas
      </text>
      <text
        x={c1X + colW / 2}
        y={topY + 167}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={8.8}
        fontWeight={600}
      >
        Linfocito T citotóxico CD8+
      </text>

      {/* Clase II */}
      <rect
        x={c2X}
        y={topY}
        width={colW}
        height={cardH}
        rx={10}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={1.8}
      />
      <text
        x={c2X + colW / 2}
        y={topY + 19}
        textAnchor="middle"
        fill={LIENZO.ok}
        fontSize={9}
        fontWeight={700}
      >
        CPH Clase II (HLA-DR, DP, DQ)
      </text>
      <rect
        x={c2X + 10}
        y={topY + 29}
        width={colW - 20}
        height={24}
        rx={6}
        fill="#fff"
        stroke={LIENZO.ok}
        strokeWidth={1.2}
      />
      <text
        x={c2X + colW / 2}
        y={topY + 45}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        RCT + correceptor CD4
      </text>

      <text
        x={c2X + colW / 2}
        y={topY + 72}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={700}
      >
        Bolsillo α1–β1 abierto
      </text>
      <text
        x={c2X + colW / 2}
        y={topY + 86}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        Péptido (hasta ~30 aminoácidos)
      </text>

      <text
        x={c2X + colW / 2}
        y={topY + 108}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9}
        fontWeight={600}
      >
        Cadenas α y β polimórficas
      </text>
      <text
        x={c2X + colW / 2}
        y={topY + 122}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={8.5}
      >
        Dominio β2 une a CD4
      </text>

      <line
        x1={c2X + 14}
        y1={topY + 136}
        x2={c2X + colW - 14}
        y2={topY + 136}
        stroke={LIENZO.fgFaint}
        strokeWidth={1}
      />
      <text
        x={c2X + colW / 2}
        y={topY + 153}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={8.4}
        fontWeight={600}
      >
        CPA (dendríticas y linfocitos B)
      </text>
      <text
        x={c2X + colW / 2}
        y={topY + 167}
        textAnchor="middle"
        fill={LIENZO.ok}
        fontSize={8.8}
        fontWeight={600}
      >
        Linfocito T cooperador CD4+
      </text>
    </svg>
  );
}

function DiagramaViasProcesamiento() {
  const W = 360;
  const H = 212;
  const padX = 10;
  const gap = 16;
  const colW = (W - padX * 2 - gap) / 2;
  const leftX = padX;
  const rightX = leftX + colW + gap;
  const stepH = 34;
  const stepGap = 8;
  const startY = 30;

  const pasosI = [
    { t: "1. Proteína citosólica", d: "Marcada por ubiquitinación" },
    { t: "2. Proteasoma (~700 kDa)", d: "Degrada en fragmentos" },
    { t: "3. TAP1/TAP2 al RER", d: "Péptidos de 6–30 aminoácidos" },
    { t: "4. CPH I + β2m → Golgi", d: "Presenta en membrana a CD8+" },
  ];

  const pasosII = [
    { t: "1. Ag extracelular", d: "Endosoma + lisosoma (proteasas)" },
    { t: "2. CPH II + cadena invariante", d: "Bloquea el bolsillo α1–β1 en RER" },
    { t: "3. Fusión con endosoma", d: "Degrada cadena invariante" },
    { t: "4. CPH II + péptido", d: "Presenta en superficie a CD4+" },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Vía de procesamiento de clase I con proteasoma y TAP frente a vía de clase II con endosomas y cadena invariante"
    >
      <text
        x={leftX + colW / 2}
        y={18}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={10.5}
        fontWeight={700}
      >
        Vía Clase I (intracelular)
      </text>
      <text
        x={rightX + colW / 2}
        y={18}
        textAnchor="middle"
        fill={LIENZO.ok}
        fontSize={10.5}
        fontWeight={700}
      >
        Vía Clase II (extracelular)
      </text>

      {pasosI.map((p, idx) => {
        const y = startY + idx * (stepH + stepGap);
        return (
          <g key={`i-${idx}`}>
            <rect
              x={leftX}
              y={y}
              width={colW}
              height={stepH}
              rx={7}
              fill={LIENZO.bgSoft}
              stroke={idx === 3 ? LIENZO.accent : LIENZO.fgFaint}
              strokeWidth={idx === 3 ? 1.8 : 1.2}
            />
            <text
              x={leftX + colW / 2}
              y={y + 14}
              textAnchor="middle"
              fill={LIENZO.fg}
              fontSize={8.5}
              fontWeight={700}
            >
              {p.t}
            </text>
            <text
              x={leftX + colW / 2}
              y={y + 27}
              textAnchor="middle"
              fill={LIENZO.fgDim}
              fontSize={8}
            >
              {p.d}
            </text>
          </g>
        );
      })}

      {pasosII.map((p, idx) => {
        const y = startY + idx * (stepH + stepGap);
        return (
          <g key={`ii-${idx}`}>
            <rect
              x={rightX}
              y={y}
              width={colW}
              height={stepH}
              rx={7}
              fill={LIENZO.bgSoft}
              stroke={idx === 3 ? LIENZO.ok : LIENZO.fgFaint}
              strokeWidth={idx === 3 ? 1.8 : 1.2}
            />
            <text
              x={rightX + colW / 2}
              y={y + 14}
              textAnchor="middle"
              fill={LIENZO.fg}
              fontSize={8.5}
              fontWeight={700}
            >
              {p.t}
            </text>
            <text
              x={rightX + colW / 2}
              y={y + 27}
              textAnchor="middle"
              fill={LIENZO.fgDim}
              fontSize={8}
            >
              {p.d}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DiagramaActivacionT() {
  const W = 360;
  const H = 192;
  const cellW = 104;
  const cellH = 166;
  const leftX = 8;
  const rightX = W - 8 - cellW;
  const topY = 14;
  const gapX1 = leftX + cellW;
  const gapX2 = rightX;
  const midX = (gapX1 + gapX2) / 2;

  const filas = [
    {
      y: 52,
      izq: "CPH + péptido",
      der: "RCT (CD4/CD8)",
      etiqueta: "Señal 1 (ITAM)",
      color: LIENZO.accent,
      dashed: false,
    },
    {
      y: 88,
      izq: "B7",
      der: "CD28",
      etiqueta: "Señal 2 (activa)",
      color: LIENZO.ok,
      dashed: false,
    },
    {
      y: 124,
      izq: "CD40",
      der: "CD40L",
      etiqueta: "Madura la CPA",
      color: LIENZO.warn,
      dashed: false,
    },
    {
      y: 160,
      izq: "B7 / PD-L1",
      der: "CTLA4 / PD-1",
      etiqueta: "Coinhibe (ITIM)",
      color: LIENZO.bad,
      dashed: true,
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Sinapsis entre célula presentadora de antígeno y linfocito T mostrando señal 1, señal 2, CD40-CD40L y coinhibición por CTLA4 y PD-1"
    >
      <rect
        x={leftX}
        y={topY}
        width={cellW}
        height={cellH}
        rx={12}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.fgDim}
        strokeWidth={1.6}
      />
      <text
        x={leftX + cellW / 2}
        y={topY + 18}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        CPA
      </text>

      <rect
        x={rightX}
        y={topY}
        width={cellW}
        height={cellH}
        rx={12}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.accent}
        strokeWidth={1.6}
      />
      <text
        x={rightX + cellW / 2}
        y={topY + 18}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={10.5}
        fontWeight={700}
      >
        Linfocito T
      </text>

      {filas.map((f, idx) => (
        <g key={idx}>
          <rect
            x={leftX + 6}
            y={f.y - 11}
            width={cellW - 12}
            height={22}
            rx={5}
            fill="#fff"
            stroke={f.color}
            strokeWidth={1.2}
          />
          <text
            x={leftX + cellW / 2}
            y={f.y + 3}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={8.8}
            fontWeight={600}
          >
            {f.izq}
          </text>

          <line
            x1={gapX1}
            y1={f.y}
            x2={gapX2}
            y2={f.y}
            stroke={f.color}
            strokeWidth={2}
            strokeDasharray={f.dashed ? "4 3" : undefined}
          />
          <text
            x={midX}
            y={f.y - 6}
            textAnchor="middle"
            fill={f.color}
            fontSize={8.8}
            fontWeight={700}
          >
            {f.etiqueta}
          </text>

          <rect
            x={rightX + 6}
            y={f.y - 11}
            width={cellW - 12}
            height={22}
            rx={5}
            fill="#fff"
            stroke={f.color}
            strokeWidth={1.2}
          />
          <text
            x={rightX + cellW / 2}
            y={f.y + 3}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={8.8}
            fontWeight={600}
          >
            {f.der}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DiagramaEfectores() {
  const W = 360;
  const H = 196;
  const padX = 10;
  const gap = 8;
  const cardW = (W - padX * 2 - gap * 2) / 3;
  const topY = 12;
  const cardH = 172;

  const cards = [
    {
      titulo: "T CD8+",
      sub: "Específico de Ag",
      color: LIENZO.accent,
      l1: "Reconoce:",
      l2: "CPH I + péptido",
      l3: "Libera en sinapsis:",
      l4: "Perforinas +",
      l5: "granzimas",
      pie: "Apoptosis de diana",
    },
    {
      titulo: "Célula NK",
      sub: "Sin RCT específico",
      color: LIENZO.ok,
      l1: "Se activa si falta:",
      l2: "CPH I (sin freno NKG2)",
      l3: "Desgranulación:",
      l4: "Perforinas +",
      l5: "granzimas",
      pie: "Lisis tumoral o vírica",
    },
    {
      titulo: "ADCC",
      sub: "Mediada por Ac",
      color: LIENZO.warn,
      l1: "Puente molecular:",
      l2: "Ac + receptor Fc",
      l3: "Efectores:",
      l4: "NK, macrófagos,",
      l5: "neutrófilos, eosinófilos",
      pie: "Sin complemento",
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Tres mecanismos efectores celulares: linfocito T CD8+, célula NK y citotoxicidad celular dependiente de anticuerpos ADCC"
    >
      {cards.map((c, idx) => {
        const x = padX + idx * (cardW + gap);
        const cx = x + cardW / 2;
        return (
          <g key={c.titulo}>
            <rect
              x={x}
              y={topY}
              width={cardW}
              height={cardH}
              rx={9}
              fill={LIENZO.bgSoft}
              stroke={c.color}
              strokeWidth={1.8}
            />
            <text
              x={cx}
              y={topY + 20}
              textAnchor="middle"
              fill={c.color}
              fontSize={10.5}
              fontWeight={700}
            >
              {c.titulo}
            </text>
            <text
              x={cx}
              y={topY + 34}
              textAnchor="middle"
              fill={LIENZO.fgDim}
              fontSize={8.5}
            >
              {c.sub}
            </text>
            <line
              x1={x + 8}
              y1={topY + 44}
              x2={x + cardW - 8}
              y2={topY + 44}
              stroke={LIENZO.fgFaint}
              strokeWidth={1}
            />
            <text
              x={cx}
              y={topY + 62}
              textAnchor="middle"
              fill={LIENZO.fgDim}
              fontSize={8.5}
            >
              {c.l1}
            </text>
            <text
              x={cx}
              y={topY + 76}
              textAnchor="middle"
              fill={LIENZO.fg}
              fontSize={8.0}
              fontWeight={700}
            >
              {c.l2}
            </text>
            <text
              x={cx}
              y={topY + 98}
              textAnchor="middle"
              fill={LIENZO.fgDim}
              fontSize={8.5}
            >
              {c.l3}
            </text>
            <text
              x={cx}
              y={topY + 112}
              textAnchor="middle"
              fill={LIENZO.fg}
              fontSize={9}
              fontWeight={600}
            >
              {c.l4}
            </text>
            <text
              x={cx}
              y={topY + 124}
              textAnchor="middle"
              fill={LIENZO.fg}
              fontSize={7.8}
              fontWeight={600}
            >
              {c.l5}
            </text>
            <rect
              x={x + 6}
              y={topY + 138}
              width={cardW - 12}
              height={24}
              rx={5}
              fill="#fff"
              stroke={c.color}
              strokeWidth={1}
            />
            <text
              x={cx}
              y={topY + 153}
              textAnchor="middle"
              fill={c.color}
              fontSize={7.8}
              fontWeight={700}
            >
              {c.pie}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function EscenaInnataAdaptativaPRR() {
  return (
    <EscenaRica>
      <Titulo>Inmunidad innata, adaptativa y sensores PRR</Titulo>
      <Puente>
        En la lección de sistema linfático e inmunidad ya viste que la defensa
        innata actúa rápido sin memoria y que la adaptativa es más lenta pero
        específica. Ahora toca bajar al nivel celular y molecular de Calvo:
        qué sensores disparan la alarma y cómo se coordinan ambos brazos.
      </Puente>

      <Definicion termino="Inmunidad innata e inmunidad adaptativa">
        La <strong>inmunidad innata</strong> (o natural) reúne mecanismos
        presentes antes de la infección: barreras epiteliales, sustancias como
        la <strong>lisozima</strong> de las lágrimas, fagocitos (neutrófilos y
        macrófagos),{" "}
        <strong>
          linfocitos citotóxicos naturales (NK, del inglés{" "}
          <em>natural killer</em>)
        </strong>
        , proteínas del <strong>complemento</strong> y <strong>citoquinas</strong>.
        La <strong>inmunidad adaptativa</strong> (o específica) responde a{" "}
        <strong>antígenos (Ag)</strong> mediante linfocitos B y T en dos brazos:
        la <strong>inmunidad humoral</strong> —mediada por{" "}
        <strong>anticuerpos (Ac)</strong> contra microbios extracelulares y
        toxinas— y la <strong>inmunidad celular</strong> —mediada por linfocitos
        T contra microbios intracelulares—. Al resolverse la infección, la
        mayoría de los linfocitos mueren por apoptosis recuperando el estado
        basal (<strong>homeostasis</strong>) y permanecen células memoria.
      </Definicion>

      <Parrafo>
        Todas las células inmunitarias nacen en la médula ósea por{" "}
        <strong>hematopoyesis</strong> en dos estirpes: <strong>linfoide</strong>{" "}
        (linfocitos T, B y NK) y <strong>mieloide</strong> (granulocitos,
        monocitos, células dendríticas, neutrófilos, basófilos, eosinófilos,
        eritrocitos y plaquetas). La respuesta adaptativa sigue cinco fases:
        captura del Ag por{" "}
        <strong>células presentadoras de antígeno (CPA)</strong> —siendo las{" "}
        <strong>células dendríticas</strong> las más especializadas—,
        presentación en órganos linfáticos periféricos, activación, fase
        efectora y recuperación de la homeostasis.
      </Parrafo>

      <Parrafo>
        Para detectar microbios al instante, la inmunidad innata usa{" "}
        <strong>
          receptores de patrones de reconocimiento (PRR, del inglés{" "}
          <em>pattern recognition receptors</em>)
        </strong>
        , sensores <strong>no polimórficos</strong> frente a lipopolisacáridos,
        mananos, flagelinas o ácidos nucleicos microbianos: los{" "}
        <strong>TLR</strong> (del inglés <em>Toll-like receptor</em>), en
        membrana extracelular y en endosomas; los <strong>CLR</strong>{" "}
        (receptores para lectinas de tipo C, del inglés{" "}
        <em>C-type lectin receptors</em>), en la cara extracelular de la
        membrana plasmática; y los <strong>NLR</strong> (del inglés{" "}
        <em>
          nucleotide-binding oligomerization domain (NOD) and leucine-rich
          repeat (LRR)-containing receptors
        </em>
        ) junto con los <strong>RLR</strong> (del inglés{" "}
        <em>RIG-like receptors</em>), que son sensores{" "}
        <strong>citosólicos</strong> frente a bacterias intracelulares o virus.
      </Parrafo>

      <Pizarra alto={212}>
        <DiagramaInmunidadPRR />
      </Pizarra>

      <PorQue>
        Al unirse a estructuras microbianas conservadas, los PRR promueven la
        producción de citoquinas y la maduración de las CPA, enlazando la
        defensa rápida innata con la activación específica de linfocitos B y T.
      </PorQue>

      <Ejemplo titulo="Vacunas atenuadas e inactivadas (desde Jenner, 1796)">
        Las vacunas —iniciadas en 1796 por Edward Jenner contra la viruela—
        aportan antígenos inmunogénicos e inocuos que entrenan la memoria
        adaptativa y han permitido erradicar o controlar viruela, poliomielitis
        y rubéola. Se dividen en <strong>atenuadas</strong> (organismos vivos con
        baja transmisión) e <strong>inactivadas</strong> (organismos muertos o
        antígenos purificados, que inducen menor intensidad y activan solo una
        respuesta humoral).
      </Ejemplo>

      <Cuidado>
        No ubiques a todos los PRR en la membrana externa: los{" "}
        <strong>NLR y RLR</strong> son <strong>citosólicos</strong>, los{" "}
        <strong>CLR</strong> están en la superficie extracelular y los{" "}
        <strong>TLR</strong> vigilan tanto la membrana externa como los
        endosomas. Además, a diferencia de los receptores adaptativos, los PRR{" "}
        <strong>no son polimórficos</strong>.
      </Cuidado>

      <AutoCheck
        pregunta="Con relación a la inmunidad innata, adaptativa y los receptores de patrones de reconocimiento (PRR): 1) Los sensores NLR y RLR se localizan en la cara extracelular de la membrana plasmática para detectar hidratos de carbono bacterianos. 2) Los TLR actúan tanto en la membrana extracelular como en endosomas, y la inmunidad humoral mediada por anticuerpos constituye la principal defensa frente a microorganismos extracelulares y toxinas. 3) Los PRR son receptores altamente polimórficos exclusivos de los linfocitos B de memoria."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es correcta: los TLR se ubican en membrana externa y endosomas, y la inmunidad humoral combate microbios extracelulares y toxinas. NLR y RLR son sensores citosólicos (no extracelulares) y los PRR no son polimórficos."
      />
    </EscenaRica>
  );
}

function EscenaAnticuerpoEstructura() {
  return (
    <EscenaRica>
      <Titulo>Anticuerpo: estructura en Y, cadenas y afinidad</Titulo>
      <Puente>
        Ya viste en la introducción general que los anticuerpos tienen forma de
        Y. Ahora toca abrir esa Y pieza por pieza: qué cadenas la construyen,
        cuántos puntos de agarre tiene y cómo multiplica su fuerza de unión.
      </Puente>

      <Definicion termino="Arquitectura de una inmunoglobulina (Ig)">
        Los anticuerpos son glucoproteínas de los linfocitos B con estructura
        simétrica en <strong>Y</strong> integrada por{" "}
        <strong>dos cadenas ligeras</strong> idénticas (aproximadamente{" "}
        <strong>24 kilodaltons (kDa)</strong>, con 2 dominios) y{" "}
        <strong>dos cadenas pesadas</strong> idénticas (
        <strong>55 a 70 kDa</strong>, con 4 o 5 dominios), unidas entre sí por{" "}
        <strong>puentes disulfuro</strong>. Cada dominio homólogo tiene unos{" "}
        <strong>110 aminoácidos</strong>: en el extremo aminoterminal están las{" "}
        <strong>regiones variables</strong> que reconocen el Ag (
        <strong>VL en la cadena ligera y VH en la pesada</strong>; L = ligera, H
        = pesada), y en el extremo carboxiterminal las{" "}
        <strong>regiones constantes (C)</strong> (<strong>CL</strong> en la
        cadena ligera; <strong>CH1, CH2 y CH3</strong> en la pesada), cuya base
        compartida de la Y corresponde a la <strong>región Fc</strong> que media
        las funciones efectoras.
      </Definicion>

      <Parrafo>
        Al yuxtaponerse VL y VH en cada brazo de la Y, cada anticuerpo básico
        presenta <strong>2 sitios de unión al antígeno</strong>. La especificidad
        reside en tres bucles hipervariables de VL y VH denominados{" "}
        <strong>
          regiones determinantes de la complementariedad (CDR1, CDR2 y CDR3)
        </strong>
        , que encajan con el Ag mediante interacciones no covalentes (puentes de
        hidrógeno, enlaces iónicos, interacciones hidrófobas y fuerzas de van
        der Waals). Por el extremo carboxilo de sus cadenas ligeras hay dos
        isotipos: <strong>κ</strong> (kappa, alrededor del{" "}
        <strong>60 %</strong> en humanos) y <strong>λ</strong> (lambda, el{" "}
        <strong>40 %</strong> restante); cada anticuerpo lleva dos cadenas κ o
        dos λ, nunca una de cada.
      </Parrafo>

      <Pizarra alto={224}>
        <DiagramaAnticuerpoY />
      </Pizarra>

      <PorQue>
        El enorme repertorio de anticuerpos nace por recombinación aleatoria de
        secuencias de ácido desoxirribonucleico (ADN) de las regiones V y
        adición aleatoria de nucleótidos. Luego, tras activarse el linfocito B,
        la <strong>mutación somática</strong> y la selección por el Ag (
        <strong>maduración de la afinidad</strong>) reducen la constante de
        disociación desde{" "}
        <MathText>{"$10^{-7}$"}</MathText> a{" "}
        <MathText>{"$10^{-9}\\text{ M}$"}</MathText> (molar) hasta{" "}
        <MathText>{"$10^{-11}\\text{ M}$"}</MathText> o incluso menor (cuanto
        menor es este valor, más fuerte queda unido el anticuerpo al antígeno). Si
        dos Ag
        son estructuralmente muy cercanos puede darse{" "}
        <strong>reacción cruzada</strong>, base de algunas enfermedades
        autoinmunes.
      </PorQue>

      <Ejemplo titulo="Proporción κ / λ en linfomas de estirpe B">
        En personas sanas alrededor del 60 % de los anticuerpos portan cadenas
        ligeras κ y el 40 % cadenas λ. En tumores monoclonales de linfocitos B,
        un único clon neoplásico fabrica anticuerpos con una sola clase de cadena
        ligera, alterando esa proporción y sirviendo de apoyo diagnóstico en
        linfomas B.
      </Ejemplo>

      <Cuidado>
        Trampa clásica de examen: un anticuerpo en Y tiene{" "}
        <strong>2 sitios de unión al antígeno</strong> (formados por VL y VH en
        los dos brazos), <strong>nunca 3</strong>; y jamás mezcla una cadena κ y
        una λ en la misma molécula. No confundas tampoco los puentes disulfuro
        covalentes que unen las cadenas con las interacciones no covalentes que
        fijan el Ag.
      </Cuidado>

      <AutoCheck
        pregunta="Con relación a la estructura y las cadenas de los anticuerpos: 1) La proporción fisiológica aproximada de cadenas ligeras en humanos es 60 % κ y 40 % λ, pudiendo una misma molécula de inmunoglobulina ensamblar simultáneamente una cadena κ y una cadena λ. 2) La maduración de la afinidad ocurre por mutación somática tras la activación del linfocito B, disminuyendo la constante de disociación hasta 10 elevado a menos 11 molar o menor."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es correcta: la maduración de la afinidad por mutación somática baja la constante de disociación hasta 10 elevado a menos 11 molar o menor. La afirmación 1 falla porque una molécula de anticuerpo lleva dos cadenas κ o dos λ, pero nunca una de cada."
      />
    </EscenaRica>
  );
}

function EscenaIsotiposYMonoclonales() {
  return (
    <EscenaRica>
      <Titulo>Isotipos de inmunoglobulinas y monoclonales</Titulo>
      <Puente>
        Ya sabes que la punta variable (VL + VH) decide a qué antígeno se pega el
        anticuerpo. Ahora toca mirar el tallo constante de la cadena pesada: es
        lo que define los cinco isotipos y lo que permite diseñar terapias en
        laboratorio.
      </Puente>

      <Definicion termino="Isotipos (IgM, IgG, IgA, IgE, IgD) y receptor RCB">
        Atendiendo a la región C de las cadenas pesadas existen cinco clases o{" "}
        <strong>isotipos</strong>: <strong>IgM</strong>, <strong>IgG</strong>{" "}
        (subclases IgG1, IgG2, IgG3, IgG4), <strong>IgA</strong> (subclases
        IgA1, IgA2), <strong>IgE</strong> e <strong>IgD</strong>. La{" "}
        <strong>IgM</strong> es la primera en sintetizarse ante una infección y
        forma un <strong>complejo pentamérico</strong> mediante su región Fc que
        fija el complemento para opsonizar y lisar patógenos. En{" "}
        <strong>IgG</strong>, las subclases <strong>IgG1, IgG2 e IgG4</strong>{" "}
        cruzan la placenta para proteger al feto, <strong>IgG3</strong> activa
        muy bien el complemento e <strong>IgG1 e IgG3</strong> median la
        opsonización uniéndose a receptores Fc de fagocitos. La{" "}
        <strong>IgA</strong> predomina en secreciones (leche materna, saliva,
        mucosas y tubo digestivo). La <strong>IgE</strong> se une a receptores Fc
        de basófilos y mastocitos promoviendo su desgranulación en alergias y
        defensa frente a parásitos.
      </Definicion>

      <Parrafo>
        Además de secretarse, los subtipos <strong>IgM o IgD</strong> pueden
        quedar anclados en la membrana del linfocito B —según una secuencia en su
        extremo C-terminal— asociados al heterodímero <strong>Igα/Igβ</strong>{" "}
        unido por puentes disulfuro, formando el{" "}
        <strong>receptor de la célula B (RCB)</strong>. Las colas citoplasmáticas
        de Igα e Igβ contienen{" "}
        <strong>
          motivos de activación del inmunorreceptor basados en tirosina (ITAM,
          del inglés <em>immunoreceptor tyrosine-based activation motif</em>)
        </strong>{" "}
        para transmitir señales al interior celular.
      </Parrafo>

      <Parrafo>
        En <strong>1890</strong>, <strong>Emil Behring y Shibasaburo Kitasato</strong>{" "}
        iniciaron la <strong>inmunización pasiva</strong> al transferir suero
        antitetánico de conejos a ratones. Más tarde, en <strong>1975</strong>,{" "}
        <strong>Georges Köhler y César Milstein</strong> obtuvieron{" "}
        <strong>anticuerpos monoclonales</strong> (con una única especificidad)
        fusionando linfocitos B (cada uno con una sola especificidad) con una
        célula de mieloma para obtener <strong>hibridomas</strong> capaces de
        crecer in vitro y producir cantidades prácticamente ilimitadas.
      </Parrafo>

      <PorQue>
        Cambiar la región C de la cadena pesada permite que un mismo sitio de
        unión al Ag actúe en mucosas (IgA), en sangre formando pentámeros
        (IgM), cruzando la placenta (IgG1, IgG2, IgG4) o activando mastocitos
        (IgE). En biomedicina, los monoclonales impulsaron el diagnóstico (
        <strong>
          ELISA, del inglés <em>enzyme-linked immunosorbent assay</em>
        </strong>
        , inmunohistoquímica, radioinmunoensayo), la investigación (Western blot)
        y la terapia biológica.
      </PorQue>

      <Ejemplo titulo="Sueros y terapia biológica con monoclonales en clínica">
        Los sueros animales purificados neutralizan de inmediato toxinas o
        venenos (tétanos, difteria, serpientes, alacranes). En patologías
        crónicas y cáncer se emplean anticuerpos monoclonales que bloquean
        moléculas coinhibidoras como <strong>CTLA4</strong> o{" "}
        <strong>PD-1</strong> en inmunoterapia tumoral, o que inhiben el exceso
        de <strong>factor de necrosis tumoral alfa (TNF-α)</strong> en artritis
        reumatoide, espondilitis anquilosante y psoriasis en placas, aunque su
        coste es elevado frente a fármacos de síntesis química.
      </Ejemplo>

      <Cuidado>
        Memoriza los matices exactos de las subclases de IgG en Calvo: cruzan la
        placenta <strong>IgG1, IgG2 e IgG4</strong> (no IgG3),{" "}
        <strong>IgG3</strong> destaca activando el complemento, e{" "}
        <strong>IgG1 e IgG3</strong> opsonizan muy bien mediante receptores Fc de
        fagocitos. Y no confundas la IgM pentamérica secretada con el RCB de
        membrana (IgM o IgD unida a Igα/Igβ).
      </Cuidado>

      <AutoCheck
        pregunta="Respecto a los isotipos de inmunoglobulinas y los anticuerpos monoclonales: 1) La IgE forma complejos pentaméricos que atraviesan la placenta para proteger al feto. 2) El receptor de la célula B (RCB) consiste en IgG pentamérica unida a las proteínas CD3γ, δ y ε. 3) Georges Köhler y César Milstein desarrollaron en 1975 la producción de anticuerpos monoclonales mediante hibridomas formados al fusionar linfocitos B con una célula de mieloma."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={2}
        explicacion="Solo la afirmación 3 es correcta: Köhler y Milstein obtuvieron anticuerpos monoclonales en 1975 mediante hibridomas. Quien forma pentámeros es la IgM, quienes cruzan la placenta son IgG1, IgG2 e IgG4, y el RCB está formado por IgM o IgD de membrana asociada al heterodímero Igα/Igβ."
      />
    </EscenaRica>
  );
}

function EscenaCPHyRCT() {
  return (
    <EscenaRica>
      <Titulo>CPH (HLA), receptor RCT y correceptores CD4/CD8</Titulo>
      <Puente>
        Mientras los linfocitos B atrapan antígenos libres con su RCB, los
        linfocitos T son incapaces de ver un antígeno suelto: solo lo reconocen
        cuando otra célula lo exhibe montado sobre una proteína de superficie.
      </Puente>

      <Definicion termino="CPH / HLA y restricción del CPH">
        El{" "}
        <strong>
          complejo principal de histocompatibilidad (CPH)
        </strong>{" "}
        —también llamado{" "}
        <strong>
          complejo mayor de histocompatibilidad (MHC, del inglés{" "}
          <em>major histocompatibility complex</em>)
        </strong>
        — codifica proteínas altamente polimorfas. Un <strong>alelo</strong> es
        cada variante común de un gen polimorfo, y un <strong>haplotipo</strong>{" "}
        es el conjunto de alelos del CPH presentes en un cromosoma. En humanos se
        denominan{" "}
        <strong>
          antígenos leucocíticos humanos (HLA, del inglés{" "}
          <em>human leucocyte antigens</em>)
        </strong>
        , estudiados desde los años cuarenta por George Snell con cepas
        consanguíneas de ratones: los ratones <strong>singénicos</strong> son
        genéticamente idénticos en todos sus cromosomas, mientras que las cepas{" "}
        <strong>alogénicas</strong> expresan distintos alelos. Que un linfocito T
        necesite reconocer el Ag unido a un alelo concreto del CPH se llama{" "}
        <strong>restricción del CPH</strong>.
      </Definicion>

      <Parrafo>
        Las moléculas de <strong>clase I</strong> (<strong>HLA-A, HLA-B, HLA-C</strong>)
        tienen una cadena α polimórfica (44 a 47 kDa) con dominios α1, α2 y α3,
        unida no covalentemente a la <strong>β2-microglobulina (β2m)</strong> (12 kDa,
        no codificada por el CPH y no polimórfica). Los dominios α1 y α2 forman
        un bolsillo <strong>cerrado en sus extremos</strong> (de unos{" "}
        <MathText>{"$25 \\times 10 \\times 11$"}</MathText> ángstroms) para
        péptidos de <strong>8 a 10 aminoácidos</strong>, y el dominio no
        polimórfico α3 une a <strong>CD8</strong> (de la nomenclatura de
        marcadores de diferenciación <strong>CD</strong>, del inglés{" "}
        <em>cluster of differentiation</em>). Las de{" "}
        <strong>clase II</strong> (<strong>HLA-DR, HLA-DP, HLA-DQ</strong>)
        combinan cadenas α (32 a 34 kDa) y β (29 a 32 kDa), ambas polimórficas:
        los dominios α1 y β1 forman un bolsillo <strong>abierto</strong> que
        admite péptidos más largos (hasta unos{" "}
        <strong>30 aminoácidos</strong>), y el dominio no polimórfico β2 une a{" "}
        <strong>CD4</strong>.
      </Parrafo>

      <Parrafo>
        El <strong>receptor de la célula T (RCT)</strong> es un heterodímero de
        cadenas α y β unidas por puente disulfuro, con dominios variables Vα y
        Vβ (3 CDR cada uno) que efectúan un <strong>doble reconocimiento</strong>{" "}
        del péptido y del propio CPH. A diferencia del RCB, el RCT{" "}
        <strong>no se secreta</strong> ni realiza funciones efectoras por sí
        solo; transmite señales mediante el complejo invariable{" "}
        <strong>CD3</strong> (cadenas γ, δ y ε) y la <strong>cadena ζ</strong>,
        portadoras de motivos <strong>ITAM</strong>. Los correceptores{" "}
        <strong>CD4</strong> (linfocitos T cooperadores) y <strong>CD8</strong>{" "}
        (linfocitos T citotóxicos) aumentan la adhesión y transducen señales
        uniéndose a regiones no polimórficas del CPH clase II y clase I,
        respectivamente.
      </Parrafo>

      <Pizarra alto={208}>
        <DiagramaCPHyRCT />
      </Pizarra>

      <PorQue>
        Concentrar el polimorfismo en el bolsillo de unión al péptido (α1/α2 en
        clase I y α1/β1 en clase II) diversifica los antígenos que puede
        presentar cada individuo, mientras mantener constantes los sitios de
        anclaje para CD8 (α3) y CD4 (β2) asegura que cada estirpe T lea el tipo
        correcto de CPH.
      </PorQue>

      <Cuidado>
        Confusión clásica: no inviertas los correceptores.{" "}
        <strong>CD4+</strong> interactúa con <strong>CPH clase II</strong>{" "}
        (bolsillo abierto, hasta ~30 aminoácidos), y <strong>CD8+</strong>{" "}
        interactúa con <strong>CPH clase I</strong> (bolsillo cerrado, 8 a 10
        aminoácidos). Recuerda además que la <strong>β2-microglobulina</strong>{" "}
        de clase I no es polimórfica ni está codificada por el locus CPH.
      </Cuidado>

      <AutoCheck
        pregunta="Con respecto al complejo principal de histocompatibilidad (CPH) y al receptor de la célula T (RCT): 1) Las moléculas de CPH de clase I (HLA-A, HLA-B, HLA-C) forman un bolsillo cerrado en sus extremos que alberga péptidos de 8 a 10 aminoácidos y se unen al correceptor CD8. 2) Las moléculas de CPH de clase II (HLA-DR, HLA-DP, HLA-DQ) poseen un bolsillo abierto que admite péptidos de hasta unos 30 aminoácidos y se unen al correceptor CD4. 3) El RCT está asociado de forma no covalente al complejo CD3 y la cadena ζ, que poseen motivos ITAM intracelulares para la transducción de señal."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={3}
        explicacion="Todas las afirmaciones son correctas y describen fielmente las diferencias estructurales entre CPH clase I y clase II, sus correceptores CD8 y CD4, y la composición del complejo RCT."
      />
    </EscenaRica>
  );
}

function EscenaProcesamientoAntigeno() {
  return (
    <EscenaRica>
      <Titulo>Procesamiento antigénico: vía clase I y vía clase II</Titulo>
      <Puente>
        Ya sabes que CD8+ lee CPH clase I (presente en casi todas las células
        nucleadas) y CD4+ lee CPH clase II (en CPA especializadas). Pero ¿cómo
        llegan los fragmentos proteicos correctos a cada molécula sin mezclarse?
      </Puente>

      <Definicion termino="Vía de procesamiento de clase I (antígenos citosólicos)">
        Cuando una célula expresa proteínas extrañas en su citoplasma (por
        infección vírica o transformación tumoral), las proteínas marcadas por{" "}
        <strong>ubiquitinación</strong> son degradadas por el{" "}
        <strong>proteasoma</strong> (complejo cilíndrico de unos{" "}
        <strong>700 kDa</strong>). Los fragmentos generados pasan a la luz del{" "}
        <strong>retículo endoplasmático rugoso (RER)</strong> mediante el{" "}
        <strong>transportador asociado al procesamiento (TAP)</strong>, un
        heterodímero de <strong>TAP1 y TAP2</strong> eficaz para péptidos de{" "}
        <strong>6 a 30 aminoácidos</strong>. En el RER, el péptido estabiliza
        el dímero recién sintetizado de cadena α de CPH clase I y{" "}
        <strong>β2-microglobulina</strong>, y el complejo viaja en vesículas por
        el <strong>aparato de Golgi</strong> hasta la membrana plasmática para su
        reconocimiento por un linfocito T <strong>CD8+</strong>.
      </Definicion>

      <Definicion termino="Vía de procesamiento de clase II (antígenos extracelulares)">
        Las CPA especializadas capturan Ag proteicos del exterior y los
        internalizan en <strong>endosomas</strong>, que se fusionan con{" "}
        <strong>lisosomas</strong> ricos en enzimas proteolíticas para generar
        fragmentos peptídicos. Mientras tanto, en el RER se ensamblan las
        cadenas α y β del CPH clase II junto a una{" "}
        <strong>cadena invariante</strong> que ocupa el bolsillo α1–β1 e impide
        que se carguen péptidos del propio RER. El complejo CPH II-cadena
        invariante migra en vesículas y se fusiona con los endosomas con Ag; allí
        las <strong>proteasas degradan la cadena invariante</strong>, liberan
        el bolsillo para el péptido extracelular y el complejo sale a la
        superficie para ser reconocido por un linfocito T <strong>CD4+</strong>.
      </Definicion>

      <Pizarra alto={218}>
        <DiagramaViasProcesamiento />
      </Pizarra>

      <PorQue>
        Separar físicamente ambas rutas garantiza que cualquier célula nucleada
        infectada en su citosol pueda pedir su eliminación a un CD8+, mientras
        que las CPA que patrullan el espacio extracelular alerten a los CD4+ sin
        ocupar sus moléculas de clase II con péptidos endógenos del RER.
      </PorQue>

      <Cuidado>
        No cruces las maquinarias: el <strong>proteasoma</strong> y el
        transportador <strong>TAP</strong> pertenecen exclusivamente a la vía de{" "}
        <strong>clase I</strong>, mientras que la degradación en{" "}
        <strong>endosomas/lisosomas</strong> y la protección del bolsillo por la{" "}
        <strong>cadena invariante</strong> pertenecen a la vía de{" "}
        <strong>clase II</strong>.
      </Cuidado>

      <AutoCheck
        pregunta="Con relación a las vías de procesamiento antigénico: 1) En la vía de clase I, el transportador TAP moviliza antígenos extracelulares desde los endosomas directamente hacia el citoplasma para unirlos al CPH de clase II. 2) En la vía de clase II, el proteasoma degrada la cadena invariante dentro del RER para permitir la unión de péptidos citosólicos. 3) Las moléculas de CPH de clase I se restringen exclusivamente a los linfocitos B y nunca se expresan en células nucleadas comunes."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={4}
        explicacion="Ninguna afirmación es correcta: TAP lleva péptidos citosólicos del proteasoma al RER para el CPH de clase I; la cadena invariante se degrada por proteasas en el endosoma (no en el RER por el proteasoma) en la vía de clase II; y el CPH de clase I se expresa en prácticamente todas las células nucleadas."
      />
    </EscenaRica>
  );
}

function EscenaActivacionT() {
  return (
    <EscenaRica>
      <Titulo>Activación del linfocito T: señales, frenos y subtipos Th</Titulo>
      <Puente>
        Tener el péptido puesto en el CPH no basta para desatar una respuesta T.
        Para evitar ataques contra tejidos sanos, el linfocito T exige señales de
        confirmación y posee frenos moleculares incorporados.
      </Puente>

      <Definicion termino="Señal 1, señal 2 (B7–CD28) y coinhibición (CTLA4 / PD-1)">
        El reconocimiento del complejo CPH-péptido por el RCT inicia la{" "}
        <strong>señal 1</strong>: tirosina quinasas fosforilan los motivos{" "}
        <strong>ITAM</strong> de CD3 y cadena ζ, activando{" "}
        <strong>ZAP-70</strong> y factores de transcripción (NF-κB, NFAT, MAPK,
        JnK). Esta señal sola no basta: se requiere la <strong>señal 2</strong>{" "}
        (coestímulo independiente del Ag), dada por las proteínas{" "}
        <strong>B7</strong> de la CPA al unirse a <strong>CD28</strong> del
        linfocito T. Además, <strong>CD40L</strong> (en el linfocito T) activa a{" "}
        <strong>CD40</strong> (en la CPA) madurándola. Como freno, miembros de
        la familia CD28 como <strong>CTLA4</strong> (unido a B7 con gran
        afinidad) y <strong>PD-1</strong> (unido a <strong>PD-L1</strong>)
        emiten señales negativas mediante{" "}
        <strong>
          motivos de inhibición basados en tirosina (ITIM, del inglés{" "}
          <em>immunoreceptor tyrosine-based inhibition motif</em>)
        </strong>{" "}
        que reclutan fosfatasas. En los <strong>CD8+</strong> se exige además una
        tercera señal: <strong>interleucina 2 (IL-2)</strong> aportada sobre todo por los
        linfocitos Th1.
      </Definicion>

      <Parrafo>
        Según el microambiente de citoquinas y el factor de transcripción que
        predomine, los linfocitos T <strong>CD4+</strong> se especializan (con
        cierta plasticidad entre subtipos) en cuatro perfiles: <strong>Th1</strong>{" "}
        (factor <strong>T-bet</strong>; producen <strong>interferón γ (IFN-γ)</strong>{" "}
        y TNF-β para respuestas celulares), <strong>Th2</strong> (factor{" "}
        <strong>Gata-3</strong>; producen IL-4, IL-5, IL-10 e IL-13 y ayudan a
        linfocitos B),{" "}
        <strong>T reguladores (Treg)</strong> (factor <strong>FoxP3</strong>;
        producen TGF-β e IL-10 inmunodepresoras) y <strong>Th17</strong> (factor{" "}
        <strong>RORγt</strong>; producen IL-17, TNF-α, IL-21 e IL-22
        proinflamatorias). Para llegar al foco inflamatorio, los linfocitos
        recirculan por sangre y linfa y cruzan el endotelio por{" "}
        <strong>extravasación</strong> (rodamiento, fase de arresto y migración
        transendotelial) usando selectinas, mucinas e integrinas.
      </Parrafo>

      <Pizarra alto={198}>
        <DiagramaActivacionT />
      </Pizarra>

      <PorQue>
        Las citoquinas de distintos perfiles se contrarrestan entre sí para
        ajustar el tipo de defensa: el IFN-γ de los Th1 inhibe a los Th2,
        mientras que la IL-4 y la IL-10 de los Th2 inhiben la producción de IL-12
        necesaria para diferenciar Th1.
      </PorQue>

      <Ejemplo titulo="Síndrome de deficiencia de adhesión leucocitaria (LAD)">
        El síndrome <strong>LAD</strong> (del inglés{" "}
        <em>leukocyte-adhesion deficiency</em>) es una enfermedad autosómica
        recesiva causada por la ausencia de la <strong>integrina CD18</strong>.
        Los leucocitos no logran cruzar el endotelio hacia los tejidos
        inflamados: aunque no aumenta la susceptibilidad vírica, los pacientes
        padecen infecciones bacterianas crónicas recurrentes y las lesiones{" "}
        <strong>no producen pus</strong>.
      </Ejemplo>

      <Cuidado>
        No confundas <strong>CD28</strong> con <strong>CTLA4</strong>: ambos
        enlazan a <strong>B7</strong> en la CPA, pero CD28 coestimula la
        activación mientras CTLA4 (como PD-1) la frena mediante motivos{" "}
        <strong>ITIM</strong>. Recuerda también que los linfocitos{" "}
        <strong>CD8+</strong> requieren al menos <strong>tres señales</strong>{" "}
        (RCT + CPH I, B7–CD28 e IL-2).
      </Cuidado>

      <AutoCheck
        pregunta="Con respecto a la activación de los linfocitos T y sus moléculas accesorias: 1) La unión de B7 con CTLA4 aporta la señal coestimuladora positiva que inicia la entrada del linfocito T en el ciclo celular. 2) Los linfocitos Th1 expresan el factor T-bet y secretan IFN-γ, mientras que los Treg expresan FoxP3 y secretan citoquinas inmunodepresoras como TGF-β e IL-10. 3) En el síndrome LAD por ausencia de la integrina CD18, las infecciones bacterianas crónicas forman abundante pus en los tejidos afectados."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es correcta. B7 con CTLA4 envía una señal coinhibidora negativa mediante motivos ITIM (quien coestimula es CD28), y en el síndrome LAD los leucocitos no migran al tejido infectado, por lo que no se produce pus."
      />
    </EscenaRica>
  );
}

function EscenaActivacionBYComplemento() {
  return (
    <EscenaRica>
      <Titulo>Activación del linfocito B, citoquinas y complemento</Titulo>
      <Puente>
        Ya activaste al linfocito T CD4+ cooperador. Ahora él será la pieza
        decisiva para autorizar al linfocito B a convertirse en fábrica de
        anticuerpos y cambiar de isotipo, apoyado luego por la cascada del
        complemento.
      </Puente>

      <Definicion termino="Activación del linfocito B y cambio isotípico">
        El linfocito B reconoce el Ag con su <strong>RCB</strong> (IgM o IgD de
        membrana con <strong>Igα/Igβ</strong>), cuyos motivos{" "}
        <strong>ITAM</strong> se fosforilan tras el contacto con el Ag y activan
        la quinasa <strong>Syk</strong>, que activa NF-κB, NFAT o CREB
        (amplificados por un correceptor). Para la activación completa suele
        necesitar una <strong>segunda señal</strong>: el linfocito B internaliza
        el Ag, lo procesa y lo presenta en su <strong>CPH de clase II</strong> a
        un linfocito T <strong>CD4+</strong>. Este expresa{" "}
        <strong>CD40L</strong>, que al unirse a <strong>CD40</strong> del
        linfocito B —junto con las citoquinas del T— lo transforma en{" "}
        <strong>célula plasmática</strong> secretora e induce el{" "}
        <strong>cambio isotípico</strong> (producción de un subtipo concreto de
        Ig según las citoquinas).
        Al eliminarse el Ag, muchos linfocitos mueren por apoptosis y algunos
        quedan como <strong>células B de memoria</strong> reclutadas en la
        médula ósea.
      </Definicion>

      <Parrafo>
        Las <strong>citoquinas</strong> son mensajeros de acción generalmente
        local (cuatro familias estructurales: hematopoyética, interferón,
        quimioquinas y TNF) que actúan sobre receptores celulares (cinco familias)
        activando quinasas como <strong>JAK</strong> y factores de transcripción
        como <strong>Stat</strong>, que entran al núcleo y activan genes diana.
      </Parrafo>

      <Definicion termino="El sistema del complemento">
        Principal mecanismo efector de la respuesta humoral, formado por{" "}
        <strong>más de 30 proteínas</strong> solubles o asociadas a membranas
        (<strong>C1–C9</strong> y fragmentos como C3a o C3b), producidas en su
        mayoría por los <strong>hepatocitos</strong> en forma de{" "}
        <strong>cimógenos</strong> activados en cascada proteolítica. La{" "}
        <strong>vía clásica</strong> se inicia con complejos{" "}
        <strong>antígeno-anticuerpo</strong>; la <strong>vía alternativa</strong>{" "}
        es <strong>independiente de anticuerpos</strong> y la activan elementos
        de la membrana de patógenos. Ambas conducen a opsonización, inflamación,
        eliminación de inmunocomplejos o formación del{" "}
        <strong>complejo de ataque a membranas</strong> (poro que lisa la
        célula diana).
      </Definicion>

      <PorQue>
        Exigir que el linfocito B presente el Ag en CPH clase II para recibir el
        estímulo CD40L–CD40 evita la producción descontrolada de anticuerpos; y
        contar con proteínas reguladoras que frenan la cascada del complemento
        impide que su baja especificidad destruya células propias.
      </PorQue>

      <Cuidado>
        Ubica bien cada molécula: <strong>CD40</strong> está en el{" "}
        <strong>linfocito B</strong> (y en CPA) y <strong>CD40L</strong> se
        expresa en el <strong>linfocito T CD4+ activado</strong>. Además, no
        atribuyas anticuerpos a la vía alternativa del complemento: solo la{" "}
        <strong>vía clásica</strong> se dispara por complejos{" "}
        <strong>antígeno-anticuerpo</strong>.
      </Cuidado>

      <AutoCheck
        pregunta="Con respecto a la activación del linfocito B y al sistema del complemento: 1) La vía alternativa del complemento solo puede activarse cuando existen complejos antígeno-anticuerpo circulantes. 2) La mayoría de las proteínas del complemento se producen en el bazo en forma de enzimas activas que no requieren proteólisis. 3) El reconocimiento del Ag presentado en CPH clase II por el linfocito B induce en el linfocito T CD4+ la expresión de CD40L, cuya unión a CD40 del linfocito B y las citoquinas promueven el cambio isotípico."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={2}
        explicacion="Solo la afirmación 3 es correcta. La vía alternativa es independiente de anticuerpos (la clásica usa Ag-Ac) y las proteínas del complemento se producen sobre todo en hepatocitos como cimógenos que se activan por proteólisis."
      />
    </EscenaRica>
  );
}

function EscenaEfectoresCelulares() {
  return (
    <EscenaRica>
      <Titulo>Efectores celulares: CD8+, NK y mecanismo ADCC</Titulo>
      <Puente>
        Cuando un patógeno vive dentro de nuestras propias células o surge una
        célula tumoral, los anticuerpos solos no alcanzan. Entran entonces en
        acción las células líticas encargadas de perforar e inducir la apoptosis
        de la célula diana.
      </Puente>

      <Definicion termino="Linfocitos T citotóxicos CD8+ y células NK">
        Los <strong>linfocitos T CD8+</strong> activados reconocen mediante su
        RCT un péptido extraño unido al <strong>CPH de clase I</strong> de una
        célula infectada y liberan por exocitosis en la{" "}
        <strong>sinapsis inmunológica</strong> el contenido de sus vesículas:
        <strong>perforinas</strong> (se insertan en la membrana diana y
        polimerizan formando un poro cilíndrico) y <strong>granzimas</strong>{" "}
        (serina proteasas que entran por el poro y provocan fragmentación del
        ADN y <strong>apoptosis</strong>). Las <strong>células NK</strong>{" "}
        carecen de especificidad antigénica y de RCT, pero usan el mismo arsenal
        de gránulos con perforinas y granzimas. Su actividad depende del balance
        entre receptores activadores e inhibitorios como <strong>NKG2</strong>,
        que al unirse al <strong>CPH de clase I</strong> de células sanas{" "}
        <strong>inhibe</strong> a la NK. Si una célula tumoral pierde su CPH de
        clase I para evadir a los CD8+, pierde esa señal inhibitoria y la NK la
        lisa.
      </Definicion>

      <Parrafo>
        Además, existe la{" "}
        <strong>
          citotoxicidad celular dependiente de anticuerpos (ADCC, del inglés{" "}
          <em>antibody-dependent cell-mediated cytotoxicity</em>)
        </strong>
        : células líticas sin especificidad propia —como{" "}
        <strong>NK, macrófagos, monocitos, neutrófilos y eosinófilos</strong>—
        expresan receptores para la <strong>región Fc</strong> de los
        anticuerpos. Cuando un Ac se une a un Ag en la membrana de la célula
        diana, la célula lítica se acopla a la región Fc y destruye la diana
        liberando enzimas líticas, perforinas o TNF,{" "}
        <strong>sin implicar la acción del complemento</strong>.
      </Parrafo>

      <Pizarra alto={204}>
        <DiagramaEfectores />
      </Pizarra>

      <PorQue>
        CD8+ y NK actúan como un candado doble complementario: si la célula
        enferma exhibe el péptido extraño en CPH clase I, la destruye el CD8+;
        si intenta ocultarse retirando el CPH clase I de su membrana, queda sin
        freno frente a la NK. Y la ADCC permite dirigir a células líticas innatas
        usando la precisión del anticuerpo como guía.
      </PorQue>

      <Cuidado>
        Observa el signo contrario del <strong>CPH de clase I</strong>: para el{" "}
        <strong>CD8+</strong> es la cerradura necesaria para{" "}
        <strong>activar</strong> la lisis; para la <strong>célula NK</strong>{" "}
        (vía NKG2) es una señal de <strong>inhibición</strong>. Y no atribuyas
        la <strong>ADCC</strong> al complemento: Calvo señala que este mecanismo
        no implica la acción del complemento.
      </Cuidado>

      <AutoCheck
        pregunta="Respecto a los mecanismos efectores mediados por células: 1) Cuando una célula tumoral pierde la expresión de moléculas de CPH de clase I, escapa del reconocimiento por linfocitos T CD8+, pero deja de enviar señales inhibitorias a las células NK y puede ser lisada por ellas mediante perforinas y granzimas. 2) La citotoxicidad celular dependiente de anticuerpos (ADCC) requiere la activación previa de la cascada del complemento para formar el poro lítico."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={0}
        explicacion="Solo la afirmación 1 es correcta: la pérdida de CPH clase I vuelve invisible la célula frente a los CD8+, pero elimina la inhibición sobre la célula NK (por ejemplo vía NKG2). La afirmación 2 es falsa porque la ADCC se media por receptores Fc y no implica la acción del complemento."
      />
    </EscenaRica>
  );
}

function EscenaToleranciaYDisfunciones() {
  return (
    <EscenaRica>
      <Titulo>Tolerancia inmunológica y disfunciones del sistema</Titulo>
      <Puente>
        Un sistema capaz de destruir células propias infectadas debe saber con
        exactitud cuándo callar. Si ataca lo propio aparece la autoinmunidad; si
        exagera ante el polen surge la alergia; si falla un brazo llega la
        inmunodeficiencia.
      </Puente>

      <Definicion termino="Tolerancia central y tolerancia periférica">
        La <strong>tolerancia</strong> es la capacidad de no responder de forma
        dañina frente a <strong>Ag propios</strong> ni en ausencia de peligro.
        La <strong>tolerancia central</strong> ocurre durante la maduración en
        los órganos linfáticos primarios: los linfocitos inmaduros que reconocen
        Ag propios mueren por <strong>selección negativa</strong>, o bien algunos
        se convierten en <strong>linfocitos T reguladores (FoxP3+)</strong> que
        salen a regular la periferia. La <strong>tolerancia periférica</strong>{" "}
        controla a los que escapan y apaga respuestas tras eliminar al patógeno
        mediante cuatro vías: <strong>anergia</strong> (estado de no respuesta{" "}
        <strong>sin muerte</strong> del linfocito por falta de coestímulo B7 o
        CD40, falta de <strong>patrones asociados a patógenos (PAMP)</strong> o
        por coinhibición vía CTLA4/PD-1); <strong>muerte por abandono</strong>{" "}
        (apoptosis al agotarse el estímulo antigénico);{" "}
        <strong>muerte por sobreactivación</strong> (apoptosis mediada por{" "}
        <strong>FAS y su ligando</strong> ante exceso de Ag); y acción supresora
        de los <strong>linfocitos T CD4+ reguladores</strong>.
      </Definicion>

      <Parrafo>
        Las principales <strong>disfunciones</strong> recogidas en Calvo son:
        (1) <strong>Alergias y asma</strong>: afectan a{" "}
        <strong>casi una tercera parte de la población</strong>; respuesta
        inapropiada frente a alérgenos comunes (polen, alimentos) relacionada con
        la producción de <strong>IgE</strong> sobre mastocitos: tras una primera
        exposición que genera IgE, una segunda exposición puede causar desde
        urticaria y broncoconstricción hasta{" "}
        <strong>choque anafiláctico (anafilaxia)</strong>. (2) <strong>Autoinmunidad</strong>: pérdida
        de autotolerancia que afecta en conjunto hasta al <strong>5 %</strong>{" "}
        de la población en países occidentales (influencia genética —como ciertas
        moléculas HLA— y ambiental, incluidas reacciones cruzadas), como la{" "}
        <strong>diabetes mellitus tipo 1</strong> (autoanticuerpos contra células
        β pancreáticas), la <strong>artritis reumatoide</strong> (3 veces más
        frecuente en mujeres; tratada con anti-TNF-α, analgésicos,
        antiinflamatorios y antirreumáticos), <strong>miastenia gravis</strong>{" "}
        (receptor de acetilcolina), <strong>esclerosis múltiple</strong>{" "}
        (mielina), <strong>lupus eritematoso</strong> (antígenos nucleares),{" "}
        <strong>enfermedad de Graves</strong> (hipertiroidismo),{" "}
        <strong>pénfigo vulgar</strong> (desmogleína 3),{" "}
        <strong>anemia hemolítica autoinmunitaria</strong> (grupo Rh) y{" "}
        <strong>síndrome de Goodpasture</strong> (colágeno IV).
      </Parrafo>

      <Parrafo>
        (3) <strong>Inmunodeficiencias</strong>: fuerte tendencia a infecciones;
        pueden ser <strong>congénitas</strong> —como la{" "}
        <strong>inmunodeficiencia combinada severa (SCID)</strong>, grave por
        afectar a linfocitos B y T, o la <strong>deficiencia de IgA</strong>— o{" "}
        <strong>adquiridas</strong> —como la causada por el{" "}
        <strong>
          virus del síndrome de inmunodeficiencia adquirida (SIDA)
        </strong>
        , que infecta y elimina a los{" "}
        <strong>linfocitos T CD4+</strong>—. (4){" "}
        <strong>Rechazo a trasplantes</strong> y enfermedad de injerto contra
        huésped: respuesta frente a células trasplantadas reconocidas como
        extrañas, controlada con agentes inmunodepresores.
      </Parrafo>

      <PorQue>
        La tolerancia exige un punto medio preciso: si es insuficiente surgen
        enfermedades autoinmunes, y si es excesiva dificulta controlar infecciones
        y tumores.
      </PorQue>

      <Cuidado>
        No confundas <strong>anergia</strong> con apoptosis: la anergia deja al
        linfocito <strong>vivo pero inactivo</strong>, a diferencia de la
        selección negativa, la muerte por abandono o la muerte por
        sobreactivación (FAS y su ligando), que sí destruyen la célula.
      </Cuidado>

      <AutoCheck
        pregunta="Con relación a la tolerancia y las disfunciones del sistema inmunitario: 1) La tolerancia central elimina por selección negativa a los linfocitos inmaduros autorreactivos en los órganos linfáticos primarios. 2) La anergia periférica consiste en un estado de no respuesta que no implica la muerte del linfocito ante la falta de coestímulo o de señales de peligro."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={2}
        explicacion="Ambas afirmaciones son correctas: en la tolerancia central opera la selección negativa (y la generación de algunos Treg), y en la tolerancia periférica la anergia deja al linfocito sin respuesta sin causar su muerte."
      />
    </EscenaRica>
  );
}

function EscenaRepaso() {
  return (
    <EscenaRica>
      <Titulo>Repaso y práctica</Titulo>

      <Misconception titulo="2 sitios de unión al antígeno, no 3 (y cadenas κ vs λ)">
        Un anticuerpo básico en Y tiene <strong>2 sitios de unión al Ag</strong>{" "}
        (formados por VL + VH en cada brazo), nunca 3; y sus dos cadenas
        ligeras son ambas κ (60 %) o ambas λ (40 %), nunca mixtas.
      </Misconception>

      <Misconception titulo="CPH clase I vs clase II (vía, bolsillo y correceptor)">
        <strong>Clase I</strong> procesa antígenos citosólicos vía{" "}
        <strong>proteasoma y TAP</strong>, tiene bolsillo cerrado (8 a 10
        aminoácidos) y se une a <strong>CD8+</strong>. <strong>Clase II</strong>{" "}
        procesa antígenos extracelulares en <strong>endosomas/lisosomas</strong>{" "}
        protegido inicialmente por la <strong>cadena invariante</strong>, tiene
        bolsillo abierto (hasta ~30 aminoácidos) y se une a <strong>CD4+</strong>.
      </Misconception>

      <Misconception titulo="Anergia vs apoptosis · NK vs CD8+ frente al CPH I">
        La <strong>anergia</strong> silencia al linfocito{" "}
        <strong>sin matarlo</strong>. Por otro lado, el CPH de clase I activa a
        los <strong>CD8+</strong> cuando porta un péptido extraño, pero{" "}
        <strong>inhibe</strong> a las células <strong>NK</strong> (mediante
        receptores como NKG2); perderlo vuelve vulnerable la célula ante las NK.
      </Misconception>

      <Resumen>
        La inmunidad innata (barreras, fagocitos, NK, complemento, sensores PRR:
        TLR, CLR, NLR, RLR) coopera con la adaptativa (humoral por linfocitos B
        y celular por linfocitos T). Los anticuerpos en Y tienen 2 sitios de
        unión (VL+VH, CDR1–3), región Fc efectora y 5 isotipos (IgM pentamérica,
        IgG, IgA mucosa, IgE alérgica/antiparasitaria, IgD). Los linfocitos T
        requieren presentación en CPH/HLA (clase I para CD8+, vía
        proteasoma-TAP; clase II para CD4+, vía endosoma-cadena invariante),
        señal 1 (RCT-CD3-ζ con ITAM), señal 2 (B7-CD28) y frenos (CTLA4/PD-1 con
        ITIM). Los B activados por CD40–CD40L cambian de isotipo; los efectores
        incluyen complemento (vías clásica y alternativa), perforinas/granzimas
        (CD8+ y NK) y ADCC (vía Fc, sin complemento). La tolerancia central y
        periférica evita alergias, autoinmunidad y regula el equilibrio frente a
        inmunodeficiencias y trasplantes.
      </Resumen>

      {
        // basado en: data/examenes/umss/medicina/2025-primer-parcial-curso-basico-2024-2025.md #30
      }
      <AutoCheck
        pregunta="Práctica 1 · En relación con los anticuerpos: 1) Cada anticuerpo se une muy estrechamente a su antígeno específico mediante las regiones hipervariables (CDR) de sus dominios variables. 2) Los anticuerpos son moléculas en forma de Y con tres sitios de unión al antígeno."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={0}
        explicacion="Solo la afirmación 1 es correcta: cada anticuerpo tiene alta especificidad y afinidad en sus CDR, pero su estructura simétrica en Y posee dos sitios de unión al antígeno, no tres."
      />

      {
        // basado en: data/examenes/umss/medicina/2023-primer-parcial-curso-basico-2023-2024.md #91
      }
      <AutoCheck
        pregunta="Práctica 2 · En relación con las inmunoglobulinas y sus funciones: 1) La IgE atraviesa la placenta para proteger al feto y predomina en la leche materna. 2) Los anticuerpos se unen a microbios o toxinas como parte de las defensas del cuerpo con mayor afinidad que el RCT y el CPH, y la IgM pentamérica facilita la fijación del complemento. 3) En humanos, cada molécula de anticuerpo contiene una cadena ligera κ y una cadena ligera λ unidas entre sí."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es correcta. La placenta es cruzada por IgG1, IgG2 e IgG4 y en la leche materna predomina IgA; además, una molécula de anticuerpo porta dos cadenas κ o dos λ, nunca una de cada."
      />

      {
        // basado en: data/examenes/umss/medicina/2025-primer-parcial-curso-basico-2025-2026.md #27
      }
      <AutoCheck
        pregunta="Práctica 3 · Sobre los linfocitos T CD4+: 1) Controlan las respuestas frente a antígenos proteicos presentados en CPH de clase II, estimulando a los linfocitos B y a los linfocitos T CD8+. 2) En la inmunodeficiencia adquirida por el virus del SIDA, el virus infecta a los linfocitos T CD4+ provocando su eliminación y el desequilibrio del sistema inmunitario."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={2}
        explicacion="Ambas afirmaciones son correctas y recogen tanto el papel coordinador de los CD4+ sobre el CPH de clase II como su eliminación en la infección por el virus del SIDA."
      />

      <AutoCheck
        pregunta="Práctica 4 · Sobre las vías de procesamiento antigénico y el CPH: 1) En la vía de clase I, el proteasoma degrada proteínas citosólicas ubiquitinadas y el heterodímero TAP las transporta al retículo endoplasmático rugoso (RER). 2) En la vía de clase II, la cadena invariante protege el bolsillo del CPH de clase II en el RER hasta ser degradada por proteasas en el endosoma. 3) El dominio no polimórfico α3 del CPH de clase I une a CD8 y el dominio β2 del CPH de clase II une a CD4."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={3}
        explicacion="Todas las afirmaciones son correctas y describen exactamente las vías de procesamiento de clase I y clase II y los sitios de unión para CD8 y CD4."
      />

      <AutoCheck
        pregunta="Práctica 5 · Con relación a la activación linfocitaria y el complemento: 1) La unión entre B7 y CTLA4 proporciona la segunda señal coestimuladora que activa la proliferación del linfocito T. 2) Durante la activación del linfocito B, CD40L se expresa en el linfocito B y CD40 en el linfocito T CD4+. 3) La vía alternativa del sistema del complemento requiere obligatoriamente complejos antígeno-anticuerpo para iniciarse."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={4}
        explicacion="Ninguna afirmación es correcta: B7-CTLA4 inhibe al linfocito T (quien coestimula es CD28); CD40 está en el linfocito B y CD40L en el T CD4+; y la vía alternativa del complemento es independiente de anticuerpos."
      />

      <AutoCheck
        pregunta="Práctica 6 · Respecto a los efectores celulares y la tolerancia: 1) La interacción del receptor NKG2 de la célula NK con moléculas normales de CPH de clase I activa inmediatamente la liberación de perforinas y granzimas. 2) En la tolerancia periférica, la anergia deja al linfocito en estado de no respuesta sin causar su muerte, mientras que el fallo de la autotolerancia origina enfermedades autoinmunes como la diabetes mellitus tipo 1 o la artritis reumatoide."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es correcta: la anergia silencia al linfocito sin matarlo y los fallos de autotolerancia originan autoinmunidad. En cambio, la unión de NKG2 al CPH de clase I normal inhibe a la célula NK."
      />
    </EscenaRica>
  );
}

const ESCENAS = [
  {
    titulo: "Inmunidad innata, adaptativa y sensores PRR",
    componente: EscenaInnataAdaptativaPRR,
  },
  {
    titulo: "Anticuerpo: estructura en Y, cadenas y afinidad",
    componente: EscenaAnticuerpoEstructura,
  },
  {
    titulo: "Isotipos de inmunoglobulinas y monoclonales",
    componente: EscenaIsotiposYMonoclonales,
  },
  {
    titulo: "CPH (HLA), receptor RCT y correceptores CD4/CD8",
    componente: EscenaCPHyRCT,
  },
  {
    titulo: "Procesamiento antigénico: vía clase I y vía clase II",
    componente: EscenaProcesamientoAntigeno,
  },
  {
    titulo: "Activación del linfocito T: señales, frenos y subtipos Th",
    componente: EscenaActivacionT,
  },
  {
    titulo: "Activación del linfocito B, citoquinas y complemento",
    componente: EscenaActivacionBYComplemento,
  },
  {
    titulo: "Efectores celulares: CD8+, NK y mecanismo ADCC",
    componente: EscenaEfectoresCelulares,
  },
  {
    titulo: "Tolerancia inmunológica y disfunciones del sistema",
    componente: EscenaToleranciaYDisfunciones,
  },
  { titulo: "Repaso y práctica", componente: EscenaRepaso },
];

export default function BcmRespuestaInmunitariaPage() {
  return (
    <LeccionShell
      unidad="BCM-08"
      tituloUnidad="Respuesta inmunitaria"
      escenas={ESCENAS}
    />
  );
}

/* FUENTE: Tema_17_Biologia_Celular_LITERAL_TTS.md (Alfonso Calvo · Capítulo 17: Bases celulares de la respuesta inmunitaria, Juan José Lasarte)
 * - Escena 1 datos numéricos y AutoCheck (líneas 7, 13, 19): "su desarrollo comenzó en mil setecientos noventa y seis por Edward Jenner, quien logró una vacuna contra la viruela." / "La inmunidad humoral es la principal defensa contra microorganismos extracelulares y sus toxinas." / "Los TLR son proteínas de membrana que actúan como sensores para señales tanto extracelulares... como intracelulares , cuando se encuentran en endosomas,. Los CLR están presentes en la parte extracelular de la membrana plasmática... Los NLR y RLR son sensores citosólicos... Estos sensores no son polimórficos"
 * - Escena 2 datos numéricos y AutoCheck (líneas 21, 23, 25, 27): "Cada cadena ligera , de aproximadamente veinticuatro kDa, se une a una cadena pesada , cincuenta y cinco a setenta kDa... unos ciento diez aminoácidos... dos dominios para cada cadena ligera y cuatro o cinco para cada una de las pesadas" / "cada anticuerpo presenta dos regiones de unión al Ag" / "aproximadamente el sesenta por ciento de los anticuerpos presentan cadenas ligeras k, mientras que el cuarenta por ciento restante presenta cadenas l... una molécula de anticuerpo puede tener dos cadenas k o dos cadenas l, pero nunca una de cada." / "maduración de la afinidad, que permite que la constante de disociación , que inicialmente oscilaba entre valores de diez menos siete a diez menos nueve M, pase a ser de diez menos once M o incluso menor."
 * - Escena 3 datos numéricos y AutoCheck (líneas 21, 25, 27, 29): "En mil ochocientos noventa, Emil Behring y Shibasaburo Kitasato realizaron un experimento... inmunización pasiva" / "las IgG1, dos y cuatro cruzan la placenta... la IgG3 es muy eficaz en la activación del complemento; las IgG1 e IgG3 se unen muy bien a receptores Fc en los fagocitos... IgM... complejo pentamérico... IgE... basófilos y mastocitos" / "el complejo IgM o IgD asociado al heterodímero Igα o Igβ constituye el receptor de la célula B , RCB" / "En mil novecientos setenta y cinco, Georges Köhler y Cesar Milstein desarrollaron un método para producir anticuerpos monoclonales... fusión celular, entre estos linfocitos B con una célula de un mieloma... hibridomas"
 * - Escena 4 datos numéricos y AutoCheck (líneas 37, 39, 41, 43): "década de los años cuarenta del siglo pasado, cuando George Snell... cepas consanguíneas... ratones singénicos... cepas alogénicas" / "clase I... cadena α... cuarenta y cuatro a cuarenta y siete kDa, y una subunidad de doce kDa no codificada por el CPH que se denomina β2-microglobulina, y que no es polimórfica... veinticinco ángstroms × diez ángstroms × once ángstroms... péptido de ocho a diez aminoácidos... α3... unión para las moléculas CD8" / "clase II... cadena α de treinta y dos a treinta y cuatro kDa y una cadena β de veintinueve a treinta y dos kDa... bolsillo no queda cerrado en sus extremos... hasta unos treinta aminoácidos... β2 presenta un bucle encargado de la unión a la molécula CD4" / "RCT... heterodímero compuesto por las cadenas α y β... complejo CD3 y la cadena ζ... motivos denominados ITAM"
 * - Escena 5 datos numéricos y AutoCheck (líneas 49, 51): "proteasoma... complejo de subunidades en forma de cilindro de unos setecientos kDa... ubiquitinación previa... transportador asociado al procesamiento , TAP, constituido por un heterodímero de las proteínas TAP1 y TAP2... péptidos de una longitud de entre seis y treinta aminoácidos... RER... β2-microglobulina... aparato de Golgi... CD8+" / "clase II... endosomas... lisosomas... cadena invariante que ocupa el bolsillo hidrófobo definido por las subunidades α1 y β1... proteasas degradará la cadena invariante... CD4+"
 * - Escena 6 datos numéricos y AutoCheck (líneas 45, 47, 57, 59): "B7... CD28... CTLA4 o PD-un... CD40L... CD40" / "síndrome LAD... ausencia de la integrina CD18... no producen pus." / "señal un... señal dos... motivos de inhibición ITIM" / "Th1, que expresan el factor de transcripción T-bet y producen principalmente las citoquinas IFN-γ y TNF-β... Treg, que expresan el factor FoxP3 y son productores de citoquinas inmunodepresoras como el TGF-β o la IL-diez... CD8+ requieren de al menos tres señales... IL-dos"
 * - Escena 7 datos numéricos y AutoCheck (líneas 63, 65, 67, 71): "CD40 del linfocito B con su ligando CD40L en la superficie del linfocito T... cambio isotípico" / "cuatro familias de citoquinas... cinco familias" / "complemento... más de treinta proteínas... hepatocitos... cimógenos... proteólisis... C1-C9... vía clásica se inicia con la formación del complejo antígeno-anticuerpo... vía alternativa, independiente de la presencia de anticuerpos"
 * - Escena 8 datos numéricos y AutoCheck (líneas 61, 75, 77): "perforinas... granzimas... sinapsis celular... apoptosis" / "interacción del receptor NKG2 de la célula NK con las moléculas del CPH de clase I... inhibe la actividad NK... células tumorales pierden su capacidad de presentar el CPH de clase I... dejan de transmitir señales inhibitorias a las células NK" / "citotoxicidad celular mediada por anticuerpos , ADCC... receptores para la región Fc... no implica la acción del complemento"
 * - Escena 9 datos numéricos y AutoCheck (líneas 79, 83, 85, 87): "tolerancia central... selección negativa... tolerancia periférica... anergia, que no implica la muerte del linfocito." / "casi una tercera parte de la población sufre alergias" / "autoinmunes... hasta al cinco por ciento de la población en los países occidentales... artritis reumatoide... Las mujeres tienen tres veces más probabilidades" / "SCID... virus del S I D A, que infecta a los linfocitos T CD4+, provocando su eliminación"
 * - Escena 10 Práctica 1 (línea 23): "cada anticuerpo presenta dos regiones de unión al Ag... CDR1, CDR2 y CDR3"
 * - Escena 10 Práctica 2 (líneas 21, 25): "la unión de un anticuerpo con un Ag presenta unas constantes de afinidad mayores que las observadas para las otras dos... IgG1, dos y cuatro cruzan la placenta... IgA es la Ig predominante en las secreciones externas , leche materna... IgM... complejo pentamérico... dos cadenas k o dos cadenas l, pero nunca una de cada."
 * - Escena 10 Práctica 3 (líneas 47, 87): "linfocitos T CD4+ controlan prácticamente todas las respuestas inmunitarias frente a los Ag proteicos... proliferación y diferenciación de los linfocitos B y los linfocitos T CD8+... unido a las moléculas del CPH de clase II" / "virus del S I D A, que infecta a los linfocitos T CD4+, provocando su eliminación y el consecuente desequilibrio y deficiencia del sistema inmunitario."
 * - Escena 10 Práctica 4 (líneas 39, 43, 49, 51): "α3... unión para las moléculas CD8... β2... unión a la molécula CD4" / "proteasoma... ubiquitinación... TAP... RER" / "cadena invariante... endosomas"
 * - Escena 10 Práctica 5 (líneas 45, 57, 63, 71): "B7... CTLA4... regulación negativa" / "CD40 del linfocito B con su ligando CD40L en la superficie del linfocito T" / "vía alternativa, independiente de la presencia de anticuerpos"
 * - Escena 10 Práctica 6 (líneas 75, 79, 85): "NKG2 de la célula NK con las moléculas del CPH de clase I... inhibe la actividad NK" / "anergia, que no implica la muerte del linfocito" / "enfermedades autoinmunes... diabetes mellitus de tipo un... artritis reumatoide"
 */
