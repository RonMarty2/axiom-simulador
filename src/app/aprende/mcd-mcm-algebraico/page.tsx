"use client";

import { useState, useMemo, useId } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
} from "../_components/atoms";
import { Pizarra, Hint, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

// ─── Venn real de factores. La MISMA figura contesta las dos preguntas:
// la intersección es el MCD, la unión completa es el MCM.
// P = x²(x+3) = x · x · (x+3)   ·   Q = x(x+3)² = x · (x+3) · (x+3)
function VennFactores({ modo = "mcd" }: { modo?: "mcd" | "mcm" }) {
  const uid = useId();
  const clipLente = `lente-${uid}`;
  const alto = 250;
  const cA = 182, cB = 298, cy = 126, r = 96;
  const esMcd = modo === "mcd";
  const color = esMcd ? LIENZO.ok : LIENZO.accent;

  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <defs>
            <clipPath id={clipLente}>
              <circle cx={cA} cy={cy} r={r} />
            </clipPath>
          </defs>

          {/* en MCM se pinta la unión entera; en MCD solo la lente del cruce */}
          {!esMcd && (
            <>
              <circle cx={cA} cy={cy} r={r} fill={color} fillOpacity="0.12" />
              <circle cx={cB} cy={cy} r={r} fill={color} fillOpacity="0.12" />
            </>
          )}
          {esMcd && (
            <g clipPath={`url(#${clipLente})`}>
              <circle cx={cB} cy={cy} r={r} fill={color} fillOpacity="0.22" />
            </g>
          )}

          <circle cx={cA} cy={cy} r={r} fill="none" stroke={LIENZO.fgDim} strokeWidth="2" />
          <circle cx={cB} cy={cy} r={r} fill="none" stroke={LIENZO.fgDim} strokeWidth="2" />

          <text x="96" y="20" textAnchor="middle" fontSize="14" fontWeight="700" fill={LIENZO.fgDim}>
            P = x²(x + 3)
          </text>
          <text x="384" y="20" textAnchor="middle" fontSize="14" fontWeight="700" fill={LIENZO.fgDim}>
            Q = x(x + 3)²
          </text>

          {/* solo P */}
          <text x="136" y={cy + 6} textAnchor="middle" fontSize="19" fontWeight="600"
            fill={LIENZO.fg} opacity={esMcd ? 0.35 : 1}>x</text>
          {/* comunes: viven en la lente */}
          <text x="240" y={cy - 8} textAnchor="middle" fontSize="18" fontWeight="700" fill={color}>x</text>
          <text x="240" y={cy + 20} textAnchor="middle" fontSize="18" fontWeight="700" fill={color}>x + 3</text>
          {/* solo Q */}
          <text x="346" y={cy + 6} textAnchor="middle" fontSize="19" fontWeight="600"
            fill={LIENZO.fg} opacity={esMcd ? 0.35 : 1}>x + 3</text>

          <text x="240" y={alto - 12} textAnchor="middle" fontSize="21" fontWeight="700" fill={LIENZO.fg}>
            {esMcd ? "MCD = " : "MCM = "}
            <tspan fill={color}>{esMcd ? "x (x + 3)" : "x² (x + 3)²"}</tspan>
          </text>
        </svg>
      </Pizarra>
      <Hint>
        {esMcd
          ? "Solo lo del cruce: los factores que aparecen en los dos"
          : "Todo el dibujo: los comunes una vez, más lo propio de cada uno"}
      </Hint>
    </div>
  );
}

