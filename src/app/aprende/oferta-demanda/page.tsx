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
      unidad="01"
      tituloUnidad="Introducción a la economía"
      escenas={[
        { titulo: "El mercado y los precios", componente: Esc01_Mercado },
        { titulo: "La curva de demanda", componente: Esc02_Demanda },
        { titulo: "La curva de oferta", componente: Esc03_Oferta },
        { titulo: "El precio de equilibrio", componente: Esc04_Equilibrio },
        { titulo: "Exceso de demanda y de oferta", componente: Esc05_Excesos },
        { titulo: "Desplazamientos de las curvas", componente: Esc06_Despl },
        { titulo: "Errores comunes", componente: Esc07_Errores },
        { titulo: "Práctica final", componente: Esc08_Practica },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Plano P-Q reusable: precio en el eje Y, cantidad en el eje X.
// Recibe children con motion para dibujar curvas/líneas/puntos.
// ─────────────────────────────────────────────────────────────────────────────
function PlanoPQ({
  alto = 280, children,
}: { alto?: number; children: React.ReactNode }) {
  const W = 480, H = alto;
  const padL = 46, padR = 18, padT = 18, padB = 38;
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ fontFamily: "var(--font-crimson), serif" }}>
      {/* eje X (Q) */}
      <line x1={padL} y1={H - padB} x2={W - padR + 4} y2={H - padB} stroke={LIENZO.fg} strokeWidth="1.5" />
      <polygon points={`${W - padR + 4},${H - padB} ${W - padR - 4},${H - padB - 5} ${W - padR - 4},${H - padB + 5}`} fill={LIENZO.fg} />
      <text x={W - padR} y={H - padB + 22} fontSize="14" fill={LIENZO.fgDim} fontStyle="italic" textAnchor="end">Q · cantidad</text>
      {/* eje Y (P) */}
      <line x1={padL} y1={H - padB} x2={padL} y2={padT - 4} stroke={LIENZO.fg} strokeWidth="1.5" />
      <polygon points={`${padL},${padT - 4} ${padL - 5},${padT + 4} ${padL + 5},${padT + 4}`} fill={LIENZO.fg} />
      <text x={padL - 4} y={padT - 6} fontSize="14" fill={LIENZO.fgDim} fontStyle="italic" textAnchor="end">P · precio</text>
      {children}
    </svg>
  );
}

// Coordenadas en el plano. P y Q ∈ [0..10].
const padL = 46, padR = 18, padT = 18, padB = 38, W = 480;
const px = (q: number, H: number) => padL + (q / 10) * (W - padL - padR);
const py = (p: number, H: number) => padT + ((10 - p) / 10) * (H - padT - padB);

// Demanda: precio sube → cantidad baja (pendiente negativa).
function CurvaDemandaAnim() {
  const [precio, setPrecio] = useState(5);
  const H = 280;
  const cantidad = 10 - precio; // demanda lineal Q = 10 − P
  const xCurva = (p: number) => px(10 - p, H);
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={H}>
        <PlanoPQ alto={H}>
          {/* curva demanda */}
          <line x1={xCurva(10)} y1={py(10, H)} x2={xCurva(0)} y2={py(0, H)}
            stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
          <text x={xCurva(0) - 6} y={py(0, H) - 6} fontSize="14" fill={LIENZO.accent} fontWeight="600" textAnchor="end">D</text>
          {/* líneas de marca al precio */}
          <motion.line x1={padL} y1={py(precio, H)} x2={px(cantidad, H)} y2={py(precio, H)}
            stroke={LIENZO.fgFaint} strokeWidth="1" strokeDasharray="3 3"
            animate={{ x2: px(cantidad, H), y1: py(precio, H), y2: py(precio, H) }} transition={{ duration: 0.3 }} />
          <motion.line x1={px(cantidad, H)} y1={py(precio, H)} x2={px(cantidad, H)} y2={H - padB}
            stroke={LIENZO.fgFaint} strokeWidth="1" strokeDasharray="3 3"
            animate={{ x1: px(cantidad, H), x2: px(cantidad, H), y1: py(precio, H) }} transition={{ duration: 0.3 }} />
          {/* punto */}
          <motion.circle r="6" fill={LIENZO.accent}
            animate={{ cx: px(cantidad, H), cy: py(precio, H) }} transition={{ duration: 0.3 }} />
        </PlanoPQ>
      </Pizarra>
      <div style={{ fontFamily: "var(--font-crimson), serif", textAlign: "center", fontSize: 16, color: LIENZO.fg }}>
        Si <strong style={{ color: LIENZO.accent }}>P = {precio}</strong> Bs, los consumidores quieren
        <strong style={{ color: LIENZO.accent }}> Q = {cantidad}</strong> unidades.
      </div>
      <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
        Precio
        <input type="range" min={0} max={10} step={1} value={precio}
          onChange={(e) => setPrecio(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.accent }} />
      </label>
    </div>
  );
}

