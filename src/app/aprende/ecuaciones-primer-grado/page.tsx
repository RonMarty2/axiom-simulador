"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  cajaAnim, Stage,
} from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="05"
      tituloUnidad="Ecuaciones de primer grado"
      escenas={[
        { titulo: "¿Qué es una ecuación?", componente: Esc01_Intro },
        { titulo: "Igualdad vs identidad vs ecuación", componente: Esc02_Tipos },
        { titulo: "La balanza: principio fundamental", componente: Esc03_Balanza },
        { titulo: "Despejar la incógnita", componente: Esc04_Despejar },
        { titulo: "Ecuaciones con paréntesis", componente: Esc05_Parent },
        { titulo: "Ecuaciones con fracciones", componente: Esc06_Frac },
        { titulo: "Problema verbal", componente: Esc07_Verbal },
        { titulo: "Errores comunes", componente: Esc08_Errores },
        { titulo: "Práctica final", componente: Esc09_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Ecuaciones de primer grado</Titulo>
      <Definicion termino="ecuación">
        Una <strong>ecuación</strong> es una <em>igualdad</em> con una o más
        <strong> incógnitas</strong> (letras a despejar). "De primer grado" quiere decir
        que la incógnita aparece elevada a la 1 (sin x², √x, etc).
      </Definicion>
      <Ejemplo>
        2x + 3 = 11, &nbsp; x − 5 = 0, &nbsp; 3(y + 2) = 18 — todas son de primer grado.
      </Ejemplo>
      <Resumen>
        🎯 Aplicaciones reales:<br />
        • Calcular cuánto invertir para llegar a una meta.<br />
        • Convertir un problema verbal en una expresión y resolverlo.<br />
        • Resolver problemas de mezclas, edades, distancias…<br />
        Si dominás esto, dominás el 70% de los problemas verbales del examen.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Tipos() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">3 tipos de igualdades</Titulo>
      <Ejemplo titulo="1. Igualdad numérica">
        <strong>2 + 3 = 5</strong>. No tiene incógnitas. Es verdadero (o falso). Nada que despejar.
      </Ejemplo>
      <Ejemplo titulo="2. Identidad">
        <strong>x + x = 2x</strong>. Vale para CUALQUIER valor de x. No hay que despejar nada.
      </Ejemplo>
      <Ejemplo titulo="3. Ecuación">
        <strong>2x + 1 = 7</strong>. Vale solo para ALGÚN valor (x = 3). Acá SÍ hay que despejar.
      </Ejemplo>
      <Resumen>
        Solo a las <strong>ecuaciones</strong> les vas a "resolver". El verbo "resolver" es
        sinónimo de "encontrar el valor de x que la haga verdadera".
      </Resumen>
    </EscenaRica>
  );
}

function Esc03_Balanza() {
  return (
    <EscenaRica>
      <Titulo>Principio fundamental: la balanza</Titulo>
      <Parrafo>
        Una ecuación es como una <strong>balanza en equilibrio</strong>. Lo que hacés a
        un lado <strong>debe hacerse al otro</strong> para mantener la igualdad.
      </Parrafo>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={180}>
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ position: "absolute", left: 50, top: 30, padding: "10px 22px", background: COLOR_BASE, color: "white", borderRadius: 10, fontFamily: "var(--font-crimson), serif", fontSize: 22, fontWeight: 700 }}>
            x + 3
          </motion.div>
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ position: "absolute", right: 50, top: 30, padding: "10px 22px", background: COLOR_OK, color: "white", borderRadius: 10, fontFamily: "var(--font-crimson), serif", fontSize: 22, fontWeight: 700 }}>
            7
          </motion.div>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6 }}
            style={{ position: "absolute", left: 20, right: 20, top: 85, height: 4, background: "var(--fg-muted)", transformOrigin: "center" }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            style={{ position: "absolute", left: "50%", marginLeft: -30, top: 95, width: 0, height: 0, borderLeft: "30px solid transparent", borderRight: "30px solid transparent", borderTop: `55px solid ${COLOR_EXP}` }} />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}
            style={{ position: "absolute", left: "50%", marginLeft: -15, top: 50, fontSize: 36, color: COLOR_EXP, fontWeight: 800 }}>
            =
          </motion.div>
        </Stage>
      </div>

      <Resumen>
        🔑 <strong>3 movimientos legales</strong>:<br />
        • Sumar (o restar) el MISMO número a AMBOS lados.<br />
        • Multiplicar (o dividir, si ≠ 0) AMBOS lados por el mismo número.<br />
        • Cualquiera de estos preserva la igualdad.
      </Resumen>

      <PorQue>
        Por eso decimos "pasar un término al otro lado cambiando de signo": en realidad
        estás restando ese término a AMBOS lados. La regla mnemotécnica es solo un atajo.
      </PorQue>
    </EscenaRica>
  );
}

