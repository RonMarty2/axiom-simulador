"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  cajaAnim, Stage, EtiquetaToque } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, CasoBolivia, Misconception, Mnemotecnia, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Repartos proporcionales"
      escenas={[
        { titulo: "¿Qué es repartir proporcionalmente?", componente: Esc01_Intro },
        { titulo: "Reparto directo: paso a paso", componente: Esc02_Directo },
        { titulo: "Aplicación con personas", componente: Esc03_App },
        { titulo: "Reparto inverso", componente: Esc04_Inverso },
        { titulo: "Regla de compañía", componente: Esc05_Compania },
        { titulo: "Errores comunes", componente: Esc06_Errores },
        { titulo: "Práctica final", componente: Esc07_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Repartir proporcionalmente</Titulo>
      <Parrafo>
        Cuando tienes algo para repartir (dinero, premio, herencia, ganancia) pero
        <strong> no en partes iguales</strong> sino en proporción a algo (capital aportado,
        tiempo dedicado, méritos, etc.), eso es un <strong>reparto proporcional</strong>.
      </Parrafo>
      <Resumen>
        🎯 Casos reales: <br />
        • Repartir una ganancia entre socios según el capital que pusieron.<br />
        • Repartir una herencia según parentesco.<br />
        • Distribuir un premio entre integrantes de un equipo según horas trabajadas.<br />
        • Repartir un costo entre grupos según consumo.
      </Resumen>

      <Hook>
        En el examen UMSS aparecen <strong>2-4 problemas de repartos</strong> (directo, inverso
        o compañía). El método de "valor unitario" siempre funciona: <em>sumar partes, dividir
        total entre suma, multiplicar cada parte por ese unitario</em>. 4 pasos, sin trucos.
      </Hook>

      <Mnemotecnia>
        <strong>3 tipos de reparto · "D-I-C"</strong>:<br />
        <strong>D</strong>irecto → quien tiene más, recibe más.<br />
        <strong>I</strong>nverso → quien tiene más, recibe MENOS (se invierten las partes).<br />
        <strong>C</strong>ompañía → partes = capital × tiempo.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_Directo() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Reparto DIRECTO: el método</Titulo>
      <Parrafo>
        Para repartir un total <strong>T</strong> entre cantidades <strong>a, b, c, ...</strong>
        directamente proporcionales:
      </Parrafo>

      <Resumen>
        <Paso n={1}>Suma las partes: <strong>S = a + b + c + ...</strong></Paso>
        <Paso n={2}>Calcula el <strong>valor unitario</strong>: <strong>v = T / S</strong></Paso>
        <Paso n={3}>Cada uno recibe su parte: <strong>a·v, b·v, c·v, ...</strong></Paso>
        <Paso n={4}>Verifica que la suma da el total.</Paso>
      </Resumen>

      <Ejemplo titulo="Ejemplo: repartir 600 Bs entre 3 personas en partes 2, 3 y 5">
        <Paso n={1}>S = 2 + 3 + 5 = <strong>10</strong></Paso>
        <Paso n={2}>v = 600 / 10 = <strong>60 Bs por parte</strong></Paso>
        <Paso n={3}>Persona 1: 2·60 = <strong>120 Bs</strong></Paso>
        <Paso n={4}>Persona 2: 3·60 = <strong>180 Bs</strong></Paso>
        <Paso n={5}>Persona 3: 5·60 = <strong>300 Bs</strong></Paso>
        <Paso n={6}>Verificación: 120 + 180 + 300 = 600 ✓</Paso>
      </Ejemplo>

      <PorQue>
        El "valor unitario" representa cuánto vale UNA parte de las que estamos
        repartiendo. Una vez que lo sabes, asignar a cada uno es multiplicar.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03_App() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo>Aplicación visual</Titulo>
      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <EtiquetaToque>REPARTIR 600 Bs ENTRE A (2 partes), B (3 partes), C (5 partes)</EtiquetaToque>
        <Stage w={420} h={200}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 20, width: "100%", textAlign: "center", fontSize: 50 }}>
            💰
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ position: "absolute", left: 0, top: 70, width: "100%", textAlign: "center", fontSize: 24, color: COLOR_BASE, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
            600 Bs
          </motion.div>

          {[
            { e: "🧑", n: "A", p: 2, m: 120, c: "#3b82f6", x: 50 },
            { e: "👩", n: "B", p: 3, m: 180, c: "#10b981", x: 175 },
            { e: "🧓", n: "C", p: 5, m: 300, c: "#f59e0b", x: 300 },
          ].map((per, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, y: 20 }} animate={paso >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: k * 0.15, type: "spring" }}
              style={{ position: "absolute", left: per.x, top: 130, width: 70, textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{per.e}</div>
              <div style={{ fontSize: 12, color: per.c, fontWeight: 800 }}>
                {per.n}: {per.p} partes
              </div>
              <motion.div initial={{ opacity: 0, scale: 0 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: k * 0.15, type: "spring" }}
                style={{ fontSize: 16, color: per.c, fontWeight: 800, fontFamily: "var(--font-crimson), serif", marginTop: 2 }}>
                {per.m} Bs
              </motion.div>
            </motion.div>
          ))}
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "Tenemos 600 Bs"}
          {paso === 1 && "Repartimos entre 3 con 2, 3 y 5 partes respectivamente"}
          {paso === 2 && "Sumo: 2+3+5 = 10. Cada parte vale 600/10 = 60 Bs"}
          {paso === 3 && "A→120, B→180, C→300 (suma 600 ✓)"}
        </div>
      </div>
    </EscenaRica>
  );
}

