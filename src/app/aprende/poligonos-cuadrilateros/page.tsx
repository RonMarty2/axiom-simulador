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
      unidad="GT-04"
      tituloUnidad="Polígonos y cuadriláteros"
      escenas={[
        { titulo: "Polígono · concepto y elementos", componente: EscIntro },
        { titulo: "Polígonos regulares · explorador", componente: EscRegulares },
        { titulo: "Suma de ángulos interiores", componente: EscSumaAng },
        { titulo: "Perímetro y área de regulares", componente: EscArea },
        { titulo: "Cuadriláteros · clasificación", componente: EscCuadrilateros },
        { titulo: "Paralelogramos · propiedades", componente: EscParalelogramos },
        { titulo: "Trapecios", componente: EscTrapecios },
        { titulo: "Errores comunes", componente: EscErrores },
        { titulo: "Práctica final", componente: EscPractica },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG · Polígono regular paramétrico
// ─────────────────────────────────────────────────────────────────────────────
function PoligonoSVG({ n = 6, radius = 70, color = LIENZO.accent }: { n?: number; radius?: number; color?: string }) {
  const cx = 200, cy = 130;
  const points = [];
  for (let i = 0; i < n; i++) {
    const angle = (i * 2 * Math.PI) / n - Math.PI / 2;
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
  }
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <motion.polygon points={points.join(" ")}
            fill={`${color}33`} stroke={color} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }} />
          {points.map((p, i) => {
            const [x, y] = p.split(",").map(Number);
            return (
              <motion.circle key={i} cx={x} cy={y} r="4" fill={LIENZO.fg}
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} />
            );
          })}
          <text x="200" y="200" textAnchor="middle" fontSize="14" fill={LIENZO.fgDim}>
            n = {n} lados · {n} vértices · {n} ángulos
          </text>
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
      <Titulo>Polígono · figura cerrada de lados rectos</Titulo>

      <Hook>
        Los polígonos regulares aparecen en problemas de áreas, perímetros y
        ángulos. Hexágonos, pentágonos, octógonos son los más comunes en el
        examen FCyT.
      </Hook>

      <Definicion termino="Polígono">
        Figura plana cerrada formada por <strong>segmentos rectos</strong>
        (lados) que se conectan entre sí formando vértices. El polígono más
        chico es el triángulo (3 lados).
      </Definicion>

      <Resumen>
        <strong>Elementos del polígono</strong>:<br />
        — <strong>Lados</strong>: los segmentos.<br />
        — <strong>Vértices</strong>: puntos donde se cortan los lados.<br />
        — <strong>Ángulos interiores</strong>: dentro del polígono.<br />
        — <strong>Ángulos exteriores</strong>: suplementarios de los interiores.<br />
        — <strong>Diagonales</strong>: segmentos que unen vértices NO consecutivos.
      </Resumen>

      <Definicion termino="Polígono regular">
        Polígono que tiene <strong>todos sus lados iguales Y todos sus ángulos
        iguales</strong>. Si solo cumple una de las dos condiciones, NO es
        regular.
      </Definicion>

      <Mnemotecnia>
        <strong>Nombres de polígonos por cantidad de lados</strong>:<br />
        3 → triángulo · 4 → cuadrilátero · 5 → pentágono · 6 → hexágono ·
        7 → heptágono · 8 → octógono · 9 → eneágono · 10 → decágono ·
        12 → dodecágono · 15 → pentadecágono · 20 → icoságono · n → n-ágono.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc02 · Explorador
