"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
} from "../_components/atoms";
import { Pizarra, Repetir, Pot, Igual, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

// Animación "factor común sale afuera": 6x + 9 → 3·2x + 3·3 → 3(2x + 3).
// Todo HTML animado (sin coordenadas SVG) → robusto.
function FactorComunAnim() {
  const [paso, setPaso] = useState(0);
  const v = LIENZO.accent;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={150} onClick={() => setPaso((p) => (p < 2 ? p + 1 : 0))}>
        <div style={{
          fontFamily: "var(--font-crimson), serif", fontWeight: 500,
          fontSize: "clamp(30px, 6vw, 48px)", color: LIENZO.fg, textAlign: "center",
        }}>
          {paso === 0 && <span>6x + 9</span>}
          {paso === 1 && (
            <span>
              <span style={{ color: v }}>3</span>·2x <span style={{ color: LIENZO.fgDim, margin: "0 0.3em" }}>+</span> <span style={{ color: v }}>3</span>·3
            </span>
          )}
          {paso === 2 && (
            <span>
              <span style={{ color: v }}>3</span>
              <span style={{ color: LIENZO.fg }}>(2x + 3)</span>
            </span>
          )}
        </div>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic", minHeight: 20 }}>
        {paso === 0 && "Tocá: ¿qué número está en los dos términos?"}
        {paso === 1 && "El 3 se repite en ambos…"}
        {paso === 2 && "…y sale afuera. Eso es factorizar."}
      </div>
      {paso === 2 && <div style={{ display: "flex", justifyContent: "center" }}><Repetir onClick={() => setPaso(0)} /></div>}
    </div>
  );
}

