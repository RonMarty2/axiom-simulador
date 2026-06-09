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
      unidad="QUI-07"
      tituloUnidad="Estequiometría · Cálculos con reactivos y productos"
      escenas={[
        { titulo: "¿Qué es la estequiometría?", componente: EscIntro },
        { titulo: "Pasos universales · el método infalible", componente: EscMetodo },
        { titulo: "Simulador · cálculo estequiométrico", componente: EscSimulador },
        { titulo: "Reactivo limitante y en exceso", componente: EscLimitante },
        { titulo: "Pureza de reactivos", componente: EscPureza },
        { titulo: "Rendimiento de reacción", componente: EscRendimiento },
        { titulo: "Estequiometría con gases", componente: EscGases },
        { titulo: "Problemas tipo examen", componente: EscExamen },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Estequiometría · receta de cocina química</Titulo>

      <Hook>
        Si una pizza necesita 2 huevos, 3 tazas de harina y 1 sobre de levadura,
        y vos tenés 8 huevos, 9 tazas de harina y 2 sobres de levadura,
        ¿cuántas pizzas podés hacer? La estequiometría es exactamente eso pero
        con átomos.
      </Hook>

      <Definicion termino="Estequiometría">
        Cálculos cuantitativos entre las sustancias que participan en una
        reacción química, basados en los coeficientes de la ecuación balanceada.
      </Definicion>

      <Parrafo>
        Permite responder preguntas como: ¿cuántos gramos de producto obtengo
        si parto de X gramos de reactivo? ¿Cuánto reactivo necesito para
        producir Y moles de producto?
      </Parrafo>

      <Mnemotecnia>
        "La ecuación balanceada manda." Los coeficientes son la
        <strong> proporción molar</strong>, no másica. Siempre trabajá en moles
        en el paso intermedio.
      </Mnemotecnia>

      <Conexion>
        Necesitás dominar: ecuación balanceada (Unidad 6), conversión
        masa-moles (Unidad 5), y masa molar.
      </Conexion>
    </EscenaRica>
  );
}