// ─────────────────────────────────────────────────────────────────────────────
function EscRegulares() {
  const [n, setN] = useState(6);
  const sumaInterior = (n - 2) * 180;
  const angInterior = sumaInterior / n;
  const angCentral = 360 / n;
  return (
    <EscenaRica>
      <Titulo>Explorador de polígonos regulares</Titulo>
      <Parrafo>
        Mové el slider para cambiar el número de lados. Mirá cómo cambian los
        ángulos y la "redondez" del polígono.
      </Parrafo>

      <PoligonoSVG n={n} />

      <div style={{ maxWidth: 480, marginTop: 12 }}>
        <input type="range" min={3} max={20} value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.accent }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12, fontFamily: "var(--font-crimson), serif" }}>
          <div style={{ padding: 10, background: "var(--bg-card)", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Suma ángulos interiores</div>
            <div style={{ fontSize: 22, color: LIENZO.accent, fontWeight: 700 }}>{sumaInterior}°</div>
          </div>
          <div style={{ padding: 10, background: "var(--bg-card)", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Cada ángulo interior</div>
            <div style={{ fontSize: 22, color: LIENZO.accent, fontWeight: 700 }}>{angInterior.toFixed(2)}°</div>
          </div>
          <div style={{ padding: 10, background: "var(--bg-card)", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Ángulo central</div>
            <div style={{ fontSize: 22, color: COLOR_OK, fontWeight: 700 }}>{angCentral.toFixed(2)}°</div>
          </div>
          <div style={{ padding: 10, background: "var(--bg-card)", borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: LIENZO.fgDim }}>Cantidad de diagonales</div>
            <div style={{ fontSize: 22, color: COLOR_EXP, fontWeight: 700 }}>{n * (n - 3) / 2}</div>
          </div>
        </div>
      </div>

      <PorQue>
        A medida que n crece, el polígono se "redondea" — en el límite, se
        convierte en una circunferencia. Por eso un decágono se ve "casi
        circular".
      </PorQue>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc03 · Suma de ángulos
// ─────────────────────────────────────────────────────────────────────────────
function EscSumaAng() {
  return (
    <EscenaRica>
      <Titulo>Suma de ángulos interiores · fórmula</Titulo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          S = (n − 2) · 180°
        </span><br /><br />
        donde n es el número de lados.
      </Resumen>

      <PorQue>
        <strong>¿De dónde sale (n−2)?</strong> Cualquier polígono de n lados se
        puede dividir en (n−2) triángulos trazando diagonales desde un mismo
        vértice. Como cada triángulo aporta 180°, el total es (n−2) · 180°.
      </PorQue>

      <Ejemplo titulo="Aplicaciones rápidas">
        — Triángulo: (3−2)·180 = <strong>180°</strong>.<br />
        — Cuadrilátero: (4−2)·180 = <strong>360°</strong>.<br />
        — Pentágono: (5−2)·180 = <strong>540°</strong>.<br />
        — Hexágono: (6−2)·180 = <strong>720°</strong>.<br />
        — Octógono: (8−2)·180 = <strong>1080°</strong>.
      </Ejemplo>

      <Resumen>
        <strong>Ángulo interior de un polígono regular</strong>:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          α = (n − 2) · 180° / n
        </span>
      </Resumen>

      <Ejemplo titulo="Ángulo interior de cada polígono regular">
        — Triángulo equilátero: 180/3 = <strong>60°</strong>.<br />
        — Cuadrado: 360/4 = <strong>90°</strong>.<br />
        — Pentágono regular: 540/5 = <strong>108°</strong>.<br />
        — Hexágono regular: 720/6 = <strong>120°</strong>.<br />
        — Octógono regular: 1080/8 = <strong>135°</strong>.
      </Ejemplo>

      <WorkedExample titulo="Problema típico · encontrar n">
        Un polígono regular tiene cada ángulo interior de 144°. ¿Cuántos lados
        tiene?<br /><br />

        <strong>Aplicar fórmula:</strong><br />
        (n − 2) · 180° / n = 144°<br />
        180n − 360 = 144n<br />
        36n = 360<br />
        n = <strong>10</strong> (decágono).
      </WorkedExample>

      <Mnemotecnia>
        <strong>Suma de ángulos EXTERIORES de cualquier polígono = 360°</strong>.<br />
        Esto NO depende de n. Si querés el ángulo exterior de un polígono
        regular: 360°/n.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc04 · Perímetro y área
// ─────────────────────────────────────────────────────────────────────────────
function EscArea() {
  return (
    <EscenaRica>
      <Titulo>Perímetro y área de polígonos regulares</Titulo>

      <Definicion termino="Apotema">
        Distancia del centro del polígono regular al punto medio de un lado.
        Es perpendicular al lado.
      </Definicion>

      <Resumen>
        <strong>Perímetro</strong>: P = n · L (donde L es el lado).<br /><br />
        <strong>Área</strong>: <br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          A = P · apotema / 2
        </span>
      </Resumen>

      <PorQue>
        El polígono regular se puede dividir en n triángulos iguales con
        vértice en el centro. Cada triángulo tiene base L (un lado) y altura
        igual a la apotema. Área de cada triángulo: L · apotema / 2. Total:
        n · L · apotema / 2 = P · apotema / 2.
      </PorQue>

      <Ejemplo titulo="Hexágono regular · caso especial">
        En un hexágono regular, la apotema es <strong>(L√3)/2</strong> donde L
        es el lado. Y el área es:<br />
        A = (3√3 / 2) · L².<br /><br />
        Esto sale de dividir el hexágono en 6 triángulos equiláteros, cada uno
        con área (L²√3)/4.
      </Ejemplo>

      <WorkedExample titulo="Calcular área de un hexágono regular">
        Un hexágono regular tiene lado 4 cm. ¿Cuál es su área?<br /><br />

        <strong>Opción 1 · fórmula directa:</strong><br />
        A = (3√3 / 2) · 4² = (3√3 / 2) · 16 = 24√3 ≈ <strong>41.57 cm²</strong>.<br /><br />

        <strong>Opción 2 · descomponer en triángulos:</strong><br />
        Cada triángulo equilátero: (4²√3)/4 = 4√3 ≈ 6.93 cm².<br />
        6 triángulos: 6 · 4√3 = 24√3 ≈ 41.57 cm². ✓
      </WorkedExample>

      <Mnemotecnia>
        <strong>Tabla de áreas memorizable</strong>:<br />
        — Cuadrado de lado L: A = L².<br />
        — Triángulo equilátero de lado L: A = L²√3 / 4.<br />
        — Hexágono regular de lado L: A = 3L²√3 / 2.<br />
        — Círculo de radio R: A = πR².
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc05 · Cuadriláteros
// ─────────────────────────────────────────────────────────────────────────────
function EscCuadrilateros() {
  return (
    <EscenaRica>
      <Titulo>Cuadriláteros · clasificación jerárquica</Titulo>

      <Parrafo>
        Hay muchos tipos de cuadriláteros. Se organizan en una jerarquía donde
        cada nivel es un caso ESPECIAL del anterior.
      </Parrafo>

      <Resumen>
        <strong>Jerarquía (de más general a más particular)</strong>:<br /><br />
        <strong>Cuadrilátero</strong> → 4 lados cualquiera.<br />
        ↓<br />
        <strong>Trapecio</strong> → al menos 1 par de lados paralelos.<br />
        ↓<br />
        <strong>Paralelogramo</strong> → 2 pares de lados paralelos.<br />
        ↓<br />
        Se divide en dos ramas:<br />
        — <strong>Rombo</strong> (4 lados iguales) → diamante.<br />
        — <strong>Rectángulo</strong> (4 ángulos rectos).<br />
        ↓<br />
        <strong>Cuadrado</strong> → es a la vez rombo Y rectángulo.
      </Resumen>

      <Mnemotecnia>
        <strong>Cuadrado · el "más exclusivo"</strong>:<br />
        Un cuadrado es siempre rombo, rectángulo, paralelogramo, trapecio y
        cuadrilátero. Pero un cuadrilátero general NO es cuadrado.<br /><br />
        En el examen: si te preguntan "qué propiedades tiene un cuadrado",
        hereda TODAS las del rombo + TODAS las del rectángulo.
      </Mnemotecnia>

      <Definicion termino="Propiedades comunes a todos los cuadriláteros">
        — Suma de ángulos interiores: 360°.<br />
        — Tienen exactamente 2 diagonales.
      </Definicion>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc06 · Paralelogramos
// ─────────────────────────────────────────────────────────────────────────────
function EscParalelogramos() {
  return (
    <EscenaRica>
      <Titulo>Paralelogramos · propiedades clave</Titulo>

      <Definicion termino="Paralelogramo">
        Cuadrilátero con los dos pares de lados opuestos paralelos.
      </Definicion>

      <Resumen>
        <strong>Propiedades de TODO paralelogramo</strong>:<br />
        1. Lados opuestos son <strong>iguales</strong>.<br />
        2. Ángulos opuestos son <strong>iguales</strong>.<br />
        3. Ángulos consecutivos son <strong>suplementarios</strong> (suman 180°).<br />
        4. Las diagonales <strong>se cortan en sus puntos medios</strong> (se bisecan).
      </Resumen>

      <Definicion termino="Tipos especiales">
        — <strong>Rectángulo</strong>: paralelogramo con 4 ángulos rectos. Las
        diagonales son iguales entre sí.<br />
        — <strong>Rombo</strong>: paralelogramo con 4 lados iguales. Las
        diagonales son perpendiculares entre sí y bisecan los ángulos.<br />
        — <strong>Cuadrado</strong>: paralelogramo con 4 lados iguales Y 4
        ángulos rectos. Tiene las propiedades del rombo Y del rectángulo.
      </Definicion>

      <Resumen>
        <strong>Áreas de paralelogramos</strong>:<br />
        — <strong>Paralelogramo general</strong>: A = base × altura.<br />
        — <strong>Rectángulo</strong>: A = largo × ancho.<br />
        — <strong>Rombo</strong>: A = (diagonal mayor × diagonal menor) / 2.<br />
        — <strong>Cuadrado</strong>: A = L² (o también A = d²/2 con d = diagonal).
      </Resumen>

      <WorkedExample titulo="Área de un rombo">
        Un rombo tiene diagonales de 8 cm y 6 cm. ¿Cuál es su área?<br /><br />

        A = (8 · 6) / 2 = 48/2 = <strong>24 cm²</strong>.<br /><br />

        <strong>Verificación con Pitágoras:</strong> el rombo se divide en 4
        triángulos rectángulos por las diagonales. Cada triángulo tiene catetos
        4 y 3 (mitades de las diagonales), y el lado del rombo es
        hipotenusa = √(16+9) = 5 cm. Área cada triángulo = 4·3/2 = 6. Total =
        4 · 6 = 24 cm². ✓
      </WorkedExample>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc07 · Trapecios
// ─────────────────────────────────────────────────────────────────────────────
function EscTrapecios() {
  return (
    <EscenaRica>
      <Titulo>Trapecios</Titulo>

      <Definicion termino="Trapecio">
        Cuadrilátero con EXACTAMENTE un par de lados paralelos (llamados bases).
        Los otros dos lados son no paralelos.<br /><br />
        Algunas definiciones admiten que un paralelogramo es un caso especial
        de trapecio (los dos pares paralelos). Otras exigen que el segundo par
        no sea paralelo (definición exclusiva).
      </Definicion>

      <Definicion termino="Tipos de trapecio">
        — <strong>Trapecio isósceles</strong>: los dos lados no paralelos son
        iguales. Tiene un eje de simetría perpendicular a las bases.<br />
        — <strong>Trapecio rectángulo</strong>: tiene 2 ángulos rectos
        consecutivos (un lado no paralelo es perpendicular a las bases).<br />
        — <strong>Trapecio escaleno</strong>: los lados no paralelos son
        distintos.
      </Definicion>

      <Resumen>
        <strong>Área del trapecio</strong>:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          A = (B + b) · h / 2
        </span><br /><br />
        donde B y b son las bases (paralelas) y h es la altura (perpendicular
        a las bases).
      </Resumen>

      <PorQue>
        Esta fórmula se interpreta como "el área del trapecio es la altura
        multiplicada por el PROMEDIO de las dos bases". Por eso (B+b)/2.
      </PorQue>

      <WorkedExample titulo="Área de un trapecio típico de examen">
        Un trapecio tiene bases de 12 cm y 8 cm, y altura 5 cm. ¿Área?<br /><br />

        A = (12 + 8) · 5 / 2 = 100/2 = <strong>50 cm²</strong>.
      </WorkedExample>

      <Definicion termino="Mediana del trapecio">
        Segmento que une los puntos medios de los dos lados no paralelos. Es
        paralela a las bases y su longitud es el <strong>promedio</strong> de
        las bases: m = (B + b) / 2.<br /><br />
        Por tanto: A = mediana · altura.
      </Definicion>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc08 · Errores
// ─────────────────────────────────────────────────────────────────────────────
function EscErrores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>

      <Misconception titulo="Error 1 · creer que rombo = cuadrado">
        Un rombo tiene 4 lados iguales pero NO necesariamente ángulos rectos.
        Un cuadrado SÍ tiene los 4 lados iguales y 4 ángulos rectos.<br /><br />
        Todo cuadrado es rombo, pero no todo rombo es cuadrado.
      </Misconception>

      <Misconception titulo="Error 2 · confundir las diagonales del rombo">
        En el rombo, las diagonales son PERPENDICULARES pero NO iguales entre
        sí (salvo que sea cuadrado).<br /><br />
        En el rectángulo, las diagonales son IGUALES pero NO perpendiculares
        (salvo que sea cuadrado).<br /><br />
        Solo en el cuadrado se cumple ambas: iguales Y perpendiculares.
      </Misconception>

      <Misconception titulo="Error 3 · sumar el área del trapecio sin /2">
        El área del trapecio es (B+b)·h/2. La división por 2 viene de que el
        promedio de las bases es (B+b)/2, no la suma. Olvidar el /2 da el
        doble del área real.
      </Misconception>

      <Misconception titulo="Error 4 · aplicar (n-2)·180 a polígonos cóncavos">
        La fórmula vale para polígonos CONVEXOS (los que no tienen "muescas").
        En cóncavos hay que ser más cuidadoso. En el examen, casi siempre son
        convexos, pero confirmá visualmente.
      </Misconception>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc09 · Práctica
// ─────────────────────────────────────────────────────────────────────────────
function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Suma de ángulos interiores de un pentágono:",
      o: ["540°", "360°", "720°", "180°"],
      c: 0,
      ex: "(5-2) · 180 = 540°.",
    },
    {
      p: "Cada ángulo interior de un hexágono regular mide:",
      o: ["108°", "120°", "135°", "150°"],
      c: 1,
      ex: "(6-2) · 180 / 6 = 720/6 = 120°.",
    },
    {
      p: "Área de un rombo con diagonales 10 y 12:",
      o: ["60", "120", "22", "240"],
      c: 0,
      ex: "A = (10·12)/2 = 60.",
    },
    {
      p: "Área de un trapecio con bases 14 y 6, altura 8:",
      o: ["80", "160", "40", "112"],
      c: 0,
      ex: "A = (14+6)·8/2 = 20·8/2 = 80.",
    },
    {
      p: "Un polígono regular tiene cada ángulo interior de 162°. Número de lados:",
      o: ["18", "20", "15", "24"],
      c: 1,
      ex: "(n-2)·180/n = 162 → 180n - 360 = 162n → 18n = 360 → n = 20.",
    },
    {
      p: "Cantidad de diagonales de un octógono:",
      o: ["20", "16", "24", "32"],
      c: 0,
      ex: "n(n-3)/2 = 8·5/2 = 20.",
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
