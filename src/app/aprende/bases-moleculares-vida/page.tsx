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
      unidad="BIO-02"
      tituloUnidad="Bases moleculares de la vida · Biomoléculas"
      escenas={[
        { titulo: "Biomoléculas · panorama", componente: EscIntro },
        { titulo: "Glúcidos (carbohidratos)", componente: EscGlucidos },
        { titulo: "Lípidos (grasas)", componente: EscLipidos },
        { titulo: "Proteínas · estructura y función", componente: EscProteinas },
        { titulo: "Enzimas · proteínas con función catalítica", componente: EscEnzimas },
        { titulo: "Ácidos nucleicos · ADN y ARN", componente: EscAcidosNucleicos },
        { titulo: "Replicación, transcripción, traducción", componente: EscDogma },
        { titulo: "Tabla comparativa final", componente: EscComparativa },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Biomoléculas · los 4 grupos fundamentales</Titulo>

      <Hook>
        Con solo 4 tipos de moléculas (glúcidos, lípidos, proteínas y ácidos
        nucleicos), la naturaleza construye desde una bacteria hasta una
        ballena azul. ¿Cómo lo hace? Combinando bloques simples en estructuras
        cada vez más complejas.
      </Hook>

      <Definicion termino="Biomoléculas orgánicas">
        Moléculas con esqueleto de carbono que forman parte de los seres vivos.
        Se clasifican en 4 grandes grupos según su función y composición.
      </Definicion>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Los 4 tipos de biomoléculas
          </text>
          {[
            { x: 100, t: "Glúcidos", e: "CHO", fn: "energía rápida", ej: "glucosa, almidón", c: "#f59e0b" },
            { x: 290, t: "Lípidos", e: "CHO (poco O)", fn: "reserva energía, membranas", ej: "grasas, colesterol", c: "#eab308" },
            { x: 480, t: "Proteínas", e: "CHON(S)", fn: "estructura, enzimas, transporte", ej: "hemoglobina, queratina", c: "#10b981" },
            { x: 100, y: 145, t: "Ácidos nucleicos", e: "CHONP", fn: "info genética", ej: "ADN, ARN", c: "#a78bfa" },
          ].map((b, i) => (
            <g key={i} transform={`translate(${b.x - 70}, ${b.y || 50})`}>
              <rect width={150} height={90} fill={b.c} opacity={0.1} stroke={b.c} strokeWidth={1.5} rx={10} />
              <text x={75} y={22} textAnchor="middle" fill={b.c} fontSize={13} fontWeight={700}>{b.t}</text>
              <text x={75} y={40} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>Elementos: {b.e}</text>
              <text x={75} y={58} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{b.fn}</text>
              <text x={75} y={78} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">ej: {b.ej}</text>
            </g>
          ))}
          <text x={500} y={195} fill={LIENZO.warn} fontSize={12} fontWeight={600}>
            Todos: monómeros + polímeros
          </text>
          <text x={500} y={215} fill={LIENZO.fgDim} fontSize={11}>
            (bloques que se unen por enlaces específicos)
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Glúcidos = azúcar; Lípidos = grasa; Proteínas = músculo;
        Ácidos nucleicos = ADN."</strong> Esa es la traducción "callejera".
      </Mnemotecnia>

      <Conexion>
        Necesitas dominar: bioelementos (Unidad 1). La química orgánica te
        ayuda pero no es prerrequisito estricto.
      </Conexion>
    </EscenaRica>
  );
}