// Diferencia de cuadrados por cancelación FOIL: (a+b)(a−b) = a²−ab+ab−b² = a²−b².
// Los términos del medio se tachan y desvanecen.
function DifCuadradosAnim() {
  const [paso, setPaso] = useState(0);
  const cancelado = paso >= 2;
  const medioStyle = {
    color: cancelado ? LIENZO.fgFaint : LIENZO.accent,
    textDecoration: cancelado ? "line-through" : "none",
    transition: "all 0.5s",
  } as React.CSSProperties;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={170} onClick={() => setPaso((p) => (p < 2 ? p + 1 : 0))}>
        <div style={{
          fontFamily: "var(--font-crimson), serif", fontWeight: 500,
          fontSize: "clamp(24px, 4.6vw, 40px)", color: LIENZO.fg, textAlign: "center", lineHeight: 1.5,
        }}>
          <div>(a + b)(a − b)</div>
          {paso >= 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Igual /> <Pot b="a" e="2" c="fg" />{" "}
              <span style={medioStyle}>− ab</span>{" "}
              <span style={medioStyle}>+ ab</span>{" "}
              − <Pot b="b" e="2" c="fg" />
            </motion.div>
          )}
          {paso >= 2 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ color: LIENZO.ok }}>
              <Igual /> <Pot b="a" e="2" c="ok" /> − <Pot b="b" e="2" c="ok" />
            </motion.div>
          )}
        </div>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic", minHeight: 20 }}>
        {paso === 0 && "Tocá para desarrollar el producto"}
        {paso === 1 && "Mirá los dos términos del medio: −ab y +ab…"}
        {paso === 2 && "…se cancelan. Por eso queda solo a² − b²."}
      </div>
      {paso === 2 && <div style={{ display: "flex", justifyContent: "center" }}><Repetir onClick={() => setPaso(0)} /></div>}
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="03"
      tituloUnidad="Factorización"
      escenas={[
        { titulo: "¿Qué es factorizar?", componente: Esc01_Intro },
        { titulo: "Factor común", componente: Esc02_FactorComun },
        { titulo: "Factor común por grupos", componente: Esc03_Grupos },
        { titulo: "Diferencia de cuadrados", componente: Esc04_DifCuad },
        { titulo: "Trinomio cuadrado perfecto", componente: Esc05_TCP },
        { titulo: "Trinomio general x² + bx + c", componente: Esc06_Trinomio },
        { titulo: "Estrategia: ¿cuál uso?", componente: Esc07_Cual },
        { titulo: "Errores comunes", componente: Esc08_Errores },
        { titulo: "Práctica final", componente: Esc09_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Factorizar: lo opuesto de desarrollar</Titulo>
      <Definicion termino="factorizar">
        <strong>Factorizar</strong> un polinomio es escribirlo como un <strong>producto
        de factores</strong> (que ya no se pueden descomponer más).
      </Definicion>
      <Parrafo>
        Es lo opuesto de <strong>desarrollar</strong>. Si desarrollar va de
        (x+2)(x+3) hacia x²+5x+6, factorizar va al revés: de x²+5x+6 hacia (x+2)(x+3).
      </Parrafo>
      <Resumen>
        🎯 ¿Para qué sirve?<br />
        • <strong>Resolver ecuaciones</strong>: si (x−3)(x+5) = 0, entonces x=3 ó x=−5.<br />
        • <strong>Simplificar fracciones algebraicas</strong>: cancelar factores comunes.<br />
        • <strong>Encontrar raíces</strong>: cada factor da una raíz.<br />
        • <strong>Análisis de funciones</strong>: dominio, ceros, signos.
      </Resumen>
      <PorQue>
        Factorizar es esencial porque <strong>los productos son más fáciles de analizar
        que las sumas</strong>. "Algo·algo = 0" es trivial (uno de los dos es 0). "Algo + algo = 0" no.
      </PorQue>

      <Hook>
        Factorización es una de las habilidades <strong>más usadas</strong> en matemática.
        Aparece adentro de: resolver cuadráticas, simplificar fracciones algebraicas,
        encontrar raíces, MCD/MCM. En el UMSS aparece como tarea directa en 2-3 preguntas, y
        como paso intermedio en muchas más.
      </Hook>

      <Mnemotecnia>
        <strong>"FC-G-DC-TCP-T" · 5 métodos en orden de prueba</strong>:<br />
        <strong>FC</strong> = Factor Común (SIEMPRE primero).<br />
        <strong>G</strong> = Grupos (4 términos).<br />
        <strong>DC</strong> = Diferencia de Cuadrados (a² − b²).<br />
        <strong>TCP</strong> = Trinomio Cuadrado Perfecto (a² ± 2ab + b²).<br />
        <strong>T</strong> = Trinomio x² + bx + c (busca 2 nº que suman b y multiplican c).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_FactorComun() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Caso 1: Factor común</Titulo>
      <Parrafo>
        Es el método <strong>más simple y siempre el primero a probar</strong>. Buscás
        algo que se repite en todos los términos y lo "sacás afuera".
      </Parrafo>

      <FactorComunAnim />

      <Ejemplo titulo="Factorizar 6x + 9">
        <Paso n={1}>¿Qué número divide a 6 y a 9? El <strong>3</strong>.</Paso>
        <Paso n={2}>6x = 3·2x · 9 = 3·3</Paso>
        <Paso n={3}>Saco el 3: <strong style={{ color: COLOR_OK }}>3(2x + 3)</strong></Paso>
        <Paso n={4}>Verificación: distribuyo y vuelve: 3·2x + 3·3 = 6x + 9 ✓</Paso>
      </Ejemplo>

      <Ejemplo titulo="Con letras: 4x³ − 8x²">
        <Paso n={1}>Coeficientes: MCD(4, 8) = 4.</Paso>
        <Paso n={2}>Letras: en ambos hay x. La menor potencia es x² (la repetida en ambos).</Paso>
        <Paso n={3}>Factor común: 4x².</Paso>
        <Paso n={4}>Saco: <strong style={{ color: COLOR_OK }}>4x²(x − 2)</strong>.</Paso>
      </Ejemplo>

      <Resumen>
        Receta: <strong>MCD de los coeficientes</strong> × <strong>menor potencia común de cada letra</strong>.
      </Resumen>

      <AutoCheck
        pregunta="Factorizá: 10x² + 15x"
        opciones={["5(2x² + 3x)", "5x(2x + 3)", "x(10x + 15)", "10x(x + 1.5)"]}
        correctaIdx={1}
        explicacion="MCD(10,15)=5. Menor x común = x. Factor común: 5x. Resultado: 5x(2x + 3)."
      />
    </EscenaRica>
  );
}

function Esc03_Grupos() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Caso 2: Factor común por grupos</Titulo>
      <Parrafo>
        Cuando hay <strong>4 términos</strong> y no hay un factor común a todos,
        se agrupan de a dos y se factoriza cada grupo.
      </Parrafo>

      <Ejemplo titulo="Factorizar ax + ay + bx + by">
        <Paso n={1}>Agrupo: (ax + ay) + (bx + by)</Paso>
        <Paso n={2}>En el primero, saco a: a(x + y). En el segundo, b: b(x + y).</Paso>
        <Paso n={3}>Ahora a(x+y) + b(x+y) tiene (x+y) común.</Paso>
        <Paso n={4}>Saco (x+y): <strong style={{ color: COLOR_OK }}>(x + y)(a + b)</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Para que funcione, después de agrupar debe quedar un <strong>paréntesis idéntico</strong>
        en los dos grupos. Si no, hay que reagrupar de otra forma o probar otro método.
      </Cuidado>

      <Ejemplo titulo="Más complejo: 6x³ + 4x² − 9x − 6">
        <Paso n={1}>Agrupo: (6x³ + 4x²) + (−9x − 6).</Paso>
        <Paso n={2}>Primero: 2x²(3x + 2). Segundo: −3(3x + 2).</Paso>
        <Paso n={3}>Ambos tienen (3x + 2). Saco: <strong style={{ color: COLOR_OK }}>(3x + 2)(2x² − 3)</strong>.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_DifCuad() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Caso 3: Diferencia de cuadrados</Titulo>
      <Resumen>
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a² − b² = (a + b)(a − b)
        </span>
      </Resumen>
      <Parrafo>
        Reconocés este patrón cuando hay <strong>dos cuadrados restándose</strong> (NO hay
        término del medio).
      </Parrafo>

      <DifCuadradosAnim />

      <Ejemplo titulo="Ejemplos directos">
        <Paso n={1}>x² − 9 = (x + 3)(x − 3) (porque 9 = 3²)</Paso>
        <Paso n={2}>x² − 25 = (x + 5)(x − 5)</Paso>
        <Paso n={3}>4x² − 49 = (2x + 7)(2x − 7) (porque 4x² = (2x)² y 49 = 7²)</Paso>
      </Ejemplo>

      <Cuidado>
        Funciona SOLO con <strong>diferencia</strong>. <br />
        x² + 9 NO se factoriza en reales (no hay (x+a)(x+b) con coeficientes reales).
      </Cuidado>

      <PorQue>
        Sale de FOIL al revés: (a+b)(a−b) = a² − ab + ab − b² = a² − b². Los términos
        del medio se cancelan.
      </PorQue>

      <AutoCheck
        pregunta="Factorizá: x² − 16"
        opciones={["(x − 4)²", "(x + 4)(x − 4)", "(x + 8)(x − 2)", "x(x − 16)"]}
        correctaIdx={1}
        explicacion="16 = 4². Patrón a²−b²: (x+4)(x−4)."
      />
    </EscenaRica>
  );
}

