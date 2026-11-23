"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, Puente, PorQue, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="MAT-24"
      tituloUnidad="Análisis combinatorio y Binomio de Newton"
      escenas={[
        { titulo: "Principios de conteo y factorial", componente: EscConteoFactorial },
        { titulo: "Permutaciones simples y con repetición", componente: EscPermutaciones },
        { titulo: "Variaciones frente a combinaciones", componente: EscVariacionesCombinaciones },
        { titulo: "Triángulo de Pascal y Binomio de Newton", componente: EscPascalBinomio },
        { titulo: "Ejemplos resueltos tipo examen", componente: EscEjemplos },
        { titulo: "Errores comunes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscConteoFactorial() {
  return (
    <EscenaRica>
      <Titulo>Principios de conteo y factorial</Titulo>

      <Hook>
        Si tienes $3$ camisas y $2$ pantalones, no hace falta dibujar todos los
        conjuntos para saber que puedes vestirte de $6$ maneras. El análisis
        combinatorio te da reglas exactas para contar sin enlistar caso por
        caso.
      </Hook>

      <Puente>
        Antes de usar fórmulas, fíjate en la palabra clave del problema. Para ir
        a la universidad puedes tomar $3$ líneas de trufi <strong>o</strong> $2$
        líneas de micro: como solo subes a un vehículo, sumas ($3 + 2 = 5$). En
        cambio, para vestirte eliges una camisa <strong>y</strong> un pantalón:
        como son dos decisiones encadenadas, multiplicas ($3 \cdot 2 = 6$).
      </Puente>

      <Definicion termino="Principio aditivo y principio multiplicativo">
        <strong>Principio aditivo (&ldquo;o&rdquo;, sucesos excluyentes):</strong>{" "}
        si una tarea puede realizarse de $m$ formas o de $n$ formas y ambas no
        pueden ocurrir a la vez, existen $m + n$ maneras en total.
        <br />
        <strong>Principio multiplicativo (&ldquo;y&rdquo;, etapas sucesivas):</strong>{" "}
        si una tarea consta de una primera etapa con $m$ opciones y una segunda
        etapa con $n$ opciones, existen {"$m \\cdot n$"} maneras en total.
      </Definicion>

      <Pizarra alto={303}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Principios de conteo y casillas
          </text>

          <rect x={14} y={38} width={332} height={96} rx={8} fill="var(--dib-cyan-500)" opacity={0.1} stroke="var(--dib-cyan-500)" strokeWidth={1.4} />
          <text x={28} y={60} fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>
            1. Principio aditivo (&ldquo;o&rdquo;, excluyentes)
          </text>
          <text x={28} y={84} fill={LIENZO.fg} fontSize={13}>
            3 trufis O 2 micros (eliges solo uno)
          </text>
          <text x={28} y={110} fill="var(--dib-cyan-500)" fontSize={14} fontWeight={700}>
            Total: 3 + 2 = 5 opciones
          </text>

          <rect x={14} y={148} width={332} height={188} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={28} y={170} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            2. Principio multiplicativo (&ldquo;y&rdquo;, etapas)
          </text>
          <text x={28} y={194} fill={LIENZO.fg} fontSize={13}>
            Clave de 3 cifras distintas (1, 2, 3, 4):
          </text>

          <rect x={36} y={210} width={68} height={42} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={70} y={237} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}>4</text>
          <text x={70} y={270} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>1.ª cifra</text>

          <text x={122} y={237} textAnchor="middle" fill={LIENZO.ok} fontSize={16} fontWeight={700}>×</text>

          <rect x={140} y={210} width={68} height={42} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={174} y={237} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}>3</text>
          <text x={174} y={270} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>2.ª cifra</text>

          <text x={226} y={237} textAnchor="middle" fill={LIENZO.ok} fontSize={16} fontWeight={700}>×</text>

          <rect x={244} y={210} width={68} height={42} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={278} y={237} textAnchor="middle" fill={LIENZO.fg} fontSize={16} fontWeight={700}>2</text>
          <text x={278} y={270} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>3.ª cifra</text>

          <text x={180} y={302} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            Total: 4 × 3 × 2 = 24 claves
          </text>
          <text x={180} y={324} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Cada casilla baja en 1 al no repetir
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Factorial de un número natural ($n!$)">
        Para un entero positivo $n$, el <strong>factorial</strong> $n!$ es el
        producto de todos los enteros positivos desde $n$ hasta $1$:
        <br />
        {"$n! = n \\cdot (n - 1) \\cdot (n - 2) \\cdots 2 \\cdot 1$"}
        <br />
        Primeros valores: $1! = 1$, $2! = 2$, $3! = 6$, $4! = 24$, $5! = 120$.
      </Definicion>

      <PorQue>
        <strong>¿Por qué $0! = 1$ y no $0$?</strong> Observa que{" "}
        {"$n! = n \\cdot (n - 1)!$"}, de modo que{" "}
        {"$(n - 1)! = \\dfrac{n!}{n}$"}. Comprobamos con valores conocidos:{" "}
        {"$3! = \\dfrac{4!}{4} = \\dfrac{24}{4} = 6$"},{" "}
        {"$2! = \\dfrac{3!}{3} = \\dfrac{6}{3} = 2$"} y{" "}
        {"$1! = \\dfrac{2!}{2} = \\dfrac{2}{2} = 1$"}. Al aplicar un paso más
        con $n = 1$, resulta {"$0! = \\dfrac{1!}{1} = \\dfrac{1}{1} = 1$"}.
        Además, solo existe $1$ forma de ordenar $0$ objetos (no colocar nada).
      </PorQue>

      <Parrafo>
        En los exámenes casi nunca necesitas calcular factoriales enormes:
        desarrollas el mayor hasta igualar el menor y cancelas. Por ejemplo:{" "}
        {"$\\dfrac{8!}{6!} = \\dfrac{8 \\cdot 7 \\cdot 6!}{6!} = 8 \\cdot 7 = 56$"},{" "}
        y{" "}
        {"$\\dfrac{7!}{5!\\,2!} = \\dfrac{7 \\cdot 6 \\cdot 5!}{5! \\cdot 2 \\cdot 1} = \\dfrac{42}{2} = 21$"}.
      </Parrafo>
    </EscenaRica>
  );
}

