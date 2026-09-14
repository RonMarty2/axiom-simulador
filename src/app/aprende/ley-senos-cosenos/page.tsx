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
import { Pizarra, LIENZO } from "../_components/lienzo";
import MathText from "../../components/MathText";

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

// ─── Triángulo dibujado con geometría REAL (regla 7 de la bitácora) ───
// Se ubica A en el origen, B sobre el eje x a distancia c, y C se calcula
// con la ley de cosenos: C = (b·cos A, b·sen A). Nada está "dibujado a ojo".
function TrianguloSVG({
  b, c, angA, etiquetas, destacar, alto = 230,
}: {
  b: number; c: number; angA: number;
  etiquetas?: { A?: string; B?: string; C?: string; a?: string; b?: string; c?: string };
  destacar?: "a" | "b" | "c" | "A" | "B" | "C";
  alto?: number;
}) {
  const rad = (angA * Math.PI) / 180;
  // vértices en coordenadas matemáticas
  const A = { x: 0, y: 0 };
  const B = { x: c, y: 0 };
  const C = { x: b * Math.cos(rad), y: b * Math.sin(rad) };
  // lado a (opuesto a A) por ley de cosenos, para etiquetar
  const aLen = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(rad));
  // ángulos B y C por ley de senos/cosenos
  const angB = (Math.acos((aLen * aLen + c * c - b * b) / (2 * aLen * c)) * 180) / Math.PI;
  const angC = 180 - angA - angB;

  // escalar al viewBox
  const W = 480, H = alto, pad = 46;
  const xs = [A.x, B.x, C.x], ys = [A.y, B.y, C.y];
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const escala = Math.min((W - 2 * pad) / (maxX - minX || 1), (H - 2 * pad) / (maxY - minY || 1));
  const offX = (W - (maxX - minX) * escala) / 2 - minX * escala;
  const offY = H - pad;
  const px = (p: { x: number; y: number }) => ({ x: offX + p.x * escala, y: offY - p.y * escala });
  const pA = px(A), pB = px(B), pC = px(C);

  const col = (id: string) => (destacar === id ? LIENZO.accent : LIENZO.fg);
  const grosor = (id: string) => (destacar === id ? 3.5 : 2);
  const medio = (p: { x: number; y: number }, q: { x: number; y: number }) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
  // arco de ángulo en un vértice
  const arco = (v: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, r: number) => {
    const a1 = Math.atan2(p1.y - v.y, p1.x - v.x);
    const a2 = Math.atan2(p2.y - v.y, p2.x - v.x);
    const s = { x: v.x + r * Math.cos(a1), y: v.y + r * Math.sin(a1) };
    const e = { x: v.x + r * Math.cos(a2), y: v.y + r * Math.sin(a2) };
    let d = a2 - a1;
    while (d < -Math.PI) d += 2 * Math.PI;
    while (d > Math.PI) d -= 2 * Math.PI;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${e.x} ${e.y}`;
  };

  const mAB = medio(pA, pB), mBC = medio(pB, pC), mAC = medio(pA, pC);
  return (
    <Pizarra alto={alto}>
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <polygon points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`} fill={LIENZO.accent} opacity="0.07" />
        <line x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} stroke={col("c")} strokeWidth={grosor("c")} />
        <line x1={pB.x} y1={pB.y} x2={pC.x} y2={pC.y} stroke={col("a")} strokeWidth={grosor("a")} />
        <line x1={pA.x} y1={pA.y} x2={pC.x} y2={pC.y} stroke={col("b")} strokeWidth={grosor("b")} />

        <path d={arco(pA, pB, pC, 26)} fill="none" stroke={destacar === "A" ? LIENZO.accent : LIENZO.warn} strokeWidth="2" />
        <path d={arco(pB, pC, pA, 24)} fill="none" stroke={destacar === "B" ? LIENZO.accent : LIENZO.warn} strokeWidth="2" />
        <path d={arco(pC, pA, pB, 22)} fill="none" stroke={destacar === "C" ? LIENZO.accent : LIENZO.warn} strokeWidth="2" />

        <text x={pA.x - 16} y={pA.y + 16} fontSize="13" fontWeight="700" fill={LIENZO.fg}>{etiquetas?.A ?? `A=${angA.toFixed(0)}°`}</text>
        <text x={pB.x + 6} y={pB.y + 16} fontSize="13" fontWeight="700" fill={LIENZO.fg}>{etiquetas?.B ?? `B=${angB.toFixed(1)}°`}</text>
        <text x={pC.x - 8} y={pC.y - 12} fontSize="13" fontWeight="700" fill={LIENZO.fg}>{etiquetas?.C ?? `C=${angC.toFixed(1)}°`}</text>

        <text x={mAB.x} y={mAB.y + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={col("c")}>{etiquetas?.c ?? `c=${c}`}</text>
        <text x={mBC.x + 14} y={mBC.y} textAnchor="middle" fontSize="12" fontWeight="700" fill={col("a")}>{etiquetas?.a ?? `a=${aLen.toFixed(2)}`}</text>
        <text x={mAC.x - 20} y={mAC.y} textAnchor="middle" fontSize="12" fontWeight="700" fill={col("b")}>{etiquetas?.b ?? `b=${b}`}</text>
      </svg>
    </Pizarra>
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

      <TrianguloSVG b={9} c={12} angA={52}
        etiquetas={{ A: "A", B: "B", C: "C", a: "a", b: "b", c: "c" }} />

      <Resumen>
        <strong>Notación estándar</strong>:<br />
        En un triángulo ABC:<br />
        • Los <strong>ángulos</strong> se nombran con letras MAYÚSCULAS: A, B, C.<br />
        • Los <strong>lados</strong> opuestos se nombran con letras minúsculas:
        a (opuesto a A), b (opuesto a B), c (opuesto a C).
      </Resumen>

      <PorQue>
        <strong>Resolver un triángulo</strong> significa encontrar TODOS sus
        elementos (3 lados + 3 ángulos = 6). Necesitas 3 datos para resolverlo
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
        <div style={{ textAlign: "center", padding: "8px 0", overflowX: "auto" }}>
          <MathText>{"$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C}$"}</MathText>
        </div>
      </Resumen>

      <TrianguloSVG b={9} c={12} angA={52}
        etiquetas={{ A: "A", B: "B", C: "C", a: "a", b: "b", c: "c" }} />

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
        <strong>Cuándo usar ley de senos</strong> · necesitas:<br />
        • Un lado y su ángulo opuesto, MÁS otro elemento (otro ángulo u otro
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

        <strong>Aplicar:</strong>
        <div style={{ textAlign: "center", padding: "6px 0", overflowX: "auto" }}>
          <MathText>{"$\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} \\ \\Rightarrow\\ b = \\dfrac{12\\sin 60^\\circ}{\\sin 40^\\circ} \\approx 16.17$"}</MathText>
        </div>
      </WorkedExample>
      <TrianguloSVG b={16.17} c={18.385} angA={40}
        etiquetas={{ A: "A=40°", B: "B=60°", C: "C=80°", a: "a=12", b: "b=16.17", c: "c" }} destacar="b" />

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
        <strong>Para el lado a (frente al ángulo A)</strong>:
        <div style={{ textAlign: "center", padding: "8px 0", overflowX: "auto" }}>
          <MathText>{"$a^2 = b^2 + c^2 - 2bc\\cos A$"}</MathText>
        </div>
        Equivalentemente para los otros lados:<br />
        • <MathText>{"$b^2 = a^2 + c^2 - 2ac\\cos B$"}</MathText><br />
        • <MathText>{"$c^2 = a^2 + b^2 - 2ab\\cos C$"}</MathText>
      </Resumen>

      <TrianguloSVG b={9} c={12} angA={52}
        etiquetas={{ A: "A", B: "B", C: "C", a: "a (buscado)", b: "b", c: "c" }} destacar="A" />

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
        ENTRE ellos. Quieres el 3er lado.<br />
        2. <strong>LLL</strong> (Lado-Lado-Lado): te dan los 3 lados. Quieres un
        ángulo.<br /><br />
        Si despejas el coseno:
        <div style={{ textAlign: "center", padding: "6px 0", overflowX: "auto" }}>
          <MathText>{"$\\cos A = \\dfrac{b^2+c^2-a^2}{2bc}$"}</MathText>
        </div>
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
      <TrianguloSVG b={5} c={8} angA={60}
        etiquetas={{ A: "60°", B: "B", C: "C", a: "a=7", b: "5", c: "8" }} destacar="a" />

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
        • <strong>ALA</strong> (2 ángulos y lado entre ellos) → Ley de senos.<br />
        • <strong>AAL</strong> (2 ángulos y lado NO entre ellos) → Ley de senos.<br />
        • <strong>LAL</strong> (2 lados y ángulo entre ellos) → Ley de cosenos.<br />
        • <strong>LLL</strong> (3 lados) → Ley de cosenos.<br />
        • <strong>LLA</strong> (2 lados y ángulo NO entre ellos) → Ley de senos
        (caso ambiguo).
      </Resumen>

      <Mnemotecnia>
        <strong>Regla práctica</strong>:<br />
        • Si tienes un ÁNGULO opuesto a un LADO conocido → senos.<br />
        • Si NO tienes esa pareja (ángulo opuesto a lado), o si te dan 3 lados
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
        Si conoces 2 lados y el ángulo entre ellos:
        <div style={{ textAlign: "center", padding: "8px 0", overflowX: "auto" }}>
          <MathText>{"$\\text{Área} = \\tfrac12 ab\\sin C$"}</MathText>
        </div>
        donde a y b son dos lados, y C es el ángulo ENTRE ellos.
      </Resumen>

      <TrianguloSVG b={7} c={10} angA={60}
        etiquetas={{ A: "60°", B: "B", C: "C", a: "a", b: "7", c: "10" }} destacar="A" />

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
      <TrianguloSVG b={150} c={100} angA={40}
        etiquetas={{ A: "A=40°", B: "B", C: "C", a: "BC≈97.57", b: "AC=150", c: "AB=100" }} destacar="a" />

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
        Usa ley de cosenos.
      </Misconception>

      <Misconception titulo="Error 2 · ignorar el caso ambiguo (LLA)">
        Si te dan 2 lados y un ángulo NO comprendido, puede haber 0, 1 o 2
        triángulos. Siempre verifica si la segunda solución (180° − ángulo
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
