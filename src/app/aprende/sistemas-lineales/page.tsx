"use client";

import { useState, useMemo, useId } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
} from "../_components/atoms";
import { Pizarra, Ejes, Hint, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

// Intersección de rectas: dos rectas se dibujan y aparece el punto de
// intersección. Tocar para alternar entre los 3 casos: única / sin solución
// (paralelas) / infinitas (coincidentes).
function InterseccionRectas() {
  const casos = [
    { titulo: "Única solución", color: LIENZO.ok, m1: 1, b1: 4, m2: -1, b2: 8, sol: "(2, 6)" },
    { titulo: "Sin solución · paralelas", color: LIENZO.bad, m1: 1, b1: 1, m2: 1, b2: 4, sol: "∅" },
    { titulo: "Infinitas · coincidentes", color: LIENZO.warn, m1: 0.5, b1: 2, m2: 0.5, b2: 2, sol: "∞" },
  ];
  const [i, setI] = useState(0);
  const { titulo, color, m1, b1, m2, b2, sol } = casos[i];
  const xMin = -4, xMax = 8, yMin = -2, yMax = 10, alto = 280;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  // Intersección
  const tieneInt = Math.abs(m1 - m2) > 1e-6;
  const xi = tieneInt ? (b2 - b1) / (m1 - m2) : 0;
  const yi = m1 * xi + b1;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto} onClick={() => setI((v) => (v + 1) % casos.length)}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <motion.line
            x1={sx(xMin)} y1={sy(m1 * xMin + b1)} x2={sx(xMax)} y2={sy(m1 * xMax + b1)}
            stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round"
            initial={false} animate={{
              x1: sx(xMin), y1: sy(m1 * xMin + b1),
              x2: sx(xMax), y2: sy(m1 * xMax + b1),
            }} transition={{ duration: 0.3 }} />
          <motion.line
            x1={sx(xMin)} y1={sy(m2 * xMin + b2)} x2={sx(xMax)} y2={sy(m2 * xMax + b2)}
            stroke={LIENZO.ok} strokeWidth="3" strokeLinecap="round"
            initial={false} animate={{
              x1: sx(xMin), y1: sy(m2 * xMin + b2),
              x2: sx(xMax), y2: sy(m2 * xMax + b2),
            }} transition={{ duration: 0.3 }} />
          {tieneInt && xi > xMin && xi < xMax && yi > yMin && yi < yMax && (
            <motion.circle cx={sx(xi)} cy={sy(yi)} r="7" fill={color}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }} />
          )}
        </Ejes>
      </Pizarra>
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {casos.map((_, k) => (
          <button key={k} onClick={() => setI(k)}
            style={{
              width: 8, height: 8, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
              background: i === k ? LIENZO.fg : LIENZO.fgFaint,
            }} aria-label={`Caso ${k + 1}`} />
        ))}
      </div>
      <div style={{
        fontFamily: "var(--font-crimson), serif", textAlign: "center",
        fontSize: 18, color: LIENZO.fg, fontWeight: 500,
      }}>
        <span style={{ color }}>{titulo}</span> · solución: <strong>{sol}</strong>
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic" }}>
        Tocá la imagen para alternar entre los 3 casos posibles
      </div>
    </div>
  );
}

