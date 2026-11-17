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
      unidad="QUI-12"
      tituloUnidad="Química orgánica"
      escenas={[
        { titulo: "Química del carbono y clases de fórmulas", componente: EscCarbono },
        { titulo: "Los hidrocarburos: notación y nomenclatura", componente: EscHidrocarburos },
        { titulo: "Funciones orgánicas oxigenadas", componente: EscOxigenadas },
        { titulo: "Sustancias orgánicas nitrogenadas y la urea", componente: EscNitrogenadas },
        { titulo: "Ejercicios reales resueltos del banco UMSS", componente: EscEjerciciosBanco },
        { titulo: "Lo que más se pregunta y práctica PSA 2027", componente: EscPractica },
      ]}
    />
  );
}

function EscCarbono() {
  return (
    <EscenaRica>
      <Titulo>Química del carbono y clases de fórmulas</Titulo>

      <Parrafo>
        <strong>Temario oficial PSA 2027: libro del Ministerio de Educación, p. 38</strong>{" "}
        (Química · Sexto de secundaria: Química del carbono, Los hidrocarburos,
        Funciones orgánicas oxigenadas y Sustancias orgánicas nitrogenadas).
      </Parrafo>

      <Hook>
        Desde la glucosa que nutre tus neuronas y los lípidos de tus membranas
        celulares hasta la urea que excretan tus riñones y los anestésicos de un
        quirófano, millones de sustancias comparten un mismo esqueleto central:
        cadenas de átomos de carbono. ¿Qué propiedad única tiene el carbono para
        formar más compuestos que todos los demás elementos juntos?
      </Hook>

      <Definicion termino="Composición y diferencia entre compuestos orgánicos e inorgánicos">
        La <strong>química del carbono (química orgánica)</strong> estudia los
        compuestos que contienen carbono con enlaces covalentes carbono-carbono
        y carbono-hidrógeno (con excepción de óxidos simples como CO y CO₂,
        ácido carbónico, carbonatos, bicarbonatos y cianuros metálicos, que se
        estudian como inorgánicos).
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Composición de las sustancias orgánicas:</strong> están
            formadas principalmente por los <strong>elementos organógenos
            primarios</strong> (bioelementos primarios): <strong>C, H, O y N</strong>,
            acompañados con menor frecuencia por <strong>S, P</strong> y
            halógenos (F, Cl, Br, I).
          </li>
          <li>
            <strong>Compuestos orgánicos:</strong> predomina el{" "}
            <strong>enlace covalente</strong>, presentan puntos de fusión y
            ebullición relativamente bajos, la mayoría son insolubles en agua y
            solubles en solventes apolares, son combustibles, sensibles al calor
            (termolábiles), reaccionan lentamente y presentan{" "}
            <strong>isomería</strong> (misma fórmula molecular con distinta
            estructura).
          </li>
          <li>
            <strong>Compuestos inorgánicos:</strong> participan todos los
            elementos de la tabla periódica, predomina el{" "}
            <strong>enlace iónico</strong>, suelen tener altos puntos de fusión,
            muchos son solubles en agua, conducen la corriente eléctrica en
            disolución o fundidos (electrolitos) y no suelen arder.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Propiedades del átomo de carbono (Z = 6) y enlaces sigma (σ) y pi (π)">
        El carbono tiene número atómico <em>Z</em> = 6 y configuración basal{" "}
        <em>1s² 2s² 2p²</em>, con <strong>4 electrones de valencia</strong> en
        su segundo nivel:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Tetravalencia:</strong> el átomo de carbono forma siempre{" "}
            <strong>4 enlaces covalentes</strong> en los compuestos orgánicos
            estables.
          </li>
          <li>
            <strong>Covalencia:</strong> se une compartiendo pares de electrones
            con otros átomos de C, H, O o N.
          </li>
          <li>
            <strong>Autosaturación (concatenación):</strong> capacidad de unirse
            consigo mismo formando cadenas abiertas (lineales o ramificadas) y
            cerradas (ciclos). Según a cuántos carbonos esté unido directamente,
            un carbono se clasifica en <strong>primario</strong> (unido a 1 C,
            como —CH₃), <strong>secundario</strong> (a 2 C, —CH₂—),{" "}
            <strong>terciario</strong> (a 3 C, —CH&lt;) o{" "}
            <strong>cuaternario</strong> (a 4 C, &gt;C&lt;).
          </li>
          <li>
            <strong>Hibridación y enlaces σ y π:</strong> el enlace{" "}
            <strong>sigma (σ)</strong> se forma por solapamiento frontal de
            orbitales (es más fuerte y permite giro libre); el enlace{" "}
            <strong>pi (π)</strong> se forma por solapamiento lateral de
            orbitales <em>p</em> puros (es más débil y restringe el giro):
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li>
                <strong>Hibridación sp³:</strong> cuando el carbono solo forma{" "}
                <strong>4 enlaces simples</strong>. Tiene{" "}
                <strong>4 enlaces σ y 0 enlaces π</strong>, con geometría
                tetraédrica (ángulo de 109,5°). Ejemplo: metano (CH₄) y alcanos.
              </li>
              <li>
                <strong>Hibridación sp²:</strong> cuando el carbono forma{" "}
                <strong>1 enlace doble</strong> y 2 simples. El doble enlace
                consta de <strong>1 σ + 1 π</strong>, por lo que ese carbono
                forma en total <strong>3 enlaces σ y 1 enlace π</strong>, con
                geometría trigonal plana (120°). Ejemplo: eteno (CH₂=CH₂) y
                grupo carbonilo (C=O).
              </li>
              <li>
                <strong>Hibridación sp:</strong> cuando el carbono forma{" "}
                <strong>1 enlace triple</strong> y 1 simple (o 2 dobles). El
                triple enlace consta de <strong>1 σ + 2 π</strong>, por lo que
                ese carbono forma en total{" "}
                <strong>2 enlaces σ y 2 enlaces π</strong>, con geometría lineal
                (180°). Ejemplo: etino (CH≡CH) y nitrilos (—C≡N).
              </li>
            </ul>
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={286}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Hibridación del carbono y enlaces σ y π
          </text>

          {/* sp3 */}
          <rect x={14} y={36} width={332} height={86} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <line x1={38} x2={72} y1={78} y2={78} stroke={LIENZO.ok} strokeWidth={2.2} />
          <text x={28} y={83} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>C</text>
          <text x={82} y={83} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>C</text>
          <text x={55} y={70} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>σ</text>
          <text x={112} y={58} fill={LIENZO.ok} fontSize={14} fontWeight={700}>1. Hibridación sp³ (simple)</text>
          <text x={112} y={79} fill={LIENZO.fg} fontSize={13} fontWeight={600}>4 enlaces σ · 0 enlaces π</text>
          <text x={112} y={100} fill={LIENZO.fgDim} fontSize={13}>Tetraédrica (109,5°) · Ej.: CH₄</text>

          {/* sp2 */}
          <rect x={14} y={132} width={332} height={86} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <line x1={38} x2={72} y1={171} y2={171} stroke={LIENZO.accent} strokeWidth={2.2} />
          <line x1={38} x2={72} y1={179} y2={179} stroke={LIENZO.accent} strokeWidth={2.2} />
          <text x={28} y={180} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>C</text>
          <text x={82} y={180} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>C</text>
          <text x={55} y={164} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>π</text>
          <text x={55} y={196} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>σ</text>
          <text x={112} y={154} fill={LIENZO.accent} fontSize={14} fontWeight={700}>2. Hibridación sp² (doble)</text>
          <text x={112} y={175} fill={LIENZO.fg} fontSize={13} fontWeight={600}>Cada C: 3 σ y 1 π (C=C es 1σ+1π)</text>
          <text x={112} y={196} fill={LIENZO.fgDim} fontSize={13}>Plana trigonal (120°) · Eteno</text>

          {/* sp */}
          <rect x={14} y={228} width={332} height={86} rx={8} fill={LIENZO.warn} opacity={0.11} stroke={LIENZO.warn} strokeWidth={1.6} />
          <line x1={38} x2={72} y1={264} y2={264} stroke={LIENZO.warn} strokeWidth={2.2} />
          <line x1={38} x2={72} y1={271} y2={271} stroke={LIENZO.warn} strokeWidth={2.2} />
          <line x1={38} x2={72} y1={278} y2={278} stroke={LIENZO.warn} strokeWidth={2.2} />
          <text x={28} y={276} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>C</text>
          <text x={82} y={276} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>C</text>
          <text x={55} y={258} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>2π</text>
          <text x={55} y={295} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>1σ</text>
          <text x={112} y={250} fill={LIENZO.warn} fontSize={14} fontWeight={700}>3. Hibridación sp (triple)</text>
          <text x={112} y={271} fill={LIENZO.fg} fontSize={13} fontWeight={600}>Cada C: 2 σ y 2 π (C≡C es 1σ+2π)</text>
          <text x={112} y={292} fill={LIENZO.fgDim} fontSize={13}>Lineal (180°) · Ej.: etino (C₂H₂)</text>
        </svg>
      </Pizarra>

      <Definicion termino="Clases de fórmulas en química orgánica">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Fórmula empírica (o mínima):</strong> indica la proporción
            entera más simple entre los átomos presentes (por ejemplo,{" "}
            <strong>C₂H₅</strong> para el butano o <strong>CH₂O</strong> para la
            glucosa).
          </li>
          <li>
            <strong>Fórmula molecular (o global):</strong> muestra la cantidad
            real de átomos de cada elemento en una molécula:{" "}
            <strong>(fórmula empírica)ₖ</strong>, donde{" "}
            <em>k = M_molecular / M_empírica</em> (ej. <strong>C₄H₁₀</strong>{" "}
            para el butano, con <em>k</em> = 2; <strong>C₆H₁₂O₆</strong> para la
            glucosa, con <em>k</em> = 6).
          </li>
          <li>
            <strong>Fórmula semidesarrollada (o condensada):</strong> es la más
            usada en nomenclatura; muestra los enlaces entre carbonos y agrupa
            los hidrógenos unidos a cada carbono (ej.{" "}
            <strong>CH₃—CH₂—CH₂—CH₃</strong>).
          </li>
          <li>
            <strong>Fórmula desarrollada (o estructural plana):</strong> dibuja
            explícitamente todos los enlaces covalentes entre todos los átomos
            (cada C con sus 4 trazos).
          </li>
          <li>
            <strong>Fórmula topológica (esqueletal o en zig-zag):</strong> cada
            extremo y cada vértice de la línea quebrada representa un átomo de
            carbono junto con los hidrógenos necesarios para completar sus 4
            enlaces.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={273}>
        <svg width="100%" height="100%" viewBox="0 0 360 315" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Las 5 clases de fórmulas (butano)
          </text>

          {/* 1. Empirica */}
          <rect x={14} y={34} width={160} height={66} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          <text x={94} y={54} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>1. Empírica</text>
          <text x={94} y={74} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>C₂H₅</text>
          <text x={94} y={92} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Razón mínima 2:5</text>

          {/* 2. Molecular */}
          <rect x={186} y={34} width={160} height={66} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          <text x={266} y={54} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>2. Molecular</text>
          <text x={266} y={74} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>C₄H₁₀</text>
          <text x={266} y={92} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Átomos reales (k=2)</text>

          {/* 3. Semidesarrollada */}
          <rect x={14} y={110} width={332} height={58} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.5} />
          <text x={180} y={130} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            3. Semidesarrollada (la más usada)
          </text>
          <text x={180} y={154} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₃ — CH₂ — CH₂ — CH₃
          </text>

          {/* 4. Desarrollada y 5. Topologica */}
          <rect x={14} y={178} width={196} height={124} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          <text x={112} y={198} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>4. Desarrollada</text>
          <text x={112} y={222} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>H   H   H   H</text>
          <text x={112} y={238} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>|   |   |   |</text>
          <text x={112} y={255} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>H—C—C—C—C—H</text>
          <text x={112} y={272} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>|   |   |   |</text>
          <text x={112} y={290} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>H   H   H   H</text>

          <rect x={220} y={178} width={126} height={124} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          <text x={283} y={198} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>5. Topológica</text>
          <polyline points="238,262 268,232 298,262 328,232" fill="none" stroke={LIENZO.ok} strokeWidth={2.6} />
          {[
            { cx: 238, cy: 262, lbl: "1", dy: 18 },
            { cx: 268, cy: 232, lbl: "2", dy: -10 },
            { cx: 298, cy: 262, lbl: "3", dy: 18 },
            { cx: 328, cy: 232, lbl: "4", dy: -10 },
          ].map((p) => (
            <g key={p.lbl}>
              <circle cx={p.cx} cy={p.cy} r={4} fill={LIENZO.ok} />
              <text x={p.cx} y={p.cy + p.dy} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>{p.lbl}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Importancia de la química del carbono en la naturaleza">
        El carbono es la base estructural de toda la materia viva: forma los
        carbohidratos (fuente de energía como la glucosa), lípidos (membranas y
        reserva energética), proteínas (enzimas, anticuerpos, colágeno) y ácidos
        nucleicos (ADN y ARN). Además, constituye la base de los combustibles
        fósiles, los principios activos de los medicamentos, antisépticos,
        vitaminas y polímeros sintéticos.
      </Definicion>

      <Mnemotecnia>
        <strong>&quot;Simple = 1σ (sp³). Doble = 1σ + 1π (sp²). Triple = 1σ + 2π (sp).&quot;</strong>{" "}
        Para contar enlaces π en toda una molécula, basta sumar 1 por cada enlace
        doble y 2 por cada enlace triple.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscHidrocarburos() {
  return (
    <EscenaRica>
      <Titulo>Los hidrocarburos: notación y nomenclatura</Titulo>

      <Parrafo>
        Los <strong>hidrocarburos</strong> son compuestos orgánicos binarios
        formados únicamente por <strong>carbono (C) e hidrógeno (H)</strong>. De
        ellos derivan todas las demás funciones orgánicas al reemplazar átomos
        de hidrógeno por grupos funcionales.
      </Parrafo>

      <Definicion termino="Clasificación, fórmulas generales y sufijos IUPAC">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Alcanos (hidrocarburos saturados o parafinas):</strong>{" "}
            presentan únicamente enlaces simples C—C (hibridación <em>sp³</em>).
            Fórmula general acíclica: <strong>CₙH₂ₙ₊₂</strong>. Se nombran con el
            prefijo griego del número de carbonos y el sufijo{" "}
            <strong>-ano</strong> (metano CH₄, etano C₂H₆, propano C₃H₈, butano
            C₄H₁₀).
          </li>
          <li>
            <strong>Alquenos (insaturados u olefinas):</strong> contienen al
            menos un <strong>enlace doble C=C</strong> (hibridación <em>sp²</em>
            ). Con un doble enlace en cadena abierta, su fórmula general es{" "}
            <strong>CₙH₂ₙ</strong> (dos hidrógenos menos que el alcano). Sufijo
            IUPAC: <strong>-eno</strong> (eteno o etileno C₂H₄, propeno C₃H₆,
            1-buteno y 2-buteno C₄H₈, penteno C₅H₁₀).
          </li>
          <li>
            <strong>Alquinos (insaturados o acetilénicos):</strong> contienen al
            menos un <strong>enlace triple C≡C</strong> (hibridación <em>sp</em>
            ). Con un triple enlace en cadena abierta, su fórmula general es{" "}
            <strong>CₙH₂ₙ₋₂</strong>. Sufijo IUPAC: <strong>-ino</strong> (etino
            o acetileno C₂H₂, propino C₃H₄, 1-butino y 2-butino C₄H₆).
          </li>
          <li>
            <strong>Hidrocarburos cíclicos:</strong> de cadena cerrada, como los{" "}
            <strong>cicloalcanos</strong> (fórmula CₙH₂ₙ, prefijo{" "}
            <em>ciclo-</em>: ciclopropano, ciclopentano, ciclohexano) y los
            aromáticos encabezados por el <strong>benceno (C₆H₆)</strong>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={273}>
        <svg width="100%" height="100%" viewBox="0 0 360 315" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Alcano, alqueno y alquino (serie n = 3)
          </text>

          {/* Alcano */}
          <rect x={14} y={36} width={332} height={82} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={180} y={56} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            Alcano (saturado) · CₙH₂ₙ₊₂ · Sufijo -ano
          </text>
          <text x={180} y={81} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₃ — CH₂ — CH₃
          </text>
          <text x={180} y={104} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Propano (C₃H₈) · Solo enlaces simples (σ)
          </text>

          {/* Alqueno */}
          <rect x={14} y={128} width={332} height={82} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={180} y={148} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            Alqueno (insaturado) · CₙH₂ₙ · Sufijo -eno
          </text>
          <text x={180} y={173} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₂ = CH — CH₃
          </text>
          <text x={180} y={196} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Propeno (C₃H₆) · Un enlace doble (1σ + 1π)
          </text>

          {/* Alquino */}
          <rect x={14} y={220} width={332} height={82} rx={8} fill={LIENZO.warn} opacity={0.11} stroke={LIENZO.warn} strokeWidth={1.6} />
          <text x={180} y={240} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>
            Alquino (insaturado) · CₙH₂ₙ₋₂ · Sufijo -ino
          </text>
          <text x={180} y={265} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH ≡ C — CH₃
          </text>
          <text x={180} y={288} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Propino (C₃H₄) · Un enlace triple (1σ + 2π)
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Prefijos de cadena, radicales alquilo y reglas IUPAC">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Prefijos según cantidad de carbonos:</strong>{" "}
            <strong>1 met-</strong>, <strong>2 et-</strong>,{" "}
            <strong>3 prop-</strong>, <strong>4 but-</strong>,{" "}
            <strong>5 pent-</strong>, <strong>6 hex-</strong>,{" "}
            <strong>7 hept-</strong>, <strong>8 oct-</strong>,{" "}
            <strong>9 non-</strong>, <strong>10 dec-</strong>.
          </li>
          <li>
            <strong>Radicales alquilo (—R, fórmula CₙH₂ₙ₊₁—):</strong> resultan
            de quitar un hidrógeno a un alcano; cambian la terminación{" "}
            <em>-ano</em> por <strong>-il</strong> o <strong>-ilo</strong>:
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li><strong>Metil (o metilo):</strong> —CH₃</li>
              <li><strong>Etil (o etilo):</strong> —CH₂—CH₃ (o —C₂H₅)</li>
              <li><strong>Propil (n-propilo):</strong> —CH₂—CH₂—CH₃</li>
              <li><strong>Isopropil:</strong> —CH(CH₃)₂ (unido por su carbono central)</li>
              <li><strong>Butil (n-butilo):</strong> —CH₂—CH₂—CH₂—CH₃</li>
            </ul>
          </li>
          <li>
            <strong>Regla 1 · Cadena principal:</strong> elige la cadena
            continua de carbonos más larga. Si hay enlaces dobles o triples, la
            cadena principal debe contenerlos.
          </li>
          <li>
            <strong>Regla 2 · Numeración:</strong> numera los carbonos de la
            cadena principal desde el extremo que otorgue los números
            localizadores más bajos al enlace múltiple (en alquenos y alquinos)
            o a los radicales (en alcanos).
          </li>
          <li>
            <strong>Regla 3 · Nombre completo:</strong> escribe primero los
            radicales en <strong>orden alfabético</strong> precedidos por su
            número de carbono (usando <em>di-, tri-, tetra-</em> si un mismo
            radical se repite) y al final el nombre de la cadena principal.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={273}>
        <svg width="100%" height="100%" viewBox="0 0 360 315" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Cadena principal, numeración y radicales
          </text>

          {/* Ejemplo 1: 2-metilpentano */}
          <rect x={14} y={34} width={332} height={130} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          <text x={180} y={54} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            Alcano ramificado: 2-metilpentano
          </text>
          <text x={180} y={76} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            1        2       3       4       5
          </text>
          <text x={180} y={96} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₃ — CH — CH₂ — CH₂ — CH₃
          </text>
          <line x1={122} x2={122} y1={102} y2={118} stroke={LIENZO.ok} strokeWidth={2} />
          <rect x={96} y={120} width={52} height={24} rx={5} fill={LIENZO.ok} opacity={0.18} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={122} y={137} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>CH₃</text>
          <text x={242} y={136} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Radical metil en C-2
          </text>

          {/* Ejemplo 2: 4-metil-2-penteno */}
          <rect x={14} y={174} width={332} height={130} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          <text x={180} y={194} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            Alqueno ramificado: 4-metil-2-penteno
          </text>
          <text x={180} y={216} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            1        2      3       4       5
          </text>
          <text x={180} y={236} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₃ — CH = CH — CH — CH₃
          </text>
          <line x1={236} x2={236} y1={242} y2={258} stroke={LIENZO.accent} strokeWidth={2} />
          <rect x={210} y={260} width={52} height={24} rx={5} fill={LIENZO.accent} opacity={0.18} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={236} y={277} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>CH₃</text>
          <text x={112} y={276} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Manda el C=C (en C-2)
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Importancia y uso de los hidrocarburos">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Gas natural y GLP:</strong> el metano (CH₄) es el componente
            principal del gas natural domiciliario e industrial; la mezcla de
            propano (C₃H₈) y butano (C₄H₁₀) constituye el gas licuado de
            petróleo (GLP).
          </li>
          <li>
            <strong>El petróleo y el índice de octanos:</strong> de la
            destilación fraccionada del petróleo se obtienen gasolinas,
            queroseno, diésel, aceites lubricantes, parafina y asfalto. El{" "}
            <strong>índice de octanos (octanaje)</strong> mide la capacidad
            antidetonante de una gasolina comparándola con una escala donde el{" "}
            <strong>n-heptano vale 0</strong> (detona fácilmente) y el{" "}
            <strong>isooctano (2,2,4-trimetilpentano) vale 100</strong>.
          </li>
          <li>
            <strong>Eteno y etino (acetileno):</strong> el eteno (C₂H₄) es la
            materia prima del polietileno y hormona natural de maduración de
            frutas; el etino o acetileno (C₂H₂), obtenido haciendo reaccionar
            carburo de calcio (CaC₂) con agua, se emplea en soldadura y corte
            oxiacetilénico por la alta temperatura de su llama.
          </li>
        </ul>
      </Definicion>

      <Cuidado>
        En un alqueno o alquino, la numeración de la cadena principal la decide{" "}
        <strong>el enlace doble o triple</strong> (para darle el menor número
        posible), no la cercanía de los radicales alquilo.
      </Cuidado>
    </EscenaRica>
  );
}

function EscOxigenadas() {
  return (
    <EscenaRica>
      <Titulo>Funciones orgánicas oxigenadas</Titulo>

      <Parrafo>
        Las <strong>funciones orgánicas oxigenadas</strong> son compuestos
        ternarios formados por <strong>carbono, hidrógeno y oxígeno (C, H, O)</strong>.
        La reactividad y el nombre IUPAC de cada familia dependen de su{" "}
        <strong>grupo funcional</strong>.
      </Parrafo>

      <Definicion termino="1. Alcoholes (R—OH)">
        Contienen el grupo funcional <strong>hidroxilo u oxidrilo (—OH)</strong>{" "}
        unido a un átomo de carbono saturado (<em>sp³</em>).
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Nomenclatura IUPAC:</strong> se cambia la terminación{" "}
            <em>-o</em> del hidrocarburo por el sufijo <strong>-ol</strong>,
            indicando con un número la posición del grupo —OH (numerando la
            cadena para darle el menor localizador posible). Si hay varios —OH
            se usan <em>-diol</em>, <em>-triol</em>.
          </li>
          <li>
            <strong>Clasificación:</strong> alcohol primario (el C del —OH está
            unido a 1 C, ej. etanol), secundario (a 2 C, ej. 2-propanol) o
            terciario (a 3 C, ej. 2-metil-2-propanol).
          </li>
          <li>
            <strong>Ejemplos clave en medicina e industria:</strong>{" "}
            <strong>metanol (CH₃OH)</strong> (alcohol de madera, tóxico para el
            nervio óptico), <strong>etanol (CH₃—CH₂—OH)</strong> (obtenido por
            fermentación de azúcares; antiséptico clínico al 70%),{" "}
            <strong>2-propanol (CH₃—CHOH—CH₃)</strong> y{" "}
            <strong>1,2,3-propanotriol (glicerol o glicerina)</strong>, base de
            los triacilglicéridos. (Sus isómeros de función con grupo puente{" "}
            <strong>R—O—R&apos;</strong> son los <strong>éteres</strong>, como el
            etoxietano o éter dietílico).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="2. Aldehídos (R—CHO) y Cetonas (R—CO—R')">
        Ambos poseen el grupo funcional <strong>carbonilo (&gt;C=O)</strong>,
        con un enlace doble carbono-oxígeno (hibridación <em>sp²</em>), pero se
        diferencian por su ubicación en la cadena:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Aldehídos (R—CHO, grupo formilo):</strong> el grupo
            carbonilo está en un <strong>carbono primario (extremo de cadena,
            C-1)</strong> unido al menos a un átomo de hidrógeno. Se nombran con
            el sufijo <strong>-al</strong>. Ejemplos:{" "}
            <strong>metanal (H—CHO, formaldehído)</strong> (cuya disolución
            acuosa al 37-40% es el <em>formol</em> usado para conservar tejidos
            anatómicos), <strong>etanal (CH₃—CHO, acetaldehído)</strong> y{" "}
            <strong>propanal (CH₃—CH₂—CHO)</strong>.
          </li>
          <li>
            <strong>Cetonas (R—CO—R&apos;, grupo oxo o carbonilo secundario):</strong>{" "}
            el grupo carbonilo está en un <strong>carbono secundario (interior de
            la cadena)</strong> unido a dos átomos de carbono. Se nombran con el
            sufijo <strong>-ona</strong> indicando su posición a partir de 5
            carbonos. Ejemplos: <strong>propanona (CH₃—CO—CH₃, acetona)</strong>{" "}
            (disolvente y cuerpo cetónico en el metabolismo) y{" "}
            <strong>2-butanona (CH₃—CO—CH₂—CH₃)</strong>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={273}>
        <svg width="100%" height="100%" viewBox="0 0 360 315" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Funciones oxigenadas (1/2): Alcohol, Aldehído, Cetona
          </text>

          {/* Alcohol */}
          <rect x={14} y={36} width={332} height={82} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={180} y={56} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            Alcohol · Grupo hidroxilo (—OH) · Sufijo -ol
          </text>
          <text x={180} y={81} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₃ — CH₂ — OH
          </text>
          <text x={180} y={104} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Etanol (2 C) · C saturado unido a —OH
          </text>

          {/* Aldehido */}
          <rect x={14} y={128} width={332} height={82} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={180} y={148} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            Aldehído · Carbonilo extremo (—CHO) · Sufijo -al
          </text>
          <text x={180} y={173} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₃ — CH₂ — CH = O
          </text>
          <text x={180} y={196} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Propanal (3 C) · El grupo —CHO siempre es C-1
          </text>

          {/* Cetona */}
          <rect x={14} y={220} width={332} height={82} rx={8} fill={LIENZO.warn} opacity={0.11} stroke={LIENZO.warn} strokeWidth={1.6} />
          <text x={180} y={240} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>
            Cetona · Carbonilo interno (—CO—) · Sufijo -ona
          </text>
          <text x={180} y={265} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₃ — CO — CH₃
          </text>
          <text x={180} y={288} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Propanona o acetona (3 C) · Carbonilo entre dos C
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="3. Ácidos carboxílicos (R—COOH) y 4. Ésteres (R—COO—R')">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Ácidos carboxílicos (R—COOH):</strong> poseen el grupo{" "}
            <strong>carboxilo (—COOH)</strong> en un extremo de la cadena
            (siempre carbono 1, máxima prioridad IUPAC). Se nombran con la
            palabra <strong>ácido</strong> seguida del prefijo de la cadena
            total (incluyendo el carbono del —COOH) y el sufijo{" "}
            <strong>-oico</strong>:
            <ul style={{ margin: "4px 0 6px 18px", padding: 0, fontSize: 14 }}>
              <li><strong>Ácido metanoico (HCOOH):</strong> ácido fórmico (1 C).</li>
              <li><strong>Ácido etanoico (CH₃—COOH):</strong> ácido acético del vinagre (2 C).</li>
              <li><strong>Ácido propanoico (CH₃—CH₂—COOH):</strong> 3 C en la cadena principal.</li>
              <li><strong>Ácido butanoico (CH₃—CH₂—CH₂—COOH):</strong> ácido butírico (4 C).</li>
            </ul>
          </li>
          <li>
            <strong>Ésteres (R—COO—R&apos;):</strong> resultan de reemplazar el
            hidrógeno ácido del grupo —COOH por un radical alquilo —R&apos;
            (mediante la reacción de <em>esterificación</em> entre un ácido
            carboxílico y un alcohol; la reacción inversa con una base fuerte
            NaOH o KOH sobre ésteres grasos es la <strong>saponificación</strong>{" "}
            que produce jabón y glicerina). Se nombran cambiando la terminación{" "}
            <em>-oico</em> del ácido por <strong>-oato</strong>, seguida de{" "}
            <strong>de</strong> y el nombre del radical unido al oxígeno simple
            terminado en <strong>-ilo</strong>:
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li><strong>Metanoato de etilo:</strong> H—COO—CH₂—CH₃</li>
              <li><strong>Etanoato de metilo:</strong> CH₃—COO—CH₃ (acetato de metilo)</li>
              <li><strong>Etanoato de etilo:</strong> CH₃—COO—CH₂—CH₃ (acetato de etilo)</li>
            </ul>
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={234}>
        <svg width="100%" height="100%" viewBox="0 0 360 270" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Funciones oxigenadas (2/2): Ácido y Éster
          </text>

          {/* Acido carboxilico */}
          <rect x={14} y={36} width={332} height={102} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={180} y={56} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            Ácido carboxílico · Grupo —COOH · Ácido ...-oico
          </text>
          <text x={180} y={76} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            3        2        1
          </text>
          <text x={180} y={98} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            CH₃ — CH₂ — COOH
          </text>
          <text x={180} y={122} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Ácido propanoico (se cuenta el C del —COOH)
          </text>

          {/* Ester */}
          <rect x={14} y={150} width={332} height={106} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={180} y={170} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            Éster · Grupo —COO— · ...-oato de ...-ilo
          </text>
          <text x={180} y={198} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            [CH₃ — COO] — [CH₂ — CH₃]
          </text>
          <text x={106} y={222} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Etanoato (2 C)
          </text>
          <text x={256} y={222} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            de etilo (2 C)
          </text>
          <text x={180} y={244} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Nombre IUPAC: Etanoato de etilo (acetato de etilo)
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        No confundas <strong>—CHO (aldehído)</strong> con{" "}
        <strong>—OH (alcohol)</strong>: al escribir fórmulas condensadas, el
        aldehído siempre se escribe <strong>—CHO</strong> (con el H después del
        O para recordar que el oxígeno tiene doble enlace C=O), mientras que el
        alcohol se escribe <strong>—OH</strong>.
      </Cuidado>
    </EscenaRica>
  );
}

function EscNitrogenadas() {
  return (
    <EscenaRica>
      <Titulo>Sustancias orgánicas nitrogenadas y la urea</Titulo>

      <Parrafo>
        Las <strong>sustancias orgánicas nitrogenadas</strong> contienen átomos
        de <strong>nitrógeno (N)</strong> en su grupo funcional, además de C e H
        (y oxígeno en el caso de las amidas). Son fundamentales en farmacología,
        proteínas, neurotransmisores y metabolismo humano.
      </Parrafo>

      <Definicion termino="1. Aminas, 2. Amidas y 3. Nitrilos">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Aminas (R—NH₂, R—NH—R&apos;, R₃N):</strong> derivan del
            amoníaco (NH₃) al sustituir uno, dos o tres átomos de hidrógeno por
            radicales orgánicos, dando aminas <strong>primarias (—NH₂)</strong>,{" "}
            <strong>secundarias (—NH—)</strong> o{" "}
            <strong>terciarias (—N&lt;)</strong>. <strong>No tienen grupo
            carbonilo C=O unido al nitrógeno.</strong> Se nombran listando los
            radicales seguidos de <strong>-amina</strong> (o con el sufijo{" "}
            <em>-amina</em> sobre el alcano). Ejemplos:{" "}
            <strong>metilamina o metanamina (CH₃—NH₂)</strong>,{" "}
            <strong>etilamina o etanamina (CH₃—CH₂—NH₂)</strong>,{" "}
            <strong>dimetilamina (CH₃—NH—CH₃)</strong> y{" "}
            <strong>fenilamina o anilina (C₆H₅—NH₂, fórmula C₆H₇N)</strong>.
          </li>
          <li>
            <strong>Amidas (R—CONH₂):</strong> presentan un grupo{" "}
            <strong>carbonilo (C=O) unido directamente al nitrógeno</strong>{" "}
            (grupo carboxamida, derivado de cambiar el —OH de un ácido
            carboxílico por —NH₂). Se nombran reemplazando la terminación{" "}
            <em>-oico</em> del ácido por <strong>-amida</strong>. Ejemplos:{" "}
            <strong>metanamida (H—CONH₂, formamida)</strong>,{" "}
            <strong>etanamida (CH₃—CONH₂, acetamida)</strong> y{" "}
            <strong>propanamida (CH₃—CH₂—CONH₂)</strong>. En las proteínas, el{" "}
            <strong>enlace peptídico (—CO—NH—)</strong> que une a los
            aminoácidos es precisamente una función amida.
          </li>
          <li>
            <strong>Nitrilos (R—C≡N, cianuros orgánicos):</strong> contienen el
            grupo funcional <strong>ciano (—C≡N)</strong> en un extremo de
            cadena, con enlace triple carbono-nitrógeno (hibridación <em>sp</em>
            ). Se nombran añadiendo el sufijo <strong>-nitrilo</strong> al
            nombre del alcano (contando el carbono del grupo —CN) o como{" "}
            <strong>cianuro de [radical]-ilo</strong>. Ejemplos:{" "}
            <strong>etanonitrilo (CH₃—C≡N, acetonitrilo o cianuro de metilo)</strong>{" "}
            y <strong>propanonitrilo (CH₃—CH₂—C≡N o cianuro de etilo)</strong>.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="4. La urea: CO(NH₂)₂ (estructura, historia e importancia)">
        La <strong>urea</strong>, de fórmula semidesarrollada{" "}
        <strong>NH₂—CO—NH₂</strong> o <strong>CO(NH₂)₂</strong> y fórmula
        molecular <strong>CH₄N₂O</strong> (masa molar = 60 g/mol), es la{" "}
        <strong>diamida del ácido carbónico</strong> (carbodiamida):
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Función orgánica a la que pertenece:</strong> es una{" "}
            <strong>amida</strong>, porque su carbono carbonílico (C=O) está
            unido directamente a dos grupos amino (—NH₂).
          </li>
          <li>
            <strong>Importancia histórica (Wöhler, 1828):</strong> fue el primer
            compuesto orgánico sintetizado en laboratorio a partir de una sal
            inorgánica (el cianato de amonio, NH₄OCN), derribando la teoría de
            la &quot;fuerza vital&quot;.
          </li>
          <li>
            <strong>Importancia médica y fisiológica:</strong> es el principal
            producto nitrogenado terminal del metabolismo de las proteínas y
            aminoácidos en el ser humano; se sintetiza en el{" "}
            <strong>hígado</strong> (ciclo de la urea) a partir del amoníaco
            tóxico y se elimina por filtración glomerular en la{" "}
            <strong>orina</strong>.
          </li>
          <li>
            <strong>Importancia agroindustrial:</strong> por su alto contenido
            de nitrógeno (28 / 60 ≈ 46,7% en masa de N), es el fertilizante
            nitrogenado sólido más utilizado en la agricultura y en la industria
            petroquímica boliviana (planta de amoníaco y urea de Bulo Bulo).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={286}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Funciones nitrogenadas y estructura de la urea
          </text>

          {/* Amina */}
          <rect x={14} y={34} width={332} height={66} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={26} y={55} fill={LIENZO.ok} fontSize={14} fontWeight={700}>1. Amina (—NH₂)</text>
          <text x={200} y={55} fill={LIENZO.fg} fontSize={14} fontWeight={700}>CH₃—CH₂—NH₂</text>
          <text x={26} y={78} fill={LIENZO.fgDim} fontSize={13}>Etanamina (etilamina) · Sin grupo C=O</text>

          {/* Amida */}
          <rect x={14} y={108} width={332} height={66} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.5} />
          <text x={26} y={129} fill={LIENZO.accent} fontSize={14} fontWeight={700}>2. Amida (—CONH₂)</text>
          <text x={200} y={129} fill={LIENZO.fg} fontSize={14} fontWeight={700}>CH₃—CO—NH₂</text>
          <text x={26} y={152} fill={LIENZO.fgDim} fontSize={13}>Etanamida (acetamida) · C=O unido a N</text>

          {/* Nitrilo */}
          <rect x={14} y={182} width={332} height={66} rx={8} fill={LIENZO.warn} opacity={0.11} stroke={LIENZO.warn} strokeWidth={1.5} />
          <text x={26} y={203} fill={LIENZO.warn} fontSize={14} fontWeight={700}>3. Nitrilo (—C≡N)</text>
          <text x={200} y={203} fill={LIENZO.fg} fontSize={14} fontWeight={700}>CH₃—CH₂—C≡N</text>
          <text x={26} y={226} fill={LIENZO.fgDim} fontSize={13}>Propanonitrilo (3 C) · Triple enlace C≡N</text>

          {/* Urea */}
          <rect x={14} y={256} width={332} height={66} rx={8} fill={LIENZO.accent} opacity={0.18} stroke={LIENZO.accent} strokeWidth={1.8} />
          <text x={26} y={277} fill={LIENZO.accent} fontSize={14} fontWeight={700}>4. La Urea · CO(NH₂)₂</text>
          <text x={206} y={277} fill={LIENZO.fg} fontSize={14} fontWeight={700}>H₂N — CO — NH₂</text>
          <text x={26} y={300} fill={LIENZO.fg} fontSize={13} fontWeight={600}>Función: Amida (diamida del ácido carbónico)</text>
        </svg>
      </Pizarra>

      <Conexion>
        En Morfofunción (Sistema digestivo y Sistema urinario) y en Biología
        Celular estudiarás cómo el hígado convierte el amoníaco proveniente de
        la desaminación de aminoácidos en urea —CO(NH₂)₂— para que el riñón
        pueda excretarla sin toxicidad.
      </Conexion>
    </EscenaRica>
  );
}

function EscEjerciciosBanco() {
  return (
    <EscenaRica>
      <Titulo>Ejercicios reales resueltos del banco UMSS</Titulo>

      <Parrafo>
        En los exámenes de ingreso de la UMSS, las preguntas de cálculo sobre
        compuestos orgánicos evalúan cómo determinar la{" "}
        <strong>fórmula empírica y la fórmula molecular</strong> a partir del
        análisis de combustión (masas de CO₂ y H₂O), composición porcentual y
        propiedades de gases. Aquí tienes 4 preguntas reales del banco resueltas
        paso a paso y verificadas por dos caminos.
      </Parrafo>

      <WorkedExample titulo="Ejercicio real 1 · UMSS (2007-parcial1-1-2007 · Pregunta 20)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> Al quemar 3mg de anilina (compuesto
          de C, H, N) se obtienen 8.52mg de CO₂ y 2.03mg de H₂O. Hallar su
          fórmula empírica.
          <br />
          <strong>Opciones:</strong> A) C₃H₃.₅N₀.₅ · B) C₂H₅N · C) C₆H₆N ·{" "}
          <strong>D) C₆H₇N</strong> · E) Ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> todo el carbono del CO₂ y todo el
          hidrógeno del H₂O provienen de la anilina; la masa de nitrógeno se
          obtiene por diferencia respecto a los 3 mg iniciales.
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Datos nombrados y masas molares:</strong> masa de
            muestra <em>m</em> = 3 mg; masa de CO₂ = 8,52 mg (<em>M</em> = 44
            mg/mmol, con 12 mg de C por mmol); masa de H₂O = 2,03 mg (
            <em>M</em> = 18 mg/mmol, con 2 mg de H por mmol); <em>M</em>(N) = 14
            mg/mmol.
          </li>
          <li>
            <strong>Paso 2 · Masa y milimoles de carbono (C):</strong>{" "}
            <em>m</em>(C) = 8,52 × (12 / 44) = 102,24 / 44 ={" "}
            <strong>2,3236 mg de C</strong>. Milimoles de C:{" "}
            <em>n</em>(C) = 2,3236 / 12 = <strong>0,1936 mmol de C</strong>.
          </li>
          <li>
            <strong>Paso 3 · Masa y milimoles de hidrógeno (H):</strong>{" "}
            <em>m</em>(H) = 2,03 × (2 / 18) = 4,06 / 18 ={" "}
            <strong>0,2256 mg de H</strong>. Milimoles de H:{" "}
            <em>n</em>(H) = 0,2256 / 1 = <strong>0,2256 mmol de H</strong>.
          </li>
          <li>
            <strong>Paso 4 · Masa y milimoles de nitrógeno (N) por resta:</strong>{" "}
            <em>m</em>(N) = 3,0000 − 2,3236 − 0,2256 ={" "}
            <strong>0,4508 mg de N</strong>. Milimoles de N:{" "}
            <em>n</em>(N) = 0,4508 / 14 = <strong>0,0322 mmol de N</strong>.
          </li>
          <li>
            <strong>Paso 5 · Proporción molar dividiendo entre el menor (0,0322 mmol):</strong>{" "}
            C = 0,1936 / 0,0322 = <strong>6,01 ≈ 6</strong>; H = 0,2256 / 0,0322
            = <strong>7,01 ≈ 7</strong>; N = 0,0322 / 0,0322 ={" "}
            <strong>1</strong>. La fórmula empírica es <strong>C₆H₇N</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino):</strong> la anilina es
            fenilamina (C₆H₅NH₂ = C₆H₇N), de masa molar 6(12) + 7(1) + 14 = 93
            g/mol. En 3 mg hay 3/93 = 0,03226 mmol, que al quemarse producen
            6 × 0,03226 × 44 = 8,52 mg de CO₂ y 3,5 × 0,03226 × 18 = 2,03 mg de
            H₂O.
          </li>
        </ul>
        <div>
          <strong>Respuesta: D (C₆H₇N).</strong>
        </div>
      </WorkedExample>

      <WorkedExample titulo="Ejercicio real 2 · UMSS (2007-parcial2-1-2007 · Pregunta 21)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> Un compuesto orgánico tiene
          C=55.8%, H=7.03%, O=37.2%. Una muestra de 1.50g se evapora y ocupa
          530mL a 100°C y 740torr. Hallar la fórmula molecular.
          <br />
          <strong>Opciones:</strong> A) C₂H₃O · <strong>B) C₄H₆O₂</strong> · C)
          C₃H₄O₂ · D) C₃H₆O₂ · E) ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> primero hallamos la masa molar
          experimental del vapor con la ecuación de gases ideales{" "}
          <em>M = m·R·T / (P·V)</em> y luego determinamos cuántas veces cabe la
          fórmula empírica dentro de esa masa molar.
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Datos del gas convertidos al sistema de R = 0,0821 atm·L/(mol·K):</strong>{" "}
            <em>m</em> = 1,50 g; <em>V</em> = 530 mL = 0,530 L;{" "}
            <em>T</em> = 100 + 273,15 = 373,15 K;{" "}
            <em>P</em> = 740 / 760 = 0,9737 atm.
          </li>
          <li>
            <strong>Paso 2 · Masa molar experimental (M):</strong>{" "}
            numerador <em>m·R·T</em> = 1,50 × 0,0821 × 373,15 = 45,953;
            denominador <em>P·V</em> = 0,9737 × 0,530 = 0,5161; entonces{" "}
            <em>M</em> = 45,953 / 0,5161 ≈ <strong>89,0 g/mol</strong>.
          </li>
          <li>
            <strong>Paso 3 · Moles en 100 g de muestra para la fórmula empírica:</strong>{" "}
            <em>n</em>(C) = 55,8 / 12,01 = <strong>4,65 mol</strong>;{" "}
            <em>n</em>(H) = 7,03 / 1,008 = <strong>6,97 mol</strong>;{" "}
            <em>n</em>(O) = 37,2 / 16,00 = <strong>2,325 mol</strong>.
          </li>
          <li>
            <strong>Paso 4 · Dividiendo entre el menor (2,325 mol):</strong>{" "}
            C = 4,65 / 2,325 = <strong>2</strong>; H = 6,97 / 2,325 ={" "}
            <strong>3</strong>; O = 2,325 / 2,325 = <strong>1</strong>. La
            fórmula empírica es <strong>C₂H₃O</strong>, cuya masa empírica es
            2(12) + 3(1) + 16 = <strong>43,05 g/mol</strong>.
          </li>
          <li>
            <strong>Paso 5 · Factor multiplicador (k) y fórmula molecular:</strong>{" "}
            <em>k</em> = 89,0 / 43,05 = 2,07 ≈ <strong>2</strong>. Multiplicando
            los subíndices de C₂H₃O por 2 resulta <strong>C₄H₆O₂</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino):</strong> la masa molar
            teórica de C₄H₆O₂ es 4(12,01) + 6(1,008) + 2(16,00) = 86,09 g/mol, y
            sus porcentajes son %C = 48,04/86,09 = 55,8%, %H = 6,05/86,09 =
            7,03% y %O = 32,00/86,09 = 37,2%, idénticos al enunciado.
          </li>
        </ul>
        <div>
          <strong>Respuesta: B (C₄H₆O₂).</strong>
        </div>
      </WorkedExample>

      <WorkedExample titulo="Ejercicio real 3 · UMSS (2008-parcial2-2-2008 · Pregunta 11)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> Por combustión de 0,6678 g de un
          compuesto orgánico se obtuvieron 0,9795 g de CO₂ y 0,2609 g de agua;
          0,2933 g del compuesto orgánico en c.n. desplazan 74,66 mL de H₂O.
          Determinar la fórmula empírica del compuesto.
          <br />
          <strong>Opciones:</strong> A) CHO · <strong>B) C₃H₄O₃</strong> · C)
          C₃H₄O · D) CHO₂ · E) Ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> calculamos las masas y moles de C y H a
          partir del CO₂ y del H₂O, hallamos el O por diferencia respecto a los
          0,6678 g quemados y comprobamos con el volumen molar en condiciones
          normales (22.400 mL/mol).
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Moles y masa de carbono (de 0,9795 g de CO₂):</strong>{" "}
            <em>n</em>(C) = 0,9795 / 44,01 = <strong>0,02226 mol de C</strong>.
            Masa de C: <em>m</em>(C) = 0,02226 × 12,011 ={" "}
            <strong>0,2673 g de C</strong>.
          </li>
          <li>
            <strong>Paso 2 · Moles y masa de hidrógeno (de 0,2609 g de H₂O):</strong>{" "}
            <em>n</em>(H) = 2 × (0,2609 / 18,015) ={" "}
            <strong>0,02896 mol de H</strong>. Masa de H: <em>m</em>(H) =
            0,02896 × 1,008 = <strong>0,0292 g de H</strong>.
          </li>
          <li>
            <strong>Paso 3 · Masa y moles de oxígeno por diferencia:</strong>{" "}
            <em>m</em>(O) = 0,6678 − 0,2673 − 0,0292 ={" "}
            <strong>0,3713 g de O</strong>. Moles de O:{" "}
            <em>n</em>(O) = 0,3713 / 16,00 = <strong>0,02321 mol de O</strong>.
          </li>
          <li>
            <strong>Paso 4 · Relación molar entera:</strong> dividiendo entre el
            menor (0,02226 mol): C = 0,02226 / 0,02226 = <strong>1,00</strong>;
            H = 0,02896 / 0,02226 = <strong>1,30 ≈ 4/3</strong>; O = 0,02321 /
            0,02226 = <strong>1,04 ≈ 1,00</strong>. Multiplicando la razón
            1 : 4/3 : 1 por 3 obtenemos <strong>C = 3, H = 4, O = 3</strong>, es
            decir, <strong>C₃H₄O₃</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino con condiciones normales):</strong>{" "}
            en c.n. (1 atm y 0 °C), 1 mol de gas desplaza 22.400 mL. Entonces
            74,66 mL corresponden a <em>n</em> = 74,66 / 22.400 = 0,003333 mol,
            y la masa molar es <em>M</em> = 0,2933 g / 0,003333 mol ={" "}
            <strong>88,0 g/mol</strong>. La masa molar de C₃H₄O₃ es
            3(12) + 4(1) + 3(16) = 36 + 4 + 48 = <strong>88 g/mol</strong>,
            confirmando que la fórmula empírica y la molecular son C₃H₄O₃.
          </li>
        </ul>
        <div>
          <strong>Respuesta: B (C₃H₄O₃).</strong>
        </div>
      </WorkedExample>

      <WorkedExample titulo="Ejercicio real 4 · UMSS (2024-parcial1-1-2024 · Pregunta 12)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> La combustión de 0.3082 g de una
          muestra de compuesto orgánico, produjo 0.7003 g de dióxido de carbono
          y 0.3821 g de agua. En un análisis separado para el nitrógeno, en el
          que se usaron 1.270 g del mismo compuesto, se obtuvieron 0.3723 g de
          amoniaco (NH₃). Hallar la fórmula molecular del compuesto, si la masa
          molar es 232.37 g/mol.
          <br />
          <strong>Opciones:</strong> A) C₃H₈N · <strong>B) C₁₂H₃₂N₄</strong> · C)
          C₆H₇ON · D) C₆H₁₆N₂ · E) Ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> como se usaron dos muestras de distinto
          peso (0,3082 g para C y H; 1,270 g para N), expresamos cada elemento
          en porcentaje en masa antes de hallar cuántos átomos hay en 1 mol
          (232,37 g) del compuesto.
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Porcentaje de C en la primera muestra (m₁ = 0,3082 g):</strong>{" "}
            <em>n</em>(CO₂) = 0,7003 / 44,01 = 0,01591 mol → masa de C =
            0,01591 × 12,011 = 0,1911 g. Porcentaje:{" "}
            <strong>%C</strong> = (0,1911 / 0,3082) × 100 ={" "}
            <strong>62,01%</strong>.
          </li>
          <li>
            <strong>Paso 2 · Porcentaje de H en la primera muestra (m₁ = 0,3082 g):</strong>{" "}
            <em>n</em>(H₂O) = 0,3821 / 18,015 = 0,02121 mol → masa de H =
            2 × 0,02121 × 1,008 = 0,04276 g. Porcentaje:{" "}
            <strong>%H</strong> = (0,04276 / 0,3082) × 100 ={" "}
            <strong>13,87%</strong>.
          </li>
          <li>
            <strong>Paso 3 · Porcentaje de N en la segunda muestra (m₂ = 1,270 g):</strong>{" "}
            <em>n</em>(NH₃) = 0,3723 / 17,031 = 0,02186 mol = <em>n</em>(N) →
            masa de N = 0,02186 × 14,007 = 0,3062 g. Porcentaje:{" "}
            <strong>%N</strong> = (0,3062 / 1,270) × 100 ={" "}
            <strong>24,11%</strong>.
          </li>
          <li>
            <strong>Paso 4 · Comprobación de oxígeno:</strong>{" "}
            %C + %H + %N = 62,01% + 13,87% + 24,11% = <strong>99,99% ≈ 100%</strong>,
            por lo que el compuesto no contiene oxígeno.
          </li>
          <li>
            <strong>Paso 5 · Átomos por mol usando M = 232,37 g/mol:</strong>{" "}
            C = (232,37 × 0,6201) / 12,011 = 144,09 / 12,011 ={" "}
            <strong>12 átomos de C</strong>; H = (232,37 × 0,1387) / 1,008 =
            32,23 / 1,008 = <strong>32 átomos de H</strong>; N = (232,37 ×
            0,2411) / 14,007 = 56,02 / 14,007 = <strong>4 átomos de N</strong>.
            La fórmula molecular es <strong>C₁₂H₃₂N₄</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino por fórmula empírica):</strong>{" "}
            dividiendo % entre masa atómica (62,01/12,01 = 5,16; 13,87/1,008 =
            13,76; 24,11/14,01 = 1,72) y luego entre 1,72 da la fórmula empírica{" "}
            <strong>C₃H₈N</strong> (masa = 58,10 g/mol). Como 232,37 / 58,10 = 4,
            la fórmula molecular es (C₃H₈N)₄ = <strong>C₁₂H₃₂N₄</strong>.
          </li>
        </ul>
        <div>
          <strong>Respuesta: B (C₁₂H₃₂N₄).</strong>
        </div>
        <p>
          <strong>Ojo:</strong> es la respuesta oficial, pero esa molécula no puede existir. Con 12 carbonos y 4
          nitrógenos caben como máximo 2(12) + 2 + 4 = 30 hidrógenos, y la fórmula tiene 32. El error está en los
          datos del examen, no en tu cuenta: en el examen marca B.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Lo que más se pregunta y práctica PSA 2027</Titulo>

      <Misconception titulo="Error 1 · 'El grupo —CHO es un alcohol y el —CO— es un aldehído'">
        <strong>Realidad:</strong> el alcohol tiene el grupo hidroxilo{" "}
        <strong>—OH</strong> (sin enlace doble C=O). El aldehído tiene el
        carbonilo en el extremo de la cadena (<strong>—CHO</strong>, sufijo{" "}
        <em>-al</em>), mientras que la cetona tiene el carbonilo en un carbono
        secundario interno (<strong>R—CO—R&apos;</strong>, sufijo <em>-ona</em>).
      </Misconception>

      <Misconception titulo="Error 2 · 'En CH₃—CH₂—COOH solo se cuentan los carbonos del radical CH₃—CH₂—'">
        <strong>Realidad:</strong> según la IUPAC, el carbono del grupo
        carboxilo (<strong>—COOH</strong>), del aldehído (<strong>—CHO</strong>),
        de la amida (<strong>—CONH₂</strong>) y del nitrilo (
        <strong>—C≡N</strong>) siempre es el <strong>carbono 1</strong> y forma
        parte de la cadena principal. Por eso CH₃—CH₂—COOH tiene 3 carbonos y
        se llama <strong>ácido propanoico</strong>, no ácido etanoico.
      </Misconception>

      <Misconception titulo="Error 3 · 'La urea CO(NH₂)₂ es una amina porque tiene grupos —NH₂'">
        <strong>Realidad:</strong> cuando el nitrógeno está unido directamente a
        un grupo carbonilo (<strong>C=O</strong>), la función deja de ser amina
        y pasa a ser <strong>amida</strong>. La urea (NH₂—CO—NH₂) es la diamida
        del ácido carbónico.
      </Misconception>

      <Resumen>
        <strong>Lo que más se pregunta en el examen PSA 2027:</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Química del carbono:</strong> tetravalencia (4 enlaces),
            autosaturación y covalencia; hibridación <em>sp³</em> (simple, 4 σ),{" "}
            <em>sp²</em> (doble = 1σ + 1π) y <em>sp</em> (triple = 1σ + 2π);
            fórmulas empírica, molecular, semidesarrollada, desarrollada y
            topológica.
          </li>
          <li>
            <strong>Hidrocarburos acíclicos:</strong> alcanos{" "}
            <strong>CₙH₂ₙ₊₂</strong> (<em>-ano</em>), alquenos{" "}
            <strong>CₙH₂ₙ</strong> (<em>-eno</em>) y alquinos{" "}
            <strong>CₙH₂ₙ₋₂</strong> (<em>-ino</em>). Cadena principal = la más
            larga que contenga el enlace múltiple.
          </li>
          <li>
            <strong>Funciones oxigenadas:</strong> alcohol (<strong>—OH</strong>
            , <em>-ol</em>), aldehído (<strong>—CHO</strong> extremo,{" "}
            <em>-al</em>), cetona (<strong>—CO—</strong> interno, <em>-ona</em>
            ), ácido carboxílico (<strong>—COOH</strong>,{" "}
            <em>ácido ...-oico</em>) y éster (<strong>—COO—</strong>,{" "}
            <em>...-oato de ...-ilo</em>).
          </li>
          <li>
            <strong>Funciones nitrogenadas:</strong> amina (
            <strong>—NH₂</strong> sin C=O, ej. anilina C₆H₇N), amida (
            <strong>—CONH₂</strong> con C=O unido al N, como la{" "}
            <strong>urea CO(NH₂)₂</strong>) y nitrilo (<strong>—C≡N</strong>,{" "}
            <em>-nitrilo</em>).
          </li>
        </ul>
      </Resumen>

      <AutoCheck
        pregunta="¿Qué tipo de hibridación presenta el átomo de carbono en el metano (CH₄) y cuántos enlaces σ forma?"
        opciones={[
          "sp³ y 4 enlaces σ",
          "sp² y 4 enlaces σ",
          "sp y 2 enlaces σ",
          "sp³ y 2 enlaces σ",
        ]}
        correctaIdx={0}
        explicacion="Paso 1 · El carbono del CH₄ forma 4 enlaces simples alrededor suyo, lo que corresponde a hibridación tetraédrica sp³. Paso 2 · Todo enlace simple es un enlace σ, por tanto tiene 4 enlaces σ y 0 enlaces π. Respuesta: sp³ y 4 enlaces σ."
      />

      <AutoCheck
        pregunta="¿Cuál es la fórmula molecular de un alqueno acíclico con 5 átomos de carbono?"
        opciones={[
          "C₅H₁₂",
          "C₅H₁₀",
          "C₅H₈",
          "C₅H₆",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · La fórmula general de los alquenos acíclicos (con un doble enlace) es CₙH₂ₙ. Paso 2 · Para n = 5: C₅H₂₍₅₎ = C₅H₁₀. Verificación: el pentano (C₅H₁₂) pierde 2 átomos de H al formar un doble enlace. Respuesta: B."
      />

      <AutoCheck
        pregunta="Identifica el grupo funcional característico de los aldehídos."
        opciones={[
          "—OH",
          "—CO— (en carbono secundario)",
          "—CHO",
          "—COOH",
        ]}
        correctaIdx={2}
        explicacion="Paso 1 · El grupo carbonilo en un extremo de cadena unido a un hidrógeno (—CHO) define a los aldehídos. Paso 2 · Verificación: —OH es alcohol, —CO— interno es cetona y —COOH es ácido carboxílico. Respuesta: —CHO."
      />

      <AutoCheck
        pregunta="¿Cuál es el nombre IUPAC del compuesto CH₃—CH₂—COOH?"
        opciones={[
          "Ácido etanoico",
          "Propanona",
          "Propanol",
          "Ácido propanoico",
        ]}
        correctaIdx={3}
        explicacion="Paso 1 · Cuenta todos los carbonos de la cadena principal incluido el carbono del grupo —COOH: 1 + 1 + 1 = 3 carbonos (prefijo prop-). Paso 2 · Al tener la función ácido carboxílico (—COOH), su nombre IUPAC es ácido propanoico. Respuesta: ácido propanoico."
      />

      <AutoCheck
        pregunta="La urea, CO(NH₂)₂, principal producto nitrogenado de excreción proteica en humanos, pertenece a la función orgánica:"
        opciones={[
          "Amina",
          "Amida",
          "Nitrilo",
          "Éster",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · La urea presenta el grupo carbonilo (C=O) unido directamente a átomos de nitrógeno (—NH₂), estructura característica de las amidas (es la diamida del ácido carbónico). Paso 2 · Verificación: las aminas carecen de C=O unido al N y los nitrilos tienen —C≡N. Respuesta: amida."
      />

      <AutoCheck
        pregunta="[Banco UMSS · 2007-parcial1-1-2007 · Pregunta 20] Al quemar 3 mg de anilina (compuesto de C, H, N) se obtienen 8,52 mg de CO₂ y 2,03 mg de H₂O. ¿Cuál es su fórmula empírica?"
        opciones={[
          "C₃H₃.₅N₀.₅",
          "C₂H₅N",
          "C₆H₆N",
          "C₆H₇N",
        ]}
        correctaIdx={3}
        explicacion="Paso 1 · Masa de C = 8,52 × (12/44) = 2,324 mg (0,1936 mmol); masa de H = 2,03 × (2/18) = 0,226 mg (0,226 mmol). Paso 2 · Masa de N = 3 − 2,324 − 0,226 = 0,451 mg (0,451/14 = 0,0322 mmol). Paso 3 · Dividiendo entre 0,0322 mmol resulta C = 6, H = 7, N = 1 → C₆H₇N. Respuesta: C₆H₇N."
      />
    </EscenaRica>
  );
}
