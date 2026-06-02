"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, Ejes, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

// Recta animada: f(x) = mx + b. Slider de m y b para probar.
function RectaInteractiva() {
  const [m, setM] = useState(2);
  const [b, setB] = useState(1);
  const xMin = -6, xMax = 6, yMin = -4, yMax = 6, alto = 280;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const x1 = xMin, x2 = xMax;
  const y1 = m * x1 + b, y2 = m * x2 + b;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <motion.line
            x1={sx(x1)} y1={sy(y1)} x2={sx(x2)} y2={sy(y2)}
            stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round"
            initial={false} animate={{ x1: sx(x1), y1: sy(y1), x2: sx(x2), y2: sy(y2) }}
            transition={{ duration: 0.3 }}
          />
          {/* Punto donde corta el eje y (0, b) */}
          <motion.circle cx={sx(0)} cy={sy(b)} r="5" fill={LIENZO.ok}
            animate={{ cx: sx(0), cy: sy(b) }} transition={{ duration: 0.3 }} />
        </Ejes>
      </Pizarra>
      <div style={{
        fontFamily: "var(--font-crimson), serif", fontWeight: 500,
        fontSize: 22, color: LIENZO.fg, textAlign: "center",
      }}>
        f(x) = <span style={{ color: LIENZO.accent }}>{m}</span>x {b >= 0 ? "+" : "−"} <span style={{ color: LIENZO.ok }}>{Math.abs(b)}</span>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          Pendiente m = <strong style={{ color: LIENZO.accent }}>{m}</strong>
          <input type="range" min={-3} max={3} step={0.5} value={m}
            onChange={(e) => setM(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: LIENZO.accent }} />
        </label>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          Ordenada al origen b = <strong style={{ color: LIENZO.ok }}>{b}</strong>
          <input type="range" min={-3} max={4} step={0.5} value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: LIENZO.ok }} />
        </label>
      </div>
    </div>
  );
}

