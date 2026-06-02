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

// Recta numérica que sombrea la solución de una inecuación. extremo abierto
// (cículo) o cerrado (relleno) según < / ≤.
function RectaInecuacion({
  valor, sentido, cerrado, etiqueta, xMin = -6, xMax = 6,
}: {
  valor: number; sentido: "menor" | "mayor"; cerrado: boolean; etiqueta: string;
  xMin?: number; xMax?: number;
}) {
  const W = 480, H = 100, padL = 32, padR = 32, padT = 30, padB = 30;
  const sx = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const yLinea = 56;
  const xV = sx(valor);
  const shadeX1 = sentido === "menor" ? padL : xV;
  const shadeX2 = sentido === "menor" ? xV : W - padR;
  const ticks: number[] = [];
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i++) ticks.push(i);
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={H}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet" style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Sombreado solución */}
          <motion.line
            x1={shadeX1} x2={shadeX2} y1={yLinea} y2={yLinea}
            stroke={LIENZO.ok} strokeWidth="6" strokeLinecap="round"
            initial={false} animate={{ x1: shadeX1, x2: shadeX2 }} transition={{ duration: 0.4 }} />
          {/* Línea base con flechas */}
          <line x1={padL - 6} x2={W - padR + 6} y1={yLinea} y2={yLinea} stroke={LIENZO.fg} strokeWidth="1.5" />
          <polygon points={`${padL - 6},${yLinea} ${padL + 4},${yLinea - 5} ${padL + 4},${yLinea + 5}`} fill={LIENZO.fg} />
          <polygon points={`${W - padR + 6},${yLinea} ${W - padR - 4},${yLinea - 5} ${W - padR - 4},${yLinea + 5}`} fill={LIENZO.fg} />
          {/* Ticks */}
          {ticks.map((t) => (
            <g key={t}>
              <line x1={sx(t)} x2={sx(t)} y1={yLinea - 4} y2={yLinea + 4} stroke={LIENZO.fgFaint} />
              <text x={sx(t)} y={yLinea + 18} textAnchor="middle" fontSize="11" fill={LIENZO.fgFaint}>{t}</text>
            </g>
          ))}
          {/* Punto del valor */}
          <motion.circle cx={xV} cy={yLinea} r="7"
            fill={cerrado ? LIENZO.ok : "#fff"}
            stroke={LIENZO.ok} strokeWidth="2"
            initial={false} animate={{ cx: xV }} transition={{ duration: 0.4 }} />
        </svg>
      </Pizarra>
      <div style={{
        textAlign: "center", fontSize: 16, color: LIENZO.fg,
        fontFamily: "var(--font-crimson), serif", fontWeight: 500,
      }}>
        Solución: <span style={{ color: LIENZO.ok }}>{etiqueta}</span>
      </div>
    </div>
  );
}

