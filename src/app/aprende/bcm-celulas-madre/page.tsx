"use client";

import LeccionShell from "../_components/LeccionShell";
import MathText from "../../components/MathText";
import {
  AutoCheck,
  Cuidado,
  Definicion,
  Ejemplo,
  EscenaRica,
  Hook,
  Misconception,
  Mnemotecnia,
  Parrafo,
  PorQue,
  Puente,
  Resumen,
  Titulo,
} from "../_components/pedagogia";
import { LIENZO, Pizarra } from "../_components/lienzo";

function DiagramaCelulaMadre() {
  const W = 360;
  const H = 160;
  const stemCx = 66;
  const stemCy = 88;
  const stemR = 25;
  const precCx = 186;
  const precCy = 88;
  const precR = 23;
  const diffCx = 302;
  const diffCy = 88;
  const diffR = 23;

  const arrow1X1 = stemCx + stemR + 6;
  const arrow1X2 = precCx - precR - 8;
  const arrow2X1 = precCx + precR + 6;
  const arrow2X2 = diffCx - diffR - 8;

  const loopStartX = stemCx - 12;
  const loopEndX = stemCx + 14;
  const loopTopY = stemCy - stemR - 6;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Autorrenovación y diferenciación de una célula madre mediante células precursoras hacia una célula somática especializada"
    >
      <defs>
        <marker
          id="cm-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 z" fill={LIENZO.accent} />
        </marker>
        <marker
          id="cm-arrow-ok"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L6,3 z" fill={LIENZO.ok} />
        </marker>
      </defs>

      <path
        d={`M ${loopStartX} ${loopTopY} C ${stemCx - 28} ${loopTopY - 30}, ${stemCx + 28} ${loopTopY - 30}, ${loopEndX} ${loopTopY}`}
        fill="none"
        stroke={LIENZO.ok}
        strokeWidth={2}
        markerEnd="url(#cm-arrow-ok)"
      />
      <text
        x={stemCx}
        y={18}
        textAnchor="middle"
        fill={LIENZO.ok}
        fontSize={10.5}
        fontWeight={700}
      >
        Autorrenovación
      </text>
      <text
        x={stemCx}
        y={31}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        (copias idénticas)
      </text>

      <circle
        cx={stemCx}
        cy={stemCy}
        r={stemR}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={2.2}
      />
      <circle cx={stemCx} cy={stemCy} r={8} fill={LIENZO.ok} opacity={0.35} />
      <text
        x={stemCx}
        y={131}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        Célula madre
      </text>
      <text
        x={stemCx}
        y={144}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        o troncal
      </text>

      <line
        x1={arrow1X1}
        y1={stemCy}
        x2={arrow1X2}
        y2={precCy}
        stroke={LIENZO.accent}
        strokeWidth={2}
        markerEnd="url(#cm-arrow)"
      />
      <text
        x={(arrow1X1 + arrow1X2) / 2}
        y={stemCy - 10}
        textAnchor="middle"
        fill={LIENZO.accent}
        fontSize={9.5}
        fontWeight={600}
      >
        Señales
      </text>

      <circle
        cx={precCx}
        cy={precCy}
        r={precR}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.accent}
        strokeWidth={2}
      />
      <circle cx={precCx} cy={precCy} r={7} fill={LIENZO.accent} opacity={0.3} />
      <text
        x={precCx}
        y={131}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        Precursora
      </text>
      <text
        x={precCx}
        y={144}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        (progenitora)
      </text>

      <line
        x1={arrow2X1}
        y1={precCy}
        x2={arrow2X2}
        y2={diffCy}
        stroke={LIENZO.accent}
        strokeWidth={2}
        markerEnd="url(#cm-arrow)"
      />
      <text
        x={(arrow2X1 + arrow2X2) / 2}
        y={precCy - 10}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        Madura
      </text>

      <rect
        x={diffCx - diffR}
        y={diffCy - diffR}
        width={diffR * 2}
        height={diffR * 2}
        rx={8}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.fg}
        strokeWidth={2}
      />
      <rect
        x={diffCx - 8}
        y={diffCy - 8}
        width={16}
        height={16}
        rx={3}
        fill={LIENZO.fg}
        opacity={0.25}
      />
      <text
        x={diffCx}
        y={131}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        Somática
      </text>
      <text
        x={diffCx}
        y={144}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        especializada
      </text>
    </svg>
  );
}

function DiagramaPotencialidad() {
  const W = 360;
  const H = 198;
  const topX = 60;
  const topW = 240;
  const topY = 10;
  const topH = 38;

  const midY = 74;
  const midH = 44;
  const leftX = 12;
  const leftW = 136;
  const rightX = 166;
  const rightW = 182;

  const botY = 142;
  const botH = 44;
  const botX = 166;
  const botW = 182;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Jerarquía de potencialidad de las células madre según Calvo: totipotentes, pluripotentes y multipotentes"
    >
      <defs>
        <marker
          id="pot-arrow"
          markerWidth="7"
          markerHeight="7"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L5,3 z" fill={LIENZO.fgDim} />
        </marker>
      </defs>

      <rect
        x={topX}
        y={topY}
        width={topW}
        height={topH}
        rx={8}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={2}
      />
      <text
        x={topX + topW / 2}
        y={topY + 16}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={11}
        fontWeight={700}
      >
        Totipotentes (cigoto y blastómeros)
      </text>
      <text
        x={topX + topW / 2}
        y={topY + 30}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        Tejido embrionario + extraembrionario
      </text>

      <line
        x1={topX + 52}
        y1={topY + topH}
        x2={leftX + leftW / 2}
        y2={midY - 3}
        stroke={LIENZO.fgDim}
        strokeWidth={1.6}
        markerEnd="url(#pot-arrow)"
      />
      <line
        x1={topX + topW - 44}
        y1={topY + topH}
        x2={rightX + rightW / 2}
        y2={midY - 3}
        stroke={LIENZO.fgDim}
        strokeWidth={1.6}
        markerEnd="url(#pot-arrow)"
      />

      <rect
        x={leftX}
        y={midY}
        width={leftW}
        height={midH}
        rx={8}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.warn}
        strokeWidth={1.8}
        strokeDasharray="4 3"
      />
      <text
        x={leftX + leftW / 2}
        y={midY + 18}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        Tejido extraembrionario
      </text>
      <text
        x={leftX + leftW / 2}
        y={midY + 33}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        Placenta (extraembrionario)
      </text>

      <rect
        x={rightX}
        y={midY}
        width={rightW}
        height={midH}
        rx={8}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.accent}
        strokeWidth={2}
      />
      <text
        x={rightX + rightW / 2}
        y={midY + 18}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        Pluripotentes
      </text>
      <text
        x={rightX + rightW / 2}
        y={midY + 33}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        3 capas · embrionarias e iPS · sin placenta
      </text>

      <line
        x1={rightX + rightW / 2}
        y1={midY + midH}
        x2={botX + botW / 2}
        y2={botY - 3}
        stroke={LIENZO.fgDim}
        strokeWidth={1.6}
        markerEnd="url(#pot-arrow)"
      />

      <rect
        x={botX}
        y={botY}
        width={botW}
        height={botH}
        rx={8}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.fg}
        strokeWidth={1.8}
      />
      <text
        x={botX + botW / 2}
        y={botY + 18}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        Multipotentes (adultas)
      </text>
      <text
        x={botX + botW / 2}
        y={botY + 33}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        1 o a lo sumo 2 capas
      </text>
    </svg>
  );
}

