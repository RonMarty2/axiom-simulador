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
      unidad="FIS-03"
      tituloUnidad="Cinemática en dos dimensiones"
      escenas={[
        { titulo: "Movimiento en 2D · independencia de ejes", componente: EscIntro },
        { titulo: "Tiro parabólico · ecuaciones", componente: EscParabolico },
        { titulo: "Alcance, altura máxima, tiempo de vuelo", componente: EscFormulas },
        { titulo: "Problemas tipo de tiro parabólico", componente: EscProblemas },
        { titulo: "Movimiento circular uniforme", componente: EscMCU },
        { titulo: "Movimiento circular acelerado", componente: EscMCA },
        { titulo: "Aplicaciones de movimiento circular", componente: EscAplicCirc },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

// ─── Trayectoria estroboscópica: puntos a intervalos iguales de tiempo ───
function TrayectoriaEstrobos() {
  const v0 = 20, angDeg = 45, g = 10;
  const ang = (angDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(ang), vy0 = v0 * Math.sin(ang);
  const T = (2 * vy0) / g;
  const n = 8;
  const pts = useMemo(() => Array.from({ length: n + 1 }, (_, i) => {
    const t = (T * i) / n;
    return { t, x: vx * t, y: vy0 * t - 0.5 * g * t * t };
  }), []);
  const xMax = vx * T * 1.08;
  const yMax = Math.max(...pts.map((p) => p.y)) * 1.35;
  const alto = 240;
  const sx = scalerX(0, xMax);
  const sy = scalerY(-yMax * 0.2, yMax, alto);
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={0} xMax={xMax} yMin={-yMax * 0.2} yMax={yMax} alto={alto}>
        {pts.map((p, i) => (
          <g key={i}>
            <line x1={sx(p.x)} y1={sy(p.y)} x2={sx(p.x)} y2={sy(0)} stroke={LIENZO.fgFaint} strokeWidth="1" strokeDasharray="2 3" />
            <circle cx={sx(p.x)} cy={sy(p.y)} r="4" fill={LIENZO.accent} />
          </g>
        ))}
      </Ejes>
    </Pizarra>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Cinemática 2D · descompongo en X e Y</Titulo>

      <Hook>
        Cinemática 2D aparece MUCHO en el examen FCyT (5 preguntas observadas
        en facsímiles). Tiro parabólico es el rey de las preguntas. Movimiento
        circular es el segundo.
      </Hook>

      <Resumen>
        <strong>Principio clave</strong>: en 2D, el movimiento en X y en Y son
        INDEPENDIENTES. Cada eje sigue sus propias ecuaciones cinemáticas. El
        tiempo es el ÚNICO elemento común.
      </Resumen>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        Puntos a intervalos IGUALES de tiempo: la separación horizontal es constante (MRU), la vertical cambia (MRUA)
      </p>
      <TrayectoriaEstrobos />

      <PorQue>
        Esto se llama "principio de superposición". Una pelota lanzada
        horizontalmente cae igual que una soltada desde reposo, solo que
        además se mueve horizontalmente. El movimiento vertical NO afecta al
        horizontal y viceversa.
      </PorQue>
    </EscenaRica>
  );
}

// ─── Vector v0 descompuesto en vx, vy + trayectoria de fondo ───
function DescomposicionVector() {
  const v0 = 20, angDeg = 45, g = 10;
  const ang = (angDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(ang), vy0 = v0 * Math.sin(ang);
  const T = (2 * vy0) / g;
  const puntos = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= 20; i++) {
      const t = (T * i) / 20;
      arr.push({ x: vx * t, y: vy0 * t - 0.5 * g * t * t });
    }
    return arr;
  }, []);
  const xMax = vx * T * 1.1, yMax = Math.max(...puntos.map((p) => p.y)) * 1.6;
  const alto = 240;
  const sx = scalerX(0, xMax);
  const sy = scalerY(-yMax * 0.15, yMax, alto);
  const escalaVec = yMax / v0 / 2.2;
  const path = puntos.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x)} ${sy(p.y)}`).join(" ");
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={0} xMax={xMax} yMin={-yMax * 0.15} yMax={yMax} alto={alto}>
        <path d={path} fill="none" stroke={LIENZO.fgFaint} strokeWidth="2" strokeDasharray="4 3" />
        <line x1={sx(0)} y1={sy(0)} x2={sx(vx * escalaVec)} y2={sy(vy0 * escalaVec)} stroke={LIENZO.accent} strokeWidth="3" markerEnd="url(#flechaAcc)" />
        <line x1={sx(0)} y1={sy(0)} x2={sx(vx * escalaVec)} y2={sy(0)} stroke={LIENZO.warn} strokeWidth="2.5" strokeDasharray="3 2" markerEnd="url(#flechaWarn)" />
        <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(vy0 * escalaVec)} stroke={LIENZO.ok} strokeWidth="2.5" strokeDasharray="3 2" markerEnd="url(#flechaOk)" />
        <defs>
          <marker id="flechaAcc" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.accent} /></marker>
          <marker id="flechaWarn" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.warn} /></marker>
          <marker id="flechaOk" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.ok} /></marker>
        </defs>
        <text x={sx(vx * escalaVec) + 6} y={sy(vy0 * escalaVec)} fontSize="12" fontWeight="700" fill={LIENZO.accent}>v₀</text>
        <text x={sx(vx * escalaVec / 2)} y={sy(0) + 16} fontSize="11" fontWeight="700" fill={LIENZO.warn} textAnchor="middle">v₀cos θ</text>
        <text x={sx(0) - 8} y={sy(vy0 * escalaVec / 2)} fontSize="11" fontWeight="700" fill={LIENZO.ok} textAnchor="end">v₀sen θ</text>
      </Ejes>
    </Pizarra>
  );
}

function EscParabolico() {
  return (
    <EscenaRica>
      <Titulo>Tiro parabólico</Titulo>

      <Definicion termino="Tiro parabólico">
        Movimiento de un proyectil lanzado con velocidad inicial que forma un
        ángulo con la horizontal, bajo la acción de la gravedad. La trayectoria
        es una parábola.
      </Definicion>

      <DescomposicionVector />

      <Resumen>
        <strong>Si v₀ es la velocidad inicial y θ el ángulo con la horizontal</strong>:<br />
        • Componente horizontal: <MathText>{"$v_x = v_0\\cos\\theta$"}</MathText> (constante).<br />
        • Componente vertical: <MathText>{"$v_y = v_0\\sin\\theta$"}</MathText> (varía con el tiempo).
      </Resumen>

      <Resumen>
        <strong>Ecuaciones del movimiento</strong>:<br />
        • Horizontal (MRU): <MathText>{"$x = v_0\\cos\\theta \\cdot t$"}</MathText><br />
        • Vertical (MRUA con −g): <MathText>{"$y = v_0\\sin\\theta \\cdot t - \\tfrac12 gt^2$"}</MathText><br />
        • Velocidad vertical: <MathText>{"$v_y = v_0\\sin\\theta - gt$"}</MathText>
      </Resumen>

      <Mnemotecnia>
        <strong>Estrategia general</strong>: descompongo en X e Y, resuelvo
        cada eje por separado usando las ecuaciones de cinemática 1D. El
        TIEMPO es el "pegamento" que conecta ambos.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─── Parábola con T, R, H marcados ───
function ParabolaTRH() {
  const v0 = 20, angDeg = 45, g = 10;
  const ang = (angDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(ang), vy0 = v0 * Math.sin(ang);
  const T = (2 * vy0) / g;
  const R = vx * T;
  const H = (vy0 * vy0) / (2 * g);
  const tH = vy0 / g;
  const puntos = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= 30; i++) {
      const t = (T * i) / 30;
      arr.push({ x: vx * t, y: vy0 * t - 0.5 * g * t * t });
    }
    return arr;
  }, []);
  const alto = 240;
  const sx = scalerX(0, R * 1.1);
  const sy = scalerY(-H * 0.25, H * 1.3, alto);
  const path = puntos.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x)} ${sy(p.y)}`).join(" ");
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={0} xMax={R * 1.1} yMin={-H * 0.25} yMax={H * 1.3} alto={alto}>
        <path d={path} fill="none" stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <line x1={sx(vx * tH)} y1={sy(0)} x2={sx(vx * tH)} y2={sy(H)} stroke={LIENZO.ok} strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx={sx(vx * tH)} cy={sy(H)} r="5" fill={LIENZO.ok} />
        <text x={sx(vx * tH)} y={sy(H) - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.ok}>H = 20 m</text>
        <line x1={sx(0)} y1={sy(-H * 0.12)} x2={sx(R)} y2={sy(-H * 0.12)} stroke={LIENZO.warn} strokeWidth="1.5" />
        <text x={sx(R / 2)} y={sy(-H * 0.12) - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill={LIENZO.warn}>R = 40 m</text>
        <circle cx={sx(0)} cy={sy(0)} r="4" fill={LIENZO.fg} />
        <circle cx={sx(R)} cy={sy(0)} r="4" fill={LIENZO.fg} />
        <text x={sx(R)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill={LIENZO.fgDim}>T = 2√2 s</text>
      </Ejes>
    </Pizarra>
  );
}

