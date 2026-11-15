"use client";

import LeccionShell from "../_components/LeccionShell";
import MathText from "../../components/MathText";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo,
  Definicion,
  PorQue,
  Ejemplo,
  Cuidado,
  Resumen,
  EscenaRica,
  AutoCheck,
  Hook,
  Puente,
  Misconception,
} from "../_components/pedagogia";

/* ==========================================================================
   ESCENA 1 · RECEPTORES SENSITIVOS: TIPOS Y PROPIEDADES (Saladin 16.1)
   ========================================================================== */
function SvgCamposReceptivos() {
  const W = 540;
  const H = 210;
  const colIzqX = 135;
  const colDerX = 405;
  const divX = W / 2;
  const pielY = 90;
  const radioGrande = 78;
  const radioPeq = 24;
  const neuronaY = 172;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
        Campos receptivos y discriminación en dos puntos
      </text>

      <line x1={divX} y1={34} x2={divX} y2={H - 12} stroke={LIENZO.fgFaint} strokeDasharray="4 4" />

      {/* Lado izquierdo: campo receptivo grande (espalda) */}
      <text x={colIzqX} y={44} textAnchor="middle" fill={LIENZO.warn} fontSize={12} fontWeight={700}>
        Espalda (campo hasta 7 cm)
      </text>
      <ellipse
        cx={colIzqX}
        cy={pielY}
        rx={radioGrande}
        ry={22}
        fill={LIENZO.warn}
        fillOpacity={0.14}
        stroke={LIENZO.warn}
        strokeWidth={2}
      />
      <circle cx={colIzqX - 18} cy={pielY} r={4.5} fill={LIENZO.bad} />
      <circle cx={colIzqX + 18} cy={pielY} r={4.5} fill={LIENZO.bad} />
      <text x={colIzqX} y={pielY - 28} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        Dos toques separados 1 cm
      </text>
      <line x1={colIzqX} y1={pielY + 22} x2={colIzqX} y2={neuronaY - 16} stroke={LIENZO.warn} strokeWidth={2} />
      <rect
        x={colIzqX - 78}
        y={neuronaY - 14}
        width={156}
        height={28}
        rx={6}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.warn}
        strokeWidth={1.5}
      />
      <text x={colIzqX} y={neuronaY + 4} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>
        1 neurona: se siente 1 punto
      </text>

      {/* Lado derecho: campos receptivos pequeños (yema del dedo) */}
      <text x={colDerX} y={44} textAnchor="middle" fill={LIENZO.ok} fontSize={12} fontWeight={700}>
        Yema del dedo (hasta 1 mm)
      </text>
      {[-52, 0, 52].map((dx, idx) => {
        const cx = colDerX + dx;
        return (
          <g key={idx}>
            <ellipse
              cx={cx}
              cy={pielY}
              rx={radioPeq}
              ry={18}
              fill={LIENZO.ok}
              fillOpacity={0.14}
              stroke={LIENZO.ok}
              strokeWidth={1.8}
            />
            {idx !== 1 && <circle cx={cx} cy={pielY} r={4.5} fill={LIENZO.accent} />}
            <line x1={cx} y1={pielY + 18} x2={cx} y2={neuronaY - 16} stroke={LIENZO.ok} strokeWidth={1.8} />
          </g>
        );
      })}
      <text x={colDerX} y={pielY - 28} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        Dos toques separados 2 mm
      </text>
      <rect
        x={colDerX - 96}
        y={neuronaY - 14}
        width={192}
        height={28}
        rx={6}
        fill={LIENZO.bgSoft}
        stroke={LIENZO.ok}
        strokeWidth={1.5}
      />
      <text x={colDerX} y={neuronaY + 4} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>
        2 neuronas: se sienten 2 puntos
      </text>
    </svg>
  );
}

function EscReceptores() {
  return (
    <EscenaRica>
      <Titulo>Receptores sensitivos: tipos y propiedades</Titulo>

      <Hook>
        Cuando escuchas música, pruebas una fruta dulce o notas el calor de una taza, tu encéfalo recibe exactamente el mismo tipo de pulso eléctrico: potenciales de acción idénticos. ¿Cómo sabe entonces qué estímulo ocurrió y dónde?
      </Hook>

      <Definicion termino="Receptor, órgano de los sentidos y transducción">
        Un <strong>receptor</strong> es cualquier estructura especializada para detectar un estímulo; un <strong>órgano de los sentidos</strong> combina tejido nervioso con otros tejidos (epitelial, muscular o conjuntivo) que mejoran su respuesta. Todos cumplen la <strong>transducción</strong>: convierten una forma de energía en señales nerviosas generando primero un cambio eléctrico local llamado <strong>potencial de receptor</strong>. Si la célula sensitiva es neurona (tacto u olfato), dispara potenciales de acción; si es célula epitelial (gusto y audición), libera neurotransmisores para excitar a una neurona adyacente.
      </Definicion>

      <PorQue>
        El tallo encefálico filtra la mayor parte de los estímulos antes de que alcancen la corteza cerebral, evitando la sobrecarga de información poco relevante. Muchas señales ni siquiera producen conciencia (como el pH sanguíneo, la presión arterial o la tensión muscular), pero disparan reflejos indispensables para la homeostasis. Los experimentos de privación sensitiva demuestran que sin entrada sensorial se deteriora el pensamiento y aparecen alucinaciones.
      </PorQue>

      <Definicion termino="Cuatro propiedades codificadas por los receptores">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li>
            <strong>Modalidad:</strong> el tipo de estímulo se distingue mediante el <strong>código de línea marcada</strong>: cada ruta nerviosa lleva una marca de origen (por ejemplo, retina equivale a visión; botón gustativo equivale a sabor).
          </li>
          <li>
            <strong>Ubicación:</strong> depende del tamaño del <strong>campo receptivo</strong> y de la <strong>proyección sensitiva</strong> (capacidad del encéfalo para identificar el sitio exacto del estímulo) a través de las <strong>rutas de proyección</strong> que llevan la señal al sistema nervioso central. En la espalda un campo puede alcanzar <MathText>{"$7\\text{ cm}$"}</MathText>, mientras en las yemas de los dedos mide <MathText>{"$1\\text{ mm}$"}</MathText> o menos, permitiendo distinguir dos puntos separados apenas <MathText>{"$2\\text{ mm}$"}</MathText>.
          </li>
          <li>
            <strong>Intensidad:</strong> se codifica aumentando la frecuencia de descarga de cada fibra, activando mayor cantidad de fibras y reclutando fibras menos sensitivas con umbrales más altos.
          </li>
          <li>
            <strong>Duración (adaptación sensitiva):</strong> ante un estímulo sostenido disminuye la frecuencia de descarga. Los <strong>receptores fásicos</strong> se adaptan rápido (olfato, movimiento del pelo, presión cutánea); los <strong>tónicos</strong> se adaptan con lentitud y siguen enviando señales (propiorreceptores y nocirreceptores).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={210}>
        <SvgCamposReceptivos />
      </Pizarra>

      <Definicion termino="Tres maneras de clasificar los receptores">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li>
            <strong>Por modalidad:</strong> termorreceptores (frío/calor), fotorreceptores (luz), nocirreceptores (lesión o daño tisular), quimiorreceptores (olores, sabores, composición del líquido corporal) y mecanorreceptores (vibración, contacto, presión, estiramiento, audición y equilibrio).
          </li>
          <li>
            <strong>Por origen:</strong> exterorreceptores (estímulos externos), interorreceptores (órganos internos: estiramiento, presión, dolor visceral y náusea) y propiorreceptores (posición y movimiento en músculos, tendones y cápsulas articulares).
          </li>
          <li>
            <strong>Por distribución:</strong> sentidos generales (somatosensitivos o somestésicos, distribuidos por piel, músculos, tendones, articulaciones y vísceras) y sentidos especiales (limitados a la cabeza, inervados por pares craneales: visión, audición, equilibrio, gusto y olfato).
          </li>
        </ul>
      </Definicion>

      <Cuidado>
        No confundas receptor con órgano de los sentidos: una simple terminación nerviosa libre es un receptor, pero no un órgano complejo. Además, una fuga de gas puede dejar de sentirse tras pocos segundos porque los receptores olfativos son fásicos, aunque el peligro continúe.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte I: dos afirmaciones) */}
      <AutoCheck
        pregunta="Con relación a las propiedades de los receptores sensitivos: 1) Según el código de línea marcada, el encéfalo identifica la modalidad por la ruta nerviosa de origen y no por potenciales de acción diferentes. 2) Los nocirreceptores y los propiorreceptores son receptores fásicos que dejan de descargar rápido si el estímulo persiste."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Ambas (1 y 2)",
          "D) Ninguna",
        ]}
        correctaIdx={0}
        explicacion="La afirmación 1 es verdadera: los potenciales de acción son idénticos y la modalidad se interpreta por el origen de la ruta (código de línea marcada). La 2 es falsa: los nocirreceptores y propiorreceptores son receptores tónicos de adaptación lenta."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ESCENA 2 · SENTIDOS GENERALES Y DOLOR (Saladin 16.2)
   ========================================================================== */
function SvgCompuertaEspinal() {
  const W = 540;
  const H = 225;
  const boxH = 34;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
        Compuerta espinal en el asta posterior de la médula
      </text>

      {/* Vía descendente / frotamiento (arriba) */}
      <rect x={20} y={36} width={225} height={boxH} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.ok} strokeWidth={1.6} />
      <text x={132} y={51} textAnchor="middle" fill={LIENZO.ok} fontSize={10.5} fontWeight={700}>
        Mesencéfalo y bulbo (vía descendente)
      </text>
      <text x={132} y={64} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        Libera serotonina
      </text>

      <rect x={295} y={36} width={225} height={boxH} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.6} />
      <text x={407} y={51} textAnchor="middle" fill={LIENZO.accent} fontSize={10.5} fontWeight={700}>
        Mecanorreceptores (frotar el área)
      </text>
      <text x={407} y={64} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        Activan interneurona espinal
      </text>

      {/* Interneurona encefalínica */}
      <line x1={132} y1={70} x2={220} y2={106} stroke={LIENZO.ok} strokeWidth={1.8} />
      <line x1={407} y1={70} x2={320} y2={106} stroke={LIENZO.accent} strokeWidth={1.8} />

      <rect x={165} y={106} width={210} height={36} rx={8} fill={LIENZO.ok} fillOpacity={0.14} stroke={LIENZO.ok} strokeWidth={1.8} />
      <text x={270} y={122} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>
        Interneurona espinal (encefalina)
      </text>
      <text x={270} y={135} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        Inhibición postsináptica
      </text>

      {/* Línea del dolor abajo */}
      <rect x={20} y={172} width={155} height={boxH} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.bad} strokeWidth={1.8} />
      <text x={97} y={187} textAnchor="middle" fill={LIENZO.bad} fontSize={10.5} fontWeight={700}>
        Nocirreceptor (1.° orden)
      </text>
      <text x={97} y={200} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        Sustancia P
      </text>

      <rect x={215} y={172} width={145} height={boxH} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.warn} strokeWidth={1.8} />
      <text x={287} y={187} textAnchor="middle" fill={LIENZO.warn} fontSize={10.5} fontWeight={700}>
        Neurona de 2.° orden
      </text>
      <text x={287} y={200} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        Vía espinotalámica
      </text>

      <rect x={395} y={172} width={125} height={boxH} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} strokeWidth={1.5} />
      <text x={457} y={187} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={700}>
        Tálamo y corteza
      </text>
      <text x={457} y={200} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        Circunvolución poscentral
      </text>

      {/* Flechas ruta dolor */}
      <line x1={175} y1={189} x2={212} y2={189} stroke={LIENZO.bad} strokeWidth={2} />
      <line x1={360} y1={189} x2={392} y2={189} stroke={LIENZO.warn} strokeWidth={2} />

      {/* Flechas inhibición */}
      <line x1={60} y1={70} x2={60} y2={170} stroke={LIENZO.ok} strokeWidth={1.8} strokeDasharray="3 3" />
      <text x={92} y={125} textAnchor="middle" fill={LIENZO.ok} fontSize={10} fontWeight={700}>
        bloquea P
      </text>
      <line x1={287} y1={142} x2={287} y2={170} stroke={LIENZO.ok} strokeWidth={1.8} strokeDasharray="3 3" />
      <text x={320} y={159} textAnchor="middle" fill={LIENZO.ok} fontSize={10} fontWeight={700}>
        inhibe 2.°
      </text>
    </svg>
  );
}

