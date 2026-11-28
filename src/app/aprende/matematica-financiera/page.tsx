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
      unidad="MAT-29"
      tituloUnidad="Matemática financiera"
      escenas={[
        { titulo: "Capital, tasa, tiempo e interés simple", componente: EscInteresSimple },
        { titulo: "Despejes en interés simple", componente: EscDespejesSimple },
        { titulo: "Interés compuesto: interés sobre interés", componente: EscInteresCompuesto },
        { titulo: "Periodos de capitalización", componente: EscCapitalizacion },
        { titulo: "Descuentos y aumentos sucesivos", componente: EscDescuentosSucesivos },
        { titulo: "Errores frecuentes y práctica final", componente: EscPracticaFinal },
      ]}
    />
  );
}

function EscInteresSimple() {
  return (
    <EscenaRica>
      <Titulo>Capital, tasa, tiempo e interés simple</Titulo>

      <Hook>
        Un laboratorio clínico en Cochabamba guarda sus ahorros en un depósito a
        plazo fijo para renovar un microscopio el próximo año. ¿Cuánto dinero
        adicional se genera con el paso del tiempo y qué reglas deciden esa
        ganancia?
      </Hook>

      <Puente>
        Imagina que prestas <MathText>{"$\\text{Bs } 1000$"}</MathText> con un
        acuerdo de <MathText>{"$10\\%$"}</MathText> anual de interés simple. Como
        el <MathText>{"$10\\%$"}</MathText> de <MathText>{"$1000$"}</MathText> es{" "}
        <MathText>{"$\\text{Bs } 100$"}</MathText>, cada año se suma exactamente
        esa misma cantidad: en <MathText>{"$1$"}</MathText> año llegas a{" "}
        <MathText>{"$\\text{Bs } 1100$"}</MathText>, en{" "}
        <MathText>{"$2$"}</MathText> años a{" "}
        <MathText>{"$\\text{Bs } 1200$"}</MathText> y en{" "}
        <MathText>{"$3$"}</MathText> años a{" "}
        <MathText>{"$\\text{Bs } 1300$"}</MathText>. El crecimiento es parejo
        porque el porcentaje siempre se calcula sobre el capital inicial.
      </Puente>

      <Definicion termino="Elementos y fórmulas del interés simple">
        En toda operación financiera intervienen cinco cantidades:
        <ul style={{ margin: "8px 0 8px 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Capital (<MathText>{"$C$"}</MathText>):</strong> dinero inicial
            depositado o prestado (en bolivianos, Bs).
          </li>
          <li>
            <strong>Tasa de interés (<MathText>{"$r$"}</MathText>):</strong>{" "}
            porcentaje por periodo escrito en forma decimal (por ejemplo,{" "}
            <MathText>{"$6\\% = \\dfrac{6}{100} = 0{,}06$"}</MathText>).
          </li>
          <li>
            <strong>Tiempo (<MathText>{"$t$"}</MathText>):</strong> duración del
            depósito o préstamo.
          </li>
          <li>
            <strong>Interés (<MathText>{"$I$"}</MathText>):</strong> ganancia o
            costo adicional que genera el capital:{" "}
            <MathText>{"$I = C \\cdot r \\cdot t$"}</MathText>.
          </li>
          <li>
            <strong>Monto final (<MathText>{"$M$"}</MathText>):</strong> suma del
            capital más el interés:{" "}
            <MathText>{"$M = C + I = C(1 + r \\cdot t)$"}</MathText>.
          </li>
        </ul>
        <strong>Regla de oro de unidades coherentes:</strong>{" "}
        <MathText>{"$r$"}</MathText> y <MathText>{"$t$"}</MathText> deben estar
        siempre en la <strong>misma unidad de tiempo</strong>. Si la tasa es
        anual y el plazo está en <MathText>{"$m$"}</MathText> meses, convierte{" "}
        <MathText>{"$t = \\dfrac{m}{12}$"}</MathText> años (o divide la tasa anual
        entre <MathText>{"$12$"}</MathText> para obtener la tasa mensual). Si el
        plazo está en <MathText>{"$d$"}</MathText> días comerciales, usa{" "}
        <MathText>{"$t = \\dfrac{d}{360}$"}</MathText> años.
      </Definicion>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="flechaSimple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
          </defs>

          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Interés simple: crecimiento lineal
          </text>
          <text x={180} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Capital Bs 1000 al 10% anual (+Bs 100/año)
          </text>

          {/* Ejes: x en [68, 326], y en [58, 218] con corte de escala bajo 1000 */}
          <line x1={68} y1={218} x2={332} y2={218} stroke={LIENZO.fgDim} strokeWidth={1.6} markerEnd="url(#flechaSimple)" />
          <line x1={68} y1={218} x2={68} y2={58} stroke={LIENZO.fgDim} strokeWidth={1.6} markerEnd="url(#flechaSimple)" />
          <path d="M 63 209 L 73 205 M 63 213 L 73 209" stroke={LIENZO.fgDim} strokeWidth={1.3} />

          {/* Línea base de capital constante C = 1000 */}
          <line x1={68} y1={196} x2={318} y2={196} stroke={LIENZO.fgFaint} strokeWidth={1.3} strokeDasharray="4,3" />

          {/* Marcas y etiquetas eje Y (Bs) */}
          <line x1={64} y1={196} x2={72} y2={196} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <line x1={64} y1={158} x2={72} y2={158} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <line x1={64} y1={120} x2={72} y2={120} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <line x1={64} y1={82} x2={72} y2={82} stroke={LIENZO.fgDim} strokeWidth={1.4} />

          <text x={58} y={200} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>1000</text>
          <text x={58} y={162} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>1100</text>
          <text x={58} y={124} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>1200</text>
          <text x={58} y={86} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>1300</text>

          {/* Marcas y etiquetas eje X (años) */}
          <line x1={148} y1={214} x2={148} y2={222} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <line x1={228} y1={214} x2={228} y2={222} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <line x1={308} y1={214} x2={308} y2={222} stroke={LIENZO.fgDim} strokeWidth={1.4} />

          <text x={68} y={237} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>0</text>
          <text x={148} y={237} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>1 año</text>
          <text x={228} y={237} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>2 años</text>
          <text x={308} y={237} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>3 años</text>

          {/* Escalones de incremento constante (+Bs 100 por año) */}
          <line x1={68} y1={196} x2={148} y2={196} stroke={LIENZO.ok} strokeWidth={1.3} strokeDasharray="3,3" />
          <line x1={148} y1={196} x2={148} y2={158} stroke={LIENZO.ok} strokeWidth={1.6} strokeDasharray="3,3" />
          <line x1={148} y1={158} x2={228} y2={158} stroke={LIENZO.ok} strokeWidth={1.3} strokeDasharray="3,3" />
          <line x1={228} y1={158} x2={228} y2={120} stroke={LIENZO.ok} strokeWidth={1.6} strokeDasharray="3,3" />
          <line x1={228} y1={120} x2={308} y2={120} stroke={LIENZO.ok} strokeWidth={1.3} strokeDasharray="3,3" />
          <line x1={308} y1={120} x2={308} y2={82} stroke={LIENZO.ok} strokeWidth={1.6} strokeDasharray="3,3" />

          {/* Recta exacta de interés simple */}
          <line x1={68} y1={196} x2={308} y2={82} stroke={LIENZO.accent} strokeWidth={2.6} />

          {/* Puntos en t = 0, 1, 2, 3 */}
          <circle cx={68} cy={196} r={4.5} fill={LIENZO.accent} />
          <circle cx={148} cy={158} r={4.5} fill={LIENZO.accent} />
          <circle cx={228} cy={120} r={4.5} fill={LIENZO.accent} />
          <circle cx={308} cy={82} r={4.5} fill={LIENZO.accent} />

          {/* Valores encima y a la izquierda de cada punto */}
          <text x={138} y={146} textAnchor="end" fill={LIENZO.fg} fontSize={13} fontWeight={700}>1100</text>
          <text x={218} y={108} textAnchor="end" fill={LIENZO.fg} fontSize={13} fontWeight={700}>1200</text>
          <text x={298} y={70} textAnchor="end" fill={LIENZO.fg} fontSize={13} fontWeight={700}>1300</text>

          {/* Etiquetas de salto constante a la derecha de cada escalón */}
          <text x={155} y={182} textAnchor="start" fill={LIENZO.ok} fontSize={13} fontWeight={700}>+100</text>
          <text x={235} y={144} textAnchor="start" fill={LIENZO.ok} fontSize={13} fontWeight={700}>+100</text>
          <text x={340} y={106} textAnchor="end" fill={LIENZO.ok} fontSize={13} fontWeight={700}>+100</text>

          {/* Cuadro resumen inferior */}
          <rect x={14} y={254} width={332} height={54} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
          <text x={180} y={276} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Interés simple: crece igual cada año
          </text>
          <text x={180} y={297} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Cada año suma exactamente Bs 100
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Ejemplo resuelto · Monto final en interés simple">
        <p className="mb-2">
          Un laboratorio deposita <MathText>{"$\\text{Bs } 4000$"}</MathText> al{" "}
          <MathText>{"$6\\%$"}</MathText> anual de interés simple durante{" "}
          <MathText>{"$3$"}</MathText> años. ¿Cuál será el monto final?
        </p>
        <p className="text-sm">
          <strong>Paso 1 (Datos y unidades):</strong>{" "}
          <MathText>{"$C = \\text{Bs } 4000$"}</MathText>,{" "}
          <MathText>{"$r = 6\\% = 0{,}06$"}</MathText> anual y{" "}
          <MathText>{"$t = 3$"}</MathText> años. Tasa y tiempo ya están en años.
          <br />
          <strong>Paso 2 (Interés generado):</strong>{" "}
          <MathText>{"$I = C \\cdot r \\cdot t = 4000 \\times 0{,}06 \\times 3$"}</MathText>{" "}
          <MathText>{"$= 240 \\times 3 = \\text{Bs } 720$"}</MathText>.
          <br />
          <strong>Paso 3 (Monto final):</strong>{" "}
          <MathText>{"$M = C + I = 4000 + 720 = \\text{Bs } 4720$"}</MathText>.
          <br />
          <strong>Comprobación:</strong>{" "}
          <MathText>{"$6\\%$"}</MathText> anual durante{" "}
          <MathText>{"$3$"}</MathText> años acumula{" "}
          <MathText>{"$18\\%$"}</MathText> total;{" "}
          <MathText>{"$M = 4000(1 + 0{,}18)$"}</MathText>{" "}
          <MathText>{"$= 4000 \\times 1{,}18 = \\text{Bs } 4720$"}</MathText>.
        </p>
      </WorkedExample>

      <Cuidado>
        Nunca reemplaces el porcentaje sin dividirlo entre{" "}
        <MathText>{"$100$"}</MathText>: <MathText>{"$6\\%$"}</MathText> es{" "}
        <MathText>{"$0{,}06$"}</MathText>, no <MathText>{"$6$"}</MathText>.
        Además, revisa siempre que la unidad de <MathText>{"$r$"}</MathText>{" "}
        coincida con la unidad de <MathText>{"$t$"}</MathText> antes de
        multiplicar.
      </Cuidado>
    </EscenaRica>
  );
}

function EscDespejesSimple() {
  return (
    <EscenaRica>
      <Titulo>Despejes en interés simple (capital, tasa y tiempo)</Titulo>

      <Puente>
        En la ecuación <MathText>{"$I = C \\cdot r \\cdot t$"}</MathText> hay
        cuatro cantidades conectadas por multiplicación. Si conoces tres de ellas,
        despejas la que falta dividiendo <MathText>{"$I$"}</MathText> entre el
        producto de las otras dos, exactamente igual que al despejar velocidad o
        tiempo en <MathText>{"$d = v \\cdot t$"}</MathText>.
      </Puente>

      <Definicion termino="Fórmulas despejadas y casos de duplicación">
        A partir de <MathText>{"$I = C \\cdot r \\cdot t$"}</MathText>:
        <ul style={{ margin: "8px 0 8px 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Capital inicial:</strong>{" "}
            <MathText>{"$C = \\dfrac{I}{r \\cdot t}$"}</MathText>
          </li>
          <li>
            <strong>Tasa de interés:</strong>{" "}
            <MathText>{"$r = \\dfrac{I}{C \\cdot t}$"}</MathText> (multiplica por{" "}
            <MathText>{"$100$"}</MathText> para pasarla a porcentaje)
          </li>
          <li>
            <strong>Tiempo:</strong>{" "}
            <MathText>{"$t = \\dfrac{I}{C \\cdot r}$"}</MathText> (sale en la
            misma unidad de tiempo que la tasa)
          </li>
        </ul>
        <strong>Cuando el enunciado dice que un capital se duplica o triplica:</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            Si el capital se <strong>duplica</strong>, el monto final es{" "}
            <MathText>{"$M = 2C$"}</MathText>, así que el interés ganado es{" "}
            <MathText>{"$I = M - C = 2C - C = C$"}</MathText>.
          </li>
          <li>
            Si el capital se <strong>triplica</strong>, el monto final es{" "}
            <MathText>{"$M = 3C$"}</MathText>, por lo que el interés ganado es{" "}
            <MathText>{"$I = 3C - C = 2C$"}</MathText>.
          </li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Ejemplo resuelto · Hallar el capital cuando el plazo está en meses">
        <p className="mb-2">
          ¿Qué capital produce un interés simple de{" "}
          <MathText>{"$\\text{Bs } 600$"}</MathText> en{" "}
          <MathText>{"$8$"}</MathText> meses al <MathText>{"$9\\%$"}</MathText>{" "}
          anual?
        </p>
        <p className="text-sm">
          <strong>Paso 1 (Convertir a unidades coherentes):</strong>{" "}
          <MathText>{"$I = \\text{Bs } 600$"}</MathText>,{" "}
          <MathText>{"$r = 9\\% = 0{,}09$"}</MathText> anual y{" "}
          <MathText>{"$t = \\dfrac{8}{12} = \\dfrac{2}{3}$"}</MathText> años.
          <br />
          <strong>Paso 2 (Elegir el despeje de capital):</strong>{" "}
          <MathText>{"$C = \\dfrac{I}{r \\cdot t}$"}</MathText>.
          <br />
          <strong>Paso 3 (Calcular el denominador y dividir):</strong>{" "}
          <MathText>{"$r \\cdot t = 0{,}09 \\times \\dfrac{2}{3} = 0{,}03 \\times 2 = 0{,}06$"}</MathText>.
          Luego:{" "}
          <MathText>{"$C = \\dfrac{600}{0{,}06} = \\dfrac{60\\,000}{6} = \\text{Bs } 10\\,000$"}</MathText>.
          <br />
          <strong>Comprobación (dos caminos):</strong> en años,{" "}
          <MathText>{"$10\\,000 \\times 0{,}09 \\times \\dfrac{8}{12}$"}</MathText>{" "}
          <MathText>{"$= 900 \\times \\dfrac{2}{3} = \\text{Bs } 600$"}</MathText>.
          En tasa mensual,{" "}
          <MathText>{"$\\dfrac{9\\%}{12} = 0{,}75\\%$"}</MathText> al mes, y en{" "}
          <MathText>{"$8$"}</MathText> meses acumula{" "}
          <MathText>{"$6\\%$"}</MathText>; el <MathText>{"$6\\%$"}</MathText> de{" "}
          <MathText>{"$\\text{Bs } 10\\,000$"}</MathText> es{" "}
          <MathText>{"$\\text{Bs } 600$"}</MathText>.
        </p>
      </WorkedExample>

      <PorQue>
        ¿Por qué al duplicarse un capital reemplazamos{" "}
        <MathText>{"$I = C$"}</MathText> y no <MathText>{"$I = 2C$"}</MathText>?
        Porque <MathText>{"$2C$"}</MathText> es el monto total acumulado (tu
        dinero inicial más la ganancia). Si empiezas con{" "}
        <MathText>{"$\\text{Bs } 100$"}</MathText> y terminas con{" "}
        <MathText>{"$\\text{Bs } 200$"}</MathText>, el interés ganado fue{" "}
        <MathText>{"$200 - 100 = \\text{Bs } 100$"}</MathText>, igual al capital
        inicial. Como <MathText>{"$C$"}</MathText> aparece arriba y abajo al
        despejar, se cancela y el resultado no depende del monto invertido.
      </PorQue>

      <AutoCheck
        pregunta={"¿A qué tasa anual de interés simple se duplica un capital en $5$ años?"}
        opciones={["$15\\%$", "$20\\%$", "$25\\%$", "$40\\%$"]}
        correctaIdx={1}
        explicacion={"Si el capital se duplica, el monto final es $M = 2C$ y el interés ganado es $I = 2C - C = C$. Despeja la tasa: $r = \\dfrac{I}{C \\times t} = \\dfrac{C}{C \\times 5} = \\dfrac{1}{5} = 0{,}20$, es decir, $20\\%$ anual. Comprobación: con $\\text{Bs } 100$ al $20\\%$ ganas $\\text{Bs } 20$ cada año; en $5$ años acumulas $20 \\times 5 = \\text{Bs } 100$ de interés y llegas a $\\text{Bs } 200$."}
      />
    </EscenaRica>
  );
}

function EscInteresCompuesto() {
  return (
    <EscenaRica>
      <Titulo>Interés compuesto: cuando el interés genera interés</Titulo>

      <Puente>
        Compara qué ocurre con <MathText>{"$\\text{Bs } 5000$"}</MathText> al{" "}
        <MathText>{"$10\\%$"}</MathText> anual durante{" "}
        <MathText>{"$2$"}</MathText> años en ambos sistemas:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Interés simple:</strong> cada año suma el{" "}
            <MathText>{"$10\\%$"}</MathText> de los{" "}
            <MathText>{"$\\text{Bs } 5000$"}</MathText> iniciales (
            <MathText>{"$\\text{Bs } 500$"}</MathText>). Año 1:{" "}
            <MathText>{"$\\text{Bs } 5500$"}</MathText>. Año 2:{" "}
            <MathText>{"$5500 + 500 = \\text{Bs } 6000$"}</MathText>.
          </li>
          <li>
            <strong>Interés compuesto:</strong> al terminar el año 1, los{" "}
            <MathText>{"$\\text{Bs } 500$"}</MathText> ganados se integran al
            capital. Año 1: <MathText>{"$\\text{Bs } 5500$"}</MathText> (igual
            que el simple). Año 2: el <MathText>{"$10\\%$"}</MathText> se aplica
            ahora sobre <MathText>{"$\\text{Bs } 5500$"}</MathText>, generando{" "}
            <MathText>{"$\\text{Bs } 550$"}</MathText>, así que acumulas{" "}
            <MathText>{"$5500 + 550 = \\text{Bs } 6050$"}</MathText>.
          </li>
        </ul>
      </Puente>

      <Definicion termino="Fórmula del interés compuesto">
        En cada periodo el capital acumulado se multiplica por el factor{" "}
        <MathText>{"$(1 + r)$"}</MathText>. Después de{" "}
        <MathText>{"$t$"}</MathText> periodos iguales:
        <br />
        <MathText>{"$M = C(1 + r)^t$"}</MathText>
        <br />
        Esta fórmula entrega directamente el <strong>monto final</strong>{" "}
        <MathText>{"$M$"}</MathText>. Si necesitas conocer únicamente el{" "}
        <strong>interés ganado</strong>, resta el capital inicial:
        <br />
        <MathText>{"$I = M - C$"}</MathText>
      </Definicion>

      <Pizarra alto={310}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="flechaComp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
          </defs>

          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Simple vs. compuesto (Bs 5000 al 10%)
          </text>

          {/* Leyenda superior sin solapamientos */}
          <line x1={48} y1={43} x2={68} y2={43} stroke={LIENZO.accent} strokeWidth={2.8} />
          <text x={74} y={48} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Compuesto
          </text>
          <line x1={192} y1={43} x2={212} y2={43} stroke={LIENZO.fgDim} strokeWidth={2.2} strokeDasharray="5,4" />
          <text x={218} y={48} fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>
            Simple
          </text>

          {/* Ejes: origen (66, 210) representa M = 5000; escala 0,06 px/Bs */}
          <line x1={66} y1={210} x2={334} y2={210} stroke={LIENZO.fgDim} strokeWidth={1.6} markerEnd="url(#flechaComp)" />
          <line x1={66} y1={210} x2={66} y2={58} stroke={LIENZO.fgDim} strokeWidth={1.6} markerEnd="url(#flechaComp)" />

          {/* Marcas eje Y: 5000 (210), 6000 (150), 7000 (90) */}
          <line x1={62} y1={150} x2={70} y2={150} stroke={LIENZO.fgDim} strokeWidth={1.3} />
          <line x1={62} y1={90} x2={70} y2={90} stroke={LIENZO.fgDim} strokeWidth={1.3} />
          <line x1={66} y1={150} x2={326} y2={150} stroke={LIENZO.fgFaint} strokeWidth={1} strokeDasharray="3,3" />
          <line x1={66} y1={90} x2={326} y2={90} stroke={LIENZO.fgFaint} strokeWidth={1} strokeDasharray="3,3" />

          <text x={58} y={214} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>5000</text>
          <text x={58} y={154} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>6000</text>
          <text x={58} y={94} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>7000</text>

          {/* Marcas eje X: t = 0, 1, 2, 3, 4 años (paso 62 px) */}
          <line x1={128} y1={206} x2={128} y2={214} stroke={LIENZO.fgDim} strokeWidth={1.3} />
          <line x1={190} y1={206} x2={190} y2={214} stroke={LIENZO.fgDim} strokeWidth={1.3} />
          <line x1={252} y1={206} x2={252} y2={214} stroke={LIENZO.fgDim} strokeWidth={1.3} />
          <line x1={314} y1={206} x2={314} y2={214} stroke={LIENZO.fgDim} strokeWidth={1.3} />

          <text x={66} y={232} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>0</text>
          <text x={128} y={232} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>1</text>
          <text x={190} y={232} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>2</text>
          <text x={252} y={232} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>3</text>
          <text x={314} y={232} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>4 años</text>

          {/* Recta simple: (66,210) -> (128,180) -> (190,150) -> (252,120) -> (314,90) */}
          <line x1={66} y1={210} x2={314} y2={90} stroke={LIENZO.fgDim} strokeWidth={2.2} strokeDasharray="6,4" />

          {/* Curva compuesta exacta: 5000, 5500, 6050, 6655, 7320.5 */}
          <path
            d="M 66 210 L 128 180 L 190 147 L 252 110.7 L 314 70.8"
            fill="none"
            stroke={LIENZO.accent}
            strokeWidth={2.8}
          />

          {/* Puntos simple */}
          <circle cx={190} cy={150} r={3.5} fill={LIENZO.fgDim} />
          <circle cx={252} cy={120} r={3.5} fill={LIENZO.fgDim} />
          <circle cx={314} cy={90} r={4} fill={LIENZO.fgDim} />

          {/* Puntos compuesto */}
          <circle cx={66} cy={210} r={4} fill={LIENZO.accent} />
          <circle cx={128} cy={180} r={4.5} fill={LIENZO.accent} />
          <circle cx={190} cy={147} r={4.5} fill={LIENZO.accent} />
          <circle cx={252} cy={110.7} r={4.5} fill={LIENZO.accent} />
          <circle cx={314} cy={70.8} r={4.5} fill={LIENZO.accent} />

          {/* Etiquetas en zonas despejadas */}
          <text x={136} y={198} textAnchor="start" fill={LIENZO.fg} fontSize={13}>
            5500 (igual)
          </text>
          <text x={298} y={72} textAnchor="end" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            7320,5
          </text>
          <line x1={314} y1={95} x2={310} y2={114} stroke={LIENZO.fgFaint} strokeWidth={1.2} />
          <text x={320} y={128} textAnchor="end" fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>
            7000
          </text>

          {/* Tarjeta inferior comparativa */}
          <rect x={14} y={248} width={332} height={88} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
          <text x={26} y={271} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Año 1: ambos alcanzan Bs 5500
          </text>
          <text x={26} y={295} fill={LIENZO.fg} fontSize={13}>
            Año 2: Simple Bs 6000, Compuesto Bs 6050
          </text>
          <text x={26} y={319} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Extra en Año 2: +Bs 50 (10% de Bs 500)
          </text>
        </svg>
      </Pizarra>

      <PorQue>
        Al cabo de un solo periodo (<MathText>{"$t = 1$"}</MathText>), ambos
        sistemas coinciden porque todavía no existen intereses previos que puedan
        producir nuevos intereses. A partir de{" "}
        <MathText>{"$t = 2$"}</MathText>, la curva compuesta se curva hacia arriba
        porque cada año crece sobre una base cada vez mayor.
      </PorQue>

      <AutoCheck
        pregunta={"Si depositas $\\text{Bs } 2000$ al $10\\%$ anual de interés compuesto durante $3$ años, ¿cuál es el interés ganado al finalizar el plazo?"}
        opciones={["$\\text{Bs } 600$", "$\\text{Bs } 2662$", "$\\text{Bs } 620$", "$\\text{Bs } 662$"]}
        correctaIdx={3}
        explicacion={"Calcula primero el monto final con $M = C(1 + r)^3$: $M = 2000 \\times (1{,}10)^3 = 2000 \\times 1{,}331 = \\text{Bs } 2662$. Como la pregunta pide solo el interés ganado, resta el capital inicial: $I = M - C = 2662 - 2000 = \\text{Bs } 662$. Comprobación año a año: año $1$ ganas $\\text{Bs } 200$ (llegas a $\\text{Bs } 2200$), año $2$ ganas $\\text{Bs } 220$ (llegas a $\\text{Bs } 2420$) y año $3$ ganas $\\text{Bs } 242$ (llegas a $\\text{Bs } 2662$); suma total $200 + 220 + 242 = \\text{Bs } 662$."}
      />
    </EscenaRica>
  );
}

function EscCapitalizacion() {
  return (
    <EscenaRica>
      <Titulo>Periodos de capitalización (semestral, trimestral, mensual)</Titulo>

      <Puente>
        Muchas entidades no esperan un año completo para sumar los intereses al
        capital: pueden capitalizar cada semestre, cada trimestre o cada mes.
        Cuando un año se divide en <MathText>{"$m$"}</MathText> tramos iguales,
        la tasa anual se parte entre <MathText>{"$m$"}</MathText> y el número de
        periodos se multiplica por <MathText>{"$m$"}</MathText>.
      </Puente>

      <Definicion termino="Capitalización fraccionada dentro del año">
        Si una tasa nominal anual <MathText>{"$j$"}</MathText> se capitaliza{" "}
        <MathText>{"$m$"}</MathText> veces al año durante{" "}
        <MathText>{"$t$"}</MathText> años:
        <ul style={{ margin: "8px 0 8px 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Tasa por periodo:</strong>{" "}
            <MathText>{"$i = \\dfrac{j}{m}$"}</MathText>
          </li>
          <li>
            <strong>Número total de periodos:</strong>{" "}
            <MathText>{"$n = m \\cdot t$"}</MathText>
          </li>
          <li>
            <strong>Monto final:</strong>{" "}
            <MathText>{"$M = C\\left(1 + \\dfrac{j}{m}\\right)^{m \\cdot t}$"}</MathText>
          </li>
        </ul>
        Valores habituales de <MathText>{"$m$"}</MathText> en{" "}
        <MathText>{"$1$"}</MathText> año: anual (<MathText>{"$m = 1$"}</MathText>),
        semestral (<MathText>{"$m = 2$"}</MathText>), cuatrimestral (
        <MathText>{"$m = 3$"}</MathText>), trimestral (
        <MathText>{"$m = 4$"}</MathText>) y mensual (
        <MathText>{"$m = 12$"}</MathText>).
      </Definicion>

      <Pizarra alto={310}>
        <svg width="100%" height="100%" viewBox="0 0 360 350" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            1 año al 12% nominal según periodo
          </text>

          {/* Fila 1: Anual (m = 1) */}
          <text x={16} y={50} fill={LIENZO.fgDim} fontSize={13} fontWeight={700}>
            Anual: 1 periodo de 12%
          </text>
          <rect x={16} y={58} width={328} height={26} rx={6} fill={LIENZO.fgFaint} opacity={0.28} stroke={LIENZO.fgDim} strokeWidth={1.3} />
          <text x={180} y={76} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            12%
          </text>

          {/* Fila 2: Semestral (m = 2) */}
          <text x={16} y={110} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Semestral: 2 periodos de 6%
          </text>
          <rect x={16} y={118} width={160} height={26} rx={6} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={96} y={136} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>6%</text>
          <rect x={184} y={118} width={160} height={26} rx={6} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={264} y={136} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>6%</text>

          {/* Fila 3: Trimestral (m = 4) */}
          <text x={16} y={170} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Trimestral: 4 periodos de 3%
          </text>
          <rect x={16} y={178} width={77.5} height={26} rx={5} fill={LIENZO.ok} opacity={0.14} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={54.75} y={196} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>3%</text>
          <rect x={99.5} y={178} width={77.5} height={26} rx={5} fill={LIENZO.ok} opacity={0.14} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={138.25} y={196} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>3%</text>
          <rect x={183} y={178} width={77.5} height={26} rx={5} fill={LIENZO.ok} opacity={0.14} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={221.75} y={196} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>3%</text>
          <rect x={266.5} y={178} width={77.5} height={26} rx={5} fill={LIENZO.ok} opacity={0.14} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={305.25} y={196} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>3%</text>

          {/* Fila 4: Mensual (m = 12) */}
          <text x={16} y={230} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            Mensual: 12 periodos de 1%
          </text>
          {Array.from({ length: 12 }).map((_, idx) => (
            <rect
              key={idx}
              x={16 + idx * 27.5}
              y={238}
              width={25.5}
              height={22}
              rx={4}
              fill={LIENZO.warn}
              opacity={0.18}
              stroke={LIENZO.warn}
              strokeWidth={1.2}
            />
          ))}

          {/* Cuadro fórmula inferior */}
          <rect x={14} y={276} width={332} height={60} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.3} />
          <text x={180} y={299} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            Divide la tasa anual y multiplica los periodos
          </text>
          <text x={180} y={322} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Más periodos al año, más capitalizaciones
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Ejemplo resuelto · Capitalización semestral">
        <p className="mb-2">
          Una clínica deposita <MathText>{"$\\text{Bs } 10\\,000$"}</MathText> al{" "}
          <MathText>{"$12\\%$"}</MathText> anual capitalizable semestralmente
          durante <MathText>{"$1$"}</MathText> año. ¿Cuál es el monto final?
        </p>
        <p className="text-sm">
          <strong>Paso 1 (Hallar tasa por periodo y cantidad de periodos):</strong>{" "}
          Como es semestral, hay <MathText>{"$m = 2$"}</MathText> periodos por año.
          Entonces{" "}
          <MathText>{"$i = \\dfrac{12\\%}{2} = 6\\% = 0{,}06$"}</MathText> y{" "}
          <MathText>{"$n = 2 \\times 1 = 2$"}</MathText> semestres.
          <br />
          <strong>Paso 2 (Sustituir en la fórmula):</strong>{" "}
          <MathText>{"$M = 10\\,000(1 + 0{,}06)^2$"}</MathText>{" "}
          <MathText>{"$= 10\\,000 \\times (1{,}06)^2$"}</MathText>.
          <br />
          <strong>Paso 3 (Calcular):</strong>{" "}
          <MathText>{"$(1{,}06)^2 = 1{,}1236$"}</MathText>, luego{" "}
          <MathText>{"$M = 10\\,000 \\times 1{,}1236 = \\text{Bs } 11\\,236$"}</MathText>.
          <br />
          <strong>Comprobación (semestre a semestre):</strong> en el primer
          semestre ganas el <MathText>{"$6\\%$"}</MathText> de{" "}
          <MathText>{"$10\\,000$"}</MathText> (<MathText>{"$\\text{Bs } 600$"}</MathText>)
          y llegas a <MathText>{"$\\text{Bs } 10\\,600$"}</MathText>. En el
          segundo semestre ganas el <MathText>{"$6\\%$"}</MathText> de{" "}
          <MathText>{"$10\\,600$"}</MathText> (<MathText>{"$\\text{Bs } 636$"}</MathText>)
          y acumulas{" "}
          <MathText>{"$10\\,600 + 636 = \\text{Bs } 11\\,236$"}</MathText>.
        </p>
      </WorkedExample>

      <PorQue>
        Con la misma tasa nominal del <MathText>{"$12\\%$"}</MathText> anual,
        capitalizar una sola vez al año produce{" "}
        <MathText>{"$\\text{Bs } 11\\,200$"}</MathText>, mientras que capitalizar
        semestralmente alcanza <MathText>{"$\\text{Bs } 11\\,236$"}</MathText>.
        Esos <MathText>{"$\\text{Bs } 36$"}</MathText> extra son el{" "}
        <MathText>{"$6\\%$"}</MathText> de los{" "}
        <MathText>{"$\\text{Bs } 600$"}</MathText> ganados en el primer semestre.
      </PorQue>

      <Conexion>
        En la fórmula <MathText>{"$M = C(1 + i)^n$"}</MathText>, si alguna vez te
        piden despejar el exponente <MathText>{"$n$"}</MathText>, usarás las
        propiedades de logaritmos vistas en Logaritmación.
      </Conexion>
    </EscenaRica>
  );
}

function EscDescuentosSucesivos() {
  return (
    <EscenaRica>
      <Titulo>Descuentos y aumentos sucesivos</Titulo>

      <Hook>
        Una farmacia rebaja un medicamento de{" "}
        <MathText>{"$\\text{Bs } 250$"}</MathText> en un{" "}
        <MathText>{"$20\\%$"}</MathText> y luego ofrece un{" "}
        <MathText>{"$10\\%$"}</MathText> adicional sobre el precio rebajado. Al
        pagar te cobran <MathText>{"$\\text{Bs } 180$"}</MathText>, no{" "}
        <MathText>{"$\\text{Bs } 175$"}</MathText>. ¿Por qué dos descuentos del{" "}
        <MathText>{"$20\\%$"}</MathText> y <MathText>{"$10\\%$"}</MathText> no
        equivalen a un <MathText>{"$30\\%$"}</MathText>?
      </Hook>

      <Puente>
        El segundo descuento no se calcula sobre los{" "}
        <MathText>{"$\\text{Bs } 250$"}</MathText> originales, sino sobre el
        precio que quedó después de la primera rebaja:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Primer descuento (<MathText>{"$20\\%$"}</MathText>):</strong>{" "}
            pagas el <MathText>{"$80\\%$"}</MathText>, así que{" "}
            <MathText>{"$250 \\times 0{,}80 = \\text{Bs } 200$"}</MathText>.
          </li>
          <li>
            <strong>Segundo descuento (<MathText>{"$10\\%$"}</MathText> sobre{" "}
            <MathText>{"$\\text{Bs } 200$"}</MathText>):</strong> pagas el{" "}
            <MathText>{"$90\\%$"}</MathText> de <MathText>{"$200$"}</MathText>,
            o sea{" "}
            <MathText>{"$200 \\times 0{,}90 = \\text{Bs } 180$"}</MathText>.
          </li>
          <li>
            <strong>Rebaja total real:</strong> bajó{" "}
            <MathText>{"$250 - 180 = \\text{Bs } 70$"}</MathText>, que es{" "}
            <MathText>{"$\\dfrac{70}{250} = 0{,}28 = 28\\%$"}</MathText> (no{" "}
            <MathText>{"$30\\%$"}</MathText>).
          </li>
        </ul>
      </Puente>

      <Definicion termino="Factor multiplicativo y fórmulas equivalentes">
        Cada cambio porcentual equivale a multiplicar por un factor:
        <ul style={{ margin: "8px 0 8px 18px", padding: 0, fontSize: 15 }}>
          <li>
            Un <strong>descuento</strong> de <MathText>{"$d\\%$"}</MathText>{" "}
            multiplica por <MathText>{"$\\left(1 - \\dfrac{d}{100}\\right)$"}</MathText>.
            Para <MathText>{"$20\\%$"}</MathText> y{" "}
            <MathText>{"$10\\%$"}</MathText>, el factor total es{" "}
            <MathText>{"$0{,}80 \\times 0{,}90 = 0{,}72$"}</MathText>, por lo que
            el descuento único es{" "}
            <MathText>{"$1 - 0{,}72 = 0{,}28 = 28\\%$"}</MathText>.
          </li>
          <li>
            Un <strong>aumento</strong> de <MathText>{"$a\\%$"}</MathText>{" "}
            multiplica por <MathText>{"$\\left(1 + \\dfrac{a}{100}\\right)$"}</MathText>.
          </li>
          <li>
            <strong>Descuento único equivalente</strong> para dos descuentos{" "}
            <MathText>{"$d_1\\%$"}</MathText> y <MathText>{"$d_2\\%$"}</MathText>:{" "}
            <MathText>{"$D_{\\text{eq}} = d_1 + d_2 - \\dfrac{d_1 \\cdot d_2}{100}$"}</MathText>.
          </li>
          <li>
            <strong>Aumento único equivalente</strong> para dos aumentos{" "}
            <MathText>{"$a_1\\%$"}</MathText> y <MathText>{"$a_2\\%$"}</MathText>:{" "}
            <MathText>{"$A_{\\text{eq}} = a_1 + a_2 + \\dfrac{a_1 \\cdot a_2}{100}$"}</MathText>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 360 320" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="flechaDesc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.fgDim} />
            </marker>
            <marker id="flechaDescOk" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={LIENZO.ok} />
            </marker>
          </defs>

          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Descuentos sucesivos: factor multiplicativo
          </text>

          {/* Caja 1: Inicio Bs 250 */}
          <rect x={16} y={60} width={72} height={54} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgDim} strokeWidth={1.4} />
          <text x={52} y={82} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>Inicio</text>
          <text x={52} y={102} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>Bs 250</text>

          {/* Flecha 1: -20% (queda 80%) */}
          <text x={116} y={48} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>-20%</text>
          <text x={116} y={72} textAnchor="middle" fill={LIENZO.accent} fontSize={13}>80%</text>
          <line x1={93} y1={87} x2={139} y2={87} stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#flechaDesc)" />

          {/* Caja 2: Paso 1 Bs 200 */}
          <rect x={144} y={60} width={72} height={54} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.4} />
          <text x={180} y={82} textAnchor="middle" fill={LIENZO.accent} fontSize={13}>Paso 1</text>
          <text x={180} y={102} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>Bs 200</text>

          {/* Flecha 2: -10% (queda 90%) */}
          <text x={244} y={48} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>-10%</text>
          <text x={244} y={72} textAnchor="middle" fill={LIENZO.ok} fontSize={13}>90%</text>
          <line x1={221} y1={87} x2={267} y2={87} stroke={LIENZO.fgDim} strokeWidth={1.8} markerEnd="url(#flechaDesc)" />

          {/* Caja 3: Pagas Bs 180 */}
          <rect x={272} y={60} width={72} height={54} rx={8} fill={LIENZO.ok} opacity={0.12} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={308} y={82} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>Pagas</text>
          <text x={308} y={102} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>Bs 180</text>

          {/* Arco de factor único directo */}
          <path d="M 52 120 Q 180 176 308 120" fill="none" stroke={LIENZO.ok} strokeWidth={2} markerEnd="url(#flechaDescOk)" />
          <text x={180} y={170} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Resultado final: 72% del precio (28% menos)
          </text>

          {/* Comparación Correcto vs Error */}
          <rect x={14} y={190} width={332} height={54} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.4} />
          <text x={26} y={212} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Correcto: descuento real del 28%
          </text>
          <text x={26} y={233} fill={LIENZO.fg} fontSize={13}>
            Pagas Bs 180 y ahorras Bs 70
          </text>

          <rect x={14} y={254} width={332} height={54} rx={8} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.4} />
          <text x={26} y={276} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Error común: sumar ambos porcentajes
          </text>
          <text x={26} y={297} fill={LIENZO.fg} fontSize={13}>
            Daría Bs 175 (el segundo va sobre Bs 200)
          </text>
        </svg>
      </Pizarra>

      <AutoCheck
        pregunta={"Un reactivo de laboratorio recibe dos descuentos sucesivos del $25\\%$ y del $20\\%$. ¿Cuál es el descuento único equivalente?"}
        opciones={["$40\\%$", "$45\\%$", "$50\\%$", "$60\\%$"]}
        correctaIdx={0}
        explicacion={"Con el factor multiplicativo: tras $25\\%$ de rebaja pagas $0{,}75$ del precio, y tras $20\\%$ adicional pagas $0{,}80$ de ese resto. El factor total es $0{,}75 \\times 0{,}80 = 0{,}60$ (pagas el $60\\%$), por lo que el descuento único equivalente es $100\\% - 60\\% = 40\\%$. Comprobación con fórmula: $D_{\\text{eq}} = 25 + 20 - \\dfrac{25 \\times 20}{100} = 45 - 5 = 40\\%$."}
      />
    </EscenaRica>
  );
}

