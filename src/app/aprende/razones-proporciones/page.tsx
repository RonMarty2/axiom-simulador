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
      unidad="02"
      tituloUnidad="Razones y proporciones"
      escenas={[
        { titulo: "¿Para qué este tema?", componente: Esc01_Intro },
        { titulo: "Razón: comparar dos cantidades", componente: Esc02_Razon },
        { titulo: "Razones equivalentes", componente: Esc03_Equiv },
        { titulo: "Proporción: igualdad de razones", componente: Esc04_Prop },
        { titulo: "Extremos y medios", componente: Esc05_Terminos },
        { titulo: "La propiedad fundamental", componente: Esc06_Fundamental },
        { titulo: "Despejar el término desconocido", componente: Esc07_Despejar },
        { titulo: "Aplicación a problemas", componente: Esc08_Problemas },
        { titulo: "Errores comunes", componente: Esc09_Errores },
        { titulo: "Práctica final", componente: Esc10_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Razones y proporciones</Titulo>
      <Parrafo>
        Una <strong>razón</strong> es una comparación entre dos cantidades. Una
        <strong> proporción</strong> es una igualdad entre dos razones. Suenan
        abstractos pero los usás todo el día sin darte cuenta.
      </Parrafo>
      <Resumen>
        🎯 Usos concretos:<br />
        • <strong>Recetas de cocina</strong>: si la receta es para 4 personas y querés
        cocinar para 10, todo escala con una proporción.<br />
        • <strong>Mapas y planos</strong>: la "escala" es una razón (1:100 significa
        que 1 cm del mapa = 100 cm reales).<br />
        • <strong>Tipo de cambio</strong>: 1 USD : 6.96 Bs es una razón.<br />
        • <strong>Mezclas y porcentajes</strong>: una solución al 30% es una razón 30:100.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Razon() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Razón: comparar dos cantidades</Titulo>
      <Parrafo>
        Si en una clase hay <strong>15 mujeres y 10 hombres</strong>, podemos decir que
        la razón entre mujeres y hombres es <strong>15 a 10</strong>, o
        <strong> 3 a 2</strong> (simplificada).
      </Parrafo>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={420} h={150}>
          {/* 3 manzanas + 2 naranjas como ejemplo visual */}
          {[0, 1, 2].map((k) => (
            <motion.div key={`m${k}`}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: k * 0.1, type: "spring" }}
              style={{ position: "absolute", left: 50 + k * 45, top: 40, fontSize: 36 }}>🍎</motion.div>
          ))}
          {[0, 1].map((k) => (
            <motion.div key={`n${k}`}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + k * 0.1, type: "spring" }}
              style={{ position: "absolute", left: 240 + k * 45, top: 40, fontSize: 36 }}>🍊</motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ position: "absolute", left: 0, top: 100, width: "100%", textAlign: "center", fontSize: 24, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
            Razón <span style={{ color: "#dc2626" }}>3</span> : <span style={{ color: "#ea580c" }}>2</span>
          </motion.div>
        </Stage>
      </div>

      <Definicion termino="razón">
        La razón entre dos cantidades <strong>a</strong> y <strong>b</strong> (con b ≠ 0)
        se escribe como <strong>a : b</strong> o como fracción <strong>a/b</strong>.
        Indica cuántas veces <strong>a</strong> contiene a <strong>b</strong>.
      </Definicion>

      <Ejemplo titulo="Ejemplos rápidos">
        <Paso n={1}>Razón entre 15 y 10 → 15:10 = 3:2 (simplificando por 5).</Paso>
        <Paso n={2}>Si gano 600 Bs y gasto 400 Bs, la razón ganancia:gasto = 3:2.</Paso>
        <Paso n={3}>Escala 1:50 → 1 cm en el plano = 50 cm reales.</Paso>
      </Ejemplo>

      <PorQue>
        La razón es básicamente una <strong>fracción comparativa</strong>. Por eso
        las razones se simplifican igual que fracciones (dividiendo arriba y abajo
        por su MCD).
      </PorQue>
    </EscenaRica>
  );
}

