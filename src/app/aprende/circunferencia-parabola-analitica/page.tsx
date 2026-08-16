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

export default function Page() {
  return (
    <LeccionShell
      unidad="GT-10"
      tituloUnidad="Circunferencia y parábola · Geometría Analítica"
      escenas={[
        { titulo: "Circunferencia · ecuación canónica", componente: EscCircCanonica },
        { titulo: "Ecuación general de la circunferencia", componente: EscCircGeneral },
        { titulo: "De general a canónica · completar cuadrados", componente: EscCompletarCuad },
        { titulo: "Parábola · definición geométrica", componente: EscParabolaIntro },
        { titulo: "Parábola con eje vertical · y = ax² + bx + c", componente: EscParabolaVertical },
        { titulo: "Vértice y orientación de la parábola", componente: EscVertice },
        { titulo: "Aplicaciones · trayectorias y optimización", componente: EscAplicaciones },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function CircSVG({ h = 0, k = 0, r = 3 }: { h?: number; k?: number; r?: number }) {
  const xMin = -6, xMax = 6, yMin = -6, yMax = 6, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const radiusPx = ((xMax - xMin) > 0) ? (sx(r + xMin) - sx(xMin)) : 30;
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <motion.circle cx={sx(h)} cy={sy(k)} r={radiusPx}
            fill="none" stroke={LIENZO.accent} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          <circle cx={sx(h)} cy={sy(k)} r="4" fill={COLOR_OK} />
        </Ejes>
      </Pizarra>
    </div>
  );
}

function ParabolaSVG({ a = 1, b = 0, c = 0 }: { a?: number; b?: number; c?: number }) {
  const xMin = -6, xMax = 6, yMin = -2, yMax = 8, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const N = 80;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = xMin + (i / N) * (xMax - xMin);
    const y = a * x * x + b * x + c;
    if (y < yMin - 1 || y > yMax + 1) continue;
    pts.push(`${sx(x)},${sy(y)}`);
  }
  const xv = -b / (2 * a);
  const yv = a * xv * xv + b * xv + c;
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <motion.polyline points={pts.join(" ")}
            fill="none" stroke={LIENZO.accent} strokeWidth="3" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          <motion.circle cx={sx(xv)} cy={sy(yv)} r="5" fill={COLOR_OK}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
        </Ejes>
      </Pizarra>
    </div>
  );
}

function EscCircCanonica() {
  return (
    <EscenaRica>
      <Titulo>Ecuación canónica de la circunferencia</Titulo>

      <Hook>
        En el examen FCyT, las preguntas de circunferencia analítica son
        frecuentes (G10 1op-2-2025 directa). Hay que dominar el paso de
        "centro + radio" a la ecuación, y al revés.
      </Hook>

      <Definicion termino="Circunferencia">
        Conjunto de puntos del plano que están a la misma distancia (radio R)
        de un punto fijo (centro C(h, k)).
      </Definicion>

      <Resumen>
        <strong>Ecuación canónica</strong>:<br />
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          (x − h)² + (y − k)² = R²
        </span><br /><br />
        Sale de aplicar la fórmula de distancia: la distancia entre (x, y) y
        (h, k) es R.
      </Resumen>

      <CircSVG h={2} k={1} r={3} />

      <Ejemplo titulo="Circunferencias típicas">
        • Centro (0, 0), radio 5: x² + y² = 25.<br />
        • Centro (3, −2), radio 4: (x − 3)² + (y + 2)² = 16.<br />
        • Centro (h, k) genérico: (x − h)² + (y − k)² = R².
      </Ejemplo>

      <PorQue>
        La forma canónica es perfecta para "lectura directa": ves la ecuación
        y al instante sabés centro y radio. Por eso es la forma preferida para
        identificar circunferencias.
      </PorQue>
    </EscenaRica>
  );
}

function EscCircGeneral() {
  return (
    <EscenaRica>
      <Titulo>Ecuación general de la circunferencia</Titulo>

      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          x² + y² + Dx + Ey + F = 0
        </span><br /><br />
        donde D, E, F son constantes.
      </Resumen>

      <PorQue>
        Sale de desarrollar la canónica: (x−h)² + (y−k)² = R² →<br />
        x² − 2hx + h² + y² − 2ky + k² − R² = 0<br />
        x² + y² + (−2h)x + (−2k)y + (h² + k² − R²) = 0.<br /><br />
        Por tanto: D = −2h, E = −2k, F = h² + k² − R².<br /><br />
        Inversamente: h = −D/2, k = −E/2, R² = (D² + E²)/4 − F.
      </PorQue>

      <Mnemotecnia>
        <strong>Reconocer una circunferencia</strong>: si la ecuación tiene
        x², y², los coeficientes de x² e y² son iguales (típicamente 1), y NO
        tiene término xy, es una circunferencia (siempre que el radio salga
        positivo).
      </Mnemotecnia>

      <Ejemplo titulo="Forma general · identificar centro y radio">
        x² + y² − 4x + 6y − 12 = 0.<br /><br />
        D = −4 → h = −D/2 = 2.<br />
        E = 6 → k = −E/2 = −3.<br />
        F = −12 → R² = (16 + 36)/4 − (−12) = 13 + 12 = 25 → R = 5.<br /><br />
        Centro (2, −3), radio 5.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscCompletarCuad() {
  return (
    <EscenaRica>
      <Titulo>De general a canónica · completar cuadrados</Titulo>

      <Parrafo>
        Si la ecuación está en forma general, el método estándar para
        obtener centro y radio es <strong>completar cuadrados</strong>.
      </Parrafo>

      <WorkedExample titulo="Paso a paso · x² + y² − 6x + 4y − 12 = 0">
        <strong>Paso 1 · Agrupar por variable:</strong><br />
        (x² − 6x) + (y² + 4y) = 12.<br /><br />

        <strong>Paso 2 · Completar cuadrado en x:</strong><br />
        x² − 6x → faltaría +9 para ser (x − 3)². Sumamos +9 a ambos lados.<br /><br />

        <strong>Paso 3 · Completar cuadrado en y:</strong><br />
        y² + 4y → faltaría +4 para ser (y + 2)². Sumamos +4 a ambos lados.<br /><br />

        <strong>Paso 4 · Resultado:</strong><br />
        (x − 3)² + (y + 2)² = 12 + 9 + 4 = 25.<br /><br />

        Centro (3, −2), radio 5.
      </WorkedExample>

      <Mnemotecnia>
        <strong>Truco para completar cuadrado en una variable</strong>:<br />
        Si tenés x² + bx, hay que sumar (b/2)² para que sea cuadrado perfecto.
        Verificación: x² + bx + (b/2)² = (x + b/2)².<br /><br />
        Ej: x² − 8x → suma (−8/2)² = 16. Queda x² − 8x + 16 = (x − 4)².
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscParabolaIntro() {
  return (
    <EscenaRica>
      <Titulo>Parábola · definición geométrica</Titulo>

      <Definicion termino="Parábola">
        Conjunto de puntos del plano que equidistan de un punto fijo (foco) y
        una recta fija (directriz).
      </Definicion>

      <Resumen>
        <strong>Elementos</strong>:<br />
        • <strong>Foco (F)</strong>: punto fijo.<br />
        • <strong>Directriz (d)</strong>: recta fija.<br />
        • <strong>Vértice (V)</strong>: punto medio entre el foco y la
        directriz.<br />
        • <strong>Eje</strong>: recta perpendicular a la directriz que pasa por
        el foco y el vértice.
      </Resumen>

      <PorQue>
        Las parábolas aparecen en física (trayectorias parabólicas),
        ingeniería (antenas parabólicas, faros), y matemática
        (gráficas de y = ax² + bx + c). Su propiedad "óptica", que todos los
        rayos paralelos al eje rebotan al foco, la hace ideal para concentrar
        ondas.
      </PorQue>
    </EscenaRica>
  );
}

function EscParabolaVertical() {
  return (
    <EscenaRica>
      <Titulo>Parábola con eje vertical · y = ax² + bx + c</Titulo>

      <Resumen>
        <strong>Forma estándar</strong>:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          y = ax² + bx + c
        </span><br /><br />
        <strong>Forma canónica</strong> (vértice (h, k)):<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          y − k = a(x − h)²
        </span>
      </Resumen>

      <ParabolaSVG a={1} b={-4} c={3} />

      <Resumen>
        <strong>Orientación</strong>:<br />
        • Si <strong>a &gt; 0</strong>: la parábola abre hacia ARRIBA. Vértice
        es MÍNIMO.<br />
        • Si <strong>a &lt; 0</strong>: abre hacia ABAJO. Vértice es MÁXIMO.<br /><br />
        • |a| grande: parábola "angosta".<br />
        • |a| chico: parábola "ancha".
      </Resumen>

      <Resumen>
        <strong>Parábola con foco vertical (eje vertical)</strong>:<br />
        Si vértice está en (h, k) y la distancia foco-vértice = p:<br />
        • Foco: (h, k + p).<br />
        • Directriz: y = k − p.<br />
        • Ecuación: (x − h)² = 4p(y − k).
      </Resumen>
    </EscenaRica>
  );
}

function EscVertice() {
  return (
    <EscenaRica>
      <Titulo>Vértice de la parábola</Titulo>

      <Resumen>
        Para y = ax² + bx + c, el vértice es:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          x_v = −b / (2a), &nbsp; y_v = f(x_v)
        </span>
      </Resumen>

      <WorkedExample titulo="Encontrar el vértice">
        Para y = x² − 6x + 5:<br /><br />
        x_v = −(−6) / 2(1) = 3.<br />
        y_v = 9 − 18 + 5 = −4.<br /><br />
        Vértice: (3, −4). Como a = 1 &gt; 0, la parábola abre arriba; el
        vértice es un mínimo.
      </WorkedExample>

      <WorkedExample titulo="De estándar a canónica · completar cuadrados">
        y = x² − 6x + 5<br /><br />

        Agrupo: y = (x² − 6x) + 5.<br />
        Completo cuadrado: y = (x² − 6x + 9) − 9 + 5 = (x − 3)² − 4.<br /><br />

        Canónica: y + 4 = (x − 3)². Vértice: (3, −4). Mismo resultado.
      </WorkedExample>

      <Mnemotecnia>
        <strong>Eje de simetría de la parábola</strong>: la recta vertical
        x = x_v = −b/(2a). La parábola es simétrica respecto de esta recta.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscAplicaciones() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones</Titulo>

      <WorkedExample titulo="Trayectoria parabólica · física">
        Una pelota lanzada al aire sigue una trayectoria parabólica.
        h(t) = −5t² + 20t + 1.5 (h en metros, t en segundos).<br /><br />

        <strong>¿En qué momento alcanza la altura máxima?</strong><br />
        t_v = −20 / (2·(−5)) = 2 segundos.<br /><br />

        <strong>¿Cuál es la altura máxima?</strong><br />
        h(2) = −20 + 40 + 1.5 = 21.5 m.<br /><br />

        <strong>¿Cuándo toca el suelo?</strong> (h = 0)<br />
        −5t² + 20t + 1.5 = 0. Por fórmula cuadrática: t ≈ 4.07 s.
      </WorkedExample>

      <WorkedExample titulo="Optimización · maximizar ganancia">
        La ganancia (en Bs) de una venta es G(p) = −2p² + 100p − 200, donde
        p es el precio. ¿A qué precio se maximiza la ganancia?<br /><br />

        p_v = −100 / (2·(−2)) = 25.<br />
        G(25) = −1250 + 2500 − 200 = 1050 Bs.<br /><br />

        Precio óptimo: 25 Bs. Ganancia máxima: 1050 Bs.
      </WorkedExample>

      <Conexion>
        Las parábolas conectan con la <strong>física de tiro parabólico</strong>
        (Geo unidad de Física), con <strong>ecuaciones cuadráticas</strong>
        (raíces = donde la parábola corta al eje x), y con
        <strong> optimización</strong> en cálculo y economía.
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Centro de la circunferencia (x-3)² + (y+2)² = 16:",
      o: ["(3, -2)", "(-3, 2)", "(3, 2)", "(-3, -2)"],
      c: 0,
      ex: "Forma (x-h)² + (y-k)² = R² → h=3, k=-2.",
    },
    {
      p: "Radio de x² + y² - 4x + 6y - 12 = 0:",
      o: ["5", "12", "13", "√12"],
      c: 0,
      ex: "h=2, k=-3, R² = 4+9+12 = 25 → R=5.",
    },
    {
      p: "Vértice de y = x² - 8x + 13:",
      o: ["(4, -3)", "(-4, 3)", "(8, 13)", "(0, 13)"],
      c: 0,
      ex: "x_v = 8/2 = 4. y_v = 16-32+13 = -3.",
    },
    {
      p: "La parábola y = -2x² + 4x + 1 abre hacia:",
      o: ["abajo", "arriba", "izquierda", "derecha"],
      c: 0,
      ex: "a = -2 < 0 → abre hacia abajo (vértice = máximo).",
    },
    {
      p: "Ecuación de la circunferencia centro (0,0) radio 3:",
      o: ["x² + y² = 9", "x² + y² = 3", "x + y = 3", "x² - y² = 9"],
      c: 0,
      ex: "(x-0)² + (y-0)² = 3² → x² + y² = 9.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · signo del centro de circunferencia">
        En (x − h)² + (y − k)² = R², el centro es (h, k), NO (−h, −k). Si la
        ecuación es (x − 3)² + (y + 2)², el centro es (3, −2). El signo del
        paréntesis ya invierte (porque y + 2 = y − (−2)).
      </Misconception>

      <Misconception titulo="Error 2 · olvidar cuadrar el radio">
        Si la ecuación dice (x − h)² + (y − k)² = 25, el radio es 5, NO 25.
        El 25 es R².
      </Misconception>

      <Misconception titulo="Error 3 · confundir vértice de parábola con raíces">
        El vértice es UN punto (máximo o mínimo). Las raíces son los puntos
        donde la parábola corta al eje x (donde y = 0). Son distintos.
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
