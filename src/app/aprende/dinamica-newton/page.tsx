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
import { Pizarra, LIENZO } from "../_components/lienzo";
import MathText from "../../components/MathText";

export default function Page() {
  return (
    <LeccionShell
      unidad="FIS-04"
      tituloUnidad="Dinámica · Leyes de Newton"
      escenas={[
        { titulo: "Fuerza · concepto", componente: EscFuerza },
        { titulo: "Primera ley · inercia", componente: EscPrimera },
        { titulo: "Segunda ley · F = ma", componente: EscSegunda },
        { titulo: "Tercera ley · acción-reacción", componente: EscTercera },
        { titulo: "Peso vs masa", componente: EscPeso },
        { titulo: "Fuerza de fricción", componente: EscFriccion },
        { titulo: "Plano inclinado", componente: EscPlano },
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

// ─── Diagrama de cuerpo libre genérico: los 4 tipos de fuerza ───
function DCLGenerico() {
  const cx = 240, cy = 130, box = 50;
  return (
    <Pizarra alto={240}>
      <svg width="100%" height="100%" viewBox="0 0 480 240" preserveAspectRatio="xMidYMid meet">
        <rect x={cx - box / 2} y={cy - box / 2} width={box} height={box} rx="6" fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
        <defs>
          <marker id="mN" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.ok} /></marker>
          <marker id="mP" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.warn} /></marker>
          <marker id="mT" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.accent} /></marker>
          <marker id="mF" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.bad} /></marker>
        </defs>
        <line x1={cx} y1={cy - box / 2} x2={cx} y2={cy - box / 2 - 60} stroke={LIENZO.ok} strokeWidth="3" markerEnd="url(#mN)" />
        <text x={cx + 8} y={cy - box / 2 - 40} fontSize="12" fontWeight="700" fill={LIENZO.ok}>Normal</text>
        <line x1={cx} y1={cy + box / 2} x2={cx} y2={cy + box / 2 + 60} stroke={LIENZO.warn} strokeWidth="3" markerEnd="url(#mP)" />
        <text x={cx + 8} y={cy + box / 2 + 46} fontSize="12" fontWeight="700" fill={LIENZO.warn}>Peso</text>
        <line x1={cx - box / 2} y1={cy} x2={cx - box / 2 - 70} y2={cy - 25} stroke={LIENZO.accent} strokeWidth="3" markerEnd="url(#mT)" />
        <text x={cx - box / 2 - 90} y={cy - 30} fontSize="12" fontWeight="700" fill={LIENZO.accent} textAnchor="middle">Tensión</text>
        <line x1={cx + box / 2} y1={cy} x2={cx + box / 2 + 65} y2={cy} stroke={LIENZO.bad} strokeWidth="3" markerEnd="url(#mF)" />
        <text x={cx + box / 2 + 70} y={cy + 4} fontSize="12" fontWeight="700" fill={LIENZO.bad}>Fricción</text>
      </svg>
    </Pizarra>
  );
}

function EscFuerza() {
  return (
    <EscenaRica>
      <Titulo>Fuerza · qué es</Titulo>

      <Hook>
        Las leyes de Newton son el "sistema operativo" de la mecánica clásica.
        Casi toda la física del examen FCyT depende de ellas: fricción, planos
        inclinados, sistemas con poleas, choques.
      </Hook>

      <Definicion termino="Fuerza (F)">
        Interacción que produce cambios en el movimiento (aceleración) o
        deformación de un cuerpo. Es VECTORIAL. Unidad SI: newton (N) = kg·m/s².
      </Definicion>

      <DCLGenerico />

      <Resumen>
        <strong>Tipos comunes de fuerzas</strong>:<br />
        • <strong>Peso</strong>: la fuerza con la que la Tierra atrae al cuerpo.<br />
        • <strong>Normal</strong>: la superficie ejerce perpendicular al cuerpo.<br />
        • <strong>Tensión</strong>: en cuerdas.<br />
        • <strong>Fricción</strong>: opuesta al movimiento.<br />
        • <strong>Elástica</strong>: en resortes (Hooke).
      </Resumen>
    </EscenaRica>
  );
}