// TCP geométrico: cuadrado (a+b)² descompuesto en 4 áreas:
//   a²  |  ab
//   ab  |  b²
// Tocar revela las 4 áreas y muestra que la suma = (a+b)² = a² + 2ab + b².
function TCPGeometrico() {
  const [on, setOn] = useState(false);
  const W = 360, H = 200, ax = 100, bx = 70;
  const L = 50, T = 18;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox={`0 0 ${W + L + 40} ${H + T + 40}`}
          preserveAspectRatio="xMidYMid meet"
          onClick={() => setOn((v) => !v)}
          style={{ fontFamily: "var(--font-crimson), serif", cursor: "pointer" }}>
          {/* a² (verde) */}
          <motion.rect x={L} y={T} width={ax} height={ax}
            fill={LIENZO.ok} fillOpacity={0.18} stroke={LIENZO.ok} strokeWidth="2"
            initial={false} animate={{ opacity: 1 }} />
          <text x={L + ax / 2} y={T + ax / 2 + 6} textAnchor="middle"
            fontSize="24" fill={LIENZO.ok} fontWeight="600">a²</text>
          {/* ab arriba (violeta) */}
          <motion.rect x={L + ax} y={T} width={bx} height={ax}
            fill={LIENZO.accent} fillOpacity={on ? 0.18 : 0.06} stroke={LIENZO.accent} strokeWidth="2"
            animate={{ fillOpacity: on ? 0.18 : 0.06 }} transition={{ duration: 0.4 }} />
          <text x={L + ax + bx / 2} y={T + ax / 2 + 6} textAnchor="middle"
            fontSize="22" fill={LIENZO.accent} fontWeight="600">ab</text>
          {/* ab izq (violeta) */}
          <motion.rect x={L} y={T + ax} width={ax} height={bx}
            fill={LIENZO.accent} fillOpacity={on ? 0.18 : 0.06} stroke={LIENZO.accent} strokeWidth="2"
            animate={{ fillOpacity: on ? 0.18 : 0.06 }} transition={{ duration: 0.4, delay: 0.1 }} />
          <text x={L + ax / 2} y={T + ax + bx / 2 + 6} textAnchor="middle"
            fontSize="22" fill={LIENZO.accent} fontWeight="600">ab</text>
          {/* b² (verde) */}
          <motion.rect x={L + ax} y={T + ax} width={bx} height={bx}
            fill={LIENZO.ok} fillOpacity={0.18} stroke={LIENZO.ok} strokeWidth="2" />
          <text x={L + ax + bx / 2} y={T + ax + bx / 2 + 6} textAnchor="middle"
            fontSize="20" fill={LIENZO.ok} fontWeight="600">b²</text>
          {/* etiquetas a, b en bordes */}
          <text x={L + ax / 2} y={T - 4} textAnchor="middle" fontSize="14"
            fill={LIENZO.fgDim} fontStyle="italic">a</text>
          <text x={L + ax + bx / 2} y={T - 4} textAnchor="middle" fontSize="14"
            fill={LIENZO.fgDim} fontStyle="italic">b</text>
          <text x={L - 8} y={T + ax / 2 + 4} textAnchor="end" fontSize="14"
            fill={LIENZO.fgDim} fontStyle="italic">a</text>
          <text x={L - 8} y={T + ax + bx / 2 + 4} textAnchor="end" fontSize="14"
            fill={LIENZO.fgDim} fontStyle="italic">b</text>
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim, minHeight: 22 }}>
        {on
          ? <>Área total = <b style={{ color: LIENZO.ok }}>a²</b> + <b style={{ color: LIENZO.accent }}>2·ab</b> + <b style={{ color: LIENZO.ok }}>b²</b> = (a + b)²</>
          : <span style={{ fontStyle: "italic", color: LIENZO.fgFaint }}>Tocá: por qué el 2ab del medio</span>}
      </div>
    </div>
  );
}

