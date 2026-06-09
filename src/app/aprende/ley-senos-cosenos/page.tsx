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
      unidad="GT-08"
      tituloUnidad="Ley de senos y cosenos · Triángulos no rectángulos"
      escenas={[
        { titulo: "Cuando el triángulo NO es rectángulo", componente: EscIntro },
        { titulo: "Ley de senos", componente: EscLeySenos },
        { titulo: "Aplicaciones · ley de senos", componente: EscAplicSenos },
        { titulo: "Ley de cosenos", componente: EscLeyCosenos },
        { titulo: "Aplicaciones · ley de cosenos", componente: EscAplicCosenos },
        { titulo: "¿Cuándo usar cuál?", componente: EscCualUsar },
        { titulo: "Área con seno", componente: EscAreaSeno },
        { titulo: "Problemas prácticos", componente: EscPracticos },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Resolver triángulos cualesquiera</Titulo>

      <Hook>
        Hasta ahora, SOH-CAH-TOA solo servía para triángulos rectángulos. Pero
        muchos problemas reales (y de examen) tienen triángulos sin ángulo
        recto. Ley de senos y cosenos generalizan la trigonometría a CUALQUIER
        triángulo.
      </Hook>

      <Resumen>
        <strong>Notación estándar</strong>:<br />
        En un triángulo ABC:<br />
        — Los <strong>ángulos</strong> se nombran con letras MAYÚSCULAS: A, B, C.<br />
        — Los <strong>lados</strong> opuestos se nombran con letras minúsculas:
        a (opuesto a A), b (opuesto a B), c (opuesto a C).
      </Resumen>

      <PorQue>
        <strong>Resolver un triángulo</strong> significa encontrar TODOS sus
        elementos (3 lados + 3 ángulos = 6). Necesitás 3 datos para resolverlo
        (mínimo), de los cuales al menos 1 debe ser un lado (los 3 ángulos solos
        no fijan tamaño, solo forma).
      </PorQue>
    </EscenaRica>
  );
}