function EscFormulas() {
  return (
    <EscenaRica>
      <Titulo>Fórmulas útiles · alcance, altura máx, tiempo</Titulo>

      <Resumen>
        <strong>Para lanzamiento desde el suelo y aterrizaje al suelo (misma altura)</strong>:<br /><br />
        • <strong>Tiempo de vuelo total</strong>: <MathText>{"$T = \\dfrac{2v_0\\sin\\theta}{g}$"}</MathText><br />
        • <strong>Alcance horizontal máximo (en θ=45°)</strong>: <MathText>{"$R = \\dfrac{v_0^2}{g}$"}</MathText><br />
        • <strong>Alcance general</strong>: <MathText>{"$R = \\dfrac{v_0^2\\sin(2\\theta)}{g}$"}</MathText><br />
        • <strong>Altura máxima</strong>: <MathText>{"$H = \\dfrac{v_0^2\\sin^2\\theta}{2g}$"}</MathText><br />
        • <strong>Tiempo a altura máxima</strong>: <MathText>{"$t_H = \\dfrac{v_0\\sin\\theta}{g}$"}</MathText> (mitad del tiempo total)
      </Resumen>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        Ejemplo con v₀=20 m/s, θ=45°, g=10
      </p>
      <ParabolaTRH />

      <PorQue>
        <strong>¿Por qué 45° da el alcance máximo?</strong> <MathText>{"$R = \\dfrac{v_0^2\\sin(2\\theta)}{g}$"}</MathText>.
        El máximo de sen(2θ) es 1, que ocurre cuando 2θ = 90°, o sea θ = 45°.
        Cualquier otro ángulo da menos alcance.
      </PorQue>

      <Mnemotecnia>
        <strong>Simetría del tiro parabólico</strong>: el tiempo de subida
        hasta la altura máxima es IGUAL al tiempo de bajada. Por eso el tiempo
        total es 2 veces el tiempo a altura máxima. Y la velocidad al
        aterrizar tiene el mismo módulo que la inicial (en el suelo).
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─── Trayectoria del problema del bombero (impacto contra un edificio) ───
function GraficoBombero() {
  const v0 = 20, angDeg = 45, g = 9.8;
  const ang = (angDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(ang), vy0 = v0 * Math.sin(ang);
  const xEdificio = 25;
  const tImpacto = xEdificio / vx;
  const yImpacto = vy0 * tImpacto - 0.5 * g * tImpacto * tImpacto;
  const tMax = (2 * vy0) / g;
  const puntos = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= 30; i++) {
      const t = (Math.min(tImpacto * 1.15, tMax) * i) / 30;
      arr.push({ x: vx * t, y: vy0 * t - 0.5 * g * t * t });
    }
    return arr;
  }, []);
  const xMax = Math.max(...puntos.map((p) => p.x)) * 1.05;
  const yMax = Math.max(...puntos.map((p) => p.y)) * 1.3;
  const alto = 220;
  const sx = scalerX(0, xMax);
  const sy = scalerY(-yMax * 0.1, yMax, alto);
  const path = puntos.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.x)} ${sy(p.y)}`).join(" ");
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={0} xMax={xMax} yMin={-yMax * 0.1} yMax={yMax} alto={alto}>
        <path d={path} fill="none" stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <line x1={sx(xEdificio)} y1={sy(0)} x2={sx(xEdificio)} y2={sy(yMax * 0.9)} stroke={LIENZO.warn} strokeWidth="2" strokeDasharray="4 3" />
        <circle cx={sx(xEdificio)} cy={sy(yImpacto)} r="5" fill={LIENZO.ok} />
        <text x={sx(xEdificio) + 6} y={sy(yImpacto) - 8} fontSize="11" fontWeight="700" fill={LIENZO.ok}>impacto ≈ 9.68 m</text>
        <text x={sx(xEdificio)} y={sy(0) + 16} textAnchor="middle" fontSize="10" fill={LIENZO.fgDim}>edificio a 25 m</text>
      </Ejes>
    </Pizarra>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo del examen</Titulo>

      <WorkedExample titulo="Bombero con manguera · F12 1op-2-2025">
        Bombero lanza agua a 20 m/s a 45° desde el suelo. El edificio está a
        25 m. ¿A qué altura impacta el agua? (g = 9.8)<br /><br />

        <MathText>{"$v_x=v_y=20\\cos45^\\circ=14.14$"}</MathText> m/s.<br />
        Tiempo para llegar a 25 m: <MathText>{"$t = \\dfrac{25}{14.14} = 1.768\\text{ s}$"}</MathText><br />
        Altura: <MathText>{"$y = 14.14(1.768) - 4.9(1.768)^2 = 25-15.32$"}</MathText> = <strong>9.68 m</strong>
      </WorkedExample>
      <GraficoBombero />

      <WorkedExample titulo="Cañón sobre puente con blanco móvil · F13 1op-2-2025">
        Cañón en un puente de 125 m de altura dispara horizontalmente a
        200 m/s. Un tanque se aleja a 30 m/s a distancia d. ¿Distancia d para
        impacto? (g = 10)<br /><br />

        Tiempo de caída de 125 m: <MathText>{"$t = \\sqrt{\\dfrac{2\\cdot125}{10}} = 5\\text{ s}$"}</MathText><br />
        En 5 s el proyectil recorre 200·5 = 1000 m horizontal.<br />
        En 5 s el tanque se aleja 30·5 = 150 m. Posición final: d + 150.<br />
        Igualar: d + 150 = 1000 → d = <strong>850 m</strong>
      </WorkedExample>

      <WorkedExample titulo="Manguera al contenedor · F12 2op-2-2025">
        Manguera a 45° desde el suelo debe llenar un contenedor de altura
        2D (D=1m) a distancia 6D. ¿Velocidad mínima v₀? (g=9.8)<br /><br />

        Para velocidad mínima, el agua roza el borde superior (x=6, y=2):<br />
        <MathText>{"$v_x=v_y=\\dfrac{v_0}{\\sqrt2}$"}</MathText>. Tiempo: <MathText>{"$t = \\dfrac{6\\sqrt2}{v_0}$"}</MathText><br />
        <MathText>{"$2 = 6 - \\tfrac12(9.8)\\dfrac{72}{v_0^2}$"}</MathText><br />
        <MathText>{"$4 = \\dfrac{352.8}{v_0^2} \\ \\Rightarrow\\ v_0^2 = 88.2 \\ \\Rightarrow\\ v_0 \\approx 9.39$"}</MathText> m/s
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Círculo con vector velocidad tangencial + aceleración centrípeta ───
function CirculoMCU() {
  const R = 90, cx = 240, cy = 130;
  const [ang, setAng] = useState(-40);
  const rad = (ang * Math.PI) / 180;
  const px = cx + R * Math.cos(rad), py = cy + R * Math.sin(rad);
  const tanAngle = rad + Math.PI / 2;
  const vLen = 55;
  const vx2 = px + vLen * Math.cos(tanAngle), vy2 = py + vLen * Math.sin(tanAngle);
  const acLen = 40;
  const acx = px + acLen * Math.cos(rad + Math.PI), acy = py + acLen * Math.sin(rad + Math.PI);
  return (
    <div style={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 480 260" preserveAspectRatio="xMidYMid meet">
          <circle cx={cx} cy={cy} r={R} fill="none" stroke={LIENZO.fgFaint} strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx={cx} cy={cy} r="3" fill={LIENZO.fgDim} />
          <motion.circle cx={px} cy={py} r="7" fill={LIENZO.accent} animate={{ cx: px, cy: py }} transition={{ duration: 0.2 }} />
          <motion.line x1={px} y1={py} x2={vx2} y2={vy2} stroke={LIENZO.ok} strokeWidth="3" markerEnd="url(#vTang)"
            animate={{ x1: px, y1: py, x2: vx2, y2: vy2 }} transition={{ duration: 0.2 }} />
          <motion.line x1={px} y1={py} x2={acx} y2={acy} stroke={LIENZO.warn} strokeWidth="3" markerEnd="url(#vCentrip)"
            animate={{ x1: px, y1: py, x2: acx, y2: acy }} transition={{ duration: 0.2 }} />
          <defs>
            <marker id="vTang" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.ok} /></marker>
            <marker id="vCentrip" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.warn} /></marker>
          </defs>
          <text x={vx2 + 6} y={vy2} fontSize="12" fontWeight="700" fill={LIENZO.ok}>v (tangencial)</text>
          <text x={acx - 10} y={acy - 8} fontSize="12" fontWeight="700" fill={LIENZO.warn} textAnchor="end">a_c (al centro)</text>
        </svg>
      </Pizarra>
      <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
        Posición en la circunferencia
        <input type="range" min={-180} max={180} step={5} value={ang}
          onChange={(e) => setAng(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.accent }} />
      </label>
    </div>
  );
}

function EscMCU() {
  return (
    <EscenaRica>
      <Titulo>Movimiento Circular Uniforme (MCU)</Titulo>

      <Definicion termino="MCU">
        Movimiento en una trayectoria circular con rapidez constante. La
        velocidad cambia de DIRECCIÓN pero no de módulo.
      </Definicion>

      <CirculoMCU />
      <p style={{ margin: "0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        v siempre es tangente al círculo; a_c siempre apunta al centro (por eso "centrípeta")
      </p>

      <Resumen>
        <strong>Magnitudes</strong>:<br />
        • <strong>Periodo (T)</strong>: tiempo en dar una vuelta. Unidad: s.<br />
        • <strong>Frecuencia (f)</strong>: número de vueltas por segundo. <MathText>{"$f = \\dfrac1T$"}</MathText>. Unidad: Hz.<br />
        • <strong>Velocidad angular (ω)</strong>: ángulo barrido por unidad de tiempo. <MathText>{"$\\omega = \\dfrac{2\\pi}{T} = 2\\pi f$"}</MathText>. Unidad: rad/s.<br />
        • <strong>Velocidad tangencial (v)</strong>: rapidez lineal sobre la circunferencia. <MathText>{"$v = \\omega R = \\dfrac{2\\pi R}{T}$"}</MathText>
      </Resumen>

      <Resumen>
        <strong>Aceleración centrípeta</strong>: en MCU, aunque la rapidez es
        constante, hay aceleración (cambia la dirección). Apunta al centro.
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$a_c = \\dfrac{v^2}{R} = \\omega^2 R$"}</MathText>
        </div>
      </Resumen>

      <WorkedExample titulo="MCU típico">
        Un disco gira a 60 rpm (revoluciones por minuto). Si tiene radio 0.5 m:<br /><br />

        <MathText>{"$f = \\dfrac{60}{60} = 1$"}</MathText> Hz. T = 1 s. <MathText>{"$\\omega = 2\\pi$"}</MathText> rad/s.<br />
        <MathText>{"$v = \\omega R = 2\\pi(0.5) = \\pi \\approx 3.14$"}</MathText> m/s.<br />
        <MathText>{"$a_c = \\dfrac{v^2}{R} = \\dfrac{\\pi^2}{0.5} \\approx 19.7$"}</MathText> m/s²
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── ω-t análogo al v-t del MRUA, para el ventilador frenando ───
function GraficoOmegaT() {
  const w0 = 100 * Math.PI, alpha = -20 * Math.PI;
  const tFinal = -w0 / alpha;
  const xMin = 0, xMax = tFinal * 1.1, yMin = 0, yMax = w0 * 1.15, alto = 220;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const areaPath = `M ${sx(0)} ${sy(0)} L ${sx(0)} ${sy(w0)} L ${sx(tFinal)} ${sy(0)} Z`;
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        <path d={areaPath} fill={LIENZO.accent} opacity="0.16" />
        <line x1={sx(0)} y1={sy(w0)} x2={sx(tFinal)} y2={sy(0)} stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <text x={sx(tFinal * 0.3)} y={sy(w0 * 0.35)} fontSize="11" fontWeight="700" fill={LIENZO.accent}>área = θ = 250π rad</text>
        <text x={sx(0) + 6} y={sy(w0) - 8} fontSize="11" fill={LIENZO.fgDim}>ω₀=100π rad/s</text>
      </Ejes>
    </Pizarra>
  );
}

function EscMCA() {
  return (
    <EscenaRica>
      <Titulo>Movimiento Circular Acelerado</Titulo>

      <Definicion termino="Movimiento circular acelerado">
        La velocidad angular ω varía con el tiempo. La aceleración angular α
        es constante (en el caso uniformemente acelerado).
      </Definicion>

      <Resumen>
        <strong>Ecuaciones análogas a MRUA (sustituyendo x→θ, v→ω, a→α)</strong>:<br />
        • <MathText>{"$\\omega = \\omega_0 + \\alpha t$"}</MathText><br />
        • <MathText>{"$\\theta = \\theta_0 + \\omega_0 t + \\tfrac12\\alpha t^2$"}</MathText><br />
        • <MathText>{"$\\omega^2 = \\omega_0^2 + 2\\alpha(\\theta-\\theta_0)$"}</MathText>
      </Resumen>

      <WorkedExample titulo="Ventilador frenando · F11 3op-2-2025">
        Ventilador con velocidad inicial 100π rad/s, desaceleración 20π rad/s².
        ¿Cuántas vueltas hasta detenerse?<br /><br />

        Usando <MathText>{"$\\omega^2 = \\omega_0^2 - 2\\alpha\\theta$"}</MathText>:<br />
        <MathText>{"$0 = (100\\pi)^2 - 2(20\\pi)\\theta \\ \\Rightarrow\\ \\theta = \\dfrac{10000\\pi^2}{40\\pi} = 250\\pi$"}</MathText> rad.<br />
        Vueltas = <MathText>{"$\\dfrac{\\theta}{2\\pi} = \\dfrac{250\\pi}{2\\pi} = 125$"}</MathText> vueltas. El área bajo el gráfico ω-t (triángulo) es exactamente ese ángulo:
      </WorkedExample>
      <GraficoOmegaT />
    </EscenaRica>
  );
}

// ─── Auto tomando una curva, con v tangencial y a_c hacia el centro ───
function DiagramaCurva() {
  const cx = 240, cy = 190, R = 130;
  const angAuto = -25 * Math.PI / 180;
  const px = cx + R * Math.cos(angAuto), py = cy + R * Math.sin(angAuto);
  const tan = angAuto + Math.PI / 2;
  const vx2 = px + 50 * Math.cos(tan), vy2 = py + 50 * Math.sin(tan);
  const acx = px + 45 * Math.cos(angAuto + Math.PI), acy = py + 45 * Math.sin(angAuto + Math.PI);
  return (
    <Pizarra alto={220}>
      <svg width="100%" height="100%" viewBox="0 0 480 220" preserveAspectRatio="xMidYMid meet">
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R * Math.cos(-70 * Math.PI / 180)} ${cy + R * Math.sin(-70 * Math.PI / 180)}`}
          fill="none" stroke={LIENZO.fgFaint} strokeWidth="8" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="3" fill={LIENZO.fgDim} />
        <text x={cx} y={cy + 16} fontSize="10" fill={LIENZO.fgDim} textAnchor="middle">centro (R=50m)</text>
        <circle cx={px} cy={py} r="7" fill={LIENZO.accent} />
        <line x1={px} y1={py} x2={vx2} y2={vy2} stroke={LIENZO.ok} strokeWidth="3" markerEnd="url(#vAuto)" />
        <line x1={px} y1={py} x2={acx} y2={acy} stroke={LIENZO.warn} strokeWidth="3" markerEnd="url(#acAuto)" />
        <defs>
          <marker id="vAuto" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.ok} /></marker>
          <marker id="acAuto" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={LIENZO.warn} /></marker>
        </defs>
        <text x={vx2 + 6} y={vy2} fontSize="11" fontWeight="700" fill={LIENZO.ok}>v=20 m/s</text>
        <text x={acx} y={acy - 10} fontSize="11" fontWeight="700" fill={LIENZO.warn} textAnchor="middle">a_c=8 m/s²</text>
      </svg>
    </Pizarra>
  );
}

