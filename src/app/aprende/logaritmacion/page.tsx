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
      unidad="10"
      tituloUnidad="Logaritmación"
      escenas={[
        { titulo: "¿Qué es un logaritmo?", componente: EscenaIntro },
        { titulo: "Propiedades clave", componente: EscenaProps },
        { titulo: "Cambio de base", componente: EscenaCambioBase },
        { titulo: "Ecuación logarítmica", componente: EscenaEcuacion },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

function EscenaIntro() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Un <strong>logaritmo</strong> pregunta: ¿a qué exponente elevo la base para obtener el número?</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={160}>
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 28, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            log<sub style={{ fontSize: 18, color: "#3b82f6" }}>2</sub>(8) = ?
          </div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 80, width: "100%", textAlign: "center", fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontStyle: "italic" }}>
            ¿A qué exponente elevo 2 para obtener 8?
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 120, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            log₂(8) = 3 (porque 2³ = 8)
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 2 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>log<sub>a</sub>(b) = c</strong> ⟺ <strong>a<sup>c</sup> = b</strong>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 log₂(8) — ¿qué exponente?"}
        {paso === 1 && "Pensamos: 2 elevado a... ¿qué da 8?"}
        {paso === 2 && "2³ = 8, entonces log₂(8) = 3"}
      </p>
    </div>
  );
}

function EscenaProps() {
  const props = [
    { f: "log(a · b) = log a + log b", color: COLOR_OK },
    { f: "log(a / b) = log a − log b", color: COLOR_EXP },
    { f: "log(a^n) = n · log a", color: "#3b82f6" },
    { f: "log_a(a) = 1   ·   log_a(1) = 0", color: "#f59e0b" },
  ];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Las 4 propiedades que hay que dominar:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: 10 }}>
          {props.map((p, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.2 }}
              style={{
                padding: "12px 18px", borderRadius: 12,
                background: "var(--bg-subtle)", border: `2px solid ${p.color}`,
                fontFamily: "var(--font-crimson), serif", fontWeight: 700, fontSize: 16, color: COLOR_BASE,
                textAlign: "center",
              }}>
              {p.f}
            </motion.div>
          ))}
        </div>
      </div>

      <p style={hint()}>El producto se convierte en suma, el cociente en resta — clave para simplificar</p>
    </div>
  );
}

function EscenaCambioBase() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Si la calculadora solo tiene log base 10, podés cambiar de base:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={160}>
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            log<sub style={{ fontSize: 16, color: COLOR_EXP }}>a</sub>(b) =
            <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1, verticalAlign: "middle", marginLeft: 8 }}>
              <span style={{ padding: "0 8px" }}>log b</span>
              <span style={{ borderTop: "2px solid currentColor", width: "100%", marginTop: 3 }} />
              <span style={{ padding: "0 8px", marginTop: 3 }}>log a</span>
            </span>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ position: "absolute", left: 0, top: 120, width: "100%", textAlign: "center", fontSize: 14, color: "var(--fg-muted)" }}>
            Ej: log₂(7) = log(7) / log(2) ≈ 0.845 / 0.301 ≈ 2.807
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>Funciona también con ln (logaritmo natural)</p>
    </div>
  );
}

function EscenaEcuacion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para resolver una ecuación logarítmica: <strong>llevá ambos lados a la forma log</strong>:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 180, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 22, color: COLOR_BASE }}>log₃(x) = 4</div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 16, color: COLOR_OK }}>
            Aplicamos la definición: x = 3⁴
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ fontSize: 26, color: COLOR_OK, fontWeight: 800 }}>
            x = 81 ✓
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 log₃(x) = 4 — ¿cuál es x?"}
        {paso === 1 && "Usamos la definición: 3⁴ = x"}
        {paso === 2 && "x = 81"}
      </p>
    </div>
  );
}

function EscenaReto() {
  // log₅(125) = 3
  const opciones = useMemo(() => [
    { label: "3", correcta: true },
    { label: "25", correcta: false },
    { label: "5", correcta: false },
    { label: "120", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>¿Cuánto vale el logaritmo?</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 20px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 32, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        log<sub style={{ fontSize: 22, color: COLOR_EXP }}>5</sub>(125) = ?
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> ¿A qué exponente elevo 5 para obtener 125? 5³ = 125, entonces log₅(125) = <strong>3</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Buscamos el exponente: 5? = 125. Como 5³ = 125 → log₅(125) = <strong>3</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
