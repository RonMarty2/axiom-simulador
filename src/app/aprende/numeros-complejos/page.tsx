"use client";

import LeccionShell from "../_components/LeccionShell";
import MathText from "../../components/MathText";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo,
  Definicion,
  Puente,
  PorQue,
  Cuidado,
  Resumen,
  EscenaRica,
  AutoCheck,
  Hook,
  Misconception,
  Mnemotecnia,
  Conexion,
  WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MAT-23"
      tituloUnidad="Números imaginarios y complejos"
      escenas={[
        { titulo: "La unidad imaginaria i y el conjunto C", componente: EscUnidadImaginaria },
        { titulo: "Potencias de i y ciclo de cuatro", componente: EscPotenciasI },
        { titulo: "Forma binómica, conjugado y plano de Argand", componente: EscBinomicaArgand },
        { titulo: "Suma, resta y multiplicación", componente: EscOperacionesBasicas },
        { titulo: "División y ejemplos resueltos tipo examen", componente: EscDivisionEjemplos },
        { titulo: "Errores típicos y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscUnidadImaginaria() {
  return (
    <EscenaRica>
      <Titulo>La unidad imaginaria i y el conjunto de los complejos</Titulo>

      <Puente>
        En los números reales (<MathText>{"$\\mathbb{R}$"}</MathText>), todo número
        elevado al cuadrado da positivo o cero:{" "}
        <MathText>{"$3^2 = 9$"}</MathText>,{" "}
        <MathText>{"$(-3)^2 = 9$"}</MathText> y{" "}
        <MathText>{"$0^2 = 0$"}</MathText>. Por eso, al intentar resolver{" "}
        <MathText>{"$x^2 + 1 = 0$"}</MathText>, llegas a{" "}
        <MathText>{"$x^2 = -1$"}</MathText>, una ecuación sin solución dentro de los
        números reales.
      </Puente>

      <Hook>
        En el siglo XVI, al resolver ecuaciones cúbicas, aparecían raíces cuadradas
        de números negativos en pasos intermedios que luego llevaban a respuestas
        reales exactas. En lugar de descartarlas, se definió una nueva unidad para
        operar con ellas conservando las reglas del álgebra.
      </Hook>

      <Definicion termino="Unidad imaginaria y conjunto de los números complejos">
        La <strong>unidad imaginaria</strong>{" "}
        <MathText>{"$i$"}</MathText> se define como el número cuyo cuadrado vale{" "}
        <MathText>{"$-1$"}</MathText>:
        <br />
        <MathText>{"$i = \\sqrt{-1} \\quad \\text{y por lo tanto} \\quad i^2 = -1$"}</MathText>
        <ul style={{ margin: "8px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Raíz de un real negativo:</strong> si{" "}
            <MathText>{"$k > 0$"}</MathText>, puedes separar el signo menos así:{" "}
            <MathText>{"$\\sqrt{-k} = \\sqrt{k}\\cdot\\sqrt{-1} = \\sqrt{k}\\,i$"}</MathText>.
            Por ejemplo,{" "}
            <MathText>{"$\\sqrt{-9} = 3i$"}</MathText> y{" "}
            <MathText>{"$\\sqrt{-5} = \\sqrt{5}\\,i$"}</MathText>.
          </li>
          <li>
            <strong>Números complejos (<MathText>{"$\\mathbb{C}$"}</MathText>):</strong>{" "}
            son todos los números de la forma{" "}
            <MathText>{"$z = a + bi$"}</MathText>, donde{" "}
            <MathText>{"$a$"}</MathText> y <MathText>{"$b$"}</MathText> son números
            reales. Si <MathText>{"$b = 0$"}</MathText>, recuperas un número real
            (por ejemplo, <MathText>{"$5 = 5 + 0i$"}</MathText>); si{" "}
            <MathText>{"$a = 0$"}</MathText> y <MathText>{"$b \\neq 0$"}</MathText>,
            obtienes un imaginario puro (como <MathText>{"$3i$"}</MathText>). Así se
            cumple{" "}
            <MathText>{"$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$"}</MathText>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            De los reales (R) a los complejos (C)
          </text>

          <rect x={14} y={36} width={332} height={148} rx={10} fill={LIENZO.accent} opacity={0.09} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={180} y={58} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Números complejos C: forma a + bi
          </text>

          <rect x={26} y={70} width={148} height={100} rx={8} fill={LIENZO.ok} opacity={0.12} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={100} y={92} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Reales (b = 0)
          </text>
          <text x={100} y={118} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            5, −3, 1/2, √2
          </text>
          <text x={100} y={144} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Siempre x² ≥ 0
          </text>

          <rect x={186} y={70} width={148} height={100} rx={8} fill="var(--dib-cyan-500)" opacity={0.12} stroke="var(--dib-cyan-500)" strokeWidth={1.4} />
          <text x={260} y={92} textAnchor="middle" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            No reales (b ≠ 0)
          </text>
          <text x={260} y={118} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            3i, −i, 2 + 4i
          </text>
          <text x={260} y={144} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Usan i² = −1
          </text>

          <rect x={14} y={198} width={332} height={128} rx={10} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={28} y={222} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Raíz cuadrada de un negativo (k &gt; 0):
          </text>
          <text x={180} y={248} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            √(−k) = √k · i
          </text>
          <text x={28} y={276} fill={LIENZO.fg} fontSize={13}>
            • √(−9) = 3i     • √(−16) = 4i
          </text>
          <text x={28} y={304} fill={LIENZO.fg} fontSize={13}>
            • x² + 1 = 0  ⇒  x = +i  o  x = −i
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        La propiedad <MathText>{"$\\sqrt{a}\\cdot\\sqrt{b} = \\sqrt{a\\cdot b}$"}</MathText>{" "}
        solo se cumple cuando al menos uno de los factores es mayor o igual que cero.
        Si ambos son negativos, extrae primero <MathText>{"$i$"}</MathText>:{" "}
        <MathText>{"$\\sqrt{-4}\\cdot\\sqrt{-9} = (2i)(3i) = 6i^2 = 6(-1) = -6$"}</MathText>,
        y <strong>no</strong>{" "}
        <MathText>{"$\\sqrt{(-4)(-9)} = \\sqrt{36} = +6$"}</MathText>.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPotenciasI() {
  return (
    <EscenaRica>
      <Titulo>Potencias de i: el ciclo de cuatro</Titulo>

      <Puente>
        Ya sabes que cualquier base distinta de cero elevada a{" "}
        <MathText>{"$0$"}</MathText> vale <MathText>{"$1$"}</MathText>, y que
        multiplicar potencias de igual base suma sus exponentes:{" "}
        <MathText>{"$a^{m+n} = a^m \\cdot a^n$"}</MathText>. Con eso y la regla{" "}
        <MathText>{"$i^2 = -1$"}</MathText> puedes calcular cualquier potencia de{" "}
        <MathText>{"$i$"}</MathText>.
      </Puente>

      <Definicion termino="Las cuatro potencias básicas">
        Observa qué ocurre al multiplicar repetidamente por{" "}
        <MathText>{"$i$"}</MathText>:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <MathText>{"$i^0 = 1$"}</MathText> (todo número distinto de cero elevado a{" "}
            <MathText>{"$0$"}</MathText> es <MathText>{"$1$"}</MathText>).
          </li>
          <li>
            <MathText>{"$i^1 = i$"}</MathText>.
          </li>
          <li>
            <MathText>{"$i^2 = -1$"}</MathText> (por definición de{" "}
            <MathText>{"$i$"}</MathText>).
          </li>
          <li>
            <MathText>{"$i^3 = i^2 \\cdot i = (-1)\\cdot i = -i$"}</MathText>.
          </li>
          <li>
            <MathText>{"$i^4 = i^2 \\cdot i^2 = (-1)(-1) = 1$"}</MathText> (el ciclo
            vuelve a empezar).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={308}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="flechaCicloI" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
          </defs>

          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ciclo de potencias de i (período 4)
          </text>

          <circle cx={180} cy={124} r={66} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1.4} strokeDasharray="4,4" />

          <path d="M 239.8 96.1 A 66 66 0 0 0 207.9 64.2" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#flechaCicloI)" />
          <path d="M 152.1 64.2 A 66 66 0 0 0 120.2 96.1" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#flechaCicloI)" />
          <path d="M 120.2 151.9 A 66 66 0 0 0 152.1 183.8" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#flechaCicloI)" />
          <path d="M 207.9 183.8 A 66 66 0 0 0 239.8 151.9" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#flechaCicloI)" />

          <text x={180} y={120} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            × i
          </text>
          <text x={180} y={138} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            giro 90°
          </text>

          {/* r = 0 -> 1 (derecha) */}
          <circle cx={246} cy={124} r={21} fill={LIENZO.ok} opacity={0.14} stroke={LIENZO.ok} strokeWidth={1.8} />
          <text x={246} y={129} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>1</text>
          <text x={275} y={129} textAnchor="start" fill={LIENZO.ok} fontSize={13} fontWeight={700}>r = 0</text>

          {/* r = 1 -> i (arriba) */}
          <circle cx={180} cy={58} r={21} fill="var(--dib-cyan-500)" opacity={0.14} stroke="var(--dib-cyan-500)" strokeWidth={1.8} />
          <text x={180} y={63} textAnchor="middle" fill="var(--dib-cyan-500)" fontSize={14} fontWeight={700}>i</text>
          <text x={210} y={56} textAnchor="start" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>r = 1</text>

          {/* r = 2 -> -1 (izquierda) */}
          <circle cx={114} cy={124} r={21} fill={LIENZO.warn} opacity={0.14} stroke={LIENZO.warn} strokeWidth={1.8} />
          <text x={114} y={129} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>−1</text>
          <text x={85} y={129} textAnchor="end" fill={LIENZO.warn} fontSize={13} fontWeight={700}>r = 2</text>

          {/* r = 3 -> -i (abajo) */}
          <circle cx={180} cy={190} r={21} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.8} />
          <text x={180} y={195} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>−i</text>
          <text x={210} y={196} textAnchor="start" fill={LIENZO.accent} fontSize={13} fontWeight={700}>r = 3</text>

          <rect x={14} y={226} width={332} height={110} rx={10} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
          <text x={28} y={250} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Regla del resto (divide n entre 4):
          </text>
          <text x={28} y={274} fill={LIENZO.fg} fontSize={13}>
            Si n = 4q + r, entonces  iⁿ = iʳ
          </text>
          <text x={28} y={298} fill={LIENZO.fg} fontSize={13}>
            • i⁴³: 43 = 4·10 + 3  ⇒  i⁴³ = i³ = −i
          </text>
          <text x={28} y={322} fill={LIENZO.fg} fontSize={13}>
            • i²⁴: 24 = 4·6 + 0   ⇒  i²⁴ = i⁰ = 1
          </text>
        </svg>
      </Pizarra>

      <PorQue>
        Al dividir un exponente entero positivo <MathText>{"$n$"}</MathText> entre{" "}
        <MathText>{"$4$"}</MathText>, obtienes un cociente <MathText>{"$q$"}</MathText>{" "}
        y un resto <MathText>{"$r \\in \\{0, 1, 2, 3\\}$"}</MathText> tales que{" "}
        <MathText>{"$n = 4q + r$"}</MathText>. Entonces:{" "}
        <MathText>{"$i^n = i^{4q + r} = (i^4)^q \\cdot i^r = 1^q \\cdot i^r = i^r$"}</MathText>.
        Como <MathText>{"$1^q = 1$"}</MathText>, solo el resto decide el resultado.
      </PorQue>

      <Mnemotecnia>
        Si el exponente tiene muchas cifras (como{" "}
        <MathText>{"$i^{2027}$"}</MathText>), divide solo las{" "}
        <strong>dos últimas cifras</strong> entre <MathText>{"$4$"}</MathText>, porque{" "}
        <MathText>{"$100$"}</MathText> es múltiplo exacto de{" "}
        <MathText>{"$4$"}</MathText>. En <MathText>{"$2027$"}</MathText>, tomas{" "}
        <MathText>{"$27 = 4(6) + 3$"}</MathText>, así que{" "}
        <MathText>{"$i^{2027} = i^3 = -i$"}</MathText>. Además, la suma de cuatro
        potencias consecutivas siempre da cero:{" "}
        <MathText>{"$i^0 + i^1 + i^2 + i^3 = 1 + i - 1 - i = 0$"}</MathText>.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscBinomicaArgand() {
  return (
    <EscenaRica>
      <Titulo>Forma binómica, conjugado y plano de Argand</Titulo>

      <Puente>
        Un número real cabe en una sola recta numérica porque solo necesita una
        coordenada. Un número complejo combina dos números reales independientes (
        <MathText>{"$a$"}</MathText> y <MathText>{"$b$"}</MathText>), así que se
        representa en un plano con dos ejes perpendiculares, igual que un punto{" "}
        <MathText>{"$(x, y)$"}</MathText> en el plano cartesiano.
      </Puente>

      <Definicion termino="Expresión binómica, conjugado y módulo">
        En <strong>forma binómica</strong>, todo complejo se escribe{" "}
        <MathText>{"$z = a + bi$"}</MathText>:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Parte real:</strong>{" "}
            <MathText>{"$\\operatorname{Re}(z) = a$"}</MathText> (se ubica en el eje
            horizontal).
          </li>
          <li>
            <strong>Parte imaginaria:</strong>{" "}
            <MathText>{"$\\operatorname{Im}(z) = b$"}</MathText> (es el coeficiente
            real <MathText>{"$b$"}</MathText>, sin la letra{" "}
            <MathText>{"$i$"}</MathText>; se ubica en el eje vertical).
          </li>
          <li>
            <strong>Conjugado (<MathText>{"$\\bar{z}$"}</MathText>):</strong>{" "}
            mantiene la parte real y cambia el signo de la parte imaginaria:{" "}
            <MathText>{"$\\bar{z} = a - bi$"}</MathText>. Gráficamente es el reflejo
            de <MathText>{"$z$"}</MathText> respecto al eje real.
          </li>
          <li>
            <strong>Módulo (<MathText>{"$|z|$"}</MathText>):</strong> es la distancia
            desde el origen <MathText>{"$(0, 0)$"}</MathText> hasta el punto{" "}
            <MathText>{"$(a, b)$"}</MathText>. Por el teorema de Pitágoras:{" "}
            <MathText>{"$|z| = \\sqrt{a^2 + b^2}$"}</MathText>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={308}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="flechaArgand" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
          </defs>

          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Plano de Argand: z = 3 + 4i y z̄ = 3 − 4i
          </text>

          {/* Ejes reales e imaginarios: origen (96, 158), escala 25 px/unidad */}
          <line x1={50} y1={158} x2={244} y2={158} stroke={LIENZO.fgDim} strokeWidth={1.6} markerEnd="url(#flechaArgand)" />
          <line x1={96} y1={270} x2={96} y2={42} stroke={LIENZO.fgDim} strokeWidth={1.6} markerEnd="url(#flechaArgand)" />

          <text x={252} y={163} fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>Re</text>
          <text x={106} y={48} fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>Im</text>

          {/* Marcas de ejes */}
          <line x1={171} y1={154} x2={171} y2={162} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <line x1={92} y1={58} x2={100} y2={58} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <line x1={92} y1={258} x2={100} y2={258} stroke={LIENZO.fgDim} strokeWidth={1.4} />

          <text x={86} y={63} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>4i</text>
          <text x={86} y={174} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>0</text>
          <text x={86} y={263} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>−4i</text>
          <text x={180} y={149} fill={LIENZO.fg} fontSize={13} fontWeight={700}>3</text>

          {/* Proyecciones punteadas de z y z̄ */}
          <line x1={96} y1={58} x2={171} y2={58} stroke={LIENZO.fgFaint} strokeWidth={1.2} strokeDasharray="4,3" />
          <line x1={171} y1={58} x2={171} y2={158} stroke={LIENZO.ok} strokeWidth={1.4} strokeDasharray="4,3" />
          <line x1={171} y1={158} x2={171} y2={258} stroke="var(--dib-cyan-500)" strokeWidth={1.2} strokeDasharray="4,3" />
          <line x1={96} y1={258} x2={171} y2={258} stroke={LIENZO.fgFaint} strokeWidth={1.2} strokeDasharray="4,3" />

          {/* Vector z = 3 + 4i */}
          <line x1={96} y1={158} x2={171} y2={58} stroke={LIENZO.accent} strokeWidth={2.6} />
          <circle cx={171} cy={58} r={4.5} fill={LIENZO.accent} />
          <text x={182} y={62} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            z = 3 + 4i
          </text>
          <text x={182} y={84} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            |z| = √(3² + 4²) = 5
          </text>
          <text x={182} y={118} fill={LIENZO.fgDim} fontSize={13}>
            cateto b = 4
          </text>

          {/* Vector conjugado z̄ = 3 - 4i */}
          <line x1={96} y1={158} x2={171} y2={258} stroke="var(--dib-cyan-500)" strokeWidth={2.2} strokeDasharray="5,3" />
          <circle cx={171} cy={258} r={4.5} fill="var(--dib-cyan-500)" />
          <text x={182} y={255} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            z̄ = 3 − 4i
          </text>
          <text x={182} y={275} fill={LIENZO.fgDim} fontSize={13}>
            (reflejo en eje Re)
          </text>

          {/* Barra inferior de propiedad clave */}
          <rect x={14} y={288} width={332} height={54} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={180} y={310} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Propiedad clave:  z · z̄ = a² + b² = |z|²
          </text>
          <text x={180} y={331} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            (3 + 4i)(3 − 4i) = 9 + 16 = 25
          </text>
        </svg>
      </Pizarra>

      <PorQue>
        Al multiplicar un complejo por su conjugado, los términos con{" "}
        <MathText>{"$i$"}</MathText> siempre se anulan:{" "}
        <MathText>{"$(a + bi)(a - bi) = a^2 - abi + abi - b^2 i^2 = a^2 - b^2(-1) = a^2 + b^2 = |z|^2$"}</MathText>.
        El resultado es siempre un número real mayor o igual que cero, y esa
        propiedad hace posible la división de complejos.
      </PorQue>

      <Cuidado>
        En <MathText>{"$z = 3 - 4i$"}</MathText>, la parte imaginaria es{" "}
        <MathText>{"$-4$"}</MathText> (sin la letra <MathText>{"$i$"}</MathText>).
        Al calcular el módulo nunca metas <MathText>{"$i$"}</MathText> dentro de la
        raíz:{" "}
        <MathText>{"$|3 - 4i| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = 5$"}</MathText>.
      </Cuidado>
    </EscenaRica>
  );
}

function EscOperacionesBasicas() {
  return (
    <EscenaRica>
      <Titulo>Suma, resta y multiplicación en forma binómica</Titulo>

      <Puente>
        Operar números complejos en forma binómica sigue exactamente las mismas reglas
        que operar polinomios de primer grado (como{" "}
        <MathText>{"$3 + 2x$"}</MathText>). La única diferencia es que al final
        siempre sustituyes <MathText>{"$i^2$"}</MathText> por{" "}
        <MathText>{"$-1$"}</MathText>.
      </Puente>

      <Definicion termino="Reglas de adición, sustracción y multiplicación">
        Dados dos números complejos{" "}
        <MathText>{"$z_1 = a + bi$"}</MathText> y{" "}
        <MathText>{"$z_2 = c + di$"}</MathText>:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Adición:</strong> agrupa reales con reales e imaginarios con
            imaginarios:{" "}
            <MathText>{"$(a + bi) + (c + di) = (a + c) + (b + d)i$"}</MathText>.
          </li>
          <li>
            <strong>Sustracción:</strong> cambia el signo de ambos términos del
            segundo complejo y agrupa:{" "}
            <MathText>{"$(a + bi) - (c + di) = (a - c) + (b - d)i$"}</MathText>.
          </li>
          <li>
            <strong>Multiplicación:</strong> aplica la propiedad distributiva término
            a término y reemplaza <MathText>{"$i^2 = -1$"}</MathText>:{" "}
            <MathText>{"$(a + bi)(c + di) = ac + adi + bci + bd\\,i^2 = (ac - bd) + (ad + bc)i$"}</MathText>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Operaciones en forma binómica
          </text>

          <rect x={14} y={38} width={332} height={82} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={60} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            1. Suma y resta (término a término)
          </text>
          <text x={28} y={84} fill={LIENZO.fg} fontSize={13}>
            (4 + 3i) + (2 − 5i) = 6 − 2i
          </text>
          <text x={28} y={108} fill={LIENZO.fg} fontSize={13}>
            (4 + 3i) − (2 − 5i) = 2 + 8i
          </text>

          <rect x={14} y={134} width={332} height={192} rx={8} fill={LIENZO.accent} opacity={0.09} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={28} y={158} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            2. Multiplicación distributiva
          </text>
          <text x={28} y={182} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Ejemplo: (3 − 2i)(1 + 4i)
          </text>
          <text x={28} y={208} fill={LIENZO.fgDim} fontSize={13}>
            Paso 1 · Distribuye cada término:
          </text>
          <text x={28} y={230} fill={LIENZO.fg} fontSize={13}>
            = 3·1 + 3·(4i) − 2i·1 − 2i·(4i)
          </text>
          <text x={28} y={254} fill={LIENZO.fg} fontSize={13}>
            = 3 + 12i − 2i − 8i²
          </text>
          <text x={28} y={280} fill={LIENZO.fgDim} fontSize={13}>
            Paso 2 · Cambia i² = −1 y agrupa:
          </text>
          <text x={28} y={306} fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            = 3 + 10i − 8(−1) = 11 + 10i
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        No hace falta memorizar{" "}
        <MathText>{"$(ac - bd) + (ad + bc)i$"}</MathText>: multiplica los dos
        paréntesis como en álgebra común y recuerda que el último producto trae{" "}
        <MathText>{"$i^2 = -1$"}</MathText>, lo cual le invierte el signo y lo suma a
        la parte real.
      </Mnemotecnia>

      <Cuidado>
        En una multiplicación, nunca multipliques solo real con real e imaginario con
        imaginario. En el ejemplo anterior,{" "}
        <MathText>{"$(3 - 2i)(1 + 4i)$"}</MathText> <strong>no</strong> da{" "}
        <MathText>{"$3 - 8i$"}</MathText>: faltan los productos cruzados (
        <MathText>{"$12i$"}</MathText> y <MathText>{"$-2i$"}</MathText>) y el cambio
        de signo de <MathText>{"$-8i^2 = +8$"}</MathText>.
      </Cuidado>
    </EscenaRica>
  );
}

function EscDivisionEjemplos() {
  return (
    <EscenaRica>
      <Titulo>División, operaciones combinadas y cuadráticas</Titulo>

      <Definicion termino="División de complejos (truco del conjugado)">
        Para escribir el cociente{" "}
        <MathText>{"$\\dfrac{a + bi}{c + di}$"}</MathText> (con{" "}
        <MathText>{"$c + di \\neq 0$"}</MathText>) en forma binómica, necesitas
        eliminar la unidad <MathText>{"$i$"}</MathText> del denominador. Multiplica
        numerador y denominador por el <strong>conjugado del denominador</strong> (
        <MathText>{"$c - di$"}</MathText>):
        <br />
        <MathText>{"$\\dfrac{a + bi}{c + di} = \\dfrac{(a + bi)(c - di)}{(c + di)(c - di)} = \\dfrac{(a + bi)(c - di)}{c^2 + d^2}$"}</MathText>
        <br />
        Como multiplicas arriba y abajo por el mismo número (equivale a multiplicar
        por <MathText>{"$1$"}</MathText>), el valor no cambia y el denominador se
        convierte en el real positivo <MathText>{"$c^2 + d^2$"}</MathText>.
      </Definicion>

      <Definicion termino="Ecuaciones cuadráticas con discriminante negativo">
        En <MathText>{"$ax^2 + bx + c = 0$"}</MathText> con coeficientes reales, si
        el discriminante{" "}
        <MathText>{"$\\Delta = b^2 - 4ac$"}</MathText> es negativo (
        <MathText>{"$\\Delta < 0$"}</MathText>), la ecuación no tiene raíces reales,
        pero sí tiene <strong>dos soluciones complejas conjugadas</strong>:
        <br />
        <MathText>{"$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a} = \\dfrac{-b \\pm \\sqrt{|\\Delta|}\\,i}{2a}$"}</MathText>
      </Definicion>

      <WorkedExample titulo="Ejemplo 1 · División de complejos en forma binómica">
        <p className="mb-2">
          Expresa <MathText>{"$\\dfrac{5 + i}{1 - i}$"}</MathText> en forma binómica{" "}
          <MathText>{"$a + bi$"}</MathText>.
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> El conjugado del denominador{" "}
          <MathText>{"$1 - i$"}</MathText> es <MathText>{"$1 + i$"}</MathText>.
          Multiplica numerador y denominador por <MathText>{"$1 + i$"}</MathText>:{" "}
          <MathText>{"$\\dfrac{(5 + i)(1 + i)}{(1 - i)(1 + i)}$"}</MathText>.
          <br />
          <strong>Paso 2:</strong> Desarrolla el numerador:{" "}
          <MathText>{"$(5 + i)(1 + i) = 5 + 5i + i + i^2 = 5 + 6i - 1 = 4 + 6i$"}</MathText>.
          <br />
          <strong>Paso 3:</strong> Calcula el denominador:{" "}
          <MathText>{"$(1 - i)(1 + i) = 1^2 + (-1)^2 = 1 + 1 = 2$"}</MathText>.
          <br />
          <strong>Paso 4:</strong> Divide cada término entre{" "}
          <MathText>{"$2$"}</MathText>:{" "}
          <MathText>{"$\\dfrac{4 + 6i}{2} = 2 + 3i$"}</MathText>.
          <br />
          <strong>Comprobación:</strong>{" "}
          <MathText>{"$(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i$"}</MathText>.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Operación combinada con potencias de i">
        <p className="mb-2">
          Calcula el valor de{" "}
          <MathText>{"$i^{43} + i^{24} - i^{18}$"}</MathText>.
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Halla el resto al dividir cada exponente entre{" "}
          <MathText>{"$4$"}</MathText>:{" "}
          <MathText>{"$43 = 4(10) + 3 \\Rightarrow i^{43} = i^3 = -i$"}</MathText>;{" "}
          <MathText>{"$24 = 4(6) + 0 \\Rightarrow i^{24} = i^0 = 1$"}</MathText>;{" "}
          <MathText>{"$18 = 4(4) + 2 \\Rightarrow i^{18} = i^2 = -1$"}</MathText>.
          <br />
          <strong>Paso 2:</strong> Reemplaza cuidando los signos:{" "}
          <MathText>{"$(-i) + 1 - (-1) = -i + 1 + 1 = 2 - i$"}</MathText>.
          <br />
          <strong>Respuesta:</strong>{" "}
          <strong><MathText>{"$2 - i$"}</MathText></strong>.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 3 · Ecuación cuadrática con discriminante negativo">
        <p className="mb-2">
          Resuelve en <MathText>{"$\\mathbb{C}$"}</MathText> la ecuación{" "}
          <MathText>{"$x^2 - 6x + 13 = 0$"}</MathText>.
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Con <MathText>{"$a = 1$"}</MathText>,{" "}
          <MathText>{"$b = -6$"}</MathText> y <MathText>{"$c = 13$"}</MathText>,
          calcula el discriminante:{" "}
          <MathText>{"$\\Delta = (-6)^2 - 4(1)(13) = 36 - 52 = -16$"}</MathText>.
          <br />
          <strong>Paso 2:</strong> Extrae la unidad imaginaria de la raíz:{" "}
          <MathText>{"$\\sqrt{-16} = \\sqrt{16}\\,i = 4i$"}</MathText>.
          <br />
          <strong>Paso 3:</strong> Sustituye en la fórmula general:{" "}
          <MathText>{"$x = \\dfrac{-(-6) \\pm 4i}{2(1)} = \\dfrac{6 \\pm 4i}{2} = 3 \\pm 2i$"}</MathText>.
          <br />
          <strong>Comprobación:</strong> Suma{" "}
          <MathText>{"$(3 + 2i) + (3 - 2i) = 6 = -b/a$"}</MathText>; producto{" "}
          <MathText>{"$(3 + 2i)(3 - 2i) = 9 + 4 = 13 = c/a$"}</MathText>.
        </p>
      </WorkedExample>

      <Conexion>
        En las ecuaciones de segundo grado con coeficientes reales, cuando la
        parábola no corta al eje horizontal (<MathText>{"$\\Delta < 0$"}</MathText>),
        las dos raíces existen en <MathText>{"$\\mathbb{C}$"}</MathText> y siempre
        forman un par conjugado.
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores típicos y práctica</Titulo>

      <Misconception titulo="Error 1 · '√(−4) · √(−9) = √((−4)(−9)) = √36 = 6'">
        <strong>Realidad:</strong> cuando ambos radicandos son negativos, primero
        debes extraer <MathText>{"$i$"}</MathText>. Así:{" "}
        <MathText>{"$\\sqrt{-4}\\cdot\\sqrt{-9} = (2i)(3i) = 6i^2 = 6(-1) = -6$"}</MathText>.
      </Misconception>

      <Misconception titulo="Error 2 · 'Al dividir, (c + di)(c − di) da c² − d²'">
        <strong>Realidad:</strong> la diferencia de cuadrados produce{" "}
        <MathText>{"$c^2 - (di)^2 = c^2 - d^2 i^2$"}</MathText>. Como{" "}
        <MathText>{"$i^2 = -1$"}</MathText>, el signo cambia a suma:{" "}
        <MathText>{"$c^2 + d^2$"}</MathText>.
      </Misconception>

      <Misconception titulo="Error 3 · 'El conjugado de −2 + 5i es 2 − 5i'">
        <strong>Realidad:</strong> el conjugado solo cambia el signo de la{" "}
        <strong>parte imaginaria</strong>; la parte real no se toca. Si{" "}
        <MathText>{"$z = -2 + 5i$"}</MathText>, entonces{" "}
        <MathText>{"$\\bar{z} = -2 - 5i$"}</MathText> (cambiar ambos signos produce
        el opuesto <MathText>{"$-z$"}</MathText>).
      </Misconception>

      <Resumen>
        <MathText>{"$i = \\sqrt{-1}$"}</MathText> y{" "}
        <MathText>{"$i^2 = -1$"}</MathText>. Potencias: divide{" "}
        <MathText>{"$n$"}</MathText> entre <MathText>{"$4$"}</MathText> y usa el
        resto <MathText>{"$r \\in \\{0, 1, 2, 3\\}$"}</MathText> (
        <MathText>{"$1, i, -1, -i$"}</MathText>). Para{" "}
        <MathText>{"$z = a + bi$"}</MathText>: conjugado{" "}
        <MathText>{"$\\bar{z} = a - bi$"}</MathText>, módulo{" "}
        <MathText>{"$|z| = \\sqrt{a^2 + b^2}$"}</MathText> y{" "}
        <MathText>{"$z\\cdot\\bar{z} = a^2 + b^2$"}</MathText>. Para dividir,
        multiplica arriba y abajo por el conjugado del denominador. Si{" "}
        <MathText>{"$\\Delta < 0$"}</MathText>, la cuadrática tiene dos raíces
        complejas conjugadas.
      </Resumen>

      <AutoCheck
        pregunta="Calcula el valor de i³⁵ − i²⁰ + i¹⁴."
        opciones={["−2 − i", "−i", "2 − i", "−2 + i"]}
        correctaIdx={0}
        explicacion="Divide cada exponente entre 4: 35 = 4(8) + 3 da i³ = −i; 20 = 4(5) + 0 da i⁰ = 1; 14 = 4(3) + 2 da i² = −1. Sustituye: (−i) − 1 + (−1) = −2 − i."
      />

      <AutoCheck
        pregunta="Dado el número complejo z = −5 + 12i, ¿cuáles son su conjugado z̄ y su módulo |z|?"
        opciones={[
          "z̄ = 5 − 12i y |z| = 13",
          "z̄ = −5 − 12i y |z| = 13",
          "z̄ = −5 − 12i y |z| = 17",
          "z̄ = 5 + 12i y |z| = 7",
        ]}
        correctaIdx={1}
        explicacion="El conjugado solo cambia el signo de la parte imaginaria: z̄ = −5 − 12i. El módulo es |z| = √((−5)² + 12²) = √(25 + 144) = √169 = 13."
      />

      <AutoCheck
        pregunta="Si z₁ = 2 + 5i y z₂ = 4 − 3i, ¿cuál es el producto z₁ · z₂?"
        opciones={["8 − 15i", "−7 + 14i", "23 + 14i", "23 − 14i"]}
        correctaIdx={2}
        explicacion="Distribuye cada término: (2 + 5i)(4 − 3i) = 8 − 6i + 20i − 15i². Como i² = −1, reemplaza: 8 + 14i − 15(−1) = 8 + 15 + 14i = 23 + 14i."
      />

      <AutoCheck
        pregunta="Expresa el cociente (8 − i) / (2 + i) en forma binómica a + bi."
        opciones={["3 + 2i", "4 − i", "2 − 3i", "3 − 2i"]}
        correctaIdx={3}
        explicacion="Multiplica numerador y denominador por el conjugado 2 − i. Numerador: (8 − i)(2 − i) = 16 − 8i − 2i + i² = 15 − 10i. Denominador: 2² + 1² = 5. Divide: (15 − 10i) / 5 = 3 − 2i."
      />

      <AutoCheck
        pregunta="¿Cuáles son las soluciones complejas de la ecuación x² + 4x + 13 = 0?"
        opciones={[
          "2 + 3i y 2 − 3i",
          "−2 + 3i y −2 − 3i",
          "−4 + 6i y −4 − 6i",
          "−2 + 6i y −2 − 6i",
        ]}
        correctaIdx={1}
        explicacion="Calcula el discriminante: Δ = 4² − 4(1)(13) = 16 − 52 = −36, luego √(−36) = 6i. Por fórmula general: x = (−4 ± 6i) / 2 = −2 ± 3i."
      />
    </EscenaRica>
  );
}