function Esc05_TCP() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Caso 4: Trinomio cuadrado perfecto (TCP)</Titulo>
      <Resumen>
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a² + 2ab + b² = (a + b)²<br />
          a² − 2ab + b² = (a − b)²
        </span>
      </Resumen>

      <Parrafo>
        Reconocés un TCP cuando el trinomio es del cuadrado de un binomio. Verificación:
      </Parrafo>

      <Resumen>
        ✓ El primer y último término son <strong>cuadrados perfectos</strong>.<br />
        ✓ El término del medio es <strong>2 veces el producto de sus raíces</strong>.
      </Resumen>

      <TCPGeometrico />

      <Ejemplo titulo="¿x² + 6x + 9 es TCP?">
        <Paso n={1}>√x² = x. √9 = 3. Doble producto: 2·x·3 = 6x. ✓ Coincide.</Paso>
        <Paso n={2}>Factorización: <strong style={{ color: COLOR_OK }}>(x + 3)²</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="¿x² − 10x + 25 es TCP?">
        <Paso n={1}>√x² = x. √25 = 5. Doble: 2·x·5 = 10x. ✓ Coincide.</Paso>
        <Paso n={2}>El signo del medio es −, entonces es <strong style={{ color: COLOR_OK }}>(x − 5)²</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Si el doble producto NO coincide, NO es TCP. Por ejemplo, x² + 5x + 9 NO es TCP
        (doble producto sería 6x, no 5x).
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_Trinomio() {
  return (
    <EscenaRica>
      <Titulo>Caso 5: Trinomio general x² + bx + c</Titulo>
      <Parrafo>
        Para factorizar <strong>x² + bx + c</strong>, buscás dos números que:
      </Parrafo>
      <Resumen>
        ✓ <strong>SUMEN</strong> b (el coeficiente del medio)<br />
        ✓ <strong>MULTIPLIQUEN</strong> c (el término independiente)
      </Resumen>

      <Ejemplo titulo="x² + 5x + 6">
        <Paso n={1}>Necesito 2 números que sumen 5 y multipliquen 6.</Paso>
        <Paso n={2}>Pruebo: 2 y 3 (suman 5 ✓, multiplican 6 ✓).</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>(x + 2)(x + 3)</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="x² − 7x + 12">
        <Paso n={1}>Sumen −7, multipliquen 12. Pruebo: −3 y −4.</Paso>
        <Paso n={2}>−3 + −4 = −7 ✓. (−3)·(−4) = 12 ✓.</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>(x − 3)(x − 4)</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="x² + 2x − 15">
        <Paso n={1}>Sumen 2, multipliquen −15. Pruebo signos: 5 y −3.</Paso>
        <Paso n={2}>5 + (−3) = 2 ✓. 5·(−3) = −15 ✓.</Paso>
        <Paso n={3}>Resultado: <strong style={{ color: COLOR_OK }}>(x + 5)(x − 3)</strong>.</Paso>
      </Ejemplo>

      <Resumen>
        Regla de signos:<br />
        • c &gt; 0 → los dos números tienen el mismo signo (el de b).<br />
        • c &lt; 0 → los dos tienen signos distintos.
      </Resumen>

      <AutoCheck
        pregunta="Factorizá: x² + 8x + 15"
        opciones={["(x + 3)(x + 5)", "(x + 15)(x + 1)", "(x − 3)(x − 5)", "(x + 8)(x + 7)"]}
        correctaIdx={0}
        explicacion="Dos números que sumen 8 y multipliquen 15: 3 y 5. Total: (x+3)(x+5)."
      />
    </EscenaRica>
  );
}

