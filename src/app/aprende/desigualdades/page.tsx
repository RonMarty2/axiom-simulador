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
      unidad="09"
      tituloUnidad="Desigualdades e inecuaciones"
      escenas={[
        { titulo: "Igual vs. menor/mayor", componente: EscenaIntro },
        { titulo: "Resolver una inecuación lineal", componente: EscenaLineal },
        { titulo: "El truco del signo negativo", componente: EscenaSigno },
        { titulo: "Inecuación cuadrática", componente: EscenaCuad },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

function EscenaIntro() {
  const sim = [
    { sym: "<", txt: "menor que", color: COLOR_EXP },
    { sym: ">", txt: "mayor que", color: COLOR_OK },
    { sym: "≤", txt: "menor o igual", color: "#3b82f6" },
    { sym: "≥", txt: "mayor o igual", color: "#f59e0b" },
  ];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una <strong>inecuación</strong> usa &lt;, &gt;, ≤ o ≥ en lugar de =:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 140, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {sim.map((s, k) => (
            <motion.div key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.15, type: "spring" }}
              style={{
                padding: "12px 16px", borderRadius: 12, background: "var(--bg-subtle)",
                border: `1.5px solid ${s.color}`, display: "flex", alignItems: "center", gap: 14,
              }}>
              <span style={{ fontSize: 32, color: s.color, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>{s.sym}</span>
              <span style={{ fontSize: 13, color: COLOR_BASE, fontWeight: 700 }}>{s.txt}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <p style={hint()}>Se resuelven casi igual que ecuaciones, con UN truco importante</p>
    </div>
  );
}

function EscenaLineal() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Igual que una ecuación: pasamos términos y despejamos:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 180, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 24, color: COLOR_BASE }}>2x + 3 &lt; 11</div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 22, color: COLOR_BASE }}>
            2x &lt; 11 − 3 → 2x &lt; 8
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ fontSize: 26, color: COLOR_OK, fontWeight: 800 }}>
            x &lt; 4 ✓
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: 14, color: "var(--fg-muted)" }}>
            La solución es todo número &lt; 4 (infinitos valores)
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 2x + 3 < 11"}
        {paso === 1 && "Pasamos +3 como −3 (igual que en ecuaciones)"}
        {paso === 2 && "Dividimos por 2 → x < 4. ¡Todos los menores que 4!"}
      </p>
    </div>
  );
}

function EscenaSigno() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>⚠️ Cuando multiplicás o dividís por un <strong>número negativo</strong>… el signo se INVIERTE:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 180, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 24, color: COLOR_BASE }}>−2x &lt; 6</div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 16, color: COLOR_BAD, textAlign: "center" }}>
            Dividir por <strong>−2</strong>: el &lt; se vuelve &gt;
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ fontSize: 26, color: COLOR_OK, fontWeight: 800 }}>
            x &gt; −3 ✓
          </motion.div>
        </div>

        <motion.div animate={{ opacity: paso >= 2 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 13, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 Si dividís o multiplicás por &lt;0 → INVERTÍ &lt; ↔ &gt; (y ≤ ↔ ≥)
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 −2x < 6"}
        {paso === 1 && "OJO: dividir por −2 cambia el sentido"}
        {paso === 2 && "x > −3 (¡con > en lugar de <!)"}
      </p>
    </div>
  );
}

function EscenaCuad() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para una <strong>cuadrática</strong>: factorizá y analizá los signos de cada factor:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 22, color: COLOR_BASE }}>x² − x − 6 &gt; 0</div>
          <div style={{ fontSize: 18, color: COLOR_BASE }}>Factorizamos: (x − 3)(x + 2) &gt; 0</div>
          <div style={{ fontSize: 14, color: COLOR_OK }}>Las raíces (puntos críticos) son x = 3 y x = −2</div>

          {/* Recta numérica */}
          <Stage w={380} h={60}>
            <div style={{ position: "absolute", left: 20, top: 28, right: 20, height: 2, background: COLOR_BASE }} />
            <div style={{ position: "absolute", left: 100, top: 22, width: 12, height: 12, borderRadius: "50%", background: COLOR_BAD }} />
            <div style={{ position: "absolute", left: 90, top: 36, fontSize: 12, color: COLOR_BAD, fontWeight: 700 }}>−2</div>
            <div style={{ position: "absolute", left: 260, top: 22, width: 12, height: 12, borderRadius: "50%", background: COLOR_BAD }} />
            <div style={{ position: "absolute", left: 256, top: 36, fontSize: 12, color: COLOR_BAD, fontWeight: 700 }}>3</div>
            <div style={{ position: "absolute", left: 30, top: 4, fontSize: 14, color: COLOR_OK, fontWeight: 800 }}>+</div>
            <div style={{ position: "absolute", left: 180, top: 4, fontSize: 14, color: COLOR_BAD, fontWeight: 800 }}>−</div>
            <div style={{ position: "absolute", left: 330, top: 4, fontSize: 14, color: COLOR_OK, fontWeight: 800 }}>+</div>
          </Stage>

          <div style={{ fontSize: 18, color: COLOR_OK, fontWeight: 800, textAlign: "center" }}>
            Solución: x &lt; −2 ó x &gt; 3
          </div>
        </div>
      </div>

      <p style={hint()}>El producto es positivo cuando ambos factores tienen el mismo signo</p>
    </div>
  );
}

function EscenaReto() {
  // 3x - 9 > 0 → x > 3
  const opciones = useMemo(() => [
    { label: "x > 3", correcta: true },
    { label: "x < 3", correcta: false },
    { label: "x > 9", correcta: false },
    { label: "x < −3", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Resolvé la inecuación:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 20px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 30, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        3x − 9 &gt; 0
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
                fontSize: 22, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif",
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> 3x &gt; 9 → x &gt; 3. Dividimos por +3, así que el signo NO se invierte.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> 3x − 9 &gt; 0 → 3x &gt; 9 → x &gt; <strong>3</strong>. Dividimos por +3, no se invierte.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