// Oferta: precio sube → cantidad ofrecida sube (pendiente positiva).
function CurvaOfertaAnim() {
  const [precio, setPrecio] = useState(5);
  const H = 280;
  const cantidad = precio; // oferta Q = P
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={H}>
        <PlanoPQ alto={H}>
          <line x1={px(0, H)} y1={py(0, H)} x2={px(10, H)} y2={py(10, H)}
            stroke={LIENZO.ok} strokeWidth="3" strokeLinecap="round" />
          <text x={px(10, H)} y={py(10, H) - 6} fontSize="14" fill={LIENZO.ok} fontWeight="600">O</text>
          <motion.line x1={padL} y1={py(precio, H)} x2={px(cantidad, H)} y2={py(precio, H)}
            stroke={LIENZO.fgFaint} strokeWidth="1" strokeDasharray="3 3"
            animate={{ x2: px(cantidad, H), y1: py(precio, H), y2: py(precio, H) }} transition={{ duration: 0.3 }} />
          <motion.line x1={px(cantidad, H)} y1={py(precio, H)} x2={px(cantidad, H)} y2={H - padB}
            stroke={LIENZO.fgFaint} strokeWidth="1" strokeDasharray="3 3"
            animate={{ x1: px(cantidad, H), x2: px(cantidad, H), y1: py(precio, H) }} transition={{ duration: 0.3 }} />
          <motion.circle r="6" fill={LIENZO.ok}
            animate={{ cx: px(cantidad, H), cy: py(precio, H) }} transition={{ duration: 0.3 }} />
        </PlanoPQ>
      </Pizarra>
      <div style={{ fontFamily: "var(--font-crimson), serif", textAlign: "center", fontSize: 16, color: LIENZO.fg }}>
        Si <strong style={{ color: LIENZO.ok }}>P = {precio}</strong> Bs, los productores ofrecen
        <strong style={{ color: LIENZO.ok }}> Q = {cantidad}</strong> unidades.
      </div>
      <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
        Precio
        <input type="range" min={0} max={10} step={1} value={precio}
          onChange={(e) => setPrecio(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.ok }} />
      </label>
    </div>
  );
}

