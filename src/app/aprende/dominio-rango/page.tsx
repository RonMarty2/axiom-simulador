"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, Ejes, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

// Proyección dominio/rango: dibuja y = x², luego "proyecta" verticalmente a x
// (dominio = todos los reales) y horizontalmente a y (rango = y ≥ 0).
function ProyeccionDomRango() {
  const [paso, setPaso] = useState(0);
  const xMin = -4, xMax = 4, yMin = -1.5, yMax = 5, alto = 300;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  // curva y = x²
  const N = 60, pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = x * x;
    if (y > yMax + 0.5) continue;
    pts.push(`${sx(x)},${sy(y)}`);
  }
  const muestrasX = [-3, -2, -1, 1, 2, 3];
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto} onClick={() => setPaso((p) => (p < 2 ? p + 1 : 0))}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          {/* Curva */}
          <polyline points={pts.join(" ")} fill="none" stroke={LIENZO.accent} strokeWidth="3" strokeLinejoin="round" />
          {/* Sombras de proyección al eje X (dominio) */}
          {paso >= 1 && muestrasX.map((x) => {
            const y = x * x;
            return (
              <motion.line key={`px${x}`}
                x1={sx(x)} y1={sy(y)} x2={sx(x)} y2={sy(0)}
                stroke={LIENZO.ok} strokeWidth="1" strokeDasharray="3 3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * Math.abs(x) }} />
            );
          })}
          {paso >= 1 && (
            <motion.line
              x1={sx(xMin)} x2={sx(xMax)} y1={sy(0)} y2={sy(0)}
              stroke={LIENZO.ok} strokeWidth="4" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          )}
          {/* Sombras de proyección al eje Y (rango) */}
          {paso >= 2 && [0.5, 1, 2, 3, 4].map((y) => {
            const x = Math.sqrt(y);
            return (
              <motion.line key={`py${y}`}
                x1={sx(x)} y1={sy(y)} x2={sx(0)} y2={sy(y)}
                stroke={LIENZO.bad} strokeWidth="1" strokeDasharray="3 3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 * y }} />
            );
          })}
          {paso >= 2 && (
            <motion.line
              x1={sx(0)} x2={sx(0)} y1={sy(0)} y2={sy(yMax)}
              stroke={LIENZO.bad} strokeWidth="4" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
          )}
        </Ejes>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim, minHeight: 22 }}>
        {paso === 0 && <span style={{ fontStyle: "italic", color: LIENZO.fgFaint }}>Toca: proyectamos la curva a los ejes</span>}
        {paso === 1 && <span>Sombra sobre <b style={{ color: LIENZO.ok }}>eje X</b>: <b style={{ color: LIENZO.ok }}>dominio = ℝ</b> (todos los x sirven)</span>}
        {paso === 2 && <span>Sombra sobre <b style={{ color: LIENZO.bad }}>eje Y</b>: <b style={{ color: LIENZO.bad }}>rango = [0, ∞)</b> (los y son ≥ 0)</span>}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="04"
      tituloUnidad="Dominio, rango y gráfica"
      escenas={[
        { titulo: "Dominio y rango: qué son", componente: Esc01_Intro },
        { titulo: "Dominio: restricciones típicas", componente: Esc02_Restricciones },
        { titulo: "División por cero", componente: Esc03_Div },
        { titulo: "Raíz par", componente: Esc04_Raiz },
        { titulo: "Logaritmo", componente: Esc05_Log },
        { titulo: "Rango: leerlo del gráfico", componente: Esc06_Rango },
        { titulo: "Errores comunes", componente: Esc07_Errores },
        { titulo: "Práctica final", componente: Esc08_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Dominio y rango</Titulo>
      <Definicion termino="dominio">
        Conjunto de TODOS los valores que x puede tomar: los inputs válidos.
      </Definicion>
      <Definicion termino="rango (o imagen)">
        Conjunto de TODOS los valores que f(x) puede dar: los outputs posibles.
      </Definicion>
      <Ejemplo>
        f(x) = x²: Dominio = ℝ (cualquier x). Rango = [0, +∞) (los y son no-negativos).
      </Ejemplo>
      <ProyeccionDomRango />
      <Resumen>
        Dominio se lee en el <strong>eje X</strong>. Rango se lee en el <strong>eje Y</strong>.
      </Resumen>

      <Hook>
        Calcular el dominio aparece en <strong>2-3 preguntas del UMSS</strong>. Es una de las
        preguntas con respuesta más rápida: si identificas las 3 restricciones típicas
        (denominador, raíz par, log), resuelves cualquier dominio en 15 segundos.
      </Hook>

      <Mnemotecnia>
        <strong>Truco de los ejes "X-Y"</strong>:<br />
        <strong>D</strong>ominio → eje <strong>X</strong> ("D" tiene la "x" en el alfabeto
        más cerca).<br />
        <strong>R</strong>ango → eje <strong>Y</strong>.<br />
        Otro: dominio = "entradas" (lo que pongo), rango = "salidas" (lo que sale).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_Restricciones() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>¿Qué reduce el dominio?</Titulo>
      <Resumen>
        Tres situaciones típicas que excluyen valores de x:<br />
        🚫 <strong>División por cero</strong>: el denominador no puede ser 0.<br />
        🚫 <strong>Raíz de índice par</strong>: el radicando debe ser ≥ 0.<br />
        🚫 <strong>Logaritmo</strong>: el argumento debe ser &gt; 0.
      </Resumen>
      <Parrafo>
        Si tu función NO tiene ninguna de estas, el dominio es <strong>todos los reales</strong>.
      </Parrafo>

      <Mnemotecnia>
        <strong>"D-R-L" · las 3 restricciones del dominio</strong>:<br />
        <strong>D</strong>enominador (≠ 0) ·
        <strong> R</strong>aíz par (radicando ≥ 0) ·
        <strong> L</strong>og (argumento &gt; 0).<br /><br />
        En el examen siempre escaneá la fórmula buscando estos 3 elementos. Si no hay
        ninguno → dominio = ℝ. Si hay varios, intersecas las condiciones.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// Hipérbola y = 1/(x-3) con asíntota vertical en x=3. El gráfico se rompe
// justo donde el denominador se anula → ese valor sale del dominio.
function AsintotaAnim() {
  const xMin = -3, xMax = 9, yMin = -4, yMax = 4, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const corte = 3;
  const left: string[] = [];
  const right: string[] = [];
  for (let k = 0; k <= 80; k++) {
    const x = xMin + (k / 80) * (corte - 0.1 - xMin);
    const y = 1 / (x - corte);
    if (y > yMin && y < yMax) left.push(`${sx(x)},${sy(y)}`);
  }
  for (let k = 0; k <= 80; k++) {
    const x = corte + 0.1 + (k / 80) * (xMax - corte - 0.1);
    const y = 1 / (x - corte);
    if (y > yMin && y < yMax) right.push(`${sx(x)},${sy(y)}`);
  }
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <motion.line x1={sx(corte)} x2={sx(corte)} y1={16} y2={alto - 24}
            stroke={LIENZO.bad} strokeWidth="2" strokeDasharray="5 5"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
          <polyline points={left.join(" ")} fill="none" stroke={LIENZO.accent} strokeWidth="3" strokeLinejoin="round" />
          <polyline points={right.join(" ")} fill="none" stroke={LIENZO.accent} strokeWidth="3" strokeLinejoin="round" />
          {/* circulito hueco en x=3 sobre el eje x */}
          <motion.circle cx={sx(corte)} cy={sy(0)} r="6" fill="#fff"
            stroke={LIENZO.bad} strokeWidth="2.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: "spring" }} />
          <text x={sx(corte) + 8} y={sy(0) + 18} fontSize="12" fill={LIENZO.bad} fontWeight="600">x ≠ 3</text>
        </Ejes>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim }}>
        f(x) = 1 / (x − 3). La línea punteada es la <b style={{ color: LIENZO.bad }}>asíntota</b>: el dominio EXCLUYE x = 3.
      </div>
    </div>
  );
}

