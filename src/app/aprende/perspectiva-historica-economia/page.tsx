"use client";

import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Introducción general a la ciencia económica"
      escenas={[
        { titulo: "Aristóteles · el origen", componente: Esc01 },
        { titulo: "Del Renacimiento al siglo XVIII", componente: Esc02 },
        { titulo: "Clásicos: Smith y Ricardo", componente: Esc03 },
        { titulo: "Perspectiva socialista (Marx, Lange)", componente: Esc04 },
        { titulo: "Síntesis neoclásica (Marshall)", componente: Esc05 },
        { titulo: "La sistematización de Robbins", componente: Esc06 },
        { titulo: "Comparación de las tres perspectivas", componente: Esc07 },
        { titulo: "Práctica final", componente: Esc08 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>Aristóteles y el origen del término</Titulo>
      <Parrafo>
        La palabra <strong>"economía"</strong> viene del griego <em>oikonomia</em>: de <em>oikos</em> (casa)
        y <em>nomos</em> (ley). Significa, literalmente, "el que administra una casa".
      </Parrafo>
      <Definicion termino="economía según Aristóteles">
        "La ciencia del abastecimiento, que trata del arte de la adquisición". Una rama del conocimiento
        que abarcaba sólo el campo de las comunidades familiares: producción y distribución en su forma
        más simple.
      </Definicion>
      <PorQue>
        A Aristóteles se lo considera el primer analista económico. En su época la economía era apenas
        la "administración de la comunidad doméstica" — muy lejos de la escala global de hoy.
      </PorQue>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Del Renacimiento al siglo XVIII</Titulo>
      <Parrafo>
        Desde la antigüedad hasta el Renacimiento las cuestiones económicas se ampliaron: propiedad
        territorial, servidumbre, tributos, corporaciones, mercados, comercio interregional, acuñación de
        moneda.
      </Parrafo>
      <Parrafo>
        Después del Renacimiento, con el surgimiento de los <strong>Estados-nación</strong> (Francia,
        Inglaterra, España, Portugal, Alemania) y el descubrimiento de América, los <strong>mercantilistas</strong>
        desligaron el análisis económico de la ética y lo orientaron a la administración del Estado.
      </Parrafo>
      <Resumen>
        La economía pasó de "administrar la casa" a <strong>"administrar el Estado"</strong>: un salto enorme
        en alcance, pero todavía no era una ciencia con leyes propias.
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Los clásicos: Smith y Quesnay</Titulo>
      <Parrafo>
        El siglo XVIII —la Edad de la Razón— fue la fase científica de la economía. Dos obras la fundaron:
      </Parrafo>
      <Ejemplo titulo="François Quesnay (1758)">
        <strong>Tableau Économique</strong>. Primer intento de describir el flujo de la economía como un
        sistema con leyes propias.
      </Ejemplo>
      <Ejemplo titulo="Adam Smith (1776)">
        <strong>La riqueza de las naciones</strong>. Funda la economía clásica. Su trilogía clave: <strong>
        producción, distribución y consumo</strong> de la riqueza.
      </Ejemplo>
      <Parrafo>
        Ricardo se coloca entre los clásicos y el socialismo: ya señalaba el binomio <em>producción-distribución
        </em> como núcleo del análisis.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Perspectiva socialista</Titulo>
      <Parrafo>
        En el siglo XIX, sumándose a los clásicos, aparece el enfoque <strong>socialista (Marx)</strong> y luego
        Lange la sintetiza:
      </Parrafo>
      <Resumen>
        <strong>1.</strong> Las necesidades humanas están condicionadas por el desarrollo histórico de la sociedad.<br />
        <strong>2.</strong> Para satisfacerlas el hombre <strong>produce</strong> (transforma la naturaleza, mediante trabajo).<br />
        <strong>3.</strong> La producción es un <strong>acto social</strong> (división del trabajo).<br />
        <strong>4.</strong> El proceso se completa con la <strong>distribución</strong> del producto social.<br />
        <strong>5.</strong> La economía estudia las <strong>leyes sociales</strong> que regulan producción y distribución.
      </Resumen>
      <PorQue>
        Marx ("Introducción a la Crítica de la Economía Política"): "La estructura de la distribución se
        determina por la estructura de la producción".
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Síntesis neoclásica: Alfred Marshall</Titulo>
      <Parrafo>
        En el paso del siglo XIX al XX, Marshall (Cambridge) publica sus <em>Principles of Economics</em>{" "}
        (1890), con una nueva línea conceptual:
      </Parrafo>
      <Resumen>
        <strong>1.</strong> Las necesidades y deseos humanos son <strong>innumerables y diversos</strong>.<br />
        <strong>2.</strong> El progreso cultural multiplica los servicios que la sociedad demanda.<br />
        <strong>3.</strong> La economía estudia la acción <strong>individual y social</strong> en la obtención y
        uso de los elementos materiales de bienestar.<br />
        <strong>4.</strong> Por un lado es un estudio de la <strong>riqueza</strong>; por otro, más importante,
        es un estudio del <strong>hombre</strong>.
      </Resumen>
      <Cuidado>
        Marshall desvía el centro de la trilogía clásica hacia conceptos más amplios: <strong>riqueza</strong>{" "}
        y <strong>bienestar social</strong>.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>La sistematización de Robbins</Titulo>
      <Parrafo>
        En 1932, Lionel Robbins publica <em>An Essay on the Nature and Significance of Economic Science</em>.
        Rompe con la trilogía clásica e identifica los 4 puntos del hecho económico:
      </Parrafo>
      <Resumen>
        <strong>1.</strong> La actividad humana persigue <strong>múltiples fines</strong>.<br />
        <strong>2.</strong> Esos fines tienen <strong>importancia diversa</strong> (orden de prioridad).<br />
        <strong>3.</strong> Los <strong>medios</strong> para alcanzarlos son <strong>limitados</strong>.<br />
        <strong>4.</strong> Esos medios tienen <strong>usos alternativos</strong>.
      </Resumen>
      <Definicion termino="hecho económico (Robbins)">
        Lo que une las 4 condiciones es la <strong>capacidad humana de elegir</strong>: la economía es la
        ciencia que estudia cómo la conducta humana elige entre fines posibles y medios escasos con usos
        alternativos.
      </Definicion>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <Titulo>Las tres perspectivas, en una mirada</Titulo>
      <Resumen>
        <strong>Neoclásica (Marshall):</strong> estudio de los hombres y su vida cotidiana. Foco en
        riqueza y bienestar.<br /><br />
        <strong>Socialista (Lange, Marx):</strong> las necesidades están culturalmente determinadas; la
        producción es un acto social y la distribución también. Estudia las leyes sociales que las regulan.<br /><br />
        <strong>Robbins:</strong> sociedades con objetivos múltiples e ilimitados pero medios insuficientes.
        La conducta económica consiste en <strong>elegir</strong>.
      </Resumen>
      <Parrafo>
        Las tres conviven hoy. La definición moderna de economía toma elementos de cada una: estudia
        cómo la sociedad <strong>elige</strong> entre fines alternativos cuando los <strong>recursos son
        escasos</strong>.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc08() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "El término 'economía' viene del griego oikonomia, que significa:", o: [
          "comerciar entre ciudades",
          "administrar una casa",
          "gobernar un imperio",
          "acumular riqueza",
        ], c: 1, ex: "Oikos = casa, nomos = ley. Aristóteles la define como administración doméstica." },
        { p: "La fase científica de la economía empieza en el siglo:", o: ["XV", "XVII", "XVIII", "XIX"], c: 2, ex: "Siglo XVIII (Edad de la Razón): Quesnay 1758, Smith 1776." },
        { p: "La trilogía clásica de la economía es:", o: [
          "trabajo, capital y tierra",
          "producción, distribución y consumo",
          "oferta, demanda y precio",
          "Estado, mercado y familia",
        ], c: 1, ex: "Trilogía clásica: producción, distribución y consumo de las riquezas." },
        { p: "Para la perspectiva socialista (Lange), la distribución…", o: [
          "es independiente de la producción",
          "depende de las relaciones de producción",
          "la decide el mercado libremente",
          "no es objeto de estudio económico",
        ], c: 1, ex: "Marx: 'la estructura de la distribución se determina por la estructura de la producción'." },
        { p: "Para Robbins, lo que define al hecho económico es:", o: [
          "la riqueza acumulada",
          "el dinero",
          "la elección entre fines y medios escasos",
          "el bienestar social",
        ], c: 2, ex: "Fines múltiples + medios limitados con usos alternativos → elección. Esa es la esencia." },
      ]} />
    </EscenaRica>
  );
}
