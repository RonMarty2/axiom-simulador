"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, Misconception, Mnemotecnia, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="07"
      tituloUnidad="Analogías verbales"
      escenas={[
        { titulo: "Qué es una analogía", componente: EscIntro },
        { titulo: "Los 10 tipos de relación", componente: EscTipos },
        { titulo: "Procedimiento · 5 pasos", componente: EscProcedimiento },
        { titulo: "Ejemplo guiado · sol y estrella", componente: EscGuiado },
        { titulo: "Práctica A · 5 analogías", componente: EscPA },
        { titulo: "Práctica B · 5 analogías", componente: EscPB },
        { titulo: "Práctica C · 5 analogías", componente: EscPC },
        { titulo: "Práctica D · 5 analogías", componente: EscPD },
        { titulo: "Práctica E · 5 analogías", componente: EscPE },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

// Visualizador A : B :: C : D — muestra la relación con una flecha animada
function AnalogiaVisual({
  a, b, c, d, relacion,
}: { a: string; b: string; c: string; d: string; relacion: string }) {
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={160}>
        <svg width="100%" height="100%" viewBox="0 0 480 160"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Par A : B arriba */}
          <text x="100" y="50" textAnchor="middle" fontSize="22" fontWeight="600" fill={LIENZO.fg}>{a}</text>
          <motion.line
            x1="140" y1="48" x2="220" y2="48" stroke={LIENZO.accent} strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
          <polygon points="220,44 230,48 220,52" fill={LIENZO.accent} />
          <text x="180" y="36" textAnchor="middle" fontSize="11" fill={LIENZO.accent} fontWeight="600">{relacion}</text>
          <text x="270" y="50" textAnchor="middle" fontSize="22" fontWeight="600" fill={LIENZO.fg}>{b}</text>

          {/* "como" */}
          <text x="370" y="50" fontSize="14" fill={LIENZO.fgDim} fontStyle="italic">como</text>

          {/* Par C : D abajo */}
          <text x="100" y="115" textAnchor="middle" fontSize="22" fontWeight="600" fill={LIENZO.fg}>{c}</text>
          <motion.line
            x1="140" y1="113" x2="220" y2="113" stroke={LIENZO.ok} strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.3 }} />
          <polygon points="220,109 230,113 220,117" fill={LIENZO.ok} />
          <motion.text x="180" y="101" textAnchor="middle" fontSize="11" fill={LIENZO.ok} fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {relacion}
          </motion.text>
          <text x="270" y="115" textAnchor="middle" fontSize="22" fontWeight="600" fill={LIENZO.ok}>{d}</text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es una analogía verbal?</Titulo>
      <Definicion termino="analogía (RAE)">
        Relación de <strong>semejanza</strong> entre cosas distintas. En analogías verbales: identificar
        una <strong>relación entre dos palabras</strong> y encontrar otro par que mantenga la misma
        relación.
      </Definicion>
      <Parrafo>
        Ejemplo típico: <strong>"sol es a día como luna es a noche"</strong>. La relación entre sol y día
        (astro + momento del ciclo) es similar a la relación entre luna y noche.
      </Parrafo>
      <AnalogiaVisual a="sol" b="día" c="luna" d="noche" relacion="astro del momento" />
      <PorQue>
        Es uno de los ejercicios más usados para medir <strong>razonamiento inductivo</strong>: ver un
        patrón en un caso particular y trasladarlo a otro.
      </PorQue>

      <Hook>
        En el examen UMSS aparecen entre <strong>5 y 10 analogías</strong>. El truco: NO buscar
        "qué palabra suena parecida", sino <strong>nombrar la relación</strong> antes de mirar las
        opciones. Quien hace eso resuelve en 20 segundos; el resto adivina.
      </Hook>

      <Misconception titulo="Trampa común · 'me suena' no es relación">
        Muchos eligen la opción que "se relaciona temáticamente" con el par original. ERROR. Lo que
        importa es el <strong>TIPO</strong> de relación, no el tema. Si el par es <em>llave-abrir</em>
        (función), la respuesta DEBE ser función, no algo con cerraduras.
      </Misconception>
    </EscenaRica>
  );
}