// ─── Inercia: pasajero en un auto que frena ───
function DiagramaInercia() {
  const [frenando, setFrenando] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 480 180" preserveAspectRatio="xMidYMid meet">
          <rect x="40" y="90" width="220" height="60" rx="10" fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
          <circle cx="90" cy="155" r="12" fill={LIENZO.fgDim} />
          <circle cx="220" cy="155" r="12" fill={LIENZO.fgDim} />
          <motion.circle cx="150" cy="95" r="14" fill={LIENZO.accent}
            animate={{ cx: frenando ? 210 : 150 }} transition={{ duration: 0.5 }} />
          <line x1="10" y1="150" x2="460" y2="150" stroke={LIENZO.fgFaint} strokeWidth="2" />
          {frenando && <text x="330" y="100" fontSize="12" fontWeight="700" fill={LIENZO.warn}>el pasajero "sigue de largo" (inercia)</text>}
          {!frenando && <text x="330" y="100" fontSize="12" fill={LIENZO.fgDim}>auto y pasajero a velocidad constante</text>}
        </svg>
      </Pizarra>
      <button onClick={() => setFrenando((v) => !v)} style={{
        padding: "8px 16px", borderRadius: 999, border: `1px solid ${LIENZO.accent}`,
        background: "transparent", color: LIENZO.accent, fontWeight: 700, fontSize: 13, cursor: "pointer", alignSelf: "center",
      }}>{frenando ? "Volver a velocidad constante" : "El auto frena de golpe"}</button>
    </div>
  );
}

function EscPrimera() {
  return (
    <EscenaRica>
      <Titulo>1ª Ley · Principio de inercia</Titulo>

      <Definicion termino="Primera Ley de Newton">
        Todo cuerpo permanece en reposo o en movimiento rectilíneo uniforme
        (MRU) si NO actúa sobre él una fuerza neta (o si las fuerzas se
        equilibran).
      </Definicion>

      <DiagramaInercia />

      <Resumen>
        <strong>Equilibrio</strong>: cuando la fuerza neta es cero. Hay dos casos:<br />
        • Equilibrio estático: cuerpo en reposo.<br />
        • Equilibrio dinámico: cuerpo en MRU.
      </Resumen>

      <Mnemotecnia>
        La "inercia" es la tendencia natural de los cuerpos a NO cambiar su
        estado de movimiento. Por eso un auto que frena de golpe te lanza
        hacia adelante: tú sigues con MRU mientras el auto frena.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─── Misma fuerza, distinta masa → distinta aceleración (flechas a escala) ───
function ComparacionMasas() {
  const F = 10, mA = 2, mB = 5;
  const aA = F / mA, aB = F / mB;
  const escala = 10;
  return (
    <Pizarra alto={200}>
      <svg width="100%" height="100%" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
        <rect x="60" y="80" width="60" height="60" rx="6" fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
        <text x="90" y="115" textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.fg}>{mA} kg</text>
        {/* Las flechas de aceleración iban VERTICALES mientras la fuerza va
            horizontal, justo debajo del texto que dice que la aceleración tiene
            la misma dirección que la fuerza neta. Ahora van paralelas: lo único
            que las distingue es el largo, que es de lo que habla la escena. */}
        <Flecha x1={120} y1={98} x2={120 + F * 3} y2={98} color={LIENZO.accent} id="fA" />
        <text x={120 + F * 3 + 6} y={94} fontSize="11" fill={LIENZO.accent}>F=10 N</text>
        <Flecha x1={120} y1={128} x2={120 + aA * escala} y2={128} color={LIENZO.ok} id="aA" />
        <text x={120 + aA * escala + 6} y={132} fontSize="11" fontWeight="700" fill={LIENZO.ok}>a=5 m/s²</text>

        <rect x="300" y="80" width="60" height="60" rx="6" fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
        <text x="330" y="115" textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.fg}>{mB} kg</text>
        <Flecha x1={360} y1={98} x2={360 + F * 3} y2={98} color={LIENZO.accent} id="fB" />
        <text x={360 + F * 3 + 6} y={94} fontSize="11" fill={LIENZO.accent}>F=10 N</text>
        <Flecha x1={360} y1={128} x2={360 + aB * escala} y2={128} color={LIENZO.ok} id="aB" />
        <text x={360 + aB * escala + 6} y={132} fontSize="11" fontWeight="700" fill={LIENZO.ok}>a=2 m/s²</text>
      </svg>
    </Pizarra>
  );
}