function EscAplicCirc() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones</Titulo>

      <Ejemplo titulo="Auto en curva">
        Un auto a 20 m/s en una curva de radio 50 m. Aceleración centrípeta:{" "}
        <MathText>{"$a_c = \\dfrac{20^2}{50} = 8$"}</MathText> m/s². Esta aceleración debe ser provista por la
        fricción de las ruedas.
      </Ejemplo>
      <DiagramaCurva />

      <Ejemplo titulo="Satélite en órbita">
        Un satélite a 7000 km del centro de la Tierra con velocidad 7.5 km/s.
        Periodo: <MathText>{"$T = \\dfrac{2\\pi R}{v} = \\dfrac{2\\pi(7000)}{7.5} \\approx 5870$"}</MathText> s ≈ 1.6 h.
      </Ejemplo>

      <Conexion>
        El movimiento circular conecta con la <strong>dinámica</strong>: la
        aceleración centrípeta debe estar producida por una fuerza centrípeta
        (gravedad para satélites, tensión para cuerda, fricción para autos en
        curva).
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Alcance máximo de un tiro parabólico con v₀=20 m/s en θ=45° (g=10):",
      o: ["40 m", "20 m", "80 m", "60 m"],
      c: 0,
      ex: "$R = v_0^2/g = 400/10 = 40$ m.",
    },
    {
      p: "Altura máxima con v₀=20 m/s, θ=90° (vertical):",
      o: ["20 m", "10 m", "40 m", "200 m"],
      c: 0,
      ex: "$H = v_0^2\\sin^2(90°)/(2g) = 400/20 = 20$ m.",
    },
    {
      p: "Disco gira a 2 vueltas/s. ω en rad/s:",
      o: ["4π", "2π", "π", "8π"],
      c: 0,
      ex: "$\\omega = 2\\pi f = 2\\pi(2) = 4\\pi$ rad/s.",
    },
    {
      p: "MCU radio 2 m, ω=3 rad/s. Velocidad tangencial:",
      o: ["6 m/s", "3 m/s", "1.5 m/s", "2 m/s"],
      c: 0,
      ex: "$v = \\omega R = 3(2) = 6$ m/s.",
    },
    {
      p: "Aceleración centrípeta del problema anterior:",
      o: ["18 m/s²", "12 m/s²", "6 m/s²", "9 m/s²"],
      c: 0,
      ex: "$a_c = \\omega^2 R = 9(2) = 18$ m/s².",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · gravedad afecta el movimiento horizontal">
        FALSO. En tiro parabólico, la gravedad afecta SOLO el movimiento
        vertical. El horizontal es MRU (velocidad constante v₀·cos θ).
      </Misconception>

      <Misconception titulo="Error 2 · ángulo de lanzamiento óptimo NO siempre es 45°">
        45° da alcance máximo SOLO cuando lanzás desde y aterrizas a la misma
        altura. Desde altura mayor, el ángulo óptimo es MENOR a 45°.
      </Misconception>

      <Misconception titulo="Error 3 · MCU no tiene aceleración">
        FALSO. Aunque la rapidez es constante, hay aceleración centrípeta
        porque la DIRECCIÓN de la velocidad cambia.
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
