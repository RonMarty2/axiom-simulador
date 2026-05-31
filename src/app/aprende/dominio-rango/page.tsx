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
      unidad="04"
      tituloUnidad="Dominio, rango y gráfica"
      escenas={[
        { titulo: "¿Qué es el dominio?", componente: EscenaDominio },
        { titulo: "¿Qué es el rango?", componente: EscenaRango },
        { titulo: "Restricciones por división", componente: EscenaDivision },
        { titulo: "Restricciones por raíz par", componente: EscenaRaiz },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ESCENA 1 — Dominio: valores que x puede tomar
function EscenaDominio() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>dominio</strong> son todos los valores que <strong>x puede tomar</strong>:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={180}>
          <svg width={420} height={180}>
            <line x1={20} y1={90} x2={400} y2={90} stroke="var(--border)" strokeWidth={1} />
            <line x1={210} y1={20} x2={210} y2={170} stroke="var(--border)" strokeWidth={1} />

            {/* Función: recta f(x) = x */}
            <motion.line x1={60} y1={140} x2={360} y2={40}
              stroke={COLOR_OK} strokeWidth={3} strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
            />

            {/* Resaltado del dominio (eje x) */}
            <motion.line x1={60} y1={90} x2={360} y2={90}
              stroke={COLOR_EXP} strokeWidth={6}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.2 }}
            />

            <motion.text x={310} y={75} fontSize={12} fill={COLOR_EXP} fontWeight={800}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
              DOMINIO →
            </motion.text>
          </svg>
        </Stage>

        <div style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            Para f(x) = x: el dominio es <strong>todos los reales</strong> (cualquier x funciona) → Dom = ℝ
          </span>
        </div>
      </div>

      <p style={hint()}>El dominio se mira en el eje horizontal (los x que la función "acepta")</p>
    </div>
  );
}

// ESCENA 2 — Rango: valores que f(x) puede dar
function EscenaRango() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>rango</strong> son todos los valores que <strong>f(x) genera</strong>:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={200}>
          <svg width={420} height={200}>
            <line x1={20} y1={170} x2={400} y2={170} stroke="var(--border)" strokeWidth={1} />
            <line x1={210} y1={20} x2={210} y2={180} stroke="var(--border)" strokeWidth={1} />

            {/* Parábola y = x² (siempre ≥ 0) */}
            <motion.path d="M 90 30 Q 210 250 330 30"
              fill="none" stroke={COLOR_OK} strokeWidth={3} strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
            />

            {/* Resaltado del rango (eje y, solo desde 170 para arriba) */}
            <motion.line x1={210} y1={30} x2={210} y2={170}
              stroke={COLOR_EXP} strokeWidth={6}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.2 }}
            />

            <motion.text x={180} y={20} fontSize={12} fill={COLOR_EXP} fontWeight={800}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
              ↑ RANGO
            </motion.text>
          </svg>
        </Stage>

        <div style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            Para f(x) = x²: el rango es <strong>y ≥ 0</strong> (la parábola nunca baja debajo de 0)
          </span>
        </div>
      </div>

      <p style={hint()}>El rango se mira en el eje vertical (los y que la función "produce")</p>
    </div>
  );
}

// ESCENA 3 — División: el denominador no puede ser 0
function EscenaDivision() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Cuidado con la <strong>división</strong>: el denominador <em>nunca</em> puede ser 0:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: 420, minHeight: 160, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 28, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            f(x) = 1 / (x − 3)
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ fontSize: 14, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380, lineHeight: 1.5 }}>
            Si x = 3, el denominador es 0. ¡División por cero <strong style={{ color: COLOR_BAD }}>imposible</strong>!
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, type: "spring" }}
            style={{ fontSize: 20, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            Dom = ℝ − {`{3}`}
          </motion.div>
        </div>
      </div>

      <p style={hint()}>El dominio incluye todos los reales EXCEPTO los que anulan el denominador</p>
    </div>
  );
}

// ESCENA 4 — Raíz par: el radicando no puede ser negativo
function EscenaRaiz() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una <strong>raíz par</strong> no acepta números negativos adentro:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: 420, minHeight: 160, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 28, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, display: "flex", alignItems: "flex-start" }}>
            f(x) = <span style={{ fontSize: 40, fontWeight: 400 }}>√</span>
            <span style={{ borderTop: `2px solid ${COLOR_BASE}`, paddingTop: 4, marginTop: 3, marginLeft: -2 }}>x − 2</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ fontSize: 14, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380, lineHeight: 1.5 }}>
            Necesitamos que x − 2 ≥ 0 → <strong style={{ color: COLOR_OK }}>x ≥ 2</strong>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, type: "spring" }}
            style={{ fontSize: 20, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            Dom = [2, +∞)
          </motion.div>
        </div>
      </div>

      <p style={hint()}>El radicando debe ser ≥ 0 — eso define el dominio</p>
    </div>
  );
}

// ESCENA 5 — Mini-reto
// Dominio de f(x) = 1/(x+5) → x ≠ −5
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "x ≠ −5", correcta: true },
    { label: "x ≠ 5", correcta: false },
    { label: "x ≥ −5", correcta: false },
    { label: "Todos los reales", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>¿Cuál es el dominio de f(x) = 1 / (x + 5)?</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 40px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 32, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        f(x) = 1 / (x + 5)
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
                fontSize: 20, fontWeight: 700, color: COLOR_BASE,
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> El denominador x+5 se anula cuando x = −5. Hay que excluir ese valor: <strong>x ≠ −5</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Buscá qué valor anula el denominador: x+5 = 0 → x = −5. Se excluye → dominio = <strong>x ≠ −5</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