function Esc03_Equiv() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">Razones equivalentes</Titulo>
      <Parrafo>
        Dos razones son <strong>equivalentes</strong> si valen lo mismo (como fracciones).
      </Parrafo>

      <Ejemplo titulo="Ejemplos">
        <Paso n={1}>1:2 = 2:4 = 3:6 = 50:100 (todas valen 0.5).</Paso>
        <Paso n={2}>3:4 = 6:8 = 9:12 = 15:20.</Paso>
      </Ejemplo>

      <PorQue>
        Si multiplicás (o dividís) <strong>arriba Y abajo por el mismo número</strong>,
        la razón no cambia. Igual que en fracciones. Eso te permite simplificar (dividir
        por el MCD) o ampliar (multiplicar por una constante).
      </PorQue>

      <AutoCheck
        pregunta="¿Cuál de estas NO es equivalente a 4:6?"
        opciones={["2:3", "8:12", "20:30", "4:8"]}
        correctaIdx={3}
        explicacion="4:6 simplificado es 2:3. Las equivalentes valen 2:3 (= 0.666…): 2:3 ✓, 8:12 = 2:3 ✓, 20:30 = 2:3 ✓. Pero 4:8 = 1:2 = 0.5, que es DISTINTO. Esa es la que NO equivale."
      />
    </EscenaRica>
  );
}

function Esc04_Prop() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Proporción: igualdad de razones</Titulo>

      <Definicion termino="proporción">
        Una <strong>proporción</strong> es una igualdad entre dos razones: <br />
        <span style={{ fontSize: 18, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
          a / b = c / d
        </span> &nbsp; o &nbsp; <strong>a : b = c : d</strong>
      </Definicion>

      <Ejemplo titulo="Ejemplo concreto">
        Si 2 kg de manzanas cuestan 30 Bs y 6 kg cuestan 90 Bs, las razones precio/peso
        son iguales: <strong>30/2 = 90/6 = 15</strong>. Eso es una proporción.
      </Ejemplo>

      <PorQue>
        Las proporciones aparecen siempre que dos cantidades varían "al mismo ritmo"
        — eso se llama <strong>proporcionalidad directa</strong>. Si una sube al doble,
        la otra también. Si baja a la mitad, la otra también.
      </PorQue>

      <Resumen>
        Una proporción tiene <strong>4 términos</strong>. Y como vamos a ver enseguida,
        cualquier 3 de esos términos determinan al cuarto.
      </Resumen>
    </EscenaRica>
  );
}

