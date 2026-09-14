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
      unidad="QUI-04"
      tituloUnidad="Enlace químico"
      escenas={[
        { titulo: "Regla del octeto · estructura de Lewis", componente: EscOcteto },
        { titulo: "Enlace iónico (transferencia)", componente: EscIonico },
        { titulo: "Enlace covalente (compartido)", componente: EscCovalente },
        { titulo: "Tipos de covalente: simple, doble, triple, coordinado", componente: EscTiposCov },
        { titulo: "Polaridad de enlace", componente: EscPolaridad },
        { titulo: "Enlace metálico y fuerzas intermoleculares", componente: EscOtros },
        { titulo: "Comparación de propiedades", componente: EscComparacion },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

// ─── Átomo de Lewis: símbolo + electrones de valencia en las 4 posiciones ───
// Los puntos se reparten como en la convención real: uno por lado (arriba,
// derecha, abajo, izquierda) y recién al 5º se empiezan a aparear.
function AtomoLewis({ cx, cy, simbolo, valencia, color }: { cx: number; cy: number; simbolo: string; valencia: number; color?: string }) {
  const col = color ?? LIENZO.fg;
  const r = 17;
  const lados = [
    { dx: 0, dy: -1 },   // arriba
    { dx: 1, dy: 0 },    // derecha
    { dx: 0, dy: 1 },    // abajo
    { dx: -1, dy: 0 },   // izquierda
  ];
  const puntos: { x: number; y: number }[] = [];
  for (let i = 0; i < valencia; i++) {
    const lado = lados[i % 4];
    const par = Math.floor(i / 4); // 0 = primer electrón del lado, 1 = el que aparea
    // desplazamiento perpendicular para separar el par
    const perpX = lado.dy, perpY = -lado.dx;
    const sep = par === 0 ? -3.5 : 3.5;
    puntos.push({
      x: cx + lado.dx * r + perpX * sep,
      y: cy + lado.dy * r + perpY * sep,
    });
  }
  return (
    <g>
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="19" fontWeight="700" fill={col}
        fontFamily="var(--font-crimson), serif">{simbolo}</text>
      {puntos.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.6" fill={col} />
      ))}
    </g>
  );
}

function DiagramaLewis() {
  const atomos = [
    { simbolo: "H", valencia: 1, grupo: "IA" },
    { simbolo: "C", valencia: 4, grupo: "IVA" },
    { simbolo: "N", valencia: 5, grupo: "VA" },
    { simbolo: "O", valencia: 6, grupo: "VIA" },
    { simbolo: "Cl", valencia: 7, grupo: "VIIA" },
  ];
  return (
    <Pizarra alto={170}>
      <svg width="100%" height="100%" viewBox="0 0 480 170" preserveAspectRatio="xMidYMid meet">
        {atomos.map((a, i) => {
          const cx = 60 + i * 90, cy = 80;
          return (
            <g key={i}>
              <AtomoLewis cx={cx} cy={cy} simbolo={a.simbolo} valencia={a.valencia} color={LIENZO.accent} />
              <text x={cx} y={135} textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>{a.grupo}</text>
              <text x={cx} y={150} textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.fgDim}>{a.valencia} e⁻</text>
            </g>
          );
        })}
      </svg>
    </Pizarra>
  );
}

