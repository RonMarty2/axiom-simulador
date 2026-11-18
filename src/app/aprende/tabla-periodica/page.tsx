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
      unidad="QUI-14"
      tituloUnidad="Tabla periódica y propiedades periódicas"
      escenas={[
        { titulo: "Historia y clasificación de los elementos", componente: EscHistoriaClasificacion },
        { titulo: "Grupos, periodos y bloques s, p, d, f", componente: EscGruposPeriodos },
        { titulo: "Radio atómico y radio iónico", componente: EscRadios },
        { titulo: "Energía de ionización, afinidad, electronegatividad y carácter metálico", componente: EscTendencias },
        { titulo: "Ejercicio relacionado del banco e importancia ambiental", componente: EscBancoImportancia },
        { titulo: "Práctica PSA 2027", componente: EscPractica },
      ]}
    />
  );
}

function EscHistoriaClasificacion() {
  return (
    <EscenaRica>
      <Titulo>Historia y clasificación de los elementos</Titulo>

      <Parrafo>
        <strong>Temario oficial PSA 2027: libro del Ministerio de Educación, p. 35</strong>{" "}
        (Química · Cuarto de secundaria, Primer trimestre: Tabla periódica de los
        elementos químicos en la naturaleza: Historia de la tabla periódica,
        Clasificación de los elementos, Descripción de la tabla periódica moderna
        por grupos y periodos, Propiedades periódicas e Importancia de la tabla
        periódica en la preservación del medio ambiente).
      </Parrafo>

      <Hook>
        El sodio (Na, Z = 11) y el potasio (K, Z = 19) son metales blandos que
        reaccionan de forma explosiva al tocar el agua, mientras que el argón
        (Ar, Z = 18), situado justo entre el cloro y el potasio, es un gas
        totalmente inerte. ¿Cómo descubrieron los químicos que las propiedades de
        la materia se repiten cíclicamente y cómo puedes saber si un elemento
        conduce la electricidad o gana electrones con solo mirar su casilla?
      </Hook>

      <Definicion termino="Historia de la tabla periódica: de las tríadas a la ley periódica moderna">
        El ordenamiento actual de los 118 elementos químicos fue el resultado de
        más de un siglo de hallazgos experimentales:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>1. Johann Döbereiner (1817–1829) · Las tríadas:</strong>{" "}
            agrupó elementos con propiedades químicas semejantes en grupos de tres
            (tríadas), observando que la masa atómica del elemento central era
            aproximadamente el promedio aritmético de los otros dos. Ejemplo
            clásico: <strong>Li (7), Na (23) y K (39)</strong>, donde (7 + 39) / 2
            = <strong>23</strong> (otras tríadas: Cl–Br–I y Ca–Sr–Ba).
          </li>
          <li>
            <strong>2. John Newlands (1864) · Ley de las octavas:</strong>{" "}
            ordenó los elementos conocidos según su masa atómica creciente en
            series de siete y notó que el <strong>octavo elemento</strong>{" "}
            repetía propiedades similares al primero (como las notas de una
            octava musical). Su regla funcionaba bien hasta el calcio (Z = 20),
            pero fallaba al aparecer los metales de transición.
          </li>
          <li>
            <strong>3. Dmitri Mendeléyev y Lothar Meyer (1869) · Primera tabla periódica:</strong>{" "}
            de forma independiente ordenaron los 63 elementos conocidos según su{" "}
            <strong>masa atómica (peso atómico) creciente</strong>. Mendeléyev
            organizó las columnas por valencia química, invirtió el orden de
            algunos pares (como telurio y yodo) para respetar sus familias y dejó{" "}
            <strong>casillas vacías</strong> prediciendo con exactitud las
            propiedades de elementos aún no descubiertos: el{" "}
            <em>eka-aluminio</em> (hoy <strong>galio, Ga</strong>), el{" "}
            <em>eka-silicio</em> (hoy <strong>germanio, Ge</strong>) y el{" "}
            <em>eka-boro</em> (hoy <strong>escandio, Sc</strong>).
          </li>
          <li>
            <strong>4. Henry Moseley (1913) · Ley periódica moderna:</strong>{" "}
            estudiando los espectros de rayos X emitidos por los elementos,
            demostró que la propiedad fundamental que determina el orden periódico
            no es la masa atómica, sino el{" "}
            <strong>número atómico creciente (Z, cantidad de protones en el núcleo)</strong>.
            Así enunció la <strong>Ley periódica moderna</strong>:{" "}
            <em>&quot;Las propiedades físicas y químicas de los elementos son una
            función periódica de sus números atómicos (Z)&quot;</em>. Esto explicó
            por qué el argón (Z = 18, masa 39,95) va antes que el potasio
            (Z = 19, masa 39,10).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Clasificación general de los elementos
          </text>

          {/* 1. Metales */}
          <rect x={14} y={34} width={332} height={66} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={24} y={54} fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            1. Metales (~80% · izquierda y centro)
          </text>
          <text x={24} y={74} fill={LIENZO.fg} fontSize={13}>
            Conductores, dúctiles, maleables · Pierden e⁻ (cationes +)
          </text>
          <text x={24} y={92} fill={LIENZO.fgDim} fontSize={13}>
            Sólidos a 25 °C (única excepción líquida: Hg, Z = 80)
          </text>

          {/* 2. No metales */}
          <rect x={14} y={108} width={332} height={66} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={24} y={128} fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            2. No metales (arriba a la derecha + H)
          </text>
          <text x={24} y={148} fill={LIENZO.fg} fontSize={13}>
            Aislantes térmicos y eléctricos · Ganan o comparten e⁻
          </text>
          <text x={24} y={166} fill={LIENZO.fgDim} fontSize={13}>
            Gases (O₂, N₂, Cl₂), sólidos (C, S, P) o líquido (Br₂)
          </text>

          {/* 3. Metaloides */}
          <rect x={14} y={182} width={332} height={66} rx={8} fill={LIENZO.warn} opacity={0.11} stroke={LIENZO.warn} strokeWidth={1.6} />
          <text x={24} y={202} fill={LIENZO.warn} fontSize={14} fontWeight={700}>
            3. Metaloides o semimetales (escalera diagonal)
          </text>
          <text x={24} y={222} fill={LIENZO.fg} fontSize={13}>
            Comportamiento intermedio · Semiconductores eléctricos
          </text>
          <text x={24} y={240} fill={LIENZO.fgDim} fontSize={13}>
            Elementos: B, Si, Ge, As, Sb, Te y Po
          </text>

          {/* 4. Gases nobles */}
          <rect x={14} y={256} width={332} height={64} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.5} />
          <text x={24} y={276} fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4. Gases nobles (Grupo 18 / VIIIA · extremo derecho)
          </text>
          <text x={24} y={296} fill={LIENZO.fg} fontSize={13}>
            Capa de valencia llena: ns² np⁶ (He: 1s²) · Monoatómicos
          </text>
          <text x={24} y={313} fill={LIENZO.fgDim} fontSize={13}>
            Químicamente estables: He, Ne, Ar, Kr, Xe, Rn, Og
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Propiedades diferenciadoras de las 4 clases de elementos">
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Metales:</strong> situados a la izquierda y en el centro de la
            tabla (bloques <em>s</em>, <em>d</em>, <em>f</em> y parte inferior de{" "}
            <em>p</em>). Tienen brillo metálico, alta conductividad eléctrica y
            térmica, son <strong>maleables</strong> (forman láminas) y{" "}
            <strong>dúctiles</strong> (forman hilos). Químicamente tienen pocos
            electrones de valencia (1 a 3), se oxidan con facilidad perdiendo
            electrones para formar <strong>cationes positivos</strong> y sus
            óxidos reaccionan con el agua formando <strong>hidróxidos básicos</strong>.
          </li>
          <li>
            <strong>No metales:</strong> ubicados a la derecha de la línea
            escalonada (más el <strong>hidrógeno, H, Z = 1</strong>, que aunque
            está en la casilla del grupo 1 es un gas no metálico). No tienen
            brillo metálico, son malos conductores (excepto el grafito) y en estado
            sólido son quebradizos. Tienden a ganar electrones formando{" "}
            <strong>aniones negativos</strong> o a compartirlos en enlaces
            covalentes; sus óxidos con agua forman <strong>oxácidos</strong>.
          </li>
          <li>
            <strong>Metaloides (semimetales o anfóteros):</strong> se ubican sobre
            la diagonal quebrada que separa metales de no metales (<strong>Boro B,
            Silicio Si, Germanio Ge, Arsénico As, Antimonio Sb, Telurio Te y
            Polonio Po</strong>). Son <strong>semiconductores eléctricos</strong>{" "}
            cuya conductividad aumenta con la temperatura, propiedad clave en la
            fabricación de microchips y celdas solares.
          </li>
          <li>
            <strong>Gases nobles (gases raros o inertes):</strong> ocupan la
            columna 18 (<strong>He, Ne, Ar, Kr, Xe, Rn</strong>). Al tener su
            último nivel energético completo con 8 electrones de valencia (octeto
            completo, <em>ns² np⁶</em>, salvo el helio que completa su única capa{" "}
            <em>1s²</em> con 2 electrones), no necesitan ganar ni perder
            electrones en condiciones normales.
          </li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>&quot;Bo-Si-Ge-As-Sb-Te-Po&quot;</strong> para recordar los 7
        metaloides de la escalera diagonal: <strong>B</strong>oro (Z=5),{" "}
        <strong>Si</strong>licio (Z=14), <strong>Ge</strong>rmanio (Z=32),{" "}
        <strong>As</strong> (Arsénico, Z=33), <strong>Sb</strong> (Antimonio,
        Z=51), <strong>Te</strong>lurio (Z=52) y <strong>Po</strong>lonio (Z=84).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscGruposPeriodos() {
  return (
    <EscenaRica>
      <Titulo>Grupos, periodos y bloques s, p, d, f</Titulo>

      <Parrafo>
        La tabla periódica moderna recomendada por la IUPAC ordena los 118
        elementos en <strong>7 filas horizontales llamadas periodos</strong> y{" "}
        <strong>18 columnas verticales llamadas grupos o familias</strong>. La
        posición exacta de cualquier elemento está determinada por su{" "}
        <strong>configuración electrónica</strong>.
      </Parrafo>

      <Definicion termino="Descripción de la tabla moderna: Periodos y Grupos">
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Periodos (filas horizontales, del 1 al 7):</strong> el número
            de periodo coincide exactamente con el{" "}
            <strong>mayor nivel energético principal ocupado (n máximo o capa de
            valencia)</strong> del átomo neutro:
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li>
                <strong>Periodo 1</strong> (2 elementos: H y He) · llena el nivel{" "}
                <em>n = 1</em> (1s).
              </li>
              <li>
                <strong>Periodos 2 y 3</strong> (8 elementos cada uno, llamados
                periodos cortos) · llenan <em>ns</em> y <em>np</em>.
              </li>
              <li>
                <strong>Periodos 4 y 5</strong> (18 elementos cada uno, periodos
                largos) · incluyen los metales de transición <em>3d</em> y{" "}
                <em>4d</em>.
              </li>
              <li>
                <strong>Periodos 6 y 7</strong> (32 elementos cada uno, periodos
                muy largos) · incluyen los lantánidos (<em>4f</em>, Z = 57 a 71) y
                actínidos (<em>5f</em>, Z = 89 a 103).
              </li>
            </ul>
          </li>
          <li>
            <strong>Grupos o familias (columnas verticales, del 1 al 18 IUPAC o familias A y B):</strong>{" "}
            todos los elementos de un mismo grupo tienen la{" "}
            <strong>misma configuración electrónica en su capa de valencia</strong>{" "}
            y, por ello, presentan propiedades químicas muy parecidas.
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li>
                <strong>Grupo 1 (IA) · Metales alcalinos</strong> (Li, Na, K, Rb,
                Cs, Fr; el H no es metal alcalino): terminan en <strong>ns¹</strong>{" "}
                (1 e⁻ de valencia, valencia +1).
              </li>
              <li>
                <strong>Grupo 2 (IIA) · Metales alcalinotérreos</strong> (Be, Mg,
                Ca, Sr, Ba, Ra): terminan en <strong>ns²</strong> (2 e⁻ de
                valencia, valencia +2).
              </li>
              <li>
                <strong>Grupo 13 (IIIA) · Térreos o boroides</strong> (B, Al, Ga,
                In, Tl): <strong>ns² np¹</strong> (3 e⁻ de valencia).
              </li>
              <li>
                <strong>Grupo 14 (IVA) · Carbonoides</strong> (C, Si, Ge, Sn, Pb):{" "}
                <strong>ns² np²</strong> (4 e⁻ de valencia).
              </li>
              <li>
                <strong>Grupo 15 (VA) · Nitrogenoides</strong> (N, P, As, Sb, Bi):{" "}
                <strong>ns² np³</strong> (5 e⁻ de valencia).
              </li>
              <li>
                <strong>Grupo 16 (VIA) · Anfígenos o calcógenos</strong> (O, S,
                Se, Te, Po): <strong>ns² np⁴</strong> (6 e⁻ de valencia).
              </li>
              <li>
                <strong>Grupo 17 (VIIA) · Halógenos</strong> (F, Cl, Br, I, At):{" "}
                <strong>ns² np⁵</strong> (7 e⁻ de valencia).
              </li>
              <li>
                <strong>Grupo 18 (VIIIA) · Gases nobles</strong> (He, Ne, Ar, Kr,
                Xe, Rn): <strong>ns² np⁶</strong> (8 e⁻ de valencia; He es{" "}
                <strong>1s²</strong>).
              </li>
              <li>
                <strong>Grupos 3 al 12 (familias B) · Metales de transición:</strong>{" "}
                su electrón diferenciador ocupa orbitales <strong>(n−1)d</strong>.
              </li>
            </ul>
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Los 4 bloques cuánticos de la tabla periódica
          </text>

          {/* Bloque s */}
          <rect x={16} y={38} width={64} height={122} rx={6} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={48} y={64} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            Bloque s
          </text>
          <text x={48} y={86} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Gr. 1–2
          </text>
          <text x={48} y={106} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            (IA–IIA)
          </text>
          <text x={48} y={132} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            ns¹⁻²
          </text>

          {/* Bloque d */}
          <rect x={86} y={66} width={144} height={94} rx={6} fill={LIENZO.warn} opacity={0.14} stroke={LIENZO.warn} strokeWidth={1.6} />
          <text x={158} y={90} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>
            Bloque d (Transición)
          </text>
          <text x={158} y={114} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Grupos 3 al 12 (B)
          </text>
          <text x={158} y={138} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            ns¹⁻² (n−1)d¹⁻¹⁰
          </text>

          {/* Bloque p */}
          <rect x={236} y={38} width={108} height={122} rx={6} fill={LIENZO.ok} opacity={0.14} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={290} y={64} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            Bloque p
          </text>
          <text x={290} y={86} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Gr. 13–18
          </text>
          <text x={290} y={106} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            (IIIA–VIIIA)
          </text>
          <text x={290} y={132} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            ns² np¹⁻⁶
          </text>

          {/* Bloque f */}
          <rect x={44} y={170} width={272} height={54} rx={6} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.5} />
          <text x={180} y={192} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Bloque f · Transición interna (Lantánidos y Actínidos)
          </text>
          <text x={180} y={212} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Periodos 6 y 7 · Subniveles (n−2)f¹⁻¹⁴
          </text>

          {/* Regla de ubicacion */}
          <rect x={14} y={236} width={332} height={82} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.accent} strokeWidth={1.5} />
          <text x={180} y={258} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            Regla directa desde la configuración electrónica
          </text>
          <text x={180} y={280} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Periodo = mayor nivel n · Grupo A = e⁻ de valencia (ns + np)
          </text>
          <text x={180} y={302} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            En bloque p: Grupo IUPAC = 10 + (e⁻ en ns + e⁻ en np)
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Ejemplo resuelto · Ubicar periodo y grupo desde la configuración">
        <div style={{ marginBottom: 8 }}>
          <strong>Planteamiento:</strong> Un átomo neutro tiene configuración
          electrónica <strong>1s² 2s² 2p⁶ 3s² 3p⁴</strong>. Determina su número
          atómico (Z), su periodo, su bloque y su grupo en notación clásica (A/B) y
          en numeración IUPAC (1–18).
        </div>
        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Suma de electrones para hallar Z:</strong>{" "}
            en un átomo neutro, Z = 2 + 2 + 6 + 2 + 4 ={" "}
            <strong>16 electrones (Z = 16, Azufre, S)</strong>.
          </li>
          <li>
            <strong>Paso 2 · Determinación del periodo (mayor nivel n):</strong>{" "}
            los niveles ocupados son <em>n</em> = 1, 2 y 3. El nivel más alto es{" "}
            <strong>n = 3 → Periodo 3</strong>.
          </li>
          <li>
            <strong>Paso 3 · Determinación del bloque y electrones de valencia:</strong>{" "}
            el último subnivel es <strong>3p⁴</strong>, por lo que pertenece al{" "}
            <strong>bloque p (elemento representativo, familia A)</strong>. En la
            capa externa <em>n</em> = 3 tiene <strong>3s² 3p⁴</strong>: sumamos
            2 + 4 = <strong>6 electrones de valencia</strong>.
          </li>
          <li>
            <strong>Paso 4 · Número de grupo:</strong> con 6 electrones de
            valencia en el bloque <em>p</em>, pertenece al{" "}
            <strong>Grupo VIA</strong> (anfígenos o calcógenos) y en la tabla
            IUPAC al <strong>Grupo 10 + 6 = 16</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino usando el gas noble del periodo 3):</strong>{" "}
            el gas noble que cierra el periodo 3 es el argón (Ar, Z = 18, Grupo
            18 / VIIIA). Como nuestro elemento tiene Z = 16, se ubica 18 − 16 ={" "}
            <strong>2 casillas a la izquierda del Grupo 18</strong>, es decir, en
            el <strong>Grupo 16 (VIA) del Periodo 3</strong>.
          </li>
        </ul>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscRadios() {
  return (
    <EscenaRica>
      <Titulo>Radio atómico y radio iónico</Titulo>

      <Parrafo>
        Para no memorizar flechas a ciegas, comprende primero las{" "}
        <strong>dos causas físicas</strong> que gobiernan el tamaño y la energía de
        cualquier átomo en la tabla periódica:
        <br />
        1) El <strong>número de capas electrónicas (n) y el efecto pantalla</strong>{" "}
        de los electrones internos (que empujan la nube externa hacia afuera).
        <br />
        2) La <strong>carga nuclear efectiva (Z_ef)</strong>, que es la atracción
        neta real que ejercen los protones del núcleo sobre los electrones de la
        última capa (<em>Z_ef = Z − σ</em>, donde <em>σ</em> es el apantallamiento).
      </Parrafo>

      <Definicion termino="1. Radio atómico (rₐ): variación y justificación física">
        El <strong>radio atómico</strong> es la mitad de la distancia entre los
        núcleos de dos átomos iguales unidos entre sí.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>En un mismo GRUPO (de arriba hacia abajo, ↓): el radio AUMENTA.</strong>
            <br />
            <em>¿Por qué?</em> Cada vez que bajas un peldaño en la columna se
            agrega <strong>un nivel energético completo (mayor n)</strong> y más
            capas internas que apantallan al núcleo. La capa de valencia queda más
            lejos del núcleo (ej. en el Grupo 1:{" "}
            <strong>Li &lt; Na &lt; K &lt; Rb &lt; Cs</strong>).
          </li>
          <li>
            <strong>En un mismo PERIODO (de izquierda a derecha, →): el radio DISMINUYE.</strong>
            <br />
            <em>¿Por qué?</em> Al avanzar hacia la derecha dentro de la misma
            fila, los electrones se van añadiendo al{" "}
            <strong>mismo nivel principal n</strong> (el apantallamiento casi no
            cambia), pero el núcleo gana un protón en cada casilla (+Z). Por
            tanto, <strong>aumenta la carga nuclear efectiva (Z_ef)</strong>, que
            tira con mayor fuerza de la capa de valencia y{" "}
            <strong>encoge el átomo</strong>. Ejemplo clave del Periodo 2
            (ordenado de menor a mayor radio):{" "}
            <strong>F (Z=9) &lt; C (Z=6) &lt; Li (Z=3)</strong>.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="2. Radio iónico: catión menor y anión mayor que su átomo neutro">
        Cuando un átomo neutro pierde o gana electrones para formar un ion, su
        radio cambia radicalmente:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Radio del catión (X⁺): SIEMPRE es MENOR que el radio de su átomo neutro (r(X⁺) &lt; r(X)).</strong>
            <br />
            <em>¿Por qué?</em> Al perder electrones disminuye la repulsión
            electrón-electrón mientras los mismos protones del núcleo atraen con
            más fuerza a los electrones restantes; además, en los metales
            representativos se <strong>vacía y pierde por completo la capa de
            valencia externa</strong>.
            <br />
            Ejemplo fundamental: el átomo de sodio <strong>Na (Z = 11)</strong>{" "}
            tiene configuración <strong>1s² 2s² 2p⁶ 3s¹</strong> (3 capas,{" "}
            <em>r</em> = 186 pm), mientras que el catión{" "}
            <strong>Na⁺</strong> tiene <strong>1s² 2s² 2p⁶</strong> (solo 2 capas,{" "}
            <em>r</em> = 102 pm) porque <strong>pierde su nivel de valencia 3s¹</strong>.
            A mayor carga positiva, menor radio:{" "}
            <strong>r(Fe³⁺) &lt; r(Fe²⁺) &lt; r(Fe)</strong>.
          </li>
          <li>
            <strong>Radio del anión (Y⁻): SIEMPRE es MAYOR que el radio de su átomo neutro (r(Y⁻) &gt; r(Y)).</strong>
            <br />
            <em>¿Por qué?</em> Al ingresar uno o más electrones extra en la capa
            de valencia sin que cambie el número de protones del núcleo,{" "}
            <strong>aumenta la repulsión eléctrica entre electrones</strong> y la
            nube electrónica se dilata. Ejemplo:{" "}
            <strong>r(Cl⁻, 181 pm) &gt; r(Cl, 99 pm)</strong> y{" "}
            <strong>r(O²⁻) &gt; r(O⁻) &gt; r(O)</strong>.
          </li>
          <li>
            <strong>Series isoelectrónicas (especies con igual cantidad de electrones):</strong>{" "}
            a igual número de electrones,{" "}
            <strong>cuanto mayor es Z (más protones en el núcleo), MENOR es el radio</strong>.
            Para 10 electrones (1s² 2s² 2p⁶):{" "}
            <strong>Al³⁺ (Z=13) &lt; Mg²⁺ (Z=12) &lt; Na⁺ (Z=11) &lt; F⁻ (Z=9) &lt; O²⁻ (Z=8)</strong>.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={315}>
        <svg width="100%" height="100%" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tendencia del radio atómico y comparación iónica
          </text>

          {/* Recuadro 1: Radio atomico */}
          <rect x={14} y={34} width={332} height={96} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={180} y={54} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            1. Radio atómico (rₐ): crece hacia ABAJO e IZQUIERDA
          </text>
          <text x={180} y={78} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            En un periodo (→): sube Z_ef y el radio DISMINUYE
          </text>
          <text x={180} y={98} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>
            Ejemplo Periodo 2 (menor a mayor): F &lt; C &lt; Li
          </text>
          <text x={180} y={118} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            En un grupo (↓): más capas (n) y el radio AUMENTA
          </text>

          {/* Recuadro 2: Cation menor */}
          <rect x={14} y={140} width={332} height={96} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={180} y={160} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            2. Catión menor que su átomo: r(Na⁺) &lt; r(Na)
          </text>
          <circle cx={68} cy={196} r={22} fill={LIENZO.ok} opacity={0.25} stroke={LIENZO.ok} strokeWidth={2} />
          <text x={68} y={201} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Na</text>
          <text x={108} y={201} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>→</text>
          <circle cx={142} cy={196} r={13} fill={LIENZO.ok} opacity={0.45} stroke={LIENZO.ok} strokeWidth={2} />
          <text x={142} y={201} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Na⁺</text>
          <text x={252} y={190} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Pierde capa 3s¹
          </text>
          <text x={252} y={210} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            11 p⁺ atraen a 10 e⁻
          </text>

          {/* Recuadro 3: Anion mayor */}
          <rect x={14} y={246} width={332} height={100} rx={8} fill={LIENZO.warn} opacity={0.11} stroke={LIENZO.warn} strokeWidth={1.6} />
          <text x={180} y={266} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>
            3. Anión mayor que su átomo: r(Cl⁻) &gt; r(Cl)
          </text>
          <circle cx={64} cy={304} r={14} fill={LIENZO.warn} opacity={0.25} stroke={LIENZO.warn} strokeWidth={2} />
          <text x={64} y={309} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Cl</text>
          <text x={98} y={309} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>→</text>
          <circle cx={138} cy={304} r={23} fill={LIENZO.warn} opacity={0.45} stroke={LIENZO.warn} strokeWidth={2} />
          <text x={138} y={309} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Cl⁻</text>
          <text x={254} y={298} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Gana 1 e⁻ (más repulsión)
          </text>
          <text x={254} y={318} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Regla: r(X⁺) &lt; r(X) &lt; r(X⁻)
          </text>
        </svg>
      </Pizarra>

      <Cuidado>
        En un mismo periodo, <strong>tener mayor número atómico Z significa tener
        MENOR radio atómico</strong>. Entre Li (Z = 3), C (Z = 6) y F (Z = 9),
        todos tienen 2 capas (periodo 2), pero el flúor tiene 9 protones tirando
        de esa segunda capa, por lo que el orden de menor a mayor radio es{" "}
        <strong>F &lt; C &lt; Li</strong>.
      </Cuidado>
    </EscenaRica>
  );
}

