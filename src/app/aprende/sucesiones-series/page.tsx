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
      unidad="11"
      tituloUnidad="Progresiones aritméticas y geométricas"
      escenas={[
        { titulo: "Sucesión aritmética", componente: EscenaAritmetica },
        { titulo: "Suma de Gauss", componente: EscenaGauss },
        { titulo: "Sucesión geométrica", componente: EscenaGeometrica },
        { titulo: "Suma geométrica finita", componente: EscenaSumaGeom },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

function EscenaAritmetica() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>En una <strong>aritmética</strong> sumamos siempre la misma cantidad (la razón d):</p>

      <div onClick={() => setPaso((p) => p >= 2 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={420} h={170}>
          {/* Sucesión 3, 7, 11, 15, 19 con d=4 */}
          {[3, 7, 11, 15, 19].map((n, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: k * 0.15, type: "spring" }}
              style={{ position: "absolute", left: 30 + k * 75, top: 30, width: 50, height: 50, borderRadius: 12, background: COLOR_BASE, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
              {n}
            </motion.div>
          ))}
          {/* +d arrows */}
          {[0, 1, 2, 3].map((k) => (
            <motion.div key={`a${k}`}
              initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: k * 0.1 }}
              style={{ position: "absolute", left: 90 + k * 75, top: 90, fontSize: 14, color: COLOR_OK, fontWeight: 700 }}>
              +4
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 130, width: "100%", textAlign: "center", fontSize: 18, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            Término n: a<sub style={{ fontSize: 12 }}>n</sub> = a<sub style={{ fontSize: 12 }}>1</sub> + (n−1)·d
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Sucesión: 3, 7, 11, 15, 19…"}
        {paso === 1 && "Entre cada par se suma 4 (la razón d = 4)"}
        {paso === 2 && "El n-ésimo término: a_n = a_1 + (n−1)d"}
      </p>
    </div>
  );
}

function EscenaGauss() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Truco de Gauss: para sumar todos los términos, multiplicá el promedio por la cantidad:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={170}>
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            S<sub style={{ fontSize: 14 }}>n</sub> =
            <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1, verticalAlign: "middle", marginLeft: 8 }}>
              <span style={{ padding: "0 8px" }}>(a<sub style={{ fontSize: 12 }}>1</sub> + a<sub style={{ fontSize: 12 }}>n</sub>) · n</span>
              <span style={{ borderTop: "2px solid currentColor", width: "100%", marginTop: 3 }} />
              <span style={{ padding: "0 8px", marginTop: 3 }}>2</span>
            </span>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ position: "absolute", left: 0, top: 110, width: "100%", textAlign: "center", fontSize: 14, color: COLOR_OK, fontFamily: "var(--font-crimson), serif" }}>
            Ej: 1+2+3+…+100 = (1+100)·100/2 = 5050
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>Gauss niño resolvió esto en segundos en la escuela 🤓</p>
    </div>
  );
}

function EscenaGeometrica() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>En una <strong>geométrica</strong> multiplicamos por la misma razón (r) cada vez:</p>

      <div onClick={() => setPaso((p) => p >= 2 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={420} h={170}>
          {[2, 6, 18, 54, 162].map((n, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.15, type: "spring" }}
              style={{ position: "absolute", left: 20 + k * 78, top: 30, minWidth: 60, padding: "8px 10px", borderRadius: 12, background: COLOR_EXP, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: n > 100 ? 16 : 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
              {n}
            </motion.div>
          ))}
          {[0, 1, 2, 3].map((k) => (
            <motion.div key={`a${k}`}
              initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: k * 0.1 }}
              style={{ position: "absolute", left: 90 + k * 78, top: 90, fontSize: 14, color: COLOR_OK, fontWeight: 700 }}>
              ×3
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 130, width: "100%", textAlign: "center", fontSize: 18, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            Término n: a<sub style={{ fontSize: 12 }}>n</sub> = a<sub style={{ fontSize: 12 }}>1</sub> · r<sup style={{ fontSize: 12 }}>(n−1)</sup>
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Sucesión: 2, 6, 18, 54, 162…"}
        {paso === 1 && "Cada término es el anterior × 3 (razón r = 3)"}
        {paso === 2 && "El n-ésimo: a_n = a_1 · r^(n−1)"}
      </p>
    </div>
  );
}

function EscenaSumaGeom() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La suma de los primeros n términos de una geométrica:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={170}>
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            S<sub style={{ fontSize: 14 }}>n</sub> = a<sub style={{ fontSize: 12 }}>1</sub> ·
            <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1, verticalAlign: "middle", marginLeft: 8 }}>
              <span style={{ padding: "0 8px" }}>r<sup style={{ fontSize: 12 }}>n</sup> − 1</span>
              <span style={{ borderTop: "2px solid currentColor", width: "100%", marginTop: 3 }} />
              <span style={{ padding: "0 8px", marginTop: 3 }}>r − 1</span>
            </span>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ position: "absolute", left: 0, top: 110, width: "100%", textAlign: "center", fontSize: 14, color: COLOR_OK, fontFamily: "var(--font-crimson), serif" }}>
            Ej: 2 + 6 + 18 + 54 + 162 = 2·(3⁵ − 1)/(3 − 1) = 242
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>Cuando |r| &lt; 1 y n→∞ la suma converge a a₁/(1−r)</p>
    </div>
  );
}

function EscenaReto() {
  // Sucesión 5, 8, 11... cuál es el a_10? a_n = 5 + 3(n-1) → a_10 = 5 + 27 = 32
  const opciones = useMemo(() => [
    { label: "32", correcta: true },
    { label: "35", correcta: false },
    { label: "30", correcta: false },
    { label: "27", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>En la sucesión 5, 8, 11, 14, … ¿cuál es el término 10?</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 20px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 28, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        5, 8, 11, 14, …<br />
        <span style={{ fontSize: 18, color: "var(--fg-muted)" }}>a₁₀ = ?</span>
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Es aritmética con d=3. a₁₀ = 5 + 9·3 = <strong>32</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Aritmética con razón d=3. Fórmula: a_n = a_1 + (n−1)d → a₁₀ = 5 + 9·3 = <strong>32</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
