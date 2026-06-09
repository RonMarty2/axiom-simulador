"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="08"
      tituloUnidad="Aseveraciones y cuantificadores"
      escenas={[
        { titulo: "Qué es una aseveración", componente: EscIntro },
        { titulo: "Cuantificadores · universal y existencial", componente: EscCuantificadores },
        { titulo: "Las 4 formas con diagrama de Venn", componente: EscVenn },
        { titulo: "Contradicción · invertir el cuantificador", componente: EscContradiccion },
        { titulo: "Implicación y coherencia", componente: EscImplicacion },
        { titulo: "Práctica · identificar contradicciones", componente: EscPCon },
        { titulo: "Práctica · clasificar cuantificadores", componente: EscPCu },
        { titulo: "Práctica · valor de verdad", componente: EscPV },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente interactivo: diagrama de Venn que muestra las 4 formas básicas.
// ─────────────────────────────────────────────────────────────────────────────
function DiagramaVenn4Formas() {
  const formas = [
    {
      titulo: "Todos los A son B (Universal afirmativa)",
      ej: "Todos los gatos son mamíferos",
      tipo: "incluido",
    },
    {
      titulo: "Ningún A es B (Universal negativa)",
      ej: "Ningún pez respira aire",
      tipo: "disjuntos",
    },
    {
      titulo: "Algunos A son B (Particular afirmativa)",
      ej: "Algunos estudiantes juegan al fútbol",
      tipo: "interseccion",
    },
    {
      titulo: "Algunos A no son B (Particular negativa)",
      ej: "Algunos pájaros no vuelan",
      tipo: "interseccion-fuera",
    },
  ];
  const [i, setI] = useState(0);
  const f = formas[i];
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 480 240"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* "Todos A son B" — A dentro de B */}
          {f.tipo === "incluido" && (
            <g>
              <motion.circle cx="220" cy="120" r="90"
                fill={LIENZO.ok} fillOpacity="0.15" stroke={LIENZO.ok} strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} />
              <text x="280" y="60" fontSize="16" fill={LIENZO.ok} fontWeight="600">B</text>
              <motion.circle cx="195" cy="135" r="50"
                fill={LIENZO.accent} fillOpacity="0.25" stroke={LIENZO.accent} strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
              <text x="195" y="138" textAnchor="middle" fontSize="16" fill={LIENZO.accent} fontWeight="600">A</text>
            </g>
          )}

          {/* "Ningún A es B" — disjuntos */}
          {f.tipo === "disjuntos" && (
            <g>
              <motion.circle cx="160" cy="120" r="60"
                fill={LIENZO.accent} fillOpacity="0.18" stroke={LIENZO.accent} strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} />
              <text x="160" y="124" textAnchor="middle" fontSize="18" fill={LIENZO.accent} fontWeight="600">A</text>
              <motion.circle cx="320" cy="120" r="60"
                fill={LIENZO.bad} fillOpacity="0.18" stroke={LIENZO.bad} strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
              <text x="320" y="124" textAnchor="middle" fontSize="18" fill={LIENZO.bad} fontWeight="600">B</text>
            </g>
          )}

          {/* "Algunos A son B" — intersección */}
          {(f.tipo === "interseccion" || f.tipo === "interseccion-fuera") && (
            <g>
              <motion.circle cx="190" cy="120" r="65"
                fill={LIENZO.accent} fillOpacity="0.18" stroke={LIENZO.accent} strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }} />
              <text x="135" y="124" textAnchor="middle" fontSize="18" fill={LIENZO.accent} fontWeight="600">A</text>
              <motion.circle cx="290" cy="120" r="65"
                fill={LIENZO.ok} fillOpacity="0.18" stroke={LIENZO.ok} strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 0.2 }} />
              <text x="345" y="124" textAnchor="middle" fontSize="18" fill={LIENZO.ok} fontWeight="600">B</text>
              {/* punto de "algunos" */}
              {f.tipo === "interseccion" && (
                <motion.circle cx="240" cy="120" r="6" fill={LIENZO.fg}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
              )}
              {f.tipo === "interseccion-fuera" && (
                <motion.circle cx="160" cy="120" r="6" fill={LIENZO.fg}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
              )}
            </g>
          )}

          {/* Etiqueta arriba */}
          <text x="240" y="30" textAnchor="middle" fontSize="13"
            fill={LIENZO.fgDim} fontWeight="600">{f.titulo}</text>
          <text x="240" y="220" textAnchor="middle" fontSize="12"
            fill={LIENZO.fg} fontStyle="italic">"{f.ej}"</text>
        </svg>
      </Pizarra>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        {formas.map((_, k) => (
          <button key={k} onClick={() => setI(k)}
            style={{
              padding: "6px 12px", fontSize: 12, borderRadius: 999, cursor: "pointer", fontWeight: 600,
              background: i === k ? LIENZO.accent : "transparent",
              color: i === k ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${i === k ? LIENZO.accent : LIENZO.fgFaint}`,
            }}>Forma {k + 1}</button>
        ))}
      </div>
    </div>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Aseveraciones · qué son y cómo se evalúan</Titulo>
      <Definicion termino="aseveración">
        Enunciado que establece una <strong>relación entre dos conceptos</strong>. Puede ser
        afirmativa ("El fuego es caliente") o negativa ("La luna no tiene luz propia"). Toda aseveración
        tiene un <strong>valor de verdad</strong> (verdadera o falsa).
      </Definicion>
      <Resumen>
        Estructura: <strong>Sujeto + Verbo + Predicado</strong>.<br />
        Ejemplo: <em>"El cielo (sujeto) es (verbo) azul (predicado)"</em>.
      </Resumen>
      <Parrafo>
        Las aseveraciones pueden expresar identidad ("el cuadrado es una figura geométrica"),
        cualidad ("el fuego es caliente"), existencia ("los unicornios no existen") o causalidad
        ("el sol calienta la Tierra").
      </Parrafo>

      <Hook>
        Esta unidad es la <strong>base de TODA la lógica</strong>: silogismos, falacias,
        razonamientos en derecho y matemática. En el examen UMSS aparecen pidiendo identificar
        contradicciones y clasificar cuantificadores. Aprender bien las 4 formas básicas te
        desbloquea un puñado de respuestas.
      </Hook>

      <Conexion>
        Esta lección conecta directamente con <em>Silogismos</em>: cada premisa silogística es una
        aseveración con un cuantificador. Si dominás las 4 formas (universal/particular ×
        afirmativa/negativa), entendés cualquier silogismo en segundos.
      </Conexion>
    </EscenaRica>
  );
}

function EscCuantificadores() {
  return (
    <EscenaRica>
      <Titulo>Cuantificadores · universal y existencial</Titulo>
      <Definicion termino="cuantificador">
        Expresión que determina el <strong>alcance</strong> de una aseveración: a cuántos elementos del
        conjunto se aplica.
      </Definicion>
      <Resumen>
        <strong>Cuantificador universal</strong> — se aplica a TODOS los elementos del conjunto.<br />
        Palabras: <em>todos, cada, ninguno</em>.<br />
        Ejemplo: "Todos los mamíferos respiran aire".<br /><br />
        <strong>Cuantificador existencial</strong> — se aplica a AL MENOS UNO del conjunto.<br />
        Palabras: <em>algún, algunos, existe, no todos</em>.<br />
        Ejemplo: "Algunos pájaros no vuelan".
      </Resumen>
      <PorQue>
        El cuantificador es crítico. "Todos los X son Y" y "Algunos X son Y" no son la misma frase: la
        primera es una afirmación universal; la segunda es solo existencial.
      </PorQue>

      <Mnemotecnia>
        <strong>"U vs E"</strong>: las palabras que activan cada cuantificador.<br />
        <strong>U</strong>niversal (TODOS) → "todo, cada, ninguno, jamás, siempre".<br />
        <strong>E</strong>xistencial (ALGUNO) → "algún, alguien, existe, no todos, al menos uno".<br /><br />
        Truco: <strong>"NINGÚN" es universal NEGATIVO</strong>, no existencial. Es la trampa más
        común del examen.
      </Mnemotecnia>

      <Misconception titulo="'Algunos' NO significa 'solo unos pocos'">
        En lógica, <strong>"algunos" = al menos uno</strong> (incluso todos). Si decís "algunos
        estudiantes aprobaron" y resulta que aprobaron TODOS, la frase sigue siendo verdadera. Es
        contraintuitivo respecto al uso cotidiano del español, pero es la definición lógica.
      </Misconception>
    </EscenaRica>
  );
}

function EscVenn() {
  return (
    <EscenaRica>
      <Titulo>Las 4 formas básicas con diagramas de Venn</Titulo>
      <Parrafo>
        Toda aseveración categórica tiene una de 4 formas. Tocá los botones para ver cada una
        representada visualmente:
      </Parrafo>
      <DiagramaVenn4Formas />
      <Resumen>
        <strong>Universal afirmativa</strong> (Todos A son B): A está dentro de B.<br /><br />
        <strong>Universal negativa</strong> (Ningún A es B): A y B no se tocan.<br /><br />
        <strong>Particular afirmativa</strong> (Algunos A son B): A y B se cruzan (hay zona común).<br /><br />
        <strong>Particular negativa</strong> (Algunos A no son B): hay elementos de A FUERA de B.
      </Resumen>
    </EscenaRica>
  );
}

function EscContradiccion() {
  return (
    <EscenaRica>
      <Titulo>Contradicción · cómo se invierte una aseveración</Titulo>
      <Definicion termino="contradicción">
        Dos aseveraciones son contradictorias si <strong>no pueden ser ambas verdaderas a la vez</strong>{" "}
        ni ambas falsas. Si una es verdadera, la otra es falsa necesariamente.
      </Definicion>
      <Resumen>
        <strong>Regla clave</strong>: para contradecir, hay que cambiar <em>tanto la cantidad como la
        cualidad</em>.<br /><br />
        • "Todos A son B" ⟷ "Algunos A NO son B"<br />
        • "Ningún A es B" ⟷ "Algunos A SÍ son B"
      </Resumen>
      <Ejemplo>
        Aseveración: <strong>"Todos los gatos son mamíferos"</strong> (universal afirmativa).<br />
        Contradicción: <strong>"Algunos gatos no son mamíferos"</strong> (particular negativa).<br /><br />
        Aseveración: <strong>"Ningún matemático es poeta"</strong> (universal negativa).<br />
        Contradicción: <strong>"Algunos matemáticos son poetas"</strong> (particular afirmativa).
      </Ejemplo>
      <Cuidado>
        Un error común es pensar que el opuesto de "Todos son" es "Ninguno es". <strong>NO</strong>: el
        opuesto correcto es "Algunos NO son". "Ninguno es" es la negación universal extrema, no la
        contradicción.
      </Cuidado>

      <Mnemotecnia>
        <strong>Regla de la "X"</strong> para encontrar la contradicción:<br />
        Cruzá CANTIDAD y CUALIDAD en aspa.<br /><br />
        Todos × <strong>NO</strong> → "Algunos NO" ↔ "Todos sí"<br />
        Ninguno × <strong>SÍ</strong> → "Algunos SÍ" ↔ "Ninguno"<br /><br />
        <strong>Recordá la X</strong>: las contradicciones se cruzan diagonalmente entre los 4
        cuadros (Universal-Sí, Universal-No, Particular-Sí, Particular-No).
      </Mnemotecnia>

      <WorkedExample titulo="Cuadro lógico clásico · todas las relaciones">
        Las 4 formas en un cuadrado:<br /><br />
        <strong>Esquinas superiores (universales):</strong><br />
        — A: "Todos los X son Y" (afirmativa).<br />
        — E: "Ningún X es Y" (negativa).<br /><br />

        <strong>Esquinas inferiores (particulares):</strong><br />
        — I: "Algunos X son Y" (afirmativa).<br />
        — O: "Algunos X no son Y" (negativa).<br /><br />

        <strong>Relaciones (las diagonales son las contradictorias):</strong><br />
        — A ⟷ O (cruz: "Todos son" vs "Algunos NO son").<br />
        — E ⟷ I (cruz: "Ninguno es" vs "Algunos SÍ son").<br /><br />

        <strong>Aplicación:</strong> aseveración "Todos los gatos cazan ratones".<br />
        Para refutarla, NO necesitás probar "ningún gato caza" — basta encontrar UN gato que NO
        cace (la contradictoria O).<br /><br />

        <strong>Esto se llama "contraejemplo"</strong> y es el método más usado en lógica y
        matemáticas para refutar afirmaciones universales.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscImplicacion() {
  return (
    <EscenaRica>
      <Titulo>Implicación y coherencia</Titulo>
      <Definicion termino="implicación">
        Una aseveración (premisa) <strong>implica</strong> otra (conclusión) cuando: si la primera es
        verdadera, la segunda también debe serlo. Forma: "Si... entonces...".
      </Definicion>
      <Ejemplo>
        Premisa: "Si estudias regularmente, entonces aprobarás el examen".<br />
        Conclusión: "Aprobarás el examen" (si la condición se cumple).
      </Ejemplo>
      <Definicion termino="coherencia">
        Un conjunto de aseveraciones es <strong>coherente</strong> si no se contradicen entre sí y pueden
        coexistir lógicamente.
      </Definicion>
      <Ejemplo>
        "Los perros son mamíferos" + "Todos los mamíferos tienen pulmones" → "Los perros tienen
        pulmones". Las 3 forman un sistema coherente.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscPCon() {
  return (
    <EscenaRica>
      <Titulo>Práctica · identificar la contradicción</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "Contradicción de: \"Todos los estudiantes son puntuales\".",
          o: [
            "Algunos estudiantes no son puntuales.",
            "Ningún estudiante es puntual.",
            "Todos los puntuales son estudiantes.",
            "Los estudiantes son tardíos.",
          ],
          c: 0,
          ex: "Universal afirmativa ⟷ Particular negativa. La contradicción cambia 'Todos son' por 'Algunos NO son'.",
        },
        {
          p: "Contradicción de: \"Ningún matemático es poeta\".",
          o: [
            "Todos los matemáticos son poetas.",
            "Algunos matemáticos son poetas.",
            "No hay poetas matemáticos.",
            "Algunos poetas no son matemáticos.",
          ],
          c: 1,
          ex: "Universal negativa ⟷ Particular afirmativa. 'Ninguno es' se contradice con 'Algunos SÍ son'.",
        },
        {
          p: "Contradicción de: \"Todas las plantas necesitan luz solar\".",
          o: [
            "Ninguna planta necesita luz solar.",
            "Todos los seres vivos necesitan luz solar.",
            "No todas las plantas necesitan luz solar.",
            "Algunas plantas necesitan luz solar.",
          ],
          c: 2,
          ex: "'No todas necesitan' = 'algunas no necesitan'. Es la contradicción correcta de una universal afirmativa.",
        },
        {
          p: "Contradicción de: \"Ningún atleta es vegetariano\".",
          o: [
            "Algunos atletas son vegetarianos.",
            "Algunos atletas no son vegetarianos.",
            "Todos los atletas son vegetarianos.",
            "Los vegetarianos no son atletas.",
          ],
          c: 0,
          ex: "Universal negativa contradice con particular afirmativa.",
        },
        {
          p: "Contradicción de: \"Todos los países tienen bandera\".",
          o: [
            "Ningún país tiene bandera.",
            "Algunos países tienen bandera.",
            "Algunos países no tienen bandera.",
            "Las banderas no son obligatorias.",
          ],
          c: 2,
          ex: "Universal afirmativa ⟷ particular negativa. Para que una universal afirmativa sea falsa, basta con UN solo caso que no la cumpla.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPCu() {
  return (
    <EscenaRica>
      <Titulo>Práctica · clasificar el cuantificador</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "\"Todos los mamíferos son vertebrados\". Tipo de cuantificador:",
          o: ["Universal afirmativo", "Universal negativo", "Existencial afirmativo", "Existencial negativo"],
          c: 0,
          ex: "'Todos los' = universal. Afirma una propiedad = afirmativo.",
        },
        {
          p: "\"Algunos libros contienen errores\".",
          o: ["Universal afirmativo", "Universal negativo", "Existencial afirmativo", "Existencial negativo"],
          c: 2,
          ex: "'Algunos' = existencial (al menos uno). Afirma propiedad = afirmativo.",
        },
        {
          p: "\"Ningún número impar es divisible entre 2\".",
          o: ["Universal afirmativo", "Universal negativo", "Existencial afirmativo", "Existencial negativo"],
          c: 1,
          ex: "'Ningún' = universal (sobre TODOS). Niega propiedad = negativo.",
        },
        {
          p: "\"No todos los estudiantes aprobaron el examen\".",
          o: ["Universal afirmativo", "Universal negativo", "Existencial afirmativo", "Existencial negativo"],
          c: 3,
          ex: "'No todos' = 'algunos no'. Existencial (al menos uno no aprobó) + negativo.",
        },
        {
          p: "\"Algunas aves no pueden volar\".",
          o: ["Universal afirmativo", "Universal negativo", "Existencial afirmativo", "Existencial negativo"],
          c: 3,
          ex: "'Algunas' = existencial. 'No pueden' = niega = negativo.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscPV() {
  return (
    <EscenaRica>
      <Titulo>Práctica · valor de verdad</Titulo>
      <Parrafo>
        Para cada aseveración, determiná si es verdadera (V) o falsa (F):
      </Parrafo>
      <PracticaFinal ejercicios={[
        {
          p: "\"Todos los mamíferos tienen pulmones\". → ¿V o F?",
          o: ["Verdadera", "Falsa"],
          c: 0,
          ex: "Verdadera: todos los mamíferos respiran con pulmones (incluso las ballenas, delfines). Su inversión 'Ningún mamífero tiene pulmones' sería falsa.",
        },
        {
          p: "\"Ningún avión es submarino\".",
          o: ["Verdadera", "Falsa"],
          c: 0,
          ex: "Verdadera: aviones y submarinos tienen funciones y medios completamente distintos. Su inversión 'Todos los aviones son submarinos' sería falsa.",
        },
        {
          p: "\"Todos los planetas del sistema solar orbitan alrededor del Sol\".",
          o: ["Verdadera", "Falsa"],
          c: 0,
          ex: "Verdadera por definición misma del sistema solar. Su inversión 'Ningún planeta del sistema solar orbita al Sol' sería falsa.",
        },
        {
          p: "\"Ninguna ballena es un pez\".",
          o: ["Verdadera", "Falsa"],
          c: 0,
          ex: "Verdadera: las ballenas son mamíferos marinos. Su inversión sería falsa.",
        },
        {
          p: "\"Algunos metales son conductores de electricidad\".",
          o: ["Verdadera", "Falsa"],
          c: 0,
          ex: "Verdadera (cobre, aluminio, oro). De hecho, casi todos lo son. La inversión 'Ningún metal es conductor' es falsa.",
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
        <strong>1.</strong> Toda aseveración categórica tiene una de 4 formas: Universal afirmativa,
        Universal negativa, Particular afirmativa, Particular negativa.<br /><br />
        <strong>2.</strong> Para visualizar usá diagramas de Venn: incluido, disjunto, intersección.<br /><br />
        <strong>3.</strong> La contradicción cruza CANTIDAD + CUALIDAD: "Todos son" ↔ "Algunos NO son"; "Ninguno es" ↔ "Algunos SÍ son".<br /><br />
        <strong>4.</strong> "Ninguno es" NO es contradicción de "Todos son" — es otra universal.<br /><br />
        <strong>5.</strong> Para que una universal afirmativa ("Todos son X") sea falsa, basta UN
        contraejemplo. No hace falta probar "ninguno".
      </Resumen>

      <Mnemotecnia>
        <strong>"A-E-I-O"</strong> · las 4 formas en orden tradicional:<br />
        <strong>A</strong>firma universal ("Todos son") · <strong>E</strong>xcluye universal
        ("Ninguno es") · <strong>I</strong>ncluye particular ("Algunos sí son") ·
        <strong> O</strong>mite particular ("Algunos no son").<br /><br />
        Las contradicciones cruzan: A ↔ O · E ↔ I.
      </Mnemotecnia>

      <Misconception titulo="Las 2 trampas más caras en el examen">
        <strong>(a)</strong> Confundir "ningún" (universal negativa) con "alguno no" (particular
        negativa). "Ningún gato vuela" ≠ "Algún gato no vuela".<br />
        <strong>(b)</strong> Pensar que para refutar "Todos son X" hay que probar "Ninguno es X".
        FALSO: basta UN contraejemplo. Las universales se derrumban con un solo caso.
      </Misconception>
    </EscenaRica>
  );
}
