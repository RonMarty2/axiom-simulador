"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Microeconomía"
      escenas={[
        { titulo: "¿Qué es la elasticidad?", componente: Esc01_Intro },
        { titulo: "Cómo se calcula", componente: Esc02_Formula },
        { titulo: "Demanda elástica vs. inelástica", componente: Esc03_Tipos },
        { titulo: "Elasticidad e ingreso total", componente: Esc04_Ingreso },
        { titulo: "Otros tipos de elasticidad", componente: Esc05_Otros },
        { titulo: "Errores comunes", componente: Esc06_Errores },
        { titulo: "Práctica final", componente: Esc07_Practica },
      ]}
    />
  );
}

// Comparación visual: bien con demanda elástica (curva casi horizontal) vs.
// inelástica (casi vertical). Slider de elasticidad.
function ComparadorElasticidad() {
  const [E, setE] = useState(1);
  // Pendiente visual de la curva D: precio sube 1 → cantidad baja en E unidades.
  const H = 240, W = 380, padL = 36, padR = 14, padT = 14, padB = 32;
  const sx = (q: number) => padL + (q / 10) * (W - padL - padR);
  const sy = (p: number) => padT + ((10 - p) / 10) * (H - padT - padB);
  // Punto medio (5, 5). Si E muy alto: casi horizontal. Si E muy bajo: casi vertical.
  // Curva: Q = 5 + (5 − P) * E  (sentido inverso, con pivote en (5,5))
  const x1 = sx(Math.max(0, 5 + (5 - 0) * E));
  const y1 = sy(0);
  const x2 = sx(Math.min(10, 5 + (5 - 10) * E));
  const y2 = sy(10);
  const etiqueta =
    E < 0.5 ? { texto: "Demanda inelástica", color: LIENZO.bad }
    : E > 1.5 ? { texto: "Demanda elástica", color: LIENZO.ok }
    : { texto: "Elasticidad unitaria", color: LIENZO.fg };
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={H}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W + 10} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <line x1={padL} y1={H - padB} x2={W - padR + 4} y2={H - padB} stroke={LIENZO.fg} strokeWidth="1.5" />
          <line x1={padL} y1={H - padB} x2={padL} y2={padT - 4} stroke={LIENZO.fg} strokeWidth="1.5" />
          <text x={W - padR} y={H - padB + 18} fontSize="12" fill={LIENZO.fgDim} fontStyle="italic" textAnchor="end">Q</text>
          <text x={padL - 4} y={padT - 6} fontSize="12" fill={LIENZO.fgDim} fontStyle="italic" textAnchor="end">P</text>
          <motion.line
            stroke={etiqueta.color} strokeWidth="3" strokeLinecap="round"
            animate={{ x1, y1, x2, y2 }} transition={{ duration: 0.3 }} />
          <circle cx={sx(5)} cy={sy(5)} r="5" fill={LIENZO.fg} />
        </svg>
      </Pizarra>
      <div style={{
        fontFamily: "var(--font-crimson), serif", textAlign: "center",
        fontSize: 17, color: etiqueta.color, fontWeight: 600,
      }}>
        E ≈ <strong>{E.toFixed(1)}</strong> · {etiqueta.texto}
      </div>
      <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
        Elasticidad
        <input type="range" min={0.1} max={3} step={0.1} value={E}
          onChange={(e) => setE(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.accent }} />
      </label>
    </div>
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Elasticidad: cuánto reaccionan los compradores</Titulo>
      <Definicion termino="elasticidad-precio de la demanda">
        Mide cuánto <strong>cambia la cantidad demandada</strong> cuando cambia el precio. Responde:
        "¿qué tan sensibles son los consumidores al precio de este bien?"
      </Definicion>
      <Parrafo>
        Algunos bienes tienen demanda muy sensible al precio (luxe, café gourmet); otros casi nada (sal,
        medicinas esenciales). Esa sensibilidad cambia todo: cuánto subir el precio, cuánto vender, cuánto
        gasta la gente.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc02_Formula() {
  return (
    <EscenaRica>
      <Titulo>La fórmula</Titulo>
      <Resumen>
        <span style={{ fontFamily: "var(--font-crimson), serif", fontSize: 20, fontWeight: 600 }}>
          E = | %ΔQ / %ΔP |
        </span>
      </Resumen>
      <Parrafo>
        Es la <strong>variación porcentual</strong> de la cantidad sobre la del precio. Por convención
        usamos el valor absoluto: nos importa el TAMAÑO de la respuesta, no su signo.
      </Parrafo>
      <Ejemplo titulo="Sube el precio del té 10% y la cantidad demandada baja 25%">
        E = 25 / 10 = <strong>2.5</strong>. Es elástica: los compradores reaccionan mucho.
      </Ejemplo>
      <Ejemplo titulo="Sube el precio de la sal 20% y la cantidad baja 2%">
        E = 2 / 20 = <strong>0.1</strong>. Es inelástica: a la gente le da casi lo mismo.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc03_Tipos() {
  return (
    <EscenaRica>
      <Titulo>Demanda elástica vs. inelástica</Titulo>
      <Resumen>
        <strong>E &gt; 1</strong> → <span style={{ color: COLOR_OK }}>elástica</span>: gran sensibilidad al precio.<br />
        <strong>E = 1</strong> → unitaria.<br />
        <strong>E &lt; 1</strong> → <span style={{ color: COLOR_BAD }}>inelástica</span>: poca sensibilidad.<br />
        <strong>E = 0</strong> → perfectamente inelástica (curva vertical).<br />
        <strong>E = ∞</strong> → perfectamente elástica (curva horizontal).
      </Resumen>
      <ComparadorElasticidad />
      <Ejemplo titulo="Factores que influyen">
        • Cuántos <strong>sustitutos</strong> tenga el bien (más sustitutos = más elástica).<br />
        • Si es de <strong>necesidad o lujo</strong> (lujo = más elástica).<br />
        • El <strong>plazo</strong>: a largo plazo casi todo se vuelve más elástico.<br />
        • <strong>Peso</strong> en el presupuesto (los bienes caros tienden a ser más elásticos).
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_Ingreso() {
  return (
    <EscenaRica>
      <Titulo>Elasticidad y ingreso total</Titulo>
      <Resumen>
        Sirve para decidir si conviene <strong>subir o bajar precios</strong>:<br /><br />
        Si la demanda es <strong>elástica</strong> (E&gt;1) y <strong>SUBÍS</strong> el precio → el ingreso
        total <span style={{ color: COLOR_BAD }}>baja</span> (los clientes se van).<br /><br />
        Si la demanda es <strong>inelástica</strong> (E&lt;1) y SUBÍS el precio → el ingreso
        <span style={{ color: COLOR_OK }}> sube</span> (siguen comprando).
      </Resumen>
      <PorQue>
        Por eso las medicinas esenciales tienen precios muy regulados: la demanda es tan inelástica que un
        privado podría subir precios sin perder casi clientela.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05_Otros() {
  return (
    <EscenaRica>
      <Titulo>Otros tipos de elasticidad</Titulo>
      <Resumen>
        <strong>Elasticidad-ingreso</strong>: cuánto cambia la cantidad demandada cuando cambia el ingreso del
        consumidor.<br />
        • E<sub>I</sub> &gt; 0 → bien normal.<br />
        • E<sub>I</sub> &lt; 0 → bien inferior (lo dejás de consumir cuando ganás más).<br />
        • E<sub>I</sub> &gt; 1 → bien de lujo.
      </Resumen>
      <Resumen>
        <strong>Elasticidad cruzada</strong>: cuánto cambia la demanda de X cuando cambia el precio de Y.<br />
        • Positiva → bienes <strong>sustitutos</strong> (té y café).<br />
        • Negativa → bienes <strong>complementarios</strong> (auto y nafta).
      </Resumen>
    </EscenaRica>
  );
}

function Esc06_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        Usar el signo negativo. La elasticidad-precio "técnicamente" sale negativa porque P y Q se mueven al
        revés. Por convención se toma el valor absoluto.
      </Cuidado>
      <Cuidado>
        Confundir pendiente con elasticidad. Una recta de demanda lineal tiene pendiente CONSTANTE, pero su
        elasticidad VARÍA en cada punto.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc07_Practica() {
  const ejs = useMemo(() => [
    { p: "Sube el P 20%, Q baja 30%. E = ?", o: ["0.67", "1.5", "10", "−1.5"], c: 1, ex: "|30/20| = 1.5 — elástica." },
    { p: "Demanda elástica significa…", o: ["E < 1", "E = 0", "E > 1", "E negativo"], c: 2, ex: "Si E > 1 reacciona más que proporcionalmente al precio." },
    { p: "Bien inelástico, subo precio: ingreso total…", o: ["Sube", "Baja", "No cambia", "Depende"], c: 0, ex: "Inelástico: pocos se van. El ingreso sube." },
    { p: "Elasticidad cruzada NEGATIVA significa…", o: ["sustitutos", "complementarios", "inferiores", "normales"], c: 1, ex: "Cuando sube P de uno, baja Q del otro: complementarios." },
    { p: "Bien con E<sub>ingreso</sub> < 0:", o: ["normal", "lujo", "inferior", "Giffen"], c: 2, ex: "Negativa = lo dejás de consumir si ganás más → inferior." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;
  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 preguntas:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i]; const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "transparent", border: `1px solid ${LIENZO.fgFaint}`, borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>PREGUNTA {i + 1}</div>
            <div style={{ fontSize: 15, color: COLOR_BASE, fontWeight: 600, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: e.p }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c; const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{ padding: "10px 14px", background: !rev ? "#fff" : isOk ? "#ecfdf5" : isSel ? "#fef2f2" : "#fff", border: `1.5px solid ${!rev ? LIENZO.fgFaint : isOk ? COLOR_OK : isSel ? COLOR_BAD : LIENZO.fgFaint}`, borderRadius: 10, fontSize: 14, fontWeight: 600, color: COLOR_BASE, cursor: rev ? "default" : "pointer", textAlign: "left" }}>
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
          style={{ padding: 18, background: LIENZO.bgSoft, border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
