"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export type Escena = {
  titulo: string;
  componente: React.ComponentType;
};

export type LeccionShellProps = {
  unidad: string;
  tituloUnidad: string;
  escenas: Escena[];
};

export default function LeccionShell({ unidad, tituloUnidad, escenas }: LeccionShellProps) {
  const [i, setI] = useState(0);
  const EscenaComp = escenas[i].componente;
  const progreso = ((i + 1) / escenas.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", flexDirection: "column" }}>
      <header style={{
        padding: "14px 20px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-glass)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}>
        <Link href="/aprende" style={{ color: "var(--fg-muted)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          ← Lecciones
        </Link>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--fg-muted)", marginBottom: 2 }}>
            Unidad {unidad} · {tituloUnidad}
          </div>
          <div className="font-crimson" style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)" }}>
            {escenas[i].titulo}
          </div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 600 }}>
          {i + 1} / {escenas.length}
        </div>
      </header>

      <div style={{ height: 4, background: "var(--bg-subtle)", position: "relative" }}>
        <motion.div
          style={{ height: "100%", background: "linear-gradient(90deg, var(--accent), #8b5cf6)" }}
          animate={{ width: `${progreso}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <main style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", overflow: "hidden",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            style={{ width: "100%", maxWidth: 720 }}
          >
            <EscenaComp />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer style={{
        padding: "16px 20px", borderTop: "1px solid var(--border)",
        background: "var(--bg-card)", display: "flex", gap: 12, justifyContent: "space-between",
      }}>
        <button
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          style={btnSecundario(i === 0)}
        >
          ← Anterior
        </button>
        {i < escenas.length - 1 ? (
          <button onClick={() => setI((v) => v + 1)} style={btnPrincipal}>
            Siguiente →
          </button>
        ) : (
          <Link href="/aprende" style={{ ...btnPrincipal, textDecoration: "none", textAlign: "center" }}>
            ✓ Terminar lección
          </Link>
        )}
      </footer>
    </div>
  );
}

const btnPrincipal: React.CSSProperties = {
  padding: "12px 24px", background: "var(--accent)", color: "var(--accent-fg)",
  border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer",
  boxShadow: "var(--shadow-sm)",
};

const btnSecundario = (disabled: boolean): React.CSSProperties => ({
  padding: "12px 24px", background: "transparent",
  color: disabled ? "var(--border)" : "var(--fg-muted)",
  border: "1px solid " + (disabled ? "var(--bg-subtle)" : "var(--border)"),
  borderRadius: 12, fontWeight: 700, fontSize: 15,
  cursor: disabled ? "not-allowed" : "pointer",
});
