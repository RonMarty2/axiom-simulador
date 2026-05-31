"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Stage } from "../_components/atoms";

// ─────────────────────────────────────────────────────────────────────────────
// Lección: Potenciación y sus propiedades (Unidad 01 — FCE-UMSS)
// Cada "escena" es un componente con animación propia.
// ─────────────────────────────────────────────────────────────────────────────

type Escena = {
  titulo: string;
  componente: React.ComponentType;
};

const ESCENAS: Escena[] = [
  { titulo: "¿Qué es una potencia?", componente: EscenaIntro },
  { titulo: "El significado, paso a paso", componente: EscenaSignificado },
  { titulo: "Producto de potencias", componente: EscenaProducto },
  { titulo: "Cociente de potencias", componente: EscenaCociente },
  { titulo: "Potencia de potencia", componente: EscenaPotenciaDePotencia },
  { titulo: "Exponente cero", componente: EscenaExponenteCero },
  { titulo: "Exponente negativo", componente: EscenaExponenteNegativo },
  { titulo: "Producto elevado a una potencia", componente: EscenaProductoElevado },
  { titulo: "Fracción elevada a una potencia", componente: EscenaFraccionElevada },
  { titulo: "Radicales como exponentes", componente: EscenaRadicales },
  { titulo: "Tu turno", componente: EscenaReto },
];

