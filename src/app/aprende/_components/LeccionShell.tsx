"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LIENZO } from "./lienzo";

export type Escena = {
  titulo: string;
  componente: React.ComponentType;
};

export type LeccionShellProps = {
  unidad: string;
  tituloUnidad: string;
  escenas: Escena[];
};

// Shell de lección en estética LIENZO (idéntica a Potenciación): fondo claro,
// header/footer sticky con blur, barra de progreso violeta.
export default function LeccionShell({ unidad, tituloUnidad, escenas }: LeccionShellProps) {
  const [i, setI] = useState(0);
  const EscenaComp = escenas[i].componente;
  const progreso = ((i + 1) / escenas.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: LIENZO.bg, display: "flex", flexDirection: "column", color: LIENZO.fg }}>
      <header style={{
        padding: "14px 20px",
        borderBottom: `1px solid ${LIENZO.fgFaint}55`,
        background: "rgba(250,250,247,0.85)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}>
        <Link href="/aprende" style={{ display: "inline-flex", alignItems: "center", gap: 5, color: LIENZO.accent, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Lecciones
        </Link>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: LIENZO.fgFaint, marginBottom: 2 }}>
            Unidad {unidad} · {tituloUnidad}
          </div>
          <div className="font-crimson" style={{ fontSize: 17, fontWeight: 500, color: LIENZO.fg, letterSpacing: "-0.01em" }}>
            {escenas[i].titulo}
          </div>
        </div>
        <div style={{ fontSize: 12, color: LIENZO.fgFaint, fontWeight: 500 }}>
          {i + 1} / {escenas.length}
        </div>
      </header>

      <div style={{ height: 2, background: `${LIENZO.fgFaint}33` }}>
        <motion.div
          style={{ height: "100%", background: LIENZO.accent }}
          animate={{ width: `${progreso}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <main style={{
        flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "40px 20px 120px",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{ width: "100%", maxWidth: 720 }}
          >
            <EscenaComp />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer style={{
        padding: "14px 20px",
        borderTop: `1px solid ${LIENZO.fgFaint}55`,
        background: "rgba(250,250,247,0.92)", backdropFilter: "blur(12px)",
        display: "flex", gap: 12, justifyContent: "space-between",
        position: "sticky", bottom: 0,
      }}>
        <button
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          style={{
            padding: "10px 18px", background: "transparent",
            border: `1px solid ${LIENZO.fgFaint}`, borderRadius: 999,
            color: i === 0 ? LIENZO.fgFaint : LIENZO.fg,
            fontSize: 14, fontWeight: 500,
            cursor: i === 0 ? "not-allowed" : "pointer", opacity: i === 0 ? 0.5 : 1,
          }}
        >
          ← Anterior
        </button>
        {i < escenas.length - 1 ? (
          <button
            onClick={() => setI((v) => v + 1)}
            style={{
              padding: "10px 24px", background: LIENZO.accent,
              border: "none", borderRadius: 999, color: "#fff",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}
          >
            Siguiente →
          </button>
        ) : (
          <Link href="/aprende" style={{
            padding: "10px 24px", background: LIENZO.ok, borderRadius: 999,
            color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none",
          }}>
            ✓ Terminar
          </Link>
        )}
      </footer>
    </div>
  );
}
