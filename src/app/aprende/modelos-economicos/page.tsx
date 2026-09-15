"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, Ejes, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion,
  WorkedExample, MiniQuiz,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Introducción general a la ciencia económica"
      escenas={[
        { titulo: "¿Por qué usar modelos?", componente: Esc01 },
        { titulo: "Modelo 1 · Flujo circular", componente: Esc02 },
        { titulo: "Recorrido de un billete · 50 Bs en Cocha", componente: Esc03 },
        { titulo: "Modelo 2 · Frontera de posibilidades (FPP)", componente: Esc04 },
        { titulo: "Caso resuelto · FPP boliviana (gas vs alimentos)", componente: Esc04b },
        { titulo: "Costo de oportunidad creciente", componente: Esc05 },
        { titulo: "Las 5 ideas que muestra la FPP", componente: Esc06 },
        { titulo: "Crecimiento económico · cómo se mueve la FPP", componente: Esc06b },
        { titulo: "Mnemotecnia + errores típicos", componente: EscMnemo },
        { titulo: "Práctica final", componente: Esc07 },
      ]}
    />
  );
}

// Flujo circular: familias y empresas en dos mercados (bienes y factores).
// Cada mercado tiene DOS flujos en sentidos opuestos: BIENES/FACTORES por un
// lado (violeta arriba / verde abajo) y DINERO por el otro (gris). Esa es la
// idea de "circular": todo lo que va, vuelve por el otro carril.
function FlujoCircular() {
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={360}>
        <svg width="100%" height="100%" viewBox="0 0 480 360"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <defs>
            <marker id="ar-acc" viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
            </marker>
            <marker id="ar-ok" viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
            <marker id="ar-dim" viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
          </defs>

          {/* Empresas (izquierda) */}
          <rect x="30" y="150" width="120" height="80" rx="10"
            fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
          <text x="90" y="185" textAnchor="middle" fontSize="14" fill={LIENZO.fg} fontWeight="700">Empresas</text>
          <text x="90" y="205" textAnchor="middle" fontSize="10" fill={LIENZO.fgDim}>producen</text>

          {/* Familias (derecha) */}
          <rect x="330" y="150" width="120" height="80" rx="10"
            fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth="2" />
          <text x="390" y="185" textAnchor="middle" fontSize="14" fill={LIENZO.fg} fontWeight="700">Familias</text>
          <text x="390" y="205" textAnchor="middle" fontSize="10" fill={LIENZO.fgDim}>consumen</text>

          {/* Mercado de bienes (arriba) */}
          <rect x="180" y="20" width="120" height="50" rx="10"
            fill={LIENZO.accent} fillOpacity="0.12" stroke={LIENZO.accent} strokeWidth="2" />
          <text x="240" y="40" textAnchor="middle" fontSize="11" fill={LIENZO.accent} fontWeight="700">Mercado de</text>
          <text x="240" y="55" textAnchor="middle" fontSize="11" fill={LIENZO.accent} fontWeight="700">bienes y servicios</text>

          {/* Mercado de factores (abajo) */}
          <rect x="180" y="290" width="120" height="50" rx="10"
            fill={LIENZO.ok} fillOpacity="0.12" stroke={LIENZO.ok} strokeWidth="2" />
          <text x="240" y="310" textAnchor="middle" fontSize="11" fill={LIENZO.ok} fontWeight="700">Mercado de</text>
          <text x="240" y="325" textAnchor="middle" fontSize="11" fill={LIENZO.ok} fontWeight="700">factores de producción</text>

          {/* ──── ARRIBA · Mercado de bienes (2 flujos opuestos) ──── */}
          {/* Flujo BIENES: Empresas → Mercado → Familias (violeta) */}
          <motion.path d="M 150 158 Q 165 110 195 75" stroke={LIENZO.accent} strokeWidth="2" fill="none"
            markerEnd="url(#ar-acc)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
          <motion.path d="M 285 75 Q 315 110 330 158" stroke={LIENZO.accent} strokeWidth="2" fill="none"
            markerEnd="url(#ar-acc)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2 }} />
          <text x="155" y="100" textAnchor="middle" fontSize="9" fill={LIENZO.accent} fontWeight="600">bienes vendidos →</text>
          <text x="325" y="100" textAnchor="middle" fontSize="9" fill={LIENZO.accent} fontWeight="600">→ bienes comprados</text>

          {/* Flujo $ : Familias → Mercado → Empresas (gris, sentido opuesto) */}
          <motion.path d="M 340 168 Q 320 130 295 95" stroke={LIENZO.fgDim} strokeWidth="1.5" fill="none"
            strokeDasharray="4 4" markerEnd="url(#ar-dim)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.4 }} />
          <motion.path d="M 185 95 Q 160 130 140 168" stroke={LIENZO.fgDim} strokeWidth="1.5" fill="none"
            strokeDasharray="4 4" markerEnd="url(#ar-dim)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.55 }} />
          <text x="350" y="135" textAnchor="middle" fontSize="9" fill={LIENZO.fgDim}>← $ pagados</text>
          <text x="130" y="135" textAnchor="middle" fontSize="9" fill={LIENZO.fgDim}>$ ingreso ←</text>

          {/* ──── ABAJO · Mercado de factores (2 flujos opuestos) ──── */}
          {/* Flujo FACTORES: Familias → Mercado → Empresas (verde) */}
          <motion.path d="M 330 222 Q 315 270 285 305" stroke={LIENZO.ok} strokeWidth="2" fill="none"
            markerEnd="url(#ar-ok)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.7 }} />
          <motion.path d="M 195 305 Q 165 270 150 222" stroke={LIENZO.ok} strokeWidth="2" fill="none"
            markerEnd="url(#ar-ok)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.85 }} />
          <text x="325" y="285" textAnchor="middle" fontSize="9" fill={LIENZO.ok} fontWeight="600">trabajo, tierra →</text>
          <text x="155" y="285" textAnchor="middle" fontSize="9" fill={LIENZO.ok} fontWeight="600">→ insumos para producir</text>

          {/* Flujo $ : Empresas → Mercado → Familias (gris, sentido opuesto) */}
          <motion.path d="M 140 212 Q 160 250 185 285" stroke={LIENZO.fgDim} strokeWidth="1.5" fill="none"
            strokeDasharray="4 4" markerEnd="url(#ar-dim)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 1.0 }} />
          <motion.path d="M 295 285 Q 320 250 340 212" stroke={LIENZO.fgDim} strokeWidth="1.5" fill="none"
            strokeDasharray="4 4" markerEnd="url(#ar-dim)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 1.15 }} />
          <text x="130" y="255" textAnchor="middle" fontSize="9" fill={LIENZO.fgDim}>$ sueldos →</text>
          <text x="350" y="255" textAnchor="middle" fontSize="9" fill={LIENZO.fgDim}>→ ingreso familiar</text>
        </svg>
      </Pizarra>
      <div style={{ fontSize: 12, color: LIENZO.fgDim, textAlign: "center", marginTop: 6 }}>
        <span style={{ color: LIENZO.accent, fontWeight: 600 }}>—</span> bienes/factores
        {" · "}
        <span style={{ color: LIENZO.fgDim, fontWeight: 600 }}>┄</span> dinero (sentido opuesto)
      </div>
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
      <Hook>
        Cuando alguien te muestra un mapa de Cochabamba, ese mapa NO incluye cada baldosa, cada
        farol, cada perro. Igual sirve para llegar a destino.<br /><br />
        <strong>Un modelo económico es un mapa así</strong>: omite los detalles para que veas el
        camino general.
      </Hook>
      <Definicion termino="modelo económico">
        Representación <strong>simplificada</strong> de la realidad. Se basa en supuestos (como los
        físicos suponen "sin fricción") para enfocarse en lo esencial.
      </Definicion>
      <Misconception>
        <strong>"Si un modelo es simple, es malo."</strong> Al contrario: un modelo demasiado
        complejo es inútil. La gracia del modelo es <em>simplificar</em> sin perder lo importante.
        Un mapa con cada baldosa no te ayuda a llegar.
      </Misconception>
      <Parrafo>
        Acá vas a ver los DOS modelos más usados en economía. Los dos caben en un sólo dibujo y
        explican más de lo que parece.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Modelo 1 · El diagrama de flujo circular</Titulo>
      <Parrafo>
        La economía está formada por millones de personas. El flujo circular simplifica todo en
        dos actores: <strong>familias</strong> y <strong>empresas</strong>, que interactúan en dos
        mercados.
      </Parrafo>
      <FlujoCircular />
      <Resumen>
        <strong>Mercado de bienes y servicios</strong> (arriba): las empresas venden, las familias
        compran. El dinero va en sentido opuesto.<br /><br />
        <strong>Mercado de factores de producción</strong> (abajo): las familias venden trabajo,
        tierra y capital; las empresas pagan sueldos, alquileres y dividendos.
      </Resumen>
      <Misconception>
        <strong>"Solo el dinero circula."</strong> No. En el diagrama, los bienes y los factores
        también circulan: en sentido OPUESTO al dinero. Lo que va por un carril, vuelve por el
        otro. Eso es lo que hace "circular" al modelo.
      </Misconception>
      <Conexion>
        El flujo circular es la base para entender el <strong>PIB</strong>: se puede medir sumando
        gastos (carril del dinero arriba), ingresos (sueldos abajo) o producción (bienes). Los tres
        métodos dan el mismo número, justamente porque es un circuito.
      </Conexion>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>Recorrido de un billete · 50 Bs en La Cancha</Titulo>
      <Hook>
        Tienes un billete de 50 Bs en el bolsillo. Vas a la Cancha (Cochabamba), compras una
        marraqueta y un trozo de queso. <strong>¿Dónde termina ese billete?</strong> Seguilo:
      </Hook>
      <WorkedExample titulo="El recorrido del billete de 50 Bs">
        <ul style={{ paddingLeft: 22, marginTop: 0, fontSize: 14, lineHeight: 1.7 }}>
          <li><strong>Paso 1.</strong> Sales de casa (familia) con 50 Bs. Llegas a La Cancha.</li>
          <li>
            <strong>Paso 2.</strong> Compras la marraqueta y queso a doña María (empresa pequeña).
            Le diste 50 Bs. → <em>ingreso de la empresa</em>.
          </li>
          <li>
            <strong>Paso 3.</strong> Doña María paga a su sobrina que la ayuda en el puesto: 20 Bs.
            El resto: 15 Bs son insumos (compró harina al panadero), 10 Bs ganancia, 5 Bs alquiler
            del puesto.
          </li>
          <li>
            <strong>Paso 4.</strong> La sobrina (otra familia) recibe los 20 Bs como sueldo.
          </li>
          <li>
            <strong>Paso 5.</strong> La sobrina al día siguiente compra arroz en otro puesto. El
            billete sigue circulando.
          </li>
        </ul>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <strong>Lección:</strong> tu billete fue al menos 2 ingresos distintos (doña María y su
          sobrina). El dinero <strong>no desaparece</strong>, simplemente cambia de mano. Por eso
          gastar dinero crea actividad económica.
        </p>
      </WorkedExample>
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
      <Titulo>Modelo 2 · Frontera de Posibilidades de Producción (FPP)</Titulo>
      <Hook>
        Bolivia tiene una cantidad limitada de tierra, trabajadores, fábricas y tiempo. Si dedica
        TODO a producir gas, no le queda nada para producir alimentos. Si dedica todo a alimentos,
        no produce gas. <strong>¿Cuál es la combinación máxima posible?</strong> La FPP te lo
        muestra.
      </Hook>
      <Definicion termino="FPP">
        Gráfica que muestra las distintas combinaciones de producción que la economía puede lograr,
        dados los <strong>recursos y la tecnología disponibles</strong>.
      </Definicion>
      <Parrafo>
        El ejemplo clásico: una economía que solo produce <strong>autos</strong> y{" "}
        <strong>computadoras</strong>. Toca los botones para ver qué significa cada punto.
      </Parrafo>
      <FPP />
      <Resumen>
        Puntos <strong>sobre la curva</strong> (A, B) = producción <strong>eficiente</strong>.<br />
        Punto <strong>fuera</strong> (C) = imposible con los recursos actuales.<br />
        Punto <strong>adentro</strong> (D) = ineficiente: se podría producir más sin renunciar a nada.
      </Resumen>
    </EscenaRica>
  );
}

