"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, Ejes, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Introducción general a la ciencia económica"
      escenas={[
        { titulo: "¿Por qué usar modelos?", componente: Esc01 },
        { titulo: "Modelo 1 · Flujo circular", componente: Esc02 },
        { titulo: "Recorrido de un billete", componente: Esc03 },
        { titulo: "Modelo 2 · Frontera de posibilidades (FPP)", componente: Esc04 },
        { titulo: "Costo de oportunidad creciente", componente: Esc05 },
        { titulo: "Lo que la FPP nos muestra", componente: Esc06 },
        { titulo: "Práctica final", componente: Esc07 },
      ]}
    />
  );
}

// Flujo circular: familias y empresas en dos mercados (bienes y factores).
function FlujoCircular() {
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={320}>
        <svg width="100%" height="100%" viewBox="0 0 480 320"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Empresas */}
          <rect x="40" y="120" width="120" height="80" rx="10"
            fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
          <text x="100" y="155" textAnchor="middle" fontSize="14" fill={LIENZO.fg} fontWeight="700">Empresas</text>
          <text x="100" y="175" textAnchor="middle" fontSize="10" fill={LIENZO.fgDim}>producen</text>
          {/* Familias */}
          <rect x="320" y="120" width="120" height="80" rx="10"
            fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
          <text x="380" y="155" textAnchor="middle" fontSize="14" fill={LIENZO.fg} fontWeight="700">Familias</text>
          <text x="380" y="175" textAnchor="middle" fontSize="10" fill={LIENZO.fgDim}>consumen</text>
          {/* Mercado de bienes y servicios (arriba) */}
          <rect x="180" y="30" width="120" height="50" rx="10"
            fill={LIENZO.accent} fillOpacity="0.12" stroke={LIENZO.accent} strokeWidth="2" />
          <text x="240" y="50" textAnchor="middle" fontSize="11" fill={LIENZO.accent} fontWeight="700">Mercado de</text>
          <text x="240" y="65" textAnchor="middle" fontSize="11" fill={LIENZO.accent} fontWeight="700">bienes y servicios</text>
          {/* Mercado de factores (abajo) */}
          <rect x="180" y="240" width="120" height="50" rx="10"
            fill={LIENZO.ok} fillOpacity="0.12" stroke={LIENZO.ok} strokeWidth="2" />
          <text x="240" y="260" textAnchor="middle" fontSize="11" fill={LIENZO.ok} fontWeight="700">Mercado de</text>
          <text x="240" y="275" textAnchor="middle" fontSize="11" fill={LIENZO.ok} fontWeight="700">factores de producción</text>
          {/* Flechas arriba */}
          <motion.path d="M 160 130 Q 180 70 200 60" stroke={LIENZO.accent} strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
          <motion.path d="M 280 60 Q 300 70 320 130" stroke={LIENZO.accent} strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
          <text x="180" y="100" textAnchor="middle" fontSize="9" fill={LIENZO.accent}>bienes vendidos</text>
          <text x="300" y="100" textAnchor="middle" fontSize="9" fill={LIENZO.accent}>$ pagados</text>
          {/* Flechas abajo */}
          <motion.path d="M 320 190 Q 300 250 280 260" stroke={LIENZO.ok} strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.4 }} />
          <motion.path d="M 200 260 Q 180 250 160 190" stroke={LIENZO.ok} strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
          <text x="300" y="220" textAnchor="middle" fontSize="9" fill={LIENZO.ok}>trabajo, tierra, capital</text>
          <text x="180" y="220" textAnchor="middle" fontSize="9" fill={LIENZO.ok}>$ sueldos, alquileres</text>
        </svg>
      </Pizarra>
    </div>
  );
}

