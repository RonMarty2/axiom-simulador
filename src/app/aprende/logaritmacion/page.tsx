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
      unidad="10"
      tituloUnidad="Logaritmación"
      escenas={[
        { titulo: "¿Qué es un logaritmo?", componente: Esc01_Intro },
        { titulo: "Definición y notación", componente: Esc02_Def },
        { titulo: "Logaritmos básicos a saber", componente: Esc03_Basicos },
        { titulo: "Propiedad: producto → suma", componente: Esc04_Prod },
        { titulo: "Propiedad: cociente → resta", componente: Esc05_Coc },
        { titulo: "Propiedad: potencia → producto", componente: Esc06_Pot },
        { titulo: "Cambio de base", componente: Esc07_Cambio },
        { titulo: "Ecuaciones logarítmicas y exponenciales", componente: Esc08_Ec },
        { titulo: "Errores comunes", componente: Esc09_Errores },
        { titulo: "Práctica final", componente: Esc10_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Logaritmos: la operación inversa de la exponencial</Titulo>
      <Parrafo>
        Un logaritmo responde la pregunta: <strong>"¿a qué exponente elevo la base para
        obtener este número?"</strong>
      </Parrafo>
      <Ejemplo>
        log₂(8) = 3, porque 2³ = 8.<br />
        log₁₀(100) = 2, porque 10² = 100.<br />
        log₅(125) = 3, porque 5³ = 125.
      </Ejemplo>
      <Resumen>
        🎯 ¿Para qué sirven? <br />
        • <strong>Interés compuesto</strong>: ¿cuántos años para que mi dinero se duplique?<br />
        • <strong>pH, magnitud de terremotos, decibeles</strong>: escalas logarítmicas.<br />
        • <strong>Algoritmos</strong> (complejidad O(log n)).<br />
        • <strong>Despejar exponentes</strong> en ecuaciones tipo 2ˣ = 10.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Def() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Definición formal</Titulo>
      <Definicion termino="logaritmo">
        <strong>log<sub>a</sub>(b) = c</strong> ⟺ <strong>aᶜ = b</strong> <br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          (con a &gt; 0, a ≠ 1 y b &gt; 0)
        </span>
      </Definicion>
      <Resumen>
        • a se llama <strong>base</strong>.<br />
        • b se llama <strong>argumento</strong>.<br />
        • c es el <strong>logaritmo</strong> (el resultado).
      </Resumen>
      <Ejemplo>
        log₃(81) = 4 porque 3⁴ = 81.
      </Ejemplo>
      <Cuidado>
        El argumento <strong>siempre debe ser positivo</strong>. log(0) y log(número negativo) NO existen.
      </Cuidado>
      <PorQue>
        Pensá así: log y potencia son operaciones inversas, como suma/resta o mult/div.
        Si "elevar a base a" es ir hacia adelante, "log base a" es ir hacia atrás.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03_Basicos() {
  return (
    <EscenaRica>
      <Titulo>Logaritmos que conviene memorizar</Titulo>
      <Resumen>
        • <strong>log<sub>a</sub>(1) = 0</strong> (porque a⁰ = 1).<br />
        • <strong>log<sub>a</sub>(a) = 1</strong> (porque a¹ = a).<br />
        • <strong>log<sub>a</sub>(aⁿ) = n</strong> (porque aⁿ = aⁿ).<br />
        • Notación especial: <strong>log = log₁₀</strong> (base 10). <strong>ln = log<sub>e</sub></strong> (base e ≈ 2.71).
      </Resumen>
      <Ejemplo>
        log(1000) = 3 (porque 10³ = 1000).<br />
        log₂(16) = 4 (porque 2⁴ = 16).<br />
        ln(e) = 1.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_Prod() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Propiedad 1: Producto → Suma</Titulo>
      <Resumen>
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          log<sub>a</sub>(x · y) = log<sub>a</sub>(x) + log<sub>a</sub>(y)
        </span>
      </Resumen>
      <Ejemplo>
        log(6) = log(2·3) = log(2) + log(3) ≈ 0.301 + 0.477 = 0.778.
      </Ejemplo>
      <PorQue>
        Sale de las propiedades de potencias: si aᵐ·aⁿ = aᵐ⁺ⁿ, entonces multiplicar números
        equivale a sumar sus exponentes (= sus logaritmos).
      </PorQue>
    </EscenaRica>
  );
}

function Esc05_Coc() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Propiedad 2: Cociente → Resta</Titulo>
      <Resumen>
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          log<sub>a</sub>(x / y) = log<sub>a</sub>(x) − log<sub>a</sub>(y)
        </span>
      </Resumen>
      <Ejemplo>
        log(1000/100) = log(1000) − log(100) = 3 − 2 = 1.<br />
        Verificación: 1000/100 = 10 → log(10) = 1 ✓.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc06_Pot() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Propiedad 3: Potencia → Producto</Titulo>
      <Resumen>
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          log<sub>a</sub>(xⁿ) = n · log<sub>a</sub>(x)
        </span>
      </Resumen>
      <Parrafo>
        Esta es la propiedad <strong>más útil para despejar exponentes</strong>. El exponente
        "baja" y se vuelve un factor.
      </Parrafo>
      <Ejemplo>
        log(8) = log(2³) = 3·log(2) ≈ 3·0.301 = 0.903.
      </Ejemplo>
      <AutoCheck
        pregunta="Reescribí log(x⁵)"
        opciones={["5·log(x)", "log(5x)", "log(5) + log(x)", "x·log(5)"]}
        correctaIdx={0}
        explicacion="El exponente baja como factor: log(x⁵) = 5·log(x)."
      />
    </EscenaRica>
  );
}

function Esc07_Cambio() {
  return (
    <EscenaRica>
      <Titulo>Cambio de base</Titulo>
      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          log<sub>a</sub>(b) = log<sub>c</sub>(b) / log<sub>c</sub>(a)
        </span>
      </Resumen>
      <Parrafo>
        Útil para calcular logaritmos en cualquier base usando solo log₁₀ o ln (que tu calculadora tiene).
      </Parrafo>
      <Ejemplo>
        log₂(7) = log(7) / log(2) ≈ 0.845 / 0.301 ≈ 2.807.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc08_Ec() {
  return (
    <EscenaRica>
      <Titulo>Ecuaciones exponenciales y logarítmicas</Titulo>
      <Ejemplo titulo="Ecuación exponencial: 2ˣ = 10">
        <Paso n={1}>Aplicá log a ambos lados: log(2ˣ) = log(10).</Paso>
        <Paso n={2}>Por propiedad: x·log(2) = log(10) = 1.</Paso>
        <Paso n={3}>x = 1/log(2) ≈ 3.322.</Paso>
      </Ejemplo>
      <Ejemplo titulo="Ecuación logarítmica: log₃(x) = 4">
        <Paso n={1}>Aplicá la definición: x = 3⁴.</Paso>
        <Paso n={2}>x = <strong style={{ color: COLOR_OK }}>81</strong>.</Paso>
      </Ejemplo>
      <Ejemplo titulo="Combinada: log(x) + log(x − 3) = 1">
        <Paso n={1}>Producto en log: log(x(x−3)) = 1.</Paso>
        <Paso n={2}>Definición (base 10): x(x−3) = 10¹ = 10.</Paso>
        <Paso n={3}>x² − 3x − 10 = 0 → (x−5)(x+2) = 0 → x = 5 ó x = −2.</Paso>
        <Paso n={4}>x = −2 lo descartamos (log de negativo no existe). Solución: x = 5.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc09_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> log(a+b) NO es log(a) + log(b). <br />
        <span style={{ fontSize: 13 }}>Eso es para PRODUCTO, no para suma. Suma → no se simplifica.</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Olvidar verificar el dominio. <br />
        <span style={{ fontSize: 13 }}>El argumento del log debe ser &gt; 0. Si tu solución vuelve un log negativo o cero, descártala.</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> (log x)² ≠ log(x²). <br />
        <span style={{ fontSize: 13 }}>Ojo a los paréntesis. log(x²) = 2·log(x). (log x)² es el cuadrado del logaritmo.</span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc10_Practica() {
  const ejs = useMemo(() => [
    { p: "log₅(125) = ?", o: ["3", "25", "5", "120"], c: 0, ex: "5³ = 125 → log₅(125) = 3." },
    { p: "log(1000) = ?", o: ["10", "100", "3", "1000"], c: 2, ex: "10³ = 1000 → log(1000) = 3." },
    { p: "log(x · y) = ?", o: ["log(x) · log(y)", "log(x) + log(y)", "log(x) − log(y)", "log(x+y)"], c: 1, ex: "Producto se vuelve suma." },
    { p: "Si log(x) = 2, entonces x =", o: ["10", "100", "20", "1000"], c: 1, ex: "Base 10 por defecto: 10² = 100." },
    { p: "log(8) usando log(2)≈0.301:", o: ["0.602", "0.903", "0.301", "1.204"], c: 1, ex: "log(8) = log(2³) = 3·log(2) ≈ 0.903." },
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
            {ok === ejs.length && "🎉 Dominás logaritmos."}
            {ok < ejs.length && "Memorizá las 3 propiedades + cambio de base."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