function Esc07_Cual() {
  return (
    <EscenaRica>
      <Titulo>Estrategia: ¿qué método uso?</Titulo>
      <Parrafo>
        Frente a un polinomio para factorizar, el orden recomendado de prueba es:
      </Parrafo>

      <Resumen>
        <Paso n={1}><strong>¿Hay factor común?</strong> → sacalo SIEMPRE primero.</Paso>
        <Paso n={2}><strong>¿Cuántos términos hay?</strong></Paso>
        <Paso n={3}>2 términos → ¿es diferencia de cuadrados (a²−b²)?</Paso>
        <Paso n={4}>3 términos → ¿es TCP? Si no, ¿trinomio x²+bx+c?</Paso>
        <Paso n={5}>4 términos → factor común por grupos.</Paso>
      </Resumen>

      <Ejemplo titulo="Aplicar la estrategia: 2x² − 18">
        <Paso n={1}>¿Factor común? Sí: 2. Saco: 2(x² − 9).</Paso>
        <Paso n={2}>¿x² − 9 es diferencia de cuadrados? Sí.</Paso>
        <Paso n={3}>Resultado final: <strong style={{ color: COLOR_OK }}>2(x + 3)(x − 3)</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        <strong>SIEMPRE</strong> probá factor común primero. Si lo salteás, te complicás
        la vida y a veces no podés terminar.
      </Cuidado>

      <WorkedExample titulo="Factorización completa · 'siempre hasta el fondo'">
        Factorizá: <strong>3x³ − 12x</strong>.<br /><br />

        <strong>Paso 1 · Factor común:</strong> MCD(3, 12) = 3. Letra común: x.<br />
        Sacando: 3x(x² − 4).<br /><br />

        <strong>Paso 2 · ¿Hay más para factorizar?</strong> Sí: x² − 4 es diferencia de
        cuadrados.<br />
        x² − 4 = (x + 2)(x − 2).<br /><br />

        <strong>Resultado final:</strong> 3x · (x + 2)(x − 2) = <strong>3x(x+2)(x−2)</strong>.<br /><br />

        <strong>Regla:</strong> después de aplicar UN método, volvé a mirar cada factor para
        ver si se factoriza MÁS. La factorización está terminada cuando cada factor es
        irreducible.<br /><br />

        <strong>Verificación:</strong> desarrollando para atrás:<br />
        3x(x+2)(x−2) = 3x(x² − 4) = 3x³ − 12x. ✓
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc08_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> "Factorizar" pero olvidar verificar. <br />
        <span style={{ fontSize: 13 }}>
          Siempre desarrollá tu factorización mentalmente para comprobar que vuelve al original.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Querer factorizar x² + 9 (suma de cuadrados). <br />
        <span style={{ fontSize: 13 }}>
          x² + 9 NO se factoriza en los reales. Solo la DIFERENCIA es factorizable.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> No sacar el factor común primero. <br />
        <span style={{ fontSize: 13 }}>
          Si te complicás factorizando 4x² − 16 sin sacar el 4 antes, mal. Hacé 4(x²−4) = 4(x+2)(x−2).
        </span>
      </Cuidado>

      <Misconception titulo="Diferencia de cuadrados sí, suma de cuadrados NO">
        <strong>x² − 9 = (x+3)(x−3)</strong> ✓ Diferencia de cuadrados factoriza.<br />
        <strong>x² + 9</strong> ❌ NO factoriza en los reales. Punto.<br /><br />
        Las sumas de cuadrados solo factorizan en los complejos: x² + 9 = (x + 3i)(x − 3i),
        que está fuera del UMSS. Si en el examen ves x² + (algo positivo) y te piden
        factorizar, la respuesta correcta es "no es factorizable" o queda como está.
      </Misconception>

      <Conexion>
        Factorización conecta con: <strong>Productos notables</strong> (la operación
        inversa), <strong>Ecuaciones de 2do grado</strong> (factorizar es uno de los
        métodos de resolución), <strong>MCD/MCM algebraicos</strong> (requieren factorización
        previa), <strong>Fracciones algebraicas</strong> (para simplificar y sumar).
      </Conexion>
    </EscenaRica>
  );
}