function EscPermutaciones() {
  return (
    <EscenaRica>
      <Titulo>Permutaciones simples y con repetición</Titulo>

      <Puente>
        Imagina que tienes $4$ libros distintos para poner en fila en un
        estante. En el primer lugar caben $4$ libros; una vez colocado el
        primero, quedan $3$ para el segundo, $2$ para el tercero y $1$ para el
        último. Por el principio multiplicativo hay{" "}
        {"$4 \\cdot 3 \\cdot 2 \\cdot 1 = 4! = 24$"} ordenamientos.
      </Puente>

      <Definicion termino="Permutación simple ($P_n$)">
        Una <strong>permutación simple</strong> cuenta de cuántas maneras
        puedes ordenar <strong>todos</strong> los $n$ elementos distintos en una
        fila (importa el orden y entran todos):
        <br />
        {"$P_n = n!$"}
      </Definicion>

      <Pizarra alto={286}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Permutaciones: todos entran con orden
          </text>

          <rect x={14} y={38} width={332} height={130} rx={8} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={28} y={62} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Permutación simple: Pₙ = n!
          </text>
          <text x={28} y={86} fill={LIENZO.fg} fontSize={13}>
            Ordenar 3 letras distintas (A, B, C):
          </text>

          <rect x={36} y={98} width={50} height={32} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={61} y={119} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>3</text>
          <text x={97} y={119} textAnchor="middle" fill={LIENZO.accent} fontSize={15} fontWeight={700}>×</text>

          <rect x={108} y={98} width={50} height={32} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={133} y={119} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>2</text>
          <text x={169} y={119} textAnchor="middle" fill={LIENZO.accent} fontSize={15} fontWeight={700}>×</text>

          <rect x={180} y={98} width={50} height={32} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={205} y={119} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>1</text>

          <text x={284} y={119} textAnchor="middle" fill={LIENZO.accent} fontSize={15} fontWeight={700}>= 3! = 6</text>

          <text x={28} y={154} fill={LIENZO.fgDim} fontSize={13}>
            ABC, ACB, BAC, BCA, CAB, CBA (6 formas)
          </text>

          <rect x={14} y={182} width={332} height={134} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.4} />
          <text x={28} y={206} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Con repetición: P = n! / (a! · b! · ...)
          </text>
          <text x={28} y={230} fill={LIENZO.fg} fontSize={13}>
            Anagramas de ANA (n = 3, dos letras A):
          </text>
          <text x={28} y={258} fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            P = 3! / 2! = 6 / 2 = 3 palabras
          </text>
          <text x={28} y={284} fill={LIENZO.fgDim} fontSize={13}>
            ANA, AAN, NAA (cambiar las A entre sí
          </text>
          <text x={28} y={302} fill={LIENZO.fgDim} fontSize={13}>
            no genera una palabra nueva).
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Permutación con repetición">
        Si ordenas $n$ elementos donde uno se repite $a$ veces, otro $b$ veces y
        así sucesivamente, el número de ordenamientos distintos es:
        <br />
        {"$P_n^{a,b,\\dots} = \\dfrac{n!}{a!\\,b!\\cdots}$"}
      </Definicion>

      <PorQue>
        <strong>¿Por qué dividimos entre $a!$ y $b!$?</strong> Si pintaras de
        distinto color las letras repetidas de <strong>MAMA</strong> ($n = 4$,
        dos M y dos A), habría $4! = 24$ filas. Pero al quitar los colores,
        intercambiar las dos M entre sí ($2!$ formas) o las dos A entre sí
        ($2!$ formas) produce exactamente la misma palabra. Al dividir entre
        esos duplicados quedan{" "}
        {"$P_4^{2,2} = \\dfrac{4!}{2!\\,2!} = \\dfrac{24}{2 \\cdot 2} = 6$"}:
        MAMA, MAAM, MMAA, AMMA, AMAM y AAMM.
      </PorQue>
    </EscenaRica>
  );
}