function Esc04b() {
  return (
    <EscenaRica>
      <Titulo>Caso resuelto · FPP boliviana (gas vs alimentos)</Titulo>
      <Parrafo>
        Apliquemos la FPP a Bolivia con datos simplificados:
      </Parrafo>
      <WorkedExample titulo="Bolivia entre gas natural y alimentos">
        <p style={{ margin: "0 0 8px" }}>
          Supongamos que Bolivia, con todos sus recursos disponibles, puede producir como máximo:
        </p>
        <ul style={{ paddingLeft: 22, marginTop: 0, fontSize: 14 }}>
          <li><strong>Si dedica TODO a gas:</strong> 60 millones de m³/día · 0 toneladas de alimentos.</li>
          <li><strong>Si dedica TODO a alimentos:</strong> 0 m³ de gas · 5 millones de toneladas.</li>
          <li><strong>Combinaciones intermedias</strong> (ejemplo): 40 m³ + 2,5 millones t; 20 m³ + 4 millones t.</li>
        </ul>
        <p style={{ marginTop: 8 }}>
          <strong>¿Por qué es cóncava (no recta)?</strong>
        </p>
        <p style={{ margin: "0 0 8px" }}>
          Los recursos NO son intercambiables al 100%. Los trabajadores del Chaco (que entienden de
          gas) NO son tan productivos plantando soja. Los agricultores de Santa Cruz (que entienden
          de soja) NO son tan productivos manejando pozos de gas. Mientras la economía empuja todos
          los recursos a UN solo bien, el costo de oportunidad CRECE.
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Ejemplo numérico:</strong> pasar de 0 a 20 millones de m³ de gas cuesta 1 millón de
          toneladas de alimentos (los primeros pozos usan recursos especializados en energía). Pero
          pasar de 40 a 60 millones de m³ cuesta 2,5 millones de toneladas (los últimos pozos exigen
          tomar gente del agro). <em>El costo de oportunidad NO es constante: crece.</em>
        </p>
      </WorkedExample>
      <CasoBolivia>
        Este es el motivo por el que Bolivia exporta gas e importa alimentos procesados: dedicar
        TODO a alimentos no sería eficiente. La economía busca el <strong>punto óptimo en la
        frontera</strong>, no en los extremos.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>¿Por qué la FPP es cóncava?</Titulo>
      <Parrafo>
        Es la pregunta clave. Si los recursos fueran perfectamente intercambiables, la FPP sería
        una RECTA (costo de oportunidad constante). Pero los recursos NO son intercambiables.
      </Parrafo>
      <Resumen>
        <strong>Lado izquierdo de la curva</strong> (mayoría de recursos a computadoras): si pasamos
        un auto extra, sacrificamos POCAS computadoras (los pocos trabajadores que ya estaban en
        autos eran los menos buenos para computadoras).<br /><br />
        <strong>Lado derecho de la curva</strong> (mayoría de recursos a autos): si pasamos un auto
        más, sacrificamos MUCHAS computadoras (estamos sacando a los mejores técnicos de
        computación).
      </Resumen>
      <PorQue>
        Por eso la curva es cóncava: el <strong>costo de oportunidad CRECE</strong> a medida que la
        economía se especializa en un solo bien. Esto es válido para cualquier par de bienes: no
        solo autos y computadoras.
      </PorQue>
      <MiniQuiz
        pregunta="Una economía produce solo trigo y maíz. Si su FPP fuera una recta (no cóncava), eso significaría que:"
        opciones={[
          "los recursos son perfectamente intercambiables entre los dos cultivos.",
          "la economía es muy pobre.",
          "hay un error en el modelo.",
        ]}
        correctaIdx={0}
        explicacion="Una FPP RECTA implica costo de oportunidad constante: cada unidad de trigo cuesta siempre la misma cantidad de maíz. Eso pasaría si los recursos fueran iguales para los dos cultivos. En la realidad casi nunca lo son, por eso la FPP es cóncava."
      />
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Las 5 ideas que muestra la FPP en un solo gráfico</Titulo>
      <Resumen>
        <strong>1. Escasez</strong>: puntos fuera de la curva son inalcanzables (los recursos no
        dan).<br /><br />
        <strong>2. Disyuntivas</strong>: para producir más de un bien hay que producir menos del
        otro (te mueves sobre la curva).<br /><br />
        <strong>3. Costo de oportunidad</strong>: la pendiente de la frontera en cada punto te
        dice cuánto sacrificas de un bien al producir uno más del otro.<br /><br />
        <strong>4. Eficiencia</strong>: solo los puntos SOBRE la frontera son eficientes. Adentro
        hay desperdicio.<br /><br />
        <strong>5. Crecimiento económico</strong>: un avance tecnológico o más recursos desplazan
        la curva hacia AFUERA.
      </Resumen>
      <PorQue>
        En un solo gráfico está casi toda la introducción a la ciencia económica. Por eso es el
        modelo más enseñado del mundo: <strong>5 conceptos centrales en una curva</strong>.
      </PorQue>
      <Conexion>
        Los puntos 1, 2 y 3 que acabas de ver son justamente los 3 primeros principios de Mankiw que
        viste en la lección anterior (escasez, disyuntivas, costo de oportunidad).
      </Conexion>
    </EscenaRica>
  );
}

