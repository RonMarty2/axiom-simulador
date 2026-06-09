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
      unidad="MED-03"
      tituloUnidad="Sistema esquelético · Huesos y articulaciones"
      escenas={[
        { titulo: "Esqueleto · sostén del cuerpo", componente: EscIntro },
        { titulo: "Tipos de huesos por forma", componente: EscTiposHuesos },
        { titulo: "Estructura interna del hueso", componente: EscEstructura },
        { titulo: "Esqueleto axial y apendicular", componente: EscEsqueleto },
        { titulo: "Articulaciones · clasificación", componente: EscArticulaciones },
        { titulo: "Funciones del esqueleto", componente: EscFunciones },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Esqueleto · armazón vivo</Titulo>

      <Hook>
        Tu esqueleto NO es un material muerto: está VIVO. Se renueva por
        completo cada 10 años. Tiene vasos, nervios y hasta produce sangre.
        Un adulto tiene 206 huesos; un recién nacido nace con ~270 (muchos se
        fusionan al crecer).
      </Hook>

      <Definicion termino="Sistema esquelético">
        Conjunto de huesos, cartílagos, ligamentos y articulaciones que forman
        el armazón del cuerpo. Representa el 15–20% del peso corporal.
      </Definicion>

      <Mnemotecnia>
        <strong>"206 huesos adulto, 270 bebé."</strong> Es uno de los datos
        más preguntados.
      </Mnemotecnia>

      <Conexion>
        Trabaja en equipo con el sistema muscular (Unidad 4). Hueso + músculo
        = sistema locomotor.
      </Conexion>
    </EscenaRica>
  );
}

