"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LeccionShell, { Escena } from "../_components/LeccionShell";
import {
  Titulo,
  Parrafo,
  Definicion,
  Puente,
  PorQue,
  WorkedExample,
  Paso,
  Cuidado,
  Hook,
  Misconception,
  Resumen,
  AutoCheck,
  EscenaRica,
} from "../_components/pedagogia";
import { LIENZO, Pizarra } from "../_components/lienzo";
import MathText from "../../components/MathText";

/* ============================================================================
 *  Componentes locales auxiliares (practica y diagramas SVG calculados)
 * ============================================================================ */

interface EjercicioLocal {
  p: string;
  o: string[];
  c: number;
  ex: string;
}

function PracticaIntegradora({
  ejercicios,
}: {
  ejercicios: EjercicioLocal[];
}) {
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const ej = ejercicios[idx];
  const terminado = idx >= ejercicios.length;

  function elegir(i: number) {
    if (sel !== null) return;
    setSel(i);
    if (i === ej.c) setAciertos((a) => a + 1);
  }

  function siguiente() {
    setIdx((i) => i + 1);
    setSel(null);
  }

  function reiniciar() {
    setIdx(0);
    setSel(null);
    setAciertos(0);
  }

  if (terminado) {
    return (
      <div
        className="rounded-2xl p-6 text-center space-y-3"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="text-3xl font-black"
          style={{
            color: aciertos >= 4 ? LIENZO.ok : LIENZO.accent,
          }}
        >
          {aciertos} / {ejercicios.length}
        </div>
        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {aciertos === ejercicios.length
            ? "Dominaste todo el tema. Estás listo para los problemas de examen."
            : aciertos >= 3
              ? "Buen resultado. Repasa los ejercicios en los que fallaste y vuelve a intentar."
              : "Conviene repasar las escenas de cálculo antes de repetir la práctica."}
        </div>
        <button
          type="button"
          onClick={reiniciar}
          className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
          style={{
            background: "var(--accent)",
            color: "#ffffff",
          }}
        >
          Repetir práctica
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5 space-y-3"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-widest">
        <span style={{ color: "var(--accent)" }}>
          Ejercicio {idx + 1} de {ejercicios.length}
        </span>
        <span style={{ color: "var(--text-muted)" }}>
          Aciertos: {aciertos}
        </span>
      </div>
      <div
        className="text-[15px] font-medium"
        style={{ color: "var(--text-primary)" }}
      >
        <MathText>{ej.p}</MathText>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {ej.o.map((op, i) => {
          const elegido = sel === i;
          const esCorrecta = i === ej.c;
          let bg = "var(--bg)";
          let borderColor = "var(--border)";
          if (sel !== null) {
            if (esCorrecta) {
              bg = "rgba(42, 123, 98, 0.14)";
              borderColor = LIENZO.ok;
            } else if (elegido) {
              bg = "rgba(181, 56, 42, 0.14)";
              borderColor = LIENZO.bad;
            }
          }
          return (
            <button
              key={op}
              type="button"
              onClick={() => elegir(i)}
              disabled={sel !== null}
              className="text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:cursor-default"
              style={{
                background: bg,
                border: `1.5px solid ${borderColor}`,
                color: "var(--text-primary)",
              }}
            >
              <MathText>{op}</MathText>
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div
          className="rounded-xl px-3.5 py-2.5 text-sm space-y-2"
          style={{
            background: "var(--surface-2)",
            color: "var(--text-secondary)",
          }}
        >
          <p>
            <strong
              style={{ color: sel === ej.c ? LIENZO.ok : LIENZO.bad }}
            >
              {sel === ej.c ? "Correcto." : "Revisa este paso."}
            </strong>{" "}
            <MathText>{ej.ex}</MathText>
          </p>
          <button
            type="button"
            onClick={siguiente}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
            style={{
              background: "var(--accent)",
              color: "#ffffff",
            }}
          >
            {idx + 1 < ejercicios.length ? "Siguiente ejercicio" : "Ver resultado"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
 *  FIGURA 1: MCU · Periodo, frecuencia y velocidad angular (interactivo)
 * ============================================================================ */

function FiguraMCU() {
  const [frecuencia, setFrecuencia] = useState<number>(1);
  const reducir = useReducedMotion();

  const W = 360;
  const H = 200;
  const CX = 96;
  const CY = 102;
  const R_PX = 62;
  const ANG_RAD = -Math.PI / 4; // 45 grados en el primer cuadrante visual
  const PX = CX + R_PX * Math.cos(ANG_RAD);
  const PY = CY + R_PX * Math.sin(ANG_RAD);

  // Vector velocidad tangente en sentido antihorario: (-sin(-ang), -cos) en SVG y-abajo
  // En pantalla (y hacia abajo), el angulo matematico theta corresponde a (cos theta, -sin theta).
  // Para giro antihorario, la tangente apunta en (-sin theta, -cos theta).
  // Aquí usamos ANG_RAD = -PI/4 en coordenadas SVG, equivalente a +45 grados matematicos:
  // dx = sin(-ANG_RAD) negativo? Calculemos con t = -ANG_RAD = +PI/4:
  // pos = (CX + R cos t, CY - R sin t); derivada respecto a t: (-R sin t, -R cos t).
  const T_MAT = Math.PI / 4;
  const V_LEN = 38;
  const VX = -V_LEN * Math.sin(T_MAT);
  const VY = -V_LEN * Math.cos(T_MAT);

  // Arco de angulo de 0 a 45 grados matematicos
  const ARC_R = 26;
  const AX0 = CX + ARC_R;
  const AY0 = CY;
  const AX1 = CX + ARC_R * Math.cos(T_MAT);
  const AY1 = CY - ARC_R * Math.sin(T_MAT);

  // Calculos fisicos con R = 0,20 m
  const RADIO_M = 0.2;
  const periodo = 1 / frecuencia;
  const omegaPi = 2 * frecuencia; // multiplo de pi
  const velocidadLineal = (omegaPi * Math.PI * RADIO_M).toFixed(2).replace(".", ",");
  const periodoTxt = periodo.toFixed(2).replace(".", ",");

  const duracionVuelta = reducir ? 0 : 3 / frecuencia;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span style={{ color: "var(--text-muted)" }}>
          Prueba la frecuencia de giro (R = 0,20 m):
        </span>
        {[0.5, 1, 2].map((f) => {
          const activo = frecuencia === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFrecuencia(f)}
              className="px-2.5 py-1 rounded-lg font-semibold cursor-pointer"
              style={{
                background: activo ? "var(--accent)" : "var(--surface)",
                color: activo ? "#ffffff" : "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
            >
              {String(f).replace(".", ",")} Hz
            </button>
          );
        })}
      </div>
      <Pizarra alto={200}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Trayectoria circular con radio R, ángulo theta, vector velocidad tangencial y valores de periodo, frecuencia y velocidad angular"
        >
          <defs>
            <marker
              id="mcu-v-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.accent} />
            </marker>
          </defs>

          {/* Ejes de referencia suaves */}
          <line
            x1={CX - R_PX - 14}
            y1={CY}
            x2={CX + R_PX + 14}
            y2={CY}
            stroke={LIENZO.fgFaint}
            strokeDasharray="3 3"
            strokeWidth={1}
          />
          <line
            x1={CX}
            y1={CY - R_PX - 14}
            x2={CX}
            y2={CY + R_PX + 14}
            stroke={LIENZO.fgFaint}
            strokeDasharray="3 3"
            strokeWidth={1}
          />

          {/* Circunferencia */}
          <circle
            cx={CX}
            cy={CY}
            r={R_PX}
            fill="none"
            stroke={LIENZO.fgDim}
            strokeWidth={1.6}
          />

          {/* Arco del angulo */}
          <path
            d={`M ${AX0} ${AY0} A ${ARC_R} ${ARC_R} 0 0 0 ${AX1} ${AY1}`}
            fill="none"
            stroke={LIENZO.warn}
            strokeWidth={1.8}
          />
          <text
            x={CX + ARC_R + 10}
            y={CY - 8}
            fill={LIENZO.warn}
            fontSize="12"
            fontWeight="700"
          >
            θ
          </text>

          {/* Radio hasta la particula */}
          <line
            x1={CX}
            y1={CY}
            x2={PX}
            y2={PY}
            stroke={LIENZO.fg}
            strokeWidth={1.6}
          />
          <text
            x={(CX + PX) / 2 - 14}
            y={(CY + PY) / 2 - 6}
            fill={LIENZO.fg}
            fontSize="11"
            fontWeight="600"
          >
            R
          </text>

          {/* Vector velocidad tangente */}
          <line
            x1={PX}
            y1={PY}
            x2={PX + VX}
            y2={PY + VY}
            stroke={LIENZO.accent}
            strokeWidth={2.4}
            markerEnd="url(#mcu-v-arrow)"
          />
          <text
            x={PX + VX - 4}
            y={PY + VY - 8}
            fill={LIENZO.accent}
            fontSize="12"
            fontWeight="700"
          >
            v = ω·R
          </text>

          {/* Particula estatica de referencia y punto en movimiento */}
          <circle cx={PX} cy={PY} r={5} fill={LIENZO.accent} />
          {!reducir && (
            <motion.g
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: duracionVuelta,
                ease: "linear",
              }}
            >
              <circle
                cx={CX + R_PX}
                cy={CY}
                r={4}
                fill={LIENZO.ok}
                opacity={0.85}
              />
            </motion.g>
          )}

          {/* Panel de valores calculados a la derecha */}
          <rect
            x={188}
            y={22}
            width={158}
            height={156}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
          />
          <text
            x={200}
            y={44}
            fill={LIENZO.fgDim}
            fontSize="10.5"
            fontWeight="700"
          >
            MAGNITUDES (R = 0,20 m)
          </text>
          <text x={200} y={70} fill={LIENZO.fg} fontSize="12">
            f = {String(frecuencia).replace(".", ",")} Hz
          </text>
          <text x={200} y={96} fill={LIENZO.ok} fontSize="12" fontWeight="700">
            T = 1/f = {periodoTxt} s
          </text>
          <text
            x={200}
            y={122}
            fill={LIENZO.warn}
            fontSize="12"
            fontWeight="700"
          >
            ω = 2πf = {omegaPi}π rad/s
          </text>
          <text
            x={200}
            y={148}
            fill={LIENZO.accent}
            fontSize="12"
            fontWeight="700"
          >
            v = ωR ≈ {velocidadLineal} m/s
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

/* ============================================================================
 *  FIGURA 2: Aceleracion y fuerza centripeta (vector hacia el centro)
 * ============================================================================ */

function FiguraCentripeta() {
  const W = 360;
  const H = 190;
  const CX = 104;
  const CY = 95;
  const R_PX = 62;
  const ANG = -Math.PI / 6; // 30 grados por encima de +x

  const PX = CX + R_PX * Math.cos(ANG);
  const PY = CY + R_PX * Math.sin(ANG);

  // Vector unitario hacia el centro: (-cos(ANG), -sin(ANG))
  const UX = -Math.cos(ANG);
  const UY = -Math.sin(ANG);

  // Vector unitario tangente antihorario: (sin(ANG), -cos(ANG))
  const TX = Math.sin(ANG);
  const TY = -Math.cos(ANG);

  const AC_LEN = 38;
  const V_LEN = 42;
  const SQ = 8; // lado del cuadrito de angulo recto

  const AX = PX + AC_LEN * UX;
  const AY = PY + AC_LEN * UY;
  const VX = PX + V_LEN * TX;
  const VY = PY + V_LEN * TY;

  return (
    <Pizarra alto={190}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Partícula en movimiento circular con velocidad tangente perpendicular a la aceleración y fuerza centrípetas"
      >
        <defs>
          <marker
            id="fc-v"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.warn} />
          </marker>
          <marker
            id="fc-ac"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.accent} />
          </marker>
        </defs>

        <circle
          cx={CX}
          cy={CY}
          r={R_PX}
          fill="none"
          stroke={LIENZO.fgFaint}
          strokeWidth={1.6}
          strokeDasharray="4 4"
        />

        {/* Centro */}
        <circle cx={CX} cy={CY} r={3.5} fill={LIENZO.fgDim} />
        <text x={CX - 38} y={CY + 4} fill={LIENZO.fgDim} fontSize="10.5">
          Centro
        </text>

        {/* Linea radial tenue */}
        <line
          x1={CX}
          y1={CY}
          x2={PX}
          y2={PY}
          stroke={LIENZO.fgFaint}
          strokeWidth={1.2}
        />

        {/* Marca de 90 grados entre tangente y radio */}
        <polyline
          points={`${PX + SQ * UX},${PY + SQ * UY} ${PX + SQ * UX + SQ * TX},${PY + SQ * UY + SQ * TY} ${PX + SQ * TX},${PY + SQ * TY}`}
          fill="none"
          stroke={LIENZO.fgDim}
          strokeWidth={1}
        />

        {/* Vector aceleracion / fuerza centripeta hacia el centro */}
        <line
          x1={PX}
          y1={PY}
          x2={AX}
          y2={AY}
          stroke={LIENZO.accent}
          strokeWidth={2.5}
          markerEnd="url(#fc-ac)"
        />
        <text
          x={AX - 6}
          y={AY + 16}
          fill={LIENZO.accent}
          fontSize="11.5"
          fontWeight="700"
        >
          Fc, ac
        </text>

        {/* Vector velocidad tangente */}
        <line
          x1={PX}
          y1={PY}
          x2={VX}
          y2={VY}
          stroke={LIENZO.warn}
          strokeWidth={2.3}
          markerEnd="url(#fc-v)"
        />
        <text
          x={VX + 6}
          y={VY + 2}
          fill={LIENZO.warn}
          fontSize="12"
          fontWeight="700"
        >
          v
        </text>

        {/* Particula */}
        <circle cx={PX} cy={PY} r={5.5} fill={LIENZO.fg} />

        {/* Resumen visual a la derecha */}
        <rect
          x={192}
          y={28}
          width={154}
          height={132}
          rx={10}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.fgFaint}
        />
        <text
          x={204}
          y={52}
          fill={LIENZO.fg}
          fontSize="11.5"
          fontWeight="700"
        >
          Siempre a 90° entre sí
        </text>
        <text x={204} y={78} fill={LIENZO.warn} fontSize="11.5">
          v: tangente al círculo
        </text>
        <text x={204} y={102} fill={LIENZO.accent} fontSize="11.5">
          ac, Fc: hacia el centro
        </text>
        <text x={204} y={128} fill={LIENZO.fgDim} fontSize="11">
          ac = v²/R = ω²·R
        </text>
        <text x={204} y={146} fill={LIENZO.fgDim} fontSize="11">
          Fc = m·v²/R = m·ω²·R
        </text>
      </svg>
    </Pizarra>
  );
}

/* ============================================================================
 *  FIGURA 3: DCL en curva plana con friccion estatica
 * ============================================================================ */

function FiguraCurvaFriccion() {
  const W = 360;
  const H = 185;
  const ASPHALT_Y = 128;
  const CAR_CX = 152;
  const CAR_W = 54;
  const CAR_H = 30;
  const CAR_CY = ASPHALT_Y - CAR_H / 2 - 4;

  const VEC_V = 42;
  const VEC_H = 50;

  return (
    <Pizarra alto={185}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Diagrama de cuerpo libre de un vehículo en curva plana: Normal arriba, Peso abajo y fricción estática apuntando hacia el centro de la curva"
      >
        <defs>
          <marker
            id="curva-n"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.ok} />
          </marker>
          <marker
            id="curva-mg"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.warn} />
          </marker>
          <marker
            id="curva-fs"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.accent} />
          </marker>
        </defs>

        {/* Carretera horizontal */}
        <line
          x1={26}
          y1={ASPHALT_Y}
          x2={334}
          y2={ASPHALT_Y}
          stroke={LIENZO.fgDim}
          strokeWidth={2}
        />

        {/* Indicador de centro de la curva a la izquierda */}
        <circle cx={40} cy={CAR_CY} r={3.5} fill={LIENZO.accent} />
        <text x={22} y={CAR_CY - 10} fill={LIENZO.accent} fontSize="10.5">
          Centro (R)
        </text>
        <line
          x1={46}
          y1={CAR_CY}
          x2={CAR_CX - CAR_W / 2 - VEC_H - 8}
          y2={CAR_CY}
          stroke={LIENZO.fgFaint}
          strokeDasharray="3 3"
          strokeWidth={1}
        />

        {/* Cuerpo del vehiculo visto desde atras */}
        <rect
          x={CAR_CX - CAR_W / 2}
          y={CAR_CY - CAR_H / 2}
          width={CAR_W}
          height={CAR_H}
          rx={6}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.fg}
          strokeWidth={1.6}
        />
        <circle cx={CAR_CX - 18} cy={ASPHALT_Y - 4} r={4} fill={LIENZO.fgDim} />
        <circle cx={CAR_CX + 18} cy={ASPHALT_Y - 4} r={4} fill={LIENZO.fgDim} />
        <text
          x={CAR_CX - 5}
          y={CAR_CY + 4}
          fill={LIENZO.fg}
          fontSize="11"
          fontWeight="700"
        >
          m
        </text>

        {/* Normal arriba */}
        <line
          x1={CAR_CX}
          y1={CAR_CY - CAR_H / 2}
          x2={CAR_CX}
          y2={CAR_CY - CAR_H / 2 - VEC_V}
          stroke={LIENZO.ok}
          strokeWidth={2.4}
          markerEnd="url(#curva-n)"
        />
        <text
          x={CAR_CX + 8}
          y={CAR_CY - CAR_H / 2 - VEC_V + 10}
          fill={LIENZO.ok}
          fontSize="12"
          fontWeight="700"
        >
          N = mg
        </text>

        {/* Peso abajo */}
        <line
          x1={CAR_CX}
          y1={CAR_CY + CAR_H / 2}
          x2={CAR_CX}
          y2={CAR_CY + CAR_H / 2 + VEC_V}
          stroke={LIENZO.warn}
          strokeWidth={2.4}
          markerEnd="url(#curva-mg)"
        />
        <text
          x={CAR_CX + 8}
          y={CAR_CY + CAR_H / 2 + VEC_V - 2}
          fill={LIENZO.warn}
          fontSize="12"
          fontWeight="700"
        >
          mg
        </text>

        {/* Friccion estatica hacia el centro */}
        <line
          x1={CAR_CX - CAR_W / 2}
          y1={ASPHALT_Y - 2}
          x2={CAR_CX - CAR_W / 2 - VEC_H}
          y2={ASPHALT_Y - 2}
          stroke={LIENZO.accent}
          strokeWidth={2.6}
          markerEnd="url(#curva-fs)"
        />
        <text
          x={CAR_CX - CAR_W / 2 - VEC_H - 4}
          y={ASPHALT_Y + 18}
          fill={LIENZO.accent}
          fontSize="11.5"
          fontWeight="700"
        >
          fs,máx = μs·N = Fc
        </text>

        {/* Anotacion derecha */}
        <text x={222} y={76} fill={LIENZO.fg} fontSize="11" fontWeight="700">
          Curva plana:
        </text>
        <text x={222} y={96} fill={LIENZO.fgDim} fontSize="11">
          Vertical: N = mg
        </text>
        <text x={222} y={114} fill={LIENZO.accent} fontSize="10.5">
          Límite: μs·mg = mv_máx²/R
        </text>
      </svg>
    </Pizarra>
  );
}

