"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  escenaWrap, subtitulo, hint, cajaAnim, cajitaFormula, Stage,
} from "../_components/atoms";

export default function Page() {
  return (
    <LeccionShell
      unidad="08"
      tituloUnidad="Ecuaciones de segundo grado"
      escenas={[
        { titulo: "Forma estándar", componente: EscenaForma },
        { titulo: "Método: factorización", componente: EscenaFactorizacion },
        { titulo: "Fórmula cuadrática", componente: EscenaFormula },
        { titulo: "El discriminante", componente: EscenaDiscriminante },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

function EscenaForma() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una ecuación de segundo grado tiene la forma:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={170}>
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 36, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span style={{ color: "#3b82f6" }}>a</span>
            <span style={{ fontStyle: "italic" }}>x</span><sup style={{ fontSize: 22, color: COLOR_EXP }}>2</sup>
            <span> + </span>
            <span style={{ color: "#10b981" }}>b</span>
            <span style={{ fontStyle: "italic" }}>x</span>
            <span> + </span>
            <span style={{ color: "#f59e0b" }}>c</span>
            <span> = 0</span>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ position: "absolute", left: 0, top: 90, width: "100%", textAlign: "center", fontSize: 14, color: "var(--fg-muted)" }}>
            <strong style={{ color: "#3b82f6" }}>a</strong> ≠ 0 (si no, no es cuadrática)
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            style={{ position: "absolute", left: 0, top: 120, width: "100%", textAlign: "center", fontSize: 16, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
            Ej: 2x² + 5x − 3 = 0
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>Vamos a ver 2 métodos para resolverlas: factorización y la fórmula</p>
    </div>
  );
}

function EscenaFactorizacion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Si podemos <strong>factorizar</strong>: cada factor igualado a 0 da una solución:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 24, color: COLOR_BASE }}>x² − 5x + 6 = 0</div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 24, color: COLOR_OK }}>
            (x − 2)(x − 3) = 0
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 18, color: COLOR_BASE, textAlign: "center" }}>
            Un producto vale 0 si UNO de los factores es 0
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ fontSize: 22, color: COLOR_OK, fontWeight: 800, textAlign: "center" }}>
            x − 2 = 0 → x = 2<br />
            x − 3 = 0 → x = 3
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Factorizamos: dos números que sumen −5 y multipliquen 6 → −2 y −3"}
        {paso === 1 && "(x − 2)(x − 3) = 0"}
        {paso === 2 && "Si el producto es 0, alguno de los dos debe ser 0"}
        {paso === 3 && "Dos soluciones: x = 2 y x = 3"}
      </p>
    </div>
  );
}

function EscenaFormula() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La <strong>fórmula cuadrática</strong> sirve SIEMPRE:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={180}>
          {/* Fórmula */}
          <div style={{ position: "absolute", left: 0, top: 20, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            x = <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1, verticalAlign: "middle" }}>
              <span style={{ padding: "0 8px" }}>−b ± √(b² − 4ac)</span>
              <span style={{ borderTop: `2px solid currentColor`, width: "100%", marginTop: 4 }} />
              <span style={{ padding: "0 8px", marginTop: 4 }}>2a</span>
            </span>
          </div>

          {/* Aplicación */}
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 120, width: "100%", textAlign: "center", fontSize: 15, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            Para x² − 5x + 6: a=1, b=−5, c=6 → x = (5 ± 1)/2
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 150, width: "100%", textAlign: "center", fontSize: 18, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            x = 3 o x = 2 ✓
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Identificamos a, b, c y sustituimos"}
        {paso === 1 && "(5+1)/2 = 3, (5−1)/2 = 2"}
        {paso === 2 && "Las mismas soluciones que por factorización ✓"}
      </p>
    </div>
  );
}

function EscenaDiscriminante() {
  const [i, setI] = useState(0);
  const casos = [
    { d: "Δ > 0", txt: "Dos soluciones reales distintas", color: COLOR_OK, ej: "x² − 5x + 6 = 0 (Δ = 1)" },
    { d: "Δ = 0", txt: "Una solución (doble)", color: "#f59e0b", ej: "x² − 4x + 4 = 0 (Δ = 0)" },
    { d: "Δ < 0", txt: "Sin solución real", color: COLOR_BAD, ej: "x² + 1 = 0 (Δ = −4)" },
  ];
  const c = casos[i];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>discriminante</strong> Δ = b² − 4ac dice cuántas soluciones hay:</p>

      <div onClick={() => setI((p) => (p + 1) % casos.length)} style={cajaAnim()}>
        <div style={{ minHeight: 160, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring" }}
              style={{
                padding: "12px 24px", borderRadius: 14,
                background: `linear-gradient(135deg, ${c.color}33, ${c.color}66)`,
                border: `2px solid ${c.color}`, fontSize: 24, color: c.color, fontWeight: 800,
              }}>
              {c.d}: {c.txt}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={`e-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontSize: 14, color: "var(--fg-muted)" }}>
              {c.ej}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p style={hint()}>👆 Tocá para ver otro caso ({i + 1}/{casos.length})</p>
    </div>
  );
}

function EscenaReto() {
  // x² + 3x - 10 = 0 → (x+5)(x-2)=0 → x=-5 o x=2
  const opciones = useMemo(() => [
    { label: "x = 2 ó x = −5", correcta: true },
    { label: "x = −2 ó x = 5", correcta: false },
    { label: "x = 10 ó x = −3", correcta: false },
    { label: "x = 1 ó x = −10", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Resolvé la ecuación cuadrática:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 20px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 30, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        x² + 3x − 10 = 0
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginTop: 8 }}>
        {opciones.map((op, idx) => {
          const sel = elegida === idx;
          const reveal = elegida !== null;
          const isCorrecta = op.correcta;
          return (
            <motion.button key={idx}
              whileHover={!reveal ? { scale: 1.02, y: -2 } : {}}
              whileTap={!reveal ? { scale: 0.98 } : {}}
              onClick={() => elegida === null && setElegida(idx)}
              disabled={reveal}
              style={{
                padding: "16px 14px",
                background: !reveal ? "var(--bg-card)"
                  : isCorrecta ? "linear-gradient(135deg, #d1fae5, #a7f3d0)"
                  : sel ? "linear-gradient(135deg, #fee2e2, #fecaca)"
                  : "var(--bg-card)",
                border: `2px solid ${!reveal ? "var(--border)" : isCorrecta ? COLOR_OK : sel ? COLOR_BAD : "var(--border)"}`,
                borderRadius: 14, cursor: reveal ? "default" : "pointer",
                fontSize: 20, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif",
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Factorizamos: (x+5)(x−2) = 0. Soluciones: <strong>x = 2 ó x = −5</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Buscamos dos números que sumen 3 y multipliquen −10: 5 y −2. Factorización: (x+5)(x−2) = 0 → x = −5 ó x = 2.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
