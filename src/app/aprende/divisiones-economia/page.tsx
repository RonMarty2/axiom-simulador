"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, CasoBolivia, Misconception, Mnemotecnia,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Introducción general a la ciencia económica"
      escenas={[
        { titulo: "Tres etapas del conocimiento", componente: Esc01 },
        { titulo: "Sentido común", componente: Esc02 },
        { titulo: "La construcción de la ciencia", componente: Esc03 },
        { titulo: "Ideología y normas", componente: Esc04 },
        { titulo: "Economía descriptiva", componente: Esc05 },
        { titulo: "Teoría económica", componente: Esc06 },
        { titulo: "Política económica", componente: Esc07 },
        { titulo: "Positivas vs. normativas", componente: Esc08 },
        { titulo: "Práctica final", componente: Esc09 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>Tres etapas y tres campos del conocimiento</Titulo>
      <Parrafo>
        Toda ciencia (incluida la economía) recorre tres etapas: <strong>descripción</strong>,{" "}
        <strong>sistematización científica</strong> y <strong>normalización</strong>. Cada una se vincula
        con un campo distinto del saber humano:
      </Parrafo>
      <Resumen>
        <strong>Sentido común</strong> — superficialidad, credulidad, destreza.<br />
        <strong>Ciencia</strong> — coherencia, consistencia, objetividad.<br />
        <strong>Ideología</strong> — justificación, partidismo, normatividad.
      </Resumen>
      <PorQue>
        Las divisiones de la economía (descriptiva, teórica, política) se corresponden con estos tres
        campos. Lo verás en las próximas escenas.
      </PorQue>

      <Hook>
        Esta unidad es <strong>filosófica</strong> pero clave: te ayuda a distinguir
        "<em>cómo SON los hechos</em>" (ciencia) de "<em>cómo DEBEN ser</em>" (ideología). Una
        confusión muy común en debates económicos cotidianos. En el examen UMSS aparece pidiendo
        clasificar enunciados positivos vs normativos.
      </Hook>

      <Mnemotecnia>
        <strong>"SC-CI" · 3 etapas y 3 campos</strong>:<br />
        <strong>S</strong>entido común → superficial, práctico.<br />
        <strong>C</strong>iencia → coherente, consistente, objetiva.<br />
        <strong>I</strong>deología → partidaria, justificadora, normativa.<br /><br />
        <strong>Truco:</strong> "Sentido Común para vivir, Ciencia para entender, Ideología para
        cambiar".
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>El sentido común</Titulo>
      <Parrafo>
        Es el conjunto de conocimientos acumulados por la herencia cultural y la experiencia práctica.
        Por herencia cultural las generaciones reciben y transmiten esos saberes.
      </Parrafo>
      <Resumen>
        Es un entendimiento <strong>superficial</strong> de lo conocido, sostenido por la credibilidad
        derivada de tentativas primitivas y sin explicación. No va más allá de lo práctico: no explica el
        <em> por qué</em> de los fenómenos.
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>La construcción de la ciencia</Titulo>
      <Parrafo>
        A partir del sentido común, el hombre progresivamente busca el conocimiento científico. En esa
        construcción busca tres criterios:
      </Parrafo>
      <Resumen>
        <strong>1. Coherencia</strong> — argumentación estructurada, sin contradicciones.<br />
        <strong>2. Consistencia</strong> — resistencia a la argumentación contraria.<br />
        <strong>3. Objetividad</strong> — reproducción de la realidad como ES, no como uno quisiera que fuera.
      </Resumen>
      <Ejemplo>
        Las prácticas agrícolas rudimentarias dieron lugar a la agronomía experimental, la investigación
        agrónoma y la selección genética. El mismo paso ocurre en las ciencias sociales.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Ideología y normas</Titulo>
      <Definicion termino="ideología">
        Conjunto de valores, creencias, convicciones, prescripciones y normas que surgen de la necesidad
        de legitimación de un orden institucional.
      </Definicion>
      <Cuidado>
        A diferencia del sentido común y de la ciencia, la ideología <strong>NO busca neutralidad</strong>.
        Como dice Demo: "el discurso ideológico es predominantemente partidario y significa siempre una
        posición política".
      </Cuidado>
      <PorQue>
        La ideología generalmente está movilizada por grupos dominantes (o aspirantes al poder). Frente a
        ella aparecen ideologías <strong>alternativas o emergentes</strong>. Cada una propone normas
        diferentes para reordenar la sociedad — incluida la economía.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Las tres divisiones · economía descriptiva</Titulo>
      <Definicion termino="economía descriptiva">
        División responsable del reconocimiento a nivel de <strong>descripción</strong> del comportamiento
        de los agentes del sistema económico: productores, consumidores, gobierno, instituciones.
      </Definicion>
      <Parrafo>
        Su tarea es el <strong>levantamiento, descripción y clasificación</strong> de los hechos económicos.
        Mediante ella, la realidad empieza a someterse a un tratamiento científico riguroso.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Teoría económica</Titulo>
      <Definicion termino="teoría económica">
        División <strong>central</strong> de la economía. Ordena lógicamente los levantamientos de la
        económica descriptiva y produce <strong>generalizaciones</strong> que ligan los hechos entre sí.
      </Definicion>
      <Resumen>
        Produce principios, teorías, leyes y modelos:<br /><br />
        • Si parte de hechos hacia la teoría directamente → <strong>inducción</strong>.<br />
        • Si parte de una parte conocida hacia hipótesis → <strong>deducción</strong>.<br /><br />
        La <strong>coherencia, interpenetración y consistencia</strong> de sus principios garantizan a la
        economía su carácter de <em>ciencia</em>.
      </Resumen>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Política económica</Titulo>
      <Definicion termino="política económica">
        Aplicación de los principios, teorías, leyes y modelos de la teoría económica con el fin de
        <strong> dirigir la gestión económica</strong> hacia objetivos determinados.
      </Definicion>
      <Parrafo>
        Es esencialmente <strong>utilitarista</strong>: condiciona la actividad económica. Cuando se
        habla de "política económica gubernamental", se hace referencia a acciones prácticas del Estado
        para orientar el sistema económico hacia objetivos políticamente establecidos.
      </Parrafo>
      <Ejemplo>
        Para frenar la inflación, un gobierno puede subir la tasa de interés, reducir el gasto o
        aumentar impuestos. Esas son decisiones de política económica, sostenidas en la teoría.
      </Ejemplo>

      <CasoBolivia>
        <strong>Política económica en Bolivia 2006-2020:</strong> nacionalización de
        hidrocarburos (2006), bonos sociales (Juancito Pinto, Juana Azurduy), pegging del
        boliviano al dólar (6,96 BOB/USD desde 2011), control de precios de combustibles.
        Todas son decisiones <em>normativas</em> que combinan teoría económica (positiva) con
        objetivos políticos (normativos).
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <Titulo>Proposiciones positivas y normativas</Titulo>
      <Resumen>
        Las dos primeras divisiones forman la <strong>economía positiva</strong> (describe y teoriza:
        cómo SON los hechos).<br /><br />
        La tercera —política económica— forma la <strong>economía normativa</strong> (juzga y propone:
        cómo DEBEN ser los hechos).
      </Resumen>
      <Ejemplo titulo="Positiva">
        "Cuando sube el precio de un bien, las cantidades demandadas tienden a caer." Describe sin
        juzgar.
      </Ejemplo>
      <Ejemplo titulo="Normativa">
        "El gobierno debe mantener bajo el precio del pan para proteger a las familias". Hay un juicio
        de valor y una recomendación de acción.
      </Ejemplo>
      <PorQue>
        Samuelson: "No existe una teoría económica para los trabajadores y otra para los patrones; una
        para los rusos y otra para los chinos." Hay concordancia en la economía positiva. En la
        normativa, los puntos de vista pueden ser <strong>conflictivos</strong>.
      </PorQue>

      <Mnemotecnia>
        <strong>Test rápido positiva vs normativa</strong>:<br />
        ¿La oración contiene "<em>debería</em>", "<em>tiene que</em>", "<em>es bueno/malo</em>",
        "<em>es justo/injusto</em>"? → <strong>NORMATIVA</strong>.<br />
        ¿Solo describe hechos o relaciones causa-efecto sin valorar? → <strong>POSITIVA</strong>.
      </Mnemotecnia>

      <Misconception titulo="Una predicción ('si X entonces Y') NO es normativa">
        Mucha gente cree que "si subimos impuestos, la inversión caerá" es normativo porque
        suena a recomendación. FALSO. Es POSITIVO: describe una relación causal sin decir si es
        bueno o malo. Solo se vuelve normativo si agregás "por eso NO debemos subir impuestos".
      </Misconception>
    </EscenaRica>
  );
}

function Esc09() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "La economía descriptiva pertenece a la economía:", o: [
          "normativa", "positiva", "ideológica", "política",
        ], c: 1, ex: "Describe sin juzgar: pertenece al campo positivo." },
        { p: "Los tres criterios de la ciencia son:", o: [
          "evidencia, prueba, conclusión",
          "coherencia, consistencia, objetividad",
          "hipótesis, ley, modelo",
          "neutralidad, autoridad, claridad",
        ], c: 1, ex: "Coherencia, consistencia y objetividad: lo que diferencia a la ciencia del sentido común." },
        { p: "La política económica es una rama:", o: [
          "puramente descriptiva",
          "ideológicamente neutral",
          "utilitarista (dirige la gestión hacia objetivos)",
          "experimental",
        ], c: 2, ex: "Utiliza la teoría económica para condicionar la actividad económica hacia fines." },
        { p: "Un enunciado normativo es:", o: [
          "'El PIB creció 3% el año pasado'",
          "'El desempleo está en 8%'",
          "'El gobierno debería bajar impuestos'",
          "'A más precio, menos demanda'",
        ], c: 2, ex: "Contiene un juicio de valor (deber ser): es normativo." },
        { p: "La ideología se caracteriza por:", o: [
          "neutralidad",
          "objetividad",
          "justificación y partidismo",
          "consistencia lógica únicamente",
        ], c: 2, ex: "Justificación, partidismo y normatividad. Sirve a la legitimación de un orden." },
      ]} />
    </EscenaRica>
  );
}