// ─── Sustitución: la expresión despejada ocupa físicamente el lugar de la y ───
function SustitucionVisual() {
  const [paso, setPaso] = useState(0);
  const alto = 216;
  const baseX = 44, filaY = 46, filaY2 = 96, resY = 152, finY = 194;
  // Cada token va en una posición propia: así sé exactamente dónde cae la "y"
  // que se reemplaza y puedo apuntarle la flecha.
  const dx = [0, 22, 46, 72, 100];
  const yTokenX = baseX + dx[2];
  const cajaX = 252, cajaW = 118, cajaH = 34, cajaY = filaY - 24;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto} onClick={() => setPaso((p) => (p + 1) % 3)}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x={baseX - 26} y={filaY} fontSize="15" fill={LIENZO.fgFaint}>1</text>
          {["x", "+", "y", "=", "10"].map((t, i) => (
            <text key={`a${i}`} x={baseX + dx[i]} y={filaY} fontSize="22" fontWeight="600"
              fill={i === 2 ? LIENZO.accent : LIENZO.fg}>{t}</text>
          ))}
          <text x={baseX - 26} y={filaY2} fontSize="15" fill={LIENZO.fgFaint}>2</text>
          {["x", "−", "y", "=", "2"].map((t, i) => (
            <text key={`b${i}`} x={baseX + dx[i]} y={filaY2} fontSize="22" fontWeight="600"
              fill={i === 2 ? LIENZO.accent : LIENZO.fg}
              opacity={i === 2 && paso >= 1 ? 0.25 : 1}>{t}</text>
          ))}

          {paso >= 0 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <rect x={cajaX} y={cajaY} width={cajaW} height={cajaH} rx="8"
                fill="none" stroke={LIENZO.accent} strokeWidth="2" />
              <text x={cajaX + cajaW / 2} y={filaY} textAnchor="middle" fontSize="21"
                fontWeight="600" fill={LIENZO.accent}>y = 10 − x</text>
              <text x={cajaX + cajaW / 2} y={cajaY - 10} textAnchor="middle" fontSize="12"
                fill={LIENZO.fgDim}>despejo de 1</text>
            </motion.g>
          )}

          {paso >= 1 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <path d={`M ${cajaX + 10} ${cajaY + cajaH} Q ${cajaX - 60} ${filaY2 - 6} ${yTokenX + 14} ${filaY2 - 12}`}
                fill="none" stroke={LIENZO.accent} strokeWidth="2" strokeDasharray="5 4"
                markerEnd="url(#sust-arrow)" />
              <defs>
                <marker id="sust-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                  <path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.accent} />
                </marker>
              </defs>
              <text x={baseX} y={resY} fontSize="22" fontWeight="600" fill={LIENZO.fg}>
                x − (10 − x) = 2
              </text>
            </motion.g>
          )}

          {paso >= 2 && (
            <motion.text initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              x={baseX} y={finY} fontSize="22" fontWeight="700" fill={LIENZO.ok}>
              2x = 12 → x = 6 → y = 4
            </motion.text>
          )}
        </svg>
      </Pizarra>
      <Hint>
        {paso === 0 && "Tocá: reemplazá la y de la ecuación 2 por su valor"}
        {paso === 1 && "Tocá: ya queda una sola incógnita, resolvela"}
        {paso === 2 && "Tocá para volver al inicio"}
      </Hint>
    </div>
  );
}

