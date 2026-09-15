"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  cajaAnim, Stage,
} from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion,
} from "../_components/pedagogia";
import { LIENZO } from "../_components/lienzo";

// ─────────────────────────────────────────────────────────────────────────────
// Operaciones fundamentales: VERSIÓN COMPLETA Y AUTOCONTENIDA
// Un estudiante que empieza desde cero puede dominar todo el tema solo con
// esta lección. Cada escena tiene: definición clara, justificación del POR
// QUÉ, ejemplos resueltos paso a paso, errores comunes y auto-check.
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Operaciones fundamentales"
      escenas={[
        { titulo: "Antes de empezar", componente: Esc01_Bienvenida },
        { titulo: "Los números: un repaso rápido", componente: Esc02_Numeros },
        { titulo: "Suma: el concepto", componente: Esc03_SumaConcepto },
        { titulo: "Suma: propiedades", componente: Esc04_SumaProps },
        { titulo: "Resta: el concepto", componente: Esc05_RestaConcepto },
        { titulo: "Resta y números negativos", componente: Esc06_RestaNeg },
        { titulo: "Multiplicación: el concepto", componente: Esc07_MultConcepto },
        { titulo: "Multiplicación: propiedades", componente: Esc08_MultProps },
        { titulo: "Multiplicación con negativos", componente: Esc09_MultNeg },
        { titulo: "División: el concepto", componente: Esc10_DivConcepto },
        { titulo: "División con resto", componente: Esc11_DivResto },
        { titulo: "¿Por qué no se divide por 0?", componente: Esc12_DivCero },
        { titulo: "Jerarquía: el orden importa", componente: Esc13_JerIntro },
        { titulo: "PEMDAS: la regla", componente: Esc14_PEMDAS },
        { titulo: "Ejemplos resueltos paso a paso", componente: Esc15_Ejemplos },
        { titulo: "Errores comunes (¡evítalos!)", componente: Esc16_Errores },
        { titulo: "Práctica final", componente: Esc17_Practica },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 01: BIENVENIDA
// ═════════════════════════════════════════════════════════════════════════════
function Esc01_Bienvenida() {
  return (
    <EscenaRica>
      <Titulo>Empezamos desde cero</Titulo>
      <Parrafo>
        Las <strong>operaciones fundamentales</strong> son suma, resta, multiplicación
        y división. Parecen simples, pero <em>todo</em> lo que vas a aprender después
        (álgebra, ecuaciones, funciones, logaritmos…) se apoya en ellas.
      </Parrafo>
      <Parrafo>
        En esta lección vamos a:
      </Parrafo>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12,
        padding: 16, maxWidth: 520, fontSize: 15, lineHeight: 1.8, color: COLOR_BASE,
      }}>
        ✅ Recordar qué es cada operación (no solo cómo se hace).<br />
        ✅ Aprender las <strong>propiedades</strong> (conmutativa, asociativa, distributiva).<br />
        ✅ Entender qué pasa con los números <strong>negativos</strong>.<br />
        ✅ Dominar la <strong>jerarquía de operaciones</strong> (PEMDAS).<br />
        ✅ Practicar con ejemplos resueltos paso a paso.
      </div>
      <Parrafo>
        Si te sientes perdido en algún punto, toca <strong>← Anterior</strong> y vuelve.
        Esta lección está pensada para que la repases cuantas veces necesites.
      </Parrafo>

      <Hook>
        Las operaciones fundamentales son <strong>la base de TODO</strong>. Si fallas en
        signos o en jerarquía, fallas en cualquier cuenta. En el examen UMSS los errores
        de aritmética cuestan puntos en preguntas que ya estaban "ganadas". Repásalo bien
        ahora: ahorra dolor después.
      </Hook>

      <Mnemotecnia>
        <strong>"PEMDAS" · jerarquía de operaciones</strong>:<br />
        <strong>P</strong>aréntesis → <strong>E</strong>xponentes (y raíces) →
        <strong> M</strong>ultiplicación y <strong>D</strong>ivisión (de izquierda a derecha) →
        <strong> A</strong>dición y <strong>S</strong>ustracción (de izquierda a derecha).<br /><br />
        Frase clave: "<em>Por Eso Mucha Diversión Antes de Sufrir</em>".<br />
        Multiplicación y división tienen <strong>la misma jerarquía</strong>; se hacen en el
        orden que aparecen. Igual para suma y resta.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 02: Los números (recta numérica)
// ═════════════════════════════════════════════════════════════════════════════
function Esc02_Numeros() {
  return (
    <EscenaRica>
      <Titulo>Los números: un mapa rápido</Titulo>
      <Parrafo>
        Antes de operar, conviene ordenar qué tipos de números existen. Todos los
        que vas a usar en el examen viven en la <strong>recta numérica</strong>:
      </Parrafo>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={120}>
          {/* Recta */}
          <div style={{ position: "absolute", left: 20, top: 60, right: 20, height: 3, background: COLOR_BASE, borderRadius: 2 }} />
          {/* Marcas */}
          {[-3, -2, -1, 0, 1, 2, 3].map((n, k) => {
            const x = 30 + k * 60;
            return (
              <div key={n}>
                <div style={{ position: "absolute", left: x, top: 53, width: 2, height: 17, background: COLOR_BASE }} />
                <div style={{ position: "absolute", left: x - 8, top: 75, fontSize: 14, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
                  {n}
                </div>
              </div>
            );
          })}
          {/* Flecha izquierda */}
          <div style={{ position: "absolute", left: 5, top: 53, fontSize: 18, color: COLOR_BASE }}>◀</div>
          <div style={{ position: "absolute", right: 5, top: 53, fontSize: 18, color: COLOR_BASE }}>▶</div>
        </Stage>
      </div>

      <Definicion termino="Tipos de números">
        <strong style={{ color: "#3b82f6" }}>Naturales (ℕ):</strong> 1, 2, 3, 4… (para contar).<br />
        <strong style={{ color: "#10b981" }}>Enteros (ℤ):</strong> los naturales + sus opuestos + el 0: …−3, −2, −1, 0, 1, 2, 3…<br />
        <strong style={{ color: "#f59e0b" }}>Racionales (ℚ):</strong> los que se pueden escribir como fracción a/b. Incluye 1/2, 0.75, −3, etc.<br />
        <strong style={{ color: "#8b5cf6" }}>Reales (ℝ):</strong> todo lo de arriba + irracionales (√2, π, e…).
      </Definicion>

      <Parrafo>
        En esta lección vamos a operar con <strong>enteros y decimales</strong>. Las
        reglas son las mismas para todos.
      </Parrafo>

      <AutoCheck
        pregunta="¿El número −5 es natural?"
        opciones={["Sí, todos los números enteros son naturales", "No, los naturales son solo positivos", "Solo el 0 es natural", "Depende del contexto"]}
        correctaIdx={1}
        explicacion="Los naturales son los positivos (1, 2, 3, …). El −5 es entero pero no natural."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 03: SUMA: concepto
// ═════════════════════════════════════════════════════════════════════════════
function Esc03_SumaConcepto() {
  return (
    <EscenaRica>
      <Titulo accent="#10b981">Suma: combinar cantidades</Titulo>

      <Parrafo>
        <strong>Sumar</strong> es la operación más básica: juntas dos (o más) cantidades
        en una sola. Si tienes 3 monedas y alguien te da 2 más, terminas con 5.
      </Parrafo>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={130}>
          {/* 3 monedas izquierda */}
          {[0, 1, 2].map((k) => (
            <motion.div key={`a${k}`}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: k * 0.1, type: "spring" }}
              style={{ position: "absolute", left: 50 + k * 32, top: 40, width: 28, height: 28, borderRadius: "50%", background: "#3b82f6", border: "2px solid #1e40af" }} />
          ))}
          <div style={{ position: "absolute", left: 64, top: 80, fontSize: 24, color: COLOR_BASE, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>3</div>

          <div style={{ position: "absolute", left: 168, top: 45, fontSize: 30, color: COLOR_EXP, fontWeight: 800 }}>+</div>

          {/* 2 monedas centro */}
          {[0, 1].map((k) => (
            <motion.div key={`b${k}`}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + k * 0.1, type: "spring" }}
              style={{ position: "absolute", left: 210 + k * 32, top: 40, width: 28, height: 28, borderRadius: "50%", background: "#f59e0b", border: "2px solid #b45309" }} />
          ))}
          <div style={{ position: "absolute", left: 222, top: 80, fontSize: 24, color: COLOR_BASE, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>2</div>

          <div style={{ position: "absolute", left: 290, top: 45, fontSize: 30, color: COLOR_EXP, fontWeight: 800 }}>=</div>

          {/* 5 monedas resultado */}
          {[0, 1, 2, 3, 4].map((k) => (
            <motion.div key={`c${k}`}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + k * 0.08, type: "spring" }}
              style={{ position: "absolute", left: 325 + k * 14, top: 40, width: 28, height: 28, borderRadius: "50%", background: COLOR_OK, border: "2px solid #065f46" }} />
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={{ position: "absolute", left: 354, top: 80, fontSize: 28, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>5</motion.div>
        </Stage>
      </div>

      <Definicion termino="suma">
        Notación: <strong>a + b = c</strong>. <br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          Los números <strong>a</strong> y <strong>b</strong> se llaman <strong>sumandos</strong>. El resultado <strong>c</strong> se llama <strong>suma</strong> (o total).
        </span>
      </Definicion>

      <Ejemplo titulo="Tres ejemplos rápidos">
        <Paso n={1}>2 + 7 = <strong style={{ color: COLOR_OK }}>9</strong></Paso>
        <Paso n={2}>12 + 8 = <strong style={{ color: COLOR_OK }}>20</strong></Paso>
        <Paso n={3}>134 + 250 = <strong style={{ color: COLOR_OK }}>384</strong></Paso>
      </Ejemplo>

      <Cuidado>
        Los signos <strong>+</strong> y <strong>−</strong> son delicados. <strong>3 + (−2) = 1</strong>, no 5.
        Cuando aparezca un signo menos pegado a un número, trata ese número como negativo (lo vemos en detalle más adelante).
      </Cuidado>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 04: SUMA: propiedades
// ═════════════════════════════════════════════════════════════════════════════
function Esc04_SumaProps() {
  return (
    <EscenaRica>
      <Titulo accent="#10b981">Las 3 propiedades de la suma</Titulo>
      <Parrafo>
        La suma tiene 3 propiedades importantes. No son trucos de memoria:
        son cosas que <em>siempre</em> valen y que vas a usar en todo lo siguiente.
      </Parrafo>

      <Ejemplo titulo="1. Conmutativa">
        <strong>a + b = b + a</strong>
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 14 }}>
          El orden no cambia el resultado. <strong>3 + 5 = 5 + 3 = 8</strong>.
        </div>
        <PorQue>
          Cuando juntas dos grupos de cosas, el resultado no depende de cuál
          juntas primero. Es lo mismo "3 manzanas más 5 manzanas" que
          "5 manzanas más 3 manzanas".
        </PorQue>
      </Ejemplo>

      <Ejemplo titulo="2. Asociativa">
        <strong>(a + b) + c = a + (b + c)</strong>
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 14 }}>
          Si sumas varios números, puedes agrupar como quieras: <br />
          <strong>(2 + 3) + 4 = 5 + 4 = 9</strong> &nbsp; o &nbsp; <strong>2 + (3 + 4) = 2 + 7 = 9</strong>.
        </div>
      </Ejemplo>

      <Ejemplo titulo="3. Elemento neutro">
        <strong>a + 0 = a</strong>
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 14 }}>
          Sumar 0 no cambia nada. <strong>7 + 0 = 7</strong>. El 0 es el "elemento neutro" de la suma.
        </div>
      </Ejemplo>

      <Resumen>
        Estas 3 propiedades te permiten <strong>reordenar y reagrupar</strong> sumandos
        para hacer cuentas más fáciles. Por ejemplo: 7 + 8 + 3 conviene reordenarlo
        como (7 + 3) + 8 = 10 + 8 = 18.
      </Resumen>

      <AutoCheck
        pregunta="¿Por qué 5 + 12 + 5 + 8 se puede calcular como (5 + 5) + (12 + 8)?"
        opciones={[
          "Por la propiedad conmutativa y asociativa (reordeno y reagrupo)",
          "Por la propiedad distributiva",
          "Porque los números son pares",
          "Es una coincidencia",
        ]}
        correctaIdx={0}
        explicacion="Conmutativa para reordenar, asociativa para agrupar. Y queda 10 + 20 = 30."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 05: RESTA: concepto
// ═════════════════════════════════════════════════════════════════════════════
function Esc05_RestaConcepto() {
  return (
    <EscenaRica>
      <Titulo accent="#f59e0b">Resta: quitar de un total</Titulo>

      <Parrafo>
        <strong>Restar</strong> es lo opuesto a sumar: quitas una cantidad de otra.
        Si tienes 7 panes y te comes 3, te quedan 4.
      </Parrafo>

      <Definicion termino="resta">
        Notación: <strong>a − b = c</strong>. <br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          <strong>a</strong> es el <strong>minuendo</strong> (lo que tienes). <strong>b</strong> es el <strong>sustraendo</strong> (lo que sacas). <strong>c</strong> es la <strong>diferencia</strong>.
        </span>
      </Definicion>

      <Ejemplo titulo="Ejemplos">
        <Paso n={1}>10 − 4 = <strong style={{ color: COLOR_OK }}>6</strong> (tenía 10, saqué 4, me quedan 6)</Paso>
        <Paso n={2}>25 − 12 = <strong style={{ color: COLOR_OK }}>13</strong></Paso>
        <Paso n={3}>100 − 99 = <strong style={{ color: COLOR_OK }}>1</strong></Paso>
      </Ejemplo>

      <Cuidado>
        La resta <strong>NO es conmutativa</strong>: <br />
        <strong>5 − 3 = 2</strong> &nbsp; pero &nbsp; <strong>3 − 5 = −2</strong> (¡distinto!)<br />
        Tampoco es asociativa: <strong>(10 − 5) − 2 = 3</strong>, pero <strong>10 − (5 − 2) = 7</strong>.<br />
        Por eso en la resta <em>el orden importa</em>.
      </Cuidado>

      <PorQue>
        Restar a − b es lo mismo que <strong>sumar el opuesto</strong> de b. O sea:{" "}
        <strong>5 − 3 = 5 + (−3)</strong>. Este truco va a ser clave cuando lleguemos al
        álgebra: ahí la resta y la suma se vuelven casi la misma operación.
      </PorQue>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 06: RESTA y NEGATIVOS
// ═════════════════════════════════════════════════════════════════════════════
function Esc06_RestaNeg() {
  return (
    <EscenaRica>
      <Titulo accent="#f59e0b">Cuando la resta da negativo</Titulo>

      <Parrafo>
        ¿Qué pasa si quieres restar más de lo que tienes? Por ejemplo, ¿cuánto es
        <strong> 3 − 7</strong>?
      </Parrafo>

      <Parrafo>
        El resultado es <strong style={{ color: COLOR_BAD }}>−4</strong> (menos cuatro).
        Es un número <strong>negativo</strong>. En la recta numérica, los negativos
        viven a la izquierda del 0:
      </Parrafo>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={110}>
          <div style={{ position: "absolute", left: 20, top: 50, right: 20, height: 3, background: COLOR_BASE, borderRadius: 2 }} />
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((n, k) => {
            const x = 28 + k * 36;
            const esNeg = n < 0;
            return (
              <div key={n}>
                <div style={{ position: "absolute", left: x, top: 44, width: 2, height: 15, background: esNeg ? COLOR_BAD : COLOR_BASE }} />
                <div style={{ position: "absolute", left: x - 8, top: 64, fontSize: 13, color: esNeg ? COLOR_BAD : COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
                  {n}
                </div>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 50, top: 20, fontSize: 11, color: COLOR_BAD, fontWeight: 800, letterSpacing: 1 }}>← NEGATIVOS</div>
          <div style={{ position: "absolute", left: 280, top: 20, fontSize: 11, color: COLOR_OK, fontWeight: 800, letterSpacing: 1 }}>POSITIVOS →</div>
        </Stage>
      </div>

      <PorQue>
        Piensa en dinero: si tienes 3 bolivianos y quieres gastar 7, te falta 4. Esa "deuda" se anota
        como <strong>−4</strong>. Los negativos son la forma matemática de decir "te falta".
      </PorQue>

      <Ejemplo titulo="Regla práctica">
        Cuando <strong>a {"<"} b</strong> en la cuenta <strong>a − b</strong>:
        <Paso n={1}>Calcula <strong>b − a</strong> (el más grande menos el más chico).</Paso>
        <Paso n={2}>El resultado lleva signo <strong>menos</strong>.</Paso>
        <div style={{ marginTop: 8, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
          Ej: 3 − 7 → calculo 7 − 3 = 4 → resultado: <strong>−4</strong>
        </div>
      </Ejemplo>

      <AutoCheck
        pregunta="¿Cuánto es 8 − 15?"
        opciones={["7", "−7", "23", "No se puede"]}
        correctaIdx={1}
        explicacion="Como 8 < 15, hago 15 − 8 = 7 y le pongo signo menos: −7."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 07: MULTIPLICACIÓN: concepto
// ═════════════════════════════════════════════════════════════════════════════
function Esc07_MultConcepto() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>Multiplicación: suma repetida</Titulo>

      <Parrafo>
        <strong>Multiplicar</strong> es una forma corta de escribir una suma del mismo
        número. En lugar de escribir <strong>4 + 4 + 4</strong>, escribes <strong>3 × 4</strong>
        (tres veces el cuatro).
      </Parrafo>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={150}>
          {/* Grilla 3 x 4 */}
          {[0, 1, 2].map((fila) =>
            [0, 1, 2, 3].map((col) => {
              const k = fila * 4 + col;
              return (
                <motion.div key={k}
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: k * 0.05, type: "spring" }}
                  style={{
                    position: "absolute", left: 120 + col * 36, top: 20 + fila * 36,
                    width: 28, height: 28, borderRadius: 8, background: COLOR_BASE,
                  }}
                />
              );
            })
          )}
          {/* Etiqueta */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ position: "absolute", left: 20, top: 50, fontSize: 14, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            3 filas
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ position: "absolute", left: 150, top: 130, fontSize: 14, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            × 4 cuadraditos = 12
          </motion.div>
        </Stage>
      </div>

      <Definicion termino="multiplicación">
        Notación: <strong>a × b = c</strong> (también se escribe <strong>a · b</strong> o <strong>ab</strong>). <br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          <strong>a</strong> y <strong>b</strong> son los <strong>factores</strong>. <strong>c</strong> es el <strong>producto</strong>.
        </span>
      </Definicion>

      <Ejemplo titulo="Tres formas de ver lo mismo">
        <Paso n={1}>Como suma repetida: <strong>3 × 4 = 4 + 4 + 4 = 12</strong></Paso>
        <Paso n={2}>Como área: 3 × 4 = área de un rectángulo de 3 por 4 = 12 cuadraditos.</Paso>
        <Paso n={3}>Como repetición: "tres grupos de cuatro" o "cuatro grupos de tres".</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 08: MULTIPLICACIÓN: propiedades
// ═════════════════════════════════════════════════════════════════════════════
function Esc08_MultProps() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>Las propiedades de la multiplicación</Titulo>

      <Ejemplo titulo="1. Conmutativa">
        <strong>a · b = b · a</strong>
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 14 }}>
          3 × 4 = 4 × 3 = 12. El orden no cambia el producto.
        </div>
      </Ejemplo>

      <Ejemplo titulo="2. Asociativa">
        <strong>(a · b) · c = a · (b · c)</strong>
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 14 }}>
          (2 × 3) × 4 = 6 × 4 = 24 &nbsp; y &nbsp; 2 × (3 × 4) = 2 × 12 = 24.
        </div>
      </Ejemplo>

      <Ejemplo titulo="3. Distributiva (¡la más importante!)">
        <strong>a · (b + c) = a · b + a · c</strong>
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 14 }}>
          Permite "abrir" una multiplicación por una suma. Ej: <br />
          <strong>5 · (3 + 4) = 5 · 3 + 5 · 4 = 15 + 20 = 35</strong>.
        </div>
        <PorQue>
          Esta es la propiedad que justifica gran parte del álgebra. Cuando
          factorizas un polinomio o multiplicas (x+2)(x+3), estas usando la
          distributiva. <strong>Memorízala bien.</strong>
        </PorQue>
      </Ejemplo>

      <Ejemplo titulo="4. Elemento neutro: el 1">
        <strong>a · 1 = a</strong>. Multiplicar por 1 no cambia nada.
      </Ejemplo>

      <Ejemplo titulo="5. Absorbente: el 0">
        <strong>a · 0 = 0</strong>. <em>Cualquier</em> número multiplicado por 0 da 0.
        <PorQue>
          Multiplicar a por 0 es "tener cero copias de a". Y cero copias de cualquier cosa son nada.
        </PorQue>
      </Ejemplo>

      {/* "70 + 2 = 72" es el error clásico de la distributiva: multiplicar el 7
          solo por el primer número de adentro. Estaba como parte de la respuesta
          CORRECTA ("las dos b) y c)"), así que el ejercicio enseñaba justo el
          error que tiene que evitar. Ahora es un distractor, que es su lugar.
          Las otras opciones tampoco podían referirse a "b)" y "c)": AutoCheck no
          rotula las opciones con letras, así que el alumno no las veía. */}
      <AutoCheck
        pregunta="Aplicando la distributiva, ¿cuánto es 7 · (10 + 2)?"
        opciones={["70 + 2 = 72", "7 · 10 + 2 = 72", "7 · 10 + 7 · 2 = 84", "7 · 10 · 7 · 2 = 980"]}
        correctaIdx={2}
        explicacion="7 · (10 + 2) = 7 · 10 + 7 · 2 = 70 + 14 = 84. El 7 multiplica a los DOS números de adentro, no solo al primero: ese es el error más común. Y se puede comprobar haciendo primero el paréntesis: 7 × 12 = 84, el mismo resultado."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 09: MULTIPLICACIÓN con NEGATIVOS
// ═════════════════════════════════════════════════════════════════════════════
function Esc09_MultNeg() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>Reglas de signos al multiplicar</Titulo>

      <Parrafo>
        Multiplicar números con signo sigue 4 reglas simples:
      </Parrafo>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 500, width: "100%",
        fontFamily: "var(--font-crimson), serif", fontWeight: 700, fontSize: 18,
      }}>
        {[
          { a: "(+) · (+)", r: "(+)", color: COLOR_OK, ej: "3 · 4 = 12" },
          { a: "(+) · (−)", r: "(−)", color: COLOR_BAD, ej: "3 · (−4) = −12" },
          { a: "(−) · (+)", r: "(−)", color: COLOR_BAD, ej: "(−3) · 4 = −12" },
          { a: "(−) · (−)", r: "(+)", color: COLOR_OK, ej: "(−3) · (−4) = 12" },
        ].map((c, k) => (
          <div key={k} style={{
            padding: "12px 14px", borderRadius: 12,
            background: "var(--bg-card)", border: `2px solid ${c.color}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 16, color: COLOR_BASE }}>{c.a} = <span style={{ color: c.color }}>{c.r}</span></div>
            <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 4, fontWeight: 600 }}>{c.ej}</div>
          </div>
        ))}
      </div>

      <Resumen>
        Regla rápida: <strong>signos iguales → positivo</strong>, <strong>signos distintos → negativo</strong>.
      </Resumen>

      <PorQue>
        ¿Por qué (−) · (−) = (+)? Una forma de verlo: si te quitan una deuda, ganas. <br />
        Matemáticamente: usar la distributiva con 0 = 1 + (−1) lleva a esa conclusión obligadamente.
      </PorQue>

      <Cuidado>
        ¡Mucho cuidado con los paréntesis! <br />
        <strong>−3²</strong> NO es lo mismo que <strong>(−3)²</strong>.<br />
        <span style={{ fontSize: 13 }}>
          <strong>−3²</strong> = −(3·3) = <strong>−9</strong> (primero el cuadrado, después el menos).<br />
          <strong>(−3)²</strong> = (−3)·(−3) = <strong>+9</strong> (el menos está adentro del paréntesis).
        </span>
      </Cuidado>

      <AutoCheck
        pregunta="¿Cuánto es (−5) · 6?"
        opciones={["30", "−30", "−11", "11"]}
        correctaIdx={1}
        explicacion="Signos distintos → negativo. 5 · 6 = 30, con signo menos: −30."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 10: DIVISIÓN: concepto
// ═════════════════════════════════════════════════════════════════════════════
function Esc10_DivConcepto() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>División: repartir en partes iguales</Titulo>

      <Parrafo>
        <strong>Dividir</strong> es lo opuesto a multiplicar. Hay dos formas de
        pensarla:
      </Parrafo>

      <Ejemplo titulo="Forma 1: repartir">
        <strong>12 ÷ 3</strong> pregunta: si tengo 12 caramelos y los reparto entre 3
        chicos, ¿cuántos le tocan a cada uno? Respuesta: <strong>4</strong>.
      </Ejemplo>

      <Ejemplo titulo="Forma 2: agrupar">
        <strong>12 ÷ 3</strong> también pregunta: ¿cuántos grupos de 3 caben en 12?
        Respuesta: <strong>4 grupos</strong>.
      </Ejemplo>

      <Definicion termino="división">
        Notación: <strong>a ÷ b = c</strong> (también <strong>a/b</strong> o <strong>a : b</strong>).<br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          <strong>a</strong> es el <strong>dividendo</strong> (lo que repartes). <strong>b</strong> es el <strong>divisor</strong> (entre cuántos). <strong>c</strong> es el <strong>cociente</strong> (cuánto le toca a cada uno).
        </span>
      </Definicion>

      <PorQue>
        Dividir es la operación inversa de multiplicar. <strong>12 ÷ 3 = 4</strong> porque
        <strong> 4 · 3 = 12</strong>. Siempre puedes verificar una división multiplicando.
      </PorQue>

      <Cuidado>
        La división <strong>NO es conmutativa</strong>: <strong>12 ÷ 3 = 4</strong>, pero <strong>3 ÷ 12 = 0.25</strong>.<br />
        Tampoco es asociativa. El orden importa muchísimo.
      </Cuidado>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 11: DIVISIÓN CON RESTO
// ═════════════════════════════════════════════════════════════════════════════
function Esc11_DivResto() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>Cuando la división no es exacta</Titulo>

      <Parrafo>
        No todas las divisiones dan un resultado entero. Por ejemplo, <strong>14 ÷ 4</strong>:
        si reparto 14 caramelos entre 4 chicos, le toca <strong>3 a cada uno</strong>
        (eso son 12) y <strong>sobran 2</strong>.
      </Parrafo>

      <Ejemplo titulo="División con resto">
        <strong>14 ÷ 4 = 3 (resto 2)</strong>
        <Paso n={1}>Cociente = 3 (las veces que el 4 entra en 14).</Paso>
        <Paso n={2}>Resto = 2 (lo que sobra).</Paso>
        <Paso n={3}>Verificación: <strong>3 · 4 + 2 = 12 + 2 = 14</strong> ✓</Paso>
      </Ejemplo>

      <Resumen>
        Fórmula clave: <strong>Dividendo = Divisor · Cociente + Resto</strong>.<br />
        Y el resto siempre debe cumplir <strong>0 ≤ resto {"<"} divisor</strong>.
      </Resumen>

      <Parrafo>
        Si quieres un resultado <em>decimal</em> en lugar de un resto, sigues dividiendo:
        <strong> 14 ÷ 4 = 3,5</strong> exactamente.
      </Parrafo>

      <AutoCheck
        pregunta="Al dividir 23 entre 5, ¿cuál es el cociente y el resto?"
        opciones={["Cociente 4, resto 3", "Cociente 5, resto 0", "Cociente 4, resto 5", "Cociente 3, resto 8"]}
        correctaIdx={0}
        explicacion="5 entra 4 veces en 23 (5·4=20). Sobran 23−20=3. Y 3 < 5 ✓."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 12: DIVISIÓN POR CERO
// ═════════════════════════════════════════════════════════════════════════════
function Esc12_DivCero() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>¿Por qué no se puede dividir por 0?</Titulo>

      <Parrafo>
        En toda matemática vas a ver esto: <strong>la división por 0 está prohibida</strong>.
        No es un capricho: hay una razón profunda. Veamos.
      </Parrafo>

      <Ejemplo titulo="Intento: ¿cuánto vale 6 ÷ 0?">
        Supongamos que <strong>6 ÷ 0 = x</strong> para algún número x.<br />
        Eso equivaldría a decir <strong>x · 0 = 6</strong>.<br />
        Pero por la propiedad absorbente, <strong>x · 0 = 0 siempre</strong>, no 6.<br />
        <strong style={{ color: COLOR_BAD }}>Contradicción.</strong> Por eso 6 ÷ 0 no existe.
      </Ejemplo>

      <Ejemplo titulo="¿Y 0 ÷ 0?">
        Sería un x tal que <strong>x · 0 = 0</strong>. ¡Pero <em>cualquier</em> x cumple
        eso! El resultado no sería único, y en matemáticas las operaciones tienen
        que tener UN resultado. Por eso también está prohibido.
      </Ejemplo>

      <Resumen>
        Regla absoluta: <strong>NUNCA divides por 0</strong>. Si en un ejercicio aparece
        algo que termina dividiendo por 0, ese caso queda <em>excluido</em> del dominio.
      </Resumen>

      <Cuidado>
        Esta regla aparece todo el tiempo en álgebra. Cuando aparezca <strong>1/(x−3)</strong>,
        sabes que <strong>x ≠ 3</strong> (porque ahí el denominador sería 0). Lo vas a usar
        en dominio de funciones, ecuaciones racionales y muchísimo más.
      </Cuidado>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 13: JERARQUÍA: introducción
// ═════════════════════════════════════════════════════════════════════════════
function Esc13_JerIntro() {
  return (
    <EscenaRica>
      <Titulo>El orden importa: jerarquía de operaciones</Titulo>

      <Parrafo>
        Pregunta clave: <strong>¿cuánto vale 2 + 3 × 4?</strong>
      </Parrafo>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 500, width: "100%",
        fontFamily: "var(--font-crimson), serif",
      }}>
        <div style={{
          padding: "14px 12px", borderRadius: 12, background: "#fee2e2", border: `2px solid ${COLOR_BAD}`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: COLOR_BAD, marginBottom: 4 }}>SI SUMAS PRIMERO</div>
          <div style={{ fontSize: 18, color: COLOR_BASE }}>(2+3) × 4 = 20</div>
          <div style={{ fontSize: 11, color: COLOR_BAD, marginTop: 4 }}>(incorrecto)</div>
        </div>
        <div style={{
          padding: "14px 12px", borderRadius: 12, background: "#d1fae5", border: `2px solid ${COLOR_OK}`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: COLOR_OK, marginBottom: 4 }}>SI MULTIPLICAS PRIMERO</div>
          <div style={{ fontSize: 18, color: COLOR_BASE }}>2 + (3 × 4) = 14</div>
          <div style={{ fontSize: 11, color: COLOR_OK, marginTop: 4 }}>(correcto)</div>
        </div>
      </div>

      <Parrafo>
        Hay UNA forma correcta. Los matemáticos acordaron un <strong>orden universal</strong>
        para evitar ambigüedades. Lo llamamos <strong>jerarquía de operaciones</strong>.
      </Parrafo>

      <PorQue>
        ¿Por qué la multiplicación va antes que la suma? Porque <strong>multiplicar es una
        suma agrupada</strong>: <em>3 × 4 = 4+4+4</em> ya es una "unidad". Si fuera lo contrario,
        no habría forma de escribir "el doble de algo más uno" sin paréntesis.
      </PorQue>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 14 — PEMDAS
// ═════════════════════════════════════════════════════════════════════════════
function Esc14_PEMDAS() {
  return (
    <EscenaRica>
      <Titulo>La regla PEMDAS</Titulo>

      <Parrafo>
        Resuelve las operaciones <strong>en este orden</strong>, siempre:
      </Parrafo>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 520, width: "100%" }}>
        {[
          { letra: "P", nombre: "Paréntesis", det: "Primero todo lo que esté entre ( )", color: "#3b82f6" },
          { letra: "E", nombre: "Exponentes y raíces", det: "Después las potencias y las raíces", color: "#8b5cf6" },
          { letra: "MD", nombre: "Multiplicaciones y divisiones", det: "De izquierda a derecha, EN EL ORDEN QUE APARECEN", color: "#10b981" },
          { letra: "AS", nombre: "Adiciones (sumas) y sustracciones (restas)", det: "También de izquierda a derecha", color: "#f59e0b" },
        ].map((r, k) => (
          <div key={k} style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "12px 14px", borderRadius: 12, background: "var(--bg-card)",
            border: `2px solid ${r.color}`,
          }}>
            <div style={{
              flexShrink: 0, width: 44, height: 44, borderRadius: 10,
              background: r.color, color: "white", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-crimson), serif", fontWeight: 800, fontSize: 18,
            }}>
              {r.letra}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: COLOR_BASE }}>{r.nombre}</div>
              <div style={{ fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.4 }}>{r.det}</div>
            </div>
          </div>
        ))}
      </div>

      <Cuidado>
        Multiplicación y división tienen el <strong>mismo rango</strong>: no es que mult. va siempre
        antes que div. <strong>Se hacen en el orden en que aparecen</strong>, de izquierda a derecha.<br />
        Lo mismo para suma y resta.
      </Cuidado>

      <Resumen>
        Mnemotecnia útil: <strong>"PEMDAS"</strong> (Paréntesis, Exponentes, Mult/Div, Adic/Sustr).
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 15 — Ejemplos resueltos
// ═════════════════════════════════════════════════════════════════════════════
function Esc15_Ejemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos completos, paso a paso</Titulo>

      <Ejemplo titulo="Ejemplo 1: Mult antes que suma">
        <strong>5 + 2 × 3</strong>
        <Paso n={1}>Identifico operaciones: hay una suma y una multiplicación.</Paso>
        <Paso n={2}>Por PEMDAS, multiplicación primero: <strong>2 × 3 = 6</strong>.</Paso>
        <Paso n={3}>Queda <strong>5 + 6 = 11</strong>.</Paso>
        <Paso n={4}>Resultado: <strong style={{ color: COLOR_OK }}>11</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="Ejemplo 2: Con paréntesis">
        <strong>(5 + 2) × 3</strong>
        <Paso n={1}>El paréntesis va primero: <strong>5 + 2 = 7</strong>.</Paso>
        <Paso n={2}>Después la multiplicación: <strong>7 × 3 = 21</strong>.</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>21</strong> (¡distinto al ejemplo 1!).</Paso>
      </Ejemplo>

      <Ejemplo titulo="Ejemplo 3: Mezcla más larga">
        <strong>20 ÷ 4 + 3 × 2 − 1</strong>
        <Paso n={1}>No hay paréntesis ni exponentes. Voy con mult/div, de izq a der:</Paso>
        <Paso n={2}><strong>20 ÷ 4 = 5</strong>, y <strong>3 × 2 = 6</strong>. Queda: <strong>5 + 6 − 1</strong></Paso>
        <Paso n={3}>Ahora suma/resta, de izq a der: <strong>5 + 6 = 11</strong>, luego <strong>11 − 1 = 10</strong>.</Paso>
        <Paso n={4}>Resultado: <strong style={{ color: COLOR_OK }}>10</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="Ejemplo 4: Con exponente y negativos">
        <strong>3² − (4 − 7) × 2</strong>
        <Paso n={1}>Paréntesis primero: <strong>4 − 7 = −3</strong>. Queda: <strong>3² − (−3) × 2</strong></Paso>
        <Paso n={2}>Exponente: <strong>3² = 9</strong>. Queda: <strong>9 − (−3) × 2</strong></Paso>
        <Paso n={3}>Multiplicación: <strong>(−3) × 2 = −6</strong>. Queda: <strong>9 − (−6)</strong></Paso>
        <Paso n={4}>Resta de un negativo = sumar: <strong>9 + 6 = 15</strong>.</Paso>
        <Paso n={5}>Resultado: <strong style={{ color: COLOR_OK }}>15</strong></Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 16 — ERRORES COMUNES
// ═════════════════════════════════════════════════════════════════════════════
function Esc16_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Los 5 errores más comunes</Titulo>

      <Parrafo>
        Si los conoces, los evitas. Estos son los errores que aparecen una y otra vez
        en los exámenes:
      </Parrafo>

      <Cuidado>
        <strong>Error 1:</strong> Sumar antes de multiplicar. <br />
        <span style={{ fontSize: 13 }}>
          ❌ <strong>2 + 3 × 4 = 20</strong> (mal: suma primero) <br />
          ✅ <strong>2 + 3 × 4 = 14</strong> (bien: multiplicación primero)
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 2:</strong> Hacer multiplicación siempre antes que división. <br />
        <span style={{ fontSize: 13 }}>
          En <strong>8 ÷ 2 × 4</strong>, haces <em>izquierda a derecha</em>: <br />
          ❌ 8 ÷ (2×4) = 1 (mal) <br />
          ✅ (8÷2) × 4 = 16 (bien)
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 3:</strong> Confundir <strong>−3²</strong> con <strong>(−3)²</strong>. <br />
        <span style={{ fontSize: 13 }}>
          −3² = −9 &nbsp; vs &nbsp; (−3)² = +9. ¡El paréntesis cambia todo!
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 4:</strong> No invertir el signo al restar un negativo. <br />
        <span style={{ fontSize: 13 }}>
          ❌ 5 − (−3) = 2 (mal) <br />
          ✅ 5 − (−3) = 5 + 3 = 8 (bien: menos por menos es más)
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 5:</strong> Dividir por 0 sin darte cuenta. <br />
        <span style={{ fontSize: 13 }}>
          Si una expresión termina dividiendo por algo que vale 0, el resultado
          <strong> no existe</strong>. Siempre revisa que el denominador no sea 0.
        </span>
      </Cuidado>

      <Resumen>
        <strong>Tip de oro</strong>: en un examen, antes de escribir el resultado,
        <em> repasa la jerarquía mentalmente</em>: ¿hay paréntesis? ¿exponentes?
        ¿mult/div? ¿suma/resta? Te ahorra muchísimos errores.
      </Resumen>

      <Misconception titulo="−3² ≠ (−3)² · el signo importa">
        Estos dos NO son iguales:<br />
        • <strong>−3² = −9</strong> (el cuadrado afecta solo al 3; el menos queda afuera).<br />
        • <strong>(−3)² = 9</strong> (el cuadrado afecta TODO el paréntesis: −3 × −3 = 9).<br /><br />
        Regla: <em>el exponente solo se aplica a lo PEGADO inmediatamente</em>. Sin paréntesis,
        el menos queda como factor exterior y arrastra el signo final.
      </Misconception>

      <Conexion>
        Las operaciones fundamentales son la base de:
        <strong> Potenciación, Radicación, Logaritmación</strong> (todas son extensiones de
        la multiplicación), <strong>Álgebra</strong> (los términos se operan con estas reglas),
        <strong> Ecuaciones</strong> (cada despeje aplica operaciones inversas),
        <strong> TODAS las demás unidades</strong> del bloque de matemáticas.
      </Conexion>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 17 — PRÁCTICA FINAL
// ═════════════════════════════════════════════════════════════════════════════
function Esc17_Practica() {
  const ejercicios = useMemo(() => [
    {
      pregunta: "2 + 4 × 5 = ?",
      opciones: ["30", "22", "14", "26"],
      correctaIdx: 1,
      explicacion: "Multiplicación primero: 4·5 = 20. Después suma: 2 + 20 = 22.",
    },
    {
      pregunta: "(8 − 3) × 2 + 1 = ?",
      opciones: ["11", "16", "12", "10"],
      correctaIdx: 0,
      explicacion: "Paréntesis: 8−3 = 5. Mult: 5·2 = 10. Suma: 10+1 = 11.",
    },
    {
      pregunta: "20 ÷ 4 ÷ 5 = ?",
      opciones: ["25", "1", "4", "0,25"],
      correctaIdx: 1,
      explicacion: "De izquierda a derecha: 20÷4 = 5, después 5÷5 = 1.",
    },
    {
      pregunta: "−(−4) + 3 × (−2) = ?",
      opciones: ["−10", "−2", "2", "10"],
      correctaIdx: 1,
      explicacion: "−(−4) = +4. Mult: 3·(−2) = −6. Suma: 4 + (−6) = −2.",
    },
    {
      pregunta: "(3 + 2)² − 4 × 5 = ?",
      opciones: ["5", "21", "−15", "−5"],
      correctaIdx: 0,
      explicacion: "Paréntesis: 5. Exponente: 5² = 25. Mult: 4·5 = 20. Resta: 25 − 20 = 5.",
    },
  ], []);

  const [respondidas, setRespondidas] = useState<Record<number, number>>({});
  const correctas = Object.entries(respondidas).filter(([k, v]) => ejercicios[Number(k)].correctaIdx === v).length;

  return (
    <EscenaRica>
      <Titulo>Practica lo aprendido</Titulo>
      <Parrafo>
        Resuelve estos 5 ejercicios sin mirar las páginas anteriores. Si alguno te cuesta,
        vuelve al ejemplo correspondiente y léelo de nuevo. <strong>El objetivo no es
        acertar todo de una: es darte cuenta de qué te falta repasar.</strong>
      </Parrafo>

      {ejercicios.map((ej, i) => {
        const elegida = respondidas[i];
        const reveal = elegida !== undefined;
        return (
          <div key={i} style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: 14, padding: 16, maxWidth: 580, width: "100%",
          }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>
              EJERCICIO {i + 1}
            </div>
            <div style={{ fontSize: 22, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12, textAlign: "center" }}>
              {ej.pregunta}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {ej.opciones.map((op, j) => {
                const sel = elegida === j;
                const ok = j === ej.correctaIdx;
                return (
                  <button key={j}
                    onClick={() => !reveal && setRespondidas({ ...respondidas, [i]: j })}
                    disabled={reveal}
                    style={{
                      padding: "10px 14px",
                      background: !reveal ? "var(--bg-base)"
                        : ok ? "#d1fae5"
                        : sel ? "#fee2e2"
                        : "var(--bg-base)",
                      border: `1.5px solid ${!reveal ? "var(--border)" : ok ? COLOR_OK : sel ? COLOR_BAD : "var(--border)"}`,
                      borderRadius: 10, fontSize: 18, fontWeight: 700,
                      color: COLOR_BASE, cursor: reveal ? "default" : "pointer",
                      fontFamily: "var(--font-crimson), serif",
                    }}
                  >
                    {op}
                    {reveal && ok && <span style={{ marginLeft: 6, color: COLOR_OK }}>✓</span>}
                    {reveal && sel && !ok && <span style={{ marginLeft: 6, color: COLOR_BAD }}>✗</span>}
                  </button>
                );
              })}
            </div>
            {reveal && (
              <div style={{
                marginTop: 10, padding: "10px 12px",
                background: elegida === ej.correctaIdx ? "#ecfdf5" : "#fef2f2",
                borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5,
              }}>
                <strong style={{ color: elegida === ej.correctaIdx ? COLOR_OK : COLOR_BAD }}>
                  {elegida === ej.correctaIdx ? "¡Correcto!" : "Veamos:"}
                </strong>{" "}
                {ej.explicacion}
              </div>
            )}
          </div>
        );
      })}

      {Object.keys(respondidas).length === ejercicios.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: 18, background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
            border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
            {correctas} / {ejercicios.length} correctas
          </div>
          <div style={{ fontSize: 14, color: "#065f46", marginTop: 6 }}>
            {correctas === ejercicios.length && "🎉 ¡Perfecto! Tienes bien dominadas las operaciones fundamentales."}
            {correctas >= 3 && correctas < ejercicios.length && "Muy bien. Repasa los ejercicios que te costaron y vuelve en unos días."}
            {correctas < 3 && "Vuelve a las escenas anteriores y repasa los conceptos. La práctica gana, no te apures."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
