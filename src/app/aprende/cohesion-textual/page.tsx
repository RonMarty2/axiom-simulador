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
      unidad="04"
      tituloUnidad="Cohesión"
      escenas={[
        { titulo: "Qué es la cohesión", componente: EscIntro },
        { titulo: "Las 3 familias de conectores", componente: EscFamilias },
        { titulo: "Estrategia", componente: EscEstrategia },
        { titulo: "Ejemplo guiado · tecnología", componente: EscGuiado },
        { titulo: "Práctica A · 5 ejercicios", componente: EscPA },
        { titulo: "Práctica B · 5 ejercicios", componente: EscPB },
        { titulo: "Práctica C · 5 ejercicios", componente: EscPC },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Cohesión · cómo se conectan las ideas</Titulo>
      <Definicion termino="cohesión (RAE)">
        Propiedad de los textos bien formados en los que las distintas partes están <strong>lógicamente
        conectadas</strong>: el texto se percibe como un todo, no como fragmentos sueltos.
      </Definicion>
      <Parrafo>
        Los <strong>conectores</strong> (también llamados marcadores discursivos) son las palabras o
        frases que enlazan oraciones y párrafos. Elegir el conector correcto cambia el sentido entero del
        texto.
      </Parrafo>

      <Hook>
        En el examen UMSS suelen aparecer <strong>3-6 preguntas</strong> con espacios en blanco
        para conectores. La trampa: las 4 opciones se ven parecidas pero solo una sigue la
        lógica del texto. Quien identifica la FAMILIA del conector resuelve sin esfuerzo.
      </Hook>
    </EscenaRica>
  );
}