// Parábola interactiva: vértice marcado, ejes de simetría, abre arriba/abajo.
function ParabolaInteractiva() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-4);
  const [c, setC] = useState(3);
  const xMin = -2, xMax = 6, yMin = -2, yMax = 6, alto = 280;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  // Vértice
  const xv = a !== 0 ? -b / (2 * a) : 0;
  const yv = a * xv * xv + b * xv + c;
  // Puntos de la curva
  const N = 80;
  const puntos: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = a * x * x + b * x + c;
    if (y < yMin - 1 || y > yMax + 1) continue;
    puntos.push(`${sx(x)},${sy(y)}`);
  }
  const path = puntos.join(" ");
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          {/* Eje de simetría */}
          <motion.line
            x1={sx(xv)} x2={sx(xv)} y1={16} y2={alto - 24}
            stroke={LIENZO.fgFaint} strokeWidth="1" strokeDasharray="3 4"
            animate={{ x1: sx(xv), x2: sx(xv) }} transition={{ duration: 0.3 }}
          />
          {/* Curva */}
          <motion.polyline
            points={path} fill="none" stroke={LIENZO.accent} strokeWidth="3"
            strokeLinejoin="round" strokeLinecap="round"
            initial={false} animate={{ points: path }} transition={{ duration: 0.3 }}
          />
          {/* Vértice */}
          <motion.circle cx={sx(xv)} cy={sy(yv)} r="6" fill={LIENZO.ok}
            animate={{ cx: sx(xv), cy: sy(yv) }} transition={{ duration: 0.3 }} />
          <motion.text fontSize="11" fill={LIENZO.ok} fontWeight="600"
            animate={{ x: sx(xv) + 9, y: sy(yv) - 6 }} transition={{ duration: 0.3 }}>
            ({xv.toFixed(1)}, {yv.toFixed(1)})
          </motion.text>
        </Ejes>
      </Pizarra>
      <div style={{
        fontFamily: "var(--font-crimson), serif", fontWeight: 500,
        fontSize: 22, color: LIENZO.fg, textAlign: "center",
      }}>
        f(x) = <span style={{ color: a > 0 ? LIENZO.accent : LIENZO.bad }}>{a}</span>x²
        {" "}{b >= 0 ? "+" : "−"} {Math.abs(b)}x
        {" "}{c >= 0 ? "+" : "−"} {Math.abs(c)}
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          a = <strong>{a}</strong> {a > 0 ? "(abre ↑, tiene mínimo)" : a < 0 ? "(abre ↓, tiene máximo)" : ""}
          <input type="range" min={-2} max={2} step={0.5} value={a}
            onChange={(e) => setA(parseFloat(e.target.value) || 0.01)}
            style={{ width: "100%", accentColor: LIENZO.accent }} />
        </label>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          b = <strong>{b}</strong>
          <input type="range" min={-6} max={6} step={1} value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: LIENZO.accent }} />
        </label>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          c = <strong>{c}</strong>
          <input type="range" min={-4} max={6} step={1} value={c}
            onChange={(e) => setC(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: LIENZO.accent }} />
        </label>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="04"
      tituloUnidad="Función lineal y cuadrática"
      escenas={[
        { titulo: "¿Qué es una función?", componente: Esc01_Intro },
        { titulo: "Función lineal: la recta", componente: Esc02_Lineal },
        { titulo: "Pendiente e intersección", componente: Esc03_PendOrd },
        { titulo: "Función cuadrática: la parábola", componente: Esc04_Cuad },
        { titulo: "Vértice y eje", componente: Esc05_Vertice },
        { titulo: "Raíces (ceros) de la parábola", componente: Esc06_Raices },
        { titulo: "Aplicación: maximizar/minimizar", componente: Esc07_Opt },
        { titulo: "Errores comunes", componente: Esc08_Errores },
        { titulo: "Práctica final", componente: Esc09_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Funciones: una máquina input → output</Titulo>
      <Definicion termino="función">
        Una <strong>función</strong> es una regla que a cada <strong>x</strong> le asigna
        EXACTAMENTE UN <strong>y</strong>. Escribimos y = f(x).
      </Definicion>
      <Ejemplo>
        f(x) = 2x + 1: a x = 3 le asigna y = 7. A x = 0 le asigna y = 1.
      </Ejemplo>
      <Resumen>
        En esta lección vas a ver las DOS funciones más importantes: <strong>lineal</strong>
        (recta) y <strong>cuadrática</strong> (parábola).
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Lineal() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Función lineal</Titulo>
      <Definicion termino="función lineal">
        Forma general: <strong>f(x) = mx + b</strong>. Su gráfica es una <strong>recta</strong>.
      </Definicion>
      <Ejemplo>
        f(x) = 2x + 3 — recta de pendiente 2, corta el eje y en (0, 3).<br />
        f(x) = −x + 5 — pendiente negativa (baja), corta en (0, 5).
      </Ejemplo>
      <RectaInteractiva />
      <Parrafo>
        Movés <strong>m</strong> y la recta cambia su inclinación; movés <strong>b</strong> y sube o baja
        manteniendo la inclinación. El punto verde es donde corta al eje y.
      </Parrafo>
      <Resumen>
        Solo necesitás <strong>2 puntos</strong> para graficar una recta. Tabla:
        elegís 2 valores de x, calculás los y, marcás y unís.
      </Resumen>
    </EscenaRica>
  );
}

function Esc03_PendOrd() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">m (pendiente) y b (ordenada al origen)</Titulo>
      <Resumen>
        <strong>m = pendiente</strong>: indica la inclinación.<br />
        • m &gt; 0: la recta sube.<br />
        • m &lt; 0: baja.<br />
        • m = 0: recta horizontal.<br /><br />
        <strong>b = ordenada al origen</strong>: el valor de y cuando x = 0. Es donde la recta corta al eje y.
      </Resumen>
      <Ejemplo titulo="Calcular m entre dos puntos (x₁, y₁), (x₂, y₂)">
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          m = (y₂ − y₁) / (x₂ − x₁)
        </span><br />
        Ejemplo: entre (1, 3) y (4, 9): m = (9−3)/(4−1) = 2.
      </Ejemplo>
      <PorQue>
        m representa "cuántas unidades sube y cuando x sube 1". También se conoce como
        "tasa de cambio" en economía y física.
      </PorQue>
    </EscenaRica>
  );
}

