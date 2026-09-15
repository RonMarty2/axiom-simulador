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
      unidad="QUI-08"
      tituloUnidad="Gases ideales · Leyes y ecuación de estado"
      escenas={[
        { titulo: "Estado gaseoso · características", componente: EscIntro },
        { titulo: "Variables P, V, T, n", componente: EscVariables },
        { titulo: "Ley de Boyle (P y V)", componente: EscBoyle },
        { titulo: "Ley de Charles (V y T)", componente: EscCharles },
        { titulo: "Ley de Gay-Lussac (P y T)", componente: EscGayLussac },
        { titulo: "Ecuación combinada", componente: EscCombinada },
        { titulo: "Ecuación de gas ideal · PV = nRT", componente: EscIdeal },
        { titulo: "Simulador · gas ideal interactivo", componente: EscSimulador },
        { titulo: "Mezclas · Dalton", componente: EscDalton },
        { titulo: "Problemas tipo examen", componente: EscExamen },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Estado gaseoso · materia "libre"</Titulo>

      <Hook>
        En Cochabamba (2570 msnm), el aire pesa menos que en Santa Cruz. ¿Por
        qué? El gas ideal explica esto y muchísimo más: bomba de bicicleta,
        globos aerostáticos, presión arterial, hasta los airbags.
      </Hook>

      <Definicion termino="Gas ideal">
        Modelo simplificado donde las moléculas:
        <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
          <li>No tienen volumen propio (puntos materiales).</li>
          <li>No interactúan entre sí (sin fuerzas de atracción/repulsión).</li>
          <li>Chocan elásticamente con las paredes y entre sí.</li>
        </ul>
      </Definicion>

      <Parrafo>
        En condiciones moderadas de P y T, los gases reales se comportan como
        ideales con muy buena aproximación. El modelo falla a P muy alta o T
        muy baja (los gases se acercan al líquido).
      </Parrafo>

      <Mnemotecnia>
        "Gases: <strong>mucho espacio, poca interacción, mucha velocidad</strong>."
        Por eso ocupan TODO el recipiente.
      </Mnemotecnia>

      <Conexion>
        Conecta con: estequiometría (Unidad 7): los gases en CN ocupan 22.4
        L/mol; presión atmosférica que ya viste en Física.
      </Conexion>
    </EscenaRica>
  );
}

