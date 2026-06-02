"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

// Secuencia de términos con arcos que muestran la operación entre cada par
// (PA: "+d", PG: "×r"). Tocar revela los arcos en cascada.
// (Etiquetas de operación animan solo opacidad/escala — sin conflicto x/y.)
function SecuenciaArcos({ terminos, op, color }: { terminos: string[]; op: string; color: string }) {
  const [on, setOn] = useState(false);
  const n = terminos.length;
  const W = 480, alto = 170, margin = 46;
  const step = (W - 2 * margin) / (n - 1);
  const xs = terminos.map((_, i) => margin + i * step);
  const yTerm = 128;
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto} onClick={() => setOn((v) => !v)}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${alto}`}
          preserveAspectRatio="xMidYMid meet" style={{ fontFamily: "var(--font-crimson), serif" }}>
          {terminos.map((t, i) => (
            <text key={i} x={xs[i]} y={yTerm} textAnchor="middle" fontSize="38"
              fill={LIENZO.fg} fontWeight="500">{t}</text>
          ))}
          {xs.slice(0, -1).map((_, i) => {
            const x1 = xs[i] + 16, x2 = xs[i + 1] - 16, mid = (x1 + x2) / 2;
            const d = `M ${x1} 100 Q ${mid} 56 ${x2} 100`;
            return (
              <g key={i}>
                <motion.path d={d} fill="none" stroke={color} strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: on ? i * 0.22 : 0 }} />
                <motion.text x={mid} y="50" textAnchor="middle" fontSize="22"
                  fill={color} fontWeight="600"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: on ? i * 0.22 + 0.2 : 0 }}>{op}</motion.text>
              </g>
            );
          })}
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic" }}>
        {on ? "Cada paso aplica la misma razón" : "Tocá para ver el patrón"}
      </div>
    </div>
  );
}

// Truco de Gauss: empareja extremos (1+6, 2+5, 3+4) y muestra que cada par
// suma lo mismo. Tocar dibuja los pares en cascada.
function GaussPairing() {
  const [on, setOn] = useState(false);
  const terminos = [1, 2, 3, 4, 5, 6];
  const W = 480, alto = 200, margin = 52;
  const step = (W - 2 * margin) / (terminos.length - 1);
  const xs = terminos.map((_, i) => margin + i * step);
  const pares = [[0, 5], [1, 4], [2, 3]];
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto} onClick={() => setOn((v) => !v)}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${alto}`}
          preserveAspectRatio="xMidYMid meet" style={{ fontFamily: "var(--font-crimson), serif" }}>
          {terminos.map((t, i) => (
            <text key={i} x={xs[i]} y={80} textAnchor="middle" fontSize="38"
              fill={LIENZO.fg} fontWeight="500">{t}</text>
          ))}
          {pares.map(([a, b], i) => {
            const x1 = xs[a], x2 = xs[b], mid = (x1 + x2) / 2;
            const depth = 100 + i * 26;
            const d = `M ${x1} 96 Q ${mid} ${depth + 24} ${x2} 96`;
            return (
              <g key={i}>
                <motion.path d={d} fill="none" stroke={LIENZO.accent} strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.45, delay: on ? i * 0.3 : 0 }} />
                <motion.text x={mid} y={depth + 14} textAnchor="middle" fontSize="20"
                  fill={LIENZO.accent} fontWeight="600"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={on ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, delay: on ? i * 0.3 + 0.25 : 0 }}>= 7</motion.text>
              </g>
            );
          })}
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint }}>
        {on
          ? <span><b style={{ color: LIENZO.accent }}>3 pares</b> × <b style={{ color: LIENZO.accent }}>7</b> = <b style={{ color: LIENZO.ok }}>21</b> · (esa es la fórmula de Gauss)</span>
          : <span style={{ fontStyle: "italic" }}>Tocá para emparejar los extremos</span>}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="11"
      tituloUnidad="Sucesiones y series"
      escenas={[
        { titulo: "¿Qué es una sucesión?", componente: Esc01_Intro },
        { titulo: "Progresión aritmética (PA)", componente: Esc02_PA },
        { titulo: "Suma de una PA (Gauss)", componente: Esc03_SumaPA },
        { titulo: "Progresión geométrica (PG)", componente: Esc04_PG },
        { titulo: "Suma de una PG", componente: Esc05_SumaPG },
        { titulo: "Aplicaciones (interés, crecimiento)", componente: Esc06_App },
        { titulo: "Errores comunes", componente: Esc07_Errores },
        { titulo: "Práctica final", componente: Esc08_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Sucesiones y series</Titulo>
      <Definicion termino="sucesión">
        Una <strong>sucesión</strong> es una lista ordenada de números, donde cada
        número se llama <strong>término</strong>. Suelen seguir un patrón.
      </Definicion>
      <Ejemplo>
        2, 4, 6, 8, 10, … (cada término suma 2)<br />
        1, 3, 9, 27, 81, … (cada término multiplica por 3)<br />
        1, 1, 2, 3, 5, 8, 13, … (Fibonacci)
      </Ejemplo>
      <Definicion termino="serie">
        Una <strong>serie</strong> es la SUMA de los términos de una sucesión. Ej: 2 + 4 + 6 + 8 + 10 = 30.
      </Definicion>
      <Resumen>
        🎯 En esta lección verás las dos sucesiones más importantes: aritmética (PA)
        y geométrica (PG). Y cómo sumar los primeros n términos de cada una.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_PA() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Progresión Aritmética (PA)</Titulo>
      <Definicion termino="PA">
        Una sucesión es <strong>aritmética</strong> si entre cada término y el siguiente
        se suma la MISMA cantidad, llamada <strong>razón d</strong>.
      </Definicion>
      <SecuenciaArcos terminos={["3", "7", "11", "15", "19"]} op="+4" color={COLOR_OK} />
      <Ejemplo>
        3, 7, 11, 15, 19 — d = 4 (siempre se suma 4).<br />
        10, 7, 4, 1, −2 — d = −3 (se RESTA 3, también es PA).
      </Ejemplo>
      <Resumen>
        Fórmula del n-ésimo término: <br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a<sub>n</sub> = a<sub>1</sub> + (n − 1)·d
        </span>
      </Resumen>
      <Ejemplo titulo="Encontrar el término 10 de 3, 7, 11, …">
        <Paso n={1}>a₁ = 3, d = 4, n = 10.</Paso>
        <Paso n={2}>a₁₀ = 3 + (10 − 1)·4 = 3 + 36 = <strong style={{ color: COLOR_OK }}>39</strong>.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc03_SumaPA() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Suma de una PA (truco de Gauss)</Titulo>
      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          S<sub>n</sub> = (a<sub>1</sub> + a<sub>n</sub>) · n / 2
        </span>
      </Resumen>
      <GaussPairing />
      <PorQue>
        Gauss niño descubrió esto: si sumás los términos en pares (primero + último,
        segundo + penúltimo, …), cada par da lo mismo: a₁+aₙ. Y hay n/2 pares. Por eso
        Sn = (a₁+aₙ)·n/2.
      </PorQue>
      <Ejemplo titulo="Suma 1 + 2 + 3 + … + 100">
        S = (1 + 100)·100/2 = 101·50 = <strong style={{ color: COLOR_OK }}>5050</strong>.
      </Ejemplo>
      <Ejemplo titulo="Suma 5 + 10 + 15 + … + 95">
        Es PA con a₁=5, aₙ=95, d=5. Cantidad de términos: n = (95−5)/5 + 1 = 19. <br />
        S = (5 + 95)·19/2 = 100·9.5 = <strong style={{ color: COLOR_OK }}>950</strong>.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_PG() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>Progresión Geométrica (PG)</Titulo>
      <Definicion termino="PG">
        Una sucesión es <strong>geométrica</strong> si entre cada término y el siguiente
        se MULTIPLICA por la misma cantidad, llamada <strong>razón r</strong>.
      </Definicion>
      <SecuenciaArcos terminos={["2", "6", "18", "54", "162"]} op="×3" color={COLOR_EXP} />
      <Ejemplo>
        2, 6, 18, 54, 162 — r = 3 (cada uno es el anterior por 3).<br />
        80, 40, 20, 10, 5 — r = 1/2.
      </Ejemplo>
      <Resumen>
        Fórmula del n-ésimo:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a<sub>n</sub> = a<sub>1</sub> · r<sup>(n−1)</sup>
        </span>
      </Resumen>
      <Ejemplo titulo="Término 6 de 2, 6, 18, …">
        a₆ = 2 · 3⁵ = 2 · 243 = <strong style={{ color: COLOR_OK }}>486</strong>.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05_SumaPG() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>Suma de una PG</Titulo>
      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          S<sub>n</sub> = a<sub>1</sub> · (r<sup>n</sup> − 1) / (r − 1) &nbsp; (si r ≠ 1)
        </span>
      </Resumen>
      <Ejemplo titulo="Suma 2 + 6 + 18 + 54 + 162">
        a₁=2, r=3, n=5. S = 2·(3⁵ − 1)/(3−1) = 2·(243−1)/2 = <strong style={{ color: COLOR_OK }}>242</strong>.
      </Ejemplo>
      <Cuidado>
        Si <strong>|r| &lt; 1</strong> y la PG es infinita, la suma <strong>converge</strong>:
        S<sub>∞</sub> = a₁ / (1 − r).
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_App() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones reales</Titulo>
      <Ejemplo titulo="Interés simple (PA)">
        Capital 1000, gana 80 Bs por año. Tras n años: 1000, 1080, 1160, 1240, … es PA con d=80.
      </Ejemplo>
      <Ejemplo titulo="Interés compuesto (PG)">
        Capital 1000 al 5% anual: 1000, 1050, 1102.5, 1157.6, … es PG con r=1.05.<br />
        Después de n años: capital = 1000·1.05ⁿ.
      </Ejemplo>
      <Ejemplo titulo="Población creciente">
        Una población crece 2% por año. Si hoy son N, en 10 años: N·1.02¹⁰ ≈ 1.22·N.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc07_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Confundir PA con PG. <br />
        <span style={{ fontSize: 13 }}>PA suma siempre lo mismo, PG multiplica. Verificá comparando dos diferencias o dos cocientes consecutivos.</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> En aₙ usar (n−1)·d como n·d. <br />
        <span style={{ fontSize: 13 }}>El a₁ es el primero, después aplica n−1 veces la razón. No n.</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> Olvidar contar la cantidad correcta de términos en una suma. <br />
        <span style={{ fontSize: 13 }}>Si sumás 5 + 10 + … + 95, son 19 términos, no 19 − 5 = 14.</span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "PA con a₁=5, d=3. ¿a₁₀?", o: ["32", "30", "35", "27"], c: 0, ex: "a₁₀ = 5 + 9·3 = 32." },
    { p: "Suma de 1+2+…+50:", o: ["1275", "2550", "1250", "1300"], c: 0, ex: "S = 51·50/2 = 1275." },
    { p: "PG con a₁=3, r=2. ¿a₅?", o: ["48", "32", "24", "96"], c: 0, ex: "a₅ = 3·2⁴ = 48." },
    { p: "Suma 1+3+9+27+81:", o: ["121", "243", "80", "100"], c: 0, ex: "PG: 1·(3⁵−1)/(3−1) = 242/2 = 121." },
    { p: "¿2, 5, 8, 11 es PA o PG?", o: ["PA d=3", "PG r=3", "Ambas", "Ninguna"], c: 0, ex: "Suma siempre 3 → PA con d=3." },
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
            {ok === ejs.length && "🎉 Dominás sucesiones y series."}
            {ok < ejs.length && "Memorizá las 2 fórmulas de aₙ y las 2 de suma."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
