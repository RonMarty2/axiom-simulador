"use client";

// Figuras SVG para las preguntas de examen que dependen de un dibujo.
// Cada figura se referencia desde el banco con "figura: <id>" en la pregunta.
// El objetivo es que el alumno VEA el diagrama (no solo lea el texto).

import { construirFigura } from "@/lib/figuras/definiciones";
import { elementoVisible, type Elemento, type Rol } from "@/lib/figuras/motor";

const T = "#1a1a2e";      // trazo principal (navy)
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
    case "path":
      return <path d={e.d} fill={e.relleno ? color : "none"} stroke={color} strokeWidth={1.3} />;
    case "punto":
      return <circle cx={e.en.x} cy={e.en.y} r={e.r ?? 3} fill={e.r && e.r > 4 ? `${color}30` : color} stroke={color} strokeWidth={1.6} />;
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
// dibujando la solución. Las figuras del motor de geometría
// (src/lib/figuras/definiciones.ts) declaran sus propios pasos; esta tabla
// se los informa al reproductor de la solución.
export const FIGURAS_POR_ETAPAS: Record<string, number> = Object.fromEntries(
  ["g5-paralelas", "g6-isosceles", "g7-cuadrado", "f10-plano", "f11-campo", "f12-circuito"].map(
    (id) => [id, construirFigura(id)?.pasos ?? 0]
  )
);

export default function FiguraExamen({ id, paso }: { id?: string; paso?: number }) {
  if (!id) return null;
  // Todas las figuras viven en el motor de geometría (calculadas y verificadas).
  const escena = construirFigura(id);
  if (!escena) return null;
  return (
    <Marco alto={escena.alto} ancho={escena.ancho}>
      {escena.elementos.map((e, i) => (
        <ElementoSVG key={i} e={e} paso={paso ?? 0} />
      ))}
    </Marco>
  );
}
