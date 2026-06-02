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
        { titulo: "¿Qué es la economía?", componente: Esc01_Intro },
        { titulo: "Necesidades y escasez", componente: Esc02_Escasez },
        { titulo: "Costo de oportunidad", componente: Esc03_CostoOp },
        { titulo: "Bienes económicos y libres", componente: Esc04_Bienes },
        { titulo: "Las 3 preguntas de la economía", componente: Esc05_Preguntas },
        { titulo: "Micro vs. macro", componente: Esc06_MicroMacro },
        { titulo: "Errores comunes", componente: Esc07_Errores },
        { titulo: "Práctica final", componente: Esc08_Practica },
      ]}
    />
  );
}

// Animación: balanza de necesidades infinitas vs. recursos limitados.
// Tocar inclina la balanza, mostrando que la escasez fuerza a elegir.
function BalanzaEscasez() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={200} onClick={() => setOn((v) => !v)}>
        <svg width="100%" height="100%" viewBox="0 0 480 200"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Base */}
          <line x1="240" x2="240" y1="50" y2="160" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="210" x2="270" y1="160" y2="160" stroke={LIENZO.fg} strokeWidth="2" />
          {/* Barra giratoria */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: on ? 18 : 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            style={{ transformOrigin: "240px 50px" }}
          >
            <line x1="100" x2="380" y1="50" y2="50" stroke={LIENZO.fg} strokeWidth="3" strokeLinecap="round" />
            {/* Plato izquierdo (necesidades = pesado) */}
            <line x1="110" x2="110" y1="50" y2="80" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="60" y="80" width="100" height="40" rx="6"
              fill={LIENZO.accent} fillOpacity="0.18" stroke={LIENZO.accent} strokeWidth="2" />
            <text x="110" y="105" textAnchor="middle" fontSize="13"
              fill={LIENZO.accent} fontWeight="600">Necesidades</text>
            <text x="110" y="118" textAnchor="middle" fontSize="10" fill={LIENZO.accent}>infinitas</text>
            {/* Plato derecho (recursos = ligero) */}
            <line x1="370" x2="370" y1="50" y2="80" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="320" y="80" width="100" height="40" rx="6"
              fill={LIENZO.ok} fillOpacity="0.18" stroke={LIENZO.ok} strokeWidth="2" />
            <text x="370" y="105" textAnchor="middle" fontSize="13"
              fill={LIENZO.ok} fontWeight="600">Recursos</text>
            <text x="370" y="118" textAnchor="middle" fontSize="10" fill={LIENZO.ok}>limitados</text>
          </motion.g>
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim }}>
        {on
          ? <>Las necesidades pesan más → <b style={{ color: LIENZO.accent }}>escasez</b>. Por eso hay que elegir.</>
          : <span style={{ fontStyle: "italic", color: LIENZO.fgFaint }}>Tocá la balanza</span>}
      </div>
    </div>
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Economía: la ciencia de la escasez</Titulo>
      <Definicion termino="economía">
        Es la ciencia que estudia cómo las personas y la sociedad <strong>asignan recursos escasos</strong> para
        satisfacer necesidades que son ilimitadas.
      </Definicion>
      <Parrafo>
        Cada vez que decidís comprar algo, estudiar tal carrera o un país define su presupuesto,
        están funcionando los principios económicos.
      </Parrafo>
      <Resumen>
        En esta lección verás: <br />
        • Por qué existe la economía (necesidades vs. recursos). <br />
        • Qué es el <strong>costo de oportunidad</strong>. <br />
        • Las <strong>3 preguntas</strong> que toda sociedad responde. <br />
        • La diferencia entre micro y macroeconomía.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Escasez() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>Necesidades infinitas, recursos finitos</Titulo>
      <Parrafo>
        Las personas <strong>siempre</strong> quieren más cosas (comer mejor, viajar, estudiar, descansar).
        Pero el mundo solo tiene <strong>una cantidad limitada</strong> de tiempo, dinero, tierra, mano de obra
        y materias primas.
      </Parrafo>
      <BalanzaEscasez />
      <Definicion termino="escasez">
        La <strong>escasez</strong> es el problema económico fundamental: hay menos recursos de los necesarios
        para cubrir todos los deseos. Por eso la economía existe.
      </Definicion>
      <PorQue>
        Sin escasez no habría economía. Si todo fuera infinito, no haría falta elegir, fijar precios ni
        organizar la producción.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03_CostoOp() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Costo de oportunidad</Titulo>
      <Definicion termino="costo de oportunidad">
        Es <strong>el valor de la mejor alternativa</strong> que dejás de lado al tomar una decisión.
      </Definicion>
      <Ejemplo titulo="Decidís estudiar en vez de trabajar">
        <Paso n={1}>Trabajando ganarías 2000 Bs/mes.</Paso>
        <Paso n={2}>Elegís estudiar. Tu costo de oportunidad es <strong>2000 Bs/mes</strong>: lo que dejás de ganar.</Paso>
        <Paso n={3}>El estudio "no es gratis" — su costo real es la matrícula <em>más</em> esos 2000 Bs.</Paso>
      </Ejemplo>
      <Ejemplo titulo="Bolivia decide construir un hospital">
        El costo de oportunidad puede ser la escuela, el camino o el subsidio que NO se construyó con ese dinero.
      </Ejemplo>
      <Cuidado>
        El costo de oportunidad <strong>no siempre es plata</strong>: también puede ser tiempo, comodidad o
        cualquier alternativa que se descarta.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc04_Bienes() {
  return (
    <EscenaRica>
      <Titulo>Bienes económicos vs. bienes libres</Titulo>
      <Definicion termino="bien económico">
        Aquel que es <strong>escaso</strong>, requiere esfuerzo para obtenerlo y tiene precio. Ej: el pan, una
        computadora, un servicio de internet.
      </Definicion>
      <Definicion termino="bien libre">
        Aquel disponible <strong>en cantidad ilimitada</strong> sin esfuerzo, por lo que no tiene precio.
        Ej: el aire que respiramos, la luz solar.
      </Definicion>
      <Resumen>
        Casi todo lo que estudia la economía son <strong>bienes económicos</strong>. Los bienes libres son la
        excepción.
      </Resumen>
      <Cuidado>
        El agua potable es un bien <em>económico</em> (cuesta tratarla y distribuirla). El agua de lluvia es
        un bien <em>libre</em>. Mucha gente confunde estos casos.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc05_Preguntas() {
  return (
    <EscenaRica>
      <Titulo>Las 3 preguntas que toda economía responde</Titulo>
      <Resumen>
        Toda sociedad, por simple o desarrollada que sea, debe contestar:<br /><br />
        <strong>1. ¿QUÉ producir?</strong> — ¿qué bienes y servicios, en qué cantidad?<br />
        <strong>2. ¿CÓMO producirlo?</strong> — ¿con qué tecnología, con qué combinación de trabajo y capital?<br />
        <strong>3. ¿PARA QUIÉN producir?</strong> — ¿cómo se distribuye lo producido?
      </Resumen>
      <PorQue>
        La forma de responder estas 3 preguntas define el <strong>sistema económico</strong>: mercado,
        planificación central o mixto.
      </PorQue>
      <Ejemplo>
        • <strong>Mercado</strong>: lo deciden la oferta y la demanda (precios). <br />
        • <strong>Planificación central</strong>: lo decide el Estado.<br />
        • <strong>Mixto</strong>: combinación (lo usual en países reales, incluido Bolivia).
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc06_MicroMacro() {
  return (
    <EscenaRica>
      <Titulo>Microeconomía vs. macroeconomía</Titulo>
      <Definicion termino="microeconomía">
        Estudia el comportamiento <strong>individual</strong>: consumidores, empresas, un mercado en particular.
      </Definicion>
      <Definicion termino="macroeconomía">
        Estudia el funcionamiento de la economía <strong>como un todo</strong>: PIB, inflación, desempleo,
        crecimiento del país.
      </Definicion>
      <Ejemplo>
        <strong>Micro</strong>: ¿por qué subió el precio del pollo en La Paz?<br />
        <strong>Macro</strong>: ¿por qué subió el PIB de Bolivia este año?
      </Ejemplo>
      <AutoCheck
        pregunta="Un estudio sobre el desempleo nacional de Bolivia es:"
        opciones={["Microeconomía", "Macroeconomía", "Contabilidad", "Marketing"]}
        correctaIdx={1}
        explicacion="El desempleo a nivel país es un fenómeno agregado: corresponde a macroeconomía."
      />
    </EscenaRica>
  );
}

function Esc07_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>1.</strong> Pensar que el costo de oportunidad es siempre dinero. Puede ser tiempo, espacio,
        salud o cualquier alternativa.
      </Cuidado>
      <Cuidado>
        <strong>2.</strong> Decir que el aire es un bien económico. El aire puro y abundante es un bien libre;
        el oxígeno embotellado sí es económico.
      </Cuidado>
      <Cuidado>
        <strong>3.</strong> Confundir micro con macro. Si hablás del precio de UN producto o de UNA empresa,
        es micro; si hablás de TODA la economía, es macro.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "La escasez existe porque…", o: [
      "los recursos son ilimitados",
      "las necesidades son ilimitadas y los recursos limitados",
      "el gobierno controla los precios",
      "la economía es una ciencia",
    ], c: 1, ex: "Recursos limitados frente a necesidades ilimitadas: ese es el problema económico." },
    { p: "Decidís ir al cine en vez de estudiar. El costo de oportunidad es:", o: [
      "el precio de la entrada",
      "el tiempo + el aprendizaje que dejás de ganar",
      "cero, porque no es dinero",
      "el valor del cine",
    ], c: 1, ex: "Es la mejor alternativa que descartás: el estudio (tiempo y aprendizaje)." },
    { p: "El aire que respirás normalmente es un bien…", o: ["económico", "libre", "intermedio", "público"], c: 1, ex: "Está disponible en cantidad ilimitada sin esfuerzo: bien libre." },
    { p: "¿Cuál NO es una de las 3 preguntas básicas?", o: ["¿Qué producir?", "¿Cómo producir?", "¿Para quién producir?", "¿Cuándo vender?"], c: 3, ex: "Las 3 preguntas son: qué, cómo y para quién producir." },
    { p: "Un análisis del PIB de Bolivia es…", o: ["Microeconomía", "Macroeconomía", "Estadística", "Contabilidad"], c: 1, ex: "El PIB es un agregado a nivel país: corresponde a macroeconomía." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;
  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 preguntas para fijar los conceptos:</Parrafo>
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
          <div style={{ fontSize: 14, color: LIENZO.fgDim, marginTop: 6 }}>
            {ok === ejs.length && "Dominás los conceptos de introducción."}
            {ok < ejs.length && "Repasá la definición de escasez y costo de oportunidad."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
