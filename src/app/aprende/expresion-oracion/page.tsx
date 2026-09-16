"use client";

import LeccionShell from "../_components/LeccionShell";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, Misconception, Mnemotecnia, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="06"
      tituloUnidad="Expresión correcta de la oración"
      escenas={[
        { titulo: "Qué evalúa esta sección", componente: EscIntro },
        { titulo: "Las 4 reglas básicas", componente: EscReglas },
        { titulo: "Ejemplo guiado", componente: EscGuiado },
        { titulo: "Práctica · 5 ejercicios", componente: EscP },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Expresión correcta de la oración</Titulo>
      <Definicion termino="expresión correcta">
        Habilidad gramatical de construir oraciones <strong>claras, bien ordenadas y sin ambigüedad</strong>.
        El examen presenta una oración y te pide elegir la versión que la mejora: o confirmar que ya
        está bien.
      </Definicion>
      <PorQue>
        Aunque mucha gente entiende oraciones mal escritas, el examen quiere verificar que reconoces{" "}
        <em>cuál es la versión más precisa</em>. Es una habilidad clave de la escritura universitaria.
      </PorQue>

      <Hook>
        Esta sección suele tener <strong>3-5 preguntas</strong> en el examen. Lo decisivo:
        recordar que <strong>"Es correcta" es una opción válida</strong>. Mucha gente la descarta
        por reflejo, pierde puntos al elegir una versión "reescrita" que en realidad empeora la
        oración.
      </Hook>

      <Misconception titulo="Trampa #1 · 'tiene que haber algo mejor'">
        Cuando la oración original ya está bien construida, las 4 reescrituras son distractoras:
        agregan palabras, cambian orden, intercalan comas. Si nada está MAL en la original, la
        respuesta correcta es <strong>"Es correcta"</strong>. Sin culpa.
      </Misconception>
    </EscenaRica>
  );
}

