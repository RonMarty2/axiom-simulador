"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

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
        <strong>1.</strong> aᵐ · aⁿ = a^(m+n) — al multiplicar, sumás exponentes.<br />
        <strong>2.</strong> aᵐ / aⁿ = a^(m−n) — al dividir, restás.<br />
        <strong>3.</strong> (aᵐ)ⁿ = a^(m·n) — al elevar potencia, multiplicás.<br />
        <strong>4.</strong> (a·b)ⁿ = aⁿ · bⁿ — el exponente se distribuye al producto.<br />
        <strong>5.</strong> (a/b)ⁿ = aⁿ/bⁿ — y a la división.
      </Resumen>
      <Ejemplo>
        2³ · 2⁴ = 2⁷ = 128 &nbsp;·&nbsp; (3²)³ = 3⁶ = 729 &nbsp;·&nbsp; (2·5)² = 100.
      </Ejemplo>
      <PorQue>
        Si ya hiciste Potenciación (Unidad 01), esto es repaso. Acá vamos más profundo a
        cómo se usan EN ECUACIONES.
      </PorQue>
    </EscenaRica>
  );
}

function Esc02_CeroNeg() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Exponente 0 y negativo</Titulo>
      <Resumen>
        <strong>a⁰ = 1</strong> (con a ≠ 0).<br />
        <strong>a⁻ⁿ = 1/aⁿ</strong>.
      </Resumen>
      <Ejemplo>
        5⁰ = 1 &nbsp;·&nbsp; 2⁻³ = 1/8 &nbsp;·&nbsp; (3/4)⁻² = (4/3)² = 16/9.
      </Ejemplo>
      <PorQue>
        ¿Por qué a⁰ = 1? Mirá: aⁿ/aⁿ = a^(n−n) = a⁰. Pero también aⁿ/aⁿ = 1. ⟹ a⁰ = 1.
      </PorQue>
      <PorQue>
        ¿Por qué a⁻ⁿ = 1/aⁿ? Porque 1 = a⁰ = aⁿ·a⁻ⁿ, despejando: a⁻ⁿ = 1/aⁿ.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03_Frac() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Exponente fraccionario = radical</Titulo>
      <Resumen>
        <strong>a^(1/n) = ⁿ√a</strong>. Y en general: <strong>a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ</strong>.
      </Resumen>
      <Ejemplo>
        9^(1/2) = √9 = 3 &nbsp;·&nbsp; 8^(1/3) = ³√8 = 2 &nbsp;·&nbsp; 16^(3/4) = (⁴√16)³ = 2³ = 8.
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
        si tenés aˣ = aʸ, entonces x = y.
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
        <Paso n={1}>Aplicá logaritmo: x = log(10)/log(2) = 1/0.301 ≈ 3.322.</Paso>
      </Ejemplo>
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
        Modelo: <strong>P(t) = P₀ · (1 + r)ᵗ</strong>. Si decrece: usás (1 − r).
      </Resumen>
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
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "3² · 3⁴ = ?", o: ["3⁶", "3⁸", "9⁶", "3"], c: 0, ex: "Misma base: sumar exp. 3^(2+4) = 3⁶." },
    { p: "2⁰ = ?", o: ["0", "1", "2", "Indefinido"], c: 1, ex: "Por definición a⁰ = 1." },
    { p: "8^(1/3) = ?", o: ["2", "3", "4", "8/3"], c: 0, ex: "³√8 = 2." },
    { p: "5⁻² = ?", o: ["−25", "−10", "1/25", "1/10"], c: 2, ex: "5⁻² = 1/5² = 1/25." },
    { p: "Resolvé 2^(x+1) = 16:", o: ["x = 3", "x = 4", "x = 8", "x = 5"], c: 0, ex: "16 = 2⁴ → x+1 = 4 → x = 3." },
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
            {ok === ejs.length && "🎉 Dominás teoría de exponentes."}
            {ok < ejs.length && "Releé las 5 propiedades + casos especiales."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
