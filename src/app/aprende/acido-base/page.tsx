"use client";

import { useMemo, useState } from "react";
import LeccionShell from "../_components/LeccionShell";
import MathText from "../../components/MathText";
import { LIENZO, Pizarra } from "../_components/lienzo";
import {
  AutoCheck,
  Cuidado,
  Definicion,
  EscenaRica,
  Hook,
  Misconception,
  Parrafo,
  Paso,
  PorQue,
  Puente,
  Resumen,
  Titulo,
  WorkedExample,
} from "../_components/pedagogia";

// -----------------------------------------------------------------------------
// Figuras SVG con coordenadas calculadas (todas pensadas para caber en 360 px)
// -----------------------------------------------------------------------------

function FigPropiedadesIndicadores() {
  const W = 340;
  const H = 210;
  const padX = 16;
  const colW = (W - padX * 3) / 2;
  const col1X = padX;
  const col2X = padX * 2 + colW;
  const cardY = 26;
  const cardH = 164;
  const bandY = cardY + 72;
  const bandH = 34;

  return (
    <Pizarra alto={H}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Comparación de propiedades e indicadores entre ácidos y bases"
      >
        <g id="titulo-propiedades">
          <text
            x={W / 2}
            y={15}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={10}
            fontFamily="var(--font-atkinson)"
          >
            Comportamiento clásico en solución acuosa (25 °C)
          </text>
        </g>

        <g id="tarjeta-acido">
          <rect
            x={col1X}
            y={cardY}
            width={colW}
            height={cardH}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.bad}
            strokeWidth={1.5}
          />
          <text
            x={col1X + colW / 2}
            y={cardY + 20}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={13}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            ÁCIDOS (pH &lt; 7)
          </text>
          <text
            x={col1X + colW / 2}
            y={cardY + 38}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={10.5}
            fontFamily="var(--font-atkinson)"
          >
            Sabor agrio (limón)
          </text>
          <text
            x={col1X + colW / 2}
            y={cardY + 54}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={10.5}
            fontFamily="var(--font-atkinson)"
          >
            Reaccionan con Zn / Mg
          </text>

          <rect
            x={col1X + 10}
            y={bandY}
            width={colW - 20}
            height={bandH}
            rx={6}
            fill="color-mix(in srgb, var(--dib-red-600) 15%, transparent)"
            stroke={LIENZO.bad}
            strokeWidth={1}
          />
          <text
            x={col1X + colW / 2}
            y={bandY + 14}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Tornasol: azul a ROJO
          </text>
          <text
            x={col1X + colW / 2}
            y={bandY + 27}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={9.5}
            fontFamily="var(--font-atkinson)"
          >
            Fenolftaleína: incolora
          </text>

          <text
            x={col1X + colW / 2}
            y={cardY + 130}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={9.5}
            fontFamily="var(--font-atkinson)"
          >
            Ej.: HCl, CH3COOH
          </text>
          <text
            x={col1X + colW / 2}
            y={cardY + 148}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={10}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            [H+] &gt; [OH-]
          </text>
        </g>

        <g id="tarjeta-base">
          <rect
            x={col2X}
            y={cardY}
            width={colW}
            height={cardH}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.accent}
            strokeWidth={1.5}
          />
          <text
            x={col2X + colW / 2}
            y={cardY + 20}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={13}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            BASES (pH &gt; 7)
          </text>
          <text
            x={col2X + colW / 2}
            y={cardY + 38}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={10.5}
            fontFamily="var(--font-atkinson)"
          >
            Sabor amargo, tacto jabonoso
          </text>
          <text
            x={col2X + colW / 2}
            y={cardY + 54}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={10.5}
            fontFamily="var(--font-atkinson)"
          >
            Neutralizan a los ácidos
          </text>

          <rect
            x={col2X + 10}
            y={bandY}
            width={colW - 20}
            height={bandH}
            rx={6}
            fill="color-mix(in srgb, var(--accent) 15%, transparent)"
            stroke={LIENZO.accent}
            strokeWidth={1}
          />
          <text
            x={col2X + colW / 2}
            y={bandY + 14}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Tornasol: rojo a AZUL
          </text>
          <text
            x={col2X + colW / 2}
            y={bandY + 27}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={9.5}
            fontFamily="var(--font-atkinson)"
          >
            Fenolftaleína: rosa/fucsia
          </text>

          <text
            x={col2X + colW / 2}
            y={cardY + 130}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={9.5}
            fontFamily="var(--font-atkinson)"
          >
            Ej.: NaOH, NH3, Ca(OH)2
          </text>
          <text
            x={col2X + colW / 2}
            y={cardY + 148}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={10}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            [OH-] &gt; [H+]
          </text>
        </g>
      </svg>
    </Pizarra>
  );
}

