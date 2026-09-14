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

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Hitos en el descubrimiento celular
          </text>
          {[
            { x: 90, año: "1665", per: "Hooke", evt: "ve células en corcho" },
            { x: 240, año: "1838", per: "Schleiden", evt: "células en plantas" },
            { x: 390, año: "1839", per: "Schwann", evt: "células en animales" },
            { x: 540, año: "1855", per: "Virchow", evt: "Omnis cellula e cellula" },
          ].map((h, i) => (
            <g key={i} transform={`translate(${h.x}, 60)`}>
              <circle r={20} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={2} />
              <text textAnchor="middle" dy={5} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h.año}</text>
              <text textAnchor="middle" y={45} fill={LIENZO.fg} fontSize={12} fontWeight={700}>{h.per}</text>
              <text textAnchor="middle" y={60} fill={LIENZO.fgDim} fontSize={10}>{h.evt}</text>
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

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Comparación procariota vs eucariota
          </text>
          {["Característica", "Procariota", "Eucariota"].map((h, i) => (
            <g key={i}>
              <rect x={60 + i * 200} y={45} width={195} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={60 + i * 200 + 97} y={64} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Núcleo", p: "Sin membrana", e: "Con membrana" },
            { c: "Tamaño", p: "1–10 μm", e: "10–100 μm" },
            { c: "ADN", p: "Circular en citoplasma", e: "Lineal en núcleo" },
            { c: "Organelos", p: "Solo ribosomas (70S)", e: "Muchos (mit., cloro., RE)" },
            { c: "Pared", p: "Peptidoglicano (bacteria)", e: "Celulosa (plantas), quitina (hongos)" },
            { c: "Ejemplos", p: "Bacterias, arqueas", e: "Plantas, animales, hongos, protistas" },
          ].map((row, i) => (
            <g key={i}>
              {[row.c, row.p, row.e].map((v, j) => (
                <g key={j}>
                  <rect x={60 + j * 200} y={73 + i * 28} width={195} height={28} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={60 + j * 200 + 97} y={91 + i * 28} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

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

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Bicapa fosfolipídica
          </text>
          {/* fosfolípidos hilera superior */}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={`up${i}`} transform={`translate(${80 + i * 45}, 60)`}>
              <circle cx={0} cy={0} r={9} fill="#f59e0b" stroke="#d97706" strokeWidth={1.5} />
              <line x1={-3} y1={9} x2={-3} y2={48} stroke="#0f172a" strokeWidth={1.5} />
              <line x1={3} y1={9} x2={3} y2={48} stroke="#0f172a" strokeWidth={1.5} />
            </g>
          ))}
          {/* fosfolípidos hilera inferior */}
          {Array.from({ length: 14 }).map((_, i) => (
            <g key={`dn${i}`} transform={`translate(${80 + i * 45}, 170)`}>
              <circle cx={0} cy={0} r={9} fill="#f59e0b" stroke="#d97706" strokeWidth={1.5} />
              <line x1={-3} y1={-9} x2={-3} y2={-48} stroke="#0f172a" strokeWidth={1.5} />
              <line x1={3} y1={-9} x2={3} y2={-48} stroke="#0f172a" strokeWidth={1.5} />
            </g>
          ))}
          {/* proteína integral */}
          <rect x={295} y={75} width={35} height={80} fill={LIENZO.accent} opacity={0.6} rx={8} />
          {/* etiqueta */}
          <text x={200} y={45} fill="#d97706" fontSize={11} fontStyle="italic">cabezas polares (hidrofílicas)</text>
          <text x={200} y={205} fill="#d97706" fontSize={11} fontStyle="italic">cabezas polares (hidrofílicas)</text>
          <text x={500} y={120} fill={LIENZO.accent} fontSize={11} fontStyle="italic">proteína integral</text>
          <text x={500} y={138} fill="#0f172a" fontSize={11} fontStyle="italic">colas hidrofóbicas</text>
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

      <Pizarra alto={310}>
        <svg width="100%" height="100%" viewBox="0 0 720 310" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Organelos esenciales y su función
          </text>
          {[
            { t: "Núcleo", fn: "ADN, control celular", c: "#a78bfa", y: 40 },
            { t: "Mitocondria", fn: "respiración, ATP", c: "#ef4444", y: 70 },
            { t: "Ribosomas", fn: "síntesis de proteínas", c: "#10b981", y: 100 },
            { t: "RE rugoso", fn: "proteínas para exportar", c: "#3b82f6", y: 130 },
            { t: "RE liso", fn: "síntesis de lípidos", c: "#06b6d4", y: 160 },
            { t: "Aparato de Golgi", fn: "empaqueta y exporta", c: "#f59e0b", y: 190 },
            { t: "Lisosomas", fn: "digestión intracelular", c: "#eab308", y: 220 },
            { t: "Cloroplastos", fn: "fotosíntesis (solo plantas)", c: "#22c55e", y: 250 },
            { t: "Pared celular", fn: "rigidez (plantas, hongos, bacterias)", c: "#84cc16", y: 280 },
          ].map((o, i) => (
            <g key={i}>
              <circle cx={70} cy={o.y} r={10} fill={o.c} opacity={0.4} stroke={o.c} strokeWidth={1.5} />
              <text x={100} y={o.y + 4} fill={o.c} fontSize={12} fontWeight={700}>{o.t}</text>
              <text x={300} y={o.y + 4} fill={LIENZO.fg} fontSize={12}>{o.fn}</text>
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
        Mitocondrias y cloroplastos son los únicos organelos con <strong>ADN
        propio</strong> y <strong>ribosomas propios</strong>. Por eso se cree
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

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Diferencias clave (presencia / forma)
          </text>
          {["Característica", "Animal", "Vegetal"].map((h, i) => (
            <g key={i}>
              <rect x={60 + i * 200} y={45} width={195} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={60 + i * 200 + 97} y={64} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Pared celular", a: "✗", v: "✓ (celulosa)" },
            { c: "Cloroplastos", a: "✗", v: "✓" },
            { c: "Vacuolas grandes", a: "✗ (pequeñas)", v: "✓ (gigante)" },
            { c: "Centríolos", a: "✓", v: "✗" },
            { c: "Lisosomas", a: "✓", v: "raros" },
            { c: "Forma", a: "redondeada/irregular", v: "rectangular/poligonal" },
          ].map((row, i) => (
            <g key={i}>
              {[row.c, row.a, row.v].map((v, j) => (
                <g key={j}>
                  <rect x={60 + j * 200} y={73 + i * 20} width={195} height={20} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={60 + j * 200 + 97} y={87 + i * 20} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{v}</text>
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
        pregunta="¿Qué organelo está SOLO en células vegetales?"
        opciones={["mitocondria", "núcleo", "cloroplasto", "ribosoma"]}
        correctaIdx={2}
        explicacion="Cloroplastos hacen fotosíntesis; solo plantas y algas los tienen."
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

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 720 240" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Fases del ciclo celular (en %)
          </text>
          {/* Pie chart simplificado */}
          <g transform="translate(200, 130)">
            {/* G1 - 50% */}
            <path d="M 0 -70 A 70 70 0 1 1 0 70 L 0 0 Z" fill="#3b82f6" opacity={0.5} />
            {/* S - 25% */}
            <path d="M 0 70 A 70 70 0 0 1 -70 0 L 0 0 Z" fill="#10b981" opacity={0.5} />
            {/* G2 - 15% */}
            <path d="M -70 0 A 70 70 0 0 1 -50 -50 L 0 0 Z" fill="#f59e0b" opacity={0.5} />
            {/* M - 10% */}
            <path d="M -50 -50 A 70 70 0 0 1 0 -70 L 0 0 Z" fill="#ef4444" opacity={0.5} />
          </g>
          {/* leyenda */}
          {[
            { c: "#3b82f6", t: "G1 · crecimiento (~50%)" },
            { c: "#10b981", t: "S · síntesis de ADN (~25%)" },
            { c: "#f59e0b", t: "G2 · preparación (~15%)" },
            { c: "#ef4444", t: "M · mitosis (~10%)" },
          ].map((l, i) => (
            <g key={i} transform={`translate(400, ${70 + i * 32})`}>
              <rect width={20} height={20} fill={l.c} opacity={0.5} />
              <text x={30} y={15} fill={LIENZO.fg} fontSize={12}>{l.t}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Las 4 fases">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>G1 (Gap 1):</strong> la célula crece y prepara organelos.</li>
          <li><strong>S (Síntesis):</strong> se duplica el ADN. Las 46 hebras pasan a 92.</li>
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

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Las 4 fases de la mitosis (PMAT)
          </text>
          {[
            { x: 90, t: "Profase", d: "cromatina se condensa, desaparece membrana nuclear", c: "#3b82f6" },
            { x: 280, t: "Metafase", d: "cromosomas se alinean en el ecuador", c: "#10b981" },
            { x: 470, t: "Anafase", d: "se separan cromátidas hermanas (a los polos)", c: "#f59e0b" },
            { x: 90, y: 160, t: "Telofase", d: "se forman 2 núcleos hijos, citocinesis", c: "#ef4444" },
            { x: 360, y: 160, t: "Resultado", d: "2 células diploides (2n) idénticas a la madre", c: "#a78bfa" },
          ].map((f, i) => (
            <g key={i} transform={`translate(${f.x}, ${f.y || 50})`}>
              <rect x={-10} y={0} width={180} height={90} fill={f.c} opacity={0.1} stroke={f.c} strokeWidth={1.5} rx={10} />
              <text x={80} y={22} textAnchor="middle" fill={f.c} fontSize={13} fontWeight={700}>{f.t}</text>
              <text x={80} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{f.d.split(",")[0]}</text>
              {f.d.split(",")[1] && (
                <text x={80} y={72} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{f.d.split(",")[1]}</text>
              )}
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
        Ocurre solo en gametogénesis (ovarios, testículos).
      </Definicion>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Mitosis vs Meiosis · diferencias clave
          </text>
          {["Característica", "Mitosis", "Meiosis"].map((h, i) => (
            <g key={i}>
              <rect x={60 + i * 200} y={45} width={195} height={28} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={60 + i * 200 + 97} y={64} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Divisiones", m: "1", me: "2" },
            { c: "Células hijas", m: "2", me: "4" },
            { c: "Cromosomas hija", m: "2n (igual)", me: "n (mitad)" },
            { c: "Variabilidad", m: "No (idénticas)", me: "Sí (recombinación)" },
            { c: "Tipo de célula", m: "somática", me: "gametos" },
            { c: "Función", m: "crecer, reparar", me: "reproducir" },
          ].map((row, i) => (
            <g key={i}>
              {[row.c, row.m, row.me].map((v, j) => (
                <g key={j}>
                  <rect x={60 + j * 200} y={73 + i * 28} width={195} height={28} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={60 + j * 200 + 97} y={91 + i * 28} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Recombinación genética (crossing-over)">
        Durante la profase I de la meiosis, los cromosomas homólogos
        intercambian fragmentos de ADN. Esto explica la VARIABILIDAD genética:
        ¡tú no sos clon de tus hermanos! Cada gameto trae una combinación
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

      <Misconception titulo="Error 2 · 'Mitosis = reproducción'">
        <strong>Pensar:</strong> que la mitosis produce gametos.<br />
        <strong>Realidad:</strong> mitosis es para CRECIMIENTO y REPARACIÓN.
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
        células iguales. Meiosis = 4 gametos diferentes con la mitad de
        cromosomas.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es el principal organelo productor de ATP?"
        opciones={["Núcleo", "Ribosoma", "Mitocondria", "Lisosoma"]}
        correctaIdx={2}
        explicacion="La mitocondria es la 'central eléctrica' de la célula. ATP se sintetiza en sus crestas."
      />

      <AutoCheck
        pregunta="¿En qué fase de la mitosis se separan las cromátidas hermanas?"
        opciones={["Profase", "Metafase", "Anafase", "Telofase"]}
        correctaIdx={2}
        explicacion="En anafase, las cromátidas se mueven a los polos opuestos."
      />

      <AutoCheck
        pregunta="Si una célula somática humana tiene 46 cromosomas, ¿cuántos tendrán los gametos?"
        opciones={["46", "92", "23", "24"]}
        correctaIdx={2}
        explicacion="Los gametos son haploides (n=23). Al fecundarse se vuelven 46 (2n)."
      />

      <AutoCheck
        pregunta="¿Qué tipo de transporte requiere ATP?"
        opciones={["Difusión simple", "Difusión facilitada", "Ósmosis", "Bomba Na⁺/K⁺"]}
        correctaIdx={3}
        explicacion="La bomba Na/K bombea iones en contra del gradiente, usando ATP."
      />

      <AutoCheck
        pregunta="¿Qué organelo tiene ADN propio?"
        opciones={["Lisosoma", "Aparato de Golgi", "Mitocondria", "RE rugoso"]}
        correctaIdx={2}
        explicacion="Mitocondrias y cloroplastos tienen ADN propio (teoría endosimbiótica)."
      />
    </EscenaRica>
  );
}
