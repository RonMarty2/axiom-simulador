"use client";

import { useState } from "react";
import LeccionShell, { type Escena } from "../_components/LeccionShell";
import {
  Titulo,
  Parrafo,
  Puente,
  Hook,
  Definicion,
  PorQue,
  Cuidado,
  WorkedExample,
  Misconception,
  AutoCheck,
  EscenaRica,
} from "../_components/pedagogia";
import { Pizarra, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import MathText from "../../components/MathText";

/* ── Helper geométrico SVG: flecha con punta calculada ────────────────── */
function Flecha({
  x1,
  y1,
  x2,
  y2,
  color,
  grosor = 2.5,
  punteada = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  grosor?: number;
  punteada?: boolean;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const largo = Math.hypot(dx, dy);
  if (largo < 2) return null;

  const ux = dx / largo;
  const uy = dy / largo;
  const nx = -uy;
  const ny = ux;
  const cabeza = Math.min(8, largo * 0.4);
  const ala = cabeza * 0.48;
  const bx = x2 - cabeza * ux;
  const by = y2 - cabeza * uy;

  const p1 = `${x2.toFixed(1)},${y2.toFixed(1)}`;
  const p2 = `${(bx + ala * nx).toFixed(1)},${(by + ala * ny).toFixed(1)}`;
  const p3 = `${(bx - ala * nx).toFixed(1)},${(by - ala * ny).toFixed(1)}`;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={bx}
        y2={by}
        stroke={color}
        strokeWidth={grosor}
        strokeDasharray={punteada ? "4 3" : undefined}
        strokeLinecap="round"
      />
      <polygon points={`${p1} ${p2} ${p3}`} fill={color} />
    </g>
  );
}

/* ── Escena 1: Cantidad de movimiento (p = mv) ───────────────────────── */
function DiagramaMomento() {
  const [modo, setModo] = useState<"masas" | "opuestos">("masas");

  const W = 360;
  const H = 166;
  const FILA_A_Y = 56;
  const FILA_B_Y = 122;

  /* Coordenadas calculadas según el modo activo */
  const cx = W / 2;
  const xInicioMasas = 104;
  const maxFlecha = 136;

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setModo("masas")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: modo === "masas" ? COLOR_EXP : "var(--border)",
            background: modo === "masas" ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
            color: modo === "masas" ? COLOR_EXP : "var(--fg-muted)",
          }}
        >
          Camión lento vs. bici rápida
        </button>
        <button
          type="button"
          onClick={() => setModo("opuestos")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: modo === "opuestos" ? COLOR_EXP : "var(--border)",
            background: modo === "opuestos" ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
            color: modo === "opuestos" ? COLOR_EXP : "var(--fg-muted)",
          }}
        >
          Sentidos opuestos (signo de p)
        </button>
      </div>

      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          {modo === "masas" ? (
            <g>
              {/* Eje de referencia */}
              <text x={14} y={20} fontSize={11} fill={LIENZO.fgDim}>
                Sentido positivo (+) hacia la derecha
              </text>

              {/* Fila A: Camión 1000 kg a 1 m/s -> p = +1000 */}
              <rect x={28} y={FILA_A_Y - 18} width={56} height={32} rx={5} fill="none" stroke={COLOR_BASE} strokeWidth={2} />
              <circle cx={40} cy={FILA_A_Y + 16} r={5} fill={COLOR_BASE} />
              <circle cx={72} cy={FILA_A_Y + 16} r={5} fill={COLOR_BASE} />
              <text x={56} y={FILA_A_Y + 2} fontSize={11} textAnchor="middle" fill={COLOR_BASE} fontWeight={600}>
                1000 kg
              </text>
              <Flecha
                x1={xInicioMasas}
                y1={FILA_A_Y}
                x2={xInicioMasas + maxFlecha}
                y2={FILA_A_Y}
                color={COLOR_EXP}
                grosor={3.5}
              />
              <text x={xInicioMasas} y={FILA_A_Y - 11} fontSize={11} fill={COLOR_EXP} fontWeight={600}>
                v = 1 m/s · p = +1000 kg·m/s
              </text>

              {/* Fila B: Bici 20 kg a 10 m/s -> p = +200 (escala 1/5 = 27.2 px) */}
              <circle cx={44} cy={FILA_B_Y + 8} r={8} fill="none" stroke={COLOR_BASE} strokeWidth={2} />
              <circle cx={70} cy={FILA_B_Y + 8} r={8} fill="none" stroke={COLOR_BASE} strokeWidth={2} />
              <line x1={44} y1={FILA_B_Y + 8} x2={57} y2={FILA_B_Y - 6} stroke={COLOR_BASE} strokeWidth={2} />
              <line x1={57} y1={FILA_B_Y - 6} x2={70} y2={FILA_B_Y + 8} stroke={COLOR_BASE} strokeWidth={2} />
              <text x={57} y={FILA_B_Y - 12} fontSize={11} textAnchor="middle" fill={COLOR_BASE} fontWeight={600}>
                20 kg
              </text>
              <Flecha
                x1={xInicioMasas}
                y1={FILA_B_Y}
                x2={xInicioMasas + maxFlecha * 0.2}
                y2={FILA_B_Y}
                color={COLOR_OK}
                grosor={3}
              />
              <text x={xInicioMasas} y={FILA_B_Y - 12} fontSize={11} fill={COLOR_OK} fontWeight={600}>
                v = 10 m/s · p = +200 kg·m/s
              </text>
            </g>
          ) : (
            <g>
              <line x1={cx} y1={18} x2={cx} y2={H - 12} stroke={LIENZO.fgFaint} strokeDasharray="4 4" />
              <text x={cx} y={14} fontSize={11} textAnchor="middle" fill={LIENZO.fgDim}>
                p_total = +24 + (-24) = 0 kg·m/s
              </text>

              {/* Bola A: 4 kg a +6 m/s */}
              <circle cx={cx - 48} cy={FILA_A_Y} r={16} fill="none" stroke={COLOR_EXP} strokeWidth={2.5} />
              <text x={cx - 48} y={FILA_A_Y + 4} fontSize={11} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
                4 kg
              </text>
              <Flecha x1={cx - 26} y1={FILA_A_Y} x2={cx + 58} y2={FILA_A_Y} color={COLOR_EXP} grosor={3} />
              <text x={cx + 64} y={FILA_A_Y + 4} fontSize={10} fill={COLOR_EXP} fontWeight={600}>
                v₁ = +6 m/s · p₁ = +24
              </text>

              {/* Bola B: 3 kg a -8 m/s */}
              <circle cx={cx + 48} cy={FILA_B_Y} r={14} fill="none" stroke={COLOR_BAD} strokeWidth={2.5} />
              <text x={cx + 48} y={FILA_B_Y + 4} fontSize={11} textAnchor="middle" fill={COLOR_BAD} fontWeight={600}>
                3 kg
              </text>
              <Flecha x1={cx + 28} y1={FILA_B_Y} x2={cx - 56} y2={FILA_B_Y} color={COLOR_BAD} grosor={3} />
              <text x={cx - 62} y={FILA_B_Y + 4} fontSize={10} textAnchor="end" fill={COLOR_BAD} fontWeight={600}>
                v₂ = -8 m/s · p₂ = -24
              </text>
            </g>
          )}
        </svg>
      </Pizarra>
    </div>
  );
}