function EscGlucidos() {
  return (
    <EscenaRica>
      <Titulo>Glúcidos · combustible rápido del cuerpo</Titulo>

      <Definicion termino="Glúcidos (carbohidratos)">
        Biomoléculas formadas por C, H, O en proporción Cn(H₂O)n (de ahí
        "hidratos de carbono"). Fórmula general: <strong>(CH₂O)n</strong>.
      </Definicion>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Clasificación por número de unidades
          </text>
          {[
            { x: 90, t: "Monosacárido", n: "1", ej: "glucosa, fructosa, galactosa", c: "#f59e0b" },
            { x: 290, t: "Disacárido", n: "2", ej: "sacarosa, lactosa, maltosa", c: "#fb923c" },
            { x: 490, t: "Polisacárido", n: "muchas", ej: "almidón, glucógeno, celulosa", c: "#ef4444" },
          ].map((g, i) => (
            <g key={i} transform={`translate(${g.x}, 50)`}>
              <rect x={-10} y={0} width={180} height={140} fill={g.c} opacity={0.1} stroke={g.c} strokeWidth={1.5} rx={10} />
              <text x={80} y={25} textAnchor="middle" fill={g.c} fontSize={13} fontWeight={700}>{g.t}</text>
              <text x={80} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>n = {g.n}</text>
              {/* representación visual */}
              {g.t === "Monosacárido" && (
                <circle cx={80} cy={80} r={14} fill={g.c} opacity={0.6} />
              )}
              {g.t === "Disacárido" && (
                <>
                  <circle cx={68} cy={80} r={12} fill={g.c} opacity={0.6} />
                  <circle cx={92} cy={80} r={12} fill={g.c} opacity={0.6} />
                </>
              )}
              {g.t === "Polisacárido" && [0, 1, 2, 3, 4].map((j) => (
                <circle key={j} cx={50 + j * 15} cy={80} r={8} fill={g.c} opacity={0.6} />
              ))}
              <text x={80} y={115} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{g.ej}</text>
            </g>
          ))}
          <text x={360} y={220} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={600}>
            Enlace entre monosacáridos: enlace glucosídico (libera H₂O)
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Glucosa (C₆H₁₂O₆)">
        El monosacárido más importante. Combustible principal de las células,
        especialmente del cerebro (que NO usa grasas).
      </Definicion>

      <Definicion termino="Reserva energética">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Almidón:</strong> reserva en plantas (papa, trigo, arroz).</li>
          <li><strong>Glucógeno:</strong> reserva en animales (hígado, músculo).</li>
          <li><strong>Celulosa:</strong> estructural en plantas (pared celular). Humanos no la digerimos: fibra.</li>
          <li><strong>Quitina:</strong> estructural en insectos y hongos.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Mono = simple; Di = dos; Poli = muchos."</strong> Disacárido
        clave: sacarosa = glucosa + fructosa (azúcar de mesa).
      </Mnemotecnia>

      <Cuidado>
        Glúcidos = 4 kcal/g. Es la fuente de energía RÁPIDA: se usan primero
        que las grasas (9 kcal/g, lentas) o las proteínas (4 kcal/g, último
        recurso).
      </Cuidado>
    </EscenaRica>
  );
}

