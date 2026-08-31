"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, Ejes, Hint, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";
import MathText from "../../components/MathText";

// Discriminante visual: alternar entre 3 casos típicos. Cada caso muestra una
// parábola con sus raíces (o sin) y el valor de Δ = b² − 4ac.
function DiscriminanteVisual() {
  const casos = [
    { titulo: "Δ > 0 · 2 raíces reales", a: 1, b: -2, c: -3, color: LIENZO.ok },
    { titulo: "Δ = 0 · 1 raíz doble", a: 1, b: -4, c: 4, color: LIENZO.warn },
    { titulo: "Δ < 0 · sin raíces reales", a: 1, b: 0, c: 2, color: LIENZO.bad },
  ];
  const [i, setI] = useState(0);
  const { a, b, c, color, titulo } = casos[i];
  const D = b * b - 4 * a * c;
  const xMin = -4, xMax = 5, yMin = -4.5, yMax = 5, alto = 260;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const N = 80, pts: string[] = [];
  for (let k = 0; k <= N; k++) {
    const x = xMin + (k / N) * (xMax - xMin);
    const y = a * x * x + b * x + c;
    if (y < yMin - 1 || y > yMax + 1) continue;
    pts.push(`${sx(x)},${sy(y)}`);
  }
  const raices = D > 0
    ? [(-b - Math.sqrt(D)) / (2 * a), (-b + Math.sqrt(D)) / (2 * a)]
    : D === 0 ? [-b / (2 * a)] : [];
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto} onClick={() => setI((v) => (v + 1) % casos.length)}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <motion.polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="3"
            strokeLinejoin="round" initial={false} animate={{ points: pts.join(" ") }} transition={{ duration: 0.3 }} />
          {raices.map((r, k) => (
            <motion.circle key={k} cx={sx(r)} cy={sy(0)} r="6" fill={color}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + k * 0.1, type: "spring" }} />
          ))}
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
        <span style={{ color }}>{titulo}</span>
        <div style={{ fontSize: 15, color: LIENZO.fgDim, marginTop: 4 }}>
          Δ = {b}² − 4·{a}·{c} = <strong style={{ color }}>{D}</strong>
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic" }}>
        Tocá la parábola para alternar entre los 3 casos
      </div>
    </div>
  );
}

// ─── Recta vs parábola: por qué una cuadrática puede tener 0, 1 o 2 soluciones ───
function RectaVsParabola() {
  const xMin = -4, xMax = 4, yMin = -3, yMax = 6, alto = 230;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const puntos = (f: (x: number) => number) => {
    const out: string[] = [];
    for (let k = 0; k <= 80; k++) {
      const x = xMin + (k / 80) * (xMax - xMin);
      const y = f(x);
      if (y < yMin - 1 || y > yMax + 1) continue;
      out.push(`${sx(x)},${sy(y)}`);
    }
    return out.join(" ");
  };
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          {/* recta y = 2x − 1: cruza el eje x una sola vez, siempre */}
          <polyline points={puntos((x) => 2 * x - 1)} fill="none"
            stroke={LIENZO.fgDim} strokeWidth="2.5" strokeDasharray="6 4" />
          <circle cx={sx(0.5)} cy={sy(0)} r="5" fill={LIENZO.fgDim} />
          {/* parábola y = x² − 2: cruza dos veces, en ±√2 */}
          <polyline points={puntos((x) => x * x - 2)} fill="none"
            stroke={LIENZO.accent} strokeWidth="3" strokeLinejoin="round" />
          <circle cx={sx(-Math.SQRT2)} cy={sy(0)} r="5.5" fill={LIENZO.accent} />
          <circle cx={sx(Math.SQRT2)} cy={sy(0)} r="5.5" fill={LIENZO.accent} />
          <text x={sx(-3.7)} y={sy(2.6)} fontSize="13" fill={LIENZO.accent} fontWeight="700">x² − 2</text>
          <text x={sx(1.3)} y={sy(4.8)} fontSize="13" fill={LIENZO.fgDim} fontWeight="700">2x − 1</text>
        </Ejes>
      </Pizarra>
      <Hint>La recta corta el eje una vez. La parábola se curva: puede cortarlo dos veces, una o ninguna</Hint>
    </div>
  );
}