function EscTipos() {
  return (
    <EscenaRica>
      <Titulo>10 tipos de relación analógica</Titulo>
      <Resumen>
        <strong>1. Sinonimia</strong>: palabras de significado equivalente.<br />
        <em>valiente : intrépido</em><br /><br />
        <strong>2. Antonimia</strong>: palabras de significado opuesto.<br />
        <em>día : noche</em><br /><br />
        <strong>3. Parte-todo (inclusión)</strong>: la primera es parte de la segunda.<br />
        <em>pétalo : flor</em><br /><br />
        <strong>4. Causa-efecto</strong>: la primera produce a la segunda.<br />
        <em>fuego : calor</em><br /><br />
        <strong>5. Función</strong>: la primera sirve para hacer la segunda.<br />
        <em>llave : abrir · cuchillo : cortar</em>
      </Resumen>
      <Resumen>
        <strong>6. Categoría o clasificación</strong>: la primera es un tipo de la segunda.<br />
        <em>manzana : fruta</em><br /><br />
        <strong>7. Característica o cualidad</strong>: la segunda describe a la primera.<br />
        <em>oro : brillante</em><br /><br />
        <strong>8. Secuencia</strong>: paso primero y paso siguiente de un proceso.<br />
        <em>siembra : cosecha</em><br /><br />
        <strong>9. Objeto-lugar</strong>: objeto y su ubicación habitual.<br />
        <em>libro : biblioteca</em><br /><br />
        <strong>10. Materia-producto</strong>: la primera es materia prima de la segunda.<br />
        <em>madera : mesa</em>
      </Resumen>
    </EscenaRica>
  );
}

function EscProcedimiento() {
  return (
    <EscenaRica>
      <Titulo>Procedimiento en 5 pasos</Titulo>
      <Resumen>
        <strong>1.</strong> Lee el par inicial e <strong>identifica la relación</strong>. Es la clave de
        todo. Ponele un nombre: "función", "causa-efecto", "categoría", etc.<br /><br />
        <strong>2.</strong> Si te cuesta, formulá una <strong>frase puente</strong>: "la llave SIRVE PARA
        abrir cosas", "el león VIVE EN la jungla". Esa frase la vas a aplicar a todas las opciones.<br /><br />
        <strong>3.</strong> Prueba la frase puente en cada opción. La que encaja exactamente es la
        respuesta.<br /><br />
        <strong>4.</strong> Descarta las que NO siguen la misma relación (aunque parezcan plausibles).<br /><br />
        <strong>5.</strong> Verifica: ¿el TIPO de relación es idéntico? No solo "ambas son cosas".
      </Resumen>

      <Mnemotecnia>
        <strong>Acrónimo "FPP-DV"</strong> · los 5 pasos:<br />
        <strong>F</strong>rase puente · <strong>P</strong>robar en opciones ·
        <strong> P</strong>recisar tipo · <strong>D</strong>escartar parecidas ·
        <strong> V</strong>erificar simetría.<br /><br />
        Atajo de bolsillo: <strong>"nombrá la relación con un verbo"</strong>. Si puedes decir
        "A <em>VERBO</em> B" (sirve para, produce, vive en, mide, es tipo de), tienes la frase
        puente.
      </Mnemotecnia>

      <WorkedExample titulo="Procedimiento aplicado · 'martillo es a clavo como…'">
        <strong>Pregunta:</strong> Martillo : clavo :: ?<br />
        Opciones: (a) sierra : madera, (b) tornillo : destornillador, (c) destornillador : tornillo,
        (d) cuchillo : pan, (e) hilo : aguja.<br /><br />

        <strong>Paso 1 · Relación:</strong> el martillo GOLPEA al clavo (función + objeto sobre el
        que actúa).<br /><br />

        <strong>Paso 2 · Frase puente:</strong> "<em>la herramienta X actúa sobre el objeto Y para
        fijarlo/transformarlo</em>".<br /><br />

        <strong>Paso 3-4 · Probar:</strong><br />
        (a) sierra-madera: la sierra CORTA madera. ¿Es lo mismo que martillo-clavo? La madera no
        se "fija", se corta. Similar pero no idéntico. Dudoso.<br />
        (b) tornillo-destornillador: INVERTIDA. El destornillador actúa sobre el tornillo, no al
        revés. Descartada.<br />
        (c) destornillador-tornillo: el destornillador HACE GIRAR al tornillo para fijarlo.
        <strong> MISMA estructura</strong> que martillo-clavo (herramienta + pieza que se fija).<br />
        (d) cuchillo-pan: corta, no fija. Como (a), similar pero no idéntico.<br />
        (e) hilo-aguja: ambos son herramientas de coser, no hay relación herramienta-objeto.
        Descartada.<br /><br />

        <strong>Paso 5 · Verificación:</strong> ¿(c) tiene la MISMA simetría que martillo-clavo?
        Sí: herramienta + pieza metálica que se fija en otro material por la acción de la
        herramienta. <strong>Respuesta: (c)</strong>.
      </WorkedExample>

      <Misconception titulo="Trampa · pares invertidos">
        Casi siempre hay una opción <strong>con el orden invertido</strong>: si el par es
        martillo:clavo (herramienta:pieza), una opción será clavo:martillo (pieza:herramienta).
        Parece correcta pero la DIRECCIÓN importa. Siempre chequeá el orden.
      </Misconception>
    </EscenaRica>
  );
}

