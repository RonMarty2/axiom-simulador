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
// MCD y MCM — versión completa y autocontenida (estándar pedagógico).
// ─────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="MCD y MCM"
      escenas={[
        { titulo: "¿Para qué sirven?", componente: Esc01_Intro },
        { titulo: "Qué es un divisor", componente: Esc02_Divisor },
        { titulo: "Buscar todos los divisores", componente: Esc03_BuscarDiv },
        { titulo: "Qué es un múltiplo", componente: Esc04_Multiplo },
        { titulo: "Divisores y múltiplos comunes", componente: Esc05_Comunes },
        { titulo: "El MCD (definición)", componente: Esc06_MCDDef },
        { titulo: "Números primos: refresco", componente: Esc07_Primos },
        { titulo: "Factorización en primos", componente: Esc08_Factorizar },
        { titulo: "MCD por factorización", componente: Esc09_MCDFact },
        { titulo: "El MCM (definición)", componente: Esc10_MCMDef },
        { titulo: "MCM por factorización", componente: Esc11_MCMFact },
        { titulo: "Relación mágica MCD · MCM", componente: Esc12_Relacion },
        { titulo: "Aplicación: sumar fracciones", componente: Esc13_Fracciones },
        { titulo: "Errores comunes", componente: Esc14_Errores },
        { titulo: "Práctica final", componente: Esc15_Practica },
      ]}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 01 — INTRODUCCIÓN: ¿para qué sirven MCD y MCM?
// ═════════════════════════════════════════════════════════════════════════════
function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>MCD y MCM: ¿para qué sirven?</Titulo>
      <Parrafo>
        El <strong>Máximo Común Divisor</strong> (MCD) y el <strong>Mínimo Común Múltiplo</strong> (MCM)
        suenan a tema escolar viejo, pero aparecen en problemas reales todo el tiempo:
      </Parrafo>

      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12,
        padding: 16, maxWidth: 540, fontSize: 14, lineHeight: 1.7, color: COLOR_BASE,
      }}>
        🍰 <strong>Repartir cosas en partes iguales</strong>: si tengo 18 caramelos rojos y 24 verdes
        y quiero hacer bolsas iguales con el máximo posible, el MCD me dice cuántas bolsas armar.<br /><br />
        ⏰ <strong>Calcular cuándo coinciden eventos cíclicos</strong>: dos colectivos pasan cada 12
        y 18 minutos; el MCM me dice cada cuánto coinciden.<br /><br />
        ➗ <strong>Simplificar y sumar fracciones</strong>: para sumar 1/12 + 1/18 necesito un
        común denominador — ¡el MCM!
      </div>

      <Parrafo>
        En esta lección vamos a entender ambos conceptos de tres formas:
        intuitiva (qué significan), visual (cómo se ven) y algorítmica (cómo se calculan).
      </Parrafo>

      <Resumen>
        Lo que vas a poder hacer al terminar: encontrar el MCD y MCM de cualquier par de
        números, justificar por qué los métodos funcionan, y aplicarlos a problemas
        verbales y a fracciones.
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 02 — DIVISOR
// ═════════════════════════════════════════════════════════════════════════════
function Esc02_Divisor() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">¿Qué es un divisor?</Titulo>
      <Parrafo>
        Antes de hablar de "divisores comunes" necesitamos tener clarísimo qué es
        un divisor de un número.
      </Parrafo>

      <Definicion termino="divisor">
        <strong>d</strong> es un divisor de <strong>n</strong> si al dividir n ÷ d
        el resultado es exacto (es decir, <strong>resto = 0</strong>).
      </Definicion>

      <Ejemplo titulo="¿3 es divisor de 12?">
        12 ÷ 3 = <strong>4</strong>, resto 0. ✓ Sí, 3 es divisor de 12.
      </Ejemplo>

      <Ejemplo titulo="¿5 es divisor de 12?">
        12 ÷ 5 = <strong>2</strong>, resto 2. ✗ No, 5 NO es divisor de 12.
      </Ejemplo>

      <PorQue>
        Decir "d es divisor de n" es lo mismo que decir "n se puede escribir como
        d × algo entero". Por ejemplo: <strong>12 = 3 × 4</strong>, entonces 3 (y 4) son
        divisores de 12.
      </PorQue>

      <Parrafo>
        Una propiedad útil: <strong>1 siempre es divisor de cualquier número</strong>
        (porque n = 1 × n). Y <strong>el propio n también es divisor de sí mismo</strong>
        (porque n = n × 1).
      </Parrafo>

      <AutoCheck
        pregunta="¿7 es divisor de 56?"
        opciones={["No, 56 termina en 6", "Sí, porque 56 = 7 × 8", "Solo a veces", "Sí, porque 7 < 56"]}
        correctaIdx={1}
        explicacion="56 ÷ 7 = 8 con resto 0, o equivalentemente 56 = 7 × 8. Por eso sí es divisor."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 03 — Buscar TODOS los divisores
