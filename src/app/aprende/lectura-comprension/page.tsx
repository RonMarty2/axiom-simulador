"use client";

import LeccionShell from "../_components/LeccionShell";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Resumen,
  EscenaRica, LecturaQuiz,
  Hook, Misconception, Mnemotecnia, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Comprensión de lectura"
      escenas={[
        { titulo: "Cómo abordar un texto", componente: EscEstrategia },
        { titulo: "Ejemplo guiado · economía de mercado", componente: EscLectura1 },
        { titulo: "Lectura · crecimiento y desigualdad", componente: EscLectura2 },
        { titulo: "Lectura · inflación y consumo", componente: EscLectura3 },
        { titulo: "Lectura · globalización", componente: EscLectura4 },
        { titulo: "Lectura · comercio electrónico", componente: EscLectura5 },
        { titulo: "Lectura · inversión extranjera (IED)", componente: EscLectura6 },
        { titulo: "Lectura · impuestos progresivos", componente: EscLectura7 },
        { titulo: "Lectura · remesas", componente: EscLectura8 },
        { titulo: "Resumen de estrategia", componente: EscResumen },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Estrategia inicial: cómo abordar cualquier pregunta de comprensión.
// ─────────────────────────────────────────────────────────────────────────────
function EscEstrategia() {
  return (
    <EscenaRica>
      <Titulo>Comprensión de lectura · la habilidad central del examen</Titulo>
      <Hook>
        De las 100 preguntas del examen UMSS, <strong>comprensión de lectura representa entre 15 y
        20</strong>. Si dominas esta unidad, ya tienes casi un quinto del examen ganado.
        Si no la dominas, te cuesta caro.
      </Hook>
      <Parrafo>
        Mide algo más que "entender palabras": evalúa si puedes <strong>extraer la idea principal</strong>,
        <strong> inferir intenciones</strong> y <strong>conectar partes</strong> del texto.
      </Parrafo>

      <Definicion termino="comprensión lectora">
        No es solo captar el significado literal, sino también las <strong>relaciones entre las ideas</strong>{" "}
        que permiten una interpretación coherente y precisa (RAE).
      </Definicion>

      <Resumen>
        <strong>Estrategia en 4 pasos</strong> (probada en exámenes de admisión):<br /><br />
        <strong>1. Lectura rápida primera</strong>: para captar de qué trata el texto (¿de qué tema
        habla?, ¿qué postura toma el autor?).<br /><br />
        <strong>2. Lectura detallada después</strong>: identifica la <strong>idea principal de cada
        párrafo</strong> (es lo que el autor más repite o lo que articula al párrafo).<br /><br />
        <strong>3. Lee la pregunta CON ATENCIÓN</strong>: palabras como "según el texto", "se puede
        deducir" o "principalmente" cambian todo. Subráyalas mentalmente.<br /><br />
        <strong>4. Vuelve al texto antes de elegir</strong>: nunca contestes solo "porque sí". Vuelve y
        verifica. Si dos opciones parecen buenas, la correcta es la <strong>más completa o más exacta</strong>.
      </Resumen>

      <Mnemotecnia>
        <strong>Acrónimo para recordar la estrategia: "RDPC"</strong>:<br />
        <strong>R</strong>ápida · <strong>D</strong>etallada · <strong>P</strong>regunta ·
        <strong> C</strong>ontrastar con el texto.
      </Mnemotecnia>

      <Misconception titulo="Trampa 1 · la opción 'verdadera pero parcial'">
        Una opción dice algo CIERTO del texto pero solo de UN párrafo. Si la pregunta pide la IDEA
        PRINCIPAL, esa opción es trampa: es verdadera pero no abarca el texto entero. Busca la más
        COMPLETA.
      </Misconception>

      <Misconception titulo="Trampa 2 · la opción 'mismas palabras, sentido opuesto'">
        Opción que reusa palabras del texto pero las usa al revés. Ej: el texto dice "las
        importaciones BAJARON", la opción dice "las importaciones AUMENTARON". Suena familiar pero
        miente.
      </Misconception>

      <Misconception titulo="Trampa 3 · 'verdadera pero ajena'">
        Opción que dice algo VERDADERO en la vida real, pero el texto NO lo menciona. Ej: el texto
        habla de la inflación; la opción dice "el desempleo afecta a los jóvenes" (cierto, pero no
        está en el texto). Si no está en el texto, NO es la respuesta.
      </Misconception>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura 1: ejemplo guiado tomado de la práctica resuelta de la guía.
// ─────────────────────────────────────────────────────────────────────────────
function EscLectura1() {
  return (
    <EscenaRica>
      <Titulo>Ejemplo guiado · economía de mercado</Titulo>
      <Parrafo>
        Aplica la estrategia que acabas de ver. Lee con calma, después contesta. Cada opción te explica
        por qué es buena o por qué no.
      </Parrafo>
      <LecturaQuiz
        numero={1}
        titulo="La economía de mercado y la intervención del Estado"
        texto={<>
          <p>La economía de mercado se basa en el principio de la oferta y la demanda, regulada por el
          comportamiento de los consumidores y los productores. Sin embargo, hay factores externos que
          pueden distorsionar esta dinámica, como las intervenciones gubernamentales, las políticas
          monetarias y fiscales, y los fenómenos económicos globales. La intervención del Estado, a
          través de políticas monetarias y fiscales, busca corregir las fallas del mercado, promoviendo
          la estabilidad económica y el crecimiento sostenible.</p>
          <p>En este contexto, uno de los elementos clave para comprender cómo funciona una economía es
          el papel de las tasas de interés. Estas influyen directamente en el nivel de inversión, el
          consumo y el ahorro. Un aumento en las tasas de interés generalmente reduce el consumo y la
          inversión, ya que encarece el costo de los préstamos. Por otro lado, cuando las tasas de
          interés bajan, se incentiva el gasto y la inversión.</p>
          <p>El análisis económico también debe considerar otros factores como la inflación, que refleja
          el aumento generalizado de los precios. La inflación erosiona el poder adquisitivo de los
          consumidores, lo que puede generar descontento social y presiones políticas. Por esta razón,
          los bancos centrales tienen como uno de sus principales objetivos el control de la inflación,
          buscando mantenerla en niveles estables y predecibles.</p>
          <p>Finalmente, en una economía globalizada, las decisiones de política económica de un país
          pueden tener efectos significativos en otras naciones, debido a la interdependencia de los
          mercados. Un aumento en las tasas de interés en Estados Unidos, por ejemplo, puede afectar a
          las economías emergentes, encareciendo sus deudas y reduciendo los flujos de inversión.</p>
        </>}
        preguntas={[
          {
            p: "El texto trata fundamentalmente acerca de:",
            o: [
              "La importancia de las tasas de interés en la economía global.",
              "El impacto de las políticas monetarias y fiscales en la estabilidad económica.",
              "Cómo las decisiones económicas de un país afectan a los mercados internacionales.",
              "La interrelación entre la inflación y las tasas de interés en la economía.",
              "El funcionamiento del mercado basado en la oferta y la demanda.",
            ],
            c: 1,
            ex: "El texto NO trata solo de tasas de interés (a) ni solo de inflación (d), aunque las menciona. Su eje es cómo el Estado interviene con políticas monetarias y fiscales para estabilizar la economía. Las opciones a, c, d y e son verdaderas según el texto pero PARCIALES: cubren solo un párrafo, no la idea central.",
          },
          {
            p: "Según el texto, ¿cuál es el efecto de un aumento en las tasas de interés?",
            o: [
              "Se incrementa el consumo.",
              "Se incentiva la inversión.",
              "Disminuye el ahorro.",
              "Aumenta el costo de los préstamos.",
              "Se estabilizan los precios.",
            ],
            c: 3,
            ex: "El texto lo dice literalmente: 'un aumento en las tasas de interés generalmente reduce el consumo y la inversión, ya que encarece el costo de los préstamos'. Las opciones a, b y c dicen LO CONTRARIO de lo que afirma el texto.",
          },
          {
            p: "Del texto se puede deducir que el control de la inflación es uno de los objetivos principales de:",
            o: [
              "Los gobiernos nacionales.",
              "Los consumidores.",
              "Los bancos centrales.",
              "Las políticas fiscales.",
              "Los mercados de capital.",
            ],
            c: 2,
            // Decía "(Reserva Federal, Banco Central Europeo)" y el texto de la
            // lectura no nombra a ninguno de los dos. Justo en la lección que
            // enseña la trampa de "verdadera pero ajena al texto".
            ex: "El texto dice que los bancos centrales tienen como uno de sus principales objetivos el control de la inflación. Aunque los gobiernos también participan, el texto le atribuye esa función a los bancos centrales.",
          },
          {
            p: "Si las decisiones de política económica de un país afectan significativamente a otros países, esto se debe principalmente a:",
            o: [
              "La política monetaria.",
              "La globalización de los mercados.",
              "El aumento de los precios internacionales.",
              "El control de la inflación.",
              "La estabilidad fiscal.",
            ],
            c: 1,
            ex: "El texto cierra explicando que 'en una economía globalizada, las decisiones de política económica de un país pueden tener efectos significativos en otras naciones, debido a la interdependencia de los mercados'. La causa raíz es la GLOBALIZACIÓN.",
          },
        ]}
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura 2: crecimiento económico y desigualdad social
// ─────────────────────────────────────────────────────────────────────────────
function EscLectura2() {
  return (
    <EscenaRica>
      <Titulo>Crecimiento económico y desigualdad social</Titulo>
      <LecturaQuiz
        numero={2}
        titulo="El crecimiento económico y la desigualdad social"
        texto={<>
          <p>El crecimiento económico ha sido considerado como uno de los motores más importantes para
          el desarrollo de las naciones. Sin embargo, no todos los países que han experimentado un
          aumento en su Producto Interno Bruto (PIB) han logrado reducir la desigualdad social. A
          menudo, el crecimiento económico beneficia en mayor medida a los sectores de la población que
          ya poseen mayores recursos, generando una brecha aún más profunda entre los ricos y los
          pobres.</p>
          <p>La distribución equitativa de los beneficios del crecimiento económico depende de diversos
          factores, entre ellos, las políticas públicas que se implementen para redistribuir la riqueza
          y generar oportunidades para todos los estratos sociales. Si estas políticas no se aplican
          adecuadamente, el resultado puede ser un aumento en la pobreza relativa, incluso en medio de
          un crecimiento económico general.</p>
          <p>La pregunta clave en la economía actual es cómo lograr un equilibrio entre el crecimiento
          económico y la reducción de la desigualdad social. A menudo se plantea el dilema entre
          eficiencia y equidad: mientras que algunas medidas favorecen un crecimiento más rápido, otras
          pueden estar orientadas hacia una mayor distribución de la riqueza, lo que a veces ralentiza
          el crecimiento a corto plazo.</p>
        </>}
        preguntas={[
          {
            p: "El texto reflexiona principalmente sobre:",
            o: [
              "La relación entre el crecimiento económico y el aumento de la pobreza absoluta.",
              "El crecimiento económico y su impacto en la desigualdad social.",
              "El Producto Interno Bruto como medida de la riqueza.",
              "Las políticas públicas como motores del crecimiento económico.",
              "La eficiencia y equidad como conceptos irreconciliables.",
            ],
            c: 1,
            ex: "El texto pone énfasis en cómo el crecimiento económico puede AUMENTAR la desigualdad social si no se implementan políticas adecuadas. No habla de pobreza absoluta (a), ni del PIB en sí (c).",
          },
          {
            p: "Según el texto, el crecimiento económico puede agravar la desigualdad si:",
            o: [
              "Se distribuyen los recursos equitativamente entre todos los sectores.",
              "Los sectores más vulnerables se benefician más de la sociedad.",
              "Solo se aplican políticas de redistribución de la riqueza.",
              "Los sectores más ricos se benefician más del crecimiento.",
              "El PIB crece de manera equitativa entre todos los ciudadanos.",
            ],
            c: 3,
            ex: "El texto señala que el crecimiento favorece más a quienes ya poseen mayores recursos, lo que incrementa la brecha de desigualdad.",
          },
          {
            p: "El dilema entre eficiencia y equidad implica:",
            o: [
              "Sacrificar el crecimiento para garantizar la igualdad social.",
              "Mantener el crecimiento sin preocuparse por la redistribución.",
              "Lograr un equilibrio perfecto entre crecimiento y equidad.",
              "Decidir entre favorecer un crecimiento más rápido o una distribución más justa.",
              "Evitar políticas públicas que ralenticen el crecimiento económico.",
            ],
            c: 3,
            ex: "El texto plantea explícitamente este dilema: medidas que favorecen crecimiento rápido vs. medidas que promueven distribución (y ralentizan a corto plazo).",
          },
          {
            p: "De acuerdo con el texto, la pobreza relativa puede aumentar si:",
            o: [
              "No se aplica ninguna política pública de redistribución.",
              "El crecimiento económico se distribuye equitativamente.",
              "Los sectores vulnerables se benefician de las políticas.",
              "Se aplican correctamente las políticas públicas.",
              "La desigualdad disminuye debido a la intervención del gobierno.",
            ],
            c: 0,
            ex: "El texto advierte que si NO se aplican políticas de redistribución adecuadas, el crecimiento puede beneficiar desproporcionadamente a los ricos, aumentando la pobreza relativa.",
          },
          {
            p: "¿Qué sería lo más adecuado para reducir la desigualdad en medio del crecimiento económico?",
            o: [
              "Aumentar el PIB sin más intervenciones.",
              "Implementar políticas que solo beneficien a los más ricos.",
              "Equilibrar el crecimiento económico con políticas redistributivas.",
              "Fomentar un crecimiento económico que favorezca a los más pobres.",
              "Mantener la desigualdad social para aumentar la eficiencia.",
            ],
            c: 2,
            ex: "El texto plantea que el crecimiento económico debe ir acompañado de políticas públicas que redistribuyan los beneficios equitativamente.",
          },
        ]}
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura 3: inflación
// ─────────────────────────────────────────────────────────────────────────────
function EscLectura3() {
  return (
    <EscenaRica>
      <Titulo>La inflación y el consumo</Titulo>
      <LecturaQuiz
        numero={3}
        titulo="La inflación y su impacto en el consumo"
        texto={<>
          <p>La inflación es un fenómeno económico que se caracteriza por el aumento generalizado de los
          precios de bienes y servicios en una economía. Cuando la inflación es alta, reduce el poder
          adquisitivo de las personas, ya que necesitan más dinero para comprar los mismos bienes que
          adquirían antes a un menor costo. Este efecto es particularmente visible en los consumidores
          de ingresos fijos, quienes ven su capacidad de compra disminuida considerablemente.</p>
          <p>Para combatir la inflación, los gobiernos y los bancos centrales utilizan herramientas como
          la política monetaria y fiscal. Sin embargo, estas medidas pueden tener efectos secundarios,
          como una desaceleración del crecimiento económico o un aumento en la tasa de desempleo.</p>
          <p>En resumen, la inflación afecta tanto a las personas como a las empresas, alterando las
          decisiones de consumo e inversión. Es por ello que su control es fundamental para garantizar
          la estabilidad económica.</p>
        </>}
        preguntas={[
          {
            p: "El tema principal del texto es:",
            o: [
              "El impacto de la política fiscal en la inflación.",
              "La relación entre inflación y crecimiento económico.",
              "Cómo la inflación afecta el consumo y la economía en general.",
              "Las herramientas utilizadas por los bancos centrales.",
              "El aumento en los precios en tiempos de crisis.",
            ],
            c: 2,
            ex: "El texto trata principalmente sobre el impacto de la inflación en el consumo de las personas y en la economía general. Es lo que da unidad a los 3 párrafos.",
          },
          {
            p: "Según el texto, uno de los efectos más evidentes de la inflación es:",
            o: [
              "La desaceleración del crecimiento económico.",
              "La mejora en la capacidad de compra de los consumidores.",
              "El aumento en los ingresos de las personas con salario fijo.",
              "La reducción del poder adquisitivo.",
              "La disminución en los precios de bienes y servicios.",
            ],
            c: 3,
            ex: "El texto lo dice directamente: cuando la inflación es alta, reduce el poder adquisitivo (necesitas más dinero para comprar lo mismo).",
          },
          {
            p: "Una de las herramientas mencionadas para combatir la inflación es:",
            o: [
              "Aumentar los salarios de los empleados públicos.",
              "Implementar políticas monetarias y fiscales.",
              "Reducir los precios de los productos básicos.",
              "Disminuir la tasa de desempleo.",
              "Mantener el crecimiento económico a niveles elevados.",
            ],
            c: 1,
            ex: "El texto menciona específicamente la política monetaria y fiscal como herramientas que usan gobiernos y bancos centrales.",
          },
          {
            p: "¿Cuál es uno de los posibles efectos secundarios de las políticas antiinflacionarias?",
            o: [
              "Reducción de la inflación a largo plazo.",
              "Incremento de los ingresos de los consumidores.",
              "Aumento de la tasa de desempleo.",
              "Expansión del mercado financiero.",
              "Mejora en la balanza comercial.",
            ],
            c: 2,
            ex: "El texto advierte que esas medidas pueden generar 'desaceleración del crecimiento o aumento en la tasa de desempleo'.",
          },
          {
            p: "El control de la inflación es esencial para:",
            o: [
              "Aumentar la capacidad de ahorro de las empresas.",
              "Garantizar la estabilidad económica.",
              "Incrementar los niveles de endeudamiento público.",
              "Reducir la oferta de bienes y servicios.",
              "Mantener altos niveles de consumo.",
            ],
            c: 1,
            ex: "El texto concluye que el control de la inflación es crucial para mantener la estabilidad económica.",
          },
        ]}
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura 4: globalización
// ─────────────────────────────────────────────────────────────────────────────
function EscLectura4() {
  return (
    <EscenaRica>
      <Titulo>La globalización y las economías locales</Titulo>
      <LecturaQuiz
        numero={4}
        titulo="La globalización y sus efectos en las economías locales"
        texto={<>
          <p>La globalización ha permitido que los mercados de todo el mundo se interconecten,
          facilitando el comercio internacional y el flujo de inversiones. Sin embargo, a pesar de sus
          beneficios, también ha generado desafíos significativos para las economías locales,
          especialmente aquellas que dependen de la producción de bienes con bajo valor agregado.</p>
          <p>A medida que las grandes multinacionales se expanden y buscan reducir costos, muchas
          pequeñas y medianas empresas locales enfrentan dificultades para competir en precios y
          eficiencia. Esta situación ha llevado a la desaparición de ciertos sectores productivos en
          países en desarrollo, exacerbando problemas como el desempleo y la dependencia económica.</p>
          <p>Por otro lado, la globalización también ha abierto oportunidades, como el acceso a nuevos
          mercados y tecnologías, que pueden ser aprovechadas por economías locales para mejorar su
          competitividad. El desafío para los gobiernos es encontrar un equilibrio que permita a las
          economías locales integrarse al mercado global sin sacrificar su desarrollo interno.</p>
        </>}
        preguntas={[
          {
            p: "El texto trata principalmente sobre:",
            o: [
              "La expansión de las multinacionales en economías locales.",
              "Los efectos positivos y negativos de la globalización en las economías locales.",
              "El aumento del comercio internacional debido a la globalización.",
              "La desaparición de empresas locales por la falta de competitividad.",
              "La dependencia económica de los países en desarrollo.",
            ],
            c: 1,
            ex: "El texto aborda DOBLE perspectiva: tanto beneficios como desafíos de la globalización. Las otras opciones cubren solo una parte.",
          },
          {
            p: "Uno de los desafíos que enfrentan las pequeñas empresas locales debido a la globalización es:",
            o: [
              "El acceso a nuevas tecnologías.",
              "La pérdida de competitividad frente a multinacionales.",
              "La expansión de sus mercados.",
              "El incremento en los costos de producción.",
              "La mejora en la eficiencia productiva.",
            ],
            c: 1,
            ex: "El texto menciona que las PyMEs locales tienen dificultades para competir en precios y eficiencia frente a multinacionales.",
          },
          {
            p: "Uno de los beneficios de la globalización para las economías locales es:",
            o: [
              "La desaparición de sectores productivos.",
              "El acceso a nuevos mercados y tecnologías.",
              "El aumento de los precios locales.",
              "La reducción de la inversión extranjera.",
              "El incremento en las barreras comerciales.",
            ],
            c: 1,
            ex: "A pesar de los desafíos, el texto destaca que la globalización ofrece oportunidades como nuevos mercados y tecnologías.",
          },
          {
            p: "¿Cuál es uno de los problemas exacerbados por la globalización en las economías locales?",
            o: [
              "El incremento en los niveles de inversión extranjera.",
              "La desaparición de sectores productivos.",
              "La mejora en la competitividad de las empresas locales.",
              "El crecimiento del comercio internacional.",
              "La reducción en los niveles de desempleo.",
            ],
            c: 1,
            ex: "El texto dice que la globalización ha llevado a la desaparición de ciertos sectores productivos en países en desarrollo.",
          },
          {
            p: "El desafío principal para los gobiernos locales es:",
            o: [
              "Aumentar las barreras comerciales para proteger sus economías.",
              "Integrar las economías locales al mercado global sin sacrificar el desarrollo interno.",
              "Fomentar la expansión de las multinacionales.",
              "Reducir el comercio internacional para evitar competencia.",
              "Aumentar los aranceles a productos importados.",
            ],
            c: 1,
            ex: "El texto concluye que el principal desafío es encontrar ese equilibrio: integrarse sin sacrificar lo interno.",
          },
        ]}
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura 5: comercio electrónico
// ─────────────────────────────────────────────────────────────────────────────
function EscLectura5() {
  return (
    <EscenaRica>
      <Titulo>El comercio electrónico</Titulo>
      <LecturaQuiz
        numero={5}
        titulo="El comercio electrónico y su impacto en las economías emergentes"
        texto={<>
          <p>El comercio electrónico ha transformado la manera en que las empresas y los consumidores
          interactúan. En las economías emergentes, esta modalidad ha permitido a pequeños empresarios
          acceder a mercados más amplios, eliminando barreras geográficas y reduciendo costos de
          transacción. A pesar de estas ventajas, muchas empresas locales enfrentan dificultades para
          adaptarse a esta nueva realidad debido a la falta de infraestructura digital y la baja
          penetración de internet.</p>
          <p>Uno de los grandes retos para las economías emergentes es crear un entorno favorable para
          el desarrollo del comercio electrónico. Esto implica no solo mejorar el acceso a internet,
          sino también capacitar a las pequeñas empresas en el uso de herramientas digitales y
          garantizar la seguridad en las transacciones.</p>
          <p>Además, el comercio electrónico ha generado nuevas formas de competencia, donde las
          empresas locales deben competir no solo con otros negocios nacionales, sino también con
          gigantes internacionales que tienen mayor capacidad logística y financiera.</p>
        </>}
        preguntas={[
          {
            p: "El principal tema del texto es:",
            o: [
              "La competencia internacional en el comercio electrónico.",
              "La falta de infraestructura digital en economías emergentes.",
              "El impacto del comercio electrónico en las economías emergentes.",
              "Las nuevas formas de competencia generadas por el comercio digital.",
              "La expansión de los gigantes internacionales en el comercio electrónico.",
            ],
            c: 2,
            ex: "El texto analiza cómo el comercio electrónico ha transformado economías emergentes, sus beneficios y desafíos. Es el tema que une a los 3 párrafos.",
          },
          {
            p: "Una de las ventajas del comercio electrónico para pequeños empresarios es:",
            o: [
              "La falta de competencia internacional.",
              "El acceso a mercados más amplios.",
              "La reducción de la competencia nacional.",
              "El aumento en los costos de transacción.",
              "La ausencia de barreras geográficas.",
            ],
            c: 1,
            ex: "El texto dice que el e-commerce permite a pequeños empresarios acceder a mercados más amplios, eliminando barreras geográficas.",
          },
          {
            p: "Uno de los principales retos para el desarrollo del comercio electrónico es:",
            o: [
              "La falta de empresas interesadas en el comercio digital.",
              "La baja penetración de internet y la falta de infraestructura digital.",
              "La competencia desleal entre empresas locales.",
              "El alto costo de las herramientas digitales.",
              "El incremento de las barreras geográficas.",
            ],
            c: 1,
            ex: "El texto resalta que la baja penetración de internet y la falta de infraestructura son los mayores retos.",
          },
          {
            p: "Según el texto, una solución para apoyar a las pequeñas empresas es:",
            o: [
              "Reducir los impuestos a las grandes multinacionales.",
              "Crear un entorno digital seguro y capacitar en herramientas digitales.",
              "Limitar la competencia internacional en mercados locales.",
              "Aumentar los costos de las transacciones internacionales.",
              "Disminuir la inversión en infraestructura digital.",
            ],
            c: 1,
            ex: "El texto menciona la importancia de capacitar a las pequeñas empresas y garantizar la seguridad en las transacciones.",
          },
          {
            p: "¿Qué tipo de competencia genera el comercio electrónico en economías emergentes?",
            o: [
              "Solo entre empresas locales.",
              "Solo entre empresas nacionales.",
              "Entre empresas locales, nacionales e internacionales.",
              "Exclusivamente con empresas internacionales.",
              "Solo entre pequeñas y grandes empresas nacionales.",
            ],
            c: 2,
            ex: "El texto señala que las empresas locales compiten con negocios nacionales Y con gigantes internacionales.",
          },
        ]}
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura 6: Inversión Extranjera Directa (IED)
// ─────────────────────────────────────────────────────────────────────────────
function EscLectura6() {
  return (
    <EscenaRica>
      <Titulo>Inversión Extranjera Directa</Titulo>
      <LecturaQuiz
        numero={6}
        titulo="El papel de la Inversión Extranjera Directa en el desarrollo económico"
        texto={<>
          <p>La Inversión Extranjera Directa (IED) es un elemento crucial para el desarrollo económico,
          especialmente en países en desarrollo. A través de la IED, las empresas extranjeras invierten
          capital en sectores productivos del país receptor, lo que genera empleo, transferencias de
          tecnología y una mayor integración en los mercados internacionales.</p>
          <p>No obstante, la IED también puede traer consigo desafíos, como el riesgo de que las
          empresas extranjeras monopolicen ciertos sectores clave de la economía, desplazando a los
          actores locales. Además, los beneficios de la IED no siempre se distribuyen de manera
          equitativa entre la población, lo que puede aumentar la desigualdad económica.</p>
          <p>Para aprovechar plenamente los beneficios de la IED, los gobiernos deben implementar
          políticas que promuevan una inversión sostenible y equitativa, al tiempo que protegen a los
          sectores locales más vulnerables.</p>
        </>}
        preguntas={[
          {
            p: "El texto principal trata sobre:",
            o: [
              "Los desafíos y beneficios de la Inversión Extranjera Directa en países en desarrollo.",
              "La importancia de los monopolios extranjeros en la economía local.",
              "El impacto negativo de la IED en las economías desarrolladas.",
              "El papel de los gobiernos en limitar la inversión extranjera.",
              "La expansión de las empresas extranjeras en sectores clave.",
            ],
            c: 0,
            ex: "El texto aborda doble perspectiva: tanto beneficios (empleo, tecnología, integración) como desafíos (monopolización, desigualdad) de la IED.",
          },
          {
            p: "Uno de los beneficios de la IED mencionado es:",
            o: [
              "La reducción de la inversión local.",
              "El incremento en la desigualdad económica.",
              "La creación de empleo y la transferencia de tecnología.",
              "La eliminación de los actores locales.",
              "La reducción del crecimiento económico a largo plazo.",
            ],
            c: 2,
            ex: "El texto señala generación de empleo, transferencias de tecnología e integración en mercados internacionales como beneficios.",
          },
          {
            p: "Uno de los riesgos asociados a la IED es:",
            o: [
              "La reducción del empleo en sectores productivos.",
              "El aumento de la competitividad de las empresas locales.",
              "El monopolio de ciertos sectores por empresas extranjeras.",
              "El incremento en la exportación de productos locales.",
              "La mejora en la distribución equitativa de la riqueza.",
            ],
            c: 2,
            ex: "El texto menciona ese riesgo: que empresas extranjeras monopolicen sectores clave, desplazando a actores locales.",
          },
          {
            p: "Para aprovechar los beneficios de la IED, el texto sugiere que los gobiernos deben:",
            o: [
              "Limitar las inversiones extranjeras en sectores productivos.",
              "Fomentar una inversión sostenible y equitativa.",
              "Reducir la competencia en mercados internacionales.",
              "Eliminar los subsidios a las empresas locales.",
              "Permitir que las multinacionales dominen todos los sectores.",
            ],
            c: 1,
            ex: "El texto recomienda promover una IED sostenible y equitativa, protegiendo a los sectores vulnerables.",
          },
          {
            p: "¿Cuál es uno de los efectos negativos de la IED mal gestionada?",
            o: [
              "Incremento de la inversión local.",
              "Mejora en la transferencia de tecnología.",
              "Aumento en la desigualdad económica.",
              "Reducción en la creación de empleo.",
              "Disminución de la competitividad internacional.",
            ],
            c: 2,
            ex: "El texto señala que los beneficios no se distribuyen siempre equitativamente → puede aumentar la desigualdad.",
          },
        ]}
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura 7: impuestos progresivos
// ─────────────────────────────────────────────────────────────────────────────
function EscLectura7() {
  return (
    <EscenaRica>
      <Titulo>Impuestos progresivos y distribución de la riqueza</Titulo>
      <LecturaQuiz
        numero={7}
        titulo="Los impuestos progresivos y su papel en la distribución de la riqueza"
        texto={<>
          <p>Los impuestos progresivos son aquellos en los que la tasa impositiva aumenta conforme lo
          hacen los ingresos del contribuyente. Este tipo de impuestos busca reducir las desigualdades
          económicas al exigir una mayor contribución de quienes tienen mayores ingresos, lo que permite
          una redistribución más equitativa de la riqueza.</p>
          <p>Sin embargo, los impuestos progresivos también pueden desincentivar la inversión y el
          crecimiento económico, ya que las personas y empresas que enfrentan tasas impositivas más
          altas pueden optar por reducir sus actividades económicas. Para mitigar estos efectos, es
          necesario que las políticas fiscales se diseñen de manera que no obstaculicen el dinamismo
          económico.</p>
          <p>En resumen, aunque los impuestos progresivos pueden ser una herramienta eficaz para
          reducir la desigualdad, deben aplicarse con cautela para no afectar negativamente el
          crecimiento económico.</p>
        </>}
        preguntas={[
          {
            p: "El texto principal aborda:",
            o: [
              "La importancia de los impuestos indirectos en la economía.",
              "Los beneficios y desafíos de los impuestos progresivos en la redistribución de la riqueza.",
              "La reducción del gasto público mediante impuestos progresivos.",
              "La eliminación de las desigualdades a través de impuestos regresivos.",
              "El crecimiento económico generado por los impuestos progresivos.",
            ],
            c: 1,
            ex: "El texto discute tanto beneficios (reducir desigualdad) como desafíos (desincentivar inversión) de los impuestos progresivos.",
          },
          {
            p: "Uno de los principales objetivos de los impuestos progresivos es:",
            o: [
              "Incentivar la inversión extranjera.",
              "Redistribuir la riqueza de manera más equitativa.",
              "Reducir la recaudación del gobierno.",
              "Aumentar la desigualdad económica.",
              "Desincentivar el consumo de bienes y servicios.",
            ],
            c: 1,
            ex: "El texto lo dice: este tipo de impuestos busca reducir desigualdades exigiendo más a quienes ganan más → redistribución.",
          },
          {
            p: "Uno de los riesgos asociados con los impuestos progresivos es:",
            o: [
              "El aumento de la inversión privada.",
              "La reducción en las actividades económicas debido a mayores tasas impositivas.",
              "El incremento en la desigualdad económica.",
              "La disminución de la recaudación fiscal.",
              "La expansión del gasto público.",
            ],
            c: 1,
            ex: "El texto señala que personas y empresas con tasas altas pueden REDUCIR su actividad económica.",
          },
          {
            p: "Una solución para evitar los efectos negativos es:",
            o: [
              "Reducir las tasas impositivas para los más pobres.",
              "Diseñar políticas fiscales que no obstaculicen el crecimiento.",
              "Aumentar las tasas a empresas multinacionales.",
              "Incrementar los impuestos indirectos en lugar de los progresivos.",
              "Reducir los beneficios fiscales para pequeños empresarios.",
            ],
            c: 1,
            ex: "El texto recomienda diseñar políticas que no obstaculicen el dinamismo económico.",
          },
          {
            p: "Los impuestos progresivos son efectivos para reducir la desigualdad cuando:",
            o: [
              "Las tasas impositivas son las mismas para todos.",
              "La riqueza se redistribuye de manera equitativa.",
              "Se eliminan los impuestos indirectos.",
              "Las empresas disminuyen sus inversiones.",
              "El crecimiento económico se estanca.",
            ],
            c: 1,
            ex: "El texto plantea que la redistribución equitativa es clave para reducir desigualdad.",
          },
        ]}
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lectura 8: remesas
// ─────────────────────────────────────────────────────────────────────────────
function EscLectura8() {
  return (
    <EscenaRica>
      <Titulo>Remesas en economías en desarrollo</Titulo>
      <LecturaQuiz
        numero={8}
        titulo="El papel de las remesas en las economías en desarrollo"
        texto={<>
          <p>Las remesas enviadas por los trabajadores migrantes a sus países de origen han demostrado
          ser una fuente importante de ingresos para muchas economías en desarrollo. Estas
          transferencias de dinero no solo mejoran la calidad de vida de las familias receptoras, sino
          que también contribuyen al crecimiento económico al incrementar el consumo interno y financiar
          pequeños negocios.</p>
          <p>Sin embargo, el flujo de remesas también presenta desafíos. En algunos casos, puede
          generar una dependencia económica en las familias receptoras, reduciendo los incentivos para
          la creación de empleo local. Además, las fluctuaciones en las economías de los países
          receptores de migrantes pueden afectar negativamente el volumen de remesas.</p>
          <p>Para maximizar los beneficios de las remesas, es importante que los gobiernos implementen
          políticas que promuevan la inversión productiva de estos fondos, incentivando la creación de
          empleo y el desarrollo económico sostenible.</p>
        </>}
        preguntas={[
          {
            p: "El principal tema del texto es:",
            o: [
              "La importancia de las remesas en las economías desarrolladas.",
              "El impacto de las remesas en las economías en desarrollo.",
              "La dependencia económica creada por las remesas.",
              "La reducción de las remesas en tiempos de crisis económica.",
              "Las políticas fiscales que afectan el envío de remesas.",
            ],
            c: 1,
            ex: "El texto analiza el impacto en economías EN DESARROLLO (no desarrolladas), abordando beneficios y desafíos.",
          },
          {
            p: "Una de las principales contribuciones de las remesas es:",
            o: [
              "La reducción del consumo interno.",
              "El aumento de la dependencia económica.",
              "El incremento del consumo y la financiación de pequeños negocios.",
              "La eliminación de la inversión extranjera directa.",
              "La disminución del crecimiento económico.",
            ],
            c: 2,
            ex: "El texto dice que las remesas aumentan el consumo interno y financian pequeños negocios.",
          },
          {
            p: "Uno de los desafíos asociados con el flujo de remesas es:",
            o: [
              "La reducción del consumo familiar.",
              "La creación de empleo local.",
              "La dependencia económica de las familias receptoras.",
              "El aumento de la inversión extranjera.",
              "La mejora en la estabilidad económica.",
            ],
            c: 2,
            ex: "El texto advierte que las familias pueden depender de las remesas, lo que reduce los incentivos para crear empleo local.",
          },
          {
            p: "Una forma de maximizar los beneficios de las remesas es:",
            o: [
              "Reducir el volumen de remesas enviadas.",
              "Promover la inversión productiva en la creación de empleo.",
              "Incrementar la dependencia económica de las familias.",
              "Aumentar los aranceles sobre las remesas.",
              "Desincentivar el envío desde el exterior.",
            ],
            c: 1,
            ex: "El texto sugiere incentivar la inversión productiva de las remesas para crear empleo y desarrollo sostenible.",
          },
          {
            p: "¿Qué efecto pueden tener las fluctuaciones económicas en los países receptores de migrantes sobre las remesas?",
            o: [
              "Incremento del volumen de remesas.",
              "Reducción del flujo de remesas.",
              "Aumento de la inversión local.",
              "Mejora en la creación de empleo.",
              "Crecimiento en el consumo interno.",
            ],
            c: 1,
            ex: "El texto dice explícitamente que esas fluctuaciones pueden afectar NEGATIVAMENTE el volumen de remesas.",
          },
        ]}
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Resumen final con estrategia.
// ─────────────────────────────────────────────────────────────────────────────
function EscResumen() {
  return (
    <EscenaRica>
      <Titulo>Estrategia · qué llevarse al examen</Titulo>
      <Resumen>
        <strong>1.</strong> Identifica el <strong>tema central</strong> antes de mirar las preguntas.
        Casi siempre la pregunta 1 lo pide.<br /><br />
        <strong>2.</strong> Las opciones <em>verdaderas pero parciales</em> son la trampa más común: dicen
        algo cierto del texto pero NO son la idea principal. Busca la más COMPLETA.<br /><br />
        <strong>3.</strong> Si la pregunta dice <strong>"según el texto"</strong>, la respuesta tiene que
        estar literalmente o ser una inferencia muy directa. No agregues conocimiento externo.<br /><br />
        <strong>4.</strong> Si la pregunta dice <strong>"se puede deducir"</strong>, sí puedes inferir,
        pero la inferencia tiene que poder justificarse con el texto.<br /><br />
        <strong>5.</strong> Las opciones que dicen <em>lo contrario</em> de lo que afirma el texto son
        el segundo tipo de trampa (mismas palabras, sentido invertido).
      </Resumen>

      <Mnemotecnia>
        <strong>Acrónimo "RDPC", los 4 pasos en orden</strong>:<br />
        <strong>R</strong>ápida (¿de qué trata?) · <strong>D</strong>etallada (idea de cada párrafo) ·
        <strong> P</strong>regunta (subrayar palabras clave: "según el texto", "principalmente",
        "se deduce") · <strong>C</strong>ontrastar (volver al texto antes de marcar).
      </Mnemotecnia>

      <WorkedExample titulo="Estrategia aplicada · cómo descartar en 4 opciones plausibles">
        <strong>Pregunta tipo:</strong> "El texto trata fundamentalmente acerca de..."<br />
        <strong>Opciones:</strong><br />
        (a) La importancia de las tasas de interés en la economía global.<br />
        (b) El impacto de las políticas monetarias y fiscales en la estabilidad económica.<br />
        (c) Cómo las decisiones económicas de un país afectan a los mercados internacionales.<br />
        (d) La interrelación entre la inflación y las tasas de interés.<br />
        (e) El funcionamiento del mercado basado en la oferta y la demanda.<br /><br />

        <strong>Paso R (rápida):</strong> el texto habla del Estado interviniendo para corregir
        fallas del mercado. Eje: política monetaria/fiscal y estabilidad.<br /><br />

        <strong>Paso D (detallada):</strong><br />
        • Párrafo 1: introduce el rol del Estado y políticas.<br />
        • Párrafo 2: tasas de interés.<br />
        • Párrafo 3: inflación y bancos centrales.<br />
        • Párrafo 4: efectos globales.<br /><br />

        <strong>Paso P (pregunta):</strong> "fundamentalmente" = idea central, no detalle.<br /><br />

        <strong>Paso C (contrastar):</strong><br />
        • (a) tasas: solo párrafo 2 → PARCIAL. Descartada.<br />
        • (c) efectos globales: solo párrafo 4 → PARCIAL. Descartada.<br />
        • (d) inflación + tasas: solo párrafos 2 y 3 → PARCIAL. Descartada.<br />
        • (e) oferta y demanda: solo se menciona al inicio para contextualizar → PARCIAL.
        Descartada.<br />
        • (b) políticas monetarias y fiscales para estabilidad: <strong>articula TODO el
        texto</strong>. Es la más COMPLETA.<br /><br />

        <strong>Respuesta: (b)</strong>. La estrategia no fue "adivinar la mejor": fue eliminar
        las parciales aplicando el filtro "¿abarca todo el texto?".
      </WorkedExample>

      <PorQue>
        En el examen tendrás presión de tiempo. Pero perder 30 segundos releyendo el párrafo correcto
        antes de marcar te ahorra puntos. La velocidad sin precisión no sirve.
      </PorQue>
    </EscenaRica>
  );
}