function EscSentidosGenerales() {
  return (
    <EscenaRica>
      <Titulo>Sentidos generales y dolor</Titulo>

      <Puente>
        Si pasas con suavidad una uña sobre el dorso de tu mano y luego sobre la palma, notas mucha más fineza en la palma. Ese contraste nace de qué receptores táctiles están debajo de la piel y de cómo se envuelven sus terminaciones.
      </Puente>

      <Definicion termino="Receptores somatosensitivos: no encapsulados vs encapsulados">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li>
            <strong>No encapsulados:</strong> <em>terminaciones nerviosas libres</em> (calor, frío y dolor, abundantes en piel y mucosas), <em>discos táctiles de Merkel</em> (receptores tónicos en el estrato basal de la epidermis para tacto ligero, texturas, bordes y formas) y <em>receptores pilosos o peritriquiales</em> (adaptación rápida alrededor del folículo piloso).
          </li>
          <li>
            <strong>Encapsulados:</strong> <em>corpúsculos táctiles de Meissner</em> (fásicos en papilas dérmicas de yemas, palmas, labios y párpados; toques y texturas ligeros), <em>bulbos terminales de Krause</em> (mucosas de labios, lengua y conjuntiva), <em>corpúsculos laminares de Pacini</em> (fásicos, de <MathText>{"$1\\text{ a }2\\text{ mm}$"}</MathText> con capas concéntricas como cebolla; presión profunda, estiramiento, prurito y vibración), <em>corpúsculos bulbosos de Ruffini</em> (tónicos en dermis y cápsulas articulares; presión continua y movimientos articulares), <em>husos musculares</em> y <em>órganos tendinosos</em> (cinestesia).
          </li>
        </ul>
      </Definicion>

      <PorQue>
        La mayoría de las señales somatosensitivas viaja por tres neuronas (1.°, 2.° y 3.° orden): en el cuerpo ascienden por la vía espinotalámica, se decusan y llegan al tálamo contralateral antes de alcanzar la <strong>circunvolución poscentral</strong>; las de la cabeza entran sobre todo por el nervio trigémino (V). En cambio, la cinestesia asciende hacia el <strong>cerebelo</strong> y el dolor visceral sube también por el <strong>fascículo grácil</strong> (área viscerosensitiva en la cisura de Silvio) y el nervio vago (X). El dolor rápido (<MathText>{"$12\\text{ a }30\\text{ m/s}$"}</MathText>, fibras mielínicas) localiza la lesión al instante; el dolor lento (<MathText>{"$0{,}5\\text{ a }2{,}0\\text{ m/s}$"}</MathText>, fibras amielínicas) sostiene la alerta. La <strong>bradicinina</strong> es el estímulo químico del dolor más potente conocido, junto con serotonina, prostaglandinas, histamina, <MathText>{"$\\text{K}^+$"}</MathText> y ATP.
      </PorQue>

      <Ejemplo titulo="Ejemplo clínico · neuropatías, cefaleas y dolor referido">
        En la lepra y la diabetes mellitus la pérdida del dolor por neuropatía impide notar lesiones menores, que se infectan hasta causar pérdida de dedos o extremidades. Por otra parte, el encéfalo y el hígado carecen de nocirreceptores (en ciertas cirugías cerebrales el paciente permanece despierto con anestesia local), mientras que las meninges sí tienen nocirreceptores activos en las cefaleas. Cuando un problema cardiaco se siente en el hombro y el brazo izquierdo (<strong>dolor referido</strong>), se debe a que fibras del corazón y de la piel convergen en los segmentos espinales T1 a T5.
      </Ejemplo>

      <Pizarra alto={225}>
        <SvgCompuertaEspinal />
      </Pizarra>

      <Definicion termino="Modulación del dolor y compuerta espinal">
        El sistema nervioso central (CNS) modula el dolor mediante <strong>opioides endógenos</strong> (<strong>encefalinas</strong>, <strong>endorfinas</strong> y <strong>dinorfinas</strong>). Señales del hipotálamo y la corteza activan la materia gris central del mesencéfalo, que estimula al bulbo raquídeo para enviar fibras descendentes con <strong>serotonina</strong> hacia el asta posterior de la médula. Allí algunas fibras excitan interneuronas que secretan <strong>encefalina</strong> para inhibir la neurona de segundo orden (inhibición postsináptica), mientras otras fibras del bulbo bloquean directamente la liberación de <strong>sustancia P</strong> desde el nocirreceptor (inhibición presináptica). Frotar una zona golpeada activa mecanorreceptores que también estimulan esas interneuronas inhibidoras.
      </Definicion>

      <Cuidado>
        Las tres rutas del dolor corporal cumplen papeles distintos: la <strong>vía espinotalámica</strong> produce la conciencia del dolor; la <strong>vía espinorreticular</strong> activa la formación reticular, el hipotálamo y el sistema límbico (náusea, miedo y reflejos); y el <strong>fascículo grácil</strong> conduce dolor visceral.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte I: dos afirmaciones) */}
      <AutoCheck
        pregunta="En relación con los receptores cutáneos y la fisiología del dolor: 1) Los corpúsculos laminares de Pacini detectan presión profunda y vibración mediante una cápsula de capas concéntricas y se adaptan con rapidez. 2) En la compuerta espinal, las interneuronas estimuladas por serotonina o mecanorreceptores secretan encefalina para bloquear la transmisión hacia la neurona de segundo orden."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Ambas (1 y 2)",
          "D) Ninguna",
        ]}
        correctaIdx={2}
        explicacion="Ambas afirmaciones son verdaderas: los corpúsculos laminares de Pacini son receptores fásicos en capas concéntricas sensibles a presión profunda, estiramiento, prurito y vibración; y las interneuronas espinales liberan encefalina para ejercer inhibición presináptica y postsináptica del dolor."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ESCENA 3 · GUSTO: BOTONES GUSTATIVOS Y VÍA (Saladin 16.3)
   ========================================================================== */
function SvgGustoLengua() {
  const W = 540;
  const H = 215;
  const cx = 155;
  const cy = 115;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
        Papilas linguales e inervación gustativa (Saladin 16.3)
      </text>

      {/* Esquema de lengua */}
      <path
        d={`M ${cx - 65} ${cy - 45} Q ${cx} ${cy - 80} ${cx + 65} ${cy - 45} L ${cx + 55} ${cy + 35} Q ${cx} ${cy + 90} ${cx - 55} ${cy + 35} Z`}
        fill={LIENZO.bad}
        fillOpacity={0.14}
        stroke={LIENZO.bad}
        strokeWidth={2}
      />

      {/* Línea divisoria 1/3 posterior vs 2/3 anteriores */}
      <path
        d={`M ${cx - 48} ${cy - 22} L ${cx} ${cy - 4} L ${cx + 48} ${cy - 22}`}
        fill="none"
        stroke={LIENZO.warn}
        strokeWidth={2}
        strokeDasharray="4 3"
      />
      {/* Papilas valadas en V */}
      {[-34, -18, 0, 18, 34].map((dx, i) => (
        <circle
          key={i}
          cx={cx + dx}
          cy={cy - 18 + Math.abs(dx) * 0.25}
          r={4}
          fill={LIENZO.warn}
        />
      ))}

      {/* Papilas foliadas en bordes laterales */}
      <line x1={cx - 54} y1={cy + 2} x2={cx - 44} y2={cy + 2} stroke={LIENZO.accent} strokeWidth={2} />
      <line x1={cx - 53} y1={cy + 8} x2={cx - 43} y2={cy + 8} stroke={LIENZO.accent} strokeWidth={2} />
      <line x1={cx + 44} y1={cy + 2} x2={cx + 54} y2={cy + 2} stroke={LIENZO.accent} strokeWidth={2} />
      <line x1={cx + 43} y1={cy + 8} x2={cx + 53} y2={cy + 8} stroke={LIENZO.accent} strokeWidth={2} />

      {/* Papilas fungiformes en punta/lados */}
      {[
        { x: cx - 18, y: cy + 52 },
        { x: cx + 16, y: cy + 54 },
        { x: cx, y: cy + 62 },
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={LIENZO.ok} />
      ))}

      {/* Rótulos derecha */}
      {[
        { y: 54, tit: "Epiglotis, paladar y faringe", sub: "Par X (vago) -> núcleo solitario", col: LIENZO.fgDim },
        { y: 92, tit: "1/3 posterior: 7 a 12 papilas valadas", sub: "Par IX (glosofaríngeo) · ~250 botones c/u", col: LIENZO.warn },
        { y: 132, tit: "Bordes: papilas foliadas", sub: "Sus botones degeneran a los 2 o 3 años", col: LIENZO.accent },
        { y: 172, tit: "2/3 anteriores: fungiformes y filiformes", sub: "Par VII (facial) gusto · Filiformes: solo textura", col: LIENZO.ok },
      ].map((r, i) => (
        <g key={i} transform={`translate(238, ${r.y})`}>
          <circle cx={0} cy={-4} r={4} fill={r.col} />
          <text x={12} y={0} fill={LIENZO.fg} fontSize={11.5} fontWeight={700}>{r.tit}</text>
          <text x={12} y={14} fill={LIENZO.fgDim} fontSize={10}>{r.sub}</text>
        </g>
      ))}
    </svg>
  );
}