function EscPracticaFinal() {
  return (
    <EscenaRica>
      <Titulo>Errores frecuentes y práctica final</Titulo>

      <Misconception titulo="Error 1 · Sumar dos descuentos sucesivos como si fueran uno solo">
        <strong>Realidad:</strong> el segundo porcentaje se aplica sobre el precio
        ya rebajado, no sobre el precio inicial. El factor multiplicativo es{" "}
        <MathText>{"$0{,}80 \\times 0{,}90 = 0{,}72$"}</MathText>, lo que equivale
        a un descuento único del <MathText>{"$28\\%$"}</MathText>.
      </Misconception>

      <Misconception titulo="Error 2 · Multiplicar directo por los meses sin convertir el tiempo a años">
        <strong>Realidad:</strong> mezclar una tasa anual con un tiempo en meses
        multiplica el interés por <MathText>{"$12$"}</MathText>. Convierte siempre
        a la misma unidad: <MathText>{"$t = \\dfrac{8}{12} = \\dfrac{2}{3}$"}</MathText>{" "}
        años, o usa la tasa mensual{" "}
        <MathText>{"$\\dfrac{9\\%}{12} = 0{,}75\\%$"}</MathText>.
      </Misconception>

      <Misconception titulo="Error 3 · Confundir el monto compuesto con el interés ganado">
        <strong>Realidad:</strong> <MathText>{"$M$"}</MathText> representa el{" "}
        <strong>monto final</strong> (capital más interés). Si el problema pide
        únicamente el interés ganado, resta el capital inicial:{" "}
        <MathText>{"$I = M - C$"}</MathText>.
      </Misconception>

      <Cuidado>
        Si un precio sube un <MathText>{"$20\\%$"}</MathText> y luego baja un{" "}
        <MathText>{"$20\\%$"}</MathText>, <strong>no</strong> regresa al valor
        original: el factor es{" "}
        <MathText>{"$1{,}20 \\times 0{,}80 = 0{,}96$"}</MathText>, así que queda
        un <MathText>{"$4\\%$"}</MathText> por debajo del precio inicial.
      </Cuidado>

      <Mnemotecnia>
        Antes de hacer cualquier cuenta, responde estas tres preguntas: (1){" "}
        <strong>¿simple o compuesto?</strong> (recta{" "}
        <MathText>{"$I = C \\cdot r \\cdot t$"}</MathText> frente a potencia{" "}
        <MathText>{"$M = C(1 + i)^n$"}</MathText>); (2){" "}
        <strong>¿misma unidad de tiempo?</strong> (años con años, meses con meses,
        semestres con semestres); (3){" "}
        <strong>¿te piden monto <MathText>{"$M$"}</MathText> o interés{" "}
        <MathText>{"$I$"}</MathText>?</strong> Recuerda siempre{" "}
        <MathText>{"$I = M - C$"}</MathText>.
      </Mnemotecnia>

      <Resumen>
        <strong>Interés simple:</strong>{" "}
        <MathText>{"$I = C \\cdot r \\cdot t$"}</MathText> y{" "}
        <MathText>{"$M = C(1 + r \\cdot t)$"}</MathText> con{" "}
        <MathText>{"$r$"}</MathText> y <MathText>{"$t$"}</MathText> en la misma
        unidad; despejes{" "}
        <MathText>{"$C = \\dfrac{I}{r \\cdot t}$"}</MathText>,{" "}
        <MathText>{"$r = \\dfrac{I}{C \\cdot t}$"}</MathText> y{" "}
        <MathText>{"$t = \\dfrac{I}{C \\cdot r}$"}</MathText> (duplicar:{" "}
        <MathText>{"$I = C$"}</MathText>; triplicar:{" "}
        <MathText>{"$I = 2C$"}</MathText>).{" "}
        <strong>Interés compuesto:</strong>{" "}
        <MathText>{"$M = C(1 + r)^t$"}</MathText> e{" "}
        <MathText>{"$I = M - C$"}</MathText>; con <MathText>{"$m$"}</MathText>{" "}
        capitalizaciones al año,{" "}
        <MathText>{"$i = \\dfrac{j}{m}$"}</MathText>,{" "}
        <MathText>{"$n = m \\cdot t$"}</MathText> y{" "}
        <MathText>{"$M = C\\left(1 + \\dfrac{j}{m}\\right)^{m \\cdot t}$"}</MathText>.{" "}
        <strong>Cambios sucesivos:</strong> multiplica factores{" "}
        <MathText>{"$\\left(1 - \\dfrac{d}{100}\\right)$"}</MathText> o{" "}
        <MathText>{"$\\left(1 + \\dfrac{a}{100}\\right)$"}</MathText>;{" "}
        <MathText>{"$D_{\\text{eq}} = d_1 + d_2 - \\dfrac{d_1 d_2}{100}$"}</MathText>{" "}
        y{" "}
        <MathText>{"$A_{\\text{eq}} = a_1 + a_2 + \\dfrac{a_1 a_2}{100}$"}</MathText>.
      </Resumen>

      <AutoCheck
        pregunta={"Una clínica deposita $\\text{Bs } 6000$ al $8\\%$ anual de interés simple durante $9$ meses. ¿Cuánto interés genera?"}
        opciones={["$\\text{Bs } 480$", "$\\text{Bs } 4320$", "$\\text{Bs } 360$", "$\\text{Bs } 6360$"]}
        correctaIdx={2}
        explicacion={"Como la tasa es anual y el tiempo está en meses, convierte $9$ meses a años: $t = \\dfrac{9}{12} = \\dfrac{3}{4}$ de año. Aplica $I = C \\times r \\times t = 6000 \\times 0{,}08 \\times \\dfrac{3}{4} = 480 \\times \\dfrac{3}{4} = \\text{Bs } 360$. Comprobación: en un año genera $\\text{Bs } 480$ ($\\text{Bs } 40$ por mes), así que en $9$ meses produce $40 \\times 9 = \\text{Bs } 360$."}
      />

      <AutoCheck
        pregunta={"¿En cuántos años se triplica un capital colocado al $25\\%$ anual de interés simple?"}
        opciones={["$8$ años", "$12$ años", "$4$ años", "$6$ años"]}
        correctaIdx={0}
        explicacion={"Si el capital se triplica, el monto final es $M = 3C$ y el interés ganado es $I = 3C - C = 2C$. Despeja el tiempo: $t = \\dfrac{I}{C \\times r} = \\dfrac{2C}{C \\times 0{,}25} = \\dfrac{2}{0{,}25} = 8$ años. Comprobación: con $\\text{Bs } 100$ ganas $\\text{Bs } 25$ cada año; en $8$ años acumulas $25 \\times 8 = \\text{Bs } 200$ de interés y llegas a $\\text{Bs } 300$ (el triple)."}
      />

      <AutoCheck
        pregunta={"Un fondo de investigación médica invierte $\\text{Bs } 4000$ al $10\\%$ anual de interés compuesto durante $2$ años. ¿Cuál es el monto acumulado?"}
        opciones={["$\\text{Bs } 4400$", "$\\text{Bs } 4800$", "$\\text{Bs } 4880$", "$\\text{Bs } 4840$"]}
        correctaIdx={3}
        explicacion={"Usa $M = C(1 + r)^2$: $M = 4000 \\times (1 + 0{,}10)^2 = 4000 \\times 1{,}21 = \\text{Bs } 4840$. Comprobación año a año: al cerrar el año $1$ tienes $4000 + 400 = \\text{Bs } 4400$; en el año $2$ el $10\\%$ de $\\text{Bs } 4400$ es $\\text{Bs } 440$, y $4400 + 440 = \\text{Bs } 4840$."}
      />

      <AutoCheck
        pregunta={"Un laboratorio coloca $\\text{Bs } 8000$ al $10\\%$ anual capitalizable semestralmente durante $1$ año. ¿Cuál es el monto final?"}
        opciones={["$\\text{Bs } 8800$", "$\\text{Bs } 8820$", "$\\text{Bs } 9680$", "$\\text{Bs } 8400$"]}
        correctaIdx={1}
        explicacion={"Al capitalizar semestralmente hay $m = 2$ periodos por año. La tasa por semestre es $i = \\dfrac{10\\%}{2} = 5\\% = 0{,}05$ y el total de periodos es $n = 2 \\times 1 = 2$. Entonces $M = C(1 + i)^n = 8000 \\times (1{,}05)^2 = 8000 \\times 1{,}1025 = \\text{Bs } 8820$. Comprobación semestre a semestre: semestre $1$ suma $\\text{Bs } 400$ (llegas a $\\text{Bs } 8400$) y semestre $2$ suma el $5\\%$ de $\\text{Bs } 8400$ ($\\text{Bs } 420$), total $8400 + 420 = \\text{Bs } 8820$."}
      />

      <AutoCheck
        pregunta={"Una farmacia ofrece un tensiómetro de $\\text{Bs } 300$ con un descuento del $20\\%$ y luego un $15\\%$ adicional sobre el precio rebajado. ¿Cuánto paga el comprador?"}
        opciones={["$\\text{Bs } 195$", "$\\text{Bs } 210$", "$\\text{Bs } 204$", "$\\text{Bs } 240$"]}
        correctaIdx={2}
        explicacion={"Aplica los descuentos en orden: tras el $20\\%$ queda $300 \\times 0{,}80 = \\text{Bs } 240$; tras el $15\\%$ adicional sobre $\\text{Bs } 240$ pagas $240 \\times 0{,}85 = \\text{Bs } 204$. Comprobación con descuento único equivalente: $D_{\\text{eq}} = 20 + 15 - \\dfrac{20 \\times 15}{100} = 35 - 3 = 32\\%$; pagas el $68\\%$ de $\\text{Bs } 300$, que es $300 \\times 0{,}68 = \\text{Bs } 204$."}
      />
    </EscenaRica>
  );
}
