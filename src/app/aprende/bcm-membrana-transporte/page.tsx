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
      unidad="BCM-01"
      tituloUnidad="BCM · Membrana plasmática y transporte"
      escenas={[
        { titulo: "Modelo del mosaico fluido", componente: EscMosaico },
        { titulo: "Componentes de la membrana", componente: EscComponentes },
        { titulo: "Transporte pasivo", componente: EscPasivo },
        { titulo: "Transporte activo", componente: EscActivo },
        { titulo: "Endocitosis y exocitosis", componente: EscEndocitosis },
        { titulo: "Ósmosis y soluciones · iso/hiper/hipotónicas", componente: EscOsmosis },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscMosaico() {
  return (
    <EscenaRica>
      <Titulo>Mosaico fluido · la membrana en movimiento</Titulo>

      <Hook>
        La membrana NO es una pared rígida. Es como un océano de lípidos en
        el que flotan icebergs de proteínas. Singer y Nicolson (1972) lo
        llamaron "mosaico fluido": un mosaico porque hay muchas piezas
        distintas; fluido porque todo se mueve.
      </Hook>

      <Definicion termino="Modelo del mosaico fluido">
        La membrana = bicapa de fosfolípidos con proteínas insertadas o
        adheridas, colesterol y glúcidos. Los componentes pueden desplazarse
        lateralmente.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Estructura de la membrana
          </text>
          {/* hilera superior fosfolípidos */}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={`up${i}`} transform={`translate(${60 + i * 45}, 60)`}>
              <circle cx={0} cy={0} r={9} fill="#f59e0b" stroke="#d97706" strokeWidth={1.5} />
              <line x1={-3} y1={9} x2={-3} y2={48} stroke="#0f172a" strokeWidth={1.5} />
              <line x1={3} y1={9} x2={3} y2={48} stroke="#0f172a" strokeWidth={1.5} />
            </g>
          ))}
          {/* hilera inferior */}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={`dn${i}`} transform={`translate(${60 + i * 45}, 170)`}>
              <circle cx={0} cy={0} r={9} fill="#f59e0b" stroke="#d97706" strokeWidth={1.5} />
              <line x1={-3} y1={-9} x2={-3} y2={-48} stroke="#0f172a" strokeWidth={1.5} />
              <line x1={3} y1={-9} x2={3} y2={-48} stroke="#0f172a" strokeWidth={1.5} />
            </g>
          ))}
          {/* proteína integral */}
          <rect x={250} y={75} width={40} height={80} fill={LIENZO.accent} opacity={0.7} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
          <text x={270} y={50} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={600}>proteína integral</text>
          {/* canal */}
          <rect x={430} y={75} width={20} height={80} fill={LIENZO.ok} opacity={0.7} rx={4} />
          <rect x={418} y={100} width={44} height={30} fill="none" stroke={LIENZO.ok} strokeWidth={1} />
          <text x={440} y={50} textAnchor="middle" fill={LIENZO.ok} fontSize={10} fontWeight={600}>canal</text>
          {/* colesterol */}
          <rect x={350} y={85} width={8} height={60} fill={LIENZO.warn} opacity={0.8} />
          <text x={354} y={50} textAnchor="middle" fill={LIENZO.warn} fontSize={10} fontWeight={600}>colesterol</text>
          {/* glúcido */}
          <line x1={550} y1={60} x2={550} y2={40} stroke={LIENZO.bad} strokeWidth={1.5} />
          <circle cx={550} cy={35} r={5} fill={LIENZO.bad} />
          <circle cx={543} cy={28} r={4} fill={LIENZO.bad} />
          <circle cx={557} cy={28} r={4} fill={LIENZO.bad} />
          <text x={585} y={32} fill={LIENZO.bad} fontSize={10} fontWeight={600}>glicocálix</text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Bicapa fluida con proteínas-flotador."</strong> Las proteínas
        son las "antenas" y "puertas" de la célula.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscComponentes() {
  return (
    <EscenaRica>
      <Titulo>4 componentes principales</Titulo>

      <Definicion termino="1. Fosfolípidos (bicapa)">
        Cabeza polar (hidrofílica, hacia afuera/citoplasma) + 2 colas no
        polares (hidrofóbicas, hacia adentro). Es la base estructural.
      </Definicion>

      <Definicion termino="2. Colesterol">
        Solo en membranas animales. Regula la FLUIDEZ: a temperatura alta
        rigidiza; a baja evita que se cristalice.
      </Definicion>

      <Definicion termino="3. Proteínas">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Integrales</strong> (atraviesan la bicapa).</li>
          <li><strong>Periféricas</strong> (adheridas a la superficie).</li>
          <li>Funciones: canales, bombas, receptores, enzimas, identidad.</li>
        </ul>
      </Definicion>

      <Definicion termino="4. Glúcidos (glicocálix)">
        Unidos a lípidos (glucolípidos) o proteínas (glucoproteínas). Solo en
        la cara externa. Función: identidad celular, reconocimiento, grupos
        sanguíneos ABO.
      </Definicion>

      <Cuidado>
        Las membranas son SELECTIVAMENTE PERMEABLES: permiten pasar agua y
        gases libremente, pero controlan el paso de iones, glucosa, aminoácidos
        mediante proteínas específicas.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPasivo() {
  return (
    <EscenaRica>
      <Titulo>Transporte pasivo · sin gasto de ATP</Titulo>

      <Definicion termino="Transporte pasivo">
        Las sustancias se mueven a favor del gradiente de concentración (de
        más a menos). NO consume ATP. 3 tipos:
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 modos de transporte pasivo
          </text>
          {[
            { x: 90, t: "Difusión simple", d: "atraviesan la bicapa directamente", ej: "O₂, CO₂, gases, agua (poco), lípidos" },
            { x: 290, t: "Difusión facilitada", d: "por proteínas canal o transportadoras", ej: "iones, glucosa, aminoácidos" },
            { x: 490, t: "Ósmosis", d: "paso de AGUA por aquaporinas", ej: "regulación de volumen" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={140} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={80} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.d}</text>
              <text x={80} y={95} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">ej:</text>
              <text x={80} y={110} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{p.ej.split(",").slice(0, 2).join(", ")}</text>
              {p.ej.split(",").length > 2 && (
                <text x={80} y={125} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{p.ej.split(",").slice(2).join(",")}</text>
              )}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Cuesta abajo no necesita gasolina."</strong> A favor del
        gradiente = pasivo. Sin ATP.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscActivo() {
  return (
    <EscenaRica>
      <Titulo>Transporte activo · gasta ATP</Titulo>

      <Definicion termino="Transporte activo">
        Movimiento de sustancias EN CONTRA del gradiente. Necesita ATP. Lo
        hacen bombas (proteínas específicas).
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Bomba Na⁺/K⁺ (la más famosa)
          </text>
          {/* membrana */}
          <line x1={80} x2={640} y1={100} y2={100} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={80} x2={640} y1={140} y2={140} stroke={LIENZO.fg} strokeWidth={1.5} />
          {/* bomba */}
          <rect x={320} y={90} width={80} height={60} fill={LIENZO.accent} opacity={0.4} stroke={LIENZO.accent} strokeWidth={2} rx={8} />
          <text x={360} y={125} textAnchor="middle" fill="#fff" fontSize={10} fontWeight={700}>Na/K ATPasa</text>
          {/* Na hacia afuera */}
          <text x={360} y={70} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={700}>3 Na⁺ ↑ (afuera)</text>
          {/* K hacia adentro */}
          <text x={360} y={180} textAnchor="middle" fill="#3b82f6" fontSize={11} fontWeight={700}>2 K⁺ ↓ (adentro)</text>
          {/* ATP */}
          <text x={530} y={125} fill={LIENZO.warn} fontSize={12} fontWeight={700}>+ ATP</text>
          {/* etiquetas medio */}
          <text x={150} y={85} fill={LIENZO.fgDim} fontSize={10}>exterior</text>
          <text x={150} y={160} fill={LIENZO.fgDim} fontSize={10}>citoplasma</text>
        </svg>
      </Pizarra>

      <Definicion termino="Bomba Na⁺/K⁺ ATPasa">
        Saca 3 Na⁺ del citoplasma e introduce 2 K⁺, gastando 1 ATP por ciclo.
        Mantiene el potencial de reposo y es CRUCIAL para neuronas, músculo
        cardíaco, riñón. Consume ~25% del ATP corporal total.
      </Definicion>

      <Mnemotecnia>
        <strong>"En contra del gradiente = activo, requiere gasolina (ATP)."</strong>
        Na⁺/K⁺ ATPasa: 3 fuera por 2 dentro.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEndocitosis() {
  return (
    <EscenaRica>
      <Titulo>Endocitosis y exocitosis · transporte masivo</Titulo>

      <Definicion termino="Endocitosis">
        La célula INGIERE sustancias rodeándolas con su membrana → forma
        vesícula. 3 tipos:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Fagocitosis:</strong> partículas grandes (bacterias).
            "Comida celular". Macrófagos.</li>
          <li><strong>Pinocitosis:</strong> líquidos.</li>
          <li><strong>Mediada por receptor:</strong> molécula específica que
            se une a un receptor (ej: colesterol-LDL).</li>
        </ul>
      </Definicion>

      <Definicion termino="Exocitosis">
        Proceso INVERSO. La célula libera contenido por fusión de vesículas
        con la membrana. Usado para: hormonas, neurotransmisores, enzimas
        digestivas.
      </Definicion>

      <Cuidado>
        La <strong>hipercolesterolemia familiar</strong> es un defecto en el
        receptor de LDL → la célula no puede captar colesterol → se acumula
        en sangre → ateromas.
      </Cuidado>
    </EscenaRica>
  );
}

function EscOsmosis() {
  return (
    <EscenaRica>
      <Titulo>Ósmosis · soluciones iso/hiper/hipotónicas</Titulo>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Qué le pasa a una célula según el medio
          </text>
          {[
            { x: 100, t: "Isotónica", d: "[soluto] igual dentro y afuera", ef: "Normal", c: LIENZO.ok, shape: "normal" },
            { x: 320, t: "Hipotónica", d: "[soluto] MENOR afuera (más agua)", ef: "Se HINCHA (puede estallar)", c: "#06b6d4", shape: "big" },
            { x: 540, t: "Hipertónica", d: "[soluto] MAYOR afuera (menos agua)", ef: "Se ARRUGA (crenación)", c: LIENZO.bad, shape: "small" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={160} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              {/* célula */}
              {p.shape === "normal" && <circle cx={80} cy={75} r={28} fill={LIENZO.bad} opacity={0.4} stroke={LIENZO.bad} strokeWidth={1.5} />}
              {p.shape === "big" && <circle cx={80} cy={75} r={40} fill={LIENZO.bad} opacity={0.4} stroke={LIENZO.bad} strokeWidth={1.5} />}
              {p.shape === "small" && (
                <path d="M 60 65 Q 70 55 80 60 Q 95 50 100 70 Q 105 90 80 90 Q 60 90 60 80 Z"
                  fill={LIENZO.bad} opacity={0.4} stroke={LIENZO.bad} strokeWidth={1.5} />
              )}
              <text x={80} y={130} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{p.d}</text>
              <text x={80} y={148} textAnchor="middle" fill={p.c} fontSize={11} fontWeight={600}>{p.ef}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        El <strong>suero fisiológico (NaCl 0.9%)</strong> es ISOTÓNICO con
        la sangre. Por eso se puede inyectar sin destruir glóbulos rojos.
        Agua pura inyectada las haría estallar (hemólisis).
      </Cuidado>

      <Mnemotecnia>
        <strong>"Hipo = hincha. Hiper = arruga. Iso = igual."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Difusión facilitada gasta ATP'">
        <strong>Realidad:</strong> NO. Es transporte PASIVO (a favor del
        gradiente, sin ATP). Usa proteínas pero no consume energía.
      </Misconception>

      <Misconception titulo="Error 2 · 'Las membranas son barreras rígidas'">
        <strong>Realidad:</strong> son fluidas y selectivamente permeables.
        Sus componentes se desplazan lateralmente.
      </Misconception>

      <Misconception titulo="Error 3 · 'En medio hipertónico la célula se hincha'">
        <strong>Realidad:</strong> al revés. Si afuera hay MÁS solutos, el
        agua SALE de la célula → se arruga.
      </Misconception>

      <Resumen>
        Membrana = mosaico fluido (Singer-Nicolson). Bicapa fosfolípidos +
        proteínas + colesterol + glúcidos. Transporte: pasivo (sin ATP) y
        activo (con ATP). Endocitosis/exocitosis para grandes. Ósmosis:
        iso/hipo/hipertónico.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué tipo de transporte no requiere ATP?"
        opciones={["bomba Na/K", "endocitosis", "difusión facilitada", "transporte activo secundario"]}
        correctaIdx={2}
        explicacion="Difusión facilitada = pasivo, a favor del gradiente."
      />

      <AutoCheck
        pregunta="¿Cuántos Na⁺ saca la bomba Na/K por ciclo?"
        opciones={["1", "2", "3", "5"]}
        correctaIdx={2}
        explicacion="3 Na⁺ afuera por 2 K⁺ adentro, gastando 1 ATP."
      />

      <AutoCheck
        pregunta="Si pongo un eritrocito en agua pura, ¿qué pasa?"
        opciones={[
          "Se arruga",
          "Se hincha y revienta",
          "No cambia",
          "Pierde proteínas",
        ]}
        correctaIdx={1}
        explicacion="Agua pura = hipotónica. El agua entra por ósmosis hasta hemólisis."
      />

      <AutoCheck
        pregunta="¿Qué proceso usa un macrófago para tragar bacterias?"
        opciones={[
          "difusión simple",
          "fagocitosis",
          "ósmosis",
          "exocitosis",
        ]}
        correctaIdx={1}
        explicacion="Fagocitosis: la célula extiende pseudópodos y rodea a la bacteria."
      />
    </EscenaRica>
  );
}
