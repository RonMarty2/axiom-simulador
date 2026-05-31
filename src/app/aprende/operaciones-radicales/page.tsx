"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  cajaAnim, Stage,
} from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Operaciones con radicales"
      escenas={[
        { titulo: "¿Para qué este tema?", componente: Esc01_Intro },
        { titulo: "Radicales semejantes", componente: Esc02_Semejantes },
        { titulo: "Identificar semejantes (ejercicios)", componente: Esc03_IdentSem },
        { titulo: "Suma y resta de radicales", componente: Esc04_SumaResta },
        { titulo: "Cuando hay que simplificar primero", componente: Esc05_SimpAntes },
        { titulo: "Multiplicación de radicales", componente: Esc06_Mult },
        { titulo: "Multiplicación con coeficientes", componente: Esc07_MultCoef },
        { titulo: "División de radicales", componente: Esc08_Div },
        { titulo: "Errores comunes", componente: Esc09_Errores },
        { titulo: "Práctica final", componente: Esc10_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Operar con radicales: ¿para qué?</Titulo>
      <Parrafo>
        En la lección anterior viste qué es un radical y cómo simplificarlo. Acá
        aprendés a <strong>sumarlos, restarlos, multiplicarlos y dividirlos</strong>{" "}
        — todas operaciones que vas a usar en álgebra, ecuaciones y geometría.
      </Parrafo>
      <Resumen>
        🎯 <strong>Lo que vas a poder hacer al terminar:</strong> sumar/restar radicales
        semejantes, simplificar antes de operar, multiplicar y dividir bajo el mismo
        índice, y evitar los errores típicos.
      </Resumen>
      <PorQue>
        ¿Por qué importa? Aparece en CADA fórmula que tenga raíz cuadrada — fórmula
        cuadrática, teorema de Pitágoras, distancia entre puntos, estadística, etc.
      </PorQue>
    </EscenaRica>
  );
}

function Esc02_Semejantes() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Radicales semejantes</Titulo>
      <Parrafo>
        Para poder <strong>sumar o restar</strong> dos radicales, primero necesitamos
        que sean <em>semejantes</em>. Es un concepto análogo a los "términos semejantes"
        en álgebra.
      </Parrafo>

      <Definicion termino="radicales semejantes">
        Dos radicales son semejantes si tienen el <strong>mismo índice</strong> y
        el <strong>mismo radicando</strong>. Los coeficientes pueden ser distintos.
      </Definicion>

      <Ejemplo titulo="Ejemplos de semejantes">
        <Paso n={1}><strong>3√2</strong> y <strong>5√2</strong> — mismo índice (2) y mismo radicando (2). ✓</Paso>
        <Paso n={2}><strong>−√7</strong> y <strong>4√7</strong> — el coeficiente puede ser cualquiera. ✓</Paso>
        <Paso n={3}><strong>2³√5</strong> y <strong>9³√5</strong> — mismo índice (3) y mismo radicando (5). ✓</Paso>
      </Ejemplo>

      <Ejemplo titulo="NO semejantes">
        <Paso n={1}><strong>√3</strong> y <strong>√5</strong> — distinto radicando (3 vs 5). ✗</Paso>
        <Paso n={2}><strong>√2</strong> y <strong>³√2</strong> — distinto índice (2 vs 3). ✗</Paso>
      </Ejemplo>

      <Cuidado>
        Algunos radicales parecen no semejantes pero LO SON después de simplificarlos.
        Ej: <strong>√8 = 2√2</strong>, entonces <strong>√8 y √2</strong> SÍ son
        semejantes (los dos terminan teniendo radicando 2). Más sobre esto en 2 escenas.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_IdentSem() {
  const [i, setI] = useState(0);
  const casos = [
    { a: "3√2", b: "5√2", si: true, motivo: "Mismo radicando (2) y mismo índice (2). ✓" },
    { a: "2√3", b: "2√5", si: false, motivo: "Distinto radicando (3 vs 5). El coeficiente NO importa para esto. ✗" },
    { a: "4√7", b: "√7", si: true, motivo: "Mismo radicando (7), índice 2 ambos. El coef de la 2da es 1 implícito. ✓" },
    { a: "√2", b: "³√2", si: false, motivo: "Distinto índice (2 vs 3). El radicando coincide pero el índice no. ✗" },
    { a: "5√x", b: "−2√x", si: true, motivo: "Misma raíz cuadrada de x. Los signos / coeficientes son libres. ✓" },
  ];
  const c = casos[i];

  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">¿Reconocés cuáles son semejantes?</Titulo>
      <Parrafo>
        Practiquemos identificarlos. Tocá para ver el siguiente caso (loopea):
      </Parrafo>

      <div onClick={() => setI((p) => (p + 1) % casos.length)} style={cajaAnim()}>
        <Stage w={420} h={120}>
          <div style={{ position: "absolute", left: 0, top: 25, width: "100%", textAlign: "center", fontSize: 32, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}>
            <span>{c.a}</span>
            <span style={{ color: COLOR_EXP, fontSize: 22, margin: "0 14px" }}>y</span>
            <span>{c.b}</span>
          </div>
          <motion.div
            key={`b-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{
              position: "absolute", left: 0, top: 75, width: "100%", textAlign: "center",
              padding: "0 10px",
            }}>
            <span style={{
              display: "inline-block", padding: "8px 16px", borderRadius: 12,
              background: c.si ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "linear-gradient(135deg, #fee2e2, #fecaca)",
              border: `1.5px solid ${c.si ? COLOR_OK : COLOR_BAD}`,
              fontSize: 13, fontWeight: 800, color: c.si ? "#065f46" : "#7f1d1d",
            }}>
              {c.si ? "✓ SEMEJANTES" : "✗ NO SEMEJANTES"}
            </span>
          </motion.div>
        </Stage>
        <div style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.5, textAlign: "center", maxWidth: 400, marginTop: 6 }}>
          {c.motivo}
        </div>
      </div>
      <div style={{ fontSize: 13, color: COLOR_EXP, textAlign: "center", fontWeight: 700 }}>
        Caso {i + 1} de {casos.length} · 👆 Tocá para ver el siguiente
      </div>
    </EscenaRica>
  );
}

function Esc04_SumaResta() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Sumar y restar radicales</Titulo>
      <Parrafo>
        Si dos radicales son semejantes, se suman/restan <strong>los coeficientes</strong>
        y el radical queda igual. Idéntico a sumar términos semejantes en álgebra.
      </Parrafo>

      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a·√x + b·√x = (a + b)·√x
        </span>
      </Resumen>

      {/* ANIMACIÓN: 3√5 + 7√5 = 10√5 */}
      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2, marginBottom: 4 }}>
          👆 TOCÁ PARA VER LA SUMA
        </div>
        <Stage w={420} h={140}>
          {/* 3√5 */}
          <motion.span style={{ position: "absolute", fontFamily: "var(--font-crimson), serif", fontWeight: 800, fontSize: 50, color: "#3b82f6" }}
            initial={{ left: 60, top: 50 }}
            animate={
              paso === 0 ? { left: 60, top: 50, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 160, top: 5, opacity: 1, scale: 1.2 } :
              paso === 2 ? { left: 200, top: 40, opacity: 0, scale: 1.4 } :
              { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring" }}>3</motion.span>
          <motion.span style={{ position: "absolute", left: 100, top: 50, fontSize: 36, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}
            animate={paso >= 3 ? { left: 240, top: 50 } : { left: 100, top: 50 }}>
            √5
          </motion.span>

          <motion.span style={{ position: "absolute", left: 155, top: 65, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso === 2 ? { left: 215, top: 5, opacity: 1 } : paso < 2 ? { left: 155, top: 65, opacity: 1 } : { opacity: 0 }}>
            +
          </motion.span>

          {/* 7√5 */}
          <motion.span style={{ position: "absolute", fontFamily: "var(--font-crimson), serif", fontWeight: 800, fontSize: 50, color: "#3b82f6" }}
            initial={{ left: 200, top: 50 }}
            animate={
              paso === 0 ? { left: 200, top: 50, opacity: 1, scale: 1 } :
              paso === 1 ? { left: 250, top: 5, opacity: 1, scale: 1.2 } :
              paso === 2 ? { left: 200, top: 40, opacity: 0, scale: 1.4 } :
              { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", delay: 0.05 }}>7</motion.span>
          <motion.span style={{ position: "absolute", left: 240, top: 50, fontSize: 36, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}
            animate={paso >= 3 ? { left: 240, top: 50, opacity: 0, scale: 0 } : { left: 240, top: 50, opacity: 1 }}>
            √5
          </motion.span>

          {/* Resultado: 10 */}
          <motion.span style={{ position: "absolute", fontFamily: "var(--font-crimson), serif", fontWeight: 800, fontSize: 50, color: COLOR_OK }}
            initial={{ left: 200, top: 5, opacity: 0, scale: 0 }}
            animate={
              paso === 2 ? { left: 200, top: 5, opacity: 1, scale: [0, 1.4, 1] } :
              paso >= 3 ? { left: 195, top: 50, opacity: 1, scale: 1, color: "#3b82f6" } :
              { opacity: 0, scale: 0 }
            }
            transition={{ type: "spring", delay: paso === 2 ? 0.3 : 0 }}>10</motion.span>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "3√5 + 7√5"}
          {paso === 1 && "Los coeficientes 3 y 5 se preparan para sumarse…"}
          {paso === 2 && "3 + 7 = 10"}
          {paso === 3 && "Resultado: 10√5 ✓"}
        </div>
      </div>

      <Ejemplo titulo="Más ejemplos">
        <Paso n={1}>2√3 + 5√3 − √3 = (2 + 5 − 1)√3 = <strong>6√3</strong></Paso>
        <Paso n={2}>4√7 − 9√7 = (4 − 9)√7 = <strong>−5√7</strong></Paso>
        <Paso n={3}>√11 + √11 = 2√11 (1+1 = 2)</Paso>
      </Ejemplo>

      <Cuidado>
        Si los radicales <strong>NO</strong> son semejantes, la suma se deja indicada. <br />
        Ej: <strong>√2 + √3</strong> NO se puede simplificar más. NUNCA escribas √2 + √3 = √5 — eso está MAL.
      </Cuidado>

      <AutoCheck
        pregunta="Calculá: 6√2 − 2√2"
        opciones={["4", "4√2", "8√2", "√0"]}
        correctaIdx={1}
        explicacion="Son semejantes. (6−2)√2 = 4√2. La raíz queda igual."
      />
    </EscenaRica>
  );
}

function Esc05_SimpAntes() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo>Simplificar ANTES de sumar</Titulo>
      <Parrafo>
        A veces te dan radicales que <em>parecen</em> distintos pero después de
        simplificar resultan semejantes. <strong>Regla: SIEMPRE simplificá primero</strong>.
      </Parrafo>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2 }}>
          👆 EJEMPLO: √8 + √2
        </div>
        <Stage w={420} h={160}>
          {/* Línea original */}
          <motion.div style={{ position: "absolute", left: 0, top: 10, width: "100%", textAlign: "center", fontSize: 24, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}
            animate={paso >= 1 ? { opacity: 0.35, scale: 0.9 } : { opacity: 1, scale: 1 }}>
            √8 + √2
          </motion.div>
          {/* Línea simplificada */}
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 60, width: "100%", textAlign: "center", fontSize: 24, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}>
            <span style={{ color: COLOR_OK }}>2√2</span> + √2
          </motion.div>
          {/* Anotación */}
          <motion.div initial={{ opacity: 0 }} animate={paso === 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 90, width: "100%", textAlign: "center", fontSize: 11, color: "var(--fg-muted)", fontStyle: "italic" }}>
            (porque √8 = √(4·2) = 2√2)
          </motion.div>
          {/* Resultado */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 115, width: "100%", textAlign: "center", fontSize: 28, fontFamily: "var(--font-crimson), serif", fontWeight: 800, color: COLOR_OK }}>
            = 3√2 ✓
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "¿√8 y √2 son semejantes? Parece que no…"}
          {paso === 1 && "Pero √8 = 2√2. Ahora SÍ son semejantes"}
          {paso === 2 && "Sumamos coeficientes: 2 + 1 = 3"}
          {paso === 3 && "Resultado: 3√2"}
        </div>
      </div>

      <Ejemplo titulo="Otro caso: √12 + √27">
        <Paso n={1}>Simplifico √12 = √(4·3) = <strong>2√3</strong></Paso>
        <Paso n={2}>Simplifico √27 = √(9·3) = <strong>3√3</strong></Paso>
        <Paso n={3}>Ahora son semejantes: 2√3 + 3√3 = <strong>5√3</strong></Paso>
      </Ejemplo>

      <AutoCheck
        pregunta="Calculá: √18 + √50"
        opciones={["√68", "8√2", "2√17", "no se puede"]}
        correctaIdx={1}
        explicacion="√18 = 3√2 y √50 = 5√2. Suma: (3+5)√2 = 8√2."
      />
    </EscenaRica>
  );
}

function Esc06_Mult() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Multiplicar radicales del mismo índice</Titulo>

      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          ⁿ√a · ⁿ√b = ⁿ√(a · b)
        </span>
      </Resumen>
      <Parrafo>
        Los radicandos se <strong>juntan bajo una sola raíz</strong>. Es la propiedad
        inversa de la "raíz de un producto" que viste antes.
      </Parrafo>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2 }}>
          👆 √3 · √5
        </div>
        <Stage w={420} h={140}>
          <motion.div style={{ position: "absolute", left: 50, top: 40, fontSize: 36, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}
            animate={paso >= 2 ? { opacity: 0, x: -20 } : { opacity: 1 }}>
            √3
          </motion.div>
          <motion.span style={{ position: "absolute", left: 100, top: 50, fontSize: 30, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 2 ? { opacity: 0 } : { opacity: 1 }}>·</motion.span>
          <motion.div style={{ position: "absolute", left: 130, top: 40, fontSize: 36, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}
            animate={paso >= 2 ? { opacity: 0, x: 20 } : { opacity: 1 }}>
            √5
          </motion.div>
          <motion.span style={{ position: "absolute", left: 195, top: 50, fontSize: 30, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}>=</motion.span>

          <motion.div initial={{ opacity: 0, scale: 0 }} animate={paso >= 1 && paso < 3 ? { opacity: 1, scale: 1 } : paso >= 3 ? { opacity: 0, scale: 0 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", delay: paso === 1 ? 0.3 : 0 }}
            style={{ position: "absolute", left: 230, top: 40, fontSize: 32, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_OK }}>
            √(3·5)
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0 }} animate={paso >= 3 ? { opacity: 1, scale: [0, 1.3, 1] } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", left: 250, top: 40, fontSize: 40, fontFamily: "var(--font-crimson), serif", fontWeight: 800, color: COLOR_OK }}>
            √15
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "Tenemos √3 multiplicado por √5"}
          {paso === 1 && "Los radicandos se juntan bajo una sola raíz: √(3·5)"}
          {paso === 2 && "Operamos adentro: 3·5 = 15"}
          {paso === 3 && "Resultado: √15"}
        </div>
      </div>

      <Cuidado>
        <strong>Importante</strong>: deben tener el <em>mismo índice</em>. <br />
        ✗ √2 · ³√5 NO se puede juntar directamente (índices distintos).
      </Cuidado>

      <PorQue>
        Por la propiedad de potencias: √a · √b = a^(1/2) · b^(1/2) = (a·b)^(1/2) = √(a·b).
        Las raíces son potencias disfrazadas.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07_MultCoef() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Multiplicación con coeficientes</Titulo>
      <Parrafo>
        Cuando hay <strong>coeficientes</strong> adelante, los coeficientes se multiplican
        entre sí, y las raíces se multiplican entre sí — por separado.
      </Parrafo>

      <Resumen>
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a√x · b√y = (a · b) √(x · y)
        </span>
      </Resumen>

      <Ejemplo titulo="Ejemplo: 3√2 · 4√5">
        <Paso n={1}>Coeficientes: 3 · 4 = <strong>12</strong></Paso>
        <Paso n={2}>Raíces: √2 · √5 = <strong>√10</strong></Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>12√10</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="Otro: 2√6 · 5√3">
        <Paso n={1}>Coeficientes: 2 · 5 = 10</Paso>
        <Paso n={2}>Raíces: √6 · √3 = √18</Paso>
        <Paso n={3}>Pero √18 se simplifica: √18 = 3√2</Paso>
        <Paso n={4}>Total: 10 · 3√2 = <strong style={{ color: COLOR_OK }}>30√2</strong></Paso>
      </Ejemplo>

      <Cuidado>
        Recordá <strong>SIEMPRE simplificar</strong> el radical resultante. Si te queda
        √18 en una respuesta, escribilo como 3√2.
      </Cuidado>

      <AutoCheck
        pregunta="Calculá: 5√3 · 2√7"
        opciones={["10√21", "10√10", "7√21", "70"]}
        correctaIdx={0}
        explicacion="Coef: 5·2 = 10. Raíces: √3·√7 = √21 (no se simplifica). Total: 10√21."
      />
    </EscenaRica>
  );
}

function Esc08_Div() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Dividir radicales</Titulo>

      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          ⁿ√a / ⁿ√b = ⁿ√(a / b)
        </span>
      </Resumen>
      <Parrafo>
        Análogo a la multiplicación: los radicandos se juntan bajo una raíz, esta
        vez como cociente.
      </Parrafo>

      <div onClick={() => setPaso((p) => p >= 2 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2 }}>
          👆 √20 / √5
        </div>
        <Stage w={420} h={160}>
          <motion.div style={{ position: "absolute", left: 50, top: 25, display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}
            animate={paso >= 1 ? { opacity: 0, x: -20 } : { opacity: 1 }}>
            <span style={{ fontSize: 32, color: COLOR_BASE }}>√20</span>
            <div style={{ borderTop: `2.5px solid ${COLOR_EXP}`, width: 70, margin: "5px 0" }} />
            <span style={{ fontSize: 32, color: COLOR_BASE }}>√5</span>
          </motion.div>
          <motion.span style={{ position: "absolute", left: 145, top: 55, fontSize: 30, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}>=</motion.span>

          <motion.div initial={{ opacity: 0, scale: 0 }} animate={paso === 1 ? { opacity: 1, scale: 1 } : paso >= 2 ? { opacity: 0, scale: 0 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", delay: paso === 1 ? 0.3 : 0 }}
            style={{ position: "absolute", left: 180, top: 50, fontSize: 28, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_OK }}>
            √(20/5)
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0 }} animate={paso >= 2 ? { opacity: 1, scale: [0, 1.3, 1] } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", left: 200, top: 50, display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 40, fontFamily: "var(--font-crimson), serif", fontWeight: 800, color: COLOR_OK }}>√4</span>
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>=</span>
            <span style={{ fontSize: 40, fontFamily: "var(--font-crimson), serif", fontWeight: 800, color: COLOR_OK }}>2</span>
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "Cociente de raíces"}
          {paso === 1 && "Se juntan bajo una raíz: √(20/5)"}
          {paso === 2 && "20/5 = 4 → √4 = 2 ✓"}
        </div>
      </div>

      <Ejemplo titulo="Con coeficientes: (6√15) / (2√3)">
        <Paso n={1}>Coeficientes: 6 / 2 = 3</Paso>
        <Paso n={2}>Raíces: √15 / √3 = √(15/3) = √5</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>3√5</strong></Paso>
      </Ejemplo>

      <AutoCheck
        pregunta="Calculá: √48 / √3"
        opciones={["√45", "4", "√16 = 4", "16"]}
        correctaIdx={2}
        explicacion="√48/√3 = √(48/3) = √16 = 4. Ambas opciones a y c llevan al mismo lugar pero c es la forma completa."
      />
    </EscenaRica>
  );
}

function Esc09_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Los 4 errores más comunes</Titulo>

      <Cuidado>
        <strong>Error 1:</strong> Sumar radicales no semejantes. <br />
        <span style={{ fontSize: 13 }}>
          ❌ √2 + √3 = √5. <strong>FALSO</strong>. Verificación: √5 ≈ 2.24, pero √2+√3 ≈ 3.15.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 2:</strong> Olvidar simplificar antes de sumar. <br />
        <span style={{ fontSize: 13 }}>
          √8 y √2 PARECEN no semejantes, pero √8 = 2√2 sí lo es. Siempre simplificá primero.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 3:</strong> Multiplicar radicandos sin que coincidan los índices. <br />
        <span style={{ fontSize: 13 }}>
          ❌ √2 · ³√5 = ⁵√10 ó √10. <strong>FALSO</strong>. Distintos índices → no se pueden combinar directamente.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 4:</strong> No simplificar el resultado de una multiplicación. <br />
        <span style={{ fontSize: 13 }}>
          Si te queda √50 en una respuesta, no está terminado. <strong>√50 = 5√2</strong>.
        </span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc10_Practica() {
  const ejs = useMemo(() => [
    { p: "Simplificá: 7√3 − 2√3", o: ["5√3", "5", "5√0", "5√6"], c: 0, ex: "Son semejantes. (7−2)√3 = 5√3." },
    { p: "Calculá: √12 + √48", o: ["√60", "6√3", "2√15", "12√3"], c: 1, ex: "√12=2√3, √48=4√3. Suma: 6√3." },
    { p: "Multiplicá: 2√3 · 3√2", o: ["6√6", "5√5", "6√5", "5√6"], c: 0, ex: "Coef: 2·3=6. Raíces: √3·√2=√6. Total: 6√6." },
    { p: "Dividí: √32 / √8", o: ["√24", "4", "2", "1/4"], c: 2, ex: "√32/√8 = √(32/8) = √4 = 2." },
    { p: "Simplificá: √8 · √2", o: ["√10", "4", "2√4", "8"], c: 1, ex: "√8·√2 = √16 = 4. (También 2√2·√2 = 2·2 = 4)." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios sobre todo lo que viste:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i];
        const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c;
                const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{
                      padding: "10px 14px",
                      background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)",
                      border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`,
                      borderRadius: 10, fontSize: 16, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer",
                      fontFamily: "var(--font-crimson), serif",
                    }}>{op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}</button>
                );
              })}
            </div>
            {rev && (
              <div style={{ marginTop: 10, padding: "10px 12px", background: sel === e.c ? "#ecfdf5" : "#fef2f2", borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5 }}>
                <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}{e.ex}
              </div>
            )}
          </div>
        );
      })}
      {Object.keys(resp).length === ejs.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 18, background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
          <div style={{ fontSize: 14, color: "#065f46", marginTop: 6 }}>
            {ok === ejs.length && "🎉 Dominás las operaciones con radicales."}
            {ok >= 3 && ok < ejs.length && "Bien. Repasá los que fallaste."}
            {ok < 3 && "Vale la pena volver a las escenas 4 (semejantes) y 5 (simplificar antes)."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