function EscReglas() {
  return (
    <EscenaRica>
      <Titulo>Las 4 reglas que el examen mide</Titulo>
      <Resumen>
        <strong>1. Estructura clara</strong>: sujeto, verbo y complemento bien ubicados. Lo principal va
        cerca del verbo; los modificadores cerca de lo que modifican.<br /><br />
        <strong>2. Concordancia</strong>: el verbo concuerda en número con el sujeto. Los adjetivos
        concuerdan en género y número con el sustantivo.<br /><br />
        <strong>3. Orden lógico de complementos</strong>: los complementos van junto a lo que
        complementan. Si separas un sustantivo de su complemento por una frase larga, la oración pierde
        claridad.<br /><br />
        <strong>4. Conectores apropiados</strong>: "pero", "sin embargo", "aunque" señalan oposición.
        "Y" y "también" suman. Elegir el conector incorrecto cambia el sentido.
      </Resumen>

      <Mnemotecnia>
        <strong>Checklist "E-C-O-C"</strong> antes de elegir:<br />
        <strong>E</strong>structura (sujeto-verbo-complemento claros).<br />
        <strong>C</strong>oncordancia (verbo con sujeto, adjetivos con sustantivos).<br />
        <strong>O</strong>rden de complementos (cerca de lo que modifican).<br />
        <strong>C</strong>onector apropiado (familia correcta).<br /><br />
        Si la original cumple las 4 → "Es correcta".
      </Mnemotecnia>

      <WorkedExample titulo="Caso típico · 'detalladamente explicó'">
        <strong>Original:</strong> "El profesor detalladamente explicó el tema antes de darnos la
        tarea."<br /><br />

        <strong>Análisis:</strong><br />
        • Sujeto: "el profesor" ✓<br />
        • Verbo: "explicó" ✓<br />
        • Pero el adverbio "detalladamente" está ANTES del verbo, no después. En español natural,
        los adverbios de modo van DESPUÉS del verbo: "explicó detalladamente".<br /><br />

        <strong>Mejora:</strong> "El profesor explicó detalladamente el tema antes de darnos la
        tarea."<br /><br />

        <strong>Regla práctica:</strong> el adverbio modifica al verbo, así que va junto al verbo.
        El orden natural en español es <em>sujeto + verbo + adverbio + objeto + complementos</em>.
        Cualquier opción que rompa ese orden sin razón estilística clara, es peor.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscGuiado() {
  return (
    <EscenaRica>
      <Titulo>Ejemplo guiado</Titulo>
      <Ejemplo titulo="Oración original">
        "El profesor explicó detalladamente el tema antes de darnos la tarea."
      </Ejemplo>
      <PracticaFinal ejercicios={[{
        p: "¿Cuál mejora la expresión?",
        o: [
          "Antes de la tarea, el profesor explicó el tema con detalle.",
          "El profesor explicó el tema con mucho detalle antes de darnos la tarea.",
          "El profesor detalladamente explicó el tema antes de darnos la tarea.",
          "El profesor, antes de darnos la tarea, explicó el tema detalladamente.",
          "Es correcta.",
        ],
        c: 4,
        ex: "La oración original ES correcta. El orden 'sujeto + verbo + adverbio + complemento + temporal' es perfectamente claro. Las opciones a-d reescriben innecesariamente: a) recorta información, b) añade 'mucho', c) coloca raro el adverbio, d) interrumpe con coma. Cuando una oración ya está bien, hay que reconocerlo.",
      }]} />
      <Cuidado>
        La opción "Es correcta" SIEMPRE está disponible. No te dejes llevar por la idea de que tiene que
        haber una mejor versión. A veces la original ya es buena.
      </Cuidado>
    </EscenaRica>
  );
}

function EscP() {
  return (
    <EscenaRica>
      <Titulo>Práctica · 5 ejercicios</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "\"María lee rápido y con gran concentración los libros de la biblioteca.\"",
          o: [
            "María lee los libros rápido y con gran concentración de la biblioteca.",
            "Los libros de la biblioteca, María los lee rápido y con gran concentración.",
            "María lee los libros de la biblioteca con rapidez y gran concentración.",
            "María lee con rapidez los libros de la biblioteca y concentración.",
            "Es correcta.",
          ],
          c: 2,
          ex: "Problema de la original: 'rápido' es adverbio, pero está junto al sustantivo 'concentración'. La opción c lo arregla usando 'rapidez' (sustantivo) y 'concentración' (sustantivo) en paralelo. Las opciones a, b y d enredan el orden.",
        },
        {
          p: "\"La conferencia fue muy interesante, sin embargo, duró más de lo esperado.\"",
          o: [
            "La conferencia fue muy interesante y duró más de lo esperado.",
            "Aunque la conferencia fue interesante, duró más de lo esperado.",
            "La conferencia fue muy interesante, pero duró más de lo esperado.",
            "Sin embargo, la conferencia fue interesante y duró más.",
            "Es correcta.",
          ],
          c: 2,
          ex: "'Sin embargo' es muy formal para esta oración cotidiana. 'Pero' es la opción natural. Las otras: a) elimina la oposición, b) cambia el orden y debilita la primera idea, d) coloca el conector al inicio sin antecedente.",
        },
        {
          p: "\"Los estudiantes, en el examen, debían responder cada pregunta con precisión.\"",
          o: [
            "En el examen, los estudiantes respondían con precisión cada pregunta.",
            "En el examen, los estudiantes debían responder con precisión cada pregunta.",
            "Los estudiantes debían responder cada pregunta con precisión en el examen.",
            "En el examen con precisión, los estudiantes debían responder cada pregunta.",
            "Es correcta.",
          ],
          c: 1,
          ex: "La original tiene una coma innecesaria que interrumpe 'Los estudiantes... debían responder'. La opción b mueve 'en el examen' al inicio y elimina la interrupción. Es la versión más fluida.",
        },
        {
          p: "\"Mis amigos se quedaron en la biblioteca hasta tarde estudiando para el examen.\"",
          o: [
            "Mis amigos se quedaron estudiando hasta tarde para el examen en la biblioteca.",
            "Mis amigos se quedaron en la biblioteca estudiando para el examen hasta tarde.",
            "Mis amigos hasta tarde se quedaron en la biblioteca estudiando para el examen.",
            "Se quedaron en la biblioteca estudiando hasta tarde mis amigos para el examen.",
            "Es correcta.",
          ],
          c: 1,
          ex: "La original separa 'hasta tarde' de 'estudiando' (la acción que duró hasta tarde). La opción b pone los elementos en mejor orden: lugar → acción → motivo → tiempo. Las opciones a, c, d desordenan más.",
        },
        {
          p: "\"El equipo trabajó arduamente para completar el proyecto a tiempo.\"",
          o: [
            "Arduamente el equipo trabajó para completar a tiempo el proyecto.",
            "El equipo trabajó arduamente para terminar el proyecto a tiempo.",
            "Para completar el proyecto a tiempo, el equipo trabajó arduamente.",
            "El equipo, arduamente, trabajó para completar el proyecto a tiempo.",
            "Es correcta.",
          ],
          c: 2,
          ex: "La opción c reordena estilísticamente para enfatizar el OBJETIVO antes del esfuerzo. Es una mejora retórica válida. La original también está bien, pero al ofrecerse una versión más impactante, ésta gana.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscResumen() {
  return (
    <EscenaRica>
      <Titulo>Resumen</Titulo>
      <Resumen>
        <strong>1.</strong> Identifica sujeto, verbo y complementos. ¿Están en el orden natural?<br /><br />
        <strong>2.</strong> Verifica concordancia (sustantivo-adjetivo, sujeto-verbo).<br /><br />
        <strong>3.</strong> Los modificadores deben ir cerca de lo que modifican. Si "rápido" describe el
        leer, debe ir junto al verbo "lee", no al final.<br /><br />
        <strong>4.</strong> No descartes "Es correcta" sin pensarlo. A veces es la respuesta válida.<br /><br />
        <strong>5.</strong> Si dudas entre dos opciones, léelas en voz alta. La buena fluye natural; la
        forzada se traba.
      </Resumen>

      <Misconception titulo="3 errores frecuentes en las opciones reescritas">
        <strong>(a)</strong> Coma entre sujeto y verbo: "El equipo, trabajó arduamente": ERROR.
        Sujeto y verbo NO se separan con coma.<br />
        <strong>(b)</strong> Cambio de palabras con matiz diferente: original "completar" ↔ opción
        "terminar". Cambian la nota fina del sentido.<br />
        <strong>(c)</strong> Separación de palabras que se complementan: "rápido" lejos del verbo
        que modifica, "concentración" lejos de "con gran".
      </Misconception>
    </EscenaRica>
  );
}
