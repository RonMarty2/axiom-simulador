"use client";

import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="09"
      tituloUnidad="Silogismos como argumento lógico"
      escenas={[
        { titulo: "Qué es un silogismo", componente: EscIntro },
        { titulo: "Estructura · 3 partes", componente: EscEstructura },
        { titulo: "Los 3 tipos de silogismo", componente: EscTipos },
        { titulo: "Procedimiento para derivar la conclusión", componente: EscProcedimiento },
        { titulo: "Práctica A · 5 silogismos", componente: EscPA },
        { titulo: "Práctica B · 5 silogismos", componente: EscPB },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

// Visualizador de premisa-premisa-conclusión
function SilogismoVisual({
  pm, pn, c, color = LIENZO.ok,
}: { pm: string; pn: string; c: string; color?: string }) {
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={220}>
        <div style={{
          width: "100%", maxWidth: 480,
          fontFamily: "var(--font-crimson), serif",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            style={{
              padding: "10px 14px", borderLeft: `3px solid ${LIENZO.accent}`,
              background: LIENZO.bgSoft, borderRadius: 6,
            }}>
            <div style={{ fontSize: 10, letterSpacing: 1.4, color: LIENZO.accent, fontWeight: 700 }}>
              PREMISA MAYOR
            </div>
            <div style={{ fontSize: 15, color: LIENZO.fg, marginTop: 2 }}>{pm}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              padding: "10px 14px", borderLeft: `3px solid ${LIENZO.accent}`,
              background: LIENZO.bgSoft, borderRadius: 6,
            }}>
            <div style={{ fontSize: 10, letterSpacing: 1.4, color: LIENZO.accent, fontWeight: 700 }}>
              PREMISA MENOR
            </div>
            <div style={{ fontSize: 15, color: LIENZO.fg, marginTop: 2 }}>{pn}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.5 }}
            style={{
              padding: "10px 14px", border: `2px solid ${color}`, borderRadius: 6,
              background: `${color}10`,
            }}>
            <div style={{ fontSize: 10, letterSpacing: 1.4, color: color, fontWeight: 700 }}>
              ∴ CONCLUSIÓN
            </div>
            <div style={{ fontSize: 15, color: color, marginTop: 2, fontWeight: 600 }}>{c}</div>
          </motion.div>
        </div>
      </Pizarra>
    </div>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>El silogismo · razonamiento deductivo</Titulo>
      <Hook>
        El examen UMSS suele traer entre <strong>3 y 5 silogismos</strong> y combinaciones similares
        (analogías, secuencias). El que entiende la estructura los resuelve en 15 segundos. El que no,
        los adivina. Esta unidad enseña la estructura.
      </Hook>
      <Definicion termino="silogismo">
        Forma de <strong>razonamiento deductivo</strong> formalizado por Aristóteles. Consta de tres
        partes: <strong>dos premisas y una conclusión</strong> que se deriva necesariamente de ellas.
      </Definicion>
      <PorQue>
        Si las premisas son verdaderas, la conclusión también lo será: siempre que la estructura sea
        válida. Es la base de toda la lógica clásica y del pensamiento riguroso.
      </PorQue>
      <Conexion>
        Esta unidad conecta con razonamiento jurídico (los abogados aplican silogismos todo el tiempo:
        ley general + caso particular = veredicto), con la medicina (síntoma + diagnóstico = tratamiento)
        y con la programación (todo <code>if</code> es un silogismo hipotético).
      </Conexion>
    </EscenaRica>
  );
}

