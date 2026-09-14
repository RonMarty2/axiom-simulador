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
      unidad="GT-06"
      tituloUnidad="Razones trigonométricas · Triángulo rectángulo"
      escenas={[
        { titulo: "Las 3 razones fundamentales: sen, cos, tan", componente: EscIntro },
        { titulo: "SOH-CAH-TOA · la regla mnemónica clave", componente: EscSohCahToa },
        { titulo: "Razones recíprocas: csc, sec, cot", componente: EscReciprocas },
        { titulo: "Ángulos notables · valores exactos", componente: EscNotables },
        { titulo: "Aplicaciones · resolución de triángulos", componente: EscResolucion },
        { titulo: "Ángulos de elevación y depresión", componente: EscElevacion },
        { titulo: "Errores comunes", componente: EscErrores },
        { titulo: "Práctica final", componente: EscPractica },
      ]}
    />
  );
}

// Triángulo rectángulo SVG con ángulo variable
function TrigSVG({ angulo = 30 }: { angulo?: number }) {
  const rad = (angulo * Math.PI) / 180;
  const sx = 100, sy = 180;
  const w = 200, h = 200 * Math.tan(rad);
  const px = sx + w, py = sy;
  const qx = px, qy = sy - h;
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <motion.polygon points={`${sx},${sy} ${px},${py} ${qx},${qy}`}
            fill={`${LIENZO.accent}22`} stroke={LIENZO.accent} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
          {/* Marca ángulo recto */}
          <polyline points={`${px - 12},${py} ${px - 12},${py - 12} ${px},${py - 12}`}
            fill="none" stroke={LIENZO.fg} strokeWidth="1.5" />
          {/* Ángulo θ con arco */}
          <motion.path d={`M ${sx + 30} ${sy} A 30 30 0 0 0 ${sx + 30 * Math.cos(-rad)} ${sy + 30 * Math.sin(-rad)}`}
            fill="none" stroke={COLOR_EXP} strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.4 }} />
          <text x={sx + 38} y={sy - 10} fontSize="14" fill={COLOR_EXP} fontWeight="700">θ={angulo}°</text>
          {/* Etiquetas */}
          <text x={sx - 8} y={sy + 18} fontSize="14" fill={LIENZO.fg} fontWeight="600">A</text>
          <text x={px + 8} y={py + 18} fontSize="14" fill={LIENZO.fg} fontWeight="600">B</text>
          <text x={qx + 8} y={qy} fontSize="14" fill={LIENZO.fg} fontWeight="600">C</text>
          <text x={(sx + px) / 2} y={sy + 22} textAnchor="middle" fontSize="13" fill={COLOR_OK} fontWeight="700">cateto adyacente</text>
          <text x={px + 12} y={(py + qy) / 2} fontSize="13" fill={COLOR_BAD} fontWeight="700">cateto opuesto</text>
          <text x={(sx + qx) / 2 - 30} y={(sy + qy) / 2 - 5} fontSize="13" fill={LIENZO.accent} fontWeight="700">hipotenusa</text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Razones trigonométricas · sen, cos, tan</Titulo>

      <Hook>
        Trigonometría aparece en MUCHAS preguntas del examen, incluyendo
        triángulos, navegación, ángulos de elevación y depresión. Dominar
        SOH-CAH-TOA es lo más importante de esta unidad.
      </Hook>

      <Parrafo>
        Las razones trigonométricas relacionan los lados de un triángulo
        rectángulo con sus ángulos agudos. Son CONSTANTES para cada ángulo, no
        importa el tamaño del triángulo (por semejanza).
      </Parrafo>

      <TrigSVG angulo={30} />

      <Definicion termino="Las 3 razones fundamentales (respecto al ángulo θ)">
        • <strong>sen θ = cateto opuesto / hipotenusa</strong>.<br />
        • <strong>cos θ = cateto adyacente / hipotenusa</strong>.<br />
        • <strong>tan θ = cateto opuesto / cateto adyacente</strong>.<br /><br />
        El "cateto opuesto" es el que NO toca al ángulo θ. El "cateto adyacente"
        es el que SÍ toca al ángulo θ (sin ser la hipotenusa).
      </Definicion>

      <PorQue>
        <strong>¿Por qué las razones son constantes?</strong> Por semejanza:
        dos triángulos rectángulos con el mismo ángulo agudo son semejantes
        (criterio AA: ya tienen el ángulo recto y el ángulo agudo). En
        triángulos semejantes, las razones entre lados correspondientes son
        iguales.<br /><br />
        Por eso puedes tabular sen, cos, tan de cualquier ángulo y obtener los
        lados de cualquier triángulo rectángulo que tenga ese ángulo.
      </PorQue>
    </EscenaRica>
  );
}

