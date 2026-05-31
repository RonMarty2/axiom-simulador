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

// ─────────────────────────────────────────────────────────────────────────────
// Radicación y propiedades — versión completa y autocontenida.
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Radicación y propiedades"
      escenas={[
        { titulo: "¿Qué es radicar?", componente: Esc01_Intro },
        { titulo: "Raíz cuadrada: el concepto", componente: Esc02_RaizCuad },
        { titulo: "Cuadrados perfectos", componente: Esc03_CuadPerf },
        { titulo: "Cuando la raíz no es exacta", componente: Esc04_Irracional },
        { titulo: "Raíz n-ésima", componente: Esc05_NEsima },
        { titulo: "Raíz ↔ exponente fraccionario", componente: Esc06_Equiv },
        { titulo: "Raíz de un producto", componente: Esc07_Producto },
        { titulo: "Raíz de un cociente", componente: Esc08_Cociente },
        { titulo: "Simplificar radicales", componente: Esc09_Simplificar },
        { titulo: "Suma y resta de radicales", componente: Esc10_SumaResta },
        { titulo: "Racionalización", componente: Esc11_Racionalizacion },
        { titulo: "Errores comunes", componente: Esc12_Errores },
        { titulo: "Práctica final", componente: Esc13_Practica },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 01 — INTRODUCCIÓN
// ═════════════════════════════════════════════════════════════════════════════
function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Radicación: deshacer una potencia</Titulo>
      <Parrafo>
        La <strong>radicación</strong> es la operación inversa de la potenciación.
        Si potenciar pregunta "¿cuánto es 3⁴?", radicar pregunta "<em>¿qué número, elevado
        a una potencia, da este resultado?</em>".
      </Parrafo>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12,
        padding: 16, maxWidth: 540, fontSize: 15, lineHeight: 1.7, color: COLOR_BASE,
      }}>
        🔸 <strong>¿Para qué sirve en economía?</strong><br /><br />
        • <strong>Interés compuesto</strong>: invertís a cierta tasa y querés saber qué tasa anual
        equivale a un crecimiento mensual.<br />
        • <strong>Promedio geométrico</strong>: medir rendimientos de inversión a varios años.<br />
        • <strong>Geometría</strong>: el lado de un cuadrado de área 36 es √36 = 6.<br />
        • <strong>Estadística</strong>: la desviación estándar es la raíz cuadrada de la varianza.
      </div>

      <Resumen>
        En esta lección vas a aprender: qué es una raíz, cómo calcularla, cómo simplificar
        radicales, cómo sumar/restar/multiplicar/dividir radicales, y cómo "racionalizar"
        (sacar las raíces del denominador).
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 02 — RAÍZ CUADRADA: concepto
// ═════════════════════════════════════════════════════════════════════════════
function Esc02_RaizCuad() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">La raíz cuadrada</Titulo>
      <Parrafo>
        Empezamos por el caso más usado: la <strong>raíz cuadrada</strong>.
      </Parrafo>

      <Definicion termino="raíz cuadrada">
        <strong>√a = b</strong> significa que <strong>b² = a</strong>. <br />
        Es decir, √a busca el número que, multiplicado por sí mismo, da a.
      </Definicion>

      {/* VISUAL: √9 → cuadrado de 3×3 */}
      <div onClick={() => setPaso((p) => Math.min(p + 1, 2))} style={{ ...cajaAnim(), padding: "20px 14px" }}>
        <div style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 800, letterSpacing: 1.2, marginBottom: 6 }}>
          ¿CUÁNTO ES √9 ?
        </div>
        <Stage w={400} h={200}>
          {/* Símbolo radical y radicando */}
          <motion.div style={{ position: "absolute", left: 60, top: 60, display: "flex", alignItems: "flex-start" }}
            animate={paso >= 2 ? { opacity: 0.3 } : { opacity: 1 }}>
            <span style={{ fontSize: 80, color: COLOR_BASE, fontWeight: 400, lineHeight: 0.9 }}>√</span>
            <div style={{ borderTop: `3px solid ${COLOR_BASE}`, paddingTop: 8, marginTop: 6, marginLeft: -3 }}>
              <span style={{ fontSize: 56, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>9</span>
            </div>
          </motion.div>

          {/* Grilla 3x3 de cuadraditos */}
          {[0, 1, 2].map((fila) =>
            [0, 1, 2].map((col) => {
              const k = fila * 3 + col;
              return (
                <motion.div key={k}
                  style={{ position: "absolute", left: 240 + col * 38, top: 60 + fila * 38, width: 30, height: 30, borderRadius: 5, background: COLOR_OK }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={paso >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: k * 0.08, type: "spring" }}
                />
              );
            })
          )}
          {/* Etiqueta 3×3 = 9 */}
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
            style={{ position: "absolute", left: 240, top: 180, fontSize: 13, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            3 × 3 = 9 cuadraditos
          </motion.div>

          {/* Resultado: √9 = 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={paso >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 60, top: 60, fontSize: 50, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}
          >
            √9 = 3
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 4, fontStyle: "italic", textAlign: "center" }}>
          {paso === 0 && "👆 Tocá para visualizar"}
          {paso === 1 && "Un cuadrado con 9 cuadraditos tiene LADO 3"}
          {paso === 2 && "Por eso √9 = 3 (el lado del cuadrado de área 9)"}
        </div>
      </div>

      <Ejemplo titulo="Ejemplos directos">
        <Paso n={1}>√<strong>9</strong> = 3, porque 3² = 9.</Paso>
        <Paso n={2}>√<strong>25</strong> = 5, porque 5² = 25.</Paso>
        <Paso n={3}>√<strong>100</strong> = 10, porque 10² = 100.</Paso>
        <Paso n={4}>√<strong>1</strong> = 1, porque 1² = 1.</Paso>
        <Paso n={5}>√<strong>0</strong> = 0, porque 0² = 0.</Paso>
      </Ejemplo>

      <PorQue>
        Por convención, <strong>√ se refiere SOLO al valor positivo</strong>. Aunque
        técnicamente tanto 3 como −3 elevados al cuadrado dan 9, escribimos √9 = 3,
        no ±3. Si querés ambos, se escribe ±√9.
      </PorQue>

      <Cuidado>
        <strong>No se puede sacar raíz cuadrada de un número negativo</strong> en los
        reales (en este curso). ¿Por qué? Porque cualquier número real al cuadrado
        es ≥ 0. No existe ningún real b tal que b² = −4.<br />
        Más adelante (números complejos) eso cambia, pero acá no.
      </Cuidado>

      <AutoCheck
        pregunta="¿Cuánto vale √49?"
        opciones={["7", "±7", "−7", "24.5"]}
        correctaIdx={0}
        explicacion="Por convención √ es el resultado positivo. √49 = 7 (no ±7)."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 03 — CUADRADOS PERFECTOS
// ═════════════════════════════════════════════════════════════════════════════
function Esc03_CuadPerf() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Cuadrados perfectos: para tener a mano</Titulo>
      <Parrafo>
        Te conviene memorizar los primeros cuadrados perfectos. Aparecen todo el
        tiempo en los exámenes:
      </Parrafo>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, maxWidth: 520, width: "100%",
        fontFamily: "var(--font-crimson), serif", fontWeight: 700,
      }}>
        {[
          { n: 1, c: 1 }, { n: 2, c: 4 }, { n: 3, c: 9 }, { n: 4, c: 16 },
          { n: 5, c: 25 }, { n: 6, c: 36 }, { n: 7, c: 49 }, { n: 8, c: 64 },
          { n: 9, c: 81 }, { n: 10, c: 100 }, { n: 11, c: 121 }, { n: 12, c: 144 },
        ].map(({ n, c }) => (
          <div key={n} style={{
            padding: "10px 8px", borderRadius: 8, background: "var(--bg-subtle)",
            border: "1px solid var(--border)", textAlign: "center",
          }}>
            <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800 }}>{n}²</div>
            <div style={{ fontSize: 16, color: COLOR_BASE }}>= {c}</div>
          </div>
        ))}
      </div>

      <Parrafo>
        <strong>Lectura inversa</strong>: si memorizás que 7² = 49, ya sabés que √49 = 7.
        Es la misma información mirada al revés.
      </Parrafo>

      <Resumen>
        Conociendo de memoria de 1² a 12² podés resolver muchísimas raíces sin pensar.
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 04 — Cuando la raíz no es exacta
// ═════════════════════════════════════════════════════════════════════════════
function Esc04_Irracional() {
  return (
    <EscenaRica>
      <Titulo accent="#f59e0b">Cuando la raíz no es entera</Titulo>
      <Parrafo>
        ¿Qué pasa si querés calcular √2? No hay ningún entero que al cuadrado dé 2:
        1² = 1, 2² = 4. La respuesta es un número decimal infinito y no periódico:
      </Parrafo>

      <Ejemplo titulo="El famoso √2">
        <strong>√2 ≈ 1.4142135…</strong>
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 13 }}>
          Es un <strong>número irracional</strong>: no se puede escribir como fracción.
          Igual que π y e.
        </div>
      </Ejemplo>

      <Parrafo>
        En la práctica del examen, casi nunca pedimos el decimal. Lo dejamos
        <strong> en forma de radical</strong> (como √2) y operamos así.
      </Parrafo>

      <Ejemplo titulo="¿Cuándo redondear?">
        Solo redondeás cuando el problema lo pide explícitamente o cuando comparás
        magnitudes numéricas. En álgebra siempre dejá la expresión exacta:
        ej. <strong>"el resultado es 3√2"</strong>, no "≈ 4.24".
      </Ejemplo>

      <PorQue>
        ¿Por qué √2 es irracional? Hay una demostración famosa por contradicción:
        si √2 = p/q en su forma más simple, entonces p² = 2q², así p sería par. Pero
        eso implica que q también, contradiciendo "forma más simple". Lo verás en
        cursos superiores.
      </PorQue>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 05 — RAÍZ N-ÉSIMA
// ═════════════════════════════════════════════════════════════════════════════
function Esc05_NEsima() {
  return (
    <EscenaRica>
      <Titulo accent="#8b5cf6">Raíz n-ésima: cualquier índice</Titulo>
      <Parrafo>
        La raíz cuadrada es solo un caso. En general, podemos tomar raíz de
        cualquier <strong>índice</strong> n:
      </Parrafo>

      <Definicion termino="raíz n-ésima">
        <strong>ⁿ√a = b</strong> significa que <strong>bⁿ = a</strong>. <br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          n se llama <strong>índice</strong>, a se llama <strong>radicando</strong>, b es el resultado.
          Cuando n=2 (raíz cuadrada), no se escribe el índice.
        </span>
      </Definicion>

      <Ejemplo titulo="Raíz cúbica (n=3)">
        <Paso n={1}>³√<strong>8</strong> = 2, porque 2³ = 8.</Paso>
        <Paso n={2}>³√<strong>27</strong> = 3, porque 3³ = 27.</Paso>
        <Paso n={3}>³√<strong>−8</strong> = <strong>−2</strong>, porque (−2)³ = −8.</Paso>
      </Ejemplo>

      <Cuidado>
        <strong>Importante</strong>: con índice <strong>impar</strong> (3, 5, 7…), <em>sí</em>
        se puede sacar raíz de números negativos. Con índice <strong>par</strong> (2, 4, 6…), no.
      </Cuidado>

      <Ejemplo titulo="Raíz cuarta (n=4)">
        ⁴√<strong>16</strong> = 2 (porque 2⁴ = 16). <br />
        ⁴√<strong>−16</strong> = <strong>no existe en reales</strong> (ningún real elevado a la 4 da negativo).
      </Ejemplo>

      <AutoCheck
        pregunta="¿Cuánto vale ³√125?"
        opciones={["25", "5", "−5", "no existe"]}
        correctaIdx={1}
        explicacion="Busco b tal que b³ = 125. Como 5³ = 125, ³√125 = 5."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 06 — Equivalencia con exponente fraccionario
// ═════════════════════════════════════════════════════════════════════════════
function Esc06_Equiv() {
  return (
    <EscenaRica>
      <Titulo>Radicales = exponentes fraccionarios</Titulo>
      <Parrafo>
        <strong>El cambio mental más importante de esta lección</strong>: todo radical
        se puede reescribir como una potencia con exponente fraccionario.
      </Parrafo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          ⁿ√a = a^(1/n)
        </span>
      </Resumen>

      <Ejemplo titulo="Casos básicos">
        <Paso n={1}>√a = a^(1/2)</Paso>
        <Paso n={2}>³√a = a^(1/3)</Paso>
        <Paso n={3}>⁴√a = a^(1/4)</Paso>
      </Ejemplo>

      <Parrafo>
        Y más en general:
      </Parrafo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          ⁿ√(a^m) = a^(m/n)
        </span>
      </Resumen>

      <Ejemplo titulo="Ejemplo aplicado">
        ³√(8²) = 8^(2/3) = (8^(1/3))² = 2² = <strong>4</strong>.
      </Ejemplo>

      <PorQue>
        ¿Por qué? Si ⁿ√a = a^(1/n), entonces elevando ambos lados a n:
        (ⁿ√a)ⁿ = a^(1/n · n) = a^1 = a. Y eso es exactamente la definición de raíz
        n-ésima.
      </PorQue>

      <Resumen>
        🔑 <strong>Convertir radicales en potencias te permite usar TODAS las propiedades
        de los exponentes que ya conocés</strong> (producto, cociente, potencia de potencia, etc).
      </Resumen>

      <AutoCheck
        pregunta="Reescribí 32^(1/5) como radical"
        opciones={["√32", "⁵√32", "32⁵", "1/32⁵"]}
        correctaIdx={1}
        explicacion="32^(1/5) = ⁵√32 = 2 (porque 2⁵ = 32)."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 07 — RAÍZ DE UN PRODUCTO
// ═════════════════════════════════════════════════════════════════════════════
function Esc07_Producto() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Raíz de un producto</Titulo>

      <Resumen>
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          ⁿ√(a · b) = ⁿ√a · ⁿ√b
        </span>
      </Resumen>

      <Parrafo>
        La raíz <strong>se distribuye</strong> en una multiplicación. Es decir: la raíz
        de un producto es el producto de las raíces.
      </Parrafo>

      {/* VISUAL: √36 = √(4·9) → √4 · √9 → 2·3 → 6 */}
      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={{ ...cajaAnim(), padding: "20px 14px" }}>
        <Stage w={420} h={170}>
          {/* √(4·9) inicial */}
          <motion.div style={{ position: "absolute", left: 30, top: 50, display: "flex", alignItems: "flex-start" }}
            animate={paso >= 2 ? { opacity: 0, x: -30 } : { opacity: 1 }}>
            <span style={{ fontSize: 70, color: COLOR_BASE, fontWeight: 400, lineHeight: 0.9 }}>√</span>
            <div style={{ borderTop: `3px solid ${COLOR_BASE}`, paddingTop: 7, marginTop: 6, marginLeft: -3, paddingLeft: 4, paddingRight: 4 }}>
              <span style={{ fontSize: 36, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>4 · 9</span>
            </div>
          </motion.div>

          {/* = */}
          <motion.div style={{ position: "absolute", left: 195, top: 75, fontSize: 32, color: COLOR_EXP, fontWeight: 700 }}
            animate={{ opacity: paso >= 1 ? 1 : 0 }}>
            =
          </motion.div>

          {/* √4 · √9 distribuido */}
          <motion.div style={{ position: "absolute", left: 230, top: 50, display: "flex", alignItems: "center", gap: 8 }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={paso >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", delay: 0.3 }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 50, color: COLOR_OK, fontWeight: 400, lineHeight: 0.9 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_OK}`, paddingTop: 4, marginTop: 4, marginLeft: -2 }}>
                <span style={{ fontSize: 32, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>4</span>
              </div>
            </div>
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>·</span>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 50, color: COLOR_OK, fontWeight: 400, lineHeight: 0.9 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_OK}`, paddingTop: 4, marginTop: 4, marginLeft: -2 }}>
                <span style={{ fontSize: 32, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>9</span>
              </div>
            </div>
          </motion.div>

          {/* Resultado: 2 · 3 = 6 */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ position: "absolute", left: 0, top: 130, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
            = 2 · 3 = 6 ✓
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 4, fontStyle: "italic", textAlign: "center" }}>
          {paso === 0 && "👆 Calculemos √36 escribiéndolo como √(4·9)"}
          {paso === 1 && "La raíz se REPARTE: √4 · √9"}
          {paso === 2 && "Calculamos cada una"}
          {paso === 3 && "2 · 3 = 6 ✓"}
        </div>
      </div>

      <Ejemplo titulo="Verificación numérica">
        √36 = √(4 · 9) = √4 · √9 = 2 · 3 = <strong>6</strong>. ✓
      </Ejemplo>

      <Ejemplo titulo="Útil para simplificar">
        √72 = √(36 · 2) = √36 · √2 = <strong>6√2</strong><br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          (Buscamos en 72 un cuadrado perfecto que lo divida — 36 — y lo sacamos afuera.)
        </span>
      </Ejemplo>

      <PorQue>
        Sale directo de los exponentes: ⁿ√(ab) = (ab)^(1/n) = a^(1/n) · b^(1/n) = ⁿ√a · ⁿ√b.
      </PorQue>

      <Cuidado>
        ⚠️ <strong>NO funciona con sumas</strong>: <br />
        ❌ √(9 + 16) NO es √9 + √4. <br />
        Real: √25 = 5, pero √9 + √16 = 3 + 4 = 7. Distintos.
      </Cuidado>

      <AutoCheck
        pregunta="¿Cuánto es √50 simplificado?"
        opciones={["5√2", "25√2", "2√5", "√50 (no se simplifica)"]}
        correctaIdx={0}
        explicacion="50 = 25 · 2. √50 = √25 · √2 = 5√2."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 08 — RAÍZ DE UN COCIENTE
// ═════════════════════════════════════════════════════════════════════════════
function Esc08_Cociente() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Raíz de un cociente</Titulo>

      <Resumen>
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          ⁿ√(a / b) = ⁿ√a / ⁿ√b
        </span>
      </Resumen>

      <Parrafo>
        Análogo al producto: la raíz también se distribuye en una división.
      </Parrafo>

      <Ejemplo titulo="Verificación">
        √(49/4) = √49 / √4 = 7/2 = <strong>3.5</strong>. ✓
      </Ejemplo>

      <Ejemplo titulo="Otro uso">
        √(81/16) = √81 / √16 = <strong>9/4</strong>.
      </Ejemplo>

      <Cuidado>
        Requisito: <strong>b ≠ 0</strong> (no se puede dividir por 0). Y si el índice
        es par, además a y b deben ser ≥ 0.
      </Cuidado>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 09 — SIMPLIFICAR RADICALES
// ═════════════════════════════════════════════════════════════════════════════
function Esc09_Simplificar() {
  return (
    <EscenaRica>
      <Titulo>Simplificar un radical</Titulo>
      <Parrafo>
        <strong>Simplificar</strong> un radical significa "sacar afuera" todos los
        factores que ya son potencias perfectas del índice. El resto se queda adentro.
      </Parrafo>

      <Ejemplo titulo="Algoritmo paso a paso: √72">
        <Paso n={1}>Factorizo el radicando: 72 = 2³ · 3².</Paso>
        <Paso n={2}>Busco pares (para raíz cuadrada): 2³ = 2² · 2, y 3² ya es par.</Paso>
        <Paso n={3}>Saco lo cuadrado: √(2² · 3² · 2) = 2 · 3 · √2.</Paso>
        <Paso n={4}>Resultado: <strong style={{ color: COLOR_OK }}>6√2</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="Para raíz cúbica: ³√54">
        <Paso n={1}>54 = 2 · 3³.</Paso>
        <Paso n={2}>El 3³ ya es un cubo perfecto: sale como 3. El 2 se queda adentro.</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>3 · ³√2</strong>.</Paso>
      </Ejemplo>

      <PorQue>
        Mirado con exponentes fraccionarios: √(2³·3²) = 2^(3/2) · 3^(2/2) = 2^(1+1/2) · 3^1 = 2·3·2^(1/2) = 6√2.
        El "entero" del exponente sale como factor, la fracción residual queda como raíz.
      </PorQue>

      <Resumen>
        La regla del "examen": <strong>siempre dejá los radicales simplificados</strong>. Si te
        queda √50 en una respuesta, escribilo como 5√2.
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 10 — SUMA Y RESTA
// ═════════════════════════════════════════════════════════════════════════════
function Esc10_SumaResta() {
  return (
    <EscenaRica>
      <Titulo>Sumar y restar radicales</Titulo>

      <Parrafo>
        Para sumar (o restar) radicales, deben ser <strong>SEMEJANTES</strong>: tener
        el mismo índice <em>y</em> el mismo radicando. Si lo son, se suman los coeficientes.
      </Parrafo>

      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a·√x + b·√x = (a + b)·√x
        </span>
      </Resumen>

      <Ejemplo titulo="Caso directo">
        3√5 + 7√5 = (3+7)√5 = <strong>10√5</strong>.
      </Ejemplo>

      <Ejemplo titulo="Cuando parecen distintos, simplificá primero">
        √8 + √2 — ¿son semejantes? √8 = 2√2. Ahora: 2√2 + √2 = <strong>3√2</strong>. ✓
      </Ejemplo>

      <Ejemplo titulo="Suma con tres radicales">
        √12 + √27 − √48 <br />
        = 2√3 + 3√3 − 4√3 = <strong>√3</strong>.
      </Ejemplo>

      <Cuidado>
        Si dos radicales <strong>NO son semejantes</strong> (distinto índice o distinto
        radicando), la suma se deja indicada. No hay forma de juntarlos. <br />
        Ej: 2√3 + 5√7 queda así.
      </Cuidado>

      <AutoCheck
        pregunta="Simplificá: √20 + √45"
        opciones={["√65", "√25", "5√5", "7√5"]}
        correctaIdx={2}
        explicacion="√20 = 2√5 y √45 = 3√5. Suma: 2√5 + 3√5 = 5√5."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 11 — RACIONALIZACIÓN
// ═════════════════════════════════════════════════════════════════════════════
function Esc11_Racionalizacion() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo>Racionalizar el denominador</Titulo>
      <Parrafo>
        Por convención (y porque queda más limpio para operar), <strong>no se deja una
        raíz en el denominador</strong> de una fracción. El proceso de quitarla se llama
        <strong> racionalizar</strong>.
      </Parrafo>

      {/* VISUAL: 1/√2 → multiplicar por √2/√2 → √2/2 */}
      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={{ ...cajaAnim(), padding: "20px 14px" }}>
        <Stage w={420} h={180}>
          {/* 1/√2 inicial */}
          <motion.div style={{ position: "absolute", left: 30, top: 40, display: "flex", flexDirection: "column", alignItems: "center" }}
            animate={paso >= 3 ? { opacity: 0.3 } : { opacity: 1 }}>
            <span style={{ fontSize: 38, color: COLOR_BASE, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>1</span>
            <div style={{ borderTop: `2.5px solid ${COLOR_BASE}`, width: 70, margin: "4px 0" }} />
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 36, color: COLOR_BASE, fontWeight: 400, lineHeight: 0.9 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_BASE}`, paddingTop: 3, marginTop: 3, marginLeft: -2 }}>
                <span style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>2</span>
              </div>
            </div>
          </motion.div>

          {/* × √2/√2 */}
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 130, top: 40, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 700 }}>×</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{ fontSize: 32, color: COLOR_OK, fontWeight: 400, lineHeight: 0.9 }}>√</span>
                <div style={{ borderTop: `2px solid ${COLOR_OK}`, paddingTop: 3, marginTop: 3, marginLeft: -2 }}>
                  <span style={{ fontSize: 24, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>2</span>
                </div>
              </div>
              <div style={{ borderTop: `2.5px solid ${COLOR_OK}`, width: 50, margin: "4px 0" }} />
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                <span style={{ fontSize: 32, color: COLOR_OK, fontWeight: 400, lineHeight: 0.9 }}>√</span>
                <div style={{ borderTop: `2px solid ${COLOR_OK}`, paddingTop: 3, marginTop: 3, marginLeft: -2 }}>
                  <span style={{ fontSize: 24, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>2</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* "vale 1" tag */}
          <motion.div initial={{ opacity: 0 }} animate={paso === 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 145, top: 150, fontSize: 11, color: "var(--fg-muted)", fontStyle: "italic" }}>
            (vale 1, no cambia nada)
          </motion.div>

          {/* = */}
          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 240, top: 55, fontSize: 32, color: COLOR_EXP, fontWeight: 700 }}>
            =
          </motion.div>

          {/* Resultado √2/2 */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={paso >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ type: "spring", delay: 0.2 }}
            style={{ position: "absolute", left: 290, top: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 40, color: COLOR_OK, fontWeight: 400, lineHeight: 0.9 }}>√</span>
              <div style={{ borderTop: `2px solid ${COLOR_OK}`, paddingTop: 3, marginTop: 3, marginLeft: -2 }}>
                <span style={{ fontSize: 30, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>2</span>
              </div>
            </div>
            <div style={{ borderTop: `2.5px solid ${COLOR_OK}`, width: 60, margin: "4px 0" }} />
            <span style={{ fontSize: 36, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>2</span>
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 4, fontStyle: "italic", textAlign: "center" }}>
          {paso === 0 && "👆 1/√2 tiene una raíz fea abajo"}
          {paso === 1 && "Multiplicamos arriba y abajo por √2 (que vale 1)"}
          {paso === 2 && "Arriba queda √2. Abajo: √2·√2 = 2 (¡sin raíz!)"}
          {paso === 3 && "Resultado: √2/2 — ya no hay raíz en el denominador ✓"}
        </div>
      </div>

      <Ejemplo titulo="Caso simple: 1/√2">
        <Paso n={1}>Multiplico arriba y abajo por √2 (es lo mismo que multiplicar por 1).</Paso>
        <Paso n={2}>(1·√2) / (√2·√2) = √2 / 2.</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>√2 / 2</strong>. Ya no hay raíz en el denominador.</Paso>
      </Ejemplo>

      <PorQue>
        Al multiplicar arriba y abajo por √a, el denominador se vuelve (√a)² = a, sin
        radical. La fracción no cambia de valor porque multiplicaste por 1 (= √a/√a).
      </PorQue>

      <Ejemplo titulo="Con coeficiente: 5/√3">
        5/√3 · √3/√3 = 5√3 / 3
      </Ejemplo>

      <Ejemplo titulo="Caso más complejo: 1/(2 + √3)">
        Hay una suma con raíz en el denominador. Multiplicamos por el <strong>conjugado</strong>:
        (2 − √3).<br />
        1/(2+√3) · (2−√3)/(2−√3) = (2−√3) / ((2+√3)(2−√3)) = (2−√3) / (4−3) = <strong>2 − √3</strong>.
      </Ejemplo>

      <Resumen>
        Para racionalizar:<br />
        • <strong>Una raíz sola</strong>: multiplicar por la misma raíz.<br />
        • <strong>Suma o resta con raíz</strong>: multiplicar por el conjugado (cambiar el signo del medio).
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 12 — ERRORES COMUNES
// ═════════════════════════════════════════════════════════════════════════════
function Esc12_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos al operar con radicales</Titulo>

      <Cuidado>
        <strong>Error 1:</strong> "La raíz de una suma es la suma de las raíces." <br />
        <span style={{ fontSize: 13 }}>
          ❌ √(a+b) = √a + √b → <strong>NUNCA es así</strong>. Ejemplo: √(9+16) = √25 = 5, pero √9 + √16 = 7.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 2:</strong> Sumar radicales no semejantes. <br />
        <span style={{ fontSize: 13 }}>
          ❌ √2 + √3 = √5. Falso. La suma de radicales NO semejantes queda indicada.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 3:</strong> Dejar el radical sin simplificar. <br />
        <span style={{ fontSize: 13 }}>
          √48 NO está terminado. Tenés que escribir 4√3.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 4:</strong> Olvidar el ± con índices pares. <br />
        <span style={{ fontSize: 13 }}>
          Si x² = 25, las soluciones son x = ±5 (¡dos!). Pero si la pregunta es "calcular √25", la respuesta es solo 5.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 5:</strong> Sacar raíz par de un negativo. <br />
        <span style={{ fontSize: 13 }}>
          √(−16) no existe en reales. ⁴√(−1) tampoco. Pero ³√(−8) = −2 sí existe (índice impar).
        </span>
      </Cuidado>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 13 — PRÁCTICA FINAL
// ═════════════════════════════════════════════════════════════════════════════
function Esc13_Practica() {
  const ejercicios = useMemo(() => [
    {
      pregunta: "Simplificá √75",
      opciones: ["3√5", "5√3", "√75", "15"],
      correctaIdx: 1,
      explicacion: "75 = 25·3. √75 = √25·√3 = 5√3.",
    },
    {
      pregunta: "¿Cuánto vale ³√64?",
      opciones: ["8", "16", "4", "no existe"],
      correctaIdx: 2,
      explicacion: "Busco b³ = 64. Como 4³ = 64, ³√64 = 4.",
    },
    {
      pregunta: "Resolvé: 2√3 + 5√3 − √3",
      opciones: ["6√3", "6√9", "8", "8√3"],
      correctaIdx: 0,
      explicacion: "Son todos semejantes. (2+5−1)√3 = 6√3.",
    },
    {
      pregunta: "Racionalizá: 6/√2",
      opciones: ["6√2", "3√2", "√3", "12/2"],
      correctaIdx: 1,
      explicacion: "6/√2 · √2/√2 = 6√2/2 = 3√2.",
    },
    {
      pregunta: "Reescribí 27^(2/3) sin exponente fraccionario",
      opciones: ["³√27 · 2 = 6", "(³√27)² = 9", "27 · 27 / 3 = 243", "no se puede"],
      correctaIdx: 1,
      explicacion: "27^(2/3) = (³√27)² = 3² = 9.",
    },
  ], []);

  const [respondidas, setRespondidas] = useState<Record<number, number>>({});
  const correctas = Object.entries(respondidas).filter(([k, v]) => ejercicios[Number(k)].correctaIdx === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>Cinco ejercicios que cubren todo lo que viste:</Parrafo>

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
            <div style={{ fontSize: 18, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>
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
                      borderRadius: 10, fontSize: 16, fontWeight: 700,
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
            {correctas === ejercicios.length && "🎉 ¡Perfecto! Dominás radicales."}
            {correctas >= 3 && correctas < ejercicios.length && "Bien. Repasá los que fallaste."}
            {correctas < 3 && "Volvé al algoritmo de simplificación (escena 9) y a las equivalencias (escena 6)."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
