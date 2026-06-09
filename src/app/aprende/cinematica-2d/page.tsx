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
      unidad="FIS-03"
      tituloUnidad="Cinemática en dos dimensiones"
      escenas={[
        { titulo: "Movimiento en 2D · independencia de ejes", componente: EscIntro },
        { titulo: "Tiro parabólico · ecuaciones", componente: EscParabolico },
        { titulo: "Alcance, altura máxima, tiempo de vuelo", componente: EscFormulas },
        { titulo: "Problemas tipo de tiro parabólico", componente: EscProblemas },
        { titulo: "Movimiento circular uniforme", componente: EscMCU },
        { titulo: "Movimiento circular acelerado", componente: EscMCA },
        { titulo: "Aplicaciones de movimiento circular", componente: EscAplicCirc },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Cinemática 2D · descompongo en X e Y</Titulo>

      <Hook>
        Cinemática 2D aparece MUCHO en el examen FCyT (5 preguntas observadas
        en facsímiles). Tiro parabólico es el rey de las preguntas. Movimiento
        circular es el segundo.
      </Hook>

      <Resumen>
        <strong>Principio clave</strong>: en 2D, el movimiento en X y en Y son
        INDEPENDIENTES. Cada eje sigue sus propias ecuaciones cinemáticas. El
        tiempo es el ÚNICO elemento común.
      </Resumen>

      <PorQue>
        Esto se llama "principio de superposición". Una pelota lanzada
        horizontalmente cae igual que una soltada desde reposo, solo que
        además se mueve horizontalmente. El movimiento vertical NO afecta al
        horizontal y viceversa.
      </PorQue>
    </EscenaRica>
  );
}