// ─── Igualación: dos caminos que valen lo mismo se pueden pegar ───
function IgualacionVisual() {
  const alto = 210;
  const cx = 240, topY = 46, midY = 116, botY = 182;
  const izqX = 108, derX = 372;
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x={izqX} y={topY} textAnchor="middle" fontSize="21" fontWeight="600" fill={LIENZO.accent}>x = 10 − y</text>
          <text x={izqX} y={topY - 22} textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>de la ecuación 1</text>
          <text x={derX} y={topY} textAnchor="middle" fontSize="21" fontWeight="600" fill={LIENZO.ok}>x = 2 + y</text>
          <text x={derX} y={topY - 22} textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>de la ecuación 2</text>

          <path d={`M ${izqX} ${topY + 14} Q ${izqX} ${midY - 18} ${cx - 22} ${midY - 12}`}
            fill="none" stroke={LIENZO.accent} strokeWidth="2" />
          <path d={`M ${derX} ${topY + 14} Q ${derX} ${midY - 18} ${cx + 22} ${midY - 12}`}
            fill="none" stroke={LIENZO.ok} strokeWidth="2" />

          <text x={cx} y={midY + 6} textAnchor="middle" fontSize="15" fill={LIENZO.fgDim}>
            las dos valen x, entonces valen entre sí
          </text>

          <line x1={cx} y1={midY + 18} x2={cx} y2={botY - 26} stroke={LIENZO.fgFaint} strokeWidth="2"
            markerEnd="url(#igual-arrow)" />
          <defs>
            <marker id="igual-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.fgFaint} />
            </marker>
          </defs>
          <text x={cx} y={botY} textAnchor="middle" fontSize="23" fontWeight="700" fill={LIENZO.fg}>
            10 − y = 2 + y
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

// ─── Reducción: suma en columnas y la columna que se cancela ───
function ReduccionVisual() {
  const [sumado, setSumado] = useState(false);
  const alto = 220;
  // Columnas alineadas: cada término cae siempre en la misma x, que es
  // justamente lo que hace evidente que +y y −y se cancelan.
  const colX = { x: 190, y: 265, ig: 320, n: 365 };
  const f1 = 54, f2 = 100, linea = 122, f3 = 164;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto} onClick={() => setSumado((v) => !v)}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {sumado && (
            <motion.rect initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              x={colX.y - 34} y={f1 - 26} width="60" height={f2 - f1 + 34} rx="8"
              fill={LIENZO.warn} fillOpacity="0.12" />
          )}

          <text x={colX.x} y={f1} textAnchor="end" fontSize="22" fontWeight="600" fill={LIENZO.fg}>x</text>
          <text x={colX.y} y={f1} textAnchor="end" fontSize="22" fontWeight="600" fill={LIENZO.warn}>+ y</text>
          <text x={colX.ig} y={f1} textAnchor="end" fontSize="22" fontWeight="600" fill={LIENZO.fgDim}>=</text>
          <text x={colX.n} y={f1} textAnchor="end" fontSize="22" fontWeight="600" fill={LIENZO.fg}>10</text>

          <text x={colX.x} y={f2} textAnchor="end" fontSize="22" fontWeight="600" fill={LIENZO.fg}>x</text>
          <text x={colX.y} y={f2} textAnchor="end" fontSize="22" fontWeight="600" fill={LIENZO.warn}>− y</text>
          <text x={colX.ig} y={f2} textAnchor="end" fontSize="22" fontWeight="600" fill={LIENZO.fgDim}>=</text>
          <text x={colX.n} y={f2} textAnchor="end" fontSize="22" fontWeight="600" fill={LIENZO.fg}>2</text>

          <text x={colX.x - 78} y={f2} fontSize="24" fontWeight="700" fill={LIENZO.accent}>+</text>
          <line x1={colX.x - 86} y1={linea} x2={colX.n + 10} y2={linea}
            stroke={LIENZO.fg} strokeWidth="2" />


          {sumado && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={colX.y - 30} y1={(f1 + f2) / 2 - 8} x2={colX.y + 6} y2={(f1 + f2) / 2 - 8}
                stroke={LIENZO.warn} strokeWidth="2.5" strokeLinecap="round" />
              <text x={colX.y + 46} y={(f1 + f2) / 2 - 4} fontSize="13" fill={LIENZO.warn} fontWeight="700">
                se cancelan
              </text>
            </motion.g>
          )}

          <motion.g initial={false} animate={{ opacity: sumado ? 1 : 0.25 }} transition={{ duration: 0.3 }}>
            <text x={colX.x} y={f3} textAnchor="end" fontSize="24" fontWeight="700" fill={LIENZO.ok}>2x</text>
            <text x={colX.ig} y={f3} textAnchor="end" fontSize="24" fontWeight="700" fill={LIENZO.fgDim}>=</text>
            <text x={colX.n} y={f3} textAnchor="end" fontSize="24" fontWeight="700" fill={LIENZO.ok}>12</text>
            <text x="240" y={f3 + 36} textAnchor="middle" fontSize="22" fontWeight="700" fill={LIENZO.ok}>
              x = 6 → y = 4
            </text>
          </motion.g>
        </svg>
      </Pizarra>
      <Hint>{sumado ? "Una sola incógnita: 2x = 12" : "Tocá para sumar las dos ecuaciones"}</Hint>
    </div>
  );
}

// ─── Árbol de decisión: qué método conviene según cómo viene el sistema ───
function ElegirMetodoVisual() {
  const alto = 210;
  const raizX = 240, raizY = 34;
  const ramas = [
    { x: 82, cond: ["Una variable con", "coeficiente 1"], metodo: "SUSTITUCIÓN", color: LIENZO.ok },
    { x: 240, cond: ["Coeficientes parecidos", "en una variable"], metodo: "REDUCCIÓN", color: LIENZO.accent },
    { x: 398, cond: ["Fácil despejar la misma", "variable en las dos"], metodo: "IGUALACIÓN", color: LIENZO.warn },
  ];
  const condY = 100, pillY = 152, pillH = 30, pillW = 128;
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x={raizX} y={raizY} textAnchor="middle" fontSize="18" fontWeight="700" fill={LIENZO.fg}>
            Mirá los coeficientes
          </text>
          {ramas.map((r) => (
            <g key={r.metodo}>
              <path d={`M ${raizX} ${raizY + 12} Q ${r.x} ${raizY + 30} ${r.x} ${condY - 26}`}
                fill="none" stroke={LIENZO.fgFaint} strokeWidth="1.8" />
              {r.cond.map((linea, k) => (
                <text key={k} x={r.x} y={condY + k * 15} textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>
                  {linea}
                </text>
              ))}
              <rect x={r.x - pillW / 2} y={pillY} width={pillW} height={pillH} rx={pillH / 2}
                fill="none" stroke={r.color} strokeWidth="2" />
              <text x={r.x} y={pillY + 20} textAnchor="middle" fontSize="13" fontWeight="800"
                fill={r.color} letterSpacing="0.5">{r.metodo}</text>
            </g>
          ))}
        </svg>
      </Pizarra>
    </div>
  );
}

