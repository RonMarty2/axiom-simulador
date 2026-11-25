"use client";

import React from "react";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  EscenaRica,
  Titulo,
  Parrafo,
  Definicion,
  Hook,
  CasoBolivia,
  Misconception,
  WorkedExample,
  AutoCheck,
  Resumen,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="CL-01"
      tituloUnidad="Comprensión lectora aplicada a textos de salud"
      escenas={[
        { titulo: "Las 7 habilidades en la PSA 2027", componente: EscSieteHabilidades },
        { titulo: "Idea central y jerarquía de ideas", componente: EscJerarquia },
        { titulo: "Reconocimiento textual vs. paráfrasis", componente: EscParafrasis },
        { titulo: "Inferencia válida vs. suposición", componente: EscInferencia },
        { titulo: "Significado en contexto y función textual", componente: EscContextoFuncion },
        { titulo: "Estrategia de examen y práctica final", componente: EscEstrategiaPractica },
      ]}
    />
  );
}

// Bloque visual simple para presentar los fragmentos de lectura de forma limpia en móvil y escritorio.
function TextoLectura({
  etiqueta,
  titulo,
  children,
}: {
  etiqueta: string;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 620,
        boxSizing: "border-box",
        background: LIENZO.bgSoft,
        border: `1px solid ${LIENZO.fgFaint}`,
        borderRadius: 12,
        padding: "14px 16px",
        color: LIENZO.fg,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 1.4,
          textTransform: "uppercase",
          fontWeight: 700,
          color: LIENZO.accent,
          marginBottom: 4,
        }}
      >
        {etiqueta}
      </div>
      <div
        className="font-crimson"
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1.25,
          color: LIENZO.fg,
          marginBottom: 8,
        }}
      >
        {titulo}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.65, color: LIENZO.fg }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 1 · Las 7 habilidades oficiales de Comprensión Lectora (PSA 2027)
