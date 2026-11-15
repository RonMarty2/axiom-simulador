"use client";

import { useEffect, useState } from "react";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo,
  Parrafo,
  Definicion,
  Puente,
  PorQue,
  Paso,
  Cuidado,
  Resumen,
  EscenaRica,
  AutoCheck,
  Hook,
  Misconception,
  WorkedExample,
} from "../_components/pedagogia";
import { Pizarra, LIENZO } from "../_components/lienzo";
import MathText from "../../components/MathText";

// =============================================================================
// Constantes y figuras SVG con coordenadas calculadas (ancho maximo <= 360 px)
// =============================================================================

const SVG_W = 360;

/**
 * Escena 1 · Diagrama de pulso viajero:
 * El pulso gaussiano avanza a lo largo de x mientras los 5 marcadores del medio
 * solo suben y bajan sobre su eje vertical fijo.
 */
function DiagramaPulsoOnda() {
  const [posicion, setPosicion] = useState(110);
  const [animando, setAnimando] = useState(false);

  useEffect(() => {
    if (!animando) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let rafId = 0;
    let ultimo = performance.now();
    const paso = (ahora: number) => {
      const dt = Math.min((ahora - ultimo) / 1000, 0.05);
      ultimo = ahora;
      setPosicion((prev) => {
        const sig = prev + 85 * dt;
        return sig > 305 ? 55 : sig;
      });
      rafId = requestAnimationFrame(paso);
    };
    rafId = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(rafId);
  }, [animando]);

  const H = 152;
  const X_INI = 28;
  const X_FIN = 332;
  const Y_EJE = 104;
  const AMP = 54;
  const SIGMA = 22;
  const N_MUESTRAS = 76;

  const yPulso = (x: number) => {
    const dx = x - posicion;
    return Y_EJE - AMP * Math.exp(-(dx * dx) / (2 * SIGMA * SIGMA));
  };

  const puntos = Array.from({ length: N_MUESTRAS + 1 }, (_, i) => {
    const x = X_INI + ((X_FIN - X_INI) * i) / N_MUESTRAS;
    return `${x.toFixed(1)},${yPulso(x).toFixed(1)}`;
  }).join(" ");

  const marcadores = [76, 128, 180, 232, 284];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${SVG_W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          {/* Linea de equilibrio */}
          <line
            x1={X_INI}
            y1={Y_EJE}
            x2={X_FIN}
            y2={Y_EJE}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* Flecha de direccion de propagacion de la energia */}
          <line
            x1={posicion - 24}
            y1={24}
            x2={posicion + 24}
            y2={24}
            stroke={LIENZO.ok}
            strokeWidth={2}
          />
          <polygon
            points={`${posicion + 24},20 ${posicion + 32},24 ${posicion + 24},28`}
            fill={LIENZO.ok}
          />
          <text
            x={posicion}
            y={15}
            fill={LIENZO.ok}
            fontSize={10}
            fontFamily="var(--font-sans)"
            textAnchor="middle"
          >
            energía (v)
          </text>

          {/* Guias verticales de oscilacion para cada partícula */}
          {marcadores.map((mx) => (
            <line
              key={`g-${mx}`}
              x1={mx}
              y1={Y_EJE - AMP - 6}
              x2={mx}
              y2={Y_EJE + 10}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
              strokeDasharray="2 3"
            />
          ))}

          {/* Perfil de la cuerda */}
          <polyline
            fill="none"
            stroke={COLOR_BASE}
            strokeWidth={2.5}
            points={puntos}
          />

          {/* Particulas del medio: su x es fija, solo cambia su y */}
          {marcadores.map((mx, idx) => {
            const my = yPulso(mx);
            const esCentro = idx === 2;
            return (
              <g key={`p-${mx}`}>
                <circle
                  cx={mx}
                  cy={my}
                  r={esCentro ? 5.5 : 4}
                  fill={esCentro ? COLOR_EXP : LIENZO.fg}
                  stroke={LIENZO.bg}
                  strokeWidth={1.2}
                />
                {esCentro && (
                  <text
                    x={mx}
                    y={Y_EJE + 22}
                    fill={COLOR_EXP}
                    fontSize={10}
                    fontFamily="var(--font-sans)"
                    textAnchor="middle"
                  >
                    solo sube y baja
                  </text>
                )}
              </g>
            );
          })}

          <text
            x={X_INI}
            y={H - 8}
            fill={LIENZO.fgDim}
            fontSize={10}
            fontFamily="var(--font-sans)"
          >
            x del pulso: {Math.round(posicion)} px (materia fija en su lugar)
          </text>
        </svg>
      </Pizarra>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => setAnimando((v) => !v)}
          style={{
            padding: "5px 12px",
            borderRadius: 6,
            border: `1px solid ${COLOR_BASE}`,
            background: animando ? "rgba(56, 189, 248, 0.18)" : "transparent",
            color: LIENZO.fg,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {animando ? "Pausar pulso" : "Animar pulso"}
        </button>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: LIENZO.fgDim, flex: 1, minWidth: 160 }}>
          <span>Mover pulso:</span>
          <input
            type="range"
            min={55}
            max={305}
            value={Math.round(posicion)}
            onChange={(e) => {
              setAnimando(false);
              setPosicion(Number(e.target.value));
            }}
            style={{ flex: 1 }}
          />
        </label>
      </div>
    </div>
  );
}

/**
 * Escena 2 · Comparacion transversal vs. longitudinal con fase controlada.
 */
function DiagramaTransversalLongitudinal() {
  const [faseDeg, setFaseDeg] = useState(40);
  const fase = (faseDeg * Math.PI) / 180;

  const H = 192;
  const X_INI = 32;
  const X_FIN = 328;
  const SPAN = X_FIN - X_INI;
  const N_TRANS = 15;
  const N_LONG = 19;
  const Y_TRANS = 56;
  const AMP_T = 22;
  const Y_LONG = 138;
  const AMP_L = 10;
  const CICLOS = 2;
  const K = (2 * Math.PI * CICLOS) / SPAN;

  const partTrans = Array.from({ length: N_TRANS }, (_, i) => {
    const x = X_INI + (SPAN * i) / (N_TRANS - 1);
    const y = Y_TRANS - AMP_T * Math.sin(K * (x - X_INI) - fase);
    return { x, y, i };
  });

  const partLong = Array.from({ length: N_LONG }, (_, i) => {
    const x0 = X_INI + (SPAN * i) / (N_LONG - 1);
    const x = x0 + AMP_L * Math.sin(K * (x0 - X_INI) - fase);
    return { x0, x, i };
  });

  // Posicion de una compresion aproximada (donde dx/dx0 es minimo: cos(...) < 0)
  // Sin(k*u - fase) tiene derivada maxima positiva en k*u - fase = 0 (rarefaccion)
  // y derivada maxima negativa en k*u - fase = pi (compresion).
  const L_PX = SPAN / CICLOS;
  const uCompRaw = ((Math.PI + fase) % (2 * Math.PI)) / K;
  const uRareRaw = (fase % (2 * Math.PI)) / K;
  const uCompNorm = uCompRaw < 0 ? uCompRaw + L_PX : uCompRaw;
  const uRareNorm = uRareRaw < 0 ? uRareRaw + L_PX : uRareRaw;
  const xComp = X_INI + (uCompNorm < 42 ? uCompNorm + L_PX : uCompNorm);
  const xRare = X_INI + (uRareNorm < 42 ? uRareNorm + L_PX : uRareNorm);

  const idxDestT = 5;
  const pDestT = partTrans[idxDestT];
  const idxDestL = 9;
  const pDestL = partLong[idxDestL];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${SVG_W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          {/* Seccion transversal */}
          <text x={X_INI} y={18} fill={COLOR_BASE} fontSize={11} fontWeight={700} fontFamily="var(--font-sans)">
            1. Onda transversal (oscilación perpendicular a v)
          </text>
          <line x1={X_INI} y1={Y_TRANS} x2={X_FIN} y2={Y_TRANS} stroke={LIENZO.fgFaint} strokeDasharray="3 3" />

          {/* Flecha de propagacion */}
          <line x1={264} y1={26} x2={316} y2={26} stroke={LIENZO.ok} strokeWidth={1.8} />
          <polygon points="316,22 324,26 316,30" fill={LIENZO.ok} />
          <text x={290} y={20} fill={LIENZO.ok} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
            v
          </text>

          {/* Guia vertical de particula destacada */}
          <line
            x1={pDestT.x}
            y1={Y_TRANS - AMP_T - 4}
            x2={pDestT.x}
            y2={Y_TRANS + AMP_T + 4}
            stroke={COLOR_EXP}
            strokeWidth={1.4}
          />

          <polyline
            fill="none"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth={2}
            points={partTrans.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
          />

          {partTrans.map((p) => (
            <circle
              key={`pt-${p.i}`}
              cx={p.x}
              cy={p.y}
              r={p.i === idxDestT ? 5 : 3.5}
              fill={p.i === idxDestT ? COLOR_EXP : COLOR_BASE}
            />
          ))}

          {/* Divisor */}
          <line x1={16} y1={96} x2={SVG_W - 16} y2={96} stroke="rgba(255,255,255,0.1)" />

          {/* Seccion longitudinal */}
          <text x={X_INI} y={112} fill={COLOR_EXP} fontSize={11} fontWeight={700} fontFamily="var(--font-sans)">
            2. Onda longitudinal (oscilación paralela a v)
          </text>
          <line x1={X_INI} y1={Y_LONG} x2={X_FIN} y2={Y_LONG} stroke={LIENZO.fgFaint} strokeDasharray="3 3" />

          {/* Flecha horizontal de oscilacion sobre particula destacada */}
          <line
            x1={pDestL.x0 - AMP_L - 4}
            y1={Y_LONG + 16}
            x2={pDestL.x0 + AMP_L + 4}
            y2={Y_LONG + 16}
            stroke={COLOR_EXP}
            strokeWidth={1.5}
          />
          <text
            x={pDestL.x0}
            y={Y_LONG + 28}
            fill={COLOR_EXP}
            fontSize={9.5}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
          >
            vaivén horizontal
          </text>

          {partLong.map((p) => (
            <line
              key={`pl-tick-${p.i}`}
              x1={p.x}
              y1={Y_LONG - 12}
              x2={p.x}
              y2={Y_LONG + 12}
              stroke={p.i === idxDestL ? COLOR_EXP : LIENZO.fgDim}
              strokeWidth={p.i === idxDestL ? 2.4 : 1.5}
            />
          ))}

          {/* Etiquetas dinamicas de compresion y rarefaccion */}
          <text x={xComp} y={Y_LONG - 17} fill={LIENZO.ok} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
            compresión
          </text>
          <text x={xRare} y={Y_LONG - 17} fill={LIENZO.fgDim} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
            rarefacción
          </text>
        </svg>
      </Pizarra>

      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: LIENZO.fgDim }}>
        <span>Avanzar fase de vibración:</span>
        <input
          type="range"
          min={0}
          max={360}
          value={faseDeg}
          onChange={(e) => setFaseDeg(Number(e.target.value))}
          style={{ flex: 1 }}
        />
      </label>
    </div>
  );
}

/**
 * Escena 3 · Elementos geometricos y temporales de la onda (λ, A, cresta, valle).
 */
