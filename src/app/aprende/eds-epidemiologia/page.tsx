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
      unidad="EDS-02"
      tituloUnidad="Epidemiología · Estudio de la salud poblacional"
      escenas={[
        { titulo: "¿Qué es epidemiología?", componente: EscIntro },
        { titulo: "Tasas, prevalencia e incidencia", componente: EscTasas },
        { titulo: "Cadena epidemiológica", componente: EscCadena },
        { titulo: "Tipos de estudios", componente: EscEstudios },
        { titulo: "Sensibilidad y especificidad", componente: EscSenEsp },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Epidemiología · ciencia detective</Titulo>

      <Hook>
        En 1854, John Snow descubrió que el cólera de Londres venía de UNA
        bomba de agua. No por microbios (que aún no se conocían) sino por
        DATOS: cartografió casos y vio el patrón. Eso es epidemiología:
        encontrar patrones para prevenir enfermedades.
      </Hook>

      <Definicion termino="Epidemiología">
        Ciencia que estudia la DISTRIBUCIÓN (quién, dónde, cuándo) y los
        DETERMINANTES (por qué) de eventos relacionados con la salud, para
        controlarlos.
      </Definicion>

      <Mnemotecnia>
        <strong>"Epi (sobre) + demos (pueblo) + logos (estudio)"</strong> =
        estudio sobre el pueblo. No se trata de UN paciente, sino de GRUPOS.
      </Mnemotecnia>

      <Conexion>
        Trabaja con estadística (próxima unidad) e investigación. La
        bioestadística es el lenguaje de la epidemiología.
      </Conexion>
    </EscenaRica>
  );
}

function EscTasas() {
  return (
    <EscenaRica>
      <Titulo>Tasas, prevalencia e incidencia</Titulo>

      <Definicion termino="Tasa">
        Medida de frecuencia de un evento por unidad de población y tiempo.
        Suele expresarse por 1.000 o 100.000 habitantes.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Prevalencia vs incidencia
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={130} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>PREVALENCIA</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>casos TOTALES</text>
            <text x={130} y={70} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>= casos / población</text>
            <text x={130} y={95} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>en un momento dado</text>
            <text x={130} y={115} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">¿cuántos enfermos hay HOY?</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={130} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>INCIDENCIA</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>casos NUEVOS</text>
            <text x={130} y={70} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>= casos nuevos / pob</text>
            <text x={130} y={95} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>en un periodo</text>
            <text x={130} y={115} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">¿cuántos se enferman cada año?</text>
          </g>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Ejemplo · Cochabamba, 2024">
        Población: 600.000. Casos de diabetes existentes: 30.000. Casos nuevos
        en 2024: 1.500.<br />
        Prevalencia = 30.000 / 600.000 = 5%.<br />
        Incidencia = 1.500 / 600.000 = 0.25%/año.
      </WorkedExample>

      <Definicion termino="Tasas relacionadas">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Mortalidad general:</strong> muertes / pob.</li>
          <li><strong>Mortalidad específica:</strong> muertes por una causa.</li>
          <li><strong>Letalidad:</strong> muertes por la enfermedad / total casos.</li>
          <li><strong>Natalidad:</strong> nacimientos / pob.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Prevalencia = stock (total que hay); Incidencia = flujo
        (cuántos nuevos)."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCadena() {
  return (
    <EscenaRica>
      <Titulo>Cadena epidemiológica · cómo se propaga</Titulo>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Eslabones de la cadena de transmisión
          </text>
          {[
            { x: 80, t: "Agente", d: "virus, bacteria, hongo" },
            { x: 220, t: "Reservorio", d: "humano, animal, ambiente" },
            { x: 360, t: "Vía de salida", d: "respiratoria, fecal-oral" },
            { x: 500, t: "Mecanismo de transmisión", d: "directa, indirecta, vector" },
            { x: 640, t: "Huésped susceptible", d: "no inmunizado" },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={100} r={32} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={1.5} />
              <text x={p.x} y={97} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={700}>{p.t}</text>
              <text x={p.x} y={150} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>{p.d.split(",")[0]}</text>
              <text x={p.x} y={163} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>{p.d.split(",").slice(1).join(",")}</text>
              {i < 4 && (
                <line x1={p.x + 34} x2={p.x + 100} y1={100} y2={100} stroke={LIENZO.fg} strokeWidth={1.5} markerEnd="url(#chArr)" />
              )}
            </g>
          ))}
          <defs>
            <marker id="chArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Cómo cortar la cadena">
        Romper CUALQUIER eslabón detiene la propagación:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Agente:</strong> antibióticos, desinfección.</li>
          <li><strong>Reservorio:</strong> sacrificar animales, aislar enfermos.</li>
          <li><strong>Transmisión:</strong> barbijo, lavado de manos, fumigación.</li>
          <li><strong>Huésped:</strong> vacunas.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Las pandemias modernas (COVID-19, dengue, chikungunya) requieren
        ROMPER VARIOS eslabones a la vez: cuarentena (transmisión) + vacunas
        (huésped) + identificación de casos (reservorio).
      </Cuidado>
    </EscenaRica>
  );
}

