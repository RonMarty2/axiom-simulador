"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";
import MathText from "../../components/MathText";

export default function Page() {
  return (
    <LeccionShell
      unidad="QUI-06"
      tituloUnidad="Reacciones químicas y balanceo"
      escenas={[
        { titulo: "Tipos de reacciones", componente: EscTipos },
        { titulo: "Reacciones redox · conceptos", componente: EscRedox },
        { titulo: "Balanceo por tanteo", componente: EscTanteo },
        { titulo: "Balanceo redox · método ion-electrón", componente: EscIonElectron },
        { titulo: "Agente oxidante y reductor", componente: EscAgentes },
        { titulo: "Problemas tipo examen", componente: EscProblemas },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

// ─── Los 4 tipos de reacción como esquemas de bloques ───
function DiagramaTiposReaccion() {
  const B = ({ x, y, txt, col }: { x: number; y: number; txt: string; col: string }) => (
    <g>
      <rect x={x - 15} y={y - 14} width="30" height="28" rx="5" fill={col} opacity="0.85" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="white">{txt}</text>
    </g>
  );
  const tipos = [
    { y: 40, nombre: "Combinación", izq: ["A", "B"], der: ["AB"] },
    { y: 100, nombre: "Descomposición", izq: ["AB"], der: ["A", "B"] },
    { y: 160, nombre: "Sustitución simple", izq: ["A", "BC"], der: ["AC", "B"] },
    { y: 220, nombre: "Sustitución doble", izq: ["AB", "CD"], der: ["AD", "CB"] },
  ];
  return (
    <Pizarra alto={265}>
      <svg width="100%" height="100%" viewBox="0 0 480 265" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="rxArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.fgDim} />
          </marker>
        </defs>
        {tipos.map((t, i) => (
          <g key={i}>
            <text x="12" y={t.y + 5} fontSize="11" fontWeight="700" fill={LIENZO.fgDim}>{t.nombre}</text>
            {t.izq.map((s, k) => (
              <B key={k} x={175 + k * 45} y={t.y} txt={s} col={LIENZO.accent} />
            ))}
            <line x1="245" y1={t.y} x2="285" y2={t.y} stroke={LIENZO.fgDim} strokeWidth="2" markerEnd="url(#rxArrow)" />
            {t.der.map((s, k) => (
              <B key={k} x={310 + k * 45} y={t.y} txt={s} col={LIENZO.ok} />
            ))}
          </g>
        ))}
      </svg>
    </Pizarra>
  );
}

function EscTipos() {
  return (
    <EscenaRica>
      <Titulo>Tipos de reacciones químicas</Titulo>

      <Hook>
        Las reacciones químicas + balanceo son la base de la estequiometría
        (próxima lección). En el examen FCyT aparece en preguntas de redox
        (Q18 1op-2-2025, Q13 3op-2025) y combustión (Q15 3op-2025).
      </Hook>

      <DiagramaTiposReaccion />

      <Resumen>
        <strong>4 tipos básicos</strong>:<br /><br />

        1. <strong>Combinación (síntesis)</strong>: A + B → AB.<br />
        Ej: 2 H₂ + O₂ → 2 H₂O.<br /><br />

        2. <strong>Descomposición</strong>: AB → A + B.<br />
        Ej: 2 H₂O → 2 H₂ + O₂ (electrólisis).<br /><br />

        3. <strong>Sustitución simple (desplazamiento)</strong>: A + BC → AC + B.<br />
        Ej: Fe + CuSO₄ → FeSO₄ + Cu.<br /><br />

        4. <strong>Sustitución doble (metátesis)</strong>: AB + CD → AD + CB.<br />
        Ej: NaCl + AgNO₃ → NaNO₃ + AgCl.
      </Resumen>

      <Definicion termino="Combustión">
        Caso especial donde una sustancia reacciona con O₂ liberando energía
        (calor + luz).<br />
        Combustión completa de hidrocarburos: C_xH_y + O₂ → CO₂ + H₂O.
      </Definicion>

      <Ejemplo titulo="Combustión completa del propano (Q15 3op-2025)">
        C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.<br />
        Para 2 moles de propano: 2 × 5 = <strong>10 moles de O₂</strong>.
      </Ejemplo>
    </EscenaRica>
  );
}

// ─── Escalera de números de oxidación: sube = oxidación, baja = reducción ───
function EscaleraRedox() {
  const alto = 240;
  const nivelY = (n: number) => 200 - (n + 2) * 26; // -2 abajo, +5 arriba
  const niveles = [-2, -1, 0, 1, 2, 3, 4, 5];
  return (
    <Pizarra alto={alto}>
      <svg width="100%" height="100%" viewBox="0 0 480 240" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="upOx" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.bad} /></marker>
          <marker id="downRed" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.ok} /></marker>
        </defs>
        {niveles.map((n) => (
          <g key={n}>
            <line x1="120" y1={nivelY(n)} x2="360" y2={nivelY(n)} stroke={LIENZO.fgFaint} strokeWidth="1" strokeDasharray="2 4" />
            <text x="110" y={nivelY(n) + 4} textAnchor="end" fontSize="10" fill={LIENZO.fgDim}>{n > 0 ? `+${n}` : n}</text>
          </g>
        ))}
        {/* Zn: 0 → +2 (oxidación, sube) */}
        <line x1="180" y1={nivelY(0)} x2="180" y2={nivelY(2) + 6} stroke={LIENZO.bad} strokeWidth="3" markerEnd="url(#upOx)" />
        <circle cx="180" cy={nivelY(0)} r="5" fill={LIENZO.bad} />
        <text x="180" y={nivelY(0) + 20} textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.bad}>Zn⁰</text>
        <text x="192" y={nivelY(1)} fontSize="11" fontWeight="700" fill={LIENZO.bad}>OXIDACIÓN</text>
        <text x="192" y={nivelY(1) + 13} fontSize="10" fill={LIENZO.bad}>pierde 2 e⁻</text>

        {/* Cu: +2 → 0 (reducción, baja) */}
        <line x1="320" y1={nivelY(2)} x2="320" y2={nivelY(0) - 6} stroke={LIENZO.ok} strokeWidth="3" markerEnd="url(#downRed)" />
        <circle cx="320" cy={nivelY(2)} r="5" fill={LIENZO.ok} />
        <text x="320" y={nivelY(2) - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.ok}>Cu²⁺</text>
        <text x="332" y={nivelY(1)} fontSize="11" fontWeight="700" fill={LIENZO.ok}>REDUCCIÓN</text>
        <text x="332" y={nivelY(1) + 13} fontSize="10" fill={LIENZO.ok}>gana 2 e⁻</text>

        <text x="240" y="228" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>número de oxidación</text>
      </svg>
    </Pizarra>
  );
}

function EscRedox() {
  return (
    <EscenaRica>
      <Titulo>Reacciones de oxidación-reducción (redox)</Titulo>

      <Definicion termino="Oxidación">
        PÉRDIDA de electrones. El número de oxidación AUMENTA.
      </Definicion>

      <Definicion termino="Reducción">
        GANANCIA de electrones. El número de oxidación DISMINUYE.
      </Definicion>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        En Zn + Cu²⁺ → Zn²⁺ + Cu: uno sube la escalera, el otro baja
      </p>
      <EscaleraRedox />

      <Mnemotecnia>
        <strong>"LEO el GER" (en inglés)</strong>:<br />
        • <strong>LEO</strong>: Lose Electrons = Oxidation (perder e⁻ es oxidarse).<br />
        • <strong>GER</strong>: Gain Electrons = Reduction (ganar e⁻ es reducirse).<br /><br />

        En español: <strong>"PROD"</strong> (Perder = Oxidación, Recibir = Reducción).
      </Mnemotecnia>

      <Resumen>
        En toda reacción redox SIEMPRE hay una oxidación Y una reducción
        simultáneas. Si alguien pierde electrones, otro los gana.
      </Resumen>
    </EscenaRica>
  );
}

// ─── Conteo de átomos a cada lado, con estado interactivo del balanceo ───
function ContadorAtomos() {
  const [paso, setPaso] = useState(0);
  // CH4 + O2 -> CO2 + H2O, con coeficientes según el paso
  const pasos = [
    { coef: [1, 1, 1, 1], titulo: "Sin balancear" },
    { coef: [1, 1, 1, 2], titulo: "Paso 2 · ajusto H (×2 el H₂O)" },
    { coef: [1, 2, 1, 2], titulo: "Paso 3 · ajusto O (×2 el O₂)" },
  ];
  const { coef, titulo } = pasos[paso];
  const [cCH4, cO2, cCO2, cH2O] = coef;
  const izq = { C: cCH4 * 1, H: cCH4 * 4, O: cO2 * 2 };
  const der = { C: cCO2 * 1, H: cH2O * 2, O: cCO2 * 2 + cH2O * 1 };
  const elementos: ("C" | "H" | "O")[] = ["C", "H", "O"];
  const coefTxt = (n: number) => (n === 1 ? "" : String(n));
  return (
    <div style={{ width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 480 230" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="balArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.fgDim} /></marker>
          </defs>
          <text x="240" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.accent}>{titulo}</text>
          <text x="130" y="62" textAnchor="middle" fontSize="17" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">
            {coefTxt(cCH4)}CH₄ + {coefTxt(cO2)}O₂
          </text>
          <line x1="222" y1="56" x2="258" y2="56" stroke={LIENZO.fgDim} strokeWidth="2" markerEnd="url(#balArrow)" />
          <text x="350" y="62" textAnchor="middle" fontSize="17" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">
            {coefTxt(cCO2)}CO₂ + {coefTxt(cH2O)}H₂O
          </text>

          {elementos.map((el, i) => {
            const y = 105 + i * 38;
            const a = izq[el], b = der[el];
            const igual = a === b;
            const col = igual ? LIENZO.ok : LIENZO.bad;
            return (
              <g key={el}>
                <text x="60" y={y + 5} fontSize="13" fontWeight="700" fill={LIENZO.fgDim}>{el}</text>
                <rect x="110" y={y - 14} width="42" height="28" rx="6" fill={col} opacity="0.18" />
                <text x="131" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={col}>{a}</text>
                <text x="240" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={col}>{igual ? "=" : "≠"}</text>
                <rect x="328" y={y - 14} width="42" height="28" rx="6" fill={col} opacity="0.18" />
                <text x="349" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={col}>{b}</text>
                {igual && <text x="392" y={y + 5} fontSize="14" fontWeight="700" fill={LIENZO.ok}>✓</text>}
              </g>
            );
          })}
        </svg>
      </Pizarra>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {pasos.map((_, i) => (
          <button key={i} onClick={() => setPaso(i)} style={{
            padding: "7px 14px", borderRadius: 999,
            border: `1px solid ${paso === i ? LIENZO.accent : LIENZO.fgFaint}`,
            background: paso === i ? LIENZO.accent : "transparent",
            color: paso === i ? "white" : LIENZO.fgDim,
            fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}>Paso {i + 1}</button>
        ))}
      </div>
    </div>
  );
}

function EscTanteo() {
  return (
    <EscenaRica>
      <Titulo>Balanceo por tanteo</Titulo>

      <Parrafo>
        Para reacciones simples (sin redox), el balanceo por tanteo es lo más
        rápido. Idea: ajustar coeficientes para que la cantidad de átomos de
        cada elemento sea IGUAL en ambos lados (ley de Lavoisier).
      </Parrafo>

      <ContadorAtomos />

      <Mnemotecnia>
        <strong>Orden recomendado</strong>:<br />
        1. Empieza por el elemento más común (suele ser C o un metal).<br />
        2. Después ajusta H.<br />
        3. Al final ajusta O.<br />
        4. Si quedan fracciones, multiplica todo para enteros.
      </Mnemotecnia>

      <WorkedExample titulo="Combustión del metano · CH₄ + O₂ → CO₂ + H₂O">
        Paso 1 · C: 1 a la izquierda, 1 a la derecha. ✓<br />
        Paso 2 · H: 4 a la izquierda, 2 a la derecha. Multiplicar H₂O por 2:
        → CH₄ + O₂ → CO₂ + 2 H₂O. Ahora H: 4 = 4 ✓<br />
        Paso 3 · O: 2 a la izquierda, 2+2=4 a la derecha. Multiplicar O₂ por
        2: → CH₄ + 2 O₂ → CO₂ + 2 H₂O. O: 4=4 ✓<br /><br />

        Ecuación balanceada: <strong>CH₄ + 2 O₂ → CO₂ + 2 H₂O</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Las dos semirreacciones con el intercambio de electrones ───
function DiagramaSemirreacciones() {
  return (
    <Pizarra alto={210}>
      <svg width="100%" height="100%" viewBox="0 0 480 210" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="semiA" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.bad} /></marker>
          <marker id="semiB" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.ok} /></marker>
          <marker id="eFlow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.warn} /></marker>
        </defs>
        {/* Oxidación */}
        <rect x="30" y="35" width="180" height="60" rx="10" fill={LIENZO.bad} opacity="0.1" stroke={LIENZO.bad} strokeWidth="1.5" />
        <text x="120" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.bad}>OXIDACIÓN (×3)</text>
        <text x="120" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">Cu → Cu²⁺ + 2e⁻</text>

        {/* Reducción */}
        <rect x="270" y="35" width="180" height="60" rx="10" fill={LIENZO.ok} opacity="0.1" stroke={LIENZO.ok} strokeWidth="1.5" />
        <text x="360" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.ok}>REDUCCIÓN (×2)</text>
        <text x="360" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">N⁺⁵ + 3e⁻ → N⁺²</text>

        {/* Flujo de electrones */}
        <path d="M 210 110 Q 240 140 270 110" fill="none" stroke={LIENZO.warn} strokeWidth="2.5" markerEnd="url(#eFlow)" />
        <text x="240" y="152" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.warn}>6 e⁻ (mcm de 2 y 3)</text>

        <text x="240" y="188" textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.accent}>3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O</text>
      </svg>
    </Pizarra>
  );
}

