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
//   5. Acento violeta neón solo donde IMPORTA.
//   6. Silencio visual entre elementos. Aire.
// ─────────────────────────────────────────────────────────────────────────────

export const LIENZO = {
  bg: "#fafaf7",          // off-white cálido, menos agresivo que blanco puro
  bgSoft: "#f1f0eb",      // contraste sutil para áreas elevadas
  fg: "#1a1a2e",          // navy muy oscuro (no negro puro: menos duro a la vista)
  fgDim: "#5a5a6e",       // texto secundario / hints
  fgFaint: "#b8b8c4",     // borders / lineas / cosas que casi no se ven
  accent: "#6d28d9",      // violeta profundo — alta legibilidad sobre blanco
  ok: "#059669",          // verde bosque
  warn: "#d97706",        // ámbar quemado
  bad: "#dc2626",         // rojo claro
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