function EscSohCahToa() {
  return (
    <EscenaRica>
      <Titulo>SOH-CAH-TOA · la regla universal</Titulo>

      <Mnemotecnia>
        <strong>SOH-CAH-TOA</strong> resume las 3 razones:<br /><br />
        • <strong>S</strong>en θ = <strong>O</strong>puesto / <strong>H</strong>ipotenusa.<br />
        • <strong>C</strong>os θ = <strong>A</strong>dyacente / <strong>H</strong>ipotenusa.<br />
        • <strong>T</strong>an θ = <strong>O</strong>puesto / <strong>A</strong>dyacente.<br /><br />
        Se lee "<em>sojcajtoa</em>". Memorízalo: lo vas a usar TODA la
        trigonometría.
      </Mnemotecnia>

      <WorkedExample titulo="Aplicación directa">
        En un triángulo rectángulo, el cateto opuesto al ángulo θ mide 5 y la
        hipotenusa mide 13. Calcular sen θ, cos θ y tan θ.<br /><br />

        <strong>Paso 1 · Cateto adyacente por Pitágoras:</strong><br />
        13² = 5² + b² → b² = 144 → b = 12.<br /><br />

        <strong>Paso 2 · Aplicar SOH-CAH-TOA:</strong><br />
        • sen θ = 5/13.<br />
        • cos θ = 12/13.<br />
        • tan θ = 5/12.<br /><br />

        <strong>Verificación:</strong> sen² + cos² = (25/169) + (144/169) =
        169/169 = 1 ✓ (identidad fundamental).
      </WorkedExample>

      <Resumen>
        <strong>Recuerda quién es opuesto, adyacente, hipotenusa</strong>:<br />
        • La hipotenusa es siempre la misma (lado más largo, opuesto al ángulo
        recto).<br />
        • El opuesto y adyacente CAMBIAN según qué ángulo agudo mires.<br />
        • Si mirás el otro ángulo agudo (90° − θ), opuesto y adyacente se
        intercambian.
      </Resumen>
    </EscenaRica>
  );
}

function EscReciprocas() {
  return (
    <EscenaRica>
      <Titulo>Razones recíprocas · csc, sec, cot</Titulo>

      <Definicion termino="Las 3 recíprocas">
        • <strong>cosecante</strong>: csc θ = 1 / sen θ = hipotenusa / opuesto.<br />
        • <strong>secante</strong>: sec θ = 1 / cos θ = hipotenusa / adyacente.<br />
        • <strong>cotangente</strong>: cot θ = 1 / tan θ = adyacente / opuesto.
      </Definicion>

      <Mnemotecnia>
        <strong>Truco para no confundir las recíprocas</strong>:<br />
        • Las que empiezan con "c" en pareja: <strong>c</strong>os ↔ <strong>s</strong>ec
        (NO confundir: cos NO es recíproca de csc).<br />
        • sen ↔ <strong>c</strong>sc.<br />
        • cos ↔ <strong>s</strong>ec.<br />
        • tan ↔ <strong>c</strong>ot.<br /><br />
        Regla: la recíproca de una "directa" (sen, cos, tan) lleva una "c"
        cruzada (cos↔sec lleva la c en sec; sen↔csc lleva la c en csc).
      </Mnemotecnia>

      <Resumen>
        <strong>Relaciones útiles</strong>:<br />
        • tan θ = sen θ / cos θ.<br />
        • cot θ = cos θ / sen θ.<br />
        • sec θ = 1 / cos θ.<br />
        • csc θ = 1 / sen θ.<br /><br />
        <strong>Identidades fundamentales</strong>:<br />
        • sen²θ + cos²θ = 1 (Pitágoras trigonométrico).<br />
        • 1 + tan²θ = sec²θ.<br />
        • 1 + cot²θ = csc²θ.
      </Resumen>
    </EscenaRica>
  );
}