function DiagramaMecanismoParacrino() {
  const W = 360;
  const H = 182;
  const topW = 176;
  const topH = 34;
  const topX = (W - topW) / 2;
  const topY = 10;

  const midY = 72;
  const midH = 42;
  const dirX = 12;
  const dirW = 136;
  const parX = 166;
  const parW = 182;

  const botY = 136;
  const botH = 36;
  const gap = 8;
  const subW = (W - 24 - gap * 2) / 3;
  const sub1X = 12;
  const sub2X = sub1X + subW + gap;
  const sub3X = sub2X + subW + gap;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-auto max-w-full"
      role="img"
      aria-label="Mecanismos terapéuticos de las células madre trasplantadas: diferenciación directa limitada frente a efecto trófico o paracrino"
    >
      <defs>
        <marker
          id="par-arrow"
          markerWidth="7"
          markerHeight="7"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L5,3 z" fill={LIENZO.fgDim} />
        </marker>
      </defs>

      <rect
        x={topX}
        y={topY}
        width={topW}
        height={topH}
        rx={8}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.accent}
        strokeWidth={2}
      />
      <text
        x={W / 2}
        y={topY + 21}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        Células madre trasplantadas
      </text>

      <line
        x1={W / 2 - 28}
        y1={topY + topH}
        x2={dirX + dirW / 2}
        y2={midY - 3}
        stroke={LIENZO.fgDim}
        strokeWidth={1.6}
        markerEnd="url(#par-arrow)"
      />
      <line
        x1={W / 2 + 28}
        y1={topY + topH}
        x2={parX + parW / 2}
        y2={midY - 3}
        stroke={LIENZO.fgDim}
        strokeWidth={1.6}
        markerEnd="url(#par-arrow)"
      />

      <rect
        x={dirX}
        y={midY}
        width={dirW}
        height={midH}
        rx={8}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.fgDim}
        strokeWidth={1.6}
        strokeDasharray="4 3"
      />
      <text
        x={dirX + dirW / 2}
        y={midY + 17}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10}
        fontWeight={700}
      >
        Diferenciación directa
      </text>
      <text
        x={dirX + dirW / 2}
        y={midY + 31}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9.5}
      >
        Muy baja o nula
      </text>

      <rect
        x={parX}
        y={midY}
        width={parW}
        height={midH}
        rx={8}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={2}
      />
      <text
        x={parX + parW / 2}
        y={midY + 17}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={10.5}
        fontWeight={700}
      >
        Efecto trófico / paracrino
      </text>
      <text
        x={parX + parW / 2}
        y={midY + 31}
        textAnchor="middle"
        fill={LIENZO.ok}
        fontSize={9.5}
        fontWeight={600}
      >
        Citoquinas y factores
      </text>

      <line
        x1={parX + 36}
        y1={midY + midH}
        x2={sub1X + subW / 2}
        y2={botY - 3}
        stroke={LIENZO.fgDim}
        strokeWidth={1.4}
        markerEnd="url(#par-arrow)"
      />
      <line
        x1={parX + parW / 2}
        y1={midY + midH}
        x2={sub2X + subW / 2}
        y2={botY - 3}
        stroke={LIENZO.fgDim}
        strokeWidth={1.4}
        markerEnd="url(#par-arrow)"
      />
      <line
        x1={parX + parW - 24}
        y1={midY + midH}
        x2={sub3X + subW / 2}
        y2={botY - 3}
        stroke={LIENZO.fgDim}
        strokeWidth={1.4}
        markerEnd="url(#par-arrow)"
      />

      <rect
        x={sub1X}
        y={botY}
        width={subW}
        height={botH}
        rx={6}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={1.4}
      />
      <text
        x={sub1X + subW / 2}
        y={botY + 15}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={600}
      >
        Supervivencia
      </text>
      <text
        x={sub1X + subW / 2}
        y={botY + 28}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9}
      >
        celular
      </text>

      <rect
        x={sub2X}
        y={botY}
        width={subW}
        height={botH}
        rx={6}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={1.4}
      />
      <text
        x={sub2X + subW / 2}
        y={botY + 15}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={600}
      >
        Progenitores
      </text>
      <text
        x={sub2X + subW / 2}
        y={botY + 28}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9}
      >
        endógenos
      </text>

      <rect
        x={sub3X}
        y={botY}
        width={subW}
        height={botH}
        rx={6}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={1.4}
      />
      <text
        x={sub3X + subW / 2}
        y={botY + 15}
        textAnchor="middle"
        fill={LIENZO.fg}
        fontSize={9.5}
        fontWeight={600}
      >
        Remodelado
      </text>
      <text
        x={sub3X + subW / 2}
        y={botY + 28}
        textAnchor="middle"
        fill={LIENZO.fgDim}
        fontSize={9}
      >
        de matriz extracelular
      </text>
    </svg>
  );
}