function EscOcteto() {
  return (
    <EscenaRica>
      <Titulo>Regla del octeto y estructuras de Lewis</Titulo>

      <Hook>
        El enlace químico explica POR QUÉ los átomos se combinan. En el examen
        FCyT aparece en Q4 PREU 2025 (Lewis e identificar tipos) y en
        problemas de estructura molecular.
      </Hook>

      <Definicion termino="Regla del octeto">
        Los átomos tienden a ganar, perder o compartir electrones hasta
        completar 8 electrones en su capa de valencia (como los gases nobles).
        Excepciones: H y He buscan 2 (dueto).
      </Definicion>

      <Definicion termino="Estructura de Lewis">
        Representación gráfica donde los electrones de valencia se muestran
        como puntos alrededor del símbolo. Los enlaces se representan como
        líneas (cada línea = 2 electrones).
      </Definicion>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        Los electrones se ubican de a uno por lado, y recién desde el 5º se aparean
      </p>
      <DiagramaLewis />

      <Mnemotecnia>
        <strong>Electrones de valencia por grupo</strong>:<br />
        • Grupo IA: 1 (H, Li, Na...)<br />
        • Grupo IIA: 2 (Be, Mg, Ca...)<br />
        • Grupo IIIA: 3 (B, Al...)<br />
        • Grupo IVA: 4 (C, Si...)<br />
        • Grupo VA: 5 (N, P...)<br />
        • Grupo VIA: 6 (O, S...)<br />
        • Grupo VIIA: 7 (F, Cl, Br, I...)<br />
        • Gases nobles: 8 (excepto He: 2).
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─── Transferencia de electrón Na → Cl, con botón para animar ───
function TransferenciaIonica() {
  const [transferido, setTransferido] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
          <AtomoLewis cx={140} cy={95} simbolo={transferido ? "Na⁺" : "Na"} valencia={transferido ? 0 : 1} color={LIENZO.accent} />
          <AtomoLewis cx={330} cy={95} simbolo={transferido ? "Cl⁻" : "Cl"} valencia={transferido ? 8 : 7} color={LIENZO.ok} />
          {!transferido && (
            <>
              <motion.path d="M 175 78 Q 235 45 300 78" fill="none" stroke={LIENZO.warn} strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#transf)" />
              <marker id="transf" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.warn} /></marker>
              <text x="235" y="38" textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.warn}>cede 1 e⁻</text>
            </>
          )}
          {transferido && (
            <>
              <text x="140" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.accent}>catión (+)</text>
              <text x="330" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.ok}>anión (−) · octeto ✓</text>
              <text x="235" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.fg}>se atraen → NaCl</text>
            </>
          )}
        </svg>
      </Pizarra>
      <button onClick={() => setTransferido((v) => !v)} style={{
        padding: "8px 16px", borderRadius: 999, border: `1px solid ${LIENZO.accent}`,
        background: "transparent", color: LIENZO.accent, fontWeight: 700, fontSize: 13, cursor: "pointer", alignSelf: "center",
      }}>{transferido ? "Volver al inicio" : "Transferir el electrón"}</button>
    </div>
  );
}

function EscIonico() {
  return (
    <EscenaRica>
      <Titulo>Enlace iónico · transferencia de electrones</Titulo>

      <Definicion termino="Enlace iónico">
        Se forma cuando un átomo TRANSFIERE uno o más electrones a otro. El
        átomo que pierde queda como catión (+), el que gana como anión (−).
        La atracción electrostática mantiene unidos a los iones.
      </Definicion>

      <TransferenciaIonica />

      <Resumen>
        <strong>Características</strong>:<br />
        • Ocurre entre METAL y NO METAL (mucha diferencia de
        electronegatividad: ΔEN &gt; 1.7).<br />
        • Forma redes cristalinas (NaCl, KBr).<br />
        • Sólidos a temperatura ambiente.<br />
        • Altos puntos de fusión.<br />
        • Conducen electricidad cuando están disueltos en agua o fundidos.<br />
        • Muchos son solubles en agua.
      </Resumen>

      <WorkedExample titulo="Formación de NaCl">
        Na (Z=11): 1s²2s²2p⁶3s¹. Tiene 1 e⁻ de valencia.<br />
        Cl (Z=17): 1s²2s²2p⁶3s²3p⁵. Tiene 7 e⁻ de valencia.<br /><br />

        Na cede su electrón a Cl:<br />
        Na → Na⁺ + e⁻ (queda con conf de Ne).<br />
        Cl + e⁻ → Cl⁻ (queda con conf de Ar).<br />
        Na⁺ + Cl⁻ → NaCl (atraídos por carga).
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Par compartido entre dos átomos (H₂ y H₂O) ───
function DiagramaCovalente() {
  return (
    <Pizarra alto={200}>
      <svg width="100%" height="100%" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
        {/* H2 */}
        <text x="110" y="35" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.accent}>H₂ · 1 par compartido</text>
        <text x="80" y="105" textAnchor="middle" fontSize="19" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">H</text>
        <text x="140" y="105" textAnchor="middle" fontSize="19" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">H</text>
        <circle cx="105" cy="94" r="3" fill={LIENZO.warn} />
        <circle cx="115" cy="94" r="3" fill={LIENZO.ok} />
        <ellipse cx="110" cy="94" rx="16" ry="11" fill="none" stroke={LIENZO.fgFaint} strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="110" y="140" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>H−H</text>

        {/* H2O */}
        <text x="340" y="35" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.accent}>H₂O · 2 pares compartidos</text>
        <text x="340" y="90" textAnchor="middle" fontSize="19" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">O</text>
        <text x="295" y="130" textAnchor="middle" fontSize="17" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">H</text>
        <text x="385" y="130" textAnchor="middle" fontSize="17" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">H</text>
        <line x1="328" y1="97" x2="303" y2="118" stroke={LIENZO.fg} strokeWidth="2" />
        <line x1="352" y1="97" x2="377" y2="118" stroke={LIENZO.fg} strokeWidth="2" />
        {/* pares libres del O */}
        <circle cx="332" cy="66" r="2.6" fill={LIENZO.bad} />
        <circle cx="348" cy="66" r="2.6" fill={LIENZO.bad} />
        <circle cx="362" cy="80" r="2.6" fill={LIENZO.bad} />
        <circle cx="362" cy="90" r="2.6" fill={LIENZO.bad} />
        <text x="340" y="165" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>pares libres en rojo</text>
      </svg>
    </Pizarra>
  );
}

