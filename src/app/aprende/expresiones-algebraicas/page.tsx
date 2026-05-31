"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  escenaWrap, subtitulo, hint, numGrande, cajaAnim, cajitaFormula, Stage,
} from "../_components/atoms";

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="Expresiones algebraicas"
      escenas={[
        { titulo: "Anatomía de un término", componente: EscenaTermino },
        { titulo: "Términos semejantes", componente: EscenaSemejantes },
        { titulo: "Suma y resta (reducción)", componente: EscenaSumaResta },
        { titulo: "Multiplicación: FOIL", componente: EscenaFOIL },
        { titulo: "Productos notables", componente: EscenaNotables },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ESCENA 1 — Anatomía de un término
function EscenaTermino() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Cada <strong>término</strong> tiene un coeficiente, una parte literal y un exponente:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={380} h={200}>
          {/* 5x² central */}
          <div style={{ position: "absolute", left: 0, top: 50, width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ ...numGrande("#3b82f6", 80) }}>5</motion.span>
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ ...numGrande(COLOR_BASE, 80), fontStyle: "italic" }}>x</motion.span>
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ fontSize: 40, color: COLOR_EXP, fontWeight: 700, fontFamily: "var(--font-crimson), serif", marginLeft: 2 }}>2</motion.span>
          </div>

          {/* Etiquetas */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ position: "absolute", left: 60, top: 150, fontSize: 11, color: "#3b82f6", fontWeight: 800, letterSpacing: 1 }}>
            ↑ COEFICIENTE
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            style={{ position: "absolute", left: 180, top: 150, fontSize: 11, color: COLOR_BASE, fontWeight: 800, letterSpacing: 1 }}>
            ↑ PARTE LITERAL
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={{ position: "absolute", right: 60, top: 0, fontSize: 11, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1 }}>
            EXPONENTE ↓
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>El coeficiente multiplica, la parte literal es la variable, el exponente la potencia</p>
    </div>
  );
}

// ESCENA 2 — Términos semejantes
function EscenaSemejantes() {
  const [i, setI] = useState(0);
  const casos = [
    { a: "3x", b: "5x", si: true, motivo: "Misma parte literal (x)" },
    { a: "2x", b: "2y", si: false, motivo: "Distinta parte literal (x vs y)" },
    { a: "4x²", b: "x²", si: true, motivo: "Mismo x² (los coeficientes pueden diferir)" },
    { a: "5x", b: "5x²", si: false, motivo: "Distinto exponente (x vs x²)" },
  ];
  const c = casos[i];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Dos términos son <strong>semejantes</strong> si tienen la misma parte literal con el mismo exponente:</p>

      <div onClick={() => setI((p) => (p + 1) % casos.length)} style={cajaAnim()}>
        <div style={{ minHeight: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 36, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}>
              <span dangerouslySetInnerHTML={{ __html: renderExpr(c.a) }} />
              <span style={{ color: COLOR_EXP, fontSize: 28 }}>y</span>
              <span dangerouslySetInnerHTML={{ __html: renderExpr(c.b) }} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={`b-${i}`} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                padding: "10px 18px", borderRadius: 12,
                background: c.si ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "linear-gradient(135deg, #fee2e2, #fecaca)",
                border: `1.5px solid ${c.si ? COLOR_OK : COLOR_BAD}`,
                fontSize: 14, fontWeight: 800, color: c.si ? "#065f46" : "#7f1d1d",
              }}>
              {c.si ? "✓ Semejantes" : "✗ No semejantes"} — {c.motivo}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p style={hint()}>👆 Tocá para ver otro ejemplo ({i + 1}/{casos.length})</p>
    </div>
  );
}

function renderExpr(s: string): string {
  return s.replace(/(\d+)/g, '<span style="color:#3b82f6">$1</span>')
    .replace(/([xy])/g, '<span style="font-style:italic">$1</span>')
    .replace(/²/g, '<sup style="color:#8b5cf6;font-size:0.65em">2</sup>');
}

// ESCENA 3 — Suma y resta (reducción)
// 3x + 5x = 8x. Los coeficientes se suman, la x queda.
function EscenaSumaResta() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Sumar/restar términos semejantes: se suman los <strong>coeficientes</strong>, la parte literal queda:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={380} h={140}>

          {/* 3x */}
          <motion.span style={{ position: "absolute", ...numGrande("#3b82f6", 50) }}
            initial={{ left: 60, top: 50 }}
            animate={
              paso === 0 ? { left: 60, top: 50, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 160, top: 0, opacity: 1, scale: 1.2 } :
              paso === 2 ? { left: 200, top: 50, opacity: 0, scale: 1.4 } :
              { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 180 }}>3</motion.span>
          <motion.span style={{ position: "absolute", left: 95, top: 50, ...numGrande(COLOR_BASE, 50), fontStyle: "italic" }}
            animate={paso >= 3 ? { left: 240, top: 50 } : { left: 95, top: 50 }}>x</motion.span>

          {/* + */}
          <motion.span style={{ position: "absolute", left: 135, top: 65, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso === 2 ? { left: 215, top: 0, opacity: 1 } : paso < 2 ? { left: 135, top: 65, opacity: 1 } : { opacity: 0 }}>+</motion.span>

          {/* 5x */}
          <motion.span style={{ position: "absolute", ...numGrande("#3b82f6", 50) }}
            initial={{ left: 175, top: 50 }}
            animate={
              paso === 0 ? { left: 175, top: 50, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 245, top: 0, opacity: 1, scale: 1.2 } :
              paso === 2 ? { left: 200, top: 50, opacity: 0, scale: 1.4 } :
              { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 180, delay: 0.05 }}>5</motion.span>
          <motion.span style={{ position: "absolute", left: 210, top: 50, ...numGrande(COLOR_BASE, 50), fontStyle: "italic" }}
            animate={paso >= 3 ? { left: 240, top: 50, opacity: 0, scale: 0 } : { left: 210, top: 50, opacity: 1, scale: 1 }}>x</motion.span>

          {/* Resultado 8 */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_OK, 50) }}
            initial={{ left: 200, top: 0, opacity: 0, scale: 0 }}
            animate={
              paso === 2 ? { left: 200, top: 0, opacity: 1, scale: [0, 1.4, 1] } :
              paso >= 3 ? { left: 200, top: 50, opacity: 1, scale: 1, color: "#3b82f6" } :
              { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 180, delay: paso === 2 ? 0.3 : 0 }}>8</motion.span>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            a·x + b·x = (a + b)·x — la x no se toca
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Sumar 3x + 5x"}
        {paso === 1 && "Los coeficientes 3 y 5 se preparan para sumarse"}
        {paso === 2 && "3 + 5 = 8"}
        {paso === 3 && "La x queda → 8x ✓"}
      </p>
    </div>
  );
}