function EscenaDefinicion() {
  return (
    <EscenaRica>
      <Titulo>Qué define a una célula madre</Titulo>
      <Puente>
        Piensa en la piel de tus manos o en las células de tu sangre: mueren
        todo el tiempo por desgaste normal, pero el tejido no se vacía. Para
        reponerlas sin agotar la reserva hace falta un tipo especial de célula
        que combine copia fiel y especialización.
      </Puente>

      <Definicion termino="Célula madre (o troncal)">
        Es una célula con dos capacidades fundamentales: por un lado, la{" "}
        <strong>diferenciación</strong> ante señales específicas hacia diversos
        tipos de células especializadas o somáticas funcionales; por otro, la{" "}
        <strong>autorrenovación a largo plazo</strong>, es decir, generar copias
        idénticas de sí misma durante largos períodos.
      </Definicion>

      <Parrafo>
        Por lo general, antes de alcanzar el estado totalmente diferenciado de un
        tejido, la célula madre origina estadios intermedios llamados{" "}
        <strong>células precursoras o progenitoras</strong>.
      </Parrafo>

      <Pizarra alto={170}>
        <DiagramaCelulaMadre />
      </Pizarra>

      <PorQue>
        En el organismo adulto, estas células permiten reemplazar las células
        que mueren por la <strong>homeostasis</strong> normal de cada tejido o a
        causa de una lesión o enfermedad, manteniendo además una población
        indiferenciada a lo largo de la vida.
      </PorQue>

      <Cuidado>
        No confundas la autorrenovación a largo plazo con la simple división de
        una célula ya especializada, ni supongas que la célula madre salta
        siempre directo al estado maduro sin pasar por precursoras o
        progenitoras intermedias.
      </Cuidado>

      <AutoCheck
        pregunta="Con relación a las células madre o troncales: 1) Ante señales específicas pueden diferenciarse hacia células especializadas funcionales, pasando generalmente por estadios intermedios llamados células precursoras o progenitoras. 2) Comparten la facultad de autorrenovarse a largo plazo generando copias idénticas de sí mismas."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={2}
        explicacion="Ambas afirmaciones reproducen la definición del capítulo: diferenciación dirigida a través de precursoras/progenitoras y autorrenovación a largo plazo."
      />
    </EscenaRica>
  );
}

function EscenaPotencialidad() {
  return (
    <EscenaRica>
      <Titulo>Potencialidad: totipotente, pluripotente y multipotente</Titulo>
      <Hook>
        Si una célula del embrión muy temprano y una célula madre de tu médula
        ósea tienen el mismo genoma, ¿por qué una puede construir incluso la
        placenta y la otra produce solo un repertorio acotado de tejidos?
      </Hook>

      <Definicion termino="Clasificación por potencial de diferenciación">
        Calvo distingue tres niveles según la capacidad de originar tipos
        celulares: <strong>totipotentes</strong> (todos los tipos del organismo
        adulto derivados del tejido embrionario <em>y</em> todos los del tejido
        extraembrionario o <strong>placenta</strong>),{" "}
        <strong>pluripotentes</strong> (células de las{" "}
        <strong>tres capas embrionarias</strong>: ectodermo, mesodermo y
        endodermo, pero <strong>sin formar tejido placentario</strong>) y{" "}
        <strong>multipotentes</strong> (tipos celulares propios de la misma capa
        embrionaria de origen o, a lo sumo, de <strong>dos capas</strong>, según
        su localización en tejidos adultos).
      </Definicion>

      <Pizarra alto={208}>
        <DiagramaPotencialidad />
      </Pizarra>

      <Parrafo>
        Hasta la fecha, las únicas células totipotentes conocidas son el{" "}
        <strong>cigoto</strong> (obtenido por fecundación o transferencia
        nuclear) y los <strong>blastómeros</strong> de sus primeras divisiones.
        Para reconocer que una célula es <strong>pluripotente</strong>, el
        capítulo exige tres propiedades: diferenciación clonal hacia las tres
        capas, funcionalidad demostrada <em>in vitro</em> y asentamiento
        persistente en el tejido diana <em>in vivo</em> contribuyendo mediante
        diferenciación.
      </Parrafo>

      <PorQue>
        Conforme avanza el desarrollo embrionario, las células van restringiendo
        su potencial hacia estirpes concretas de cada tejido. Conocer este
        límite evita esperar de una célula multipotente adulta lo que solo hace
        una pluripotente.
      </PorQue>

      <Cuidado>
        El error más repetido es confundir <strong>totipotente</strong> con{" "}
        <strong>pluripotente</strong>: las pluripotentes generan las tres capas
        embrionarias, pero no producen placenta. Ten en cuenta también que este
        capítulo oficial solo clasifica tres niveles (totipotentes,
        pluripotentes y multipotentes).
      </Cuidado>

      <AutoCheck
        pregunta="Respecto al potencial de diferenciación de las células madre: 1) Las células totipotentes son las únicas capaces de originar tanto los tipos celulares embrionarios como el tejido extraembrionario (placenta), e incluyen al cigoto y a los primeros blastómeros. 2) Las células pluripotentes pueden formar tejido placentario, además de ectodermo, mesodermo y endodermo. 3) Las células madre multipotentes generan con facilidad tejidos de las tres capas embrionarias y de la placenta."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={0}
        explicacion="Solo la afirmación 1 es correcta: las pluripotentes no forman placenta y las multipotentes producen células de su misma capa embrionaria o a lo sumo de dos capas."
      />
    </EscenaRica>
  );
}