function FigTeoriasConjugados() {
  const W = 340;
  const H = 220;
  const cx = W / 2;
  const rLewis = 96;
  const rBronsted = 72;
  const rArrhenius = 46;
  const cyCirc = 104;
  const leftCircX = 88;
  const boxTop = 18;
  const boxX = 180;
  const boxW = 148;
  const boxH = 184;

  return (
    <Pizarra alto={H}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Círculos concéntricos de las teorías de Arrhenius, Brønsted-Lowry y Lewis, y esquema de pares conjugados"
      >
        <g id="circulos-teorias">
          <circle
            cx={leftCircX}
            cy={cyCirc + 12}
            r={rLewis - 18}
            fill="color-mix(in srgb, var(--accent) 8%, transparent)"
            stroke={LIENZO.accent}
            strokeWidth={1.4}
          />
          <circle
            cx={leftCircX}
            cy={cyCirc + 18}
            r={rBronsted - 18}
            fill="color-mix(in srgb, var(--green) 10%, transparent)"
            stroke={LIENZO.ok}
            strokeWidth={1.4}
          />
          <circle
            cx={leftCircX}
            cy={cyCirc + 26}
            r={rArrhenius - 15}
            fill="color-mix(in srgb, var(--dib-amber-600) 14%, transparent)"
            stroke={LIENZO.warn}
            strokeWidth={1.4}
          />
          <text
            x={leftCircX}
            y={cyCirc - 46}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={10}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Lewis (pares e-)
          </text>
          <text
            x={leftCircX}
            y={cyCirc - 20}
            textAnchor="middle"
            fill={LIENZO.ok}
            fontSize={8.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Brønsted-Lowry
          </text>
          <text
            x={leftCircX}
            y={cyCirc - 9}
            textAnchor="middle"
            fill={LIENZO.ok}
            fontSize={8.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            (H+)
          </text>
          <text
            x={leftCircX}
            y={cyCirc + 24}
            textAnchor="middle"
            fill={LIENZO.warn}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Arrhenius
          </text>
          <text
            x={leftCircX}
            y={cyCirc + 37}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={8.5}
            fontFamily="var(--font-atkinson)"
          >
            (en agua: H+ / OH-)
          </text>
        </g>

        <g id="par-conjugado">
          <rect
            x={boxX}
            y={boxTop}
            width={boxW}
            height={boxH}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1.2}
          />
          <text
            x={boxX + boxW / 2}
            y={boxTop + 18}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={10.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Transferencia de H+
          </text>

          <text
            x={boxX + 34}
            y={boxTop + 56}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={12}
            fontWeight={700}
            fontFamily="var(--font-crimson)"
          >
            HCl
          </text>
          <text
            x={boxX + 34}
            y={boxTop + 70}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={8.5}
            fontFamily="var(--font-atkinson)"
          >
            ácido 1
          </text>

          <text
            x={boxX + 114}
            y={boxTop + 56}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={12}
            fontWeight={700}
            fontFamily="var(--font-crimson)"
          >
            NH3
          </text>
          <text
            x={boxX + 114}
            y={boxTop + 70}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={8.5}
            fontFamily="var(--font-atkinson)"
          >
            base 2
          </text>

          <path
            d={`M ${boxX + 46} ${boxTop + 44} Q ${boxX + 74} ${boxTop + 26} ${boxX + 100} ${boxTop + 44}`}
            fill="none"
            stroke={LIENZO.warn}
            strokeWidth={1.6}
          />
          <polygon
            points={`${boxX + 102},${boxTop + 46} ${boxX + 94},${boxTop + 44} ${boxX + 98},${boxTop + 38}`}
            fill={LIENZO.warn}
          />
          <text
            x={boxX + 74}
            y={boxTop + 31}
            textAnchor="middle"
            fill={LIENZO.warn}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            cede H+
          </text>

          <line
            x1={boxX + 16}
            y1={boxTop + 92}
            x2={boxX + boxW - 16}
            y2={boxTop + 92}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
            strokeDasharray="3 3"
          />

          <text
            x={boxX + 34}
            y={boxTop + 124}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={12}
            fontWeight={700}
            fontFamily="var(--font-crimson)"
          >
            Cl-
          </text>
          <text
            x={boxX + 34}
            y={boxTop + 138}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={8.5}
            fontFamily="var(--font-atkinson)"
          >
            base conj. 1
          </text>

          <text
            x={boxX + 114}
            y={boxTop + 124}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={12}
            fontWeight={700}
            fontFamily="var(--font-crimson)"
          >
            NH4+
          </text>
          <text
            x={boxX + 114}
            y={boxTop + 138}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={8.5}
            fontFamily="var(--font-atkinson)"
          >
            ácido conj. 2
          </text>

          <text
            x={boxX + boxW / 2}
            y={boxTop + 168}
            textAnchor="middle"
            fill={LIENZO.ok}
            fontSize={9}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Cada par difiere en 1 H+
          </text>
        </g>

        <text
          x={cx}
          y={H - 6}
          textAnchor="middle"
          fill={LIENZO.fgDim}
          fontSize={9}
          fontFamily="var(--font-atkinson)"
        >
          Lewis incluye especies sin H+ (ej. BF3 + :NH3)
        </text>
      </svg>
    </Pizarra>
  );
}

function FigBalanzaKw() {
  const W = 340;
  const H = 195;
  const colW = 94;
  const gap = 14;
  const startX = (W - (colW * 3 + gap * 2)) / 2;
  const casos = [
    {
      titulo: "Medio ácido",
      sub: "pH < 7",
      hPct: 0.8,
      ohPct: 0.2,
      color: LIENZO.bad,
      eq: "[H+] > 10^-7",
    },
    {
      titulo: "Agua neutra",
      sub: "pH = 7",
      hPct: 0.5,
      ohPct: 0.5,
      color: LIENZO.ok,
      eq: "[H+] = [OH-] = 10^-7",
    },
    {
      titulo: "Medio básico",
      sub: "pH > 7",
      hPct: 0.2,
      ohPct: 0.8,
      color: LIENZO.accent,
      eq: "[OH-] > 10^-7",
    },
  ];
  const barMaxH = 68;
  const baseLineY = 142;

  return (
    <Pizarra alto={H}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Relación inversa entre concentraciones de H+ y OH- con producto constante Kw = 10^-14"
      >
        <g id="encabezado-kw">
          <text
            x={W / 2}
            y={18}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={11}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            A 25 °C siempre se cumple: [H+] · [OH-] = 10⁻¹⁴
          </text>
        </g>

        {casos.map((c, i) => {
          const x = startX + i * (colW + gap);
          const h1 = barMaxH * c.hPct;
          const h2 = barMaxH * c.ohPct;
          const b1X = x + 16;
          const b2X = x + 52;
          const bW = 24;
          return (
            <g key={c.titulo} id={`caso-kw-${i}`}>
              <rect
                x={x}
                y={30}
                width={colW}
                height={152}
                rx={8}
                fill={LIENZO.bgSoft}
                stroke={c.color}
                strokeWidth={1.2}
              />
              <text
                x={x + colW / 2}
                y={46}
                textAnchor="middle"
                fill={c.color}
                fontSize={10}
                fontWeight={700}
                fontFamily="var(--font-atkinson)"
              >
                {c.titulo}
              </text>
              <text
                x={x + colW / 2}
                y={59}
                textAnchor="middle"
                fill={LIENZO.fgDim}
                fontSize={9}
                fontFamily="var(--font-atkinson)"
              >
                {c.sub}
              </text>

              <rect
                x={b1X}
                y={baseLineY - h1}
                width={bW}
                height={h1}
                rx={4}
                fill={LIENZO.bad}
                opacity={0.85}
              />
              <rect
                x={b2X}
                y={baseLineY - h2}
                width={bW}
                height={h2}
                rx={4}
                fill={LIENZO.accent}
                opacity={0.85}
              />
              <line
                x1={x + 10}
                y1={baseLineY}
                x2={x + colW - 10}
                y2={baseLineY}
                stroke={LIENZO.fgFaint}
                strokeWidth={1}
              />
              <text
                x={b1X + bW / 2}
                y={baseLineY + 13}
                textAnchor="middle"
                fill={LIENZO.fg}
                fontSize={8.5}
                fontWeight={700}
                fontFamily="var(--font-atkinson)"
              >
                H+
              </text>
              <text
                x={b2X + bW / 2}
                y={baseLineY + 13}
                textAnchor="middle"
                fill={LIENZO.fg}
                fontSize={8.5}
                fontWeight={700}
                fontFamily="var(--font-atkinson)"
              >
                OH-
              </text>
              <text
                x={x + colW / 2}
                y={baseLineY + 28}
                textAnchor="middle"
                fill={LIENZO.fgDim}
                fontSize={8}
                fontFamily="var(--font-atkinson)"
              >
                {c.eq}
              </text>
            </g>
          );
        })}
      </svg>
    </Pizarra>
  );
}

function FigEscalaPh({ phActivo }: { phActivo: number }) {
  const W = 340;
  const H = 165;
  const padX = 20;
  const barW = W - padX * 2;
  const barY = 58;
  const barH = 22;
  const stepX = barW / 14;
  const markerX = padX + phActivo * stepX;

  const zonas = [
    { from: 0, to: 6.8, color: LIENZO.bad, label: "Ácido" },
    { from: 6.8, to: 7.2, color: LIENZO.ok, label: "Neutro" },
    { from: 7.2, to: 14, color: LIENZO.accent, label: "Básico" },
  ];

  return (
    <Pizarra alto={H}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Escala de pH de 0 a 14 marcando pH igual a ${phActivo} y pOH igual a ${14 - phActivo}`}
      >
        <g id="zonas-ph">
          {zonas.map((z) => {
            const x1 = padX + z.from * stepX;
            const w = (z.to - z.from) * stepX;
            return (
              <rect
                key={z.label}
                x={x1}
                y={barY}
                width={w}
                height={barH}
                rx={3}
                fill={z.color}
                opacity={0.78}
              />
            );
          })}
        </g>

        <g id="marcas-ph-poh">
          {[0, 2, 4, 7, 10, 12, 14].map((v) => {
            const tx = padX + v * stepX;
            return (
              <g key={v}>
                <line
                  x1={tx}
                  y1={barY}
                  x2={tx}
                  y2={barY + barH + 5}
                  stroke={LIENZO.fg}
                  strokeWidth={1.2}
                />
                <text
                  x={tx}
                  y={barY + barH + 17}
                  textAnchor="middle"
                  fill={LIENZO.fg}
                  fontSize={9.5}
                  fontWeight={v === 7 ? 700 : 400}
                  fontFamily="var(--font-atkinson)"
                >
                  {v}
                </text>
                <text
                  x={tx}
                  y={barY + barH + 31}
                  textAnchor="middle"
                  fill={LIENZO.fgDim}
                  fontSize={8.5}
                  fontFamily="var(--font-atkinson)"
                >
                  {14 - v}
                </text>
              </g>
            );
          })}
          <text
            x={padX}
            y={barY + barH + 46}
            textAnchor="start"
            fill={LIENZO.fgDim}
            fontSize={8.5}
            fontFamily="var(--font-atkinson)"
          >
            Arriba: escala pH | Abajo: pOH = 14 - pH
          </text>
        </g>

        <g id="puntero-activo">
          <line
            x1={markerX}
            y1={24}
            x2={markerX}
            y2={barY + barH + 2}
            stroke={LIENZO.fg}
            strokeWidth={2}
          />
          <polygon
            points={`${markerX},${barY - 2} ${markerX - 5},${barY - 10} ${markerX + 5},${barY - 10}`}
            fill={LIENZO.fg}
          />
          <rect
            x={Math.min(Math.max(markerX - 46, padX), W - padX - 92)}
            y={8}
            width={92}
            height={22}
            rx={6}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fg}
            strokeWidth={1.2}
          />
          <text
            x={Math.min(Math.max(markerX, padX + 46), W - padX - 46)}
            y={22}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={10}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            pH {phActivo} · pOH {14 - phActivo}
          </text>
        </g>
      </svg>
    </Pizarra>
  );
}

function FigFuerteVsDebil() {
  const W = 340;
  const H = 195;
  const padX = 16;
  const boxW = (W - padX * 3) / 2;
  const boxY = 26;
  const boxH = 144;
  const xL = padX;
  const xR = padX * 2 + boxW;

  // 4 moléculas en matriz 2x2 dentro de cada recipiente
  const offsets = [
    { dx: 36, dy: 44 },
    { dx: 108, dy: 44 },
    { dx: 36, dy: 96 },
    { dx: 108, dy: 96 },
  ];

  return (
    <Pizarra alto={H}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Comparación molecular entre ionización completa de un ácido fuerte y parcial de un ácido débil"
      >
        <text
          x={W / 2}
          y={15}
          textAnchor="middle"
          fill={LIENZO.fgDim}
          fontSize={10}
          fontFamily="var(--font-atkinson)"
        >
          Misma concentración inicial C₀, distinto grado de ionización
        </text>

        <g id="acido-fuerte">
          <rect
            x={xL}
            y={boxY}
            width={boxW}
            height={boxH}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.bad}
            strokeWidth={1.5}
          />
          <text
            x={xL + boxW / 2}
            y={boxY + 18}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={11}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Fuerte (ej. HCl)
          </text>
          {offsets.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={xL + p.dx - 11}
                cy={boxY + p.dy}
                r={9}
                fill={LIENZO.bad}
                opacity={0.85}
              />
              <text
                x={xL + p.dx - 11}
                y={boxY + p.dy + 3}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={8}
                fontWeight={700}
                fontFamily="var(--font-atkinson)"
              >
                H+
              </text>
              <circle
                cx={xL + p.dx + 13}
                cy={boxY + p.dy}
                r={9}
                fill={LIENZO.accent}
                opacity={0.85}
              />
              <text
                x={xL + p.dx + 13}
                y={boxY + p.dy + 3}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={8}
                fontWeight={700}
                fontFamily="var(--font-atkinson)"
              >
                A-
              </text>
            </g>
          ))}
          <text
            x={xL + boxW / 2}
            y={boxY + boxH - 12}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            100% ionizado (→)
          </text>
        </g>

        <g id="acido-debil">
          <rect
            x={xR}
            y={boxY}
            width={boxW}
            height={boxH}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.warn}
            strokeWidth={1.5}
          />
          <text
            x={xR + boxW / 2}
            y={boxY + 18}
            textAnchor="middle"
            fill={LIENZO.warn}
            fontSize={11}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Débil (ej. HA)
          </text>
          {offsets.map((p, idx) =>
            idx === 0 ? (
              <g key={idx}>
                <circle
                  cx={xR + p.dx - 11}
                  cy={boxY + p.dy}
                  r={9}
                  fill={LIENZO.bad}
                  opacity={0.85}
                />
                <text
                  x={xR + p.dx - 11}
                  y={boxY + p.dy + 3}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={8}
                  fontWeight={700}
                  fontFamily="var(--font-atkinson)"
                >
                  H+
                </text>
                <circle
                  cx={xR + p.dx + 13}
                  cy={boxY + p.dy}
                  r={9}
                  fill={LIENZO.accent}
                  opacity={0.85}
                />
                <text
                  x={xR + p.dx + 13}
                  y={boxY + p.dy + 3}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={8}
                  fontWeight={700}
                  fontFamily="var(--font-atkinson)"
                >
                  A-
                </text>
              </g>
            ) : (
              <g key={idx}>
                <rect
                  x={xR + p.dx - 17}
                  y={boxY + p.dy - 9}
                  width={34}
                  height={18}
                  rx={9}
                  fill={LIENZO.warn}
                  opacity={0.85}
                />
                <text
                  x={xR + p.dx}
                  y={boxY + p.dy + 3}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={8.5}
                  fontWeight={700}
                  fontFamily="var(--font-atkinson)"
                >
                  HA
                </text>
              </g>
            )
          )}
          <text
            x={xR + boxW / 2}
            y={boxY + boxH - 12}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Parcial: equilibrio (⇌)
          </text>
        </g>
      </svg>
    </Pizarra>
  );
}

function FigTitulacion() {
  const W = 340;
  const H = 195;
  const buretaX = 82;
  const matrazCx = 82;

  return (
    <Pizarra alto={H}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Esquema de titulación ácido-base con bureta, matraz erlenmeyer y punto de equivalencia"
      >
        <g id="bureta-y-matraz">
          <rect
            x={buretaX - 9}
            y={16}
            width={18}
            height={70}
            rx={2}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.accent}
            strokeWidth={1.5}
          />
          <rect
            x={buretaX - 7}
            y={32}
            width={14}
            height={52}
            fill="color-mix(in srgb, var(--accent) 30%, transparent)"
          />
          <line
            x1={buretaX}
            y1={86}
            x2={buretaX}
            y2={104}
            stroke={LIENZO.accent}
            strokeWidth={2}
          />
          <circle
            cx={buretaX}
            cy={110}
            r={2.5}
            fill={LIENZO.accent}
          />

          <path
            d={`M ${matrazCx - 12} 118 L ${matrazCx + 12} 118 L ${matrazCx + 36} 174 L ${matrazCx - 36} 174 Z`}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <path
            d={`M ${matrazCx - 24} 148 L ${matrazCx + 24} 148 L ${matrazCx + 34} 173 L ${matrazCx - 34} 173 Z`}
            fill="color-mix(in srgb, var(--dib-red-600) 22%, transparent)"
          />
          <text
            x={matrazCx}
            y={165}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Analito (Va, Na)
          </text>
          <text
            x={buretaX + 18}
            y={46}
            textAnchor="start"
            fill={LIENZO.accent}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Titulante (Vb, Nb)
          </text>
        </g>

        <g id="caja-equivalencia">
          <rect
            x={156}
            y={28}
            width={170}
            height={144}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.ok}
            strokeWidth={1.4}
          />
          <text
            x={241}
            y={50}
            textAnchor="middle"
            fill={LIENZO.ok}
            fontSize={11}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Punto de equivalencia
          </text>
          <text
            x={241}
            y={74}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={12}
            fontWeight={700}
            fontFamily="var(--font-crimson)"
          >
            eq(ácido) = eq(base)
          </text>
          <text
            x={241}
            y={98}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={12.5}
            fontWeight={700}
            fontFamily="var(--font-crimson)"
          >
            Na · Va = Nb · Vb
          </text>
          <line
            x1={172}
            y1={114}
            x2={310}
            y2={114}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <text
            x={241}
            y={134}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={9.5}
            fontFamily="var(--font-atkinson)"
          >
            Recuerda: N = M · θ
          </text>
          <text
            x={241}
            y={152}
            textAnchor="middle"
            fill={LIENZO.fgDim}
            fontSize={9}
            fontFamily="var(--font-atkinson)"
          >
            HCl (θ=1) · H2SO4 (θ=2)
          </text>
        </g>
      </svg>
    </Pizarra>
  );
}

function FigSangreClinica() {
  const W = 340;
  const H = 165;
  const padX = 24;
  const barW = W - padX * 2;
  const minPh = 6.8;
  const maxPh = 7.8;
  const xDePh = (ph: number) =>
    padX + ((ph - minPh) / (maxPh - minPh)) * barW;
  const barY = 58;
  const barH = 26;

  const xNormalIni = xDePh(7.35);
  const xNormalFin = xDePh(7.45);
  const xAcid = xDePh(7.1);

  return (
    <Pizarra alto={H}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Rango fisiológico de pH arterial humano entre 6,8 y 7,8 con zona normal 7,35 a 7,45"
      >
        <text
          x={W / 2}
          y={18}
          textAnchor="middle"
          fill={LIENZO.fg}
          fontSize={10.5}
          fontWeight={700}
          fontFamily="var(--font-atkinson)"
        >
          Ventana de pH compatible con la vida (sangre arterial)
        </text>

        <g id="banda-sangre">
          <rect
            x={padX}
            y={barY}
            width={xNormalIni - padX}
            height={barH}
            fill={LIENZO.bad}
            opacity={0.72}
          />
          <rect
            x={xNormalIni}
            y={barY}
            width={xNormalFin - xNormalIni}
            height={barH}
            fill={LIENZO.ok}
            opacity={0.95}
          />
          <rect
            x={xNormalFin}
            y={barY}
            width={padX + barW - xNormalFin}
            height={barH}
            fill={LIENZO.accent}
            opacity={0.72}
          />
        </g>

        <g id="etiquetas-clinicas">
          {[6.8, 7.1, 7.35, 7.45, 7.8].map((val) => {
            const x = xDePh(val);
            return (
              <g key={val}>
                <line
                  x1={x}
                  y1={barY}
                  x2={x}
                  y2={barY + barH + 5}
                  stroke={LIENZO.fg}
                  strokeWidth={1.1}
                />
                <text
                  x={x}
                  y={barY + barH + 17}
                  textAnchor="middle"
                  fill={LIENZO.fg}
                  fontSize={8.5}
                  fontWeight={val === 7.35 || val === 7.45 ? 700 : 400}
                  fontFamily="var(--font-atkinson)"
                >
                  {val.toFixed(2).replace(".", ",")}
                </text>
              </g>
            );
          })}

          <text
            x={(padX + xNormalIni) / 2}
            y={barY - 8}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Acidosis (&lt; 7,35)
          </text>
          <text
            x={(xNormalIni + xNormalFin) / 2}
            y={barY - 22}
            textAnchor="middle"
            fill={LIENZO.ok}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Normal
          </text>
          <text
            x={(xNormalFin + padX + barW) / 2}
            y={barY - 8}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={9.5}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            Alcalosis (&gt; 7,45)
          </text>

          <line
            x1={xAcid}
            y1={barY + barH + 22}
            x2={xAcid}
            y2={barY + barH + 34}
            stroke={LIENZO.bad}
            strokeWidth={1.5}
          />
          <text
            x={xAcid + 6}
            y={barY + barH + 34}
            textAnchor="start"
            fill={LIENZO.bad}
            fontSize={8.8}
            fontWeight={700}
            fontFamily="var(--font-atkinson)"
          >
            pH 7,10: el doble de [H+] que 7,40
          </text>
        </g>
      </svg>
    </Pizarra>
  );
}

// -----------------------------------------------------------------------------
// Simulador interactivo de pH y pOH (Escena 4)
// -----------------------------------------------------------------------------

function SimuladorPh() {
  const [ph, setPh] = useState(3);

  const datos = useMemo(() => {
    const poh = 14 - ph;
    const medio = ph < 7 ? "Ácido" : ph === 7 ? "Neutro" : "Básico";
    const tornasol = ph < 7 ? "Rojo" : ph === 7 ? "Sin cambio (morado)" : "Azul";
    const fenol = ph >= 9 ? "Rosa / fucsia" : "Incolora";
    return { poh, medio, tornasol, fenol };
  }, [ph]);

  return (
    <div
      className="rounded-xl p-4 my-3"
      style={{
        background: LIENZO.bgSoft,
        border: `1px solid ${LIENZO.fgFaint}`,
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-2 min-w-0">
        <span
          className="text-sm font-semibold"
          style={{ color: LIENZO.fg, fontFamily: "var(--font-atkinson)" }}
        >
          Laboratorio interactivo de pH y pOH (25 °C)
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded font-semibold"
          style={{
            background: LIENZO.bg,
            color: ph < 7 ? LIENZO.bad : ph === 7 ? LIENZO.ok : LIENZO.accent,
            border: `1px solid ${LIENZO.fgFaint}`,
          }}
        >
          {datos.medio}
        </span>
      </div>

      <label
        htmlFor="slider-ph"
        className="block text-xs mb-1"
        style={{ color: LIENZO.fgDim }}
      >
        Ajusta el exponente del ion hidrógeno (<MathText>{`$[\\mathrm{H^+}]=10^{-\\text{pH}}\\,\\text{M}$`}</MathText>):{" "}
        <strong>pH = {ph}</strong>
      </label>
      <input
        id="slider-ph"
        type="range"
        min={0}
        max={14}
        step={1}
        value={ph}
        onChange={(e) => setPh(Number(e.target.value))}
        style={{ accentColor: LIENZO.accent }}
        className="w-full mb-3"
      />

      <FigEscalaPh phActivo={ph} />

      <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
        <div
          className="rounded-lg p-2 min-w-0"
          style={{ background: LIENZO.bg, border: `1px solid ${LIENZO.fgFaint}` }}
        >
          <div style={{ color: LIENZO.fgDim }}>Concentración ácida</div>
          <div className="font-semibold mt-0.5" style={{ color: LIENZO.fg }}>
            <MathText>{`$[\\mathrm{H^+}] = 10^{-${ph}}\\,\\text{M}$`}</MathText>
          </div>
        </div>
        <div
          className="rounded-lg p-2 min-w-0"
          style={{ background: LIENZO.bg, border: `1px solid ${LIENZO.fgFaint}` }}
        >
          <div style={{ color: LIENZO.fgDim }}>Concentración básica</div>
          <div className="font-semibold mt-0.5" style={{ color: LIENZO.fg }}>
            <MathText>{`$[\\mathrm{OH^-}] = 10^{-${datos.poh}}\\,\\text{M}$`}</MathText>
          </div>
        </div>
        <div
          className="rounded-lg p-2 min-w-0"
          style={{ background: LIENZO.bg, border: `1px solid ${LIENZO.fgFaint}` }}
        >
          <div style={{ color: LIENZO.fgDim }}>Papel tornasol</div>
          <div className="font-semibold mt-0.5" style={{ color: LIENZO.fg }}>
            {datos.tornasol}
          </div>
        </div>
        <div
          className="rounded-lg p-2 min-w-0"
          style={{ background: LIENZO.bg, border: `1px solid ${LIENZO.fgFaint}` }}
        >
          <div style={{ color: LIENZO.fgDim }}>Fenolftaleína</div>
          <div className="font-semibold mt-0.5" style={{ color: LIENZO.fg }}>
            {datos.fenol}
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Escenas de la lección (8 escenas, siguiendo la estructura pedagógica)
// -----------------------------------------------------------------------------

function EscPropiedades() {
  return (
    <EscenaRica>
      <Titulo>1. Propiedades de ácidos y bases e indicadores</Titulo>

      <Hook>
        Cuando exprimes limón sobre bicarbonato de sodio en la cocina, ves espuma al
        instante. Cuando te lavas las manos con jabón, sientes una textura resbaladiza.
        Sin saber fórmulas todavía, ya distinguiste un ácido de una base.
      </Hook>

      <Puente>
        Ya conoces las sales y las disoluciones acuosas. Cuando ciertas sustancias se
        disuelven en agua, rompen su equilibrio neutro y generan exceso de cargas ácidas o
        básicas que cambian el color de pigmentos vegetales.
      </Puente>

      <Definicion termino="Ácido, base e indicador">
        En términos experimentales, un <strong>ácido</strong> tiene sabor agrio, reacciona
        con metales activos como <MathText>{"$\\mathrm{Zn}$"}</MathText> o{" "}
        <MathText>{"$\\mathrm{Mg}$"}</MathText> liberando{" "}
        <MathText>{"$\\mathrm{H_2(g)}$"}</MathText>, y vira el tornasol azul a rojo. Una{" "}
        <strong>base</strong> (álcali) tiene sabor amargo, tacto jabonoso, disuelve grasas y
        vira el tornasol rojo a azul. Un <strong>indicador ácido-base</strong> es un ácido o
        base orgánica débil cuya forma protonada y desprotonada tienen colores distintos.
      </Definicion>

      <FigPropiedadesIndicadores />

      <PorQue>
        ¿Por qué cambia de color un indicador como la fenolftaleína? Porque su molécula
        pierde o gana un protón (<MathText>{"$\\mathrm{H^+}$"}</MathText>) según la acidez
        del medio; ese cambio altera el arreglo de enlaces dobles y la longitud de onda de
        luz que absorbe. En medio ácido o neutro (<MathText>{"$\\text{pH} < 8{,}2$"}</MathText>
        ) es incolora, y en medio básico (<MathText>{"$\\text{pH} > 10{,}0$"}</MathText>) se
        vuelve rosa intenso o fucsia.
      </PorQue>

      <WorkedExample titulo="Ejemplo: elegir indicador para identificar soluciones">
        <Paso n={1}>
          Datos: tienes tres frascos sin etiqueta a <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>:
          A (<MathText>{"$\\mathrm{HCl}\\ 0{,}01\\text{ M}$"}</MathText>, ácido), B (agua pura,
          neutra) y C (<MathText>{"$\\mathrm{NaOH}\\ 0{,}01\\text{ M}$"}</MathText>, base).
        </Paso>
        <Paso n={2}>
          Añades papel tornasol azul y rojo a una gota de cada frasco:
        </Paso>
        <Paso n={3}>
          Frasco A vuelve rojo al tornasol azul. Frasco C vuelve azul al tornasol rojo.
          Frasco B no cambia ninguno de los dos papeles.
        </Paso>
        <Paso n={4}>
          Con fenolftaleína, solo el frasco C toma color fucsia; A y B quedan incoloros.
          Por eso la fenolftaleína sirve para detectar bases fuertes o el punto final básico
          de una titulación, pero por sí sola no distingue un ácido de agua neutra.
        </Paso>
      </WorkedExample>

      <Cuidado>
        En un laboratorio nunca debes probar ni tocar reactivos para saber si son ácidos o
        bases. Los ácidos y bases concentrados producen quemaduras químicas graves; usa
        siempre papel indicador o pH-metro.
      </Cuidado>

      <AutoCheck
        pregunta="Agregas gotas de fenolftaleína a una muestra acuosa desconocida a 25 °C y la solución permanece completamente incolora. ¿Qué puedes concluir con certeza?"
        opciones={[
          "La muestra es obligatoriamente un ácido fuerte",
          "La muestra no es fuertemente básica (su pH está por debajo del rango básico de viraje de la fenolftaleína)",
          "La muestra es agua destilada neutra",
          "El tornasol rojo seguro se volverá azul en esa muestra",
        ]}
        correctaIdx={1}
        explicacion="La fenolftaleína es incolora en medio ácido, neutro y muy débilmente básico (pH < 8,2). Por tanto, permanecer incolora descarta un medio claramente básico, pero no permite distinguir si es ácido o neutro sin otra prueba."
      />
    </EscenaRica>
  );
}

function EscTeorias() {
  return (
    <EscenaRica>
      <Titulo>2. Teorías de Arrhenius, Brønsted-Lowry y Lewis</Titulo>

      <Hook>
        El amoníaco (<MathText>{"$\\mathrm{NH_3}$"}</MathText>) no contiene ningún grupo{" "}
        <MathText>{"$\\mathrm{OH}$"}</MathText> en su fórmula, pero al disolverse en agua
        vuelve azul al papel tornasol y limpia vidrios como una base. ¿Cómo es posible?
      </Hook>

      <Puente>
        La química amplió la definición de ácido y base en tres escalones sucesivos, igual
        que en matemáticas ampliamos de números naturales a enteros y reales para resolver más
        problemas sin descartar los casos anteriores.
      </Puente>

      <Definicion termino="Las tres teorías ácido-base">
        <Parrafo>
          <strong>1. Arrhenius (1884, solo en agua):</strong> ácido es toda sustancia que en
          disolución acuosa aumenta la concentración de{" "}
          <MathText>{"$\\mathrm{H^+}$"}</MathText> (o{" "}
          <MathText>{"$\\mathrm{H_3O^+}$"}</MathText>); base es la que aumenta la
          concentración de <MathText>{"$\\mathrm{OH^-}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>2. Brønsted-Lowry (1923, transferencia de protones):</strong> ácido es
          toda especie capaz de <strong>ceder</strong> un protón (
          <MathText>{"$\\mathrm{H^+}$"}</MathText>) y base es toda especie capaz de{" "}
          <strong>aceptar</strong> un <MathText>{"$\\mathrm{H^+}$"}</MathText>. Al ceder un
          protón, el ácido se convierte en su <strong>base conjugada</strong>; al aceptarlo,
          la base se convierte en su <strong>ácido conjugado</strong>.
        </Parrafo>
        <Parrafo>
          <strong>3. Lewis (1923, pares electrónicos):</strong> ácido es toda especie que{" "}
          <strong>acepta</strong> un par de electrones (tiene orbital vacío, como{" "}
          <MathText>{"$\\mathrm{BF_3}$"}</MathText> o{" "}
          <MathText>{"$\\mathrm{AlCl_3}$"}</MathText>) y base es la especie que{" "}
          <strong>dona</strong> un par de electrones libre (como{" "}
          <MathText>{"$\\mathrm{:NH_3}$"}</MathText>).
        </Parrafo>
      </Definicion>

      <FigTeoriasConjugados />

      <PorQue>
        El agua es <strong>anfótera</strong> (anfiprótica) en Brønsted-Lowry: frente a un
        ácido como <MathText>{"$\\mathrm{HCl}$"}</MathText> acepta un{" "}
        <MathText>{"$\\mathrm{H^+}$"}</MathText> y actúa como base (formando{" "}
        <MathText>{"$\\mathrm{H_3O^+}$"}</MathText>); frente al{" "}
        <MathText>{"$\\mathrm{NH_3}$"}</MathText> cede un{" "}
        <MathText>{"$\\mathrm{H^+}$"}</MathText> y actúa como ácido (formando{" "}
        <MathText>{"$\\mathrm{OH^-}$"}</MathText>). Así se explica la basicidad del amoníaco
        sin que tenga <MathText>{"$\\mathrm{OH}$"}</MathText> en su fórmula.
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.3 Q3.3 */}
      <WorkedExample titulo="Ejemplo: identificar pares conjugados en la reacción del amoníaco">
        <Paso n={1}>
          Ecuación en equilibrio:{" "}
          <MathText>{"$\\mathrm{NH_3(ac) + H_2O(l) \\rightleftharpoons NH_4^+(ac) + OH^-(ac)}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Compara las especies que solo difieren en un{" "}
          <MathText>{"$\\mathrm{H^+}$"}</MathText>: <MathText>{"$\\mathrm{NH_3}$"}</MathText>{" "}
          ganó un <MathText>{"$\\mathrm{H^+}$"}</MathText> para convertirse en{" "}
          <MathText>{"$\\mathrm{NH_4^+}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Por lo tanto, <MathText>{"$\\mathrm{NH_3}$"}</MathText> es la{" "}
          <strong>base</strong> de Brønsted-Lowry y <MathText>{"$\\mathrm{NH_4^+}$"}</MathText>{" "}
          es su <strong>ácido conjugado</strong>.
        </Paso>
        <Paso n={4}>
          Al mismo tiempo, <MathText>{"$\\mathrm{H_2O}$"}</MathText> perdió un{" "}
          <MathText>{"$\\mathrm{H^+}$"}</MathText> para transformarse en{" "}
          <MathText>{"$\\mathrm{OH^-}$"}</MathText>. Por eso{" "}
          <MathText>{"$\\mathrm{H_2O}$"}</MathText> actúa como <strong>ácido</strong> y{" "}
          <MathText>{"$\\mathrm{OH^-}$"}</MathText> es su <strong>base conjugada</strong>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        No confundas el sentido del flujo en Brønsted-Lowry y en Lewis: el ácido de
        Brønsted-Lowry <strong>dona un H+</strong>, mientras que el ácido de Lewis{" "}
        <strong>acepta un par de electrones</strong>. En{" "}
        <MathText>{"$\\mathrm{H^+ + :NH_3 \\to NH_4^+}$"}</MathText>, el{" "}
        <MathText>{"$\\mathrm{H^+}$"}</MathText> acepta el par libre del nitrógeno, así que
        es ácido de Lewis; y cuanto más fuerte es un ácido, más débil es su base conjugada.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.3 Q3.3 */}
      <AutoCheck
        pregunta="En la reacción NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ según la teoría de Brønsted-Lowry, ¿cuál afirmación es correcta?"
        opciones={[
          "El NH₃ es el ácido porque tiene tres hidrógenos",
          "El H₂O es la base y el NH₄⁺ es su base conjugada",
          "El H₂O actúa como ácido (cede H⁺) y el OH⁻ es su base conjugada",
          "Ninguna especie actúa como ácido porque no hay oxígeno libre",
        ]}
        correctaIdx={2}
        explicacion="El H₂O transfiere un protón H⁺ al NH₃; por tanto el H₂O es el ácido y lo que queda tras perder ese H⁺ (OH⁻) es su base conjugada. El par complementario es NH₃ (base) y NH₄⁺ (ácido conjugado)."
      />
    </EscenaRica>
  );
}

function EscAguaKw() {
  return (
    <EscenaRica>
      <Titulo>3. Autoionización del agua y constante Kw</Titulo>

      <Hook>
        Incluso el agua destilada más pura del mundo conduce una corriente eléctrica diminuta.
        Eso demuestra que no todas las moléculas de{" "}
        <MathText>{"$\\mathrm{H_2O}$"}</MathText> permanecen intactas: una pequeñísima
        fracción choca y se rompe en iones.
      </Hook>

      <Puente>
        Imagina una balanza de dos platillos conectada por una regla fija: su producto nunca
        cambia a <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>. Si subes mucho la cantidad
        de <MathText>{"$\\mathrm{H^+}$"}</MathText> añadiendo ácido, el agua ajusta su
        equilibrio bajando la cantidad de <MathText>{"$\\mathrm{OH^-}$"}</MathText> en la
        misma proporción.
      </Puente>

      <Definicion termino="Producto iónico del agua (Kw)">
        El agua pura experimenta <strong>autoionización</strong> según el equilibrio{" "}
        <MathText>{"$\\mathrm{2\\,H_2O(l) \\rightleftharpoons H_3O^+(ac) + OH^-(ac)}$"}</MathText>{" "}
        (abreviado <MathText>{"$\\mathrm{H_2O \\rightleftharpoons H^+ + OH^-}$"}</MathText>).
        A <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>, la constante de este equilibrio es
        el producto iónico del agua:
        <MathText block>{"$$K_w = [\\mathrm{H^+}][\\mathrm{OH^-}] = 1{,}0 \\times 10^{-14}$$"}</MathText>
        En agua pura (neutra) a <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>:{" "}
        <MathText>{"$[\\mathrm{H^+}] = [\\mathrm{OH^-}] = 1{,}0 \\times 10^{-7}\\text{ M}$"}</MathText>.
      </Definicion>

      <FigBalanzaKw />

      <PorQue>
        ¿Por qué no aparece <MathText>{"$[\\mathrm{H_2O}]$"}</MathText> en la expresión de{" "}
        <MathText>{"$K_w$"}</MathText>? Porque el agua líquida es el disolvente puro y su
        concentración molar (<MathText>{"$\\approx 55{,}5\\text{ M}$"}</MathText>) prácticamente
        no varía cuando solo <MathText>{"$10^{-7}\\text{ M}$"}</MathText> de moléculas se
        ionizan; por eso se incorpora dentro de la constante{" "}
        <MathText>{"$K_w$"}</MathText>.
      </PorQue>

      <WorkedExample titulo="Ejemplo: calcular [OH⁻] a partir de [H⁺] usando Kw">
        <Paso n={1}>
          Dato: a <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>, una muestra de jugo gástrico
          diluido tiene <MathText>{"$[\\mathrm{H^+}] = 2{,}0 \\times 10^{-4}\\text{ M}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Escribimos el producto iónico del agua:{" "}
          <MathText>{"$K_w = [\\mathrm{H^+}][\\mathrm{OH^-}] = 1{,}0 \\times 10^{-14}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Despejamos <MathText>{"$[\\mathrm{OH^-}]$"}</MathText>:{" "}
          <MathText>{"$[\\mathrm{OH^-}] = \\dfrac{1{,}0 \\times 10^{-14}}{2{,}0 \\times 10^{-4}}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Operamos coeficientes y exponentes por separado:{" "}
          <MathText>{"$\\dfrac{1{,}0}{2{,}0} = 0{,}5$"}</MathText> y{" "}
          <MathText>{"$\\dfrac{10^{-14}}{10^{-4}} = 10^{-14-(-4)} = 10^{-10}$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Resultado en notación científica:{" "}
          <MathText>{"$[\\mathrm{OH^-}] = 0{,}5 \\times 10^{-10} = 5{,}0 \\times 10^{-11}\\text{ M}$"}</MathText>.
          Como <MathText>{"$[\\mathrm{H^+}] > [\\mathrm{OH^-}]$"}</MathText>, la disolución es
          ácida.
        </Paso>
      </WorkedExample>

      <Cuidado>
        <MathText>{"$K_w = 1{,}0 \\times 10^{-14}$"}</MathText> vale exactamente a{" "}
        <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>. La autoionización del agua es
        endotérmica: si la temperatura sube (por ejemplo a{" "}
        <MathText>{"$37\\,^\\circ\\text{C}$"}</MathText> en el cuerpo humano),{" "}
        <MathText>{"$K_w$"}</MathText> aumenta ligeramente, aunque el agua pura sigue siendo
        neutra porque <MathText>{"$[\\mathrm{H^+}] = [\\mathrm{OH^-}]$"}</MathText>.
      </Cuidado>

      <AutoCheck
        pregunta="Una solución acuosa a 25 °C tiene [OH⁻] = 2,5 × 10⁻³ M. ¿Cuál es su concentración de H⁺ y cómo se clasifica la solución?"
        opciones={[
          "[H⁺] = 4,0 × 10⁻¹² M; es una solución básica",
          "[H⁺] = 4,0 × 10⁻¹¹ M; es una solución ácida",
          "[H⁺] = 2,5 × 10⁻¹¹ M; es una solución básica",
          "[H⁺] = 1,0 × 10⁻¹¹ M; es una solución neutra",
        ]}
        correctaIdx={0}
        explicacion="Usando Kw = 1,0 × 10⁻¹⁴: [H⁺] = (1,0 × 10⁻¹⁴) / (2,5 × 10⁻³) = 0,4 × 10⁻¹¹ = 4,0 × 10⁻¹² M. Como [OH⁻] = 2,5 × 10⁻³ M es mucho mayor que [H⁺], la solución es básica."
      />
    </EscenaRica>
  );
}

function EscPhPoh() {
  return (
    <EscenaRica>
      <Titulo>4. Escala de pH y pOH (pH + pOH = 14)</Titulo>

      <Hook>
        Comparar <MathText>{"$0{,}0000001\\text{ M}$"}</MathText> con{" "}
        <MathText>{"$0{,}000000000001\\text{ M}$"}</MathText> obliga a contar ceros y
        equivocarse fácil. Para evitarlo, el químico Sørensen propuso en 1909 usar solo el
        exponente positivo: así nació el <strong>pH</strong>.
      </Hook>

      <Puente>
        Ya sabes qué es un logaritmo en base 10: <MathText>{"$\\log(10^{-3}) = -3$"}</MathText>.
        Como queremos un número positivo cómodo, le ponemos un signo menos delante:{" "}
        <MathText>{"$-\\log(10^{-3}) = 3$"}</MathText>.
      </Puente>

      <Definicion termino="Definiciones de pH, pOH y su relación">
        <MathText block>
          {"$$\\mathrm{pH} = -\\log[\\mathrm{H^+}] \\qquad \\mathrm{pOH} = -\\log[\\mathrm{OH^-}]$$"}
        </MathText>
        De forma inversa: <MathText>{"$[\\mathrm{H^+}] = 10^{-\\mathrm{pH}}$"}</MathText> y{" "}
        <MathText>{"$[\\mathrm{OH^-}] = 10^{-\\mathrm{pOH}}$"}</MathText>. Al aplicar{" "}
        <MathText>{"$-\\log$"}</MathText> a <MathText>{"$K_w = [\\mathrm{H^+}][\\mathrm{OH^-}] = 10^{-14}$"}</MathText>{" "}
        a <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText> se obtiene la regla fundamental:
        <MathText block>{"$$\\mathrm{pH} + \\mathrm{pOH} = 14$$"}</MathText>
      </Definicion>

      <SimuladorPh />

      <PorQue>
        ¿Por qué al aumentar el pH disminuye la acidez? Porque la escala lleva un signo
        negativo: un pH menor indica un exponente menos negativo (por ejemplo{" "}
        <MathText>{"$10^{-2}$"}</MathText> es 100 veces mayor que{" "}
        <MathText>{"$10^{-4}$"}</MathText>). Cada <strong>1 unidad</strong> menos de pH
        multiplica por <strong>10</strong> la concentración de{" "}
        <MathText>{"$\\mathrm{H^+}$"}</MathText>.
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.3 Q3.1 y Q3.2 */}
      <WorkedExample titulo="Ejemplo: pH de un ácido fuerte y de una base fuerte">
        <Paso n={1}>
          <strong>Caso A (ácido fuerte):</strong> calcula el pH de{" "}
          <MathText>{"$\\mathrm{HCl}\\ 0{,}001\\text{ M}$"}</MathText> a{" "}
          <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          El <MathText>{"$\\mathrm{HCl}$"}</MathText> se disocia al 100%:{" "}
          <MathText>{"$[\\mathrm{H^+}] = 0{,}001\\text{ M} = 10^{-3}\\text{ M}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Calculamos el pH: <MathText>{"$\\mathrm{pH} = -\\log(10^{-3}) = 3$"}</MathText>.
          <br />
          Calculamos el pOH: <MathText>{"$\\mathrm{pOH} = 14 - 3 = 11$"}</MathText>.
        </Paso>
        <Paso n={4}>
          <strong>Caso B (base fuerte):</strong> calcula el pH de{" "}
          <MathText>{"$\\mathrm{NaOH}\\ 0{,}01\\text{ M}$"}</MathText> a{" "}
          <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>.
        </Paso>
        <Paso n={5}>
          El <MathText>{"$\\mathrm{NaOH}$"}</MathText> libera directamente{" "}
          <MathText>{"$\\mathrm{OH^-}$"}</MathText>:{" "}
          <MathText>{"$[\\mathrm{OH^-}] = 0{,}01\\text{ M} = 10^{-2}\\text{ M}$"}</MathText>.
        </Paso>
        <Paso n={6}>
          Primero hallamos el pOH: <MathText>{"$\\mathrm{pOH} = -\\log(10^{-2}) = 2$"}</MathText>.
        </Paso>
        <Paso n={7}>
          Despejamos el pH: <MathText>{"$\\mathrm{pH} = 14 - 2 = 12$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Error clásico de examen: en una base como <MathText>{"$\\mathrm{NaOH}\\ 0{,}01\\text{ M}$"}</MathText>,
        aplicar <MathText>{"$-\\log(0{,}01) = 2$"}</MathText> y marcar pH = 2. El valor{" "}
        <strong>2 es el pOH</strong>, nunca el pH de una base. Siempre revisa la coherencia:
        una base debe tener pH mayor que 7 (<MathText>{"$14 - 2 = 12$"}</MathText>).
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.3 Q3.2 */}
      <AutoCheck
        pregunta="¿Cuál es el pH de una solución acuosa de NaOH 0,01 M a 25 °C?"
        opciones={["pH = 2", "pH = 7", "pH = 10", "pH = 12"]}
        correctaIdx={3}
        explicacion="El NaOH es una base fuerte monoprótica, así que [OH⁻] = 0,01 M = 10⁻² M. Entonces pOH = -log(10⁻²) = 2, y por tanto pH = 14 - pOH = 14 - 2 = 12."
      />
    </EscenaRica>
  );
}

function EscFuertesDebiles() {
  return (
    <EscenaRica>
      <Titulo>5. Ácidos y bases fuertes vs débiles (Ka, Kb y % de ionización)</Titulo>

      <Hook>
        Una solución de ácido clorhídrico (<MathText>{"$\\mathrm{HCl}$"}</MathText>){" "}
        <MathText>{"$0{,}1\\text{ M}$"}</MathText> tiene <MathText>{"$\\text{pH} = 1$"}</MathText>{" "}
        y quema tejidos; en cambio, el vinagre casero (ácido acético,{" "}
        <MathText>{"$\\mathrm{CH_3COOH}$"}</MathText>) a la misma concentración{" "}
        <MathText>{"$0{,}1\\text{ M}$"}</MathText> tiene <MathText>{"$\\text{pH} \\approx 2{,}9$"}</MathText>{" "}
        y se usa en ensaladas. La diferencia no es la concentración: es cuánto se ionizan.
      </Hook>

      <Puente>
        Fuerte y débil no significan concentrado y diluido. Concentración es cuántas moléculas
        pusiste por litro (<MathText>{"$C_0$"}</MathText>); fuerza es qué fracción de esas
        moléculas decide romper su enlace para liberar{" "}
        <MathText>{"$\\mathrm{H^+}$"}</MathText> o <MathText>{"$\\mathrm{OH^-}$"}</MathText>.
      </Puente>

      <Definicion termino="Constantes Ka, Kb y porcentaje de ionización">
        Para un ácido débil monoprótico <MathText>{"$\\mathrm{HA \\rightleftharpoons H^+ + A^-}$"}</MathText>{" "}
        y una base débil <MathText>{"$\\mathrm{B + H_2O \\rightleftharpoons BH^+ + OH^-}$"}</MathText>:
        <MathText block>
          {"$$K_a = \\frac{[\\mathrm{H^+}][\\mathrm{A^-}]}{[\\mathrm{HA}]} \\qquad K_b = \\frac{[\\mathrm{BH^+}][\\mathrm{OH^-}]}{[\\mathrm{B}]}$$"}
        </MathText>
        El <strong>grado de ionización</strong> (<MathText>{"$\\alpha$"}</MathText>) y el{" "}
        <strong>porcentaje de ionización</strong> miden la fracción disociada respecto a la
        concentración inicial <MathText>{"$C_0$"}</MathText>:
        <MathText block>
          {"$$\\%\\,\\text{ionización} = \\frac{[\\mathrm{H^+}]_{\\text{eq}}}{C_0} \\times 100\\%$$"}
        </MathText>
      </Definicion>

      <FigFuerteVsDebil />

      <PorQue>
        Cuando un ácido débil se ioniza muy poco (<MathText>{"$\\% < 5\\%$"}</MathText>),
        restar <MathText>{"$x = [\\mathrm{H^+}]$"}</MathText> a{" "}
        <MathText>{"$C_0$"}</MathText> apenas cambia <MathText>{"$C_0$"}</MathText> (
        <MathText>{"$C_0 - x \\approx C_0$"}</MathText>). Así la ecuación cuadrática se
        simplifica a:
        <MathText block>
          {"$$K_a \\approx \\frac{x^2}{C_0} \\implies [\\mathrm{H^+}] = x \\approx \\sqrt{K_a \\cdot C_0}$$"}
        </MathText>
        Además, para cualquier par conjugado en agua a{" "}
        <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText> se cumple{" "}
        <MathText>{"$K_a \\cdot K_b = K_w = 1{,}0 \\times 10^{-14}$"}</MathText>.
      </PorQue>

      <WorkedExample titulo="Ejemplo: [H⁺], pH y % de ionización de un ácido débil">
        <Paso n={1}>
          Datos: disolución <MathText>{"$0{,}10\\text{ M}$"}</MathText> de un ácido monoprótico
          débil <MathText>{"$\\mathrm{HA}$"}</MathText> con{" "}
          <MathText>{"$K_a = 1{,}0 \\times 10^{-5}$"}</MathText> a{" "}
          <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Aplicamos la aproximación para ácido débil:{" "}
          <MathText>{"$[\\mathrm{H^+}] = \\sqrt{K_a \\cdot C_0}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Sustituimos los números:{" "}
          <MathText>{"$[\\mathrm{H^+}] = \\sqrt{(1{,}0 \\times 10^{-5})(0{,}10)} = \\sqrt{1{,}0 \\times 10^{-6}}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Calculamos la raíz (dividiendo el exponente entre 2):{" "}
          <MathText>{"$[\\mathrm{H^+}] = 1{,}0 \\times 10^{-3}\\text{ M}$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Verificamos el porcentaje de ionización:{" "}
          <MathText>{"$\\%\\,\\text{ionización} = \\dfrac{1{,}0 \\times 10^{-3}}{0{,}10} \\times 100\\% = 1{,}0\\%$"}</MathText>{" "}
          (menor a <MathText>{"$5\\%$"}</MathText>, aproximación válida).
        </Paso>
        <Paso n={6}>
          Calculamos el pH: <MathText>{"$\\mathrm{pH} = -\\log(1{,}0 \\times 10^{-3}) = 3{,}0$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Lista clave que conviene memorizar: ácidos fuertes comunes son{" "}
        <MathText>{"$\\mathrm{HCl, HBr, HI, HNO_3, HClO_4}$"}</MathText> y el primer protón de{" "}
        <MathText>{"$\\mathrm{H_2SO_4}$"}</MathText>; bases fuertes comunes son los hidróxidos
        del grupo IA (<MathText>{"$\\mathrm{NaOH, KOH}$"}</MathText>) y{" "}
        <MathText>{"$\\mathrm{Ca(OH)_2, Ba(OH)_2}$"}</MathText>. Todos los demás ácidos
        orgánicos (<MathText>{"$\\mathrm{CH_3COOH}$"}</MathText>),{" "}
        <MathText>{"$\\mathrm{HF, H_2CO_3}$"}</MathText> y <MathText>{"$\\mathrm{NH_3}$"}</MathText>{" "}
        son débiles: nunca digas que <MathText>{"$[\\mathrm{H^+}] = C_0$"}</MathText> en un
        ácido débil.
      </Cuidado>

      <AutoCheck
        pregunta="Se tiene un ácido débil monoprótico HA 0,40 M con Ka = 1,0 × 10⁻⁵ a 25 °C. Usando la aproximación habitual, ¿cuál es su [H⁺] en el equilibrio?"
        opciones={[
          "4,0 × 10⁻⁶ M",
          "2,0 × 10⁻³ M",
          "4,0 × 10⁻³ M",
          "0,40 M",
        ]}
        correctaIdx={1}
        explicacion="[H⁺] ≈ √(Ka · C₀) = √(1,0 × 10⁻⁵ × 0,40) = √(4,0 × 10⁻⁶) = 2,0 × 10⁻³ M. Además, (2,0 × 10⁻³ / 0,40) × 100% = 0,5% < 5%, así que la aproximación es válida."
      />
    </EscenaRica>
  );
}

function EscNeutralizacion() {
  return (
    <EscenaRica>
      <Titulo>6. Neutralización, normalidad y titulación (Na · Va = Nb · Vb)</Titulo>

      <Hook>
        Cuando sientes acidez estomacal (exceso de <MathText>{"$\\mathrm{HCl}$"}</MathText>),
        tomas un antiácido con <MathText>{"$\\mathrm{Mg(OH)_2}$"}</MathText> o{" "}
        <MathText>{"$\\mathrm{CaCO_3}$"}</MathText>. La base reacciona con el ácido hasta
        cancelar los <MathText>{"$\\mathrm{H^+}$"}</MathText>: eso es una neutralización.
      </Hook>

      <Puente>
        Ya manejas la fórmula de dilución <MathText>{"$C_1 V_1 = C_2 V_2$"}</MathText>, donde
        se conserva la cantidad de soluto. En una neutralización se conserva otra magnitud: los{" "}
        <strong>equivalentes químicos</strong> (<MathText>{"$\\text{eq}$"}</MathText>) de ácido
        y de base deben igualarse uno a uno.
      </Puente>

      <Definicion termino="Normalidad, equivalente químico y titulación">
        La <strong>normalidad (<MathText>{"$N$"}</MathText>)</strong> expresa el número de
        equivalentes por litro de solución y se relaciona con la molaridad (
        <MathText>{"$M$"}</MathText>) mediante la valencia o factor{" "}
        <MathText>{"$\\theta$"}</MathText> (<MathText>{"$\\mathrm{H^+}$"}</MathText> u{" "}
        <MathText>{"$\\mathrm{OH^-}$"}</MathText> transferibles por fórmula):
        <MathText block>
          {"$$N = M \\cdot \\theta \\qquad P_{\\text{eq}} = \\frac{M_{\\text{molar}}}{\\theta} \\qquad \\text{eq} = N \\cdot V_{\\text{L}} = \\frac{m}{P_{\\text{eq}}}$$"}
        </MathText>
        En la <strong>titulación</strong> (valoración), se añade un volumen medido de
        titulante hasta alcanzar el <strong>punto de equivalencia</strong>, donde:
        <MathText block>
          {"$$\\text{eq}_{\\text{ácido}} = \\text{eq}_{\\text{base}} \\implies N_a \\cdot V_a = N_b \\cdot V_b$$"}
        </MathText>
      </Definicion>

      <FigTitulacion />

      <PorQue>
        ¿Por qué usar <MathText>{"$N_a V_a = N_b V_b$"}</MathText> en lugar de{" "}
        <MathText>{"$M_a V_a = M_b V_b$"}</MathText>? Porque 1 mol de{" "}
        <MathText>{"$\\mathrm{H_2SO_4}$"}</MathText> aporta <strong>2</strong>{" "}
        <MathText>{"$\\mathrm{H^+}$"}</MathText> (<MathText>{"$\\theta = 2$"}</MathText>),
        así que 1 mol de ácido sulfúrico necesita <strong>2 moles</strong> de{" "}
        <MathText>{"$\\mathrm{NaOH}$"}</MathText> (<MathText>{"$\\theta = 1$"}</MathText>). Al
        trabajar en equivalentes (normalidad), ese factor estequiométrico ya queda
        incorporado y siempre vale 1 equivalente de ácido = 1 equivalente de base.
      </PorQue>

      {/* basado en: data/examenes/umss/ingenieria/2025-3op-1-2025.md P7 */}
      <WorkedExample titulo="Ejemplo 1 (examen UMSS): molaridad de H₂SO₄ en titulación">
        <Paso n={1}>
          Enunciado adaptado: se titulan <MathText>{"$20\\text{ mL}$"}</MathText> de ácido
          sulfúrico (<MathText>{"$\\mathrm{H_2SO_4}$"}</MathText>) con{" "}
          <MathText>{"$10\\text{ mL}$"}</MathText> de <MathText>{"$\\mathrm{NaOH}\\ 2\\text{ N}$"}</MathText>.
          Calcula la concentración molar (<MathText>{"$M$"}</MathText>) del ácido.
        </Paso>
        <Paso n={2}>
          Igualamos equivalentes en el punto de equivalencia:{" "}
          <MathText>{"$N_a \\cdot V_a = N_b \\cdot V_b$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Sustituimos (ambos volúmenes en mL):{" "}
          <MathText>{"$N_a \\cdot (20\\text{ mL}) = (2\\text{ N}) \\cdot (10\\text{ mL})$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Despejamos la normalidad del ácido:{" "}
          <MathText>{"$N_a = \\dfrac{20}{20} = 1\\text{ N}$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Pasamos a molaridad con <MathText>{"$\\theta = 2$"}</MathText> para{" "}
          <MathText>{"$\\mathrm{H_2SO_4}$"}</MathText>:{" "}
          <MathText>{"$M_a = \\dfrac{N_a}{\\theta} = \\dfrac{1}{2} = 0{,}5\\text{ M}$"}</MathText>.
        </Paso>
      </WorkedExample>

      {/* basado en: data/examenes/umss/ingenieria/2025-1op-1-2025.md P15 */}
      <WorkedExample titulo="Ejemplo 2 (examen UMSS): volumen de HCl 3 N para neutralizar CaCO₃">
        <Paso n={1}>
          Enunciado adaptado: calcula el volumen (en mL) de{" "}
          <MathText>{"$\\mathrm{HCl}\\ 3\\text{ N}$"}</MathText> necesario para reaccionar
          completamente con <MathText>{"$30\\text{ g}$"}</MathText> de{" "}
          <MathText>{"$\\mathrm{CaCO_3}$"}</MathText> al <MathText>{"$75\\%$"}</MathText> de
          pureza (<MathText>{"$M(\\mathrm{CaCO_3}) = 100\\text{ g/mol}$"}</MathText>).
        </Paso>
        <Paso n={2}>
          Calculamos la masa pura de carbonato:{" "}
          <MathText>{"$m_{\\text{pura}} = 30\\text{ g} \\times 0{,}75 = 22{,}5\\text{ g}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          En <MathText>{"$\\mathrm{CaCO_3 + 2\\,HCl \\to CaCl_2 + CO_2 + H_2O}$"}</MathText>,{" "}
          <MathText>{"$\\theta = 2\\text{ eq/mol}$"}</MathText>, luego{" "}
          <MathText>{"$P_{\\text{eq}} = \\dfrac{100}{2} = 50\\text{ g/eq}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Hallamos los equivalentes de <MathText>{"$\\mathrm{CaCO_3}$"}</MathText>:{" "}
          <MathText>{"$\\text{eq} = \\dfrac{22{,}5\\text{ g}}{50\\text{ g/eq}} = 0{,}45\\text{ eq}$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Igualamos a los equivalentes de ácido (<MathText>{"$N \\cdot V = 0{,}45\\text{ eq}$"}</MathText>):{" "}
          <MathText>{"$V = \\dfrac{0{,}45\\text{ eq}}{3\\text{ eq/L}} = 0{,}15\\text{ L} = 150\\text{ mL}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        <MathText>{"$M_a V_a = M_b V_b$"}</MathText> solo funciona cuando tanto el ácido como la
        base tienen <MathText>{"$\\theta = 1$"}</MathText> (como{" "}
        <MathText>{"$\\mathrm{HCl + NaOH}$"}</MathText>). Si aparece{" "}
        <MathText>{"$\\mathrm{H_2SO_4}$"}</MathText>,{" "}
        <MathText>{"$\\mathrm{H_3PO_4}$"}</MathText> o{" "}
        <MathText>{"$\\mathrm{Ca(OH)_2}$"}</MathText>, convierte primero a normalidad (
        <MathText>{"$N = M \\cdot \\theta$"}</MathText>) para no fallar por un factor de 2 o 3.
      </Cuidado>

      <AutoCheck
        pregunta="¿Qué volumen de Ca(OH)₂ 0,10 M se requiere para neutralizar exactamente 40 mL de HCl 0,20 M?"
        opciones={["40 mL", "80 mL", "20 mL", "10 mL"]}
        correctaIdx={0}
        explicacion="Para HCl (θ = 1): Na = 0,20 N. Para Ca(OH)₂ (θ = 2): Nb = 0,10 × 2 = 0,20 N. Aplicando Na·Va = Nb·Vb: 0,20 × 40 mL = 0,20 × Vb, de donde Vb = 40 mL."
      />
    </EscenaRica>
  );
}

function EscSangreAmortiguadores() {
  return (
    <EscenaRica>
      <Titulo>7. Aplicación médica: pH de la sangre y soluciones amortiguadoras</Titulo>

      <Hook>
        Durante una carrera intensa, tus músculos liberan grandes cantidades de ácido láctico
        al torrente sanguíneo. Sin embargo, el pH de tu sangre arterial apenas se mueve de{" "}
        <MathText>{"$7{,}40$"}</MathText>. Si cayera por debajo de{" "}
        <MathText>{"$6{,}80$"}</MathText> o subiera de <MathText>{"$7{,}80$"}</MathText>, sería
        mortal porque tus enzimas perderían su forma.
      </Hook>

      <Puente>
        Un amortiguador químico funciona como una esponja doble en finanzas: si entra mucho
        dinero (ácido), guarda el exceso; si falta dinero (entra base), libera reservas para
        mantener estable el saldo (el pH).
      </Puente>

      <Definicion termino="Solución amortiguadora (buffer) y tampón bicarbonato">
        Una <strong>solución amortiguadora</strong> o <strong>buffer</strong> es una mezcla de
        un ácido débil y su base conjugada (o base débil y su ácido conjugado) en
        concentraciones comparables, capaz de resistir cambios bruscos de pH al añadir
        pequeñas cantidades de ácido o base fuerte.
        <Parrafo>
          En la sangre arterial (rango normal <MathText>{"$7{,}35$"}</MathText> a{" "}
          <MathText>{"$7{,}45$"}</MathText>), el amortiguador principal es el par{" "}
          <strong>ácido carbónico / ion bicarbonato</strong>:
        </Parrafo>
        <MathText block>
          {"$$\\mathrm{CO_2 + H_2O \\rightleftharpoons H_2CO_3 \\rightleftharpoons H^+ + HCO_3^-}$$"}
        </MathText>
      </Definicion>

      <FigSangreClinica />

      <PorQue>
        ¿Cómo neutraliza la sangre ambas amenazas?
        <br />
        <strong>1. Si entra ácido (<MathText>{"$\\mathrm{H^+}$"}</MathText>):</strong> la base
        conjugada <MathText>{"$\\mathrm{HCO_3^-}$"}</MathText> lo atrapa formando{" "}
        <MathText>{"$\\mathrm{H_2CO_3}$"}</MathText>, que se convierte en{" "}
        <MathText>{"$\\mathrm{CO_2}$"}</MathText> y se elimina al exhalar (hiperventilación).
        <br />
        <strong>2. Si entra base (<MathText>{"$\\mathrm{OH^-}$"}</MathText>):</strong> el ácido
        débil <MathText>{"$\\mathrm{H_2CO_3}$"}</MathText> cede un{" "}
        <MathText>{"$\\mathrm{H^+}$"}</MathText> para convertir el{" "}
        <MathText>{"$\\mathrm{OH^-}$"}</MathText> en agua y{" "}
        <MathText>{"$\\mathrm{HCO_3^-}$"}</MathText>.
        <br />
        Su pH se calcula con la <strong>ecuación de Henderson-Hasselbalch</strong>:
        <MathText block>
          {"$$\\mathrm{pH} = \\mathrm{p}K_a + \\log\\left(\\frac{[\\text{base conjugada}]}{[\\text{ácido débil}]}\\right)$$"}
        </MathText>
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.3 Q3.4 */}
      <WorkedExample titulo="Ejemplo clínico: impacto de bajar el pH sanguíneo de 7,4 a 7,1 y razón 20:1">
        <Paso n={1}>
          <strong>Parte A (cambio de <MathText>{"$[\\mathrm{H^+}]$"}</MathText>):</strong> un
          paciente en acidosis aguda pasa de pH normal <MathText>{"$7{,}4$"}</MathText> a pH{" "}
          <MathText>{"$7{,}1$"}</MathText>. ¿Cómo cambia <MathText>{"$[\\mathrm{H^+}]$"}</MathText>?
        </Paso>
        <Paso n={2}>
          Calculamos el cociente:{" "}
          <MathText>{"$\\dfrac{[\\mathrm{H^+}]_{7{,}1}}{[\\mathrm{H^+}]_{7{,}4}} = \\dfrac{10^{-7{,}1}}{10^{-7{,}4}} = 10^{-7{,}1 - (-7{,}4)} = 10^{0{,}3}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Como <MathText>{"$\\log_{10}(2) \\approx 0{,}301$"}</MathText>, se cumple{" "}
          <MathText>{"$10^{0{,}3} \\approx 2{,}0$"}</MathText>. Bajar apenas{" "}
          <MathText>{"$0{,}3$"}</MathText> unidades de pH <strong>duplica</strong> la
          concentración de <MathText>{"$\\mathrm{H^+}$"}</MathText> en sangre.
        </Paso>
        <Paso n={4}>
          <strong>Parte B (Henderson-Hasselbalch):</strong> a{" "}
          <MathText>{"$37\\,^\\circ\\text{C}$"}</MathText>, el sistema bicarbonato tiene{" "}
          <MathText>{"$\\mathrm{p}K_a = 6{,}1$"}</MathText> y el organismo mantiene una razón{" "}
          <MathText>{"$\\dfrac{[\\mathrm{HCO_3^-}]}{[\\mathrm{H_2CO_3}]} = 20$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Calculamos el término logarítmico:{" "}
          <MathText>{"$\\log(20) = \\log(2 \\times 10) = 0{,}30 + 1{,}00 = 1{,}30$"}</MathText>.
        </Paso>
        <Paso n={6}>
          Sumamos al <MathText>{"$\\mathrm{p}K_a$"}</MathText>:{" "}
          <MathText>{"$\\mathrm{pH} = 6{,}1 + 1{,}30 = 7{,}40$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Como la escala de pH es logarítmica, una diferencia de <MathText>{"$0{,}3$"}</MathText>{" "}
        unidades parece pequeña pero duplica la acidez real; y recuerda que un buffer está
        formado por un <strong>ácido débil y su base conjugada</strong> (nunca por un ácido
        fuerte como <MathText>{"$\\mathrm{HCl}$"}</MathText> con <MathText>{"$\\mathrm{NaCl}$"}</MathText>).
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.3 Q3.4 */}
      <AutoCheck
        pregunta="El pH normal de la sangre arterial es 7,4. Si un paciente llega con acidosis y pH = 7,1, ¿qué ocurrió aproximadamente con su concentración de H⁺?"
        opciones={[
          "Disminuyó a la mitad",
          "Aumentó un 30%",
          "Aumentó al doble (aproximadamente 2 veces)",
          "Aumentó 10 veces",
        ]}
        correctaIdx={2}
        explicacion="[H⁺] = 10^(-pH). Al pasar de 7,4 a 7,1, la relación es 10^(-7,1) / 10^(-7,4) = 10^(0,3) ≈ 2,0, es decir, la concentración de protones se duplicó."
      />
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>8. Errores comunes y práctica</Titulo>

      <Misconception titulo="Confusión 1: calcular -log[OH⁻] y creer que ese número es el pH">
        Si disuelves <MathText>{"$\\mathrm{NaOH}\\ 10^{-3}\\text{ M}$"}</MathText>, el valor{" "}
        <MathText>{"$-\\log(10^{-3}) = 3$"}</MathText> es el <strong>pOH</strong>. Para
        obtener el pH a <MathText>{"$25\\,^\\circ\\text{C}$"}</MathText> debes restar de 14:{" "}
        <MathText>{"$\\mathrm{pH} = 14 - 3 = 11$"}</MathText>.
      </Misconception>

      <Misconception titulo="Confusión 2: usar MₐVₐ = MᵦVᵦ sin mirar la valencia θ">
        Con <MathText>{"$\\mathrm{H_2SO_4}$"}</MathText> (<MathText>{"$\\theta = 2$"}</MathText>)
        o <MathText>{"$\\mathrm{Ca(OH)_2}$"}</MathText> (<MathText>{"$\\theta = 2$"}</MathText>),
        1 mol aporta 2 equivalentes. Convierte primero a normalidad (
        <MathText>{"$N = M \\cdot \\theta$"}</MathText>) y aplica{" "}
        <MathText>{"$N_a V_a = N_b V_b$"}</MathText>.
      </Misconception>

      <Misconception titulo="Confusión 3: igualar [H⁺] = C₀ en un ácido débil">
        Un ácido débil como <MathText>{"$\\mathrm{CH_3COOH}$"}</MathText> se ioniza
        parcialmente. Su concentración de protones no es <MathText>{"$C_0$"}</MathText>, sino{" "}
        <MathText>{"$[\\mathrm{H^+}] \\approx \\sqrt{K_a \\cdot C_0}$"}</MathText> (cuando{" "}
        <MathText>{"$\\%\\,\\text{ionización} < 5\\%$"}</MathText>).
      </Misconception>

      <Misconception titulo="Confusión 4: pensar que una variación pequeña de pH es lineal">
        Un cambio de 1 unidad de pH equivale a multiplicar o dividir{" "}
        <MathText>{"$[\\mathrm{H^+}]$"}</MathText> por <strong>10</strong>; un cambio de{" "}
        <MathText>{"$0{,}3$"}</MathText> unidades la duplica o la reduce a la mitad.
      </Misconception>

      <Resumen>
        <Parrafo>
          <strong>Fórmulas esenciales para el examen (25 °C):</strong>
        </Parrafo>
        <Parrafo>
          1. <MathText>{"$K_w = [\\mathrm{H^+}][\\mathrm{OH^-}] = 1{,}0 \\times 10^{-14}$"}</MathText>{" "}
          y <MathText>{"$\\mathrm{pH} + \\mathrm{pOH} = 14$"}</MathText>.
        </Parrafo>
        <Parrafo>
          2. Ácido/base fuerte: disociación total. Ácido débil:{" "}
          <MathText>{"$[\\mathrm{H^+}] \\approx \\sqrt{K_a \\cdot C_0}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          3. Normalidad y titulación: <MathText>{"$N = M \\cdot \\theta$"}</MathText>,{" "}
          <MathText>{"$P_{\\text{eq}} = M_{\\text{molar}}/\\theta$"}</MathText> y{" "}
          <MathText>{"$N_a V_a = N_b V_b$"}</MathText>.
        </Parrafo>
        <Parrafo>
          4. Amortiguador sanguíneo:{" "}
          <MathText>{"$\\mathrm{H_2CO_3 / HCO_3^-}$"}</MathText>, pH arterial normal{" "}
          <MathText>{"$7{,}35 - 7{,}45$"}</MathText>.
        </Parrafo>
      </Resumen>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.3 Q3.5 */}
      <AutoCheck
        pregunta="Práctica 1 (titulación): ¿Cuántos mL de HCl 0,2 M se necesitan para neutralizar completamente 40 mL de NaOH 0,1 M?"
        opciones={["80 mL", "40 mL", "10 mL", "20 mL"]}
        correctaIdx={3}
        explicacion="Tanto HCl como NaOH tienen θ = 1, así que N = M. Usando Na·Va = Nb·Vb: 0,2 · Va = 0,1 · 40 = 4, por lo que Va = 4 / 0,2 = 20 mL."
      />

      {/* basado en: data/examenes/umss/ingenieria/2025-parcial2-1-2025.md P13 y 2024-final-1-2024.md P14 */}
      <AutoCheck
        pregunta="Práctica 2 (normalidad): ¿Cuál es la normalidad de una disolución acuosa de H₂SO₄ 1,5 M?"
        opciones={["0,75 N", "3,0 N", "1,5 N", "4,5 N"]}
        correctaIdx={1}
        explicacion="El H₂SO₄ es un ácido diprótico (θ = 2 eq/mol). Aplicando N = M · θ: N = 1,5 × 2 = 3,0 N."
      />

      {/* basado en: data/examenes/umss/ingenieria/2018-1op-2-2018.md P13 */}
      <AutoCheck
        pregunta="Práctica 3 (examen UMSS): ¿Qué volumen (cm³) de H₂SO₄ al 98% en masa y densidad 1,81 g/cm³ se necesita para preparar 1 L de disolución 3,62 N? (P_eq H₂SO₄ = 49 g/eq)"
        opciones={["100 cm³", "50 cm³", "200 cm³", "362 cm³"]}
        correctaIdx={0}
        explicacion="Para 1 L de 3,62 N hacen falta 3,62 eq de H₂SO₄, es decir 3,62 × 49 = 177,38 g de H₂SO₄ puro. En masa de solución al 98%: 177,38 / 0,98 = 181 g. Con ρ = 1,81 g/cm³: V = 181 / 1,81 = 100 cm³."
      />

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.3 Q3.1 y Q3.2 */}
      <AutoCheck
        pregunta="Práctica 4 (base fuerte diprótica): ¿Cuál es el pH de una solución de Ca(OH)₂ 0,005 M completamente disociada a 25 °C?"
        opciones={["pH = 2,3", "pH = 11,7", "pH = 12", "pH = 2"]}
        correctaIdx={2}
        explicacion="Cada mol de Ca(OH)₂ libera 2 moles de OH⁻: [OH⁻] = 2 × 0,005 M = 0,01 M = 10⁻² M. Luego pOH = -log(10⁻²) = 2 y pH = 14 - 2 = 12."
      />

      <AutoCheck
        pregunta="Práctica 5 (amortiguadores y teorías): ¿Qué pareja puede formar una solución amortiguadora (buffer) eficaz y qué teoría clasifica al BF₃ como ácido?"
        opciones={[
          "HCl / NaCl · teoría de Arrhenius",
          "NaOH / H₂O · teoría de Brønsted-Lowry",
          "H₂SO₄ / K₂SO₄ · teoría de Brønsted-Lowry",
          "CH₃COOH / CH₃COONa · teoría de Lewis",
        ]}
        correctaIdx={3}
        explicacion="Un buffer exige un ácido débil y su base conjugada (CH₃COOH / CH₃COO⁻); HCl y H₂SO₄ son ácidos fuertes y no amortiguan. Por otro lado, el BF₃ no tiene H⁺ y acepta un par de electrones, así que solo es ácido según la teoría de Lewis."
      />
    </EscenaRica>
  );
}

const ESCENAS = [
  { titulo: "Propiedades e indicadores", componente: EscPropiedades },
  { titulo: "Teorías ácido-base", componente: EscTeorias },
  { titulo: "Autoionización y Kw", componente: EscAguaKw },
  { titulo: "Escala de pH y pOH", componente: EscPhPoh },
  { titulo: "Fuertes vs débiles (Ka, Kb)", componente: EscFuertesDebiles },
  { titulo: "Neutralización y titulación", componente: EscNeutralizacion },
  { titulo: "pH sanguíneo y buffers", componente: EscSangreAmortiguadores },
  { titulo: "Errores y práctica", componente: EscPractica },
];

export default function AcidoBasePage() {
  return (
    <LeccionShell
      unidad="QUI-11"
      tituloUnidad="Equilibrio ácido-base · Teorías, pH y pOH"
      escenas={ESCENAS}
    />
  );
}

/* VERIFICACIÓN:
1. Escena 3 (WorkedExample):
   - dato: [H+] = 2.0e-4 M, Kw = 1.0e-14 (25 °C)
   - fórmula: [OH-] = Kw / [H+] = 1.0e-14 / 2.0e-4
   - resultado: 0.5e-10 = 5.0e-11 M
2. Escena 3 (AutoCheck):
   - dato: [OH-] = 2.5e-3 M, Kw = 1.0e-14
   - fórmula: [H+] = 1.0e-14 / 2.5e-3
   - resultado: 0.4e-11 = 4.0e-12 M (básica, opción 0)
3. Escena 4 (WorkedExample A - Q3.1):
   - dato: HCl 0.001 M = 10^-3 M
   - fórmula: pH = -log([H+]), pOH = 14 - pH
   - resultado: pH = 3, pOH = 11
4. Escena 4 (WorkedExample B & AutoCheck - Q3.2):
   - dato: NaOH 0.01 M -> [OH-] = 10^-2 M
   - fórmula: pOH = -log([OH-]), pH = 14 - pOH
   - resultado: pOH = 2, pH = 12 (opción 3)
5. Escena 5 (WorkedExample):
   - dato: HA 0.10 M, Ka = 1.0e-5
   - fórmula: [H+] = sqrt(Ka * C0) = sqrt(1.0e-5 * 0.10) = sqrt(1.0e-6)
   - resultado: [H+] = 1.0e-3 M; % ionización = (1.0e-3 / 0.10)*100% = 1.0% < 5%; pH = 3.0
6. Escena 5 (AutoCheck):
   - dato: HA 0.40 M, Ka = 1.0e-5
   - fórmula: [H+] = sqrt(1.0e-5 * 0.40) = sqrt(4.0e-6)
   - resultado: 2.0e-3 M (opción 1); % = (2.0e-3/0.40)*100 = 0.5% < 5%
7. Escena 6 (WorkedExample 1 - 2025-3op-1-2025.md P7):
   - dato: Va = 20 mL H2SO4 (theta=2), Vb = 10 mL NaOH 2 N
   - fórmula: Na * Va = Nb * Vb -> Na = (2 * 10) / 20 = 1 N; M = Na / theta
   - resultado: Na = 1 N, M = 1 / 2 = 0.5 M
8. Escena 6 (WorkedExample 2 - 2025-1op-1-2025.md P15):
   - dato: 30 g CaCO3 al 75% pureza, M = 100 g/mol, theta = 2, HCl 3 N
   - fórmula: m_pura = 30 * 0.75 = 22.5 g; Peq = 100 / 2 = 50 g/eq; eq = 22.5 / 50 = 0.45 eq; V = eq / N
   - resultado: V = 0.45 / 3 = 0.15 L = 150 mL
9. Escena 6 (AutoCheck):
   - dato: Ca(OH)2 0.10 M (theta=2 -> Nb = 0.20 N), Va = 40 mL HCl 0.20 M (theta=1 -> Na = 0.20 N)
   - fórmula: Vb = (Na * Va) / Nb = (0.20 * 40) / 0.20
   - resultado: 40 mL (opción 0)
10. Escena 7 (WorkedExample - Q3.4 & Henderson-Hasselbalch):
   - dato: pH 7.4 vs 7.1; pKa = 6.1, [HCO3-]/[H2CO3] = 20
   - fórmula A: [H+]_7.1 / [H+]_7.4 = 10^-7.1 / 10^-7.4 = 10^0.3 ≈ 2.00
   - fórmula B: pH = 6.1 + log10(20) = 6.1 + log10(2) + log10(10) = 6.1 + 0.301 + 1 = 7.401 ≈ 7.40
11. Escena 8 (AutoCheck 1 - Q3.5):
   - dato: 40 mL NaOH 0.1 M, HCl 0.2 M
   - fórmula: Va = (0.1 * 40) / 0.2
   - resultado: 20 mL (opción 3)
12. Escena 8 (AutoCheck 2 - 2025-parcial2-1-2025.md P13 / 2024-final-1-2024.md P14):
   - dato: H2SO4 1.5 M, theta = 2
   - fórmula: N = M * theta = 1.5 * 2
   - resultado: 3.0 N (opción 1)
13. Escena 8 (AutoCheck 3 - 2018-1op-2-2018.md P13):
   - dato: 1 L de 3.62 N H2SO4, Peq = 49 g/eq, pureza 98%, rho = 1.81 g/cm^3
   - fórmula: eq = 3.62 * 1 = 3.62 eq; m_pura = 3.62 * 49 = 177.38 g; m_sol = 177.38 / 0.98 = 181.0 g; V = 181.0 / 1.81
   - resultado: 100 cm^3 (opción 0)
14. Escena 8 (AutoCheck 4):
   - dato: Ca(OH)2 0.005 M (theta = 2)
   - fórmula: [OH-] = 2 * 0.005 = 0.01 = 10^-2 M -> pOH = 2 -> pH = 14 - 2
   - resultado: pH = 12 (opción 2)
*/
