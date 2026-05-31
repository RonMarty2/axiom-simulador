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
      tituloUnidad="Razones y proporciones"
      escenas={[
        { titulo: "¿Qué es una razón?", componente: EscenaRazon },
        { titulo: "Razones equivalentes", componente: EscenaEquivalentes },
        { titulo: "Proporción", componente: EscenaProporcion },
        { titulo: "Propiedad fundamental", componente: EscenaPropiedad },
        { titulo: "Despejar el término desconocido", componente: EscenaDespejar },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — Razón: comparación entre dos cantidades
// 3 manzanas por cada 2 naranjas → razón 3:2
// ═════════════════════════════════════════════════════════════════════════════
function EscenaRazon() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una <strong>razón</strong> compara dos cantidades:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={170}>

          {/* 3 manzanas rojas */}
          {[0, 1, 2].map((k) => (
            <motion.div key={`m${k}`}
              style={{ position: "absolute", left: 60 + k * 45, top: 40, fontSize: 36 }}
              initial={{ opacity: 0, scale: 0, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: k * 0.1 }}
            >🍎</motion.div>
          ))}
          {/* 2 naranjas */}
          {[0, 1].map((k) => (
            <motion.div key={`n${k}`}
              style={{ position: "absolute", left: 240 + k * 45, top: 40, fontSize: 36 }}
              initial={{ opacity: 0, scale: 0, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 + k * 0.1 }}
            >🍊</motion.div>
          ))}

          {/* Etiquetas */}
          <motion.div style={{ position: "absolute", left: 75, top: 100, fontSize: 18, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            3 manzanas
          </motion.div>
          <motion.div style={{ position: "absolute", left: 255, top: 100, fontSize: 18, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            2 naranjas
          </motion.div>

          {/* Razón: 3:2 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{
              position: "absolute", left: 0, top: 135, width: "100%", textAlign: "center",
              fontSize: 26, fontFamily: "var(--font-crimson), serif", color: COLOR_OK, fontWeight: 800,
            }}
          >
            Razón = <span style={{ color: "#dc2626" }}>3</span> : <span style={{ color: "#ea580c" }}>2</span>
            {paso >= 2 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginLeft: 12, fontSize: 18, color: "var(--fg-muted)" }}>
                (o también 3/2)
              </motion.span>
            )}
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 2 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            Razón entre a y b: <strong>a : b</strong> o <strong>a / b</strong>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tenemos 3 manzanas y 2 naranjas"}
        {paso === 1 && "La razón entre ellas es 3 a 2"}
        {paso === 2 && "Se puede escribir como 3:2 o como fracción 3/2"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — Razones equivalentes (1:2 = 2:4 = 3:6)
// ═════════════════════════════════════════════════════════════════════════════
function EscenaEquivalentes() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Distintas razones pueden valer <strong>lo mismo</strong>:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap", minHeight: 140 }}>
          {/* 1/2 */}
          <FraccionVisual num="1" den="2" colorNum={COLOR_BASE} colorDen={COLOR_BASE} />

          {/* = */}
          <motion.span animate={{ opacity: paso >= 1 ? 1 : 0 }} style={{ fontSize: 30, color: COLOR_EXP, fontWeight: 700 }}>=</motion.span>

          {/* 2/4 */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }} transition={{ type: "spring" }}>
            <FraccionVisual num="2" den="4" colorNum={COLOR_OK} colorDen={COLOR_OK} />
          </motion.div>

          {/* = */}
          <motion.span animate={{ opacity: paso >= 2 ? 1 : 0 }} style={{ fontSize: 30, color: COLOR_EXP, fontWeight: 700 }}>=</motion.span>

          {/* 3/6 */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }} transition={{ type: "spring" }}>
            <FraccionVisual num="3" den="6" colorNum={COLOR_OK} colorDen={COLOR_OK} />
          </motion.div>
        </div>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 14, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            💡 Si multiplicás arriba y abajo por el mismo número → razón equivalente
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 1/2 — tocá para ver una razón equivalente"}
        {paso === 1 && "2/4 vale lo mismo (×2 arriba y abajo)"}
        {paso === 2 && "Y 3/6 también (×3 arriba y abajo)"}
        {paso === 3 && "Las tres razones son equivalentes"}
      </p>
    </div>
  );
}

function FraccionVisual({ num, den, colorNum = COLOR_BASE, colorDen = COLOR_BASE, sizeNum = 44 }: {
  num: string; den: string; colorNum?: string; colorDen?: string; sizeNum?: number;
}) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", lineHeight: 1, verticalAlign: "middle" }}>
      <span style={{ ...numGrande(colorNum, sizeNum) }}>{num}</span>
      <span style={{ borderTop: `2.5px solid ${colorNum}`, width: 50, margin: "4px 0" }} />
      <span style={{ ...numGrande(colorDen, sizeNum) }}>{den}</span>
    </span>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — Proporción: igualdad de dos razones
// ═════════════════════════════════════════════════════════════════════════════
function EscenaProporcion() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una <strong>proporción</strong> es la igualdad de dos razones:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180 }}
          style={{ position: "relative", width: "100%", maxWidth: 360, minHeight: 130, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}
        >
          <FraccionVisual num="a" den="b" colorNum={COLOR_BASE} colorDen={COLOR_BASE} sizeNum={36} />
          <span style={{ fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}>=</span>
          <FraccionVisual num="c" den="d" colorNum={COLOR_BASE} colorDen={COLOR_BASE} sizeNum={36} />

          {/* Etiquetas: extremos y medios */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ position: "absolute", top: -20, left: 50, fontSize: 11, color: COLOR_OK, fontWeight: 700, letterSpacing: 1 }}>
            ↓ extremo
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ position: "absolute", top: -20, right: 50, fontSize: 11, color: COLOR_OK, fontWeight: 700, letterSpacing: 1 }}>
            extremo ↓
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            style={{ position: "absolute", bottom: -20, left: 70, fontSize: 11, color: COLOR_EXP, fontWeight: 700, letterSpacing: 1 }}>
            ↑ medio
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
            style={{ position: "absolute", bottom: -20, right: 70, fontSize: 11, color: COLOR_EXP, fontWeight: 700, letterSpacing: 1 }}>
            medio ↑
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ fontSize: 14, color: "var(--fg-muted)", textAlign: "center", maxWidth: 380 }}>
          Ejemplo concreto: <strong style={{ color: COLOR_BASE }}>1/2 = 3/6</strong> (1 y 6 son extremos, 2 y 3 son medios)
        </motion.div>
      </div>

      <p style={hint()}>Una proporción tiene 4 términos: 2 extremos y 2 medios</p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — Propiedad fundamental: producto de extremos = producto de medios