function Esc06b() {
  return (
    <EscenaRica>
      <Titulo>Crecimiento económico · cómo se mueve la FPP</Titulo>
      <Hook>
        La FPP NO es para siempre. Una economía puede MOVERLA hacia afuera (crecer) o hacia adentro
        (encogerse). <strong>¿Cómo se logra?</strong>
      </Hook>
      <Resumen>
        <strong>Hacia AFUERA</strong> (la economía crece, ahora puede producir más de TODO):<br />
        • Más capital físico (más fábricas, más infraestructura).<br />
        • Más capital humano (más educación, más habilidades).<br />
        • Avance tecnológico (mejores procesos, automatización).<br />
        • Más recursos naturales (nuevos yacimientos, tierras cultivables).<br /><br />
        <strong>Hacia ADENTRO</strong> (la economía encoge):<br />
        • Desastres naturales que destruyen recursos.<br />
        • Guerras o conflictos prolongados.<br />
        • Emigración masiva (pierde mano de obra).<br />
        • Destrucción de capital físico (terremoto, inundación, sequía).
      </Resumen>
      <CasoBolivia>
        Cuando Bolivia descubrió y desarrolló los grandes campos de gas del Chaco en los 2000s, su
        FPP se desplazó hacia afuera: <em>más gas Y más alimentos posibles al mismo tiempo</em>.
        Cuando una sequía golpea Santa Cruz y reduce la cosecha de soja, la FPP retrocede
        temporalmente del lado de los alimentos.
      </CasoBolivia>
      <Misconception>
        <strong>"Si producir más de un bien siempre cuesta producir menos del otro, una economía
        nunca puede crecer."</strong> Falso. Esa lógica vale CON LA FPP DADA. Si la FPP se
        desplaza hacia afuera, puedes producir más de TODO al mismo tiempo. Eso es crecimiento
        económico.
      </Misconception>
    </EscenaRica>
  );
}