// Frontera de posibilidades de producción cóncava: autos vs computadoras.
function FPP() {
  const [punto, setPunto] = useState<"A" | "B" | "C" | "D">("A");
  const W = 380, H = 280, padL = 50, padR = 24, padT = 24, padB = 50;
  const sx = (x: number) => padL + (x / 1000) * (W - padL - padR);
  const sy = (y: number) => padT + ((3000 - y) / 3000) * (H - padT - padB);
  // Frontera cóncava
  const N = 30;
  const ptsFront: string[] = [];
  for (let k = 0; k <= N; k++) {
    const t = k / N;
    // x va de 0 a 1000; y depende cóncavamente
    const x = 1000 * t;
    const y = 3000 * Math.sqrt(1 - t * t);
    ptsFront.push(`${sx(x)},${sy(y)}`);
  }
  const puntos = {
    A: { x: 600, y: 2200, color: LIENZO.fg, etiqueta: "A · sobre la frontera (eficiente)" },
    B: { x: 700, y: 2000, color: LIENZO.fg, etiqueta: "B · también eficiente" },
    C: { x: 900, y: 2400, color: LIENZO.bad, etiqueta: "C · inalcanzable (afuera)" },
    D: { x: 300, y: 1000, color: LIENZO.warn, etiqueta: "D · ineficiente (adentro)" },
  };
  const p = puntos[punto];
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={H}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W + 10} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Ejes */}
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke={LIENZO.fg} strokeWidth="1.5" />
          <line x1={padL} y1={H - padB} x2={padL} y2={padT} stroke={LIENZO.fg} strokeWidth="1.5" />
          <text x={W - padR} y={H - padB + 28} fontSize="11" fill={LIENZO.fgDim} textAnchor="end">Automóviles</text>
          <text x={padL - 4} y={padT - 4} fontSize="11" fill={LIENZO.fgDim} textAnchor="end">Computadoras</text>
          {/* Frontera */}
          <polyline points={ptsFront.join(" ")} fill="none" stroke={LIENZO.accent} strokeWidth="3" />
          {/* Punto activo */}
          <motion.circle cx={sx(p.x)} cy={sy(p.y)} r="7" fill={p.color}
            animate={{ cx: sx(p.x), cy: sy(p.y), fill: p.color }}
            transition={{ duration: 0.4 }} />
          <motion.text fontSize="14" fill={p.color} fontWeight="700"
            animate={{ x: sx(p.x) + 12, y: sy(p.y) - 6 }} transition={{ duration: 0.4 }}>
            {punto}
          </motion.text>
        </svg>
      </Pizarra>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        {(["A", "B", "C", "D"] as const).map((k) => (
          <button key={k} onClick={() => setPunto(k)}
            style={{
              padding: "6px 14px", borderRadius: 999, fontSize: 13, fontWeight: 600,
              fontFamily: "var(--font-crimson), serif", cursor: "pointer",
              background: punto === k ? LIENZO.fg : "transparent",
              color: punto === k ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${punto === k ? LIENZO.fg : LIENZO.fgFaint}`,
            }}>Punto {k}</button>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 14, color: p.color, fontWeight: 600 }}>
        {p.etiqueta}
      </div>
    </div>
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Por qué los economistas usan modelos?</Titulo>
      <Parrafo>
        Los profesores de biología enseñan anatomía con réplicas plásticas del cuerpo: omiten detalles,
        pero permiten ver lo importante. Los economistas hacen lo mismo, pero con <strong>diagramas y
        ecuaciones</strong>.
      </Parrafo>
      <Definicion termino="modelo económico">
        Representación simplificada de la realidad. Se basa en <strong>supuestos</strong> (como los físicos
        suponen "sin fricción") para enfocarse en lo esencial.
      </Definicion>
      <PorQue>
        La economía real es enormemente compleja. Los modelos permiten aprender el funcionamiento del
        sistema sin perderse en infinitos detalles. Veremos los dos más clásicos.
      </PorQue>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Modelo 1 · El diagrama de flujo circular</Titulo>
      <Parrafo>
        La economía está formada por millones de personas. El flujo circular simplifica todo en dos
        actores: <strong>familias</strong> y <strong>empresas</strong>, que interactúan en dos mercados.
      </Parrafo>
      <FlujoCircular />
      <Resumen>
        <strong>Mercado de bienes y servicios</strong> (arriba): las empresas venden, las familias
        compran.<br />
        <strong>Mercado de factores de producción</strong> (abajo): las familias venden trabajo, tierra y
        capital; las empresas pagan sueldos, alquileres y dividendos.
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>Recorrido de un billete</Titulo>
      <Parrafo>
        Imaginemos un billete que circula:
      </Parrafo>
      <Resumen>
        <strong>1.</strong> Sale del bolsillo de una familia para comprar un café.<br />
        <strong>2.</strong> Entra a la caja de la cafetería: se vuelve <strong>ingreso</strong>.<br />
        <strong>3.</strong> La cafetería paga el alquiler del local o el sueldo de sus empleados.<br />
        <strong>4.</strong> El billete vuelve al bolsillo de una familia.<br /><br />
        Y el ciclo empieza otra vez.
      </Resumen>
      <PorQue>
        Por eso el diagrama se llama <em>circular</em>: el dinero y los bienes/factores circulan
        continuamente entre familias y empresas, a través de los dos mercados.
      </PorQue>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Modelo 2 · Frontera de posibilidades de producción (FPP)</Titulo>
      <Definicion termino="FPP">
        Gráfica que muestra las distintas combinaciones de producción que la economía puede lograr,
        dados los recursos y la tecnología disponibles.
      </Definicion>
      <Parrafo>
        Supongamos que una economía produce solo dos bienes: <strong>autos</strong> y <strong>computadoras</strong>.
        Tocá los botones para ver qué significa cada punto.
      </Parrafo>
      <FPP />
      <Resumen>
        • Puntos <strong>sobre la curva</strong> = producción <strong>eficiente</strong> (A, B).<br />
        • Puntos <strong>afuera</strong> = imposibles con los recursos actuales (C).<br />
        • Puntos <strong>adentro</strong> = ineficientes — se podría producir más sin renunciar a nada (D).
      </Resumen>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>¿Por qué la FPP es cóncava?</Titulo>
      <Parrafo>
        Si la economía está produciendo muchas computadoras (punto F en la guía), los recursos especiales
        para fabricar autos están subutilizados. Pasarse a producir un auto extra cuesta <strong>poco
        sacrificio</strong> de computadoras.
      </Parrafo>
      <Parrafo>
        En el otro extremo (punto E), si ya producimos muchos autos, todavía hay técnicos buenos
        especialistas en computadoras que estamos forzando a fabricar autos. Pasar uno más a autos cuesta
        <strong> mucho sacrificio</strong>.
      </Parrafo>
      <Resumen>
        Por eso la curva es cóncava: el <strong>costo de oportunidad NO es constante</strong>. Crece a
        medida que nos especializamos en uno de los dos bienes.
      </Resumen>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Las cinco ideas que muestra la FPP</Titulo>
      <Resumen>
        <strong>1. Escasez</strong> — puntos fuera de la curva son inalcanzables.<br />
        <strong>2. Disyuntivas</strong> — para producir más de un bien hay que producir menos del otro.<br />
        <strong>3. Costo de oportunidad</strong> — la pendiente de la frontera en cada punto.<br />
        <strong>4. Eficiencia</strong> — solo los puntos sobre la frontera son eficientes.<br />
        <strong>5. Crecimiento económico</strong> — un avance tecnológico desplaza la curva hacia afuera.
      </Resumen>
      <PorQue>
        La FPP es un modelo simple pero potentísimo: en un solo gráfico cabe casi toda la introducción a
        la ciencia económica.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Los dos actores del flujo circular son:", o: [
          "gobierno y bancos",
          "familias y empresas",
          "exportadores e importadores",
          "consumidores y productores agrícolas",
        ], c: 1, ex: "Modelo simple: familias y empresas en dos mercados." },
        { p: "En el mercado de factores:", o: [
          "las empresas venden bienes",
          "las familias venden trabajo, tierra, capital",
          "el gobierno fija los precios",
          "no circula dinero",
        ], c: 1, ex: "Las familias son las VENDEDORAS de factores; las empresas, las compradoras." },
        { p: "Un punto FUERA de la FPP representa:", o: [
          "eficiencia máxima",
          "una situación inalcanzable hoy",
          "ineficiencia",
          "equilibrio óptimo",
        ], c: 1, ex: "Los recursos actuales no alcanzan: imposible con la tecnología vigente." },
        { p: "Un punto ADENTRO de la FPP indica:", o: [
          "imposibilidad",
          "ineficiencia (se podría producir más)",
          "el óptimo",
          "el punto de equilibrio del mercado",
        ], c: 1, ex: "Hay recursos ociosos: se puede producir más sin renunciar a otra cosa." },
        { p: "La FPP es cóncava (curva, no recta) porque:", o: [
          "es una convención gráfica",
          "los recursos no son igualmente productivos en ambos usos",
          "siempre hay desempleo",
          "el costo de oportunidad es fijo",
        ], c: 1, ex: "El costo de oportunidad aumenta a medida que especializamos en un bien." },
      ]} />
    </EscenaRica>
  );
}