function EscEstudios() {
  return (
    <EscenaRica>
      <Titulo>Tipos de estudios epidemiológicos</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Pirámide de evidencia (de menos a más rigurosa)
          </text>
          {[
            { y: 50, w: 180, t: "Opinión experta", c: "#9ca3af" },
            { y: 80, w: 250, t: "Reporte de caso", c: "#a78bfa" },
            { y: 110, w: 320, t: "Transversal (prevalencia)", c: LIENZO.warn },
            { y: 140, w: 380, t: "Caso-control (retrospectivo)", c: "#f59e0b" },
            { y: 170, w: 440, t: "Cohortes (prospectivo)", c: LIENZO.ok },
            { y: 200, w: 510, t: "Ensayo clínico aleatorizado (ECA)", c: "#16a34a" },
            { y: 230, w: 570, t: "Revisión sistemática / Meta-análisis", c: "#15803d" },
          ].map((n, i) => (
            <g key={i} transform={`translate(${360 - n.w / 2}, ${n.y})`}>
              <rect width={n.w} height={26} fill={n.c} opacity={0.3} stroke={n.c} strokeWidth={1.5} />
              <text x={n.w / 2} y={17} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>{n.t}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Diseños clave">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Transversal:</strong> foto en un momento (prevalencia).</li>
          <li><strong>Caso-control:</strong> retrospectivo. Compara enfermos vs
            sanos buscando exposición previa.</li>
          <li><strong>Cohortes:</strong> prospectivo. Sigue grupos expuestos y
            no expuestos en el tiempo.</li>
          <li><strong>ECA:</strong> el "gold standard". Asigna tratamiento al
            azar. Permite establecer CAUSALIDAD.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Caso-control mira PARA ATRÁS; cohortes mira PARA ADELANTE;
        ECA es el rey."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSenEsp() {
  return (
    <EscenaRica>
      <Titulo>Sensibilidad y especificidad de un test</Titulo>

      <Definicion termino="Sensibilidad">
        Capacidad de un test para identificar a los ENFERMOS verdaderos.
        Pocos falsos negativos.<br /><br />
        <strong>S = VP / (VP + FN)</strong>
      </Definicion>

      <Definicion termino="Especificidad">
        Capacidad de un test para identificar a los SANOS verdaderos. Pocos
        falsos positivos.<br /><br />
        <strong>E = VN / (VN + FP)</strong>
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tabla 2 × 2 de un test diagnóstico
          </text>
          {/* tabla */}
          <text x={360} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={12} fontWeight={700}>Enfermedad</text>
          <text x={260} y={75} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={600}>Presente</text>
          <text x={460} y={75} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={600}>Ausente</text>

          <g transform="translate(120, 90)">
            <text x={0} y={30} fill={LIENZO.fg} fontSize={11} fontWeight={600}>Test +</text>
            <rect x={60} y={0} width={170} height={50} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.5} />
            <text x={145} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>VP (Verdadero+)</text>
            <text x={145} y={42} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>(enfermo detectado)</text>
            <rect x={240} y={0} width={170} height={50} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={1.5} />
            <text x={325} y={25} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={700}>FP (Falso+)</text>
            <text x={325} y={42} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>(sano marcado enfermo)</text>
          </g>

          <g transform="translate(120, 150)">
            <text x={0} y={30} fill={LIENZO.fg} fontSize={11} fontWeight={600}>Test −</text>
            <rect x={60} y={0} width={170} height={45} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={1.5} />
            <text x={145} y={22} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={700}>FN (Falso−)</text>
            <text x={145} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>(enfermo no detectado)</text>
            <rect x={240} y={0} width={170} height={45} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.5} />
            <text x={325} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>VN (Verdadero−)</text>
            <text x={325} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>(sano confirmado)</text>
          </g>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"SeNsibilidad = pocos N (falsos negativos). ESpecificidad =
        pocos PEs (falsos positivos)."</strong>
      </Mnemotecnia>

      <Cuidado>
        Un test de TAMIZAJE (descartar enfermedad) debe tener alta SENSIBILIDAD
        (no perderse enfermos). Un test de CONFIRMACIÓN debe tener alta
        ESPECIFICIDAD (no etiquetar sanos como enfermos).
      </Cuidado>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Prevalencia = incidencia'">
        <strong>Realidad:</strong> distintas. Prevalencia es el total que
        existe; incidencia son los nuevos casos.
      </Misconception>

      <Misconception titulo="Error 2 · 'Sensibilidad y especificidad son lo mismo'">
        <strong>Realidad:</strong> sensibilidad detecta enfermos;
        especificidad confirma sanos. No coinciden, suelen tener trade-off.
      </Misconception>

      <Misconception titulo="Error 3 · 'Correlación = causalidad'">
        <strong>Realidad:</strong> dos cosas pueden ir juntas sin que una
        cause la otra. Para causalidad necesitas cohortes o ECA.
      </Misconception>

      <Resumen>
        Epidemiología estudia distribución y determinantes en poblaciones.
        Prevalencia (total) vs incidencia (nuevos). Cadena: agente,
        reservorio, salida, transmisión, huésped. Estudios: transversal,
        caso-control, cohorte, ECA. Test: sensibilidad (enfermos),
        especificidad (sanos).
      </Resumen>

      <AutoCheck
        pregunta="¿Qué indicador mide casos NUEVOS por unidad de tiempo?"
        opciones={["prevalencia", "incidencia", "letalidad", "mortalidad"]}
        correctaIdx={1}
        explicacion="Incidencia = casos NUEVOS en un periodo. Prevalencia = total existente."
      />

      <AutoCheck
        pregunta="¿Cuál es el diseño con mayor nivel de evidencia para CAUSALIDAD?"
        opciones={["caso-control", "cohortes", "ECA", "reporte de caso"]}
        correctaIdx={2}
        explicacion="ECA (ensayo clínico aleatorizado) es el gold standard."
      />

      <AutoCheck
        pregunta="Un test de tamizaje (screening) debe tener alta:"
        opciones={["sensibilidad", "especificidad", "ambas son iguales", "letalidad"]}
        correctaIdx={0}
        explicacion="Alta sensibilidad para no perder enfermos. Luego se confirma con un test específico."
      />

      <AutoCheck
        pregunta="¿Cuál eslabón corta el LAVADO DE MANOS?"
        opciones={[
          "Agente",
          "Reservorio",
          "Mecanismo de transmisión",
          "Huésped",
        ]}
        correctaIdx={2}
        explicacion="Interrumpe la transmisión directa (vía contacto manos)."
      />
    </EscenaRica>
  );
}
