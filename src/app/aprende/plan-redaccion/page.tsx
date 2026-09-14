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
      unidad="05"
      tituloUnidad="Plan de redacción"
      escenas={[
        { titulo: "Qué evalúa el plan de redacción", componente: EscIntro },
        { titulo: "El orden lógico · 4 patrones", componente: EscPatrones },
        { titulo: "Ejemplo guiado · Newton", componente: EscGuiado },
        { titulo: "Práctica A · 4 ejercicios", componente: EscPA },
        { titulo: "Práctica B · 4 ejercicios", componente: EscPB },
        { titulo: "Práctica C · 5 ejercicios", componente: EscPC },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>El plan de redacción</Titulo>
      <Definicion termino="plan de redacción">
        Tipo de ejercicio que mide tu capacidad de <strong>producir textos coherentes</strong>.
        Te dan 4-5 oraciones en desorden y debes elegir el orden lógico que forma un párrafo coherente.
      </Definicion>
      <PorQue>
        Es la unidad que más evalúa <strong>pensamiento estructurado</strong>. Si puedes ordenar ideas
        lógicamente en este ejercicio, puedes organizarlas en tu propia escritura.
      </PorQue>
      <Cuidado>
        Prestá especial atención al <strong>título</strong> del ejercicio: te orienta sobre el tema y
        ayuda a identificar la primera oración (la que introduce el tema general).
      </Cuidado>

      <Hook>
        En el examen UMSS aparecen <strong>4-6 planes de redacción</strong>. La técnica del
        "primera y última" (identificar la oración que abre y la que cierra) resuelve la mayoría
        en 30 segundos sin necesidad de probar todas las combinaciones.
      </Hook>

      <Mnemotecnia>
        <strong>Estrategia "P-U-M"</strong>:<br />
        <strong>P</strong>rimera (la más general → introduce el tema).<br />
        <strong>U</strong>ltima (la que concluye o llama a la acción).<br />
        <strong>M</strong>edio (entre primera y última, ordena por cronología/causa-efecto/general-particular).<br /><br />
        Con primera y última fijas, las opciones se reducen drásticamente.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPatrones() {
  return (
    <EscenaRica>
      <Titulo>4 patrones típicos de orden</Titulo>
      <Resumen>
        <strong>1. De lo general a lo específico</strong><br />
        Definición → ejemplo → detalle → consecuencia.<br />
        Ej: "El agua es una molécula… cubre el 71% de la Tierra… mantiene los ecosistemas."<br /><br />
        <strong>2. Cronológico</strong><br />
        Nacimiento → eventos en orden → obra principal.<br />
        Ej: "Nació en 1642 → trabajó en mecánica → contribuciones → publicó su obra en 1687."<br /><br />
        <strong>3. Causa → consecuencia → solución</strong><br />
        Problema → razón → resultado → propuesta.<br /><br />
        <strong>4. Tesis → razones → conclusión</strong><br />
        Afirmación general → 2-3 razones → llamado a la acción.<br />
        Ej: "La sostenibilidad es clave → razón 1 → razón 2 → debemos cambiar."
      </Resumen>

      <WorkedExample titulo="Cómo identificar la PRIMERA oración">
        Pistas para detectar la primera oración:<br /><br />

        <strong>(a) Definición</strong>: "El X es…" / "X se refiere a…" / "X es un proceso…".<br />
        <strong>(b) Tema en grande</strong>: usa el sustantivo del título sin antecedentes
        ("Bolivia es…", "El ADN es…").<br />
        <strong>(c) Sin pronombres anafóricos</strong>: no comienza con "este", "esto", "él",
        "esa molécula": porque esos remiten a algo mencionado ANTES.<br /><br />

        <strong>Pistas para detectar la ÚLTIMA oración:</strong><br />
        (a) Llamado a la acción: "debemos…", "es fundamental…", "hay que…".<br />
        (b) Consecuencia o cierre: "por eso…", "por todo lo anterior…".<br />
        (c) Fecha tardía en una secuencia cronológica.<br /><br />

        <strong>Práctica mental:</strong> mira las 4 oraciones y SIN leer las opciones, decidí
        cuál sería la 1ra y cuál la última. Después comparás con las opciones: el 80% se
        descarta automáticamente.
      </WorkedExample>

      <Misconception titulo="Trampa · 'el orden natural 1-2-3-4 siempre gana'">
        En muchos ejercicios fáciles, las oraciones ya vienen casi en orden y la respuesta es
        1-2-3-4. Pero NO siempre: en cronología histórica, la oración 3 (la del nacimiento) suele
        ir primero aunque esté listada como tercera. Nunca elijas 1-2-3-4 por reflejo: verifica
        el orden lógico.
      </Misconception>
    </EscenaRica>
  );
}

function EscGuiado() {
  return (
    <EscenaRica>
      <Titulo>Ejemplo guiado · "Isaac Newton"</Titulo>
      <Parrafo>
        Tienes estas 4 oraciones desordenadas:
      </Parrafo>
      <Ejemplo>
        <strong>1.</strong> Newton es reconocido principalmente por su trabajo en mecánica clásica y óptica.<br />
        <strong>2.</strong> Entre sus contribuciones más importantes están las leyes del movimiento y la
        ley de la gravitación universal.<br />
        <strong>3.</strong> Nació en Woolsthorpe, Inglaterra, en 1642.<br />
        <strong>4.</strong> Publicó su obra más influyente, <em>Principia Mathematica</em>, en 1687.
      </Ejemplo>
      <PracticaFinal ejercicios={[{
        p: "¿Cuál es el orden lógico?",
        o: ["1-2-3-4", "3-1-2-4", "1-3-4-2", "3-2-1-4", "4-2-1-3"],
        c: 1,
        ex: "Patrón cronológico clásico: 3 (nace) → 1 (cómo se lo recuerda en términos generales) → 2 (sus contribuciones específicas) → 4 (su obra cumbre publicada). Empezar con la fecha de nacimiento es la entrada natural.",
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
          p: "\"Teoría de la Evolución\": (1) Darwin propuso la teoría de la evolución por selección natural en El origen de las especies. (2) Este libro fue publicado en 1859. (3) La selección natural explica cómo las especies cambian. (4) Darwin realizó observaciones durante su viaje en el Beagle.",
          o: ["1-3-4-2", "4-1-3-2", "3-1-4-2", "1-4-2-3", "4-3-2-1"],
          c: 1,
          ex: "4 (origen: las observaciones) → 1 (formuló la teoría) → 3 (explica el mecanismo) → 2 (publicó el libro). Es cronológico-causal: viaje → idea → mecanismo → publicación.",
        },
        {
          p: "\"La Fotosíntesis\": (1) Las plantas usan luz solar para convertir CO2 y agua en glucosa y oxígeno. (2) La fotosíntesis es un proceso fundamental para la vida en la Tierra. (3) Las plantas generan el oxígeno que respiramos. (4) La energía solar es capturada por los cloroplastos.",
          o: ["2-1-3-4", "1-4-2-3", "2-4-1-3", "4-1-3-2", "2-3-1-4"],
          c: 1,
          ex: "1 (qué hacen las plantas: lo general) → 4 (cómo: detalle del mecanismo) → 2 (importancia para la vida) → 3 (consecuencia: oxígeno para nosotros). De lo general al detalle, luego importancia y consecuencia.",
        },
        {
          p: "\"Sistema Solar\": (1) Nuestro sistema solar está formado por el Sol y los cuerpos que lo orbitan. (2) Existen ocho planetas que orbitan al Sol. (3) El Sol es una estrella ubicada en el centro. (4) Los planetas se dividen en interiores y exteriores.",
          o: ["1-3-2-4", "1-4-3-2", "2-1-3-4", "3-1-4-2", "4-2-1-3"],
          c: 0,
          ex: "1 (qué es el sistema solar) → 3 (qué es el Sol, el centro) → 2 (cuántos planetas) → 4 (cómo se dividen). De general a particular, profundizando en cada nivel.",
        },
        {
          p: "\"El Agua\": (1) El agua es una molécula compuesta por dos átomos de hidrógeno y uno de oxígeno (H2O). (2) Es esencial para la vida y se encuentra en los tres estados. (3) El agua cubre alrededor del 71% de la superficie terrestre. (4) Además, regula la temperatura del planeta.",
          o: ["1-3-4-2", "1-2-4-3", "3-1-2-4", "2-4-1-3", "1-2-3-4"],
          c: 4,
          ex: "Orden natural: 1 (definición química) → 2 (importancia y estados) → 3 (extensión en la Tierra) → 4 (otra función). De la naturaleza a sus efectos.",
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
          p: "\"El ADN\": (1) El ADN es la molécula que contiene la información genética. (2) Tiene una estructura de doble hélice. (3) Fue descubierto por Watson y Crick en 1953. (4) Es responsable de la transmisión de características hereditarias.",
          o: ["1-4-3-2", "3-1-4-2", "1-2-4-3", "1-3-2-4", "4-2-1-3"],
          c: 1,
          ex: "Orden cronológico-conceptual: 3 (cuándo fue descubierto) → 1 (qué es) → 4 (qué función cumple) → 2 (cómo es su estructura). El descubrimiento histórico abre, después definimos, luego función y por último detalle estructural.",
        },
        {
          p: "\"Átomos y Moléculas\": (1) Los átomos se combinan entre sí para formar moléculas. (2) Un átomo es la unidad más pequeña de la materia. (3) Las moléculas pueden estar formadas por uno o más tipos de átomos. (4) Todo lo que existe está compuesto por átomos y moléculas.",
          o: ["2-1-3-4", "4-2-1-3", "2-3-1-4", "1-4-3-2", "3-2-4-1"],
          c: 0,
          ex: "2 (define átomo) → 1 (qué hacen los átomos: forman moléculas) → 3 (describe las moléculas) → 4 (conclusión general: todo está hecho de ellos). De lo más pequeño a la consecuencia universal.",
        },
        {
          p: "\"La Electricidad\": (1) La corriente eléctrica es el flujo de electrones a través de un conductor. (2) Los electrones se desplazan debido a una diferencia de potencial. (3) Esta diferencia se mide en voltios. (4) La electricidad es una de las formas de energía más usadas en la vida cotidiana.",
          o: ["4-1-2-3", "1-4-3-2", "3-2-1-4", "1-3-4-2", "4-2-3-1"],
          c: 0,
          ex: "4 (introducción general: importancia en la vida) → 1 (qué es la corriente) → 2 (por qué se mueven los electrones) → 3 (cómo se mide). Del contexto a la definición técnica, profundizando.",
        },
        {
          p: "\"Células\": (1) La célula es la unidad fundamental de los seres vivos. (2) Todos los organismos están compuestos por una o más células. (3) Hay dos tipos: procariotas y eucariotas. (4) Las células realizan funciones esenciales como reproducción y metabolismo.",
          o: ["1-2-3-4", "2-1-4-3", "1-4-3-2", "1-2-4-3", "3-2-1-4"],
          c: 0,
          ex: "1 (qué es una célula) → 2 (donde se encuentran: en todo organismo) → 3 (tipos) → 4 (funciones). Definición → presencia → clasificación → función.",
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
          p: "\"La Sostenibilidad\": (1) La sostenibilidad es un objetivo clave en la actualidad. (2) Debemos cuidar nuestro planeta para las futuras generaciones. (3) Es responsabilidad de todos implementar prácticas sostenibles. (4) Se requieren cambios en nuestras actividades diarias.",
          o: ["1-2-3-4", "1-3-4-2", "2-1-3-4", "3-2-1-4", "4-1-2-3"],
          c: 0,
          ex: "Tesis → razón → responsabilidad → llamado a la acción. Patrón clásico de argumentación.",
        },
        {
          p: "\"Las Habilidades de Comunicación\": (1) Las habilidades de comunicación son esenciales en el trabajo. (2) Facilitan el trabajo en equipo. (3) Son clave para presentar ideas con claridad. (4) Es fundamental desarrollarlas desde la escuela.",
          o: ["1-2-3-4", "2-1-3-4", "3-2-1-4", "1-3-2-4", "4-1-2-3"],
          c: 0,
          ex: "Tesis (1) → primera razón (2) → segunda razón (3) → conclusión + llamado (4).",
        },
        {
          p: "\"La Alimentación Saludable\": (1) La alimentación saludable es fundamental para el bienestar. (2) Proporciona la energía necesaria. (3) Ayuda a prevenir enfermedades. (4) Debemos educar sobre hábitos alimenticios desde jóvenes.",
          o: ["1-2-3-4", "1-3-2-4", "2-1-4-3", "3-2-1-4", "1-4-2-3"],
          c: 0,
          ex: "Mismo patrón: tesis + 2 razones + llamado.",
        },
        {
          p: "\"El Voluntariado\": (1) El voluntariado es una forma de contribuir a la comunidad. (2) Permite ayudar a quienes más lo necesitan. (3) También enriquece personalmente a quienes lo practican. (4) Es fundamental involucrarse en estas iniciativas para fortalecer el tejido social.",
          o: ["1-2-3-4", "2-1-3-4", "1-3-2-4", "3-2-1-4", "4-1-2-3"],
          c: 0,
          ex: "Tesis + razón externa + razón interna + llamado a la acción.",
        },
        {
          p: "\"El Arte\": (1) El arte tiene un papel fundamental en la sociedad. (2) Nos permite expresar emociones e ideas. (3) Fomenta la creatividad y el pensamiento crítico. (4) Es importante apoyar a los artistas locales.",
          o: ["1-2-3-4", "2-1-4-3", "1-3-2-4", "3-2-1-4", "4-1-2-3"],
          c: 0,
          ex: "Tesis + razones + llamado. Como ves, muchos ejercicios siguen este patrón: el orden natural 1-2-3-4 es la respuesta correcta cuando la primera oración es la tesis.",
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
        <strong>1.</strong> Identifica la oración que <strong>introduce el tema</strong> (suele ser la
        más general). Esa es la primera.<br /><br />
        <strong>2.</strong> Identifica la oración que <strong>concluye o llama a la acción</strong>. Esa
        es la última.<br /><br />
        <strong>3.</strong> Entre primera y última, ordena por lógica: del general a lo específico, de
        causa a efecto, o cronológicamente.<br /><br />
        <strong>4.</strong> Las palabras clave (definiciones, datos históricos, fechas) ayudan a fijar el
        orden.<br /><br />
        <strong>5.</strong> Si tienes dudas entre 2 opciones, relee el texto reconstruido en voz alta. La
        opción correcta "suena" como un párrafo natural; la incorrecta tiene saltos lógicos.
      </Resumen>

      <Mnemotecnia>
        <strong>4 patrones de orden ("D-C-C-T")</strong>:<br />
        <strong>D</strong>e general a específico (definición → ejemplo).<br />
        <strong>C</strong>ronológico (fecha de inicio → eventos).<br />
        <strong>C</strong>ausa-efecto (problema → consecuencia → solución).<br />
        <strong>T</strong>esis-razones (afirmación → razones → llamado).<br /><br />
        Identifica el patrón primero, después el orden surge solo.
      </Mnemotecnia>
    </EscenaRica>
  );
}
