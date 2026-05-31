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
      unidad="06"
      tituloUnidad="Sistemas de ecuaciones lineales"
      escenas={[
        { titulo: "¿Qué es un sistema?", componente: EscenaIntro },
        { titulo: "Método de sustitución", componente: EscenaSustitucion },
        { titulo: "Método de igualación", componente: EscenaIgualacion },
        { titulo: "Método de reducción (sumar)", componente: EscenaReduccion },
        { titulo: "Interpretación gráfica", componente: EscenaGrafica },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

function EscenaIntro() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Un <strong>sistema</strong> son DOS ecuaciones con DOS incógnitas que se resuelven juntas:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 160, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif" }}>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: COLOR_BASE, fontWeight: 700 }}>
            <span style={{ fontSize: 60, color: COLOR_EXP, fontWeight: 400 }}>{`{`}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span>x + y = 10</span>
              <span>x − y = 2</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ fontSize: 14, color: "var(--fg-muted)", textAlign: "center" }}>
            Solución: un PAR (x, y) que cumpla AMBAS ecuaciones.
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, type: "spring" }}
            style={{ fontSize: 18, color: COLOR_OK, fontWeight: 800 }}>
            (x, y) = (6, 4) ✓
          </motion.div>
        </div>
      </div>

      <p style={hint()}>Sumá 6+4=10 ✓ y restá 6−4=2 ✓ — cumple las dos</p>
    </div>
  );
}

function EscenaSustitucion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Despejá una variable en una ecuación y la <strong>sustituís</strong> en la otra:</p>

      <div onClick={() => setPaso((p) => p >= 4 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 18, color: COLOR_BASE }}>Sistema: x + y = 10  ·  x − y = 2</div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 18, color: COLOR_OK, marginTop: 4 }}>
            De la 1ª: y = 10 − x
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 18, color: COLOR_BASE }}>
            Reemplazo: x − (10 − x) = 2
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 3 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 18, color: COLOR_BASE }}>
            2x − 10 = 2 → 2x = 12 → x = 6
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ fontSize: 22, color: COLOR_OK, fontWeight: 800 }}>
            x = 6, y = 10 − 6 = 4 ✓
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Empezamos despejando y de la 1ª"}
        {paso === 1 && "y = 10 − x"}
        {paso === 2 && "Reemplazamos en la 2ª"}
        {paso === 3 && "Operamos y despejamos x"}
        {paso === 4 && "Volvemos a y con el valor de x"}
      </p>
    </div>
  );
}

function EscenaIgualacion() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Despejá la <em>misma</em> variable en las dos, y luego las <strong>igualás</strong>:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 18, color: COLOR_BASE }}>Sistema: x + y = 10  ·  x − y = 2</div>
          <div style={{ fontSize: 16, color: COLOR_OK, marginTop: 4 }}>De cada una despejamos x:</div>
          <div style={{ fontSize: 17, color: COLOR_BASE }}>x = 10 − y &nbsp;y&nbsp; x = 2 + y</div>
          <div style={{ fontSize: 16, color: COLOR_OK }}>Las igualamos:</div>
          <div style={{ fontSize: 17, color: COLOR_BASE }}>10 − y = 2 + y → 8 = 2y → y = 4</div>
          <div style={{ fontSize: 22, color: COLOR_OK, fontWeight: 800 }}>x = 6, y = 4 ✓</div>
        </div>
      </div>

      <p style={hint()}>Útil cuando ambas ecuaciones se despejan fácil</p>
    </div>
  );
}

function EscenaReduccion() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>El más rápido: <strong>sumá</strong> las ecuaciones de modo que una variable desaparezca:</p>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 6, alignItems: "center", justifyContent: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          <div style={{ fontSize: 20, color: COLOR_BASE }}>x + <span style={{ color: COLOR_OK }}>y</span> = 10</div>
          <div style={{ fontSize: 20, color: COLOR_BASE }}>x <span style={{ color: COLOR_OK }}>− y</span> = 2</div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ width: "60%", borderTop: `2px solid ${COLOR_EXP}`, marginTop: 4 }} />
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 22, color: COLOR_OK, fontWeight: 800 }}>
            2x = 12 → x = 6
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ fontSize: 14, color: "var(--fg-muted)" }}>
            (las y se cancelan: +y y −y suman 0)
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ fontSize: 20, color: COLOR_OK, fontWeight: 800, marginTop: 6 }}>
            Y reemplazando: y = 4 ✓
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Sumamos las dos ecuaciones término a término"}
        {paso === 1 && "Las y se cancelan, queda 2x = 12 → x = 6"}
        {paso === 2 && "Y volvemos a cualquiera para encontrar y = 4"}
        {paso === 3 && "Listo: (6, 4)"}
      </p>
    </div>
  );
}

function EscenaGrafica() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Cada ecuación es una recta. La <strong>solución</strong> es el punto donde se cruzan:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={200}>
          <svg width={420} height={200}>
            <line x1={20} y1={100} x2={400} y2={100} stroke="var(--border)" strokeWidth={1} />
            <line x1={210} y1={20} x2={210} y2={180} stroke="var(--border)" strokeWidth={1} />

            <motion.line x1={60} y1={170} x2={360} y2={30}
              stroke={COLOR_OK} strokeWidth={3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
            <motion.line x1={60} y1={30} x2={360} y2={170}
              stroke={COLOR_EXP} strokeWidth={3} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />

            <motion.circle cx={210} cy={100} r={7} fill={COLOR_BAD}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7, type: "spring" }} />
            <motion.text x={220} y={120} fontSize={13} fill={COLOR_BAD} fontWeight={800}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
              ← Solución (6, 4)
            </motion.text>
          </svg>
        </Stage>
      </div>

      <p style={hint()}>Si las rectas son paralelas: no hay solución. Si son la misma: infinitas.</p>
    </div>
  );
}

function EscenaReto() {
  // 2x + y = 11; x - y = 1 → x = 4, y = 3
  const opciones = useMemo(() => [
    { label: "(4, 3)", correcta: true },
    { label: "(3, 4)", correcta: false },
    { label: "(5, 1)", correcta: false },
    { label: "(2, 7)", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Resolvé el sistema:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "20px 30px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          textAlign: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 22, color: COLOR_BASE }}>2x + y = 11</div>
        <div style={{ fontSize: 22, color: COLOR_BASE, marginTop: 6 }}>x − y = 1</div>
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
                fontSize: 22, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif",
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> Sumando: 3x = 12 → x = 4. Reemplazando: y = 3. Verificá: 2·4 + 3 = 11 ✓ y 4 − 3 = 1 ✓.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Por reducción: sumá las dos → 3x = 12 → x = 4. Reemplazá: y = 3. → <strong>(4, 3)</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
