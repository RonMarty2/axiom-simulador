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
      unidad="GT-05"
      tituloUnidad="Circunferencia · Geometría Plana"
      escenas={[
        { titulo: "Circunferencia · elementos", componente: EscIntro },
        { titulo: "Posiciones relativas recta-circunferencia", componente: EscPosicionesRecta },
        { titulo: "Posiciones relativas entre dos circunferencias", componente: EscDosCircs },
        { titulo: "Ángulos en la circunferencia", componente: EscAngulos },
        { titulo: "Potencia de un punto", componente: EscPotencia },
        { titulo: "Tangentes desde un punto exterior", componente: EscTangentes },
        { titulo: "Longitud y área", componente: EscArea },
        { titulo: "Errores comunes", componente: EscErrores },
        { titulo: "Práctica final", componente: EscPractica },
      ]}
    />
  );
}

// SVG · circunferencia con punto y radio
function CircunferenciaSVG({ mostrarRadio = true, mostrarCuerda = false, mostrarTangente = false }: { mostrarRadio?: boolean; mostrarCuerda?: boolean; mostrarTangente?: boolean }) {
  const cx = 200, cy = 130, r = 70;
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 400 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <motion.circle cx={cx} cy={cy} r={r}
            fill="none" stroke={LIENZO.accent} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
          <circle cx={cx} cy={cy} r="3" fill={LIENZO.fg} />
          <text x={cx + 5} y={cy + 18} fontSize="13" fill={LIENZO.fg} fontWeight="600">O</text>
          {mostrarRadio && (
            <>
              <motion.line x1={cx} y1={cy} x2={cx + r} y2={cy}
                stroke={COLOR_OK} strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
              <text x={cx + r / 2} y={cy - 6} textAnchor="middle" fontSize="13" fill={COLOR_OK} fontWeight="700">r</text>
              <circle cx={cx + r} cy={cy} r="3" fill={LIENZO.fg} />
              <text x={cx + r + 8} y={cy + 18} fontSize="13" fill={LIENZO.fg} fontWeight="600">P</text>
            </>
          )}
          {mostrarCuerda && (
            <motion.line x1={cx + r * Math.cos(-2.5)} y1={cy + r * Math.sin(-2.5)} x2={cx + r * Math.cos(-1)} y2={cy + r * Math.sin(-1)}
              stroke={COLOR_EXP} strokeWidth="2.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
          )}
          {mostrarTangente && (
            <motion.line x1={cx + r} y1={cy - 50} x2={cx + r} y2={cy + 50}
              stroke={COLOR_BAD} strokeWidth="2.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1 }} />
          )}
        </svg>
      </Pizarra>
    </div>
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Circunferencia · la figura más simétrica</Titulo>

      <Hook>
        Circunferencia aparece en 1-2 preguntas del examen FCyT. Las preguntas
        típicas: tangentes desde un punto exterior, potencia, ángulos. Pitágoras
        se usa CONSTANTEMENTE para resolver.
      </Hook>

      <Definicion termino="Circunferencia">
        Conjunto de todos los puntos del plano que están a la <strong>misma
        distancia</strong> (radio) de un punto fijo (centro).
      </Definicion>

      <Definicion termino="Círculo vs Circunferencia">
        • <strong>Circunferencia</strong>: solo la línea curva (1D).<br />
        • <strong>Círculo</strong>: el área ENCERRADA por la circunferencia (2D).<br /><br />
        En la práctica, mucha gente usa "círculo" para ambos. Pero
        matemáticamente, la circunferencia tiene LONGITUD; el círculo tiene
        ÁREA.
      </Definicion>

      <CircunferenciaSVG />

      <Resumen>
        <strong>Elementos</strong>:<br />
        • <strong>Centro (O)</strong>: punto fijo.<br />
        • <strong>Radio (r)</strong>: distancia del centro a cualquier punto de
        la circunferencia.<br />
        • <strong>Diámetro (d)</strong>: cuerda que pasa por el centro. d = 2r.<br />
        • <strong>Cuerda</strong>: segmento que une dos puntos de la
        circunferencia.<br />
        • <strong>Arco</strong>: parte de la circunferencia entre dos puntos.<br />
        • <strong>Semicircunferencia</strong>: arco que vale la mitad (180°).
      </Resumen>

      <Mnemotecnia>
        El <strong>diámetro es la cuerda más larga posible</strong> (pasa por
        el centro). Cualquier otra cuerda es más corta que el diámetro.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPosicionesRecta() {
  return (
    <EscenaRica>
      <Titulo>Posiciones relativas · recta y circunferencia</Titulo>

      <Resumen>
        Una recta puede estar en 3 posiciones respecto de una circunferencia
        de centro O y radio r. Sea d = distancia del centro a la recta:<br /><br />

        • <strong>d &gt; r</strong>: recta EXTERIOR. No la corta.<br />
        • <strong>d = r</strong>: recta TANGENTE. La toca en UN solo punto.<br />
        • <strong>d &lt; r</strong>: recta SECANTE. La corta en DOS puntos.
      </Resumen>

      <Definicion termino="Recta tangente">
        Recta que toca a la circunferencia en exactamente un punto (punto de
        tangencia). La tangente es <strong>perpendicular al radio</strong> en
        el punto de tangencia. ESTA PROPIEDAD ES CLAVE PARA EL EXAMEN.
      </Definicion>

      <CircunferenciaSVG mostrarRadio={true} mostrarTangente={true} />

      <PorQue>
        <strong>¿Por qué tangente ⟂ radio?</strong> Si la tangente NO fuera
        perpendicular al radio, habría otro punto de la recta más cerca del
        centro que el punto de tangencia, y por tanto la recta sería secante,
        no tangente.
      </PorQue>

      <Mnemotecnia>
        <strong>Regla de oro</strong>: en cualquier problema con tangente,
        <strong> dibuja el radio al punto de tangencia</strong>. Forma un
        triángulo RECTÁNGULO con el ángulo recto en el punto de tangencia.
        Puedes aplicar Pitágoras.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscDosCircs() {
  return (
    <EscenaRica>
      <Titulo>Posiciones relativas · dos circunferencias</Titulo>

      <Resumen>
        Sean dos circunferencias de radios r₁ y r₂, y sea d la distancia entre
        sus centros:<br /><br />

        1. <strong>Exteriores</strong>: d &gt; r₁ + r₂.<br />
        2. <strong>Tangentes exteriormente</strong>: d = r₁ + r₂.<br />
        3. <strong>Secantes</strong> (se cruzan en 2 puntos): |r₁ − r₂| &lt; d &lt; r₁ + r₂.<br />
        4. <strong>Tangentes interiormente</strong>: d = |r₁ − r₂|.<br />
        5. <strong>Una dentro de otra (interiores)</strong>: d &lt; |r₁ − r₂|.<br />
        6. <strong>Concéntricas</strong>: d = 0.
      </Resumen>

      <WorkedExample titulo="Caso de examen FCyT 2025 · tres circunferencias tangentes">
        Tres circunferencias tangentes entre sí exteriormente. C₁ y C₂ tienen
        radio R = 5. C₃ tiene radio r = 3. Sea T el punto de tangencia entre C₁
        y C₂. Calcular la distancia del centro de C₃ a T.<br /><br />

        <strong>Paso 1 · Distancias entre centros:</strong><br />
        • Centros de C₁ y C₂: separados por R + R = 10.<br />
        • T es el punto medio del segmento C₁C₂ (porque tienen igual radio).<br />
        • Centros C₁ y C₃: separados por R + r = 5 + 3 = 8.<br /><br />

        <strong>Paso 2 · Triángulo en juego:</strong><br />
        C₃ está a distancia 8 de C₁ y a distancia 8 de C₂ (simétrico). C₁T = 5.
        El triángulo C₁ T C₃ es rectángulo en T (eje de simetría).<br /><br />

        <strong>Paso 3 · Pitágoras:</strong><br />
        |C₃T|² + 5² = 8² → |C₃T|² = 64 − 25 = 39 → |C₃T| = <strong>√39</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscAngulos() {
  return (
    <EscenaRica>
      <Titulo>Ángulos en la circunferencia · 3 tipos clave</Titulo>

      <Definicion termino="Ángulo central">
        Ángulo con vértice en el centro de la circunferencia. Su medida es
        IGUAL a la medida del arco que abarca.
      </Definicion>

      <Definicion termino="Ángulo inscrito">
        Ángulo con vértice en la circunferencia y lados que son cuerdas. Su
        medida es la <strong>MITAD</strong> del arco que abarca (o del ángulo
        central que abarca el mismo arco).
      </Definicion>

      <Definicion termino="Ángulo semiinscrito">
        Formado por una cuerda y la tangente en uno de sus extremos. Su medida
        es la MITAD del arco que abarca (igual que el inscrito).
      </Definicion>

      <Mnemotecnia>
        <strong>Regla clave del ángulo inscrito</strong>:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          ángulo inscrito = ángulo central / 2
        </span>
        (cuando los dos abarcan el mismo arco).
      </Mnemotecnia>

      <Resumen>
        <strong>Consecuencias importantes</strong>:<br />
        1. Todos los ángulos inscritos que abarcan el mismo arco son IGUALES.<br />
        2. El ángulo inscrito en un semicírculo es de 90° (porque el arco es
        180°, su mitad es 90°). Esto es el teorema de Tales para
        circunferencia.<br />
        3. Si una cuerda es diámetro y formas triángulo con cualquier punto de
        la circunferencia, ese triángulo es RECTÁNGULO en el punto que NO es
        extremo del diámetro.
      </Resumen>

      <WorkedExample titulo="Aplicación">
        En una circunferencia, el ángulo central que abarca un arco AB mide 80°.
        ¿Cuánto mide cualquier ángulo inscrito que abarca el mismo arco AB?<br /><br />

        Ángulo inscrito = 80°/2 = <strong>40°</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPotencia() {
  return (
    <EscenaRica>
      <Titulo>Potencia de un punto a una circunferencia</Titulo>

      <Definicion termino="Potencia de un punto P">
        Para una circunferencia de centro O y radio r, la potencia del punto P
        es:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          Pot(P) = |OP|² − r²
        </span><br /><br />
        • Si P es exterior: Pot &gt; 0.<br />
        • Si P está en la circunferencia: Pot = 0.<br />
        • Si P es interior: Pot &lt; 0.
      </Definicion>

      <Resumen>
        <strong>Interpretación geométrica · si trazas secante por P</strong>:<br />
        Si la secante corta la circunferencia en A y B, entonces |PA| · |PB| =
        |Pot(P)| (en valor absoluto).<br /><br />
        Este producto es CONSTANTE para todas las secantes que pasan por P.
      </Resumen>

      <Resumen>
        <strong>Si P es exterior y traza tangente</strong>:<br />
        Si la tangente desde P toca la circunferencia en T, entonces
        |PT|² = Pot(P) = |OP|² − r².<br /><br />
        Por tanto: <strong>|PT|² = |PA| · |PB|</strong> para cualquier secante
        desde el mismo P.
      </Resumen>

      <WorkedExample titulo="Aplicación clásica">
        Desde un punto P exterior, se trazan una tangente (longitud t) y una
        secante que corta la circunferencia en A y B. Si |PA| = 4 y |PB| = 16,
        calcular t.<br /><br />

        Por la propiedad: t² = |PA| · |PB| = 4 · 16 = 64.<br />
        t = <strong>8</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscTangentes() {
  return (
    <EscenaRica>
      <Titulo>Tangentes desde un punto exterior</Titulo>

      <Resumen>
        Desde un punto P exterior a una circunferencia se pueden trazar
        <strong> EXACTAMENTE 2 tangentes</strong>. Estas tangentes tienen
        propiedades especiales:<br /><br />
        1. Tienen <strong>la misma longitud</strong> (desde P hasta el punto
        de tangencia).<br />
        2. El segmento PO (P al centro) bisecta el ángulo formado por las dos
        tangentes.<br />
        3. PO también es perpendicular a la cuerda que une los dos puntos de
        tangencia.
      </Resumen>

      <WorkedExample titulo="Caso típico · longitud de tangente">
        Desde un punto P exterior a una circunferencia de radio 6 cm, la
        distancia al centro es 10 cm. ¿Cuánto mide la tangente desde P?<br /><br />

        <strong>Paso 1 · Triángulo rectángulo:</strong><br />
        Centro O, punto P, punto de tangencia T. ∠OTP = 90° (tangente ⟂ radio).
        OT = r = 6, OP = 10, PT = ?<br /><br />

        <strong>Paso 2 · Pitágoras:</strong><br />
        |OP|² = |OT|² + |PT|²<br />
        100 = 36 + |PT|²<br />
        |PT|² = 64<br />
        |PT| = <strong>8 cm</strong>.<br /><br />

        <strong>Esta es la estructura de TODA pregunta de tangente.</strong>
        Identifica el triángulo rectángulo (centro, punto exterior, punto de
        tangencia) y aplica Pitágoras.
      </WorkedExample>

      <Conexion>
        Este patrón aparece literal en el examen FCyT 1op-2-2025 (Pregunta G7):
        "Desde un punto exterior A se traza una recta tangente a la
        circunferencia de diámetro 8√3 u. Si la distancia del centro al punto
        A es 8 u, ¿cuál es la longitud de la tangente?". Respuesta: 4 u.
      </Conexion>
    </EscenaRica>
  );
}

function EscArea() {
  return (
    <EscenaRica>
      <Titulo>Longitud y área del círculo</Titulo>

      <Resumen>
        <strong>Longitud de la circunferencia</strong>:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          L = 2πr = πd
        </span><br /><br />
        <strong>Área del círculo</strong>:<br />
        <span style={{ fontSize: 18, fontFamily: "var(--font-crimson), serif", fontWeight: 700 }}>
          A = πr²
        </span>
      </Resumen>

      <Definicion termino="Longitud de un arco">
        Si el arco abarca un ángulo central de θ radianes: longitud = r · θ.<br />
        Si el ángulo está en grados: longitud = (2πr) · (θ/360°).
      </Definicion>

      <Definicion termino="Área de un sector circular">
        Si el sector tiene ángulo central θ:<br />
        • En radianes: A = (1/2) · r² · θ.<br />
        • En grados: A = πr² · (θ/360°).
      </Definicion>

      <WorkedExample titulo="Sector circular">
        Un sector tiene radio 6 cm y ángulo central de 60°. ¿Cuál es su área?<br /><br />

        A = π · 36 · (60/360) = π · 36 · (1/6) = 6π ≈ <strong>18.85 cm²</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscErrores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos</Titulo>

      <Misconception titulo="Error 1 · confundir longitud y área">
        Longitud (L = 2πr) tiene unidades lineales (cm). Área (A = πr²) tiene
        unidades cuadradas (cm²). En el examen siempre verifica las unidades
        de la respuesta.
      </Misconception>

      <Misconception titulo="Error 2 · olvidar que tangente ⟂ radio">
        Esta propiedad es la BASE de casi todo problema de tangentes. Si te
        encuentras un problema con tangente, dibuja el radio al punto de
        tangencia inmediatamente y busca el triángulo rectángulo.
      </Misconception>

      <Misconception titulo="Error 3 · usar diámetro como radio">
        Si te dan "circunferencia de diámetro 8", el radio es 4. Cuidado de no
        usar 8 directamente en fórmulas que piden radio (A = πr², L = 2πr).
      </Misconception>

      <Misconception titulo="Error 4 · ángulo inscrito = ángulo central">
        El ángulo inscrito es la MITAD del central que abarca el mismo arco.
        No son iguales (salvo casos triviales).
      </Misconception>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Desde un punto exterior a 13 cm del centro de una circunferencia de radio 5 cm, ¿cuánto mide la tangente?",
      o: ["12 cm", "8 cm", "18 cm", "11 cm"],
      c: 0,
      ex: "Pitágoras: t² = 13² - 5² = 169 - 25 = 144. t = 12.",
    },
    {
      p: "Un ángulo central mide 110°. El ángulo inscrito que abarca el mismo arco mide:",
      o: ["55°", "110°", "70°", "220°"],
      c: 0,
      ex: "Inscrito = central / 2 = 110/2 = 55°.",
    },
    {
      p: "Área de un círculo de radio 7 cm:",
      o: ["49π cm²", "14π cm²", "7π cm²", "98π cm²"],
      c: 0,
      ex: "A = πr² = π·49 = 49π.",
    },
    {
      p: "Longitud de una circunferencia de diámetro 10:",
      o: ["10π", "20π", "100π", "5π"],
      c: 0,
      ex: "L = πd = 10π.",
    },
    {
      p: "Desde un punto P se traza secante que corta la circunferencia en A y B con PA=3, PB=12. La tangente desde P mide:",
      o: ["6", "9", "4", "8"],
      c: 0,
      ex: "t² = 3·12 = 36 → t = 6.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final · 5 ejercicios</Titulo>
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