// ─── Mini plano reutilizable: dibuja rectas y = mx + b recortadas al recuadro ───
function MiniPlano({ w, h, rectas, punto }: {
  w: number; h: number;
  rectas: { m: number; b: number; color: string; dash?: boolean }[];
  punto?: { x: number; y: number };
}) {
  const clipId = useId();
  const xMin = -1, xMax = 11, yMin = -1, yMax = 11;
  const px = (x: number) => ((x - xMin) / (xMax - xMin)) * w;
  const py = (y: number) => h - ((y - yMin) / (yMax - yMin)) * h;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <clipPath id={clipId}><rect x="0" y="0" width={w} height={h} /></clipPath>
      </defs>
      <rect x="0" y="0" width={w} height={h} fill={LIENZO.bgSoft} rx="8" />
      <g clipPath={`url(#${clipId})`}>
        <line x1={px(xMin)} y1={py(0)} x2={px(xMax)} y2={py(0)} stroke={LIENZO.fgFaint} strokeWidth="1" />
        <line x1={px(0)} y1={py(yMin)} x2={px(0)} y2={py(yMax)} stroke={LIENZO.fgFaint} strokeWidth="1" />
        {rectas.map((r, i) => (
          <line key={i}
            x1={px(xMin)} y1={py(r.m * xMin + r.b)}
            x2={px(xMax)} y2={py(r.m * xMax + r.b)}
            stroke={r.color} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={r.dash ? "6 4" : undefined} />
        ))}
        {punto && <circle cx={px(punto.x)} cy={py(punto.y)} r="5" fill={LIENZO.fg} />}
      </g>
    </svg>
  );
}

