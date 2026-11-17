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
      unidad="FIS-13"
      tituloUnidad="Estática, equilibrio y máquinas simples"
      escenas={[
        { titulo: "Diagrama de cuerpo libre (DCL)", componente: EscDCL },
        { titulo: "1.ª condición de equilibrio y Newton", componente: EscPrimeraCondicion },
        { titulo: "Torque y 2.ª condición de equilibrio", componente: EscTorque },
        { titulo: "Máquinas simples: palancas, poleas y plano", componente: EscMaquinas },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores frecuentes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscDCL() {
  return (
    <EscenaRica>
      <Titulo>Diagrama de cuerpo libre (DCL)</Titulo>

      <Hook>
        Cuando sostienes una bandeja o tu bíceps levanta una pesa, actúan varias
        fuerzas a la vez. Antes de escribir una sola ecuación, el{" "}
        <strong>diagrama de cuerpo libre</strong> ordena todas esas fuerzas en
        un dibujo limpio.
      </Hook>

      <Definicion termino="Diagrama de cuerpo libre (DCL)">
        Consiste en aislar el cuerpo de estudio y dibujar mediante flechas
        (vectores) todas las fuerzas externas que actúan sobre él, ubicadas en
        un plano cartesiano para poder descomponerlas en los ejes $x$ e $y$.
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 pasos para armar un DCL
          </text>
          {[
            { n: "1. Aísla", d: "Separa el cuerpo y dibuja sus fuerzas", c: LIENZO.ok },
            { n: "2. Ejes", d: "Traza el plano cartesiano x-y sobre él", c: "var(--dib-cyan-500)" },
            { n: "3. Descompón", d: "Proyecta fuerzas inclinadas (cos θ, sen θ)", c: LIENZO.warn },
            { n: "4. Ecuaciones", d: "Aplica ΣFx = 0, ΣFy = 0 y Στ = 0", c: LIENZO.accent },
          ].map((p, i) => (
            <g key={i} transform={`translate(14, ${40 + i * 74})`}>
              <rect x={0} y={0} width={332} height={62} rx={8} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.4} />
              <text x={14} y={24} fill={p.c} fontSize={13} fontWeight={700}>{p.n}</text>
              <text x={14} y={46} fill={LIENZO.fg} fontSize={13}>{p.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        Las 4 fuerzas más frecuentes en estática: <strong>Peso ($W = mg$)</strong>{" "}
        siempre vertical hacia abajo; <strong>Normal ($N$)</strong> perpendicular
        a la superficie; <strong>Tensión ($T$)</strong> a lo largo de la cuerda;{" "}
        <strong>Fricción ($f$)</strong> paralela a la superficie, opuesta al
        posible deslizamiento.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPrimeraCondicion() {
  return (
    <EscenaRica>
      <Titulo>1.ª condición de equilibrio y leyes de Newton</Titulo>

      <Definicion termino="1.ª y 3.ª Ley de Newton en estática">
        La <strong>1.ª Ley (inercia)</strong> dice que un cuerpo sigue en reposo
        o en MRU si no actúa una fuerza neta externa. La{" "}
        <strong>3.ª Ley (acción y reacción)</strong> establece que a toda acción
        corresponde una reacción de igual magnitud y dirección, pero sentido
        opuesto (en cuerpos distintos).
      </Definicion>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Primera condición de equilibrio (traslación)
          </text>

          <rect x={14} y={38} width={332} height={110} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={180} y={64} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            ΣF = 0   ⇒   ΣFx = 0   y   ΣFy = 0
          </text>
          <text x={28} y={92} fill={LIENZO.fg} fontSize={13}>
            • Eje x: fuerzas a la derecha = a la izquierda
          </text>
          <text x={28} y={114} fill={LIENZO.fg} fontSize={13}>
            • Eje y: fuerzas hacia arriba = hacia abajo
          </text>
          <text x={28} y={136} fill={LIENZO.fgDim} fontSize={13}>
            (Equilibrio estático si v = 0; dinámico si MRU)
          </text>

          <rect x={14} y={164} width={332} height={158} rx={8} fill={LIENZO.accent} opacity={0.09} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={28} y={188} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Descomposición típica con ángulo θ
          </text>
          <text x={28} y={214} fill={LIENZO.fg} fontSize={13}>
            Si una cuerda forma θ con la HORIZONTAL:
          </text>
          <text x={38} y={236} fill={LIENZO.fg} fontSize={13}>
            Tx = T · cos(θ)     |     Ty = T · sen(θ)
          </text>
          <text x={28} y={266} fill={LIENZO.fg} fontSize={13}>
            Si θ está medido respecto a la VERTICAL:
          </text>
          <text x={38} y={288} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Tx = T · sen(θ)     |     Ty = T · cos(θ)
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Mira siempre respecto a qué eje está dado el ángulo $\theta$: si es con
        la vertical, el cateto adyacente es $T_y = T \cos\theta$, ¡no {"$T\\operatorname{sen}\\theta$"}!
      </Cuidado>
    </EscenaRica>
  );
}

function EscTorque() {
  return (
    <EscenaRica>
      <Titulo>Torque y 2.ª condición de equilibrio</Titulo>

      <Hook>
        Dos niños pueden equilibrar un sube-y-baja aunque pesen distinto: el más
        pesado se sienta más cerca del apoyo. Eso ocurre porque no solo importa
        la fuerza, sino también su distancia al eje de giro.
      </Hook>

      <Definicion termino="Momento o torque ($\tau$) y 2.ª condición">
        El <strong>torque</strong> mide la capacidad de una fuerza para hacer
        girar un cuerpo: $\tau = F \cdot d$ (cuando $F$ es perpendicular al
        brazo $d$). Para que no rote, debe cumplirse la{" "}
        <strong>2.ª condición de equilibrio</strong>: $\sum \tau = 0$ respecto a
        cualquier punto.
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Equilibrio de rotación: Στ = 0
          </text>

          {/* Barra y fulcro */}
          <line x1={30} y1={130} x2={330} y2={130} stroke={LIENZO.fg} strokeWidth={4} />
          <polygon points="180,132 166,162 194,162" fill={LIENZO.accent} />
          <text x={180} y={180} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Punto de apoyo (eje)
          </text>

          {/* Fuerza izquierda */}
          <line x1={60} y1={72} x2={60} y2={125} stroke={LIENZO.ok} strokeWidth={3} />
          <polygon points="60,128 54,116 66,116" fill={LIENZO.ok} />
          <text x={60} y={62} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            F₁ = 60 N
          </text>
          <text x={120} y={116} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            d₁ = 2 m
          </text>

          {/* Fuerza derecha */}
          <line x1={270} y1={72} x2={270} y2={125} stroke={LIENZO.warn} strokeWidth={3} />
          <polygon points="270,128 264,116 276,116" fill={LIENZO.warn} />
          <text x={270} y={62} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            F₂ = 80 N
          </text>
          <text x={225} y={116} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            d₂ = 1,5 m
          </text>

          <rect x={14} y={200} width={332} height={130} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={28} y={224} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Convención de signos:
          </text>
          <text x={28} y={248} fill={LIENZO.ok} fontSize={13}>
            • Giro antihorario: τ positivo (+)  → 60 × 2 = +120 N·m
          </text>
          <text x={28} y={272} fill={LIENZO.warn} fontSize={13}>
            • Giro horario: τ negativo (−)     → 80 × 1,5 = −120 N·m
          </text>
          <text x={28} y={304} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Στ = 120 − 120 = 0  ⇒  ¡En equilibrio!
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Si una fuerza pasa justo por el punto de apoyo ($d = 0$), su torque es{" "}
        <strong>cero</strong>. Elegir el apoyo donde hay una incógnita elimina
        esa incógnita al instante.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscMaquinas() {
  return (
    <EscenaRica>
      <Titulo>Máquinas simples: palancas, poleas y plano</Titulo>

      <Definicion termino="Ventaja mecánica (VM)">
        Una máquina simple multiplica la fuerza aplicada o cambia su dirección,
        sin crear energía ($W_{"{entrada}"} = W_{"{salida}"}$ en el caso ideal).
        La ventaja mecánica es $\text{"{VM}"} = \dfrac{"{R}"}{"{F}"}$, donde $R$
        es la carga (resistencia) y $F$ la fuerza aplicada.
      </Definicion>

      <Pizarra alto={312}>
        <svg width="100%" height="100%" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 máquinas simples clave en examen
          </text>

          <rect x={12} y={38} width={336} height={96} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={24} y={60} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            1. Palanca (equilibrio de torques)
          </text>
          <text x={24} y={84} fill={LIENZO.fg} fontSize={13}>
            F · dF = R · dR    |    VM = dF / dR
          </text>
          <text x={24} y={108} fill={LIENZO.fgDim} fontSize={13}>
            (El brazo del bíceps es palanca de 3.º género: dF &lt; dR)
          </text>

          <rect x={12} y={148} width={336} height={96} rx={8} fill="var(--dib-cyan-500)" opacity={0.1} stroke="var(--dib-cyan-500)" strokeWidth={1.4} />
          <text x={24} y={170} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            2. Poleas y polipastos
          </text>
          <text x={24} y={194} fill={LIENZO.fg} fontSize={13}>
            Polea fija: VM = 1 (solo cambia dirección)
          </text>
          <text x={24} y={218} fill={LIENZO.fg} fontSize={13}>
            Polipasto de n tramos / VM:  F = W / VM
          </text>

          <rect x={12} y={258} width={336} height={88} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={24} y={280} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            3. Plano inclinado liso (altura h, largo L)
          </text>
          <text x={24} y={304} fill={LIENZO.fg} fontSize={13}>
            F = W · sen(θ) = W · (h / L)
          </text>
          <text x={24} y={328} fill={LIENZO.fgDim} fontSize={13}>
            Comprobación por trabajo: F · L = W · h
          </text>
        </svg>
      </Pizarra>

      <Conexion>
        En anatomía humana, la mayoría de las articulaciones (como el codo
        levantando un peso con la mano) funcionan como palancas donde el músculo
        está muy cerca del apoyo ($d_F &lt; d_R$): hace más fuerza que el peso,
        pero gana velocidad y amplitud de movimiento.
      </Conexion>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Palanca del antebrazo (F5.1 PSA)">
        <p className="mb-2">
          Un antebrazo sostiene un libro de <strong>40 N</strong> a{" "}
          <strong>30 cm</strong> del codo (apoyo). Si el bíceps se inserta a{" "}
          <strong>5 cm</strong> del codo, ¿qué fuerza $F$ debe ejercer para
          mantenerlo horizontal?
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Equilibrio de torques respecto al codo:{" "}
          $F \cdot d_F = R \cdot d_R \Rightarrow F(5) = 40(30)$.
          <br />
          <strong>Paso 2:</strong> $F = \dfrac{"{1200}"}{"{5}"} = \mathbf{"{240\\ N}"}$.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Tensión en equilibrio con ángulo vertical (F5.3 PSA)">
        <p className="mb-2">
          Un bloque de peso $W = 100\ \text{"{N}"}$ cuelga de una cuerda que
          forma $37^\circ$ con la <strong>vertical</strong>, sostenida
          lateralmente por otra cuerda horizontal. Calcula la tensión $T$ de la
          cuerda inclinada ($\cos 37^\circ = 0,8$).
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> En el eje vertical ($\sum F_y = 0$), como el
          ángulo está con la vertical: $T \cos 37^\circ = W \Rightarrow T(0,8) = 100$.
          <br />
          <strong>Paso 2:</strong> $T = \dfrac{"{100}"}{"{0,8}"} = \mathbf{"{125\\ N}"}$.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores frecuentes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Si ΣF = 0, el cuerpo nunca puede girar'">
        <strong>Realidad:</strong> dos fuerzas iguales y opuestas en extremos
        distintos de una barra suman $\sum F = 0$, pero producen un par de
        giro ($\sum \tau \ne 0$). Para equilibrio total hacen falta ambas
        condiciones.
      </Misconception>

      <Misconception titulo="Error 2 · 'La fuerza de acción y reacción se cancelan entre sí'">
        <strong>Realidad:</strong> actúan sobre <strong>cuerpos distintos</strong>,
        así que en el DCL de un solo cuerpo nunca se restan entre sí.
      </Misconception>

      <Misconception titulo="Error 3 · 'Una polea fija reduce a la mitad la fuerza necesaria'">
        <strong>Realidad:</strong> la polea fija solo cambia la dirección de la
        fuerza ($\text{"{VM}"} = 1$). La que divide el esfuerzo entre 2 es la
        polea móvil.
      </Misconception>

      <Resumen>
        DCL → ejes → descomposición. 1.ª condición: $\sum F_x = 0$, $\sum F_y = 0$.
        2.ª condición: $\sum \tau = 0$ con $\tau = F \cdot d$ (antihorario $+$,
        horario $-$). Palanca: $F \cdot d_F = R \cdot d_R$. Polipasto: $F = W / \text{"{VM}"}$.
        Plano inclinado liso: $F = W \cdot h / L$.
      </Resumen>

      <AutoCheck
        pregunta="En una barra en equilibrio apoyada en su centro, una fuerza de 60 N actúa a 2 m a la izquierda. ¿A qué distancia a la derecha debe actuar una fuerza de 80 N?"
        opciones={["2,0 m", "3,0 m", "1,5 m", "1,0 m"]}
        correctaIdx={2}
        explicacion="Por suma de torques nula: 60 × 2 = 80 × d → d = 120 / 80 = 1,5 m."
      />

      <AutoCheck
        pregunta="Un polipasto ideal tiene una ventaja mecánica VM = 4. ¿Qué fuerza se necesita para sostener una carga de 800 N?"
        opciones={["200 N", "400 N", "100 N", "3200 N"]}
        correctaIdx={0}
        explicacion="F = W / VM = 800 / 4 = 200 N."
      />

      <AutoCheck
        pregunta="Para subir un bloque de 600 N por un plano inclinado liso de 5 m de largo y 1,5 m de altura, ¿qué fuerza paralela al plano se requiere?"
        opciones={["300 N", "200 N", "150 N", "180 N"]}
        correctaIdx={3}
        explicacion="sen θ = h / L = 1,5 / 5 = 0,3; F = W · sen θ = 600 × 0,3 = 180 N."
      />

      <AutoCheck
        pregunta="¿Por qué las fuerzas de acción y reacción de la 3.ª Ley de Newton NO se anulan en un diagrama de cuerpo libre?"
        opciones={[
          "Porque tienen distinta magnitud",
          "Porque actúan sobre cuerpos diferentes",
          "Porque siempre son perpendiculares",
          "Porque solo existen cuando hay aceleración",
        ]}
        correctaIdx={1}
        explicacion="La acción y la reacción tienen igual magnitud y sentidos opuestos, pero actúan sobre cuerpos distintos."
      />
    </EscenaRica>
  );
}
