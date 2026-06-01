"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
} from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

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
      <Parrafo>5 ejercicios — combiná los 5 casos:</Parrafo>
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