function EscTendencias() {
  return (
    <EscenaRica>
      <Titulo>Energía de ionización, afinidad, electronegatividad y carácter metálico</Titulo>

      <Parrafo>
        El tamaño del átomo y la atracción nuclear efectiva determinan cuánta
        energía cuesta quitarle un electrón, cuánta energía libera al ganar uno y
        con qué fuerza atrae electrones al formar enlaces químicos.
      </Parrafo>

      <Definicion termino="1. Energía o potencial de ionización (EI)">
        Es la <strong>energía mínima que se debe suministrar</strong> a un átomo
        neutro, aislado y en estado gaseoso para{" "}
        <strong>arrancarle su electrón más externo</strong> (el más débilmente
        unido) y convertirlo en un catión gaseoso:
        <div style={{ margin: "6px 0", fontWeight: 700, fontSize: 15 }}>
          X(g) + EI₁ → X⁺(g) + e⁻
        </div>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Variación en un grupo (de arriba hacia abajo, ↓): DISMINUYE.</strong>{" "}
            Al bajar en un grupo aumenta el número de capas <em>n</em> y el
            electrón más externo está{" "}
            <strong>más lejos del núcleo y más apantallado</strong>, por lo que
            siente menor atracción y se requiere menos energía para arrancarlo.
          </li>
          <li>
            <strong>Variación en un periodo (de izquierda a derecha, →): AUMENTA.</strong>{" "}
            Al crecer <em>Z_ef</em> y disminuir el radio atómico, los electrones
            de valencia están más fuertemente retenidos por el núcleo.
          </li>
          <li>
            <strong>Valores extremos:</strong> los <strong>gases nobles (Grupo 18,
            especialmente el He)</strong> tienen las energías de ionización{" "}
            <strong>más altas</strong> de cada periodo por la gran estabilidad de
            su capa llena; los <strong>metales alcalinos (Grupo 1)</strong> tienen
            las <strong>más bajas</strong>. Siempre se cumple{" "}
            <strong>EI₁ &lt; EI₂ &lt; EI₃</strong> porque es más difícil arrancar
            un electrón de un ion que ya es positivo.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="2. Afinidad electrónica (AE), 3. Electronegatividad (EN) y 4. Carácter metálico">
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Afinidad electrónica (AE) o electroafinidad:</strong> es el
            cambio de energía (usualmente energía liberada) cuando un átomo neutro
            en estado gaseoso <strong>captura un electrón</strong> para formar un
            anión gaseoso: <strong>X(g) + e⁻ → X⁻(g) + energía</strong>.
            <br />
            <strong>Tendencia:</strong> aumenta de <strong>izquierda a derecha
            (→)</strong> en un periodo y de <strong>abajo hacia arriba (↑)</strong>{" "}
            en un grupo. Los <strong>halógenos (Grupo 17: F, Cl, Br, I)</strong>{" "}
            presentan las mayores afinidades electrónicas porque al ganar 1
            electrón alcanzan la configuración estable de gas noble.
          </li>
          <li>
            <strong>Electronegatividad (EN):</strong> mide la capacidad o fuerza
            relativa de un átomo para{" "}
            <strong>atraer hacia sí el par de electrones compartidos en un enlace
            químico</strong>.
            <br />
            <strong>Tendencia:</strong> aumenta de{" "}
            <strong>izquierda a derecha en un periodo (→)</strong> y de{" "}
            <strong>abajo hacia arriba en un grupo (↑)</strong> (excluyendo a los
            gases nobles, que por lo general no forman enlaces). En la{" "}
            <strong>escala de Pauling</strong>, el elemento más electronegativo es
            el <strong>Flúor (F = 4,0)</strong>, seguido del Oxígeno (O = 3,5) y
            del Cloro y Nitrógeno (~3,0). En el Periodo 3, por ejemplo, al
            comparar Na (Z=11), Al (Z=13), S (Z=16) y Cl (Z=17), el{" "}
            <strong>Cl posee la mayor electronegatividad</strong> por ser el
            halógeno situado más a la derecha.
          </li>
          <li>
            <strong>Carácter metálico (electropositividad):</strong> es la
            tendencia de un elemento a <strong>perder electrones</strong> (oxidarse)
            y exhibir propiedades metálicas. Sigue exactamente la{" "}
            <strong>misma tendencia que el radio atómico</strong> (y opuesta a la
            energía de ionización):{" "}
            <strong>aumenta hacia la izquierda en un periodo (←) y hacia abajo en
            un grupo (↓)</strong>. Los elementos de mayor carácter metálico son el{" "}
            <strong>cesio (Cs) y el francio (Fr)</strong>; los de mayor carácter
            no metálico están arriba a la derecha (<strong>F, O, Cl</strong>).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={300}>
        <svg width="100%" height="100%" viewBox="0 0 360 340" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Mapa-resumen de tendencias periódicas
          </text>

          {/* Familia 1: Suben arriba y derecha */}
          <rect x={14} y={36} width={332} height={114} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={180} y={56} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            Aumentan hacia ARRIBA (↑) y a la DERECHA (→)
          </text>
          <text x={24} y={80} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            • Energía de ionización (EI) · Máximo: Gases nobles (He)
          </text>
          <text x={24} y={100} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            • Electronegatividad (EN) · Máximo: Flúor (F = 4,0)
          </text>
          <text x={24} y={120} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            • Afinidad electrónica (AE) · Máximo: Halógenos (Gr. 17)
          </text>
          <text x={24} y={140} fill={LIENZO.fgDim} fontSize={13}>
            • Carácter no metálico (facilidad para ganar electrones)
          </text>

          {/* Familia 2: Suben abajo e izquierda */}
          <rect x={14} y={160} width={332} height={92} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={180} y={180} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            Aumentan hacia ABAJO (↓) y a la IZQUIERDA (←)
          </text>
          <text x={24} y={204} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            • Radio atómico (rₐ) · Mayor tamaño: esquina inferior izq.
          </text>
          <text x={24} y={224} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            • Carácter metálico (electropositividad) · Máx: Cs y Fr
          </text>
          <text x={24} y={242} fill={LIENZO.fgDim} fontSize={13}>
            • Facilidad para perder e⁻ y formar cationes e hidróxidos
          </text>

          {/* Regla de oro comparativa */}
          <rect x={14} y={262} width={332} height={64} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.5} />
          <text x={180} y={284} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Regla nemotécnica de las 2 esquinas opuestas
          </text>
          <text x={180} y={308} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Hacia F (↑ →): suben EI, AE, EN · Hacia Cs (↓ ←): suben rₐ y metal
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>&quot;El Flúor atrae todo, el Cesio es gigante y suelta todo&quot;:</strong>{" "}
        ubica al <strong>Flúor (arriba a la derecha)</strong> y al{" "}
        <strong>Cesio/Francio (abajo a la izquierda)</strong>. Todo lo que
        signifique <strong>retener o atraer electrones</strong> (Energía de
        ionización, Afinidad electrónica, Electronegatividad y Carácter no
        metálico) crece hacia el <strong>Flúor (↑ y →)</strong>. Todo lo que
        signifique <strong>tamaño y ceder electrones</strong> (Radio atómico y
        Carácter metálico) crece hacia el <strong>Cesio (↓ y ←)</strong>.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscBancoImportancia() {
  return (
    <EscenaRica>
      <Titulo>Ejercicio relacionado del banco e importancia ambiental</Titulo>

      <Parrafo>
        En los exámenes pasados de la UMSS este tema casi no aparece (no hay
        preguntas directas de propiedades periódicas y la única pregunta
        relacionada del banco conecta la configuración de la última capa con la
        posición del elemento en la tabla), pero entra completo en la lista
        oficial del temario PSA 2027.
      </Parrafo>

      <WorkedExample titulo="Ejercicio relacionado del banco · UMSS (2011-parcial1-2-2011 · Pregunta 13)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> Un elemento tiene en su quinta y
          última capa 2 electrones desapareados y 2 apareados, si la cantidad de
          neutrones es igual al número de protones sumado en 2. Hallar el número
          de masa del elemento.
          <br />
          <strong>Opciones:</strong> A) 100 · B) 103 · <strong>C) 102</strong> ·
          D) 101 · E) Ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> los datos de la &quot;quinta y última
          capa&quot; definen directamente el <strong>periodo (n = 5)</strong> y la{" "}
          <strong>configuración de valencia</strong> del elemento. Con eso lo
          ubicamos en su grupo y periodo de la tabla periódica para conocer su
          número atómico <em>Z</em> (protones) y luego calculamos el número de
          masa <em>A = Z + n</em>.
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Identificar el periodo por la última capa:</strong>{" "}
            como la quinta capa es la última ocupada, el nivel energético máximo es{" "}
            <strong>n = 5</strong>, por lo que el elemento pertenece al{" "}
            <strong>Periodo 5</strong>.
          </li>
          <li>
            <strong>Paso 2 · Traducir los electrones de la capa 5 a subniveles (5s y 5p):</strong>{" "}
            en el nivel 5 primero se llena el orbital <strong>5s</strong> con{" "}
            <strong>2 electrones apareados (5s²)</strong>. Los otros{" "}
            <strong>2 electrones desapareados</strong> se ubican en dos orbitales
            distintos del subnivel <strong>5p</strong> según la regla de máxima
            multiplicidad de Hund (<strong>5pₓ¹ 5pᵧ¹</strong>, es decir,{" "}
            <strong>5p²</strong>). Por tanto, la configuración de valencia es{" "}
            <strong>5s² 5p²</strong> (4 electrones de valencia).
          </li>
          <li>
            <strong>Paso 3 · Ubicar el grupo y el número atómico Z en la tabla periódica:</strong>{" "}
            terminar en <strong>5s² 5p²</strong> ubica al elemento en el{" "}
            <strong>Periodo 5 y Grupo 14 (IVA, familia de los carbonoides)</strong>:
            es el <strong>Estaño (Sn)</strong>. Sumamos los electrones por Aufbau
            hasta 5p²:
            <br />
            1s² (2) + 2s² (2) + 2p⁶ (6) + 3s² (2) + 3p⁶ (6) + 4s² (2) + 3d¹⁰ (10)
            + 4p⁶ (6) + 5s² (2) + 4d¹⁰ (10) + 5p² (2) ={" "}
            <strong>50 electrones → Z = 50 protones</strong>.
          </li>
          <li>
            <strong>Paso 4 · Calcular la cantidad de neutrones (n):</strong>{" "}
            el enunciado indica que los neutrones son los protones sumados en 2:
            <br />
            <em>n</em> = 50 + 2 = <strong>52 neutrones</strong>.
          </li>
          <li>
            <strong>Paso 5 · Calcular el número de masa (A = Z + n):</strong>{" "}
            sumamos protones más neutrones:
            <br />
            <em>A</em> = 50 + 52 = <strong>102</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino usando el gas noble Kriptón):</strong>{" "}
            el Periodo 4 cierra con el gas noble Kriptón, <strong>[Kr] con Z = 36</strong>.
            Para llegar a <strong>5s² 4d¹⁰ 5p²</strong> en el Periodo 5 sumamos
            una operación por vez: 36 + 2 (del 5s²) = 38; luego 38 + 10 (del
            4d¹⁰) = 48; y 48 + 2 (del 5p²) = <strong>50 (Z = 50)</strong>. Como{" "}
            <em>A</em> = <em>Z</em> + (<em>Z</em> + 2) = 2<em>Z</em> + 2,
            calculamos 2 × 50 = 100 y 100 + 2 = <strong>102</strong>.
          </li>
        </ul>
        <div>
          <strong>Respuesta: C (102).</strong>
        </div>
      </WorkedExample>

      <Definicion termino="Importancia de la tabla periódica en la preservación del medio ambiente">
        El programa oficial destaca cómo conocer las familias y propiedades
        periódicas permite proteger los ecosistemas y desarrollar tecnologías
        limpias:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>1. Monitoreo y remediación de metales pesados contaminantes:</strong>{" "}
            elementos de alta masa atómica como el{" "}
            <strong>mercurio (Hg, Z = 80)</strong>, el{" "}
            <strong>cadmio (Cd, Z = 48)</strong> (ambos del Grupo 12) y el{" "}
            <strong>plomo (Pb, Z = 82, Grupo 14)</strong>, así como el metaloide{" "}
            <strong>arsénico (As, Z = 33, Grupo 15)</strong>, son altamente
            tóxicos y se bioacumulan en ríos y suelos por actividades mineras e
            industriales. Conocer su radio iónico y su afinidad química por el
            azufre permite diseñar filtros y procesos de precipitación para
            purificar aguas residuales.
          </li>
          <li>
            <strong>2. Transición energética y el litio en los salares de Bolivia:</strong>{" "}
            el <strong>litio (Li, Z = 3, Periodo 2, Grupo 1)</strong> es el metal
            sólido más liviano de la tabla periódica y, por su baja energía de
            ionización y pequeño radio iónico (Li⁺), almacena gran densidad de
            energía en las <strong>baterías de ion-litio</strong>. Su
            industrialización responsable en el Salar de Uyuni es clave para
            almacenar energía renovable y reducir la quema de combustibles fósiles.
          </li>
          <li>
            <strong>3. Semiconductores solares y catálisis ambiental:</strong>{" "}
            los metaloides del Grupo 14 como el <strong>silicio (Si)</strong> y el{" "}
            <strong>germanio (Ge)</strong> permiten fabricar paneles solares
            fotovoltaicos, mientras que los metales de transición del bloque{" "}
            <em>d</em> (<strong>platino Pt, paladio Pd y rodio Rh</strong>) se
            emplean en los convertidores catalíticos para transformar gases
            contaminantes (CO y óxidos de nitrógeno) en gases inocuos (CO₂ y N₂).
          </li>
          <li>
            <strong>4. Sustitución de compuestos dañinos por familias químicas:</strong>{" "}
            comprender la reactividad de los halógenos (Grupo 17: Cl, F, Br)
            permitió identificar cómo los clorofluorocarbonos (CFC) liberaban
            átomos de cloro en la estratósfera destruyendo la capa de ozono (O₃)
            y reemplazarlos por refrigerantes menos dañinos.
          </li>
        </ul>
      </Definicion>

      <Conexion>
        Las propiedades periódicas que acabas de estudiar son la base directa del
        siguiente tema del programa (<strong>Enlaces químicos</strong>): cuando se
        unen un <strong>metal de baja electronegatividad y baja energía de
        ionización</strong> (izquierda de la tabla, como Na) con un{" "}
        <strong>no metal de alta electronegatividad</strong> (derecha de la tabla,
        como Cl), el metal cede su electrón al no metal formando un{" "}
        <strong>enlace iónico</strong>; en cambio, cuando se unen dos no metales de
        electronegatividad alta y similar, comparten electrones formando un{" "}
        <strong>enlace covalente</strong>.
      </Conexion>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Práctica PSA 2027</Titulo>

      <Misconception titulo="Error 1 · 'El radio atómico aumenta hacia la derecha en un periodo porque el átomo tiene más protones y electrones'">
        <strong>Realidad:</strong> dentro de un mismo periodo todos los electrones
        de valencia entran en la <strong>misma capa n</strong>, pero el núcleo
        tiene cada vez más protones (+Z). Esa mayor{" "}
        <strong>carga nuclear efectiva (Z_ef)</strong> atrae y comprime la nube
        electrónica, por lo que el radio atómico{" "}
        <strong>DISMINUYE de izquierda a derecha (→)</strong>. En el periodo 2, el
        flúor (Z = 9) es más pequeño que el carbono (Z = 6) y que el litio
        (Z = 3): <strong>F &lt; C &lt; Li</strong>.
      </Misconception>

      <Misconception titulo="Error 2 · 'Un catión como Na⁺ tiene igual o mayor radio que su átomo neutro Na'">
        <strong>Realidad:</strong> todo <strong>catión (carga +) es siempre más
        pequeño</strong> que su átomo neutro porque pierde electrones (en el caso
        de Na → Na⁺ pierde por completo su capa de valencia <em>3s¹</em>) y los
        mismos protones atraen con mayor fuerza a los electrones restantes. Al
        revés, todo <strong>anión (carga −) es siempre más grande</strong> que su
        átomo neutro por la mayor repulsión entre electrones.
      </Misconception>

      <Misconception titulo="Error 3 · 'El Helio o el Neón son los elementos más electronegativos porque están arriba a la derecha'">
        <strong>Realidad:</strong> los <strong>gases nobles (Grupo 18)</strong>{" "}
        sí tienen la mayor <strong>energía de ionización</strong> de su periodo,
        pero al tener su octeto completo casi no forman enlaces químicos y no
        atraen electrones compartidos. El elemento con{" "}
        <strong>mayor electronegatividad de toda la tabla es el Flúor (F = 4,0)</strong>{" "}
        en el Grupo 17 (halógenos).
      </Misconception>

      <Resumen>
        <strong>Lo que debes dominar para el examen PSA 2027:</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Ley periódica moderna (Moseley):</strong> los elementos se
            ordenan por su <strong>número atómico creciente (Z)</strong> en 7
            periodos (filas) y 18 grupos (columnas).
          </li>
          <li>
            <strong>Ubicación por configuración:</strong> el{" "}
            <strong>Periodo</strong> es el mayor nivel <em>n</em>; en elementos
            representativos (bloques <em>s</em> y <em>p</em>), los{" "}
            <strong>electrones de valencia (ns + np)</strong> indican el grupo A
            (ej. <em>3s² 3p⁴</em> → Periodo 3, 6 e⁻ de valencia → Grupo VIA o 16).
          </li>
          <li>
            <strong>Radio atómico y carácter metálico:</strong> aumentan hacia{" "}
            <strong>abajo en un grupo (↓)</strong> y hacia la{" "}
            <strong>izquierda en un periodo (←)</strong>.
          </li>
          <li>
            <strong>Radio iónico:</strong>{" "}
            <strong>r(catión X⁺) &lt; r(átomo neutro X) &lt; r(anión X⁻)</strong>.
          </li>
          <li>
            <strong>Energía de ionización, afinidad electrónica y electronegatividad:</strong>{" "}
            aumentan hacia <strong>arriba en un grupo (↑)</strong> y hacia la{" "}
            <strong>derecha en un periodo (→)</strong>.
          </li>
        </ul>
      </Resumen>

      <AutoCheck
        pregunta="Un átomo neutro tiene configuración electrónica 1s² 2s² 2p⁶ 3s² 3p⁴. ¿A qué periodo y grupo pertenece?"
        opciones={[
          "Periodo 3, Grupo VIA (16)",
          "Periodo 3, Grupo IVA (14)",
          "Periodo 4, Grupo VIA (16)",
          "Periodo 2, Grupo VIA (16)",
        ]}
        correctaIdx={0}
        explicacion="Paso 1 · El nivel energético principal más alto ocupado es n = 3, por lo que pertenece al Periodo 3. Paso 2 · Los electrones de valencia en el nivel n = 3 son 2 (en 3s²) + 4 (en 3p⁴) = 6 electrones de valencia, lo que corresponde al Grupo VIA (Grupo 16 en IUPAC). Verificación: Z = 2 + 2 + 6 + 2 + 4 = 16 es el azufre (S), ubicado en el Periodo 3 y Grupo VIA (16)."
      />

      <AutoCheck
        pregunta="Ordena de menor a mayor radio atómico los siguientes elementos del periodo 2: Li (Z = 3), C (Z = 6), F (Z = 9)."
        opciones={[
          "Li < C < F",
          "F < C < Li",
          "C < F < Li",
          "F < Li < C",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · Los tres elementos pertenecen al mismo Periodo 2 (n = 2). En un mismo periodo, al aumentar Z de izquierda a derecha crece la carga nuclear efectiva y atrae con más fuerza a los electrones del mismo nivel, disminuyendo el radio atómico. Paso 2 · Por tanto, el de mayor Z es el más pequeño (F, Z = 9) y el de menor Z es el más grande (Li, Z = 3). Orden de menor a mayor: F < C < Li."
      />

      <AutoCheck
        pregunta="¿Cuál de los siguientes elementos posee la mayor electronegatividad?"
        opciones={[
          "Na",
          "Al",
          "Cl",
          "S",
        ]}
        correctaIdx={2}
        explicacion="Paso 1 · Todos pertenecen al Periodo 3: Na (Z = 11, Grupo 1), Al (Z = 13, Grupo 13), S (Z = 16, Grupo 16) y Cl (Z = 17, Grupo 17). Paso 2 · La electronegatividad aumenta de izquierda a derecha en un periodo (excluyendo a los gases nobles), por lo que alcanza su valor máximo en el halógeno Cl."
      />

      <AutoCheck
        pregunta="Comparando Na (Z = 11) con su catión Na⁺, ¿cuál tiene menor radio y por qué?"
        opciones={[
          "Na, porque tiene mayor carga nuclear",
          "Tienen el mismo radio",
          "Na⁺, porque gana un protón",
          "Na⁺, porque pierde su nivel de valencia 3s¹",
        ]}
        correctaIdx={3}
        explicacion="Paso 1 · El átomo neutro de Na (Z = 11) tiene 11 electrones con configuración 1s² 2s² 2p⁶ 3s¹ (3 niveles), mientras que el catión Na⁺ tiene 10 electrones (1s² 2s² 2p⁶), perdiendo por completo la capa externa n = 3 (3s¹). Paso 2 · Además, todo catión es menor que su átomo neutro porque conserva los mismos 11 protones atrayendo a menos electrones. Respuesta: Na⁺, porque pierde su nivel de valencia 3s¹."
      />

      <AutoCheck
        pregunta="La primera energía de ionización en un grupo de la tabla periódica (de arriba hacia abajo):"
        opciones={[
          "Aumenta porque aumenta la masa atómica",
          "Disminuye porque el electrón más externo está más lejos del núcleo",
          "Permanece constante",
          "Aumenta porque hay más capas electrónicas",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · Al bajar en un grupo aumenta el nivel principal n (hay más capas electrónicas, mayor radio atómico y mayor efecto pantalla de los electrones internos). Paso 2 · Como el electrón de valencia más externo está más alejado del núcleo, siente menor atracción efectiva y requiere menos energía para ser arrancado. Respuesta: disminuye porque el electrón más externo está más lejos del núcleo."
      />
    </EscenaRica>
  );
}
