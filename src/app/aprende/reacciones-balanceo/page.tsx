"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="QUI-06"
      tituloUnidad="Reacciones químicas y balanceo"
      escenas={[
        { titulo: "Tipos de reacciones", componente: EscTipos },
        { titulo: "Reacciones redox · conceptos", componente: EscRedox },
        { titulo: "Balanceo por tanteo", componente: EscTanteo },
        { titulo: "Balanceo redox · método ion-electrón", componente: EscIonElectron },
        { titulo: "Agente oxidante y reductor", componente: EscAgentes },
        { titulo: "Problemas tipo examen", componente: EscProblemas },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscTipos() {
  return (
    <EscenaRica>
      <Titulo>Tipos de reacciones químicas</Titulo>

      <Hook>
        Las reacciones químicas + balanceo son la base de la estequiometría
        (próxima lección). En el examen FCyT aparece en preguntas de redox
        (Q18 1op-2-2025, Q13 3op-2025) y combustión (Q15 3op-2025).
      </Hook>

      <Resumen>
        <strong>4 tipos básicos</strong>:<br /><br />

        1. <strong>Combinación (síntesis)</strong>: A + B → AB.<br />
        Ej: 2 H₂ + O₂ → 2 H₂O.<br /><br />

        2. <strong>Descomposición</strong>: AB → A + B.<br />
        Ej: 2 H₂O → 2 H₂ + O₂ (electrólisis).<br /><br />

        3. <strong>Sustitución simple (desplazamiento)</strong>: A + BC → AC + B.<br />
        Ej: Fe + CuSO₄ → FeSO₄ + Cu.<br /><br />

        4. <strong>Sustitución doble (metátesis)</strong>: AB + CD → AD + CB.<br />
        Ej: NaCl + AgNO₃ → NaNO₃ + AgCl.
      </Resumen>

      <Definicion termino="Combustión">
        Caso especial donde una sustancia reacciona con O₂ liberando energía
        (calor + luz).<br />
        Combustión completa de hidrocarburos: C_xH_y + O₂ → CO₂ + H₂O.
      </Definicion>

      <Ejemplo titulo="Combustión completa del propano (Q15 3op-2025)">
        C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.<br />
        Para 2 moles de propano: 2 × 5 = <strong>10 moles de O₂</strong>.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscRedox() {
  return (
    <EscenaRica>
      <Titulo>Reacciones de oxidación-reducción (redox)</Titulo>

      <Definicion termino="Oxidación">
        PÉRDIDA de electrones. El número de oxidación AUMENTA.
      </Definicion>

      <Definicion termino="Reducción">
        GANANCIA de electrones. El número de oxidación DISMINUYE.
      </Definicion>

      <Mnemotecnia>
        <strong>"LEO el GER" (en inglés)</strong>:<br />
        • <strong>LEO</strong>: Lose Electrons = Oxidation (perder e⁻ es oxidarse).<br />
        • <strong>GER</strong>: Gain Electrons = Reduction (ganar e⁻ es reducirse).<br /><br />

        En español: <strong>"PROD"</strong> (Perder = Oxidación, Recibir =
        Reducción).
      </Mnemotecnia>

      <Resumen>
        En toda reacción redox SIEMPRE hay una oxidación Y una reducción
        simultáneas. Si alguien pierde electrones, otro los gana.
      </Resumen>

      <Ejemplo titulo="Ejemplo: Zn + Cu²⁺ → Zn²⁺ + Cu">
        • Zn (0) → Zn²⁺ (+2): perdió 2 e⁻ → OXIDACIÓN.<br />
        • Cu²⁺ (+2) → Cu (0): ganó 2 e⁻ → REDUCCIÓN.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscTanteo() {
  return (
    <EscenaRica>
      <Titulo>Balanceo por tanteo</Titulo>

      <Parrafo>
        Para reacciones simples (sin redox), el balanceo por tanteo es lo más
        rápido. Idea: ajustar coeficientes para que la cantidad de átomos de
        cada elemento sea IGUAL en ambos lados (ley de Lavoisier).
      </Parrafo>

      <Mnemotecnia>
        <strong>Orden recomendado</strong>:<br />
        1. Empezá por el elemento más común (suele ser C o un metal).<br />
        2. Después ajustá H.<br />
        3. Al final ajustá O.<br />
        4. Si quedan fracciones, multiplicá todo para enteros.
      </Mnemotecnia>

      <WorkedExample titulo="Combustión del metano · CH₄ + O₂ → CO₂ + H₂O">
        Paso 1 · C: 1 a la izquierda, 1 a la derecha. ✓<br />
        Paso 2 · H: 4 a la izquierda, 2 a la derecha. Multiplicar H₂O por 2:
        → CH₄ + O₂ → CO₂ + 2 H₂O. Ahora H: 4 = 4 ✓<br />
        Paso 3 · O: 2 a la izquierda, 2+2=4 a la derecha. Multiplicar O₂ por
        2: → CH₄ + 2 O₂ → CO₂ + 2 H₂O. O: 4=4 ✓<br /><br />

        Ecuación balanceada: <strong>CH₄ + 2 O₂ → CO₂ + 2 H₂O</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscIonElectron() {
  return (
    <EscenaRica>
      <Titulo>Balanceo redox · método ion-electrón</Titulo>

      <Parrafo>
        Para reacciones redox complejas (con HNO₃, KMnO₄, K₂Cr₂O₇), el tanteo
        no alcanza. Hay que usar el método ion-electrón:
      </Parrafo>

      <Resumen>
        <strong>Pasos del método</strong>:<br />
        1. Identificar números de oxidación.<br />
        2. Identificar qué se oxida y qué se reduce.<br />
        3. Escribir las dos semirreacciones (oxidación y reducción).<br />
        4. Balancear cada semirreacción (átomos y carga con e⁻).<br />
        5. Igualar electrones multiplicando las semirreacciones.<br />
        6. Sumar y simplificar.
      </Resumen>

      <WorkedExample titulo="Q13 3op-2025 / Q18 1op-2-2025 · Cu + HNO₃">
        Cu + HNO₃ → Cu(NO₃)₂ + NO + H₂O.<br /><br />

        Oxidaciones:<br />
        • Cu: 0 → +2 (perdió 2 e⁻, OXIDACIÓN).<br />
        • N: +5 → +2 (ganó 3 e⁻, REDUCCIÓN).<br /><br />

        Semirreacciones:<br />
        Cu → Cu²⁺ + 2e⁻ (× 3 para igualar e⁻)<br />
        N⁺⁵ + 3e⁻ → N⁺² (× 2 para igualar e⁻)<br /><br />

        Sumando: 3 Cu + 2 N⁺⁵ → 3 Cu²⁺ + 2 N⁺².<br /><br />

        Coeficientes en la ecuación: 3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O.<br /><br />

        <strong>Agente oxidante (HNO₃): coeficiente 8</strong>.<br />
        <strong>Agente reductor (Cu): coeficiente 3</strong>.<br />
        Razón oxidante/reductor = 8/3.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscAgentes() {
  return (
    <EscenaRica>
      <Titulo>Agente oxidante vs agente reductor</Titulo>

      <Definicion termino="Agente oxidante">
        Sustancia que CAUSA la oxidación de otra. Es la sustancia que SE
        REDUCE (gana electrones). Su número de oxidación DISMINUYE.
      </Definicion>

      <Definicion termino="Agente reductor">
        Sustancia que CAUSA la reducción de otra. Es la sustancia que SE
        OXIDA (pierde electrones). Su número de oxidación AUMENTA.
      </Definicion>

      <Mnemotecnia>
        <strong>Truco para no confundir</strong>:<br />
        El agente oxidante OXIDA al otro, pero ÉL mismo se REDUCE.<br />
        El agente reductor REDUCE al otro, pero ÉL mismo se OXIDA.<br /><br />

        Es como un "donador" y "receptor": el agente oxidante "roba"
        electrones (se reduce); el reductor "los regala" (se oxida).
      </Mnemotecnia>

      <Ejemplo titulo="En la reacción Cu + HNO₃">
        • Cu (s) → Cu²⁺: se oxidó. Por tanto Cu es AGENTE REDUCTOR.<br />
        • HNO₃ (N⁺⁵) → NO (N⁺²): se redujo. Por tanto HNO₃ es AGENTE OXIDANTE.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen</Titulo>

      <WorkedExample titulo="Q15 3op-2025 · combustión propano">
        ¿Cuántos moles de O₂ se requieren para quemar 2 moles de C₃H₈?<br /><br />

        C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O.<br />
        Por cada mol de propano: 5 moles de O₂.<br />
        Para 2 moles: 2 × 5 = <strong>10 moles de O₂</strong>.
      </WorkedExample>

      <WorkedExample titulo="Balancear: Al + H₂SO₄ → Al₂(SO₄)₃ + H₂">
        Paso 1: 2 Al + 3 H₂SO₄ → Al₂(SO₄)₃ + 3 H₂.<br />
        Verificar: Al 2=2, S 3=3, O 12=12, H 6=6 ✓<br /><br />

        Ecuación balanceada: <strong>2 Al + 3 H₂SO₄ → Al₂(SO₄)₃ + 3 H₂</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Balanceá: H₂ + O₂ → H₂O. Coef de H₂:",
      o: ["2", "1", "3", "4"],
      c: 0,
      ex: "2 H₂ + O₂ → 2 H₂O.",
    },
    {
      p: "En NaCl + AgNO₃ → NaNO₃ + AgCl, ¿qué tipo?",
      o: ["doble sustitución", "síntesis", "redox", "descomposición"],
      c: 0,
      ex: "Intercambio entre 2 sales = metátesis.",
    },
    {
      p: "En Zn → Zn²⁺ + 2e⁻, el Zn:",
      o: ["se oxida", "se reduce", "ni una", "es agente oxidante"],
      c: 0,
      ex: "Perdió electrones = oxidación. Es agente reductor.",
    },
    {
      p: "Combustión de C₂H₆: necesita ¿moles de O₂ por mol?",
      o: ["3.5", "2", "5", "7"],
      c: 0,
      ex: "C₂H₆ + 7/2 O₂ → 2 CO₂ + 3 H₂O. Por mol: 3.5 mol O₂. (Multiplicando todo por 2: 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O).",
    },
    {
      p: "Agente oxidante:",
      o: ["se reduce", "se oxida", "cambia color", "evapora"],
      c: 0,
      ex: "Oxida al otro reduciéndose él.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · cambiar fórmulas en lugar de coeficientes">
        Al balancear, NO podés cambiar los subíndices de las fórmulas (H₂O no
        se vuelve H₂O₂). Solo modificás los coeficientes al frente.
      </Misconception>

      <Misconception titulo="Error 2 · invertir agente oxidante/reductor">
        Agente OXIDANTE → se REDUCE (gana electrones). Agente REDUCTOR → se
        OXIDA (pierde electrones). Es contraintuitivo, prestá atención.
      </Misconception>

      <Misconception titulo="Error 3 · olvidar átomos de O en redox">
        En medio ácido, balanceá O con H₂O y H con H⁺. En medio básico, con
        OH⁻. No te olvides de balancear estos cuando uses ion-electrón.
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