function EscNotables() {
  return (
    <EscenaRica>
      <Titulo>Ángulos notables · valores exactos para memorizar</Titulo>

      <Parrafo>
        Estos valores aparecen TANTAS veces en el examen que conviene memorizarlos.
      </Parrafo>

      <Resumen>
        <strong>Tabla de los 3 ángulos notables</strong>:<br />
        <br />
        <table style={{ fontFamily: "var(--font-crimson), serif", margin: "0 auto" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "6px 14px" }}>θ</th>
              <th style={{ padding: "6px 14px" }}>sen</th>
              <th style={{ padding: "6px 14px" }}>cos</th>
              <th style={{ padding: "6px 14px" }}>tan</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "6px 14px" }}>30°</td><td>1/2</td><td>√3/2</td><td>√3/3 (= 1/√3)</td></tr>
            <tr><td style={{ padding: "6px 14px" }}>45°</td><td>√2/2</td><td>√2/2</td><td>1</td></tr>
            <tr><td style={{ padding: "6px 14px" }}>60°</td><td>√3/2</td><td>1/2</td><td>√3</td></tr>
          </tbody>
        </table>
      </Resumen>

      <Mnemotecnia>
        <strong>Truco para memorizar la tabla</strong>:<br />
        Los senos de 30°, 45°, 60° son: <strong>√1/2, √2/2, √3/2</strong>.<br />
        Los cosenos son lo mismo al revés: <strong>√3/2, √2/2, √1/2</strong>.<br />
        Las tangentes se sacan dividiendo: tan = sen/cos.<br /><br />
        Patrón: cuanto más grande el ángulo, más grande el seno, menor el coseno.
      </Mnemotecnia>

      <Resumen>
        <strong>Valores especiales en los extremos</strong>:<br />
        • sen 0° = 0, cos 0° = 1, tan 0° = 0.<br />
        • sen 90° = 1, cos 90° = 0, tan 90° = ∞ (no definida).
      </Resumen>

      <PorQue>
        <strong>¿De dónde salen estos valores?</strong> Del triángulo
        equilátero (dividido por su altura, da 30°-60°-90°) y del triángulo
        rectángulo isósceles (45°-45°-90°). Se calculan con Pitágoras directo
        sin necesitar calculadora.
      </PorQue>
    </EscenaRica>
  );
}

