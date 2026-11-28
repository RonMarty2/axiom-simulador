"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo,
  Parrafo,
  Definicion,
  Puente,
  Cuidado,
  Resumen,
  EscenaRica,
  AutoCheck,
  Hook,
  Misconception,
  Mnemotecnia,
  Conexion,
  WorkedExample,
} from "../_components/pedagogia";
import MathText from "../../components/MathText";

export default function Page() {
  return (
    <LeccionShell
      unidad="MOR-05"
      tituloUnidad="Articulaciones"
      escenas={[
        {
          titulo: "Qué es una articulación y cómo se clasifican",
          componente: EscClasificacion,
        },
        {
          titulo: "Articulaciones óseas, fibrosas y cartilaginosas",
          componente: EscOseasFibrosasCartilaginosas,
        },
        {
          titulo: "Anatomía de una articulación sinovial y sus anexos",
          componente: EscSinovialAnatomia,
        },
        {
          titulo: "Palancas anatómicas, ejes y movimientos articulares",
          componente: EscPalancasMovimientos,
        },
        {
          titulo: "Las 6 clases de articulaciones sinoviales",
          componente: EscSeisSinoviales,
        },
        {
          titulo: "Articulaciones clave: hombro, codo, cadera y rodilla",
          componente: EscArticulacionesClave,
        },
        {
          titulo: "Lo que más se pregunta y práctica final",
          componente: EscPractica,
        },
      ]}
    />
  );
}

function EscClasificacion() {
  return (
    <EscenaRica>
      <Titulo>Qué es una articulación y cómo se clasifican</Titulo>

      <Hook>
        Dobla tu codo para acercar un vaso a la boca y luego toca la parte
        superior de tu cráneo. En ambos lugares se encuentran dos o más huesos,
        pero uno gira con suavidad casi sin fricción mientras el otro permanece
        sellado como un casco para proteger el encéfalo.
      </Hook>

      <Puente>
        En la vida diaria asociamos la palabra «articulación» solo con bisagras
        móviles como la rodilla o el codo. Sin embargo, los huesos del cráneo
        también se unen entre sí mediante suturas inmóviles. Por eso, en anatomía
        no importa si la unión se mueve o no: basta con que dos huesos se
        encuentren para que exista una articulación.
      </Puente>

      <Definicion termino="Articulación, artrología y quinesiología">
        Una <strong>articulación</strong> es cualquier punto donde confluyen dos
        huesos, sin importar si pueden moverse o no. A partir de esta idea,
        Saladin distingue tres disciplinas relacionadas:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Artrología:</strong> ciencia que estudia la estructura, la
            función y la disfunción de las articulaciones.
          </li>
          <li>
            <strong>Quinesiología:</strong> estudio del movimiento locomotor en
            el que intervienen músculos y huesos.
          </li>
          <li>
            <strong>Biomecánica:</strong> campo más amplio (del cual la
            quinesiología es una rama) que estudia procesos mecánicos del
            cuerpo, incluidos el movimiento, la circulación sanguínea, la
            respiración y la audición.
          </li>
        </ul>
      </Definicion>

      <Parrafo>
        El nombre de casi toda articulación deriva de los huesos que se unen en
        ella. Por ejemplo, la articulación <strong>atlantooccipital</strong>{" "}
        (atlooccipital) une el atlas con los cóndilos occipitales; la{" "}
        <strong>glenohumeral</strong> une la cavidad glenoidea de la escápula
        con el húmero, y la <strong>radiocubital</strong> une el radio con el
        cúbito.
      </Parrafo>

      <Parrafo>
        Las articulaciones cumplen tres papeles en conjunto: dan soporte al
        cuerpo, permiten un movimiento eficaz y protegen órganos blandos.
        Saladin las ordena en <strong>cuatro clases principales</strong> según
        el tejido que une los huesos adyacentes y su grado de movilidad:{" "}
        <strong>sinostosis</strong> (fusión ósea inmóvil),{" "}
        <strong>sinartrosis</strong> (unión fibrosa fija o poco móvil),{" "}
        <strong>anfiartrosis</strong> (unión cartilaginosa de movilidad nula o
        ligera) y <strong>diartrosis</strong> (unión sinovial libremente
        móvil):
      </Parrafo>

      <div style={{ width: "100%", maxWidth: 620, overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            tableLayout: "fixed",
            borderCollapse: "collapse",
            fontSize: 12,
            lineHeight: 1.4,
          }}
        >
          <thead>
            <tr style={{ background: LIENZO.bgSoft, color: LIENZO.fg }}>
              <th
                style={{
                  padding: "6px 4px",
                  textAlign: "left",
                  borderBottom: `2px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Clase estructural
              </th>
              <th
                style={{
                  padding: "6px 4px",
                  textAlign: "left",
                  borderBottom: `2px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Término clásico y movilidad
              </th>
              <th
                style={{
                  padding: "6px 4px",
                  textAlign: "left",
                  borderBottom: `2px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Tejido de unión y movilidad
              </th>
              <th
                style={{
                  padding: "6px 4px",
                  textAlign: "left",
                  borderBottom: `2px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Ejemplos típicos
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  fontWeight: 700,
                  color: LIENZO.bad,
                  overflowWrap: "break-word",
                }}
              >
                Ósea
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Sinostosis (inmóvil)
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Hueso osificado (fusión en un solo hueso). Inmóvil.
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Hueso frontal del adulto, epífisis con diáfisis, isquion con
                pubis.
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  fontWeight: 700,
                  color: LIENZO.accent,
                  overflowWrap: "break-word",
                }}
              >
                Fibrosa
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Sinartrosis (fija o poco móvil)
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Fibras de colágeno. Inmóvil o poco móvil (más móvil en
                sindesmosis).
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Suturas craneales, gonfosis dentales, sindesmosis radio-cúbito.
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  fontWeight: 700,
                  color: LIENZO.warn,
                  overflowWrap: "break-word",
                }}
              >
                Cartilaginosa
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Anfiartrosis (nula o ligera)
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Cartílago hialino o fibrocartílago. Movilidad nula o ligera.
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Primera costilla con esternón, sínfisis púbica, discos
                intervertebrales.
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  fontWeight: 700,
                  color: LIENZO.ok,
                  overflowWrap: "break-word",
                }}
              >
                Sinovial
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Diartrosis (libremente móvil)
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Cavidad articular con líquido sinovial y cápsula. Movimiento
                libre.
              </td>
              <td
                style={{
                  padding: "6px 4px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  overflowWrap: "break-word",
                }}
              >
                Hombro, codo, cadera, rodilla, nudillos, muñeca y tobillo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Mnemotecnia>
        Para recordar las cuatro clases en orden estructural, usa la sigla{" "}
        <strong>O · F · C · S</strong>: <strong>Ó</strong>sea (sinostosis,
        hueso fusionado), <strong>F</strong>ibrosa (sinartrosis, fibras de
        colágeno), <strong>C</strong>artilaginosa (anfiartrosis, cartílago) y{" "}
        <strong>S</strong>inovial (diartrosis, cavidad lubricada). Ten en
        cuenta que no es una escala estricta de movilidad: una sindesmosis
        fibrosa (como entre radio y cúbito) tiene más movilidad que algunas
        articulaciones cartilaginosas.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscOseasFibrosasCartilaginosas() {
  return (
    <EscenaRica>
      <Titulo>Articulaciones óseas, fibrosas y cartilaginosas</Titulo>

      <Parrafo>
        Antes de estudiar las grandes articulaciones móviles de las
        extremidades, conviene distinguir con precisión los tres grupos sin
        cavidad sinovial, porque sus subclases y ejemplos aparecen con mucha
        frecuencia en el examen.
      </Parrafo>

      <Definicion termino="1. Articulaciones óseas (sinostosis)">
        Una <strong>sinostosis</strong> carece por completo de movimiento y se
        forma cuando la separación entre dos huesos se osifica y los funde en un
        solo hueso. Puede originarse por osificación de articulaciones fibrosas
        o cartilaginosas:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Huesos frontal y mandibular:</strong> al nacer existen dos
            mitades (izquierda y derecha) que pronto se fusionan en un solo
            hueso frontal y una sola mandíbula.
          </li>
          <li>
            <strong>Epífisis y diáfisis de huesos largos:</strong> unidas por
            cartílago en la infancia y adolescencia, se convierten en sinostosis
            en la madurez temprana.
          </li>
          <li>
            <strong>Otros ejemplos con la edad:</strong> algunas suturas
            craneales (como entre los parietales), la unión de la primera
            costilla al esternón, las vértebras del sacro y cóccix, y la unión
            del <strong>isquion con el pubis</strong> en el adulto.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="2. Articulaciones fibrosas (sinartrosis)">
        Los huesos adyacentes se unen mediante <strong>fibras de colágeno</strong>{" "}
        que salen de un hueso y penetran en el otro. Saladin distingue{" "}
        <strong>tres subclases</strong>:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Suturas (exclusivas del cráneo):</strong> fibras muy cortas,
            inmóviles o casi inmóviles. Se dividen en tres tipos comparables a
            ensambles de carpintería:
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14.5 }}>
              <li>
                <em>Dentadas (serratas):</em> bordes ondulados que se entrelazan
                como rompecabezas o unión en cola de milano (suturas coronal,
                interparietal y parietoccipital).
              </li>
              <li>
                <em>Escamosas:</em> extremos biselados que se superponen como
                junta en inglete o cuña, con línea exterior suave (sutura
                escamosa entre temporal y parietal).
              </li>
              <li>
                <em>Planas (armónicas):</em> dos orillas rectas sin
                superposición, como tableros en unión recta (entre las apófisis
                palatinas del maxilar superior en el techo de la boca).
              </li>
            </ul>
          </li>
          <li>
            <strong>Gonfosis:</strong> unión de un diente a su alvéolo (como un
            clavo en un madero) mediante el{" "}
            <strong>ligamento periodontal</strong> fibroso. Aunque el diente no
            es un hueso, cede ligeramente al masticar y permite percibir la
            fuerza de la mordida o una partícula entre los dientes.
          </li>
          <li>
            <strong>Sindesmosis:</strong> los huesos están unidos por fibras de
            colágeno más largas, lo que da mayor movilidad que en suturas y
            gonfosis. Destacan la <strong>membrana interósea</strong> entre las
            diáfisis del radio y el cúbito (permite pronación y supinación del
            antebrazo) y la sindesmosis menos móvil entre los extremos distales
            de la tibia y el peroné.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="3. Articulaciones cartilaginosas (anfiartrosis)">
        Los huesos se unen mediante cartílago y se dividen en{" "}
        <strong>dos subclases</strong>:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Sincondrosis:</strong> unión por{" "}
            <strong>cartílago hialino</strong>. Ejemplos: la placa epifisaria
            entre epífisis y diáfisis en un niño, y el cartílago costal hialino
            que une la <strong>primera costilla con el esternón</strong> (que con
            la edad suele osificarse en sinostosis, según Saladin Cap. 9; los
            demás cartílagos costales que llegan al esternón forman
            articulaciones sinoviales).
          </li>
          <li>
            <strong>Sínfisis:</strong> unión por <strong>fibrocartílago</strong>.
            Ejemplos: la <strong>sínfisis púbica</strong> (con su disco
            interpúbico entre ambos pubis) y los{" "}
            <strong>discos intervertebrales</strong> entre cuerpos vertebrales
            (23 discos en total; cada uno se mueve poco, pero juntos dan gran
            flexibilidad a la columna).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={280}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 280"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Esquema de articulaciones fibrosas y cartilaginosas: sutura dentada con colágeno corto, sindesmosis con fibras largas, sincondrosis con cartílago hialino y sínfisis con fibrocartílago"
        >
          <title>Articulaciones fibrosas y cartilaginosas</title>
          <text
            x={180}
            y={20}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            Fibrosas y cartilaginosas
          </text>

          {/* Cuadrante 1: Sutura dentada */}
          <rect
            x={14}
            y={34}
            width={160}
            height={110}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <path
            d="M 28 52 L 94 52 L 88 60 L 100 68 L 88 76 L 100 84 L 88 92 L 94 98 L 28 98 Z"
            fill={LIENZO.warn}
            opacity={0.18}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <path
            d="M 94 52 L 160 52 L 160 98 L 94 98 L 88 92 L 100 84 L 88 76 L 100 68 L 88 60 Z"
            fill={LIENZO.warn}
            opacity={0.12}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <path
            d="M 94 52 L 88 60 L 100 68 L 88 76 L 100 84 L 88 92 L 94 98"
            fill="none"
            stroke={LIENZO.accent}
            strokeWidth={2.4}
          />
          <text
            x={94}
            y={119}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={13}
            fontWeight={700}
          >
            Sutura dentada
          </text>
          <text
            x={94}
            y={137}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={13}
          >
            Colágeno corto
          </text>

          {/* Cuadrante 2: Sindesmosis */}
          <rect
            x={186}
            y={34}
            width={160}
            height={110}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <rect
            x={216}
            y={46}
            width={24}
            height={54}
            rx={6}
            fill={LIENZO.warn}
            opacity={0.18}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <rect
            x={292}
            y={46}
            width={24}
            height={54}
            rx={6}
            fill={LIENZO.warn}
            opacity={0.18}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <line
            x1={240}
            y1={56}
            x2={292}
            y2={62}
            stroke={LIENZO.accent}
            strokeWidth={2}
          />
          <line
            x1={240}
            y1={69}
            x2={292}
            y2={75}
            stroke={LIENZO.accent}
            strokeWidth={2}
          />
          <line
            x1={240}
            y1={82}
            x2={292}
            y2={88}
            stroke={LIENZO.accent}
            strokeWidth={2}
          />
          <text
            x={266}
            y={119}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={13}
            fontWeight={700}
          >
            Sindesmosis
          </text>
          <text
            x={266}
            y={137}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={13}
          >
            Fibras largas
          </text>

          {/* Cuadrante 3: Sincondrosis */}
          <rect
            x={14}
            y={156}
            width={160}
            height={110}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <path
            d="M 56 190 Q 56 167 94 167 Q 132 167 132 190 Z"
            fill={LIENZO.warn}
            opacity={0.18}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <rect
            x={58}
            y={192}
            width={72}
            height={10}
            rx={3}
            fill={LIENZO.ok}
            opacity={0.38}
            stroke={LIENZO.ok}
            strokeWidth={1.5}
          />
          <rect
            x={66}
            y={204}
            width={56}
            height={18}
            rx={3}
            fill={LIENZO.warn}
            opacity={0.18}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <text
            x={94}
            y={241}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={13}
            fontWeight={700}
          >
            Sincondrosis
          </text>
          <text
            x={94}
            y={259}
            textAnchor="middle"
            fill={LIENZO.ok}
            fontSize={13}
          >
            Cartílago hialino
          </text>

          {/* Cuadrante 4: Sínfisis */}
          <rect
            x={186}
            y={156}
            width={160}
            height={110}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <rect
            x={226}
            y={168}
            width={80}
            height={18}
            rx={4}
            fill={LIENZO.warn}
            opacity={0.18}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <rect
            x={228}
            y={189}
            width={76}
            height={12}
            rx={5}
            fill={LIENZO.bad}
            opacity={0.28}
            stroke={LIENZO.bad}
            strokeWidth={1.5}
          />
          <line
            x1={234}
            y1={195}
            x2={298}
            y2={195}
            stroke={LIENZO.bad}
            strokeWidth={1}
            strokeDasharray="3 2"
          />
          <rect
            x={226}
            y={204}
            width={80}
            height={18}
            rx={4}
            fill={LIENZO.warn}
            opacity={0.18}
            stroke={LIENZO.fg}
            strokeWidth={1.5}
          />
          <text
            x={266}
            y={241}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={13}
            fontWeight={700}
          >
            Sínfisis
          </text>
          <text
            x={266}
            y={259}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={13}
          >
            Fibrocartílago
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        A diferencia de casi todos los ligamentos del cuerpo, el{" "}
        <strong>ligamento periodontal</strong> de una gonfosis no une hueso con
        hueso, sino un diente con la matriz ósea de su alvéolo. Y recuerda que
        solo la <strong>primera costilla</strong> forma una sincondrosis con el
        esternón; los demás cartílagos costales esternales se articulan por
        articulaciones sinoviales.
      </Cuidado>

      <AutoCheck
        pregunta="En la radiografía de un niño de 10 años, la epífisis y la diáfisis del fémur siguen unidas por una placa de cartílago hialino; a los 25 años esa placa ya se osificó en un solo hueso. ¿Qué cambio de clasificación articular ocurrió entre ambas edades?"
        opciones={[
          "Pasó de una sínfisis con fibrocartílago a una sindesmosis",
          "Pasó de una sindesmosis fibrosa a una sincondrosis fija",
          "Pasó de una sincondrosis cartilaginosa a una sinostosis",
          "Pasó de una diartrosis sinovial a una sutura dentada firme",
        ]}
        correctaIdx={2}
        explicacion="Paso 1: identifica la unión en la infancia. La placa epifisaria está hecha de cartílago hialino, por lo que forma una sincondrosis (articulación cartilaginosa). Paso 2: identifica el cambio al llegar a la adultez. Cuando el cartílago se osifica y funde epífisis y diáfisis en un solo hueso inmóvil, la articulación se convierte en una sinostosis (articulación ósea)."
      />
    </EscenaRica>
  );
}