function EscTiposHuesos() {
  return (
    <EscenaRica>
      <Titulo>5 tipos de huesos según forma</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Clasificación morfológica
          </text>
          {[
            { x: 90, t: "Largos", d: "más largos que anchos", ej: "fémur, húmero" },
            { x: 290, t: "Cortos", d: "casi cúbicos", ej: "carpo, tarso" },
            { x: 490, t: "Planos", d: "delgados y anchos", ej: "cráneo, escápula, esternón" },
            { x: 200, y: 145, t: "Irregulares", d: "formas complejas", ej: "vértebras, mandíbula" },
            { x: 420, y: 145, t: "Sesamoideos", d: "dentro de tendones", ej: "rótula (patela)" },
          ].map((h, i) => (
            <g key={i} transform={`translate(${h.x}, ${h.y || 50})`}>
              <rect x={-10} y={0} width={180} height={85} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>{h.t}</text>
              <text x={80} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{h.d}</text>
              <text x={80} y={66} textAnchor="middle" fill={LIENZO.fg} fontSize={10} fontStyle="italic">{h.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"L-C-P-I-S: Largos, Cortos, Planos, Irregulares, Sesamoideos."</strong>
        Los 5 tipos morfológicos clásicos.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEstructura() {
  return (
    <EscenaRica>
      <Titulo>Estructura interna de un hueso largo</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Anatomía de un hueso largo (fémur)
          </text>
          {/* dibujo fémur */}
          <g transform="translate(280, 50)">
            <ellipse cx={80} cy={20} rx={50} ry={20} fill="#e5e7eb" stroke={LIENZO.fg} strokeWidth={1.5} />
            <rect x={60} y={30} width={40} height={130} fill="#e5e7eb" stroke={LIENZO.fg} strokeWidth={1.5} />
            <ellipse cx={80} cy={170} rx={50} ry={20} fill="#e5e7eb" stroke={LIENZO.fg} strokeWidth={1.5} />
            {/* médula */}
            <rect x={72} y={35} width={16} height={120} fill="#fbbf24" opacity={0.5} />
          </g>
          {/* etiquetas */}
          <line x1={280} y1={70} x2={210} y2={70} stroke={LIENZO.accent} strokeWidth={1} />
          <text x={205} y={73} textAnchor="end" fill={LIENZO.accent} fontSize={11} fontWeight={600}>Epífisis proximal</text>
          <text x={205} y={87} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>(hueso esponjoso)</text>

          <line x1={340} y1={130} x2={500} y2={130} stroke={LIENZO.accent} strokeWidth={1} />
          <text x={505} y={123} fill={LIENZO.accent} fontSize={11} fontWeight={600}>Diáfisis</text>
          <text x={505} y={137} fill={LIENZO.fgDim} fontSize={10}>(hueso compacto)</text>

          <line x1={355} y1={140} x2={500} y2={150} stroke={LIENZO.warn} strokeWidth={1} />
          <text x={505} y={155} fill={LIENZO.warn} fontSize={11} fontWeight={600}>Médula ósea</text>
          <text x={505} y={169} fill={LIENZO.fgDim} fontSize={10}>(amarilla en adulto)</text>

          <line x1={280} y1={210} x2={210} y2={210} stroke={LIENZO.accent} strokeWidth={1} />
          <text x={205} y={213} textAnchor="end" fill={LIENZO.accent} fontSize={11} fontWeight={600}>Epífisis distal</text>
        </svg>
      </Pizarra>

      <Definicion termino="Partes de un hueso largo">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Epífisis</strong> (extremos): hueso esponjoso con médula
            ósea ROJA (donde se hace sangre).</li>
          <li><strong>Diáfisis</strong> (cuerpo): hueso compacto, hueco por
            dentro.</li>
          <li><strong>Médula ósea</strong>: amarilla en el centro (grasa) y
            roja en epífisis (hematopoyesis).</li>
          <li><strong>Periostio</strong>: membrana que rodea al hueso, con vasos
            y nervios.</li>
        </ul>
      </Definicion>

      <Definicion termino="Células del hueso">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Osteoblastos:</strong> forman hueso nuevo.</li>
          <li><strong>Osteocitos:</strong> hueso maduro (mantienen el tejido).</li>
          <li><strong>Osteoclastos:</strong> destruyen hueso viejo (remodelación).</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Osteoblasto Brick (ladrillo), Osteoclasto Crush (destruir),
        Osteocito Inhabitant (habitante)."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEsqueleto() {
  return (
    <EscenaRica>
      <Titulo>Esqueleto axial vs apendicular</Titulo>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Dos grandes divisiones (206 huesos en total)
          </text>
          <g transform="translate(80, 50)">
            <rect width={280} height={170} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={140} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>AXIAL (80 huesos)</text>
            <text x={140} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">eje del cuerpo</text>
            <text x={20} y={70} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Cráneo (22):</text>
            <text x={40} y={86} fill={LIENZO.fgDim} fontSize={11}>8 craneales + 14 faciales</text>
            <text x={20} y={108} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Columna vertebral (26):</text>
            <text x={40} y={124} fill={LIENZO.fgDim} fontSize={11}>7 cervic + 12 torác + 5 lumb + sacro + cóccix</text>
            <text x={20} y={146} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Tórax:</text>
            <text x={40} y={162} fill={LIENZO.fgDim} fontSize={11}>esternón + 24 costillas</text>
          </g>
          <g transform="translate(380, 50)">
            <rect width={280} height={170} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} rx={10} />
            <text x={140} y={22} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>APENDICULAR (126)</text>
            <text x={140} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">extremidades + cinturas</text>
            <text x={20} y={70} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Cintura escapular:</text>
            <text x={40} y={86} fill={LIENZO.fgDim} fontSize={11}>clavícula + escápula</text>
            <text x={20} y={108} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Brazo a mano:</text>
            <text x={40} y={124} fill={LIENZO.fgDim} fontSize={11}>húmero, radio, cúbito, carpo, metacarpo, falanges</text>
            <text x={20} y={146} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Pelvis a pie:</text>
            <text x={40} y={162} fill={LIENZO.fgDim} fontSize={11}>fémur, tibia, peroné, tarso, metatarso, falanges</text>
          </g>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Axial = eje (cabeza, columna, tórax). Apendicular = apéndices
        (brazos, piernas)."</strong> 80 + 126 = 206.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscArticulaciones() {
  return (
    <EscenaRica>
      <Titulo>Articulaciones · uniones entre huesos</Titulo>

      <Definicion termino="Articulación">
        Punto de contacto entre 2 o más huesos. Se clasifican por la cantidad
        de movimiento que permiten.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 tipos de articulaciones
          </text>
          {[
            { x: 90, t: "Sinartrosis", mov: "Inmóviles", ej: "suturas del cráneo", c: LIENZO.bad },
            { x: 290, t: "Anfiartrosis", mov: "Semimóviles", ej: "vértebras (entre cuerpos)", c: LIENZO.warn },
            { x: 490, t: "Diartrosis", mov: "Móviles (sinoviales)", ej: "rodilla, hombro, codo", c: LIENZO.ok },
          ].map((a, i) => (
            <g key={i} transform={`translate(${a.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={120} fill={a.c} opacity={0.1} stroke={a.c} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={a.c} fontSize={12} fontWeight={700}>{a.t}</text>
              <text x={80} y={50} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{a.mov}</text>
              <text x={80} y={85} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">{a.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Articulación sinovial (diartrosis)">
        Tiene cartílago articular, cápsula, líquido sinovial (lubricante),
        ligamentos. Tipos según movimiento: esférica (hombro), bisagra (codo,
        rodilla), pivote (atlas-axis), plana (vértebras), elipsoide (muñeca),
        en silla de montar (pulgar).
      </Definicion>

      <Mnemotecnia>
        <strong>"Sin = sin movimiento. Anfi = semi. Di = doble (libre)."</strong>
        Los prefijos griegos.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscFunciones() {
  return (
    <EscenaRica>
      <Titulo>5 funciones del esqueleto</Titulo>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Para qué sirve el esqueleto?
          </text>
          {[
            { t: "Sostén", d: "armazón del cuerpo" },
            { t: "Protección", d: "cráneo→cerebro, costillas→pulmón+corazón, columna→médula" },
            { t: "Movimiento", d: "palancas donde se insertan músculos" },
            { t: "Hematopoyesis", d: "médula ósea ROJA produce glóbulos" },
            { t: "Reserva mineral", d: "Ca²⁺, P (99% Ca del cuerpo en huesos)" },
          ].map((f, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 33})`}>
              <rect width={580} height={27} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1} rx={4} />
              <text x={15} y={18} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{i + 1}. {f.t}</text>
              <text x={170} y={18} fill={LIENZO.fg} fontSize={11}>{f.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        En la <strong>osteoporosis</strong>, los osteoclastos destruyen más
        hueso del que los osteoblastos pueden reponer. Resultado: huesos
        frágiles. Más común en mujeres posmenopáusicas (caída de estrógenos).
        Prevención: Ca, vitamina D, ejercicio con carga.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'El hueso es material muerto'">
        <strong>Realidad:</strong> tiene células vivas, vasos, nervios. Se
        remodela constantemente.
      </Misconception>

      <Misconception titulo="Error 2 · 'Bebés tienen menos huesos que adultos'">
        <strong>Realidad:</strong> al revés. Nacen con ~270 que se fusionan
        hasta llegar a 206.
      </Misconception>

      <Misconception titulo="Error 3 · 'Toda la médula hace sangre'">
        <strong>Realidad:</strong> solo la médula ROJA hace sangre. La amarilla
        (centro de diáfisis en adultos) es grasa.
      </Misconception>

      <Resumen>
        206 huesos en adulto. 5 formas (largos, cortos, planos, irregulares,
        sesamoideos). Estructura: epífisis (esponjoso) + diáfisis (compacto)
        + médula. Esqueleto axial (80) + apendicular (126). Articulaciones:
        sin/anfi/diartrosis. 5 funciones (sostén, protección, movimiento,
        hematopoyesis, reserva de Ca).
      </Resumen>

      <AutoCheck
        pregunta="¿Cuántos huesos tiene un adulto?"
        opciones={["180", "206", "270", "300"]}
        correctaIdx={1}
        explicacion="206 huesos en un adulto promedio."
      />

      <AutoCheck
        pregunta="¿Qué tipo de hueso es la rótula?"
        opciones={["largo", "corto", "plano", "sesamoideo"]}
        correctaIdx={3}
        explicacion="La rótula (patela) está dentro del tendón del cuádriceps: es sesamoideo."
      />

      <AutoCheck
        pregunta="¿Dónde se produce la sangre?"
        opciones={[
          "diáfisis (centro)",
          "periostio",
          "médula ósea roja (epífisis)",
          "cartílago articular",
        ]}
        correctaIdx={2}
        explicacion="La hematopoyesis ocurre en la médula roja, presente en epífisis y huesos planos."
      />

      <AutoCheck
        pregunta="¿Cuántas vértebras CERVICALES tiene la columna?"
        opciones={["5", "7", "12", "26"]}
        correctaIdx={1}
        explicacion="7 cervicales, 12 torácicas, 5 lumbares + sacro y cóccix = 26 total."
      />
    </EscenaRica>
  );
}