function EscVariables() {
  return (
    <EscenaRica>
      <Titulo>Las 4 variables del gas ideal</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          {[
            {
              x: 70, y: 30, c: LIENZO.accent, sym: "P", nom: "Presión",
              uni: ["atm, mmHg, Pa, bar"],
              eq: ["1 atm = 760 mmHg", "1 atm = 101325 Pa"],
            },
            {
              x: 250, y: 30, c: LIENZO.ok, sym: "V", nom: "Volumen",
              uni: ["L, mL, m³"],
              eq: ["1 L = 1000 mL", "1 m³ = 1000 L"],
            },
            {
              x: 430, y: 30, c: LIENZO.warn, sym: "T", nom: "Temperatura",
              uni: ["KELVIN siempre", "(no °C)"],
              eq: ["T(K) = t(°C) + 273", "0 °C = 273 K"],
            },
            {
              x: 610, y: 30, c: LIENZO.bad, sym: "n", nom: "Moles",
              uni: ["mol"],
              eq: ["n = m / M", "n = N / Nₐ"],
            },
          ].map((v, i) => (
            <g key={i} transform={`translate(${v.x}, ${v.y})`}>
              <rect x={-60} y={0} width={120} height={210} fill={v.c} opacity={0.08} stroke={v.c} strokeWidth={1.5} rx={10} />
              <circle cx={0} cy={30} r={22} fill={v.c} opacity={0.2} stroke={v.c} strokeWidth={2} />
              <text textAnchor="middle" dy={6} cy={30} y={30} fill={v.c} fontSize={22} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{v.sym}</text>
              <text textAnchor="middle" y={75} fill={LIENZO.fg} fontSize={13} fontWeight={700}>{v.nom}</text>
              <text textAnchor="middle" y={100} fill={LIENZO.fgDim} fontSize={10}>Unidades:</text>
              {v.uni.map((u, j) => (
                <text key={j} textAnchor="middle" y={115 + j * 14} fill={LIENZO.fg} fontSize={11}>{u}</text>
              ))}
              <text textAnchor="middle" y={155} fill={LIENZO.fgDim} fontSize={10}>Conversión:</text>
              {v.eq.map((e, j) => (
                <text key={j} textAnchor="middle" y={170 + j * 14} fill={LIENZO.fg} fontSize={10}>{e}</text>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>TODO debe estar en Kelvin para los gases.</strong> Usar °C en
        las ecuaciones es el error más frecuente del examen FCyT.
      </Cuidado>

      <Mnemotecnia>
        <strong>K = °C + 273.</strong> Nunca olvides.
      </Mnemotecnia>

      <AutoCheck
        pregunta="¿Cuánto vale 25 °C en Kelvin?"
        opciones={["25 K", "298 K", "273 K", "248 K"]}
        correctaIdx={1}
        explicacion="T(K) = 25 + 273 = 298 K."
      />
    </EscenaRica>
  );
}

function EscBoyle() {
  const [V1, setV1] = useState(4);
  const P1 = 1; // atm
  const V2 = useMemo(() => 4, []);
  const P2_real = useMemo(() => (P1 * V1) / V2, [V1]);

  return (
    <EscenaRica>
      <Titulo>Ley de Boyle · T constante</Titulo>

      <Hook>
        Si aprietas una bomba de bicicleta tapando la salida, sientes cada vez
        más resistencia. Al reducir el volumen, la presión sube. Esa es Boyle.
      </Hook>

      <Definicion termino="Ley de Boyle">
        A temperatura y cantidad de gas constantes, la presión y el volumen son
        INVERSAMENTE proporcionales.<br /><br />
        <strong>P₁ · V₁ = P₂ · V₂</strong>
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            P vs V (curva hipérbola)
          </text>
          {/* ejes */}
          <line x1={80} x2={680} y1={180} y2={180} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={80} x2={80} y1={50} y2={180} stroke={LIENZO.fg} strokeWidth={1.5} />
          <text x={680} y={200} textAnchor="end" fill={LIENZO.fgDim} fontSize={12}>V</text>
          <text x={70} y={55} textAnchor="end" fill={LIENZO.fgDim} fontSize={12}>P</text>
          {/* hipérbola: P=k/V */}
          <path d={(() => {
            const k = 800;
            let d = "";
            for (let x = 100; x <= 660; x += 4) {
              const Vv = x - 80;
              const Pv = k / Vv;
              const y = 180 - Math.min(120, Pv);
              if (x === 100) d += `M ${x} ${y}`;
              else d += ` L ${x} ${y}`;
            }
            return d;
          })()} fill="none" stroke={LIENZO.accent} strokeWidth={2.5} />
          <text x={500} y={100} fill={LIENZO.accent} fontSize={13} fontStyle="italic">P = k / V</text>
          <text x={500} y={120} fill={LIENZO.fgDim} fontSize={11}>(hipérbola equilátera)</text>
        </svg>
      </Pizarra>

      <div style={{ maxWidth: 620, width: "100%", padding: 14, background: LIENZO.bgSoft, borderRadius: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: LIENZO.accent, marginBottom: 8, letterSpacing: 1.2 }}>
          MINI-SIMULADOR · BOYLE
        </div>
        <Parrafo>
          Si tienes un gas con P₁ = 1 atm en V₁ = {V1} L y lo comprimes hasta V₂ = {V2} L
          (T = cte), ¿qué presión final P₂ mides?
        </Parrafo>
        <div style={{ marginTop: 10 }}>
          <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
            V₁ inicial: {V1} L
          </label>
          <input
            type="range" min={2} max={10} step={0.5} value={V1}
            onChange={(e) => setV1(Number(e.target.value))}
            style={{ width: "100%", marginTop: 4 }}
          />
          <div style={{ marginTop: 8, fontFamily: "var(--font-crimson), serif", fontSize: 15 }}>
            P₂ = P₁ · V₁ / V₂ = 1 · {V1} / {V2} = <strong style={{ color: LIENZO.accent }}>{P2_real.toFixed(2)} atm</strong>
          </div>
        </div>
      </div>

      <WorkedExample titulo="2 L de O₂ a 1.5 atm se comprimen a 0.5 L. ¿Presión final? (T cte)">
        P₁V₁ = P₂V₂<br />
        (1.5)(2) = P₂(0.5)<br />
        P₂ = 3 / 0.5 = <strong>6 atm</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscCharles() {
  return (
    <EscenaRica>
      <Titulo>Ley de Charles · P constante</Titulo>

      <Hook>
        Si calientas un globo, se infla. Si lo metes en la heladera, se arruga.
        Volumen y temperatura van de la mano (a P constante).
      </Hook>

      <Definicion termino="Ley de Charles">
        A presión y cantidad de gas constantes, el volumen es DIRECTAMENTE
        proporcional a la temperatura absoluta.<br /><br />
        <strong>V₁ / T₁ = V₂ / T₂</strong>
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            V vs T (recta que pasa por el origen)
          </text>
          <line x1={80} x2={680} y1={170} y2={170} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={80} x2={80} y1={50} y2={170} stroke={LIENZO.fg} strokeWidth={1.5} />
          <text x={680} y={188} textAnchor="end" fill={LIENZO.fgDim} fontSize={12}>T (K)</text>
          <text x={70} y={55} textAnchor="end" fill={LIENZO.fgDim} fontSize={12}>V</text>
          <line x1={80} x2={680} y1={170} y2={60} stroke={LIENZO.ok} strokeWidth={2.5} />
          <text x={500} y={90} fill={LIENZO.ok} fontSize={13} fontStyle="italic">V = k · T</text>
          <circle cx={80} cy={170} r={4} fill={LIENZO.bad} />
          <text x={92} y={186} fill={LIENZO.bad} fontSize={11}>0 K (cero absoluto)</text>
        </svg>
      </Pizarra>

      <Cuidado>
        Si extrapolas la recta V vs T hacia atrás, V = 0 ocurre en T = 0 K
        (−273.15 °C): el cero absoluto. En la práctica, antes de eso el gas
        se licúa y no aplica.
      </Cuidado>

      <WorkedExample titulo="2 L de gas a 300 K se calientan a 600 K. ¿Volumen final? (P cte)">
        V₁/T₁ = V₂/T₂<br />
        2/300 = V₂/600<br />
        V₂ = 600 · 2 / 300 = <strong>4 L</strong> (se duplica)
      </WorkedExample>

      <AutoCheck
        pregunta="Un gas ocupa 6 L a 27 °C. ¿Qué volumen ocupará a 127 °C a P constante?"
        opciones={["8 L", "12 L", "10 L", "5 L"]}
        correctaIdx={0}
        explicacion="T₁ = 300 K, T₂ = 400 K. V₂ = 6 × (400/300) = 8 L. NUNCA usar °C aquí."
      />
    </EscenaRica>
  );
}

function EscGayLussac() {
  return (
    <EscenaRica>
      <Titulo>Ley de Gay-Lussac · V constante</Titulo>

      <Hook>
        ¿Por qué advierten "no calentar latas de aerosol"? Porque a volumen
        cerrado, si sube la T, sube la P, y la lata estalla.
      </Hook>

      <Definicion termino="Ley de Gay-Lussac">
        A volumen y cantidad de gas constantes, la presión es DIRECTAMENTE
        proporcional a la temperatura absoluta.<br /><br />
        <strong>P₁ / T₁ = P₂ / T₂</strong>
      </Definicion>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            P vs T (recta por el origen)
          </text>
          <line x1={80} x2={680} y1={150} y2={150} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={80} x2={80} y1={50} y2={150} stroke={LIENZO.fg} strokeWidth={1.5} />
          <text x={680} y={168} textAnchor="end" fill={LIENZO.fgDim} fontSize={12}>T (K)</text>
          <text x={70} y={55} textAnchor="end" fill={LIENZO.fgDim} fontSize={12}>P</text>
          <line x1={80} x2={680} y1={150} y2={60} stroke={LIENZO.warn} strokeWidth={2.5} />
          <text x={500} y={90} fill={LIENZO.warn} fontSize={13} fontStyle="italic">P = k · T</text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Gas a 1 atm y 300 K se calienta a 450 K en recipiente rígido. ¿Presión final?">
        P₁/T₁ = P₂/T₂<br />
        1/300 = P₂/450<br />
        P₂ = 450/300 = <strong>1.5 atm</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>"Lata cerrada al fuego = bomba."</strong> Boyle, Charles y
        Gay-Lussac son las 3 caras del mismo fenómeno: cada uno fija una
        variable diferente.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCombinada() {
  return (
    <EscenaRica>
      <Titulo>Ecuación combinada · todo varía</Titulo>

      <Parrafo>
        En la mayoría de problemas reales cambian P, V y T al mismo tiempo
        (manteniendo n constante). Las tres leyes anteriores se fusionan en
        una sola.
      </Parrafo>

      <Definicion termino="Ecuación combinada">
        Para una cantidad fija de gas que cambia de estado 1 a estado 2:<br /><br />
        <strong>(P₁ · V₁) / T₁ = (P₂ · V₂) / T₂</strong>
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Casos especiales se reducen a las leyes individuales
          </text>
          {[
            { x: 100, t1: "T cte →", t2: "P₁V₁ = P₂V₂", t3: "Boyle", c: LIENZO.accent },
            { x: 310, t1: "P cte →", t2: "V₁/T₁ = V₂/T₂", t3: "Charles", c: LIENZO.ok },
            { x: 520, t1: "V cte →", t2: "P₁/T₁ = P₂/T₂", t3: "Gay-Lussac", c: LIENZO.warn },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 60)`}>
              <rect x={-10} y={0} width={180} height={90} fill={p.c} opacity={0.08} stroke={p.c} strokeWidth={1.5} rx={10} />
              <text x={80} y={25} textAnchor="middle" fill={p.c} fontSize={13} fontWeight={700}>{p.t1}</text>
              <text x={80} y={50} textAnchor="middle" fill={LIENZO.fg} fontSize={14}
                fontFamily="var(--font-crimson), serif">{p.t2}</text>
              <text x={80} y={75} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>{p.t3}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <WorkedExample titulo="500 mL a 2 atm y 300 K pasan a 1 atm y 400 K. ¿V final?">
        (P₁V₁)/T₁ = (P₂V₂)/T₂<br />
        (2)(500)/300 = (1)(V₂)/400<br />
        V₂ = (2)(500)(400) / (300)(1) = <strong>1333 mL ≈ 1.33 L</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>"P·V / T = constante"</strong> mientras n no cambie. Si te
        piden uno de los 6 valores y te dan los otros 5, despeja directamente.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscIdeal() {
  return (
    <EscenaRica>
      <Titulo>Ecuación de gas ideal · PV = nRT</Titulo>

      <Parrafo>
        La ecuación más importante de la unidad. Relaciona las 4 variables en
        un solo paso y permite calcular cualquiera conociendo las otras 3.
      </Parrafo>

      <Definicion termino="Ecuación de estado del gas ideal">
        <span style={{ fontSize: 18, fontWeight: 700, color: LIENZO.accent }}>
          P · V = n · R · T
        </span>
        <ul style={{ margin: "8px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>P</strong>: presión (atm)</li>
          <li><strong>V</strong>: volumen (L)</li>
          <li><strong>n</strong>: moles</li>
          <li><strong>R</strong>: constante = 0.082 atm·L/(mol·K)</li>
          <li><strong>T</strong>: temperatura (K)</li>
        </ul>
      </Definicion>

      <Cuidado>
        El valor de R depende de las unidades. Para FCyT UMSS, siempre usar:
        <strong> R = 0.082 atm·L/(mol·K)</strong>. Si te dan kPa o m³, convierte
        primero.
      </Cuidado>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Variantes útiles de PV = nRT
          </text>
          {[
            { x: 100, t: "n = PV / RT", n: "calcular moles" },
            { x: 310, t: "V = nRT / P", n: "calcular volumen" },
            { x: 520, t: "P = nRT / V", n: "calcular presión" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 60)`}>
              <rect x={-10} y={0} width={180} height={90} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={10} />
              <text x={80} y={40} textAnchor="middle" fill={LIENZO.accent} fontSize={16} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{p.t}</text>
              <text x={80} y={70} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>{p.n}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿Cuántos moles de O₂ hay en 2 L a 2 atm y 27 °C?">
        T = 27 + 273 = 300 K<br />
        n = PV / RT = (2)(2) / (0.082 × 300) = 4 / 24.6<br />
        n = <strong>0.163 mol O₂</strong>
      </WorkedExample>

      <WorkedExample titulo="¿Qué volumen ocupan 0.5 mol de CO₂ a 1.5 atm y 350 K?">
        V = nRT / P = (0.5)(0.082)(350) / 1.5<br />
        V = 14.35 / 1.5 = <strong>9.57 L</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>PV = nRT</strong> es a la química lo que F = ma es a la física.
        Memorízala con el cuento: "<em>P</em>iquito <em>V</em>ino al
        <em> n</em>uevo <em>R</em>estaurante <em>T</em>arifa".
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSimulador() {
  const [P, setP] = useState(1);
  const [T, setT] = useState(300);
  const [n, setN] = useState(1);
  const R = 0.082;
  const V = useMemo(() => (n * R * T) / P, [P, T, n]);

  return (
    <EscenaRica>
      <Titulo>Simulador · gas ideal interactivo</Titulo>

      <Parrafo>
        Ajusta P, T y n y observa cómo cambia el volumen V de acuerdo a
        PV = nRT. Nota la proporcionalidad directa con n y T, e inversa con P.
      </Parrafo>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, color: "#e2e8f0", maxWidth: 620, width: "100%" }}>
        <div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, marginBottom: 14, fontFamily: "var(--font-crimson), serif" }}>
          PV = nRT
        </div>

        <Slider label={`Presión P = ${P.toFixed(1)} atm`} value={P} min={0.5} max={5} step={0.1}
          onChange={setP} color="#a78bfa" />
        <Slider label={`Temperatura T = ${T} K (${T - 273} °C)`} value={T} min={200} max={600} step={10}
          onChange={setT} color="#f59e0b" />
        <Slider label={`Moles n = ${n.toFixed(2)} mol`} value={n} min={0.1} max={5} step={0.1}
          onChange={setN} color="#10b981" />

        <div style={{ marginTop: 16, padding: 14, background: "#1e293b", borderRadius: 8, textAlign: "center", border: "2px solid #60a5fa" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Volumen calculado</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#60a5fa", fontFamily: "var(--font-crimson), serif" }}>
            V = {V.toFixed(2)} L
          </div>
          <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>
            V = ({n.toFixed(2)} × 0.082 × {T}) / {P.toFixed(1)}
          </div>
        </div>
      </div>

      <Cuidado>
        Verifica los casos límite: si duplicas P, V se reduce a la mitad. Si
        duplicas T (en K), V se duplica. Si duplicas n, V se duplica.
      </Cuidado>
    </EscenaRica>
  );
}

function Slider({ label, value, min, max, step, onChange, color }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; color: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: "block", fontSize: 13, marginBottom: 4, color }}>{label}</label>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: color }}
      />
    </div>
  );
}

function EscDalton() {
  return (
    <EscenaRica>
      <Titulo>Mezclas de gases · Ley de Dalton</Titulo>

      <Hook>
        El aire que respiras es una mezcla de N₂ (78%), O₂ (21%) y otros (1%).
        Cada gas aporta una "presión parcial" a la presión total. ¿Cuánto?
      </Hook>

      <Definicion termino="Ley de Dalton de presiones parciales">
        En una mezcla de gases, la presión total es la suma de las presiones
        parciales de cada componente.<br /><br />
        <strong>P_total = P₁ + P₂ + P₃ + ... </strong><br />
        <strong>P_i = x_i · P_total</strong> (x_i = fracción molar)
      </Definicion>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Composición del aire seco a 1 atm
          </text>
          {[
            { x: 80, w: 468, c: "#3b82f6", lab: "N₂", per: "78%", press: "0.78 atm" },
            { x: 548, w: 126, c: "#ef4444", lab: "O₂", per: "21%", press: "0.21 atm" },
            { x: 674, w: 6, c: "#a78bfa", lab: "otros", per: "1%", press: "0.01 atm" },
          ].map((g, i) => (
            <g key={i}>
              <rect x={g.x} y={60} width={g.w} height={50} fill={g.c} opacity={0.5} stroke={g.c} strokeWidth={2} />
              {g.w > 30 && (
                <>
                  <text x={g.x + g.w / 2} y={88} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700}>{g.lab} {g.per}</text>
                </>
              )}
            </g>
          ))}
          <text x={80} y={140} fill={LIENZO.fgDim} fontSize={12}>P(N₂) = 0.78 atm</text>
          <text x={280} y={140} fill={LIENZO.fgDim} fontSize={12}>P(O₂) = 0.21 atm</text>
          <text x={480} y={140} fill={LIENZO.fgDim} fontSize={12}>P(otros) ≈ 0.01 atm</text>
          <text x={360} y={165} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            P_total = 1.00 atm
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Mezcla: 3 mol N₂ + 2 mol O₂ + 5 mol He a P total 5 atm. ¿Presiones parciales?">
        Total: 3 + 2 + 5 = 10 mol<br />
        x(N₂) = 3/10 = 0.3 → P(N₂) = 0.3 × 5 = <strong>1.5 atm</strong><br />
        x(O₂) = 2/10 = 0.2 → P(O₂) = 0.2 × 5 = <strong>1.0 atm</strong><br />
        x(He) = 5/10 = 0.5 → P(He) = 0.5 × 5 = <strong>2.5 atm</strong><br />
        Verificación: 1.5 + 1.0 + 2.5 = 5 atm ✓
      </WorkedExample>
    </EscenaRica>
  );
}

function EscExamen() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen FCyT UMSS</Titulo>

      <WorkedExample titulo="EXAMEN: 8 g de O₂ a 0.5 atm y 27 °C. ¿Volumen? (O=16)">
        n = 8/32 = 0.25 mol; T = 300 K<br />
        V = nRT/P = (0.25)(0.082)(300) / 0.5<br />
        V = 6.15 / 0.5 = <strong>12.3 L</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: globo con 2 L a 1 atm y 27 °C sube hasta 0.5 atm y 7 °C. ¿V?">
        T₁ = 300 K, T₂ = 280 K<br />
        P₁V₁/T₁ = P₂V₂/T₂<br />
        (1)(2)/300 = (0.5)(V₂)/280<br />
        V₂ = (1)(2)(280) / (300)(0.5) = 560/150 = <strong>3.73 L</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: ¿densidad de SO₃ a CN? (S=32, O=16)">
        M(SO₃) = 32 + 3×16 = 80 g/mol<br />
        En CN: 1 mol = 22.4 L<br />
        d = M/V = 80 g / 22.4 L = <strong>3.57 g/L</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: 2 mol N₂ + 3 mol H₂ en 10 L a 400 K. ¿P total?">
        n_total = 5 mol<br />
        P = nRT/V = (5)(0.082)(400)/10<br />
        P = 164/10 = <strong>16.4 atm</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · Usar °C en vez de K">
        <strong>Pensar:</strong> que la temperatura va en grados Celsius.<br />
        <strong>Realidad:</strong> SIEMPRE en Kelvin. Suma 273.
      </Misconception>

      <Misconception titulo="Error 2 · No convertir unidades de R">
        <strong>Pensar:</strong> que R es siempre 0.082.<br />
        <strong>Realidad:</strong> 0.082 es para atm, L, mol, K. Si la presión
        viene en kPa o el volumen en m³, hay que convertir o usar otro R.
      </Misconception>

      <Misconception titulo="Error 3 · Olvidar n en Boyle/Charles/Gay-Lussac">
        <strong>Pensar:</strong> que P₁V₁=P₂V₂ vale siempre.<br />
        <strong>Realidad:</strong> vale solo si <em>n</em> y <em>T</em> son
        constantes. Si cambia n (le sacan gas, le agregan), no aplica.
      </Misconception>

      <Misconception titulo="Error 4 · Fracción molar vs % en masa">
        <strong>Pensar:</strong> que el 21% de O₂ en aire es x = 0.21.<br />
        <strong>Realidad:</strong> 21% es en volumen/moles, no en masa. Para
        Dalton sí usas 0.21, pero ojo si el dato es % en masa.
      </Misconception>

      <Resumen>
        Modelo ideal: PV = nRT con R = 0.082. Temperatura SIEMPRE en K. Las
        leyes individuales (Boyle, Charles, Gay-Lussac) son casos particulares
        de la combinada cuando una variable es constante. Dalton suma presiones
        parciales.
      </Resumen>

      <AutoCheck
        pregunta="Si calientas un gas de 27 °C a 327 °C a P constante, ¿en qué factor cambia V?"
        opciones={["×2", "×12", "×6", "×0.5"]}
        correctaIdx={0}
        explicacion="T₁ = 300 K, T₂ = 600 K. V₂/V₁ = T₂/T₁ = 2. Se duplica."
      />

      <AutoCheck
        pregunta="¿Cuántos moles de gas hay en 5.6 L a CN?"
        opciones={["0.5 mol", "0.25 mol", "1 mol", "2 mol"]}
        correctaIdx={1}
        explicacion="En CN: 1 mol = 22.4 L → n = 5.6/22.4 = 0.25 mol."
      />

      <AutoCheck
        pregunta="Un gas ocupa 4 L a 1 atm. ¿Qué volumen a 4 atm (T cte)?"
        opciones={["16 L", "8 L", "1 L", "2 L"]}
        correctaIdx={2}
        explicacion="Boyle: V₂ = P₁V₁/P₂ = (1)(4)/4 = 1 L."
      />

      <AutoCheck
        pregunta="¿Densidad del CH₄ a CN? (C=12, H=1)"
        opciones={["0.71 g/L", "16 g/L", "1.43 g/L", "0.36 g/L"]}
        correctaIdx={0}
        explicacion="M = 16 g/mol. d = 16/22.4 = 0.714 g/L."
      />

      <AutoCheck
        pregunta="Mezcla de 1 mol O₂ + 3 mol N₂ a P total 4 atm. ¿P(O₂)?"
        opciones={["4 atm", "2 atm", "1 atm", "0.5 atm"]}
        correctaIdx={2}
        explicacion="x(O₂) = 1/4 = 0.25. P(O₂) = 0.25 × 4 = 1 atm."
      />
    </EscenaRica>
  );
}
