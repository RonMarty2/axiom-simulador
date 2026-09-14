"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";
import { Pizarra, Ejes, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import MathText from "../../components/MathText";

export default function Page() {
  return (
    <LeccionShell
      unidad="FIS-06"
      tituloUnidad="Electrostática"
      escenas={[
        { titulo: "Carga eléctrica · conceptos básicos", componente: EscCarga },
        { titulo: "Ley de Coulomb", componente: EscCoulomb },
        { titulo: "Campo eléctrico", componente: EscCampo },
        { titulo: "Potencial eléctrico", componente: EscPotencial },
        { titulo: "Capacitores", componente: EscCapacitores },
        { titulo: "Combinación de capacitores", componente: EscCombCap },
        { titulo: "Problemas tipo examen", componente: EscProblemas },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function Flecha({ x1, y1, x2, y2, color, id }: { x1: number; y1: number; x2: number; y2: number; color: string; id: string }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" markerEnd={`url(#${id})`} />
      <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={color} /></marker>
    </>
  );
}

// ─── Cargas iguales se repelen, opuestas se atraen ───
function DiagramaCargas() {
  return (
    <Pizarra alto={180}>
      <svg width="100%" height="100%" viewBox="0 0 480 180" preserveAspectRatio="xMidYMid meet">
        <circle cx="90" cy="90" r="20" fill={LIENZO.bad} />
        <text x="90" y="97" textAnchor="middle" fontSize="18" fontWeight="800" fill="white">+</text>
        <circle cx="180" cy="90" r="20" fill={LIENZO.bad} />
        <text x="180" y="97" textAnchor="middle" fontSize="18" fontWeight="800" fill="white">+</text>
        <Flecha x1={112} y1={90} x2={95} y2={90} color={LIENZO.bad} id="rep1" />
        <Flecha x1={158} y1={90} x2={175} y2={90} color={LIENZO.bad} id="rep2" />
        <text x="135" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.bad}>se REPELEN</text>

        <circle cx="330" cy="90" r="20" fill={LIENZO.bad} />
        <text x="330" y="97" textAnchor="middle" fontSize="18" fontWeight="800" fill="white">+</text>
        <circle cx="420" cy="90" r="20" fill={LIENZO.accent} />
        <text x="420" y="97" textAnchor="middle" fontSize="18" fontWeight="800" fill="white">−</text>
        <Flecha x1={358} y1={90} x2={373} y2={90} color={LIENZO.ok} id="atr1" />
        <Flecha x1={392} y1={90} x2={377} y2={90} color={LIENZO.ok} id="atr2" />
        <text x="375" y="130" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.ok}>se ATRAEN</text>
      </svg>
    </Pizarra>
  );
}

function EscCarga() {
  return (
    <EscenaRica>
      <Titulo>Carga eléctrica</Titulo>

      <Hook>
        Electrostática aparece en preguntas sobre fuerzas entre cargas y
        capacitores en serie/paralelo en el examen FCyT. Las ecuaciones son
        análogas a las gravitatorias pero con signos.
      </Hook>

      <Definicion termino="Carga eléctrica (q)">
        Propiedad fundamental de algunas partículas que produce fuerzas
        eléctricas. Hay dos tipos: positiva (+) y negativa (−).<br /><br />
        Unidad SI: coulomb (C). La carga del electrón: e = 1.6 × 10⁻¹⁹ C.
      </Definicion>

      <DiagramaCargas />

      <Resumen>
        <strong>Principios básicos</strong>:<br />
        1. <strong>Conservación de la carga</strong>: la carga total no se
        crea ni se destruye, solo se transfiere.<br />
        2. <strong>Cuantización</strong>: toda carga es múltiplo de e.<br />
        3. <strong>Cargas iguales se REPELEN</strong>; cargas opuestas se ATRAEN.
      </Resumen>

      <Definicion termino="Conductores vs aislantes">
        • <strong>Conductores</strong>: los electrones se mueven libremente (metales).<br />
        • <strong>Aislantes</strong>: los electrones están fijos (plástico, vidrio).
      </Definicion>
    </EscenaRica>
  );
}

// ─── Geometría real del problema F19: q1(0,2), q2(0,-2), q(1,0) ───
function TrianguloCoulomb() {
  const xMin = -1.5, xMax = 2.5, yMin = -3, yMax = 3, alto = 260;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const q1 = { x: 0, y: 2 }, q2 = { x: 0, y: -2 }, q = { x: 1, y: 0 };
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto} labels={false} rejilla={false}>
        <line x1={sx(q1.x)} y1={sy(q1.y)} x2={sx(q.x)} y2={sy(q.y)} stroke={LIENZO.fgDim} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1={sx(q2.x)} y1={sy(q2.y)} x2={sx(q.x)} y2={sy(q.y)} stroke={LIENZO.fgDim} strokeWidth="1.5" strokeDasharray="3 3" />
        <text x={(sx(q1.x) + sx(q.x)) / 2 - 14} y={(sy(q1.y) + sy(q.y)) / 2} fontSize="11" fill={LIENZO.fgDim}>√5 m</text>
        <text x={(sx(q2.x) + sx(q.x)) / 2 - 14} y={(sy(q2.y) + sy(q.y)) / 2} fontSize="11" fill={LIENZO.fgDim}>√5 m</text>

        <circle cx={sx(q1.x)} cy={sy(q1.y)} r="10" fill={LIENZO.bad} />
        <text x={sx(q1.x)} y={sy(q1.y) + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="white">+</text>
        <text x={sx(q1.x) - 14} y={sy(q1.y) - 12} fontSize="11" fontWeight="700" fill={LIENZO.bad} textAnchor="end">q₁=8μC</text>

        <circle cx={sx(q2.x)} cy={sy(q2.y)} r="10" fill={LIENZO.bad} />
        <text x={sx(q2.x)} y={sy(q2.y) + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="white">+</text>
        <text x={sx(q2.x) - 14} y={sy(q2.y) + 20} fontSize="11" fontWeight="700" fill={LIENZO.bad} textAnchor="end">q₂=8μC</text>

        <circle cx={sx(q.x)} cy={sy(q.y)} r="9" fill={LIENZO.accent} />
        <text x={sx(q.x)} y={sy(q.y) + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill="white">+</text>
        <text x={sx(q.x) + 14} y={sy(q.y) + 4} fontSize="11" fontWeight="700" fill={LIENZO.accent}>q=2μC</text>

        {/* Fuerzas repulsivas sobre q, alejándose de q1 y q2 */}
        <Flecha x1={sx(q.x)} y1={sy(q.y)} x2={sx(q.x) + 45} y2={sy(q.y) - 25} color={LIENZO.warn} id="F1c" />
        <Flecha x1={sx(q.x)} y1={sy(q.y)} x2={sx(q.x) + 45} y2={sy(q.y) + 25} color={LIENZO.warn} id="F2c" />
      </Ejes>
    </Pizarra>
  );
}

function EscCoulomb() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Ley de Coulomb</Titulo>

      <Resumen>
        Fuerza entre dos cargas puntuales q₁ y q₂ separadas una distancia r:
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$F = \\dfrac{k|q_1 q_2|}{r^2}$"}</MathText>
        </div>
        donde k = 9 × 10⁹ N·m²/C² (constante de Coulomb).
      </Resumen>

      <Resumen>
        <strong>Dirección</strong>: a lo largo de la línea que une las cargas.<br />
        <strong>Sentido</strong>: repulsiva si las cargas son del mismo signo,
        atractiva si son opuestas.
      </Resumen>

      <PorQue>
        Comparación con gravitación: ambas son leyes de fuerza con 1/r²
        (cuadrado inverso). Diferencias clave:<br />
        • Coulomb depende del signo de q (atractiva o repulsiva).<br />
        • Gravitación SIEMPRE es atractiva.<br />
        • k es enormemente mayor que G, por eso las fuerzas eléctricas dominan
        en escala atómica.
      </PorQue>

      <WorkedExample titulo="Fuerza entre cargas · F19 1op 2005">
        Tres cargas: q₁ = 8 μC, q₂ = 8 μC ubicadas en (0,2) y (0,−2), y
        q = 2 μC en (1,0). (k = 9 × 10⁹)
      </WorkedExample>
      <TrianguloCoulomb />
      <WorkedExample titulo="">
        Distancia de q a q₁ (y a q₂): <MathText>{"$\\sqrt{1+4} = \\sqrt5$"}</MathText> m.<br />
        F desde q₁:
        <div style={{ textAlign: "center", padding: "6px 0", overflowX: "auto" }}>
          <MathText>{"$\\dfrac{9\\cdot10^9 \\cdot 8\\cdot10^{-6} \\cdot 2\\cdot10^{-6}}{5} = 28.8\\cdot10^{-3}\\text{ N}$"}</MathText>
        </div>
        Por simetría, las componentes verticales se cancelan; quedan las
        horizontales que se suman.<br /><br />

        Componente horizontal cada una: <MathText>{"$F\\cdot\\dfrac1{\\sqrt5}$"}</MathText><br />
        Total: <MathText>{"$2\\cdot\\dfrac{28.8\\cdot10^{-3}}{\\sqrt5} \\approx 25.7\\cdot10^{-3}$"}</MathText> N
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Líneas de campo radiando desde una carga positiva ───
function LineasDeCampo() {
  const cx = 150, cy = 110, n = 8, len = 75;
  return (
    <Pizarra alto={220}>
      <svg width="100%" height="100%" viewBox="0 0 480 220" preserveAspectRatio="xMidYMid meet">
        {Array.from({ length: n }, (_, i) => {
          const ang = (i * 2 * Math.PI) / n;
          const x2 = cx + len * Math.cos(ang), y2 = cy + len * Math.sin(ang);
          return <Flecha key={i} x1={cx} y1={cy} x2={x2} y2={y2} color={LIENZO.accent} id={`campo${i}`} />;
        })}
        <circle cx={cx} cy={cy} r="16" fill={LIENZO.bad} />
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="white">+</text>
        <text x={cx} y={30} fontSize="12" fill={LIENZO.fgDim} textAnchor="middle">las líneas SALEN de +Q</text>

        <circle cx={370} cy={cy} r="16" fill={LIENZO.accent} />
        <text x={370} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="white">−</text>
        {Array.from({ length: n }, (_, i) => {
          const ang = (i * 2 * Math.PI) / n;
          const x1 = 370 + len * Math.cos(ang), y1 = cy + len * Math.sin(ang);
          const x2 = 370 + 20 * Math.cos(ang), y2 = cy + 20 * Math.sin(ang);
          return <Flecha key={i} x1={x1} y1={y1} x2={x2} y2={y2} color={LIENZO.ok} id={`campoIn${i}`} />;
        })}
        <text x={370} y={30} fontSize="12" fill={LIENZO.fgDim} textAnchor="middle">las líneas ENTRAN a −Q</text>
      </svg>
    </Pizarra>
  );
}

function EscCampo() {
  return (
    <EscenaRica>
      <Titulo>Campo eléctrico (E)</Titulo>

      <Definicion termino="Campo eléctrico">
        Región del espacio donde una carga experimenta una fuerza. Se define
        como la fuerza por unidad de carga de prueba:
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$\\vec{E} = \\dfrac{\\vec{F}}{q}$"}</MathText>
        </div>
        Unidad: N/C (o V/m).
      </Definicion>

      <LineasDeCampo />

      <Resumen>
        <strong>Campo de una carga puntual</strong>: <MathText>{"$E = \\dfrac{k|Q|}{r^2}$"}</MathText> (apunta alejándose de Q si es positiva, acercándose si es negativa).
      </Resumen>

      <Resumen>
        <strong>Fuerza sobre una carga en un campo</strong>: <MathText>{"$\\vec{F} = q\\vec{E}$"}</MathText><br /><br />
        Si q es positiva, F va en el sentido de E. Si q es negativa, F va al contrario.
      </Resumen>

      <Definicion termino="Líneas de campo">
        Visualización del campo eléctrico. Salen de cargas positivas, entran a
        las negativas. Donde las líneas están más juntas, el campo es más intenso.
      </Definicion>
    </EscenaRica>
  );
}

// ─── V=kQ/r decreciendo con la distancia ───
function GraficoPotencial() {
  const k = 9, Q = 1;
  const xMin = 0.3, xMax = 5, yMin = 0, yMax = k * Q / xMin * 1.05, alto = 210;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const puntos = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= 40; i++) {
      const r = xMin + (xMax - xMin) * (i / 40);
      arr.push({ r, v: (k * Q) / r });
    }
    return arr;
  }, []);
  const path = puntos.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.r)} ${sy(p.v)}`).join(" ");
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        <path d={path} fill="none" stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <text x={sx(2.5)} y={sy((k * Q) / 2.5) - 10} fontSize="11" fontWeight="700" fill={LIENZO.accent}>V=kQ/r (decrece con r)</text>
      </Ejes>
    </Pizarra>
  );
}

function EscPotencial() {
  return (
    <EscenaRica>
      <Titulo>Potencial eléctrico (V)</Titulo>

      <Definicion termino="Potencial eléctrico">
        Energía potencial eléctrica por unidad de carga.
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$V = \\dfrac{U_{eléctrica}}{q}$"}</MathText>
        </div>
        Unidad: volt (V) = J/C.
      </Definicion>

      <Resumen>
        <strong>Potencial de una carga puntual</strong>: <MathText>{"$V = \\dfrac{kQ}{r}$"}</MathText> (no es vectorial; es escalar).
      </Resumen>
      <GraficoPotencial />

      <Definicion termino="Diferencia de potencial (ΔV)">
        Trabajo necesario para mover una carga unitaria de un punto a otro:
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$\\Delta V = V_b - V_a = \\dfrac{W}{q}$"}</MathText>
        </div>
      </Definicion>

      <Mnemotecnia>
        Una batería de 9 V mantiene una diferencia de potencial de 9 V entre
        sus bornes. Esto significa que mover 1 C de un borne al otro requiere
        9 J de trabajo.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─── Placas paralelas de un capacitor con campo entre ellas ───
function DiagramaCapacitor() {
  return (
    <Pizarra alto={190}>
      <svg width="100%" height="100%" viewBox="0 0 480 190" preserveAspectRatio="xMidYMid meet">
        <line x1="180" y1="30" x2="180" y2="160" stroke={LIENZO.bad} strokeWidth="6" />
        <line x1="300" y1="30" x2="300" y2="160" stroke={LIENZO.accent} strokeWidth="6" />
        {[50, 75, 100, 125, 150].map((y, i) => (
          <Flecha key={i} x1={190} y1={y} x2={290} y2={y} color={LIENZO.fgDim} id={`ef${i}`} />
        ))}
        <text x="180" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.bad}>+Q</text>
        <text x="300" y="20" textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.accent}>−Q</text>
        <text x="240" y="180" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>C = Q/V</text>
      </svg>
    </Pizarra>
  );
}

function EscCapacitores() {
  return (
    <EscenaRica>
      <Titulo>Capacitores (condensadores)</Titulo>

      <Definicion termino="Capacitor">
        Dispositivo formado por dos placas conductoras separadas que almacena
        carga (y energía) cuando se conecta a una fuente.
      </Definicion>

      <DiagramaCapacitor />

      <Definicion termino="Capacitancia (C)">
        Razón entre la carga almacenada y la diferencia de potencial:
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$C = \\dfrac{Q}{V}$"}</MathText>
        </div>
        Unidad: farad (F) = C/V. Como es enorme, se usan μF (10⁻⁶) y pF (10⁻¹²).
      </Definicion>

      <Resumen>
        <strong>Energía almacenada</strong>: <MathText>{"$U = \\tfrac12 CV^2 = \\tfrac12 QV = \\dfrac{Q^2}{2C}$"}</MathText>
      </Resumen>

      <PorQue>
        Los capacitores son fundamentales en electrónica: almacenan energía
        para liberarla rápido (flashes de cámaras), filtran señales,
        estabilizan voltajes.
      </PorQue>
    </EscenaRica>
  );
}

// ─── Símbolo de capacitor (dos líneas paralelas) ───
function SimboloCap({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line x1={x - 12} y1={y - 14} x2={x - 12} y2={y + 14} stroke={LIENZO.fg} strokeWidth="3" />
      <line x1={x + 12} y1={y - 14} x2={x + 12} y2={y + 14} stroke={LIENZO.fg} strokeWidth="3" />
    </g>
  );
}

function DiagramaCircuitosCap() {
  return (
    <Pizarra alto={220}>
      <svg width="100%" height="100%" viewBox="0 0 480 220" preserveAspectRatio="xMidYMid meet">
        {/* Paralelo */}
        <text x="120" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.accent}>PARALELO</text>
        <line x1="60" y1="55" x2="60" y2="145" stroke={LIENZO.fg} strokeWidth="2" />
        <line x1="180" y1="55" x2="180" y2="145" stroke={LIENZO.fg} strokeWidth="2" />
        <line x1="60" y1="75" x2="108" y2="75" stroke={LIENZO.fg} strokeWidth="2" />
        <SimboloCap x={120} y={75} />
        <line x1="132" y1="75" x2="180" y2="75" stroke={LIENZO.fg} strokeWidth="2" />
        <line x1="60" y1="125" x2="108" y2="125" stroke={LIENZO.fg} strokeWidth="2" />
        <SimboloCap x={120} y={125} />
        <line x1="132" y1="125" x2="180" y2="125" stroke={LIENZO.fg} strokeWidth="2" />
        <text x="120" y="180" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>C_eq = C₁+C₂</text>

        {/* Serie */}
        <text x="360" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.ok}>SERIE</text>
        <line x1="280" y1="100" x2="320" y2="100" stroke={LIENZO.fg} strokeWidth="2" />
        <SimboloCap x={332} y={100} />
        <line x1="344" y1="100" x2="384" y2="100" stroke={LIENZO.fg} strokeWidth="2" />
        <SimboloCap x={396} y={100} />
        <line x1="408" y1="100" x2="440" y2="100" stroke={LIENZO.fg} strokeWidth="2" />
        <text x="360" y="150" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>1/C_eq = 1/C₁+1/C₂</text>
      </svg>
    </Pizarra>
  );
}

function EscCombCap() {
  return (
    <EscenaRica>
      <Titulo>Combinación de capacitores</Titulo>

      <DiagramaCircuitosCap />

      <Resumen>
        <strong>En PARALELO</strong> (mismo voltaje, cargas se suman):
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$C_{eq} = C_1+C_2+C_3+\\cdots$"}</MathText>
        </div>
        Las capacitancias se SUMAN directamente.
      </Resumen>

      <Resumen>
        <strong>En SERIE</strong> (misma carga, voltajes se suman):
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$\\dfrac1{C_{eq}} = \\dfrac1{C_1}+\\dfrac1{C_2}+\\cdots$"}</MathText>
        </div>
        Para 2 en serie: <MathText>{"$C_{eq} = \\dfrac{C_1 C_2}{C_1+C_2}$"}</MathText>
      </Resumen>

      <WorkedExample titulo="F20 1op 2005 · combinación mixta">
        Tres capacitores idénticos de 10 μF. Dos en serie y esa combinación
        en paralelo con el tercero.<br /><br />

        <strong>Paso 1 · Los dos en serie:</strong> <MathText>{"$C_{serie} = \\dfrac{10\\cdot10}{10+10} = 5$"}</MathText> μF<br /><br />

        <strong>Paso 2 · Esa serie en paralelo con el tercero:</strong> C_eq = 5 + 10 = <strong>15 μF</strong>
      </WorkedExample>

      <Mnemotecnia>
        Mnemotecnia para capacitores: <strong>"paralelo suma, serie suma
        inversas"</strong>. Es OPUESTO a las resistencias (donde serie suma
        directamente).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Más problemas tipo examen</Titulo>

      <WorkedExample titulo="Carga en campo">
        Una carga q = 4 μC está en un campo eléctrico de 200 N/C. ¿Fuerza sobre la carga?<br /><br />

        <MathText>{"$F = qE = 4\\cdot10^{-6}(200) = 8\\cdot10^{-4}$"}</MathText> N = 0.8 mN
      </WorkedExample>

      <WorkedExample titulo="Capacitor cargado">
        Un capacitor de 2 μF se conecta a una batería de 12 V. ¿Carga almacenada? ¿Energía?<br /><br />

        <MathText>{"$Q = CV = 2\\cdot10^{-6}(12) = 24$"}</MathText> μC.<br />
        <MathText>{"$U = \\tfrac12 CV^2 = \\tfrac12(2\\cdot10^{-6})(144) = 144$"}</MathText> μJ
      </WorkedExample>

      <Conexion>
        En el examen también aparecen circuitos mixtos. Reduces paso a paso:
        identifica grupos en serie o paralelo, calcula la equivalente, y así
        hasta tener un capacitor único.
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Dos cargas de 2 C cada una a 1 m. Fuerza (k = 9·10⁹):",
      o: ["3.6·10¹⁰ N", "9·10⁹ N", "0", "1.8·10¹⁰ N"],
      c: 0,
      ex: "$F = 9\\cdot10^9(2)(2)/1 = 3.6\\cdot10^{10}$ N.",
    },
    {
      p: "Si la distancia entre dos cargas se duplica, la fuerza:",
      o: ["se reduce 4 veces", "se reduce 2 veces", "duplica", "no cambia"],
      c: 0,
      ex: "$F \\propto 1/r^2$. Doblar r reduce F a 1/4.",
    },
    {
      p: "Dos capacitores 4 μF y 6 μF en paralelo. C_eq:",
      o: ["10 μF", "2.4 μF", "5 μF", "2 μF"],
      c: 0,
      ex: "Paralelo: suma directa = 10 μF.",
    },
    {
      p: "Dos capacitores 4 μF y 4 μF en serie:",
      o: ["2 μF", "8 μF", "4 μF", "16 μF"],
      c: 0,
      ex: "Serie: $4(4)/(4+4) = 2$ μF.",
    },
    {
      p: "Carga almacenada por un capacitor de 5 μF a 10 V:",
      o: ["50 μC", "5 μC", "10 μC", "0.5 μC"],
      c: 0,
      ex: "$Q = CV = 5(10) = 50$ μC.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · capacitores como resistencias">
        Para CAPACITORES: paralelo suma directo, serie inversas. Para
        RESISTENCIAS es al revés (serie suma directa). No confundir.
      </Misconception>

      <Misconception titulo="Error 2 · unidades en Coulomb">
        Las cargas suelen venir en μC (microcoulomb) = 10⁻⁶ C, no en C directo.
        Verifica unidades antes de aplicar la fórmula.
      </Misconception>

      <Misconception titulo="Error 3 · ignorar el signo en Coulomb">
        |q₁·q₂| da el módulo de la fuerza. Para saber si es atractiva o
        repulsiva, mira los signos: iguales = repulsión, opuestos = atracción.
      </Misconception>

      <Titulo>Práctica · 5 ejercicios</Titulo>
      {ejs.map((e, i) => {
        const sel = resp[i];
        const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c;
                const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{
                      padding: "10px 14px",
                      background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)",
                      border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`,
                      borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer",
                      fontFamily: "var(--font-crimson), serif", textAlign: "left",
                    }}>{op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}</button>
                );
              })}
            </div>
            {rev && (
              <div style={{ marginTop: 10, padding: "10px 12px", background: sel === e.c ? "#ecfdf5" : "#fef2f2", borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5 }}>
                <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}<MathText>{e.ex}</MathText>
              </div>
            )}
          </div>
        );
      })}
      {Object.keys(resp).length === ejs.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 18, background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