// ─── Divisibilidad: el MCD cabe adentro de los dos, el MCM los contiene ───
function EscaleraDivisibilidad() {
  const alto = 175;
  const nodos = [
    { x: 74, y: 90, t: "x (x + 3)", sub: "MCD", color: LIENZO.ok },
    { x: 240, y: 46, t: "P = x²(x + 3)", sub: "", color: LIENZO.fg },
    { x: 240, y: 134, t: "Q = x (x + 3)²", sub: "", color: LIENZO.fg },
    { x: 406, y: 90, t: "x² (x + 3)²", sub: "MCM", color: LIENZO.accent },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <defs>
            <marker id="flecha-div" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
              <path d="M0,0 L9,4.5 L0,9 Z" fill={LIENZO.fgFaint} />
            </marker>
          </defs>
          {[[0, 1], [0, 2], [1, 3], [2, 3]].map(([a, b], i) => (
            <line key={i} x1={nodos[a].x + 46} y1={nodos[a].y} x2={nodos[b].x - 50} y2={nodos[b].y}
              stroke={LIENZO.fgFaint} strokeWidth="1.5" markerEnd="url(#flecha-div)" />
          ))}
          {nodos.map((n) => (
            <g key={n.t}>
              {n.sub && (
                <text x={n.x} y={n.y - 22} textAnchor="middle" fontSize="11" fontWeight="800"
                  letterSpacing="1" fill={n.color}>{n.sub}</text>
              )}
              <text x={n.x} y={n.y + 6} textAnchor="middle" fontSize="16" fontWeight="700"
                fill={n.color}>{n.t}</text>
            </g>
          ))}
          <text x="240" y={alto - 6} textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>
            cada flecha se lee &quot;divide a&quot;
          </text>
        </svg>
      </Pizarra>
      <Hint>El MCD entra en los dos; los dos entran en el MCM. Por eso uno es el chico y el otro el grande</Hint>
    </div>
  );
}

// ─── Factorizar es partir cada polinomio en ladrillos comparables ───
function FactorizarBloques() {
  const alto = 190;
  const filas = [
    { expandido: "x² − 9", bloques: ["x + 3", "x − 3"], y: 62 },
    { expandido: "x² + 6x + 9", bloques: ["x + 3", "x + 3"], y: 134 },
  ];
  const X0 = 176, W = 116, H = 40;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x="82" y="28" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>sin factorizar</text>
          <text x={X0 + W + 5} y="28" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>en ladrillos</text>
          {filas.map((f) => (
            <g key={f.expandido}>
              <text x="82" y={f.y + 6} textAnchor="middle" fontSize="19" fontWeight="600"
                fill={LIENZO.fg}>{f.expandido}</text>
              <text x="146" y={f.y + 6} textAnchor="middle" fontSize="18" fill={LIENZO.fgFaint}>→</text>
              {f.bloques.map((b, i) => {
                const comun = b === "x + 3";
                const color = comun ? LIENZO.ok : LIENZO.fgDim;
                return (
                  <g key={i}>
                    <rect x={X0 + i * (W + 10)} y={f.y - 20} width={W} height={H} rx="8"
                      fill={color} fillOpacity={comun ? 0.14 : 0.05}
                      stroke={color} strokeWidth={comun ? 2 : 1.5} />
                    <text x={X0 + i * (W + 10) + W / 2} y={f.y + 6} textAnchor="middle"
                      fontSize="18" fontWeight="700" fill={comun ? LIENZO.ok : LIENZO.fg}>{b}</text>
                  </g>
                );
              })}
            </g>
          ))}
        </svg>
      </Pizarra>
      <Hint>Recién partidos en ladrillos se ve que los dos comparten (x + 3)</Hint>
    </div>
  );
}

// ─── Simplificar es tachar el mismo ladrillo arriba y abajo ───
function CancelarFactores() {
  const [tachado, setTachado] = useState(false);
  const alto = 200;
  const cx = 240, yNum = 70, linea = 104, yDen = 142;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto} onClick={() => setTachado((v) => !v)}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x="240" y="26" textAnchor="middle" fontSize="13" fill={LIENZO.fgDim}>
            (x² − 9) / (x² + 6x + 9), ya factorizado
          </text>

          <text x={cx - 62} y={yNum} textAnchor="middle" fontSize="21" fontWeight="700"
            fill={LIENZO.ok} opacity={tachado ? 0.4 : 1}>(x + 3)</text>
          <text x={cx + 62} y={yNum} textAnchor="middle" fontSize="21" fontWeight="700"
            fill={LIENZO.fg}>(x − 3)</text>

          <line x1={cx - 130} y1={linea} x2={cx + 130} y2={linea} stroke={LIENZO.fg} strokeWidth="2" />

          <text x={cx - 62} y={yDen} textAnchor="middle" fontSize="21" fontWeight="700"
            fill={LIENZO.ok} opacity={tachado ? 0.4 : 1}>(x + 3)</text>
          <text x={cx + 62} y={yDen} textAnchor="middle" fontSize="21" fontWeight="700"
            fill={LIENZO.fg}>(x + 3)</text>

          {tachado && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line x1={cx - 102} y1={yNum - 17} x2={cx - 22} y2={yNum + 7}
                stroke={LIENZO.bad} strokeWidth="2.5" strokeLinecap="round" />
              <line x1={cx - 102} y1={yDen - 17} x2={cx - 22} y2={yDen + 7}
                stroke={LIENZO.bad} strokeWidth="2.5" strokeLinecap="round" />
              <text x="240" y={alto - 10} textAnchor="middle" fontSize="21" fontWeight="700"
                fill={LIENZO.ok}>= (x − 3) / (x + 3)</text>
            </motion.g>
          )}
        </svg>
      </Pizarra>
      <Hint>{tachado ? "El (x + 3) que estaba arriba y abajo se fue" : "Tocá para cancelar el factor común"}</Hint>
    </div>
  );
}

