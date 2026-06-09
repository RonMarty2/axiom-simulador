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
      unidad="FIS-02"
      tituloUnidad="Cinemática en una dimensión"
      escenas={[
        { titulo: "Conceptos: posición, desplazamiento, distancia", componente: EscConceptos },
        { titulo: "Velocidad y rapidez", componente: EscVelocidad },
        { titulo: "Aceleración", componente: EscAceleracion },
        { titulo: "MRU · movimiento uniforme", componente: EscMRU },
        { titulo: "MRUA · aceleración constante", componente: EscMRUA },
        { titulo: "Las 4 ecuaciones del MRUA", componente: EscEcuaciones },
        { titulo: "Caída libre", componente: EscCaidaLibre },
        { titulo: "Problemas tipo examen", componente: EscProblemasTipo },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscConceptos() {
  return (
    <EscenaRica>
      <Titulo>Conceptos básicos · posición, desplazamiento, distancia</Titulo>

      <Hook>
        Cinemática 1D es lo más preguntado en el examen FCyT (4-5 preguntas
        de física típicas). MRU, MRUA, caída libre — todas se resuelven con
        4 ecuaciones que vas a memorizar acá.
      </Hook>

      <Definicion termino="Posición (x)">
        Ubicación de un objeto respecto a un punto de referencia (origen). Es
        una magnitud VECTORIAL (puede ser positiva o negativa según el sentido).
      </Definicion>

      <Definicion termino="Desplazamiento (Δx)">
        Cambio de posición: Δx = x_final − x_inicial. Vectorial. Puede ser
        positivo, negativo o cero. NO es lo mismo que distancia recorrida.
      </Definicion>

      <Definicion termino="Distancia recorrida (d)">
        Longitud total del camino recorrido. Escalar, siempre positiva.
      </Definicion>

      <WorkedExample titulo="Diferencia clave">
        Un auto va de A (posición 0) a B (posición 100 m) y vuelve a A:<br />
        — Distancia recorrida: 100 + 100 = 200 m.<br />
        — Desplazamiento: 0 − 0 = 0 m (volvió al punto de partida).<br /><br />
        Por eso son cantidades distintas.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscVelocidad() {
  return (
    <EscenaRica>
      <Titulo>Velocidad y rapidez</Titulo>

      <Definicion termino="Velocidad (v)">
        Cambio de posición por unidad de tiempo. Es VECTORIAL (tiene dirección).
        <br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          v = Δx / Δt
        </span><br /><br />
        Unidad SI: m/s.
      </Definicion>

      <Definicion termino="Rapidez">
        Es la magnitud de la velocidad. Escalar, positiva. En la calle se llama
        "velocidad" pero técnicamente es rapidez.
      </Definicion>

      <Definicion termino="Velocidad media vs instantánea">
        — <strong>Media</strong>: v_m = Δx / Δt (cambio total / tiempo total).<br />
        — <strong>Instantánea</strong>: la velocidad en un momento dado
        específico. En MRU son iguales; en otros movimientos varían.
      </Definicion>

      <Ejemplo titulo="Velocidad media">
        Un auto recorre 200 km en 4 horas (con paradas y cambios). Velocidad
        media: v_m = 200/4 = 50 km/h. La velocidad instantánea pudo ser
        cualquier valor.
      </Ejemplo>
    </EscenaRica>
  );
}

function EscAceleracion() {
  return (
    <EscenaRica>
      <Titulo>Aceleración</Titulo>

      <Definicion termino="Aceleración (a)">
        Cambio de velocidad por unidad de tiempo. Vectorial.<br />
        <span style={{ fontSize: 16, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          a = Δv / Δt = (v_final − v_inicial) / t
        </span><br /><br />
        Unidad SI: m/s².
      </Definicion>

      <Resumen>
        <strong>Interpretación del signo</strong>:<br />
        — Si v y a tienen el mismo signo: el objeto ACELERA (va más rápido).<br />
        — Si v y a tienen signos opuestos: el objeto DESACELERA (frena).<br />
        — Si a = 0: velocidad constante (MRU).
      </Resumen>

      <Cuidado>
        "Aceleración negativa" no siempre significa "frenar". Significa que el
        vector aceleración apunta en sentido negativo del eje. Si el objeto
        también va en sentido negativo, está acelerando (yendo más rápido en
        sentido negativo).
      </Cuidado>
    </EscenaRica>
  );
}

function EscMRU() {
  return (
    <EscenaRica>
      <Titulo>MRU · Movimiento Rectilíneo Uniforme</Titulo>

      <Definicion termino="MRU">
        Movimiento en línea recta con velocidad constante (a = 0).
      </Definicion>

      <Resumen>
        <strong>Ecuación del MRU</strong>:<br />
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          x = x₀ + v · t
        </span><br /><br />
        — x: posición al tiempo t.<br />
        — x₀: posición inicial.<br />
        — v: velocidad constante.<br />
        — t: tiempo transcurrido.
      </Resumen>

      <PorQue>
        Como la velocidad es constante: distancia = velocidad × tiempo. Si
        empezás en x₀, después de tiempo t estás en x = x₀ + vt.
      </PorQue>

      <Ejemplo titulo="MRU típico">
        Un auto a 60 km/h por una autopista recta. En 2 h recorre 120 km. Si
        empezó en km 50, está en km 170.
      </Ejemplo>

      <WorkedExample titulo="Problema de persecución (estilo facsímil)">
        Un auto A va a 30 m/s. Dos segundos después, desde el mismo punto, sale
        un auto B con aceleración 5 m/s². ¿A qué distancia se encuentran?<br /><br />

        <strong>Posición de A:</strong> x_A = 30 · t (MRU).<br />
        <strong>Posición de B:</strong> x_B = (1/2)(5)(t − 2)² (MRUA desde t=2).<br /><br />

        <strong>Igualar:</strong> 30t = 2.5(t − 2)²<br />
        12t = t² − 4t + 4<br />
        t² − 16t + 4 = 0<br />
        t = (16 + √(256 − 16))/2 = (16 + √240)/2 ≈ 15.75 s.<br /><br />

        <strong>Posición:</strong> x_A = 30 · 15.75 ≈ <strong>472.5 m</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscMRUA() {
  return (
    <EscenaRica>
      <Titulo>MRUA · Movimiento Rectilíneo Uniformemente Acelerado</Titulo>

      <Definicion termino="MRUA">
        Movimiento en línea recta con aceleración constante (a ≠ 0). La
        velocidad cambia uniformemente con el tiempo.
      </Definicion>

      <Resumen>
        <strong>Ecuaciones del MRUA (las 4 fundamentales)</strong>:<br />
        1. <strong>v = v₀ + a·t</strong> (velocidad a tiempo t).<br />
        2. <strong>x = x₀ + v₀·t + (1/2)·a·t²</strong> (posición a tiempo t).<br />
        3. <strong>v² = v₀² + 2·a·(x − x₀)</strong> (velocidad final dado el desplazamiento).<br />
        4. <strong>x = x₀ + (v + v₀)/2 · t</strong> (posición con velocidad media).
      </Resumen>

      <Mnemotecnia>
        <strong>Cuándo usar cada ecuación</strong>:<br />
        — Si conocés t y querés v: ec. 1.<br />
        — Si conocés t y querés x: ec. 2.<br />
        — Si NO conocés t pero conocés x: ec. 3.<br />
        — Si conocés v₀ y v final y querés x: ec. 4.<br /><br />
        Es importante identificar primero los datos para elegir la ecuación.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEcuaciones() {
  return (
    <EscenaRica>
      <Titulo>Aplicando las 4 ecuaciones</Titulo>

      <WorkedExample titulo="Problema completo">
        Una pelota parte del reposo y rueda con aceleración 5.33 m/s². ¿Qué
        distancia cubre en los primeros 5 s?<br /><br />

        Datos: v₀ = 0, a = 5.33 m/s², t = 5 s. Buscamos x.<br />
        Usando ec. 2: x = 0 · 5 + (1/2)(5.33)(25) = 66.67 m.<br /><br />

        Esto replica el problema F11 del facsímil 2op-2-2025.
      </WorkedExample>

      <WorkedExample titulo="Problema de frenado · facsímil F14 1op-2-2025">
        Coeficiente de fricción 0.80, velocidad inicial 28.7 m/s, ¿distancia
        para detenerse?<br /><br />

        Desaceleración: a = μg = 0.80 · 9.8 = 7.84 m/s² (en sentido contrario
        al movimiento, por eso será −7.84).<br /><br />

        Usando ec. 3 con v = 0 (se detiene):<br />
        0 = v₀² + 2·a·d → d = v₀²/(2·a) = (28.7)²/(2·7.84) = 823.69/15.68 =
        <strong> 52.53 m</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscCaidaLibre() {
  return (
    <EscenaRica>
      <Titulo>Caída libre · MRUA con g</Titulo>

      <Definicion termino="Caída libre">
        Movimiento de un objeto bajo la acción exclusiva de la gravedad. La
        aceleración es constante e igual a g = 9.8 m/s² (a menudo aproximada
        a 10 m/s²) hacia abajo.
      </Definicion>

      <Resumen>
        <strong>Adaptación de las ecuaciones</strong>:<br />
        Si y es vertical (positivo hacia arriba), la aceleración es a = −g.<br />
        — v = v₀ − g·t.<br />
        — y = y₀ + v₀·t − (1/2)·g·t².<br />
        — v² = v₀² − 2g(y − y₀).
      </Resumen>

      <WorkedExample titulo="Lanzamiento vertical hacia arriba">
        Una pelota se lanza hacia arriba con v₀ = 20 m/s. ¿Cuánto tarda en
        alcanzar la altura máxima? (g = 10)<br /><br />

        En la altura máxima v = 0. Usando v = v₀ − g·t:<br />
        0 = 20 − 10·t → t = <strong>2 s</strong>.<br /><br />

        Altura máxima: usando y = v₀·t − (1/2)g·t² con t=2:<br />
        y = 40 − 20 = 20 m.
      </WorkedExample>

      <WorkedExample titulo="Pozo con eco · facsímil F10 3op-2025">
        Una piedra se deja caer en un pozo y el ruido al chocar se oye 9 s
        después. Velocidad sonido = 320 m/s, g = 10. ¿Profundidad del pozo?<br /><br />

        Tiempo total = tiempo de caída + tiempo del sonido subiendo.<br />
        Caída: h = (1/2)g·t₁² → t₁ = √(2h/g).<br />
        Sonido: t₂ = h / 320.<br />
        t₁ + t₂ = 9.<br /><br />

        Probando h = 320: t₁ = √64 = 8 s; t₂ = 1 s; total = 9 ✓.<br />
        Profundidad: <strong>320 m</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscProblemasTipo() {
  return (
    <EscenaRica>
      <Titulo>Más problemas tipo examen</Titulo>

      <WorkedExample titulo="Pelota desde colina · F11 2op-2-2025">
        Una pelota parte del reposo y baja una colina con aceleración uniforme,
        recorriendo 200 m entre los segundos 5 y 10. ¿Qué distancia cubrió en
        los primeros 5 s?<br /><br />

        Entre 5 y 10 s recorre: Δx = (1/2)·a·(10² − 5²) = (1/2)·a·75 = 37.5a.<br />
        Igualando a 200: a = 200/37.5 = 5.33 m/s².<br /><br />

        Primeros 5 s: x = (1/2)(5.33)(25) = <strong>66.67 m</strong>.
      </WorkedExample>

      <WorkedExample titulo="Persecución · F9 3op-2025">
        Un hombre corre a 5 m/s tras un microbús en reposo a 6 m de distancia.
        El microbús parte con aceleración 2 m/s². ¿Tiempo en alcanzarlo?<br /><br />

        Posición hombre: 5t.<br />
        Posición microbús: 6 + (1/2)(2)t² = 6 + t².<br /><br />

        Igualar: 5t = 6 + t² → t² − 5t + 6 = 0 → t = 2 o t = 3.<br />
        Primer encuentro: <strong>t = 2 s</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Un objeto en reposo cae libremente. Distancia recorrida en 3 s (g=10):",
      o: ["45 m", "30 m", "90 m", "9 m"],
      c: 0,
      ex: "y = (1/2)(10)(9) = 45 m.",
    },
    {
      p: "Auto frena de 20 m/s a 0 en 5 s. Aceleración:",
      o: ["-4 m/s²", "4 m/s²", "-100 m/s²", "0 m/s²"],
      c: 0,
      ex: "a = (0 - 20)/5 = -4 m/s². (Negativa = frenado).",
    },
    {
      p: "MRU: si v=20 m/s y empezamos en x₀=10 m, ¿posición en t=4 s?",
      o: ["90 m", "80 m", "10 m", "30 m"],
      c: 0,
      ex: "x = 10 + 20·4 = 90 m.",
    },
    {
      p: "Tiempo de caída desde 80 m (g=10, v₀=0):",
      o: ["4 s", "8 s", "16 s", "2 s"],
      c: 0,
      ex: "80 = (1/2)(10)t² → t² = 16 → t = 4.",
    },
    {
      p: "Velocidad al impactar el suelo desde 20 m (g=10):",
      o: ["20 m/s", "10 m/s", "40 m/s", "200 m/s"],
      c: 0,
      ex: "v² = 0 + 2(10)(20) = 400 → v = 20 m/s.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · confundir desplazamiento con distancia">
        Si volvés al punto de partida, desplazamiento = 0 pero distancia es lo
        que recorriste total.
      </Misconception>

      <Misconception titulo="Error 2 · signo de g en caída libre">
        Si tomás "positivo hacia arriba", g va con signo negativo en las
        ecuaciones (a = −g = −9.8). Si tomás "positivo hacia abajo",
        a = +g = +9.8.
      </Misconception>

      <Misconception titulo="Error 3 · usar v_media para encontrar posiciones intermedias">
        v_media = Δx/Δt solo te da la posición FINAL si conocés el tiempo
        total. No es la velocidad en momentos intermedios (a menos que el
        movimiento sea MRU).
      </Misconception>

      <Titulo>Práctica · 5 ejercicios</Titulo>
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
