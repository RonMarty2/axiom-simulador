"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  escenaWrap, subtitulo, hint, numGrande, cajaAnim, cajitaFormula, Stage,
} from "../_components/atoms";

// ─────────────────────────────────────────────────────────────────────────────
// Lección: Operaciones con radicales (Unidad 01)
// Semejantes, suma/resta, multiplicación, división.
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Operaciones con radicales"
      escenas={[
        { titulo: "Radicales semejantes", componente: EscenaSemejantes },
        { titulo: "Suma y resta de radicales", componente: EscenaSumaResta },
        { titulo: "Multiplicación de radicales", componente: EscenaMultiplicacion },
        { titulo: "División de radicales", componente: EscenaDivision },
        { titulo: "Simplificar antes de operar", componente: EscenaSimplificar },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// Componente reutilizable: radical √a con índice opcional
function Rad({ idx, rad, size = 36, color = COLOR_BASE, colorIdx = COLOR_EXP }: { idx?: string; rad: string; size?: number; color?: string; colorIdx?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start", marginRight: 4 }}>
      {idx && (
        <span style={{
          fontSize: Math.round(size * 0.42), color: colorIdx, fontWeight: 700,
          fontFamily: "var(--font-crimson), serif", marginRight: -3, marginTop: 2,
        }}>{idx}</span>
      )}
      <span style={{ fontSize: Math.round(size * 1.55), color, fontWeight: 400, lineHeight: 0.9 }}>√</span>
      <span style={{
        borderTop: `2px solid ${color}`, paddingTop: 3, marginTop: 4, marginLeft: -2,
      }}>
        <span style={{ fontSize: size, color, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>{rad}</span>
      </span>
    </span>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — Radicales semejantes
// Mismo índice + mismo radicando = semejantes
// ═════════════════════════════════════════════════════════════════════════════
function EscenaSemejantes() {
  const [paso, setPaso] = useState(0);
  const ejemplos = [
    { a: "3√2", b: "5√2", semejantes: true, motivo: "Mismo índice (2) y mismo radicando (2). ✓" },
    { a: "2√3", b: "2√5", semejantes: false, motivo: "Mismo índice pero distinto radicando (3 vs 5). ✗" },
    { a: "√7", b: "³√7", semejantes: false, motivo: "Mismo radicando pero distinto índice (2 vs 3). ✗" },
  ];
  const i = Math.min(paso, ejemplos.length - 1);
  const ej = ejemplos[i];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Dos radicales son <strong>semejantes</strong> si tienen el mismo índice y el mismo radicando:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, ejemplos.length - 1))} style={cajaAnim()}>
        <div style={{ minHeight: 140, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, fontFamily: "var(--font-crimson), serif", flexWrap: "wrap" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: 18 }}
            >
              <RenderRadical expr={ej.a} />
              <span style={{ fontSize: 30, color: COLOR_EXP, fontWeight: 700 }}>y</span>
              <RenderRadical expr={ej.b} />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          key={i + "_box"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "10px 18px", borderRadius: 12, marginTop: 8,
            background: ej.semejantes ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "linear-gradient(135deg, #fee2e2, #fecaca)",
            border: `1px solid ${ej.semejantes ? COLOR_OK : COLOR_BAD}`,
            fontSize: 15, fontWeight: 700, color: ej.semejantes ? "#065f46" : "#7f1d1d",
          }}
        >
          {ej.semejantes ? "✓ Semejantes" : "✗ No semejantes"} — <span style={{ fontWeight: 500 }}>{ej.motivo}</span>
        </motion.div>
      </div>

      <p style={hint()}>
        {i < ejemplos.length - 1 ? "👆 Tocá para ver otro ejemplo" : "Solo radicales semejantes se pueden sumar/restar"}
      </p>
    </div>
  );
}

// Helper: renderizar una expresión del tipo "3√2" o "²√5" o "³√7"
function RenderRadical({ expr }: { expr: string }) {
  const m = expr.match(/^(\d*)(?:([²³⁴⁵])?√)(.+)$/);
  if (!m) return <span>{expr}</span>;
  const coef = m[1] || "";
  const idxMap: Record<string, string> = { "²": "2", "³": "3", "⁴": "4", "⁵": "5" };
  const idx = m[2] ? idxMap[m[2]] : undefined;
  const rad = m[3];
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start", fontSize: 30, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}>
      {coef && <span style={{ marginRight: 4 }}>{coef}</span>}
      <Rad idx={idx} rad={rad} size={30} />
    </span>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — Suma y resta de radicales semejantes
// 3√2 + 5√2 = 8√2 (se suman los coeficientes, el radical queda igual)
// ═════════════════════════════════════════════════════════════════════════════
function EscenaSumaResta() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Si son semejantes, se suman los <strong>coeficientes</strong> y el radical no cambia:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={150}>

          {/* Coef 3 izq */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_BASE, 50) }}
            initial={{ left: 60, top: 50 }}
            animate={
              paso === 0 ? { left: 60, top: 50, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 160, top: 10, opacity: 1, scale: 1.2 } :
              paso === 2 ? { left: 200, top: 50, opacity: 0, scale: 1.4 } :
              paso >= 3 ? { left: 200, top: 50, opacity: 0, scale: 0 } : {}
            }
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >3</motion.span>

          {/* √2 izq */}
          <motion.div
            style={{ position: "absolute", left: 95, top: 55 }}
            animate={paso >= 3 ? { left: 240, top: 55 } : { left: 95, top: 55 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            <Rad rad="2" size={36} />
          </motion.div>

          {/* + */}
          <motion.span
            style={{ position: "absolute", left: 165, top: 65, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 2 ? { left: 215, top: 10, opacity: 1 } : { left: 165, top: 65, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180 }}
          >+</motion.span>

          {/* Coef 5 der */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_BASE, 50) }}
            initial={{ left: 210, top: 50 }}
            animate={
              paso === 0 ? { left: 210, top: 50, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 245, top: 10, opacity: 1, scale: 1.2 } :
              paso === 2 ? { left: 200, top: 50, opacity: 0, scale: 1.4 } :
              paso >= 3 ? { left: 200, top: 50, opacity: 0, scale: 0 } : {}
            }
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.05 }}
          >5</motion.span>

          {/* √2 der */}
          <motion.div
            style={{ position: "absolute", left: 245, top: 55 }}
            animate={paso >= 3 ? { left: 240, top: 55, opacity: 0, scale: 0 } : { left: 245, top: 55, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            <Rad rad="2" size={36} />
          </motion.div>

          {/* Resultado 8 (suma de coef) */}
          <motion.span
            style={{ position: "absolute", ...numGrande(COLOR_OK, 50) }}
            initial={{ left: 200, top: 10, opacity: 0, scale: 0 }}
            animate={
              paso === 2 ? { left: 200, top: 10, opacity: 1, scale: [0, 1.4, 1] } :
              paso >= 3 ? { left: 200, top: 50, opacity: 1, scale: 1, color: COLOR_BASE } :
              { left: 200, top: 10, opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 180, delay: paso === 2 ? 0.3 : 0 }}
          >8</motion.span>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            a√x + b√x = (a + b)√x — la raíz no se toca
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Sumar 3√2 + 5√2"}
        {paso === 1 && "Los coeficientes 3 y 5 se preparan para sumarse…"}
        {paso === 2 && "3 + 5 = 8 ✓"}
        {paso === 3 && "El radical √2 queda igual → 8√2"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — Multiplicación de radicales
// √a · √b = √(a·b) — los radicandos se juntan bajo una sola raíz
// ═════════════════════════════════════════════════════════════════════════════
function EscenaMultiplicacion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Multiplicar radicales del mismo índice: los radicandos se <strong>juntan</strong>:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={140}>

          {/* √3 izq */}
          <motion.div
            style={{ position: "absolute", left: 70, top: 50 }}
            animate={paso >= 2 ? { left: 200, top: 50, opacity: 0, scale: 0.8 } : { left: 70, top: 50, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180 }}
          >
            <Rad rad="3" size={40} />
          </motion.div>

          {/* · */}
          <motion.span
            style={{ position: "absolute", left: 130, top: 70, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 2 ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          >·</motion.span>

          {/* √5 der */}
          <motion.div
            style={{ position: "absolute", left: 160, top: 50 }}
            animate={paso >= 2 ? { left: 200, top: 50, opacity: 0, scale: 0.8 } : { left: 160, top: 50, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 180 }}
          >
            <Rad rad="5" size={40} />
          </motion.div>

          {/* "=" */}
          <motion.span
            style={{ position: "absolute", left: 230, top: 70, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
          >=</motion.span>

          {/* √(3·5) intermedio */}
          <motion.div
            style={{ position: "absolute", left: 270, top: 50 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              paso === 1 ? { left: 270, top: 50, opacity: 1, scale: 1 } :
              paso === 2 ? { left: 270, top: 50, opacity: 1, scale: 1.1 } :
              paso >= 3 ? { left: 270, top: 50, opacity: 0, scale: 0 } :
              { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 180, delay: paso === 1 ? 0.3 : 0 }}
          >
            <Rad rad="3·5" size={36} colorIdx={COLOR_OK} />
          </motion.div>

          {/* √15 final */}
          <motion.div
            style={{ position: "absolute", left: 280, top: 50 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={paso >= 3 ? { opacity: 1, scale: [0, 1.3, 1] } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Rad rad="15" size={40} color={COLOR_OK} />
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 1 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <Rad rad="a" size={18} /> · <Rad rad="b" size={18} /> = <Rad rad="a · b" size={18} color={COLOR_OK} />
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Multiplicar √3 · √5"}
        {paso === 1 && "Los radicandos se juntan bajo una sola raíz: √(3·5)"}
        {paso === 2 && "Operamos adentro: 3·5 = 15"}
        {paso === 3 && "Resultado: √15"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — División de radicales
// √a / √b = √(a/b)  — análoga al producto pero con fracción
// ═════════════════════════════════════════════════════════════════════════════
function EscenaDivision() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Dividir radicales del mismo índice: queda <strong>una sola raíz</strong> con la fracción adentro:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <div style={{ position: "relative", width: "100%", maxWidth: 420, height: 160, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>

          {/* Fracción √20 / √5 */}
          <motion.div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            animate={paso >= 1 ? { opacity: 0, x: -30, scale: 0.8 } : { opacity: 1 }}
          >
            <Rad rad="20" size={36} />
            <div style={{ borderTop: `2.5px solid ${COLOR_EXP}`, width: 80, margin: "6px 0" }} />
            <Rad rad="5" size={36} />
          </motion.div>

          {/* = */}
          <motion.span
            style={{ fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
          >=</motion.span>

          {/* √(20/5) intermedio */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={
              paso === 1 ? { opacity: 1, scale: 1 } :
              paso >= 2 ? { opacity: 0, scale: 0 } :
              { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", stiffness: 180, delay: paso === 1 ? 0.3 : 0 }}
            style={{ display: "inline-flex", alignItems: "flex-start" }}
          >
            <span style={{ fontSize: 80, color: COLOR_OK, fontWeight: 400, lineHeight: 0.6 }}>√</span>
            <div style={{ borderTop: `2.5px solid ${COLOR_OK}`, paddingTop: 6, marginTop: 4, marginLeft: -3 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ ...numGrande(COLOR_OK, 26) }}>20</span>
                <div style={{ borderTop: `1.5px solid ${COLOR_OK}`, width: "100%", margin: "2px 0" }} />
                <span style={{ ...numGrande(COLOR_OK, 26) }}>5</span>
              </div>
            </div>
          </motion.div>

          {/* √4 final */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={paso >= 2 ? { opacity: 1, scale: [0, 1.3, 1] } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Rad rad="4" size={40} color={COLOR_OK} />
          </motion.div>

          {/* "= 2" final */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={paso >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: 30, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}
          >
            = 2
          </motion.span>
        </div>

        <motion.div animate={{ opacity: paso >= 1 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <Rad rad="a" size={18} /> / <Rad rad="b" size={18} /> = <Rad rad="a / b" size={18} color={COLOR_OK} />
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Dividir √20 / √5"}
        {paso === 1 && "Los radicandos van bajo una sola raíz: √(20/5)"}
        {paso === 2 && "20/5 = 4, y √4 = 2 ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 5 — Simplificar antes de operar
// √8 + √2 → simplificamos √8 = 2√2 → 2√2 + √2 = 3√2
// ═════════════════════════════════════════════════════════════════════════════
function EscenaSimplificar() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>A veces parecen NO semejantes pero al simplificar SÍ lo son:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ position: "relative", minHeight: 160, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center" }}>

          {/* Línea 1: √8 + √2 */}
          <motion.div
            animate={paso >= 1 ? { opacity: 0.4, scale: 0.85 } : { opacity: 1, scale: 1 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Rad rad="8" size={34} />
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>+</span>
            <Rad rad="2" size={34} />
          </motion.div>

          {/* Línea 2: 2√2 + √2 (simplificado) */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ ...numGrande(COLOR_OK, 30) }}>2</span>
            <Rad rad="2" size={30} color={COLOR_BASE} />
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>+</span>
            <Rad rad="2" size={30} />
          </motion.div>

          {/* Anotación de "√8 = 2√2" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso === 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic" }}
          >
            (porque √8 = √(4·2) = 2√2)
          </motion.div>

          {/* Línea 3: 3√2 final */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700, marginRight: 6 }}>=</span>
            <span style={{ ...numGrande(COLOR_OK, 36) }}>3</span>
            <Rad rad="2" size={36} color={COLOR_OK} />
          </motion.div>
        </div>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 <strong>Siempre simplificá</strong> los radicales antes de sumar/restar
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 ¿√8 y √2 son semejantes? No parecen…"}
        {paso === 1 && "Pero √8 = √(4·2) = 2√2 (sale el 2 de la raíz)"}
        {paso === 2 && "Ahora SÍ son semejantes: 2√2 + √2"}
        {paso === 3 && "Sumamos coeficientes: 2 + 1 = 3 → 3√2 ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Mini-reto
// √12 + √27 — simplificar: 2√3 + 3√3 = 5√3
// ═════════════════════════════════════════════════════════════════════════════
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "5√3", correcta: true },
    { label: "√39", correcta: false },
    { label: "5√6", correcta: false },
    { label: "√12 + √27", correcta: false },
  ], []);

  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Simplificá la suma:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          padding: "30px 40px", background: "var(--bg-card)",
          borderRadius: 20, border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 14,
        }}
      >
        <Rad rad="12" size={36} />
        <span style={{ fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}>+</span>
        <Rad rad="27" size={36} />
        <span style={{ fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}>=</span>
        <span style={{ fontSize: 36, color: "var(--fg-muted)", fontWeight: 700 }}>?</span>
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
                padding: "20px 16px",
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
              {reveal && isCorrecta && <span style={{ marginLeft: 10, color: COLOR_OK }}>✓</span>}
              {reveal && sel && !isCorrecta && <span style={{ marginLeft: 10, color: COLOR_BAD }}>✗</span>}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {elegida !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: 16, borderRadius: 14, marginTop: 6,
              background: opciones[elegida].correcta ? "#ecfdf5" : "#fef2f2",
              border: `1px solid ${opciones[elegida].correcta ? COLOR_OK : "#fca5a5"}`,
              fontSize: 14, color: "var(--fg-primary)",
            }}
          >
            {opciones[elegida].correcta ? (
              <>
                <strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Simplificá primero: √12 = √(4·3) = 2√3 y √27 = √(9·3) = 3√3. Ahora son semejantes: 2√3 + 3√3 = <strong>5√3</strong>.
              </>
            ) : (
              <>
                <strong style={{ color: COLOR_BAD }}>No.</strong> Simplificá primero cada raíz: √12 = 2√3, √27 = 3√3. Después sumás coeficientes: 2+3=5 → <strong>5√3</strong>.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