function EscCovalente() {
  return (
    <EscenaRica>
      <Titulo>Enlace covalente · electrones compartidos</Titulo>

      <Definicion termino="Enlace covalente">
        Dos átomos COMPARTEN uno o más pares de electrones, formando un par
        enlazante. Típico entre NO METALES (poca diferencia de
        electronegatividad: ΔEN ≤ 1.7).
      </Definicion>

      <DiagramaCovalente />

      <Resumen>
        <strong>Características</strong>:<br />
        • Forma moléculas (H₂O, CO₂, NH₃).<br />
        • Puntos de fusión y ebullición más bajos que iónicos.<br />
        • No conducen electricidad (excepción: ácidos en agua).<br />
        • Pueden ser sólidos, líquidos o gases a temperatura ambiente.
      </Resumen>

      <Ejemplo titulo="Ejemplos">
        • H₂: H−H (1 par compartido).<br />
        • Cl₂: Cl−Cl (1 par compartido).<br />
        • H₂O: H−O−H (O comparte 1 par con cada H, total 2 pares).<br />
        • CH₄: C compartido con 4 H (4 enlaces simples).
      </Ejemplo>
    </EscenaRica>
  );
}

// ─── Simple, doble, triple: líneas reales entre átomos ───
function DiagramaTiposEnlace() {
  const tipos = [
    { izq: "H", der: "Cl", n: 1, label: "simple", sub: "H−Cl" },
    { izq: "O", der: "O", n: 2, label: "doble", sub: "O=O" },
    { izq: "N", der: "N", n: 3, label: "triple", sub: "N≡N" },
  ];
  return (
    <Pizarra alto={200}>
      <svg width="100%" height="100%" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
        {tipos.map((t, i) => {
          const cx = 90 + i * 150, cy = 90;
          const sep = 22;
          return (
            <g key={i}>
              <text x={cx - 38} y={cy + 6} textAnchor="middle" fontSize="19" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">{t.izq}</text>
              <text x={cx + 38} y={cy + 6} textAnchor="middle" fontSize="19" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">{t.der}</text>
              {Array.from({ length: t.n }, (_, k) => {
                const offset = (k - (t.n - 1) / 2) * 7;
                return <line key={k} x1={cx - 20} y1={cy + offset} x2={cx + 20} y2={cy + offset} stroke={LIENZO.accent} strokeWidth="2.5" />;
              })}
              <text x={cx} y={cy + 45} textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.accent}>{t.label}</text>
              <text x={cx} y={cy + 62} textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>{t.n} par{t.n > 1 ? "es" : ""} · {t.sub}</text>
            </g>
          );
        })}
        <text x="240" y="180" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>más pares = enlace más corto y más fuerte</text>
      </svg>
    </Pizarra>
  );
}