function EscMetodo() {
  return (
    <EscenaRica>
      <Titulo>El método universal · 4 pasos</Titulo>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x={360} y={30} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}>
            MÉTODO MEEMM
          </text>
          {[
            { n: "1", t1: "Balancear", t2: "ecuación", c: "#3b82f6" },
            { n: "2", t1: "Convertir DATO", t2: "a moles", c: "#10b981" },
            { n: "3", t1: "Relación molar", t2: "(coeficientes)", c: "#f59e0b" },
            { n: "4", t1: "Convertir moles", t2: "a UNIDAD pedida", c: "#ef4444" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${100 + i * 170}, 100)`}>
              <circle r={30} fill={p.c} opacity={0.2} stroke={p.c} strokeWidth={2} />
              <text textAnchor="middle" dy={6} fill={p.c} fontSize={22} fontWeight={700}>{p.n}</text>
              <text textAnchor="middle" y={55} fill={LIENZO.fg} fontSize={11} fontWeight={600}>{p.t1}</text>
              <text textAnchor="middle" y={70} fill={LIENZO.fg} fontSize={11}>{p.t2}</text>
              {i < 3 && (
                <path d="M 40 0 L 120 0" stroke={LIENZO.fgDim} strokeWidth={1.5} markerEnd="url(#arrEst)" opacity={0.6} />
              )}
            </g>
          ))}
          <defs>
            <marker id="arrEst" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>MEEMM:</strong> <em>M</em>oles del dato → <em>E</em>cuación
        balanceada → <em>E</em>scala con coeficientes → <em>M</em>oles del
        pedido → <em>M</em>asa (o volumen, partículas).
      </Mnemotecnia>

      <WorkedExample titulo="¿Cuántos g de H₂O se forman al quemar 16 g de CH₄? (C=12, H=1, O=16)">
        <strong>1. Balancear:</strong> CH₄ + 2O₂ → CO₂ + 2H₂O ✓<br />
        <strong>2. Dato a moles:</strong> n(CH₄) = 16 g / 16 g·mol⁻¹ = 1 mol<br />
        <strong>3. Relación molar:</strong> 1 mol CH₄ × (2 mol H₂O / 1 mol CH₄) = 2 mol H₂O<br />
        <strong>4. Moles a gramos:</strong> 2 mol × 18 g·mol⁻¹ = <strong>36 g H₂O</strong>
      </WorkedExample>

      <Cuidado>
        Si NO balanceás primero, todo el cálculo está mal. La proporción molar
        proviene EXCLUSIVAMENTE de los coeficientes balanceados.
      </Cuidado>
    </EscenaRica>
  );
}

function EscSimulador() {
  const [gCH4, setGCH4] = useState(20);
  const M_CH4 = 16, M_O2 = 32, M_CO2 = 44, M_H2O = 18;
  const calc = useMemo(() => {
    const n = gCH4 / M_CH4;
    const nO2 = n * 2;
    const nCO2 = n;
    const nH2O = n * 2;
    return {
      n: n.toFixed(3),
      gO2: (nO2 * M_O2).toFixed(2),
      gCO2: (nCO2 * M_CO2).toFixed(2),
      gH2O: (nH2O * M_H2O).toFixed(2),
      molecCO2: (nCO2 * 6.022e23).toExponential(2),
    };
  }, [gCH4]);

  return (
    <EscenaRica>
      <Titulo>Simulador · combustión de metano</Titulo>

      <Parrafo>
        Ajustá los gramos de CH₄ y observá cómo escalan automáticamente todos
        los valores con la relación 1 : 2 : 1 : 2.
      </Parrafo>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, color: "#e2e8f0", maxWidth: 620, width: "100%" }}>
        <div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          CH₄ + 2 O₂ → CO₂ + 2 H₂O
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Gramos de CH₄: <span style={{ color: "#60a5fa" }}>{gCH4} g</span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={gCH4}
            onChange={(e) => setGCH4(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Caja label="moles CH₄ (dato)" valor={calc.n} unidad="mol" color="#3b82f6" />
          <Caja label="masa O₂ requerida" valor={calc.gO2} unidad="g" color="#f59e0b" />
          <Caja label="masa CO₂ formada" valor={calc.gCO2} unidad="g" color="#10b981" />
          <Caja label="masa H₂O formada" valor={calc.gH2O} unidad="g" color="#06b6d4" />
        </div>

        <div style={{ marginTop: 12, padding: 10, background: "#1e293b", borderRadius: 8, textAlign: "center" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Moléculas de CO₂ producidas</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#a78bfa" }}>{calc.molecCO2}</div>
        </div>
      </div>

      <Cuidado>
        Verificá la <strong>ley de conservación de masa</strong>: masa CH₄ +
        masa O₂ debe igualar masa CO₂ + masa H₂O. Probá distintos valores y
        confirmá.
      </Cuidado>
    </EscenaRica>
  );
}

function Caja({ label, valor, unidad, color }: { label: string; valor: string; unidad: string; color: string }) {
  return (
    <div style={{ background: "#1e293b", padding: 10, borderRadius: 8, border: `2px solid ${color}` }}>
      <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color }}>{valor} <span style={{ fontSize: 12 }}>{unidad}</span></div>
    </div>
  );
}

function EscLimitante() {
  return (
    <EscenaRica>
      <Titulo>Reactivo limitante · el cuello de botella</Titulo>

      <Hook>
        Volvamos a la pizza: si tenés 10 huevos pero solo 1 sobre de levadura,
        la levadura es el "limitante". No importa cuántos huevos te sobren, la
        levadura define cuántas pizzas hacés.
      </Hook>

      <Definicion termino="Reactivo limitante">
        El reactivo que se consume PRIMERO, deteniendo la reacción. Determina
        la cantidad máxima de producto que se puede formar.
      </Definicion>

      <Definicion termino="Reactivo en exceso">
        El reactivo que sobra cuando el limitante se agotó.
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Reacción: A + 2B → C
          </text>
          <text x={360} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={12}>
            Disponemos: 3 mol A y 4 mol B
          </text>

          <g transform="translate(80, 90)">
            <text fill={LIENZO.fg} fontSize={12} fontWeight={600}>Si A fuera limitante:</text>
            <text y={20} fill={LIENZO.accent} fontSize={12}>3 mol A × 2/1 = 6 mol B necesarios</text>
            <text y={40} fill={LIENZO.bad} fontSize={12}>Solo tengo 4 mol B → IMPOSIBLE</text>
          </g>

          <g transform="translate(420, 90)">
            <text fill={LIENZO.fg} fontSize={12} fontWeight={600}>Si B fuera limitante:</text>
            <text y={20} fill={LIENZO.accent} fontSize={12}>4 mol B × 1/2 = 2 mol A necesarios</text>
            <text y={40} fill={LIENZO.ok} fontSize={12}>Tengo 3 mol A → POSIBLE ✓</text>
          </g>

          <text x={360} y={195} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            B es el limitante. Se forman 2 mol C. Sobra 1 mol A.
          </text>
        </svg>
      </Pizarra>

      <Paso n={1}>Convertí los datos de cada reactivo a moles.</Paso>
      <Paso n={2}>Dividí cada n entre su coeficiente. El menor cociente = limitante.</Paso>
      <Paso n={3}>Usá el limitante para calcular productos. El exceso se calcula como diferencia.</Paso>

      <WorkedExample titulo="14 g de N₂ + 6 g de H₂ → NH₃. ¿Limitante? ¿g NH₃? (N=14, H=1)">
        <strong>Balanceo:</strong> N₂ + 3H₂ → 2NH₃<br />
        <strong>Moles disponibles:</strong> n(N₂) = 14/28 = 0.5 mol; n(H₂) = 6/2 = 3 mol<br />
        <strong>Cociente/coeficiente:</strong> N₂: 0.5/1 = 0.50; H₂: 3/3 = 1.0 → <strong>N₂ es LIMITANTE</strong><br />
        <strong>Producto:</strong> 0.5 mol N₂ × (2 mol NH₃ / 1) = 1 mol NH₃<br />
        <strong>Masa:</strong> 1 mol × 17 g/mol = <strong>17 g NH₃</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>Truco rápido:</strong> "El que tiene el cociente MÁS CHICO al
        dividir por su coeficiente, es el LIMITANTE."
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPureza() {
  return (
    <EscenaRica>
      <Titulo>Pureza de reactivos</Titulo>

      <Parrafo>
        Las muestras reales NO son 100% puras. Una piedra caliza puede ser 80%
        CaCO₃ y 20% impurezas (arena, otros minerales). Solo la parte pura
        reacciona.
      </Parrafo>

      <Definicion termino="Pureza (%)">
        Fracción de la muestra que es realmente el compuesto activo. <br />
        masa pura = masa total × (% pureza / 100)
      </Definicion>

      <WorkedExample titulo="250 g de caliza (80% CaCO₃) + HCl. ¿L de CO₂ en CN? (Ca=40, C=12, O=16)">
        <strong>Reacción:</strong> CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂<br />
        <strong>Masa pura:</strong> 250 g × 0.80 = 200 g CaCO₃<br />
        <strong>Moles CaCO₃:</strong> 200 g / 100 g·mol⁻¹ = 2 mol<br />
        <strong>Moles CO₂:</strong> 2 mol × (1/1) = 2 mol CO₂<br />
        <strong>Volumen CN:</strong> 2 mol × 22.4 L/mol = <strong>44.8 L</strong>
      </WorkedExample>

      <Cuidado>
        Nunca uses la masa total en el cálculo de moles. Primero descontá las
        impurezas. Si te dan "muestra impura del 75%", esa muestra solo tiene
        75% del compuesto que reacciona.
      </Cuidado>
    </EscenaRica>
  );
}

function EscRendimiento() {
  return (
    <EscenaRica>
      <Titulo>Rendimiento de reacción</Titulo>

      <Parrafo>
        En la práctica, casi nunca se obtiene el 100% del producto teórico.
        Pérdidas en el laboratorio, reacciones secundarias o reacciones que no
        llegan al equilibrio total reducen el rendimiento.
      </Parrafo>

      <Definicion termino="Rendimiento (%)">
        % R = (masa real obtenida / masa teórica calculada) × 100
      </Definicion>

      <Pizarra alto={140}>
        <svg width="100%" height="100%" viewBox="0 0 720 140" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Relación entre real, teórico y rendimiento
          </text>
          <g transform="translate(80, 50)">
            <rect width={200} height={50} fill={LIENZO.ok} opacity={0.2} stroke={LIENZO.ok} strokeWidth={2} rx={8} />
            <text x={100} y={20} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={600}>TEÓRICO</text>
            <text x={100} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>(estequiometría 100%)</text>
          </g>
          <text x={300} y={82} fontSize={20} fill={LIENZO.fg}>×</text>
          <g transform="translate(330, 50)">
            <rect width={140} height={50} fill={LIENZO.warn} opacity={0.2} stroke={LIENZO.warn} strokeWidth={2} rx={8} />
            <text x={70} y={20} textAnchor="middle" fill={LIENZO.warn} fontSize={11} fontWeight={600}>% RENDIM.</text>
            <text x={70} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>÷ 100</text>
          </g>
          <text x={490} y={82} fontSize={20} fill={LIENZO.fg}>=</text>
          <g transform="translate(520, 50)">
            <rect width={120} height={50} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={2} rx={8} />
            <text x={60} y={20} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={600}>REAL</text>
            <text x={60} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>(obtenido)</text>
          </g>
        </svg>
      </Pizarra>

      <WorkedExample titulo="14 g de N₂ → 12.75 g de NH₃. ¿Rendimiento? (N=14, H=1)">
        <strong>Reacción:</strong> N₂ + 3H₂ → 2NH₃<br />
        <strong>Moles N₂:</strong> 14 / 28 = 0.5 mol<br />
        <strong>NH₃ teórico (mol):</strong> 0.5 × 2 = 1 mol<br />
        <strong>NH₃ teórico (g):</strong> 1 × 17 = 17 g<br />
        <strong>Rendimiento:</strong> %R = (12.75 / 17) × 100 = <strong>75%</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>"Real sobre teórico, por cien."</strong> Si te dan rendimiento
        y querés calcular el real: real = teórico × (%R/100).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscGases() {
  return (
    <EscenaRica>
      <Titulo>Estequiometría con gases · volumen molar</Titulo>

      <Parrafo>
        Para gases en condiciones normales (0 °C y 1 atm), 1 mol ocupa siempre{" "}
        <strong>22.4 L</strong>. Esto permite saltar directamente de moles a
        volumen sin densidad.
      </Parrafo>

      <Definicion termino="Volumen molar en CN">
        1 mol de cualquier gas ideal en CN (0 °C, 1 atm) ocupa 22.4 L.
        <br />Volumen (L) = n (mol) × 22.4
      </Definicion>

      <Pizarra alto={160}>
        <svg width="100%" height="100%" viewBox="0 0 720 160" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Conversiones con gases en CN
          </text>
          {[
            { x: 90, t: "masa (g)", c: "#3b82f6" },
            { x: 280, t: "moles", c: "#10b981" },
            { x: 470, t: "volumen (L)", c: "#f59e0b" },
            { x: 660, t: "moléculas", c: "#a78bfa" },
          ].map((p, i) => (
            <g key={i}>
              <rect x={p.x - 50} y={70} width={100} height={36} fill={p.c} opacity={0.2} stroke={p.c} strokeWidth={2} rx={8} />
              <text x={p.x} y={93} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={600}>{p.t}</text>
            </g>
          ))}
          <text x={185} y={60} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>÷ M</text>
          <text x={185} y={125} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>× M</text>
          <text x={375} y={60} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>× 22.4</text>
          <text x={375} y={125} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>÷ 22.4</text>
          <text x={565} y={60} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>× Nₐ</text>
          <text x={565} y={125} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>÷ Nₐ</text>

          <text x={360} y={150} textAnchor="middle" fill={LIENZO.ok} fontSize={12} fontWeight={600}>
            Volumen molar SOLO en CN. Fuera de CN: usar PV = nRT.
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿L de O₂ en CN para quemar 5.6 L de CH₄ en CN?">
        <strong>Reacción:</strong> CH₄ + 2O₂ → CO₂ + 2H₂O<br />
        <strong>Ley de Gay-Lussac:</strong> en gases a mismas P y T, los volúmenes
        están en proporción molar directa.<br />
        <strong>Proporción 1:2:</strong> V(O₂) = 5.6 L × (2/1) = <strong>11.2 L</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>Ley de Gay-Lussac (volúmenes):</strong> en gases a mismas P y T,
        los volúmenes están en proporción directa con los coeficientes molares.
        No hace falta pasar por moles.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscExamen() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen FCyT UMSS</Titulo>

      <WorkedExample titulo="EXAMEN: g de Al(OH)₃ si reaccionan 5.4 g de Al con exceso de H₂O (Al=27, O=16, H=1)">
        <strong>Reacción:</strong> 2Al + 6H₂O → 2Al(OH)₃ + 3H₂<br />
        <strong>Moles Al:</strong> 5.4 g / 27 g·mol⁻¹ = 0.2 mol<br />
        <strong>Relación molar:</strong> 0.2 × (2/2) = 0.2 mol Al(OH)₃<br />
        <strong>Masa molar Al(OH)₃:</strong> 27 + 3(16+1) = 78 g/mol<br />
        <strong>Masa:</strong> 0.2 × 78 = <strong>15.6 g de Al(OH)₃</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: 50 g CaCO₃ al 90% se descompone. ¿L de CO₂ en CN? (Ca=40, C=12, O=16)">
        <strong>Reacción:</strong> CaCO₃ → CaO + CO₂<br />
        <strong>Masa pura:</strong> 50 × 0.90 = 45 g CaCO₃<br />
        <strong>Moles CaCO₃:</strong> 45 / 100 = 0.45 mol<br />
        <strong>Moles CO₂:</strong> 0.45 × (1/1) = 0.45 mol<br />
        <strong>Volumen CN:</strong> 0.45 × 22.4 = <strong>10.08 L de CO₂</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: 8 g CH₄ + 32 g O₂. ¿Limitante? ¿g CO₂?">
        <strong>Reacción:</strong> CH₄ + 2O₂ → CO₂ + 2H₂O<br />
        <strong>Moles:</strong> n(CH₄) = 8/16 = 0.5; n(O₂) = 32/32 = 1.0<br />
        <strong>Cocientes:</strong> CH₄: 0.5/1 = 0.50; O₂: 1.0/2 = 0.50 → <em>empate</em>,
        ambos se consumen totalmente.<br />
        <strong>CO₂ formado:</strong> 0.5 × 44 = <strong>22 g CO₂</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · Coeficientes como masas">
        <strong>Pensar:</strong> que los coeficientes son gramos.<br />
        <strong>Realidad:</strong> los coeficientes son <em>proporción molar</em>,
        no másica. Siempre pasá los datos a moles primero.
      </Misconception>

      <Misconception titulo="Error 2 · Olvidar la pureza">
        <strong>Pensar:</strong> que toda la masa de la muestra reacciona.<br />
        <strong>Realidad:</strong> si te dan pureza, calculá la masa pura primero:
        m × (%/100).
      </Misconception>

      <Misconception titulo="Error 3 · Limitante por masa">
        <strong>Pensar:</strong> que el reactivo con más masa está en exceso.<br />
        <strong>Realidad:</strong> hay que comparar <em>moles divididos por sus
        coeficientes</em>. El menor cociente = limitante.
      </Misconception>

      <Misconception titulo="Error 4 · 22.4 L/mol fuera de CN">
        <strong>Pensar:</strong> que el volumen molar es siempre 22.4 L/mol.<br />
        <strong>Realidad:</strong> solo en CN (0 °C, 1 atm). Fuera de CN aplicá
        PV = nRT.
      </Misconception>

      <Resumen>
        Estequiometría = balancear, pasar a moles, escalar con coeficientes,
        volver a la unidad pedida. Pureza ajusta la masa inicial. Rendimiento
        ajusta el producto final. Limitante define el máximo.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuántos g de Fe se obtienen al reducir 80 g de Fe₂O₃ con CO? Fe₂O₃ + 3CO → 2Fe + 3CO₂ (Fe=56, O=16)"
        opciones={["112 g", "56 g", "80 g", "28 g"]}
        correctaIdx={1}
        explicacion="n(Fe₂O₃) = 80/160 = 0.5 mol. Fe = 0.5 × 2 = 1 mol = 56 g."
      />

      <AutoCheck
        pregunta="Una reacción tiene rendimiento del 60%. Si el teórico es 50 g, ¿cuántos g se obtienen realmente?"
        opciones={["50 g", "60 g", "30 g", "20 g"]}
        correctaIdx={2}
        explicacion="real = teórico × (%R/100) = 50 × 0.60 = 30 g."
      />

      <AutoCheck
        pregunta="¿Cuántos L de CO₂ en CN se forman al quemar 32 g de CH₃OH (M=32 g/mol)? 2CH₃OH + 3O₂ → 2CO₂ + 4H₂O"
        opciones={["11.2 L", "44.8 L", "22.4 L", "33.6 L"]}
        correctaIdx={2}
        explicacion="n(CH₃OH) = 32/32 = 1 mol → n(CO₂) = 1 mol → V = 22.4 L."
      />

      <AutoCheck
        pregunta="Tenés 4 mol de A y 9 mol de B con reacción 2A + 3B → C. ¿Cuál es el limitante?"
        opciones={["A (cociente 2.0)", "B (cociente 3.0)", "Ambos se agotan", "Ninguno: queda exceso"]}
        correctaIdx={0}
        explicacion="A: 4/2 = 2.0. B: 9/3 = 3.0. A tiene el MENOR cociente → A es el limitante."
      />

      <AutoCheck
        pregunta="100 g de muestra impura tiene 60% de Zn. ¿Moles de H₂ con HCl en exceso? Zn + 2HCl → ZnCl₂ + H₂ (Zn=65)"
        opciones={["1.54 mol", "0.92 mol", "0.46 mol", "1.0 mol"]}
        correctaIdx={1}
        explicacion="Masa pura = 60 g; n(Zn) = 60/65 = 0.923 mol; relación 1:1 → 0.923 mol H₂."
      />
    </EscenaRica>
  );
}
