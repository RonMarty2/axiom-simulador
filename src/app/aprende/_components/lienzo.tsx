"use client";

import { motion } from "framer-motion";
import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// LIENZO — sistema visual estilo 3Blue1Brown.
//
// Principios:
//   1. Fondo oscuro. La matemática es la protagonista.
//   2. UNA idea por pantalla. Sin cards, sin bordes, sin emojis decorativos.
//   3. Animaciones que TRANSFORMAN, no que aparecen-y-desaparecen.
//   4. Tipografía hero (Crimson Pro grande) para conceptos. Cuerpo cómodo.
//   5. UN acento, solo donde IMPORTA.
//   6. Silencio visual entre elementos. Aire.
//
// Los colores se mantienen como hex literales, no como var(--token): se usan
// en 519 lugares, muchos dentro de atributos SVG y de props de framer-motion,
// donde una variable CSS no siempre interpola bien. Lo que sí se hizo es
// alinear los valores con los tokens de globals.css para que la lección no
// parezca otra app: el acento era violeta (#6d28d9), de la paleta anterior al
// rediseño, mientras el resto del producto ya era terracota.
// Si alguna vez cambian los tokens globales, hay que tocar acá también.
// ─────────────────────────────────────────────────────────────────────────────

export const LIENZO = {
  bg: "#faf7f0",          // = --bg-base
  bgSoft: "#f2ece0",      // = --bg-subtle
  fg: "#1a1f2e",          // = --fg-primary
  fgDim: "#5a6072",       // = --fg-muted
  fgFaint: "#c9bda3",     // = --border-hover (líneas y bordes apenas visibles)
  accent: "#9c3d1c",      // = --accent (terracota del rediseño)
  ok: "#1e5f4f",          // = --green
  warn: "#d97706",        // ámbar quemado
  bad: "#dc2626",         // rojo
};

export function Lienzo({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        width: "100%",
        maxWidth: 700,
        margin: "0 auto",
        padding: "8px 4px",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        color: LIENZO.fg,
      }}
    >
      {children}
    </motion.div>
  );
}

// Pregunta/concepto principal de la escena. Una sola idea.
export function Pregunta({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-crimson"
      style={{
        fontSize: "clamp(28px, 6vw, 44px)",
        fontWeight: 600,
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
        color: LIENZO.fg,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

// Texto corto, conversacional. NO párrafos académicos largos.
export function Decir({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "clamp(17px, 2.2vw, 20px)",
        lineHeight: 1.55,
        color: LIENZO.fgDim,
        margin: 0,
        maxWidth: 580,
      }}
    >
      {children}
    </p>
  );
}

// Énfasis dentro de texto. Resalta el concepto clave.
export function Enf({ children, color = "accent" }: { children: React.ReactNode; color?: "accent" | "ok" | "warn" | "bad" | "fg" }) {
  const c =
    color === "fg" ? LIENZO.fg :
    color === "ok" ? LIENZO.ok :
    color === "warn" ? LIENZO.warn :
    color === "bad" ? LIENZO.bad :
    LIENZO.accent;
  return <span style={{ color: c, fontWeight: 600 }}>{children}</span>;
}

// Ecuación / fórmula hero. Tipografía matemática elegante, mucho aire.
export function FormulaHero({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "8px 0",
        fontSize: "clamp(36px, 8vw, 64px)",
        fontWeight: 500,
        fontFamily: "var(--font-crimson), serif",
        letterSpacing: "-0.01em",
        color: LIENZO.fg,
        lineHeight: 1,
      }}
    >
      {children}
    </div>
  );
}

// Contenedor de una animación. Centra, aire vertical, no decora.
// Si recibe onClick, el área entera avanza el paso al tocar.
export function Pizarra({
  alto = 240,
  onClick,
  children,
}: {
  alto?: number;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
      style={{
        position: "relative",
        width: "100%",
        height: alto,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "8px 0",
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {children}
    </div>
  );
}

// Botón "Siguiente" minimalista. No es un CTA gritón.
export function Continuar({
  onClick,
  texto = "Siguiente",
  disabled,
}: { onClick: () => void; texto?: string; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        alignSelf: "flex-start",
        background: "transparent",
        border: `1px solid ${LIENZO.accent}`,
        color: LIENZO.accent,
        padding: "10px 22px",
        fontSize: 15,
        fontWeight: 600,
        borderRadius: 999,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = LIENZO.accent;
        e.currentTarget.style.color = LIENZO.bg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = LIENZO.accent;
      }}
    >
      {texto} →
    </button>
  );
}

// Hint sutil al pie (no es un CTA, es un "podés tocar aquí").
export function Hint({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        color: LIENZO.fgFaint,
        letterSpacing: "0.02em",
        textAlign: "center",
        fontStyle: "italic",
      }}
    >
      {children}
    </div>
  );
}

// Separador invisible. Sirve para señalar "fin de bloque conceptual"
// sin usar líneas ni cards.
export function Aire({ alto = 12 }: { alto?: number }) {
  return <div style={{ height: alto }} />;
}