function Esc09_Practica() {
  const ejs = useMemo(() => [
    { p: "Factorizá: 8x − 12", o: ["4(2x − 3)", "2(4x − 6)", "4(2x − 12)", "8(x − 1.5)"], c: 0, ex: "MCD(8,12)=4. Saco 4: 4(2x − 3)." },
    { p: "Factorizá: x² − 49", o: ["(x − 7)²", "(x + 7)(x − 7)", "(x − 49)(x + 1)", "no se puede"], c: 1, ex: "Diferencia de cuadrados: 49=7². Resultado: (x+7)(x−7)." },
    { p: "Factorizá: x² − 8x + 16", o: ["(x − 4)²", "(x + 4)²", "(x − 8)(x − 2)", "(x − 4)(x + 4)"], c: 0, ex: "TCP: √x²=x, √16=4, 2·x·4=8x ✓. Signo −: (x−4)²." },
    { p: "Factorizá: x² + 5x − 14", o: ["(x + 7)(x − 2)", "(x − 7)(x + 2)", "(x + 7)(x + 2)", "(x − 14)(x + 1)"], c: 0, ex: "Sumen 5, multipliquen −14: 7 y −2. → (x+7)(x−2)." },
    { p: "Factorizá: 3x² − 27", o: ["3(x² − 9)", "3(x + 3)(x − 3)", "(3x + 3)(x − 9)", "(x + 9)(3x − 3)"], c: 1, ex: "Primero factor común 3: 3(x²−9). Después dif. cuadrados: 3(x+3)(x−3)." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios: combiná los 5 casos:</Parrafo>
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
            {ok === ejs.length && "🎉 Sos máquina factorizando."}
            {ok >= 3 && ok < ejs.length && "Bien. Releí la estrategia (escena 7) para elegir mejor el método."}
            {ok < 3 && "Volvé a la estrategia (escena 7). Es la clave: probar primero factor común."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