/* ============================================================================
 *  FIGURA 4: Circulo vertical · comparacion cima vs punto mas bajo
 * ============================================================================ */

function FiguraVertical() {
  const W = 360;
  const H = 205;
  const CX = 104;
  const CY = 102;
  const R_PX = 64;

  const TOP_Y = CY - R_PX;
  const BOT_Y = CY + R_PX;

  return (
    <Pizarra alto={205}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Comparación de fuerzas en un círculo vertical: en el punto más alto tensión y peso apuntan hacia el centro; en el punto más bajo la tensión apunta arriba y el peso abajo"
      >
        <defs>
          <marker
            id="vert-t"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.accent} />
          </marker>
          <marker
            id="vert-mg"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.warn} />
          </marker>
        </defs>

        <circle
          cx={CX}
          cy={CY}
          r={R_PX}
          fill="none"
          stroke={LIENZO.fgFaint}
          strokeWidth={1.6}
          strokeDasharray="4 4"
        />
        <circle cx={CX} cy={CY} r={3} fill={LIENZO.fgDim} />

        {/* Cuerda en ambas posiciones */}
        <line
          x1={CX}
          y1={TOP_Y}
          x2={CX}
          y2={BOT_Y}
          stroke={LIENZO.fgFaint}
          strokeWidth={1}
        />

        {/* Punto mas alto */}
        <circle cx={CX} cy={TOP_Y} r={5} fill={LIENZO.fg} />
        <line
          x1={CX - 4}
          y1={TOP_Y + 6}
          x2={CX - 4}
          y2={TOP_Y + 28}
          stroke={LIENZO.accent}
          strokeWidth={2.2}
          markerEnd="url(#vert-t)"
        />
        <text
          x={CX - 28}
          y={TOP_Y + 22}
          fill={LIENZO.accent}
          fontSize="10.5"
          fontWeight="700"
        >
          T
        </text>
        <line
          x1={CX + 4}
          y1={TOP_Y + 6}
          x2={CX + 4}
          y2={TOP_Y + 30}
          stroke={LIENZO.warn}
          strokeWidth={2.2}
          markerEnd="url(#vert-mg)"
        />
        <text
          x={CX + 11}
          y={TOP_Y + 22}
          fill={LIENZO.warn}
          fontSize="10.5"
          fontWeight="700"
        >
          mg
        </text>
        <text x={CX - 20} y={TOP_Y - 12} fill={LIENZO.fg} fontSize="10.5">
          Cima
        </text>

        {/* Punto mas bajo */}
        <circle cx={CX} cy={BOT_Y} r={5} fill={LIENZO.fg} />
        <line
          x1={CX}
          y1={BOT_Y - 6}
          x2={CX}
          y2={BOT_Y - 48}
          stroke={LIENZO.accent}
          strokeWidth={2.5}
          markerEnd="url(#vert-t)"
        />
        <text
          x={CX + 10}
          y={BOT_Y - 32}
          fill={LIENZO.accent}
          fontSize="11"
          fontWeight="700"
        >
          T (mayor)
        </text>
        <line
          x1={CX}
          y1={BOT_Y + 6}
          x2={CX}
          y2={BOT_Y + 28}
          stroke={LIENZO.warn}
          strokeWidth={2.2}
          markerEnd="url(#vert-mg)"
        />
        <text
          x={CX + 10}
          y={BOT_Y + 24}
          fill={LIENZO.warn}
          fontSize="10.5"
          fontWeight="700"
        >
          mg
        </text>

        {/* Comparacion derecha */}
        <rect
          x={186}
          y={20}
          width={160}
          height={165}
          rx={10}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.fgFaint}
        />
        <text x={198} y={42} fill={LIENZO.fg} fontSize="11" fontWeight="700">
          Eje radial (+ al centro)
        </text>
        <text x={198} y={66} fill={LIENZO.ok} fontSize="10.5" fontWeight="700">
          En la cima:
        </text>
        <text x={198} y={84} fill={LIENZO.fgDim} fontSize="10.5">
          T + mg = m·v²/R
        </text>
        <text x={198} y={102} fill={LIENZO.warn} fontSize="10.5">
          T = 0 → v_min = √(gR)
        </text>
        <text
          x={198}
          y={132}
          fill={LIENZO.accent}
          fontSize="10.5"
          fontWeight="700"
        >
          En el punto más bajo:
        </text>
        <text x={198} y={150} fill={LIENZO.fgDim} fontSize="10.5">
          T - mg = m·v²/R
        </text>
        <text x={198} y={168} fill={LIENZO.fg} fontSize="10.5">
          T = mg + m·v²/R
        </text>
      </svg>
    </Pizarra>
  );
}