function EscFamilias() {
  return (
    <EscenaRica>
      <Titulo>Tres grandes familias de conectores</Titulo>
      <Resumen>
        <strong>Causa · "¿por qué pasa?"</strong><br />
        porque · ya que · dado que · puesto que · debido a que<br /><br />
        <strong>Adición · "y además..."</strong><br />
        además · también · asimismo · igualmente · por otro lado<br /><br />
        <strong>Conclusión / Consecuencia · "por lo tanto..."</strong><br />
        por eso · por lo tanto · en consecuencia · así que · de modo que
      </Resumen>
      <Cuidado>
        Hay también conectores de <strong>oposición</strong> (sin embargo, pero, aunque, no obstante, a
        pesar de) que indican un cambio de dirección en el argumento. Si el texto NO cambia de dirección,
        no van.
      </Cuidado>

      <Mnemotecnia>
        <strong>4 familias "C-A-O-C"</strong>:<br />
        <strong>C</strong>ausa (porque, ya que, dado que).<br />
        <strong>A</strong>dición (además, también, asimismo).<br />
        <strong>O</strong>posición (pero, sin embargo, aunque).<br />
        <strong>C</strong>onclusión (por eso, por lo tanto, en consecuencia).<br /><br />
        En el examen, primero clasificá cada opción dentro de una familia. Eso descarta el 60% de
        las trampas.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEstrategia() {
  return (
    <EscenaRica>
      <Titulo>Estrategia · 3 pasos</Titulo>
      <Resumen>
        <strong>1. Leé las 4 opciones primero.</strong> Identificá qué FAMILIA propone cada una (causa,
        adición, oposición, conclusión).<br /><br />
        <strong>2. Identificá la relación lógica entre las oraciones.</strong> ¿La segunda oración explica
        la primera (causa)? ¿Agrega información (adición)? ¿La contradice (oposición)? ¿La resume
        (conclusión)?<br /><br />
        <strong>3. Eliminá las opciones que NO encajan</strong> con la relación. Si dos quedan posibles,
        probá leer en voz alta y elegí la más natural.
      </Resumen>

      <WorkedExample titulo="Aplicación · texto sobre Bolivia">
        <strong>Texto:</strong> "Bolivia tiene gran diversidad cultural, ___ cuenta con 36 lenguas
        oficiales. ___, esto puede generar desafíos de integración. ___, la diversidad es una
        riqueza que hay que valorar."<br /><br />

        <strong>Paso 1 · Relación entre oraciones:</strong><br />
        Oración 1 → 2: la segunda EXPLICA POR QUÉ hay diversidad (36 lenguas). Familia:
        <strong> causa</strong>.<br />
        Oración 2 → 3: la tercera AGREGA un matiz negativo. Familia: <strong>oposición</strong>
        (cambio de dirección).<br />
        Oración 3 → 4: la cuarta CONCLUYE valorando la diversidad. Familia: <strong>conclusión
        / cierre</strong>.<br /><br />

        <strong>Paso 2 · Sin mirar opciones, predicción:</strong><br />
        <em>"ya que / Sin embargo / Por lo tanto"</em>.<br /><br />

        <strong>Paso 3 · Comparar con las opciones del examen:</strong> la que coincida con tu
        predicción es la respuesta. Esto es mucho más rápido que probar cada opción.<br /><br />

        <strong>Truco final:</strong> PREDECÍ antes de leer las opciones. El que predice acierta
        en 5 segundos.
      </WorkedExample>

      <Misconception titulo="No todos los conectores 'similares' son intercambiables">
        "Aunque" y "sin embargo" son ambos de oposición, pero <strong>no son intercambiables</strong>:
        — "Aunque" se usa al PRINCIPIO de una oración con cláusula concesiva ("Aunque llueva, voy").<br />
        — "Sin embargo" va DESPUÉS de coma o punto, conectando dos ideas opuestas ("Llueve. Sin
        embargo, voy").<br />
        Si el espacio está al inicio de la oración nueva, va "Sin embargo", no "aunque".
      </Misconception>
    </EscenaRica>
  );
}

function EscGuiado() {
  return (
    <EscenaRica>
      <Titulo>Ejemplo guiado</Titulo>
      <Ejemplo titulo="Texto">
        "La tecnología ha transformado la forma en que trabajamos. ____, ha mejorado la comunicación
        entre equipos. ____, facilita el acceso a la información y a recursos educativos. ____, es
        crucial adaptarse a estos cambios."
      </Ejemplo>
      <PracticaFinal ejercicios={[{
        p: "¿Qué combinación de conectores funciona?",
        o: [
          "Sin embargo - También - Por lo tanto",
          "Por otro lado - Asimismo - Por eso",
          "Aunque - En resumen - A pesar de",
          "En consecuencia - Pero - De hecho",
        ],
        c: 1,
        ex: "Las 3 oraciones AGREGAN ideas positivas sobre la tecnología, y la última concluye. Necesitamos: adición + adición + conclusión. La opción b ofrece 'Por otro lado' (adición) + 'Asimismo' (adición) + 'Por eso' (consecuencia). Las que tienen 'sin embargo', 'aunque' o 'a pesar de' no encajan porque NO hay oposición en el texto.",
      }]} />
    </EscenaRica>
  );
}

function EscPA() {
  return (
    <EscenaRica>
      <Titulo>Práctica A</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "\"La tecnología ha avanzado rápidamente, ____ muchas personas se sienten abrumadas. ____, es importante que se adapten. ____ los beneficios son significativos, hay un costo emocional.\"",
          o: [
            "porque - Además - Sin embargo",
            "aunque - Pero - Por eso",
            "mientras que - Sin embargo - Aunque",
            "a pesar de - Por lo tanto - En consecuencia",
          ],
          c: 2,
          ex: "Las dos primeras oraciones se contraponen (avance + gente abrumada → 'mientras que'). La segunda introduce oposición → 'sin embargo'. La tercera reconoce beneficios pero menciona costo → 'aunque'. La opción c encaja perfectamente.",
        },
        {
          p: "\"El cambio climático es un desafío global, ____ no podemos ignorarlo. ____, se requieren acciones inmediatas. ____, la cooperación internacional es fundamental.\"",
          o: [
            "por lo tanto - Así que - Mientras que",
            "ya que - Sin embargo - Por eso",
            "aunque - Sin embargo - Pero",
            "además - En consecuencia - Por lo tanto",
          ],
          c: 3,
          ex: "Las tres oraciones se ENCADENAN en una misma dirección (afirmar y avanzar). 'Además' (adición) + 'En consecuencia' (conclusión parcial) + 'Por lo tanto' (conclusión final).",
        },
        {
          p: "\"La educación es esencial para el desarrollo personal, ____ proporciona las herramientas para el éxito. ____, fomenta el pensamiento crítico. ____, es fundamental en la sociedad.\"",
          o: [
            "porque - Pero - Así que",
            "ya que - Además - Por eso",
            "aunque - Sin embargo - A pesar de",
            "de hecho - Por lo tanto - En consecuencia",
          ],
          c: 1,
          ex: "Primera oración: causa ('ya que proporciona...'). Segunda: agrega otra razón ('Además, fomenta...'). Tercera: concluye ('Por eso, es fundamental').",
        },
        {
          p: "\"El ejercicio regular es beneficioso, ____ mejora la circulación. ____, reduce el estrés. ____, debe ser parte de la rutina diaria.\"",
          o: [
            "porque - Además - Por lo tanto",
            "aunque - Pero - Sin embargo",
            "ya que - En consecuencia - A pesar de",
            "de hecho - Por eso - Sin embargo",
          ],
          c: 0,
          ex: "Causa + Adición + Conclusión. 'Porque mejora la circulación' (causa). 'Además, reduce el estrés' (adición). 'Por lo tanto, debe ser parte...' (conclusión).",
        },
        {
          p: "\"Las redes sociales han cambiado la forma de comunicarnos, ____ permiten conectar globalmente. ____, también pueden afectar la salud mental. ____, es necesario usarlas responsablemente.\"",
          o: [
            "porque - Pero - Aunque",
            "ya que - Sin embargo - Por eso",
            "aunque - Por lo tanto - En consecuencia",
            "además - Así que - Por lo tanto",
          ],
          c: 1,
          ex: "Causa + Oposición + Conclusión. 'Ya que permiten conectar' (causa). 'Sin embargo, pueden afectar' (oposición). 'Por eso, usarlas con responsabilidad' (conclusión).",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPB() {
  return (
    <EscenaRica>
      <Titulo>Práctica B</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "\"La investigación científica es crucial para la medicina, ____ permite descubrir tratamientos. ____, se basa en la colaboración. ____, es vital financiar proyectos.\"",
          o: [
            "porque - A pesar de - Por eso",
            "ya que - Además - Por lo tanto",
            "aunque - Pero - Así que",
            "en consecuencia - Sin embargo - A pesar de",
          ],
          c: 1,
          ex: "Causa ('ya que permite') + Adición ('Además, se basa') + Conclusión ('Por lo tanto, es vital').",
        },
        {
          p: "\"La lectura enriquece la mente, ____ amplía nuestro vocabulario. ____, ayuda a desarrollar la empatía. ____, es fundamental fomentar el hábito.\"",
          o: [
            "porque - Pero - Así que",
            "ya que - Además - Por eso",
            "aunque - Sin embargo - A pesar de",
            "en consecuencia - Por lo tanto - A pesar de",
          ],
          c: 1,
          ex: "Mismo patrón: causa + adición + conclusión.",
        },
        {
          p: "\"La diversidad cultural enriquece nuestras sociedades, ____ aporta diferentes perspectivas. ____, es importante respetar estas diferencias. ____, fomenta la inclusión.\"",
          o: [
            "porque - Pero - A pesar de",
            "ya que - Además - Por eso",
            "aunque - Sin embargo - Por lo tanto",
            "de hecho - En consecuencia - Así que",
          ],
          c: 1,
          ex: "Causa + adición + conclusión. Las tres oraciones suman ideas positivas — sin oposición.",
        },
        {
          p: "\"La música tiene impacto en nuestras emociones, ____ puede alegrar el día. ____, también puede ser consuelo en momentos difíciles. ____, es un lenguaje universal.\"",
          o: [
            "porque - Pero - Sin embargo",
            "ya que - Además - Por eso",
            "aunque - Por lo tanto - A pesar de",
            "de hecho - Así que - En consecuencia",
          ],
          c: 1,
          ex: "Causa + adición + conclusión. Patrón clásico.",
        },
        {
          p: "\"Los viajes son una forma de aprender sobre el mundo, ____ permiten conocer culturas. ____, son una oportunidad para reflexionar. ____, es importante aprovechar estas experiencias.\"",
          o: [
            "porque - Pero - Así que",
            "ya que - Además - Por eso",
            "aunque - Sin embargo - A pesar de",
            "de hecho - Por lo tanto - Así que",
          ],
          c: 1,
          ex: "Mismo patrón. Cuando un texto encadena razones positivas sin oposición, este es el patrón estándar.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPC() {
  return (
    <EscenaRica>
      <Titulo>Práctica C</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "\"La sostenibilidad es un objetivo clave, ____ debemos cuidar nuestro planeta. ____, es responsabilidad de todos. ____, se requieren cambios diarios.\"",
          o: [
            "porque - Pero - A pesar de",
            "ya que - Además - Por lo tanto",
            "aunque - Sin embargo - Por eso",
            "en consecuencia - Por lo tanto - A pesar de",
          ],
          c: 1,
          ex: "Causa + adición + conclusión.",
        },
        {
          p: "\"Las habilidades de comunicación son esenciales en el trabajo, ____ facilitan el trabajo en equipo. ____, son clave para resolver conflictos. ____, es fundamental desarrollarlas.\"",
          o: [
            "porque - Pero - A pesar de",
            "ya que - Además - Por eso",
            "aunque - Sin embargo - Por lo tanto",
            "de hecho - Así que - En consecuencia",
          ],
          c: 1,
          ex: "Patrón estándar.",
        },
        {
          p: "\"La alimentación saludable es fundamental, ____ proporciona la energía necesaria. ____, ayuda a prevenir enfermedades. ____, debemos educar sobre hábitos.\"",
          o: [
            "porque - Pero - Sin embargo",
            "ya que - Además - Por eso",
            "aunque - Por lo tanto - A pesar de",
            "de hecho - Así que - En consecuencia",
          ],
          c: 1,
          ex: "Causa + adición + conclusión.",
        },
        {
          p: "\"El voluntariado es una forma de contribuir, ____ permite ayudar a quienes lo necesitan. ____, nos enriquece personalmente. ____, es fundamental involucrarse.\"",
          o: [
            "porque - Pero - A pesar de",
            "ya que - Además - Por eso",
            "aunque - Sin embargo - Por lo tanto",
            "en consecuencia - Así que - A pesar de",
          ],
          c: 1,
          ex: "Patrón estándar de razones sumadas + conclusión.",
        },
        {
          p: "\"El arte tiene un papel fundamental, ____ nos permite expresar emociones. ____, fomenta la creatividad. ____, es importante apoyar a los artistas.\"",
          o: [
            "porque - Pero - Sin embargo",
            "ya que - Además - Por eso",
            "aunque - Por lo tanto - A pesar de",
            "de hecho - Así que - En consecuencia",
          ],
          c: 1,
          ex: "Mismo patrón. Como ves, cuando hay 3 oraciones que SUMAN sin oposición, casi siempre la respuesta es 'ya que - Además - Por eso' (causa + adición + conclusión).",
        },
      ]} />
    </EscenaRica>
  );
}

function EscResumen() {
  return (
    <EscenaRica>
      <Titulo>Resumen · estrategia para conectores</Titulo>
      <Resumen>
        <strong>1.</strong> Hay 4 grandes familias: <em>causa, adición, oposición, conclusión</em>.<br /><br />
        <strong>2.</strong> Identificá la relación lógica ANTES de elegir el conector.<br /><br />
        <strong>3.</strong> El patrón más común en el examen: <strong>causa + adición + conclusión</strong>{" "}
        (ej: "ya que - Además - Por eso"). Aparece cuando el texto explica un tema sumando razones.<br /><br />
        <strong>4.</strong> Si una oración cambia de dirección (introduce un problema, una excepción, un
        contrapunto), necesitás <strong>oposición</strong>: pero, sin embargo, aunque, a pesar de.<br /><br />
        <strong>5.</strong> Eliminá opciones que tienen "sin embargo" o "aunque" si el texto NO cambia de
        rumbo en ningún momento.
      </Resumen>

      <Misconception titulo="Las 3 trampas más comunes">
        <strong>(a)</strong> "Sin embargo" o "aunque" colocados donde NO hay oposición.<br />
        <strong>(b)</strong> "Porque" / "ya que" al INICIO de oración (cuando va dentro de
        oración compleja).<br />
        <strong>(c)</strong> Mezcla de familias incompatibles: ej. "ya que (causa) - Sin embargo
        (oposición) - A pesar de (oposición)" no encaja en un texto que SUMA razones.
      </Misconception>
    </EscenaRica>
  );
}