// 1·6 = 2·3 → 6 = 6 ✓
// ═════════════════════════════════════════════════════════════════════════════
function EscenaPropiedad() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>La <strong>propiedad fundamental</strong>: producto de extremos = producto de medios</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={380} h={170}>

          {/* Proporción 1/2 = 3/6 */}
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <FraccionVisual num="1" den="2" colorNum={COLOR_BASE} colorDen={COLOR_BASE} sizeNum={38} />
            <span style={{ fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}>=</span>
            <FraccionVisual num="3" den="6" colorNum={COLOR_BASE} colorDen={COLOR_BASE} sizeNum={38} />
          </div>

          {/* Línea curva uniendo extremos (1 y 6) — aparece paso 1 */}
          <motion.svg style={{ position: "absolute", left: 0, top: 0, width: 380, height: 170, pointerEvents: "none" }}>
            <motion.path d="M 132 50 Q 190 0 248 50" fill="none"
              stroke={COLOR_OK} strokeWidth={2} strokeDasharray="4 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 1 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.path d="M 168 100 Q 190 145 212 100" fill="none"
              stroke={COLOR_EXP} strokeWidth={2} strokeDasharray="4 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 2 ? 1 : 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.svg>

          {/* Resultado: 1·6 = 2·3 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{
              position: "absolute", left: 0, bottom: 0, width: "100%", textAlign: "center",
              fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800, color: COLOR_OK,
            }}
          >
            1 · 6 = 2 · 3 → 6 = 6 ✓
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>a / b = c / d</strong>  ⟹  <strong>a · d = b · c</strong>
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 En la proporción 1/2 = 3/6"}
        {paso === 1 && "Producto de extremos: 1 · 6"}
        {paso === 2 && "Producto de medios: 2 · 3"}
        {paso === 3 && "Y son iguales: 6 = 6 ✓ — el secreto para despejar"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 5 — Despejar el término desconocido
// 4/x = 2/3 → 4·3 = 2·x → x = 6
// ═════════════════════════════════════════════════════════════════════════════
function EscenaDespejar() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Si falta un término, la propiedad fundamental lo despeja:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={380} h={180}>

          {/* 4/x = 2/3 */}
          <div style={{ position: "absolute", left: 0, top: 10, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <FraccionVisual num="4" den="x" colorNum={COLOR_BASE} colorDen={COLOR_EXP} sizeNum={36} />
            <span style={{ fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}>=</span>
            <FraccionVisual num="2" den="3" colorNum={COLOR_BASE} colorDen={COLOR_BASE} sizeNum={36} />
          </div>

          {/* Paso 1: aplicar la propiedad → 4·3 = 2·x */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{
              position: "absolute", left: 0, top: 90, width: "100%", textAlign: "center",
              fontSize: 22, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif",
            }}
          >
            4 · 3 = 2 · x
          </motion.div>

          {/* Paso 2: 12 = 2x */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{
              position: "absolute", left: 0, top: 122, width: "100%", textAlign: "center",
              fontSize: 22, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif",
            }}
          >
            12 = 2x → x = 12/2
          </motion.div>

          {/* Paso 3: x = 6 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 180 }}
            style={{
              position: "absolute", left: 0, top: 152, width: "100%", textAlign: "center",
              fontSize: 26, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif",
            }}
          >
            x = 6 ✓
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Falta x. ¿Cuánto vale?"}
        {paso === 1 && "Producto de extremos = producto de medios: 4·3 = 2·x"}
        {paso === 2 && "Despejamos: x = 12/2"}
        {paso === 3 && "x = 6 ✓"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Mini-reto
// 5/8 = x/24 → 5·24 = 8·x → x = 15
// ═════════════════════════════════════════════════════════════════════════════
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "15", correcta: true },
    { label: "120", correcta: false },
    { label: "3", correcta: false },
    { label: "12", correcta: false },
  ], []);

  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Aplicá la propiedad fundamental para encontrar x:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 40px", background: "var(--bg-card)", borderRadius: 20,
          border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
        }}
      >
        <FraccionVisual num="5" den="8" colorNum={COLOR_BASE} colorDen={COLOR_BASE} sizeNum={40} />
        <span style={{ fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}>=</span>
        <FraccionVisual num="x" den="24" colorNum={COLOR_EXP} colorDen={COLOR_BASE} sizeNum={40} />
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
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{
              padding: 16, borderRadius: 14, marginTop: 6,
              background: opciones[elegida].correcta ? "#ecfdf5" : "#fef2f2",
              border: `1px solid ${opciones[elegida].correcta ? COLOR_OK : "#fca5a5"}`,
              fontSize: 14, color: "var(--fg-primary)",
            }}
          >
            {opciones[elegida].correcta ? (
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> 5·24 = 8·x → 120 = 8x → x = <strong>15</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Producto de extremos = producto de medios: 5·24 = 8·x → 120 = 8x → x = <strong>15</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
