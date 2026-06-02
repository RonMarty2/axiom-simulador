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
        { titulo: "Tres principios metodológicos", componente: Esc01 },
        { titulo: "Reconocimiento, inducción, deducción", componente: Esc02 },
        { titulo: "Qué es una ley económica", componente: Esc03 },
        { titulo: "Leyes hipotéticas y estadísticas", componente: Esc04 },
        { titulo: "Ceteris paribus", componente: Esc05 },
        { titulo: "Ejemplos: demanda y consumo", componente: Esc06 },
        { titulo: "Práctica final", componente: Esc07 },
      ]}
    />
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>Metodología: cómo construye la economía sus afirmaciones</Titulo>
      <Parrafo>
        Como toda ciencia, la economía emplea principios del conocimiento para juzgar la realidad
        objetivamente. La metodología descansa sobre <strong>tres pilares</strong>:
      </Parrafo>
      <Resumen>
        <strong>1. Reconocimiento</strong> — describir y clasificar los hechos reales.<br />
        <strong>2. Inducción</strong> — generalizar a partir de hechos particulares.<br />
        <strong>3. Deducción</strong> — extraer consecuencias a partir de principios o hipótesis.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Los tres procesos en detalle</Titulo>
      <Definicion termino="reconocimiento">
        Base de toda investigación científica. Conjunto de operaciones por las que los hechos reales se
        describen y clasifican adecuadamente.
      </Definicion>
      <Definicion termino="inducción">
        A partir de hechos observados, se formulan hipótesis sobre el comportamiento de la realidad. Es
        una generalización de la experiencia: del caso particular a la regla general.
      </Definicion>
      <Definicion termino="deducción">
        Proceso apriorístico: partiendo de aspectos conocidos, se elaboran hipótesis sobre aspectos
        desconocidos. Si las deducciones se prueban por la experiencia, son reales.
      </Definicion>
      <PorQue>
        La economía combina los tres: observa la realidad, induce regularidades, y deduce qué ocurriría
        bajo ciertas condiciones. Sus principios, teorías, leyes y modelos son <strong>representaciones
        simplificadas</strong> de una realidad compleja.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es una ley económica?</Titulo>
      <Parrafo>
        Las leyes económicas pertenecen al campo de las <strong>ciencias sociales</strong>. Su grado de
        certeza NO se compara con las leyes de las ciencias experimentales (física, química).
      </Parrafo>
      <Cuidado>
        Las ciencias experimentales pueden <strong>aislar factores en el laboratorio</strong>. La economía
        no: sus "agentes" son seres humanos, racionales, que pueden actuar voluntariamente y cambiar las
        condiciones sociales.
      </Cuidado>
      <Resumen>
        Las leyes económicas son <strong>cambiables en tiempo y espacio</strong>, no tienen un exacto
        grado de precisión. El laboratorio de la economía es la propia sociedad humana.
      </Resumen>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Leyes hipotéticas y estadísticas</Titulo>
      <Parrafo>
        Como señala Zamora, las leyes económicas son <strong>hipotéticas</strong> y <strong>estadísticas</strong>:
      </Parrafo>
      <Definicion termino="hipotéticas">
        Solo se demuestran si se cumplen las condiciones e hipótesis que se establecieron previamente
        para su formulación. La realidad funciona como predicen <em>cuando no intervienen causas
        perturbadoras</em>.
      </Definicion>
      <Definicion termino="estadísticas">
        Se refieren al resultado <strong>global de una infinidad de hechos elementales</strong>, diversos
        e independientes. La uniformidad surge del cálculo de probabilidades sobre muchas observaciones,
        no de un caso aislado.
      </Definicion>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>La condición ceteris paribus</Titulo>
      <Definicion termino="ceteris paribus">
        Expresión latina que significa: <strong>"si todos los demás factores se mantienen inalterados"</strong>.
        Es una condición subyacente al carácter esencial de las leyes económicas.
      </Definicion>
      <Parrafo>
        Las leyes económicas presuponen un conjunto de hipótesis simples. Se formulan teniendo en
        cuenta los factores principales que intervienen, dejando los demás como <strong>constantes</strong>.
      </Parrafo>
      <Cuidado>
        Cualquier alteración de los factores que se supusieron constantes puede cambiar la dirección y la
        intensidad de la ley formulada. Por eso, en la economía las leyes están <strong>siempre sujetas
        a ceteris paribus</strong>.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Dos ejemplos clásicos</Titulo>
      <Ejemplo titulo="Ley de la demanda">
        <strong>Ceteris paribus</strong>, cuando los precios bajan, las cantidades demandadas tienden a
        aumentar.<br />
        Función: <strong>C<sub>D</sub> = f(P)</strong> — relación funcional <em>decreciente</em>.
      </Ejemplo>
      <Ejemplo titulo="Función de consumo">
        <strong>Ceteris paribus</strong>, cuando el ingreso personal disponible se eleva, el consumo
        agregado también tiende a aumentar (aunque no en la misma proporción).<br />
        Función: <strong>C = f(Y)</strong> — relación funcional <em>creciente</em>.
      </Ejemplo>
      <PorQue>
        En ambos casos, la regla <em>solo se cumple</em> si los demás factores (ingreso, gustos,
        precios de sustitutos, expectativas) se mantienen iguales. Si cambian, la ley puede invertirse o
        debilitarse.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "Los tres principios metodológicos de la economía son:", o: [
          "observación, hipótesis y conclusión",
          "reconocimiento, inducción y deducción",
          "tesis, antítesis y síntesis",
          "premisa, evidencia y prueba",
        ], c: 1, ex: "Reconocimiento (describir), inducción (generalizar) y deducción (apriorística)." },
        { p: "Las leyes económicas se diferencian de las experimentales porque:", o: [
          "son más exactas",
          "no se pueden expresar como ecuaciones",
          "no se pueden aislar todos los factores",
          "se basan solo en intuición",
        ], c: 2, ex: "El laboratorio de la economía es la sociedad: no se puede controlar todo." },
        { p: "Una ley económica es 'estadística' porque:", o: [
          "se aplica a hechos individuales",
          "refleja el resultado global de muchos hechos",
          "usa software estadístico",
          "solo es válida para empresas",
        ], c: 1, ex: "Resulta de observaciones masivas que generan uniformidad probabilística." },
        { p: "La expresión 'ceteris paribus' significa:", o: [
          "todo cambia siempre",
          "los demás factores permanecen iguales",
          "se considera el largo plazo",
          "depende del sistema económico",
        ], c: 1, ex: "Si todo lo demás se mantiene constante. Condición clave de las leyes económicas." },
        { p: "La ley de la demanda dice que (ceteris paribus):", o: [
          "P sube → Q sube",
          "P sube → Q baja",
          "P y Q no se relacionan",
          "Q depende del consumo agregado",
        ], c: 1, ex: "Función decreciente CD = f(P): precio sube, cantidad demandada baja." },
      ]} />
    </EscenaRica>
  );
}
