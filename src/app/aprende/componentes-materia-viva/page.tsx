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
      unidad="BIO-01"
      tituloUnidad="Componentes de la materia viva · Bioelementos"
      escenas={[
        { titulo: "¿Qué es la materia viva?", componente: EscIntro },
        { titulo: "Niveles de organización", componente: EscNiveles },
        { titulo: "Bioelementos primarios", componente: EscPrimarios },
        { titulo: "Bioelementos secundarios y oligoelementos", componente: EscSecundarios },
        { titulo: "El agua · solvente universal", componente: EscAgua },
        { titulo: "Sales minerales", componente: EscSales },
        { titulo: "Tabla resumen y bioelementos en Bolivia", componente: EscBolivia },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Materia viva · de qué estamos hechos</Titulo>

      <Hook>
        El 96% de tu cuerpo está hecho de solo 4 elementos: C, H, O, N. El otro
        4% se reparte entre 22 elementos más. ¿Por qué la vida usa tan pocos
        materiales de los 118 de la tabla periódica?
      </Hook>

      <Definicion termino="Materia viva">
        Conjunto de sustancias que conforman a los seres vivos. Se caracteriza
        por:
        <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
          <li>Organización compleja en niveles jerárquicos.</li>
          <li>Composición a base de C, H, O, N (96%).</li>
          <li>Capacidad de metabolismo, crecimiento y reproducción.</li>
        </ul>
      </Definicion>

      <Definicion termino="Bioelemento">
        Elemento químico que forma parte de los seres vivos. Se clasifican
        según su abundancia en: primarios, secundarios y oligoelementos.
      </Definicion>

      <Mnemotecnia>
        <strong>"CHON manda."</strong> Carbono, Hidrógeno, Oxígeno y Nitrógeno
        son los 4 bioelementos primarios estructurales.
      </Mnemotecnia>

      <Conexion>
        Lo que ves acá es la base de TODAS las biomoléculas (Unidad 2):
        proteínas, lípidos, glúcidos y ácidos nucleicos.
      </Conexion>
    </EscenaRica>
  );
}