function EscenaOrigenYFuenes() {
  return (
    <EscenaRica>
      <Titulo>Origen tisular: embrionarias, germinales y adultas</Titulo>
      <Puente>
        Ya viste qué puede hacer cada célula según su potencial; ahora toca
        ubicar de qué parte del embrión, del feto o del cuerpo posnatal se
        aíslan y por qué unas se usan en pacientes y otras todavía no.
      </Puente>

      <Definicion termino="Clasificación por tejido de procedencia">
        Se distinguen tres grupos: las{" "}
        <strong>células madre embrionarias (ES)</strong>, aisladas de la{" "}
        <strong>masa celular interna (ICM)</strong> del blastocisto unos cinco
        días tras la fertilización (inmortales y pluripotentes); las{" "}
        <strong>células madre germinales</strong>, aisladas de fetos a partir de
        la <strong>cresta germinal</strong> (región que origina las gónadas); y
        las <strong>células madre somáticas o de adulto</strong>, presentes en
        múltiples órganos posnatales.
      </Definicion>

      <Parrafo>
        Se han encontrado progenitores en médula ósea, sangre periférica, cordón
        umbilical, tejido adiposo, epidermis, folículo piloso, epitelio del
        tubo digestivo, pulpa dentaria, músculo esquelético, vasos, córnea,
        retina, hígado, páncreas, glándula mamaria, ovario, próstata, testículo,
        e incluso, en contra de lo tradicional, en <strong>corazón y cerebro</strong>.
        Una hipótesis propone que proceden de células que se mantuvieron
        indiferenciadas durante el desarrollo fetal dentro de sus{" "}
        <strong>nichos</strong> (microambientes locales que las protegen y regulan su estado indiferenciado).
      </Parrafo>

      <PorQue>
        En la clínica e investigación destacan tres fuentes adultas por su
        accesibilidad: la <strong>médula ósea</strong>, con{" "}
        <strong>HSC</strong> (hematopoyéticas), células progenitoras endoteliales{" "}
        <strong>EPC tempranas</strong> (monocíticas, papel trófico) y{" "}
        <strong>tardías o BOEC</strong> (células endoteliales de crecimiento
        tardío; forman nuevos vasos con efecto aditivo al combinarse),{" "}
        <strong>células madre mesenquimales (MSC)</strong> capaces de dar
        osteoblastos, condroblastos y adipocitos (tinciones rojo alizarina, azul
        toluidina y aceite rojo, respectivamente) con potente efecto paracrino e
        inmunomodulador, y subpoblaciones muy raras de médula ósea en estudio
        (MAPC, VSEL, MIAMI, clonales SSEA1/Oct4); el{" "}
        veinte años como fuente de HSC para trasplantes alogénicos en cánceres;
        y el <strong>tejido adiposo</strong>, con la{" "}
        <strong>fracción estromal vascular (SVF)</strong> y las{" "}
        <strong>ADSC</strong>, muy similares a las MSC.
      </PorQue>

      <Ejemplo titulo="Debate sobre plasticidad o transdiferenciación">
        Aunque algunos trabajos sugieren que ciertas células madre adultas
        generan células maduras de otros tejidos (transdiferenciación), sigue
        siendo controvertido. Calvo resume cuatro explicaciones no excluyentes:
        heterogeneidad de la población trasplantada, <strong>fusión celular</strong>{" "}
        de baja frecuencia con células del huésped, reprogramación epigenética o
        remanentes multi o pluripotentes del desarrollo embrionario.
      </Ejemplo>

      <Cuidado>
        No des por sentado que el corazón o el cerebro carecen de progenitores,
        ni confundas los dos progenitores endoteliales: las EPC tempranas ejercen
        sobre todo un papel trófico, mientras que las BOEC tardías forman vasos
        nuevos y ambas se potencian al combinarse.
      </Cuidado>

      <AutoCheck
        pregunta="En relación con las fuentes tisulares de células madre: 1) Las células madre embrionarias (ES) se aíslan de la cresta germinal fetal a las pocas horas de la fecundación. 2) Las células madre mesenquimales (MSC) derivadas de la médula ósea pueden diferenciarse hacia osteoblastos, condroblastos y adipocitos, y ejercen efecto paracrino e inmunomodulador. 3) Las EPC tempranas forman por sí solas todos los vasos nuevos sin aportar papel trófico."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es correcta: las ES proceden de la masa celular interna del blastocisto hacia el quinto día (la cresta germinal corresponde a las germinales), y las EPC tempranas tienen sobre todo un papel trófico."
      />
    </EscenaRica>
  );
}

function EscenaReprogramacionIPS() {
  return (
    <EscenaRica>
      <Titulo>Reprogramación nuclear y células iPS</Titulo>
      <Hook>
        Durante décadas la biología sostuvo un dogma: una célula adulta ya
        diferenciada, como un fibroblasto de la piel, no podía dar marcha atrás
        hacia un estadio primitivo. ¿Cómo logró un laboratorio revertir ese reloj
        celular?
      </Hook>

      <Definicion termino="Reprogramación nuclear y células iPS">
        La <strong>reprogramación nuclear</strong> induce cambios de expresión
        génica para transformar una célula en otra distinta. Puede lograrse por{" "}
        <strong>transferencia nuclear</strong> (introducir el núcleo de una
        célula somática en un ovocito), por <strong>fusión</strong> de células
        somáticas con ES, o mediante <strong>células iPS</strong> (
        <em>induced pluripotent stem cells</em>), descubiertas en{" "}
        <strong>2006</strong> por el grupo japonés del <strong>Dr. Yamanaka</strong>{" "}
        al sobreexpresar por transfección retrovírica{" "}
        <strong>cuatro factores de transcripción</strong>: <strong>Oct4</strong>{" "}
        y <strong>Sox2</strong> junto con <strong>c-Myc y Klf4</strong> (o bien{" "}
        <strong>Nanog y Lin28</strong>).
      </Definicion>

      <Parrafo>
        Las iPS se obtuvieron primero de fibroblastos de ratón y humanos, y luego
        de otras especies (cerdo, rata) y otros tipos celulares (queratinocitos,
        células neurales, hematopoyéticas, cardiomiocitos). Incluso se ha logrado
        generarlas con menos factores, hasta uno solo según la célula inicial.
        Adquieren morfología, marcadores de superficie, actividad telomerasa y
        marcas epigenéticas de ES, derivan hacia las tres capas germinales y
        forman <strong>quimeras</strong> al inyectarse en un blastocisto.
      </Parrafo>

      <PorQue>
        Al partir de células somáticas del propio paciente, las iPS contradicen
        el dogma de la diferenciación irreversible, permiten investigar el origen
        de enfermedades concretas y sirven para probar fármacos en laboratorio
        evitando parte de las limitaciones éticas e inmunológicas de las ES.
      </PorQue>

      <Ejemplo titulo="Modelos de diferenciación con ES e iPS">
        En investigación experimental se ha demostrado la diferenciación de ES e
        iPS hacia <strong>cardiomiocitos</strong> capaces de injertar en modelos
        de corazón infartado y hacia <strong>células beta</strong> pancreáticas,
        abriendo vías de estudio para patologías cardíacas y diabetes.
      </Ejemplo>

      <Cuidado>
        En la <strong>transferencia nuclear</strong> hay un matiz clásico de
        examen: la célula pluripotente resultante lleva la información nuclear de
        la célula somática donante, pero su <strong>ADN mitocondrial</strong>{" "}
        procede del <strong>ovocito</strong> receptor.
      </Cuidado>

      <AutoCheck
        pregunta="Respecto a la reprogramación nuclear y las células iPS: 1) En la transferencia nuclear, tanto el ADN nuclear como el ADN mitocondrial proceden íntegramente de la célula somática donante. 2) El descubrimiento de las células iPS por Yamanaka en 2006 confirmó el dogma de que una célula madura diferenciada nunca puede desdiferenciarse."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={3}
        explicacion="Ninguna afirmación es correcta: el ADN mitocondrial en la transferencia nuclear procede del ovocito, y las iPS contradijeron precisamente el dogma de que una célula diferenciada no puede desdiferenciarse."
      />
    </EscenaRica>
  );
}

