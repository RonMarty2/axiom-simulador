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
  bg: "#0b0b14",          // fondo casi negro con tinte violáceo
  bgSoft: "#16162a",      // contraste sutil para áreas elevadas
  fg: "#f5f5fa",          // texto principal
  fgDim: "#9696b0",       // texto secundario / hints
  fgFaint: "#5c5c78",     // borders / lineas / cosas que casi no se ven
  accent: "#a78bfa",      // violeta neón — acento UNO
  ok: "#34d399",          // verde menta
  warn: "#fbbf24",        // ámbar
  bad: "#fb7185",         // coral
};

export function Lienzo({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        width: "100%",
        maxWidth: 760,
        margin: "0 auto",
        padding: "56px 36px 64px",
        display: "flex",
        flexDirection: "column",
        gap: 36,
        color: LIENZO.fg,
        background: `radial-gradient(ellipse at top, ${LIENZO.bgSoft}, ${LIENZO.bg} 60%)`,
        borderRadius: 20,
        boxShadow:
          "0 1px 0 rgba(167,139,250,0.10) inset, 0 30px 80px -20px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
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
export function Pizarra({ alto = 240, children }: { alto?: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: alto,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "8px 0",
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