// ESCENA 4 — FOIL: (x+2)(x+3)
function EscenaFOIL() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para multiplicar <strong>(x+2)(x+3)</strong>, usamos FOIL: cada término del primero × cada uno del segundo:</p>

      <div onClick={() => setPaso((p) => p >= 4 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={420} h={180}>
          {/* (x+2)(x+3) */}
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", textAlign: "center", fontSize: 28, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            (<span style={{ fontStyle: "italic" }}>x</span>+2)(<span style={{ fontStyle: "italic" }}>x</span>+3)
          </div>

          {/* 4 multiplicaciones que aparecen secuencialmente */}
          {[
            { txt: "x · x = x²", color: "#3b82f6" },
            { txt: "x · 3 = 3x", color: "#10b981" },
            { txt: "2 · x = 2x", color: "#f59e0b" },
            { txt: "2 · 3 = 6", color: "#8b5cf6" },
          ].map((item, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, x: -10 }}
              animate={paso >= k + 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              style={{
                position: "absolute", left: 40 + (k % 2) * 180, top: 60 + Math.floor(k / 2) * 35,
                fontSize: 18, color: item.color, fontWeight: 800, fontFamily: "var(--font-crimson), serif",
              }}
            >
              {item.txt}
            </motion.div>
          ))}

          {/* Resultado final */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={paso >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{ position: "absolute", left: 0, bottom: 0, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}
          >
            = x² + 5x + 6
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Cada uno del primer paréntesis × cada uno del segundo (4 productos)"}
        {paso === 1 && "x · x = x² (Primero · Primero)"}
        {paso === 2 && "x · 3 = 3x (Primero · último Externo)"}
        {paso === 3 && "2 · x = 2x (último Interior · Primero)"}
        {paso === 4 && "2 · 3 = 6. Y juntamos 3x + 2x = 5x → x²+5x+6"}
      </p>
    </div>
  );
}

// ESCENA 5 — Productos notables (cuadrado de un binomio)
// (a+b)² = a² + 2ab + b²
function EscenaNotables() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>cuadrado de un binomio</strong> tiene un patrón fijo:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={420} h={170}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", textAlign: "center", fontSize: 30, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <span>(a + b)</span>
            <span style={{ fontSize: 20, color: COLOR_EXP }}>2</span>
          </div>
          <motion.span style={{ position: "absolute", left: 0, top: 50, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}>=</motion.span>

          {/* a² */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            style={{ position: "absolute", left: 80, top: 90, fontSize: 30, color: "#3b82f6", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}
          >
            a<sup style={{ fontSize: 18, color: COLOR_EXP }}>2</sup>
          </motion.div>
          {/* + 2ab */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 0.1 }}
            style={{ position: "absolute", left: 160, top: 90, fontSize: 30, color: "#10b981", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}
          >
            + 2ab
          </motion.div>
          {/* + b² */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 0.2 }}
            style={{ position: "absolute", left: 280, top: 90, fontSize: 30, color: "#f59e0b", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}
          >
            + b<sup style={{ fontSize: 18, color: COLOR_EXP }}>2</sup>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 13, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 También: (a − b)² = a² − 2ab + b² · y · (a+b)(a−b) = a² − b²
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 (a+b)²"}
        {paso === 1 && "Cuadrado del primero: a²"}
        {paso === 2 && "Doble producto: 2ab"}
        {paso === 3 && "Cuadrado del segundo: b² ✓"}
      </p>
    </div>
  );
}

// ESCENA 6 — Mini-reto
// Reducir: 4x + 3 − 2x + 7 = 2x + 10
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "2x + 10", correcta: true },
    { label: "6x + 10", correcta: false },
    { label: "2x + 4", correcta: false },
    { label: "12x", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Reducí términos semejantes:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 40px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 30, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        4x + 3 − 2x + 7 = ?
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Agrupamos las x: 4x − 2x = 2x. Constantes: 3 + 7 = 10. → <strong>2x + 10</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Solo se reducen términos semejantes. Las x con las x (4−2 = 2x), los números con los números (3+7 = 10). → <strong>2x + 10</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