function EscLipidos() {
  return (
    <EscenaRica>
      <Titulo>Lípidos · reserva, membranas, hormonas</Titulo>

      <Hook>
        Si los glúcidos son la billetera (energía a mano), los lípidos son la
        cuenta de ahorro: guardan MUCHA energía por gramo, pero tardan en
        movilizarse.
      </Hook>

      <Definicion termino="Lípidos">
        Biomoléculas heterogéneas con un rasgo común: son INSOLUBLES en agua y
        solubles en solventes orgánicos (éter, cloroformo, alcohol).
      </Definicion>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Clasificación principal de lípidos
          </text>
          {[
            // Las cajas miden 42 de alto: si van cada 50, se pisan. Cada 50 con
            // la primera en 50 daba 50-92 y la segunda arrancaba en 80.
            { x: 90, t: "Triglicéridos", d: "glicerol + 3 ácidos grasos", fn: "RESERVA energética (tejido adiposo)", y: 50 },
            { x: 90, t: "Fosfolípidos", d: "glicerol + 2 ácidos grasos + grupo fosfato", fn: "membrana celular (bicapa)", y: 100 },
            { x: 90, t: "Esteroides", d: "estructura cíclica de 4 anillos", fn: "colesterol, hormonas (testosterona, estradiol)", y: 150 },
            { x: 90, t: "Ceras", d: "cadena larga", fn: "impermeabilización (hojas, plumas, oídos)", y: 200 },
          ].map((l, i) => (
            <g key={i} transform={`translate(${l.x}, ${l.y || 50})`}>
              <rect width={560} height={42} fill={LIENZO.warn} opacity={0.08} stroke={LIENZO.warn} strokeWidth={1} rx={6} />
              <text x={10} y={22} fill={LIENZO.warn} fontSize={13} fontWeight={700}>{l.t}:</text>
              <text x={130} y={22} fill={LIENZO.fg} fontSize={11}>{l.d}</text>
              <text x={130} y={36} fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">→ {l.fn}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Ácidos grasos">
        Cadenas largas de carbono con un grupo -COOH al final.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Saturados:</strong> sin dobles enlaces, sólidos (manteca).</li>
          <li><strong>Insaturados:</strong> uno o más dobles enlaces, líquidos (aceites).</li>
          <li><strong>Esenciales (Omega 3 y 6):</strong> el cuerpo NO los sintetiza, hay que comerlos.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Los lípidos aportan <strong>9 kcal/g</strong>, más del DOBLE que los
        glúcidos y proteínas (4 kcal/g). Por eso engordan más fácil.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Grasa = reserva, fosfolípido = membrana, esteroide = hormona,
        cera = impermeable."</strong> Las 4 funciones principales.
      </Mnemotecnia>

      <AutoCheck
        pregunta="¿Qué lípido forma la BICAPA de las membranas celulares?"
        opciones={["Triglicéridos", "Fosfolípidos", "Esteroides", "Ceras"]}
        correctaIdx={1}
        explicacion="Los fosfolípidos son anfipáticos (cabeza polar + colas hidrofóbicas) y forman la bicapa."
      />
    </EscenaRica>
  );
}

function EscProteinas() {
  return (
    <EscenaRica>
      <Titulo>Proteínas · las multitarea de la célula</Titulo>

      <Hook>
        Hay más de 100,000 proteínas distintas en el cuerpo humano. Hacen casi
        TODO: te dan forma (queratina), te mueven (actina/miosina), te
        transportan O₂ (hemoglobina), te defienden (anticuerpos), te aceleran
        reacciones (enzimas)…
      </Hook>

      <Definicion termino="Proteínas">
        Polímeros de aminoácidos (aa) unidos por enlaces peptídicos. Contienen
        SIEMPRE C, H, O, N; muchas también S (cisteína, metionina).
      </Definicion>

      <Definicion termino="Aminoácido (aa)">
        Monómero de las proteínas. 20 tipos diferentes en seres vivos.
        Estructura común: grupo amino (-NH₂) + grupo carboxilo (-COOH) + un
        grupo R variable.
      </Definicion>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 niveles estructurales de las proteínas
          </text>
          {[
            { x: 90, t: "Primaria", d: "secuencia lineal de aa", c: "#3b82f6" },
            { x: 290, t: "Secundaria", d: "α-hélice o lámina β (puentes H)", c: "#10b981" },
            { x: 490, t: "Terciaria", d: "estructura 3D (puentes S-S, otras)", c: "#a78bfa" },
            { x: 290, t: "Cuaternaria", d: "varias cadenas (hemoglobina: 4)", c: "#ef4444", y: 150 },
          ].map((n, i) => (
            <g key={i} transform={`translate(${n.x - 80}, ${n.y || 50})`}>
              <rect width={160} height={90} fill={n.c} opacity={0.1} stroke={n.c} strokeWidth={1.5} rx={10} />
              <text x={80} y={25} textAnchor="middle" fill={n.c} fontSize={13} fontWeight={700}>{n.t}</text>
              <text x={80} y={68} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{n.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Desnaturalización">
        Pérdida de la estructura 3D de una proteína por calor, ácido, base o
        sales. Pierde su función. Ejemplo: clara de huevo cocida = albúmina
        desnaturalizada.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Funciones de las proteínas
          </text>
          {[
            { x: 100, t: "Estructural", ej: "queratina, colágeno", c: "#3b82f6" },
            { x: 290, t: "Catalítica", ej: "enzimas", c: "#10b981" },
            { x: 480, t: "Transporte", ej: "hemoglobina", c: "#ef4444" },
            { x: 100, y: 130, t: "Defensa", ej: "anticuerpos", c: "#a78bfa" },
            { x: 290, y: 130, t: "Movimiento", ej: "actina, miosina", c: "#f59e0b" },
            { x: 480, y: 130, t: "Hormonal", ej: "insulina", c: "#06b6d4" },
          ].map((f, i) => (
            <g key={i} transform={`translate(${f.x - 70}, ${f.y || 50})`}>
              <rect width={140} height={60} fill={f.c} opacity={0.1} stroke={f.c} strokeWidth={1.5} rx={8} />
              <text x={70} y={24} textAnchor="middle" fill={f.c} fontSize={12} fontWeight={700}>{f.t}</text>
              <text x={70} y={46} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">{f.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>20 aa estándar.</strong> 9 son "esenciales" (hay que comerlos):
        Leu, Ile, Lys, Met, Phe, Thr, Trp, Val, His.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEnzimas() {
  return (
    <EscenaRica>
      <Titulo>Enzimas · catalizadores biológicos</Titulo>

      <Hook>
        Sin enzimas, descomponer una manzana en glucosa te llevaría miles de
        años. Con enzimas, lo haces en horas. Aceleran las reacciones
        biológicas hasta 10⁶ veces, sin consumirse.
      </Hook>

      <Definicion termino="Enzima">
        Proteína (mayoritariamente) que cataliza una reacción química
        específica. Reduce la energía de activación, sin alterar el equilibrio.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Modelo "llave-cerradura"
          </text>
          {/* Enzima */}
          <path d="M 100 110 Q 100 60 180 60 L 230 60 Q 240 90 220 105 L 280 105 Q 290 130 270 150 L 100 150 Z"
            fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={2} />
          <text x={170} y={130} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>Enzima</text>
          <text x={250} y={85} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>sitio activo</text>

          {/* Sustrato */}
          <g transform="translate(420, 90)">
            <rect width={60} height={30} rx={6} fill={LIENZO.bad} opacity={0.5} />
            <text x={30} y={20} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>sustrato</text>
          </g>

          {/* Flecha */}
          <line x1={510} x2={580} y1={105} y2={105} stroke={LIENZO.accent} strokeWidth={2} markerEnd="url(#enzArr)" />
          <defs>
            <marker id="enzArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.accent} />
            </marker>
          </defs>

          {/* Productos */}
          <g transform="translate(600, 80)">
            <circle r={12} cx={15} cy={20} fill="#a78bfa" />
            <circle r={12} cx={50} cy={35} fill="#06b6d4" />
            <text x={32} y={70} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>productos</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Características clave">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Específicas:</strong> cada enzima actúa sobre un sustrato concreto.</li>
          <li><strong>Eficientes:</strong> aceleran 10⁴–10⁸ veces.</li>
          <li><strong>Reutilizables:</strong> no se consumen.</li>
          <li><strong>Reguladas:</strong> activadas o inhibidas por iones, pH, T.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Las enzimas son <strong>sensibles a T y pH</strong>. Cada una tiene un
        óptimo. Fuera de él, se desnaturalizan y pierden función. Por eso la
        fiebre alta es peligrosa: a 42 °C muchas enzimas se desnaturalizan.
      </Cuidado>

      <Mnemotecnia>
        Nomenclatura: la enzima termina en <strong>"-asa"</strong>. Ejemplos:
        amilasa (digiere almidón), lipasa (lípidos), proteasa (proteínas),
        lactasa (lactosa), DNA polimerasa, etc.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscAcidosNucleicos() {
  return (
    <EscenaRica>
      <Titulo>Ácidos nucleicos · el manual de la vida</Titulo>

      <Hook>
        Cada célula tuya contiene ~2 metros de ADN enrollados. Si pusieras
        todo el ADN de tu cuerpo en línea recta, daría 100 vueltas al sistema
        solar. Y todo el "manual" para fabricarte cabe en un solo óvulo.
      </Hook>

      <Definicion termino="Ácido nucleico">
        Polímero de NUCLEÓTIDOS. Cada nucleótido = base nitrogenada + azúcar
        (pentosa) + grupo fosfato.<br /><br />
        Dos tipos: <strong>ADN</strong> (almacena información) y <strong>ARN</strong>
        (la transporta y traduce).
      </Definicion>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 720 300" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ADN vs ARN
          </text>
          {/* encabezados */}
          {["Característica", "ADN", "ARN"].map((h, i) => (
            <g key={i}>
              <rect x={60 + i * 200} y={50} width={195} height={30} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={60 + i * 200 + 97} y={70} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Azúcar", a: "Desoxirribosa", r: "Ribosa" },
            { c: "Bases", a: "A, T, G, C", r: "A, U, G, C" },
            { c: "Hebras", a: "Doble (hélice)", r: "Simple (lineal)" },
            { c: "Tamaño", a: "Muy largo", r: "Más corto" },
            { c: "Función", a: "Almacenar info", r: "Transcribir, traducir" },
            { c: "Ubicación", a: "Núcleo, mitocondria", r: "Núcleo + citoplasma" },
          ].map((row, i) => (
            <g key={i}>
              {[row.c, row.a, row.r].map((v, j) => (
                <g key={j}>
                  <rect x={60 + j * 200} y={80 + i * 30} width={195} height={30} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={60 + j * 200 + 97} y={100 + i * 30} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Reglas de complementariedad (Chargaff)">
        En el ADN, las bases se aparean SIEMPRE de la misma forma:<br /><br />
        <strong>A — T</strong> (2 puentes H) | <strong>G — C</strong> (3 puentes H)<br />
        En ARN: A — U (porque ARN no tiene T).
      </Definicion>

      <Mnemotecnia>
        <strong>"A con T, G con C."</strong> A = adenina; T = timina; G = guanina;
        C = citosina; U = uracilo (solo en ARN).
      </Mnemotecnia>

      <Cuidado>
        <strong>Chargaff habla de la molécula entera, no de una hebra suelta.</strong>{" "}
        Si una molécula de ADN (sus dos hebras juntas) tiene 30% de A, entonces
        tiene 30% de T, y las purinas (A+G) igualan a las pirimidinas (T+C): 50%
        cada categoría. Y tiene que ser así, porque cada A de una hebra está
        emparejada con una T de la otra. En una hebra sola, en cambio, puede
        haber 40% de A y 10% de T sin ningún problema: ahí no hay pareja que
        obligue a nada.
      </Cuidado>
    </EscenaRica>
  );
}

function EscDogma() {
  return (
    <EscenaRica>
      <Titulo>Dogma central · ADN → ARN → Proteína</Titulo>

      <Definicion termino="Dogma central de la biología molecular">
        Flujo de información genética. Tres procesos clave:<br />
        <strong>1. Replicación:</strong> ADN → ADN (copiar para dividirse).<br />
        <strong>2. Transcripción:</strong> ADN → ARNm (sacar copia móvil).<br />
        <strong>3. Traducción:</strong> ARNm → proteína (leer en ribosoma).
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Flujo de información
          </text>

          {[
            { x: 120, t: "ADN", c: "#3b82f6", y: 110 },
            { x: 360, t: "ARNm", c: "#10b981", y: 110 },
            { x: 600, t: "Proteína", c: "#a78bfa", y: 110 },
          ].map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={b.y} r={40} fill={b.c} opacity={0.15} stroke={b.c} strokeWidth={2} />
              <text x={b.x} y={b.y + 6} textAnchor="middle" fill={b.c} fontSize={14} fontWeight={700}>{b.t}</text>
            </g>
          ))}

          {/* Flechas */}
          <line x1={170} x2={310} y1={110} y2={110} stroke={LIENZO.fg} strokeWidth={2} markerEnd="url(#fa)" />
          <text x={240} y={100} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={600}>Transcripción</text>

          <line x1={410} x2={550} y1={110} y2={110} stroke={LIENZO.fg} strokeWidth={2} markerEnd="url(#fa)" />
          <text x={480} y={100} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={600}>Traducción</text>

          {/* Replicación: bucle */}
          <path d="M 80 110 Q 60 60 120 70" fill="none" stroke={LIENZO.warn} strokeWidth={2} markerEnd="url(#fa)" />
          <text x={50} y={50} fill={LIENZO.warn} fontSize={11} fontWeight={600}>Replicación</text>

          <defs>
            <marker id="fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
          </defs>

          <text x={360} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            La traducción ocurre en el ribosoma, leída en tripletes (codones)
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Código genético">
        Cada 3 bases (codón) del ARNm codifican 1 aminoácido. 64 codones para
        20 aa = código DEGENERADO (varios codones para el mismo aa). Hay codón
        de inicio (AUG = Met) y de paro (UAA, UAG, UGA).
      </Definicion>

      <Mnemotecnia>
        <strong>"AUG arranca; UAA, UAG, UGA paran."</strong> Estos son los
        codones reguladores que aparecen casi siempre en exámenes.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscComparativa() {
  return (
    <EscenaRica>
      <Titulo>Tabla comparativa final</Titulo>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Las 4 biomoléculas, lado a lado
          </text>
          {["Biomolécula", "Monómero", "Enlace", "Función principal", "Calorías"].map((h, i) => (
            <g key={i}>
              <rect x={20 + i * 138} y={40} width={134} height={30} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={20 + i * 138 + 67} y={60} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            ["Glúcido", "monosacárido", "glucosídico", "energía rápida", "4 kcal/g"],
            ["Lípido", "ácido graso / glicerol", "éster", "reserva, membranas", "9 kcal/g"],
            ["Proteína", "aminoácido", "peptídico", "estructura, enzimas", "4 kcal/g"],
            ["Ácido nucleico", "nucleótido", "fosfodiéster", "info genética", "—"],
          ].map((row, i) => (
            <g key={i}>
              {row.map((v, j) => (
                <g key={j}>
                  <rect x={20 + j * 138} y={70 + i * 50} width={134} height={50} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={20 + j * 138 + 67} y={98 + i * 50} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Resumen>
        Glúcidos (CHO): energía rápida, monómero glucosa. Lípidos (CHO poco
        O, también NP): reserva + membranas, no son polímeros estrictos.
        Proteínas (CHONS): 20 aa, 4 niveles estructurales, multifunción.
        Ácidos nucleicos (CHONP): ADN (info) + ARN (mensajero, ribosomal,
        transferencia).
      </Resumen>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Las proteínas son solo músculo'">
        <strong>Pensar:</strong> que las proteínas sirven para hacer músculo.<br />
        <strong>Realidad:</strong> SOLO un porcentaje pequeño es estructural
        muscular. Las proteínas hacen TODO: enzimas, transporte (hemoglobina),
        defensa (anticuerpos), hormonas (insulina)…
      </Misconception>

      <Misconception titulo="Error 2 · 'El ADN tiene U'">
        <strong>Pensar:</strong> que el ADN tiene uracilo.<br />
        <strong>Realidad:</strong> ADN tiene T (timina). ARN tiene U (uracilo).
        Bases ADN: A, T, G, C. Bases ARN: A, U, G, C.
      </Misconception>

      <Misconception titulo="Error 3 · 'Los lípidos no tienen función estructural'">
        <strong>Pensar:</strong> que los lípidos son solo reserva.<br />
        <strong>Realidad:</strong> los fosfolípidos forman la bicapa de TODAS
        las membranas. El colesterol da fluidez a las membranas animales.
      </Misconception>

      <Misconception titulo="Error 4 · 'Una enzima se gasta con cada reacción'">
        <strong>Pensar:</strong> que las enzimas se consumen.<br />
        <strong>Realidad:</strong> son catalizadores. Vuelven a estar libres
        después de cada reacción. Una misma enzima cataliza miles de eventos
        por segundo.
      </Misconception>

      <Resumen>
        4 biomoléculas. 4 grupos de funciones. Cada examen FCyT trae 1–2
        preguntas: identificación por composición elemental, función o
        clasificación por número de subunidades.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué biomolécula contiene SIEMPRE N pero NO P?"
        opciones={["Glúcidos", "Lípidos", "Proteínas", "Ácidos nucleicos"]}
        correctaIdx={2}
        explicacion="Proteínas: CHONS (sin P). Ácidos nucleicos: CHONP (con P y N)."
      />

      <AutoCheck
        pregunta="Una molécula de ADN tiene 20% de A. ¿Qué % de G tiene?"
        opciones={["20%", "30%", "40%", "50%"]}
        correctaIdx={1}
        explicacion="Ojo que dice MOLÉCULA (las dos hebras), que es donde vale Chargaff: si fuera una hebra sola el dato no alcanzaría. A=T=20%, juntos 40%. Lo que queda para G+C es 60%, y G=C, así que 30% cada uno."
      />

      <AutoCheck
        pregunta="¿Cuál es el monómero de las proteínas?"
        opciones={["nucleótido", "monosacárido", "aminoácido", "ácido graso"]}
        correctaIdx={2}
        explicacion="Las proteínas son cadenas de aminoácidos (20 tipos) unidos por enlaces peptídicos."
      />

      <AutoCheck
        pregunta="¿Qué biomolécula almacena MÁS energía por gramo en los animales?"
        opciones={["almidón", "glucógeno", "celulosa", "triglicéridos"]}
        correctaIdx={3}
        explicacion="Triglicéridos: 9 kcal/g, más del doble que un glúcido. Ojo con la diferencia: el glucógeno también es reserva, pero de corto plazo (hígado y músculo) y rinde menos por gramo. Por eso la pregunta dice 'más energía por gramo' y no solo 'reserva'."
      />

      <AutoCheck
        pregunta="La enzima amilasa actúa sobre:"
        opciones={["proteínas", "almidón", "lípidos", "ácidos nucleicos"]}
        correctaIdx={1}
        explicacion="amilasa → 'amil' = almidón. Lipasa → lípidos. Proteasa → proteínas."
      />
    </EscenaRica>
  );
}
