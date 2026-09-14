"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="QUI-05"
      tituloUnidad="Leyes fundamentales · Mol, Avogadro, fórmulas"
      escenas={[
        { titulo: "El mol · concepto clave de la química", componente: EscMol },
        { titulo: "Número de Avogadro", componente: EscAvogadro },
        { titulo: "Masa molar y masa molecular", componente: EscMasaMolar },
        { titulo: "Conversiones · masa ⇄ moles ⇄ moléculas", componente: EscConversionSim },
        { titulo: "Composición porcentual", componente: EscComposicion },
        { titulo: "Fórmula empírica vs molecular", componente: EscFormulas },
        { titulo: "Leyes ponderales", componente: EscLeyes },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscMol() {
  return (
    <EscenaRica>
      <Titulo>El mol · unidad clave de la química</Titulo>

      <Hook>
        El mol es como "la docena" pero para cosas pequeñísimas (átomos,
        moléculas). Sin el mol, no podríamos contar átomos. Es la unidad más
        usada en todo el examen de Química.
      </Hook>

      <Definicion termino="Mol">
        Cantidad de sustancia que contiene tantas entidades elementales
        (átomos, moléculas, iones) como átomos hay en 12 g de carbono-12. <br />
        Equivale a: <strong>6.022 × 10²³</strong> entidades.
      </Definicion>

      <Mnemotecnia>
        Como la docena: 1 docena = 12 huevos. 1 mol = 6.022 × 10²³ partículas.
        La diferencia: el mol es mucho más grande (porque las partículas son
        muchísimo más pequeñas).
      </Mnemotecnia>

      <Ejemplo titulo="Comparaciones para dimensionar el mol">
        • 1 mol de granos de arroz cubriría toda la Tierra con una capa de
        varios metros.<br />
        • 1 mol de segundos = mucho más que la edad del universo.<br />
        • Pero 1 mol de átomos de hierro cabe en unos pocos gramos.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscAvogadro() {
  return (
    <EscenaRica>
      <Titulo>Número de Avogadro</Titulo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          N_A = 6.022 × 10²³ / mol
        </span><br /><br />
        Es el número de entidades por mol. Sirve para convertir entre cantidad
        de partículas y moles.
      </Resumen>

      <Resumen>
        <strong>Conversiones clave</strong>:<br />
        • Número de moléculas = moles × N_A.<br />
        • Moles = número de moléculas / N_A.
      </Resumen>

      <WorkedExample titulo="Q16 2op-2-2025 · átomos de oxígeno en NO">
        ¿Cuántos átomos de O hay en 30 g de NO?<br /><br />

        Masa molar NO = 14 + 16 = 30 g/mol.<br />
        Moles de NO = 30 / 30 = 1 mol.<br />
        Como cada NO tiene 1 átomo de O: 1 mol de O.<br />
        Átomos: 1 × 6.022 × 10²³ = <strong>6.023 × 10²³ átomos</strong>.
      </WorkedExample>

      <WorkedExample titulo="Q17 2op-2-2025 · agua en Na₂CO₃·10H₂O">
        Cierta cantidad de Na₂CO₃·10H₂O contiene 150 g de agua. ¿Cantidad de
        moléculas de Na₂CO₃?<br /><br />

        Moles de H₂O = 150 / 18 = 8.33 mol.<br />
        Razón H₂O : Na₂CO₃ = 10 : 1.<br />
        Moles de Na₂CO₃ = 8.33 / 10 = 0.833 mol.<br />
        Moléculas = 0.833 × 6.023 × 10²³ = <strong>5.02 × 10²³</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscMasaMolar() {
  return (
    <EscenaRica>
      <Titulo>Masa molar y masa molecular</Titulo>

      <Definicion termino="Masa atómica (uma)">
        Masa de un átomo en unidades de masa atómica. Aparece en la tabla
        periódica. Ej: H = 1, C = 12, O = 16, Na = 23, Cl = 35.5.
      </Definicion>

      <Definicion termino="Masa molecular (uma)">
        Suma de las masas atómicas de todos los átomos de la molécula.
      </Definicion>

      <Definicion termino="Masa molar (g/mol)">
        Masa de 1 mol de sustancia. Numéricamente igual a la masa molecular,
        pero en gramos por mol.
      </Definicion>

      <Ejemplo titulo="Cálculo de masa molar">
        • H₂O: 2(1) + 16 = <strong>18 g/mol</strong>.<br />
        • CO₂: 12 + 2(16) = <strong>44 g/mol</strong>.<br />
        • H₂SO₄: 2(1) + 32 + 4(16) = <strong>98 g/mol</strong>.<br />
        • Na₂CO₃: 2(23) + 12 + 3(16) = <strong>106 g/mol</strong>.<br />
        • Ca(OH)₂: 40 + 2(16 + 1) = 40 + 34 = <strong>74 g/mol</strong>.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscConversionSim() {
  const [gramos, setGramos] = useState(36);
  const [masaM, setMasaM] = useState(18); // H2O por defecto
  const moles = gramos / masaM;
  const moleculas = moles * 6.022e23;

  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Conversor · masa ⇄ moles ⇄ moléculas</Titulo>

      <Parrafo>
        Ingresá masa y masa molar para ver cuántos moles y moléculas tienes:
      </Parrafo>

      <Pizarra alto={180}>
        <div style={{ padding: 16, fontFamily: "var(--font-crimson), serif" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, textAlign: "center" }}>
            <div style={{ padding: 10, background: `${COLOR_OK}22`, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Masa</div>
              <div style={{ fontSize: 20, color: COLOR_OK, fontWeight: 700 }}>{gramos} g</div>
            </div>
            <div style={{ padding: 10, background: `${COLOR_EXP}22`, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Moles</div>
              <div style={{ fontSize: 20, color: COLOR_EXP, fontWeight: 700 }}>{moles.toFixed(2)} mol</div>
            </div>
            <div style={{ padding: 10, background: `${LIENZO.accent}22`, borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Moléculas</div>
              <div style={{ fontSize: 16, color: LIENZO.accent, fontWeight: 700 }}>{moleculas.toExponential(2)}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: LIENZO.fgDim, marginTop: 14, textAlign: "center" }}>
            Fórmulas: moles = masa / masa molar; moléculas = moles × N_A
          </div>
        </div>
      </Pizarra>

      <div style={{ maxWidth: 480, marginTop: 10 }}>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          Masa (g) = <strong style={{ color: COLOR_OK }}>{gramos}</strong>
          <input type="range" min={1} max={500} value={gramos}
            onChange={(e) => setGramos(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: COLOR_OK }} />
        </label>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          Masa molar (g/mol) = <strong style={{ color: COLOR_EXP }}>{masaM}</strong>
          <input type="range" min={2} max={200} value={masaM}
            onChange={(e) => setMasaM(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: COLOR_EXP }} />
        </label>
        <div style={{ fontSize: 12, color: LIENZO.fgDim, marginTop: 6, textAlign: "center" }}>
          Casos clásicos: H₂O = 18 · CO₂ = 44 · H₂SO₄ = 98 · NaOH = 40 · NaCl = 58.5
        </div>
      </div>

      <Conexion>
        Este conversor es el corazón de la ESTEQUIOMETRÍA (próximas lecciones).
        Saber convertir masa → moles → moléculas (y al revés) permite resolver
        cualquier problema con reacciones químicas.
      </Conexion>
    </EscenaRica>
  );
}

function EscComposicion() {
  return (
    <EscenaRica>
      <Titulo>Composición porcentual</Titulo>

      <Definicion termino="Composición porcentual">
        Porcentaje en masa que aporta cada elemento al total de un compuesto.<br />
        <span style={{ fontSize: 14, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          %elemento = (masa total del elemento / masa molar) × 100
        </span>
      </Definicion>

      <WorkedExample titulo="Composición del agua H₂O">
        Masa molar = 18 g/mol. <br />
        %H = (2·1 / 18) × 100 = 11.1%.<br />
        %O = (16 / 18) × 100 = 88.9%.<br />
        Suma: 11.1 + 88.9 = 100% ✓.
      </WorkedExample>

      <WorkedExample titulo="Q12 segunda opción 2005 · sodio en fosfato">
        Fosfato sódico (Na₃PO₄, P.M. 164) tiene 42.07% Na. ¿Cuántos g de
        mezcla 75% fosfato sódico + 25% fosfato de potasio se necesitan para
        18 g de Na?<br /><br />

        Si la mezcla pesa x g, el fosfato sódico aporta 0.75x g.<br />
        Sodio en esa parte: 0.75x · 0.4207 = 0.315x.<br />
        Igualar a 18 g: 0.315x = 18 → x = <strong>57.04 g</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscFormulas() {
  return (
    <EscenaRica>
      <Titulo>Fórmula empírica vs molecular</Titulo>

      <Definicion termino="Fórmula empírica">
        Razón ENTERA más simple entre los átomos de un compuesto. Ej: la
        empírica del agua es H₂O (no se puede simplificar).
      </Definicion>

      <Definicion termino="Fórmula molecular">
        Cantidad EXACTA de átomos en la molécula. Puede ser un múltiplo entero
        de la empírica.
      </Definicion>

      <Ejemplo titulo="Glucosa">
        Empírica: CH₂O (razón 1:2:1).<br />
        Molecular: C₆H₁₂O₆ (6 veces la empírica).<br />
        Para determinar el factor, necesitas la masa molecular real.
      </Ejemplo>

      <WorkedExample titulo="Procedimiento general · de % a fórmula empírica">
        Dado un compuesto con 40% C, 6.7% H, 53.3% O:<br /><br />

        Paso 1 · Asumir 100 g, así los % son los gramos.<br />
        Paso 2 · Convertir a moles dividiendo por masa atómica:<br />
        C: 40/12 = 3.33. H: 6.7/1 = 6.7. O: 53.3/16 = 3.33.<br />
        Paso 3 · Dividir todo entre el más chico (3.33):<br />
        C: 1. H: 2.01 ≈ 2. O: 1.<br />
        Paso 4 · Fórmula empírica: <strong>CH₂O</strong>.<br /><br />

        Si la masa molecular es 60 g/mol, la fórmula molecular es C₂H₄O₂
        (60/30 = 2 veces).
      </WorkedExample>

      <WorkedExample titulo="Q2 PREU 2025 · combustión orgánica">
        Combustión de 0.5978 g de compuesto (C, H, O) da 1.565 g CO₂ y
        0.514 g H₂O. Masa molecular = 84. ¿Fórmula?<br /><br />

        C en CO₂: 1.565 · (12/44) = 0.427 g → 0.427/12 = 0.0356 mol C.<br />
        H en H₂O: 0.514 · (2/18) = 0.0571 g → 0.0571 mol H.<br />
        O: 0.5978 − 0.427 − 0.0571 = 0.114 g → 0.114/16 = 0.00712 mol O.<br /><br />

        Razones / 0.00712: C 5.0, H 8.0, O 1.0. Empírica: C₅H₈O.<br />
        Masa empírica: 60 + 8 + 16 = 84 g/mol. Igual a la real.<br />
        Fórmula molecular = <strong>C₅H₈O</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscLeyes() {
  return (
    <EscenaRica>
      <Titulo>Las leyes ponderales</Titulo>

      <Definicion termino="Ley de conservación de la masa (Lavoisier)">
        En una reacción química, la masa total de los reactivos es igual a la
        masa total de los productos. La materia no se crea ni se destruye.
      </Definicion>

      <Definicion termino="Ley de las proporciones definidas (Proust)">
        Un compuesto químico contiene SIEMPRE los mismos elementos en las
        mismas proporciones de masa. El agua siempre es H:O = 1:8 en masa.
      </Definicion>

      <Definicion termino="Ley de las proporciones múltiples (Dalton)">
        Cuando dos elementos forman varios compuestos diferentes, las masas
        de uno que se combinan con una masa fija del otro están en razones de
        números enteros pequeños.<br /><br />
        Ej: CO y CO₂. Con 12 g de C: CO tiene 16 g O, CO₂ tiene 32 g O.
        Razón 1:2.
      </Definicion>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Moles en 18 g de H₂O:",
      o: ["1", "2", "18", "0.5"],
      c: 0,
      ex: "M_H₂O = 18 g/mol. 18/18 = 1 mol.",
    },
    {
      p: "Masa de 2 moles de CO₂:",
      o: ["88 g", "44 g", "22 g", "100 g"],
      c: 0,
      ex: "M_CO₂ = 44 g/mol. 2·44 = 88 g.",
    },
    {
      p: "Moléculas en 1 mol:",
      o: ["6.022·10²³", "6.022·10²⁴", "1·10²³", "12"],
      c: 0,
      ex: "Número de Avogadro.",
    },
    {
      p: "Empírica de C₂H₄:",
      o: ["CH₂", "C₂H₄", "CH", "C₄H₈"],
      c: 0,
      ex: "Simplificar razón 2:4 → 1:2 → CH₂.",
    },
    {
      p: "Masa molar de NaOH:",
      o: ["40", "23", "16", "57"],
      c: 0,
      ex: "23 + 16 + 1 = 40 g/mol.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · mol como sinónimo de molécula">
        Mol es CANTIDAD (como docena). Molécula es UNA partícula. 1 mol contiene
        6·10²³ moléculas, no es lo mismo.
      </Misconception>

      <Misconception titulo="Error 2 · masa atómica vs masa molar">
        Masa atómica en uma (sin unidades reales). Masa molar en g/mol
        (numericamente igual, pero con unidad). Para usar en cálculos,
        siempre g/mol.
      </Misconception>

      <Misconception titulo="Error 3 · fórmula empírica = molecular">
        No siempre. La empírica es la razón más simple. La molecular puede ser
        un múltiplo. Glucosa: CH₂O (empírica) vs C₆H₁₂O₆ (molecular).
      </Misconception>

      <Titulo>Práctica · 5 ejercicios</Titulo>
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
        </motion.div>
      )}
    </EscenaRica>
  );
}
