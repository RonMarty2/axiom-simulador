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
      tituloUnidad="Función lineal y cuadrática"
      escenas={[
        { titulo: "¿Qué es una función?", componente: EscenaFuncion },
        { titulo: "Función lineal: la recta", componente: EscenaLineal },
        { titulo: "Pendiente: la inclinación", componente: EscenaPendiente },
        { titulo: "Función cuadrática: la parábola", componente: EscenaCuadratica },
        { titulo: "Vértice de la parábola", componente: EscenaVertice },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ESCENA 1 — ¿Qué es una función? Máquina input → output
function EscenaFuncion() {
  const [paso, setPaso] = useState(0);
  const valores = [
    { x: 2, fx: 5 },
    { x: 0, fx: 1 },
    { x: -1, fx: -1 },
    { x: 3, fx: 7 },
  ];
  const i = Math.min(paso, valores.length - 1);
  const v = valores[i];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una <strong>función</strong> es una máquina: le metés un x, escupe un f(x):</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, valores.length - 1))} style={cajaAnim()}>
        <Stage w={420} h={160}>

          {/* Input */}
          <AnimatePresence mode="wait">
            <motion.div key={`in-${i}`} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
              style={{ position: "absolute", left: 50, top: 60, fontSize: 50, color: COLOR_BASE, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
              {v.x}
            </motion.div>
          </AnimatePresence>

          {/* Flecha → */}
          <motion.span style={{ position: "absolute", left: 100, top: 70, fontSize: 40, color: COLOR_EXP }}>→</motion.span>

          {/* Caja-función */}
          <motion.div
            style={{
              position: "absolute", left: 140, top: 50, width: 130, height: 70,
              background: `linear-gradient(135deg, ${COLOR_EXP}, #6366f1)`,
              borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700,
              boxShadow: "var(--shadow-md)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.4, repeat: 0 }}
            key={`box-${i}`}
          >
            f(x) = 2x + 1
          </motion.div>

          {/* Flecha → */}
          <motion.span style={{ position: "absolute", left: 280, top: 70, fontSize: 40, color: COLOR_EXP }}>→</motion.span>

          {/* Output */}
          <AnimatePresence mode="wait">
            <motion.div key={`out-${i}`} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.15 }}
              style={{ position: "absolute", left: 330, top: 60, fontSize: 50, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
              {v.fx}
            </motion.div>
          </AnimatePresence>

          {/* Etiqueta abajo */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={`t-${i}`}
            style={{ position: "absolute", left: 0, bottom: 0, width: "100%", textAlign: "center", fontSize: 13, color: "var(--fg-muted)" }}>
            f({v.x}) = 2·({v.x}) + 1 = {v.fx}
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>👆 Tocá para probar otro x ({i + 1}/{valores.length})</p>
    </div>
  );
}

// ESCENA 2 — Función lineal en tabla + gráfica simple
function EscenaLineal() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La <strong>función lineal</strong> f(x) = mx + b dibuja una <strong>recta</strong>:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={200}>
          {/* Ejes */}
          <svg width={420} height={200} style={{ position: "absolute", left: 0, top: 0 }}>
            <line x1={20} y1={100} x2={400} y2={100} stroke="var(--border)" strokeWidth={1} />
            <line x1={210} y1={20} x2={210} y2={180} stroke="var(--border)" strokeWidth={1} />
            <text x={395} y={95} fontSize={11} fill="var(--fg-muted)">x</text>
            <text x={215} y={28} fontSize={11} fill="var(--fg-muted)">y</text>

            {/* Recta f(x) = x + 1 → pasa por (0,1) y (2,3) */}
            <motion.line x1={60} y1={170} x2={360} y2={30}
              stroke={COLOR_OK} strokeWidth={3} strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />

            {/* Puntos */}
            {[
              { x: 210, y: 80, label: "(0,1)" },
              { x: 270, y: 50, label: "(2,3)" },
            ].map((p, k) => (
              <g key={k}>
                <motion.circle cx={p.x} cy={p.y} r={5} fill={COLOR_EXP}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 + k * 0.2, type: "spring" }} />
                <motion.text x={p.x + 8} y={p.y - 8} fontSize={10} fill={COLOR_EXP} fontWeight={700}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 + k * 0.2 }}>
                  {p.label}
                </motion.text>
              </g>
            ))}

            {/* Etiqueta de la función */}
            <motion.text x={310} y={70} fontSize={14} fill={COLOR_OK} fontWeight={700}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
              f(x) = x + 1
            </motion.text>
          </svg>
        </Stage>

        <div style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>m</strong> = pendiente (qué tan inclinada) · <strong>b</strong> = ordenada al origen (dónde corta el eje y)
          </span>
        </div>
      </div>

      <p style={hint()}>Cada punto de la recta es un par (x, f(x)) que cumple la fórmula</p>
    </div>
  );
}