function EscGusto() {
  return (
    <EscenaRica>
      <Titulo>Gusto: botones gustativos y vía</Titulo>

      <Puente>
        Si apoyas un cristal de sal o azúcar sobre la lengua seca, casi no percibes sabor alguno. Para gustar una molécula, primero debe disolverse en saliva y entrar por el poro gustativo.
      </Puente>

      <Definicion termino="Papilas linguales y botones gustativos">
        Tenemos casi <MathText>{"$4\\,000$"}</MathText> botones gustativos en lengua, mejillas, velo del paladar, faringe y epiglotis. Cada botón tiene <MathText>{"$50\\text{ a }150$"}</MathText> células: <strong>células gustativas epiteliales</strong> (no son neuronas; viven <MathText>{"$7\\text{ a }10\\text{ días}$"}</MathText>, tienen cilios gustativos en el poro gustativo y vesículas sinápticas), <strong>células de soporte</strong> y <strong>células basales</strong> (citoblastos que las reemplazan). Existen cuatro tipos de papilas linguales:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li><strong>Filiformes:</strong> las más abundantes; no tienen botones gustativos, perciben la textura.</li>
          <li><strong>Foliadas:</strong> crestas laterales cerca de los molares; casi todos sus botones degeneran a los <MathText>{"$2\\text{ o }3\\text{ años}$"}</MathText> de edad.</li>
          <li><strong>Fungiformes:</strong> forma de hongo en punta y lados; alrededor de <MathText>{"$3$"}</MathText> botones en el ápice.</li>
          <li><strong>Valadas:</strong> solo <MathText>{"$7\\text{ a }12$"}</MathText> dispuestas en V posterior, con ~<MathText>{"$250$"}</MathText> botones cada una (hasta la mitad del total).</li>
        </ul>
      </Definicion>

      <Pizarra alto={215}>
        <SvgGustoLengua />
      </Pizarra>

      <PorQue>
        Las cinco sensaciones primarias cumplen funciones adaptativas claras y usan dos mecanismos celulares distintos:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li><strong>Entrada iónica directa:</strong> <em>salado</em> (iones <MathText>{"$\\text{Na}^+$"}</MathText> y <MathText>{"$\\text{K}^+$"}</MathText>, electrólitos vitales) y <em>agrio o ácido</em> (<MathText>{"$\\text{H}^+$"}</MathText> de ácidos cítricos) despolarizan directamente la célula.</li>
          <li><strong>Proteína G y segundo mensajero:</strong> <em>dulce</em> (azúcares de alto valor calórico), <em>umami</em> (aminoácidos como ácido aspártico y glutámico) y <em>amargo</em> (alcaloides a menudo tóxicos como nicotina, cafeína, quinina y morfina). El sabor amargo tiene el umbral más bajo y dispara reflejos protectores de rechazo.</li>
        </ul>
        <br />
        Todas las fibras gustativas convergen en el <strong>núcleo solitario</strong> del bulbo raquídeo (par VII facial desde <MathText>{"$2/3$"}</MathText> anteriores, par IX glosofaríngeo desde <MathText>{"$1/3$"}</MathText> posterior y par X vago desde paladar, faringe y epiglotis). De allí proyectan al hipotálamo y amígdala (salivación, reflejo nauseoso, vómito) y al tálamo hacia la ínsula, circunvolución poscentral y corteza orbitofrontal.
      </PorQue>

      <Ejemplo titulo="Ejemplo fisiológico · pérdida selectiva por nervio y antojos">
        Según el texto, una lesión selectiva del nervio facial (VII) afecta los dos tercios anteriores de la lengua (incluidos los bordes anteriores y la punta, sensibles a dulce y salado), mientras el daño del glosofaríngeo (IX) compromete el tercio posterior con las papilas valadas, muy sensibles a lo amargo. Asimismo, durante el embarazo la reducción en electrólitos puede provocar apetencia por comida salada.
      </Ejemplo>

      <Cuidado>
        Las papilas filiformes perciben textura (inervadas por el nervio lingual, rama del trigémino), no sabores químicos; del mismo modo, el picor de la pimienta estimula terminaciones libres del trigémino y no botones gustativos.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte II: tres afirmaciones) */}
      <AutoCheck
        pregunta="Con relación al sentido del gusto: 1) Las células gustativas son neuronas bipolares que sobreviven toda la vida sin renovarse. 2) El nervio facial (VII) recoge la sensibilidad gustativa de los dos tercios anteriores de la lengua hacia el núcleo solitario del bulbo. 3) Las papilas filiformes contienen la mitad de todos los botones gustativos."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Solo 3",
          "D) Todas (1, 2 y 3)",
          "E) Ninguna",
        ]}
        correctaIdx={1}
        explicacion="Solo la 2 es verdadera: el par VII inerva los dos tercios anteriores de la lengua y proyecta al núcleo solitario. La 1 es falsa porque las células gustativas son epiteliales y viven de 7 a 10 días (reemplazadas por células basales). La 3 es falsa porque las papilas filiformes carecen de botones gustativos; las valadas concentran hasta la mitad."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ESCENA 4 · OLFATO: MUCOSA OLFATIVA Y PROYECCIÓN (Saladin 16.3)
   ========================================================================== */
function SvgViaOlfativa() {
  const W = 540;
  const H = 200;
  const pasos = [
    { x: 18, w: 112, t1: "Mucosa olfativa", t2: "Neuronas (par I)", t3: "~5 cm² · 350 tipos", col: LIENZO.accent },
    { x: 148, w: 112, t1: "Lámina cribosa", t2: "Hueso etmoides", t3: "Agujeros cribosos", col: LIENZO.warn },
    { x: 278, w: 118, t1: "Bulbo olfativo", t2: "Glomérulos", t3: "Mitrales / en penacho", col: LIENZO.ok },
    { x: 414, w: 110, t1: "Lóbulo temporal", t2: "Corteza olfativa 1.ª", t3: "SIN tálamo previo", col: LIENZO.bad },
  ];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
        Ruta olfativa: acceso directo a la corteza cerebral
      </text>

      {pasos.map((p, i) => (
        <g key={i}>
          <rect
            x={p.x}
            y={46}
            width={p.w}
            height={78}
            rx={8}
            fill={p.col}
            fillOpacity={0.12}
            stroke={p.col}
            strokeWidth={1.8}
          />
          <text x={p.x + p.w / 2} y={68} textAnchor="middle" fill={p.col} fontSize={11} fontWeight={700}>
            {p.t1}
          </text>
          <text x={p.x + p.w / 2} y={88} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5}>
            {p.t2}
          </text>
          <text x={p.x + p.w / 2} y={108} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
            {p.t3}
          </text>
          {i < pasos.length - 1 && (
            <line
              x1={p.x + p.w + 2}
              y1={85}
              x2={pasos[i + 1].x - 3}
              y2={85}
              stroke={LIENZO.fg}
              strokeWidth={1.8}
            />
          )}
        </g>
      ))}

      {/* Nota inferior sobre retroalimentación y destinos secundarios */}
      <rect x={40} y={145} width={460} height={42} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} />
      <text x={W / 2} y={163} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={600}>
        Destinos secundarios: ínsula, corteza orbitofrontal (sabor), hipocampo, amígdala e hipotálamo
      </text>
      <text x={W / 2} y={178} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        Células granuladas en el bulbo inhiben mitrales y en penacho (retroalimentación)
      </text>
    </svg>
  );
}

function EscOlfato() {
  return (
    <EscenaRica>
      <Titulo>Olfato: mucosa olfativa y proyección</Titulo>

      <Hook>
        Sin aroma, la canela apenas sabe algo dulce y la manzana y la cebolla resultan casi idénticas. Lo que llamas sabor nace en gran parte en la corteza orbitofrontal al unir gusto y olfato.
      </Hook>

      <Definicion termino="Mucosa olfativa y transducción por cAMP">
        La mucosa olfativa ocupa unos <MathText>{"$5\\text{ cm}^2$"}</MathText> por fosa nasal (sobre el cornete superior, la lámina cribosa del etmoides y el tabique) y alberga entre <MathText>{"$10$"}</MathText> y <MathText>{"$20$"}</MathText> millones de <strong>células olfativas</strong>, además de células de soporte y basales. A diferencia de las células gustativas, las olfativas sí son <strong>neuronas</strong>: poseen <MathText>{"$10\\text{ a }20$"}</MathText> vellosidades olfativas inmóviles sumergidas en moco. Los humanos conservamos cerca de <MathText>{"$350$"}</MathText> tipos de receptores funcionales (cada célula expresa un solo tipo). Al fijarse una molécula aromática, activa una <strong>proteína G</strong> y al segundo mensajero <strong>cAMP</strong>, que abre canales de <MathText>{"$\\text{Na}^+$"}</MathText> y <MathText>{"$\\text{Ca}^{2+}$"}</MathText>, despolariza la célula y genera potenciales de acción en su axón.
      </Definicion>

      <PorQue>
        Los axones olfativos atraviesan los agujeros cribosos del etmoides formando el <strong>par craneal I (nervio olfativo)</strong> y hacen sinapsis dentro de los <strong>glomérulos</strong> de los bulbos olfativos con <strong>células mitrales</strong> y <strong>células en penacho</strong> (moduladas por células granuladas inhibidoras). Desde allí, las cintillas olfativas proyectan de forma directa a la <strong>corteza olfativa primaria</strong> en el lóbulo temporal <strong>sin pasar primero por el tálamo</strong>. Luego alcanzan destinos secundarios (ínsula, corteza orbitofrontal, hipocampo, amígdala e hipotálamo), explicando por qué los olores evocan recuerdos intensos, emociones y reflejos viscerales como salivación o vómito.
      </PorQue>

      <Pizarra alto={200}>
        <SvgViaOlfativa />
      </Pizarra>

      <Ejemplo titulo="Ejemplo del capítulo · sales aromáticas y traumatismo etmoidal">
        Aunque su vida media es de apenas <MathText>{"$60\\text{ días}$"}</MathText> por estar expuestas al exterior, las neuronas olfativas se reemplazan desde las células basales. Sin embargo, una fractura de la lámina cribosa del etmoides puede seccionar los fascículos del par I y suprimir el olfato. Por otro lado, sustancias irritantes como el amoniaco (sales aromáticas), el mentol, el cloro o la capsaicina actúan sobre nocirreceptores del nervio trigémino (V), no sobre células olfativas.
      </Ejemplo>

      <Cuidado>
        El olfato es el único sentido cuyas señales alcanzan la corteza cerebral sin relevo previo en el tálamo (aunque luego sí haya relevos talámicos hacia áreas de asociación). Y recuerda: las células olfativas son neuronas, mientras que las gustativas y las pilosas cocleares son epiteliales.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte I: dos afirmaciones) */}
      <AutoCheck
        pregunta="Respecto al sentido del olfato: 1) Al igual que en el gusto y la audición, las células olfativas son células epiteliales que carecen de axón propio. 2) Sus señales hacen relevo obligatorio en el tálamo antes de alcanzar la corteza olfativa primaria en el lóbulo temporal."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Ambas (1 y 2)",
          "D) Ninguna",
        ]}
        correctaIdx={3}
        explicacion="Ninguna es verdadera. Las células olfativas son neuronas bipolares expuestas al ambiente con axones que forman el par craneal I; además, el olfato es el único sentido cuyas señales llegan directamente a la corteza olfativa primaria sin pasar primero por el tálamo."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ESCENA 5 · OÍDO Y AUDICIÓN (Saladin 16.4)
   ========================================================================== */
