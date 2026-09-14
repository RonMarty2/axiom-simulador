"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion,
  WorkedExample, MiniQuiz,
} from "../_components/pedagogia";

// Los 10 principios de Mankiw, exactos como aparecen en la guía oficial.
// Versión 2.0 con upgrade didáctico modular: cada principio tiene hook,
// caso boliviano cuando aplica, misconceptions atacadas, mnemotecnia,
// mini-quizzes intercalados y conexiones cruzadas con otras lecciones.

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Introducción general a la ciencia económica"
      escenas={[
        { titulo: "Cómo toman decisiones las personas (P1–P4)", componente: EscIntroA },
        { titulo: "Principio 1 · Disyuntivas", componente: P1 },
        { titulo: "Principio 2 · Costo de oportunidad", componente: P2 },
        { titulo: "Principio 3 · Pensamiento marginal", componente: P3 },
        { titulo: "Principio 4 · Responden a incentivos", componente: P4 },
        { titulo: "Cómo se interrelacionan (P5–P7)", componente: EscIntroB },
        { titulo: "Principio 5 · El comercio mejora", componente: P5 },
        { titulo: "Principio 6 · Los mercados organizan", componente: P6 },
        { titulo: "Principio 7 · El gobierno puede mejorar", componente: P7 },
        { titulo: "Cómo funciona la economía (P8–P10)", componente: EscIntroC },
        { titulo: "Principio 8 · Productividad", componente: P8 },
        { titulo: "Principio 9 · Inflación monetaria", componente: P9 },
        { titulo: "Principio 10 · Disyuntiva inflación/desempleo", componente: P10 },
        { titulo: "Mnemotecnia de los 10 · MUEY GLOMER", componente: EscMnemo },
        { titulo: "Práctica final", componente: EscPrac },
      ]}
    />
  );
}

function Tarjeta({ n, titulo, color = LIENZO.accent }: { n: number; titulo: string; color?: string }) {
  return (
    <div style={{
      width: "100%", maxWidth: 620,
      border: `2px solid ${color}`, borderRadius: 14,
      padding: "16px 18px", display: "flex", alignItems: "center", gap: 14,
      background: `${color}10`,
    }}>
      <div style={{
        flexShrink: 0, width: 48, height: 48, borderRadius: "50%",
        background: color, color: "#fff", fontSize: 22, fontWeight: 800,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-crimson), serif",
      }}>{n}</div>
      <div style={{
        fontSize: 18, fontWeight: 600, color: LIENZO.fg,
        fontFamily: "var(--font-crimson), serif", lineHeight: 1.25,
      }}>{titulo}</div>
    </div>
  );
}