function EscenaMecanismosYLimitaciones() {
  return (
    <EscenaRica>
      <Titulo>Mecanismos de acción: efecto paracrino y limitaciones</Titulo>
      <Hook>
        Si inyectas células madre tras un infarto y la función cardíaca mejora,
        tu primera intuición sería pensar que las células nuevas reemplazaron al
        músculo perdido. Sin embargo, al buscarlas en el tejido, casi no aparecen.
        ¿Cómo explicaron entonces la mejoría?
      </Hook>

      <Definicion termino="Modalidades de trasplante y efecto paracrino">
        Las células se trasplantan como fracción fresca, subpoblaciones
        seleccionadas o expandidas/diferenciadas <em>in vitro</em>. El trasplante
        puede ser <strong>autólogo</strong> (del propio paciente, evita
        inmunogenicidad), <strong>alogénico</strong> (de otro individuo, viable
        con MSC inmunomoduladoras o cordón umbilical) o{" "}
        <strong>xenogénico</strong> (origen animal, descrito en matrices). La
        mejora funcional observada suele deberse principalmente a{" "}
        <strong>efectos tróficos o paracrinos</strong>: secreción de{" "}
        <strong>citoquinas y factores</strong> que activan la reparación propia
        del organismo.
      </Definicion>

      <Pizarra alto={190}>
        <DiagramaMecanismoParacrino />
      </Pizarra>

      <PorQue>
        La contribución directa por diferenciación de las células trasplantadas es
        en general <strong>muy baja o nula</strong> por dos limitaciones: (1)
        bajo injerto y supervivencia, ya que por vía intravenosa muchas quedan
        retenidas en <strong>hígado o pulmón</strong> y, aun inyectadas directo
        en el órgano, escapan por los vasos o mueren rápido por{" "}
        <strong>necrosis o apoptosis</strong> debido a la falta de{" "}
        <strong>anclaje y oxigenación</strong>; y (2) falta de un{" "}
        <strong>microambiente</strong> adecuado para dirigir su diferenciación
        (ES indiferenciadas producen un porcentaje similar de cardiomiocitos en
        corazón que en músculo esquelético). Por eso se estudia activar las{" "}
        <strong>células madre endógenas</strong> <em>in situ</em>.
      </PorQue>

      <Ejemplo titulo="Por qué importa en órganos isquémicos">
        En modelos de isquemia periférica o cardíaca, daño medular o diabetes,
        las células trasplantadas promueven supervivencia celular, reclutan y
        activan progenitores propios del paciente y remodelan la matriz
        extracelular incluso cuando pocas se integran de forma permanente.
      </Ejemplo>

      <Cuidado>
        No creas que la inyección intravenosa lleva la mayoría de las células al
        órgano dañado (suelen quedar atrapadas en hígado y pulmón), ni atribuyas
        toda la mejoría clínica de células adultas a diferenciación directa
        masiva.
      </Cuidado>

      <AutoCheck
        pregunta="Con relación a los mecanismos y limitaciones de la terapia celular: 1) Tras una inyección intravenosa de células madre, la totalidad alcanza el órgano diana sin quedar retenida en hígado o pulmón. 2) La falta de anclaje y de oxigenación en el órgano diana favorece una supervivencia del cien por ciento tras el implante directo. 3) Los efectos tróficos o paracrinos mediante secreción de citoquinas y activación de progenitores endógenos explican gran parte de la mejora funcional observada."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={2}
        explicacion="Solo la afirmación 3 es correcta: por vía intravenosa muchas células quedan retenidas en hígado o pulmón, y la falta de anclaje y oxigenación provoca necrosis o apoptosis rápida."
      />
    </EscenaRica>
  );
}