// ESCENA 3 — Pendiente: visualizar tres rectas con distinta m
function EscenaPendiente() {
  const [i, setI] = useState(0);
  const casos = [
    { m: 2, etiq: "m = 2 (sube empinada)", color: COLOR_OK, y1: 180, y2: 20 },
    { m: 0.5, etiq: "m = 0,5 (sube suave)", color: "#3b82f6", y1: 130, y2: 60 },
    { m: -1, etiq: "m = -1 (baja)", color: COLOR_BAD, y1: 30, y2: 170 },
  ];
  const c = casos[i];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La <strong>pendiente m</strong> dice cuánto sube (o baja) la recta:</p>

      <div onClick={() => setI((p) => (p + 1) % casos.length)} style={cajaAnim()}>
        <Stage w={420} h={200}>
          <svg width={420} height={200}>
            <line x1={20} y1={100} x2={400} y2={100} stroke="var(--border)" strokeWidth={1} />
            <line x1={210} y1={20} x2={210} y2={180} stroke="var(--border)" strokeWidth={1} />

            <AnimatePresence mode="wait">
              <motion.line key={i} x1={50} y1={c.y1} x2={370} y2={c.y2}
                stroke={c.color} strokeWidth={4} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </svg>

          <AnimatePresence mode="wait">
            <motion.div key={`l-${i}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                position: "absolute", left: 0, bottom: 0, width: "100%", textAlign: "center",
                fontSize: 18, color: c.color, fontWeight: 800, fontFamily: "var(--font-crimson), serif",
              }}>
              {c.etiq}
            </motion.div>
          </AnimatePresence>
        </Stage>
      </div>

      <p style={hint()}>👆 Tocá para ver otra pendiente ({i + 1}/{casos.length})</p>
    </div>
  );
}

// ESCENA 4 — Función cuadrática: parábola y = x²
function EscenaCuadratica() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La <strong>función cuadrática</strong> f(x) = ax² + bx + c dibuja una <strong>parábola</strong>:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={200}>
          <svg width={420} height={200}>
            <line x1={20} y1={170} x2={400} y2={170} stroke="var(--border)" strokeWidth={1} />
            <line x1={210} y1={20} x2={210} y2={180} stroke="var(--border)" strokeWidth={1} />

            {/* Parábola y = x²/4 + ajuste para que se vea bien */}
            <motion.path
              d="M 90 30 Q 210 250 330 30"
              fill="none" stroke={COLOR_OK} strokeWidth={3} strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />

            {/* Vértice */}
            <motion.circle cx={210} cy={170} r={6} fill={COLOR_EXP}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }} />
            <motion.text x={220} y={185} fontSize={11} fill={COLOR_EXP} fontWeight={700}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>
              vértice (0, 0)
            </motion.text>

            <motion.text x={300} y={60} fontSize={14} fill={COLOR_OK} fontWeight={700}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
              f(x) = x²
            </motion.text>
          </svg>
        </Stage>

        <div style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            Si <strong>a &gt; 0</strong>: abre hacia arriba · si <strong>a &lt; 0</strong>: abre hacia abajo
          </span>
        </div>
      </div>

      <p style={hint()}>La parábola siempre tiene un punto extremo: el vértice</p>
    </div>
  );
}

// ESCENA 5 — Vértice de la parábola
function EscenaVertice() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>vértice</strong> tiene una fórmula directa:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: 420, minHeight: 160, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            x<sub style={{ fontSize: 14 }}>v</sub> = −b / (2a)
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ fontSize: 14, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380, lineHeight: 1.5 }}>
            Después calculás f(x<sub>v</sub>) sustituyendo en la función.
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.0, type: "spring" }}
            style={{ fontSize: 16, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 700, textAlign: "center" }}>
            Ej.: f(x) = x² − 4x + 3 → x<sub>v</sub> = 4/2 = 2 → f(2) = −1<br />
            Vértice: (2, −1)
          </motion.div>
        </div>
      </div>

      <p style={hint()}>El vértice es donde la parábola cambia de bajar a subir (o viceversa)</p>
    </div>
  );
}

// ESCENA 6 — Mini-reto
function EscenaReto() {
  // f(x) = 3x − 2. f(4) = 12 − 2 = 10
  const opciones = useMemo(() => [
    { label: "10", correcta: true },
    { label: "14", correcta: false },
    { label: "12", correcta: false },
    { label: "6", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Si f(x) = 3x − 2, ¿cuánto vale f(4)?</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 40px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 32, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        f(4) = 3·4 − 2 = ?
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
                fontSize: 24, fontWeight: 700, color: COLOR_BASE,
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Sustituís x=4: f(4) = 3·4 − 2 = 12 − 2 = <strong>10</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Sustituí x=4: 3·4 = 12, después restás 2 → <strong>10</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