function DiagramaElementosOnda() {
  const [ampCm, setAmpCm] = useState(4);
  const [nCiclos, setNCiclos] = useState(2);

  const H = 176;
  const X0 = 28;
  const SPAN = 304;
  const Y_MID = 96;
  // Escala visual: 1 cm -> 9 px (max 5 cm -> 45 px)
  const ampPx = ampCm * 9;
  const lambdaSpanPx = SPAN / nCiclos;

  // Primer pico (cresta 1): sin = +1 -> 1/4 de ciclo
  const xCresta1 = X0 + 0.25 * lambdaSpanPx;
  const yCresta = Y_MID - ampPx;
  // Segunda cresta: 5/4 de ciclo (siempre dentro de X0..X0+SPAN para nCiclos >= 1.5)
  const xCresta2 = X0 + 1.25 * lambdaSpanPx;
  // Primer valle: sin = -1 -> 3/4 de ciclo
  const xValle1 = X0 + 0.75 * lambdaSpanPx;
  const yValle = Y_MID + ampPx;

  const N_PTS = 90;
  const pts = Array.from({ length: N_PTS + 1 }, (_, i) => {
    const x = X0 + (SPAN * i) / N_PTS;
    const theta = (2 * Math.PI * nCiclos * (x - X0)) / SPAN;
    const y = Y_MID - ampPx * Math.sin(theta);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const lambdaM = Number((6 / nCiclos).toFixed(2));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${SVG_W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          {/* Linea de equilibrio */}
          <line x1={X0} y1={Y_MID} x2={X0 + SPAN} y2={Y_MID} stroke={LIENZO.fgFaint} strokeDasharray="4 4" />
          <text x={X0 + SPAN - 2} y={Y_MID - 4} fill={LIENZO.fgDim} fontSize={9.5} textAnchor="end" fontFamily="var(--font-sans)">
            equilibrio
          </text>

          {/* Onda */}
          <polyline fill="none" stroke={COLOR_BASE} strokeWidth={2.5} points={pts} />

          {/* Cota de amplitud A (desde equilibrio hasta cresta 1) */}
          <line x1={xCresta1} y1={Y_MID} x2={xCresta1} y2={yCresta} stroke={COLOR_EXP} strokeWidth={2} />
          <circle cx={xCresta1} cy={yCresta} r={4} fill={COLOR_EXP} />
          <text
            x={xCresta1 + 6}
            y={(Y_MID + yCresta) / 2 + 3}
            fill={COLOR_EXP}
            fontSize={10.5}
            fontWeight={700}
            fontFamily="var(--font-sans)"
          >
            A = {ampCm} cm
          </text>

          {/* Etiqueta cresta y valle */}
          <text x={xCresta1} y={yCresta - 7} fill={LIENZO.fg} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
            cresta
          </text>
          <circle cx={xValle1} cy={yValle} r={3.5} fill={LIENZO.fgDim} />
          <text x={xValle1} y={yValle + 13} fill={LIENZO.fgDim} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
            valle
          </text>

          {/* Cota horizontal de longitud de onda λ entre dos crestas consecutivas */}
          <line x1={xCresta1} y1={24} x2={xCresta2} y2={24} stroke={LIENZO.ok} strokeWidth={1.8} />
          <line x1={xCresta1} y1={20} x2={xCresta1} y2={yCresta - 14} stroke="rgba(34,197,94,0.4)" strokeDasharray="2 2" />
          <line x1={xCresta2} y1={20} x2={xCresta2} y2={yCresta - 4} stroke="rgba(34,197,94,0.4)" strokeDasharray="2 2" />
          <text
            x={(xCresta1 + xCresta2) / 2}
            y={16}
            fill={LIENZO.ok}
            fontSize={10.5}
            fontWeight={700}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
          >
            λ = {String(lambdaM).replace(".", ",")} m
          </text>

          <text x={X0} y={H - 8} fill={LIENZO.fgDim} fontSize={10} fontFamily="var(--font-sans)">
            Tramo mostrado: 6,0 m · De valle a cresta mide 2A = {ampCm * 2} cm
          </text>
        </svg>
      </Pizarra>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: LIENZO.fgDim }}>
          <span>Amplitud A: {ampCm} cm</span>
          <input
            type="range"
            min={2}
            max={5}
            step={1}
            value={ampCm}
            onChange={(e) => setAmpCm(Number(e.target.value))}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: LIENZO.fgDim }}>
          <span>Ciclos en 6,0 m: {nCiclos}</span>
          <input
            type="range"
            min={1.5}
            max={3}
            step={0.5}
            value={nCiclos}
            onChange={(e) => setNCiclos(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

/**
 * Escena 4 · Cuerda tensa con masa colgante: tension F y densidad lineal μ fijan v.
 */
function DiagramaCuerdaTensa() {
  const tensiones = [16, 36, 64] as const;
  const [tension, setTension] = useState<(typeof tensiones)[number]>(36);
  // Densidad lineal fija μ = 0,01 kg/m y frecuencia del vibrador f = 30 Hz
  const mu = 0.01;
  const f = 30;
  const v = Math.sqrt(tension / mu); // 40, 60 o 80 m/s
  const lambda = v / f;

  const H = 152;
  const X_INI = 38;
  const X_POLEA = 292;
  const Y_CUERDA = 62;
  const SPAN = X_POLEA - X_INI;
  // Numero de ciclos visibles en 4 m de cuerda (L = 4 m): L / lambda
  const ciclosVis = 4 / lambda;
  const AMP = 14;

  const pts = Array.from({ length: 81 }, (_, i) => {
    const x = X_INI + (SPAN * i) / 80;
    const y = Y_CUERDA - AMP * Math.sin((2 * Math.PI * ciclosVis * (x - X_INI)) / SPAN);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${SVG_W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          {/* Vibrador izquierdo */}
          <rect x={16} y={Y_CUERDA - 14} width={22} height={28} rx={4} fill="rgba(56,189,248,0.18)" stroke={COLOR_BASE} />
          <text x={27} y={Y_CUERDA + 4} fill={COLOR_BASE} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
            30 Hz
          </text>

          {/* Linea de equilibrio y onda */}
          <line x1={X_INI} y1={Y_CUERDA} x2={X_POLEA} y2={Y_CUERDA} stroke={LIENZO.fgFaint} strokeDasharray="3 3" />
          <polyline fill="none" stroke={COLOR_BASE} strokeWidth={2.3} points={pts} />

          {/* Polea derecha y bloque colgante */}
          <circle cx={X_POLEA} cy={Y_CUERDA + 8} r={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <line x1={X_POLEA + 8} y1={Y_CUERDA + 8} x2={X_POLEA + 8} y2={112} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <rect x={X_POLEA - 8} y={112} width={32} height={22} rx={3} fill="rgba(249,115,22,0.2)" stroke={COLOR_EXP} />
          <text x={X_POLEA + 8} y={126} fill={COLOR_EXP} fontSize={10} fontWeight={700} textAnchor="middle" fontFamily="var(--font-sans)">
            F={tension}N
          </text>

          {/* Lecturas calculadas */}
          <text x={18} y={22} fill={LIENZO.fg} fontSize={11} fontWeight={700} fontFamily="var(--font-sans)">
            μ = 0,01 kg/m · v = √(F/μ) = {v} m/s · λ = v/f = {lambda.toFixed(2).replace(".", ",")} m
          </text>
          <text x={18} y={H - 10} fill={LIENZO.ok} fontSize={10} fontFamily="var(--font-sans)">
            Al subir la tensión F, la onda avanza más rápido y λ se estira
          </text>
        </svg>
      </Pizarra>

      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: LIENZO.fgDim }}>Elige la tensión F:</span>
        {tensiones.map((tVal) => (
          <button
            key={tVal}
            type="button"
            onClick={() => setTension(tVal)}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid ${tension === tVal ? COLOR_EXP : "rgba(255,255,255,0.2)"}`,
              background: tension === tVal ? "rgba(249,115,22,0.2)" : "transparent",
              color: LIENZO.fg,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            F = {tVal} N
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Escena 5 · Escala de decibeles e intensidad fisica (factores de 10).
 */
function DiagramaDecibeles() {
  const niveles = [
    { db: 0, nombre: "Umbral auditivo", sup: "⁻¹²" },
    { db: 30, nombre: "Susurro suave", sup: "⁻⁹" },
    { db: 60, nombre: "Conversación", sup: "⁻⁶" },
    { db: 90, nombre: "Tráfico intenso", sup: "⁻³" },
    { db: 120, nombre: "Umbral de dolor", sup: "⁰" },
  ] as const;

  const [selDb, setSelDb] = useState<number>(60);

  const H = 156;
  const X_INI = 32;
  const X_FIN = 328;
  const SPAN = X_FIN - X_INI;
  const Y_BAR = 74;

  const posX = (db: number) => X_INI + (SPAN * db) / 120;
  const activo = niveles.find((n) => n.db === selDb) ?? niveles[2];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${SVG_W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          <text x={X_INI} y={24} fill={LIENZO.fg} fontSize={11} fontWeight={700} fontFamily="var(--font-sans)">
            {activo.nombre}: {activo.db} dB equivale a I = 10{activo.sup} W/m²
          </text>
          <text x={X_INI} y={40} fill={LIENZO.fgDim} fontSize={10} fontFamily="var(--font-sans)">
            Cada salto de +30 dB multiplica I por 1000 (y +10 dB por 10)
          </text>

          {/* Barra base */}
          <rect x={X_INI} y={Y_BAR - 4} width={SPAN} height={8} rx={4} fill="rgba(255,255,255,0.1)" />
          <rect x={X_INI} y={Y_BAR - 4} width={posX(selDb) - X_INI} height={8} rx={4} fill={COLOR_BASE} />

          {/* Marcas */}
          {niveles.map((n) => {
            const x = posX(n.db);
            const esSel = n.db === selDb;
            return (
              <g key={n.db}>
                <circle
                  cx={x}
                  cy={Y_BAR}
                  r={esSel ? 7 : 4.5}
                  fill={esSel ? COLOR_EXP : LIENZO.bgSoft}
                  stroke={esSel ? COLOR_EXP : LIENZO.fgDim}
                  strokeWidth={1.8}
                />
                <text
                  x={x}
                  y={Y_BAR + 22}
                  fill={esSel ? COLOR_EXP : LIENZO.fg}
                  fontSize={10.5}
                  fontWeight={esSel ? 700 : 400}
                  textAnchor="middle"
                  fontFamily="var(--font-sans)"
                >
                  {n.db} dB
                </text>
                <text
                  x={x}
                  y={Y_BAR + 36}
                  fill={LIENZO.fgDim}
                  fontSize={9.5}
                  textAnchor="middle"
                  fontFamily="var(--font-sans)"
                >
                  10{n.sup}
                </text>
              </g>
            );
          })}

          <text x={X_INI} y={H - 12} fill={LIENZO.ok} fontSize={10} fontFamily="var(--font-sans)">
            Ley del cuadrado inverso: si duplicas la distancia r, I cae a I / 4
          </text>
        </svg>
      </Pizarra>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {niveles.map((n) => (
          <button
            key={n.db}
            type="button"
            onClick={() => setSelDb(n.db)}
            style={{
              padding: "4px 8px",
              borderRadius: 6,
              border: `1px solid ${selDb === n.db ? COLOR_EXP : "rgba(255,255,255,0.2)"}`,
              background: selDb === n.db ? "rgba(249,115,22,0.2)" : "transparent",
              color: LIENZO.fg,
              fontSize: 11.5,
              cursor: "pointer",
            }}
          >
            {n.db} dB
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Escena 6 · Eco frente a muro (2d) vs. pozo con caida libre (t1 + t2).
 */
function DiagramaEcoPozo() {
  const [modo, setModo] = useState<"eco" | "pozo">("eco");
  const H = 166;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${SVG_W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          {modo === "eco" ? (
            <g>
              <text x={20} y={20} fill={COLOR_BASE} fontSize={11} fontWeight={700} fontFamily="var(--font-sans)">
                Eco con persona quieta: el sonido recorre 2d = v_s · t
              </text>

              {/* Persona */}
              <circle cx={64} cy={72} r={8} fill={COLOR_BASE} />
              <line x1={64} y1={80} x2={64} y2={114} stroke={COLOR_BASE} strokeWidth={2.5} />
              <line x1={52} y1={134} x2={64} y2={114} stroke={COLOR_BASE} strokeWidth={2.2} />
              <line x1={76} y1={134} x2={64} y2={114} stroke={COLOR_BASE} strokeWidth={2.2} />

              {/* Muro */}
              <rect x={294} y={40} width={22} height={96} fill="rgba(255,255,255,0.14)" stroke={LIENZO.fgDim} />
              <text x={305} y={34} fill={LIENZO.fgDim} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
                muro
              </text>

              {/* Flecha de ida */}
              <line x1={82} y1={66} x2={284} y2={66} stroke={LIENZO.ok} strokeWidth={2} />
              <polygon points="284,62 292,66 284,70" fill={LIENZO.ok} />
              <text x={184} y={58} fill={LIENZO.ok} fontSize={10} textAnchor="middle" fontFamily="var(--font-sans)">
                ida: d (emisión)
              </text>

              {/* Flecha de vuelta */}
              <line x1={290} y1={94} x2={88} y2={94} stroke={COLOR_EXP} strokeWidth={2} strokeDasharray="5 3" />
              <polygon points="88,90 80,94 88,98" fill={COLOR_EXP} />
              <text x={184} y={110} fill={COLOR_EXP} fontSize={10} textAnchor="middle" fontFamily="var(--font-sans)">
                vuelta: d (eco)
              </text>

              {/* Cota distancia d */}
              <line x1={64} y1={146} x2={294} y2={146} stroke={LIENZO.fgFaint} />
              <text x={180} y={158} fill={LIENZO.fg} fontSize={10.5} textAnchor="middle" fontFamily="var(--font-sans)">
                distancia al muro: d = (v_s · t) / 2
              </text>
            </g>
          ) : (
            <g>
              <text x={20} y={20} fill={COLOR_EXP} fontSize={11} fontWeight={700} fontFamily="var(--font-sans)">
                Pozo con eco: t_total = t1 (cae piedra) + t2 (sube sonido)
              </text>

              {/* Bordes del pozo */}
              <rect x={96} y={36} width={16} height={106} fill="rgba(255,255,255,0.12)" />
              <rect x={232} y={36} width={16} height={106} fill="rgba(255,255,255,0.12)" />
              <rect x={112} y={134} width={120} height={8} fill={COLOR_BASE} opacity={0.45} />

              {/* Bajada: piedra */}
              <line x1={142} y1={42} x2={142} y2={124} stroke={COLOR_EXP} strokeWidth={2} />
              <polygon points="138,124 142,132 146,124" fill={COLOR_EXP} />
              <circle cx={142} cy={80} r={5} fill={COLOR_EXP} />
              <text x={88} y={82} fill={COLOR_EXP} fontSize={10} textAnchor="end" fontFamily="var(--font-sans)">
                t1: h = 1/2 g t1²
              </text>

              {/* Subida: sonido */}
              <line x1={196} y1={130} x2={196} y2={48} stroke={LIENZO.ok} strokeWidth={2} strokeDasharray="4 3" />
              <polygon points="192,48 196,40 200,48" fill={LIENZO.ok} />
              <text x={254} y={82} fill={LIENZO.ok} fontSize={10} fontFamily="var(--font-sans)">
                t2: h = v_s · t2
              </text>

              <text x={180} y={158} fill={LIENZO.fg} fontSize={10.5} textAnchor="middle" fontFamily="var(--font-sans)">
                Ambas etapas recorren la misma profundidad h
              </text>
            </g>
          )}
        </svg>
      </Pizarra>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => setModo("eco")}
          style={{
            padding: "5px 10px",
            borderRadius: 6,
            border: `1px solid ${modo === "eco" ? COLOR_BASE : "rgba(255,255,255,0.2)"}`,
            background: modo === "eco" ? "rgba(56,189,248,0.18)" : "transparent",
            color: LIENZO.fg,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Eco frente a muro (2d)
        </button>
        <button
          type="button"
          onClick={() => setModo("pozo")}
          style={{
            padding: "5px 10px",
            borderRadius: 6,
            border: `1px solid ${modo === "pozo" ? COLOR_EXP : "rgba(255,255,255,0.2)"}`,
            background: modo === "pozo" ? "rgba(249,115,22,0.18)" : "transparent",
            color: LIENZO.fg,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Pozo con eco (t1 + t2)
        </button>
      </div>
    </div>
  );
}

/**
 * Escena 7 · Efecto Doppler cualitativo (frentes comprimidos adelante) + espectro EM.
 */
function DiagramaDopplerEspectro() {
  const H = 198;
  // Centro actual de la fuente moviéndose hacia la derecha
  const xFuente = 205;
  const yFuente = 58;
  // Frentes emitidos anteriormente: centro desplazado a la izquierda en 0.4 * R
  // (garantiza que ningun frente se cruce con otro porque v_fuente < v_sonido)
  const radios = [14, 26, 38, 50];

  const bandas = [
    { nombre: "Radio", color: "#64748b" },
    { nombre: "Micro", color: "#0ea5e9" },
    { nombre: "IR", color: "#f97316" },
    { nombre: "Visible", color: "#22c55e" },
    { nombre: "UV", color: "#a855f7" },
    { nombre: "Rayos X", color: "#ec4899" },
    { nombre: "Gamma", color: "#ef4444" },
  ];
  const X_ESP = 22;
  const W_ESP = 316;
  const W_BANDA = W_ESP / bandas.length;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${SVG_W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
        <text x={18} y={16} fill={COLOR_BASE} fontSize={10.5} fontWeight={700} fontFamily="var(--font-sans)">
          Efecto Doppler: la fuente se mueve a la derecha
        </text>

        {radios.map((r) => {
          const cx = xFuente - 0.4 * r;
          return (
            <circle
              key={r}
              cx={cx}
              cy={yFuente}
              r={r}
              fill="none"
              stroke="rgba(56,189,248,0.55)"
              strokeWidth={1.4}
            />
          );
        })}

        {/* Fuente + flecha de movimiento */}
        <circle cx={xFuente} cy={yFuente} r={4.5} fill={COLOR_EXP} />
        <line x1={xFuente + 6} y1={yFuente} x2={xFuente + 26} y2={yFuente} stroke={COLOR_EXP} strokeWidth={1.8} />
        <polygon points={`${xFuente + 26},${yFuente - 3.5} ${xFuente + 33},${yFuente} ${xFuente + 26},${yFuente + 3.5}`} fill={COLOR_EXP} />

        {/* Oyente atras vs adelante */}
        <text x={58} y={yFuente - 6} fill={LIENZO.fgDim} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
          Se aleja:
        </text>
        <text x={58} y={yFuente + 7} fill={LIENZO.fg} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
          f menor (grave)
        </text>

        <text x={302} y={yFuente - 6} fill={LIENZO.ok} fontSize={9.5} textAnchor="middle" fontFamily="var(--font-sans)">
          Se acerca:
        </text>
        <text x={302} y={yFuente + 7} fill={LIENZO.ok} fontSize={9.5} fontWeight={700} textAnchor="middle" fontFamily="var(--font-sans)">
          f mayor (agudo)
        </text>

        <line x1={16} y1={116} x2={SVG_W - 16} y2={116} stroke="rgba(255,255,255,0.1)" />

        {/* Espectro electromagnetico */}
        <text x={X_ESP} y={132} fill={LIENZO.fg} fontSize={10.5} fontWeight={700} fontFamily="var(--font-sans)">
          Espectro electromagnético (en vacío: c = λ · f = 3,0×10⁸ m/s)
        </text>

        {bandas.map((b, i) => {
          const bx = X_ESP + i * W_BANDA;
          return (
            <g key={b.nombre}>
              <rect x={bx + 1} y={142} width={W_BANDA - 2} height={22} rx={3} fill={b.color} opacity={0.78} />
              <text
                x={bx + W_BANDA / 2}
                y={156}
                fill="#0b1220"
                fontSize={8.8}
                fontWeight={700}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
              >
                {b.nombre}
              </text>
            </g>
          );
        })}

        <text x={X_ESP} y={182} fill={LIENZO.fgDim} fontSize={9.5} fontFamily="var(--font-sans)">
          Mayor λ, menor f
        </text>
        <text x={X_ESP + W_ESP} y={182} fill={COLOR_EXP} fontSize={9.5} textAnchor="end" fontFamily="var(--font-sans)">
          Menor λ, mayor f y energía
        </text>
      </svg>
    </Pizarra>
  );
}

/**
 * Escena 8 · Ecografia medica: transductor + gel + tejido + eco a profundidad d.
 */
function DiagramaEcografia() {
  const [freqMhz, setFreqMhz] = useState<2 | 10>(2);
  // Rapidez promedio en tejido blando: 1500 m/s
  // lambda = 1500 / (freqMhz * 1e6) en metros -> *1000 en mm
  const lambdaMm = (1500 / (freqMhz * 1e6)) * 1000;
  const H = 166;
  const X_CENTRO = 150;
  const Y_GEL = 44;
  const Y_PIEL = 52;
  const Y_ORG = 118;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${SVG_W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
          {/* Transductor */}
          <rect x={X_CENTRO - 30} y={14} width={60} height={28} rx={5} fill="rgba(56,189,248,0.22)" stroke={COLOR_BASE} strokeWidth={1.6} />
          <text x={X_CENTRO} y={31} fill={COLOR_BASE} fontSize={10} fontWeight={700} textAnchor="middle" fontFamily="var(--font-sans)">
            Transductor {freqMhz} MHz
          </text>

          {/* Gel acustico */}
          <rect x={X_CENTRO - 42} y={Y_GEL} width={84} height={8} rx={3} fill="rgba(34,197,94,0.35)" />
          <text x={X_CENTRO + 50} y={Y_GEL + 7} fill={LIENZO.ok} fontSize={9.5} fontFamily="var(--font-sans)">
            gel (elimina aire)
          </text>

          {/* Tejido blando */}
          <rect x={40} y={Y_PIEL} width={220} height={96} rx={6} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
          <text x={48} y={66} fill={LIENZO.fgDim} fontSize={9.5} fontFamily="var(--font-sans)">
            tejido blando (v ≈ 1500 m/s)
          </text>

          {/* Organo objetivo */}
          <ellipse cx={X_CENTRO} cy={Y_ORG + 10} rx={48} ry={16} fill="rgba(249,115,22,0.22)" stroke={COLOR_EXP} strokeWidth={1.5} />
          <text x={X_CENTRO} y={Y_ORG + 13} fill={COLOR_EXP} fontSize={10} fontWeight={700} textAnchor="middle" fontFamily="var(--font-sans)">
            pared del órgano
          </text>

          {/* Pulso ida y eco vuelta */}
          <line x1={X_CENTRO - 12} y1={Y_PIEL + 4} x2={X_CENTRO - 12} y2={Y_ORG - 10} stroke={COLOR_BASE} strokeWidth={2} />
          <polygon points={`${X_CENTRO - 15},${Y_ORG - 10} ${X_CENTRO - 12},${Y_ORG - 4} ${X_CENTRO - 9},${Y_ORG - 10}`} fill={COLOR_BASE} />

          <line x1={X_CENTRO + 12} y1={Y_ORG - 6} x2={X_CENTRO + 12} y2={Y_PIEL + 8} stroke={LIENZO.ok} strokeWidth={2} strokeDasharray="4 3" />
          <polygon points={`${X_CENTRO + 9},${Y_PIEL + 8} ${X_CENTRO + 12},${Y_PIEL + 2} ${X_CENTRO + 15},${Y_PIEL + 8}`} fill={LIENZO.ok} />

          {/* Cota d */}
          <line x1={270} y1={Y_PIEL} x2={270} y2={Y_ORG - 6} stroke={LIENZO.fgDim} />
          <text x={276} y={(Y_PIEL + Y_ORG) / 2} fill={LIENZO.fg} fontSize={10} fontFamily="var(--font-sans)">
            d = v·t / 2
          </text>

          <text x={40} y={H - 5} fill={LIENZO.fg} fontSize={10} fontFamily="var(--font-sans)">
            λ = {lambdaMm.toFixed(2).replace(".", ",")} mm · {freqMhz === 2 ? "mayor penetración (abdomen)" : "mayor detalle, menor alcance"}
          </text>
        </svg>
      </Pizarra>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => setFreqMhz(2)}
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            border: `1px solid ${freqMhz === 2 ? COLOR_BASE : "rgba(255,255,255,0.2)"}`,
            background: freqMhz === 2 ? "rgba(56,189,248,0.18)" : "transparent",
            color: LIENZO.fg,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          2 MHz (profundo)
        </button>
        <button
          type="button"
          onClick={() => setFreqMhz(10)}
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            border: `1px solid ${freqMhz === 10 ? COLOR_EXP : "rgba(255,255,255,0.2)"}`,
            background: freqMhz === 10 ? "rgba(249,115,22,0.18)" : "transparent",
            color: LIENZO.fg,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          10 MHz (superficial)
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// Escenas de la leccion (9 escenas, la ultima = "Errores y practica")
// =============================================================================

function EscQueEsOnda() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BASE}>Qué es una onda · mecánicas y electromagnéticas</Titulo>

      <Hook>
        En un estadio lleno, miles de personas hacen «la ola»: cada espectador se levanta un segundo y vuelve a sentarse, pero la ola da la vuelta completa a la tribuna. ¿Viajaron las personas o viajó otra cosa?
      </Hook>

      <Puente>
        Cuando sacudes una soga atada a un poste, la joroba recorre la soga de punta a punta, pero el trozo de cuerda que sujetas en la mano sigue siendo el mismo.
      </Puente>

      <DiagramaPulsoOnda />

      <Definicion termino="Onda, onda mecánica y onda electromagnética">
        <Parrafo>
          Una <strong>onda</strong> es una perturbación que se propaga transportando <strong>energía</strong> sin transportar materia de un extremo al otro.
        </Parrafo>
        <Parrafo>
          Una <strong>onda mecánica</strong> requiere un medio material elástico para propagarse (sonido, olas, soga, ultrasonido clínico): <strong>no viaja en el vacío</strong>. Una <strong>onda electromagnética (EM)</strong> consiste en campos eléctrico y magnético oscilantes y <strong>sí viaja en el vacío</strong> (luz visible, rayos X, microondas, ondas de radio, ultravioleta, infrarrojo).
        </Parrafo>
      </Definicion>

      <PorQue>
        En un medio material cada partícula empuja a su vecina mediante fuerzas elásticas, le cede energía y regresa a su equilibrio; sin moléculas vecinas (vacío) la cadena se corta. En cambio, un campo eléctrico variable induce un campo magnético variable que a su vez regenera al campo eléctrico, por eso la luz del Sol cruza el vacío hasta la Tierra.
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 4 */}
      <WorkedExample titulo="Naturaleza de ondas y conteo de ciclos">
        <Parrafo>
          Dentro de una cámara de vacío se colocan cuatro fuentes: rayos X, luz verde de frecuencia <MathText>{"$f = 5{,}0 \\times 10^{14}\\text{ Hz}$"}</MathText>, microondas y un transductor de ultrasonido clínico. Determina qué fuente no atraviesa la cámara y cuántos ciclos emite la luz verde en <MathText>{"$t = 2{,}0 \\times 10^{-6}\\text{ s}$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Identificamos cada onda: rayos X, luz verde y microondas son ondas electromagnéticas; el ultrasonido es sonido de alta frecuencia, es decir, una onda mecánica.
        </Paso>
        <Paso n={2}>
          Concluimos qué fuente queda bloqueada: sin aire ni otro medio material, el ultrasonido no puede propagarse en el vacío.
        </Paso>
        <Paso n={3}>
          Calculamos los ciclos emitidos por la luz verde multiplicando frecuencia por tiempo: <MathText>{"$N = f \\cdot t$"}</MathText>.
        </Paso>
        <Paso n={4}>
          <MathText>{"$N = (5{,}0 \\times 10^{14}\\text{ Hz}) \\cdot (2{,}0 \\times 10^{-6}\\text{ s}) = 1{,}0 \\times 10^{9}\\text{ ciclos}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        No confundas el viento o una corriente de agua con una onda: ahí sí viaja la materia. Tampoco pienses que el ultrasonido hospitalario es electromagnético por generar imágenes médicas: sigue siendo una onda sonora mecánica.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 4 */}
      <AutoCheck
        pregunta="¿Cuál de las siguientes ondas NO se propaga en el vacío?"
        opciones={["Rayos X", "Luz visible", "Ultrasonido", "Microondas"]}
        correctaIdx={2}
        explicacion="El ultrasonido es una onda sonora mecánica y necesita partículas materiales para propagarse. Rayos X, luz visible y microondas son ondas electromagnéticas que sí viajan en el vacío."
      />
    </EscenaRica>
  );
}

function EscTiposOnda() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BASE}>Ondas transversales y longitudinales</Titulo>

      <Hook>
        Si agitas una cuerda de arriba abajo, el bulto corre hacia adelante. Si empujas y jalas la punta de un resorte largo a lo largo de su propio eje, corre una zona apretada. Ambas son ondas, pero el medio se mueve de forma distinta.
      </Hook>

      <Puente>
        Compara el ángulo entre dos flechas que ya conoces: la velocidad de viaje de la onda y la vibración local de cada punto.
      </Puente>

      <DiagramaTransversalLongitudinal />

      <Definicion termino="Transversal vs. longitudinal">
        <Parrafo>
          En una <strong>onda transversal</strong>, la oscilación del medio es <strong>perpendicular</strong> (<MathText>{"$\\perp$"}</MathText>) a la dirección en que avanza la onda; presenta <strong>crestas</strong> y <strong>valles</strong> (ejemplos: ondas en una cuerda, ondas electromagnéticas).
        </Parrafo>
        <Parrafo>
          En una <strong>onda longitudinal</strong>, la oscilación es <strong>paralela</strong> (<MathText>{"$\\parallel$"}</MathText>) a la dirección de propagación; alterna zonas de <strong>compresión</strong> y <strong>rarefacción</strong> (ejemplo: el sonido en el aire y en líquidos).
        </Parrafo>
      </Definicion>

      <PorQue>
        Un fluido (aire o agua) se deforma libremente si lo deslizas de lado, así que no ofrece fuerza restauradora transversal; solo reacciona con presión cuando lo comprimes. Por eso el sonido en el aire o en los tejidos blandos es siempre longitudinal. Una cuerda tensa o un sólido sí recuperan su forma al desplazarse lateralmente, permitiendo ondas transversales.
      </PorQue>

      <WorkedExample titulo="Distancia entre compresión y rarefacción">
        <Parrafo>
          En el aire (<MathText>{"$v = 340\\text{ m/s}$"}</MathText>), una compresión sonora máxima y la rarefacción inmediatamente vecina están separadas por <MathText>{"$0{,}85\\text{ m}$"}</MathText>. Calcula la longitud de onda <MathText>{"$\\lambda$"}</MathText> y el tiempo que tarda ese sonido en recorrer <MathText>{"$1{,}7\\text{ km}$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Entre una compresión y la siguiente rarefacción hay exactamente media longitud de onda: <MathText>{"$\\dfrac{\\lambda}{2} = 0{,}85\\text{ m}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Despejamos la longitud de onda completa: <MathText>{"$\\lambda = 2 \\cdot 0{,}85\\text{ m} = 1{,}70\\text{ m}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Convertimos la distancia a metros: <MathText>{"$d = 1{,}7\\text{ km} = 1700\\text{ m}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Calculamos el tiempo de viaje: <MathText>{"$t = \\dfrac{d}{v} = \\dfrac{1700\\text{ m}}{340\\text{ m/s}} = 5{,}0\\text{ s}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Cuando ves una gráfica de seno para representar el sonido, el eje vertical muestra la variación de <strong>presión</strong> del aire, no que las moléculas suban y bajen en el espacio. En el aire el sonido siempre es longitudinal.
      </Cuidado>

      <AutoCheck
        pregunta="Las ondas sonoras que viajan por el aire desde un parlante hasta tu oído se clasifican como:"
        opciones={[
          "Longitudinales y mecánicas",
          "Transversales y mecánicas",
          "Longitudinales y electromagnéticas",
          "Transversales y electromagnéticas",
        ]}
        correctaIdx={0}
        explicacion="El sonido en el aire requiere un medio material (onda mecánica) y hace vibrar las moléculas hacia adelante y hacia atrás en la misma línea de propagación (onda longitudinal)."
      />
    </EscenaRica>
  );
}

function EscElementos() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BASE}>Elementos de una onda · λ, A, T y f</Titulo>

      <Hook>
        Cuando tomas tu pulso durante un minuto cuentas cuántos latidos ocurren por unidad de tiempo (frecuencia) y cuánto dura el espacio entre dos latidos (período). A esas dos magnitudes temporales (frecuencia y período), una onda suma dos magnitudes espaciales: la altura (amplitud) y el largo de cada repetición (longitud de onda).
      </Hook>

      <Puente>
        Mueve los controles del gráfico para separar lo que se mide en <strong>metros</strong> (<MathText>{"$A$"}</MathText> y <MathText>{"$\\lambda$"}</MathText>) de lo que se mide en <strong>segundos</strong> o <strong>hertz</strong> (<MathText>{"$T$"}</MathText> y <MathText>{"$f$"}</MathText>).
      </Puente>

      <DiagramaElementosOnda />

      <Definicion termino="Amplitud, longitud de onda, período y frecuencia">
        <Parrafo>
          <strong>Amplitud (<MathText>{"$A$"}</MathText>):</strong> separación máxima desde la línea de equilibrio hasta una cresta o un valle (<MathText>{"$\\text{m}$"}</MathText>). Determina la energía transportada por la onda.
        </Parrafo>
        <Parrafo>
          <strong>Longitud de onda (<MathText>{"$\\lambda$"}</MathText>):</strong> distancia espacial entre dos crestas consecutivas o dos valles consecutivos (<MathText>{"$\\text{m}$"}</MathText>).
        </Parrafo>
        <Parrafo>
          <strong>Período (<MathText>{"$T$"}</MathText>) y frecuencia (<MathText>{"$f$"}</MathText>):</strong> <MathText>{"$T$"}</MathText> es el tiempo de un ciclo completo (<MathText>{"$\\text{s}$"}</MathText>); <MathText>{"$f$"}</MathText> es la cantidad de ciclos por segundo (<MathText>{"$\\text{Hz} = \\text{s}^{-1}$"}</MathText>). Se relacionan mediante <MathText>{"$f = \\dfrac{1}{T}$"}</MathText> y <MathText>{"$T = \\dfrac{1}{f}$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        Si una sola vibración completa dura <MathText>{"$T$"}</MathText> segundos, en <MathText>{"$1\\text{ s}$"}</MathText> caben exactamente <MathText>{"$1/T$"}</MathText> vibraciones. Por eso período y frecuencia son inversos: cuando la vibración se vuelve el doble de rápida, tarda la mitad del tiempo por ciclo.
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 2 */}
      <WorkedExample titulo="De período a frecuencia y número de ciclos">
        <Parrafo>
          Un sensor registra una onda mecánica periódica cuyo período es <MathText>{"$T = 0{,}02\\text{ s}$"}</MathText>. Calcula su frecuencia <MathText>{"$f$"}</MathText> y cuántas oscilaciones completas ejecuta en <MathText>{"$0{,}5\\text{ s}$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Aplicamos la definición inversa entre frecuencia y período: <MathText>{"$f = \\dfrac{1}{T}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Sustituimos el dato: <MathText>{"$f = \\dfrac{1}{0{,}02\\text{ s}} = \\dfrac{100}{2}\\text{ Hz} = 50\\text{ Hz}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Multiplicamos la frecuencia por el tiempo total para contar los ciclos: <MathText>{"$N = f \\cdot t$"}</MathText>.
        </Paso>
        <Paso n={4}>
          <MathText>{"$N = 50\\text{ Hz} \\cdot 0{,}5\\text{ s} = 25\\text{ oscilaciones}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        La distancia vertical total desde el fondo de un valle hasta la punta de una cresta mide <MathText>{"$2A$"}</MathText>, no <MathText>{"$A$"}</MathText>. Si la gráfica indica <MathText>{"$8\\text{ cm}$"}</MathText> de pico a valle, la amplitud es la mitad: <MathText>{"$A = 4\\text{ cm}$"}</MathText>.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 2 */}
      <AutoCheck
        pregunta="Una onda periódica tiene un período T = 0,02 s. ¿Cuál es su frecuencia?"
        opciones={["20 Hz", "50 Hz", "0,02 Hz", "100 Hz"]}
        correctaIdx={1}
        explicacion="La frecuencia es el inverso del período: f = 1 / T = 1 / 0,02 s = 50 Hz."
      />
    </EscenaRica>
  );
}

function EscRapidezCuerda() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BASE}>Rapidez de propagación · v = λf y ondas en una cuerda</Titulo>

      <Hook>
        Cuando un guitarrista gira la clavija para tensar una cuerda, la nota se escucha distinta aunque la longitud de la cuerda siga igual. ¿Por qué cambia el modo en que viaja la onda al apretar la cuerda?
      </Hook>

      <Puente>
        Recuerda cinemática básica: <MathText>{"$v = \\dfrac{d}{t}$"}</MathText>. En el tiempo de un período (<MathText>{"$t = T$"}</MathText>), una onda avanza exactamente una longitud de onda (<MathText>{"$d = \\lambda$"}</MathText>).
      </Puente>

      <DiagramaCuerdaTensa />

      <Definicion termino="Ecuación de onda y rapidez en una cuerda tensa">
        <Parrafo>
          Combinando <MathText>{"$v = \\dfrac{\\lambda}{T}$"}</MathText> con <MathText>{"$f = \\dfrac{1}{T}$"}</MathText>, se obtiene la ecuación fundamental: <MathText>{"$v = \\lambda \\cdot f$"}</MathText>.
        </Parrafo>
        <Parrafo>
          Para una onda transversal en una cuerda tensa bajo tensión <MathText>{"$F$"}</MathText>, con masa <MathText>{"$m$"}</MathText> y longitud <MathText>{"$L$"}</MathText>, la rapidez depende exclusivamente del medio: <MathText>{"$v = \\sqrt{\\dfrac{F}{\\mu}}$"}</MathText>, donde <MathText>{"$\\mu = \\dfrac{m}{L}$"}</MathText> es la densidad lineal de masa (<MathText>{"$\\text{kg/m}$"}</MathText>).
        </Parrafo>
      </Definicion>

      <PorQue>
        La rapidez <MathText>{"$v$"}</MathText> está gobernada por dos propiedades opuestas del medio: la fuerza restauradora (tensión <MathText>{"$F$"}</MathText>, que acelera rápido el regreso) y la inercia por unidad de longitud (<MathText>{"$\\mu$"}</MathText>, que frena ese movimiento). En cambio, la frecuencia <MathText>{"$f$"}</MathText> la impone la fuente que sacude la cuerda, y la longitud de onda <MathText>{"$\\lambda = v/f$"}</MathText> se acomoda en consecuencia.
      </PorQue>

      <WorkedExample titulo="Densidad lineal, rapidez y longitud de onda en una cuerda">
        <Parrafo>
          Una cuerda uniforme de <MathText>{"$L = 4{,}0\\text{ m}$"}</MathText> y masa <MathText>{"$m = 0{,}04\\text{ kg}$"}</MathText> se tensa con <MathText>{"$F = 36\\text{ N}$"}</MathText>. Un vibrador oscila un extremo con <MathText>{"$f = 30\\text{ Hz}$"}</MathText>. Halla la longitud de onda <MathText>{"$\\lambda$"}</MathText> en la cuerda.
        </Parrafo>
        <Paso n={1}>
          Calculamos la densidad lineal de masa: <MathText>{"$\\mu = \\dfrac{m}{L} = \\dfrac{0{,}04\\text{ kg}}{4{,}0\\text{ m}} = 0{,}01\\text{ kg/m}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Calculamos la rapidez de propagación en la cuerda: <MathText>{"$v = \\sqrt{\\dfrac{F}{\\mu}} = \\sqrt{\\dfrac{36\\text{ N}}{0{,}01\\text{ kg/m}}}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Resolvemos la raíz cuadrada: <MathText>{"$v = \\sqrt{3600\\text{ m}^2/\\text{s}^2} = 60\\text{ m/s}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Despejamos la longitud de onda usando <MathText>{"$v = \\lambda f$"}</MathText>: <MathText>{"$\\lambda = \\dfrac{v}{f} = \\dfrac{60\\text{ m/s}}{30\\text{ Hz}} = 2{,}0\\text{ m}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Error muy frecuente: creer que duplicar la frecuencia <MathText>{"$f$"}</MathText> duplica la rapidez <MathText>{"$v$"}</MathText>. Si mantienes la misma cuerda y la misma tensión, <MathText>{"$v$"}</MathText> permanece fija; al duplicar <MathText>{"$f$"}</MathText>, la longitud de onda <MathText>{"$\\lambda$"}</MathText> cae a la mitad.
      </Cuidado>

      <AutoCheck
        pregunta="En una misma cuerda con tensión constante, una onda viaja a 40 m/s con frecuencia 20 Hz. Si duplicas la frecuencia a 40 Hz sin cambiar la cuerda ni la tensión, ¿qué ocurre con la rapidez y con la longitud de onda?"
        opciones={[
          "La rapidez sube a 80 m/s y λ queda en 2 m",
          "La rapidez sigue en 40 m/s y λ baja de 2 m a 1 m",
          "La rapidez baja a 20 m/s y λ queda en 0,5 m",
          "La rapidez sigue en 40 m/s y λ sube de 2 m a 4 m",
        ]}
        correctaIdx={1}
        explicacion="La rapidez depende solo de la tensión y la densidad lineal de la cuerda (sigue en 40 m/s). Al duplicarse f de 20 Hz a 40 Hz, λ = v / f = 40 / 40 = 1 m (se reduce a la mitad)."
      />
    </EscenaRica>
  );
}

function EscSonidoDecibeles() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BASE}>El sonido · rapidez, intensidad y decibeles</Titulo>

      <Hook>
        Durante una tormenta ves el rayo al instante y escuchas el trueno segundos después. Además, un mismo parlante se oye fuerte junto a ti y mucho más débil apenas te alejas unos metros. ¿Con qué regla matemática cae la intensidad al alejarte?
      </Hook>

      <Puente>
        El oído humano no percibe las potencias en línea recta: un sonido diez veces más intenso apenas te parece un escalón más fuerte, por eso se inventó la escala de decibeles.
      </Puente>

      <DiagramaDecibeles />

      <Definicion termino="Rapidez del sonido, intensidad y nivel sonoro">
        <Parrafo>
          En el aire a temperatura ambiente (<MathText>{"$15\\text{ °C}$"}</MathText> a <MathText>{"$20\\text{ °C}$"}</MathText>), el sonido viaja aproximadamente a <MathText>{"$v_{\\text{aire}} \\approx 340\\text{ m/s}$"}</MathText> (en agua es alrededor de <MathText>{"$1500\\text{ m/s}$"}</MathText>). El rango audible humano abarca de <MathText>{"$20\\text{ Hz}$"}</MathText> a <MathText>{"$20\\,000\\text{ Hz}$"}</MathText> (<MathText>{"$20\\text{ kHz}$"}</MathText>).
        </Parrafo>
        <Parrafo>
          La <strong>intensidad sonora (<MathText>{"$I$"}</MathText>)</strong> es potencia por unidad de área. Para una fuente puntual a distancia <MathText>{"$r$"}</MathText>: <MathText>{"$I = \\dfrac{P}{4\\pi r^2}$"}</MathText> (<MathText>{"$\\text{W/m}^2$"}</MathText>).
        </Parrafo>
        <Parrafo>
          El <strong>nivel de intensidad sonora (<MathText>{"$\\beta$"}</MathText>)</strong> en decibeles (<MathText>{"$\\text{dB}$"}</MathText>) compara <MathText>{"$I$"}</MathText> con el umbral auditivo <MathText>{"$I_0 = 10^{-12}\\text{ W/m}^2$"}</MathText>: <MathText>{"$\\beta = 10\\log_{10}\\!\\left(\\dfrac{I}{I_0}\\right)$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        El logaritmo base 10 transforma potencias enormes de 10 en números simples de <MathText>{"$0$"}</MathText> a <MathText>{"$120\\text{ dB}$"}</MathText>: cada aumento de <MathText>{"$10\\text{ dB}$"}</MathText> significa multiplicar la intensidad <MathText>{"$I$"}</MathText> por <MathText>{"$10$"}</MathText>. Y como la energía emitida se reparte sobre una esfera de superficie <MathText>{"$4\\pi r^2$"}</MathText>, duplicar la distancia cuadruplica el área y reduce la intensidad a la cuarta parte (<MathText>{"$I/4$"}</MathText>).
      </PorQue>

      <WorkedExample titulo="Cálculo en decibeles y cambio de distancia">
        <Parrafo>
          Una alarma médica genera a <MathText>{"$r_1 = 2{,}0\\text{ m}$"}</MathText> una intensidad <MathText>{"$I_1 = 1{,}0 \\times 10^{-6}\\text{ W/m}^2$"}</MathText>. (a) Halla su nivel <MathText>{"$\\beta_1$"}</MathText> en decibeles. (b) Calcula la intensidad <MathText>{"$I_2$"}</MathText> si te alejas a <MathText>{"$r_2 = 4{,}0\\text{ m}$"}</MathText>. (c) ¿Qué intensidad corresponde a <MathText>{"$80\\text{ dB}$"}</MathText>? Usa <MathText>{"$I_0 = 10^{-12}\\text{ W/m}^2$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Calculamos el cociente respecto al umbral: <MathText>{"$\\dfrac{I_1}{I_0} = \\dfrac{1{,}0 \\times 10^{-6}}{10^{-12}} = 10^6$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Aplicamos la fórmula en decibeles: <MathText>{"$\\beta_1 = 10\\log_{10}(10^6) = 10 \\cdot 6 = 60\\text{ dB}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Al pasar de <MathText>{"$2{,}0\\text{ m}$"}</MathText> a <MathText>{"$4{,}0\\text{ m}$"}</MathText>, la distancia se duplica (<MathText>{"$r_2 = 2r_1$"}</MathText>), así que la intensidad se divide entre <MathText>{"$2^2 = 4$"}</MathText>: <MathText>{"$I_2 = \\dfrac{1{,}0 \\times 10^{-6}}{4} = 2{,}5 \\times 10^{-7}\\text{ W/m}^2$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Para <MathText>{"$80\\text{ dB}$"}</MathText>: <MathText>{"$\\log_{10}\\!\\left(\\dfrac{I_{80}}{I_0}\\right) = \\dfrac{80}{10} = 8$"}</MathText>, luego <MathText>{"$I_{80} = 10^8 \\cdot 10^{-12} = 10^{-4}\\text{ W/m}^2$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Los decibeles <strong>no</strong> se suman como manzanas: dos fuentes de <MathText>{"$60\\text{ dB}$"}</MathText> sonando a la vez no dan <MathText>{"$120\\text{ dB}$"}</MathText>, sino el doble de intensidad (<MathText>{"$2 \\times 10^{-6}\\text{ W/m}^2$"}</MathText>), que equivale apenas a unos <MathText>{"$63\\text{ dB}$"}</MathText>.
      </Cuidado>

      <AutoCheck
        pregunta="Si en una sala el nivel sonoro aumenta de 50 dB a 70 dB, ¿en qué factor aumentó la intensidad física I del sonido?"
        opciones={["En 2 veces", "En 20 veces", "En 100 veces", "En 1000 veces"]}
        correctaIdx={2}
        explicacion="Cada aumento de 10 dB multiplica la intensidad I por 10. Como sube 20 dB (dos saltos de 10 dB), la intensidad se multiplica por 10 × 10 = 100 veces."
      />
    </EscenaRica>
  );
}

function EscEcoPozo() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BASE}>Eco y problemas de pozo con caída libre</Titulo>

      <Hook>
        Gritas frente a un cerro y tu voz vuelve poco después. O sueltas una piedra en un pozo profundo y escuchas el golpe segundos más tarde. En ambos casos el sonido viaja a rapidez constante, pero el recorrido tiene trampa si no dibujas cada etapa.
      </Hook>

      <Puente>
        Un eco siempre es un problema de cinemática MRU combinado con reflexión: el sonido va, rebota en un obstáculo y vuelve hasta el receptor.
      </Puente>

      <DiagramaEcoPozo />

      <Definicion termino="Eco simple, observador móvil y pozo con eco">
        <Parrafo>
          <strong>Eco con observador en reposo:</strong> el sonido (de rapidez <MathText>{"$v_s$"}</MathText>) recorre ida y vuelta la distancia <MathText>{"$d$"}</MathText>, por lo que <MathText>{"$2d = v_s \\cdot t$"}</MathText> y <MathText>{"$d = \\dfrac{v_s \\cdot t}{2}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Eco con observador que camina hacia el muro a rapidez <MathText>{"$v_p$"}</MathText>:</strong> mientras el sonido va y vuelve en tiempo <MathText>{"$t$"}</MathText>, la persona acorta la vuelta recorriendo <MathText>{"$v_p t$"}</MathText>, de modo que <MathText>{"$d_{\\text{sonido}} = 2d - v_p t = v_s t$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Pozo con eco:</strong> el tiempo total medido desde que sueltas la piedra (<MathText>{"$v_0 = 0$"}</MathText>) hasta oír el impacto es <MathText>{"$t_{\\text{total}} = t_1 + t_2$"}</MathText>, con caída libre <MathText>{"$h = \\dfrac{1}{2}g t_1^2$"}</MathText> (usa <MathText>{"$g = 9{,}8\\text{ m/s}^2$"}</MathText> por defecto, salvo que el enunciado indique <MathText>{"$10\\text{ m/s}^2$"}</MathText>) y subida sonora <MathText>{"$h = v_s t_2$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        Muchas respuestas incorrectas nacen de olvidar que el sonido recién nace cuando la piedra choca abajo. Si hay movimiento de la persona durante el eco, la posición final del oído no coincide con el punto donde gritó. Dibujar ambos trayectos por separado evita errores de signo o factores de 2 olvidados.
      </PorQue>

      {/* basado en: data/examenes/umss/ingenieria/2017-2op-2-2017.md P12 */}
      <WorkedExample titulo="Eco con persona caminando (modelo examen UMSS)">
        <Parrafo>
          Una persona camina hacia un muro plano con rapidez constante <MathText>{"$v_p = 5\\text{ m/s}$"}</MathText>. Al hallarse a <MathText>{"$d = 690\\text{ m}$"}</MathText> del muro emite un grito y escucha el eco <MathText>{"$t = 4\\text{ s}$"}</MathText> después. Calcula la rapidez del sonido <MathText>{"$v_s$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Calculamos cuánto avanzó la persona hacia el muro en <MathText>{"$4\\text{ s}$"}</MathText>: <MathText>{"$x_p = v_p \\cdot t = 5\\text{ m/s} \\cdot 4\\text{ s} = 20\\text{ m}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Calculamos el recorrido total del sonido (ida <MathText>{"$690\\text{ m}$"}</MathText> más vuelta <MathText>{"$690 - 20\\text{ m}$"}</MathText>): <MathText>{"$d_{\\text{sonido}} = 2(690\\text{ m}) - 20\\text{ m} = 1380 - 20 = 1360\\text{ m}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Dividimos ese recorrido entre el tiempo total del eco: <MathText>{"$v_s = \\dfrac{1360\\text{ m}}{4\\text{ s}} = 340\\text{ m/s}$"}</MathText>.
        </Paso>
      </WorkedExample>

      {/* basado en: data/examenes/umss/ingenieria/2025-3op-1-2025.md P3 */}
      <WorkedExample titulo="Pozo con caída libre y eco (modelo examen UMSS)">
        <Parrafo>
          Se deja caer una piedra en un pozo seco y el sonido del golpe en el fondo se escucha <MathText>{"$t_{\\text{total}} = 9\\text{ s}$"}</MathText> después de soltarla. Calcula la profundidad <MathText>{"$h$"}</MathText> del pozo si <MathText>{"$v_s = 320\\text{ m/s}$"}</MathText> y el problema indica usar <MathText>{"$g = 10\\text{ m/s}^2$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Expresamos la caída libre: <MathText>{"$h = \\dfrac{1}{2}(10)t_1^2 = 5t_1^2$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Expresamos la subida del sonido (<MathText>{"$t_2 = 9 - t_1$"}</MathText>): <MathText>{"$h = 320(9 - t_1)$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Igualamos ambas expresiones de <MathText>{"$h$"}</MathText>: <MathText>{"$5t_1^2 = 320(9 - t_1)$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Dividimos entre <MathText>{"$5$"}</MathText>: <MathText>{"$t_1^2 = 64(9 - t_1) = 576 - 64t_1$"}</MathText>.
        </Paso>
        <Paso n={5}>
          Reordenamos la cuadrática: <MathText>{"$t_1^2 + 64t_1 - 576 = 0$"}</MathText>.
        </Paso>
        <Paso n={6}>
          Factorizamos: <MathText>{"$(t_1 + 72)(t_1 - 8) = 0$"}</MathText>, por lo que <MathText>{"$t_1 = 8\\text{ s}$"}</MathText> (descartamos <MathText>{"$t_1 < 0$"}</MathText>).
        </Paso>
        <Paso n={7}>
          Evaluamos <MathText>{"$h$"}</MathText> y comprobamos con <MathText>{"$t_2 = 1\\text{ s}$"}</MathText>: <MathText>{"$h = 5 \\cdot 8^2 = 320\\text{ m}$"}</MathText> (y <MathText>{"$320 \\cdot 1 = 320\\text{ m}$"}</MathText>).
        </Paso>
      </WorkedExample>

      <Cuidado>
        En un eco simple frente a una pared con persona quieta, <MathText>{"$v_s \\cdot t$"}</MathText> es el camino completo de ida y vuelta. Si olvidas dividir entre <MathText>{"$2$"}</MathText>, duplicarás la distancia real al muro.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 3 */}
      <AutoCheck
        pregunta="Una persona grita frente a un muro plano y escucha el eco 1,6 s después. Si la rapidez del sonido en el aire es 340 m/s, ¿a qué distancia está el muro?"
        opciones={["544 m", "272 m", "136 m", "212,5 m"]}
        correctaIdx={1}
        explicacion="En 1,6 s el sonido recorre ida y vuelta: 2d = 340 m/s × 1,6 s = 544 m. Al dividir entre 2 resulta d = 272 m."
      />
    </EscenaRica>
  );
}

function EscDopplerEspectro() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BASE}>Efecto Doppler cualitativo y espectro electromagnético</Titulo>

      <Hook>
        Cuando una ambulancia pasa a toda velocidad junto a ti, su sirena cambia bruscamente de un tono agudo mientras viene hacia ti a un tono más grave apenas te deja atrás. ¿Por qué el conductor dentro de la ambulancia no oye ese cambio?
      </Hook>

      <Puente>
        Igual que si lanzas pelotas cada segundo desde un auto en marcha hacia alguien que espera adelante, las pelotas llegan más seguidas cuando el auto se acerca y más espaciadas cuando se aleja.
      </Puente>

      <DiagramaDopplerEspectro />

      <Definicion termino="Efecto Doppler y espectro electromagnético">
        <Parrafo>
          <strong>Efecto Doppler cualitativo:</strong> variación de la frecuencia percibida (<MathText>{"$f'$"}</MathText>) cuando existe movimiento relativo entre fuente y observador. Si se <strong>acercan</strong>, los frentes de onda se comprimen y <MathText>{"$f'$"}</MathText> <strong>aumenta</strong> (tono más agudo). Si se <strong>alejan</strong>, los frentes se separan y <MathText>{"$f'$"}</MathText> <strong>disminuye</strong> (tono más grave).
        </Parrafo>
        <Parrafo>
          <strong>Espectro electromagnético:</strong> todas las ondas EM viajan en el vacío con <MathText>{"$c = 3{,}0 \\times 10^{8}\\text{ m/s}$"}</MathText> y cumplen <MathText>{"$c = \\lambda \\cdot f$"}</MathText>. De menor a mayor frecuencia (y mayor a menor <MathText>{"$\\lambda$"}</MathText>): radio, microondas, infrarrojo, luz visible, ultravioleta, rayos X y rayos gamma.
        </Parrafo>
      </Definicion>

      <PorQue>
        La velocidad de propagación del sonido en el aire la fija el propio aire, no la ambulancia. Al avanzar, la ambulancia acorta la distancia entre cada frente que emite y el anterior delante de ella, por eso llegan más frentes por segundo a tu oído. En las ondas electromagnéticas ocurre algo análogo con <MathText>{"$c = \\lambda f$"}</MathText>: al ser <MathText>{"$c$"}</MathText> constante en el vacío, reducir <MathText>{"$\\lambda$"}</MathText> obliga a elevar <MathText>{"$f$"}</MathText> (y con ello la energía de la radiación).
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 5 */}
      <WorkedExample titulo="Conversión nanómetros y frecuencia de luz visible">
        <Parrafo>
          Un pulso electromagnético en el vacío (<MathText>{"$c = 3{,}0 \\times 10^{8}\\text{ m/s}$"}</MathText>) tiene longitud de onda <MathText>{"$\\lambda = 600\\text{ nm}$"}</MathText> (<MathText>{"$1\\text{ nm} = 10^{-9}\\text{ m}$"}</MathText>). Calcula su frecuencia <MathText>{"$f$"}</MathText>.
        </Parrafo>
        <Paso n={1}>
          Convertimos la longitud de onda a metros: <MathText>{"$\\lambda = 600\\text{ nm} = 600 \\times 10^{-9}\\text{ m} = 6{,}0 \\times 10^{-7}\\text{ m}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Despejamos <MathText>{"$f$"}</MathText> de <MathText>{"$c = \\lambda \\cdot f$"}</MathText>: <MathText>{"$f = \\dfrac{c}{\\lambda}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Sustituimos valores: <MathText>{"$f = \\dfrac{3{,}0 \\times 10^{8}\\text{ m/s}}{6{,}0 \\times 10^{-7}\\text{ m}}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          Operamos coeficiente y exponentes: <MathText>{"$f = 0{,}5 \\times 10^{8 - (-7)}\\text{ Hz} = 0{,}5 \\times 10^{15}\\text{ Hz} = 5{,}0 \\times 10^{14}\\text{ Hz}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        En el efecto Doppler sonoro la rapidez del sonido respecto al aire <strong>no aumenta</strong> cuando la ambulancia se acerca; lo que sube es la frecuencia observada. Y en óptica/EM recuerda: <MathText>{"$1\\text{ nm} = 10^{-9}\\text{ m}$"}</MathText>, nunca <MathText>{"$10^{-6}\\text{ m}$"}</MathText>.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 5 */}
      <AutoCheck
        pregunta="Una onda electromagnética en el vacío (c = 3,0 × 10⁸ m/s) tiene una longitud de onda λ = 600 nm (6,0 × 10⁻⁷ m). ¿Cuál es su frecuencia?"
        opciones={["5,0 × 10¹⁴ Hz", "1,8 × 10¹¹ Hz", "2,0 × 10⁻¹⁵ Hz", "5,0 × 10¹¹ Hz"]}
        correctaIdx={0}
        explicacion="Aplicando f = c / λ = (3,0 × 10⁸ m/s) / (6,0 × 10⁻⁷ m) = 0,5 × 10¹⁵ Hz = 5,0 × 10¹⁴ Hz."
      />
    </EscenaRica>
  );
}

function EscEcografia() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BASE}>Aplicación médica · ecografía (ultrasonido diagnóstico)</Titulo>

      <Hook>
        ¿Cómo logra un médico ver un riñón o los latidos de un feto en tiempo real sin usar rayos X? La técnica usa exactamente el mismo principio que el eco de un cerro, pero llevado a escala de milímetros dentro del cuerpo.
      </Hook>

      <Puente>
        Ya sabes medir distancias con un eco (<MathText>{"$2d = v \\cdot t$"}</MathText>) y calcular longitudes de onda (<MathText>{"$\\lambda = v/f$"}</MathText>). Ahora aplicas ambas fórmulas juntas dentro de los tejidos humanos.
      </Puente>

      <DiagramaEcografia />

      <Definicion termino="Ecografía diagnóstica">
        <Parrafo>
          Un <strong>ecógrafo</strong> emite pulsos cortos de <strong>ultrasonido</strong> (frecuencias clínicas típicas de <MathText>{"$2\\text{ MHz}$"}</MathText> a <MathText>{"$15\\text{ MHz}$"}</MathText>, muy por encima de los <MathText>{"$20\\text{ kHz}$"}</MathText> audibles).
        </Parrafo>
        <Parrafo>
          En los tejidos blandos el sonido viaja a <MathText>{"$v \\approx 1500\\text{ m/s}$"}</MathText>. Al cruzar fronteras entre tejidos distintos, parte de la energía se refleja como eco y vuelve al transductor en un tiempo <MathText>{"$t$"}</MathText>, indicando una profundidad <MathText>{"$d = \\dfrac{v \\cdot t}{2}$"}</MathText>.
        </Parrafo>
      </Definicion>

      <PorQue>
        Para distinguir detalles anatómicos pequeños hace falta una longitud de onda menor que el tamaño del detalle: subir a megahertz reduce <MathText>{"$\\lambda$"}</MathText> por debajo del milímetro. Además, se aplica <strong>gel acústico</strong> sobre la piel para expulsar la capa de aire: como la velocidad y densidad del aire difieren muchísimo de las del tejido, sin gel casi todo el haz rebotaría antes de entrar al cuerpo. (Y combinando ecografía con efecto Doppler se mide también la velocidad del flujo sanguíneo.)
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 1 */}
      <WorkedExample titulo="Longitud de onda y profundidad en ecografía">
        <Parrafo>
          Un ecógrafo médico emite ultrasonido de <MathText>{"$f = 2{,}0\\text{ MHz}$"}</MathText> (<MathText>{"$2{,}0 \\times 10^{6}\\text{ Hz}$"}</MathText>) en tejido blando donde <MathText>{"$v = 1500\\text{ m/s}$"}</MathText>. (a) Calcula la longitud de onda <MathText>{"$\\lambda$"}</MathText> en el tejido. (b) Si el eco desde un órgano vuelve al transductor en <MathText>{"$t = 1{,}0 \\times 10^{-4}\\text{ s}$"}</MathText>, ¿a qué profundidad <MathText>{"$d$"}</MathText> está esa superficie?
        </Parrafo>
        <Paso n={1}>
          Calculamos la longitud de onda en el tejido: <MathText>{"$\\lambda = \\dfrac{v}{f} = \\dfrac{1500\\text{ m/s}}{2{,}0 \\times 10^{6}\\text{ Hz}}$"}</MathText>.
        </Paso>
        <Paso n={2}>
          Convertimos el resultado a milímetros: <MathText>{"$\\lambda = 7{,}5 \\times 10^{-4}\\text{ m} = 0{,}75\\text{ mm}$"}</MathText>.
        </Paso>
        <Paso n={3}>
          Aplicamos la ecuación de eco (ida y vuelta) para la profundidad: <MathText>{"$d = \\dfrac{v \\cdot t}{2}$"}</MathText>.
        </Paso>
        <Paso n={4}>
          <MathText>{"$d = \\dfrac{1500\\text{ m/s} \\cdot 1{,}0 \\times 10^{-4}\\text{ s}}{2} = \\dfrac{0{,}15\\text{ m}}{2} = 0{,}075\\text{ m} = 7{,}5\\text{ cm}$"}</MathText>.
        </Paso>
      </WorkedExample>

      <Cuidado>
        Dentro del cuerpo humano nunca uses <MathText>{"$340\\text{ m/s}$"}</MathText>: esa es la rapidez en el aire. En agua y tejidos blandos la rapidez es cercana a <MathText>{"$1500\\text{ m/s}$"}</MathText>. Y recuerda siempre dividir <MathText>{"$v \\cdot t$"}</MathText> entre <MathText>{"$2$"}</MathText> al hallar la profundidad.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F2 pregunta 1 */}
      <AutoCheck
        pregunta="Un ecógrafo médico emite ultrasonido de frecuencia f = 2 MHz (2 × 10⁶ Hz) en tejido blando, donde v = 1500 m/s. ¿Cuál es la longitud de onda λ en el tejido?"
        opciones={[
          "0,75 mm (7,5 × 10⁻⁴ m)",
          "3,0 × 10⁹ m",
          "1,33 × 10⁻³ m",
          "7,5 cm (7,5 × 10⁻² m)",
        ]}
        correctaIdx={0}
        explicacion="Se calcula λ = v / f = 1500 / (2 × 10⁶) = 7,5 × 10⁻⁴ m = 0,75 mm, escala adecuada para obtener imágenes médicas nítidas."
      />
    </EscenaRica>
  );
}

interface EjPractica {
  p: string;
  op: string[];
  c: number;
  ex: string;
}

const EJERCICIOS_PRACTICA: EjPractica[] = [
  {
    p: "Una onda transversal viaja por una cuerda con $\\lambda = 0{,}50\\text{ m}$ y $f = 80\\text{ Hz}$. ¿Cuál es su rapidez de propagación?",
    op: ["$160\\text{ m/s}$", "$40\\text{ m/s}$", "$0{,}00625\\text{ m/s}$", "$80{,}5\\text{ m/s}$"],
    c: 1,
    ex: "Aplicando $v = \\lambda \\cdot f = 0{,}50\\text{ m} \\cdot 80\\text{ Hz} = 40\\text{ m/s}$.",
  },
  {
    p: "Una alarma produce una intensidad sonora de $I = 10^{-4}\\text{ W/m}^2$ (con $I_0 = 10^{-12}\\text{ W/m}^2$). ¿Cuál es su nivel en decibeles?",
    op: ["$40\\text{ dB}$", "$120\\text{ dB}$", "$100\\text{ dB}$", "$80\\text{ dB}$"],
    c: 3,
    ex: "Calculamos $\\beta = 10\\log_{10}\\!\\left(\\dfrac{10^{-4}}{10^{-12}}\\right) = 10\\log_{10}(10^8) = 80\\text{ dB}$.",
  },
  {
    p: "Una ambulancia con la sirena encendida se aleja rápidamente de ti. Comparada con la frecuencia real de la sirena, la frecuencia que escuchas es:",
    op: [
      "Mayor, y el sonido se oye más agudo",
      "Igual, solo disminuye su rapidez en el aire",
      "Menor, y el sonido se oye más grave",
      "Mayor al principio y luego infinita",
    ],
    c: 2,
    ex: "Al alejarse la fuente, los frentes de onda llegan más espaciados: aumenta $\\lambda$ aparente y la frecuencia percibida es menor (tono más grave).",
  },
  // basado en: data/examenes/umss/ingenieria/2017-2op-2-2017.md P12 (variante numerica)
  {
    p: "Caminas hacia una pared plana a $4\\text{ m/s}$ y, cuando estás a $516\\text{ m}$, das una palmada y escuchas el eco $3{,}0\\text{ s}$ después. ¿Qué rapidez tiene el sonido en ese momento?",
    op: ["$340\\text{ m/s}$", "$344\\text{ m/s}$", "$336\\text{ m/s}$", "$172\\text{ m/s}$"],
    c: 0,
    ex: "En $3{,}0\\text{ s}$ avanzas $4 \\cdot 3 = 12\\text{ m}$. El sonido recorre $2(516) - 12 = 1020\\text{ m}$, así que $v_s = \\dfrac{1020}{3{,}0} = 340\\text{ m/s}$.",
  },
  {
    p: "En una ecografía ($v = 1500\\text{ m/s}$), el eco reflejado en un cálculo renal tarda $t = 8{,}0 \\times 10^{-5}\\text{ s}$ en regresar al transductor. ¿A qué profundidad está el cálculo?",
    op: ["$12\\text{ cm}$", "$3{,}0\\text{ cm}$", "$6{,}0\\text{ cm}$", "$18\\text{ cm}$"],
    c: 2,
    ex: "Distancia de ida y vuelta: $v \\cdot t = 1500 \\cdot 8{,}0 \\times 10^{-5} = 0{,}12\\text{ m}$. Profundidad: $d = \\dfrac{0{,}12}{2} = 0{,}06\\text{ m} = 6{,}0\\text{ cm}$.",
  },
];

function EscPractica() {
  const [elegidas, setElegidas] = useState<Record<number, number>>({});

  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>Errores y práctica</Titulo>

      <Parrafo>
        Antes de resolver el bloque final de ejercicios, repasa tres trampas clásicas de los exámenes PSA en ondas y sonido.
      </Parrafo>

      <Misconception titulo="«La onda arrastra la materia hacia adelante»">
        Falso. Las partículas del medio oscilan alrededor de su punto de equilibrio; lo que viaja de un extremo al otro es energía (y cantidad de movimiento), no el aire ni la cuerda.
      </Misconception>

      <Misconception titulo="«Si subo la frecuencia, la onda viaja más rápido»">
        Falso mientras no cambies el medio. La rapidez <MathText>{"$v$"}</MathText> la fijan el medio (por ejemplo <MathText>{"$\\sqrt{F/\\mu}$"}</MathText> en una cuerda o la temperatura del aire en el sonido); al subir <MathText>{"$f$"}</MathText>, disminuye <MathText>{"$\\lambda = v/f$"}</MathText>.
      </Misconception>

      <Misconception titulo="«La distancia al muro o al órgano es v · t»">
        Falso en cualquier problema de eco o ecografía: en ese tiempo el pulso va y regresa (<MathText>{"$2d = v \\cdot t$"}</MathText>). Siempre divide entre <MathText>{"$2$"}</MathText>, y si cae una piedra en un pozo separa el tiempo de caída libre del tiempo de subida del sonido.
      </Misconception>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {EJERCICIOS_PRACTICA.map((ej, idx) => {
          const sel = elegidas[idx];
          const respondido = sel !== undefined;
          const acierto = sel === ej.c;
          return (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  respondido ? (acierto ? COLOR_OK : COLOR_BAD) : "rgba(255,255,255,0.12)"
                }`,
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 13.5, fontWeight: 600, color: LIENZO.fg, marginBottom: 8 }}>
                <span>{idx + 1}. </span>
                <MathText>{ej.p}</MathText>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {ej.op.map((opcion, oi) => {
                  const esElegida = sel === oi;
                  const esCorrecta = oi === ej.c;
                  let bg = "rgba(255,255,255,0.04)";
                  let bd = "rgba(255,255,255,0.15)";
                  if (respondido && esCorrecta) {
                    bg = "rgba(34,197,94,0.18)";
                    bd = COLOR_OK;
                  } else if (respondido && esElegida && !esCorrecta) {
                    bg = "rgba(239,68,68,0.18)";
                    bd = COLOR_BAD;
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => setElegidas((prev) => ({ ...prev, [idx]: oi }))}
                      style={{
                        textAlign: "left",
                        padding: "7px 9px",
                        borderRadius: 7,
                        border: `1px solid ${bd}`,
                        background: bg,
                        color: LIENZO.fg,
                        fontSize: 12.5,
                        cursor: "pointer",
                      }}
                    >
                      <MathText>{opcion}</MathText>
                    </button>
                  );
                })}
              </div>
              {respondido && (
                <div style={{ marginTop: 8, fontSize: 12.5, color: acierto ? COLOR_OK : LIENZO.fgDim }}>
                  <strong>{acierto ? "Correcto · " : "Revisa el procedimiento · "}</strong>
                  <MathText>{ej.ex}</MathText>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AutoCheck
        pregunta="¿Qué pareja agrupa correctamente UNA onda mecánica longitudinal y UNA onda electromagnética transversal?"
        opciones={[
          "Rayos X y sonido en el aire",
          "Microondas y ondas en una cuerda",
          "Luz infrarroja y ultrasonido médico",
          "Ultrasonido médico y luz visible",
        ]}
        correctaIdx={3}
        explicacion="El ultrasonido médico es sonido de alta frecuencia (mecánica longitudinal en tejidos/agua), mientras que la luz visible es una onda electromagnética transversal capaz de viajar en el vacío."
      />

      <Resumen>
        Toda onda transporta energía sin materia y obedece <MathText>{"$v = \\lambda f$"}</MathText>, con <MathText>{"$f = 1/T$"}</MathText>. En una cuerda <MathText>{"$v = \\sqrt{F/\\mu}$"}</MathText>; en el aire el sonido viaja cerca de <MathText>{"$340\\text{ m/s}$"}</MathText> y su nivel es <MathText>{"$\\beta = 10\\log_{10}(I/I_0)$"}</MathText>. En eco y ecografía (<MathText>{"$v \\approx 1500\\text{ m/s}$"}</MathText>) usa <MathText>{"$2d = v t$"}</MathText>, y en el vacío todas las ondas electromagnéticas viajan a <MathText>{"$c = 3{,}0 \\times 10^{8}\\text{ m/s}$"}</MathText>.
      </Resumen>
    </EscenaRica>
  );
}

const ESCENAS = [
  { titulo: "Qué es una onda · mecánicas y electromagnéticas", componente: EscQueEsOnda },
  { titulo: "Ondas transversales y longitudinales", componente: EscTiposOnda },
  { titulo: "Elementos de una onda · λ, A, T y f", componente: EscElementos },
  { titulo: "Rapidez de propagación · v = λf y cuerda", componente: EscRapidezCuerda },
  { titulo: "El sonido · rapidez, intensidad y decibeles", componente: EscSonidoDecibeles },
  { titulo: "Eco y problemas de pozo con caída libre", componente: EscEcoPozo },
  { titulo: "Efecto Doppler y espectro electromagnético", componente: EscDopplerEspectro },
  { titulo: "Aplicación médica · ecografía", componente: EscEcografia },
  { titulo: "Errores y práctica", componente: EscPractica },
];

export default function PaginaOndasSonido() {
  return (
    <LeccionShell
      unidad="FIS-11"
      tituloUnidad="Ondas mecánicas, electromagnéticas y sonido"
      escenas={ESCENAS}
    />
  );
}

/* VERIFICACIÓN:
- Escena 1 WorkedExample (adaptado de MFQ_INVENTARIO.md §4.2 F2 P4):
  * f = 5,0e14 Hz, t = 2,0e-6 s -> N = f * t = 5,0e14 * 2,0e-6 = 10e8 = 1,0e9 ciclos.
  * Ultrasonido = onda mecánica longitudinal (no viaja en vacío); rayos X, luz verde, microondas = ondas EM.
- Escena 1 AutoCheck (MFQ_INVENTARIO.md §4.2 F2 P4):
  * Onda que NO se propaga en el vacío = Ultrasonido (correctaIdx = 2).
- Escena 2 WorkedExample:
  * Compresión a rarefacción adyacente = lambda / 2 = 0,85 m -> lambda = 2 * 0,85 = 1,70 m.
  * d = 1,7 km = 1700 m, v = 340 m/s -> t = 1700 / 340 = 5,0 s.
- Escena 3 DiagramaElementosOnda:
  * Tramo 6,0 m con nCiclos in [1.5, 2.0, 2.5, 3.0] -> lambda = 6 / nCiclos -> [4, 3, 2.4, 2].
- Escena 3 WorkedExample & AutoCheck (MFQ_INVENTARIO.md §4.2 F2 P2):
  * T = 0,02 s -> f = 1 / T = 1 / 0,02 = 50 Hz.
  * t = 0,5 s -> N = 50 * 0,5 = 25 oscilaciones.
- Escena 4 DiagramaCuerdaTensa:
  * mu = 0,01 kg/m, F in {16, 36, 64} N -> v = sqrt(F / mu) = {40, 60, 80} m/s.
  * f = 30 Hz -> lambda = v / f = {1,33; 2,00; 2,67} m.
- Escena 4 WorkedExample:
  * m = 0,04 kg, L = 4,0 m -> mu = 0,04 / 4,0 = 0,01 kg/m.
  * F = 36 N -> v = sqrt(36 / 0,01) = sqrt(3600) = 60 m/s.
  * f = 30 Hz -> lambda = 60 / 30 = 2,0 m.
- Escena 4 AutoCheck:
  * v = 40 m/s, f1 = 20 Hz -> lambda1 = 40 / 20 = 2 m.
  * f2 = 40 Hz (misma cuerda y tensión) -> v = 40 m/s constante, lambda2 = 40 / 40 = 1 m.
- Escena 5 WorkedExample:
  * I1 = 1,0e-6 W/m², I0 = 1e-12 W/m² -> I1/I0 = 1e6 -> beta1 = 10 * log10(1e6) = 60 dB.
  * r1 = 2,0 m -> r2 = 4,0 m (doble distancia) -> I2 = I1 / 2² = 1,0e-6 / 4 = 2,5e-7 W/m².
  * beta = 80 dB -> log10(I80/I0) = 80 / 10 = 8 -> I80 = 10^8 * 10^-12 = 10^-4 W/m².
- Escena 5 AutoCheck:
  * 50 dB -> 70 dB (+20 dB) -> factor = 10^(20/10) = 10² = 100 veces.
- Escena 6 WorkedExample 1 (UMSS 2017-2op-2-2017.md P12):
  * vp = 5 m/s, d = 690 m, t = 4 s -> xp = 5 * 4 = 20 m -> d_sonido = 2*690 - 20 = 1360 m -> vs = 1360 / 4 = 340 m/s.
- Escena 6 WorkedExample 2 (UMSS 2025-3op-1-2025.md P3):
  * t_total = 9 s, vs = 320 m/s, g = 10 m/s² (dato explícito del problema):
    h = 0,5 * 10 * t1² = 5 t1² y h = 320 * (9 - t1)
    5 t1² = 320(9 - t1) -> t1² + 64 t1 - 576 = 0 -> (t1 + 72)(t1 - 8) = 0 -> t1 = 8 s
    h = 5 * 64 = 320 m. Verificación: t2 = 9 - 8 = 1 s -> 320 * 1 = 320 m.
- Escena 6 AutoCheck (MFQ_INVENTARIO.md §4.2 F2 P3):
  * t = 1,6 s, v = 340 m/s -> 2d = 340 * 1,6 = 544 m -> d = 544 / 2 = 272 m.
- Escena 7 WorkedExample & AutoCheck (MFQ_INVENTARIO.md §4.2 F2 P5):
  * c = 3,0e8 m/s, lambda = 600 nm = 600e-9 m = 6,0e-7 m -> f = 3,0e8 / 6,0e-7 = 0,5e15 = 5,0e14 Hz.
- Escena 8 DiagramaEcografia:
  * v = 1500 m/s: f = 2 MHz -> lambda = 1500 / 2e6 = 7,5e-4 m = 0,75 mm; f = 10 MHz -> lambda = 1500 / 10e6 = 1,5e-4 m = 0,15 mm.
- Escena 8 WorkedExample & AutoCheck (MFQ_INVENTARIO.md §4.2 F2 P1):
  * f = 2,0 MHz = 2,0e6 Hz, v = 1500 m/s -> lambda = 1500 / 2,0e6 = 7,5e-4 m = 0,75 mm.
  * t = 1,0e-4 s -> d = (1500 * 1,0e-4) / 2 = 0,15 / 2 = 0,075 m = 7,5 cm.
- Escena 9 Práctica:
  * E1: lambda = 0,50 m, f = 80 Hz -> v = 0,50 * 80 = 40 m/s (c = 1).
  * E2: I = 1e-4 W/m², I0 = 1e-12 W/m² -> I/I0 = 1e8 -> beta = 10 * 8 = 80 dB (c = 3).
  * E3: Ambulancia alejándose -> f' < f, tono más grave (c = 2).
  * E4 (adaptado 2017-2op-2-2017.md P12): vp = 4 m/s, d = 516 m, t = 3,0 s -> xp = 12 m, d_sonido = 1032 - 12 = 1020 m -> vs = 1020 / 3,0 = 340 m/s (c = 0).
  * E5: v = 1500 m/s, t = 8,0e-5 s -> v*t = 0,12 m -> d = 0,12 / 2 = 0,06 m = 6,0 cm (c = 2).
  * AutoCheck final: Ultrasonido médico (mecánica longitudinal) + luz visible (EM transversal) (correctaIdx = 3).
*/