function EscenaTerapiaGenicaBioingenieria() {
  return (
    <EscenaRica>
      <Titulo>Terapia génica y bioingeniería tisular</Titulo>
      <Puente>
        Si las células mueren por falta de anclaje o llevan una mutación de
        origen, combinar la terapia celular con genes corregidos o con un soporte
        tridimensional resuelve límites que las células solas no superan.
      </Puente>

      <Definicion termino="Terapia génica combinada y bioingeniería">
        La <strong>terapia génica</strong> usa infección vírica para producir una
        proteína defectiva o agente terapéutico mediante dos vías: inyección{" "}
        <em>in situ</em> en el órgano o infección <strong>ex vivo</strong> de
        células del paciente antes de reimplantarlas (más del 40 % de casi 500
        ensayos clínicos). La <strong>bioingeniería</strong> (ingeniería de
        tejidos) combina células, factores bioactivos,{" "}
        <strong>biorreactores</strong> y <strong>soportes</strong> biocompatibles,
        no inmunogénicos, biodegradables e idealmente instructivos, imitando los
        nichos naturales.
      </Definicion>

      <Parrafo>
        En terapia génica <em>ex vivo</em> (cáncer, SIDA y enfermedades
        monogénicas como anemia de Fanconi, Fabry, Gaucher y <strong>SCID</strong>{" "}
        (inmunodeficiencia combinada severa)), las <strong>HSC</strong> son las
        más empleadas por su fácil obtención y reimplante y su autorrenovación
        controlada. Como en el ensayo de SCID se provocó leucemia en{" "}
        <MathText>{"$5/19$"}</MathText> pacientes tratados por inserción cercana
        a <strong>oncogenes</strong>, hoy se desarrollan{" "}
        <strong>virus no integrativos</strong>. En bioingeniería se usan soportes{" "}
        <strong>naturales</strong> (hidroxiapatita, carbonato cálcico, alginato,
        colágeno, fibronectina, laminina o matriz extracelular (MEC) de piel,
        submucosa intestinal o vejiga: mejor adherencia y factores locales
        secuestrados) y{" "}
        <strong>sintéticos</strong> biodegradables (polímeros de ácido láctico o
        glicólico, propileno de fumarato, poliarilatos: mejor control de
        porosidad, rigidez y degradación).
      </Parrafo>

      <PorQue>
        La vía <em>ex vivo</em> permite seleccionar las células modificadas y
        evita dosis repetidas; además, los <strong>biorreactores</strong> (como
        el <strong>flujo pulsátil</strong> para vasos sanguíneos frente al fallo
        por trombosis y presión) y la <strong>descelularización</strong> de
        órganos reproducen las fuerzas y señales reales del cuerpo.
      </PorQue>

      <Ejemplo titulo="Ensayos experimentales citados en el capítulo">
        En terapia génica con MSC, expresar <strong>Akt</strong> aumentó la
        supervivencia celular en infarto de miocardio, y expresar{" "}
        <strong>TNF</strong> (factor de necrosis tumoral) redujo el tamaño tumoral
        en un modelo murino de glioma. En bioingeniería, perfundir órganos con
        el detergente <strong>SDS</strong> (dodecilsulfato sódico) elimina todas
        las células y el ADN preservando la MEC; al recelularizar un corazón con
        bajo impulsos eléctricos recuperó capacidad contráctil.
      </Ejemplo>

      <Cuidado>
        Recuerda que la terapia génica <em>in situ</em> con virus que solo
        infectan células en división no sirve en corazón ni cerebro (donde
        cardiomiocitos y neuronas apenas se dividen), y distingue qué mejora cada
        soporte: los naturales favorecen la adherencia; los sintéticos controlan
        mejor las propiedades mecánicas y la tasa de degradación.
      </Cuidado>

      <AutoCheck
        pregunta="Respecto a la combinación de terapia celular con terapia génica y bioingeniería: 1) Más del cuarenta por ciento de casi quinientos ensayos clínicos de terapia génica utilizan infección ex vivo, destacando las HSC. 2) El riesgo de activar oncogenes observado en SCID impulsó el desarrollo de virus no integrativos. 3) La perfusión de órganos con detergente SDS permite descelularizar el tejido preservando la matriz extracelular para una posterior recelularización."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={3}
        explicacion="Todas las afirmaciones son correctas y recogen datos directos del capítulo: porcentaje ex vivo (>40 % de ~500 ensayos), leucemia en 5/19 casos de SCID que motivó vectores no integrativos, y descelularización con SDS."
      />
    </EscenaRica>
  );
}

function EscenaAplicacionesClinicas() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones clínicas actuales, futuras y limitaciones</Titulo>
      <Hook>
        Con tantas noticias sobre regeneración de órganos, ¿qué tratamientos se
        aplican hoy de forma rutinaria en pacientes y cuáles siguen en ensayos o
        modelos experimentales?
      </Hook>

      <Definicion termino="Regla de seguridad clínica actual">
        Hasta el momento, las células aplicadas en pacientes han sido siempre de{" "}
        <strong>origen tisular adulto</strong>: aunque su potencial sea más
        limitado, resultan mucho más seguras que las <strong>ES</strong> humanas,
        cuyo uso clínico está frenado por su <strong>gran capacidad tumorigénica</strong>,
        su <strong>inmunogenicidad</strong> y las{" "}
        <strong>cuestiones de tipo ético</strong>.
      </Definicion>

      <PorQue>
        El avance clínico depende de equilibrar eficacia, supervivencia del
        injerto, respuesta inmunitaria y ausencia de tumores según cada órgano
        diana.
      </PorQue>

      <Ejemplo titulo="Panorama por órgano o enfermedad en Calvo cap. 18">
        <strong>Piel (rutinaria):</strong> queratinocitos y fibroblastos{" "}
        <em>ex vivo</em> o células del <strong>folículo piloso</strong> (toma no
        invasiva) en matrices de <strong>fibrina</strong> o{" "}
        <strong>colágeno tipo I</strong> para quemaduras, heridas y úlceras de
        pie diabético.{" "}
        <strong>Ojo (extendida):</strong> células madre del epitelio corneal (
        <strong>CESC</strong>) y del limbo (<strong>RSC</strong>), con opción
        autóloga si la lesión es unilateral, combinadas con{" "}
        <strong>membrana amniótica</strong> (propiedades{" "}
        <strong>antiangiogénicas y antiinflamatorias</strong>) en síndrome de
        Stevens-Johnson, penfigoide ocular y quemaduras graves.{" "}
        <strong>Cardiovascular (2.ª indicación tras HSC):</strong> beneficio
        moderado por efecto paracrino en infarto de miocardio; el tejido adiposo
        destaca por baja morbilidad, uso autólogo y riesgo tumoral prácticamente
        nulo, mientras que mioblastos esqueléticos provocaron{" "}
        <strong>arritmias</strong> puntuales.{" "}
        <strong>Diabetes tipo 1:</strong> destrucción autoinmunitaria de{" "}
        <strong>células beta</strong>; el implante de islotes maduros regula la
        glucosa en el 58 % al año pero baja al 10 % a los 5 años, por lo que se
        estudian progenitores del ducto pancreático, células ovales hepáticas,
        ES/iPS y el papel inmunomodulador de MSC.{" "}
        <strong>Sistema nervioso y médula espinal:</strong> en Parkinson la
        levodopa acaba generando <strong>taquifilaxia</strong>, y los implantes
        fetales o embrionarios dieron escasa mejoría con{" "}
        <strong>disquinesia</strong>; en lesión medular (bulbo olfatorio o HSC)
        la mejora es mayor en plazos cortos tras la lesión, siendo el ámbito que
        previsiblemente tardará más en llegar a la clínica.
      </Ejemplo>

      <Cuidado>
        No pienses que ya se trasplantan células embrionarias humanas de rutina
        en hospitales ni que las neuronas dopaminérgicas maduras implantadas en
        Parkinson sobreviven con éxito: el capítulo destaca justamente lo
        contrario.
      </Cuidado>

      <AutoCheck
        pregunta="En relación con las aplicaciones clínicas descritas en el capítulo: 1) En la práctica clínica actual con pacientes se emplean de forma rutinaria células madre embrionarias humanas indiferenciadas. 2) El trasplante de células madre del epitelio corneal (CESC) combinado con membrana amniótica aporta propiedades antiangiogénicas y antiinflamatorias útiles en lesiones oculares graves."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={1}
        explicacion="Solo la afirmación 2 es correcta: en pacientes se han empleado siempre células de origen tisular adulto por seguridad frente a la tumorigenicidad, inmunogenicidad y cuestiones éticas de las ES."
      />
    </EscenaRica>
  );
}