function EscMomento() {
  return (
    <EscenaRica>
      <Titulo>Cantidad de movimiento · p = mv</Titulo>

      <Puente>
        Imagina que debes detener con tus manos una bicicleta rápida frente a un camión que apenas avanza. Aunque la
        bicicleta tenga mayor rapidez, frenar el camión cuesta muchísimo más por su gran masa. Necesitas una magnitud
        que combine masa y velocidad al mismo tiempo.
      </Puente>

      <Definicion termino="Cantidad de movimiento lineal (p)">
        <Parrafo>
          Es el producto de la masa por el vector velocidad. En el Sistema Internacional se mide en{" "}
          <MathText>{"$\\text{kg}\\cdot\\text{m/s}$"}</MathText> (equivalente a{" "}
          <MathText>{"$\\text{N}\\cdot\\text{s}$"}</MathText>):
        </Parrafo>
        <MathText block>{"$$\\vec{p} = m\\vec{v}$$"}</MathText>
        <Parrafo>
          Es una magnitud vectorial: tiene la misma dirección y el mismo sentido que{" "}
          <MathText>{"$\\vec{v}$"}</MathText>. En movimiento rectilíneo, el sentido contrario se indica con signo
          negativo.
        </Parrafo>
      </Definicion>

      <DiagramaMomento />

      <PorQue>
        <Parrafo>
          La segunda ley de Newton relaciona la fuerza neta con el ritmo al que cambia esta magnitud:{" "}
          <MathText>{"$\\vec{F}_{\\text{neta}} = \\dfrac{\\Delta \\vec{p}}{\\Delta t}$"}</MathText>. Por eso,
          cuanto mayor es <MathText>{"$\\vec{p}$"}</MathText>, mayor impulso se requiere para cambiar el estado de
          movimiento de un cuerpo. Además, su carácter vectorial permite que dos movimientos opuestos se cancelen al
          sumarse.
        </Parrafo>
      </PorQue>

      <WorkedExample titulo="Comparar momentos con cambio de unidades">
        <Parrafo>
          Una pelota de <MathText>{"$500\\text{ g}$"}</MathText> viaja hacia la derecha a{" "}
          <MathText>{"$12\\text{ m/s}$"}</MathText>, mientras una esfera de <MathText>{"$2\\text{ kg}$"}</MathText>{" "}
          viaja hacia la izquierda a <MathText>{"$4\\text{ m/s}$"}</MathText>. Calcula la cantidad de movimiento de cada
          una y la total del sistema.
        </Parrafo>
        <Parrafo>
          <strong>Paso 1.</strong> Convierte la masa de la pelota a kilogramos:{" "}
          <MathText>{"$m_1 = 500\\text{ g} = \\dfrac{500}{1000}\\text{ kg} = 0{,}5\\text{ kg}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 2.</strong> Fija la derecha como sentido positivo (<MathText>{"$+$"}</MathText>) y calcula{" "}
          <MathText>{"$p_1$"}</MathText>:{" "}
          <MathText>{"$p_1 = m_1 v_1 = (0{,}5\\text{ kg})(+12\\text{ m/s}) = +6\\text{ kg}\\cdot\\text{m/s}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 3.</strong> Asigna signo negativo a la izquierda y calcula <MathText>{"$p_2$"}</MathText>:{" "}
          <MathText>{"$p_2 = m_2 v_2 = (2\\text{ kg})(-4\\text{ m/s}) = -8\\text{ kg}\\cdot\\text{m/s}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 4.</strong> Suma vectorialmente para obtener el momento total:{" "}
          <MathText>{"$p_{\\text{total}} = p_1 + p_2 = 6 + (-8) = -2\\text{ kg}\\cdot\\text{m/s}$"}</MathText> (hacia
          la izquierda).
        </Parrafo>
      </WorkedExample>

      <Cuidado>
        No confundas cantidad de movimiento (<MathText>{"$\\vec{p} = m\\vec{v}$"}</MathText>, vectorial) con energía
        cinética (<MathText>{"$E_c = \\tfrac{1}{2}mv^2$"}</MathText>, escalar y siempre positiva o cero). Dos cuerpos
        con igual masa y rapidez en sentidos contrarios tienen la misma <MathText>{"$E_c$"}</MathText>, pero sus{" "}
        <MathText>{"$\\vec{p}$"}</MathText> suman cero.
      </Cuidado>

      <AutoCheck
        pregunta="Un bloque de 4 kg se mueve hacia la izquierda con rapidez de 3 m/s. Tomando la derecha como eje positivo (+), ¿cuál es su cantidad de movimiento?"
        opciones={["+12 kg·m/s", "-12 kg·m/s", "-1,33 kg·m/s", "+7 kg·m/s"]}
        correctaIdx={1}
        explicacion="Como se mueve hacia la izquierda, v = -3 m/s. Entonces p = m·v = (4 kg)·(-3 m/s) = -12 kg·m/s."
      />
    </EscenaRica>
  );
}

/* ── Escena 2: Impulso y gráfica F-t ─────────────────────────────────── */
function GraficaImpulso() {
  const [modo, setModo] = useState<"corto" | "largo">("corto");

  const W = 360;
  const H = 200;
  const PAD_L = 46;
  const PAD_R = 18;
  const PAD_T = 22;
  const PAD_B = 34;

  const sx = scalerX(0, 0.25, W, PAD_L, PAD_R);
  const sy = scalerY(0, 120, H, PAD_T, PAD_B);

  const t0 = 0.02;
  const dt = modo === "corto" ? 0.05 : 0.2;
  const fuerza = modo === "corto" ? 100 : 25;
  const t1 = t0 + dt;

  const x0 = sx(t0);
  const x1 = sx(t1);
  const yBase = sy(0);
  const yTop = sy(fuerza);

  const ticksT = [0, 0.05, 0.1, 0.15, 0.2, 0.25];
  const ticksF = [0, 25, 50, 75, 100];

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setModo("corto")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: modo === "corto" ? COLOR_BAD : "var(--border)",
            background: modo === "corto" ? "var(--bg-selected, rgba(220,38,38,0.10))" : "transparent",
            color: modo === "corto" ? COLOR_BAD : "var(--fg-muted)",
          }}
        >
          Golpe seco: 100 N en 0,05 s
        </button>
        <button
          type="button"
          onClick={() => setModo("largo")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: modo === "largo" ? COLOR_OK : "var(--border)",
            background: modo === "largo" ? "var(--bg-selected, rgba(22,163,74,0.10))" : "transparent",
            color: modo === "largo" ? COLOR_OK : "var(--fg-muted)",
          }}
        >
          Amortiguado: 25 N en 0,20 s
        </button>
      </div>

      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          {/* Rejilla y marcas eje Y */}
          {ticksF.map((val) => {
            const yy = sy(val);
            return (
              <g key={`f-${val}`}>
                <line x1={PAD_L} y1={yy} x2={W - PAD_R} y2={yy} stroke={LIENZO.fgFaint} strokeOpacity={0.35} />
                <text x={PAD_L - 6} y={yy + 4} fontSize={10} textAnchor="end" fill={LIENZO.fgDim}>
                  {val}
                </text>
              </g>
            );
          })}

          {/* Marcas eje X */}
          {ticksT.map((val) => {
            const xx = sx(val);
            return (
              <g key={`t-${val}`}>
                <line x1={xx} y1={yBase} x2={xx} y2={yBase + 4} stroke={LIENZO.fgDim} />
                <text x={xx} y={yBase + 16} fontSize={10} textAnchor="middle" fill={LIENZO.fgDim}>
                  {val.toFixed(2).replace(".", ",")}
                </text>
              </g>
            );
          })}

          {/* Ejes principales */}
          <line x1={PAD_L} y1={PAD_T - 6} x2={PAD_L} y2={yBase} stroke={COLOR_BASE} strokeWidth={1.6} />
          <line x1={PAD_L} y1={yBase} x2={W - PAD_R + 6} y2={yBase} stroke={COLOR_BASE} strokeWidth={1.6} />
          <text x={PAD_L - 6} y={13} fontSize={11} textAnchor="end" fill={COLOR_BASE} fontWeight={600}>
            F (N)
          </text>
          <text x={W - PAD_R} y={H - 4} fontSize={11} textAnchor="end" fill={COLOR_BASE} fontWeight={600}>
            t (s)
          </text>

          {/* Área sombreada = Impulso J = 5 N·s */}
          <rect
            x={x0}
            y={yTop}
            width={x1 - x0}
            height={yBase - yTop}
            fill={modo === "corto" ? COLOR_BAD : COLOR_OK}
            fillOpacity={0.22}
            stroke={modo === "corto" ? COLOR_BAD : COLOR_OK}
            strokeWidth={2.2}
          />
          <text
            x={(x0 + x1) / 2}
            y={modo === "corto" ? yTop - 7 : yTop - 8}
            fontSize={11}
            textAnchor={modo === "corto" ? "start" : "middle"}
            fill={modo === "corto" ? COLOR_BAD : COLOR_OK}
            fontWeight={600}
          >
            Área J = {fuerza} × {dt.toFixed(2).replace(".", ",")} = 5 N·s
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscImpulso() {
  return (
    <EscenaRica>
      <Titulo>Impulso y gráfica F-t</Titulo>

      <Hook>
        Cuando saltas desde un muro y aterrizas con las rodillas rígidas, sientes un golpe seco y fuerte. Si en cambio
        flexionas las piernas al tocar el suelo, detienes tu cuerpo suavemente. Tu cambio de movimiento es idéntico en
        ambos casos, pero alargar el tiempo reduce drásticamente la fuerza pico.
      </Hook>

      <Definicion termino="Impulso (J) y teorema impulso-cantidad de movimiento">
        <Parrafo>
          El impulso <MathText>{"$\\vec{J}$"}</MathText> de una fuerza promedio{" "}
          <MathText>{"$\\vec{F}_{\\text{prom}}$"}</MathText> aplicada durante un intervalo{" "}
          <MathText>{"$\\Delta t$"}</MathText> iguala al cambio de la cantidad de movimiento del cuerpo:
        </Parrafo>
        <MathText block>{"$$\\vec{J} = \\vec{F}_{\\text{prom}}\\,\\Delta t = \\Delta \\vec{p} = m\\vec{v}_f - m\\vec{v}_i$$"}</MathText>
        <Parrafo>
          En una gráfica fuerza-tiempo (<MathText>{"$F$-$t$"}</MathText>), el módulo del impulso es el{" "}
          <strong>área bajo la curva</strong> entre los instantes <MathText>{"$t_i$"}</MathText> y{" "}
          <MathText>{"$t_f$"}</MathText>.
        </Parrafo>
      </Definicion>

      <GraficaImpulso />

      <PorQue>
        <Parrafo>
          Parte de la segunda ley de Newton para aceleración constante:{" "}
          <MathText>{"$\\vec{F} = m\\vec{a} = m\\dfrac{\\vec{v}_f - \\vec{v}_i}{\\Delta t}$"}</MathText>. Si
          multiplicas ambos miembros por <MathText>{"$\\Delta t$"}</MathText>, aparece{" "}
          <MathText>{"$\\vec{F}\\,\\Delta t = m\\vec{v}_f - m\\vec{v}_i$"}</MathText>. Cuando la fuerza cambia con el
          tiempo, sumar franjas muy delgadas <MathText>{"$F_k\\,\\Delta t_k$"}</MathText> equivale geométricamente a
          calcular el área bajo la curva <MathText>{"$F$-$t$"}</MathText>.
        </Parrafo>
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F7 pregunta 1 */}
      <WorkedExample titulo="Balón pateado desde el reposo (adaptado de banco PSA)">
        <Parrafo>
          Un balón de <MathText>{"$0{,}4\\text{ kg}$"}</MathText> está en reposo y recibe una fuerza media horizontal de{" "}
          <MathText>{"$100\\text{ N}$"}</MathText> durante <MathText>{"$0{,}05\\text{ s}$"}</MathText>. Calcula el
          impulso recibido y la rapidez con la que sale disparado.
        </Parrafo>
        <Parrafo>
          <strong>Paso 1.</strong> Calcula el impulso con la fuerza media y el tiempo de contacto:{" "}
          <MathText>{"$J = F_{\\text{prom}}\\,\\Delta t = (100\\text{ N})(0{,}05\\text{ s}) = 5\\text{ N}\\cdot\\text{s}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 2.</strong> Aplica el teorema impulso-momento con <MathText>{"$v_i = 0$"}</MathText>:{" "}
          <MathText>{"$5 = (0{,}4)v_f - (0{,}4)(0)$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 3.</strong> Despeja la rapidez final:{" "}
          <MathText>{"$v_f = \\dfrac{5}{0{,}4} = 12{,}5\\text{ m/s}$"}</MathText>.
        </Parrafo>
      </WorkedExample>

      <Cuidado>
        Cuando un objeto rebota contra una pared, la velocidad cambia de signo. Si choca a{" "}
        <MathText>{"$+8\\text{ m/s}$"}</MathText> y rebota a <MathText>{"$-6\\text{ m/s}$"}</MathText>, el cambio de
        velocidad NO es <MathText>{"$8 - 6 = 2\\text{ m/s}$"}</MathText>, sino{" "}
        <MathText>{"$\\Delta v = (-6) - (+8) = -14\\text{ m/s}$"}</MathText>: la pared primero debe frenarlo a cero y
        luego impulsarlo hacia atrás.
      </Cuidado>

      <AutoCheck
        pregunta="Una pelota de 0,5 kg choca perpendicularmente contra un muro con rapidez de 10 m/s y rebota en sentido contrario a 6 m/s. ¿Cuál es el módulo del impulso que recibió del muro?"
        opciones={["2 N·s", "5 N·s", "8 N·s", "16 N·s"]}
        correctaIdx={2}
        explicacion="Con el sentido inicial positivo, v_i = +10 m/s y v_f = -6 m/s. Entonces J = m(v_f - v_i) = 0,5(-6 - 10) = -8 N·s, de módulo 8 N·s."
      />
    </EscenaRica>
  );
}

/* ── Escena 3: Conservación en sistemas aislados ─────────────────────── */
function DiagramaTerceraLey() {
  const W = 360;
  const H = 138;
  const cy = 68;
  const x1 = 136;
  const x2 = 224;

  return (
    <Pizarra alto={H}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <text x={W / 2} y={18} fontSize={11} textAnchor="middle" fill={LIENZO.fgDim}>
          Durante el contacto (mismo Δt): par acción-reacción
        </text>

        {/* Piso liso */}
        <line x1={28} y1={cy + 26} x2={W - 28} y2={cy + 26} stroke={LIENZO.fgFaint} strokeWidth={2} />

        {/* Cuerpo 1 */}
        <circle cx={x1} cy={cy} r={22} fill="none" stroke={COLOR_EXP} strokeWidth={2.5} />
        <text x={x1} y={cy + 4} fontSize={12} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
          m₁
        </text>
        <Flecha x1={x1 - 26} y1={cy} x2={x1 - 88} y2={cy} color={COLOR_BAD} grosor={3} />
        <text x={x1 - 58} y={cy - 10} fontSize={11} textAnchor="middle" fill={COLOR_BAD} fontWeight={600}>
          F₂₁
        </text>

        {/* Cuerpo 2 */}
        <circle cx={x2} cy={cy} r={26} fill="none" stroke={COLOR_OK} strokeWidth={2.5} />
        <text x={x2} y={cy + 4} fontSize={12} textAnchor="middle" fill={COLOR_OK} fontWeight={600}>
          m₂
        </text>
        <Flecha x1={x2 + 30} y1={cy} x2={x2 + 92} y2={cy} color={COLOR_BAD} grosor={3} />
        <text x={x2 + 60} y={cy - 10} fontSize={11} textAnchor="middle" fill={COLOR_BAD} fontWeight={600}>
          F₁₂ = -F₂₁
        </text>

        {/* Resultado */}
        <text x={W / 2} y={H - 12} fontSize={11} textAnchor="middle" fill={COLOR_BASE} fontWeight={600}>
          J₁ + J₂ = (F₂₁ + F₁₂)·Δt = 0  ⇒  Δp₁ + Δp₂ = 0
        </text>
      </svg>
    </Pizarra>
  );
}

function EscConservacion() {
  return (
    <EscenaRica>
      <Titulo>Conservación en sistemas aislados</Titulo>

      <Puente>
        Dos patinadores sobre hielo (casi sin rozamiento) están quietos frente a frente y se empujan con las manos. Al
        instante salen deslizando en sentidos opuestos: el más liviano más rápido, el más pesado más lento. Ninguna
        fuerza externa los empujó, así que algo tuvo que permanecer igual antes y después.
      </Puente>

      <Definicion termino="Principio de conservación de la cantidad de movimiento">
        <Parrafo>
          Si la resultante de las fuerzas externas sobre un sistema es cero (sistema aislado,{" "}
          <MathText>{"$\\sum \\vec{F}_{\\text{ext}} = 0$"}</MathText>), la cantidad de movimiento total del sistema
          permanece constante:
        </Parrafo>
        <MathText block>
          {"$$\\vec{p}_{\\text{total}, i} = \\vec{p}_{\\text{total}, f} \\quad\\Longrightarrow\\quad m_1\\vec{v}_{1i} + m_2\\vec{v}_{2i} = m_1\\vec{v}_{1f} + m_2\\vec{v}_{2f}$$"}
        </MathText>
      </Definicion>

      <DiagramaTerceraLey />

      <PorQue>
        <Parrafo>
          Por la tercera ley de Newton, mientras dos cuerpos interactúan ejercen fuerzas internas de igual magnitud y
          sentido opuesto (<MathText>{"$\\vec{F}_{12} = -\\vec{F}_{21}$"}</MathText>) durante exactamente el mismo
          tiempo de contacto <MathText>{"$\\Delta t$"}</MathText>. Sus impulsos internos suman cero (
          <MathText>{"$\\vec{J}_1 + \\vec{J}_2 = 0$"}</MathText>), por lo que todo el momento que pierde un cuerpo lo
          gana exactamente el otro.
        </Parrafo>
      </PorQue>

      {/* basado en: data/examenes/umss/ingenieria/2013-final-2-2013.md P20 */}
      <WorkedExample titulo="Persona caminando sobre un carrito (adaptado de UMSS)">
        <Parrafo>
          Un carrito de masa <MathText>{"$M = 5m$"}</MathText> avanza sobre rieles horizontales sin fricción a{" "}
          <MathText>{"$5\\text{ m/s}$"}</MathText> llevando a una persona de masa <MathText>{"$m$"}</MathText>. Luego,
          la persona empieza a caminar hacia adelante a <MathText>{"$3\\text{ m/s}$"}</MathText> respecto al carrito.
          Calcula la nueva rapidez <MathText>{"$v_c$"}</MathText> del carrito respecto al suelo.
        </Parrafo>
        <Parrafo>
          <strong>Paso 1.</strong> Calcula la cantidad de movimiento inicial total respecto al suelo:{" "}
          <MathText>{"$p_i = (m + 5m)(5) = 30m$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 2.</strong> Expresa la velocidad final de la persona respecto al suelo: si el carrito avanza a{" "}
          <MathText>{"$v_c$"}</MathText> y ella camina a <MathText>{"$+3\\text{ m/s}$"}</MathText> sobre él, entonces{" "}
          <MathText>{"$v_p = v_c + 3$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 3.</strong> Iguala momento inicial y final (<MathText>{"$p_i = p_f$"}</MathText>):{" "}
          <MathText>{"$30m = m(v_c + 3) + (5m)v_c$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 4.</strong> Simplifica <MathText>{"$m$"}</MathText> y agrupa términos:{" "}
          <MathText>{"$30 = 6v_c + 3$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 5.</strong> Despeja <MathText>{"$v_c$"}</MathText>:{" "}
          <MathText>{"$6v_c = 27 \\Rightarrow v_c = \\dfrac{27}{6} = 4{,}5\\text{ m/s}$"}</MathText>.
        </Parrafo>
      </WorkedExample>

      <Cuidado>
        Todas las velocidades en la ecuación de conservación deben medirse respecto al mismo sistema de referencia
        inercial (por ejemplo, el suelo). Además, si existe una fuerza externa neta importante en ese eje (como una
        pared fija o fricción prolongada), el momento de ese sistema no se conserva.
      </Cuidado>

      {/* basado en: data/examenes/umss/ingenieria/2006-2op-1-2006.md P11 */}
      <AutoCheck
        pregunta="Dos bolas de nieve A y B de igual masa se acercan frontalmente por la misma recta y quedan pegadas al chocar. Antes del choque, A se movía hacia la izquierda a 1 m/s. Tras el choque, ambas avanzan unidas hacia la derecha a 2 m/s. ¿Con qué rapidez se movía B antes del choque?"
        opciones={["5 m/s", "3 m/s", "4 m/s", "6 m/s"]}
        correctaIdx={0}
        explicacion="Tomando la derecha como positiva: m(-1) + m·v_B = 2m(+2). Al dividir entre m queda -1 + v_B = 4, así que v_B = 5 m/s hacia la derecha."
      />
    </EscenaRica>
  );
}

/* ── Escena 4: Choque perfectamente inelástico ────────────────────────── */
function DiagramaInelastico() {
  const [despues, setDespues] = useState(false);

  const W = 360;
  const H = 152;
  const sueloY = 114;

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <button
          type="button"
          onClick={() => setDespues(false)}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: !despues ? COLOR_EXP : "var(--border)",
            background: !despues ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
            color: !despues ? COLOR_EXP : "var(--fg-muted)",
          }}
        >
          Antes del impacto
        </button>
        <button
          type="button"
          onClick={() => setDespues(true)}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: despues ? COLOR_OK : "var(--border)",
            background: despues ? "var(--bg-selected, rgba(22,163,74,0.10))" : "transparent",
            color: despues ? COLOR_OK : "var(--fg-muted)",
          }}
        >
          Después (unidos)
        </button>
      </div>

      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <line x1={24} y1={sueloY} x2={W - 24} y2={sueloY} stroke={LIENZO.fgFaint} strokeWidth={2} />

          {!despues ? (
            <g>
              {/* Flecha de 0,5 kg a 50 m/s */}
              <polygon points="56,78 96,78 106,82 96,86 56,86" fill={COLOR_EXP} />
              <text x={80} y={66} fontSize={11} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
                0,5 kg · 50 m/s
              </text>
              <Flecha x1={112} y1={82} x2={166} y2={82} color={COLOR_EXP} grosor={2.5} />

              {/* Bloque de 2 kg en reposo */}
              <rect x={210} y={sueloY - 56} width={72} height={56} rx={4} fill="none" stroke={COLOR_BASE} strokeWidth={2.5} />
              <text x={246} y={sueloY - 24} fontSize={12} textAnchor="middle" fill={COLOR_BASE} fontWeight={600}>
                2 kg (v=0)
              </text>

              <text x={W / 2} y={H - 12} fontSize={11} textAnchor="middle" fill={LIENZO.fgDim}>
                pᵢ = +25 kg·m/s   |   Ec,ᵢ = 625 J
              </text>
            </g>
          ) : (
            <g>
              {/* Bloque unido de 2,5 kg a 10 m/s */}
              <rect x={128} y={sueloY - 56} width={84} height={56} rx={4} fill="none" stroke={COLOR_OK} strokeWidth={2.5} />
              <polygon points="104,88 148,88 158,92 148,96 104,96" fill={COLOR_EXP} />
              <text x={170} y={sueloY - 40} fontSize={11} textAnchor="middle" fill={COLOR_OK} fontWeight={600}>
                2,5 kg unidos
              </text>
              <Flecha x1={220} y1={84} x2={278} y2={84} color={COLOR_OK} grosor={3} />
              <text x={249} y={72} fontSize={11} textAnchor="middle" fill={COLOR_OK} fontWeight={600}>
                vf = 10 m/s
              </text>

              <text x={W / 2} y={H - 12} fontSize={11} textAnchor="middle" fill={COLOR_BAD} fontWeight={600}>
                pf = +25 kg·m/s   |   Ec,f = 125 J (se perdieron 500 J)
              </text>
            </g>
          )}
        </svg>
      </Pizarra>
    </div>
  );
}

function EscInelastico() {
  return (
    <EscenaRica>
      <Titulo>Choque perfectamente inelástico</Titulo>

      <Puente>
        Si dos bolas de plastilina chocan en el aire o dos vagones de ferrocarril se enganchan al encontrarse, luego del
        impacto ya no viajan por separado: avanzan unidos como un único cuerpo con una velocidad común.
      </Puente>

      <Definicion termino="Choque perfectamente inelástico (plástico)">
        <Parrafo>
          Es aquel en el que los cuerpos quedan adheridos tras la colisión compartiendo la misma velocidad final{" "}
          <MathText>{"$\\vec{v}_f$"}</MathText>. Se conserva la cantidad de movimiento total, pero la energía cinética
          disminuye:
        </Parrafo>
        <MathText block>
          {"$$m_1\\vec{v}_1 + m_2\\vec{v}_2 = (m_1 + m_2)\\vec{v}_f \\qquad (E_{c,f} < E_{c,i})$$"}
        </MathText>
      </Definicion>

      <DiagramaInelastico />

      <PorQue>
        <Parrafo>
          Al incrustarse, acoplarse o deformarse permanentemente, las fuerzas internas no conservativas disipan parte de
          la energía cinética en calor, sonido y trabajo de deformación. Sin embargo, como esas fuerzas actúan en pares
          internos iguales y opuestos, el momento lineal del sistema aislado sigue intacto.
        </Parrafo>
      </PorQue>

      {/* basado en: data/examenes/umss/ingenieria/2014-parcial2-2-2014.md P20 */}
      <WorkedExample titulo="Flecha que se incrusta en un bloque (adaptado de UMSS)">
        <Parrafo>
          Una flecha de <MathText>{"$500\\text{ g}$"}</MathText> se mueve horizontalmente a{" "}
          <MathText>{"$50\\text{ m/s}$"}</MathText> y se incrusta en un bloque de madera de{" "}
          <MathText>{"$2\\text{ kg}$"}</MathText> en reposo sobre un piso liso. Calcula la rapidez final del conjunto y
          la energía cinética disipada.
        </Parrafo>
        <Parrafo>
          <strong>Paso 1.</strong> Convierte la masa de la flecha a kilogramos:{" "}
          <MathText>{"$m_1 = 500\\text{ g} = 0{,}5\\text{ kg}$"}</MathText>, y <MathText>{"$m_2 = 2\\text{ kg}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 2.</strong> Aplica conservación del momento lineal:{" "}
          <MathText>{"$(0{,}5)(50) + (2)(0) = (0{,}5 + 2)v_f$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 3.</strong> Despeja la rapidez común:{" "}
          <MathText>{"$25 = 2{,}5\\,v_f \\Rightarrow v_f = \\dfrac{25}{2{,}5} = 10\\text{ m/s}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 4.</strong> Calcula la energía cinética inicial y la final:{" "}
          <MathText>{"$E_{c,i} = \\tfrac{1}{2}(0{,}5)(50)^2 = 625\\text{ J}$"}</MathText>, y{" "}
          <MathText>{"$E_{c,f} = \\tfrac{1}{2}(2{,}5)(10)^2 = 125\\text{ J}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 5.</strong> Resta para hallar la energía disipada:{" "}
          <MathText>{"$\\Delta E_{\\text{disipada}} = 625 - 125 = 500\\text{ J}$"}</MathText> (un{" "}
          <MathText>{"$80\\%$"}</MathText> transformado en calor y deformación).
        </Parrafo>
      </WorkedExample>

      <Cuidado>
        Nunca iguales la energía cinética inicial y final cuando los cuerpos quedan pegados. Si escribieras{" "}
        <MathText>{"$\\tfrac{1}{2}m_1 v_1^2 = \\tfrac{1}{2}(m_1 + m_2)v_f^2$"}</MathText> en el ejemplo anterior,
        obtendrías <MathText>{"$v_f \\approx 22{,}4\\text{ m/s}$"}</MathText>, un resultado completamente falso.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F7 pregunta 2 */}
      <AutoCheck
        pregunta="Un carrito de 3 kg viaja a 4 m/s hacia otro carrito idéntico de 3 kg que está en reposo. Al chocar quedan enganchados. ¿Con qué rapidez se mueven juntos después del choque?"
        opciones={["4 m/s", "1 m/s", "2 m/s", "0 m/s"]}
        correctaIdx={2}
        explicacion="Por conservación del momento: (3 kg)(4 m/s) + 0 = (3 kg + 3 kg)·v_f, de modo que 12 = 6·v_f y v_f = 2 m/s."
      />
    </EscenaRica>
  );
}

/* ── Escena 5: Choque elástico en 1D ─────────────────────────────────── */
function DiagramaElastico1D() {
  const [caso, setCaso] = useState<"igual" | "liviana" | "pesada">("igual");

  const W = 360;
  const H = 158;
  const cyAntes = 48;
  const cyDespues = 116;

  const conf = {
    igual: {
      r1: 17,
      r2: 17,
      m1Label: "m",
      m2Label: "m",
      v1p: 0,
      v2p: 72,
      nota: "m₁ = m₂: la primera se detiene y entrega toda su velocidad",
    },
    liviana: {
      r1: 13,
      r2: 22,
      m1Label: "m",
      m2Label: "2m",
      v1p: -36,
      v2p: 52,
      nota: "m₁ < m₂: la liviana rebota hacia atrás (v₁' < 0)",
    },
    pesada: {
      r1: 22,
      r2: 13,
      m1Label: "2m",
      m2Label: "m",
      v1p: 34,
      v2p: 86,
      nota: "m₁ > m₂: ambas siguen hacia adelante",
    },
  }[caso];

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCaso("igual")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: caso === "igual" ? COLOR_EXP : "var(--border)",
            background: caso === "igual" ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
            color: caso === "igual" ? COLOR_EXP : "var(--fg-muted)",
          }}
        >
          m₁ = m₂
        </button>
        <button
          type="button"
          onClick={() => setCaso("liviana")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: caso === "liviana" ? COLOR_EXP : "var(--border)",
            background: caso === "liviana" ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
            color: caso === "liviana" ? COLOR_EXP : "var(--fg-muted)",
          }}
        >
          m₁ &lt; m₂ (rebota)
        </button>
        <button
          type="button"
          onClick={() => setCaso("pesada")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: caso === "pesada" ? COLOR_EXP : "var(--border)",
            background: caso === "pesada" ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
            color: caso === "pesada" ? COLOR_EXP : "var(--fg-muted)",
          }}
        >
          m₁ &gt; m₂
        </button>
      </div>

      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          {/* Antes */}
          <text x={14} y={cyAntes + 4} fontSize={11} fill={LIENZO.fgDim} fontWeight={600}>
            Antes
          </text>
          <circle cx={108} cy={cyAntes} r={conf.r1} fill="none" stroke={COLOR_EXP} strokeWidth={2.5} />
          <text x={108} y={cyAntes + 4} fontSize={11} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
            {conf.m1Label}
          </text>
          <Flecha x1={108 + conf.r1 + 4} y1={cyAntes} x2={108 + conf.r1 + 66} y2={cyAntes} color={COLOR_EXP} grosor={2.5} />
          <circle cx={236} cy={cyAntes} r={conf.r2} fill="none" stroke={COLOR_BASE} strokeWidth={2.5} />
          <text x={236} y={cyAntes + 4} fontSize={11} textAnchor="middle" fill={COLOR_BASE} fontWeight={600}>
            {conf.m2Label}
          </text>
          <text x={236 + conf.r2 + 8} y={cyAntes + 4} fontSize={10} fill={LIENZO.fgDim}>
            v₂ = 0
          </text>

          <line x1={20} y1={80} x2={W - 20} y2={80} stroke={LIENZO.fgFaint} strokeDasharray="4 4" />

          {/* Después */}
          <text x={14} y={cyDespues + 4} fontSize={11} fill={LIENZO.fgDim} fontWeight={600}>
            Después
          </text>
          <circle cx={136} cy={cyDespues} r={conf.r1} fill="none" stroke={COLOR_EXP} strokeWidth={2.5} />
          <text x={136} y={cyDespues + 4} fontSize={11} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
            {conf.m1Label}
          </text>
          {conf.v1p === 0 ? (
            <text x={136} y={cyDespues - conf.r1 - 6} fontSize={10} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
              v₁&apos; = 0
            </text>
          ) : (
            <Flecha
              x1={136 + (conf.v1p > 0 ? conf.r1 + 4 : -(conf.r1 + 4))}
              y1={cyDespues}
              x2={136 + (conf.v1p > 0 ? conf.r1 + 4 + conf.v1p : -(conf.r1 + 4) + conf.v1p)}
              y2={cyDespues}
              color={conf.v1p < 0 ? COLOR_BAD : COLOR_EXP}
              grosor={2.5}
            />
          )}

          <circle cx={236} cy={cyDespues} r={conf.r2} fill="none" stroke={COLOR_OK} strokeWidth={2.5} />
          <text x={236} y={cyDespues + 4} fontSize={11} textAnchor="middle" fill={COLOR_OK} fontWeight={600}>
            {conf.m2Label}
          </text>
          <Flecha
            x1={236 + conf.r2 + 4}
            y1={cyDespues}
            x2={236 + conf.r2 + 4 + conf.v2p}
            y2={cyDespues}
            color={COLOR_OK}
            grosor={2.5}
          />

          <text x={W / 2} y={H - 8} fontSize={11} textAnchor="middle" fill={LIENZO.fgDim}>
            {conf.nota}
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscElastico() {
  return (
    <EscenaRica>
      <Titulo>Choque elástico en 1D</Titulo>

      <Puente>
        Cuando dos bolas de billar chocan de frente, rebotan y se separan al instante casi sin ruido ni deformación.
        Aquí la energía cinética no se pierde: tanto el momento lineal como la energía cinética total se conservan.
      </Puente>

      <Definicion termino="Choque perfectamente elástico en una dimensión">
        <Parrafo>Se cumplen simultáneamente la conservación de <MathText>{"$\\vec{p}$"}</MathText> y de <MathText>{"$E_c$"}</MathText>:</Parrafo>
        <MathText block>
          {"$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2' \\qquad \\text{y} \\qquad v_1 - v_2 = -(v_1' - v_2')$$"}
        </MathText>
        <Parrafo>
          Para el caso frecuente en que el blanco está en reposo (<MathText>{"$v_2 = 0$"}</MathText>), despejar el
          sistema da las fórmulas directas:
        </Parrafo>
        <MathText block>
          {"$$v_1' = \\frac{m_1 - m_2}{m_1 + m_2}\\,v_1 \\qquad\\qquad v_2' = \\frac{2m_1}{m_1 + m_2}\\,v_1$$"}
        </MathText>
      </Definicion>

      <DiagramaElastico1D />

      <PorQue>
        <Parrafo>
          Si escribes la conservación de energía cinética como{" "}
          <MathText>{"$m_1(v_1^2 - v_1'^2) = m_2(v_2'^2 - v_2^2)$"}</MathText>, factorizas la diferencia de cuadrados y
          divides miembro a miembro entre <MathText>{"$m_1(v_1 - v_1') = m_2(v_2' - v_2)$"}</MathText>, obtienes la
          ecuación lineal <MathText>{"$v_1 + v_1' = v_2 + v_2'$"}</MathText> (que
          equivale a <MathText>{"$v_1 - v_2 = -(v_1' - v_2')$"}</MathText>).
          Cuando <MathText>{"$v_2 = 0$"}</MathText>, de ahí sale{" "}
          <MathText>{"$v_2' = v_1 + v_1'$"}</MathText>, y al sustituirlo en{" "}
          <MathText>{"$m_1 v_1 = m_1 v_1' + m_2 v_2'$"}</MathText> obtienes las
          fórmulas directas. Eso te evita resolver ecuaciones
          cuadráticas incluso cuando ambos cuerpos se mueven antes del choque.
        </Parrafo>
      </PorQue>

      {/* basado en: data/examenes/umss/ingenieria/2016-2op-2-2016.md P12 */}
      <WorkedExample titulo="Choque elástico con masas distintas (adaptado de UMSS)">
        <Parrafo>
          Un cuerpo de <MathText>{"$2\\text{ kg}$"}</MathText> que se mueve a <MathText>{"$2\\text{ m/s}$"}</MathText>{" "}
          choca elásticamente en una dimensión contra otro cuerpo de <MathText>{"$4\\text{ kg}$"}</MathText> en reposo.
          Calcula las velocidades después del choque y comprueba que <MathText>{"$p$"}</MathText> y{" "}
          <MathText>{"$E_c$"}</MathText> se conservan.
        </Parrafo>
        <Parrafo>
          <strong>Paso 1.</strong> Calcula la velocidad final del primer cuerpo:{" "}
          <MathText>
            {"$v_1' = \\dfrac{m_1 - m_2}{m_1 + m_2}\\,v_1 = \\dfrac{2 - 4}{2 + 4}(2) = \\dfrac{-2}{6}(2) = -\\dfrac{2}{3}\\text{ m/s}$"}
          </MathText>{" "}
          (rebota hacia atrás con rapidez de <MathText>{"$\\dfrac{2}{3}\\text{ m/s}$"}</MathText>).
        </Parrafo>
        <Parrafo>
          <strong>Paso 2.</strong> Calcula la velocidad final del segundo cuerpo:{" "}
          <MathText>
            {"$v_2' = \\dfrac{2m_1}{m_1 + m_2}\\,v_1 = \\dfrac{2(2)}{2 + 4}(2) = \\dfrac{8}{6} = \\dfrac{4}{3}\\text{ m/s}$"}
          </MathText>
          .
        </Parrafo>
        <Parrafo>
          <strong>Paso 3.</strong> Comprueba <MathText>{"$p$"}</MathText>:{" "}
          <MathText>{"$p_i = 2(2) + 0 = 4\\text{ kg}\\cdot\\text{m/s}$"}</MathText>;{" "}
          <MathText>
            {"$p_f = 2\\left(-\\dfrac{2}{3}\\right) + 4\\left(\\dfrac{4}{3}\\right) = \\dfrac{-4 + 16}{3} = 4\\text{ kg}\\cdot\\text{m/s}$"}
          </MathText>
          .
        </Parrafo>
        <Parrafo>
          <strong>Paso 4.</strong> Comprueba <MathText>{"$E_c$"}</MathText>:{" "}
          <MathText>{"$E_{c,i} = \\tfrac{1}{2}(2)(2)^2 = 4\\text{ J}$"}</MathText>;{" "}
          <MathText>
            {"$E_{c,f} = \\tfrac{1}{2}(2)\\left(\\dfrac{2}{3}\\right)^2 + \\tfrac{1}{2}(4)\\left(\\dfrac{4}{3}\\right)^2 = \\dfrac{4}{9} + \\dfrac{32}{9} = 4\\text{ J}$"}
          </MathText>
          .
        </Parrafo>
      </WorkedExample>

      <Cuidado>
        Presta atención al signo de <MathText>{"$m_1 - m_2$"}</MathText>. Si el cuerpo que impacta es más liviano que el
        blanco en reposo, <MathText>{"$v_1'$"}</MathText> sale negativo: eso significa que rebota. Si un ejercicio pide
        la rapidez (módulo), omites el signo; si pide velocidad, debes mantenerlo.
      </Cuidado>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F7 pregunta 3 */}
      <AutoCheck
        pregunta="Una bola A de 2 kg se mueve a 6 m/s y choca elásticamente de frente contra otra bola B idéntica de 2 kg en reposo. ¿Cuáles son las velocidades de A y B después del choque?"
        opciones={[
          "A a 3 m/s y B a 3 m/s",
          "A a -6 m/s y B a 0 m/s",
          "A a 2 m/s y B a 4 m/s",
          "A queda en reposo (0 m/s) y B sale a 6 m/s",
        ]}
        correctaIdx={3}
        explicacion="En un choque elástico 1D de masas iguales (m_1 = m_2), los cuerpos intercambian sus velocidades: como B estaba en reposo, A se detiene (0 m/s) y B sale a 6 m/s."
      />
    </EscenaRica>
  );
}

