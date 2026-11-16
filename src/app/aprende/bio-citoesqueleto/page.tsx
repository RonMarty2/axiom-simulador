"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo,
  Parrafo,
  Definicion,
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

export default function Page() {
  return (
    <LeccionShell
      unidad="BCM-05"
      tituloUnidad="El citoesqueleto"
      escenas={[
        { titulo: "Qué es el citoesqueleto y sus tres polímeros", componente: EscVisionGeneral },
        { titulo: "Microtúbulos, MTOC y centríolos", componente: EscMicrotubulos },
        { titulo: "Proteínas motoras, tau y fármacos", componente: EscMotoresYFarmacosMT },
        { titulo: "Cilios, flagelos y ciliopatías", componente: EscCiliosYFlagelos },
        { titulo: "Microfilamentos, miosinas y contracción", componente: EscMicrofilamentosYMusculo },
        { titulo: "Filamentos intermedios y diagnóstico", componente: EscFilamentosIntermedios },
        { titulo: "Lo que más se pregunta y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscVisionGeneral() {
  return (
    <EscenaRica>
      <Titulo>El citoesqueleto: estructura viva de la célula eucariota</Titulo>

      <Hook>
        Imagina una neurona cuyo axón mide centímetros o un neutrófilo que cambia
        de forma para atravesar un vaso sanguíneo. Sin un armazón interno capaz
        de armarse y desarmarse en segundos, los orgánulos flotarían sin orden
        y la célula ni siquiera podría dividirse.
      </Hook>

      <Definicion termino="Definición y funciones del citoesqueleto">
        El citoesqueleto es una red de polímeros proteicos exclusiva de las{" "}
        <strong>células eucariotas</strong> (no se encuentra en organismos
        procariotas) que presenta un alto dinamismo de formación y destrucción
        constante. Cumple funciones esenciales:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>Proporciona soporte estructural y mantiene la forma celular.</li>
          <li>Posiciona los orgánulos en el citoplasma.</li>
          <li>Participa en el transporte de vesículas.</li>
          <li>Hace posible el movimiento celular y la división celular.</li>
        </ul>
      </Definicion>

      <Parrafo>
        El citoesqueleto está formado por tres tipos principales de polímeros,
        cada uno con un diámetro, una proteína constituyente y una función
        específica. Obsérvalos comparados a escala aproximada en la pizarra:
      </Parrafo>

      <Pizarra alto={175}>
        <svg width="100%" height="100%" viewBox="0 0 360 175" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Los tres polímeros del citoesqueleto
          </text>

          {/* Columna 1: Microfilamento (7 nm) */}
          <circle cx={58} cy={66} r={9} fill={LIENZO.accent} opacity={0.18} stroke={LIENZO.accent} strokeWidth={1.6} />
          <circle cx={54.5} cy={66} r={2.6} fill={LIENZO.accent} />
          <circle cx={61.5} cy={66} r={2.6} fill={LIENZO.accent} />
          <text x={58} y={116} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Microfilamentos
          </text>
          <text x={58} y={135} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            7 nm · Actina
          </text>
          <text x={58} y={154} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Polar · ATP
          </text>

          {/* Columna 2: Filamento intermedio (8-12 nm) */}
          <circle cx={180} cy={66} r={13} fill={LIENZO.warn} opacity={0.18} stroke={LIENZO.warn} strokeWidth={1.6} />
          <circle cx={175} cy={61} r={2} fill={LIENZO.warn} />
          <circle cx={185} cy={61} r={2} fill={LIENZO.warn} />
          <circle cx={172} cy={67} r={2} fill={LIENZO.warn} />
          <circle cx={180} cy={66} r={2} fill={LIENZO.warn} />
          <circle cx={188} cy={67} r={2} fill={LIENZO.warn} />
          <circle cx={175} cy={72} r={2} fill={LIENZO.warn} />
          <circle cx={185} cy={72} r={2} fill={LIENZO.warn} />
          <text x={180} y={116} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Fil. intermedio
          </text>
          <text x={180} y={135} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            8–12 nm · &gt;50
          </text>
          <text x={180} y={154} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Apolar · Sin ATP/GTP
          </text>

          {/* Columna 3: Microtúbulo (25 nm exterior, ~14 nm interior) */}
          <circle cx={302} cy={66} r={27} fill={LIENZO.ok} opacity={0.12} stroke={LIENZO.ok} strokeWidth={1.6} />
          <circle cx={302} cy={66} r={15} fill={LIENZO.bg} stroke={LIENZO.ok} strokeWidth={1.2} />
          {Array.from({ length: 13 }).map((_, idx) => {
            const ang = (idx * 2 * Math.PI) / 13;
            const px = 302 + 21 * Math.cos(ang);
            const py = 66 + 21 * Math.sin(ang);
            return <circle key={idx} cx={px} cy={py} r={2.2} fill={LIENZO.ok} />;
          })}
          <text x={302} y={116} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Microtúbulo
          </text>
          <text x={302} y={135} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            25 nm · Tubulina
          </text>
          <text x={302} y={154} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Polar · GTP
          </text>
        </svg>
      </Pizarra>

      <Parrafo>
        Solo los <strong>microtúbulos</strong> son cilindros huecos (~14 nm de
        diámetro interior y 13 protofilamentos de tubulina α/β); los filamentos
        intermedios reúnen más de 50 proteínas fibrosas distintas según el
        tejido.
      </Parrafo>

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
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: `2px solid ${LIENZO.fgFaint}` }}>Polímero</th>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: `2px solid ${LIENZO.fgFaint}` }}>Diámetro</th>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: `2px solid ${LIENZO.fgFaint}` }}>Proteína y ensamblaje</th>
              <th style={{ padding: "8px 10px", textAlign: "left", borderBottom: `2px solid ${LIENZO.fgFaint}` }}>Función principal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}`, fontWeight: 700, color: LIENZO.accent }}>
                Microfilamentos
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                7 nm
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                Monómeros de actina (actina G → actina F en doble hélice); polarizado; usa ATP.
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                Contracción muscular, forma celular y red bajo la membrana, migración, anillo contráctil en la división del citoplasma, sostén de proyecciones de la membrana y transporte de vesículas.
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}`, fontWeight: 700, color: LIENZO.warn }}>
                Filamentos intermedios
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                8–12 nm
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                Proteínas fibrosas específicas de cada tejido (6 clases, &gt;50 proteínas); 8 protofilamentos; apolar; sin ATP ni GTP.
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                Resistencia a tensiones mecánicas, fijación del núcleo y anclaje a uniones celulares con otras células o con la matriz; sin función motora.
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}`, fontWeight: 700, color: LIENZO.ok }}>
                Microtúbulos
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                25 nm ext. (~14 nm int.)
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                Heterodímeros de α- y β-tubulina en 13 protofilamentos (cilindro hueco); polarizado; usa GTP.
              </td>
              <td style={{ padding: "8px 10px", borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                Forma celular, transporte vesicular (rieles para motores de transporte), reparto de cromosomas en la división, centríolos y armazón interno de cilios y flagelos.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Mnemotecnia>
        Orden de grosor creciente: <strong>7 · 10 · 25</strong>. Microfilamentos{" "}
        <strong>7 nm</strong> (los más finos), filamentos intermedios{" "}
        <strong>8–12 nm</strong> (justo en el medio) y microtúbulos{" "}
        <strong>25 nm</strong> (los más gruesos y huecos).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscMicrotubulos() {
  return (
    <EscenaRica>
      <Titulo>Microtúbulos: polaridad, inestabilidad dinámica y centríolos</Titulo>

      <Parrafo>
        Ahora que conoces la tabla general, entra en el polímero de mayor
        diámetro (25 nm) para comprender cómo logra cambiar de longitud en
        segundos y organizar la división celular.
      </Parrafo>

      <Definicion termino="Arquitectura de los microtúbulos">
        Son largas estructuras cilíndricas huecas de <strong>25 nm</strong> de
        diámetro exterior y unos <strong>14 nm</strong> de diámetro interior. Su
        pared consta de <strong>13 protofilamentos</strong> formados por la
        adición longitudinal y reversible de heterodímeros de{" "}
        <strong>α- y β-tubulina</strong>.
      </Definicion>

      <Parrafo>
        Para polimerizarse <em>in vitro</em> se necesita α- y β-tubulina libre en
        concentración suficiente, <strong>GTP</strong>, <strong>Mg²⁺</strong> y
        temperatura fisiológica. La curva de tubulogénesis pasa por tres etapas:
        una <strong>nucleación</strong> lenta (oligómeros iniciales), una{" "}
        <strong>elongación</strong> rápida y una fase de <strong>equilibrio o meseta</strong>{" "}
        cuando la tubulina libre se vuelve limitante.
      </Parrafo>

      <Definicion termino="Polaridad e hidrólisis de GTP">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Polaridad:</strong> en el extremo <strong>(–)</strong> queda
            la <strong>α-tubulina</strong> y en el extremo <strong>(+)</strong>{" "}
            queda la <strong>β-tubulina</strong>. La{" "}
            <strong>concentración crítica</strong> (umbral mínimo de tubulina
            libre necesario para que el polímero crezca) es menor en (+), por lo
            que este extremo crece con más facilidad.
          </li>
          <li>
            <strong>Hidrólisis asimétrica:</strong> tanto α como β se incorporan
            unidas a GTP, pero <strong>solo la β-tubulina hidroliza su GTP a GDP + Pi</strong>{" "}
            poco después de unirse (el GTP de la α-tubulina no se hidroliza). La
            β-tubulina-GTP es estable; la β-tubulina-GDP es inestable y tiende a
            desprenderse.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Inestabilidad dinámica y treadmilling">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Inestabilidad dinámica:</strong> un mismo extremo (+) alterna
            crecimiento rápido y acortamiento súbito. Cuando hay abundante
            GTP-tubulina se forma un <strong>casquete de GTP-tubulina</strong>{" "}
            protector en (+); si disminuye la entrada de GTP-tubulina y la
            hidrólisis lo alcanza, se pierde el casquete y sobreviene una
            despolimerización brusca (<strong>catástrofe</strong>). La vuelta al
            crecimiento se llama <strong>rescate</strong>.
          </li>
          <li>
            <strong>Intercambio rotatorio (treadmilling):</strong> en
            concentraciones intermedias de tubulina libre, el microtúbulo añade
            dímeros por (+) y los pierde por (–).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={205}>
        <svg width="100%" height="100%" viewBox="0 0 360 205" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Polaridad e inestabilidad dinámica
          </text>

          {/* Fila superior: crecimiento con casquete GTP */}
          <rect x={10} y={56} width={60} height={36} rx={8} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={40} y={79} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>MTOC</text>

          <rect x={76} y={60} width={118} height={28} rx={3} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} strokeWidth={1.2} />
          <rect x={194} y={60} width={72} height={28} rx={3} fill={LIENZO.ok} opacity={0.25} stroke={LIENZO.ok} strokeWidth={1.6} />

          <text x={92} y={51} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>(–) α</text>
          <text x={135} y={79} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Cuerpo β-GDP</text>
          <text x={230} y={51} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>(+) β-GTP</text>
          <text x={230} y={79} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>Casquete</text>

          <line x1={274} y1={74} x2={346} y2={74} stroke={LIENZO.ok} strokeWidth={1.8} markerEnd="url(#arrMtOk)" />
          <text x={310} y={63} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>Crece</text>

          {/* Fila inferior: pérdida de casquete y catástrofe */}
          <rect x={76} y={136} width={154} height={28} rx={3} fill={LIENZO.bad} opacity={0.12} stroke={LIENZO.bad} strokeWidth={1.3} />
          <path d="M 230 136 Q 252 130 264 118" fill="none" stroke={LIENZO.bad} strokeWidth={1.8} />
          <path d="M 230 164 Q 252 170 264 182" fill="none" stroke={LIENZO.bad} strokeWidth={1.8} />

          <text x={153} y={155} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Sin casquete GTP</text>
          <text x={308} y={155} textAnchor="middle" fill={LIENZO.bad} fontSize={13.5} fontWeight={700}>Catástrofe</text>

          <defs>
            <marker id="arrMtOk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Parrafo>
        El extremo (–) queda anclado en el <strong>MTOC</strong> (con
        γ-tubulina) y el extremo (+) apunta hacia la periferia celular: si
        conserva su casquete de β-GTP crece o experimenta <strong>rescate</strong>;
        si lo pierde, la GDP-tubulina se desprende bruscamente (<strong>catástrofe</strong>).
      </Parrafo>

      <Definicion termino="MTOC, centrosoma, centríolos y huso mitótico">
        Dentro de la célula, la nucleación ocurre en los{" "}
        <strong>centros organizadores de microtúbulos (MTOC)</strong>, como los
        centríolos y los cuerpos basales. El <strong>material pericentriolar</strong>{" "}
        contiene <strong>γ-tubulina</strong>, indispensable para iniciar el
        ensamblaje desde el extremo (–):
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Centríolo (9₃ + 0):</strong> barril hueco de <strong>9 tripletes</strong>{" "}
            periféricos sin microtúbulos centrales. En cada triplete, el
            microtúbulo <strong>A</strong> es completo (13 protofilamentos),
            mientras <strong>B y C</strong> son incompletos (10 protofilamentos).
            Una proteína llamada <strong>nexina</strong> une el microtúbulo A de
            cada triplete al C del triplete vecino.
          </li>
          <li>
            <strong>Diplosoma y centrosoma:</strong> en interfase hay un par de
            centríolos perpendiculares entre sí. Se duplican en la{" "}
            <strong>fase S</strong> y en mitosis forman las{" "}
            <strong>astrosferas</strong> en los polos.
          </li>
          <li>
            <strong>Tres tipos de microtúbulos del huso mitótico:</strong>{" "}
            <strong>cinetocóricos</strong> (se unen por su extremo + al{" "}
            <strong>cinetocoro</strong>, estructura proteica de anclaje en el
            cromosoma), <strong>polares</strong> (contactan antiparalelos desde
            polos opuestos) y <strong>astrales</strong> (van hacia la periferia
            celular).
          </li>
          <li>
            <strong>Anafase A vs. anafase B:</strong> en la <strong>anafase A</strong>{" "}
            se acortan los microtúbulos cinetocóricos en el extremo (+) y las{" "}
            <strong>cromátidas</strong> (copias hermanas del cromosoma) migran a
            los polos; en la <strong>anafase B</strong> se separan los polos
            entre sí por deslizamiento de microtúbulos polares antiparalelos y
            tracción de los astrales hacia el <strong>córtex</strong> (red de
            filamentos situada bajo la membrana plasmática).
          </li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscMotoresYFarmacosMT() {
  return (
    <EscenaRica>
      <Titulo>Proteínas motoras (MAP) y fármacos antimicrotúbulos</Titulo>

      <Parrafo>
        En estructuras perdurables como los axones neuronales, ciertas proteínas
        estabilizan los microtúbulos para convertirlos en verdaderas autopistas
        de sentido definido. Otras sustancias naturales y fármacos bloquean esa
        dinámica con consecuencias médicas clave.
      </Parrafo>

      <Definicion termino="Proteínas asociadas a los microtúbulos (MAP)">
        Se dividen en dos grandes grupos:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>MAP motoras — Quinesinas:</strong> descubiertas en el axón
            gigante del calamar; tienen forma de horquilla con tallo y dos
            «pies». Consumen <strong>ATP</strong> para caminar{" "}
            <strong>desde el extremo (–) hacia el extremo (+)</strong> (en
            neuronas: del soma hacia la terminal nerviosa).
          </li>
          <li>
            <strong>MAP motoras — Dineínas:</strong> complejos multiproteicos que
            usan <strong>ATP</strong> para caminar en sentido inverso,{" "}
            <strong>desde el extremo (+) hacia el extremo (–)</strong> (hacia el
            centro celular/soma).
          </li>
          <li>
            <strong>MAP no motoras — Proteína tau (τ):</strong> proteína de bajo
            peso molecular que estabiliza y agrupa en haces paralelos los
            microtúbulos de los axones. Su <strong>hiperfosforilación anormal</strong>{" "}
            produce agregados (placas neuríticas u{" "}
            <strong>ovillos de degeneración neurofibrilar</strong>) que bloquean
            el transporte vesicular y causan apoptosis neuronal en las{" "}
            <strong>taupatías</strong>, como la enfermedad de{" "}
            <strong>Alzheimer</strong> (especialmente en hipocampo y lóbulo
            temporal), la parálisis supranuclear progresiva y la demencia
            frontotemporal.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={185}>
        <svg width="100%" height="100%" viewBox="0 0 360 185" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Sentido de las MAP motoras
          </text>

          {/* Riel central */}
          <rect x={54} y={82} width={252} height={24} rx={4} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <text x={180} y={99} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Microtúbulo (α/β)
          </text>

          {/* Polos */}
          <text x={28} y={99} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>(–)</text>
          <text x={332} y={99} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>(+)</text>

          {/* Quinesina arriba */}
          <circle cx={104} cy={46} r={11} fill={LIENZO.ok} opacity={0.22} stroke={LIENZO.ok} strokeWidth={1.4} />
          <line x1={104} y1={57} x2={104} y2={70} stroke={LIENZO.ok} strokeWidth={1.8} />
          <line x1={104} y1={70} x2={97} y2={82} stroke={LIENZO.ok} strokeWidth={1.8} />
          <line x1={104} y1={70} x2={111} y2={82} stroke={LIENZO.ok} strokeWidth={1.8} />
          <line x1={126} y1={62} x2={276} y2={62} stroke={LIENZO.ok} strokeWidth={1.8} markerEnd="url(#arrQui)" />
          <text x={204} y={52} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Quinesina: (–) → (+)
          </text>

          {/* Dineína abajo */}
          <circle cx={256} cy={146} r={11} fill={LIENZO.accent} opacity={0.22} stroke={LIENZO.accent} strokeWidth={1.4} />
          <line x1={256} y1={135} x2={256} y2={120} stroke={LIENZO.accent} strokeWidth={1.8} />
          <line x1={256} y1={120} x2={249} y2={106} stroke={LIENZO.accent} strokeWidth={1.8} />
          <line x1={256} y1={120} x2={263} y2={106} stroke={LIENZO.accent} strokeWidth={1.8} />
          <line x1={234} y1={130} x2={84} y2={130} stroke={LIENZO.accent} strokeWidth={1.8} markerEnd="url(#arrDin)" />
          <text x={156} y={152} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Dineína: (+) → (–)
          </text>

          <defs>
            <marker id="arrQui" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
            <marker id="arrDin" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Parrafo>
        Ambos motores impulsan sus vesículas mediante{" "}
        <strong>hidrólisis de ATP</strong>: el extremo (–) se sitúa en el{" "}
        <strong>MTOC o soma neuronal</strong> y el extremo (+) apunta hacia la{" "}
        <strong>periferia</strong> celular o terminal axónica.
      </Parrafo>

      <Definicion termino="Fármacos que alteran los microtúbulos">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Taxol y taxanos (paclitaxel, docetaxel):</strong> extraído
            del tejo (<em>Taxus baccata</em>). Estabiliza en exceso los
            microtúbulos e <strong>inhibe su despolimerización</strong>; al
            volverlos rígidos impide el dinamismo mitótico y lleva a apoptosis.
            Se emplea en cáncer (mama, ovario, pulmón, sarcomas). Puede causar{" "}
            <strong>neurotoxicidad</strong> por alterar el transporte vesicular
            neuronal.
          </li>
          <li>
            <strong>Colchicina:</strong> extraída de <em>Colchicum autumnale</em>.
            Se une a la tubulina libre en el citoplasma e{" "}
            <strong>impide su polimerización</strong>, deteniendo la mitosis en{" "}
            <strong>metafase</strong> (máxima compactación cromosómica). Por eso
            se usa para obtener <strong>cariotipos</strong> en citogenética. En
            clínica se usa frente a algunos tumores cutáneos, en la{" "}
            <strong>gota</strong> y en la enfermedad de <strong>Behçet</strong>{" "}
            porque frena la migración de leucocitos al foco inflamatorio.
          </li>
          <li>
            <strong>Alcaloides de la Vinca (vincristina, vinblastina):</strong>{" "}
            acción similar a la colchicina: tienen afinidad por los sitios de
            unión del <strong>GTP</strong> en la tubulina e impiden el dinamismo
            normal. Usados en neoplasias hematológicas y tumores sólidos; también
            producen <strong>neurotoxicidad</strong>.
          </li>
        </ul>
      </Definicion>

      <Cuidado>
        No confundas el mecanismo: la <strong>colchicina</strong> y la{" "}
        <strong>vincristina/vinblastina</strong> impiden la{" "}
        <strong>polimerización</strong> (atrapan tubulina libre o su sitio de
        GTP); el <strong>taxol</strong> inhibe la{" "}
        <strong>despolimerización</strong> (congela los microtúbulos ya armados).
        Ambos frenan la mitosis porque el huso necesita armarse y desarmarse.
      </Cuidado>
    </EscenaRica>
  );
}

function EscCiliosYFlagelos() {
  return (
    <EscenaRica>
      <Titulo>Cilios móviles, cilios primarios, flagelos y ciliopatías</Titulo>

      <Parrafo>
        Además de funcionar como rieles intracelulares, los microtúbulos se
        agrupan en dobletes altamente estables para formar proyecciones de la
        superficie celular: cilios y flagelos.
      </Parrafo>

      <Definicion termino="Partes de un cilio móvil (~0,25 μm de ancho × ~5 μm de largo)">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Tallo (axonema 9₂ + 2):</strong> rodeado de membrana
            plasmática, contiene <strong>9 dobletes periféricos</strong> (A
            completo de 13 protofilamentos + B incompleto) y{" "}
            <strong>2 singletes centrales</strong> completos (13 protofilamentos
            cada uno, no unidos entre sí). Los dobletes vecinos se unen por{" "}
            <strong>nexina</strong>; hacia el centro salen{" "}
            <strong>espinas o brazos radiales</strong>; de cada microtúbulo A
            salen <strong>dos brazos de dineína</strong> (externo e interno) hacia
            el B del doblete vecino en sentido horario. Su actividad ATPasa genera
            el batido ciliar.
          </li>
          <li>
            <strong>Cuerpo basal (9₃ + 0):</strong> en la base, idéntico al
            centríolo que organizó el axonema. Durante la{" "}
            <strong>ciliogénesis</strong> los centríolos se multiplican y se
            sitúan perpendiculares a la membrana apical: los microtúbulos{" "}
            <strong>A y B</strong> crecen para formar el axonema, mientras el{" "}
            <strong>C no crece</strong>.
          </li>
          <li>
            <strong>Raíces ciliares:</strong> fibras estriadas de sujeción en el
            citoplasma que contienen <strong>actina</strong> (no microtúbulos).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={182}>
        <svg width="100%" height="100%" viewBox="0 0 360 182" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Axonema (9₂ + 2) vs. Cuerpo basal (9₃ + 0)
          </text>

          {/* Izquierda: Axonema 9_2 + 2 */}
          <circle cx={92} cy={92} r={50} fill="none" stroke={LIENZO.fgDim} strokeWidth={1.3} strokeDasharray="3 2" />
          <circle cx={85} cy={92} r={4.5} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.3} />
          <circle cx={99} cy={92} r={4.5} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={1.3} />
          {Array.from({ length: 9 }).map((_, k) => {
            const ang = (k * 2 * Math.PI) / 9 - Math.PI / 2;
            const r = 35;
            const ax = 92 + r * Math.cos(ang);
            const ay = 92 + r * Math.sin(ang);
            const tx = -Math.sin(ang);
            const ty = Math.cos(ang);
            const bx = ax + 7.5 * tx;
            const by = ay + 7.5 * ty;
            const sx = 92 + 16 * Math.cos(ang);
            const sy = 92 + 16 * Math.sin(ang);
            const dx1 = ax + 5 * Math.cos(ang - 0.55);
            const dy1 = ay + 5 * Math.sin(ang - 0.55);
            return (
              <g key={k}>
                <line x1={ax} y1={ay} x2={sx} y2={sy} stroke={LIENZO.fgFaint} strokeWidth={1} />
                <line x1={ax} y1={ay} x2={dx1} y2={dy1} stroke={LIENZO.bad} strokeWidth={1.5} />
                <circle cx={ax} cy={ay} r={4.2} fill={LIENZO.accent} opacity={0.35} stroke={LIENZO.accent} strokeWidth={1.2} />
                <circle cx={bx} cy={by} r={3.6} fill="none" stroke={LIENZO.accent} strokeWidth={1.2} />
              </g>
            );
          })}
          <text x={92} y={166} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Axonema 9₂ + 2
          </text>

          {/* Derecha: Cuerpo basal / Centríolo 9_3 + 0 */}
          {Array.from({ length: 9 }).map((_, k) => {
            const ang = (k * 2 * Math.PI) / 9 - Math.PI / 2;
            const r = 32;
            const ax = 268 + r * Math.cos(ang);
            const ay = 92 + r * Math.sin(ang);
            const angNext = ((k + 1) * 2 * Math.PI) / 9 - Math.PI / 2;
            const nxA = 268 + r * Math.cos(angNext);
            const nyA = 92 + r * Math.sin(angNext);
            const dirX = Math.cos(ang + 0.45);
            const dirY = Math.sin(ang + 0.45);
            const bx = ax + 6.5 * dirX;
            const by = ay + 6.5 * dirY;
            const cx3 = ax + 13 * dirX;
            const cy3 = ay + 13 * dirY;
            return (
              <g key={k}>
                <line x1={cx3} y1={cy3} x2={nxA} y2={nyA} stroke={LIENZO.warn} strokeWidth={1} opacity={0.8} />
                <circle cx={ax} cy={ay} r={3.8} fill={LIENZO.ok} opacity={0.35} stroke={LIENZO.ok} strokeWidth={1.1} />
                <circle cx={bx} cy={by} r={3.3} fill="none" stroke={LIENZO.ok} strokeWidth={1.1} />
                <circle cx={cx3} cy={cy3} r={3.3} fill="none" stroke={LIENZO.ok} strokeWidth={1.1} />
              </g>
            );
          })}
          <text x={268} y={166} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            C. basal 9₃ + 0
          </text>
        </svg>
      </Pizarra>

      <Parrafo>
        El <strong>axonema (9₂ + 2)</strong> reúne 9 dobletes periféricos con
        brazos de dineína más un par central; el <strong>centríolo y el cuerpo
        basal (9₃ + 0)</strong> constan de 9 tripletes A-B-C unidos por nexina,
        con el centro vacío.
      </Parrafo>

      <Parrafo>
        Los cilios móviles baten a unos <strong>30 batidos por segundo</strong> en
        dos fases: un <strong>golpe efectivo</strong> fuerte y rápido (con{" "}
        <strong>gasto de ATP</strong>) y un <strong>golpe de recuperación</strong>{" "}
        más lento hasta la vertical (<strong>sin gasto de energía</strong>). En
        epitelios como tráquea, bronquios y trompas uterinas se coordinan gracias
        a <strong>uniones gap</strong>; el humo del <strong>tabaco</strong>{" "}
        disminuye el batido ciliar y favorece infecciones respiratorias.
      </Parrafo>

      <Definicion termino="Cilios primarios (9₂ + 0) y flagelos">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Cilios primarios (inmóviles):</strong> suelen aparecer como un
            cilio único por célula con axonema <strong>9₂ + 0</strong> (sin par
            central). Actúan como <strong>antenas sensoriales</strong> ricas en
            receptores (policistinas, acoplados a proteínas G, familia hedgehog y
            tirosina quinasa). Excepciones que debes recordar: en el oído interno
            y el epitelio olfatorio hay cilios <strong>9₂ + 2 inmóviles</strong>{" "}
            sin dineína, y en el <strong>nódulo primitivo embrionario</strong>{" "}
            (días 13–19) hay cilios <strong>9₂ + 0 con motilidad giratoria</strong>{" "}
            que generan un flujo hacia la derecha para establecer la{" "}
            <strong>asimetría izquierda-derecha</strong> de corazón, estómago,
            hígado y bazo.
          </li>
          <li>
            <strong>Flagelos (espermatozoides):</strong> tienen un axonema{" "}
            <strong>9₂ + 2</strong> a lo largo de la cola (pieza intermedia con
            mitocondrias, pieza principal y pieza final), reforzado por{" "}
            <strong>fibras densas</strong> en las piezas intermedia y principal.
            La pérdida de motilidad del <strong>50% o más</strong> de los
            espermatozoides se llama <strong>astenospermia</strong> (o
            astenozoospermia).
          </li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Patologías ciliares de examen">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14.5 }}>
          <li>
            <strong>Disquinesia ciliar primaria (PCD):</strong> autosómica
            recesiva; la causa más frecuente son mutaciones en la{" "}
            <strong>dineína</strong> (también ausencia de espinas radiales, par
            central o aplasia ciliar). Provoca bronquitis y sinusitis crónicas,
            otitis e infertilidad. En el <strong>50%</strong> aparece{" "}
            <em>situs inversus</em> (órganos unilaterales invertidos); la tríada
            respiratoria + infertilidad + <em>situs inversus</em> es el{" "}
            <strong>síndrome de Kartagener</strong>.
          </li>
          <li>
            <strong>Riñón poliquístico:</strong> defectos del cilio primario de
            los túbulos renales o mutaciones en las <strong>policistinas</strong>{" "}
            (genes PDK) alteran la señalización al flujo de fluido, causando
            proliferación anormal y quistes hacia insuficiencia renal crónica.
          </li>
          <li>
            <strong>Síndrome de Bardet-Biedl (genes BBS1):</strong> ciliopatía
            sensorial con anosmia, degeneración retiniana, retraso mental,
            riñones poliquísticos, hipertensión e hipercolesterolemia.
          </li>
        </ul>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscMicrofilamentosYMusculo() {
  return (
    <EscenaRica>
      <Titulo>Microfilamentos de actina, reguladores, toxinas y miosinas</Titulo>

      <Parrafo>
        Debajo de la membrana plasmática existe una densa red de filamentos de{" "}
        <strong>7 nm</strong> que forma el <strong>córtex celular</strong> y
        permite que la célula cambie de forma, repte, se divida por
        citocinesis y contraiga el músculo.
      </Parrafo>

      <Definicion termino="Actina G, actina F, polaridad y estado gel/sol">
        Los microfilamentos (filamentos finos) miden <strong>7 nm</strong> de
        diámetro y forman una doble cadena helicoidal de monómeros de{" "}
        <strong>actina G</strong> (globular) polimerizados en{" "}
        <strong>actina F</strong> (filamentosa). Isoformas: <strong>α-actina</strong>{" "}
        (exclusiva de células musculares) y <strong>β y γ-actina</strong> (células
        no musculares). Los monómeros con <strong>ATP</strong> se añaden por el
        extremo <strong>(+) protuberante (barbado)</strong>; tras una lenta
        hidrólisis a ADP + Pi se vuelven menos estables y se desprenden por el
        extremo <strong>(–) puntiagudo</strong>. Tienen intercambio rotatorio
        frecuente, aunque menor inestabilidad dinámica que los microtúbulos.
        Cuando forman redes densas el citoplasma pasa a <strong>estado gel</strong>{" "}
        (más rígido); sin ellas pasa a <strong>estado sol</strong> (más fluido).
      </Definicion>

      <Definicion termino="Proteínas de unión a actina (ABP) y toxinas de examen">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Filamina:</strong> entrecruza microfilamentos en{" "}
            <strong>redes ortogonales</strong> y los ancla a la membrana (sin
            filamina, el citoplasma tiende al estado <strong>sol</strong>).
          </li>
          <li>
            <strong>Gelsolina:</strong> fragmenta microfilamentos en presencia de{" "}
            <strong>Ca²⁺</strong> y tapona extremos (+) (clave en macrófagos y
            amebas para el movimiento ameboide gel-sol).
          </li>
          <li>
            <strong>Timosina y profilina:</strong> la <strong>timosina</strong>{" "}
            secuestra actina G e impide su polimerización espontánea; la{" "}
            <strong>profilina</strong> recambia ADP por ATP en la actina G para
            que vuelva a unirse por (+).
          </li>
          <li>
            <strong>Arp2/3:</strong> nuclea y ramifica microfilamentos en árbol.
          </li>
          <li>
            <strong>Faloidina:</strong> toxina (<em>Amanita phalloides</em>) que
            estabiliza anormalmente la actina e impide su despolimerización.
          </li>
          <li>
            <strong>Citocalasina D:</strong> bloquea la polimerización al unirse
            al extremo (+).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Para profundizar · Otras ABP, reguladores y patógenos">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>ADF/cofilina:</strong> acelera la disociación en (–),
            fragmenta y secuestra ADP-actina G.
          </li>
          <li>
            <strong>Activadores de Arp2/3 y GTPasas:</strong>{" "}
            <strong>WASp</strong> (mutada en el síndrome de Wiskott-Aldrich) y{" "}
            <strong>cortactina</strong> activan a Arp2/3; las GTPasas{" "}
            <strong>Rho</strong> (fibras de estrés), <strong>Rac</strong>{" "}
            (lamelipodios) y <strong>cdc42</strong> (filopodios) dirigen los
            distintos haces.
          </li>
          <li>
            <strong>Fimbrina y villina:</strong> haces paralelos en
            microvellosidades. <strong>α-actinina:</strong> fija haces del
            sarcómero y cuerpos densos. <strong>CapZ:</strong> tapona el extremo
            (+) en el sarcómero. <strong>Espectrina:</strong> sostén bajo la
            membrana del eritrocito.
          </li>
          <li>
            <strong>Otros datos de toxinas y bacterias:</strong> en{" "}
            <em>Amanita phalloides</em>, la faloidina causa gastroenteritis,
            mientras la toxicidad letal del hongo se debe sobre todo a la{" "}
            <strong>α-amanitina</strong> sobre ARN polimerasa II. Bacterias como{" "}
            <em>Listeria monocytogenes</em> (colas de cometa con Arp2/3) y{" "}
            <em>Escherichia coli</em> (pedestales de actina F) manipulan la
            actina del huésped.
          </li>
        </ul>
      </Definicion>

      <Parrafo>
        Además de la contracción muscular, los microfilamentos forman el{" "}
        <strong>córtex celular</strong>, sostienen microvellosidades y
        estereocilios, se anclan a zónulas ocluyentes y adherentes, integran el{" "}
        <strong>anillo contráctil de la citocinesis</strong>, transportan
        vesículas y permiten la migración celular mediante{" "}
        <strong>lamelipodios</strong> (láminas) y <strong>filopodios</strong>{" "}
        (puntas), además del <strong>movimiento ameboide</strong> (seudópodos por
        transiciones gel-sol mediadas por gelsolina).
      </Parrafo>

      <Definicion termino="Miosinas y contracción muscular">
        En humanos hay 40 genes de miosina. Cada molécula tiene cabeza
        N-terminal (con actividad <strong>ATPasa</strong>), cuello y cola
        C-terminal: la <strong>miosina I</strong> (1 cabeza/1 cola) mueve
        vesículas hacia (+) y actúa en microvellosidades; la{" "}
        <strong>miosina V</strong> (2 cabezas/2 colas) transporta vesículas y
        melanosomas (su mutación causa la <strong>enfermedad de Griscelli</strong>);
        y la <strong>miosina II</strong> (2 cabezas) forma los filamentos
        gruesos de <strong>15 nm</strong> de espesor y <strong>1,6 μm</strong> de
        largo (300–400 moléculas en músculo estriado; 15–20 unidades en músculo
        liso).
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Sarcómero en relajación (~2,5 μm)
          </text>

          {/* Discos Z */}
          <line x1={42} y1={38} x2={42} y2={114} stroke={LIENZO.fg} strokeWidth={3} />
          <line x1={318} y1={38} x2={318} y2={114} stroke={LIENZO.fg} strokeWidth={3} />
          <text x={42} y={132} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Disco Z</text>
          <text x={318} y={132} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Disco Z</text>

          {/* Filamentos finos de actina */}
          {[48, 66, 84, 102].map((yPos) => (
            <g key={yPos}>
              <line x1={42} y1={yPos} x2={152} y2={yPos} stroke={LIENZO.ok} strokeWidth={2} />
              <line x1={208} y1={yPos} x2={318} y2={yPos} stroke={LIENZO.ok} strokeWidth={2} />
            </g>
          ))}

          {/* Filamentos gruesos de miosina II */}
          {[57, 75, 93].map((yPos) => (
            <g key={yPos}>
              <line x1={104} y1={yPos} x2={256} y2={yPos} stroke={LIENZO.accent} strokeWidth={4} />
              {[114, 128, 142, 218, 232, 246].map((hx) => (
                <line key={hx} x1={hx} y1={yPos - 4} x2={hx} y2={yPos + 4} stroke={LIENZO.accent} strokeWidth={1.3} />
              ))}
            </g>
          ))}

          {/* Bandas abajo */}
          <line x1={42} y1={146} x2={104} y2={146} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={73} y={162} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>Banda I</text>

          <line x1={152} y1={146} x2={208} y2={146} stroke={LIENZO.warn} strokeWidth={1.5} />
          <text x={180} y={162} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>Zona H</text>

          <line x1={104} y1={174} x2={256} y2={174} stroke={LIENZO.accent} strokeWidth={1.5} />
          <text x={180} y={190} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Banda A
          </text>
        </svg>
      </Pizarra>

      <Parrafo>
        Al contraerse, el sarcómero se acorta unos <strong>0,4 μm</strong> (en
        pasos de miosina de 10 nm): la <strong>banda I</strong> y la{" "}
        <strong>zona H</strong> se estrechan mientras la <strong>banda A</strong>{" "}
        conserva una longitud constante.
      </Parrafo>

      <Definicion termino="Contracción del músculo estriado (paso a paso)">
        <ol style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Señal:</strong> la acetilcolina en la unión neuromuscular
            despolariza el sarcolema y los <strong>túbulos T</strong> (que forman
            tríadas con el retículo sarcoplásmico).
          </li>
          <li>
            <strong>Ca²⁺:</strong> el Ca²⁺ citoplasmático aumenta desde ~10⁻⁴ mM
            hasta &gt;10⁻³ mM.
          </li>
          <li>
            <strong>Proteína reguladora:</strong> el Ca²⁺ se une a la{" "}
            <strong>troponina C (TnC)</strong> y desplaza la{" "}
            <strong>tropomiosina</strong>, dejando libre la actina.
          </li>
          <li>
            <strong>Miosina:</strong> la cabeza de miosina arrastra la actina en
            pasos en bisagra de <strong>10 nm</strong> (en presencia de ATP la
            miosina se separa de la actina; sin ATP queda unida).
          </li>
        </ol>
      </Definicion>

      <Definicion termino="Contracción del músculo liso (paso a paso)">
        <ol style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Organización:</strong> no hay sarcómeros ni troponina; los
            filamentos se anclan en <strong>cuerpos densos</strong> (con
            α-actinina).
          </li>
          <li>
            <strong>Ca²⁺:</strong> al entrar Ca²⁺ al citoplasma, se forma el
            complejo <strong>Ca²⁺-calmodulina</strong>.
          </li>
          <li>
            <strong>Proteína reguladora:</strong> Ca²⁺-calmodulina activa la{" "}
            <strong>quinasa de las cadenas ligeras de miosina (MLCK)</strong>.
          </li>
          <li>
            <strong>Miosina:</strong> la MLCK fosforila la{" "}
            <strong>cadena ligera de miosina (MLC)</strong> y desencadena el
            deslizamiento contráctil.
          </li>
        </ol>
      </Definicion>

      <Cuidado>
        Las <strong>distrofias musculares de Duchenne y Becker</strong> son
        enfermedades recesivas ligadas al cromosoma X por mutaciones en la{" "}
        <strong>distrofina</strong> (proteína que estabiliza el sarcómero
        uniendo actina al sarcoplasma). En Duchenne falta proteína funcional; en
        Becker persiste cierta cantidad funcional y el cuadro es menos grave.
      </Cuidado>
    </EscenaRica>
  );
}

function EscFilamentosIntermedios() {
  return (
    <EscenaRica>
      <Titulo>Filamentos intermedios: estructura apolar, clases y diagnóstico</Titulo>

      <Parrafo>
        A diferencia de microtúbulos y microfilamentos, los filamentos intermedios
        son polímeros fibrosos ultrarresistentes especializados en soportar
        tensiones mecánicas sin gastar energía nucleotídica en su ensamblaje.
      </Parrafo>

      <Definicion termino="Propiedades y ensamblaje de los filamentos intermedios">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Diámetro y monómeros:</strong> miden <strong>8–12 nm</strong>{" "}
            y están formados por proteínas <strong>fibrosas</strong> (40–210 kDa)
            con un dominio central en hélice α de unos <strong>310 aminoácidos</strong>.
          </li>
          <li>
            <strong>Apolares y sin ATP/GTP:</strong> dos dímeros paralelos se
            asocian de forma <strong>antiparalela</strong> y desplazada formando
            un <strong>tetrámero</strong>; los tetrámeros se unen extremo con
            extremo en protofilamentos y <strong>8 protofilamentos</strong>{" "}
            integran el filamento. Al ser apolares, no tienen extremos (+) ni
            (–), no necesitan ATP ni GTP y carecen de función motora.
          </li>
          <li>
            <strong>Regulación y anclaje:</strong> se regulan por{" "}
            <strong>fosforilación</strong> (p. ej., Cdk1-ciclina B fosforila las
            láminas nucleares para desestructurarlas). Fijan el núcleo y, como{" "}
            <strong>tonofilamentos</strong> epiteliales, se anclan a desmosomas
            y hemidesmosomas (mediante <strong>plectina</strong> a integrinas).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={214}>
        <svg width="100%" height="100%" viewBox="0 0 360 214" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13.5} fontWeight={700}>
            Ensamblaje apolar (8–12 nm)
          </text>

          {/* Fila 1: Paso 1 Monómero y Paso 2 Dímero */}
          <line x1={46} y1={72} x2={134} y2={72} stroke={LIENZO.warn} strokeWidth={3} />
          <circle cx={46} cy={72} r={4.5} fill={LIENZO.accent} />
          <text x={46} y={56} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>NH₂</text>
          <text x={128} y={56} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>COOH</text>
          <text x={90} y={104} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            1. Monómero
          </text>

          <text x={178} y={77} textAnchor="middle" fill={LIENZO.fgDim} fontSize={15}>→</text>

          <line x1={224} y1={65} x2={312} y2={65} stroke={LIENZO.warn} strokeWidth={2.6} />
          <line x1={224} y1={79} x2={312} y2={79} stroke={LIENZO.warn} strokeWidth={2.6} />
          <circle cx={224} cy={65} r={4} fill={LIENZO.accent} />
          <circle cx={224} cy={79} r={4} fill={LIENZO.accent} />
          <text x={268} y={104} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            2. Dímero paralelo
          </text>

          {/* Fila 2: Paso 3 Tetrámero y Paso 4 Filamento */}
          <line x1={40} y1={148} x2={126} y2={148} stroke={LIENZO.warn} strokeWidth={2.6} />
          <circle cx={40} cy={148} r={4} fill={LIENZO.accent} />
          <line x1={54} y1={164} x2={140} y2={164} stroke={LIENZO.ok} strokeWidth={2.6} />
          <circle cx={140} cy={164} r={4} fill={LIENZO.accent} />
          <text x={90} y={196} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            3. Tetrámero apolar
          </text>

          <text x={178} y={160} textAnchor="middle" fill={LIENZO.fgDim} fontSize={15}>→</text>

          <rect x={222} y={139} width={92} height={34} rx={7} fill={LIENZO.warn} opacity={0.22} stroke={LIENZO.warn} strokeWidth={1.6} />
          <line x1={226} y1={148} x2={310} y2={148} stroke={LIENZO.warn} strokeWidth={1.4} />
          <line x1={226} y1={156} x2={310} y2={156} stroke={LIENZO.warn} strokeWidth={1.4} />
          <line x1={226} y1={164} x2={310} y2={164} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={268} y={196} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            4. Filamento
          </text>
        </svg>
      </Pizarra>

      <Parrafo>
        Cada monómero presenta una hélice α central de unos{" "}
        <strong>310 aminoácidos</strong>; al ensamblarse los tetrámeros
        antiparalelos en <strong>8 protofilamentos</strong> forman un polímero
        sin polaridad (+)/(–), sin gasto de ATP ni GTP y regulado por
        fosforilación.
      </Parrafo>

      <Definicion termino="Las 6 clases de filamentos intermedios por tipo celular">
        Se han identificado más de 50 proteínas agrupadas en seis clases:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Clases I y II — Citoqueratinas (CK):</strong> más de 20
            miembros (40–70 kDa), <strong>ácidas (I)</strong> y{" "}
            <strong>básicas (II)</strong> que forman heterodímeros I+II en{" "}
            <strong>células epiteliales</strong> (ej.: CK5/14 en la capa basal
            de la piel, CK9 en palmas y plantas, y los marcadores tumorales
            CK7/CK20).
          </li>
          <li>
            <strong>Clase III:</strong> <strong>vimentina</strong> en células
            mesenquimales (fibroblastos, adipocitos, condrocitos, osteocitos);{" "}
            <strong>desmina</strong> en células musculares;{" "}
            <strong>proteína ácida neurofibrilar glial (gliofilamentos)</strong>{" "}
            en astrocitos y células de Schwann.
          </li>
          <li>
            <strong>Clase IV — Neurofilamentos:</strong> en neuronas adultas.
          </li>
          <li>
            <strong>Clase V — Láminas nucleares (A, B y C):</strong> presentes en
            casi todos los tipos celulares (bajo la envoltura nuclear).
          </li>
          <li>
            <strong>Clase VI — Nestina:</strong> en neuronas embrionarias
            (sistema nervioso en desarrollo).
          </li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Uso en cáncer metastásico y enfermedades cutáneas">
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14.5 }}>
          <li>
            <strong>Diagnóstico diferencial de metástasis:</strong> una
            metástasis cerebral <strong>CK7+ / CK20−</strong> sugiere tumor
            primario de <strong>pulmón no microcítico</strong>; una{" "}
            <strong>CK7− / CK20+</strong> sugiere tumor primario de{" "}
            <strong>colon</strong>; la positividad de <strong>vimentina</strong>{" "}
            orienta a <strong>melanoma</strong> o <strong>carcinoma renal</strong>.
          </li>
          <li>
            <strong>Epidermólisis bullosa:</strong> mutaciones en{" "}
            <strong>CK5 o CK14</strong> desestructuran el estrato basal de la
            piel, provocando rotura mecánica y ampollas.
          </li>
          <li>
            <strong>Queratoma epidermolítico palmoplantar:</strong> mutaciones en{" "}
            <strong>CK9</strong> (estrato granuloso) causan callosidades y
            ampollas en palmas y plantas.
          </li>
        </ul>
      </WorkedExample>

      <Definicion termino="Para profundizar · Subtipos de citoqueratinas por epitelio">
        Según el tipo de epitelio cambian las citoqueratinas expresadas: los
        epitelios simples (como el tubo digestivo) expresan{" "}
        <strong>CK 7, 8, 18 y 19</strong>, mientras que la epidermis
        queratinizada expresa <strong>CK 1, 2, 4–6, 9–11 y 16</strong>.
      </Definicion>

      <Conexion>
        Los tonofilamentos de queratina se anclan a desmosomas y hemidesmosomas
        estudiados en el capítulo de especializaciones de la membrana (BCM-06).
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Lo que más se pregunta y autoevaluación</Titulo>

      <Misconception titulo="Error 1 · 'Todos los filamentos del citoesqueleto tienen polaridad (+)/(–) y usan ATP o GTP'">
        <strong>Realidad:</strong> microtúbulos (GTP) y microfilamentos (ATP) sí
        son polarizados, pero los <strong>filamentos intermedios (8–12 nm)</strong>{" "}
        están formados por <strong>tetrámeros antiparalelos</strong>: son{" "}
        <strong>apolares</strong>, no gastan ATP ni GTP para ensamblarse (se
        regulan por fosforilación) y no tienen proteínas motoras.
      </Misconception>

      <Misconception titulo="Error 2 · 'Los cilios móviles son 9₃+0 y los primarios 9₂+2'">
        <strong>Realidad:</strong> no mezcles tallo con cuerpo basal. El{" "}
        <strong>tallo</strong> del cilio móvil y el flagelo tienen axonema{" "}
        <strong>9₂ + 2</strong>; el <strong>cuerpo basal</strong> y el{" "}
        <strong>centríolo</strong> tienen estructura <strong>9₃ + 0</strong>{" "}
        (tripletes); y el <strong>cilio primario</strong> sensorial es
        normalmente <strong>9₂ + 0</strong> (dobletes sin par central).
      </Misconception>

      <Misconception titulo="Error 3 · 'El taxol actúa igual que la colchicina impidiendo la polimerización'">
        <strong>Realidad:</strong> ambos detienen la mitosis porque anulan el
        dinamismo del huso, pero por vías opuestas: la <strong>colchicina</strong>{" "}
        (y vincristina/vinblastina en el sitio GTP) impide la{" "}
        <strong>polimerización</strong>; el <strong>taxol</strong> (y taxanos)
        estabiliza el polímero e inhibe la <strong>despolimerización</strong>.
      </Misconception>

      <Resumen>
        <strong>Lo que más se pregunta en el examen (Calvo, cap. 12):</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            Diámetros: microfilamentos <strong>7 nm</strong> (actina, ATP),
            filamentos intermedios <strong>8–12 nm</strong> (fibrosos, apolares,
            sin ATP/GTP), microtúbulos <strong>25 nm</strong> ext. / ~14 nm int.
            (13 protofilamentos α/β-tubulina, GTP en β hidrolizable).
          </li>
          <li>
            Motores: <strong>quinesina</strong> camina (–) → (+);{" "}
            <strong>dineína</strong> camina (+) → (–); <strong>miosina I</strong>{" "}
            hacia (+). <strong>Tau</strong> estabiliza axones (Alzheimer si se
            hiperfosforila).
          </li>
          <li>
            Estructuras: centríolo y cuerpo basal <strong>9₃ + 0</strong>{" "}
            (triplete A 13 + B y C 10 + nexina); cilio móvil y flagelo{" "}
            <strong>9₂ + 2</strong>; cilio primario <strong>9₂ + 0</strong>.
            Kartagener = PCD + infertilidad + <em>situs inversus</em> (50%).
          </li>
          <li>
            Actina y músculo: <strong>filamina</strong> (redes ortogonales, gel);{" "}
            <strong>faloidina</strong> (estabiliza actina);{" "}
            <strong>citocalasina D</strong> (bloquea extremo +). Estriado:
            Ca²⁺ → TnC → tropomiosina; liso: cuerpos densos + Ca²⁺-calmodulina →
            MLCK. Duchenne/Becker = distrofina (ligada al X).
          </li>
          <li>
            Filamentos intermedios (I–VI): citoqueratinas epiteliales (I–II;
            CK5/14 epidermólisis bullosa, CK9 queratoma palmoplantar), vimentina
            (mesénquima), desmina (músculo), proteína ácida neurofibrilar glial /
            gliofilamentos (glía), neurofilamentos, láminas nucleares (V),
            nestina (VI).
          </li>
        </ul>
      </Resumen>

      <AutoCheck
        pregunta="Considera las siguientes afirmaciones sobre los polímeros del citoesqueleto: 1) Los filamentos intermedios miden 8–12 nm, son apolares y no precisan ATP ni GTP para polimerizarse. 2) Los microtúbulos miden 25 nm de diámetro exterior y en su extremo (–) queda situada la β-tubulina."
        opciones={[
          "Solo 1 y 2 son correctas",
          "Solo 1 es correcta",
          "Solo 2 es correcta",
          "Ninguna es correcta",
        ]}
        correctaIdx={1}
        explicacion="La afirmación 1 es verdadera (Calvo, pp. 493 y 529). La 2 es falsa: en el extremo (–) junto al MTOC queda la α-tubulina, mientras que la β-tubulina queda en el extremo (+) (pp. 494 y 497)."
      />

      <AutoCheck
        pregunta="Sobre la inestabilidad dinámica de los microtúbulos y los fármacos que la alteran, ¿cuál enunciado es correcto?"
        opciones={[
          "En el heterodímero, solo la α-tubulina hidroliza su GTP a GDP poco después de añadirse al extremo (+)",
          "La catástrofe del microtúbulo ocurre cuando crece rápidamente el casquete de GTP-tubulina en el extremo (+)",
          "La colchicina impide la polimerización de la tubulina y detiene la mitosis en metafase, mientras que el taxol inhibe la despolimerización",
          "Los alcaloides de la vinca aumentan la rigidez estabilizando los microtúbulos ya formados igual que el taxol",
        ]}
        correctaIdx={2}
        explicacion="Según Calvo (pp. 495–499), quien hidroliza GTP es la β-tubulina, la catástrofe ocurre al perderse el casquete de GTP-tubulina, los alcaloides de la vinca actúan parecido a la colchicina sobre el sitio GTP, y solo el taxol inhibe la despolimerización mientras la colchicina impide la polimerización."
      />

      <AutoCheck
        pregunta="Respecto a las proteínas asociadas a los microtúbulos (MAP): 1) Las quinesinas usan ATP para mover vesículas desde el extremo (–) hacia el (+). 2) Las dineínas se desplazan en sentido opuesto, de (+) hacia (–). 3) La hiperfosforilación anormal de tau (τ) genera ovillos neurofibrilares en la enfermedad de Alzheimer."
        opciones={[
          "Todas (1, 2 y 3) son correctas",
          "Solo 1 y 2 son correctas",
          "Solo 2 y 3 son correctas",
          "Solo 1 y 3 son correctas",
        ]}
        correctaIdx={0}
        explicacion="Las tres son correctas (Calvo, pp. 499–500): quinesinas caminan (–) → (+) con ATP, dineínas (+) → (–), y tau es una MAP no motora cuya agregación tras hiperfosforilarse interfiere en el transporte neuronal y causa apoptosis."
      />

      <AutoCheck
        pregunta="Analiza las siguientes proposiciones sobre centríolos, cilios y ciliopatías: 1) El cuerpo basal y el centríolo presentan estructura 9₃ + 0, mientras que el tallo de un cilio móvil es 9₂ + 2. 2) En el batido ciliar, el golpe efectivo gasta ATP y el golpe de recuperación ocurre sin gasto energético. 3) La tríada de bronquitis/sinusitis crónica, infertilidad y situs inversus corresponde al síndrome de Kartagener."
        opciones={[
          "Solo 1 es correcta",
          "Solo 1 y 2 son correctas",
          "Solo 2 y 3 son correctas",
          "1, 2 y 3 son correctas",
        ]}
        correctaIdx={3}
        explicacion="Todas son verdaderas según Calvo (pp. 501, 504, 506, 507 y 511). Recuerda también que el cilio primario sensorial típico es 9₂ + 0 y que el 50% de los pacientes con disquinesia ciliar primaria presenta situs inversus."
      />

      <AutoCheck
        pregunta="Considera las siguientes afirmaciones sobre la actina y sus reguladores (al estilo del examen de Medicina): 1) La filamina entrecruza microfilamentos formando redes ortogonales; sin ella el citoplasma tiende al estado sol. 2) La faloidina bloquea la polimerización uniéndose al extremo (+), igual que la citocalasina D."
        opciones={[
          "1 y 2 son correctas",
          "Solo 2 es correcta",
          "Solo 1 es correcta",
          "Ninguna es correcta",
        ]}
        correctaIdx={2}
        explicacion="La afirmación 1 es verdadera (Calvo, p. 516): la filamina forma redes ortogonales y mantiene el estado gel. La 2 es falsa (p. 517): quien bloquea el extremo (+) impidiendo la polimerización es la citocalasina D; la faloidina estabiliza anormalmente los microfilamentos e impide su despolimerización."
      />

      <AutoCheck
        pregunta="En el estudio histopatológico de una metástasis cerebral cuyo tumor primario se desconoce, el resultado es positivo para CK7 (CK7+) y negativo para CK20 (CK20−). ¿A qué clases de filamentos intermedios pertenecen las citoqueratinas y qué tumor primario sugiere ese perfil según Calvo?"
        opciones={[
          "Clases III y IV; tumor primario de colon",
          "Clases I (ácidas) y II (básicas); tumor primario de pulmón no microcítico",
          "Clase III (vimentina); melanoma o carcinoma renal",
          "Clase V (láminas nucleares); carcinoma epidérmico basal",
        ]}
        correctaIdx={1}
        explicacion="Calvo (pp. 529–531) ubica las citoqueratinas epiteliales en las clases I (ácidas) y II (básicas), y señala que una metástasis cerebral CK7+ / CK20− sugiere tumor primario de pulmón no microcítico (mientras CK7− / CK20+ orienta a colon)."
      />
    </EscenaRica>
  );
}