function Esc04_Inverso() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Reparto INVERSO</Titulo>
      <Parrafo>
        En el reparto <strong>inverso</strong>, queremos que <strong>quien tenga la
        cantidad más alta reciba LA MENOR parte</strong>. Por ejemplo: repartir un
        bono inversamente proporcional a los días faltados (el que faltó menos, gana más).
      </Parrafo>

      <Resumen>
        <Paso n={1}>Invertí cada cantidad: si las cantidades son a, b, c → trabaja con 1/a, 1/b, 1/c.</Paso>
        <Paso n={2}>Reduce esas fracciones a común denominador (MCM).</Paso>
        <Paso n={3}>Las nuevas "partes" son los numeradores.</Paso>
        <Paso n={4}>Aplica el reparto directo con esas nuevas partes.</Paso>
      </Resumen>

      <Ejemplo titulo="Ejemplo: repartir 310 Bs inversamente a 2, 3 y 5">
        <Paso n={1}>Invertí: 1/2, 1/3, 1/5.</Paso>
        <Paso n={2}>MCM(2,3,5) = 30. Equivalen a 15/30, 10/30, 6/30.</Paso>
        <Paso n={3}>Nuevas partes: 15, 10, 6.</Paso>
        <Paso n={4}>Suma: 15+10+6 = 31. Valor unitario: 310/31 = 10.</Paso>
        <Paso n={5}>Resultado: <strong>150 Bs, 100 Bs, 60 Bs</strong>.</Paso>
        <Paso n={6}>Verificación: 150+100+60 = 310 ✓. Y a quien tiene 2 (el menor) le toca más (150). ✓</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05_Compania() {
  return (
    <EscenaRica>
      <Titulo>Regla de compañía</Titulo>
      <Parrafo>
        Es un reparto especial usado en <strong>sociedades comerciales</strong>: cuando
        los socios aportan distinto capital DURANTE distinto tiempo, la ganancia se
        reparte proporcional al <strong>producto capital × tiempo</strong>.
      </Parrafo>

      <Resumen>
        Para cada socio i: <strong>partes_i = capital_i × tiempo_i</strong>. Luego
        aplicas reparto directo con esas partes.
      </Resumen>

      <Ejemplo titulo="Dos socios. Ganancia: 2400 Bs">
        <Paso n={1}>Socio A: 1000 Bs durante 6 meses → 1000·6 = <strong>6000</strong></Paso>
        <Paso n={2}>Socio B: 3000 Bs durante 4 meses → 3000·4 = <strong>12000</strong></Paso>
        <Paso n={3}>Razón A:B = 6000:12000 = 1:2 (3 partes total).</Paso>
        <Paso n={4}>Valor unitario: 2400/3 = 800.</Paso>
        <Paso n={5}>A recibe 1·800 = <strong>800 Bs</strong>. B recibe 2·800 = <strong>1600 Bs</strong>.</Paso>
      </Ejemplo>

      <PorQue>
        Tiene sentido: si A pone menos dinero durante menos tiempo, su "contribución
        efectiva" es menor. La fórmula capital × tiempo refleja eso.
      </PorQue>

      <CasoBolivia>
        <strong>Caso real:</strong> tres socios abren una salteñería en Cochabamba.<br />
        • Doña Luisa aporta 30.000 Bs y trabaja 12 meses.<br />
        • Don Carlos aporta 20.000 Bs y trabaja 8 meses.<br />
        • Don Pepe aporta 50.000 Bs y trabaja 6 meses.<br />
        Ganancia anual: 60.000 Bs.<br /><br />
        Contribución efectiva (capital × tiempo):<br />
        • Luisa: 30.000 × 12 = 360.000<br />
        • Carlos: 20.000 × 8 = 160.000<br />
        • Pepe: 50.000 × 6 = 300.000<br />
        Suma: 820.000. Valor unitario: 60.000 / 820.000 ≈ 0.0732.<br />
        Luisa cobra: 360.000 × 0.0732 ≈ <strong>26.341 Bs</strong>. Carlos: 11.707 Bs. Pepe: 21.951 Bs.
      </CasoBolivia>

      <WorkedExample titulo="Reparto inverso paso a paso · 'inverso a las inasistencias'">
        Una empresa reparte un bono de <strong>1.860 Bs</strong> entre 3 empleados
        <strong> inversamente proporcional</strong> a sus inasistencias (3, 5 y 6 faltas).<br /><br />

        <strong>Paso 1 · Invertir las cantidades:</strong> 1/3, 1/5, 1/6.<br /><br />

        <strong>Paso 2 · Común denominador (MCM):</strong> MCM(3, 5, 6) = 30.<br />
        1/3 = 10/30 · 1/5 = 6/30 · 1/6 = 5/30.<br /><br />

        <strong>Paso 3 · Las nuevas partes son los numeradores:</strong> 10, 6, 5.<br /><br />

        <strong>Paso 4 · Reparto directo con esas partes:</strong><br />
        Suma: 10 + 6 + 5 = 21.<br />
        Valor unitario: 1.860 / 21 = <strong>88,57 Bs</strong>... ¡no da entero! Verificación
        del enunciado: la suma debe ser divisible. Cambio el total a <strong>2.100 Bs</strong>
        para que dé exacto.<br />
        Valor unitario: 2.100 / 21 = 100.<br /><br />

        <strong>Paso 5 · Asignación:</strong><br />
        • El que faltó 3 (menos) recibe 10 × 100 = <strong>1.000 Bs</strong>.<br />
        • El que faltó 5 recibe 6 × 100 = <strong>600 Bs</strong>.<br />
        • El que faltó 6 (más) recibe 5 × 100 = <strong>500 Bs</strong>.<br /><br />

        <strong>Verificación:</strong> 1.000 + 600 + 500 = 2.100 ✓. Y al que faltó MENOS le tocó
        MÁS, como pide el "inversamente proporcional". ✓
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc06_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Olvidar verificar que las partes suman el total. <br />
        <span style={{ fontSize: 13 }}>
          Siempre suma las partes que repartes y debe dar exactamente el total inicial.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> En el inverso, no invertir las cantidades. <br />
        <span style={{ fontSize: 13 }}>
          Si te piden "inversamente proporcional a 2, 3, 5" y aplicas reparto directo
          a 2, 3, 5: está MAL. Tienes que trabajar con 1/2, 1/3, 1/5.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> En compañía, olvidar multiplicar por el tiempo. <br />
        <span style={{ fontSize: 13 }}>
          Si solo usas los capitales, ignorás que un socio pudo aportar más tiempo. Capital × Tiempo.
        </span>
      </Cuidado>

      <Misconception titulo="Inverso ≠ 'restar del total'">
        Mucha gente cree que "inversamente proporcional a 2, 3, 5" se resuelve repartiendo a
        "5, 3, 2" (orden inverso). NO. Hay que <strong>invertir como fracción</strong>:
        1/2, 1/3, 1/5. Después llevar a común denominador. El orden invertido funciona solo si
        las cantidades originales son simétricas.
      </Misconception>
    </EscenaRica>
  );
}