// ─── Los 3 casos: la geometría al lado de su firma algebraica ───
function TresCasosAlgebra() {
  // Rectas sacadas de los sistemas reales que aparecen en el texto de la escena.
  const casos = [
    {
      titulo: "Se cruzan", firma: "x = 6", tipo: "Solución única",
      color: LIENZO.ok,
      rectas: [{ m: -1, b: 10, color: LIENZO.accent }, { m: 1, b: -2, color: LIENZO.ok }],
      punto: { x: 6, y: 4 },
    },
    {
      titulo: "Paralelas", firma: "0 = 4", tipo: "Sin solución",
      color: LIENZO.bad,
      rectas: [{ m: -1, b: 5, color: LIENZO.accent }, { m: -1, b: 9, color: LIENZO.bad }],
    },
    {
      titulo: "Encimadas", firma: "0 = 0", tipo: "Infinitas",
      color: LIENZO.warn,
      rectas: [
        { m: -1, b: 5, color: LIENZO.accent },
        { m: -1, b: 5, color: LIENZO.warn, dash: true },
      ],
    },
  ];
  return (
    <div style={{
      width: "100%", maxWidth: 620, display: "flex", gap: 10,
      justifyContent: "center", flexWrap: "wrap",
    }}>
      {casos.map((c) => (
        <div key={c.tipo} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <MiniPlano w={168} h={132} rectas={c.rectas} punto={c.punto} />
          <div style={{ fontSize: 13, color: LIENZO.fgDim }}>{c.titulo}</div>
          <div style={{
            fontFamily: "var(--font-crimson), serif", fontSize: 20, fontWeight: 700, color: c.color,
          }}>{c.firma}</div>
          <div style={{ fontSize: 12, color: LIENZO.fgFaint, letterSpacing: 0.4 }}>{c.tipo}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Billetes: las dos restricciones a la vez, movibles ───
function BilletesVisual() {
  const TOTAL = 25, OBJETIVO = 92;
  const [cinco, setCinco] = useState(8);
  const dos = TOTAL - cinco;
  const monto = dos * 2 + cinco * 5;
  const cumple = monto === OBJETIVO;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", minHeight: 76 }}>
        {Array.from({ length: TOTAL }, (_, i) => {
          const esCinco = i < cinco;
          return (
            <motion.div key={i} layout transition={{ duration: 0.2 }}
              style={{
                width: 30, height: 34, borderRadius: 5,
                border: `1.5px solid ${esCinco ? LIENZO.ok : LIENZO.accent}`,
                background: esCinco ? "rgba(5,150,105,0.10)" : "rgba(109,40,217,0.08)",
                color: esCinco ? LIENZO.ok : LIENZO.accent,
                fontFamily: "var(--font-crimson), serif", fontSize: 13, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
              {esCinco ? "5" : "2"}
            </motion.div>
          );
        })}
      </div>

      <input type="range" min={0} max={TOTAL} value={cinco}
        onChange={(e) => setCinco(Number(e.target.value))}
        aria-label="Cantidad de billetes de 5 Bs"
        style={{ width: "100%", accentColor: LIENZO.accent }} />

      <div style={{
        display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap",
        fontFamily: "var(--font-crimson), serif", fontSize: 17,
      }}>
        <span style={{ color: LIENZO.fgDim }}>
          x + y = {dos} + {cinco} = <strong style={{ color: LIENZO.ok }}>{TOTAL}</strong>
        </span>
        <span style={{ color: LIENZO.fgDim }}>
          2x + 5y = <strong style={{ color: cumple ? LIENZO.ok : LIENZO.bad }}>{monto}</strong>
          <span style={{ color: LIENZO.fgFaint }}> / {OBJETIVO} Bs</span>
        </span>
      </div>

      <Hint>
        {cumple
          ? "Las dos ecuaciones se cumplen a la vez: 11 de 2 Bs y 14 de 5 Bs"
          : "Moviendo el control siempre hay 25 billetes, pero el monto cambia: buscá los 92 Bs"}
      </Hint>
    </div>
  );
}

// ─── Cuándo sumar y cuándo restar para cancelar ───
function SignosReduccionVisual() {
  const alto = 200;
  const bloques = [
    {
      cx: 128, signos: ["+ 2y", "+ 2y"], op: "RESTÁ", color: LIENZO.bad,
      nota: "mismo signo",
    },
    {
      cx: 352, signos: ["+ y", "− y"], op: "SUMÁ", color: LIENZO.ok,
      nota: "signo opuesto",
    },
  ];
  const f1 = 66, f2 = 106, linea = 126, res = 160;
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <line x1="240" y1="24" x2="240" y2={alto - 16} stroke={LIENZO.fgFaint} strokeOpacity="0.5" strokeWidth="1" />
          {bloques.map((b) => (
            <g key={b.op}>
              <text x={b.cx} y="34" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}
                letterSpacing="0.5">{b.nota}</text>
              <text x={b.cx} y={f1} textAnchor="middle" fontSize="24" fontWeight="600" fill={LIENZO.fg}>{b.signos[0]}</text>
              <text x={b.cx} y={f2} textAnchor="middle" fontSize="24" fontWeight="600" fill={LIENZO.fg}>{b.signos[1]}</text>
              <line x1={b.cx - 44} y1={linea} x2={b.cx + 44} y2={linea} stroke={LIENZO.fg} strokeWidth="2" />
              <text x={b.cx} y={res} textAnchor="middle" fontSize="15" fontWeight="800"
                fill={b.color} letterSpacing="0.5">{b.op}</text>
              <text x={b.cx} y={res + 22} textAnchor="middle" fontSize="13" fill={LIENZO.fgDim}>
                para que la variable desaparezca
              </text>
            </g>
          ))}
        </svg>
      </Pizarra>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="06"
      tituloUnidad="Sistemas de ecuaciones lineales"
      escenas={[
        { titulo: "¿Qué es un sistema?", componente: Esc01_Intro },
        { titulo: "Método 1: Sustitución", componente: Esc02_Sust },
        { titulo: "Método 2: Igualación", componente: Esc03_Igual },
        { titulo: "Método 3: Reducción", componente: Esc04_Red },
        { titulo: "Cuándo usar cada método", componente: Esc05_Cual },
        { titulo: "Sistemas sin solución o infinitas", componente: Esc06_Casos },
        { titulo: "Problema verbal con sistema", componente: Esc07_Verbal },
        { titulo: "Errores comunes", componente: Esc08_Errores },
        { titulo: "Práctica final", componente: Esc09_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Sistema de ecuaciones</Titulo>
      <Definicion termino="sistema">
        Un <strong>sistema lineal</strong> son DOS (o más) ecuaciones con DOS (o más)
        incógnitas que se resuelven JUNTAS. La solución es un par (x, y) que cumple
        AMBAS ecuaciones simultáneamente.
      </Definicion>
      <Ejemplo>
        <strong>{`{ x + y = 10, x − y = 2 }`}</strong> → Solución: x = 6, y = 4.<br />
        Verificación: 6+4 = 10 ✓ y 6−4 = 2 ✓.
      </Ejemplo>
      <Parrafo>
        Geométricamente: cada ecuación es una recta. La solución es el
        <strong> punto de intersección</strong>. Pueden pasar 3 cosas:
      </Parrafo>
      <InterseccionRectas />
      <Resumen>
        🎯 Aparece en problemas reales: <br />
        • Compré 2 productos por X total, conozco otra restricción → 2 ecs.<br />
        • Edades, mezclas, intersección de rectas, sistemas de oferta y demanda.<br />
        Vamos a ver <strong>3 métodos</strong>: sustitución, igualación, reducción.
      </Resumen>

      <Hook>
        Sistemas de ecuaciones lineales aparecen en <strong>2-4 preguntas del examen UMSS</strong>
        (problemas con 2 incógnitas: precios, edades, mezclas). Conocer los 3 métodos te
        permite elegir el más rápido según el sistema.
      </Hook>

      <Mnemotecnia>
        <strong>"S-I-R" · los 3 métodos en orden de preferencia</strong>:<br />
        <strong>R</strong>educción (sumar/restar ecuaciones): la más rápida en el examen.<br />
        <strong>S</strong>ustitución (despejar una y reemplazar): la más versátil.<br />
        <strong>I</strong>gualación (despejar la misma variable en ambas): la más elegante.<br /><br />
        Los 3 dan el mismo resultado. Elegí según el sistema.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_Sust() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Método 1: Sustitución</Titulo>
      <Resumen>
        <strong>Idea</strong>: despejá una variable en UNA ecuación y reemplazala en la otra.
      </Resumen>

      <SustitucionVisual />

      <Ejemplo titulo="Sistema: x + y = 10 ; x − y = 2">
        <Paso n={1}>De la 1ª despejo y: y = 10 − x.</Paso>
        <Paso n={2}>Sustituyo en la 2ª: x − (10 − x) = 2 → x − 10 + x = 2 → 2x = 12 → x = 6.</Paso>
        <Paso n={3}>Volviendo: y = 10 − 6 = 4.</Paso>
        <Paso n={4}>Solución: <strong style={{ color: COLOR_OK }}>(6, 4)</strong>.</Paso>
      </Ejemplo>

      <PorQue>
        El truco mental: si y = 10 − x, entonces donde diga y en cualquier otra ecuación
        puedo escribir 10 − x. Reducís el problema a una sola variable.
      </PorQue>

      <Cuidado>
        Conviene despejar la variable que tenga <strong>coeficiente 1 o -1</strong> (no tenés que dividir).
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_Igual() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Método 2: Igualación</Titulo>
      <Resumen>
        <strong>Idea</strong>: despejá la MISMA variable en AMBAS ecuaciones y luego igualá.
      </Resumen>

      <IgualacionVisual />

      <Ejemplo titulo="Sistema: x + y = 10 ; x − y = 2">
        <Paso n={1}>Despejo x en ambas: x = 10 − y &nbsp; y &nbsp; x = 2 + y.</Paso>
        <Paso n={2}>Igualo: 10 − y = 2 + y → 8 = 2y → y = 4.</Paso>
        <Paso n={3}>Sustituyo en cualquiera: x = 10 − 4 = 6.</Paso>
        <Paso n={4}>Solución: <strong style={{ color: COLOR_OK }}>(6, 4)</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Útil cuando AMBAS ecuaciones son fáciles de despejar para la misma variable.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc04_Red() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Método 3: Reducción (el más rápido)</Titulo>
      <Resumen>
        <strong>Idea</strong>: sumá (o restá) las dos ecuaciones de modo que UNA variable se cancele.
      </Resumen>

      <ReduccionVisual />

      <Ejemplo titulo="Sistema: x + y = 10 ; x − y = 2">
        <Paso n={1}>Sumo las dos ecuaciones: <strong>(x + y) + (x − y) = 10 + 2 → 2x = 12</strong></Paso>
        <Paso n={2}>x = 6. Y de cualquiera: y = 4.</Paso>
        <Paso n={3}>Solución: <strong style={{ color: COLOR_OK }}>(6, 4)</strong>. ¡Súper rápido!</Paso>
      </Ejemplo>

      <Ejemplo titulo="A veces hay que ajustar primero: 3x + 2y = 12 ; 5x + 2y = 16">
        <Paso n={1}>RESTO la 1ª de la 2ª: (5x+2y) − (3x+2y) = 16 − 12 → 2x = 4 → x = 2.</Paso>
        <Paso n={2}>Sustituyo: 3·2 + 2y = 12 → 2y = 6 → y = 3.</Paso>
        <Paso n={3}>Solución: (2, 3).</Paso>
      </Ejemplo>

      <Ejemplo titulo="Otra: 2x + 3y = 13 ; 4x − y = 5">
        <Paso n={1}>Multiplico la 2ª por 3 para emparejar y: 12x − 3y = 15.</Paso>
        <Paso n={2}>Sumo con la 1ª: 14x = 28 → x = 2.</Paso>
        <Paso n={3}>Sustituyo: 2·2 + 3y = 13 → y = 3. Solución: (2, 3).</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05_Cual() {
  return (
    <EscenaRica>
      <Titulo>¿Cuál método uso?</Titulo>

      <ElegirMetodoVisual />

      <Resumen>
        🎯 Pista rápida según el sistema:<br />
        • Si una variable ya está despejada (o se despeja fácil) → <strong>SUSTITUCIÓN</strong>.<br />
        • Si las dos ecuaciones tienen coef parecidos → <strong>REDUCCIÓN</strong>.<br />
        • Si las dos son simétricas/fáciles para la misma variable → <strong>IGUALACIÓN</strong>.<br />
        Cualquier método te da el mismo resultado. Usá el que veas más cómodo.
      </Resumen>
      <Cuidado>
        En un examen, <strong>reducción suele ser la más rápida</strong> cuando los coeficientes
        de una variable son fáciles de emparejar.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_Casos() {
  return (
    <EscenaRica>
      <Titulo>3 escenarios posibles</Titulo>

      <TresCasosAlgebra />

      <Ejemplo titulo="1. Solución única (caso normal)">
        Las dos ecuaciones son rectas que se CRUZAN en un punto. Hay una sola (x, y).
      </Ejemplo>

      <Ejemplo titulo="2. Sin solución (rectas paralelas)">
        <strong>{`{ x + y = 5, x + y = 9 }`}</strong>: contradicción (5 ≠ 9). NO hay (x,y) que cumpla ambas. Sistema <strong>incompatible</strong>.
      </Ejemplo>

      <Ejemplo titulo="3. Infinitas soluciones (la misma recta)">
        <strong>{`{ x + y = 5, 2x + 2y = 10 }`}</strong>: la 2ª es solo la 1ª multiplicada por 2. Cualquier (x, y) que cumpla x+y=5 vale. Sistema <strong>compatible indeterminado</strong>.
      </Ejemplo>

      <PorQue>
        Cuando aplicás cualquier método y llegás a "0 = 5", no hay solución. Si llegás
        a "0 = 0", hay infinitas. Si llegás a "x = número", solución única.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07_Verbal() {
  return (
    <EscenaRica>
      <Titulo>Problema verbal con sistema</Titulo>
      <Ejemplo titulo="Dos números suman 20 y su diferencia es 4. ¿Cuáles son?">
        <Paso n={1}>Nombro: x e y los números.</Paso>
        <Paso n={2}>Sistema: x + y = 20 ; x − y = 4.</Paso>
        <Paso n={3}>Reducción: sumo. 2x = 24 → x = 12.</Paso>
        <Paso n={4}>Y: y = 8. <strong style={{ color: COLOR_OK }}>(12, 8)</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="3 lápices y 2 cuadernos cuestan 23 Bs. 1 lápiz y 4 cuadernos cuestan 21 Bs. ¿Precio de cada uno?">
        <Paso n={1}>x = precio lápiz, y = precio cuaderno.</Paso>
        <Paso n={2}>Sistema: 3x + 2y = 23 ; x + 4y = 21.</Paso>
        <Paso n={3}>De la 2ª: x = 21 − 4y. Sustituyo en 1ª: 3(21−4y) + 2y = 23 → 63 − 12y + 2y = 23 → −10y = −40 → y = 4.</Paso>
        <Paso n={4}>x = 21 − 16 = 5. Lápiz <strong style={{ color: COLOR_OK }}>5 Bs</strong>, cuaderno <strong style={{ color: COLOR_OK }}>4 Bs</strong>.</Paso>
      </Ejemplo>

      <BilletesVisual />

      <WorkedExample titulo="Problema de billetes · cobrador de micro La Paz">
        Un cobrador termina el día con <strong>25 billetes</strong> en la mano (mezcla de
        2 Bs y 5 Bs) por un total de <strong>92 Bs</strong>. ¿Cuántos billetes de cada tipo
        tiene?<br /><br />

        <strong>Paso 1 · Definir incógnitas:</strong><br />
        x = nº de billetes de 2 Bs.<br />
        y = nº de billetes de 5 Bs.<br /><br />

        <strong>Paso 2 · Plantear el sistema:</strong><br />
        • Ec.1 (cantidad): x + y = 25.<br />
        • Ec.2 (monto): 2x + 5y = 92.<br /><br />

        <strong>Paso 3 · Método de reducción:</strong><br />
        Multiplico Ec.1 por −2: −2x − 2y = −50.<br />
        Sumo con Ec.2: 3y = 42.<br />
        y = <strong>14 billetes de 5 Bs</strong>.<br /><br />

        <strong>Paso 4 · Calculo x:</strong><br />
        x = 25 − 14 = <strong>11 billetes de 2 Bs</strong>.<br /><br />

        <strong>Verificación:</strong><br />
        Cantidad: 11 + 14 = 25 ✓.<br />
        Monto: 11×2 + 14×5 = 22 + 70 = 92 Bs ✓.<br /><br />

        <strong>Truco para mezclas de billetes/monedas:</strong> siempre van DOS ecuaciones:
        una de CANTIDAD y otra de VALOR. Reducción es lo más rápido si los coeficientes
        son chicos.
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc08_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Olvidar despejar la otra variable. <br />
        <span style={{ fontSize: 13 }}>
          Encontraste x = 6 pero no volviste a calcular y. La SOLUCIÓN es el PAR (x, y), no solo x.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Mal manejo de signos en reducción. <br />
        <span style={{ fontSize: 13 }}>
          Si querés cancelar +y con −y, sumá. Si las dos son +y, RESTÁ. Cuidado.
        </span>
      </Cuidado>

      <SignosReduccionVisual />
      <Cuidado>
        <strong>Error 3:</strong> No verificar. <br />
        <span style={{ fontSize: 13 }}>
          Sustituí TU SOLUCIÓN en LAS DOS ecuaciones. Si una no se cumple, hubo un error.
        </span>
      </Cuidado>

      <Misconception titulo="Test del 0=0 y 0=5 para detectar casos especiales">
        Si aplicás cualquier método y llegás a:<br />
        • <strong>"0 = 5"</strong> (o cualquier contradicción): el sistema NO TIENE
        SOLUCIÓN. Las rectas son paralelas.<br />
        • <strong>"0 = 0"</strong> (identidad): INFINITAS soluciones. Las rectas son la
        misma.<br />
        • Si despejás x y obtenés un número: <strong>solución única</strong>.<br /><br />
        Mucha gente se asusta y piensa "me equivoqué". No, ese es el resultado.
      </Misconception>

      <Conexion>
        Sistemas lineales conectan con: <strong>Ecuaciones de 1er grado</strong> (cada
        ecuación es de 1er grado), <strong>Funciones lineales</strong> (cada ecuación es
        una recta y = mx + b), y <strong>Programación lineal / problemas de optimización</strong>
        (en carreras de ingeniería y economía).
      </Conexion>
    </EscenaRica>
  );
}

function Esc09_Practica() {
  const ejs = useMemo(() => [
    { p: "Resolvé: x + y = 7 ; x − y = 1", o: ["(4, 3)", "(3, 4)", "(5, 2)", "(7, 0)"], c: 0, ex: "Sumo: 2x = 8 → x = 4. Y = 3. (4,3)." },
    { p: "Resolvé: 2x + y = 11 ; x − y = 1", o: ["(4, 3)", "(3, 5)", "(5, 1)", "(2, 7)"], c: 0, ex: "Sumo: 3x = 12 → x = 4. Y = 3." },
    { p: "Si x + 2y = 9 y x = 3, ¿cuánto vale y?", o: ["3", "6", "1.5", "9"], c: 0, ex: "3 + 2y = 9 → 2y = 6 → y = 3." },
    { p: "Sistema {x − y = 5, 2x − 2y = 9}: ¿qué pasa?", o: ["Tiene sol única", "Sin solución", "Infinitas", "Solo x=5"], c: 1, ex: "La 2ª es la 1ª por 2 daría 10, pero da 9. Contradicción → sin solución." },
    { p: "Dos números suman 14 y difieren en 6. El mayor es:", o: ["10", "8", "12", "4"], c: 0, ex: "x+y=14, x−y=6. Sumo: 2x=20 → x=10." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;
  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios sobre sistemas:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i]; const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c; const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{ padding: "10px 14px", background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)", border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`, borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer", fontFamily: "var(--font-crimson), serif", textAlign: "left" }}>
                    {op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
                  </button>
                );
              })}
            </div>
            {rev && <div style={{ marginTop: 10, padding: "10px 12px", background: sel === e.c ? "#ecfdf5" : "#fef2f2", borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5 }}>
              <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}{e.ex}
            </div>}
          </div>
        );
      })}
      {Object.keys(resp).length === ejs.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 18, background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
          <div style={{ fontSize: 14, color: "#065f46", marginTop: 6 }}>
            {ok === ejs.length && "🎉 Dominás sistemas lineales."}
            {ok >= 3 && ok < ejs.length && "Bien. Reducción es tu amiga en el examen."}
            {ok < 3 && "Repasá los 3 métodos y volvé acá."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