function SvgCocleaFrecuencias() {
  const W = 540;
  const H = 220;
  const xIni = 70;
  const xFin = 485;
  const yTop = 52;
  const yBot = 172;
  const yMid = (yTop + yBot) / 2;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
        Caracol desenrollado y mapa de frecuencias en la membrana basilar
      </text>

      {/* Contorno externo cóclea desenrollada */}
      <rect x={xIni} y={yTop} width={xFin - xIni} height={yBot - yTop} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} strokeWidth={1.6} />

      {/* Helicotrema (abertura derecha) */}
      <rect x={xFin - 26} y={yMid - 10} width={26} height={20} fill={LIENZO.bg} />
      <text x={xFin - 8} y={yMid + 4} textAnchor="end" fill={LIENZO.accent} fontSize={9.5} fontWeight={700}>
        Ápice
      </text>

      {/* Membrana basilar: estrecha/rígida en base (izq), 5x más ancha/flexible en ápice (der) */}
      <polygon
        points={`${xIni},${yMid - 2} ${xFin - 32},${yMid - 12} ${xFin - 32},${yMid + 12} ${xIni},${yMid + 2}`}
        fill={LIENZO.accent}
        fillOpacity={0.28}
        stroke={LIENZO.accent}
        strokeWidth={1.8}
      />

      {/* Ventana oval y redonda */}
      <rect x={xIni - 42} y={yTop + 8} width={40} height={24} rx={4} fill={LIENZO.warn} fillOpacity={0.2} stroke={LIENZO.warn} />
      <text x={xIni - 22} y={yTop + 23} textAnchor="middle" fill={LIENZO.warn} fontSize={9} fontWeight={700}>
        Estribo
      </text>
      <text x={xIni + 8} y={yTop + 23} fill={LIENZO.fg} fontSize={10}>
        Escala vestibular (perilinfa) · ventana oval
      </text>

      <rect x={xIni - 42} y={yBot - 32} width={40} height={24} rx={4} fill={LIENZO.ok} fillOpacity={0.2} stroke={LIENZO.ok} />
      <text x={xIni - 22} y={yBot - 17} textAnchor="middle" fill={LIENZO.ok} fontSize={8.5} fontWeight={700}>
        V. red.
      </text>
      <text x={xIni + 8} y={yBot - 17} fill={LIENZO.fg} fontSize={10}>
        Escala timpánica (perilinfa) · membrana timpánica 2.ª
      </text>

      {/* Marcas de frecuencia */}
      <text x={xIni + 48} y={yMid - 18} textAnchor="middle" fill={LIENZO.bad} fontSize={10.5} fontWeight={700}>
        Base: 7 000 a 20 000 Hz
      </text>
      <text x={xIni + 48} y={yMid + 27} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        estrecha y rígida (agudos)
      </text>

      <text x={W / 2 + 10} y={yMid - 18} textAnchor="middle" fill={LIENZO.warn} fontSize={10.5} fontWeight={700}>
        1 500 a 4 000 Hz
      </text>

      <text x={xFin - 95} y={yMid - 18} textAnchor="middle" fill={LIENZO.ok} fontSize={10.5} fontWeight={700}>
        Distal: 20 a 800 Hz
      </text>
      <text x={xFin - 95} y={yMid + 27} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9.5}>
        5 veces más ancha (graves)
      </text>

      <text x={W / 2} y={H - 12} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        Entre ambas escalas: conducto del caracol (escala media, endolinfa +80 mV) con órgano de Corti
      </text>
    </svg>
  );
}

function EscOidoAudicion() {
  return (
    <EscenaRica>
      <Titulo>Oído y audición</Titulo>

      <Puente>
        La membrana timpánica vibra fácilmente en el aire, pero al otro lado de la ventana oval la perilinfa resiste el movimiento. El oído medio concentra la fuerza de la membrana timpánica sobre una ventana <MathText>{"$18$"}</MathText> veces menor para mover ese líquido sin pérdidas.
      </Puente>

      <Definicion termino="Propiedades del sonido y anatomía en tres secciones">
        El tono depende de la frecuencia: el oído humano percibe de <MathText>{"$20\\text{ a }20\\,000\\text{ Hz}$"}</MathText> (máxima sensibilidad entre <MathText>{"$1\\,500\\text{ y }5\\,000\\text{ Hz}$"}</MathText>; debajo de <MathText>{"$20\\text{ Hz}$"}</MathText> es infrasónico y encima de <MathText>{"$20\\,000\\text{ Hz}$"}</MathText>, ultrasónico). La sonoridad se mide en decibeles (<MathText>{"$\\text{dB}$"}</MathText>): el umbral es <MathText>{"$0\\text{ dB}$"}</MathText>, cada <MathText>{"$10\\text{ dB}$"}</MathText> multiplica por <MathText>{"$10$"}</MathText> la intensidad, el habla ronda <MathText>{"$60\\text{ dB}$"}</MathText>, la exposición prolongada por encima de <MathText>{"$90\\text{ dB}$"}</MathText> causa pérdida permanente y el umbral de dolor es <MathText>{"$120\\text{ a }140\\text{ dB}$"}</MathText>.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li><strong>Oído externo:</strong> aurícula (cartílago elástico salvo el lóbulo) y conducto auditivo (~<MathText>{"$3\\text{ cm}$"}</MathText>) con cerumen (lisozima y pH bajo).</li>
          <li><strong>Oído medio:</strong> membrana timpánica (~<MathText>{"$1\\text{ cm}$"}</MathText>), cavidad timpánica (<MathText>{"$2\\text{ a }3\\text{ mm}$"}</MathText>) comunicada con la nasofaringe por la <strong>trompa auditiva o de Eustaquio</strong> (iguala presiones), tres huesecillos (<strong>martillo, yunque y estribo</strong> en la ventana oval) y dos músculos (<strong>tensor del tímpano</strong> y <strong>músculo del estribo</strong>) que generan el reflejo timpánico (retraso de ~<MathText>{"$40\\text{ ms}$"}</MathText>).</li>
          <li><strong>Oído interno:</strong> laberinto óseo con <strong>perilinfa</strong> (similar al líquido cefalorraquídeo) y laberinto membranoso con <strong>endolinfa</strong> (rica en <MathText>{"$\\text{K}^+$"}</MathText>, potencial eléctrico <MathText>{"$+80\\text{ mV}$"}</MathText> frente a <MathText>{"$-40\\text{ mV}$"}</MathText> dentro de la célula pilosa). El caracol o cóclea da <MathText>{"$2{,}5$"}</MathText> vueltas (<MathText>{"$9\\text{ mm}$"}</MathText> de ancho por <MathText>{"$5\\text{ mm}$"}</MathText> de alto) alrededor del <strong>modiolo o columela</strong>.</li>
        </ul>
      </Definicion>

      <Pizarra alto={220}>
        <SvgCocleaFrecuencias />
      </Pizarra>

      <PorQue>
        Dentro del conducto del caracol (escala media), el <strong>órgano de Corti</strong> se apoya sobre la membrana basilar debajo de la membrana tectoria fija. Posee ~<MathText>{"$3\\,500$"}</MathText> <strong>células pilosas internas (IHC)</strong> en <MathText>{"$1$"}</MathText> fila (responsables del <MathText>{"$90\\text{ a }95\\%$"}</MathText> de las fibras sensitivas del nervio coclear y de todo lo que se escucha) y ~<MathText>{"$20\\,000$"}</MathText> <strong>células pilosas externas (OHC)</strong> en <MathText>{"$3$"}</MathText> filas (se acortan <MathText>{"$10\\text{ a }15\\%$"}</MathText> por estímulo motor para modular frecuencias). Al subir la membrana basilar, los estereocilios se doblan hacia el más alto; el <strong>puente apical</strong> abre canales mecánicos de <MathText>{"$\\text{K}^+$"}</MathText>, entra <MathText>{"$\\text{K}^+$"}</MathText>, la célula se despolariza y libera neurotransmisor. La ruta auditiva es excepcional porque usa <strong>cuatro neuronas</strong> (en vez de tres; las estaciones no son una neurona cada una): ganglio espiral (par VIII) → núcleos cocleares → núcleo olivar superior (audición binaural) → tubérculos cuadrigéminos inferiores (reflejo de sobresalto) → núcleo geniculado medial del tálamo → corteza auditiva primaria en el lóbulo temporal (cisura de Silvio).
      </PorQue>

      <Ejemplo titulo="Ejemplo clínico · otitis media y tipos de sordera">
        En los niños, las trompas de Eustaquio son cortas y horizontales, facilitando el paso de infecciones respiratorias hacia el oído medio (<strong>otitis media</strong>); a veces se drena mediante <strong>timpanostomía</strong>. Por otra parte, la <strong>sordera conductiva</strong> bloquea la transmisión mecánica (cerumen impactado, otitis media, tímpano dañado u <strong>otoesclerosis</strong>, fusión de los huesecillos o del estribo en la ventana oval), mientras que la <strong>sordera neurosensitiva</strong> se debe a la muerte de células pilosas o daño nervioso por ruidos sostenidos superiores a <MathText>{"$90\\text{ dB}$"}</MathText> (el reflejo timpánico tarda <MathText>{"$40\\text{ ms}$"}</MathText> y no protege ante disparos súbitos).
      </Ejemplo>

      <Cuidado>
        Los huesecillos del oído medio no amplifican el sonido por ventaja mecánica de palanca (el estribo vibra con amplitud similar al tímpano); superan la inercia líquida al concentrar fuerza sobre la pequeña ventana oval y además reducen vibraciones dañinas mediante el reflejo timpánico. Tampoco confundas el conducto auditivo externo con la trompa auditiva.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte II: tres afirmaciones) */}
      <AutoCheck
        pregunta="Con relación a la anatomía y fisiología de la audición: 1) Las células pilosas externas (OHC) generan entre el 90 % y el 95 % de las fibras sensitivas del nervio coclear responsables de todo lo que se escucha. 2) El extremo distal (ápice) de la membrana basilar es estrecho y rígido, especializado en frecuencias altas de 7 000 a 20 000 Hz. 3) La ruta de proyección auditiva hasta la corteza cerebral consta de tres neuronas."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Solo 3",
          "D) Todas (1, 2 y 3)",
          "E) Ninguna",
        ]}
        correctaIdx={4}
        explicacion="Ninguna es verdadera. Las responsables del 90 % a 95 % de las fibras sensitivas auditivas son las células pilosas internas (IHC); el extremo proximal (base) es estrecho y rígido para tonos altos y el distal es 5 veces más ancho para graves (20 a 800 Hz); y la vía auditiva usa cuatro neuronas, no tres."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ESCENA 6 · EQUILIBRIO: VESTÍBULO Y CONDUCTOS SEMICIRCULARES (Saladin 16.4)
   ========================================================================== */
