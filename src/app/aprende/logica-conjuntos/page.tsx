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
      unidad="MAT-22"
      tituloUnidad="Lógica proposicional y teoría de conjuntos"
      escenas={[
        { titulo: "Proposiciones y conectivos lógicos", componente: EscProposiciones },
        { titulo: "Equivalencias y leyes de De Morgan", componente: EscLeyesLogicas },
        { titulo: "Conjuntos, pertenencia e inclusión", componente: EscConjuntos },
        { titulo: "Diagramas de Venn y cardinalidad", componente: EscCardinalidad },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscProposiciones() {
  return (
    <EscenaRica>
      <Titulo>Proposiciones y conectivos lógicos</Titulo>

      <Hook>
        En medicina clínica razonas todo el tiempo con condiciones: &ldquo;Si
        tiene fiebre <strong>y</strong> tos, <strong>entonces</strong> pide
        radiografía&rdquo;. La lógica proposicional convierte esas frases en
        reglas exactas con valores de verdad (V o F).
      </Hook>

      <Definicion termino="Proposición y conectivos">
        Una <strong>proposición</strong> es un enunciado del que puede decirse
        si es verdadero (V) o falso (F). Los conectivos principales son:{" "}
        <strong>negación</strong> ($\neg p$), <strong>conjunción</strong>{" "}
        ($p \land q$, &ldquo;y&rdquo;), <strong>disyunción</strong> ($p \lor q$,
        &ldquo;o&rdquo;), <strong>implicación</strong> ($p \to q$, &ldquo;si…
        entonces&rdquo;) y <strong>bicondicional</strong> ($p \leftrightarrow q$).
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Regla de oro de los conectivos
          </text>
          {[
            { op: "p ∧ q (y)", reg: "Solo es V cuando AMBAS son V", c: LIENZO.ok },
            { op: "p ∨ q (o)", reg: "Solo es F cuando AMBAS son F", c: "var(--dib-cyan-500)" },
            { op: "p → q (si… entonces)", reg: "Solo es F cuando V → F", c: LIENZO.bad },
            { op: "p ↔ q (si y solo si)", reg: "Es V si ambas tienen el MISMO valor", c: LIENZO.accent },
          ].map((item, i) => (
            <g key={i} transform={`translate(14, ${40 + i * 74})`}>
              <rect x={0} y={0} width={332} height={62} rx={8} fill={item.c} opacity={0.1} stroke={item.c} strokeWidth={1.4} />
              <text x={14} y={24} fill={item.c} fontSize={13} fontWeight={700}>{item.op}</text>
              <text x={14} y={48} fill={LIENZO.fg} fontSize={13}>{item.reg}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        El truco más preguntado en examen: si te dicen que una implicación{" "}
        $A \to B$ es <strong>falsa</strong>, inmediatamente sabes dos cosas a
        la vez: $A \equiv \text{"{V}"}$ y $B \equiv \text{"{F}"}$.
      </Cuidado>
    </EscenaRica>
  );
}

function EscLeyesLogicas() {
  return (
    <EscenaRica>
      <Titulo>Equivalencias y leyes de De Morgan</Titulo>

      <Definicion termino="Equivalencia lógica ($\equiv$)">
        Dos fórmulas son lógicamente equivalentes si tienen la misma tabla de
        verdad. Para simplificar expresiones sin hacer toda la tabla se usan
        leyes algebraicas de proposiciones.
      </Definicion>

      <Pizarra alto={277}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Leyes lógicas imprescindibles
          </text>

          <rect x={14} y={38} width={332} height={106} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={28} y={62} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Leyes de De Morgan (niegan y cambian ∧ ↔ ∨):
          </text>
          <text x={28} y={88} fill={LIENZO.fg} fontSize={13}>
            • ¬(p ∨ q)  ≡  ¬p ∧ ¬q
          </text>
          <text x={28} y={112} fill={LIENZO.fg} fontSize={13}>
            • ¬(p ∧ q)  ≡  ¬p ∨ ¬q
          </text>
          <text x={28} y={134} fill={LIENZO.fgDim} fontSize={13}>
            (Doble negación: ¬(¬p) ≡ p)
          </text>

          <rect x={14} y={158} width={332} height={144} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={182} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Otras equivalencias frecuentes:
          </text>
          <text x={28} y={208} fill={LIENZO.fg} fontSize={13}>
            • Implicación:  p → q  ≡  ¬p ∨ q
          </text>
          <text x={28} y={234} fill={LIENZO.fg} fontSize={13}>
            • Contrarrecíproca:  p → q  ≡  ¬q → ¬p
          </text>
          <text x={28} y={260} fill={LIENZO.fg} fontSize={13}>
            • Idempotencia:  p ∧ p ≡ p   |   p ∨ p ≡ p
          </text>
          <text x={28} y={286} fill={LIENZO.fg} fontSize={13}>
            • Absorción:  p ∧ (p ∨ q) ≡ p
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Al repartir una negación $\neg$ con De Morgan, niegas cada letra{" "}
        <strong>y das vuelta al conector</strong> ($\land$ pasa a $\lor$ y
        viceversa).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscConjuntos() {
  return (
    <EscenaRica>
      <Titulo>Conjuntos, pertenencia e inclusión</Titulo>

      <Definicion termino="Determinación y relaciones">
        Un conjunto se define por <strong>extensión</strong> (listando elementos:{" "}
        {"$A = \\{1, 2, 3\\}$"}) o por <strong>comprensión</strong> (dando una
        propiedad). La relación <strong>elemento → conjunto</strong> usa{" "}
        $\in$ (pertenece); la relación <strong>conjunto → conjunto</strong> usa{" "}
        $\subset$ (subconjunto o inclusión).
      </Definicion>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Operaciones entre conjuntos (Venn)
          </text>

          {/* Dos círculos de Venn */}
          <circle cx={142} cy={104} r={52} fill="var(--dib-cyan-500)" opacity={0.16} stroke="var(--dib-cyan-500)" strokeWidth={1.8} />
          <circle cx={218} cy={104} r={52} fill={LIENZO.warn} opacity={0.16} stroke={LIENZO.warn} strokeWidth={1.8} />
          <text x={108} y={108} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>A−B</text>
          <text x={180} y={108} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>A∩B</text>
          <text x={252} y={108} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>B−A</text>
          <text x={96} y={56} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>A</text>
          <text x={256} y={56} fill={LIENZO.warn} fontSize={13} fontWeight={700}>B</text>

          <rect x={14} y={176} width={332} height={148} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={28} y={200} fill={LIENZO.fg} fontSize={13}>
            • Unión (A ∪ B): está en A o en B (o en ambos).
          </text>
          <text x={28} y={224} fill={LIENZO.fg} fontSize={13}>
            • Intersección (A ∩ B): está en A y en B a la vez.
          </text>
          <text x={28} y={248} fill={LIENZO.fg} fontSize={13}>
            • Diferencia (A − B): está en A, pero NO en B.
          </text>
          <text x={28} y={272} fill={LIENZO.fg} fontSize={13}>
            • Complemento (Aᶜ): está en U, pero NO en A.
          </text>
          <text x={28} y={298} fill={LIENZO.fgDim} fontSize={13}>
            • Vacío (∅): 0 elementos; es subconjunto de todos.
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Si un conjunto contiene otro conjunto como elemento, por ejemplo{" "}
        {"$M = \\{1, 2, \\{3\\}, 4\\}$"}, entonces $|M| = 4$. Aquí{" "}
        {"$\\{3\\} \\in M$"} es verdadero, pero {"$3 \\in M$"} y{" "}
        {"$\\{3\\} \\subset M$"} son falsos; su subconjunto unitario es{" "}
        {"$\\{\\{3\\}\\} \\subset M$"}.
      </Cuidado>
    </EscenaRica>
  );
}

function EscCardinalidad() {
  return (
    <EscenaRica>
      <Titulo>Diagramas de Venn y cardinalidad</Titulo>

      <Definicion termino="Principio de inclusión-exclusión">
        El cardinal $n(A)$ cuenta cuántos elementos tiene $A$. Para dos
        conjuntos, al sumar $n(A) + n(B)$ contamos dos veces la intersección,
        por eso la restamos una vez:
        <br />
        $n(A \cup B) = n(A) + n(B) - n(A \cap B)$
      </Definicion>

      <Pizarra alto={286}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ejemplo de Venn: 80 estudiantes (M1.2 PSA)
          </text>

          <rect x={24} y={36} width={312} height={154} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          <circle cx={142} cy={112} r={52} fill={LIENZO.ok} opacity={0.14} stroke={LIENZO.ok} strokeWidth={1.6} />
          <circle cx={218} cy={112} r={52} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={80} y={62} fill={LIENZO.ok} fontSize={13} fontWeight={700}>Anat. (52)</text>
          <text x={242} y={62} fill={LIENZO.accent} fontSize={13} fontWeight={700}>Hist. (44)</text>

          <text x={112} y={116} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>26</text>
          <text x={180} y={116} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>26</text>
          <text x={248} y={116} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>18</text>
          <text x={294} y={176} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Ninguna: 10</text>

          <rect x={14} y={204} width={332} height={110} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={228} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Cálculo paso a paso:
          </text>
          <text x={28} y={252} fill={LIENZO.fg} fontSize={13}>
            1. Al menos una: n(A ∪ H) = 80 − 10 = 70
          </text>
          <text x={28} y={276} fill={LIENZO.fg} fontSize={13}>
            2. Ambas: n(A ∩ H) = 52 + 44 − 70 = 26
          </text>
          <text x={28} y={298} fill={LIENZO.fgDim} fontSize={13}>
            Comprobación: 26 + 26 + 18 + 10 = 80.
          </text>
        </svg>
      </Pizarra>

      <Conexion>
        En salud pública y epidemiología usas exactamente estas regiones
        disjuntas para contar pacientes con un solo síntoma, con ambos síntomas
        a la vez o sanos.
      </Conexion>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Valores de verdad desde una implicación falsa (M1.1 PSA)">
        <p className="mb-2">
          Si la proposición $(p \land \neg q) \to r$ es <strong>falsa</strong>,
          determina los valores de verdad de $p$, $q$ y $r$ en ese orden.
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Una implicación solo es falsa cuando el
          antecedente es V y el consecuente es F: $(p \land \neg q) \equiv \text{"{V}"}${" "}
          y $r \equiv \text{"{F}"}$.
          <br />
          <strong>Paso 2:</strong> La conjunción es V solo si ambos son V:{" "}
          $p \equiv \text{"{V}"}$ y $\neg q \equiv \text{"{V}"}$, luego{" "}
          $q \equiv \text{"{F}"}$.
          <br />
          <strong>Respuesta:</strong> <strong>V, F, F</strong>.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Simplificación con De Morgan (M1.3 PSA)">
        <p className="mb-2">
          Simplifica la proposición $\neg(p \lor \neg q) \land q$.
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Por De Morgan: $\neg(p \lor \neg q) \equiv \neg p \land q$.
          <br />
          <strong>Paso 2:</strong> Reemplazamos y aplicamos idempotencia:{" "}
          $(\neg p \land q) \land q \equiv \neg p \land (q \land q) \equiv \mathbf{"{\\neg p \\land q}"}$.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · '¬(p ∨ q) es igual a ¬p ∨ ¬q'">
        <strong>Realidad:</strong> por De Morgan, el conector también cambia:{" "}
        $\neg(p \lor q) \equiv \neg p \land \neg q$.
      </Misconception>

      <Misconception titulo="Error 2 · 'Si p es falso, entonces p → q también es falso'">
        <strong>Realidad:</strong> cuando el antecedente $p$ es falso, la
        implicación $p \to q$ es siempre <strong>verdadera</strong>. Solo es
        falsa en el caso $V \to F$.
      </Misconception>

      <Misconception titulo="Error 3 · 'Confundir ⊂ con ∈'">
        <strong>Realidad:</strong> $\in$ relaciona un <strong>elemento</strong>{" "}
        con su conjunto; $\subset$ relaciona dos <strong>conjuntos</strong>.
      </Misconception>

      <Resumen>
        $p \to q$ solo es F en $V \to F$. De Morgan: $\neg(p \lor q) \equiv \neg p \land \neg q$
        y $\neg(p \land q) \equiv \neg p \lor \neg q$. Cardinalidad:{" "}
        $n(A \cup B) = n(A) + n(B) - n(A \cap B)$. Exactamente uno:{" "}
        $n(A \cup B) - n(A \cap B)$.
      </Resumen>

      <AutoCheck
        pregunta="En una encuesta a 100 pacientes, 75 tienen fiebre, 60 tienen tos y todos tienen al menos uno de los dos síntomas. ¿Cuántos tienen EXACTAMENTE un síntoma?"
        opciones={["85", "65", "70", "100"]}
        correctaIdx={1}
        explicacion="Ambos síntomas: 75 + 60 − 100 = 35. Solo fiebre: 75 − 35 = 40; solo tos: 60 − 35 = 25. Exactamente un síntoma: 40 + 25 = 65."
      />

      <AutoCheck
        pregunta="Dado M = {1, 2, {3}, 4}, ¿cuál afirmación es verdadera?"
        opciones={["{3} ⊂ M", "3 ∈ M", "|M| = 5", "{{3}} ⊂ M"]}
        correctaIdx={3}
        explicacion="|M| = 4. Como {3} es un elemento de M, el conjunto formado por ese elemento sí es subconjunto: {{3}} ⊂ M."
      />

      <AutoCheck
        pregunta="¿Cuál proposición es equivalente a ¬(p ∧ ¬q) por la ley de De Morgan?"
        opciones={["¬p ∨ q", "¬p ∧ q", "p ∨ ¬q", "¬p ∨ ¬q"]}
        correctaIdx={0}
        explicacion="Negamos cada término (¬p y ¬¬q = q) y cambiamos ∧ por ∨: ¬p ∨ q."
      />

      <AutoCheck
        pregunta="¿En cuál único caso es FALSA la implicación p → q?"
        opciones={[
          "p = F, q = F",
          "p = F, q = V",
          "p = V, q = F",
          "p = V, q = V",
        ]}
        correctaIdx={2}
        explicacion="Una implicación p → q solo es falsa cuando el antecedente es verdadero (V) y el consecuente es falso (F)."
      />
    </EscenaRica>
  );
}