function EscSegunda() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>2ª Ley · F = m·a</Titulo>

      <Resumen>
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$\\vec{F}_{neta} = m\\vec{a}$"}</MathText>
        </div>
        La fuerza neta produce una aceleración proporcional a su magnitud e
        inversamente proporcional a la masa. La aceleración tiene la misma
        DIRECCIÓN que la fuerza neta.
      </Resumen>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        Misma fuerza, el doble y medio de masa: la aceleración se reparte al revés
      </p>
      <ComparacionMasas />

      <PorQue>
        Esta ley conecta DINÁMICA (fuerzas) con CINEMÁTICA (aceleraciones).
        Si conoces las fuerzas, puedes predecir el movimiento. Si conoces el
        movimiento, puedes deducir las fuerzas.
      </PorQue>

      <WorkedExample titulo="Aplicación simple">
        Una fuerza de 50 N actúa sobre un bloque de 10 kg. ¿Aceleración?<br />
        <MathText>{"$a = \\dfrac{F}{m} = \\dfrac{50}{10} = 5$"}</MathText> m/s².
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Acción-reacción: persona empuja pared, dos cuerpos distintos ───
function DiagramaAccionReaccion() {
  return (
    <Pizarra alto={190}>
      <svg width="100%" height="100%" viewBox="0 0 480 190" preserveAspectRatio="xMidYMid meet">
        <rect x="330" y="20" width="20" height="150" fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
        <text x="340" y="15" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>pared</text>
        <circle cx="220" cy="80" r="16" fill={LIENZO.accent} />
        <rect x="200" y="96" width="40" height="55" rx="8" fill={LIENZO.accent} opacity="0.8" />
        <text x="220" y="168" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>persona</text>
        <Flecha x1={240} y1={120} x2={325} y2={120} color={LIENZO.ok} id="accion" />
        <text x={282} y={112} textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.ok}>acción (sobre la pared)</text>
        <Flecha x1={325} y1={140} x2={240} y2={140} color={LIENZO.warn} id="reaccion" />
        <text x={282} y={158} textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.warn}>reacción (sobre la persona)</text>
      </svg>
    </Pizarra>
  );
}

function EscTercera() {
  return (
    <EscenaRica>
      <Titulo>3ª Ley · Acción y reacción</Titulo>

      <Definicion termino="Tercera Ley">
        Por cada fuerza (acción) que un cuerpo A ejerce sobre B, B ejerce sobre
        A una fuerza igual en módulo y de sentido opuesto (reacción).
      </Definicion>

      <DiagramaAccionReaccion />

      <Cuidado>
        Las fuerzas de acción y reacción actúan sobre cuerpos DISTINTOS (acá:
        la persona y la pared). Por eso NO se anulan entre sí (no son fuerzas
        equilibrantes).
      </Cuidado>

      <Ejemplo titulo="Ejemplos">
        • Caminas: empujas el piso hacia atrás, el piso te empuja hacia
        adelante.<br />
        • Cohete: expulsa gas hacia abajo, el gas lo empuja hacia arriba.<br />
        • Saltas: empujas el piso, el piso te empuja a tú.
      </Ejemplo>
    </EscenaRica>
  );
}

