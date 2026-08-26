"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";
import { Pizarra, Ejes, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import MathText from "../../components/MathText";

export default function Page() {
  return (
    <LeccionShell
      unidad="FIS-02"
      tituloUnidad="Cinemática en una dimensión"
      escenas={[
        { titulo: "Conceptos: posición, desplazamiento, distancia", componente: EscConceptos },
        { titulo: "Velocidad y rapidez", componente: EscVelocidad },
        { titulo: "Aceleración", componente: EscAceleracion },
        { titulo: "MRU · movimiento uniforme", componente: EscMRU },
        { titulo: "MRUA · aceleración constante", componente: EscMRUA },
        { titulo: "Las 4 ecuaciones del MRUA", componente: EscEcuaciones },
        { titulo: "Caída libre", componente: EscCaidaLibre },
        { titulo: "Problemas tipo examen", componente: EscProblemasTipo },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

// ─── Diagrama de recta numérica: distancia vs desplazamiento ───
function RectaIdaYVuelta() {
  const xMin = -10, xMax = 110;
  const sx = scalerX(xMin, xMax, 480, 30, 30);
  const yLinea = 150;
  const xA = sx(0), xB = sx(100);
  return (
    <Pizarra alto={200}>
      <svg width="100%" height="100%" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
        {/* arco de ida (arriba) */}
        <path d={`M ${xA} ${yLinea} Q ${(xA + xB) / 2} ${yLinea - 55} ${xB} ${yLinea}`}
          fill="none" stroke={LIENZO.ok} strokeWidth="2.5" markerEnd="url(#archead)" />
        <text x={(xA + xB) / 2} y={yLinea - 62} textAnchor="middle" fontSize="12" fill={LIENZO.ok} fontWeight="700">ida: 100 m</text>
        {/* arco de vuelta (abajo) */}
        <path d={`M ${xB} ${yLinea} Q ${(xA + xB) / 2} ${yLinea + 55} ${xA} ${yLinea}`}
          fill="none" stroke={LIENZO.warn} strokeWidth="2.5" markerEnd="url(#archead2)" />
        <text x={(xA + xB) / 2} y={yLinea + 68} textAnchor="middle" fontSize="12" fill={LIENZO.warn} fontWeight="700">vuelta: 100 m</text>
        <defs>
          <marker id="archead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.ok} /></marker>
          <marker id="archead2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.warn} /></marker>
        </defs>
        {/* linea base */}
        <line x1={sx(xMin + 5)} x2={sx(xMax - 5)} y1={yLinea} y2={yLinea} stroke={LIENZO.fg} strokeWidth="1.5" />
        <circle cx={xA} cy={yLinea} r="6" fill={LIENZO.accent} />
        <text x={xA} y={yLinea + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.fg}>A (0 m)</text>
        <circle cx={xB} cy={yLinea} r="6" fill={LIENZO.accent} />
        <text x={xB} y={yLinea + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.fg}>B (100 m)</text>
      </svg>
    </Pizarra>
  );
}

function EscConceptos() {
  return (
    <EscenaRica>
      <Titulo>Conceptos básicos · posición, desplazamiento, distancia</Titulo>

      <Hook>
        Cinemática 1D es lo más preguntado en el examen FCyT (4-5 preguntas
        de física típicas). MRU, MRUA, caída libre, todas se resuelven con
        4 ecuaciones que vas a memorizar acá.
      </Hook>

      <Definicion termino="Posición (x)">
        Ubicación de un objeto respecto a un punto de referencia (origen). Es
        una magnitud VECTORIAL (puede ser positiva o negativa según el sentido).
      </Definicion>

      <Definicion termino="Desplazamiento (Δx)">
        Cambio de posición: <MathText>{"$\\Delta x = x_f - x_i$"}</MathText>. Vectorial. Puede ser
        positivo, negativo o cero. NO es lo mismo que distancia recorrida.
      </Definicion>

      <Definicion termino="Distancia recorrida (d)">
        Longitud total del camino recorrido. Escalar, siempre positiva.
      </Definicion>

      <RectaIdaYVuelta />

      <WorkedExample titulo="Diferencia clave">
        Un auto va de A (posición 0) a B (posición 100 m) y vuelve a A:<br />
        • Distancia recorrida: 100 + 100 = 200 m.<br />
        • Desplazamiento: 0 − 0 = 0 m (volvió al punto de partida).<br /><br />
        Por eso son cantidades distintas.
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Gráfico x-t con recta secante mostrando pendiente = velocidad media ───
function GraficoVelocidadMedia() {
  const xMin = 0, xMax = 5, yMin = 0, yMax = 250, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const t1 = 0, x1 = 0, t2 = 4, x2 = 200;
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        {/* Δt (horizontal) */}
        <line x1={sx(t1)} y1={sy(x1)} x2={sx(t2)} y2={sy(x1)} stroke={LIENZO.warn} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={(sx(t1) + sx(t2)) / 2} y={sy(x1) + 16} textAnchor="middle" fontSize="11" fill={LIENZO.warn} fontWeight="700">Δt = 4 h</text>
        {/* Δx (vertical) */}
        <line x1={sx(t2)} y1={sy(x1)} x2={sx(t2)} y2={sy(x2)} stroke={LIENZO.ok} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={sx(t2) + 8} y={(sy(x1) + sy(x2)) / 2} fontSize="11" fill={LIENZO.ok} fontWeight="700">Δx = 200 km</text>
        {/* secante */}
        <line x1={sx(t1)} y1={sy(x1)} x2={sx(t2)} y2={sy(x2)} stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <circle cx={sx(t1)} cy={sy(x1)} r="5" fill={LIENZO.accent} />
        <circle cx={sx(t2)} cy={sy(x2)} r="5" fill={LIENZO.accent} />
      </Ejes>
    </Pizarra>
  );
}

function EscVelocidad() {
  return (
    <EscenaRica>
      <Titulo>Velocidad y rapidez</Titulo>

      <Definicion termino="Velocidad (v)">
        Cambio de posición por unidad de tiempo. Es VECTORIAL (tiene dirección).
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <MathText>{"$v = \\dfrac{\\Delta x}{\\Delta t}$"}</MathText>
        </div>
        Unidad SI: m/s.
      </Definicion>

      <Definicion termino="Rapidez">
        Es la magnitud de la velocidad. Escalar, positiva. En la calle se llama
        "velocidad" pero técnicamente es rapidez.
      </Definicion>

      <Definicion termino="Velocidad media vs instantánea">
        • <strong>Media</strong>: <MathText>{"$v_m = \\dfrac{\\Delta x}{\\Delta t}$"}</MathText> (cambio total / tiempo total).<br />
        • <strong>Instantánea</strong>: la velocidad en un momento dado
        específico. En MRU son iguales; en otros movimientos varían.
      </Definicion>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        La pendiente de la recta secante en un gráfico x-t ES la velocidad media
      </p>
      <GraficoVelocidadMedia />

      <Ejemplo titulo="Velocidad media">
        Un auto recorre 200 km en 4 horas (con paradas y cambios). Velocidad
        media: <MathText>{"$v_m = \\dfrac{200}{4} = 50$"}</MathText> km/h. La velocidad instantánea pudo ser
        cualquier valor.
      </Ejemplo>
    </EscenaRica>
  );
}

// ─── Gráfico v-t con recta secante mostrando pendiente = aceleración ───
function GraficoAceleracionMedia() {
  const xMin = 0, xMax = 5, yMin = 0, yMax = 35, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const t1 = 0, v1 = 10, t2 = 4, v2 = 30;
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        <line x1={sx(t1)} y1={sy(v1)} x2={sx(t2)} y2={sy(v1)} stroke={LIENZO.warn} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={(sx(t1) + sx(t2)) / 2} y={sy(v1) + 16} textAnchor="middle" fontSize="11" fill={LIENZO.warn} fontWeight="700">Δt = 4 s</text>
        <line x1={sx(t2)} y1={sy(v1)} x2={sx(t2)} y2={sy(v2)} stroke={LIENZO.ok} strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={sx(t2) + 8} y={(sy(v1) + sy(v2)) / 2} fontSize="11" fill={LIENZO.ok} fontWeight="700">Δv = 20 m/s</text>
        <line x1={sx(t1)} y1={sy(v1)} x2={sx(t2)} y2={sy(v2)} stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <circle cx={sx(t1)} cy={sy(v1)} r="5" fill={LIENZO.accent} />
        <circle cx={sx(t2)} cy={sy(v2)} r="5" fill={LIENZO.accent} />
      </Ejes>
    </Pizarra>
  );
}

function EscAceleracion() {
  return (
    <EscenaRica>
      <Titulo>Aceleración</Titulo>

      <Definicion termino="Aceleración (a)">
        Cambio de velocidad por unidad de tiempo. Vectorial.
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <MathText>{"$a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{v_f - v_i}{t}$"}</MathText>
        </div>
        Unidad SI: m/s².
      </Definicion>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        En un gráfico v-t, la pendiente de la recta ES la aceleración
      </p>
      <GraficoAceleracionMedia />

      <Resumen>
        <strong>Interpretación del signo</strong>:<br />
        • Si v y a tienen el mismo signo: el objeto ACELERA (va más rápido).<br />
        • Si v y a tienen signos opuestos: el objeto DESACELERA (frena).<br />
        • Si a = 0: velocidad constante (MRU).
      </Resumen>

      <Cuidado>
        "Aceleración negativa" no siempre significa "frenar". Significa que el
        vector aceleración apunta en sentido negativo del eje. Si el objeto
        también va en sentido negativo, está acelerando (yendo más rápido en
        sentido negativo).
      </Cuidado>
    </EscenaRica>
  );
}

// ─── Gráfico x-t de MRU (recta) con el ejemplo del auto ───
function GraficoMRU() {
  const xMin = 0, xMax = 3, yMin = 0, yMax = 260, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const x0 = 50, v = 60;
  const puntos = [0, 1, 2, 3].map((t) => ({ t, x: x0 + v * t }));
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        <motion.line
          x1={sx(0)} y1={sy(x0)} x2={sx(3)} y2={sy(x0 + v * 3)}
          stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }}
        />
        {puntos.map((p) => (
          <circle key={p.t} cx={sx(p.t)} cy={sy(p.x)} r="4" fill={LIENZO.fg} />
        ))}
        <circle cx={sx(2)} cy={sy(170)} r="6" fill={LIENZO.ok} />
        <text x={sx(2) + 10} y={sy(170) - 8} fontSize="12" fill={LIENZO.ok} fontWeight="700">t=2h → x=170 km</text>
      </Ejes>
    </Pizarra>
  );
}

function EscMRU() {
  return (
    <EscenaRica>
      <Titulo>MRU · Movimiento Rectilíneo Uniforme</Titulo>

      <Definicion termino="MRU">
        Movimiento en línea recta con velocidad constante (a = 0).
      </Definicion>

      <Resumen>
        <strong>Ecuación del MRU</strong>:
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$x = x_0 + v \\cdot t$"}</MathText>
        </div>
        • x: posición al tiempo t.<br />
        • x₀: posición inicial.<br />
        • v: velocidad constante.<br />
        • t: tiempo transcurrido.
      </Resumen>

      <PorQue>
        Como la velocidad es constante: distancia = velocidad × tiempo. Si
        empezás en x₀, después de tiempo t estás en x = x₀ + vt. En un gráfico
        x-t, esto es siempre una RECTA (pendiente = v).
      </PorQue>

      <Ejemplo titulo="MRU típico">
        Un auto a 60 km/h por una autopista recta. En 2 h recorre 120 km. Si
        empezó en km 50, está en km 170.
      </Ejemplo>
      <GraficoMRU />

      <WorkedExample titulo="Problema de persecución (estilo facsímil)">
        Un auto A va a 30 m/s. Dos segundos después, desde el mismo punto, sale
        un auto B con aceleración 5 m/s². ¿A qué distancia se encuentran?<br /><br />

        <strong>Posición de A:</strong> <MathText>{"$x_A = 30t$"}</MathText> (MRU).<br />
        <strong>Posición de B:</strong> <MathText>{"$x_B = \\tfrac12(5)(t-2)^2$"}</MathText> (MRUA desde t=2).<br /><br />

        <strong>Igualar:</strong> <MathText>{"$30t = 2.5(t-2)^2$"}</MathText>
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$t^2 - 16t + 4 = 0$"}</MathText>
        </div>
        <MathText>{"$t = \\dfrac{16+\\sqrt{240}}{2} \\approx 15.75\\text{ s}$"}</MathText><br /><br />

        <strong>Posición:</strong> x_A = 30 · 15.75 ≈ <strong>472.5 m</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Par de gráficos v-t / x-t interactivos con slider de aceleración ───
function MRUAInteractivo() {
  const [a, setA] = useState(2);
  const altoChico = 170;
  const tMax = 4;
  // v-t: recta v = a*t
  const vMax = Math.max(2, Math.abs(a) * tMax) * 1.15;
  const sxV = scalerX(0, tMax);
  const syV = scalerY(-vMax, vMax, altoChico);
  // x-t: parabola x = 0.5*a*t^2
  const xEnTmax = 0.5 * a * tMax * tMax;
  const xMaxAbs = Math.max(2, Math.abs(xEnTmax)) * 1.15;
  const syX = scalerY(a >= 0 ? -xMaxAbs * 0.15 : -xMaxAbs, a >= 0 ? xMaxAbs : xMaxAbs * 0.15, altoChico);
  const puntosParabola = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const t = (tMax * i) / 20;
      pts.push({ t, x: 0.5 * a * t * t });
    }
    return pts;
  }, [a]);
  const pathParabola = puntosParabola.map((p, i) => `${i === 0 ? "M" : "L"} ${sxV(p.t)} ${syX(p.x)}`).join(" ");

  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: LIENZO.fgDim, textAlign: "center", marginBottom: 4 }}>v-t (recta, pendiente = a)</div>
          <Pizarra alto={altoChico}>
            <Ejes xMin={0} xMax={tMax} yMin={-vMax} yMax={vMax} alto={altoChico}>
              <motion.line x1={sxV(0)} y1={syV(0)} x2={sxV(tMax)} y2={syV(a * tMax)}
                stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round"
                animate={{ x2: sxV(tMax), y2: syV(a * tMax) }} transition={{ duration: 0.25 }} />
            </Ejes>
          </Pizarra>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: LIENZO.fgDim, textAlign: "center", marginBottom: 4 }}>x-t (parábola)</div>
          <Pizarra alto={altoChico}>
            <Ejes xMin={0} xMax={tMax} yMin={a >= 0 ? -xMaxAbs * 0.15 : -xMaxAbs} yMax={a >= 0 ? xMaxAbs : xMaxAbs * 0.15} alto={altoChico}>
              <motion.path d={pathParabola} fill="none" stroke={LIENZO.ok} strokeWidth="3" strokeLinecap="round" />
            </Ejes>
          </Pizarra>
        </div>
      </div>
      <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
        Aceleración a = <strong style={{ color: LIENZO.accent }}>{a} m/s²</strong> (parte del reposo, v₀=0, x₀=0)
        <input type="range" min={-3} max={3} step={0.5} value={a}
          onChange={(e) => setA(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.accent }} />
      </label>
    </div>
  );
}

