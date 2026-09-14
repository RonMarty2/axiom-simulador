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
      unidad="BCM-03"
      tituloUnidad="BCM · Bioenergética, señalización y ciclo celular"
      escenas={[
        { titulo: "Energía celular · ATP, NADH, FADH₂", componente: EscEnergia },
        { titulo: "Cinética enzimática", componente: EscEnzimas },
        { titulo: "Señalización celular", componente: EscSenalizacion },
        { titulo: "Ciclo celular y puntos de control", componente: EscCiclo },
        { titulo: "Cáncer · ciclo descontrolado", componente: EscCancer },
        { titulo: "Apoptosis · muerte programada", componente: EscApoptosis },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscEnergia() {
  return (
    <EscenaRica>
      <Titulo>Moneda energética · ATP y cofactores</Titulo>

      <Hook>
        Una célula gasta su peso en ATP cada día. No lo almacena: lo fabrica
        y consume constantemente. Por eso necesitas respirar y comer todos
        los días.
      </Hook>

      <Definicion termino="ATP">
        Adenosín trifosfato. Energía libera al hidrolizarse a ADP + Pi (7.3
        kcal/mol). 80% del ATP corporal viene de la fosforilación oxidativa
        mitocondrial.
      </Definicion>

      <Definicion termino="Cofactores reducidos">
        Transportan electrones de alta energía a la cadena respiratoria:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>NADH:</strong> de glicólisis, Krebs, β-oxidación. Rinde
            ~3 ATP por molécula.</li>
          <li><strong>FADH₂:</strong> de Krebs (succinato). Rinde ~2 ATP.</li>
          <li><strong>NADPH:</strong> en biosíntesis (vía pentosa-fosfato).</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"NADH = 3 ATP; FADH₂ = 2 ATP; NADPH = construcción."</strong>
      </Mnemotecnia>

      <Conexion>
        Repasa: respiración celular (Biología-5). Esta unidad enfatiza la
        regulación enzimática del flujo energético.
      </Conexion>
    </EscenaRica>
  );
}

function EscEnzimas() {
  return (
    <EscenaRica>
      <Titulo>Enzimas · catalizadores específicos</Titulo>

      <Definicion termino="Enzima">
        Proteína (casi siempre) que cataliza UNA reacción específica. Baja la
        energía de activación. No se consume.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Factores que afectan la actividad enzimática
          </text>
          {/* curva T */}
          <line x1={80} y1={170} x2={300} y2={170} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={80} y1={170} x2={80} y2={60} stroke={LIENZO.fg} strokeWidth={1.5} />
          <text x={70} y={65} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>act</text>
          <text x={300} y={185} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>T</text>
          <path d="M 80 170 Q 150 170 190 90 Q 230 70 240 170" fill="none" stroke={LIENZO.bad} strokeWidth={2} />
          <text x={190} y={50} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={600}>óptima 37 °C</text>
          <text x={190} y={195} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>T humana</text>

          {/* curva pH */}
          <line x1={420} y1={170} x2={640} y2={170} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={420} y1={170} x2={420} y2={60} stroke={LIENZO.fg} strokeWidth={1.5} />
          <text x={410} y={65} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>act</text>
          <text x={640} y={185} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>pH</text>
          <path d="M 420 170 Q 480 170 510 90 Q 540 70 555 170" fill="none" stroke={LIENZO.ok} strokeWidth={2} />
          <text x={510} y={50} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={600}>óptimo</text>
          <text x={510} y={195} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>cada enzima tiene su pH</text>
        </svg>
      </Pizarra>

      <Definicion termino="Inhibidores">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Competitivo:</strong> molécula similar al sustrato bloquea el sitio activo.</li>
          <li><strong>No competitivo:</strong> se une a otro sitio y deforma la enzima.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Muchos fármacos son inhibidores enzimáticos:
        AAS inhibe COX; estatinas inhiben HMG-CoA reductasa (síntesis de
        colesterol); inhibidores de proteasa en HIV.
      </Cuidado>
    </EscenaRica>
  );
}

function EscSenalizacion() {
  return (
    <EscenaRica>
      <Titulo>Señalización celular · células que hablan</Titulo>

      <Definicion termino="Señalización celular">
        Las células se comunican mediante moléculas señal (hormonas,
        neurotransmisores, factores de crecimiento) que se unen a RECEPTORES
        específicos. La señal se transduce dentro de la célula.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tipos de señalización
          </text>
          {[
            { x: 90, t: "Endocrina", d: "hormona viaja por sangre", ej: "insulina" },
            { x: 250, t: "Paracrina", d: "células cercanas", ej: "neurotransmisores" },
            { x: 410, t: "Autocrina", d: "la propia célula", ej: "factores de crecimiento" },
            { x: 570, t: "Yuxtacrina", d: "contacto directo", ej: "sistema inmune" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={150} height={120} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
              <text x={65} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={65} y={50} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{p.d}</text>
              <text x={65} y={90} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">{p.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Vías de señalización clásicas">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Receptores acoplados a proteína G (GPCR):</strong>
            adrenalina, glucagón. Activan AMPc.</li>
          <li><strong>Receptores tirosina-cinasa (RTK):</strong> insulina,
            factores de crecimiento. Activan vías MAP kinasa.</li>
          <li><strong>Receptores intracelulares:</strong> hormonas esteroides
            (cortisol, estrógeno). Atraviesan la membrana y se unen al ADN.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Hormonas peptídicas afuera (receptor membrana); esteroides
        adentro (receptor nuclear)."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCiclo() {
  return (
    <EscenaRica>
      <Titulo>Ciclo celular · puntos de control</Titulo>

      <Definicion termino="Ciclo celular">
        Secuencia G1 → S → G2 → M (mitosis). Tiene 3 puntos de control que
        impiden a la célula avanzar si hay errores:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>G1/S:</strong> ¿hay nutrientes? ¿el ADN está intacto?</li>
          <li><strong>G2/M:</strong> ¿el ADN se duplicó bien?</li>
          <li><strong>Mitosis:</strong> ¿cromosomas alineados?</li>
        </ul>
      </Definicion>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ciclo celular con sus checkpoints
          </text>
          {/* Círculo ciclo */}
          <circle cx={360} cy={130} r={80} fill="none" stroke={LIENZO.accent} strokeWidth={3} />
          <text x={310} y={80} fill="#3b82f6" fontSize={12} fontWeight={700}>G1</text>
          <text x={420} y={80} fill="#10b981" fontSize={12} fontWeight={700}>S</text>
          <text x={440} y={170} fill="#f59e0b" fontSize={12} fontWeight={700}>G2</text>
          <text x={280} y={170} fill="#ef4444" fontSize={12} fontWeight={700}>M</text>

          {/* Checkpoints */}
          <circle cx={400} cy={70} r={10} fill={LIENZO.warn} stroke={LIENZO.fg} strokeWidth={1} />
          <text x={425} y={62} fill={LIENZO.warn} fontSize={10} fontWeight={600}>G1/S checkpoint</text>

          <circle cx={440} cy={190} r={10} fill={LIENZO.warn} stroke={LIENZO.fg} strokeWidth={1} />
          <text x={460} y={195} fill={LIENZO.warn} fontSize={10} fontWeight={600}>G2/M checkpoint</text>

          <circle cx={280} cy={190} r={10} fill={LIENZO.warn} stroke={LIENZO.fg} strokeWidth={1} />
          <text x={260} y={210} fill={LIENZO.warn} fontSize={10} fontWeight={600}>Mitosis checkpoint</text>
        </svg>
      </Pizarra>

      <Definicion termino="Reguladores moleculares">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Ciclinas + CDKs (cinasas dependientes de ciclina):</strong>
            empujan el ciclo hacia adelante.</li>
          <li><strong>p53:</strong> el "guardián del genoma". Detiene el ciclo
            si hay daño en ADN. Si no se puede reparar → apoptosis.</li>
          <li><strong>Rb (retinoblastoma):</strong> retiene la célula en G1.</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscCancer() {
  return (
    <EscenaRica>
      <Titulo>Cáncer · ciclo celular descontrolado</Titulo>

      <Hook>
        Una célula se vuelve "cancerosa" cuando acumula mutaciones que la
        hacen IGNORAR los puntos de control y dividirse sin parar. En
        promedio, hacen falta 5-7 mutaciones distintas para que aparezca un
        cáncer.
      </Hook>

      <Definicion termino="2 tipos de genes implicados">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Oncogenes (acelerador):</strong> versiones mutadas de
            protooncogenes (que regulan la división). Una mutación basta para
            activarlos. Ej: RAS, MYC.</li>
          <li><strong>Genes supresores de tumores (freno):</strong> normalmente
            frenan el ciclo. Necesitan 2 copias mutadas (Knudson). Ej: p53, Rb,
            BRCA1/2.</li>
        </ul>
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Características del cáncer (6 hallmarks de Hanahan-Weinberg)
          </text>
          {[
            "1. División sin estímulos externos",
            "2. Insensible a señales de freno",
            "3. Evade apoptosis",
            "4. Inmortal (telomerasa activa)",
            "5. Induce angiogénesis (vasos nuevos)",
            "6. Invasión y metástasis",
          ].map((h, i) => (
            <text key={i} x={90 + (i % 2) * 320} y={55 + Math.floor(i / 2) * 30} fill={LIENZO.bad} fontSize={11}>{h}</text>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        Mujeres con mutaciones en BRCA1/2 tienen 50-80% de riesgo de cáncer
        de mama u ovario a lo largo de la vida. Por eso se ofrece consejo
        genético y vigilancia intensa.
      </Cuidado>
    </EscenaRica>
  );
}

function EscApoptosis() {
  return (
    <EscenaRica>
      <Titulo>Apoptosis · muerte celular programada</Titulo>

      <Definicion termino="Apoptosis">
        Suicidio celular controlado. La célula se desarma de forma ordenada
        (núcleo se fragmenta, ADN se rompe en piezas, se forman cuerpos
        apoptóticos que son fagocitados). NO causa inflamación.
      </Definicion>

      <Definicion termino="¿Cuándo ocurre?">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Desarrollo embrionario (eliminar membranas interdigitales).</li>
          <li>Eliminación de linfocitos autoreactivos.</li>
          <li>Daño irreversible al ADN (vía p53).</li>
          <li>Renovación tisular (intestino, piel).</li>
        </ul>
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Apoptosis vs Necrosis
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={90} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>APOPTOSIS</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>programada, ordenada</text>
            <text x={130} y={62} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>sin inflamación</text>
            <text x={130} y={82} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>requiere ATP</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={90} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>NECROSIS</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>accidental, desordenada</text>
            <text x={130} y={62} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>con inflamación</text>
            <text x={130} y={82} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>por daño físico/químico</text>
          </g>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Apoptosis = suicidio ordenado; Necrosis = accidente
        violento."</strong> Las dos son muerte celular, pero muy diferentes.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Las enzimas se consumen'">
        <strong>Realidad:</strong> NO. Son catalizadores: se regeneran y
        pueden hacer miles de ciclos.
      </Misconception>

      <Misconception titulo="Error 2 · 'El cáncer es UNA enfermedad'">
        <strong>Realidad:</strong> son MUCHAS enfermedades distintas. Cada
        cáncer tiene su perfil genético. Por eso tratamientos varían tanto.
      </Misconception>

      <Misconception titulo="Error 3 · 'Apoptosis = necrosis'">
        <strong>Realidad:</strong> apoptosis es controlada y silenciosa.
        Necrosis es accidental e inflamatoria.
      </Misconception>

      <Resumen>
        ATP = moneda; NADH (3 ATP), FADH₂ (2 ATP). Enzimas dependen de T y
        pH óptimos. Señalización: endo/para/auto/yuxtacrina. Ciclo: G1-S-G2-M
        con checkpoints regulados por p53, ciclinas/CDK. Cáncer = pérdida de
        control. Apoptosis = suicidio ordenado (≠ necrosis accidental).
      </Resumen>

      <AutoCheck
        pregunta="¿Cuántos ATP rinde un NADH en la cadena respiratoria?"
        opciones={["1", "2", "3", "5"]}
        correctaIdx={2}
        explicacion="~3 ATP por NADH; ~2 ATP por FADH₂."
      />

      <AutoCheck
        pregunta="¿Qué proteína es el 'guardián del genoma'?"
        opciones={["RAS", "MYC", "p53", "BRCA"]}
        correctaIdx={2}
        explicacion="p53 detecta daños en ADN, detiene ciclo y activa apoptosis si es necesario."
      />

      <AutoCheck
        pregunta="¿Qué hormona usa receptor intracelular (no de membrana)?"
        opciones={["insulina", "adrenalina", "cortisol", "glucagón"]}
        correctaIdx={2}
        explicacion="Las esteroides (cortisol, estrógeno, testosterona) atraviesan la membrana y se unen a receptores nucleares."
      />

      <AutoCheck
        pregunta="¿Cuál es una característica clave de la apoptosis?"
        opciones={[
          "inflamación masiva",
          "es accidental",
          "es ordenada y no causa inflamación",
          "destruye tejidos vecinos",
        ]}
        correctaIdx={2}
        explicacion="Apoptosis = muerte programada, silenciosa, sin inflamación."
      />
    </EscenaRica>
  );
}
