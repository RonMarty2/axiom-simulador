"use client";

// Figuras SVG para las preguntas de examen que dependen de un dibujo.
// Cada figura se referencia desde el banco con "figura: <id>" en la pregunta.
// El objetivo es que el alumno VEA el diagrama (no solo lea el texto).

import type { JSX } from "react";

const T = "#1a1a2e";      // trazo principal (navy)
const DIM = "#5a5a6e";    // secundario
const ACC = "#6d28d9";    // acento violeta
const OK = "#059669";     // verde
const BAD = "#dc2626";    // rojo
const WARN = "#d97706";   // ámbar

// ── Geometría dirigida: reemplaza "línea hasta (x,y)" tipeado a mano ──
// El bug real que motivó esto: en G5 escribí un punto de destino que iba
// hacia la DERECHA cuando la figura necesitaba que fuera hacia la
// IZQUIERDA — un error de signo invisible en las coordenadas crudas, que
// solo se nota mirando el render (y ni así, a la primera).
//
// Con estas funciones el desplazamiento se declara por dirección
// (arriba/abajo, izquierda/derecha) y el propio nombre exige el signo:
// si escribís abajoIzquierda(origen, +30, 10) — con dx positivo, que va
// hacia la derecha — explota en desarrollo en vez de dibujarse mal en
// silencio. "Punto de p a distancia d en un ángulo" quedaría más prolijo
// matemáticamente, pero estas figuras son esquemáticas (no a escala) y lo
// que rompió la anterior no fue un ángulo mal calculado, sino un signo
// tipeado al revés — esto ataca exactamente ese error.
interface Pt { x: number; y: number }

function chequearDireccion(nombre: string, dx: number, dy: number, dxOk: (n: number) => boolean, dyOk: (n: number) => boolean) {
  if (process.env.NODE_ENV !== "production" && (!dxOk(dx) || !dyOk(dy))) {
    throw new Error(`FiguraExamen: ${nombre}(origen, dx=${dx}, dy=${dy}) tiene un signo que contradice su propio nombre — revisar la dirección.`);
  }
}

