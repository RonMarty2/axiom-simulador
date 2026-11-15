"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell, { type Escena } from "../_components/LeccionShell";
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
import { LIENZO } from "../_components/lienzo";
import MathText from "@/app/components/MathText";

// =============================================================================
// Lección FIS-09: Calor y temperatura (PSA Medicina 2027)
// Alcance: temperatura vs calor, escalas termométricas (y escalas arbitrarias),
// dilatación lineal/superficial/volumétrica, calor específico, cambios de estado,
// equilibrio térmico en mezclas y propagación del calor.
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// Figuras SVG con coordenadas calculadas (ancho base 360 px)
// ─────────────────────────────────────────────────────────────────────────────

function FigTemperaturaCalor() {
  const W = 360;
  const H = 176;
  const BOX_W = 112;
  const BOX_H = 92;
  const BOX_Y = 34;
  const A_X = 20;
  const B_X = W - 20 - BOX_W;
  const MID_Y = BOX_Y + BOX_H / 2;
  const ARROW_X1 = A_X + BOX_W + 10;
  const ARROW_X2 = B_X - 10;

  // Coordenadas relativas para partículas dentro de cada recipiente
  const PARTICULAS_A = [
    { x: 28, y: 26, dx: 5 },
    { x: 58, y: 24, dx: -5 },
    { x: 84, y: 34, dx: 6 },
    { x: 34, y: 58, dx: -6 },
    { x: 64, y: 56, dx: 5 },
    { x: 86, y: 70, dx: -5 },
  ];

  const PARTICULAS_B = [
    { x: 30, y: 28, dx: 1.5 },
    { x: 60, y: 26, dx: -1.5 },
    { x: 84, y: 36, dx: 1.5 },
    { x: 34, y: 60, dx: -1.5 },
    { x: 62, y: 58, dx: 1.5 },
    { x: 82, y: 70, dx: -1.5 },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: 460, height: "auto", display: "block", margin: "10px auto" }}
      role="img"
      aria-label="Flujo de calor desde el cuerpo caliente A hacia el cuerpo frío B"
    >
      {/* Cuerpo caliente A */}
      <rect
        x={A_X}
        y={BOX_Y}
        width={BOX_W}
        height={BOX_H}
        rx={10}
        fill="rgba(224, 92, 62, 0.14)"
        stroke={LIENZO.bad}
        strokeWidth={1.6}
      />
      <text
        x={A_X + BOX_W / 2}
        y={BOX_Y - 10}
        textAnchor="middle"
        fill={LIENZO.bad}
        fontSize={12}
        fontWeight={700}
      >
        Cuerpo A · 60 °C
      </text>
      {PARTICULAS_A.map((p, i) => (
        <motion.circle
          key={`pa-${i}`}
          r={4}
          fill={LIENZO.bad}
          initial={{ cx: A_X + p.x, cy: BOX_Y + p.y }}
          animate={{
            cx: [A_X + p.x - p.dx, A_X + p.x + p.dx, A_X + p.x - p.dx],
            cy: [BOX_Y + p.y - 2, BOX_Y + p.y + 2, BOX_Y + p.y - 2],
          }}
          transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <text
        x={A_X + BOX_W / 2}
        y={BOX_Y + BOX_H + 16}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={10.5}
      >
        Agitación rápida
      </text>

      {/* Flecha de calor Q en tránsito */}
      <line
        x1={ARROW_X1}
        y1={MID_Y}
        x2={ARROW_X2 - 8}
        y2={MID_Y}
        stroke={LIENZO.warn}
        strokeWidth={3}
      />
      <polygon
        points={`${ARROW_X2},${MID_Y} ${ARROW_X2 - 10},${MID_Y - 6} ${ARROW_X2 - 10},${MID_Y + 6}`}
        fill={LIENZO.warn}
      />
      <text
        x={(ARROW_X1 + ARROW_X2) / 2}
        y={MID_Y - 12}
        textAnchor="middle"
        fill={LIENZO.warn}
        fontSize={12}
        fontWeight={700}
      >
        Calor (Q)
      </text>
      <text
        x={(ARROW_X1 + ARROW_X2) / 2}
        y={MID_Y + 18}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={10}
      >
        en tránsito
      </text>

      {/* Cuerpo frío B */}
      <rect
        x={B_X}
        y={BOX_Y}
        width={BOX_W}
        height={BOX_H}
        rx={10}
        fill="rgba(79, 138, 224, 0.14)"
        stroke="var(--dib-blue-500, #4f8ae0)"
        strokeWidth={1.6}
      />
      <text
        x={B_X + BOX_W / 2}
        y={BOX_Y - 10}
        textAnchor="middle"
        fill="var(--dib-blue-500, #4f8ae0)"
        fontSize={12}
        fontWeight={700}
      >
        Cuerpo B · 20 °C
      </text>
      {PARTICULAS_B.map((p, i) => (
        <motion.circle
          key={`pb-${i}`}
          r={4}
          cy={BOX_Y + p.y}
          fill="var(--dib-blue-500, #4f8ae0)"
          initial={{ cx: B_X + p.x }}
          animate={{
            cx: [B_X + p.x - p.dx, B_X + p.x + p.dx, B_X + p.x - p.dx],
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <text
        x={B_X + BOX_W / 2}
        y={BOX_Y + BOX_H + 16}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={10.5}
      >
        Agitación lenta
      </text>

      {/* Pie de equilibrio térmico */}
      <text
        x={W / 2}
        y={H - 8}
        textAnchor="middle"
        fill={LIENZO.ok}
        fontSize={11}
        fontWeight={600}
      >
        Si T<tspan dy={3} fontSize={8}>A</tspan><tspan dy={-3}> = T</tspan>
        <tspan dy={3} fontSize={8}>B</tspan><tspan dy={-3}> → equilibrio térmico (flujo neto Q = 0)</tspan>
      </text>
    </svg>
  );
}

function FigEscalasTermometricas({
  fraccion,
  tempC,
}: {
  fraccion: number;
  tempC: number;
}) {
  const W = 360;
  const H = 205;
  const TOP_Y = 38;
  const BOT_Y = 166;
  const SPAN_Y = BOT_Y - TOP_Y;
  const COL_W = 14;

  // Cuatro columnas paralelas: °C, °F, K y escala arbitraria X
  const COLS = [
    { x: 46, nombre: "°C", inf: "0", sup: "100", val: `${tempC.toFixed(0)} °C` },
    {
      x: 132,
      nombre: "°F",
      inf: "32",
      sup: "212",
      val: `${((9 / 5) * tempC + 32).toFixed(1).replace(".", ",")} °F`,
    },
    { x: 218, nombre: "K", inf: "273", sup: "373", val: `${(tempC + 273).toFixed(0)} K` },
    {
      x: 304,
      nombre: "°X",
      inf: "10",
      sup: "170",
      val: `${(10 + fraccion * 160).toFixed(0)} °X`,
    },
  ];

  const markY = BOT_Y - fraccion * SPAN_Y;
  const fillH = Math.max(4, fraccion * SPAN_Y);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: 460, height: "auto", display: "block", margin: "10px auto" }}
      role="img"
      aria-label="Comparación paralela de las escalas Celsius, Fahrenheit, Kelvin y una escala arbitraria X"
    >
      {/* Líneas guía de ebullición y fusión */}
      <line
        x1={24}
        y1={TOP_Y}
        x2={W - 18}
        y2={TOP_Y}
        stroke={LIENZO.fgFaint}
        strokeDasharray="3 3"
      />
      <line
        x1={24}
        y1={BOT_Y}
        x2={W - 18}
        y2={BOT_Y}
        stroke={LIENZO.fgFaint}
        strokeDasharray="3 3"
      />

      {/* Línea móvil de temperatura actual */}
      <line
        x1={24}
        y1={markY}
        x2={W - 18}
        y2={markY}
        stroke={LIENZO.accent}
        strokeWidth={1.6}
        strokeDasharray="5 3"
      />

      {COLS.map((c) => (
        <g key={c.nombre}>
          <text
            x={c.x}
            y={18}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={12.5}
            fontWeight={700}
          >
            {c.nombre}
          </text>

          {/* Tubo termométrico */}
          <rect
            x={c.x - COL_W / 2}
            y={TOP_Y}
            width={COL_W}
            height={SPAN_Y}
            rx={COL_W / 2}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1.2}
          />

          {/* Columna de mercurio proporcional */}
          <rect
            x={c.x - COL_W / 2 + 2}
            y={BOT_Y - fillH}
            width={COL_W - 4}
            height={fillH}
            rx={4}
            fill={LIENZO.accent}
          />

          {/* Punto superior (ebullición) */}
          <text
            x={c.x + 14}
            y={TOP_Y + 4}
            fill={LIENZO.fgDim}
            fontSize={10.5}
          >
            {c.sup}
          </text>

          {/* Punto inferior (fusión) */}
          <text
            x={c.x + 14}
            y={BOT_Y + 4}
            fill={LIENZO.fgDim}
            fontSize={10.5}
          >
            {c.inf}
          </text>

          {/* Lectura actual */}
          <text
            x={c.x}
            y={H - 12}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={11}
            fontWeight={700}
          >
            {c.val}
          </text>
        </g>
      ))}
    </svg>
  );
}

function FigDilatacion({ deltaT }: { deltaT: number }) {
  const W = 360;
  const H = 170;
  const BAR_X = 28;
  const BAR_BASE_W = 220;
  const BAR_H = 22;
  const Y_REF = 42;
  const Y_EXP = 88;

  // Acero: L0 = 10 m, alpha = 1,2e-5 °C^-1
  const deltaLmm = 10 * 1.2e-5 * deltaT * 1000;
  // Escala visual exagerada para que el alumno perciba el alargamiento
  const extraPx = (deltaT / 100) * 76;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: 460, height: "auto", display: "block", margin: "10px auto" }}
      role="img"
      aria-label="Dilatación lineal de una barra de acero al aumentar la temperatura"
    >
      {/* Tope fijo izquierdo */}
      <line
        x1={BAR_X}
        y1={24}
        x2={BAR_X}
        y2={126}
        stroke={LIENZO.fgDim}
        strokeWidth={2}
      />

      {/* Barra inicial */}
      <text x={BAR_X + 6} y={Y_REF - 8} fill={LIENZO.fgDim} fontSize={11}>
        Longitud inicial L₀ = 10 m
      </text>
      <rect
        x={BAR_X}
        y={Y_REF}
        width={BAR_BASE_W}
        height={BAR_H}
        rx={4}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.fgDim}
        strokeWidth={1.4}
      />

      {/* Línea guía de referencia de L0 */}
      <line
        x1={BAR_X + BAR_BASE_W}
        y1={Y_REF + BAR_H}
        x2={BAR_X + BAR_BASE_W}
        y2={Y_EXP + BAR_H + 14}
        stroke={LIENZO.fgFaint}
        strokeDasharray="3 3"
      />

      {/* Barra dilatada */}
      <text x={BAR_X + 6} y={Y_EXP - 8} fill={LIENZO.accent} fontSize={11} fontWeight={600}>
        Al subir ΔT = {deltaT} °C (escala visual aumentada)
      </text>
      <rect
        x={BAR_X}
        y={Y_EXP}
        width={BAR_BASE_W}
        height={BAR_H}
        rx={4}
        fill="rgba(224, 92, 62, 0.2)"
        stroke={LIENZO.accent}
        strokeWidth={1.4}
      />
      {extraPx > 0 && (
        <rect
          x={BAR_X + BAR_BASE_W}
          y={Y_EXP}
          width={extraPx}
          height={BAR_H}
          rx={3}
          fill={LIENZO.accent}
        />
      )}

      {/* Etiqueta de ΔL */}
      <text
        x={BAR_X + BAR_BASE_W + Math.max(extraPx / 2, 18)}
        y={Y_EXP + BAR_H + 18}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={11.5}
        fontWeight={700}
      >
        ΔL = {deltaLmm.toFixed(1).replace(".", ",")} mm
      </text>

      {/* Relación 1D, 2D, 3D */}
      <text
        x={W / 2}
        y={H - 8}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={11}
      >
        Lineal: α · Superficial: β = 2α · Volumétrica: γ = 3α
      </text>
    </svg>
  );
}

