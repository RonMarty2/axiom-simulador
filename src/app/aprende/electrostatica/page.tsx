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
      unidad="FIS-06"
      tituloUnidad="Electrostática"
      escenas={[
        { titulo: "Carga eléctrica · conceptos básicos", componente: EscCarga },
        { titulo: "Ley de Coulomb", componente: EscCoulomb },
        { titulo: "Campo eléctrico", componente: EscCampo },
        { titulo: "Potencial eléctrico", componente: EscPotencial },
        { titulo: "Capacitores", componente: EscCapacitores },
        { titulo: "Combinación de capacitores", componente: EscCombCap },
        { titulo: "Problemas tipo examen", componente: EscProblemas },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscCarga() {
  return (
    <EscenaRica>
      <Titulo>Carga eléctrica</Titulo>

      <Hook>
        Electrostática aparece en preguntas sobre fuerzas entre cargas y
        capacitores en serie/paralelo en el examen FCyT. Las ecuaciones son
        análogas a las gravitatorias pero con signos.
      </Hook>

      <Definicion termino="Carga eléctrica (q)">
        Propiedad fundamental de algunas partículas que produce fuerzas
        eléctricas. Hay dos tipos: positiva (+) y negativa (−).<br /><br />
        Unidad SI: coulomb (C). La carga del electrón: e = 1.6 × 10⁻¹⁹ C.
      </Definicion>

      <Resumen>
        <strong>Principios básicos</strong>:<br />
        1. <strong>Conservación de la carga</strong>: la carga total no se
        crea ni se destruye, solo se transfiere.<br />
        2. <strong>Cuantización</strong>: toda carga es múltiplo de e.<br />
        3. <strong>Cargas iguales se REPELEN</strong>; cargas opuestas se
        ATRAEN.
      </Resumen>

      <Definicion termino="Conductores vs aislantes">
        • <strong>Conductores</strong>: los electrones se mueven libremente
        (metales).<br />
        • <strong>Aislantes</strong>: los electrones están fijos (plástico,
        vidrio).
      </Definicion>
    </EscenaRica>
  );
}

function EscCoulomb() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Ley de Coulomb</Titulo>

      <Resumen>
        Fuerza entre dos cargas puntuales q₁ y q₂ separadas una distancia r:<br />
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          F = k · |q₁ · q₂| / r²
        </span><br /><br />
        donde k = 9 × 10⁹ N·m²/C² (constante de Coulomb).
      </Resumen>

      <Resumen>
        <strong>Dirección</strong>: a lo largo de la línea que une las cargas.<br />
        <strong>Sentido</strong>: repulsiva si las cargas son del mismo signo,
        atractiva si son opuestas.
      </Resumen>

      <PorQue>
        Comparación con gravitación: ambas son leyes de fuerza con 1/r² (cuadrado
        inverso). Diferencias clave:<br />
        • Coulomb depende del signo de q (atractiva o repulsiva).<br />
        • Gravitación SIEMPRE es atractiva.<br />
        • k es enormemente mayor que G, por eso las fuerzas eléctricas dominan
        en escala atómica.
      </PorQue>

      <WorkedExample titulo="Fuerza entre cargas · F19 1op 2005">
        Tres cargas: q₁ = 8 μC, q₂ = 8 μC ubicadas como dos catetos y q = 2 μC
        en el vértice. Posiciones según la figura: q₁ y q₂ en (0, 2) y (0, -2),
        q en (1, 0). (k = 9 × 10⁹)<br /><br />

        Distancia de q a q₁: √(1+4) = √5 m. Idem para q₂.<br />
        F desde q₁: 9·10⁹ · 8·10⁻⁶ · 2·10⁻⁶ / 5 = 28.8 · 10⁻³ N.<br />
        Por simetría, las componentes verticales se cancelan; quedan las
        horizontales que se suman.<br /><br />

        Componente horizontal cada una: F · (1/√5) = 28.8·10⁻³/√5.<br />
        Total: 2 · 28.8·10⁻³/√5 ≈ <strong>25.7 · 10⁻³ N</strong>.<br /><br />

        (Resultado depende de la figura exacta del problema original).
      </WorkedExample>
    </EscenaRica>
  );
}