// ═════════════════════════════════════════════════════════════════════════════
function Esc03_BuscarDiv() {
  const [paso, setPaso] = useState(0);

  // El visual de bolitas se reorganiza según el divisor probado
  const reparto = (() => {
    if (paso === 0) return { grupos: 1, porGrupo: 12, divisor: 1, funciona: true };
    if (paso === 1) return { grupos: 2, porGrupo: 6, divisor: 2, funciona: true };
    if (paso === 2) return { grupos: 3, porGrupo: 4, divisor: 3, funciona: true };
    if (paso === 3) return { grupos: 4, porGrupo: 3, divisor: 4, funciona: true };
    if (paso === 4) return { grupos: 0, porGrupo: 0, divisor: 5, funciona: false };
    if (paso === 5) return { grupos: 6, porGrupo: 2, divisor: 6, funciona: true };
    return { grupos: 12, porGrupo: 1, divisor: 12, funciona: true };
  })();

  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Buscar TODOS los divisores</Titulo>
      <Parrafo>
        Veamos cómo encontrar la lista completa de divisores de un número. Probamos
        dividir por 1, 2, 3, ... hasta el número mismo, y nos quedamos con los que
        dan resto 0.
      </Parrafo>

      {/* VISUAL: 12 bolitas reorganizándose según el divisor */}
      <div style={{ ...cajaAnim(), cursor: "default", padding: "20px 14px" }}>
        <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
          PROBANDO DIVISOR: <span style={{ color: reparto.funciona ? COLOR_OK : COLOR_BAD, fontSize: 18 }}>{reparto.divisor}</span>
        </div>
        <Stage w={400} h={140}>
          {/* 12 bolitas */}
          {Array.from({ length: 12 }).map((_, k) => {
            let left = 30 + k * 30; // posición por defecto (fila única)
            let top = 100;
            if (reparto.funciona && reparto.grupos > 0) {
              const grupo = Math.floor(k / reparto.porGrupo);
              const dentro = k % reparto.porGrupo;
              const anchoGrupo = 340 / reparto.grupos;
              left = 30 + grupo * anchoGrupo + dentro * 24;
              top = 50;
            } else {
              // No funciona: distribuir desordenado
              const fila = Math.floor(k / 5);
              left = 30 + (k % 5) * 60;
              top = 30 + fila * 35;
            }
            const colorPorGrupo = reparto.funciona && reparto.grupos > 0
              ? (Math.floor(k / reparto.porGrupo) % 2 === 0 ? COLOR_BASE : COLOR_EXP)
              : COLOR_BAD;
            return (
              <motion.div key={k}
                style={{ position: "absolute", width: 20, height: 20, borderRadius: "50%" }}
                animate={{ left, top, background: colorPorGrupo }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: k * 0.015 }}
              />
            );
          })}

          {/* Cajas grupos */}
          {reparto.funciona && reparto.grupos > 1 && Array.from({ length: reparto.grupos }).map((_, g) => {
            const anchoGrupo = 340 / reparto.grupos;
            return (
              <motion.div key={`g${g}`}
                initial={{ opacity: 0 }} animate={{ opacity: 0.6 }}
                style={{
                  position: "absolute",
                  left: 30 + g * anchoGrupo - 4,
                  top: 42,
                  width: reparto.porGrupo * 24 + 2,
                  height: 36,
                  border: `1.5px dashed ${COLOR_EXP}`, borderRadius: 8,
                }}
              />
            );
          })}
        </Stage>
        <div style={{ fontSize: 14, color: reparto.funciona ? COLOR_OK : COLOR_BAD, fontWeight: 700, fontFamily: "var(--font-crimson), serif", textAlign: "center", marginTop: 4 }}>
          {reparto.funciona
            ? `12 ÷ ${reparto.divisor} = ${reparto.porGrupo} (exacto) ✓ — es divisor`
            : `12 ÷ ${reparto.divisor} = 2 r 2 ✗ — NO es divisor`}
        </div>
      </div>

      <Ejemplo titulo="Probemos uno por uno (divisores de 12)">
        <div onClick={() => setPaso((p) => Math.min(p + 1, 6))} style={{ cursor: "pointer", padding: 6 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            {[
              { d: 1, ok: true, txt: "12 ÷ 1 = 12 ✓" },
              { d: 2, ok: true, txt: "12 ÷ 2 = 6 ✓" },
              { d: 3, ok: true, txt: "12 ÷ 3 = 4 ✓" },
              { d: 4, ok: true, txt: "12 ÷ 4 = 3 ✓" },
              { d: 5, ok: false, txt: "12 ÷ 5 = 2 r 2 ✗" },
              { d: 6, ok: true, txt: "12 ÷ 6 = 2 ✓" },
              { d: 12, ok: true, txt: "12 ÷ 12 = 1 ✓" },
            ].slice(0, paso + 1).map((c, k) => (
              <motion.div key={k}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: "6px 12px", borderRadius: 10,
                  background: c.ok ? "#d1fae5" : "#fee2e2",
                  color: c.ok ? "#065f46" : "#7f1d1d",
                  border: `1.5px solid ${c.ok ? COLOR_OK : COLOR_BAD}`,
                  fontSize: 14,
                }}>
                {c.txt}
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic" }}>
            {paso < 6 ? "👆 Tocá para probar el siguiente (mirá cómo se reorganizan las bolitas arriba)" : "Listo, los divisores son: 1, 2, 3, 4, 6, 12"}
          </div>
        </div>
      </Ejemplo>

      <Resumen>
        <strong>Divisores de 12: {`{1, 2, 3, 4, 6, 12}`}</strong><br />
        Notá que aparecen en parejas: 1×12, 2×6, 3×4. Eso siempre pasa.
      </Resumen>

      <PorQue>
        ¿Por qué solo hay que probar hasta √n y no más? Porque los divisores vienen en
        parejas (d × e = n). Si encuentro uno menor que √n, su pareja es mayor que √n.
        Para 12, √12 ≈ 3.46, así que probando 1, 2, 3 ya encuentro todos sus pares.
      </PorQue>

      <AutoCheck
        pregunta="¿Cuántos divisores tiene el número 10?"
        opciones={["2 (solo 1 y 10)", "3 (1, 2, 10)", "4 (1, 2, 5, 10)", "5 (1, 2, 3, 5, 10)"]}
        correctaIdx={2}
        explicacion="10 = 1·10 y 2·5, así que sus divisores son 1, 2, 5, 10. Cuatro en total."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 04 — MÚLTIPLO
// ═════════════════════════════════════════════════════════════════════════════
function Esc04_Multiplo() {
  return (
    <EscenaRica>
      <Titulo accent="#10b981">¿Qué es un múltiplo?</Titulo>
      <Parrafo>
        "Múltiplo" es el espejo de "divisor". Mismo concepto, distinta perspectiva.
      </Parrafo>

      <Definicion termino="múltiplo">
        <strong>m</strong> es un múltiplo de <strong>n</strong> si m = n × k para algún
        entero k. <br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          O lo que es lo mismo: si n es divisor de m.
        </span>
      </Definicion>

      <Ejemplo titulo="Los primeros múltiplos de 4">
        4 × 1 = <strong>4</strong>, &nbsp; 4 × 2 = <strong>8</strong>, &nbsp; 4 × 3 = <strong>12</strong>, &nbsp;
        4 × 4 = <strong>16</strong>, &nbsp; 4 × 5 = <strong>20</strong>, …
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 13 }}>
          Los múltiplos siguen y siguen: son infinitos.
        </div>
      </Ejemplo>

      <Cuidado>
        Ojo a la diferencia: los <strong>divisores</strong> de un número son <em>finitos</em> y
        <em> chicos</em> (menores o iguales al número). Los <strong>múltiplos</strong> son
        <em> infinitos</em> y <em>crecientes</em>. Son conceptos inversos.
      </Cuidado>

      <Resumen>
        "<strong>3 es divisor de 12</strong>" significa lo mismo que "<strong>12 es múltiplo de 3</strong>". Solo cambia el punto de vista.
      </Resumen>

      <AutoCheck
        pregunta="¿15 es múltiplo de 5?"
        opciones={["Sí, porque 15 = 5 × 3", "No, porque 15 > 5", "Solo si 5 es múltiplo de 15", "No estoy seguro"]}
        correctaIdx={0}
        explicacion="15 = 5 × 3, así que 15 es múltiplo de 5. Y también 5 es divisor de 15 (mismo hecho)."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 05 — DIVISORES Y MÚLTIPLOS COMUNES
// ═════════════════════════════════════════════════════════════════════════════
function Esc05_Comunes() {
  return (
    <EscenaRica>
      <Titulo>Comunes: entre dos números</Titulo>
      <Parrafo>
        Cuando tenemos <strong>dos números</strong>, podemos preguntar:
        ¿qué divisores comparten? ¿qué múltiplos comparten?
      </Parrafo>

      <Ejemplo titulo="Divisores comunes de 12 y 18">
        Divisores de <strong style={{ color: "#3b82f6" }}>12</strong>: {`{1, 2, 3, 4, 6, 12}`}<br />
        Divisores de <strong style={{ color: "#f59e0b" }}>18</strong>: {`{1, 2, 3, 6, 9, 18}`}<br /><br />
        Los que aparecen en ambas listas: <strong style={{ color: COLOR_OK }}>{`{1, 2, 3, 6}`}</strong>
      </Ejemplo>

      <Ejemplo titulo="Múltiplos comunes de 4 y 6">
        Múltiplos de <strong style={{ color: "#3b82f6" }}>4</strong>: 4, 8, <strong style={{ color: COLOR_OK }}>12</strong>, 16, 20, <strong style={{ color: COLOR_OK }}>24</strong>, 28, …<br />
        Múltiplos de <strong style={{ color: "#f59e0b" }}>6</strong>: 6, <strong style={{ color: COLOR_OK }}>12</strong>, 18, <strong style={{ color: COLOR_OK }}>24</strong>, 30, …<br /><br />
        Comunes: <strong style={{ color: COLOR_OK }}>12, 24, 36, …</strong>
      </Ejemplo>

      <Parrafo>
        Los divisores comunes son finitos (porque los divisores de cualquier número
        son finitos). Los múltiplos comunes son infinitos. Esto nos lleva naturalmente
        a las definiciones:
      </Parrafo>

      <Resumen>
        🔑 <strong>MCD</strong> = el <em>más GRANDE</em> de los divisores comunes (siempre existe). <br />
        🔑 <strong>MCM</strong> = el <em>más CHICO</em> de los múltiplos comunes (siempre existe).
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 06 — MCD (definición)
// ═════════════════════════════════════════════════════════════════════════════
function Esc06_MCDDef() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>El MCD: máximo común divisor</Titulo>

      <Definicion termino="MCD">
        El <strong>MCD(a, b)</strong> es el mayor número que es divisor de a y de b a la vez.
      </Definicion>

      <Ejemplo titulo="MCD(12, 18) por inspección">
        <Paso n={1}>Divisores de 12: <strong>1, 2, 3, 4, 6, 12</strong></Paso>
        <Paso n={2}>Divisores de 18: <strong>1, 2, 3, 6, 9, 18</strong></Paso>
        <Paso n={3}>Comunes: <strong>{`{1, 2, 3, 6}`}</strong></Paso>
        <Paso n={4}>El mayor es <strong style={{ color: COLOR_OK }}>6</strong>. ⟹ MCD(12, 18) = 6.</Paso>
      </Ejemplo>

      <PorQue>
        ¿Por qué siempre existe? Porque <strong>1 es divisor común de cualquier par</strong>
        — así que el conjunto de divisores comunes nunca está vacío. Y como es finito,
        siempre tiene un máximo.
      </PorQue>

      <Cuidado>
        Este método de listar divisores funciona bien con números chicos, pero se vuelve
        impracticable con números grandes (¿imaginás listar los divisores de 1.260 y de 945?).
        Más adelante vemos un método mucho más eficiente: factorización en primos.
      </Cuidado>

      <AutoCheck
        pregunta="¿Cuál es el MCD de 8 y 12?"
        opciones={["2", "4", "8", "24"]}
        correctaIdx={1}
        explicacion="Divisores de 8: {1,2,4,8}. Divisores de 12: {1,2,3,4,6,12}. Comunes: {1,2,4}. Máximo: 4."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 07 — NÚMEROS PRIMOS
// ═════════════════════════════════════════════════════════════════════════════
function Esc07_Primos() {
  return (
    <EscenaRica>
      <Titulo accent="#8b5cf6">Números primos: refresco</Titulo>
      <Parrafo>
        Para usar el método rápido de MCD y MCM, necesitamos entender los <strong>números primos</strong>.
        Son las "piezas básicas" de los números enteros.
      </Parrafo>

      <Definicion termino="número primo">
        Un número primo es un entero <strong>{">"}1</strong> que solo tiene 2 divisores:
        <strong> 1 y él mismo</strong>.
      </Definicion>

      <Ejemplo titulo="Los primeros primos">
        <strong>2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, …</strong>
        <div style={{ marginTop: 6, color: "var(--fg-muted)", fontSize: 13 }}>
          ¡El 2 es el único primo par! Los demás primos son todos impares.
        </div>
      </Ejemplo>

      <Ejemplo titulo="Ejemplos de NO primos (compuestos)">
        <strong>4 = 2·2</strong> (tiene divisor 2) · <strong>6 = 2·3</strong> · <strong>9 = 3·3</strong> · <strong>15 = 3·5</strong>
      </Ejemplo>

      <Cuidado>
        El <strong>1 NO es primo</strong> (solo tiene UN divisor, él mismo). El <strong>0</strong> tampoco
        (tiene infinitos divisores, lo divide cualquier número {">"} 0).
      </Cuidado>

      <PorQue>
        Los primos son fundamentales porque <strong>todo número entero {">"}1 se puede
        escribir de UNA sola manera como producto de primos</strong> (Teorema Fundamental
        de la Aritmética). Es como decir que los primos son los "átomos" de los enteros.
      </PorQue>

      <AutoCheck
        pregunta="¿Cuáles de estos son primos? 21, 23, 27, 29"
        opciones={["Solo 23 y 29", "23, 27 y 29", "21 y 27", "Todos"]}
        correctaIdx={0}
        explicacion="21 = 3·7 (no primo), 27 = 3³ (no primo). 23 y 29 sí lo son: no se pueden descomponer."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 08 — FACTORIZACIÓN
// ═════════════════════════════════════════════════════════════════════════════
function Esc08_Factorizar() {
  const [paso, setPaso] = useState(0);

  return (
    <EscenaRica>
      <Titulo accent="#8b5cf6">Factorizar en primos</Titulo>
      <Parrafo>
        <strong>Factorizar</strong> un número significa escribirlo como producto de
        sus factores primos. Es la herramienta que vuelve fáciles el MCD y el MCM.
      </Parrafo>

      {/* ÁRBOL DE FACTORIZACIÓN ANIMADO */}
      <div style={{ ...cajaAnim(), cursor: "default", padding: "20px 14px" }}>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1.2, marginBottom: 6 }}>
          ÁRBOL DE FACTORIZACIÓN DE 60
        </div>
        <Stage w={400} h={260}>
          <motion.svg style={{ position: "absolute", left: 0, top: 0, width: 400, height: 260, pointerEvents: "none" }}>
            {/* Líneas */}
            <motion.line x1={200} y1={50} x2={140} y2={100}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 1 ? 1 : 0 }} transition={{ duration: 0.4 }} />
            <motion.line x1={200} y1={50} x2={260} y2={100}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 1 ? 1 : 0 }} transition={{ duration: 0.4 }} />
            <motion.line x1={260} y1={130} x2={210} y2={180}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 2 ? 1 : 0 }} transition={{ duration: 0.4 }} />
            <motion.line x1={260} y1={130} x2={310} y2={180}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 2 ? 1 : 0 }} transition={{ duration: 0.4 }} />
            <motion.line x1={310} y1={210} x2={280} y2={250}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 3 ? 1 : 0 }} transition={{ duration: 0.4 }} />
            <motion.line x1={310} y1={210} x2={340} y2={250}
              stroke={COLOR_EXP} strokeWidth={2}
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 3 ? 1 : 0 }} transition={{ duration: 0.4 }} />
          </motion.svg>

          {/* Nodos */}
          <motion.div style={{ position: "absolute", left: 180, top: 10, fontSize: 38, fontWeight: 800, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>60</motion.div>

          {/* 2 (primo, verde) */}
          <motion.div style={{ position: "absolute", left: 120, top: 100, fontSize: 32, fontWeight: 800, color: COLOR_OK, fontFamily: "var(--font-crimson), serif" }}
            initial={{ scale: 0 }} animate={paso >= 1 ? { scale: 1 } : { scale: 0 }} transition={{ type: "spring", delay: 0.3 }}>2</motion.div>

          {/* 30 (compuesto) */}
          <motion.div style={{ position: "absolute", left: 235, top: 100, fontSize: 32, fontWeight: 800, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}
            initial={{ scale: 0 }} animate={paso >= 1 ? { scale: 1, opacity: paso >= 2 ? 0.4 : 1 } : { scale: 0 }} transition={{ type: "spring", delay: 0.3 }}>30</motion.div>

          {/* 2 (primo) */}
          <motion.div style={{ position: "absolute", left: 195, top: 180, fontSize: 30, fontWeight: 800, color: COLOR_OK, fontFamily: "var(--font-crimson), serif" }}
            initial={{ scale: 0 }} animate={paso >= 2 ? { scale: 1 } : { scale: 0 }} transition={{ type: "spring", delay: 0.3 }}>2</motion.div>

          {/* 15 (compuesto) */}
          <motion.div style={{ position: "absolute", left: 295, top: 180, fontSize: 30, fontWeight: 800, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif" }}
            initial={{ scale: 0 }} animate={paso >= 2 ? { scale: 1, opacity: paso >= 3 ? 0.4 : 1 } : { scale: 0 }} transition={{ type: "spring", delay: 0.4 }}>15</motion.div>

          {/* 3 y 5 (ambos primos) */}
          <motion.div style={{ position: "absolute", left: 270, top: 250, fontSize: 28, fontWeight: 800, color: COLOR_OK, fontFamily: "var(--font-crimson), serif" }}
            initial={{ scale: 0 }} animate={paso >= 3 ? { scale: 1 } : { scale: 0 }} transition={{ type: "spring", delay: 0.3 }}>3</motion.div>
          <motion.div style={{ position: "absolute", left: 330, top: 250, fontSize: 28, fontWeight: 800, color: COLOR_OK, fontFamily: "var(--font-crimson), serif" }}
            initial={{ scale: 0 }} animate={paso >= 3 ? { scale: 1 } : { scale: 0 }} transition={{ type: "spring", delay: 0.4 }}>5</motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 4, textAlign: "center" }}>
          (los <strong style={{ color: COLOR_OK }}>verdes</strong> son primos: no se siguen descomponiendo)
        </div>
      </div>

      <Ejemplo titulo="Algoritmo paso a paso: factorizar 60">
        <div onClick={() => setPaso((p) => Math.min(p + 1, 4))} style={{ cursor: "pointer" }}>
          <Paso n={1}>Empezamos con 60. ¿Es divisible por el primo más chico (2)? <strong>Sí</strong>: 60 ÷ 2 = 30.</Paso>
          {paso >= 1 && <Paso n={2}>30 ÷ 2 = 15.</Paso>}
          {paso >= 2 && <Paso n={3}>¿15 es divisible por 2? No. Pasamos a 3: 15 ÷ 3 = 5.</Paso>}
          {paso >= 3 && <Paso n={4}>5 ya es primo (no se reduce más).</Paso>}
          {paso >= 4 && (
            <div style={{ marginTop: 10, padding: 12, background: "#d1fae5", borderRadius: 10, color: "#065f46", fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
              <strong>Resultado:</strong> 60 = 2 · 2 · 3 · 5 = <strong>2² · 3 · 5</strong>
            </div>
          )}
          {paso < 4 && (
            <div style={{ marginTop: 8, fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic" }}>
              👆 Tocá para continuar
            </div>
          )}
        </div>
      </Ejemplo>

      <PorQue>
        El método es siempre el mismo: vas dividiendo por el primo más chico que entre,
        y bajás el cociente. Cuando ya no entra ese primo, pasás al siguiente. Cuando el
        cociente es 1, listo.
      </PorQue>

      <Ejemplo titulo="Otro ejemplo: factorizar 84">
        84 ÷ 2 = 42 · 42 ÷ 2 = 21 · 21 ÷ 3 = 7 · 7 es primo.<br />
        <strong>84 = 2² · 3 · 7</strong>
      </Ejemplo>

      <Resumen>
        Cada número compuesto tiene UNA factorización en primos única (salvo el orden de
        los factores). Eso permite comparar números a nivel de sus "átomos".
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es la factorización de 72?"
        opciones={["2 · 36", "8 · 9", "2³ · 3²", "2 · 4 · 9"]}
        correctaIdx={2}
        explicacion="72 = 8 · 9 también, pero la factorización en PRIMOS es 2³ · 3² = 8 · 9 = 72."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 09 — MCD POR FACTORIZACIÓN
// ═════════════════════════════════════════════════════════════════════════════
function Esc09_MCDFact() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>MCD por factorización (el método rápido)</Titulo>

      <Parrafo>
        Una vez factorizados los números, el MCD se calcula con una regla simple:
      </Parrafo>

      <Resumen>
        <strong>MCD = primos COMUNES elevados al MENOR exponente</strong>
      </Resumen>

      {/* VISUALIZACIÓN ANIMADA */}
      <div onClick={() => setPaso((p) => Math.min(p + 1, 3))} style={{ ...cajaAnim(), padding: "20px 14px" }}>
        <div style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 800, letterSpacing: 1.2, marginBottom: 4 }}>
          MCD(12, 18)
        </div>
        <Stage w={420} h={180}>
          {/* Línea 12 */}
          <div style={{ position: "absolute", left: 0, top: 20, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            12 = <span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>2<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_BAD : COLOR_EXP }}>2</sup></span>
            {" · "}<span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>3<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_OK : COLOR_EXP }}>1</sup></span>
          </div>
          {/* Línea 18 */}
          <div style={{ position: "absolute", left: 0, top: 70, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            18 = <span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>2<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_OK : COLOR_EXP }}>1</sup></span>
            {" · "}<span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>3<sup style={{ fontSize: 14, color: paso >= 2 ? COLOR_BAD : COLOR_EXP }}>2</sup></span>
          </div>
          {/* Resultado */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={paso >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ position: "absolute", left: 0, top: 130, width: "100%", textAlign: "center", fontSize: 30, fontWeight: 800, fontFamily: "var(--font-crimson), serif", color: COLOR_OK }}
          >
            MCD = 2 · 3 = 6
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 4, fontStyle: "italic", textAlign: "center" }}>
          {paso === 0 && "👆 Tocá para ver paso a paso"}
          {paso === 1 && "Resaltamos primos COMUNES (2 y 3)"}
          {paso === 2 && "Tomamos el MENOR exponente de cada uno (verde) — descartamos el otro (rojo)"}
          {paso === 3 && "Multiplicamos: 2¹ · 3¹ = 6"}
        </div>
      </div>

      <Ejemplo titulo="MCD(12, 18) con factorización">
        <Paso n={1}>Factorizo cada uno: <strong>12 = 2² · 3</strong> y <strong>18 = 2 · 3²</strong>.</Paso>
        <Paso n={2}>Primos comunes: <strong>2</strong> y <strong>3</strong>.</Paso>
        <Paso n={3}>Exponentes mínimos: para 2, mín(2, 1) = <strong>1</strong>. Para 3, mín(1, 2) = <strong>1</strong>.</Paso>
        <Paso n={4}>MCD = 2¹ · 3¹ = <strong style={{ color: COLOR_OK }}>6</strong>. ✓ (coincide con el método de inspección).</Paso>
      </Ejemplo>

      <PorQue>
        Pensalo así: un número divisor de A no puede tener primos que A no tenga.
        Si A = 2²·3, sus divisores solo contienen 2 (a lo sumo elevado a 2) y 3 (a lo
        sumo elevado a 1). Para que un divisor lo sea ALSO de B, sus primos también
        deben estar en B, con exponente que no exceda el de B. El máximo posible es
        tomar los comunes al mínimo.
      </PorQue>

      <Ejemplo titulo="Otro ejemplo: MCD(60, 84)">
        <Paso n={1}>60 = 2² · 3 · 5 &nbsp;y&nbsp; 84 = 2² · 3 · 7</Paso>
        <Paso n={2}>Comunes: 2 y 3. (El 5 solo está en 60; el 7 solo en 84.)</Paso>
        <Paso n={3}>Exponentes mínimos: 2² y 3¹.</Paso>
        <Paso n={4}>MCD = 4 · 3 = <strong style={{ color: COLOR_OK }}>12</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Solo se toman los primos <strong>que aparecen en AMBAS</strong> factorizaciones.
        Si un primo aparece en uno solo, NO va al MCD.
      </Cuidado>

      <AutoCheck
        pregunta="MCD de 24 = 2³·3 y 36 = 2²·3²"
        opciones={["6", "12", "72", "216"]}
        correctaIdx={1}
        explicacion="Comunes: 2 y 3. Mínimos: 2² y 3¹. MCD = 4·3 = 12."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 10 — MCM (definición)
// ═════════════════════════════════════════════════════════════════════════════
function Esc10_MCMDef() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>El MCM: mínimo común múltiplo</Titulo>

      <Definicion termino="MCM">
        El <strong>MCM(a, b)</strong> es el menor número (positivo) que es múltiplo
        de a y de b a la vez.
      </Definicion>

      <Ejemplo titulo="MCM(4, 6) por inspección">
        <Paso n={1}>Múltiplos de 4: 4, 8, <strong style={{ color: COLOR_OK }}>12</strong>, 16, 20, 24, …</Paso>
        <Paso n={2}>Múltiplos de 6: 6, <strong style={{ color: COLOR_OK }}>12</strong>, 18, 24, 30, …</Paso>
        <Paso n={3}>El menor común es <strong style={{ color: COLOR_OK }}>12</strong>. ⟹ MCM(4, 6) = 12.</Paso>
      </Ejemplo>

      <PorQue>
        ¿Por qué siempre existe? Porque <strong>a × b es siempre múltiplo común</strong>
        (es múltiplo de a y de b). Entonces el conjunto de múltiplos comunes no está
        vacío. Y como es un conjunto de naturales, tiene un mínimo.
      </PorQue>

      <Cuidado>
        El MCM siempre es <strong>≥ máx(a, b)</strong>. Si fuera menor que cualquiera de
        los dos, no podría ser múltiplo. Por ejemplo, MCM(4, 6) = 12 ≥ 6.
      </Cuidado>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 11 — MCM POR FACTORIZACIÓN
// ═════════════════════════════════════════════════════════════════════════════
function Esc11_MCMFact() {
  const [pasoMCM, setPasoMCM] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>MCM por factorización</Titulo>

      <Parrafo>
        Para el MCM la regla es casi simétrica a la del MCD, pero al revés:
      </Parrafo>

      <Resumen>
        <strong>MCM = TODOS los primos (que aparezcan en alguno) elevados al MAYOR exponente</strong>
      </Resumen>

      {/* VISUALIZACIÓN ANIMADA */}
      <div onClick={() => setPasoMCM((p) => Math.min(p + 1, 3))} style={{ ...cajaAnim(), padding: "20px 14px" }}>
        <div style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 800, letterSpacing: 1.2, marginBottom: 4 }}>
          MCM(12, 18)
        </div>
        <Stage w={420} h={180}>
          <div style={{ position: "absolute", left: 0, top: 20, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            12 = 2<sup style={{ fontSize: 14, color: pasoMCM >= 2 ? COLOR_OK : COLOR_EXP }}>2</sup>
            {" · "}3<sup style={{ fontSize: 14, color: pasoMCM >= 2 ? COLOR_BAD : COLOR_EXP }}>1</sup>
          </div>
          <div style={{ position: "absolute", left: 0, top: 70, width: "100%", textAlign: "center", fontSize: 26, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            18 = 2<sup style={{ fontSize: 14, color: pasoMCM >= 2 ? COLOR_BAD : COLOR_EXP }}>1</sup>
            {" · "}3<sup style={{ fontSize: 14, color: pasoMCM >= 2 ? COLOR_OK : COLOR_EXP }}>2</sup>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={pasoMCM >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            style={{ position: "absolute", left: 0, top: 130, width: "100%", textAlign: "center", fontSize: 30, fontWeight: 800, fontFamily: "var(--font-crimson), serif", color: COLOR_OK }}
          >
            MCM = 2² · 3² = 36
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 4, fontStyle: "italic", textAlign: "center" }}>
          {pasoMCM === 0 && "👆 Tocá para ver paso a paso"}
          {pasoMCM === 1 && "Esta vez NO descartamos primos"}
          {pasoMCM === 2 && "Tomamos el MAYOR exponente de cada uno (verde)"}
          {pasoMCM === 3 && "Multiplicamos: 4 · 9 = 36"}
        </div>
      </div>

      <Ejemplo titulo="MCM(12, 18) con factorización">
        <Paso n={1}>12 = 2² · 3 &nbsp;y&nbsp; 18 = 2 · 3².</Paso>
        <Paso n={2}>Todos los primos involucrados: <strong>2 y 3</strong>.</Paso>
        <Paso n={3}>Exponentes máximos: para 2, máx(2, 1) = <strong>2</strong>. Para 3, máx(1, 2) = <strong>2</strong>.</Paso>
        <Paso n={4}>MCM = 2² · 3² = 4 · 9 = <strong style={{ color: COLOR_OK }}>36</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="Cuando un primo solo aparece en uno">
        MCM(60, 84) con 60 = 2²·3·<strong style={{ color: "#3b82f6" }}>5</strong> y 84 = 2²·3·<strong style={{ color: "#f59e0b" }}>7</strong>.<br />
        Tomo TODOS los primos: 2, 3, 5, 7. Cada uno con su mayor exponente.<br />
        <strong>MCM = 2² · 3 · 5 · 7 = 4·3·5·7 = 420</strong>
      </Ejemplo>

      <PorQue>
        Un múltiplo de A debe contener TODOS los primos de A con al menos el exponente
        que tienen. Si además es múltiplo de B, debe contener los de B con sus
        exponentes. El más chico que cumple esto es tomar todos los primos involucrados
        al máximo exponente que aparezca.
      </PorQue>

      <AutoCheck
        pregunta="MCM de 24 = 2³·3 y 36 = 2²·3²"
        opciones={["6", "12", "72", "864"]}
        correctaIdx={2}
        explicacion="Todos los primos: 2, 3. Máximos: 2³ y 3². MCM = 8·9 = 72."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 12 — RELACIÓN MCD · MCM = a · b
// ═════════════════════════════════════════════════════════════════════════════
function Esc12_Relacion() {
  return (
    <EscenaRica>
      <Titulo>Una relación mágica</Titulo>
      <Parrafo>
        Existe una fórmula súper útil que conecta MCD y MCM:
      </Parrafo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          MCD(a, b) · MCM(a, b) = a · b
        </span>
      </Resumen>

      <Ejemplo titulo="Verificación con MCD(12, 18) = 6 y MCM(12, 18) = 36">
        <Paso n={1}>MCD · MCM = 6 · 36 = <strong>216</strong></Paso>
        <Paso n={2}>a · b = 12 · 18 = <strong>216</strong></Paso>
        <Paso n={3}>Iguales ✓</Paso>
      </Ejemplo>

      <PorQue>
        Mirando la factorización: en MCD están los primos comunes al MÍNIMO, en MCM al
        MÁXIMO. Mínimo + Máximo = suma de los dos exponentes originales. Por eso al
        multiplicar MCD · MCM se recupera el producto a · b.
      </PorQue>

      <Ejemplo titulo="Atajo para problemas">
        Si te piden el MCM y ya conocés el MCD (o viceversa), no rehagas todo el cálculo. Usá:
        <div style={{ marginTop: 6, padding: 10, background: "var(--bg-subtle)", borderRadius: 8, fontFamily: "var(--font-crimson), serif", fontWeight: 700, textAlign: "center" }}>
          MCM(a,b) = (a · b) / MCD(a,b)
        </div>
      </Ejemplo>

      <AutoCheck
        pregunta="Si MCD(a, b) = 5 y a·b = 100, ¿cuál es el MCM?"
        opciones={["5", "20", "100", "500"]}
        correctaIdx={1}
        explicacion="MCM = (a·b) / MCD = 100 / 5 = 20."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 13 — APLICACIÓN: SUMAR FRACCIONES
// ═════════════════════════════════════════════════════════════════════════════
function Esc13_Fracciones() {
  return (
    <EscenaRica>
      <Titulo>Aplicación: sumar fracciones</Titulo>
      <Parrafo>
        Una de las aplicaciones más comunes del MCM es <strong>sumar fracciones con distinto
        denominador</strong>. Necesitamos un <strong>común denominador</strong>, y conviene
        usar el más chico: el MCM.
      </Parrafo>

      <Ejemplo titulo="Sumar 1/12 + 1/18">
        <Paso n={1}>Necesito un denominador común. Tomo MCM(12, 18) = <strong>36</strong>.</Paso>
        <Paso n={2}>Convierto cada fracción a /36: <br />
          <strong>1/12 = 3/36</strong> (multipliqué arriba y abajo por 3) <br />
          <strong>1/18 = 2/36</strong> (multipliqué arriba y abajo por 2)
        </Paso>
        <Paso n={3}>Sumo numeradores: 3/36 + 2/36 = <strong style={{ color: COLOR_OK }}>5/36</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="Simplificar una fracción">
        Para simplificar al máximo una fracción a/b, dividimos arriba y abajo por
        MCD(a, b).<br /><br />
        <strong>Simplificar 18/24</strong>: MCD(18, 24) = 6. ⟹ 18/24 = 3/4.
      </Ejemplo>

      <Resumen>
        <strong>MCM ↔ Sumar fracciones</strong> (común denominador). <br />
        <strong>MCD ↔ Simplificar fracciones</strong> (dividir arriba y abajo por él).
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 14 — ERRORES COMUNES
// ═════════════════════════════════════════════════════════════════════════════
function Esc14_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Los 4 errores más comunes</Titulo>

      <Cuidado>
        <strong>Error 1:</strong> Confundir MCD con MCM. <br />
        <span style={{ fontSize: 13 }}>
          MCD = el más GRANDE de los DIVISORES (siempre ≤ menor de los números). <br />
          MCM = el más CHICO de los MÚLTIPLOS (siempre ≥ mayor de los números).
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 2:</strong> En MCD tomar TODOS los primos en vez de solo los comunes. <br />
        <span style={{ fontSize: 13 }}>
          MCD: <em>solo los comunes</em>. Si un primo está en uno solo, lo dejás afuera.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 3:</strong> Usar el mayor exponente en MCD (o el menor en MCM). <br />
        <span style={{ fontSize: 13 }}>
          MCD = menor exponente. MCM = mayor exponente.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 4:</strong> Olvidar que MCD(a, b) divide siempre a a y a b. <br />
        <span style={{ fontSize: 13 }}>
          Buen control: el MCD que obtuviste debe dar resto 0 al dividir tanto a como b.
          Si no, hay un error en la factorización.
        </span>
      </Cuidado>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 15 — PRÁCTICA FINAL
// ═════════════════════════════════════════════════════════════════════════════
function Esc15_Practica() {
  const ejercicios = useMemo(() => [
    {
      pregunta: "MCD(20, 30) = ?",
      opciones: ["5", "10", "60", "2"],
      correctaIdx: 1,
      explicacion: "20 = 2²·5, 30 = 2·3·5. Comunes: 2 y 5. Mínimos: 2¹·5¹ = 10.",
    },
    {
      pregunta: "MCM(20, 30) = ?",
      opciones: ["60", "300", "150", "10"],
      correctaIdx: 0,
      explicacion: "20 = 2²·5, 30 = 2·3·5. Todos los primos al máximo: 2²·3·5 = 60.",
    },
    {
      pregunta: "MCD(15, 28) = ?",
      opciones: ["1", "3", "7", "15"],
      correctaIdx: 0,
      explicacion: "15 = 3·5, 28 = 2²·7. No tienen ningún primo en común. MCD = 1 (son coprimos).",
    },
    {
      pregunta: "Para sumar 1/6 + 1/8, ¿cuál es el común denominador más cómodo?",
      opciones: ["48", "24", "14", "2"],
      correctaIdx: 1,
      explicacion: "MCM(6, 8) = 24. El producto 48 sirve pero no es el mínimo.",
    },
    {
      pregunta: "Si dos buses pasan cada 12 y cada 20 minutos, ¿cada cuánto coinciden?",
      opciones: ["32 min", "60 min", "240 min", "4 min"],
      correctaIdx: 1,
      explicacion: "Buscamos MCM(12, 20). 12 = 2²·3, 20 = 2²·5. MCM = 2²·3·5 = 60 minutos.",
    },
  ], []);

  const [respondidas, setRespondidas] = useState<Record<number, number>>({});
  const correctas = Object.entries(respondidas).filter(([k, v]) => ejercicios[Number(k)].correctaIdx === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>
        5 ejercicios variados. Aplicá los métodos que viste en la lección.
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
            {correctas === ejercicios.length && "🎉 ¡Perfecto! Ya dominás MCD y MCM."}
            {correctas >= 3 && correctas < ejercicios.length && "Bien. Repasá los que fallaste, en un día volvé."}
            {correctas < 3 && "Vale la pena releer las escenas 8 y 9 (factorización + MCD). El método te va a salir."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