// Equilibrio: ambas curvas juntas. Slider de precio para mostrar exceso/déficit.
function EquilibrioAnim() {
  const [precio, setPrecio] = useState(7); // empieza arriba del equilibrio
  const H = 300;
  const Qd = 10 - precio;
  const Qo = precio;
  const tipo = precio === 5 ? "equilibrio" : precio > 5 ? "exceso-of" : "exceso-dem";
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={H}>
        <PlanoPQ alto={H}>
          {/* Curvas */}
          <line x1={px(10, H)} y1={py(0, H)} x2={px(0, H)} y2={py(10, H)}
            stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
          <text x={px(10, H) - 4} y={py(0, H) - 6} fontSize="14" fill={LIENZO.accent} fontWeight="600" textAnchor="end">D</text>
          <line x1={px(0, H)} y1={py(0, H)} x2={px(10, H)} y2={py(10, H)}
            stroke={LIENZO.ok} strokeWidth="3" strokeLinecap="round" />
          <text x={px(10, H) - 4} y={py(10, H) - 6} fontSize="14" fill={LIENZO.ok} fontWeight="600" textAnchor="end">O</text>
          {/* Marca de equilibrio */}
          <circle cx={px(5, H)} cy={py(5, H)} r="6" fill={LIENZO.fg} />
          <text x={px(5, H) + 9} y={py(5, H) - 6} fontSize="11" fill={LIENZO.fgDim} fontStyle="italic">equilibrio</text>
          {/* Línea horizontal del precio actual */}
          <motion.line x1={padL} x2={W - padR} y1={py(precio, H)} y2={py(precio, H)}
            stroke={LIENZO.fgDim} strokeWidth="1.5" strokeDasharray="4 4"
            animate={{ y1: py(precio, H), y2: py(precio, H) }} transition={{ duration: 0.3 }} />
          {/* Brecha entre Qd y Qo a este precio */}
          {tipo !== "equilibrio" && (
            <motion.line
              x1={Math.min(px(Qd, H), px(Qo, H))} x2={Math.max(px(Qd, H), px(Qo, H))}
              y1={py(precio, H)} y2={py(precio, H)}
              stroke={tipo === "exceso-of" ? LIENZO.bad : LIENZO.warn} strokeWidth="6" strokeLinecap="round"
              animate={{
                x1: Math.min(px(Qd, H), px(Qo, H)), x2: Math.max(px(Qd, H), px(Qo, H)),
                y1: py(precio, H), y2: py(precio, H),
              }} transition={{ duration: 0.3 }} />
          )}
          {/* Puntos Qd y Qo */}
          <motion.circle r="5" fill={LIENZO.accent}
            animate={{ cx: px(Qd, H), cy: py(precio, H) }} transition={{ duration: 0.3 }} />
          <motion.circle r="5" fill={LIENZO.ok}
            animate={{ cx: px(Qo, H), cy: py(precio, H) }} transition={{ duration: 0.3 }} />
        </PlanoPQ>
      </Pizarra>
      <div style={{ fontFamily: "var(--font-crimson), serif", textAlign: "center", fontSize: 16, color: LIENZO.fg }}>
        <strong>P = {precio}</strong> · Q<sub>D</sub> = {Qd} · Q<sub>O</sub> = {Qo}
        <br />
        {tipo === "equilibrio" && <span style={{ color: LIENZO.fg, fontWeight: 700 }}>Equilibrio · el mercado se vacía</span>}
        {tipo === "exceso-of" && <span style={{ color: LIENZO.bad }}>Exceso de oferta — el precio tenderá a BAJAR</span>}
        {tipo === "exceso-dem" && <span style={{ color: LIENZO.warn }}>Exceso de demanda — el precio tenderá a SUBIR</span>}
      </div>
      <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
        Precio impuesto
        <input type="range" min={1} max={9} step={1} value={precio}
          onChange={(e) => setPrecio(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.fg }} />
      </label>
    </div>
  );
}

