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
      unidad="07"
      tituloUnidad="Teoría de exponentes"
      escenas={[
        { titulo: "Repaso: las 5 reglas básicas", componente: EscenaRepaso },
        { titulo: "Exponente fraccionario", componente: EscenaFraccionario },
        { titulo: "Ecuación exponencial simple", componente: EscenaEcExpSimple },
        { titulo: "Mismo exponente, distinta base", componente: EscenaMismoExp },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

function EscenaRepaso() {
  const reglas = [
    { f: "a^m · a^n = a^(m+n)", ej: "2² · 2³ = 2⁵" },
    { f: "a^m / a^n = a^(m−n)", ej: "2⁵ / 2² = 2³" },
    { f: "(a^m)^n = a^(m·n)", ej: "(2³)² = 2⁶" },
    { f: "a^0 = 1", ej: "5⁰ = 1" },
    { f: "a^(−n) = 1/a^n", ej: "2⁻³ = 1/8" },
  ];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Las 5 reglas básicas, repasadas:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: "100%", maxWidth: 420, display: "grid", gridTemplateColumns: "1fr", gap: 8, fontFamily: "var(--font-crimson), serif" }}>
          {reglas.map((r, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.15 }}
              style={{
                padding: "10px 14px", borderRadius: 10, background: "var(--bg-subtle)",
                display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
              }}>
              <span style={{ fontSize: 15, color: COLOR_BASE, fontWeight: 700 }}>{r.f}</span>
              <span style={{ fontSize: 13, color: COLOR_OK, fontWeight: 700 }}>{r.ej}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <p style={hint()}>Esto ya lo viste en la Unidad 01 — ahora vamos más profundo</p>
    </div>
  );
}

function EscenaFraccionario() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Un exponente <strong>fraccionario</strong> es un radical disfrazado:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={160}>
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 28, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            a<sup style={{ fontSize: 18, color: COLOR_EXP }}>m/n</sup>
            <motion.span animate={paso >= 1 ? { opacity: 1, marginLeft: 14 } : { opacity: 0, marginLeft: 0 }}>
              = <sup style={{ fontSize: 14, color: COLOR_OK }}>n</sup>√a<sup style={{ fontSize: 14, color: COLOR_OK }}>m</sup>
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 90, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            Ej: 8<sup style={{ fontSize: 14 }}>2/3</sup> = ³√8² = ³√64 = 4
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 2 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 numerador → exponente del radicando · denominador → índice de la raíz
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 a^(m/n) se traduce a radical"}
        {paso === 1 && "El denominador n es el ÍNDICE de la raíz"}
        {paso === 2 && "Ejemplo: 8^(2/3) = ³√8² = 4 ✓"}
      </p>
    </div>
  );
}

function EscenaEcExpSimple() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para resolver 2<sup>x</sup> = 8: <strong>llevá a la misma base</strong> en ambos lados:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 180, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 28, color: COLOR_BASE }}>2<sup style={{ fontSize: 18, color: COLOR_EXP }}>x</sup> = 8</div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 22, color: COLOR_OK }}>
            Reescribimos 8 = 2³
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 24, color: COLOR_BASE }}>
            2<sup style={{ fontSize: 16, color: COLOR_EXP }}>x</sup> = 2<sup style={{ fontSize: 16, color: COLOR_OK }}>3</sup>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ fontSize: 26, color: COLOR_OK, fontWeight: 800 }}>
            x = 3 ✓
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 ¿Qué exponente le da 8 a la base 2?"}
        {paso === 1 && "Escribimos 8 en base 2: 8 = 2³"}
        {paso === 2 && "Misma base a ambos lados"}
        {paso === 3 && "Comparamos exponentes: x = 3"}
      </p>
    </div>
  );
}

function EscenaMismoExp() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Cuando varias bases tienen <strong>el mismo exponente</strong>, se puede juntar todo:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 160, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 22, color: COLOR_BASE }}>a<sup style={{ fontSize: 14, color: COLOR_EXP }}>n</sup> · b<sup style={{ fontSize: 14, color: COLOR_EXP }}>n</sup> = (a · b)<sup style={{ fontSize: 14, color: COLOR_OK }}>n</sup></div>
          <div style={{ fontSize: 22, color: COLOR_BASE }}>a<sup style={{ fontSize: 14, color: COLOR_EXP }}>n</sup> / b<sup style={{ fontSize: 14, color: COLOR_EXP }}>n</sup> = (a / b)<sup style={{ fontSize: 14, color: COLOR_OK }}>n</sup></div>
          <div style={{ fontSize: 16, color: COLOR_OK, marginTop: 6 }}>
            Ej: 2⁵ · 5⁵ = (2 · 5)⁵ = 10⁵ = 100 000
          </div>
        </div>
      </div>

      <p style={hint()}>Útil para simplificar expresiones grandes</p>
    </div>
  );
}

function EscenaReto() {
  // 3^(x+1) = 81 → 3^(x+1) = 3^4 → x = 3
  const opciones = useMemo(() => [
    { label: "x = 3", correcta: true },
    { label: "x = 4", correcta: false },
    { label: "x = 27", correcta: false },
    { label: "x = 80", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Resolvé la ecuación exponencial:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 20px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 32, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        3<sup style={{ fontSize: 22, color: COLOR_EXP }}>x+1</sup> = 81
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> 81 = 3⁴. Igualamos exponentes: x+1 = 4 → x = <strong>3</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Llevá 81 a base 3: 81 = 3⁴. Igualá exponentes: x+1 = 4 → x = <strong>3</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