// ─── Se cancelan factores, nunca sumandos ───
function CancelarTrampa() {
  const alto = 205;
  const casos = [
    {
      cx: 128, titulo: "SÍ SE PUEDE", color: LIENZO.ok,
      num: "(x+3)(x−2)", den: "(x+3)(x+4)",
      nota: "(x+3) multiplica: es factor",
    },
    {
      cx: 352, titulo: "NO SE PUEDE", color: LIENZO.bad,
      num: "x + 3", den: "x + 5",
      nota: "acá la x suma: queda atrapada",
    },
  ];
  const yNum = 88, linea = 110, yDen = 142;
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <line x1="240" y1="32" x2="240" y2={alto - 22} stroke={LIENZO.fgFaint}
            strokeOpacity="0.5" strokeWidth="1" />
          {casos.map((c) => (
            <g key={c.titulo}>
              <text x={c.cx} y="46" textAnchor="middle" fontSize="12" fontWeight="800"
                letterSpacing="0.8" fill={c.color}>{c.titulo}</text>
              <text x={c.cx} y={yNum} textAnchor="middle" fontSize="19" fontWeight="700" fill={LIENZO.fg}>{c.num}</text>
              <line x1={c.cx - 78} y1={linea} x2={c.cx + 78} y2={linea} stroke={LIENZO.fg} strokeWidth="2" />
              <text x={c.cx} y={yDen} textAnchor="middle" fontSize="19" fontWeight="700" fill={LIENZO.fg}>{c.den}</text>
              <text x={c.cx} y={alto - 26} textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>{c.nota}</text>
            </g>
          ))}
          {/* tachado válido sobre el factor común de la izquierda */}
          <line x1={casos[0].cx - 76} y1={yNum - 16} x2={casos[0].cx - 4} y2={yNum + 6}
            stroke={LIENZO.ok} strokeWidth="2.5" strokeLinecap="round" />
          <line x1={casos[0].cx - 76} y1={yDen - 16} x2={casos[0].cx - 4} y2={yDen + 6}
            stroke={LIENZO.ok} strokeWidth="2.5" strokeLinecap="round" />
          {/* cruz sobre el intento inválido de la derecha */}
          <g stroke={LIENZO.bad} strokeWidth="3" strokeLinecap="round">
            <line x1={casos[1].cx - 40} y1={yNum - 18} x2={casos[1].cx - 12} y2={yNum + 8} />
            <line x1={casos[1].cx - 12} y1={yNum - 18} x2={casos[1].cx - 40} y2={yNum + 8} />
          </g>
        </svg>
      </Pizarra>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="MCD y MCM algebraicos"
      escenas={[
        { titulo: "¿Para qué?", componente: Esc01_Intro },
        { titulo: "Primer paso: factorizar", componente: Esc02_Factorizar },
        { titulo: "MCD algebraico", componente: Esc03_MCD },
        { titulo: "MCM algebraico", componente: Esc04_MCM },
        { titulo: "Aplicación: fracciones algebraicas", componente: Esc05_Fracciones },
        { titulo: "Errores comunes", componente: Esc06_Errores },
        { titulo: "Práctica final", componente: Esc07_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>MCD y MCM con polinomios</Titulo>
      <Parrafo>
        Igual que con números, podés calcular el <strong>Máximo Común Divisor</strong>
        y el <strong>Mínimo Común Múltiplo</strong> entre <em>polinomios</em>. Sirve
        para simplificar y sumar fracciones algebraicas.
      </Parrafo>
      <Resumen>
        🎯 ¿Para qué sirve?<br />
        • <strong>Simplificar fracciones algebraicas</strong>: dividir arriba y abajo por el MCD.<br />
        • <strong>Sumar fracciones algebraicas</strong>: necesitás un común denominador (MCM).<br />
        • <strong>Resolver ecuaciones racionales</strong>: multiplicar ambos lados por el MCM.
      </Resumen>
      <EscaleraDivisibilidad />

      <PorQue>
        La idea es <em>idéntica</em> al MCD/MCM numérico. La única diferencia es que ahora
        los "primos" son factores algebraicos (como (x−2), (x+3), x², etc).
      </PorQue>

      <Hook>
        En el examen UMSS aparece como <strong>preparación para fracciones algebraicas</strong>:
        sin MCM no podés sumarlas, sin MCD no podés simplificarlas. Es paso obligado.
      </Hook>

      <Mnemotecnia>
        <strong>"MeNOR vs MaYOR"</strong><br />
        <strong>MCD</strong> → factores <strong>comunes</strong> con el menor exponente.<br />
        <strong>MCM</strong> → <strong>TODOS</strong> los factores con el mayor exponente.<br /><br />
        Atajo: "<strong>D</strong>ivisor" → chico (cabe en ambos).
        "<strong>M</strong>últiplo" → grande (es múltiplo de ambos).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_Factorizar() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Paso 0: factorizar SIEMPRE primero</Titulo>
      <Parrafo>
        Antes de hablar de MCD o MCM, tenés que tener cada polinomio
        <strong> totalmente factorizado</strong>. Si no, no podés comparar.
      </Parrafo>

      <FactorizarBloques />

      <Ejemplo titulo="Factorizar para comparar">
        <Paso n={1}>x² − 9 = (x + 3)(x − 3)</Paso>
        <Paso n={2}>x² + 6x + 9 = (x + 3)²</Paso>
        <Paso n={3}>Ahora puedo comparar: ambos comparten el factor (x + 3).</Paso>
      </Ejemplo>

      <Cuidado>
        Si te dan polinomios sin factorizar, factorizá primero usando los métodos de la
        lección anterior (factor común, dif. cuadrados, TCP, trinomio).
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_MCD() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>MCD algebraico</Titulo>
      <Resumen>
        <strong>MCD = factores COMUNES elevados al MENOR exponente</strong>
      </Resumen>
      <Parrafo>
        Igual que con números, pero ahora cada factor puede ser una expresión.
      </Parrafo>

      <Ejemplo titulo="MCD de x²(x+3) y x(x+3)²">
        <Paso n={1}>Factor común x: aparece en ambos. Menor exponente: x¹.</Paso>
        <Paso n={2}>Factor común (x+3): aparece en ambos. Menor exponente: (x+3)¹.</Paso>
        <Paso n={3}>MCD = <strong style={{ color: COLOR_OK }}>x(x+3)</strong>.</Paso>
      </Ejemplo>
      <VennFactores modo="mcd" />

      <Ejemplo titulo="MCD de (x+3)²(x−1) y (x+3)(x−1)³">
        <Paso n={1}>Comunes: (x+3) y (x−1).</Paso>
        <Paso n={2}>Menores exponentes: (x+3)¹ y (x−1)¹.</Paso>
        <Paso n={3}>MCD = <strong style={{ color: COLOR_OK }}>(x+3)(x−1)</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Solo entran factores que aparezcan en TODOS los polinomios. Si un factor está
        en uno y no en el otro, NO va al MCD.
      </Cuidado>

      <AutoCheck
        pregunta="MCD de x²(x−2)³ y x³(x−2)"
        opciones={["x²(x−2)³", "x²(x−2)", "x³(x−2)³", "x(x−2)"]}
        correctaIdx={1}
        explicacion="x: comunes, menor exponente 2. (x−2): comunes, menor exponente 1. → x²(x−2)."
      />
    </EscenaRica>
  );
}

function Esc04_MCM() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>MCM algebraico</Titulo>
      <Resumen>
        <strong>MCM = TODOS los factores (de cualquiera) elevados al MAYOR exponente</strong>
      </Resumen>

      <VennFactores modo="mcm" />

      <Ejemplo titulo="MCM de (x+3)²(x−1) y (x+3)(x−1)³">
        <Paso n={1}>Factores presentes: (x+3) y (x−1).</Paso>
        <Paso n={2}>Mayores exponentes: (x+3)² y (x−1)³.</Paso>
        <Paso n={3}>MCM = <strong style={{ color: COLOR_OK }}>(x+3)²(x−1)³</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="MCM cuando hay factores no compartidos: x²(x+1) y x(x−3)">
        <Paso n={1}>Factores: x, (x+1), (x−3).</Paso>
        <Paso n={2}>Mayor exponente de cada uno: x², (x+1)¹, (x−3)¹.</Paso>
        <Paso n={3}>MCM = <strong style={{ color: COLOR_OK }}>x²(x+1)(x−3)</strong>.</Paso>
      </Ejemplo>

      <AutoCheck
        pregunta="MCM de x²(x−2)³ y x³(x−2)"
        opciones={["x²(x−2)", "x³(x−2)³", "x⁵(x−2)⁴", "(x−2)³"]}
        correctaIdx={1}
        explicacion="Mayor x: 3. Mayor (x−2): 3. → x³(x−2)³."
      />
    </EscenaRica>
  );
}