function EscMRUA() {
  return (
    <EscenaRica>
      <Titulo>MRUA · Movimiento Rectilíneo Uniformemente Acelerado</Titulo>

      <Definicion termino="MRUA">
        Movimiento en línea recta con aceleración constante (a ≠ 0). La
        velocidad cambia uniformemente con el tiempo.
      </Definicion>

      <MRUAInteractivo />

      <Resumen>
        <strong>Ecuaciones del MRUA (las 4 fundamentales)</strong>:<br />
        1. <MathText>{"$v = v_0 + at$"}</MathText> (velocidad a tiempo t).<br />
        2. <MathText>{"$x = x_0 + v_0t + \\tfrac12 at^2$"}</MathText> (posición a tiempo t).<br />
        3. <MathText>{"$v^2 = v_0^2 + 2a(x-x_0)$"}</MathText> (velocidad final dado el desplazamiento).<br />
        4. <MathText>{"$x = x_0 + \\dfrac{v+v_0}{2}t$"}</MathText> (posición con velocidad media).
      </Resumen>

      <Mnemotecnia>
        <strong>Cuándo usar cada ecuación</strong>:<br />
        • Si conocés t y querés v: ec. 1.<br />
        • Si conocés t y querés x: ec. 2.<br />
        • Si NO conocés t pero conocés x: ec. 3.<br />
        • Si conocés v₀ y v final y querés x: ec. 4.<br /><br />
        Es importante identificar primero los datos para elegir la ecuación.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─── v-t con área sombreada = distancia (problema de frenado) ───
function GraficoFrenadoArea() {
  const v0 = 28.7, a = -7.84;
  const tFinal = v0 / -a; // ≈ 3.66 s
  const xMin = 0, xMax = tFinal * 1.1, yMin = 0, yMax = v0 * 1.15, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const areaPath = `M ${sx(0)} ${sy(0)} L ${sx(0)} ${sy(v0)} L ${sx(tFinal)} ${sy(0)} Z`;
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        <path d={areaPath} fill={LIENZO.accent} opacity="0.18" />
        <line x1={sx(0)} y1={sy(v0)} x2={sx(tFinal)} y2={sy(0)} stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <text x={sx(tFinal * 0.32)} y={sy(v0 * 0.4)} fontSize="12" fontWeight="700" fill={LIENZO.accent}>área = distancia = 52.53 m</text>
        <circle cx={sx(0)} cy={sy(v0)} r="5" fill={LIENZO.fg} />
        <text x={sx(0) + 6} y={sy(v0) - 8} fontSize="11" fill={LIENZO.fgDim}>v₀=28.7 m/s</text>
      </Ejes>
    </Pizarra>
  );
}

function EscEcuaciones() {
  return (
    <EscenaRica>
      <Titulo>Aplicando las 4 ecuaciones</Titulo>

      <WorkedExample titulo="Problema completo">
        Una pelota parte del reposo y rueda con aceleración 5.33 m/s². ¿Qué
        distancia cubre en los primeros 5 s?<br /><br />

        Datos: v₀ = 0, a = 5.33 m/s², t = 5 s. Buscamos x.<br />
        Usando ec. 2: <MathText>{"$x = 0 \\cdot 5 + \\tfrac12(5.33)(25) = 66.67\\text{ m}$"}</MathText><br /><br />

        Esto replica el problema F11 del facsímil 2op-2-2025.
      </WorkedExample>

      <WorkedExample titulo="Problema de frenado · facsímil F14 1op-2-2025">
        Coeficiente de fricción 0.80, velocidad inicial 28.7 m/s, ¿distancia
        para detenerse?<br /><br />

        Desaceleración: <MathText>{"$a = \\mu g = 0.80 \\cdot 9.8 = 7.84\\text{ m/s}^2$"}</MathText> (en sentido contrario
        al movimiento, por eso será −7.84).<br /><br />

        Usando ec. 3 con v = 0 (se detiene):
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$0 = v_0^2 + 2ad \\ \\Rightarrow\\ d = \\dfrac{v_0^2}{2a} = \\dfrac{823.69}{15.68}$"}</MathText>
        </div>
        <strong>52.53 m</strong>. El área bajo el gráfico v-t (triángulo) es exactamente esa distancia:
      </WorkedExample>
      <GraficoFrenadoArea />
    </EscenaRica>
  );
}

// ─── Diagrama del pozo con eco (caída libre + sonido) ───
function DiagramaPozoEco() {
  const alto = 240, W = 480;
  const yTope = 30, yFondo = 200;
  const xPozo = 240;
  return (
    <Pizarra alto={alto}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${alto}`} preserveAspectRatio="xMidYMid meet">
        <line x1={xPozo - 45} y1={yTope} x2={xPozo - 45} y2={yFondo} stroke={LIENZO.fg} strokeWidth="2" />
        <line x1={xPozo + 45} y1={yTope} x2={xPozo + 45} y2={yFondo} stroke={LIENZO.fg} strokeWidth="2" />
        <line x1={xPozo - 55} y1={yFondo} x2={xPozo + 55} y2={yFondo} stroke={LIENZO.fg} strokeWidth="2" />
        <line x1={xPozo - 60} y1={yTope} x2={xPozo + 60} y2={yTope} stroke={LIENZO.fgDim} strokeWidth="2" />
        <text x={xPozo} y={yTope - 8} textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>superficie</text>
        <motion.circle cx={xPozo} cy={yTope + 15} r="6" fill={LIENZO.accent}
          animate={{ cy: [yTope + 15, yFondo - 8] }} transition={{ duration: 1.4, ease: "easeIn", repeat: Infinity, repeatDelay: 0.8 }} />
        <text x={xPozo + 65} y={(yTope + yFondo) / 2 - 10} fontSize="12" fill={LIENZO.accent} fontWeight="700">caída: t₁ = 8 s</text>
        <text x={xPozo + 65} y={(yTope + yFondo) / 2 + 14} fontSize="12" fill={LIENZO.ok} fontWeight="700">sonido: t₂ = 1 s</text>
        <text x={xPozo} y={yFondo + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill={LIENZO.fg}>profundidad = 320 m</text>
      </svg>
    </Pizarra>
  );
}

function EscCaidaLibre() {
  return (
    <EscenaRica>
      <Titulo>Caída libre · MRUA con g</Titulo>

      <Definicion termino="Caída libre">
        Movimiento de un objeto bajo la acción exclusiva de la gravedad. La
        aceleración es constante e igual a g = 9.8 m/s² (a menudo aproximada
        a 10 m/s²) hacia abajo.
      </Definicion>

      <Resumen>
        <strong>Adaptación de las ecuaciones</strong>: si y es vertical (positivo hacia arriba), la aceleración es a = −g.<br />
        • <MathText>{"$v = v_0 - gt$"}</MathText><br />
        • <MathText>{"$y = y_0 + v_0t - \\tfrac12 gt^2$"}</MathText><br />
        • <MathText>{"$v^2 = v_0^2 - 2g(y-y_0)$"}</MathText>
      </Resumen>

      <WorkedExample titulo="Lanzamiento vertical hacia arriba">
        Una pelota se lanza hacia arriba con v₀ = 20 m/s. ¿Cuánto tarda en
        alcanzar la altura máxima? (g = 10)<br /><br />

        En la altura máxima v = 0. Usando <MathText>{"$v = v_0 - gt$"}</MathText>:
        <MathText>{"$0 = 20 - 10t \\ \\Rightarrow\\ t = 2\\text{ s}$"}</MathText><br /><br />

        Altura máxima: <MathText>{"$y = 40 - 20 = 20\\text{ m}$"}</MathText>
      </WorkedExample>

      <WorkedExample titulo="Pozo con eco · facsímil F10 3op-2025">
        Una piedra se deja caer en un pozo y el ruido al chocar se oye 9 s
        después. Velocidad sonido = 320 m/s, g = 10. ¿Profundidad del pozo?<br /><br />

        Tiempo total = tiempo de caída + tiempo del sonido subiendo.<br />
        Caída: <MathText>{"$h = \\tfrac12 gt_1^2 \\ \\Rightarrow\\ t_1 = \\sqrt{\\dfrac{2h}{g}}$"}</MathText><br />
        Sonido: <MathText>{"$t_2 = \\dfrac{h}{320}$"}</MathText>, y <MathText>{"$t_1+t_2=9$"}</MathText><br /><br />

        Probando h = 320: t₁ = √64 = 8 s; t₂ = 1 s; total = 9 ✓.
      </WorkedExample>
      <DiagramaPozoEco />
    </EscenaRica>
  );
}

// ─── x-t de dos móviles cruzándose (problema de persecución) ───
function GraficoEncuentro() {
  const xMin = 0, xMax = 3.5, yMin = 0, yMax = 22, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const puntosMicro = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const t = (xMax * i) / 20;
      pts.push({ t, x: 6 + t * t });
    }
    return pts;
  }, []);
  const pathMicro = puntosMicro.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.t)} ${sy(p.x)}`).join(" ");
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        <line x1={sx(0)} y1={sy(0)} x2={sx(3.5)} y2={sy(17.5)} stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <path d={pathMicro} fill="none" stroke={LIENZO.warn} strokeWidth="3" strokeLinecap="round" />
        <circle cx={sx(2)} cy={sy(10)} r="6" fill={LIENZO.ok} />
        <text x={sx(2) + 8} y={sy(10) - 10} fontSize="12" fontWeight="700" fill={LIENZO.ok}>encuentro: t=2s, x=10m</text>
        <text x={sx(3.3)} y={sy(16)} fontSize="11" fill={LIENZO.accent} fontWeight="700" textAnchor="end">hombre (5t)</text>
        <text x={sx(3.3)} y={sy(19.5)} fontSize="11" fill={LIENZO.warn} fontWeight="700" textAnchor="end">microbús (6+t²)</text>
      </Ejes>
    </Pizarra>
  );
}