/* ── Escena 6: Coeficiente de restitución ────────────────────────────── */
function DiagramaRestitucion() {
  const [eSel, setESel] = useState<number>(0.8);

  const W = 360;
  const H = 176;
  const TECHO_Y = 30;
  const PISO_Y = 148;
  const ALTURA_PX = PISO_Y - TECHO_Y;
  const h1 = 2.25;
  const h2 = eSel * eSel * h1;
  const yRebote = PISO_Y - eSel * eSel * ALTURA_PX;

  const xCaida = 108;
  const xRebote = 248;

  const botones = [
    { val: 1, texto: "e = 1,0 (elástico)" },
    { val: 0.8, texto: "e = 0,8" },
    { val: 0.5, texto: "e = 0,5" },
    { val: 0, texto: "e = 0 (plástico)" },
  ];

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {botones.map((b) => (
          <button
            key={b.val}
            type="button"
            onClick={() => setESel(b.val)}
            className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
            style={{
              borderColor: eSel === b.val ? COLOR_EXP : "var(--border)",
              background: eSel === b.val ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
              color: eSel === b.val ? COLOR_EXP : "var(--fg-muted)",
            }}
          >
            {b.texto}
          </button>
        ))}
      </div>

      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          {/* Piso y línea de altura inicial */}
          <line x1={28} y1={PISO_Y} x2={W - 28} y2={PISO_Y} stroke={COLOR_BASE} strokeWidth={2.5} />
          <line x1={48} y1={TECHO_Y} x2={W - 48} y2={TECHO_Y} stroke={LIENZO.fgFaint} strokeDasharray="4 4" />

          {/* Caída desde h1 */}
          <circle cx={xCaida} cy={TECHO_Y} r={11} fill="none" stroke={COLOR_EXP} strokeWidth={2.5} />
          <Flecha x1={xCaida} y1={TECHO_Y + 16} x2={xCaida} y2={PISO_Y - 12} color={COLOR_EXP} grosor={2.2} />
          <text x={xCaida - 18} y={(TECHO_Y + PISO_Y) / 2} fontSize={11} textAnchor="end" fill={COLOR_EXP} fontWeight={600}>
            h₁ = 2,25 m
          </text>

          {/* Rebote hasta h2 */}
          <circle cx={xRebote} cy={yRebote - (eSel === 0 ? 11 : 0)} r={11} fill={eSel === 0 ? COLOR_BAD : "none"} fillOpacity={0.25} stroke={eSel === 0 ? COLOR_BAD : COLOR_OK} strokeWidth={2.5} />
          {eSel > 0 && (
            <>
              <line
                x1={xRebote - 32}
                y1={yRebote}
                x2={xRebote + 32}
                y2={yRebote}
                stroke={COLOR_OK}
                strokeDasharray="3 3"
              />
              <Flecha x1={xRebote} y1={PISO_Y - 10} x2={xRebote} y2={yRebote + 15} color={COLOR_OK} grosor={2.2} />
            </>
          )}
          <text
            x={xRebote + 20}
            y={Math.min(PISO_Y - 12, (yRebote + PISO_Y) / 2)}
            fontSize={11}
            fill={eSel === 0 ? COLOR_BAD : COLOR_OK}
            fontWeight={600}
          >
            h₂ = {h2.toFixed(2).replace(".", ",")} m
          </text>

          <text x={W / 2} y={H - 8} fontSize={11} textAnchor="middle" fill={LIENZO.fgDim}>
            e = √(h₂ / h₁) = {eSel.toFixed(1).replace(".", ",")}  ⇒  altura recuperada: {Math.round(eSel * eSel * 100)}%
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscRestitucion() {
  return (
    <EscenaRica>
      <Titulo>Coeficiente de restitución</Titulo>

      <Puente>
        En la vida real casi ningún choque es perfectamente elástico ni totalmente plástico. Si dejas caer desde la
        misma altura una pelota de tenis y una bola de plastilina, una rebota casi hasta tu mano y la otra se aplasta en
        el piso. El coeficiente de restitución mide ese grado de elasticidad entre <MathText>{"$0$"}</MathText> y{" "}
        <MathText>{"$1$"}</MathText>.
      </Puente>

      <Definicion termino="Coeficiente de restitución (e)">
        <Parrafo>
          Es la razón entre la rapidez relativa de separación y la rapidez relativa de acercamiento sobre la recta del
          choque (<MathText>{"$0 \\le e \\le 1$"}</MathText>):
        </Parrafo>
        <MathText block>{"$$e = \\frac{v_2' - v_1'}{v_1 - v_2}$$"}</MathText>
        <Parrafo>
          Las velocidades{" "}
          <MathText>{"$v_1, v_2, v_1', v_2'$"}</MathText> llevan signo según el
          eje elegido (si los cuerpos se acercan de frente,{" "}
          <MathText>{"$v_1$"}</MathText> y <MathText>{"$v_2$"}</MathText> tienen
          signos opuestos y el denominador suma sus rapideces).
        </Parrafo>
        <Parrafo>
          Si <MathText>{"$e = 1$"}</MathText>, el choque es elástico; si <MathText>{"$0 < e < 1$"}</MathText>, es
          inelástico parcial; si <MathText>{"$e = 0$"}</MathText>, es perfectamente inelástico (quedan pegados,{" "}
          <MathText>{"$v_1' = v_2'$"}</MathText>). Cuando un cuerpo rebota contra el suelo fijo desde una altura{" "}
          <MathText>{"$h_1$"}</MathText> hasta <MathText>{"$h_2$"}</MathText>:
        </Parrafo>
        <MathText block>{"$$e = \\sqrt{\\frac{h_2}{h_1}}$$"}</MathText>
      </Definicion>

      <DiagramaRestitucion />

      <PorQue>
        <Parrafo>
          Al caer desde el reposo una altura <MathText>{"$h_1$"}</MathText>, el cuerpo llega al piso con rapidez{" "}
          <MathText>{"$v_1 = \\sqrt{2gh_1}$"}</MathText>. Al rebotar verticalmente hacia arriba con rapidez{" "}
          <MathText>{"$v_1'$"}</MathText>, alcanza una altura <MathText>{"$h_2$"}</MathText> tal que{" "}
          <MathText>{"$v_1' = \\sqrt{2gh_2}$"}</MathText>. Como el suelo permanece inmóvil (
          <MathText>{"$v_2 = v_2' = 0$"}</MathText>), al dividir ambas rapideces se cancela{" "}
          <MathText>{"$\\sqrt{2g}$"}</MathText> y aparece la raíz del cociente de alturas.
        </Parrafo>
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F7 pregunta 5 */}
      <WorkedExample titulo="Rebote en el piso y colisión semielástica">
        <Parrafo>
          <strong>Parte A (adaptado de banco PSA).</strong> Una pelota cae desde{" "}
          <MathText>{"$2{,}25\\text{ m}$"}</MathText> de altura sobre un piso horizontal y rebota hasta{" "}
          <MathText>{"$1{,}44\\text{ m}$"}</MathText>. Halla el coeficiente de restitución.
        </Parrafo>
        <Parrafo>
          <strong>Paso 1.</strong> Sustituye las alturas:{" "}
          <MathText>{"$e = \\sqrt{\\dfrac{h_2}{h_1}} = \\sqrt{\\dfrac{1{,}44}{2{,}25}} = \\sqrt{0{,}64} = 0{,}8$"}</MathText>
          .
        </Parrafo>
        <Parrafo>
          <strong>Parte B.</strong> Dos carros de igual masa (<MathText>{"$m_1 = m_2 = 1\\text{ kg}$"}</MathText>) chocan
          con <MathText>{"$v_1 = +6\\text{ m/s}$"}</MathText> y <MathText>{"$v_2 = 0$"}</MathText>, siendo{" "}
          <MathText>{"$e = 0{,}5$"}</MathText>. Calcula sus velocidades finales.
        </Parrafo>
        <Parrafo>
          <strong>Paso 2.</strong> Conservación del momento:{" "}
          <MathText>{"$1(6) + 0 = 1\\,v_1' + 1\\,v_2' \\Rightarrow v_1' + v_2' = 6$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 3.</strong> Ecuación de restitución:{" "}
          <MathText>{"$0{,}5 = \\dfrac{v_2' - v_1'}{6 - 0} \\Rightarrow v_2' - v_1' = 3$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 4.</strong> Suma las dos ecuaciones y despeja:{" "}
          <MathText>{"$2v_2' = 9 \\Rightarrow v_2' = 4{,}5\\text{ m/s}$"}</MathText>, y luego{" "}
          <MathText>{"$v_1' = 6 - 4{,}5 = 1{,}5\\text{ m/s}$"}</MathText>.
        </Parrafo>
      </WorkedExample>

      <Cuidado>
        No olvides la raíz cuadrada al usar alturas. Si una pelota rebota hasta la mitad de la altura inicial (
        <MathText>{"$h_2 / h_1 = 0{,}5$"}</MathText>), el coeficiente de restitución NO es{" "}
        <MathText>{"$0{,}5$"}</MathText>, sino <MathText>{"$\\sqrt{0{,}5} \\approx 0{,}71$"}</MathText>.
      </Cuidado>

      <AutoCheck
        pregunta="Se suelta una pelota desde 4,0 m de altura y rebota hasta 1,0 m. ¿Cuál es el coeficiente de restitución entre la pelota y el piso?"
        opciones={["0,50", "0,25", "0,75", "2,00"]}
        correctaIdx={0}
        explicacion="e = raíz(h_2 / h_1) = raíz(1,0 / 4,0) = raíz(0,25) = 0,50. Dividir 1,0 / 4,0 sin aplicar la raíz daría el valor incorrecto 0,25."
      />
    </EscenaRica>
  );
}

/* ── Escena 7: Péndulo balístico y retroceso ─────────────────────────── */
function DiagramaPenduloRetroceso() {
  const [vista, setVista] = useState<"pendulo" | "retroceso">("pendulo");

  const W = 360;
  const H = 166;

  /* Geometría exacta para el péndulo: pivote en (200, 18), cuerda L = 110 */
  const pivX = 200;
  const pivY = 18;
  const L = 104;
  const angRad = (34 * Math.PI) / 180;
  const xLow = pivX;
  const yLow = pivY + L;
  const xHigh = pivX + L * Math.sin(angRad);
  const yHigh = pivY + L * Math.cos(angRad);

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <button
          type="button"
          onClick={() => setVista("pendulo")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: vista === "pendulo" ? COLOR_EXP : "var(--border)",
            background: vista === "pendulo" ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
            color: vista === "pendulo" ? COLOR_EXP : "var(--fg-muted)",
          }}
        >
          Péndulo balístico (2 etapas)
        </button>
        <button
          type="button"
          onClick={() => setVista("retroceso")}
          className="rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors"
          style={{
            borderColor: vista === "retroceso" ? COLOR_EXP : "var(--border)",
            background: vista === "retroceso" ? "var(--bg-selected, rgba(37,99,235,0.12))" : "transparent",
            color: vista === "retroceso" ? COLOR_EXP : "var(--fg-muted)",
          }}
        >
          Retroceso (pᵢ = 0)
        </button>
      </div>

      <Pizarra alto={H}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          {vista === "pendulo" ? (
            <g>
              {/* Soporte superior */}
              <line x1={pivX - 36} y1={pivY} x2={pivX + 36} y2={pivY} stroke={COLOR_BASE} strokeWidth={3} />
              <circle cx={pivX} cy={pivY} r={3.5} fill={COLOR_BASE} />

              {/* Cuerda inicial y posición baja */}
              <line x1={pivX} y1={pivY} x2={xLow} y2={yLow - 16} stroke={LIENZO.fgDim} strokeWidth={1.6} />
              <rect x={xLow - 22} y={yLow - 16} width={44} height={32} rx={3} fill="none" stroke={COLOR_EXP} strokeWidth={2.2} />
              <text x={xLow} y={yLow + 4} fontSize={11} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
                M
              </text>

              {/* Bala incidente */}
              <polygon points="62,118 82,118 88,122 82,126 62,126" fill={COLOR_BAD} />
              <Flecha x1={92} y1={122} x2={166} y2={122} color={COLOR_BAD} grosor={2.2} />
              <text x={112} y={110} fontSize={11} textAnchor="middle" fill={COLOR_BAD} fontWeight={600}>
                m_b, v_b
              </text>

              {/* Cuerda y posición elevada */}
              <line x1={pivX} y1={pivY} x2={xHigh} y2={yHigh - 16} stroke={COLOR_OK} strokeWidth={1.8} strokeDasharray="4 3" />
              <rect
                x={xHigh - 22}
                y={yHigh - 16}
                width={44}
                height={32}
                rx={3}
                fill="none"
                stroke={COLOR_OK}
                strokeWidth={2.2}
                strokeDasharray="4 2"
              />
              <text x={xHigh} y={yHigh + 4} fontSize={10} textAnchor="middle" fill={COLOR_OK} fontWeight={600}>
                m_b+M
              </text>

              {/* Cota de altura h */}
              <line x1={xLow + 28} y1={yLow} x2={xHigh + 42} y2={yLow} stroke={LIENZO.fgFaint} strokeDasharray="3 3" />
              <line x1={xHigh + 26} y1={yHigh} x2={xHigh + 42} y2={yHigh} stroke={LIENZO.fgFaint} strokeDasharray="3 3" />
              <line x1={xHigh + 36} y1={yLow} x2={xHigh + 36} y2={yHigh} stroke={COLOR_OK} strokeWidth={1.8} />
              <text x={xHigh + 42} y={(yLow + yHigh) / 2 + 4} fontSize={11} fill={COLOR_OK} fontWeight={600}>
                h
              </text>

              <text x={82} y={H - 8} fontSize={10.5} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
                Etapa 1: solo p
              </text>
              <text x={272} y={H - 8} fontSize={10.5} textAnchor="middle" fill={COLOR_OK} fontWeight={600}>
                Etapa 2: solo E_mecánica
              </text>
            </g>
          ) : (
            <g>
              <text x={W / 2} y={24} fontSize={11} textAnchor="middle" fill={LIENZO.fgDim}>
                Al inicio ambos están en reposo (pᵢ = 0)  ⇒  m₁v₁&apos; + m₂v₂&apos; = 0
              </text>

              {/* Rifle retrocediendo hacia la izquierda */}
              <rect x={118} y={70} width={78} height={24} rx={4} fill="none" stroke={COLOR_EXP} strokeWidth={2.4} />
              <text x={157} y={86} fontSize={11} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
                M (arma)
              </text>
              <Flecha x1={112} y1={82} x2={46} y2={82} color={COLOR_EXP} grosor={3} />
              <text x={78} y={66} fontSize={11} textAnchor="middle" fill={COLOR_EXP} fontWeight={600}>
                V_retroceso
              </text>

              {/* Bala hacia la derecha */}
              <polygon points="236,78 254,78 260,82 254,86 236,86" fill={COLOR_BAD} />
              <Flecha x1={266} y1={82} x2={332} y2={82} color={COLOR_BAD} grosor={3} />
              <text x={286} y={66} fontSize={11} textAnchor="middle" fill={COLOR_BAD} fontWeight={600}>
                m, v_bala
              </text>

              <text x={W / 2} y={H - 18} fontSize={11} textAnchor="middle" fill={COLOR_BASE} fontWeight={600}>
                |M · V_retroceso| = |m · v_bala|  (mismos módulos, sentidos opuestos)
              </text>
            </g>
          )}
        </svg>
      </Pizarra>
    </div>
  );
}

