"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="GT-07"
      tituloUnidad="Identidades y ecuaciones trigonométricas"
      escenas={[
        { titulo: "Identidades fundamentales", componente: EscFundamentales },
        { titulo: "Identidades de ángulos opuestos, complementarios, suplementarios", componente: EscReduccion },
        { titulo: "Identidades de la suma y diferencia", componente: EscSumaDiferencia },
        { titulo: "Identidades del ángulo doble", componente: EscDoble },
        { titulo: "Simplificación de expresiones", componente: EscSimplificacion },
        { titulo: "Ecuaciones trigonométricas básicas", componente: EscEcuacionesBasicas },
        { titulo: "Ecuaciones trigonométricas avanzadas", componente: EscEcuacionesAvanzadas },
        { titulo: "Errores comunes", componente: EscErrores },
        { titulo: "Práctica final", componente: EscPractica },
      ]}
    />
  );
}

function EscFundamentales() {
  return (
    <EscenaRica>
      <Titulo>Identidades fundamentales</Titulo>

      <Hook>
        Las identidades trigonométricas aparecen en el examen FCyT para
        "simplificar la siguiente expresión". El examen 1op-2-2025 tuvo una
        idéntica (G10). Memorizar las identidades clave es OBLIGATORIO.
      </Hook>

      <Definicion termino="Identidad">
        Igualdad que se cumple para CUALQUIER valor de la variable (no como una
        ecuación, que solo vale para ciertos valores).
      </Definicion>

      <Resumen>
        <strong>Identidades pitagóricas (las 3 más importantes)</strong>:<br /><br />
        • <strong>sen²θ + cos²θ = 1</strong> (la fundamental, sale de Pitágoras).<br />
        • 1 + tan²θ = sec²θ (dividí la anterior por cos²θ).<br />
        • 1 + cot²θ = csc²θ (dividí por sen²θ).
      </Resumen>

      <Resumen>
        <strong>Identidades de cociente</strong>:<br />
        • tan θ = sen θ / cos θ.<br />
        • cot θ = cos θ / sen θ.<br /><br />
        <strong>Identidades recíprocas</strong>:<br />
        • csc θ = 1 / sen θ.<br />
        • sec θ = 1 / cos θ.<br />
        • cot θ = 1 / tan θ.
      </Resumen>

      <Mnemotecnia>
        <strong>De la identidad fundamental podés despejar</strong>:<br />
        • sen²θ = 1 − cos²θ → sen θ = ±√(1 − cos²θ).<br />
        • cos²θ = 1 − sen²θ → cos θ = ±√(1 − sen²θ).<br /><br />
        Estas son ULTRA útiles cuando te dan una razón y te piden otra.
      </Mnemotecnia>

      <WorkedExample titulo="Aplicación · de sen a cos">
        Si sen θ = 3/5 y θ es agudo, calcular cos θ y tan θ.<br /><br />

        <strong>cos θ:</strong> sen² + cos² = 1 → cos²θ = 1 − 9/25 = 16/25 →
        cos θ = 4/5 (positivo porque θ es agudo).<br /><br />

        <strong>tan θ:</strong> tan = sen/cos = (3/5)/(4/5) = 3/4.<br /><br />

        Sin usar el triángulo, solo con identidades.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscReduccion() {
  return (
    <EscenaRica>
      <Titulo>Identidades de reducción · ángulos especiales</Titulo>

      <Resumen>
        <strong>Ángulos opuestos (función PAR vs IMPAR)</strong>:<br />
        • sen(−θ) = −sen θ (impar).<br />
        • cos(−θ) = cos θ (par).<br />
        • tan(−θ) = −tan θ (impar).
      </Resumen>

      <Resumen>
        <strong>Ángulos complementarios (90° − θ)</strong>:<br />
        • sen(90° − θ) = cos θ.<br />
        • cos(90° − θ) = sen θ.<br />
        • tan(90° − θ) = cot θ.<br /><br />
        Cofunción: "co-seno" es seno del complemento. Por eso se llaman así.
      </Resumen>

      <Resumen>
        <strong>Ángulos suplementarios (180° − θ)</strong>:<br />
        • sen(180° − θ) = sen θ.<br />
        • cos(180° − θ) = −cos θ.<br />
        • tan(180° − θ) = −tan θ.
      </Resumen>

      <Resumen>
        <strong>Ángulos a 180° + θ</strong>:<br />
        • sen(180° + θ) = −sen θ.<br />
        • cos(180° + θ) = −cos θ.<br />
        • tan(180° + θ) = tan θ.<br /><br />
        <strong>Ángulos a 360° − θ</strong>:<br />
        • sen(360° − θ) = −sen θ.<br />
        • cos(360° − θ) = cos θ.
      </Resumen>

      <Mnemotecnia>
        <strong>Regla mnemónica · cuadrante</strong>:<br />
        • Cuadrante I (0-90°): TODO positivo.<br />
        • Cuadrante II (90-180°): solo SEN positivo.<br />
        • Cuadrante III (180-270°): solo TAN positivo.<br />
        • Cuadrante IV (270-360°): solo COS positivo.<br /><br />
        Frase: "<em>Todos Saben Tomar Café</em>" (Todos, Seno, Tangente, Coseno).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSumaDiferencia() {
  return (
    <EscenaRica>
      <Titulo>Identidades de suma y diferencia</Titulo>

      <Resumen>
        <strong>Suma de ángulos</strong>:<br />
        • sen(A + B) = sen A cos B + cos A sen B.<br />
        • cos(A + B) = cos A cos B − sen A sen B.<br />
        • tan(A + B) = (tan A + tan B) / (1 − tan A tan B).<br /><br />
        <strong>Diferencia</strong>:<br />
        • sen(A − B) = sen A cos B − cos A sen B.<br />
        • cos(A − B) = cos A cos B + sen A sen B.<br />
        • tan(A − B) = (tan A − tan B) / (1 + tan A tan B).
      </Resumen>

      <Mnemotecnia>
        <strong>Truco · "S de seno · C de coseno"</strong>:<br />
        • sen suma: "S-C + C-S" (sen·cos + cos·sen). <em>Mismo orden, suma</em>.<br />
        • cos suma: "C-C − S-S" (cos·cos − sen·sen). <em>Cambian de signo</em>.<br /><br />
        Para la diferencia: cambiá el signo del medio.
      </Mnemotecnia>

      <WorkedExample titulo="Aplicación · ángulos no notables">
        Calcular sen 75° usando 75° = 45° + 30°.<br /><br />

        sen 75° = sen(45° + 30°) = sen 45° cos 30° + cos 45° sen 30°<br />
        = (√2/2)(√3/2) + (√2/2)(1/2)<br />
        = (√6 + √2) / 4 ≈ 0.966.<br /><br />

        <strong>Verificación:</strong> sen 75° = cos 15° (cofunción), y
        cos 15° ≈ 0.966 ✓.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscDoble() {
  return (
    <EscenaRica>
      <Titulo>Identidades del ángulo doble</Titulo>

      <Resumen>
        <strong>Ángulo doble</strong>:<br />
        • sen(2θ) = 2 sen θ cos θ.<br />
        • cos(2θ) = cos²θ − sen²θ = 2cos²θ − 1 = 1 − 2sen²θ (3 formas
        equivalentes).<br />
        • tan(2θ) = 2 tan θ / (1 − tan²θ).
      </Resumen>

      <PorQue>
        <strong>¿De dónde sale sen(2θ)?</strong><br />
        Usando la suma con A = B = θ:<br />
        sen(θ + θ) = sen θ cos θ + cos θ sen θ = 2 sen θ cos θ.<br /><br />
        Lo mismo para coseno (3 formas porque sen²+cos²=1 permite reemplazar).
      </PorQue>

      <Mnemotecnia>
        <strong>Cuándo elegir cuál forma de cos(2θ) usar</strong>:<br />
        • Si te dan cos θ y querés cos(2θ): usá 2cos²θ − 1.<br />
        • Si te dan sen θ y querés cos(2θ): usá 1 − 2sen²θ.<br />
        • Si te dan tan θ: usá la fórmula con tangente.<br /><br />
        Elegir la forma correcta ahorra cuentas.
      </Mnemotecnia>

      <Resumen>
        <strong>Ángulo mitad</strong> (derivadas del doble):<br />
        • sen²(θ/2) = (1 − cos θ) / 2.<br />
        • cos²(θ/2) = (1 + cos θ) / 2.<br />
        • tan²(θ/2) = (1 − cos θ) / (1 + cos θ).
      </Resumen>
    </EscenaRica>
  );
}

function EscSimplificacion() {
  return (
    <EscenaRica>
      <Titulo>Simplificación de expresiones trigonométricas</Titulo>

      <Parrafo>
        Esta es el tipo de pregunta MÁS COMÚN en el examen FCyT sobre
        trigonometría. Te dan una expresión enredada y hay que reducirla a una
        de las 6 funciones.
      </Parrafo>

      <WorkedExample titulo="Simplificación tipo examen 1op-2-2025 G10">
        Simplificar:<br />
        E = cos²(3π − x) · cos²(3π/2 − x) · sen(3π − x) / [cos(π − x) · cos²(5π/2 − x) · sen²(3π/2 − x)].<br /><br />

        <strong>Paso 1 · Aplicar reducciones</strong>:<br />
        • cos(3π − x) = cos(π − x) = −cos x. Entonces cos²(3π − x) = cos²x.<br />
        • cos(3π/2 − x) = −sen x. Entonces cos²(3π/2 − x) = sen²x.<br />
        • sen(3π − x) = sen(π − x) = sen x.<br />
        • cos(π − x) = −cos x.<br />
        • cos(5π/2 − x) = cos(π/2 − x) = sen x. Entonces cos²(5π/2 − x) = sen²x.<br />
        • sen(3π/2 − x) = −cos x. Entonces sen²(3π/2 − x) = cos²x.<br /><br />

        <strong>Paso 2 · Sustituir</strong>:<br />
        E = (cos²x)(sen²x)(sen x) / [(−cos x)(sen²x)(cos²x)]<br />
        = (sen x) / (−cos x) = <strong>−tan x</strong>.
      </WorkedExample>

      <Mnemotecnia>
        <strong>Estrategia general de simplificación</strong>:<br />
        1. Aplicá identidades de reducción para "limpiar" los ángulos
        compuestos (3π−x, π/2−x, etc.).<br />
        2. Cancelá factores comunes en numerador y denominador.<br />
        3. Si quedan sen y cos, considerá usar tan = sen/cos o las identidades
        pitagóricas.<br /><br />
        Reglas finales útiles: sen²+cos²=1, tan=sen/cos, sec=1/cos, csc=1/sen.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEcuacionesBasicas() {
  return (
    <EscenaRica>
      <Titulo>Ecuaciones trigonométricas básicas</Titulo>

      <Resumen>
        <strong>Estrategia general</strong>:<br />
        1. Aislá la función trigonométrica (sen x = c, cos x = c, etc.).<br />
        2. Encontrá UNA solución usando arcsen, arccos, arctan o valores
        notables.<br />
        3. Encontrá TODAS las soluciones en el intervalo pedido usando
        periodicidad.
      </Resumen>

      <WorkedExample titulo="Tipo 1 · sen x = valor conocido">
        Resolver sen x = 1/2 en [0°, 360°].<br /><br />

        <strong>Paso 1 · Solución principal:</strong> x = 30° (notable).<br /><br />

        <strong>Paso 2 · Otras soluciones en [0°, 360°]:</strong><br />
        sen es positivo en cuadrantes I y II. La otra solución es
        180° − 30° = 150°.<br /><br />

        <strong>Soluciones:</strong> x = 30° o x = 150°.
      </WorkedExample>

      <WorkedExample titulo="Tipo 2 · cos x = valor conocido">
        Resolver cos x = −1/2 en [0°, 360°].<br /><br />

        cos es negativo en cuadrantes II y III. El ángulo de referencia es 60°
        (cos 60° = 1/2).<br /><br />

        Soluciones: 180° − 60° = 120° y 180° + 60° = 240°.
      </WorkedExample>

      <Resumen>
        <strong>Soluciones generales</strong> (todos los reales):<br />
        • sen x = a → x = arcsen(a) + 360°k, o x = 180° − arcsen(a) + 360°k.<br />
        • cos x = a → x = ±arccos(a) + 360°k.<br />
        • tan x = a → x = arctan(a) + 180°k.<br /><br />
        donde k es cualquier entero.
      </Resumen>
    </EscenaRica>
  );
}

function EscEcuacionesAvanzadas() {
  return (
    <EscenaRica>
      <Titulo>Ecuaciones más complejas</Titulo>

      <WorkedExample titulo="Reducible a cuadrática">
        Resolver 2sen²x + sen x − 1 = 0 en [0°, 360°].<br /><br />

        <strong>Paso 1 · Sustitución</strong>: sea u = sen x.<br />
        2u² + u − 1 = 0.<br /><br />

        <strong>Paso 2 · Factorizar:</strong><br />
        (2u − 1)(u + 1) = 0 → u = 1/2 o u = −1.<br /><br />

        <strong>Paso 3 · Resolver cada caso:</strong><br />
        • sen x = 1/2 → x = 30° o 150°.<br />
        • sen x = −1 → x = 270°.<br /><br />

        Soluciones: 30°, 150°, 270°.
      </WorkedExample>

      <WorkedExample titulo="Tipo factorizable">
        Resolver sen 2x cos x = 6 sen³x en [0°, 180°].<br /><br />

        <strong>Paso 1 · Usar identidad ángulo doble:</strong><br />
        sen 2x = 2 sen x cos x. Sustituyendo:<br />
        2 sen x cos²x = 6 sen³x.<br /><br />

        <strong>Paso 2 · Factor común:</strong><br />
        2 sen x (cos²x − 3 sen²x) = 0.<br /><br />

        <strong>Paso 3 · Casos:</strong><br />
        • sen x = 0 → x = 0° o 180°.<br />
        • cos²x = 3 sen²x → tan²x = 1/3 → tan x = ±1/√3 → x = 30° (o 150° pero
        está fuera del intervalo si restringimos).<br /><br />

        Este tipo de ejercicio apareció en el facsímil 2do parcial PREU 2025 G2.
      </WorkedExample>

      <Cuidado>
        Al elevar al cuadrado para resolver ecuaciones trigonométricas pueden
        aparecer SOLUCIONES EXTRAÑAS. Verificá cada solución sustituyendo en
        la ecuación original.
      </Cuidado>
    </EscenaRica>
  );
}

function EscErrores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>

      <Misconception titulo="Error 1 · cancelar funciones trig en ecuaciones">
        Si tenés sen x · cos x = 0, NO podés dividir por sen x (sería cancelar
        soluciones donde sen x = 0). Factorizá y aplicá la propiedad del
        producto = 0.
      </Misconception>

      <Misconception titulo="Error 2 · olvidar las soluciones del 2do/3er cuadrante">
        Si cos x = 1/2, la solución principal es x = 60°. Pero TAMBIÉN x = 300°
        (cos es positivo en cuadrante IV). En el intervalo [0°, 360°] hay
        DOS soluciones (en general).
      </Misconception>

      <Misconception titulo="Error 3 · usar cos²x = (cos x)²">
        ¡Esto SÍ vale! cos²x significa (cos x)². NO confundir con cos(x²).
      </Misconception>

      <Misconception titulo="Error 4 · sen(A+B) = sen A + sen B">
        FALSO. La suma de ángulos requiere fórmula específica:
        sen(A+B) = sen A cos B + cos A sen B.
      </Misconception>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "sen²x + cos²x =",
      o: ["1", "0", "2", "sen 2x"],
      c: 0,
      ex: "Identidad fundamental.",
    },
    {
      p: "sen(2x) =",
      o: ["2 sen x cos x", "sen²x − cos²x", "2 sen x", "sen x + cos x"],
      c: 0,
      ex: "Identidad del ángulo doble.",
    },
    {
      p: "Si cos x = 3/5 y x es agudo, sen x =",
      o: ["4/5", "3/4", "5/3", "1/5"],
      c: 0,
      ex: "sen²x = 1 - 9/25 = 16/25 → sen x = 4/5 (agudo, positivo).",
    },
    {
      p: "Soluciones de sen x = 1/2 en [0°, 360°]:",
      o: ["30° y 150°", "30° solo", "30° y 330°", "60° y 120°"],
      c: 0,
      ex: "sen positivo en cuadrantes I y II. 30° y 180°-30°=150°.",
    },
    {
      p: "cos(60° + 30°) =",
      o: ["0", "1", "√2/2", "1/2"],
      c: 0,
      ex: "cos(90°) = 0.",
    },
    {
      p: "Simplificar sen(180° − x):",
      o: ["sen x", "−sen x", "cos x", "−cos x"],
      c: 0,
      ex: "sen(180°−x) = sen x (suplementarios).",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final · 6 ejercicios</Titulo>
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
