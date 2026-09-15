"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, Ejes, Raiz, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

// Crecimiento exponencial: barras + curva 1000·1.08^t durante 10 años.
// Tocar muestra los valores de cada año cayendo en cascada.
function CrecimientoExpAnim() {
  const [on, setOn] = useState(false);
  const P0 = 1000, r = 0.08, anos = 10;
  const datos = Array.from({ length: anos + 1 }, (_, t) => ({ t, v: P0 * Math.pow(1 + r, t) }));
  const xMin = 0, xMax = anos, yMin = 0, yMax = Math.ceil(datos[anos].v / 500) * 500, alto = 240;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const ancho = (sx(1) - sx(0)) * 0.7;
  // Curva
  const pts: string[] = [];
  for (let k = 0; k <= 60; k++) {
    const t = xMin + (k / 60) * (xMax - xMin);
    pts.push(`${sx(t)},${sy(P0 * Math.pow(1 + r, t))}`);
  }
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto} onClick={() => setOn((v) => !v)}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          {datos.map((d, k) => {
            const x = sx(d.t), y = sy(d.v), y0 = sy(0);
            return (
              <motion.rect key={k}
                x={x - ancho / 2} width={ancho} y={y} height={y0 - y}
                fill={LIENZO.accent} fillOpacity={0.25}
                initial={{ height: 0, y: y0 }}
                animate={on ? { height: y0 - y, y } : { height: 0, y: y0 }}
                transition={{ duration: 0.4, delay: on ? k * 0.08 : 0 }} />
            );
          })}
          {on && (
            <motion.polyline points={pts.join(" ")} fill="none" stroke={LIENZO.accent}
              strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }} />
          )}
        </Ejes>
      </Pizarra>
      <div style={{
        textAlign: "center", fontFamily: "var(--font-crimson), serif",
        fontSize: 17, color: LIENZO.fg, fontWeight: 500,
      }}>
        1000 · 1.08<sup>t</sup> · {on ? <span style={{ color: LIENZO.ok }}>tras {anos} años: {Math.round(datos[anos].v)} Bs</span> : "toca para simular"}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="07"
      tituloUnidad="Teoría de exponentes (profundidad)"
      escenas={[
        { titulo: "Las 5 propiedades básicas", componente: Esc01_Basicas },
        { titulo: "Exponente cero y negativo", componente: Esc02_CeroNeg },
        { titulo: "Exponente fraccionario", componente: Esc03_Frac },
        { titulo: "Producto y cociente de potencias con distinta base", componente: Esc04_DistBase },
        { titulo: "Ecuaciones exponenciales", componente: Esc05_Eq },
        { titulo: "Crecimiento exponencial", componente: Esc06_Crec },
        { titulo: "Errores comunes", componente: Esc07_Errores },
        { titulo: "Práctica final", componente: Esc08_Practica },
      ]}
    />
  );
}