function SvgAparatoVestibular() {
  const W = 540;
  const H = 210;
  const divX = W / 2;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
        Aparato vestibular: mácula otolítica vs cresta ampollar
      </text>

      <line x1={divX} y1={34} x2={divX} y2={H - 12} stroke={LIENZO.fgFaint} strokeDasharray="4 4" />

      {/* Izquierda: Sáculo y utrículo */}
      <text x={divX / 2} y={44} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>
        Sáculo y utrículo (mácula 2 × 3 mm)
      </text>
      <path
        d="M 45 78 Q 135 66 225 78 L 225 98 Q 135 88 45 98 Z"
        fill={LIENZO.warn}
        fillOpacity={0.22}
        stroke={LIENZO.warn}
        strokeWidth={1.8}
      />
      {[65, 92, 120, 148, 176, 204].map((x, i) => (
        <circle key={i} cx={x} cy={80 + (i % 2) * 5} r={3.5} fill={LIENZO.warn} />
      ))}
      <text x={divX / 2} y={64} textAnchor="middle" fill={LIENZO.warn} fontSize={10} fontWeight={600}>
        Membrana otolítica + otolitos (CaCO₃)
      </text>
      {/* Células pilosas con estereocilios y cinetocilio */}
      {[80, 135, 190].map((x, i) => (
        <g key={i}>
          <rect x={x - 12} y={114} width={24} height={32} rx={4} fill={LIENZO.bgSoft} stroke={LIENZO.accent} />
          <line x1={x - 6} y1={114} x2={x - 4} y2={96} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={x} y1={114} x2={x + 2} y2={93} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={x + 6} y1={114} x2={x + 9} y2={90} stroke={LIENZO.bad} strokeWidth={2} />
        </g>
      ))}
      <text x={divX / 2} y={165} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={600}>
        Utrículo (horizontal): inclinación y acel. horizontal
      </text>
      <text x={divX / 2} y={181} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        Sáculo (vertical): acel. vertical (elevador)
      </text>

      {/* Derecha: Conductos semicirculares */}
      <text x={divX + divX / 2} y={44} textAnchor="middle" fill={LIENZO.ok} fontSize={12} fontWeight={700}>
        3 conductos semicirculares (ampolla)
      </text>
      <path
        d="M 320 146 L 365 146 L 390 74 Q 405 58 420 74 L 445 146 L 490 146"
        fill="none"
        stroke={LIENZO.ok}
        strokeWidth={2}
      />
      <path
        d="M 380 146 Q 405 64 430 146 Z"
        fill={LIENZO.ok}
        fillOpacity={0.22}
        stroke={LIENZO.ok}
        strokeWidth={1.8}
      />
      <text x={405} y={108} textAnchor="middle" fill={LIENZO.ok} fontSize={10.5} fontWeight={700}>
        Cúpula
      </text>
      <text x={405} y={122} textAnchor="middle" fill={LIENZO.fgDim} fontSize={9}>
        (sin otolitos)
      </text>
      <line x1={325} y1={85} x2={372} y2={85} stroke={LIENZO.accent} strokeWidth={2} />
      <text x={346} y={77} textAnchor="middle" fill={LIENZO.accent} fontSize={9.5} fontWeight={600}>
        Endolinfa
      </text>
      <text x={divX + divX / 2} y={165} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={600}>
        Cresta ampollar: detecta aceleración angular
      </text>
      <text x={divX + divX / 2} y={181} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>
        Tras 20 a 25 s de giro continuo, cesa el estímulo
      </text>
    </svg>
  );
}

function EscEquilibrio() {
  return (
    <EscenaRica>
      <Titulo>Equilibrio: vestíbulo y conductos semicirculares</Titulo>

      <Hook>
        Incluso con los ojos cerrados, sientes cuándo un ascensor empieza a subir o cuándo un auto frena de golpe, pero si giras a velocidad constante en una silla durante medio minuto dejas de percibir el giro. ¿Por qué ocurre cada sensación?
      </Hook>

      <Definicion termino="Equilibrio estático, dinámico y aparato vestibular">
        El equilibrio es la orientación y balance corporal en el espacio tridimensional. Se divide en <strong>equilibrio estático</strong> (posición de la cabeza en reposo) y <strong>equilibrio dinámico</strong> (cambios de velocidad: <strong>aceleración lineal</strong> o <strong>aceleración angular</strong>). Reside en el aparato vestibular del oído interno:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li><strong>Vestíbulo (sáculo anterior y utrículo posterior):</strong> cada uno contiene una <strong>mácula</strong> de <MathText>{"$2\\text{ por }3\\text{ mm}$"}</MathText> con células pilosas (<MathText>{"$40\\text{ a }70$"}</MathText> estereocilios y un cilio verdadero llamado <strong>cinetocilio</strong>) cubiertas por una <strong>membrana otolítica</strong> gelatinosa cargada con gránulos de carbonato de calcio y proteínas llamados <strong>otolitos</strong>. La mácula utricular es casi horizontal (inclinación de cabeza y aceleración lineal horizontal) y la sacular es casi vertical (aceleración y desaceleración vertical).</li>
          <li><strong>Tres conductos semicirculares:</strong> anterior y posterior verticales en ángulo recto entre sí, y lateral inclinado a <MathText>{"$30^\\circ$"}</MathText> del plano horizontal. Cada uno se abre en el utrículo mediante una dilatación, la <strong>ampolla</strong>, con una <strong>cresta ampollar</strong> coronada por una cubierta gelatinosa llamada <strong>cúpula</strong> (detectan aceleración angular o de rotación).</li>
        </ul>
      </Definicion>

      <Pizarra alto={210}>
        <SvgAparatoVestibular />
      </Pizarra>

      <PorQue>
        Al inclinar la cabeza o acelerar en línea recta, la inercia de la pesada membrana otolítica hace que se combe o quede rezagada, doblando los estereocilios. En los conductos semicirculares, al iniciar un giro de cabeza la endolinfa queda atrás por inercia y empuja la cúpula; sin embargo, tras <MathText>{"$20\\text{ a }25\\text{ segundos}$"}</MathText> de rotación continua, la endolinfa se sincroniza con el conducto y cesa la estimulación. Las fibras del nervio vestibular (parte del par craneal VIII) llegan a cuatro núcleos vestibulares en la protuberancia y el bulbo, que envían información a <strong>cinco destinos</strong>: cerebelo (coordinación y tono), núcleos de los pares craneales III, IV y VI (<strong>reflejo vestibuloocular</strong> para mantener fija la vista mientras se mueve la cabeza), formación reticular (respiración y circulación según postura), médula espinal (vías vestibuloespinales a músculos extensores antigravitatorios) y tálamo hacia la corteza vestibular (extremo inferior de la circunvolución poscentral y cisura de Rolando).
      </PorQue>

      <Ejemplo titulo="Ejemplo fisiológico · leer mientras mueves la cabeza">
        Si mantienes un libro quieto frente a ti y mueves la cabeza de lado a lado una vez por segundo, puedes seguir leyendo con nitidez gracias al <strong>reflejo vestibuloocular</strong> mediado por los núcleos vestibulares y los pares III, IV y VI; en cambio, si dejas la cabeza quieta y mueves el libro al mismo ritmo, resulta imposible leerlo.
      </Ejemplo>

      <Cuidado>
        Las crestas ampollares de los conductos semicirculares no poseen otolitos y tampoco detectan velocidad constante: solo responden a la aceleración angular (el inicio o el cambio de rotación).
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte I: dos afirmaciones) */}
      <AutoCheck
        pregunta="Respecto al aparato vestibular: 1) La mácula del sáculo tiene disposición casi horizontal y está especializada en detectar la aceleración angular durante giros en una silla rotatoria. 2) El reflejo vestibuloocular depende de señales vestibulares proyectadas hacia los núcleos de los pares craneales III, IV y VI para compensar los movimientos de la cabeza."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Ambas (1 y 2)",
          "D) Ninguna",
        ]}
        correctaIdx={1}
        explicacion="Solo la 2 es verdadera: los núcleos vestibulares proyectan a los pares III, IV y VI para producir movimientos oculares compensatorios. La 1 es falsa: la mácula sacular es casi vertical (detecta aceleración vertical y equilibrio estático), mientras que la aceleración angular corresponde a los conductos semicirculares."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ESCENA 7 · OJO: ANATOMÍA Y FORMACIÓN DE LA IMAGEN (Saladin 16.5)
   ========================================================================== */