function Esc01_Mercado() {
  return (
    <EscenaRica>
      <Titulo>El mercado: donde se encuentran compradores y vendedores</Titulo>
      <Definicion termino="mercado">
        Es el espacio (físico o virtual) donde <strong>compradores</strong> (demanda) y <strong>vendedores</strong>{" "}
        (oferta) se encuentran y se fijan los <strong>precios</strong>.
      </Definicion>
      <Parrafo>
        La pregunta clave: <strong>¿por qué un kilo de pan cuesta lo que cuesta?</strong> La respuesta está en el
        cruce entre cuánto quieren los consumidores y cuánto están dispuestos a producir los productores. Eso lo
        capturan las curvas de oferta y demanda.
      </Parrafo>
      <Resumen>
        En esta lección verás:<br />
        • Cómo se ve la <strong>demanda</strong> en un gráfico (P vs Q).<br />
        • Cómo se ve la <strong>oferta</strong>.<br />
        • Dónde se cruzan: el <strong>precio de equilibrio</strong>.<br />
        • Qué pasa cuando el precio NO está en equilibrio.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Demanda() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>La curva de demanda</Titulo>
      <Definicion termino="demanda">
        Relación entre el <strong>precio</strong> de un bien y la <strong>cantidad</strong> que los consumidores
        están dispuestos a comprar.
      </Definicion>
      <Resumen>
        <strong>Ley de la demanda:</strong> si el precio sube, la cantidad demandada baja (y al revés). Por eso
        la curva tiene <strong>pendiente negativa</strong>.
      </Resumen>
      <CurvaDemandaAnim />
      <PorQue>
        A mayor precio, menos gente se anima a comprar (otros productos se vuelven más atractivos, o el
        presupuesto no alcanza). A menor precio, más gente entra al mercado.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03_Oferta() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>La curva de oferta</Titulo>
      <Definicion termino="oferta">
        Relación entre el <strong>precio</strong> de un bien y la <strong>cantidad</strong> que los productores
        están dispuestos a vender.
      </Definicion>
      <Resumen>
        <strong>Ley de la oferta:</strong> si el precio sube, los productores ofrecen MÁS (la actividad se vuelve
        más rentable). Por eso la oferta tiene <strong>pendiente positiva</strong>.
      </Resumen>
      <CurvaOfertaAnim />
      <PorQue>
        Un precio alto hace que más productores quieran entrar al mercado y que los existentes amplíen su
        producción. Un precio bajo hace lo contrario: muchos abandonan o producen menos.
      </PorQue>
    </EscenaRica>
  );
}

function Esc04_Equilibrio() {
  return (
    <EscenaRica>
      <Titulo>El precio de equilibrio</Titulo>
      <Definicion termino="equilibrio">
        Es el precio donde la <strong>cantidad ofrecida</strong> es igual a la <strong>cantidad demandada</strong>.
        Gráficamente, donde se <strong>cruzan</strong> las curvas.
      </Definicion>
      <Parrafo>
        Es el único precio en el que el mercado "se vacía": no sobra ni falta producto. Movés el slider y el
        precio se aleja del equilibrio: aparece la brecha.
      </Parrafo>
      <EquilibrioAnim />
      <Resumen>
        El mercado tiende naturalmente hacia el equilibrio: si hay <strong>exceso de oferta</strong>, los
        vendedores bajan el precio; si hay <strong>exceso de demanda</strong>, los compradores empujan el precio
        hacia arriba.
      </Resumen>
    </EscenaRica>
  );
}