/* ============================================================================
 *  FIGURA 5: Ley de gravitacion universal e inverso del cuadrado
 * ============================================================================ */

function FiguraGravitacion() {
  const W = 360;
  const H = 185;
  const Y_TOP = 54;
  const X1 = 84;
  const X2 = 276;
  const R1 = 18;
  const R2 = 14;
  const F_LEN = 46;

  // Escala inferior: d, 2d, 3d
  const BAR_Y = 128;
  const BAR_X0 = 36;

  return (
    <Pizarra alto={185}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Atracción gravitatoria mutua entre dos masas separadas una distancia d entre centros y caída de la fuerza como uno sobre d al cuadrado"
      >
        <defs>
          <marker
            id="grav-f"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.accent} />
          </marker>
        </defs>

        {/* Distancia d entre centros */}
        <line
          x1={X1}
          y1={Y_TOP - 28}
          x2={X2}
          y2={Y_TOP - 28}
          stroke={LIENZO.fgDim}
          strokeWidth={1.2}
        />
        <line
          x1={X1}
          y1={Y_TOP - 33}
          x2={X1}
          y2={Y_TOP}
          stroke={LIENZO.fgFaint}
          strokeDasharray="2 2"
        />
        <line
          x1={X2}
          y1={Y_TOP - 33}
          x2={X2}
          y2={Y_TOP}
          stroke={LIENZO.fgFaint}
          strokeDasharray="2 2"
        />
        <text
          x={(X1 + X2) / 2 - 4}
          y={Y_TOP - 34}
          fill={LIENZO.fg}
          fontSize="11.5"
          fontWeight="700"
        >
          d
        </text>

        {/* Masas m1 y m2 */}
        <circle
          cx={X1}
          cy={Y_TOP}
          r={R1}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.fg}
          strokeWidth={1.8}
        />
        <text x={X1 - 9} y={Y_TOP + 4} fill={LIENZO.fg} fontSize="11">
          m₁
        </text>

        <circle
          cx={X2}
          cy={Y_TOP}
          r={R2}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.fg}
          strokeWidth={1.8}
        />
        <text x={X2 - 9} y={Y_TOP + 4} fill={LIENZO.fg} fontSize="11">
          m₂
        </text>

        {/* Fuerzas iguales y opuestas */}
        <line
          x1={X1 + R1 + 2}
          y1={Y_TOP}
          x2={X1 + R1 + 2 + F_LEN}
          y2={Y_TOP}
          stroke={LIENZO.accent}
          strokeWidth={2.4}
          markerEnd="url(#grav-f)"
        />
        <text
          x={X1 + R1 + 10}
          y={Y_TOP - 8}
          fill={LIENZO.accent}
          fontSize="11"
          fontWeight="700"
        >
          F
        </text>

        <line
          x1={X2 - R2 - 2}
          y1={Y_TOP}
          x2={X2 - R2 - 2 - F_LEN}
          y2={Y_TOP}
          stroke={LIENZO.accent}
          strokeWidth={2.4}
          markerEnd="url(#grav-f)"
        />
        <text
          x={X2 - R2 - 24}
          y={Y_TOP - 8}
          fill={LIENZO.accent}
          fontSize="11"
          fontWeight="700"
        >
          F
        </text>

        {/* Comparacion del inverso del cuadrado */}
        <text
          x={BAR_X0}
          y={BAR_Y - 12}
          fill={LIENZO.fgDim}
          fontSize="10.5"
          fontWeight="700"
        >
          Si aumenta la distancia entre centros:
        </text>

        {[
          { label: "d", fTxt: "F", w: 96, y: BAR_Y },
          { label: "2d", fTxt: "F/4", w: 24, y: BAR_Y + 20 },
          { label: "3d", fTxt: "F/9", w: 11, y: BAR_Y + 40 },
        ].map((row) => (
          <g key={row.label}>
            <text x={BAR_X0} y={row.y + 9} fill={LIENZO.fg} fontSize="11">
              {row.label}
            </text>
            <rect
              x={BAR_X0 + 34}
              y={row.y}
              width={row.w}
              height={10}
              rx={3}
              fill={LIENZO.accent}
            />
            <text
              x={BAR_X0 + 34 + row.w + 8}
              y={row.y + 9}
              fill={LIENZO.warn}
              fontSize="11"
              fontWeight="700"
            >
              {row.fTxt}
            </text>
          </g>
        ))}
      </svg>
    </Pizarra>
  );
}

/* ============================================================================
 *  FIGURA 6: Campo gravitatorio a una altura h sobre la superficie
 * ============================================================================ */

function FiguraAltura() {
  const W = 360;
  const H = 190;
  const CX = 76;
  const CY = 104;
  const RT_PX = 42;
  const H_PX = 42; // h = RT -> r = 2 RT
  const SAT_X = CX + RT_PX + H_PX;

  return (
    <Pizarra alto={190}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Diferencia entre el radio del planeta RT, la altura h sobre la superficie y la distancia total r igual a RT más h desde el centro"
      >
        {/* Planeta Tierra */}
        <circle
          cx={CX}
          cy={CY}
          r={RT_PX}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.ok}
          strokeWidth={2}
        />
        <circle cx={CX} cy={CY} r={3} fill={LIENZO.fg} />
        <text x={CX - 18} y={CY + 22} fill={LIENZO.ok} fontSize="10.5">
          Tierra (M)
        </text>

        {/* Segmento RT (centro a superficie) */}
        <line
          x1={CX}
          y1={CY}
          x2={CX + RT_PX}
          y2={CY}
          stroke={LIENZO.fg}
          strokeWidth={1.8}
        />
        <text x={CX + 12} y={CY - 6} fill={LIENZO.fg} fontSize="11">
          Rₜ
        </text>

        {/* Segmento h (superficie a satelite) */}
        <line
          x1={CX + RT_PX}
          y1={CY}
          x2={SAT_X}
          y2={CY}
          stroke={LIENZO.warn}
          strokeWidth={2}
          strokeDasharray="3 3"
        />
        <text
          x={CX + RT_PX + H_PX / 2 - 4}
          y={CY - 8}
          fill={LIENZO.warn}
          fontSize="11.5"
          fontWeight="700"
        >
          h
        </text>

        {/* Satelite */}
        <circle cx={SAT_X} cy={CY} r={5} fill={LIENZO.accent} />
        <text
          x={SAT_X - 18}
          y={CY - 14}
          fill={LIENZO.accent}
          fontSize="10.5"
          fontWeight="700"
        >
          Satélite
        </text>

        {/* Cota inferior r = RT + h */}
        <line
          x1={CX}
          y1={CY + RT_PX + 16}
          x2={SAT_X}
          y2={CY + RT_PX + 16}
          stroke={LIENZO.accent}
          strokeWidth={1.4}
        />
        <line
          x1={CX}
          y1={CY + 4}
          x2={CX}
          y2={CY + RT_PX + 20}
          stroke={LIENZO.fgFaint}
          strokeDasharray="2 2"
        />
        <line
          x1={SAT_X}
          y1={CY + 6}
          x2={SAT_X}
          y2={CY + RT_PX + 20}
          stroke={LIENZO.fgFaint}
          strokeDasharray="2 2"
        />
        <text
          x={(CX + SAT_X) / 2 - 26}
          y={CY + RT_PX + 32}
          fill={LIENZO.accent}
          fontSize="11.5"
          fontWeight="700"
        >
          r = Rₜ + h
        </text>

        {/* Tabla rapida a la derecha */}
        <rect
          x={190}
          y={24}
          width={160}
          height={138}
          rx={10}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.fgFaint}
        />
        <text x={200} y={46} fill={LIENZO.fg} fontSize="11" fontWeight="700">
          Gravedad con altura
        </text>
        <text x={200} y={70} fill={LIENZO.ok} fontSize="10.5">
          h = 0 (r = Rₜ) → g₀
        </text>
        <text x={200} y={96} fill={LIENZO.warn} fontSize="10.5">
          h = Rₜ (r = 2Rₜ) → g₀/4
        </text>
        <text x={200} y={122} fill={LIENZO.accent} fontSize="10.5">
          h = 2Rₜ (r = 3Rₜ) → g₀/9
        </text>
        <text x={200} y={146} fill={LIENZO.fgDim} fontSize="10">
          g(h) = g₀ · (Rₜ / (Rₜ+h))²
        </text>
      </svg>
    </Pizarra>
  );
}

/* ============================================================================
 *  FIGURA 7: Orbitas y Leyes de Kepler
 * ============================================================================ */