function EscResolucion() {
  return (
    <EscenaRica>
      <Titulo>Resolución de triángulos rectángulos</Titulo>

      <Parrafo>
        "Resolver un triángulo" significa encontrar todos sus lados y ángulos
        desconocidos. En un rectángulo, necesitas 2 datos (además del ángulo
        recto) para resolverlo completo.
      </Parrafo>

      <WorkedExample titulo="Conocido 1 ángulo agudo y la hipotenusa">
        Un triángulo rectángulo tiene hipotenusa 10 y ángulo 35°. Calcular los
        catetos.<br /><br />

        <strong>Cateto opuesto a 35°:</strong><br />
        sen 35° = opuesto / 10 → opuesto = 10 · sen 35° ≈ 10 · 0.574 =
        <strong> 5.74</strong>.<br /><br />

        <strong>Cateto adyacente a 35°:</strong><br />
        cos 35° = adyacente / 10 → adyacente = 10 · cos 35° ≈ 10 · 0.819 =
        <strong> 8.19</strong>.<br /><br />

        <strong>Verificación con Pitágoras:</strong> 5.74² + 8.19² =
        32.9 + 67.1 = 100 ✓.
      </WorkedExample>

      <WorkedExample titulo="Conocidos los 2 catetos">
        Catetos 5 y 12. Calcular el ángulo opuesto al cateto 5.<br /><br />

        <strong>Tan del ángulo θ opuesto al 5:</strong><br />
        tan θ = opuesto / adyacente = 5 / 12.<br />
        θ = arctan(5/12) ≈ <strong>22.6°</strong>.<br /><br />

        <strong>El otro ángulo agudo:</strong> 90° − 22.6° = 67.4°.<br /><br />

        <strong>Hipotenusa:</strong> √(25 + 144) = 13.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscElevacion() {
  return (
    <EscenaRica>
      <Titulo>Ángulos de elevación y depresión</Titulo>

      <Definicion termino="Ángulo de elevación">
        Ángulo formado entre la horizontal y la línea visual hacia un objeto
        que está MÁS ARRIBA del observador.
      </Definicion>

      <Definicion termino="Ángulo de depresión">
        Ángulo formado entre la horizontal y la línea visual hacia un objeto
        que está MÁS ABAJO del observador.
      </Definicion>

      <Mnemotecnia>
        <strong>Truco</strong>: el ángulo de depresión desde un punto alto
        hacia un objeto en el suelo ES IGUAL al ángulo de elevación desde el
        objeto hacia el punto alto. Son ángulos alternos internos entre
        paralelas (las horizontales).
      </Mnemotecnia>

      <WorkedExample titulo="Caso típico de examen · helicóptero y patrullero">
        Réplica del problema G9 del facsímil 1op-2-2025: "Desde un helicóptero
        a altura h, el ángulo de depresión al patrullero es 65° y al
        delincuente más alejado es 25°. Distancia helicóptero-patrullero = 25 m.
        Calcular la distancia patrullero-delincuente."<br /><br />

        <strong>Paso 1 · Triángulo helicóptero-patrullero:</strong><br />
        Asumiendo que 25 m es la distancia en línea recta:<br />
        sen 65° = h / 25 → h = 25 · sen 65° ≈ 22.66 m.<br />
        cos 65° = x_p / 25 → x_p ≈ 10.57 m (horizontal hasta el patrullero).<br /><br />

        <strong>Paso 2 · Triángulo helicóptero-delincuente:</strong><br />
        tan 25° = h / x_d → x_d = h / tan 25° ≈ 22.66 / 0.466 ≈ 48.6 m.<br /><br />

        <strong>Paso 3 · Distancia patrullero-delincuente:</strong><br />
        x_d − x_p ≈ 48.6 − 10.57 ≈ <strong>38 m</strong>.<br /><br />

        Si la opción no aparece, "Ninguno" puede ser la respuesta correcta
        (depende del facsímil real).
      </WorkedExample>
    </EscenaRica>
  );
}

function EscErrores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>

      <Misconception titulo="Error 1 · confundir cateto opuesto vs adyacente">
        Depende del ángulo que mires. El opuesto es el que NO toca al ángulo.
        El adyacente es el que SÍ toca al ángulo (sin ser hipotenusa).<br /><br />
        Si te equivocas de cateto, sen y cos se intercambian.
      </Misconception>

      <Misconception titulo="Error 2 · sen² ≠ sen(x²)">
        sen²x significa (sen x)². NO significa sen(x²).<br /><br />
        Ej: sen² 30° = (sen 30°)² = (1/2)² = 1/4.
      </Misconception>

      <Misconception titulo="Error 3 · usar calculadora en grados vs radianes">
        En el examen, los ángulos vienen en grados. Tu calculadora debe estar
        en modo DEG (degrees), no RAD (radianes). Si vienes con la calculadora
        en RAD y le pides sen 30°, te da sen(30 radianes) que es un valor
        absurdo.
      </Misconception>

      <Misconception titulo="Error 4 · creer que sen(A+B) = sen A + sen B">
        FALSO. Las funciones trigonométricas NO se distribuyen sobre sumas.
        Existen fórmulas específicas (sen(A+B) = sen A cos B + cos A sen B)
        que se ven en identidades.
      </Misconception>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "sen 30° + cos 60° =",
      o: ["1", "1/2", "√3/2", "0"],
      c: 0,
      ex: "sen 30° = 1/2, cos 60° = 1/2. Suma = 1.",
    },
    {
      p: "En un triángulo rectángulo, cateto opuesto = 3, cateto adyacente = 4. tan θ =",
      o: ["3/4", "4/3", "3/5", "4/5"],
      c: 0,
      ex: "tan = opuesto/adyacente = 3/4.",
    },
    {
      p: "Si sen θ = 5/13, ¿cuánto es cos θ? (θ agudo)",
      o: ["12/13", "13/12", "5/12", "8/13"],
      c: 0,
      ex: "Pitágoras: cat. adyacente² = 13²-5² = 144 → adyacente = 12. cos = 12/13.",
    },
    {
      p: "Una escalera de 10 m apoyada en pared forma 60° con el suelo. ¿A qué altura llega?",
      o: ["5√3 m", "5 m", "10/√3 m", "8.66 m"],
      c: 0,
      ex: "Altura = 10·sen 60° = 10·(√3/2) = 5√3 ≈ 8.66 m. (Las opciones a y d son equivalentes).",
    },
    {
      p: "tan 45° =",
      o: ["1", "√2/2", "√3", "1/2"],
      c: 0,
      ex: "tan 45° = 1 (ángulo notable).",
    },
    {
      p: "Ángulo de elevación al tope de una torre de 30 m, desde 30 m de distancia:",
      o: ["45°", "30°", "60°", "90°"],
      c: 0,
      ex: "tan θ = 30/30 = 1 → θ = 45°.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final · 6 ejercicios</Titulo>
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
