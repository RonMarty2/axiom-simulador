"use client";

import React from "react";
import { motion } from "framer-motion";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "./atoms";

// ─────────────────────────────────────────────────────────────────────────────
// Bloques de contenido pedagógico — para construir escenas RICAS
// (explicación detallada + por qué funciona + ejemplos resueltos + errores
// comunes + auto-check), no solo una animación con un texto corto.
// ─────────────────────────────────────────────────────────────────────────────

export function Titulo({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <h2 className="font-crimson" style={{
      fontSize: 26, fontWeight: 800, color: accent ?? COLOR_BASE,
      margin: "0 0 8px", lineHeight: 1.2, textAlign: "center",
    }}>
      {children}
    </h2>
  );
}

export function Parrafo({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 16, lineHeight: 1.65, color: "var(--fg-secondary)",
      margin: "0 0 10px", maxWidth: 580,
    }}>
      {children}
    </p>
  );
}

export function Definicion({ termino, children }: { termino: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
      borderLeft: `4px solid #3b82f6`,
      borderRadius: 10, padding: "12px 16px", maxWidth: 580,
      fontSize: 15, lineHeight: 1.6, color: COLOR_BASE,
    }}>
      <strong style={{ color: "#1e40af", textTransform: "uppercase", fontSize: 11, letterSpacing: 1.2, display: "block", marginBottom: 4 }}>
        DEFINICIÓN · {termino}
      </strong>
      {children}
    </div>
  );
}

export function PorQue({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #fef3c7, #fde68a)",
      borderLeft: `4px solid #f59e0b`,
      borderRadius: 10, padding: "12px 16px", maxWidth: 580,
      fontSize: 14, lineHeight: 1.6, color: "#78350f",
    }}>
      <strong style={{ display: "block", marginBottom: 4, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
        💡 ¿Por qué funciona?
      </strong>
      {children}
    </div>
  );
}

export function Ejemplo({ titulo = "Ejemplo", children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 12, padding: "14px 18px", maxWidth: 580,
      fontFamily: "var(--font-crimson), serif", color: COLOR_BASE,
    }}>
      <div style={{ fontSize: 11, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
        {titulo}
      </div>
      <div style={{ fontSize: 16, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export function Paso({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
      <span style={{
        flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
        background: COLOR_EXP, color: "white", fontSize: 13, fontWeight: 800,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-atkinson), sans-serif",
      }}>{n}</span>
      <div style={{ flex: 1, fontSize: 15, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

export function Cuidado({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #fee2e2, #fecaca)",
      borderLeft: `4px solid ${COLOR_BAD}`,
      borderRadius: 10, padding: "12px 16px", maxWidth: 580,
      fontSize: 14, lineHeight: 1.6, color: "#7f1d1d",
    }}>
      <strong style={{ display: "block", marginBottom: 4, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
        ⚠️ Cuidado / error común
      </strong>
      {children}
    </div>
  );
}

export function Resumen({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
      border: `2px solid ${COLOR_OK}`,
      borderRadius: 12, padding: "14px 18px", maxWidth: 580,
      fontSize: 15, lineHeight: 1.6, color: "#065f46",
    }}>
      <strong style={{ display: "block", marginBottom: 4, fontSize: 12, letterSpacing: 1, textTransform: "uppercase" }}>
        ✓ Para recordar
      </strong>
      {children}
    </div>
  );
}

// Wrapper de una escena rica: pila vertical de bloques con buen espaciado.
export function EscenaRica({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        width: "100%", maxWidth: 620, margin: "0 auto",
        padding: "8px 4px",
      }}
    >
      {children}
    </motion.div>
  );
}

// Mini-check: pregunta al final de una escena, instantánea
export function AutoCheck({
  pregunta, opciones, correctaIdx, explicacion,
}: {
  pregunta: string;
  opciones: string[];
  correctaIdx: number;
  explicacion: string;
}) {
  const [elegida, setElegida] = React.useState<number | null>(null);

  return (
    <div style={{
      background: "var(--bg-subtle)",
      borderRadius: 14, padding: 16, maxWidth: 580, width: "100%",
      border: "1px dashed var(--border)",
    }}>
      <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>
        🎯 ¿LO ENTENDISTE?
      </div>
      <div style={{ fontSize: 15, color: COLOR_BASE, fontWeight: 600, marginBottom: 12 }}>
        {pregunta}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {opciones.map((op, i) => {
          const sel = elegida === i;
          const reveal = elegida !== null;
          const ok = i === correctaIdx;
          return (
            <button key={i}
              onClick={() => elegida === null && setElegida(i)}
              disabled={reveal}
              style={{
                padding: "10px 14px", textAlign: "left",
                background: !reveal ? "var(--bg-card)"
                  : ok ? "#d1fae5"
                  : sel ? "#fee2e2"
                  : "var(--bg-card)",
                border: `1.5px solid ${!reveal ? "var(--border)" : ok ? COLOR_OK : sel ? COLOR_BAD : "var(--border)"}`,
                borderRadius: 10, fontSize: 14, fontWeight: 600,
                color: COLOR_BASE, cursor: reveal ? "default" : "pointer",
              }}
            >
              {op}
              {reveal && ok && <span style={{ marginLeft: 8, color: COLOR_OK }}>✓</span>}
              {reveal && sel && !ok && <span style={{ marginLeft: 8, color: COLOR_BAD }}>✗</span>}
            </button>
          );
        })}
      </div>
      {elegida !== null && (
        <div style={{
          marginTop: 10, padding: "10px 12px",
          background: elegida === correctaIdx ? "#ecfdf5" : "#fef2f2",
          borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5,
        }}>
          <strong style={{ color: elegida === correctaIdx ? COLOR_OK : COLOR_BAD }}>
            {elegida === correctaIdx ? "¡Correcto!" : "No es esa."}
          </strong>{" "}
          {explicacion}
        </div>
      )}
    </div>
  );
}