// Animación del "truco": −2x < 6 → x > −3. El sentido se invierte al dividir
// por negativo; lo mostramos con un giro visual del operador y de la sombra.
function TrucoInversionAnim() {
  const [div, setDiv] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={120} onClick={() => setDiv((v) => !v)}>
        <div style={{
          fontFamily: "var(--font-crimson), serif", fontWeight: 500,
          fontSize: "clamp(30px, 5.5vw, 44px)", color: LIENZO.fg, textAlign: "center",
        }}>
          {!div ? (
            <span>−2x <span style={{ color: LIENZO.accent, margin: "0 0.3em" }}>&lt;</span> 6</span>
          ) : (
            <span>
              x{" "}
              <motion.span
                style={{ display: "inline-block", color: LIENZO.bad, margin: "0 0.3em" }}
                initial={{ rotate: 0, scale: 1 }} animate={{ rotate: 180, scale: 1.15 }}
                transition={{ duration: 0.5 }}
              >&lt;</motion.span>{" "}
              −3
            </span>
          )}
        </div>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic" }}>
        {!div ? "Tocá: dividimos ambos lados por −2 (negativo)" : "Al dividir por negativo el signo gira (< se vuelve >)"}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="09"
      tituloUnidad="Desigualdades e inecuaciones"
      escenas={[
        { titulo: "¿Qué es una inecuación?", componente: Esc01_Intro },
        { titulo: "Los 4 símbolos", componente: Esc02_Simbolos },
        { titulo: "Resolver lineales", componente: Esc03_Lineal },
        { titulo: "El truco del signo negativo", componente: Esc04_Negativo },
        { titulo: "Notación de intervalos", componente: Esc05_Intervalos },
        { titulo: "Inecuación cuadrática", componente: Esc06_Cuad },
        { titulo: "Errores comunes", componente: Esc07_Errores },
        { titulo: "Práctica final", componente: Esc08_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Inecuaciones: en lugar de "=" tenés "&lt;" o "&gt;"</Titulo>
      <Definicion termino="inecuación">
        Una inecuación es una <strong>desigualdad</strong> con una incógnita. En vez del
        signo "=" usás &lt;, &gt;, ≤ ó ≥. La solución típicamente es un <strong>conjunto
        infinito</strong> de valores.
      </Definicion>
      <Ejemplo>
        2x + 3 &lt; 11 — su solución es <strong>x &lt; 4</strong> (infinitos números).
      </Ejemplo>
      <Resumen>
        🎯 Aplicaciones: restricciones de presupuesto ("gasto menor que X"), rangos de
        validez de fórmulas (dominio), problemas con cotas, optimización.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Simbolos() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Los 4 símbolos</Titulo>
      <Ejemplo>
        <strong style={{ color: COLOR_EXP }}>&lt;</strong> = menor que (estricto). 3 &lt; 5 ✓ pero 5 &lt; 5 ✗.<br />
        <strong style={{ color: COLOR_OK }}>&gt;</strong> = mayor que (estricto).<br />
        <strong style={{ color: "#3b82f6" }}>≤</strong> = menor o IGUAL (incluye el valor).<br />
        <strong style={{ color: "#f59e0b" }}>≥</strong> = mayor o igual.
      </Ejemplo>
      <Cuidado>
        Atención a "estricto" (&lt;, &gt;) vs "incluye" (≤, ≥). En la solución y en intervalos
        eso cambia si el extremo va con paréntesis ( ) o con corchete [ ].
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_Lineal() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Resolver una inecuación lineal</Titulo>
      <Parrafo>
        Las reglas son las mismas que para ecuaciones, con UNA EXCEPCIÓN (la vemos en la próxima escena).
      </Parrafo>
      <Ejemplo titulo="Resolvé: 2x + 3 &lt; 11">
        <Paso n={1}>Paso el +3: 2x &lt; 11 − 3 → 2x &lt; 8.</Paso>
        <Paso n={2}>Divido por 2 (positivo, no afecta): x &lt; 4.</Paso>
        <Paso n={3}>Solución: <strong style={{ color: COLOR_OK }}>x &lt; 4</strong> (todo número menor que 4).</Paso>
      </Ejemplo>
      <RectaInecuacion valor={4} sentido="menor" cerrado={false} etiqueta="x < 4" />
      <Ejemplo titulo="Resolvé: 3x − 5 ≥ 7">
        <Paso n={1}>3x ≥ 12 → x ≥ 4.</Paso>
        <Paso n={2}>Solución: <strong style={{ color: COLOR_OK }}>x ≥ 4</strong> (4 inclusive).</Paso>
      </Ejemplo>
      <RectaInecuacion valor={4} sentido="mayor" cerrado={true} etiqueta="x ≥ 4" />
    </EscenaRica>
  );
}

function Esc04_Negativo() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>El truco: signo negativo invierte la desigualdad</Titulo>
      <Resumen>
        Cuando <strong>multiplicás o dividís por un número NEGATIVO</strong>, el sentido de la desigualdad se INVIERTE: &lt; pasa a &gt; y al revés.
      </Resumen>
      <TrucoInversionAnim />

      <Ejemplo titulo="Resolvé: −2x &lt; 6">
        <Paso n={1}>Divido por <strong>−2</strong>. Esto INVIERTE el signo.</Paso>
        <Paso n={2}>x &gt; 6/(−2) → x &gt; −3.</Paso>
        <Paso n={3}>Solución: <strong style={{ color: COLOR_OK }}>x &gt; −3</strong> (con &gt;, no &lt;).</Paso>
      </Ejemplo>

      <PorQue>
        Pensalo: 2 &lt; 3 es verdad. Multiplico ambos lados por −1: −2 y −3.
        ¿Es −2 &lt; −3? NO. Es −2 &gt; −3. El sentido se da vuelta.
      </PorQue>

      <Cuidado>
        Si solo SUMÁS o RESTÁS, NO se invierte. Tampoco si multiplicás por positivo.
        SOLO al multiplicar o dividir por NEGATIVO.
      </Cuidado>

      <AutoCheck
        pregunta="Resolvé: −3x ≥ 9"
        opciones={["x ≥ 3", "x ≤ 3", "x ≥ −3", "x ≤ −3"]}
        correctaIdx={3}
        explicacion="Divido por −3 → invierto: x ≤ 9/(−3) → x ≤ −3."
      />
    </EscenaRica>
  );
}