function Esc05_Fracciones() {
  return (
    <EscenaRica>
      <Titulo>Aplicación: sumar fracciones algebraicas</Titulo>
      <Parrafo>
        El uso más común del MCM algebraico es <strong>encontrar el común denominador</strong>
        al sumar fracciones con polinomios.
      </Parrafo>

      <Ejemplo titulo="Sumar 1/x + 1/(x+1)">
        <Paso n={1}>MCM de los denominadores: x · (x+1) = <strong>x(x+1)</strong>.</Paso>
        <Paso n={2}>Reescribo cada fracción con el mismo denominador:</Paso>
        <Paso n={3}>1/x = (x+1) / [x(x+1)] · 1/(x+1) = x / [x(x+1)]</Paso>
        <Paso n={4}>Sumo numeradores: (x+1) + x = 2x + 1</Paso>
        <Paso n={5}>Resultado: <strong style={{ color: COLOR_OK }}>(2x + 1) / [x(x+1)]</strong></Paso>
      </Ejemplo>

      <CancelarFactores />

      <Ejemplo titulo="Simplificar (x² − 9)/(x² + 6x + 9)">
        <Paso n={1}>Factorizo: arriba (x+3)(x−3), abajo (x+3)².</Paso>
        <Paso n={2}>MCD: (x+3). Cancelo arriba y abajo.</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>(x − 3) / (x + 3)</strong>.</Paso>
      </Ejemplo>

      <Resumen>
        Regla mnemónica: <strong>MCD → simplificar; MCM → sumar/restar</strong>.
      </Resumen>

      <WorkedExample titulo="Resta de fracciones algebraicas · paso a paso">
        Resolvé: <strong>(2x)/(x²−1) − 1/(x+1)</strong>.<br /><br />

        <strong>Paso 1 · Factorizar denominadores:</strong><br />
        x² − 1 = (x+1)(x−1) (diferencia de cuadrados).<br />
        El otro denominador es (x+1).<br /><br />

        <strong>Paso 2 · MCM de denominadores:</strong><br />
        Factores: (x+1) y (x−1). Mayor exponente de cada: 1. → MCM = <strong>(x+1)(x−1)</strong>.<br /><br />

        <strong>Paso 3 · Reescribir con denominador común:</strong><br />
        Primera: (2x) / [(x+1)(x−1)] (ya está).<br />
        Segunda: 1/(x+1) → multiplico arriba y abajo por (x−1) → (x−1) / [(x+1)(x−1)].<br /><br />

        <strong>Paso 4 · Restar numeradores:</strong><br />
        2x − (x − 1) = 2x − x + 1 = <strong>x + 1</strong>.<br /><br />

        <strong>Paso 5 · Resultado:</strong><br />
        (x + 1) / [(x+1)(x−1)] = <strong>1 / (x − 1)</strong> (cancelo (x+1) arriba y abajo).<br /><br />

        <strong>Aprendizaje:</strong> al final cancelamos un factor común. Eso es porque el
        resultado se simplifica. Sin factorizar primero, no veríamos la simplificación.
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc06_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Saltarse la factorización. <br />
        <span style={{ fontSize: 13 }}>
          Si no factorizás los polinomios primero, no podés identificar los "factores comunes".
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Confundir MCD con MCM (mayor vs menor exponente). <br />
        <span style={{ fontSize: 13 }}>
          MCD = menor. MCM = mayor. Mnemotecnia: <strong>"D" de divisor = chiquito</strong>;
          <strong> "M" de múltiplo = grandote</strong>.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> Querer cancelar términos sumandos. <br />
        <span style={{ fontSize: 13 }}>
          ❌ (x+3)/(x+5) NO se simplifica cancelando x. Solo se cancelan factores MULTIPLICATIVOS, no sumados.
        </span>
      </Cuidado>

      <CancelarTrampa />

      <Misconception titulo="Trampa de cancelación · 'solo factores' (NUNCA sumandos)">
        <strong>Correcto:</strong> (x+3)(x−2) / (x+3)(x+4) = (x−2)/(x+4). Cancelo (x+3)
        que es factor.<br />
        <strong>INCORRECTO:</strong> (x+3)/(x+5) → cancelar x: NO PODÉS. Acá x es SUMANDO,
        no factor.<br /><br />
        Regla: solo cancelás cuando algo está MULTIPLICANDO arriba y MULTIPLICANDO abajo.
        Si está sumando o restando, queda atrapado.
      </Misconception>

      <Conexion>
        MCD/MCM algebraicos son la herramienta de: <strong>Factorización</strong> (paso previo
        obligatorio), <strong>Fracciones algebraicas</strong> (suma, resta, simplificación) y
        <strong> Ecuaciones racionales</strong> (multiplicar por MCM para eliminar denominadores).
      </Conexion>
    </EscenaRica>
  );
}

