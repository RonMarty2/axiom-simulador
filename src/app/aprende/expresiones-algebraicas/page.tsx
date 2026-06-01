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
      unidad="03"
      tituloUnidad="Expresiones algebraicas"
      escenas={[
        { titulo: "¿Qué es una expresión algebraica?", componente: Esc01_Intro },
        { titulo: "Anatomía de un término", componente: Esc02_Termino },
        { titulo: "Términos semejantes", componente: Esc03_Semejantes },
        { titulo: "Suma y resta (reducción)", componente: Esc04_SumaResta },
        { titulo: "Multiplicación: distributiva", componente: Esc05_Distrib },
        { titulo: "Multiplicación de binomios (FOIL)", componente: Esc06_FOIL },
        { titulo: "Productos notables", componente: Esc07_Notables },
        { titulo: "Errores comunes", componente: Esc08_Errores },
        { titulo: "Práctica final", componente: Esc09_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Expresiones algebraicas: ¿qué son?</Titulo>
      <Parrafo>
        Una <strong>expresión algebraica</strong> es una combinación de <strong>números</strong>,
        <strong> letras</strong> (que representan cantidades desconocidas) y operaciones.
      </Parrafo>
      <Ejemplo titulo="Ejemplos">
        <Paso n={1}>3x + 5</Paso>
        <Paso n={2}>2a − 7b + 4</Paso>
        <Paso n={3}>x² − 5x + 6</Paso>
        <Paso n={4}>(a + b)²</Paso>
      </Ejemplo>
      <Resumen>
        🎯 En esta lección vas a aprender a: identificar las partes de un término,
        sumar/restar términos semejantes, multiplicar expresiones usando la
        distributiva y FOIL, y reconocer los productos notables.
      </Resumen>
      <PorQue>
        El álgebra es el puente entre la aritmética concreta y todo lo demás. Sin
        manipular bien expresiones, te bloquean las ecuaciones, las funciones, los
        sistemas… todo.
      </PorQue>
    </EscenaRica>
  );
}

function Esc02_Termino() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Anatomía de un término</Titulo>
      <Parrafo>
        Cada parte de una expresión separada por + o − se llama <strong>término</strong>.
        Cada término tiene 3 componentes:
      </Parrafo>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={400} h={200}>
          <div style={{ position: "absolute", left: 0, top: 50, width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ fontSize: 80, color: "#3b82f6", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>5</motion.span>
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ fontSize: 80, color: COLOR_BASE, fontWeight: 800, fontFamily: "var(--font-crimson), serif", fontStyle: "italic" }}>x</motion.span>
            <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ fontSize: 40, color: COLOR_EXP, fontWeight: 700, fontFamily: "var(--font-crimson), serif", marginLeft: 2 }}>2</motion.span>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ position: "absolute", left: 60, top: 150, fontSize: 11, color: "#3b82f6", fontWeight: 800, letterSpacing: 1 }}>
            ↑ COEFICIENTE
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            style={{ position: "absolute", left: 170, top: 150, fontSize: 11, color: COLOR_BASE, fontWeight: 800, letterSpacing: 1 }}>
            ↑ PARTE LITERAL
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={{ position: "absolute", right: 60, top: 0, fontSize: 11, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1 }}>
            EXPONENTE ↓
          </motion.div>
        </Stage>
      </div>

      <Definicion termino="términos">
        <strong>Coeficiente</strong>: el número que multiplica (acá, 5). Si no se escribe, es 1. <br />
        <strong>Parte literal</strong>: la(s) letra(s) (acá, x). <br />
        <strong>Exponente</strong>: a qué se eleva la parte literal (acá, 2). Si no se escribe, es 1.
      </Definicion>

      <Ejemplo titulo="Identificando términos">
        <Paso n={1}>3x → coef 3, literal x, exp 1.</Paso>
        <Paso n={2}>−7y³ → coef −7, literal y, exp 3.</Paso>
        <Paso n={3}>x → coef 1, literal x, exp 1 (todo implícito).</Paso>
        <Paso n={4}>5 → es un término sin parte literal (se llama "constante").</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc03_Semejantes() {
  const [i, setI] = useState(0);
  const casos = [
    { a: "3x", b: "7x", si: true, motivo: "Misma parte literal x con mismo exponente 1. Los coeficientes pueden diferir." },
    { a: "2y", b: "5x", si: false, motivo: "Distinta parte literal (y vs x). NO semejantes." },
    { a: "4x²", b: "x²", si: true, motivo: "Mismo x². Coef 4 vs 1 no afecta." },
    { a: "3x", b: "3x²", si: false, motivo: "Misma letra pero distinto exponente (1 vs 2). NO semejantes." },
    { a: "5ab", b: "−2ab", si: true, motivo: "Misma parte literal ab. Coef pueden diferir e incluir signo." },
  ];
  const c = casos[i];
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Términos semejantes</Titulo>
      <Definicion termino="términos semejantes">
        Dos términos son <strong>semejantes</strong> si tienen <strong>la misma parte
        literal con los mismos exponentes</strong>. Los coeficientes pueden ser distintos.
      </Definicion>
      <Parrafo>
        Solo se pueden <strong>sumar o restar</strong> términos semejantes. Si no son
        semejantes, la suma queda indicada.
      </Parrafo>
      <div onClick={() => setI((p) => (p + 1) % casos.length)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2 }}>
          👆 CASO {i + 1} de {casos.length}
        </div>
        <Stage w={400} h={100}>
          <div style={{ position: "absolute", left: 0, top: 20, width: "100%", textAlign: "center", fontSize: 32, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span>{c.a}</span>
            <span style={{ color: COLOR_EXP, fontSize: 22, margin: "0 14px" }}>y</span>
            <span>{c.b}</span>
          </div>
          <motion.div key={`b-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ position: "absolute", left: 0, top: 65, width: "100%", textAlign: "center" }}>
            <span style={{
              display: "inline-block", padding: "6px 14px", borderRadius: 10,
              background: c.si ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "linear-gradient(135deg, #fee2e2, #fecaca)",
              border: `1.5px solid ${c.si ? COLOR_OK : COLOR_BAD}`,
              fontSize: 13, fontWeight: 800, color: c.si ? "#065f46" : "#7f1d1d",
            }}>
              {c.si ? "✓ SEMEJANTES" : "✗ NO SEMEJANTES"}
            </span>
          </motion.div>
        </Stage>
        <div style={{ fontSize: 13, color: "var(--fg-muted)", textAlign: "center", maxWidth: 400, padding: "0 10px" }}>
          {c.motivo}
        </div>
      </div>
    </EscenaRica>
  );
}

function Esc04_SumaResta() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Sumar y restar: reducir términos semejantes</Titulo>
      <Parrafo>
        Para sumar términos semejantes, se suman los <strong>coeficientes</strong>
        y la parte literal queda igual. Idéntico a sumar 3 manzanas + 5 manzanas = 8 manzanas.
      </Parrafo>
      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a·x + b·x = (a + b)·x
        </span>
      </Resumen>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2 }}>
          👆 SUMAR 3x + 5x
        </div>
        <Stage w={400} h={140}>
          <motion.span style={{ position: "absolute", fontSize: 50, fontWeight: 800, color: "#3b82f6", fontFamily: "var(--font-crimson), serif" }}
            initial={{ left: 60, top: 50 }}
            animate={paso === 0 ? { left: 60, top: 50, opacity: 1, scale: 1 } : paso === 1 ? { left: 160, top: 5, opacity: 1, scale: 1.2 } : paso === 2 ? { left: 200, top: 40, opacity: 0, scale: 1.4 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring" }}>3</motion.span>
          <motion.span style={{ position: "absolute", left: 95, top: 50, fontSize: 50, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 800, fontStyle: "italic" }}
            animate={paso >= 3 ? { left: 240, top: 50 } : { left: 95, top: 50 }}>x</motion.span>
          <motion.span style={{ position: "absolute", left: 145, top: 65, fontSize: 36, color: COLOR_EXP, fontWeight: 700 }}
            animate={paso === 2 ? { left: 215, top: 5, opacity: 1 } : paso < 2 ? { opacity: 1 } : { opacity: 0 }}>+</motion.span>
          <motion.span style={{ position: "absolute", fontSize: 50, fontWeight: 800, color: "#3b82f6", fontFamily: "var(--font-crimson), serif" }}
            initial={{ left: 190, top: 50 }}
            animate={paso === 0 ? { left: 190, top: 50, opacity: 1, scale: 1 } : paso === 1 ? { left: 250, top: 5, opacity: 1, scale: 1.2 } : paso === 2 ? { left: 200, top: 40, opacity: 0, scale: 1.4 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", delay: 0.05 }}>5</motion.span>
          <motion.span style={{ position: "absolute", left: 230, top: 50, fontSize: 50, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 800, fontStyle: "italic" }}
            animate={paso >= 3 ? { left: 240, top: 50, opacity: 0, scale: 0 } : { left: 230, top: 50, opacity: 1, scale: 1 }}>x</motion.span>
          <motion.span style={{ position: "absolute", fontSize: 50, fontWeight: 800, color: COLOR_OK, fontFamily: "var(--font-crimson), serif" }}
            initial={{ left: 200, top: 5, opacity: 0, scale: 0 }}
            animate={paso === 2 ? { left: 200, top: 5, opacity: 1, scale: [0, 1.4, 1] } : paso >= 3 ? { left: 195, top: 50, opacity: 1, scale: 1, color: "#3b82f6" } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", delay: paso === 2 ? 0.3 : 0 }}>8</motion.span>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "3x + 5x"}
          {paso === 1 && "Los coeficientes 3 y 5 se preparan para sumarse…"}
          {paso === 2 && "3 + 5 = 8"}
          {paso === 3 && "Resultado: 8x ✓"}
        </div>
      </div>

      <Ejemplo titulo="Reducir una expresión completa">
        <Paso n={1}>4x + 3 − 2x + 7</Paso>
        <Paso n={2}>Agrupo las x: (4x − 2x) + (3 + 7)</Paso>
        <Paso n={3}>= 2x + 10 ✓</Paso>
      </Ejemplo>

      <Cuidado>
        Las constantes (3, 7…) son semejantes entre ellas (mismo "tipo de término").
        x y x² NO son semejantes — distinto exponente.
      </Cuidado>

      <AutoCheck
        pregunta="Reducí: 5a + 3b − 2a + 4b"
        opciones={["3a + 7b", "10ab", "7a + 7b", "3ab + 7"]}
        correctaIdx={0}
        explicacion="Junto las a: 5a − 2a = 3a. Junto las b: 3b + 4b = 7b. Total: 3a + 7b."
      />
    </EscenaRica>
  );
}

function Esc05_Distrib() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>La propiedad distributiva</Titulo>
      <Parrafo>
        Multiplicar un número (o término) por una suma se "reparte" entre los sumandos.
        Esta es la propiedad <strong>más usada en álgebra</strong>.
      </Parrafo>
      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a · (b + c) = a·b + a·c
        </span>
      </Resumen>

      <Ejemplo titulo="Ejemplos numéricos">
        <Paso n={1}>3(x + 5) = 3x + 15</Paso>
        <Paso n={2}>−2(a − 4) = −2a + 8</Paso>
        <Paso n={3}>x(x + 7) = x² + 7x</Paso>
        <Paso n={4}>2x(3x − 4) = 6x² − 8x</Paso>
      </Ejemplo>

      <Cuidado>
        ⚠️ Cuando el factor afuera es <strong>negativo</strong>, hay que distribuir
        el signo a TODOS los términos. Ejemplo: <br />
        −(x − 3) = <strong>−x + 3</strong>, NO −x − 3. ¡El menos se reparte!
      </Cuidado>

      <PorQue>
        Geométricamente: el área de un rectángulo de lado a por (b+c) es lo mismo que
        sumar las áreas de a×b y a×c por separado. La distributiva es esta idea
        algebraica.
      </PorQue>

      <AutoCheck
        pregunta="Distribuí: −3(2x − 5)"
        opciones={["−6x − 15", "−6x + 15", "6x + 15", "−6x − 5"]}
        correctaIdx={1}
        explicacion="−3 · 2x = −6x. −3 · (−5) = +15. Total: −6x + 15."
      />
    </EscenaRica>
  );
}

function Esc06_FOIL() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Multiplicar binomios: FOIL</Titulo>
      <Parrafo>
        Para multiplicar <strong>(x + 2)(x + 3)</strong> aplicamos la distributiva
        sistemáticamente. La regla mnemónica se llama <strong>FOIL</strong>:
      </Parrafo>
      <Resumen>
        <strong>F</strong>irst (primero × primero) ·
        <strong> O</strong>uter (primero × último externo) ·
        <strong> I</strong>nner (último interno × primero del segundo) ·
        <strong> L</strong>ast (último × último).
      </Resumen>

      <div onClick={() => setPaso((p) => p >= 4 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2 }}>
          👆 (x + 2)(x + 3)
        </div>
        <Stage w={420} h={180}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            (<span style={{ fontStyle: "italic" }}>x</span> + 2)(<span style={{ fontStyle: "italic" }}>x</span> + 3)
          </div>
          {[
            { txt: "x · x = x²", color: "#3b82f6" },
            { txt: "x · 3 = 3x", color: "#10b981" },
            { txt: "2 · x = 2x", color: "#f59e0b" },
            { txt: "2 · 3 = 6", color: "#8b5cf6" },
          ].map((it, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, x: -10 }} animate={paso >= k + 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              style={{ position: "absolute", left: 60 + (k % 2) * 180, top: 50 + Math.floor(k / 2) * 35, fontSize: 18, color: it.color, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
              {it.txt}
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={paso >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            style={{ position: "absolute", left: 0, bottom: 0, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            = x² + 5x + 6
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "Tocá para ver los 4 productos uno a uno"}
          {paso === 1 && "F: x · x = x²"}
          {paso === 2 && "O: x · 3 = 3x"}
          {paso === 3 && "I: 2 · x = 2x"}
          {paso === 4 && "L: 2 · 3 = 6 → Sumando 3x + 2x = 5x"}
        </div>
      </div>

      <Ejemplo titulo="Más ejemplos">
        <Paso n={1}>(x + 4)(x − 2) = x² − 2x + 4x − 8 = <strong>x² + 2x − 8</strong></Paso>
        <Paso n={2}>(2x − 1)(x + 5) = 2x² + 10x − x − 5 = <strong>2x² + 9x − 5</strong></Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc07_Notables() {
  return (
    <EscenaRica>
      <Titulo>Productos notables: patrones que conviene memorizar</Titulo>
      <Parrafo>
        Algunos productos aparecen <strong>todo el tiempo</strong>. Si los reconocés,
        ahorrás tiempo y errores.
      </Parrafo>

      <Resumen>
        <strong>1. Cuadrado de un binomio (suma)</strong>:<br />
        (a + b)² = a² + 2ab + b²
      </Resumen>
      <Ejemplo>
        (x + 3)² = x² + 6x + 9
      </Ejemplo>

      <Resumen>
        <strong>2. Cuadrado de un binomio (resta)</strong>:<br />
        (a − b)² = a² − 2ab + b²
      </Resumen>
      <Ejemplo>
        (x − 5)² = x² − 10x + 25
      </Ejemplo>

      <Resumen>
        <strong>3. Diferencia de cuadrados</strong>:<br />
        (a + b)(a − b) = a² − b²
      </Resumen>
      <Ejemplo>
        (x + 4)(x − 4) = x² − 16
      </Ejemplo>

      <PorQue>
        Sale de FOIL: (a+b)² = (a+b)(a+b) = a·a + a·b + b·a + b·b = a² + 2ab + b².
        Memorizarlo evita hacer FOIL cada vez.
      </PorQue>

      <Cuidado>
        ❌ (a + b)² <strong>NO</strong> es a² + b². ¡Te olvidás el 2ab! Es el error
        más común en álgebra.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Los errores más comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Sumar términos no semejantes. <br />
        <span style={{ fontSize: 13 }}>
          ❌ 3x + 5 = 8x. Falso. 3x y 5 NO son semejantes (5 no tiene x).
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Olvidar distribuir el signo. <br />
        <span style={{ fontSize: 13 }}>
          ❌ −(x + 3) = −x + 3. Falso. Es <strong>−x − 3</strong>.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> (a + b)² = a² + b². <br />
        <span style={{ fontSize: 13 }}>
          ¡FALSO! Es a² + 2ab + b². Te olvidás el doble producto.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 4:</strong> Sumar exponentes en suma (no en producto). <br />
        <span style={{ fontSize: 13 }}>
          ❌ x² + x³ = x⁵. <strong>FALSO</strong>. Solo se suman exponentes en PRODUCTOS (x²·x³ = x⁵).
        </span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc09_Practica() {
  const ejs = useMemo(() => [
    { p: "Reducí: 4x + 3 − 2x + 7", o: ["2x + 10", "6x + 10", "2x + 4", "12x"], c: 0, ex: "(4−2)x + (3+7) = 2x + 10." },
    { p: "Distribuí: 5(2x − 3)", o: ["10x − 3", "10x − 15", "7x − 15", "10x + 15"], c: 1, ex: "5·2x = 10x. 5·(−3) = −15. Total: 10x − 15." },
    { p: "Calculá (x + 2)(x + 5)", o: ["x² + 10", "x² + 7x + 10", "x² + 7", "2x + 10"], c: 1, ex: "FOIL: x² + 5x + 2x + 10 = x² + 7x + 10." },
    { p: "(a + 4)² es:", o: ["a² + 16", "a² + 8a + 16", "a² + 4a + 16", "a² − 8a + 16"], c: 1, ex: "(a+b)² = a² + 2ab + b². Acá: a² + 8a + 16." },
    { p: "(x + 6)(x − 6) es:", o: ["x² − 36", "x² + 36", "x² − 12x − 36", "x² − 12"], c: 0, ex: "Diferencia de cuadrados: a² − b² = x² − 36." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios sobre expresiones algebraicas:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i];
        const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
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
                      borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer",
                      fontFamily: "var(--font-crimson), serif", textAlign: "left",
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
            {ok === ejs.length && "🎉 Dominás expresiones algebraicas."}
            {ok >= 3 && ok < ejs.length && "Repasá los que fallaste. Los productos notables se vienen pidiendo seguido."}
            {ok < 3 && "Volvé a las escenas 5 (distributiva) y 6 (FOIL)."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
