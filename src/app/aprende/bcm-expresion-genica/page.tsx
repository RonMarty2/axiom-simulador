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
      unidad="BCM-02"
      tituloUnidad="BCM · Expresión génica · ADN → ARN → Proteína"
      escenas={[
        { titulo: "Dogma central revisado", componente: EscDogma },
        { titulo: "Replicación del ADN", componente: EscReplicacion },
        { titulo: "Transcripción · ADN → ARN", componente: EscTranscripcion },
        { titulo: "Traducción · ARN → proteína", componente: EscTraduccion },
        { titulo: "Código genético", componente: EscCodigo },
        { titulo: "Mutaciones y reparación", componente: EscMutaciones },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscDogma() {
  return (
    <EscenaRica>
      <Titulo>Dogma central · flujo de información</Titulo>

      <Hook>
        Toda la información para fabricarte está en 23 pares de cromosomas.
        Como un manual con 3 mil millones de letras (pares de bases). Y cada
        célula tuya tiene una copia COMPLETA. La diferencia entre una neurona
        y un glóbulo rojo: qué PARTES del manual leen.
      </Hook>

      <Definicion termino="Dogma central (Crick, 1958)">
        Flujo de la información genética:<br /><br />
        <strong>ADN → ARN → Proteína</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Replicación:</strong> ADN → ADN (antes de la división).</li>
          <li><strong>Transcripción:</strong> ADN → ARNm (en núcleo).</li>
          <li><strong>Traducción:</strong> ARNm → proteína (en ribosoma).</li>
        </ul>
      </Definicion>

      <Conexion>
        Necesitás: ácidos nucleicos (Biología-2), núcleo y ribosomas
        (Biología-3). Esta unidad profundiza cada flecha del dogma.
      </Conexion>

      <Mnemotecnia>
        <strong>"Replicar = duplicar; Transcribir = pasar a otra forma;
        Traducir = pasar a otro idioma."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscReplicacion() {
  return (
    <EscenaRica>
      <Titulo>Replicación · copia exacta del ADN</Titulo>

      <Definicion termino="Replicación semiconservativa">
        Cada hebra hija contiene 1 hebra vieja + 1 nueva (Meselson-Stahl,
        1958). Por eso "SEMI" (la mitad se conserva).
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Horquilla de replicación
          </text>
          {/* hebra parental */}
          <line x1={80} y1={80} x2={300} y2={80} stroke={LIENZO.accent} strokeWidth={3} />
          <line x1={80} y1={140} x2={300} y2={140} stroke={LIENZO.accent} strokeWidth={3} />
          <text x={70} y={85} textAnchor="end" fill={LIENZO.accent} fontSize={10} fontWeight={600}>3&apos;</text>
          <text x={70} y={145} textAnchor="end" fill={LIENZO.accent} fontSize={10} fontWeight={600}>5&apos;</text>

          {/* horquilla */}
          <line x1={300} y1={80} x2={450} y2={50} stroke={LIENZO.warn} strokeWidth={3} />
          <line x1={300} y1={80} x2={450} y2={75} stroke={LIENZO.ok} strokeWidth={3} />
          <line x1={300} y1={140} x2={450} y2={145} stroke={LIENZO.warn} strokeWidth={3} />
          <line x1={300} y1={140} x2={450} y2={170} stroke={LIENZO.ok} strokeWidth={3} />

          {/* Etiquetas */}
          <text x={400} y={42} fill={LIENZO.warn} fontSize={11} fontWeight={600}>Hebra líder (continua)</text>
          <text x={400} y={185} fill={LIENZO.warn} fontSize={11} fontWeight={600}>Hebra rezagada (fragmentos de Okazaki)</text>
          <text x={400} y={65} fill={LIENZO.ok} fontSize={9}>nueva</text>
          <text x={400} y={160} fill={LIENZO.ok} fontSize={9}>nueva</text>

          {/* DNA pol */}
          <circle cx={450} cy={62} r={10} fill={LIENZO.bad} opacity={0.7} />
          <text x={465} y={66} fill={LIENZO.bad} fontSize={9}>DNA pol</text>
          <circle cx={450} cy={158} r={10} fill={LIENZO.bad} opacity={0.7} />
        </svg>
      </Pizarra>

      <Definicion termino="Enzimas clave">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Helicasa:</strong> abre la doble hélice.</li>
          <li><strong>Primasa:</strong> agrega un ARN cebador.</li>
          <li><strong>ADN polimerasa:</strong> sintetiza la nueva hebra
            (siempre 5&apos; → 3&apos;).</li>
          <li><strong>Ligasa:</strong> une los fragmentos de Okazaki.</li>
          <li><strong>Topoisomerasa:</strong> relaja la tensión del ADN.</li>
        </ul>
      </Definicion>

      <Cuidado>
        La hebra LÍDER se sintetiza continuamente. La REZAGADA en fragmentos
        cortos (Okazaki) porque la polimerasa solo puede ir en una dirección.
      </Cuidado>
    </EscenaRica>
  );
}

function EscTranscripcion() {
  return (
    <EscenaRica>
      <Titulo>Transcripción · de ADN a ARNm</Titulo>

      <Definicion termino="Transcripción">
        Se copia una porción del ADN a ARN mensajero (ARNm) en el núcleo. La
        enzima clave es la <strong>ARN polimerasa</strong>.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 etapas de la transcripción
          </text>
          {[
            { x: 90, t: "1. Iniciación", d: "ARN polimerasa se une al PROMOTOR", c: LIENZO.ok },
            { x: 290, t: "2. Elongación", d: "sintetiza ARNm complementario (5&apos;→3&apos;)", c: LIENZO.warn },
            { x: 490, t: "3. Terminación", d: "llega a la señal de paro y se libera el ARNm", c: LIENZO.bad },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={130} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={80} y={70} textAnchor="middle" fill={LIENZO.fg} fontSize={11} dangerouslySetInnerHTML={{ __html: p.d }} />
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Maduración del ARNm (en eucariotas)">
        Antes de salir del núcleo, el pre-ARNm se procesa:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Caperuza (cap 5&apos;):</strong> protege el extremo 5&apos;.</li>
          <li><strong>Cola poly-A:</strong> estabiliza el ARN.</li>
          <li><strong>Splicing:</strong> se cortan los INTRONES y se unen los EXONES.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Intrones se cortan, Exones se Expresan."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscTraduccion() {
  return (
    <EscenaRica>
      <Titulo>Traducción · de ARN a proteína</Titulo>

      <Definicion termino="Traducción">
        El ARNm sale al citoplasma, se une al RIBOSOMA, y este lee de a 3
        bases (codones) sintetizando una proteína específica. Necesita ARNt
        (transferencia) que trae los aminoácidos.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ribosoma lee codones y arma proteína
          </text>
          {/* ribosoma */}
          <ellipse cx={360} cy={120} rx={140} ry={50} fill={LIENZO.accent} opacity={0.2} stroke={LIENZO.accent} strokeWidth={2} />
          <text x={360} y={125} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>RIBOSOMA</text>
          {/* ARNm */}
          <line x1={140} y1={150} x2={580} y2={150} stroke={LIENZO.warn} strokeWidth={3} />
          {["AUG", "GCU", "CAA", "GGG", "UAA"].map((c, i) => (
            <text key={i} x={170 + i * 80} y={170} textAnchor="middle" fill={LIENZO.warn} fontSize={10} fontWeight={600}>{c}</text>
          ))}
          <text x={130} y={155} textAnchor="end" fill={LIENZO.warn} fontSize={10} fontWeight={600}>ARNm</text>
          {/* proteína */}
          <g transform="translate(280, 60)">
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={i * 25} cy={0} r={10} fill={LIENZO.ok} opacity={0.7} stroke={LIENZO.ok} strokeWidth={1.5} />
            ))}
            <text x={40} y={-20} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>Proteína (aa unidos)</text>
          </g>
        </svg>
      </Pizarra>

      <Definicion termino="3 etapas">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Iniciación:</strong> ribosoma reconoce AUG (codón de inicio).</li>
          <li><strong>Elongación:</strong> entra ARNt con aa, se forma enlace peptídico, ribosoma avanza 3 bases.</li>
          <li><strong>Terminación:</strong> codón STOP (UAA, UAG, UGA) → libera proteína.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Los <strong>ANTIBIÓTICOS</strong> de muchos tipos actúan sobre el
        ribosoma BACTERIANO (70S) pero no sobre el humano (80S). Por eso
        matan bacterias sin afectarte mucho.
      </Cuidado>
    </EscenaRica>
  );
}

function EscCodigo() {
  return (
    <EscenaRica>
      <Titulo>Código genético · diccionario universal</Titulo>

      <Definicion termino="Código genético">
        Reglas que asignan a cada CODÓN (3 bases) un aminoácido. Tiene 4
        propiedades:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Universal:</strong> el mismo en casi TODOS los seres vivos
            (de bacteria a elefante).</li>
          <li><strong>Degenerado:</strong> varios codones para un mismo aa
            (64 codones para 20 aa).</li>
          <li><strong>Sin ambigüedad:</strong> cada codón especifica UN solo aa.</li>
          <li><strong>Sin solapamiento:</strong> se lee en tripletes sin
            saltarse bases.</li>
        </ul>
      </Definicion>

      <Pizarra alto={150}>
        <svg width="100%" height="100%" viewBox="0 0 720 150" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Codones especiales
          </text>
          {[
            { x: 100, c: "AUG", n: "Inicio", aa: "Metionina", col: LIENZO.ok },
            { x: 290, c: "UAA", n: "Stop", aa: "—", col: LIENZO.bad },
            { x: 440, c: "UAG", n: "Stop", aa: "—", col: LIENZO.bad },
            { x: 590, c: "UGA", n: "Stop", aa: "—", col: LIENZO.bad },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-50} y={0} width={100} height={75} fill={p.col} opacity={0.15} stroke={p.col} strokeWidth={1.5} rx={8} />
              <text x={0} y={22} textAnchor="middle" fill={p.col} fontSize={14} fontWeight={700} fontFamily="var(--font-crimson), serif">{p.c}</text>
              <text x={0} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.n}</text>
              <text x={0} y={62} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{p.aa}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"AUG arranca; UAA, UAG, UGA paran."</strong> Solo 4 codones
        regulan inicio y fin: los 60 restantes especifican aminoácidos.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscMutaciones() {
  return (
    <EscenaRica>
      <Titulo>Mutaciones · errores en el ADN</Titulo>

      <Definicion termino="Mutación">
        Cambio en la secuencia del ADN. Puede ser silenciosa (sin efecto),
        leve o catastrófica. Causas: errores de la polimerasa, radiación,
        químicos mutagénicos, virus.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tipos de mutaciones puntuales
          </text>
          {[
            { t: "Silenciosa", d: "cambia base pero NO cambia aa", ej: "GCU → GCC (ambos Alanina)", c: LIENZO.ok },
            { t: "Misense", d: "cambia 1 aa por otro", ej: "GAA → GUA (Glu → Val)", c: LIENZO.warn },
            { t: "Nonsense", d: "introduce codón STOP prematuro", ej: "UCA → UGA (Ser → Stop)", c: LIENZO.bad },
            { t: "Frameshift", d: "inserción/deleción cambia el marco de lectura", ej: "todo después se traduce mal", c: "#dc2626" },
          ].map((m, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 36})`}>
              <rect width={580} height={32} fill={m.c} opacity={0.1} stroke={m.c} strokeWidth={1.5} rx={4} />
              <text x={15} y={20} fill={m.c} fontSize={12} fontWeight={700}>{m.t}:</text>
              <text x={130} y={20} fill={LIENZO.fg} fontSize={11}>{m.d}</text>
              <text x={400} y={20} fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">{m.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        La anemia falciforme proviene de una mutación misense (GAG → GUG)
        que cambia Glu por Val en la hemoglobina. Los eritrocitos se deforman
        en hoz → obstruyen capilares.
      </Cuidado>

      <Definicion termino="Sistemas de reparación">
        Las células tienen mecanismos para corregir mutaciones (mismatch
        repair, escisión de bases, escisión de nucleótidos). Fallos en estos
        sistemas → cáncer.
      </Definicion>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La replicación ocurre en ribosoma'">
        <strong>Realidad:</strong> NO. Replicación = en el núcleo. El ribosoma
        hace TRADUCCIÓN (sintetiza proteínas).
      </Misconception>

      <Misconception titulo="Error 2 · 'El código genético es ambiguo'">
        <strong>Realidad:</strong> es DEGENERADO (varios codones para un aa)
        pero NO ambiguo (cada codón especifica un solo aa).
      </Misconception>

      <Misconception titulo="Error 3 · 'Todas las mutaciones son malas'">
        <strong>Realidad:</strong> muchas son SILENCIOSAS (no afectan). Otras
        son NEUTRAS o incluso BENEFICIOSAS (base de la evolución).
      </Misconception>

      <Resumen>
        Dogma central: ADN → ARN → Proteína. Replicación semiconservativa
        con DNA polimerasa. Transcripción en núcleo (ARN polimerasa). ARN
        madura (cap, poly-A, splicing). Traducción en ribosoma (codones de
        3 bases). Código genético universal, degenerado, sin ambigüedad ni
        solapamiento. Mutaciones puntuales: silenciosa, missense, nonsense,
        frameshift.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué enzima sintetiza el ARNm?"
        opciones={["DNA polimerasa", "ARN polimerasa", "ARN ligasa", "Ribosoma"]}
        correctaIdx={1}
        explicacion="ARN polimerasa transcribe ADN → ARNm."
      />

      <AutoCheck
        pregunta="¿Qué codón inicia la traducción?"
        opciones={["UAA", "AUG", "GCC", "UGA"]}
        correctaIdx={1}
        explicacion="AUG codifica metionina y siempre inicia la proteína."
      />

      <AutoCheck
        pregunta="¿Qué se pierde en el splicing?"
        opciones={["exones", "intrones", "cap", "cola poly-A"]}
        correctaIdx={1}
        explicacion="Los intrones se cortan; los exones se unen y forman el ARNm maduro."
      />

      <AutoCheck
        pregunta="¿Por qué decimos que la replicación es semiconservativa?"
        opciones={[
          "se conserva todo el ADN",
          "cada hebra hija tiene 1 vieja + 1 nueva",
          "se sintetizan solo a la mitad",
          "solo se replica la mitad del genoma",
        ]}
        correctaIdx={1}
        explicacion="Cada hebra hija conserva 1 hebra parental + 1 hebra recién sintetizada."
      />
    </EscenaRica>
  );
}
