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
      unidad="MED-01"
      tituloUnidad="Morfofunción · Introducción · Anatomía y fisiología"
      escenas={[
        { titulo: "Anatomía + fisiología = morfofunción", componente: EscIntro },
        { titulo: "Niveles de organización del cuerpo", componente: EscNiveles },
        { titulo: "Posición anatómica y planos del cuerpo", componente: EscPlanos },
        { titulo: "Direcciones anatómicas", componente: EscDirecciones },
        { titulo: "Cavidades corporales", componente: EscCavidades },
        { titulo: "11 sistemas del cuerpo humano", componente: EscSistemas },
        { titulo: "Homeostasis · el equilibrio interno", componente: EscHomeostasis },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Morfofunción · cómo se ve y cómo funciona</Titulo>

      <Hook>
        Para entender por qué un infarto es mortal, no alcanza con saber que
        hay un corazón (anatomía). Hay que saber qué hace (bombea sangre),
        qué pasa si falla (no llega O₂ al cerebro), por qué falla (placa que
        tapa una arteria). Eso es morfofunción: anatomía + fisiología juntas.
      </Hook>

      <Definicion termino="Anatomía">
        Estudio de la ESTRUCTURA del cuerpo: forma, ubicación, relaciones
        entre órganos. Responde "¿cómo está hecho?".
      </Definicion>

      <Definicion termino="Fisiología">
        Estudio del FUNCIONAMIENTO del cuerpo. Responde "¿cómo funciona?".
      </Definicion>

      <Definicion termino="Morfofunción">
        Disciplina que integra ambas: estudia simultáneamente la estructura y
        su función. <em>Forma sigue a función</em>: cada parte está diseñada
        para lo que hace.
      </Definicion>

      <Mnemotecnia>
        <strong>"Anatomía = QUÉ es; Fisiología = QUÉ hace."</strong> Si solo
        sabes anatomía, sabes geografía sin saber idioma. Si solo sabes
        fisiología, hablas sin saber dónde estas.
      </Mnemotecnia>

      <Conexion>
        Necesitas bases de biología celular (Biología-3) y biomoléculas
        (Biología-2). El cuerpo es células trabajando en equipo.
      </Conexion>
    </EscenaRica>
  );
}