function EscTiposCov() {
  return (
    <EscenaRica>
      <Titulo>Tipos de enlace covalente</Titulo>

      <DiagramaTiposEnlace />

      <Resumen>
        Según cuántos pares de electrones se comparten:<br />
        • <strong>Simple</strong>: 1 par compartido (línea simple). Ej: H−Cl.<br />
        • <strong>Doble</strong>: 2 pares (línea doble). Ej: O=C=O.<br />
        • <strong>Triple</strong>: 3 pares (línea triple). Ej: N≡N.<br />
        • <strong>Coordinado (dativo)</strong>: ambos electrones los aporta UN
        solo átomo. Notación: flecha. Ej: H₃N→BF₃.
      </Resumen>

      <Mnemotecnia>
        <strong>A más pares compartidos:</strong><br />
        • Más corto el enlace.<br />
        • Más fuerte el enlace (más energía para romper).<br />
        • Más rígida la molécula.
      </Mnemotecnia>

      <WorkedExample titulo="Q4 PREU 2025 · identificar enlace iónico">
        ¿Cuál tiene enlace iónico, covalente simple, coordinado, doble?<br />
        Opciones: a) K₂SO₄, b) Cs·Cl·O₃, c) Na₂CO₃, d) Ag·N·O₃<br /><br />

        Iónico: entre metal-no metal. Todos tienen iones K⁺, Cs⁺, Na⁺ o Ag⁺.<br />
        Más típico iónico puro: <strong>Cs·Cl·O₃ (clorato de cesio)</strong>:
        Cs⁺ con ClO₃⁻. Dentro del anión hay covalente, pero Cs-O₃Cl es iónico.<br /><br />

        El de enlace covalente doble más claro: en C=O del carbonato Na₂CO₃.
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Geometría molecular: por qué H2O es polar y CO2/CCl4 no ───
function GeometriaPolaridad() {
  return (
    <Pizarra alto={230}>
      <svg width="100%" height="100%" viewBox="0 0 480 230" preserveAspectRatio="xMidYMid meet">
        {/* H2O angular → polar */}
        <text x="90" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.bad}>H₂O · angular → POLAR</text>
        <text x="90" y="80" textAnchor="middle" fontSize="17" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">O</text>
        <text x="52" y="126" textAnchor="middle" fontSize="15" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">H</text>
        <text x="128" y="126" textAnchor="middle" fontSize="15" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">H</text>
        <line x1="80" y1="88" x2="58" y2="114" stroke={LIENZO.fg} strokeWidth="2" />
        <line x1="100" y1="88" x2="122" y2="114" stroke={LIENZO.fg} strokeWidth="2" />
        {/* dipolos apuntando al O, no se cancelan → resultante hacia arriba */}
        <line x1="58" y1="114" x2="76" y2="92" stroke={LIENZO.warn} strokeWidth="2" markerEnd="url(#dip1)" />
        <line x1="122" y1="114" x2="104" y2="92" stroke={LIENZO.warn} strokeWidth="2" markerEnd="url(#dip2)" />
        <line x1="90" y1="98" x2="90" y2="55" stroke={LIENZO.bad} strokeWidth="3" markerEnd="url(#dipR)" />
        <text x="90" y="180" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>los dipolos NO se cancelan</text>

        {/* CO2 lineal → no polar */}
        <text x="330" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.ok}>CO₂ · lineal → NO POLAR</text>
        <text x="255" y="105" textAnchor="middle" fontSize="17" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">O</text>
        <text x="330" y="105" textAnchor="middle" fontSize="17" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">C</text>
        <text x="405" y="105" textAnchor="middle" fontSize="17" fontWeight="700" fill={LIENZO.fg} fontFamily="var(--font-crimson), serif">O</text>
        <line x1="270" y1="96" x2="315" y2="96" stroke={LIENZO.fg} strokeWidth="2" />
        <line x1="270" y1="103" x2="315" y2="103" stroke={LIENZO.fg} strokeWidth="2" />
        <line x1="345" y1="96" x2="390" y2="96" stroke={LIENZO.fg} strokeWidth="2" />
        <line x1="345" y1="103" x2="390" y2="103" stroke={LIENZO.fg} strokeWidth="2" />
        {/* dipolos opuestos, se cancelan */}
        <line x1="320" y1="130" x2="272" y2="130" stroke={LIENZO.warn} strokeWidth="2.5" markerEnd="url(#dipL)" />
        <line x1="340" y1="130" x2="388" y2="130" stroke={LIENZO.warn} strokeWidth="2.5" markerEnd="url(#dipRr)" />
        <text x="330" y="180" textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>iguales y opuestos: se CANCELAN</text>

        <defs>
          <marker id="dip1" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={LIENZO.warn} /></marker>
          <marker id="dip2" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={LIENZO.warn} /></marker>
          <marker id="dipR" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.bad} /></marker>
          <marker id="dipL" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={LIENZO.warn} /></marker>
          <marker id="dipRr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={LIENZO.warn} /></marker>
        </defs>
      </svg>
    </Pizarra>
  );
}