export default function LeccionPotenciacionPage() {
  const [i, setI] = useState(0);
  const Escena = ESCENAS[i].componente;
  const progreso = ((i + 1) / ESCENAS.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", flexDirection: "column" }}>
      {/* Header de la lección */}
      <header style={{
        padding: "14px 20px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-glass)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}>
        <Link href="/aprende" style={{
          color: "var(--fg-muted)", textDecoration: "none", fontSize: 14, fontWeight: 600,
        }}>← Lecciones</Link>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "var(--fg-muted)", marginBottom: 2 }}>
            Unidad 01 · Potenciación
          </div>
          <div className="font-crimson" style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)" }}>
            {ESCENAS[i].titulo}
          </div>
        </div>
        <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 600 }}>
          {i + 1} / {ESCENAS.length}
        </div>
      </header>

      {/* Barra de progreso */}
      <div style={{ height: 4, background: "var(--bg-subtle)", position: "relative" }}>
        <motion.div
          style={{ height: "100%", background: "linear-gradient(90deg, var(--accent), #8b5cf6)" }}
          animate={{ width: `${progreso}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Escenario principal */}
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
            <Escena />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Controles */}
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
        {i < ESCENAS.length - 1 ? (
          <button onClick={() => setI((v) => v + 1)} style={btnPrincipal()}>
            Siguiente →
          </button>
        ) : (
          <Link href="/aprende" style={{ ...btnPrincipal(), textDecoration: "none", textAlign: "center" }}>
            ✓ Terminar lección
          </Link>
        )}
      </footer>
    </div>
  );
}

const btnPrincipal = (): React.CSSProperties => ({
  padding: "12px 24px", background: "var(--accent)", color: "var(--accent-fg)",
  border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer",
  boxShadow: "var(--shadow-sm)",
});

const btnSecundario = (disabled: boolean): React.CSSProperties => ({
  padding: "12px 24px", background: "transparent",
  color: disabled ? "var(--border)" : "var(--fg-muted)",
  border: "1px solid " + (disabled ? "var(--bg-subtle)" : "var(--border)"),
  borderRadius: 12, fontWeight: 700, fontSize: 15,
  cursor: disabled ? "not-allowed" : "pointer",
});

// Colores reutilizados por escenas
const COLOR_BASE = "#1E1B4B";
const COLOR_EXP = "#8b5cf6";
const COLOR_OK = "#10b981";

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — ¿Qué es una potencia?
// ═════════════════════════════════════════════════════════════════════════════
function EscenaIntro() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una potencia se escribe así:</p>

      <div style={{ position: "relative", height: 240, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Base */}
        <motion.span
          initial={{ y: 80, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
          style={{ fontSize: 140, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", lineHeight: 1 }}
        >
          2
        </motion.span>
        {/* Exponente */}
        <motion.span
          initial={{ y: -80, x: 20, opacity: 0, rotate: -180, scale: 0.3 }}
          animate={{ y: -60, x: 0, opacity: 1, rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.9 }}
          style={{ fontSize: 70, fontWeight: 700, color: COLOR_EXP, fontFamily: "var(--font-crimson), serif", lineHeight: 1, marginLeft: 4 }}
        >
          3
        </motion.span>

        {/* Etiqueta BASE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          style={{
            position: "absolute", left: "50%", marginLeft: -120, bottom: 24,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}
        >
          <div style={{ width: 1, height: 28, background: COLOR_BASE, opacity: 0.4 }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: COLOR_BASE, textTransform: "uppercase", letterSpacing: 1.2 }}>base</span>
        </motion.div>

        {/* Etiqueta EXPONENTE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.4 }}
          style={{
            position: "absolute", left: "50%", marginLeft: 80, top: 24,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: COLOR_EXP, textTransform: "uppercase", letterSpacing: 1.2 }}>exponente</span>
          <div style={{ width: 1, height: 28, background: COLOR_EXP, opacity: 0.4 }} />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.5 }}
        style={parrafo()}
      >
        La <strong style={{ color: COLOR_BASE }}>base</strong> es el número que se multiplica.
        El <strong style={{ color: COLOR_EXP }}>exponente</strong> dice <em>cuántas veces</em>.
      </motion.p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — Significado con FUSIONES explícitas: 2³ → 2·2·2 → 4·2 → 8
// Cada paso muestra de dónde sale cada número.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaSignificado() {
  const [paso, setPaso] = useState(0);

  // Posiciones X de cada elemento en el contenedor 400px ancho
  const X1 = 60, X2 = 165, X3 = 270;     // posiciones iniciales de los tres 2
  const XD1 = 113, XD2 = 218;             // posiciones de los · (puntos)
  const XF1 = 132, XF2 = 215;             // donde se fusionan (medio entre dos)
  const Y_NUM = 35;

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>2³ paso a paso. Mirá de dónde sale cada número:</p>

      <div onClick={() => setPaso((p) => p >= 4 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={400} h={150}>

          {/* === 2³ INICIAL === */}
          <motion.span
            style={{ position: "absolute", left: 165, top: Y_NUM, ...numGrande(COLOR_BASE), fontSize: 90 }}
            animate={{ opacity: paso === 0 ? 1 : 0, scale: paso === 0 ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >2</motion.span>
          <motion.span
            style={{ position: "absolute", left: 230, top: 20, ...numGrande(COLOR_EXP), fontSize: 50 }}
            animate={{
              opacity: paso === 0 ? 1 : 0,
              scale: paso === 0 ? 1 : 0.5,
              rotate: paso === 1 ? 360 : 0,
            }}
            transition={{ duration: 0.4 }}
          >3</motion.span>

          {/* === TRES DOSES (aparecen en paso 1) === */}
          {/* 2 nº1 — desaparece tras fusión en paso 2 */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_BASE), fontSize: 80 }}
            initial={{ left: X1, top: Y_NUM, opacity: 0, scale: 0 }}
            animate={
              paso === 1 ? { left: X1, top: Y_NUM, opacity: 1, scale: 1 } :
              paso === 2 ? { left: XF1, top: Y_NUM, opacity: 0, scale: 1.4 } :
              paso >= 3  ? { left: XF1, top: Y_NUM, opacity: 0, scale: 0 } :
                           { left: X1, top: Y_NUM, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: paso === 1 ? 0.05 : 0 }}
          >2</motion.span>

          {/* punto entre 2 nº1 y 2 nº2 */}
          <motion.span
            style={{ position: "absolute", left: XD1, top: Y_NUM + 20, fontSize: 50, color: COLOR_EXP, fontWeight: 700 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: paso === 1 ? 1 : 0, scale: paso === 1 ? 1 : 0 }}
            transition={{ delay: paso === 1 ? 0.25 : 0 }}
          >·</motion.span>

          {/* 2 nº2 — también desaparece tras fusión en paso 2 */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_BASE), fontSize: 80 }}
            initial={{ left: X2, top: Y_NUM, opacity: 0, scale: 0 }}
            animate={
              paso === 1 ? { left: X2, top: Y_NUM, opacity: 1, scale: 1 } :
              paso === 2 ? { left: XF1, top: Y_NUM, opacity: 0, scale: 1.4 } :
              paso >= 3  ? { left: XF1, top: Y_NUM, opacity: 0, scale: 0 } :
                           { left: X2, top: Y_NUM, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: paso === 1 ? 0.2 : 0 }}
          >2</motion.span>

          {/* punto entre 2 nº2 y 2 nº3 */}
          <motion.span
            style={{ position: "absolute", left: XD2, top: Y_NUM + 20, fontSize: 50, color: COLOR_EXP, fontWeight: 700 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              paso === 1 ? { opacity: 1, scale: 1 } :
              paso === 2 ? { left: XF2 - 30, opacity: 1, scale: 1 } :
              paso === 3 ? { left: XF2, opacity: 0, scale: 0 } :
                           { opacity: 0, scale: 0 }
            }
            transition={{ delay: paso === 1 ? 0.4 : 0, duration: 0.3 }}
          >·</motion.span>

          {/* 2 nº3 — sobrevive a la 1ra fusión, se fusiona en la 2da (paso 3) */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_BASE), fontSize: 80 }}
            initial={{ left: X3, top: Y_NUM, opacity: 0, scale: 0 }}
            animate={
              paso === 1 ? { left: X3, top: Y_NUM, opacity: 1, scale: 1 } :
              paso === 2 ? { left: X3 - 30, top: Y_NUM, opacity: 1, scale: 1 } :
              paso === 3 ? { left: XF2, top: Y_NUM, opacity: 0, scale: 1.4 } :
              paso >= 4  ? { left: XF2, top: Y_NUM, opacity: 0, scale: 0 } :
                           { left: X3, top: Y_NUM, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: paso === 1 ? 0.35 : 0 }}
          >2</motion.span>

          {/* === FLASH de fusión 1 (paso 2) === */}
          <motion.div
            style={{
              position: "absolute", left: XF1 - 30, top: Y_NUM - 10, width: 120, height: 110,
              borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.5), transparent 70%)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={paso === 2 ? { opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] } : { opacity: 0 }}
            transition={{ duration: 0.6, times: [0, 0.5, 1] }}
          />

          {/* === EL "4" surge de la fusión (paso 2), luego se fusiona en el 8 (paso 3) === */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_OK), fontSize: 80 }}
            initial={{ left: XF1, top: Y_NUM, opacity: 0, scale: 0 }}
            animate={
              paso === 2 ? { left: XF1, top: Y_NUM, opacity: 1, scale: [0, 1.3, 1], color: COLOR_OK } :
              paso === 3 ? { left: XF2, top: Y_NUM, opacity: 0, scale: 1.4, color: COLOR_BASE } :
              paso >= 4  ? { left: XF2, top: Y_NUM, opacity: 0, scale: 0, color: COLOR_BASE } :
                           { left: XF1, top: Y_NUM, opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.4, delay: paso === 2 ? 0.4 : 0, type: "spring", stiffness: 180, damping: 16 }}
          >4</motion.span>

          {/* === FLASH de fusión 2 (paso 3) === */}
          <motion.div
            style={{
              position: "absolute", left: XF2 - 30, top: Y_NUM - 10, width: 120, height: 110,
              borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.5), transparent 70%)",
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={paso === 3 ? { opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] } : { opacity: 0 }}
            transition={{ duration: 0.6, times: [0, 0.5, 1] }}
          />

          {/* === EL "8" surge de la segunda fusión === */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_OK) }}
            initial={{ left: XF2 - 10, top: Y_NUM - 10, opacity: 0, scale: 0, fontSize: 80 }}
            animate={
              paso === 3 ? { left: XF2 - 10, top: Y_NUM - 10, opacity: 1, scale: [0, 1.3, 1], fontSize: 80 } :
              paso === 4 ? { left: 165, top: 0, opacity: 1, scale: 1, fontSize: 140 } :
                           { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.5, delay: paso === 3 ? 0.4 : 0, type: "spring", stiffness: 180 }}
          >8</motion.span>
        </Stage>

        {/* Etiqueta de paso actual */}
        <motion.div
          key={paso}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 15, fontWeight: 700, color: COLOR_EXP, textAlign: "center", minHeight: 22,
          }}
        >
          {paso === 0 && "Tenemos 2³ — el exponente nos dice cuántas veces multiplicar"}
          {paso === 1 && "2³ significa multiplicar el 2, tres veces"}
          {paso === 2 && "Primero: 2 · 2 = 4"}
          {paso === 3 && "Después: 4 · 2 = 8"}
          {paso === 4 && "¡Entonces 2³ = 8!"}
        </motion.div>
      </div>

      <p style={hint()}>
        {paso < 4 ? "👆 Tocá la caja para avanzar al siguiente paso" : "Una potencia es multiplicación repetida ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — Producto: aᵐ · aⁿ = aᵐ⁺ⁿ (LA ESTRELLA)
// ═════════════════════════════════════════════════════════════════════════════
function EscenaProducto() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Cuando multiplicás potencias de igual base… los exponentes se suman:</p>

      <div
        onClick={() => setPaso((p) => p >= 4 ? 0 : p + 1)}
        style={cajaAnim()}
      >
        {/* Bases y exponentes son posicionados absolutamente para poder animarlos */}
        <Stage w={360} h={140}>
          {/* Base izquierda */}
          <motion.span
            layout
            style={{
              position: "absolute", left: paso < 3 ? 40 : 140, top: 30,
              ...numGrande(COLOR_BASE), fontSize: 80,
            }}
            animate={{ left: paso < 3 ? 40 : 150 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >2</motion.span>

          {/* Exponente 2 (izq) — vuela arriba en paso 1 */}
          <motion.span
            style={{
              position: "absolute",
              ...numGrande(COLOR_EXP), fontSize: 44,
            }}
            initial={{ left: 88, top: 14 }}
            animate={
              paso === 0 ? { left: 88, top: 14, scale: 1 } :
              paso === 1 ? { left: 130, top: -30, scale: 1.1 } :
              paso === 2 ? { left: 130, top: -30, scale: 1.1 } :
              paso === 3 ? { left: 220, top: 8, scale: 0, opacity: 0 } :
                           { left: 220, top: 8, scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
          >2</motion.span>

          {/* Punto de multiplicación */}
          <motion.span
            style={{ position: "absolute", left: 130, top: 50, fontSize: 50, color: COLOR_EXP, fontWeight: 700 }}
            animate={{ opacity: paso < 3 ? 1 : 0, scale: paso < 3 ? 1 : 0 }}
          >·</motion.span>

          {/* Base derecha */}
          <motion.span
            layout
            style={{
              position: "absolute", left: paso < 3 ? 175 : 145, top: 30,
              ...numGrande(COLOR_BASE), fontSize: 80,
            }}
            animate={{
              left: paso < 3 ? 175 : 150,
              opacity: paso < 3 ? 1 : 0,
              scale: paso < 3 ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >2</motion.span>

          {/* Exponente 3 (der) — vuela arriba en paso 1 */}
          <motion.span
            style={{
              position: "absolute",
              ...numGrande(COLOR_EXP), fontSize: 44,
            }}
            initial={{ left: 225, top: 14 }}
            animate={
              paso === 0 ? { left: 225, top: 14, scale: 1 } :
              paso === 1 ? { left: 230, top: -30, scale: 1.1 } :
              paso === 2 ? { left: 230, top: -30, scale: 1.1 } :
              paso === 3 ? { left: 230, top: -30, scale: 0, opacity: 0 } :
                           { left: 230, top: -30, scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 160, damping: 16, delay: paso === 1 ? 0.1 : 0 }}
          >3</motion.span>

          {/* Signo + entre exponentes (aparece paso 2) */}
          <motion.span
            style={{ position: "absolute", left: 178, top: -38, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={paso >= 2 && paso < 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          >+</motion.span>

          {/* Resultado: 5 (aparece paso 3, posición de exponente) */}
          <motion.span
            style={{
              position: "absolute",
              ...numGrande(COLOR_OK), fontSize: 50,
            }}
            initial={{ left: 180, top: -30, scale: 0, opacity: 0 }}
            animate={
              paso === 3 ? { left: 200, top: 10, scale: 1.4, opacity: 1 } :
              paso === 4 ? { left: 200, top: 10, scale: 1, opacity: 1 } :
                           { left: 180, top: -30, scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
          >5</motion.span>
        </Stage>

        {/* Línea de fórmula general (aparece al final) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: paso >= 4 ? 1 : 0, y: paso >= 4 ? 0 : 10 }}
          transition={{ delay: 0.2 }}
          style={cajitaFormula()}
        >
          <span style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            a<sup style={{ color: COLOR_EXP }}>m</sup> · a<sup style={{ color: COLOR_EXP }}>n</sup> = a<sup style={{ color: COLOR_OK }}>m+n</sup>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tocá para ver qué pasa con los exponentes"}
        {paso === 1 && "Los exponentes salen de su lugar…"}
        {paso === 2 && "…y entre ellos aparece un +"}
        {paso === 3 && "¡2 + 3 = 5! El resultado es 2⁵"}
        {paso === 4 && "Esta es la regla general 👇"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — Cociente: aᵐ / aⁿ = aᵐ⁻ⁿ
// ═════════════════════════════════════════════════════════════════════════════
function EscenaCociente() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Cuando dividís potencias de igual base… los exponentes se restan:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative", minHeight: 140 }}>
          {/* Numerador 2⁵ */}
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <span style={{ ...numGrande(COLOR_BASE), fontSize: 70 }}>2</span>
            <motion.span
              style={{ ...numGrande(COLOR_EXP), fontSize: 40, marginLeft: 2 }}
              animate={paso >= 1 ? { y: -50, scale: 1.2, color: COLOR_EXP } : { y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 180 }}
            >5</motion.span>
          </div>

          <span style={{ fontSize: 50, color: COLOR_EXP, fontWeight: 700 }}>÷</span>

          {/* Denominador 2² */}
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <span style={{ ...numGrande(COLOR_BASE), fontSize: 70 }}>2</span>
            <motion.span
              style={{ ...numGrande(COLOR_EXP), fontSize: 40, marginLeft: 2 }}
              animate={paso >= 1 ? { y: -50, scale: 1.2 } : { y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 180, delay: 0.1 }}
            >2</motion.span>
          </div>

          {/* Signo menos arriba */}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ position: "absolute", left: 92, top: -10, fontSize: 32, color: COLOR_EXP, fontWeight: 700 }}
          >−</motion.span>

          {/* Igual y resultado */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={paso >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            style={{ display: "flex", alignItems: "flex-start", marginLeft: 16 }}
          >
            <span style={{ fontSize: 50, color: COLOR_EXP, fontWeight: 700, marginRight: 12 }}>=</span>
            <span style={{ ...numGrande(COLOR_BASE), fontSize: 70 }}>2</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={paso >= 3 ? { scale: [0, 1.5, 1] } : { scale: 0 }}
              transition={{ duration: 0.5 }}
              style={{ ...numGrande(COLOR_OK), fontSize: 40, marginLeft: 2 }}
            >3</motion.span>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: paso >= 3 ? 1 : 0 }}
          style={cajitaFormula()}
        >
          <span style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            a<sup style={{ color: COLOR_EXP }}>m</sup> ÷ a<sup style={{ color: COLOR_EXP }}>n</sup> = a<sup style={{ color: COLOR_OK }}>m−n</sup>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tocá para ver qué pasa"}
        {paso === 1 && "Los exponentes vuelan arriba…"}
        {paso === 2 && "Aparece un signo menos…"}
        {paso === 3 && "¡5 − 2 = 3! El resultado es 2³"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 5 — Potencia de potencia: (aᵐ)ⁿ = aᵐ·ⁿ
// ═════════════════════════════════════════════════════════════════════════════
function EscenaPotenciaDePotencia() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una potencia elevada a otra potencia… los exponentes se multiplican:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        {/* Layout posicional absoluto para control fino */}
        <Stage w={360} h={160}>
          {/* Paréntesis izq */}
          <motion.span
            style={{ position: "absolute", left: 60, top: 50, fontSize: 70, color: COLOR_BASE, fontWeight: 700, lineHeight: 1 }}
            animate={{ opacity: paso < 3 ? 1 : 0 }}
          >(</motion.span>

          {/* Base 2 interna */}
          <motion.span
            style={{ position: "absolute", left: 90, top: 50, ...numGrande(COLOR_BASE), fontSize: 70 }}
            animate={{
              left: paso < 3 ? 90 : 150,
              opacity: paso < 3 ? 1 : 1,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >2</motion.span>

          {/* Exponente 3 (interno) — vuela arriba en paso 1 */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_EXP), fontSize: 40 }}
            initial={{ left: 138, top: 42 }}
            animate={
              paso === 0 ? { left: 138, top: 42, scale: 1, opacity: 1 } :
              paso === 1 ? { left: 150, top: -10, scale: 1.2, opacity: 1 } :
              paso === 2 ? { left: 150, top: -10, scale: 1.2, opacity: 1 } :
                           { left: 220, top: 30, scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >3</motion.span>

          {/* Paréntesis der */}
          <motion.span
            style={{ position: "absolute", left: 170, top: 50, fontSize: 70, color: COLOR_BASE, fontWeight: 700, lineHeight: 1 }}
            animate={{ opacity: paso < 3 ? 1 : 0 }}
          >)</motion.span>

          {/* Exponente 2 (externo) — vuela arriba en paso 1 */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_EXP), fontSize: 40 }}
            initial={{ left: 205, top: 42 }}
            animate={
              paso === 0 ? { left: 205, top: 42, scale: 1, opacity: 1 } :
              paso === 1 ? { left: 220, top: -10, scale: 1.2, opacity: 1 } :
              paso === 2 ? { left: 220, top: -10, scale: 1.2, opacity: 1 } :
                           { left: 220, top: -10, scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: paso === 1 ? 0.1 : 0 }}
          >2</motion.span>

          {/* Signo × entre los dos exponentes (aparece paso 2) */}
          <motion.span
            style={{ position: "absolute", left: 188, top: -2, fontSize: 32, color: COLOR_EXP, fontWeight: 700 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={paso === 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          >×</motion.span>

          {/* Resultado: 6 baja como nuevo exponente */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_OK), fontSize: 50 }}
            initial={{ left: 195, top: -10, scale: 0, opacity: 0 }}
            animate={
              paso === 3 ? { left: 200, top: 30, scale: 1.2, opacity: 1 } :
                           { left: 195, top: -10, scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
          >6</motion.span>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            (a<sup style={{ color: COLOR_EXP }}>m</sup>)<sup style={{ color: COLOR_EXP }}>n</sup> = a<sup style={{ color: COLOR_OK }}>m·n</sup>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tocá para ver"}
        {paso === 1 && "Los dos exponentes se separan…"}
        {paso === 2 && "…y entre ellos aparece un ×"}
        {paso === 3 && "¡3 × 2 = 6! El resultado es 2⁶"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Exponente cero
// ═════════════════════════════════════════════════════════════════════════════
function EscenaExponenteCero() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>¿Y si el exponente es 0?</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        {/* Demostración: 2³ / 2³ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <span style={{ fontSize: 22, color: "var(--fg-muted)" }}>Mirá esto:</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          {/* 2³ / 2³ = 2³⁻³ = 2⁰ */}
          <ExpInline base="2" exp="3" />
          <span style={{ fontSize: 36, color: COLOR_EXP }}>÷</span>
          <ExpInline base="2" exp="3" />
          <span style={{ fontSize: 30, color: COLOR_EXP }}>=</span>
          <ExpInline base="2" exp="3−3" colorExp={COLOR_OK} />
          <span style={{ fontSize: 30, color: COLOR_EXP }}>=</span>
          <ExpInline base="2" exp="0" colorExp={COLOR_OK} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ fontSize: 15, color: "var(--fg-muted)", textAlign: "center" }}
        >
          Pero… cualquier número dividido por sí mismo es <strong style={{ color: COLOR_OK }}>1</strong>:
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <ExpInline base="2" exp="3" />
          <span style={{ fontSize: 36, color: COLOR_EXP }}>÷</span>
          <ExpInline base="2" exp="3" />
          <span style={{ fontSize: 30, color: COLOR_EXP }}>=</span>
          <span style={{ fontSize: 24, color: "var(--fg-muted)" }}>8 ÷ 8</span>
          <span style={{ fontSize: 30, color: COLOR_EXP }}>=</span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ duration: 0.5, delay: 2.2 }}
            style={{ fontSize: 50, color: COLOR_OK, fontWeight: 800 }}
          >1</motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, type: "spring", stiffness: 180 }}
          style={{
            marginTop: 14, padding: "14px 24px",
            background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
            borderRadius: 14, border: "1px solid var(--green-border)",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: "#065f46", fontFamily: "var(--font-crimson), serif" }}>
            Entonces: a<sup>0</sup> = 1
          </span>
          <div style={{ fontSize: 12, color: "#065f46", marginTop: 4 }}>(siempre que a ≠ 0)</div>
        </motion.div>
      </div>
    </div>
  );
}

function ExpInline({ base, exp, colorExp = COLOR_EXP }: { base: string; exp: string; colorExp?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
      <span style={{ fontSize: 40, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>{base}</span>
      <span style={{ fontSize: 22, color: colorExp, fontWeight: 700, marginTop: 2, fontFamily: "var(--font-crimson), serif" }}>{exp}</span>
    </span>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 7 — Exponente negativo
// ═════════════════════════════════════════════════════════════════════════════
function EscenaExponenteNegativo() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Un exponente <em>negativo</em> manda la potencia al denominador:</p>

      <div onClick={() => setPaso((p) => p >= 2 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ position: "relative", minHeight: 160, display: "flex", justifyContent: "center", alignItems: "center", width: 360 }}>
          {/* 2⁻³ inicial */}
          <motion.div
            animate={paso >= 1 ? { x: -100, scale: 0.9 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <span style={{ ...numGrande(COLOR_BASE), fontSize: 80 }}>2</span>
            <span style={{ ...numGrande(COLOR_EXP), fontSize: 46, marginLeft: 2 }}>
              <motion.span
                animate={paso >= 1 ? { color: COLOR_OK } : {}}
                style={{ display: "inline-block" }}
              >−</motion.span>3
            </span>
          </motion.div>

          {/* Signo = (aparece) */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 50, color: COLOR_EXP, fontWeight: 700, margin: "0 10px" }}
          >=</motion.span>

          {/* Fracción 1 / 2³ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <span style={{ fontSize: 40, color: COLOR_OK, fontWeight: 800 }}>1</span>
            <div style={{ width: 80, height: 3, background: COLOR_BASE, margin: "4px 0", borderRadius: 2 }} />
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ ...numGrande(COLOR_BASE), fontSize: 50 }}>2</span>
              <span style={{ ...numGrande(COLOR_EXP), fontSize: 28, marginLeft: 1 }}>3</span>
            </div>
          </motion.div>
        </div>

        <motion.div animate={{ opacity: paso >= 2 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            a<sup style={{ color: COLOR_EXP }}>−n</sup> = <span style={{ display: "inline-flex", flexDirection: "column", verticalAlign: "middle" }}>
              <span style={{ fontSize: 14, color: COLOR_OK }}>1</span>
              <span style={{ borderTop: "2px solid currentColor", padding: "0 4px", fontSize: 14, color: COLOR_BASE }}>
                a<sup style={{ color: COLOR_EXP }}>n</sup>
              </span>
            </span>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tocá para ver la transformación"}
        {paso === 1 && "El signo menos invierte: la potencia baja al denominador"}
        {paso === 2 && "Esta es la regla general"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 8 — Producto elevado: (a·b)ⁿ = aⁿ · bⁿ
// El exponente se DUPLICA y se reparte a cada factor.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaProductoElevado() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Si tenés un <strong>producto</strong> elevado a una potencia… el exponente se reparte a cada factor:</p>

      <div onClick={() => setPaso((p) => p >= 4 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={420} h={160}>
          {/* ( */}
          <motion.span style={{ position: "absolute", left: 80, top: 50, fontSize: 70, color: COLOR_BASE, fontWeight: 700, lineHeight: 1 }}
            animate={{ opacity: paso < 3 ? 1 : 0, x: paso < 3 ? 0 : -30 }}
            transition={{ type: "spring" }}>(</motion.span>
          {/* 2 */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_BASE), fontSize: 70 }}
            initial={{ left: 110, top: 50 }}
            animate={{ left: paso < 3 ? 110 : 120, top: 50 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}>2</motion.span>
          {/* · */}
          <motion.span style={{ position: "absolute", left: 160, top: 70, fontSize: 50, color: COLOR_EXP, fontWeight: 700 }}
            animate={{ opacity: paso < 3 ? 1 : 0, scale: paso < 3 ? 1 : 0 }}>·</motion.span>
          {/* 3 */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_BASE), fontSize: 70 }}
            initial={{ left: 195, top: 50 }}
            animate={{ left: paso < 3 ? 195 : 230, top: 50 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}>3</motion.span>
          {/* ) */}
          <motion.span style={{ position: "absolute", left: 245, top: 50, fontSize: 70, color: COLOR_BASE, fontWeight: 700, lineHeight: 1 }}
            animate={{ opacity: paso < 3 ? 1 : 0, x: paso < 3 ? 0 : 30 }}
            transition={{ type: "spring" }}>)</motion.span>

          {/* Exponente 4 (original arriba del paréntesis) */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_EXP), fontSize: 44 }}
            initial={{ left: 285, top: 38 }}
            animate={
              paso === 0 ? { left: 285, top: 38, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 285, top: 38, opacity: 1, scale: [1, 1.3, 1.2] } :
              paso === 2 ? { left: 285, top: 38, opacity: 0, scale: 0 } :
                           { left: 285, top: 38, opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.5 }}>4</motion.span>

          {/* COPIA 1 del 4 — vuela al 2 */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_OK), fontSize: 40 }}
            initial={{ left: 285, top: 38, opacity: 0, scale: 0 }}
            animate={
              paso === 2 ? { left: 162, top: 42, opacity: 1, scale: 1 } :
              paso === 3 ? { left: 162, top: 42, opacity: 1, scale: 1 } :
              paso === 4 ? { left: 162, top: 42, opacity: 1, scale: 1 } :
                           { left: 285, top: 38, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: paso === 2 ? 0.15 : 0 }}>4</motion.span>

          {/* COPIA 2 del 4 — vuela al 3 */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_OK), fontSize: 40 }}
            initial={{ left: 285, top: 38, opacity: 0, scale: 0 }}
            animate={
              paso === 2 ? { left: 282, top: 42, opacity: 1, scale: 1 } :
              paso === 3 ? { left: 282, top: 42, opacity: 1, scale: 1 } :
              paso === 4 ? { left: 282, top: 42, opacity: 1, scale: 1 } :
                           { left: 285, top: 38, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: paso === 2 ? 0.2 : 0 }}>4</motion.span>

          {/* Punto · final entre los dos resultados (aparece paso 3) */}
          <motion.span style={{ position: "absolute", left: 205, top: 70, fontSize: 50, color: COLOR_EXP, fontWeight: 700 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}>·</motion.span>

          {/* Verificación numérica (paso 4): = 16 · 81 = 1296 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso === 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ position: "absolute", left: 0, right: 0, bottom: -5, textAlign: "center", fontSize: 14, color: "var(--fg-muted)", fontWeight: 600 }}
          >
            = 16 · 81 = 1296
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 4 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            (a · b)<sup style={{ color: COLOR_EXP }}>n</sup> = a<sup style={{ color: COLOR_OK }}>n</sup> · b<sup style={{ color: COLOR_OK }}>n</sup>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tocá para ver qué pasa con el exponente"}
        {paso === 1 && "El exponente 4 se prepara para repartirse…"}
        {paso === 2 && "…se duplica y vuela una copia a cada factor"}
        {paso === 3 && "Los paréntesis ya no hacen falta: 2⁴ · 3⁴"}
        {paso === 4 && "Lo verificamos: 16 · 81 = 1296"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 9 — Fracción elevada: (a/b)ⁿ = aⁿ/bⁿ
// El exponente se reparte al numerador y al denominador.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaFraccionElevada() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Lo mismo pasa con <strong>fracciones</strong>: el exponente baja al numerador <em>y</em> al denominador:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={380} h={180}>
          {/* ( */}
          <motion.span style={{ position: "absolute", left: 80, top: 50, fontSize: 100, color: COLOR_BASE, fontWeight: 400, lineHeight: 1 }}
            animate={{ opacity: paso < 2 ? 1 : 0, x: paso < 2 ? 0 : -30 }}>(</motion.span>
          {/* Fracción 3/4 */}
          <motion.div style={{ position: "absolute", left: 130, top: 55, display: "flex", flexDirection: "column", alignItems: "center" }}
            animate={{ x: paso < 2 ? 0 : -10 }}>
            <span style={{ ...numGrande(COLOR_BASE), fontSize: 50 }}>3</span>
            <div style={{ width: 56, height: 3, background: COLOR_BASE, margin: "4px 0", borderRadius: 2 }} />
            <span style={{ ...numGrande(COLOR_BASE), fontSize: 50 }}>4</span>
          </motion.div>
          {/* ) */}
          <motion.span style={{ position: "absolute", left: 195, top: 50, fontSize: 100, color: COLOR_BASE, fontWeight: 400, lineHeight: 1 }}
            animate={{ opacity: paso < 2 ? 1 : 0, x: paso < 2 ? 0 : 30 }}>)</motion.span>

          {/* Exponente 2 (original) */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_EXP), fontSize: 40 }}
            initial={{ left: 235, top: 45 }}
            animate={
              paso === 0 ? { left: 235, top: 45, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 235, top: 45, opacity: 1, scale: [1, 1.3, 1.2] } :
                           { left: 235, top: 45, opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.5 }}>2</motion.span>

          {/* COPIA al numerador (3) */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_OK), fontSize: 32 }}
            initial={{ left: 235, top: 45, opacity: 0, scale: 0 }}
            animate={
              paso >= 2 ? { left: 158, top: 50, opacity: 1, scale: 1 } :
                           { left: 235, top: 45, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: paso === 2 ? 0.1 : 0 }}>2</motion.span>

          {/* COPIA al denominador (4) */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_OK), fontSize: 32 }}
            initial={{ left: 235, top: 45, opacity: 0, scale: 0 }}
            animate={
              paso >= 2 ? { left: 158, top: 115, opacity: 1, scale: 1 } :
                           { left: 235, top: 45, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: paso === 2 ? 0.2 : 0 }}>2</motion.span>

          {/* Verificación numérica (paso 3) */}
          <motion.div
            animate={paso === 3 ? { opacity: 1, x: 30 } : { opacity: 0, x: 0 }}
            style={{ position: "absolute", left: 240, top: 70, fontSize: 30, color: "var(--fg-muted)", fontWeight: 600 }}
          >
            = <span style={{ color: COLOR_OK, fontWeight: 800 }}>9</span>
            <div style={{ borderTop: "2px solid currentColor", padding: "2px 0", fontSize: 30, marginTop: 4 }}>
              <span style={{ color: COLOR_OK, fontWeight: 800 }}>16</span>
            </div>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", display: "inline-flex", alignItems: "center", gap: 3 }}>
            <span style={{ fontSize: 28, fontWeight: 400 }}>(</span>
            <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1.1 }}>
              <span style={{ padding: "0 6px" }}>a</span>
              <span style={{ borderTop: "1.5px solid currentColor", width: "100%", marginTop: 2 }} />
              <span style={{ padding: "0 6px", marginTop: 2 }}>b</span>
            </span>
            <span style={{ fontSize: 28, fontWeight: 400 }}>)</span>
            <span style={{ fontSize: 12, color: COLOR_EXP, alignSelf: "flex-start", marginTop: 2, marginLeft: -2 }}>n</span>
            <span style={{ margin: "0 8px" }}>=</span>
            <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1.1 }}>
              <span style={{ padding: "0 6px" }}>
                a<span style={{ fontSize: 11, color: COLOR_OK, verticalAlign: "super" }}>n</span>
              </span>
              <span style={{ borderTop: "1.5px solid currentColor", width: "100%", marginTop: 2 }} />
              <span style={{ padding: "0 6px", marginTop: 2 }}>
                b<span style={{ fontSize: 11, color: COLOR_OK, verticalAlign: "super" }}>n</span>
              </span>
            </span>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tocá para ver"}
        {paso === 1 && "El exponente 2 se prepara para repartirse…"}
        {paso === 2 && "…una copia va arriba (3 → 3²) y otra abajo (4 → 4²)"}
        {paso === 3 && "Resultado: 9/16"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 10 — Radicales como exponentes fraccionarios: ⁿ√a = a^(1/n)
// El radical "se transforma" en exponente fraccionario.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaRadicales() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Los <strong>radicales</strong> son potencias disfrazadas. La raíz se convierte en exponente fraccionario:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={380} h={160}>
          {/* Índice del radical "3" (de ³√) — vuela a la posición del denominador del exponente */}
          <motion.span style={{ position: "absolute", color: COLOR_EXP, fontWeight: 700, fontFamily: "var(--font-crimson), serif", lineHeight: 1, fontSize: 22 }}
            initial={{ left: 90, top: 30 }}
            animate={
              paso === 0 ? { left: 90, top: 30, opacity: 1, scale: 1.3 } :
              paso === 1 ? { left: 90, top: 30, opacity: 1, scale: [1.3, 1.6, 1.5] } :
                           { left: 252, top: 60, opacity: 1, scale: 1, color: COLOR_OK }
            }
            transition={{ type: "spring", stiffness: 160, damping: 14, duration: 0.6 }}
          >3</motion.span>

          {/* Símbolo radical √ */}
          <motion.span style={{ position: "absolute", left: 110, top: 40, fontSize: 70, color: COLOR_BASE, fontWeight: 400 }}
            animate={
              paso < 2 ? { opacity: 1, scale: 1 } :
                         { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.4 }}
          >√</motion.span>

          {/* "Techito" del radical */}
          <motion.div style={{ position: "absolute", left: 155, top: 48, width: 80, height: 3, background: COLOR_BASE, borderRadius: 2 }}
            animate={{ opacity: paso < 2 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Radicando 8 */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_BASE), fontSize: 70 }}
            initial={{ left: 170, top: 55 }}
            animate={
              paso < 2 ? { left: 170, top: 55, opacity: 1, scale: 1 } :
                         { left: 200, top: 55, opacity: 1, scale: 1 }
            }
            transition={{ type: "spring", stiffness: 180 }}
          >8</motion.span>

          {/* "1" del exponente fraccionario — POSICIONADO COMO SUPERÍNDICE arriba-derecha del 8 */}
          <motion.span style={{ position: "absolute", color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif", lineHeight: 1, fontSize: 22 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              paso >= 2 ? { left: 252, top: 30, opacity: 1, scale: 1 } :
                           { left: 252, top: 30, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 200, delay: paso === 2 ? 0.4 : 0 }}
          >1</motion.span>

          {/* Línea de fracción del exponente — justo encima del 8 */}
          <motion.div style={{ position: "absolute", left: 248, top: 55, width: 20, height: 2, background: COLOR_OK, borderRadius: 1, transformOrigin: "left" }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={paso >= 2 ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ delay: paso === 2 ? 0.5 : 0 }}
          />

          {/* "= 2" final (paso 3) — alineado con el 8 */}
          <motion.div
            animate={paso === 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            style={{ position: "absolute", left: 285, top: 65, display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ fontSize: 40, color: COLOR_EXP, fontWeight: 700 }}>=</span>
            <span style={{ ...numGrande(COLOR_OK), fontSize: 60 }}>2</span>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <sup style={{ fontSize: 14, color: COLOR_EXP }}>n</sup>√a = a<sup style={{ color: COLOR_OK }}>1/n</sup>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: paso >= 3 ? 1 : 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 13, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380,
            padding: "8px 14px", background: "var(--bg-subtle)", borderRadius: 10, marginTop: 6,
          }}
        >
          💡 Así toda raíz se vuelve potencia — y podés usar todas las propiedades que ya viste.
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 ¿Y la raíz cúbica de 8? Tocá para descubrir"}
        {paso === 1 && "El índice 3 se va a transformar…"}
        {paso === 2 && "…el radical desaparece, queda un exponente 1/3"}
        {paso === 3 && "8^(1/3) = 2, porque 2³ = 8"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 11 — Mini-reto interactivo
// ═════════════════════════════════════════════════════════════════════════════
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "3⁶", correcta: true },
    { label: "3⁸", correcta: false },
    { label: "9⁶", correcta: false },
    { label: "3⁻²", correcta: false },
  ], []);

  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Tu turno. Aplicá lo que aprendiste:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          padding: "30px 40px", background: "var(--bg-card)",
          borderRadius: 20, border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
        }}
      >
        <ExpInline base="3" exp="2" />
        <span style={{ fontSize: 40, color: COLOR_EXP, fontWeight: 700 }}>·</span>
        <ExpInline base="3" exp="4" />
        <span style={{ fontSize: 40, color: COLOR_EXP, fontWeight: 700 }}>=</span>
        <span style={{ fontSize: 40, color: "var(--fg-muted)", fontWeight: 700 }}>?</span>
      </motion.div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8,
      }}>
        {opciones.map((op, idx) => {
          const sel = elegida === idx;
          const reveal = elegida !== null;
          const isCorrecta = op.correcta;
          const bg = !reveal ? "var(--bg-card)"
            : isCorrecta ? "linear-gradient(135deg, #d1fae5, #a7f3d0)"
            : sel ? "linear-gradient(135deg, #fee2e2, #fecaca)"
            : "var(--bg-card)";
          const border = !reveal ? "var(--border)"
            : isCorrecta ? COLOR_OK
            : sel ? "#ef4444"
            : "var(--border)";

          return (
            <motion.button
              key={idx}
              whileHover={!reveal ? { scale: 1.03, y: -2 } : {}}
              whileTap={!reveal ? { scale: 0.97 } : {}}
              onClick={() => elegida === null && setElegida(idx)}
              disabled={reveal}
              style={{
                padding: "20px 16px", background: bg, border: `2px solid ${border}`,
                borderRadius: 14, cursor: reveal ? "default" : "pointer",
                fontSize: 26, fontWeight: 700, color: COLOR_BASE,
                fontFamily: "var(--font-crimson), serif",
                transition: "background 0.3s",
              }}
            >
              {op.label}
              {reveal && isCorrecta && <span style={{ marginLeft: 10, color: COLOR_OK }}>✓</span>}
              {reveal && sel && !isCorrecta && <span style={{ marginLeft: 10, color: "#ef4444" }}>✗</span>}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {elegida !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: 16, borderRadius: 14, marginTop: 6,
              background: opciones[elegida].correcta ? "#ecfdf5" : "#fef2f2",
              border: `1px solid ${opciones[elegida].correcta ? COLOR_OK : "#fca5a5"}`,
              fontSize: 14, color: "var(--fg-primary)",
            }}
          >
            {opciones[elegida].correcta ? (
              <>
                <strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Misma base (3) → exponentes se <strong>suman</strong>: 2 + 4 = 6. Por eso 3² · 3⁴ = 3⁶.
              </>
            ) : (
              <>
                <strong style={{ color: "#dc2626" }}>Casi.</strong> Cuando multiplicás potencias de igual base, los exponentes se <strong>suman</strong>, no se multiplican ni cambian la base. 2 + 4 = 6 → la respuesta es <strong>3⁶</strong>.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Estilos reutilizables
// ─────────────────────────────────────────────────────────────────────────────
const escenaWrap = (): React.CSSProperties => ({
  display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
});

const subtitulo = (): React.CSSProperties => ({
  fontSize: 17, color: "var(--fg-secondary)", textAlign: "center", maxWidth: 560,
  lineHeight: 1.5,
});

const parrafo = (): React.CSSProperties => ({
  fontSize: 16, color: "var(--fg-secondary)", textAlign: "center", maxWidth: 520,
  lineHeight: 1.6,
});

const hint = (): React.CSSProperties => ({
  fontSize: 14, color: "var(--fg-muted)", fontWeight: 600, textAlign: "center", minHeight: 22,
});

const numGrande = (color: string): React.CSSProperties => ({
  fontSize: 100, fontWeight: 700, color, fontFamily: "var(--font-crimson), serif", lineHeight: 1,
});

const cajaAnim = (): React.CSSProperties => ({
  minHeight: 240, display: "flex", flexDirection: "column",
  alignItems: "center", justifyContent: "center", gap: 20,
  background: "var(--bg-card)", borderRadius: 20, padding: "30px 40px",
  border: "1px solid var(--border)", cursor: "pointer", width: "100%", maxWidth: 560,
  boxShadow: "var(--shadow-sm)",
});

const cajitaFormula = (): React.CSSProperties => ({
  marginTop: 10, padding: "10px 18px",
  background: "var(--bg-subtle)", borderRadius: 12,
  border: "1px dashed var(--border)",
});