function EscParabolico() {
  return (
    <EscenaRica>
      <Titulo>Tiro parabólico</Titulo>

      <Definicion termino="Tiro parabólico">
        Movimiento de un proyectil lanzado con velocidad inicial que forma un
        ángulo con la horizontal, bajo la acción de la gravedad. La trayectoria
        es una parábola.
      </Definicion>

      <Resumen>
        <strong>Si v₀ es la velocidad inicial y θ el ángulo con la
        horizontal</strong>:<br />
        — Componente horizontal: v_x = v₀ · cos θ (constante).<br />
        — Componente vertical: v_y = v₀ · sen θ (varía con el tiempo).
      </Resumen>

      <Resumen>
        <strong>Ecuaciones del movimiento</strong>:<br />
        — Horizontal (MRU): x = v₀ cos θ · t.<br />
        — Vertical (MRUA con −g): y = v₀ sen θ · t − (1/2) g t².<br />
        — Velocidad vertical: v_y = v₀ sen θ − g·t.
      </Resumen>

      <Mnemotecnia>
        <strong>Estrategia general</strong>: descompongo en X e Y, resuelvo
        cada eje por separado usando las ecuaciones de cinemática 1D. El
        TIEMPO es el "pegamento" que conecta ambos.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscFormulas() {
  return (
    <EscenaRica>
      <Titulo>Fórmulas útiles · alcance, altura máx, tiempo</Titulo>

      <Resumen>
        <strong>Para lanzamiento desde el suelo y aterrizaje al suelo
        (misma altura)</strong>:<br /><br />
        — <strong>Tiempo de vuelo total</strong>: T = 2·v₀·sen θ / g.<br />
        — <strong>Alcance horizontal máximo (en θ=45°)</strong>: R = v₀² / g.<br />
        — <strong>Alcance general</strong>: R = v₀² · sen(2θ) / g.<br />
        — <strong>Altura máxima</strong>: H = v₀² · sen²θ / (2g).<br />
        — <strong>Tiempo a altura máxima</strong>: t_h = v₀·sen θ / g (mitad
        del tiempo total).
      </Resumen>

      <PorQue>
        <strong>¿Por qué 45° da el alcance máximo?</strong> R = v₀²·sen(2θ)/g.
        El máximo de sen(2θ) es 1, que ocurre cuando 2θ = 90°, o sea θ = 45°.
        Cualquier otro ángulo da menos alcance.
      </PorQue>

      <Mnemotecnia>
        <strong>Simetría del tiro parabólico</strong>: el tiempo de subida
        hasta la altura máxima es IGUAL al tiempo de bajada. Por eso el tiempo
        total es 2 veces el tiempo a altura máxima. Y la velocidad al
        aterrizar tiene el mismo módulo que la inicial (en el suelo).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo del examen</Titulo>

      <WorkedExample titulo="Bombero con manguera · F12 1op-2-2025">
        Bombero lanza agua a 20 m/s a 45° desde el suelo. El edificio está a
        25 m. ¿A qué altura impacta el agua? (g = 9.8)<br /><br />

        v_x = v_y = 20·cos 45° = 14.14 m/s.<br />
        Tiempo para llegar a 25 m: t = 25/14.14 = 1.768 s.<br />
        Altura: y = 14.14(1.768) − 4.9(1.768)² = 25 − 15.32 =
        <strong> 9.68 m</strong>.
      </WorkedExample>

      <WorkedExample titulo="Cañón sobre puente con blanco móvil · F13 1op-2-2025">
        Cañón en un puente de 125 m de altura dispara horizontalmente a
        200 m/s. Un tanque se aleja a 30 m/s a distancia d. ¿Distancia d para
        impacto? (g = 10)<br /><br />

        Tiempo de caída de 125 m: t = √(2·125/10) = 5 s.<br />
        En 5 s el proyectil recorre 200·5 = 1000 m horizontal.<br />
        En 5 s el tanque se aleja 30·5 = 150 m. Posición final: d + 150.<br />
        Igualar: d + 150 = 1000 → d = <strong>850 m</strong>.
      </WorkedExample>

      <WorkedExample titulo="Manguera al contenedor · F12 2op-2-2025">
        Manguera a 45° desde el suelo debe llenar un contenedor de altura
        2D (D=1m) a distancia 6D. ¿Velocidad mínima v₀? (g=9.8)<br /><br />

        Para velocidad mínima, el agua roza el borde superior (x=6, y=2):<br />
        v_x = v_y = v₀/√2. Tiempo: t = 6√2/v₀.<br />
        2 = 6 − (1/2)(9.8)(72/v₀²)<br />
        4 = 352.8/v₀² → v₀² = 88.2 → v₀ ≈ <strong>9.39 m/s</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscMCU() {
  return (
    <EscenaRica>
      <Titulo>Movimiento Circular Uniforme (MCU)</Titulo>

      <Definicion termino="MCU">
        Movimiento en una trayectoria circular con rapidez constante. La
        velocidad cambia de DIRECCIÓN pero no de módulo.
      </Definicion>

      <Resumen>
        <strong>Magnitudes</strong>:<br />
        — <strong>Periodo (T)</strong>: tiempo en dar una vuelta. Unidad: s.<br />
        — <strong>Frecuencia (f)</strong>: número de vueltas por segundo.
        f = 1/T. Unidad: Hz.<br />
        — <strong>Velocidad angular (ω)</strong>: ángulo barrido por unidad de
        tiempo. ω = 2π/T = 2πf. Unidad: rad/s.<br />
        — <strong>Velocidad tangencial (v)</strong>: rapidez lineal sobre la
        circunferencia. v = ω·R = 2πR/T.
      </Resumen>

      <Resumen>
        <strong>Aceleración centrípeta</strong>: en MCU, aunque la rapidez es
        constante, hay aceleración (cambia la dirección). Apunta al centro.<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          a_c = v² / R = ω² · R
        </span>
      </Resumen>

      <WorkedExample titulo="MCU típico">
        Un disco gira a 60 rpm (revoluciones por minuto). Si tiene radio 0.5 m:<br /><br />

        f = 60/60 = 1 Hz. T = 1 s. ω = 2π rad/s.<br />
        v = ω·R = 2π·0.5 = π m/s ≈ 3.14 m/s.<br />
        a_c = v²/R = π²/0.5 ≈ 19.7 m/s².
      </WorkedExample>
    </EscenaRica>
  );
}

function EscMCA() {
  return (
    <EscenaRica>
      <Titulo>Movimiento Circular Acelerado</Titulo>

      <Definicion termino="Movimiento circular acelerado">
        La velocidad angular ω varía con el tiempo. La aceleración angular α
        es constante (en el caso uniformemente acelerado).
      </Definicion>

      <Resumen>
        <strong>Ecuaciones análogas a MRUA (sustituyendo x→θ, v→ω, a→α)</strong>:<br />
        — ω = ω₀ + α·t.<br />
        — θ = θ₀ + ω₀·t + (1/2)·α·t².<br />
        — ω² = ω₀² + 2·α·(θ − θ₀).
      </Resumen>

      <WorkedExample titulo="Ventilador frenando · F11 3op-2-2025">
        Ventilador con velocidad inicial 100π rad/s, desaceleración 20π rad/s².
        ¿Cuántas vueltas hasta detenerse?<br /><br />

        Usando ω² = ω₀² − 2·α·θ:<br />
        0 = (100π)² − 2(20π)θ → θ = 10000π²/(40π) = 250π rad.<br />
        Vueltas = θ/(2π) = 250π/(2π) = <strong>125 vueltas</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscAplicCirc() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones</Titulo>

      <Ejemplo titulo="Auto en curva">
        Un auto a 20 m/s en una curva de radio 50 m. Aceleración centrípeta:
        a_c = 20²/50 = 8 m/s². Esta aceleración debe ser provista por la
        fricción de las ruedas.
      </Ejemplo>

      <Ejemplo titulo="Satélite en órbita">
        Un satélite a 7000 km del centro de la Tierra con velocidad 7.5 km/s.
        Periodo: T = 2πR/v = 2π(7000)/7.5 ≈ 5870 s ≈ 1.6 h.
      </Ejemplo>

      <Conexion>
        El movimiento circular conecta con la <strong>dinámica</strong>: la
        aceleración centrípeta debe estar producida por una fuerza centrípeta
        (gravedad para satélites, tensión para cuerda, fricción para autos en
        curva).
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Alcance máximo de un tiro parabólico con v₀=20 m/s en θ=45° (g=10):",
      o: ["40 m", "20 m", "80 m", "60 m"],
      c: 0,
      ex: "R = v₀²/g = 400/10 = 40 m.",
    },
    {
      p: "Altura máxima con v₀=20 m/s, θ=90° (vertical):",
      o: ["20 m", "10 m", "40 m", "200 m"],
      c: 0,
      ex: "H = v₀²·sen²90°/(2g) = 400·1/20 = 20 m.",
    },
    {
      p: "Disco gira a 2 vueltas/s. ω en rad/s:",
      o: ["4π", "2π", "π", "8π"],
      c: 0,
      ex: "ω = 2πf = 2π·2 = 4π rad/s.",
    },
    {
      p: "MCU radio 2 m, ω=3 rad/s. Velocidad tangencial:",
      o: ["6 m/s", "3 m/s", "1.5 m/s", "2 m/s"],
      c: 0,
      ex: "v = ω·R = 3·2 = 6 m/s.",
    },
    {
      p: "Aceleración centrípeta del problema anterior:",
      o: ["18 m/s²", "12 m/s²", "6 m/s²", "9 m/s²"],
      c: 0,
      ex: "a_c = ω²R = 9·2 = 18 m/s².",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · gravedad afecta el movimiento horizontal">
        FALSO. En tiro parabólico, la gravedad afecta SOLO el movimiento
        vertical. El horizontal es MRU (velocidad constante v₀·cos θ).
      </Misconception>

      <Misconception titulo="Error 2 · ángulo de lanzamiento óptimo NO siempre es 45°">
        45° da alcance máximo SOLO cuando lanzás desde y aterrizas a la misma
        altura. Desde altura mayor, el ángulo óptimo es MENOR a 45°.
      </Misconception>

      <Misconception titulo="Error 3 · MCU no tiene aceleración">
        FALSO. Aunque la rapidez es constante, hay aceleración centrípeta
        porque la DIRECCIÓN de la velocidad cambia.
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
