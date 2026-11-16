"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="EDS-04"
      tituloUnidad="Estadística descriptiva"
      escenas={[
        { titulo: "Conceptos generales", componente: EscConceptos },
        { titulo: "Variables y escalas de medición", componente: EscVariables },
        { titulo: "Muestreo y sesgo", componente: EscMuestreo },
        { titulo: "Tablas de frecuencias y datos agrupados", componente: EscTablas },
        { titulo: "Gráficos estadísticos", componente: EscGraficos },
        { titulo: "Medidas de tendencia central y dispersión", componente: EscMedidas },
        { titulo: "Lo que más se pregunta y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscConceptos() {
  return (
    <EscenaRica>
      <Titulo>Conceptos generales de estadística</Titulo>

      <Hook>
        Imagina que quieres conocer el peso promedio y el grupo sanguíneo de
        todos los estudiantes de primer año de Medicina en la UMSS. ¿Necesitas
        pesar a cada uno o puedes trabajar con un grupo bien elegido? Para
        decidirlo necesitas distinguir entre describir datos e inferir sobre
        toda una población.
      </Hook>

      <Definicion termino="Estadística (descriptiva vs. inferencial)">
        La estadística estudia los métodos de recolección, organización,
        resumen, análisis e interpretación de datos para tomar decisiones
        válidas. Se divide en dos ramas:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Estadística descriptiva:</strong> organiza y presenta los
            datos mediante tablas y gráficas para resumir o describir su
            comportamiento, <strong>sin hacer inferencias</strong> sobre la
            población cuando provienen de una parte de ella.
          </li>
          <li>
            <strong>Estadística inferencial:</strong> parte de los datos de una
            muestra representativa y usa técnicas de muestreo para establecer
            generalidades o conclusiones sobre toda la población.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Población, muestra y las dos ramas de la estadística
          </text>

          <circle cx={155} cy={112} r={74} fill={LIENZO.accent} opacity={0.12} stroke={LIENZO.accent} strokeWidth={1.8} />
          <text x={155} y={84} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>POBLACIÓN (N)</text>
          <text x={155} y={106} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Todos los elementos</text>
          <text x={155} y={124} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>Parámetros: μ, σ</text>
          <text x={155} y={142} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>Estudio total = censo</text>

          <line x1={238} x2={462} y1={94} y2={94} stroke={LIENZO.fg} strokeWidth={1.6} markerEnd="url(#arrEst)" />
          <text x={350} y={84} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>
            Muestreo (selección)
          </text>

          <line x1={462} x2={238} y1={134} y2={134} stroke={LIENZO.ok} strokeWidth={1.6} markerEnd="url(#arrInf)" />
          <text x={350} y={154} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={600}>
            Estadística inferencial
          </text>

          <circle cx={565} cy={112} r={60} fill={LIENZO.ok} opacity={0.12} stroke={LIENZO.ok} strokeWidth={1.8} />
          <text x={565} y={90} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>MUESTRA (n)</text>
          <text x={565} y={110} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Parte representativa</text>
          <text x={565} y={128} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>Estadígrafos: X̄, s</text>
          <text x={565} y={146} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>Descriptiva resume n</text>

          <defs>
            <marker id="arrEst" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fg} />
            </marker>
            <marker id="arrInf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
          </defs>
        </svg>
      </Pizarra>

      <Definicion termino="Piezas básicas de todo estudio">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Unidad de análisis (u observación):</strong> elemento
            individual al que se investiga (un paciente, una ficha clínica, un
            centro de salud). Sus características no deben ser ambiguas.
          </li>
          <li>
            <strong>Población o universo:</strong> conjunto total de elementos
            con características comunes. Puede ser <strong>finita</strong> (se
            conoce cuántos elementos tiene, tamaño <em>N</em>) o{" "}
            <strong>infinita</strong> (no se conoce el total de elementos).
          </li>
          <li>
            <strong>Muestra:</strong> subconjunto representativo de tamaño{" "}
            <em>n</em> tomado de la población. Si se estudia toda la población (
            <em>n = N</em>), el estudio se llama <strong>censo</strong>.
          </li>
          <li>
            <strong>Dato (xᵢ):</strong> cada valor o cualidad observada de la
            variable en una unidad de análisis (por ejemplo, 62 kg en el
            paciente 1).
          </li>
          <li>
            <strong>Parámetro vs. estadígrafo:</strong> el parámetro describe una
            característica de la <strong>población</strong> (μ, σ²); el
            estadígrafo o estadístico describe una característica de la{" "}
            <strong>muestra</strong> (X̄, s²) y estima al parámetro.
          </li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>&quot;Población → Parámetro (P con P). Muestra/Estadígrafo →
        describe el subconjunto (n).&quot;</strong>
      </Mnemotecnia>

      <Cuidado>
        La estadística descriptiva solo resume y grafica los datos obtenidos; NO
        generaliza a toda la población. Quien generaliza desde una muestra es la
        estadística inferencial.
      </Cuidado>

      <Conexion>
        En Educación en Salud e Investigación ya viste cómo plantear una
        hipótesis y distinguir variables; aquí aprendes a medirlas, muestrearlas,
        tabularlas y graficarlas con rigor.
      </Conexion>
    </EscenaRica>
  );
}

function EscVariables() {
  return (
    <EscenaRica>
      <Titulo>Variables y escalas de medición</Titulo>

      <Definicion termino="Variable">
        Es cualquier característica o propiedad de la población que puede
        medirse con distintos valores o describirse con distintas modalidades al
        pasar de una unidad de análisis a otra. Se simboliza con letras
        mayúsculas (<em>X, Y, Z</em>) y sus valores o atributos con minúsculas y
        subíndices (<em>x₁, x₂, ...</em>).
      </Definicion>

      <Definicion termino="Tipos de variables">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Cualitativas:</strong> representan atributos o categorías y
            no admiten medición numérica definida (estado civil, grupo sanguíneo,
            diagnóstico). Si se codifican con números (ej. 1 = soltero, 2 =
            casado), esos números son solo etiquetas.
          </li>
          <li>
            <strong>Cuantitativas discretas:</strong> solo toman valores aislados
            de un conjunto numérico; entre dos valores consecutivos no caben
            valores intermedios (número de hijos, número de internaciones).
          </li>
          <li>
            <strong>Cuantitativas continuas:</strong> dentro de un intervalo
            pueden tomar cualquier valor; entre dos valores siempre existe otro
            valor intermedio (talla, peso, temperatura, salario en el
            compendio).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Las 4 escalas de medición (de débil a fuerte)
          </text>
          {[
            {
              x: 40, y: 120, h: 82, t: "1. Nominal", l1: "Solo categorías (=, ≠)",
              l2: "Números = etiquetas", ej: "Grupo sanguíneo", c: LIENZO.fgDim,
            },
            {
              x: 204, y: 95, h: 107, t: "2. Ordinal", l1: "+ Orden (<, >)",
              l2: "Distancia NO constante", ej: "Leve / mod. / grave", c: LIENZO.warn,
            },
            {
              x: 368, y: 70, h: 132, t: "3. Intervalo", l1: "+ Distancia igual",
              l2: "Cero arbitrario", ej: "Temperatura (°C, K)", c: LIENZO.accent,
            },
            {
              x: 532, y: 45, h: 157, t: "4. Razón", l1: "+ Cero absoluto",
              l2: "Permite razones (2×)", ej: "Peso, talla, tiempo", c: LIENZO.ok,
            },
          ].map((e, i) => (
            <g key={i} transform={`translate(${e.x}, ${e.y})`}>
              <rect width={148} height={e.h} fill={e.c} opacity={0.12} stroke={e.c} strokeWidth={1.6} rx={8} />
              <text x={74} y={22} textAnchor="middle" fill={e.c} fontSize={12} fontWeight={700}>{e.t}</text>
              <text x={74} y={42} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>{e.l1}</text>
              <text x={74} y={58} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>{e.l2}</text>
              <text x={74} y={e.h - 12} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontStyle="italic">{e.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Las 4 escalas de medición">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Escala nominal (débil):</strong> para variables cualitativas.
            Define categorías identificadas por nombre y{" "}
            <strong>mutuamente excluyentes</strong> (a cada elemento le
            corresponde una sola). Los números no indican orden ni cantidad.
          </li>
          <li>
            <strong>Escala ordinal:</strong> establece niveles con un rango u
            orden (&quot;mayor que&quot; o &quot;menor que&quot;), como estado de
            salud (sano, ligeramente afectado, enfermo, muy enfermo) o estrato
            (1 &lt; 2 &lt; 3). <strong>La distancia entre niveles adyacentes no es
            la misma</strong> y sus números funcionan como etiquetas.
          </li>
          <li>
            <strong>Escala de intervalo (fuerte):</strong> ordena los niveles y
            mantiene la <strong>misma distancia</strong> entre unidades
            consecutivas. Su punto cero es <strong>arbitrario</strong> y no
            implica ausencia de la característica (por ejemplo, 0 °C no significa
            ausencia de temperatura).
          </li>
          <li>
            <strong>Escala de razones (la más fuerte):</strong> tiene distancias
            iguales y un <strong>cero no arbitrario (absoluto)</strong> que
            indica ausencia total del atributo. Permite comparar proporciones:
            4,6 cm es el doble de 2,3 cm. Aplica a peso, longitud, tiempo, área,
            volumen y dinero.
          </li>
        </ul>
      </Definicion>

      <Cuidado>
        Dos trampas clásicas de examen: (1) en la escala <strong>ordinal</strong>{" "}
        la distancia entre categorías adyacentes NO es constante; (2) la escala
        con cero absoluto es la de <strong>razón</strong>, mientras que la de{" "}
        <strong>intervalo</strong> tiene cero arbitrario.
      </Cuidado>
    </EscenaRica>
  );
}

function EscMuestreo() {
  return (
    <EscenaRica>
      <Titulo>Muestreo y sesgos</Titulo>

      <Parrafo>
        El muestreo se utiliza para optimizar recursos (tiempo, mano de obra,
        materiales e insumos) cuando no es posible o conveniente hacer un censo.
        Se divide en dos grandes grupos: muestreo probabilístico y muestreo no
        probabilístico.
      </Parrafo>

      <Definicion termino="Muestreo probabilístico (todos tienen igual probabilidad)">
        Cada elemento de la población tiene la misma probabilidad de ser
        elegido, lo que favorece la representatividad de la muestra.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Aleatorio simple:</strong> se numera a toda la población y
            se seleccionan los elementos al azar (balotas o números aleatorios).
            Es ágil, pero poco práctico en poblaciones muy grandes.
          </li>
          <li>
            <strong>Aleatorio sistemático:</strong> se calcula el intervalo{" "}
            <strong>k = N / n</strong>, se elige <strong>al azar</strong> un
            punto de arranque <em>i</em> entre 1 y <em>k</em> (nunca fijo en 1)
            y se toman los elementos{" "}
            <em>i, i + k, i + 2k, ..., i + (n − 1)k</em>. Cuidado: si la lista
            tiene una periodicidad igual a <em>k</em>, se introduce sesgo.
          </li>
          <li>
            <strong>Aleatorio estratificado:</strong> útil en poblaciones
            heterogéneas. Se divide la población en grupos naturales similares
            llamados <strong>estratos</strong> (por género, edad o estrato) y
            dentro de cada estrato se aplica muestreo aleatorio simple. El
            reparto en estratos (<strong>afijación</strong>) puede ser{" "}
            <em>simple</em> (igual número), <em>proporcional</em> (según tamaño
            del estrato) u <em>óptima</em> (según desviación).
          </li>
          <li>
            <strong>Por conglomerados (y polietápico):</strong> los elementos ya
            están agrupados en unidades según el estudio (municipios, centros de
            salud). Se sortean algunos conglomerados y se analizan{" "}
            <strong>todos</strong> los elementos de los conglomerados elegidos.
            Si se selecciona en etapas sucesivas, se llama{" "}
            <strong>polietápico</strong>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={175}>
        <svg width="100%" height="100%" viewBox="0 0 720 175" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Ejemplo de muestreo sistemático · N = 12, n = 4 → k = 12 / 4 = 3
          </text>
          <text x={360} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>
            Arranque al azar i = 2 (entre 1 y 3). Se eligen: 2, 5, 8, 11
          </text>
          {Array.from({ length: 12 }, (_, idx) => {
            const num = idx + 1;
            const sel = num === 2 || num === 5 || num === 8 || num === 11;
            const x = 53 + idx * 52;
            return (
              <g key={num} transform={`translate(${x}, 66)`}>
                <rect
                  width={42}
                  height={38}
                  rx={6}
                  fill={sel ? LIENZO.ok : LIENZO.bgSoft}
                  opacity={sel ? 0.22 : 1}
                  stroke={sel ? LIENZO.ok : LIENZO.fgFaint}
                  strokeWidth={sel ? 2 : 1}
                />
                <text
                  x={21}
                  y={24}
                  textAnchor="middle"
                  fill={sel ? LIENZO.ok : LIENZO.fg}
                  fontSize={13}
                  fontWeight={sel ? 700 : 500}
                >
                  {num}
                </text>
              </g>
            );
          })}
          {[0, 1, 2].map((j) => {
            const x1 = 53 + (1 + j * 3) * 52 + 21;
            const x2 = 53 + (4 + j * 3) * 52 + 21;
            const xm = (x1 + x2) / 2;
            return (
              <g key={j}>
                <path
                  d={`M ${x1} 110 Q ${xm} 142 ${x2} 110`}
                  fill="none"
                  stroke={LIENZO.ok}
                  strokeWidth={1.6}
                />
                <text x={xm} y={145} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={700}>
                  +k (+3)
                </text>
              </g>
            );
          })}
        </svg>
      </Pizarra>

      <Definicion termino="Muestreo no probabilístico (sin igual probabilidad)">
        Se usa cuando el probabilístico resulta muy costoso o no se conoce toda
        la población; <strong>no permite generalización estadística</strong>:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Por cuotas (o accidental):</strong> fija cuotas con ciertos
            requisitos y selecciona a los primeros elementos que las cumplen.
          </li>
          <li>
            <strong>Intencional u opinático:</strong> incluye grupos típicos
            elegidos a criterio del investigador cuando la población es
            desconocida.
          </li>
          <li>
            <strong>Bola de nieve:</strong> para poblaciones ocultas o cuyos
            elementos no están listados pero se sabe que existen; los primeros
            participantes contactan o recomiendan a otros.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Errores y sesgos en el muestreo">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Error de cobertura o sesgo en la selección:</strong> ocurre
            cuando se omiten elementos de la población y un sector queda
            subrepresentado o sobrerrepresentado (por ejemplo, usar listas
            incompletas o voluntarios).
          </li>
          <li>
            <strong>Error o sesgo de no respuesta:</strong> no se logran datos de
            todos los elementos elegidos en la muestra.
          </li>
          <li>
            <strong>Error de muestreo:</strong> diferencia aleatoria inevitable
            por estudiar una muestra en lugar de un censo; no se elimina, pero se
            controla con un diseño y tamaño de muestra adecuados.
          </li>
          <li>
            <strong>Error de medición:</strong> falta de precisión al formular
            preguntas o por influencia del entrevistador.
          </li>
        </ul>
      </Definicion>

      <Cuidado>
        En el muestreo sistemático, el punto de partida <em>i</em> NO es siempre
        el 1: debe elegirse al azar entre 1 y <em>k</em>. Y si el intervalo{" "}
        <em>k</em> coincide con un patrón cíclico de la lista, el resultado sale
        sesgado.
      </Cuidado>
    </EscenaRica>
  );
}

function EscTablas() {
  return (
    <EscenaRica>
      <Titulo>Tablas de frecuencias y datos agrupados</Titulo>

      <Definicion termino="Cómo ordenar según el tipo de variable">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Cualitativas:</strong> orden cronológico, alfabético o
            jerárquico. <strong>No aplican frecuencias acumuladas</strong>{" "}
            porque no se suman cualidades entre sí.
          </li>
          <li>
            <strong>Cuantitativas discretas:</strong> orden numérico creciente.
          </li>
          <li>
            <strong>Cuantitativas continuas o muchos datos:</strong> se agrupan
            en <strong>intervalos o clases</strong>.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Fórmulas para construir intervalos y frecuencias">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Rango o recorrido:</strong> <em>R = Lₛ − Lᵢ</em> (mayor valor
            menos menor valor).
          </li>
          <li>
            <strong>Número de intervalos (m):</strong> convencionalmente entre 5
            y 20. Con la <strong>regla de Sturges</strong>:{" "}
            <strong>m = 1 + 3,3 · log(n)</strong> (aproximación orientativa).
          </li>
          <li>
            <strong>Amplitud del intervalo (C):</strong>{" "}
            <strong>C = AR / m</strong> (rango entre número de intervalos; si un
            entero cercano a Sturges da división exacta, se prefiere ese).
          </li>
          <li>
            <strong>Límites de clase (lᵢ − lₛ):</strong> el{" "}
            <strong>primer intervalo es cerrado en ambos extremos</strong>{" "}
            <em>[lᵢ − lₛ]</em>; a partir del segundo intervalo es{" "}
            <strong>abierto a la izquierda y cerrado a la derecha</strong>{" "}
            <em>(lᵢ − lₛ]</em>.
          </li>
          <li>
            <strong>Marca de clase (ẋᵢ):</strong> punto medio del intervalo,{" "}
            <strong>ẋᵢ = (lₛ + lᵢ) / 2</strong>.
          </li>
          <li>
            <strong>Frecuencias:</strong> absoluta <strong>nᵢ</strong> (conteo,
            suma <em>n</em>); relativa en proporción <strong>nᵢ / n</strong>{" "}
            (suma 1) o en porcentaje <strong>hᵢ = (nᵢ / n) · 100</strong> (suma
            100%); absoluta acumulada <strong>Nᵢ = Σ nₖ</strong> (termina en{" "}
            <em>n</em>); relativa acumulada <strong>Hᵢ = Σ hₖ</strong> (termina
            en 100%).
          </li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Peso (en kg) de 20 pacientes en consulta externa">
        <div style={{ marginBottom: 10 }}>
          <strong>Datos crudos (n = 20 pacientes):</strong><br />
          62, 58, 65, 50, 68, 61, 72, 59, 64, 56, 66, 63, 54, 75, 60, 64, 57,
          70, 62, 67.
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Paso 1 · Extremos y rango:</strong><br />
          Menor valor <em>Lᵢ</em> = 50 kg; mayor valor <em>Lₛ</em> = 75 kg.<br />
          <em>R</em> = 75 − 50 = <strong>25 kg</strong>.
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Paso 2 · Número de intervalos (Sturges):</strong><br />
          <em>m</em> = 1 + 3,3 · log(20) = 1 + 3,3 · 1,3010 = 1 + 4,293 ={" "}
          <strong>5,29</strong>.<br />
          Está entre 5 y 6 intervalos. Probamos ambos en el paso siguiente.
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Paso 3 · Amplitud del intervalo (C):</strong><br />
          Si <em>m</em> = 5 → <em>C</em> = 25 / 5 = <strong>5 kg</strong>{" "}
          (exacto).<br />
          Si <em>m</em> = 6 → <em>C</em> = 25 / 6 = 4,17 kg (no exacto).<br />
          Elegimos <strong>m = 5 intervalos</strong> de amplitud{" "}
          <strong>C = 5 kg</strong>.
        </div>

        <div style={{ marginBottom: 10 }}>
          <strong>Paso 4 · Límites, marca de clase y conteo:</strong><br />
          Ordenamos los 20 datos de menor a mayor: 50, 54, 56, 57, 58, 59, 60,
          61, 62, 62, 63, 64, 64, 65, 66, 67, 68, 70, 72, 75. Ahora agrupamos
          en los 5 intervalos (el primero cerrado en ambos extremos y los demás
          abiertos a la izquierda y cerrados a la derecha):
          <ul style={{ margin: "4px 0 6px 18px", padding: 0, fontSize: 14 }}>
            <li>[50 − 55]: 50, 54 → <em>n₁</em> = 2; <em>ẋ₁</em> = (50 + 55)/2 = 52,5</li>
            <li>(55 − 60]: 56, 57, 58, 59, 60 → <em>n₂</em> = 5; <em>ẋ₂</em> = (55 + 60)/2 = 57,5</li>
            <li>(60 − 65]: 61, 62, 62, 63, 64, 64, 65 → <em>n₃</em> = 7; <em>ẋ₃</em> = (60 + 65)/2 = 62,5</li>
            <li>(65 − 70]: 66, 67, 68, 70 → <em>n₄</em> = 4; <em>ẋ₄</em> = (65 + 70)/2 = 67,5</li>
            <li>(70 − 75]: 72, 75 → <em>n₅</em> = 2; <em>ẋ₅</em> = (70 + 75)/2 = 72,5</li>
          </ul>
          Observa cómo el límite superior entra en su intervalo (60 en (55 − 60],
          65 en (60 − 65], 70 en (65 − 70]) porque el extremo derecho es cerrado.
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, textAlign: "center" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${LIENZO.accent}` }}>
                <th style={{ padding: "6px 4px" }}>Intervalo (kg)</th>
                <th style={{ padding: "6px 4px" }}>ẋᵢ</th>
                <th style={{ padding: "6px 4px" }}>nᵢ</th>
                <th style={{ padding: "6px 4px" }}>nᵢ / n</th>
                <th style={{ padding: "6px 4px" }}>hᵢ (%)</th>
                <th style={{ padding: "6px 4px" }}>Nᵢ</th>
                <th style={{ padding: "6px 4px" }}>Hᵢ (%)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["[50 − 55]", "52,5", "2", "0,10", "10%", "2", "10%"],
                ["(55 − 60]", "57,5", "5", "0,25", "25%", "7", "35%"],
                ["(60 − 65]", "62,5", "7", "0,35", "35%", "14", "70%"],
                ["(65 − 70]", "67,5", "4", "0,20", "20%", "18", "90%"],
                ["(70 − 75]", "72,5", "2", "0,10", "10%", "20", "100%"],
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${LIENZO.fgFaint}` }}>
                  {r.map((c, j) => (
                    <td key={j} style={{ padding: "6px 4px" }}>{c}</td>
                  ))}
                </tr>
              ))}
              <tr style={{ fontWeight: 700, borderTop: `2px solid ${LIENZO.fg}` }}>
                <td style={{ padding: "6px 4px" }}>Total</td>
                <td style={{ padding: "6px 4px" }}>—</td>
                <td style={{ padding: "6px 4px" }}>20</td>
                <td style={{ padding: "6px 4px" }}>1,00</td>
                <td style={{ padding: "6px 4px" }}>100%</td>
                <td style={{ padding: "6px 4px" }}>—</td>
                <td style={{ padding: "6px 4px" }}>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 10, fontSize: 14 }}>
          <strong>Lectura de las acumuladas:</strong> <em>N₃</em> = 14 y{" "}
          <em>H₃</em> = 70% significan que 14 pacientes (el 70%) pesan{" "}
          <strong>como máximo 65 kg</strong>. (Nota: otros textos escriben{" "}
          <em>fᵢ</em> para <em>nᵢ</em>, <em>fᵣ</em> para <em>nᵢ/n</em> y{" "}
          <em>Fᵢ</em> para <em>Nᵢ</em>).
        </div>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscGraficos() {
  return (
    <EscenaRica>
      <Titulo>Gráficos estadísticos</Titulo>

      <Parrafo>
        Las gráficas complementan a las tablas de frecuencias (no las sustituyen)
        y permiten ver rápidamente el comportamiento de la variable. La gráfica
        correcta depende del tipo de variable.
      </Parrafo>

      <Definicion termino="1. Para variables cualitativas y cuantitativas discretas">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Diagrama de barras:</strong> rectángulos separados
            (verticales u horizontales) que representan los valores o categorías
            de la variable, con longitud proporcional a <em>nᵢ</em> o <em>hᵢ</em>.
          </li>
          <li>
            <strong>Diagrama circular (sectores):</strong> divide los{" "}
            <strong>360°</strong> de la circunferencia según la frecuencia
            relativa: <strong>grados = fᵣ × 360° = (nᵢ / n) × 360°</strong>.{" "}
            <strong>Regla del compendio:</strong> si hay{" "}
            <strong>más de 4 categorías</strong>, no se recomienda el diagrama
            circular y debe usarse el diagrama de barras.
          </li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Ejemplo · Grupo sanguíneo de los 20 pacientes">
        <div style={{ marginBottom: 8 }}>
          Como es una variable cualitativa nominal con <strong>4 categorías</strong>{" "}
          (≤ 4), aplican tanto el diagrama de barras como el circular:
        </div>
        <ul style={{ margin: "0 0 6px 18px", padding: 0, fontSize: 14 }}>
          <li>Grupo O: <em>n₁</em> = 9 → <em>fᵣ</em> = 9/20 = 0,45 (45%) → 0,45 × 360° = <strong>162°</strong></li>
          <li>Grupo A: <em>n₂</em> = 6 → <em>fᵣ</em> = 6/20 = 0,30 (30%) → 0,30 × 360° = <strong>108°</strong></li>
          <li>Grupo B: <em>n₃</em> = 4 → <em>fᵣ</em> = 4/20 = 0,20 (20%) → 0,20 × 360° = <strong>72°</strong></li>
          <li>Grupo AB: <em>n₄</em> = 1 → <em>fᵣ</em> = 1/20 = 0,05 (5%) → 0,05 × 360° = <strong>18°</strong></li>
        </ul>
        <div>
          Comprobación: 9 + 6 + 4 + 1 = <strong>20</strong>; 0,45 + 0,30 + 0,20 +
          0,05 = <strong>1,00</strong>; 162° + 108° + 72° + 18° ={" "}
          <strong>360°</strong>.
        </div>
      </WorkedExample>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet">
          <text x={185} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Diagrama de barras (n = 20)
          </text>
          <line x1={75} x2={330} y1={195} y2={195} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={75} x2={75} y1={195} y2={45} stroke={LIENZO.fg} strokeWidth={1.5} />
          {[0, 3, 6, 9].map((v) => {
            const y = 195 - v * 15;
            return (
              <g key={v}>
                <line x1={71} x2={75} y1={y} y2={y} stroke={LIENZO.fg} strokeWidth={1} />
                <text x={66} y={y + 4} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>{v}</text>
              </g>
            );
          })}
          {[
            { label: "O", n: 9, x: 96, c: LIENZO.accent },
            { label: "A", n: 6, x: 156, c: LIENZO.ok },
            { label: "B", n: 4, x: 216, c: LIENZO.warn },
            { label: "AB", n: 1, x: 276, c: LIENZO.bad },
          ].map((b) => {
            const h = b.n * 15;
            const y = 195 - h;
            return (
              <g key={b.label}>
                <rect x={b.x} y={y} width={38} height={h} fill={b.c} opacity={0.28} stroke={b.c} strokeWidth={1.5} />
                <text x={b.x + 19} y={y - 6} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={700}>{b.n}</text>
                <text x={b.x + 19} y={212} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>{b.label}</text>
              </g>
            );
          })}

        </svg>
      </Pizarra>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="360 0 360 240" preserveAspectRatio="xMidYMid meet">
          <text x={540} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Diagrama circular (360°)
          </text>
          {/* O: -90° a 72° (162°) */}
          <path d="M 495 125 L 495 51 A 74 74 0 0 1 517.9 195.4 Z" fill={LIENZO.accent} opacity={0.32} stroke={LIENZO.accent} strokeWidth={1.4} />
          {/* A: 72° a 180° (108°) */}
          <path d="M 495 125 L 517.9 195.4 A 74 74 0 0 1 421 125 Z" fill={LIENZO.ok} opacity={0.32} stroke={LIENZO.ok} strokeWidth={1.4} />
          {/* B: 180° a 252° (72°) */}
          <path d="M 495 125 L 421 125 A 74 74 0 0 1 472.1 54.6 Z" fill={LIENZO.warn} opacity={0.32} stroke={LIENZO.warn} strokeWidth={1.4} />
          {/* AB: 252° a 270° (18°) */}
          <path d="M 495 125 L 472.1 54.6 A 74 74 0 0 1 495 51 Z" fill={LIENZO.bad} opacity={0.38} stroke={LIENZO.bad} strokeWidth={1.4} />

          {[
            { y: 78, t: "O · 45% (162°)", c: LIENZO.accent },
            { y: 108, t: "A · 30% (108°)", c: LIENZO.ok },
            { y: 138, t: "B · 20% (72°)", c: LIENZO.warn },
            { y: 168, t: "AB · 5% (18°)", c: LIENZO.bad },
          ].map((l) => (
            <g key={l.t} transform={`translate(585, ${l.y})`}>
              <rect width={12} height={12} rx={3} fill={l.c} opacity={0.45} stroke={l.c} strokeWidth={1.2} />
              <text x={18} y={10} fill={LIENZO.fg} fontSize={11} fontWeight={600}>{l.t}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="2. Para variables cuantitativas continuas (datos agrupados)">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Histograma:</strong> conjunto de rectángulos{" "}
            <strong>contiguos</strong> (sin separación). Sobre el eje horizontal
            van los <strong>intervalos</strong> (la base es la amplitud) y sobre
            el vertical las frecuencias absolutas (<em>nᵢ</em>) o relativas (
            <em>hᵢ</em>).
          </li>
          <li>
            <strong>Polígono de frecuencias:</strong> línea que une las{" "}
            <strong>marcas de clase (ẋᵢ)</strong> en el eje horizontal con sus
            frecuencias en el eje vertical. Para cerrarlo, se agrega una marca de
            clase en cada extremo (con la misma amplitud <em>C</em>) con
            frecuencia 0.
          </li>
          <li>
            <strong>Ojiva (polígono de frecuencias acumuladas):</strong> gráfica
            creciente que representa las frecuencias acumuladas (<em>Nᵢ</em> o{" "}
            <em>Hᵢ</em> %) frente a los límites superiores; permite leer el
            porcentaje acumulado hasta cada valor.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet">
          <text x={190} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Histograma y polígono (peso en kg)
          </text>
          <line x1={55} x2={345} y1={195} y2={195} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={55} x2={55} y1={195} y2={42} stroke={LIENZO.fg} strokeWidth={1.5} />
          {[0, 2, 4, 6, 8].map((v) => {
            const y = 195 - v * 18;
            return (
              <g key={v}>
                <line x1={51} x2={55} y1={y} y2={y} stroke={LIENZO.fg} strokeWidth={1} />
                <text x={47} y={y + 4} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>{v}</text>
              </g>
            );
          })}
          {[
            { lbl: "50", x: 100 }, { lbl: "55", x: 140 }, { lbl: "60", x: 180 },
            { lbl: "65", x: 220 }, { lbl: "70", x: 260 }, { lbl: "75", x: 300 },
          ].map((t) => (
            <text key={t.lbl} x={t.x} y={211} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{t.lbl}</text>
          ))}
          {[
            { x: 100, n: 2 },
            { x: 140, n: 5 },
            { x: 180, n: 7 },
            { x: 220, n: 4 },
            { x: 260, n: 2 },
          ].map((b, i) => {
            const h = b.n * 18;
            const y = 195 - h;
            return (
              <rect
                key={i}
                x={b.x}
                y={y}
                width={40}
                height={h}
                fill={LIENZO.accent}
                opacity={0.18}
                stroke={LIENZO.accent}
                strokeWidth={1.4}
              />
            );
          })}
          {/* Polígono cerrado en marcas de clase 47,5 (x=80) y 77,5 (x=320) */}
          <polyline
            points="80,195 120,159 160,105 200,69 240,123 280,159 320,195"
            fill="none"
            stroke={LIENZO.warn}
            strokeWidth={2.2}
          />
          {[
            [80, 195], [120, 159], [160, 105], [200, 69], [240, 123], [280, 159], [320, 195],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={3.5} fill={LIENZO.warn} />
          ))}

        </svg>
      </Pizarra>

      <Pizarra alto={240}>
        <svg width="100%" height="100%" viewBox="360 0 360 240" preserveAspectRatio="xMidYMid meet">
          <text x={555} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Ojiva · Frecuencia acumulada Hᵢ (%)
          </text>
          <line x1={430} x2={690} y1={195} y2={195} stroke={LIENZO.fg} strokeWidth={1.5} />
          <line x1={430} x2={430} y1={195} y2={42} stroke={LIENZO.fg} strokeWidth={1.5} />
          {[0, 25, 50, 75, 100].map((v) => {
            const y = 195 - v * 1.4;
            return (
              <g key={v}>
                <line x1={426} x2={430} y1={y} y2={y} stroke={LIENZO.fg} strokeWidth={1} />
                <text x={422} y={y + 4} textAnchor="end" fill={LIENZO.fgDim} fontSize={10}>{v}%</text>
              </g>
            );
          })}
          {[
            { lbl: "50", x: 430 }, { lbl: "55", x: 480 }, { lbl: "60", x: 530 },
            { lbl: "65", x: 580 }, { lbl: "70", x: 630 }, { lbl: "75", x: 680 },
          ].map((t) => (
            <text key={t.lbl} x={t.x} y={211} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{t.lbl}</text>
          ))}
          {/* H = 0%, 10%, 35%, 70%, 90%, 100% -> y = 195 - H*1.4 */}
          <polyline
            points="430,195 480,181 530,146 580,97 630,69 680,55"
            fill="none"
            stroke={LIENZO.ok}
            strokeWidth={2.4}
          />
          {[
            [430, 195], [480, 181], [530, 146], [580, 97], [630, 69], [680, 55],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={3.5} fill={LIENZO.ok} />
          ))}
        </svg>
      </Pizarra>
    </EscenaRica>
  );
}

function EscMedidas() {
  return (
    <EscenaRica>
      <Titulo>Medidas de tendencia central y dispersión</Titulo>

      <Parrafo>
        El compendio desarrolla estas medidas en los capítulos 7 y 9 para
        resumir el centro de los datos y qué tan alejados están entre sí.
      </Parrafo>

      <Definicion termino="Medidas de tendencia central (capítulo 7)">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Media aritmética (X̄):</strong> promedio de los datos. Sin
            agrupar: <strong>X̄ = Σ xᵢ / n</strong>. Con datos agrupados en
            intervalos: <strong>X̄ = Σ (ẋᵢ · nᵢ) / n</strong>. Es sensible a
            valores extremos.
          </li>
          <li>
            <strong>Mediana (Me):</strong> valor central tras ordenar los datos
            (deja 50% por debajo y 50% por encima). Sin agrupar: posición{" "}
            <em>(n + 1) / 2</em> si <em>n</em> es impar, o promedio de las
            posiciones <em>n / 2</em> y <em>(n / 2) + 1</em> si <em>n</em> es
            par. Agrupada:{" "}
            <strong>Me = lᵢ + ((n/2 − Nᵢ₋₁) / nᵢ) · C</strong>. No se altera por
            valores extremos.
          </li>
          <li>
            <strong>Moda (Mo):</strong> valor o atributo de mayor frecuencia
            (aplica también a cualitativas; puede ser unimodal, bimodal,
            multimodal o amodal). Agrupada:{" "}
            <strong>Mo = lᵢ + (Δ₁ / (Δ₁ + Δ₂)) · C</strong>, donde{" "}
            <em>Δ₁ = nᵢ − nᵢ₋₁</em> y <em>Δ₂ = nᵢ − nᵢ₊₁</em>.
          </li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Tendencia central con el peso de los 20 pacientes">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Media agrupada:</strong> Σ(ẋᵢ · nᵢ) = (52,5·2) + (57,5·5) +
            (62,5·7) + (67,5·4) + (72,5·2) = 105 + 287,5 + 437,5 + 270 + 145 =
            1.245 → <strong>X̄</strong> = 1.245 / 20 = <strong>62,25 kg</strong>.
          </li>
          <li>
            <strong>Mediana agrupada:</strong> <em>n</em>/2 = 10. Como{" "}
            <em>N₂</em> = 7 y <em>N₃</em> = 14, cae en (60 − 65] (<em>lᵢ</em> =
            60, <em>Nᵢ₋₁</em> = 7, <em>nᵢ</em> = 7, <em>C</em> = 5):{" "}
            <strong>Me</strong> = 60 + ((10 − 7) / 7) · 5 = 60 + 15/7 ≈{" "}
            <strong>62,14 kg</strong>.
          </li>
          <li>
            <strong>Moda agrupada:</strong> intervalo modal (60 − 65] (<em>n₃</em>{" "}
            = 7). <em>Δ₁</em> = 7 − 5 = 2; <em>Δ₂</em> = 7 − 4 = 3:{" "}
            <strong>Mo</strong> = 60 + (2 / (2 + 3)) · 5 = 60 + 2 ={" "}
            <strong>62,0 kg</strong>.
          </li>
        </ul>
      </WorkedExample>

      <Definicion termino="Medidas de dispersión (capítulo 9)">
        Miden la variabilidad de los datos y nunca son negativas:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Rango:</strong> valor máximo − valor mínimo.
          </li>
          <li>
            <strong>Rango intercuartil (RIC):</strong> <em>Q₃ − Q₁</em>. Mide la
            dispersión del 50% central sin afectarse por extremos.
          </li>
          <li>
            <strong>Varianza (σ² poblacional, s² muestral):</strong> promedio de
            desviaciones al cuadrado respecto a la media. En muestra:{" "}
            <strong>s² = Σ(xᵢ − X̄)² / (n − 1)</strong> (queda en unidades al
            cuadrado).
          </li>
          <li>
            <strong>Desviación estándar (s = √s²):</strong> vuelve a las
            unidades originales. En una distribución simétrica (campana) aplica
            la <strong>regla empírica</strong>: ~68% en <em>X̄ ± 1s</em>, ~95%
            en <em>X̄ ± 2s</em> y ~99,7% en <em>X̄ ± 3s</em>.
          </li>
          <li>
            <strong>Coeficiente de variación (CV):</strong>{" "}
            <strong>CV = (s / X̄) · 100</strong>. Expresa la dispersión relativa
            en porcentaje para comparar muestras. Criterios DANE: ≤ 7% precisa;
            8–14% aceptable; 15–20% regular; &gt; 20% poco precisa.
          </li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Dispersión en días de internación de 5 pacientes">
        Datos ordenados: <strong>4, 6, 6, 10, 14</strong> días (<em>n</em> = 5).
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            Media: <strong>X̄</strong> = (4 + 6 + 6 + 10 + 14) / 5 = 40 / 5 ={" "}
            <strong>8 días</strong>. (Mediana = 6; Moda = 6; Rango = 14 − 4 = 10
            días).
          </li>
          <li>
            Desviaciones al cuadrado: (4−8)² = 16; (6−8)² = 4; (6−8)² = 4;
            (10−8)² = 4; (14−8)² = 36 → Suma = 64.
          </li>
          <li>
            Varianza muestral: <strong>s²</strong> = 64 / (5 − 1) = 64 / 4 ={" "}
            <strong>16 días²</strong>.
          </li>
          <li>
            Desviación estándar: <strong>s</strong> = √16 ={" "}
            <strong>4 días</strong>.
          </li>
          <li>
            Coeficiente de variación: <strong>CV</strong> = (4 / 8) · 100 ={" "}
            <strong>50%</strong> (dispersión alta, &gt; 20%).
          </li>
        </ul>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Lo que más se pregunta y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La escala ordinal tiene distancias iguales'">
        <strong>Realidad:</strong> la escala ordinal ordena categorías (&quot;mayor
        que&quot; / &quot;menor que&quot;), pero la distancia entre niveles
        adyacentes NO es constante. Y en la nominal, los números solo etiquetan.
      </Misconception>

      <Misconception titulo="Error 2 · 'Todos los intervalos llevan corchete cerrado [lᵢ − lₛ]'">
        <strong>Realidad:</strong> solo el primer intervalo es cerrado en ambos
        extremos <em>[lᵢ − lₛ]</em>. Del segundo en adelante son abiertos en el
        límite inferior y cerrados en el superior: <em>(lᵢ − lₛ]</em>.
      </Misconception>

      <Misconception titulo="Error 3 · 'El diagrama circular sirve para cualquier variable o muchas categorías'">
        <strong>Realidad:</strong> el circular (360°) se usa para variables
        cualitativas o cuantitativas discretas, y solo si hay 4 o menos
        categorías (con más de 4 usa barras). Para continuas van histograma,
        polígono u ojiva.
      </Misconception>

      <Resumen>
        <strong>Lo que más se pregunta en el examen:</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Descriptiva (resume en tablas y gráficos sin inferir) vs. inferencial (generaliza desde una muestra).</li>
          <li>Las 4 escalas: nominal (solo etiqueta), ordinal (orden, distancia no igual), intervalo (cero arbitrario) y razón (cero absoluto).</li>
          <li>Variables cualitativas vs. cuantitativas discretas (valores aislados) y continuas (admiten valores intermedios).</li>
          <li>Muestreo probabilístico (sistemático: <em>k = N/n</em>, arranque al azar; cuidado con sesgo por periodicidad o voluntarios) y no probabilístico (bola de nieve para poblaciones ocultas).</li>
          <li>Tablas agrupadas: <em>R = Lₛ − Lᵢ</em>, Sturges <em>m = 1 + 3,3 · log(n)</em> (convención 5 a 20), <em>C = AR / m</em>, límites <em>[ ]</em> primero y <em>( ]</em> los siguientes.</li>
          <li>Gráficos según variable: barras y circular (360°, ≤ 4 categorías) para cualitativas/discretas; histograma, polígono (en ẋᵢ) y ojiva (acumulada) para continuas.</li>
        </ul>
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es la diferencia clave entre la escala ordinal y la de intervalo?"
        opciones={[
          "En la escala ordinal la distancia entre niveles adyacentes no es constante",
          "La escala ordinal tiene cero absoluto y la de intervalo no",
          "La escala de intervalo solo sirve para variables cualitativas",
          "La escala ordinal no permite establecer ningún orden",
        ]}
        correctaIdx={0}
        explicacion="La ordinal ordena niveles, pero sin distancia constante entre ellos. La de intervalo sí tiene distancia igual (con cero arbitrario)."
      />

      <AutoCheck
        pregunta="En la construcción de intervalos de clase, ¿cómo se escriben los límites a partir del segundo intervalo?"
        opciones={[
          "Cerrado en ambos extremos: [lᵢ − lₛ]",
          "Abierto en ambos extremos: (lᵢ − lₛ)",
          "Abierto en el límite inferior y cerrado en el superior: (lᵢ − lₛ]",
          "Cerrado en el límite inferior y abierto en el superior: [lᵢ − lₛ)",
        ]}
        correctaIdx={2}
        explicacion="Solo el primer intervalo es cerrado en ambos extremos [lᵢ − lₛ]; desde el segundo se usa (lᵢ − lₛ]."
      />

      <AutoCheck
        pregunta="Si una variable cualitativa tiene 6 categorías, ¿qué gráfico recomienda el compendio?"
        opciones={[
          "Diagrama circular, porque supera 4 categorías",
          "Diagrama de barras, porque con más de 4 categorías no se recomienda el circular",
          "Histograma de frecuencias acumuladas",
          "Polígono de frecuencias con marcas de clase",
        ]}
        correctaIdx={1}
        explicacion="El compendio indica que si el número de categorías es superior a 4, no se recomienda el diagrama circular y debe usarse el de barras."
      />

      <AutoCheck
        pregunta="En un estudio de 20 pacientes, 4 pertenecen al grupo sanguíneo B. ¿Qué ángulo ocupa ese sector en el diagrama circular?"
        opciones={["36°", "45°", "60°", "72°"]}
        correctaIdx={3}
        explicacion="La frecuencia relativa es fᵣ = 4 / 20 = 0,20. Entonces grados = 0,20 × 360° = 72°."
      />

      <AutoCheck
        pregunta="Sobre el muestreo sistemático, ¿qué afirmación es correcta?"
        opciones={[
          "El punto de arranque se elige al azar entre 1 y k, donde k = N / n",
          "Siempre se debe comenzar por el elemento número 1 de la lista",
          "Es un muestreo no probabilístico que no requiere lista previa",
          "Nunca puede presentar sesgos aunque la población tenga ciclos",
        ]}
        correctaIdx={0}
        explicacion="El intervalo es k = N / n y el arranque i se escoge al azar entre 1 y k; si la lista tiene periodicidad puede generar sesgo."
      />

      <AutoCheck
        pregunta="¿Qué gráfico utiliza las frecuencias acumuladas (Nᵢ o Hᵢ) para mostrar hasta qué valor se acumula un porcentaje de datos?"
        opciones={[
          "Diagrama de barras horizontal",
          "Histograma de frecuencias absolutas",
          "Ojiva o polígono de frecuencias acumuladas",
          "Diagrama circular de sectores",
        ]}
        correctaIdx={2}
        explicacion="La ojiva representa el comportamiento acumulado (absoluto Nᵢ o relativo Hᵢ) y permite leer el porcentaje acumulado."
      />
    </EscenaRica>
  );
}
