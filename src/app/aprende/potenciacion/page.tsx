"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lienzo, Pregunta, Decir, Enf, Pizarra, Continuar, Hint, Aire, LIENZO,
} from "../_components/lienzo";

// ─────────────────────────────────────────────────────────────────────────────
// POTENCIACIÓN — Rediseño completo estilo 3Blue1Brown.
// Cada escena tiene UNA idea, animación que TERMINA, y siempre se puede repetir.
// Sin cards, sin emojis decorativos, sin texto académico. Pura matemática
// con animación intencional.
// ─────────────────────────────────────────────────────────────────────────────

type Escena = { titulo: string; componente: React.ComponentType };

const ESCENAS: Escena[] = [
  { titulo: "Qué es una potencia", componente: Esc01_Intro },
  { titulo: "Cómo se calcula", componente: Esc02_Significado },
  { titulo: "Producto: misma base", componente: Esc03_Producto },
  { titulo: "Cociente: misma base", componente: Esc04_Cociente },
  { titulo: "Potencia de potencia", componente: Esc05_PotPot },
  { titulo: "Exponente cero", componente: Esc06_Cero },
  { titulo: "Exponente negativo", componente: Esc07_Negativo },
  { titulo: "Producto elevado", componente: Esc08_ProdElevado },
  { titulo: "Fracción elevada", componente: Esc09_FracElevada },
  { titulo: "Raíz = exponente fraccionario", componente: Esc10_Radical },
  { titulo: "Errores que parecen razonables", componente: Esc11_Errores },
  { titulo: "Tu turno", componente: Esc12_Practica },
];

