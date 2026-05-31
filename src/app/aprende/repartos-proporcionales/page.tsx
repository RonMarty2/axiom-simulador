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
      tituloUnidad="Repartos proporcionales"
      escenas={[
        { titulo: "El problema del reparto", componente: EscenaIntro },
        { titulo: "Reparto directo: paso a paso", componente: EscenaDirecto },
        { titulo: "Reparto inverso", componente: EscenaInverso },
        { titulo: "Regla de compañía", componente: EscenaCompania },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — El problema del reparto justo
// ═════════════════════════════════════════════════════════════════════════════
function EscenaIntro() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Repartir 600 Bs entre 3 personas — pero <strong>no en partes iguales</strong>:</p>

      <div onClick={() => setPaso((p) => p >= 1 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={420} h={170}>

          {/* Bolsa central */}
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 50 }}
          >
            💰
            <div style={{ fontSize: 22, color: COLOR_BASE, fontWeight: 800, fontFamily: "var(--font-crimson), serif", marginTop: 4 }}>
              600 Bs
            </div>
          </motion.div>

          {/* Tres personas con sus "partes" */}
          {[
            { emoji: "🧑", nombre: "A", partes: 2, color: "#3b82f6" },
            { emoji: "👩", nombre: "B", partes: 3, color: "#10b981" },
            { emoji: "🧓", nombre: "C", partes: 5, color: "#f59e0b" },
          ].map((p, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, y: 20 }}
              animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: k * 0.15, type: "spring" }}
              style={{
                position: "absolute", left: 30 + k * 130, top: 130,
                width: 110, textAlign: "center",
              }}
            >
              <div style={{ fontSize: 30 }}>{p.emoji}</div>
              <div style={{ fontSize: 13, color: p.color, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
                {p.nombre}: {p.partes} partes
              </div>
            </motion.div>
          ))}
        </Stage>

        <motion.div animate={{ opacity: paso >= 1 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 Cada uno recibe <strong>proporcional</strong> a su número de partes
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tenés 600 Bs para repartir entre 3 personas"}
        {paso === 1 && "Pero A merece 2 partes, B merece 3 y C merece 5. ¿Cuánto recibe cada uno?"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — REPARTO DIRECTO
// 600 entre 2:3:5 → suma=10 → "valor de cada parte" = 600/10 = 60
// Luego: 2·60 = 120, 3·60 = 180, 5·60 = 300
// ═════════════════════════════════════════════════════════════════════════════
function EscenaDirecto() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La técnica: sumar las partes y dividir el total entre esa suma:</p>

      <div onClick={() => setPaso((p) => p >= 4 ? 0 : p + 1)} style={cajaAnim()}>
        <Stage w={420} h={200}>

          {/* Paso 1: sumar partes */}
          <motion.div
            initial={{ opacity: 0 }} animate={paso >= 0 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, textAlign: "center" }}
          >
            Total partes: <span style={{ color: "#3b82f6" }}>2</span> + <span style={{ color: "#10b981" }}>3</span> + <span style={{ color: "#f59e0b" }}>5</span>
            {paso >= 1 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginLeft: 8, color: COLOR_OK, fontSize: 22 }}>
                = 10
              </motion.span>
            )}
          </motion.div>

          {/* Paso 2: valor de cada parte */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{ position: "absolute", left: 0, top: 50, width: "100%", textAlign: "center", fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}
          >
            Valor de cada parte: 600 ÷ 10 = <span style={{ color: COLOR_OK, fontSize: 22 }}>60 Bs</span>
          </motion.div>

          {/* Paso 3+: cuánto recibe cada uno */}
          {[
            { nombre: "A", partes: 2, monto: 120, color: "#3b82f6" },
            { nombre: "B", partes: 3, monto: 180, color: "#10b981" },
            { nombre: "C", partes: 5, monto: 300, color: "#f59e0b" },
          ].map((p, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, x: -10 }}
              animate={paso >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: k * 0.15 }}
              style={{
                position: "absolute", left: 30 + k * 130, top: 110,
                width: 120, textAlign: "center",
              }}
            >
              <div style={{ fontSize: 14, color: p.color, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
                {p.nombre}: {p.partes} × 60 =
              </div>
              <div style={{ fontSize: 22, color: p.color, fontWeight: 800, fontFamily: "var(--font-crimson), serif", marginTop: 4 }}>
                {p.monto} Bs
              </div>
            </motion.div>
          ))}

          {/* Verificación al final */}
          <motion.div
            initial={{ opacity: 0 }} animate={paso >= 4 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, bottom: -10, width: "100%", textAlign: "center", fontSize: 13, color: "var(--fg-muted)", fontStyle: "italic" }}
          >
            ✓ Verificación: 120 + 180 + 300 = 600
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Empezamos sumando las partes: 2+3+5"}
        {paso === 1 && "Total = 10 partes"}
        {paso === 2 && "Cada parte vale: 600 ÷ 10 = 60 Bs"}
        {paso === 3 && "Multiplicamos las partes de cada uno por 60"}
        {paso === 4 && "Y la suma da 600 Bs ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — REPARTO INVERSO
// Repartir 220 inversamente a 2, 3, 5 → primero invertir: 1/2, 1/3, 1/5
// MCM(2,3,5)=30 → equivalente a 15, 10, 6 (multiplicado por 30) → suma=31
// 220/31 ≈ no entero. Cambio de ejemplo: repartir 310 inversamente a 2, 3, 5
// 1/2 = 15/30, 1/3 = 10/30, 1/5 = 6/30. Suma = 31/30. Valor = 310/31 = 10.
// Entonces 10·15 = 150, 10·10 = 100, 10·6 = 60. Verifica: 310 ✓
// ═════════════════════════════════════════════════════════════════════════════
function EscenaInverso() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>En el <strong>inverso</strong>: invertimos los números y luego repartimos directo:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ width: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>

          <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, textAlign: "center" }}>
            Repartir <span style={{ color: COLOR_OK }}>310 Bs</span> inversamente a 2, 3, 5
          </div>

          {/* Paso 1: invertir */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, textAlign: "center" }}
          >
            Invertimos: <span style={{ color: COLOR_EXP }}>1/2, 1/3, 1/5</span>
          </motion.div>

          {/* Paso 2: pasar al MCM(2,3,5) = 30 → 15, 10, 6 */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, textAlign: "center", lineHeight: 1.5 }}
          >
            Llevamos al mismo denominador (30):<br />
            <span style={{ color: COLOR_OK }}>15/30, 10/30, 6/30</span>
            <span style={{ color: "var(--fg-muted)", fontSize: 14, fontStyle: "italic" }}> → repartimos como 15 : 10 : 6</span>
          </motion.div>

          {/* Paso 3: cada uno recibe */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 4, fontFamily: "var(--font-crimson), serif" }}
          >
            {[
              { nombre: "A", monto: 150, color: "#3b82f6" },
              { nombre: "B", monto: 100, color: "#10b981" },
              { nombre: "C", monto: 60, color: "#f59e0b" },
            ].map((p, k) => (
              <div key={k} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, color: p.color, fontWeight: 700 }}>{p.nombre}</div>
                <div style={{ fontSize: 22, color: p.color, fontWeight: 800 }}>{p.monto} Bs</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 13, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 Reparto inverso = reparto directo de los <strong>recíprocos</strong>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Vamos a repartir 310 inversamente"}
        {paso === 1 && "Primero invertimos cada número (recíproco)"}
        {paso === 2 && "Las llevamos al MCM 30 → quedan 15:10:6"}
        {paso === 3 && "Aplicamos reparto directo con esos números"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — Regla de compañía: capital × tiempo
// Socios A (1000, 6 meses) y B (1500, 4 meses) reparten 2400 de ganancia
// A: 1000·6 = 6000; B: 1500·4 = 6000 → 1:1 → 1200 cada uno
// Mejor ejemplo: A (1000, 6) → 6000;  B (2000, 3) → 6000 → empate (no muestra nada)
// Cambio: A (1000, 6) → 6000;  B (3000, 4) → 12000 → razón 1:2.
// Total partes = 3. 2400/3 = 800. A=800, B=1600.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaCompania() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>En una sociedad: el reparto considera <strong>capital × tiempo</strong>:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ width: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>

          <div style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, textAlign: "center", maxWidth: 380, lineHeight: 1.5 }}>
            Ganancia <strong style={{ color: COLOR_OK }}>2400 Bs</strong> a repartir entre:<br />
            <span style={{ color: "#3b82f6" }}>A: 1000 Bs por 6 meses</span>{" · "}
            <span style={{ color: "#f59e0b" }}>B: 3000 Bs por 4 meses</span>
          </div>

          {/* Paso 1: calcular capital × tiempo */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ display: "flex", gap: 30, marginTop: 4, fontFamily: "var(--font-crimson), serif" }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, color: "#3b82f6", fontWeight: 700 }}>A: 1000 × 6</div>
              <div style={{ fontSize: 22, color: "#3b82f6", fontWeight: 800 }}>= 6 000</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, color: "#f59e0b", fontWeight: 700 }}>B: 3000 × 4</div>
              <div style={{ fontSize: 22, color: "#f59e0b", fontWeight: 800 }}>= 12 000</div>
            </div>
          </motion.div>

          {/* Paso 2: razón 1:2 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}
          >
            Razón <span style={{ color: "#3b82f6" }}>6000</span> : <span style={{ color: "#f59e0b" }}>12000</span> = <strong>1 : 2</strong> (3 partes)
          </motion.div>

          {/* Paso 3: reparto final */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ display: "flex", gap: 30, marginTop: 6, fontFamily: "var(--font-crimson), serif" }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#3b82f6", fontWeight: 700 }}>A (1 parte)</div>
              <div style={{ fontSize: 24, color: "#3b82f6", fontWeight: 800 }}>800 Bs</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700 }}>B (2 partes)</div>
              <div style={{ fontSize: 24, color: "#f59e0b", fontWeight: 800 }}>1600 Bs</div>
            </div>
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Dos socios, distinto capital y distinto tiempo"}
        {paso === 1 && "Calculamos capital × tiempo de cada uno"}
        {paso === 2 && "La razón entre esos productos es 1:2 (3 partes total)"}
        {paso === 3 && "2400/3 = 800. A recibe 1×800, B recibe 2×800"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Mini-reto
// Repartir 480 entre tres niños proporcionalmente a 1, 3, 4 → suma=8, parte=60
// Niño 3 recibe 4·60 = 240
// ═════════════════════════════════════════════════════════════════════════════
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "240 Bs", correcta: true },
    { label: "120 Bs", correcta: false },
    { label: "192 Bs", correcta: false },
    { label: "60 Bs", correcta: false },
  ], []);

  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Repartí 480 Bs proporcionalmente a 1, 3 y 4. ¿Cuánto recibe el tercero (4)?</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "20px 30px", background: "var(--bg-card)", borderRadius: 20,
          border: "1px solid var(--border)", display: "flex", justifyContent: "space-around",
          fontFamily: "var(--font-crimson), serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#3b82f6", fontWeight: 700 }}>Niño 1</div>
          <div style={{ fontSize: 28, color: "#3b82f6", fontWeight: 800 }}>1</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#10b981", fontWeight: 700 }}>Niño 2</div>
          <div style={{ fontSize: 28, color: "#10b981", fontWeight: 800 }}>3</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#f59e0b", fontWeight: 700 }}>Niño 3</div>
          <div style={{ fontSize: 28, color: "#f59e0b", fontWeight: 800 }}>4</div>
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Suma de partes: 1+3+4 = 8. Cada parte vale 480/8 = 60. El tercero recibe 4·60 = <strong>240 Bs</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Suma de partes = 8. Valor de cada parte = 480/8 = 60. El tercero (4 partes) recibe 4·60 = <strong>240 Bs</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