function SvgOpticaDefectos() {
  const W = 540;
  const H = 225;
  const filas = [
    {
      y: 60,
      tit: "Emetropía (normal)",
      largo: 96,
      focoDx: 96,
      corr: "Foco en la retina (>= 6 m sin esfuerzo)",
      col: LIENZO.ok,
      lente: "ninguna",
    },
    {
      y: 122,
      tit: "Hipermetropía (ojo corto)",
      largo: 78,
      focoDx: 102,
      corr: "Foco detrás de la retina -> lente convexa",
      col: LIENZO.warn,
      lente: "convexa",
    },
    {
      y: 184,
      tit: "Miopía (ojo largo)",
      largo: 112,
      focoDx: 82,
      corr: "Foco delante de la retina -> lente cóncava",
      col: LIENZO.accent,
      lente: "concava",
    },
  ];
  const xOjo = 115;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
        Refracción: córnea (n = 1,38) y cristalino (n = 1,40) · defectos visuales
      </text>

      {filas.map((f, idx) => {
        const xRetina = xOjo + f.largo;
        const xFoco = xOjo + f.focoDx;
        return (
          <g key={idx}>
            <text x={16} y={f.y - 10} fill={f.col} fontSize={11} fontWeight={700}>
              {f.tit}
            </text>
            {/* Lente correctora si aplica */}
            {f.lente === "convexa" && (
              <ellipse cx={xOjo - 22} cy={f.y} rx={4} ry={16} fill={f.col} fillOpacity={0.25} stroke={f.col} />
            )}
            {f.lente === "concava" && (
              <path
                d={`M ${xOjo - 26} ${f.y - 16} Q ${xOjo - 21} ${f.y} ${xOjo - 26} ${f.y + 16} L ${xOjo - 18} ${f.y + 16} Q ${xOjo - 23} ${f.y} ${xOjo - 18} ${f.y - 16} Z`}
                fill={f.col}
                fillOpacity={0.25}
                stroke={f.col}
              />
            )}
            {/* Globo ocular simplificado */}
            <ellipse
              cx={xOjo + f.largo / 2}
              cy={f.y}
              rx={f.largo / 2}
              ry={22}
              fill={LIENZO.bgSoft}
              stroke={f.col}
              strokeWidth={1.8}
            />
            {/* Rayos sin corregir */}
            <line x1={xOjo - 45} y1={f.y - 10} x2={xOjo + 8} y2={f.y - 10} stroke={LIENZO.fgDim} strokeWidth={1.3} />
            <line x1={xOjo - 45} y1={f.y + 10} x2={xOjo + 8} y2={f.y + 10} stroke={LIENZO.fgDim} strokeWidth={1.3} />
            <line x1={xOjo + 8} y1={f.y - 10} x2={xFoco} y2={f.y} stroke={f.col} strokeWidth={1.6} />
            <line x1={xOjo + 8} y1={f.y + 10} x2={xFoco} y2={f.y} stroke={f.col} strokeWidth={1.6} />
            <circle cx={xFoco} cy={f.y} r={3.5} fill={LIENZO.bad} />
            <circle cx={xRetina} cy={f.y} r={2} fill={LIENZO.fg} />

            {/* Descripción derecha */}
            <text x={252} y={f.y + 4} fill={LIENZO.fg} fontSize={11}>
              {f.corr}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function EscOjoOptica() {
  return (
    <EscenaRica>
      <Titulo>Ojo: anatomía y formación de la imagen</Titulo>

      <Puente>
        Aunque solemos pensar que el cristalino hace todo el enfoque, el mayor desvío de la luz ocurre antes, al atravesar la córnea desde el aire: el cambio de índice de refracción allí es cinco veces mayor que el paso al cristalino.
      </Puente>

      <Definicion termino="Anexos, músculos extrínsecos y tres túnicas del ojo">
        Las estructuras accesorias protegen y mueven el globo ocular (esfera de ~<MathText>{"$24\\text{ mm}$"}</MathText>): cejas, párpados (con el tarso palpebral y <MathText>{"$20\\text{ a }25$"}</MathText> <strong>glándulas de Meibomio</strong> secretoras de aceite), pestañas, conjuntiva (mucosa vascular que cubre todo salvo la córnea) y aparato lagrimal (~<MathText>{"$12$"}</MathText> conductos, lágrimas con <strong>lisozima</strong> que drenan por el punto lagrimal al conducto nasolagrimal hacia el meato nasal inferior). Seis músculos extrínsecos orientan la mirada: el oblicuo superior (pasa por la tróclea) está inervado por el <strong>par IV (patético)</strong>, el recto lateral por el <strong>par VI (motor ocular externo)</strong> y los otros cuatro por el <strong>par III (motor ocular común)</strong>. El globo tiene tres túnicas:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li><strong>Fibrosa externa:</strong> esclerótica (blanca, colágeno denso) y córnea (transparente, avascular, cuyos epitelios bombean <MathText>{"$\\text{Na}^+$"}</MathText> hacia fuera para evitar edema).</li>
          <li><strong>Vascular media (úvea):</strong> coroides (muy pigmentado), cuerpo ciliar (sostiene el cristalino y secreta humor acuoso) e iris (constrictor pupilar parasimpático y dilatador mioepitelial simpático).</li>
          <li><strong>Interna:</strong> retina (unida en el disco óptico y el ora serrata) y origen del nervio óptico.</li>
        </ul>
      </Definicion>

      <PorQue>
        La luz atraviesa medios transparentes con índices crecientes o cercanos: aire (<MathText>{"$n = 1{,}00$"}</MathText>) → <strong>córnea (<MathText>{"$n = 1{,}38$"}</MathText>)</strong> → humor acuoso (<MathText>{"$n = 1{,}33$"}</MathText>) → <strong>cristalino (<MathText>{"$n = 1{,}40$"}</MathText>)</strong> → cuerpo vítreo (<MathText>{"$n = 1{,}33$"}</MathText>). Al pasar de <MathText>{"$1{,}00$"}</MathText> a <MathText>{"$1{,}38$"}</MathText> (salto de <MathText>{"$0{,}38$"}</MathText>), la córnea realiza la mayor refracción; el cristalino (salto de <MathText>{"$0{,}07$"}</MathText>) solo afina el enfoque. En <strong>emetropía</strong> (<MathText>{"$\\ge 6\\text{ m}$"}</MathText>), el ojo relajado enfoca sin esfuerzo. Al mirar de cerca (<MathText>{"$< 6\\text{ m}$"}</MathText>), la <strong>respuesta al acercamiento</strong> ejecuta tres actos: <strong>convergencia ocular</strong> (evita diplopía), <strong>constricción pupilar</strong> (reduce aberración esférica) y <strong>acomodamiento</strong> (el músculo ciliar se contrae, relaja el ligamento suspensorio y el cristalino se engrosa de <MathText>{"$3{,}6\\text{ mm}$"}</MathText> a <MathText>{"$4{,}5\\text{ mm}$"}</MathText>). Con la edad el cristalino pierde flexibilidad (<strong>presbicia</strong>): el punto cercano pasa de <MathText>{"$9\\text{ cm}$"}</MathText> a los <MathText>{"$10\\text{ años}$"}</MathText> a <MathText>{"$83\\text{ cm}$"}</MathText> a los <MathText>{"$60\\text{ años}$"}</MathText>.
      </PorQue>

      <Pizarra alto={225}>
        <SvgOpticaDefectos />
      </Pizarra>

      <Ejemplo titulo="Ejemplo clínico · cataratas, glaucoma y desprendimiento de retina">
        El cuerpo ciliar secreta el <strong>humor acuoso</strong> en la cámara posterior; este pasa por la pupila a la cámara anterior y se reabsorbe en el <strong>seno venoso escleral (canal de Schlemm)</strong>. Si dicho seno se obstruye, sube la presión intraocular y aparece <strong>glaucoma</strong> (medible con un tonómetro): el cuerpo vítreo comprime la retina contra el coroides, corta su irrigación y provoca ceguera irreversible. Las <strong>cataratas</strong> corresponden a turbiedad del cristalino (se reemplaza con lente plástico) y el <strong>desprendimiento de retina</strong> separa esta capa del coroides que la nutre. El <strong>astigmatismo</strong> se debe a córnea irregular y se corrige con lentes cilíndricas.
      </Ejemplo>

      <Cuidado>
        Fíjate en el sentido del mecanismo de acomodamiento: para enfocar de cerca, el músculo ciliar se <strong>contrae</strong> (cierra su anillo), lo que <strong>relaja</strong> el ligamento suspensorio y permite que el cristalino se vuelva más convexo. En la miopía (globo demasiado largo, foco delante de la retina), la figura 16.33c del capítulo muestra su corrección mediante <strong>lente cóncava</strong> para divergir los rayos antes de entrar al ojo.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte II: tres afirmaciones) */}
      <AutoCheck
        pregunta="Con relación a la anatomía y óptica del ojo: 1) El cristalino realiza mayor refracción que la córnea porque pasa de n = 1,33 a n = 1,40. 2) El músculo oblicuo superior está inervado por el nervio motor ocular externo (par VI). 3) Durante el acomodamiento de cerca, la contracción del músculo ciliar relaja el ligamento suspensorio y engrosa el cristalino."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Solo 3",
          "D) Todas (1, 2 y 3)",
          "E) Ninguna",
        ]}
        correctaIdx={2}
        explicacion="Solo la 3 es verdadera: al contraerse el músculo ciliar disminuye la tensión del ligamento suspensorio y el cristalino se engrosa hasta 4,5 mm. La 1 es falsa: el mayor salto ocurre del aire (1,00) a la córnea (1,38). La 2 es falsa: el oblicuo superior recibe el par IV (patético); el par VI inerva al recto lateral."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ESCENA 8 · FOTORRECEPCIÓN Y VÍA VISUAL (Saladin 16.5)
   ========================================================================== */
function SvgHemidecusacion() {
  const W = 540;
  const H = 225;
  const ojoIzqX = 145;
  const ojoDerX = 395;
  const ojoY = 74;
  const quiasmaY = 128;
  const talamoY = 166;
  const cortY = 204;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
      <text x={W / 2} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
        Hemidecusación en el quiasma óptico y proyección occipital
      </text>

      {/* Campos visuales arriba */}
      <text x={ojoIzqX - 35} y={40} textAnchor="middle" fill={LIENZO.accent} fontSize={10.5} fontWeight={700}>
        Campo visual izquierdo
      </text>
      <text x={ojoDerX + 35} y={40} textAnchor="middle" fill={LIENZO.warn} fontSize={10.5} fontWeight={700}>
        Campo visual derecho
      </text>

      {/* Dos ojos */}
      {[ojoIzqX, ojoDerX].map((ox, i) => (
        <g key={i}>
          <circle cx={ox} cy={ojoY} r={20} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <text x={ox} y={ojoY + 4} textAnchor="middle" fill={LIENZO.fg} fontSize={10} fontWeight={700}>
            {i === 0 ? "Ojo izq." : "Ojo der."}
          </text>
        </g>
      ))}

      {/* Fibras laterales (ipsilaterales) y mediales (cruzadas) */}
      {/* Hemirretina izquierda de ojo izq (ve campo derecho) -> ipsilateral al lado izq */}
      <path d={`M ${ojoIzqX - 14} ${ojoY + 15} L ${ojoIzqX - 18} ${quiasmaY} L ${ojoIzqX - 12} ${talamoY}`} fill="none" stroke={LIENZO.warn} strokeWidth={2} />
      {/* Hemirretina derecha/nasal de ojo izq (ve campo izq) -> cruza al lado der */}
      <path d={`M ${ojoIzqX + 12} ${ojoY + 17} L ${W / 2} ${quiasmaY} L ${ojoDerX - 10} ${talamoY}`} fill="none" stroke={LIENZO.accent} strokeWidth={2} />
      {/* Hemirretina izq/nasal de ojo der (ve campo der) -> cruza al lado izq */}
      <path d={`M ${ojoDerX - 12} ${ojoY + 17} L ${W / 2} ${quiasmaY} L ${ojoIzqX + 10} ${talamoY}`} fill="none" stroke={LIENZO.warn} strokeWidth={2} />
      {/* Hemirretina derecha/temporal de ojo der (ve campo izq) -> ipsilateral al lado der */}
      <path d={`M ${ojoDerX + 14} ${ojoY + 15} L ${ojoDerX + 18} ${quiasmaY} L ${ojoDerX + 12} ${talamoY}`} fill="none" stroke={LIENZO.accent} strokeWidth={2} />

      {/* Etiqueta quiasma */}
      <rect x={W / 2 - 58} y={quiasmaY - 11} width={116} height={22} rx={5} fill={LIENZO.bgSoft} stroke={LIENZO.ok} strokeWidth={1.4} />
      <text x={W / 2} y={quiasmaY + 4} textAnchor="middle" fill={LIENZO.ok} fontSize={10.5} fontWeight={700}>
        Quiasma óptico
      </text>

      {/* Núcleos geniculados laterales del tálamo */}
      <rect x={ojoIzqX - 72} y={talamoY - 12} width={144} height={22} rx={5} fill={LIENZO.bgSoft} stroke={LIENZO.warn} strokeWidth={1.4} />
      <text x={ojoIzqX} y={talamoY + 3} textAnchor="middle" fill={LIENZO.warn} fontSize={10} fontWeight={700}>
        N. geniculado lat. izq.
      </text>
      <rect x={ojoDerX - 72} y={talamoY - 12} width={144} height={22} rx={5} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.4} />
      <text x={ojoDerX} y={talamoY + 3} textAnchor="middle" fill={LIENZO.accent} fontSize={10} fontWeight={700}>
        N. geniculado lat. der.
      </text>

      {/* Radiaciones ópticas -> corteza visual occipital */}
      <line x1={ojoIzqX} y1={talamoY + 10} x2={ojoIzqX} y2={cortY - 13} stroke={LIENZO.warn} strokeWidth={2} />
      <line x1={ojoDerX} y1={talamoY + 10} x2={ojoDerX} y2={cortY - 13} stroke={LIENZO.accent} strokeWidth={2} />
      <text x={ojoIzqX} y={cortY} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={700}>
        Lóbulo occipital izq. (ve campo der.)
      </text>
      <text x={ojoDerX} y={cortY} textAnchor="middle" fill={LIENZO.fg} fontSize={10.5} fontWeight={700}>
        Lóbulo occipital der. (ve campo izq.)
      </text>
    </svg>
  );
}

function EscVisionVia() {
  return (
    <EscenaRica>
      <Titulo>Fotorrecepción y vía visual</Titulo>

      <Hook>
        En la oscuridad total, tus bastones NO están apagados: liberan glutamato sin parar para frenar ciertas células bipolares. Cuando entra un fotón de luz, esa secreción se detiene y recién entonces nace la señal en el nervio óptico.
      </Hook>

      <Definicion termino="Retina, teoría de la duplicidad y fotopigmentos">
        La visión humana responde a radiación electromagnética de <MathText>{"$400\\text{ a }700\\text{ nm}$"}</MathText> (UV <MathText>{"$< 400\\text{ nm}$"}</MathText> destruye macromoléculas; IR <MathText>{"$> 700\\text{ nm}$"}</MathText> apenas calienta). Detrás del cuerpo vítreo la retina presenta el epitelio pigmentario (absorbe luz sobrante) y tres capas neurales: fotorreceptores, <strong>células bipolares</strong> (1.° orden) y <strong>células ganglionares</strong> (2.° orden, únicas retinianas con potenciales de acción), moduladas lateralmente por células horizontales y amacrinas. Además existen células ganglionares con <strong>melanopsina</strong> que detectan brillo ambiental para el reflejo fotopupilar y los ritmos circadianos.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14, lineHeight: 1.5 }}>
          <li><strong>Bastones (~<MathText>{"$130$"}</MathText> millones):</strong> usan <strong>rodopsina</strong> (opsina más retinal, pico <MathText>{"$500\\text{ nm}$"}</MathText>); brindan visión nocturna o <strong>escotópica</strong> en tonos grises con alta convergencia (hasta <MathText>{"$600$"}</MathText> bastones por bipolar, campo de recepción de <MathText>{"$1\\text{ mm}^2$"}</MathText>) y gran sumatoria espacial.</li>
          <li><strong>Conos (~<MathText>{"$6{,}5$"}</MathText> millones):</strong> usan <strong>fotopsina</strong> en tres tipos: onda corta S (<MathText>{"$420\\text{ nm}$"}</MathText>), media M (<MathText>{"$531\\text{ nm}$"}</MathText>) y larga L (<MathText>{"$558\\text{ nm}$"}</MathText>); brindan visión diurna o <strong>fotópica</strong> tricromática. En la <strong>fóvea central</strong> (dentro de la mácula lútea de <MathText>{"$3\\text{ mm}$"}</MathText>) hay ~<MathText>{"$4\\,000$"}</MathText> conos sin convergencia (línea privada <MathText>{"$1:1$"}</MathText>, campo de <MathText>{"$2\\text{ }\\mu\\text{m}^2$"}</MathText>) para máxima agudeza.</li>
        </ul>
      </Definicion>

      <PorQue>
        Al absorber luz, el <strong>cis-retinal</strong> se isomeriza a <strong>trans-retinal</strong> y se separa de la opsina (<strong>blanqueado</strong>). La regeneración del <MathText>{"$50\\%$"}</MathText> tarda ~<MathText>{"$5\\text{ min}$"}</MathText> en bastones y ~<MathText>{"$90\\text{ s}$"}</MathText> en conos (adaptación completa a la oscuridad: <MathText>{"$20\\text{ a }30\\text{ min}$"}</MathText>). En el <strong>disco óptico</strong> (<MathText>{"$3\\text{ mm}$"}</MathText> medial a la mácula) salen ~<MathText>{"$1\\text{ millón}$"}</MathText> de fibras del nervio óptico sin fotorreceptores, generando un <strong>escotoma</strong> o punto ciego que el encéfalo compensa por <strong>relleno visual</strong>. Luego los nervios ópticos forman una X en el <strong>quiasma óptico</strong>: ocurre una <strong>hemidecusación</strong> en la que cruzan solo las fibras mediales (nasales), mientras las laterales siguen del mismo lado. Las cintillas ópticas terminan en el <strong>núcleo geniculado lateral del tálamo</strong>, cuyas neuronas de 3.° orden forman la radiación óptica hacia la corteza visual primaria del <strong>lóbulo occipital</strong>.
      </PorQue>

      <Pizarra alto={225}>
        <SvgHemidecusacion />
      </Pizarra>

      <Ejemplo titulo="Ejemplo clínico · daltonismo y lesión occipital">
        La ausencia hereditaria de conos L o M origina daltonismo para rojo y verde, un rasgo recesivo ligado al sexo presente en casi <MathText>{"$8\\%$"}</MathText> de los varones y <MathText>{"$0{,}5\\%$"}</MathText> de las mujeres. Asimismo, el reflejo fotopupilar consensual viaja por fibras con melanopsina al núcleo pretectal del mesencéfalo y vuelve por el par III vía ganglio ciliar; por último, una lesión del lóbulo occipital produce ceguera aunque ambos ojos estén intactos.
      </Ejemplo>

      <Cuidado>
        En la retina solo las células ganglionares producen potenciales de acción; los fotorreceptores y las bipolares generan únicamente potenciales locales graduados. También recuerda por qué una estrella tenue desaparece si la miras directamente y reaparece al desviar un poco la vista: la fóvea solo tiene conos (menor sensibilidad a la luz tenue), mientras los bastones rodean la periferia.
      </Cuidado>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte II: tres afirmaciones) */}
      <AutoCheck
        pregunta="Con relación a la retina y la vía visual: 1) Las células ganglionares son las únicas neuronas retinianas que producen potenciales de acción y sus axones forman el nervio óptico. 2) En la fóvea central convergen hasta 600 conos sobre una misma célula bipolar para lograr máxima agudeza. 3) En el quiasma óptico se cruzan todas las fibras de ambos nervios ópticos al lado contrario."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Solo 3",
          "D) Todas (1, 2 y 3)",
          "E) Ninguna",
        ]}
        correctaIdx={0}
        explicacion="Solo la 1 es verdadera: las ganglionares (2.° orden) disparan potenciales de acción y forman el nervio óptico. La 2 es falsa: en la fóvea cada cono tiene una línea privada 1:1 sin convergencia (la convergencia de hasta 600 células ocurre en los bastones). La 3 es falsa: hay hemidecusación, pues solo cruzan las fibras mediales."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ESCENA 9 · REPASO Y PRÁCTICA (INTEGRACIÓN SALADIN CAP. 16)
   ========================================================================== */