function Esc01_Basicas() {
  return (
    <EscenaRica>
      <Titulo>Las 5 propiedades fundamentales</Titulo>
      <Resumen>
        <strong>1.</strong> aᵐ · aⁿ = a^(m+n): al multiplicar, sumas exponentes.<br />
        <strong>2.</strong> aᵐ / aⁿ = a^(m−n): al dividir, restas.<br />
        <strong>3.</strong> (aᵐ)ⁿ = a^(m·n): al elevar potencia, multiplicas.<br />
        <strong>4.</strong> (a·b)ⁿ = aⁿ · bⁿ: el exponente se distribuye al producto.<br />
        <strong>5.</strong> (a/b)ⁿ = aⁿ/bⁿ: y a la división.
      </Resumen>
      {/* Uno por renglón: el "·" separaba los ejemplos y además multiplicaba
          dentro de cada uno, así que no se veía dónde terminaba cada cuenta. */}
      <Ejemplo>
        <div style={{ display: "grid", gap: 7 }}>
          <div>2³ × 2⁴ = 2⁷ = 128</div>
          <div>(3²)³ = 3⁶ = 729</div>
          <div>(2 × 5)² = 100</div>
        </div>
      </Ejemplo>
      <PorQue>
        Si ya hiciste Potenciación (Unidad 01), esto es repaso. Acá vamos más profundo a
        cómo se usan EN ECUACIONES.
      </PorQue>

      <Hook>
        Las 5 propiedades de exponentes aparecen en <strong>casi todo cálculo algebraico</strong>:
        radicales, logaritmos, ecuaciones exponenciales, derivadas. Si las dominas, te
        ahorras horas en todas las demás unidades.
      </Hook>

      <Mnemotecnia>
        <strong>Las 5 reglas en frase única</strong>:<br />
        <em>"<strong>S</strong>uma al multiplicar, <strong>R</strong>esta al dividir,
        <strong> M</strong>ultiplica al elevar, <strong>D</strong>istribuye a producto y cociente"</em>.<br /><br />
        Letras: <strong>S-R-M-D-D</strong>. Si quieres acordarte de cuál haces primero, mira
        el SIGNO de la operación: × → sumar exponentes; ÷ → restar.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_CeroNeg() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>Exponente 0 y negativo</Titulo>
      <Resumen>
        <strong>a⁰ = 1</strong> (con a ≠ 0).<br />
        <strong>a⁻ⁿ = 1/aⁿ</strong>.
      </Resumen>
      <Ejemplo>
        <div style={{ display: "grid", gap: 7 }}>
          <div>5⁰ = 1</div>
          <div>2⁻³ = 1/8</div>
          <div>(3/4)⁻² = (4/3)² = 16/9</div>
        </div>
      </Ejemplo>
      <PorQue>
        ¿Por qué a⁰ = 1? Mira: aⁿ/aⁿ = a^(n−n) = a⁰. Pero también aⁿ/aⁿ = 1. ⟹ a⁰ = 1.
      </PorQue>
      <PorQue>
        ¿Por qué a⁻ⁿ = 1/aⁿ? Porque 1 = a⁰ = aⁿ·a⁻ⁿ, despejando: a⁻ⁿ = 1/aⁿ.
      </PorQue>
    </EscenaRica>
  );
}

// Equivalencia raíz ⇄ exponente fraccionario: 8^(1/3) ⇄ ³√8 = 2.
// Tocar alterna entre las dos formas; el "1/n" del exponente baja a ser el
// índice de la raíz y viceversa.
function ExpFracEquivAnim() {
  const [forma, setForma] = useState<"exp" | "raiz">("exp");
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={150} onClick={() => setForma((f) => f === "exp" ? "raiz" : "exp")}>
        <div style={{
          fontFamily: "var(--font-crimson), serif", fontWeight: 500,
          fontSize: "clamp(32px, 6.5vw, 56px)", color: LIENZO.fg,
          display: "flex", alignItems: "center", gap: "0.5em",
        }}>
          {forma === "exp" ? (
            <motion.span key="exp" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              8<sup style={{ fontSize: "0.55em", color: LIENZO.accent, marginLeft: 2 }}>1/3</sup>
            </motion.span>
          ) : (
            <motion.span key="raiz" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Raiz n="3" r="8" italic={false} />
            </motion.span>
          )}
          <span style={{ color: LIENZO.fgDim }}>=</span>
          <span style={{ color: LIENZO.ok, fontWeight: 600 }}>2</span>
        </div>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic" }}>
        {forma === "exp"
          ? "Toca: el 1/n del exponente baja a ser el índice de una raíz"
          : "Toca: el índice n de la raíz sube como 1/n al exponente"}
      </div>
    </div>
  );
}