function EscNiveles() {
  return (
    <EscenaRica>
      <Titulo>Niveles de organización del cuerpo</Titulo>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 720 290" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            De átomo a organismo · 6 niveles
          </text>
          {[
            { t: "Químico", ej: "átomos, moléculas (H₂O, glucosa, ATP)", c: "#3b82f6" },
            { t: "Celular", ej: "células (neurona, eritrocito, miocito)", c: "#06b6d4" },
            { t: "Tisular", ej: "tejidos (muscular, nervioso, conectivo, epitelial)", c: "#10b981" },
            { t: "Orgánico", ej: "órganos (corazón, hígado, pulmón)", c: "#84cc16" },
            { t: "Sistémico", ej: "sistemas/aparatos (circulatorio, digestivo, etc.)", c: "#eab308" },
            { t: "Organísmico", ej: "el organismo completo (tú)", c: "#ef4444" },
          ].map((n, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 38})`}>
              <rect x={0} y={0} width={580} height={32} fill={n.c} opacity={0.2} stroke={n.c} strokeWidth={1.5} rx={6} />
              <text x={15} y={20} fill={n.c} fontSize={12} fontWeight={700}>{i + 1}. {n.t}</text>
              <text x={140} y={20} fill={LIENZO.fg} fontSize={11}>{n.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Los 4 tejidos fundamentales">
        Todo órgano se forma con la combinación de 4 tipos básicos:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Epitelial:</strong> recubre superficies (piel, mucosas).</li>
          <li><strong>Conjuntivo:</strong> conecta y sostiene (hueso, sangre, grasa).</li>
          <li><strong>Muscular:</strong> contrae y mueve (esquelético, liso, cardíaco).</li>
          <li><strong>Nervioso:</strong> transmite impulsos (neuronas, glía).</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"E-C-M-N: Epitelial cubre, Conjuntivo une, Muscular mueve,
        Nervioso comunica."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPlanos() {
  return (
    <EscenaRica>
      <Titulo>Posición anatómica y planos del cuerpo</Titulo>

      <Definicion termino="Posición anatómica">
        Posición de REFERENCIA para describir el cuerpo: persona de pie,
        mirando al frente, brazos a los lados con las palmas hacia adelante,
        pies juntos. TODA descripción anatómica usa esta posición, sin
        importar la pose real del paciente.
      </Definicion>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 planos anatómicos principales
          </text>
          {/* silueta */}
          <g transform="translate(360, 140)" fill="none" stroke={LIENZO.fg} strokeWidth={2}>
            <circle cx={0} cy={-70} r={20} />
            <line x1={0} y1={-50} x2={0} y2={50} />
            <line x1={-40} y1={-30} x2={40} y2={-30} />
            <line x1={-15} y1={50} x2={-15} y2={110} />
            <line x1={15} y1={50} x2={15} y2={110} />
          </g>

          {/* Plano sagital (vertical, divide izquierda/derecha) */}
          <line x1={360} y1={30} x2={360} y2={260} stroke={LIENZO.bad} strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={250} y={55} fill={LIENZO.bad} fontSize={11} fontWeight={700}>Plano SAGITAL</text>
          <text x={250} y={68} fill={LIENZO.fgDim} fontSize={10}>derecha ↔ izquierda</text>

          {/* Plano coronal/frontal (vertical, divide anterior/posterior) */}
          <line x1={200} y1={140} x2={520} y2={140} stroke={LIENZO.ok} strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={530} y={130} fill={LIENZO.ok} fontSize={11} fontWeight={700}>Plano CORONAL</text>
          <text x={530} y={143} fill={LIENZO.fgDim} fontSize={10}>frente ↔ espalda</text>

          {/* Plano transversal (horizontal) */}
          <ellipse cx={360} cy={200} rx={140} ry={20} fill="none" stroke={LIENZO.accent} strokeWidth={1.5} strokeDasharray="6 4" />
          <text x={510} y={195} fill={LIENZO.accent} fontSize={11} fontWeight={700}>Plano TRANSVERSAL</text>
          <text x={510} y={208} fill={LIENZO.fgDim} fontSize={10}>superior ↔ inferior</text>
        </svg>
      </Pizarra>

      <Definicion termino="Los 3 planos">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Sagital (medio):</strong> divide en MITAD derecha e
            izquierda.</li>
          <li><strong>Coronal/frontal:</strong> divide en MITAD anterior y
            posterior.</li>
          <li><strong>Transversal/horizontal:</strong> divide en mitad superior e
            inferior.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"SAGital corta como una espada de adelante atrás. CORonal pone
        la corona de lado a lado. TRANSversal te corta como rodaja de
        salchicha."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscDirecciones() {
  return (
    <EscenaRica>
      <Titulo>Direcciones anatómicas</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Términos para localizar (de a pares)
          </text>
          {[
            { t1: "Superior (cefálico)", t2: "Inferior (caudal)", d: "cabeza ↔ pies" },
            { t1: "Anterior (ventral)", t2: "Posterior (dorsal)", d: "vientre ↔ espalda" },
            { t1: "Medial", t2: "Lateral", d: "centro ↔ borde" },
            { t1: "Proximal", t2: "Distal", d: "cerca tronco ↔ lejos tronco (miembros)" },
            { t1: "Superficial", t2: "Profundo", d: "piel ↔ órganos" },
            { t1: "Interno (visceral)", t2: "Externo (parietal)", d: "cavidad ↔ pared" },
          ].map((p, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 30})`}>
              <text fill={LIENZO.accent} fontSize={12} fontWeight={600}>{p.t1}</text>
              <text x={200} fill={LIENZO.fg} fontSize={14}>↔</text>
              <text x={230} fill={LIENZO.accent} fontSize={12} fontWeight={600}>{p.t2}</text>
              <text x={430} fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">{p.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <WorkedExample titulo="Aplicaciones clínicas">
        <strong>"La rodilla es distal al muslo y proximal al tobillo."</strong>
        <br /><br />
        Distal = lejos del tronco. La rodilla está más lejos del tronco que
        el muslo, pero más cerca del tronco que el tobillo.<br /><br />
        <strong>"El esternón es anterior a la columna."</strong>
        <br />
        El esternón está delante (ventral); la columna detrás (dorsal).
      </WorkedExample>

      <Mnemotecnia>
        <strong>"Proximal = cerca de la PROMA (tronco), Distal = lejos en la
        DISTAncia."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCavidades() {
  return (
    <EscenaRica>
      <Titulo>Cavidades del cuerpo</Titulo>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 720 290" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            2 cavidades grandes: dorsal y ventral
          </text>
          {/* silueta + cavidades */}
          <g transform="translate(280, 50)">
            {/* cráneo */}
            <rect x={50} y={0} width={60} height={50} fill={LIENZO.accent} opacity={0.3} stroke={LIENZO.accent} strokeWidth={1.5} />
            <text x={80} y={28} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={700}>Craneal</text>
            {/* raquídea/vertebral */}
            <rect x={73} y={50} width={14} height={180} fill={LIENZO.accent} opacity={0.3} stroke={LIENZO.accent} strokeWidth={1.5} />
            <text x={140} y={130} fill={LIENZO.accent} fontSize={10} fontWeight={700}>Raquídea</text>

            {/* torácica */}
            <rect x={0} y={60} width={160} height={70} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.5} />
            <text x={80} y={102} textAnchor="middle" fill={LIENZO.ok} fontSize={10} fontWeight={700}>Torácica</text>
            <text x={80} y={120} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>(pulm, corazón)</text>

            {/* diafragma */}
            <line x1={0} x2={160} y1={135} y2={135} stroke={LIENZO.bad} strokeWidth={2} />
            <text x={170} y={135} fill={LIENZO.bad} fontSize={10} fontWeight={700}>diafragma</text>

            {/* abdominal */}
            <rect x={0} y={140} width={160} height={60} fill={LIENZO.warn} opacity={0.3} stroke={LIENZO.warn} strokeWidth={1.5} />
            <text x={80} y={170} textAnchor="middle" fill={LIENZO.warn} fontSize={10} fontWeight={700}>Abdominal</text>
            <text x={80} y={188} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>(est., híg., int.)</text>

            {/* pelvica */}
            <rect x={20} y={200} width={120} height={40} fill="#a78bfa" opacity={0.3} stroke="#a78bfa" strokeWidth={1.5} />
            <text x={80} y={224} textAnchor="middle" fill="#a78bfa" fontSize={10} fontWeight={700}>Pélvica</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Cavidades principales">
        <strong>Dorsal:</strong>
        <ul style={{ margin: "4px 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>Craneal: cerebro.</li>
          <li>Raquídea (vertebral): médula espinal.</li>
        </ul>
        <strong>Ventral:</strong>
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Torácica: corazón (mediastino), pulmones.</li>
          <li>Abdominal: estómago, hígado, intestinos, páncreas, riñones.</li>
          <li>Pélvica: vejiga, recto, órganos reproductores.</li>
        </ul>
      </Definicion>

      <Cuidado>
        El <strong>diafragma</strong> separa la cavidad torácica de la
        abdominal. Es el músculo principal de la respiración. Cavidad
        abdominal + pélvica = "abdominopélvica" (no hay separación real).
      </Cuidado>
    </EscenaRica>
  );
}

function EscSistemas() {
  return (
    <EscenaRica>
      <Titulo>11 sistemas del cuerpo humano</Titulo>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 720 300" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            11 sistemas y su función principal
          </text>
          {[
            { t: "Tegumentario", fn: "protección, T (piel, pelo, uñas)" },
            { t: "Esquelético", fn: "sostén, protección, sangre (huesos)" },
            { t: "Muscular", fn: "movimiento (músculos)" },
            { t: "Nervioso", fn: "control y comunicación (cerebro, nervios)" },
            { t: "Endocrino", fn: "hormonas (tiroides, hipófisis, páncreas)" },
            { t: "Cardiovascular", fn: "transporte sangre (corazón, vasos)" },
            { t: "Linfático/inmune", fn: "defensa (linfocitos, bazo)" },
            { t: "Respiratorio", fn: "intercambio O₂/CO₂ (pulm., vías aéreas)" },
            { t: "Digestivo", fn: "digestión, absorción (boca, est., int.)" },
            { t: "Urinario", fn: "excreción (riñones, vejiga)" },
            { t: "Reproductor", fn: "reproducción (ovarios, testículos)" },
          ].map((s, i) => (
            <g key={i} transform={`translate(80, ${45 + i * 22})`}>
              <text fill={LIENZO.accent} fontSize={11} fontWeight={700}>{i + 1}. {s.t}</text>
              <text x={180} fill={LIENZO.fg} fontSize={11}>{s.fn}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"T-E-M-N-E-C-L-R-D-U-R"</strong> (Tegumentario, Esquelético,
        Muscular, Nervioso, Endocrino, Cardiovascular, Linfático, Respiratorio,
        Digestivo, Urinario, Reproductor). Una frase posible: "Te Encanta
        Mucho Nuestro Estudio Con Lecciones Repetidas Diarias Una Repaso".
      </Mnemotecnia>

      <Cuidado>
        Algunos textos consideran 10 sistemas (uniendo linfático en
        cardiovascular). Para FCyT/medicina UMSS, se cuenta como 11.
      </Cuidado>
    </EscenaRica>
  );
}

function EscHomeostasis() {
  return (
    <EscenaRica>
      <Titulo>Homeostasis · el equilibrio interno</Titulo>

      <Hook>
        Tu cuerpo está a 37 °C. Hace 25 °C afuera; hace 40 °C en una sauna; o
        −10 °C en La Paz de madrugada. Pero siempre 37. ¿Cómo lo logra? La
        homeostasis es el "termostato" del cuerpo.
      </Hook>

      <Definicion termino="Homeostasis (Cannon, 1929)">
        Capacidad del cuerpo de mantener constantes sus condiciones internas
        (T, pH, glucosa, sales) a pesar de los cambios externos. La salud es,
        en gran medida, mantener la homeostasis.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Esquema de retroalimentación negativa
          </text>
          {/* círculos */}
          {[
            { x: 130, t: "Estímulo", c: LIENZO.warn },
            { x: 300, t: "Receptor", c: LIENZO.bad },
            { x: 470, t: "Centro control", c: LIENZO.accent },
            { x: 640, t: "Efector", c: LIENZO.ok },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={100} r={38} fill={n.c} opacity={0.2} stroke={n.c} strokeWidth={2} />
              <text x={n.x} y={107} textAnchor="middle" fill={n.c} fontSize={11} fontWeight={700}>{n.t}</text>
            </g>
          ))}
          {/* flechas */}
          {[168, 338, 508].map((x, i) => (
            <line key={i} x1={x} x2={x + 90} y1={100} y2={100} stroke={LIENZO.fg} strokeWidth={2} markerEnd="url(#hArr)" />
          ))}
          {/* feedback */}
          <path d="M 640 138 Q 600 180 130 180 Q 90 175 130 140" fill="none" stroke={LIENZO.bad} strokeWidth={2} strokeDasharray="6 4" markerEnd="url(#hArr)" />
          <text x={360} y={195} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={600}>Retroalimentación (feedback)</text>

          <defs>
            <marker id="hArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Ejemplo · regulación de la glucemia">
        Sube glucosa en sangre (estímulo) → páncreas detecta (receptor) →
        libera insulina (centro) → células captan glucosa (efector) → glucosa
        baja → señal vuelve al páncreas (feedback).
      </WorkedExample>

      <Definicion termino="Ejemplos clave de homeostasis">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Temperatura: 36.5–37.5 °C.</li>
          <li>pH sanguíneo: 7.35–7.45.</li>
          <li>Glucosa en sangre: 70–100 mg/dL en ayunas.</li>
          <li>Presión arterial: 120/80 mmHg.</li>
          <li>Osmolaridad: 280–300 mOsm/L.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Cuando la homeostasis falla → ENFERMEDAD. Diabetes = falla en glucemia.
        Hipertensión = falla en presión. Fiebre = T fuera de rango. La medicina
        intenta restaurar la homeostasis.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Equilibrio interno = salud; desequilibrio = enfermedad."</strong>
        Toda la medicina gira alrededor de la homeostasis.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La mano derecha del paciente está a TU derecha'">
        <strong>Pensar:</strong> que tu derecha es la del paciente.<br />
        <strong>Realidad:</strong> NO. La derecha del paciente está a TU
        IZQUIERDA si lo mirás de frente. Siempre se describe desde la
        perspectiva del paciente.
      </Misconception>

      <Misconception titulo="Error 2 · 'Sistema = aparato'">
        <strong>Pensar:</strong> que son lo mismo.<br />
        <strong>Realidad:</strong> sutil diferencia. Sistema = mismo tipo de
        tejido (nervioso, óseo). Aparato = órganos colaborando en una función
        (digestivo, respiratorio). En la práctica clínica se usan
        intercambiable, pero conviene saberlo.
      </Misconception>

      <Misconception titulo="Error 3 · 'Anatomía y fisiología son independientes'">
        <strong>Pensar:</strong> que se pueden estudiar por separado.<br />
        <strong>Realidad:</strong> son INSEPARABLES. La estructura permite la
        función. Por ejemplo, las paredes finas del alvéolo permiten el paso
        rápido de gases.
      </Misconception>

      <Misconception titulo="Error 4 · 'Homeostasis = no cambia nada'">
        <strong>Pensar:</strong> que el cuerpo está estático.<br />
        <strong>Realidad:</strong> hay un cambio CONSTANTE para mantener el
        equilibrio. Es dinámico. Sudas cuando hace calor, tiritas cuando hace
        frío: ambos son homeostasis activa.
      </Misconception>

      <Resumen>
        Morfofunción = anatomía + fisiología. 6 niveles (químico → organísmico).
        Posición anatómica de referencia. 3 planos (sagital, coronal,
        transversal). 6 pares de direcciones. 2 cavidades (dorsal y ventral)
        con subcavidades. 11 sistemas. Homeostasis: mantener constante el
        medio interno.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué plano divide el cuerpo en mitades derecha e izquierda?"
        opciones={["Coronal", "Sagital", "Transversal", "Frontal"]}
        correctaIdx={1}
        explicacion="Sagital (medio) divide derecha-izquierda. Coronal/frontal divide anterior-posterior."
      />

      <AutoCheck
        pregunta="¿Qué músculo separa la cavidad torácica de la abdominal?"
        opciones={["Pectoral", "Trapecio", "Diafragma", "Esternocleidomastoideo"]}
        correctaIdx={2}
        explicacion="El diafragma es el principal músculo respiratorio y separa tórax de abdomen."
      />

      <AutoCheck
        pregunta="La muñeca es ___ al codo y ___ a los dedos."
        opciones={[
          "proximal / distal",
          "distal / proximal",
          "anterior / posterior",
          "superior / inferior",
        ]}
        correctaIdx={1}
        explicacion="La muñeca está LEJOS del tronco respecto al codo (distal) pero CERCA del tronco respecto a los dedos (proximal)."
      />

      <AutoCheck
        pregunta="¿Cuál es el rango normal de pH sanguíneo?"
        opciones={["6.5–7.0", "7.0–7.3", "7.35–7.45", "7.5–8.0"]}
        correctaIdx={2}
        explicacion="7.35–7.45 (ligeramente alcalino). Fuera de este rango: acidosis (&lt;) o alcalosis (&gt;)."
      />

      <AutoCheck
        pregunta="¿Qué tejido recubre superficies y forma glándulas?"
        opciones={["muscular", "nervioso", "conjuntivo", "epitelial"]}
        correctaIdx={3}
        explicacion="El epitelial recubre y secreta. Conjuntivo conecta y sostiene."
      />
    </EscenaRica>
  );
}