function EscRepaso() {
  return (
    <EscenaRica>
      <Titulo>Repaso y práctica</Titulo>

      <Misconception titulo="Error 1 · Creer que cada sentido usa potenciales de acción distintos">
        <strong>Confusión:</strong> pensar que la señal eléctrica visual es físicamente distinta de la auditiva.<br />
        <strong>Realidad:</strong> todos los potenciales de acción son idénticos; el encéfalo distingue la modalidad por el origen de la ruta nerviosa (<strong>código de línea marcada</strong>).
      </Misconception>

      <Misconception titulo="Error 2 · Olfato igual que el resto y células gustativas como neuronas">
        <strong>Confusión:</strong> asumir que todas las vías sensitivas pasan por el tálamo antes de la corteza y que las células gustativas son neuronas.<br />
        <strong>Realidad:</strong> las células gustativas y las pilosas son epiteliales, mientras las olfativas sí son neuronas; además, el olfato es el único sentido cuya señal alcanza la corteza olfativa primaria sin relevo talámico previo.
      </Misconception>

      <Misconception titulo="Error 3 · Atribuir el mayor enfoque al cristalino y relajar el músculo ciliar al leer">
        <strong>Confusión:</strong> pensar que el cristalino refracta más que la córnea y que el músculo ciliar se relaja para ver de cerca.<br />
        <strong>Realidad:</strong> el mayor salto de refracción ocurre del aire (<MathText>{"$1{,}00$"}</MathText>) a la córnea (<MathText>{"$1{,}38$"}</MathText>); y al acercar la mirada (<MathText>{"$< 6\\text{ m}$"}</MathText>), el músculo ciliar se contrae para relajar el ligamento suspensorio y engrosar el cristalino.
      </Misconception>

      <Misconception titulo="Error 4 · Suponer que los bastones están inactivos en la oscuridad">
        <strong>Confusión:</strong> creer que la luz activa directamente la liberación de neurotransmisor desde el bastón.<br />
        <strong>Realidad:</strong> en la oscuridad el bastón con cis-retinal libera glutamato de forma continua; la luz lo isomeriza a trans-retinal y detiene esa secreción, desinhibiendo a la célula bipolar.
      </Misconception>

      <Resumen>
        Los receptores realizan transducción y codifican modalidad, ubicación, intensidad y duración (fásicos vs tónicos). Los sentidos generales incluyen terminaciones libres y encapsuladas (Merkel, Meissner, Krause, Pacini, Ruffini) y vías de dolor moduladas por opioides endógenos y compuertas espinales. El gusto (VII, IX, X al núcleo solitario) y el olfato (par I directo al lóbulo temporal) son sentidos químicos. El oído transforma ondas en impulsos en el órgano de Corti (IHC, vía de 4 neuronas), mientras sáculo, utrículo y conductos semicirculares mantienen el equilibrio estático y dinámico. La visión enfoca por córnea y cristalino sobre bastones (rodopsina, escotópica) y conos (fotopsina, fotópica), proyectando tras la hemidecusación quiasmática al núcleo geniculado lateral del tálamo y al lóbulo occipital.
      </Resumen>

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte II: tres afirmaciones) */}
      <AutoCheck
        pregunta="Integrando receptores y sentidos generales (Saladin cap. 16): 1) La discriminación en dos puntos es más fina en las yemas de los dedos (campos receptivos de 1 mm o menos) que en la espalda (hasta 7 cm). 2) Los discos táctiles de Merkel y los corpúsculos de Ruffini son receptores tónicos. 3) El dolor rápido viaja por fibras mielínicas de 12 a 30 m/s y el dolor lento por fibras amielínicas de 0,5 a 2,0 m/s."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Solo 3",
          "D) Todas (1, 2 y 3)",
          "E) Ninguna",
        ]}
        correctaIdx={3}
        explicacion="Las tres afirmaciones coinciden literalmente con las secciones 16.1 y 16.2 del capítulo: campos receptivos de hasta 7 cm en espalda frente a 1 mm o menos en dedos (discriminación en dos puntos de 2 mm), carácter tónico de Merkel y Ruffini, y velocidades de conducción del dolor rápido y lento."
      />

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte I: dos afirmaciones) */}
      <AutoCheck
        pregunta="Con relación al gusto y al olfato: 1) Los botones gustativos de las papilas valadas se ubican en el tercio posterior de la lengua y están inervados por el nervio glosofaríngeo (IX). 2) El sabor umami responde a aminoácidos como los ácidos aspártico y glutámico mediante receptores acoplados a proteína G."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Ambas (1 y 2)",
          "D) Ninguna",
        ]}
        correctaIdx={2}
        explicacion="Ambas afirmaciones son verdaderas: el par IX recoge la sensibilidad gustativa del tercio posterior (donde se disponen en V las 7 a 12 papilas valadas) y el sabor umami depende de aminoácidos como aspártico y glutámico acoplados a proteína G y segundo mensajero."
      />

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte I: dos afirmaciones) */}
      <AutoCheck
        pregunta="Respecto a la audición y el equilibrio: 1) El conducto del caracol (escala media) contiene perilinfa con potencial de +80 mV igual que la escala vestibular. 2) Al inclinarse la cabeza, los otolitos de carbonato de calcio aumentan el peso e inercia de la membrana otolítica de las máculas para doblar los estereocilios."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Ambas (1 y 2)",
          "D) Ninguna",
        ]}
        correctaIdx={1}
        explicacion="Solo la 2 es verdadera: los otolitos de carbonato de calcio y proteínas añaden peso e inercia a la membrana otolítica de sáculo y utrículo. La 1 es falsa porque el conducto del caracol contiene endolinfa rica en K+ (+80 mV), mientras la escala vestibular y la timpánica contienen perilinfa."
      />

      {/* basado en: data/examenes/umss/medicina/2025-segundo-parcial-curso-basico-2024-2025.md (formato Parte II: tres afirmaciones) */}
      <AutoCheck
        pregunta="Con relación a la visión y sus vías: 1) El glaucoma ocurre cuando se obstruye el seno venoso escleral (canal de Schlemm) y aumenta la presión intraocular. 2) La alteración hereditaria para distinguir los colores rojo y verde por ausencia de conos L o M (daltonismo) es un rasgo recesivo ligado al sexo más común en varones (~8 %) que en mujeres (~0,5 %). 3) El hemisferio cerebral derecho vigila el campo visual izquierdo tras la hemidecusación quiasmática."
        opciones={[
          "A) Solo 1",
          "B) Solo 2",
          "C) Solo 3",
          "D) Todas (1, 2 y 3)",
          "E) Ninguna",
        ]}
        correctaIdx={3}
        explicacion="Las tres afirmaciones son verdaderas según Saladin 16.5: obstrucción del seno venoso escleral en el glaucoma, herencia recesiva ligada al sexo en el daltonismo (8 % en hombres frente a 0,5 % en mujeres) y vigilancia contralateral del campo visual en la corteza occipital."
      />
    </EscenaRica>
  );
}