// Tipos numéricos para usar dentro de FormulaHero / texto inline.
// Estos componentes son chiquitos pero hacen que la matemática SE VEA
// como matemática y no como "texto cualquiera".
export function Num({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-crimson), serif",
        color: color ?? "inherit",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

export function Exp({ children }: { children: React.ReactNode }) {
  return (
    <sup
      style={{
        fontSize: "0.55em",
        verticalAlign: "super",
        marginLeft: 2,
        fontFamily: "var(--font-crimson), serif",
      }}
    >
      {children}
    </sup>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVAS DE MATEMÁTICA — probadas en Potenciación, compartidas para todas
// las lecciones. Reglas aprendidas (NO romper):
//   · Potencia: base + <sup> tipográfico real (no SVG suelto).
//   · Fracción: numerador / línea / denominador en un inline-flex.
//   · Raíz: TODO en un solo <svg> (check + vínculo + radicando en un path),
//     nunca como borde HTML separado — se desconecta.
//   · En animaciones SVG con motion.text NO mezclar el atributo x/y con el
//     x/y de animate (este último es un translate y duplica la posición).
// ─────────────────────────────────────────────────────────────────────────────

type MathColor = "accent" | "ok" | "bad" | "warn" | "fg" | "dim";
function resolverColor(c?: MathColor): string {
  switch (c) {
    case "ok": return LIENZO.ok;
    case "bad": return LIENZO.bad;
    case "warn": return LIENZO.warn;
    case "fg": return LIENZO.fg;
    case "dim": return LIENZO.fgDim;
    default: return LIENZO.accent;
  }
}

// Ecuación grande centrada, tipografía matemática. Aparece con un fade suave.
export function EcuacionFinal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      style={{
        textAlign: "center",
        fontFamily: "var(--font-crimson), serif",
        fontSize: "clamp(32px, 6vw, 50px)",
        fontWeight: 500,
        letterSpacing: "0.005em",
        color: LIENZO.fg,
        margin: "12px 0 8px",
        lineHeight: 1.25,
      }}
    >
      {children}
    </motion.div>
  );
}

// Potencia: base con exponente como superíndice real.
export function Pot({ b, e, c = "accent" }: { b: React.ReactNode; e: React.ReactNode; c?: MathColor }) {
  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {b}
      <sup style={{ fontSize: "0.55em", color: resolverColor(c), marginLeft: 1, verticalAlign: "super" }}>{e}</sup>
    </span>
  );
}

// Signo "=" con buen espaciado tipográfico.
export function Igual() {
  return <span style={{ color: LIENZO.fgDim, margin: "0 0.45em", fontWeight: 400 }}>=</span>;
}

// Operador genérico (+, −, ×, ÷, ·) con espaciado.
export function Op({ children }: { children: React.ReactNode }) {
  return <span style={{ color: LIENZO.fgDim, margin: "0 0.35em", fontWeight: 400 }}>{children}</span>;
}

// Fracción real (numerador / línea / denominador).
export function Frac({ n, d, c }: { n: React.ReactNode; d: React.ReactNode; c?: string }) {
  const col = c ?? LIENZO.fg;
  return (
    <span style={{
      display: "inline-flex", flexDirection: "column", alignItems: "center",
      verticalAlign: "middle", fontSize: "0.78em", lineHeight: 1, margin: "0 0.1em",
    }}>
      <span style={{ color: col, padding: "0 0.25em" }}>{n}</span>
      <span style={{ width: "100%", borderTop: `2px solid ${col}`, margin: "2px 0" }} />
      <span style={{ color: col, padding: "0 0.25em" }}>{d}</span>
    </span>
  );
}

// Raíz n-ésima TODA en un solo SVG (check + vínculo + radicando en un path).
export function Raiz({ n, r, italic = true }: { n?: string; r: string; italic?: boolean }) {
  return (
    <svg viewBox="0 0 64 42" height="1.3em" width="2em"
      style={{ verticalAlign: "middle", overflow: "visible" }} aria-hidden>
      {n && (
        <text x="7" y="15" fontSize="15" fill={LIENZO.accent} fontWeight="600"
          fontFamily="var(--font-crimson), serif">{n}</text>
      )}
      <path d="M 12 25 L 21 39 L 33 5 L 60 5" fill="none"
        stroke={LIENZO.fg} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="46" y="33" textAnchor="middle" fontSize="28" fill={LIENZO.fg}
        fontWeight="500" fontStyle={italic ? "italic" : "normal"}
        fontFamily="var(--font-crimson), serif">{r}</text>
    </svg>
  );
}

// Botón "Repetir animación" minimalista.
export function Repetir({ onClick, texto = "Repetir" }: { onClick: () => void; texto?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        alignSelf: "flex-start", background: "transparent",
        border: `1px solid ${LIENZO.fgFaint}`, color: LIENZO.fgDim,
        padding: "8px 18px", fontSize: 13, fontWeight: 500,
        borderRadius: 999, cursor: "pointer",
      }}
    >
      ↻ {texto}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PLANO CARTESIANO compartido — ejes con flechas, rejilla suave, etiquetas.