function EscPolaridad() {
  return (
    <EscenaRica>
      <Titulo>Polaridad de enlace y molécula</Titulo>

      <Definicion termino="Enlace polar">
        Cuando los dos átomos tienen DIFERENTE electronegatividad. El más
        electronegativo "tira" más de los electrones compartidos, formando
        polos δ⁺ y δ⁻.
      </Definicion>

      <Resumen>
        <strong>Clasificación según ΔEN</strong>:<br />
        • ΔEN = 0: covalente NO polar (entre átomos iguales: H₂, Cl₂).<br />
        • 0 &lt; ΔEN &lt; 0.4: covalente NO polar.<br />
        • 0.4 ≤ ΔEN ≤ 1.7: covalente POLAR.<br />
        • ΔEN &gt; 1.7: predominantemente IÓNICO.
      </Resumen>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        La GEOMETRÍA decide si los dipolos se cancelan o no
      </p>
      <GeometriaPolaridad />

      <Definicion termino="Molécula polar vs no polar">
        Una molécula es polar si los dipolos NO se cancelan por geometría:<br />
        • H₂O: polar (forma de "V", momentos no se cancelan).<br />
        • CO₂: NO polar (lineal, los 2 dipolos C=O se cancelan).<br />
        • CCl₄: NO polar (tetraédrica, 4 dipolos simétricos se cancelan).
      </Definicion>

      <PorQue>
        La polaridad afecta propiedades importantes: solubilidad ("lo similar
        disuelve lo similar"), punto de ebullición (las polares hierven más
        alto por fuerzas intermoleculares más fuertes), conductividad.
      </PorQue>
    </EscenaRica>
  );
}

// ─── Mar de electrones en una red de cationes metálicos ───
function MarDeElectrones() {
  const filas = 3, cols = 6;
  const cationes = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ x: 110 + c * 45, y: 55 + f * 45 });
      }
    }
    return arr;
  }, []);
  const electrones = useMemo(() => {
    const arr: { x: number; y: number; d: number }[] = [];
    for (let i = 0; i < 14; i++) {
      arr.push({
        x: 95 + ((i * 37) % 260),
        y: 42 + ((i * 53) % 110),
        d: (i % 5) * 0.3,
      });
    }
    return arr;
  }, []);
  return (
    <Pizarra alto={200}>
      <svg width="100%" height="100%" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
        {cationes.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r="13" fill={LIENZO.accent} opacity="0.85" />
            <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="white">+</text>
          </g>
        ))}
        {electrones.map((e, i) => (
          <motion.circle key={i} cx={e.x} cy={e.y} r="3.5" fill={LIENZO.warn}
            animate={{ cx: [e.x, e.x + 30, e.x - 20, e.x], cy: [e.y, e.y + 18, e.y - 12, e.y] }}
            transition={{ duration: 4 + e.d, repeat: Infinity, ease: "linear" }} />
        ))}
        <text x="240" y="185" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>cationes fijos (violeta) + electrones libres (ámbar) = conduce</text>
      </svg>
    </Pizarra>
  );
}