function Esc07_Practica() {
  const ejs = useMemo(() => [
    { p: "Repartir 480 Bs proporcionalmente a 1, 3 y 4. ¿Cuánto recibe el de 4 partes?", o: ["240 Bs", "120 Bs", "192 Bs", "60 Bs"], c: 0, ex: "Suma: 1+3+4=8. Unitario: 480/8=60. El de 4 recibe 4·60=240." },
    { p: "Repartir 900 entre A, B, C en partes 1:2:3. ¿Cuánto le toca a B?", o: ["150", "300", "450", "100"], c: 1, ex: "Suma: 6. Unitario: 150. B (2 partes) = 2·150 = 300." },
    { p: "Inverso de 1000 a 2 y 3. ¿Cuánto recibe el de 2?", o: ["600", "400", "500", "200"], c: 0, ex: "Invierto: 1/2, 1/3 = 3/6, 2/6. Partes: 3 y 2. Suma 5. Unitario 200. El de '2' inverso = 3·200 = 600." },
    { p: "Socio A: 2000Bs · 3 meses. Socio B: 1000Bs · 6 meses. Ganancia 1200. A recibe:", o: ["600", "800", "400", "1000"], c: 0, ex: "A: 2000·3=6000. B: 1000·6=6000. Razón 1:1. Mitad y mitad: 600 cada uno." },
    { p: "Si en un reparto directo cada parte vale 25 y al primero le tocan 75 Bs, ¿cuántas partes tenía?", o: ["3", "5", "25", "75"], c: 0, ex: "75/25 = 3 partes." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios sobre repartos:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i];
        const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 15, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
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
            {ok === ejs.length && "🎉 Dominas repartos proporcionales."}
            {ok >= 3 && ok < ejs.length && "Bien. El método de las 4 etapas no falla."}
            {ok < 3 && "Vuelve a la escena 2 (el método paso a paso)."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
