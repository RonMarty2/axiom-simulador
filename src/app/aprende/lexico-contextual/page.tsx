"use client";

import LeccionShell from "../_components/LeccionShell";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, LecturaQuiz,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="Léxico contextual"
      escenas={[
        { titulo: "Qué es el léxico contextual", componente: EscIntro },
        { titulo: "Estrategia · 4 pasos", componente: EscEstrategia },
        { titulo: "Ejemplo guiado · educación", componente: EscGuiado },
        { titulo: "Práctica 1 · demanda y precios", componente: EscP1 },
        { titulo: "Práctica 2 · administración", componente: EscP2 },
        { titulo: "Práctica 3 · organización", componente: EscP3 },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>El significado depende del contexto</Titulo>
      <Definicion termino="léxico contextual">
        Conjunto de palabras cuyo significado se determina por <strong>el contexto</strong> en que se
        utilizan. Aunque una palabra tenga un significado general (denotativo), su sentido preciso
        depende de la oración entera.
      </Definicion>
      <Ejemplo>
        La palabra <strong>"banco"</strong>:<br /><br />
        • En "depositó su dinero en el banco" → entidad financiera.<br />
        • En "nos sentamos en el banco del parque" → asiento largo.<br /><br />
        La palabra es la misma. El contexto define el significado.
      </Ejemplo>
      <PorQue>
        En el examen aparecen ejercicios donde se subraya una palabra y te piden reemplazarla por su
        sinónimo en ESE contexto específico. Una mala elección altera el significado de la oración.
      </PorQue>
    </EscenaRica>
  );
}

function EscEstrategia() {
  return (
    <EscenaRica>
      <Titulo>Estrategia en 4 pasos</Titulo>
      <Resumen>
        <strong>1. Leé la oración entera</strong>, no solo la palabra subrayada. El sentido está en el
        marco.<br /><br />
        <strong>2. Determiná qué función cumple la palabra</strong>: ¿describe una cosa, una acción, una
        cualidad? Identificá el campo (acto técnico, sentimiento, magnitud, etc.).<br /><br />
        <strong>3. Probá mentalmente cada opción</strong> en el lugar de la palabra original. ¿Cambia el
        sentido o se mantiene?<br /><br />
        <strong>4. Elegí la opción que NO altere el sentido</strong>, aunque tenga distinto género o
        número. La precisión cuenta más que la cercanía formal.
      </Resumen>
      <Cuidado>
        Algunas opciones son <strong>antónimos</strong> disfrazados. Si te apurás y leés solo la palabra
        subrayada, podés elegir una palabra que dice lo contrario y arruinar la oración.
      </Cuidado>
    </EscenaRica>
  );
}

function EscGuiado() {
  return (
    <EscenaRica>
      <Titulo>Ejemplo guiado · texto sobre educación</Titulo>
      <Parrafo>
        Mirá cómo aplicamos la estrategia a un texto real. Subrayadas hay 3 palabras. Probá las opciones
        y verás la explicación de cada una.
      </Parrafo>
      <LecturaQuiz
        numero={1}
        titulo="La educación y la formación"
        texto={<>
          <p>La <strong>educación</strong> es un proceso fundamental que permite a las personas{" "}
          <strong>adquirir</strong> conocimientos y habilidades necesarias para su desarrollo personal
          y profesional. A través de la <strong>formación</strong>, los individuos pueden mejorar su
          calidad de vida y contribuir al bienestar de la sociedad. Por lo tanto, invertir en educación
          es invertir en el futuro.</p>
        </>}
        preguntas={[
          {
            p: "Reemplazar 'EDUCACIÓN' en el texto:",
            o: ["descansar", "instrucción", "conocimiento", "enseñanza", "formación"],
            c: 3,
            ex: "'Enseñanza' encaja con 'proceso que permite adquirir conocimientos'. 'Descansar' es antónimo. 'Conocimiento' y 'formación' son palabras que YA aparecen en el texto y no sirven para reemplazar.",
          },
          {
            p: "Reemplazar 'ADQUIRIR':",
            o: ["perder", "obtener", "compartir", "regalar", "dejar"],
            c: 1,
            ex: "'Obtener' es sinónimo directo de adquirir. 'Perder' y 'dejar' son antónimos. 'Compartir' y 'regalar' implican dar, no recibir.",
          },
          {
            p: "Reemplazar 'FORMACIÓN':",
            o: ["desinformación", "desconcierto", "entrenamiento", "análisis", "capacitación"],
            c: 4,
            ex: "'Capacitación' tiene el sentido de prepararse para algo. 'Desinformación' y 'desconcierto' son negativas. 'Entrenamiento' sirve, pero 'capacitación' es más cercana al contexto educativo formal.",
          },
        ]}
      />
    </EscenaRica>
  );
}

