"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  escenaWrap, subtitulo, hint, numGrande, cajaAnim, cajitaFormula, Stage,
} from "../_components/atoms";

// ─────────────────────────────────────────────────────────────────────────────
// Lección: MCD y MCM (Unidad 01)
// Divisores, factorización prima, MCD y MCM aplicados.
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="MCD y MCM"
      escenas={[
        { titulo: "Divisores y múltiplos", componente: EscenaIntro },
        { titulo: "MCD: divisores comunes", componente: EscenaMCDVisual },
        { titulo: "Factorización en primos", componente: EscenaFactorizacion },
        { titulo: "MCD por factorización", componente: EscenaMCDFact },
        { titulo: "MCM por factorización", componente: EscenaMCMFact },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — Divisores y múltiplos
// ═════════════════════════════════════════════════════════════════════════════
function EscenaIntro() {
  const [paso, setPaso] = useState(0);
  // Divisores de 12 → 1, 2, 3, 4, 6, 12. Mostramos cómo 12 se reparte.
  const repartos = [
    { divisor: 1, grupos: 1, porGrupo: 12 },
    { divisor: 2, grupos: 2, porGrupo: 6 },
    { divisor: 3, grupos: 3, porGrupo: 4 },
    { divisor: 4, grupos: 4, porGrupo: 3 },
    { divisor: 6, grupos: 6, porGrupo: 2 },
    { divisor: 12, grupos: 12, porGrupo: 1 },
  ];
  const i = Math.min(paso, repartos.length - 1);
  const { divisor, grupos, porGrupo } = repartos[i];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Un <strong>divisor</strong> de un número es un valor que lo reparte en grupos exactos:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, repartos.length - 1))} style={cajaAnim()}>
        <Stage w={420} h={170}>
          {/* 12 bolitas distribuidas según el divisor actual */}
          {Array.from({ length: 12 }).map((_, k) => {
            const grupo = Math.floor(k / porGrupo);
            const dentro = k % porGrupo;
            const anchoGrupo = 360 / grupos;
            const left = 30 + grupo * anchoGrupo + dentro * 28;
            const top = 60;
            const color = grupo % 2 === 0 ? COLOR_BASE : COLOR_EXP;
            return (
              <motion.div key={k}
                style={{ position: "absolute", width: 24, height: 24, borderRadius: "50%" }}
                animate={{ left, top, background: color }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: k * 0.015 }}
              />
            );
          })}

          {/* Cajas para los grupos */}
          {Array.from({ length: grupos }).map((_, g) => {
            const anchoGrupo = 360 / grupos;
            return (
              <motion.div key={`g${g}`}
                style={{
                  position: "absolute",
                  left: 30 + g * anchoGrupo - 6,
                  top: 50,
                  width: porGrupo * 28 + 4,
                  height: 44,
                  border: `1.5px dashed ${COLOR_EXP}`,
                  borderRadius: 8,
                }}
                animate={{ opacity: grupos > 1 ? 0.7 : 0 }}
              />
            );
          })}

          {/* Etiqueta */}
          <div style={{ position: "absolute", left: 0, top: 120, width: "100%", textAlign: "center" }}>
            <motion.span
              key={divisor}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: 22, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}
            >
              12 ÷ <span style={{ color: COLOR_OK }}>{divisor}</span> = {porGrupo}
            </motion.span>
          </div>
        </Stage>

        <div style={{ fontSize: 14, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380, lineHeight: 1.5 }}>
          Los <strong style={{ color: COLOR_OK }}>divisores de 12</strong> son:{" "}
          {repartos.slice(0, i + 1).map((r) => r.divisor).join(", ")}
          {i < repartos.length - 1 && "…"}
        </div>
      </div>

      <p style={hint()}>
        {i < repartos.length - 1 ? "👆 Tocá para ver el siguiente divisor de 12" : "12 tiene 6 divisores en total ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — MCD VISUAL: comparar divisores de 12 y 18
// ═════════════════════════════════════════════════════════════════════════════
function EscenaMCDVisual() {
  const [paso, setPaso] = useState(0);
  // Divisores de 12: 1, 2, 3, 4, 6, 12
  // Divisores de 18: 1, 2, 3, 6, 9, 18
  // Comunes: 1, 2, 3, 6. MCD = 6.
  const div12 = [1, 2, 3, 4, 6, 12];
  const div18 = [1, 2, 3, 6, 9, 18];
  const comunes = [1, 2, 3, 6];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>MCD</strong> es el divisor común <em>más grande</em> entre dos números:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Fila de divisores de 12 */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif", minWidth: 30 }}>12:</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {div12.map((d) => {
                const esComun = comunes.includes(d);
                return (
                  <motion.span key={d}
                    style={{
                      padding: "5px 12px", borderRadius: 8,
                      fontSize: 16, fontWeight: 700, fontFamily: "var(--font-crimson), serif",
                    }}
                    animate={
                      paso === 0 ? { background: "var(--bg-subtle)", color: COLOR_BASE, scale: 1 } :
                      paso === 1 ? { background: "var(--bg-subtle)", color: COLOR_BASE, scale: 1 } :
                      paso >= 2 && esComun ? { background: COLOR_OK, color: "white", scale: 1.08 } :
                                              { background: "var(--bg-subtle)", color: "var(--fg-muted)", scale: 0.9, opacity: 0.5 }
                    }
                    transition={{ delay: paso === 2 && esComun ? d * 0.03 : 0 }}
                  >{d}</motion.span>
                );
              })}
            </div>
          </div>

          {/* Fila de divisores de 18 */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif", minWidth: 30 }}>18:</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {div18.map((d) => {
                const esComun = comunes.includes(d);
                return (
                  <motion.span key={d}
                    style={{
                      padding: "5px 12px", borderRadius: 8,
                      fontSize: 16, fontWeight: 700, fontFamily: "var(--font-crimson), serif",
                    }}
                    animate={
                      paso < 1 ? { opacity: 0, scale: 0 } :
                      paso === 1 ? { background: "var(--bg-subtle)", color: COLOR_BASE, scale: 1, opacity: 1 } :
                      paso >= 2 && esComun ? { background: COLOR_OK, color: "white", scale: 1.08, opacity: 1 } :
                                              { background: "var(--bg-subtle)", color: "var(--fg-muted)", scale: 0.9, opacity: 0.5 }
                    }
                    transition={{ delay: paso === 1 ? d * 0.04 : (paso === 2 && esComun ? d * 0.03 : 0) }}
                  >{d}</motion.span>
                );
              })}
            </div>
          </div>

          {/* Resultado MCD */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{
              textAlign: "center", padding: "12px 20px",
              background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
              borderRadius: 12, border: `1px solid ${COLOR_OK}`,
            }}
          >
            <span style={{ fontSize: 20, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
              MCD(12, 18) = 6
            </span>
            <div style={{ fontSize: 12, color: "#065f46", marginTop: 2 }}>
              (el más grande de los divisores comunes)
            </div>
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Acá están los divisores de 12. Tocá para sumar los de 18"}
        {paso === 1 && "Y estos son los divisores de 18"}
        {paso === 2 && "Marcamos los que aparecen en las dos listas (comunes)"}
        {paso === 3 && "El más grande es 6 → MCD = 6"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — Factorización en primos (árbol)
// Descomponer 12 = 2 × 2 × 3 con árbol animado.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaFactorizacion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Todo número se descompone en <strong>primos</strong>. Mirá el árbol:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 4))} style={cajaAnim()}>
        <Stage w={360} h={240}>

          {/* Raíz: 12 */}
          <motion.span style={{ position: "absolute", left: 160, top: 0, ...numGrande(COLOR_BASE, 50) }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
          >12</motion.span>

          {/* Líneas de la primera rama */}
          <motion.svg style={{ position: "absolute", left: 0, top: 0, width: 360, height: 240, pointerEvents: "none" }}>
            <motion.line x1={180} y1={50} x2={120} y2={100}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: paso >= 1 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.line x1={180} y1={50} x2={240} y2={100}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: paso >= 1 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
            {/* Segunda rama: del 6 */}
            <motion.line x1={240} y1={130} x2={200} y2={180}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: paso >= 2 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.line x1={240} y1={130} x2={280} y2={180}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: paso >= 2 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.svg>

          {/* Primer nivel: 2 y 6 */}
          <motion.span style={{ position: "absolute", left: 100, top: 100, ...numGrande(COLOR_OK, 40) }}
            initial={{ scale: 0, opacity: 0 }}
            animate={paso >= 1 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
          >2</motion.span>
          <motion.span style={{ position: "absolute", left: 220, top: 100, ...numGrande(COLOR_BASE, 40) }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              paso === 1 ? { scale: 1, opacity: 1 } :
              paso === 2 ? { scale: 1, opacity: 0.5 } :
              paso >= 2 ? { scale: 1, opacity: 0.5 } :
              { scale: 0, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
          >6</motion.span>

          {/* Segundo nivel: 2 y 3 (de 6 = 2·3) */}
          <motion.span style={{ position: "absolute", left: 180, top: 180, ...numGrande(COLOR_OK, 40) }}
            initial={{ scale: 0, opacity: 0 }}
            animate={paso >= 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
          >2</motion.span>
          <motion.span style={{ position: "absolute", left: 260, top: 180, ...numGrande(COLOR_OK, 40) }}
            initial={{ scale: 0, opacity: 0 }}
            animate={paso >= 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
          >3</motion.span>
        </Stage>

        {/* Conclusión: 12 = 2² × 3 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          style={cajitaFormula()}
        >
          <span style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            12 = 2 × 2 × 3 = 2<sup style={{ color: COLOR_OK }}>2</sup> × 3
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={paso >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: 13, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380, padding: "6px 12px",
          }}
        >
          💡 Lo mismo para 18: 18 = 2 × 3 × 3 = 2 × 3²
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Empezamos con 12. Tocá para descomponer"}
        {paso === 1 && "12 = 2 × 6. El 2 ya es primo (verde), el 6 sigue"}
        {paso === 2 && "6 = 2 × 3. Y ambos son primos"}
        {paso === 3 && "Reunimos los primos: 12 = 2² × 3"}
        {paso === 4 && "Hagamos lo mismo con 18 →"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — MCD por factorización: primos comunes con MENOR exponente
// 12 = 2² × 3¹  ;  18 = 2¹ × 3²  →  MCD = 2¹ × 3¹ = 6
// ═════════════════════════════════════════════════════════════════════════════
function EscenaMCDFact() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para el <strong>MCD</strong>: primos <strong>comunes</strong> con el <strong>menor</strong> exponente:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={180}>

          {/* Línea 12 = 2² · 3 */}
          <div style={{ position: "absolute", left: 0, top: 20, width: "100%", textAlign: "center", fontSize: 24, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            12 = <span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>2<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_BAD : COLOR_EXP }}>2</sup></span>
            {" · "}<span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>3<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_OK : COLOR_EXP }}>1</sup></span>
          </div>

          {/* Línea 18 = 2 · 3² */}
          <div style={{ position: "absolute", left: 0, top: 70, width: "100%", textAlign: "center", fontSize: 24, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            18 = <span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>2<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_OK : COLOR_EXP }}>1</sup></span>
            {" · "}<span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>3<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_BAD : COLOR_EXP }}>2</sup></span>
          </div>

          {/* Resultado */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ position: "absolute", left: 0, top: 130, width: "100%", textAlign: "center", fontSize: 28, fontWeight: 800, fontFamily: "var(--font-crimson), serif", color: COLOR_OK }}
          >
            MCD = 2<sup style={{ fontSize: 16 }}>1</sup> · 3<sup style={{ fontSize: 16 }}>1</sup> = 6
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            Regla: <strong>primos COMUNES</strong> elevados al <strong>MENOR</strong> exponente
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tenemos las factorizaciones de 12 y 18"}
        {paso === 1 && "Buscamos los primos COMUNES (acá: 2 y 3)"}
        {paso === 2 && "De cada uno tomamos el MENOR exponente: 2¹ y 3¹"}
        {paso === 3 && "MCD = 2 · 3 = 6 ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 5 — MCM por factorización: TODOS los primos con MAYOR exponente
// 12 = 2² · 3¹  ;  18 = 2¹ · 3²  →  MCM = 2² · 3² = 36
// ═════════════════════════════════════════════════════════════════════════════
function EscenaMCMFact() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para el <strong>MCM</strong>: <em>todos</em> los primos con el <strong>mayor</strong> exponente:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={180}>

          <div style={{ position: "absolute", left: 0, top: 20, width: "100%", textAlign: "center", fontSize: 24, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            12 = 2<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_OK : COLOR_EXP }}>2</sup>
            {" · "}3<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_BAD : COLOR_EXP }}>1</sup>
          </div>

          <div style={{ position: "absolute", left: 0, top: 70, width: "100%", textAlign: "center", fontSize: 24, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            18 = 2<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_BAD : COLOR_EXP }}>1</sup>
            {" · "}3<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_OK : COLOR_EXP }}>2</sup>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ position: "absolute", left: 0, top: 130, width: "100%", textAlign: "center", fontSize: 28, fontWeight: 800, fontFamily: "var(--font-crimson), serif", color: COLOR_OK }}
          >
            MCM = 2<sup style={{ fontSize: 16 }}>2</sup> · 3<sup style={{ fontSize: 16 }}>2</sup> = 36
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            Regla: <strong>TODOS los primos</strong> elevados al <strong>MAYOR</strong> exponente
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Mismas factorizaciones de antes"}
        {paso === 1 && "Esta vez NO descartamos ninguno"}
        {paso === 2 && "Tomamos el MAYOR exponente de cada uno: 2² y 3²"}
        {paso === 3 && "MCM = 4 · 9 = 36 ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Mini-reto
// ═════════════════════════════════════════════════════════════════════════════
function EscenaReto() {
  // ¿MCD(20, 30)? → 20 = 2²·5, 30 = 2·3·5 → MCD = 2·5 = 10
  const opciones = useMemo(() => [
    { label: "10", correcta: true },
    { label: "60", correcta: false },
    { label: "5", correcta: false },
    { label: "2", correcta: false },
  ], []);

  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Encontrá el MCD de 20 y 30 usando factorización:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          padding: "24px 30px", background: "var(--bg-card)",
          borderRadius: 20, border: "1px solid var(--border)",
          textAlign: "center", fontFamily: "var(--font-crimson), serif",
        }}
      >
        <div style={{ fontSize: 22, color: COLOR_BASE, fontWeight: 700 }}>
          20 = 2² · 5
        </div>
        <div style={{ fontSize: 22, color: COLOR_BASE, fontWeight: 700, marginTop: 8 }}>
          30 = 2 · 3 · 5
        </div>
        <div style={{ fontSize: 26, color: "var(--fg-muted)", marginTop: 12 }}>
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
                <strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Primos comunes: 2 y 5. Menor exponente de cada uno: 2¹ y 5¹. MCD = 2 · 5 = <strong>10</strong>.
              </>
            ) : (
              <>
                <strong style={{ color: COLOR_BAD }}>No.</strong> Solo se toman primos <em>comunes</em> con MENOR exponente. Comunes: 2 y 5. → 2 · 5 = <strong>10</strong>.
                {opciones[elegida].label === "60" && " (60 sería el MCM, no el MCD)"}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
