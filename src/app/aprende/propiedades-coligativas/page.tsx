"use client";

import { useState, useMemo } from "react";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="QUI-10"
      tituloUnidad="Propiedades coligativas · Cambios por soluto"
      escenas={[
        { titulo: "¿Qué son las propiedades coligativas?", componente: EscIntro },
        { titulo: "Las 4 propiedades · panorama", componente: EscPanorama },
        { titulo: "Descenso de la presión de vapor", componente: EscPresionVapor },
        { titulo: "Aumento del punto de ebullición", componente: EscEbullicion },
        { titulo: "Descenso del punto de congelación", componente: EscCongelacion },
        { titulo: "Presión osmótica", componente: EscOsmosis },
        { titulo: "Simulador · 4 propiedades", componente: EscSimulador },
        { titulo: "Factor de van't Hoff (electrolitos)", componente: EscVantHoff },
        { titulo: "Problemas tipo examen", componente: EscExamen },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Propiedades coligativas · cambios por la cantidad</Titulo>

      <Hook>
        En invierno, las rutas de montaña en Potosí o La Paz se "salan" para
        evitar que el hielo se forme. ¿Por qué la sal derrite el hielo? Por una
        propiedad coligativa: el descenso del punto de congelación.
      </Hook>

      <Definicion termino="Propiedades coligativas">
        Propiedades de una solución que dependen del NÚMERO de partículas de
        soluto disueltas (NO de su naturaleza química). Solo de la cantidad.
      </Definicion>

      <Parrafo>
        Si en 1 kg de agua disolvés 1 mol de glucosa, ó 1 mol de urea, ó 1 mol
        de fructosa, las 4 propiedades coligativas cambian IGUAL. Lo único que
        importa es que sea 1 mol (de partículas no disociadas).
      </Parrafo>

      <Mnemotecnia>
        <strong>"Coligativas = colectivas"</strong>. La identidad del soluto
        es irrelevante; solo cuenta cuántas partículas pateás al solvente.
      </Mnemotecnia>

      <Conexion>
        Necesitás dominar: molalidad (Unidad 9), molaridad (Unidad 9), y T en
        Kelvin (Unidad 8).
      </Conexion>
    </EscenaRica>
  );
}