function EscProblemasTipo() {
  return (
    <EscenaRica>
      <Titulo>Más problemas tipo examen</Titulo>

      <WorkedExample titulo="Pelota desde colina · F11 2op-2-2025">
        Una pelota parte del reposo y baja una colina con aceleración uniforme,
        recorriendo 200 m entre los segundos 5 y 10. ¿Qué distancia cubrió en
        los primeros 5 s?<br /><br />

        Entre 5 y 10 s recorre: <MathText>{"$\\Delta x = \\tfrac12 a(10^2-5^2) = 37.5a$"}</MathText><br />
        Igualando a 200: <MathText>{"$a = \\dfrac{200}{37.5} = 5.33\\text{ m/s}^2$"}</MathText><br /><br />

        Primeros 5 s: <MathText>{"$x = \\tfrac12(5.33)(25) = 66.67\\text{ m}$"}</MathText>
      </WorkedExample>

      <WorkedExample titulo="Persecución · F9 3op-2025">
        Un hombre corre a 5 m/s tras un microbús en reposo a 6 m de distancia.
        El microbús parte con aceleración 2 m/s². ¿Tiempo en alcanzarlo?<br /><br />

        Posición hombre: <MathText>{"$5t$"}</MathText>. Posición microbús: <MathText>{"$6+\\tfrac12(2)t^2 = 6+t^2$"}</MathText><br /><br />

        Igualar: <MathText>{"$5t = 6+t^2 \\ \\Rightarrow\\ t^2-5t+6=0 \\ \\Rightarrow\\ t=2\\text{ ó }t=3$"}</MathText><br />
        Primer encuentro: <strong>t = 2 s</strong>.
      </WorkedExample>
      <GraficoEncuentro />
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Un objeto en reposo cae libremente. Distancia recorrida en 3 s (g=10):",
      o: ["45 m", "30 m", "90 m", "9 m"],
      c: 0,
      ex: "$y = \\tfrac12(10)(9) = 45$ m.",
    },
    {
      p: "Auto frena de 20 m/s a 0 en 5 s. Aceleración:",
      o: ["-4 m/s²", "4 m/s²", "-100 m/s²", "0 m/s²"],
      c: 0,
      ex: "$a = \\dfrac{0-20}{5} = -4$ m/s². (Negativa = frenado).",
    },
    {
      p: "MRU: si v=20 m/s y empezamos en x₀=10 m, ¿posición en t=4 s?",
      o: ["90 m", "80 m", "10 m", "30 m"],
      c: 0,
      ex: "$x = 10 + 20\\cdot4 = 90$ m.",
    },
    {
      p: "Tiempo de caída desde 80 m (g=10, v₀=0):",
      o: ["4 s", "8 s", "16 s", "2 s"],
      c: 0,
      ex: "$80 = \\tfrac12(10)t^2 \\Rightarrow t^2 = 16 \\Rightarrow t = 4$",
    },
    {
      p: "Velocidad al impactar el suelo desde 20 m (g=10):",
      o: ["20 m/s", "10 m/s", "40 m/s", "200 m/s"],
      c: 0,
      ex: "$v^2 = 0 + 2(10)(20) = 400 \\Rightarrow v = 20$ m/s.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · confundir desplazamiento con distancia">
        Si volvés al punto de partida, desplazamiento = 0 pero distancia es lo
        que recorriste total.
      </Misconception>

      <Misconception titulo="Error 2 · signo de g en caída libre">
        Si tomás "positivo hacia arriba", g va con signo negativo en las
        ecuaciones (a = −g = −9.8). Si tomás "positivo hacia abajo",
        a = +g = +9.8.
      </Misconception>

      <Misconception titulo="Error 3 · usar v_media para encontrar posiciones intermedias">
        <MathText>{"$v_m = \\dfrac{\\Delta x}{\\Delta t}$"}</MathText> solo te da la posición FINAL si conocés el tiempo
        total. No es la velocidad en momentos intermedios (a menos que el
        movimiento sea MRU).
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
                <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}<MathText>{e.ex}</MathText>
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