function Esc05_Excesos() {
  return (
    <EscenaRica>
      <Titulo>Cuando el precio está fuera del equilibrio</Titulo>
      <Ejemplo titulo="Exceso de oferta (precio demasiado alto)">
        Los productores quieren vender más de lo que los consumidores compran. Se acumulan stocks → los
        vendedores <strong>bajan el precio</strong> para liquidar.
      </Ejemplo>
      <Ejemplo titulo="Exceso de demanda (precio demasiado bajo)">
        Los consumidores quieren comprar más de lo que hay. Se forman colas o se agota → los compradores
        ofrecen <strong>más dinero</strong> y el precio sube.
      </Ejemplo>
      <PorQue>
        Por eso, en mercados libres y sin trabas, el precio se "auto-regula" hacia el equilibrio. Esta es la
        idea de la <em>"mano invisible"</em> de Adam Smith.
      </PorQue>
      <Cuidado>
        Cuando un gobierno fija un precio por encima del equilibrio (precio máximo bajo), aparece escasez.
        Si lo fija por debajo, aparecen excedentes.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_Despl() {
  return (
    <EscenaRica>
      <Titulo>Movimiento ≠ desplazamiento de la curva</Titulo>
      <Resumen>
        Hay que distinguir dos cosas:<br /><br />
        <strong>1. Movimiento SOBRE la curva</strong> — el precio cambia, te movés sobre la misma curva. La
        relación no cambia, solo el punto.<br /><br />
        <strong>2. Desplazamiento de la curva</strong> — la curva ENTERA se mueve a la derecha o izquierda. Esto
        pasa cuando cambia algo distinto al precio.
      </Resumen>
      <Ejemplo titulo="¿Qué desplaza la DEMANDA?">
        • Cambia el ingreso de la gente (más sueldos → demanda sube).<br />
        • Cambia el precio de un bien relacionado (sube el precio del té → sube la demanda de café).<br />
        • Cambian los gustos o la moda.<br />
        • Cambia la expectativa de precio futuro.
      </Ejemplo>
      <Ejemplo titulo="¿Qué desplaza la OFERTA?">
        • Cambian los costos de producción (sube el combustible → oferta baja).<br />
        • Cambia la tecnología (mejor tecnología → oferta sube).<br />
        • Cambian impuestos o subsidios.<br />
        • Cambia el número de productores.
      </Ejemplo>
      <AutoCheck
        pregunta="Sube el costo de la harina. ¿Qué pasa con el mercado del pan?"
        opciones={[
          "La demanda se mueve a la izquierda",
          "La oferta se mueve a la izquierda",
          "Solo cambia el precio, las curvas se quedan",
          "No pasa nada",
        ]}
        correctaIdx={1}
        explicacion="Un costo más alto reduce la oferta a cada precio: la curva O se desplaza a la izquierda. El precio de equilibrio sube y la cantidad baja."
      />
    </EscenaRica>
  );
}

function Esc07_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>1.</strong> Confundir movimiento sobre la curva con desplazamiento. Si cambió el PRECIO, te
        movés sobre la misma curva. Si cambió otra cosa, la curva entera se mueve.
      </Cuidado>
      <Cuidado>
        <strong>2.</strong> Pensar que demanda y "cantidad demandada" son lo mismo. La demanda es la curva
        ENTERA; la cantidad demandada es UN punto a un precio dado.
      </Cuidado>
      <Cuidado>
        <strong>3.</strong> Creer que un precio fijado por ley funciona como el de equilibrio. Casi siempre
        genera escasez o excedentes.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "La ley de la demanda dice que si P sube…", o: ["Q sube", "Q baja", "Q no cambia", "Sube la oferta"], c: 1, ex: "Pendiente negativa: precio y cantidad demandada se mueven en sentidos opuestos." },
    { p: "La curva de oferta tiene pendiente…", o: ["positiva", "negativa", "cero", "indefinida"], c: 0, ex: "A más precio, los productores ofrecen más." },
    { p: "Si el precio está POR ENCIMA del equilibrio:", o: ["Exceso de demanda", "Exceso de oferta", "Equilibrio", "Mercado libre"], c: 1, ex: "Productores quieren vender más de lo que la gente compra: exceso de oferta." },
    { p: "Mejora la tecnología de producción del bien X. ¿Qué pasa?", o: [
      "Demanda se mueve a la derecha",
      "Demanda se mueve a la izquierda",
      "Oferta se mueve a la derecha",
      "Oferta se mueve a la izquierda",
    ], c: 2, ex: "Costos más bajos: a cada precio se ofrece más. La oferta se desplaza a la derecha." },
    { p: "En el equilibrio, Q ofrecida es…", o: ["mayor a Q demandada", "menor", "igual", "no comparable"], c: 2, ex: "Equilibrio = el mercado se vacía: ambas cantidades son iguales." },
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
