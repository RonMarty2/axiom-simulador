"use client";

// Figuras SVG para las preguntas de examen que dependen de un dibujo.
// Cada figura se referencia desde el banco con "figura: <id>" en la pregunta.
// El objetivo es que el alumno VEA el diagrama (no solo lea el texto).

import type { JSX } from "react";
import { construirFigura } from "@/lib/figuras/definiciones";
import { elementoVisible, type Elemento, type Rol } from "@/lib/figuras/motor";

const T = "#1a1a2e";      // trazo principal (navy)
const DIM = "#5a5a6e";    // secundario
const ACC = "#6d28d9";    // acento violeta
const OK = "#059669";     // verde
const BAD = "#dc2626";    // rojo
const WARN = "#d97706";   // ámbar

// Colores por rol para las figuras del motor de geometría.
const COLOR_ROL: Record<Rol, string> = {
  trazo: T,
  dato: WARN,
  incognita: ACC,
  aux: OK,
  resalte: ACC,
  resultado: BAD,
};

// Renderer genérico: pinta la escena declarativa que construyó el motor.
// No sabe nada de geometría — solo dibuja lo que la definición calculó.
function ElementoSVG({ e, paso }: { e: Elemento; paso: number }) {
  if (!elementoVisible(e, paso)) return null;
  const color = e.color ?? COLOR_ROL[e.rol];
  switch (e.tipo) {
    case "linea":
      return (
        <line
          x1={e.de.x} y1={e.de.y} x2={e.a.x} y2={e.a.y}
          stroke={color}
          strokeWidth={e.rol === "resalte" ? 4 : (e.grosor ?? 1.6)}
          opacity={e.rol === "resalte" ? 0.4 : 1}
          strokeDasharray={e.punteada ? "5 4" : undefined}
          strokeLinecap="round"
        />
      );
    case "poligono":
      return (
        <polygon
          points={e.puntos.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
          fill={e.relleno ? `${color}25` : "none"}
          stroke={color} strokeWidth={1.6}
        />
      );
    case "arco":
      return <path d={e.d} fill="none" stroke={color} strokeWidth={1.3} />;
    case "cuadradoRecto":
      return <path d={e.d} fill={e.relleno ? color : "none"} stroke={color} strokeWidth={1.3} />;
    case "punto":
      return <circle cx={e.en.x} cy={e.en.y} r={3} fill={color} />;
    case "texto":
      return (
        <text
          x={e.en.x} y={e.en.y}
          fill={color}
          fontSize={e.tam ?? 12}
          fontStyle={e.cursiva ? "italic" : undefined}
          fontWeight={e.negrita ? 800 : undefined}
          textAnchor={e.ancla ?? "middle"}
          dominantBaseline="middle"
          transform={e.rot ? `rotate(${e.rot} ${e.en.x} ${e.en.y})` : undefined}
        >
          {e.texto}
        </text>
      );
  }
}

function Marco({ children, alto = 240, ancho = 420 }: { children: React.ReactNode; alto?: number; ancho?: number }) {
  return (
    <div style={{
      width: "100%", display: "flex", justifyContent: "center",
      margin: "6px 0 12px", padding: 10,
      background: "var(--bg-subtle)", borderRadius: 12, border: "1px solid var(--border)",
    }}>
      <svg viewBox={`0 0 ${ancho} ${alto}`} width="100%" style={{ maxWidth: ancho }}
        fontFamily="var(--font-crimson), Georgia, serif">
        {children}
      </svg>
    </div>
  );
}

// Figuras que se construyen por etapas: 0/undef = enunciado, 1..N van
// dibujando la solución. G5 y F10 viven en el motor de geometría
// (src/lib/figuras/definiciones.ts); esta tabla informa al reproductor
// cuántos pasos tiene cada una.
export const FIGURAS_POR_ETAPAS: Record<string, number> = {
  "g5-paralelas": construirFigura("g5-paralelas")?.pasos ?? 0,
};

// Figuras legacy dibujadas a mano (pendientes de migrar al motor).
const FIGURAS: Record<string, (paso?: number) => JSX.Element> = {
  // ── G6 · triángulo isósceles con cadena BC=BF=FE=ED=DA ──
  "g6-isosceles": () => (
    <Marco alto={210} ancho={420}>
      {/* A derecha, B arriba-izq, C abajo-izq */}
      <polygon points="70,40 55,150 380,120" fill="none" stroke={T} strokeWidth={2} />
      <text x={58} y={34} fill={T} fontSize={14} fontWeight={700}>B</text>
      <text x={40} y={158} fill={T} fontSize={14} fontWeight={700}>C</text>
      <text x={386} y={122} fill={T} fontSize={14} fontWeight={700}>A</text>
      {/* puntos y segmentos internos (zig-zag) */}
      <line x1={55} y1={150} x2={160} y2={70} stroke={ACC} strokeWidth={1.5} />
      <line x1={160} y1={70} x2={140} y2={130} stroke={ACC} strokeWidth={1.5} />
      <line x1={140} y1={130} x2={250} y2={92} stroke={ACC} strokeWidth={1.5} />
      <text x={162} y={64} fill={DIM} fontSize={12}>E</text>
      <text x={245} y={104} fill={DIM} fontSize={12}>D</text>
      <text x={132} y={144} fill={DIM} fontSize={12}>F</text>
      <text x={200} y={30} fill={DIM} fontSize={12}>BC=BF=FE=ED=DA</text>
    </Marco>
  ),

  // ── G7 · cuadrado lado 4 en triángulo isósceles apex 120° ──
  "g7-cuadrado": () => (
    <Marco alto={210} ancho={420}>
      {/* triángulo: B arriba, A izq, C der */}
      <polygon points="210,45 60,175 360,175" fill="none" stroke={T} strokeWidth={2} />
      <text x={205} y={38} fill={T} fontSize={14} fontWeight={700}>B</text>
      <text x={222} y={58} fill={BAD} fontSize={12} fontWeight={700}>120°</text>
      <text x={48} y={190} fill={T} fontSize={14} fontWeight={700}>A</text>
      <text x={364} y={190} fill={T} fontSize={14} fontWeight={700}>C</text>
      {/* cuadrado apoyado en la base, centrado */}
      <rect x={175} y={110} width={70} height={65} fill={`${ACC}12`} stroke={ACC} strokeWidth={1.8} />
      <text x={205} y={100} fill={ACC} fontSize={12}>4</text>
      <text x={250} y={148} fill={ACC} fontSize={12}>4</text>
      <text x={205} y={193} fill={DIM} fontSize={13} fontStyle="italic">b</text>
    </Marco>
  ),

  // ── F11 · partícula sobre plano inclinado 37° con líneas de campo ──
  "f11-campo": () => (
    <Marco alto={210} ancho={420}>
      <polygon points="60,175 360,175 360,70" fill={`${DIM}10`} stroke={T} strokeWidth={2} />
      {/* partícula */}
      <circle cx={250} cy={140} r={10} fill={`${ACC}30`} stroke={ACC} strokeWidth={1.8} />
      <text x={240} y={128} fill={ACC} fontSize={11} fontWeight={700}>q</text>
      {/* líneas de campo paralelas al plano (flechas subiendo) */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={140 + i * 45} y1={175 - (i * 0) - 10} x2={175 + i * 45} y2={150 - 10}
          stroke={OK} strokeWidth={1.4} markerEnd="url(#feArr)" />
      ))}
      <defs>
        <marker id="feArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={OK} />
        </marker>
      </defs>
      <text x={352} y={172} fill={WARN} fontSize={12} fontWeight={700}>37°</text>
      <text x={150} y={200} fill={DIM} fontSize={11}>líneas de campo E</text>
    </Marco>
  ),

  // ── F12 · circuito con 15Ω, 5Ω y tres 10Ω entre A y B ──
  "f12-circuito": () => (
    <Marco alto={220} ancho={420}>
      {/* rectángulo exterior */}
      <rect x={40} y={40} width={340} height={150} fill="none" stroke={T} strokeWidth={1.6} />
      {/* 10Ω izquierda */}
      <rect x={34} y={100} width={12} height={34} fill="var(--bg-card)" stroke={T} strokeWidth={1.4} />
      <text x={10} y={122} fill={DIM} fontSize={11}>10Ω</text>
      {/* 15Ω y 5Ω colgando de arriba */}
      <rect x={175} y={55} width={12} height={34} fill="var(--bg-card)" stroke={T} strokeWidth={1.4} />
      <text x={150} y={76} fill={DIM} fontSize={11}>15Ω</text>
      <rect x={300} y={55} width={12} height={34} fill="var(--bg-card)" stroke={T} strokeWidth={1.4} />
      <text x={318} y={76} fill={DIM} fontSize={11}>5Ω</text>
      {/* nodos A y B */}
      <circle cx={181} cy={110} r={3.5} fill={BAD} />
      <text x={165} y={114} fill={BAD} fontSize={12} fontWeight={700}>A</text>
      <circle cx={181} cy={150} r={3.5} fill={ACC} />
      <text x={165} y={154} fill={ACC} fontSize={12} fontWeight={700}>B</text>
      <line x1={181} y1={89} x2={181} y2={110} stroke={T} strokeWidth={1.4} />
      {/* dos 10Ω abajo-derecha en paralelo */}
      <rect x={280} y={130} width={12} height={30} fill="var(--bg-card)" stroke={T} strokeWidth={1.4} />
      <rect x={330} y={130} width={12} height={30} fill="var(--bg-card)" stroke={T} strokeWidth={1.4} />
      <text x={250} y={150} fill={DIM} fontSize={11}>10Ω</text>
      <text x={344} y={150} fill={DIM} fontSize={11}>10Ω</text>
      <text x={60} y={214} fill={WARN} fontSize={10} fontStyle="italic">Diagrama esquemático — verificar uniones con el original.</text>
    </Marco>
  ),
};

export default function FiguraExamen({ id, paso }: { id?: string; paso?: number }) {
  if (!id) return null;

  // Primero el motor de geometría (figuras calculadas y verificadas).
  const escena = construirFigura(id);
  if (escena) {
    return (
      <Marco alto={escena.alto} ancho={escena.ancho}>
        {escena.elementos.map((e, i) => (
          <ElementoSVG key={i} e={e} paso={paso ?? 0} />
        ))}
      </Marco>
    );
  }

  // Después las figuras legacy dibujadas a mano.
  const fig = FIGURAS[id];
  if (!fig) return null;
  return fig(paso);
}
