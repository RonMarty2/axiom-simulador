"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Puente, Definicion, PorQue, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MAT-27"
      tituloUnidad="Cónicas: elipse e hipérbola"
      escenas={[
        { titulo: "La elipse: definición, elementos y relación pitagórica", componente: EscElipseElementos },
        { titulo: "Ecuaciones de la elipse y excentricidad", componente: EscElipseEcuaciones },
        { titulo: "La hipérbola: elementos, relación focal y asíntotas", componente: EscHiperbola },
        { titulo: "Reconocer cualquier cónica y completar cuadrados", componente: EscGeneralConicas },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscElipseElementos() {
  return (
    <EscenaRica>
      <Titulo>La elipse: definición, elementos y relación pitagórica</Titulo>

      <Puente>
        Ya conoces dos secciones cónicas: la <strong>circunferencia</strong>{" "}
        (un centro y un radio igual en todas direcciones) y la{" "}
        <strong>parábola</strong> (una sola curva abierta con un foco y una
        directriz). Ahora aparecen las otras dos cónicas, que tienen{" "}
        <strong>dos focos</strong>: la <strong>elipse</strong> es una curva
        cerrada que &ldquo;abraza&rdquo; a ambos focos, y la{" "}
        <strong>hipérbola</strong> se abre en dos ramas opuestas hacia afuera.
      </Puente>

      <Hook>
        Clava dos tachuelas en una tabla, ata un hilo flojo entre ambas y tensa
        el hilo con la punta de un lápiz mientras giras alrededor. Como el largo
        total del hilo nunca cambia, la suma de las distancias del lápiz a los
        dos clavos es siempre constante: acabas de trazar una elipse exacta.
      </Hook>

      <Definicion termino="Elipse como lugar geométrico">
        Es el conjunto de todos los puntos $P(x, y)$ del plano cuya{" "}
        <strong>suma de distancias</strong> a dos puntos fijos llamados{" "}
        <strong>focos</strong> ($F_1$ y $F_2$) es constante e igual a $2a$:
        <br />
        {"$d(P, F_1) + d(P, F_2) = 2a$"}
        <br />
        ¿Por qué esa suma vale justo $2a$? Si colocas $P$ en un vértice{" "}
        $V_1$, su distancia al foco cercano es $a - c$ y al foco lejano es{" "}
        $a + c$; al sumarlas, $(a - c) + (a + c) = 2a$.
      </Definicion>

      <Pizarra alto={277}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Elipse: a² = b² + c² (triángulo CF₂B₁)
          </text>

          {/* Ejes de simetria */}
          <line x1={48} y1={148} x2={312} y2={148} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <line x1={180} y1={72} x2={180} y2={224} stroke={LIENZO.fgFaint} strokeWidth={1.2} />

          {/* Elipse exacta con a=5 (rx=110), b=3 (ry=66), c=4 (88px) */}
          <ellipse
            cx={180}
            cy={148}
            rx={110}
            ry={66}
            fill={LIENZO.accent}
            fillOpacity={0.06}
            stroke={LIENZO.accent}
            strokeWidth={2.2}
          />

          {/* Lado recto exacto en F1 (x=92, semilongitud b²/a = 9/5 = 1.8 u = 39.6 px) */}
          <line
            x1={92}
            y1={108.4}
            x2={92}
            y2={187.6}
            stroke="var(--dib-cyan-500)"
            strokeWidth={1.8}
            strokeDasharray="4,3"
          />
          <text x={85} y={118} textAnchor="end" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            LR
          </text>

          {/* Triangulo rectangulo C(180,148) - F2(268,148) - B1(180,82) */}
          <polygon
            points="180,148 268,148 180,82"
            fill={LIENZO.ok}
            fillOpacity={0.14}
            stroke="none"
          />
          {/* Angulo recto en C */}
          <polyline
            points="180,138 190,138 190,148"
            fill="none"
            stroke={LIENZO.ok}
            strokeWidth={1.4}
          />
          {/* Cateto b */}
          <line x1={180} y1={148} x2={180} y2={82} stroke={LIENZO.ok} strokeWidth={2.2} />
          {/* Cateto c */}
          <line x1={180} y1={148} x2={268} y2={148} stroke={LIENZO.warn} strokeWidth={2.2} />
          {/* Hipotenusa a (de B1 a F2, longitud exacta 110 px = rx) */}
          <line x1={180} y1={82} x2={268} y2={148} stroke={LIENZO.bad} strokeWidth={2.2} />
          {/* Segmento simetrico de B1 a F1 */}
          <line
            x1={180}
            y1={82}
            x2={92}
            y2={148}
            stroke={LIENZO.bad}
            strokeWidth={1.4}
            strokeDasharray="4,4"
          />

          {/* Puntos notables */}
          <circle cx={180} cy={148} r={3.5} fill={LIENZO.fg} />
          <circle cx={92} cy={148} r={4} fill={LIENZO.warn} />
          <circle cx={268} cy={148} r={4} fill={LIENZO.warn} />
          <circle cx={70} cy={148} r={3.5} fill={LIENZO.accent} />
          <circle cx={290} cy={148} r={3.5} fill={LIENZO.accent} />
          <circle cx={180} cy={82} r={3.5} fill={LIENZO.ok} />
          <circle cx={180} cy={214} r={3.5} fill={LIENZO.ok} />

          {/* Etiquetas con fontSize >= 13 sin solapamientos */}
          <text x={180} y={68} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>B₁</text>
          <text x={180} y={232} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>B₂</text>
          <text x={60} y={152} textAnchor="end" fill={LIENZO.accent} fontSize={13} fontWeight={700}>V₁</text>
          <text x={300} y={152} textAnchor="start" fill={LIENZO.accent} fontSize={13} fontWeight={700}>V₂</text>
          <text x={170} y={166} textAnchor="end" fill={LIENZO.fg} fontSize={13} fontWeight={700}>C</text>
          <text x={102} y={166} textAnchor="start" fill={LIENZO.warn} fontSize={13} fontWeight={700}>F₁</text>
          <text x={268} y={168} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>F₂</text>

          <text x={171} y={120} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>b</text>
          <text x={224} y={166} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>c</text>
          <text x={232} y={108} textAnchor="start" fill={LIENZO.bad} fontSize={13} fontWeight={700}>a</text>

          {/* Cuadro resumen de medidas */}
          <rect x={14} y={244} width={332} height={64} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={180} y={268} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Eje mayor = 2a   |   Eje menor = 2b
          </text>
          <text x={180} y={294} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Distancia focal = 2c   |   LR = 2b² / a
          </text>
        </svg>
      </Pizarra>

      <PorQue>
        <strong>¿De dónde sale {"$a^2 = b^2 + c^2$"}?</strong> Coloca el punto{" "}
        $P$ en el extremo superior $B_1$ del eje menor. Por simetría, $B_1$ está
        a la misma distancia de $F_1$ y de $F_2$; como esas dos distancias suman{" "}
        $2a$, cada una mide exactamente $a$. Entonces el centro $C$, el foco{" "}
        $F_2$ y el punto $B_1$ forman un triángulo rectángulo de catetos $b$ y{" "}
        $c$ con hipotenusa $a$. Por Pitágoras:{" "}
        {"$a^2 = b^2 + c^2$"} (siempre con $a &gt; b &gt; 0$ y $a &gt; c &gt; 0$).
      </PorQue>

      <Resumen>
        Elementos de toda elipse: centro $C(h, k)$, vértices principales $V_1, V_2$
        (eje mayor $= 2a$), extremos del eje menor $B_1, B_2$ (eje menor $= 2b$),
        focos $F_1, F_2$ (distancia focal $= 2c$), y{" "}
        <strong>lado recto</strong> (cuerda perpendicular al eje focal que pasa
        por un foco): {"$LR = \\dfrac{2b^2}{a}$"}.
      </Resumen>
    </EscenaRica>
  );
}

function EscElipseEcuaciones() {
  return (
    <EscenaRica>
      <Titulo>Ecuaciones de la elipse y excentricidad</Titulo>

      <Definicion termino="Ecuación canónica y ordinaria de la elipse">
        Si la elipse tiene centro en el origen $(0, 0)$ (forma{" "}
        <strong>canónica</strong>) o en un punto cualquiera $C(h, k)$ (forma{" "}
        <strong>ordinaria</strong>), su ecuación depende de si el eje mayor es
        horizontal o vertical:
        <br />
        <strong>Horizontal (eje mayor paralelo a $x$):</strong>{" "}
        {"$\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1$"} y con centro $(h, k)$:{" "}
        {"$\\dfrac{(x - h)^2}{a^2} + \\dfrac{(y - k)^2}{b^2} = 1$"}.
        <br />
        <strong>Vertical (eje mayor paralelo a $y$):</strong>{" "}
        {"$\\dfrac{x^2}{b^2} + \\dfrac{y^2}{a^2} = 1$"} y con centro $(h, k)$:{" "}
        {"$\\dfrac{(x - h)^2}{b^2} + \\dfrac{(y - k)^2}{a^2} = 1$"}.
      </Definicion>

      <Pizarra alto={272}>
        <svg width="100%" height="100%" viewBox="0 0 360 314" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Elipse horizontal vs vertical
          </text>

          {/* Tarjeta izquierda: Horizontal */}
          <rect x={12} y={36} width={162} height={172} rx={8} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={93} y={56} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Horizontal (a² en x)
          </text>
          <line x1={38} y1={104} x2={148} y2={104} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <line x1={93} y1={70} x2={93} y2={138} stroke={LIENZO.fgFaint} strokeWidth={1} />
          {/* rx=44, ry=24 => c = sqrt(44^2 - 24^2) = 36.88 */}
          <ellipse cx={93} cy={104} rx={44} ry={24} fill="none" stroke={LIENZO.accent} strokeWidth={2} />
          <circle cx={56.1} cy={104} r={3.5} fill={LIENZO.warn} />
          <circle cx={129.9} cy={104} r={3.5} fill={LIENZO.warn} />
          <circle cx={93} cy={104} r={2.5} fill={LIENZO.fg} />
          <text x={93} y={156} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            V: (h ± a, k)
          </text>
          <text x={93} y={178} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            F: (h ± c, k)
          </text>
          <text x={93} y={198} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            B: (h, k ± b)
          </text>

          {/* Tarjeta derecha: Vertical */}
          <rect x={186} y={36} width={162} height={172} rx={8} fill="var(--dib-cyan-500)" opacity={0.08} stroke="var(--dib-cyan-500)" strokeWidth={1.4} />
          <text x={267} y={56} textAnchor="middle" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            Vertical (a² en y)
          </text>
          <line x1={222} y1={104} x2={312} y2={104} stroke={LIENZO.fgFaint} strokeWidth={1} />
          <line x1={267} y1={64} x2={267} y2={144} stroke={LIENZO.fgFaint} strokeWidth={1} />
          {/* rx=22, ry=36 => c = sqrt(36^2 - 22^2) = 28.50 */}
          <ellipse cx={267} cy={104} rx={22} ry={36} fill="none" stroke="var(--dib-cyan-500)" strokeWidth={2} />
          <circle cx={267} cy={75.5} r={3.5} fill={LIENZO.warn} />
          <circle cx={267} cy={132.5} r={3.5} fill={LIENZO.warn} />
          <circle cx={267} cy={104} r={2.5} fill={LIENZO.fg} />
          <text x={267} y={158} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            V: (h, k ± a)
          </text>
          <text x={267} y={179} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            F: (h, k ± c)
          </text>
          <text x={267} y={199} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            B: (h ± b, k)
          </text>

          {/* Bloque inferior: Excentricidad */}
          <rect x={12} y={220} width={336} height={82} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={180} y={244} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Excentricidad: e = c / a   (siempre 0 &lt; e &lt; 1)
          </text>
          <text x={24} y={268} fill={LIENZO.fg} fontSize={13}>
            • Si e → 0 (c chico): casi una circunferencia.
          </text>
          <text x={24} y={290} fill={LIENZO.fg} fontSize={13}>
            • Si e → 1 (c ≈ a): elipse muy alargada.
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Excentricidad de la elipse ($e$)">
        Mide qué tan achatada o alargada es la elipse y se calcula como el
        cociente entre la distancia semifocal y el semieje mayor:{" "}
        {"$e = \\dfrac{c}{a}$"}. Como en toda elipse $0 &lt; c &lt; a$, se
        cumple siempre $0 &lt; e &lt; 1$.
      </Definicion>

      <Mnemotecnia>
        Para saber al instante si una elipse es horizontal o vertical, busca el{" "}
        <strong>denominador más grande</strong>: ese número siempre es $a^2$. Si
        está debajo de $x^2$ (o de $(x - h)^2$), el eje mayor es horizontal; si
        está debajo de $y^2$ (o de $(y - k)^2$), el eje mayor es vertical.
      </Mnemotecnia>

      <Cuidado>
        Al leer el centro $C(h, k)$ desde $(x - h)^2$ y $(y - k)^2$, cambia los
        signos que ves dentro del paréntesis. Por ejemplo, en{" "}
        {"$\\dfrac{(x + 3)^2}{16} + \\dfrac{(y - 2)^2}{25} = 1$"}, el centro es{" "}
        $C(-3, 2)$ y la elipse es vertical porque $25 &gt; 16$.
      </Cuidado>
    </EscenaRica>
  );
}

function EscHiperbola() {
  // Generamos puntos exactos de la hiperbola horizontal x²/16 - y²/9 = 1
  // (a = 4, b = 3, c = 5). Escala: 16 px por unidad, centro C = (180, 138).
  const cx = 180;
  const cy = 138;
  const esc = 16;
  const ramaDer: string[] = [];
  const ramaIzq: string[] = [];
  const pasos = 32;
  const yLim = 5.0;
  for (let i = 0; i <= pasos; i++) {
    const y = -yLim + (2 * yLim * i) / pasos;
    const x = 4 * Math.sqrt(1 + (y * y) / 9);
    ramaDer.push(`${(cx + x * esc).toFixed(1)},${(cy - y * esc).toFixed(1)}`);
    ramaIzq.push(`${(cx - x * esc).toFixed(1)},${(cy - y * esc).toFixed(1)}`);
  }

  return (
    <EscenaRica>
      <Titulo>La hipérbola: elementos, relación focal y asíntotas</Titulo>

      <Definicion termino="Hipérbola como lugar geométrico">
        Es el conjunto de todos los puntos $P(x, y)$ del plano cuya{" "}
        <strong>diferencia positiva de distancias</strong> a dos focos fijos{" "}
        $F_1$ y $F_2$ es constante e igual a $2a$:
        <br />
        {"$\\lvert d(P, F_1) - d(P, F_2) \\rvert = 2a$"}
        <br />
        Al colocar $P$ en un vértice $V_2$, su distancia al foco lejano $F_1$ es{" "}
        $c + a$ y al foco cercano $F_2$ es $c - a$; al restarlas,{" "}
        $(c + a) - (c - a) = 2a$. Como los focos quedan <strong>por fuera</strong>{" "}
        de los vértices, ahora siempre se cumple $c &gt; a$.
      </Definicion>

      <Pizarra alto={282}>
        <svg width="100%" height="100%" viewBox="0 0 360 326" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Hipérbola: c² = a² + b² y asíntotas
          </text>

          {/* Ejes */}
          <line x1={38} y1={138} x2={322} y2={138} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <line x1={180} y1={44} x2={180} y2={228} stroke={LIENZO.fgFaint} strokeWidth={1.2} />

          {/* Rectangulo auxiliar: a=4 (64px), b=3 (48px) => x in [116,244], y in [90,186] */}
          <rect
            x={116}
            y={90}
            width={128}
            height={96}
            fill={LIENZO.bgSoft}
            fillOpacity={0.5}
            stroke={LIENZO.fgDim}
            strokeWidth={1.3}
            strokeDasharray="4,3"
          />

          {/* Asintotas y = ±(3/4)x para x in [-7.2, 7.2] => dx=115.2, dy=86.4 */}
          <line x1={64.8} y1={224.4} x2={295.2} y2={51.6} stroke="var(--dib-cyan-500)" strokeWidth={1.4} strokeDasharray="5,4" />
          <line x1={64.8} y1={51.6} x2={295.2} y2={224.4} stroke="var(--dib-cyan-500)" strokeWidth={1.4} strokeDasharray="5,4" />

          {/* Triangulo rectangulo C(180,138) - V2(244,138) - esquina(244,90): a=64, b=48, c=80 */}
          <polygon points="180,138 244,138 244,90" fill={LIENZO.ok} fillOpacity={0.14} />
          <line x1={180} y1={138} x2={244} y2={138} stroke={LIENZO.accent} strokeWidth={2.2} />
          <line x1={244} y1={138} x2={244} y2={90} stroke={LIENZO.ok} strokeWidth={2.2} />
          <line x1={180} y1={138} x2={244} y2={90} stroke={LIENZO.warn} strokeWidth={2.2} />
          {/* Arco circular de radio c=80 desde la esquina (244,90) hasta el foco F2 (260,138) */}
          <path d="M 244 90 A 80 80 0 0 1 260 138" fill="none" stroke={LIENZO.warn} strokeWidth={1.4} strokeDasharray="3,3" />

          {/* Ramas exactas de la hiperbola */}
          <polyline points={ramaDer.join(" ")} fill="none" stroke={LIENZO.accent} strokeWidth={2.3} />
          <polyline points={ramaIzq.join(" ")} fill="none" stroke={LIENZO.accent} strokeWidth={2.3} />

          {/* Puntos notables */}
          <circle cx={180} cy={138} r={3.5} fill={LIENZO.fg} />
          <circle cx={116} cy={138} r={3.5} fill={LIENZO.accent} />
          <circle cx={244} cy={138} r={3.5} fill={LIENZO.accent} />
          <circle cx={100} cy={138} r={4} fill={LIENZO.warn} />
          <circle cx={260} cy={138} r={4} fill={LIENZO.warn} />

          {/* Etiquetas con fontSize >= 13 sin solapamientos */}
          <text x={170} y={156} textAnchor="end" fill={LIENZO.fg} fontSize={13} fontWeight={700}>C</text>
          <text x={124} y={156} textAnchor="start" fill={LIENZO.accent} fontSize={13} fontWeight={700}>V₁</text>
          <text x={92} y={156} textAnchor="end" fill={LIENZO.warn} fontSize={13} fontWeight={700}>F₁</text>
          <text x={240} y={156} textAnchor="end" fill={LIENZO.accent} fontSize={13} fontWeight={700}>V₂</text>
          <text x={266} y={156} textAnchor="start" fill={LIENZO.warn} fontSize={13} fontWeight={700}>F₂</text>

          <text x={210} y={156} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>a</text>
          <text x={236} y={118} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>b</text>
          <text x={204} y={108} textAnchor="end" fill={LIENZO.warn} fontSize={13} fontWeight={700}>c</text>
          <text x={294} y={46} textAnchor="end" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            Asíntota
          </text>

          {/* Cuadro resumen inferior */}
          <rect x={14} y={238} width={332} height={78} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={180} y={260} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            c² = a² + b²  (c &gt; a)  ·  e = c/a &gt; 1
          </text>
          <text x={180} y={282} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Horizontal: y − k = ±(b/a)(x − h)
          </text>
          <text x={180} y={304} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Vertical: y − k = ±(a/b)(x − h)
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Elementos y ecuaciones de la hipérbola">
        Tiene <strong>eje transverso</strong> de longitud $2a$ (une los vértices
        $V_1, V_2$), <strong>eje conjugado</strong> de longitud $2b$, distancia
        focal $2c$, lado recto {"$LR = \\dfrac{2b^2}{a}$"} y excentricidad{" "}
        {"$e = \\dfrac{c}{a} > 1$"}. La relación focal es{" "}
        {"$c^2 = a^2 + b^2$"} (como ves en el arco del dibujo, la semidiagonal
        del rectángulo auxiliar mide justo $c$ y cae sobre el foco).
        <br />
        <strong>Horizontal ($x$ positivo, abre a izquierda y derecha):</strong>{" "}
        {"$\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1$"} y con centro $(h, k)$:{" "}
        {"$\\dfrac{(x - h)^2}{a^2} - \\dfrac{(y - k)^2}{b^2} = 1$"}.
        <br />
        <strong>Vertical ($y$ positivo, abre arriba y abajo):</strong>{" "}
        {"$\\dfrac{y^2}{a^2} - \\dfrac{x^2}{b^2} = 1$"} y con centro $(h, k)$:{" "}
        {"$\\dfrac{(y - k)^2}{a^2} - \\dfrac{(x - h)^2}{b^2} = 1$"}.
      </Definicion>

      <PorQue>
        <strong>¿Cómo salen las asíntotas sin memorizar dos fórmulas?</strong>{" "}
        Cambia el $1$ de la ecuación ordinaria por un $0$ y despeja $y - k$. En
        la horizontal, {"$\\dfrac{(x - h)^2}{a^2} - \\dfrac{(y - k)^2}{b^2} = 0$"}{" "}
        da {"$y - k = \\pm\\dfrac{b}{a}(x - h)$"}. En la vertical,{" "}
        {"$\\dfrac{(y - k)^2}{a^2} - \\dfrac{(x - h)^2}{b^2} = 0$"} da{" "}
        {"$y - k = \\pm\\dfrac{a}{b}(x - h)$"}. En ambos casos la pendiente es{" "}
        {"$\\pm\\dfrac{\\text{semieje vertical}}{\\text{semieje horizontal}}$"}.
      </PorQue>

      <Cuidado>
        En la hipérbola, $a^2$ <strong>no</strong> es necesariamente el
        denominador mayor: $a^2$ es siempre el denominador del{" "}
        <strong>término positivo</strong>. Puedes tener $a &lt; b$, $a = b$ o{" "}
        $a &gt; b$, y lo único que nunca cambia es que $c$ es el mayor de los
        tres ($c^2 = a^2 + b^2$).
      </Cuidado>
    </EscenaRica>
  );
}

function EscGeneralConicas() {
  return (
    <EscenaRica>
      <Titulo>Reconocer cualquier cónica y completar cuadrados</Titulo>

      <Definicion termino="Ecuación general sin término xy">
        Toda circunferencia, parábola, elipse o hipérbola con ejes paralelos a
        los ejes coordenados puede escribirse como:
        <br />
        {"$Ax^2 + Cy^2 + Dx + Ey + F = 0$"} (con $A$ y $C$ no nulos a la vez).
        <br />
        Sin hacer cuentas largas, basta mirar los coeficientes $A$ y $C$ que
        acompañan a $x^2$ e $y^2$ (suponiendo que la ecuación no sea un caso
        degenerado como un punto o un conjunto vacío).
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Clasificar Ax² + Cy² + Dx + Ey + F = 0
          </text>
          {[
            {
              nombre: "Circunferencia",
              regla: "A = C  (≠ 0)",
              ej: "Ej.: x² + y² − 4x + 6y − 3 = 0",
              c: LIENZO.ok,
            },
            {
              nombre: "Parábola",
              regla: "A = 0  o  C = 0",
              ej: "Ej.: x² − 6x − 4y + 5 = 0  (C = 0)",
              c: "var(--dib-cyan-500)",
            },
            {
              nombre: "Elipse",
              regla: "A ≠ C, igual signo",
              ej: "Ej.: 9x² + 4y² − 36x + 24y + 36 = 0",
              c: LIENZO.accent,
            },
            {
              nombre: "Hipérbola",
              regla: "A y C, signos opuestos",
              ej: "Ej.: 4x² − 9y² + 16x + 18y − 29 = 0",
              c: LIENZO.warn,
            },
          ].map((item, i) => (
            <g key={i} transform={`translate(14, ${38 + i * 76})`}>
              <rect x={0} y={0} width={332} height={66} rx={8} fill={item.c} opacity={0.1} stroke={item.c} strokeWidth={1.4} />
              <text x={14} y={24} fill={item.c} fontSize={13} fontWeight={700}>
                {item.nombre}
              </text>
              <text x={318} y={24} textAnchor="end" fill={item.c} fontSize={13} fontWeight={700}>
                {item.regla}
              </text>
              <text x={14} y={48} fill={LIENZO.fg} fontSize={13}>
                {item.ej}
              </text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Parrafo>
        Una vez que sabes qué cónica es, para leer su centro, vértices y focos
        necesitas pasar de la forma general a la forma ordinaria mediante{" "}
        <strong>completar cuadrados</strong> en 4 pasos fijos:
      </Parrafo>

      <Resumen>
        <strong>1.</strong> Agrupa los términos en $x$, los términos en $y$, y
        pasa la constante $F$ al lado derecho.
        <br />
        <strong>2.</strong> Saca factor común $A$ del grupo de $x$ y factor
        común $C$ (con su signo) del grupo de $y$.
        <br />
        <strong>3.</strong> Dentro de cada paréntesis suma la mitad del
        coeficiente lineal al cuadrado, y al lado derecho suma ese número{" "}
        <strong>multiplicado por el factor que sacaste afuera</strong> ($A$ o{" "}
        $C$).
        <br />
        <strong>4.</strong> Divide ambos lados entre el número del lado derecho
        para que quede igual a $1$.
      </Resumen>

      <Cuidado>
        El fallo clásico al completar cuadrados es sumar solo el número de
        adentro del paréntesis al lado derecho y olvidar multiplicarlo por $A$ o
        por $C$. En una hipérbola, además, si sacas un factor negativo como{" "}
        $-9(y^2 - 2y + 1)$, al lado derecho debes sumar $-9 \cdot 1 = -9$, no{" "}
        $+9$.
      </Cuidado>

      <Conexion>
        En exámenes de admisión suelen darte la ecuación general desordenada y
        pedir el centro, los focos o la excentricidad: reconocer primero el tipo
        de cónica con $A$ y $C$ te ahorra errores de signo desde el primer
        renglón.
      </Conexion>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Elementos de una elipse desde su ecuación ordinaria">
        <p className="mb-2">
          Dada la elipse{" "}
          {"$\\dfrac{(x - 2)^2}{25} + \\dfrac{(y + 1)^2}{9} = 1$"}, determina su
          centro, vértices, focos, excentricidad y lado recto.
        </p>
        <p className="text-sm">
          <strong>Paso 1 (Centro y orientación):</strong> De $(x - 2)$ y{" "}
          $(y + 1) = (y - (-1))$ sale $C(2, -1)$. El denominador mayor es $25$ y
          está debajo de $x$, así que la elipse es <strong>horizontal</strong>{" "}
          con $a^2 = 25 \Rightarrow a = 5$ y $b^2 = 9 \Rightarrow b = 3$.
          <br />
          <strong>Paso 2 (Distancia semifocal):</strong> En la elipse{" "}
          $a^2 = b^2 + c^2$, luego $c^2 = 25 - 9 = 16 \Rightarrow c = 4$.
          <br />
          <strong>Paso 3 (Vértices y focos):</strong> Como es horizontal, solo
          cambia la coordenada $x$:
          <br />
          Vértices: $(2 \pm 5, -1) \Rightarrow V_1(-3, -1)$ y $V_2(7, -1)$.
          <br />
          Focos: $(2 \pm 4, -1) \Rightarrow F_1(-2, -1)$ y $F_2(6, -1)$.
          <br />
          <strong>Paso 4 (Excentricidad y lado recto):</strong>{" "}
          {"$e = \\dfrac{c}{a} = \\dfrac{4}{5} = 0{,}8$"} y{" "}
          {"$LR = \\dfrac{2b^2}{a} = \\dfrac{2(9)}{5} = \\dfrac{18}{5} = 3{,}6$"}.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Vértices, focos y asíntotas de una hipérbola vertical">
        <p className="mb-2">
          Para la hipérbola{" "}
          {"$\\dfrac{(y - 1)^2}{16} - \\dfrac{(x + 3)^2}{9} = 1$"}, halla el
          centro, vértices, focos, excentricidad y ecuaciones de las asíntotas.
        </p>
        <p className="text-sm">
          <strong>Paso 1 (Centro y orientación):</strong> Aunque $y$ aparece
          primero, $h$ siempre sale de $x$ y $k$ de $y$: centro{" "}
          <strong>$C(-3, 1)$</strong>. El término positivo es el de $y$, así que
          la hipérbola es <strong>vertical</strong> con{" "}
          $a^2 = 16 \Rightarrow a = 4$ y $b^2 = 9 \Rightarrow b = 3$.
          <br />
          <strong>Paso 2 (Distancia semifocal):</strong> En la hipérbola{" "}
          $c^2 = a^2 + b^2 = 16 + 9 = 25 \Rightarrow c = 5$.
          <br />
          <strong>Paso 3 (Vértices, focos y excentricidad):</strong> Al ser
          vertical, solo varía la coordenada $y$:
          <br />
          Vértices: $(-3, 1 \pm 4) \Rightarrow V_1(-3, -3)$ y $V_2(-3, 5)$.
          <br />
          Focos: $(-3, 1 \pm 5) \Rightarrow F_1(-3, -4)$ y $F_2(-3, 6)$.
          <br />
          Excentricidad: {"$e = \\dfrac{c}{a} = \\dfrac{5}{4} = 1{,}25$"}.
          <br />
          <strong>Paso 4 (Asíntotas):</strong> Igualando a $0$:{" "}
          {"$\\dfrac{(y - 1)^2}{16} = \\dfrac{(x + 3)^2}{9} \\Rightarrow \\mathbf{y - 1 = \\pm\\dfrac{4}{3}(x + 3)}$"}.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 3 · Pasar de ecuación general a ordinaria completando cuadrados">
        <p className="mb-2">
          Identifica la cónica, escribe su ecuación ordinaria y halla su centro:{" "}
          $9x^2 + 4y^2 - 36x + 24y + 36 = 0$.
        </p>
        <p className="text-sm">
          <strong>Paso 1 (Clasificar):</strong> $A = 9$ y $C = 4$ son distintos
          y tienen el mismo signo ($A \cdot C &gt; 0$): es una{" "}
          <strong>elipse</strong>.
          <br />
          <strong>Paso 2 (Agrupar y sacar factor común):</strong>{" "}
          $9(x^2 - 4x) + 4(y^2 + 6y) = -36$.
          <br />
          <strong>Paso 3 (Completar cuadrados y equilibrar):</strong> Para{" "}
          $x^2 - 4x$ sumamos $(-4/2)^2 = 4$ adentro y $9 \cdot 4 = 36$ a la
          derecha. Para $y^2 + 6y$ sumamos $(6/2)^2 = 9$ adentro y{" "}
          $4 \cdot 9 = 36$ a la derecha:
          <br />
          $9(x^2 - 4x + 4) + 4(y^2 + 6y + 9) = -36 + 36 + 36 \Rightarrow 9(x - 2)^2 + 4(y + 3)^2 = 36$.
          <br />
          <strong>Paso 4 (Dividir entre 36):</strong>{" "}
          {"$\\mathbf{\\dfrac{(x - 2)^2}{4} + \\dfrac{(y + 3)^2}{9} = 1}$"}.
          Es una elipse <strong>vertical</strong> con centro{" "}
          <strong>$C(2, -3)$</strong>, $a = 3$, $b = 2$ y{" "}
          {"$c = \\sqrt{9 - 4} = \\sqrt{5}$"}.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'En la elipse y en la hipérbola siempre vale c² = a² + b²'">
        <strong>Realidad:</strong> las dos relaciones son distintas. En la{" "}
        <strong>elipse</strong> manda el semieje mayor $a$: $a^2 = b^2 + c^2$
        (por eso $c^2 = a^2 - b^2$ y $e &lt; 1$). En la{" "}
        <strong>hipérbola</strong> manda la distancia semifocal $c$:{" "}
        $c^2 = a^2 + b^2$ (por eso $c &gt; a$ y $e &gt; 1$).
      </Misconception>

      <Misconception titulo="Error 2 · 'El semieje a² siempre va debajo de x²'">
        <strong>Realidad:</strong> no es fijo. En la <strong>elipse</strong>,{" "}
        $a^2$ siempre es el <strong>denominador mayor</strong> (si está bajo{" "}
        $y^2$, la elipse es vertical). En la <strong>hipérbola</strong>, $a^2$
        siempre es el denominador del <strong>término positivo</strong>, aunque
        sea más chico que $b^2$.
      </Misconception>

      <Misconception titulo="Error 3 · 'Las asíntotas siempre tienen pendiente ±b/a o el signo menos no importa'">
        <strong>Realidad:</strong> el signo negativo define qué variable es la
        positiva y si la hipérbola es horizontal o vertical. Si es horizontal,
        la pendiente de las asíntotas es {"$\\pm\\dfrac{b}{a}$"}; si es
        vertical, se invierte a {"$\\pm\\dfrac{a}{b}$"}. En caso de duda, cambia
        el $1$ por $0$ y despeja $y - k$.
      </Misconception>

      <Resumen>
        <strong>Elipse:</strong> signo $+$, $a^2$ es el mayor, $a^2 = b^2 + c^2$,{" "}
        $0 &lt; e = c/a &lt; 1$, {"$LR = \\dfrac{2b^2}{a}$"}.{" "}
        <strong>Hipérbola:</strong> signo $-$, $a^2$ va en el término positivo,{" "}
        $c^2 = a^2 + b^2$, $e = c/a &gt; 1$, {"$LR = \\dfrac{2b^2}{a}$"},
        asíntotas igualando a $0$.{" "}
        <strong>General ($Ax^2 + Cy^2 + \dots = 0$):</strong> $A = C$
        circunferencia; uno cero parábola; $A \neq C$ igual signo elipse;
        signos opuestos hipérbola.
      </Resumen>

      <AutoCheck
        pregunta="Dada la elipse x²/169 + y²/25 = 1, ¿cuáles son su distancia semifocal c y su excentricidad e?"
        opciones={[
          "c = 14 y e = 14/13",
          "c = 8 y e = 8/13",
          "c = 12 y e = 12/13",
          "c = 12 y e = 13/12",
        ]}
        correctaIdx={2}
        explicacion="En la elipse a² = 169 (a = 13) y b² = 25 (b = 5). Como a² = b² + c², despejamos c² = 169 − 25 = 144, así que c = 12. Luego e = c / a = 12/13 (menor que 1)."
      />

      <AutoCheck
        pregunta="¿Cuáles son la distancia semifocal c y la excentricidad e de la hipérbola x²/9 − y²/16 = 1?"
        opciones={[
          "c = 5 y e = 5/3",
          "c = 5 y e = 5/4",
          "c = √7 y e = √7/4",
          "c = 7 y e = 7/3",
        ]}
        correctaIdx={0}
        explicacion="En la hipérbola, a² es el denominador del término positivo: a² = 9 (a = 3) y b² = 16 (b = 4). Usando c² = a² + b² = 9 + 16 = 25 resulta c = 5, y e = c / a = 5/3."
      />

      <AutoCheck
        pregunta="¿Cuáles son las ecuaciones de las asíntotas de la hipérbola vertical y²/36 − x²/9 = 1?"
        opciones={[
          "y = ±(1/2)x",
          "y = ±4x",
          "y = ±(1/4)x",
          "y = ±2x",
        ]}
        correctaIdx={3}
        explicacion="Como y² es el término positivo, es vertical con a = √36 = 6 y b = √9 = 3. Sus asíntotas son y = ±(a/b)x = ±(6/3)x = ±2x (también se obtiene al igualar y²/36 − x²/9 = 0)."
      />

      <AutoCheck
        pregunta="¿Qué cónica representa la ecuación general 4x² − 9y² + 16x + 18y − 29 = 0?"
        opciones={[
          "Elipse",
          "Hipérbola",
          "Circunferencia",
          "Parábola",
        ]}
        correctaIdx={1}
        explicacion="Los coeficientes cuadráticos son A = 4 y C = −9, que tienen signos opuestos (A · C < 0). Al completar cuadrados queda (x + 2)²/9 − (y − 1)²/4 = 1, una hipérbola horizontal."
      />

      <AutoCheck
        pregunta="En la elipse 4x² + 25y² = 100, ¿cuánto mide su lado recto LR = 2b²/a?"
        opciones={[
          "25/2",
          "4/5",
          "8/5",
          "16/5",
        ]}
        correctaIdx={2}
        explicacion="Dividimos toda la ecuación entre 100 para llevarla a la forma canónica: x²/25 + y²/4 = 1. Así a² = 25 (a = 5) y b² = 4. Entonces LR = 2b² / a = 2(4) / 5 = 8/5."
      />
    </EscenaRica>
  );
}
