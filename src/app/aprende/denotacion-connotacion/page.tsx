"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { LIENZO, Pizarra } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Denotación, connotación y homonimia"
      escenas={[
        { titulo: "Los 3 conceptos", componente: EscIntro },
        { titulo: "Denotación · el sentido literal", componente: EscDeno },
        { titulo: "Connotación · el sentido figurado", componente: EscConno },
        { titulo: "La palabra 'estrella' · ejemplo", componente: EscEstrella },
        { titulo: "Homonimia · misma palabra, otro significado", componente: EscHomo },
        { titulo: "Ejemplo guiado · la palabra 'pesado'", componente: EscPesado },
        { titulo: "Práctica 1 · expresiones figuradas (parte A)", componente: EscPracticaA },
        { titulo: "Práctica 2 · expresiones figuradas (parte B)", componente: EscPracticaB },
        { titulo: "Resumen", componente: EscResumen },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente interactivo: una palabra con DOS sentidos (literal y figurado).
// Al tocar, alterna entre los dos sentidos con una animación suave.
// ─────────────────────────────────────────────────────────────────────────────
function PalabraDuoSentido({
  palabra,
  literal,
  figurado,
  ejemploLiteral,
  ejemploFigurado,
}: {
  palabra: string;
  literal: string;
  figurado: string;
  ejemploLiteral: string;
  ejemploFigurado: string;
}) {
  const [modo, setModo] = useState<"lit" | "fig">("lit");
  const esLit = modo === "lit";
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={220} onClick={() => setModo(esLit ? "fig" : "lit")}>
        <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div className="font-crimson" style={{
            fontSize: "clamp(38px, 7vw, 56px)", fontWeight: 600,
            color: LIENZO.fg, marginBottom: 14,
          }}>
            "{palabra}"
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={modo}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{ padding: "0 10px" }}
            >
              <div style={{
                fontSize: 11, letterSpacing: 1.4,
                color: esLit ? LIENZO.ok : LIENZO.accent,
                fontWeight: 700, marginBottom: 4,
              }}>
                {esLit ? "DENOTATIVO · literal" : "CONNOTATIVO · figurado"}
              </div>
              <div style={{ fontSize: 16, color: LIENZO.fg, lineHeight: 1.4, marginBottom: 6 }}>
                {esLit ? literal : figurado}
              </div>
              <div style={{ fontSize: 13, color: LIENZO.fgDim, fontStyle: "italic" }}>
                Ej: {esLit ? ejemploLiteral : ejemploFigurado}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic", marginTop: 6 }}>
        Tocá la tarjeta para alternar entre los dos sentidos.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente interactivo: palabra HOMÓNIMA con varios significados.
// Click para alternar entre ellos.
// ─────────────────────────────────────────────────────────────────────────────
function PalabraHomonima({
  palabra,
  significados,
}: {
  palabra: string;
  significados: { titulo: string; texto: string; ejemplo: string }[];
}) {
  const [i, setI] = useState(0);
  const s = significados[i];
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={220} onClick={() => setI((v) => (v + 1) % significados.length)}>
        <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div className="font-crimson" style={{
            fontSize: "clamp(38px, 7vw, 56px)", fontWeight: 600,
            color: LIENZO.fg, marginBottom: 14,
          }}>
            "{palabra}"
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              style={{ padding: "0 10px" }}
            >
              <div style={{
                fontSize: 11, letterSpacing: 1.4, color: LIENZO.accent,
                fontWeight: 700, marginBottom: 4,
              }}>
                SIGNIFICADO {i + 1} DE {significados.length} · {s.titulo}
              </div>
              <div style={{ fontSize: 16, color: LIENZO.fg, lineHeight: 1.4, marginBottom: 6 }}>
                {s.texto}
              </div>
              <div style={{ fontSize: 13, color: LIENZO.fgDim, fontStyle: "italic" }}>
                Ej: {s.ejemplo}
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Indicadores */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            {significados.map((_, k) => (
              <div key={k} style={{
                width: 8, height: 8, borderRadius: "50%",
                background: k === i ? LIENZO.accent : LIENZO.fgFaint,
                transition: "all 0.2s",
              }} />
            ))}
          </div>
        </div>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic", marginTop: 6 }}>
        Tocá para ver los demás significados.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Escenas
// ─────────────────────────────────────────────────────────────────────────────

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Una palabra puede significar muchas cosas</Titulo>
      <Parrafo>
        El examen evalúa si distinguís bien tres maneras de entender una palabra. Las tres aparecen
        constantemente en cualquier texto:
      </Parrafo>
      <Resumen>
        <strong>1. Denotación</strong> — el significado <strong>literal</strong> de la palabra (el que está
        en el diccionario).<br /><br />
        <strong>2. Connotación</strong> — el significado <strong>figurado</strong> o emocional que tiene en
        un contexto particular.<br /><br />
        <strong>3. Homonimia</strong> — cuando la <strong>misma palabra</strong> tiene <strong>significados
        completamente distintos</strong> (no figurados — distintos).
      </Resumen>
      <PorQue>
        En el examen vas a ver preguntas donde una palabra aparenta tener un sentido obvio pero el
        contexto te pide otro. Saber distinguir estas tres dimensiones es lo que te salva.
      </PorQue>
    </EscenaRica>
  );
}

function EscDeno() {
  return (
    <EscenaRica>
      <Titulo>Denotación · el sentido literal</Titulo>
      <Definicion termino="denotación (RAE)">
        Es el significado <strong>literal y objetivo</strong> de una palabra, tal como se define en un
        diccionario. Interpretación directa, sin emociones ni interpretaciones subjetivas.
      </Definicion>
      <Ejemplo>
        La palabra <strong>"perro"</strong> denota un animal mamífero, doméstico, de la familia de los
        cánidos.<br /><br />
        La palabra <strong>"frío"</strong> denota una temperatura baja.<br /><br />
        La palabra <strong>"luz"</strong> denota la radiación electromagnética visible al ojo humano.
      </Ejemplo>
      <PorQue>
        El sentido denotativo es el que <strong>todos los hablantes comparten</strong>, sin importar su
        cultura, edad o contexto. Es el sentido "de diccionario".
      </PorQue>
    </EscenaRica>
  );
}

function EscConno() {
  return (
    <EscenaRica>
      <Titulo>Connotación · el sentido figurado</Titulo>
      <Definicion termino="connotación (RAE)">
        Significados <strong>subjetivos o emocionales</strong> que una palabra adquiere más allá de su
        significado literal. Depende del contexto cultural, social o personal.
      </Definicion>
      <Ejemplo>
        <strong>"Perro"</strong> denota un animal, pero <em>connota</em> fidelidad ("es perro fiel"), o
        bien insulto ("no seas perro").<br /><br />
        <strong>"Frío"</strong> denota baja temperatura, pero <em>connota</em> indiferencia emocional ("me
        trató con frialdad").<br /><br />
        <strong>"Luz"</strong> denota radiación visible, pero <em>connota</em> inteligencia o esperanza
        ("una luz al final del túnel").
      </Ejemplo>
      <Cuidado>
        La connotación <strong>depende del contexto</strong>. Una misma palabra puede tener connotación
        positiva en una frase y negativa en otra. Por eso siempre hay que leer la oración entera.
      </Cuidado>
    </EscenaRica>
  );
}

function EscEstrella() {
  return (
    <EscenaRica>
      <Titulo>Probalo · la palabra "estrella"</Titulo>
      <Parrafo>
        Mirá cómo la misma palabra cambia de sentido según el contexto. Tocá la tarjeta para alternar
        entre los dos significados:
      </Parrafo>
      <PalabraDuoSentido
        palabra="estrella"
        literal="Cuerpo celeste que brilla en el cielo nocturno con luz propia."
        figurado="Persona famosa, sobresaliente o exitosa en su ámbito."
        ejemploLiteral="Anoche se veía una estrella muy brillante al sur."
        ejemploFigurado="Messi es una estrella del fútbol mundial."
      />
      <Resumen>
        Ambos usos son válidos. El primero es <strong>denotativo</strong> (literal, científico). El
        segundo es <strong>connotativo</strong> (figurado, basado en una metáfora: "brilla como una
        estrella").
      </Resumen>
    </EscenaRica>
  );
}

function EscHomo() {
  return (
    <EscenaRica>
      <Titulo>Homonimia · misma palabra, distinto significado</Titulo>
      <Definicion termino="homonimia (RAE)">
        Ocurre cuando dos palabras se <strong>pronuncian o escriben igual</strong> pero tienen{" "}
        <strong>significados completamente diferentes</strong>. NO son figurados — son significados
        distintos que comparten la misma forma.
      </Definicion>
      <Parrafo>
        El ejemplo clásico es "banco". Tocá la tarjeta para ver sus distintos significados:
      </Parrafo>
      <PalabraHomonima
        palabra="banco"
        significados={[
          {
            titulo: "Institución",
            texto: "Entidad financiera donde se deposita o presta dinero.",
            ejemplo: "Fui al banco a sacar plata.",
          },
          {
            titulo: "Mueble",
            texto: "Asiento alargado para varias personas, típicamente sin respaldo.",
            ejemplo: "Nos sentamos en el banco del parque.",
          },
          {
            titulo: "Conjunto",
            texto: "Conjunto numeroso de peces que nadan juntos.",
            ejemplo: "El barco encontró un gran banco de atún.",
          },
        ]}
      />
      <Cuidado>
        La diferencia clave entre <strong>connotación</strong> y <strong>homonimia</strong>:<br /><br />
        • Connotación: el sentido figurado está RELACIONADO con el literal (la estrella brilla → la
        persona "brilla" en su carrera).<br />
        • Homonimia: los significados NO están relacionados entre sí (el banco-mueble y el banco-entidad
        financiera no tienen nada que ver).
      </Cuidado>
    </EscenaRica>
  );
}

function EscPesado() {
  return (
    <EscenaRica>
      <Titulo>Ejemplo guiado · la palabra "pesado"</Titulo>
      <Parrafo>
        El diccionario (RAE) da varias acepciones para <strong>"pesado"</strong>:
      </Parrafo>
      <Resumen>
        <strong>Denotaciones</strong> (literales):<br />
        • Que tiene mucho peso.<br />
        • Difícil de soportar, duro o incómodo.<br />
        • Que se mueve con lentitud.<br /><br />
        <strong>Connotaciones</strong> (figuradas, contextuales):<br />
        • Persona molesta o desagradable de tratar.
      </Resumen>
      <Ejemplo titulo="La misma palabra, contextos distintos">
        • <strong>"Pesado como una roca"</strong> → literal: tiene mucho peso físico.<br />
        • <strong>"El examen fue pesado"</strong> → connotativo: difícil o duro.<br />
        • <strong>"Tu jefe es pesado"</strong> → connotativo: persona molesta.<br />
        • <strong>"Me siento pesado después de comer"</strong> → connotativo: incomodidad, lentitud.<br />
        • <strong>"La película fue muy pesada"</strong> → connotativo: aburrida, tediosa.
      </Ejemplo>
      <PorQue>
        Como dice la RAE, el <strong>contexto</strong> es "el entorno lingüístico del cual depende el
        sentido y el valor de una palabra". Sin contexto no se puede decidir qué significa exactamente.
      </PorQue>
    </EscenaRica>
  );
}

// Práctica parte A — primeros 5 ejercicios (de la guía oficial)
function EscPracticaA() {
  return (
    <EscenaRica>
      <Titulo>Práctica · convertir lenguaje figurado a literal (1 de 2)</Titulo>
      <Parrafo>
        Cada oración tiene una expresión figurada (connotativa). Elegí el significado literal correcto.
      </Parrafo>
      <PracticaFinal ejercicios={[
        {
          p: "\"El jefe es un tiburón en los negocios\". Esto significa:",
          o: [
            "El jefe trabaja en algo relacionado con el mar.",
            "El jefe es muy agresivo y competitivo en los negocios.",
            "El jefe come pescado todos los días.",
            "El jefe es un gran nadador.",
          ],
          c: 1,
          ex: "'Tiburón' connota agresividad y astucia depredadora. Aplicado a los negocios significa alguien competitivo, astuto y despiadado.",
        },
        {
          p: "\"María está con el corazón roto\". Quiere decir que María:",
          o: [
            "Tiene problemas físicos en el corazón.",
            "Necesita una operación cardíaca.",
            "Está muy triste y emocionalmente afectada.",
            "Cambió de opinión sobre algo.",
          ],
          c: 2,
          ex: "'Corazón roto' es una expresión connotativa del dolor emocional intenso, generalmente tras una decepción amorosa.",
        },
        {
          p: "\"Después del proyecto, Juan está en las nubes\". Significa que Juan:",
          o: [
            "Viaja en avión muy seguido.",
            "Está distraído y desorientado.",
            "Está muy enfermo.",
            "Trabaja en aviación.",
          ],
          c: 1,
          ex: "'Estar en las nubes' connota distracción o falta de concentración. Está pensando en otra cosa, no en lo que pasa alrededor.",
        },
        {
          p: "\"Pedro se quedó mudo al escuchar la noticia\". Quiere decir que Pedro:",
          o: [
            "Perdió la capacidad de hablar para siempre.",
            "Decidió no decir nada nunca más.",
            "Se quedó sin palabras por la sorpresa o impacto.",
            "Estaba dormido cuando escuchó.",
          ],
          c: 2,
          ex: "'Quedarse mudo' connota la incapacidad momentánea de hablar debido al asombro. No es una mudez literal.",
        },
        {
          p: "\"El nuevo proyecto va viento en popa\". Significa que el proyecto:",
          o: [
            "Está cerca del mar.",
            "Tiene problemas con la ventilación.",
            "Está progresando muy bien y sin obstáculos.",
            "Va a ser cancelado pronto.",
          ],
          c: 2,
          ex: "Expresión náutica: el viento en popa empuja al barco. Connotativamente, algo avanza de manera favorable y sin obstáculos.",
        },
      ]} />
    </EscenaRica>
  );
}

// Práctica parte B — últimos 5 ejercicios
function EscPracticaB() {
  return (
    <EscenaRica>
      <Titulo>Práctica · convertir lenguaje figurado a literal (2 de 2)</Titulo>
      <PracticaFinal ejercicios={[
        {
          p: "\"Laura tiene una montaña de trabajo pendiente\". Significa que Laura:",
          o: [
            "Trabaja en una mina o cantera.",
            "Tiene mucho trabajo pendiente.",
            "Está escalando una montaña.",
            "Vive en una zona montañosa.",
          ],
          c: 1,
          ex: "'Una montaña de' connota una gran cantidad. Es una metáfora de magnitud (montaña = mucho).",
        },
        {
          p: "\"El equipo sacó las garras en el segundo tiempo\". Quiere decir que el equipo:",
          o: [
            "Se transformó en animales.",
            "Tuvo lesiones en las manos.",
            "Mostró una actitud combativa y agresiva.",
            "Perdió el partido.",
          ],
          c: 2,
          ex: "'Sacar las garras' connota adoptar una actitud feroz, combativa, decidida. Es metáfora animal aplicada al esfuerzo deportivo.",
        },
        {
          p: "\"Al terminar el examen, me sentí en las nubes\". Aquí 'en las nubes' significa:",
          o: [
            "Distraído (igual que en el otro ejemplo).",
            "Muy feliz y aliviado.",
            "Confundido por las preguntas.",
            "Cansado por el esfuerzo.",
          ],
          c: 1,
          ex: "Ojo: 'en las nubes' tiene DOS connotaciones según el contexto. En 'Juan está en las nubes' = distraído. Acá, asociado al alivio post-examen = feliz, eufórico. El contexto manda.",
        },
        {
          p: "\"Marcos siempre le da la vuelta a la tortilla en las discusiones\". Quiere decir que Marcos:",
          o: [
            "Es buen cocinero.",
            "Cambia la situación a su favor.",
            "Se enoja fácilmente.",
            "Habla mucho durante las comidas.",
          ],
          c: 1,
          ex: "'Dar la vuelta a la tortilla' connota un cambio de situación que vuelca la ventaja al lado opuesto. Marcos logra invertir el rumbo de las discusiones.",
        },
        {
          p: "\"Pedro le puso el último clavo al ataúd de su carrera\". Significa que Pedro:",
          o: [
            "Trabajó como carpintero al final.",
            "Asistió a un funeral importante.",
            "Tomó una decisión que arruinó definitivamente su carrera.",
            "Terminó su carrera con éxito.",
          ],
          c: 2,
          ex: "'El último clavo al ataúd' connota la acción final que sella la destrucción de algo. Pedro hizo algo que terminó de hundir su carrera profesional.",
        },
      ]} />
    </EscenaRica>
  );
}

function EscResumen() {
  return (
    <EscenaRica>
      <Titulo>Estrategia · qué llevarse al examen</Titulo>
      <Resumen>
        <strong>1.</strong> Antes de decidir el sentido de una palabra, mirá el <strong>contexto</strong>{" "}
        (la oración entera, no la palabra suelta).<br /><br />
        <strong>2.</strong> Si una palabra parece tener un sentido raro o desproporcionado, probablemente
        sea <strong>connotativa</strong>. "Una montaña de trabajo" no es literalmente una montaña.<br /><br />
        <strong>3.</strong> Las expresiones figuradas <strong>cambian de significado según el contexto</strong>.
        "En las nubes" puede ser distracción o euforia — depende.<br /><br />
        <strong>4.</strong> Si dos significados de una palabra <strong>no tienen NADA que ver entre sí</strong>
        (banco-entidad vs banco-mueble), es <strong>homonimia</strong>. Si están relacionados por una
        metáfora (estrella-celeste vs estrella-famoso), es <strong>connotación</strong>.<br /><br />
        <strong>5.</strong> Cuando el examen te pida "qué significa esta expresión", elegí la opción que
        <strong> describa el sentido figurado en lenguaje neutro</strong>, no la que repita las palabras
        de la frase original.
      </Resumen>
    </EscenaRica>
  );
}