export default function LeccionPotenciacionPage() {
  const [i, setI] = useState(0);
  const Escena = ESCENAS[i].componente;
  const progreso = ((i + 1) / ESCENAS.length) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: LIENZO.bg,
      display: "flex",
      flexDirection: "column",
      color: LIENZO.fg,
    }}>
      <header style={{
        padding: "14px 20px",
        borderBottom: `1px solid ${LIENZO.fgFaint}33`,
        background: "rgba(250,250,247,0.85)",
        backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}>
        <Link href="/aprende" style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          color: LIENZO.accent, textDecoration: "none", fontSize: 14, fontWeight: 500,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Lecciones
        </Link>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: LIENZO.fgFaint, marginBottom: 2 }}>
            Unidad 01 · Potenciación
          </div>
          <div className="font-crimson" style={{ fontSize: 17, fontWeight: 500, color: LIENZO.fg, letterSpacing: "-0.01em" }}>
            {ESCENAS[i].titulo}
          </div>
        </div>
        <div style={{ fontSize: 12, color: LIENZO.fgFaint, fontWeight: 500 }}>
          {i + 1} / {ESCENAS.length}
        </div>
      </header>

      <div style={{ height: 2, background: `${LIENZO.fgFaint}22` }}>
        <motion.div
          style={{ height: "100%", background: LIENZO.accent }}
          animate={{ width: `${progreso}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
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
            <Escena />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer style={{
        padding: "14px 20px",
        borderTop: `1px solid ${LIENZO.fgFaint}33`,
        background: "rgba(250,250,247,0.92)",
        backdropFilter: "blur(12px)",
        display: "flex", gap: 12, justifyContent: "space-between",
        position: "sticky", bottom: 0,
      }}>
        <button
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          style={{
            padding: "10px 18px", background: "transparent",
            border: `1px solid ${LIENZO.fgFaint}`,
            borderRadius: 999,
            color: i === 0 ? LIENZO.fgFaint : LIENZO.fg,
            fontSize: 14, fontWeight: 500,
            cursor: i === 0 ? "not-allowed" : "pointer",
            opacity: i === 0 ? 0.4 : 1,
          }}
        >
          ← Anterior
        </button>
        {i < ESCENAS.length - 1 ? (
          <button
            onClick={() => setI((v) => v + 1)}
            style={{
              padding: "10px 24px", background: LIENZO.accent,
              border: "none", borderRadius: 999, color: LIENZO.bg,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}
          >
            Siguiente →
          </button>
        ) : (
          <Link
            href="/aprende"
            style={{
              padding: "10px 24px", background: LIENZO.ok,
              borderRadius: 999, color: LIENZO.bg,
              fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}
          >
            ✓ Terminar
          </Link>
        )}
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS visuales reutilizables dentro de las escenas
// ─────────────────────────────────────────────────────────────────────────────

// Ecuación final grande con tipografía HTML real (sup) — se ve como matemática.
// Usar al paso final de cada escena de regla para que el signo "=" sea explícito.
function EcuacionFinal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      style={{
        textAlign: "center",
        fontFamily: "var(--font-crimson), serif",
        fontSize: "clamp(36px, 7vw, 56px)",
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

// Helper inline para potencias dentro de EcuacionFinal: base con sup tipográfico real.
function Pot({ b, e, c = "accent" }: { b: React.ReactNode; e: React.ReactNode; c?: "accent" | "ok" | "bad" | "fg" }) {
  const col = c === "ok" ? LIENZO.ok : c === "bad" ? LIENZO.bad : c === "fg" ? LIENZO.fg : LIENZO.accent;
  return (
    <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {b}
      <sup style={{ fontSize: "0.55em", color: col, marginLeft: 1, verticalAlign: "super" }}>{e}</sup>
    </span>
  );
}

// Signo "=" con buen espaciado tipográfico.
function Igual() {
  return <span style={{ color: LIENZO.fgDim, margin: "0 0.45em", fontWeight: 400 }}>=</span>;
}

// Fracción HTML real (numerador / línea / denominador) para usar en línea de matemática.
function Frac({ n, d, c }: { n: React.ReactNode; d: React.ReactNode; c?: string }) {
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

// Raíz n-ésima TODA en un solo SVG: índice + check + línea superior +
// radicando en el mismo dibujo. Al ser un único path, el check y la línea
// de arriba NUNCA se desconectan. El radicando va como texto SVG dentro.
function Raiz({ n, r, italic = true }: { n?: string; r: string; italic?: boolean }) {
  return (
    <svg
      viewBox="0 0 64 42"
      height="1.3em"
      width="2em"
      style={{ verticalAlign: "middle", overflow: "visible" }}
      aria-hidden
    >
      {n && (
        <text x="7" y="15" fontSize="15" fill={LIENZO.accent} fontWeight="600"
          fontFamily="var(--font-crimson), serif">{n}</text>
      )}
      {/* check + vínculo en un solo trazo */}
      <path d="M 12 25 L 21 39 L 33 5 L 60 5" fill="none"
        stroke={LIENZO.fg} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* radicando bajo el vínculo */}
      <text x="46" y="33" textAnchor="middle" fontSize="28" fill={LIENZO.fg}
        fontWeight="500" fontStyle={italic ? "italic" : "normal"}
        fontFamily="var(--font-crimson), serif">{r}</text>
    </svg>
  );
}

// Botón "repetir animación"
function Repetir({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        alignSelf: "flex-start",
        background: "transparent",
        border: `1px solid ${LIENZO.fgFaint}`,
        color: LIENZO.fgDim,
        padding: "8px 18px",
        fontSize: 13,
        fontWeight: 500,
        borderRadius: 999,
        cursor: "pointer",
      }}
    >
      ↻ Repetir
    </button>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — ¿Qué es una potencia?
// 2·2·2·2·2 → 2⁵ (colapso al toque)
// ═════════════════════════════════════════════════════════════════════════════
function Esc01_Intro() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>¿Qué es una potencia?</Pregunta>
      <Decir>
        Cuando multiplicás el <Enf color="fg">mismo número</Enf> muchas veces, escribirlo se vuelve largo.
        La potencia es la <Enf>notación corta</Enf>.
      </Decir>

      <Pizarra alto={180} onClick={() => setPaso(paso < 1 ? paso + 1 : 0)}>
        <AnimatePresence mode="wait">
          {paso === 0 && (
            <motion.div
              key="largo"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35 }}
              style={{
                fontSize: "clamp(32px, 7vw, 56px)",
                fontFamily: "var(--font-crimson), serif",
                letterSpacing: "0.04em",
                color: LIENZO.fg,
                fontWeight: 500,
              }}
            >
              2 <span style={{ color: LIENZO.fgFaint }}>·</span> 2{" "}
              <span style={{ color: LIENZO.fgFaint }}>·</span> 2{" "}
              <span style={{ color: LIENZO.fgFaint }}>·</span> 2{" "}
              <span style={{ color: LIENZO.fgFaint }}>·</span> 2
            </motion.div>
          )}
          {paso === 1 && (
            <motion.div
              key="corto"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.55 }}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <span style={{
                fontSize: "clamp(96px, 18vw, 160px)",
                fontFamily: "var(--font-crimson), serif",
                fontWeight: 500, color: LIENZO.fg, lineHeight: 0.9,
              }}>2</span>
              <motion.span
                initial={{ opacity: 0, y: -16, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 240, damping: 18 }}
                style={{
                  fontSize: "clamp(48px, 9vw, 80px)",
                  fontFamily: "var(--font-crimson), serif",
                  fontWeight: 500, color: LIENZO.accent,
                  lineHeight: 1, marginLeft: 4,
                }}
              >5</motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </Pizarra>

      {paso === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <Decir>
            El <Enf color="fg">2</Enf> es la <Enf>base</Enf>: el número que se multiplica.
            El <Enf color="fg">5</Enf> es el <Enf>exponente</Enf>: cuántas veces.
          </Decir>
          <Decir>Se lee <em>dos a la quinta</em>.</Decir>
        </motion.div>
      )}

      <Aire />

      {paso === 0
        ? <Continuar onClick={() => setPaso(1)} texto="Colapsar a potencia" />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — Cómo se calcula
// 2³ → 2·2·2 → 4·2 → 8
// ═════════════════════════════════════════════════════════════════════════════
function Esc02_Significado() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>Para calcular una potencia, la expandís.</Pregunta>
      <Decir>
        El exponente te dice <Enf>cuántas copias</Enf> de la base hay que multiplicar.
      </Decir>

      <Pizarra alto={200} onClick={() => setPaso(paso < 3 ? paso + 1 : 0)}>
        <AnimatePresence mode="wait">
          {paso === 0 && (
            <motion.div key="p0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
              <span style={{
                fontSize: "clamp(80px, 16vw, 140px)",
                fontFamily: "var(--font-crimson), serif",
                fontWeight: 500, color: LIENZO.fg, lineHeight: 0.9,
              }}>2</span>
              <span style={{
                fontSize: "clamp(44px, 8vw, 72px)",
                fontFamily: "var(--font-crimson), serif",
                fontWeight: 500, color: LIENZO.accent,
                lineHeight: 1, marginLeft: 4,
              }}>3</span>
            </motion.div>
          )}
          {paso === 1 && (
            <motion.div key="p1"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              style={{
                fontSize: "clamp(48px, 10vw, 88px)",
                fontFamily: "var(--font-crimson), serif",
                fontWeight: 500, color: LIENZO.fg,
                display: "flex", gap: "0.4em",
              }}
            >
              <span>2</span><span style={{ color: LIENZO.fgFaint }}>·</span>
              <span>2</span><span style={{ color: LIENZO.fgFaint }}>·</span>
              <span>2</span>
            </motion.div>
          )}
          {paso === 2 && (
            <motion.div key="p2"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              style={{
                fontSize: "clamp(48px, 10vw, 88px)",
                fontFamily: "var(--font-crimson), serif",
                fontWeight: 500, color: LIENZO.fg,
                display: "flex", gap: "0.4em", alignItems: "center",
              }}
            >
              <span style={{ color: LIENZO.ok }}>4</span>
              <span style={{ color: LIENZO.fgFaint }}>·</span>
              <span>2</span>
            </motion.div>
          )}
          {paso === 3 && (
            <motion.div key="p3"
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              style={{
                fontSize: "clamp(96px, 20vw, 160px)",
                fontFamily: "var(--font-crimson), serif",
                fontWeight: 500, color: LIENZO.ok,
              }}
            >8</motion.div>
          )}
        </AnimatePresence>
      </Pizarra>

      <Decir>
        {paso === 0 && <>Tenemos <Enf color="fg">2³</Enf>. El exponente 3 dice: tres copias del 2.</>}
        {paso === 1 && <>Se expande a <Enf color="fg">2 · 2 · 2</Enf>.</>}
        {paso === 2 && <>Las dos primeras se multiplican: <Enf color="ok">2 · 2 = 4</Enf>. Queda 4 · 2.</>}
        {paso === 3 && <>Y finalmente: <Enf color="ok">4 · 2 = 8</Enf>. Entonces <Enf>2³ = 8</Enf>.</>}
      </Decir>

      {paso < 3
        ? <Continuar onClick={() => setPaso(paso + 1)} />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — Producto: aᵐ · aⁿ = aᵐ⁺ⁿ
// Los exponentes vuelan al centro y se SUMAN
// ═════════════════════════════════════════════════════════════════════════════
function Esc03_Producto() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>Multiplicar potencias con la <Enf>misma base</Enf>.</Pregunta>
      <Decir>Mirá qué pasa con los exponentes.</Decir>

      <Pizarra alto={220} onClick={() => setPaso(paso < 3 ? paso + 1 : 0)}>
        <svg width="100%" height="100%" viewBox="0 0 480 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}
        >
          {/* Base izquierda */}
          <motion.text
            fontSize="96" fill={LIENZO.fg} fontWeight="500" textAnchor="middle"
            initial={{ x: 130, y: 150 }}
            animate={paso >= 3 ? { x: 205, y: 150, opacity: 1 } : { x: 130, y: 150, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >2</motion.text>
          {/* Exponente izq (2) vuela arriba en paso 1, se desvanece en paso 2 */}
          <motion.text
            fontSize="56" fontWeight="500" textAnchor="middle" fill={LIENZO.accent}
            initial={{ x: 168, y: 100, opacity: 1 }}
            animate={
              paso === 0 ? { x: 168, y: 100, opacity: 1 } :
              paso === 1 ? { x: 215, y: 70, opacity: 1 } :
                           { x: 240, y: 70, opacity: 0 }
            }
            transition={{ duration: 0.55 }}
          >2</motion.text>
          {/* Punto de multiplicación */}
          <motion.circle cx="240" cy="148" r="5" fill={LIENZO.fgFaint}
            animate={paso >= 3 ? { opacity: 0 } : { opacity: paso === 0 ? 1 : 0.3 }} />
          {/* Base derecha */}
          <motion.text
            fontSize="96" fill={LIENZO.fg} fontWeight="500" textAnchor="middle"
            initial={{ x: 350, y: 150 }}
            animate={paso >= 3 ? { x: 205, y: 150, opacity: 0 } : { x: 350, y: 150, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >2</motion.text>
          {/* Exponente der (3) */}
          <motion.text
            fontSize="56" fontWeight="500" textAnchor="middle" fill={LIENZO.accent}
            initial={{ x: 388, y: 100, opacity: 1 }}
            animate={
              paso === 0 ? { x: 388, y: 100, opacity: 1 } :
              paso === 1 ? { x: 305, y: 70, opacity: 1 } :
                           { x: 270, y: 70, opacity: 0 }
            }
            transition={{ duration: 0.55, delay: paso === 1 ? 0.05 : 0 }}
          >3</motion.text>
          {/* Signo + (paso 1) */}
          <motion.text
            x="260" y="70" textAnchor="middle" fontSize="44" fill={LIENZO.accent} fontWeight="500"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: paso === 1 ? 0.4 : 0, duration: 0.3 }}
          >+</motion.text>
          {/* Resultado 5: se forma al centro (paso 2) y aterriza pegado a la base (paso 3) */}
          <motion.text
            textAnchor="middle" fontSize="56" fill={LIENZO.ok} fontWeight="500"
            initial={{ opacity: 0, scale: 0, x: 260, y: 70 }}
            animate={
              paso === 2 ? { opacity: 1, scale: 1, x: 260, y: 70 } :
              paso === 3 ? { opacity: 1, scale: 1, x: 248, y: 98 } :
                           { opacity: 0, scale: 0, x: 260, y: 70 }
            }
            transition={{ duration: 0.5 }}
          >5</motion.text>
        </svg>
      </Pizarra>

      <EcuacionFinal>
        <Pot b="2" e="2" /> · <Pot b="2" e="3" />
        {paso >= 2 && <> <Igual /><Pot b="2" e="5" c="ok" /></>}
      </EcuacionFinal>

      <div style={{ minHeight: 60 }}>
        <Decir>
          {paso === 0 && <>Tenemos <Enf color="fg">2² · 2³</Enf>. Tocá la animación (o "Siguiente") y mirá los exponentes.</>}
          {paso === 1 && <>Los exponentes se separan de sus bases. Entre ellos aparece un <Enf>+</Enf>.</>}
          {paso === 2 && <><Enf color="fg">2 + 3 = 5</Enf>. El resultado se vuelve el nuevo exponente.</>}
          {paso === 3 && <>Y la base sigue siendo la misma. Resultado: <Enf color="ok">2⁵</Enf>.<br /><span style={{ color: LIENZO.fgFaint }}>Regla: <em>aᵐ · aⁿ = aᵐ⁺ⁿ</em></span></>}
        </Decir>
      </div>

      {paso < 3
        ? <Continuar onClick={() => setPaso(paso + 1)} />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — Cociente: aᵐ / aⁿ = aᵐ⁻ⁿ
// ═════════════════════════════════════════════════════════════════════════════
function Esc04_Cociente() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>Dividir potencias con la <Enf>misma base</Enf>.</Pregunta>
      <Decir>Espejo de la regla anterior: ahora los exponentes se <Enf>restan</Enf>.</Decir>

      <Pizarra alto={220} onClick={() => setPaso(paso < 3 ? paso + 1 : 0)}>
        <svg width="100%" height="100%" viewBox="0 0 480 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}
        >
          {/* Base izquierda */}
          <motion.text
            fontSize="96" fill={LIENZO.fg} fontWeight="500" textAnchor="middle"
            initial={{ x: 130, y: 150 }}
            animate={paso >= 3 ? { x: 205, y: 150, opacity: 1 } : { x: 130, y: 150, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >2</motion.text>
          {/* Exponente izq (5) */}
          <motion.text
            fontSize="56" fontWeight="500" textAnchor="middle" fill={LIENZO.accent}
            initial={{ x: 168, y: 100, opacity: 1 }}
            animate={
              paso === 0 ? { x: 168, y: 100, opacity: 1 } :
              paso === 1 ? { x: 215, y: 70, opacity: 1 } :
                           { x: 240, y: 70, opacity: 0 }
            }
            transition={{ duration: 0.55 }}
          >5</motion.text>
          {/* Signo de división */}
          <motion.text x="240" y="160" textAnchor="middle" fontSize="50"
            fill={LIENZO.fgFaint} fontWeight="500"
            animate={paso >= 3 ? { opacity: 0 } : { opacity: paso === 0 ? 1 : 0.3 }}>÷</motion.text>
          {/* Base derecha */}
          <motion.text
            fontSize="96" fill={LIENZO.fg} fontWeight="500" textAnchor="middle"
            initial={{ x: 350, y: 150 }}
            animate={paso >= 3 ? { x: 205, y: 150, opacity: 0 } : { x: 350, y: 150, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >2</motion.text>
          {/* Exponente der (2) */}
          <motion.text
            fontSize="56" fontWeight="500" textAnchor="middle" fill={LIENZO.accent}
            initial={{ x: 388, y: 100, opacity: 1 }}
            animate={
              paso === 0 ? { x: 388, y: 100, opacity: 1 } :
              paso === 1 ? { x: 305, y: 70, opacity: 1 } :
                           { x: 270, y: 70, opacity: 0 }
            }
            transition={{ duration: 0.55, delay: paso === 1 ? 0.05 : 0 }}
          >2</motion.text>
          {/* Signo − (paso 1) */}
          <motion.text
            x="260" y="70" textAnchor="middle" fontSize="44" fill={LIENZO.accent} fontWeight="500"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: paso === 1 ? 0.4 : 0, duration: 0.3 }}
          >−</motion.text>
          {/* Resultado 3 */}
          <motion.text
            textAnchor="middle" fontSize="56" fill={LIENZO.ok} fontWeight="500"
            initial={{ opacity: 0, scale: 0, x: 260, y: 70 }}
            animate={
              paso === 2 ? { opacity: 1, scale: 1, x: 260, y: 70 } :
              paso === 3 ? { opacity: 1, scale: 1, x: 248, y: 98 } :
                           { opacity: 0, scale: 0, x: 260, y: 70 }
            }
            transition={{ duration: 0.5 }}
          >3</motion.text>
        </svg>
      </Pizarra>

      <EcuacionFinal>
        <Pot b="2" e="5" /> ÷ <Pot b="2" e="2" />
        {paso >= 2 && <> <Igual /><Pot b="2" e="3" c="ok" /></>}
      </EcuacionFinal>

      <div style={{ minHeight: 60 }}>
        <Decir>
          {paso === 0 && <>Tenemos <Enf color="fg">2⁵ ÷ 2²</Enf>.</>}
          {paso === 1 && <>Los exponentes se separan y aparece un <Enf>−</Enf>.</>}
          {paso === 2 && <><Enf color="fg">5 − 2 = 3</Enf>.</>}
          {paso === 3 && <>Resultado: <Enf color="ok">2³ = 8</Enf>.<br /><span style={{ color: LIENZO.fgFaint }}>Regla: <em>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</em></span></>}
        </Decir>
      </div>

      {paso < 3
        ? <Continuar onClick={() => setPaso(paso + 1)} />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 5 — Potencia de potencia: (aᵐ)ⁿ = aᵐ·ⁿ
// ═════════════════════════════════════════════════════════════════════════════
function Esc05_PotPot() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>Una potencia <Enf>elevada a otra potencia</Enf>.</Pregunta>
      <Decir>Acá los exponentes se <Enf>multiplican</Enf>.</Decir>

      <Pizarra alto={220} onClick={() => setPaso(paso < 3 ? paso + 1 : 0)}>
        <svg width="100%" height="100%" viewBox="0 0 480 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}
        >
          {/* ( */}
          <motion.text x="118" y="150" textAnchor="middle" fontSize="100"
            fill={LIENZO.fgFaint} fontWeight="400"
            animate={paso >= 3 ? { opacity: 0 } : { opacity: 1 }}>(</motion.text>
          {/* Base 2 */}
          <motion.text
            fontSize="96" fill={LIENZO.fg} fontWeight="500" textAnchor="middle"
            initial={{ x: 170, y: 150 }}
            animate={paso >= 3 ? { x: 205, y: 150 } : { x: 170, y: 150 }}
            transition={{ duration: 0.5 }}
          >2</motion.text>
          {/* Exponente interno (3) */}
          <motion.text
            fontSize="50" fontWeight="500" textAnchor="middle" fill={LIENZO.accent}
            initial={{ x: 206, y: 105, opacity: 1 }}
            animate={
              paso === 0 ? { x: 206, y: 105, opacity: 1 } :
              paso === 1 ? { x: 218, y: 70, opacity: 1 } :
                           { x: 240, y: 70, opacity: 0 }
            }
            transition={{ duration: 0.55 }}
          >3</motion.text>
          {/* ) */}
          <motion.text x="240" y="150" textAnchor="middle" fontSize="100"
            fill={LIENZO.fgFaint} fontWeight="400"
            animate={paso >= 3 ? { opacity: 0 } : { opacity: 1 }}>)</motion.text>
          {/* Exponente externo (2) */}
          <motion.text
            fontSize="50" fontWeight="500" textAnchor="middle" fill={LIENZO.accent}
            initial={{ x: 286, y: 105, opacity: 1 }}
            animate={
              paso === 0 ? { x: 286, y: 105, opacity: 1 } :
              paso === 1 ? { x: 302, y: 70, opacity: 1 } :
                           { x: 270, y: 70, opacity: 0 }
            }
            transition={{ duration: 0.55, delay: paso === 1 ? 0.05 : 0 }}
          >2</motion.text>
          {/* × (paso 1) */}
          <motion.text
            x="260" y="70" textAnchor="middle" fontSize="38" fill={LIENZO.accent} fontWeight="500"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: paso === 1 ? 0.4 : 0, duration: 0.3 }}
          >×</motion.text>
          {/* Resultado 6 */}
          <motion.text
            textAnchor="middle" fontSize="56" fill={LIENZO.ok} fontWeight="500"
            initial={{ opacity: 0, scale: 0, x: 260, y: 70 }}
            animate={
              paso === 2 ? { opacity: 1, scale: 1, x: 260, y: 70 } :
              paso === 3 ? { opacity: 1, scale: 1, x: 248, y: 98 } :
                           { opacity: 0, scale: 0, x: 260, y: 70 }
            }
            transition={{ duration: 0.5 }}
          >6</motion.text>
        </svg>
      </Pizarra>

      <EcuacionFinal>
        (<Pot b="2" e="3" />)<sup style={{ fontSize: "0.55em", color: LIENZO.accent }}>2</sup>
        {paso >= 2 && <> <Igual /><Pot b="2" e="6" c="ok" /></>}
      </EcuacionFinal>

      <div style={{ minHeight: 60 }}>
        <Decir>
          {paso === 0 && <>Tenemos <Enf color="fg">(2³)²</Enf>.</>}
          {paso === 1 && <>Los exponentes se separan. Entre ellos: <Enf>×</Enf>.</>}
          {paso === 2 && <><Enf color="fg">3 × 2 = 6</Enf>.</>}
          {paso === 3 && <>Resultado: <Enf color="ok">2⁶</Enf>.<br /><span style={{ color: LIENZO.fgFaint }}>Regla: <em>(aᵐ)ⁿ = aᵐ·ⁿ</em></span></>}
        </Decir>
      </div>

      {paso < 3
        ? <Continuar onClick={() => setPaso(paso + 1)} />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Exponente cero: a⁰ = 1
// ═════════════════════════════════════════════════════════════════════════════
function Esc06_Cero() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>¿Cuánto vale <Enf color="fg">cualquier número</Enf> elevado a cero?</Pregunta>
      <Decir>La respuesta es <Enf>1</Enf>. Y tiene una razón hermosa.</Decir>

      <Pizarra alto={220} onClick={() => setPaso(paso < 3 ? paso + 1 : 0)}>
        <svg width="100%" height="100%" viewBox="0 0 480 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}
        >
          {/* Base izquierda: se mantiene hasta paso 2, en paso 3 se transforma en 1 */}
          <motion.text
            fontSize="96" fill={LIENZO.fg} fontWeight="500" textAnchor="middle"
            initial={{ x: 130, y: 150 }}
            animate={
              paso === 3 ? { x: 205, y: 150, opacity: 0, scale: 0.6 } :
              paso === 2 ? { x: 205, y: 150, opacity: 1 } :
                           { x: 130, y: 150, opacity: 1 }
            }
            transition={{ duration: 0.5 }}
          >2</motion.text>
          {/* Exponente izq (5) */}
          <motion.text
            fontSize="56" fontWeight="500" textAnchor="middle" fill={LIENZO.accent}
            initial={{ x: 168, y: 100, opacity: 1 }}
            animate={
              paso === 0 ? { x: 168, y: 100, opacity: 1 } :
              paso === 1 ? { x: 215, y: 70, opacity: 1 } :
                           { x: 240, y: 70, opacity: 0 }
            }
            transition={{ duration: 0.55 }}
          >5</motion.text>
          {/* División */}
          <motion.text x="240" y="160" textAnchor="middle" fontSize="50"
            fill={LIENZO.fgFaint} fontWeight="500"
            animate={paso >= 3 ? { opacity: 0 } : { opacity: paso === 0 ? 1 : 0.3 }}>÷</motion.text>
          {/* Base derecha */}
          <motion.text
            fontSize="96" fill={LIENZO.fg} fontWeight="500" textAnchor="middle"
            initial={{ x: 350, y: 150 }}
            animate={paso >= 2 ? { x: 205, y: 150, opacity: 0 } : { x: 350, y: 150, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >2</motion.text>
          {/* Exponente der (5) */}
          <motion.text
            fontSize="56" fontWeight="500" textAnchor="middle" fill={LIENZO.accent}
            initial={{ x: 388, y: 100, opacity: 1 }}
            animate={
              paso === 0 ? { x: 388, y: 100, opacity: 1 } :
              paso === 1 ? { x: 305, y: 70, opacity: 1 } :
                           { x: 270, y: 70, opacity: 0 }
            }
            transition={{ duration: 0.55, delay: paso === 1 ? 0.05 : 0 }}
          >5</motion.text>
          {/* Signo − (paso 1) */}
          <motion.text
            x="260" y="70" textAnchor="middle" fontSize="44" fill={LIENZO.accent} fontWeight="500"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: paso === 1 ? 0.4 : 0, duration: 0.3 }}
          >−</motion.text>
          {/* Resultado 0: aparece centro (paso 2), aterriza como exponente */}
          <motion.text
            textAnchor="middle" fontSize="56" fill={LIENZO.accent} fontWeight="500"
            initial={{ opacity: 0, scale: 0, x: 260, y: 70 }}
            animate={
              paso === 2 ? { opacity: 1, scale: 1, x: 248, y: 98 } :
              paso === 3 ? { opacity: 0, scale: 0.5, x: 248, y: 98 } :
                           { opacity: 0, scale: 0, x: 260, y: 70 }
            }
            transition={{ duration: 0.5 }}
          >0</motion.text>
          {/* "1" final: salta al centro cuando todo se transforma (paso 3) */}
          <motion.text
            x="220" y="160" textAnchor="middle" fontSize="120" fill={LIENZO.ok} fontWeight="500"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={paso === 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: paso === 3 ? 0.2 : 0 }}
          >1</motion.text>
        </svg>
      </Pizarra>

      <EcuacionFinal>
        <Pot b="2" e="5" /> ÷ <Pot b="2" e="5" />
        {paso >= 2 && <> <Igual /><Pot b="2" e="0" /></>}
        {paso >= 3 && <> <Igual /><span style={{ color: LIENZO.ok }}>1</span></>}
      </EcuacionFinal>

      <div style={{ minHeight: 60 }}>
        <Decir>
          {paso === 0 && <>Pensá en <Enf color="fg">2⁵ ÷ 2⁵</Enf>: algo dividido por sí mismo.</>}
          {paso === 1 && <>Por la regla del cociente restamos los exponentes: <Enf color="fg">5 − 5</Enf>.</>}
          {paso === 2 && <>Eso da <Enf color="fg">2⁰</Enf>. Pero un número dividido por sí mismo siempre es 1…</>}
          {paso === 3 && <>Entonces <Enf color="ok">2⁰ = 1</Enf>. Y lo mismo pasa con cualquier base: <Enf color="ok">a⁰ = 1</Enf> (con <em>a ≠ 0</em>).</>}
        </Decir>
      </div>

      {paso < 3
        ? <Continuar onClick={() => setPaso(paso + 1)} />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 7 — Exponente negativo: a⁻ⁿ = 1/aⁿ
// ═════════════════════════════════════════════════════════════════════════════
function Esc07_Negativo() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>Un exponente <Enf>negativo</Enf>.</Pregunta>
      <Decir>El signo menos invierte: la base baja al denominador.</Decir>

      <Pizarra alto={240} onClick={() => setPaso(paso < 2 ? paso + 1 : 0)}>
        <svg width="100%" height="100%" viewBox="0 0 480 240"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}
        >
          {/* "1" del numerador: aparece cuando la base baja */}
          <motion.text
            textAnchor="middle" fontSize="72" fill={LIENZO.ok} fontWeight="500"
            initial={{ opacity: 0, x: 230, y: 118, scale: 0.6 }}
            animate={paso >= 1 ? { opacity: 1, x: 230, y: 105, scale: 1 } : { opacity: 0, x: 230, y: 118, scale: 0.6 }}
            transition={{ duration: 0.5, delay: paso === 1 ? 0.25 : 0 }}
          >1</motion.text>
          {/* Línea de fracción: se dibuja en paso 1 */}
          <motion.line
            x1="180" x2="280" y1="128" y2="128" stroke={LIENZO.fg} strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={paso >= 1 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: paso === 1 ? 0.15 : 0 }}
          />
          {/* Base 2: arriba en paso 0, baja al denominador en paso 1 */}
          <motion.text
            textAnchor="middle" fill={LIENZO.fg} fontWeight="500"
            initial={{ x: 215, y: 150, fontSize: 110 }}
            animate={
              paso >= 1
                ? { x: 220, y: 195, fontSize: 84 }
                : { x: 215, y: 150, fontSize: 110 }
            }
            transition={{ duration: 0.55 }}
          >2</motion.text>
          {/* Signo − : presente en paso 0, se va volando en paso 1 */}
          <motion.text
            textAnchor="middle" fill={LIENZO.accent} fontWeight="500" fontSize="48"
            initial={{ x: 278, y: 92, opacity: 1 }}
            animate={
              paso === 0 ? { x: 278, y: 92, opacity: 1 } :
                           { x: 320, y: 50, opacity: 0 }
            }
            transition={{ duration: 0.5 }}
          >−</motion.text>
          {/* Exponente 3: en paso 0 arriba de la base; en paso 1 queda como exponente del denominador */}
          <motion.text
            textAnchor="middle" fill={LIENZO.accent} fontWeight="500" fontSize="48"
            initial={{ x: 304, y: 92 }}
            animate={
              paso >= 1 ? { x: 260, y: 162, fontSize: 40 } : { x: 304, y: 92, fontSize: 48 }
            }
            transition={{ duration: 0.55 }}
          >3</motion.text>
        </svg>
      </Pizarra>

      <EcuacionFinal>
        <Pot b="2" e="−3" />
        {paso >= 1 && <> <Igual /><Frac n={<span style={{ color: LIENZO.ok }}>1</span>} d={<Pot b="2" e="3" />} /></>}
        {paso >= 2 && <> <Igual /><Frac n={<span style={{ color: LIENZO.ok }}>1</span>} d={<span style={{ color: LIENZO.ok }}>8</span>} /></>}
      </EcuacionFinal>

      <div style={{ minHeight: 60 }}>
        <Decir>
          {paso === 0 && <>Acá tenemos <Enf color="fg">2⁻³</Enf>. ¿Qué significa ese menos?</>}
          {paso === 1 && <>El menos hace que la base <Enf>baje al denominador</Enf>: queda <Enf color="ok">1/2³</Enf>.</>}
          {paso === 2 && <>Y <Enf color="fg">2³ = 8</Enf>, así que <Enf color="ok">2⁻³ = 1/8</Enf>.<br /><span style={{ color: LIENZO.fgFaint }}>Regla: <em>a⁻ⁿ = 1/aⁿ</em></span></>}
        </Decir>
      </div>

      {paso < 2
        ? <Continuar onClick={() => setPaso(paso + 1)} />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 8 — Producto elevado: (a·b)ⁿ = aⁿ·bⁿ
// El exponente se duplica y cae sobre cada factor
// ═════════════════════════════════════════════════════════════════════════════
function Esc08_ProdElevado() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>Un <Enf>producto</Enf> elevado a una potencia.</Pregunta>
      <Decir>El exponente se reparte: cae sobre cada factor.</Decir>

      <Pizarra alto={220} onClick={() => setPaso(paso < 2 ? paso + 1 : 0)}>
        <svg width="100%" height="100%" viewBox="0 0 480 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}
        >
          {/* ( */}
          <motion.text x="105" y="150" textAnchor="middle" fontSize="100"
            fill={LIENZO.fgFaint} fontWeight="400"
            animate={paso >= 2 ? { opacity: 0 } : { opacity: 1 }}>(</motion.text>
          {/* a */}
          <motion.text x="160" y="150" textAnchor="middle" fontSize="88"
            fill={LIENZO.fg} fontWeight="500" fontStyle="italic">a</motion.text>
          {/* · */}
          <motion.circle cx="220" cy="145" r="5" fill={LIENZO.fgFaint} />
          {/* b */}
          <motion.text x="280" y="150" textAnchor="middle" fontSize="88"
            fill={LIENZO.fg} fontWeight="500" fontStyle="italic">b</motion.text>
          {/* ) */}
          <motion.text x="335" y="150" textAnchor="middle" fontSize="100"
            fill={LIENZO.fgFaint} fontWeight="400"
            animate={paso >= 2 ? { opacity: 0 } : { opacity: 1 }}>)</motion.text>
          {/* exponente n original (se agranda en paso 1, desaparece en paso 2) */}
          <motion.text
            fontSize="54" fill={LIENZO.accent} fontWeight="500" textAnchor="middle"
            initial={{ x: 375, y: 105 }}
            animate={
              paso === 0 ? { x: 375, y: 105, opacity: 1, scale: 1 } :
              paso === 1 ? { x: 375, y: 105, opacity: 1, scale: 1.35 } :
                           { x: 375, y: 105, opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.5 }}
          >n</motion.text>
          {/* Copia 1 del exponente vuela sobre la a */}
          <motion.text
            fontSize="48" fill={LIENZO.accent} fontWeight="500" textAnchor="middle"
            initial={{ x: 375, y: 105, opacity: 0 }}
            animate={paso >= 2 ? { x: 198, y: 105, opacity: 1 } : { x: 375, y: 105, opacity: 0 }}
            transition={{ duration: 0.6, delay: paso === 2 ? 0.1 : 0 }}
          >n</motion.text>
          {/* Copia 2 del exponente vuela sobre la b */}
          <motion.text
            fontSize="48" fill={LIENZO.accent} fontWeight="500" textAnchor="middle"
            initial={{ x: 375, y: 105, opacity: 0 }}
            animate={paso >= 2 ? { x: 318, y: 105, opacity: 1 } : { x: 375, y: 105, opacity: 0 }}
            transition={{ duration: 0.6, delay: paso === 2 ? 0.2 : 0 }}
          >n</motion.text>
        </svg>
      </Pizarra>

      <EcuacionFinal>
        (<em style={{ fontStyle: "italic" }}>a</em> · <em style={{ fontStyle: "italic" }}>b</em>)<sup style={{ fontSize: "0.55em", color: LIENZO.accent }}>n</sup>
        {paso >= 2 && (
          <> <Igual /><span style={{ color: LIENZO.ok }}>
            <Pot b={<em style={{ fontStyle: "italic" }}>a</em>} e="n" c="ok" /> · <Pot b={<em style={{ fontStyle: "italic" }}>b</em>} e="n" c="ok" />
          </span></>
        )}
      </EcuacionFinal>

      <div style={{ minHeight: 60 }}>
        <Decir>
          {paso === 0 && <>Tenemos <Enf color="fg">(a · b)ⁿ</Enf>.</>}
          {paso === 1 && <>El exponente <Enf>n</Enf> se va a duplicar y caer sobre cada factor.</>}
          {paso === 2 && <>Listo: <Enf color="ok">aⁿ · bⁿ</Enf>.<br /><span style={{ color: LIENZO.fgFaint }}>Regla: <em>(a · b)ⁿ = aⁿ · bⁿ</em>. Ej: (2·3)² = 4·9 = 36.</span></>}
        </Decir>
      </div>

      {paso < 2
        ? <Continuar onClick={() => setPaso(paso + 1)} />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 9 — Fracción elevada: (a/b)ⁿ = aⁿ/bⁿ
// ═════════════════════════════════════════════════════════════════════════════
function Esc09_FracElevada() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>Una <Enf>fracción</Enf> elevada a una potencia.</Pregunta>
      <Decir>Mismo principio que el producto: el exponente cae sobre numerador y denominador.</Decir>

      <Pizarra alto={240} onClick={() => setPaso(paso < 2 ? paso + 1 : 0)}>
        <svg width="100%" height="100%" viewBox="0 0 480 240"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}
        >
          {/* ( */}
          <motion.text x="95" y="135" textAnchor="middle" fontSize="150"
            fill={LIENZO.fgFaint} fontWeight="300"
            animate={paso >= 2 ? { opacity: 0 } : { opacity: 1 }}>(</motion.text>
          {/* a (numerador) */}
          <motion.text x="180" y="100" textAnchor="middle" fontSize="64"
            fill={LIENZO.fg} fontWeight="500" fontStyle="italic">a</motion.text>
          {/* línea de fracción */}
          <motion.line x1="148" y1="120" x2="212" y2="120" stroke={LIENZO.fg} strokeWidth="3" />
          {/* b (denominador) */}
          <motion.text x="180" y="180" textAnchor="middle" fontSize="64"
            fill={LIENZO.fg} fontWeight="500" fontStyle="italic">b</motion.text>
          {/* ) */}
          <motion.text x="265" y="135" textAnchor="middle" fontSize="150"
            fill={LIENZO.fgFaint} fontWeight="300"
            animate={paso >= 2 ? { opacity: 0 } : { opacity: 1 }}>)</motion.text>
          {/* exponente n original */}
          <motion.text
            fontSize="54" fill={LIENZO.accent} fontWeight="500" textAnchor="middle"
            initial={{ x: 305, y: 90 }}
            animate={
              paso === 0 ? { x: 305, y: 90, opacity: 1, scale: 1 } :
              paso === 1 ? { x: 305, y: 90, opacity: 1, scale: 1.35 } :
                           { x: 305, y: 90, opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.5 }}
          >n</motion.text>
          {/* Copia 1 (sube al numerador a) */}
          <motion.text
            fontSize="42" fill={LIENZO.accent} fontWeight="500" textAnchor="middle"
            initial={{ x: 305, y: 90, opacity: 0 }}
            animate={paso >= 2 ? { x: 212, y: 78, opacity: 1 } : { x: 305, y: 90, opacity: 0 }}
            transition={{ duration: 0.6, delay: paso === 2 ? 0.1 : 0 }}
          >n</motion.text>
          {/* Copia 2 (baja al denominador b) */}
          <motion.text
            fontSize="42" fill={LIENZO.accent} fontWeight="500" textAnchor="middle"
            initial={{ x: 305, y: 90, opacity: 0 }}
            animate={paso >= 2 ? { x: 212, y: 158, opacity: 1 } : { x: 305, y: 90, opacity: 0 }}
            transition={{ duration: 0.6, delay: paso === 2 ? 0.2 : 0 }}
          >n</motion.text>
        </svg>
      </Pizarra>

      <EcuacionFinal>
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          (<Frac n={<em style={{ fontStyle: "italic" }}>a</em>} d={<em style={{ fontStyle: "italic" }}>b</em>} />)
          <sup style={{ fontSize: "0.55em", color: LIENZO.accent, alignSelf: "flex-start" }}>n</sup>
        </span>
        {paso >= 2 && (
          <> <Igual /><Frac
            n={<Pot b={<em style={{ fontStyle: "italic" }}>a</em>} e="n" c="ok" />}
            d={<Pot b={<em style={{ fontStyle: "italic" }}>b</em>} e="n" c="ok" />}
            c={LIENZO.ok}
          /></>
        )}
      </EcuacionFinal>

      <div style={{ minHeight: 60 }}>
        <Decir>
          {paso === 0 && <>Tenemos <Enf color="fg">(a/b)ⁿ</Enf>.</>}
          {paso === 1 && <>El exponente se va a partir en dos: una copia arriba, otra abajo.</>}
          {paso === 2 && <>Resultado: <Enf color="ok">aⁿ / bⁿ</Enf>.<br /><span style={{ color: LIENZO.fgFaint }}>Regla: <em>(a/b)ⁿ = aⁿ/bⁿ</em>. Ej: (3/4)² = 9/16.</span></>}
        </Decir>
      </div>

      {paso < 2
        ? <Continuar onClick={() => setPaso(paso + 1)} />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 10 — Raíz = exponente fraccionario: ⁿ√a = a^(1/n)
// ═════════════════════════════════════════════════════════════════════════════
function Esc10_Radical() {
  const [paso, setPaso] = useState(0);
  return (
    <Lienzo>
      <Pregunta>Las <Enf>raíces</Enf> son potencias disfrazadas.</Pregunta>
      <Decir>El índice de la raíz se convierte en el <Enf>denominador</Enf> del exponente.</Decir>

      <Pizarra alto={220} onClick={() => setPaso(paso < 1 ? 1 : 0)}>
        <svg width="100%" height="100%" viewBox="0 0 480 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}
        >
          {/* Símbolo de raíz √ (checkmark + línea superior): se desvanece en paso 1 */}
          <motion.path
            d="M 156 112 L 170 134 L 188 64 L 256 64"
            stroke={LIENZO.fg} strokeWidth="5" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            animate={paso >= 1 ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          {/* Radicando a : pasa a ser la base */}
          <motion.text
            textAnchor="middle" fill={LIENZO.fg} fontWeight="500" fontStyle="italic"
            initial={{ x: 222, y: 128, fontSize: 88 }}
            animate={paso >= 1 ? { x: 198, y: 150, fontSize: 96 } : { x: 222, y: 128, fontSize: 88 }}
            transition={{ duration: 0.55 }}
          >a</motion.text>
          {/* Índice n : vuela a ser el denominador del exponente */}
          <motion.text
            textAnchor="middle" fill={LIENZO.accent} fontWeight="500"
            initial={{ x: 138, y: 92, fontSize: 34 }}
            animate={paso >= 1 ? { x: 262, y: 122, fontSize: 32 } : { x: 138, y: 92, fontSize: 34 }}
            transition={{ duration: 0.6 }}
          >n</motion.text>
          {/* "1" numerador del exponente : aparece en paso 1 */}
          <motion.text
            textAnchor="middle" fontSize="32" fill={LIENZO.accent} fontWeight="500"
            initial={{ opacity: 0, x: 262, y: 105, scale: 0.6 }}
            animate={paso >= 1 ? { opacity: 1, x: 262, y: 90, scale: 1 } : { opacity: 0, x: 262, y: 105, scale: 0.6 }}
            transition={{ duration: 0.45, delay: paso === 1 ? 0.25 : 0 }}
          >1</motion.text>
          {/* Línea de fracción del exponente */}
          <motion.line
            x1="248" x2="276" y1="100" y2="100" stroke={LIENZO.accent} strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={paso >= 1 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.4, delay: paso === 1 ? 0.2 : 0 }}
          />
        </svg>
      </Pizarra>

      <EcuacionFinal>
        <Raiz n="n" r="a" />
        {paso >= 1 && <> <Igual /><Pot b={<em style={{ fontStyle: "italic" }}>a</em>} e={<Frac n="1" d="n" c={LIENZO.accent} />} /></>}
      </EcuacionFinal>

      <div style={{ minHeight: 60 }}>
        <Decir>
          {paso === 0 && <>Una raíz n-ésima: <Enf color="fg">ⁿ√a</Enf>. Tocá para transformarla.</>}
          {paso === 1 && <>
            El índice <Enf>n</Enf> pasa abajo y se vuelve el denominador del exponente: <Enf color="ok">a elevado a 1/n</Enf>.
            <br />
            <span style={{ color: LIENZO.fgDim, display: "inline-flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: LIENZO.fgFaint, fontSize: "0.85em" }}>Ejemplo 1:</span>
                <Raiz r="a" /> <Igual /> <Pot b={<em style={{ fontStyle: "italic" }}>a</em>} e={<Frac n="1" d="2" c={LIENZO.accent} />} />
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: LIENZO.fgFaint, fontSize: "0.85em" }}>Ejemplo 2:</span>
                <Raiz n="3" r="8" italic={false} /> <Igual /> <Pot b="8" e={<Frac n="1" d="3" c={LIENZO.accent} />} /> <Igual /> <span style={{ color: LIENZO.ok, fontWeight: 600 }}>2</span>
              </span>
            </span>
          </>}
        </Decir>
      </div>

      {paso < 1
        ? <Continuar onClick={() => setPaso(1)} texto="Transformar" />
        : <Repetir onClick={() => setPaso(0)} />}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 11 — Errores que parecen razonables (V/F INTERACTIVO)
// ═════════════════════════════════════════════════════════════════════════════
type Trampa = {
  afirmacion: string;
  esCorrecta: boolean;
  explica: string;
};

const TRAMPAS: Trampa[] = [
  {
    afirmacion: "(a + b)² = a² + b²",
    esCorrecta: false,
    explica: "Es trampa. Verificá: (1+1)² = 4, pero 1² + 1² = 2. La distribución del exponente NO funciona con sumas: solo con productos: (a·b)ⁿ = aⁿ·bⁿ.",
  },
  {
    afirmacion: "2³ · 5² = 10⁵",
    esCorrecta: false,
    explica: "Trampa. 2³ · 5² = 8 · 25 = 200, no 100 000. Los exponentes se suman SOLO si las bases son idénticas. Acá las bases son distintas (2 y 5).",
  },
  {
    afirmacion: "−3² = −9 (sin paréntesis)",
    esCorrecta: true,
    explica: "Verdadero. Sin paréntesis, el exponente solo afecta al 3. Se calcula primero 3² = 9 y después el menos: −9. Distinto de (−3)² = +9.",
  },
  {
    afirmacion: "2⁻³ es un número negativo",
    esCorrecta: false,
    explica: "Trampa. El signo menos NO hace negativo el resultado, lo invierte: 2⁻³ = 1/2³ = 1/8 = 0.125. Es positivo.",
  },
  {
    afirmacion: "(2³)² = 2⁵",
    esCorrecta: false,
    explica: "Trampa. Cuando es potencia DE potencia, los exponentes se MULTIPLICAN: (2³)² = 2⁶ = 64. La suma de exponentes (2⁵) sería para 2³ · 2².",
  },
];

function Esc11_Errores() {
  const [i, setI] = useState(0);
  const [respondida, setRespondida] = useState<null | boolean>(null);
  const [aciertos, setAciertos] = useState(0);
  const trampa = TRAMPAS[i];
  const correcto = respondida !== null && respondida === trampa.esCorrecta;

  function siguiente() {
    if (i < TRAMPAS.length - 1) {
      setI(i + 1);
      setRespondida(null);
    }
  }

  function reiniciar() {
    setI(0);
    setRespondida(null);
    setAciertos(0);
  }

  function responder(opcion: boolean) {
    if (respondida !== null) return;
    setRespondida(opcion);
    if (opcion === trampa.esCorrecta) setAciertos((a) => a + 1);
  }

  const terminado = i === TRAMPAS.length - 1 && respondida !== null;

  return (
    <Lienzo>
      <Pregunta>Errores que <Enf>suenan razonables</Enf>.</Pregunta>
      <Decir>
        Cada afirmación parece correcta. Tu trabajo: decidir si es <Enf color="ok">verdadera</Enf> o <Enf color="bad">falsa</Enf>.
      </Decir>

      <div style={{ fontSize: 11, color: LIENZO.fgFaint, letterSpacing: 1.5, textTransform: "uppercase" }}>
        Trampa {i + 1} de {TRAMPAS.length}
      </div>

      <motion.div
        key={i}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "clamp(28px, 5vw, 44px)",
          fontFamily: "var(--font-crimson), serif",
          fontWeight: 500,
          color: LIENZO.fg,
          textAlign: "center",
          padding: "24px 16px",
          lineHeight: 1.3,
        }}
      >
        {trampa.afirmacion}
      </motion.div>

      {respondida === null ? (
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <button
            onClick={() => responder(true)}
            style={{
              padding: "14px 36px", background: "transparent",
              border: `1.5px solid ${LIENZO.ok}`,
              color: LIENZO.ok, fontSize: 16, fontWeight: 600,
              borderRadius: 999, cursor: "pointer", minWidth: 140,
            }}
          >
            Verdadero
          </button>
          <button
            onClick={() => responder(false)}
            style={{
              padding: "14px 36px", background: "transparent",
              border: `1.5px solid ${LIENZO.bad}`,
              color: LIENZO.bad, fontSize: 16, fontWeight: 600,
              borderRadius: 999, cursor: "pointer", minWidth: 140,
            }}
          >
            Falso
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "20px",
            border: `1px solid ${correcto ? LIENZO.ok : LIENZO.bad}33`,
            borderLeft: `3px solid ${correcto ? LIENZO.ok : LIENZO.bad}`,
            borderRadius: 8,
            background: `${correcto ? LIENZO.ok : LIENZO.bad}10`,
          }}
        >
          <div style={{
            fontSize: 13, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase",
            color: correcto ? LIENZO.ok : LIENZO.bad, marginBottom: 10,
          }}>
            {correcto ? "✓ Bien pensado" : "✗ Era trampa"}
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.55, color: LIENZO.fgDim }}>
            {trampa.explica}
          </div>
        </motion.div>
      )}

      <Aire />

      {respondida !== null && !terminado && (
        <Continuar onClick={siguiente} texto="Siguiente trampa" />
      )}
      {terminado && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Decir>
            Acertaste <Enf color="ok">{aciertos} de {TRAMPAS.length}</Enf>.
          </Decir>
          <Repetir onClick={reiniciar} />
        </div>
      )}
    </Lienzo>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 12 — Práctica final
// ═════════════════════════════════════════════════════════════════════════════
type Pregunta = { p: string; opciones: string[]; correcta: number; explica: string };
const PRACTICA: Pregunta[] = [
  { p: "2³ · 2⁴ = ?", opciones: ["2⁷", "2¹²", "4⁷", "8"], correcta: 0, explica: "Misma base, exponentes se suman: 3+4 = 7." },
  { p: "(x²)⁵ = ?", opciones: ["x⁷", "x¹⁰", "2x⁵", "x²⁵"], correcta: 1, explica: "Potencia de potencia: exponentes se multiplican. 2·5 = 10." },
  { p: "5⁰ = ?", opciones: ["0", "1", "5", "Indefinido"], correcta: 1, explica: "Cualquier número (≠ 0) elevado a 0 vale 1." },
  { p: "3⁻² = ?", opciones: ["−9", "−6", "1/9", "1/6"], correcta: 2, explica: "El menos invierte: 3⁻² = 1/3² = 1/9." },
  { p: "³√8 = ?", opciones: ["2", "3", "4", "8/3"], correcta: 0, explica: "³√8 equivale a 8 elevado a 1/3, y vale 2." },
];

function Esc12_Practica() {
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const aciertos = Object.entries(respuestas).filter(([k, v]) => PRACTICA[+k].correcta === v).length;
  const completo = Object.keys(respuestas).length === PRACTICA.length;

  function resetear() { setRespuestas({}); }

  return (
    <Lienzo>
      <Pregunta>Tu turno.</Pregunta>
      <Decir>5 preguntas cortas. Después te muestro cómo te fue.</Decir>

      {PRACTICA.map((q, i) => {
        const elegida = respuestas[i];
        const respondida = elegida !== undefined;
        return (
          <div key={i} style={{
            display: "flex", flexDirection: "column", gap: 10,
            paddingBottom: 18,
            borderBottom: i < PRACTICA.length - 1 ? `1px solid ${LIENZO.fgFaint}22` : "none",
          }}>
            <div style={{ fontSize: 12, color: LIENZO.fgFaint, letterSpacing: 1.5, textTransform: "uppercase" }}>
              Pregunta {i + 1}
            </div>
            <div style={{
              fontSize: "clamp(20px, 3.5vw, 28px)",
              fontFamily: "var(--font-crimson), serif",
              fontWeight: 500,
              color: LIENZO.fg,
            }}>
              {q.p}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {q.opciones.map((op, j) => {
                const ok = j === q.correcta;
                const elegidaEsta = elegida === j;
                let bg = "transparent";
                let bd = LIENZO.fgFaint;
                let color = LIENZO.fg;
                if (respondida) {
                  if (ok) { bg = `${LIENZO.ok}20`; bd = LIENZO.ok; color = LIENZO.ok; }
                  else if (elegidaEsta) { bg = `${LIENZO.bad}20`; bd = LIENZO.bad; color = LIENZO.bad; }
                  else { color = LIENZO.fgFaint; bd = `${LIENZO.fgFaint}55`; }
                }
                return (
                  <button
                    key={j}
                    onClick={() => !respondida && setRespuestas({ ...respuestas, [i]: j })}
                    disabled={respondida}
                    style={{
                      padding: "12px 14px",
                      background: bg,
                      border: `1px solid ${bd}`,
                      borderRadius: 10,
                      color,
                      fontSize: 17,
                      fontWeight: 600,
                      fontFamily: "var(--font-crimson), serif",
                      cursor: respondida ? "default" : "pointer",
                    }}
                  >
                    {op}
                    {respondida && ok && " ✓"}
                    {respondida && elegidaEsta && !ok && " ✗"}
                  </button>
                );
              })}
            </div>
            {respondida && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ fontSize: 14, lineHeight: 1.5, color: LIENZO.fgDim, marginTop: 4 }}
              >
                {q.explica}
              </motion.div>
            )}
          </div>
        );
      })}

      {completo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{
            padding: 24, borderRadius: 12,
            background: `${LIENZO.ok}15`,
            border: `1px solid ${LIENZO.ok}55`,
            textAlign: "center",
            display: "flex", flexDirection: "column", gap: 12,
          }}
        >
          <div style={{
            fontSize: "clamp(40px, 7vw, 56px)",
            fontFamily: "var(--font-crimson), serif",
            fontWeight: 500, color: LIENZO.ok,
          }}>
            {aciertos} / {PRACTICA.length}
          </div>
          <div style={{ color: LIENZO.fgDim, fontSize: 15 }}>
            {aciertos === PRACTICA.length && "Perfecto. Dominás las propiedades."}
            {aciertos >= 3 && aciertos < PRACTICA.length && "Bien. Repasá las que fallaste y volvé."}
            {aciertos < 3 && "Conviene volver a las escenas 3, 5 y 7 antes de practicar más."}
          </div>
          <Repetir onClick={resetear} />
        </motion.div>
      )}
    </Lienzo>
  );
}