// ─── Peso vs masa: Tierra vs Luna, mismo objeto ───
function TierraVsLuna() {
  const g_T = 9.8, g_L = 1.6, m = 70;
  const escala = 5;
  return (
    <Pizarra alto={220}>
      <svg width="100%" height="100%" viewBox="0 0 480 220" preserveAspectRatio="xMidYMid meet">
        <rect x="90" y="60" width="50" height="50" rx="6" fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
        <text x="115" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.fg}>70 kg</text>
        <Flecha x1={115} y1={112} x2={115} y2={112 + m * g_T * (escala / 40)} color={LIENZO.warn} id="pesoT" />
        <text x="115" y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.warn}>P = 686 N</text>
        <text x="115" y="30" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>Tierra (g=9.8)</text>

        <rect x="340" y="60" width="50" height="50" rx="6" fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
        <text x="365" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.fg}>70 kg</text>
        <Flecha x1={365} y1={112} x2={365} y2={112 + m * g_L * (escala / 40)} color={LIENZO.warn} id="pesoL" />
        <text x="365" y={112 + m * g_L * (escala / 40) + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.warn}>P ≈ 112 N</text>
        <text x="365" y="30" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>Luna (g=1.6)</text>
      </svg>
    </Pizarra>
  );
}

function EscPeso() {
  return (
    <EscenaRica>
      <Titulo>Peso vs masa · NO son lo mismo</Titulo>

      <Definicion termino="Masa (m)">
        Cantidad de materia. Es invariante (no depende de dónde estes). Unidad: kg.
      </Definicion>

      <Definicion termino="Peso (P)">
        Fuerza con que la Tierra (o cualquier planeta) atrae al cuerpo.
        Depende de la gravedad local. Unidad: N.
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$P = mg$"}</MathText>
        </div>
      </Definicion>

      <TierraVsLuna />

      <Mnemotecnia>
        Tu masa es la misma en la Tierra que en la Luna (60 kg en ambos sitios).
        Pero tu peso es 6 veces mayor en la Tierra (g_T = 9.8 vs g_L ≈ 1.6).
      </Mnemotecnia>

      <Ejemplo titulo="Cálculo de peso">
        Persona de 70 kg en la Tierra: <MathText>{"$P = 70(9.8) = 686$"}</MathText> N.<br />
        Misma persona en la Luna: <MathText>{"$P = 70(1.6) \\approx 112$"}</MathText> N.<br />
        Su masa: 70 kg en ambos lugares.
      </Ejemplo>
    </EscenaRica>
  );
}

// ─── DCL de bloque con fricción oponiéndose al movimiento ───
// Normal y Peso se dibujaban de 50 y 38 px. En piso horizontal y sin
// aceleración vertical valen lo mismo, y la propia lección lo dice en su
// "Error 3": el dibujo enseñaba lo contrario del texto. Ahora miden igual.
// El Peso además arrancaba en y=172, por debajo de la línea del piso.
function DCLFriccion() {
  return (
    <Pizarra alto={240}>
      <svg width="100%" height="100%" viewBox="0 0 480 240" preserveAspectRatio="xMidYMid meet">
        <line x1="60" y1="170" x2="420" y2="170" stroke={LIENZO.fg} strokeWidth="2" />
        <rect x="200" y="120" width="60" height="50" rx="6" fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
        <Flecha x1={230} y1={118} x2={230} y2={70} color={LIENZO.ok} id="Nfric" />
        <text x={236} y={92} fontSize="11" fontWeight="700" fill={LIENZO.ok}>Normal</text>
        <Flecha x1={230} y1={170} x2={230} y2={218} color={LIENZO.warn} id="Pfric" />
        <text x={236} y={212} fontSize="11" fontWeight="700" fill={LIENZO.warn}>Peso</text>
        <Flecha x1={262} y1={145} x2={340} y2={145} color={LIENZO.accent} id="Faplic" />
        <text x={344} y={140} fontSize="11" fontWeight="700" fill={LIENZO.accent}>F aplicada</text>
        <Flecha x1={198} y1={145} x2={150} y2={145} color={LIENZO.bad} id="Ffric" />
        <text x={90} y={140} fontSize="11" fontWeight="700" fill={LIENZO.bad}>fricción</text>
      </svg>
    </Pizarra>
  );
}