function EscSinovialAnatomia() {
  return (
    <EscenaRica>
      <Titulo>Anatomía de una articulación sinovial y sus anexos</Titulo>

      <Parrafo>
        Las <strong>articulaciones sinoviales (diartrosis)</strong> son las más
        móviles y complejas del cuerpo, y también las más relevantes en
        fisioterapia y traumatología. Aunque algunas tienen movimiento amplio
        (hombro, codo, rodilla) y otras más limitado (carpo, tarso, apófisis
        articulares vertebrales), todas comparten el mismo plan anatómico.
      </Parrafo>

      <Pizarra alto={320}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 320"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Corte de una articulación sinovial con huesos adyacentes, periostio, cápsula fibrosa externa, membrana sinovial interna, cartílago hialino articular, cavidad con líquido sinovial y ligamento externo en el lado izquierdo unido de hueso a hueso"
        >
          <title>Corte de una articulación sinovial típica</title>
          <text
            x={180}
            y={20}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            Corte de articulación sinovial
          </text>

          {/* Hueso superior (centrado en x=104) */}
          <path
            d="M 78 38 L 78 82 Q 62 98 66 120 Q 74 138 104 138 Q 134 138 142 120 Q 146 98 130 82 L 130 38 Z"
            fill={LIENZO.warn}
            opacity={0.16}
            stroke={LIENZO.fg}
            strokeWidth={1.8}
          />

          {/* Hueso inferior (centrado en x=104) */}
          <path
            d="M 78 278 L 78 234 Q 62 218 66 196 Q 74 178 104 178 Q 134 178 142 196 Q 146 218 130 234 L 130 278 Z"
            fill={LIENZO.warn}
            opacity={0.16}
            stroke={LIENZO.fg}
            strokeWidth={1.8}
          />

          {/* Cavidad sinovial cerrada por membrana sinovial y cartílagos */}
          <path
            d="M 67 122 Q 76 140 104 140 Q 132 140 141 122 Q 157 128 158 158 Q 157 188 141 194 Q 132 176 104 176 Q 76 176 67 194 Q 51 188 50 158 Q 51 128 67 122 Z"
            fill={LIENZO.accent}
            opacity={0.14}
          />

          {/* Cartílagos articulares hialinos */}
          <path
            d="M 67 122 Q 76 142 104 142 Q 132 142 141 122 Q 132 134 104 134 Q 76 134 67 122 Z"
            fill={LIENZO.ok}
            opacity={0.5}
            stroke={LIENZO.ok}
            strokeWidth={1.5}
          />
          <path
            d="M 67 194 Q 76 174 104 174 Q 132 174 141 194 Q 132 182 104 182 Q 76 182 67 194 Z"
            fill={LIENZO.ok}
            opacity={0.5}
            stroke={LIENZO.ok}
            strokeWidth={1.5}
          />

          {/* Membrana sinovial interna sellando los márgenes del cartílago */}
          <path
            d="M 67 122 Q 51 128 50 158 Q 51 188 67 194"
            fill="none"
            stroke={LIENZO.bad}
            strokeWidth={2.4}
          />
          <path
            d="M 141 122 Q 157 128 158 158 Q 157 188 141 194"
            fill="none"
            stroke={LIENZO.bad}
            strokeWidth={2.4}
          />

          {/* Periostio explícito adherido a los bordes externos del hueso */}
          <line x1={75} y1={38} x2={75} y2={68} stroke={LIENZO.fgDim} strokeWidth={2.2} />
          <line x1={133} y1={38} x2={133} y2={68} stroke={LIENZO.fgDim} strokeWidth={2.2} />
          <line x1={75} y1={248} x2={75} y2={278} stroke={LIENZO.fgDim} strokeWidth={2.2} />
          <line x1={133} y1={248} x2={133} y2={278} stroke={LIENZO.fgDim} strokeWidth={2.2} />

          {/* Cápsula fibrosa externa continua con el periostio */}
          <path
            d="M 75 68 Q 42 112 42 158 Q 42 204 75 248"
            fill="none"
            stroke={LIENZO.fg}
            strokeWidth={2.2}
          />
          <path
            d="M 133 68 Q 166 112 166 158 Q 166 204 133 248"
            fill="none"
            stroke={LIENZO.fg}
            strokeWidth={2.2}
          />

          {/* Ligamento externo en el lado izquierdo, unido de hueso a hueso (libera el lado derecho) */}
          <path
            d="M 74 72 C 20 100 20 216 74 244"
            fill="none"
            stroke={LIENZO.accent}
            strokeWidth={4.2}
            strokeLinecap="round"
            opacity={0.82}
          />

          {/* Etiqueta izquierda inferior del ligamento externo (sin cruzar ninguna estructura) */}
          <polyline
            points="34,194 34,302 52,302"
            fill="none"
            stroke={LIENZO.accent}
            strokeWidth={1.2}
          />
          <circle cx={34} cy={194} r={2.5} fill={LIENZO.accent} />
          <text x={56} y={306} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Ligamento externo
          </text>

          {/* Líneas guía y etiquetas derechas ordenadas por altura y sin cruzar el ligamento */}
          <line x1={133} y1={52} x2={188} y2={52} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <circle cx={133} cy={52} r={2.5} fill={LIENZO.fgDim} />
          <text x={192} y={56} fill={LIENZO.fg} fontSize={13} fontWeight={600}>
            Periostio
          </text>

          <line x1={151} y1={96} x2={188} y2={96} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <circle cx={151} cy={96} r={2.5} fill={LIENZO.fg} />
          <text x={192} y={100} fill={LIENZO.fg} fontSize={13} fontWeight={600}>
            Cápsula fibrosa
          </text>

          <line x1={136} y1={130} x2={188} y2={130} stroke={LIENZO.ok} strokeWidth={1.2} />
          <circle cx={136} cy={130} r={2.5} fill={LIENZO.ok} />
          <text x={192} y={134} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Cartílago hialino
          </text>

          <line x1={120} y1={162} x2={188} y2={162} stroke={LIENZO.accent} strokeWidth={1.2} />
          <circle cx={120} cy={162} r={2.5} fill={LIENZO.accent} />
          <text x={192} y={166} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Cavidad y líquido
          </text>

          <line x1={154} y1={184} x2={188} y2={198} stroke={LIENZO.bad} strokeWidth={1.2} />
          <circle cx={154} cy={184} r={2.5} fill={LIENZO.bad} />
          <text x={192} y={202} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Membrana sinovial
          </text>

          <line x1={130} y1={262} x2={188} y2={262} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <circle cx={130} cy={262} r={2.5} fill={LIENZO.fg} />
          <text x={192} y={266} fill={LIENZO.fg} fontSize={13} fontWeight={600}>
            Hueso adyacente
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Componentes propios de una diartrosis">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Cartílago articular:</strong> capa de{" "}
            <strong>cartílago hialino</strong> (de dos a tres milímetros de
            espesor según Saladin Cap. 9) que cubre
            las superficies óseas enfrentadas. Es <strong>avascular</strong>: el
            ejercicio lo comprime y descompresiona como una esponja para
            expulsar desechos y absorber líquido sinovial con oxígeno y
            nutrientes.
          </li>
          <li>
            <strong>Cavidad articular y líquido sinovial:</strong> espacio
            estrecho relleno de un lubricante viscoso y resbaloso (similar a la
            clara de huevo), rico en <strong>albúmina</strong> y{" "}
            <strong>ácido hialurónico</strong>. Nutre el cartílago, elimina
            desechos y vuelve casi nulo el rozamiento. Con el calentamiento
            previo al ejercicio, el líquido se vuelve menos viscoso y el
            cartílago lo absorbe mejor.
          </li>
          <li>
            <strong>Cápsula articular:</strong> retiene el líquido y consta de
            una <strong>cápsula fibrosa externa</strong> continua con el
            periostio y una <strong>membrana sinovial interna</strong> con
            células parecidas a fibroblastos (que secretan el líquido sinovial)
            y <strong>macrófagos</strong> (que eliminan desperdicios).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Almohadillas de fibrocartílago y estructuras accesorias">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Discos articulares:</strong> almohadillas de fibrocartílago
            que cruzan toda la cápsula articular, presentes en la articulación{" "}
            <strong>temporomandibular</strong>, en ambos extremos de la
            clavícula (esternoclavicular y acromioclavicular) y entre el cúbito
            y el carpo.
          </li>
          <li>
            <strong>Meniscos:</strong> fibrocartílagos en forma de luna
            creciente (en C) que no cruzan por completo la cavidad, propios de
            la <strong>rodilla</strong>. Tanto discos como meniscos absorben el
            choque, guían los huesos, mejoran el encaje y estabilizan la
            articulación.
          </li>
          <li>
            <strong>Tendones:</strong> tiras u hojas de tejido conjuntivo denso
            que unen <strong>músculo a hueso</strong>. Suelen ser los
            estabilizadores más importantes de una articulación.
          </li>
          <li>
            <strong>Ligamentos:</strong> tejido conjuntivo similar que une{" "}
            <strong>hueso a hueso</strong>.
          </li>
          <li>
            <strong>Bolsas serosas (bursas):</strong> sacos fibrosos llenos de
            líquido sinovial entre músculos adyacentes, donde un tendón pasa
            sobre un hueso, o entre hueso y piel. Amortiguan y facilitan el
            deslizamiento tendinoso.
          </li>
          <li>
            <strong>Vainas tendinosas (sinoviales):</strong> bolsas cilíndricas
            y alargadas que envuelven un tendón, sobre todo en espacios
            estrechos de <strong>manos y pies</strong> (muñeca y tobillo).
          </li>
        </ul>
      </Definicion>

      <AutoCheck
        pregunta="El cartílago articular que recubre la rodilla carece de vasos sanguíneos propios. Durante una caminata con calentamiento previo, ¿cómo obtiene oxígeno y nutrientes y cómo elimina sus desechos?"
        opciones={[
          "Se comprime como esponja e intercambia sustancias con el líquido sinovial",
          "Recibe sangre capilar directa desde la cápsula fibrosa externa del hueso",
          "Toma nutrientes desde la médula ósea a través del ligamento extracapsular",
          "Depende de las bolsas serosas subcutáneas que rodean la piel de la rodilla",
        ]}
        correctaIdx={0}
        explicacion="Paso 1: recuerda que el cartílago articular es cartílago hialino avascular, por lo que no le llegan vasos sanguíneos directos. Paso 2: al mover la articulación, el cartílago se comprime y descompresiona como una esponja, expulsando desechos y absorbiendo oxígeno y nutrientes del líquido sinovial (que el calentamiento hace menos viscoso)."
      />
    </EscenaRica>
  );
}