function Esc04_Despejar() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Despejar la incógnita: paso a paso</Titulo>
      <Parrafo>
        Estrategia general: <strong>aislar la x</strong> en un lado. Pasás todo lo demás al
        otro lado usando el principio de la balanza.
      </Parrafo>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2 }}>
          👆 RESOLVER: 3x + 5 = 17
        </div>
        <Stage w={400} h={180}>
          <div style={{ position: "absolute", left: 0, top: 10, width: "100%", textAlign: "center", fontSize: 26, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}>
            3x + 5 = 17
          </div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 55, width: "100%", textAlign: "center", fontSize: 24, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}>
            3x = 17 − 5 → 3x = 12
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 95, width: "100%", textAlign: "center", fontSize: 24, fontFamily: "var(--font-crimson), serif", fontWeight: 700, color: COLOR_BASE }}>
            x = 12 / 3
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 135, width: "100%", textAlign: "center", fontSize: 28, fontFamily: "var(--font-crimson), serif", fontWeight: 800, color: COLOR_OK }}>
            x = 4 ✓
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "Original: 3x + 5 = 17"}
          {paso === 1 && "El +5 pasa al otro lado como −5"}
          {paso === 2 && "El 3 que multiplica pasa dividiendo"}
          {paso === 3 && "x = 4. Verificación: 3·4+5 = 17 ✓"}
        </div>
      </div>

      <Resumen>
        Orden óptimo:<br />
        1️⃣ Operaciones inversas <strong>de menor jerarquía PRIMERO</strong> (suma/resta).<br />
        2️⃣ Después las <strong>de mayor jerarquía</strong> (mult/div).<br />
        Es el orden INVERSO de PEMDAS.
      </Resumen>

      <AutoCheck
        pregunta="Resolvé: 4x − 7 = 9"
        opciones={["x = 4", "x = 2", "x = 16", "x = 0.5"]}
        correctaIdx={0}
        explicacion="4x = 9 + 7 = 16 → x = 16/4 = 4."
      />
    </EscenaRica>
  );
}