function EscCampo() {
  return (
    <EscenaRica>
      <Titulo>Campo eléctrico (E)</Titulo>

      <Definicion termino="Campo eléctrico">
        Región del espacio donde una carga experimenta una fuerza. Se define
        como la fuerza por unidad de carga de prueba:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          E⃗ = F⃗ / q
        </span><br /><br />
        Unidad: N/C (o V/m).
      </Definicion>

      <Resumen>
        <strong>Campo de una carga puntual</strong>:<br />
        E = k · |Q| / r² (apunta alejándose de Q si es positiva, acercándose si
        es negativa).
      </Resumen>

      <Resumen>
        <strong>Fuerza sobre una carga en un campo</strong>:<br />
        F⃗ = q · E⃗.<br /><br />
        Si q es positiva, F va en el sentido de E. Si q es negativa, F va al
        contrario.
      </Resumen>

      <Definicion termino="Líneas de campo">
        Visualización del campo eléctrico. Salen de cargas positivas, entran a
        las negativas. Donde las líneas están más juntas, el campo es más
        intenso.
      </Definicion>
    </EscenaRica>
  );
}

function EscPotencial() {
  return (
    <EscenaRica>
      <Titulo>Potencial eléctrico (V)</Titulo>

      <Definicion termino="Potencial eléctrico">
        Energía potencial eléctrica por unidad de carga.<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          V = U_eléctrica / q
        </span><br /><br />
        Unidad: volt (V) = J/C.
      </Definicion>

      <Resumen>
        <strong>Potencial de una carga puntual</strong>:<br />
        V = k · Q / r (no es vectorial; es escalar).
      </Resumen>

      <Definicion termino="Diferencia de potencial (ΔV)">
        Trabajo necesario para mover una carga unitaria de un punto a otro:<br />
        ΔV = V_b − V_a = W / q.
      </Definicion>

      <Mnemotecnia>
        Una batería de 9 V mantiene una diferencia de potencial de 9 V entre
        sus bornes. Esto significa que mover 1 C de un borne al otro requiere
        9 J de trabajo.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCapacitores() {
  return (
    <EscenaRica>
      <Titulo>Capacitores (condensadores)</Titulo>

      <Definicion termino="Capacitor">
        Dispositivo formado por dos placas conductoras separadas que almacena
        carga (y energía) cuando se conecta a una fuente.
      </Definicion>

      <Definicion termino="Capacitancia (C)">
        Razón entre la carga almacenada y la diferencia de potencial:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          C = Q / V
        </span><br /><br />
        Unidad: farad (F) = C/V. Como es enorme, se usan μF (10⁻⁶) y pF (10⁻¹²).
      </Definicion>

      <Resumen>
        <strong>Energía almacenada</strong>:<br />
        U = (1/2) C V² = (1/2) Q V = Q²/(2C).
      </Resumen>

      <PorQue>
        Los capacitores son fundamentales en electrónica: almacenan energía
        para liberarla rápido (flashes de cámaras), filtran señales,
        estabilizan voltajes.
      </PorQue>
    </EscenaRica>
  );
}

function EscCombCap() {
  return (
    <EscenaRica>
      <Titulo>Combinación de capacitores</Titulo>

      <Resumen>
        <strong>En PARALELO</strong> (mismo voltaje, cargas se suman):<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          C_eq = C₁ + C₂ + C₃ + ...
        </span><br /><br />
        Las capacitancias se SUMAN directamente.
      </Resumen>

      <Resumen>
        <strong>En SERIE</strong> (misma carga, voltajes se suman):<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          1/C_eq = 1/C₁ + 1/C₂ + 1/C₃ + ...
        </span><br /><br />
        Para 2 en serie: C_eq = C₁·C₂ / (C₁ + C₂).
      </Resumen>

      <WorkedExample titulo="F20 1op 2005 · combinación mixta">
        Tres capacitores idénticos de 10 μF. Dos en serie y esa combinación
        en paralelo con el tercero.<br /><br />

        <strong>Paso 1 · Los dos en serie:</strong><br />
        C_serie = 10·10/(10+10) = 5 μF.<br /><br />

        <strong>Paso 2 · Esa serie en paralelo con el tercero:</strong><br />
        C_eq = 5 + 10 = <strong>15 μF</strong>.
      </WorkedExample>

      <Mnemotecnia>
        Mnemotecnia para capacitores: <strong>"paralelo suma, serie suma
        inversas"</strong>. Es OPUESTO a las resistencias (donde serie suma
        directamente).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscProblemas() {
  return (
    <EscenaRica>
      <Titulo>Más problemas tipo examen</Titulo>

      <WorkedExample titulo="Carga en campo">
        Una carga q = 4 μC está en un campo eléctrico de 200 N/C. ¿Fuerza
        sobre la carga?<br /><br />

        F = qE = 4·10⁻⁶ · 200 = 8·10⁻⁴ N = 0.8 mN.
      </WorkedExample>

      <WorkedExample titulo="Capacitor cargado">
        Un capacitor de 2 μF se conecta a una batería de 12 V. ¿Carga
        almacenada? ¿Energía?<br /><br />

        Q = CV = 2·10⁻⁶ · 12 = 24·10⁻⁶ C = 24 μC.<br />
        U = (1/2)CV² = (1/2)·2·10⁻⁶·144 = 144·10⁻⁶ J = 144 μJ.
      </WorkedExample>

      <Conexion>
        En el examen también aparecen circuitos mixtos. Reducís paso a paso:
        identifica grupos en serie o paralelo, calculá la equivalente, y así
        hasta tener un capacitor único.
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Dos cargas de 2 C cada una a 1 m. Fuerza (k = 9·10⁹):",
      o: ["3.6·10¹⁰ N", "9·10⁹ N", "0", "1.8·10¹⁰ N"],
      c: 0,
      ex: "F = 9·10⁹·2·2/1 = 36·10⁹ = 3.6·10¹⁰ N.",
    },
    {
      p: "Si la distancia entre dos cargas se duplica, la fuerza:",
      o: ["se reduce 4 veces", "se reduce 2 veces", "duplica", "no cambia"],
      c: 0,
      ex: "F ∝ 1/r². Doblar r reduce F a 1/4.",
    },
    {
      p: "Dos capacitores 4 μF y 6 μF en paralelo. C_eq:",
      o: ["10 μF", "2.4 μF", "5 μF", "2 μF"],
      c: 0,
      ex: "Paralelo: suma directa = 10 μF.",
    },
    {
      p: "Dos capacitores 4 μF y 4 μF en serie:",
      o: ["2 μF", "8 μF", "4 μF", "16 μF"],
      c: 0,
      ex: "Serie: 4·4/(4+4) = 2 μF.",
    },
    {
      p: "Carga almacenada por un capacitor de 5 μF a 10 V:",
      o: ["50 μC", "5 μC", "10 μC", "0.5 μC"],
      c: 0,
      ex: "Q = CV = 5·10 = 50 μC.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · capacitores como resistencias">
        Para CAPACITORES: paralelo suma directo, serie inversas. Para
        RESISTENCIAS es al revés (serie suma directa). No confundir.
      </Misconception>

      <Misconception titulo="Error 2 · unidades en Coulomb">
        Las cargas suelen venir en μC (microcoulomb) = 10⁻⁶ C, no en C directo.
        Verificá unidades antes de aplicar la fórmula.
      </Misconception>

      <Misconception titulo="Error 3 · ignorar el signo en Coulomb">
        |q₁·q₂| da el módulo de la fuerza. Para saber si es atractiva o
        repulsiva, mirá los signos: iguales = repulsión, opuestos = atracción.
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
