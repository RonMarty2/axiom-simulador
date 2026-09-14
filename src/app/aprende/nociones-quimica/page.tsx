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

// Pseudo-aleatorio determinístico a partir de una semilla: da el mismo valor
// en el servidor y en el cliente, que es lo que Math.random() no puede
// garantizar. Sirve para "desordenar" posiciones sin romper la hidratación.
function ruido(semilla: number) {
  const x = Math.sin(semilla * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function Page() {
  return (
    <LeccionShell
      unidad="QUI-01"
      tituloUnidad="Nociones fundamentales · Química"
      escenas={[
        { titulo: "¿Qué es la química? clasificación de la materia", componente: EscIntro },
        { titulo: "Estados de la materia · simulador", componente: EscEstadosSim },
        { titulo: "Propiedades físicas vs químicas", componente: EscPropiedades },
        { titulo: "Análisis dimensional · cambio de unidades", componente: EscDimensional },
        { titulo: "Notación científica", componente: EscNotacion },
        { titulo: "Temperatura · escalas y conversión", componente: EscTemp },
        { titulo: "Densidad y gravedad específica", componente: EscDensidad },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Química · la ciencia de la materia</Titulo>

      <Hook>
        La Química tiene 10 unidades en el programa oficial UMSS FCyT: es la
        materia MÁS EXTENSA del examen junto con Física. El texto guía oficial
        es Chang & Overby (13ª ed). Empezamos por las bases: qué es la materia
        y cómo medirla.
      </Hook>

      <Definicion termino="Materia">
        Todo lo que tiene masa y ocupa volumen. Desde una piedra hasta el aire
        que respirás.
      </Definicion>

      <Resumen>
        <strong>Clasificación de la materia</strong>:<br /><br />

        <strong>Sustancias puras</strong> (composición fija):<br />
        • <strong>Elementos</strong>: una sola clase de átomo (Fe, O₂, Au).<br />
        • <strong>Compuestos</strong>: dos o más elementos combinados
        químicamente (H₂O, NaCl, C₆H₁₂O₆).<br /><br />

        <strong>Mezclas</strong> (composición variable):<br />
        • <strong>Homogéneas</strong> (soluciones): una sola fase visible
        (agua salada, aire).<br />
        • <strong>Heterogéneas</strong>: fases distinguibles (agua + aceite,
        ensalada).
      </Resumen>

      <Mnemotecnia>
        <strong>Test rápido</strong>: ¿puedes separar los componentes por
        métodos físicos (filtración, destilación, decantación)?<br />
        • Si SÍ → es una mezcla.<br />
        • Si NO → es una sustancia pura (necesitarías una reacción química).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEstadosSim() {
  const [estado, setEstado] = useState<"solido" | "liquido" | "gas">("solido");
  const estados = {
    solido: {
      nombre: "Sólido",
      color: "#3b82f6",
      desc: "Forma y volumen FIJOS. Partículas muy juntas, vibran sin desplazarse.",
      ejemplo: "Hielo, hierro, sal",
    },
    liquido: {
      nombre: "Líquido",
      color: "#10b981",
      desc: "Volumen FIJO, forma del recipiente. Partículas cercanas pero pueden deslizar.",
      ejemplo: "Agua, mercurio, aceite",
    },
    gas: {
      nombre: "Gas",
      color: "#f59e0b",
      desc: "Sin forma ni volumen fijos. Partículas muy separadas, movimiento libre.",
      ejemplo: "Aire, vapor de agua, oxígeno",
    },
  };
  const e = estados[estado];

  // Partículas para cada estado.
  //
  // Acá había Math.random() llamado durante el render, y traía dos problemas:
  // el servidor dibujaba una posición y el cliente otra al hidratar (mismatch,
  // React vuelve a renderizar y avisa por consola), y además se recalculaba en
  // cada re-render, así que las partículas se recolocaban solas cada vez que
  // tocabas un botón. Con un pseudo-aleatorio sembrado el desorden se ve igual
  // pero es el mismo en los dos lados y estable entre renders.
  const particulas = useMemo(() => ({
    solido: Array.from({ length: 25 }, (_, i) => ({
      x: 100 + (i % 5) * 40,
      y: 60 + Math.floor(i / 5) * 30,
      mov: 1,
    })),
    liquido: Array.from({ length: 25 }, (_, i) => ({
      x: 100 + (i % 5) * 38 + ruido(i + 1) * 12,
      y: 60 + Math.floor(i / 5) * 28 + ruido(i + 101) * 10,
      mov: 8,
    })),
    gas: Array.from({ length: 18 }, (_, i) => ({
      x: 80 + ruido(i + 201) * 240,
      y: 40 + ruido(i + 301) * 140,
      mov: 30,
    })),
  }), []);

  return (
    <EscenaRica>
      <Titulo>Estados de la materia · simulador</Titulo>

      <Parrafo>
        Toca los botones para ver cómo se organizan las partículas en cada estado.
      </Parrafo>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Recipiente */}
          <line x1="60" y1="20" x2="60" y2="200" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="340" y1="20" x2="340" y2="200" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="60" y1="200" x2="340" y2="200" stroke={LIENZO.fg} strokeWidth="2" />
          {/* Partículas */}
          {particulas[estado].map((p, i) => (
            <motion.circle key={i} r="6"
              fill={e.color}
              animate={{
                cx: [p.x, p.x + (ruido(i + 401) - 0.5) * p.mov, p.x],
                cy: [p.y, p.y + (ruido(i + 501) - 0.5) * p.mov, p.y],
              }}
              transition={{
                duration: estado === "gas" ? 0.5 : estado === "liquido" ? 1 : 0.3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </Pizarra>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, margin: "12px 0" }}>
        {(Object.keys(estados) as Array<keyof typeof estados>).map((k) => (
          <button key={k} onClick={() => setEstado(k)}
            style={{
              padding: "8px 18px", fontSize: 14, borderRadius: 999, cursor: "pointer",
              fontWeight: 700, fontFamily: "var(--font-crimson), serif",
              background: estado === k ? estados[k].color : "transparent",
              color: estado === k ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${estado === k ? estados[k].color : LIENZO.fgFaint}`,
            }}>
            {estados[k].nombre}
          </button>
        ))}
      </div>

      <div style={{ padding: 14, background: `${e.color}15`, borderRadius: 10, border: `1px solid ${e.color}40` }}>
        <div style={{ fontWeight: 700, color: e.color, marginBottom: 6 }}>{e.nombre}</div>
        <div style={{ fontSize: 14, color: LIENZO.fg, marginBottom: 4 }}>{e.desc}</div>
        <div style={{ fontSize: 13, color: LIENZO.fgDim }}>Ejemplos: {e.ejemplo}</div>
      </div>

      <Resumen>
        <strong>Cambios de estado</strong> (transiciones entre fases):<br />
        • Sólido → Líquido: FUSIÓN.<br />
        • Líquido → Gas: VAPORIZACIÓN (evaporación o ebullición).<br />
        • Gas → Líquido: CONDENSACIÓN.<br />
        • Líquido → Sólido: SOLIDIFICACIÓN.<br />
        • Sólido → Gas: SUBLIMACIÓN (saltar la fase líquida).<br />
        • Gas → Sólido: DEPOSICIÓN.
      </Resumen>
    </EscenaRica>
  );
}

function EscPropiedades() {
  return (
    <EscenaRica>
      <Titulo>Propiedades físicas vs químicas</Titulo>

      <Definicion termino="Propiedad física">
        Se puede medir SIN cambiar la identidad química de la sustancia.<br />
        Ej: color, densidad, punto de fusión, conductividad, dureza.
      </Definicion>

      <Definicion termino="Propiedad química">
        Describe cómo una sustancia REACCIONA con otras (cambia su identidad).<br />
        Ej: combustibilidad, reactividad con ácidos, oxidación, toxicidad.
      </Definicion>

      <Mnemotecnia>
        <strong>Test</strong>: ¿después de medir esta propiedad, sigue siendo
        la misma sustancia?<br />
        • Si SÍ (puedo recuperar la sustancia) → física.<br />
        • Si NO (la sustancia se transformó) → química.
      </Mnemotecnia>

      <Ejemplo titulo="Cambios físicos vs químicos">
        <strong>Físicos</strong> (NO cambia la identidad):<br />
        • Hielo derritiéndose (sigue siendo H₂O).<br />
        • Azúcar disuelto en agua (sigue siendo azúcar).<br />
        • Papel arrugado.<br /><br />

        <strong>Químicos</strong> (SÍ cambia la identidad):<br />
        • Hierro oxidándose (Fe → Fe₂O₃).<br />
        • Papel quemándose (combustión).<br />
        • Comida digiriéndose.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscDimensional() {
  return (
    <EscenaRica>
      <Titulo>Análisis dimensional · cambio de unidades</Titulo>

      <Definicion termino="Análisis dimensional">
        Técnica para convertir unidades multiplicando por <strong>factores de
        conversión</strong> (fracciones que equivalen a 1).
      </Definicion>

      <Resumen>
        <strong>Prefijos SI más usados</strong>:<br />
        • kilo (k) = 10³<br />
        • centi (c) = 10⁻²<br />
        • mili (m) = 10⁻³<br />
        • micro (μ) = 10⁻⁶<br />
        • nano (n) = 10⁻⁹
      </Resumen>

      <WorkedExample titulo="Conversión paso a paso · 5 km a cm">
        Factores: 1 km = 1000 m, 1 m = 100 cm.<br /><br />

        5 km · (1000 m / 1 km) · (100 cm / 1 m) =<br />
        5 · 1000 · 100 = <strong>500,000 cm = 5×10⁵ cm</strong>.<br /><br />

        Las unidades "km" y "m" se cancelan, queda "cm".
      </WorkedExample>

      <WorkedExample titulo="Conversión compleja · 60 km/h a m/s">
        60 km/h · (1000 m / 1 km) · (1 h / 3600 s) =<br />
        60 · 1000 / 3600 = 60,000 / 3600 = <strong>16.67 m/s</strong>.<br /><br />

        <strong>Truco rápido</strong>: dividir km/h por 3.6 da m/s. Multiplicar
        m/s por 3.6 da km/h.
      </WorkedExample>

      <Mnemotecnia>
        Si te confunde, escribe las unidades como fracciones y cancela lo que
        sobra. La unidad que queda al final es la que querías.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscNotacion() {
  return (
    <EscenaRica>
      <Titulo>Notación científica</Titulo>

      <Definicion termino="Notación científica">
        Forma de escribir números muy grandes o muy chicos como:<br />
        <strong>a × 10ⁿ</strong>, donde 1 ≤ |a| &lt; 10 y n es un entero.
      </Definicion>

      <Ejemplo titulo="Conversión a notación científica">
        • 6,500,000 = 6.5 × 10⁶.<br />
        • 0.00042 = 4.2 × 10⁻⁴.<br />
        • Número de Avogadro: 602,214,076,000,000,000,000,000 = 6.022 × 10²³.
      </Ejemplo>

      <Resumen>
        <strong>Operaciones</strong>:<br />
        • Multiplicación: (a × 10ⁿ)·(b × 10ᵐ) = ab × 10ⁿ⁺ᵐ.<br />
        • División: (a × 10ⁿ)/(b × 10ᵐ) = (a/b) × 10ⁿ⁻ᵐ.<br />
        • Suma/resta: hay que igualar primero los exponentes.
      </Resumen>

      <WorkedExample titulo="Operación típica">
        (3 × 10⁸) · (4 × 10⁻³) = 12 × 10⁵ = 1.2 × 10⁶.<br /><br />

        Nota: cuando ab ≥ 10, "corro" el punto decimal para volver a la forma
        estándar y ajusto el exponente.
      </WorkedExample>

      <Cuidado>
        Cuidado con sumas: 3×10⁸ + 4×10⁵ NO es 7×10¹³. Hay que pasar a misma
        potencia: 3×10⁸ + 0.004×10⁸ = 3.004×10⁸.
      </Cuidado>
    </EscenaRica>
  );
}

function EscTemp() {
  const [tempC, setTempC] = useState(25);
  const tempF = (tempC * 9) / 5 + 32;
  const tempK = tempC + 273.15;

  return (
    <EscenaRica>
      <Titulo>Temperatura · escalas y conversión</Titulo>

      <Resumen>
        <strong>3 escalas principales</strong>:<br />
        • <strong>Celsius (°C)</strong>: 0° agua congela, 100° agua hierve (al
        nivel del mar). Usada cotidianamente.<br />
        • <strong>Fahrenheit (°F)</strong>: 32° congela, 212° hierve. Usada en EEUU.<br />
        • <strong>Kelvin (K)</strong>: 0 K es el CERO ABSOLUTO (no hay
        temperatura más baja). Escala SI.
      </Resumen>

      <Resumen>
        <strong>Conversiones</strong>:<br />
        • °F = (9/5) °C + 32.<br />
        • °C = (5/9)(°F − 32).<br />
        • K = °C + 273.15.
      </Resumen>

      <div style={{ maxWidth: 480, padding: 14, background: "var(--bg-card)", borderRadius: 10, margin: "14px 0" }}>
        <label style={{ fontSize: 13, color: LIENZO.fgDim, display: "block", marginBottom: 8 }}>
          Mueves el slider y mirás las conversiones:
        </label>
        <input type="range" min={-50} max={150} value={tempC}
          onChange={(e) => setTempC(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.accent }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
          <div style={{ padding: 8, background: "var(--bg-base)", borderRadius: 6, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Celsius</div>
            <div style={{ fontSize: 20, color: LIENZO.accent, fontWeight: 700 }}>{tempC}°C</div>
          </div>
          <div style={{ padding: 8, background: "var(--bg-base)", borderRadius: 6, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Fahrenheit</div>
            <div style={{ fontSize: 20, color: COLOR_EXP, fontWeight: 700 }}>{tempF.toFixed(1)}°F</div>
          </div>
          <div style={{ padding: 8, background: "var(--bg-base)", borderRadius: 6, textAlign: "center" }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Kelvin</div>
            <div style={{ fontSize: 20, color: COLOR_OK, fontWeight: 700 }}>{tempK.toFixed(1)} K</div>
          </div>
        </div>
      </div>

      <WorkedExample titulo="Caso del facsímil Q11 1op 2005">
        ¿Cuál es la diferencia entre 30°C y 134°F?<br /><br />

        Convertimos 134°F a °C: (5/9)(134 − 32) = (5/9)(102) = 56.67°C.<br />
        Diferencia: 56.67 − 30 = 26.67°C.<br /><br />

        Si la opción "Ninguno" estaba presente, probablemente esa era la
        respuesta porque no encajaba con las 4 opciones dadas. (Las
        diferencias no se convierten igual que las temperaturas absolutas).
      </WorkedExample>

      <Cuidado>
        Para diferencias de temperatura: ΔT en Celsius = ΔT en Kelvin (el 273
        se cancela). Pero ΔT en Fahrenheit es 9/5 veces ΔT en Celsius.
      </Cuidado>
    </EscenaRica>
  );
}

function EscDensidad() {
  return (
    <EscenaRica>
      <Titulo>Densidad y gravedad específica</Titulo>

      <Definicion termino="Densidad (ρ)">
        Masa por unidad de volumen:<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          ρ = m / V
        </span><br /><br />
        Unidades: g/cm³ o kg/m³ (1 g/cm³ = 1000 kg/m³).
      </Definicion>

      <Resumen>
        <strong>Densidades a recordar</strong>:<br />
        • Agua pura: 1.00 g/cm³ (a 4°C).<br />
        • Hielo: 0.92 g/cm³ (por eso flota).<br />
        • Mercurio: 13.6 g/cm³.<br />
        • Aluminio: 2.70 g/cm³.<br />
        • Hierro: 7.87 g/cm³.<br />
        • Oro: 19.3 g/cm³.
      </Resumen>

      <Definicion termino="Gravedad específica (densidad relativa)">
        Razón entre la densidad de una sustancia y la del agua:<br />
        γ = ρ_sustancia / ρ_agua.<br /><br />
        Es ADIMENSIONAL (sin unidades). Cuanto mayor, más densa que el agua.
      </Definicion>

      <WorkedExample titulo="Caso del facsímil Q5 PREU 2025">
        Probeta con 12.7 mL de agua. Sumerges un perdigón de 5.352 g, el
        volumen pasa a 13.3 mL. ¿Gravedad específica? (ρ_agua = 1 g/mL)<br /><br />

        Volumen del perdigón = 13.3 − 12.7 = 0.6 mL.<br />
        Densidad = 5.352 / 0.6 = <strong>8.92 g/mL</strong>.<br />
        Gravedad específica = 8.92 / 1 = <strong>8.92</strong>.
      </WorkedExample>

      <PorQue>
        El método de inmersión (variación del volumen al sumergir un objeto)
        se usa porque permite medir el volumen de objetos irregulares
        directamente.
      </PorQue>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "¿Cuál es una sustancia pura?",
      o: ["agua destilada", "agua de mar", "ensalada", "aire"],
      c: 0,
      ex: "Agua destilada es un compuesto (H₂O). Las otras son mezclas.",
    },
    {
      p: "Convertir 100°C a Kelvin:",
      o: ["373.15 K", "273.15 K", "100 K", "212 K"],
      c: 0,
      ex: "K = °C + 273.15 = 373.15.",
    },
    {
      p: "Densidad de 50 g en 25 mL:",
      o: ["2 g/mL", "0.5 g/mL", "1250 g/mL", "2 mL/g"],
      c: 0,
      ex: "ρ = m/V = 50/25 = 2 g/mL.",
    },
    {
      p: "0.0042 en notación científica:",
      o: ["4.2 × 10⁻³", "4.2 × 10³", "42 × 10⁻⁴", "0.42 × 10⁻²"],
      c: 0,
      ex: "Corres el punto 3 lugares a la derecha: 4.2 × 10⁻³.",
    },
    {
      p: "¿Cambio físico o químico? Derretir hielo:",
      o: ["físico", "químico", "ambos", "ninguno"],
      c: 0,
      ex: "Sigue siendo H₂O, solo cambia el estado. Físico.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · confundir mezcla con compuesto">
        Mezcla: composición VARIABLE, componentes mantienen sus propiedades.
        Compuesto: composición FIJA, propiedades NUEVAS.
      </Misconception>

      <Misconception titulo="Error 2 · usar °C en Pitágoras de gases">
        Las ecuaciones de gases (Boyle, Charles, gas ideal) requieren la
        temperatura en KELVIN, no en Celsius. Convierte siempre antes de
        aplicar fórmulas.
      </Misconception>

      <Misconception titulo="Error 3 · sumar exponentes en cambio de prefijo">
        kilo = 10³ y micro = 10⁻⁶. Para pasar de km a μm: factor = 10⁹, no 10³.
        Cuidado al sumar exponentes.
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