function EscEstructura() {
  return (
    <EscenaRica>
      <Titulo>La estructura clásica · 3 partes</Titulo>
      <Resumen>
        <strong>Premisa Mayor</strong>: afirmación general (con términos universales).<br /><br />
        <strong>Premisa Menor</strong>: afirmación particular (caso específico).<br /><br />
        <strong>Conclusión</strong>: se deriva lógicamente conectando ambas.
      </Resumen>
      <SilogismoVisual
        pm="Todos los humanos son mortales."
        pn="Sócrates es humano."
        c="Por lo tanto, Sócrates es mortal."
      />
      <PorQue>
        El silogismo opera con <strong>3 términos</strong>: el mayor (mortal), el menor (Sócrates) y el
        medio (humano) que los conecta. La premisa mayor relaciona el término medio con el mayor; la
        menor relaciona el término menor con el medio. La conclusión une el menor y el mayor.
      </PorQue>

      <WorkedExample titulo="Mapa de términos · el silogismo de Sócrates pieza por pieza">
        <strong>Premisa Mayor:</strong> <em>Todos los <u>humanos</u> son <u>mortales</u></em>.<br />
        • Término medio: <strong>humanos</strong> (aparece en ambas premisas).<br />
        • Término mayor: <strong>mortales</strong> (lo que se predica en la conclusión).<br /><br />

        <strong>Premisa Menor:</strong> <em><u>Sócrates</u> es <u>humano</u></em>.<br />
        • Término medio: <strong>humano</strong> (puente).<br />
        • Término menor: <strong>Sócrates</strong> (el sujeto de la conclusión).<br /><br />

        <strong>Conclusión:</strong> el término medio (humano) <strong>desaparece</strong> y
        quedan unidos los extremos:<br />
        <em>Sócrates (menor) → es mortal (mayor)</em>.<br /><br />

        <strong>Regla práctica:</strong> el término medio es como un puente que conecta dos islas
        (sujeto y predicado de la conclusión). Una vez que cruzaste, el puente desaparece de la
        conclusión.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscTipos() {
  return (
    <EscenaRica>
      <Titulo>Los 3 tipos</Titulo>
      <Resumen>
        <strong>1. Silogismo categórico</strong>: basado en categorías de objetos.<br />
        Forma: "Todos los X son Y. Z es X. Por tanto, Z es Y".
      </Resumen>
      <Ejemplo>
        Todos los mamíferos tienen corazón.<br />
        Los perros son mamíferos.<br />
        ∴ Los perros tienen corazón.
      </Ejemplo>
      <Resumen>
        <strong>2. Silogismo hipotético</strong>: basado en relaciones condicionales (si-entonces).<br />
        Forma: "Si A, entonces B. A. Por tanto, B".
      </Resumen>
      <Ejemplo>
        Si llueve, entonces la calle estará mojada.<br />
        Está lloviendo.<br />
        ∴ La calle está mojada.
      </Ejemplo>
      <Resumen>
        <strong>3. Silogismo disyuntivo</strong>: basado en alternativas excluyentes.<br />
        Forma: "O A o B. No A. Por tanto, B".
      </Resumen>
      <Ejemplo>
        O María viaja a España o viaja a Francia.<br />
        María no viaja a Francia.<br />
        ∴ María viaja a España.
      </Ejemplo>

      <Misconception titulo="Trampa del hipotético · afirmar el consecuente">
        Si A entonces B. <strong>B es verdadero</strong>. ∴ A. <strong>FALSO</strong>.<br />
        Ej: "Si llueve, la calle está mojada. La calle está mojada. ∴ llueve". NO. Pudo regarse, o
        haberse derretido hielo. <strong>Solo puedes concluir hacia adelante</strong> (de A a B), no
        hacia atrás (de B a A).
      </Misconception>

      <Misconception titulo="Trampa del hipotético · negar el antecedente">
        Si A entonces B. <strong>No A</strong>. ∴ no B. <strong>FALSO</strong>.<br />
        Ej: "Si estudio, apruebo. No estudié. ∴ no aprobé". NO necesariamente: pudo aprobar por
        suerte. Negar A no te dice nada sobre B.
      </Misconception>

      <Misconception titulo="Trampa del disyuntivo · 'o' inclusivo vs exclusivo">
        En lógica, "A o B" normalmente significa <strong>al menos uno</strong> (inclusivo). En el
        examen, lee el contexto: si dice "<em>o esto o lo otro</em>" en sentido excluyente, debe
        haber pista de exclusión. Si no, podrían cumplirse ambos a la vez.
      </Misconception>
    </EscenaRica>
  );
}

function EscProcedimiento() {
  return (
    <EscenaRica>
      <Titulo>Cómo derivar la conclusión</Titulo>
      <Resumen>
        <strong>1.</strong> Identifica el <strong>término medio</strong> (el que aparece en las dos
        premisas). Ej: en "Todos los humanos son mortales / Sócrates es humano", el término medio es
        "humano".<br /><br />
        <strong>2.</strong> Identifica los <strong>extremos</strong>: lo que conecta el término medio en
        la premisa mayor (mortal) y en la menor (Sócrates).<br /><br />
        <strong>3.</strong> La conclusión <strong>une los dos extremos</strong> a través del término
        medio: "Sócrates es mortal".<br /><br />
        <strong>4.</strong> Verifica que las opciones <strong>no agreguen ni quiten información</strong>{" "}
        más allá de lo que las premisas autorizan.
      </Resumen>
      <Cuidado>
        Falacia común: "Algunos A son B. Algunos B son C. Por tanto, algunos A son C". <strong>FALSO</strong>{" "}
        • el término medio (B) no garantiza el puente cuando es "algunos" en ambas premisas.
      </Cuidado>

      <Mnemotecnia>
        <strong>Acrónimo "TME → C"</strong> para resolver cualquier silogismo:<br />
        <strong>T</strong>érmino medio (lo identificas: aparece en las DOS premisas).<br />
        <strong>M</strong>ayor (lo que se predica universalmente).<br />
        <strong>E</strong>xtremos (sujeto particular).<br />
        <strong>C</strong>onclusión: une los dos extremos, el término medio desaparece.
      </Mnemotecnia>

      <CasoBolivia>
        Silogismo en el examen UMSS:<br />
        <strong>PM:</strong> Todos los postulantes que aprueban el examen ingresan a la UMSS.<br />
        <strong>Pm:</strong> Tú aprobaste el examen.<br />
        <strong>∴</strong> Tú ingresas a la UMSS.<br /><br />
        Identifica: término medio = "aprueba el examen", extremos = "tú" + "ingresa UMSS".
        La conclusión NO es "todos los que ingresan aprobaron" (eso sería invertir la premisa).
      </CasoBolivia>

      <WorkedExample titulo="Aplicar el procedimiento paso a paso">
        <strong>Silogismo:</strong><br />
        • Todos los gatos son felinos.<br />
        • Todos los felinos son carnívoros.<br />
        • ∴ ?<br /><br />

        <strong>Paso 1:</strong> ¿qué aparece en LAS DOS premisas? <em>Felinos</em>. Ese es el
        término medio.<br /><br />

        <strong>Paso 2:</strong> ¿qué quedan como extremos?<br />
        • En la PM: "gatos" (extremo izquierdo).<br />
        • En la Pm: "carnívoros" (extremo derecho).<br /><br />

        <strong>Paso 3:</strong> uní los extremos, el término medio desaparece:<br />
        <strong>∴ Todos los gatos son carnívoros.</strong><br /><br />

        <strong>Verifica:</strong> no agregaste info ("todos" estaba en las premisas), no invertiste
        ("gatos → carnívoros", no al revés), y el medio sí cumplió de puente.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPA() {
  return (
    <EscenaRica>
      <Titulo>Práctica A · 5 silogismos</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "Todos los animales son seres vivos. Un perro es un animal. ∴ ?",
          o: [
            "Un perro no es un ser vivo.",
            "Todos los perros son seres vivos.",
            "Algunos seres vivos no son animales.",
            "Todos los seres vivos son perros.",
            "Ningún ser vivo es un perro.",
          ],
          c: 1,
          ex: "Aplicando la regla: si todo animal es ser vivo y un perro es animal, todo perro es ser vivo. La opción b es la única válida.",
        },
        {
          p: "Todos los estudiantes de medicina realizan prácticas clínicas. María es estudiante de medicina. ∴ ?",
          o: [
            "María no realiza prácticas clínicas.",
            "Algunos estudiantes de medicina no realizan prácticas.",
            "María realiza prácticas clínicas.",
            "Todos los estudiantes realizan prácticas clínicas.",
            "Ningún estudiante de medicina hace prácticas.",
          ],
          c: 2,
          ex: "Silogismo categórico estándar. La conclusión une el caso particular (María) con la propiedad universal (realizar prácticas).",
        },
        {
          p: "Todos los mamíferos tienen corazón. Un gato es un mamífero. ∴ ?",
          o: [
            "Un gato no tiene corazón.",
            "Todos los gatos son mamíferos.",
            "Un gato tiene corazón.",
            "Ningún mamífero tiene corazón.",
            "Algunos mamíferos no tienen corazón.",
          ],
          c: 2,
          ex: "Universal aplicada al caso particular. 'Todos los gatos son mamíferos' es VERDADERO pero no es la conclusión del silogismo: es una premisa adicional.",
        },
        {
          p: "Todos los estudiantes de bachillerato deben presentar un proyecto final. Juan es estudiante de bachillerato. ∴ ?",
          o: [
            "Juan no debe presentar un proyecto final.",
            "Juan debe presentar un proyecto final.",
            "Ningún estudiante de bachillerato presenta proyectos.",
            "Todos los proyectos son de bachillerato.",
            "Algunos estudiantes no presentan proyectos.",
          ],
          c: 1,
          ex: "Conclusión que une el caso particular con la obligación universal.",
        },
        {
          p: "Todos los escritores de novelas son creativos. Pablo es escritor de novelas. ∴ ?",
          o: [
            "Pablo no es creativo.",
            "Algunos escritores no son creativos.",
            "Pablo es creativo.",
            "Ningún escritor es creativo.",
            "Todos los creativos son escritores.",
          ],
          c: 2,
          ex: "Cuidado con la opción e: 'Todos los creativos son escritores' invierte la dirección de la implicación. La premisa dice 'escritor → creativo', no al revés.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPB() {
  return (
    <EscenaRica>
      <Titulo>Práctica B · 5 silogismos</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "Todos los científicos realizan investigaciones. Ana es científica. ∴ ?",
          o: [
            "Ana no realiza investigaciones.",
            "Ana realiza investigaciones.",
            "Ningún científico realiza investigaciones.",
            "Todos los que investigan son científicos.",
            "Algunos científicos no realizan investigaciones.",
          ],
          c: 1,
          ex: "Estructura clásica. La opción d invertiría la dirección lógica.",
        },
        {
          p: "Todos los árboles producen oxígeno. Un roble es un árbol. ∴ ?",
          o: [
            "Un roble no produce oxígeno.",
            "Algunos árboles no producen oxígeno.",
            "Un roble produce oxígeno.",
            "Ningún árbol produce oxígeno.",
            "Todos los que producen oxígeno son robles.",
          ],
          c: 2,
          ex: "Misma estructura. La opción e invierte: produce oxígeno ⇏ es roble.",
        },
        {
          p: "Todos los deportistas requieren entrenamiento. Carla es deportista. ∴ ?",
          o: [
            "Carla no requiere entrenamiento.",
            "Todos los deportistas son entrenadores.",
            "Carla requiere entrenamiento.",
            "Ningún deportista requiere entrenamiento.",
            "Algunos deportistas no requieren entrenamiento.",
          ],
          c: 2,
          ex: "Caso particular + propiedad universal = conclusión particular.",
        },
        {
          p: "Todos los idiomas tienen gramática. El español es un idioma. ∴ ?",
          o: [
            "El español no tiene gramática.",
            "Algunos idiomas no tienen gramática.",
            "El español tiene gramática.",
            "Ningún idioma tiene gramática.",
            "Todos los que tienen gramática son idiomas.",
          ],
          c: 2,
          ex: "Estructura clásica.",
        },
        {
          p: "Todos los estudiantes de ciencias deben hacer prácticas de laboratorio. Laura es estudiante de ciencias. ∴ ?",
          o: [
            "Laura no debe hacer prácticas de laboratorio.",
            "Todos los estudiantes de ciencias hacen prácticas.",
            "Laura debe hacer prácticas de laboratorio.",
            "Ningún estudiante de ciencias hace prácticas.",
            "Algunos estudiantes de ciencias no hacen prácticas.",
          ],
          c: 2,
          ex: "Como ves, todos los silogismos categóricos clásicos siguen el mismo patrón: la conclusión aplica la propiedad universal al caso particular. Solo cambia el sustantivo.",
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
        <strong>1.</strong> Silogismo = Premisa Mayor + Premisa Menor + Conclusión.<br /><br />
        <strong>2.</strong> 3 tipos: <em>categórico</em> (categorías), <em>hipotético</em> (si-entonces),
        <em> disyuntivo</em> (alternativas).<br /><br />
        <strong>3.</strong> Identifica el término medio (aparece en las 2 premisas). La conclusión une
        los otros dos extremos.<br /><br />
        <strong>4.</strong> Cuidado con invertir la dirección: "todo A es B" NO implica "todo B es A".<br /><br />
        <strong>5.</strong> Si la conclusión incluye información NO contenida en las premisas, es
        inválida.
      </Resumen>

      <Mnemotecnia>
        <strong>"TME → C"</strong>: Término medio + extremos = conclusión. El medio aparece DOS
        veces en premisas y CERO en la conclusión. Si lo ves en la conclusión, la opción es trampa.
      </Mnemotecnia>

      <Misconception titulo="Las 3 trampas más comunes en el examen">
        <strong>(a)</strong> Invertir dirección: "todo A es B" ≠ "todo B es A".<br />
        <strong>(b)</strong> Afirmar el consecuente en hipotéticos: "si A entonces B; B; ∴ A" es
        FALSO.<br />
        <strong>(c)</strong> Conclusión con información extra: si la opción agrega datos que las
        premisas no mencionan, descártala: por más verdadera que suene.
      </Misconception>
    </EscenaRica>
  );
}
