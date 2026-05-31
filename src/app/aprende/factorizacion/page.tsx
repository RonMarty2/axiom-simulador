"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  escenaWrap, subtitulo, hint, numGrande, cajaAnim, cajitaFormula,
} from "../_components/atoms";

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="Factorización"
      escenas={[
        { titulo: "¿Qué es factorizar?", componente: EscenaIntro },
        { titulo: "Factor común", componente: EscenaFactorComun },
        { titulo: "Diferencia de cuadrados", componente: EscenaDifCuadrados },
        { titulo: "Trinomio cuadrado perfecto", componente: EscenaTCP },
        { titulo: "Trinomio x² + bx + c", componente: EscenaTrinomio },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ESCENA 1 — ¿Qué es factorizar? (lo opuesto a desarrollar)
function EscenaIntro() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Factorizar es el <strong>camino inverso</strong> de multiplicar:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ position: "relative", width: 420, minHeight: 160 }}>
          {/* DESARROLLAR (de izq a der) */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ position: "absolute", left: 0, top: 20, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 16, fontSize: 24, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span>(x + 2)(x + 3)</span>
            <span style={{ color: COLOR_OK, fontSize: 30 }}>→</span>
            <span>x² + 5x + 6</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ position: "absolute", left: 0, top: 55, width: "100%", textAlign: "center", fontSize: 12, color: COLOR_OK, fontWeight: 800, letterSpacing: 2 }}>
            DESARROLLAR
          </motion.div>

          {/* FACTORIZAR (de der a izq) */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}
            style={{ position: "absolute", left: 0, top: 100, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 16, fontSize: 24, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span>x² + 5x + 6</span>
            <span style={{ color: COLOR_EXP, fontSize: 30 }}>→</span>
            <span>(x + 2)(x + 3)</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={{ position: "absolute", left: 0, top: 135, width: "100%", textAlign: "center", fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 2 }}>
            FACTORIZAR
          </motion.div>
        </div>
      </div>

      <p style={hint()}>Factorizar es escribir un polinomio como producto de factores</p>
    </div>
  );
}

// ESCENA 2 — Factor común: 6x + 9 = 3(2x + 3)
function EscenaFactorComun() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Si hay un <strong>factor común</strong>, lo sacamos afuera de un paréntesis:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ position: "relative", width: 420, minHeight: 160, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center" }}>

          {/* 6x + 9 */}
          <motion.div animate={paso >= 1 ? { opacity: 0.4, scale: 0.85 } : { opacity: 1, scale: 1 }}
            style={{ fontSize: 30, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            6x + 9
          </motion.div>

          {/* Paso 1: ver el factor 3 */}
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 22, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            = <span style={{ color: COLOR_OK }}>3</span>·<span style={{ fontStyle: "italic" }}>2x</span> + <span style={{ color: COLOR_OK }}>3</span>·3
          </motion.div>

          {/* Paso 2: sacar el 3 */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{ fontSize: 28, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
            = 3(2x + 3)
          </motion.div>
        </div>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 13, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 Verificá distribuyendo: 3·2x + 3·3 = 6x + 9 ✓
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 6x + 9 — ¿hay algo común a los dos términos?"}
        {paso === 1 && "Sí: 6 = 3·2 y 9 = 3·3. Ambos tienen el 3"}
        {paso === 2 && "Sacamos el 3 común: 3·(2x + 3)"}
        {paso === 3 && "Listo: 6x + 9 = 3(2x + 3)"}
      </p>
    </div>
  );
}

// ESCENA 3 — Diferencia de cuadrados: a² − b² = (a+b)(a−b)
// Ejemplo: x² − 9 = (x+3)(x−3)
function EscenaDifCuadrados() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una <strong>diferencia de cuadrados</strong> se factoriza con un patrón mágico:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ position: "relative", width: 420, minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>

          {/* Patrón general */}
          <motion.div initial={{ opacity: 0 }} animate={paso >= 0 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            a<sup style={{ fontSize: 16, color: COLOR_EXP }}>2</sup> − b<sup style={{ fontSize: 16, color: COLOR_EXP }}>2</sup>
            <motion.span animate={paso >= 1 ? { opacity: 1, marginLeft: 14 } : { opacity: 0, marginLeft: 0 }}>
              = (a + b)(a − b)
            </motion.span>
          </motion.div>

          {/* Ejemplo: x² − 9 */}
          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 26, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span style={{ fontStyle: "italic" }}>x</span><sup style={{ fontSize: 16 }}>2</sup> − 9
            <motion.span animate={paso >= 3 ? { opacity: 1, marginLeft: 14 } : { opacity: 0, marginLeft: 0 }}>
              = (x + 3)(x − 3)
            </motion.span>
          </motion.div>
        </div>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 13, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 9 = 3² → b = 3. El término del medio (2ab) se cancela.
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 a² − b²"}
        {paso === 1 && "Patrón fijo: (suma)(diferencia)"}
        {paso === 2 && "Aplicado a x² − 9 (donde 9 = 3²)"}
        {paso === 3 && "Resultado: (x+3)(x−3) ✓"}
      </p>
    </div>
  );
}

// ESCENA 4 — Trinomio cuadrado perfecto: x² + 6x + 9 = (x+3)²
function EscenaTCP() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Si el término del medio es <strong>el doble del producto</strong>, es un TCP:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ position: "relative", width: 420, minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ fontSize: 28, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span style={{ fontStyle: "italic" }}>x</span><sup style={{ fontSize: 16, color: COLOR_EXP }}>2</sup> + 6x + 9
          </motion.div>

          {/* Verificación: √x² = x, √9 = 3, 2·x·3 = 6x ✓ */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ fontSize: 14, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380, lineHeight: 1.5 }}>
            √x² = x &nbsp;·&nbsp; √9 = 3 &nbsp;·&nbsp; 2·x·3 = <span style={{ color: COLOR_OK, fontWeight: 800 }}>6x</span> coincide con el término del medio ✓
          </motion.div>

          {/* Paso 2: forma factorizada (x+3)² */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{ fontSize: 30, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800, display: "flex", alignItems: "flex-start" }}>
            = (x + 3)<span style={{ fontSize: 20, color: COLOR_EXP, marginLeft: 2 }}>2</span>
          </motion.div>
        </div>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            a² + 2ab + b² = (a + b)²  &nbsp;·&nbsp;  a² − 2ab + b² = (a − b)²
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 x² + 6x + 9 — ¿será TCP?"}
        {paso === 1 && "Verificamos: 2·√x²·√9 = 6x ✓"}
        {paso === 2 && "Sí lo es: (x+3)²"}
        {paso === 3 && "Patrón clave para reconocer trinomios cuadrados"}
      </p>
    </div>
  );
}

