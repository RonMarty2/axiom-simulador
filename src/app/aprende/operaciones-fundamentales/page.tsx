"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  escenaWrap, subtitulo, hint, numGrande, cajaAnim, cajitaFormula, Stage,
} from "../_components/atoms";

// ─────────────────────────────────────────────────────────────────────────────
// Lección: Operaciones fundamentales (Unidad 01)
// suma, resta, multiplicación, división — y un mini-reto.
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Operaciones fundamentales"
      escenas={[
        { titulo: "Suma: juntar cantidades", componente: EscenaSuma },
        { titulo: "Resta: quitar de un total", componente: EscenaResta },
        { titulo: "Multiplicación: suma repetida", componente: EscenaMultiplicacion },
        { titulo: "División: repartir en partes iguales", componente: EscenaDivision },
        { titulo: "Jerarquía: PEMDAS", componente: EscenaJerarquia },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 1 — SUMA con animación de "juntar" cantidades
// 3 + 2 = 5, con bolitas que se mueven al mismo lado.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaSuma() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Sumar es <strong>juntar</strong> cantidades. Mirá cómo:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={160}>

          {/* GRUPO IZQUIERDA: 3 bolitas */}
          {[0, 1, 2].map((k) => (
            <motion.div key={`L${k}`}
              style={{ position: "absolute", width: 30, height: 30, borderRadius: "50%", background: COLOR_BASE }}
              initial={{ left: 60 + k * 35, top: 60, opacity: 0, scale: 0 }}
              animate={
                paso === 0 ? { left: 60 + k * 35, top: 60, opacity: 1, scale: 1 } :
                             { left: 240 + k * 35, top: 60, opacity: 1, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: k * 0.08 }}
            />
          ))}

          {/* GRUPO DERECHA: 2 bolitas */}
          {[0, 1].map((k) => (
            <motion.div key={`R${k}`}
              style={{ position: "absolute", width: 30, height: 30, borderRadius: "50%", background: COLOR_EXP }}
              initial={{ left: 260 + k * 35, top: 60, opacity: 0, scale: 0 }}
              animate={
                paso === 0 ? { left: 260 + k * 35, top: 60, opacity: 1, scale: 1 } :
                             { left: 345 + k * 35, top: 60, opacity: 1, scale: 1, background: COLOR_OK }
              }
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.25 + k * 0.08 }}
            />
          ))}

          {/* Etiqueta numérica */}
          <motion.div style={{ position: "absolute", left: 0, top: 110, width: "100%", textAlign: "center" }}>
            <AnimatePresence mode="wait">
              {paso === 0 && (
                <motion.span key="p0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontSize: 30, color: "var(--fg-muted)", fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
                  <span style={{ color: COLOR_BASE }}>3</span>{" + "}<span style={{ color: COLOR_EXP }}>2</span>{" = ?"}
                </motion.span>
              )}
              {paso >= 1 && (
                <motion.span key="p1" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontSize: 30, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
                  <span style={{ color: COLOR_BASE }}>3</span>{" + "}<span style={{ color: COLOR_EXP }}>2</span>{" = "}
                  <motion.span animate={paso >= 2 ? { scale: [1, 1.3, 1] } : {}} style={{ display: "inline-block" }}>
                    <strong>5</strong>
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Stage>

        <motion.div
          animate={{ opacity: paso >= 3 ? 1 : 0 }}
          style={cajitaFormula()}
        >
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>Propiedad conmutativa:</strong> a + b = b + a
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tocá para juntar los dos grupos"}
        {paso === 1 && "Las 2 bolitas violetas se unen al grupo azul…"}
        {paso === 2 && "Y contamos el total: 5 bolitas"}
        {paso === 3 && "Sumar no depende del orden: 3+2 = 2+3"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 2 — RESTA: quitar de un total
// 7 − 3 = 4, con bolitas que "salen" del grupo.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaResta() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Restar es <strong>quitar</strong> una cantidad de un total:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={160}>

          {/* 7 bolitas — las 3 últimas se van */}
          {[0, 1, 2, 3, 4, 5, 6].map((k) => {
            const seVa = k >= 4; // últimas 3
            return (
              <motion.div key={k}
                style={{ position: "absolute", width: 30, height: 30, borderRadius: "50%" }}
                initial={{ left: 50 + k * 40, top: 60, opacity: 0, scale: 0, background: COLOR_BASE }}
                animate={
                  paso === 0 ? { left: 50 + k * 40, top: 60, opacity: 1, scale: 1, background: COLOR_BASE } :
                  paso === 1 ? (seVa
                    ? { left: 50 + k * 40, top: 60, opacity: 0.3, scale: 0.7, background: COLOR_BAD }
                    : { left: 50 + k * 40, top: 60, opacity: 1, scale: 1, background: COLOR_BASE }) :
                  paso >= 2 ? (seVa
                    ? { left: 50 + k * 40, top: 130, opacity: 0, scale: 0, background: COLOR_BAD }
                    : { left: 50 + k * 40, top: 60, opacity: 1, scale: 1.1, background: COLOR_OK }) :
                  {}
                }
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: paso === 0 ? k * 0.05 : (seVa ? 0.1 : 0) }}
              />
            );
          })}

          {/* Etiqueta */}
          <motion.div style={{ position: "absolute", left: 0, top: 110, width: "100%", textAlign: "center", fontSize: 30, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            <AnimatePresence mode="wait">
              {paso === 0 && (
                <motion.span key="p0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: "var(--fg-muted)" }}>
                  <span style={{ color: COLOR_BASE }}>7</span>{" − "}<span style={{ color: COLOR_BAD }}>3</span>{" = ?"}
                </motion.span>
              )}
              {paso === 1 && (
                <motion.span key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: "var(--fg-muted)" }}>
                  Quitamos <span style={{ color: COLOR_BAD }}>3</span>…
                </motion.span>
              )}
              {paso >= 2 && (
                <motion.span key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: COLOR_BASE }}>
                  7 − 3 = <span style={{ color: COLOR_OK, fontWeight: 800 }}>4</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 2 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>Cuidado:</strong> la resta <em>no</em> es conmutativa: 7−3 ≠ 3−7
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Tenés 7 bolitas. Tocá para quitar 3"}
        {paso === 1 && "Las 3 últimas se desvanecen…"}
        {paso === 2 && "Quedan 4 bolitas"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 3 — MULTIPLICACIÓN como suma repetida
// 3 × 4 = 4 + 4 + 4 = 12 (visualizado como filas de bolitas).
// ═════════════════════════════════════════════════════════════════════════════
function EscenaMultiplicacion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Multiplicar es <strong>sumar el mismo número varias veces</strong>:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={170}>

          {/* Grilla 3×4 de bolitas */}
          {[0, 1, 2].map((fila) =>
            [0, 1, 2, 3].map((col) => {
              const k = fila * 4 + col;
              return (
                <motion.div key={k}
                  style={{ position: "absolute", width: 26, height: 26, borderRadius: "50%", background: COLOR_BASE }}
                  initial={{ left: 100 + col * 35, top: 20 + fila * 40, opacity: 0, scale: 0 }}
                  animate={
                    paso === 0 ? { left: 100 + col * 35, top: 20 + fila * 40, opacity: 1, scale: 1 } :
                    paso >= 1  ? { left: 100 + col * 35, top: 20 + fila * 40, opacity: 1, scale: 1, background: paso >= 2 ? COLOR_OK : COLOR_BASE } :
                    {}
                  }
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: paso === 0 ? (fila * 0.15 + col * 0.05) : 0 }}
                />
              );
            })
          )}

          {/* Llaves a la derecha indicando que cada fila tiene 4 */}
          {[0, 1, 2].map((fila) => (
            <motion.div key={`l${fila}`}
              style={{ position: "absolute", left: 232, top: 28 + fila * 40, fontSize: 14, color: COLOR_EXP, fontWeight: 700 }}
              initial={{ opacity: 0, x: -5 }}
              animate={paso >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
              transition={{ delay: paso === 1 ? fila * 0.1 : 0 }}
            >
              = 4
            </motion.div>
          ))}

          {/* Etiqueta abajo */}
          <motion.div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", textAlign: "center", fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <AnimatePresence mode="wait">
              {paso === 0 && (
                <motion.span key="p0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: "var(--fg-muted)" }}>
                  <span style={{ color: COLOR_EXP }}>3</span>{" × "}<span style={{ color: COLOR_BASE }}>4</span>
                </motion.span>
              )}
              {paso === 1 && (
                <motion.span key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: COLOR_BASE }}>
                  3 × 4 = 4 + 4 + 4
                </motion.span>
              )}
              {paso >= 2 && (
                <motion.span key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: COLOR_BASE }}>
                  = <span style={{ color: COLOR_OK, fontSize: 30 }}>12</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>Sí es conmutativa:</strong> 3 × 4 = 4 × 3
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 3 filas de 4 bolitas. Tocá para ver"}
        {paso === 1 && "Cada fila suma 4 → tenemos 3 filas"}
        {paso === 2 && "Total: 12 bolitas"}
        {paso === 3 && "También: 4 × 3 = 12. El orden no importa"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 4 — DIVISIÓN: repartir en partes iguales
// 12 ÷ 3 = 4, con 12 bolitas que se reparten en 3 grupos.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaDivision() {
  const [paso, setPaso] = useState(0);

  const posFinal = (k: number) => {
    const grupo = k % 3; // qué grupo (0, 1, 2)
    const idx = Math.floor(k / 3); // posición dentro del grupo
    return { left: 60 + grupo * 130 + idx * 18, top: 40 };
  };

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Dividir es <strong>repartir</strong> en partes iguales:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={170}>

          {/* 12 bolitas — empiezan amontonadas, se reparten en 3 grupos */}
          {Array.from({ length: 12 }).map((_, k) => {
            const fila = Math.floor(k / 4);
            const col = k % 4;
            const inicio = { left: 130 + col * 35, top: 20 + fila * 30 };
            const final = posFinal(k);
            return (
              <motion.div key={k}
                style={{ position: "absolute", width: 24, height: 24, borderRadius: "50%", background: COLOR_BASE }}
                initial={{ left: inicio.left, top: inicio.top, opacity: 0, scale: 0 }}
                animate={
                  paso === 0 ? { left: inicio.left, top: inicio.top, opacity: 1, scale: 1, background: COLOR_BASE } :
                  paso >= 1  ? { left: final.left, top: final.top + 60, opacity: 1, scale: 1, background: paso >= 2 ? COLOR_OK : [COLOR_EXP, COLOR_OK][k % 3 % 2] } :
                  {}
                }
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: paso === 1 ? k * 0.05 : k * 0.03 }}
              />
            );
          })}

          {/* Tres recuadros indicando los grupos */}
          {[0, 1, 2].map((g) => (
            <motion.div key={`g${g}`}
              style={{
                position: "absolute", left: 50 + g * 130, top: 90,
                width: 110, height: 50, borderRadius: 10,
                border: `2px dashed ${COLOR_EXP}`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={paso >= 1 ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: paso === 1 ? g * 0.1 : 0 }}
            />
          ))}

          {/* Etiqueta abajo */}
          <motion.div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", textAlign: "center", fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <AnimatePresence mode="wait">
              {paso === 0 && (
                <motion.span key="p0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: "var(--fg-muted)" }}>
                  <span style={{ color: COLOR_BASE }}>12</span>{" ÷ "}<span style={{ color: COLOR_EXP }}>3</span>{" = ?"}
                </motion.span>
              )}
              {paso === 1 && (
                <motion.span key="p1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: COLOR_BASE }}>
                  Repartimos en 3 grupos iguales…
                </motion.span>
              )}
              {paso >= 2 && (
                <motion.span key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: COLOR_BASE }}>
                  12 ÷ 3 = <span style={{ color: COLOR_OK, fontSize: 30 }}>4</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </Stage>

        <motion.div animate={{ opacity: paso >= 2 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>Cuidado:</strong> división no es conmutativa. Y nunca: ÷ 0
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 12 bolitas. Tocá para repartirlas"}
        {paso === 1 && "Se forman 3 grupos…"}
        {paso === 2 && "Cada grupo tiene 4 bolitas"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 5 — JERARQUÍA DE OPERACIONES (PEMDAS)
// 2 + 3 × 4 — mostrar por qué primero × antes que +.
// ═════════════════════════════════════════════════════════════════════════════
function EscenaJerarquia() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>¿En qué orden se resuelve una expresión con varias operaciones?</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <Stage w={420} h={160}>

          {/* Expresión: 2 + 3 × 4 */}
          <motion.span style={{ position: "absolute", left: 80, top: 50, ...numGrande(COLOR_BASE, 60) }}
            animate={paso >= 3 ? { left: 145, top: 50, opacity: 0, scale: 0 } : {}}
          >2</motion.span>
          <motion.span style={{ position: "absolute", left: 130, top: 60, fontSize: 40, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 3 ? { opacity: 0, scale: 0 } : {}}
          >+</motion.span>

          {/* "3" y "4" se acercan en el paso 1 y se fusionan en paso 2 (resultado 12) */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_BASE, 60) }}
            initial={{ left: 180, top: 50 }}
            animate={
              paso < 1 ? { left: 180, top: 50, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 210, top: 50, opacity: 1, scale: 1.1 } :
              paso >= 2 ? { left: 235, top: 50, opacity: 0, scale: 1.3 } :
              {}
            }
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >3</motion.span>

          <motion.span style={{ position: "absolute", left: 225, top: 60, fontSize: 40, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 2 ? { opacity: 0, scale: 0 } : {}}
          >×</motion.span>

          <motion.span style={{ position: "absolute", ...numGrande(COLOR_BASE, 60) }}
            initial={{ left: 260, top: 50 }}
            animate={
              paso < 1 ? { left: 260, top: 50, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 245, top: 50, opacity: 1, scale: 1.1 } :
              paso >= 2 ? { left: 235, top: 50, opacity: 0, scale: 1.3 } :
              {}
            }
            transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.05 }}
          >4</motion.span>

          {/* Resultado de 3×4 = 12 (aparece en paso 2) */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_OK, 60) }}
            initial={{ left: 220, top: 50, opacity: 0, scale: 0 }}
            animate={
              paso === 2 ? { left: 220, top: 50, opacity: 1, scale: [0, 1.3, 1] } :
              paso >= 3 ? { left: 145, top: 50, opacity: 1, scale: 1, color: COLOR_BASE } :
              { left: 220, top: 50, opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.5, delay: paso === 2 ? 0.3 : 0, type: "spring", stiffness: 160 }}
          >12</motion.span>

          {/* Resultado final 14 */}
          <motion.span style={{ position: "absolute", ...numGrande(COLOR_OK, 70) }}
            initial={{ left: 230, top: 50, opacity: 0, scale: 0 }}
            animate={paso >= 3 ? { left: 230, top: 50, opacity: 1, scale: [0, 1.4, 1] } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            = 14
          </motion.span>

          {/* Resaltado del × y del + */}
          <motion.div
            style={{ position: "absolute", left: 173, top: 40, width: 120, height: 80, borderRadius: 14, border: `3px solid ${COLOR_EXP}` }}
            initial={{ opacity: 0 }}
            animate={paso === 1 ? { opacity: 1 } : { opacity: 0 }}
          />
        </Stage>

        <motion.div animate={{ opacity: paso >= 3 ? 1 : 0 }} style={cajitaFormula()}>
          <span style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}>
            <strong>PEMDAS:</strong> Paréntesis → Exponentes → ×/÷ → +/−
          </span>
        </motion.div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 2 + 3 × 4. ¿Cuál hago primero?"}
        {paso === 1 && "La multiplicación va antes que la suma"}
        {paso === 2 && "3 × 4 = 12 → ahora queda 2 + 12"}
        {paso === 3 && "Resultado: 14 (¡no 20!)"}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// ESCENA 6 — Mini-reto