function Esc04_Cuad() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>Función cuadrática</Titulo>
      <Definicion termino="función cuadrática">
        Forma general: <strong>f(x) = ax² + bx + c</strong>, con a ≠ 0. Su gráfica es
        una <strong>parábola</strong>.
      </Definicion>
      <Resumen>
        • Si <strong>a &gt; 0</strong>: la parábola abre hacia ↑ (tiene mínimo).<br />
        • Si <strong>a &lt; 0</strong>: abre hacia ↓ (tiene máximo).<br />
        • Es simétrica respecto a un eje vertical.
      </Resumen>
      <Ejemplo>
        f(x) = x² es la parábola "base", con vértice en (0,0), abre arriba.<br />
        f(x) = −2x² + 4x − 1 abre abajo.
      </Ejemplo>
      <ParabolaInteractiva />
      <Parrafo>
        Probá cambiar <strong>a, b, c</strong>: cambia la abertura, se mueve y el vértice (punto verde)
        se reubica solo. La línea punteada es el eje de simetría.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc05_Vertice() {
  return (
    <EscenaRica>
      <Titulo>El vértice de la parábola</Titulo>
      <Parrafo>
        El <strong>vértice</strong> es el punto más alto o más bajo de la parábola.
        Es esencial para optimizar.
      </Parrafo>
      <Resumen>
        Para f(x) = ax² + bx + c:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          x<sub>v</sub> = −b / (2a)
        </span><br />
        y<sub>v</sub> se calcula sustituyendo x<sub>v</sub> en f.
      </Resumen>
      <Ejemplo titulo="f(x) = x² − 4x + 3">
        <Paso n={1}>x<sub>v</sub> = 4/2 = 2.</Paso>
        <Paso n={2}>y<sub>v</sub> = f(2) = 4 − 8 + 3 = −1.</Paso>
        <Paso n={3}>Vértice: <strong style={{ color: COLOR_OK }}>(2, −1)</strong>.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc06_Raices() {
  return (
    <EscenaRica>
      <Titulo>Raíces (ceros) de la parábola</Titulo>
      <Parrafo>
        Las <strong>raíces</strong> son los valores de x donde la parábola toca el eje x (donde y = 0).
        Se calculan resolviendo ax² + bx + c = 0 (con la fórmula cuadrática).
      </Parrafo>
      <Ejemplo titulo="f(x) = x² − 5x + 6">
        Resolvés: x² − 5x + 6 = 0 → x = 2 ó x = 3. La parábola corta al eje x en (2, 0) y (3, 0).
      </Ejemplo>
      <Cuidado>
        Según el discriminante hay 0, 1 o 2 raíces (la parábola puede no tocar al eje, tocarlo en un punto, o cortarlo en dos).
      </Cuidado>
    </EscenaRica>
  );
}

function Esc07_Opt() {
  return (
    <EscenaRica>
      <Titulo>Aplicación: maximizar/minimizar</Titulo>
      <Parrafo>
        En economía, querés MAXIMIZAR la ganancia o MINIMIZAR el costo. Cuando esos son
        cuadráticos, el óptimo está en el <strong>vértice</strong>.
      </Parrafo>
      <Ejemplo titulo="Maximizar ganancia: G(x) = −x² + 100x − 1000">
        <Paso n={1}>a = −1, b = 100. Como a &lt; 0, abre abajo: tiene MÁXIMO.</Paso>
        <Paso n={2}>x<sub>v</sub> = −100/(−2) = 50.</Paso>
        <Paso n={3}>G(50) = −2500 + 5000 − 1000 = 1500.</Paso>
        <Paso n={4}>Producir 50 unidades maximiza la ganancia en 1500.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc08_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Confundir el signo de m. <br />
        <span style={{ fontSize: 13 }}>Si m &gt; 0 sube. Si m &lt; 0 baja. La intuición visual ayuda.</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Usar x<sub>v</sub> = b/(2a) en vez de −b/(2a). <br />
        <span style={{ fontSize: 13 }}>Es −b, ¡con el menos!</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> Olvidar verificar si la parábola tiene MAX o MIN. <br />
        <span style={{ fontSize: 13 }}>Si a &gt; 0 → mínimo en el vértice. Si a &lt; 0 → máximo.</span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc09_Practica() {
  const ejs = useMemo(() => [
    { p: "f(x)=3x-2. ¿f(4)?", o: ["10", "14", "12", "6"], c: 0, ex: "f(4) = 12 − 2 = 10." },
    { p: "Pendiente entre (1,2) y (5,10):", o: ["2", "8", "4", "1/2"], c: 0, ex: "m = (10−2)/(5−1) = 8/4 = 2." },
    { p: "Vértice de f(x)=x²−6x+5:", o: ["(3, -4)", "(-3, 32)", "(6, 5)", "(3, 5)"], c: 0, ex: "xv = 6/2 = 3. yv = 9 − 18 + 5 = −4." },
    { p: "Raíces de x² − 5x + 6:", o: ["2 y 3", "1 y 6", "-2 y -3", "5 y 6"], c: 0, ex: "Factorización (x−2)(x−3)." },
    { p: "f(x)=−x²+4x. ¿Tiene max o min?", o: ["Min", "Max", "Ninguno", "Ambos"], c: 1, ex: "a=−1<0 → abre abajo → MAX." },
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
            {ok === ejs.length && "🎉 Dominás funciones lineal y cuadrática."}
            {ok < ejs.length && "Repasá pendiente, vértice y raíces."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