function Esc03_Frac() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Exponente fraccionario = radical</Titulo>
      <Resumen>
        <strong>a^(1/n) = ⁿ√a</strong>. Y en general: <strong>a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ</strong>.
      </Resumen>
      <ExpFracEquivAnim />
      <Ejemplo>
        <div style={{ display: "grid", gap: 7 }}>
          <div>9^(1/2) = √9 = 3</div>
          <div>8^(1/3) = ³√8 = 2</div>
          <div>16^(3/4) = (⁴√16)³ = 2³ = 8</div>
        </div>
      </Ejemplo>
      <Cuidado>
        Esto es clave en cálculo: cualquier raíz se puede escribir como exponente
        fraccionario y aplicar las 5 propiedades.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc04_DistBase() {
  return (
    <EscenaRica>
      <Titulo>Cuando las bases son distintas pero los exponentes iguales</Titulo>
      <Resumen>
        Aplicando (a·b)ⁿ = aⁿ·bⁿ al revés: <strong>aⁿ · bⁿ = (a·b)ⁿ</strong>.<br />
        Útil cuando los exponentes coinciden.
      </Resumen>
      <Ejemplo>
        2⁵ · 5⁵ = (2·5)⁵ = 10⁵ = 100 000.
      </Ejemplo>
      <Cuidado>
        Si los exponentes son distintos, NO se puede juntar así. <br />
        Ej: 2³ · 5⁴ se queda así, no se simplifica más.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc05_Eq() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Ecuaciones exponenciales</Titulo>
      <Parrafo>
        Si una incógnita aparece en el exponente, la estrategia es <strong>igualar las bases</strong>:
        si tienes aˣ = aʸ, entonces x = y.
      </Parrafo>

      <Ejemplo titulo="2ˣ = 8">
        <Paso n={1}>Reescribo 8 = 2³.</Paso>
        <Paso n={2}>2ˣ = 2³ → x = 3.</Paso>
      </Ejemplo>

      <Ejemplo titulo="3^(x+1) = 81">
        <Paso n={1}>81 = 3⁴.</Paso>
        <Paso n={2}>3^(x+1) = 3⁴ → x + 1 = 4 → x = 3.</Paso>
      </Ejemplo>

      <Ejemplo titulo="2ˣ = 10 (no se puede igualar bases)">
        <Paso n={1}>Aplica logaritmo: x = log(10)/log(2) = 1/0.301 ≈ 3.322.</Paso>
      </Ejemplo>

      <WorkedExample titulo="Ecuación exponencial · 9^(x+1) = 27^(2x−1)">
        <strong>Paso 1 · Misma base:</strong> 9 = 3² y 27 = 3³. Reescribo:<br />
        (3²)^(x+1) = (3³)^(2x−1).<br /><br />

        <strong>Paso 2 · Aplicar (aᵐ)ⁿ = a^(m·n):</strong><br />
        3^(2(x+1)) = 3^(3(2x−1)).<br />
        3^(2x+2) = 3^(6x−3).<br /><br />

        <strong>Paso 3 · Igualar exponentes:</strong> 2x + 2 = 6x − 3.<br /><br />

        <strong>Paso 4 · Despejar:</strong> 5 = 4x → x = 5/4.<br /><br />

        <strong>Verificación:</strong> 9^(5/4 + 1) = 9^(9/4) = (3²)^(9/4) = 3^(9/2).<br />
        Y 27^(2·5/4 − 1) = 27^(3/2) = (3³)^(3/2) = 3^(9/2). ✓<br /><br />

        <strong>Truco:</strong> en exponenciales, el primer paso siempre es buscar la BASE COMÚN.
        Si las dos bases son potencias de un mismo número (9, 27 → ambos potencias de 3), está
        garantizado que sale por igualación de exponentes.
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc06_Crec() {
  return (
    <EscenaRica>
      <Titulo>Crecimiento exponencial</Titulo>
      <Parrafo>
        Un fenómeno crece <strong>exponencialmente</strong> cuando cada período crece
        en un % FIJO sobre el valor actual (no sobre el inicial).
      </Parrafo>
      <Resumen>
        Modelo: <strong>P(t) = P₀ · (1 + r)ᵗ</strong>. Si decrece: usas (1 − r).
      </Resumen>
      <CrecimientoExpAnim />
      <Ejemplo titulo="Inversión al 8% anual durante 5 años">
        Inversión inicial 1000 Bs. Final = 1000 · 1.08⁵ ≈ 1469 Bs.
      </Ejemplo>
      <Ejemplo titulo="Decaimiento (–10% por período)">
        P(5) = P₀ · 0.9⁵ ≈ 0.59 · P₀.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc07_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>
      <Cuidado>
        <strong>aᵐ + aⁿ ≠ a^(m+n)</strong>. La suma de exponentes es solo para PRODUCTOS.
      </Cuidado>
      <Cuidado>
        <strong>(a + b)ⁿ ≠ aⁿ + bⁿ</strong>. La distribución NO funciona sobre sumas.
      </Cuidado>
      <Cuidado>
        <strong>a⁰ = 1 (con a ≠ 0).</strong> 0⁰ es indefinido.
      </Cuidado>

      <Misconception titulo="Trampa de signos · −aⁿ vs (−a)ⁿ">
        <strong>−3² = −9</strong> (el cuadrado solo afecta al 3, no al signo).<br />
        <strong>(−3)² = 9</strong> (el cuadrado afecta TODO el paréntesis).<br /><br />
        Regla: el exponente solo se aplica a lo que está pegado a él. Sin paréntesis, el menos
        queda afuera y conserva el signo.
      </Misconception>

      <Misconception titulo="Error #1 en ecuaciones · perder soluciones por raíz par">
        Si tienes x² = 16, no es solo x = 4: TAMBIÉN x = −4 cumple (porque (−4)² = 16). Las
        raíces de índice PAR siempre dan ± dos soluciones. En las raíces de índice IMPAR (³, ⁵)
        hay una sola.
      </Misconception>

      <Conexion>
        Las propiedades de exponentes son la base de:
        <strong> Radicación</strong> (a^(1/n) = ⁿ√a),
        <strong> Logaritmación</strong> (logₐ(x·y) = logₐx + logₐy nace de aᵐ·aⁿ = a^(m+n)),
        y <strong>Funciones exponenciales</strong>. Dominar esto es desbloquear las 3 unidades
        siguientes.
      </Conexion>
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "3² · 3⁴ = ?", o: ["3⁶", "3⁸", "9⁶", "3"], c: 0, ex: "Misma base: sumar exp. 3^(2+4) = 3⁶." },
    { p: "2⁰ = ?", o: ["0", "1", "2", "Indefinido"], c: 1, ex: "Por definición a⁰ = 1." },
    { p: "8^(1/3) = ?", o: ["2", "3", "4", "8/3"], c: 0, ex: "³√8 = 2." },
    { p: "5⁻² = ?", o: ["−25", "−10", "1/25", "1/10"], c: 2, ex: "5⁻² = 1/5² = 1/25." },
    { p: "Resuelve 2^(x+1) = 16:", o: ["x = 3", "x = 4", "x = 8", "x = 5"], c: 0, ex: "16 = 2⁴ → x+1 = 4 → x = 3." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;
  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i]; const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c; const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{ padding: "10px 14px", background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)", border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`, borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer", fontFamily: "var(--font-crimson), serif", textAlign: "left" }}>
                    {op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
                  </button>
                );
              })}
            </div>
            {rev && <div style={{ marginTop: 10, padding: "10px 12px", background: sel === e.c ? "#ecfdf5" : "#fef2f2", borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5 }}>
              <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}{e.ex}
            </div>}
          </div>
        );
      })}
      {Object.keys(resp).length === ejs.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 18, background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
          <div style={{ fontSize: 14, color: "#065f46", marginTop: 6 }}>
            {ok === ejs.length && "🎉 Dominas teoría de exponentes."}
            {ok < ejs.length && "Relee las 5 propiedades + casos especiales."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