function EscPalancasMovimientos() {
  return (
    <EscenaRica>
      <Titulo>Palancas anatómicas, ejes y movimientos articulares</Titulo>

      <Parrafo>
        Muchos huesos largos funcionan como <strong>palancas</strong> rígidas
        que giran alrededor de un punto fijo llamado <strong>fulcro</strong> (la
        articulación). Un músculo aplica el <strong>esfuerzo</strong> en su
        inserción ósea para vencer una <strong>resistencia</strong> (una pesa,
        el peso de la extremidad o un músculo opuesto).
      </Parrafo>

      <Definicion termino="Ventaja mecánica (VM) y compensación fuerza vs. velocidad">
        Llamamos <MathText>{"$L_E$"}</MathText> a la longitud del{" "}
        <strong>brazo de esfuerzo</strong> (distancia del fulcro al esfuerzo) y{" "}
        <MathText>{"$L_R$"}</MathText> a la longitud del{" "}
        <strong>brazo de resistencia</strong> (distancia del fulcro a la
        resistencia). La <strong>ventaja mecánica</strong> es su cociente:{" "}
        <MathText>{"$VM = \\dfrac{L_E}{L_R}$"}</MathText>.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            Si <MathText>{"$VM > 1$"}</MathText> (porque{" "}
            <MathText>{"$L_E > L_R$"}</MathText>): la palanca multiplica la{" "}
            <strong>fuerza</strong>, pero reduce la velocidad y la distancia de
            desplazamiento.
          </li>
          <li>
            Si <MathText>{"$VM < 1$"}</MathText> (porque{" "}
            <MathText>{"$L_E < L_R$"}</MathText>): la palanca exige más fuerza
            muscular, pero gana <strong>velocidad y distancia</strong>. La
            mayoría de las palancas del aparato locomotor trabajan con{" "}
            <MathText>{"$VM < 1$"}</MathText>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={338}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 338"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Comparación de las tres clases de palancas anatómicas: primera clase con fulcro en medio (E, F, R), segunda clase con resistencia en medio y ventaja mecánica mayor que 1 (F, R, E) y tercera clase con esfuerzo en medio y ventaja mecánica menor que 1 (F, E, R)"
        >
          <title>Las tres clases de palancas anatómicas</title>
          <text
            x={180}
            y={20}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            Las 3 clases de palancas
          </text>

          <defs>
            <marker
              id="arrPalOk"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
            <marker
              id="arrPalBad"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.bad} />
            </marker>
          </defs>

          {/* Banda 1: 1a clase (E - F - R) */}
          <rect
            x={12}
            y={32}
            width={336}
            height={92}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <text x={22} y={50} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            1.ª clase (E · F · R)
          </text>
          <text
            x={338}
            y={50}
            textAnchor="end"
            fill={LIENZO.fgDim}
            fontSize={13}
          >
            Cuello (atlas)
          </text>
          <line
            x1={44}
            y1={86}
            x2={316}
            y2={86}
            stroke={LIENZO.fg}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <line
            x1={76}
            y1={58}
            x2={76}
            y2={80}
            stroke={LIENZO.ok}
            strokeWidth={2.5}
            markerEnd="url(#arrPalOk)"
          />
          <text x={54} y={77} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            E
          </text>
          <polygon points="180,88 169,105 191,105" fill={LIENZO.accent} />
          <text
            x={180}
            y={119}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={13}
            fontWeight={700}
          >
            F
          </text>
          <line
            x1={284}
            y1={58}
            x2={284}
            y2={80}
            stroke={LIENZO.bad}
            strokeWidth={2.5}
            markerEnd="url(#arrPalBad)"
          />
          <text x={298} y={77} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            R
          </text>

          {/* Banda 2: 2a clase (F - R - E) */}
          <rect
            x={12}
            y={134}
            width={336}
            height={92}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <text x={22} y={152} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            2.ª clase (F · R · E)
          </text>
          <text
            x={338}
            y={152}
            textAnchor="end"
            fill={LIENZO.ok}
            fontSize={13}
            fontWeight={700}
          >
            VM &gt; 1 (fuerza)
          </text>
          <line
            x1={44}
            y1={188}
            x2={316}
            y2={188}
            stroke={LIENZO.fg}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <polygon points="68,190 57,207 79,207" fill={LIENZO.accent} />
          <text
            x={68}
            y={221}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={13}
            fontWeight={700}
          >
            F
          </text>
          <line
            x1={166}
            y1={160}
            x2={166}
            y2={182}
            stroke={LIENZO.bad}
            strokeWidth={2.5}
            markerEnd="url(#arrPalBad)"
          />
          <text
            x={166}
            y={214}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={13}
            fontWeight={700}
          >
            R
          </text>
          <line
            x1={292}
            y1={184}
            x2={292}
            y2={160}
            stroke={LIENZO.ok}
            strokeWidth={2.5}
            markerEnd="url(#arrPalOk)"
          />
          <text
            x={292}
            y={214}
            textAnchor="middle"
            fill={LIENZO.ok}
            fontSize={13}
            fontWeight={700}
          >
            E
          </text>

          {/* Banda 3: 3a clase (F - E - R) */}
          <rect
            x={12}
            y={236}
            width={336}
            height={92}
            rx={10}
            fill={LIENZO.bgSoft}
            stroke={LIENZO.fgFaint}
            strokeWidth={1}
          />
          <text x={22} y={254} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            3.ª clase (F · E · R)
          </text>
          <text
            x={338}
            y={254}
            textAnchor="end"
            fill={LIENZO.bad}
            fontSize={13}
            fontWeight={700}
          >
            VM &lt; 1 (rapidez)
          </text>
          <line
            x1={44}
            y1={290}
            x2={316}
            y2={290}
            stroke={LIENZO.fg}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <polygon points="68,292 57,309 79,309" fill={LIENZO.accent} />
          <text
            x={68}
            y={323}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={13}
            fontWeight={700}
          >
            F
          </text>
          <line
            x1={148}
            y1={286}
            x2={148}
            y2={262}
            stroke={LIENZO.ok}
            strokeWidth={2.5}
            markerEnd="url(#arrPalOk)"
          />
          <text
            x={148}
            y={316}
            textAnchor="middle"
            fill={LIENZO.ok}
            fontSize={13}
            fontWeight={700}
          >
            E
          </text>
          <line
            x1={292}
            y1={262}
            x2={292}
            y2={284}
            stroke={LIENZO.bad}
            strokeWidth={2.5}
            markerEnd="url(#arrPalBad)"
          />
          <text
            x={292}
            y={316}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={13}
            fontWeight={700}
          >
            R
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Las tres clases de palancas en el cuerpo">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Primera clase (fulcro en medio, E · F · R):</strong> como un
            subibaja. Ejemplo clásico: articulación{" "}
            <strong>atlantooccipital</strong> (músculos de la nuca tiran atrás
            del occipital como esfuerzo, el cóndilo occipital actúa como fulcro
            en medio y la cabeza tiende a caer adelante como resistencia).
            También el codo al extenderse (tríceps) y el{" "}
            <strong>
              balanceo del pie sobre la tibia (pararse en puntas de pies o
              elevación de talón)
            </strong>
            : según Saladin, el <strong>fulcro</strong> está en medio (la
            articulación del tobillo donde el pie pivota sobre la tibia), el{" "}
            <strong>esfuerzo</strong> lo aplican los músculos de la pantorrilla
            al tirar del talón en el extremo posterior y la{" "}
            <strong>resistencia</strong> actúa en el extremo anterior del pie
            (dedos). Saladin advierte que esta acción suele malinterpretarse
            como palanca de segunda clase por un parecido superficial entre
            pararse en puntas de pies y levantar una carretilla de mano.
          </li>
          <li>
            <strong>Segunda clase (resistencia en medio, F · R · E):</strong>{" "}
            como una carretilla. Siempre tiene{" "}
            <MathText>{"$L_E > L_R$"}</MathText> y{" "}
            <MathText>{"$VM > 1$"}</MathText> (gana fuerza). Ejemplos de
            Saladin: abrir la mandíbula contra resistencia con el músculo
            digástrico (fulcro en la articulación temporomandibular, resistencia
            en la tensión del músculo temporal en medio y esfuerzo del
            digástrico en el mentón) y elevar la rodilla estando sentado (fulcro
            en la cadera, peso del muslo en medio y cuádriceps elevando la tibia
            en el extremo opuesto).
          </li>
          <li>
            <strong>Tercera clase (esfuerzo en medio, F · E · R):</strong> como
            un remo. Siempre tiene <MathText>{"$L_E < L_R$"}</MathText> y{" "}
            <MathText>{"$VM < 1$"}</MathText> (gana velocidad y alcance). Es la
            más abundante del cuerpo: al flexionar el codo, el fulcro es el
            codo, el <strong>bíceps braquial</strong> aplica el esfuerzo en el
            radio y la resistencia es el peso del antebrazo o una carga en la
            mano.
          </li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Cálculo de ventaja mecánica en dos ejemplos de Saladin">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Flexión del codo (3.ª clase, bíceps braquial):</strong>{" "}
            <MathText>{"$L_E = 50\\text{ mm}$"}</MathText> y{" "}
            <MathText>{"$L_R = 330\\text{ mm}$"}</MathText>. Entonces{" "}
            <MathText>
              {"$VM = \\dfrac{50\\text{ mm}}{330\\text{ mm}} = \\dfrac{5}{33} \\approx 0{,}15$"}
            </MathText>{" "}
            (menor que 1: baja potencia, alta velocidad en la mano).
          </li>
          <li>
            <strong>Apertura forzada de la mandíbula (2.ª clase):</strong>{" "}
            <MathText>{"$L_E = 95\\text{ mm}$"}</MathText> y{" "}
            <MathText>{"$L_R = 35\\text{ mm}$"}</MathText>. Entonces{" "}
            <MathText>
              {"$VM = \\dfrac{95\\text{ mm}}{35\\text{ mm}} = \\dfrac{19}{7} \\approx 2{,}7$"}
            </MathText>{" "}
            (mayor que 1: alta potencia, baja velocidad).
          </li>
        </ul>
      </WorkedExample>

      <Definicion termino="Rango de movimiento y grados de libertad">
        El <strong>rango de movimiento</strong> (grados que puede recorrer una
        articulación, como 130° a 140° de flexión en la rodilla) depende de tres
        factores: la <strong>forma de las superficies óseas</strong> (el
        olécranon encaja en su fosa e impide extender el codo más de 180°), la{" "}
        <strong>tensión de ligamentos y cápsulas</strong> (quienes tienen «doble
        articulación» poseen ligamentos más largos o laxos) y la{" "}
        <strong>acción y el tono de músculos y tendones</strong>.
        <br />
        Un hueso gira alrededor de un eje perpendicular a su plano de
        movimiento. Según cuántos planos anatómicos (sagital, frontal,
        transverso) puede recorrer, la articulación tiene 1, 2 o 3{" "}
        <strong>grados de libertad</strong>: <strong>monoaxial</strong> (1 eje),{" "}
        <strong>biaxial</strong> (2 ejes) o <strong>multiaxial</strong> (3
        ejes).
      </Definicion>

      <Parrafo>
        En posición anatómica estándar, cada articulación parte desde la{" "}
        <strong>posición cero</strong>. Para no memorizar una lista aislada,
        observa primero los seis pares opuestos en movimiento y luego consulta
        su resumen organizado por plano y región:
      </Parrafo>

      <Pizarra alto={356}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 356"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Seis pares opuestos de movimientos articulares desde posición cero: flexión y extensión, abducción y aducción, elevación y depresión, protracción y retracción, supinación y pronación del antebrazo, y dorsiflexión y flexión plantar del pie"
        >
          <title>Movimientos articulares opuestos desde posición cero</title>
          <defs>
            <marker id="arrMovAcc" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.accent} />
            </marker>
            <marker id="arrMovOk" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.ok} />
            </marker>
          </defs>

          <text x={180} y={18} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Movimientos opuestos (posición cero)
          </text>

          {/* 1. Flexión / Extensión (codo recto 180° en posición cero) */}
          <rect x={12} y={28} width={162} height={102} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <line x1={76} y1={36} x2={76} y2={62} stroke={LIENZO.fg} strokeWidth={4} strokeLinecap="round" />
          <line x1={76} y1={62} x2={76} y2={88} stroke={LIENZO.ok} strokeWidth={3.4} strokeLinecap="round" strokeDasharray="4 3" />
          <line x1={76} y1={62} x2={98} y2={48} stroke={LIENZO.accent} strokeWidth={3.8} strokeLinecap="round" />
          <circle cx={76} cy={62} r={4} fill={LIENZO.warn} />
          <path d="M 84 87 A 26 26 0 0 0 101 57" fill="none" stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrMovAcc)" />
          <path d="M 109 55 A 34 34 0 0 1 92 92" fill="none" stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#arrMovOk)" />
          <text x={93} y={106} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Flexión (cierra)
          </text>
          <text x={93} y={123} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={600}>
            Extensión (abre)
          </text>

          {/* 2. Abducción / Aducción */}
          <rect x={186} y={28} width={162} height={102} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <line x1={236} y1={36} x2={236} y2={88} stroke={LIENZO.fgDim} strokeWidth={1.4} strokeDasharray="3 3" />
          <line x1={250} y1={46} x2={250} y2={86} stroke={LIENZO.ok} strokeWidth={3.4} strokeLinecap="round" strokeDasharray="4 3" />
          <line x1={250} y1={46} x2={294} y2={60} stroke={LIENZO.accent} strokeWidth={3.8} strokeLinecap="round" />
          <circle cx={250} cy={46} r={4} fill={LIENZO.warn} />
          <path d="M 260 84 A 36 36 0 0 0 294 66" fill="none" stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrMovAcc)" />
          <path d="M 296 72 A 42 42 0 0 1 264 89" fill="none" stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#arrMovOk)" />
          <text x={267} y={106} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Abducción (aleja)
          </text>
          <text x={267} y={123} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={600}>
            Aducción (acerca)
          </text>

          {/* 3. Elevación / Depresión */}
          <rect x={12} y={138} width={162} height={102} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <line x1={62} y1={174} x2={122} y2={174} stroke={LIENZO.fgDim} strokeWidth={2} strokeDasharray="3 3" />
          <rect x={68} y={150} width={48} height={10} rx={5} fill={LIENZO.accent} opacity={0.35} stroke={LIENZO.accent} strokeWidth={1.6} />
          <rect x={68} y={188} width={48} height={10} rx={5} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.6} />
          <line x1={134} y1={174} x2={134} y2={150} stroke={LIENZO.accent} strokeWidth={2.2} markerEnd="url(#arrMovAcc)" />
          <line x1={50} y1={174} x2={50} y2={198} stroke={LIENZO.ok} strokeWidth={2.2} markerEnd="url(#arrMovOk)" />
          <text x={93} y={216} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Elevación (sube)
          </text>
          <text x={93} y={233} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={600}>
            Depresión (baja)
          </text>

          {/* 4. Protracción / Retracción */}
          <rect x={186} y={138} width={162} height={102} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <line x1={267} y1={146} x2={267} y2={200} stroke={LIENZO.fgDim} strokeWidth={1.4} strokeDasharray="3 3" />
          <rect x={286} y={154} width={28} height={14} rx={4} fill={LIENZO.accent} opacity={0.3} stroke={LIENZO.accent} strokeWidth={1.6} />
          <rect x={220} y={178} width={28} height={14} rx={4} fill={LIENZO.ok} opacity={0.28} stroke={LIENZO.ok} strokeWidth={1.6} />
          <line x1={250} y1={161} x2={281} y2={161} stroke={LIENZO.accent} strokeWidth={2.2} markerEnd="url(#arrMovAcc)" />
          <line x1={284} y1={185} x2={253} y2={185} stroke={LIENZO.ok} strokeWidth={2.2} markerEnd="url(#arrMovOk)" />
          <text x={267} y={216} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Protracción (frente)
          </text>
          <text x={267} y={233} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={600}>
            Retracción (atrás)
          </text>

          {/* 5. Supinación / Pronación */}
          <rect x={12} y={248} width={162} height={102} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <line x1={48} y1={260} x2={48} y2={302} stroke={LIENZO.ok} strokeWidth={3.6} strokeLinecap="round" />
          <line x1={62} y1={260} x2={62} y2={302} stroke={LIENZO.ok} strokeWidth={3.6} strokeLinecap="round" />
          <path d="M 74 281 L 96 281" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#arrMovAcc)" />
          <line x1={112} y1={260} x2={134} y2={302} stroke={LIENZO.accent} strokeWidth={3.6} strokeLinecap="round" />
          <line x1={134} y1={260} x2={112} y2={302} stroke={LIENZO.accent} strokeWidth={3.6} strokeLinecap="round" />
          <text x={93} y={326} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Supinación (paralelo)
          </text>
          <text x={93} y={343} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={600}>
            Pronación (cruce X)
          </text>

          {/* 6. Dorsiflexión / Flexión plantar */}
          <rect x={186} y={248} width={162} height={102} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <line x1={238} y1={256} x2={238} y2={290} stroke={LIENZO.fg} strokeWidth={4} strokeLinecap="round" />
          <line x1={238} y1={290} x2={284} y2={290} stroke={LIENZO.fgDim} strokeWidth={2.4} strokeDasharray="3 3" />
          <line x1={238} y1={290} x2={282} y2={272} stroke={LIENZO.accent} strokeWidth={3.8} strokeLinecap="round" />
          <line x1={238} y1={290} x2={280} y2={306} stroke={LIENZO.ok} strokeWidth={3.8} strokeLinecap="round" />
          <circle cx={238} cy={290} r={4} fill={LIENZO.warn} />
          <path d="M 294 288 A 28 28 0 0 0 288 268" fill="none" stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#arrMovAcc)" />
          <path d="M 294 292 A 28 28 0 0 1 286 309" fill="none" stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#arrMovOk)" />
          <text x={267} y={326} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Dorsiflexión (sube)
          </text>
          <text x={267} y={343} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={600}>
            Plantar (baja pie)
          </text>
        </svg>
      </Pizarra>

      <div style={{ width: "100%", maxWidth: 620, overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13.5,
            lineHeight: 1.45,
          }}
        >
          <thead>
            <tr style={{ background: LIENZO.bgSoft, color: LIENZO.fg }}>
              <th
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  borderBottom: `2px solid ${LIENZO.fgFaint}`,
                }}
              >
                Plano o región
              </th>
              <th
                style={{
                  padding: "8px 10px",
                  textAlign: "left",
                  borderBottom: `2px solid ${LIENZO.fgFaint}`,
                }}
              >
                Movimientos y referencia desde posición cero
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: "8px 10px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  fontWeight: 700,
                  color: LIENZO.accent,
                }}
              >
                Plano sagital
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                }}
              >
                <strong>Flexión</strong> (reduce el ángulo, como doblar el codo),{" "}
                <strong>extensión</strong> (endereza hacia la posición cero) e{" "}
                <strong>hiperextensión</strong> (pasa más allá de la posición
                cero, como mirar al cielo o llevar el brazo detrás del tronco).
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 10px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  fontWeight: 700,
                  color: LIENZO.ok,
                }}
              >
                Plano frontal y combinado
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                }}
              >
                <strong>Abducción / aducción</strong> (alejar y acercar a la
                línea media), <strong>elevación / depresión</strong> (subir y
                bajar hombros o mandíbula) y <strong>circunducción</strong>{" "}
                (un extremo fijo y el otro traza un círculo combinando flexión,
                abducción, extensión y aducción).
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 10px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  fontWeight: 700,
                  color: LIENZO.warn,
                }}
              >
                Plano transverso y eje axial
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                }}
              >
                <strong>Protracción / retracción</strong> (desplazar hacia
                delante y hacia atrás), <strong>rotación medial / lateral</strong>{" "}
                (girar un hueso sobre su eje longitudinal hacia dentro o fuera) y{" "}
                <strong>supinación / pronación</strong> del antebrazo (palma al
                frente con radio y cúbito paralelos frente a palma atrás con el
                radio cruzando en X).
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "8px 10px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                  fontWeight: 700,
                  color: LIENZO.bad,
                }}
              >
                Exclusivos de mano y pie
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  borderBottom: `1px solid ${LIENZO.fgFaint}`,
                }}
              >
                Pulgar: <strong>oposición</strong> (tocar otro dedo) y{" "}
                <strong>reposición</strong> (regreso); muñeca: flexión radial y
                cubital. Pie: <strong>dorsiflexión / flexión plantar</strong>{" "}
                (subir o bajar el pie) e <strong>inversión / eversión</strong>{" "}
                (dirigir las plantas hacia medial o hacia lateral).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Mnemotecnia>
        Truco directo de Saladin para antebrazo: para sostener un plato de{" "}
        <strong>sopa</strong> en la palma sin derramarlo debes{" "}
        <strong>supinar</strong> (palma arriba). Además, el músculo supinador es
        más fuerte que el pronador: por eso los tornillos se aprietan girando en
        sentido horario con la mano derecha.
      </Mnemotecnia>

      <AutoCheck
        pregunta="En una palanca corporal, el fulcro queda en un extremo, la resistencia se ubica a 80 mm del fulcro y el esfuerzo muscular se aplica a 200 mm del fulcro. ¿Qué clase de palanca actúa y cuál es su ventaja mecánica?"
        opciones={[
          "Primera clase, con VM = 0,40 que prioriza la rapidez",
          "Tercera clase, con VM = 0,40 que prioriza la velocidad",
          "Tercera clase, con VM = 2,50 que prioriza la amplitud",
          "Segunda clase, con VM = 2,50 que prioriza la fuerza",
        ]}
        correctaIdx={3}
        explicacion="Paso 1: ordena los tres puntos desde el extremo del fulcro. Como la resistencia (80 mm) queda entre el fulcro (0 mm) y el esfuerzo (200 mm), el orden es F · R · E: es una palanca de segunda clase. Paso 2: calcula VM = L_E / L_R = 200 mm / 80 mm = 2,50. Paso 3: como VM es mayor que 1, la palanca multiplica la fuerza a cambio de menor velocidad."
      />
    </EscenaRica>
  );
}

