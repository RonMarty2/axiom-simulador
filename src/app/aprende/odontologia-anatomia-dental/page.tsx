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
      unidad="ODO-01"
      tituloUnidad="Anatomía dental · Estructura del diente"
      escenas={[
        { titulo: "Dentición y números", componente: EscIntro },
        { titulo: "Tipos de dientes y funciones", componente: EscTipos },
        { titulo: "Partes anatómicas del diente", componente: EscPartes },
        { titulo: "Estructura interna · capas", componente: EscCapas },
        { titulo: "Periodonto · sostén del diente", componente: EscPeriodonto },
        { titulo: "Caries · enfermedad más prevalente", componente: EscCaries },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Dentición humana · dos juegos en la vida</Titulo>

      <Hook>
        Tu primera muela apareció a los 6 meses; tu última a los 18-25 años
        (muela del juicio). En total, dos denticiones: 20 dientes de leche y
        32 permanentes. Cada diente cumple una función específica.
      </Hook>

      <Definicion termino="Dentición temporal (de leche)">
        Aparece entre los 6 meses y los 30 meses. Tiene <strong>20 dientes</strong>:
        8 incisivos + 4 caninos + 8 molares. NO hay premolares en la dentición
        de leche.
      </Definicion>

      <Definicion termino="Dentición permanente">
        Aparece entre los 6 y los 18-25 años. Tiene <strong>32 dientes</strong>:
        8 incisivos + 4 caninos + 8 premolares + 12 molares (incluyendo las 4
        muelas del juicio).
      </Definicion>

      <Mnemotecnia>
        <strong>"De leche: 20 (sin premolares). Permanentes: 32 (con
        premolares y muelas del juicio)."</strong>
      </Mnemotecnia>

      <Conexion>
        Esta es la lección introductoria de Odontología UMSS. La carrera
        integra anatomía cráneo-cervical, biomateriales, técnicas restaurativas
        y prevención.
      </Conexion>
    </EscenaRica>
  );
}