function EscenaRepaso() {
  return (
    <EscenaRica>
      <Titulo>Repaso y práctica</Titulo>

      <Misconception titulo="Totipotente vs pluripotente">
        Que una célula genere las tres capas embrionarias (ectodermo, mesodermo
        y endodermo) la hace <strong>pluripotente</strong>, no totipotente. Para
        ser totipotente debe poder formar también el tejido extraembrionario
        (placenta), como ocurre con el cigoto y los primeros blastómeros.
      </Misconception>

      <Misconception titulo="Diferenciación directa vs efecto paracrino">
        En la mayoría de los estudios con células madre adultas en corazón,
        isquemia o daño medular, la mejora funcional no proviene de un reemplazo
        masivo por diferenciación directa (que suele ser muy baja o nula), sino
        de citoquinas y factores tróficos que protegen el tejido y activan
        progenitores endógenos.
      </Misconception>

      <Mnemotecnia>
        Regla rápida para el examen: <strong>Totipotente</strong> = organismo +
        placenta; <strong>Pluripotente</strong> = 3 capas sin placenta (ES e
        iPS); <strong>Multipotente</strong> = 1 o a lo sumo 2 capas (adultas). Y
        en pacientes hoy se usan <strong>adultas</strong> por seguridad.
      </Mnemotecnia>

      <Resumen>
        Una célula madre se define por autorrenovación a largo plazo y
        diferenciación dirigida (vía precursoras/progenitoras). Según su origen
        son embrionarias (ES de la ICM del blastocisto ~5 días), germinales
        (cresta germinal) o adultas (médula ósea, cordón umbilical, tejido
        adiposo, corazón, cerebro, piel, limbo corneal, etc.). Yamanaka (2006)
        obtuvo iPS reprogramando células somáticas con factores de transcripción.
        El principal mecanismo terapéutico observado es el efecto paracrino; su
        combinación con terapia génica ex vivo (HSC, vectores no integrativos) y
        bioingeniería (soportes naturales o sintéticos, biorreactores,
        descelularización con SDS) amplía unas terapias que hoy ya son rutina
        en piel y córnea y siguen en estudio en infarto, diabetes y sistema
        nervioso.
      </Resumen>

      {
        // basado en: data/examenes/umss/medicina/2025-primer-parcial-curso-basico-2024-2025.md #82
      }
      <AutoCheck
        pregunta="Práctica 1 · Respecto a las células pluripotentes: 1) Las células madre embrionarias (ES) forman la masa celular interna (ICM) del blastocisto hacia el quinto día tras la fertilización. 2) Las células iPS fueron obtenidas por Yamanaka en 2006 mediante factores de transcripción como Oct4 y Sox2 a partir de células somáticas. 3) Tanto las ES como las iPS pueden derivar hacia células de las tres capas embrionarias, pero no forman tejido placentario."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={3}
        explicacion="Todas las afirmaciones son correctas: coinciden con la definición de pluripotencialidad, el origen de las ES en la ICM del blastocisto (~5 días) y la generación de las iPS en 2006."
      />

      {
        // basado en: data/examenes/umss/medicina/2025-examen-final-curso-basico-2024-2025.md #88
      }
      <AutoCheck
        pregunta="Práctica 2 · En relación con las técnicas experimentales y resultados clínicos: 1) En la transferencia nuclear, el ADN mitocondrial de la célula pluripotente resultante procede de la célula somática donante y no del ovocito. 2) Al trasplantar células madre adultas en un órgano dañado, su contribución por diferenciación directa es siempre masiva y explica por sí sola toda la recuperación. 3) En la diabetes mellitus tipo 1, el trasplante de islotes maduros mantiene una adecuada regulación de la glucosa en el 58 % de los pacientes tras cinco años."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Solo la afirmación 3 es correcta.",
          "D = Todas las afirmaciones son correctas.",
          "E = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={4}
        explicacion="Ninguna afirmación es correcta: el ADN mitocondrial proviene del ovocito, la diferenciación directa tras el trasplante suele ser muy baja o nula (predomina el efecto paracrino), y el 58 % al año cae al 10 % a los cinco años."
      />

      {
        // basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md #34
      }
      <AutoCheck
        pregunta="Práctica 3 · Sobre las células madre mesenquimales (MSC) y la terapia génica: 1) Las MSC derivadas de la médula ósea se diferencian hacia osteoblastos, condroblastos y adipocitos y poseen propiedades inmunomoduladoras y paracrinas. 2) Los virus que solo infectan células en división son óptimos para terapia génica in situ en neuronas cerebrales y cardiomiocitos adultos."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={0}
        explicacion="Solo la afirmación 1 es correcta: en corazón y cerebro la tasa de división de cardiomiocitos y neuronas es muy baja, lo que impide usar eficazmente in situ virus restringidos a células en división."
      />

      {
        // basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md #36
      }
      <AutoCheck
        pregunta="Práctica 4 · Con relación a las aplicaciones cutáneas y la bioingeniería: 1) En lesiones de la piel se han empleado queratinocitos, fibroblastos o células del folículo piloso sobre matrices de fibrina o colágeno tipo I. 2) En bioingeniería se utilizan biorreactores con flujo pulsátil para vasos sanguíneos y la perfusión con SDS para descelularizar órganos conservando la matriz extracelular."
        opciones={[
          "A = Solo la afirmación 1 es correcta.",
          "B = Solo la afirmación 2 es correcta.",
          "C = Ambas afirmaciones son correctas.",
          "D = Ninguna afirmación es correcta.",
        ]}
        correctaIdx={2}
        explicacion="Ambas afirmaciones son correctas y describen aplicaciones y estrategias citadas explícitamente en las secciones de lesiones de piel y bioingeniería del capítulo 18."
      />
    </EscenaRica>
  );
}

