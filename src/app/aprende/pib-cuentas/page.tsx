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
      unidad="03"
      tituloUnidad="Macroeconomía"
      escenas={[
        { titulo: "¿Qué es el PIB?", componente: Esc01_Intro },
        { titulo: "Tres formas de medirlo", componente: Esc02_Formas },
        { titulo: "PIB nominal vs. real", componente: Esc03_Nominal },
        { titulo: "Inflación: el IPC", componente: Esc04_Inflacion },
        { titulo: "Desempleo", componente: Esc05_Desempleo },
        { titulo: "Errores comunes", componente: Esc06_Errores },
        { titulo: "Práctica final", componente: Esc07_Practica },
      ]}
    />
  );
}

// Animación: composición del PIB por enfoque de gasto (C + I + G + XN).
// Barras apiladas con tooltip explicando cada componente al hover/tap.
function ComposicionPIB() {
  const partes = [
    { sigla: "C", titulo: "Consumo", valor: 60, color: LIENZO.accent, desc: "Lo que las familias gastan en bienes y servicios" },
    { sigla: "I", titulo: "Inversión", valor: 20, color: LIENZO.ok, desc: "Empresas invirtiendo en capital, construcción, inventarios" },
    { sigla: "G", titulo: "Gasto público", valor: 15, color: LIENZO.warn, desc: "Lo que el Estado compra (no incluye transferencias)" },
    { sigla: "XN", titulo: "Exportaciones netas", valor: 5, color: LIENZO.bad, desc: "Exportaciones menos importaciones" },
  ];
  const [sel, setSel] = useState<number | null>(null);
  const W = 460, H = 60;
  let x = 0;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={150}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W + 10} 140`}
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {partes.map((p, i) => {
            const w = (p.valor / 100) * W;
            const xCur = x; x += w;
            return (
              <g key={i} onClick={() => setSel(i)} style={{ cursor: "pointer" }}>
                <motion.rect x={xCur + 5} y={40} width={w - 2} height={H}
                  fill={p.color} fillOpacity={sel === null || sel === i ? 0.85 : 0.3}
                  stroke={p.color} strokeWidth="2"
                  initial={{ width: 0 }} animate={{ width: w - 2, fillOpacity: sel === null || sel === i ? 0.85 : 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }} />
                <text x={xCur + 5 + (w - 2) / 2} y={70} textAnchor="middle"
                  fontSize="16" fill="#fff" fontWeight="700">{p.sigla}</text>
                <text x={xCur + 5 + (w - 2) / 2} y={90} textAnchor="middle"
                  fontSize="11" fill="#fff" fontWeight="600">{p.valor}%</text>
              </g>
            );
          })}
          {/* Etiqueta arriba */}
          <text x={W / 2 + 5} y={28} textAnchor="middle" fontSize="14"
            fill={LIENZO.fgDim} fontWeight="600">PIB = C + I + G + XN</text>
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgDim, minHeight: 36 }}>
        {sel !== null ? (
          <span>
            <b style={{ color: partes[sel].color }}>{partes[sel].titulo}</b> ({partes[sel].sigla}):
            {" "}{partes[sel].desc}.
          </span>
        ) : (
          <span style={{ fontStyle: "italic", color: LIENZO.fgFaint }}>Tocá un componente para ver qué incluye</span>
        )}
      </div>
    </div>
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>PIB: el termómetro de la economía</Titulo>
      <Definicion termino="PIB (Producto Interno Bruto)">
        Valor total de los <strong>bienes y servicios finales</strong> producidos por una economía dentro de
        sus fronteras durante un período (típicamente un año).
      </Definicion>
      <Parrafo>
        Es el indicador más usado para medir el tamaño de una economía y su crecimiento. Si el PIB sube de un
        año a otro, decimos que la economía creció.
      </Parrafo>
      <Resumen>
        Cuidado con la palabra <strong>"final"</strong>: cuenta solo el bien que llega al consumidor, no los
        insumos intermedios. Si contás todo, contás dos veces (la harina y el pan).
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Formas() {
  return (
    <EscenaRica>
      <Titulo>Tres formas de calcular el PIB</Titulo>
      <Resumen>
        Las tres dan el MISMO número (es la misma torta mirada desde distintos ángulos):<br /><br />
        <strong>1. Enfoque del GASTO:</strong> PIB = C + I + G + XN<br />
        <strong>2. Enfoque del INGRESO:</strong> sueldos + intereses + rentas + utilidades + impuestos.<br />
        <strong>3. Enfoque de la PRODUCCIÓN:</strong> suma del valor agregado en cada sector.
      </Resumen>
      <ComposicionPIB />
      <Ejemplo titulo="Enfoque del gasto en detalle">
        <strong>C</strong> = Consumo de las familias.<br />
        <strong>I</strong> = Inversión (empresas en maquinaria, construcción, inventarios).<br />
        <strong>G</strong> = Gasto del Estado en bienes y servicios.<br />
        <strong>XN</strong> = Exportaciones − Importaciones.
      </Ejemplo>
      <Cuidado>
        En G NO se cuentan las transferencias (jubilaciones, subsidios): no son compra de bienes, son
        redistribución de ingreso.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_Nominal() {
  return (
    <EscenaRica>
      <Titulo>PIB nominal vs. PIB real</Titulo>
      <Definicion termino="PIB nominal">
        Mide la producción a <strong>precios corrientes</strong> (los del año en que se mide).
      </Definicion>
      <Definicion termino="PIB real">
        Mide la producción a <strong>precios constantes</strong> de un año base. Aísla el efecto de la
        inflación.
      </Definicion>
      <Ejemplo>
        Un país producía 100 panes a 5 Bs (PIB nominal = 500). Al año siguiente produce los mismos 100 panes
        pero ahora cuestan 6 Bs.<br /><br />
        PIB nominal nuevo: 600 (subió 20%).<br />
        PIB real (a precios del año base 5 Bs): 500 (no subió). <br /><br />
        <strong>La economía no creció</strong> — lo que subió fueron solo los precios.
      </Ejemplo>
      <PorQue>
        Por eso para comparar el bienestar de un país entre años se usa el PIB REAL: descuenta la inflación
        y muestra el crecimiento verdadero.
      </PorQue>
    </EscenaRica>
  );
}

function Esc04_Inflacion() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Inflación y el IPC</Titulo>
      <Definicion termino="inflación">
        Es el <strong>aumento sostenido del nivel general de precios</strong> en una economía. Reduce el poder
        de compra del dinero.
      </Definicion>
      <Definicion termino="IPC (Índice de Precios al Consumidor)">
        Mide el costo de una "canasta familiar" típica en un mes, comparada con un año base. Es el indicador
        oficial de inflación.
      </Definicion>
      <Resumen>
        <strong>Inflación mensual</strong> = (IPC<sub>actual</sub> − IPC<sub>anterior</sub>) / IPC<sub>anterior</sub> × 100.
      </Resumen>
      <Ejemplo>
        Si el IPC sube de 100 a 105 en un año, la inflación anual es 5%.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05_Desempleo() {
  return (
    <EscenaRica>
      <Titulo>Desempleo y tasa de desempleo</Titulo>
      <Definicion termino="PEA (Población Económicamente Activa)">
        Personas en edad de trabajar que están ocupadas o buscando trabajo activamente. <strong>No</strong>{" "}
        incluye estudiantes, jubilados ni quien no busca empleo.
      </Definicion>
      <Resumen>
        <strong>Tasa de desempleo</strong> = Desocupados / PEA × 100.
      </Resumen>
      <Ejemplo>
        Si la PEA es 5 millones y hay 400 000 desocupados:<br />
        Tasa = 400 000 / 5 000 000 = <strong>8%</strong>.
      </Ejemplo>
      <Cuidado>
        El "ama de casa" que NO busca trabajo no entra en la PEA — por lo tanto no entra como desocupada.
        Esto suele subestimar el desempleo real.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>1.</strong> Comparar PIB nominal entre años distintos. Eso mezcla crecimiento real con
        inflación. Para crecimiento real usá PIB real.
      </Cuidado>
      <Cuidado>
        <strong>2.</strong> Sumar al PIB los bienes intermedios. Eso es contar doble. Solo se cuentan los
        bienes FINALES.
      </Cuidado>
      <Cuidado>
        <strong>3.</strong> Confundir desempleo con "no trabajar". Solo cuenta como desocupado quien BUSCA
        trabajo y no lo encuentra.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc07_Practica() {
  const ejs = useMemo(() => [
    { p: "El PIB mide…", o: [
      "todo lo que produce un país, incluido lo intermedio",
      "el valor de bienes y servicios FINALES producidos en el país",
      "solo lo que exporta",
      "el dinero en circulación",
    ], c: 1, ex: "Definición: bienes y servicios finales producidos dentro de las fronteras." },
    { p: "PIB = C + I + G + XN es el enfoque…", o: ["del gasto", "del ingreso", "de la producción", "del valor agregado"], c: 0, ex: "Suma los gastos finales: C, I, G, exportaciones netas." },
    { p: "Mismo Q, precios subieron. PIB nominal vs real:", o: [
      "Ambos suben",
      "Nominal sube, real no",
      "Real sube, nominal no",
      "Ninguno cambia",
    ], c: 1, ex: "PIB real descuenta inflación: si solo cambian precios, no varía." },
    { p: "Tasa de desempleo = ?", o: [
      "Desocupados / Población total",
      "Desocupados / PEA",
      "Ocupados / PEA",
      "PEA / Población",
    ], c: 1, ex: "Solo entre quienes están en la PEA." },
    { p: "Si el IPC va de 120 a 132, la inflación anual es:", o: ["12%", "10%", "8%", "20%"], c: 1, ex: "(132 − 120) / 120 × 100 = 10%." },
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
            <div style={{ fontSize: 15, color: COLOR_BASE, fontWeight: 600, marginBottom: 12 }}>{e.p}</div>
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