function abajoIzquierda(origen: Pt, dx: number, dy: number): Pt {
  chequearDireccion("abajoIzquierda", dx, dy, (n) => n <= 0, (n) => n >= 0);
  return { x: origen.x + dx, y: origen.y + dy };
}
function abajoDerecha(origen: Pt, dx: number, dy: number): Pt {
  chequearDireccion("abajoDerecha", dx, dy, (n) => n >= 0, (n) => n >= 0);
  return { x: origen.x + dx, y: origen.y + dy };
}
function arribaIzquierda(origen: Pt, dx: number, dy: number): Pt {
  chequearDireccion("arribaIzquierda", dx, dy, (n) => n <= 0, (n) => n <= 0);
  return { x: origen.x + dx, y: origen.y + dy };
}
function arribaDerecha(origen: Pt, dx: number, dy: number): Pt {
  chequearDireccion("arribaDerecha", dx, dy, (n) => n >= 0, (n) => n <= 0);
  return { x: origen.x + dx, y: origen.y + dy };
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

// Figuras que se construyen por etapas (aceptan `paso`): 0/undef = enunciado,
// 1..N van dibujando la solución. El reproductor de pasos les pasa el paso activo.
export const FIGURAS_POR_ETAPAS: Record<string, number> = {
  "g5-paralelas": 3,
};

const FIGURAS: Record<string, (paso?: number) => JSX.Element> = {
  // ── G5 · dos paralelas m//n con la poligonal (α, α, 95°, 40°, 2x) ──
  // Etapas: 0 = figura del enunciado; 1 = recta auxiliar y 95°=40°+55°;
  // 2 = α=55° por correspondientes; 3 = 2x=90−55=35 y x=17,5°.
  "g5-paralelas": (paso) => {
    const p = paso ?? 0;
    const V = { x: 210, y: 45 };                     // vértice sobre m (apex)
    const W = abajoIzquierda(V, -80, 85);             // vértice del ángulo de 95° (abajo-IZQUIERDA del apex)
    const P1 = abajoIzquierda(W, -35, 78);            // pie en n del tramo que viene de W (sigue hacia la izquierda, NO se da vuelta a la derecha — el bug original)
    const P2 = abajoDerecha(V, 90, 170);              // pie en n del lado derecho (abajo-DERECHA del apex)
    return (
      <Marco alto={250}>
        {/* rectas paralelas */}
        <line x1={30} y1={45} x2={390} y2={45} stroke={T} strokeWidth={2} />
        <text x={16} y={50} fill={DIM} fontSize={16} fontStyle="italic">m</text>
        <line x1={30} y1={200} x2={390} y2={200} stroke={T} strokeWidth={2} />
        <text x={16} y={205} fill={DIM} fontSize={16} fontStyle="italic">n</text>

        {/* poligonal (siempre visible) */}
        <line x1={V.x} y1={V.y} x2={W.x} y2={W.y} stroke={T} strokeWidth={1.6} />
        <line x1={W.x} y1={W.y} x2={P1.x} y2={P1.y} stroke={T} strokeWidth={1.6} />
        <line x1={V.x} y1={V.y} x2={P2.x} y2={P2.y} stroke={T} strokeWidth={1.6} />

        {/* datos DADOS por el problema (siempre visibles) */}
        <text x={188} y={68} fill={ACC} fontSize={13}>α</text>
        <text x={222} y={68} fill={ACC} fontSize={13}>α</text>
        <text x={138} y={135} fill={BAD} fontSize={13} fontWeight={700}>95°</text>
        <text x={112} y={192} fill={WARN} fontSize={13} fontWeight={700}>40°</text>
        <rect x={296} y={198} width={9} height={9} fill="none" stroke={T} strokeWidth={1.4} />
        <line x1={305} y1={200} x2={360} y2={178} stroke={T} strokeWidth={1.6} />
        <text x={312} y={196} fill={ACC} fontSize={13} fontWeight={700}>2x</text>

        {/* Leyenda de ecuaciones derivadas (zona abierta arriba-derecha, apilada) */}
        {p >= 1 && (
          <g>
            <text x={276} y={96} fill={T} fontSize={12} fontWeight={800}>95° = 40° + 55°</text>
          </g>
        )}
        {p >= 2 && <text x={276} y={120} fill={ACC} fontSize={12} fontWeight={800}>α = 55°</text>}
        {p >= 3 && (
          <g>
            <text x={276} y={144} fill={BAD} fontSize={12} fontWeight={800}>2x = 90°−55° = 35°</text>
            <text x={276} y={168} fill={BAD} fontSize={12} fontWeight={800}>x = 17,5°</text>
          </g>
        )}

        {/* PASO 1 · recta auxiliar por W y descomposición del 95° JUSTO en el vértice */}
        {p >= 1 && (
          <g>
            <line x1={58} y1={W.y} x2={250} y2={W.y} stroke={OK} strokeWidth={1.4} strokeDasharray="5 4" />
            <text x={44} y={W.y - 6} fill={OK} fontSize={10}>auxiliar ∥ m, n</text>
            {/* resalta el segmento W -> n (alterno interno con el 40° de n) */}
            <line x1={W.x} y1={W.y} x2={P1.x} y2={P1.y} stroke={OK} strokeWidth={3} opacity={0.45} />
            {/* el 95° se parte: abajo 40° (alterno con n), arriba 55° */}
            <text x={150} y={152} fill={OK} fontSize={11} fontWeight={700}>40°</text>
            <text x={150} y={121} fill={ACC} fontSize={11} fontWeight={700}>55°</text>
          </g>
        )}

        {/* PASO 2 · resalta el lado V-W (α correspondiente con el 55°) */}
        {p >= 2 && (
          <line x1={V.x} y1={V.y} x2={W.x} y2={W.y} stroke={ACC} strokeWidth={3} opacity={0.45} />
        )}

        {/* PASO 3 · resalta la transversal V-Q hasta el pie con el ángulo recto */}
        {p >= 3 && (
          <line x1={V.x} y1={V.y} x2={P2.x} y2={P2.y} stroke={ACC} strokeWidth={3} opacity={0.4} />
        )}
      </Marco>
    );
  },

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

  // ── F10 · bloque sobre plano inclinado 37°, 200 m ──
  "f10-plano": () => (
    <Marco alto={210} ancho={420}>
      <polygon points="40,180 380,180 380,60" fill={`${DIM}10`} stroke={T} strokeWidth={2} />
      {/* bloque arriba */}
      <g transform="translate(350,66) rotate(37)">
        <rect x={-16} y={-16} width={26} height={20} fill={`${ACC}25`} stroke={ACC} strokeWidth={1.6} />
      </g>
      <text x={300} y={120} fill={DIM} fontSize={13}>200 m</text>
      <text x={352} y={176} fill={WARN} fontSize={12} fontWeight={700}>37°</text>
      {/* P al pie */}
      <circle cx={60} cy={180} r={3} fill={BAD} />
      <text x={48} y={196} fill={BAD} fontSize={12} fontWeight={700}>P</text>
      <text x={120} y={150} fill={DIM} fontSize={11}>μ = 0.25</text>
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
  const fig = FIGURAS[id];
  if (!fig) return null;
  return fig(paso);
}
