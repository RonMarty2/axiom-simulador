"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Puente, Definicion, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MAT-26"
      tituloUnidad="Geometría del espacio y cuerpos 3D"
      escenas={[
        { titulo: "Poliedros y cuerpos redondos", componente: EscElementos },
        { titulo: "Prismas y cubo", componente: EscPrismas },
        { titulo: "Pirámide recta", componente: EscPiramide },
        { titulo: "Cuerpos redondos y semejanza 3D", componente: EscRedondos },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscElementos() {
  return (
    <EscenaRica>
      <Titulo>Poliedros y cuerpos redondos</Titulo>

      <Puente>
        En geometría plana trabajaste en dos dimensiones (largo y ancho) con
        figuras como cuadrados, triángulos y círculos. Al agregar una tercera
        dimensión (la altura o profundidad) pasas al{" "}
        <strong>espacio tridimensional</strong>: las cajas, los vasos, los conos
        y las pelotas ya no solo tienen superficie exterior, también encierran
        un volumen interior.
      </Puente>

      <Hook>
        Imagina una caja de medicamentos y un frasco cilíndrico: saber cuánto
        cartón necesitas para armar la caja es un problema de{" "}
        <strong>área</strong>; saber cuántos mililitros de jarabe caben en el
        frasco es un problema de <strong>volumen</strong>.
      </Hook>

      <Definicion termino="Elementos del espacio tridimensional">
        Todo cuerpo 3D se construye a partir de cuatro nociones base:{" "}
        <strong>punto</strong> (una posición exacta, sin dimensiones),{" "}
        <strong>recta</strong> (línea infinita en 1 dimensión),{" "}
        <strong>segmento</strong> (tramo de recta entre dos puntos) y{" "}
        <strong>plano</strong> (superficie plana infinita en 2 dimensiones). Al
        cerrar una región del espacio con planos o superficies curvas se forma
        un <strong>cuerpo geométrico</strong>.
      </Definicion>

      <Definicion termino="Poliedros y cuerpos redondos">
        <strong>Poliedro:</strong> cuerpo cerrado únicamente por polígonos
        planos. Sus elementos son <strong>caras</strong> ($C$, las superficies
        planas), <strong>aristas</strong> ($A$, los segmentos donde se unen dos
        caras) y <strong>vértices</strong> ($V$, los puntos donde se encuentran
        tres o más aristas). En todo poliedro convexo se cumple la{" "}
        <strong>relación de Euler</strong>: $C + V = A + 2$ (por ejemplo, en un
        cubo: $6 + 8 = 12 + 2$).
        <br />
        <strong>Cuerpo redondo (o de revolución):</strong> tiene al menos una
        superficie curva, creada al girar una figura plana alrededor de un eje.
        Sus elementos principales son la <strong>base</strong> (circular, de
        radio $r$), la <strong>altura</strong> ($h$, siempre perpendicular a la
        base) y la <strong>generatriz</strong> ($g$, el segmento que al girar
        traza la pared lateral).
      </Definicion>

      <Pizarra alto={277}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Poliedro vs cuerpo redondo
          </text>

          {/* Tarjeta izquierda: Poliedro (cubo) */}
          <rect x={10} y={36} width={164} height={192} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={92} y={56} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Poliedro (cubo)
          </text>

          {/* Aristas ocultas del cubo */}
          <line x1={36} y1={168} x2={62} y2={148} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={62} y1={148} x2={118} y2={148} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={62} y1={148} x2={62} y2={92} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Cara frontal sombreada */}
          <rect x={36} y={112} width={56} height={56} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.fg} strokeWidth={1.5} />
          {/* Cara superior y lateral derecha */}
          <polygon points="36,112 62,92 118,92 92,112" fill={LIENZO.accent} opacity={0.06} stroke={LIENZO.fg} strokeWidth={1.5} />
          <polygon points="92,112 118,92 118,148 92,168" fill={LIENZO.accent} opacity={0.09} stroke={LIENZO.fg} strokeWidth={1.5} />

          {/* Arista destacada */}
          <line x1={118} y1={92} x2={118} y2={148} stroke={LIENZO.ok} strokeWidth={2.8} />
          {/* Vértice destacado */}
          <circle cx={118} cy={92} r={4} fill={LIENZO.warn} />

          <text x={64} y={144} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Cara
          </text>
          <text x={118} y={80} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Vértice
          </text>
          <text x={124} y={126} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Arista
          </text>
          <text x={92} y={194} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Caras planas
          </text>
          <text x={92} y={214} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            C + V = A + 2
          </text>

          {/* Tarjeta derecha: Cuerpo redondo (cono) */}
          <rect x={186} y={36} width={164} height={192} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={268} y={56} textAnchor="middle" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            Cuerpo redondo
          </text>

          {/* Base elíptica del cono */}
          <path d="M 220 162 A 36 11 0 0 1 292 162" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.3} strokeDasharray="4 3" />
          <path d="M 220 162 A 36 11 0 0 0 292 162" fill="var(--dib-cyan-500)" fillOpacity={0.1} stroke={LIENZO.fg} strokeWidth={1.5} />
          {/* Pared izquierda y generatriz derecha */}
          <line x1={256} y1={76} x2={220} y2={162} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={256} y1={76} x2={292} y2={162} stroke="var(--dib-cyan-500)" strokeWidth={2.5} />
          {/* Altura perpendicular y radio */}
          <line x1={256} y1={76} x2={256} y2={162} stroke={LIENZO.ok} strokeWidth={1.8} strokeDasharray="4 3" />
          <line x1={256} y1={162} x2={292} y2={162} stroke={LIENZO.warn} strokeWidth={2} />
          <path d="M 256 153 L 265 153 L 265 162" fill="none" stroke={LIENZO.ok} strokeWidth={1.3} />

          <text x={246} y={128} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            h
          </text>
          <text x={274} y={156} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            r
          </text>
          <text x={286} y={116} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            g
          </text>
          <text x={268} y={194} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Superficie curva
          </text>
          <text x={268} y={214} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Base r, altura h, g
          </text>

          {/* Banda inferior: Área vs Volumen */}
          <rect x={10} y={240} width={340} height={68} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={24} y={266} fill={LIENZO.fg} fontSize={13}>
            • Área (cm², m²): superficie exterior.
          </text>
          <text x={24} y={292} fill={LIENZO.fg} fontSize={13}>
            • Volumen (cm³, m³): espacio interior.
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Nunca confundas las unidades: toda longitud se expresa en unidades
        simples ({"$\\text{cm}, \\text{m}$"}), toda área en unidades al cuadrado
        ({"$\\text{cm}^2, \\text{m}^2$"}) y todo volumen en unidades al cubo
        ({"$\\text{cm}^3, \\text{m}^3$"}). Mirar las unidades de las opciones en
        el examen te ayuda a detectar qué magnitud te piden.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPrismas() {
  return (
    <EscenaRica>
      <Titulo>Prismas y cubo</Titulo>

      <Puente>
        Imagina una pila de hojas de papel todas del mismo tamaño. Cada hoja
        tiene el área de la base ($A_b$). Si apilas hojas hasta alcanzar una
        altura $h$, el espacio ocupado es simplemente $A_b \cdot h$. Y si
        desdoblas las paredes verticales sobre una mesa, forman un solo
        rectángulo de ancho igual al perímetro de la base ($P_b$) y alto $h$.
      </Puente>

      <Definicion termino="Prisma recto">
        Un <strong>prisma recto</strong> tiene dos bases paralelas e iguales
        (pueden ser triángulos, rectángulos, hexágonos, etc.) y caras laterales
        rectangulares perpendiculares a la base:
        <br />
        • Área lateral: $A_L = P_b \cdot h$ (donde $P_b$ es el perímetro de la
        base y $h$ la altura).
        <br />
        • Área total: $A_T = A_L + 2A_b$ (las paredes más las dos bases).
        <br />
        • Volumen: $V = A_b \cdot h$.
      </Definicion>

      <Definicion termino="Ortoedro (paralelepípedo recto) y cubo">
        En un <strong>ortoedro</strong> (caja rectangular de largo $a$, ancho $b$
        y alto $c$), sus 6 caras vienen en tres pares iguales:
        <br />
        • $A_T = 2(ab + ac + bc)$ y $V = a \cdot b \cdot c$.
        <br />
        • <strong>Diagonal interior ($d$):</strong> primero, en la base
        rectangular, la diagonal de la base cumple $d_b^2 = a^2 + b^2$ por
        Pitágoras. Luego esa diagonal y la altura $c$ forman un triángulo
        rectángulo vertical, así que $d^2 = d_b^2 + c^2 = a^2 + b^2 + c^2$, de
        donde {"$d = \\sqrt{a^2 + b^2 + c^2}$"}.
        <br />
        En un <strong>cubo</strong> todas las aristas son iguales ($a = b = c$):
        <br />
        • $A_L = 4a^2$, $A_T = 6a^2$, $V = a^3$.
        <br />
        • Diagonal interior:{" "}
        {"$d = \\sqrt{a^2 + a^2 + a^2} = \\sqrt{3a^2} = a\\sqrt{3}$"} (en cambio,
        la diagonal de una sola cara mide {"$d_{\\text{cara}} = a\\sqrt{2}$"}).
      </Definicion>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Ortoedro: Pitágoras en 3D para la diagonal d
          </text>

          {/* Aristas ocultas del ortoedro */}
          <line x1={96} y1={176} x2={144} y2={144} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={144} y1={144} x2={254} y2={144} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={144} y1={144} x2={144} y2={54} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Triángulo rectángulo interior (FBL -> BBR -> BTR) */}
          <polygon points="96,176 254,144 254,54" fill={LIENZO.accent} opacity={0.12} />

          {/* Caras visibles */}
          <rect x={96} y={86} width={110} height={90} fill="none" stroke={LIENZO.fg} strokeWidth={1.6} />
          <polygon points="96,86 144,54 254,54 206,86" fill={LIENZO.bgSoft} fillOpacity={0.35} stroke={LIENZO.fg} strokeWidth={1.6} />
          <polygon points="206,86 254,54 254,144 206,176" fill={LIENZO.bgSoft} fillOpacity={0.25} stroke={LIENZO.fg} strokeWidth={1.6} />

          {/* Diagonal de la base d_b y diagonal interior d */}
          <line x1={96} y1={176} x2={254} y2={144} stroke="var(--dib-cyan-500)" strokeWidth={2} strokeDasharray="5 3" />
          <line x1={254} y1={144} x2={254} y2={54} stroke={LIENZO.ok} strokeWidth={2.2} />
          <line x1={96} y1={176} x2={254} y2={54} stroke={LIENZO.accent} strokeWidth={2.6} />

          {/* Marca de ángulo recto en BBR(254,144) */}
          <path d="M 254 132 L 242 134 L 242 146" fill="none" stroke={LIENZO.ok} strokeWidth={1.4} />

          {/* Etiquetas de dimensiones */}
          <text x={151} y={194} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            a (largo)
          </text>
          <text x={242} y={172} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            b
          </text>
          <text x={268} y={104} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            c
          </text>
          <text x={162} y={108} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            d
          </text>
          <text x={186} y={172} textAnchor="middle" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            d_b
          </text>

          {/* Cuadro de fórmulas */}
          <rect x={14} y={208} width={332} height={118} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={28} y={232} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Fórmulas rápidas:
          </text>
          <text x={28} y={258} fill={LIENZO.fg} fontSize={13}>
            • Prisma recto: A_L = P_b · h | V = A_b · h
          </text>
          <text x={28} y={284} fill={LIENZO.fg} fontSize={13}>
            • Ortoedro: d = √(a² + b² + c²)
          </text>
          <text x={28} y={310} fill={LIENZO.fg} fontSize={13}>
            • Cubo: A_T = 6a² | V = a³ | d = a√3
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Para el cubo, cuenta cuántas dimensiones cruzas con la diagonal: en una
        cara (2D) es {"$a\\sqrt{2}$"}; atravesando todo el cubo por dentro (3D)
        es {"$a\\sqrt{3}$"}.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPiramide() {
  return (
    <EscenaRica>
      <Titulo>Pirámide recta</Titulo>

      <Puente>
        Compara una pirámide con un prisma que tenga exactamente la misma base y
        la misma altura. Como las paredes de la pirámide se van estrechando
        hasta un único punto superior (la cúspide), su volumen es mucho menor:
        caben exactamente <strong>tres</strong> pirámides llenas de agua dentro
        del prisma. Por eso en el volumen aparece el factor {"$\\frac{1}{3}$"}.
      </Puente>

      <Definicion termino="Altura (h) vs apotema lateral (a_p)">
        En una <strong>pirámide recta regular</strong>, la base es un polígono
        regular y todas las caras laterales son triángulos isósceles iguales.
        Distingue siempre tres segmentos distintos:
        <br />
        • <strong>Altura ($h$):</strong> baja perpendicular desde la cúspide
        hasta el centro de la base. Se usa para el <strong>volumen</strong>.
        <br />
        • <strong>Apotema lateral ($a_p$):</strong> es la altura de cada cara
        triangular (baja inclinada desde la cúspide al punto medio de un lado de
        la base). Se usa para el <strong>área lateral</strong>.
        <br />
        • <strong>Apotema de la base ($a_b$):</strong> va desde el centro de la
        base hasta el punto medio de un lado (en una base cuadrada de lado $L$,
        mide {"$a_b = \\frac{L}{2}$"}).
        <br />
        Estos tres segmentos forman un triángulo rectángulo interior, unido por
        Pitágoras: {"$a_p^2 = h^2 + a_b^2$"}.
      </Definicion>

      <Definicion termino="Área y volumen de la pirámide recta">
        Cada cara triangular tiene área {"$\\frac{\\text{lado} \\cdot a_p}{2}$"}.
        Al sumar todas las caras laterales, la suma de los lados es el perímetro
        de la base ($P_b$):
        <br />
        • Área lateral: {"$A_L = \\frac{P_b \\cdot a_p}{2}$"}
        <br />
        • Área total: $A_T = A_L + A_b$ (tiene una sola base).
        <br />
        • Volumen: {"$V = \\frac{1}{3} A_b \\cdot h$"}.
      </Definicion>

      <Pizarra alto={286}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Pirámide recta: triángulo interior (h, a_b, a_p)
          </text>

          {/* Base cuadrada en perspectiva: FL(85,192), FR(215,192), BR(265,152), BL(135,152) */}
          {/* Centro O(175,172), cúspide S(175,42), punto medio lado derecho M(240,172) */}
          <polygon points="85,192 215,192 265,152 135,152" fill={LIENZO.bgSoft} fillOpacity={0.5} />

          {/* Aristas ocultas */}
          <line x1={85} y1={192} x2={135} y2={152} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={135} y1={152} x2={265} y2={152} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={175} y1={42} x2={135} y2={152} stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Triángulo rectángulo interior S-O-M */}
          <polygon points="175,42 175,172 240,172" fill={LIENZO.accent} opacity={0.14} />

          {/* Aristas visibles de la pirámide */}
          <line x1={85} y1={192} x2={215} y2={192} stroke={LIENZO.fg} strokeWidth={1.6} />
          <line x1={215} y1={192} x2={265} y2={152} stroke={LIENZO.fg} strokeWidth={1.6} />
          <line x1={175} y1={42} x2={85} y2={192} stroke={LIENZO.fg} strokeWidth={1.6} />
          <line x1={175} y1={42} x2={215} y2={192} stroke={LIENZO.fg} strokeWidth={1.6} />
          <line x1={175} y1={42} x2={265} y2={152} stroke={LIENZO.fg} strokeWidth={1.6} />

          {/* Segmentos clave del triángulo rectángulo */}
          <line x1={175} y1={42} x2={175} y2={172} stroke={LIENZO.ok} strokeWidth={2.2} />
          <line x1={175} y1={172} x2={240} y2={172} stroke={LIENZO.warn} strokeWidth={2.2} />
          <line x1={175} y1={42} x2={240} y2={172} stroke={LIENZO.accent} strokeWidth={2.5} />

          {/* Ángulo recto en O(175,172) */}
          <path d="M 175 161 L 186 161 L 186 172" fill="none" stroke={LIENZO.ok} strokeWidth={1.4} />
          <circle cx={175} cy={172} r={3} fill={LIENZO.ok} />
          <circle cx={240} cy={172} r={3} fill={LIENZO.accent} />

          {/* Etiquetas */}
          <text x={165} y={120} textAnchor="end" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            h
          </text>
          <text x={194} y={186} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            a_b
          </text>
          <line x1={211} y1={114} x2={252} y2={106} stroke={LIENZO.accent} strokeWidth={1.1} strokeDasharray="3 2" />
          <text x={256} y={110} fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            a_p
          </text>
          <text x={150} y={208} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Base cuadrada (lado L)
          </text>

          {/* Cuadro de fórmulas */}
          <rect x={14} y={220} width={332} height={98} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={28} y={246} fill={LIENZO.fg} fontSize={13}>
            • Pitágoras: a_p² = h² + a_b²  (a_p &gt; h)
          </text>
          <text x={28} y={274} fill={LIENZO.fg} fontSize={13}>
            • A_L = (P_b · a_p) / 2  |  A_T = A_L + A_b
          </text>
          <text x={28} y={302} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            • Volumen: V = (1/3) · A_b · h
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Como $a_p$ es la hipotenusa del triángulo rectángulo interior,{" "}
        <strong>la apotema lateral siempre es mayor que la altura</strong>{" "}
        ($a_p &gt; h$). Si el problema te da $h$ y te pide el área lateral,
        primero debes hallar $a_p$ con Pitágoras.
      </Cuidado>
    </EscenaRica>
  );
}

function EscRedondos() {
  return (
    <EscenaRica>
      <Titulo>Cuerpos redondos y semejanza en 3D</Titulo>

      <Puente>
        No tienes que memorizar fórmulas aisladas: el <strong>cilindro</strong>{" "}
        se comporta igual que un prisma de base circular, y el{" "}
        <strong>cono</strong> igual que una pirámide de base circular. Basta con
        sustituir el perímetro de la base por $2\pi r$ y el área de la base por
        $\pi r^2$.
      </Puente>

      <Definicion termino="Cilindro, cono y esfera">
        <strong>Cilindro recto</strong> (radio $r$, altura $h$):
        <br />
        • $A_L = 2\pi r h$ &nbsp;|&nbsp; $A_T = 2\pi r h + 2\pi r^2 = 2\pi r(h + r)$ &nbsp;|&nbsp; $V = \pi r^2 h$.
        <br />
        <strong>Cono recto</strong> (radio $r$, altura $h$, generatriz{" "}
        {"$g = \\sqrt{r^2 + h^2}$"}):
        <br />
        • $A_L = \pi r g$ (sale de {"$\\frac{2\\pi r \\cdot g}{2}$"}, igual que en la pirámide) &nbsp;|&nbsp; $A_T = \pi r g + \pi r^2 = \pi r(g + r)$ &nbsp;|&nbsp; {"$V = \\frac{1}{3}\\pi r^2 h$"}.
        <br />
        <strong>Esfera</strong> (radio $r$):
        <br />
        • $A = 4\pi r^2$ &nbsp;|&nbsp; {"$V = \\frac{4}{3}\\pi r^3$"}.
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Cilindro, cono y esfera
          </text>

          {/* 1. Cilindro (cx=62) */}
          <ellipse cx={62} cy={62} rx={34} ry={10} fill="var(--dib-cyan-500)" fillOpacity={0.14} stroke={LIENZO.fg} strokeWidth={1.5} />
          <path d="M 28 144 A 34 10 0 0 1 96 144" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <path d="M 28 144 A 34 10 0 0 0 96 144" fill="var(--dib-cyan-500)" fillOpacity={0.08} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={28} y1={62} x2={28} y2={144} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={96} y1={62} x2={96} y2={144} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={62} y1={62} x2={96} y2={62} stroke={LIENZO.accent} strokeWidth={2} />
          <line x1={62} y1={62} x2={62} y2={144} stroke={LIENZO.ok} strokeWidth={1.8} strokeDasharray="4 3" />
          <text x={79} y={48} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            r
          </text>
          <text x={52} y={110} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            h
          </text>
          <text x={62} y={176} textAnchor="middle" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            Cilindro
          </text>
          <text x={62} y={196} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            A_L = 2πrh
          </text>
          <text x={62} y={216} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            V = πr²h
          </text>

          {/* 2. Cono (cx=180) */}
          <polygon points="180,50 180,144 216,144" fill={LIENZO.accent} opacity={0.12} />
          <path d="M 144 144 A 36 11 0 0 1 216 144" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <path d="M 144 144 A 36 11 0 0 0 216 144" fill={LIENZO.accent} fillOpacity={0.08} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={180} y1={50} x2={144} y2={144} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={180} y1={50} x2={216} y2={144} stroke={LIENZO.accent} strokeWidth={2.4} />
          <line x1={180} y1={50} x2={180} y2={144} stroke={LIENZO.ok} strokeWidth={1.8} />
          <line x1={180} y1={144} x2={216} y2={144} stroke={LIENZO.warn} strokeWidth={2} />
          <path d="M 180 135 L 189 135 L 189 144" fill="none" stroke={LIENZO.ok} strokeWidth={1.3} />
          <text x={170} y={108} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            h
          </text>
          <text x={198} y={140} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            r
          </text>
          <text x={208} y={96} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            g
          </text>
          <text x={180} y={176} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Cono
          </text>
          <text x={180} y={196} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            A_L = πrg
          </text>
          <text x={180} y={216} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            V = ⅓πr²h
          </text>

          {/* 3. Esfera (cx=298, cy=102, R=40) */}
          <circle cx={298} cy={102} r={40} fill={LIENZO.warn} fillOpacity={0.1} stroke={LIENZO.fg} strokeWidth={1.5} />
          <path d="M 258 102 A 40 12 0 0 1 338 102" fill="none" stroke={LIENZO.fgDim} strokeWidth={1.2} strokeDasharray="4 3" />
          <path d="M 258 102 A 40 12 0 0 0 338 102" fill="none" stroke={LIENZO.fg} strokeWidth={1.4} />
          <circle cx={298} cy={102} r={3} fill={LIENZO.warn} />
          {/* Radio exacto: dx=32, dy=-24 -> sqrt(32² + 24²) = 40 = R */}
          <line x1={298} y1={102} x2={330} y2={78} stroke={LIENZO.warn} strokeWidth={2.2} />
          <text x={306} y={84} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            r
          </text>
          <text x={298} y={176} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Esfera
          </text>
          <text x={298} y={196} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            A = 4πr²
          </text>
          <text x={298} y={216} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            V = (4/3)πr³
          </text>

          {/* Cuadro inferior: Semejanza 3D */}
          <rect x={14} y={234} width={332} height={104} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={258} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Semejanza en 3D (factor de escala k):
          </text>
          <text x={28} y={282} fill={LIENZO.fg} fontSize={13}>
            • Longitudes → × k   |   Áreas → × k²
          </text>
          <text x={28} y={304} fill={LIENZO.fg} fontSize={13}>
            • Volúmenes → × k³
          </text>
          <text x={28} y={326} fill={LIENZO.fgDim} fontSize={13}>
            Ej. si k = 2: área × 4 y volumen × 8.
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Relación de semejanza en 3D">
        Si dos cuerpos son semejantes y todas las longitudes del segundo son $k$
        veces las del primero (arista, radio, altura o diagonal), entonces:
        <br />
        • Sus <strong>áreas</strong> (lateral, total o de base) se multiplican
        por $k^2$, porque un área multiplica dos longitudes.
        <br />
        • Sus <strong>volúmenes</strong> se multiplican por $k^3$, porque un
        volumen multiplica tres longitudes.
      </Definicion>

      <Conexion>
        En biología celular esta relación $k^2$ frente a $k^3$ explica por qué
        las células son microscópicas: si una célula duplica su radio ($k = 2$),
        el volumen interno que consume nutrientes crece 8 veces ($2^3$), pero la
        membrana por donde entran solo crece 4 veces ($2^2$).
      </Conexion>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <Parrafo>
        Sigue cada paso con atención: en el examen casi siempre te dan una
        magnitud (por ejemplo el área o el radio) para que despejes primero una
        longitud y luego calcules lo pedido.
      </Parrafo>

      <WorkedExample titulo="Ejemplo 1 · Cubo: arista, diagonal interior y volumen">
        <p className="mb-2">
          El área total de un cubo es {"$150\\text{ cm}^2$"}. Calcula su arista
          $a$, su diagonal interior $d$ y su volumen $V$.
        </p>
        <p className="text-sm">
          <strong>Paso 1 (hallar la arista):</strong> Como el cubo tiene 6 caras
          cuadradas iguales, $A_T = 6a^2 = 150$. Dividimos entre 6:{" "}
          {"$a^2 = \\frac{150}{6} = 25$"}, entonces{" "}
          {"$a = \\sqrt{25} = 5\\text{ cm}$"} (tomamos el valor positivo porque
          es una longitud).
          <br />
          <strong>Paso 2 (diagonal interior):</strong> Usamos{" "}
          {"$d = a\\sqrt{3}$"}, por lo que{" "}
          {"$d = 5\\sqrt{3}\\text{ cm}$"}.
          <br />
          <strong>Paso 3 (volumen):</strong>{" "}
          {"$V = a^3 = 5^3 = 125\\text{ cm}^3$"}.
          <br />
          <strong>Respuesta:</strong> {"$a = 5\\text{ cm}$"},{" "}
          {"$d = 5\\sqrt{3}\\text{ cm}$"} y {"$V = 125\\text{ cm}^3$"}.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Cono recto con Pitágoras para la generatriz">
        <p className="mb-2">
          Un cono recto tiene radio {"$r = 6\\text{ cm}$"} y altura{" "}
          {"$h = 8\\text{ cm}$"}. Halla su generatriz $g$, su área total $A_T$ y
          su volumen $V$ (deja $\pi$ indicado).
        </p>
        <p className="text-sm">
          <strong>Paso 1 (generatriz por Pitágoras):</strong>{" "}
          {"$g = \\sqrt{r^2 + h^2} = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ cm}$"}.
          <br />
          <strong>Paso 2 (área total):</strong> Sumamos el área lateral y la
          base circular: $A_L = \pi r g = \pi \cdot 6 \cdot 10 = 60\pi$ y{" "}
          $A_b = \pi r^2 = \pi \cdot 6^2 = 36\pi$. Entonces{" "}
          {"$A_T = 60\\pi + 36\\pi = 96\\pi\\text{ cm}^2$"}.
          <br />
          <strong>Paso 3 (volumen):</strong>{" "}
          {"$V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\cdot 36 \\cdot 8 = 12 \\cdot 8\\pi = 96\\pi\\text{ cm}^3$"}.
          <br />
          <strong>Respuesta:</strong> {"$g = 10\\text{ cm}$"},{" "}
          {"$A_T = 96\\pi\\text{ cm}^2$"} y {"$V = 96\\pi\\text{ cm}^3$"}.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 3 · Esfera fundida en un cilindro (conservación de volumen)">
        <p className="mb-2">
          Una esfera metálica de radio {"$r = 3\\text{ cm}$"} se funde por
          completo para moldear un cilindro recto de radio{" "}
          {"$R = 2\\text{ cm}$"}. ¿Cuál será la altura $h$ del cilindro?
        </p>
        <p className="text-sm">
          <strong>Paso 1 (volumen de la esfera):</strong>{" "}
          {"$V_{\\text{esfera}} = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot 3^3 = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi\\text{ cm}^3$"}.
          <br />
          <strong>Paso 2 (igualar al volumen del cilindro):</strong> Como el
          metal no se pierde al fundirse, los volúmenes son iguales:{" "}
          {"$V_{\\text{cilindro}} = \\pi R^2 h = \\pi \\cdot 2^2 \\cdot h = 4\\pi h = 36\\pi$"}.
          <br />
          <strong>Paso 3 (despejar $h$):</strong> Dividimos ambos lados entre
          $4\pi$: {"$h = \\frac{36\\pi}{4\\pi} = 9\\text{ cm}$"}.
          <br />
          <strong>Respuesta:</strong> {"$h = 9\\text{ cm}$"}.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La altura mide lo mismo que la generatriz o la apotema lateral'">
        <strong>Realidad:</strong> la altura $h$ es perpendicular a la base,
        mientras que la generatriz $g$ (cono) y la apotema lateral $a_p$
        (pirámide) bajan inclinadas por la superficie exterior. Por Pitágoras
        siempre se cumple $g &gt; h$ y $a_p &gt; h$. Usa $h$ en el volumen y $g$
        o $a_p$ en el área lateral.
      </Misconception>

      <Misconception titulo="Error 2 · 'El volumen del cono y de la pirámide es base por altura'">
        <strong>Realidad:</strong> $A_b \cdot h$ sirve solo para prismas y
        cilindros (que tienen dos bases iguales). Todo cuerpo que termina en
        punta (pirámide o cono) lleva el factor {"$\\frac{1}{3}$"}:{" "}
        {"$V = \\frac{1}{3} A_b \\cdot h$"}. Olvidarlo triplica el resultado.
      </Misconception>

      <Misconception titulo="Error 3 · 'Si duplicas el radio, el volumen solo se duplica'">
        <strong>Realidad:</strong> si escalas todas las dimensiones por $k = 2$,
        el volumen se multiplica por $k^3 = 2^3 = 8$ (como en una esfera). Y si
        en un cilindro duplicas solo el radio dejando fija la altura $h$, como
        $r$ va al cuadrado en $V = \pi r^2 h$, el volumen se cuadruplica
        ($2^2 = 4$).
      </Misconception>

      <Resumen>
        Prisma: $A_L = P_b h$, $A_T = A_L + 2A_b$, $V = A_b h$. Cubo: $A_T = 6a^2$,
        $V = a^3$, {"$d = a\\sqrt{3}$"}. Ortoedro:{" "}
        {"$d = \\sqrt{a^2 + b^2 + c^2}$"}. Pirámide:{" "}
        {"$A_L = \\frac{P_b a_p}{2}$"}, {"$V = \\frac{1}{3} A_b h$"}. Cilindro:{" "}
        $A_L = 2\pi r h$, $V = \pi r^2 h$. Cono: {"$g = \\sqrt{r^2 + h^2}$"},
        $A_L = \pi r g$, {"$V = \\frac{1}{3}\\pi r^2 h$"}. Esfera: $A = 4\pi r^2$,
        {"$V = \\frac{4}{3}\\pi r^3$"}. Escala $k$: longitudes $\times k$, áreas
        $\times k^2$, volúmenes $\times k^3$.
      </Resumen>

      <AutoCheck
        pregunta="Un ortoedro tiene dimensiones a = 2 cm, b = 3 cm y c = 6 cm. ¿Cuánto mide su diagonal interior?"
        opciones={["11 cm", "6 cm", "√11 cm", "7 cm"]}
        correctaIdx={3}
        explicacion="Aplicamos d = √(a² + b² + c²) = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7 cm."
      />

      <AutoCheck
        pregunta="Una pirámide recta tiene base cuadrada de lado 6 cm y altura h = 4 cm. ¿Cuál es su área lateral?"
        opciones={["48 cm²", "60 cm²", "96 cm²", "120 cm²"]}
        correctaIdx={1}
        explicacion="La apotema de la base cuadrada es a_b = 6/2 = 3 cm y su perímetro es P_b = 4 · 6 = 24 cm. Por Pitágoras, a_p = √(4² + 3²) = √25 = 5 cm. Entonces A_L = (P_b · a_p) / 2 = (24 · 5) / 2 = 60 cm²."
      />

      <AutoCheck
        pregunta="Un cono recto tiene radio r = 3 cm y altura h = 5 cm. ¿Cuál es su volumen?"
        opciones={["15π cm³", "45π cm³", "30π cm³", "5π cm³"]}
        correctaIdx={0}
        explicacion="El volumen del cono es V = (1/3) · π · r² · h = (1/3) · π · 3² · 5 = (1/3) · π · 9 · 5 = 15π cm³."
      />

      <AutoCheck
        pregunta="Si las aristas de un cubo se triplican (factor de escala k = 3), ¿por cuánto se multiplican su área total y su volumen, respectivamente?"
        opciones={[
          "Por 3 y por 9",
          "Por 6 y por 9",
          "Por 9 y por 27",
          "Por 9 y por 18",
        ]}
        correctaIdx={2}
        explicacion="Por semejanza en 3D, si las longitudes se multiplican por k = 3, las áreas se multiplican por k² = 3² = 9 y los volúmenes por k³ = 3³ = 27."
      />

      <AutoCheck
        pregunta="El área superficial de una esfera es 144π cm². ¿Cuál es su volumen?"
        opciones={["288π cm³", "144π cm³", "216π cm³", "864π cm³"]}
        correctaIdx={0}
        explicacion="De A = 4πr² = 144π despejamos r² = 144 / 4 = 36, así que r = 6 cm. Luego V = (4/3) · π · r³ = (4/3) · π · 6³ = (4/3) · π · 216 = 288π cm³."
      />
    </EscenaRica>
  );
}