function Esc03_Div() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Restricción 1: división por cero</Titulo>
      <Parrafo>
        Si tu función tiene la forma f(x) = N(x)/D(x), buscas los valores de x que
        anulan D(x) y los EXCLUYES del dominio.
      </Parrafo>
      <Ejemplo titulo="f(x) = 1 / (x − 3)">
        <Paso n={1}>D(x) = x − 3 se anula en x = 3.</Paso>
        <Paso n={2}>Dominio: <strong style={{ color: COLOR_OK }}>x ≠ 3</strong>, o ℝ − {`{3}`}.</Paso>
      </Ejemplo>
      <AsintotaAnim />
      <Ejemplo titulo="f(x) = (x+1)/(x² − 9)">
        <Paso n={1}>x² − 9 = (x−3)(x+3) = 0 cuando x = 3 ó x = −3.</Paso>
        <Paso n={2}>Dominio: ℝ − {`{−3, 3}`}.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_Raiz() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Restricción 2: raíz de índice par</Titulo>
      <Parrafo>
        Para √, ⁴√, ⁶√, … el radicando DEBE ser ≥ 0. Para índices impares (³√, ⁵√…) no hay restricción.
      </Parrafo>
      <Ejemplo titulo="f(x) = √(x − 5)">
        <Paso n={1}>x − 5 ≥ 0 → x ≥ 5.</Paso>
        <Paso n={2}>Dominio: <strong style={{ color: COLOR_OK }}>[5, +∞)</strong>.</Paso>
      </Ejemplo>
      <Ejemplo titulo="f(x) = √(9 − x²)">
        <Paso n={1}>9 − x² ≥ 0 → x² ≤ 9 → −3 ≤ x ≤ 3.</Paso>
        <Paso n={2}>Dominio: <strong style={{ color: COLOR_OK }}>[−3, 3]</strong>.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05_Log() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Restricción 3: logaritmo</Titulo>
      <Parrafo>
        El argumento de un log debe ser <strong>positivo</strong> (estrictamente &gt; 0, NO ≥).
      </Parrafo>
      <Ejemplo titulo="f(x) = log(x − 2)">
        <Paso n={1}>x − 2 &gt; 0 → x &gt; 2.</Paso>
        <Paso n={2}>Dominio: <strong style={{ color: COLOR_OK }}>(2, +∞)</strong>.</Paso>
      </Ejemplo>
      <Cuidado>
        El log NO incluye el valor donde el argumento es 0. Por eso paréntesis ( y no corchete [.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_Rango() {
  return (
    <EscenaRica>
      <Titulo>Encontrar el rango</Titulo>
      <Parrafo>
        El rango se mira en el eje y. Truco: lee la gráfica de izquierda a derecha y
        anota los valores de y que aparecen.
      </Parrafo>
      <Ejemplo>
        <strong>f(x) = x²</strong>: y nunca es negativo. Rango = [0, +∞).<br />
        <strong>f(x) = mx + b</strong> con m ≠ 0: la recta cubre todos los y. Rango = ℝ.<br />
        <strong>f(x) = √x</strong>: y ≥ 0. Rango = [0, +∞).<br />
        <strong>f(x) = 1/x</strong>: y ≠ 0. Rango = ℝ − {`{0}`}.
      </Ejemplo>
      <PorQue>
        Para funciones cuadráticas: si abre arriba, rango = [y<sub>v</sub>, +∞). Si abre
        abajo, rango = (−∞, y<sub>v</sub>].
      </PorQue>
    </EscenaRica>
  );
}

function Esc07_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        Olvidar revisar que el denominador no se anule.
      </Cuidado>
      <Cuidado>
        Pensar que √ acepta cualquier x. NO: el radicando debe ser ≥ 0.
      </Cuidado>
      <Cuidado>
        Confundir dominio con rango. Dominio = X. Rango = Y.
      </Cuidado>

      <WorkedExample titulo="Función con MÚLTIPLES restricciones · f(x) = √(x−2) / (x−5)">
        Esta función tiene <strong>2 restricciones a la vez</strong>: raíz par y denominador.
        Hay que aplicar ambas.<br /><br />

        <strong>Restricción 1 · raíz:</strong> x − 2 ≥ 0 → <strong>x ≥ 2</strong>.<br /><br />

        <strong>Restricción 2 · denominador:</strong> x − 5 ≠ 0 → <strong>x ≠ 5</strong>.<br /><br />

        <strong>Intersección:</strong> ambas se deben cumplir simultáneamente:<br />
        Dominio = <strong>{`{ x ∈ ℝ : x ≥ 2 y x ≠ 5 }`} = [2, 5) ∪ (5, +∞)</strong>.<br /><br />

        <strong>Sentido gráfico:</strong> la función existe desde x = 2 hacia la derecha,
        pero tiene un "hueco" en x = 5 (asíntota vertical).<br /><br />

        <strong>Regla general:</strong> con múltiples restricciones, escribes cada una y
        después <em>intersecas</em>. Nunca olvides la condición más restrictiva.
      </WorkedExample>

      <Misconception titulo="Raíz cúbica vs raíz cuadrada">
        <strong>√(x − 4)</strong>: índice par → x − 4 ≥ 0 → x ≥ 4.<br />
        <strong>³√(x − 4)</strong>: índice IMPAR → SIN restricción → dominio = ℝ.<br /><br />
        Las raíces impares (³√, ⁵√, ⁷√…) aceptan números negativos. Solo las pares (√, ⁴√,
        ⁶√…) requieren radicando ≥ 0.
      </Misconception>

      <Conexion>
        Dominio y rango conectan con: <strong>Inecuaciones</strong> (para resolver las
        restricciones), <strong>Funciones lineales/cuadráticas</strong> (cada una tiene su
        dominio y rango característicos), <strong>Logaritmación y radicación</strong> (que
        imponen restricciones), y <strong>Cálculo</strong> (donde el dominio define dónde la
        función es derivable).
      </Conexion>
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "Dominio de f(x) = 1/(x+5):", o: ["ℝ", "x ≠ −5", "x ≠ 5", "x ≥ −5"], c: 1, ex: "x+5 ≠ 0 → x ≠ −5." },
    { p: "Dominio de f(x) = √(x − 4):", o: ["x &gt; 4", "x ≥ 4", "x &lt; 4", "ℝ"], c: 1, ex: "x − 4 ≥ 0 → x ≥ 4." },
    { p: "Dominio de log(x + 1):", o: ["x &gt; −1", "x ≥ −1", "x ≠ −1", "ℝ"], c: 0, ex: "x+1 > 0 → x > −1." },
    { p: "Rango de f(x) = x² + 2:", o: ["[2, ∞)", "ℝ", "(−∞, 2]", "[0, ∞)"], c: 0, ex: "Mínimo en y=2 (vértice). Abre arriba: [2, ∞)." },
    { p: "Dominio de f(x) = 1/(x² − 1):", o: ["ℝ", "x ≠ 1", "x ≠ ±1", "x ≥ 1"], c: 2, ex: "x²−1 = 0 → x = ±1. Excluyo ambos." },
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
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: e.p }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c; const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{ padding: "10px 14px", background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)", border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`, borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer", fontFamily: "var(--font-crimson), serif", textAlign: "left" }}
                    dangerouslySetInnerHTML={{ __html: op + (rev && isOk ? " ✓" : "") + (rev && isSel && !isOk ? " ✗" : "") }} />
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
            {ok === ejs.length && "🎉 Dominas dominio y rango."}
            {ok < ejs.length && "Relee las 3 restricciones (div, raíz par, log)."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