function EscOtros() {
  return (
    <EscenaRica>
      <Titulo>Enlace metálico y fuerzas intermoleculares</Titulo>

      <Definicion termino="Enlace metálico">
        Los átomos metálicos liberan sus electrones de valencia formando un
        "mar de electrones" que se mueve libremente. Los cationes quedan en
        una red, los electrones los unen.<br /><br />
        Esto explica las propiedades de los metales: conductores, dúctiles,
        maleables, brillantes.
      </Definicion>

      <MarDeElectrones />

      <Resumen>
        <strong>Fuerzas intermoleculares</strong> (atraen moléculas entre sí,
        más débiles que los enlaces):<br /><br />

        • <strong>London (dispersión)</strong>: las más débiles. Existen en
        TODAS las moléculas. Crecen con el tamaño molecular.<br />
        • <strong>Dipolo-dipolo</strong>: entre moléculas polares.<br />
        • <strong>Puentes de hidrógeno</strong>: las más fuertes. Cuando H está
        unido a F, O o N (FON). Por eso el agua tiene punto de ebullición tan
        alto.
      </Resumen>

      <Mnemotecnia>
        <strong>Por qué hierve más alto el agua que el sulfuro de hidrógeno</strong>:<br />
        H₂O y H₂S son parecidos en estructura. Pero H₂O tiene PUENTES DE
        HIDRÓGENO (porque H está unido a O), H₂S no. Por eso H₂O hierve a
        100°C y H₂S a −60°C.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscComparacion() {
  return (
    <EscenaRica>
      <Titulo>Comparación de tipos de enlace</Titulo>

      <Resumen>
        <div style={{ overflowX: "auto" }}>
          <table style={{ fontFamily: "var(--font-crimson), serif", margin: "0 auto", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th style={{ padding: "6px 10px" }}>Propiedad</th>
                <th style={{ padding: "6px 10px" }}>Iónico</th>
                <th style={{ padding: "6px 10px" }}>Covalente</th>
                <th style={{ padding: "6px 10px" }}>Metálico</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: "6px 10px" }}>Estado a 25°C</td><td>Sólido</td><td>Varios</td><td>Sólido</td></tr>
              <tr><td style={{ padding: "6px 10px" }}>Punto fusión</td><td>Alto</td><td>Bajo</td><td>Medio-alto</td></tr>
              <tr><td style={{ padding: "6px 10px" }}>Solubilidad agua</td><td>Sí (sales)</td><td>Variable</td><td>No</td></tr>
              <tr><td style={{ padding: "6px 10px" }}>Conductividad</td><td>En solución</td><td>No</td><td>Sí</td></tr>
              <tr><td style={{ padding: "6px 10px" }}>Maleabilidad</td><td>Frágil</td><td>Variable</td><td>Sí</td></tr>
            </tbody>
          </table>
        </div>
      </Resumen>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Tipo de enlace en NaCl:",
      o: ["iónico", "covalente", "metálico", "puente H"],
      c: 0,
      ex: "Metal (Na) + no metal (Cl) → iónico.",
    },
    {
      p: "Molécula con enlace triple:",
      o: ["N₂", "O₂", "H₂", "Cl₂"],
      c: 0,
      ex: "N≡N tiene enlace triple.",
    },
    {
      p: "Molécula polar:",
      o: ["H₂O", "CO₂", "CCl₄", "N₂"],
      c: 0,
      ex: "H₂O es polar por geometría angular. CO₂ y CCl₄ son simétricas.",
    },
    {
      p: "Fuerza intermolecular más fuerte:",
      o: ["puente H", "London", "dipolo-dipolo", "iónica"],
      c: 0,
      ex: "Puentes de H son las más fuertes (entre moléculas).",
    },
    {
      p: "Los metales conducen electricidad por:",
      o: ["mar de electrones", "iones libres", "puente H", "redes cristalinas"],
      c: 0,
      ex: "Electrones de valencia libres en el enlace metálico.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · todo enlace covalente es no polar">
        Falso. Solo es no polar si los dos átomos tienen MISMA EN (átomos
        iguales). Si hay diferencia, hay polaridad de enlace.
      </Misconception>

      <Misconception titulo="Error 2 · enlace polar = molécula polar">
        Falso. Una molécula con enlaces polares puede ser globalmente NO POLAR
        si los dipolos se cancelan por simetría (ej: CO₂, CCl₄).
      </Misconception>

      <Misconception titulo="Error 3 · puente de hidrógeno con cualquier H">
        Solo cuando H está unido directamente a F, O o N. Recuerda: F-O-N.
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
