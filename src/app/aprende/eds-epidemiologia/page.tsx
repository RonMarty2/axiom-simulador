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

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 360 346" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Prevalencia vs incidencia
          </text>
          <g transform="translate(16, 42)">
            <rect width={328} height={136} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} rx={10} />
            <text x={164} y={24} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>PREVALENCIA</text>
            <text x={164} y={48} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>casos TOTALES</text>
            <text x={164} y={72} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>= casos / población</text>
            <text x={164} y={94} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>en un momento dado</text>
            <text x={164} y={118} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13} fontStyle="italic">¿cuántos enfermos hay HOY?</text>
          </g>
          <g transform="translate(16, 192)">
            <rect width={328} height={136} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={164} y={24} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>INCIDENCIA</text>
            <text x={164} y={48} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>casos NUEVOS</text>
            <text x={164} y={72} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>= casos nuevos / pob</text>
            <text x={164} y={94} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>en un periodo</text>
            <text x={164} y={118} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13} fontStyle="italic">¿cuántos se enferman cada año?</text>
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

      <Pizarra alto={351}>
        <svg width="100%" height="100%" viewBox="0 0 360 405" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Cadena de transmisión (1/2):
          </text>
          <text x={180} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            del agente a la salida
          </text>
          {[
            { cy: 96, t1: "Agente", t2: "", d1: "virus, bacteria,", d2: "hongo" },
            { cy: 212, t1: "Reservorio", t2: "", d1: "humano, animal,", d2: "ambiente" },
            { cy: 328, t1: "Vía de", t2: "salida", d1: "respiratoria,", d2: "fecal-oral" },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={94} cy={p.cy} r={46} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={1.5} />
              {p.t2 ? (
                <>
                  <text x={94} y={p.cy - 3} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{p.t1}</text>
                  <text x={94} y={p.cy + 13} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{p.t2}</text>
                </>
              ) : (
                <text x={94} y={p.cy + 5} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{p.t1}</text>
              )}
              <text x={160} y={p.cy - 2} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>{p.d1}</text>
              <text x={160} y={p.cy + 15} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>{p.d2}</text>
              {i < 2 && (
                <line x1={94} x2={94} y1={p.cy + 48} y2={p.cy + 68} stroke={LIENZO.fg} strokeWidth={1.5} markerEnd="url(#chArr1)" />
              )}
            </g>
          ))}
          <line x1={94} x2={94} y1={376} y2={398} stroke={LIENZO.fg} strokeWidth={1.5} markerEnd="url(#chArr1)" />
          <defs>
            <marker id="chArr1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Pizarra alto={299}>
        <svg width="100%" height="100%" viewBox="0 0 360 345" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Cadena de transmisión (2/2):
          </text>
          <text x={180} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            mecanismo y huésped
          </text>
          <line x1={94} x2={94} y1={50} y2={72} stroke={LIENZO.fg} strokeWidth={1.5} markerEnd="url(#chArr2)" />
          {[
            { cy: 130, t1: "Mecanismo de", t2: "transmisión", d1: "directa, indirecta,", d2: "vector" },
            { cy: 276, t1: "Huésped", t2: "susceptible", d1: "no inmunizado", d2: "" },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={94} cy={p.cy} r={54} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={1.5} />
              <text x={94} y={p.cy - 4} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{p.t1}</text>
              <text x={94} y={p.cy + 13} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{p.t2}</text>
              {p.d2 ? (
                <>
                  <text x={166} y={p.cy - 4} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>{p.d1}</text>
                  <text x={166} y={p.cy + 13} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>{p.d2}</text>
                </>
              ) : (
                <text x={166} y={p.cy + 5} textAnchor="start" fill={LIENZO.fgDim} fontSize={13}>{p.d1}</text>
              )}
            </g>
          ))}
          <line x1={94} x2={94} y1={186} y2={218} stroke={LIENZO.fg} strokeWidth={1.5} markerEnd="url(#chArr2)" />
          <defs>
            <marker id="chArr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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

      <Pizarra alto={291}>
        <svg width="100%" height="100%" viewBox="0 0 360 336" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Pirámide de evidencia
          </text>
          <text x={180} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            (de menos a más rigurosa)
          </text>
          {[
            { y: 54, w: 148, t: "Opinión experta", c: "var(--dib-gray-400)" },
            { y: 92, w: 180, t: "Reporte de caso", c: "var(--dib-violet-400)" },
            { y: 130, w: 216, t: "Transversal (prevalencia)", c: LIENZO.warn },
            { y: 168, w: 252, t: "Caso-control (retrospectivo)", c: "var(--dib-amber-500)" },
            { y: 206, w: 284, t: "Cohortes (prospectivo)", c: LIENZO.ok },
            { y: 244, w: 316, t: "Ensayo clínico aleatorizado (ECA)", c: "var(--dib-green-600)" },
            { y: 282, w: 346, t: "Revisión sistemática / Meta-análisis", c: "var(--dib-green-700)" },
          ].map((n, i) => (
            <g key={i} transform={`translate(${180 - n.w / 2}, ${n.y})`}>
              <rect width={n.w} height={32} fill={n.c} opacity={0.3} stroke={n.c} strokeWidth={1.5} />
              <text x={n.w / 2} y={21} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={600}>{n.t}</text>
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

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 360 288" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tabla 2 × 2 de un test diagnóstico
          </text>
          {/* tabla */}
          <text x={201} y={52} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Enfermedad</text>
          <text x={124} y={72} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={600}>Presente</text>
          <text x={278} y={72} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={600}>Ausente</text>

          <g transform="translate(0, 86)">
            <text x={24} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={600}>Test</text>
            <text x={24} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={600}>+</text>
            <rect x={50} y={0} width={148} height={86} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.5} />
            <text x={124} y={24} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>VP (Verdadero+)</text>
            <text x={124} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>(enfermo</text>
            <text x={124} y={66} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>detectado)</text>
            <rect x={204} y={0} width={148} height={86} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={1.5} />
            <text x={278} y={24} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>FP (Falso+)</text>
            <text x={278} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>(sano marcado</text>
            <text x={278} y={66} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>enfermo)</text>
          </g>

          <g transform="translate(0, 182)">
            <text x={24} y={38} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={600}>Test</text>
            <text x={24} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={600}>−</text>
            <rect x={50} y={0} width={148} height={86} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={1.5} />
            <text x={124} y={24} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>FN (Falso−)</text>
            <text x={124} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>(enfermo no</text>
            <text x={124} y={66} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>detectado)</text>
            <rect x={204} y={0} width={148} height={86} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.5} />
            <text x={278} y={24} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>VN (Verdadero−)</text>
            <text x={278} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>(sano</text>
            <text x={278} y={66} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>confirmado)</text>
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