// ─── a, b, c: de dónde sale cada coeficiente, con su signo ───
function CoeficientesVisual() {
  const [i, setI] = useState(0);
  const casos = [
    { ec: "3x² − 7x + 2 = 0", a: "3", b: "−7", c: "2", nota: "tal cual viene" },
    { ec: "x² − 4x + 5 = 0", a: "1", b: "−4", c: "5", nota: "de x² + 5 = 4x, pasando todo a un lado" },
    { ec: "2x² + 7x − 4 = 0", a: "2", b: "7", c: "−4", nota: "el signo va pegado al número" },
  ];
  const { ec, a, b, c, nota } = casos[i];
  const chips = [
    { label: "a", valor: a, color: LIENZO.accent },
    { label: "b", valor: b, color: LIENZO.warn },
    { label: "c", valor: c, color: LIENZO.ok },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 12 }}>
      <div onClick={() => setI((v) => (v + 1) % casos.length)}
        role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setI((v) => (v + 1) % casos.length); } }}
        style={{
          cursor: "pointer", textAlign: "center", fontFamily: "var(--font-crimson), serif",
          fontSize: 30, fontWeight: 600, color: LIENZO.fg, padding: "6px 0",
        }}>
        {ec}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
        {chips.map((ch) => (
          <motion.div key={ch.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              minWidth: 92, padding: "10px 16px", borderRadius: 12,
              border: `2px solid ${ch.color}`, textAlign: "center",
              fontFamily: "var(--font-crimson), serif",
            }}>
            <div style={{ fontSize: 12, color: ch.color, fontWeight: 800, letterSpacing: 1 }}>{ch.label}</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: LIENZO.fg }}>{ch.valor}</div>
          </motion.div>
        ))}
      </div>
      <Hint>{nota} · tocá la ecuación para ver otro caso</Hint>
    </div>
  );
}

// ─── Factor cero: cada factor apaga la parábola en su propia raíz ───
function FactorizacionVisual() {
  const xMin = -1, xMax = 5, yMin = -1.6, yMax = 3, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const pts: string[] = [];
  for (let k = 0; k <= 90; k++) {
    const x = xMin + (k / 90) * (xMax - xMin);
    const y = x * x - 5 * x + 6;
    if (y < yMin - 1 || y > yMax + 1) continue;
    pts.push(`${sx(x)},${sy(y)}`);
  }
  const raices = [
    { r: 2, factor: "x − 2 = 0", color: LIENZO.ok },
    { r: 3, factor: "x − 3 = 0", color: LIENZO.accent },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <polyline points={pts.join(" ")} fill="none" stroke={LIENZO.fg} strokeWidth="3" strokeLinejoin="round" />
          {raices.map((r) => (
            <g key={r.r}>
              <line x1={sx(r.r)} y1={sy(0)} x2={sx(r.r)} y2={sy(yMin + 0.35)}
                stroke={r.color} strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx={sx(r.r)} cy={sy(0)} r="6" fill={r.color} />
              <text x={sx(r.r)} y={sy(yMin + 0.1)} textAnchor="middle" fontSize="13"
                fontWeight="700" fill={r.color}>{r.factor}</text>
            </g>
          ))}
        </Ejes>
      </Pizarra>
      <div style={{ textAlign: "center" }}>
        <MathText>{"$(x-2)(x-3)=0 \\;\\Rightarrow\\; x=2 \\;\\text{ó}\\; x=3$"}</MathText>
      </div>
      <Hint>Un producto da cero solo si alguno de los factores es cero: ahí corta la parábola</Hint>
    </div>
  );
}

