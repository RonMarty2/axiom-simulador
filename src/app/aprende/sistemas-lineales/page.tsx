"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
} from "../_components/atoms";
import { Pizarra, Ejes, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

// Intersección de rectas: dos rectas se dibujan y aparece el punto de
// intersección. Tocar para alternar entre los 3 casos: única / sin solución
// (paralelas) / infinitas (coincidentes).
function InterseccionRectas() {
  const casos = [
    { titulo: "Única solución", color: LIENZO.ok, m1: 1, b1: 4, m2: -1, b2: 8, sol: "(2, 6)" },
    { titulo: "Sin solución · paralelas", color: LIENZO.bad, m1: 1, b1: 1, m2: 1, b2: 4, sol: "∅" },
    { titulo: "Infinitas · coincidentes", color: LIENZO.warn, m1: 0.5, b1: 2, m2: 0.5, b2: 2, sol: "∞" },
  ];
  const [i, setI] = useState(0);
  const { titulo, color, m1, b1, m2, b2, sol } = casos[i];
  const xMin = -4, xMax = 8, yMin = -2, yMax = 10, alto = 280;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  // Intersección
  const tieneInt = Math.abs(m1 - m2) > 1e-6;
  const xi = tieneInt ? (b2 - b1) / (m1 - m2) : 0;
  const yi = m1 * xi + b1;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={alto} onClick={() => setI((v) => (v + 1) % casos.length)}>
        <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
          <motion.line
            x1={sx(xMin)} y1={sy(m1 * xMin + b1)} x2={sx(xMax)} y2={sy(m1 * xMax + b1)}
            stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round"
            initial={false} animate={{
              x1: sx(xMin), y1: sy(m1 * xMin + b1),
              x2: sx(xMax), y2: sy(m1 * xMax + b1),
            }} transition={{ duration: 0.3 }} />
          <motion.line
            x1={sx(xMin)} y1={sy(m2 * xMin + b2)} x2={sx(xMax)} y2={sy(m2 * xMax + b2)}
            stroke={LIENZO.ok} strokeWidth="3" strokeLinecap="round"
            initial={false} animate={{
              x1: sx(xMin), y1: sy(m2 * xMin + b2),
              x2: sx(xMax), y2: sy(m2 * xMax + b2),
            }} transition={{ duration: 0.3 }} />
          {tieneInt && xi > xMin && xi < xMax && yi > yMin && yi < yMax && (
            <motion.circle cx={sx(xi)} cy={sy(yi)} r="7" fill={color}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }} />
          )}
        </Ejes>
      </Pizarra>
      <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
        {casos.map((_, k) => (
          <button key={k} onClick={() => setI(k)}
            style={{
              width: 8, height: 8, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
              background: i === k ? LIENZO.fg : LIENZO.fgFaint,
            }} aria-label={`Caso ${k + 1}`} />
        ))}
      </div>
      <div style={{
        fontFamily: "var(--font-crimson), serif", textAlign: "center",
        fontSize: 18, color: LIENZO.fg, fontWeight: 500,
      }}>
        <span style={{ color }}>{titulo}</span> · solución: <strong>{sol}</strong>
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic" }}>
        Tocá la imagen para alternar entre los 3 casos posibles
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="06"
      tituloUnidad="Sistemas de ecuaciones lineales"
      escenas={[
        { titulo: "¿Qué es un sistema?", componente: Esc01_Intro },
        { titulo: "Método 1: Sustitución", componente: Esc02_Sust },
        { titulo: "Método 2: Igualación", componente: Esc03_Igual },
        { titulo: "Método 3: Reducción", componente: Esc04_Red },
        { titulo: "Cuándo usar cada método", componente: Esc05_Cual },
        { titulo: "Sistemas sin solución o infinitas", componente: Esc06_Casos },
        { titulo: "Problema verbal con sistema", componente: Esc07_Verbal },
        { titulo: "Errores comunes", componente: Esc08_Errores },
        { titulo: "Práctica final", componente: Esc09_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Sistema de ecuaciones</Titulo>
      <Definicion termino="sistema">
        Un <strong>sistema lineal</strong> son DOS (o más) ecuaciones con DOS (o más)
        incógnitas que se resuelven JUNTAS. La solución es un par (x, y) que cumple
        AMBAS ecuaciones simultáneamente.
      </Definicion>
      <Ejemplo>
        <strong>{`{ x + y = 10, x − y = 2 }`}</strong> → Solución: x = 6, y = 4.<br />
        Verificación: 6+4 = 10 ✓ y 6−4 = 2 ✓.
      </Ejemplo>
      <Parrafo>
        Geométricamente: cada ecuación es una recta. La solución es el
        <strong> punto de intersección</strong>. Pueden pasar 3 cosas:
      </Parrafo>
      <InterseccionRectas />
      <Resumen>
        🎯 Aparece en problemas reales: <br />
        • Compré 2 productos por X total, conozco otra restricción → 2 ecs.<br />
        • Edades, mezclas, intersección de rectas, sistemas de oferta y demanda.<br />
        Vamos a ver <strong>3 métodos</strong>: sustitución, igualación, reducción.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Sust() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Método 1: Sustitución</Titulo>
      <Resumen>
        <strong>Idea</strong>: despejá una variable en UNA ecuación y reemplazala en la otra.
      </Resumen>

      <Ejemplo titulo="Sistema: x + y = 10 ; x − y = 2">
        <Paso n={1}>De la 1ª despejo y: y = 10 − x.</Paso>
        <Paso n={2}>Sustituyo en la 2ª: x − (10 − x) = 2 → x − 10 + x = 2 → 2x = 12 → x = 6.</Paso>
        <Paso n={3}>Volviendo: y = 10 − 6 = 4.</Paso>
        <Paso n={4}>Solución: <strong style={{ color: COLOR_OK }}>(6, 4)</strong>.</Paso>
      </Ejemplo>

      <PorQue>
        El truco mental: si y = 10 − x, entonces donde diga y en cualquier otra ecuación
        puedo escribir 10 − x. Reducís el problema a una sola variable.
      </PorQue>

      <Cuidado>
        Conviene despejar la variable que tenga <strong>coeficiente 1 o -1</strong> (no tenés que dividir).
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_Igual() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Método 2: Igualación</Titulo>
      <Resumen>
        <strong>Idea</strong>: despejá la MISMA variable en AMBAS ecuaciones y luego igualá.
      </Resumen>

      <Ejemplo titulo="Sistema: x + y = 10 ; x − y = 2">
        <Paso n={1}>Despejo x en ambas: x = 10 − y &nbsp; y &nbsp; x = 2 + y.</Paso>
        <Paso n={2}>Igualo: 10 − y = 2 + y → 8 = 2y → y = 4.</Paso>
        <Paso n={3}>Sustituyo en cualquiera: x = 10 − 4 = 6.</Paso>
        <Paso n={4}>Solución: <strong style={{ color: COLOR_OK }}>(6, 4)</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Útil cuando AMBAS ecuaciones son fáciles de despejar para la misma variable.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc04_Red() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Método 3: Reducción (el más rápido)</Titulo>
      <Resumen>
        <strong>Idea</strong>: sumá (o restá) las dos ecuaciones de modo que UNA variable se cancele.
      </Resumen>

      <Ejemplo titulo="Sistema: x + y = 10 ; x − y = 2">
        <Paso n={1}>Sumo las dos ecuaciones: <strong>(x + y) + (x − y) = 10 + 2 → 2x = 12</strong></Paso>
        <Paso n={2}>x = 6. Y de cualquiera: y = 4.</Paso>
        <Paso n={3}>Solución: <strong style={{ color: COLOR_OK }}>(6, 4)</strong>. ¡Súper rápido!</Paso>
      </Ejemplo>

      <Ejemplo titulo="A veces hay que ajustar primero: 3x + 2y = 12 ; 5x + 2y = 16">
        <Paso n={1}>RESTO la 1ª de la 2ª: (5x+2y) − (3x+2y) = 16 − 12 → 2x = 4 → x = 2.</Paso>
        <Paso n={2}>Sustituyo: 3·2 + 2y = 12 → 2y = 6 → y = 3.</Paso>
        <Paso n={3}>Solución: (2, 3).</Paso>
      </Ejemplo>

      <Ejemplo titulo="Otra: 2x + 3y = 13 ; 4x − y = 5">
        <Paso n={1}>Multiplico la 2ª por 3 para emparejar y: 12x − 3y = 15.</Paso>
        <Paso n={2}>Sumo con la 1ª: 14x = 28 → x = 2.</Paso>
        <Paso n={3}>Sustituyo: 2·2 + 3y = 13 → y = 3. Solución: (2, 3).</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05_Cual() {
  return (
    <EscenaRica>
      <Titulo>¿Cuál método uso?</Titulo>
      <Resumen>
        🎯 Pista rápida según el sistema:<br />
        • Si una variable ya está despejada (o se despeja fácil) → <strong>SUSTITUCIÓN</strong>.<br />
        • Si las dos ecuaciones tienen coef parecidos → <strong>REDUCCIÓN</strong>.<br />
        • Si las dos son simétricas/fáciles para la misma variable → <strong>IGUALACIÓN</strong>.<br />
        Cualquier método te da el mismo resultado — usá el que veas más cómodo.
      </Resumen>
      <Cuidado>
        En un examen, <strong>reducción suele ser la más rápida</strong> cuando los coeficientes
        de una variable son fáciles de emparejar.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_Casos() {
  return (
    <EscenaRica>
      <Titulo>3 escenarios posibles</Titulo>

      <Ejemplo titulo="1. Solución única (caso normal)">
        Las dos ecuaciones son rectas que se CRUZAN en un punto. Hay una sola (x, y).
      </Ejemplo>

      <Ejemplo titulo="2. Sin solución (rectas paralelas)">
        <strong>{`{ x + y = 5, x + y = 9 }`}</strong> — contradicción (5 ≠ 9). NO hay (x,y) que cumpla ambas. Sistema <strong>incompatible</strong>.
      </Ejemplo>

      <Ejemplo titulo="3. Infinitas soluciones (la misma recta)">
        <strong>{`{ x + y = 5, 2x + 2y = 10 }`}</strong> — la 2ª es solo la 1ª multiplicada por 2. Cualquier (x, y) que cumpla x+y=5 vale. Sistema <strong>compatible indeterminado</strong>.
      </Ejemplo>

      <PorQue>
        Cuando aplicás cualquier método y llegás a "0 = 5", no hay solución. Si llegás
        a "0 = 0", hay infinitas. Si llegás a "x = número", solución única.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07_Verbal() {
  return (
    <EscenaRica>
      <Titulo>Problema verbal con sistema</Titulo>
      <Ejemplo titulo="Dos números suman 20 y su diferencia es 4. ¿Cuáles son?">
        <Paso n={1}>Nombro: x e y los números.</Paso>
        <Paso n={2}>Sistema: x + y = 20 ; x − y = 4.</Paso>
        <Paso n={3}>Reducción: sumo. 2x = 24 → x = 12.</Paso>
        <Paso n={4}>Y: y = 8. <strong style={{ color: COLOR_OK }}>(12, 8)</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="3 lápices y 2 cuadernos cuestan 23 Bs. 1 lápiz y 4 cuadernos cuestan 21 Bs. ¿Precio de cada uno?">
        <Paso n={1}>x = precio lápiz, y = precio cuaderno.</Paso>
        <Paso n={2}>Sistema: 3x + 2y = 23 ; x + 4y = 21.</Paso>
        <Paso n={3}>De la 2ª: x = 21 − 4y. Sustituyo en 1ª: 3(21−4y) + 2y = 23 → 63 − 12y + 2y = 23 → −10y = −40 → y = 4.</Paso>
        <Paso n={4}>x = 21 − 16 = 5. Lápiz <strong style={{ color: COLOR_OK }}>5 Bs</strong>, cuaderno <strong style={{ color: COLOR_OK }}>4 Bs</strong>.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc08_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Olvidar despejar la otra variable. <br />
        <span style={{ fontSize: 13 }}>
          Encontraste x = 6 pero no volviste a calcular y. La SOLUCIÓN es el PAR (x, y), no solo x.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Mal manejo de signos en reducción. <br />
        <span style={{ fontSize: 13 }}>
          Si querés cancelar +y con −y, sumá. Si las dos son +y, RESTÁ. Cuidado.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> No verificar. <br />
        <span style={{ fontSize: 13 }}>
          Sustituí TU SOLUCIÓN en LAS DOS ecuaciones. Si una no se cumple, hubo un error.
        </span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc09_Practica() {
  const ejs = useMemo(() => [
    { p: "Resolvé: x + y = 7 ; x − y = 1", o: ["(4, 3)", "(3, 4)", "(5, 2)", "(7, 0)"], c: 0, ex: "Sumo: 2x = 8 → x = 4. Y = 3. (4,3)." },
    { p: "Resolvé: 2x + y = 11 ; x − y = 1", o: ["(4, 3)", "(3, 5)", "(5, 1)", "(2, 7)"], c: 0, ex: "Sumo: 3x = 12 → x = 4. Y = 3." },
    { p: "Si x + 2y = 9 y x = 3, ¿cuánto vale y?", o: ["3", "6", "1.5", "9"], c: 0, ex: "3 + 2y = 9 → 2y = 6 → y = 3." },
    { p: "Sistema {x − y = 5, 2x − 2y = 9}: ¿qué pasa?", o: ["Tiene sol única", "Sin solución", "Infinitas", "Solo x=5"], c: 1, ex: "La 2ª es la 1ª por 2 daría 10, pero da 9. Contradicción → sin solución." },
    { p: "Dos números suman 14 y difieren en 6. El mayor es:", o: ["10", "8", "12", "4"], c: 0, ex: "x+y=14, x−y=6. Sumo: 2x=20 → x=10." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;
  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios sobre sistemas:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i]; const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c; const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{ padding: "10px 14px", background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)", border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`, borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer", fontFamily: "var(--font-crimson), serif", textAlign: "left" }}>
                    {op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
                  </button>
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
            {ok === ejs.length && "🎉 Dominás sistemas lineales."}
            {ok >= 3 && ok < ejs.length && "Bien. Reducción es tu amiga en el examen."}
            {ok < 3 && "Repasá los 3 métodos y volvé acá."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
