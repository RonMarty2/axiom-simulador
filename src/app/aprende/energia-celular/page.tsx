"use client";

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
      unidad="BIO-05"
      tituloUnidad="Energía celular · Respiración y fotosíntesis"
      escenas={[
        { titulo: "ATP · la moneda energética", componente: EscATP },
        { titulo: "Metabolismo · anabolismo y catabolismo", componente: EscMetabolismo },
        { titulo: "Respiración celular · panorama", componente: EscRespPanorama },
        { titulo: "1. Glicólisis · en el citoplasma", componente: EscGlicolisis },
        { titulo: "2. Ciclo de Krebs · en la matriz", componente: EscKrebs },
        { titulo: "3. Cadena respiratoria · en las crestas", componente: EscCadena },
        { titulo: "Balance final de ATP", componente: EscBalanceATP },
        { titulo: "Fotosíntesis · panorama", componente: EscFotoPanorama },
        { titulo: "Fase luminosa y oscura", componente: EscFasesFoto },
        { titulo: "Comparación respiración vs fotosíntesis", componente: EscComparacion },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscATP() {
  return (
    <EscenaRica>
      <Titulo>ATP · la energía universal de las células</Titulo>

      <Hook>
        Cada segundo, tu cuerpo gasta y reproduce 10 millones de moléculas de
        ATP. Toda contracción muscular, todo pensamiento, toda digestión, se
        paga con ATP. Sin ATP, morís en segundos.
      </Hook>

      <Definicion termino="ATP (Adenosín Tri-Fosfato)">
        Nucleótido que almacena energía en los enlaces entre sus 3 grupos
        fosfato. Estructura: <strong>Adenina + Ribosa + 3 P</strong>.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ATP ⇌ ADP + Pi (libera energía)
          </text>
          {/* ATP */}
          <g transform="translate(80, 60)">
            <rect width={70} height={60} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={2} rx={6} />
            <text x={35} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>Adenina</text>
            <text x={35} y={42} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Ribosa</text>
            <text x={35} y={56} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>3 fosfatos</text>
          </g>
          {[1, 2, 3].map((n) => (
            <circle key={n} cx={170 + n * 30} cy={90} r={14} fill="#f59e0b" opacity={0.7} stroke="#d97706" strokeWidth={2} />
          ))}
          <text x={170} y={50} fill="#d97706" fontSize={11}>P~P~P</text>

          {/* Flecha hidrólisis */}
          <line x1={290} x2={400} y1={90} y2={90} stroke={LIENZO.bad} strokeWidth={2} markerEnd="url(#atpArr)" />
          <text x={345} y={75} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={600}>libera 7.3 kcal/mol</text>
          <text x={345} y={108} textAnchor="middle" fill={LIENZO.bad} fontSize={11}>+ H₂O</text>

          {/* ADP */}
          <g transform="translate(440, 60)">
            <rect width={70} height={60} fill={LIENZO.ok} opacity={0.2} stroke={LIENZO.ok} strokeWidth={2} rx={6} />
            <text x={35} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>Adenina</text>
            <text x={35} y={42} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Ribosa</text>
            <text x={35} y={56} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>2 fosfatos</text>
          </g>
          <circle cx={550} cy={90} r={14} fill="#f59e0b" opacity={0.7} stroke="#d97706" strokeWidth={2} />
          <circle cx={580} cy={90} r={14} fill="#f59e0b" opacity={0.7} stroke="#d97706" strokeWidth={2} />
          <text x={620} y={95} fill={LIENZO.fg} fontSize={11}>+ Pi</text>

          <defs>
            <marker id="atpArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.bad} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Hidrólisis del ATP">
        ATP + H₂O → ADP + Pi + 7.3 kcal/mol de energía utilizable.<br />
        La célula usa esta energía para CONTRACCIÓN MUSCULAR, transporte
        activo, síntesis de macromoléculas, conducción nerviosa.
      </Definicion>

      <Mnemotecnia>
        <strong>"ATP es la moneda"</strong>. La célula "cobra" el azúcar y
        "paga" en ATP. Glucosa = billete grande; ATP = monedas.
      </Mnemotecnia>

      <Conexion>
        Los enlaces de alta energía del ATP son los enlaces entre los grupos
        fosfato (P~P). Ese tilde (~) indica "enlace energético".
      </Conexion>
    </EscenaRica>
  );
}

function EscMetabolismo() {
  return (
    <EscenaRica>
      <Titulo>Metabolismo · construir vs descomponer</Titulo>

      <Definicion termino="Metabolismo">
        Conjunto de todas las reacciones químicas dentro de un organismo.
        Tiene dos direcciones opuestas: anabolismo (construcción) y catabolismo
        (destrucción).
      </Definicion>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Dos caminos opuestos
          </text>
          <g transform="translate(80, 60)">
            <rect width={260} height={100} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>ANABOLISMO</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>monómeros → polímeros</text>
            <text x={130} y={62} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>CONSUME ATP</text>
            <text x={130} y={82} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">síntesis de proteínas, fotosíntesis</text>
          </g>
          <g transform="translate(380, 60)">
            <rect width={260} height={100} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>CATABOLISMO</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>polímeros → monómeros</text>
            <text x={130} y={62} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>LIBERA ATP</text>
            <text x={130} y={82} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">respiración, digestión</text>
          </g>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Ana sube; Cata baja."</strong> Anabolismo construye y consume
        ATP. Catabolismo destruye y libera ATP.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscRespPanorama() {
  return (
    <EscenaRica>
      <Titulo>Respiración celular · panorama</Titulo>

      <Definicion termino="Respiración celular">
        Proceso CATABÓLICO por el que las células obtienen energía (ATP) al
        oxidar nutrientes (glucosa) en presencia de O₂.<br /><br />
        <strong>C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + 36–38 ATP</strong>
      </Definicion>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Las 3 etapas de la respiración aeróbica
          </text>
          {[
            { x: 100, t: "1. Glicólisis", lug: "Citoplasma", ent: "1 Glucosa", sal: "2 Piruvato + 2 ATP + 2 NADH" },
            { x: 100, t: "2. Ciclo de Krebs", lug: "Matriz mitocondrial", ent: "Acetil-CoA", sal: "CO₂ + 2 ATP + 6 NADH + 2 FADH₂", y: 100 },
            { x: 100, t: "3. Cadena respiratoria", lug: "Crestas mitocondriales", ent: "NADH + FADH₂ + O₂", sal: "H₂O + 32–34 ATP", y: 170 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y || 50})`}>
              <rect width={520} height={60} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
              <text x={10} y={22} fill={LIENZO.accent} fontSize={13} fontWeight={700}>{p.t}</text>
              <text x={10} y={42} fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">{p.lug}</text>
              <text x={200} y={22} fill={LIENZO.fg} fontSize={11}>Entra: {p.ent}</text>
              <text x={200} y={42} fill={LIENZO.fg} fontSize={11}>Sale: {p.sal}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"GLI – KREBS – CADENA = energía."</strong> Tres etapas, una
        después de la otra. Glicólisis no necesita O₂; las otras dos sí.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscGlicolisis() {
  return (
    <EscenaRica>
      <Titulo>1. Glicólisis · romper la glucosa</Titulo>

      <Definicion termino="Glicólisis">
        Rompimiento de la glucosa (6 C) en 2 moléculas de PIRUVATO (3 C cada
        una). Ocurre en el CITOPLASMA. NO necesita O₂.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Glucosa → 2 Piruvato (10 pasos enzimáticos)
          </text>
          {/* Glucosa */}
          <g transform="translate(80, 90)">
            <circle r={28} fill={LIENZO.warn} opacity={0.3} stroke={LIENZO.warn} strokeWidth={2} />
            <text textAnchor="middle" dy={6} fill={LIENZO.warn} fontSize={14} fontWeight={700}>C₆</text>
            <text textAnchor="middle" y={50} fill={LIENZO.fg} fontSize={11}>Glucosa</text>
          </g>

          {/* flecha */}
          <line x1={140} x2={280} y1={90} y2={90} stroke={LIENZO.accent} strokeWidth={2.5} markerEnd="url(#glArr)" />
          <text x={210} y={75} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={600}>−2 ATP (gasto)</text>
          <text x={210} y={110} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={600}>+4 ATP, +2 NADH</text>

          {/* 2 Piruvatos */}
          <g transform="translate(360, 70)">
            <circle r={20} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={2} />
            <text textAnchor="middle" dy={5} fill={LIENZO.bad} fontSize={12} fontWeight={700}>C₃</text>
          </g>
          <g transform="translate(360, 130)">
            <circle r={20} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={2} />
            <text textAnchor="middle" dy={5} fill={LIENZO.bad} fontSize={12} fontWeight={700}>C₃</text>
          </g>
          <text x={400} y={100} fill={LIENZO.fg} fontSize={12} fontWeight={600}>2 Piruvatos</text>

          {/* Balance */}
          <g transform="translate(480, 55)">
            <rect width={200} height={90} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={8} />
            <text x={100} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>BALANCE NETO</text>
            <text x={100} y={42} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>+ 2 ATP</text>
            <text x={100} y={58} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>+ 2 NADH</text>
            <text x={100} y={74} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>+ 2 piruvato</text>
          </g>

          <defs>
            <marker id="glArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Si NO hay O₂ (fermentación)">
        El piruvato se desvía a:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Fermentación láctica</strong> (músculo cansado, yogur):
            piruvato → ácido láctico.</li>
          <li><strong>Fermentación alcohólica</strong> (levadura, cerveza, pan):
            piruvato → etanol + CO₂.</li>
        </ul>
        En ambos casos solo se ganan 2 ATP (los de glicólisis).
      </Definicion>

      <Cuidado>
        La fermentación es <strong>anaeróbica</strong> (sin O₂) y produce
        MUCHO menos ATP que la respiración aeróbica (2 vs 36+).
      </Cuidado>
    </EscenaRica>
  );
}

function EscKrebs() {
  return (
    <EscenaRica>
      <Titulo>2. Ciclo de Krebs · ciclo del ácido cítrico</Titulo>

      <Definicion termino="Ciclo de Krebs (Hans Krebs, 1937)">
        Ciclo bioquímico que oxida el ACETIL-CoA hasta CO₂, generando NADH,
        FADH₂ y un poco de ATP. Ocurre en la MATRIZ mitocondrial.
      </Definicion>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ciclo del ácido cítrico (simplificado)
          </text>
          {/* Ciclo */}
          <circle cx={300} cy={130} r={70} fill="none" stroke={LIENZO.accent} strokeWidth={2.5} strokeDasharray="6 4" />
          <text x={300} y={130} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>Krebs</text>
          <text x={300} y={148} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>(8 reacciones)</text>

          {/* Entra Acetil-CoA */}
          <g transform="translate(140, 100)">
            <rect width={100} height={40} fill={LIENZO.warn} opacity={0.3} stroke={LIENZO.warn} strokeWidth={2} rx={6} />
            <text x={50} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={700}>Acetil-CoA (C₂)</text>
          </g>
          <line x1={240} x2={235} y1={120} y2={130} stroke={LIENZO.fg} strokeWidth={2} markerEnd="url(#kArr)" />

          {/* Sale CO2 */}
          <g transform="translate(440, 70)">
            <rect width={60} height={28} fill={LIENZO.bad} opacity={0.2} stroke={LIENZO.bad} strokeWidth={1.5} rx={5} />
            <text x={30} y={18} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={700}>2 CO₂</text>
          </g>
          <line x1={370} x2={440} y1={100} y2={90} stroke={LIENZO.fg} strokeWidth={2} markerEnd="url(#kArr)" />

          {/* Productos */}
          <g transform="translate(440, 110)">
            <rect width={140} height={28} fill={LIENZO.ok} opacity={0.2} stroke={LIENZO.ok} strokeWidth={1.5} rx={5} />
            <text x={70} y={18} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>3 NADH + 1 FADH₂</text>
          </g>
          <line x1={370} x2={440} y1={130} y2={125} stroke={LIENZO.fg} strokeWidth={2} markerEnd="url(#kArr)" />

          <g transform="translate(440, 150)">
            <rect width={100} height={28} fill={LIENZO.ok} opacity={0.2} stroke={LIENZO.ok} strokeWidth={1.5} rx={5} />
            <text x={50} y={18} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>1 GTP (≈ATP)</text>
          </g>
          <line x1={370} x2={440} y1={155} y2={165} stroke={LIENZO.fg} strokeWidth={2} markerEnd="url(#kArr)" />

          <text x={360} y={225} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            Como entra 1 acetil-CoA por cada media glucosa: multiplicar todo × 2
          </text>

          <defs>
            <marker id="kArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Por GLUCOSA: 2 vueltas al ciclo de Krebs"</strong> (porque hay
        2 piruvatos = 2 acetil-CoA). Resultado: 6 NADH + 2 FADH₂ + 2 ATP + 4 CO₂.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCadena() {
  return (
    <EscenaRica>
      <Titulo>3. Cadena respiratoria · la mayor ganancia</Titulo>

      <Definicion termino="Cadena respiratoria (transporte de electrones)">
        Los electrones del NADH y FADH₂ bajan por una cadena de proteínas en
        las CRESTAS mitocondriales. La energía liberada bombea protones (H⁺)
        al espacio intermembrana, generando un gradiente. Cuando los H⁺
        regresan por la ATP sintasa, se forma ATP.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Fosforilación oxidativa
          </text>
          {/* Membrana */}
          <line x1={80} x2={680} y1={100} y2={100} stroke={LIENZO.fg} strokeWidth={2} />
          <line x1={80} x2={680} y1={160} y2={160} stroke={LIENZO.fg} strokeWidth={2} />
          <text x={70} y={75} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>intermembrana</text>
          <text x={70} y={185} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>matriz</text>

          {/* Complejos I-IV */}
          {[1, 2, 3, 4].map((n, i) => (
            <g key={n} transform={`translate(${130 + i * 130}, 100)`}>
              <rect x={-30} y={0} width={60} height={60} fill={LIENZO.accent} opacity={0.4} stroke={LIENZO.accent} strokeWidth={1.5} />
              <text x={0} y={35} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={700}>{n === 1 ? "I" : n === 2 ? "II" : n === 3 ? "III" : "IV"}</text>
            </g>
          ))}

          {/* ATP sintasa */}
          <g transform="translate(630, 100)">
            <rect x={-30} y={0} width={60} height={60} fill={LIENZO.ok} opacity={0.4} stroke={LIENZO.ok} strokeWidth={1.5} />
            <text x={0} y={28} textAnchor="middle" fill={LIENZO.ok} fontSize={9} fontWeight={700}>ATP</text>
            <text x={0} y={40} textAnchor="middle" fill={LIENZO.ok} fontSize={9} fontWeight={700}>sintasa</text>
          </g>

          {/* Flechas H+ */}
          <path d="M 120 145 Q 100 130 120 115" fill="none" stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#cArr)" />
          <text x={90} y={130} fill={LIENZO.warn} fontSize={10} fontWeight={700}>H⁺</text>
          <path d="M 380 145 Q 360 130 380 115" fill="none" stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#cArr)" />
          <path d="M 510 145 Q 490 130 510 115" fill="none" stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#cArr)" />

          {/* H+ baja por ATP sintasa */}
          <path d="M 625 70 Q 605 105 625 175" fill="none" stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#cArr)" />
          <text x={580} y={130} fill={LIENZO.ok} fontSize={11} fontWeight={700}>ADP+Pi → ATP</text>

          <defs>
            <marker id="cArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.warn} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Aceptor final de electrones">
        El O₂ es el aceptor final: O₂ + 4 e⁻ + 4 H⁺ → 2 H₂O.<br />
        SIN O₂, la cadena se atasca y NO se produce ATP. Por eso necesitás
        respirar.
      </Definicion>

      <Cuidado>
        Cada NADH produce ~3 ATP; cada FADH₂ ~2 ATP. La cadena respiratoria
        genera el 90% del ATP total de la respiración (32–34 de los 36–38).
      </Cuidado>
    </EscenaRica>
  );
}

function EscBalanceATP() {
  return (
    <EscenaRica>
      <Titulo>Balance final · cuánto ATP gana 1 glucosa</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ATP por glucosa (respiración aeróbica)
          </text>
          {["Etapa", "ATP directo", "NADH (≈3 ATP)", "FADH₂ (≈2 ATP)", "Total"].map((h, i) => (
            <g key={i}>
              <rect x={30 + i * 132} y={40} width={130} height={30} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={30 + i * 132 + 65} y={60} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            ["Glicólisis", "2", "2 (=6 ATP)", "0", "8 ATP"],
            ["Krebs (×2)", "2", "6 (=18 ATP)", "2 (=4 ATP)", "24 ATP"],
            ["Total directo", "4", "8", "2", "—"],
            ["TOTAL", "—", "—", "—", "≈ 36 ATP"],
          ].map((row, i) => (
            <g key={i}>
              {row.map((v, j) => {
                const isLast = i === 3;
                return (
                  <g key={j}>
                    <rect x={30 + j * 132} y={70 + i * 35} width={130} height={35}
                      fill={isLast ? LIENZO.ok : "none"} opacity={isLast ? 0.15 : 1}
                      stroke={LIENZO.fgFaint} strokeWidth={1} />
                    <text x={30 + j * 132 + 65} y={92 + i * 35} textAnchor="middle"
                      fill={isLast ? LIENZO.ok : LIENZO.fg} fontSize={11}
                      fontWeight={isLast ? 700 : 400}>{v}</text>
                  </g>
                );
              })}
            </g>
          ))}
          <text x={360} y={230} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            En realidad varía entre 30–38 según el tipo de célula. Para FCyT: 36–38.
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"36 ATP por glucosa aeróbica vs 2 ATP anaeróbica."</strong>
        El O₂ multiplica el rendimiento por 18.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscFotoPanorama() {
  return (
    <EscenaRica>
      <Titulo>Fotosíntesis · captar la luz para hacer azúcar</Titulo>

      <Hook>
        Toda la energía que consumimos (excepto la nuclear y geotérmica) viene
        del Sol. Las plantas son las únicas que pueden capturarla directamente
        y guardarla en moléculas comestibles. Sin fotosíntesis, no existimos.
      </Hook>

      <Definicion termino="Fotosíntesis">
        Proceso ANABÓLICO de plantas, algas y cianobacterias. Convierten CO₂
        + H₂O en glucosa + O₂ usando la energía del sol y la clorofila.<br /><br />
        <strong>6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂</strong>
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Fotosíntesis dentro del cloroplasto
          </text>
          {/* Sol */}
          <circle cx={120} cy={100} r={30} fill="#fbbf24" stroke="#d97706" strokeWidth={2} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line key={i}
                x1={120 + Math.cos(rad) * 36} y1={100 + Math.sin(rad) * 36}
                x2={120 + Math.cos(rad) * 50} y2={100 + Math.sin(rad) * 50}
                stroke="#d97706" strokeWidth={2} />
            );
          })}
          <text x={120} y={170} textAnchor="middle" fill={LIENZO.fg} fontSize={12} fontWeight={600}>Luz solar</text>

          {/* Cloroplasto */}
          <g transform="translate(300, 60)">
            <ellipse cx={90} cy={50} rx={90} ry={50} fill="#22c55e" opacity={0.2} stroke="#22c55e" strokeWidth={2} />
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse key={i} cx={50 + i * 20} cy={50} rx={6} ry={8} fill="#16a34a" opacity={0.6} />
            ))}
            <text x={90} y={110} textAnchor="middle" fill="#16a34a" fontSize={12} fontWeight={700}>Cloroplasto</text>
          </g>

          {/* Entradas y salidas */}
          <g transform="translate(540, 50)">
            <text fill={LIENZO.bad} fontSize={12} fontWeight={700}>Entra:</text>
            <text y={18} fill={LIENZO.fg} fontSize={11}>6 CO₂ (aire)</text>
            <text y={32} fill={LIENZO.fg} fontSize={11}>6 H₂O (raíz)</text>
            <text y={60} fill={LIENZO.ok} fontSize={12} fontWeight={700}>Sale:</text>
            <text y={78} fill={LIENZO.fg} fontSize={11}>C₆H₁₂O₆ (planta)</text>
            <text y={92} fill={LIENZO.fg} fontSize={11}>6 O₂ (aire)</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Clorofila">
        Pigmento verde con Mg en el centro. Absorbe principalmente luz ROJA y
        AZUL; refleja la VERDE (por eso vemos verdes a las plantas).
      </Definicion>
    </EscenaRica>
  );
}

function EscFasesFoto() {
  return (
    <EscenaRica>
      <Titulo>Dos fases · luminosa y oscura</Titulo>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Fases de la fotosíntesis
          </text>
          {[
            { x: 90, t: "Fase LUMINOSA", lug: "tilacoides", req: "Requiere LUZ", productos: "ATP + NADPH + O₂" },
            { x: 400, t: "Fase OSCURA (Calvin)", lug: "estroma", req: "NO requiere luz directa", productos: "Glucosa (C₆H₁₂O₆)" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect width={250} height={150} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={10} />
              <text x={125} y={25} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{p.t}</text>
              <text x={125} y={48} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">en: {p.lug}</text>
              <text x={125} y={75} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.req}</text>
              <text x={125} y={110} textAnchor="middle" fill={LIENZO.ok} fontSize={12} fontWeight={700}>Produce:</text>
              <text x={125} y={130} textAnchor="middle" fill={LIENZO.ok} fontSize={11}>{p.productos}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Fase luminosa (en tilacoides)">
        La clorofila absorbe luz. El agua se ROMPE (fotólisis): H₂O → 2 H⁺ +
        ½ O₂ + 2 e⁻. Los electrones excitados generan ATP y NADPH. El O₂ es
        un "desecho" que va al aire.
      </Definicion>

      <Definicion termino="Fase oscura / ciclo de Calvin (en estroma)">
        Usa el ATP y NADPH de la fase luminosa para FIJAR el CO₂ del aire en
        carbohidratos. La enzima clave es la RUBISCO.
      </Definicion>

      <Cuidado>
        El nombre "fase oscura" es CONFUSO. Ocurre tanto de día como de noche,
        siempre que haya ATP y NADPH. No es que sea de noche.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Luminosa hace combustible (ATP, NADPH); oscura usa el combustible
        para fabricar azúcar."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscComparacion() {
  return (
    <EscenaRica>
      <Titulo>Respiración vs Fotosíntesis · son inversos</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Procesos opuestos y complementarios
          </text>
          {["Característica", "Respiración", "Fotosíntesis"].map((h, i) => (
            <g key={i}>
              <rect x={60 + i * 200} y={40} width={195} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={60 + i * 200 + 97} y={59} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Tipo", r: "Catabolismo", f: "Anabolismo" },
            { c: "Energía", r: "Libera ATP", f: "Consume luz" },
            { c: "Reactivos", r: "Glucosa + O₂", f: "CO₂ + H₂O" },
            { c: "Productos", r: "CO₂ + H₂O", f: "Glucosa + O₂" },
            { c: "Lugar", r: "Mitocondria", f: "Cloroplasto" },
            { c: "Ocurre en", r: "Todos los seres vivos", f: "Plantas, algas, cianobac." },
          ].map((row, i) => (
            <g key={i}>
              {[row.c, row.r, row.f].map((v, j) => (
                <g key={j}>
                  <rect x={60 + j * 200} y={68 + i * 28} width={195} height={28} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={60 + j * 200 + 97} y={86 + i * 28} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Resumen>
        Fotosíntesis FABRICA glucosa con luz; respiración la ROMPE para hacer
        ATP. Los productos de uno son los reactivos del otro. Plantas hacen
        ambos: fotosíntesis (días con sol) y respiración (siempre, día y noche).
      </Resumen>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Las plantas no respiran'">
        <strong>Pensar:</strong> que las plantas solo hacen fotosíntesis.<br />
        <strong>Realidad:</strong> hacen AMBOS. Fotosíntesis solo de día (con
        luz); respiración SIEMPRE (día y noche). Por eso de noche las plantas
        consumen O₂.
      </Misconception>

      <Misconception titulo="Error 2 · 'La fase oscura es de noche'">
        <strong>Pensar:</strong> que el ciclo de Calvin solo ocurre de noche.<br />
        <strong>Realidad:</strong> ocurre TODO el día, mientras haya ATP y NADPH
        (que se acumulan durante la fase luminosa).
      </Misconception>

      <Misconception titulo="Error 3 · 'Toda la energía del ATP viene de glicólisis'">
        <strong>Pensar:</strong> que glicólisis es la principal.<br />
        <strong>Realidad:</strong> glicólisis solo aporta 2 ATP. La cadena
        respiratoria aporta 32+. Es la principal fuente de ATP en aeróbica.
      </Misconception>

      <Misconception titulo="Error 4 · 'La fermentación produce más ATP que la respiración'">
        <strong>Pensar:</strong> que la fermentación es más eficiente.<br />
        <strong>Realidad:</strong> al revés. Fermentación = 2 ATP. Respiración
        aeróbica = 36–38 ATP. 18 veces más.
      </Misconception>

      <Resumen>
        ATP = moneda energética. Respiración celular: glicólisis (2 ATP) →
        Krebs (2 ATP) → cadena (32 ATP) = 36+ ATP por glucosa. Fotosíntesis:
        fase luminosa (ATP + NADPH + O₂) + ciclo Calvin (glucosa). Mitocondria
        respira; cloroplasto fotosintetiza.
      </Resumen>

      <AutoCheck
        pregunta="¿Dónde ocurre la glicólisis?"
        opciones={["núcleo", "citoplasma", "mitocondria", "cloroplasto"]}
        correctaIdx={1}
        explicacion="Glicólisis ocurre en el citoplasma (no necesita organelos)."
      />

      <AutoCheck
        pregunta="¿Cuántos ATP totales se producen por respiración aeróbica de UNA glucosa?"
        opciones={["2", "12", "36–38", "100"]}
        correctaIdx={2}
        explicacion="Glicólisis + Krebs + cadena = 36–38 ATP."
      />

      <AutoCheck
        pregunta="¿Qué gas LIBERA la fotosíntesis?"
        opciones={["CO₂", "O₂", "N₂", "H₂"]}
        correctaIdx={1}
        explicacion="La fotólisis del agua libera O₂ como subproducto."
      />

      <AutoCheck
        pregunta="En ausencia de O₂, ¿qué hace la célula con el piruvato?"
        opciones={[
          "lo guarda en el núcleo",
          "fermentación (láctica o alcohólica)",
          "lo expulsa por exocitosis",
          "lo usa en la cadena respiratoria",
        ]}
        correctaIdx={1}
        explicacion="Sin O₂, fermentación: piruvato → lactato o etanol + CO₂. Solo 2 ATP."
      />

      <AutoCheck
        pregunta="¿Cuál es la principal función de la fase oscura de la fotosíntesis?"
        opciones={[
          "absorber luz",
          "producir ATP",
          "fijar CO₂ en glucosa",
          "romper el agua",
        ]}
        correctaIdx={2}
        explicacion="El ciclo de Calvin fija el CO₂ del aire usando ATP y NADPH para hacer glucosa."
      />
    </EscenaRica>
  );
}