// ─── Anatomía de la fórmula: −b/2a es el eje, √Δ/2a es cuánto te alejás ───
function AnatomiaFormula() {
  const a = 2, b = -7, c = 3;
  const D = b * b - 4 * a * c;
  const eje = -b / (2 * a);
  const salto = Math.sqrt(D) / (2 * a);
  const xMin = -0.5, xMax = 4, yMin = -2.5, yMax = 4, alto = 250;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const pts: string[] = [];
  for (let k = 0; k <= 90; k++) {
    const x = xMin + (k / 90) * (xMax - xMin);
    const y = a * x * x + b * x + c;
    if (y < yMin - 1 || y > yMax + 1) continue;
    pts.push(`${sx(x)},${sy(y)}`);
  }
  const yVertice = a * eje * eje + b * eje + c;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <polyline points={pts.join(" ")} fill="none" stroke={LIENZO.fg} strokeWidth="3" strokeLinejoin="round" />
          {/* eje de simetría: x = −b/2a */}
          <line x1={sx(eje)} y1={sy(yMax - 0.3)} x2={sx(eje)} y2={sy(yVertice)}
            stroke={LIENZO.accent} strokeWidth="2" strokeDasharray="5 4" />
          <text x={sx(eje)} y={sy(yMax - 0.05)} textAnchor="middle" fontSize="13"
            fontWeight="700" fill={LIENZO.accent}>−b/2a = {eje}</text>
          {/* el ± como salto simétrico a cada lado del eje */}
          {[-1, 1].map((s) => (
            <g key={s}>
              <line x1={sx(eje)} y1={sy(0)} x2={sx(eje + s * salto)} y2={sy(0)}
                stroke={LIENZO.warn} strokeWidth="2.5" />
              <circle cx={sx(eje + s * salto)} cy={sy(0)} r="6" fill={LIENZO.ok} />
              <text x={sx(eje + s * salto)} y={sy(0) + 24} textAnchor="middle" fontSize="14"
                fontWeight="700" fill={LIENZO.ok}>{eje + s * salto}</text>
            </g>
          ))}
          <text x={sx(eje)} y={sy(0) - 22} textAnchor="middle" fontSize="12"
            fontWeight="700" fill={LIENZO.warn}>±√Δ/2a = ±{salto}</text>
        </Ejes>
      </Pizarra>
      <div style={{ textAlign: "center" }}>
        <MathText>{"$x = \\dfrac{-b}{2a} \\pm \\dfrac{\\sqrt{\\Delta}}{2a}$"}</MathText>
      </div>
      <Hint>
        La fórmula es eso: parate en el eje de simetría y saltá lo mismo para los dos lados
      </Hint>
    </div>
  );
}