function FigCalorEspecifico() {
  const W = 360;
  const H = 178;
  const LABEL_X = 14;
  const BAR_X = 96;
  const BAR_MAX_W = 192;
  const ROW_H = 27;
  const START_Y = 34;

  // Energía Q en kJ para elevar 1 kg en ΔT = 10 °C
  const MATERIALES = [
    { nombre: "Agua", c: 4184, q: 41.84, color: "var(--dib-blue-500, #4f8ae0)" },
    { nombre: "Hielo", c: 2090, q: 20.9, color: "var(--dib-cyan-500, #38bdf8)" },
    { nombre: "Aluminio", c: 900, q: 9.0, color: LIENZO.warn },
    { nombre: "Hierro", c: 450, q: 4.5, color: LIENZO.accent },
    { nombre: "Cobre", c: 385, q: 3.85, color: LIENZO.bad },
  ];
  const Q_MAX = 41.84;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: 460, height: "auto", display: "block", margin: "10px auto" }}
      role="img"
      aria-label="Calor requerido para elevar 1 kg de distintas sustancias en 10 grados Celsius"
    >
      <text x={W / 2} y={16} textAnchor="middle" fill={LIENZO.fg} fontSize={11.5} fontWeight={600}>
        Calor Q para subir 1 kg en ΔT = 10 °C
      </text>

      {MATERIALES.map((m, idx) => {
        const y = START_Y + idx * ROW_H;
        const barW = Math.max(8, (m.q / Q_MAX) * BAR_MAX_W);
        return (
          <g key={m.nombre}>
            <text x={LABEL_X} y={y + 14} fill={LIENZO.fg} fontSize={11.5}>
              {m.nombre}
            </text>
            <rect
              x={BAR_X}
              y={y + 3}
              width={barW}
              height={14}
              rx={4}
              fill={m.color}
            />
            <text
              x={BAR_X + barW + 6}
              y={y + 14}
              fill={LIENZO.fgDim}
              fontSize={10.5}
            >
              {m.q.toFixed(2).replace(".", ",")} kJ
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function FigCurvaCalentamiento() {
  const W = 360;
  const H = 205;
  const PAD_L = 42;
  const PAD_R = 16;
  const PAD_T = 22;
  const PAD_B = 34;
  const PLOT_W = W - PAD_L - PAD_R;
  const PLOT_H = H - PAD_T - PAD_B;

  const Q_MAX = 740;
  const T_MIN = -20;
  const T_MAX = 120;

  const toX = (q: number) => PAD_L + (q / Q_MAX) * PLOT_W;
  const toY = (t: number) => PAD_T + ((T_MAX - t) / (T_MAX - T_MIN)) * PLOT_H;

  // Puntos exactos para 1 g de agua desde -20 °C hasta 120 °C (en calorías acumuladas)
  const PTS: [number, number][] = [
    [0, -20],
    [10, 0],   // Q1 = 10 cal (hielo)
    [90, 0],   // Q2 = 80 cal (fusión)
    [190, 100], // Q3 = 100 cal (agua líquida)
    [730, 100], // Q4 = 540 cal (vaporización)
    [740, 120], // Q5 = 10 cal (vapor)
  ];

  const pathD = PTS.map(
    ([q, t], idx) => `${idx === 0 ? "M" : "L"} ${toX(q).toFixed(1)} ${toY(t).toFixed(1)}`
  ).join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: 460, height: "auto", display: "block", margin: "10px auto" }}
      role="img"
      aria-label="Curva de calentamiento del agua mostrando las mesetas isotérmicas de fusión y vaporización"
    >
      {/* Ejes */}
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke={LIENZO.fgDim} strokeWidth={1.3} />
      <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke={LIENZO.fgDim} strokeWidth={1.3} />

      {/* Referencias horizontales 0 °C y 100 °C */}
      <line
        x1={PAD_L}
        y1={toY(0)}
        x2={W - PAD_R}
        y2={toY(0)}
        stroke={LIENZO.fgFaint}
        strokeDasharray="3 3"
      />
      <text x={PAD_L - 6} y={toY(0) + 4} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>
        0 °C
      </text>

      <line
        x1={PAD_L}
        y1={toY(100)}
        x2={W - PAD_R}
        y2={toY(100)}
        stroke={LIENZO.fgFaint}
        strokeDasharray="3 3"
      />
      <text x={PAD_L - 6} y={toY(100) + 4} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>
        100
      </text>
      <text x={PAD_L - 6} y={toY(-20) + 4} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>
        -20
      </text>

      {/* Curva T vs Q */}
      <path d={pathD} fill="none" stroke={LIENZO.accent} strokeWidth={2.5} strokeLinejoin="round" />

      {/* Resalte de mesetas */}
      <line
        x1={toX(10)}
        y1={toY(0)}
        x2={toX(90)}
        y2={toY(0)}
        stroke={LIENZO.ok}
        strokeWidth={4}
      />
      <line
        x1={toX(190)}
        y1={toY(100)}
        x2={toX(730)}
        y2={toY(100)}
        stroke={LIENZO.warn}
        strokeWidth={4}
      />

      {/* Etiquetas de mesetas */}
      <text x={(toX(10) + toX(90)) / 2} y={toY(0) - 8} textAnchor="middle" fill={LIENZO.ok} fontSize={10} fontWeight={700}>
        L<tspan dy={2.5} fontSize={7.5}>f</tspan><tspan dy={-2.5}> = 80 cal/g</tspan>
      </text>
      <text x={(toX(190) + toX(730)) / 2} y={toY(100) - 8} textAnchor="middle" fill={LIENZO.warn} fontSize={10.5} fontWeight={700}>
        Vaporización: L<tspan dy={2.5} fontSize={7.5}>v</tspan><tspan dy={-2.5}> = 540 cal/g (T cte)</tspan>
      </text>

      {/* Rótulos de ejes */}
      <text x={PAD_L + 4} y={PAD_T + 8} fill={LIENZO.fgDim} fontSize={10.5}>
        T (°C)
      </text>
      <text x={W / 2} y={H - 8} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10.5}>
        Calor acumulado Q para 1 g de agua (cal)
      </text>
    </svg>
  );
}

function FigEquilibrioMezcla() {
  const W = 360;
  const H = 166;
  const LEFT_X = 24;
  const RIGHT_X = 204;
  const BOX_W = 132;
  const BOX_H = 74;
  const TOP_Y = 24;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: 460, height: "auto", display: "block", margin: "10px auto" }}
      role="img"
      aria-label="Balance térmico entre hielo a 0 grados Celsius y agua caliente a 50 grados Celsius"
    >
      {/* Bloque frío (hielo) */}
      <rect
        x={LEFT_X}
        y={TOP_Y}
        width={BOX_W}
        height={BOX_H}
        rx={8}
        fill="rgba(79, 138, 224, 0.14)"
        stroke="var(--dib-blue-500, #4f8ae0)"
        strokeWidth={1.5}
      />
      <text x={LEFT_X + BOX_W / 2} y={TOP_Y + 20} textAnchor="middle" fill="var(--dib-blue-500, #4f8ae0)" fontSize={11.5} fontWeight={700}>
        Hielo · 15 g (0 °C)
      </text>
      <text x={LEFT_X + BOX_W / 2} y={TOP_Y + 39} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10.5}>
        Fusión: +1200 cal
      </text>
      <text x={LEFT_X + BOX_W / 2} y={TOP_Y + 56} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10.5}>
        Sube: +15 · T<tspan dy={2.5} fontSize={7.5}>e</tspan>
      </text>

      {/* Bloque caliente (agua) */}
      <rect
        x={RIGHT_X}
        y={TOP_Y}
        width={BOX_W}
        height={BOX_H}
        rx={8}
        fill="rgba(224, 92, 62, 0.14)"
        stroke={LIENZO.bad}
        strokeWidth={1.5}
      />
      <text x={RIGHT_X + BOX_W / 2} y={TOP_Y + 20} textAnchor="middle" fill={LIENZO.bad} fontSize={11.5} fontWeight={700}>
        Agua · 30 g (50 °C)
      </text>
      <text x={RIGHT_X + BOX_W / 2} y={TOP_Y + 39} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10.5}>
        Disp. a 0 °C: 1500 cal
      </text>
      <text x={RIGHT_X + BOX_W / 2} y={TOP_Y + 56} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10.5}>
        Q<tspan dy={2.5} fontSize={7.5}>agua</tspan><tspan dy={-2.5}>: 30 · (T</tspan><tspan dy={2.5} fontSize={7.5}>e</tspan><tspan dy={-2.5}> − 50)</tspan>
      </text>

      {/* Flechas hacia equilibrio */}
      <line x1={LEFT_X + BOX_W / 2} y1={TOP_Y + BOX_H + 4} x2={W / 2 - 12} y2={H - 32} stroke={LIENZO.ok} strokeWidth={1.6} />
      <line x1={RIGHT_X + BOX_W / 2} y1={TOP_Y + BOX_H + 4} x2={W / 2 + 12} y2={H - 32} stroke={LIENZO.ok} strokeWidth={1.6} />

      <text x={W / 2} y={H - 12} textAnchor="middle" fill={LIENZO.ok} fontSize={12} fontWeight={700}>
        ΣQ = 0 → Equilibrio final: T<tspan dy={2.5} fontSize={8}>e</tspan><tspan dy={-2.5}> = 6,7 °C</tspan>
      </text>
    </svg>
  );
}

