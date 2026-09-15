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
      unidad="GT-02"
      tituloUnidad="Triángulos · Geometría Plana"
      escenas={[
        { titulo: "El triángulo · elementos y propiedades base", componente: EscIntro },
        { titulo: "Clasificación por lados", componente: EscPorLados },
        { titulo: "Clasificación por ángulos", componente: EscPorAngulos },
        { titulo: "Teorema fundamental: suma = 180°", componente: EscSuma180 },
        { titulo: "Teorema de Pitágoras", componente: EscPitagoras },
        { titulo: "Aplicaciones de Pitágoras", componente: EscPitAplic },
        { titulo: "Perímetro y área", componente: EscPerimArea },
        { titulo: "Líneas notables del triángulo", componente: EscNotables },
        { titulo: "Errores comunes", componente: EscErrores },
        { titulo: "Práctica final", componente: EscPractica },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG · Triángulo paramétrico
// ─────────────────────────────────────────────────────────────────────────────
function TrianguloSVG({
  a = 4, b = 5, c = 3,
  mostrarLados = true, mostrarAngulos = false, color = LIENZO.accent,
}: {
  a?: number; b?: number; c?: number;
  mostrarLados?: boolean; mostrarAngulos?: boolean; color?: string;
}) {
  // Calcular coordenadas con ley de cosenos
  // A en origen (0,0), B sobre eje x (c, 0), C calculado
  const scale = 30;
  const Ax = 80, Ay = 180;
  const Bx = Ax + c * scale, By = Ay;
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
  const Cx = Ax + b * cosA * scale;
  const Cy = Ay - b * sinA * scale;
  const points = `${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`;

  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <motion.polygon
            points={points}
            fill={`${color}22`} stroke={color} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }} />
          <circle cx={Ax} cy={Ay} r="4" fill={LIENZO.fg} />
          <circle cx={Bx} cy={By} r="4" fill={LIENZO.fg} />
          <circle cx={Cx} cy={Cy} r="4" fill={LIENZO.fg} />
          <text x={Ax - 8} y={Ay + 18} fontSize="14" fill={LIENZO.fg} fontWeight="600">A</text>
          <text x={Bx + 8} y={By + 18} fontSize="14" fill={LIENZO.fg} fontWeight="600">B</text>
          <text x={Cx} y={Cy - 8} textAnchor="middle" fontSize="14" fill={LIENZO.fg} fontWeight="600">C</text>
          {mostrarLados && (
            <>
              <text x={(Ax + Bx) / 2} y={By + 22} textAnchor="middle" fontSize="12" fill={color} fontWeight="600">c = {c}</text>
              <text x={(Bx + Cx) / 2 + 12} y={(By + Cy) / 2} fontSize="12" fill={color} fontWeight="600">a = {a}</text>
              <text x={(Ax + Cx) / 2 - 14} y={(Ay + Cy) / 2} fontSize="12" fill={color} fontWeight="600">b = {b}</text>
            </>
          )}
        </svg>
      </Pizarra>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc01 · Intro
// ─────────────────────────────────────────────────────────────────────────────
function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Triángulo · la figura más importante de la geometría</Titulo>
      <Parrafo>
        Toda figura poligonal puede descomponerse en triángulos. Por eso el
        triángulo es la <strong>unidad estructural</strong> de la geometría
        plana: si dominas sus propiedades, dominas todas las demás figuras.
      </Parrafo>

      <Hook>
        En el examen UMSS FCyT, <strong>casi todas las preguntas de
        geometría usan triángulos</strong> directa o indirectamente.
        Polígonos regulares se subdividen en triángulos. La trigonometría se
        construye sobre triángulos rectángulos. Pitágoras aparece todo el tiempo.
      </Hook>

      <Definicion termino="Triángulo">
        Polígono de 3 lados y 3 vértices. Los 3 vértices NO están alineados.
      </Definicion>

      <TrianguloSVG a={4} b={5} c={3} />

      <Resumen>
        <strong>Elementos del triángulo</strong>:<br />
        • <strong>3 vértices</strong>: nombrados con letras mayúsculas A, B, C.<br />
        • <strong>3 lados</strong>: nombrados con la letra minúscula del vértice
        OPUESTO. El lado a está enfrente del vértice A.<br />
        • <strong>3 ángulos interiores</strong>: ∠A, ∠B, ∠C. También se escriben con
        letras griegas: α (se lee "alfa") para ∠A, β ("beta") para ∠B y γ ("gamma")
        para ∠C. Son solo otro nombre para lo mismo.
      </Resumen>

      {/* El ejercicio 7 de la práctica final se resuelve con esto y no estaba
          enseñado en ninguna escena: el alumno no tenía de dónde sacarlo. */}
      <Definicion termino="desigualdad triangular">
        No cualquier trío de medidas forma un triángulo. Para que se pueda cerrar,
        <strong> la suma de dos lados cualesquiera tiene que ser mayor que el tercero</strong>.
        <br /><br />
        Con 3, 4 y 8 no se puede: 3 + 4 = 7, y 7 no llega a 8. Si apoyas los dos lados
        cortos sobre el largo, no se tocan y te queda un hueco. Con 3, 4 y 5 sí,
        porque 3 + 4 = 7 y 7 sí pasa de 5.
      </Definicion>

      <Mnemotecnia>
        <strong>Convención universal</strong>: el lado se nombra con la letra
        minúscula del vértice <em>opuesto</em>.<br />
        • Lado <strong>a</strong> ↔ enfrenta al vértice <strong>A</strong>.<br />
        • Lado <strong>b</strong> ↔ enfrenta al vértice <strong>B</strong>.<br />
        • Lado <strong>c</strong> ↔ enfrenta al vértice <strong>C</strong>.<br /><br />
        Esto es CLAVE para ley de senos, ley de cosenos y trigonometría en
        general. Memorízalo desde ya.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc02 · Clasificación por lados
// ─────────────────────────────────────────────────────────────────────────────
function EscPorLados() {
  const [tipo, setTipo] = useState(0);
  const triangulos = [
    { nombre: "Equilátero", desc: "3 lados iguales · 3 ángulos iguales de 60°", a: 4, b: 4, c: 4 },
    { nombre: "Isósceles", desc: "2 lados iguales · 2 ángulos iguales (en la base)", a: 5, b: 5, c: 3 },
    { nombre: "Escaleno", desc: "3 lados distintos · 3 ángulos distintos", a: 4, b: 5, c: 3 },
  ];
  const t = triangulos[tipo];

  return (
    <EscenaRica>
      <Titulo>Clasificación por lados</Titulo>
      <Parrafo>Según cuántos lados iguales tenga:</Parrafo>

      <TrianguloSVG a={t.a} b={t.b} c={t.c} color={COLOR_OK} />

      <div style={{ textAlign: "center", margin: "12px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLOR_OK, fontFamily: "var(--font-crimson), serif" }}>
          {t.nombre}
        </div>
        <div style={{ fontSize: 14, color: LIENZO.fgDim, marginTop: 4 }}>
          {t.desc}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 12 }}>
        {triangulos.map((tp, i) => (
          <button key={i} onClick={() => setTipo(i)}
            style={{
              padding: "6px 14px", fontSize: 13, borderRadius: 999, cursor: "pointer",
              fontWeight: 600, fontFamily: "var(--font-crimson), serif",
              background: tipo === i ? COLOR_OK : "transparent",
              color: tipo === i ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${tipo === i ? COLOR_OK : LIENZO.fgFaint}`,
            }}>
            {tp.nombre}
          </button>
        ))}
      </div>

      <Mnemotecnia>
        <strong>Truco mnemotécnico</strong>:<br />
        • <strong>EQUI</strong>látero = TODO IGUAL (3 lados iguales).<br />
        • <strong>ISÓS</strong>celes = "<em>iso</em>" significa IGUAL en griego → al menos 2 iguales.<br />
        • <strong>Escaleno</strong> = "<em>escalera</em>" con peldaños desiguales → TODOS distintos.
      </Mnemotecnia>

      <PorQue>
        En un isósceles, los <strong>ángulos opuestos a los lados iguales son
        iguales</strong> (los dos ángulos de la base). En un equilátero, los 3
        ángulos son iguales y por tanto cada uno mide 60°.
      </PorQue>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc03 · Clasificación por ángulos
// ─────────────────────────────────────────────────────────────────────────────
function EscPorAngulos() {
  return (
    <EscenaRica>
      <Titulo>Clasificación por ángulos</Titulo>
      <Parrafo>Según el tipo del ángulo más grande:</Parrafo>

      <Definicion termino="Triángulo acutángulo">
        Los 3 ángulos son agudos (todos &lt; 90°).
      </Definicion>

      <Definicion termino="Triángulo rectángulo">
        Tiene EXACTAMENTE 1 ángulo recto (= 90°). Los otros 2 son
        agudos. Los lados que forman el ángulo recto se llaman
        <strong> catetos</strong>; el lado opuesto al ángulo recto es la
        <strong> hipotenusa</strong>.
      </Definicion>

      <Definicion termino="Triángulo obtusángulo">
        Tiene 1 ángulo obtuso (&gt; 90°). Los otros 2 son agudos.
      </Definicion>

      <Mnemotecnia>
        <strong>"A-R-O · 3 tipos"</strong>:<br />
        • <strong>A</strong>cutángulo: <em>todos agudos</em>.<br />
        • <strong>R</strong>ectángulo: <em>uno recto</em>.<br />
        • <strong>O</strong>btusángulo: <em>uno obtuso</em>.<br /><br />
        Un triángulo SOLO puede tener UN ángulo recto u obtuso (porque si tuviera
        dos, la suma ya pasaría de 180°).
      </Mnemotecnia>

      <Cuidado>
        <strong>Combinaciones permitidas:</strong><br />
        • Equilátero → siempre acutángulo (todos 60°).<br />
        • Isósceles → puede ser acutángulo, rectángulo u obtusángulo.<br />
        • Escaleno → puede ser cualquiera de los 3.<br />
        • NO existen equiláteros rectángulos ni obtusángulos.
      </Cuidado>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc04 · Suma de ángulos = 180°
// ─────────────────────────────────────────────────────────────────────────────
function EscSuma180() {
  return (
    <EscenaRica>
      <Titulo>Teorema fundamental · la suma de ángulos siempre es 180°</Titulo>

      <Resumen>
        <strong>En todo triángulo:</strong><br />
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          ∠A + ∠B + ∠C = 180°
        </span>
      </Resumen>

      <PorQue>
        <strong>Demostración intuitiva:</strong> si dibujas una recta paralela a
        un lado del triángulo pasando por el vértice opuesto, los 3 ángulos del
        triángulo se "acomodan" sobre esa recta formando un ángulo llano (180°).
        Esto sale de las propiedades de las paralelas cortadas por transversal
        (vimos en la lección anterior).
      </PorQue>

      <WorkedExample titulo="Encontrar el tercer ángulo">
        Un triángulo tiene ángulos de 47° y 68°. ¿Cuánto mide el tercero?<br /><br />

        <strong>Aplicación directa:</strong><br />
        47 + 68 + x = 180<br />
        115 + x = 180<br />
        x = <strong>65°</strong>.
      </WorkedExample>

      <WorkedExample titulo="Problema clásico · ángulos en proporción">
        Los ángulos de un triángulo están en proporción 2:3:5. ¿Cuánto mide el
        mayor?<br /><br />

        <strong>Paso 1 · Variables:</strong> los ángulos son 2k, 3k, 5k.<br /><br />

        <strong>Paso 2 · Aplicar la suma 180°:</strong><br />
        2k + 3k + 5k = 180<br />
        10k = 180<br />
        k = 18.<br /><br />

        <strong>Paso 3 · Calcular cada uno:</strong><br />
        • 2k = 36°<br />
        • 3k = 54°<br />
        • 5k = <strong>90°</strong> (el mayor).<br /><br />

        <strong>Observación:</strong> el triángulo resulta ser RECTÁNGULO (el
        mayor es 90°). Las proporciones 2:3:5 no son arbitrarias: la suma 10k
        tiene que dar 180°.
      </WorkedExample>

      <Definicion termino="Ángulo exterior">
        Cada ángulo interior tiene un ángulo exterior asociado (su suplemento).
        Si el interior mide α, el exterior mide 180° − α.
      </Definicion>

      <Mnemotecnia>
        <strong>Teorema del ángulo exterior</strong>: el ángulo exterior de un
        vértice es igual a la SUMA de los dos ángulos interiores no adyacentes.<br /><br />
        Ej: si los ángulos interiores son 50° y 60° en dos vértices, el exterior
        del tercer vértice mide 50 + 60 = 110°. <br />
        Esto sale de: int + ext = 180° y los 3 int suman 180°.
      </Mnemotecnia>

      <AutoCheck
        pregunta="En un triángulo, dos ángulos miden 30° y 75°. ¿Cuánto mide el tercer ángulo?"
        opciones={["75°", "55°", "105°", "85°"]}
        correctaIdx={0}
        explicacion="180 − 30 − 75 = 75°. Es un triángulo isósceles (tiene 2 ángulos de 75°)."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc05 · Teorema de Pitágoras
// ─────────────────────────────────────────────────────────────────────────────
function PitagorasVisual() {
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      {/* Coordenadas calculadas, no dibujadas a ojo (regla 7 de §4.5).
          Lo que había antes no mostraba el teorema: los dos "cuadrados" sobre
          los catetos eran rectángulos (120×60 y 50×100) y sobre la hipotenusa
          no había ninguno, justo al lado del texto que promete "el cuadrado
          sobre la hipotenusa es igual a la suma de los otros dos". Además los
          lados estaban rotulados al revés de la convención que enseña esta
          misma lección (cada lado lleva la letra del vértice opuesto).
          Ahora el ángulo recto va en C, así la hipotenusa es AB = c y la
          fórmula c² = a² + b² se lee directo del dibujo.
          Escala: 13px por unidad. Catetos 6 y 5, hipotenusa √61 ≈ 7,81. */}
      <Pizarra alto={310}>
        <svg width="100%" height="100%" viewBox="0 0 400 310"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Cuadrado sobre la hipotenusa AB: rotado, hacia afuera del triángulo */}
          <motion.polygon points="132,196 210,131 145,53 67,118"
            fill={`${LIENZO.accent}22`} stroke={LIENZO.accent} strokeWidth="2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.4 }} />
          <motion.text x="138" y="130" textAnchor="middle" fontSize="15" fill={LIENZO.accent} fontWeight="700"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>c² = 61</motion.text>

          {/* Cuadrado sobre el cateto AC (b = 6), colgando hacia abajo */}
          <motion.rect x="132" y="196" width="78" height="78"
            fill={`${COLOR_OK}33`} stroke={COLOR_OK} strokeWidth="2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} />
          <motion.text x="171" y="241" textAnchor="middle" fontSize="15" fill={COLOR_OK} fontWeight="700"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>b² = 36</motion.text>

          {/* Cuadrado sobre el cateto CB (a = 5), hacia la derecha */}
          <motion.rect x="210" y="131" width="65" height="65"
            fill={`${COLOR_EXP}33`} stroke={COLOR_EXP} strokeWidth="2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }} />
          <motion.text x="243" y="169" textAnchor="middle" fontSize="15" fill={COLOR_EXP} fontWeight="700"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>a² = 25</motion.text>

          {/* El triángulo va último para que quede encima de los cuadrados */}
          <motion.polygon points="132,196 210,196 210,131"
            fill={LIENZO.bg} stroke={LIENZO.fg} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
          {/* Marca del ángulo recto, en C */}
          <polyline points="198,196 198,184 210,184" fill="none" stroke={LIENZO.fg} strokeWidth="1.5" />

          <text x="124" y="207" fontSize="13" fill={LIENZO.fg} fontWeight="700">A</text>
          <text x="215" y="127" fontSize="13" fill={LIENZO.fg} fontWeight="700">B</text>
          <text x="215" y="208" fontSize="13" fill={LIENZO.fg} fontWeight="700">C</text>
          <text x="171" y="211" textAnchor="middle" fontSize="12" fill={COLOR_OK} fontWeight="700">b = 6</text>
          {/* Adentro del triángulo, no afuera: afuera se pisaba con "a² = 25" */}
          <text x="205" y="172" textAnchor="end" fontSize="12" fill={COLOR_EXP} fontWeight="700">a = 5</text>

          <motion.text x="200" y="293" textAnchor="middle" fontSize="15" fill={LIENZO.fg} fontWeight="700"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            c² = a² + b² = 25 + 36 = 61 → c = √61 ≈ 7,81
          </motion.text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscPitagoras() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Teorema de Pitágoras</Titulo>
      <Parrafo>
        Este es probablemente <strong>el teorema más útil de todo el examen</strong>.
        Vale solo para triángulos RECTÁNGULOS.
      </Parrafo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          c² = a² + b²
        </span><br /><br />
        donde <strong>c</strong> es la hipotenusa y <strong>a, b</strong> son los catetos.
      </Resumen>

      <PitagorasVisual />

      <PorQue>
        El cuadrado construido sobre la hipotenusa tiene un área igual a la
        SUMA de las áreas de los cuadrados construidos sobre los catetos. Es una
        relación geométrica que se cumple SIEMPRE en triángulos rectángulos.
      </PorQue>

      <Mnemotecnia>
        <strong>"Hipotenusa al cuadrado = suma de los catetos al cuadrado"</strong>.<br /><br />
        Truco para no confundir: la HIPOTENUSA siempre es <em>la más larga</em>
        de los 3 lados. Si dudas cuál variable usar como hipotenusa, fíjate cuál
        es el lado más grande.
      </Mnemotecnia>

      <Definicion termino="Ternas pitagóricas">
        Conjuntos de 3 enteros (a, b, c) que cumplen Pitágoras. Las más usadas
        en exámenes:<br />
        • <strong>(3, 4, 5)</strong> · y sus múltiplos (6, 8, 10), (9, 12, 15)…<br />
        • <strong>(5, 12, 13)</strong> · y sus múltiplos.<br />
        • <strong>(8, 15, 17)</strong>.<br />
        • <strong>(7, 24, 25)</strong>.
      </Definicion>

      <Cuidado>
        <strong>Memorizar las ternas (3,4,5) y (5,12,13)</strong> ahorra tiempo
        en el examen. Si reconoces que 3 y 4 son los catetos, sabes sin calcular
        que la hipotenusa es 5.
      </Cuidado>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc06 · Aplicaciones de Pitágoras
// ─────────────────────────────────────────────────────────────────────────────
function EscPitAplic() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones de Pitágoras</Titulo>

      <WorkedExample titulo="Calcular la hipotenusa">
        Un triángulo rectángulo tiene catetos de 9 cm y 12 cm. ¿Cuánto mide la
        hipotenusa?<br /><br />

        <strong>Paso 1 · Aplicar Pitágoras:</strong><br />
        c² = 9² + 12² = 81 + 144 = 225.<br /><br />

        <strong>Paso 2 · Sacar raíz:</strong><br />
        c = √225 = <strong>15 cm</strong>.<br /><br />

        <strong>Observación:</strong> (9, 12, 15) es múltiplo de (3, 4, 5)
        por 3. Si reconocías la terna, podías saltear el cálculo.
      </WorkedExample>

      <WorkedExample titulo="Calcular un cateto">
        Un triángulo rectángulo tiene hipotenusa 13 cm y un cateto 5 cm. ¿Cuánto
        mide el otro cateto?<br /><br />

        <strong>Paso 1 · Despejar Pitágoras:</strong><br />
        13² = 5² + b² → 169 = 25 + b² → b² = 144.<br /><br />

        <strong>Paso 2 · Raíz:</strong> b = <strong>12 cm</strong>.<br /><br />

        Reconocible: terna (5, 12, 13) clásica.
      </WorkedExample>

      <WorkedExample titulo="Aplicación · escalera apoyada en pared">
        Una escalera de 5 m de largo se apoya en una pared. El pie de la
        escalera está a 3 m de la pared. ¿A qué altura llega la escalera?<br /><br />

        <strong>Diagrama mental:</strong> la escalera es la hipotenusa, la
        distancia al suelo es un cateto, la altura es el otro cateto.<br /><br />

        5² = 3² + h² → 25 = 9 + h² → h² = 16 → h = <strong>4 m</strong>.<br /><br />

        Terna (3, 4, 5) en acción.
      </WorkedExample>

      <Conexion>
        Pitágoras es la base de:<br />
        • <strong>Distancia entre dos puntos</strong> en geometría analítica:
        d = √((x₂−x₁)² + (y₂−y₁)²).<br />
        • <strong>Razones trigonométricas</strong> (sen, cos, tan) en triángulos
        rectángulos.<br />
        • <strong>Identidad fundamental:</strong> sen²x + cos²x = 1 (es Pitágoras
        disfrazado).
      </Conexion>

      <AutoCheck
        pregunta="¿Cuál es la hipotenusa de un triángulo rectángulo con catetos 7 y 24?"
        opciones={["25", "30", "26", "23"]}
        correctaIdx={0}
        explicacion="c² = 7² + 24² = 49 + 576 = 625. c = 25. (Terna 7-24-25)."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc07 · Perímetro y área
// ─────────────────────────────────────────────────────────────────────────────
function EscPerimArea() {
  return (
    <EscenaRica>
      <Titulo>Perímetro y área del triángulo</Titulo>

      <Definicion termino="Perímetro">
        Suma de las longitudes de los 3 lados: <strong>P = a + b + c</strong>.
      </Definicion>

      <Definicion termino="Área (fórmula base × altura)">
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          A = (base × altura) / 2
        </span><br /><br />
        Importante: la altura debe ser <strong>perpendicular</strong> a la base.
      </Definicion>

      <Ejemplo titulo="Triángulo con base 8 cm y altura 5 cm">
        A = (8 · 5) / 2 = 40/2 = 20 cm².
      </Ejemplo>

      <Definicion termino="Fórmula de Herón (cuando solo conoces los 3 lados)">
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          A = √(s(s−a)(s−b)(s−c))
        </span><br /><br />
        donde <strong>s = (a+b+c)/2</strong> es el semiperímetro.
      </Definicion>

      <WorkedExample titulo="Herón aplicado">
        Triángulo con lados 5, 6, 7. ¿Área?<br /><br />

        <strong>Paso 1 · Semiperímetro:</strong><br />
        s = (5+6+7)/2 = 9.<br /><br />

        <strong>Paso 2 · Aplicar fórmula:</strong><br />
        A = √(9(9−5)(9−6)(9−7)) = √(9·4·3·2) = √216 = 6√6 ≈ <strong>14.7 cm²</strong>.
      </WorkedExample>

      <Mnemotecnia>
        <strong>Tabla rápida de áreas especiales</strong>:<br />
        • <strong>Equilátero de lado L</strong>: A = (L²√3) / 4.<br />
        • <strong>Rectángulo isósceles</strong> (catetos iguales = L): A = L²/2.<br />
        • <strong>Rectángulo de catetos a y b</strong>: A = ab/2.<br /><br />
        Estos atajos aparecen MUCHO en el examen.
      </Mnemotecnia>

      <Cuidado>
        En triángulos rectángulos, los 2 catetos pueden usarse como base y
        altura. NO hace falta buscar la altura "perpendicular": ya son
        perpendiculares entre sí.
      </Cuidado>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc08 · Líneas notables
// ─────────────────────────────────────────────────────────────────────────────
function EscNotables() {
  return (
    <EscenaRica>
      <Titulo>Líneas notables del triángulo</Titulo>
      <Parrafo>
        Hay 4 tipos de líneas especiales en cada triángulo. Cada tipo determina
        un <strong>punto de concurrencia</strong> distinto.
      </Parrafo>

      <Definicion termino="Mediana">
        Segmento desde un vértice al punto medio del lado opuesto.<br />
        Las 3 medianas se cortan en el <strong>baricentro</strong> (centro de
        gravedad). El baricentro divide cada mediana en razón 2:1 (la parte
        más cerca del vértice es el doble).
      </Definicion>

      <Definicion termino="Altura">
        Segmento perpendicular desde un vértice al lado opuesto (o a su
        prolongación).<br />
        Las 3 alturas se cortan en el <strong>ortocentro</strong>.
      </Definicion>

      <Definicion termino="Mediatriz">
        Recta perpendicular al lado por su punto medio (no pasa necesariamente
        por un vértice).<br />
        Las 3 mediatrices se cortan en el <strong>circuncentro</strong>, centro
        de la circunferencia circunscrita (que pasa por los 3 vértices).
      </Definicion>

      <Definicion termino="Bisectriz">
        Recta que divide a un ángulo interior en dos partes iguales.<br />
        Las 3 bisectrices se cortan en el <strong>incentro</strong>, centro de
        la circunferencia inscrita (tangente a los 3 lados).
      </Definicion>

      <Mnemotecnia>
        <strong>"M-A-M-B → B-O-C-I"</strong>:<br />
        • <strong>M</strong>ediana → <strong>B</strong>aricentro.<br />
        • <strong>A</strong>ltura → <strong>O</strong>rtocentro.<br />
        • <strong>M</strong>ediatriz → <strong>C</strong>ircuncentro.<br />
        • <strong>B</strong>isectriz → <strong>I</strong>ncentro.<br /><br />
        Frase: "<em>las Medianas Bajan al Baricentro, las Alturas al Ortocentro,
        las Mediatrices Cierran el Circuncentro, las Bisectrices Inscriben el
        Incentro</em>".
      </Mnemotecnia>

      <PorQue>
        <strong>¿Para qué sirve cada centro?</strong><br />
        • <strong>Baricentro</strong>: centro físico de gravedad. Equilibrio.<br />
        • <strong>Ortocentro</strong>: aparece en problemas avanzados de
        geometría (poco frecuente en examen).<br />
        • <strong>Circuncentro</strong>: para inscribir/circunscribir
        circunferencias.<br />
        • <strong>Incentro</strong>: equidista de los 3 lados.
      </PorQue>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc09 · Errores
// ─────────────────────────────────────────────────────────────────────────────
function EscErrores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>

      <Misconception titulo="Error 1 · usar Pitágoras en triángulos NO rectángulos">
        c² = a² + b² SOLO vale para triángulos rectángulos. Si el triángulo no
        tiene ángulo recto, esta fórmula da resultados incorrectos.<br /><br />
        Para triángulos no rectángulos se usa la <strong>ley de cosenos</strong>:
        c² = a² + b² − 2ab·cos(C). Pero eso es otra lección.
      </Misconception>

      <Misconception titulo="Error 2 · confundir hipotenusa con cateto">
        La hipotenusa es la "estrella" de Pitágoras. SIEMPRE es el lado MÁS
        LARGO del triángulo rectángulo (porque es opuesto al ángulo de 90°, el
        más grande).<br /><br />
        Si te dan los lados 6, 8, 10 y te dicen "es rectángulo": el 10 es la
        hipotenusa, los 6 y 8 son catetos. 10² = 100, y 6²+8² = 36+64 = 100 ✓.
      </Misconception>

      <Misconception titulo="Error 3 · sumar ángulos exteriores como interiores">
        Los 3 ángulos INTERIORES suman 180°. Pero la suma de los 3 ángulos
        EXTERIORES de cualquier polígono es 360°.<br /><br />
        En un triángulo: 3 interiores = 180° + 3 exteriores = 360°. Total
        suplementos: 3·180 = 540 = 180 + 360 ✓.
      </Misconception>

      <Misconception titulo="Error 4 · creer que la mediana es la altura">
        Mediana: va al punto MEDIO del lado opuesto. <br />
        Altura: es PERPENDICULAR al lado opuesto.<br /><br />
        Solo coinciden en triángulos isósceles (la mediana del lado distinto sí
        es altura) y en equiláteros (las 3 medianas son también alturas).
      </Misconception>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc10 · Práctica
// ─────────────────────────────────────────────────────────────────────────────
function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Los ángulos interiores de un triángulo son α, 2α, 3α. ¿Cuánto vale α?",
      o: ["30°", "20°", "45°", "60°"],
      c: 0,
      ex: "α + 2α + 3α = 6α = 180° → α = 30°.",
    },
    {
      p: "Hipotenusa de un triángulo rectángulo con catetos 8 y 15:",
      o: ["17", "18", "20", "23"],
      c: 0,
      ex: "c² = 64 + 225 = 289 → c = 17. (Terna 8-15-17).",
    },
    {
      p: "Un triángulo equilátero tiene perímetro 18 cm. ¿Cuánto mide cada lado?",
      o: ["6 cm", "9 cm", "3 cm", "18 cm"],
      c: 0,
      ex: "3 lados iguales → cada lado = 18/3 = 6 cm.",
    },
    {
      p: "Un triángulo isósceles tiene un ángulo de la base de 70°. ¿Cuánto mide el ángulo del vértice?",
      o: ["40°", "70°", "110°", "20°"],
      c: 0,
      ex: "Los 2 ángulos de la base son iguales = 70° cada uno. Vértice = 180 − 70 − 70 = 40°.",
    },
    {
      p: "Un triángulo rectángulo tiene catetos 5 y 12. ¿Cuál es su perímetro?",
      o: ["30", "25", "17", "20"],
      c: 0,
      ex: "Hipotenusa = √(25+144) = 13. Perímetro = 5 + 12 + 13 = 30.",
    },
    {
      p: "El punto donde se cortan las medianas de un triángulo se llama:",
      o: ["Baricentro", "Ortocentro", "Circuncentro", "Incentro"],
      c: 0,
      ex: "Medianas → Baricentro (centro de gravedad).",
    },
    {
      p: "¿Cuál de estos NO puede ser un triángulo? (lados a, b, c)",
      o: ["3, 4, 8", "3, 4, 5", "6, 8, 10", "5, 5, 5"],
      c: 0,
      ex: "Desigualdad triangular: la suma de 2 lados debe ser mayor que el tercero. 3+4=7 < 8, no forma triángulo.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final · 7 ejercicios</Titulo>
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
          <div style={{ fontSize: 14, color: "#065f46", marginTop: 6 }}>
            {ok === ejs.length && "🎉 Dominas triángulos."}
            {ok >= 5 && ok < ejs.length && "Repasa Pitágoras y la desigualdad triangular."}
            {ok < 5 && "Vuelve al teorema de Pitágoras y a las clasificaciones."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
