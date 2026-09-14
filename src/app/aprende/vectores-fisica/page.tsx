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
      unidad="FIS-01"
      tituloUnidad="Vectores · Física"
      escenas={[
        { titulo: "Magnitudes escalares vs vectoriales", componente: EscIntro },
        { titulo: "Representación · módulo, dirección, sentido", componente: EscRep },
        { titulo: "Componentes cartesianas", componente: EscComponentes },
        { titulo: "Suma de vectores · método gráfico y analítico", componente: EscSuma },
        { titulo: "Producto escalar (punto)", componente: EscEscalar },
        { titulo: "Producto vectorial (cruz)", componente: EscVectorial },
        { titulo: "Aplicaciones físicas", componente: EscAplic },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function VectorSVG({ vx = 3, vy = 2, color = LIENZO.accent }: { vx?: number; vy?: number; color?: string }) {
  const scale = 30;
  const cx = 200, cy = 130;
  const x2 = cx + vx * scale;
  const y2 = cy - vy * scale;
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Ejes */}
          <line x1="20" y1={cy} x2="380" y2={cy} stroke={LIENZO.fgFaint} strokeWidth="1" />
          <line x1={cx} y1="20" x2={cx} y2="210" stroke={LIENZO.fgFaint} strokeWidth="1" />
          {/* Componentes */}
          <line x1={cx} y1={cy} x2={x2} y2={cy} stroke={COLOR_EXP} strokeWidth="2" strokeDasharray="4 3" />
          <line x1={x2} y1={cy} x2={x2} y2={y2} stroke={COLOR_EXP} strokeWidth="2" strokeDasharray="4 3" />
          {/* Vector */}
          <motion.line x1={cx} y1={cy} x2={x2} y2={y2}
            stroke={color} strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          {/* Cabeza de flecha */}
          <motion.polygon points={`${x2},${y2} ${x2 - 8},${y2 + 4} ${x2 - 8},${y2 - 4}`}
            fill={color}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
          {/* Etiquetas */}
          <text x={(cx + x2) / 2} y={cy + 16} textAnchor="middle" fontSize="12" fill={COLOR_EXP} fontWeight="700">vx = {vx}</text>
          <text x={x2 + 8} y={(cy + y2) / 2} fontSize="12" fill={COLOR_EXP} fontWeight="700">vy = {vy}</text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Vectores · cuando dirección importa</Titulo>

      <Hook>
        Vectores aparecen en TODA la física. Cinemática, dinámica,
        electrostática. Y en el examen FCyT también: F2 del PREU 2025 pidió
        calcular módulo de producto vectorial. Sin vectores, no entiendes ni
        velocidad ni fuerza.
      </Hook>

      <Definicion termino="Magnitud escalar">
        Cantidad que se describe solo con un NÚMERO (y unidad). Ej: temperatura
        (20°C), masa (5 kg), tiempo (3 s), energía (100 J).
      </Definicion>

      <Definicion termino="Magnitud vectorial">
        Cantidad que se describe con NÚMERO + DIRECCIÓN + SENTIDO. Ej:
        velocidad (5 m/s hacia el norte), fuerza (10 N hacia arriba), campo
        eléctrico.
      </Definicion>

      <Mnemotecnia>
        <strong>Test rápido</strong>: ¿se puede sumar como simple aritmética?<br />
        • Si SÍ (5 kg + 3 kg = 8 kg): es ESCALAR.<br />
        • Si NO (5 m/s norte + 3 m/s este ≠ 8 m/s): es VECTORIAL.<br /><br />
        Las direcciones importan en los vectores.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscRep() {
  return (
    <EscenaRica>
      <Titulo>Representación de un vector</Titulo>

      <Resumen>
        Un vector se representa como una <strong>flecha</strong> con:<br />
        • <strong>Módulo (magnitud)</strong>: la longitud de la flecha. Es el
        valor numérico, siempre positivo. Notación: |v| o simplemente v.<br />
        • <strong>Dirección</strong>: la línea recta sobre la cual está el
        vector.<br />
        • <strong>Sentido</strong>: hacia dónde apunta la flecha (las 2
        posibilidades sobre una dirección).
      </Resumen>

      <VectorSVG vx={3} vy={2} />

      <Definicion termino="Notación vectorial">
        Se escribe con flechita arriba: <strong>v⃗</strong> o en negrita
        <strong> v</strong>.<br />
        El módulo se escribe |v⃗| o simplemente v (sin flechita).
      </Definicion>
    </EscenaRica>
  );
}

function EscComponentes() {
  return (
    <EscenaRica>
      <Titulo>Componentes cartesianas</Titulo>

      <Resumen>
        Un vector v⃗ en el plano se descompone en dos componentes
        perpendiculares:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          v⃗ = (vx, vy) = vx · î + vy · ĵ
        </span><br /><br />
        donde î = (1, 0) y ĵ = (0, 1) son los vectores unitarios de los ejes
        x e y.
      </Resumen>

      <Resumen>
        <strong>Relaciones útiles · si conoces módulo |v| y ángulo θ con el eje
        x</strong>:<br />
        • vx = |v| · cos θ.<br />
        • vy = |v| · sen θ.<br /><br />
        <strong>Si conoces componentes vx, vy</strong>:<br />
        • Módulo: |v| = √(vx² + vy²) (Pitágoras).<br />
        • Ángulo: θ = arctan(vy / vx).
      </Resumen>

      <WorkedExample titulo="Caso típico del facsímil">
        Vector A⃗ = 5î + 3ĵ. Calcular módulo y ángulo.<br /><br />

        |A| = √(25 + 9) = √34 ≈ 5.83.<br />
        θ = arctan(3/5) ≈ 30.96°.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscSuma() {
  return (
    <EscenaRica>
      <Titulo>Suma de vectores</Titulo>

      <Resumen>
        <strong>Método gráfico (paralelogramo / triángulo)</strong>:<br />
        Para sumar A⃗ + B⃗: colocá B⃗ a continuación de A⃗ (origen de B donde
        termina A). El vector suma va desde el origen de A hasta la punta de B.
      </Resumen>

      <Resumen>
        <strong>Método analítico (componentes)</strong>:<br />
        Si A⃗ = (Ax, Ay) y B⃗ = (Bx, By), entonces:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          A⃗ + B⃗ = (Ax + Bx, Ay + By)
        </span>
      </Resumen>

      <WorkedExample titulo="Suma analítica">
        A⃗ = (3, 4), B⃗ = (1, −2). Calcular A⃗ + B⃗ y su módulo.<br /><br />

        A⃗ + B⃗ = (3+1, 4+(−2)) = (4, 2).<br />
        |A⃗ + B⃗| = √(16 + 4) = √20 = 2√5 ≈ 4.47.
      </WorkedExample>

      <Resumen>
        <strong>Resta</strong>: A⃗ − B⃗ = (Ax − Bx, Ay − By). Equivale a sumar
        el opuesto: A⃗ − B⃗ = A⃗ + (−B⃗).
      </Resumen>

      <Resumen>
        <strong>Multiplicación por escalar</strong>: si k es un número:<br />
        k · A⃗ = (k·Ax, k·Ay). El módulo se multiplica por |k|, la dirección no
        cambia (pero el sentido se invierte si k es negativo).
      </Resumen>
    </EscenaRica>
  );
}

function EscEscalar() {
  return (
    <EscenaRica>
      <Titulo>Producto escalar (producto punto)</Titulo>

      <Definicion termino="Producto escalar A⃗ · B⃗">
        Resultado: un NÚMERO (escalar), no un vector.<br /><br />
        <strong>Por componentes</strong>:<br />
        A⃗ · B⃗ = Ax·Bx + Ay·By.<br /><br />
        <strong>Por módulos y ángulo</strong>:<br />
        A⃗ · B⃗ = |A| · |B| · cos θ.<br /><br />
        donde θ es el ángulo entre los dos vectores.
      </Definicion>

      <Resumen>
        <strong>Propiedades</strong>:<br />
        • Si A⃗ ⊥ B⃗ (perpendiculares): A⃗ · B⃗ = 0 (cos 90° = 0).<br />
        • Si A⃗ ∥ B⃗ mismo sentido: A⃗ · B⃗ = |A|·|B| (cos 0° = 1).<br />
        • Si A⃗ ∥ B⃗ sentidos opuestos: A⃗ · B⃗ = −|A|·|B| (cos 180° = −1).
      </Resumen>

      <WorkedExample titulo="Cálculo">
        A⃗ = (3, 4), B⃗ = (1, 2). Producto escalar:<br /><br />

        A⃗ · B⃗ = 3·1 + 4·2 = 3 + 8 = 11.
      </WorkedExample>

      <Conexion>
        El producto escalar se usa para calcular TRABAJO en física:
        W = F⃗ · d⃗ = F·d·cos θ. Si la fuerza es perpendicular al
        desplazamiento, NO hay trabajo.
      </Conexion>
    </EscenaRica>
  );
}

function EscVectorial() {
  return (
    <EscenaRica>
      <Titulo>Producto vectorial (producto cruz)</Titulo>

      <Definicion termino="Producto vectorial A⃗ × B⃗">
        Resultado: un VECTOR (perpendicular a ambos).<br /><br />
        <strong>Módulo</strong>: |A⃗ × B⃗| = |A| · |B| · sen θ.<br /><br />
        <strong>Dirección</strong>: perpendicular al plano que forman A⃗ y B⃗.<br />
        <strong>Sentido</strong>: regla de la mano derecha.
      </Definicion>

      <Resumen>
        <strong>En componentes (3D)</strong>:<br />
        Si A⃗ = (Ax, Ay, Az) y B⃗ = (Bx, By, Bz):<br />
        A⃗ × B⃗ = (AyBz − AzBy, AzBx − AxBz, AxBy − AyBx).
      </Resumen>

      <Resumen>
        <strong>Propiedades</strong>:<br />
        • Si A⃗ ∥ B⃗ (paralelos): A⃗ × B⃗ = 0⃗ (sen 0° = 0).<br />
        • Si A⃗ ⊥ B⃗: |A⃗ × B⃗| = |A|·|B| (sen 90° = 1).<br />
        • <strong>NO conmutativo</strong>: A⃗ × B⃗ = −(B⃗ × A⃗).
      </Resumen>

      <WorkedExample titulo="Aplicación del facsímil F2 PREU 2025">
        Dados los vectores A⃗ = 5î + 3ĵ, B⃗ = −2î + 4ĵ, C⃗ = −2î − 3ĵ,
        D⃗ = 8î − 2ĵ.<br />
        Sean E⃗ = A⃗ + B⃗ = (3, 7), F⃗ = C⃗ − D⃗ = (−10, −1).<br />
        Calcular |G⃗| donde G⃗ = E⃗ × F⃗.<br /><br />

        En 2D, el producto vectorial es un escalar (la componente z):<br />
        E × F = ExFy − EyFx = (3)(−1) − (7)(−10) = −3 + 70 = 67.<br /><br />

        Por tanto |G⃗| = <strong>67</strong>.
      </WorkedExample>

      <Conexion>
        Producto vectorial se usa para: torque (τ⃗ = r⃗ × F⃗), momento angular,
        fuerza magnética sobre carga (F⃗ = qv⃗ × B⃗). En el examen FCyT
        aparece en preguntas de electromagnetismo.
      </Conexion>
    </EscenaRica>
  );
}

function EscAplic() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones físicas de vectores</Titulo>

      <Ejemplo titulo="Velocidad relativa">
        Un bote en un río: velocidad bote respecto al agua = (4, 0) m/s
        (cruzando). Corriente del agua = (0, 2) m/s. Velocidad bote respecto a
        la orilla:<br />
        v_total = (4, 2) m/s. Módulo: √20 ≈ 4.47 m/s. Ángulo: arctan(2/4) ≈ 26.6°.
      </Ejemplo>

      <Ejemplo titulo="Suma de fuerzas">
        Dos fuerzas sobre un objeto: F₁ = (3, 4) N, F₂ = (−1, 2) N.<br />
        Fuerza neta: F⃗ = (2, 6) N. Módulo: √40 ≈ 6.32 N.
      </Ejemplo>

      <Ejemplo titulo="Trabajo">
        Una fuerza F⃗ = (5, 0) N mueve un objeto con desplazamiento
        d⃗ = (4, 3) m.<br />
        W = F⃗ · d⃗ = 5·4 + 0·3 = 20 J.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Módulo de A⃗ = (6, 8):",
      o: ["10", "14", "100", "2"],
      c: 0,
      ex: "|A| = √(36+64) = √100 = 10.",
    },
    {
      p: "(2, 3) + (5, -1) =",
      o: ["(7, 2)", "(7, 4)", "(-3, -4)", "(10, -3)"],
      c: 0,
      ex: "Componente a componente: (2+5, 3-1) = (7, 2).",
    },
    {
      p: "Producto escalar (1, 2) · (3, 4):",
      o: ["11", "5", "10", "24"],
      c: 0,
      ex: "1·3 + 2·4 = 3 + 8 = 11.",
    },
    {
      p: "Si A⃗ ⊥ B⃗, su producto escalar es:",
      o: ["0", "|A|·|B|", "1", "-|A|·|B|"],
      c: 0,
      ex: "cos 90° = 0, entonces A·B = 0.",
    },
    {
      p: "Vector unitario de A⃗ = (3, 4):",
      o: ["(3/5, 4/5)", "(1, 1)", "(3, 4)/7", "(0.5, 0.5)"],
      c: 0,
      ex: "Dividir cada componente por |A|=5: (3/5, 4/5).",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · sumar módulos en vez de vectores">
        |A⃗ + B⃗| ≠ |A| + |B| en general. Solo son iguales si son paralelos
        del mismo sentido. Hay que sumar componente a componente.
      </Misconception>

      <Misconception titulo="Error 2 · producto escalar vs vectorial">
        El producto · (punto) da un ESCALAR. El producto × (cruz) da un VECTOR.
        En las fórmulas usa la operación correcta.
      </Misconception>

      <Misconception titulo="Error 3 · olvidar el sentido del producto vectorial">
        A⃗ × B⃗ ≠ B⃗ × A⃗ (cambian de signo). El orden importa para producto
        cruz, no para producto punto.
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