function EscIntroA() {
  return (
    <EscenaRica>
      <Titulo>Los 10 principios de la economía</Titulo>
      <Hook>
        Imaginate que todo lo que vamos a estudiar en economía pudiera resumirse en{" "}
        <strong>10 frases sueltas</strong>, cortas y memorables. Esos son los 10 principios de Mankiw.
        Si los entiendes bien, ya piensas como economista.
      </Hook>
      <Parrafo>
        Mankiw los organizó en tres grandes bloques:
      </Parrafo>
      <Resumen>
        <strong>Cómo toman decisiones las personas</strong>: Principios 1 a 4 (decisiones
        individuales).<br /><br />
        <strong>Cómo se interrelacionan las personas</strong>: Principios 5 a 7 (mercados,
        comercio, rol del Estado).<br /><br />
        <strong>Cómo funciona la economía en conjunto</strong>: Principios 8 a 10 (productividad,
        inflación, desempleo a nivel país).
      </Resumen>
      <Conexion>
        En el examen UMSS suelen caer 1-2 preguntas directas sobre estos principios. Vale la pena
        memorizarlos.
      </Conexion>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P1 · Disyuntivas
// ═════════════════════════════════════════════════════════════════════════════
function P1() {
  return (
    <EscenaRica>
      <Tarjeta n={1} titulo="Las personas enfrentan disyuntivas" />
      <Hook>
        Tienes un sábado libre. Te invitan a una fiesta, también quieres estudiar para el examen del
        lunes, y tu papá te pidió que lo ayudes a pintar el cuarto. <strong>¿Las 3 cosas a la vez?</strong>{" "}
        No se puede. <em>Hay que elegir.</em>
      </Hook>
      <Parrafo>
        Toda decisión implica una <strong>disyuntiva</strong>: para obtener algo, tienes que renunciar
        a otra cosa que también querías.
      </Parrafo>
      <Definicion termino="eficiencia">
        La sociedad extrae el <strong>máximo beneficio</strong> de sus recursos escasos. <em>"El
        tamaño del pastel."</em>
      </Definicion>
      <Definicion termino="equidad">
        La sociedad <strong>distribuye igualitariamente</strong> esos beneficios.{" "}
        <em>"Cómo se reparte el pastel."</em>
      </Definicion>
      <Misconception>
        <strong>"Si una política es eficiente, también es justa."</strong> Falso. Suelen entrar en
        conflicto: redistribuir más equitativamente puede reducir el incentivo a trabajar duro y
        achicar el pastel total. Por eso los gobiernos siempre tienen que balancear las dos.
      </Misconception>
      <CasoBolivia>
        Bolivia destina recursos a defensa, a salud y a educación. <strong>Cada Boliviano gastado en
        un avión militar es un Boliviano menos para hospitales o universidades.</strong> Esa es la
        disyuntiva nacional clásica ("pan vs armas"). En el presupuesto 2024, salud llevó ~14% y
        defensa ~6%: esos números reflejan elecciones.
      </CasoBolivia>
      <MiniQuiz
        pregunta="Si el gobierno boliviano sube las jubilaciones pero recauda lo mismo, ¿qué pasa?"
        opciones={[
          "Nada, es plata extra que aparece sola.",
          "Hay que recortar otro gasto o endeudarse.",
          "Las jubilaciones no son una disyuntiva.",
        ]}
        correctaIdx={1}
        explicacion="Si el ingreso no cambia, dar más en un lado significa quitar en otro o pedir prestado. Esa es la lógica de las disyuntivas a nivel país."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P2 · Costo de oportunidad
// ═════════════════════════════════════════════════════════════════════════════
function P2() {
  return (
    <EscenaRica>
      <Tarjeta n={2} titulo="El costo de una cosa es aquello a lo que se renuncia para obtenerla" />
      <Hook>
        Vas a la universidad. ¿Cuánto te cuesta REALMENTE?<br /><br />
        ¿La matrícula? ¿Los libros? <strong>Eso es solo una parte.</strong>
      </Hook>
      <Definicion termino="costo de oportunidad">
        Es <strong>la mejor alternativa a la que renunciamos</strong> al tomar una decisión. No solo
        lo que pagamos: también lo que dejamos de ganar.
      </Definicion>
      <WorkedExample titulo="Estudiar 4 años en la UMSS o trabajar de mesero">
        <p style={{ margin: "0 0 8px" }}>
          <strong>Costos visibles del estudio:</strong>
        </p>
        <ul style={{ paddingLeft: 22, marginTop: 0, fontSize: 14 }}>
          <li>Matrícula y trámites: ~500 Bs/año × 4 = 2 000 Bs</li>
          <li>Libros, fotocopias, internet: ~2 400 Bs/año × 4 = 9 600 Bs</li>
          <li>Transporte: ~1 800 Bs/año × 4 = 7 200 Bs</li>
          <li><strong>Subtotal visible: ~18 800 Bs</strong></li>
        </ul>
        <p style={{ margin: "8px 0" }}>
          <strong>Costo de oportunidad (invisible pero ENORME):</strong>
        </p>
        <ul style={{ paddingLeft: 22, marginTop: 0, fontSize: 14 }}>
          <li>Salario que dejas de ganar: 2 500 Bs/mes × 12 × 4 = <strong>120 000 Bs</strong></li>
        </ul>
        <p style={{ marginTop: 8, marginBottom: 0 }}>
          <strong>Costo TOTAL de estudiar:</strong> ~138 800 Bs.<br />
          El costo de oportunidad es <strong>6 veces más</strong> que los gastos visibles. Por eso un
          deportista profesional o un youtuber exitoso enfrenta un costo de oportunidad gigantesco
          si decide estudiar.
        </p>
      </WorkedExample>
      <Misconception>
        <strong>"Si algo es gratis, no tiene costo."</strong> Falso. El curso "gratis" en YouTube
        igual te toma tiempo. Ese tiempo podrías estar trabajando, descansando o estudiando otra cosa.
        El costo de oportunidad existe aunque no haya plata de por medio.
      </Misconception>
      <Conexion>
        El costo de oportunidad va a reaparecer en la lección de <em>modelos económicos</em>, cuando
        veamos la frontera de posibilidades de producción (FPP).
      </Conexion>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P3 · Pensamiento marginal
// ═════════════════════════════════════════════════════════════════════════════
function P3() {
  return (
    <EscenaRica>
      <Tarjeta n={3} titulo="Las personas racionales piensan en términos marginales" />
      <Hook>
        ¿Por qué el agua, que es vital, es barata, y los diamantes, que no sirven para sobrevivir,
        son carísimos? <strong>La respuesta no es "porque sí".</strong>
      </Hook>
      <Definicion termino="cambio marginal">
        Un <strong>pequeño ajuste adicional</strong> a un plan que ya existe. "Margen" = "borde": los
        cambios son al borde de lo que ya hacemos.
      </Definicion>
      <Parrafo>
        Las decisiones no son blanco o negro. La pregunta NO es "estudiar o no estudiar" sino{" "}
        <strong>"estudiar UNA HORA MÁS o no"</strong>.
      </Parrafo>
      <Ejemplo titulo="La paradoja del agua y los diamantes">
        El beneficio marginal de UN VASO MÁS de agua, cuando ya tienes agua abundante, es casi cero.
        El beneficio marginal de UN diamante extra (porque son escasos) es alto.<br /><br />
        Por eso la gente paga mucho por un diamante y poco por un vaso de agua, aunque el agua sea
        100 veces más útil para vivir.
      </Ejemplo>
      <MiniQuiz
        pregunta="Trabajaste 8 horas y estas cansado. ¿Conviene quedarte una hora más?"
        opciones={[
          "Sí, siempre que el sueldo total siga subiendo.",
          "Sí, si el sueldo extra de esa hora supera el cansancio que te genera.",
          "No, porque ya trabajaste mucho.",
        ]}
        correctaIdx={1}
        explicacion="Esa es la regla marginal: comparar el beneficio extra (más sueldo) con el costo extra (más cansancio) de la hora ADICIONAL, no del día entero."
      />
      <Resumen>
        Un tomador de decisiones racional emprende una acción{" "}
        <strong>si y solo si el beneficio marginal supera al costo marginal</strong>. Esa regla es la
        base de toda microeconomía.
      </Resumen>
      <Mnemotecnia>
        Cuando dudes, preguntate: <strong>"¿la PRÓXIMA unidad vale la pena?"</strong> No mires el
        promedio, no mires el total. Mira el margen.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P4 · Incentivos
// ═════════════════════════════════════════════════════════════════════════════
function P4() {
  return (
    <EscenaRica>
      <Tarjeta n={4} titulo="Las personas responden a los incentivos" />
      <Hook>
        El gobierno sube el precio del cigarrillo. Mucha gente deja de fumar.<br />
        El gobierno baja el subsidio al diésel. Los camioneros protestan.<br />
        <strong>¿Casualidad? No.</strong> Las personas reaccionan a los precios.
      </Hook>
      <Definicion termino="incentivo">
        <strong>Algo que induce a las personas a actuar.</strong> Puede ser una recompensa o un
        castigo. Los precios son el incentivo más poderoso de todos.
      </Definicion>
      <Parrafo>
        Un economista famoso dijo: "Las personas responden a los incentivos, lo demás es irrelevante".
        Exagerado, pero captura una verdad central.
      </Parrafo>
      <CasoBolivia>
        <strong>Subsidio al diésel y gasolina (caso histórico):</strong> Bolivia mantiene subsidiados
        los combustibles desde hace décadas. El gobierno paga la diferencia entre el precio
        internacional y el que tú pagas en el surtidor. <br /><br />
        <strong>El incentivo perverso:</strong> como el diésel es barato adentro y caro afuera, hay
        contrabando masivo hacia Perú, Brasil y Chile. La gente responde a ese incentivo
        (diferencia de precio).<br /><br />
        Esto muestra que cuando un gobierno fija un precio sin pensar en los incentivos, aparecen
        mercados negros y comportamientos imprevistos.
      </CasoBolivia>
      <Misconception>
        <strong>"La gente actúa por sus valores, no por los incentivos."</strong> En parte sí, pero
        los incentivos pesan MUCHO más de lo que la gente reconoce. Ej: la gente ahorra más
        cuando sube la tasa de interés, no porque cambien sus valores, sino porque ahorrar paga mejor.
      </Misconception>
      <Cuidado>
        Las leyes y políticas siempre cambian incentivos. Si no se piensan bien, generan
        consecuencias no deseadas. Ej: la ley de cinturones de seguridad aumentó la supervivencia
        POR accidente, pero hizo que la gente condujera menos cuidadosamente.
      </Cuidado>
    </EscenaRica>
  );
}

function EscIntroB() {
  return (
    <EscenaRica>
      <Titulo>Bloque 2 · Cómo se interrelacionan las personas</Titulo>
      <Hook>
        Hasta acá vimos cómo decide UN individuo. Pero la economía es colectiva: millones de
        decisiones se cruzan en mercados, comercios, gobiernos. Los principios 5, 6 y 7 explican esa
        coordinación.
      </Hook>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P5 · Comercio mejora
// ═════════════════════════════════════════════════════════════════════════════
function P5() {
  return (
    <EscenaRica>
      <Tarjeta n={5} titulo="El comercio puede mejorar el bienestar de todos" />
      <Hook>
        Bolivia exporta gas y minerales. Importa autos, electrónica y maquinaria.<br />
        Si nos cerráramos al mundo, <strong>¿estaríamos mejor o peor?</strong>
      </Hook>
      <Parrafo>
        El comercio entre dos partes <strong>no es un juego de suma cero</strong>: ambos pueden
        ganar. Es la base de la especialización.
      </Parrafo>
      <Ejemplo>
        Una familia que se aislara debería cultivar su comida, tejer su ropa y construir su casa.
        Sería autosuficiente PERO mucho más pobre. Al comerciar, cada una se especializa en lo que
        hace mejor.
      </Ejemplo>
      <CasoBolivia>
        Bolivia tiene <strong>ventaja comparativa</strong> en gas natural (las reservas del Chaco) y
        en minerales (litio, plata, zinc). No tiene en electrónica. Por eso exporta lo primero e
        importa lo segundo. <br /><br />
        Si Bolivia intentara fabricar todos sus propios celulares y autos en vez de importarlos,
        serían 10 veces más caros y peor calidad. Mejor especializarse.
      </CasoBolivia>
      <Misconception>
        <strong>"Si un país exporta, gana, y si importa, pierde."</strong> Falso. Las importaciones
        son tan ganadoras como las exportaciones: nos permiten obtener lo que no producimos
        eficientemente. Sin importaciones, no habría celulares ni medicinas modernas en Bolivia.
      </Misconception>
      <Resumen>
        Países, como familias, ganan al comerciar. Pueden especializarse y disfrutar mayor variedad
        de bienes y servicios.
      </Resumen>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P6 · Mercados organizan
// ═════════════════════════════════════════════════════════════════════════════
function P6() {
  return (
    <EscenaRica>
      <Tarjeta n={6} titulo="Los mercados normalmente son un buen mecanismo para organizar la actividad económica" />
      <Hook>
        Hoy en La Cancha (Cochabamba), miles de vendedores y compradores se encuentran sin que
        NADIE les diga qué traer ni qué comprar. <strong>Y, aun así, funciona.</strong> ¿Cómo?
      </Hook>
      <Parrafo>
        Antes (URSS, Cuba, China pre-1980), el Estado decidía centralmente qué producir, cuánto, y
        para quién. <strong>Casi siempre fracasaba:</strong> faltaba pan en panaderías, sobraba en
        bodegas. Las economías de mercado, descentralizadas, dan mejores resultados.
      </Parrafo>
      <Definicion termino="mano invisible (Adam Smith, 1776)">
        Las familias y empresas, persiguiendo su <strong>interés personal</strong>, son guiadas como
        por una "mano invisible" a resultados deseables para todos. Los <strong>precios</strong> son
        el instrumento de esa mano.
      </Definicion>
      <Misconception>
        <strong>"Si todos persiguen su interés, el resultado es egoísta y caótico."</strong> No. La
        gran intuición de Smith es exactamente al revés: PRECISAMENTE porque cada uno busca su
        beneficio, los precios coordinan la producción y el consumo sin coordinador.
      </Misconception>
      <Cuidado>
        Cuando el gobierno impide que los precios se ajusten libremente (control de precios), la
        mano invisible no puede coordinar las decisiones. Ej: si el gobierno fija un precio bajo
        para el pan, las panaderías quiebran o desaparece el pan del mercado.
      </Cuidado>
      <MiniQuiz
        pregunta="¿Por qué los mercados libres tienden a funcionar mejor que la planificación central?"
        opciones={[
          "Porque los empresarios son más inteligentes que los burócratas.",
          "Porque los precios concentran la información de millones de personas y la transmiten.",
          "Porque el gobierno es siempre corrupto.",
        ]}
        correctaIdx={1}
        explicacion="Los precios son una 'señal' que captura la oferta, la demanda y los costos reales. Ningún burócrata individual puede saber todo eso simultáneamente."
      />
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P7 · Gobierno puede mejorar
// ═════════════════════════════════════════════════════════════════════════════
function P7() {
  return (
    <EscenaRica>
      <Tarjeta n={7} titulo="El gobierno puede mejorar algunas veces los resultados del mercado" />
      <Hook>
        Si los mercados funcionan tan bien, <strong>¿para qué necesitamos un gobierno?</strong> ¿Por
        qué no abolirlo?
      </Hook>
      <Parrafo>
        Porque la mano invisible NO sirve para todo. Hay 2 grandes razones para que el Estado
        intervenga:
      </Parrafo>
      <Resumen>
        <strong>1. Hacer cumplir reglas e instituciones</strong>: un campesino no siembra si le
        van a robar la cosecha. Sin policía, justicia y derechos de propiedad, NO hay mercado posible.<br /><br />
        <strong>2. Corregir fallas de mercado</strong>: promover eficiencia y equidad cuando el
        mercado solo no las logra.
      </Resumen>
      <Definicion termino="falla de mercado">
        Situación en la que el mercado por sí solo NO asigna eficientemente los recursos. Hay 2
        causas principales:<br /><br />
        • <strong>Externalidades</strong>: el impacto de las acciones de uno sobre el bienestar de
        otro (ejemplo clásico: contaminación).<br />
        • <strong>Poder de mercado</strong>: capacidad de una persona o empresa de influir
        indebidamente en los precios (monopolio).
      </Definicion>
      <CasoBolivia>
        <strong>SeMAPA (agua potable en Cochabamba)</strong> y <strong>SeLA (La Paz)</strong> son
        empresas públicas porque el agua potable es un caso de "monopolio natural": no tiene sentido
        que 5 empresas pongan caños paralelos en cada calle. El Estado provee el servicio para evitar
        un monopolio privado abusivo.<br /><br />
        Otra intervención típica: <strong>contaminación minera</strong>. Sin regulación estatal, las
        empresas mineras descargan residuos al río Pilcomayo (externalidad negativa). El Estado
        impone normas ambientales.
      </CasoBolivia>
      <Misconception>
        <strong>"Más gobierno = mejor economía"</strong> O <strong>"Cero gobierno = mejor economía"</strong>.
        Los dos extremos son falsos. El gobierno debe intervenir cuando hay falla de mercado y
        retirarse cuando los mercados funcionan bien. El difícil arte es identificar cuándo es cada
        caso.
      </Misconception>
    </EscenaRica>
  );
}

function EscIntroC() {
  return (
    <EscenaRica>
      <Titulo>Bloque 3 · Cómo funciona la economía en conjunto</Titulo>
      <Hook>
        Hasta acá hablamos de personas, empresas, mercados específicos. Los últimos 3 principios
        cambian de escala: hablan de fenómenos AGREGADOS como el nivel de vida de un país, la
        inflación y el desempleo.
      </Hook>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P8 · Productividad
// ═════════════════════════════════════════════════════════════════════════════
function P8() {
  return (
    <EscenaRica>
      <Tarjeta n={8} titulo="El nivel de vida de un país depende de su capacidad para producir bienes y servicios" />
      <Hook>
        Un trabajador en Estados Unidos gana en promedio 20 veces más que uno en Bolivia.<br />
        <strong>¿Por qué? ¿Trabajan 20 veces más horas?</strong> No. <strong>¿Son 20 veces más
        listos?</strong> Tampoco.
      </Hook>
      <Definicion termino="productividad">
        Cantidad de bienes y servicios producidos por cada <strong>hora trabajada</strong>. Es el
        determinante principal del nivel de vida de un país.
      </Definicion>
      <Parrafo>
        Si Bolivia quiere mejorar su nivel de vida, no alcanza con trabajar más horas. Hay que
        producir <strong>más por hora</strong>. Eso depende de:
      </Parrafo>
      <Resumen>
        • Capital físico (máquinas, infraestructura, computadoras).<br />
        • Capital humano (educación, salud, habilidades).<br />
        • Tecnología (mejores formas de producir).<br />
        • Recursos naturales (en algunos casos).
      </Resumen>
      <CasoBolivia>
        Bolivia tiene <strong>~9% del PIB sudamericano</strong> y una de las productividades más
        bajas de la región. Mejorar el nivel de vida boliviano de manera SUSTENTABLE no se logra
        regalando bonos: se logra <strong>aumentando la productividad</strong> (escuelas mejores,
        infraestructura, acceso a tecnología). Esa es la apuesta de largo plazo.
      </CasoBolivia>
      <Misconception>
        <strong>"Los países ricos son ricos porque tienen recursos naturales."</strong> Falso. Japón
        casi no tiene recursos y es muy rico. Venezuela tiene petróleo y está en crisis. Suiza no
        tiene mar ni petróleo y es uno de los países con mayor nivel de vida. Lo decisivo es la
        productividad, no los recursos.
      </Misconception>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P9 · Inflación monetaria
// ═════════════════════════════════════════════════════════════════════════════
function P9() {
  return (
    <EscenaRica>
      <Tarjeta n={9} titulo="Cuando el gobierno imprime demasiado dinero los precios se incrementan" color={LIENZO.bad} />
      <Hook>
        En 1985, una persona en La Paz iba a comprar pan a la panadería… y el precio había
        cambiado desde que salió de su casa. <strong>¿Por qué? Por la hiperinflación.</strong>
      </Hook>
      <Definicion termino="inflación">
        Incremento del <strong>nivel general de precios</strong> en la economía. Cuando es muy alta
        y rápida, se llama <em>hiperinflación</em>.
      </Definicion>
      <WorkedExample titulo="Hiperinflación boliviana 1984-1985: el caso clásico de A. Latina">
        <p style={{ margin: "0 0 8px" }}>
          <strong>El contexto:</strong> el gobierno enfrentaba déficit fiscal grande y NO podía
          recaudar más. Decidió cubrir el déficit <strong>imprimiendo más bolivianos</strong>.
        </p>
        <p style={{ margin: "0 0 8px" }}>
          <strong>El resultado:</strong>
        </p>
        <ul style={{ paddingLeft: 22, marginTop: 0, fontSize: 14 }}>
          <li>Inflación 1984: <strong>2 177%</strong></li>
          <li>Inflación 1985: <strong>~24 000%</strong> (mayor inflación documentada de América Latina)</li>
          <li>Un sueldo cobrado el lunes valía la mitad el viernes.</li>
          <li>La gente cambiaba bolivianos por dólares apenas los recibía.</li>
        </ul>
        <p style={{ margin: "8px 0 0" }}>
          <strong>La solución (1985):</strong> Decreto Supremo 21060 → corte radical de la emisión de
          dinero, ajuste fiscal. En meses, la inflación bajó a niveles manejables.
        </p>
        <p style={{ margin: "8px 0 0" }}>
          <strong>La lección:</strong> imprimir dinero NO crea riqueza, crea más billetes
          persiguiendo los mismos bienes. Resultado: precios suben proporcionalmente.
        </p>
      </WorkedExample>
      <Misconception>
        <strong>"La inflación pasa porque los empresarios son codiciosos."</strong> Mal. Si fuera por
        codicia, los precios habrían subido siempre. La inflación sostenida tiene causa monetaria:
        más dinero en circulación.
      </Misconception>
      <Conexion>
        El Banco Central de Bolivia hoy controla la cantidad de dinero precisamente para evitar
        repetir 1985. Vas a ver más sobre esto en macroeconomía.
      </Conexion>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// P10 · Disyuntiva CP inflación-desempleo
// ═════════════════════════════════════════════════════════════════════════════
function P10() {
  return (
    <EscenaRica>
      <Tarjeta n={10} titulo="La sociedad enfrenta a corto plazo una disyuntiva entre inflación y desempleo" color={LIENZO.warn} />
      <Hook>
        Si imprimir dinero genera inflación (P9), ¿por qué a veces los gobiernos lo hacen igual?
        <br /><strong>Porque a corto plazo, el dinero extra crea empleos.</strong>
      </Hook>
      <Parrafo>
        A <strong>largo plazo</strong>, más dinero = solo más precios (P9). A <strong>corto plazo</strong>{" "}
        el efecto es más complejo:
      </Parrafo>
      <Resumen>
        <strong>1.</strong> Más dinero → más gasto → más demanda de bienes.<br /><br />
        <strong>2.</strong> Antes de subir precios, las empresas producen MÁS y contratan a más
        gente.<br /><br />
        <strong>3.</strong> Más empleos = menos desempleo.<br /><br />
        <strong>4.</strong> Después, los precios suben y vuelve el problema.
      </Resumen>
      <Definicion termino="curva de Phillips">
        Relación inversa entre inflación y desempleo a corto plazo. Más inflación → menos desempleo,
        y al revés. Pero es una relación efímera, no dura para siempre.
      </Definicion>
      <Misconception>
        <strong>"Bajar el desempleo SIEMPRE es bueno."</strong> Si baja a costa de inflación
        descontrolada, el remedio es peor que la enfermedad. Por eso los bancos centrales priorizan
        controlar la inflación, aunque eso signifique tasas de desempleo moderadas.
      </Misconception>
      <Cuidado>
        Esta disyuntiva es SOLO de corto plazo. A largo plazo, una alta inflación NO baja el
        desempleo de manera sostenida: solo genera inflación. Por eso las políticas
        "antidesempleo" basadas solo en emitir dinero fracasan a la larga.
      </Cuidado>
    </EscenaRica>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MNEMOTECNIA · cómo recordar los 10 en orden
// ═════════════════════════════════════════════════════════════════════════════
function EscMnemo() {
  return (
    <EscenaRica>
      <Titulo>Mnemotecnia · cómo recordar los 10 principios</Titulo>
      <Mnemotecnia>
        Los principios se agrupan en 3 bloques. Recuerda cada bloque por su PALABRA CLAVE:
        <div style={{ marginTop: 14, padding: 14, background: "#fff", borderRadius: 10, border: `1px solid ${LIENZO.fgFaint}` }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: LIENZO.accent, marginBottom: 8 }}>
            Bloque 1 · DECIDIR (P1–P4)
          </div>
          <ul style={{ fontSize: 14, lineHeight: 1.7, paddingLeft: 20, margin: 0 }}>
            <li><strong>D</strong>isyuntivas (P1)</li>
            <li><strong>O</strong>portunidad costo (P2)</li>
            <li><strong>M</strong>arginal pensamiento (P3)</li>
            <li><strong>I</strong>ncentivos (P4)</li>
          </ul>

          <div style={{ fontSize: 16, fontWeight: 700, color: LIENZO.ok, marginTop: 14, marginBottom: 8 }}>
            Bloque 2 · INTERACTUAR (P5–P7)
          </div>
          <ul style={{ fontSize: 14, lineHeight: 1.7, paddingLeft: 20, margin: 0 }}>
            <li><strong>C</strong>omercio mejora (P5)</li>
            <li><strong>M</strong>ercados organizan (P6)</li>
            <li><strong>G</strong>obierno corrige fallas (P7)</li>
          </ul>

          <div style={{ fontSize: 16, fontWeight: 700, color: LIENZO.warn, marginTop: 14, marginBottom: 8 }}>
            Bloque 3 · PAÍS (P8–P10)
          </div>
          <ul style={{ fontSize: 14, lineHeight: 1.7, paddingLeft: 20, margin: 0 }}>
            <li><strong>P</strong>roductividad determina nivel de vida (P8)</li>
            <li><strong>I</strong>nflación si imprimes dinero (P9)</li>
            <li><strong>D</strong>esempleo vs inflación CP (P10)</li>
          </ul>
        </div>
      </Mnemotecnia>
      <Parrafo>
        Una mnemotecnia útil que junta los 3 bloques en una frase:<br />
        <strong>"Decidir · Interactuar · País"</strong>. 4 + 3 + 3 = 10 principios. Si recuerdas los 3
        verbos, puedes reconstruir el resto.
      </Parrafo>
    </EscenaRica>
  );
}

function EscPrac() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "El P1 (las personas enfrentan disyuntivas) implica que:", o: [
          "para obtener algo, hay que renunciar a otra cosa",
          "siempre hay opciones gratuitas",
          "la equidad siempre coincide con la eficiencia",
          "el gobierno decide por nosotros",
        ], c: 0, ex: "Tomar decisiones = elegir, y elegir = renunciar." },
        { p: "El costo de oportunidad de algo es:", o: [
          "su precio de mercado",
          "lo que se renuncia para obtenerlo",
          "lo que costó producirlo",
          "lo que vale para el comprador",
        ], c: 1, ex: "Es la mejor alternativa que se descarta. Incluye lo que dejas de ganar." },
        { p: "Una persona racional decide actuar si:", o: [
          "el beneficio total > costo total",
          "el beneficio marginal > costo marginal",
          "el promedio le conviene",
          "el gobierno lo recomienda",
        ], c: 1, ex: "Pensamiento marginal (P3): se compara en el margen, no en totales." },
        { p: "La 'mano invisible' de Smith dice que:", o: [
          "el gobierno guía la economía sin que se vea",
          "los precios coordinan decisiones descentralizadas",
          "los monopolios son buenos para todos",
          "el comercio internacional perjudica",
        ], c: 1, ex: "P6: los precios guían las decisiones individuales hacia resultados beneficiosos para el conjunto." },
        { p: "Una externalidad es:", o: [
          "un costo extra del Estado",
          "el impacto de las acciones de uno sobre otro",
          "una venta al exterior",
          "una decisión de la junta directiva",
        ], c: 1, ex: "P7: ejemplos clásicos son la contaminación o el ruido. El mercado no las internaliza solo." },
        { p: "El nivel de vida de un país depende sobre todo de:", o: [
          "su geografía", "su cultura", "su productividad", "sus exportaciones",
        ], c: 2, ex: "P8: productividad = bienes y servicios por hora trabajada." },
        { p: "Bolivia tuvo hiperinflación en 1985 porque:", o: [
          "los empresarios eran codiciosos",
          "el gobierno imprimió mucho dinero para cubrir déficit",
          "los precios internacionales subieron",
          "hubo sequía",
        ], c: 1, ex: "P9: el caso clásico latinoamericano. Imprimir dinero NO crea riqueza, crea inflación." },
        { p: "La disyuntiva inflación–desempleo opera:", o: [
          "siempre y para siempre",
          "a corto plazo",
          "a largo plazo",
          "solo en países pobres",
        ], c: 1, ex: "P10: es de corto plazo. A largo plazo, más dinero = solo más precios." },
      ]} />
    </EscenaRica>
  );
}