function EscVariacionesCombinaciones() {
  return (
    <EscenaRica>
      <Titulo>Variaciones frente a combinaciones</Titulo>

      <Puente>
        Ahora tienes $5$ postulantes y solo elegirás a $2$ ($k = 2$, no entran
        todos). Compara dos preguntas distintas: si eliges{" "}
        <strong>presidente y secretario</strong>, (Ana, Luis) es distinto de
        (Luis, Ana). Si eliges una <strong>comisión de 2 personas sin cargos</strong>,
        el grupo de Ana y Luis es el mismo que el de Luis y Ana.
      </Puente>

      <Definicion termino="Variaciones simples ($V_n^k$) y con repetición ($VR_n^k$)">
        En las <strong>variaciones</strong> eliges $k$ elementos de $n$
        disponibles y <strong>sí importa el orden</strong>:
        <br />
        <strong>Variación simple (sin repetición):</strong> llenas $k$ casillas
        bajando de uno en uno,{" "}
        {"$V_n^k = n(n - 1)\\cdots(n - k + 1) = \\dfrac{n!}{(n - k)!}$"}. Para
        presidente y secretario entre $5$: {"$V_5^2 = \\dfrac{5!}{3!} = 5 \\cdot 4 = 20$"}.
        <br />
        <strong>Variación con repetición:</strong> si cada casilla puede volver
        a usar cualquiera de los $n$ elementos, {"$VR_n^k = n^k$"}. Por ejemplo,
        claves de $3$ dígitos con {"$\\{1, 2, 3, 4, 5\\}$"} pudiendo repetir:{" "}
        {"$VR_5^3 = 5^3 = 125$"}.
      </Definicion>

      <Definicion termino="Combinaciones simples ($C_n^k$) y números combinatorios">
        En una <strong>combinación</strong> eliges $k$ elementos de $n$ sin
        repetición y <strong>no importa el orden</strong>. Como en $V_n^k$ cada
        grupo de $k$ elementos se contó $k!$ veces (una por cada orden posible),
        dividimos entre $k!$:
        <br />
        {"$C_n^k = \\binom{n}{k} = \\dfrac{V_n^k}{k!} = \\dfrac{n!}{k!\\,(n - k)!}$"}
        <br />
        Para la comisión de $2$ entre $5$:{" "}
        {"$C_5^2 = \\binom{5}{2} = \\dfrac{5!}{2!\\,3!} = \\dfrac{5 \\cdot 4}{2 \\cdot 1} = 10$"}.
      </Definicion>

      <Pizarra alto={308}>
        <svg width="100%" height="100%" viewBox="0 0 360 355" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Árbol de decisión: ¿qué fórmula usar?
          </text>

          {/* Nodo raíz */}
          <rect x={70} y={34} width={220} height={36} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fg} strokeWidth={1.5} />
          <text x={180} y={57} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Importa el orden?
          </text>

          {/* Ramas desde la raíz */}
          <line x1={125} y1={70} x2={84} y2={114} stroke={LIENZO.ok} strokeWidth={1.8} />
          <text x={82} y={96} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>NO</text>

          <line x1={235} y1={70} x2={267} y2={114} stroke={LIENZO.accent} strokeWidth={1.8} />
          <text x={272} y={96} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>SÍ</text>

          {/* Caja Combinación */}
          <rect x={12} y={114} width={144} height={90} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={84} y={136} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>COMBINACIÓN</text>
          <text x={84} y={158} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>n! / (k!(n−k)!)</text>
          <text x={84} y={178} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>No importa orden</text>
          <text x={84} y={196} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Ej: comisiones</text>

          {/* Nodo 2: ¿Entran todos? */}
          <rect x={186} y={114} width={162} height={44} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.5} />
          <text x={267} y={133} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>¿Entran todos</text>
          <text x={267} y={150} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>los elementos?</text>

          {/* Conectores ortogonales sin cruces */}
          <line x1={267} y1={158} x2={267} y2={218} stroke={LIENZO.accent} strokeWidth={1.8} />
          <line x1={93} y1={218} x2={267} y2={218} stroke={LIENZO.accent} strokeWidth={1.8} />
          <line x1={93} y1={218} x2={93} y2={248} stroke={LIENZO.warn} strokeWidth={1.8} />
          <line x1={267} y1={218} x2={267} y2={248} stroke="var(--dib-cyan-500)" strokeWidth={1.8} />

          <text x={100} y={238} textAnchor="start" fill={LIENZO.warn} fontSize={13} fontWeight={700}>SÍ (k = n)</text>
          <text x={274} y={238} textAnchor="start" fill="var(--dib-cyan-500)" fontSize={13} fontWeight={700}>NO (k &lt; n)</text>

          {/* Caja Permutación */}
          <rect x={12} y={248} width={162} height={100} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} />
          <text x={93} y={270} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>PERMUTACIÓN</text>
          <text x={93} y={294} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Simple: Pₙ = n!</text>
          <text x={93} y={316} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Con rep.: n!/(a!b!)</text>
          <text x={93} y={338} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Ej: fila, anagrama</text>

          {/* Caja Variación */}
          <rect x={186} y={248} width={162} height={100} rx={8} fill="var(--dib-cyan-500)" opacity={0.1} stroke="var(--dib-cyan-500)" strokeWidth={1.5} />
          <text x={267} y={270} textAnchor="middle" fill="var(--dib-cyan-500)" fontSize={14} fontWeight={700}>VARIACIÓN</text>
          <text x={267} y={294} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Simple: n! / (n−k)!</text>
          <text x={267} y={316} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>Con rep.: VR = nᵏ</text>
          <text x={267} y={338} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Ej: podio, claves</text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        Dos atajos con números combinatorios que ahorran tiempo:{" "}
        {"$\\binom{n}{0} = \\binom{n}{n} = 1$"} (solo hay $1$ forma de elegir
        ninguno o todos), y la <strong>simetría</strong>{" "}
        {"$\\binom{n}{k} = \\binom{n}{n - k}$"} (elegir los $k$ que entran
        equivale a elegir los $n - k$ que quedan fuera). Así,{" "}
        {"$\\binom{10}{8} = \\binom{10}{2} = \\dfrac{10 \\cdot 9}{2} = 45$"}.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPascalBinomio() {
  return (
    <EscenaRica>
      <Titulo>Triángulo de Pascal y Binomio de Newton</Titulo>

      <Puente>
        Ya conoces de memoria $(a + b)^2 = a^2 + 2ab + b^2$ y{" "}
        $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$. ¿De dónde salen los
        coeficientes $1, 3, 3, 1$ y cómo calcular un término de $(a + b)^8$ sin
        multiplicar ocho paréntesis a mano?
      </Puente>

      <PorQue>
        Al expandir {"$(a + b)^n = (a + b)(a + b)\\cdots(a + b)$"} ($n$
        factores), cada término se forma eligiendo $a$ o $b$ en cada paréntesis.
        Para obtener {"$a^{n-k}b^k$"} debes escoger la letra $b$ en exactamente
        $k$ de los $n$ paréntesis, sin importar el orden: eso ocurre de{" "}
        {"$\\binom{n}{k}$"} maneras. Por eso los coeficientes del binomio son
        números combinatorios.
      </PorQue>

      <Pizarra alto={295}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Triángulo de Pascal (n = 0 hasta n = 4)
          </text>

          {/* Etiquetas de fila */}
          {[0, 1, 2, 3, 4].map((n) => (
            <text key={n} x={22} y={59 + n * 50} fill={LIENZO.fgDim} fontSize={13} fontWeight={600}>
              n = {n}
            </text>
          ))}

          {/* Enlaces de suma destacados en fila 3 -> fila 4 */}
          <line x1={124} y1={220} x2={151} y2={238} stroke={LIENZO.ok} strokeWidth={2} />
          <line x1={178} y1={220} x2={151} y2={238} stroke={LIENZO.ok} strokeWidth={2} />
          <text x={151} y={209} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>+</text>

          <line x1={178} y1={220} x2={205} y2={238} stroke={LIENZO.accent} strokeWidth={2} />
          <line x1={232} y1={220} x2={205} y2={238} stroke={LIENZO.accent} strokeWidth={2} />
          <text x={205} y={209} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>+</text>

          {/* Fila 0 */}
          <circle cx={205} cy={54} r={16} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
          <text x={205} y={59} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>1</text>

          {/* Fila 1 */}
          {[178, 232].map((cx, idx) => (
            <g key={idx}>
              <circle cx={cx} cy={104} r={16} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
              <text x={cx} y={109} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>1</text>
            </g>
          ))}

          {/* Fila 2 */}
          {[
            { cx: 151, v: "1" },
            { cx: 205, v: "2" },
            { cx: 259, v: "1" },
          ].map((c, idx) => (
            <g key={idx}>
              <circle cx={c.cx} cy={154} r={16} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
              <text x={c.cx} y={159} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>{c.v}</text>
            </g>
          ))}

          {/* Fila 3 */}
          {[
            { cx: 124, v: "1", s: LIENZO.ok },
            { cx: 178, v: "3", s: LIENZO.accent },
            { cx: 232, v: "3", s: LIENZO.accent },
            { cx: 286, v: "1", s: LIENZO.fgFaint },
          ].map((c, idx) => (
            <g key={idx}>
              <circle cx={c.cx} cy={204} r={16} fill={LIENZO.bgSoft} stroke={c.s} strokeWidth={1.5} />
              <text x={c.cx} y={209} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>{c.v}</text>
            </g>
          ))}

          {/* Fila 4 */}
          {[
            { cx: 97, v: "1", f: LIENZO.bgSoft, s: LIENZO.fgFaint, tc: LIENZO.fg },
            { cx: 151, v: "4", f: LIENZO.ok, s: LIENZO.ok, tc: LIENZO.ok },
            { cx: 205, v: "6", f: LIENZO.accent, s: LIENZO.accent, tc: LIENZO.accent },
            { cx: 259, v: "4", f: LIENZO.bgSoft, s: LIENZO.fgFaint, tc: LIENZO.fg },
            { cx: 313, v: "1", f: LIENZO.bgSoft, s: LIENZO.fgFaint, tc: LIENZO.fg },
          ].map((c, idx) => (
            <g key={idx}>
              <circle cx={c.cx} cy={254} r={16} fill={c.f} fillOpacity={c.f === LIENZO.bgSoft ? 1 : 0.14} stroke={c.s} strokeWidth={1.6} />
              <text x={c.cx} y={259} textAnchor="middle" fill={c.tc} fontSize={14} fontWeight={700}>{c.v}</text>
            </g>
          ))}

          <rect x={14} y={284} width={332} height={46} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.3} />
          <text x={180} y={303} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Cada número = suma de los dos de arriba
          </text>
          <text x={180} y={322} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Fila n = 4: 1+3 = 4  |  3+3 = 6  |  3+1 = 4
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Binomio de Newton y término general ($T_{k+1}$)">
        El desarrollo completo de $(a + b)^n$ tiene siempre{" "}
        <strong>$n + 1$ términos</strong>:
        <br />
        {"$(a + b)^n = \\binom{n}{0}a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\cdots + \\binom{n}{n}b^n$"}
        <br />
        Para hallar directamente un término cualquiera sin desarrollar todo,
        usas la <strong>fórmula del término general</strong> (para{" "}
        {"$k = 0, 1, 2, \\dots, n$"}):
        <br />
        {"$T_{k+1} = \\binom{n}{k}\\, a^{n-k}\\, b^k$"}
      </Definicion>

      <Cuidado>
        El primer término es $T_1$ y corresponde a $k = 0$, el segundo es $T_2$
        ($k = 1$), el tercero es $T_3$ ($k = 2$). Por eso, si te piden el
        término número $r$, el valor que entra en la fórmula es $k = r - 1$. Y
        si el binomio es una resta $(a - b)^n$, recuerda incluir el signo menos
        dentro de $b$: sustituyes $(-b)^k$.
      </Cuidado>

      <Conexion>
        En probabilidad y genética mendeliana, el Binomio de Newton permite
        calcular la probabilidad de obtener exactamente $k$ éxitos en $n$
        ensayos independientes (distribución binomial).
      </Conexion>
    </EscenaRica>
  );
}

