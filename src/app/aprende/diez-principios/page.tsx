"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

// Los 10 principios de Mankiw, exactos como aparecen en la guía oficial.
// Cada escena = un principio. Visualización: tarjeta numerada grande.

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
      <Parrafo>
        La economía estudia cómo la sociedad administra sus <strong>recursos escasos</strong>. Mankiw
        organizó este estudio en <strong>10 principios fundamentales</strong> agrupados en tres bloques:
      </Parrafo>
      <Resumen>
        <strong>Cómo toman decisiones las personas</strong> — Principios 1 a 4.<br />
        <strong>Cómo se interrelacionan las personas</strong> — Principios 5 a 7.<br />
        <strong>Cómo funciona la economía en conjunto</strong> — Principios 8 a 10.
      </Resumen>
    </EscenaRica>
  );
}

function P1() {
  return (
    <EscenaRica>
      <Tarjeta n={1} titulo="Las personas enfrentan disyuntivas" />
      <Parrafo>
        Para obtener algo, en general hay que <strong>renunciar a algo</strong> que también nos gusta.
        Tomar decisiones significa elegir.
      </Parrafo>
      <Ejemplo>
        Un estudiante elige cómo distribuir su tiempo: cada hora de economía es una hora menos de
        matemáticas, siesta, gimnasio o trabajo.<br /><br />
        La sociedad enfrenta una disyuntiva entre <strong>"pan y armas"</strong> (consumo vs. defensa), o
        entre <strong>ambiente limpio e ingreso alto</strong>.
      </Ejemplo>
      <Definicion termino="eficiencia">
        La sociedad extrae el máximo beneficio de sus recursos escasos (el tamaño del pastel).
      </Definicion>
      <Definicion termino="equidad">
        La sociedad distribuye igualitariamente esos beneficios (cómo se reparte el pastel).
      </Definicion>
      <Cuidado>
        Eficiencia y equidad entran en conflicto: al redistribuir, se reduce el incentivo al esfuerzo y
        el pastel se hace más pequeño.
      </Cuidado>
    </EscenaRica>
  );
}

function P2() {
  return (
    <EscenaRica>
      <Tarjeta n={2} titulo="El costo de una cosa es aquello a lo que se renuncia para obtenerla" />
      <Definicion termino="costo de oportunidad">
        Es <strong>aquello a lo que renunciamos</strong> al tomar una decisión.
      </Definicion>
      <Ejemplo titulo="Asistir a la universidad">
        El costo no es solo la matrícula y los libros. El costo más alto es el <strong>tiempo</strong>:
        ese año no se puede trabajar ni ganar dinero. Por eso un deportista profesional, que dejaría de
        ganar millones, tiene un costo de oportunidad altísimo de estudiar.
      </Ejemplo>
    </EscenaRica>
  );
}

function P3() {
  return (
    <EscenaRica>
      <Tarjeta n={3} titulo="Las personas racionales piensan en términos marginales" />
      <Definicion termino="cambio marginal">
        Pequeño ajuste adicional a un plan que ya existía. "Margen" = "borde": los cambios son al borde
        de lo que ya hacemos.
      </Definicion>
      <Parrafo>
        Las decisiones no son blanco o negro. La pregunta no es "estudiar o no estudiar" sino "estudiar
        UNA HORA MÁS o no".
      </Parrafo>
      <Ejemplo titulo="Paradoja del agua y los diamantes">
        El agua es vital y barata. Los diamantes son innecesarios y caros. ¿Por qué? Porque el
        <strong> beneficio marginal</strong> de un vaso adicional de agua (que ya tenemos en abundancia) es
        casi cero. El beneficio marginal de un diamante extra (porque son escasos) es alto.
      </Ejemplo>
      <Resumen>
        Un tomador de decisiones racional emprende una acción <strong>si y sólo si el beneficio marginal
        supera al costo marginal</strong>.
      </Resumen>
    </EscenaRica>
  );
}