function EscSeisSinoviales() {
  return (
    <EscenaRica>
      <Titulo>Las 6 clases de articulaciones sinoviales</Titulo>

      <Parrafo>
        Las diartrosis se agrupan en <strong>seis tipos fundamentales</strong>{" "}
        según la geometría de sus superficies articulares y sus grados de
        libertad. Un detalle práctico que señala Saladin: los seis tipos están
        representados en las extremidades superiores. Obsérvalos en orden
        descendente de movilidad:
      </Parrafo>

      <Pizarra alto={368}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 368"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Los seis tipos de articulaciones sinoviales y sus movimientos: enartrosis multiaxial de 3 ejes, condílea biaxial en 2 planos sin rotación axial, silla de montar biaxial con dos superficies recíprocas encajadas como jinete y silla, plana o artrodia de deslizamiento entre superficies planas, bisagra o gínglimo monoaxial de 1 eje y pivote o trocoide monoaxial de rotación longitudinal"
        >
          <title>Seis tipos de articulaciones sinoviales y sus ejes</title>
          <defs>
            <marker id="arrSinAcc" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.8" markerHeight="4.8" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.accent} />
            </marker>
            <marker id="arrSinOk" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.8" markerHeight="4.8" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.ok} />
            </marker>
            <marker id="arrSinWarn" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.8" markerHeight="4.8" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.warn} />
            </marker>
            <marker id="arrSinBad" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.8" markerHeight="4.8" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill={LIENZO.bad} />
            </marker>
          </defs>

          <text
            x={180}
            y={18}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            6 tipos sinoviales y sus ejes
          </text>

          {/* 1. Enartrosis (3 ejes / multiaxial: balanceo lateral, anteroposterior y giro longitudinal) */}
          <rect x={12} y={28} width={162} height={104} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          {/* Copa articular inferior */}
          <path d="M 73 72 A 20 20 0 0 0 113 72 L 106 88 L 80 88 Z" fill={LIENZO.warn} opacity={0.18} stroke={LIENZO.fg} strokeWidth={1.8} />
          {/* Cabeza esférica + cuello/eje del hueso superior */}
          <path d="M 88 37 L 98 37 L 98 60 L 88 60 Z" fill={LIENZO.accent} opacity={0.22} stroke={LIENZO.accent} strokeWidth={1.5} />
          <circle cx={93} cy={69} r={13} fill={LIENZO.accent} opacity={0.3} stroke={LIENZO.accent} strokeWidth={1.8} />
          {/* Eje 1: balanceo izquierda-derecha */}
          <path d="M 62 56 Q 74 44 86 46" fill="none" stroke={LIENZO.accent} strokeWidth={1.5} markerStart="url(#arrSinAcc)" markerEnd="url(#arrSinAcc)" />
          {/* Eje 2: balanceo adelante-atrás (oblicuo) */}
          <path d="M 101 47 Q 116 49 124 62" fill="none" stroke={LIENZO.accent} strokeWidth={1.5} markerStart="url(#arrSinAcc)" markerEnd="url(#arrSinAcc)" />
          {/* Eje 3: giro axial alrededor del cuello */}
          <path d="M 81 39 A 14 4.5 0 1 0 105 39" fill="none" stroke={LIENZO.accent} strokeWidth={1.5} markerStart="url(#arrSinAcc)" markerEnd="url(#arrSinAcc)" />
          <text x={93} y={108} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Enartrosis
          </text>
          <text x={93} y={125} textAnchor="middle" fill={LIENZO.accent} fontSize={13}>
            3 ejes · Hombro
          </text>

          {/* 2. Condílea (2 ejes / biaxial: 2 planos perpendiculares, SIN rotación axial) */}
          <rect x={186} y={28} width={162} height={104} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          {/* Depresión ovalada inferior */}
          <path d="M 241 72 Q 267 92 293 72 L 287 88 L 247 88 Z" fill={LIENZO.warn} opacity={0.18} stroke={LIENZO.fg} strokeWidth={1.8} />
          {/* Cóndilo oval superior con cuello */}
          <path d="M 262 39 L 272 39 L 272 57 L 262 57 Z" fill={LIENZO.ok} opacity={0.22} stroke={LIENZO.ok} strokeWidth={1.5} />
          <ellipse cx={267} cy={66} rx={18} ry={10} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.8} />
          {/* Dos planos perpendiculares de balanceo (sin giro sobre el eje vertical) */}
          <path d="M 237 54 Q 248 42 260 44" fill="none" stroke={LIENZO.ok} strokeWidth={1.5} markerStart="url(#arrSinOk)" markerEnd="url(#arrSinOk)" />
          <path d="M 275 46 Q 290 48 298 60" fill="none" stroke={LIENZO.ok} strokeWidth={1.5} markerStart="url(#arrSinOk)" markerEnd="url(#arrSinOk)" />
          <text x={267} y={108} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Condílea
          </text>
          <text x={267} y={125} textAnchor="middle" fill={LIENZO.ok} fontSize={13}>
            2 ejes · Muñeca
          </text>

          {/* 3. Silla de montar (2 ejes / biaxial: superficies recíprocas cóncavo-convexas encajadas) */}
          <rect x={12} y={142} width={162} height={104} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          {/* Hueso inferior (silla): cóncavo de izq. a der. (valle en U) y convexo de atrás hacia delante */}
          <path
            d="M 60 184 L 60 197 Q 82 211 104 202 L 126 186 L 126 174 Q 104 188 82 168 Q 71 169 60 184 Z"
            fill={LIENZO.warn}
            opacity={0.2}
            stroke={LIENZO.fg}
            strokeWidth={1.6}
          />
          <path
            d="M 82 168 Q 104 188 126 174 Q 115 177 104 193 Q 82 204 60 184 Q 71 169 82 168 Z"
            fill={LIENZO.warn}
            opacity={0.32}
            stroke={LIENZO.fg}
            strokeWidth={1.8}
          />
          {/* Hueso superior (jinete recíproco): convexo entrando al valle izq-der y cóncavo abrazando el lomo atrás-adelante */}
          <path
            d="M 84 148 L 100 148 L 103 160 Q 112 164 113 171 Q 100 179 86 184 Q 75 182 72 175 Q 76 164 82 160 Z"
            fill={LIENZO.ok}
            opacity={0.34}
            stroke={LIENZO.ok}
            strokeWidth={1.8}
          />
          {/* Curva interna visible del encaje recíproco */}
          <path d="M 74 174 Q 93 185 111 170" fill="none" stroke={LIENZO.ok} strokeWidth={1.5} />
          {/* Dos planos perpendiculares de balanceo (izq-der en el valle y delante-atrás sobre el lomo) */}
          <path d="M 62 154 Q 76 146 82 150" fill="none" stroke={LIENZO.ok} strokeWidth={1.5} markerStart="url(#arrSinOk)" markerEnd="url(#arrSinOk)" />
          <path d="M 108 152 Q 124 156 130 168" fill="none" stroke={LIENZO.ok} strokeWidth={1.5} markerStart="url(#arrSinOk)" markerEnd="url(#arrSinOk)" />
          <text x={93} y={222} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Silla de montar
          </text>
          <text x={93} y={239} textAnchor="middle" fill={LIENZO.ok} fontSize={13}>
            2 ejes · Pulgar
          </text>

          {/* 4. Plana / artrodia (deslizamiento entre superficies planas en 2 direcciones del plano) */}
          <rect x={186} y={142} width={162} height={104} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          {/* Bloque plano inferior en perspectiva 2.5D */}
          <polygon points="234,186 286,186 302,174 250,174" fill={LIENZO.warn} opacity={0.22} stroke={LIENZO.fg} strokeWidth={1.6} />
          <polygon points="234,186 286,186 286,198 234,198" fill={LIENZO.warn} opacity={0.14} stroke={LIENZO.fg} strokeWidth={1.6} />
          <polygon points="286,186 302,174 302,186 286,198" fill={LIENZO.warn} opacity={0.24} stroke={LIENZO.fg} strokeWidth={1.6} />
          {/* Bloque plano superior ligeramente elevado */}
          <polygon points="234,164 286,164 302,152 250,152" fill={LIENZO.ok} opacity={0.28} stroke={LIENZO.ok} strokeWidth={1.6} />
          <polygon points="234,164 286,164 286,171 234,171" fill={LIENZO.ok} opacity={0.18} stroke={LIENZO.ok} strokeWidth={1.6} />
          <polygon points="286,164 302,152 302,159 286,171" fill={LIENZO.ok} opacity={0.24} stroke={LIENZO.ok} strokeWidth={1.6} />
          {/* Flechas de deslizamiento en el plano articular (izq-der y delante-atrás, sin atravesar hueso) */}
          <line x1={216} y1={174} x2={244} y2={174} stroke={LIENZO.ok} strokeWidth={1.6} markerStart="url(#arrSinOk)" markerEnd="url(#arrSinOk)" />
          <line x1={304} y1={170} x2={322} y2={156} stroke={LIENZO.ok} strokeWidth={1.6} markerStart="url(#arrSinOk)" markerEnd="url(#arrSinOk)" />
          <text x={267} y={222} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Plana (artrodia)
          </text>
          <text x={267} y={239} textAnchor="middle" fill={LIENZO.ok} fontSize={13}>
            Desliza · Carpo
          </text>

          {/* 5. Gínglimo / bisagra (1 eje transversal, flexión-extensión) */}
          <rect x={12} y={256} width={162} height={104} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          {/* Depresión en C */}
          <path d="M 65 288 Q 65 306 93 306 Q 121 306 121 288" fill="none" stroke={LIENZO.fg} strokeWidth={2.4} />
          {/* Cilindro (tróclea) */}
          <rect x={69} y={276} width={48} height={18} rx={9} fill={LIENZO.warn} opacity={0.32} stroke={LIENZO.warn} strokeWidth={1.8} />
          {/* Un único eje transversal */}
          <line x1={52} y1={285} x2={134} y2={285} stroke={LIENZO.warn} strokeWidth={1.4} strokeDasharray="3 2" />
          {/* Arco de flexión/extensión en 1 plano */}
          <path d="M 85 264 A 18 18 0 0 1 112 272" fill="none" stroke={LIENZO.warn} strokeWidth={1.6} markerStart="url(#arrSinWarn)" markerEnd="url(#arrSinWarn)" />
          <text x={93} y={336} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Bisagra (gínglimo)
          </text>
          <text x={93} y={353} textAnchor="middle" fill={LIENZO.warn} fontSize={13}>
            1 eje · Codo
          </text>

          {/* 6. Trocoide / pivote (1 eje longitudinal, rotación) */}
          <rect x={186} y={256} width={162} height={104} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1} />
          {/* Anillo óseo/ligamentoso detrás */}
          <path d="M 244 287 A 23 7 0 0 1 290 287" fill="none" stroke={LIENZO.fg} strokeWidth={2} />
          {/* Pivote cilíndrico vertical */}
          <rect x={259} y={268} width={16} height={40} rx={5} fill={LIENZO.bad} opacity={0.28} stroke={LIENZO.bad} strokeWidth={1.8} />
          {/* Anillo óseo/ligamentoso delante */}
          <path d="M 244 287 A 23 7 0 0 0 290 287" fill="none" stroke={LIENZO.fg} strokeWidth={2.2} />
          {/* Un único eje longitudinal */}
          <line x1={267} y1={261} x2={267} y2={313} stroke={LIENZO.bad} strokeWidth={1.4} strokeDasharray="3 2" />
          {/* Flecha de giro alrededor del eje */}
          <path d="M 251 271 A 17 5 0 1 0 283 271" fill="none" stroke={LIENZO.bad} strokeWidth={1.6} markerStart="url(#arrSinBad)" markerEnd="url(#arrSinBad)" />
          <text x={267} y={336} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Pivote (trocoide)
          </text>
          <text x={267} y={353} textAnchor="middle" fill={LIENZO.bad} fontSize={13}>
            1 eje · Atlas-axis
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Detalle y ejemplos de cada clase sinovial">
        <ol style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Esferoidea o enartrosis (multiaxial, 3 ejes):</strong>{" "}
            cabeza hemisférica en cavidad en forma de copa. Son las únicas
            articulaciones multiaxiales del cuerpo:{" "}
            <strong>hombro (glenohumeral)</strong> y{" "}
            <strong>cadera (coxofemoral)</strong>.
          </li>
          <li>
            <strong>Condílea o elipsoidea (biaxial, 2 ejes):</strong>{" "}
            superficie convexa oval que encaja en una depresión complementaria.
            Ejemplos: <strong>radiocarpiana</strong> (muñeca) y{" "}
            <strong>metacarpofalángicas</strong> (base de los dedos).
          </li>
          <li>
            <strong>En silla de montar o sellar (biaxial, 2 ejes):</strong>{" "}
            ambos huesos son cóncavos en una dirección y convexos en la
            perpendicular. Ejemplos: <strong>trapeciometacarpiana</strong> en la
            base del pulgar (hace posible el pulgar oponible) y{" "}
            <strong>esternoclavicular</strong>.
          </li>
          <li>
            <strong>Plana o artrodia (por lo general biaxial):</strong>{" "}
            superficies planas o levemente curvas que se deslizan entre sí.
            Ejemplos: <strong>intercarpianas</strong> (muñeca),{" "}
            <strong>intertarsianas</strong> (tobillo),{" "}
            <strong>apófisis articulares vertebrales</strong> y la articulación
            femororrotuliana.
          </li>
          <li>
            <strong>En bisagra, troclear o gínglimo (monoaxial, 1 eje):</strong>{" "}
            superficie convexa no hemisférica en depresión cóncava, como una
            bisagra de puerta. Ejemplos: <strong>codo (humerocubital)</strong>,{" "}
            <strong>interfalángicas</strong> (dedos de manos y pies) y{" "}
            <strong>rodilla</strong> en su plano principal.
          </li>
          <li>
            <strong>En pivote o trocoide (monoaxial, 1 eje):</strong> un hueso
            gira sobre su eje longitudinal. Ejemplos:{" "}
            <strong>atlantoaxoidea (atloaxial)</strong> entre atlas y diente del
            axis (girar la cabeza al decir «no») y{" "}
            <strong>radiocubital proximal</strong> en el codo (la cabeza del
            radio gira dentro del ligamento anular durante pronación y
            supinación).
          </li>
        </ol>
      </Definicion>

      <Cuidado>
        Saladin recuerda que esta clasificación es imperfecta en casos mixtos:
        la articulación <strong>temporomandibular</strong> combina rasgos de
        condílea, gínglimo y artrodia; la <strong>rodilla</strong> es un
        gínglimo clásico con un componente trocoide al fijarse de pie; y la{" "}
        <strong>humerorradial</strong> actúa como gínglimo al flexionar el codo
        y como trocoide al pronar el antebrazo.
      </Cuidado>

      <AutoCheck
        pregunta="Al negar con la cabeza diciendo «no», al tocar el meñique con el pulgar (oposición) y al mover el brazo en los tres planos anatómicos, ¿qué clases de articulaciones sinoviales intervienen en ese orden?"
        opciones={[
          "Bisagra (gínglimo), condílea (elipsoidea) y plana (artrodia)",
          "Pivote (trocoide), silla de montar y enartrosis (esferoidea)",
          "Condílea (elipsoidea), pivote (trocoide) y plana (artrodia)",
          "Plana (artrodia), bisagra (gínglimo) y silla de montar sellar",
        ]}
        correctaIdx={1}
        explicacion="Paso 1: decir «no» gira el atlas sobre el diente del axis en un solo eje longitudinal (pivote o trocoide). Paso 2: la oposición del pulgar ocurre en la articulación trapeciometacarpiana, que es biaxial en silla de montar. Paso 3: el hombro es una enartrosis (esferoidea), una de las únicas dos articulaciones multiaxiales del cuerpo junto con la cadera."
      />
    </EscenaRica>
  );
}