function EscIonElectron() {
  return (
    <EscenaRica>
      <Titulo>Balanceo redox · método ion-electrón</Titulo>

      <Parrafo>
        Para reacciones redox complejas (con HNO₃, KMnO₄, K₂Cr₂O₇), el tanteo
        no alcanza. Hay que usar el método ion-electrón:
      </Parrafo>

      <Resumen>
        <strong>Pasos del método</strong>:<br />
        1. Identificar números de oxidación.<br />
        2. Identificar qué se oxida y qué se reduce.<br />
        3. Escribir las dos semirreacciones (oxidación y reducción).<br />
        4. Balancear cada semirreacción (átomos y carga con e⁻).<br />
        5. Igualar electrones multiplicando las semirreacciones.<br />
        6. Sumar y simplificar.
      </Resumen>

      <DiagramaSemirreacciones />

      <WorkedExample titulo="Q13 3op-2025 / Q18 1op-2-2025 · Cu + HNO₃">
        Cu + HNO₃ → Cu(NO₃)₂ + NO + H₂O.<br /><br />

        Oxidaciones:<br />
        • Cu: 0 → +2 (perdió 2 e⁻, OXIDACIÓN).<br />
        • N: +5 → +2 (ganó 3 e⁻, REDUCCIÓN).<br /><br />

        Semirreacciones:<br />
        Cu → Cu²⁺ + 2e⁻ (× 3 para igualar e⁻)<br />
        N⁺⁵ + 3e⁻ → N⁺² (× 2 para igualar e⁻)<br /><br />

        Sumando: 3 Cu + 2 N⁺⁵ → 3 Cu²⁺ + 2 N⁺².<br /><br />

        Coeficientes en la ecuación: 3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O.<br /><br />

        <strong>Agente oxidante (HNO₃): coeficiente 8</strong>.<br />
        <strong>Agente reductor (Cu): coeficiente 3</strong>.<br />
        Razón oxidante/reductor = <MathText>{"$\\dfrac83$"}</MathText>
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Agente oxidante vs reductor: quién hace qué a quién ───
function DiagramaAgentes() {
  return (
    <Pizarra alto={200}>
      <svg width="100%" height="100%" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="agA" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.warn} /></marker>
        </defs>
        <rect x="30" y="55" width="170" height="90" rx="12" fill={LIENZO.ok} opacity="0.1" stroke={LIENZO.ok} strokeWidth="1.5" />
        <text x="115" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.ok}>AGENTE OXIDANTE</text>
        <text x="115" y="103" textAnchor="middle" fontSize="12" fill={LIENZO.fg}>oxida al otro</text>
        <text x="115" y="126" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.fg}>pero ÉL se REDUCE</text>

        <rect x="280" y="55" width="170" height="90" rx="12" fill={LIENZO.bad} opacity="0.1" stroke={LIENZO.bad} strokeWidth="1.5" />
        <text x="365" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.bad}>AGENTE REDUCTOR</text>
        <text x="365" y="103" textAnchor="middle" fontSize="12" fill={LIENZO.fg}>reduce al otro</text>
        <text x="365" y="126" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.fg}>pero ÉL se OXIDA</text>

        <path d="M 280 88 Q 240 62 200 88" fill="none" stroke={LIENZO.warn} strokeWidth="2" markerEnd="url(#agA)" />
        <text x="240" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.warn}>le da e⁻</text>
        <text x="240" y="175" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>los electrones van del reductor al oxidante</text>
      </svg>
    </Pizarra>
  );
}