// ─────────────────────────────────────────────────────────────────────────────
function EscSieteHabilidades() {
  const habilidades = [
    { nombre: "1. Reconocimiento textual", nivel: "Literal", color: LIENZO.ok },
    { nombre: "2. Paráfrasis", nivel: "Literal", color: LIENZO.ok },
    { nombre: "3. Inferencia", nivel: "Inferencial", color: LIENZO.accent },
    { nombre: "4. Significado en contexto", nivel: "Inferencial", color: LIENZO.accent },
    { nombre: "5. Idea central", nivel: "Estructural", color: LIENZO.warn },
    { nombre: "6. Jerarquía de ideas", nivel: "Estructural", color: LIENZO.warn },
    { nombre: "7. Función del elemento", nivel: "Estructural", color: LIENZO.warn },
  ];

  return (
    <EscenaRica>
      <Titulo>Qué evalúa Comprensión Lectora en la PSA 2027</Titulo>

      <Hook>
        En la práctica médica, leer mal una indicación o suponer un dato que no
        figura en la historia clínica cambia por completo una decisión. En la
        PSA 2027 ocurre algo similar: las preguntas no miden tu memoria de datos
        sueltos, sino tu precisión para leer lo que el texto realmente sostiene.
      </Hook>

      <Parrafo>
        Toda pregunta de Comprensión Lectora apunta a una de{" "}
        <strong>siete habilidades concretas</strong>. Identificar desde el
        enunciado qué habilidad te están evaluando te ahorra tiempo y te permite
        saber exactamente qué buscar en el texto.
      </Parrafo>

      <Definicion termino="Comprensión lectora en ciencias de la salud">
        Capacidad de interpretar un texto biomédico o de salud pública en tres
        planos: <strong>literal</strong> (lo escrito y su reformulación),{" "}
        <strong>inferencial</strong> (deducciones y sentido en contexto) y{" "}
        <strong>estructural</strong> (idea global, jerarquía y función de cada
        parte).
      </Definicion>

      <Pizarra alto={352}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 352"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x={180}
            y={22}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            Mapa de las 7 habilidades (PSA 2027)
          </text>

          {habilidades.map((h, i) => (
            <g key={h.nombre} transform={`translate(12, ${36 + i * 44})`}>
              <rect
                x={0}
                y={0}
                width={336}
                height={36}
                rx={7}
                fill={h.color}
                opacity={0.1}
                stroke={h.color}
                strokeWidth={1.3}
              />
              <text
                x={10}
                y={23}
                fill={LIENZO.fg}
                fontSize={13}
                fontWeight={700}
              >
                {h.nombre}
              </text>
              <text
                x={326}
                y={23}
                textAnchor="end"
                fill={h.color}
                fontSize={13}
                fontWeight={600}
              >
                {h.nivel}
              </text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Parrafo>
        Empecemos por la primera habilidad: el{" "}
        <strong>reconocimiento textual</strong>, que consiste en ubicar un dato
        explícito del fragmento sin deformarlo ni agregarle nada externo.
      </Parrafo>

      <CasoBolivia titulo="Lectura 1 · Hidratación y altitud en Cochabamba">
        En los valles altos como Cochabamba, el aire suele ser más seco que en
        las tierras bajas y la menor presión atmosférica acelera la frecuencia
        respiratoria durante el esfuerzo físico. Como consecuencia, el organismo
        pierde agua no solo mediante el sudor visible, sino también a través de
        la exhalación continua. Por esa razón, los médicos deportivos recomiendan
        hidratarse antes de sentir sed, ya que la sensación de sed aparece
        cuando la deshidratación leve ya comenzó.
      </CasoBolivia>

      <AutoCheck
        pregunta="Según la Lectura 1, ¿por qué se recomienda hidratarse antes de sentir sed?"
        opciones={[
          "Porque en las tierras bajas el aire seco impide que el cuerpo sude con normalidad.",
          "Porque la frecuencia respiratoria disminuye durante el esfuerzo físico en el valle.",
          "Porque la sensación de sed surge cuando la deshidratación leve ya se inició.",
          "Porque beber agua detiene por completo la pérdida de líquido al exhalar.",
        ]}
        correctaIdx={2}
        explicacion="El texto lo afirma de forma explícita en su cierre: la sensación de sed aparece cuando la deshidratación leve ya comenzó. Las demás opciones contradicen el fragmento o afirman algo ausente."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 2 · Idea central y jerarquía de ideas
// ─────────────────────────────────────────────────────────────────────────────
function EscJerarquia() {
  return (
    <EscenaRica>
      <Titulo>Idea central y jerarquía de ideas</Titulo>

      <Parrafo>
        En un texto sobre salud no todas las oraciones tienen el mismo peso.
        Algunas nombran el asunto general, una sostiene el mensaje central y las
        demás explican causas, aportan pruebas o ilustran con un caso concreto.
      </Parrafo>

      <Definicion termino="Tema vs. idea principal">
        El <strong>tema</strong> responde a «¿de qué trata el texto?» y se
        expresa con una frase sin verbo conjugado (por ejemplo: «el uso indebido
        de antibióticos»). La <strong>idea principal</strong> responde a «¿qué
        afirma el autor sobre ese tema?» y siempre es una oración completa que
        abarca el texto entero.
      </Definicion>

      <Pizarra alto={326}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 326"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x={180}
            y={22}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            Pirámide de jerarquía de ideas
          </text>

          <rect
            x={55}
            y={36}
            width={250}
            height={56}
            rx={8}
            fill={LIENZO.accent}
            opacity={0.12}
            stroke={LIENZO.accent}
            strokeWidth={1.5}
          />
          <text x={180} y={58} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            1. TEMA
          </text>
          <text x={180} y={79} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Asunto general (sin verbo)
          </text>

          <line x1={180} y1={92} x2={180} y2={106} stroke={LIENZO.fgDim} strokeWidth={1.5} />

          <rect
            x={36}
            y={108}
            width={288}
            height={56}
            rx={8}
            fill={LIENZO.ok}
            opacity={0.12}
            stroke={LIENZO.ok}
            strokeWidth={1.5}
          />
          <text x={180} y={130} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            2. IDEA PRINCIPAL
          </text>
          <text x={180} y={151} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Mensaje global del texto entero
          </text>

          <line x1={180} y1={164} x2={180} y2={178} stroke={LIENZO.fgDim} strokeWidth={1.5} />

          <rect
            x={22}
            y={180}
            width={316}
            height={56}
            rx={8}
            fill={LIENZO.warn}
            opacity={0.12}
            stroke={LIENZO.warn}
            strokeWidth={1.5}
          />
          <text x={180} y={202} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            3. IDEAS SECUNDARIAS
          </text>
          <text x={180} y={223} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Causas, razones y consecuencias
          </text>

          <line x1={180} y1={236} x2={180} y2={250} stroke={LIENZO.fgDim} strokeWidth={1.5} />

          <rect
            x={10}
            y={252}
            width={340}
            height={62}
            rx={8}
            fill={LIENZO.fgDim}
            opacity={0.1}
            stroke={LIENZO.fgDim}
            strokeWidth={1.4}
          />
          <text x={180} y={276} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            4. EJEMPLOS Y DETALLES
          </text>
          <text x={180} y={298} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Casos concretos que ilustran una idea
          </text>
        </svg>
      </Pizarra>

      <Misconception titulo="Error frecuente · elegir una opción verdadera pero parcial">
        Si una opción repite un dato correcto que solo aparece como ejemplo en
        una oración, <strong>no es la idea central</strong>. Para comprobar si
        una opción es la idea principal, pregúntate: «si quito esta idea, ¿el
        texto pierde su eje completo?».
      </Misconception>

      <TextoLectura etiqueta="Lectura 2 · Microbiología clínica" titulo="Resistencia a los antibióticos">
        Los antibióticos son herramientas decisivas frente a infecciones
        bacterianas, pero su uso sin receta médica o en dosis incompletas
        favorece la supervivencia de las bacterias más resistentes. Cuando estas
        cepas se multiplican, los tratamientos habituales pierden eficacia y las
        infecciones comunes se vuelven más difíciles de controlar. Por ejemplo,
        tomar un antibiótico ante un resfriado común no alivia los síntomas
        porque el resfriado es causado por virus, pero sí expone a la flora
        bacteriana normal a una presión innecesaria. Por ello, completar la
        pauta indicada por un profesional es fundamental para frenar la
        resistencia antimicrobiana.
      </TextoLectura>

      <AutoCheck
        pregunta="¿Cuál enunciado expresa mejor la idea central de la Lectura 2?"
        opciones={[
          "El uso inadecuado de antibióticos impulsa la resistencia bacteriana y exige respetar la indicación profesional.",
          "El resfriado común es provocado por virus y sus síntomas no desaparecen al consumir antibióticos.",
          "Los antibióticos deben administrarse en cualquier cuadro respiratorio para proteger la flora bacteriana.",
          "La flora bacteriana normal elimina por sí sola las infecciones virales cuando no se toman medicamentos.",
        ]}
        correctaIdx={0}
        explicacion="La primera opción reúne el eje completo del texto (causa, consecuencia y recomendación). La segunda es verdadera según el texto, pero solo recoge un ejemplo subordinado."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 3 · Reconocimiento textual vs. Paráfrasis
// ─────────────────────────────────────────────────────────────────────────────
function EscParafrasis() {
  return (
    <EscenaRica>
      <Titulo>Reconocimiento textual vs. paráfrasis</Titulo>

      <Parrafo>
        Cuando una pregunta pide <strong>reconocimiento textual</strong>, la
        respuesta suele conservar el vocabulario del pasaje. Cuando pide{" "}
        <strong>paráfrasis</strong>, el examen expresa la misma idea con otras
        palabras: no busques palabras idénticas, compara el significado real.
      </Parrafo>

      <Definicion termino="Paráfrasis fiel">
        Reformulación de un enunciado del texto que usa sinónimos o una sintaxis
        distinta, manteniendo intactos el <strong>sujeto</strong>, la{" "}
        <strong>relación lógica</strong> y el <strong>alcance</strong> original.
      </Definicion>

      <Misconception titulo="Trampa clásica · cambio de alcance con extremos">
        Desconfía de opciones que copian términos del texto pero agregan
        cuantificadores absolutos como <strong>«siempre»</strong>,{" "}
        <strong>«nunca»</strong>, <strong>«todos»</strong> o{" "}
        <strong>«solo»</strong>. Si el texto dice «disminuye el riesgo», una
        opción que dice «elimina siempre el contagio» ya no es una paráfrasis:
        es una distorsión.
      </Misconception>

      <WorkedExample titulo="Cómo validar una paráfrasis paso a paso">
        <p style={{ margin: "0 0 8px" }}>
          <strong>Frase original:</strong> «La vacunación oportuna reduce de
          forma notable el riesgo de complicaciones graves en adultos mayores.»
        </p>
        <p style={{ margin: "0 0 6px" }}>
          <strong>1. Paráfrasis fiel:</strong> «Aplicar las vacunas a tiempo
          disminuye de manera importante la probabilidad de cuadros severos en
          personas mayores.» (Conserva sujeto, sentido y matiz moderado.)
        </p>
        <p style={{ margin: "0 0 6px" }}>
          <strong>2. Trampa de extremo:</strong> «La vacunación garantiza que
          ningún adulto mayor tendrá complicaciones.» (Convierte «reduce el
          riesgo» en «ningún».)
        </p>
        <p style={{ margin: 0 }}>
          <strong>3. Trampa de recorte:</strong> «Solo los adultos mayores
          requieren vacunación oportuna.» (Agrega «solo», que el texto no dice.)
        </p>
      </WorkedExample>

      <TextoLectura etiqueta="Lectura 3 · Bioseguridad" titulo="Higiene de manos en hospitales">
        En los hospitales, las manos del personal de salud constituyen la vía
        más frecuente de transmisión de microorganismos entre pacientes. Lavarse
        las manos con agua y jabón o utilizar soluciones a base de alcohol antes
        y después de cada atención disminuye de manera considerable las
        infecciones asociadas al cuidado sanitario. Sin embargo, el uso de
        guantes no sustituye la higiene de manos, pues los guantes pueden
        presentar microperforaciones o contaminarse al retirarlos.
      </TextoLectura>

      <AutoCheck
        pregunta="¿Qué opción parafrasea con fidelidad la última oración de la Lectura 3?"
        opciones={[
          "Los guantes hospitalarios deben evitarse porque siempre se perforan durante la atención.",
          "Las soluciones a base de alcohol sustituyen en todos los casos el lavado con agua y jabón.",
          "Solo el personal que atiende sin guantes transmite microorganismos de un paciente a otro.",
          "Llevar guantes no reemplaza la limpieza de manos, ya que pueden tener diminutas fisuras o contaminarse al quitárselos.",
        ]}
        correctaIdx={3}
        explicacion="La opción final reformula con precisión 'no sustituye' (no reemplaza), 'microperforaciones' (diminutas fisuras) y 'contaminarse al retirarlos' (al quitárselos), sin añadir extremos como 'siempre', 'todos' o 'solo'."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 4 · Inferencia válida vs. suposición sin sustento
// ─────────────────────────────────────────────────────────────────────────────
function EscInferencia() {
  return (
    <EscenaRica>
      <Titulo>Inferencia válida vs. suposición sin sustento</Titulo>

      <Parrafo>
        Inferir es la habilidad que más confunde a los postulantes porque suena
        parecido a «opinar» o «recordar lo que ya sabes del tema». En la PSA
        2027, toda inferencia válida depende exclusivamente de las pistas del
        texto.
      </Parrafo>

      <Definicion termino="Inferencia válida">
        Conclusión no escrita de manera literal que se desprende por lógica
        directa de las afirmaciones del texto. Si necesitas un dato externo o
        una generalización para defenderla, se convierte en una{" "}
        <strong>suposición inválida</strong>.
      </Definicion>

      <Pizarra alto={332}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 332"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x={180}
            y={22}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            Inferencia válida vs. suposición
          </text>

          <rect
            x={14}
            y={34}
            width={332}
            height={58}
            rx={8}
            fill={LIENZO.accent}
            opacity={0.12}
            stroke={LIENZO.accent}
            strokeWidth={1.5}
          />
          <text x={26} y={56} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            BASE · TEXTO EXPLÍCITO
          </text>
          <text x={26} y={78} fill={LIENZO.fg} fontSize={13}>
            Premisas y datos escritos por el autor
          </text>

          <line x1={180} y1={92} x2={180} y2={110} stroke={LIENZO.fgDim} strokeWidth={1.5} />

          <rect
            x={14}
            y={112}
            width={332}
            height={94}
            rx={8}
            fill={LIENZO.ok}
            opacity={0.11}
            stroke={LIENZO.ok}
            strokeWidth={1.5}
          />
          <text x={26} y={134} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            INFERENCIA VÁLIDA (correcta)
          </text>
          <text x={26} y={156} fill={LIENZO.fg} fontSize={13}>
            Lo que dice el texto + lógica directa
          </text>
          <text x={26} y={176} fill={LIENZO.fg} fontSize={13}>
            No inventa causas ni datos externos.
          </text>
          <text x={26} y={196} fill={LIENZO.fgDim} fontSize={13}>
            Se demuestra señalando las premisas.
          </text>

          <rect
            x={14}
            y={222}
            width={332}
            height={96}
            rx={8}
            fill={LIENZO.bad}
            opacity={0.11}
            stroke={LIENZO.bad}
            strokeWidth={1.5}
          />
          <text x={26} y={244} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            SUPOSICIÓN INVÁLIDA (trampa)
          </text>
          <text x={26} y={266} fill={LIENZO.fg} fontSize={13}>
            Lo que viene de afuera del texto
          </text>
          <text x={26} y={286} fill={LIENZO.fg} fontSize={13}>
            Usa opiniones, extremos o memoria.
          </text>
          <text x={26} y={306} fill={LIENZO.fgDim} fontSize={13}>
            Cierta afuera, pero ausente aquí.
          </text>
        </svg>
      </Pizarra>

      <TextoLectura etiqueta="Lectura 4 · Neurofisiología del aprendizaje" titulo="Sueño y consolidación de la memoria">
        Durante el sueño profundo, el cerebro reorganiza la información
        adquirida en la vigilia y transfiere recuerdos recientes desde el
        hipocampo hacia la corteza cerebral, donde se almacenan de forma más
        estable. Cuando un estudiante de medicina recorta sus horas de descanso
        para repasar toda la madrugada antes de un examen, interrumpe esa etapa
        de consolidación. Aunque logre leer más páginas durante la noche, su
        capacidad para recuperar esos datos al día siguiente disminuye frente a
        quien estudió menos horas pero durmió de manera adecuada.
      </TextoLectura>

      <AutoCheck
        pregunta="A partir de la Lectura 4, ¿qué se puede inferir válidamente?"
        opciones={[
          "El hipocampo es la única estructura cerebral que interviene durante el estudio universitario.",
          "Sacrificar horas de sueño para leer más en la madrugada puede reducir el recuerdo de lo estudiado al día siguiente.",
          "Todos los estudiantes que duermen lo suficiente obtienen la nota máxima en sus exámenes.",
          "Consumir bebidas con cafeína durante la noche compensa la interrupción del sueño profundo.",
        ]}
        correctaIdx={1}
        explicacion="Se deduce directamente del texto: recortar el descanso interrumpe la consolidación y reduce la capacidad de recuperar datos al día siguiente, incluso leyendo más páginas. Las demás opciones introducen extremos ('única', 'todos') o un dato externo ('cafeína')."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 5 · Significado en contexto y función del elemento textual
// ─────────────────────────────────────────────────────────────────────────────
function EscContextoFuncion() {
  const conectores = [
    {
      tipo: "CAUSA / EFECTO · porque, por ello",
      rol: "Explica el origen o la consecuencia",
      color: LIENZO.accent,
    },
    {
      tipo: "CONTRASTE · sin embargo, pero",
      rol: "Opone dos datos o limita un alcance",
      color: LIENZO.warn,
    },
    {
      tipo: "CONCESIÓN · aunque, a pesar de",
      rol: "Admite un hecho sin anular la tesis",
      color: LIENZO.bad,
    },
    {
      tipo: "ACLARACIÓN · es decir, por ejemplo",
      rol: "Traduce un término o ilustra una idea",
      color: LIENZO.ok,
    },
  ];

  return (
    <EscenaRica>
      <Titulo>Significado en contexto y función del elemento textual</Titulo>

      <Parrafo>
        En textos de salud aparecen con frecuencia términos técnicos y
        conectores precisos. No necesitas un diccionario en el examen: el propio
        párrafo ofrece pistas para deducir el sentido de una palabra y muestra
        qué papel cumple cada oración dentro del argumento.
      </Parrafo>

      <Definicion termino="Pistas contextuales y función textual">
        Para hallar el <strong>significado en contexto</strong>, busca junto al
        término una reformulación («es decir», «o sea»), un contraste o el
        efecto que produce. Para hallar la{" "}
        <strong>función del elemento textual</strong>, pregúntate qué hace esa
        frase o conector: ¿define, ejemplifica, contrasta, concede o concluye?
      </Definicion>

      <Pizarra alto={324}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 324"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x={180}
            y={22}
            textAnchor="middle"
            fill={LIENZO.fg}
            fontSize={14}
            fontWeight={700}
          >
            Conectores clave y su función textual
          </text>

          {conectores.map((c, i) => (
            <g key={c.tipo} transform={`translate(12, ${38 + i * 70})`}>
              <rect
                x={0}
                y={0}
                width={336}
                height={60}
                rx={8}
                fill={c.color}
                opacity={0.11}
                stroke={c.color}
                strokeWidth={1.4}
              />
              <text x={14} y={24} fill={c.color} fontSize={13} fontWeight={700}>
                {c.tipo}
              </text>
              <text x={14} y={46} fill={LIENZO.fg} fontSize={13}>
                {c.rol}
              </text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <CasoBolivia titulo="Lectura 5 · Prevención del mal de Chagas en valles bolivianos">
        En diversas comunidades de los valles interandinos de Bolivia, el mal de
        Chagas sigue siendo un problema de salud pública vinculado a las
        condiciones de la vivienda. El parásito Trypanosoma cruzi se transmite
        principalmente por la vinchuca, un insecto hematófago (es decir, que se
        alimenta de sangre) que suele esconderse en grietas de paredes de adobe
        y techos de paja. Aunque la fumigación periódica reduce la presencia del
        vector, el mejoramiento habitacional (como revocar las paredes y sellar
        fisuras) resulta decisivo para evitar que el insecto vuelva a colonizar
        la casa.
      </CasoBolivia>

      <AutoCheck
        pregunta="En la Lectura 5, ¿qué significa 'hematófago' según el contexto y qué función cumple la cláusula introducida por 'Aunque'?"
        opciones={[
          "Que habita en techos de paja; la cláusula con 'Aunque' presenta un ejemplo de vivienda rural.",
          "Que provoca infecciones respiratorias; la cláusula con 'Aunque' introduce la causa principal del contagio.",
          "Que se alimenta de sangre; la cláusula con 'Aunque' reconoce el aporte de la fumigación antes de destacar el papel decisivo de mejorar la vivienda.",
          "Que resiste cualquier fumigación; la cláusula con 'Aunque' niega que fumigar reduzca la presencia del vector.",
        ]}
        correctaIdx={2}
        explicacion="El paréntesis con 'es decir' define de inmediato 'hematófago' como un insecto que se alimenta de sangre. El conector concesivo 'Aunque' admite la utilidad de la fumigación sin restar peso a la idea principal: mejorar la vivienda es decisivo."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escena 6 · Estrategia bajo tiempo de examen + práctica integradora + resumen
// ─────────────────────────────────────────────────────────────────────────────
function EscEstrategiaPractica() {
  return (
    <EscenaRica>
      <Titulo>Estrategia bajo tiempo de examen y práctica final</Titulo>

      <Parrafo>
        Con el reloj en contra, leer sin método hace que pierdas minutos
        releyendo párrafos completos. Sigue esta secuencia breve en cada texto
        de Comprensión Lectora:
      </Parrafo>

      <WorkedExample titulo="Rutina en 4 pasos para resolver cada lectura">
        <p style={{ margin: "0 0 6px" }}>
          <strong>1. Lee primero la pregunta</strong> (antes de ver las
          opciones): identifica cuál de las 7 habilidades pide (dato explícito,
          paráfrasis, inferencia, sentido en contexto, idea central, jerarquía o
          función).
        </p>
        <p style={{ margin: "0 0 6px" }}>
          <strong>2. Lee el texto buscando estructura:</strong> ubica el tema,
          marca mentalmente los conectores de giro («sin embargo», «aunque»,
          «por ello») y separa la tesis de los ejemplos.
        </p>
        <p style={{ margin: "0 0 6px" }}>
          <strong>3. Descarta trampas rápido:</strong> sospecha de opciones con
          extremos absolutos («siempre», «nunca», «solo», «todos») o con datos
          ciertos en la vida real pero ausentes del pasaje.
        </p>
        <p style={{ margin: 0 }}>
          <strong>4. Comprueba en el texto antes de marcar:</strong> señala la
          oración exacta que respalda tu elección; si no existe, vuelve a
          comparar las opciones restantes.
        </p>
      </WorkedExample>

      <TextoLectura etiqueta="Lectura 6 · Salud pública" titulo="Donación voluntaria de sangre">
        Los bancos de sangre requieren un suministro continuo y seguro para
        atender emergencias obstétricas, cirugías complejas y tratamientos
        oncológicos. Cuando la donación proviene de voluntarios habituales y no
        remunerados, el riesgo de transmitir infecciones por transfusión es
        menor que en las donaciones de reposición de último momento, porque los
        donantes voluntarios pasan por controles periódicos y suelen declarar
        con mayor transparencia sus antecedentes de salud. Por ejemplo, una
        persona que dona con regularidad mantiene un historial actualizado en el
        servicio de hemoterapia. En consecuencia, los sistemas de salud
        promueven campañas permanentes de sensibilización en lugar de depender
        únicamente de llamados urgentes ante una crisis.
      </TextoLectura>

      <AutoCheck
        pregunta="En la Lectura 6, ¿qué nivel jerárquico y qué función cumple la oración sobre la persona que dona con regularidad?"
        opciones={[
          "Es la idea central del texto porque sintetiza el objetivo de las campañas permanentes de salud.",
          "Es una objeción que pone en duda la eficacia de los controles en los bancos de sangre.",
          "Es una inferencia externa que demuestra que toda persona adulta está obligada a donar sangre.",
          "Es un ejemplo subordinado que ilustra cómo la donación voluntaria frecuente mantiene actualizado el historial clínico.",
        ]}
        correctaIdx={3}
        explicacion="El conector 'Por ejemplo' marca una idea de nivel subordinado (detalle ilustrativo) cuya función es concretar la ventaja de los controles periódicos mencionada en la oración anterior."
      />

      <Resumen>
        <strong>Las 7 habilidades de la PSA 2027:</strong> reconocimiento
        textual, paráfrasis, inferencia, significado en contexto, idea central,
        jerarquía de ideas y función del elemento textual. <strong>Regla de oro:</strong>{" "}
        toda respuesta correcta se demuestra dentro del texto leído; descarta
        extremos no respaldados y suposiciones externas aunque suenen
        familiares.
      </Resumen>
    </EscenaRica>
  );
}