// Reusable en funciones, desigualdades, sistemas. Acepta children con motion
// para dibujar curvas/rectas/puntos animados encima.
// ─────────────────────────────────────────────────────────────────────────────
export type EjesProps = {
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  alto?: number;
  rejilla?: boolean;
  labels?: boolean;
  /** Rótulo del eje horizontal. En un gráfico x-t el eje del tiempo es "t", no "x". */
  rotuloX?: string;
  /** Rótulo del eje vertical. En un gráfico x-t la posición va en "x", no en "y". */
  rotuloY?: string;
  children?: React.ReactNode;
};

// Las marcas del eje iban de 1 en 1 SIEMPRE. Con un eje que llega a 250 (los
// gráficos de cinemática, que van en km o en metros) eso son 250 líneas de
// rejilla sobre 200px de alto: la rejilla se vuelve un bloque gris y tapa la
// curva. El paso ahora sale del rango, con la escalera clásica 1-2-5-10, para
// apuntar a una docena de marcas. En los ejes chicos (−6 a 6) sigue dando 1,
// así que los gráficos que ya se veían bien no cambian.
function ticksDe(min: number, max: number): number[] {
  const rango = max - min;
  if (!(rango > 0) || !Number.isFinite(rango)) return [];
  const bruto = rango / 12;
  const magnitud = Math.pow(10, Math.floor(Math.log10(bruto)));
  const normalizado = bruto / magnitud;
  const paso = (normalizado <= 1 ? 1 : normalizado <= 2 ? 2 : normalizado <= 5 ? 5 : 10) * magnitud;
  const ticks: number[] = [];
  for (let v = Math.ceil(min / paso) * paso; v <= max + paso * 1e-9; v += paso) {
    // El 0 no lleva marca: ya lo dibujan los dos ejes.
    if (Math.abs(v) > paso * 1e-9) ticks.push(Number(v.toPrecision(12)));
  }
  return ticks;
}

export function Ejes({
  xMin = -6, xMax = 6, yMin = -4, yMax = 6, alto = 280,
  rejilla = true, labels = true, rotuloX = "x", rotuloY = "y", children,
}: EjesProps) {
  const W = 480, H = alto;
  const padL = 32, padR = 16, padT = 16, padB = 24;
  const sx = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
  const sy = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (H - padT - padB);
  const x0 = sx(0), y0 = sy(0);
  const ticksX = ticksDe(xMin, xMax);
  const ticksY = ticksDe(yMin, yMax);
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
      style={{ fontFamily: "var(--font-crimson), serif" }}>
      {rejilla && (
        <g stroke={LIENZO.fgFaint} strokeOpacity="0.25" strokeWidth="1">
          {ticksX.map((i) => <line key={`gx${i}`} x1={sx(i)} x2={sx(i)} y1={padT} y2={H - padB} />)}
          {ticksY.map((i) => <line key={`gy${i}`} x1={padL} x2={W - padR} y1={sy(i)} y2={sy(i)} />)}
        </g>
      )}
      {/* eje X con flecha */}
      <line x1={padL} x2={W - padR + 4} y1={y0} y2={y0} stroke={LIENZO.fg} strokeWidth="1.5" />
      <polygon points={`${W - padR + 4},${y0} ${W - padR - 4},${y0 - 5} ${W - padR - 4},${y0 + 5}`} fill={LIENZO.fg} />
      {/* eje Y con flecha */}
      <line x1={x0} x2={x0} y1={H - padB} y2={padT - 4} stroke={LIENZO.fg} strokeWidth="1.5" />
      <polygon points={`${x0},${padT - 4} ${x0 - 5},${padT + 4} ${x0 + 5},${padT + 4}`} fill={LIENZO.fg} />
      {labels && (
        <>
          <text x={W - padR + 4} y={y0 + 18} fontSize="13" fill={LIENZO.fgDim} fontStyle="italic">{rotuloX}</text>
          <text x={x0 - 14} y={padT - 4} fontSize="13" fill={LIENZO.fgDim} fontStyle="italic">{rotuloY}</text>
          <text x={x0 - 6} y={y0 + 14} fontSize="11" fill={LIENZO.fgFaint}>0</text>
          {ticksX.map((i) => (
            <text key={`lx${i}`} x={sx(i)} y={y0 + 14} fontSize="10" fill={LIENZO.fgFaint} textAnchor="middle">{i}</text>
          ))}
          {ticksY.map((i) => (
            <text key={`ly${i}`} x={x0 - 8} y={sy(i) + 3} fontSize="10" fill={LIENZO.fgFaint} textAnchor="end">{i}</text>
          ))}
        </>
      )}
      {children}
    </svg>
  );
}

// Convierten coordenadas matemáticas (x,y) a px del SVG arriba. Útiles para
// hijos de <Ejes>. Reciben los mismos límites que el componente.
export function scalerX(xMin: number, xMax: number, W = 480, padL = 32, padR = 16) {
  return (x: number) => padL + ((x - xMin) / (xMax - xMin)) * (W - padL - padR);
}
export function scalerY(yMin: number, yMax: number, alto: number, padT = 16, padB = 24) {
  return (y: number) => padT + ((yMax - y) / (yMax - yMin)) * (alto - padT - padB);
}