function EscArticulacionesClave() {
  return (
    <EscenaRica>
      <Titulo>Articulaciones clave: hombro, codo, cadera y rodilla</Titulo>

      <Parrafo>
        Las cuatro grandes articulaciones de las extremidades concentran la
        mayoría de las preguntas anatómicas y clínicas de Saladin Cap. 9.
        Fíjate en el equilibrio entre <strong>movilidad</strong> y{" "}
        <strong>estabilidad</strong> en cada una.
      </Parrafo>

      <Definicion termino="1. Hombro (articulación glenohumeral)">
        Une la cabeza hemisférica del húmero con la{" "}
        <strong>cavidad glenoidea</strong> superficial de la escápula. Sacrifica
        estabilidad para lograr la mayor libertad de movimiento del cuerpo:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Labio (rodete) glenoideo:</strong> anillo de fibrocartílago
            en el margen glenoideo que profundiza un poco la cavidad.
          </li>
          <li>
            <strong>Manguito de los rotadores (4 músculos):</strong> tendones de{" "}
            <strong>supraespinoso, infraespinoso, redondo menor y subescapular</strong>,
            fusionados con la cápsula por todos los lados{" "}
            <strong>excepto el inferior</strong>. Por esa ausencia inferior (y
            la protección superior de coracoides, acromion y clavícula), la{" "}
            <strong>dislocación más común</strong> del hombro ocurre hacia
            abajo.
          </li>
          <li>
            <strong>Estabilización adicional y anexos:</strong> el tendón de la
            cabeza larga del <strong>bíceps braquial</strong> (sujeto en el
            surco intertubercular por el ligamento humeral transverso) presiona
            la cabeza humeral contra la glenoidea, aunque{" "}
            <strong>no forma parte</strong> del manguito rotador. Hay 5
            ligamentos principales (3 glenohumerales débiles, coracohumeral y
            humeral transverso) y 4 bolsas (subdeltoidea, subacromial,
            subcoracoidea y subescapular).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="2. Codo (humerocubital, humerorradial y radiocubital proximal)">
        El gínglimo del codo reúne dos articulaciones dentro de una sola
        cápsula: la <strong>humerocubital</strong> (tróclea del húmero con
        escotadura troclear del cúbito) y la <strong>humerorradial</strong>{" "}
        (capítulo (cóndilo) del húmero con la cabeza del radio). Los{" "}
        <strong>ligamentos colateral radial (lateral)</strong> y{" "}
        <strong>colateral cubital (medial)</strong> frenan los movimientos
        laterales, y atrás se ubica la <strong>bolsa del olécranon</strong>. En
        la misma región está la <strong>radiocubital proximal</strong> (trocoide
        con <strong>ligamento anular</strong> rodeando la cabeza radial), que
        permite pronación y supinación pero no participa del gínglimo.
      </Definicion>

      <Definicion termino="3. Cadera (articulación coxofemoral o coxal)">
        La cabeza del fémur encaja en el <strong>acetábulo</strong> profundo del
        hueso coxal, ampliado por el <strong>labio acetabular</strong> de
        fibrocartílago en herradura y el ligamento acetabular transverso. Al
        soportar el peso corporal, es mucho más estable y menos propensa a
        dislocarse que el hombro.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Ligamentos de soporte:</strong> <strong>iliofemoral</strong>{" "}
            y <strong>pubofemoral</strong> (anteriores) e{" "}
            <strong>isquiofemoral</strong> (posterior). Al estar de pie se
            tuercen y presionan con fuerza la cabeza femoral dentro del
            acetábulo.
          </li>
          <li>
            <strong>Ligamento redondo (ligamento de la cabeza del fémur):</strong>{" "}
            va desde la <strong>fóvea de la cabeza</strong> femoral al margen
            inferior del acetábulo. Es algo flojo (no es quien mantiene con
            firmeza al fémur en la cavidad), pero conduce una{" "}
            <strong>arteria que irriga la cabeza del fémur</strong>.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="4. Rodilla (articulación tibiofemoral y femororrotuliana)">
        Es la diartrosis <strong>más grande y compleja</strong> del cuerpo:
        funciona sobre todo como gínglimo (con ligera rotación y deslizamiento
        cuando está flexionada) y suma la articulación{" "}
        <strong>femororrotuliana</strong> (artrodia). La cápsula cubre solo los
        lados lateral y posterior; adelante la reemplazan el{" "}
        <strong>ligamento rotuliano</strong> y los retináculos del cuádriceps.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Meniscos medial y lateral:</strong> fibrocartílagos en forma
            de C unidos por el ligamento transverso; amortiguan el peso y evitan
            que el fémur se balancee lateralmente sobre la tibia.
          </li>
          <li>
            <strong>Ligamentos colaterales (extracapsulares):</strong>{" "}
            <strong>colateral tibial (medial)</strong> y{" "}
            <strong>colateral peroneo o fibular (lateral)</strong>; evitan que
            la rodilla rote cuando está extendida.
          </li>
          <li>
            <strong>Ligamentos cruzados (intracapsulares, en X):</strong>{" "}
            reciben su nombre por su unión a la <strong>tibia</strong> (no al
            fémur) y quedan fuera de la cavidad llena de líquido porque la
            membrana sinovial se repliega sobre ellos. El{" "}
            <strong>ligamento cruzado anterior (LCA)</strong> se tensa en
            extensión y <strong>evita la hiperextensión</strong> (es uno de los
            sitios más comunes de lesión); el{" "}
            <strong>ligamento cruzado posterior (LCP)</strong>{" "}
            evita que el fémur se deslice hacia delante o la tibia hacia atrás.
          </li>
          <li>
            <strong>Bolsas y bloqueo:</strong> tiene al menos 13 bolsas, 4 de
            ellas anteriores alrededor de la rótula (suprarrotuliana,{" "}
            <strong>prerrotuliana</strong>, infrarrotuliana superficial e
            infrarrotuliana profunda). En extensión máxima el fémur rota
            medialmente para bloquear la rodilla; el músculo{" "}
            <strong>poplíteo</strong> la desbloquea rotándolo lateralmente.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={378}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 378"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Vista anterior de la rodilla derecha mostrando fémur, tibia, peroné lateral, meniscos lateral y medial apoyados directamente sobre la meseta tibial, ligamentos cruzados anterior (LCA) y posterior (LCP) y ligamentos colaterales peroneo y tibial unidos a sus huesos"
        >
          <title>Anatomía de la rodilla derecha en vista anterior</title>
          <text
            x={180}
            y={18}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            Rodilla derecha (vista anterior)
          </text>

          <text x={48} y={40} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Lateral
          </text>
          <text x={144} y={40} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Medial
          </text>

          {/* Fémur distal con epicóndilos lateral (x=54) y medial (x=150) */}
          <path
            d="M 80 48 L 80 88 Q 54 100 54 126 Q 54 152 76 154 Q 92 154 96 136 Q 102 122 108 136 Q 112 154 128 154 Q 150 152 150 126 Q 150 100 124 88 L 124 48 Z"
            fill={LIENZO.warn}
            opacity={0.16}
            stroke={LIENZO.fg}
            strokeWidth={1.8}
          />

          {/* Tibia proximal con meseta tibial horizontal en y=174 */}
          <path
            d="M 54 174 L 94 174 Q 102 169 110 174 L 150 174 Q 152 196 132 208 L 128 246 L 76 246 L 72 208 Q 52 196 54 174 Z"
            fill={LIENZO.warn}
            opacity={0.16}
            stroke={LIENZO.fg}
            strokeWidth={1.8}
          />

          {/* Peroné (lado lateral = izquierda) */}
          <path
            d="M 35 202 Q 43 192 51 202 L 49 246 L 33 246 Z"
            fill={LIENZO.warn}
            opacity={0.14}
            stroke={LIENZO.fg}
            strokeWidth={1.6}
          />

          {/* Menisco lateral apoyado directamente sobre la meseta tibial (y=174, 0 px de hueco) */}
          <path
            d="M 55 174 L 94 174 L 94 170 Q 74 167 55 156 Z"
            fill={LIENZO.ok}
            opacity={0.5}
            stroke={LIENZO.ok}
            strokeWidth={1.5}
          />

          {/* Menisco medial apoyado directamente sobre la meseta tibial (y=174, 0 px de hueco) */}
          <path
            d="M 149 174 L 110 174 L 110 170 Q 130 167 149 156 Z"
            fill={LIENZO.ok}
            opacity={0.5}
            stroke={LIENZO.ok}
            strokeWidth={1.5}
          />

          {/* LCP (detrás: tibia posterior hacia cóndilo medial) */}
          <line
            x1={96}
            y1={171}
            x2={112}
            y2={134}
            stroke={LIENZO.accent}
            strokeWidth={3.8}
            strokeLinecap="round"
            opacity={0.78}
          />

          {/* LCA (delante: tibia anterior hacia cóndilo lateral) */}
          <line
            x1={107}
            y1={173}
            x2={92}
            y2={134}
            stroke={LIENZO.bad}
            strokeWidth={4.2}
            strokeLinecap="round"
          />

          {/* Colateral peroneo continuo desde epicóndilo lateral del fémur (56,118) a cabeza del peroné (43,200) */}
          <path
            d="M 56 118 Q 43 158 43 200"
            fill="none"
            stroke={LIENZO.fgDim}
            strokeWidth={3.8}
            strokeLinecap="round"
          />

          {/* Colateral tibial continuo desde epicóndilo medial del fémur (148,118) a tibia medial (136,204) */}
          <path
            d="M 148 118 Q 158 162 136 204"
            fill="none"
            stroke={LIENZO.warn}
            strokeWidth={4.2}
            strokeLinecap="round"
          />

          {/* Etiquetas inferiores e izquierdas (sin cruces ni abreviaturas) */}
          <line x1={41} y1={238} x2={41} y2={254} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <circle cx={41} cy={238} r={2.5} fill={LIENZO.fg} />
          <text x={22} y={268} fill={LIENZO.fg} fontSize={13} fontWeight={600}>
            Peroné
          </text>

          <polyline
            points="74,170 74,290 84,290"
            fill="none"
            stroke={LIENZO.ok}
            strokeWidth={1.2}
          />
          <circle cx={74} cy={170} r={2.5} fill={LIENZO.ok} />
          <text x={88} y={294} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Menisco lateral
          </text>

          <polyline
            points="46,154 14,154 14,316 24,316"
            fill="none"
            stroke={LIENZO.fgDim}
            strokeWidth={1.2}
          />
          <circle cx={46} cy={154} r={2.5} fill={LIENZO.fgDim} />
          <text x={28} y={320} fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>
            Colateral peroneo
          </text>

          {/* Etiquetas derechas (sin abreviaturas y sin cruzar el colateral tibial) */}
          <line x1={124} y1={58} x2={180} y2={58} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <circle cx={124} cy={58} r={2.5} fill={LIENZO.fg} />
          <text x={184} y={62} fill={LIENZO.fg} fontSize={13} fontWeight={600}>
            Fémur
          </text>

          <polyline
            points="97,148 97,86 180,86"
            fill="none"
            stroke={LIENZO.bad}
            strokeWidth={1.2}
          />
          <circle cx={97} cy={148} r={2.5} fill={LIENZO.bad} />
          <text x={184} y={90} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            LCA (anterior)
          </text>

          <polyline
            points="109,142 109,112 180,112"
            fill="none"
            stroke={LIENZO.accent}
            strokeWidth={1.2}
          />
          <circle cx={109} cy={142} r={2.5} fill={LIENZO.accent} />
          <text x={184} y={116} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            LCP (posterior)
          </text>

          <line x1={153} y1={154} x2={180} y2={154} stroke={LIENZO.warn} strokeWidth={1.2} />
          <circle cx={153} cy={154} r={2.5} fill={LIENZO.warn} />
          <text x={184} y={158} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Colateral tibial
          </text>

          <polyline
            points="130,170 130,214 180,214"
            fill="none"
            stroke={LIENZO.ok}
            strokeWidth={1.2}
          />
          <circle cx={130} cy={170} r={2.5} fill={LIENZO.ok} />
          <text x={184} y={218} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Menisco medial
          </text>

          <line x1={128} y1={240} x2={180} y2={240} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <circle cx={128} cy={240} r={2.5} fill={LIENZO.fg} />
          <text x={184} y={244} fill={LIENZO.fg} fontSize={13} fontWeight={600}>
            Tibia
          </text>

          {/* Leyenda inequívoca según Saladin Cap. 9 */}
          <text
            x={180}
            y={346}
            textAnchor="middle"
            fill={LIENZO.bad}
            fontSize={13}
            fontWeight={700}
          >
            LCA: evita la hiperextensión
          </text>
          <text
            x={180}
            y={366}
            textAnchor="middle"
            fill={LIENZO.accent}
            fontSize={13}
            fontWeight={700}
          >
            LCP: frena tibia atrás y fémur adelante
          </text>
        </svg>
      </Pizarra>

      <Parrafo>
        En la vista anterior de la rodilla derecha, el lado lateral (izquierda
        del dibujo) muestra el peroné, el ligamento colateral peroneo y el
        menisco lateral; en el lado medial (derecha) el ligamento colateral
        tibial se relaciona estrechamente con el menisco medial.
      </Parrafo>

      <Cuidado>
        <strong>Lesión combinada de rodilla (tríada infeliz):</strong> Saladin
        (Conocimiento más a fondo 9.4 y Fig. 9.30) destaca que la rodilla es muy
        vulnerable a la <strong>tensión rotatoria y horizontal</strong>, sobre
        todo cuando está <strong>flexionada</strong> (como al correr o patinar)
        con el <strong>pie fijo</strong> y recibe un{" "}
        <strong>golpe de atrás o de un lado</strong> con giro brusco. En ese
        mecanismo suelen desgarrarse juntas tres estructuras:{" "}
        <strong>1) el ligamento cruzado anterior (LCA)</strong>,{" "}
        <strong>2) el ligamento tibial colateral (medial)</strong> y{" "}
        <strong>3) el menisco medial</strong> (combinación conocida en clínica
        como <strong>tríada infeliz</strong>, ilustrada por Saladin sin usar
        ese apodo). Estas lesiones sanan con lentitud debido a la escasa
        irrigación sanguínea de ligamentos y tendones y a que el cartílago
        carece de vasos sanguíneos.
      </Cuidado>

      <Definicion termino="Otras articulaciones y trastornos clave en Saladin">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Temporomandibular (TMJ) y tobillo (suprastragalina):</strong>{" "}
            la TMJ tiene un disco articular que divide la cavidad en dos cámaras
            (superior e inferior). En el tobillo, la tibia y el peroné (con sus
            maléolos) se articulan con el <strong>astrágalo</strong>; el tendón
            calcáneo realiza flexión plantar.
          </li>
          <li>
            <strong>Reumatismo y artritis:</strong> <strong>reumatismo</strong>{" "}
            es el término más amplio para el dolor del aparato locomotor;{" "}
            <strong>artritis</strong> agrupa más de 100 trastornos inflamatorios
            articulares tratados por el <strong>reumatólogo</strong>. La{" "}
            <strong>osteoartritis</strong> es la más frecuente (desgaste del
            cartílago articular). La <strong>artritis reumatoide</strong> es
            autoinmunitaria (factor reumatoide), suele ser simétrica y puede
            derivar en <strong>anquilosis</strong> (fusión ósea). La{" "}
            <strong>gota</strong> acumula cristales de ácido úrico (sobre todo
            en el dedo gordo del pie).
          </li>
          <li>
            <strong>Bursitis y esguince:</strong> la <strong>bursitis</strong>{" "}
            es la inflamación de una bolsa serosa (por lo general debido a
            sobreextensión de la articulación); el <strong>esguince</strong> es
            el desgarro o estiramiento excesivo de un ligamento o tendón, en
            ocasiones con daño a un menisco.
          </li>
        </ul>
      </Definicion>

      <Conexion>
        Las superficies articulares óseas (cabeza, cóndilo, tróclea, cavidad
        glenoidea y acetábulo) vienen de Sistema esquelético (MOR-04), y los
        músculos que generan el esfuerzo en cada palanca se profundizan en
        Sistema muscular.
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Lo que más se pregunta y práctica final</Titulo>

      <Misconception titulo="Error 1 · 'Si dos huesos no se mueven entre sí, no forman una articulación'">
        <strong>Realidad:</strong> toda unión entre dos huesos es una
        articulación, aunque sea completamente inmóvil como una sutura craneal o
        una sinostosis. Por eso la articulación se define por el punto de unión,
        no por el movimiento.
      </Misconception>

      <Misconception titulo="Error 2 · 'El bíceps braquial pertenece al manguito de los rotadores'">
        <strong>Realidad:</strong> el tendón de la cabeza larga del bíceps
        braquial ayuda a estabilizar el hombro, pero el manguito de los rotadores
        consta únicamente de cuatro músculos:{" "}
        <strong>supraespinoso, infraespinoso, redondo menor y subescapular</strong>.
      </Misconception>

      <Misconception titulo="Error 3 · 'El ligamento redondo es el que sujeta con más firmeza el fémur al acetábulo'">
        <strong>Realidad:</strong> el ligamento redondo de la cadera es algo
        flojo y no sostiene mecánicamente la cabeza femoral dentro de la
        cavidad; su función clave es llevar una arteria que irriga la cabeza del
        fémur. Al ponerte de pie, quienes sujetan con fuerza la cadera son los
        ligamentos iliofemoral, pubofemoral e isquiofemoral.
      </Misconception>

      <Misconception titulo="Error 4 · 'Los ligamentos cruzados se llaman anterior y posterior por su unión al fémur'">
        <strong>Realidad:</strong> el ligamento cruzado anterior (LCA) y el
        ligamento cruzado posterior (LCP) reciben su nombre por el lado de la{" "}
        <strong>tibia</strong> al que se unen, no por su inserción femoral.
        Además, aunque son intracapsulares, la membrana sinovial se repliega
        alrededor de ellos y quedan fuera de la cavidad llena de líquido.
      </Misconception>

      <Cuidado>
        No confundas <strong>sinartrosis</strong> (articulaciones fibrosas) con{" "}
        <strong>diartrosis</strong> (articulaciones sinoviales), ni{" "}
        <strong>reumatólogo</strong> (médico especialista en artritis) con{" "}
        <strong>quinesiólogo</strong> (especialista en el estudio del movimiento
        locomotor).
      </Cuidado>

      <Mnemotecnia>
        Para los 4 músculos del manguito rotador recuerda <strong>SIRS</strong>:{" "}
        <strong>S</strong>upraespinoso, <strong>I</strong>nfraespinoso,{" "}
        <strong>R</strong>edondo menor y <strong>S</strong>ubescapular. Y para
        las palancas recuerda qué queda al centro: <strong>1-F</strong>{" "}
        (fulcro), <strong>2-R</strong> (resistencia, fuerza) y{" "}
        <strong>3-E</strong> (esfuerzo, velocidad).
      </Mnemotecnia>

      <Resumen>
        <strong>Claves de Saladin Cap. 9 para el examen:</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>4 clases:</strong> óseas (sinostosis, inmóviles), fibrosas
            (sinartrosis: suturas dentada/escamosa/plana, gonfosis,
            sindesmosis), cartilaginosas (anfiartrosis: sincondrosis con hialino
            y sínfisis con fibrocartílago) y sinoviales (diartrosis, libres).
          </li>
          <li>
            <strong>Diartrosis:</strong> cartílago hialino avascular (dos a tres milímetros según Saladin),
            cavidad con líquido sinovial (albúmina y ácido hialurónico)
            secretado por la membrana sinovial, cápsula fibrosa externa, discos
            (TMJ, clavícula) y meniscos (rodilla), bolsas y vainas tendinosas.
          </li>
          <li>
            <strong>Palancas y ejes:</strong> 2.ª clase siempre tiene{" "}
            <MathText>{"$VM > 1$"}</MathText> (fuerza); 3.ª clase siempre tiene{" "}
            <MathText>{"$VM < 1$"}</MathText> (velocidad, mayoría del cuerpo).
            6 sinoviales: 1 multiaxial (enartrosis), 3 biaxiales (condílea,
            silla de montar, plana) y 2 monoaxiales (gínglimo, trocoide).
          </li>
          <li>
            <strong>Articulaciones clave:</strong> hombro (labio glenoideo,
            manguito rotador, dislocación inferior), codo (humerocubital +
            humerorradial + radiocubital proximal con ligamento anular), cadera
            (acetábulo profundo, ligamento redondo con arteria), rodilla
            (meniscos, LCA evita hiperextensión, LCP, colaterales tibial y
            peroneo, bolsas anteriores) y tobillo (tibia y peroné con astrágalo).
          </li>
        </ul>
      </Resumen>

      <AutoCheck
        pregunta="Un estudiante afirma que toda articulación fibrosa es menos móvil que cualquier articulación cartilaginosa. ¿Qué ejemplo de Saladin refuta esa afirmación?"
        opciones={[
          "La sutura dentada del cráneo, que gira en dos planos anatómicos",
          "La sindesmosis radio-cúbito, con fibras largas y mayor movilidad",
          "La sinostosis del hueso frontal, que posee cavidad y líquido libre",
          "La gonfosis dental, que desliza el diente por fibrocartílago grueso",
        ]}
        correctaIdx={1}
        explicacion="Paso 1: recuerda que la clasificación estructural no forma una escala rígida de movilidad. Paso 2: en la sindesmosis entre radio y cúbito, las fibras largas de la membrana interósea permiten pronación y supinación, lo que da más movilidad que algunas articulaciones cartilaginosas inmóviles como las sincondrosis."
      />

      <AutoCheck
        pregunta="Sostienes un plato de sopa con la palma hacia arriba y luego giras el antebrazo para vaciarlo con la palma hacia abajo. ¿Qué ocurrió con el radio y el cúbito al realizar ese segundo giro?"
        opciones={[
          "Hubo pronación y el radio cruzó en X sobre el cúbito",
          "Hubo supinación y el radio quedó paralelo junto al cúbito",
          "Hubo abducción y el cúbito giró hacia fuera en plano frontal",
          "Hubo inversión y ambos huesos se deslizaron sin cruzarse",
        ]}
        correctaIdx={0}
        explicacion="Paso 1: con la palma hacia arriba estás en supinación, donde el radio y el cúbito se mantienen paralelos. Paso 2: al girar la palma hacia abajo realizas pronación; en ese giro la cabeza radial rota dentro del ligamento anular y el radio cruza por encima del cúbito formando una X."
      />

      <AutoCheck
        pregunta="La articulación glenohumeral se disloca con mucha mayor frecuencia hacia abajo que hacia arriba o hacia los lados. ¿Qué explicación anatómica da Saladin para esa vulnerabilidad inferior?"
        opciones={[
          "El labio glenoideo de fibrocartílago cubre solo la mitad inferior del borde",
          "La cavidad glenoidea es profunda y retiene al húmero únicamente por debajo",
          "El tendón del bíceps braquial impide el apoyo superior del acromion óseo",
          "Los tendones del manguito rotador refuerzan la cápsula salvo por debajo",
        ]}
        correctaIdx={3}
        explicacion="Paso 1: analiza qué protege el hombro en cada dirección. Arriba lo resguardan el acromion, la apófisis coracoides y la clavícula; alrededor de la cápsula se fusionan los cuatro tendones del manguito de los rotadores por todos los lados excepto el inferior. Paso 2: esa falta de refuerzo muscular debajo deja la cara inferior como el punto más vulnerable a la dislocación."
      />

      <AutoCheck
        pregunta="Cuando pasas de estar sentado a ponerte de pie erguido, la cadera resiste la carga del tronco sin dislocarse. ¿Qué ocurre con sus ligamentos iliofemoral, pubofemoral e isquiofemoral en esa postura?"
        opciones={[
          "Se relajan por completo para dejar todo el peso al ligamento redondo",
          "Se desplazan dentro de la fóvea femoral y nutren el cartílago hialino",
          "Se tuercen y tensan, presionando la cabeza femoral en el acetábulo",
          "Se acortan para separar la cabeza femoral del borde del labio acetabular",
        ]}
        correctaIdx={2}
        explicacion="Paso 1: distingue el soporte mecánico de la cadera. Al ponerte de pie, los ligamentos iliofemoral, pubofemoral e isquiofemoral se tuercen y tensan, empujando con firmeza la cabeza del fémur dentro del acetábulo profundo. Paso 2: el ligamento redondo, en cambio, es algo flojo y su valor principal es llevar una arteria a la cabeza femoral."
      />

      <AutoCheck
        pregunta="En extensión máxima de la rodilla al estar de pie, la articulación se bloquea para sostener el cuerpo con mínimo gasto muscular. ¿Cómo se bloquea y qué músculo la desbloquea según Saladin?"
        opciones={[
          "El fémur rota medialmente sobre la tibia y el poplíteo la desbloquea",
          "El fémur rota lateralmente sobre la tibia y el cuádriceps la desbloquea",
          "La tibia gira hacia fuera sobre el peroné y el bíceps femoral la libera",
          "El menisco medial traba la rótula y el ligamento rotuliano la libera",
        ]}
        correctaIdx={0}
        explicacion="Paso 1: recuerda el mecanismo de bloqueo en bipedestación. Al extender la rodilla al máximo permitido por el LCA, el fémur rota medialmente sobre la tibia y tensa todos los ligamentos principales. Paso 2: para destrabarla e iniciar la flexión, el músculo poplíteo rota el fémur lateralmente y endereza los ligamentos."
      />

      <AutoCheck
        pregunta="Un paciente presenta inflamación simétrica en las articulaciones de ambas manos, con factor reumatoide positivo y riesgo de fusión ósea progresiva (anquilosis). ¿A qué trastorno corresponde ese cuadro?"
        opciones={[
          "Osteoartritis, causada por desgaste mecánico del cartílago articular",
          "Gota articular, producida por depósitos de cristales de ácido úrico",
          "Artritis reumatoide, un cuadro autoinmunitario crónico articular",
          "Bursitis crónica, originada por inflamación de las bolsas serosas",
        ]}
        correctaIdx={2}
        explicacion="Paso 1: identifica los rasgos clínicos clave de Saladin: ataque autoinmunitario con factor reumatoide, afectación simétrica y posible anquilosis (fusión ósea). Paso 2: descarta los otros cuadros. La osteoartritis se debe al desgaste del cartílago articular, la gota acumula cristales de ácido úrico (sobre todo en el dedo gordo del pie) y la bursitis inflama una bolsa serosa."
      />
    </EscenaRica>
  );
}