function Esc05_Parent() {
  return (
    <EscenaRica>
      <Titulo>Ecuaciones con paréntesis</Titulo>
      <Parrafo>
        Si hay paréntesis, lo primero es <strong>distribuir</strong> para eliminarlos.
      </Parrafo>

      <Ejemplo titulo="3(x − 4) = 12">
        <Paso n={1}>Distribuyo: 3x − 12 = 12</Paso>
        <Paso n={2}>3x = 12 + 12 = 24</Paso>
        <Paso n={3}>x = 24/3 = <strong style={{ color: COLOR_OK }}>8</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="2(x + 3) = 5(x − 6)">
        <Paso n={1}>Distribuyo ambos: 2x + 6 = 5x − 30</Paso>
        <Paso n={2}>Llevo las x a un lado: 2x − 5x = −30 − 6 → −3x = −36</Paso>
        <Paso n={3}>x = −36/−3 = <strong style={{ color: COLOR_OK }}>12</strong></Paso>
      </Ejemplo>

      <Cuidado>
        Si hay un signo MENOS antes del paréntesis, <strong>el menos se distribuye a TODO el paréntesis</strong>:
        <br />−(x − 3) = −x + 3.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06_Frac() {
  return (
    <EscenaRica>
      <Titulo>Ecuaciones con fracciones</Titulo>
      <Parrafo>
        Si hay fracciones, conviene <strong>multiplicar todo por el MCM</strong> de los
        denominadores para eliminarlas.
      </Parrafo>

      <Ejemplo titulo="x/2 + x/3 = 5">
        <Paso n={1}>MCM(2, 3) = 6. Multiplico todo por 6.</Paso>
        <Paso n={2}>6·x/2 + 6·x/3 = 6·5 → 3x + 2x = 30</Paso>
        <Paso n={3}>5x = 30 → x = <strong style={{ color: COLOR_OK }}>6</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="(x − 1)/4 = (x + 2)/6">
        <Paso n={1}>MCM(4, 6) = 12. Multiplico todo por 12.</Paso>
        <Paso n={2}>3(x − 1) = 2(x + 2) → 3x − 3 = 2x + 4</Paso>
        <Paso n={3}>x = 7</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc07_Verbal() {
  return (
    <EscenaRica>
      <Titulo>Problema verbal: pasar palabras a ecuación</Titulo>
      <Parrafo>
        El paso más difícil del examen NO es resolver — es TRADUCIR el problema
        a una ecuación. Receta:
      </Parrafo>

      <Resumen>
        1️⃣ Identificá la incógnita y nombrala x.<br />
        2️⃣ Traducí cada frase a una operación.<br />
        3️⃣ Igualá lo que dice el problema.<br />
        4️⃣ Resolvé y verificá que tenga sentido.
      </Resumen>

      <Ejemplo titulo="Problema: El doble de un número, más 5, es igual a 17. ¿Cuál es?">
        <Paso n={1}>Incógnita: el número → x.</Paso>
        <Paso n={2}>"Doble del número" = 2x. "Más 5" = +5. "Igual a 17" = =17.</Paso>
        <Paso n={3}>Ecuación: 2x + 5 = 17.</Paso>
        <Paso n={4}>Resuelvo: 2x = 12 → x = <strong style={{ color: COLOR_OK }}>6</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="Edades: Pedro tiene 3 años más que Juan. Juntos suman 27. ¿Edad de Juan?">
        <Paso n={1}>Incógnita: edad de Juan → x. Pedro = x + 3.</Paso>
        <Paso n={2}>x + (x + 3) = 27 → 2x + 3 = 27 → 2x = 24 → x = <strong style={{ color: COLOR_OK }}>12</strong>.</Paso>
        <Paso n={3}>Juan tiene 12, Pedro tiene 15. Verificación: 12+15=27 ✓.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc08_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Olvidar el signo al pasar al otro lado. <br />
        <span style={{ fontSize: 13 }}>
          x + 5 = 12 NO da x = 12 + 5 = 17. El +5 pasa como <strong>−5</strong>: x = 12 − 5 = 7.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> No distribuir el signo menos. <br />
        <span style={{ fontSize: 13 }}>
          5 − (x − 3) = 5 − x + 3 = 8 − x. NO es 5 − x − 3 = 2 − x.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> No verificar. <br />
        <span style={{ fontSize: 13 }}>
          Siempre sustituí tu x en la ecuación original y comprobá. 30 segundos que evitan errores grandes.
        </span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc09_Practica() {
  const ejs = useMemo(() => [
    { p: "Resolvé: 2x + 3 = 11", o: ["x = 4", "x = 7", "x = 14", "x = 8"], c: 0, ex: "2x = 8 → x = 4." },
    { p: "Resolvé: 5x − 8 = 17", o: ["x = 5", "x = 1.8", "x = 9", "x = 25"], c: 0, ex: "5x = 25 → x = 5." },
    { p: "Resolvé: 3(x + 4) = 21", o: ["x = 3", "x = 5", "x = 7", "x = 9"], c: 0, ex: "3x + 12 = 21 → 3x = 9 → x = 3." },
    { p: "Resolvé: x/2 + 5 = 11", o: ["x = 12", "x = 3", "x = 32", "x = 8"], c: 0, ex: "x/2 = 6 → x = 12." },
    { p: "Un número más 8 es igual a su triple. ¿Cuál es?", o: ["4", "2", "8", "16"], c: 0, ex: "x + 8 = 3x → 8 = 2x → x = 4." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;
  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios variados:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i]; const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c; const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{ padding: "10px 14px", background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)", border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`, borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer", fontFamily: "var(--font-crimson), serif", textAlign: "left" }}>
                    {op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
                  </button>
                );
              })}
            </div>
            {rev && <div style={{ marginTop: 10, padding: "10px 12px", background: sel === e.c ? "#ecfdf5" : "#fef2f2", borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5 }}>
              <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}{e.ex}
            </div>}
          </div>
        );
      })}
      {Object.keys(resp).length === ejs.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 18, background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
          <div style={{ fontSize: 14, color: "#065f46", marginTop: 6 }}>
            {ok === ejs.length && "🎉 Dominás ecuaciones de primer grado."}
            {ok >= 3 && ok < ejs.length && "Bien. Repasá los que fallaste."}
            {ok < 3 && "Volvé a la balanza (escena 3) — es el corazón del método."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
