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
      unidad="MED-04"
      tituloUnidad="Sistema muscular · Movimiento del cuerpo"
      escenas={[
        { titulo: "Músculos · panorama", componente: EscIntro },
        { titulo: "3 tipos de tejido muscular", componente: EscTipos },
        { titulo: "Estructura del músculo esquelético", componente: EscEstructura },
        { titulo: "Cómo se contrae · teoría del deslizamiento", componente: EscContraccion },
        { titulo: "Unión neuromuscular", componente: EscUnion },
        { titulo: "Funciones del sistema muscular", componente: EscFunciones },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Músculos · los motores del cuerpo</Titulo>

      <Hook>
        Tenés ~640 músculos. Producen más calor que cualquier otro órgano:
        cuando hace frío, tiritás (contracción rápida) para generar T. El
        corazón es UN músculo que late ~100.000 veces al día sin parar.
      </Hook>

      <Definicion termino="Sistema muscular">
        Conjunto de tejidos musculares que generan movimiento por contracción.
        Representa 40–50% del peso corporal en un adulto.
      </Definicion>

      <Conexion>
        Sin sistema esquelético (Unidad 3), los músculos no tendrían dónde
        anclarse. Sin sistema nervioso (Unidad 5), no sabrían cuándo
        contraerse.
      </Conexion>

      <Mnemotecnia>
        <strong>"640 músculos, 40% del peso, 1 corazón."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscTipos() {
  return (
    <EscenaRica>
      <Titulo>3 tipos de tejido muscular</Titulo>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Comparación de los 3 tipos
          </text>
          {["Característica", "Esquelético", "Liso", "Cardíaco"].map((h, i) => (
            <g key={i}>
              <rect x={30 + i * 165} y={40} width={163} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={30 + i * 165 + 81} y={59} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Control", e: "Voluntario", l: "Involuntario", k: "Involuntario" },
            { c: "Estrías", e: "Sí (estriado)", l: "No (liso)", k: "Sí (estriado)" },
            { c: "Núcleos", e: "Muchos, periferia", l: "Uno, centro", k: "Uno (a veces 2), centro" },
            { c: "Ubicación", e: "Esqueleto", l: "Vísceras, vasos", k: "Solo corazón" },
            { c: "Velocidad", e: "Rápida, se cansa", l: "Lenta, no se cansa", k: "Rítmica, automática" },
          ].map((row, i) => (
            <g key={i}>
              {[row.c, row.e, row.l, row.k].map((v, j) => (
                <g key={j}>
                  <rect x={30 + j * 165} y={68 + i * 38} width={163} height={38} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={30 + j * 165 + 81} y={92 + i * 38} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Esquelético = voluntario; Liso = automático en vísceras;
        Cardíaco = solo en el corazón."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEstructura() {
  return (
    <EscenaRica>
      <Titulo>Estructura del músculo esquelético</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            De músculo a sarcómero
          </text>
          {[
            { y: 50, t: "Músculo", d: "el órgano entero (ej. bíceps)" },
            { y: 90, t: "Fascículo", d: "grupo de fibras musculares" },
            { y: 130, t: "Fibra muscular", d: "una célula muscular (multinucleada)" },
            { y: 170, t: "Miofibrilla", d: "cada fibra tiene cientos de miofibrillas" },
            { y: 210, t: "Sarcómero", d: "unidad contráctil (actina + miosina)" },
          ].map((n, i) => (
            <g key={i} transform={`translate(80, ${n.y})`}>
              <rect width={580 - i * 80} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1.5} rx={4} />
              <text x={15} y={18} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{i + 1}. {n.t}</text>
              <text x={180} y={18} fill={LIENZO.fg} fontSize={11}>{n.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Sarcómero">
        La unidad funcional del músculo. Compuesto por filamentos de:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Actina</strong> (filamento delgado).</li>
          <li><strong>Miosina</strong> (filamento grueso, con "cabezas").</li>
        </ul>
        Las estrías que ves al microscopio son los sarcómeros alineados.
      </Definicion>

      <Mnemotecnia>
        <strong>"Actina = Delgada; Miosina = Maciza."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscContraccion() {
  return (
    <EscenaRica>
      <Titulo>Contracción · teoría del deslizamiento</Titulo>

      <Definicion termino="Teoría del filamento deslizante (Huxley, 1954)">
        Las cabezas de miosina se enganchan a la actina y la "tiran" hacia el
        centro del sarcómero. El sarcómero se acorta. Millones de sarcómeros
        acortándose = el músculo se contrae.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Sarcómero relajado → contraído
          </text>
          {/* Relajado */}
          <text x={140} y={50} textAnchor="middle" fill={LIENZO.fg} fontSize={12} fontWeight={700}>RELAJADO</text>
          <line x1={50} y1={70} x2={50} y2={120} stroke={LIENZO.fg} strokeWidth={2} />
          <line x1={230} y1={70} x2={230} y2={120} stroke={LIENZO.fg} strokeWidth={2} />
          <line x1={60} y1={80} x2={100} y2={80} stroke="#3b82f6" strokeWidth={3} />
          <line x1={180} y1={80} x2={220} y2={80} stroke="#3b82f6" strokeWidth={3} />
          <rect x={105} y={95} width={75} height={6} fill="#ef4444" />
          <text x={140} y={140} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>sarcómero largo</text>

          {/* Contraído */}
          <text x={490} y={50} textAnchor="middle" fill={LIENZO.fg} fontSize={12} fontWeight={700}>CONTRAÍDO</text>
          <line x1={430} y1={70} x2={430} y2={120} stroke={LIENZO.fg} strokeWidth={2} />
          <line x1={550} y1={70} x2={550} y2={120} stroke={LIENZO.fg} strokeWidth={2} />
          <line x1={440} y1={80} x2={490} y2={80} stroke="#3b82f6" strokeWidth={3} />
          <line x1={490} y1={80} x2={540} y2={80} stroke="#3b82f6" strokeWidth={3} />
          <rect x={445} y={95} width={100} height={6} fill="#ef4444" />
          <text x={490} y={140} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>sarcómero corto</text>

          {/* Leyenda */}
          <line x1={80} y1={175} x2={120} y2={175} stroke="#3b82f6" strokeWidth={3} />
          <text x={130} y={179} fill={LIENZO.fg} fontSize={11}>actina (delgada)</text>
          <rect x={290} y={170} width={50} height={6} fill="#ef4444" />
          <text x={350} y={179} fill={LIENZO.fg} fontSize={11}>miosina (gruesa)</text>
        </svg>
      </Pizarra>

      <Definicion termino="Pasos de la contracción">
        <ol style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Llega impulso nervioso al músculo.</li>
          <li>Se libera Ca²⁺ del retículo sarcoplásmico.</li>
          <li>El Ca²⁺ expone los sitios activos de la actina.</li>
          <li>La miosina se engancha y "tira" (gasta ATP).</li>
          <li>El sarcómero se acorta → el músculo se contrae.</li>
          <li>Al cesar el estímulo, el Ca²⁺ vuelve al retículo y se relaja.</li>
        </ol>
      </Definicion>

      <Cuidado>
        El <strong>rigor mortis</strong> (rigidez tras la muerte) ocurre porque
        ya no hay ATP para SOLTAR las cabezas de miosina. Quedan enganchadas
        y el cuerpo se pone duro.
      </Cuidado>
    </EscenaRica>
  );
}

function EscUnion() {
  return (
    <EscenaRica>
      <Titulo>Unión neuromuscular · puente nervio-músculo</Titulo>

      <Definicion termino="Placa motora (unión neuromuscular)">
        Sinapsis entre la neurona motora y la fibra muscular. El
        neurotransmisor es la <strong>acetilcolina (ACh)</strong>.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Impulso eléctrico → contracción
          </text>
          {/* Neurona */}
          <g transform="translate(100, 70)">
            <circle r={25} fill={LIENZO.warn} opacity={0.3} stroke={LIENZO.warn} strokeWidth={2} />
            <text textAnchor="middle" dy={5} fill={LIENZO.warn} fontSize={11} fontWeight={700}>Neurona</text>
          </g>
          {/* Sinapsis */}
          <line x1={130} y1={70} x2={300} y2={70} stroke={LIENZO.warn} strokeWidth={3} />
          {[1, 2, 3].map((i) => (
            <circle key={i} cx={200 + i * 25} cy={90} r={5} fill={LIENZO.accent} />
          ))}
          <text x={250} y={115} textAnchor="middle" fill={LIENZO.accent} fontSize={10}>ACh</text>
          {/* Músculo */}
          <g transform="translate(450, 50)">
            <rect width={180} height={50} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={2} rx={6} />
            <text x={90} y={30} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={700}>Fibra muscular</text>
          </g>
          <text x={360} y={150} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            La ACh llega al músculo, lo despolariza, libera Ca²⁺ → contracción
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>Curare</strong> (veneno indígena) bloquea los receptores de ACh →
        parálisis. <strong>Toxina botulínica</strong> impide la liberación de
        ACh → parálisis (uso médico/estético: Botox).
      </Cuidado>
    </EscenaRica>
  );
}

function EscFunciones() {
  return (
    <EscenaRica>
      <Titulo>Funciones del sistema muscular</Titulo>

      <Definicion termino="5 funciones principales">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Movimiento:</strong> caminar, hablar, escribir.</li>
          <li><strong>Postura:</strong> mantener el cuerpo erguido.</li>
          <li><strong>Producción de calor:</strong> ~85% del calor corporal viene de músculos. Tiritar genera T.</li>
          <li><strong>Protección de órganos:</strong> abdomen, vísceras.</li>
          <li><strong>Funciones vitales:</strong> respiración (diafragma), bombeo (corazón), digestión (peristaltismo).</li>
        </ul>
      </Definicion>

      <Definicion termino="Pares de músculos antagónicos">
        Los músculos siempre trabajan en pareja: cuando uno se contrae, el otro
        se relaja. Ejemplos:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Bíceps (flexor) ↔ Tríceps (extensor) del brazo.</li>
          <li>Cuádriceps ↔ Isquiotibiales en la pierna.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Un músculo solo puede TIRAR, no EMPUJAR."</strong> Por eso
        trabajan en pares opuestos.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'El músculo cardíaco es liso'">
        <strong>Realidad:</strong> es estriado (como el esquelético) PERO
        involuntario (como el liso). Combinación única.
      </Misconception>

      <Misconception titulo="Error 2 · 'La actina es gruesa'">
        <strong>Realidad:</strong> al revés. Actina = delgada; miosina = gruesa.
      </Misconception>

      <Misconception titulo="Error 3 · 'La contracción no necesita ATP'">
        <strong>Realidad:</strong> tanto la CONTRACCIÓN como la RELAJACIÓN
        necesitan ATP. Sin ATP, el músculo queda contraído (rigor mortis).
      </Misconception>

      <Resumen>
        ~640 músculos. 3 tipos: esquelético (voluntario estriado),
        liso (involuntario, vísceras), cardíaco (involuntario estriado).
        Unidad funcional: sarcómero (actina + miosina). Contracción por
        deslizamiento, requiere Ca²⁺ y ATP. ACh en placa motora.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué tipo de músculo está en las paredes del estómago?"
        opciones={["Esquelético", "Liso", "Cardíaco", "Mixto"]}
        correctaIdx={1}
        explicacion="Liso, en las paredes de vísceras (digestivo, urinario, vasos)."
      />

      <AutoCheck
        pregunta="¿Cuál es el neurotransmisor de la placa motora?"
        opciones={["dopamina", "serotonina", "acetilcolina", "noradrenalina"]}
        correctaIdx={2}
        explicacion="Acetilcolina (ACh) une la neurona motora con el músculo."
      />

      <AutoCheck
        pregunta="¿Qué ion dispara la contracción muscular?"
        opciones={["Na⁺", "K⁺", "Ca²⁺", "Mg²⁺"]}
        correctaIdx={2}
        explicacion="El Ca²⁺ liberado del retículo sarcoplásmico expone los sitios activos de actina."
      />

      <AutoCheck
        pregunta="¿Qué músculo es el antagonista del bíceps?"
        opciones={["deltoides", "tríceps", "pectoral", "trapecio"]}
        correctaIdx={1}
        explicacion="Bíceps (flexor) y tríceps (extensor) son antagonistas del brazo."
      />
    </EscenaRica>
  );
}