function Esc05_Intervalos() {
  return (
    <EscenaRica>
      <Titulo>Notación de intervalos</Titulo>
      <Parrafo>La solución de una inecuación se puede escribir como intervalo:</Parrafo>
      <Resumen>
        x &lt; 4 → (−∞, 4) — paréntesis significa "no incluye".<br />
        x ≤ 4 → (−∞, 4] — corchete significa "incluye".<br />
        x &gt; 3 → (3, +∞).<br />
        2 ≤ x &lt; 5 → [2, 5).
      </Resumen>
      <Cuidado>
        ∞ (infinito) SIEMPRE va con paréntesis ( ), nunca con corchete. No es un número
        alcanzable.
      </Cuidado>
    </EscenaRica>
  );
}

// Inecuación cuadrática: parábola con regiones positivas/negativas sombreadas
// según el signo. Las raíces parten el eje x; vemos qué intervalos cumplen
// > 0 o < 0.
function InecCuadAnim() {
  const [signo, setSigno] = useState<">" | "<">(">");
  const xMin = -4, xMax = 5, yMin = -7, yMax = 6, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const r1 = -2, r2 = 3;
  const pts: string[] = [];
  for (let k = 0; k <= 80; k++) {
    const x = xMin + (k / 80) * (xMax - xMin);
    const y = x * x - x - 6;
    if (y < yMin - 1 || y > yMax + 1) continue;
    pts.push(`${sx(x)},${sy(y)}`);
  }
  // Sombreado del eje x en los intervalos solución
  const grueso = signo === ">"
    ? [{ x1: xMin, x2: r1 }, { x1: r2, x2: xMax }]
    : [{ x1: r1, x2: r2 }];
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <polyline points={pts.join(" ")} fill="none" stroke={LIENZO.accent} strokeWidth="3" strokeLinejoin="round" />
          {[r1, r2].map((r) => (
            <circle key={r} cx={sx(r)} cy={sy(0)} r="5" fill={LIENZO.fg} />
          ))}
          {grueso.map((g, i) => (
            <motion.line key={`${signo}-${i}`}
              x1={sx(g.x1)} x2={sx(g.x2)} y1={sy(0)} y2={sy(0)}
              stroke={LIENZO.ok} strokeWidth="6" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5 }} />
          ))}
        </Ejes>
      </Pizarra>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {(["<", ">"] as const).map((s) => (
          <button key={s} onClick={() => setSigno(s)}
            style={{
              padding: "6px 16px", fontSize: 14, borderRadius: 999, cursor: "pointer",
              fontFamily: "var(--font-crimson), serif", fontWeight: 600,
              background: signo === s ? LIENZO.accent : "transparent",
              color: signo === s ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${signo === s ? LIENZO.accent : LIENZO.fgFaint}`,
            }}>
            x² − x − 6 {s} 0
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim }}>
        Solución: <b style={{ color: LIENZO.ok }}>
          {signo === ">" ? "(−∞, −2) ∪ (3, +∞)" : "(−2, 3)"}
        </b>
      </div>
    </div>
  );
}

function Esc06_Cuad() {
  return (
    <EscenaRica>
      <Titulo>Inecuaciones cuadráticas</Titulo>
      <Parrafo>
        Para resolver <strong>algo cuadrático &gt; 0</strong> (o &lt; 0):
      </Parrafo>
      <Resumen>
        1️⃣ Llevá la inecuación a la forma <strong>ax² + bx + c &gt; 0</strong> (o &lt; 0).<br />
        2️⃣ Encontrá las raíces (igualando a 0).<br />
        3️⃣ Analizá los signos del polinomio en cada intervalo definido por las raíces.<br />
        4️⃣ Tomá los intervalos que cumplan la desigualdad.
      </Resumen>

      <Ejemplo titulo="Resolvé: x² − x − 6 &gt; 0">
        <Paso n={1}>Raíces: x² − x − 6 = 0 → (x − 3)(x + 2) = 0 → x = 3 ó x = −2.</Paso>
        <Paso n={2}>3 intervalos: (−∞, −2), (−2, 3), (3, +∞).</Paso>
        <Paso n={3}>Pruebo signo en cada uno. La parábola abre hacia ↑ (a&gt;0): es positiva FUERA de las raíces.</Paso>
        <Paso n={4}>Solución: <strong style={{ color: COLOR_OK }}>x &lt; −2 ó x &gt; 3</strong>, o sea (−∞, −2) ∪ (3, +∞).</Paso>
      </Ejemplo>
      <InecCuadAnim />

      <PorQue>
        Si la parábola abre arriba: positiva fuera de raíces, negativa entre.<br />
        Si abre abajo: al revés.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Olvidar invertir al dividir por negativo. <br />
        <span style={{ fontSize: 13 }}>Lo más típico. Antes de dividir por algo negativo, marcá mentalmente "invertir signo".</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Tratar &lt; como ≤. <br />
        <span style={{ fontSize: 13 }}>x &lt; 4 NO incluye al 4. x ≤ 4 sí. Cambia el corchete del intervalo.</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> En cuadráticas, no probar signos. <br />
        <span style={{ fontSize: 13 }}>Tener las raíces no es la solución. Tenés que probar el signo del polinomio en cada intervalo.</span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "Resolvé: 3x − 9 &gt; 0", o: ["x &gt; 3", "x &lt; 3", "x &gt; 9", "x &lt; −3"], c: 0, ex: "3x > 9 → x > 3." },
    { p: "Resolvé: −2x ≤ 8", o: ["x ≤ −4", "x ≥ −4", "x ≤ 4", "x ≥ 4"], c: 1, ex: "Divido por −2, invierto: x ≥ 8/−2 = −4." },
    { p: "¿Qué intervalo es x ≤ 7?", o: ["(−∞, 7)", "(−∞, 7]", "(7, ∞]", "[7, ∞)"], c: 1, ex: "Incluye 7 → corchete. (−∞, 7]." },
    { p: "Resolvé: 5 − x &lt; 2", o: ["x &lt; 3", "x &gt; 3", "x &lt; −3", "x &gt; −3"], c: 1, ex: "−x < 2 − 5 = −3 → multiplico por −1, invierto: x > 3." },
    { p: "x² − 4 &lt; 0 ⟹", o: ["x &lt; −2 ó x &gt; 2", "−2 &lt; x &lt; 2", "x = ±2", "Sin solución"], c: 1, ex: "(x-2)(x+2)<0, parábola abre arriba, NEGATIVA entre raíces: −2 < x < 2." },
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
            {ok === ejs.length && "🎉 Dominás inecuaciones."}
            {ok < ejs.length && "Memorizá: NEGATIVO invierte el signo."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