// ESCENA 5 — Trinomio x² + bx + c (búsqueda de números)
// x² + 5x + 6 → buscar dos números que: suman 5 y multiplican 6 → 2 y 3 → (x+2)(x+3)
function EscenaTrinomio() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para x² + bx + c: buscamos dos números que <strong>sumen b</strong> y <strong>multipliquen c</strong>:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ position: "relative", width: 420, minHeight: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>

          <div style={{ fontSize: 28, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span style={{ fontStyle: "italic" }}>x</span><sup style={{ fontSize: 16, color: COLOR_EXP }}>2</sup> + <span style={{ color: "#3b82f6" }}>5</span>x + <span style={{ color: "#10b981" }}>6</span>
          </div>

          {/* Búsqueda de pares */}
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 14, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380, lineHeight: 1.6 }}>
            ¿Dos números que multiplicados den <strong style={{ color: "#10b981" }}>6</strong> y sumados den <strong style={{ color: "#3b82f6" }}>5</strong>?
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ display: "flex", gap: 20, fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span style={{ color: "var(--fg-muted)" }}>1 y 6 → suman 7 ✗</span>
            <span style={{ color: COLOR_OK }}>2 y 3 → suman 5 ✓</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{ fontSize: 28, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            = (x + 2)(x + 3)
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Factorizar x² + 5x + 6"}
        {paso === 1 && "Buscamos dos números que sumen 5 y multipliquen 6"}
        {paso === 2 && "Probamos pares: 2 y 3 funcionan (2+3=5 y 2·3=6)"}
        {paso === 3 && "Resultado: (x+2)(x+3) ✓"}
      </p>
    </div>
  );
}

// ESCENA 6 — Mini-reto: factorizar x² − 16
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "(x+4)(x−4)", correcta: true },
    { label: "(x−4)²", correcta: false },
    { label: "(x+8)(x−2)", correcta: false },
    { label: "x(x−16)", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Factorizá:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 40px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 34, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        <span style={{ fontStyle: "italic" }}>x</span><sup style={{ fontSize: 20, color: COLOR_EXP }}>2</sup> − 16 = ?
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
        {opciones.map((op, idx) => {
          const sel = elegida === idx;
          const reveal = elegida !== null;
          const isCorrecta = op.correcta;
          return (
            <motion.button key={idx}
              whileHover={!reveal ? { scale: 1.03, y: -2 } : {}}
              whileTap={!reveal ? { scale: 0.97 } : {}}
              onClick={() => elegida === null && setElegida(idx)}
              disabled={reveal}
              style={{
                padding: "18px 14px",
                background: !reveal ? "var(--bg-card)"
                  : isCorrecta ? "linear-gradient(135deg, #d1fae5, #a7f3d0)"
                  : sel ? "linear-gradient(135deg, #fee2e2, #fecaca)"
                  : "var(--bg-card)",
                border: `2px solid ${!reveal ? "var(--border)" : isCorrecta ? COLOR_OK : sel ? COLOR_BAD : "var(--border)"}`,
                borderRadius: 14, cursor: reveal ? "default" : "pointer",
                fontSize: 22, fontWeight: 700, color: COLOR_BASE,
                fontFamily: "var(--font-crimson), serif",
              }}
            >
              {op.label}
              {reveal && isCorrecta && <span style={{ marginLeft: 8, color: COLOR_OK }}>✓</span>}
              {reveal && sel && !isCorrecta && <span style={{ marginLeft: 8, color: COLOR_BAD }}>✗</span>}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {elegida !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{
              padding: 16, borderRadius: 14, marginTop: 6,
              background: opciones[elegida].correcta ? "#ecfdf5" : "#fef2f2",
              border: `1px solid ${opciones[elegida].correcta ? COLOR_OK : "#fca5a5"}`,
              fontSize: 14, color: "var(--fg-primary)",
            }}
          >
            {opciones[elegida].correcta ? (
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> x² − 16 es una diferencia de cuadrados (16 = 4²). Patrón a²−b² = (a+b)(a−b) → <strong>(x+4)(x−4)</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Es una diferencia de cuadrados: x² − 16 = x² − 4². Patrón: (a+b)(a−b) → <strong>(x+4)(x−4)</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