function EscEjemplos() {
  return (
    <EscenaRica>
      <Titulo>Ejemplos resueltos tipo examen</Titulo>

      <WorkedExample titulo="Ejemplo 1 · Comité mixto (Combinaciones y principio multiplicativo)">
        <p className="mb-2">
          En un laboratorio hay $6$ mujeres y $4$ varones. ¿De cuántas maneras
          se puede formar un equipo de $3$ integrantes con exactamente $2$
          mujeres y $1$ varón?
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Dentro del grupo de mujeres no hay cargos
          distintos, así que no importa el orden: usamos combinaciones. Lo mismo
          ocurre al elegir el varón.
          <br />
          <strong>Paso 2:</strong> Formas de elegir $2$ mujeres entre $6$:{" "}
          {"$C_6^2 = \\binom{6}{2} = \\dfrac{6!}{2!\\,4!} = \\dfrac{6 \\cdot 5 \\cdot 4!}{2 \\cdot 1 \\cdot 4!} = \\dfrac{30}{2} = 15$"}.
          <br />
          <strong>Paso 3:</strong> Formas de elegir $1$ varón entre $4$:{" "}
          {"$C_4^1 = \\binom{4}{1} = \\dfrac{4!}{1!\\,3!} = 4$"}.
          <br />
          <strong>Paso 4:</strong> El equipo requiere las mujeres{" "}
          <strong>y</strong> el varón a la vez (dos etapas sucesivas), así que
          multiplicamos: {"$15 \\cdot 4 = 60$"}.
          <br />
          <strong>Respuesta:</strong> <strong>$60$ equipos distintos</strong>.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 2 · Números de 3 cifras (Variación simple vs. con repetición)">
        <p className="mb-2">
          Con los dígitos {"$\\{1, 2, 3, 4, 5\\}$"}, ¿cuántos números de $3$
          cifras distintas se pueden formar? ¿Y cuántos si las cifras pueden
          repetirse?
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> ¿Importa el orden? Sí, porque $123$ es
          distinto de $321$. ¿Entran todos los dígitos? No, solo elegimos $k = 3$
          de $n = 5$. Entonces son <strong>variaciones</strong>.
          <br />
          <strong>Paso 2 (sin repetición):</strong>{" "}
          {"$V_5^3 = \\dfrac{5!}{(5 - 3)!} = \\dfrac{5!}{2!} = \\dfrac{5 \\cdot 4 \\cdot 3 \\cdot 2!}{2!} = 5 \\cdot 4 \\cdot 3 = 60$"}.
          <br />
          <strong>Paso 3 (con repetición):</strong> en cada una de las $3$
          cifras siguen disponibles los $5$ dígitos:{" "}
          {"$VR_5^3 = 5^3 = 5 \\cdot 5 \\cdot 5 = 125$"}.
          <br />
          <strong>Respuesta:</strong> <strong>$60$ sin repetir</strong> y{" "}
          <strong>$125$ con repetición</strong>.
        </p>
      </WorkedExample>

      <WorkedExample titulo="Ejemplo 3 · Término cuarto del Binomio de Newton">
        <p className="mb-2">
          Halla el cuarto término ($T_4$) en el desarrollo de $(2x - 3)^5$.
        </p>
        <p className="text-sm">
          <strong>Paso 1:</strong> Identifica las partes de $(a + b)^n$:{" "}
          $a = 2x$, $b = -3$ (con su signo negativo) y $n = 5$.
          <br />
          <strong>Paso 2:</strong> Como buscamos $T_4$ y la fórmula es{" "}
          {"$T_{k+1} = \\binom{n}{k} a^{n-k} b^k$"}, igualamos $k + 1 = 4$, de
          donde $k = 3$.
          <br />
          <strong>Paso 3:</strong> Sustituimos:{" "}
          {"$T_4 = \\binom{5}{3} (2x)^{5-3} (-3)^3 = \\binom{5}{3} (2x)^2 (-3)^3$"}.
          <br />
          <strong>Paso 4:</strong> Calculamos cada factor por separado:{" "}
          {"$\\binom{5}{3} = \\dfrac{5!}{3!\\,2!} = \\dfrac{5 \\cdot 4}{2 \\cdot 1} = 10$"},{" "}
          {"$(2x)^2 = 4x^2$"} y {"$(-3)^3 = -27$"}.
          <br />
          <strong>Paso 5:</strong> Multiplicamos los tres factores:{" "}
          {"$T_4 = 10 \\cdot 4x^2 \\cdot (-27) = -1080x^2$"}.
          <br />
          <strong>Respuesta:</strong> <strong>{"$-1080x^2$"}</strong>.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Confundir variación con combinación'">
        <strong>Realidad:</strong> hazte siempre la prueba del intercambio. Si
        intercambias a dos personas elegidas y el resultado cambia (presidente y
        secretario, medallas de oro y plata, dígitos de una clave), es{" "}
        <strong>variación</strong>. Si el grupo queda igual (comité sin cargos,
        cartas en una mano, saludos), es <strong>combinación</strong> y debes
        dividir entre $k!$.
      </Misconception>

      <Misconception titulo="Error 2 · 'Usar k en lugar de k − 1 al hallar el término Tₖ'">
        <strong>Realidad:</strong> en el Binomio de Newton la cuenta empieza en
        $k = 0$ (el primer término es {"$T_1 = T_{0+1}$"}). Por eso, para el
        cuarto término $T_4$ debes usar $k = 3$, no $k = 4$. Un buen control: la
        posición del término siempre supera en $1$ al exponente de $b$.
      </Misconception>

      <Misconception titulo="Error 3 · 'Creer que 0! = 0 u olvidar el signo en (a − b)ⁿ'">
        <strong>Realidad:</strong> por definición y recurrencia, $0! = 1$. Y en
        $(a - b)^n$, el segundo término es $(-b)$: cuando $k$ es impar el
        resultado lleva signo negativo, y cuando $k$ es par queda positivo.
      </Misconception>

      <Resumen>
        Aditivo (&ldquo;o&rdquo;, excluyentes): $m + n$. Multiplicativo
        (&ldquo;y&rdquo;, etapas): {"$m \\cdot n$"}. Factorial: $0! = 1$ y{" "}
        {"$n! = n(n-1)!$"}. Permutación: $P_n = n!$ y con repetición{" "}
        {"$n!/(a!\\,b!\\cdots)$"}. Variación (importa orden):{" "}
        {"$V_n^k = n!/(n-k)!$"}, con repetición $VR_n^k = n^k$. Combinación (no
        importa orden): {"$C_n^k = \\binom{n}{k} = n!/[k!(n-k)!]$"}. Binomio de
        Newton: {"$T_{k+1} = \\binom{n}{k} a^{n-k} b^k$"} ($n + 1$ términos).
      </Resumen>

      <AutoCheck
        pregunta="¿Cuánto vale la expresión 8! / (6! · 2!)?"
        opciones={["14", "56", "28", "4"]}
        correctaIdx={2}
        explicacion="Desarrollamos 8! hasta 6! para cancelar: 8! / (6! · 2!) = (8 · 7 · 6!) / (6! · 2 · 1) = 56 / 2 = 28."
      />

      <AutoCheck
        pregunta="¿Cuántas palabras distintas (con o sin sentido) se pueden formar reordenando todas las letras de la palabra CASA?"
        opciones={["12", "24", "6", "16"]}
        correctaIdx={0}
        explicacion="CASA tiene 4 letras y la A se repite 2 veces. Aplicamos permutación con repetición: P = 4! / 2! = 24 / 2 = 12."
      />

      <AutoCheck
        pregunta="En un aula de 6 estudiantes se elige un delegado y un subdelegado (ninguno puede ocupar ambos cargos). ¿De cuántas maneras puede hacerse la elección?"
        opciones={["15", "11", "36", "30"]}
        correctaIdx={3}
        explicacion="Como los cargos son distintos, importa el orden y no se repite persona: es una variación simple V(6, 2) = 6! / 4! = 6 · 5 = 30."
      />

      <AutoCheck
        pregunta="¿De cuántas formas se puede elegir un comité de 3 médicos entre 7 candidatos, sin asignar cargos distintos?"
        opciones={["210", "35", "21", "42"]}
        correctaIdx={1}
        explicacion="Sin cargos distintos no importa el orden: usamos combinación C(7, 3) = 7! / (3! · 4!) = (7 · 6 · 5) / (3 · 2 · 1) = 210 / 6 = 35."
      />

      <AutoCheck
        pregunta="¿Cuál es el tercer término (T₃) en el desarrollo de (x + 2)⁴?"
        opciones={["16x", "32x²", "24x²", "8x³"]}
        correctaIdx={2}
        explicacion="En T(k + 1) = C(n, k) · aⁿ⁻ᵏ · bᵏ, para T₃ usamos k = 3 − 1 = 2 (no k = 3). Con n = 4, a = x y b = 2: T₃ = C(4, 2) · x² · 2² = 6 · x² · 4 = 24x²."
      />
    </EscenaRica>
  );
}
