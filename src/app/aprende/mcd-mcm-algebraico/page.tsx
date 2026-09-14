"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
} from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

// Venn de factores: dos polinomios, sus factores y el cruce común. Al tocar
// se resaltan los factores compartidos (MCD).
function VennFactores() {
  const [on, setOn] = useState(false);
  // P = x²(x+3) = x · x · (x+3)
  // Q = x(x+3)² = x · (x+3) · (x+3)
  // Comunes (MCD) = x · (x+3)
  // Solo P: x
  // Solo Q: (x+3)
  const fade = on ? 1 : 0.5;
  const common = (etiq: string) => (
    <motion.div
      initial={{ scale: 1, color: LIENZO.fg }}
      animate={on ? { scale: 1.08, color: LIENZO.ok } : { scale: 1, color: LIENZO.fg }}
      transition={{ duration: 0.4 }}
      style={{ padding: "4px 10px", borderRadius: 8, fontWeight: 600 }}
    >
      {etiq}
    </motion.div>
  );
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={210} onClick={() => setOn((v) => !v)}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, width: "100%",
          fontFamily: "var(--font-crimson), serif", fontSize: 18,
          alignItems: "center",
        }}>
          {/* Lado P */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.4, color: LIENZO.fgFaint, marginBottom: 6 }}>P = x²(x + 3)</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, opacity: fade }}>
              {common("x")}
              {common("x + 3")}
              <div style={{ padding: "4px 10px", color: LIENZO.fgDim }}>x</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0.4 }} animate={{ opacity: on ? 1 : 0.4 }}
            style={{ fontSize: 32, color: LIENZO.fgFaint }}
          >∩</motion.div>

          {/* Lado Q */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.4, color: LIENZO.fgFaint, marginBottom: 6 }}>Q = x(x + 3)²</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, opacity: fade }}>
              {common("x")}
              {common("x + 3")}
              <div style={{ padding: "4px 10px", color: LIENZO.fgDim }}>x + 3</div>
            </div>
          </div>

          {/* MCD destacado */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              gridColumn: "1 / -1", textAlign: "center", marginTop: 12,
              fontSize: 22, fontWeight: 600,
            }}
          >
            MCD = <span style={{ color: LIENZO.ok }}>x · (x + 3)</span>
          </motion.div>
        </div>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic" }}>
        {on
          ? <>Los factores en <b style={{ color: LIENZO.ok }}>verde</b> aparecen en AMBOS: su producto es el MCD.</>
          : "Toca para resaltar los factores comunes"}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="MCD y MCM algebraicos"
      escenas={[
        { titulo: "¿Para qué?", componente: Esc01_Intro },
        { titulo: "Primer paso: factorizar", componente: Esc02_Factorizar },
        { titulo: "MCD algebraico", componente: Esc03_MCD },
        { titulo: "MCM algebraico", componente: Esc04_MCM },
        { titulo: "Aplicación: fracciones algebraicas", componente: Esc05_Fracciones },
        { titulo: "Errores comunes", componente: Esc06_Errores },
        { titulo: "Práctica final", componente: Esc07_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>MCD y MCM con polinomios</Titulo>
      <Parrafo>
        Igual que con números, puedes calcular el <strong>Máximo Común Divisor</strong>
        y el <strong>Mínimo Común Múltiplo</strong> entre <em>polinomios</em>. Sirve
        para simplificar y sumar fracciones algebraicas.
      </Parrafo>
      <Resumen>
        🎯 ¿Para qué sirve?<br />
        • <strong>Simplificar fracciones algebraicas</strong>: dividir arriba y abajo por el MCD.<br />
        • <strong>Sumar fracciones algebraicas</strong>: necesitas un común denominador (MCM).<br />
        • <strong>Resolver ecuaciones racionales</strong>: multiplicar ambos lados por el MCM.
      </Resumen>
      <PorQue>
        La idea es <em>idéntica</em> al MCD/MCM numérico. La única diferencia es que ahora
        los "primos" son factores algebraicos (como (x−2), (x+3), x², etc).
      </PorQue>

      <Hook>
        En el examen UMSS aparece como <strong>preparación para fracciones algebraicas</strong>:
        sin MCM no puedes sumarlas, sin MCD no puedes simplificarlas. Es paso obligado.
      </Hook>

      <Mnemotecnia>
        <strong>"MeNOR vs MaYOR"</strong><br />
        <strong>MCD</strong> → factores <strong>comunes</strong> con el menor exponente.<br />
        <strong>MCM</strong> → <strong>TODOS</strong> los factores con el mayor exponente.<br /><br />
        Atajo: "<strong>D</strong>ivisor" → chico (cabe en ambos).
        "<strong>M</strong>últiplo" → grande (es múltiplo de ambos).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_Factorizar() {
  return (
    <EscenaRica>
      <Titulo accent={LIENZO.accent}>Paso 0: factorizar SIEMPRE primero</Titulo>
      <Parrafo>
        Antes de hablar de MCD o MCM, tienes que tener cada polinomio
        <strong> totalmente factorizado</strong>. Si no, no puedes comparar.
      </Parrafo>

      <Ejemplo titulo="Factorizar para comparar">
        <Paso n={1}>x² − 9 = (x + 3)(x − 3)</Paso>
        <Paso n={2}>x² + 6x + 9 = (x + 3)²</Paso>
        <Paso n={3}>Ahora puedo comparar: ambos comparten el factor (x + 3).</Paso>
      </Ejemplo>

      <Cuidado>
        Si te dan polinomios sin factorizar, factoriza primero usando los métodos de la
        lección anterior (factor común, dif. cuadrados, TCP, trinomio).
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_MCD() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>MCD algebraico</Titulo>
      <Resumen>
        <strong>MCD = factores COMUNES elevados al MENOR exponente</strong>
      </Resumen>
      <Parrafo>
        Igual que con números, pero ahora cada factor puede ser una expresión.
      </Parrafo>

      <Ejemplo titulo="MCD de x²(x+3) y x(x+3)²">
        <Paso n={1}>Factor común x: aparece en ambos. Menor exponente: x¹.</Paso>
        <Paso n={2}>Factor común (x+3): aparece en ambos. Menor exponente: (x+3)¹.</Paso>
        <Paso n={3}>MCD = <strong style={{ color: COLOR_OK }}>x(x+3)</strong>.</Paso>
      </Ejemplo>
      <VennFactores />

      <Ejemplo titulo="MCD de (x+3)²(x−1) y (x+3)(x−1)³">
        <Paso n={1}>Comunes: (x+3) y (x−1).</Paso>
        <Paso n={2}>Menores exponentes: (x+3)¹ y (x−1)¹.</Paso>
        <Paso n={3}>MCD = <strong style={{ color: COLOR_OK }}>(x+3)(x−1)</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Solo entran factores que aparezcan en TODOS los polinomios. Si un factor está
        en uno y no en el otro, NO va al MCD.
      </Cuidado>

      <AutoCheck
        pregunta="MCD de x²(x−2)³ y x³(x−2)"
        opciones={["x²(x−2)³", "x²(x−2)", "x³(x−2)³", "x(x−2)"]}
        correctaIdx={1}
        explicacion="x: comunes, menor exponente 2. (x−2): comunes, menor exponente 1. → x²(x−2)."
      />
    </EscenaRica>
  );
}

function Esc04_MCM() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>MCM algebraico</Titulo>
      <Resumen>
        <strong>MCM = TODOS los factores (de cualquiera) elevados al MAYOR exponente</strong>
      </Resumen>

      <Ejemplo titulo="MCM de (x+3)²(x−1) y (x+3)(x−1)³">
        <Paso n={1}>Factores presentes: (x+3) y (x−1).</Paso>
        <Paso n={2}>Mayores exponentes: (x+3)² y (x−1)³.</Paso>
        <Paso n={3}>MCM = <strong style={{ color: COLOR_OK }}>(x+3)²(x−1)³</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="MCM cuando hay factores no compartidos: x²(x+1) y x(x−3)">
        <Paso n={1}>Factores: x, (x+1), (x−3).</Paso>
        <Paso n={2}>Mayor exponente de cada uno: x², (x+1)¹, (x−3)¹.</Paso>
        <Paso n={3}>MCM = <strong style={{ color: COLOR_OK }}>x²(x+1)(x−3)</strong>.</Paso>
      </Ejemplo>

      <AutoCheck
        pregunta="MCM de x²(x−2)³ y x³(x−2)"
        opciones={["x²(x−2)", "x³(x−2)³", "x⁵(x−2)⁴", "(x−2)³"]}
        correctaIdx={1}
        explicacion="Mayor x: 3. Mayor (x−2): 3. → x³(x−2)³."
      />
    </EscenaRica>
  );
}

function Esc05_Fracciones() {
  return (
    <EscenaRica>
      <Titulo>Aplicación: sumar fracciones algebraicas</Titulo>
      <Parrafo>
        El uso más común del MCM algebraico es <strong>encontrar el común denominador</strong>
        al sumar fracciones con polinomios.
      </Parrafo>

      <Ejemplo titulo="Sumar 1/x + 1/(x+1)">
        <Paso n={1}>MCM de los denominadores: x · (x+1) = <strong>x(x+1)</strong>.</Paso>
        <Paso n={2}>Reescribo cada fracción con el mismo denominador:</Paso>
        <Paso n={3}>1/x = (x+1) / [x(x+1)] · 1/(x+1) = x / [x(x+1)]</Paso>
        <Paso n={4}>Sumo numeradores: (x+1) + x = 2x + 1</Paso>
        <Paso n={5}>Resultado: <strong style={{ color: COLOR_OK }}>(2x + 1) / [x(x+1)]</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="Simplificar (x² − 9)/(x² + 6x + 9)">
        <Paso n={1}>Factorizo: arriba (x+3)(x−3), abajo (x+3)².</Paso>
        <Paso n={2}>MCD: (x+3). Cancelo arriba y abajo.</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>(x − 3) / (x + 3)</strong>.</Paso>
      </Ejemplo>

      <Resumen>
        Regla mnemónica: <strong>MCD → simplificar; MCM → sumar/restar</strong>.
      </Resumen>

      <WorkedExample titulo="Resta de fracciones algebraicas · paso a paso">
        Resuelve: <strong>(2x)/(x²−1) − 1/(x+1)</strong>.<br /><br />

        <strong>Paso 1 · Factorizar denominadores:</strong><br />
        x² − 1 = (x+1)(x−1) (diferencia de cuadrados).<br />
        El otro denominador es (x+1).<br /><br />

        <strong>Paso 2 · MCM de denominadores:</strong><br />
        Factores: (x+1) y (x−1). Mayor exponente de cada: 1. → MCM = <strong>(x+1)(x−1)</strong>.<br /><br />

        <strong>Paso 3 · Reescribir con denominador común:</strong><br />
        Primera: (2x) / [(x+1)(x−1)] (ya está).<br />
        Segunda: 1/(x+1) → multiplico arriba y abajo por (x−1) → (x−1) / [(x+1)(x−1)].<br /><br />

        <strong>Paso 4 · Restar numeradores:</strong><br />
        2x − (x − 1) = 2x − x + 1 = <strong>x + 1</strong>.<br /><br />

        <strong>Paso 5 · Resultado:</strong><br />
        (x + 1) / [(x+1)(x−1)] = <strong>1 / (x − 1)</strong> (cancelo (x+1) arriba y abajo).<br /><br />

        <strong>Aprendizaje:</strong> al final cancelamos un factor común. Eso es porque el
        resultado se simplifica. Sin factorizar primero, no veríamos la simplificación.
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc06_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Saltarse la factorización. <br />
        <span style={{ fontSize: 13 }}>
          Si no factorizas los polinomios primero, no puedes identificar los "factores comunes".
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Confundir MCD con MCM (mayor vs menor exponente). <br />
        <span style={{ fontSize: 13 }}>
          MCD = menor. MCM = mayor. Mnemotecnia: <strong>"D" de divisor = chiquito</strong>;
          <strong> "M" de múltiplo = grandote</strong>.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> Querer cancelar términos sumandos. <br />
        <span style={{ fontSize: 13 }}>
          ❌ (x+3)/(x+5) NO se simplifica cancelando x. Solo se cancelan factores MULTIPLICATIVOS, no sumados.
        </span>
      </Cuidado>

      <Misconception titulo="Trampa de cancelación · 'solo factores' (NUNCA sumandos)">
        <strong>Correcto:</strong> (x+3)(x−2) / (x+3)(x+4) = (x−2)/(x+4). Cancelo (x+3)
        que es factor.<br />
        <strong>INCORRECTO:</strong> (x+3)/(x+5) → cancelar x: NO PUEDES. Acá x es SUMANDO,
        no factor.<br /><br />
        Regla: solo cancelas cuando algo está MULTIPLICANDO arriba y MULTIPLICANDO abajo.
        Si está sumando o restando, queda atrapado.
      </Misconception>

      <Conexion>
        MCD/MCM algebraicos son la herramienta de: <strong>Factorización</strong> (paso previo
        obligatorio), <strong>Fracciones algebraicas</strong> (suma, resta, simplificación) y
        <strong> Ecuaciones racionales</strong> (multiplicar por MCM para eliminar denominadores).
      </Conexion>
    </EscenaRica>
  );
}

function Esc07_Practica() {
  const ejs = useMemo(() => [
    { p: "MCD de x²(x+1) y x(x+1)³", o: ["x²(x+1)³", "x(x+1)", "x(x+1)³", "x²(x+1)"], c: 1, ex: "Comunes con menor exp: x¹, (x+1)¹. → x(x+1)." },
    { p: "MCM de x²(x+1) y x(x+1)³", o: ["x²(x+1)³", "x(x+1)", "x³(x+1)⁴", "x²(x+1)"], c: 0, ex: "Todos con mayor exp: x², (x+1)³. → x²(x+1)³." },
    { p: "MCD de (x−2)(x+1) y (x−2)²(x+5)", o: ["(x−2)", "(x−2)²", "(x−2)(x+1)(x+5)", "(x−2)(x+1)²"], c: 0, ex: "Solo (x−2) es común, con menor exp 1." },
    { p: "Simplificar (x²−4)/(x+2)", o: ["x − 2", "x + 2", "x − 4", "no se puede"], c: 0, ex: "x²−4 = (x+2)(x−2). Cancelo (x+2) arriba/abajo. → x − 2." },
    { p: "MCM de los denominadores de 1/(x−1) + 1/(x+1):", o: ["x²−1", "(x−1)(x+1)", "Ambas son lo mismo", "x²+1"], c: 2, ex: "(x−1)(x+1) = x²−1. Las dos opciones son equivalentes." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios, combina factorización con MCD/MCM:</Parrafo>
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
            {ok === ejs.length && "🎉 Dominas MCD/MCM algebraicos."}
            {ok >= 3 && ok < ejs.length && "Bien. La clave: factorizar primero."}
            {ok < 3 && "Relee la factorización (lección anterior) y vuelve acá."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
