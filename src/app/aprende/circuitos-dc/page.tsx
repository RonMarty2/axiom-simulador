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

export default function Page() {
  return (
    <LeccionShell
      unidad="FIS-07"
      tituloUnidad="Circuitos de corriente continua"
      escenas={[
        { titulo: "Corriente eléctrica · concepto", componente: EscCorriente },
        { titulo: "Ley de Ohm · simulador interactivo", componente: EscOhmSim },
        { titulo: "Resistores en serie · simulador", componente: EscSerieSim },
        { titulo: "Resistores en paralelo · simulador", componente: EscParaleloSim },
        { titulo: "Comparación serie vs paralelo", componente: EscComparar },
        { titulo: "Leyes de Kirchhoff", componente: EscKirchhoff },
        { titulo: "Potencia eléctrica", componente: EscPotenciaElec },
        { titulo: "Problemas tipo examen", componente: EscProblemas },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscCorriente() {
  return (
    <EscenaRica>
      <Titulo>Corriente eléctrica</Titulo>

      <Hook>
        Circuitos DC es la última unidad del programa de Física (examen final
        del PREU). En el examen FCyT aparecen problemas de resistores en serie
        y paralelo, ley de Ohm y potencia.
      </Hook>

      <Definicion termino="Corriente eléctrica (I)">
        Flujo de carga eléctrica por unidad de tiempo:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          I = Q / t
        </span><br /><br />
        Unidad SI: ampere (A) = C/s.
      </Definicion>

      <Resumen>
        <strong>Sentido convencional</strong>: del polo + al polo − (por fuera
        de la fuente). Físicamente son los electrones los que se mueven, pero
        en sentido OPUESTO (de − a +).
      </Resumen>

      <Definicion termino="Fuerza electromotriz (FEM, ε)">
        Energía por unidad de carga que la fuente (batería) suministra al
        circuito. Unidad: V.
      </Definicion>
    </EscenaRica>
  );
}

// Simulador interactivo de Ley de Ohm
function EscOhmSim() {
  const [V, setV] = useState(12);
  const [R, setR] = useState(4);
  const I = V / R;
  const P = V * I;

  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Ley de Ohm · simulador interactivo</Titulo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          V = I · R
        </span>
      </Resumen>

      <Parrafo>
        Mueves los sliders y mirás cómo cambian la corriente y la potencia.
        Esta es la relación más fundamental de los circuitos.
      </Parrafo>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Circuito simple */}
          <rect x="60" y="60" width="280" height="80" fill="none"
            stroke={LIENZO.fg} strokeWidth="2" />
          {/* Batería */}
          <line x1="60" y1="40" x2="60" y2="160" stroke={LIENZO.bg} strokeWidth="6" />
          <line x1="55" y1="80" x2="55" y2="120" stroke={LIENZO.fg} strokeWidth="3" />
          <line x1="65" y1="70" x2="65" y2="130" stroke={LIENZO.fg} strokeWidth="3" />
          <text x="35" y="105" fontSize="14" fill={COLOR_OK} fontWeight="700">{V}V</text>
          {/* Resistor */}
          <rect x="180" y="50" width="80" height="20" fill={`${COLOR_EXP}33`}
            stroke={COLOR_EXP} strokeWidth="2" />
          <text x="220" y="44" textAnchor="middle" fontSize="13" fill={COLOR_EXP} fontWeight="700">R = {R}Ω</text>
          {/* Flecha de corriente animada */}
          <motion.circle r="4" fill={LIENZO.accent}
            animate={{
              cx: [340, 340, 60, 60, 340],
              cy: [60, 140, 140, 60, 60],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
          <text x="200" y="180" textAnchor="middle" fontSize="14" fill={LIENZO.fg}>
            Corriente: <tspan fill={LIENZO.accent} fontWeight="700">{I.toFixed(2)} A</tspan>
          </text>
        </svg>
      </Pizarra>

      <div style={{ maxWidth: 480, marginTop: 14 }}>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          Voltaje V = <strong style={{ color: COLOR_OK }}>{V}</strong> V
          <input type="range" min={1} max={24} step={1} value={V}
            onChange={(e) => setV(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: COLOR_OK }} />
        </label>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          Resistencia R = <strong style={{ color: COLOR_EXP }}>{R}</strong> Ω
          <input type="range" min={1} max={20} step={1} value={R}
            onChange={(e) => setR(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: COLOR_EXP }} />
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <div style={{ padding: 10, background: "var(--bg-card)", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Corriente</div>
            <div style={{ fontSize: 22, color: LIENZO.accent, fontWeight: 700 }}>{I.toFixed(2)} A</div>
          </div>
          <div style={{ padding: 10, background: "var(--bg-card)", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Potencia disipada</div>
            <div style={{ fontSize: 22, color: COLOR_BAD, fontWeight: 700 }}>{P.toFixed(2)} W</div>
          </div>
        </div>
      </div>

      <Mnemotecnia>
        <strong>Prueba estos casos</strong>:<br />
        • Sube V, ¿qué pasa con I? (sube proporcional).<br />
        • Sube R, ¿qué pasa con I? (baja inversa).<br />
        • ¿Para qué V y R obtienes exactamente 1 A?
      </Mnemotecnia>
    </EscenaRica>
  );
}

// Simulador en serie
function EscSerieSim() {
  const [R1, setR1] = useState(4);
  const [R2, setR2] = useState(6);
  const V = 12;
  const Req = R1 + R2;
  const I = V / Req;
  const V1 = I * R1;
  const V2 = I * R2;

  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Resistores en SERIE · simulador</Titulo>

      <Resumen>
        En serie, la corriente es la MISMA por todos. Las resistencias y los
        voltajes se SUMAN:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          R_eq = R₁ + R₂ + ...
        </span>
      </Resumen>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 400 180"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Circuito serie */}
          <rect x="50" y="60" width="300" height="60" fill="none"
            stroke={LIENZO.fg} strokeWidth="2" />
          {/* Batería */}
          <text x="35" y="95" fontSize="13" fill={COLOR_OK} fontWeight="700">{V}V</text>
          {/* R1 */}
          <rect x="120" y="50" width="60" height="20" fill={`${COLOR_EXP}33`}
            stroke={COLOR_EXP} strokeWidth="2" />
          <text x="150" y="44" textAnchor="middle" fontSize="11" fill={COLOR_EXP} fontWeight="700">R₁={R1}Ω</text>
          <text x="150" y="135" textAnchor="middle" fontSize="11" fill={COLOR_OK}>V₁={V1.toFixed(1)}V</text>
          {/* R2 */}
          <rect x="220" y="50" width="60" height="20" fill={`${COLOR_BAD}33`}
            stroke={COLOR_BAD} strokeWidth="2" />
          <text x="250" y="44" textAnchor="middle" fontSize="11" fill={COLOR_BAD} fontWeight="700">R₂={R2}Ω</text>
          <text x="250" y="135" textAnchor="middle" fontSize="11" fill={COLOR_OK}>V₂={V2.toFixed(1)}V</text>
          {/* Flecha corriente */}
          <motion.circle r="4" fill={LIENZO.accent}
            animate={{ cx: [340, 340, 50, 50, 340], cy: [60, 120, 120, 60, 60] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
          <text x="200" y="160" textAnchor="middle" fontSize="13" fill={LIENZO.accent} fontWeight="700">
            I = {I.toFixed(2)} A (igual en ambos)
          </text>
        </svg>
      </Pizarra>

      <div style={{ maxWidth: 480, marginTop: 10 }}>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          R₁ = <strong style={{ color: COLOR_EXP }}>{R1}</strong> Ω
          <input type="range" min={1} max={20} value={R1}
            onChange={(e) => setR1(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: COLOR_EXP }} />
        </label>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          R₂ = <strong style={{ color: COLOR_BAD }}>{R2}</strong> Ω
          <input type="range" min={1} max={20} value={R2}
            onChange={(e) => setR2(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: COLOR_BAD }} />
        </label>
        <div style={{ padding: 10, background: "var(--bg-card)", borderRadius: 8, marginTop: 10, textAlign: "center" }}>
          R_eq = R₁ + R₂ = <strong style={{ color: LIENZO.accent }}>{Req} Ω</strong><br />
          V₁ + V₂ = {V1.toFixed(1)} + {V2.toFixed(1)} = <strong>{V} V</strong> ✓
        </div>
      </div>
    </EscenaRica>
  );
}

// Simulador en paralelo
function EscParaleloSim() {
  const [R1, setR1] = useState(4);
  const [R2, setR2] = useState(6);
  const V = 12;
  const Req = (R1 * R2) / (R1 + R2);
  const I1 = V / R1;
  const I2 = V / R2;
  const I = I1 + I2;

  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Resistores en PARALELO · simulador</Titulo>

      <Resumen>
        En paralelo, el voltaje es el MISMO en todos. Las corrientes se SUMAN:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          1/R_eq = 1/R₁ + 1/R₂ + ...
        </span><br />
        Para 2 en paralelo: R_eq = R₁·R₂ / (R₁ + R₂).
      </Resumen>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Líneas principales */}
          <line x1="50" y1="50" x2="350" y2="50" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="50" y1="150" x2="350" y2="150" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="50" y1="50" x2="50" y2="150" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="350" y1="50" x2="350" y2="150" stroke={LIENZO.fg} strokeWidth="2" />
          {/* R1 (rama superior) */}
          <line x1="170" y1="50" x2="170" y2="80" stroke={LIENZO.fg} strokeWidth="2" />
          <rect x="155" y="80" width="30" height="40" fill={`${COLOR_EXP}33`} stroke={COLOR_EXP} strokeWidth="2" />
          <line x1="170" y1="120" x2="170" y2="150" stroke={LIENZO.fg} strokeWidth="2" />
          <text x="190" y="105" fontSize="11" fill={COLOR_EXP} fontWeight="700">R₁={R1}Ω</text>
          <text x="190" y="78" fontSize="10" fill={COLOR_OK}>I₁={I1.toFixed(1)}A</text>
          {/* R2 */}
          <line x1="260" y1="50" x2="260" y2="80" stroke={LIENZO.fg} strokeWidth="2" />
          <rect x="245" y="80" width="30" height="40" fill={`${COLOR_BAD}33`} stroke={COLOR_BAD} strokeWidth="2" />
          <line x1="260" y1="120" x2="260" y2="150" stroke={LIENZO.fg} strokeWidth="2" />
          <text x="280" y="105" fontSize="11" fill={COLOR_BAD} fontWeight="700">R₂={R2}Ω</text>
          <text x="280" y="78" fontSize="10" fill={COLOR_OK}>I₂={I2.toFixed(1)}A</text>
          {/* Voltaje */}
          <text x="35" y="105" fontSize="13" fill={COLOR_OK} fontWeight="700">{V}V</text>
          <text x="200" y="180" textAnchor="middle" fontSize="13" fill={LIENZO.accent} fontWeight="700">
            I total = I₁ + I₂ = {I.toFixed(2)} A
          </text>
        </svg>
      </Pizarra>

      <div style={{ maxWidth: 480, marginTop: 10 }}>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          R₁ = <strong style={{ color: COLOR_EXP }}>{R1}</strong> Ω
          <input type="range" min={1} max={20} value={R1}
            onChange={(e) => setR1(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: COLOR_EXP }} />
        </label>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          R₂ = <strong style={{ color: COLOR_BAD }}>{R2}</strong> Ω
          <input type="range" min={1} max={20} value={R2}
            onChange={(e) => setR2(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: COLOR_BAD }} />
        </label>
        <div style={{ padding: 10, background: "var(--bg-card)", borderRadius: 8, marginTop: 10, textAlign: "center" }}>
          R_eq = R₁·R₂/(R₁+R₂) = <strong style={{ color: LIENZO.accent }}>{Req.toFixed(2)} Ω</strong><br />
          Nota: R_eq es MENOR que R₁ y R₂ individuales.
        </div>
      </div>

      <PorQue>
        En paralelo, agregar más caminos REDUCE la resistencia total. Es como
        abrir más carriles en una autopista: más autos pueden pasar.
      </PorQue>
    </EscenaRica>
  );
}

function EscComparar() {
  return (
    <EscenaRica>
      <Titulo>Comparación serie vs paralelo</Titulo>

      <Resumen>
        <strong>Tabla resumen</strong>:<br /><br />
        <table style={{ fontFamily: "var(--font-crimson), serif", margin: "0 auto" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "6px 14px" }}></th>
              <th style={{ padding: "6px 14px" }}>SERIE</th>
              <th style={{ padding: "6px 14px" }}>PARALELO</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "6px 14px" }}>Resistencia eq</td><td>R₁+R₂ (suma)</td><td>1/(1/R₁+1/R₂)</td></tr>
            <tr><td style={{ padding: "6px 14px" }}>Corriente</td><td>IGUAL en todos</td><td>SE SUMA</td></tr>
            <tr><td style={{ padding: "6px 14px" }}>Voltaje</td><td>SE SUMA</td><td>IGUAL en todos</td></tr>
            <tr><td style={{ padding: "6px 14px" }}>R_eq vs R individual</td><td>MAYOR</td><td>MENOR</td></tr>
          </tbody>
        </table>
      </Resumen>

      <Mnemotecnia>
        <strong>Truco</strong>: la corriente es como agua. En serie, una sola
        tubería: el flujo es el mismo en todas partes. En paralelo, se reparte
        entre múltiples caminos: el voltaje (presión) es igual pero las
        corrientes se suman.
      </Mnemotecnia>

      <WorkedExample titulo="Caso del facsímil F20 2op 2005">
        I = 11/2 A, R₁ = 1Ω, R₂ = 2Ω, R₃ = 3Ω en paralelo. ¿Corriente por R₁?<br /><br />

        En paralelo: V = misma para todas. V = I_total · R_eq.<br />
        1/R_eq = 1/1 + 1/2 + 1/3 = 11/6 → R_eq = 6/11 Ω.<br />
        V = (11/2)(6/11) = 3 V.<br />
        I₁ = V/R₁ = 3/1 = <strong>3 A</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscKirchhoff() {
  return (
    <EscenaRica>
      <Titulo>Leyes de Kirchhoff</Titulo>

      <Definicion termino="Ley de nodos (LCK)">
        En cualquier nodo (unión de cables), la suma de corrientes que ENTRAN
        es igual a la suma de corrientes que SALEN.<br /><br />
        Esto refleja CONSERVACIÓN DE LA CARGA.
      </Definicion>

      <Definicion termino="Ley de mallas (LVK)">
        En cualquier malla cerrada del circuito, la suma de los voltajes (con
        sus signos) es CERO.<br /><br />
        Refleja CONSERVACIÓN DE LA ENERGÍA.
      </Definicion>

      <Resumen>
        <strong>Convención de signos en LVK</strong>:<br />
        • Si recorres la batería de − a +: ΔV = +ε.<br />
        • Si la recorres de + a −: ΔV = −ε.<br />
        • Si atravesas un resistor en el sentido de la corriente: ΔV = −IR.<br />
        • Si lo atravesas en sentido contrario: ΔV = +IR.
      </Resumen>
    </EscenaRica>
  );
}

function EscPotenciaElec() {
  return (
    <EscenaRica>
      <Titulo>Potencia eléctrica</Titulo>

      <Resumen>
        <strong>Tres formas equivalentes</strong>:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          P = V · I = I² · R = V² / R
        </span><br /><br />
        Unidad: W. Se relaciona con energía: E = P · t.
      </Resumen>

      <Ejemplo titulo="Bombilla de 60 W a 220 V">
        I = P/V = 60/220 ≈ 0.27 A.<br />
        R = V²/P = 220²/60 ≈ 807 Ω.
      </Ejemplo>

      <Ejemplo titulo="Consumo eléctrico">
        Si enciendes una bombilla de 100 W durante 10 horas:<br />
        E = 100 · 10 = 1000 Wh = 1 kWh.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen</Titulo>

      <WorkedExample titulo="Circuito mixto">
        Una batería de 12 V se conecta a R₁ = 4 Ω en serie con un paralelo de
        R₂ = 6 Ω y R₃ = 3 Ω. ¿Corriente total?<br /><br />

        Paralelo: R_p = 6·3/(6+3) = 2 Ω.<br />
        Total: R_eq = 4 + 2 = 6 Ω.<br />
        I = V/R_eq = 12/6 = <strong>2 A</strong>.
      </WorkedExample>

      <WorkedExample titulo="Potencia disipada">
        Misma situación. ¿Potencia en R₁?<br /><br />

        P₁ = I² · R₁ = (2)² · 4 = <strong>16 W</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "V=24, R=8. Corriente:",
      o: ["3 A", "192 A", "1/3 A", "16 A"],
      c: 0,
      ex: "I = V/R = 24/8 = 3 A.",
    },
    {
      p: "Dos resistencias 4Ω y 6Ω en serie. R_eq:",
      o: ["10 Ω", "2.4 Ω", "5 Ω", "24 Ω"],
      c: 0,
      ex: "Serie suma: 4+6=10 Ω.",
    },
    {
      p: "Dos resistencias 4Ω y 4Ω en paralelo:",
      o: ["2 Ω", "8 Ω", "4 Ω", "16 Ω"],
      c: 0,
      ex: "Paralelo iguales: R/2 = 4/2 = 2 Ω.",
    },
    {
      p: "Potencia de un resistor 10Ω con 2A:",
      o: ["40 W", "20 W", "5 W", "100 W"],
      c: 0,
      ex: "P = I²R = 4·10 = 40 W.",
    },
    {
      p: "Si triplicas la resistencia (V constante), la corriente:",
      o: ["1/3", "triplica", "queda igual", "se anula"],
      c: 0,
      ex: "I = V/R. Si R triplica, I se hace 1/3.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · resistores como capacitores">
        Resistores: SERIE suma directo. Capacitores: SERIE suma inversas.
        OPUESTO. No confundir.
      </Misconception>

      <Misconception titulo="Error 2 · creer que corriente se 'gasta'">
        La corriente NO se gasta a su paso por un resistor. La corriente es la
        misma en cualquier punto de un circuito serie. Lo que se gasta es
        ENERGÍA (transformada en calor).
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