/* ==========================================================================
   ENSAMBLE DE LA LECCIÓN (9 ESCENAS)
   ========================================================================== */
const ESCENAS = [
  { titulo: "Receptores sensitivos: tipos y propiedades", componente: EscReceptores },
  { titulo: "Sentidos generales y dolor", componente: EscSentidosGenerales },
  { titulo: "Gusto: botones gustativos y vía", componente: EscGusto },
  { titulo: "Olfato: mucosa olfativa y proyección", componente: EscOlfato },
  { titulo: "Oído y audición", componente: EscOidoAudicion },
  { titulo: "Equilibrio: vestíbulo y conductos semicirculares", componente: EscEquilibrio },
  { titulo: "Ojo: anatomía y formación de la imagen", componente: EscOjoOptica },
  { titulo: "Fotorrecepción y vía visual", componente: EscVisionVia },
  { titulo: "Repaso y práctica", componente: EscRepaso },
];

export default function OrganosSentidosPage() {
  return (
    <LeccionShell
      unidad="MED-07"
      tituloUnidad="Órganos de los sentidos"
      escenas={ESCENAS}
    />
  );
}

/* FUENTE: Saladin, Capítulo 16: Órganos de los sentidos (Tema_16_Morfo_Saladin_LITERAL_TTS.md)
 *
 * AutoCheck 1 (Escena 1 · Receptores):
 * - "Esta teoría de la interpretación sensitiva recibe el nombre de código de línea marcada."
 * - "Los receptores tónicos se adaptan con mayor lentitud... Los propiorreceptores se encuentran entre los receptores tónicos que se adaptan con mayor lentitud..."
 * - "Los nocirreceptores son receptores tónicos más que fásicos."
 *
 * AutoCheck 2 (Escena 2 · Sentidos generales y dolor):
 * - "Los corpúsculos laminares (de Pacini) son receptores fásicos para la presión profunda, el estiramiento, el prurito y la vibración... la mayor parte de la cápsula consta de capas concéntricas de fibroblastos..."
 * - "Estas interneuronas secretan encefalina para inhibir la neurona de segundo orden... Algunas fibras del bulbo raquídeo también ejercen inhibición presináptica..."
 *
 * AutoCheck 3 (Escena 3 · Gusto):
 * - "El nervio facial (par craneal VII) reúne información sensitiva de los botones gustativos de los dos tercios anteriores de la lengua..."
 * - "Todas las fibras gustativas se proyectan a un sitio en el bulbo raquídeo denominado núcleo solitario."
 * - "Las células gustativas son epiteliales, no neuronas... Una célula gustativa sólo vive siete a diez días."
 * - "Las papilas filiformes... no tienen ningún papel relacionado con el gusto..." / "papilas valadas... contienen hasta la mitad de todos los botones gustativos"
 *
 * AutoCheck 4 (Escena 4 · Olfato):
 * - "A diferencia de las células gustativas, que son epiteliales, las olfativas son neuronas."
 * - "Es notable que las señales olfativas puedan alcanzar la corteza cerebral de manera directa, sin pasar primero por el tálamo; esto no sucede con ningún otro sentido."
 *
 * AutoCheck 5 (Escena 5 · Oído y audición):
 * - "Todo lo que se escucha proviene de las IHC, que proporcionan noventa a noventa y cinco por ciento de las fibras sensitivas del nervio coclear."
 * - "En su extremo proximal (la base del caracol), la membrana está fija, es estrecha y permanece inmóvil... En su extremo distal (el ápice del caracol), está suelta y es cinco veces más ancha y flexible."
 * - "...por tanto, la ruta auditiva, a diferencia de la mayor parte de las rutas sensitivas, no implica a tres sino a cuatro tipos de neurona desde el receptor hasta la corteza cerebral."
 *
 * AutoCheck 6 (Escena 6 · Equilibrio):
 * - "La mácula sacular se encuentra en posición casi vertical en la pared del sáculo y la mácula utricular se ubica en posición casi horizontal en el piso del utrículo... los conductos semicirculares sólo detectan la aceleración angular."
 * - "Los núcleos de los nervios motor ocular común, patético y motor ocular externo (pares craneales III, IV y VI). Estos nervios producen movimientos oculares que compensan los de la cabeza (el reflejo vestibuloocular)."
 *
 * AutoCheck 7 (Escena 7 · Ojo y óptica):
 * - "Cuando se observa algo de cerca, se contrae el músculo ciliar que rodea al cristalino. Esto estrecha el diámetro del cuerpo ciliar, relaja la fibra del ligamento suspensorio y permite que el cristalino se relaje de manera más convexa."
 * - "Por tanto, la córnea refracta la luz más que el cristalino."
 * - "El músculo oblicuo superior está inervado por el nervio patético (par craneal IV), el recto lateral por el motor ocular externo (VI)..."
 *
 * AutoCheck 8 (Escena 8 · Fotorrecepción y vía visual):
 * - "Las células ganglionares son las únicas células retinianas que producen potenciales de acción; todas las demás, sólo producen potenciales locales graduados."
 * - "...en la fóvea, cada cono tiene una línea privada con el encéfalo..." / "Hasta seiscientos bastones convergen en cada célula bipolar..."
 * - "Dentro del quiasma, la mitad de las fibras de cada nervio óptico se cruzan al lado opuesto del encéfalo... Esto se denomina hemidecusación..."
 *
 * AutoCheck 9 (Escena 9 · Repaso 1):
 * - "...en la espalda... un área de piel de hasta siete cm de diámetro... puntas de los dedos... un mm de diámetro o menos... Dos puntos de contacto a sólo dos mm de distancia se perciben como toques separados."
 * - "Discos táctiles (de Merkel). Son receptores tónicos..." / "Los corpúsculos bulbosos (de Ruffini) son receptores tónicos..."
 * - "Las fibras de dolor mielínicas conducen los impulsos a una velocidad de doce a treinta m/s (dolor rápido)... Las fibras de dolor amielínicas conducen a una velocidad de 0,5 a 2,0 m/s (dolor lento)."
 *
 * AutoCheck 10 (Escena 9 · Repaso 2):
 * - "...el nervio glosofaríngeo (IX) del tercio posterior..." / "Las papilas valadas son papilas grandes, organizadas en V en la parte posterior de la lengua."
 * - "Umami. Es un gusto a carne producido por aminoácidos como los ácidos aspártico y glutámico..." / "Los azúcares, los alcaloides y el glutamato estimulan a las células gustativas... activan proteínas G y sistemas de segundo mensajero..."
 *
 * AutoCheck 11 (Escena 9 · Repaso 3):
 * - "...la membrana otolítica gelatinosa que está llena con gránulos de carbonato de calcio y proteínas llamados otolitos, los cuales se suman al peso y a la inercia de la membrana..."
 * - "A diferencia de esas cámaras [escala vestibular y timpánica con perilinfa], está llena con endolinfa [conducto del caracol]... la endolinfa tiene potencial eléctrico de casi +80 mV..."
 *
 * AutoCheck 12 (Escena 9 · Repaso 4):
 * - "El glaucoma es un estado de presión alta dentro del ojo que ocurre al obstruirse el seno venoso escleral..."
 * - "El daltonismo es un rasgo recesivo vinculado con el género. Se presenta en casi ocho por ciento de los hombres y 0,5 por ciento de las mujeres."
 * - "Como resultado, el hemisferio cerebral derecho ve objetos del campo visual izquierdo..."
 */