function Esc07_Practica() {
  const ejs = useMemo(() => [
    { p: "MCD de x²(x+1) y x(x+1)³", o: ["x²(x+1)³", "x(x+1)", "x(x+1)³", "x²(x+1)"], c: 1, ex: "Comunes con menor exp: x¹, (x+1)¹. → x(x+1)." },
    { p: "MCM de x²(x+1) y x(x+1)³", o: ["x²(x+1)³", "x(x+1)", "x³(x+1)⁴", "x²(x+1)"], c: 0, ex: "Todos con mayor exp: x², (x+1)³. → x²(x+1)³." },
    { p: "MCD de (x−2)(x+1) y (x−2)²(x+5)", o: ["(x−2)", "(x−2)²", "(x−2)(x+1)(x+5)", "(x−2)(x+1)²"], c: 0, ex: "Solo (x−2) es común, con menor exp 1." },
    { p: "Simplificar (x²−4)/(x+2)", o: ["x − 2", "x + 2", "x − 4", "no se puede"], c: 0, ex: "x²−4 = (x+2)(x−2). Cancelo (x+2) arriba/abajo. → x − 2." },
    { p: "MCM de los denominadores de 1/(x−1) + 1/(x+1):", o: ["x²−1", "(x−1)(x+1)", "Ambas son lo mismo", "x²+1"], c: 2, ex: "(x−1)(x+1) = x²−1. Las dos opciones son equivalentes." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios, combiná factorización con MCD/MCM:</Parrafo>
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
          <div style={{ fontSize: 14, color: "#065f46", marginTop: 6 }}>
            {ok === ejs.length && "🎉 Dominás MCD/MCM algebraicos."}
            {ok >= 3 && ok < ejs.length && "Bien. La clave: factorizar primero."}
            {ok < 3 && "Releé la factorización (lección anterior) y volvé acá."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
