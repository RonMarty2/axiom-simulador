"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  escenaWrap, subtitulo, hint, cajaAnim, cajitaFormula,
} from "../_components/atoms";

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="MCD y MCM algebraicos"
      escenas={[
        { titulo: "Factorizar primero, siempre", componente: EscenaIntro },
        { titulo: "MCD algebraico", componente: EscenaMCD },
        { titulo: "MCM algebraico", componente: EscenaMCM },
        { titulo: "Aplicación: fracciones algebraicas", componente: EscenaAplicacion },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ESCENA 1 — Por qué hay que factorizar primero
function EscenaIntro() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para MCD y MCM algebraicos, primero <strong>factorizamos</strong> cada expresión:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: 420, minHeight: 170, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center" }}>

          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span>x² − 9</span>
            <span style={{ color: COLOR_OK, fontSize: 26 }}>→</span>
            <span style={{ color: COLOR_OK }}>(x+3)(x−3)</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span>x² + 6x + 9</span>
            <span style={{ color: COLOR_OK, fontSize: 26 }}>→</span>
            <span style={{ color: COLOR_OK }}>(x+3)²</span>
          </motion.div>
        </div>

        <div style={cajitaFormula()}>
          <span style={{ fontSize: 13, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 Una vez factorizado, los factores se tratan como "primos algebraicos"
          </span>
        </div>
      </div>

      <p style={hint()}>Igual que en el MCD/MCM numérico, ahora con factores literales</p>
    </div>
  );
}

// ESCENA 2 — MCD algebraico: factores comunes con MENOR exponente
function EscenaMCD() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>MCD</strong>: factores <strong>comunes</strong> con el <strong>MENOR</strong> exponente:</p>

      <div onClick={() => setPaso((p) => p >= 2 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ width: 420, minHeight: 180, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>

          <div style={{ fontSize: 22, color: COLOR_BASE }}>
            (x+3)<sup style={{ fontSize: 14, color: paso >= 1 ? COLOR_BAD : COLOR_EXP }}>2</sup>
            <span style={{ margin: "0 6px" }}>·</span>
            (x−1)<sup style={{ fontSize: 14, color: paso >= 1 ? COLOR_OK : COLOR_EXP }}>1</sup>
          </div>

          <div style={{ fontSize: 22, color: COLOR_BASE }}>
            (x+3)<sup style={{ fontSize: 14, color: paso >= 1 ? COLOR_OK : COLOR_EXP }}>1</sup>
            <span style={{ margin: "0 6px" }}>·</span>
            (x−1)<sup style={{ fontSize: 14, color: paso >= 1 ? COLOR_BAD : COLOR_EXP }}>3</sup>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ fontSize: 24, color: COLOR_OK, fontWeight: 800, marginTop: 10 }}>
            MCD = (x+3)<sup style={{ fontSize: 16 }}>1</sup> · (x−1)<sup style={{ fontSize: 16 }}>1</sup>
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Dos expresiones factorizadas. Buscamos los factores COMUNES"}
        {paso === 1 && "Comunes: (x+3) y (x−1). Tomamos el MENOR exponente de cada uno"}
        {paso === 2 && "MCD = (x+3)(x−1)"}
      </p>
    </div>
  );
}

// ESCENA 3 — MCM algebraico: TODOS los factores con MAYOR exponente
function EscenaMCM() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>MCM</strong>: <em>todos</em> los factores con el <strong>MAYOR</strong> exponente:</p>

      <div onClick={() => setPaso((p) => p >= 2 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ width: 420, minHeight: 180, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>

          <div style={{ fontSize: 22, color: COLOR_BASE }}>
            (x+3)<sup style={{ fontSize: 14, color: paso >= 1 ? COLOR_OK : COLOR_EXP }}>2</sup>
            <span style={{ margin: "0 6px" }}>·</span>
            (x−1)<sup style={{ fontSize: 14, color: paso >= 1 ? COLOR_BAD : COLOR_EXP }}>1</sup>
          </div>

          <div style={{ fontSize: 22, color: COLOR_BASE }}>
            (x+3)<sup style={{ fontSize: 14, color: paso >= 1 ? COLOR_BAD : COLOR_EXP }}>1</sup>
            <span style={{ margin: "0 6px" }}>·</span>
            (x−1)<sup style={{ fontSize: 14, color: paso >= 1 ? COLOR_OK : COLOR_EXP }}>3</sup>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ fontSize: 24, color: COLOR_OK, fontWeight: 800, marginTop: 10 }}>
            MCM = (x+3)<sup style={{ fontSize: 16 }}>2</sup> · (x−1)<sup style={{ fontSize: 16 }}>3</sup>
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Mismas expresiones de antes"}
        {paso === 1 && "Esta vez tomamos el MAYOR exponente de cada factor"}
        {paso === 2 && "MCM = (x+3)² (x−1)³"}
      </p>
    </div>
  );
}

// ESCENA 4 — Aplicación: suma de fracciones algebraicas con MCM
function EscenaAplicacion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El MCM sirve para sumar <strong>fracciones algebraicas</strong>:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ width: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>

          <div style={{ fontSize: 16, color: "var(--fg-muted)" }}>Sumar: 1/x + 1/(x+1)</div>

          <motion.div
            initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 14, color: COLOR_OK }}>
            MCM = x · (x+1)
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{ fontSize: 16, color: COLOR_BASE }}>
            = (x+1)/[x(x+1)] + x/[x(x+1)]
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{ fontSize: 20, color: COLOR_OK, fontWeight: 800 }}>
            = (2x + 1) / [x(x+1)]
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Sumar 1/x + 1/(x+1)"}
        {paso === 1 && "MCM de los denominadores: x(x+1)"}
        {paso === 2 && "Reescribimos cada fracción con el mismo denominador"}
        {paso === 3 && "Sumamos numeradores: (x+1) + x = 2x+1"}
      </p>
    </div>
  );
}

// ESCENA 5 — Mini-reto
function EscenaReto() {
  // MCD de x²(x−2) y x(x−2)³ → factores comunes con menor exponente: x¹ · (x−2)¹ = x(x−2)
  const opciones = useMemo(() => [
    { label: "x(x−2)", correcta: true },
    { label: "x²(x−2)³", correcta: false },
    { label: "x²(x−2)", correcta: false },
    { label: "(x−2)", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Encontrá el MCD de las dos expresiones:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "24px 30px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          textAlign: "center", fontFamily: "var(--font-crimson), serif",
        }}
      >
        <div style={{ fontSize: 22, color: COLOR_BASE, fontWeight: 700 }}>
          x²(x−2)
        </div>
        <div style={{ fontSize: 22, color: COLOR_BASE, fontWeight: 700, marginTop: 8 }}>
          x(x−2)³
        </div>
        <div style={{ fontSize: 24, color: "var(--fg-muted)", marginTop: 14 }}>
          MCD = ?
        </div>
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Factores comunes con menor exponente: x¹ · (x−2)¹ = <strong>x(x−2)</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> MCD = factores comunes con MENOR exponente. De x²/x¹ tomamos x¹. De (x−2)¹/(x−2)³ tomamos (x−2)¹. → <strong>x(x−2)</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
