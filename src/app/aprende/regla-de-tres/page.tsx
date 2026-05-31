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
      unidad="02"
      tituloUnidad="Regla de tres · Interés simple"
      escenas={[
        { titulo: "Regla de tres directa", componente: EscenaDirecta },
        { titulo: "Regla de tres inversa", componente: EscenaInversa },
        { titulo: "Distinguir directa de inversa", componente: EscenaDistinguir },
        { titulo: "Interés simple: el capital crece", componente: EscenaInteresIntro },
        { titulo: "Interés simple: la fórmula", componente: EscenaInteresFormula },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — REGLA DE TRES DIRECTA
// Si 3 kg cuestan 60 bs, ¿cuánto cuestan 5 kg?
// 3/5 = 60/x  →  x = 5·60/3 = 100
// ═════════════════════════════════════════════════════════════════════════════
function EscenaDirecta() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Cuando una cantidad crece, la otra también: <strong>directa</strong></p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={380} h={180}>

          {/* Tabla de la regla de 3 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 12, columnGap: 30, padding: "10px 30px", textAlign: "center", fontFamily: "var(--font-crimson), serif" }}>
            <div style={{ fontSize: 14, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>KG</div>
            <div style={{ fontSize: 14, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>BS</div>

            <div style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700 }}>3</div>
            <div style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700 }}>60</div>

            <div style={{ fontSize: 28, color: COLOR_OK, fontWeight: 700 }}>5</div>
            <div style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 800 }}>x</div>
          </div>

          {/* Flecha "directa" (ambas hacia abajo) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 10, top: 50, fontSize: 22, color: COLOR_OK }}
          >↓</motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
            style={{ position: "absolute", right: 10, top: 50, fontSize: 22, color: COLOR_OK }}
          >↓</motion.div>
        </Stage>

        {/* Despeje */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", color: COLOR_BASE, fontWeight: 700, textAlign: "center" }}
        >
          x = (5 · 60) / 3 = 300 / 3
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 180 }}
          style={{ fontSize: 26, fontFamily: "var(--font-crimson), serif", color: COLOR_OK, fontWeight: 800 }}
        >
          x = 100 Bs ✓
        </motion.div>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>Directa:</strong> a/c = b/x  →  x = (c · b) / a
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Si 3 kg → 60 Bs, ¿5 kg → cuánto?"}
        {paso === 1 && "Más kg, más bolivianos: las dos suben juntas (directa)"}
        {paso === 2 && "Multiplicamos cruzado: 5·60 dividido 3"}
        {paso === 3 && "5 kg cuestan 100 Bs"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — REGLA DE TRES INVERSA
// 4 obreros tardan 12 días. ¿Cuánto tardan 6 obreros?
// Más obreros → MENOS días → INVERSA. Truco: multiplicar en la misma fila.
// 4 · 12 = 6 · x  →  x = 48/6 = 8 días
// ═════════════════════════════════════════════════════════════════════════════
function EscenaInversa() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Cuando una crece y la otra decrece: <strong>inversa</strong></p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={380} h={180}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 12, columnGap: 30, padding: "10px 30px", textAlign: "center", fontFamily: "var(--font-crimson), serif" }}>
            <div style={{ fontSize: 14, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>OBREROS</div>
            <div style={{ fontSize: 14, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>DÍAS</div>

            <div style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700 }}>4</div>
            <div style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700 }}>12</div>

            <div style={{ fontSize: 28, color: COLOR_OK, fontWeight: 700 }}>6</div>
            <div style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 800 }}>x</div>
          </div>

          {/* Flechas opuestas: ↓ izquierda y ↑ derecha (inversa) */}
          <motion.div
            initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 10, top: 50, fontSize: 22, color: COLOR_OK }}
          >↓</motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
            style={{ position: "absolute", right: 10, top: 50, fontSize: 22, color: COLOR_BAD }}
          >↑</motion.div>
        </Stage>

        {/* Despeje: 4·12 = 6·x */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", color: COLOR_BASE, fontWeight: 700, textAlign: "center" }}
        >
          4 · 12 = 6 · x  →  x = 48 / 6
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 180 }}
          style={{ fontSize: 26, fontFamily: "var(--font-crimson), serif", color: COLOR_OK, fontWeight: 800 }}
        >
          x = 8 días ✓
        </motion.div>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>Inversa:</strong> a · b = c · x  →  x = (a · b) / c
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 4 obreros tardan 12 días. ¿6 obreros?"}
        {paso === 1 && "Más obreros → menos días. Flechas opuestas"}
        {paso === 2 && "En inversa multiplicamos EN LÍNEA: 4·12 = 6·x"}
        {paso === 3 && "x = 48/6 = 8 días (menos, lógico)"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — Distinguir directa de inversa
// ═════════════════════════════════════════════════════════════════════════════
function EscenaDistinguir() {
  const [i, setI] = useState(0);
  const casos = [
    { txt: "Más kilos de pan → más bolivianos", tipo: "directa" as const },
    { txt: "Más obreros → menos días para terminar", tipo: "inversa" as const },
    { txt: "Más velocidad → menos tiempo de viaje", tipo: "inversa" as const },
    { txt: "Más horas de trabajo → más dinero", tipo: "directa" as const },
  ];
  const caso = casos[i];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Antes de calcular, ¿es directa o inversa? Mirá si las dos suben o se mueven al revés:</p>

      <div onClick={() => setI((p) => (p + 1) % casos.length)} style={cajaAnim()}>
        <div style={{ minHeight: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <AnimatePresence mode="wait">
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              style={{ fontSize: 20, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif", textAlign: "center", maxWidth: 400 }}
            >
              {caso.txt}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div key={`b-${i}`}
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{
                padding: "10px 18px", borderRadius: 12,
                background: caso.tipo === "directa" ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "linear-gradient(135deg, #fef3c7, #fde68a)",
                border: `1.5px solid ${caso.tipo === "directa" ? COLOR_OK : "#f59e0b"}`,
                fontSize: 14, fontWeight: 800, fontFamily: "var(--font-crimson), serif",
                color: caso.tipo === "directa" ? "#065f46" : "#78350f",
              }}
            >
              {caso.tipo === "directa" ? "↓↓ DIRECTA" : "↓↑ INVERSA"}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p style={hint()}>👆 Tocá para ver otro caso ({i + 1} de {casos.length})</p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — Interés simple: visualización del capital + interés
// Capital 1000, interés 200 → monto 1200
// ═════════════════════════════════════════════════════════════════════════════
function EscenaInteresIntro() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El <strong>interés simple</strong>: lo que un capital genera con el tiempo:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={380} h={160}>

          {/* Barra de capital */}
          <motion.div
            style={{ position: "absolute", left: 60, top: 40, height: 50, borderRadius: 10, background: `linear-gradient(135deg, ${COLOR_BASE}, #4338ca)` }}
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ position: "absolute", left: 110, top: 52, color: "white", fontSize: 18, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}
          >
            Capital: 1000
          </motion.div>

          {/* Barra de interés que crece */}
          <motion.div
            style={{ position: "absolute", left: 260, top: 40, height: 50, borderRadius: 10, background: `linear-gradient(135deg, ${COLOR_OK}, #34d399)` }}
            initial={{ width: 0 }}
            animate={paso >= 1 ? { width: 60 } : { width: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
            style={{ position: "absolute", left: 275, top: 52, color: "white", fontSize: 13, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}
          >
            +Int. 200
          </motion.div>

          {/* Monto final */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ position: "absolute", left: 0, top: 110, width: "100%", textAlign: "center" }}
          >
            <span style={{ fontSize: 22, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
              Monto = Capital + Interés = 1200
            </span>
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Imaginá un capital de 1000 Bs en el banco"}
        {paso === 1 && "Pasa el tiempo y gana 200 de interés…"}
        {paso === 2 && "Al final tenés 1000 + 200 = 1200 Bs"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 5 — Interés simple: la fórmula I = C · r · t / 100
// Ejemplo: C=2000, r=10%, t=3 años → I = 600
// ═════════════════════════════════════════════════════════════════════════════
function EscenaInteresFormula() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La fórmula del interés simple:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ position: "relative", width: "100%", maxWidth: 420, minHeight: 170, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>

          {/* Fórmula simbólica */}
          <motion.div
            style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif", display: "flex", alignItems: "center", gap: 8 }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          >
            I = <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
              <span style={{ padding: "0 8px" }}>C · r · t</span>
              <span style={{ borderTop: "2.5px solid currentColor", width: "100%", marginTop: 3 }} />
              <span style={{ padding: "0 8px", marginTop: 3 }}>100</span>
            </span>
          </motion.div>

          {/* Leyenda */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: 13, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380, lineHeight: 1.6 }}
          >
            <strong style={{ color: COLOR_BASE }}>C</strong> = capital ·{" "}
            <strong style={{ color: COLOR_EXP }}>r</strong> = tasa (%) ·{" "}
            <strong style={{ color: COLOR_OK }}>t</strong> = tiempo (años)
          </motion.div>

          {/* Ejemplo numérico */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginTop: 6, textAlign: "center" }}
          >
            Ejemplo: <span style={{ color: COLOR_BASE }}>C=2000</span>,{" "}
            <span style={{ color: COLOR_EXP }}>r=10%</span>,{" "}
            <span style={{ color: COLOR_OK }}>t=3 años</span>
          </motion.div>

          {/* Sustitución */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", color: COLOR_BASE, fontWeight: 700 }}
          >
            I = (2000 · 10 · 3) / 100 = 60000 / 100
          </motion.div>

          {/* Resultado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{ fontSize: 26, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}
          >
            I = 600 Bs ✓
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Apliquémosla a un ejemplo"}
        {paso === 1 && "Sustituimos los valores"}
        {paso === 2 && "Operamos: 2000·10·3 = 60000, divido 100"}
        {paso === 3 && "El interés ganado es 600 Bs"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Mini-reto
// 5 obreros pintan en 6 días. ¿En cuántos lo pintan 3 obreros?
// Inversa: 5·6 = 3·x → x = 10 días
// ═════════════════════════════════════════════════════════════════════════════
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "10 días", correcta: true },
    { label: "3,6 días", correcta: false },
    { label: "30 días", correcta: false },
    { label: "8 días", correcta: false },
  ], []);

  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>5 obreros pintan una casa en 6 días. ¿En cuántos días lo hacen 3 obreros?</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "20px 30px", background: "var(--bg-card)", borderRadius: 20,
          border: "1px solid var(--border)", display: "grid",
          gridTemplateColumns: "1fr 1fr", rowGap: 10, columnGap: 30, textAlign: "center",
          fontFamily: "var(--font-crimson), serif",
        }}
      >
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>OBREROS</div>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>DÍAS</div>
        <div style={{ fontSize: 24, color: COLOR_BASE, fontWeight: 700 }}>5</div>
        <div style={{ fontSize: 24, color: COLOR_BASE, fontWeight: 700 }}>6</div>
        <div style={{ fontSize: 24, color: COLOR_OK, fontWeight: 700 }}>3</div>
        <div style={{ fontSize: 24, color: COLOR_EXP, fontWeight: 800 }}>x</div>
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Es INVERSA (menos obreros = más días). 5·6 = 3·x → x = 30/3 = <strong>10 días</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Es <em>inversa</em>: menos obreros, más días. Multiplicamos en la misma fila: 5·6 = 3·x → x = <strong>10 días</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
