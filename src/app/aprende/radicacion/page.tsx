"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  escenaWrap, subtitulo, hint, numGrande, cajaAnim, cajitaFormula, Stage,
} from "../_components/atoms";

// ─────────────────────────────────────────────────────────────────────────────
// Lección: Radicación y propiedades (Unidad 01)
// Raíz cuadrada y n-ésima, propiedades del producto/cociente, racionalización.
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Radicación y propiedades"
      escenas={[
        { titulo: "¿Qué es una raíz?", componente: EscenaIntro },
        { titulo: "Raíz n-ésima", componente: EscenaNEsima },
        { titulo: "Raíz de un producto", componente: EscenaProducto },
        { titulo: "Raíz de un cociente", componente: EscenaCociente },
        { titulo: "Racionalización", componente: EscenaRacionalizacion },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — ¿Qué es una raíz cuadrada? √9 = 3 porque 3·3 = 9
// ═════════════════════════════════════════════════════════════════════════════
function EscenaIntro() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La <strong>raíz cuadrada</strong> es la operación opuesta al cuadrado:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={160}>

          {/* √9 inicial */}
          <motion.span
            style={{ position: "absolute", left: 100, top: 55, fontSize: 70, color: COLOR_BASE, fontWeight: 400 }}
            animate={{ opacity: paso < 3 ? 1 : 0 }}
          >√</motion.span>
          <motion.div
            style={{ position: "absolute", left: 142, top: 62, width: 50, height: 3, background: COLOR_BASE, borderRadius: 2 }}
            animate={{ opacity: paso < 3 ? 1 : 0 }}
          />
          <motion.span
            style={{ position: "absolute", left: 152, top: 70, ...numGrande(COLOR_BASE, 56) }}
            animate={{ opacity: paso < 3 ? 1 : 0 }}
          >9</motion.span>

          {/* = ? */}
          <motion.span
            style={{ position: "absolute", left: 220, top: 75, fontSize: 38, color: COLOR_EXP, fontWeight: 700 }}
            animate={{ opacity: paso === 0 ? 1 : 0 }}
          >= ?</motion.span>

          {/* Pregunta intermedia: qué número al cuadrado da 9 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso === 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{
              position: "absolute", left: 215, top: 60, fontSize: 14,
              color: "var(--fg-muted)", fontStyle: "italic", maxWidth: 200,
            }}
          >
            ¿qué número × sí mismo da 9?
          </motion.div>

          {/* Verificación: 3 × 3 = 9 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{
              position: "absolute", left: 220, top: 60, fontSize: 26,
              color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif",
            }}
          >
            = <strong style={{ fontSize: 40 }}>3</strong>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 600 }}>
              porque 3 · 3 = 9
            </div>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            √a = b ⟺ b² = a
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 ¿Cuánto vale la raíz cuadrada de 9?"}
        {paso === 1 && "La raíz pregunta: ¿qué número multiplicado por sí mismo da 9?"}
        {paso === 2 && "3 × 3 = 9, así que √9 = 3 ✓"}
        {paso === 3 && "La raíz es la inversa del cuadrado"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — Raíz n-ésima: ³√8 = 2 porque 2·2·2 = 8
// El índice indica cuántas veces aparece el mismo factor.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaNEsima() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una raíz puede tener cualquier <strong>índice</strong>. El índice dice cuántas veces se multiplica:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={160}>

          {/* Índice del radical "3" arriba-izquierda */}
          <motion.span
            style={{ position: "absolute", left: 90, top: 40, fontSize: 22, color: COLOR_EXP, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}
            animate={paso === 1 ? { scale: [1, 1.5, 1.2], color: COLOR_BAD } : {}}
          >3</motion.span>
          {/* Símbolo radical */}
          <motion.span style={{ position: "absolute", left: 105, top: 55, fontSize: 70, color: COLOR_BASE, fontWeight: 400 }}>√</motion.span>
          <motion.div style={{ position: "absolute", left: 147, top: 62, width: 50, height: 3, background: COLOR_BASE, borderRadius: 2 }} />
          {/* Radicando 8 */}
          <motion.span style={{ position: "absolute", left: 158, top: 70, ...numGrande(COLOR_BASE, 56) }}>8</motion.span>

          {/* = ? */}
          <motion.span
            style={{ position: "absolute", left: 220, top: 75, fontSize: 38, color: COLOR_EXP, fontWeight: 700 }}
            animate={{ opacity: paso === 0 ? 1 : 0 }}
          >= ?</motion.span>

          {/* Pregunta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso === 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 220, top: 55, fontSize: 14, color: "var(--fg-muted)", maxWidth: 200, fontStyle: "italic" }}
          >
            ¿qué número × sí mismo × sí mismo da 8?
          </motion.div>

          {/* Verificación 2·2·2 = 8 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso === 2 ? { opacity: 1, scale: 1 } : paso > 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{
              position: "absolute", left: 220, top: 60, fontSize: 22,
              color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif",
            }}
          >
            = <strong style={{ fontSize: 40 }}>2</strong>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 600 }}>
              porque 2 · 2 · 2 = 8
            </div>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <sup style={{ fontSize: 12, color: COLOR_EXP }}>n</sup>√a = b ⟺ b<sup style={{ color: COLOR_EXP }}>n</sup> = a
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 ¿Cuánto vale la raíz cúbica de 8?"}
        {paso === 1 && "El índice 3 dice: ¿qué número × sí mismo × sí mismo da 8?"}
        {paso === 2 && "2 · 2 · 2 = 8, así que ³√8 = 2 ✓"}
        {paso === 3 && "Cualquier raíz se define de la misma manera"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — Raíz de un producto: √(a·b) = √a · √b
// Demostración con √36 = √(4·9) = √4 · √9 = 2 · 3 = 6
// ═════════════════════════════════════════════════════════════════════════════
function EscenaProducto() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La raíz <strong>se distribuye</strong> en una multiplicación:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={170}>

          {/* √(4·9) inicial */}
          <motion.div style={{ position: "absolute", left: 50, top: 50, display: "flex", alignItems: "flex-start" }}
            animate={paso >= 2 ? { opacity: 0, x: -30 } : { opacity: 1 }}
          >
            <span style={{ fontSize: 70, color: COLOR_BASE, fontWeight: 400 }}>√</span>
            <div style={{ position: "relative", marginLeft: -4, marginTop: 7 }}>
              <div style={{ borderTop: `3px solid ${COLOR_BASE}`, width: 120, position: "absolute", top: 0 }} />
              <div style={{ display: "flex", paddingTop: 8, alignItems: "center", gap: 6, paddingLeft: 4 }}>
                <span style={{ ...numGrande(COLOR_BASE, 40) }}>4</span>
                <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>·</span>
                <span style={{ ...numGrande(COLOR_BASE, 40) }}>9</span>
              </div>
            </div>
          </motion.div>

          {/* "=" */}
          <motion.span
            style={{ position: "absolute", left: 200, top: 70, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={{ opacity: paso >= 1 ? 1 : 0 }}
          >=</motion.span>

          {/* √4 · √9 transformado */}
          <motion.div style={{ position: "absolute", left: 240, top: 50, display: "flex", alignItems: "center", gap: 6 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={paso >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 180, delay: paso === 1 ? 0.3 : 0 }}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 50, color: COLOR_BASE, fontWeight: 400 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_BASE}`, paddingTop: 4, marginTop: 4, marginLeft: -2 }}>
                <span style={{ ...numGrande(COLOR_BASE, 36) }}>4</span>
              </div>
            </div>
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>·</span>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 50, color: COLOR_BASE, fontWeight: 400 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_BASE}`, paddingTop: 4, marginTop: 4, marginLeft: -2 }}>
                <span style={{ ...numGrande(COLOR_BASE, 36) }}>9</span>
              </div>
            </div>
          </motion.div>

          {/* Evaluación final: 2 · 3 = 6 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso >= 3 ? { opacity: 1 } : { opacity: 0 }}
            style={{
              position: "absolute", left: 0, top: 130, width: "100%",
              textAlign: "center", fontSize: 22, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif",
            }}
          >
            = 2 · 3 = 6 ✓
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 2 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            √(a · b) = √a · √b
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 ¿Cuánto es √36? Lo escribimos como √(4·9)"}
        {paso === 1 && "La raíz se reparte: √(4·9) = √4 · √9"}
        {paso === 2 && "Esta es la regla general"}
        {paso === 3 && "Y como √4=2 y √9=3 → 2·3 = 6 ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — Raíz de un cociente: √(a/b) = √a / √b
// √(49/4) = √49 / √4 = 7/2
// ═════════════════════════════════════════════════════════════════════════════
function EscenaCociente() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Y también <strong>se distribuye</strong> en una división:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={170}>

          {/* √(49/4) inicial */}
          <motion.div style={{ position: "absolute", left: 50, top: 30, display: "flex", alignItems: "flex-start" }}
            animate={paso >= 1 ? { opacity: 0, x: -30 } : { opacity: 1 }}
          >
            <span style={{ fontSize: 80, color: COLOR_BASE, fontWeight: 400 }}>√</span>
            <div style={{ position: "relative", marginLeft: -4, marginTop: 8 }}>
              <div style={{ borderTop: `3px solid ${COLOR_BASE}`, width: 60, position: "absolute", top: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
                <span style={{ ...numGrande(COLOR_BASE, 28) }}>49</span>
                <div style={{ borderTop: `2px solid ${COLOR_BASE}`, width: "100%", margin: "2px 0" }} />
                <span style={{ ...numGrande(COLOR_BASE, 28) }}>4</span>
              </div>
            </div>
          </motion.div>

          {/* = */}
          <motion.span
            style={{ position: "absolute", left: 200, top: 65, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={{ opacity: paso >= 1 ? 1 : 0 }}
          >=</motion.span>

          {/* √49 / √4 distribuido como fracción */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={paso >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 180, delay: paso === 1 ? 0.3 : 0 }}
            style={{ position: "absolute", left: 245, top: 30, display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            {/* √49 numerador */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 50, color: COLOR_BASE, fontWeight: 400 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_BASE}`, paddingTop: 4, marginTop: 4, marginLeft: -2 }}>
                <span style={{ ...numGrande(COLOR_BASE, 30) }}>49</span>
              </div>
            </div>
            <div style={{ width: "100%", borderTop: `2.5px solid ${COLOR_EXP}`, margin: "6px 0" }} />
            {/* √4 denominador */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 50, color: COLOR_BASE, fontWeight: 400 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_BASE}`, paddingTop: 4, marginTop: 4, marginLeft: -2 }}>
                <span style={{ ...numGrande(COLOR_BASE, 30) }}>4</span>
              </div>
            </div>
          </motion.div>

          {/* = 7/2 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{
              position: "absolute", left: 0, bottom: 0, width: "100%",
              textAlign: "center", fontSize: 22, color: COLOR_OK, fontWeight: 800,
              fontFamily: "var(--font-crimson), serif",
            }}
          >
            = 7 / 2 = 3,5 ✓
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 1 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            √(a / b) = √a / √b
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Calculemos √(49/4)"}
        {paso === 1 && "La raíz se reparte: arriba √49, abajo √4"}
        {paso === 2 && "√49=7, √4=2 → resultado = 7/2"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 5 — RACIONALIZACIÓN: quitar raíces del denominador
// 1/√2 → multiplicamos arriba y abajo por √2 → √2 / 2
// ═════════════════════════════════════════════════════════════════════════════
function EscenaRacionalizacion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>¿Y si la raíz queda en el denominador? Hay que <strong>racionalizar</strong>:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={180}>

          {/* 1 / √2 inicial */}
          <motion.div
            style={{ position: "absolute", left: 60, top: 50, display: "flex", flexDirection: "column", alignItems: "center" }}
            animate={paso >= 3 ? { opacity: 0, x: -40 } : { opacity: 1 }}
          >
            <span style={{ ...numGrande(COLOR_BASE, 36) }}>1</span>
            <div style={{ borderTop: `2.5px solid ${COLOR_BASE}`, width: 80, margin: "4px 0" }} />
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 40, color: COLOR_BASE, fontWeight: 400 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_BASE}`, paddingTop: 3, marginTop: 3, marginLeft: -2 }}>
                <span style={{ ...numGrande(COLOR_BASE, 30) }}>2</span>
              </div>
            </div>
          </motion.div>

          {/* × √2/√2 (multiplicador "uno") */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ position: "absolute", left: 165, top: 50, display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>×</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{ fontSize: 40, color: COLOR_OK, fontWeight: 400 }}>√</span>
                <div style={{ borderTop: `2px solid ${COLOR_OK}`, paddingTop: 3, marginTop: 3, marginLeft: -2 }}>
                  <span style={{ ...numGrande(COLOR_OK, 28) }}>2</span>
                </div>
              </div>
              <div style={{ borderTop: `2.5px solid ${COLOR_OK}`, width: 60, margin: "4px 0" }} />
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{ fontSize: 40, color: COLOR_OK, fontWeight: 400 }}>√</span>
                <div style={{ borderTop: `2px solid ${COLOR_OK}`, paddingTop: 3, marginTop: 3, marginLeft: -2 }}>
                  <span style={{ ...numGrande(COLOR_OK, 28) }}>2</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Nota: "vale 1" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso === 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 165, top: 145, fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic" }}
          >
            (vale 1, no cambia nada)
          </motion.div>

          {/* = √2/2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={paso >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{ position: "absolute", left: 290, top: 50, display: "flex", alignItems: "center", gap: 10 }}
          >
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>=</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{ fontSize: 44, color: COLOR_OK, fontWeight: 400 }}>√</span>
                <div style={{ borderTop: `2px solid ${COLOR_OK}`, paddingTop: 3, marginTop: 3, marginLeft: -2 }}>
                  <span style={{ ...numGrande(COLOR_OK, 32) }}>2</span>
                </div>
              </div>
              <div style={{ borderTop: `2.5px solid ${COLOR_OK}`, width: 60, margin: "4px 0" }} />
              <span style={{ ...numGrande(COLOR_OK, 36) }}>2</span>
            </div>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            Truco: multiplicá arriba y abajo por la <strong>misma raíz</strong>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 1/√2 tiene una raíz fea en el denominador"}
        {paso === 1 && "Multiplicamos por √2/√2 (que vale 1)"}
        {paso === 2 && "El denominador √2·√2 = 2 → queda √2/2"}
        {paso === 3 && "Ya no hay raíz en el denominador ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Mini-reto
// √50 — usando raíz de producto. 50 = 25·2 → √25·√2 = 5√2
// ═════════════════════════════════════════════════════════════════════════════
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "5√2", correcta: true },
    { label: "25√2", correcta: false },
    { label: "√50", correcta: false },
    { label: "2√5", correcta: false },
  ], []);

  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Simplificá usando la regla del producto:</p>

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
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <span style={{ fontSize: 60, color: COLOR_BASE, fontWeight: 400 }}>√</span>
          <div style={{ borderTop: `3px solid ${COLOR_BASE}`, paddingTop: 6, marginTop: 4, marginLeft: -2 }}>
            <span style={{ ...numGrande(COLOR_BASE, 44) }}>50</span>
          </div>
        </div>
        <span style={{ fontSize: 40, color: COLOR_EXP, fontWeight: 700 }}>=</span>
        <span style={{ fontSize: 40, color: "var(--fg-muted)", fontWeight: 700 }}>?</span>
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
                fontSize: 26, fontWeight: 700, color: COLOR_BASE,
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
                <strong style={{ color: COLOR_OK }}>¡Exacto!</strong> 50 = 25 · 2. Aplicando √(a·b) = √a · √b: √50 = √25 · √2 = <strong>5√2</strong>.
              </>
            ) : (
              <>
                <strong style={{ color: COLOR_BAD }}>No.</strong> El truco es escribir 50 como producto donde uno sea cuadrado perfecto. 50 = 25 · 2 → √25 · √2 = <strong>5√2</strong>.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