function FigPropagacion() {
  const W = 360;
  const H = 166;
  const GAP = 9;
  const PAD = 12;
  const COL_W = (W - PAD * 2 - GAP * 2) / 3;
  const BOX_H = 138;
  const Y0 = 14;

  const X1 = PAD;
  const X2 = PAD + COL_W + GAP;
  const X3 = PAD + (COL_W + GAP) * 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ maxWidth: 460, height: "auto", display: "block", margin: "10px auto" }}
      role="img"
      aria-label="Los tres mecanismos de propagación del calor: conducción, convección y radiación"
    >
      {/* Panel 1: Conducción */}
      <rect x={X1} y={Y0} width={COL_W} height={BOX_H} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} />
      <text x={X1 + COL_W / 2} y={Y0 + 20} textAnchor="middle" fill={LIENZO.accent} fontSize={11.5} fontWeight={700}>
        Conducción
      </text>
      <rect x={X1 + 14} y={Y0 + 48} width={COL_W - 28} height={18} rx={3} fill="rgba(224,92,62,0.28)" stroke={LIENZO.accent} />
      <line x1={X1 + 22} y1={Y0 + 57} x2={X1 + COL_W - 24} y2={Y0 + 57} stroke={LIENZO.fg} strokeWidth={1.5} />
      <polygon points={`${X1 + COL_W - 18},${Y0 + 57} ${X1 + COL_W - 26},${Y0 + 53} ${X1 + COL_W - 26},${Y0 + 61}`} fill={LIENZO.fg} />
      <text x={X1 + COL_W / 2} y={Y0 + 96} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        Sólidos · sin mover
      </text>
      <text x={X1 + COL_W / 2} y={Y0 + 111} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        materia · kAΔT / d
      </text>

      {/* Panel 2: Convección */}
      <rect x={X2} y={Y0} width={COL_W} height={BOX_H} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} />
      <text x={X2 + COL_W / 2} y={Y0 + 20} textAnchor="middle" fill={LIENZO.warn} fontSize={11.5} fontWeight={700}>
        Convección
      </text>
      <circle cx={X2 + COL_W / 2} cy={Y0 + 58} r={19} fill="none" stroke={LIENZO.warn} strokeWidth={1.8} strokeDasharray="16 6" />
      <text x={X2 + COL_W / 2} y={Y0 + 62} textAnchor="middle" fill={LIENZO.warn} fontSize={10} fontWeight={700}>
        flujo
      </text>
      <text x={X2 + COL_W / 2} y={Y0 + 96} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        Fluidos (líquidos y
      </text>
      <text x={X2 + COL_W / 2} y={Y0 + 111} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        gases) · corrientes
      </text>

      {/* Panel 3: Radiación */}
      <rect x={X3} y={Y0} width={COL_W} height={BOX_H} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} />
      <text x={X3 + COL_W / 2} y={Y0 + 20} textAnchor="middle" fill={LIENZO.ok} fontSize={11.5} fontWeight={700}>
        Radiación
      </text>
      <path
        d={`M ${X3 + 16} ${Y0 + 56} Q ${X3 + 30} ${Y0 + 42}, ${X3 + 44} ${Y0 + 56} T ${X3 + 72} ${Y0 + 56} T ${X3 + 92} ${Y0 + 56}`}
        fill="none"
        stroke={LIENZO.ok}
        strokeWidth={2}
      />
      <text x={X3 + COL_W / 2} y={Y0 + 96} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        Ondas EM · funciona
      </text>
      <text x={X3 + COL_W / 2} y={Y0 + 111} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        en el vacío · ∝ T⁴
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 1 · Temperatura vs. calor
// ─────────────────────────────────────────────────────────────────────────────