function EscFriccion() {
  return (
    <EscenaRica>
      <Titulo>Fuerza de fricción (rozamiento)</Titulo>

      <Definicion termino="Fricción">
        Fuerza que se opone al movimiento relativo entre dos superficies en
        contacto. Hay dos tipos: estática (cuando no hay movimiento) y
        cinética (cuando hay movimiento).
      </Definicion>

      <DCLFriccion />

      <Resumen>
        <strong>Fórmulas</strong>:<br />
        • <strong>Fricción cinética</strong>: <MathText>{"$f_k = \\mu_k N$"}</MathText> (donde N es la normal).<br />
        • <strong>Fricción estática máxima</strong>: <MathText>{"$f_{s,max} = \\mu_s N$"}</MathText><br /><br />
        Generalmente μ_s &gt; μ_k (cuesta más empezar a mover que mantener el movimiento).
      </Resumen>

      <WorkedExample titulo="Frenado de auto · F14 1op-2-2025">
        μ_k = 0.80, v₀ = 28.7 m/s. ¿Distancia para detenerse? (g = 9.8)<br /><br />

        Desaceleración: <MathText>{"$a = \\mu_k g = 0.80(9.8) = 7.84$"}</MathText> m/s².<br />
        Distancia: <MathText>{"$d = \\dfrac{v_0^2}{2a} = \\dfrac{823.69}{15.68}$"}</MathText> = <strong>52.53 m</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Plano inclinado: descomposición real del peso ───
function DCLPlanoInclinado() {
  const anguloDeg = 30;
  const ang = (anguloDeg * Math.PI) / 180;
  const W = 480, H = 260;
  const baseX = 60, baseY = 220, largo = 300;
  const puntaX = baseX + largo * Math.cos(ang), puntaY = baseY - largo * Math.sin(ang);
  // bloque a mitad del plano
  const t = 0.55;
  const bx = baseX + largo * t * Math.cos(ang), by = baseY - largo * t * Math.sin(ang);
  const offsetPerp = 22;
  const cx = bx - offsetPerp * Math.sin(ang), cy = by - offsetPerp * Math.cos(ang);
  // Peso hacia abajo
  const pesoLen = 70;
  // Componentes reales del peso (sin alargar artificialmente: nunca deben verse
  // más largas que el propio peso, del que son proyección).
  const paraLen = pesoLen * Math.sin(ang), perpLen = pesoLen * Math.cos(ang);
  // Paralela al plano, HACIA LA BASE (sentido en que desliza el cuerpo): x negativo, y positivo.
  const dirParaX = -Math.cos(ang), dirParaY = Math.sin(ang);
  // Perpendicular al plano, saliente (misma dirección que la Normal).
  const dirPerpX = -Math.sin(ang), dirPerpY = -Math.cos(ang);
  const pxEndX = bx + dirParaX * paraLen, pxEndY = by + dirParaY * paraLen;
  const pyEndX = bx - dirPerpX * perpLen, pyEndY = by - dirPerpY * perpLen;
  const nEndX = bx + dirPerpX * 65, nEndY = by + dirPerpY * 65;
  return (
    <Pizarra alto={H}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <polygon points={`${baseX},${baseY} ${puntaX},${puntaY} ${puntaX},${baseY}`} fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
        <path d={`M ${baseX + 30} ${baseY} A 30 30 0 0 1 ${baseX + 30 * Math.cos(ang)} ${baseY - 30 * Math.sin(ang)}`} fill="none" stroke={LIENZO.fgDim} strokeWidth="1.5" />
        <text x={baseX + 42} y={baseY - 10} fontSize="12" fill={LIENZO.fgDim}>θ=30°</text>
        <rect x={cx - 18} y={cy - 14} width="36" height="28" rx="5" fill={LIENZO.accent} opacity="0.85"
          transform={`rotate(${-anguloDeg}, ${cx}, ${cy})`} />
        {/* Peso (vertical hacia abajo) */}
        <Flecha x1={bx} y1={by} x2={bx} y2={by + pesoLen} color={LIENZO.warn} id="pesoPlano" />
        <text x={bx + 8} y={by + pesoLen + 14} fontSize="11" fontWeight="700" fill={LIENZO.warn}>Peso (mg)</text>
        {/* Componente paralela al plano, hacia la base (desliza el cuerpo) */}
        <Flecha x1={bx} y1={by} x2={pxEndX} y2={pxEndY} color={LIENZO.bad} id="px" />
        <text x={pxEndX - 8} y={pxEndY + 16} fontSize="11" fontWeight="700" fill={LIENZO.bad} textAnchor="end">Pₓ=mg·senθ</text>
        {/* Componente perpendicular al plano, hacia adentro (opuesta a la Normal) */}
        <Flecha x1={bx} y1={by} x2={pyEndX} y2={pyEndY} color={LIENZO.accent} id="py" />
        <text x={pyEndX + 8} y={pyEndY - 2} fontSize="11" fontWeight="700" fill={LIENZO.accent}>Pᵧ=mg·cosθ</text>
        {/* Normal (perpendicular al plano, saliente) */}
        <Flecha x1={bx} y1={by} x2={nEndX} y2={nEndY} color={LIENZO.ok} id="normalPlano" />
        <text x={nEndX - 6} y={nEndY - 6} fontSize="11" fontWeight="700" fill={LIENZO.ok} textAnchor="end">Normal</text>
      </svg>
    </Pizarra>
  );
}

function EscPlano() {
  return (
    <EscenaRica>
      <Titulo>Plano inclinado</Titulo>

      <Parrafo>
        Sobre un plano inclinado un ángulo θ, el peso se descompone en dos
        componentes perpendiculares entre sí:
      </Parrafo>

      <DCLPlanoInclinado />

      <Resumen>
        • Componente paralela al plano (desliza el cuerpo hacia abajo): <MathText>{"$P_x = mg\\sin\\theta$"}</MathText><br />
        • Componente perpendicular al plano (presiona la superficie): <MathText>{"$P_y = mg\\cos\\theta$"}</MathText>
      </Resumen>

      <Resumen>
        <strong>Si no hay fricción</strong>: aceleración bajando <MathText>{"$a = g\\sin\\theta$"}</MathText><br /><br />
        <strong>Si hay fricción</strong> con coeficiente μ_k:<br />
        Normal: <MathText>{"$N = mg\\cos\\theta$"}</MathText><br />
        Fricción: <MathText>{"$f = \\mu_k mg\\cos\\theta$"}</MathText> (opuesta al movimiento)<br />
        Aceleración bajando: <MathText>{"$a = g(\\sin\\theta - \\mu_k\\cos\\theta)$"}</MathText>
      </Resumen>

      <WorkedExample titulo="Cuándo está a punto de deslizar">
        Si el cuerpo está en reposo y aumentas el ángulo hasta que JUSTO
        empieza a deslizar, tienes:
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$\\mu_s = \\tan\\theta_{crítico}$"}</MathText>
        </div>
        Por eso el ángulo límite es <MathText>{"$\\arctan(\\mu_s)$"}</MathText>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen</Titulo>

      <WorkedExample titulo="Bloque con resorte y fricción · F12 3op-2025">
        Bloque de 10 kg cae desde 3 m, fricción solo entre B y C (6 m), choca
        resorte k=100 N/m, lo comprime √2 m. ¿μ_k entre B y C? (g=10)<br /><br />

        Energía inicial: <MathText>{"$E_A = mgh = 10(10)(3) = 300$"}</MathText> J.<br />
        Energía elástica: <MathText>{"$E_r = \\tfrac12 kx^2 = \\tfrac12(100)(2) = 100$"}</MathText> J.<br />
        Energía disipada por fricción: 300 − 100 = 200 J.
        <div style={{ textAlign: "center", padding: "8px 0", overflowX: "auto" }}>
          <MathText>{"$W_{fricción} = f\\cdot d = (\\mu mg)\\cdot 6 = 600\\mu = 200 \\ \\Rightarrow\\ \\mu = \\dfrac13$"}</MathText>
        </div>
      </WorkedExample>

      <WorkedExample titulo="Elevador con motor · F15 2op-2-2025">
        Elevador 600 kg sube 20 m en 16 s con motor 40 hp. ¿Pasajeros máx?
        (65 kg c/u, g=9.8, 1 hp=746 W)<br /><br />

        Velocidad: <MathText>{"$v = \\dfrac{20}{16} = 1.25$"}</MathText> m/s.<br />
        Potencia disponible: <MathText>{"$P = 40(746) = 29840$"}</MathText> W.<br />
        Fuerza máx = <MathText>{"$\\dfrac{P}{v} = 23872$"}</MathText> N.
        <div style={{ textAlign: "center", padding: "8px 0", overflowX: "auto" }}>
          <MathText>{"$F = (600+65n)g \\ \\Rightarrow\\ 23872 = 9.8(600+65n) \\ \\Rightarrow\\ 600+65n=2436$"}</MathText>
        </div>
        <MathText>{"$65n = 1836 \\ \\Rightarrow\\ n = 28$"}</MathText> pasajeros
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Fuerza neta para que 5 kg acelere a 3 m/s²:",
      o: ["15 N", "1.67 N", "8 N", "0 N"],
      c: 0,
      ex: "$F = ma = 5(3) = 15$ N.",
    },
    {
      p: "Peso de 10 kg en la Tierra (g=9.8):",
      o: ["98 N", "10 N", "9.8 N", "100 kg"],
      c: 0,
      ex: "$P = mg = 10(9.8) = 98$ N.",
    },
    {
      p: "Si μ=0.4 y N=50 N, fricción cinética:",
      o: ["20 N", "50 N", "0.4 N", "125 N"],
      c: 0,
      ex: "$f = \\mu N = 0.4(50) = 20$ N.",
    },
    {
      p: "Bloque en plano sin fricción de 30°. Aceleración bajando (g=10):",
      o: ["5 m/s²", "10 m/s²", "8.66 m/s²", "2.5 m/s²"],
      c: 0,
      ex: "$a = g\\sin\\theta = 10(0.5) = 5$ m/s².",
    },
    {
      p: "Acción y reacción están sobre:",
      o: ["cuerpos distintos", "mismo cuerpo", "se anulan", "el mismo"],
      c: 0,
      ex: "Por eso no se equilibran ni se cancelan.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · confundir peso con masa">
        Masa = kg (cantidad de materia, invariante).<br />
        Peso = N (fuerza, depende de g).<br />
        Una balanza mide peso pero te dice "kg" aproximando con g local.
      </Misconception>

      <Misconception titulo="Error 2 · acción y reacción cancelan">
        FALSO. Actúan sobre cuerpos DISTINTOS, no se cancelan entre sí. Lo que
        cancela el movimiento es que sobre UN cuerpo haya fuerzas balanceadas.
      </Misconception>

      <Misconception titulo="Error 3 · normal = peso siempre">
        FALSO. En plano inclinado, N = mg·cos θ &lt; mg. En un elevador
        acelerando hacia arriba, N &gt; mg. Solo en piso horizontal sin
        aceleración vertical, N = mg.
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