function EscAgentes() {
  return (
    <EscenaRica>
      <Titulo>Agente oxidante vs agente reductor</Titulo>

      <Definicion termino="Agente oxidante">
        Sustancia que CAUSA la oxidación de otra. Es la sustancia que SE
        REDUCE (gana electrones). Su número de oxidación DISMINUYE.
      </Definicion>

      <Definicion termino="Agente reductor">
        Sustancia que CAUSA la reducción de otra. Es la sustancia que SE
        OXIDA (pierde electrones). Su número de oxidación AUMENTA.
      </Definicion>

      <DiagramaAgentes />

      <Mnemotecnia>
        <strong>Truco para no confundir</strong>:<br />
        El agente oxidante OXIDA al otro, pero ÉL mismo se REDUCE.<br />
        El agente reductor REDUCE al otro, pero ÉL mismo se OXIDA.<br /><br />

        Es como un "donador" y "receptor": el agente oxidante "roba"
        electrones (se reduce); el reductor "los regala" (se oxida).
      </Mnemotecnia>

      <Ejemplo titulo="En la reacción Cu + HNO₃">
        • Cu (s) → Cu²⁺: se oxidó. Por tanto Cu es AGENTE REDUCTOR.<br />
        • HNO₃ (N⁺⁵) → NO (N⁺²): se redujo. Por tanto HNO₃ es AGENTE OXIDANTE.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen</Titulo>

      <WorkedExample titulo="Q15 3op-2025 · combustión propano">
        ¿Cuántos moles de O₂ se requieren para quemar 2 moles de C₃H₈?<br /><br />

        C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.<br />
        Por cada mol de propano: 5 moles de O₂.<br />
        Para 2 moles: 2 × 5 = <strong>10 moles de O₂</strong>.
      </WorkedExample>

      <WorkedExample titulo="Balancear: Al + H₂SO₄ → Al₂(SO₄)₃ + H₂">
        Paso 1: 2 Al + 3 H₂SO₄ → Al₂(SO₄)₃ + 3 H₂.<br />
        Verificar: Al 2=2, S 3=3, O 12=12, H 6=6 ✓<br /><br />

        Ecuación balanceada: <strong>2 Al + 3 H₂SO₄ → Al₂(SO₄)₃ + 3 H₂</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Balancea: H₂ + O₂ → H₂O. Coef de H₂:",
      o: ["2", "1", "3", "4"],
      c: 0,
      ex: "2 H₂ + O₂ → 2 H₂O.",
    },
    {
      p: "En NaCl + AgNO₃ → NaNO₃ + AgCl, ¿qué tipo?",
      o: ["doble sustitución", "síntesis", "redox", "descomposición"],
      c: 0,
      ex: "Intercambio entre 2 sales = metátesis.",
    },
    {
      p: "En Zn → Zn²⁺ + 2e⁻, el Zn:",
      o: ["se oxida", "se reduce", "ni una", "es agente oxidante"],
      c: 0,
      ex: "Perdió electrones = oxidación. Es agente reductor.",
    },
    {
      p: "Combustión de C₂H₆: necesita ¿moles de O₂ por mol?",
      o: ["3.5", "2", "5", "7"],
      c: 0,
      ex: "C₂H₆ + 7/2 O₂ → 2 CO₂ + 3 H₂O. Por mol: 3.5 mol O₂. (Multiplicando todo por 2: 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O).",
    },
    {
      p: "Agente oxidante:",
      o: ["se reduce", "se oxida", "cambia color", "evapora"],
      c: 0,
      ex: "Oxida al otro reduciéndose él.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · cambiar fórmulas en lugar de coeficientes">
        Al balancear, NO puedes cambiar los subíndices de las fórmulas (H₂O no
        se vuelve H₂O₂). Solo modificas los coeficientes al frente.
      </Misconception>

      <Misconception titulo="Error 2 · invertir agente oxidante/reductor">
        Agente OXIDANTE → se REDUCE (gana electrones). Agente REDUCTOR → se
        OXIDA (pierde electrones). Es contraintuitivo, prestá atención.
      </Misconception>

      <Misconception titulo="Error 3 · olvidar átomos de O en redox">
        En medio ácido, balancea O con H₂O y H con H⁺. En medio básico, con
        OH⁻. No te olvides de balancear estos cuando uses ion-electrón.
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
                <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}{e.ex}
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