function EscTemperaturaCalor() {
  return (
    <EscenaRica>
      <Titulo accent="calor">Temperatura vs. calor</Titulo>

      <Hook>
        Tocas una puerta de madera y su manija metálica en el mismo consultorio. La
        manija se siente helada, pero un termómetro marca exactamente la misma
        temperatura en ambas. ¿Por qué tu piel percibe cosas distintas?
      </Hook>

      <Definicion termino="Temperatura (T) y calor (Q)">
        <Parrafo>
          La <strong>temperatura</strong> mide la energía cinética promedio de
          agitación de las partículas de un cuerpo. No depende de la masa: un vaso
          con agua a <MathText>{"$40\\text{ °C}$"}</MathText> tiene la misma
          temperatura que un tanque a <MathText>{"$40\\text{ °C}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          El <strong>calor (<MathText>{"$Q$"}</MathText>)</strong> es energía en
          tránsito que fluye espontáneamente del cuerpo de mayor temperatura al de
          menor temperatura hasta que ambos alcanzan el{" "}
          <strong>equilibrio térmico</strong> (<MathText>{"$T_A = T_B$"}</MathText>).
        </Parrafo>
      </Definicion>

      <PorQue>
        Un cuerpo no «almacena calor»: almacena <strong>energía interna</strong>.
        Solo existe calor mientras la energía cruza una frontera impulsada por una
        diferencia térmica (<MathText>{"$\\Delta T \\neq 0$"}</MathText>). La
        manija metálica se siente fría porque extrae calor de tu mano mucho más
        rápido que la madera.
      </PorQue>

      <FigTemperaturaCalor />

      <WorkedExample titulo="Fiebre y dirección del flujo de calor">
        <Parrafo>
          Un paciente presenta fiebre con{" "}
          <MathText>{"$T_p = 39{,}0\\text{ °C}$"}</MathText> dentro de una sala
          climatizada a <MathText>{"$T_a = 21{,}0\\text{ °C}$"}</MathText>.
          Determina el salto térmico y el sentido espontáneo del flujo de calor.
        </Parrafo>
        <Paso n={1}>
          Compara ambas temperaturas:{" "}
          <MathText>{"$T_p = 39{,}0\\text{ °C} > T_a = 21{,}0\\text{ °C}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Calcula la diferencia térmica:{" "}
          <MathText>{"$\\Delta T = 39{,}0 - 21{,}0 = 18{,}0\\text{ °C}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          El calor <MathText>{"$Q$"}</MathText> fluye espontáneamente desde el
          paciente (<MathText>{"$39{,}0\\text{ °C}$"}</MathText>) hacia el aire
          (<MathText>{"$21{,}0\\text{ °C}$"}</MathText>), nunca al revés.
        </Paso>
      </WorkedExample>

      <Cuidado>
        En el examen suelen confundir «tener mucha energía térmica» con «estar a
        mayor temperatura». Un océano a <MathText>{"$15\\text{ °C}$"}</MathText>{" "}
        tiene muchísima más energía interna que una taza de café a{" "}
        <MathText>{"$80\\text{ °C}$"}</MathText>, pero si sumerges un objeto a{" "}
        <MathText>{"$50\\text{ °C}$"}</MathText> en el océano, el calor sale del
        objeto hacia el agua.
      </Cuidado>

      <AutoCheck
        pregunta="Dos bloques de hierro de 1 kg y 5 kg permanecen dentro de una incubadora a 37 °C durante varias horas. ¿Qué ocurre al ponerlos en contacto?"
        opciones={[
          "Fluye calor del bloque de 5 kg al de 1 kg",
          "Fluye calor del bloque de 1 kg al de 5 kg",
          "No hay flujo neto de calor porque están en equilibrio térmico",
          "Sube la temperatura del bloque más pequeño",
        ]}
        correctaIdx={2}
        explicacion="El flujo neto de calor depende solo de la diferencia de temperatura, no de la masa. Como ambos cuerpos están a 37 °C, se encuentran en equilibrio térmico."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 2 · Escalas termométricas
// ─────────────────────────────────────────────────────────────────────────────

function EscEscalas() {
  const [presetC, setPresetC] = useState<number>(37);
  const fraccion = Math.max(0, Math.min(1, presetC / 100));

  return (
    <EscenaRica>
      <Titulo accent="escalas">Escalas termométricas</Titulo>

      <Puente>
        En la clínica boliviana mides la fiebre en grados Celsius (°C), los equipos
        importados suelen mostrar grados Fahrenheit (°F) y las leyes físicas
        usan la escala absoluta kelvin (K).
      </Puente>

      <Definicion termino="Conversión puntual, escalas arbitrarias e intervalos">
        <Parrafo>
          Tomando fusión (<MathText>{"$0\\text{ °C}$"}</MathText>) y ebullición
          (<MathText>{"$100\\text{ °C}$"}</MathText>) del agua a{" "}
          <MathText>{"$1\\text{ atm}$"}</MathText>, todas las escalas lineales
          cumplen la misma proporción de segmentos:
        </Parrafo>
        <MathText block>
          {"$$\\dfrac{C}{5} = \\dfrac{F - 32}{9} = \\dfrac{K - 273}{5}$$"}
        </MathText>
        <Parrafo>
          (En exámenes se usa <MathText>{"$273$"}</MathText> como valor estándar;
          en laboratorio preciso, <MathText>{"$273{,}15$"}</MathText>.)
        </Parrafo>
        <Parrafo>
          Para una <strong>escala arbitraria</strong> <MathText>{"$X$"}</MathText>{" "}
          con punto de fusión <MathText>{"$X_f$"}</MathText> y de ebullición{" "}
          <MathText>{"$X_e$"}</MathText>:
        </Parrafo>
        <MathText block>
          {"$$\\dfrac{X - X_f}{X_e - X_f} = \\dfrac{C - 0}{100 - 0}$$"}
        </MathText>
        <Parrafo>
          Para <strong>variaciones de temperatura</strong> (
          <MathText>{"$\\Delta T$"}</MathText>):{" "}
          <MathText>{"$\\Delta K = \\Delta C$"}</MathText> y{" "}
          <MathText>{"$\\Delta F = \\dfrac{9}{5}\\,\\Delta C = 1{,}8\\,\\Delta C$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        Entre el hielo fundente y el agua hirviendo, tanto °C como K dividen el
        recorrido en <strong>100</strong> partes iguales, mientras que °F lo
        divide en <MathText>{"$212 - 32 = 180$"}</MathText> partes. Por eso la
        razón de tamaño de grado es{" "}
        <MathText>{"$\\dfrac{180}{100} = \\dfrac{9}{5} = 1{,}8$"}</MathText>.
      </PorQue>

      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { label: "Hielo (0 °C)", val: 0 },
          { label: "Ambiente (25 °C)", val: 25 },
          { label: "Cuerpo (37 °C)", val: 37 },
          { label: "Ebullición (100 °C)", val: 100 },
        ].map((b) => (
          <button
            key={b.val}
            type="button"
            onClick={() => setPresetC(b.val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
              presetC === b.val
                ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                : "bg-[var(--bg-elevated)] text-[var(--fg-secondary)] border-[var(--border)] hover:border-[var(--border-hover)]"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <FigEscalasTermometricas fraccion={fraccion} tempC={presetC} />

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F4 (Pregunta 1) */}
      <WorkedExample titulo="Temperatura corporal en °F y escala arbitraria X">
        <Parrafo>
          <strong>Parte A:</strong> Un termómetro clínico marca{" "}
          <MathText>{"$37{,}0\\text{ °C}$"}</MathText>. Exprésalo en grados
          Fahrenheit.
        </Parrafo>
        <Paso n={1}>
          Despeja <MathText>{"$F$"}</MathText> de la relación lineal:{" "}
          <MathText>{"$F = \\dfrac{9}{5}\\,C + 32$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Multiplica primero:{" "}
          <MathText>{"$\\dfrac{9}{5} \\times 37{,}0 = 1{,}8 \\times 37{,}0 = 66{,}6$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Suma el cero de Fahrenheit:{" "}
          <MathText>{"$F = 66{,}6 + 32 = 98{,}6\\text{ °F}$"}</MathText>.
        </Paso>
        <Parrafo>
          <strong>Parte B:</strong> Una escala arbitraria{" "}
          <MathText>{"$X$"}</MathText> marca{" "}
          <MathText>{"$10\\text{ °X}$"}</MathText> en hielo fundente y{" "}
          <MathText>{"$170\\text{ °X}$"}</MathText> en ebullición. ¿Qué marca a{" "}
          <MathText>{"$25\\text{ °C}$"}</MathText>?
        </Parrafo>
        <Paso n={4}>
          Plantea la proporción:{" "}
          <MathText>{"$\\dfrac{X - 10}{170 - 10} = \\dfrac{25}{100}$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Simplifica:{" "}
          <MathText>{"$\\dfrac{X - 10}{160} = \\dfrac{1}{4}$"}</MathText>, luego{" "}
          <MathText>{"$X - 10 = \\dfrac{160}{4} = 40$"}</MathText>.
        </Paso>
        <Paso n={6}>
          Despeja: <MathText>{"$X = 40 + 10 = 50\\text{ °X}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Cuando el problema pide una <strong>variación</strong> (<MathText>{"$\\Delta T$"}</MathText>,
        «sube en», «baja en»), <strong>nunca sumes 32 ni 273</strong>. El
        desplazamiento del origen se cancela al restar dos temperaturas.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F4 (Pregunta 2) */}
      <AutoCheck
        pregunta="La temperatura de un paciente sube en ΔT = 2,5 °C. ¿A cuánto equivale ese incremento en kelvin (K) y en grados Fahrenheit (°F)?"
        opciones={[
          "2,5 K y 4,5 °F",
          "275,5 K y 36,5 °F",
          "2,5 K y 36,5 °F",
          "275,5 K y 4,5 °F",
        ]}
        correctaIdx={0}
        explicacion="Los intervalos en Celsius y kelvin valen igual: ΔK = ΔC = 2,5 K. En Fahrenheit, cada °C equivale a 9/5 = 1,8 °F: ΔF = 1,8 × 2,5 = 4,5 °F (sin sumar 32 ni 273)."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 3 · Dilatación térmica
// ─────────────────────────────────────────────────────────────────────────────

function EscDilatacion() {
  const [deltaT, setDeltaT] = useState<number>(25);

  return (
    <EscenaRica>
      <Titulo accent="dilatación">Dilatación térmica</Titulo>

      <Hook>
        Entre dos rieles consecutivos de tren o en los puentes metálicos siempre
        se deja un pequeño espacio libre. Si los soldaran sin junta, el calor del
        verano arquearía las vigas.
      </Hook>

      <Definicion termino="Dilatación lineal, superficial y volumétrica">
        <Parrafo>
          Al cambiar la temperatura en <MathText>{"$\\Delta T$"}</MathText>, las
          dimensiones de un sólido homogéneo varían proporcionalmente a su tamaño
          inicial:
        </Parrafo>
        <MathText block>
          {"$$\\Delta L = L_0\\,\\alpha\\,\\Delta T \\qquad \\Delta A = A_0\\,\\beta\\,\\Delta T \\qquad \\Delta V = V_0\\,\\gamma\\,\\Delta T$$"}
        </MathText>
        <Parrafo>
          Para materiales isótropos (que se dilatan igual en todas las
          direcciones),{" "}
          <MathText>{"$\\beta \\approx 2\\alpha$"}</MathText> y{" "}
          <MathText>{"$\\gamma \\approx 3\\alpha$"}</MathText>. Si un líquido está
          contenido en un recipiente sólido, la dilatación aparente que rebalsa
          usa <MathText>{"$\\gamma_{\\text{ap}} = \\gamma_{\\text{líq}} - \\gamma_{\\text{rec}}$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        Al calentarse, los átomos vibran con mayor amplitud. Como la fuerza que
        impide que dos átomos choquen es más rígida que la que los atrae, su
        distancia promedio crece en cada eje espacial: una vez por cada
        dimensión (<MathText>{"$1\\alpha$"}</MathText> en longitud,{" "}
        <MathText>{"$2\\alpha$"}</MathText> en área y{" "}
        <MathText>{"$3\\alpha$"}</MathText> en volumen).
      </PorQue>

      <div className="flex flex-col gap-2 items-center">
        <label
          htmlFor="slider-deltat"
          className="text-xs text-[var(--fg-secondary)] font-medium"
        >
          Prueba variar el calentamiento:{" "}
          <span className="text-[var(--accent)] font-bold">
            ΔT = {deltaT} °C
          </span>
        </label>
        <input
          id="slider-deltat"
          type="range"
          min={0}
          max={100}
          step={5}
          value={deltaT}
          onChange={(e) => setDeltaT(Number(e.target.value))}
          className="w-full max-w-[320px] accent-[var(--accent)] cursor-pointer"
        />
      </div>

      <FigDilatacion deltaT={deltaT} />

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F4 (Pregunta 3) */}
      <WorkedExample titulo="Alargamiento de una viga de acero">
        <Parrafo>
          Una barra de acero de longitud inicial{" "}
          <MathText>{"$L_0 = 10\\text{ m}$"}</MathText> (
          <MathText>{"$\\alpha = 1{,}2 \\times 10^{-5}\\text{ °C}^{-1}$"}</MathText>)
          pasa de <MathText>{"$15\\text{ °C}$"}</MathText> a{" "}
          <MathText>{"$40\\text{ °C}$"}</MathText>. Calcula su dilatación{" "}
          <MathText>{"$\\Delta L$"}</MathText> en milímetros.
        </Parrafo>
        <Paso n={1}>
          Calcula la variación de temperatura:{" "}
          <MathText>{"$\\Delta T = 40 - 15 = 25\\text{ °C}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Sustituye en <MathText>{"$\\Delta L = L_0\\,\\alpha\\,\\Delta T$"}</MathText>:{" "}
          <MathText>{"$\\Delta L = 10 \\times (1{,}2 \\times 10^{-5}) \\times 25$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Opera los factores:{" "}
          <MathText>{"$10 \\times 25 = 250$"}</MathText>, y{" "}
          <MathText>{"$250 \\times 1{,}2 = 300$"}</MathText>, entonces{" "}
          <MathText>{"$\\Delta L = 300 \\times 10^{-5}\\text{ m} = 3{,}0 \\times 10^{-3}\\text{ m}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Convierte a milímetros (<MathText>{"$1\\text{ m} = 1000\\text{ mm}$"}</MathText>):{" "}
          <MathText>{"$\\Delta L = 3{,}0 \\times 10^{-3} \\times 1000 = 3{,}0\\text{ mm}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Dos trampas habituales: olvidar multiplicar <MathText>{"$\\alpha$"}</MathText>{" "}
        por <MathText>{"$2$"}</MathText> en láminas (superficial) o por{" "}
        <MathText>{"$3$"}</MathText> en bloques (volumétrica), y pensar que un
        orificio en una chapa metálica se achica al calentarse. En realidad, un
        hueco se dilata exactamente igual que si estuviera relleno del mismo
        material.
      </Cuidado>

      <AutoCheck
        pregunta="Una lámina cuadrada de aluminio tiene un área inicial de 2,0 m² y un coeficiente lineal α = 2,4 × 10⁻⁵ °C⁻¹. Si su temperatura aumenta en ΔT = 50 °C, ¿cuánto aumenta su área (ΔA)?"
        opciones={[
          "2,4 × 10⁻³ m²",
          "4,8 × 10⁻³ m²",
          "7,2 × 10⁻³ m²",
          "4,8 × 10⁻⁴ m²",
        ]}
        correctaIdx={1}
        explicacion="Para área se usa β = 2α = 4,8 × 10⁻⁵ °C⁻¹. Entonces ΔA = A₀ · β · ΔT = 2,0 × 4,8 × 10⁻⁵ × 50 = 100 × 4,8 × 10⁻⁵ = 4,8 × 10⁻³ m²."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 4 · Calor específico
// ─────────────────────────────────────────────────────────────────────────────

function EscCalorEspecifico() {
  return (
    <EscenaRica>
      <Titulo accent="Q = m c ΔT">Calor específico</Titulo>

      <Hook>
        Pones al sol un litro de agua y un bloque de hierro de 1 kg. En cinco
        minutos el metal quema, mientras el agua apenas se entibia. ¿Por qué
        necesitan cantidades tan distintas de calor para subir 1 °C?
      </Hook>

      <Definicion termino="Calor sensible y calor específico (c)">
        <Parrafo>
          Cuando un cuerpo de masa <MathText>{"$m$"}</MathText> cambia su
          temperatura sin cambiar de estado, el calor absorbido o cedido es:
        </Parrafo>
        <MathText block>{"$$Q = m\\,c\\,\\Delta T$$"}</MathText>
        <Parrafo>
          El <strong>calor específico (<MathText>{"$c$"}</MathText>)</strong> es la
          energía necesaria para elevar <MathText>{"$1\\text{ °C}$"}</MathText> la
          temperatura de una unidad de masa. Para el agua líquida:{" "}
          <MathText>{"$c_{\\text{agua}} = 1{,}00\\text{ cal/(g}\\cdot\\text{°C)} = 4184\\text{ J/(kg}\\cdot\\text{°C)}$"}</MathText>{" "}
          (<MathText>{"$1\\text{ cal} = 4{,}184\\text{ J}$"}</MathText>). La{" "}
          <strong>capacidad calorífica</strong> del cuerpo completo es{" "}
          <MathText>{"$C = m\\,c$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        El agua tiene un calor específico altísimo porque buena parte de la energía
        que recibe se gasta en tensionar puentes de hidrógeno antes de acelerar sus
        moléculas. En fisiología humana, como cerca del 60 % de tu masa corporal
        es agua, tu organismo resiste cambios bruscos de temperatura ambiental.
      </PorQue>

      <FigCalorEspecifico />

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F4 (Pregunta 4) */}
      <WorkedExample titulo="Calentar agua en el laboratorio">
        <Parrafo>
          ¿Cuánto calor (en kcal y en kJ) se necesita para calentar{" "}
          <MathText>{"$500\\text{ g}$"}</MathText> de agua desde{" "}
          <MathText>{"$20\\text{ °C}$"}</MathText> hasta{" "}
          <MathText>{"$80\\text{ °C}$"}</MathText>? (Usa{" "}
          <MathText>{"$c_{\\text{agua}} = 1{,}0\\text{ cal/(g}\\cdot\\text{°C)}$"}</MathText>{" "}
          y <MathText>{"$1\\text{ cal} = 4{,}184\\text{ J}$"}</MathText>.)
        </Parrafo>
        <Paso n={1}>
          Calcula la variación térmica:{" "}
          <MathText>{"$\\Delta T = 80 - 20 = 60\\text{ °C}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Aplica <MathText>{"$Q = m\\,c\\,\\Delta T$"}</MathText>:{" "}
          <MathText>{"$Q = 500 \\times 1{,}0 \\times 60 = 30\\,000\\text{ cal}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Divide por <MathText>{"$1000$"}</MathText> para pasar a kilocalorías:{" "}
          <MathText>{"$Q = \\dfrac{30\\,000}{1000} = 30\\text{ kcal}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Convierte a kilojoules:{" "}
          <MathText>{"$Q = 30 \\times 4{,}184 = 125{,}52\\text{ kJ}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Cuida siempre la compatibilidad entre <MathText>{"$m$"}</MathText> y{" "}
        <MathText>{"$c$"}</MathText>: si usas{" "}
        <MathText>{"$c$"}</MathText> en{" "}
        <MathText>{"$\\text{cal/(g}\\cdot\\text{°C)}$"}</MathText>, la masa debe ir
        en <strong>gramos</strong>; si usas{" "}
        <MathText>{"$\\text{J/(kg}\\cdot\\text{°C)}$"}</MathText>, la masa debe ir
        en <strong>kilogramos</strong>.
      </Cuidado>

      <AutoCheck
        pregunta="Un bloque de aluminio de 500 g inicialmente a 25 °C absorbe 2200 cal (c_Al = 0,22 cal/(g·°C)). ¿Cuál es su temperatura final?"
        opciones={["20 °C", "35 °C", "45 °C", "65 °C"]}
        correctaIdx={2}
        explicacion="Primero despejas ΔT = Q / (m · c) = 2200 / (500 × 0,22) = 2200 / 110 = 20 °C. Luego sumas a la temperatura inicial: T_f = 25 + 20 = 45 °C."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 5 · Cambios de estado y calor latente
// ─────────────────────────────────────────────────────────────────────────────

function EscCambiosEstado() {
  return (
    <EscenaRica>
      <Titulo accent="calor latente">Cambios de estado</Titulo>

      <Puente>
        Si calientas agua con hielo mientras revuelves, el termómetro queda
        clavado en 0 °C hasta que se derrite el último trozo de hielo. ¿A dónde
        va la energía si la temperatura no sube?
      </Puente>

      <Definicion termino="Calor latente (L)">
        <Parrafo>
          Durante un cambio de fase a presión constante (<MathText>{"$1\\text{ atm}$"}</MathText>),
          la temperatura permanece constante y el calor absorbido o liberado es:
        </Parrafo>
        <MathText block>{"$$Q = m\\,L$$"}</MathText>
        <Parrafo>
          Constantes del agua a <MathText>{"$1\\text{ atm}$"}</MathText>: calor
          latente de fusión{" "}
          <MathText>{"$L_f = 80\\text{ cal/g} = 80\\text{ kcal/kg}$"}</MathText>,
          calor latente de vaporización{" "}
          <MathText>{"$L_v = 540\\text{ cal/g} = 540\\text{ kcal/kg}$"}</MathText>.
          Sus calores específicos son{" "}
          <MathText>{"$c_{\\text{hielo}} = 0{,}5$"}</MathText>,{" "}
          <MathText>{"$c_{\\text{agua}} = 1{,}0$"}</MathText> y{" "}
          <MathText>{"$c_{\\text{vapor}} = 0{,}5\\text{ cal/(g}\\cdot\\text{°C)}$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        La energía entregada en una meseta de cambio de estado no aumenta la
        rapidez media de las moléculas (por eso <MathText>{"$T$"}</MathText> no
        cambia), sino que rompe los enlaces que las mantienen rígidas en el sólido
        o cohesionadas en el líquido. Por eso evaporar 1 g de sudor en tu piel
        absorbe <MathText>{"$540\\text{ cal}$"}</MathText>, enfriándote con gran
        eficacia.
      </PorQue>

      <FigCurvaCalentamiento />

      {/* basado en: data/examenes/umss/ingenieria/2006-parcial4-1-2006.md (Pregunta 17) */}
      <WorkedExample titulo="Hielo a −20 °C hasta vapor a 110 °C">
        <Parrafo>
          Calcula el calor total en <MathText>{"$\\text{kcal}$"}</MathText> para
          convertir <MathText>{"$10\\text{ kg}$"}</MathText> de hielo a{" "}
          <MathText>{"$-20\\text{ °C}$"}</MathText> en vapor a{" "}
          <MathText>{"$110\\text{ °C}$"}</MathText> a <MathText>{"$1\\text{ atm}$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Calentar hielo de <MathText>{"$-20\\text{ °C}$"}</MathText> a{" "}
          <MathText>{"$0\\text{ °C}$"}</MathText>:{" "}
          <MathText>{"$Q_1 = 10 \\times 0{,}5 \\times (0 - (-20)) = 100\\text{ kcal}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Fundir hielo a <MathText>{"$0\\text{ °C}$"}</MathText>:{" "}
          <MathText>{"$Q_2 = 10 \\times 80 = 800\\text{ kcal}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Calentar agua líquida de <MathText>{"$0\\text{ °C}$"}</MathText> a{" "}
          <MathText>{"$100\\text{ °C}$"}</MathText>:{" "}
          <MathText>{"$Q_3 = 10 \\times 1{,}0 \\times (100 - 0) = 1000\\text{ kcal}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Vaporizar agua a <MathText>{"$100\\text{ °C}$"}</MathText>:{" "}
          <MathText>{"$Q_4 = 10 \\times 540 = 5400\\text{ kcal}$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Calentar vapor de <MathText>{"$100\\text{ °C}$"}</MathText> a{" "}
          <MathText>{"$110\\text{ °C}$"}</MathText>:{" "}
          <MathText>{"$Q_5 = 10 \\times 0{,}5 \\times (110 - 100) = 50\\text{ kcal}$"}</MathText>.
        </Paso>
        <Paso n={6}>
          Suma total:{" "}
          <MathText>{"$Q_{\\text{total}} = 100 + 800 + 1000 + 5400 + 50 = 7350\\text{ kcal}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        No uses <MathText>{"$c = 1{,}0\\text{ cal/(g}\\cdot\\text{°C)}$"}</MathText>{" "}
        para el hielo ni para el vapor: ambos valen{" "}
        <MathText>{"$0{,}5\\text{ cal/(g}\\cdot\\text{°C)}$"}</MathText>. Y si el
        calentamiento cruza <MathText>{"$0\\text{ °C}$"}</MathText> o{" "}
        <MathText>{"$100\\text{ °C}$"}</MathText>, divide el cálculo en tramos
        separados.
      </Cuidado>

      {/* basado en: data/examenes/umss/ingenieria/2006-parcial4-1-2006.md (Pregunta 15) */}
      <AutoCheck
        pregunta="¿Cuántas calorías se necesitan para transformar 56 g de hielo a 0 °C en agua líquida a 75 °C? (L_f = 80 cal/g, c_agua = 1 cal/(g·°C))"
        opciones={["4200 cal", "4480 cal", "6440 cal", "8680 cal"]}
        correctaIdx={3}
        explicacion="Primero fundes el hielo a 0 °C: Q₁ = 56 × 80 = 4480 cal. Después calientas esa agua de 0 °C a 75 °C: Q₂ = 56 × 1 × 75 = 4200 cal. Total: 4480 + 4200 = 8680 cal."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 6 · Equilibrio térmico y mezclas (agua con hielo)
// ─────────────────────────────────────────────────────────────────────────────

function EscEquilibrio() {
  return (
    <EscenaRica>
      <Titulo accent="equilibrio térmico">Equilibrio térmico</Titulo>

      <Puente>
        Si viertes agua hirviendo en una jarra con agua fría dentro de un termo
        cerrado, el conjunto termina estabilizándose en una única temperatura
        intermedia.
      </Puente>

      <Definicion termino="Conservación de energía en mezclas">
        <Parrafo>
          En un calorímetro térmicamente aislado, la suma algebraica de calores
          intercambiados es nula:
        </Parrafo>
        <MathText block>
          {"$$\\sum Q = Q_{\\text{ganado}} + Q_{\\text{perdido}} = 0$$"}
        </MathText>
        <Parrafo>
          Si no hay cambios de fase, para dos cuerpos que llegan a una temperatura
          final <MathText>{"$T_e$"}</MathText>:{" "}
          <MathText>{"$m_1 c_1 (T_e - T_1) + m_2 c_2 (T_e - T_2) = 0$"}</MathText>.
          Si interviene hielo, primero debes comprobar si el agua caliente alcanza
          a fundirlo por completo antes de plantear <MathText>{"$T_e$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        Al respetar el signo de{" "}
        <MathText>{"$\\Delta T = T_{\\text{final}} - T_{\\text{inicial}}$"}</MathText>,
        el cuerpo que se calienta tiene <MathText>{"$Q > 0$"}</MathText> y el que
        se enfría tiene <MathText>{"$Q < 0$"}</MathText>. Como el termo no pierde
        energía hacia afuera, ambos calores se compensan exactamente al sumar cero.
      </PorQue>

      <FigEquilibrioMezcla />

      {/* basado en: data/examenes/umss/ingenieria/2006-parcial4-1-2006.md (Pregunta 21) */}
      <WorkedExample titulo="Mezcla de hielo con agua caliente">
        <Parrafo>
          Se mezclan <MathText>{"$15\\text{ g}$"}</MathText> de hielo a{" "}
          <MathText>{"$0\\text{ °C}$"}</MathText> con{" "}
          <MathText>{"$30\\text{ g}$"}</MathText> de agua a{" "}
          <MathText>{"$50\\text{ °C}$"}</MathText> en un recipiente aislado.
          Calcula la temperatura final de equilibrio <MathText>{"$T_e$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Comprueba primero si todo el hielo se funde. Fundir{" "}
          <MathText>{"$15\\text{ g}$"}</MathText> exige{" "}
          <MathText>{"$Q_{\\text{fusión}} = 15 \\times 80 = 1200\\text{ cal}$"}</MathText>.
          El agua a <MathText>{"$50\\text{ °C}$"}</MathText> puede ceder hasta{" "}
          <MathText>{"$Q_{\\text{disp}} = 30 \\times 1 \\times (50 - 0) = 1500\\text{ cal}$"}</MathText>.
          Como <MathText>{"$1500 > 1200$"}</MathText>, todo el hielo se derrite.
        </Paso>
        <Paso n={2}>
          Plantea <MathText>{"$\\sum Q = 0$"}</MathText>: el hielo funde y sube a{" "}
          <MathText>{"$T_e$"}</MathText>, mientras el agua baja de{" "}
          <MathText>{"$50\\text{ °C}$"}</MathText> a <MathText>{"$T_e$"}</MathText>:{" "}
          <MathText>{"$15 \\times 80 + 15 \\times 1 \\times (T_e - 0) + 30 \\times 1 \\times (T_e - 50) = 0$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Desarrolla y agrupa:{" "}
          <MathText>{"$1200 + 15\\,T_e + 30\\,T_e - 1500 = 0$"}</MathText>{" "}
          <MathText>{"$\\Rightarrow 45\\,T_e - 300 = 0$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Despeja: <MathText>{"$T_e = \\dfrac{300}{45} = \\dfrac{20}{3} \\approx 6{,}7\\text{ °C}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Si en el Paso 1 obtuvieras <MathText>{"$Q_{\\text{disp}} < Q_{\\text{fusión}}$"}</MathText>,
        no fuerces la ecuación lineal porque te daría una temperatura absurda bajo
        cero. En ese caso el hielo no alcanza a derretirse del todo y la mezcla
        queda en <MathText>{"$T_e = 0\\text{ °C}$"}</MathText>.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F4 (Pregunta 5) */}
      <AutoCheck
        pregunta="Se mezclan 200 g de agua a 80 °C con 300 g de agua a 30 °C en un recipiente térmicamente aislado. ¿Cuál es la temperatura final de equilibrio?"
        opciones={["55 °C", "50 °C", "45 °C", "60 °C"]}
        correctaIdx={1}
        explicacion="Aplicas 200·(T_e − 80) + 300·(T_e − 30) = 0 → 500·T_e = 16 000 + 9000 = 25 000 → T_e = 50 °C. Al haber más masa de agua fría, T_e queda más cerca de 30 °C."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 7 · Propagación del calor
// ─────────────────────────────────────────────────────────────────────────────

function EscPropagacion() {
  return (
    <EscenaRica>
      <Titulo accent="propagación">Propagación del calor</Titulo>

      <Hook>
        El Sol calienta la Tierra atravesando millones de kilómetros de vacío, el
        aire tibio de una estufa sube hacia el techo, y el mango metálico de una
        cuchara dejada en la sopa se calienta aunque nunca tocó el caldo.
      </Hook>

      <Definicion termino="Conducción, convección y radiación">
        <Parrafo>
          <strong>Conducción:</strong> transferencia por choques microscópicos sin
          desplazamiento neto de materia (típica de sólidos). Su potencia térmica
          es la ley de Fourier:
        </Parrafo>
        <MathText block>
          {"$$\\mathcal{P} = \\dfrac{Q}{t} = \\dfrac{k\\,A\\,\\Delta T}{d}$$"}
        </MathText>
        <Parrafo>
          donde <MathText>{"$k$"}</MathText> es la conductividad térmica del
          material, <MathText>{"$A$"}</MathText> el área transversal,{" "}
          <MathText>{"$d$"}</MathText> el espesor y{" "}
          <MathText>{"$\\Delta T$"}</MathText> la diferencia de temperatura.
        </Parrafo>
        <Parrafo>
          <strong>Convección:</strong> transporte de energía por movimiento real de
          un fluido (líquido o gas) debido a diferencias de densidad o bombeo
          forzado (como la circulación sanguínea regulando la temperatura
          corporal).
        </Parrafo>
        <Parrafo>
          <strong>Radiación:</strong> emisión de ondas electromagnéticas; es el
          único mecanismo que funciona en el vacío. Según la ley de
          Stefan-Boltzmann:{" "}
          <MathText>{"$\\mathcal{P} = \\varepsilon\\,\\sigma\\,A\\,T^4$"}</MathText>,
          con <MathText>{"$T$"}</MathText> en <strong>kelvin</strong>, donde{" "}
          <MathText>{"$\\varepsilon$"}</MathText> es la emisividad de la
          superficie (<MathText>{"$0 \\le \\varepsilon \\le 1$"}</MathText>) y{" "}
          <MathText>{"$\\sigma$"}</MathText> la constante de Stefan-Boltzmann.
        </Parrafo>
      </Definicion>

      <PorQue>
        Un termo clínico conserva la temperatura atacando los tres mecanismos a
        la vez: usa doble pared con vacío interno para frenar la conducción y la
        convección, y recubre el vidrio con plata espejo para reflejar la
        radiación infrarroja.
      </PorQue>

      <FigPropagacion />

      <WorkedExample titulo="Pérdida de calor por conducción en una ventana">
        <Parrafo>
          Una ventana de vidrio de área <MathText>{"$A = 1{,}5\\text{ m}^2$"}</MathText>{" "}
          y espesor <MathText>{"$d = 5{,}0\\text{ mm}$"}</MathText> (conductividad{" "}
          <MathText>{"$k = 0{,}80\\text{ W/(m}\\cdot\\text{°C)}$"}</MathText>)
          separa un consultorio a <MathText>{"$22\\text{ °C}$"}</MathText> del
          exterior a <MathText>{"$7\\text{ °C}$"}</MathText>. Calcula la potencia
          térmica transmitida por conducción.
        </Parrafo>
        <Paso n={1}>
          Calcula la diferencia térmica:{" "}
          <MathText>{"$\\Delta T = 22 - 7 = 15\\text{ °C}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Convierte el espesor a metros:{" "}
          <MathText>{"$d = 5{,}0\\text{ mm} = 0{,}0050\\text{ m}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Sustituye en la ley de Fourier:{" "}
          <MathText>{"$\\mathcal{P} = \\dfrac{0{,}80 \\times 1{,}5 \\times 15}{0{,}0050}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Calcula el numerador:{" "}
          <MathText>{"$0{,}80 \\times 1{,}5 = 1{,}2$"}</MathText>, y{" "}
          <MathText>{"$1{,}2 \\times 15 = 18$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Divide por el espesor:{" "}
          <MathText>{"$\\mathcal{P} = \\dfrac{18}{0{,}0050} = 3600\\text{ W} = 3{,}6\\text{ kW}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        En la ley de radiación (<MathText>{"$\\mathcal{P} \\propto T^4$"}</MathText>),{" "}
        <MathText>{"$T$"}</MathText> <strong>siempre</strong> debe ir en kelvin.
        Si un cuerpo pasa de <MathText>{"$20\\text{ °C}$"}</MathText> a{" "}
        <MathText>{"$40\\text{ °C}$"}</MathText>, su radiación no se multiplica
        por <MathText>{"$2^4 = 16$"}</MathText>, porque en escala absoluta pasa de{" "}
        <MathText>{"$293\\text{ K}$"}</MathText> a{" "}
        <MathText>{"$313\\text{ K}$"}</MathText>.
      </Cuidado>

      <AutoCheck
        pregunta="Dentro de una cámara al vacío hay dos esferas separadas que no se tocan: una a 400 K y otra a 300 K. ¿Por qué mecanismo principal se transfiere calor entre ellas?"
        opciones={[
          "Conducción",
          "Convección",
          "Radiación",
          "Dilatación térmica",
        ]}
        correctaIdx={2}
        explicacion="Sin contacto sólido no hay conducción, y sin fluido en el recinto tampoco hay convección. La radiación electromagnética es la única vía que atraviesa el vacío."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 8 · Errores y práctica
// ─────────────────────────────────────────────────────────────────────────────

interface EjercicioPractica {
  q: string;
  o: string[];
  c: number;
  exp: string;
}

function EscErroresYPractica() {
  const [actual, setActual] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [hechos, setHechos] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const preguntas: EjercicioPractica[] = [
    // basado en: data/examenes/umss/ingenieria/2006-parcial4-2-2006.md (Pregunta 15)
    {
      q: "1. Se sumerge una pieza de hierro de $1{,}22\\text{ kg}$ a $126{,}5\\text{ °C}$ en $981\\text{ g}$ de agua a $22{,}1\\text{ °C}$, alcanzando el equilibrio a $34{,}4\\text{ °C}$. Con $c_{\\text{agua}} = 4{,}184\\text{ J/(g}\\cdot\\text{°C)}$, ¿cuál es el calor específico del hierro?",
      o: [
        "$0{,}385\\text{ J/(g}\\cdot\\text{°C)}$",
        "$0{,}450\\text{ J/(g}\\cdot\\text{°C)}$",
        "$0{,}903\\text{ J/(g}\\cdot\\text{°C)}$",
        "$1{,}00\\text{ J/(g}\\cdot\\text{°C)}$",
      ],
      c: 1,
      exp: "Calor ganado por el agua: $Q = 981 \\times 4{,}184 \\times (34{,}4 - 22{,}1) \\approx 50\\,485\\text{ J}$. Igualando al perdido por el hierro ($1220\\text{ g}$): $c_{\\text{Fe}} = 50\\,485 / (1220 \\times 92{,}1) \\approx 0{,}450\\text{ J/(g}\\cdot\\text{°C)}$.",
    },
    {
      q: "2. En una escala termométrica $Y$, el agua congela a $20\\text{ °Y}$ y hierve a $140\\text{ °Y}$. ¿Qué temperatura en °C corresponde a $80\\text{ °Y}$?",
      o: [
        "$40\\text{ °C}$",
        "$45\\text{ °C}$",
        "$50\\text{ °C}$",
        "$60\\text{ °C}$",
      ],
      c: 2,
      exp: "Por proporción lineal: $\\dfrac{C}{100} = \\dfrac{80 - 20}{140 - 20} = \\dfrac{60}{120} = \\dfrac{1}{2}$, entonces $C = 50\\text{ °C}$.",
    },
    {
      q: "3. Un cubo sólido de cobre de volumen inicial $V_0 = 1000\\text{ cm}^3$ ($\\alpha = 1{,}7 \\times 10^{-5}\\text{ °C}^{-1}$) se calienta en $\\Delta T = 100\\text{ °C}$. ¿Cuánto aumenta su volumen $\\Delta V$?",
      o: [
        "$5{,}1\\text{ cm}^3$",
        "$1{,}7\\text{ cm}^3$",
        "$3{,}4\\text{ cm}^3$",
        "$51\\text{ cm}^3$",
      ],
      c: 0,
      exp: "Para dilatación volumétrica usas $\\gamma = 3\\alpha = 5{,}1 \\times 10^{-5}\\text{ °C}^{-1}$. Luego $\\Delta V = 1000 \\times 5{,}1 \\times 10^{-5} \\times 100 = 5{,}1\\text{ cm}^3$.",
    },
    {
      q: "4. Se mezclan $100\\text{ g}$ de hielo a $0\\text{ °C}$ con $100\\text{ g}$ de agua a $40\\text{ °C}$ en un calorímetro ideal ($L_f = 80\\text{ cal/g}$, $c_{\\text{agua}} = 1\\text{ cal/(g}\\cdot\\text{°C)}$). ¿Qué estado alcanza el sistema?",
      o: [
        "$20\\text{ °C}$ sin hielo",
        "$10\\text{ °C}$ y quedan $25\\text{ g}$ de hielo",
        "$0\\text{ °C}$ y se funde todo el hielo",
        "$0\\text{ °C}$ y quedan $50\\text{ g}$ de hielo",
      ],
      c: 3,
      exp: "El agua caliente al enfriarse hasta $0\\text{ °C}$ cede como máximo $Q_{\\text{disp}} = 100 \\times 1 \\times 40 = 4000\\text{ cal}$. Fundir todo el hielo exigiría $100 \\times 80 = 8000\\text{ cal}$. Solo se funden $4000 / 80 = 50\\text{ g}$, quedando $50\\text{ g}$ de hielo a $0\\text{ °C}$.",
    },
    // basado en: data/examenes/umss/ingenieria/2006-parcial4-1-2006.md (Pregunta 18, adaptado)
    {
      q: "5. Un recipiente de acero de $500\\text{ kg}$ ($c_{\\text{acero}} = 0{,}12\\text{ kcal/(kg}\\cdot\\text{°C)}$) contiene $290\\text{ kg}$ de agua a $10\\text{ °C}$. Si se calientan juntos hasta $100\\text{ °C}$ con un quemador del $70\\text{ \\%}$ de rendimiento térmico, ¿cuántas $\\text{kcal}$ debe entregar el quemador?",
      o: [
        "$31\\,500\\text{ kcal}$",
        "$22\\,050\\text{ kcal}$",
        "$45\\,000\\text{ kcal}$",
        "$63\\,000\\text{ kcal}$",
      ],
      c: 2,
      exp: "Calor útil: $Q_{\\text{acero}} = 500 \\times 0{,}12 \\times 90 = 5400\\text{ kcal}$ y $Q_{\\text{agua}} = 290 \\times 1 \\times 90 = 26\\,100\\text{ kcal}$, sumando $31\\,500\\text{ kcal}$. Con $70\\text{ \\%}$ de rendimiento: $Q_{\\text{entregado}} = 31\\,500 / 0{,}70 = 45\\,000\\text{ kcal}$.",
    },
  ];

  const p = preguntas[actual];

  const seleccionar = (i: number) => {
    if (elegida !== null) return;
    setElegida(i);
    if (!hechos[actual]) {
      const next = [...hechos];
      next[actual] = true;
      setHechos(next);
      if (i === p.c) setAciertos((a) => a + 1);
    }
  };

  const cambiarPregunta = (idx: number) => {
    setActual(idx);
    setElegida(null);
  };

  return (
    <EscenaRica>
      <Titulo accent="práctica">Errores y práctica</Titulo>

      <Misconception titulo="Confundir T con ΔT en Fahrenheit y Kelvin">
        <Parrafo>
          Una temperatura puntual de <MathText>{"$10\\text{ °C}$"}</MathText>{" "}
          equivale a <MathText>{"$283\\text{ K}$"}</MathText>, pero una{" "}
          <strong>variación</strong> de <MathText>{"$\\Delta T = 10\\text{ °C}$"}</MathText>{" "}
          equivale a <MathText>{"$10\\text{ K}$"}</MathText> y a{" "}
          <MathText>{"$18\\text{ °F}$"}</MathText>. Nunca sumes{" "}
          <MathText>{"$273$"}</MathText> ni <MathText>{"$32$"}</MathText> a un{" "}
          <MathText>{"$\\Delta T$"}</MathText>.
        </Parrafo>
      </Misconception>

      <Misconception titulo="Creer que agregar calor siempre sube la temperatura">
        <Parrafo>
          Mientras ocurre una fusión o una vaporización a presión constante, todo
          el calor recibido rompe enlaces moleculares (<MathText>{"$Q = mL$"}</MathText>)
          y la temperatura permanece fija en <MathText>{"$0\\text{ °C}$"}</MathText>{" "}
          o <MathText>{"$100\\text{ °C}$"}</MathText>.
        </Parrafo>
      </Misconception>

      <Misconception titulo="Aplicar mezcla lineal sin comprobar si el hielo se funde">
        <Parrafo>
          Antes de despejar <MathText>{"$T_e$"}</MathText> en agua con hielo,
          compara el calor máximo disponible hasta <MathText>{"$0\\text{ °C}$"}</MathText>{" "}
          frente a <MathText>{"$m_{\\text{hielo}} L_f$"}</MathText>. Si no alcanza,
          sobra hielo y <MathText>{"$T_e = 0\\text{ °C}$"}</MathText>.
        </Parrafo>
      </Misconception>

      {/* Selector de ejercicios tipo PSA */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2">
          {preguntas.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => cambiarPregunta(i)}
              className={`w-8 h-8 rounded-full border text-[13px] font-semibold cursor-pointer ${
                i === actual
                  ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                  : hechos[i]
                  ? "bg-[var(--bg-subtle)] text-[var(--green)] border-[var(--green)]"
                  : "bg-[var(--bg-elevated)] text-[var(--fg-secondary)] border-[var(--border)]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="text-xs text-[var(--fg-muted)] font-medium">
          Aciertos: {aciertos} / {preguntas.length}
        </span>
      </div>

      <div className="p-5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl flex flex-col gap-4">
        <div className="text-[16px] text-[var(--fg-primary)] leading-relaxed font-medium min-w-0">
          <MathText>{p.q}</MathText>
        </div>

        <div className="flex flex-col gap-2">
          {p.o.map((op, i) => {
            const esCorrecta = i === p.c;
            const esMia = i === elegida;
            let cls =
              "bg-[var(--bg-base)] border-[var(--border)] text-[var(--fg-primary)]";
            if (elegida !== null) {
              if (esCorrecta)
                cls =
                  "bg-[var(--green-soft)] border-[var(--green)] text-[var(--green)]";
              else if (esMia)
                cls =
                  "bg-[var(--red-soft)] border-[var(--red)] text-[var(--red)]";
              else
                cls =
                  "bg-[var(--bg-base)] border-[var(--border)] text-[var(--fg-muted)]";
            }
            return (
              <button
                key={i}
                type="button"
                onClick={() => seleccionar(i)}
                disabled={elegida !== null}
                className={`text-left px-3.5 py-2.5 rounded-xl border text-[14px] transition-all cursor-pointer min-w-0 ${cls}`}
              >
                <MathText>{op}</MathText>
              </button>
            );
          })}
        </div>

        {elegida !== null && (
          <div className="text-[14px] text-[var(--fg-secondary)] leading-relaxed pt-2 border-t border-[var(--border)] min-w-0">
            <MathText>{p.exp}</MathText>
          </div>
        )}
      </div>

      <Resumen>
        <Parrafo>
          Recuerda las cuatro ecuaciones clave de calorimetría y termometría:{" "}
          <MathText>{"$\\dfrac{C}{5} = \\dfrac{F-32}{9} = \\dfrac{K-273}{5}$"}</MathText>,{" "}
          <MathText>{"$\\Delta L = L_0\\alpha\\Delta T$"}</MathText>,{" "}
          <MathText>{"$Q = m c \\Delta T$"}</MathText> y{" "}
          <MathText>{"$Q = m L$"}</MathText>, siempre con{" "}
          <MathText>{"$\\sum Q = 0$"}</MathText> en mezclas aisladas.
        </Parrafo>
      </Resumen>

      <AutoCheck
        pregunta="Un bloque de hielo de 200 g a 0 °C absorbe calor sobre una hornalla tibia. ¿Qué ocurre mientras todavía queda hielo sin derretirse?"
        opciones={[
          "Su temperatura sube gradualmente hacia 10 °C",
          "Su temperatura se mantiene en 0 °C mientras absorbe 80 cal por cada gramo fundido",
          "No absorbe calor porque la lectura del termómetro no cambia",
          "Su calor específico se vuelve negativo durante la fusión",
        ]}
        correctaIdx={1}
        explicacion="Durante la fusión a presión normal, la temperatura permanece clavada en 0 °C mientras cada gramo absorbe L_f = 80 cal para pasar de sólido a líquido."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Exportación de la lección
// ─────────────────────────────────────────────────────────────────────────────

const ESCENAS: Escena[] = [
  { titulo: "Temperatura vs. calor", componente: EscTemperaturaCalor },
  { titulo: "Escalas termométricas", componente: EscEscalas },
  { titulo: "Dilatación térmica", componente: EscDilatacion },
  { titulo: "Calor específico", componente: EscCalorEspecifico },
  { titulo: "Cambios de estado", componente: EscCambiosEstado },
  { titulo: "Equilibrio térmico", componente: EscEquilibrio },
  { titulo: "Propagación del calor", componente: EscPropagacion },
  { titulo: "Errores y práctica", componente: EscErroresYPractica },
];

export default function PaginaCalorTemperatura() {
  return (
    <LeccionShell
      unidad="FIS-09"
      tituloUnidad="Calor y temperatura"
      escenas={ESCENAS}
    />
  );
}

/* VERIFICACIÓN:
 * Todas las cuentas numéricas de ejemplos, AutoCheck y práctica fueron verificadas paso a paso:
 * 1) Escena 1 WorkedExample: Tp = 39,0 °C, Ta = 21,0 °C -> ΔT = 39,0 - 21,0 = 18,0 °C.
 * 2) Escena 2 WorkedExample A (MFQ §4.2 F4 P1): C = 37,0 °C -> F = (9/5)*37,0 + 32 = 1,8*37,0 + 32 = 66,6 + 32 = 98,6 °F.
 * 3) Escena 2 WorkedExample B (escala arbitraria): Xf = 10, Xe = 170, C = 25 -> (X - 10)/(170 - 10) = 25/100 -> (X - 10)/160 = 1/4 -> X - 10 = 40 -> X = 50 °X.
 * 4) Escena 2 AutoCheck (MFQ §4.2 F4 P2): ΔC = 2,5 °C -> ΔK = 2,5 K; ΔF = (9/5)*2,5 = 4,5 °F.
 * 5) Escena 3 FigDilatacion y WorkedExample (MFQ §4.2 F4 P3): L0 = 10 m, α = 1,2e-5 °C^-1, ΔT = 40 - 15 = 25 °C -> ΔL = 10 * 1,2e-5 * 25 = 300e-5 m = 3,0e-3 m = 3,0 mm.
 * 6) Escena 3 AutoCheck: A0 = 2,0 m², α = 2,4e-5 °C^-1 -> β = 2α = 4,8e-5 °C^-1; ΔT = 50 °C -> ΔA = 2,0 * 4,8e-5 * 50 = 100 * 4,8e-5 = 4,8e-3 m².
 * 7) Escena 4 FigCalorEspecifico (m = 1 kg, ΔT = 10 °C): Agua 4184*10 = 41,84 kJ; Hielo 2090*10 = 20,90 kJ; Aluminio 900*10 = 9,00 kJ; Hierro 450*10 = 4,50 kJ; Cobre 385*10 = 3,85 kJ.
 * 8) Escena 4 WorkedExample (MFQ §4.2 F4 P4): m = 500 g, c = 1,0 cal/(g·°C), ΔT = 80 - 20 = 60 °C -> Q = 500*1,0*60 = 30 000 cal = 30 kcal -> 30 * 4,184 = 125,52 kJ.
 * 9) Escena 4 AutoCheck: m = 500 g, c_Al = 0,22 cal/(g·°C), Q = 2200 cal, T0 = 25 °C -> ΔT = 2200 / (500 * 0,22) = 2200 / 110 = 20 °C -> Tf = 25 + 20 = 45 °C.
 * 10) Escena 5 FigCurvaCalentamiento (1 g agua): -20->0 °C: 1*0,5*20 = 10 cal; fusión: 1*80 = 80 cal (acum 90); 0->100 °C: 1*1*100 = 100 cal (acum 190); vaporización: 1*540 = 540 cal (acum 730); 100->120 °C: 1*0,5*20 = 10 cal (acum 740).
 * 11) Escena 5 WorkedExample (UMSS 2006-parcial4-1 P17): m = 10 kg, -20->110 °C -> Q1 = 10*0,5*20 = 100 kcal; Q2 = 10*80 = 800 kcal; Q3 = 10*1*100 = 1000 kcal; Q4 = 10*540 = 5400 kcal; Q5 = 10*0,5*10 = 50 kcal -> Qtotal = 100 + 800 + 1000 + 5400 + 50 = 7350 kcal.
 * 12) Escena 5 AutoCheck (UMSS 2006-parcial4-1 P15): m = 56 g hielo 0 °C -> agua 75 °C -> Q1 = 56*80 = 4480 cal; Q2 = 56*1*75 = 4200 cal; Qtotal = 4480 + 4200 = 8680 cal.
 * 13) Escena 6 WorkedExample (UMSS 2006-parcial4-1 P21): 15 g hielo 0 °C + 30 g agua 50 °C -> Q_fusion = 15*80 = 1200 cal; Q_disp = 30*1*50 = 1500 cal (> 1200 cal, funde todo). Ecuación: 1200 + 15*Te + 30*(Te - 50) = 0 -> 45*Te = 300 -> Te = 300/45 = 20/3 ≈ 6,7 °C.
 * 14) Escena 6 AutoCheck (MFQ §4.2 F4 P5): 200 g agua 80 °C + 300 g agua 30 °C -> 200*(Te - 80) + 300*(Te - 30) = 0 -> 500*Te = 16 000 + 9000 = 25 000 -> Te = 50 °C.
 * 15) Escena 7 WorkedExample: k = 0,80 W/(m·°C), A = 1,5 m², d = 5,0 mm = 0,0050 m, ΔT = 22 - 7 = 15 °C -> P = (0,80 * 1,5 * 15) / 0,0050 = 18 / 0,0050 = 3600 W = 3,6 kW.
 * 16) Escena 8 Práctica 1 (UMSS 2006-parcial4-2 P15): Q_agua = 981 * 4,184 * (34,4 - 22,1) = 981 * 4,184 * 12,3 = 50 485,40 J; m_Fe * ΔT_Fe = 1220 * (126,5 - 34,4) = 1220 * 92,1 = 112 362; c_Fe = 50 485,40 / 112 362 = 0,4493 ≈ 0,450 J/(g·°C).
 * 17) Escena 8 Práctica 2: C/100 = (80 - 20)/(140 - 20) = 60/120 = 1/2 -> C = 50 °C.
 * 18) Escena 8 Práctica 3: V0 = 1000 cm³, α = 1,7e-5 °C^-1 -> γ = 3α = 5,1e-5 °C^-1; ΔT = 100 °C -> ΔV = 1000 * 5,1e-5 * 100 = 5,1 cm³.
 * 19) Escena 8 Práctica 4: 100 g hielo 0 °C + 100 g agua 40 °C -> Q_disp = 100*1*40 = 4000 cal < Q_fusion = 100*80 = 8000 cal -> funde m = 4000/80 = 50 g; quedan 100 - 50 = 50 g de hielo a Te = 0 °C.
 * 20) Escena 8 Práctica 5 (adaptado de UMSS 2006-parcial4-1 P18): m_ac = 500 kg, c_ac = 0,12 kcal/(kg·°C), m_ag = 290 kg, ΔT = 100 - 10 = 90 °C -> Q_ac = 500*0,12*90 = 5400 kcal; Q_ag = 290*1*90 = 26 100 kcal; Q_util = 31 500 kcal; η = 0,70 -> Q_entregado = 31 500 / 0,70 = 45 000 kcal.
 */
