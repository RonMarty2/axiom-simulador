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
      unidad="GT-09"
      tituloUnidad="Ecuación analítica de la recta"
      escenas={[
        { titulo: "Sistema cartesiano · distancia y punto medio", componente: EscCartesiano },
        { titulo: "Pendiente de una recta", componente: EscPendiente },
        { titulo: "Ecuación punto-pendiente", componente: EscPuntoPend },
        { titulo: "Forma pendiente-ordenada (y = mx + b)", componente: EscPendOrd },
        { titulo: "Ecuación general (Ax + By + C = 0)", componente: EscGeneral },
        { titulo: "Distancia de un punto a una recta", componente: EscDistancia },
        { titulo: "Rectas paralelas y perpendiculares", componente: EscParalelas },
        { titulo: "Ángulo entre rectas", componente: EscAngulo },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function RectaSVG({ m = 1, b = 0 }: { m?: number; b?: number }) {
  const xMin = -6, xMax = 6, yMin = -6, yMax = 6, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={alto}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <motion.line
            x1={sx(xMin)} y1={sy(m * xMin + b)} x2={sx(xMax)} y2={sy(m * xMax + b)}
            stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
          <motion.circle cx={sx(0)} cy={sy(b)} r="5" fill={COLOR_OK}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
        </Ejes>
      </Pizarra>
    </div>
  );
}

function EscCartesiano() {
  return (
    <EscenaRica>
      <Titulo>Sistema cartesiano · puntos en el plano</Titulo>

      <Hook>
        Geometría analítica = álgebra aplicada a la geometría. Cada figura
        geométrica se vuelve una ecuación. En el examen FCyT aparece la
        ecuación de la recta, distancia punto-recta, ecuación de la
        circunferencia tangente a una recta. Todas vienen de aquí.
      </Hook>

      <Definicion termino="Distancia entre dos puntos">
        Dados P₁(x₁, y₁) y P₂(x₂, y₂):<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          d = √((x₂ − x₁)² + (y₂ − y₁)²)
        </span><br /><br />
        Es Pitágoras aplicado al rectángulo que forman los dos puntos en el
        plano.
      </Definicion>

      <Definicion termino="Punto medio">
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
        </span><br /><br />
        Promedio de las coordenadas.
      </Definicion>

      <Ejemplo titulo="Distancia entre (1, 2) y (4, 6)">
        d = √((4−1)² + (6−2)²) = √(9 + 16) = √25 = 5.
      </Ejemplo>

      <Ejemplo titulo="Punto medio entre (1, 2) y (4, 6)">
        M = ((1+4)/2, (2+6)/2) = (2.5, 4).
      </Ejemplo>
    </EscenaRica>
  );
}

function EscPendiente() {
  return (
    <EscenaRica>
      <Titulo>Pendiente · m</Titulo>

      <Definicion termino="Pendiente">
        Razón de cambio vertical sobre cambio horizontal entre dos puntos
        cualesquiera de la recta:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          m = (y₂ − y₁) / (x₂ − x₁) = Δy / Δx
        </span>
      </Definicion>

      <Resumen>
        <strong>Significado geométrico</strong>:<br />
        • m &gt; 0: la recta sube (de izquierda a derecha).<br />
        • m &lt; 0: la recta baja.<br />
        • m = 0: recta horizontal.<br />
        • m no definida (denominador 0): recta vertical (x = constante).
      </Resumen>

      <RectaSVG m={2} b={1} />

      <Definicion termino="Pendiente y ángulo">
        Si θ es el ángulo que forma la recta con el eje x positivo:<br />
        <strong>m = tan θ</strong>.<br /><br />
        Por eso una recta horizontal (θ = 0) tiene m = 0, y una recta a 45°
        tiene m = 1.
      </Definicion>

      <Ejemplo titulo="Pendiente entre (1, 2) y (4, 8)">
        m = (8 − 2) / (4 − 1) = 6/3 = 2.<br />
        La recta sube 2 unidades por cada unidad horizontal.
      </Ejemplo>

      <Mnemotecnia>
        <strong>Truco para no confundir Δy / Δx</strong>:<br />
        • Arriba va la <em>diferencia de y</em> (vertical).<br />
        • Abajo va la <em>diferencia de x</em> (horizontal).<br /><br />
        Pendiente = "subida / corrida" en inglés (rise / run). En español:
        "subida sobre corrida".
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPuntoPend() {
  return (
    <EscenaRica>
      <Titulo>Forma punto-pendiente</Titulo>

      <Resumen>
        Si conoces UN punto P₀(x₀, y₀) y la pendiente m:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          y − y₀ = m(x − x₀)
        </span>
      </Resumen>

      <WorkedExample titulo="Recta por (3, 5) con pendiente −2">
        y − 5 = −2(x − 3)<br />
        y − 5 = −2x + 6<br />
        <strong>y = −2x + 11</strong>.
      </WorkedExample>

      <WorkedExample titulo="Recta por dos puntos (1, 2) y (4, 8)">
        <strong>Paso 1 · Pendiente:</strong> m = (8−2)/(4−1) = 2.<br /><br />

        <strong>Paso 2 · Forma punto-pendiente</strong> (uso el punto (1, 2)):<br />
        y − 2 = 2(x − 1)<br />
        y = 2x − 2 + 2 = 2x.<br /><br />

        <strong>Verificación con el otro punto:</strong> y = 2(4) = 8 ✓.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPendOrd() {
  return (
    <EscenaRica>
      <Titulo>Forma pendiente-ordenada (y = mx + b)</Titulo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          y = mx + b
        </span><br /><br />
        • <strong>m</strong>: pendiente.<br />
        • <strong>b</strong>: ordenada al origen (donde la recta corta al eje y).
      </Resumen>

      <PorQue>
        Esta forma se llama "pendiente-ordenada" porque lee directamente m y b
        de la ecuación. Es la forma más útil para graficar: marcas (0, b) en
        el eje y, y de ahí trazas con pendiente m.
      </PorQue>

      <Ejemplo titulo="Identificar m y b">
        • y = 3x − 4: m = 3, b = −4.<br />
        • y = −x/2 + 7: m = −1/2, b = 7.<br />
        • y = 5: m = 0, b = 5 (recta horizontal).
      </Ejemplo>

      <Cuidado>
        Si la ecuación viene en forma general (Ax + By + C = 0), tienes que
        despejar y para llevarla a y = mx + b: y = (−A/B)x + (−C/B). Entonces
        m = −A/B y b = −C/B.
      </Cuidado>
    </EscenaRica>
  );
}

function EscGeneral() {
  return (
    <EscenaRica>
      <Titulo>Forma general · Ax + By + C = 0</Titulo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          Ax + By + C = 0
        </span><br /><br />
        Esta forma sirve para CUALQUIER recta, incluso las verticales (que no
        se pueden escribir como y = mx + b).
      </Resumen>

      <PorQue>
        La forma general tiene la ventaja de tratar a x e y simétricamente. Es
        la que se usa cuando prefieres NO calcular pendiente (por ejemplo, para
        rectas verticales: x = 3 se escribe como 1x + 0y − 3 = 0).
      </PorQue>

      <Ejemplo titulo="Pasar de y = mx + b a general">
        y = 3x − 5 → 3x − y − 5 = 0 (con A=3, B=−1, C=−5).
      </Ejemplo>

      <Ejemplo titulo="Pasar de general a pendiente-ordenada">
        2x + 3y − 6 = 0<br />
        3y = −2x + 6<br />
        y = (−2/3)x + 2.<br />
        Entonces m = −2/3, b = 2.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscDistancia() {
  return (
    <EscenaRica>
      <Titulo>Distancia de un punto a una recta</Titulo>

      <Resumen>
        Dada la recta <strong>Ax + By + C = 0</strong> y el punto P(x₀, y₀):<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          d = |A·x₀ + B·y₀ + C| / √(A² + B²)
        </span><br /><br />
        • El numerador es el valor absoluto de "sustituir el punto en la
        ecuación".<br />
        • El denominador es la raíz cuadrada de los cuadrados de los
        coeficientes (sin C).
      </Resumen>

      <WorkedExample titulo="Caso clásico examen FCyT (G10 1op-2-2025)">
        Hallar la ecuación de la circunferencia con centro C(2, −1) y tangente
        a la recta 3x − 4y + 5 = 0.<br /><br />

        <strong>Paso 1 · Distancia del centro a la recta = radio:</strong><br />
        r = |3(2) − 4(−1) + 5| / √(9 + 16) = |6 + 4 + 5| / 5 = 15/5 = 3.<br /><br />

        <strong>Paso 2 · Ecuación canónica:</strong><br />
        (x − 2)² + (y + 1)² = 9.<br /><br />

        <strong>Paso 3 · Desarrollar:</strong><br />
        x² − 4x + 4 + y² + 2y + 1 = 9<br />
        x² + y² − 4x + 2y − 4 = 0.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscParalelas() {
  return (
    <EscenaRica>
      <Titulo>Rectas paralelas y perpendiculares</Titulo>

      <Resumen>
        <strong>Rectas paralelas</strong>: tienen la misma pendiente.<br />
        Si r₁ tiene m₁ y r₂ tiene m₂: <strong>r₁ ∥ r₂ ⟺ m₁ = m₂</strong>.<br /><br />

        <strong>Rectas perpendiculares</strong>: sus pendientes son inversas y
        opuestas.<br />
        <strong>r₁ ⊥ r₂ ⟺ m₁ · m₂ = −1</strong> (o equivalentemente m₂ = −1/m₁).
      </Resumen>

      <Mnemotecnia>
        <strong>Trampa común</strong>: dos rectas con pendientes m₁ = 2 y m₂ = 3
        NO son perpendiculares (su producto es 6, no −1). Para perpendiculares,
        si una tiene pendiente 2, la otra debe tener pendiente −1/2.
      </Mnemotecnia>

      <WorkedExample titulo="Recta paralela">
        Encontrar la recta paralela a y = 3x + 4 que pase por (2, 1).<br /><br />

        Pendiente paralela: m = 3.<br />
        Forma punto-pendiente: y − 1 = 3(x − 2) → y = 3x − 5.
      </WorkedExample>

      <WorkedExample titulo="Recta perpendicular">
        Encontrar la recta perpendicular a y = 3x + 4 que pase por (2, 1).<br /><br />

        Pendiente perpendicular: m = −1/3.<br />
        y − 1 = (−1/3)(x − 2)<br />
        y = −x/3 + 2/3 + 1 = −x/3 + 5/3.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscAngulo() {
  return (
    <EscenaRica>
      <Titulo>Ángulo entre dos rectas</Titulo>

      <Resumen>
        Si dos rectas tienen pendientes m₁ y m₂, el ángulo agudo θ entre ellas
        satisface:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          tan θ = |(m₂ − m₁) / (1 + m₁ · m₂)|
        </span>
      </Resumen>

      <WorkedExample titulo="Ángulo entre rectas">
        Las rectas y = 2x + 1 e y = (1/3)x − 2 forman ángulo θ.<br /><br />

        tan θ = |(1/3 − 2) / (1 + 2·(1/3))| = |(−5/3) / (5/3)| = 1.<br />
        θ = arctan 1 = <strong>45°</strong>.
      </WorkedExample>

      <Conexion>
        Si m₁ · m₂ = −1, el denominador (1 + m₁m₂) se vuelve 0 → tan θ = ∞ →
        θ = 90°. Por eso m₁ · m₂ = −1 caracteriza perpendicularidad.
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Distancia entre (0,0) y (3,4):",
      o: ["5", "7", "25", "12"],
      c: 0,
      ex: "√(9+16) = √25 = 5.",
    },
    {
      p: "Pendiente entre (1,3) y (5,11):",
      o: ["2", "4", "1/2", "8"],
      c: 0,
      ex: "(11-3)/(5-1) = 8/4 = 2.",
    },
    {
      p: "Ordenada al origen de y = -3x + 7:",
      o: ["7", "-3", "3", "-7"],
      c: 0,
      ex: "b = 7 (donde corta al eje y).",
    },
    {
      p: "Pendiente perpendicular a m = 2/3:",
      o: ["-3/2", "3/2", "-2/3", "2/3"],
      c: 0,
      ex: "Inversa negativa: m' = -3/2 (producto = -1).",
    },
    {
      p: "Distancia del (0,0) a la recta 3x + 4y - 10 = 0:",
      o: ["2", "10", "1", "5"],
      c: 0,
      ex: "|0+0-10|/√(9+16) = 10/5 = 2.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · confundir m con b">
        En y = mx + b, la pendiente es m (lo que multiplica a x), no b. b es la
        constante (donde corta al eje y).
      </Misconception>

      <Misconception titulo="Error 2 · perpendicularidad mal aplicada">
        Perpendicular NO significa pendientes opuestas. Significa pendientes
        cuyo producto es −1 (inversas y opuestas). Si m₁ = 3, perpendicular
        tiene m₂ = −1/3, NO m₂ = −3.
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
