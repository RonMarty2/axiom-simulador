"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="GT-03"
      tituloUnidad="Congruencia y semejanza · Triángulos"
      escenas={[
        { titulo: "Congruencia vs semejanza · diferencia clave", componente: EscIntro },
        { titulo: "Criterios de congruencia (LLL, LAL, ALA)", componente: EscCriterios },
        { titulo: "Semejanza · cuándo dos triángulos lo son", componente: EscSemejanza },
        { titulo: "Razón de semejanza", componente: EscRazon },
        { titulo: "Teorema de Thales", componente: EscThales },
        { titulo: "Aplicaciones · escalas, sombras, planos", componente: EscAplicaciones },
        { titulo: "Errores comunes", componente: EscErrores },
        { titulo: "Práctica final", componente: EscPractica },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc01 · Intro
// ─────────────────────────────────────────────────────────────────────────────
function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Congruencia y semejanza · dos relaciones clave</Titulo>

      <Hook>
        En el examen, MUCHAS preguntas dicen "dos triángulos son semejantes,
        encuentre el lado X". Saber identificar la semejanza y aplicar las
        proporciones correctas es la diferencia entre resolver en 30 segundos
        o no resolver.
      </Hook>

      <Definicion termino="Congruencia (≅)">
        Dos figuras son <strong>congruentes</strong> si tienen <em>exactamente
        la misma forma Y el mismo tamaño</em>. Es decir, todos los lados y
        ángulos correspondientes son iguales.
      </Definicion>

      <Definicion termino="Semejanza (∼)">
        Dos figuras son <strong>semejantes</strong> si tienen la <em>misma forma
        pero distinto tamaño</em>. Los ángulos correspondientes son iguales
        y los lados correspondientes son <strong>proporcionales</strong>.
      </Definicion>

      <Resumen>
        <strong>Comparación rápida</strong>:<br />
        • Congruentes: copia idéntica. Una cabe perfecto sobre la otra.<br />
        • Semejantes: una es una versión "ampliada" o "reducida" de la otra.
        Misma forma, distinto tamaño.<br /><br />
        Toda congruencia es un caso particular de semejanza (con razón 1:1).
      </Resumen>

      <Mnemotecnia>
        <strong>Símbolos</strong>:<br />
        • Congruencia: <strong>≅</strong> (igual + ondulado).<br />
        • Semejanza: <strong>∼</strong> (solo ondulado, "casi pero no igual").<br /><br />
        Truco: el símbolo de congruencia tiene el "=" arriba porque las medidas
        son EXACTAMENTE iguales. El de semejanza no.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc02 · Criterios de congruencia
// ─────────────────────────────────────────────────────────────────────────────
function EscCriterios() {
  return (
    <EscenaRica>
      <Titulo>Criterios de congruencia · 3 atajos para no medir todo</Titulo>
      <Parrafo>
        Para probar que dos triángulos son congruentes <strong>no necesitas
        verificar los 6 elementos</strong> (3 lados + 3 ángulos). Basta con uno
        de estos 3 criterios:
      </Parrafo>

      <Definicion termino="Criterio LLL · Lado-Lado-Lado">
        Si los 3 lados de un triángulo son iguales a los 3 lados de otro
        (en correspondencia), los triángulos son congruentes.
      </Definicion>

      <Definicion termino="Criterio LAL · Lado-Ángulo-Lado">
        Si 2 lados y el ángulo COMPRENDIDO entre ellos son iguales, son
        congruentes.<br />
        Importante: el ángulo debe estar entre los dos lados, no en otra
        posición.
      </Definicion>

      <Definicion termino="Criterio ALA · Ángulo-Lado-Ángulo">
        Si 2 ángulos y el lado COMPRENDIDO entre ellos son iguales, son
        congruentes.
      </Definicion>

      <Mnemotecnia>
        <strong>"3 criterios = 3 letras"</strong>:<br />
        • <strong>LLL</strong>: los 3 lados.<br />
        • <strong>LAL</strong>: lado, ángulo entre ellos, lado.<br />
        • <strong>ALA</strong>: ángulo, lado entre ellos, ángulo.<br /><br />
        En todos los casos, los 3 elementos deben estar "consecutivos" alrededor
        del triángulo. No vale L-A-L con el ángulo en cualquier lugar.
      </Mnemotecnia>

      <Cuidado>
        <strong>NO existe criterio "AAA"</strong> para congruencia. Tener los
        3 ángulos iguales NO garantiza congruencia. Garantiza SEMEJANZA, pero
        los triángulos pueden tener distinto tamaño.<br /><br />
        Lo mismo con "ALL" o "LLA" (lado, lado, ángulo NO comprendido): no es
        criterio suficiente.
      </Cuidado>

      <PorQue>
        <strong>¿Por qué bastan 3 elementos?</strong> Un triángulo queda
        determinado unívocamente por 3 datos (entre lados y ángulos), siempre
        que esos datos describan la forma completa. 3 lados conocidos → no hay
        ambigüedad. 2 ángulos → el tercero es 180 menos los otros, y necesitas
        un lado para fijar el tamaño.
      </PorQue>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc03 · Semejanza
// ─────────────────────────────────────────────────────────────────────────────
function EscSemejanza() {
  return (
    <EscenaRica>
      <Titulo>Semejanza · cuándo dos triángulos lo son</Titulo>

      <Resumen>
        <strong>Dos triángulos son semejantes si y solo si</strong>:<br />
        1. Sus 3 ángulos correspondientes son iguales.<br />
        2. Sus 3 lados correspondientes son <strong>proporcionales</strong> (es
        decir, la razón entre lados correspondientes es la misma).<br /><br />
        Cualquiera de las dos condiciones implica la otra.
      </Resumen>

      <Definicion termino="Criterios de semejanza (AA, LLL prop, LAL prop)">
        Bastan <strong>2 ángulos</strong> iguales (criterio AA) para confirmar
        semejanza, porque el tercer ángulo queda determinado por la suma 180°.<br /><br />
        También sirven: 3 lados proporcionales (LLL prop), o 2 lados
        proporcionales y el ángulo entre ellos igual (LAL prop).
      </Definicion>

      <Mnemotecnia>
        <strong>Criterio AA (el más usado)</strong>: si dos triángulos tienen
        2 ángulos iguales, son semejantes.<br /><br />
        Esto es lo más útil en el examen porque a menudo te dan triángulos
        que comparten un ángulo (vértice común) y otro ángulo igual (paralelas
        o rectos), entonces son automáticamente semejantes.
      </Mnemotecnia>

      <Ejemplo titulo="Ejemplo · triángulos compartiendo un ángulo">
        Si dos triángulos comparten un ángulo (vértice común) Y uno de los
        otros ángulos también es igual, son semejantes por AA. Esto pasa
        cuando una recta paralela a un lado corta a los otros dos.
      </Ejemplo>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc04 · Razón de semejanza
// ─────────────────────────────────────────────────────────────────────────────
function EscRazon() {
  return (
    <EscenaRica>
      <Titulo>Razón de semejanza · k</Titulo>

      <Definicion termino="Razón de semejanza (k)">
        Cociente entre lados correspondientes de dos triángulos semejantes.<br />
        Si el triángulo grande tiene lado a y el chico a', entonces
        <strong> k = a/a'</strong>. Esta razón es la misma para los 3 pares de
        lados correspondientes.
      </Definicion>

      <Resumen>
        <strong>Si la razón de lados es k</strong>:<br />
        • La razón de perímetros también es k.<br />
        • La razón de áreas es <strong>k²</strong>.<br />
        • La razón de volúmenes (en 3D) es k³.
      </Resumen>

      <PorQue>
        <strong>¿Por qué el área va con k²?</strong> El área depende de DOS
        dimensiones (base × altura). Si cada dimensión escala por k, el producto
        escala por k · k = k².<br /><br />
        Lo mismo en 3D: volumen depende de 3 dimensiones, así que escala con k³.
      </PorQue>

      <WorkedExample titulo="Aplicación · razón de áreas">
        Dos triángulos semejantes tienen lados correspondientes en razón 3:5.
        Si el triángulo chico tiene área 18 cm², ¿cuál es el área del grande?<br /><br />

        <strong>Paso 1 · Razón de semejanza:</strong> k = 5/3.<br /><br />

        <strong>Paso 2 · Razón de áreas:</strong> k² = 25/9.<br /><br />

        <strong>Paso 3 · Aplicar:</strong><br />
        Área grande / Área chica = 25/9 → Área grande = 18 · 25/9 =
        <strong> 50 cm²</strong>.<br /><br />

        <strong>Verificación intuitiva:</strong> el lado se multiplica por
        5/3 ≈ 1.67, el área debe multiplicarse por (1.67)² ≈ 2.78. Y
        50/18 ≈ 2.78 ✓.
      </WorkedExample>

      <Cuidado>
        Error típico: pensar que si los lados son 3:5, las áreas también son
        3:5. FALSO. Las áreas son 3²:5² = 9:25.
      </Cuidado>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc05 · Teorema de Thales
// ─────────────────────────────────────────────────────────────────────────────
function ThalesVisual() {
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 400 240"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Dos rectas paralelas + 2 transversales formando ángulo */}
          <motion.line x1="80" y1="40" x2="380" y2="60"
            stroke={LIENZO.fgFaint} strokeWidth="1.5" strokeDasharray="4 3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
          <motion.line x1="80" y1="120" x2="380" y2="140"
            stroke={LIENZO.fgFaint} strokeWidth="1.5" strokeDasharray="4 3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
          <motion.line x1="80" y1="200" x2="380" y2="220"
            stroke={LIENZO.fgFaint} strokeWidth="1.5" strokeDasharray="4 3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.4 }} />
          {/* Transversal 1 */}
          <motion.line x1="100" y1="35" x2="120" y2="205"
            stroke={LIENZO.accent} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
          {/* Transversal 2 */}
          <motion.line x1="280" y1="50" x2="350" y2="225"
            stroke={COLOR_OK} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} />
          {/* Etiquetas */}
          <text x="60" y="44" fontSize="12" fill={LIENZO.fgDim}>r₁</text>
          <text x="60" y="124" fontSize="12" fill={LIENZO.fgDim}>r₂</text>
          <text x="60" y="204" fontSize="12" fill={LIENZO.fgDim}>r₃</text>
          <text x="100" y="120" fontSize="11" fill={LIENZO.accent} fontWeight="700">a</text>
          <text x="105" y="180" fontSize="11" fill={LIENZO.accent} fontWeight="700">b</text>
          <text x="295" y="100" fontSize="11" fill={COLOR_OK} fontWeight="700">a'</text>
          <text x="305" y="180" fontSize="11" fill={COLOR_OK} fontWeight="700">b'</text>
          {/* Fórmula */}
          <text x="200" y="20" textAnchor="middle" fontSize="14" fill={LIENZO.fg} fontWeight="700">
            a / b = a' / b'
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscThales() {
  return (
    <EscenaRica>
      <Titulo>Teorema de Thales</Titulo>

      <Definicion termino="Teorema de Thales">
        Si tres o más rectas paralelas son cortadas por dos transversales,
        los segmentos correspondientes son <strong>proporcionales</strong>.
      </Definicion>

      <ThalesVisual />

      <Resumen>
        Si r₁ ∥ r₂ ∥ r₃ son cortadas por dos transversales que forman segmentos
        a, b en una y a', b' en la otra, entonces:<br /><br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a / b = a' / b'
        </span>
      </Resumen>

      <Definicion termino="Corolario · paralela a un lado de un triángulo">
        Si una recta paralela a un lado de un triángulo corta a los otros dos
        lados, divide a esos lados en segmentos proporcionales. Y forma un
        nuevo triángulo SEMEJANTE al original.
      </Definicion>

      <WorkedExample titulo="Aplicación · encontrar un segmento desconocido">
        En un triángulo ABC, una recta paralela a BC corta a AB en D y a AC en
        E. Si AD = 4, DB = 6, AE = 5, ¿cuánto vale EC?<br /><br />

        <strong>Aplicar Thales en los lados AB y AC:</strong><br />
        AD / DB = AE / EC<br />
        4 / 6 = 5 / EC<br />
        4 · EC = 6 · 5 = 30<br />
        EC = <strong>7.5</strong>.<br /><br />

        <strong>Truco mental:</strong> en estos problemas siempre arman la
        proporción "parte de un lado : parte del otro lado = parte
        correspondiente : parte correspondiente".
      </WorkedExample>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc06 · Aplicaciones
// ─────────────────────────────────────────────────────────────────────────────
function EscAplicaciones() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones reales de la semejanza</Titulo>

      <WorkedExample titulo="Altura de un edificio por su sombra">
        Un edificio proyecta una sombra de 20 m. Al mismo tiempo, una varilla
        de 2 m proyecta sombra de 1.5 m. ¿Cuál es la altura del edificio?<br /><br />

        <strong>Idea:</strong> el edificio y la varilla forman triángulos
        semejantes con el sol como vértice (los rayos son paralelos).<br /><br />

        <strong>Proporción:</strong><br />
        Altura edif / Sombra edif = Altura varilla / Sombra varilla<br />
        H / 20 = 2 / 1.5<br />
        H = 20 · 2 / 1.5 = 40/1.5 = <strong>26.67 m</strong>.
      </WorkedExample>

      <WorkedExample titulo="Escala de un plano">
        Un plano arquitectónico tiene escala 1:50. Si una habitación mide
        12 cm en el plano, ¿cuál es su medida real?<br /><br />

        <strong>Razón de semejanza:</strong> k = 50 (la realidad es 50 veces el
        plano).<br /><br />

        <strong>Cálculo:</strong> medida real = 12 cm · 50 = 600 cm =
        <strong> 6 m</strong>.
      </WorkedExample>

      <Conexion>
        La semejanza es la base de la <strong>trigonometría</strong>: las razones
        sen, cos, tan son razones entre lados de triángulos rectángulos
        semejantes. Por eso para un ángulo dado, esas razones son CONSTANTES
        sin importar el tamaño del triángulo.
      </Conexion>

      <AutoCheck
        pregunta="Dos triángulos son semejantes con razón 2:3. Si el chico tiene área 12 cm², ¿cuál es el área del grande?"
        opciones={["18 cm²", "27 cm²", "36 cm²", "8 cm²"]}
        correctaIdx={1}
        explicacion="Razón de áreas = (3/2)² = 9/4. Área grande = 12 · 9/4 = 27 cm²."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc07 · Errores
// ─────────────────────────────────────────────────────────────────────────────
function EscErrores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>

      <Misconception titulo="Error 1 · áreas proporcionales como lados">
        Si la razón de lados es 2:3, la razón de áreas NO es 2:3, es 4:9 (k²).
        Si la razón de lados es 1:2 (uno es el doble), el área grande es 4
        veces, no 2.
      </Misconception>

      <Misconception titulo="Error 2 · creer que AAA implica congruencia">
        Tres ángulos iguales SOLO garantizan semejanza, no congruencia. Un
        triángulo de lados 3-4-5 y uno de 6-8-10 tienen los mismos ángulos
        pero NO son congruentes (uno es el doble del otro).
      </Misconception>

      <Misconception titulo="Error 3 · armar mal la proporción de Thales">
        Si tienes rectas paralelas cortadas por transversales, los segmentos
        proporcionales son los QUE ESTÁN ENTRE LAS MISMAS DOS PARALELAS, no
        cualquiera. Hay que cuidar la correspondencia.
      </Misconception>

      <Cuidado>
        Para no confundir, escribe los segmentos con la misma convención de
        izquierda a derecha. Si en una transversal vas de arriba abajo a-b, en
        la otra escríbelos en el mismo orden a'-b'.
      </Cuidado>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc08 · Práctica
// ─────────────────────────────────────────────────────────────────────────────
function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Dos triángulos semejantes tienen razón de lados 4:7. La razón de sus áreas es:",
      o: ["4:7", "8:14", "16:49", "2:3"],
      c: 2,
      ex: "Razón de áreas = (razón de lados)² = (4/7)² = 16/49.",
    },
    {
      p: "En un triángulo, una recta paralela a un lado corta a los otros dos en segmentos 3 y 5 en uno, y 6 y x en el otro. x =",
      o: ["10", "8", "12", "9"],
      c: 0,
      ex: "Por Thales: 3/5 = 6/x → x = 30/3 = 10.",
    },
    {
      p: "Si dos triángulos son congruentes y uno tiene perímetro 36 cm, el otro tiene perímetro:",
      o: ["36 cm", "18 cm", "72 cm", "depende"],
      c: 0,
      ex: "Congruentes = mismo tamaño exacto. Mismo perímetro: 36 cm.",
    },
    {
      p: "Una varilla de 1.5 m proyecta sombra de 1 m. Al mismo tiempo, un edificio proyecta sombra de 24 m. Altura del edificio:",
      o: ["36 m", "16 m", "24 m", "12 m"],
      c: 0,
      ex: "Proporción: H/24 = 1.5/1 → H = 36 m.",
    },
    {
      p: "¿Cuál NO es un criterio válido de congruencia?",
      o: ["LLL", "LAL", "AAA", "ALA"],
      c: 2,
      ex: "AAA solo garantiza semejanza, no congruencia. Los válidos son LLL, LAL, ALA.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final · 5 ejercicios</Titulo>
      {ejs.map((e, i) => {
        const sel = resp[i];
        const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c;
                const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{
                      padding: "10px 14px",
                      background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)",
                      border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`,
                      borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer",
                      fontFamily: "var(--font-crimson), serif", textAlign: "left",
                    }}>{op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}</button>
                );
              })}
            </div>
            {rev && (
              <div style={{ marginTop: 10, padding: "10px 12px", background: sel === e.c ? "#ecfdf5" : "#fef2f2", borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5 }}>
                <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}{e.ex}
              </div>
            )}
          </div>
        );
      })}
      {Object.keys(resp).length === ejs.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 18, background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
