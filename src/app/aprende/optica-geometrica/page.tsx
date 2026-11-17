"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Definicion, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="FIS-15"
      tituloUnidad="Óptica geométrica: reflexión, refracción y lentes"
      escenas={[
        { titulo: "Reflexión y espejos esféricos", componente: EscReflexion },
        { titulo: "Índice de refracción y Ley de Snell", componente: EscRefraccion },
        { titulo: "Lentes delgadas y el ojo humano", componente: EscLentes },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscReflexion() {
  return (
    <EscenaRica>
      <Titulo>Reflexión de la luz y espejos esféricos</Titulo>

      <Hook>
        Cuando la luz choca contra una superficie pulida rebota sin cambiar de
        medio: su rapidez, frecuencia y longitud de onda permanecen iguales,
        pero su dirección cambia siguiendo leyes exactas.
      </Hook>

      <Definicion termino="Leyes de la reflexión y espejos">
        El rayo incidente, el reflejado y la normal están en el mismo plano, y
        el ángulo de incidencia es igual al de reflexión ($\theta_i = \theta_r$).
        Un <strong>espejo plano</strong> da una imagen virtual, derecha y del
        mismo tamaño. Un <strong>espejo esférico</strong> tiene distancia focal{" "}
        $f = \dfrac{"{R}"}{"{2}"}$.
      </Definicion>

      <Pizarra alto={286}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Espejos esféricos: f = R / 2
          </text>

          <rect x={14} y={40} width={332} height={124} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={64} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Espejo cóncavo (convergente, f &gt; 0)
          </text>
          <text x={28} y={88} fill={LIENZO.fg} fontSize={13}>
            • Rayos paralelos convergen en el foco real.
          </text>
          <text x={28} y={110} fill={LIENZO.fg} fontSize={13}>
            • Si el objeto está lejos del foco, forma imagen
          </text>
          <text x={38} y={128} fill={LIENZO.fg} fontSize={13}>
            real e invertida.
          </text>
          <text x={28} y={150} fill={LIENZO.fgDim} fontSize={13}>
            • Si está entre foco y espejo: virtual y aumentada.
          </text>

          <rect x={14} y={178} width={332} height={134} rx={8} fill="var(--dib-cyan-500)" opacity={0.1} stroke="var(--dib-cyan-500)" strokeWidth={1.4} />
          <text x={28} y={202} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            Espejo convexo (divergente, f &lt; 0)
          </text>
          <text x={28} y={226} fill={LIENZO.fg} fontSize={13}>
            • Siempre forma imagen virtual, derecha y menor.
          </text>
          <text x={28} y={254} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Ecuación de espejos y lentes:
          </text>
          <text x={180} y={282} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            1 / f = 1 / d₀ + 1 / dᵢ
          </text>
        </svg>
      </Pizarra>
    </EscenaRica>
  );
}

function EscRefraccion() {
  return (
    <EscenaRica>
      <Titulo>Índice de refracción y Ley de Snell</Titulo>

      <Definicion termino="Índice de refracción absoluto ($n$)">
        Es el cociente entre la rapidez de la luz en el vacío{" "}
        ({"$c \\approx 3{,}00 \\times 10^8\\ \\text{m/s}$"}) y la rapidez en el
        medio ($v$):
        <br />
        $n = \dfrac{"{c}"}{"{v}"}$ (como $v \le c$, siempre $n \ge 1$).
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Refracción: n₁ · sen(θ₁) = n₂ · sen(θ₂)
          </text>

          {/* Interfaz y normal */}
          <rect x={24} y={136} width={312} height={82} fill="var(--dib-cyan-500)" opacity={0.12} />
          <line x1={24} y1={136} x2={336} y2={136} stroke="var(--dib-cyan-500)" strokeWidth={2} />
          <line x1={180} y1={44} x2={180} y2={214} stroke={LIENZO.fgFaint} strokeDasharray="4,4" strokeWidth={1.5} />
          <text x={188} y={58} fill={LIENZO.fgDim} fontSize={13}>Normal</text>

          {/* Rayo incidente */}
          <line x1={88} y1={52} x2={180} y2={136} stroke={LIENZO.warn} strokeWidth={2.5} />
          <text x={66} y={96} fill={LIENZO.warn} fontSize={13} fontWeight={700}>θ₁ (n₁)</text>

          {/* Rayo refractado */}
          <line x1={180} y1={136} x2={232} y2={212} stroke={LIENZO.ok} strokeWidth={2.5} />
          <text x={224} y={182} fill={LIENZO.ok} fontSize={13} fontWeight={700}>θ₂ (n₂)</text>

          <text x={36} y={124} fill={LIENZO.fg} fontSize={13}>Medio 1 (ej. aire, n₁ ≈ 1)</text>
          <text x={36} y={208} fill={LIENZO.fg} fontSize={13}>Medio 2 (ej. vidrio, n₂ = 1,5)</text>

          <rect x={14} y={234} width={332} height={102} rx={8} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={28} y={258} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Regla cualitativa de Snell:
          </text>
          <text x={28} y={282} fill={LIENZO.fg} fontSize={13}>
            • Si pasa a mayor n (n₂ &gt; n₁): la luz frena y el
          </text>
          <text x={38} y={300} fill={LIENZO.fg} fontSize={13}>
            rayo se ACERCA a la normal (θ₂ &lt; θ₁).
          </text>
          <text x={28} y={322} fill={LIENZO.fgDim} fontSize={13}>
            • Si pasa a menor n (n₂ &lt; n₁): se ALEJA (θ₂ &gt; θ₁).
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Los ángulos $\theta_1$ y $\theta_2$ en la Ley de Snell se miden siempre{" "}
        <strong>respecto a la normal</strong> (perpendicular a la superficie),
        nunca respecto a la superficie misma.
      </Cuidado>
    </EscenaRica>
  );
}

function EscLentes() {
  return (
    <EscenaRica>
      <Titulo>Lentes delgadas y el ojo humano</Titulo>

      <Definicion termino="Tipos de lentes delgadas">
        Las <strong>lentes convergentes</strong> (convexas, más gruesas en el
        centro) hacen converger los rayos paralelos en un foco real ($f &gt; 0$).
        Las <strong>lentes divergentes</strong> (cóncavas, más delgadas en el
        centro) separan los rayos ($f &lt; 0$, foco virtual).
      </Definicion>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ecuación de lentes delgadas
          </text>

          <rect x={14} y={40} width={332} height={96} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={180} y={70} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            1 / f = 1 / d₀ + 1 / dᵢ     ⇒     dᵢ = (d₀ · f) / (d₀ − f)
          </text>
          <text x={28} y={98} fill={LIENZO.fg} fontSize={13}>
            • f &gt; 0 lente convergente | f &lt; 0 lente divergente
          </text>
          <text x={28} y={120} fill={LIENZO.fg} fontSize={13}>
            • dᵢ &gt; 0 imagen real      | dᵢ &lt; 0 imagen virtual
          </text>

          <rect x={14} y={152} width={332} height={170} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={28} y={176} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Aplicación médica: refracción en el ojo
          </text>
          <text x={28} y={202} fill={LIENZO.fg} fontSize={13}>
            • Córnea (n ≈ 1,38) y cristalino actúan como un
          </text>
          <text x={38} y={220} fill={LIENZO.fg} fontSize={13}>
            sistema convergente hacia la retina.
          </text>
          <text x={28} y={246} fill={LIENZO.fg} fontSize={13}>
            • Miopía (imagen antes de retina): lente divergente.
          </text>
          <text x={28} y={270} fill={LIENZO.fg} fontSize={13}>
            • Hipermetropía (detrás): lente convergente.
          </text>
          <text x={28} y={298} fill={LIENZO.fgDim} fontSize={13}>
            Aumento lateral: m = −dᵢ / d₀
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Fórmula rápida para despejar la imagen sin sumar fracciones:{" "}
        $d_i = \dfrac{"{d_o \\cdot f}"}{"{d_o - f}"}$. ¡Ahorra tiempo y errores de
        denominador!
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Rapidez de la luz en la córnea (F3.2 PSA)">
        <p className="mb-2">
          ¿Cuál es la rapidez de la luz dentro de la córnea humana si su índice
          de refracción es $n = 1,38$? ($c = 3,00 \times 10^8\ \text{"{m/s}"}$).
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Despejamos $v$ de $n = c/v$:{" "}
          $v = \dfrac{"{3,00 \\times 10^8}"}{"{1,38}"} \approx \mathbf{"{2,17 \\times 10^8\\ m/s}"}$.
          <br />
          <strong>Comprobación:</strong> $2,174 \times 1,38 \approx 3,00$.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Lente delgada convergente (F3.3 PSA)">
        <p className="mb-2">
          Un objeto se coloca a $d_o = 30\ \text{"{cm}"}$ de una lente
          convergente de distancia focal $f = 10\ \text{"{cm}"}$. ¿A qué
          distancia se forma la imagen?
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> $\dfrac{"{1}"}{"{10}"} = \dfrac{"{1}"}{"{30}"} + \dfrac{"{1}"}{"{d_i}"} \Rightarrow \dfrac{"{1}"}{"{d_i}"} = \dfrac{"{3 - 1}"}{"{30}"} = \dfrac{"{2}"}{"{30}"} = \dfrac{"{1}"}{"{15}"}$.
          <br />
          <strong>Paso 2:</strong> $d_i = \mathbf{"{15\\ cm}"}$ (imagen real).
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Al reflejarse, la luz cambia de velocidad'">
        <strong>Realidad:</strong> en la reflexión el rayo sigue en el{" "}
        <strong>mismo medio</strong>, así que su rapidez, frecuencia y longitud
        de onda no cambian. Solo cambia su velocidad al <strong>refractarse</strong>{" "}
        a otro medio.
      </Misconception>

      <Misconception titulo="Error 2 · 'Un índice de refracción puede ser menor que 1'">
        <strong>Realidad:</strong> nada viaja más rápido que la luz en el vacío
        ($v \le c$), por lo que $n = c/v \ge 1$ siempre.
      </Misconception>

      <Misconception titulo="Error 3 · 'En un espejo esférico f = 2R'">
        <strong>Realidad:</strong> el foco está a la <strong>mitad</strong> del
        radio de curvatura: $f = R / 2$.
      </Misconception>

      <Conexion>
        En medicina diagnóstica, el índice de refracción permite medir la
        concentración de proteínas plasmáticas o la densidad urinaria mediante
        refractómetros clínicos.
      </Conexion>

      <Resumen>
        Reflexión: $\theta_i = \theta_r$. Espejos: $f = R/2$. Refracción:{" "}
        $n = c/v \ge 1$ y Snell {"$n_1 \\operatorname{sen}\\theta_1 = n_2 \\operatorname{sen}\\theta_2$"}.
        Lentes y espejos: $\frac{"{1}"}{"{f}"} = \frac{"{1}"}{"{d_o}"} + \frac{"{1}"}{"{d_i}"}$.
      </Resumen>

      <AutoCheck
        pregunta="Un rayo de luz incide desde el aire (n₁ = 1) sobre un vidrio (n₂ = 1,5) formando 30° con la normal. ¿Cuál es el seno del ángulo de refracción?"
        opciones={["1/2", "1/3", "3/4", "2/3"]}
        correctaIdx={1}
        explicacion="Por Snell: 1 · sen 30° = 1,5 · sen θ₂ → 0,5 = 1,5 · sen θ₂ → sen θ₂ = 0,5 / 1,5 = 1/3."
      />

      <AutoCheck
        pregunta="Un espejo esférico cóncavo tiene radio de curvatura R = 40 cm. ¿Cuál es su distancia focal?"
        opciones={["10 cm", "40 cm", "80 cm", "20 cm"]}
        correctaIdx={3}
        explicacion="En espejos esféricos f = R / 2 = 40 / 2 = 20 cm."
      />

      <AutoCheck
        pregunta="Cuando un rayo de luz pasa del aire (n = 1) al agua (n = 1,33), ¿qué ocurre con el rayo refractado?"
        opciones={[
          "Se acerca a la normal porque su rapidez disminuye",
          "Se aleja de la normal porque su rapidez aumenta",
          "No se desvía en ningún ángulo",
          "Aumenta su rapidez por encima de c",
        ]}
        correctaIdx={0}
        explicacion="Al entrar a un medio de mayor índice n, la luz disminuye su rapidez (v = c/n) y el rayo se acerca a la normal."
      />

      <AutoCheck
        pregunta="Un objeto está a 20 cm de una lente convergente de distancia focal f = 10 cm. ¿A qué distancia se forma la imagen?"
        opciones={["10 cm", "30 cm", "20 cm", "6,7 cm"]}
        correctaIdx={2}
        explicacion="dᵢ = (d₀ · f) / (d₀ − f) = (20 × 10) / (20 − 10) = 200 / 10 = 20 cm."
      />
    </EscenaRica>
  );
}
