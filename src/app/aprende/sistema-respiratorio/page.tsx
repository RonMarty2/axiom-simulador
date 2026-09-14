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
      unidad="MED-09"
      tituloUnidad="Sistema respiratorio · Intercambio gaseoso"
      escenas={[
        { titulo: "Respiración · panorama", componente: EscIntro },
        { titulo: "Vías aéreas superiores", componente: EscVias },
        { titulo: "Pulmones y alvéolos", componente: EscPulmones },
        { titulo: "Mecánica respiratoria", componente: EscMecanica },
        { titulo: "Intercambio gaseoso", componente: EscIntercambio },
        { titulo: "Respiración en altura · Bolivia", componente: EscAltura },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Respiración · 12 veces por minuto, toda la vida</Titulo>

      <Hook>
        Inspiran ~6 litros de aire por minuto. En un día: 8.640 L. En 70 años:
        220 millones de litros. Y todo automático: solo notas la respiración
        cuando algo falla.
      </Hook>

      <Definicion termino="Sistema respiratorio">
        Conjunto de órganos que permiten el INTERCAMBIO de O₂ y CO₂ entre el
        aire y la sangre. Trabaja con el cardiovascular para entregar O₂ a
        cada célula.
      </Definicion>

      <Definicion termino="2 conceptos clave">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Ventilación pulmonar:</strong> mover aire (inspiración/espiración).</li>
          <li><strong>Respiración celular:</strong> oxidar glucosa para producir ATP (Biología-5).</li>
        </ul>
      </Definicion>

      <Conexion>
        Trabaja con cardiovascular (Unidad 7): el O₂ entra en sangre por
        capilares pulmonares y llega a cada célula. Pares pulmonar+sistémica.
      </Conexion>

      <Mnemotecnia>
        <strong>"Inspiras 21% O₂, espiras 16% O₂."</strong> Solo retienes ~5%
        del oxígeno inspirado.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscVias() {
  return (
    <EscenaRica>
      <Titulo>Vías aéreas · del aire al alvéolo</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Camino del aire (de arriba abajo)
          </text>
          {[
            { t: "Fosas nasales", d: "filtran, calientan, humidifican aire", c: "#3b82f6" },
            { t: "Faringe", d: "compartida con digestivo (cruce)", c: "#06b6d4" },
            { t: "Laringe", d: "cuerdas vocales (voz) + epiglotis", c: "#10b981" },
            { t: "Tráquea", d: "tubo con anillos cartilaginosos", c: "#84cc16" },
            { t: "Bronquios (2)", d: "derecho e izquierdo, a cada pulmón", c: "#eab308" },
            { t: "Bronquiolos", d: "ramificaciones progresivas", c: "#f59e0b" },
            { t: "Alvéolos", d: "saquitos donde ocurre intercambio", c: "#ef4444" },
          ].map((p, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 28})`}>
              <rect width={580 - i * 25} height={22} fill={p.c} opacity={0.2} stroke={p.c} strokeWidth={1.5} rx={4} />
              <text x={15} y={15} fill={p.c} fontSize={12} fontWeight={700}>{i + 1}. {p.t}</text>
              <text x={180} y={15} fill={LIENZO.fg} fontSize={11}>{p.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        La <strong>epiglotis</strong> es crítica: cuando tragas, cierra la
        laringe para que la comida no entre a la tráquea. Si falla → atoramiento.
        Maniobra de Heimlich = salva vidas.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Naso → Faringe → Laringe → Tráquea → Bronquios → Bronquiolos
        → Alvéolos."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPulmones() {
  return (
    <EscenaRica>
      <Titulo>Pulmones · alveolos y pleura</Titulo>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Pulmón izquierdo vs derecho
          </text>
          <g transform="translate(150, 55)">
            <rect width={150} height={150} fill="#ef4444" opacity={0.15} stroke="#ef4444" strokeWidth={2} rx={20} />
            <text x={75} y={30} textAnchor="middle" fill="#ef4444" fontSize={12} fontWeight={700}>PULMÓN</text>
            <text x={75} y={48} textAnchor="middle" fill="#ef4444" fontSize={12} fontWeight={700}>DERECHO</text>
            <text x={75} y={75} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>3 lóbulos</text>
            <text x={75} y={95} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>(superior, medio,</text>
            <text x={75} y={110} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>inferior)</text>
            <text x={75} y={135} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">más grande</text>
          </g>
          <g transform="translate(420, 55)">
            <rect width={150} height={150} fill="#3b82f6" opacity={0.15} stroke="#3b82f6" strokeWidth={2} rx={20} />
            <text x={75} y={30} textAnchor="middle" fill="#3b82f6" fontSize={12} fontWeight={700}>PULMÓN</text>
            <text x={75} y={48} textAnchor="middle" fill="#3b82f6" fontSize={12} fontWeight={700}>IZQUIERDO</text>
            <text x={75} y={75} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>2 lóbulos</text>
            <text x={75} y={95} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>(superior, inferior)</text>
            <text x={75} y={135} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">más chico (corazón)</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Alvéolos">
        Sacos de aire microscópicos rodeados de capilares. Tienes ~300 millones.
        Si los extendieras: 75 m² (medio cancha de tenis). Pared finísima (1
        célula) para que los gases pasen rápido.
      </Definicion>

      <Definicion termino="Pleura">
        Doble membrana que envuelve los pulmones:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Visceral:</strong> pegada al pulmón.</li>
          <li><strong>Parietal:</strong> pegada al tórax.</li>
          <li>Entre ambas, líquido pleural (lubricante).</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscMecanica() {
  return (
    <EscenaRica>
      <Titulo>Mecánica respiratoria · cómo entra y sale el aire</Titulo>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Inspiración vs Espiración
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={130} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>INSPIRACIÓN</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>(activa)</text>
            <text x={20} y={70} fill={LIENZO.fg} fontSize={11}>• Diafragma se contrae (baja)</text>
            <text x={20} y={88} fill={LIENZO.fg} fontSize={11}>• Costillas suben</text>
            <text x={20} y={106} fill={LIENZO.fg} fontSize={11}>• ↑ volumen torácico</text>
            <text x={20} y={124} fill={LIENZO.fg} fontSize={11}>• ↓ presión → entra aire</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={130} fill="#06b6d4" opacity={0.1} stroke="#06b6d4" strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill="#06b6d4" fontSize={13} fontWeight={700}>ESPIRACIÓN</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>(pasiva en reposo)</text>
            <text x={20} y={70} fill={LIENZO.fg} fontSize={11}>• Diafragma se relaja (sube)</text>
            <text x={20} y={88} fill={LIENZO.fg} fontSize={11}>• Costillas bajan</text>
            <text x={20} y={106} fill={LIENZO.fg} fontSize={11}>• ↓ volumen torácico</text>
            <text x={20} y={124} fill={LIENZO.fg} fontSize={11}>• ↑ presión → sale aire</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Ley de Boyle aplicada">
        El aire fluye desde donde hay MÁS presión hacia donde hay MENOS. Al
        aumentar el volumen torácico, la presión interna baja → el aire
        atmosférico (con mayor P) entra.
      </Definicion>

      <Mnemotecnia>
        <strong>"Diafragma baja = inspiras. Diafragma sube = espiras."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscIntercambio() {
  return (
    <EscenaRica>
      <Titulo>Intercambio gaseoso · alvéolo ↔ sangre</Titulo>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Difusión por gradiente de presión
          </text>
          {/* alvéolo */}
          <circle cx={200} cy={110} r={50} fill={LIENZO.ok} opacity={0.2} stroke={LIENZO.ok} strokeWidth={2} />
          <text x={200} y={105} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>Alvéolo</text>
          <text x={200} y={125} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>aire</text>

          {/* capilar */}
          <rect x={350} y={90} width={300} height={40} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={1.5} rx={20} />
          <text x={500} y={113} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>Capilar pulmonar</text>

          {/* flechas */}
          <line x1={250} y1={95} x2={345} y2={95} stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#exArr)" />
          <text x={297} y={87} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>O₂</text>

          <line x1={345} y1={125} x2={250} y2={125} stroke={LIENZO.bad} strokeWidth={2} markerEnd="url(#exArr)" />
          <text x={297} y={142} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={700}>CO₂</text>

          <text x={360} y={185} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            O₂ del aire alveolar → sangre; CO₂ de la sangre → aire alveolar
          </text>

          <defs>
            <marker id="exArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Hematosis (hemato + osis)">
        Intercambio gaseoso alveolar. El O₂ pasa al eritrocito y se une a la
        hemoglobina (Hb). El CO₂ sale al aire alveolar (donde es expulsado).
      </Definicion>

      <Definicion termino="Hemoglobina (Hb)">
        Proteína de 4 cadenas con Fe en el centro. Cada molécula transporta
        4 O₂. Su afinidad por el CO (monóxido) es 200 veces mayor → por eso
        el CO mata (asfixia).
      </Definicion>
    </EscenaRica>
  );
}

function EscAltura() {
  return (
    <EscenaRica>
      <Titulo>Respiración en altura · Cochabamba, La Paz, Potosí</Titulo>

      <Hook>
        En La Paz (3650 msnm), hay 35% menos O₂ que en Santa Cruz. Sin
        adaptación, pierdes conciencia en horas. Los bolivianos andinos están
        adaptados desde la infancia.
      </Hook>

      <Definicion termino="Adaptaciones a la altura">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Poliglobulia:</strong> más eritrocitos para llevar más O₂.</li>
          <li><strong>↑ ventilación:</strong> respirás más rápido y profundo.</li>
          <li><strong>↑ capilarización pulmonar.</strong></li>
          <li><strong>Tórax más amplio</strong> (en nativos andinos).</li>
        </ul>
      </Definicion>

      <Cuidado>
        <strong>Mal de altura (soroche):</strong> cefalea, náuseas, mareos en
        no-adaptados. Prevención: subir gradual, hidratación, mate de coca,
        evitar alcohol. Casos graves → bajar de altitud.
      </Cuidado>

      <Mnemotecnia>
        <strong>"A más altura, menos O₂, más glóbulos rojos."</strong> El
        cuerpo compensa con más cantidad lo que falta en presión.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Inspirar es pasivo'">
        <strong>Realidad:</strong> al revés. Inspiración es ACTIVA (contracción
        del diafragma). Espiración en reposo es pasiva.
      </Misconception>

      <Misconception titulo="Error 2 · 'Los pulmones son simétricos'">
        <strong>Realidad:</strong> NO. Derecho = 3 lóbulos; izquierdo = 2
        (le hace lugar al corazón).
      </Misconception>

      <Misconception titulo="Error 3 · 'Respiramos por la boca y la nariz igual'">
        <strong>Realidad:</strong> NO. La nariz filtra, calienta y humidifica.
        Respirar por la boca aumenta riesgo de infecciones.
      </Misconception>

      <Resumen>
        Vías: nariz → faringe → laringe → tráquea → bronquios → bronquiolos →
        alvéolos. Pulmones: derecho 3 lóbulos, izquierdo 2. Mecánica: diafragma
        baja → entra aire. Hematosis = intercambio alveolo-capilar. Adaptación
        a altura por poliglobulia.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué músculo es el principal de la respiración?"
        opciones={["pectoral", "diafragma", "trapecio", "esternocleidomastoideo"]}
        correctaIdx={1}
        explicacion="El diafragma se contrae y aumenta el volumen torácico para inspirar."
      />

      <AutoCheck
        pregunta="¿Cuántos lóbulos tiene el pulmón izquierdo?"
        opciones={["1", "2", "3", "4"]}
        correctaIdx={1}
        explicacion="2 (deja lugar al corazón). El derecho tiene 3."
      />

      <AutoCheck
        pregunta="¿Dónde ocurre el intercambio gaseoso?"
        opciones={["tráquea", "bronquios", "alvéolos", "pleura"]}
        correctaIdx={2}
        explicacion="En los alvéolos: pared delgada + muchos capilares = intercambio."
      />

      <AutoCheck
        pregunta="¿Por qué hay poliglobulia en altura?"
        opciones={[
          "Más sed",
          "Compensa la baja PO₂ ambiental",
          "Más temperatura",
          "Menos comida",
        ]}
        correctaIdx={1}
        explicacion="Como hay menos O₂ por litro, el cuerpo produce más eritrocitos para captar más O₂."
      />
    </EscenaRica>
  );
}