function EscMnemo() {
  return (
    <EscenaRica>
      <Titulo>Mnemotecnia + errores típicos del examen</Titulo>
      <Mnemotecnia>
        Para no confundir los 2 modelos, recuerda <strong>una imagen + una palabra para cada uno</strong>:
        <div style={{ marginTop: 14, padding: 14, background: "#fff", borderRadius: 10, border: `1px solid ${LIENZO.fgFaint}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: LIENZO.accent }}>
            FLUJO CIRCULAR → <em>"el billete da vueltas"</em>
          </div>
          <div style={{ fontSize: 13, color: LIENZO.fgDim, marginBottom: 10 }}>
            Familias ↔ Empresas. 2 mercados. Sentidos opuestos. Es el mapa del DINERO en la economía.
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: LIENZO.ok }}>
            FPP → <em>"la curva del sacrificio"</em>
          </div>
          <div style={{ fontSize: 13, color: LIENZO.fgDim }}>
            Combinaciones máximas posibles de 2 bienes. Cóncava porque los recursos no son iguales.
            Es el mapa de la PRODUCCIÓN.
          </div>
        </div>
      </Mnemotecnia>
      <Misconception titulo="Error típico 1 · confundir FUERA con ADENTRO">
        Punto <strong>FUERA</strong> de la FPP = imposible (no alcanzan recursos).<br />
        Punto <strong>ADENTRO</strong> = posible pero ineficiente (sobran recursos).<br />
        El examen suele preguntar "¿qué representa un punto X?": lee bien si está adentro o afuera.
      </Misconception>
      <Misconception titulo="Error típico 2 · pensar que la FPP es la curva de demanda">
        Son COSAS DISTINTAS. La FPP es sobre OFERTA (qué puede producir la economía). La curva de
        demanda es sobre los CONSUMIDORES (qué quieren comprar a cada precio).
      </Misconception>
      <Misconception titulo="Error típico 3 · creer que la FPP nunca cambia">
        Cambia constantemente. Hacia afuera con crecimiento (tecnología, educación, capital). Hacia
        adentro con destrucción (desastres, guerras). Es una foto, no una verdad eterna.
      </Misconception>
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
        { p: "En el flujo circular, los bienes y el dinero:", o: [
          "circulan en el mismo sentido",
          "circulan en sentidos OPUESTOS",
          "el dinero no circula, solo los bienes",
          "solo circula el dinero",
        ], c: 1, ex: "Esa es la idea de 'circular': lo que va en un sentido (bienes), vuelve en el opuesto (dinero)." },
        { p: "Un punto FUERA de la FPP representa:", o: [
          "eficiencia máxima",
          "una situación inalcanzable hoy",
          "ineficiencia",
          "equilibrio óptimo",
        ], c: 1, ex: "Los recursos actuales no alcanzan: imposible con la tecnología vigente." },
        { p: "Un punto ADENTRO de la FPP indica:", o: [
          "imposibilidad",
          "ineficiencia (se podría producir más sin renunciar a otra cosa)",
          "el óptimo",
          "el punto de equilibrio del mercado",
        ], c: 1, ex: "Hay recursos ociosos: se puede producir más de un bien sin renunciar al otro." },
        { p: "La FPP es cóncava (curva, no recta) porque:", o: [
          "es una convención gráfica",
          "los recursos no son igualmente productivos en ambos usos",
          "siempre hay desempleo",
          "el costo de oportunidad es fijo",
        ], c: 1, ex: "Costo de oportunidad CRECIENTE: cuanto más nos especializamos en un bien, más sacrificamos del otro por cada unidad adicional." },
        { p: "Un avance tecnológico en Bolivia que mejora la productividad agrícola:", o: [
          "no afecta la FPP",
          "desplaza la FPP hacia AFUERA (crecimiento)",
          "desplaza la FPP hacia ADENTRO",
          "vuelve la FPP una recta",
        ], c: 1, ex: "Más tecnología = más bienes posibles con los mismos recursos. La frontera se expande." },
        { p: "Si Bolivia dedica TODA su tierra a gas natural y NADA a alimentos, está:", o: [
          "en el centro de la FPP",
          "en un extremo de la FPP",
          "fuera de la FPP",
          "adentro de la FPP",
        ], c: 1, ex: "Los extremos de la FPP son las soluciones especializadas (100% un bien, 0% el otro). En general las economías eligen puntos intermedios." },
      ]} />
    </EscenaRica>
  );
}
