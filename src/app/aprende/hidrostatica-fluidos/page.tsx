"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Definicion, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="FIS-14"
      tituloUnidad="Hidrostática e hidrodinámica básica"
      escenas={[
        { titulo: "Densidad y presión hidrostática", componente: EscPresion },
        { titulo: "Principio de Pascal y prensa hidráulica", componente: EscPascal },
        { titulo: "Principio de Arquímedes y flotación", componente: EscArquimedes },
        { titulo: "Continuidad y teorema de Torricelli", componente: EscHidrodinamica },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscPresion() {
  return (
    <EscenaRica>
      <Titulo>Densidad y presión hidrostática</Titulo>

      <Hook>
        ¿Por qué en un hospital cuelgan la bolsa de suero por encima del brazo
        del paciente? Porque a mayor altura $h$ de la columna de líquido, mayor
        es la <strong>presión hidrostática</strong> que empuja el suero hacia
        la vena.
      </Hook>

      <Definicion termino="Densidad ($\rho$) y presión ($P$)">
        La <strong>densidad</strong> es masa por unidad de volumen:{" "}
        $\rho = \dfrac{"{m}"}{"{V}"}$ (agua: $1000\ \text{"{kg/m}"}^3 = 1\ \text{"{g/cm}"}^3$).
        La <strong>presión</strong> es fuerza perpendicular por unidad de área:{" "}
        $P = \dfrac{"{F}"}{"{A}"}$, medida en pascales ($1\ \text{"{Pa}"} = 1\ \text{"{N/m}"}^2$).
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Presión hidrostática en un fluido en reposo
          </text>

          {/* Recipiente con líquido */}
          <rect x={44} y={64} width={110} height={160} fill="var(--dib-cyan-500)" opacity={0.14} stroke="var(--dib-cyan-500)" strokeWidth={1.8} />
          <line x1={44} y1={90} x2={154} y2={90} stroke="var(--dib-cyan-500)" strokeWidth={2} />
          <text x={99} y={54} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>P₀ (atm)</text>

          {/* Flecha de profundidad h */}
          <line x1={174} y1={90} x2={174} y2={195} stroke={LIENZO.warn} strokeWidth={2} />
          <line x1={168} y1={90} x2={180} y2={90} stroke={LIENZO.warn} strokeWidth={2} />
          <line x1={168} y1={195} x2={180} y2={195} stroke={LIENZO.warn} strokeWidth={2} />
          <text x={190} y={148} fill={LIENZO.warn} fontSize={13} fontWeight={700}>h (profundidad)</text>
          <circle cx={99} cy={195} r={5} fill={LIENZO.bad} />

          <rect x={14} y={240} width={332} height={96} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={264} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Fórmulas clave (dependen de ρ, g y h; NO del ancho):
          </text>
          <text x={28} y={288} fill={LIENZO.fg} fontSize={13}>
            • Presión hidrostática (manométrica):  Phid = ρ · g · h
          </text>
          <text x={28} y={312} fill={LIENZO.fg} fontSize={13}>
            • Presión total (absoluta):  P = P₀ + ρ · g · h
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        La presión hidrostática <strong>NO depende de la forma ni del ancho</strong>{" "}
        del recipiente, solo de la densidad $\rho$, la gravedad $g$ y la
        profundidad vertical $h$.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPascal() {
  return (
    <EscenaRica>
      <Titulo>Principio de Pascal y prensa hidráulica</Titulo>

      <Definicion termino="Principio de Pascal">
        Toda presión aplicada a un fluido incompresible y confinado se transmite{" "}
        <strong>con igual intensidad</strong> en todas direcciones y a cada
        punto del recipiente.
      </Definicion>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Prensa hidráulica: F₁ / A₁ = F₂ / A₂
          </text>

          {/* Tubo en U estilizado */}
          <rect x={44} y={92} width={54} height={110} fill="var(--dib-cyan-500)" opacity={0.15} stroke="var(--dib-cyan-500)" strokeWidth={1.5} />
          <rect x={200} y={72} width={116} height={130} fill="var(--dib-cyan-500)" opacity={0.15} stroke="var(--dib-cyan-500)" strokeWidth={1.5} />
          <rect x={44} y={176} width={272} height={26} fill="var(--dib-cyan-500)" opacity={0.2} stroke="var(--dib-cyan-500)" strokeWidth={1.5} />

          {/* Émbolo menor */}
          <line x1={71} y1={52} x2={71} y2={88} stroke={LIENZO.ok} strokeWidth={3} />
          <polygon points="71,92 65,80 77,80" fill={LIENZO.ok} />
          <text x={71} y={44} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>F₁, A₁</text>

          {/* Émbolo mayor */}
          <line x1={258} y1={70} x2={258} y2={38} stroke={LIENZO.warn} strokeWidth={3} />
          <polygon points="258,34 252,46 264,46" fill={LIENZO.warn} />
          <text x={258} y={102} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>F₂, A₂</text>

          <rect x={14} y={220} width={332} height={102} rx={8} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={28} y={244} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Cómo despejar sin equivocarte:
          </text>
          <text x={28} y={268} fill={LIENZO.fg} fontSize={13}>
            F₂ = F₁ · (A₂ / A₁)
          </text>
          <text x={28} y={292} fill={LIENZO.fg} fontSize={13}>
            Si A₁ y A₂ están en cm², NO hace falta pasar a m²
          </text>
          <text x={28} y={310} fill={LIENZO.fgDim} fontSize={13}>
            porque la razón A₂/A₁ cancela las unidades.
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        La prensa multiplica la fuerza en la misma proporción que las áreas: si
        el émbolo grande tiene <strong>40 veces</strong> más área, obtienes{" "}
        <strong>40 veces</strong> más fuerza.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscArquimedes() {
  return (
    <EscenaRica>
      <Titulo>Principio de Arquímedes y flotación</Titulo>

      <Definicion termino="Empuje hidrostático ($E$)">
        Todo cuerpo sumergido total o parcialmente en un fluido recibe una
        fuerza vertical hacia arriba llamada <strong>empuje</strong>, igual al
        peso del volumen de fluido desalojado:
        <br />
        $E = \rho_{"{\\text{fluido}}"} \cdot g \cdot V_{"{\\text{sumergido}}"}$
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Cuándo flota y cuándo se hunde?
          </text>
          {[
            { t: "Flota en superficie", c1: "ρ_cuerpo < ρ_fluido", c2: "Empuje equilibra al peso (E = W) con parte afuera", c: LIENZO.ok },
            { t: "Equilibrio sumergido", c1: "ρ_cuerpo = ρ_fluido", c2: "Permanece a cualquier profundidad (E = W)", c: "var(--dib-cyan-500)" },
            { t: "Se hunde al fondo", c1: "ρ_cuerpo > ρ_fluido", c2: "El peso supera al empuje máximo (W > E)", c: LIENZO.bad },
          ].map((item, i) => (
            <g key={i} transform={`translate(14, ${42 + i * 96})`}>
              <rect x={0} y={0} width={332} height={82} rx={8} fill={item.c} opacity={0.1} stroke={item.c} strokeWidth={1.4} />
              <text x={14} y={24} fill={item.c} fontSize={13} fontWeight={700}>{item.t}</text>
              <text x={318} y={24} textAnchor="end" fill={item.c} fontSize={13} fontWeight={700}>{item.c1}</text>
              <text x={14} y={54} fill={LIENZO.fg} fontSize={13}>{item.c2}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        En la fórmula del empuje $E = \rho \cdot g \cdot V$, la densidad{" "}
        <strong>$\rho$ es la del FLUIDO</strong>, no la del objeto, y $V$ es
        solo el <strong>volumen sumergido</strong>.
      </Cuidado>
    </EscenaRica>
  );
}

function EscHidrodinamica() {
  return (
    <EscenaRica>
      <Titulo>Ecuación de continuidad y Torricelli</Titulo>

      <Definicion termino="Caudal ($Q$) y ecuación de continuidad">
        Para un fluido incompresible en régimen estacionario, el caudal{" "}
        $Q = A \cdot v$ (en $\text{"{m}"}^3/\text{"{s}"}$) se mantiene
        constante a lo largo del conducto:
        <br />
        $A_1 v_1 = A_2 v_2$
      </Definicion>

      <Pizarra alto={312}>
        <svg width="100%" height="100%" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Continuidad y Teorema de Torricelli
          </text>

          <rect x={14} y={38} width={332} height={140} rx={8} fill="var(--dib-cyan-500)" opacity={0.1} stroke="var(--dib-cyan-500)" strokeWidth={1.4} />
          <text x={28} y={62} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            1. Continuidad: A₁ · v₁ = A₂ · v₂
          </text>
          <text x={28} y={88} fill={LIENZO.fg} fontSize={13}>
            • Si el tubo (o arteria) se estrecha (A₂ &lt; A₁),
          </text>
          <text x={38} y={108} fill={LIENZO.fg} fontSize={13}>
            el fluido AUMENTA su rapidez (v₂ &gt; v₁).
          </text>
          <text x={28} y={134} fill={LIENZO.fg} fontSize={13}>
            • Si el área se reduce a la mitad, la rapidez
          </text>
          <text x={38} y={154} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            se duplica (2 × v₁).
          </text>

          <rect x={14} y={194} width={332} height={144} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={28} y={218} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            2. Teorema de Torricelli (orificio a profundidad h)
          </text>
          <text x={180} y={252} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            v = √(2 · g · h)
          </text>
          <text x={28} y={282} fill={LIENZO.fg} fontSize={13}>
            • Es la misma rapidez que tendría al caer desde
          </text>
          <text x={38} y={302} fill={LIENZO.fg} fontSize={13}>
            una altura h en caída libre.
          </text>
          <text x={28} y={324} fill={LIENZO.fgDim} fontSize={13}>
            (No depende de la densidad del líquido).
          </text>
        </svg>
      </Pizarra>

      <Conexion>
        En cardiología, cuando una placa de ateroma estrecha la luz de una
        arteria (estenosis), la sangre acelera al pasar por la zona estrecha,
        exactamente por la ecuación de continuidad $A_1 v_1 = A_2 v_2$.
      </Conexion>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Presión de una columna de suero (F8.1 PSA)">
        <p className="mb-2">
          Calcula la presión hidrostática ejercida por una columna de suero
          ($\rho = 1000\ \text{"{kg/m}"}^3$) de $1,2\ \text{"{m}"}$ de altura
          ($g = 10\ \text{"{m/s}"}^2$).
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> $P = \rho g h = 1000 \times 10 \times 1,2 = \mathbf{"{12\\,000\\ Pa}"}$.
          <br />
          <strong>Comprobación:</strong> cada metro de agua aporta $10\,000\ \text{"{Pa}"}$;
          $1,2\ \text{"{m}"}$ aporta $12\,000\ \text{"{Pa}"}$.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Flujo sanguíneo por una arteria estrechada (F8.4 PSA)">
        <p className="mb-2">
          Por una arteria de sección $0,4\ \text{"{cm}"}^2$ fluye sangre a{" "}
          $25\ \text{"{cm/s}"}$. Si la arteria se estrecha a $0,2\ \text{"{cm}"}^2$,
          ¿cuál será la nueva rapidez?
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Por continuidad $A_1 v_1 = A_2 v_2 \Rightarrow 0,4(25) = 0,2\,v_2$.
          <br />
          <strong>Paso 2:</strong> $v_2 = \dfrac{"{10}"}{"{0,2}"} = \mathbf{"{50\\ cm/s}"}$.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Un recipiente más ancho ejerce más presión en el fondo'">
        <strong>Realidad:</strong> a igual profundidad $h$ y mismo fluido $\rho$,
        la presión hidrostática $P = \rho g h$ es exactamente la misma sin
        importar el ancho del recipiente.
      </Misconception>

      <Misconception titulo="Error 2 · 'En el empuje E = ρgV se usa la densidad del objeto'">
        <strong>Realidad:</strong> se usa la densidad del <strong>fluido</strong>{" "}
        desalojado ($\rho_{"{\\text{fluido}}"}$) y el volumen sumergido.
      </Misconception>

      <Misconception titulo="Error 3 · 'Si el tubo se estrecha, el fluido va más lento'">
        <strong>Realidad:</strong> al disminuir el área $A$, la rapidez $v${" "}
        <strong>aumenta</strong> para mantener constante el caudal $Q = A v$.
      </Misconception>

      <Resumen>
        Presión: $P = F/A$ y $P_{"{\\text{hid}}"} = \rho g h$. Pascal:
        $F_1/A_1 = F_2/A_2$. Arquímedes: $E = \rho_{"{\\text{fluido}}"} g V_{"{\\text{sum}}"}$.
        Continuidad: $A_1 v_1 = A_2 v_2$. Torricelli: $v = \sqrt{"{2gh}"}$.
      </Resumen>

      <AutoCheck
        pregunta="En una prensa hidráulica los émbolos tienen áreas de 5 cm² y 200 cm². Si se aplican 50 N en el menor, ¿qué fuerza se obtiene en el mayor?"
        opciones={["500 N", "1000 N", "4000 N", "2000 N"]}
        correctaIdx={3}
        explicacion="F₂ = F₁ · (A₂ / A₁) = 50 × (200 / 5) = 50 × 40 = 2000 N."
      />

      <AutoCheck
        pregunta="Un objeto de volumen 2 × 10⁻³ m³ se sumerge totalmente en agua (ρ = 1000 kg/m³, g = 10 m/s²). ¿Cuál es el empuje?"
        opciones={["20 N", "2 N", "200 N", "10 N"]}
        correctaIdx={0}
        explicacion="E = ρ · g · V = 1000 × 10 × (2 × 10⁻³) = 20 N."
      />

      <AutoCheck
        pregunta="Un tanque abierto tiene un pequeño orificio a 5 m por debajo de la superficie del agua (g = 10 m/s²). ¿Con qué rapidez sale el agua?"
        opciones={["5 m/s", "50 m/s", "10 m/s", "100 m/s"]}
        correctaIdx={2}
        explicacion="Por Torricelli: v = √(2gh) = √(2 × 10 × 5) = √100 = 10 m/s."
      />

      <AutoCheck
        pregunta="Por un conducto de área 6 cm² fluye agua a 4 m/s. Si el conducto se estrecha a 3 cm², ¿cuál es la nueva rapidez?"
        opciones={["2 m/s", "8 m/s", "12 m/s", "4 m/s"]}
        correctaIdx={1}
        explicacion="Por continuidad A₁v₁ = A₂v₂: 6 × 4 = 3 × v₂ → v₂ = 24 / 3 = 8 m/s."
      />
    </EscenaRica>
  );
}
