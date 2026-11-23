"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Puente, Parrafo, Definicion, PorQue, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MAT-28"
      tituloUnidad="Análisis matemático: límites, derivadas e integrales"
      escenas={[
        { titulo: "Límites e indeterminaciones", componente: EscLimites },
        { titulo: "La derivada y sus reglas básicas", componente: EscDerivadasBasicas },
        { titulo: "Producto, cociente, cadena y extremos", componente: EscReglasExtremos },
        { titulo: "La integral: antiderivada y área", componente: EscIntegrales },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscLimites() {
  return (
    <EscenaRica>
      <Titulo>Límites de funciones e indeterminaciones</Titulo>

      <Hook>
        Imagina que miras un velocímetro en el instante exacto en que cruzas la
        meta, o que observas hacia qué valor se estabiliza la concentración de
        un medicamento en la sangre con el paso de las horas. Para responder a
        eso no basta con evaluar en un punto: necesitas saber a qué valor se{" "}
        <strong>acerca</strong> una función.
      </Hook>

      <Puente>
        Ya sabes evaluar una función en un número: si $f(x) = x + 2$, entonces
        en $x = 2$ vale $f(2) = 4$. Pero, ¿qué ocurre con{" "}
        {"$g(x) = \\dfrac{x^2 - 4}{x - 2}$"} cuando $x = 2$? Al reemplazar
        aparece {"$\\dfrac{0}{0}$"}, así que $g(2)$ no existe. Sin embargo, si
        pruebas valores muy cercanos ($x = 1,99$ da $3,99$; $x = 2,01$ da
        $4,01$), la altura se pega cada vez más a $4$. Ese valor objetivo es el{" "}
        <strong>límite</strong>.
      </Puente>

      <Definicion termino="Límite de una función">
        Escribimos {"$\\lim_{x \\to a} f(x) = L$"} cuando los valores de $f(x)$
        se acercan tanto como queramos al número $L$ al tomar valores de $x$ muy
        próximos a $a$ (por la izquierda y por la derecha),{" "}
        <strong>sin importar si $f(a)$ existe o no</strong>.
      </Definicion>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Hueco en x = 2: g(x) = (x² − 4) / (x − 2)
          </text>

          {/* Ejes */}
          <line x1={46} y1={232} x2={326} y2={232} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <polygon points="326,232 318,228 318,236" fill={LIENZO.fgDim} />
          <line x1={58} y1={244} x2={58} y2={44} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <polygon points="58,44 54,52 62,52" fill={LIENZO.fgDim} />
          <text x={336} y={236} fill={LIENZO.fgDim} fontSize={13} fontStyle="italic">x</text>
          <text x={44} y={48} fill={LIENZO.fgDim} fontSize={13} fontStyle="italic">y</text>

          {/* Guías punteadas al punto (2, 4) -> (188, 112) */}
          <line x1={188} y1={232} x2={188} y2={118} stroke={LIENZO.warn} strokeWidth={1.5} strokeDasharray="4,4" />
          <line x1={58} y1={112} x2={182} y2={112} stroke={LIENZO.ok} strokeWidth={1.5} strokeDasharray="4,4" />

          {/* Marcas numéricas */}
          <text x={46} y={56} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>6</text>
          <text x={46} y={116} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>4</text>
          <text x={46} y={176} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>2</text>
          <text x={123} y={252} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>1</text>
          <text x={188} y={252} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>2</text>
          <text x={253} y={252} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>3</text>

          {/* Flechas de acercamiento a x = 2 */}
          <line x1={144} y1={222} x2={176} y2={222} stroke={LIENZO.warn} strokeWidth={1.8} />
          <polygon points="178,222 171,218 171,226" fill={LIENZO.warn} />
          <line x1={232} y1={222} x2={200} y2={222} stroke={LIENZO.warn} strokeWidth={1.8} />
          <polygon points="198,222 205,218 205,226" fill={LIENZO.warn} />

          {/* Recta y = x + 2 desde (0,2)->(58,172) hasta (3.6,5.6)->(292,64) */}
          <line x1={58} y1={172} x2={292} y2={64} stroke={LIENZO.accent} strokeWidth={2.6} />

          {/* Hueco removible en (2, 4) -> (188, 112) */}
          <circle cx={188} cy={112} r={6} fill={LIENZO.bg} stroke={LIENZO.accent} strokeWidth={2.5} />

          {/* Rótulos sin superposición */}
          <text x={72} y={102} fill={LIENZO.ok} fontSize={13} fontWeight={700}>L = 4</text>
          <text x={202} y={134} fill={LIENZO.accent} fontSize={13} fontWeight={700}>Hueco en (2, 4)</text>
          <text x={202} y={154} fill={LIENZO.fgDim} fontSize={13}>g(2) no existe</text>

          <rect x={14} y={268} width={332} height={42} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.3} />
          <text x={180} y={294} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Cerca de x = 2, g(x) se acerca a L = 4
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Cómo calcular límites: 3 casos">
        <strong>1. Sustitución directa:</strong> siempre reemplaza primero $x = a$.
        Si obtienes un número real bien definido (por ejemplo{" "}
        {"$\\lim_{x \\to 3}(2x + 1) = 7$"}), ya terminaste.
        <br />
        <strong>2. Indeterminación {"$\\dfrac{0}{0}$"}:</strong> aparece un factor
        común que vale cero arriba y abajo. Se levanta de dos maneras:
        <br />
        • <strong>Factorización:</strong> factoriza numerador y denominador y
        cancela el factor $(x - a)$ (es válido porque $x$ se acerca a $a$ sin
        ser igual a $a$, así que $x - a \neq 0$).
        <br />
        • <strong>Racionalización con conjugado:</strong> si hay raíces cuadradas,
        multiplica arriba y abajo por el conjugado (cambiando el signo entre los
        términos) para aplicar $(A - B)(A + B) = A^2 - B^2$. Por ejemplo, en{" "}
        {"$\\lim_{x \\to 4} \\dfrac{\\sqrt{x} - 2}{x - 4}$"}, multiplicas por{" "}
        {"$\\dfrac{\\sqrt{x} + 2}{\\sqrt{x} + 2}$"} y obtienes{" "}
        {"$\\dfrac{x - 4}{(x - 4)(\\sqrt{x} + 2)} = \\dfrac{1}{\\sqrt{x} + 2} \\to \\dfrac{1}{4}$"}.
        <br />
        <strong>3. Indeterminación {"$\\dfrac{\\infty}{\\infty}$"} cuando {"$x \\to \\infty$"}:</strong>{" "}
        divide todos los términos entre la mayor potencia de $x$ del denominador.
        Como cualquier término {"$\\dfrac{k}{x^p}$"} tiende a $0$ cuando{" "}
        {"$x \\to \\infty$"}, basta comparar el grado $n$ del numerador con el
        grado $m$ del denominador:
        <br />
        • Si {"$n < m$"}, el límite es $0$.
        <br />
        • Si $n = m$, el límite es el cociente de los coeficientes principales ({"$\\dfrac{a_n}{b_m}$"}).
        <br />
        • Si {"$n > m$"}, el límite crece sin cota ({"$\\pm\\infty$"}).
      </Definicion>

      <Cuidado>
        No confundas {"$\\dfrac{0}{5} = 0$"} (resultado válido) ni{" "}
        {"$\\dfrac{5}{0}$"} (división por cero, límite infinito o inexistente) con{" "}
        {"$\\dfrac{0}{0}$"} (indeterminación que te obliga a simplificar antes de
        decidir).
      </Cuidado>
    </EscenaRica>
  );
}

function EscDerivadasBasicas() {
  // Parábola exacta f(x) = 0.5 x^2 en x in [0, 3], mapeada a px = 48 + 85*x, py = 236 - 36*y.
  // Bézier cuadrática exacta: P0=(48,236), P1=(175.5,236), P2=(303,74).
  return (
    <EscenaRica>
      <Titulo>La derivada: pendiente tangente y reglas básicas</Titulo>

      <Puente>
        En una recta $y = mx + b$, la pendiente {"$m = \\dfrac{\\Delta y}{\\Delta x}$"}{" "}
        es la misma en todos los puntos. Pero en una curva la inclinación cambia
        en cada punto: ¿cómo medir su pendiente exacta en un solo punto $x_0$?
      </Puente>

      <Definicion termino="Significado geométrico, físico y definición">
        Toma un punto fijo $P(x_0, f(x_0))$ y otro cercano $Q(x_0 + h, f(x_0 + h))$.
        La recta que une $P$ y $Q$ (recta <strong>secante</strong>) tiene pendiente{" "}
        {"$\\dfrac{f(x_0 + h) - f(x_0)}{h}$"}. Cuando acercas $Q$ hacia $P$
        haciendo $h \to 0$, la secante gira hasta rozar la curva en un solo
        punto: esa es la <strong>recta tangente</strong>, y su pendiente es la{" "}
        <strong>derivada</strong> $f'(x_0)$:
        <br />
        {"$f'(x) = \\lim_{h \\to 0} \\dfrac{f(x + h) - f(x)}{h}$"}
        <br />
        En física, si $x(t)$ es la posición en el tiempo $t$, la secante mide la
        velocidad media y la derivada $x'(t)$ mide la{" "}
        <strong>razón de cambio instantánea</strong> (la velocidad en ese
        instante exacto).
      </Definicion>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            De secante a tangente cuando h → 0
          </text>

          {/* Ejes */}
          <line x1={38} y1={236} x2={332} y2={236} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <polygon points="332,236 324,232 324,240" fill={LIENZO.fgDim} />
          <line x1={48} y1={246} x2={48} y2={44} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <polygon points="48,44 44,52 52,52" fill={LIENZO.fgDim} />
          <text x={342} y={240} fill={LIENZO.fgDim} fontSize={13} fontStyle="italic">x</text>
          <text x={34} y={48} fill={LIENZO.fgDim} fontSize={13} fontStyle="italic">y</text>

          {/* Guías verticales desde P(1, 0.5)->(133, 218) y Q(3, 4.5)->(303, 74) */}
          <line x1={133} y1={218} x2={133} y2={236} stroke={LIENZO.ok} strokeWidth={1.4} strokeDasharray="3,3" />
          <line x1={303} y1={74} x2={303} y2={236} stroke={LIENZO.warn} strokeWidth={1.4} strokeDasharray="3,3" />

          {/* Curva exacta y = 0.5 x^2 */}
          <path d="M 48 236 Q 175.5 236 303 74" fill="none" stroke={LIENZO.accent} strokeWidth={2.8} />

          {/* Secante exacta por P(133,218) y Q(303,74): y = 2x - 1.5 */}
          <line x1={111.8} y1={236} x2={315.8} y2={63.2} stroke={LIENZO.warn} strokeWidth={2} strokeDasharray="6,4" />

          {/* Tangente exacta en P(133,218): y = x - 0.5, pendiente m = f'(1) = 1 */}
          <line x1={90.5} y1={236} x2={320} y2={138.8} stroke={LIENZO.ok} strokeWidth={2.5} />

          {/* Puntos P y Q */}
          <circle cx={133} cy={218} r={5} fill={LIENZO.ok} />
          <circle cx={303} cy={74} r={5} fill={LIENZO.warn} />

          {/* Etiquetas claras sin colisión */}
          <text x={118} y={204} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>P</text>
          <text x={294} y={62} textAnchor="end" fill={LIENZO.warn} fontSize={13} fontWeight={700}>Q (x₀+h)</text>
          <text x={196} y={118} textAnchor="end" fill={LIENZO.warn} fontSize={13} fontWeight={700}>Secante</text>
          <text x={256} y={214} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Tangente: m = f'(x₀)
          </text>

          {/* Marcas en eje x */}
          <text x={133} y={254} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>x₀</text>
          <text x={218} y={254} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>← h → 0</text>
          <text x={303} y={254} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>x₀+h</text>

          <rect x={14} y={272} width={332} height={44} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
          <text x={180} y={299} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Cuando h → 0, la secante se vuelve tangente
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Reglas básicas de derivación">
        En la práctica no calculamos el límite cada vez; usamos reglas rápidas
        deducidas de esa definición:
        <br />
        • <strong>Constante:</strong> $(c)' = 0$ (una función constante es una
        recta horizontal, su pendiente es siempre $0$).
        <br />
        • <strong>Potencia:</strong> {"$(x^n)' = n\\,x^{n-1}$"} para cualquier
        exponente real $n$. Sirve también con raíces y fracciones si las
        reescribes como potencia: {"$\\sqrt{x} = x^{1/2}$"} y{" "}
        {"$\\dfrac{1}{x^2} = x^{-2}$"}.
        <br />
        • <strong>Múltiplo constante:</strong> {"$(c \\cdot f(x))' = c \\cdot f'(x)$"}{" "}
        (la constante multiplicando sale igual).
        <br />
        • <strong>Suma y resta:</strong> {"$(f(x) \\pm g(x))' = f'(x) \\pm g'(x)$"}{" "}
        (se deriva término a término).
      </Definicion>

      <Parrafo>
        Con la derivada obtienes al instante la <strong>recta tangente</strong>{" "}
        a la curva en $x_0$: su pendiente es $m = f'(x_0)$ y su ecuación
        punto-pendiente es {"$y - f(x_0) = f'(x_0)(x - x_0)$"}. Por ejemplo, para{" "}
        $f(x) = x^2$ en $x_0 = 2$: $f(2) = 4$, $f'(x) = 2x$, así que{" "}
        $m = f'(2) = 4$ y la tangente es $y - 4 = 4(x - 2)$, es decir,{" "}
        $y = 4x - 4$.
      </Parrafo>

      <Mnemotecnia>
        En la regla de la potencia {"$(x^n)' = n\\,x^{n-1}$"}: el exponente{" "}
        <strong>baja a multiplicar adelante</strong> y arriba{" "}
        <strong>se le resta $1$</strong>. Ejemplo: $(5x^3)' = 5 \cdot 3x^2 = 15x^2$.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscReglasExtremos() {
  // Curva cúbica exacta f(x) = x^3/3 - 2x^2 + 3x + 2 en x in [0, 4].
  // f'(x) = x^2 - 4x + 3 = (x - 1)(x - 3): máximo en x = 1 (y = 10/3), mínimo en x = 3 (y = 2).
  // Mapeo: px(x) = 46 + 68*x, py(y) = 232 - 58*(y - 1.2).
  const puntosCurva: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * 4;
    const y = (x * x * x) / 3 - 2 * x * x + 3 * x + 2;
    const px = 46 + 68 * x;
    const py = 232 - 58 * (y - 1.2);
    puntosCurva.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  const polyCurva = puntosCurva.join(" ");

  return (
    <EscenaRica>
      <Titulo>Producto, cociente, cadena y puntos críticos</Titulo>

      <Puente>
        Las reglas de la escena anterior resuelven cualquier polinomio. Ahora
        veremos qué hacer cuando dos funciones se multiplican, se dividen o una
        está elevada a una potencia, y cómo usar la derivada para encontrar
        máximos y mínimos.
      </Puente>

      <Definicion termino="Producto, cociente y regla de la cadena simple">
        Sean $u = u(x)$ y $v = v(x)$ dos funciones derivables:
        <br />
        • <strong>Producto:</strong> {"$(u \\cdot v)' = u'\\,v + u\\,v'$"} (derivas
        el primero por el segundo sin tocar, más el primero sin tocar por la
        derivada del segundo).
        <br />
        • <strong>Cociente:</strong>{" "}
        {"$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'\\,v - u\\,v'}{v^2}$"} (con
        $v \neq 0$; ojo con el signo <strong>menos</strong> en el numerador).
        <br />
        • <strong>Cadena simple (potencia de una función):</strong>{" "}
        {"$(u^n)' = n\\,u^{n-1} \\cdot u'$"}. Primero derivas la potencia
        manteniendo $u$ intacta y luego multiplicas por la derivada interna $u'$.
      </Definicion>

      <PorQue>
        Comprueba la regla de la cadena con $y = (2x)^2$. Si expandes primero,
        $y = 4x^2$, cuya derivada es $8x$. Con la cadena ($u = 2x$, $u' = 2$):{" "}
        $y' = 2(2x)^1 \cdot 2 = 8x$. Si olvidaras multiplicar por $u' = 2$,
        obtendrías $4x$, que es la mitad de la respuesta real.
      </PorQue>

      <Definicion termino="Puntos críticos: máximos y mínimos">
        Donde una curva suave alcanza una <strong>cima (máximo)</strong> o un{" "}
        <strong>valle (mínimo)</strong>, deja de subir para empezar a bajar (o
        viceversa). En ese punto exacto la recta tangente es horizontal, así que
        su pendiente vale cero:
        <br />
        {"$f'(x) = 0$"}
        <br />
        Las soluciones de $f'(x) = 0$ son los <strong>puntos críticos</strong>.
        Para clasificarlos, mira el signo de $f'(x)$ antes y después: si pasa de
        $+$ a $-$ (sube y luego baja), es un <strong>máximo</strong>; si pasa de
        $-$ a $+$ (baja y luego sube), es un <strong>mínimo</strong>.
      </Definicion>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Puntos críticos: donde f'(x) = 0
          </text>

          {/* Ejes */}
          <line x1={36} y1={232} x2={334} y2={232} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <polygon points="334,232 326,228 326,236" fill={LIENZO.fgDim} />
          <line x1={46} y1={242} x2={46} y2={44} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <polygon points="46,44 42,52 50,52" fill={LIENZO.fgDim} />

          {/* Curva cúbica exacta */}
          <polyline
            points={polyCurva}
            fill="none"
            stroke={LIENZO.accent}
            strokeWidth={2.8}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Tangente horizontal en el máximo (1, 10/3) -> (114, 108.3) */}
          <line x1={72} y1={108.3} x2={156} y2={108.3} stroke={LIENZO.ok} strokeWidth={2.5} />
          <circle cx={114} cy={108.3} r={5} fill={LIENZO.ok} />
          <text x={114} y={90} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Máximo: f'(x) = 0
          </text>

          {/* Tangente horizontal en el mínimo (3, 2) -> (250, 185.6) */}
          <line x1={208} y1={185.6} x2={292} y2={185.6} stroke={LIENZO.warn} strokeWidth={2.5} />
          <circle cx={250} cy={185.6} r={5} fill={LIENZO.warn} />
          <text x={250} y={210} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Mínimo: f'(x) = 0
          </text>

          {/* Signos de la pendiente en los tres tramos */}
          <text x={82} y={176} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>sube (+)</text>
          <text x={208} y={132} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>baja (−)</text>
          <text x={314} y={168} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>sube (+)</text>

          <rect x={14} y={254} width={332} height={54} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
          <text x={180} y={276} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            En cimas y valles, la tangente es horizontal
          </text>
          <text x={180} y={297} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Sube → baja: máximo   |   Baja → sube: mínimo
          </text>
        </svg>
      </Pizarra>

      <Conexion>
        En economía, igualar la derivada a cero permite hallar la cantidad de
        producción que maximiza la ganancia o minimiza el costo; en física,
        permite hallar la altura máxima de un proyectil cuando su velocidad
        vertical se hace cero.
      </Conexion>
    </EscenaRica>
  );
}

function EscIntegrales() {
  // Curva exacta f(x) = 3x^2 en x in [0, 2.2], mapeada a px = 52 + 108*x, py = 232 - 12*y.
  // Área sombreada entre a = 1 (px = 160) y b = 2 (px = 268): integral = [x^3]_1^2 = 8 - 1 = 7.
  const curvaPts: string[] = [];
  for (let i = 0; i <= 22; i++) {
    const x = i * 0.1;
    const y = 3 * x * x;
    curvaPts.push(`${(52 + 108 * x).toFixed(1)},${(232 - 12 * y).toFixed(1)}`);
  }
  const areaPts: string[] = ["160.0,232.0"];
  for (let i = 10; i <= 20; i++) {
    const x = i * 0.1;
    const y = 3 * x * x;
    areaPts.push(`${(52 + 108 * x).toFixed(1)},${(232 - 12 * y).toFixed(1)}`);
  }
  areaPts.push("268.0,232.0");

  return (
    <EscenaRica>
      <Titulo>La integral: antiderivada y área bajo la curva</Titulo>

      <Puente>
        En matemáticas cada operación tiene su inversa: la resta deshace la suma
        y la raíz deshace la potencia. La <strong>integral indefinida</strong>{" "}
        deshace la derivada: te dan la pendiente $f(x)$ y tú recuperas la
        función original $F(x)$ cuya derivada es $f(x)$.
      </Puente>

      <Definicion termino="Antiderivada e integral indefinida">
        Decimos que $F(x)$ es una <strong>antiderivada</strong> (o primitiva) de
        $f(x)$ si $F'(x) = f(x)$. Todas las antiderivadas se escriben como{" "}
        {"$\\int f(x)\\,dx = F(x) + C$"}.
        <br />
        • <strong>Regla de la potencia:</strong>{" "}
        {"$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$"} (para{" "}
        {"$n \\neq -1$"}). Si $n = -1$, el denominador sería $-1 + 1 = 0$; en ese
        caso especial {"$\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C$"}.
        <br />
        • <strong>Constante y linealidad:</strong> {"$\\int k\\,dx = kx + C$"};
        las constantes multiplicando salen de la integral y una suma o resta se
        integra término a término:{" "}
        {"$\\int [a\\,f(x) \\pm b\\,g(x)]\\,dx = a\\int f(x)\\,dx \\pm b\\int g(x)\\,dx$"}.
      </Definicion>

      <PorQue>
        ¿Por qué toda integral indefinida lleva <strong>$+ C$</strong>? Porque
        las funciones $x^2$, $x^2 + 5$ y $x^2 - 10$ tienen exactamente la misma
        derivada ($2x$), ya que la derivada de cualquier constante es $0$. Al
        integrar $2x$ no sabemos qué constante tenía antes de derivar, así que
        escribimos $x^2 + C$ para incluirlas a todas.
      </PorQue>

      <Definicion termino="Integral definida y regla de Barrow">
        Para calcular el cambio acumulado entre $x = a$ y $x = b$, hallas una
        antiderivada $F(x)$ y restas sus valores en los extremos (<strong>regla
        de Barrow</strong>):
        <br />
        {"$\\int_a^b f(x)\\,dx = F(b) - F(a)$"}
        <br />
        Aquí no hace falta escribir $+ C$ porque se cancela al restar:{" "}
        $(F(b) + C) - (F(a) + C) = F(b) - F(a)$. Cuando $f(x) \ge 0$ en $[a, b]$,
        ese número mide exactamente el <strong>área bajo la curva</strong> entre{" "}
        $x = a$, $x = b$ y el eje $x$.
      </Definicion>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Integral definida = área bajo f(x) = 3x²
          </text>

          {/* Ejes */}
          <line x1={40} y1={232} x2={330} y2={232} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <polygon points="330,232 322,228 322,236" fill={LIENZO.fgDim} />
          <line x1={52} y1={242} x2={52} y2={44} stroke={LIENZO.fgDim} strokeWidth={1.6} />
          <polygon points="52,44 48,52 56,52" fill={LIENZO.fgDim} />
          <text x={340} y={236} fill={LIENZO.fgDim} fontSize={13} fontStyle="italic">x</text>
          <text x={38} y={48} fill={LIENZO.fgDim} fontSize={13} fontStyle="italic">y</text>

          {/* Región sombreada bajo f(x) = 3x^2 entre x = 1 y x = 2 */}
          <polygon points={areaPts.join(" ")} fill="var(--dib-cyan-500)" opacity={0.22} />
          <line x1={160} y1={232} x2={160} y2={196} stroke="var(--dib-cyan-500)" strokeWidth={1.8} strokeDasharray="4,3" />
          <line x1={268} y1={232} x2={268} y2={88} stroke="var(--dib-cyan-500)" strokeWidth={1.8} strokeDasharray="4,3" />

          {/* Curva exacta f(x) = 3x^2 */}
          <polyline
            points={curvaPts.join(" ")}
            fill="none"
            stroke={LIENZO.accent}
            strokeWidth={2.8}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Guías horizontales hacia el eje y */}
          <line x1={52} y1={196} x2={160} y2={196} stroke={LIENZO.fgFaint} strokeWidth={1.2} strokeDasharray="3,3" />
          <line x1={52} y1={88} x2={268} y2={88} stroke={LIENZO.fgFaint} strokeWidth={1.2} strokeDasharray="3,3" />

          {/* Marcas numéricas */}
          <text x={42} y={200} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>3</text>
          <text x={42} y={92} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>12</text>
          <text x={160} y={252} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>a = 1</text>
          <text x={268} y={252} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>b = 2</text>

          {/* Etiquetas */}
          <text x={148} y={114} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            f(x) = 3x²
          </text>
          <text x={224} y={194} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Área = 7
          </text>

          {/* Resumen de Barrow */}
          <rect x={14} y={268} width={332} height={48} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.3} />
          <text x={180} y={288} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Regla de Barrow: F(x) = x³
          </text>
          <text x={180} y={308} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Área = F(2) − F(1) = 2³ − 1³ = 8 − 1 = 7
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Para no mezclar derivar con integrar: al <strong>derivar</strong> $x^n$
        el exponente baja y resta $1$; al <strong>integrar</strong> $x^n$ le{" "}
        <strong>sumas $1$</strong> al exponente y <strong>divides</strong> entre
        ese nuevo exponente. Siempre puedes comprobar tu integral derivándola:
        debes recuperar $f(x)$.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Límite 0/0 por factorización y límite al infinito">
        <p className="mb-2">
          Calcula: (A){" "}
          {"$\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}$"} y (B){" "}
          {"$\\lim_{x \\to \\infty} \\dfrac{6x^2 - 5x + 1}{2x^2 + 3x - 4}$"}.
        </p>
        <p className="text-sm">
          <strong>Parte A · Paso 1:</strong> Sustituimos $x = 3$:{" "}
          {"$\\dfrac{3^2 - 9}{3 - 3} = \\dfrac{0}{0}$"} (indeterminación).
          <br />
          <strong>Parte A · Paso 2:</strong> Factorizamos la diferencia de
          cuadrados $x^2 - 9 = (x - 3)(x + 3)$ y simplificamos el factor $(x - 3)$:{" "}
          {"$\\lim_{x \\to 3} \\dfrac{(x - 3)(x + 3)}{x - 3} = \\lim_{x \\to 3} (x + 3)$"}.
          <br />
          <strong>Parte A · Paso 3:</strong> Evaluamos en $x = 3$:{" "}
          {"$3 + 3 = \\mathbf{6}$"}.
          <br />
          <strong>Parte B · Paso 1:</strong> Cuando $x \to \infty$ aparece{" "}
          {"$\\dfrac{\\infty}{\\infty}$"}. Numerador y denominador tienen grado $2$.
          <br />
          <strong>Parte B · Paso 2:</strong> Dividimos cada término entre $x^2$:{" "}
          {"$\\dfrac{6 - 5/x + 1/x^2}{2 + 3/x - 4/x^2}$"}. Al crecer $x$, las
          fracciones con $x$ abajo tienden a $0$.
          <br />
          <strong>Parte B · Respuesta:</strong>{" "}
          {"$\\dfrac{6}{2} = \\mathbf{3}$"} (cociente de coeficientes principales).
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Regla de la cadena y punto crítico (máximo)">
        <p className="mb-2">
          (A) Deriva {"$f(x) = (3x^2 - 2x)^4$"}. (B) Halla el valor máximo de{" "}
          $g(x) = -x^2 + 6x + 2$.
        </p>
        <p className="text-sm">
          <strong>Parte A · Paso 1:</strong> Identificamos la función interna{" "}
          $u = 3x^2 - 2x$ y el exponente $n = 4$. Su derivada interna es{" "}
          $u' = 3 \cdot 2x - 2 = 6x - 2$.
          <br />
          <strong>Parte A · Paso 2:</strong> Aplicamos{" "}
          {"$(u^n)' = n u^{n-1} \\cdot u'$"}:{" "}
          {"$f'(x) = 4(3x^2 - 2x)^3 (6x - 2) = \\mathbf{(24x - 8)(3x^2 - 2x)^3}$"}.
          <br />
          <strong>Parte B · Paso 1:</strong> Derivamos $g(x)$ término a término:{" "}
          $g'(x) = -2x + 6$.
          <br />
          <strong>Parte B · Paso 2:</strong> Igualamos a cero para hallar el punto
          crítico: $-2x + 6 = 0 \Rightarrow 2x = 6 \Rightarrow x = 3$.
          <br />
          <strong>Parte B · Paso 3:</strong> Antes de $3$ (en $x = 2$),{" "}
          {"$g'(2) = 2 > 0$"} (sube); después (en $x = 4$),{" "}
          {"$g'(4) = -2 < 0$"} (baja). Luego $x = 3$ es máximo, con altura{" "}
          {"$g(3) = -(3)^2 + 6(3) + 2 = -9 + 18 + 2 = \\mathbf{11}$"}.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 3 · Integral definida con regla de Barrow">
        <p className="mb-2">
          Calcula la integral definida{" "}
          {"$\\int_1^3 (3x^2 - 2x + 1)\\,dx$"}.
        </p>
        <p className="text-sm">
          <strong>Paso 1 (antiderivada):</strong> Integramos término a término:{" "}
          {"$\\int 3x^2\\,dx = 3 \\cdot \\dfrac{x^3}{3} = x^3$"},{" "}
          {"$\\int (-2x)\\,dx = -2 \\cdot \\dfrac{x^2}{2} = -x^2$"} y{" "}
          {"$\\int 1\\,dx = x$"}. Así, $F(x) = x^3 - x^2 + x$.
          <br />
          <strong>Paso 2 (comprobación rápida):</strong> $F'(x) = 3x^2 - 2x + 1$,
          coincide con el integrando.
          <br />
          <strong>Paso 3 (evaluar extremos):</strong>{" "}
          $F(3) = 3^3 - 3^2 + 3 = 27 - 9 + 3 = 21$;{" "}
          $F(1) = 1^3 - 1^2 + 1 = 1 - 1 + 1 = 1$.
          <br />
          <strong>Paso 4 (regla de Barrow):</strong>{" "}
          {"$F(3) - F(1) = 21 - 1 = \\mathbf{20}$"}.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · '0/0 siempre vale 0 o vale 1'">
        <strong>Realidad:</strong> {"$\\dfrac{0}{0}$"} es una{" "}
        <strong>indeterminación</strong>, no un número fijo. Por ejemplo,{" "}
        {"$\\lim_{x \\to 0} \\dfrac{2x}{x} = 2$"} mientras que{" "}
        {"$\\lim_{x \\to 0} \\dfrac{5x}{x} = 5$"}. Siempre debes factorizar o
        racionalizar para simplificar antes de evaluar.
      </Misconception>

      <Misconception titulo="Error 2 · 'La derivada de un producto es u' · v''">
        <strong>Realidad:</strong> la regla del producto es{" "}
        $(u \cdot v)' = u'v + uv'$. Compruébalo con $u = x$ y $v = x$:{" "}
        $(x \cdot x)' = (x^2)' = 2x$, mientras que{" "}
        $u' \cdot v' = 1 \cdot 1 = 1 \neq 2x$. Con la regla correcta:{" "}
        $1 \cdot x + x \cdot 1 = 2x$.
      </Misconception>

      <Misconception titulo="Error 3 · 'Olvidar + C o usar la potencia cuando n = −1'">
        <strong>Realidad:</strong> toda integral indefinida lleva $+ C$ porque
        la derivada borra cualquier constante. Además, la fórmula{" "}
        {"$\\dfrac{x^{n+1}}{n+1}$"} falla si $n = -1$ (daría división entre $0$);
        en ese caso {"$\\int x^{-1}\\,dx = \\ln|x| + C$"}.
      </Misconception>

      <Resumen>
        Límites: evalúa directo; en {"$0/0$"} factoriza o racionaliza; en{" "}
        {"$\\infty/\\infty$"} compara grados. Derivadas: $(c)' = 0$,{" "}
        {"$(x^n)' = n x^{n-1}$"}, $(uv)' = u'v + uv'$,{" "}
        {"$(u/v)' = (u'v - uv')/v^2$"}, {"$(u^n)' = n u^{n-1} u'$"}, extremos en{" "}
        $f'(x) = 0$. Integrales:{" "}
        {"$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C$"} ($n \neq -1$) y Barrow{" "}
        {"$\\int_a^b f(x)\\,dx = F(b) - F(a)$"}.
      </Resumen>

      <AutoCheck
        pregunta="Calcula el límite: lim (x → 2) de (x² − 4) / (x − 2)."
        opciones={["4", "0", "2", "No existe"]}
        correctaIdx={0}
        explicacion="Al sustituir x = 2 aparece 0/0 (indeterminación). Factorizamos x² − 4 = (x − 2)(x + 2), simplificamos (x − 2) y queda x + 2. Evaluando en x = 2: 2 + 2 = 4."
      />

      <AutoCheck
        pregunta="¿Cuál es el valor de lim (x → ∞) de (8x³ − 3x + 5) / (2x³ + 7x² − 1)?"
        opciones={["0", "∞", "4", "−5"]}
        correctaIdx={2}
        explicacion="Numerador y denominador tienen el mismo grado (3). Al dividir todos los términos entre x³, los términos con x en el denominador tienden a 0 y queda el cociente de coeficientes principales: 8 / 2 = 4."
      />

      <AutoCheck
        pregunta="Si f(x) = (2x + 1)³, ¿cuál es su derivada f'(x)?"
        opciones={["3(2x + 1)²", "6(2x + 1)²", "2(2x + 1)²", "6(2x + 1)³"]}
        correctaIdx={1}
        explicacion="Aplicamos la regla de la cadena con u = 2x + 1 (u' = 2): f'(x) = 3(2x + 1)² · 2 = 6(2x + 1)². Si olvidas multiplicar por u' = 2 obtienes 3(2x + 1)², que está incompleto."
      />

      <AutoCheck
        pregunta="¿En qué valor de x tiene su mínimo la función f(x) = x² − 8x + 15?"
        opciones={["x = 8", "x = −4", "x = 15", "x = 4"]}
        correctaIdx={3}
        explicacion="Derivamos: f'(x) = 2x − 8. Igualamos a cero: 2x − 8 = 0 → x = 4. Para x < 4 la derivada es negativa (baja) y para x > 4 es positiva (sube), así que x = 4 es un mínimo."
      />

      <AutoCheck
        pregunta="Calcula la integral definida ∫₀² (3x² + 2) dx."
        opciones={["10", "8", "12", "14"]}
        correctaIdx={2}
        explicacion="Buscamos la antiderivada: F(x) = x³ + 2x (porque F'(x) = 3x² + 2). Aplicamos la regla de Barrow: F(2) − F(0) = (2³ + 2·2) − (0 + 0) = (8 + 4) − 0 = 12."
      />
    </EscenaRica>
  );
}
