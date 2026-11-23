"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Definicion, Puente, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MAT-25"
      tituloUnidad="Estadística, dispersión y probabilidad"
      escenas={[
        { titulo: "Medidas de tendencia central", componente: EscTendenciaCentral },
        { titulo: "Medidas de posición y diagrama de caja", componente: EscPosicion },
        { titulo: "Medidas de dispersión", componente: EscDispersion },
        { titulo: "Probabilidad clásica, unión e independencia", componente: EscProbabilidad },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscTendenciaCentral() {
  return (
    <EscenaRica>
      <Titulo>Medidas de tendencia central</Titulo>

      <Puente>
        Cada vez que promedias tus notas del colegio para saber si aprobaste,
        ya estás usando estadística: buscas resumir varios datos en un solo
        número que indique alrededor de qué valor se concentra el grupo.
      </Puente>

      <Hook>
        Imagina que cinco estudiantes gastaron Bs 10, Bs 20, Bs 20, Bs 30 y
        Bs 120 en fotocopias. Su promedio es Bs 40, aunque cuatro de los cinco
        gastaron Bs 30 o menos. ¿El promedio siempre representa bien al grupo?
      </Hook>

      <Definicion termino="Media, mediana y moda (datos no agrupados)">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Media aritmética ({"$\\bar{x}$"}):</strong> es la suma de
            todos los datos dividida entre la cantidad total de datos $n$:{" "}
            {"$\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n} = \\frac{\\sum x_i}{n}$"}
            {" "}(el símbolo {"$\\sum$"} indica sumar todos los valores). Usa
            todos los datos, pero un valor extremo la arrastra hacia ese lado.
          </li>
          <li>
            <strong>Mediana ($Me$):</strong> es el valor que queda en el centro{" "}
            <strong>después de ordenar los datos de menor a mayor</strong>. Si{" "}
            $n$ es impar, ocupa la posición {"$\\frac{n + 1}{2}$"}. Si $n$ es
            par, hay dos datos centrales (posiciones {"$\\frac{n}{2}$"} y{" "}
            {"$\\frac{n}{2} + 1$"}) y la mediana es el promedio de ambos. No se
            deja arrastrar por valores extremos.
          </li>
          <li>
            <strong>Moda ($Mo$):</strong> es el valor que aparece con mayor
            frecuencia. Un conjunto puede tener una moda (unimodal), dos
            (bimodal) o ninguna si todos se repiten igual (amodal). Es la única
            medida que sirve para datos cualitativos (como tipo de sangre o
            carrera).
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Cálculo en tablas simples de frecuencias">
        Cuando un valor $x_i$ se repite $f_i$ veces (su frecuencia absoluta), el
        total de datos es {"$\\sum f_i = n$"} y la media se calcula multiplicando
        cada valor por su frecuencia:{" "}
        {"$\\bar{x} = \\frac{\\sum (x_i \\cdot f_i)}{n}$"}.
        <br />
        <strong>Ejemplo rápido:</strong> en 10 exámenes con notas $4$ ($f = 2$),{" "}
        $6$ ($f = 5$) y $8$ ($f = 3$), tenemos $n = 2 + 5 + 3 = 10$ y{" "}
        {"$\\bar{x} = \\frac{4 \\cdot 2 + 6 \\cdot 5 + 8 \\cdot 3}{10} = \\frac{8 + 30 + 24}{10} = \\frac{62}{10} = 6,2$"}.
        {" "}La moda es $Mo = 6$ (mayor frecuencia: $5$). Para la mediana (como{" "}
        $n = 10$ es par, posiciones 5 y 6), acumulamos frecuencias: hasta $4$
        van $2$ datos y hasta $6$ van $7$, así que los datos 5 y 6 valen $6$ y{" "}
        {"$Me = \\frac{6 + 6}{2} = 6$"}.
      </Definicion>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 360 345" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Efecto de un valor extremo (Bs)
          </text>
          <text x={180} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Datos ordenados: 10, 20, 20, 30 y 120
          </text>

          {/* Recta numerica a escala lineal: 0 en x=26, 130 en x=334 */}
          <line x1={26} x2={334} y1={118} y2={118} stroke={LIENZO.fg} strokeWidth={1.6} />

          {/* Marcas y etiquetas principales */}
          {[
            { lbl: "0", x: 26 },
            { lbl: "20", x: 73 },
            { lbl: "40", x: 121 },
            { lbl: "120", x: 310 },
          ].map((t) => (
            <g key={t.lbl}>
              <line x1={t.x} x2={t.x} y1={114} y2={122} stroke={LIENZO.fg} strokeWidth={1.4} />
              <text x={t.x} y={139} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>{t.lbl}</text>
            </g>
          ))}

          {/* Puntos de datos: 10(50), 20(73 x2), 30(97), 120(310) */}
          <circle cx={50} cy={106} r={5.5} fill={LIENZO.accent} />
          <circle cx={73} cy={106} r={5.5} fill={LIENZO.accent} />
          <circle cx={73} cy={90} r={5.5} fill={LIENZO.accent} />
          <circle cx={97} cy={106} r={5.5} fill={LIENZO.accent} />
          <circle cx={310} cy={106} r={5.5} fill={LIENZO.bad} />

          {/* Indicador Mediana y Moda */}
          <line x1={73} x2={73} y1={66} y2={82} stroke={LIENZO.ok} strokeWidth={2} />
          <text x={73} y={62} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Me = 20
          </text>

          {/* Indicador Media */}
          <line x1={121} x2={121} y1={70} y2={118} stroke={LIENZO.warn} strokeWidth={2} strokeDasharray="4 3" />
          <text x={127} y={82} textAnchor="start" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Media = 40
          </text>

          {/* Etiqueta valor extremo */}
          <text x={332} y={90} textAnchor="end" fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Extremo
          </text>

          {/* Guia: cuando conviene cada una */}
          <rect x={14} y={156} width={332} height={176} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={28} y={180} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            ¿Cuándo conviene usar cada medida?
          </text>
          <text x={28} y={208} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            • Media (x̄): datos sin extremos.
          </text>
          <text x={28} y={236} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            • Mediana (Me): si hay extremos.
          </text>
          <text x={28} y={264} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            • Moda (Mo): lo más repetido o grupos.
          </text>
          <text x={28} y={296} fill={LIENZO.fgDim} fontSize={13}>
            El 120 sube la media a 40, pero 4 de
          </text>
          <text x={28} y={316} fill={LIENZO.fgDim} fontSize={13}>
            los 5 datos son 30 o menos (Me = 20).
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Antes de hallar la mediana, <strong>ordena siempre los datos de menor a mayor</strong>.
        Tomar el número del medio sin ordenar la lista es la trampa más común en
        preguntas de estadística.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPosicion() {
  return (
    <EscenaRica>
      <Titulo>Medidas de posición y diagrama de caja</Titulo>

      <Puente>
        Ya viste que la mediana parte un conjunto ordenado en dos mitades
        iguales ($50\,\%$ debajo y $50\,\%$ encima). Las medidas de posición
        aplican la misma idea para dividir los datos en 4, 10 o 100 partes
        iguales.
      </Puente>

      <Definicion termino="Cuartiles, deciles y percentiles">
        Con los datos ordenados de menor a mayor:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Cuartiles ($Q_1, Q_2, Q_3$):</strong> 3 valores que dividen
            el conjunto en <strong>4 partes iguales</strong> ($25\,\%$ en cada
            una). $Q_1$ deja $25\,\%$ debajo, $Q_2$ deja $50\,\%$ (siempre es la
            mediana) y $Q_3$ deja $75\,\%$ debajo.
          </li>
          <li>
            <strong>Deciles ({"$D_1, D_2, \\dots, D_9$"}):</strong> 9 valores
            que dividen los datos en <strong>10 partes iguales</strong>{" "}
            ($10\,\%$ cada una). Así, $D_5 = Q_2 = Me$.
          </li>
          <li>
            <strong>Percentiles ({"$P_1, P_2, \\dots, P_{99}$"}):</strong> 99
            valores que dividen los datos en <strong>100 partes iguales</strong>{" "}
            ($1\,\%$ cada una). Cumplen {"$P_{25} = Q_1$"},{" "}
            {"$P_{50} = Q_2 = D_5 = Me$"} y {"$P_{75} = Q_3$"}.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Cómo hallar su posición y el rango intercuartílico">
        Para $n$ datos ordenados, el lugar donde cae cada medida es:
        <br />
        {"$\\text{Pos}(Q_m) = \\frac{m(n + 1)}{4}$"}, {" "}
        {"$\\text{Pos}(D_m) = \\frac{m(n + 1)}{10}$"} y{" "}
        {"$\\text{Pos}(P_k) = \\frac{k(n + 1)}{100}$"}.
        <br />
        Si la posición da un entero, tomas el dato de ese lugar; si cae a mitad
        entre dos enteros (por ejemplo $3,5$), promedias esos dos datos.
        <br />
        Con $n = 7$ datos ordenados ({"$2, 6, 8, 10, 12, 16, 20$"}), tenemos{" "}
        $n + 1 = 8$: {"$\\text{Pos}(Q_1) = \\frac{1 \\cdot 8}{4} = 2 \\Rightarrow Q_1 = 6$"},{" "}
        {"$\\text{Pos}(Q_2) = \\frac{2 \\cdot 8}{4} = 4 \\Rightarrow Q_2 = 10$"} y{" "}
        {"$\\text{Pos}(Q_3) = \\frac{3 \\cdot 8}{4} = 6 \\Rightarrow Q_3 = 16$"}.
        <br />
        El <strong>rango intercuartílico</strong> es $RIC = Q_3 - Q_1 = 16 - 6 = 10$
        {" "}y mide el ancho del $50\,\%$ central de los datos, sin afectarse por
        extremos.
      </Definicion>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 335" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Diagrama de caja (7 datos ordenados)
          </text>

          {/* Porcentajes de los 4 tramos: 52..109..166..251..308 */}
          <text x={80} y={56} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>25%</text>
          <text x={137} y={56} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>25%</text>
          <text x={208} y={56} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>25%</text>
          <text x={280} y={56} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>25%</text>

          {/* Bigote izquierdo: Min=2 (x=52) a Q1=6 (x=109) */}
          <line x1={52} x2={109} y1={102} y2={102} stroke={LIENZO.fg} strokeWidth={2} />
          <line x1={52} x2={52} y1={86} y2={118} stroke={LIENZO.fg} strokeWidth={2} />

          {/* Caja central: Q1=6 (109) a Q3=16 (251), ancho 142 */}
          <rect x={109} y={76} width={142} height={52} rx={4} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={2} />

          {/* Mediana Q2=10 (x=166) */}
          <line x1={166} x2={166} y1={76} y2={128} stroke={LIENZO.warn} strokeWidth={3} />

          {/* Bigote derecho: Q3=16 (251) a Max=20 (308) */}
          <line x1={251} x2={308} y1={102} y2={102} stroke={LIENZO.fg} strokeWidth={2} />
          <line x1={308} x2={308} y1={86} y2={118} stroke={LIENZO.fg} strokeWidth={2} />

          {/* Rotulos y valores debajo */}
          {[
            { x: 52, nom: "Mín", val: "2", c: LIENZO.fgDim },
            { x: 109, nom: "Q₁", val: "6", c: LIENZO.accent },
            { x: 166, nom: "Q₂", val: "10", c: LIENZO.warn },
            { x: 251, nom: "Q₃", val: "16", c: LIENZO.accent },
            { x: 308, nom: "Máx", val: "20", c: LIENZO.fgDim },
          ].map((p) => (
            <g key={p.nom}>
              <text x={p.x} y={150} textAnchor="middle" fill={p.c} fontSize={13} fontWeight={700}>{p.nom}</text>
              <text x={p.x} y={170} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{p.val}</text>
            </g>
          ))}

          {/* Resumen de equivalencias */}
          <rect x={14} y={192} width={332} height={132} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={28} y={216} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Equivalencias que debes recordar:
          </text>
          <text x={28} y={242} fill={LIENZO.fg} fontSize={13}>
            • Q₁ = P₂₅ (deja 25% debajo)
          </text>
          <text x={28} y={266} fill={LIENZO.fg} fontSize={13}>
            • Q₂ = D₅ = P₅₀ = Mediana (50%)
          </text>
          <text x={28} y={290} fill={LIENZO.fg} fontSize={13}>
            • Q₃ = P₇₅ (deja 75% debajo)
          </text>
          <text x={28} y={314} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            • RIC = Q₃ − Q₁ = 16 − 6 = 10
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Piensa en los cuartiles como los <strong>3 cortes</strong> de cuchillo
        necesarios para dividir un pan en <strong>4 trozos</strong> iguales: 3
        cuartiles dan 4 cuartos, 9 deciles dan 10 décimos y 99 percentiles dan
        100 centésimos.
      </Mnemotecnia>

      <Conexion>
        En pediatría y nutrición usarás percentiles a diario: si el peso de un
        niño está en {"$P_{75}$"}, iguala o supera al $75\,\%$ de los niños de su
        misma edad y sexo.
      </Conexion>
    </EscenaRica>
  );
}

function EscDispersion() {
  return (
    <EscenaRica>
      <Titulo>Medidas de dispersión</Titulo>

      <Puente>
        Dos grupos pueden tener exactamente el mismo promedio y comportarse muy
        distinto. Compara estas notas sobre 10: el <strong>Grupo A</strong>{" "}
        obtuvo $5, 5, 7, 7$ (media $= 6$) y el <strong>Grupo B</strong> obtuvo{" "}
        $2, 2, 10, 10$ (media $= 6$). Necesitas medidas que digan qué tan
        juntos o separados están los datos respecto a la media.
      </Puente>

      <Definicion termino="Rango, varianza y desviación estándar">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Rango ($R$):</strong> diferencia entre el máximo y el
            mínimo: {"$R = x_{\\text{máx}} - x_{\\text{mín}}$"}. Es rápido,
            pero solo mira los dos extremos. En el Grupo A es $7 - 5 = 2$; en el
            Grupo B es $10 - 2 = 8$.
          </li>
          <li>
            <strong>¿Por qué elevamos al cuadrado?</strong> Si solo sumas cada
            distancia a la media $(x_i - \mu)$, los signos positivos y negativos
            se cancelan y la suma siempre da $0$ (en el Grupo B:{" "}
            $(-4) + (-4) + 4 + 4 = 0$). Elevar al cuadrado hace todas las
            distancias positivas.
          </li>
          <li>
            <strong>Varianza poblacional ({"$\\sigma^2$"}) y muestral ($s^2$):</strong>{" "}
            promedian esas desviaciones al cuadrado. Cuando tienes toda la
            población de tamaño $N$, divides entre $N$:{" "}
            {"$\\sigma^2 = \\frac{\\sum (x_i - \\mu)^2}{N}$"}. Cuando trabajas
            con una muestra de tamaño $n$, divides entre $n - 1$ (corrección que
            evita subestimar la dispersión de la población):{" "}
            {"$s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n - 1}$"}. Queda en{" "}
            <strong>unidades al cuadrado</strong>.
          </li>
          <li>
            <strong>Desviación estándar ({"$\\sigma$"} o $s$):</strong> es la
            raíz cuadrada positiva de la varianza ({"$\\sigma = \\sqrt{\\sigma^2}$"}{" "}
            y {"$s = \\sqrt{s^2}$"}). Al tomar la raíz, vuelves a las{" "}
            <strong>mismas unidades</strong> de los datos originales.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Coeficiente de variación ($CV$)">
        Para comparar la dispersión de grupos con distintas unidades o medias
        muy diferentes (por ejemplo, pesos en gramos frente a pesos en
        kilogramos), divides la desviación estándar entre la media y expresas el
        resultado en porcentaje:{" "}
        {"$CV = \\frac{\\sigma}{\\mu} \\cdot 100\\,\\%$"} (o{" "}
        {"$CV = \\frac{s}{\\bar{x}} \\cdot 100\\,\\%$"} en una muestra). Como las
        unidades se cancelan, es un porcentaje puro: a <strong>menor $CV$</strong>,
        más homogéneos son los datos.
      </Definicion>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Misma media (μ = 6), distinta dispersión
          </text>

          {/* Linea vertical de media comun en x=180 */}
          <line x1={180} x2={180} y1={46} y2={212} stroke={LIENZO.warn} strokeWidth={1.8} strokeDasharray="4 4" />
          <text x={188} y={56} textAnchor="start" fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            μ = 6
          </text>

          {/* Grupo A: 5, 5, 7, 7 -> x = 30 + (v/12)*300 -> 5->155, 7->205 */}
          <text x={24} y={68} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Grupo A (juntos)
          </text>
          <line x1={30} x2={330} y1={110} y2={110} stroke={LIENZO.fg} strokeWidth={1.4} />
          <circle cx={155} cy={98} r={5.5} fill={LIENZO.ok} />
          <circle cx={155} cy={83} r={5.5} fill={LIENZO.ok} />
          <circle cx={205} cy={98} r={5.5} fill={LIENZO.ok} />
          <circle cx={205} cy={83} r={5.5} fill={LIENZO.ok} />
          <text x={155} y={128} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>5</text>
          <text x={205} y={128} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>7</text>

          {/* Grupo B: 2, 2, 10, 10 -> 2->80, 10->280 */}
          <text x={24} y={156} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Grupo B (dispersos)
          </text>
          <line x1={30} x2={330} y1={198} y2={198} stroke={LIENZO.fg} strokeWidth={1.4} />
          <circle cx={80} cy={186} r={5.5} fill={LIENZO.bad} />
          <circle cx={80} cy={171} r={5.5} fill={LIENZO.bad} />
          <circle cx={280} cy={186} r={5.5} fill={LIENZO.bad} />
          <circle cx={280} cy={171} r={5.5} fill={LIENZO.bad} />
          <text x={80} y={216} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>2</text>
          <text x={180} y={216} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>6</text>
          <text x={280} y={216} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>10</text>

          {/* Resumen numerico poblacional (N=4) */}
          <rect x={14} y={232} width={332} height={96} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={28} y={256} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Grupo A: R = 2 · σ² = 1 · σ = 1
          </text>
          <text x={28} y={282} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Grupo B: R = 8 · σ² = 16 · σ = 4
          </text>
          <text x={28} y={308} fill={LIENZO.fgDim} fontSize={13}>
            Menor σ y menor CV = datos más parejos
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        Fíjate siempre si el enunciado pide varianza <strong>poblacional</strong>{" "}
        (divides entre $N$) o <strong>muestral</strong> (divides entre $n - 1$).
        Usar el divisor equivocado te llevará a un distractor preparado a
        propósito en el examen.
      </Cuidado>
    </EscenaRica>
  );
}

function EscProbabilidad() {
  return (
    <EscenaRica>
      <Titulo>Probabilidad clásica, complemento, unión e independencia</Titulo>

      <Puente>
        Cuando lanzas un dado normal de 6 caras, todas tienen la misma chance de
        salir. Si buscas un número par ({"$\\{2, 4, 6\\}$"}), tienes 3 resultados
        a favor de 6 posibles: {"$\\frac{3}{6} = \\frac{1}{2} = 0,5$"} ($50\,\%$).
        Esa fracción es la probabilidad clásica.
      </Puente>

      <Definicion termino="Espacio muestral y regla de Laplace">
        El <strong>espacio muestral</strong> ({"$\\Omega$"}) reúne todos los
        resultados posibles de un experimento aleatorio, y un{" "}
        <strong>suceso</strong> $A$ es cualquier subconjunto de {"$\\Omega$"}.
        Cuando todos los resultados son igualmente probables, aplica la{" "}
        <strong>regla de Laplace</strong>:
        <br />
        {"$P(A) = \\frac{\\text{casos favorables}}{\\text{casos posibles}}$"}
        <br />
        Toda probabilidad cumple {"$0 \\le P(A) \\le 1$"}. Si $P(A) = 0$, el
        suceso es <strong>imposible</strong>; si $P(A) = 1$, es{" "}
        <strong>seguro</strong>.
      </Definicion>

      <Definicion termino="Complemento, unión e independencia">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Suceso contrario o complemento ($A^c$):</strong> es que NO
            ocurra $A$. Como $A$ y $A^c$ cubren todo sin superponerse, suman $1$:
            {" "}$P(A^c) = 1 - P(A)$. Cuando te pidan &ldquo;al menos uno&rdquo;,
            suele ser más rápido calcular {"$1 - P(\\text{ninguno})$"}.
          </li>
          <li>
            <strong>Unión de sucesos ({"$A \\cup B$"}, &ldquo;$A$ o $B$&rdquo;):</strong>{" "}
            al sumar $P(A) + P(B)$, los casos donde ocurren ambos a la vez
            ({"$A \\cap B$"}) se cuentan dos veces, por eso se restan una vez:{" "}
            {"$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$"}. Si no pueden ocurrir
            a la vez (<strong>mutuamente excluyentes</strong>,{" "}
            {"$A \\cap B = \\emptyset$"}), entonces {"$P(A \\cap B) = 0$"} y
            queda {"$P(A \\cup B) = P(A) + P(B)$"}.
          </li>
          <li>
            <strong>Sucesos independientes (&ldquo;$A$ y $B$&rdquo;):</strong>{" "}
            son independientes cuando saber que ocurrió uno no altera la
            probabilidad del otro (como lanzar dos dados o sacar cartas con
            reposición). Solo en ese caso multiplicas:{" "}
            {"$P(A \\cap B) = P(A) \\cdot P(B)$"}.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 360 345" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Dado (Ω = 1 a 6): unión e intersección
          </text>

          {/* Espacio muestral y diagrama de Venn */}
          <rect x={24} y={36} width={312} height={136} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
          <circle cx={142} cy={108} r={48} fill="var(--dib-cyan-500)" opacity={0.16} stroke="var(--dib-cyan-500)" strokeWidth={1.8} />
          <circle cx={218} cy={108} r={48} fill={LIENZO.warn} opacity={0.16} stroke={LIENZO.warn} strokeWidth={1.8} />

          <text x={74} y={56} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>A: par</text>
          <text x={232} y={56} fill={LIENZO.warn} fontSize={13} fontWeight={700}>B: mayor a 4</text>

          <text x={114} y={113} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>2, 4</text>
          <text x={180} y={113} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>6</text>
          <text x={246} y={113} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>5</text>

          <text x={324} y={162} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>Fuera: 1, 3</text>

          {/* Cuadro de las 4 reglas */}
          <rect x={14} y={186} width={332} height={146} rx={8} fill={LIENZO.ok} opacity={0.08} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={210} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Las 4 reglas clave de probabilidad:
          </text>
          <text x={28} y={236} fill={LIENZO.fg} fontSize={13}>
            • P(A) = favorables / posibles
          </text>
          <text x={28} y={260} fill={LIENZO.fg} fontSize={13}>
            • Contrario: P(Aᶜ) = 1 − P(A)
          </text>
          <text x={28} y={284} fill={LIENZO.fg} fontSize={13}>
            • Unión: P(A∪B) = P(A)+P(B)−P(A∩B)
          </text>
          <text x={28} y={308} fill={LIENZO.fg} fontSize={13}>
            • Independientes: P(A∩B) = P(A)·P(B)
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        No confundas <strong>mutuamente excluyentes</strong> con{" "}
        <strong>independientes</strong>. Si dos sucesos (con probabilidad mayor
        que $0$) son mutuamente excluyentes, que ocurra uno impide al otro
        ({"$P(A \\cap B) = 0 \\ne P(A) \\cdot P(B)$"}): por lo tanto son
        dependientes.
      </Cuidado>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Media, mediana, desviación estándar y CV">
        <p className="mb-2">
          Las puntuaciones de los 5 integrantes completos de un equipo piloto
          son: $13, 7, 11, 9, 10$. Calcula la media poblacional ($\mu$), la
          mediana ($Me$), la desviación estándar poblacional ($\sigma$) y el
          coeficiente de variación ($CV$).
        </p>
        <p className="text-sm">
          <strong>Paso 1 (Media):</strong> sumamos los $N = 5$ datos:{" "}
          {"$\\mu = \\frac{13 + 7 + 11 + 9 + 10}{5} = \\frac{50}{5} = 10$"}.
          <br />
          <strong>Paso 2 (Mediana):</strong> ordenamos de menor a mayor:{" "}
          $7, 9, 10, 11, 13$. Como $N = 5$ es impar, tomamos la posición{" "}
          {"$\\frac{5 + 1}{2} = 3$"}: $Me = 10$.
          <br />
          <strong>Paso 3 (Varianza y desviación estándar):</strong> calculamos
          cada desviación al cuadrado respecto a $\mu = 10$:
          <br />
          $(7 - 10)^2 = 9$, $(9 - 10)^2 = 1$, $(10 - 10)^2 = 0$,{" "}
          $(11 - 10)^2 = 1$, $(13 - 10)^2 = 9$.
          <br />
          Suma $= 9 + 1 + 0 + 1 + 9 = 20$. Dividimos entre $N = 5$:{" "}
          {"$\\sigma^2 = \\frac{20}{5} = 4$"} y{" "}
          {"$\\sigma = \\sqrt{4} = 2$"}.
          <br />
          <strong>Paso 4 (Coeficiente de variación):</strong>{" "}
          {"$CV = \\frac{\\sigma}{\\mu} \\cdot 100\\,\\% = \\frac{2}{10} \\cdot 100\\,\\% = 20\\,\\%$"}.
          <br />
          <strong>Respuesta:</strong>{" "}
          <strong>
            {"$\\mu = 10$"}, $Me = 10$, {"$\\sigma = 2$"} y $CV = 20\,\%$
          </strong>.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Probabilidad de la unión (regla de la suma)">
        <p className="mb-2">
          De una urna con 20 bolillas numeradas del $1$ al $20$ se extrae una al
          azar. ¿Cuál es la probabilidad de sacar un múltiplo de $4$ o un número
          mayor que $15$?
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> definimos los sucesos sobre $20$ casos
          posibles:
          <br />
          {"$A = \\text{múltiplo de } 4 = \\{4, 8, 12, 16, 20\\}$"} (5 casos:{" "}
          {"$P(A) = \\frac{5}{20}$"}).
          <br />
          {"$B = \\text{mayor que } 15 = \\{16, 17, 18, 19, 20\\}$"} (5 casos:{" "}
          {"$P(B) = \\frac{5}{20}$"}).
          <br />
          <strong>Paso 2:</strong> identificamos la intersección (cumplen ambas
          condiciones): {"$A \\cap B = \\{16, 20\\}$"} (2 casos:{" "}
          {"$P(A \\cap B) = \\frac{2}{20}$"}).
          <br />
          <strong>Paso 3:</strong> aplicamos la regla de la unión:{" "}
          {"$P(A \\cup B) = \\frac{5}{20} + \\frac{5}{20} - \\frac{2}{20} = \\frac{8}{20} = \\frac{2}{5} = 0,4$"}.
          <br />
          <strong>Respuesta:</strong> <strong>{"$\\frac{2}{5}$"} ($40\,\%$)</strong>.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 3 · Sucesos independientes y complemento">
        <p className="mb-2">
          Dos pruebas rápidas independientes detectan un virus con probabilidad{" "}
          $0,8$ (prueba $A$) y $0,6$ (prueba $B$). Halla la probabilidad de que
          ambas lo detecten y la probabilidad de que al menos una lo detecte.
        </p>
        <p className="text-sm">
          <strong>Paso 1 (Ambas lo detectan):</strong> por independencia,
          multiplicamos:{" "}
          {"$P(A \\cap B) = P(A) \\cdot P(B) = 0,8 \\cdot 0,6 = 0,48$"} ($48\,\%$).
          <br />
          <strong>Paso 2 (Al menos una lo detecta):</strong> usamos el suceso
          contrario (&ldquo;ninguna lo detecta&rdquo;). Las probabilidades de
          fallo son $P(A^c) = 1 - 0,8 = 0,2$ y $P(B^c) = 1 - 0,6 = 0,4$.
          <br />
          Como son independientes,{" "}
          {"$P(\\text{ninguna}) = 0,2 \\cdot 0,4 = 0,08$"}.
          <br />
          Entonces{" "}
          {"$P(\\text{al menos una}) = 1 - 0,08 = 0,92$"} ($92\,\%$).
          <br />
          <strong>Comprobación:</strong>{" "}
          {"$P(A \\cup B) = 0,8 + 0,6 - 0,48 = 0,92$"}.
          <br />
          <strong>Respuesta:</strong> <strong>$0,48$ (ambas) y $0,92$ (al menos una)</strong>.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La mediana es el número del medio tal como viene la lista'">
        <strong>Realidad:</strong> primero debes ordenar de menor a mayor. En{" "}
        {"$\\{12, 2, 8\\}$"}, el dato central sin ordenar es $2$, pero al ordenar{" "}
        {"$\\{2, 8, 12\\}$"} ves que la mediana real es $8$.
      </Misconception>

      <Misconception titulo="Error 2 · 'La desviación estándar puede ser negativa'">
        <strong>Realidad:</strong> cada diferencia $(x_i - \mu)$ se eleva al
        cuadrado antes de sumarse, así que la varianza y la desviación estándar
        son siempre mayores o iguales que $0$ ({"$\\sigma^2 \\ge 0$"} y{" "}
        {"$\\sigma \\ge 0$"}). Solo valen $0$ cuando todos los datos son
        idénticos.
      </Misconception>

      <Misconception titulo="Error 3 · 'Para hallar P(A o B) siempre basta sumar P(A) + P(B)'">
        <strong>Realidad:</strong> eso solo vale si $A$ y $B$ son mutuamente
        excluyentes. Si pueden ocurrir a la vez, tienes que restar la
        intersección: {"$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$"}; de lo
        contrario cuentas dos veces los casos comunes y hasta podrías superar
        $1$.
      </Misconception>

      <Resumen>
        Media: {"$\\bar{x} = \\frac{\\sum x_i}{n}$"} (sensible a extremos);
        mediana {"$Me = Q_2 = D_5 = P_{50}$"} (ordena primero); moda $Mo$ (más
        repetido). Dispersión: {"$R = x_{\\text{máx}} - x_{\\text{mín}}$"},{" "}
        {"$\\sigma^2 = \\frac{\\sum (x_i - \\mu)^2}{N}$"},{" "}
        {"$s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n - 1}$"}, desviación = raíz
        de la varianza, {"$CV = \\frac{\\sigma}{\\mu} \\cdot 100\\,\\%$"}.
        Probabilidad: {"$P(A^c) = 1 - P(A)$"},{" "}
        {"$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$"} y, si son
        independientes, {"$P(A \\cap B) = P(A) \\cdot P(B)$"}.
      </Resumen>

      <AutoCheck
        pregunta="Las notas de 6 estudiantes fueron: 20, 4, 10, 6, 8 y 12. ¿Cuál es la mediana (Me)?"
        opciones={["8", "9", "10", "12"]}
        correctaIdx={1}
        explicacion="Primero ordenas los 6 datos de menor a mayor: 4, 6, 8, 10, 12, 20. Como n = 6 es par, promedias los dos valores centrales (posiciones 3 y 4): (8 + 10) / 2 = 9. (10 es la media aritmética, no la mediana)."
      />

      <AutoCheck
        pregunta="Dado el conjunto ordenado de 7 datos: 5, 8, 11, 14, 18, 22, 25, ¿cuál es el tercer cuartil (Q₃)?"
        opciones={["8", "14", "18", "22"]}
        correctaIdx={3}
        explicacion="Con n = 7 datos ordenados, la posición de Q₃ es 3·(7 + 1) / 4 = 6. El sexto dato de la lista es 22. (8 es Q₁ y 14 es Q₂ o mediana)."
      />

      <AutoCheck
        pregunta="En una muestra de 5 mediciones: 2, 4, 6, 8 y 10 (con media 6), ¿cuál es la varianza muestral (s²)?"
        opciones={["10", "8", "6", "40"]}
        correctaIdx={0}
        explicacion="Las desviaciones respecto a 6 son −4, −2, 0, 2 y 4. Sus cuadrados suman 16 + 4 + 0 + 4 + 16 = 40. Como pide varianza muestral, divides entre n − 1 = 4: s² = 40 / 4 = 10. (Dividir entre 5 daría 8, que es la varianza poblacional)."
      />

      <AutoCheck
        pregunta="Si P(A) = 0,5, P(B) = 0,4 y P(A ∩ B) = 0,15, ¿cuánto vale P(A ∪ B)?"
        opciones={["0,90", "0,20", "0,75", "0,60"]}
        correctaIdx={2}
        explicacion="Aplicas la regla de la unión restando la intersección para no contarla dos veces: P(A ∪ B) = 0,5 + 0,4 − 0,15 = 0,75."
      />

      <AutoCheck
        pregunta="Se lanzan dos dados normales e independientes. ¿Cuál es la probabilidad de obtener un 6 en el primer dado y un número par en el segundo?"
        opciones={["2/3", "1/12", "1/6", "1/36"]}
        correctaIdx={1}
        explicacion="La probabilidad de sacar 6 en el primer dado es 1/6 y la de sacar par (2, 4 o 6) en el segundo es 3/6 = 1/2. Como son independientes, multiplicas: (1/6) · (1/2) = 1/12."
      />
    </EscenaRica>
  );
}