function EscLeySenos() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Ley de senos</Titulo>

      <Resumen>
        <span style={{ fontSize: 20, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a / sen A = b / sen B = c / sen C
        </span>
      </Resumen>

      <Parrafo>
        La razón entre un lado y el seno del ángulo opuesto es CONSTANTE para
        los 3 lados de cualquier triángulo. Esa constante es 2R, donde R es el
        radio de la circunferencia circunscrita.
      </Parrafo>

      <PorQue>
        La demostración usa el teorema del ángulo inscrito (el inscrito vale la
        mitad del central). Sale geométricamente al inscribir el triángulo en
        una circunferencia. Esa es la razón profunda de por qué aparece el
        "2R".
      </PorQue>

      <Mnemotecnia>
        <strong>Cuándo usar ley de senos</strong> · necesitás:<br />
        — Un lado y su ángulo opuesto, MÁS otro elemento (otro ángulo u otro
        lado opuesto a otro ángulo conocido).<br /><br />
        Casos típicos:<br />
        1. <strong>ALA</strong> (Ángulo-Lado-Ángulo): te dan 2 ángulos y el
        lado entre ellos.<br />
        2. <strong>AAL</strong> (Ángulo-Ángulo-Lado): te dan 2 ángulos y un
        lado NO entre ellos.<br />
        3. <strong>LLA</strong> (Lado-Lado-Ángulo no comprendido): caso
        ambiguo (puede haber 0, 1 o 2 triángulos solución).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscAplicSenos() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones · ley de senos</Titulo>

      <WorkedExample titulo="Encontrar un lado">
        En un triángulo, A = 40°, B = 60°, a = 12. Encontrar b.<br /><br />

        <strong>Aplicar:</strong> a/sen A = b/sen B.<br />
        12/sen 40° = b/sen 60°.<br />
        b = 12 · sen 60° / sen 40° = 12 · 0.866 / 0.643 ≈ <strong>16.17</strong>.
      </WorkedExample>

      <WorkedExample titulo="Encontrar un ángulo">
        Lado a = 8, lado b = 10, ángulo A = 30°. Encontrar el ángulo B.<br /><br />

        <strong>Aplicar:</strong> a/sen A = b/sen B → sen B = b sen A / a.<br />
        sen B = 10 · sen 30° / 8 = 10 · 0.5 / 8 = 0.625.<br />
        B = arcsen(0.625) ≈ <strong>38.68°</strong>.<br /><br />

        <strong>Cuidado · caso ambiguo:</strong> también puede ser
        B = 180° − 38.68° = 141.32°. Hay que verificar si esta solución también
        funciona (la suma A + B no debe pasar de 180°).<br />
        30° + 141.32° = 171.32° &lt; 180° ✓. Hay DOS triángulos posibles.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscLeyCosenos() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Ley de cosenos</Titulo>

      <Resumen>
        <strong>Para el lado a (frente al ángulo A)</strong>:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          a² = b² + c² − 2bc · cos A
        </span><br /><br />
        Equivalentemente para los otros lados:<br />
        — b² = a² + c² − 2ac · cos B.<br />
        — c² = a² + b² − 2ab · cos C.
      </Resumen>

      <PorQue>
        <strong>Ley de cosenos es la generalización de Pitágoras</strong>.
        Si A = 90°, entonces cos A = 0, y queda a² = b² + c² (Pitágoras).<br /><br />
        El término "−2bc cos A" es la "corrección" cuando el triángulo no es
        rectángulo. Si A &lt; 90°, cos A &gt; 0, el término se resta (a más
        chico). Si A &gt; 90°, cos A &lt; 0, el término se suma (a más grande).
      </PorQue>

      <Mnemotecnia>
        <strong>Cuándo usar ley de cosenos</strong>:<br />
        1. <strong>LAL</strong> (Lado-Ángulo-Lado): te dan 2 lados y el ángulo
        ENTRE ellos. Querés el 3er lado.<br />
        2. <strong>LLL</strong> (Lado-Lado-Lado): te dan los 3 lados. Querés un
        ángulo.<br /><br />
        Si despejás el coseno:<br />
        <span style={{ fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          cos A = (b² + c² − a²) / (2bc)
        </span>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscAplicCosenos() {
  return (
    <EscenaRica>
      <Titulo>Aplicaciones · ley de cosenos</Titulo>

      <WorkedExample titulo="Caso LAL · encontrar tercer lado">
        Dos lados de un triángulo miden 5 y 8, y el ángulo entre ellos es 60°.
        Encontrar el tercer lado.<br /><br />

        Sea c el lado buscado, opuesto al ángulo de 60°.<br />
        c² = 5² + 8² − 2(5)(8) cos 60°<br />
        c² = 25 + 64 − 80 · (1/2)<br />
        c² = 89 − 40 = 49<br />
        c = <strong>7</strong>.
      </WorkedExample>

      <WorkedExample titulo="Caso LLL · encontrar un ángulo">
        Triángulo con lados a=6, b=7, c=8. Encontrar el ángulo C (opuesto al
        lado de 8).<br /><br />

        cos C = (a² + b² − c²) / (2ab) = (36 + 49 − 64) / 84 = 21/84 = 1/4.<br />
        C = arccos(1/4) ≈ <strong>75.52°</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscCualUsar() {
  return (
    <EscenaRica>
      <Titulo>Tabla de decisión · ¿senos o cosenos?</Titulo>

      <Resumen>
        <strong>Tabla rápida</strong>:<br /><br />
        — <strong>ALA</strong> (2 ángulos y lado entre ellos) → Ley de senos.<br />
        — <strong>AAL</strong> (2 ángulos y lado NO entre ellos) → Ley de senos.<br />
        — <strong>LAL</strong> (2 lados y ángulo entre ellos) → Ley de cosenos.<br />
        — <strong>LLL</strong> (3 lados) → Ley de cosenos.<br />
        — <strong>LLA</strong> (2 lados y ángulo NO entre ellos) → Ley de senos
        (caso ambiguo).
      </Resumen>

      <Mnemotecnia>
        <strong>Regla práctica</strong>:<br />
        — Si tenés un ÁNGULO opuesto a un LADO conocido → senos.<br />
        — Si NO tenés esa pareja (ángulo opuesto a lado), o si te dan 3 lados
        → cosenos.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscAreaSeno() {
  return (
    <EscenaRica>
      <Titulo>Área del triángulo con seno</Titulo>

      <Resumen>
        Si conocés 2 lados y el ángulo entre ellos:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          A = (1/2) · a · b · sen C
        </span><br /><br />
        donde a y b son dos lados, y C es el ángulo ENTRE ellos.
      </Resumen>

      <PorQue>
        La altura desde el vértice opuesto al lado a es b · sen C. Por tanto
        A = (1/2)(base)(altura) = (1/2)(a)(b sen C).
      </PorQue>

      <WorkedExample titulo="Ejemplo">
        Triángulo con lados 7 y 10 y ángulo entre ellos de 60°.<br /><br />

        A = (1/2)(7)(10)(sen 60°) = 35 · (√3/2) = 17.5√3 ≈ 30.31.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPracticos() {
  return (
    <EscenaRica>
      <Titulo>Problemas prácticos</Titulo>

      <WorkedExample titulo="Distancia entre dos puntos inaccesibles">
        Desde un punto A se observan dos puntos B y C. La distancia AB = 100 m
        y AC = 150 m. El ángulo BAC = 40°. ¿Cuál es la distancia BC?<br /><br />

        <strong>Aplicar ley de cosenos:</strong><br />
        BC² = 100² + 150² − 2(100)(150) cos 40°<br />
        BC² = 10000 + 22500 − 30000 · 0.766<br />
        BC² = 32500 − 22980 = 9520<br />
        BC ≈ <strong>97.57 m</strong>.
      </WorkedExample>

      <WorkedExample titulo="Navegación">
        Un barco navega 30 km al noreste (rumbo 045°), luego cambia y navega
        40 km al este (rumbo 090°). ¿Cuál es la distancia desde el punto de
        partida hasta el final?<br /><br />

        <strong>Ángulo entre los trayectos:</strong> 180° − (90° − 45°) = 135°.<br /><br />

        <strong>Ley de cosenos:</strong><br />
        d² = 30² + 40² − 2(30)(40) cos 135°<br />
        d² = 900 + 1600 − 2400 · (−√2/2)<br />
        d² = 2500 + 1200√2 ≈ 4197.<br />
        d ≈ <strong>64.78 km</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Triángulo con a=10, b=8, A=60°. sen B =",
      o: ["0.4√3", "√3/2", "0.5", "0.6"],
      c: 0,
      ex: "sen B = b·sen A / a = 8·(√3/2)/10 = 4√3/10 = 0.4√3.",
    },
    {
      p: "Triángulo LAL con lados 4 y 6, ángulo entre ellos 90°. Tercer lado =",
      o: ["√52", "10", "5", "2"],
      c: 0,
      ex: "c² = 16 + 36 - 2(4)(6)cos 90° = 52 - 0 = 52. c = √52. (Pitágoras también).",
    },
    {
      p: "Si A + B + C = 180° y C = 30° y B = 75°, A =",
      o: ["75°", "45°", "60°", "90°"],
      c: 0,
      ex: "A = 180 - 75 - 30 = 75°.",
    },
    {
      p: "En un triángulo equilátero de lado L, área =",
      o: ["L²√3/4", "L²/2", "L²", "L²√2/4"],
      c: 0,
      ex: "A = (1/2)L·L·sen 60° = (1/2)L²(√3/2) = L²√3/4.",
    },
    {
      p: "Triángulo con lados 5, 6, 7. cos del ángulo opuesto a 7 =",
      o: ["1/5", "1/3", "0", "−1/5"],
      c: 0,
      ex: "cos C = (25 + 36 - 49)/(2·5·6) = 12/60 = 1/5.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores comunes + Práctica</Titulo>

      <Misconception titulo="Error 1 · usar ley de senos con caso LAL">
        Si te dan 2 lados y el ángulo ENTRE ellos (LAL), la ley de senos NO
        funciona directamente (faltaría el ángulo opuesto a un lado conocido).
        Usá ley de cosenos.
      </Misconception>

      <Misconception titulo="Error 2 · ignorar el caso ambiguo (LLA)">
        Si te dan 2 lados y un ángulo NO comprendido, puede haber 0, 1 o 2
        triángulos. Siempre verificá si la segunda solución (180° − ángulo
        principal) es válida.
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