function Esc05_Terminos() {
  return (
    <EscenaRica>
      <Titulo>Extremos y medios</Titulo>
      <Parrafo>
        Los 4 números de una proporción tienen nombres específicos:
      </Parrafo>

      <div style={{ ...cajaAnim(), cursor: "default" }}>
        <Stage w={400} h={140}>
          <div style={{ position: "absolute", left: 0, top: 40, width: "100%", textAlign: "center", fontSize: 32, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span style={{ color: COLOR_OK }}>a</span>
            <span style={{ margin: "0 6px" }}>:</span>
            <span style={{ color: COLOR_EXP }}>b</span>
            <span style={{ margin: "0 14px" }}>=</span>
            <span style={{ color: COLOR_EXP }}>c</span>
            <span style={{ margin: "0 6px" }}>:</span>
            <span style={{ color: COLOR_OK }}>d</span>
          </div>
          <div style={{ position: "absolute", left: 0, top: 90, width: "100%", textAlign: "center", fontSize: 13, color: COLOR_OK, fontWeight: 800, letterSpacing: 1 }}>
            ↑ EXTREMOS (verde) — a y d
          </div>
          <div style={{ position: "absolute", left: 0, top: 110, width: "100%", textAlign: "center", fontSize: 13, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1 }}>
            ↑ MEDIOS (violeta) — b y c
          </div>
        </Stage>
      </div>

      <Ejemplo titulo="En la proporción 1 : 2 = 3 : 6">
        <Paso n={1}>Extremos: <strong style={{ color: COLOR_OK }}>1 y 6</strong> (los de los bordes).</Paso>
        <Paso n={2}>Medios: <strong style={{ color: COLOR_EXP }}>2 y 3</strong> (los del centro).</Paso>
      </Ejemplo>

      <Parrafo>
        Esta clasificación es la que nos lleva a la <strong>propiedad fundamental</strong>:
        próxima escena.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc06_Fundamental() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Propiedad fundamental</Titulo>

      <Resumen>
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          En toda proporción: <strong>extremos × extremos = medios × medios</strong>
        </span>
      </Resumen>
      <Parrafo>
        Es decir, si <strong>a/b = c/d</strong> entonces <strong>a · d = b · c</strong>.
        Esta es <em>la</em> propiedad que vas a usar para resolver casi todo problema
        de proporciones.
      </Parrafo>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <div style={{ fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2 }}>
          👆 EN LA PROPORCIÓN 1/2 = 3/6
        </div>
        <Stage w={400} h={180}>
          {/* Proporción */}
          <div style={{ position: "absolute", left: 0, top: 40, width: "100%", textAlign: "center", fontSize: 28, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
            <span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>1</span>
            {" / 2 = 3 / "}
            <span style={{ color: paso >= 1 ? COLOR_OK : COLOR_BASE }}>6</span>
          </div>
          {/* Arco para extremos (paso 1) */}
          <motion.svg style={{ position: "absolute", left: 0, top: 0, width: 400, height: 180, pointerEvents: "none" }}>
            <motion.path d="M 120 50 Q 200 10 280 50" fill="none" stroke={COLOR_OK} strokeWidth={2} strokeDasharray="4 3"
              initial={{ pathLength: 0 }} animate={{ pathLength: paso >= 1 ? 1 : 0 }} transition={{ duration: 0.5 }} />
          </motion.svg>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 0, top: 100, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_OK, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            Extremos: 1 × 6 = 6
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 2 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
            style={{ position: "absolute", left: 0, top: 130, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_EXP, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
            Medios: 2 × 3 = 6
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 155, width: "100%", textAlign: "center", fontSize: 16, color: "#065f46", fontWeight: 800 }}>
            ✓ IGUALES (6 = 6)
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "Tenemos 1/2 = 3/6"}
          {paso === 1 && "Identifico extremos (1 y 6)"}
          {paso === 2 && "Multiplico extremos vs. medios"}
          {paso === 3 && "Los productos son iguales: ¡siempre pasa!"}
        </div>
      </div>

      <PorQue>
        ¿Por qué siempre vale? Empezás con a/b = c/d. Multiplicás ambos lados por bd:
        a/b · bd = c/d · bd → a·d = b·c. Es solo álgebra básica.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07_Despejar() {
  return (
    <EscenaRica>
      <Titulo>Despejar un término desconocido</Titulo>
      <Parrafo>
        Si conocés 3 de los 4 términos, podés calcular el faltante usando la
        propiedad fundamental.
      </Parrafo>

      <Ejemplo titulo="Ejemplo: 4 / x = 2 / 3">
        <Paso n={1}>Aplico la propiedad: <strong>extremos × extremos = medios × medios</strong></Paso>
        <Paso n={2}>4 · 3 = x · 2 → 12 = 2x</Paso>
        <Paso n={3}>Despejo x: <strong style={{ color: COLOR_OK }}>x = 12 / 2 = 6</strong></Paso>
        <Paso n={4}>Verifico: 4/6 = 0.666… y 2/3 = 0.666… ✓</Paso>
      </Ejemplo>

      <Ejemplo titulo="Otro: 5 / 8 = x / 24">
        <Paso n={1}>5 · 24 = 8 · x → 120 = 8x</Paso>
        <Paso n={2}>x = <strong style={{ color: COLOR_OK }}>15</strong></Paso>
      </Ejemplo>

      <Resumen>
        Receta general: <strong>el término que sabés del mismo "lado diagonal" que el desconocido se multiplica,
        y se divide por el restante</strong>. (Si a/b = c/x, entonces x = b·c/a.)
      </Resumen>

      <AutoCheck
        pregunta="Si 7 / 14 = 3 / x, ¿cuánto vale x?"
        opciones={["6", "21", "1.5", "2"]}
        correctaIdx={0}
        explicacion="7·x = 14·3 → 7x = 42 → x = 6."
      />
    </EscenaRica>
  );
}

function Esc08_Problemas() {
  return (
    <EscenaRica>
      <Titulo>Aplicación a problemas verbales</Titulo>
      <Parrafo>
        La mayoría de problemas de proporcionalidad directa se resuelven escribiendo
        la proporción y aplicando la propiedad fundamental.
      </Parrafo>

      <Ejemplo titulo="Problema: 5 trabajadores construyen una pared en 8 días. ¿Cuántos días tardan 5 trabajadores para construir 3 paredes iguales?">
        <Paso n={1}>1 pared / 8 días = 3 paredes / x días</Paso>
        <Paso n={2}>1 · x = 8 · 3 → x = 24</Paso>
        <Paso n={3}>Respuesta: <strong style={{ color: COLOR_OK }}>24 días</strong>.</Paso>
      </Ejemplo>

      <Ejemplo titulo="Problema: si 3 kg de queso cuestan 105 Bs, ¿cuánto cuestan 8 kg?">
        <Paso n={1}>3 kg / 105 Bs = 8 kg / x Bs</Paso>
        <Paso n={2}>3 · x = 105 · 8 → 3x = 840 → x = 280</Paso>
        <Paso n={3}>Respuesta: <strong style={{ color: COLOR_OK }}>280 Bs</strong>.</Paso>
      </Ejemplo>

      <Cuidado>
        Cuando armes la proporción, <strong>mantené las mismas unidades arriba y abajo</strong>:
        kg arriba con kg arriba, Bs con Bs. Si no lo hacés, te equivocás.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc09_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Los 3 errores más comunes</Titulo>

      <Cuidado>
        <strong>Error 1:</strong> Mezclar unidades. <br />
        <span style={{ fontSize: 13 }}>
          Si arriba tenés kg, abajo tenés kg. NO pongas "kg arriba, gramos abajo".
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 2:</strong> Confundir proporcionalidad directa con inversa. <br />
        <span style={{ fontSize: 13 }}>
          Esta lección trata DIRECTA (las dos suben juntas). Si una sube y la otra baja
          (ej: más trabajadores → menos tiempo), es INVERSA — tema de la próxima lección.
        </span>
      </Cuidado>

      <Cuidado>
        <strong>Error 3:</strong> Aplicar mal la propiedad fundamental. <br />
        <span style={{ fontSize: 13 }}>
          a/b = c/d ⟹ a·d = b·c. <strong>NO</strong> es a·c = b·d. Multiplicás en cruz.
        </span>
      </Cuidado>
    </EscenaRica>
  );
}

function Esc10_Practica() {
  const ejs = useMemo(() => [
    { p: "Si 3/4 = x/20, ¿cuál es x?", o: ["15", "5", "24", "12"], c: 0, ex: "3·20 = 4·x → 60 = 4x → x = 15." },
    { p: "¿Cuál es equivalente a 6:9?", o: ["3:4", "2:3", "6:7", "9:6"], c: 1, ex: "6:9 dividido por 3 da 2:3." },
    { p: "Si 12 panes cuestan 36 Bs, ¿cuánto cuestan 18 panes?", o: ["48 Bs", "54 Bs", "60 Bs", "72 Bs"], c: 1, ex: "12/36 = 18/x → 12x = 648 → x = 54." },
    { p: "En 5/x = 10/24, ¿cuánto vale x?", o: ["12", "48", "10", "120"], c: 0, ex: "5·24 = x·10 → 120 = 10x → x = 12." },
    { p: "Una receta para 4 personas usa 200g de harina. ¿Cuánta para 10 personas?", o: ["400g", "500g", "600g", "80g"], c: 1, ex: "4/200 = 10/x → 4x = 2000 → x = 500g." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios sobre razones y proporciones:</Parrafo>
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
            {ok === ejs.length && "🎉 Dominás razones y proporciones."}
            {ok >= 3 && ok < ejs.length && "Repasá los que fallaste — la propiedad fundamental es clave."}
            {ok < 3 && "Volvé a la escena 6 (propiedad fundamental). Es la base de todo."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