function EscPanorama() {
  return (
    <EscenaRica>
      <Titulo>Las 4 propiedades coligativas</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Qué le pasa al solvente al agregar soluto no volátil?
          </text>
          {[
            { x: 80, y: 60, c: "#3b82f6", t: "Presión de vapor", efecto: "↓ baja", form: "ΔP = x_st · P°" },
            { x: 270, y: 60, c: "#ef4444", t: "Punto ebullición", efecto: "↑ sube", form: "ΔTb = Kb · m" },
            { x: 460, y: 60, c: "#06b6d4", t: "Punto congelación", efecto: "↓ baja", form: "ΔTc = Kc · m" },
            { x: 650, y: 60, c: "#a78bfa", t: "Presión osmótica", efecto: "↑ aparece", form: "π = M·R·T" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x - 70}, ${p.y})`}>
              <rect width={140} height={170} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={10} />
              <text x={70} y={28} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={70} y={65} textAnchor="middle" fill={p.c} fontSize={26} fontWeight={700}>{p.efecto.split(" ")[0]}</text>
              <text x={70} y={88} textAnchor="middle" fill={LIENZO.fg} fontSize={12}>{p.efecto.split(" ")[1]}</text>
              <text x={70} y={130} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}
                fontFamily="var(--font-crimson), serif">{p.form}</text>
            </g>
          ))}
          <text x={360} y={250} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={600}>
            Todas dependen de la concentración del soluto, no de su naturaleza
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Vapor baja, ebullición sube, congelación baja, osmótica aparece."</strong>
        El soluto "interfiere" con el solvente: lo retiene más, hay que calentar
        más para evaporar, enfriar más para congelar.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPresionVapor() {
  return (
    <EscenaRica>
      <Titulo>Descenso de la presión de vapor · Ley de Raoult</Titulo>

      <Hook>
        El agua salada se evapora más lento que el agua pura. Por eso el agua
        del mar no se seca tan rápido como un charco. La sal "ocupa" la
        superficie y bloquea a las moléculas de agua que quieren escapar.
      </Hook>

      <Definicion termino="Ley de Raoult">
        La presión de vapor del solvente en la solución es proporcional a su
        fracción molar:<br /><br />
        <strong>P_sol = x_sv · P°_sv</strong><br /><br />
        Donde P° es la presión de vapor del solvente puro.
      </Definicion>

      <Definicion termino="Descenso de presión de vapor (ΔP)">
        <strong>ΔP = x_st · P°_sv</strong><br />
        Es la disminución de la presión de vapor causada por el soluto.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Comparación: solvente puro vs solución
          </text>
          <g transform="translate(120, 60)">
            <rect width={200} height={110} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.5} rx={10} />
            <text x={100} y={25} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>Agua pura</text>
            <text x={100} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>x_sv = 1</text>
            <text x={100} y={75} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>P° = 23.8 mmHg (25°C)</text>
            <text x={100} y={97} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>P = 23.8 mmHg</text>
          </g>
          <g transform="translate(400, 60)">
            <rect width={200} height={110} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={100} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>Agua + glucosa</text>
            <text x={100} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>x_sv = 0.95</text>
            <text x={100} y={75} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>P° = 23.8 mmHg</text>
            <text x={100} y={97} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>P = 22.6 mmHg ↓</text>
          </g>
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿P de vapor de una solución con x_sv=0.92 a 25°C? (P°(H₂O) = 23.8 mmHg)">
        P_sol = x_sv · P°_sv<br />
        P_sol = 0.92 × 23.8 = <strong>21.9 mmHg</strong><br />
        ΔP = 23.8 − 21.9 = 1.9 mmHg (descenso)
      </WorkedExample>
    </EscenaRica>
  );
}

function EscEbullicion() {
  return (
    <EscenaRica>
      <Titulo>Aumento del punto de ebullición · Ebulloscopía</Titulo>

      <Hook>
        ¿Por qué en la cocina se agrega sal al agua de la pasta? Una creencia
        popular: "para que hierva más rápido". En realidad, hierve a una
        temperatura un poco MÁS ALTA (no más rápido), porque la sal eleva el
        punto de ebullición.
      </Hook>

      <Definicion termino="Aumento ebulloscópico (ΔTb)">
        <strong>ΔTb = Kb · m · i</strong><br /><br />
        donde:<br />
        Kb = constante ebulloscópica del solvente (agua: 0.52 °C·kg/mol)<br />
        m = molalidad (mol/kg_sv)<br />
        i = factor van't Hoff (próxima escena)
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            T de ebullición: agua pura vs con soluto
          </text>
          <line x1={80} x2={680} y1={120} y2={120} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={250} y1={130} x2={250} y2={50} stroke={LIENZO.accent} strokeWidth={2} strokeDasharray="4 3" />
          <text x={250} y={45} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={600}>100 °C (pura)</text>
          <line x1={450} y1={130} x2={450} y2={50} stroke={LIENZO.bad} strokeWidth={2} strokeDasharray="4 3" />
          <text x={450} y={45} textAnchor="middle" fill={LIENZO.bad} fontSize={12} fontWeight={600}>100.52 °C (1 m NaCl·i)</text>
          {/* flecha ΔTb */}
          <line x1={260} x2={440} y1={80} y2={80} stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#arrDelta)" />
          <text x={350} y={75} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>ΔTb</text>
          <defs>
            <marker id="arrDelta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.warn} />
            </marker>
          </defs>
          <text x={360} y={155} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>
            T ebullición de la solución = T° + ΔTb
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿A qué T hierve 100 g de agua con 30 g de glucosa (M=180)?">
        n = 30/180 = 0.167 mol<br />
        m = 0.167 / 0.1 = 1.67 m<br />
        ΔTb = Kb · m = 0.52 × 1.67 = 0.87 °C<br />
        T_eb = 100 + 0.87 = <strong>100.87 °C</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>"Sube poco, pero sube."</strong> 1 m de soluto solo sube 0.52 °C
        el agua. Hace falta MUCHO soluto para ver un efecto grande.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCongelacion() {
  return (
    <EscenaRica>
      <Titulo>Descenso del punto de congelación · Crioscopía</Titulo>

      <Hook>
        El líquido anticongelante (etilenglicol) de tu auto evita que el agua
        del radiador se congele en invierno. Lo mismo: la sal en las rutas
        nevadas. Bajan el punto de congelación del agua.
      </Hook>

      <Definicion termino="Descenso crioscópico (ΔTc)">
        <strong>ΔTc = Kc · m · i</strong><br /><br />
        donde:<br />
        Kc = constante crioscópica del solvente (agua: 1.86 °C·kg/mol)<br />
        m = molalidad<br />
        i = factor van't Hoff
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            T de congelación: agua pura vs salada
          </text>
          <line x1={80} x2={680} y1={120} y2={120} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={450} y1={130} x2={450} y2={50} stroke={LIENZO.accent} strokeWidth={2} strokeDasharray="4 3" />
          <text x={450} y={45} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={600}>0 °C (pura)</text>
          <line x1={250} y1={130} x2={250} y2={50} stroke="#06b6d4" strokeWidth={2} strokeDasharray="4 3" />
          <text x={250} y={45} textAnchor="middle" fill="#06b6d4" fontSize={12} fontWeight={600}>−3.72 °C (1 m NaCl·i)</text>
          <line x1={260} x2={440} y1={80} y2={80} stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#arrDelta2)" />
          <text x={350} y={75} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>ΔTc</text>
          <defs>
            <marker id="arrDelta2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.warn} />
            </marker>
          </defs>
          <text x={360} y={155} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>
            T congelación de la solución = T° − ΔTc
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿A qué T congela 500 g de agua con 90 g de glucosa (M=180)?">
        n = 90/180 = 0.5 mol<br />
        m = 0.5/0.5 = 1.0 m<br />
        ΔTc = Kc · m = 1.86 × 1.0 = 1.86 °C<br />
        T_cong = 0 − 1.86 = <strong>−1.86 °C</strong>
      </WorkedExample>

      <Cuidado>
        En ΔTc <strong>se RESTA</strong> de 0°C (baja). En ΔTb <strong>se SUMA</strong>
        a 100°C (sube). Confusión clásica en exámenes.
      </Cuidado>
    </EscenaRica>
  );
}

function EscOsmosis() {
  return (
    <EscenaRica>
      <Titulo>Presión osmótica · Ósmosis</Titulo>

      <Hook>
        ¿Por qué no podés beber agua de mar en alta mar? Porque el agua de tus
        células saldría por ósmosis hacia el mar más salado y morirías
        deshidratado. La presión osmótica explica este fenómeno vital.
      </Hook>

      <Definicion termino="Ósmosis">
        Paso espontáneo de solvente desde una solución diluida hacia una más
        concentrada, a través de una membrana semipermeable (que solo deja
        pasar el solvente).
      </Definicion>

      <Definicion termino="Presión osmótica (π)">
        Presión que hay que aplicar para EVITAR la ósmosis.<br /><br />
        <strong>π = M · R · T · i</strong><br /><br />
        Mismo R y mismas unidades que gases ideales. M = molaridad.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            El solvente pasa de menos a más concentrado
          </text>
          {/* recipiente */}
          <rect x={140} y={60} width={440} height={130} fill="none" stroke={LIENZO.fg} strokeWidth={2} />
          <line x1={360} y1={60} x2={360} y2={190} stroke={LIENZO.bad} strokeWidth={2} strokeDasharray="6 4" />
          <text x={360} y={55} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={600}>membrana semipermeable</text>
          {/* lado diluido */}
          <rect x={140} y={140} width={220} height={50} fill={LIENZO.accent} opacity={0.15} />
          <text x={250} y={170} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>diluido</text>
          {/* lado concentrado */}
          <rect x={360} y={100} width={220} height={90} fill={LIENZO.bad} opacity={0.25} />
          <text x={470} y={155} textAnchor="middle" fill={LIENZO.bad} fontSize={12} fontWeight={700}>concentrado</text>
          {/* flecha */}
          <line x1={320} x2={400} y1={120} y2={120} stroke={LIENZO.ok} strokeWidth={3} markerEnd="url(#osmArr)" />
          <text x={360} y={110} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={600}>H₂O</text>
          <defs>
            <marker id="osmArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿Presión osmótica de glucosa 0.1 M a 27°C?">
        T = 300 K, R = 0.082<br />
        π = M · R · T = 0.1 × 0.082 × 300<br />
        π = <strong>2.46 atm</strong>
      </WorkedExample>

      <Cuidado>
        Una solución 0.1 M de NaCl tiene aproximadamente <strong>el DOBLE</strong>
        de presión osmótica que una 0.1 M de glucosa, porque NaCl se disocia en
        2 iones (Na⁺ + Cl⁻). De ahí el factor i.
      </Cuidado>
    </EscenaRica>
  );
}

function EscSimulador() {
  const [m, setM] = useState(1);
  const [i, setI] = useState(1);
  const Kb = 0.52;
  const Kc = 1.86;
  const T = 300; // 27°C
  const R = 0.082;

  const calc = useMemo(() => {
    const dTb = Kb * m * i;
    const dTc = Kc * m * i;
    // π = M·R·T·i — aproximación M ≈ m para diluidas en agua
    const pi = m * R * T * i;
    return {
      Teb: (100 + dTb).toFixed(2),
      Tcong: (0 - dTc).toFixed(2),
      dTb: dTb.toFixed(2),
      dTc: dTc.toFixed(2),
      pi: pi.toFixed(2),
    };
  }, [m, i]);

  return (
    <EscenaRica>
      <Titulo>Simulador · efectos coligativos en agua</Titulo>

      <Parrafo>
        Ajustá la molalidad y el factor i (1 para no electrolito; 2 para NaCl;
        3 para CaCl₂; 4 para AlCl₃). Mirá cómo cambian ΔTb, ΔTc y π.
      </Parrafo>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, color: "#e2e8f0", maxWidth: 620, width: "100%" }}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4, color: "#10b981" }}>
            Molalidad m = {m.toFixed(1)} mol/kg
          </label>
          <input type="range" min={0.1} max={5} step={0.1} value={m}
            onChange={(e) => setM(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#10b981" }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4, color: "#a78bfa" }}>
            Factor van&apos;t Hoff i = {i}
          </label>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { v: 1, l: "glucosa (i=1)" },
              { v: 2, l: "NaCl (i=2)" },
              { v: 3, l: "CaCl₂ (i=3)" },
              { v: 4, l: "AlCl₃ (i=4)" },
            ].map((b) => (
              <button key={b.v} onClick={() => setI(b.v)}
                style={{
                  flex: 1, padding: "6px 4px",
                  background: i === b.v ? "#a78bfa" : "#1e293b",
                  color: i === b.v ? "#0f172a" : "#cbd5e1",
                  border: "1px solid #475569", borderRadius: 6,
                  cursor: "pointer", fontWeight: 600, fontSize: 11,
                }}>{b.l}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <ResultCaja t="T ebullición" v={`${calc.Teb} °C`} sub={`ΔTb=${calc.dTb}`} color="#ef4444" />
          <ResultCaja t="T congelación" v={`${calc.Tcong} °C`} sub={`ΔTc=${calc.dTc}`} color="#06b6d4" />
          <ResultCaja t="π osmótica (27°C)" v={`${calc.pi} atm`} sub="aprox M≈m" color="#a78bfa" />
        </div>
      </div>

      <Cuidado>
        Para NaCl, i=2 (Na⁺ + Cl⁻). Para CaCl₂, i=3 (Ca²⁺ + 2Cl⁻). Para
        compuestos NO iónicos (azúcares, urea, glicerina), i=1.
      </Cuidado>
    </EscenaRica>
  );
}

function ResultCaja({ t, v, sub, color }: { t: string; v: string; sub: string; color: string }) {
  return (
    <div style={{ background: "#1e293b", padding: 10, borderRadius: 8, border: `2px solid ${color}`, textAlign: "center" }}>
      <div style={{ fontSize: 11, opacity: 0.7 }}>{t}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color }}>{v}</div>
      <div style={{ fontSize: 10, opacity: 0.6 }}>{sub}</div>
    </div>
  );
}

function EscVantHoff() {
  return (
    <EscenaRica>
      <Titulo>Factor de van&apos;t Hoff (i) · electrolitos</Titulo>

      <Definicion termino="Factor i">
        Número de partículas (iones o moléculas) en las que se disocia 1
        molécula de soluto.<br /><br />
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>No electrolitos</strong> (glucosa, urea, sacarosa): i = 1</li>
          <li><strong>Electrolitos 1:1</strong> (NaCl, KBr, HCl): i = 2</li>
          <li><strong>Electrolitos 1:2 / 2:1</strong> (CaCl₂, K₂SO₄, Na₂CO₃): i = 3</li>
          <li><strong>Electrolitos 1:3 / 3:1</strong> (AlCl₃, FeCl₃, Na₃PO₄): i = 4</li>
        </ul>
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Cuántas partículas produce 1 fórmula?
          </text>
          {[
            { x: 100, c: LIENZO.fgDim, i: 1, f: "C₆H₁₂O₆", e: "→ C₆H₁₂O₆" },
            { x: 280, c: LIENZO.ok, i: 2, f: "NaCl", e: "→ Na⁺ + Cl⁻" },
            { x: 460, c: LIENZO.warn, i: 3, f: "CaCl₂", e: "→ Ca²⁺ + 2 Cl⁻" },
            { x: 640, c: LIENZO.bad, i: 4, f: "AlCl₃", e: "→ Al³⁺ + 3 Cl⁻" },
          ].map((p, j) => (
            <g key={j} transform={`translate(${p.x - 70}, 55)`}>
              <rect width={140} height={90} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={10} />
              <text x={70} y={22} textAnchor="middle" fill={p.c} fontSize={14} fontWeight={700}>i = {p.i}</text>
              <text x={70} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={12}
                fontFamily="var(--font-crimson), serif">{p.f}</text>
              <text x={70} y={70} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>{p.e}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        La fórmula completa de las propiedades coligativas SIEMPRE incluye i:
        <br />ΔTb = Kb · m · <strong>i</strong> · &nbsp;ΔTc = Kc · m · <strong>i</strong>
        &nbsp; · &nbsp;π = M · R · T · <strong>i</strong>
        <br />Para no electrolitos, i=1 y "desaparece".
      </Cuidado>

      <Mnemotecnia>
        <strong>"Contá los iones que da una fórmula."</strong> NaCl → Na⁺ + Cl⁻
        = 2 iones, i=2. K₂SO₄ → 2K⁺ + SO₄²⁻ = 3 iones, i=3.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscExamen() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen FCyT UMSS</Titulo>

      <WorkedExample titulo="EXAMEN: 11.7 g de NaCl en 500 g de agua. ¿T ebullición? (NaCl=58.5, Kb=0.52)">
        n = 11.7/58.5 = 0.2 mol; m = 0.2/0.5 = 0.4 m<br />
        i(NaCl) = 2<br />
        ΔTb = 0.52 × 0.4 × 2 = 0.416 °C<br />
        T_eb = 100 + 0.416 = <strong>100.42 °C</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: 30 g de etilenglicol (M=62) en 200 g de agua. ¿T congelación? (Kc=1.86)">
        n = 30/62 = 0.484 mol; m = 0.484/0.2 = 2.42 m<br />
        i (etilenglicol no electrolito) = 1<br />
        ΔTc = 1.86 × 2.42 × 1 = 4.50 °C<br />
        T_cong = 0 − 4.50 = <strong>−4.50 °C</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: π osmótica de CaCl₂ 0.05 M a 27 °C (i=3)">
        T = 300 K<br />
        π = M · R · T · i = 0.05 × 0.082 × 300 × 3<br />
        π = <strong>3.69 atm</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: P_vapor de solución con 36 g de glucosa (M=180) + 162 g de H₂O (M=18). P°(H₂O,25°C)=23.8 mmHg">
        n_st = 36/180 = 0.2; n_sv = 162/18 = 9<br />
        x_sv = 9/(9+0.2) = 0.978<br />
        P_sol = 0.978 × 23.8 = <strong>23.3 mmHg</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · Olvidar el factor i en electrolitos">
        <strong>Pensar:</strong> que NaCl o CaCl₂ aportan 1 mol de partículas.<br />
        <strong>Realidad:</strong> NaCl aporta 2 (Na⁺ + Cl⁻), CaCl₂ aporta 3.
        El factor i multiplica todas las propiedades coligativas.
      </Misconception>

      <Misconception titulo="Error 2 · Sumar ΔTc al T° de congelación">
        <strong>Pensar:</strong> T_cong = 0 + ΔTc.<br />
        <strong>Realidad:</strong> T_cong = 0 − ΔTc (BAJA). En cambio, T_eb sube:
        T_eb = 100 + ΔTb.
      </Misconception>

      <Misconception titulo="Error 3 · Confundir molaridad con molalidad">
        <strong>Pensar:</strong> que se puede usar M en ΔTb o ΔTc.<br />
        <strong>Realidad:</strong> ΔTb y ΔTc usan MOLALIDAD (m). La presión
        osmótica usa MOLARIDAD (M).
      </Misconception>

      <Misconception titulo="Error 4 · Usar T en °C en presión osmótica">
        <strong>Pensar:</strong> que T = 25 °C va directo en π = MRT.<br />
        <strong>Realidad:</strong> SIEMPRE en Kelvin. T = 25 + 273 = 298 K.
      </Misconception>

      <Resumen>
        Las 4 propiedades dependen del NÚMERO de partículas (m × i). El soluto:
        baja la P de vapor (Raoult), sube T eb (ΔTb = Kb·m·i), baja T cong
        (ΔTc = Kc·m·i), genera presión osmótica (π = MRT·i). Electrolitos: i &gt; 1.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es el factor i para Al₂(SO₄)₃?"
        opciones={["2", "3", "4", "5"]}
        correctaIdx={3}
        explicacion="Al₂(SO₄)₃ → 2 Al³⁺ + 3 SO₄²⁻ = 5 iones, i = 5."
      />

      <AutoCheck
        pregunta="¿Cuál baja más el punto de congelación: 1 m de glucosa o 1 m de NaCl?"
        opciones={["Glucosa", "NaCl", "Iguales", "Depende del solvente"]}
        correctaIdx={1}
        explicacion="NaCl tiene i=2, glucosa i=1. NaCl produce el doble de partículas y baja el doble la T."
      />

      <AutoCheck
        pregunta="60 g de urea (M=60) en 1 kg de agua. ¿ΔTb? (Kb=0.52)"
        opciones={["0.52 °C", "1.04 °C", "0.26 °C", "1 °C"]}
        correctaIdx={0}
        explicacion="m = 1 mol/kg; urea es no electrolito (i=1). ΔTb = 0.52 × 1 × 1 = 0.52 °C."
      />

      <AutoCheck
        pregunta="¿Qué propiedades usan molalidad y cuáles molaridad?"
        opciones={[
          "Todas usan molalidad",
          "ΔTb y ΔTc usan m; π usa M",
          "Todas usan molaridad",
          "ΔTb usa M; ΔTc usa m",
        ]}
        correctaIdx={1}
        explicacion="ΔTb y ΔTc dependen de la masa de solvente (molalidad). π depende del volumen (molaridad)."
      />

      <AutoCheck
        pregunta="Solución 0.2 M de glucosa a 27 °C. ¿π?"
        opciones={["4.92 atm", "2.46 atm", "0.49 atm", "0.082 atm"]}
        correctaIdx={0}
        explicacion="π = 0.2 × 0.082 × 300 × 1 = 4.92 atm."
      />
    </EscenaRica>
  );
}