function EscNiveles() {
  return (
    <EscenaRica>
      <Titulo>Niveles de organización biológica</Titulo>

      <Parrafo>
        La materia viva se organiza en niveles, desde lo más simple (átomos)
        hasta lo más complejo (ecosistemas). Cada nivel construye al siguiente.
      </Parrafo>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 720 300" preserveAspectRatio="xMidYMid meet">
          {[
            { y: 30, t: "Átomo", ej: "C, H, O, N", c: "#3b82f6" },
            { y: 60, t: "Molécula", ej: "H₂O, glucosa, ATP", c: "#06b6d4" },
            { y: 90, t: "Macromolécula", ej: "proteína, ADN", c: "#10b981" },
            { y: 120, t: "Organelo", ej: "mitocondria, núcleo", c: "#84cc16" },
            { y: 150, t: "Célula", ej: "neurona, glóbulo rojo", c: "#eab308" },
            { y: 180, t: "Tejido", ej: "muscular, nervioso", c: "#f59e0b" },
            { y: 210, t: "Órgano", ej: "corazón, hígado", c: "#f97316" },
            { y: 240, t: "Sistema/aparato", ej: "circulatorio, digestivo", c: "#ef4444" },
            { y: 270, t: "Organismo", ej: "un ser vivo completo", c: "#a78bfa" },
          ].map((n, i) => (
            <g key={i} transform={`translate(60, ${n.y - 12})`}>
              <rect width={30} height={20} fill={n.c} opacity={0.3} stroke={n.c} strokeWidth={1.5} rx={4} />
              <text x={15} y={14} textAnchor="middle" fill={n.c} fontSize={11} fontWeight={700}>{i + 1}</text>
              <text x={110} y={14} fill={LIENZO.fg} fontSize={13} fontWeight={600}>{n.t}</text>
              <text x={290} y={14} fill={LIENZO.fgDim} fontSize={12} fontStyle="italic">{n.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        Sobre el organismo hay niveles supraorganísmicos: <strong>población,
        comunidad, ecosistema, biosfera</strong>. Los estudiamos en Ecología
        (Unidad 7).
      </Cuidado>

      <AutoCheck
        pregunta="Ordena de menor a mayor complejidad: tejido, órgano, célula, organismo."
        opciones={[
          "órgano → tejido → célula → organismo",
          "célula → tejido → órgano → organismo",
          "organismo → órgano → tejido → célula",
          "tejido → célula → órgano → organismo",
        ]}
        correctaIdx={1}
        explicacion="Las células forman tejidos, los tejidos forman órganos, los órganos forman organismos."
      />
    </EscenaRica>
  );
}

function EscPrimarios() {
  return (
    <EscenaRica>
      <Titulo>Bioelementos primarios · CHON(SP)</Titulo>

      <Definicion termino="Bioelementos primarios">
        Elementos presentes en mayor proporción (96–99% de la masa total). Son
        la base estructural de todas las biomoléculas.
      </Definicion>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            6 bioelementos primarios — CHONSP
          </text>
          {[
            { x: 100, sym: "C", per: "18%", t: "Carbono", rol: "esqueleto orgánico", c: "#374151" },
            { x: 240, sym: "H", per: "10%", t: "Hidrógeno", rol: "agua, biomoléculas", c: "#60a5fa" },
            { x: 380, sym: "O", per: "65%", t: "Oxígeno", rol: "respiración, H₂O", c: "#ef4444" },
            { x: 520, sym: "N", per: "3%", t: "Nitrógeno", rol: "proteínas, ADN", c: "#10b981" },
            { x: 170, sym: "S", per: "0.3%", t: "Azufre", rol: "aa cisteína, metionina", c: "#eab308", y: 150 },
            { x: 450, sym: "P", per: "1%", t: "Fósforo", rol: "ADN, ATP, huesos", c: "#a78bfa", y: 150 },
          ].map((e, i) => (
            <g key={i} transform={`translate(${e.x}, ${e.y || 50})`}>
              <circle cx={50} cy={40} r={32} fill={e.c} opacity={0.2} stroke={e.c} strokeWidth={2.5} />
              <text x={50} y={48} textAnchor="middle" fill={e.c} fontSize={26} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{e.sym}</text>
              <text x={50} y={88} textAnchor="middle" fill={LIENZO.fg} fontSize={12} fontWeight={700}>{e.t}</text>
              <text x={50} y={102} textAnchor="middle" fill={LIENZO.accent} fontSize={11}>{e.per}</text>
              <text x={50} y={116} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{e.rol}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"CHON SP"</strong> — pronunciado "chonsp". Los 4 primeros
        (CHON) son los súper-primarios; S y P aparecen en biomoléculas
        específicas (proteínas con S, ADN/ATP/huesos con P).
      </Mnemotecnia>

      <WorkedExample titulo="¿En qué biomoléculas aparece cada bioelemento primario?">
        <strong>C, H, O:</strong> en TODAS (glúcidos, lípidos, proteínas, ácidos nucleicos)<br />
        <strong>N:</strong> en proteínas y ácidos nucleicos (NO en glúcidos ni lípidos)<br />
        <strong>S:</strong> en proteínas con cisteína/metionina (puentes disulfuro)<br />
        <strong>P:</strong> en ácidos nucleicos (esqueleto azúcar-fosfato), ATP y fosfolípidos
      </WorkedExample>

      <Cuidado>
        El <strong>carbono</strong> es especial: forma 4 enlaces covalentes,
        cadenas largas y ramificadas, y compuestos cíclicos. Por eso es la base
        de toda la química de la vida.
      </Cuidado>
    </EscenaRica>
  );
}

function EscSecundarios() {
  return (
    <EscenaRica>
      <Titulo>Bioelementos secundarios y oligoelementos</Titulo>

      <Definicion termino="Bioelementos secundarios">
        Elementos presentes en menor proporción (0.1–1%) pero indispensables.
        Generalmente como iones disueltos.<br /><br />
        <strong>Ca, Na, K, Mg, Cl</strong>
      </Definicion>

      <Definicion termino="Oligoelementos">
        Elementos en muy baja concentración (&lt;0.1%) pero esenciales para
        enzimas y procesos específicos.<br /><br />
        <strong>Fe, Cu, Zn, I, F, Mn, Co, Cr, Se, Mo, Ni</strong>
      </Definicion>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Funciones biológicas clave
          </text>
          {[
            { x: 90, t: "Ca", f: "huesos, dientes, contracción muscular, coagulación", c: "#84cc16" },
            { x: 90, t: "Na", f: "conducción nerviosa, equilibrio osmótico", c: "#06b6d4", y: 95 },
            { x: 90, t: "K", f: "contracción muscular (corazón), nervios", c: "#a78bfa", y: 140 },
            { x: 90, t: "Mg", f: "clorofila, activación enzimática", c: "#10b981", y: 185 },
            { x: 90, t: "Cl", f: "jugo gástrico (HCl), equilibrio osmótico", c: "#f59e0b", y: 230 },
            { x: 410, t: "Fe", f: "hemoglobina (transporte de O₂)", c: "#ef4444" },
            { x: 410, t: "I", f: "hormonas tiroideas", c: "#8b5cf6", y: 95 },
            { x: 410, t: "Zn", f: "más de 200 enzimas, insulina", c: "#3b82f6", y: 140 },
            { x: 410, t: "Cu", f: "hemocianina (algunos animales)", c: "#f97316", y: 185 },
            { x: 410, t: "F", f: "esmalte dental (previene caries)", c: "#06b6d4", y: 230 },
          ].map((e, i) => (
            <g key={i} transform={`translate(${e.x}, ${e.y || 50})`}>
              <circle cx={20} cy={15} r={14} fill={e.c} opacity={0.3} stroke={e.c} strokeWidth={2} />
              <text x={20} y={20} textAnchor="middle" fill={e.c} fontSize={13} fontWeight={700}
                fontFamily="var(--font-crimson), serif">{e.t}</text>
              <text x={45} y={20} fill={LIENZO.fg} fontSize={11}>{e.f}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>Asociaciones clave para el examen:</strong>
        <br />Fe → hemoglobina | I → tiroides | Ca → huesos | Na/K → nervios |
        Mg → clorofila | F → dientes
      </Mnemotecnia>

      <AutoCheck
        pregunta="¿Cuál es el bioelemento central de la clorofila?"
        opciones={["Fe", "Mg", "Ca", "Cu"]}
        correctaIdx={1}
        explicacion="Mg es el átomo central de la clorofila, igual que el Fe lo es de la hemoglobina."
      />
    </EscenaRica>
  );
}

function EscAgua() {
  return (
    <EscenaRica>
      <Titulo>El agua · solvente universal y mucho más</Titulo>

      <Hook>
        70% de tu cuerpo es agua. En una medusa: 95%. ¿Por qué la vida no usa
        alcohol, aceite o gasolina? Porque el agua tiene propiedades únicas que
        ninguna otra molécula iguala.
      </Hook>

      <Definicion termino="El agua (H₂O)">
        Molécula polar, formada por 2 enlaces covalentes O-H. Su geometría
        angular (104.5°) la convierte en dipolo: el O tiene carga parcial
        negativa, los H positiva.
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            6 propiedades clave del agua
          </text>
          {[
            { x: 90, t: "Solvente", d: "polar disuelve polar", c: "#06b6d4" },
            { x: 290, t: "Cohesión", d: "puentes H entre moléculas", c: "#3b82f6" },
            { x: 490, t: "Adhesión", d: "se pega a superficies", c: "#a78bfa" },
            { x: 90, t: "Alto calor", d: "regula T del cuerpo", c: "#ef4444", y: 130 },
            { x: 290, t: "Densidad anomalía", d: "hielo flota", c: "#06b6d4", y: 130 },
            { x: 490, t: "Tensión superficial", d: "insectos caminan sobre agua", c: "#10b981", y: 130 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y || 50})`}>
              <rect x={-10} y={0} width={160} height={65} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={70} y={22} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={70} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Puente de hidrógeno">
        Fuerza intermolecular débil entre el H de una molécula y un átomo
        electronegativo (O, N, F) de otra. Es la clave de TODAS las propiedades
        del agua y de la estructura del ADN y las proteínas.
      </Definicion>

      <Cuidado>
        El hielo flota porque su densidad (0.92 g/mL) es MENOR que la del agua
        líquida (1.00 g/mL). Esta "anomalía" salva la vida acuática: si el hielo
        se hundiera, los lagos se congelarían desde abajo y matarían todo.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Solvente, lubricante, refrigerante, transportador, reactivo,
        estructural."</strong> Las 6 funciones del agua en el cuerpo.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSales() {
  return (
    <EscenaRica>
      <Titulo>Sales minerales</Titulo>

      <Definicion termino="Sales minerales">
        Compuestos iónicos disueltos (Na⁺, K⁺, Cl⁻, HCO₃⁻, PO₄³⁻, Ca²⁺) o
        precipitados (huesos, conchas, dientes) en los seres vivos.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Dos estados de las sales en el cuerpo
          </text>
          <g transform="translate(80, 55)">
            <rect width={280} height={100} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.5} rx={10} />
            <text x={140} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>Disueltas (iones)</text>
            <text x={140} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={12}>Na⁺, K⁺, Cl⁻, HCO₃⁻, Mg²⁺, Ca²⁺</text>
            <text x={140} y={62} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>plasma sanguíneo, citoplasma</text>
            <text x={140} y={82} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>regulan pH, presión osmótica, nervios</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={280} height={100} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={140} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>Precipitadas (sólidos)</text>
            <text x={140} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={12}>Ca₃(PO₄)₂, CaCO₃, SiO₂</text>
            <text x={140} y={62} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>huesos, dientes, conchas</text>
            <text x={140} y={82} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>función estructural</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="Funciones generales de las sales">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Estructural:</strong> huesos (Ca₃(PO₄)₂), conchas (CaCO₃).</li>
          <li><strong>Regulador de pH:</strong> bicarbonato/carbonato (HCO₃⁻/CO₃²⁻).</li>
          <li><strong>Equilibrio osmótico:</strong> Na⁺, K⁺, Cl⁻.</li>
          <li><strong>Transmisión nerviosa:</strong> Na⁺/K⁺ (potencial de acción).</li>
          <li><strong>Contracción muscular:</strong> Ca²⁺.</li>
        </ul>
      </Definicion>

      <AutoCheck
        pregunta="¿Cuál es el componente principal de los huesos?"
        opciones={["NaCl", "CaCO₃", "Ca₃(PO₄)₂", "SiO₂"]}
        correctaIdx={2}
        explicacion="El fosfato tricálcico forma la matriz mineral del hueso (hidroxiapatita)."
      />
    </EscenaRica>
  );
}

function EscBolivia() {
  return (
    <EscenaRica>
      <Titulo>Tabla resumen y contexto Bolivia</Titulo>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Clasificación final de bioelementos
          </text>
          {/* encabezados */}
          {["Categoría", "% en organismo", "Elementos", "Función ejemplo"].map((h, i) => (
            <g key={i}>
              <rect x={50 + i * 165} y={50} width={155} height={30} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={50 + i * 165 + 77} y={70} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { cat: "Primarios", per: "96–99%", el: "C, H, O, N, S, P", fn: "biomoléculas" },
            { cat: "Secundarios", per: "0.1–1%", el: "Ca, Na, K, Mg, Cl", fn: "iones, estructura" },
            { cat: "Oligoelementos", per: "<0.1%", el: "Fe, Cu, Zn, I, F...", fn: "enzimas" },
          ].map((row, i) => (
            <g key={i}>
              {[row.cat, row.per, row.el, row.fn].map((v, j) => (
                <g key={j}>
                  <rect x={50 + j * 165} y={80 + i * 50} width={155} height={50} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={50 + j * 165 + 77} y={108 + i * 50} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Bocio endémico en Bolivia">
        Históricamente, el altiplano boliviano sufrió de bocio (hipertiroidismo)
        por déficit de yodo en suelos andinos. Por eso desde 1980 toda la sal
        de consumo se yoda obligatoriamente.
      </Definicion>

      <Definicion termino="Anemia en altura (Cochabamba, La Paz)">
        En zonas de altura, el cuerpo produce más glóbulos rojos para compensar
        la baja PO₂. El hierro (Fe) es indispensable: déficit = anemia. Por
        eso la dieta andina (quinua, amaranto) es rica en Fe.
      </Definicion>

      <Resumen>
        La materia viva = bioelementos (CHON SP + secundarios + oligo) +
        biomoléculas (agua + sales + glúcidos + lípidos + proteínas + ácidos
        nucleicos). Solo 27 elementos hacen toda la vida del planeta.
      </Resumen>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Los oligoelementos no importan porque hay poco'">
        <strong>Pensar:</strong> que si hay menos de 0.1%, no son críticos.<br />
        <strong>Realidad:</strong> son ESENCIALES. Sin Fe mueres de anemia; sin I,
        hipotiroidismo; sin Zn, deficiencias graves. Cantidad pequeña, impacto enorme.
      </Misconception>

      <Misconception titulo="Error 2 · Confundir el átomo central de hemoglobina y clorofila">
        <strong>Pensar:</strong> que hemoglobina = Mg y clorofila = Fe.<br />
        <strong>Realidad:</strong> al revés. Hemoglobina = Fe (rojo, sangre);
        clorofila = Mg (verde, plantas).
      </Misconception>

      <Misconception titulo="Error 3 · Pensar que el hielo se hunde">
        <strong>Pensar:</strong> que el sólido es siempre más denso que el
        líquido.<br />
        <strong>Realidad:</strong> el agua es la EXCEPCIÓN. El hielo flota
        (0.92 g/mL &lt; 1.00 g/mL del agua líquida).
      </Misconception>

      <Misconception titulo="Error 4 · Olvidar el P en el ATP/ADN">
        <strong>Pensar:</strong> que el ATP y el ADN solo tienen CHON.<br />
        <strong>Realidad:</strong> tienen P (fósforo). El esqueleto del ADN es
        azúcar-fosfato. ATP = adenosín-tri-FOSFATO.
      </Misconception>

      <Resumen>
        CHON = primarios. + S y P = primarios completos (CHONSP). Secundarios
        Ca, Na, K, Mg, Cl. Oligo Fe, Cu, Zn, I, F. Agua = polar, puentes H,
        solvente universal, hielo flota.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál NO es un bioelemento primario?"
        opciones={["C", "Na", "O", "P"]}
        correctaIdx={1}
        explicacion="Na es secundario. Los primarios son CHON + S y P."
      />

      <AutoCheck
        pregunta="¿Qué propiedad del agua permite que el sudor enfríe el cuerpo?"
        opciones={["Densidad", "Alto calor específico", "Tensión superficial", "Acidez"]}
        correctaIdx={1}
        explicacion="El agua absorbe MUCHO calor antes de evaporarse, así enfría la piel."
      />

      <AutoCheck
        pregunta="¿Qué oligoelemento es indispensable en la tiroides?"
        opciones={["Fe", "I", "Zn", "F"]}
        correctaIdx={1}
        explicacion="El yodo (I) es indispensable para la síntesis de hormonas tiroideas (T3, T4)."
      />

      <AutoCheck
        pregunta="¿Qué bioelementos forman el esqueleto del ADN?"
        opciones={["C, H, O, N, S", "C, H, O, N, P", "C, H, O, S, P", "C, H, O, N"]}
        correctaIdx={1}
        explicacion="ADN: esqueleto azúcar-fosfato (C, H, O, P) y bases (C, H, O, N)."
      />

      <AutoCheck
        pregunta="Una niña presenta debilidad, fatiga y baja oxigenación en La Paz. Probable déficit:"
        opciones={["Cu", "Zn", "Fe", "F"]}
        correctaIdx={2}
        explicacion="Anemia ferropénica (déficit de Fe) → hemoglobina baja → menos transporte de O₂."
      />
    </EscenaRica>
  );
}
