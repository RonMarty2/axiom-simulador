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
      unidad="BIO-03"
      tituloUnidad="Bases celulares · Célula, organelos, ciclo celular"
      escenas={[
        { titulo: "Teoría celular · postulados", componente: EscTeoria },
        { titulo: "Procariotas vs eucariotas", componente: EscProcaEuca },
        { titulo: "Membrana celular · estructura y transporte", componente: EscMembrana },
        { titulo: "Organelos · tour de la célula eucariota", componente: EscOrganelos },
        { titulo: "Célula animal vs vegetal", componente: EscAnimalVegetal },
        { titulo: "Ciclo celular · interfase y división", componente: EscCiclo },
        { titulo: "Mitosis · fases", componente: EscMitosis },
        { titulo: "Meiosis · gametogénesis", componente: EscMeiosis },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscTeoria() {
  return (
    <EscenaRica>
      <Titulo>Teoría celular · la célula es la base</Titulo>

      <Hook>
        Hasta 1665, nadie sabía que estábamos hechos de "cuartitos". Robert
        Hooke miró un trozo de corcho con un microscopio rudimentario y vio
        compartimentos: los llamó "células" (del latín cella, celda). Cambió
        para siempre nuestra forma de entender la vida.
      </Hook>

      <Definicion termino="Teoría celular (3 postulados)">
        <ol style={{ margin: "6px 0 0 18px", padding: 0 }}>
          <li>Todos los seres vivos están formados por una o más células.</li>
          <li>La célula es la unidad estructural y funcional de la vida.</li>
          <li>Toda célula proviene de otra célula preexistente (Virchow).</li>
        </ol>
      </Definicion>

      <Pizarra alto={269}>
        <svg width="100%" height="100%" viewBox="0 0 360 310" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}>
            Hitos en el descubrimiento celular
          </text>
          {[
            { y: 76, año: "1665", per: "Hooke", evt: "ve células en corcho" },
            { y: 140, año: "1838", per: "Schleiden", evt: "células en plantas" },
            { y: 204, año: "1839", per: "Schwann", evt: "células en animales" },
            { y: 268, año: "1855", per: "Virchow", evt: "Omnis cellula e cellula" },
          ].map((h, i) => (
            <g key={i} transform={`translate(48, ${h.y})`}>
              <circle r={24} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={2} />
              <text textAnchor="middle" dy={5} fill={LIENZO.accent} fontSize={13} fontWeight={700}>{h.año}</text>
              <text x={40} y={-4} fill={LIENZO.fg} fontSize={14} fontWeight={700}>{h.per}</text>
              <text x={40} y={16} fill={LIENZO.fgDim} fontSize={13}>{h.evt}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Toda célula viene de otra"</strong> — base de la reproducción
        biológica. NO existe la generación espontánea (Pasteur lo demostró
        en 1862).
      </Mnemotecnia>

      <Conexion>
        Las biomoléculas (Unidad 2) son los ladrillos; los organelos (esta
        unidad) son los compartimentos donde trabajan.
      </Conexion>
    </EscenaRica>
  );
}

function EscProcaEuca() {
  return (
    <EscenaRica>
      <Titulo>Dos grandes grupos · procariota y eucariota</Titulo>

      <Pizarra alto={277}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Comparación procariota vs eucariota (1/2)
          </text>
          <rect x={10} y={36} width={340} height={24} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
          <text x={180} y={53} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>Característica</text>
          {["Procariota", "Eucariota"].map((h, i) => (
            <g key={i}>
              <rect x={10 + i * 170} y={60} width={170} height={24} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={10 + i * 170 + 85} y={77} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Núcleo", p: ["Sin membrana"], e: ["Con membrana"] },
            { c: "Tamaño", p: ["1–10 μm"], e: ["10–100 μm"] },
            { c: "ADN", p: ["Circular en", "citoplasma"], e: ["Lineal en", "núcleo"] },
          ].map((row, i) => {
            const y0 = 92 + i * 72;
            return (
              <g key={i}>
                <rect x={10} y={y0} width={340} height={24} fill={LIENZO.accent} opacity={0.07} stroke={LIENZO.fgFaint} strokeWidth={1} />
                <text x={180} y={y0 + 17} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>{row.c}</text>
                {[row.p, row.e].map((lines, j) => (
                  <g key={j}>
                    <rect x={10 + j * 170} y={y0 + 24} width={170} height={40} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                    {lines.length === 1 ? (
                      <text x={10 + j * 170 + 85} y={y0 + 49} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[0]}</text>
                    ) : (
                      <>
                        <text x={10 + j * 170 + 85} y={y0 + 40} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[0]}</text>
                        <text x={10 + j * 170 + 85} y={y0 + 57} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[1]}</text>
                      </>
                    )}
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </Pizarra>

      <Pizarra alto={277}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Comparación procariota vs eucariota (2/2)
          </text>
          <rect x={10} y={36} width={340} height={24} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
          <text x={180} y={53} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>Característica</text>
          {["Procariota", "Eucariota"].map((h, i) => (
            <g key={i}>
              <rect x={10 + i * 170} y={60} width={170} height={24} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={10 + i * 170 + 85} y={77} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Organelos", p: ["Solo ribosomas", "(70S)"], e: ["Muchos con", "membrana"] },
            { c: "Pared", p: ["Peptidoglicano", "(bact.)"], e: ["Celulosa o", "quitina"] },
            { c: "Ejemplos", p: ["Bacterias,", "arqueas"], e: ["Plantas, hongos,", "anim.*"] },
          ].map((row, i) => {
            const y0 = 92 + i * 72;
            return (
              <g key={i}>
                <rect x={10} y={y0} width={340} height={24} fill={LIENZO.accent} opacity={0.07} stroke={LIENZO.fgFaint} strokeWidth={1} />
                <text x={180} y={y0 + 17} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>{row.c}</text>
                {[row.p, row.e].map((lines, j) => (
                  <g key={j}>
                    <rect x={10 + j * 170} y={y0 + 24} width={170} height={40} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                    <text x={10 + j * 170 + 85} y={y0 + 40} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[0]}</text>
                    <text x={10 + j * 170 + 85} y={y0 + 57} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[1]}</text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </Pizarra>

      <Parrafo>
        En eucariotas hay muchos organelos membranosos (mitocondrias,
        cloroplastos, retículo endoplasmático); la pared celular es de celulosa
        (plantas) o quitina (hongos), mientras que en bacterias es de
        peptidoglicano. *Incluyen plantas, animales, hongos y protistas.
      </Parrafo>

      <Definicion termino="Procariota (pro = antes, karyo = núcleo)">
        Célula SIN núcleo verdadero. ADN circular libre en citoplasma. Sin
        organelos membranosos. Son SIEMPRE unicelulares. Bacterias y arqueas.
      </Definicion>

      <Definicion termino="Eucariota (eu = verdadero)">
        Célula CON núcleo delimitado por membrana. ADN lineal en cromosomas.
        Muchos organelos. Pueden ser uni o pluricelulares.
      </Definicion>

      <Mnemotecnia>
        <strong>"Pro = antes de; Eu = verdadero".</strong> Los procariotas
        aparecieron primero (3500 Ma); los eucariotas hace ~2000 Ma.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscMembrana() {
  return (
    <EscenaRica>
      <Titulo>Membrana plasmática · frontera selectiva</Titulo>

      <Definicion termino="Membrana plasmática">
        Bicapa de fosfolípidos con proteínas insertadas. Es SEMIPERMEABLE:
        deja pasar agua y moléculas pequeñas, controla el paso de otras.
        Modelo: "mosaico fluido" (Singer y Nicolson, 1972).
      </Definicion>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 360 265" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}>
            Bicapa fosfolipídica
          </text>
          {/* fosfolípidos hilera superior */}
          {Array.from({ length: 11 }).map((_, i) => i !== 2 && (
            <g key={`up${i}`} transform={`translate(${30 + i * 30}, 74)`}>
              <circle cx={0} cy={0} r={8} fill="var(--dib-amber-500)" stroke="var(--dib-amber-600)" strokeWidth={1.5} />
              <line x1={-3} y1={8} x2={-3} y2={40} stroke="var(--dib-slate-900)" strokeWidth={1.5} />
              <line x1={3} y1={8} x2={3} y2={40} stroke="var(--dib-slate-900)" strokeWidth={1.5} />
            </g>
          ))}
          {/* fosfolípidos hilera inferior */}
          {Array.from({ length: 11 }).map((_, i) => i !== 2 && (
            <g key={`dn${i}`} transform={`translate(${30 + i * 30}, 186)`}>
              <circle cx={0} cy={0} r={8} fill="var(--dib-amber-500)" stroke="var(--dib-amber-600)" strokeWidth={1.5} />
              <line x1={-3} y1={-8} x2={-3} y2={-40} stroke="var(--dib-slate-900)" strokeWidth={1.5} />
              <line x1={3} y1={-8} x2={3} y2={-40} stroke="var(--dib-slate-900)" strokeWidth={1.5} />
            </g>
          ))}
          {/* proteína integral */}
          <rect x={74} y={66} width={32} height={128} fill={LIENZO.accent} opacity={0.6} rx={8} />
          {/* etiquetas */}
          <text x={180} y={50} textAnchor="middle" fill="var(--dib-amber-600)" fontSize={13} fontStyle="italic">cabezas polares (hidrofílicas)</text>
          <text x={228} y={135} textAnchor="middle" fill="var(--dib-slate-900)" fontSize={13} fontStyle="italic">colas hidrofóbicas</text>
          <text x={238} y={216} textAnchor="middle" fill="var(--dib-amber-600)" fontSize={13} fontStyle="italic">cabezas polares (hidrofílicas)</text>
          <line x1={90} y1={197} x2={90} y2={230} stroke={LIENZO.accent} strokeWidth={1.5} />
          <text x={90} y={246} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontStyle="italic">proteína integral</text>
        </svg>
      </Pizarra>

      <Definicion termino="Transporte a través de la membrana">
        <strong>Pasivo (sin energía):</strong>
        <ul style={{ margin: "4px 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Difusión simple:</strong> gases (O₂, CO₂) atraviesan directamente.</li>
          <li><strong>Difusión facilitada:</strong> moléculas polares pasan por proteínas canal.</li>
          <li><strong>Ósmosis:</strong> paso de agua.</li>
        </ul>
        <strong>Activo (consume ATP):</strong>
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Bomba Na⁺/K⁺:</strong> mueve 3 Na⁺ afuera, 2 K⁺ adentro.</li>
          <li><strong>Endocitosis / Exocitosis:</strong> partículas grandes.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"A favor del gradiente = pasivo. En contra = activo (ATP)."</strong>
        El gradiente es la diferencia de concentración entre dentro y fuera.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscOrganelos() {
  return (
    <EscenaRica>
      <Titulo>Tour por la célula eucariota</Titulo>

      <Pizarra alto={269}>
        <svg width="100%" height="100%" viewBox="0 0 360 310" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Organelos esenciales y su función (1/2)
          </text>
          {[
            { t: "Núcleo", fn: "ADN, control celular", c: "var(--dib-violet-400)", y: 58 },
            { t: "Mitocondria", fn: "respiración, ATP", c: "var(--dib-red-500)", y: 110 },
            { t: "Ribosomas", fn: "síntesis de proteínas", c: "var(--dib-emerald-500)", y: 162 },
            { t: "RE rugoso", fn: "proteínas para exportar", c: "var(--dib-blue-500)", y: 214 },
            { t: "RE liso", fn: "síntesis de lípidos", c: "var(--dib-cyan-500)", y: 266 },
          ].map((o, i) => (
            <g key={i}>
              <circle cx={26} cy={o.y} r={10} fill={o.c} opacity={0.4} stroke={o.c} strokeWidth={1.5} />
              <text x={46} y={o.y + 4} fill={o.c} fontSize={14} fontWeight={700}>{o.t}</text>
              <text x={46} y={o.y + 22} fill={LIENZO.fg} fontSize={13}>{o.fn}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Pizarra alto={225}>
        <svg width="100%" height="100%" viewBox="0 0 360 260" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Organelos esenciales y su función (2/2)
          </text>
          {[
            { t: "Aparato de Golgi", fn: "empaqueta y exporta", c: "var(--dib-amber-500)", y: 58 },
            { t: "Lisosomas", fn: "digestión intracelular", c: "var(--dib-yellow-500)", y: 110 },
            { t: "Cloroplastos", fn: "fotosíntesis (plantas y algas)", c: "var(--dib-green-500)", y: 162 },
            { t: "Pared celular", fn: "rigidez (plantas, hongos, bacterias)", c: "var(--dib-lime-500)", y: 214 },
          ].map((o, i) => (
            <g key={i}>
              <circle cx={26} cy={o.y} r={10} fill={o.c} opacity={0.4} stroke={o.c} strokeWidth={1.5} />
              <text x={46} y={o.y + 4} fill={o.c} fontSize={14} fontWeight={700}>{o.t}</text>
              <text x={46} y={o.y + 22} fill={LIENZO.fg} fontSize={13}>{o.fn}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Mitocondria · la 'central eléctrica'">
        Doble membrana. Membrana interna pliegada (crestas). Allí ocurre la
        fosforilación oxidativa que produce ATP. Tiene ADN propio (teoría
        endosimbiótica: antes era una bacteria libre).
      </Definicion>

      <Definicion termino="Cloroplasto · solo en plantas y algas">
        Doble membrana. Contiene clorofila (verde, con Mg en el centro). En su
        interior ocurre la fotosíntesis: CO₂ + H₂O + luz → glucosa + O₂.
      </Definicion>

      <Mnemotecnia>
        <strong>"Núcleo decide, mitocondria fabrica energía, ribosoma fabrica
        proteínas, Golgi empaqueta, lisosoma limpia."</strong>
      </Mnemotecnia>

      <Cuidado>
        Fuera del núcleo, mitocondrias y cloroplastos son los únicos organelos con <strong>ADN
        propio</strong> (distinto del ADN del núcleo) y <strong>ribosomas propios</strong>. Por eso se cree
        que fueron bacterias incorporadas (teoría endosimbiótica de Lynn
        Margulis).
      </Cuidado>
    </EscenaRica>
  );
}

function EscAnimalVegetal() {
  return (
    <EscenaRica>
      <Titulo>Célula animal vs vegetal</Titulo>

      <Pizarra alto={333}>
        <svg width="100%" height="100%" viewBox="0 0 360 384" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Diferencias clave (presencia / forma)
          </text>
          <rect x={10} y={34} width={340} height={22} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
          <text x={180} y={50} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>Característica</text>
          {["Animal", "Vegetal"].map((h, i) => (
            <g key={i}>
              <rect x={10 + i * 170} y={56} width={170} height={22} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={10 + i * 170 + 85} y={72} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Pared celular", a: ["✗"], v: ["✓ (celulosa)"], y: 84, h: 22 },
            { c: "Cloroplastos", a: ["✗"], v: ["✓"], y: 130, h: 22 },
            { c: "Vacuolas grandes", a: ["✗ (pequeñas)"], v: ["✓ (gigante)"], y: 176, h: 22 },
            { c: "Centríolos", a: ["✓"], v: ["✗"], y: 222, h: 22 },
            { c: "Lisosomas", a: ["✓"], v: ["raros"], y: 268, h: 22 },
            { c: "Forma", a: ["redondeada/", "irregular"], v: ["rectangular/", "poligonal"], y: 314, h: 38 },
          ].map((row, i) => (
            <g key={i}>
              <rect x={10} y={row.y} width={340} height={20} fill={LIENZO.accent} opacity={0.07} stroke={LIENZO.fgFaint} strokeWidth={1} />
              <text x={180} y={row.y + 14} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>{row.c}</text>
              {[row.a, row.v].map((lines, j) => (
                <g key={j}>
                  <rect x={10 + j * 170} y={row.y + 20} width={170} height={row.h} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  {lines.length === 1 ? (
                    <text x={10 + j * 170 + 85} y={row.y + 35} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[0]}</text>
                  ) : (
                    <>
                      <text x={10 + j * 170 + 85} y={row.y + 35} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[0]}</text>
                      <text x={10 + j * 170 + 85} y={row.y + 52} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[1]}</text>
                    </>
                  )}
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Si tiene <strong>cloroplastos y pared de celulosa = vegetal</strong>.
        Si tiene <strong>centríolos pero NO cloroplastos = animal</strong>.
      </Mnemotecnia>

      <AutoCheck
        pregunta="¿Qué organelo tienen las células vegetales y NO las animales?"
        opciones={["mitocondria", "cloroplasto", "núcleo", "ribosoma"]}
        correctaIdx={1}
        explicacion="Cloroplastos hacen fotosíntesis; las plantas y algas los tienen, las células animales no."
      />
    </EscenaRica>
  );
}

function EscCiclo() {
  return (
    <EscenaRica>
      <Titulo>Ciclo celular · vida de una célula</Titulo>

      <Definicion termino="Ciclo celular">
        Secuencia de eventos desde que se forma una célula hasta que se divide
        en dos. Dos grandes etapas: <strong>interfase</strong> (crecer y
        prepararse) y <strong>división</strong> (mitosis o meiosis).
      </Definicion>

      <Pizarra alto={298}>
        <svg width="100%" height="100%" viewBox="0 0 360 344" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}>
            Fases del ciclo celular (en %)
          </text>
          {/* Pie chart simplificado */}
          <g transform="translate(180, 122)">
            {/* G1 - 50% */}
            <path d="M 0 -70 A 70 70 0 1 1 0 70 L 0 0 Z" fill="var(--dib-blue-500)" opacity={0.5} />
            {/* S - 25% */}
            <path d="M 0 70 A 70 70 0 0 1 -70 0 L 0 0 Z" fill="var(--dib-emerald-500)" opacity={0.5} />
            {/* G2 - 15% */}
            <path d="M -70 0 A 70 70 0 0 1 -41.1 -56.6 L 0 0 Z" fill="var(--dib-amber-500)" opacity={0.5} />
            {/* M - 10% */}
            <path d="M -41.1 -56.6 A 70 70 0 0 1 0 -70 L 0 0 Z" fill="var(--dib-red-500)" opacity={0.5} />
          </g>
          {/* leyenda */}
          {[
            { c: "var(--dib-blue-500)", t: "G1 · crecimiento (~50%)" },
            { c: "var(--dib-emerald-500)", t: "S · síntesis de ADN (~25%)" },
            { c: "var(--dib-amber-500)", t: "G2 · preparación (~15%)" },
            { c: "var(--dib-red-500)", t: "M · mitosis (~10%)" },
          ].map((l, i) => (
            <g key={i} transform={`translate(44, ${214 + i * 30})`}>
              <rect width={20} height={20} fill={l.c} opacity={0.5} />
              <text x={30} y={15} fill={LIENZO.fg} fontSize={14}>{l.t}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Las 4 fases">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>G1 (Gap 1):</strong> la célula crece y prepara organelos.</li>
          <li><strong>S (Síntesis):</strong> se copia el ADN. Cada uno de los 46 cromosomas queda formado por dos copias idénticas unidas (cromátidas hermanas).</li>
          <li><strong>G2 (Gap 2):</strong> última preparación antes de dividirse.</li>
          <li><strong>M (Mitosis):</strong> división del núcleo + citocinesis.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Si el ciclo celular se DESCONTROLA (puntos de control fallan), la
        célula puede convertirse en tumoral. Esa es la base molecular del
        cáncer.
      </Cuidado>

      <Mnemotecnia>
        <strong>"G1 → S → G2 → M"</strong> = Genera, Sintetiza, Garantiza,
        Mitosis.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscMitosis() {
  return (
    <EscenaRica>
      <Titulo>Mitosis · división equitativa</Titulo>

      <Definicion termino="Mitosis">
        División celular en la que de UNA célula madre se obtienen DOS células
        hijas <strong>idénticas</strong> (con la misma cantidad de cromosomas).
        Ocurre en células SOMÁTICAS (no sexuales): piel, sangre, hueso, etc.
      </Definicion>

      <Pizarra alto={352}>
        <svg width="100%" height="100%" viewBox="0 0 360 406" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Las 4 fases de la mitosis (PMAT)
          </text>
          {[
            { t: "Profase", d1: "cromatina se condensa,", d2: "desaparece membrana nuclear", c: "var(--dib-blue-500)" },
            { t: "Metafase", d1: "cromosomas se alinean", d2: "en el ecuador", c: "var(--dib-emerald-500)" },
            { t: "Anafase", d1: "se separan cromátidas hermanas,", d2: "van a los polos", c: "var(--dib-amber-500)" },
            { t: "Telofase", d1: "se forman 2 núcleos hijos,", d2: "citocinesis", c: "var(--dib-red-500)" },
            { t: "Resultado", d1: "2 células diploides (2n),", d2: "idénticas a la madre", c: "var(--dib-violet-400)" },
          ].map((f, i) => (
            <g key={i} transform={`translate(12, ${40 + i * 72})`}>
              <rect x={0} y={0} width={336} height={64} fill={f.c} opacity={0.1} stroke={f.c} strokeWidth={1.5} rx={10} />
              <text x={168} y={20} textAnchor="middle" fill={f.c} fontSize={14} fontWeight={700}>{f.t}</text>
              <text x={168} y={39} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{f.d1}</text>
              <text x={168} y={56} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{f.d2}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"PMAT"</strong>: Profase, Metafase, Anafase, Telofase. O en
        español: "<em>Picaron mi auto trapeando</em>". Lo que tú quieras: el
        orden es lo crucial.
      </Mnemotecnia>

      <Definicion termino="Función biológica">
        Crecimiento (un niño pasa de 1 célula a billones por mitosis), reparación
        (curar heridas) y reproducción asexual (en organismos unicelulares y
        algunos pluricelulares como plantas).
      </Definicion>
    </EscenaRica>
  );
}

function EscMeiosis() {
  return (
    <EscenaRica>
      <Titulo>Meiosis · división reductora (gametos)</Titulo>

      <Hook>
        Si tus padres tienen 46 cromosomas cada uno y al unirse formaran un
        embrión, ¿el embrión tendría 92? No. Tiene 46. ¿Por qué? Por la
        meiosis: divide a la mitad los cromosomas en gametos (espermatozoide,
        óvulo).
      </Hook>

      <Definicion termino="Meiosis">
        División celular en la que de UNA célula madre diploide (2n) se
        obtienen CUATRO células hijas haploides (n), genéticamente DIFERENTES.
        En el hombre, las cuatro son espermatozoides; en la mujer, solo una
        llega a ser óvulo. En los animales, ocurre en ovarios y testículos y
        produce los gametos.
      </Definicion>

      <Pizarra alto={333}>
        <svg width="100%" height="100%" viewBox="0 0 360 384" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Mitosis vs Meiosis · diferencias clave
          </text>
          <rect x={10} y={34} width={340} height={22} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
          <text x={180} y={50} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>Característica</text>
          {["Mitosis", "Meiosis"].map((h, i) => (
            <g key={i}>
              <rect x={10 + i * 170} y={56} width={170} height={22} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={10 + i * 170 + 85} y={72} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Divisiones", m: ["1"], me: ["2"], y: 84, h: 22 },
            { c: "Células hijas", m: ["2"], me: ["4"], y: 130, h: 22 },
            { c: "Cromosomas hija", m: ["2n (igual)"], me: ["n (mitad)"], y: 176, h: 22 },
            { c: "Variabilidad", m: ["No (idénticas)"], me: ["Sí (recombina)"], y: 222, h: 22 },
            { c: "Tipo de célula", m: ["somática"], me: ["germinales →", "gametos"], y: 268, h: 38 },
            { c: "Función", m: ["crecer, reparar"], me: ["reproducir"], y: 330, h: 22 },
          ].map((row, i) => (
            <g key={i}>
              <rect x={10} y={row.y} width={340} height={20} fill={LIENZO.accent} opacity={0.07} stroke={LIENZO.fgFaint} strokeWidth={1} />
              <text x={180} y={row.y + 14} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>{row.c}</text>
              {[row.m, row.me].map((lines, j) => (
                <g key={j}>
                  <rect x={10 + j * 170} y={row.y + 20} width={170} height={row.h} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  {lines.length === 1 ? (
                    <text x={10 + j * 170 + 85} y={row.y + 35} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[0]}</text>
                  ) : (
                    <>
                      <text x={10 + j * 170 + 85} y={row.y + 35} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[0]}</text>
                      <text x={10 + j * 170 + 85} y={row.y + 52} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{lines[1]}</text>
                    </>
                  )}
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Parrafo>
        En la meiosis hay variabilidad genética por recombinación y ocurre en
        células germinales para producir gametos.
      </Parrafo>

      <Definicion termino="Recombinación genética (crossing-over)">
        Durante la profase I de la meiosis, los cromosomas homólogos
        intercambian fragmentos de ADN. Esto explica la VARIABILIDAD genética:
        ¡tú no eres clon de tus hermanos! Cada gameto trae una combinación
        única.
      </Definicion>

      <Mnemotecnia>
        <strong>"Mitosis = idéntica; Meiosis = mitad y mezcla."</strong> Mitosis
        para crecer, meiosis para reproducirse sexualmente.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Los virus son células'">
        <strong>Pensar:</strong> que los virus son seres vivos celulares.<br />
        <strong>Realidad:</strong> NO son células. No tienen membrana ni
        organelos. Son material genético en una cápsula proteica. Se debate
        si son "vivos".
      </Misconception>

      <Misconception titulo="Error 2 · 'La mitosis fabrica gametos'">
        <strong>Pensar:</strong> que la mitosis produce gametos.<br />
        <strong>Realidad:</strong> en ti, la mitosis sirve para CRECER y REPARAR.
        Los gametos los hace la MEIOSIS.
      </Misconception>

      <Misconception titulo="Error 3 · 'Las células vegetales no tienen mitocondrias'">
        <strong>Pensar:</strong> que solo tienen cloroplastos.<br />
        <strong>Realidad:</strong> tienen AMBOS. Cloroplastos hacen fotosíntesis
        (día), mitocondrias hacen respiración (siempre).
      </Misconception>

      <Misconception titulo="Error 4 · 'En el ribosoma se hace ATP'">
        <strong>Pensar:</strong> que el ribosoma produce ATP.<br />
        <strong>Realidad:</strong> el ribosoma sintetiza PROTEÍNAS. La
        mitocondria produce ATP por respiración celular.
      </Misconception>

      <Resumen>
        Procariota = sin núcleo. Eucariota = con núcleo y organelos. Animal vs
        vegetal: clorop. + pared = vegetal. Ciclo: G1-S-G2-M. Mitosis = 2
        células iguales. Meiosis = 4 células diferentes con la mitad de
        cromosomas.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es el principal organelo productor de ATP?"
        opciones={["Mitocondria", "Ribosoma", "Núcleo", "Lisosoma"]}
        correctaIdx={0}
        explicacion="La mitocondria es la 'central eléctrica' de la célula. ATP se sintetiza en sus crestas."
      />

      <AutoCheck
        pregunta="¿En qué fase de la mitosis se separan las cromátidas hermanas?"
        opciones={["Profase", "Anafase", "Metafase", "Telofase"]}
        correctaIdx={1}
        explicacion="En anafase, las cromátidas se mueven a los polos opuestos."
      />

      <AutoCheck
        pregunta="Si una célula somática humana tiene 46 cromosomas, ¿cuántos tendrán los gametos?"
        opciones={["46", "92", "24", "23"]}
        correctaIdx={3}
        explicacion="Los gametos son haploides (n=23). Al fecundarse se vuelven 46 (2n)."
      />

      <AutoCheck
        pregunta="¿Qué tipo de transporte requiere ATP?"
        opciones={["Difusión simple", "Difusión facilitada", "Bomba Na⁺/K⁺", "Ósmosis"]}
        correctaIdx={2}
        explicacion="La bomba Na/K bombea iones en contra del gradiente, usando ATP."
      />

      <AutoCheck
        pregunta="¿Qué organelo tiene ADN propio?"
        opciones={["Lisosoma", "Aparato de Golgi", "RE rugoso", "Mitocondria"]}
        correctaIdx={3}
        explicacion="Mitocondrias y cloroplastos tienen ADN propio (teoría endosimbiótica)."
      />
    </EscenaRica>
  );
}
