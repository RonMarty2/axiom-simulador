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
      unidad="FIS-16"
      tituloUnidad="Magnetismo y electromagnetismo"
      escenas={[
        { titulo: "Imanes, campo magnético y Oersted", componente: EscImanesCampo },
        { titulo: "Fuerza magnética sobre una carga", componente: EscLorentz },
        { titulo: "Órbita circular en campo uniforme", componente: EscCircular },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscImanesCampo() {
  return (
    <EscenaRica>
      <Titulo>Imanes, campo magnético y corrientes</Titulo>

      <Hook>
        En 1820 Hans Christian Oersted acercó una brújula a un cable con
        corriente y vio cómo la aguja se desviaba: descubrió que{" "}
        <strong>toda corriente eléctrica genera un campo magnético</strong>.
      </Hook>

      <Definicion termino="Propiedades de imanes y campo ($\vec{B}$)">
        Todo imán tiene polos Norte (N) y Sur (S){" "}
        <strong>inseparables</strong> (si lo partes, cada trozo forma un nuevo
        imán N-S). Las líneas de campo salen de N y entran por S formando lazos
        cerrados. En el SI, el campo magnético $B$ se mide en{" "}
        <strong>teslas ($\text{"{T}"}$)</strong>.
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Campos producidos por corrientes (Oersted)
          </text>

          <rect x={14} y={40} width={332} height={140} rx={8} fill="var(--dib-cyan-500)" opacity={0.1} stroke="var(--dib-cyan-500)" strokeWidth={1.4} />
          <text x={28} y={64} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            1. Conductor recto largo con corriente I
          </text>
          <text x={180} y={96} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            B = (μ₀ · I) / (2 · π · d)
          </text>
          <text x={28} y={124} fill={LIENZO.fg} fontSize={13}>
            • Directamente proporcional a la corriente I.
          </text>
          <text x={28} y={146} fill={LIENZO.fg} fontSize={13}>
            • Inversamente proporcional a la distancia d:
          </text>
          <text x={38} y={166} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            si d se duplica (2d), B cae a la mitad (B/2).
          </text>

          <rect x={14} y={194} width={332} height={138} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={218} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            2. Solenoide y electroimán
          </text>
          <text x={28} y={244} fill={LIENZO.fg} fontSize={13}>
            • Solenoide: bobina de N espiras cuyo campo
          </text>
          <text x={38} y={262} fill={LIENZO.fg} fontSize={13}>
            es proporcional al número de espiras.
          </text>
          <text x={28} y={288} fill={LIENZO.fg} fontSize={13}>
            • Electroimán: solenoide + núcleo de hierro dulce
          </text>
          <text x={38} y={306} fill={LIENZO.fgDim} fontSize={13}>
            (campo mucho mayor mientras pasa corriente).
          </text>
        </svg>
      </Pizarra>
    </EscenaRica>
  );
}

function EscLorentz() {
  return (
    <EscenaRica>
      <Titulo>Fuerza magnética sobre una carga</Titulo>

      <Definicion termino="Fuerza de Lorentz magnética">
        Cuando una carga $q$ se mueve con rapidez $v$ dentro de un campo
        magnético uniforme $B$ formando un ángulo $\theta$ con $\vec{"{B}"}$,
        experimenta una fuerza:
        <br />
        {"$F = |q|\\, v\\, B\\, \\operatorname{sen}\\theta$"}
      </Definicion>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Cuándo hay fuerza y cuándo es CERO?
          </text>

          <rect x={14} y={40} width={332} height={92} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={64} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Fuerza MÁXIMA (θ = 90°, v ⟂ B)
          </text>
          <text x={28} y={88} fill={LIENZO.fg} fontSize={13}>
            sen 90° = 1   ⇒   F = |q| · v · B
          </text>
          <text x={28} y={112} fill={LIENZO.fgDim} fontSize={13}>
            F es perpendicular tanto a v como a B.
          </text>

          <rect x={14} y={148} width={332} height={174} rx={8} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.4} />
          <text x={28} y={172} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Fuerza NULA (F = 0) en 3 casos:
          </text>
          <text x={28} y={200} fill={LIENZO.fg} fontSize={13}>
            1. Carga en reposo (v = 0).
          </text>
          <text x={28} y={226} fill={LIENZO.fg} fontSize={13}>
            2. Partícula neutra (q = 0, ej. neutrón).
          </text>
          <text x={28} y={252} fill={LIENZO.fg} fontSize={13}>
            3. Movimiento PARALELO o antiparalelo a B
          </text>
          <text x={38} y={272} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            (θ = 0° o 180°, porque sen 0° = 0).
          </text>
          <text x={28} y={302} fill={LIENZO.fgDim} fontSize={13}>
            La fuerza magnética NO cambia la rapidez v, solo desvía.
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Como $\vec{"{F}"}$ es siempre perpendicular a la velocidad $\vec{"{v}"}$,
        el campo magnético <strong>no realiza trabajo</strong> sobre la carga:
        no la acelera ni la frena, solo cambia su dirección.
      </Cuidado>
    </EscenaRica>
  );
}

function EscCircular() {
  return (
    <EscenaRica>
      <Titulo>Órbita circular en un campo uniforme</Titulo>

      <Definicion termino="Radio de curvatura ($r$)">
        Si una carga entra <strong>perpendicularmente</strong> ($\theta = 90^\circ$)
        a un campo magnético uniforme, la fuerza magnética actúa como fuerza
        centrípeta y describe un círculo de radio:
        <br />
        $q v B = \dfrac{"{m v^2}"}{"{r}"} \Rightarrow r = \dfrac{"{m v}"}{"{q B}"}$
      </Definicion>

      <Pizarra alto={269}>
        <svg width="100%" height="100%" viewBox="0 0 360 310" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Cómo cambia el radio r = (m · v) / (q · B)
          </text>

          <rect x={14} y={40} width={332} height={116} rx={8} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={28} y={66} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Proporcionalidades directas e inversas:
          </text>
          <text x={28} y={92} fill={LIENZO.fg} fontSize={13}>
            • Más masa (m) o más rapidez (v) → radio MAYOR.
          </text>
          <text x={28} y={116} fill={LIENZO.fg} fontSize={13}>
            • Si v se duplica (2v) → r se duplica (2r).
          </text>
          <text x={28} y={140} fill={LIENZO.fg} fontSize={13}>
            • Más carga (q) o más campo (B) → radio MENOR.
          </text>

          <rect x={14} y={172} width={332} height={120} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={196} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Inducción de Faraday (1830)
          </text>
          <text x={28} y={222} fill={LIENZO.fg} fontSize={13}>
            Así como una corriente crea campo magnético, un
          </text>
          <text x={28} y={242} fill={LIENZO.fg} fontSize={13}>
            campo magnético que VARÍA en el tiempo induce
          </text>
          <text x={28} y={262} fill={LIENZO.fg} fontSize={13}>
            una corriente eléctrica en un conductor cercano.
          </text>
        </svg>
      </Pizarra>

      <Conexion>
        En medicina, la <strong>Resonancia Magnética (RMN)</strong> usa imanes
        superconductores de varios teslas para alinear protones de hidrógeno, y
        bobinas receptoras que detectan señales por inducción de Faraday.
      </Conexion>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Fuerza magnética sobre un protón (F9.1 PSA)">
        <p className="mb-2">
          Un protón ({"$q = 1{,}6 \\times 10^{-19}\\ \\text{C}$"}) entra
          perpendicularmente a un campo magnético uniforme $B = 0,5\ \text{"{T}"}$
          con rapidez $v = 2 \times 10^6\ \text{"{m/s}"}$. Calcula la magnitud de
          la fuerza magnética.
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Como entra perpendicular ($\theta = 90^\circ$,
          $\operatorname{"{sen}"}\,90^\circ = 1$):
          <br />
          {"$F = q v B = (1{,}6 \\times 10^{-19})(2 \\times 10^6)(0{,}5)$"}
          <br />
          <strong>Paso 2:</strong> $(2 \times 10^6)(0,5) = 10^6 \Rightarrow F = \mathbf{"{1{,}6 \\times 10^{-13}\\ N}"}$.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Radio de la trayectoria circular (F9.4 PSA)">
        <p className="mb-2">
          Una partícula cargada ingresa perpendicularmente a un campo magnético
          uniforme. Si se duplica su rapidez $v$, ¿cómo cambia el radio $r$ de
          su trayectoria circular?
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Igualando fuerza magnética y centrípeta:{" "}
          $r = \dfrac{"{m v}"}{"{q B}"}$.
          <br />
          <strong>Paso 2:</strong> Como $r$ es directamente proporcional a $v$,
          al duplicar $v$ el radio <strong>también se duplica</strong>.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Un campo magnético ejerce fuerza sobre una carga quieta'">
        <strong>Realidad:</strong> si $v = 0$, entonces $F = q v B \operatorname{"{sen}"}\theta = 0$.
        El campo magnético solo actúa sobre cargas <strong>en movimiento</strong>.
      </Misconception>

      <Misconception titulo="Error 2 · 'Si la carga viaja paralela al campo, la fuerza es máxima'">
        <strong>Realidad:</strong> paralela significa $\theta = 0^\circ$ (o
        $180^\circ$), donde $\operatorname{"{sen}"}\theta = 0$, así que{" "}
        <strong>la fuerza es cero</strong>. Es máxima cuando es perpendicular
        ($90^\circ$).
      </Misconception>

      <Misconception titulo="Error 3 · 'Al partir un imán se separa el polo Norte del Sur'">
        <strong>Realidad:</strong> los polos magnéticos son{" "}
        <strong>inseparables</strong>; cada fragmento se convierte en un imán
        completo con su propio Norte y Sur.
      </Misconception>

      <Mnemotecnia>
        <strong>{"$F = qvB\\operatorname{sen}\\theta$"}</strong> → &ldquo;Que Viva
        Bolivia&rdquo; ($q \cdot v \cdot B$), por el seno del ángulo entre
        velocidad y campo.
      </Mnemotecnia>

      <Resumen>
        Hilo recto: $B = \mu_0 I / (2\pi d)$ (inverso a $d$). Fuerza de Lorentz:{" "}
        {"$F = q v B \\operatorname{sen}\\theta$"} (0 si $v = 0$ o paralelo).
        Trayectoria circular: $r = mv / (qB)$. Faraday: un campo magnético
        variable induce corriente eléctrica.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué fuerza magnética actúa sobre una carga positiva que se mueve PARALELA a las líneas de un campo magnético uniforme?"
        opciones={[
          "Máxima (qvB)",
          "La mitad de qvB",
          "Cero",
          "Depende solo de la masa",
        ]}
        correctaIdx={2}
        explicacion="Cuando v y B son paralelos, θ = 0° (o 180°) y sen θ = 0, por lo que F = 0."
      />

      <AutoCheck
        pregunta="Un conductor recto largo transporta corriente I. A distancia d produce un campo B. ¿Cuánto vale el campo a distancia 2d?"
        opciones={["B/2", "2B", "B/4", "4B"]}
        correctaIdx={0}
        explicacion="B = μ₀I / (2πd) es inversamente proporcional a d. Al duplicar d, el campo se reduce a la mitad (B/2)."
      />

      <AutoCheck
        pregunta="Si una carga entra perpendicularmente a un campo B y se duplica la intensidad del campo B (manteniendo m, v y q), ¿qué ocurre con el radio r?"
        opciones={[
          "Se duplica",
          "No cambia",
          "Se cuadruplica",
          "Se reduce a la mitad",
        ]}
        correctaIdx={3}
        explicacion="Como r = mv / (qB), el radio es inversamente proporcional a B: al duplicar B, el radio se reduce a la mitad."
      />

      <AutoCheck
        pregunta="¿Qué científico descubrió que una corriente eléctrica desvía la aguja de una brújula (genera campo magnético)?"
        opciones={[
          "Michael Faraday",
          "Hans Christian Oersted",
          "Blaise Pascal",
          "Willebrord Snell",
        ]}
        correctaIdx={1}
        explicacion="Oersted (1820) observó la desviación de la brújula cerca de una corriente eléctrica; Faraday (1830) descubrió el fenómeno inverso (inducción)."
      />
    </EscenaRica>
  );
}