function FiguraKepler() {
  const W = 360;
  const H = 185;
  const ECX = 114;
  const ECY = 92;
  const RX = 84;
  const RY = 52;
  // Distancia focal c = sqrt(RX^2 - RY^2)
  const C_FOC = Math.round(Math.sqrt(RX * RX - RY * RY)); // sqrt(7056 - 2704) = sqrt(4352) ≈ 66
  const FOCO_X = ECX - C_FOC; // Sol en foco izquierdo
  const PERI_X = ECX - RX; // perihelio (mas cerca)
  const AFEL_X = ECX + RX; // afelio (mas lejos)

  // Puntos en la elipse para mostrar sectores de areas iguales aproximadas
  // Cerca del perihelio (angulo amplio) y cerca del afelio (angulo estrecho)
  const P1X = ECX - 72;
  const P1Y = ECY - Math.round(RY * Math.sqrt(1 - (72 / RX) ** 2)); // ≈ 92 - 27 = 65
  const P2X = ECX - 72;
  const P2Y = ECY + Math.round(RY * Math.sqrt(1 - (72 / RX) ** 2)); // ≈ 92 + 27 = 119

  const A1X = AFEL_X - 4;
  const A1Y = ECY - Math.round(RY * Math.sqrt(1 - (80 / RX) ** 2)); // ≈ 92 - 16 = 76
  const A2X = AFEL_X - 4;
  const A2Y = ECY + Math.round(RY * Math.sqrt(1 - (80 / RX) ** 2)); // ≈ 92 + 16 = 108

  return (
    <Pizarra alto={185}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Órbita elíptica con la estrella de masa M en un foco y comparación de áreas iguales barridas cerca y lejos"
      >
        {/* Sector perihelio (mas rapido) */}
        <polygon
          points={`${FOCO_X},${ECY} ${P1X},${P1Y} ${PERI_X},${ECY} ${P2X},${P2Y}`}
          fill="rgba(42, 123, 98, 0.25)"
          stroke={LIENZO.ok}
          strokeWidth={1}
        />

        {/* Sector afelio (mas lento) */}
        <polygon
          points={`${FOCO_X},${ECY} ${A1X},${A1Y} ${AFEL_X},${ECY} ${A2X},${A2Y}`}
          fill="rgba(217, 119, 6, 0.22)"
          stroke={LIENZO.warn}
          strokeWidth={1}
        />

        {/* Elipse orbital */}
        <ellipse
          cx={ECX}
          cy={ECY}
          rx={RX}
          ry={RY}
          fill="none"
          stroke={LIENZO.fg}
          strokeWidth={1.6}
        />

        {/* Estrella de masa M en el foco */}
        <circle cx={FOCO_X} cy={ECY} r={8} fill={LIENZO.warn} />
        <text
          x={FOCO_X - 6}
          y={ECY + 20}
          fill={LIENZO.warn}
          fontSize="10.5"
          fontWeight="700"
        >
          M
        </text>

        {/* Planeta en afelio */}
        <circle cx={AFEL_X} cy={ECY} r={4.5} fill={LIENZO.accent} />

        {/* Etiquetas */}
        <text x={20} y={28} fill={LIENZO.ok} fontSize="10.5" fontWeight="700">
          Cerca: v mayor
        </text>
        <text
          x={140}
          y={28}
          fill={LIENZO.warn}
          fontSize="10.5"
          fontWeight="700"
        >
          Lejos: v menor
        </text>
        <text x={44} y={166} fill={LIENZO.fgDim} fontSize="10.5">
          Áreas iguales en tiempos iguales
        </text>

        {/* Caja derecha con 3ra ley explicita */}
        <rect
          x={214}
          y={32}
          width={136}
          height={120}
          rx={10}
          fill={LIENZO.bgSoft}
          stroke={LIENZO.fgFaint}
        />
        <text
          x={224}
          y={54}
          fill={LIENZO.fg}
          fontSize="11"
          fontWeight="700"
        >
          Órbita circular
        </text>
        <text x={224} y={76} fill={LIENZO.accent} fontSize="10.5">
          Fg = Fc
        </text>
        <text x={224} y={98} fill={LIENZO.fgDim} fontSize="10.5">
          T² = (4π² / GM) · r³
        </text>
        <text x={224} y={120} fill={LIENZO.ok} fontSize="10.5">
          v = √(GM / r)
        </text>
        <text x={224} y={140} fill={LIENZO.fgDim} fontSize="10">
          M = masa central
        </text>
      </svg>
    </Pizarra>
  );
}

/* ============================================================================
 *  ESCENA 1 · MCU: periodo, frecuencia y velocidad angular
 * ============================================================================ */