function EscPenduloRetroceso() {
  return (
    <EscenaRica>
      <Titulo>Péndulo balístico y retroceso</Titulo>

      <Puente>
        Antes de que existieran las cámaras ultrarrápidas, ¿cómo se medía la velocidad de un proyectil? Disparándolo
        contra un bloque suspendido de cuerdas para medir cuánto sube. Y en el disparo mismo ocurre el efecto inverso:
        como todo empieza quieto, si la bala sale hacia adelante, el arma retrocede hacia atrás.
      </Puente>

      <Definicion termino="Péndulo balístico (2 etapas) y retroceso">
        <Parrafo>
          El péndulo balístico combina un choque plástico con un ascenso gravitatorio, y se analiza de atrás hacia
          adelante en dos etapas separadas:
        </Parrafo>
        <MathText block>
          {
            "$$\\text{Etapa 2 (ascenso, solo } E_m\\text{): } V = \\sqrt{2gh} \\qquad\\qquad \\text{Etapa 1 (choque, solo } p\\text{): } v_b = \\frac{m_b + M}{m_b}\\,V$$"
          }
        </MathText>
        <Parrafo>
          En un <strong>retroceso</strong> desde el reposo (<MathText>{"$p_i = 0$"}</MathText>), los momentos finales
          son iguales y opuestos:
        </Parrafo>
        <MathText block>
          {"$$0 = m_b\\vec{v}_b + M\\vec{V}_{\\text{arma}} \\quad\\Longrightarrow\\quad V_{\\text{arma}} = -\\frac{m_b}{M}\\,v_b$$"}
        </MathText>
      </Definicion>

      <DiagramaPenduloRetroceso />

      <PorQue>
        <Parrafo>
          Mientras la bala perfora la madera actúa una enorme fricción interna que disipa en calor casi toda la energía
          cinética inicial, pero el momento horizontal total se conserva intacto porque el choque dura apenas un instante
          antes de que la cuerda se incline. Recién cuando el conjunto ya está unido dejan de actuar fuerzas no
          conservativas y se conserva la energía mecánica durante la subida.
        </Parrafo>
      </PorQue>

      {/* basado en: docs/psa-2027/MFQ_INVENTARIO.md §4.2 F7 pregunta 4 */}
      <WorkedExample titulo="Péndulo balístico y retroceso de un rifle">
        <Parrafo>
          <strong>Parte A (péndulo balístico, <MathText>{"$g = 9{,}8\\text{ m/s}^2$"}</MathText>).</strong> Una bala de{" "}
          <MathText>{"$20\\text{ g}$"}</MathText> se incrusta en un bloque colgado de{" "}
          <MathText>{"$1{,}98\\text{ kg}$"}</MathText> en reposo, y el conjunto sube hasta{" "}
          <MathText>{"$h = 0{,}10\\text{ m}$"}</MathText>. Calcula la rapidez de la bala antes del impacto.
        </Parrafo>
        <Parrafo>
          <strong>Paso 1.</strong> Convierte masas y suma la masa conjunta:{" "}
          <MathText>{"$m_b = 0{,}02\\text{ kg}$"}</MathText>,{" "}
          <MathText>{"$m_b + M = 0{,}02 + 1{,}98 = 2{,}00\\text{ kg}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 2.</strong> Etapa 2 (energía en el ascenso):{" "}
          <MathText>{"$V = \\sqrt{2gh} = \\sqrt{2(9{,}8)(0{,}10)} = \\sqrt{1{,}96} = 1{,}4\\text{ m/s}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 3.</strong> Etapa 1 (momento en el impacto):{" "}
          <MathText>{"$(0{,}02)v_b = (2{,}00)(1{,}4) = 2{,}8$"}</MathText>, de donde{" "}
          <MathText>{"$v_b = \\dfrac{2{,}8}{0{,}02} = 140\\text{ m/s}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Parte B (retroceso, adaptado de banco PSA).</strong> Un rifle de{" "}
          <MathText>{"$4\\text{ kg}$"}</MathText> en reposo dispara una bala de <MathText>{"$20\\text{ g}$"}</MathText> a{" "}
          <MathText>{"$400\\text{ m/s}$"}</MathText>. ¿Con qué rapidez retrocede el rifle?
        </Parrafo>
        <Parrafo>
          <strong>Paso 4.</strong> Igualando a cero el momento total (<MathText>{"$p_i = 0$"}</MathText>):{" "}
          <MathText>{"$0 = (0{,}02)(400) + 4\\,V_{\\text{rifle}} = 8 + 4\\,V_{\\text{rifle}}$"}</MathText>.
        </Parrafo>
        <Parrafo>
          <strong>Paso 5.</strong> Despeja: <MathText>{"$V_{\\text{rifle}} = -\\dfrac{8}{4} = -2\\text{ m/s}$"}</MathText>{" "}
          (rapidez de retroceso de <MathText>{"$2\\text{ m/s}$"}</MathText>).
        </Parrafo>
      </WorkedExample>

      <Cuidado>
        El error más grave en el péndulo balístico es escribir{" "}
        <MathText>{"$\\tfrac{1}{2}m_b v_b^2 = (m_b + M)gh$"}</MathText> en un solo paso. Si haces eso en la Parte A,
        obtendrías <MathText>{"$v_b = 14\\text{ m/s}$"}</MathText> en lugar de <MathText>{"$140\\text{ m/s}$"}</MathText>,
        porque estarías suponiendo falsamente que no se perdió energía cuando la bala perforó la madera.
      </Cuidado>

      <AutoCheck
        pregunta="Un fusil de 4 kg en reposo dispara horizontalmente un proyectil de 30 g a 400 m/s. ¿Cuál es la rapidez de retroceso del fusil?"
        opciones={["1,5 m/s", "3 m/s", "12 m/s", "30 m/s"]}
        correctaIdx={1}
        explicacion="Pasa 30 g a 0,03 kg. Por conservación del momento (p_i = 0): (0,03)(400) + 4·V = 0, así que 12 + 4·V = 0 y el fusil retrocede a 3 m/s."
      />
    </EscenaRica>
  );
}

/* ── Escena 8: Errores y práctica ────────────────────────────────────── */
type Ejercicio = {
  p: string;
  o: string[];
  c: number;
  ex: string;
};

const EJERCICIOS_PRACTICA: Ejercicio[] = [
  // basado en: data/examenes/umss/ingenieria/2017-2op-1-2017.md P11
  {
    p: "Una esfera de masa $M_1$ se mueve a $+30\\text{ m/s}$ y choca elásticamente en 1D contra otra esfera de masa $M_2 = 2M_1$ en reposo. ¿Cuáles son las velocidades finales $v_1'$ y $v_2'$?",
    o: [
      "$-10\\text{ m/s}$ y $+20\\text{ m/s}$",
      "$+10\\text{ m/s}$ y $+20\\text{ m/s}$",
      "$0\\text{ m/s}$ y $+15\\text{ m/s}$",
      "$-15\\text{ m/s}$ y $+15\\text{ m/s}$",
    ],
    c: 0,
    ex: "Con $M_2 = 2M_1$: $v_1' = \\dfrac{M_1 - 2M_1}{M_1 + 2M_1}(30) = -10\\text{ m/s}$, y $v_2' = \\dfrac{2M_1}{3M_1}(30) = +20\\text{ m/s}$.",
  },
  // basado en: data/examenes/umss/ingenieria/2014-parcial2-2-2014.md P19
  {
    p: "Dos péndulos de longitud $L = 2\\text{ m}$ cuelgan del mismo punto. La masa $m_1 = 2\\text{ kg}$ se suelta desde posición horizontal ($90^\\circ$) y choca elásticamente abajo con $m_2 = 4\\text{ kg}$ en reposo ($g = 10\\text{ m/s}^2$). ¿Hasta qué altura $h_2$ sube $m_2$?",
    o: ["$1{,}00\\text{ m}$", "$\\dfrac{4}{3}\\text{ m}$", "$\\dfrac{8}{9}\\text{ m}$", "$\\dfrac{2}{9}\\text{ m}$"],
    c: 2,
    ex: "Al llegar abajo, $v_1^2 = 2gL$. Tras el choque elástico, $v_2' = \\dfrac{2m_1}{m_1 + m_2}v_1 = \\dfrac{4}{6}v_1 = \\dfrac{2}{3}v_1$. Entonces $h_2 = \\dfrac{(v_2')^2}{2g} = \\left(\\dfrac{2}{3}\\right)^2 L = \\dfrac{4}{9}(2) = \\dfrac{8}{9}\\text{ m}$.",
  },
  // basado en: data/examenes/umss/ingenieria/2013-final-2-2013.md P19
  {
    p: "Un carrito de masa $m$ avanza a $5\\text{ m/s}$ sobre un piso liso hacia un carro grande en reposo de masa $M = 4m$ que tiene una rampa curva lisa. El carrito pequeño sube por la rampa hasta su altura máxima respecto al grande ($g = 10\\text{ m/s}^2$). ¿Cuál es esa altura $h$?",
    o: ["$0{,}5\\text{ m}$", "$1{,}0\\text{ m}$", "$1{,}25\\text{ m}$", "$2{,}0\\text{ m}$"],
    c: 1,
    ex: "En la altura máxima ambos comparten velocidad horizontal: $m(5) = (m + 4m)v_c \\Rightarrow v_c = 1\\text{ m/s}$. Como no hay fricción, $\\tfrac{1}{2}m(5)^2 = \\tfrac{1}{2}(5m)(1)^2 + m(10)h$, de donde $12{,}5 - 2{,}5 = 10h$ y $h = 1{,}0\\text{ m}$.",
  },
  {
    p: "Sobre un bloque de $2\\text{ kg}$ en reposo actúa una fuerza horizontal cuya gráfica $F$-$t$ forma un triángulo de altura máxima $40\\text{ N}$ y base desde $t = 0\\text{ s}$ hasta $t = 0{,}5\\text{ s}$. ¿Cuál es la rapidez final del bloque?",
    o: ["$20\\text{ m/s}$", "$10\\text{ m/s}$", "$2{,}5\\text{ m/s}$", "$5\\text{ m/s}$"],
    c: 3,
    ex: "El impulso es el área del triángulo: $J = \\tfrac{1}{2}(0{,}5\\text{ s})(40\\text{ N}) = 10\\text{ N}\\cdot\\text{s}$. Luego $v_f = \\dfrac{J}{m} = \\dfrac{10}{2} = 5\\text{ m/s}$.",
  },
  {
    p: "Una bala de $10\\text{ g}$ se incrusta en un péndulo de madera de $1{,}99\\text{ kg}$ en reposo, y el conjunto sube $h = 0{,}40\\text{ m}$ ($g = 9{,}8\\text{ m/s}^2$). ¿Cuál era la rapidez inicial de la bala?",
    o: ["$560\\text{ m/s}$", "$280\\text{ m/s}$", "$39{,}6\\text{ m/s}$", "$2{,}8\\text{ m/s}$"],
    c: 0,
    ex: "Etapa 2 (energía): $V = \\sqrt{2(9{,}8)(0{,}40)} = \\sqrt{7{,}84} = 2{,}8\\text{ m/s}$. Etapa 1 (momento): $(0{,}01)v_b = (0{,}01 + 1{,}99)(2{,}8) = 5{,}6$, por lo que $v_b = 560\\text{ m/s}$.",
  },
  {
    p: "Dos bolas A ($2\\text{ kg}$) y B ($2\\text{ kg}$) se acercan por la misma recta: A va hacia la derecha a $5\\text{ m/s}$ y B hacia la izquierda a $3\\text{ m/s}$. Si el coeficiente de restitución es $e = 0{,}5$, ¿con qué velocidad sale B?",
    o: [
      "$-1\\text{ m/s}$ (izquierda)",
      "$+3\\text{ m/s}$ (derecha)",
      "$+1\\text{ m/s}$ (derecha)",
      "$-3\\text{ m/s}$ (izquierda)",
    ],
    c: 1,
    ex: "Con derecha positiva, $v_1 = +5$ y $v_2 = -3$. Momento (masas iguales): $v_1' + v_2' = 5 - 3 = 2$. Restitución: $v_2' - v_1' = 0{,}5(5 - (-3)) = 4$. Sumando ambas ecuaciones: $2v_2' = 6 \\Rightarrow v_2' = +3\\text{ m/s}$.",
  },
];

function EscPractica() {
  const [resp, setResp] = useState<Record<number, number>>({});

  return (
    <EscenaRica>
      <Titulo>Errores frecuentes y práctica</Titulo>

      <Misconception titulo="Tratar la cantidad de movimiento como escalar sin signo">
        Fija siempre un eje positivo antes de sustituir números. Si una pelota rebota en sentido opuesto,{" "}
        <MathText>{"$\\Delta v = v_f - (-v_i)$"}</MathText> suma ambas rapideces en valor absoluto, no las resta.
      </Misconception>

      <Misconception titulo="Conservar la energía cinética en cualquier choque">
        En todo sistema aislado se conserva el momento lineal (<MathText>{"$0 \\le e \\le 1$"}</MathText>), pero la
        energía cinética solo se conserva cuando el choque es elástico (<MathText>{"$e = 1$"}</MathText>).
      </Misconception>

      <Misconception titulo="Mezclar gramos con kilogramos u olvidar la raíz en e">
        Pasa siempre los gramos a kilogramos antes de operar con <MathText>{"$\\text{N}\\cdot\\text{s}$"}</MathText> o{" "}
        <MathText>{"$\\text{J}$"}</MathText>. Y en rebotes verticales usa{" "}
        <MathText>{"$e = \\sqrt{h_2 / h_1}$"}</MathText>, nunca <MathText>{"$h_2 / h_1$"}</MathText>.
      </Misconception>

      <Misconception titulo="Saltarse las dos etapas en el péndulo balístico">
        No puedes igualar la energía cinética inicial de la bala con la energía potencial final del péndulo porque se
        pierde calor al incrustarse. Resuelve la subida con energía y el choque con momento lineal.
      </Misconception>

      <div className="mt-6">
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: LIENZO.fgDim,
            marginBottom: 12,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          Práctica · 6 ejercicios tipo examen
        </div>
        <div className="space-y-4">
          {EJERCICIOS_PRACTICA.map((ej, i) => {
            const sel = resp[i];
            const ok = sel === ej.c;
            return (
              <div
                key={ej.p}
                className="rounded-xl p-4"
                style={{
                  border: `1px solid ${sel === undefined ? "var(--border)" : ok ? COLOR_OK : COLOR_BAD}`,
                  background: "var(--bg-subtle)",
                }}
              >
                <div className="mb-2.5 text-sm font-medium" style={{ color: "var(--fg-primary)" }}>
                  {i + 1}. <MathText>{ej.p}</MathText>
                </div>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {ej.o.map((op, j) => {
                    const elegido = sel === j;
                    const esCorrecta = j === ej.c;
                    let border = "var(--border)";
                    let bg = "transparent";
                    if (sel !== undefined) {
                      if (esCorrecta) {
                        border = COLOR_OK;
                        bg = "rgba(22,163,74,0.12)";
                      } else if (elegido) {
                        border = COLOR_BAD;
                        bg = "rgba(220,38,38,0.12)";
                      }
                    }
                    return (
                      <button
                        key={op}
                        type="button"
                        disabled={sel !== undefined}
                        onClick={() => setResp((r) => ({ ...r, [i]: j }))}
                        className="rounded-lg border px-3 py-2 text-left text-xs transition-colors"
                        style={{
                          borderColor: border,
                          background: bg,
                          color: "var(--fg-primary)",
                        }}
                      >
                        <MathText>{op}</MathText>
                      </button>
                    );
                  })}
                </div>
                {sel !== undefined && (
                  <div className="mt-2.5 text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    <strong style={{ color: ok ? COLOR_OK : COLOR_BAD }}>
                      {ok ? "Correcto." : "Revisa el procedimiento."}
                    </strong>{" "}
                    <MathText>{ej.ex}</MathText>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </EscenaRica>
  );
}

/* ── Registro de escenas y exportación de la lección ─────────────────── */
const ESCENAS: Escena[] = [
  { titulo: "Cantidad de movimiento · p = mv", componente: EscMomento },
  { titulo: "Impulso y gráfica F-t", componente: EscImpulso },
  { titulo: "Conservación en sistemas aislados", componente: EscConservacion },
  { titulo: "Choque perfectamente inelástico", componente: EscInelastico },
  { titulo: "Choque elástico en 1D", componente: EscElastico },
  { titulo: "Coeficiente de restitución", componente: EscRestitucion },
  { titulo: "Péndulo balístico y retroceso", componente: EscPenduloRetroceso },
  { titulo: "Errores y práctica", componente: EscPractica },
];

export default function PaginaImpulsoCantidadMovimiento() {
  return (
    <LeccionShell
      unidad="FIS-10"
      tituloUnidad="Impulso, Cantidad de Movimiento y Colisiones"
      escenas={ESCENAS}
    />
  );
}

/* VERIFICACIÓN:
 * Escena 1 Ejemplo: m1=500 g=0.5 kg, v1=+12 m/s -> p1=0.5*12=+6 kg·m/s; m2=2 kg, v2=-4 m/s -> p2=2*(-4)=-8 kg·m/s; p_total=6+(-8)=-2 kg·m/s.
 * Escena 1 AutoCheck: m=4 kg, v=-3 m/s -> p=4*(-3)=-12 kg·m/s (idx 1).
 * Escena 2 Gráfica: J1=100*0.05=5 N·s; J2=25*0.20=5 N·s.
 * Escena 2 Ejemplo (MFQ F7 #1): m=0.4 kg, F=100 N, dt=0.05 s -> J=100*0.05=5 N·s -> vf=5/0.4=12.5 m/s.
 * Escena 2 AutoCheck: m=0.5 kg, vi=+10 m/s, vf=-6 m/s -> J=0.5*(-6-10)=-8 N·s -> |J|=8 N·s (idx 2).
 * Escena 3 Ejemplo (UMSS 2013-final-2-2013 P20): M=5m, vi=5 m/s -> pi=6m*5=30m; vp=vc+3 -> 30m=m(vc+3)+5m*vc -> 30=6vc+3 -> vc=27/6=4.5 m/s.
 * Escena 3 AutoCheck (UMSS 2006-2op-1-2006 P11): m(-1)+m(vB)=2m(+2) -> -1+vB=4 -> vB=5 m/s (idx 0).
 * Escena 4 Ejemplo (UMSS 2014-parcial2-2-2014 P20): m1=500 g=0.5 kg, v1=50 m/s, m2=2 kg, v2=0 -> 0.5*50=(0.5+2)vf -> 25=2.5*vf -> vf=10 m/s; Ec_i=0.5*0.5*50^2=625 J; Ec_f=0.5*2.5*10^2=125 J; disipada=625-125=500 J (500/625=80%).
 * Escena 4 AutoCheck (MFQ F7 #2): m1=3 kg, v1=4 m/s, m2=3 kg, v2=0 -> 3*4=(3+3)vf -> vf=12/6=2 m/s (idx 2).
 * Escena 5 Ejemplo (UMSS 2016-2op-2-2016 P12): m1=2 kg, v1=2 m/s, m2=4 kg, v2=0 -> v1'=((2-4)/(2+4))*2=-2/3 m/s; v2'=(2*2/6)*2=4/3 m/s; pi=4, pf=2(-2/3)+4(4/3)=12/3=4; Ec_i=0.5*2*4=4 J, Ec_f=0.5*2*(4/9)+0.5*4*(16/9)=4/9+32/9=36/9=4 J.
 * Escena 5 AutoCheck (MFQ F7 #3): m1=m2=2 kg, v1=6 m/s, v2=0, elástico -> v1'=0 m/s, v2'=6 m/s (idx 3).
 * Escena 6 Diagrama: h1=2.25 m -> e=1 -> h2=2.25; e=0.8 -> h2=0.64*2.25=1.44; e=0.5 -> h2=0.25*2.25=0.5625 (0.56); e=0 -> h2=0.
 * Escena 6 Ejemplo (MFQ F7 #5 + 2 carros): A) e=sqrt(1.44/2.25)=sqrt(0.64)=0.8. B) m1=m2=1 kg, v1=6, v2=0, e=0.5 -> v1'+v2'=6 y v2'-v1'=0.5*6=3 -> 2v2'=9 -> v2'=4.5 m/s, v1'=1.5 m/s.
 * Escena 6 AutoCheck: h1=4.0 m, h2=1.0 m -> e=sqrt(1.0/4.0)=sqrt(0.25)=0.50 (idx 0).
 * Escena 7 Ejemplo (g=9.8 m/s² + MFQ F7 #4): A) mb=20 g=0.02 kg, M=1.98 kg -> mb+M=2.00 kg, h=0.10 m -> V=sqrt(2*9.8*0.10)=sqrt(1.96)=1.4 m/s -> 0.02*vb=2.00*1.4=2.8 -> vb=2.8/0.02=140 m/s. B) M=4 kg, mb=0.02 kg, vb=400 m/s -> 0=0.02*400+4*V -> V=-8/4=-2 m/s (rapidez 2 m/s).
 * Escena 7 AutoCheck: M=4 kg, m=30 g=0.03 kg, v=400 m/s -> 0.03*400=12 -> 12/4=3 m/s (idx 1).
 * Escena 8 Práctica:
 *   P1 (UMSS 2017-2op-1-2017 P11): M2=2M1, V1=30 -> v1'=(M1-2M1)/(3M1)*30=-10 m/s; v2'=(2M1)/(3M1)*30=+20 m/s (c=0).
 *   P2 (UMSS 2014-parcial2-2-2014 P19): L=2 m, m1=2 kg, m2=4 kg, g=10 -> v1^2=2*10*2=40 -> v2'=(2*2/6)v1=(2/3)v1 -> h2=(v2')^2/(2g)=(4/9)*L=(4/9)*2=8/9 m (c=2).
 *   P3 (UMSS 2013-final-2-2013 P19): m a 5 m/s, M=4m en reposo -> m*5=5m*vc -> vc=1 m/s; 0.5*m*25=0.5*5m*1+m*10*h -> 12.5-2.5=10h -> h=1.0 m (c=1).
 *   P4: área triángulo base 0.5 s, altura 40 N -> J=0.5*0.5*40=10 N·s; m=2 kg -> vf=10/2=5 m/s (c=3).
 *   P5: mb=10 g=0.01 kg, M=1.99 kg -> mb+M=2.00 kg, h=0.40 m, g=9.8 -> V=sqrt(2*9.8*0.40)=sqrt(7.84)=2.8 m/s -> 0.01*vb=2.00*2.8=5.6 -> vb=560 m/s (c=0).
 *   P6: mA=mB=2 kg, v1=+5, v2=-3, e=0.5 -> v1'+v2'=5-3=2; v2'-v1'=0.5*(5-(-3))=4 -> 2v2'=6 -> v2'=+3 m/s, v1'=-1 m/s (c=1).
 */
