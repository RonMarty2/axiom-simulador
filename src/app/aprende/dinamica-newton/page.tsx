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
      unidad="FIS-04"
      tituloUnidad="Dinámica · Leyes de Newton"
      escenas={[
        { titulo: "Fuerza · concepto", componente: EscFuerza },
        { titulo: "Primera ley · inercia", componente: EscPrimera },
        { titulo: "Segunda ley · F = ma", componente: EscSegunda },
        { titulo: "Tercera ley · acción-reacción", componente: EscTercera },
        { titulo: "Peso vs masa", componente: EscPeso },
        { titulo: "Fuerza de fricción", componente: EscFriccion },
        { titulo: "Plano inclinado", componente: EscPlano },
        { titulo: "Problemas tipo examen", componente: EscProblemas },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscFuerza() {
  return (
    <EscenaRica>
      <Titulo>Fuerza · qué es</Titulo>

      <Hook>
        Las leyes de Newton son el "sistema operativo" de la mecánica clásica.
        Casi toda la física del examen FCyT depende de ellas: fricción, planos
        inclinados, sistemas con poleas, choques.
      </Hook>

      <Definicion termino="Fuerza (F)">
        Interacción que produce cambios en el movimiento (aceleración) o
        deformación de un cuerpo. Es VECTORIAL. Unidad SI: newton (N) = kg·m/s².
      </Definicion>

      <Resumen>
        <strong>Tipos comunes de fuerzas</strong>:<br />
        — <strong>Peso</strong>: la fuerza con la que la Tierra atrae al cuerpo.<br />
        — <strong>Normal</strong>: la superficie ejerce perpendicular al cuerpo.<br />
        — <strong>Tensión</strong>: en cuerdas.<br />
        — <strong>Fricción</strong>: opuesta al movimiento.<br />
        — <strong>Elástica</strong>: en resortes (Hooke).
      </Resumen>
    </EscenaRica>
  );
}

function EscPrimera() {
  return (
    <EscenaRica>
      <Titulo>1ª Ley · Principio de inercia</Titulo>

      <Definicion termino="Primera Ley de Newton">
        Todo cuerpo permanece en reposo o en movimiento rectilíneo uniforme
        (MRU) si NO actúa sobre él una fuerza neta (o si las fuerzas se
        equilibran).
      </Definicion>

      <Resumen>
        <strong>Equilibrio</strong>: cuando la fuerza neta es cero. Hay dos
        casos:<br />
        — Equilibrio estático: cuerpo en reposo.<br />
        — Equilibrio dinámico: cuerpo en MRU.
      </Resumen>

      <Mnemotecnia>
        La "inercia" es la tendencia natural de los cuerpos a NO cambiar su
        estado de movimiento. Por eso un auto que frena de golpe te lanza
        hacia adelante: vos seguís con MRU mientras el auto frena.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSegunda() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>2ª Ley · F = m·a</Titulo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          F⃗_neta = m · a⃗
        </span><br /><br />
        La fuerza neta produce una aceleración proporcional a su magnitud e
        inversamente proporcional a la masa. La aceleración tiene la misma
        DIRECCIÓN que la fuerza neta.
      </Resumen>

      <PorQue>
        Esta ley conecta DINÁMICA (fuerzas) con CINEMÁTICA (aceleraciones).
        Si conocés las fuerzas, podés predecir el movimiento. Si conocés el
        movimiento, podés deducir las fuerzas.
      </PorQue>

      <WorkedExample titulo="Aplicación simple">
        Una fuerza de 50 N actúa sobre un bloque de 10 kg. ¿Aceleración?<br />
        a = F/m = 50/10 = 5 m/s².
      </WorkedExample>
    </EscenaRica>
  );
}

function EscTercera() {
  return (
    <EscenaRica>
      <Titulo>3ª Ley · Acción y reacción</Titulo>

      <Definicion termino="Tercera Ley">
        Por cada fuerza (acción) que un cuerpo A ejerce sobre B, B ejerce sobre
        A una fuerza igual en módulo y de sentido opuesto (reacción).
      </Definicion>

      <Cuidado>
        Las fuerzas de acción y reacción actúan sobre cuerpos DISTINTOS. Por
        eso NO se anulan entre sí (no son fuerzas equilibrantes).
      </Cuidado>

      <Ejemplo titulo="Ejemplos">
        — Caminás: empujás el piso hacia atrás, el piso te empuja hacia
        adelante.<br />
        — Cohete: expulsa gas hacia abajo, el gas lo empuja hacia arriba.<br />
        — Saltás: empujás el piso, el piso te empuja a vos.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscPeso() {
  return (
    <EscenaRica>
      <Titulo>Peso vs masa · NO son lo mismo</Titulo>

      <Definicion termino="Masa (m)">
        Cantidad de materia. Es invariante (no depende de dónde estés). Unidad: kg.
      </Definicion>

      <Definicion termino="Peso (P)">
        Fuerza con que la Tierra (o cualquier planeta) atrae al cuerpo.
        Depende de la gravedad local. Unidad: N.<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          P = m · g
        </span>
      </Definicion>

      <Mnemotecnia>
        Tu masa es la misma en la Tierra que en la Luna (60 kg en ambos sitios).
        Pero tu peso es 6 veces mayor en la Tierra (g_T = 9.8 vs g_L ≈ 1.6).
      </Mnemotecnia>

      <Ejemplo titulo="Cálculo de peso">
        Persona de 70 kg en la Tierra: P = 70 · 9.8 = 686 N.<br />
        Misma persona en la Luna: P = 70 · 1.6 ≈ 112 N.<br />
        Su masa: 70 kg en ambos lugares.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscFriccion() {
  return (
    <EscenaRica>
      <Titulo>Fuerza de fricción (rozamiento)</Titulo>

      <Definicion termino="Fricción">
        Fuerza que se opone al movimiento relativo entre dos superficies en
        contacto. Hay dos tipos: estática (cuando no hay movimiento) y
        cinética (cuando hay movimiento).
      </Definicion>

      <Resumen>
        <strong>Fórmulas</strong>:<br />
        — <strong>Fricción cinética</strong>: f_k = μ_k · N (donde N es la
        normal).<br />
        — <strong>Fricción estática máxima</strong>: f_s_max = μ_s · N.<br /><br />
        Generalmente μ_s &gt; μ_k (cuesta más empezar a mover que mantener el
        movimiento).
      </Resumen>

      <WorkedExample titulo="Frenado de auto · F14 1op-2-2025">
        μ_k = 0.80, v₀ = 28.7 m/s. ¿Distancia para detenerse? (g = 9.8)<br /><br />

        Desaceleración: a = μ_k · g = 0.80 · 9.8 = 7.84 m/s².<br />
        Distancia: d = v₀²/(2a) = (28.7)²/15.68 = <strong>52.53 m</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPlano() {
  return (
    <EscenaRica>
      <Titulo>Plano inclinado</Titulo>

      <Parrafo>
        Sobre un plano inclinado un ángulo θ, el peso se descompone en:<br />
        — Componente paralela al plano (que tiende a deslizar el cuerpo hacia
        abajo): P_x = m·g·sen θ.<br />
        — Componente perpendicular al plano (presiona la superficie):
        P_y = m·g·cos θ.
      </Parrafo>

      <Resumen>
        <strong>Si no hay fricción</strong>:<br />
        Aceleración del cuerpo bajando: a = g·sen θ.<br /><br />
        <strong>Si hay fricción</strong> con coeficiente μ_k:<br />
        Normal: N = m·g·cos θ.<br />
        Fricción: f = μ_k · m·g·cos θ (opuesta al movimiento).<br />
        Aceleración bajando: a = g·(sen θ − μ_k · cos θ).
      </Resumen>

      <WorkedExample titulo="Cuándo está a punto de deslizar">
        Si el cuerpo está en reposo y aumentás el ángulo hasta que JUSTO
        empieza a deslizar, tenés:<br />
        μ_s = tan θ_crítico.<br /><br />
        Por eso el ángulo límite es atan(μ_s).
      </WorkedExample>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen</Titulo>

      <WorkedExample titulo="Bloque con resorte y fricción · F12 3op-2025">
        Bloque de 10 kg cae desde 3 m, fricción solo entre B y C (6 m), choca
        resorte k=100 N/m, lo comprime √2 m. ¿μ_k entre B y C? (g=10)<br /><br />

        Energía inicial: E_A = mgh = 10·10·3 = 300 J.<br />
        Energía elástica: E_r = (1/2)k·x² = (1/2)(100)(2) = 100 J.<br />
        Energía disipada por fricción: 300 − 100 = 200 J.<br />
        W_fricción = f · d = (μ·m·g) · 6 = 600μ = 200 → μ = <strong>1/3</strong>.
      </WorkedExample>

      <WorkedExample titulo="Elevador con motor · F15 2op-2-2025">
        Elevador 600 kg sube 20 m en 16 s con motor 40 hp. ¿Pasajeros máx?
        (65 kg c/u, g=9.8, 1 hp=746 W)<br /><br />

        Velocidad: v = 20/16 = 1.25 m/s.<br />
        Potencia disponible: P = 40·746 = 29840 W.<br />
        Fuerza max = P/v = 23872 N.<br />
        F = (600 + 65n)·g → 23872 = 9.8(600+65n) → 600+65n = 2436<br />
        65n = 1836 → n = <strong>28 pasajeros</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Fuerza neta para que 5 kg acelere a 3 m/s²:",
      o: ["15 N", "1.67 N", "8 N", "0 N"],
      c: 0,
      ex: "F = ma = 5·3 = 15 N.",
    },
    {
      p: "Peso de 10 kg en la Tierra (g=9.8):",
      o: ["98 N", "10 N", "9.8 N", "100 kg"],
      c: 0,
      ex: "P = mg = 10·9.8 = 98 N.",
    },
    {
      p: "Si μ=0.4 y N=50 N, fricción cinética:",
      o: ["20 N", "50 N", "0.4 N", "125 N"],
      c: 0,
      ex: "f = μN = 0.4·50 = 20 N.",
    },
    {
      p: "Bloque en plano sin fricción de 30°. Aceleración bajando (g=10):",
      o: ["5 m/s²", "10 m/s²", "8.66 m/s²", "2.5 m/s²"],
      c: 0,
      ex: "a = g sen θ = 10·0.5 = 5 m/s².",
    },
    {
      p: "Acción y reacción están sobre:",
      o: ["cuerpos distintos", "mismo cuerpo", "se anulan", "el mismo"],
      c: 0,
      ex: "Por eso no se equilibran ni se cancelan.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · confundir peso con masa">
        Masa = kg (cantidad de materia, invariante).<br />
        Peso = N (fuerza, depende de g).<br />
        Una balanza mide peso pero te dice "kg" aproximando con g local.
      </Misconception>

      <Misconception titulo="Error 2 · acción y reacción cancelan">
        FALSO. Actúan sobre cuerpos DISTINTOS, no se cancelan entre sí. Lo que
        cancela el movimiento es que sobre UN cuerpo haya fuerzas balanceadas.
      </Misconception>

      <Misconception titulo="Error 3 · normal = peso siempre">
        FALSO. En plano inclinado, N = mg·cos θ &lt; mg. En un elevador
        acelerando hacia arriba, N &gt; mg. Solo en piso horizontal sin
        aceleración vertical, N = mg.
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