function P4() {
  return (
    <EscenaRica>
      <Tarjeta n={4} titulo="Las personas responden a los incentivos" />
      <Definicion termino="incentivo">
        Algo que induce a las personas a actuar. Puede ser una recompensa o un castigo.
      </Definicion>
      <Parrafo>
        Un economista dijo: "Las personas responden a los incentivos, lo demás es irrelevante".
      </Parrafo>
      <Ejemplo titulo="Impuesto a la gasolina">
        Un impuesto alto incentiva el uso de coches compactos, viajes compartidos, transporte público y
        vivir cerca del trabajo. Por eso en Europa los autos son más chicos que en EE.UU.
      </Ejemplo>
      <Cuidado>
        Cuando los políticos NO consideran los incentivos, producen resultados no deseados. Ej: la ley de
        cinturones de seguridad aumentó la supervivencia POR accidente, pero hizo que la gente
        condujera menos cuidadosamente.
      </Cuidado>
    </EscenaRica>
  );
}

function EscIntroB() {
  return (
    <EscenaRica>
      <Titulo>Cómo se interrelacionan las personas</Titulo>
      <Parrafo>
        Los principios 5, 6 y 7 explican cómo coordinamos nuestras decisiones individuales con el
        mercado y el rol del Estado.
      </Parrafo>
    </EscenaRica>
  );
}

function P5() {
  return (
    <EscenaRica>
      <Tarjeta n={5} titulo="El comercio puede mejorar el bienestar de todos" />
      <Parrafo>
        El comercio entre dos países <strong>no es un juego de suma cero</strong>: ambos pueden ganar.
      </Parrafo>
      <Ejemplo>
        Una familia que se aislara tendría que cultivar su propia comida, tejer su ropa y construir su
        casa. Al comerciar, cada una se <strong>especializa</strong> en lo que hace mejor y consigue
        más variedad a menor precio.
      </Ejemplo>
      <Resumen>
        Los países, como las familias, ganan al comerciar: pueden especializarse y disfrutar de más
        bienes y servicios.
      </Resumen>
    </EscenaRica>
  );
}

function P6() {
  return (
    <EscenaRica>
      <Tarjeta n={6} titulo="Los mercados normalmente son un buen mecanismo para organizar la actividad económica" />
      <Parrafo>
        La caída del comunismo (1980) mostró el fracaso de la planificación central. En una economía de
        mercado, millones de empresas y familias deciden de forma descentralizada — pero el resultado
        beneficia al conjunto.
      </Parrafo>
      <Definicion termino="mano invisible (Adam Smith, 1776)">
        Las familias y empresas, persiguiendo su interés personal, son guiadas como por una "mano
        invisible" a resultados deseables para todos. Los <strong>precios</strong> son el instrumento de
        esa mano.
      </Definicion>
      <Cuidado>
        Cuando el gobierno impide que los precios se ajusten libremente (control de precios), la mano
        invisible no puede coordinar las decisiones. Las economías centralizadas fallaron precisamente
        por eso: trataron de manejar la economía con esa "mano atada a la espalda".
      </Cuidado>
    </EscenaRica>
  );
}

function P7() {
  return (
    <EscenaRica>
      <Tarjeta n={7} titulo="El gobierno puede mejorar algunas veces los resultados del mercado" />
      <Parrafo>
        Si la mano invisible funciona, ¿para qué un gobierno? Por dos razones:
      </Parrafo>
      <Resumen>
        <strong>1. Hacer cumplir reglas e instituciones</strong> — un campesino no siembra si le robarán
        la cosecha. Necesitamos derechos de propiedad, policía y justicia.<br /><br />
        <strong>2. Corregir fallas de mercado</strong> — promover eficiencia y equidad cuando el mercado
        solo no las logra.
      </Resumen>
      <Definicion termino="falla de mercado">
        Situación en la que el mercado por sí solo no asigna eficientemente los recursos.
      </Definicion>
      <Ejemplo>
        • <strong>Externalidades</strong> — el impacto de las acciones de uno sobre el bienestar de otro
        (contaminación).<br />
        • <strong>Poder de mercado</strong> — la capacidad de una persona o grupo de influir
        indebidamente en los precios (monopolio).
      </Ejemplo>
    </EscenaRica>
  );
}

