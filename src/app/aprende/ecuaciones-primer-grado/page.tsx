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
      unidad="05"
      tituloUnidad="Ecuaciones de primer grado"
      escenas={[
        { titulo: "Igualdad, identidad y ecuación", componente: EscenaTipos },
        { titulo: "La balanza", componente: EscenaBalanza },
        { titulo: "Pasar términos al otro lado", componente: EscenaPasarTerminos },
        { titulo: "Pasar el coeficiente (dividir)", componente: EscenaCoef },
        { titulo: "Problema verbal", componente: EscenaProblema },
        { titulo: "Tu turno", componente: EscenaReto },
      ]}
    />
  );
}

function EscenaTipos() {
  const [i, setI] = useState(0);
  const casos = [
    { txt: "2 + 3 = 5", tipo: "igualdad", det: "Es verdadero (suma exacta)" },
    { txt: "x + x = 2x", tipo: "identidad", det: "Vale para CUALQUIER x" },
    { txt: "2x + 1 = 7", tipo: "ecuación", det: "Vale solo para algún x (x=3)" },
  ];
  const c = casos[i];

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Una <strong>ecuación</strong> es una igualdad con una incógnita por despejar:</p>

      <div onClick={() => setI((p) => (p + 1) % casos.length)} style={cajaAnim()}>
        <div style={{ minHeight: 140, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              style={{ fontSize: 30, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}>
              {c.txt}
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div key={`l-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{
                padding: "8px 14px", borderRadius: 10,
                background: c.tipo === "ecuación" ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "var(--bg-subtle)",
                fontSize: 13, color: c.tipo === "ecuación" ? "#065f46" : "var(--fg-muted)", fontWeight: 700,
              }}>
              {c.tipo.toUpperCase()} — {c.det}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p style={hint()}>👆 Tocá para ver otro caso ({i + 1}/{casos.length})</p>
    </div>
  );
}

function EscenaBalanza() {
  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Pensá una ecuación como una <strong>balanza</strong>. Si está en equilibrio, lo que hacés a un lado debe hacerse al otro:</p>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={200}>
          {/* Plato izquierdo */}
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ position: "absolute", left: 60, top: 30, padding: "10px 24px", background: COLOR_BASE, color: "white", borderRadius: 10, fontFamily: "var(--font-crimson), serif", fontSize: 24, fontWeight: 700 }}>
            x + 3
          </motion.div>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.4 }}
            style={{ position: "absolute", left: 70, top: 85, width: 120, height: 4, background: "var(--fg-muted)", transformOrigin: "left" }} />

          {/* Plato derecho */}
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ position: "absolute", right: 60, top: 30, padding: "10px 24px", background: COLOR_OK, color: "white", borderRadius: 10, fontFamily: "var(--font-crimson), serif", fontSize: 24, fontWeight: 700 }}>
            7
          </motion.div>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.4 }}
            style={{ position: "absolute", right: 70, top: 85, width: 120, height: 4, background: "var(--fg-muted)", transformOrigin: "right" }} />

          {/* Triángulo soporte */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ position: "absolute", left: "50%", marginLeft: -30, top: 90, width: 0, height: 0, borderLeft: "30px solid transparent", borderRight: "30px solid transparent", borderTop: `60px solid ${COLOR_EXP}` }} />

          {/* "=" en el centro */}
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: "spring" }}
            style={{ position: "absolute", left: "50%", marginLeft: -15, top: 40, fontSize: 36, color: COLOR_EXP, fontWeight: 800 }}>
            =
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
            style={{ position: "absolute", left: 0, bottom: 0, width: "100%", textAlign: "center", fontSize: 14, color: "var(--fg-muted)" }}>
            La igualdad x + 3 = 7 dice: ambos lados pesan lo mismo
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>El principio: lo que hacés a un lado, hacelo al otro para mantener el equilibrio</p>
    </div>
  );
}

function EscenaPasarTerminos() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Para despejar x, pasamos lo que sobra al otro lado. <strong>El término cambia de signo</strong>:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={140}>
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            x + <span style={{ color: COLOR_EXP }}>3</span> = 7
          </div>
          {/* Paso 1: el +3 se va a la derecha como -3 */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{ position: "absolute", left: 0, top: 70, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            x = 7 <span style={{ color: COLOR_BAD }}>− 3</span>
          </motion.div>
          {/* Paso 2: resultado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 110, width: "100%", textAlign: "center", fontSize: 30, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            x = 4 ✓
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 x + 3 = 7. Queremos despejar x"}
        {paso === 1 && "El +3 pasa al otro lado como −3 (cambia el signo)"}
        {paso === 2 && "7 − 3 = 4 → x = 4"}
      </p>
    </div>
  );
}

function EscenaCoef() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Y un número que <strong>multiplica</strong>… pasa al otro lado <strong>dividiendo</strong>:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={cajaAnim()}>
        <Stage w={420} h={140}>
          <div style={{ position: "absolute", left: 0, top: 30, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span style={{ color: COLOR_EXP }}>3</span>x = 12
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{ position: "absolute", left: 0, top: 70, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            x = 12 <span style={{ color: COLOR_BAD }}>÷ 3</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 110, width: "100%", textAlign: "center", fontSize: 30, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            x = 4 ✓
          </motion.div>
        </Stage>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 3x = 12"}
        {paso === 1 && "El 3 (que multiplica) pasa dividiendo"}
        {paso === 2 && "12 ÷ 3 = 4 → x = 4"}
      </p>
    </div>
  );
}

function EscenaProblema() {
  const [paso, setPaso] = useState(0);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Traducí un problema en palabras a una ecuación:</p>

      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={cajaAnim()}>
        <div style={{ width: "100%", maxWidth: 420, minHeight: 200, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 14, color: COLOR_BASE, textAlign: "center", maxWidth: 380, lineHeight: 1.5, fontStyle: "italic" }}>
            &ldquo;El doble de un número, más 5, es igual a 17. ¿Cuál es el número?&rdquo;
          </div>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", color: COLOR_BASE, fontWeight: 700 }}>
            2x + 5 = 17
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 6 }} animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", color: COLOR_BASE }}>
            2x = 17 − 5 → 2x = 12 → x = 6
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ fontSize: 24, fontFamily: "var(--font-crimson), serif", color: COLOR_OK, fontWeight: 800 }}>
            El número es 6 ✓
          </motion.div>
        </div>
      </div>

      <p style={hint()}>
        {paso === 0 && "👆 Traduzcamos a una ecuación"}
        {paso === 1 && "&ldquo;Doble de un número&rdquo; → 2x. &ldquo;Más 5&rdquo; → +5. &ldquo;Igual a 17&rdquo; → =17"}
        {paso === 2 && "Despejamos: 2x = 12 → x = 6"}
        {paso === 3 && "El número buscado es 6"}
      </p>
    </div>
  );
}

function EscenaReto() {
  // 5x - 8 = 17 → x = 5
  const opciones = useMemo(() => [
    { label: "5", correcta: true },
    { label: "1.8", correcta: false },
    { label: "9", correcta: false },
    { label: "25", correcta: false },
  ], []);
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div style={escenaWrap()}>
      <p style={subtitulo()}>Resolvé:</p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
        style={{
          padding: "30px 20px", background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)",
          fontSize: 30, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", textAlign: "center",
        }}
      >
        5x − 8 = 17
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
                fontSize: 24, fontWeight: 700, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif",
              }}
            >
              x = {op.label}
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
              <><strong style={{ color: COLOR_OK }}>¡Exacto!</strong> 5x − 8 = 17 → 5x = 25 → x = <strong>5</strong>.</>
            ) : (
              <><strong style={{ color: COLOR_BAD }}>No.</strong> Pasamos el −8 sumando: 5x = 17+8 = 25. Después dividimos por 5: x = <strong>5</strong>.</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
