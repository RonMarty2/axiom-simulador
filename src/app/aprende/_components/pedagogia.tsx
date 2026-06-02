"use client";

import React from "react";
import { motion } from "framer-motion";
import { LIENZO } from "./lienzo";

// ─────────────────────────────────────────────────────────────────────────────
// Bloques de contenido pedagógico — estética LIENZO (3Blue1Brown):
//   · Fondo claro, texto navy, acento violeta. UNA idea por bloque.
//   · Sin tarjetas de colores chillones ni emojis decorativos.
//   · Etiquetas tipográficas finas en lugar de banners.
//   · Tipografía matemática (Crimson) para fórmulas y ejemplos.
//
// La API (nombres y props) se mantiene IGUAL que la versión anterior para que
// las ~19 lecciones que ya la usan no se rompan: solo cambia cómo se ve.
// ─────────────────────────────────────────────────────────────────────────────

// Etiqueta pequeña en mayúsculas que encabeza un bloque, sin banner de color.
function Etiqueta({ children, color = LIENZO.accent }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase",
      fontWeight: 700, color, marginBottom: 6,
    }}>
      {children}
    </div>
  );
}

// Bloque base: barra fina a la izquierda + contenido. Reemplaza las cards.
function Bloque({
  acento, fondo, children,
}: { acento: string; fondo?: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%", maxWidth: 620,
      borderLeft: `3px solid ${acento}`,
      background: fondo ?? "transparent",
      borderRadius: fondo ? 8 : 0,
      padding: fondo ? "12px 16px" : "2px 0 2px 16px",
      color: LIENZO.fg,
    }}>
      {children}
    </div>
  );
}

export function Titulo({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <h2 className="font-crimson" style={{
      fontSize: "clamp(24px, 4.5vw, 34px)", fontWeight: 600,
      color: accent ?? LIENZO.fg, margin: "0 0 4px",
      lineHeight: 1.18, letterSpacing: "-0.01em", textAlign: "left",
    }}>
      {children}
    </h2>
  );
}

export function Parrafo({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "clamp(16px, 2.1vw, 18px)", lineHeight: 1.6,
      color: LIENZO.fgDim, margin: 0, maxWidth: 600,
    }}>
      {children}
    </p>
  );
}

export function Definicion({ termino, children }: { termino: string; children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.accent} fondo={LIENZO.bgSoft}>
      <Etiqueta>Definición · {termino}</Etiqueta>
      <div style={{ fontSize: 16, lineHeight: 1.6, color: LIENZO.fg }}>{children}</div>
    </Bloque>
  );
}

export function PorQue({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.warn} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.warn}>¿Por qué funciona?</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: LIENZO.fgDim }}>{children}</div>
    </Bloque>
  );
}

export function Ejemplo({ titulo = "Ejemplo", children }: { titulo?: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%", maxWidth: 620,
      border: `1px solid ${LIENZO.fgFaint}`, borderRadius: 12,
      padding: "14px 18px", background: "transparent",
      fontFamily: "var(--font-crimson), serif", color: LIENZO.fg,
    }}>
      <Etiqueta>{titulo}</Etiqueta>
      <div style={{ fontSize: 17, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export function Paso({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 8 }}>
      <span style={{
        flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
        background: LIENZO.accent, color: "#fff", fontSize: 13, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-atkinson), sans-serif",
      }}>{n}</span>
      <div style={{ flex: 1, fontSize: 15, lineHeight: 1.6, color: LIENZO.fg }}>{children}</div>
    </div>
  );
}

export function Cuidado({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.bad} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.bad}>Cuidado · error común</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: LIENZO.fgDim }}>{children}</div>
    </Bloque>
  );
}

export function Resumen({ children }: { children: React.ReactNode }) {
  return (
    <Bloque acento={LIENZO.ok} fondo={LIENZO.bgSoft}>
      <Etiqueta color={LIENZO.ok}>Para recordar</Etiqueta>
      <div style={{ fontSize: 15, lineHeight: 1.65, color: LIENZO.fg }}>{children}</div>
    </Bloque>
  );
}

// Wrapper de una escena: pila vertical alineada a la izquierda, con aire.
export function EscenaRica({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 18,
        width: "100%", maxWidth: 660, margin: "0 auto",
        padding: "8px 4px", color: LIENZO.fg,
      }}
    >
      {children}
    </motion.div>
  );
}

// Mini-check interactivo al final de una escena.
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
      width: "100%", maxWidth: 620,
      background: LIENZO.bgSoft, borderRadius: 14, padding: 16,
      border: `1px solid ${LIENZO.fgFaint}`,
    }}>
      <Etiqueta>¿Lo entendiste?</Etiqueta>
      <div style={{ fontSize: 16, color: LIENZO.fg, fontWeight: 600, marginBottom: 12 }}>
        {pregunta}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {opciones.map((op, i) => {
          const sel = elegida === i;
          const reveal = elegida !== null;
          const ok = i === correctaIdx;
          const borde = !reveal ? LIENZO.fgFaint : ok ? LIENZO.ok : sel ? LIENZO.bad : LIENZO.fgFaint;
          return (
            <button key={i}
              onClick={() => elegida === null && setElegida(i)}
              disabled={reveal}
              style={{
                padding: "10px 14px", textAlign: "left",
                background: !reveal ? "#fff" : ok ? "#ecfdf5" : sel ? "#fef2f2" : "#fff",
                border: `1.5px solid ${borde}`,
                borderRadius: 10, fontSize: 14, fontWeight: 600,
                color: LIENZO.fg, cursor: reveal ? "default" : "pointer",
                transition: "all 0.15s",
              }}
            >
              {op}
              {reveal && ok && <span style={{ marginLeft: 8, color: LIENZO.ok }}>✓</span>}
              {reveal && sel && !ok && <span style={{ marginLeft: 8, color: LIENZO.bad }}>✗</span>}
            </button>
          );
        })}
      </div>
      {elegida !== null && (
        <div style={{
          marginTop: 10, padding: "10px 12px",
          background: elegida === correctaIdx ? "#ecfdf5" : "#fef2f2",
          borderRadius: 8, fontSize: 13, color: LIENZO.fg, lineHeight: 1.5,
        }}>
          <strong style={{ color: elegida === correctaIdx ? LIENZO.ok : LIENZO.bad }}>
            {elegida === correctaIdx ? "¡Correcto!" : "No es esa."}
          </strong>{" "}
          {explicacion}
        </div>
      )}
    </div>
  );
}
