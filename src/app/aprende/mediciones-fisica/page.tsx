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
      unidad="FIS-12"
      tituloUnidad="Mediciones, cifras significativas y errores"
      escenas={[
        { titulo: "Cifras significativas y redondeo", componente: EscCifras },
        { titulo: "Notación científica y prefijos SI", componente: EscNotacion },
        { titulo: "Conversión de unidades (factor)", componente: EscUnidades },
        { titulo: "Precisión, exactitud y tipos de error", componente: EscErrores },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplo },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscCifras() {
  return (
    <EscenaRica>
      <Titulo>Cifras significativas y redondeo</Titulo>

      <Hook>
        Un termómetro digital clínico muestra 37,5 °C (3 cifras significativas):
        las dos primeras son exactas y la última lleva la incertidumbre del
        instrumento. Saber contarlas y redondear bien evita perder puntos en
        cálculos sencillos.
      </Hook>

      <Definicion termino="Cifras significativas (c.s.)">
        Son los dígitos conocidos con seguridad en una medida más la última
        cifra estimada. Los <strong>ceros a la izquierda NO cuentan</strong>;
        los ceros intermedios y los ceros finales <strong>después de la coma</strong>{" "}
        SÍ cuentan.
      </Definicion>

      <Pizarra alto={312}>
        <svg width="100%" height="100%" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Cuántas cifras significativas tiene?
          </text>
          {[
            { num: "25,36 m", cs: "4 c.s.", reg: "Todos distintos de cero", c: LIENZO.ok },
            { num: "2005,20", cs: "6 c.s.", reg: "Cero intermedio y final tras coma", c: "var(--dib-cyan-500)" },
            { num: "0,04050", cs: "4 c.s.", reg: "Ceros iniciales (0,0) NO; 4,0,5,0 SÍ", c: LIENZO.accent },
            { num: "450", cs: "2 c.s.", reg: "Sin coma: cero final NO (450. sí = 3)", c: LIENZO.warn },
          ].map((r, i) => (
            <g key={i} transform={`translate(12, ${40 + i * 76})`}>
              <rect x={0} y={0} width={336} height={64} rx={8} fill={r.c} opacity={0.1} stroke={r.c} strokeWidth={1.4} />
              <text x={14} y={24} fill={r.c} fontSize={14} fontWeight={700}>{r.num}</text>
              <text x={322} y={24} textAnchor="end" fill={r.c} fontSize={13} fontWeight={700}>{r.cs}</text>
              <text x={14} y={48} fill={LIENZO.fg} fontSize={13}>{r.reg}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>Regla en operaciones:</strong> al <strong>sumar o restar</strong>,
        el resultado conserva el menor número de <strong>decimales</strong>{" "}
        (ej.: 12,07 + 3,2 = 15,3). Al <strong>multiplicar o dividir</strong>,
        conserva el menor número de <strong>cifras significativas</strong> (ej.:
        12,07 × 3,2 = 39, con 2 c.s.).
      </Cuidado>
    </EscenaRica>
  );
}

function EscNotacion() {
  return (
    <EscenaRica>
      <Titulo>Notación científica y prefijos SI</Titulo>

      <Definicion termino="Notación científica">
        Expresa un número como $a \times 10^n$, donde $1 \le a &lt; 10$ (una
        sola cifra entera distinta de cero) y $n$ es un entero. Si recorres la
        coma a la <strong>izquierda</strong>, $n$ es positivo; si la recorres a
        la <strong>derecha</strong>, $n$ es negativo.
      </Definicion>

      <Pizarra alto={312}>
        <svg width="100%" height="100%" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Prefijos numéricos del Sistema Internacional
          </text>
          {[
            { p: "Giga (G)", f: "10⁹", ej: "1 000 000 000", c: LIENZO.bad },
            { p: "Mega (M)", f: "10⁶", ej: "1 000 000", c: LIENZO.warn },
            { p: "kilo (k)", f: "10³", ej: "1 000", c: "var(--dib-amber-500)" },
            { p: "centi (c)", f: "10⁻²", ej: "0,01", c: "var(--dib-cyan-500)" },
            { p: "mili (m)", f: "10⁻³", ej: "0,001", c: LIENZO.ok },
            { p: "micro (μ)", f: "10⁻⁶", ej: "0,000 001", c: LIENZO.accent },
            { p: "nano (n)", f: "10⁻⁹", ej: "0,000 000 001", c: "var(--dib-violet-400)" },
          ].map((x, i) => (
            <g key={i} transform={`translate(12, ${38 + i * 44})`}>
              <rect x={0} y={0} width={336} height={36} rx={6} fill={x.c} opacity={0.1} stroke={x.c} strokeWidth={1.1} />
              <text x={14} y={23} fill={x.c} fontSize={13} fontWeight={700}>{x.p}</text>
              <text x={140} y={23} fill={LIENZO.fg} fontSize={13} fontWeight={700}>{x.f}</text>
              <text x={322} y={23} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>{x.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Recuerda los saltos de 3 en 3: <strong>kilo (10³), Mega (10⁶), Giga (10⁹)</strong>{" "}
        hacia arriba; <strong>mili (10⁻³), micro (10⁻⁶), nano (10⁻⁹)</strong>{" "}
        hacia abajo.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscUnidades() {
  return (
    <EscenaRica>
      <Titulo>Reglas del SI y factor de conversión</Titulo>

      <Definicion termino="Escritura correcta de unidades (SI)">
        1. Los símbolos <strong>no se pluralizan</strong> (kg, no kgs; m, no
        mts). 2. Van en <strong>minúscula</strong>, salvo si derivan de nombre
        propio (N de Newton, Pa de Pascal). 3. <strong>Sin punto final</strong>,
        salvo cierre de oración.
      </Definicion>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Método del factor de conversión
          </text>
          <text x={180} y={44} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Ejemplo: convertir 13 km/h a m/s
          </text>

          <rect x={14} y={60} width={332} height={74} rx={8} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.3} />
          <text x={26} y={84} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            1. Escribe cada equivalencia como fracción = 1:
          </text>
          <text x={26} y={108} fill={LIENZO.accent} fontSize={13}>
            1000 m / 1 km   y   1 h / 3600 s
          </text>

          <rect x={14} y={148} width={332} height={86} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.3} />
          <text x={26} y={172} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            2. Acomoda arriba y abajo para tachar:
          </text>
          <text x={26} y={196} fill={LIENZO.fg} fontSize={13}>
            13 (km/h) × (1000 m / 1 km) × (1 h / 3600 s)
          </text>
          <text x={26} y={218} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            = 13 000 / 3600 = 3,61 m/s
          </text>

          <rect x={14} y={248} width={332} height={74} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.3} />
          <text x={26} y={272} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Atajo útil de examen:
          </text>
          <text x={26} y={296} fill={LIENZO.fg} fontSize={13}>
            km/h → m/s: divide entre 3,6 | m/s → km/h: × 3,6
          </text>
        </svg>
      </Pizarra>

      <Conexion>
        En problemas de cinemática (MRU/MRUV) y fluidos, casi siempre te dan
        rapideces en km/h o masas en g: convertir primero al SI evita errores de
        orden de magnitud.
      </Conexion>
    </EscenaRica>
  );
}

function EscErrores() {
  return (
    <EscenaRica>
      <Titulo>Precisión, exactitud y tipos de error</Titulo>

      <Definicion termino="Precisión vs exactitud">
        <strong>Precisión</strong> es repetir resultados muy parecidos entre sí
        en las mismas condiciones. <strong>Exactitud</strong> es qué tan cerca
        está la medición del valor verdadero.
      </Definicion>

      <Pizarra alto={329}>
        <svg width="100%" height="100%" viewBox="0 0 360 380" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Clasificación y cálculo de errores
          </text>

          <rect x={12} y={36} width={336} height={100} rx={8} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.4} />
          <text x={24} y={58} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Errores sistemáticos (constantes, corregibles)
          </text>
          <text x={24} y={80} fill={LIENZO.fg} fontSize={13}>
            Se repiten en el mismo sentido: error de cero,
          </text>
          <text x={24} y={98} fill={LIENZO.fg} fontSize={13}>
            calibración, fabricación, envejecimiento y
          </text>
          <text x={24} y={116} fill={LIENZO.fg} fontSize={13}>
            paralaje (mirar la aguja de costado).
          </text>

          <rect x={12} y={148} width={336} height={86} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={24} y={170} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Errores casuales o aleatorios (al azar)
          </text>
          <text x={24} y={192} fill={LIENZO.fg} fontSize={13}>
            Causas difíciles de controlar: cambios bruscos de
          </text>
          <text x={24} y={210} fill={LIENZO.fg} fontSize={13}>
            temperatura, corrientes de aire, reflejos o vista.
          </text>

          <rect x={12} y={246} width={336} height={120} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={24} y={268} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Fórmulas de error (medida x̄ ± Δx)
          </text>
          <text x={24} y={292} fill={LIENZO.fg} fontSize={13}>
            • Error absoluto: Ea = Δx = |valor medido − VMP|
          </text>
          <text x={24} y={314} fill={LIENZO.fg} fontSize={13}>
            • Error relativo: Er = Δx / VMP  (adimensional)
          </text>
          <text x={24} y={336} fill={LIENZO.fg} fontSize={13}>
            • Error porcentual: E% = Er × 100 %
          </text>
          <text x={24} y={356} fill={LIENZO.fgDim} fontSize={13}>
            (Si E% &gt; 10 %, la medida se considera no válida).
          </text>
        </svg>
      </Pizarra>
    </EscenaRica>
  );
}

function EscEjemplo() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Cifras significativas y notación científica">
        <p className="mb-2">
          ¿Cuántas cifras significativas tiene la medición{" "}
          <strong>0,04050 kg</strong> y cómo se escribe en notación científica?
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Los ceros a la izquierda (0,0) no cuentan.
          Desde el primer dígito no nulo (4) hasta el final sí cuentan,
          incluido el cero final tras la coma: <strong>4, 0, 5, 0 → 4 c.s.</strong>
          <br />
          <strong>Paso 2:</strong> Corremos la coma 2 lugares a la derecha:{" "}
          <strong>4,050 × 10⁻² kg</strong> (mantiene exactamente las 4 c.s.).
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Error relativo y porcentual">
        <p className="mb-2">
          Una longitud se registra como <strong>20,0 ± 0,5 cm</strong>. Calcula
          su error relativo y su error porcentual.
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> $E_r = \dfrac{"{0,5}"}{"{20,0}"} = 0,025$ (sin
          unidades, porque cm/cm se cancelan).
          <br />
          <strong>Paso 2:</strong> $E_\% = 0,025 \times 100\% = \mathbf{"{2,5\\%}"}$.
          Como $2,5\% \le 10\%$, la medición es válida.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'En 0,04050 todos los ceros son significativos'">
        <strong>Realidad:</strong> los ceros a la izquierda (0,0) solo ubican
        la coma y NO son significativos; el cero entre 4 y 5 y el cero final
        después de la coma SÍ lo son (4 c.s.).
      </Misconception>

      <Misconception titulo="Error 2 · 'Al sumar 12,45 + 3,2 + 0,128 dejo 3 decimales'">
        <strong>Realidad:</strong> en suma y resta manda quien tiene{" "}
        <strong>menos decimales</strong> (3,2 tiene 1 decimal), así que
        15,778 se redondea a <strong>15,8</strong>.
      </Misconception>

      <Misconception titulo="Error 3 · 'El error de paralaje es aleatorio'">
        <strong>Realidad:</strong> mirar oblicuamente una escala produce un
        desvío constante en el mismo sentido: es un error{" "}
        <strong>sistemático</strong> y se corrige mirando de frente.
      </Misconception>

      <Resumen>
        Cifras significativas: ceros a la izquierda NO; intermedios y finales
        tras coma SÍ. Suma/resta → menos decimales; mult./div. → menos c.s.
        Error absoluto $\Delta x$; relativo $E_r = \Delta x / \bar{"{x}"}$;
        porcentual $E_\% = E_r \times 100\%$. Sistemático = constante/corregible;
        casual = al azar.
      </Resumen>

      <AutoCheck
        pregunta="Realiza la suma respetando cifras significativas: 12,45 g + 3,2 g + 0,128 g."
        opciones={["15,778 g", "15,8 g", "15,78 g", "16 g"]}
        correctaIdx={1}
        explicacion="En suma y resta el resultado conserva los decimales del término con menos decimales: 3,2 tiene 1 decimal, así que 15,778 g se redondea a 15,8 g."
      />

      <AutoCheck
        pregunta="¿Cuál de los siguientes es un error CASUAL o aleatorio?"
        opciones={[
          "Error de cero en una balanza",
          "Error de calibración",
          "Error de paralaje al leer una aguja",
          "Corriente de aire sobre una balanza sensible",
        ]}
        correctaIdx={3}
        explicacion="Las corrientes de aire y variaciones bruscas del ambiente ocurren al azar (casuales). Cero, calibración y paralaje son sistemáticos."
      />

      <AutoCheck
        pregunta="Una medición se reporta como 5,0 ± 0,2 kg. ¿Cuál es su error porcentual?"
        opciones={["4 %", "0,04 %", "2,5 %", "10 %"]}
        correctaIdx={0}
        explicacion="Er = 0,2 / 5,0 = 0,04; E% = 0,04 × 100 % = 4 %."
      />

      <AutoCheck
        pregunta="¿Cuál símbolo está escrito correctamente según las reglas del Sistema Internacional?"
        opciones={["10 mts.", "5 kgs", "20 N", "4 Kg"]}
        correctaIdx={2}
        explicacion="Los símbolos del SI no llevan plural ni punto final y solo usan mayúscula si derivan de nombre propio (N de Newton)."
      />
    </EscenaRica>
  );
}