function EscTipos() {
  return (
    <EscenaRica>
      <Titulo>4 tipos de dientes</Titulo>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tipos · número permanente · función
          </text>
          {[
            { x: 90, t: "Incisivos", n: "8", fn: "cortar alimentos", form: "borde recto" },
            { x: 250, t: "Caninos", n: "4", fn: "desgarrar", form: "puntiagudos" },
            { x: 410, t: "Premolares", n: "8", fn: "triturar", form: "2 cúspides" },
            { x: 570, t: "Molares", n: "12", fn: "moler / masticar", form: "4-5 cúspides" },
          ].map((d, i) => (
            <g key={i} transform={`translate(${d.x}, 50)`}>
              <rect x={-10} y={0} width={140} height={150} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
              <text x={60} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>{d.t}</text>
              <text x={60} y={50} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>{d.n}</text>
              <text x={60} y={70} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>dientes</text>
              <text x={60} y={100} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{d.fn}</text>
              <text x={60} y={125} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">{d.form}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Distribución por cuadrante">
        Cada cuadrante (superior derecho/izquierdo, inferior derecho/izquierdo)
        en dentición permanente:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>2 incisivos (central y lateral).</li>
          <li>1 canino.</li>
          <li>2 premolares.</li>
          <li>3 molares (1°, 2° y 3° o "del juicio").</li>
        </ul>
        Total por cuadrante: 8 dientes × 4 = 32.
      </Definicion>

      <Mnemotecnia>
        <strong>"Incisivos cortan, caninos desgarran, premolares trituran,
        molares muelen."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPartes() {
  return (
    <EscenaRica>
      <Titulo>Partes externas del diente</Titulo>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Anatomía externa de un molar
          </text>
          {/* Corona */}
          <path d="M 300 50 Q 320 40 360 50 Q 380 60 400 50 Q 420 60 440 50 L 440 130 L 300 130 Z"
            fill="#f5f5f5" stroke={LIENZO.fg} strokeWidth={2} />
          {/* Cuello */}
          <rect x={310} y={130} width={120} height={20} fill="#fef3c7" stroke={LIENZO.fg} strokeWidth={2} />
          {/* Raíz */}
          <path d="M 320 150 L 330 240 L 350 250 L 350 150 Z" fill="#fde68a" stroke={LIENZO.fg} strokeWidth={2} />
          <path d="M 390 150 L 390 250 L 410 240 L 420 150 Z" fill="#fde68a" stroke={LIENZO.fg} strokeWidth={2} />

          {/* Etiquetas */}
          <line x1={300} y1={90} x2={220} y2={90} stroke={LIENZO.accent} strokeWidth={1.5} />
          <text x={215} y={94} textAnchor="end" fill={LIENZO.accent} fontSize={12} fontWeight={700}>CORONA</text>
          <text x={215} y={108} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>(visible, sobre encía)</text>

          <line x1={440} y1={140} x2={530} y2={140} stroke={LIENZO.warn} strokeWidth={1.5} />
          <text x={535} y={143} fill={LIENZO.warn} fontSize={12} fontWeight={700}>CUELLO</text>
          <text x={535} y={158} fill={LIENZO.fgDim} fontSize={10}>(unión, línea de la encía)</text>

          <line x1={300} y1={210} x2={220} y2={210} stroke={LIENZO.bad} strokeWidth={1.5} />
          <text x={215} y={213} textAnchor="end" fill={LIENZO.bad} fontSize={12} fontWeight={700}>RAÍZ</text>
          <text x={215} y={227} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>(en el hueso alveolar)</text>
        </svg>
      </Pizarra>

      <Definicion termino="3 zonas">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Corona:</strong> parte visible, cubierta de esmalte.</li>
          <li><strong>Cuello:</strong> zona de transición, queda al nivel de la
            encía.</li>
          <li><strong>Raíz:</strong> dentro del alvéolo óseo, sujeta el diente.
            Los molares pueden tener hasta 3 raíces.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Cuando la encía se retrae (gingivitis avanzada o cepillado agresivo),
        se expone el CUELLO. Sin esmalte protector, esa zona es muy sensible
        al frío y a los ácidos.
      </Cuidado>
    </EscenaRica>
  );
}

function EscCapas() {
  return (
    <EscenaRica>
      <Titulo>Estructura interna · 4 tejidos</Titulo>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Capas del diente · del exterior al centro
          </text>
          {/* esmalte corona */}
          <path d="M 280 50 Q 320 35 360 50 Q 400 35 440 50 L 440 130 L 280 130 Z"
            fill="#ffffff" stroke={LIENZO.fg} strokeWidth={2} />
          {/* dentina */}
          <path d="M 300 65 Q 330 55 360 65 Q 390 55 420 65 L 420 230 L 300 230 Z"
            fill="#fef3c7" stroke={LIENZO.fg} strokeWidth={1.5} />
          {/* pulpa */}
          <path d="M 340 80 Q 360 75 380 80 L 380 220 Q 365 230 340 220 Z"
            fill="#fca5a5" stroke={LIENZO.fg} strokeWidth={1.5} />
          {/* cemento + raíz */}
          <path d="M 300 230 Q 330 245 360 230 Q 390 245 420 230 L 420 260 Q 390 270 360 260 Q 330 270 300 260 Z"
            fill="#fde68a" stroke={LIENZO.fg} strokeWidth={1.5} />

          {/* Etiquetas con números */}
          {[
            { n: "1", t: "Esmalte", d: "tejido más DURO del cuerpo (96% mineral)", c: "#9ca3af", y: 80 },
            { n: "2", t: "Dentina", d: "70% mineral, sensible, vivo", c: "#d97706", y: 130 },
            { n: "3", t: "Pulpa", d: "vasos y nervios, vida del diente", c: "#dc2626", y: 180 },
            { n: "4", t: "Cemento", d: "cubre la raíz, fija al hueso", c: "#ca8a04", y: 230 },
          ].map((c, i) => (
            <g key={i}>
              <circle cx={500} cy={c.y} r={12} fill={c.c} stroke={LIENZO.fg} strokeWidth={1.5} />
              <text x={500} y={c.y + 4} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={700}>{c.n}</text>
              <text x={520} y={c.y - 4} fill={c.c} fontSize={12} fontWeight={700}>{c.t}</text>
              <text x={520} y={c.y + 10} fill={LIENZO.fgDim} fontSize={10}>{c.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Esmalte (corona, durísimo, blanco), Dentina (mayoría, amarillenta),
        Pulpa (vasos y nervios), Cemento (raíz)."</strong>
      </Mnemotecnia>

      <Cuidado>
        El esmalte es el tejido más DURO del cuerpo (más que el hueso), pero
        NO se regenera. Una vez perdido, se pierde para siempre. Por eso la
        prevención (flúor, cepillado) es tan importante.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPeriodonto() {
  return (
    <EscenaRica>
      <Titulo>Periodonto · estructuras de sostén</Titulo>

      <Definicion termino="Periodonto">
        Conjunto de tejidos que ANCLAN al diente en el alvéolo. 4 componentes:
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 estructuras del periodonto
          </text>
          {[
            { x: 90, t: "Encía", d: "tejido gingival visible" },
            { x: 290, t: "Ligamento periodontal", d: "fibras que sujetan al hueso" },
            { x: 90, y: 130, t: "Cemento radicular", d: "cubre la raíz" },
            { x: 290, y: 130, t: "Hueso alveolar", d: "alvéolo donde se aloja la raíz" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y || 60})`}>
              <rect width={200} height={50} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
              <text x={10} y={22} fill={LIENZO.accent} fontSize={12} fontWeight={700}>{p.t}:</text>
              <text x={10} y={40} fill={LIENZO.fg} fontSize={11}>{p.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        La <strong>enfermedad periodontal</strong> (gingivitis → periodontitis)
        destruye el ligamento y el hueso alveolar. Si avanza, el diente se
        afloja y se pierde. Es la principal causa de pérdida de dientes en
        adultos.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Periodonto = peri (alrededor) + odonto (diente)."</strong>
        Todo lo que rodea y sostiene al diente.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscCaries() {
  return (
    <EscenaRica>
      <Titulo>Caries · enfermedad más prevalente del mundo</Titulo>

      <Hook>
        La caries afecta al 90% de la población mundial. En Bolivia, según la
        OPS, más del 80% de niños escolares tienen caries no tratadas. Es
        prevenible al 100% con higiene y flúor.
      </Hook>

      <Definicion termino="Caries">
        Enfermedad infecciosa CRÓNICA causada por bacterias (Streptococcus
        mutans) que fermentan azúcares y producen ácidos que desmineralizan
        el esmalte.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 factores · tetrada de Keyes (Newbrun)
          </text>
          {[
            { x: 120, y: 80, t: "Bacterias", c: "#dc2626" },
            { x: 290, y: 80, t: "Azúcar", c: "#f59e0b" },
            { x: 460, y: 80, t: "Diente susceptible", c: "#a78bfa" },
            { x: 290, y: 150, t: "Tiempo", c: "#06b6d4" },
          ].map((f, i) => (
            <g key={i}>
              <circle cx={f.x} cy={f.y} r={45} fill={f.c} opacity={0.25} stroke={f.c} strokeWidth={2} />
              <text x={f.x} y={f.y + 5} textAnchor="middle" fill={f.c} fontSize={12} fontWeight={700}>{f.t}</text>
            </g>
          ))}
          <text x={360} y={195} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            Si falta cualquiera de los 4, NO hay caries
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Prevención">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Cepillado 3× día con pasta fluorada.</li>
          <li>Hilo dental.</li>
          <li>Reducir azúcares libres.</li>
          <li>Visitas al odontólogo cada 6 meses.</li>
          <li>Fluoración del agua (política pública en Bolivia desde la sal).</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Bacteria + Azúcar + Diente + Tiempo = Caries."</strong>
        Cortá un factor, cortás la enfermedad.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Los niños tienen 32 dientes'">
        <strong>Realidad:</strong> 20 dientes de leche. Los 32 permanentes
        están completos recién a los 18-25 años (con muelas del juicio).
      </Misconception>

      <Misconception titulo="Error 2 · 'El esmalte se regenera'">
        <strong>Realidad:</strong> NO se regenera nunca. Por eso una caries
        que llegó a dentina ya necesita restauración.
      </Misconception>

      <Misconception titulo="Error 3 · 'La caries la causa SOLO el dulce'">
        <strong>Realidad:</strong> hacen falta los 4 factores juntos
        (bacterias, azúcar, diente susceptible, tiempo). Sin bacterias
        cariogénicas, comer dulce no produce caries.
      </Misconception>

      <Resumen>
        Dentición temporal 20 dientes (sin premolares), permanente 32 (con
        premolares y muelas del juicio). 4 tipos: incisivos, caninos,
        premolares, molares. Diente externo: corona, cuello, raíz. Interno:
        esmalte (más duro), dentina, pulpa (vasos/nervios), cemento.
        Periodonto: encía, ligamento, cemento, hueso alveolar. Caries
        tetrada: bacteria + azúcar + diente + tiempo.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuántos dientes tiene la dentición temporal?"
        opciones={["20", "24", "28", "32"]}
        correctaIdx={0}
        explicacion="20 dientes de leche. No tiene premolares."
      />

      <AutoCheck
        pregunta="¿Cuál es el tejido más duro del cuerpo humano?"
        opciones={["hueso compacto", "dentina", "esmalte", "cemento"]}
        correctaIdx={2}
        explicacion="El esmalte (96% mineral) supera incluso al hueso."
      />

      <AutoCheck
        pregunta="¿Qué tejido del diente contiene los vasos y nervios?"
        opciones={["esmalte", "dentina", "pulpa", "cemento"]}
        correctaIdx={2}
        explicacion="La pulpa: el 'corazón' del diente."
      />

      <AutoCheck
        pregunta="¿Cuál NO es un factor de la tetrada de Keyes para caries?"
        opciones={["bacterias", "azúcar", "diente susceptible", "hipertensión"]}
        correctaIdx={3}
        explicacion="Hipertensión no participa. Los 4 factores son bacterias, azúcar, diente y tiempo."
      />
    </EscenaRica>
  );
}