function EscP1() {
  return (
    <EscenaRica>
      <Titulo>Práctica 1 · demanda y precios</Titulo>
      <LecturaQuiz
        numero={2}
        titulo="La demanda de un producto"
        texto={<>
          <p>La <strong>demanda</strong> de un producto se refiere a la cantidad que los consumidores
          están dispuestos a adquirir a un determinado precio. Cuando el precio es <strong>bajo</strong>,
          generalmente la demanda tiende a subir, ya que los compradores aprovechan el costo reducido
          para adquirir más unidades. Por el contrario, si el precio es <strong>alto</strong>, los
          consumidores tienden a reducir sus compras.</p>
        </>}
        preguntas={[
          {
            p: "Reemplazar 'DEMANDA':",
            o: ["oferta", "necesidad", "solicitud", "distribución", "inventario"],
            c: 2,
            ex: "'Solicitud' captura el sentido de 'cantidad pedida por los consumidores'. 'Oferta' es lo contrario. 'Necesidad' es vago, 'distribución' e 'inventario' refieren al lado del vendedor.",
          },
          {
            p: "Reemplazar 'BAJO' (refiriéndose al precio):",
            o: ["alto", "mínimo", "económico", "reducido", "limitado"],
            c: 3,
            ex: "'Reducido' es lo más natural: 'precio reducido'. 'Alto' es antónimo. 'Mínimo' y 'limitado' son más extremos. 'Económico' es sinónimo pero más coloquial.",
          },
          {
            p: "Reemplazar 'ALTO' (refiriéndose al precio):",
            o: ["bajo", "extenso", "largo", "grueso", "elevado"],
            c: 4,
            ex: "'Elevado' es el sinónimo natural de alto en contexto de precios. Las otras opciones son adjetivos físicos que no encajan.",
          },
        ]}
      />
    </EscenaRica>
  );
}

function EscP2() {
  return (
    <EscenaRica>
      <Titulo>Práctica 2 · administración</Titulo>
      <LecturaQuiz
        numero={3}
        titulo="La administración como disciplina"
        texto={<>
          <p>La administración es el <strong>proceso</strong> de planificar, organizar, dirigir y
          controlar los recursos, con el fin de alcanzar objetivos de manera eficiente. Un buen
          administrador debe ser capaz de <strong>gestionar</strong> tanto los recursos humanos como
          los materiales. Además, es importante que exista una <strong>planificación</strong> adecuada,
          ya que sin ella no se podrían alcanzar las metas propuestas.</p>
        </>}
        preguntas={[
          {
            p: "Reemplazar 'PROCESO':",
            o: ["objeto", "procedimiento", "liderazgo", "dirección", "logro"],
            c: 1,
            ex: "'Procedimiento' es sinónimo directo: una serie ordenada de pasos. Las otras opciones cambian el sentido.",
          },
          {
            p: "Reemplazar 'GESTIONAR':",
            o: ["ejecutar", "supervisar", "organizar", "administrar", "controlar"],
            c: 3,
            ex: "'Administrar' es el sinónimo más completo. 'Ejecutar', 'supervisar', 'controlar' son partes del gestionar pero no la totalidad.",
          },
          {
            p: "Reemplazar 'PLANIFICACIÓN':",
            o: ["proyección", "desarrollo", "organización", "previsión", "control"],
            c: 3,
            ex: "'Previsión' encaja con el sentido de anticipar y preparar. 'Organización' y 'control' son otras funciones administrativas (no sinónimos). 'Desarrollo' es ejecución, no planificación.",
          },
        ]}
      />
    </EscenaRica>
  );
}

function EscP3() {
  return (
    <EscenaRica>
      <Titulo>Práctica 3 · organización de empresas</Titulo>
      <LecturaQuiz
        numero={4}
        titulo="La organización empresarial"
        texto={<>
          <p>La <strong>organización</strong> de una empresa implica estructurar y coordinar sus
          diferentes áreas para alcanzar los objetivos establecidos. Esto requiere una{" "}
          <strong>distribución</strong> adecuada de tareas entre los miembros de la empresa y
          asegurar que cada uno tenga los recursos necesarios. Una buena organización permite que la
          empresa funcione de manera <strong>eficiente</strong>.</p>
        </>}
        preguntas={[
          {
            p: "Reemplazar 'ORGANIZACIÓN':",
            o: ["síntesis", "realidad", "composición", "finalización", "cierre"],
            c: 2,
            ex: "'Composición' se refiere a estructurar partes en un todo, que es lo que hace organizar. Las otras opciones son distantes.",
          },
          {
            p: "Reemplazar 'DISTRIBUCIÓN':",
            o: ["mejora", "asignación", "dispersión", "entrega", "almacenamiento"],
            c: 1,
            ex: "'Asignación' encaja con 'repartir tareas'. 'Dispersión' implica desorden. 'Entrega' y 'almacenamiento' no aplican al contexto de tareas.",
          },
          {
            p: "Reemplazar 'EFICIENTE':",
            o: ["costoso", "morosa", "eficaz", "productivo", "sencillo"],
            c: 3,
            ex: "'Productivo' captura el sentido de buen aprovechamiento de recursos. 'Eficaz' (lograr el fin) y 'eficiente' (con pocos recursos) son distintos.",
          },
        ]}
      />
    </EscenaRica>
  );
}

function EscResumen() {
  return (
    <EscenaRica>
      <Titulo>Resumen</Titulo>
      <Resumen>
        <strong>1.</strong> Léxico contextual = sinónimo correcto para ESE contexto.<br /><br />
        <strong>2.</strong> Leé la oración entera, no la palabra suelta.<br /><br />
        <strong>3.</strong> Probá la opción en el lugar de la palabra original.<br /><br />
        <strong>4.</strong> Las opciones suelen incluir 1 sinónimo correcto, 1 antónimo trampa, y 2-3
        palabras del mismo campo pero con sentido distinto.<br /><br />
        <strong>5.</strong> Si dos opciones parecen igual de buenas, elegí la más natural en ese
        registro (formal/coloquial/técnico).
      </Resumen>
    </EscenaRica>
  );
}