const ESCENAS = [
  { titulo: "Qué es una célula madre", componente: EscenaDefinicion },
  {
    titulo: "Potencialidad: totipotente, pluripotente y multipotente",
    componente: EscenaPotencialidad,
  },
  {
    titulo: "Origen tisular: embrionarias, germinales y adultas",
    componente: EscenaOrigenYFuenes,
  },
  {
    titulo: "Reprogramación nuclear y células iPS",
    componente: EscenaReprogramacionIPS,
  },
  {
    titulo: "Mecanismos de acción: efecto paracrino y limitaciones",
    componente: EscenaMecanismosYLimitaciones,
  },
  {
    titulo: "Terapia génica y bioingeniería tisular",
    componente: EscenaTerapiaGenicaBioingenieria,
  },
  {
    titulo: "Aplicaciones clínicas actuales, futuras y limitaciones",
    componente: EscenaAplicacionesClinicas,
  },
  { titulo: "Repaso y práctica", componente: EscenaRepaso },
];

export default function BcmCelulasMadrePage() {
  return (
    <LeccionShell
      unidad="BCM-07"
      tituloUnidad="Células madre y aplicaciones terapéuticas"
      escenas={ESCENAS}
    />
  );
}

/* FUENTE: Tema_18_Biologia_Celular_LITERAL_TTS.md (Alfonso Calvo · Capítulo 18: Las células madre y sus aplicaciones terapéuticas, Beatriz Pelacho, María Gutiérrez, Felipe Prósper)
 * - Escena 1 AutoCheck (línea 5): "capaces de diferenciarse, en respuesta a señales específicas, hacia diversos tipos de células especializadas o somáticas funcionales... estadios intermedios de diferenciación se conocen con el nombre de células precursoras o progenitoras... facultad de autorrenovarse a largo plazo."
 * - Escena 2 AutoCheck (línea 7): "Las células totipotentes son aquellas capaces de dar lugar a todos los tipos celulares del organismo adulto... así como a todos los tipos celulares derivados del tejido extraembrionario , placenta,... Las células pluripotentes... no son capaces de formar tejido placentario. Y las células madre multipotentes... de la misma capa embrionaria... o, a lo sumo, de dos de las capas"
 * - Escena 3 AutoCheck (líneas 7, 23): "ES, que forman la masa celular interna de embriones en estadio de blastocisto, aproximadamente cinco días tras la fertilización; células madre germinales, aisladas de fetos a partir de la cresta germinal" / "capacidad de las MSC de diferenciarse hacia linajes celulares tales como osteoblastos, condroblastos y adipocitos... ejercen un potente efecto paracrino y presentan propiedades inmunomoduladoras" / "EPC ... ejercer un importante papel trófico"
 * - Escena 4 AutoCheck (líneas 17, 19): "contienen la información genética de la célula donante, excepto el A D N mitocondrial, que procede del ovocito." / "Descubiertas en el año dos mil seis por el grupo japonés del Dr. Yamanaka... contradiciendo el dogma establecido de que una célula madura diferenciada no es capaz de desdiferenciarse"
 * - Escena 5 AutoCheck (línea 29): "En el caso de la inyección intravenosa, muchas de las células quedan retenidas en el hígado o el pulmón... falta de anclaje y de oxigenación de las células... efectos tróficos ejercidos por las células trasplantadas... secretan una serie de citoquinas y factores... reclutamiento y o activación de progenitores presentes en el propio organismo"
 * - Escena 6 AutoCheck (líneas 33, 35, 41): "de los casi quinientos ensayos clínicos... más del cuarenta por ciento se han llevado a cabo mediante este procedimiento... ensayo clínico realizado para el tratamiento de SCID, en el que se provocó leucemia en cinco de los diecinueve pacientes tratados. Actualmente se está trabajando con virus no integrativos" / "descelularizar órganos completos mediante su perfusión con un detergente , SDS... la MEC queda preservada por completo."
 * - Escena 7 AutoCheck (líneas 43, 45): "Hasta el momento, las células aplicadas a los pacientes han sido siempre de origen tisular adulto, las cuales, aunque de potencial más limitado, constituyen una fuente mucho más segura que las ES humanas." / "el trasplante de CESC combinadas con membrana amniótica... propiedades antiangiogénicas y antiinflamatorias"
 * - Escena 8 Práctica 1 (líneas 7, 19): "ES, que forman la masa celular interna de embriones en estadio de blastocisto, aproximadamente cinco días tras la fertilización" / "iPS... año dos mil seis... Oct4, Sox2... derivar hacia tipos celulares pertenecientes a cualquiera de las tres capas germinales"
 * - Escena 8 Práctica 2 (líneas 17, 29, 49): "A D N mitocondrial, que procede del ovocito." / "su contribución directa hacia los distintos tipos celulares es en general muy baja e incluso nula." / "tras un año del implante, se había restablecido una adecuada regulación de la glucosa en el cincuenta y ocho por ciento de los pacientes; sin embargo, este porcentaje quedaba reducido a un diez por ciento tras cinco años."
 * - Escena 8 Práctica 3 (líneas 23, 33): "MSC... diferenciarse hacia linajes celulares tales como osteoblastos, condroblastos y adipocitos... potente efecto paracrino y presentan propiedades inmunomoduladoras." / "determinados virus solo infectan las células que se están dividiendo, por lo que la terapia no sería útil en el caso de órganos tales como el corazón o el cerebro"
 * - Escena 8 Práctica 4 (líneas 41, 43, 45): "células madre en el folículo piloso... queratinocitos como fibroblastos... en una matriz de fibrina... matriz natural de colágeno tipo I." / "flujo pulsátil... descelularizar órganos completos mediante su perfusión con un detergente , SDS"
 */