function EscIntroC() {
  return (
    <EscenaRica>
      <Titulo>Cómo funciona la economía en conjunto</Titulo>
      <Parrafo>
        Los últimos tres principios ya no hablan del comportamiento individual o de mercados específicos,
        sino de fenómenos <strong>agregados</strong>: nivel de vida, inflación, desempleo.
      </Parrafo>
    </EscenaRica>
  );
}

function P8() {
  return (
    <EscenaRica>
      <Tarjeta n={8} titulo="El nivel de vida de un país depende de su capacidad para producir bienes y servicios" />
      <Parrafo>
        Las grandes diferencias de nivel de vida entre países (y a lo largo del tiempo) se explican casi
        completamente por las diferencias en <strong>productividad</strong>.
      </Parrafo>
      <Definicion termino="productividad">
        Cantidad de bienes y servicios producidos por cada unidad de trabajo (por hora trabajada).
      </Definicion>
      <Resumen>
        Si la productividad es el principal determinante del nivel de vida, otras explicaciones
        (sindicatos, salario mínimo, suerte) tienen importancia secundaria. <strong>El verdadero héroe es
        el aumento de la productividad</strong>.
      </Resumen>
    </EscenaRica>
  );
}

function P9() {
  return (
    <EscenaRica>
      <Tarjeta n={9} titulo="Cuando el gobierno imprime demasiado dinero los precios se incrementan" color={LIENZO.bad} />
      <Definicion termino="inflación">
        Incremento del nivel general de los precios en la economía.
      </Definicion>
      <Ejemplo titulo="Hiperinflación alemana">
        En enero de 1921 un periódico costaba 30 centavos de marco. En noviembre de 1922, el mismo
        periódico costaba <strong>70 000 000 de marcos</strong>.
      </Ejemplo>
      <Resumen>
        Cuando el gobierno crea grandes cantidades de dinero, el valor del dinero cae y los precios
        suben. Mantener inflación baja es uno de los objetivos centrales de la política económica.
      </Resumen>
    </EscenaRica>
  );
}

function P10() {
  return (
    <EscenaRica>
      <Tarjeta n={10} titulo="La sociedad enfrenta a corto plazo una disyuntiva entre inflación y desempleo" color={LIENZO.warn} />
      <Parrafo>
        A largo plazo, más dinero = más precios. Pero a corto plazo el efecto es más complejo:
      </Parrafo>
      <Resumen>
        <strong>1.</strong> Un aumento del dinero estimula el gasto y la demanda.<br />
        <strong>2.</strong> Antes de subir precios, las empresas producen más y contratan más.<br />
        <strong>3.</strong> Más empleo = menos desempleo.
      </Resumen>
      <PorQue>
        Por eso, a corto plazo, hay una <strong>disyuntiva entre inflación y desempleo</strong>: las
        autoridades pueden, en cierto rango, elegir una combinación.
      </PorQue>
      <Cuidado>
        Esta disyuntiva es solo de corto plazo y juega un rol central en el análisis del <strong>ciclo
        económico</strong> (fluctuaciones irregulares de la actividad).
      </Cuidado>
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
        ], c: 1, ex: "Es la mejor alternativa que se descarta." },
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
        ], c: 1, ex: "P6: los precios guían las decisiones individuales hacia resultados beneficiosos." },
        { p: "Una externalidad es:", o: [
          "un costo extra del Estado",
          "el impacto de las acciones de uno sobre otro",
          "una venta al exterior",
          "una decisión de la junta directiva",
        ], c: 1, ex: "P7: ejemplos clásicos son la contaminación o el ruido." },
        { p: "El nivel de vida de un país depende sobre todo de:", o: [
          "su geografía", "su cultura", "su productividad", "sus exportaciones",
        ], c: 2, ex: "P8: productividad = bienes y servicios por unidad de trabajo." },
        { p: "La principal causa de la inflación es:", o: [
          "los sindicatos",
          "imprimir demasiado dinero",
          "la apertura comercial",
          "los impuestos altos",
        ], c: 1, ex: "P9: crear demasiado dinero hace caer su valor → precios suben." },
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
