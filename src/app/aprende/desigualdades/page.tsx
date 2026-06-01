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
      unidad="09"
      tituloUnidad="Desigualdades e inecuaciones"
      escenas={[
        { titulo: "¿Qué es una inecuación?", componente: Esc01_Intro },
        { titulo: "Los 4 símbolos", componente: Esc02_Simbolos },
        { titulo: "Resolver lineales", componente: Esc03_Lineal },
        { titulo: "El truco del signo negativo", componente: Esc04_Negativo },
        { titulo: "Notación de intervalos", componente: Esc05_Intervalos },
        { titulo: "Inecuación cuadrática", componente: Esc06_Cuad },
        { titulo: "Errores comunes", componente: Esc07_Errores },
        { titulo: "Práctica final", componente: Esc08_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Inecuaciones: en lugar de "=" tenés "&lt;" o "&gt;"</Titulo>
      <Definicion termino="inecuación">
        Una inecuación es una <strong>desigualdad</strong> con una incógnita. En vez del
        signo "=" usás &lt;, &gt;, ≤ ó ≥. La solución típicamente es un <strong>conjunto
        infinito</strong> de valores.
      </Definicion>
      <Ejemplo>
        2x + 3 &lt; 11 — su solución es <strong>x &lt; 4</strong> (infinitos números).
      </Ejemplo>
      <Resumen>
        🎯 Aplicaciones: restricciones de presupuesto ("gasto menor que X"), rangos de
        validez de fórmulas (dominio), problemas con cotas, optimización.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Simbolos() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Los 4 símbolos</Titulo>
      <Ejemplo>
        <strong style={{ color: COLOR_EXP }}>&lt;</strong> = menor que (estricto). 3 &lt; 5 ✓ pero 5 &lt; 5 ✗.<br />
        <strong style={{ color: COLOR_OK }}>&gt;</strong> = mayor que (estricto).<br />
        <strong style={{ color: "#3b82f6" }}>≤</strong> = menor o IGUAL (incluye el valor).<br />
        <strong style={{ color: "#f59e0b" }}>≥</strong> = mayor o igual.
      </Ejemplo>
      <Cuidado>
        Atención a "estricto" (&lt;, &gt;) vs "incluye" (≤, ≥). En la solución y en intervalos
        eso cambia si el extremo va con paréntesis ( ) o con corchete [ ].
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_Lineal() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Resolver una inecuación lineal</Titulo>
      <Parrafo>
        Las reglas son las mismas que para ecuaciones, con UNA EXCEPCIÓN (la vemos en la próxima escena).
      </Parrafo>
      <Ejemplo titulo="Resolvé: 2x + 3 &lt; 11">
        <Paso n={1}>Paso el +3: 2x &lt; 11 − 3 → 2x &lt; 8.</Paso>
        <Paso n={2}>Divido por 2 (positivo, no afecta): x &lt; 4.</Paso>
        <Paso n={3}>Solución: <strong style={{ color: COLOR_OK }}>x &lt; 4</strong> (todo número menor que 4).</Paso>
      </Ejemplo>
      <Ejemplo titulo="Resolvé: 3x − 5 ≥ 7">
        <Paso n={1}>3x ≥ 12 → x ≥ 4.</Paso>
        <Paso n={2}>Solución: <strong style={{ color: COLOR_OK }}>x ≥ 4</strong> (4 inclusive).</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_Negativo() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>⚠️ EL TRUCO: signo negativo invierte la desigualdad</Titulo>
      <Resumen>
        Cuando <strong>multiplicás o dividís por un número NEGATIVO</strong>, el sentido de la desigualdad se INVIERTE: &lt; pasa a &gt; y al revés.
      </Resumen>

      <Ejemplo titulo="Resolvé: −2x &lt; 6">
        <Paso n={1}>Divido por <strong>−2</strong>. Esto INVIERTE el signo.</Paso>
        <Paso n={2}>x &gt; 6/(−2) → x &gt; −3.</Paso>
        <Paso n={3}>Solución: <strong style={{ color: COLOR_OK }}>x &gt; −3</strong> (con &gt;, no &lt;).</Paso>
      </Ejemplo>

      <PorQue>
        Pensalo: 2 &lt; 3 es verdad. Multiplico ambos lados por −1: −2 y −3.
        ¿Es −2 &lt; −3? NO. Es −2 &gt; −3. El sentido se da vuelta.
      </PorQue>

      <Cuidado>
        Si solo SUMÁS o RESTÁS, NO se invierte. Tampoco si multiplicás por positivo.
        SOLO al multiplicar o dividir por NEGATIVO.
      </Cuidado>

      <AutoCheck
        pregunta="Resolvé: −3x ≥ 9"
        opciones={["x ≥ 3", "x ≤ 3", "x ≥ −3", "x ≤ −3"]}
        correctaIdx={3}
        explicacion="Divido por −3 → invierto: x ≤ 9/(−3) → x ≤ −3."
      />
    </EscenaRica>
  );
}

function Esc05_Intervalos() {
  return (
    <EscenaRica>
      <Titulo>Notación de intervalos</Titulo>
      <Parrafo>La solución de una inecuación se puede escribir como intervalo:</Parrafo>
      <Resumen>
        x &lt; 4 → (−∞, 4) — paréntesis significa "no incluye".<br />
        x ≤ 4 → (−∞, 4] — corchete significa "incluye".<br />
        x &gt; 3 → (3, +∞).<br />
        2 ≤ x &lt; 5 → [2, 5).
      </Resumen>
      <Cuidado>
        ∞ (infinito) SIEMPRE va con paréntesis ( ), nunca con corchete. No es un número
        alcanzable.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_Cuad() {
  return (
    <EscenaRica>
      <Titulo>Inecuaciones cuadráticas</Titulo>
      <Parrafo>
        Para resolver <strong>algo cuadrático &gt; 0</strong> (o &lt; 0):
      </Parrafo>
      <Resumen>
        1️⃣ Llevá la inecuación a la forma <strong>ax² + bx + c &gt; 0</strong> (o &lt; 0).<br />
        2️⃣ Encontrá las raíces (igualando a 0).<br />
        3️⃣ Analizá los signos del polinomio en cada intervalo definido por las raíces.<br />
        4️⃣ Tomá los intervalos que cumplan la desigualdad.
      </Resumen>

      <Ejemplo titulo="Resolvé: x² − x − 6 &gt; 0">
        <Paso n={1}>Raíces: x² − x − 6 = 0 → (x − 3)(x + 2) = 0 → x = 3 ó x = −2.</Paso>
        <Paso n={2}>3 intervalos: (−∞, −2), (−2, 3), (3, +∞).</Paso>
        <Paso n={3}>Pruebo signo en cada uno. La parábola abre hacia ↑ (a&gt;0): es positiva FUERA de las raíces.</Paso>
        <Paso n={4}>Solución: <strong style={{ color: COLOR_OK }}>x &lt; −2 ó x &gt; 3</strong>, o sea (−∞, −2) ∪ (3, +∞).</Paso>
      </Ejemplo>

      <PorQue>
        Si la parábola abre arriba: positiva fuera de raíces, negativa entre.<br />
        Si abre abajo: al revés.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Olvidar invertir al dividir por negativo. <br />
        <span style={{ fontSize: 13 }}>Lo más típico. Antes de dividir por algo negativo, marcá mentalmente "invertir signo".</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Tratar &lt; como ≤. <br />
        <span style={{ fontSize: 13 }}>x &lt; 4 NO incluye al 4. x ≤ 4 sí. Cambia el corchete del intervalo.</span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> En cuadráticas, no probar signos. <br />
        <span style={{ fontSize: 13 }}>Tener las raíces no es la solución. Tenés que probar el signo del polinomio en cada intervalo.</span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "Resolvé: 3x − 9 &gt; 0", o: ["x &gt; 3", "x &lt; 3", "x &gt; 9", "x &lt; −3"], c: 0, ex: "3x > 9 → x > 3." },
    { p: "Resolvé: −2x ≤ 8", o: ["x ≤ −4", "x ≥ −4", "x ≤ 4", "x ≥ 4"], c: 1, ex: "Divido por −2, invierto: x ≥ 8/−2 = −4." },
    { p: "¿Qué intervalo es x ≤ 7?", o: ["(−∞, 7)", "(−∞, 7]", "(7, ∞]", "[7, ∞)"], c: 1, ex: "Incluye 7 → corchete. (−∞, 7]." },
    { p: "Resolvé: 5 − x &lt; 2", o: ["x &lt; 3", "x &gt; 3", "x &lt; −3", "x &gt; −3"], c: 1, ex: "−x < 2 − 5 = −3 → multiplico por −1, invierto: x > 3." },
    { p: "x² − 4 &lt; 0 ⟹", o: ["x &lt; −2 ó x &gt; 2", "−2 &lt; x &lt; 2", "x = ±2", "Sin solución"], c: 1, ex: "(x-2)(x+2)<0, parábola abre arriba, NEGATIVA entre raíces: −2 < x < 2." },
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
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: e.p }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c; const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{ padding: "10px 14px", background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)", border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`, borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer", fontFamily: "var(--font-crimson), serif", textAlign: "left" }}
                    dangerouslySetInnerHTML={{ __html: op + (rev && isOk ? " ✓" : "") + (rev && isSel && !isOk ? " ✗" : "") }} />
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
            {ok === ejs.length && "🎉 Dominás inecuaciones."}
            {ok < ejs.length && "Memorizá: NEGATIVO invierte el signo."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