function EscenaMCU() {
  return (
    <EscenaRica>
      <Titulo accent="01 · Cinemática angular">
        MCU: periodo, frecuencia y velocidad angular
      </Titulo>

      <Hook>
        En un laboratorio clínico, una centrífuga da decenas de vueltas por
        segundo para separar el plasma de las células sanguíneas. Aunque el
        rotor dé vueltas a ritmo constante, un punto en el borde recorre mucha
        más distancia por segundo que un punto cerca del eje.
      </Hook>

      <Puente>
        En el movimiento rectilíneo medías distancia en metros y rapidez en{" "}
        <MathText>{"$\\text{m/s}$"}</MathText>. Cuando un cuerpo gira en
        círculo, es mucho más práctico medir cuántas vueltas da y qué ángulo{" "}
        <MathText>{"$\\theta$"}</MathText> barre cada segundo.
      </Puente>

      <Definicion termino="Periodo, frecuencia y velocidad angular (MCU)">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Periodo (<MathText>{"$T$"}</MathText>):</strong> tiempo que
            tarda el cuerpo en completar una vuelta entera. Se mide en segundos
            (<MathText>{"$\\text{s}$"}</MathText>).
          </li>
          <li>
            <strong>Frecuencia (<MathText>{"$f$"}</MathText>):</strong> número de
            vueltas completas en cada segundo:{" "}
            <MathText>{"$f = \\frac{1}{T}$"}</MathText>. Se mide en hercios (
            <MathText>{"$\\text{Hz} = \\text{s}^{-1}$"}</MathText>).
          </li>
          <li>
            <strong>Velocidad angular (<MathText>{"$\\omega$"}</MathText>):</strong>{" "}
            ángulo barrido por unidad de tiempo (en radianes por segundo):{" "}
            <MathText>{"$\\omega = \\frac{2\\pi}{T} = 2\\pi f$"}</MathText>.
          </li>
          <li>
            <strong>Rapidez tangencial (<MathText>{"$v$"}</MathText>):</strong>{" "}
            conecta el giro con la distancia en metros a radio{" "}
            <MathText>{"$R$"}</MathText>:{" "}
            <MathText>{"$v = \\omega R = \\frac{2\\pi R}{T}$"}</MathText>.
          </li>
        </ul>
      </Definicion>

      <FiguraMCU />

      <PorQue>
        Una vuelta completa mide exactamente{" "}
        <MathText>{"$2\\pi\\ \\text{rad}$"}</MathText> de ángulo y tiene una
        longitud de circunferencia igual a{" "}
        <MathText>{"$2\\pi R$"}</MathText>. Como cada vuelta dura un periodo{" "}
        <MathText>{"$T$"}</MathText>, dividir el ángulo por{" "}
        <MathText>{"$T$"}</MathText> produce{" "}
        <MathText>{"$\\omega = 2\\pi/T$"}</MathText>, y multiplicar por{" "}
        <MathText>{"$R$"}</MathText> te da el arco recorrido cada segundo:{" "}
        <MathText>{"$v = \\omega R$"}</MathText>. Una vuelta completa equivale a{" "}
        <MathText>{"$360^\\circ = 2\\pi\\ \\text{rad}$"}</MathText>{" "}
        (aproximadamente <MathText>{"$6{,}28\\ \\text{rad}$"}</MathText>). Usar
        radianes es obligatorio para que{" "}
        <MathText>{"$v = \\omega R$"}</MathText> dé metros por segundo.
      </PorQue>

      {/* basado en: data/examenes/umss/ingenieria/2025-2op-1-2025.md Pregunta 10 */}
      <WorkedExample titulo="Encuentro en trayectoria circular (adaptado de examen UMSS)">
        <Parrafo>
          Dos partículas parten del mismo punto sobre una circunferencia de
          radio <MathText>{"$R = 10\\ \\text{m}$"}</MathText> en sentidos
          contrarios, con velocidades angulares constantes{" "}
          <MathText>{"$\\omega_1 = 8\\pi\\ \\text{rad/s}$"}</MathText> y{" "}
          <MathText>{"$\\omega_2 = 2\\pi\\ \\text{rad/s}$"}</MathText>. Calcula
          en qué instante se encuentran por primera vez.
        </Parrafo>
        <Paso n={1}>
          Como parten del mismo lugar y giran en sentidos opuestos, cuando se
          cruzan por primera vez la suma de sus ángulos barridos completa una
          vuelta entera: <MathText>{"$\\theta_1 + \\theta_2 = 2\\pi$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Reemplaza cada ángulo por{" "}
          <MathText>{"$\\theta = \\omega t$"}</MathText>:{" "}
          <MathText>{"$\\omega_1 t + \\omega_2 t = 2\\pi$"}</MathText>, y saca
          factor común: <MathText>{"$(\\omega_1 + \\omega_2)\\,t = 2\\pi$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Suma las velocidades angulares:{" "}
          <MathText>
            {"$\\omega_1 + \\omega_2 = 8\\pi + 2\\pi = 10\\pi\\ \\text{rad/s}$"}
          </MathText>
          .
        </Paso>
        <Paso n={4}>
          Despeja el tiempo <MathText>{"$t$"}</MathText>:{" "}
          <MathText>
            {"$t = \\frac{2\\pi}{10\\pi} = \\frac{1}{5} = 0{,}2\\ \\text{s}$"}
          </MathText>
          .
        </Paso>
      </WorkedExample>

      <Cuidado>
        No confundas <strong>rpm</strong> (revoluciones por minuto) con{" "}
        <MathText>{"$\\text{Hz}$"}</MathText> ni con{" "}
        <MathText>{"$\\text{rad/s}$"}</MathText>. Primero divide las rpm entre{" "}
        <MathText>{"$60$"}</MathText> para obtener vueltas por segundo (
        <MathText>{"$\\text{Hz}$"}</MathText>), y luego multiplica por{" "}
        <MathText>{"$2\\pi$"}</MathText> para tener{" "}
        <MathText>{"$\\omega$"}</MathText> en{" "}
        <MathText>{"$\\text{rad/s}$"}</MathText>.
      </Cuidado>

      <AutoCheck
        pregunta="Una centrífuga gira a 300 rpm (vueltas por minuto). ¿Cuál es su periodo T?"
        opciones={["0,2 s", "5 s", "60 s", "0,5 s"]}
        correctaIdx={0}
        explicacion="Primero pasa a hercios: f = 300 / 60 = 5 Hz (5 vueltas por segundo). Luego T = 1 / f = 1 / 5 = 0,2 s."
      />
    </EscenaRica>
  );
}

/* ============================================================================
 *  ESCENA 2 · Aceleracion y fuerza centripeta
 * ============================================================================ */

function EscenaCentripeta() {
  return (
    <EscenaRica>
      <Titulo accent="02 · Dinámica del giro">
        Aceleración y fuerza centrípeta
      </Titulo>

      <Hook>
        Cuando viajas en auto y tomas una rotonda sin cambiar el velocímetro,
        sientes que la puerta o el asiento te empujan hacia el centro de la
        curva. ¿Por qué hay aceleración si la rapidez marca el mismo número?
      </Hook>

      <Puente>
        La aceleración mide cualquier cambio del <strong>vector</strong>{" "}
        velocidad: cambia si aumenta o frena su tamaño, pero también cambia si
        se desvía su dirección. En un círculo, la dirección de{" "}
        <MathText>{"$\\vec{v}$"}</MathText> gira continuamente.
      </Puente>

      <Definicion termino="Aceleración centrípeta y fuerza centrípeta">
        <Parrafo>
          En todo movimiento circular actúa una{" "}
          <strong>aceleración centrípeta</strong> perpendicular a la velocidad y
          dirigida siempre hacia el centro de la trayectoria:
        </Parrafo>
        <div className="my-2">
          <MathText block>
            {"$a_c = \\frac{v^2}{R} = \\omega^2 R$"}
          </MathText>
        </div>
        <Parrafo>
          Por la segunda ley de Newton, toda aceleración exige una fuerza neta
          en la misma dirección. La resultante radial hacia el centro se llama{" "}
          <strong>fuerza centrípeta</strong>:
        </Parrafo>
        <div className="my-2">
          <MathText block>
            {"$F_c = m a_c = \\frac{m v^2}{R} = m \\omega^2 R$"}
          </MathText>
        </div>
      </Definicion>

      <FiguraCentripeta />

      <PorQue>
        Por la primera ley de Newton, sin fuerza neta un cuerpo seguiría en línea
        recta por la tangente. Para obligarlo a doblar segundo a segundo hacia
        una circunferencia hace falta una fuerza resultante que tire hacia el
        centro. Cuanto más rápido va (<MathText>{"$v$"}</MathText>) o más
        cerrada es la curva (<MathText>{"$R$"}</MathText> pequeño), mayor es la
        fuerza necesaria para curvar su camino. Además, como{" "}
        <MathText>{"$v = \\omega R$"}</MathText>, al reemplazar en{" "}
        <MathText>{"$\\frac{v^2}{R}$"}</MathText> obtienes{" "}
        <MathText>{"$\\frac{(\\omega R)^2}{R} = \\omega^2 R$"}</MathText>.
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md seccion 4.2 pregunta F6.1 */}
      <WorkedExample titulo="Centrífuga de hematología">
        <Parrafo>
          En una centrífuga clínica, un tubo con muestra de sangre de masa{" "}
          <MathText>{"$m = 0{,}02\\ \\text{kg}$"}</MathText> gira a distancia{" "}
          <MathText>{"$r = 0{,}10\\ \\text{m}$"}</MathText> del eje con
          velocidad angular{" "}
          <MathText>{"$\\omega = 100\\ \\text{rad/s}$"}</MathText>. Calcula la
          fuerza centrípeta sobre la muestra.
        </Parrafo>
        <Paso n={1}>
          Anota los datos en unidades SI:{" "}
          <MathText>{"$m = 0{,}02\\ \\text{kg}$"}</MathText>,{" "}
          <MathText>{"$r = 0{,}10\\ \\text{m}$"}</MathText>,{" "}
          <MathText>{"$\\omega = 100\\ \\text{rad/s}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Eleva la velocidad angular al cuadrado:{" "}
          <MathText>{"$\\omega^2 = 100^2 = 10\\,000\\ \\text{rad}^2/\\text{s}^2$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Calcula la aceleración centrípeta:{" "}
          <MathText>
            {"$a_c = \\omega^2 r = 10\\,000 \\times 0{,}10 = 1\\,000\\ \\text{m/s}^2$"}
          </MathText>
          .
        </Paso>
        <Paso n={4}>
          Multiplica por la masa para hallar la fuerza centrípeta:{" "}
          <MathText>
            {"$F_c = m a_c = 0{,}02 \\times 1\\,000 = 20\\ \\text{N}$"}
          </MathText>
          .
        </Paso>
      </WorkedExample>

      <Cuidado>
        La fuerza centrípeta <strong>no es una fuerza nueva</strong> que debas
        añadir aparte al diagrama de cuerpo libre. Es el nombre que recibe la
        resultante hacia el centro de fuerzas reales (tensión, normal, fricción
        o gravedad). Tampoco existe una fuerza física hacia afuera: lo que
        sientes al doblar es tu inercia intentando seguir recto.
      </Cuidado>

      <AutoCheck
        pregunta="Si duplicas la rapidez v de un cuerpo sobre la misma circunferencia de radio R, ¿qué ocurre con la fuerza centrípeta Fc?"
        opciones={[
          "Se duplica (2Fc)",
          "Se cuadruplica (4Fc)",
          "Se reduce a la mitad (Fc/2)",
          "Permanece igual",
        ]}
        correctaIdx={1}
        explicacion="Fc = m·v² / R depende del cuadrado de la rapidez. Al reemplazar v por 2v, obtienes (2v)² = 4v², así que Fc se multiplica por 4."
      />
    </EscenaRica>
  );
}

/* ============================================================================
 *  ESCENA 3 · Curvas con friccion (y nocion de peralte)
 * ============================================================================ */

function EscenaCurvas() {
  return (
    <EscenaRica>
      <Titulo accent="03 · Curvas en carretera">
        Curvas planas con fricción y peralte
      </Titulo>

      <Hook>
        ¿Por qué una ambulancia puede deslizarse hacia afuera en una curva
        mojada aunque el conductor no haya pisado el acelerador?
      </Hook>

      <Puente>
        En las leyes de Newton viste que la fricción estática máxima entre
        llantas y asfalto vale{" "}
        <MathText>{"$f_{s,\\max} = \\mu_s N$"}</MathText>. En una curva plana,
        esa fricción lateral es la única fuerza horizontal capaz de curvar la
        trayectoria del vehículo hacia el centro.
      </Puente>

      <Definicion termino="Rapidez máxima en curva plana y curva peraltada">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Curva plana (sin inclinación):</strong> en el eje vertical{" "}
            <MathText>{"$N = mg$"}</MathText>. En el límite antes de patinar,{" "}
            <MathText>{"$\\frac{m v_{\\max}^2}{R} = \\mu_s m g$"}</MathText>,
            de donde:
            <div className="my-1.5">
              <MathText block>{"$v_{\\max} = \\sqrt{\\mu_s g R}$"}</MathText>
            </div>
          </li>
          <li>
            <strong>Curva con peralte (ángulo <MathText>{"$\\theta$"}</MathText>):</strong>{" "}
            la carretera se inclina hacia adentro para que la componente
            horizontal de la normal ayude a doblar sin depender del rozamiento.
            En la rapidez ideal sin fricción: al dividir la componente radial{" "}
            <MathText>{"$N\\sin\\theta = \\frac{mv^2}{R}$"}</MathText> entre la
            vertical <MathText>{"$N\\cos\\theta = mg$"}</MathText> se obtiene{" "}
            <MathText>{"$\\tan\\theta = \\frac{v^2}{g R}$"}</MathText>.
          </li>
        </ul>
      </Definicion>

      <FiguraCurvaFriccion />

      <PorQue>
        En la ecuación{" "}
        <MathText>{"$\\frac{m v_{\\max}^2}{R} = \\mu_s m g$"}</MathText>, la
        masa <MathText>{"$m$"}</MathText> aparece multiplicando a ambos lados y
        se cancela. Un camión pesado necesita más fuerza centrípeta, pero su
        peso también aumenta la normal <MathText>{"$N$"}</MathText> y por tanto
        la fricción máxima en la misma proporción. Por eso el límite de rapidez{" "}
        <MathText>{"$v_{\\max}$"}</MathText> es el mismo para todo vehículo en
        esa curva.
      </PorQue>

      <Cuidado>
        En un tambor cilíndrico o «pared de la muerte», la pared es vertical:
        la normal <MathText>{"$N$"}</MathText> apunta horizontalmente hacia el
        centro y cumple <MathText>{"$N = \\frac{mv^2}{r}$"}</MathText>, mientras
        que la fricción estática hacia arriba sostiene el peso (
        <MathText>{"$\\mu_s N = mg$"}</MathText>).
      </Cuidado>

      {/* basado en: data/examenes/umss/ingenieria/2025-2op-1-2025.md Pregunta 12 */}
      <WorkedExample titulo="Rapidez límite en curva plana (adaptado de examen UMSS)">
        <Parrafo>
          Un automóvil recorre una curva horizontal plana de radio{" "}
          <MathText>{"$R = 40\\ \\text{m}$"}</MathText> con coeficiente de
          fricción estática <MathText>{"$\\mu_s = 0{,}5$"}</MathText> entre
          llantas y pavimento. Usando{" "}
          <MathText>{"$g = 9{,}8\\ \\text{m/s}^2$"}</MathText>, calcula la
          rapidez máxima que puede mantener sin patinar.
        </Parrafo>
        <Paso n={1}>
          Equilibrio vertical: no hay aceleración hacia arriba ni hacia abajo,
          así que <MathText>{"$N = mg$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Dinámica radial en el límite de adherencia:{" "}
          <MathText>
            {"$\\frac{m v_{\\max}^2}{R} = f_{s,\\max} = \\mu_s m g$"}
          </MathText>
          .
        </Paso>
        <Paso n={3}>
          Cancela la masa <MathText>{"$m$"}</MathText> y despeja:{" "}
          <MathText>{"$v_{\\max} = \\sqrt{\\mu_s g R}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Calcula el producto bajo la raíz:{" "}
          <MathText>
            {"$\\mu_s g R = 0{,}5 \\times 9{,}8 \\times 40 = 4{,}9 \\times 40 = 196\\ \\text{m}^2/\\text{s}^2$"}
          </MathText>
          .
        </Paso>
        <Paso n={5}>
          Extrae la raíz cuadrada:{" "}
          <MathText>
            {"$v_{\\max} = \\sqrt{196} = 14\\ \\text{m/s}$"}
          </MathText>
          .
        </Paso>
      </WorkedExample>

      <Cuidado>
        Cuando las llantas ruedan sin derrapar lateralmente, el rozamiento que
        sostiene la curva es <strong>estático</strong> (<MathText>{"$\\mu_s$"}</MathText>),
        no cinético. Si el pavimento está mojado o con aceite,{" "}
        <MathText>{"$\\mu_s$"}</MathText> baja bruscamente y{" "}
        <MathText>{"$v_{\\max}$"}</MathText> cae con la raíz cuadrada de{" "}
        <MathText>{"$\\mu_s$"}</MathText>.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md seccion 4.2 pregunta F6.2 */}
      <AutoCheck
        pregunta="Un automóvil de 1000 kg toma una curva plana de radio R = 40 m con rapidez v = 20 m/s sin deslizarse. ¿Qué magnitud tiene la fuerza de fricción lateral?"
        opciones={["500 N", "2 000 N", "10 000 N", "40 000 N"]}
        correctaIdx={2}
        explicacion="La fricción lateral provee la fuerza centrípeta necesaria: fs = m·v² / R = 1000 · 20² / 40 = 1000 · 400 / 40 = 10 000 N."
      />
    </EscenaRica>
  );
}

/* ============================================================================
 *  ESCENA 4 · Movimiento circular vertical: tension y velocidad minima
 * ============================================================================ */

function EscenaVertical() {
  return (
    <EscenaRica>
      <Titulo accent="04 · Círculo vertical">
        Movimiento circular vertical: tensión y rapidez mínima
      </Titulo>

      <Hook>
        Si haces girar un recipiente con agua atado a una cuerda en un plano
        vertical y lo pasas suficientemente rápido por arriba, el agua no cae
        aunque quede boca abajo. ¿Qué condición exacta lo impide?
      </Hook>

      <Puente>
        Hasta ahora todas las fuerzas centrípetas eran horizontales y el peso{" "}
        <MathText>{"$mg$"}</MathText> se quedaba perpendicular al plano de giro.
        En un círculo vertical, el peso entra en juego en la dirección radial y
        cambia de papel según esté el cuerpo arriba o abajo.
      </Puente>

      <Definicion termino="Ecuaciones radiales en círculo vertical">
        <Parrafo>
          Adoptando el convenio positivo hacia el centro del círculo:
        </Parrafo>
        <ul className="list-disc pl-5 space-y-1.5 mt-1">
          <li>
            <strong>En el punto más bajo:</strong> la tensión apunta hacia el
            centro y el peso hacia afuera:{" "}
            <MathText>
              {"$T_{\\text{abajo}} - mg = \\frac{m v^2}{R} \\implies T_{\\text{abajo}} = mg + \\frac{m v^2}{R}$"}
            </MathText>
            .
          </li>
          <li>
            <strong>En el punto más alto:</strong> tanto la tensión (o la normal{" "}
            <MathText>{"$N$"}</MathText>) como el peso apuntan hacia el centro:{" "}
            <MathText>
              {"$T_{\\text{arriba}} + mg = \\frac{m v^2}{R} \\implies T_{\\text{arriba}} = \\frac{m v^2}{R} - mg$"}
            </MathText>
            .
          </li>
          <li>
            <strong>Rapidez mínima en lo alto:</strong> ocurre en el límite donde
            la cuerda queda floja o el riel deja de empujar (
            <MathText>{"$T_{\\text{arriba}} = 0$"}</MathText> o{" "}
            <MathText>{"$N = 0$"}</MathText>):{" "}
            <MathText>{"$mg = \\frac{m v_{\\min}^2}{R} \\implies v_{\\min} = \\sqrt{g R}$"}</MathText>
            .
          </li>
        </ul>
      </Definicion>

      <FiguraVertical />

      <PorQue>
        En la cima, la gravedad ya tira hacia abajo, es decir, hacia el centro:
        te ayuda a girar. Si la rapidez es justo{" "}
        <MathText>{"$\\sqrt{gR}$"}</MathText>, el peso basta por sí solo para
        curvar la trayectoria. En cambio, en el punto más bajo la gravedad tira
        hacia afuera del círculo, así que la cuerda debe soportar todo el peso y
        además generar la fuerza centrípeta.
      </PorQue>

      {/* basado en: data/examenes/umss/ingenieria/2025-1op-1-2025.md Pregunta 12 */}
      <WorkedExample titulo="Péndulo soltado desde la horizontal (adaptado de examen UMSS)">
        <Parrafo>
          Una pequeña esfera de peso{" "}
          <MathText>{"$W = mg = 10\\ \\text{N}$"}</MathText> cuelga de una cuerda de
          longitud <MathText>{"$R$"}</MathText>. Se lleva hasta que la cuerda
          queda horizontal y se suelta desde el reposo. Calcula la tensión de la
          cuerda cuando la esfera pasa por el punto más bajo.
        </Parrafo>
        <Paso n={1}>
          Desde la posición horizontal hasta el fondo desciende una altura{" "}
          <MathText>{"$h = R$"}</MathText>. Por conservación de energía
          mecánica: <MathText>{"$m g R = \\frac{1}{2} m v^2$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Cancela <MathText>{"$m$"}</MathText> y despeja{" "}
          <MathText>{"$v^2$"}</MathText>: <MathText>{"$v^2 = 2 g R$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Plantea la fuerza centrípeta en el punto más bajo:{" "}
          <MathText>{"$T - W = \\frac{m v^2}{R}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Sustituye <MathText>{"$v^2 = 2 g R$"}</MathText>:{" "}
          <MathText>
            {"$\\frac{m(2gR)}{R} = 2mg = 2W$"}
          </MathText>
          .
        </Paso>
        <Paso n={5}>
          Despeja la tensión:{" "}
          <MathText>
            {"$T = W + 2W = 3W = 3 \\times 10 = 30\\ \\text{N}$"}
          </MathText>
          .
        </Paso>
      </WorkedExample>

      <Cuidado>
        En un péndulo o círculo vertical, la tensión en el punto más bajo siempre
        es <strong>mayor</strong> que el peso cuando hay movimiento ({" "}
        <MathText>{"$v > 0$"}</MathText>). Nunca pongas{" "}
        <MathText>{"$T = mg$"}</MathText> si la masa se está moviendo por el
        fondo de una curva.
      </Cuidado>

      <AutoCheck
        pregunta="Un carrito recorre un rizo vertical de radio R = 20 m (usa g = 9,8 m/s²). ¿Cuál es la rapidez mínima en la cima para no despegarse de la vía?"
        opciones={["9,8 m/s", "14 m/s", "19,6 m/s", "28 m/s"]}
        correctaIdx={1}
        explicacion="En la cima, cuando N = 0, el peso aporta toda la fuerza centrípeta: v_min = √(g·R) = √(9,8 · 20) = √196 = 14 m/s."
      />
    </EscenaRica>
  );
}

/* ============================================================================
 *  ESCENA 5 · Ley de gravitacion universal de Newton
 * ============================================================================ */

function EscenaGravitacion() {
  return (
    <EscenaRica>
      <Titulo accent="05 · Gravitación universal">
        Ley de gravitación universal de Newton
      </Titulo>

      <Hook>
        ¿Qué tiene en común una manzana que cae en un jardín con la Luna dando
        vueltas alrededor de la Tierra? Newton demostró que ambas obedecen a la
        misma fuerza universal.
      </Hook>

      <Puente>
        La fuerza centrípeta te dice <em>cuánta</em> fuerza hace falta para
        mantener un cuerpo en órbita. Ahora necesitas la ley que explica{" "}
        <em>de dónde sale</em> esa fuerza entre masas separadas en el espacio.
      </Puente>

      <Definicion termino="Ley de gravitación universal">
        <Parrafo>
          Dos cuerpos cualesquiera de masas <MathText>{"$m_1$"}</MathText> y{" "}
          <MathText>{"$m_2$"}</MathText>, cuyos centros están separados una
          distancia <MathText>{"$d$"}</MathText>, se atraen con una fuerza de
          igual magnitud y sentido opuesto a lo largo de la línea que los une:
        </Parrafo>
        <div className="my-2">
          <MathText block>{"$F = G\\,\\frac{m_1\\,m_2}{d^2}$"}</MathText>
        </div>
        <Parrafo>
          donde la constante de gravitación universal vale{" "}
          <MathText>
            {"$G = 6{,}67 \\times 10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$"}
          </MathText>
          .
        </Parrafo>
      </Definicion>

      <FiguraGravitacion />

      <PorQue>
        La atracción gravitatoria sigue una ley del{" "}
        <strong>inverso del cuadrado</strong> (<MathText>{"$1/d^2$"}</MathText>):
        al alejarte el doble, la fuerza no cae a la mitad sino a la cuarta
        parte (<MathText>{"$1/2^2 = 1/4$"}</MathText>); al triple, cae a la
        novena parte (<MathText>{"$1/3^2 = 1/9$"}</MathText>). Además, por la
        tercera ley de Newton, la fuerza que <MathText>{"$m_1$"}</MathText>{" "}
        ejerce sobre <MathText>{"$m_2$"}</MathText> tiene exactamente el mismo
        módulo que la fuerza de <MathText>{"$m_2$"}</MathText> sobre{" "}
        <MathText>{"$m_1$"}</MathText>.
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md seccion 4.2 pregunta F6.3 */}
      <WorkedExample titulo="Cambio de fuerza al triplicar la distancia">
        <Parrafo>
          Dos masas puntuales se atraen con una fuerza gravitatoria de{" "}
          <MathText>{"$F_1 = 36\\ \\text{N}$"}</MathText> cuando están separadas
          una distancia <MathText>{"$d$"}</MathText>. Calcula la nueva fuerza si
          la separación pasa a ser <MathText>{"$d_2 = 3d$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Escribe la fuerza inicial:{" "}
          <MathText>{"$F_1 = G\\,\\frac{m_1 m_2}{d^2} = 36\\ \\text{N}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Reemplaza <MathText>{"$d$"}</MathText> por{" "}
          <MathText>{"$3d$"}</MathText> en la expresión de la nueva fuerza:{" "}
          <MathText>{"$F_2 = G\\,\\frac{m_1 m_2}{(3d)^2}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Desarrolla el cuadrado del denominador:{" "}
          <MathText>{"$(3d)^2 = 9 d^2$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Extrae el factor numérico:{" "}
          <MathText>
            {"$F_2 = \\frac{1}{9}\\left(G\\,\\frac{m_1 m_2}{d^2}\\right) = \\frac{F_1}{9}$"}
          </MathText>
          .
        </Paso>
        <Paso n={5}>
          Sustituye <MathText>{"$F_1 = 36\\ \\text{N}$"}</MathText>:{" "}
          <MathText>{"$F_2 = \\frac{36}{9} = 4\\ \\text{N}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        La distancia <MathText>{"$d$"}</MathText> se mide siempre entre los{" "}
        <strong>centros de masa</strong>, nunca entre las superficies externas.
        Y recuerda no olvidar el exponente cuadrado en el denominador: cambiar{" "}
        <MathText>{"$d$"}</MathText> afecta al cuadrado de la distancia.
      </Cuidado>

      <AutoCheck
        pregunta="Dos cuerpos se atraen con 20 N a distancia d. Si duplicas una de las masas y reduces la distancia a la mitad (d/2), ¿cuál será la nueva fuerza?"
        opciones={["40 N", "80 N", "160 N", "10 N"]}
        correctaIdx={2}
        explicacion="Duplicar una masa multiplica F por 2. Reducir la distancia a d/2 divide el denominador por (1/2)² = 1/4, lo que multiplica F por 4. En total: 2 × 4 × 20 N = 160 N."
      />
    </EscenaRica>
  );
}

/* ============================================================================
 *  ESCENA 6 · Campo gravitatorio y peso a una altura
 * ============================================================================ */

function EscenaCampoAltura() {
  return (
    <EscenaRica>
      <Titulo accent="06 · Gravedad con la altura">
        Campo gravitatorio y peso a una altura
      </Titulo>

      <Hook>
        ¿Por qué los astronautas en la Estación Espacial Internacional flotan si
        a 400 km de altura la gravedad de la Tierra sigue siendo casi el 90 % de
        la que hay en el suelo? Flotan porque están en caída libre continua en
        órbita, pero la gravedad allí sí es menor que en la superficie.
      </Hook>

      <Puente>
        En la dinámica de Newton escribías el peso simplemente como{" "}
        <MathText>{"$P = mg$"}</MathText> con{" "}
        <MathText>{"$g = 9{,}8\\ \\text{m/s}^2$"}</MathText>. Eso es una
        aproximación muy precisa cerca del suelo porque estamos casi siempre a
        una distancia <MathText>{"$R_T$"}</MathText> del centro de la Tierra. Si
        subes muy alto, <MathText>{"$g$"}</MathText> disminuye.
      </Puente>

      <Definicion termino="Intensidad del campo gravitatorio a altura h">
        <Parrafo>
          Igualando el peso <MathText>{"$mg$"}</MathText> con la fuerza
          gravitatoria de un planeta de masa <MathText>{"$M$"}</MathText> y
          radio <MathText>{"$R_T$"}</MathText> a una altura{" "}
          <MathText>{"$h$"}</MathText> sobre la superficie:
        </Parrafo>
        <div className="my-2">
          <MathText block>
            {"$g(h) = \\frac{G M}{(R_T + h)^2} = g_0\\left(\\frac{R_T}{R_T + h}\\right)^2$"}
          </MathText>
        </div>
        <Parrafo>
          donde{" "}
          <MathText>
            {"$g_0 = \\frac{G M}{R_T^2} \\approx 9{,}8\\ \\text{m/s}^2$"}
          </MathText>{" "}
          es la gravedad en la superficie (<MathText>{"$h = 0$"}</MathText>), y el
          peso a esa altura vale <MathText>{"$P(h) = m\\,g(h)$"}</MathText>.
        </Parrafo>
      </Definicion>

      <FiguraAltura />

      <PorQue>
        Al igualar <MathText>{"$m g = G M m / r^2$"}</MathText>, la masa{" "}
        <MathText>{"$m$"}</MathText> del objeto se cancela. Eso explica por qué
        todos los cuerpos en el vacío caen con la misma aceleración{" "}
        <MathText>{"$g$"}</MathText> y por qué medir <MathText>{"$g$"}</MathText>{" "}
        con el cociente <MathText>{"$(R_T / (R_T + h))^2$"}</MathText> evita
        memorizar la masa <MathText>{"$M$"}</MathText> del planeta y la
        constante <MathText>{"$G$"}</MathText>.
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md seccion 4.2 pregunta F6.5 */}
      <WorkedExample titulo="Gravedad y peso a una altura igual al radio terrestre">
        <Parrafo>
          En la superficie terrestre (<MathText>{"$g_0 = 9{,}8\\ \\text{m/s}^2$"}</MathText>),
          un instrumento espacial pesa{" "}
          <MathText>{"$P_0 = 800\\ \\text{N}$"}</MathText>. Calcula la gravedad{" "}
          <MathText>{"$g$"}</MathText> y su peso cuando se encuentra a una
          altura <MathText>{"$h = R_T$"}</MathText> sobre la superficie.
        </Parrafo>
        <Paso n={1}>
          Calcula la distancia desde el centro de la Tierra:{" "}
          <MathText>{"$r = R_T + h = R_T + R_T = 2 R_T$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Aplica el factor de reducción cuadrática:{" "}
          <MathText>
            {"$\\left(\\frac{R_T}{r}\\right)^2 = \\left(\\frac{R_T}{2 R_T}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$"}
          </MathText>
          .
        </Paso>
        <Paso n={3}>
          Calcula la nueva gravedad:{" "}
          <MathText>
            {"$g(h) = \\frac{g_0}{4} = \\frac{9{,}8}{4} = 2{,}45\\ \\text{m/s}^2$"}
          </MathText>
          .
        </Paso>
        <Paso n={4}>
          Como la masa no cambia, el peso se reduce en el mismo factor:{" "}
          <MathText>
            {"$P(h) = \\frac{P_0}{4} = \\frac{800}{4} = 200\\ \\text{N}$"}
          </MathText>
          .
        </Paso>
      </WorkedExample>

      <Cuidado>
        El error más común en este tema es colocar solo <MathText>{"$h$"}</MathText>{" "}
        en el denominador en lugar de <MathText>{"$r = R_T + h$"}</MathText>. Y
        no olvides distinguir masa y peso: la <strong>masa</strong> en kilogramos
        no cambia al subir; lo que cambia es el <strong>peso</strong> en newtons.
      </Cuidado>

      <AutoCheck
        pregunta="¿A qué altura h sobre la superficie de un planeta de radio R la gravedad se reduce a g₀ / 9?"
        opciones={["h = 2R", "h = 3R", "h = 8R", "h = 9R"]}
        correctaIdx={0}
        explicacion="Para que g caiga a g₀ / 9, la distancia al centro r = R + h debe triplicarse (r = 3R, ya que 3² = 9). Como ya estás a una distancia R del centro, la altura sobre la superficie es h = 3R - R = 2R."
      />
    </EscenaRica>
  );
}

/* ============================================================================
 *  ESCENA 7 · Satelites y leyes de Kepler
 * ============================================================================ */

function EscenaKepler() {
  return (
    <EscenaRica>
      <Titulo accent="07 · Órbitas planetarias">
        Satélites y leyes de Kepler
      </Titulo>

      <Hook>
        La Luna tarda unos 27 días en rodear la Tierra, mientras que los
        satélites de comunicaciones geoestacionarios tardan exactamente 24 horas
        para quedarse siempre sobre el mismo punto del ecuador. ¿Por qué cada
        órbita tiene un único periodo posible?
      </Hook>

      <Puente>
        Ya conoces las dos piezas por separado: la fuerza necesaria para girar (
        <MathText>{"$F_c = m\\omega^2 r$"}</MathText>) y la fuerza que aporta la
        gravedad (<MathText>{"$F_g = G M m / r^2$"}</MathText>). Cuando un
        satélite o planeta orbita, la gravedad es exactamente su fuerza
        centrípeta.
      </Puente>

      <Definicion termino="Las tres leyes de Kepler y órbita circular">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            <strong>1.ª ley (órbitas):</strong> los planetas describen órbitas
            elípticas con el Sol en uno de los focos (la circunferencia es el
            caso particular con foco único en el centro).
          </li>
          <li>
            <strong>2.ª ley (áreas):</strong> el segmento que une al Sol con el
            planeta barre áreas iguales en tiempos iguales (se mueve más rápido
            cerca del Sol y más lento lejos).
          </li>
          <li>
            <strong>3.ª ley (periodos, con masa central explícita):</strong> el
            cuadrado del periodo es proporcional al cubo del radio medio{" "}
            <MathText>{"$r$"}</MathText>:
            <div className="my-1.5">
              <MathText block>
                {"$T^2 = \\frac{4\\pi^2}{G M}\\,r^3$"}
              </MathText>
            </div>
            donde <MathText>{"$M$"}</MathText> es la masa del astro central.
          </li>
        </ol>
        <Parrafo>
          Para un satélite en órbita circular de radio <MathText>{"$r$"}</MathText>,
          su rapidez orbital vale:{" "}
          <MathText>{"$v = \\sqrt{\\frac{G M}{r}}$"}</MathText>.
        </Parrafo>
      </Definicion>

      <FiguraKepler />

      <PorQue>
        Al igualar atracción gravitatoria y fuerza centrípeta:{" "}
        <MathText>
          {"$\\frac{G M m}{r^2} = m\\left(\\frac{2\\pi}{T}\\right)^2 r$"}
        </MathText>
        . La masa <MathText>{"$m$"}</MathText> del planeta o satélite desaparece
        de ambos lados y al despejar <MathText>{"$T^2$"}</MathText> aparece la
        tercera ley de Kepler con la masa central <MathText>{"$M$"}</MathText>{" "}
        en el denominador. Así, Newton demostró matemáticamente las leyes
        empíricas de Kepler.
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md seccion 4.2 pregunta F6.4 */}
      <WorkedExample titulo="Periodo orbital por la tercera ley de Kepler">
        <Parrafo>
          Un planeta orbita en trayectoria casi circular a una distancia{" "}
          <MathText>{"$r_2 = 4\\ \\text{UA}$"}</MathText> (
          <MathText>{"$1\\ \\text{UA}$"}</MathText> es la distancia media entre
          la Tierra y el Sol) alrededor de una
          estrella que tiene la misma masa <MathText>{"$M$"}</MathText> que el
          Sol. Sabiendo que la Tierra gira alrededor del Sol a{" "}
          <MathText>{"$r_1 = 1\\ \\text{UA}$"}</MathText> con periodo{" "}
          <MathText>{"$T_1 = 1\\ \\text{año}$"}</MathText>, calcula el periodo{" "}
          <MathText>{"$T_2$"}</MathText> del planeta.
        </Parrafo>
        <Paso n={1}>
          Como ambos giran alrededor de la misma masa central{" "}
          <MathText>{"$M$"}</MathText>, el factor{" "}
          <MathText>{"$\\frac{4\\pi^2}{GM}$"}</MathText> es idéntico en los dos
          casos:{" "}
          <MathText>
            {"$\\frac{T_2^2}{T_1^2} = \\left(\\frac{r_2}{r_1}\\right)^3$"}
          </MathText>
          .
        </Paso>
        <Paso n={2}>
          Sustituye <MathText>{"$r_2 / r_1 = 4 / 1 = 4$"}</MathText> y{" "}
          <MathText>{"$T_1 = 1\\ \\text{año}$"}</MathText>:{" "}
          <MathText>{"$T_2^2 = 1^2 \\times 4^3 = 64$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Extrae la raíz cuadrada:{" "}
          <MathText>{"$T_2 = \\sqrt{64} = 8\\ \\text{años}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Observa el papel de <MathText>{"$M$"}</MathText>: si la estrella
          tuviera cuatro veces la masa solar (<MathText>{"$4 M$"}</MathText>) a
          la misma distancia <MathText>{"$4\\ \\text{UA}$"}</MathText>, la
          fórmula <MathText>{"$T^2 = \\frac{4\\pi^2}{GM} r^3$"}</MathText>{" "}
          dividiría <MathText>{"$T^2$"}</MathText> entre{" "}
          <MathText>{"$4$"}</MathText> y el periodo bajaría a la mitad:{" "}
          <MathText>{"$4\\ \\text{años}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Solo puedes comparar directamente{" "}
        <MathText>{"$T_1^2 / r_1^3 = T_2^2 / r_2^3$"}</MathText> cuando ambos
        cuerpos orbitan la <strong>misma masa central</strong>{" "}
        <MathText>{"$M$"}</MathText>. Para comparar un satélite alrededor de la
        Tierra con un planeta alrededor del Sol debes usar{" "}
        <MathText>{"$T^2 = \\frac{4\\pi^2}{GM} r^3$"}</MathText> con la masa
        correspondiente.
      </Cuidado>

      <AutoCheck
        pregunta="Si colocas un satélite del doble de masa (2m) en la misma órbita circular de radio r alrededor de la Tierra, ¿qué sucede con su rapidez orbital v y su periodo T?"
        opciones={[
          "v se duplica y T se reduce a la mitad",
          "Ambos permanecen iguales",
          "T se duplica y v no cambia",
          "v aumenta en √2",
        ]}
        correctaIdx={1}
        explicacion="Tanto en v = √(GM/r) como en T² = 4π²r³/(GM), la masa m del satélite se cancela. La rapidez y el periodo solo dependen de la masa central M (la Tierra) y del radio r."
      />
    </EscenaRica>
  );
}

/* ============================================================================
 *  ESCENA 8 · Errores y practica final
 * ============================================================================ */

function EscenaErroresPractica() {
  // basado en:
  // 1) data/examenes/umss/ingenieria/2017-3op-1-2017.md Pregunta 11
  // 2) data/examenes/umss/ingenieria/2019-2op-2-2019.md Pregunta 11
  // 3) docs/psa-2027/MFQ_INVENTARIO.md seccion 4.2 pregunta F6.1
  // 4) curva plana con friccion estatica
  // 5) docs/psa-2027/MFQ_INVENTARIO.md seccion 4.2 pregunta F6.4 (variante r = 9 UA)
  const ejercicios: EjercicioLocal[] = [
    {
      p: "Basado en UMSS: En el juego cilíndrico 'pared de la muerte' de radio r = 20 m y coeficiente de fricción μ = 0,5 (usa g = 10 m/s²), ¿qué rapidez mínima necesita la moto para no resbalar hacia abajo?",
      o: ["10 m/s", "15 m/s", "20 m/s", "25 m/s"],
      c: 2,
      ex: "La normal horizontal aporta la fuerza centrípeta ($N = m v^2 / r$) y la fricción sostiene al peso ($\\mu N = mg$). Igualando: $v_{\\min} = \\sqrt{g r / \\mu} = \\sqrt{10 \\times 20 / 0{,}5} = \\sqrt{400} = 20\\ \\text{m/s}$.",
    },
    {
      p: "Basado en UMSS: Un tambor cilíndrico vertical de radio R = 0,20 m gira con coeficiente de rozamiento μs = 0,5 (usa g = 10 m/s²). ¿Cuál es la velocidad angular mínima ω para que una persona apoyada en la pared interna no caiga?",
      o: ["5 rad/s", "10 rad/s", "20 rad/s", "50 rad/s"],
      c: 1,
      ex: "Aquí $N = m\\omega^2 R$ y $\\mu_s N = mg$. Cancelando $m$: $\\omega_{\\min} = \\sqrt{g / (\\mu_s R)} = \\sqrt{10 / (0{,}5 \\times 0{,}20)} = \\sqrt{10 / 0{,}10} = \\sqrt{100} = 10\\ \\text{rad/s}$.",
    },
    {
      p: "En un laboratorio, una centrífuga gira a ω = 100 rad/s con una muestra de masa m = 0,02 kg ubicada a r = 0,10 m del eje. ¿Qué fuerza centrípeta actúa sobre la muestra?",
      o: ["20 N", "2 N", "200 N", "0,2 N"],
      c: 0,
      ex: "Usa la forma angular: $F_c = m\\omega^2 r = 0{,}02 \\times 100^2 \\times 0{,}10 = 0{,}02 \\times 1000 = 20\\ \\text{N}$.",
    },
    {
      p: "Un automóvil toma una curva plana sin peralte de radio R = 90 m con μs = 0,5 (usa g = 9,8 m/s²). ¿Cuál es su rapidez máxima sin deslizar?",
      o: ["14 m/s", "18 m/s", "20 m/s", "21 m/s"],
      c: 3,
      ex: "En curva plana $v_{\\max} = \\sqrt{\\mu_s g R} = \\sqrt{0{,}5 \\times 9{,}8 \\times 90} = \\sqrt{4{,}9 \\times 90} = \\sqrt{441} = 21\\ \\text{m/s}$.",
    },
    {
      p: "Un planeta orbita alrededor de una estrella con la misma masa del Sol a una distancia media r = 9 UA. ¿Cuál es su periodo orbital?",
      o: ["9 años", "27 años", "81 años", "3 años"],
      c: 1,
      ex: "Con la misma masa central que el Sol, $T^2 = r^3$ en años y UA: $T = \\sqrt{9^3} = (\\sqrt{9})^3 = 3^3 = 27\\ \\text{años}$.",
    },
  ];

  return (
    <EscenaRica>
      <Titulo accent="08 · Cierre de unidad">
        Errores típicos y práctica de examen
      </Titulo>

      <Parrafo>
        Antes de resolver el bloque final, revisa las cuatro trampas más
        repetidas en las preguntas de dinámica circular y gravitación del PSA.
      </Parrafo>

      <div className="space-y-3">
        <Misconception titulo="1. Confundir unidades angulares (rpm, Hz y rad/s)">
          <Parrafo>
            No metas revoluciones por minuto dentro de{" "}
            <MathText>{"$v = \\omega R$"}</MathText> ni de{" "}
            <MathText>{"$F_c = m\\omega^2 R$"}</MathText>. Convierte siempre:{" "}
            <MathText>{"$\\text{rpm} \\div 60 \\to \\text{Hz}$"}</MathText> y{" "}
            <MathText>{"$\\text{Hz} \\times 2\\pi \\to \\text{rad/s}$"}</MathText>.
          </Parrafo>
        </Misconception>

        <Misconception titulo="2. Dibujar una fuerza centrífuga en el diagrama de cuerpo libre">
          <Parrafo>
            En un sistema inercial fijo a la Tierra solo existen las fuerzas de
            contacto (tensión, normal, fricción) y la gravedad. La fuerza
            centrípeta es su suma radial hacia el centro, nunca una flecha extra
            hacia afuera.
          </Parrafo>
        </Misconception>

        <Misconception titulo="3. Usar la altura h en lugar de r = RT + h">
          <Parrafo>
            La ley de gravitación mide distancias desde el centro del planeta. A
            una altura <MathText>{"$h = R_T$"}</MathText> estás a{" "}
            <MathText>{"$2 R_T$"}</MathText> del centro y la gravedad cae a{" "}
            <MathText>{"$g_0 / 4$"}</MathText>, no a <MathText>{"$g_0$"}</MathText>.
          </Parrafo>
        </Misconception>

        <Misconception titulo="4. Aplicar T² = r³ con distinta masa central">
          <Parrafo>
            El atajo <MathText>{"$T_1^2 / r_1^3 = T_2^2 / r_2^3$"}</MathText>{" "}
            solo es válido cuando los dos satélites o planetas orbitan la misma
            masa central <MathText>{"$M$"}</MathText>. Si cambia{" "}
            <MathText>{"$M$"}</MathText>, vuelve a{" "}
            <MathText>{"$T^2 = \\frac{4\\pi^2}{G M} r^3$"}</MathText>.
          </Parrafo>
        </Misconception>
      </div>

      <Resumen>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>
            MCU: <MathText>{"$T = 1/f$"}</MathText>,{" "}
            <MathText>{"$\\omega = 2\\pi f = 2\\pi/T$"}</MathText>,{" "}
            <MathText>{"$v = \\omega R$"}</MathText>.
          </li>
          <li>
            Centrípeta: <MathText>{"$a_c = v^2/R = \\omega^2 R$"}</MathText>,{" "}
            <MathText>{"$F_c = m a_c$"}</MathText>.
          </li>
          <li>
            Curva plana: <MathText>{"$v_{\\max} = \\sqrt{\\mu_s g R}$"}</MathText>{" "}
            · Cima vertical mínima: <MathText>{"$v_{\\min} = \\sqrt{gR}$"}</MathText>.
          </li>
          <li>
            Gravitación y Kepler:{" "}
            <MathText>{"$F = G m_1 m_2 / d^2$"}</MathText>,{" "}
            <MathText>{"$g(h) = g_0 (R_T / (R_T+h))^2$"}</MathText>,{" "}
            <MathText>{"$T^2 = \\frac{4\\pi^2}{GM} r^3$"}</MathText>.
          </li>
        </ul>
      </Resumen>

      <PracticaIntegradora ejercicios={ejercicios} />
    </EscenaRica>
  );
}

/* ============================================================================
 *  LECCION PRINCIPAL
 * ============================================================================ */

const escenas: Escena[] = [
  { titulo: "MCU: periodo, frecuencia y ω", componente: EscenaMCU },
  { titulo: "Aceleración y fuerza centrípeta", componente: EscenaCentripeta },
  { titulo: "Curvas con fricción", componente: EscenaCurvas },
  { titulo: "Movimiento circular vertical", componente: EscenaVertical },
  { titulo: "Ley de gravitación universal", componente: EscenaGravitacion },
  { titulo: "Campo gravitatorio y altura", componente: EscenaCampoAltura },
  { titulo: "Satélites y leyes de Kepler", componente: EscenaKepler },
  { titulo: "Errores y práctica", componente: EscenaErroresPractica },
];

export default function DinamicaCircularGravitacionPage() {
  return (
    <LeccionShell
      unidad="FIS-08"
      tituloUnidad="Dinámica circular y gravitación universal"
      escenas={escenas}
    />
  );
}

/* VERIFICACIÓN:
 * 1) Escena 1 WorkedExample (umss/ingenieria/2025-2op-1-2025.md P10):
 *    Datos: omega_1 = 8*pi rad/s, omega_2 = 2*pi rad/s, sentidos contrarios, R = 10 m.
 *    Formula: (omega_1 + omega_2)*t = 2*pi => t = 2*pi / (10*pi) = 1/5 = 0,2 s. Correcto.
 * 2) Escena 1 AutoCheck:
 *    Datos: 300 rpm. Formula: f = 300/60 = 5 Hz; T = 1/f = 1/5 = 0,2 s. Correcto.
 * 3) Escena 2 WorkedExample (MFQ_INVENTARIO F6.1):
 *    Datos: m = 0,02 kg, r = 0,10 m, omega = 100 rad/s.
 *    Formula: omega^2 = 10000; a_c = 10000 * 0,10 = 1000 m/s^2; F_c = 0,02 * 1000 = 20 N. Correcto.
 * 4) Escena 2 AutoCheck:
 *    Datos: v -> 2v, mismo R, misma m. Formula: F_c = m*(2v)^2 / R = 4*(m*v^2/R) = 4*F_c. Correcto.
 * 5) Escena 3 WorkedExample (umss/ingenieria/2025-2op-1-2025.md P12):
 *    Datos: R = 40 m, mu_s = 0,5, g = 9,8 m/s^2.
 *    Formula: v_max = sqrt(mu_s * g * R) = sqrt(0,5 * 9,8 * 40) = sqrt(4,9 * 40) = sqrt(196) = 14 m/s. Correcto.
 * 6) Escena 3 AutoCheck (MFQ_INVENTARIO F6.2):
 *    Datos: m = 1000 kg, R = 40 m, v = 20 m/s.
 *    Formula: f_s = m*v^2 / R = 1000 * 400 / 40 = 1000 * 10 = 10000 N. Correcto.
 * 7) Escena 4 WorkedExample (umss/ingenieria/2025-1op-1-2025.md P12):
 *    Datos: W = 10 N, se suelta desde cuerda horizontal (h = R).
 *    Formula: m*g*R = 0,5*m*v^2 => v^2 = 2*g*R; en el punto mas bajo T - W = m*v^2/R = 2*m*g = 2*W => T = 3*W = 30 N. Correcto.
 * 8) Escena 4 AutoCheck:
 *    Datos: R = 20 m, g = 9,8 m/s^2.
 *    Formula: v_min = sqrt(g*R) = sqrt(9,8 * 20) = sqrt(196) = 14 m/s. Correcto.
 * 9) Escena 5 WorkedExample (MFQ_INVENTARIO F6.3):
 *    Datos: F_1 = 36 N a distancia d, nueva distancia d_2 = 3d.
 *    Formula: F_2 = F_1 / 3^2 = 36 / 9 = 4 N. Correcto.
 * 10) Escena 5 AutoCheck:
 *    Datos: F_1 = 20 N, m_1 -> 2*m_1, d -> d/2.
 *    Formula: F_2 = 2 * F_1 / (1/2)^2 = 2 * 4 * 20 = 160 N. Correcto.
 * 11) Escena 6 WorkedExample (MFQ_INVENTARIO F6.5):
 *    Datos: P_0 = 800 N, g_0 = 9,8 m/s^2, h = R_T => r = 2*R_T.
 *    Formula: factor = (R_T / 2R_T)^2 = 1/4; g(h) = 9,8 / 4 = 2,45 m/s^2; P(h) = 800 / 4 = 200 N. Correcto.
 * 12) Escena 6 AutoCheck:
 *    Datos: g(h) = g_0 / 9.
 *    Formula: (R / (R+h))^2 = 1/9 => R+h = 3*R => h = 2*R. Correcto.
 * 13) Escena 7 WorkedExample (MFQ_INVENTARIO F6.4 + masa central M):
 *    Datos: r_1 = 1 UA, T_1 = 1 año, r_2 = 4 UA, misma masa central M = M_Sol.
 *    Formula: T_2 = sqrt(4^3) = sqrt(64) = 8 años. Si M' = 4*M => T_2' = sqrt(64 / 4) = sqrt(16) = 4 años. Correcto.
 * 14) Escena 7 AutoCheck:
 *    Datos: m -> 2m, mismo r y M.
 *    Formula: v = sqrt(GM/r) y T^2 = 4*pi^2*r^3/(GM) independientes de m => ambos iguales. Correcto.
 * 15) Escena 8 PracticaIntegradora:
 *    - Ej1 (umss/ingenieria/2017-3op-1-2017.md P11): r = 20 m, mu = 0,5, g = 10 => v = sqrt(10*20/0,5) = sqrt(400) = 20 m/s.
 *    - Ej2 (umss/ingenieria/2019-2op-2-2019.md P11): R = 0,20 m, mu_s = 0,5, g = 10 => omega = sqrt(10/(0,5*0,20)) = sqrt(100) = 10 rad/s.
 *    - Ej3 (MFQ_INVENTARIO F6.1): m = 0,02 kg, omega = 100 rad/s, r = 0,10 m => Fc = 0,02*10000*0,10 = 20 N.
 *    - Ej4: R = 90 m, mu_s = 0,5, g = 9,8 => v_max = sqrt(0,5*9,8*90) = sqrt(441) = 21 m/s.
 *    - Ej5 (variante F6.4): r = 9 UA, M = M_Sol => T = sqrt(9^3) = 3^3 = 27 años.
 */