// ═════════════════════════════════════════════════════════════════════════════
function EscenaReto() {
  const opciones = useMemo(() => [
    { label: "26", correcta: true },
    { label: "30", correcta: false },
    { label: "20", correcta: false },
    { label: "11", correcta: false },
  ], []);

  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Aplicá la jerarquía. ¿Cuánto vale esto?</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{
          padding: "30px 40px", background: "var(--bg-card)",
          borderRadius: 20, border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontSize: 36, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif",
        }}
      >
        2 <span style={{ color: COLOR_EXP }}>+</span> 4 <span style={{ color: COLOR_EXP }}>×</span> 6 = <span style={{ color: "var(--fg-muted)" }}>?</span>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
        {opciones.map((op, idx) => {
          const sel = elegida === idx;
          const reveal = elegida !== null;
          const isCorrecta = op.correcta;
          const bg = !reveal ? "var(--bg-card)"
            : isCorrecta ? "linear-gradient(135deg, #d1fae5, #a7f3d0)"
            : sel ? "linear-gradient(135deg, #fee2e2, #fecaca)"
            : "var(--bg-card)";
          const border = !reveal ? "var(--border)"
            : isCorrecta ? COLOR_OK
            : sel ? COLOR_BAD
            : "var(--border)";

          return (
            <motion.button key={idx}
              whileHover={!reveal ? { scale: 1.03, y: -2 } : {}}
              whileTap={!reveal ? { scale: 0.97 } : {}}
              onClick={() => elegida === null && setElegida(idx)}
              disabled={reveal}
              style={{
                padding: "20px 16px", background: bg, border: `2px solid ${border}`,
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
                <strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Primero la multiplicación: 4 × 6 = 24. Después la suma: 2 + 24 = <strong>26</strong>.
              </>
            ) : (
              <>
                <strong style={{ color: COLOR_BAD }}>No.</strong> Primero la multiplicación (4 × 6 = 24), <em>después</em> la suma (2 + 24). La respuesta correcta es <strong>26</strong>.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