function EscGuiado() {
  return (
    <EscenaRica>
      <Titulo>Ejemplo guiado · sol y estrella</Titulo>
      <Parrafo>
        Premisa: <strong>Sol : Estrella</strong>. Relación: el sol es un <strong>tipo de</strong> estrella
        (categoría).
      </Parrafo>
      <AnalogiaVisual a="sol" b="estrella" c="?" d="?" relacion="es un tipo de" />
      <PracticaFinal ejercicios={[{
        p: "¿Cuál mantiene la misma relación de categoría (tipo)?",
        o: [
          "Luna - Planeta",
          "Rosa - Flor",
          "Venus - Planeta",
          "Agua - Líquido",
        ],
        c: 2,
        ex: "Sol es UN TIPO de estrella. Venus es UN TIPO de planeta: misma relación de categoría dentro del campo astronómico. La luna NO es un planeta (a es falsa). Rosa-Flor sí es categoría, pero fuera del campo astronómico (b está bien gramaticalmente pero rompe el contexto). Agua-Líquido también es categoría, pero más débil.",
      }]} />
    </EscenaRica>
  );
}

function EscPA() {
  return (
    <EscenaRica>
      <Titulo>Práctica A · función y categoría</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "Estufa es a calor como…",
          o: ["linterna - luz", "libro - página", "cucharón - comida", "escuela - profesor", "reloj - hora"],
          c: 0,
          ex: "La estufa GENERA calor (función). La linterna GENERA luz. Misma relación de función productora.",
        },
        {
          p: "Cuchillo es a cortar como…",
          o: ["escoba - ordenar", "martillo - golpear", "plato - comida", "televisor - imagen", "carro - manejar"],
          c: 1,
          ex: "El cuchillo SIRVE PARA cortar. El martillo SIRVE PARA golpear. Función herramienta-acción.",
        },
        {
          p: "Médico es a hospital como…",
          o: ["maestro - escuela", "chef - receta", "escritor - libro", "fotógrafo - cámara", "arquitecto - planos"],
          c: 0,
          ex: "El médico TRABAJA EN el hospital. El maestro TRABAJA EN la escuela. Profesional-lugar de trabajo.",
        },
        {
          p: "Pez es a agua como…",
          o: ["ave - aire", "perro - comida", "gato - maulla", "león - selva", "tiburón - laguna"],
          c: 0,
          ex: "El pez VIVE EN el agua. El ave VIVE EN el aire (es su medio de movimiento natural). Animal-hábitat.",
        },
        {
          p: "Reloj es a tiempo como…",
          o: ["brújula - dirección", "termómetro - frío", "papel - lápiz", "carro - viaje", "lámpara - electricidad"],
          c: 0,
          ex: "El reloj MIDE tiempo. La brújula MIDE dirección. Instrumento-magnitud medida. Cuidado: termómetro NO mide 'frío', mide TEMPERATURA.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPB() {
  return (
    <EscenaRica>
      <Titulo>Práctica B · creador y producto, categoría, hábitat</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "Abeja es a panal como…",
          o: ["Flores - Polen", "Dromedario - Joroba", "Mariposa - Oruga", "Gusano - Oruga", "Araña - Telaraña"],
          c: 4,
          ex: "La abeja CONSTRUYE el panal donde vive. La araña CONSTRUYE la telaraña donde vive. Animal-construcción habitada.",
        },
        {
          p: "Pintor es a cuadro como…",
          o: ["Escritor - Libro", "Cocinero - Refrigerador", "Escultor - Mármol", "Poeta - Poema", "Fotógrafo - Cámara"],
          c: 3,
          ex: "El pintor CREA cuadros. El poeta CREA poemas. Creador-creación. Escritor-libro también funciona, pero poeta-poema es más directo (sin pasar por edición/publicación).",
        },
        {
          p: "Reloj es a tiempo como…",
          o: ["Termómetro - Calor", "Calendario - Mes", "Brújula - Dirección", "Cámara - Imagen", "Barómetro - Presión"],
          c: 4,
          ex: "El reloj MIDE el tiempo. El barómetro MIDE la presión. Instrumento-magnitud. Termómetro NO mide 'calor' sino temperatura.",
        },
        {
          p: "Gato es a felino como…",
          o: ["Perro - Mamífero", "Tiburón - Pez", "Gorrión - Ave", "Lagarto - Vertebrado", "Conejo - Roedor"],
          c: 2,
          ex: "El gato pertenece a la FAMILIA felinos. El gorrión pertenece a la FAMILIA aves. Misma escala taxonómica (familia/clase).",
        },
        {
          p: "Médico es a hospital como…",
          o: ["Profesor - Estudiante", "Piloto - Avión", "Mecánico - Taller", "Abogado - Gobierno", "Panadero - Pan"],
          c: 2,
          ex: "El médico TRABAJA EN el hospital. El mecánico TRABAJA EN el taller. Profesional-lugar de trabajo. Piloto-avión es vehículo, no lugar.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPC() {
  return (
    <EscenaRica>
      <Titulo>Práctica C · más analogías</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "Perro es a ladrido como…",
          o: ["Gato - Maullido", "Vaca - Risa", "León - Ronroneo", "Caballo - Cabalgar", "Ratón - Rugido"],
          c: 0,
          ex: "El perro EMITE ladridos (sonido característico). El gato EMITE maullidos. Animal-sonido propio.",
        },
        {
          p: "Fuego es a calor como…",
          o: ["Sol - Lluvia", "Agua - Frío", "Hielo - Frío", "Viento - Frío", "Lámpara - Corriente"],
          c: 2,
          ex: "El fuego GENERA calor. El hielo GENERA frío. Causa-efecto térmico.",
        },
        {
          p: "Inglés es a idioma como…",
          o: ["Matemáticas - números", "Historia - tiempo", "Química - elementos", "Música - flauta", "Literatura - palabras"],
          c: 4,
          ex: "El inglés ES UN TIPO de idioma. La literatura ES UN ÁREA basada en palabras. Aunque débil, es la más cercana a 'es una categoría que tiene X como elemento fundamental'.",
        },
        {
          p: "León es a jungla como…",
          o: ["Tiburón - océano", "Oso - cueva", "Caballo - establo", "Elefante - circo", "Pingüino - hielo"],
          c: 0,
          ex: "El león VIVE EN la jungla (hábitat NATURAL). El tiburón VIVE EN el océano (hábitat natural). Los demás son hábitats artificiales o impuestos.",
        },
        {
          p: "Árbol es a bosque como…",
          o: ["Estrella - galaxia", "Pez - agua", "Casa - ciudad", "Flor - rosas", "Libro - biblioteca"],
          c: 0,
          ex: "El árbol es PARTE de un bosque (conjunto de árboles). La estrella es PARTE de una galaxia (conjunto de estrellas). Misma relación parte-todo astronómica/natural.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPD() {
  return (
    <EscenaRica>
      <Titulo>Práctica D · completar las dos partes</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "(___) es a ruido como mudo es a (___)",
          o: ["Sonido - hablar", "Silencio - ruido", "Música - melodía", "Grito - calma", "Ruidos - paz"],
          c: 0,
          ex: "Silencio es ANTÓNIMO de ruido. Mudo es ANTÓNIMO de hablar. Pares opuestos en cada lado.",
        },
        {
          p: "(___) es a frío como ardiente es a (___)",
          o: ["Hielo - calor", "Calor - fuego", "Nieve - calor", "Sol - frío", "Ventoso - templado"],
          c: 0,
          ex: "El hielo PROVOCA frío. Lo ardiente PROVOCA calor. Causa-efecto térmico paralelo.",
        },
        {
          p: "(___) es a noche como brillante es a (___)",
          o: ["Oscuridad - día", "Lunático - día", "Estrellas - sol", "Nebuloso - mañana", "Soleado - nublado"],
          c: 0,
          ex: "La oscuridad ES CARACTERÍSTICA de la noche. Lo brillante ES CARACTERÍSTICA del día. Cualidad-momento.",
        },
        {
          p: "(___) es a húmedo como seco es a (___)",
          o: ["Mojado - sequedad", "Lluvia - viento", "Polvo - humedad", "Mar - empapado", "Desierto - agua"],
          c: 0,
          ex: "Mojado describe lo húmedo (sinónimo). Sequedad describe lo seco (sinónimo). Pares de sinonimia.",
        },
        {
          p: "(___) es a invierno como caluroso es a (___)",
          o: ["Verano - frío", "Primavera - otoño", "Frío - caliente", "Templado - clima", "Estación - clima"],
          c: 0,
          ex: "El verano se ASOCIA con calor (es lo opuesto a invierno). Caluroso se ASOCIA con frío como opuesto. Antónimos cruzados.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPE() {
  return (
    <EscenaRica>
      <Titulo>Práctica E · serie variada</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "Lluvia es a gota como nieve es a…",
          o: ["nevada", "granizo", "copo", "frío", "ninguno"],
          c: 2,
          ex: "La lluvia se compone de GOTAS. La nieve se compone de COPOS. Conjunto-unidad mínima.",
        },
        {
          p: "Libro es a página como película es a…",
          o: ["escena", "director", "guión", "actor", "ninguno"],
          c: 0,
          ex: "La página es UNIDAD de un libro. La escena es UNIDAD de una película. Parte-todo narrativo.",
        },
        {
          p: "Estrella es a galaxia como célula es a…",
          o: ["organismo", "tejido", "átomo", "molécula", "ninguno"],
          c: 1,
          ex: "La estrella es PARTE de una galaxia (nivel inmediatamente superior). La célula es PARTE de un tejido (nivel inmediato). Tejido > célula. Cuidado: organismo es nivel demasiado alto.",
        },
        {
          p: "Boca es a comer como ojos son a…",
          o: ["ver", "escuchar", "oler", "tocar", "ninguno"],
          c: 0,
          ex: "La boca SIRVE PARA comer. Los ojos SIRVEN PARA ver. Función sensorial-órgano.",
        },
        {
          p: "Pintura es a pincel como escultura es a…",
          o: ["cincel", "arcilla", "martillo", "herramienta", "ninguno"],
          c: 0,
          ex: "El pincel es la HERRAMIENTA de la pintura. El cincel es la HERRAMIENTA de la escultura. Arte-instrumento específico.",
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
        <strong>1.</strong> Antes de mirar las opciones, formulá la <strong>frase puente</strong> que une
        las dos primeras palabras: "A SIRVE PARA B", "A PRODUCE B", "A ES TIPO DE B".<br /><br />
        <strong>2.</strong> Aplica esa frase a cada opción. La que encaja exactamente es la respuesta.<br /><br />
        <strong>3.</strong> Atención a las trampas: hay opciones que parecen funcionar pero rompen el
        TIPO o el CAMPO de la relación.<br /><br />
        <strong>4.</strong> En las analogías de hábitat, preferí el hábitat NATURAL (jungla, océano) no
        el artificial (zoo, circo).<br /><br />
        <strong>5.</strong> Si dos opciones parecen igual de buenas, elige la más SIMÉTRICA: la que
        comparte el mismo campo semántico que el par original (astronomía, animales, profesiones, etc).
      </Resumen>

      <Misconception titulo="Las 3 trampas más comunes">
        <strong>(a)</strong> Misma palabra, distinto tipo de relación (parece familiar pero no
        sigue el patrón).<br />
        <strong>(b)</strong> Orden invertido (cambia la dirección del puente).<br />
        <strong>(c)</strong> Campo semántico distinto (los pares originales son astronómicos, la
        opción "buena" es animal: descarta).
      </Misconception>
    </EscenaRica>
  );
}
