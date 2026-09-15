"use client";

import { useState, useEffect } from "react";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MED-05"
      tituloUnidad="Sistema nervioso · El centro de control"
      escenas={[
        { titulo: "Panorama del sistema nervioso", componente: EscIntro },
        { titulo: "La neurona · célula clave", componente: EscNeurona },
        { titulo: "Impulso nervioso y sinapsis", componente: EscImpulso },
        { titulo: "Simulador · potencial de acción", componente: EscSimPotencial },
        { titulo: "SNC · cerebro y médula", componente: EscSNC },
        { titulo: "SNP · nervios y ganglios", componente: EscSNP },
        { titulo: "Sistema autónomo · simpático/parasimpático", componente: EscAutonomo },
        { titulo: "Acto reflejo", componente: EscReflejo },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscSimPotencial() {
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setT((prev) => {
        const next = prev + 0.5;
        if (next > 100) {
          setRunning(false);
          return 0;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(id);
  }, [running]);

  const voltage = (time: number) => {
    if (time < 20) return -70;
    if (time < 30) return -70 + ((time - 20) / 10) * 100;
    if (time < 45) return 30 - ((time - 30) / 15) * 110;
    if (time < 60) return -80 + ((time - 45) / 15) * 10;
    return -70;
  };

  const currentV = voltage(t);

  // La fase NO se puede deducir del voltaje solo: −30 mV pasa dos veces, una
  // subiendo (despolarización) y otra bajando (repolarización). Antes se
  // decidía por `currentV` y entonces la bajada se rotulaba "Despolarización",
  // contradiciendo el párrafo de arriba. La fase la define en qué tramo del
  // episodio estamos, o sea `t`.
  const fase = (time: number) => {
    if (time < 20) return "Reposo";
    if (time < 30) return "Despolarización · entra Na⁺";
    if (time < 45) return "Repolarización · sale K⁺";
    if (time < 60) return "Hiperpolarización";
    return "Reposo";
  };

  const points: string[] = [];
  for (let i = 0; i <= Math.floor(t); i += 0.5) {
    const v = voltage(i);
    const x = 60 + (i / 100) * 580;
    const y = 100 - v * 0.8;
    points.push(`${x},${y}`);
  }

  return (
    <EscenaRica>
      <Titulo>Simulador · potencial de acción</Titulo>

      <Parrafo>
        Aprieta "Disparar" y observa cómo cambia el voltaje de membrana
        en una neurona. Reposo: −70 mV. Despolarización: entra Na⁺. Pico: +30 mV.
        Repolarización: sale K⁺. Hiperpolarización breve antes de volver al reposo.
      </Parrafo>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, color: "#e2e8f0", maxWidth: 620, width: "100%" }}>
        <button
          onClick={() => { if (!running) { setT(0); setRunning(true); } }}
          disabled={running}
          style={{
            padding: "10px 22px",
            background: running ? "#475569" : "#6d28d9",
            color: "#fff", border: "none", borderRadius: 8,
            cursor: running ? "default" : "pointer",
            fontWeight: 600, fontSize: 14, marginBottom: 12,
          }}
        >
          {running ? "Disparando…" : "Disparar potencial"}
        </button>

        <svg viewBox="0 0 700 240" width="100%" height="240">
          <line x1={60} y1={100 - (-70 * 0.8)} x2={640} y2={100 - (-70 * 0.8)} stroke="#475569" strokeWidth={1} strokeDasharray="4 3" />
          <text x={50} y={100 - (-70 * 0.8) + 4} textAnchor="end" fill="#94a3b8" fontSize={10}>-70 mV</text>
          <line x1={60} y1={100 - 0 * 0.8} x2={640} y2={100 - 0 * 0.8} stroke="#475569" strokeWidth={1} strokeDasharray="4 3" />
          <text x={50} y={100 - 0 * 0.8 + 4} textAnchor="end" fill="#94a3b8" fontSize={10}>0 mV</text>
          <line x1={60} y1={100 - 30 * 0.8} x2={640} y2={100 - 30 * 0.8} stroke="#475569" strokeWidth={1} strokeDasharray="4 3" />
          <text x={50} y={100 - 30 * 0.8 + 4} textAnchor="end" fill="#94a3b8" fontSize={10}>+30 mV</text>

          {/* El umbral: el mnemotécnico de abajo lo promete y no estaba dibujado. */}
          <line x1={60} y1={100 - (-55 * 0.8)} x2={640} y2={100 - (-55 * 0.8)} stroke="#f59e0b" strokeWidth={1} strokeDasharray="2 4" />
          <text x={50} y={100 - (-55 * 0.8) + 4} textAnchor="end" fill="#f59e0b" fontSize={10}>-55 mV</text>

          <line x1={60} y1={20} x2={60} y2={220} stroke="#94a3b8" strokeWidth={1.5} />
          <line x1={60} y1={100 - (-70 * 0.8)} x2={640} y2={100 - (-70 * 0.8)} stroke="#94a3b8" strokeWidth={1.5} />

          {points.length > 1 && (
            <polyline
              points={points.join(" ")}
              fill="none"
              stroke="#60a5fa"
              strokeWidth={3}
            />
          )}

          {/* Marcas reales en el eje: la escala interna va de 0 a 100 y el
              episodio completo dura unos 3 ms, así que 10 unidades internas =
              1 ms. Sin estas marcas el eje decía "ms" sin que nada lo respaldara. */}
          {[0, 2, 4, 6, 8, 10].map((ms) => {
            const x = 60 + ((ms * 10) / 100) * 580;
            return (
              <g key={ms}>
                <line x1={x} y1={100 - (-70 * 0.8)} x2={x} y2={100 - (-70 * 0.8) + 5} stroke="#94a3b8" strokeWidth={1} />
                <text x={x} y={100 - (-70 * 0.8) + 16} textAnchor="middle" fill="#94a3b8" fontSize={9}>{ms}</text>
              </g>
            );
          })}
          <text x={350} y={235} textAnchor="middle" fill="#94a3b8" fontSize={10}>tiempo (ms)</text>
          <text x={20} y={120} textAnchor="middle" fill="#94a3b8" fontSize={10} transform="rotate(-90 20 120)">voltaje (mV)</text>
        </svg>

        <div style={{ padding: 10, background: "#1e293b", borderRadius: 8, marginTop: 10, textAlign: "center" }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Voltaje actual</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: currentV > 0 ? "#ef4444" : currentV < -75 ? "#06b6d4" : "#60a5fa" }}>
            {currentV.toFixed(1)} mV
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>
            {fase(t)}
          </div>
        </div>
      </div>

      <Mnemotecnia>
        <strong>"Reposo (−70) → Umbral (−55) → Pico (+30) → Vuelve."</strong>
        El secreto: Na⁺ entra rapidísimo, K⁺ sale más lento.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Sistema nervioso · el coordinador maestro</Titulo>

      <Hook>
        Tu cerebro pesa ~1.4 kg pero consume el 20% de todo el O₂ y la
        glucosa de tu cuerpo. Tiene 86 mil millones de neuronas, cada una
        conectada a otras 1.000–10.000. Si las pusieras en línea, llegarían a
        la luna varias veces.
      </Hook>

      <Definicion termino="Sistema nervioso">
        Red de neuronas y células de soporte que controla TODO el organismo:
        movimientos, sensaciones, pensamientos, emociones, órganos internos.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            División anatómica
          </text>
          <g transform="translate(80, 55)">
            <rect width={280} height={90} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={140} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>SNC</text>
            <text x={140} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Sistema Nervioso CENTRAL</text>
            <text x={140} y={70} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>Cerebro + médula espinal</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={280} height={90} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} rx={10} />
            <text x={140} y={25} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>SNP</text>
            <text x={140} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Sistema Nervioso PERIFÉRICO</text>
            <text x={140} y={70} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>Nervios + ganglios fuera del SNC</text>
          </g>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Centro = piensa; Periférico = conecta."</strong> El central
        decide; el periférico lleva órdenes y trae información.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscNeurona() {
  return (
    <EscenaRica>
      <Titulo>La neurona · célula del sistema nervioso</Titulo>

      <Definicion termino="Neurona">
        Célula especializada en RECIBIR, PROCESAR y TRANSMITIR información
        mediante impulsos eléctricos y químicos.
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Partes de una neurona
          </text>
          {/* dendritas */}
          {[
            { x1: 100, y1: 60, x2: 180, y2: 110 },
            { x1: 130, y1: 80, x2: 180, y2: 110 },
            { x1: 100, y1: 140, x2: 180, y2: 110 },
            { x1: 130, y1: 160, x2: 180, y2: 110 },
          ].map((d, i) => (
            <line key={i} x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke={LIENZO.accent} strokeWidth={2} />
          ))}
          {/* soma */}
          <circle cx={200} cy={110} r={30} fill={LIENZO.accent} opacity={0.3} stroke={LIENZO.accent} strokeWidth={2} />
          <text x={200} y={115} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={700}>Soma</text>
          {/* axón */}
          <line x1={230} y1={110} x2={550} y2={110} stroke={LIENZO.warn} strokeWidth={4} />
          {[280, 330, 380, 430, 480].map((x, i) => (
            <ellipse key={i} cx={x} cy={110} rx={18} ry={6} fill="#fbbf24" opacity={0.5} />
          ))}
          {/* terminales */}
          {[
            { x2: 620, y2: 80 },
            { x2: 630, y2: 110 },
            { x2: 620, y2: 140 },
          ].map((t, i) => (
            <line key={i} x1={550} y1={110} x2={t.x2} y2={t.y2} stroke={LIENZO.bad} strokeWidth={2} />
          ))}
          {[
            { x: 620, y: 80 },
            { x: 630, y: 110 },
            { x: 620, y: 140 },
          ].map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r={6} fill={LIENZO.bad} />
          ))}

          {/* etiquetas */}
          <text x={100} y={45} fill={LIENZO.accent} fontSize={11} fontWeight={600}>Dendritas (entrada)</text>
          <text x={380} y={95} fill={LIENZO.warn} fontSize={11} fontWeight={600} textAnchor="middle">Axón (conducción)</text>
          <text x={380} y={140} fill={LIENZO.fgDim} fontSize={10} textAnchor="middle">vainas de mielina ↑</text>
          {/* Arrancaba en x=650 con el lienzo de 720 de ancho: se cortaba. */}
          <text x={700} y={165} textAnchor="end" fill={LIENZO.bad} fontSize={11} fontWeight={600}>Terminales (salida)</text>
          <text x={700} y={179} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>(sinapsis)</text>
        </svg>
      </Pizarra>

      <Definicion termino="Partes">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Dendritas:</strong> reciben señales.</li>
          <li><strong>Soma (cuerpo):</strong> integra información, núcleo.</li>
          <li><strong>Axón:</strong> conduce impulso a otras células.</li>
          <li><strong>Vaina de mielina:</strong> aislante que acelera el
            impulso. Acelera porque el impulso <strong>no recorre</strong> el
            axón cubierto: salta de un hueco al siguiente entre una vaina y
            otra, así que se saltea casi todo el camino. La fabrican los
            oligodendrocitos en el encéfalo y la médula (SNC) y las células de
            Schwann en los nervios del resto del cuerpo (SNP).</li>
          <li><strong>Terminales sinápticas:</strong> liberan neurotransmisores.</li>
        </ul>
      </Definicion>

      <Definicion termino="Tipos de neuronas">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Sensitivas (aferentes):</strong> traen info al SNC.</li>
          <li><strong>Motoras (eferentes):</strong> llevan órdenes a músculos/glándulas.</li>
          <li><strong>Interneuronas:</strong> conectan dentro del SNC.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Aferente = Acerca; Eferente = Envía afuera."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscImpulso() {
  return (
    <EscenaRica>
      <Titulo>Impulso nervioso · electricidad biológica</Titulo>

      <Definicion termino="Potencial de acción">
        Onda eléctrica que viaja por el axón. Resultado de la entrada de Na⁺
        (despolarización) y salida de K⁺ (repolarización). Velocidad: hasta
        120 m/s en axones mielinizados.
      </Definicion>

      <Definicion termino="Sinapsis">
        Punto de comunicación entre 2 neuronas (o neurona-músculo). NO hay
        contacto: hay una hendidura (espacio sináptico). Se transmite el
        impulso con NEUROTRANSMISORES.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Sinapsis química
          </text>
          {/* presináptica */}
          <ellipse cx={200} cy={100} rx={70} ry={40} fill={LIENZO.accent} opacity={0.3} stroke={LIENZO.accent} strokeWidth={2} />
          <text x={200} y={75} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>Presináptica</text>
          {[1, 2, 3].map((i) => (
            <circle key={i} cx={170 + i * 20} cy={110} r={4} fill={LIENZO.bad} />
          ))}
          {/* hendidura */}
          <line x1={270} y1={70} x2={270} y2={130} stroke={LIENZO.warn} strokeWidth={1.5} strokeDasharray="4 3" />
          {/* El borde derecho iba en 350 y la célula postsináptica arranca en
              390 (cx 460, rx 70): quedaban 40 px de vacío que no era ni
              hendidura ni célula. Va pegado a la membrana. */}
          <line x1={390} y1={70} x2={390} y2={130} stroke={LIENZO.warn} strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={330} y={155} textAnchor="middle" fill={LIENZO.warn} fontSize={10}>hendidura</text>
          {/* neurotransmisores */}
          {[292, 310, 330, 355, 372].map((x, i) => (
            <circle key={i} cx={x} cy={100 + (i % 2) * 8} r={4} fill={LIENZO.bad} />
          ))}
          {/* postsináptica */}
          <ellipse cx={460} cy={100} rx={70} ry={40} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={2} />
          <text x={460} y={75} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>Postsináptica</text>
          {/* receptores */}
          {/* Los receptores estaban en x=400-440, o sea DENTRO del citoplasma.
              Un receptor va SOBRE la membrana, que acá es el borde izquierdo
              de la elipse (x=390). */}
          {[{ y: 84 }, { y: 100 }, { y: 116 }].map((rcp, i) => (
            <rect key={i} x={386} y={rcp.y} width={10} height={9} rx={2} fill={LIENZO.ok} stroke={LIENZO.ok} strokeWidth={1} />
          ))}
          <text x={392} y={175} fill={LIENZO.ok} fontSize={10}>receptores (sobre la membrana)</text>
          {/* Faltaba la flecha: "Impulso →" era texto suelto a la derecha de todo. */}
          <line x1={130} x2={545} y1={45} y2={45} stroke={LIENZO.fgDim} strokeWidth={1.5} markerEnd="url(#sinArr)" opacity={0.7} />
          <text x={340} y={40} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>sentido del impulso</text>
          <defs>
            <marker id="sinArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Neurotransmisores famosos">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Acetilcolina:</strong> músculo, memoria.</li>
          <li><strong>Dopamina:</strong> placer, recompensa, motivación.</li>
          <li><strong>Serotonina:</strong> ánimo, sueño, apetito.</li>
          <li><strong>GABA:</strong> inhibidor (calma).</li>
          <li><strong>Glutamato:</strong> excitador (aprendizaje).</li>
          <li><strong>Noradrenalina:</strong> alerta, atención.</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscSNC() {
  return (
    <EscenaRica>
      <Titulo>SNC · cerebro y médula espinal</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Partes del SNC
          </text>
          {[
            { t: "Cerebro", d: "pensamiento, memoria, lenguaje, movimiento voluntario", c: "#a78bfa" },
            { t: "Cerebelo", d: "coordinación, equilibrio, motricidad fina", c: "#10b981" },
            { t: "Tronco encefálico", d: "funciones vitales: respiración, latido, reflejos", c: "#ef4444" },
            { t: "Diencéfalo (tálamo, hipotálamo)", d: "relevo sensorial, homeostasis, hormonas", c: "#f59e0b" },
            { t: "Médula espinal", d: "vía de impulsos, reflejos", c: "#06b6d4" },
          ].map((p, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 38})`}>
              <rect width={580} height={32} fill={p.c} opacity={0.2} stroke={p.c} strokeWidth={1.5} rx={6} />
              <text x={15} y={20} fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={250} y={20} fill={LIENZO.fg} fontSize={11}>{p.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Lóbulos del cerebro (4 + 1)">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Frontal:</strong> razonamiento, planificación, motricidad.</li>
          <li><strong>Parietal:</strong> sensaciones somáticas (tacto, T).</li>
          <li><strong>Temporal:</strong> audición, memoria, lenguaje.</li>
          <li><strong>Occipital:</strong> visión.</li>
          <li><strong>Ínsula:</strong> gusto, dolor, autoconciencia.</li>
        </ul>
      </Definicion>

      {/* Faltaba el dibujo: se listaban 5 lóbulos y la explicación del
          ejercicio final habla de "la parte trasera" sin que el alumno haya
          visto nunca dónde queda cada uno.

          Los bordes entre lóbulos NO están puestos a ojo (§4.5, regla 7): se
          calculan sobre la misma elipse del contorno con `enElipse()`, así que
          caen exactos sobre el borde de la cabeza. El ángulo se mide como en
          SVG (y crece hacia abajo): 180° es la frente, 270° el tope del
          cráneo, 0° la nuca, 90° la base. */}
      <Pizarra alto={230}>
        {(() => {
          const CX = 370, CY = 125, RX = 165, RY = 78;
          const enElipse = (grados: number) => {
            const t = (grados * Math.PI) / 180;
            return [CX + RX * Math.cos(t), CY + RY * Math.sin(t)] as const;
          };
          // Los cuatro cortes, en grados sobre ese contorno.
          const [fx, fy] = enElipse(180);   // frente
          const [ax, ay] = enElipse(232);   // frontal | parietal
          const [bx, by] = enElipse(302);   // parietal | occipital
          const [cx2, cy2] = enElipse(38);  // occipital | temporal
          // `1` en el flag de barrido = sentido horario en SVG.
          const arco = (x1: number, y1: number, x2: number, y2: number) =>
            `M ${x1} ${y1} A ${RX} ${RY} 0 0 1 ${x2} ${y2}`;

          return (
            <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
              <text x={360} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
                Dónde queda cada lóbulo (cabeza de perfil, mirando a la izquierda)
              </text>

              {/* Cada lóbulo: su arco de contorno, cerrado contra el centro. */}
              <path d={`${arco(fx, fy, ax, ay)} L ${CX} ${CY} Z`} fill="#a78bfa" opacity={0.25} stroke="#a78bfa" strokeWidth={1} />
              <path d={`${arco(ax, ay, bx, by)} L ${CX} ${CY} Z`} fill="#10b981" opacity={0.25} stroke="#10b981" strokeWidth={1} />
              <path d={`${arco(bx, by, cx2, cy2)} L ${CX} ${CY} Z`} fill="#f59e0b" opacity={0.25} stroke="#f59e0b" strokeWidth={1} />
              <path d={`${arco(cx2, cy2, fx, fy)} L ${CX} ${CY} Z`} fill="#ef4444" opacity={0.25} stroke="#ef4444" strokeWidth={1} />

              {/* Contorno y nariz, para que se vea hacia dónde mira. */}
              <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke={LIENZO.fgDim} strokeWidth={2} />
              <path d={`M ${fx + 3} ${CY - 14} L ${fx - 20} ${CY + 5} L ${fx + 2} ${CY + 13}`} fill="none" stroke={LIENZO.fgDim} strokeWidth={2} />

              {/* Rótulos, en el centro de masa aproximado de cada porción. */}
              <text x={280} y={92} textAnchor="middle" fill="#a78bfa" fontSize={11.5} fontWeight={700}>Frontal</text>
              <text x={280} y={106} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>razona, planifica</text>

              <text x={390} y={78} textAnchor="middle" fill="#10b981" fontSize={11.5} fontWeight={700}>Parietal</text>
              <text x={390} y={92} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>tacto, temperatura</text>

              <text x={482} y={118} textAnchor="middle" fill="#f59e0b" fontSize={11.5} fontWeight={700}>Occipital</text>
              <text x={482} y={132} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>visión</text>

              <text x={340} y={162} textAnchor="middle" fill="#ef4444" fontSize={11.5} fontWeight={700}>Temporal</text>
              <text x={340} y={176} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>oído, memoria</text>

              {/* La ínsula está tapada por los otros cuatro: va señalada. */}
              <circle cx={CX - 40} cy={CY + 2} r={9} fill="#06b6d4" opacity={0.55} stroke="#06b6d4" strokeWidth={1.5} />
              <line x1={CX - 40} y1={CY + 11} x2={CX - 40} y2={207} stroke="#06b6d4" strokeWidth={1} strokeDasharray="3 2" />
              <text x={CX - 40} y={220} textAnchor="middle" fill="#06b6d4" fontSize={10}>Ínsula: tapada por los otros cuatro (gusto, dolor)</text>

              <text x={150} y={62} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">frente</text>
              <text x={592} y={62} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">nuca</text>
            </svg>
          );
        })()}
      </Pizarra>

      <Mnemotecnia>
        <strong>"Frontal piensa, Parietal siente, Temporal escucha, Occipital
        mira."</strong> Y fíjate en el dibujo dónde cae cada uno: la visión está
        en la NUCA, lo más lejos posible de los ojos. Es el dato que más se
        pregunta, justamente porque no es lo que uno esperaría.
      </Mnemotecnia>

      <Cuidado>
        El SNC tiene cuatro protecciones, y cada una hace algo distinto:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Cráneo y vértebras:</strong> la caja dura, contra los golpes.</li>
          <li><strong>Meninges</strong> (duramadre, aracnoides, piamadre): tres
            membranas que lo envuelven, como tres bolsas una dentro de otra.</li>
          <li><strong>Líquido cefalorraquídeo (LCR):</strong> nada entre esas
            membranas y amortigua, igual que el agua de una pecera amortigua lo
            que se sacude adentro.</li>
          <li><strong>Barrera hematoencefálica:</strong> un filtro en las paredes
            de los vasos del cerebro que deja pasar oxígeno y glucosa pero frena
            a la mayoría de las toxinas y los microbios que viajan en la sangre.</li>
        </ul>
      </Cuidado>
    </EscenaRica>
  );
}

function EscSNP() {
  return (
    <EscenaRica>
      <Titulo>SNP · nervios fuera del SNC</Titulo>

      <Definicion termino="Sistema Nervioso Periférico">
        Nervios y ganglios fuera del encéfalo y médula. Lleva información:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>De los sentidos al SNC</strong> (aferente sensitivo).</li>
          <li><strong>Del SNC a músculos y glándulas</strong> (eferente motor).</li>
        </ul>
      </Definicion>

      {/* Antes eran tres cajas hermanas: Somático / Autónomo Simpático /
          Autónomo Parasimpático. Dibujado así, el alumno cuenta TRES
          subdivisiones del SNP, y son dos: simpático y parasimpático cuelgan
          del autónomo. Ahora el dibujo tiene los dos niveles. */}
      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Subdivisiones del SNP
          </text>

          {/* Nivel 1: las dos ramas del SNP */}
          <rect x={60} y={45} width={250} height={62} fill={LIENZO.ok} opacity={0.12} stroke={LIENZO.ok} strokeWidth={1.5} rx={8} />
          <text x={185} y={68} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>Somático</text>
          <text x={185} y={88} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>voluntario (músculos esqueléticos)</text>

          <rect x={400} y={45} width={250} height={62} fill={LIENZO.warn} opacity={0.12} stroke={LIENZO.warn} strokeWidth={1.5} rx={8} />
          <text x={525} y={68} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>Autónomo</text>
          <text x={525} y={88} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>involuntario (órganos, glándulas)</text>

          {/* Nivel 2: solo el autónomo se abre */}
          <path d="M 525 107 L 525 122 L 460 122 L 460 140" fill="none" stroke={LIENZO.warn} strokeWidth={1.5} />
          <path d="M 525 107 L 525 122 L 600 122 L 600 140" fill="none" stroke={LIENZO.warn} strokeWidth={1.5} />

          <rect x={370} y={140} width={180} height={62} fill={LIENZO.bad} opacity={0.12} stroke={LIENZO.bad} strokeWidth={1.5} rx={8} />
          <text x={460} y={163} textAnchor="middle" fill={LIENZO.bad} fontSize={12} fontWeight={700}>Simpático</text>
          <text x={460} y={183} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>lucha o huye (alerta)</text>

          <rect x={510} y={140} width={180} height={62} fill="#06b6d4" opacity={0.12} stroke="#06b6d4" strokeWidth={1.5} rx={8} />
          <text x={600} y={163} textAnchor="middle" fill="#06b6d4" fontSize={12} fontWeight={700}>Parasimpático</text>
          <text x={600} y={183} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>descansa y digiere</text>

          <text x={185} y={165} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10.5} fontStyle="italic">El somático no se</text>
          <text x={185} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10.5} fontStyle="italic">subdivide: mandas tú.</text>

          <text x={360} y={225} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            El SNP se parte en DOS, no en tres: simpático y parasimpático son las dos mitades del autónomo
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="12 pares craneales + 31 pares espinales">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>12 pares craneales: olfatorio, óptico, vago, etc.</li>
          <li>31 pares espinales: 8 cervicales + 12 torácicos + 5 lumbares + 5 sacros + 1 coccígeo.</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscAutonomo() {
  return (
    <EscenaRica>
      <Titulo>Sistema autónomo · simpático vs parasimpático</Titulo>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 720 290" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Acciones opuestas en órganos
          </text>
          {["Órgano", "Simpático (alerta)", "Parasimpático (calma)"].map((h, i) => (
            <g key={i}>
              <rect x={30 + i * 220} y={40} width={218} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={30 + i * 220 + 109} y={59} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { o: "Pupila", s: "Dilata (midriasis)", p: "Contrae (miosis)" },
            { o: "Corazón", s: "Acelera (taquicardia)", p: "Desacelera (bradicardia)" },
            { o: "Bronquios", s: "Dilata", p: "Contrae" },
            { o: "Digestión", s: "Inhibe", p: "Activa" },
            { o: "Sudor", s: "Aumenta", p: "Normal" },
            { o: "Vejiga", s: "Retiene orina", p: "Vaciado" },
          ].map((row, i) => (
            <g key={i}>
              {[row.o, row.s, row.p].map((v, j) => (
                <g key={j}>
                  <rect x={30 + j * 220} y={68 + i * 32} width={218} height={32} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={30 + j * 220 + 109} y={88 + i * 32} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Simpático: pelear, correr o asustarse. Parasimpático:
        descansar y digerir."</strong> Una regla para no confundirlos: si la
        situación te pondría el corazón a mil, es el simpático; si te daría
        sueño después de almorzar, es el parasimpático.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscReflejo() {
  return (
    <EscenaRica>
      <Titulo>Acto reflejo · respuesta automática</Titulo>

      <Hook>
        Tocas una sartén caliente y tu mano YA se retiró antes de que sientas
        el dolor. ¿Cómo? El reflejo NO pasa por el cerebro: se procesa en la
        médula espinal. Es más rápido.
      </Hook>

      <Definicion termino="Arco reflejo">
        Circuito de 5 elementos que produce una respuesta involuntaria:
        <ol style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Receptor (piel).</li>
          <li>Neurona sensitiva.</li>
          <li>Centro integrador (médula espinal).</li>
          <li>Neurona motora.</li>
          <li>Efector (músculo).</li>
        </ol>
      </Definicion>

      {/* La figura dibujaba Estímulo → Receptor → Médula → Motor → Respuesta:
          cinco círculos, pero NO los cinco de la definición de arriba. Se
          comía la neurona sensitiva y el efector, o sea la vía de ida entera,
          y ponía en su lugar el estímulo y la respuesta, que son lo que entra
          y lo que sale, no partes del circuito. Ahora los cinco círculos son
          los cinco elementos, y el estímulo y la respuesta quedan afuera,
          como flechas. El título decía "(rodilla)" mientras el Hook y la
          definición hablan de la sartén caliente. */}
      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Arco reflejo · la mano y la sartén caliente
          </text>

          {/* Lo que entra y lo que sale: no son parte del circuito. */}
          <text x={12} y={100} fill={LIENZO.bad} fontSize={10} fontWeight={700}>Sartén</text>
          <text x={12} y={112} fill={LIENZO.bad} fontSize={10} fontWeight={700}>caliente</text>
          <line x1={52} x2={68} y1={100} y2={100} stroke={LIENZO.bad} strokeWidth={1.5} markerEnd="url(#refArrIn)" />

          {[
            { x: 108, t1: "Receptor", t2: "(piel)" },
            { x: 240, t1: "Neurona", t2: "sensitiva" },
            { x: 372, t1: "Médula", t2: "espinal" },
            { x: 504, t1: "Neurona", t2: "motora" },
            { x: 636, t1: "Efector", t2: "(músculo)" },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={100} r={32} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={1.5} />
              <text x={n.x} y={97} textAnchor="middle" fill={LIENZO.accent} fontSize={10.5} fontWeight={700}>{n.t1}</text>
              <text x={n.x} y={110} textAnchor="middle" fill={LIENZO.accent} fontSize={10.5} fontWeight={700}>{n.t2}</text>
              <text x={n.x} y={150} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{i + 1}</text>
              {i < 4 && (
                <line x1={n.x + 34} x2={n.x + 98} y1={100} y2={100} stroke={LIENZO.fg} strokeWidth={1.5} markerEnd="url(#refArr)" />
              )}
            </g>
          ))}

          <line x1={670} x2={688} y1={100} y2={100} stroke={LIENZO.ok} strokeWidth={1.5} markerEnd="url(#refArrOut)" />
          <text x={694} y={96} textAnchor="end" fill={LIENZO.ok} fontSize={10} fontWeight={700}>La mano</text>
          <text x={710} y={108} textAnchor="end" fill={LIENZO.ok} fontSize={10} fontWeight={700}>se retira</text>

          <defs>
            <marker id="refArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
            <marker id="refArrIn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.bad} />
            </marker>
            <marker id="refArrOut" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
          </defs>

          <text x={360} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            Fíjate que el cerebro no aparece: la orden sale de la médula, y por eso llega antes que el dolor
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Los reflejos se prueban en consulta médica (martillo en la rodilla):
        si no responden, puede haber lesión nerviosa. Son una herramienta
        diagnóstica clave.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Solo usamos el 10% del cerebro'">
        <strong>Realidad:</strong> mito. Estudios de neuroimagen muestran que
        TODAS las áreas del cerebro están activas en distintos momentos.
      </Misconception>

      <Misconception titulo="Error 2 · 'El reflejo pasa por el cerebro'">
        <strong>Realidad:</strong> NO. El reflejo medular se procesa en la
        médula. El cerebro se entera DESPUÉS de la respuesta.
      </Misconception>

      <Misconception titulo="Error 3 · 'Simpático = calma'">
        <strong>Realidad:</strong> al revés. SIMPÁTICO = ALERTA (lucha o
        huida). Parasimpático = calma.
      </Misconception>

      <Resumen>
        SNC = encéfalo + médula. SNP = nervios + ganglios (somático +
        autónomo). Neurona: dendrita → soma → axón → terminales. Sinapsis con
        neurotransmisores. Lóbulos: frontal, parietal, temporal, occipital,
        ínsula. Autónomo simpático (alerta) ↔ parasimpático (descanso).
      </Resumen>

      <AutoCheck
        pregunta="¿Qué parte del encéfalo controla la respiración?"
        opciones={["cerebro", "cerebelo", "tronco encefálico", "tálamo"]}
        correctaIdx={2}
        explicacion="El tronco encefálico (bulbo raquídeo) controla funciones vitales como respiración y latido."
      />

      <AutoCheck
        pregunta="¿Qué lóbulo procesa la visión?"
        opciones={["frontal", "parietal", "temporal", "occipital"]}
        correctaIdx={3}
        explicacion="El occipital (parte trasera) procesa la información visual."
      />

      <AutoCheck
        pregunta="¿Qué hace el sistema simpático con la frecuencia cardíaca?"
        opciones={["la baja", "la sube", "no la afecta", "la varía aleatoriamente"]}
        correctaIdx={1}
        explicacion="Simpático = alerta = acelera el corazón. Parasimpático = lo baja."
      />

      <AutoCheck
        pregunta="¿Qué célula produce la vaina de mielina en el SNC?"
        opciones={["neurona", "astrocito", "oligodendrocito", "célula de Schwann"]}
        correctaIdx={2}
        explicacion="Oligodendrocitos en SNC; células de Schwann en SNP."
      />
    </EscenaRica>
  );
}
