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
      unidad="FIS-05"
      tituloUnidad="Trabajo y Energía"
      escenas={[
        { titulo: "Trabajo · concepto y fórmula", componente: EscTrabajo },
        { titulo: "Energía cinética", componente: EscCinetica },
        { titulo: "Teorema trabajo-energía", componente: EscTeorema },
        { titulo: "Energía potencial", componente: EscPotencial },
        { titulo: "Conservación de la energía mecánica", componente: EscConservacion },
        { titulo: "Energía elástica del resorte", componente: EscResorte },
        { titulo: "Potencia", componente: EscPotencia },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscTrabajo() {
  return (
    <EscenaRica>
      <Titulo>Trabajo · una fuerza que mueve un objeto</Titulo>

      <Hook>
        Trabajo y energía es la unidad 5 del programa oficial. En el examen
        aparece en problemas con bloques que caen, resortes que se comprimen,
        choques. Lo bueno: la conservación de la energía permite resolver
        problemas SIN tocar ecuaciones de movimiento.
      </Hook>

      <Definicion termino="Trabajo (W)">
        Cantidad de energía transferida por una fuerza al mover un cuerpo. <br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          W = F · d · cos θ
        </span><br /><br />
        donde θ es el ángulo entre la fuerza y el desplazamiento. Unidad: J = N·m.
      </Definicion>

      <Resumen>
        <strong>Casos especiales</strong>:<br />
        • Si F está en la misma dirección que el movimiento (θ = 0): W = F·d.
        Máximo trabajo.<br />
        • Si F es perpendicular al movimiento (θ = 90°): W = 0.<br />
        • Si F está en sentido OPUESTO al movimiento (θ = 180°): W = −F·d.
        Trabajo negativo (frena).
      </Resumen>

      <Ejemplo titulo="Trabajo positivo, negativo y nulo">
        • Empujar una caja en dirección del movimiento → W positivo.<br />
        • Llevar una caja horizontalmente: la gravedad NO hace trabajo (W = 0
        porque F es vertical y el movimiento horizontal).<br />
        • Fricción siempre hace trabajo NEGATIVO (se opone al movimiento).
      </Ejemplo>
    </EscenaRica>
  );
}

function EscCinetica() {
  return (
    <EscenaRica>
      <Titulo>Energía cinética · energía del movimiento</Titulo>

      <Definicion termino="Energía cinética (E_c)">
        Energía que tiene un cuerpo por estar en movimiento.<br />
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          E_c = (1/2) · m · v²
        </span><br /><br />
        Unidad: J. Es escalar (depende de v², no de la dirección).
      </Definicion>

      <Ejemplo titulo="Ejemplos">
        • Auto de 1000 kg a 20 m/s: E_c = (1/2)(1000)(400) = 200,000 J = 200 kJ.<br />
        • Bala de 10 g a 300 m/s: E_c = (1/2)(0.01)(90000) = 450 J.
      </Ejemplo>

      <Cuidado>
        E_c depende del cuadrado de la velocidad. Si la velocidad se duplica,
        la energía cinética se cuadruplica.
      </Cuidado>
    </EscenaRica>
  );
}

function EscTeorema() {
  return (
    <EscenaRica>
      <Titulo>Teorema trabajo-energía</Titulo>

      <Resumen>
        <strong>El trabajo neto sobre un cuerpo es igual a su cambio de
        energía cinética</strong>:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          W_neto = ΔE_c = E_c_final − E_c_inicial
        </span>
      </Resumen>

      <PorQue>
        Sale de combinar F = ma con las ecuaciones cinemáticas. Es una forma
        ALTERNATIVA de resolver problemas, sin necesidad de calcular
        aceleraciones explícitamente.
      </PorQue>

      <WorkedExample titulo="Frenado de auto por teorema">
        Un auto de 1000 kg a 20 m/s frena hasta detenerse. ¿Trabajo de la
        fuerza de frenado?<br /><br />

        W = ΔE_c = 0 − (1/2)(1000)(400) = <strong>−200,000 J</strong>.<br /><br />

        Negativo porque la fuerza de frenado se opuso al movimiento.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPotencial() {
  return (
    <EscenaRica>
      <Titulo>Energía potencial · gravitatoria</Titulo>

      <Definicion termino="Energía potencial gravitatoria (E_p)">
        Energía almacenada por un cuerpo debido a su posición en el campo
        gravitatorio.<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          E_p = m · g · h
        </span><br /><br />
        donde h es la altura medida desde una referencia (por convención, el
        suelo o el punto más bajo del problema).
      </Definicion>

      <Resumen>
        <strong>Propiedades clave</strong>:<br />
        • La E_p depende del marco de referencia (la "altura cero" la elegís
        tú).<br />
        • Lo que importa es el CAMBIO de energía potencial entre dos puntos.<br />
        • A mayor altura, mayor E_p.
      </Resumen>

      <Ejemplo titulo="Ejemplos">
        Persona de 70 kg en piso 5 (altura 15 m): E_p = 70·9.8·15 = 10,290 J
        respecto al suelo.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscConservacion() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Conservación de la energía mecánica</Titulo>

      <Resumen>
        <strong>Energía mecánica</strong>: suma de cinética + potencial.<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          E_m = E_c + E_p
        </span>
      </Resumen>

      <Resumen>
        <strong>Principio de conservación</strong>: si NO hay fuerzas
        disipativas (fricción, resistencia del aire), la energía mecánica se
        conserva:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          E_m_inicial = E_m_final
        </span><br /><br />
        Si HAY fricción: E_m_inicial = E_m_final + W_fricción (energía
        disipada).
      </Resumen>

      <WorkedExample titulo="Caída libre desde altura">
        Una pelota de 2 kg se deja caer desde 20 m. ¿Velocidad al impactar?<br /><br />

        Por conservación:<br />
        E_p_inicial = E_c_final<br />
        m·g·h = (1/2)·m·v²<br />
        v = √(2·g·h) = √(2·9.8·20) = √392 ≈ <strong>19.8 m/s</strong>.<br /><br />

        Nota: la masa NO aparece. Cualquier objeto (sin fricción del aire) cae
        a la misma velocidad desde la misma altura.
      </WorkedExample>

      <Mnemotecnia>
        Si el problema tiene "altura inicial → velocidad final" o viceversa, y
        no hay fricción, USÁ CONSERVACIÓN DE ENERGÍA. Mucho más simple que
        Newton.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscResorte() {
  return (
    <EscenaRica>
      <Titulo>Energía elástica · resortes</Titulo>

      <Definicion termino="Energía potencial elástica (E_e)">
        Energía almacenada en un resorte deformado:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          E_e = (1/2) · k · x²
        </span><br /><br />
        donde k es la constante elástica del resorte y x la deformación
        (compresión o estiramiento desde la posición de equilibrio).
      </Definicion>

      <Resumen>
        <strong>Ley de Hooke</strong>: la fuerza del resorte es proporcional
        a la deformación.<br />
        F = −k·x (negativo porque la fuerza se opone a la deformación).
      </Resumen>

      <WorkedExample titulo="Bloque-resorte · F15 1op-2-2025">
        Bloque de 2 kg empuja resorte k = 400 N/m, comprime 0.220 m. Al
        liberarlo, sube por plano inclinado 37° sin fricción. ¿Altura
        alcanzada?<br /><br />

        Energía elástica → Energía potencial:<br />
        (1/2)k·x² = m·g·h<br />
        h = k·x²/(2·m·g) = 400·(0.220)²/(2·2·9.8) = 19.36/39.2 =
        <strong> 0.494 m</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPotencia() {
  return (
    <EscenaRica>
      <Titulo>Potencia · rapidez de hacer trabajo</Titulo>

      <Definicion termino="Potencia (P)">
        Trabajo realizado por unidad de tiempo:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          P = W / t = F · v (a velocidad constante)
        </span><br /><br />
        Unidad SI: watt (W) = J/s. También se usa el caballo de fuerza:
        1 hp = 746 W.
      </Definicion>

      <Ejemplo titulo="Comparación">
        Dos personas suben la misma escalera. Una tarda 10 s, la otra 20 s.
        Ambas hacen el mismo trabajo (cambio de E_p), pero la primera tiene
        DOBLE potencia.
      </Ejemplo>

      <WorkedExample titulo="Elevador con motor">
        Elevador de 600 kg sube 20 m en 16 s. Potencia mínima:<br /><br />

        W = m·g·h = 600·9.8·20 = 117,600 J.<br />
        P = W/t = 117,600/16 = 7350 W = 7.35 kW ≈ 9.85 hp.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Trabajo de fuerza 50 N que mueve un objeto 3 m en su dirección:",
      o: ["150 J", "53 J", "47 J", "0 J"],
      c: 0,
      ex: "W = F·d·cos 0° = 50·3 = 150 J.",
    },
    {
      p: "Energía cinética de 5 kg a 4 m/s:",
      o: ["40 J", "20 J", "10 J", "80 J"],
      c: 0,
      ex: "E_c = (1/2)(5)(16) = 40 J.",
    },
    {
      p: "Una pelota cae sin fricción desde 5 m. Velocidad al suelo (g=10):",
      o: ["10 m/s", "5 m/s", "100 m/s", "1 m/s"],
      c: 0,
      ex: "v = √(2gh) = √100 = 10 m/s.",
    },
    {
      p: "Resorte k=200, compresión 0.1 m. Energía:",
      o: ["1 J", "2 J", "20 J", "10 J"],
      c: 0,
      ex: "(1/2)(200)(0.01) = 1 J.",
    },
    {
      p: "Si un cuerpo dobla su velocidad, su energía cinética:",
      o: ["cuadruplica", "duplica", "queda igual", "se reduce a la mitad"],
      c: 0,
      ex: "E_c ∝ v². Doblar v cuadruplica E_c.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · trabajo en perpendicular">
        Si una fuerza es perpendicular al movimiento, NO hace trabajo. Llevar
        un libro al andar (peso vertical, movimiento horizontal) → W=0.
      </Misconception>

      <Misconception titulo="Error 2 · energía cinética es lineal en v">
        FALSO. Es cuadrática (v²). Por eso un auto al doble de velocidad tiene
        4 veces más energía y necesita 4 veces más distancia para frenar.
      </Misconception>

      <Misconception titulo="Error 3 · energía potencial absoluta">
        E_p depende de DÓNDE pongas la referencia. Lo que importa es el cambio
        ΔE_p, no el valor absoluto.
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