// ─── Casos especiales: falta b (simétrica) o falta c (pasa por el origen) ───
function CasosEspecialesVisual() {
  const casos = [
    {
      titulo: "Sin b · x² − 16 = 0", a: 1, b: 0, c: -16,
      raices: [-4, 4], nota: "Simétrica respecto al eje y",
      color: LIENZO.accent,
    },
    {
      titulo: "Sin c · x² − 4x = 0", a: 1, b: -4, c: 0,
      raices: [0, 4], nota: "Siempre pasa por el origen",
      color: LIENZO.ok,
    },
  ];
  const xMin = -6, xMax = 6, yMin = -20, yMax = 12, alto = 200;
  return (
    <div style={{
      width: "100%", maxWidth: 620, display: "flex", gap: 14,
      justifyContent: "center", flexWrap: "wrap",
    }}>
      {casos.map((cs) => {
        const sx = scalerX(xMin, xMax, 240, 20, 12);
        const sy = scalerY(yMin, yMax, alto);
        const pts: string[] = [];
        for (let k = 0; k <= 90; k++) {
          const x = xMin + (k / 90) * (xMax - xMin);
          const y = cs.a * x * x + cs.b * x + cs.c;
          if (y < yMin - 2 || y > yMax + 2) continue;
          pts.push(`${sx(x)},${sy(y)}`);
        }
        return (
          <div key={cs.titulo} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              fontFamily: "var(--font-crimson), serif", fontSize: 16,
              fontWeight: 700, color: cs.color,
            }}>{cs.titulo}</div>
            <svg width={240} height={alto} viewBox={`0 0 240 ${alto}`}>
              <line x1={sx(xMin)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={LIENZO.fgFaint} strokeWidth="1" />
              <line x1={sx(0)} y1={sy(yMin)} x2={sx(0)} y2={sy(yMax)} stroke={LIENZO.fgFaint} strokeWidth="1" />
              <polyline points={pts.join(" ")} fill="none" stroke={cs.color} strokeWidth="2.5" strokeLinejoin="round" />
              {cs.raices.map((r) => (
                <g key={r}>
                  <circle cx={sx(r)} cy={sy(0)} r="5" fill={cs.color} />
                  <text x={sx(r)} y={sy(0) + 20} textAnchor="middle" fontSize="12"
                    fontWeight="700" fill={LIENZO.fgDim}>{r}</text>
                </g>
              ))}
            </svg>
            <div style={{ fontSize: 12, color: LIENZO.fgDim }}>{cs.nota}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Vieta: la suma es el doble del eje, el producto sale del corte en y ───
function VietaVisual() {
  const a = 1, b = -5, c = 6;
  const r1 = 2, r2 = 3;
  const eje = -b / (2 * a);
  const xMin = -0.6, xMax = 4.4, yMin = -1.2, yMax = 8, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const pts: string[] = [];
  for (let k = 0; k <= 90; k++) {
    const x = xMin + (k / 90) * (xMax - xMin);
    const y = a * x * x + b * x + c;
    if (y < yMin - 1 || y > yMax + 1) continue;
    pts.push(`${sx(x)},${sy(y)}`);
  }
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <polyline points={pts.join(" ")} fill="none" stroke={LIENZO.fg} strokeWidth="3" strokeLinejoin="round" />
          {/* corte en y: vale c, que es el producto de las raíces cuando a = 1 */}
          <circle cx={sx(0)} cy={sy(c)} r="6" fill={LIENZO.warn} />
          <text x={sx(0) + 10} y={sy(c) + 5} fontSize="13" fontWeight="700" fill={LIENZO.warn}>
            c = 6 = 2 · 3
          </text>
          {[r1, r2].map((r) => (
            <g key={r}>
              <circle cx={sx(r)} cy={sy(0)} r="6" fill={LIENZO.ok} />
              <text x={sx(r)} y={sy(0) + 22} textAnchor="middle" fontSize="14"
                fontWeight="700" fill={LIENZO.ok}>{r}</text>
            </g>
          ))}
          {/* el eje de simetría cae justo en el medio de las dos raíces */}
          <line x1={sx(eje)} y1={sy(0)} x2={sx(eje)} y2={sy(yMax - 0.6)}
            stroke={LIENZO.accent} strokeWidth="2" strokeDasharray="5 4" />
          <text x={sx(eje)} y={sy(yMax - 0.3)} textAnchor="middle" fontSize="13"
            fontWeight="700" fill={LIENZO.accent}>punto medio = {eje}</text>
        </Ejes>
      </Pizarra>
      <div style={{ textAlign: "center" }}>
        <MathText>{"$x_1 + x_2 = 5 = -\\dfrac{b}{a} \\qquad x_1 \\cdot x_2 = 6 = \\dfrac{c}{a}$"}</MathText>
      </div>
      <Hint>Las dos raíces caen simétricas alrededor del eje: por eso su suma es −b/a</Hint>
    </div>
  );
}

// ─── La trampa del −b cuando b ya es negativo ───
function SignoBVisual() {
  const alto = 190;
  const filas = [
    { etiqueta: "MAL", expr: "x = (−4 ± √…) / 2", detalle: "arrastró el signo de b", color: LIENZO.bad },
    { etiqueta: "BIEN", expr: "x = (+4 ± √…) / 2", detalle: "−b = −(−4) = +4", color: LIENZO.ok },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x="240" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill={LIENZO.fg}>
            x² − 4x + 3 = 0 → b = −4
          </text>
          {filas.map((f, i) => {
            const y = 74 + i * 62;
            return (
              <g key={f.etiqueta}>
                <rect x="52" y={y - 32} width="376" height="54" rx="10"
                  fill={f.color} fillOpacity="0.08" stroke={f.color} strokeWidth="1.5" />
                <text x="76" y={y - 2} fontSize="12" fontWeight="800" fill={f.color} letterSpacing="0.8">{f.etiqueta}</text>
                <text x="140" y={y - 4} fontSize="20" fontWeight="600" fill={LIENZO.fg}>{f.expr}</text>
                <text x="140" y={y + 15} fontSize="11" fill={LIENZO.fgDim}>{f.detalle}</text>
              </g>
            );
          })}
        </svg>
      </Pizarra>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="08"
      tituloUnidad="Ecuaciones de segundo grado"
      escenas={[
        { titulo: "¿Qué es de 2do grado?", componente: Esc01_Intro },
        { titulo: "Forma estándar", componente: Esc02_Forma },
        { titulo: "Método 1: Factorización", componente: Esc03_Fact },
        { titulo: "Método 2: Fórmula cuadrática", componente: Esc04_Formula },
        { titulo: "El discriminante", componente: Esc05_Discrim },
        { titulo: "Casos especiales", componente: Esc06_Casos },
        { titulo: "Suma y producto de raíces (Vieta)", componente: Esc07_Vieta },
        { titulo: "Errores comunes", componente: Esc08_Errores },
        { titulo: "Práctica final", componente: Esc09_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Ecuaciones de segundo grado</Titulo>
      <Definicion termino="ecuación cuadrática">
        Una ecuación es de <strong>segundo grado</strong> si la incógnita aparece elevada
        al cuadrado (y a lo sumo) como mayor potencia. Forma general: <strong>ax² + bx + c = 0</strong>, con a ≠ 0.
      </Definicion>
      <Ejemplo>
        x² − 5x + 6 = 0 &nbsp;·&nbsp; 2x² + 7x − 4 = 0 &nbsp;·&nbsp; x² − 9 = 0.
      </Ejemplo>
      <Resumen>
        🎯 Aparece en: trayectorias parabólicas (física), maximizar ganancias (economía),
        cálculo de áreas, raíces de funciones, problemas geométricos. Una de las
        ecuaciones más comunes.
      </Resumen>
      <PorQue>
        A diferencia de las de 1er grado (1 solución única), las cuadráticas pueden tener
        <strong> 0, 1 o 2 soluciones</strong>. Ya vamos a ver por qué.
      </PorQue>

      <RectaVsParabola />

      <Hook>
        Las cuadráticas aparecen en <strong>3-5 preguntas del examen UMSS</strong> (resolver,
        identificar Δ, problemas geométricos). La fórmula <em>x = (−b ± √(b²−4ac))/2a</em> es
        OBLIGATORIO memorizarla. Y conocer Vieta te ahorra ejercicios completos.
      </Hook>

      <Mnemotecnia>
        <strong>Decisión 2x2 · ¿qué método uso?</strong><br />
        • ¿Falta b (sin término lineal)? → <strong>despeje directo</strong>: x = ±√(−c/a).<br />
        • ¿Falta c (sin independiente)? → <strong>factor común x</strong>: x(ax+b)=0.<br />
        • ¿Coeficientes pequeños y enteros? → <strong>factorización mental</strong> (probá pares
        cuyo producto sea c/a y suma sea −b/a).<br />
        • Si nada anterior funciona → <strong>fórmula cuadrática</strong>.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_Forma() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">La forma estándar: ax² + bx + c = 0</Titulo>
      <Parrafo>
        Antes de aplicar cualquier método, conviene <strong>llevar la ecuación a la
        forma estándar</strong>: todo igualado a 0, con los términos en orden de potencia.
      </Parrafo>

      <CoeficientesVisual />

      <Ejemplo titulo="Identificar a, b, c">
        En <strong>3x² − 7x + 2 = 0</strong>: a = 3, b = −7, c = 2.<br />
        En <strong>x² + 5 = 4x</strong>: pasamos: x² − 4x + 5 = 0. a = 1, b = −4, c = 5.
      </Ejemplo>

      <Cuidado>
        Atención al signo de b. Si en el enunciado aparece "− 4x", entonces b = −4 (NO 4).
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_Fact() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Método 1: Factorización</Titulo>
      <Parrafo>
        Si podés <strong>factorizar</strong> el polinomio, cada factor igualado a 0 te da
        una solución. Es el método más rápido cuando se puede.
      </Parrafo>

      <Resumen>
        Si a·b = 0, entonces <strong>a = 0 ó b = 0</strong>. (Propiedad clave de los reales.)
      </Resumen>

      <FactorizacionVisual />

      <Ejemplo titulo="x² − 5x + 6 = 0">
        <Paso n={1}>Factorizo: (x − 2)(x − 3) = 0.</Paso>
        <Paso n={2}>Por la propiedad: x − 2 = 0 ó x − 3 = 0.</Paso>
        <Paso n={3}>Soluciones: <strong style={{ color: COLOR_OK }}>x = 2 ó x = 3</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="x² − 9 = 0">
        <Paso n={1}>Diferencia de cuadrados: (x + 3)(x − 3) = 0.</Paso>
        <Paso n={2}>x = −3 ó x = 3.</Paso>
      </Ejemplo>

      <Ejemplo titulo="x² − 6x = 0 (sin término independiente)">
        <Paso n={1}>Factor común x: x(x − 6) = 0.</Paso>
        <Paso n={2}>x = 0 ó x = 6.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_Formula() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Método 2: Fórmula cuadrática (resuelve TODAS)</Titulo>
      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          x = (−b ± √(b² − 4ac)) / 2a
        </span>
      </Resumen>
      <Parrafo>
        Funciona <strong>siempre</strong>, factorice o no. Memorizala: la vas a usar muchísimo.
      </Parrafo>

      <AnatomiaFormula />

      <Ejemplo titulo="Aplicarla a 2x² − 7x + 3 = 0">
        <Paso n={1}>a = 2, b = −7, c = 3.</Paso>
        <Paso n={2}>Discriminante b²−4ac = 49 − 24 = 25.</Paso>
        <Paso n={3}>x = (7 ± √25) / 4 = (7 ± 5) / 4.</Paso>
        <Paso n={4}>x₁ = 12/4 = 3, x₂ = 2/4 = 1/2.</Paso>
        <Paso n={5}>Soluciones: <strong style={{ color: COLOR_OK }}>x = 3 ó x = 1/2</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Ojo a los signos: <strong>−b</strong>. Si b ya es negativo, −b queda positivo.
        Ej: si b = −7, entonces −b = +7.
      </Cuidado>

      <WorkedExample titulo="Problema geométrico · jardín rectangular en Cochabamba">
        Don Juan quiere cercar un jardín rectangular de <strong>60 m² de área</strong>.
        El largo debe ser <strong>4 m más que el ancho</strong>. ¿Cuáles son las dimensiones?<br /><br />

        <strong>Paso 1 · Definir incógnita:</strong> sea x = ancho. Entonces largo = x + 4.<br /><br />

        <strong>Paso 2 · Plantear ecuación:</strong> área = ancho × largo:<br />
        x · (x + 4) = 60.<br />
        x² + 4x = 60.<br />
        x² + 4x − 60 = 0. (forma estándar)<br /><br />

        <strong>Paso 3 · Identificar coeficientes:</strong> a = 1, b = 4, c = −60.<br /><br />

        <strong>Paso 4 · Discriminante:</strong> Δ = 4² − 4(1)(−60) = 16 + 240 = 256.<br />
        √256 = 16. ¡Δ &gt; 0! → 2 soluciones reales.<br /><br />

        <strong>Paso 5 · Aplicar fórmula:</strong><br />
        x = (−4 ± 16) / 2.<br />
        x₁ = 12/2 = 6 · x₂ = −20/2 = −10.<br /><br />

        <strong>Paso 6 · Sentido físico:</strong> el ancho no puede ser negativo →
        descartamos x = −10. Respuesta: <strong>ancho = 6 m, largo = 10 m</strong>.<br /><br />

        <strong>Verificación:</strong> 6 × 10 = 60 m² ✓.<br /><br />

        <strong>Truco clave:</strong> en problemas geométricos las cuadráticas dan a menudo
        DOS soluciones, pero solo una tiene sentido físico (longitudes &gt; 0). Siempre
        verificá el contexto.
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc05_Discrim() {
  return (
    <EscenaRica>
      <Titulo>El discriminante Δ = b² − 4ac</Titulo>
      <Parrafo>
        El número adentro de la raíz se llama <strong>discriminante</strong>. Su signo
        te dice cuántas soluciones hay <em>antes</em> de calcular.
      </Parrafo>

      <Resumen>
        <strong>Δ &gt; 0</strong>: <strong>2 soluciones reales</strong> distintas.<br />
        <strong>Δ = 0</strong>: <strong>1 solución</strong> (raíz doble).<br />
        <strong>Δ &lt; 0</strong>: <strong>NO hay soluciones reales</strong>.
      </Resumen>

      <DiscriminanteVisual />

      <Ejemplo>
        x² − 5x + 6 = 0 → Δ = 25 − 24 = 1 &gt; 0 → 2 soluciones.<br />
        x² − 4x + 4 = 0 → Δ = 16 − 16 = 0 → 1 solución (doble).<br />
        x² + x + 1 = 0 → Δ = 1 − 4 = −3 &lt; 0 → NO tiene soluciones reales.
      </Ejemplo>

      <PorQue>
        Geométricamente: <strong>Δ &gt; 0</strong> la parábola cruza al eje x en 2 puntos;
        <strong> Δ = 0</strong> apenas lo toca en uno; <strong>Δ &lt; 0</strong> no lo toca.
      </PorQue>
    </EscenaRica>
  );
}

function Esc06_Casos() {
  return (
    <EscenaRica>
      <Titulo>Casos especiales: cuadráticas sin b o sin c</Titulo>

      <CasosEspecialesVisual />

      <Ejemplo titulo="Sin b (de la forma ax² + c = 0)">
        Despejá directamente: x² = −c/a, después raíz.<br />
        Ej: x² − 16 = 0 → x² = 16 → x = ±4.
      </Ejemplo>

      <Ejemplo titulo="Sin c (de la forma ax² + bx = 0)">
        Factor común x: x(ax + b) = 0 → x = 0 ó x = −b/a.<br />
        Ej: 3x² − 12x = 0 → 3x(x − 4) = 0 → x = 0 ó x = 4.
      </Ejemplo>

      <Resumen>
        Estos casos NO requieren fórmula cuadrática: son más rápidos por factorización o despeje directo.
      </Resumen>
    </EscenaRica>
  );
}

function Esc07_Vieta() {
  return (
    <EscenaRica>
      <Titulo>Suma y producto de raíces (Vieta)</Titulo>
      <Parrafo>
        Si x₁ y x₂ son las dos soluciones de <strong>ax² + bx + c = 0</strong>:
      </Parrafo>
      <Resumen>
        <strong>Suma</strong>: x₁ + x₂ = <strong>−b/a</strong><br />
        <strong>Producto</strong>: x₁ · x₂ = <strong>c/a</strong>
      </Resumen>
      <VietaVisual />

      <Ejemplo titulo="x² − 5x + 6 = 0">
        Suma: −(−5)/1 = 5 ✓ (2 + 3 = 5). Producto: 6/1 = 6 ✓ (2 · 3 = 6).
      </Ejemplo>
      <PorQue>
        Es útil para <strong>verificar</strong> tus soluciones rápido. Si encontraste x = 2 y
        x = 3, sumá y multiplicá − deben dar −b/a y c/a.
      </PorQue>

      <Mnemotecnia>
        <strong>Vieta · "S = −b/a, P = c/a"</strong><br />
        Truco: en <em>x² + Bx + C = 0</em> (con a = 1), buscás dos números cuya:<br />
        • <strong>Suma = −B</strong> (opuesto del coeficiente lineal).<br />
        • <strong>Producto = C</strong> (término independiente).<br /><br />
        Ej: x² − 7x + 12 = 0 → buscar 2 nº que sumen 7 y multipliquen 12 → 3 y 4. Soluciones
        directas sin fórmula.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc08_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Olvidar la solución negativa. <br />
        <span style={{ fontSize: 13 }}>
          x² = 4 NO da solo x = 2. También x = −2. Siempre ±√.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Mal manejo de signos en la fórmula. <br />
        <span style={{ fontSize: 13 }}>
          Si b = −5, entonces −b = +5 (no −5). Cuidado.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> Saltar al uso de la fórmula sin intentar factorizar. <br />
        <span style={{ fontSize: 13 }}>
          Factorización es más rápida cuando se puede. Probala primero.
        </span>
      </Cuidado>

      <SignoBVisual />

      <Misconception titulo="Trampa · '−b' cuando b es negativo">
        Ecuación: x² − 4x + 3 = 0. Aquí b = −4.<br />
        Al aplicar la fórmula: −b = −(−4) = <strong>+4</strong>, no −4.<br />
        Mucha gente escribe x = (−4 ± √...) / 2: y arrastra el signo. La fórmula da
        <em> (+4 ± √...) / 2</em>, que da las soluciones x = 1 y x = 3 (verificable). El
        signo de −b es el OPUESTO del signo de b.
      </Misconception>

      <Conexion>
        Las cuadráticas conectan con: <strong>Funciones cuadráticas</strong> (y = ax²+bx+c
        es una parábola cuyas raíces son las soluciones), <strong>Factorización</strong>
        (factor común, diferencia de cuadrados, trinomios) y <strong>Desigualdades
        cuadráticas</strong> (resolver x² − 5x + 6 ≥ 0 usa las mismas raíces).
      </Conexion>
    </EscenaRica>
  );
}

function Esc09_Practica() {
  const ejs = useMemo(() => [
    { p: "Resolvé: x² − 7x + 12 = 0", o: ["3 y 4", "2 y 6", "5 y 7", "1 y 12"], c: 0, ex: "Factorización: (x−3)(x−4)=0 → x = 3 ó x = 4." },
    { p: "Resolvé: x² − 16 = 0", o: ["±4", "4", "±16", "8"], c: 0, ex: "x² = 16 → x = ±4." },
    { p: "Discriminante de x² + 3x − 10 = 0:", o: ["49", "−40", "−31", "9"], c: 0, ex: "b²−4ac = 9 + 40 = 49." },
    { p: "x² + x + 1 = 0 tiene:", o: ["2 soluciones reales", "1 sol real", "Sin sol reales", "Infinitas"], c: 2, ex: "Δ = 1 − 4 = −3 < 0 → sin soluciones reales." },
    { p: "Si x₁ y x₂ son raíces de x² − 6x + 5 = 0, ¿cuánto suman?", o: ["5", "6", "−6", "11"], c: 1, ex: "Por Vieta: suma = −b/a = 6." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;
  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios:</Parrafo>
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
            {ok === ejs.length && "🎉 Dominás cuadráticas."}
            {ok < ejs.length && "Memorizá la fórmula y el discriminante."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
