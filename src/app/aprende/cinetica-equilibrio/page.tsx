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
      unidad="QUI-13"
      tituloUnidad="Cinética y equilibrio químico"
      escenas={[
        { titulo: "Velocidad de reacción y factores cinéticos", componente: EscVelocidadFactores },
        { titulo: "Ley de masas, ley de velocidad y orden", componente: EscLeyVelocidad },
        { titulo: "Constante de equilibrio y cálculos de Kc y Kp", componente: EscEquilibrioKcKp },
        { titulo: "Equilibrio en procesos productivos y Le Châtelier", componente: EscLeChatelier },
        { titulo: "Ejercicios del banco relacionados (procesos industriales y ΔH)", componente: EscEjerciciosBanco },
        { titulo: "Práctica PSA 2027", componente: EscPractica },
      ]}
    />
  );
}

function EscVelocidadFactores() {
  return (
    <EscenaRica>
      <Titulo>Velocidad de reacción y factores cinéticos</Titulo>

      <Parrafo>
        <strong>Temario oficial PSA 2027: libro del Ministerio de Educación, p. 36</strong>{" "}
        (Química · Sexto de secundaria: Cinética y equilibrio químico en procesos
        productivos: Velocidad de reacción, Ley de masas, Constante de equilibrio,
        Cálculos de Kc y Kp, Equilibrio químico en los procesos productivos y
        Laboratorio de determinación de la cinética).
      </Parrafo>

      <Hook>
        Una explosión de nitroglicerina ocurre en milisegundos, la digestión de
        una comida tarda horas y la oxidación de una viga de hierro lleva años.
        Si las tres son transformaciones químicas espontáneas, ¿qué determina qué
        tan rápido se rompen los enlaces de los reactivos y cómo puedes acelerar
        o frenar una reacción en el laboratorio o en la industria?
      </Hook>

      <Definicion termino="Velocidad de reacción y expresión estequiométrica">
        La <strong>cinética química</strong> estudia la rapidez con que ocurren
        las reacciones químicas y los mecanismos moleculares por los que
        transcurren. La <strong>velocidad media de reacción (v)</strong> mide el
        cambio en la concentración molar de un reactivo o de un producto por
        unidad de tiempo (en <strong>mol/(L·s)</strong> o <strong>M/s</strong>).
        <br />
        Para una reacción general balanceada{" "}
        <strong>a A + b B → c C + d D</strong>:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Relación con los coeficientes:</strong> para que el valor de
            la velocidad <em>v</em> sea único sin importar qué sustancia midas,
            se divide la variación de cada especie entre su coeficiente
            estequiométrico:
            <br />
            <strong>
              v = −(1/a)·(Δ[A]/Δt) = −(1/b)·(Δ[B]/Δt) = +(1/c)·(Δ[C]/Δt) = +(1/d)·(Δ[D]/Δt)
            </strong>
          </li>
          <li>
            <strong>Signos:</strong> los <strong>reactivos (A, B)</strong>{" "}
            disminuyen su concentración con el tiempo (Δ[A] &lt; 0), por lo que
            llevan signo negativo adelante para que la velocidad <em>v</em> sea
            siempre <strong>positiva</strong>. Los{" "}
            <strong>productos (C, D)</strong> aumentan su concentración
            (Δ[C] &gt; 0) y llevan signo positivo.
          </li>
        </ul>
      </Definicion>

      <Definicion termino="Teoría de las colisiones y energía de activación (Eₐ)">
        Para que dos moléculas reaccionen deben cumplirse tres condiciones:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>1. Frecuencia de choque:</strong> las partículas de los
            reactivos deben chocar entre sí.
          </li>
          <li>
            <strong>2. Orientación adecuada:</strong> los átomos que van a
            formar nuevos enlaces deben enfrentarse geométricamente en el
            instante del choque.
          </li>
          <li>
            <strong>3. Energía mínima (energía de activación, Eₐ):</strong> el
            choque debe superar una barrera energética llamada{" "}
            <strong>energía de activación (Eₐ)</strong> para alcanzar el estado
            de transición o <strong>complejo activado</strong> (donde los enlaces
            viejos se están rompiendo y los nuevos se están formando). Solo los{" "}
            <strong>choques eficaces (efectivos)</strong> producen reacción.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={290}>
        <svg width="100%" height="100%" viewBox="0 0 360 330" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Perfil de energía y acción del catalizador
          </text>

          {/* Ejes */}
          <line x1={38} x2={38} y1={38} y2={236} stroke={LIENZO.fg} strokeWidth={1.8} />
          <line x1={38} x2={342} y1={236} y2={236} stroke={LIENZO.fg} strokeWidth={1.8} />
          <text x={44} y={50} fill={LIENZO.fgDim} fontSize={13} fontWeight={600}>Energía</text>
          <text x={338} y={254} textAnchor="end" fill={LIENZO.fgDim} fontSize={13}>Avance de reacción →</text>

          {/* Nivel reactivos y productos */}
          <line x1={42} x2={102} y1={166} y2={166} stroke={LIENZO.fg} strokeWidth={2.6} />
          <text x={72} y={184} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Reactivos</text>

          <line x1={264} x2={334} y1={206} y2={206} stroke={LIENZO.fg} strokeWidth={2.6} />
          <text x={299} y={224} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>Productos</text>

          {/* Curva sin catalizador */}
          <path d="M 102 166 Q 178 12 264 206" fill="none" stroke={LIENZO.bad} strokeWidth={2.5} />
          <text x={180} y={54} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            Sin catalizador (Eₐ alta)
          </text>

          {/* Curva con catalizador */}
          <path d="M 102 166 Q 178 88 264 206" fill="none" stroke={LIENZO.ok} strokeWidth={2.5} strokeDasharray="6 4" />
          <text x={182} y={118} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            Con catalizador (Eₐ menor)
          </text>

          {/* Linea de referencia reactivos */}
          <line x1={102} x2={264} y1={166} y2={166} stroke={LIENZO.fgFaint} strokeWidth={1.2} strokeDasharray="3 3" />

          {/* Recuadro inferior resumen */}
          <rect x={14} y={264} width={332} height={54} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.4} />
          <text x={180} y={284} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            El catalizador baja Eₐ y acelera v_d y v_i por igual
          </text>
          <text x={180} y={306} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            No cambia ΔH ni la constante de equilibrio K_c
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Factores que modifican la velocidad de reacción (y laboratorio)">
        En las prácticas de laboratorio de cinética química se comprueba cómo
        cinco factores controlan la velocidad:
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>1. Naturaleza de los reactivos:</strong> las reacciones
            iónicas en solución acuosa (ej. neutralización o precipitación) son
            casi instantáneas porque no requieren romper enlaces covalentes
            fuertes, a diferencia de las reacciones entre moléculas orgánicas.
          </li>
          <li>
            <strong>2. Concentración de los reactivos (o presión en gases):</strong>{" "}
            al aumentar la concentración (o comprimir un gas), hay más partículas
            por unidad de volumen, aumenta la frecuencia de colisiones y{" "}
            <strong>aumenta la velocidad</strong>.
          </li>
          <li>
            <strong>3. Temperatura:</strong> al subir la temperatura aumenta la
            energía cinética media de las moléculas y crece exponencialmente la
            fracción de choques que superan <em>Eₐ</em> (ecuación de Arrhenius:{" "}
            <em>k = A·e^(−Eₐ/RT)</em>). Aumentar la temperatura{" "}
            <strong>siempre acelera</strong> tanto las reacciones endotérmicas
            como las exotérmicas.
          </li>
          <li>
            <strong>4. Grado de división o superficie de contacto:</strong> en
            sólidos heterogéneos, pulverizar el sólido (ej. mármol CaCO₃ en polvo
            frente a un trozo entero en HCl) expone mayor área superficial y
            acelera la reacción.
          </li>
          <li>
            <strong>5. Catalizadores:</strong> sustancias que modifican la
            velocidad ofreciendo una ruta alternativa con distinta energía de
            activación, recuperándose intactas al final:
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li>
                <strong>Catalizador positivo:</strong> disminuye{" "}
                <em>Eₐ</em> y aumenta la velocidad (ej. hierro en el proceso
                Haber, V₂O₅ en el proceso de contacto o enzimas biológicas).
              </li>
              <li>
                <strong>Catalizador negativo (inhibidor):</strong> aumenta{" "}
                <em>Eₐ</em> o bloquea el sitio activo, frenando reacciones no
                deseadas (ej. conservantes de alimentos).
              </li>
            </ul>
          </li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>&quot;Co-Te-Na-Su-Ca&quot;</strong> para los 5 factores de la
        velocidad: <strong>Co</strong>ncentración, <strong>Te</strong>mperatura,{" "}
        <strong>Na</strong>turaleza de los reactivos, <strong>Su</strong>perficie
        de contacto (grado de división) y <strong>Ca</strong>talizador.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscLeyVelocidad() {
  return (
    <EscenaRica>
      <Titulo>Ley de masas, ley de velocidad y orden</Titulo>

      <Parrafo>
        En 1864, los científicos noruegos <strong>Cato Guldberg y Peter Waage</strong>{" "}
        formularon la <strong>Ley de acción de masas</strong>: a temperatura
        constante, la velocidad de una reacción química es directamente
        proporcional al producto de las concentraciones activas (molares) de los
        reactivos que participan.
      </Parrafo>

      <Definicion termino="Ecuación o ley de velocidad y orden de reacción">
        Para una reacción <strong>a A + b B → productos</strong>, la expresión
        matemática de la <strong>ley de velocidad</strong> tiene la forma:
        <div style={{ margin: "8px 0", fontWeight: 700, fontSize: 16 }}>
          v = k · [A]ᵐ · [B]ⁿ
        </div>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>[A] y [B]:</strong> concentraciones molares (mol/L) de los
            reactivos (los sólidos y líquidos puros no se incluyen porque su
            concentración es constante).
          </li>
          <li>
            <strong>Constante específica de velocidad (k):</strong> depende de la{" "}
            <strong>temperatura</strong> y de la presencia de catalizadores (por
            la ley de Arrhenius), pero <strong>no depende de las concentraciones</strong>{" "}
            de los reactivos. Sus unidades dependen del orden global.
          </li>
          <li>
            <strong>Órdenes parciales (m y n):</strong> son exponentes que se
            determinan <strong>experimentalmente</strong> midiendo cómo cambia la
            velocidad al variar las concentraciones. Pueden ser enteros (0, 1, 2)
            o fraccionarios.
          </li>
          <li>
            <strong>Orden total o global de reacción:</strong> es la suma de los
            exponentes en la ley de velocidad: <strong>Orden total = m + n</strong>.
          </li>
          <li>
            <strong>Reacción elemental (de un solo paso):</strong> únicamente
            cuando la reacción ocurre en <strong>una sola etapa elemental</strong>{" "}
            a nivel molecular, los exponentes <em>m</em> y <em>n</em> coinciden
            con los coeficientes estequiométricos <em>a</em> y <em>b</em>{" "}
            (aplicación directa de la ley de acción de masas).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={273}>
        <svg width="100%" height="100%" viewBox="0 0 360 315" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Efecto de duplicar [A] según el orden parcial m
          </text>

          {/* Orden 0 */}
          <rect x={14} y={36} width={332} height={82} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.5} />
          <text x={180} y={56} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>
            1. Orden cero (m = 0) · v = k · [A]⁰ = k
          </text>
          <text x={180} y={80} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Si duplicas [A] (×2) → v cambia por 2⁰ = ×1
          </text>
          <text x={180} y={102} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            La velocidad no depende de [A] · Unidad de k: M·s⁻¹
          </text>

          {/* Orden 1 */}
          <rect x={14} y={128} width={332} height={82} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={180} y={148} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            2. Primer orden (m = 1) · v = k · [A]¹
          </text>
          <text x={180} y={172} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Si duplicas [A] (×2) → v se duplica (2¹ = ×2)
          </text>
          <text x={180} y={194} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Proporcionalidad directa · Unidad de k: s⁻¹
          </text>

          {/* Orden 2 */}
          <rect x={14} y={220} width={332} height={82} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={180} y={240} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            3. Segundo orden (m = 2) · v = k · [A]²
          </text>
          <text x={180} y={264} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Si duplicas [A] (×2) → v se cuadruplica (2² = ×4)
          </text>
          <text x={180} y={286} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Si triplicas [A] (×3), v sube 3² = ×9 · Unidad de k: M⁻¹·s⁻¹
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Ejemplo resuelto · Ley de masas y factor de cambio en la velocidad">
        <div style={{ marginBottom: 8 }}>
          <strong>Planteamiento:</strong> Para la reacción elemental en fase
          gaseosa <strong>2 NO(g) + O₂(g) → 2 NO₂(g)</strong> a temperatura
          constante, escribe la ley de velocidad, indica el orden global y
          calcula cuántas veces aumenta la velocidad si la concentración de NO se
          duplica y la de O₂ se triplica.
        </div>
        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Ley de velocidad por ley de masas (etapa elemental):</strong>{" "}
            los coeficientes estequiométricos pasan a ser los exponentes:{" "}
            <strong>v₁ = k · [NO]² · [O₂]¹</strong>.
          </li>
          <li>
            <strong>Paso 2 · Órdenes de reacción:</strong> orden parcial respecto
            a NO = <strong>2</strong>; orden parcial respecto a O₂ ={" "}
            <strong>1</strong>; orden total o global = 2 + 1 ={" "}
            <strong>3 (tercer orden)</strong>.
          </li>
          <li>
            <strong>Paso 3 · Sustitución de las nuevas concentraciones:</strong>{" "}
            con [NO]&apos; = 2·[NO] y [O₂]&apos; = 3·[O₂], la nueva velocidad es{" "}
            <em>v₂ = k · (2·[NO])² · (3·[O₂])¹</em>.
          </li>
          <li>
            <strong>Paso 4 · Cálculo paso a paso de los factores:</strong>{" "}
            elevamos primero el factor del NO: 2² = <strong>4</strong>. Luego
            multiplicamos por el factor del O₂: 4 × 3¹ = <strong>12</strong>. Por
            tanto, <strong>v₂ = 12 · v₁</strong> (la velocidad aumenta 12 veces).
          </li>
          <li>
            <strong>Verificación (segundo camino con valores numéricos de prueba):</strong>{" "}
            asigna <em>k</em> = 1, [NO] = 1 M y [O₂] = 1 M →{" "}
            <em>v₁</em> = 1 × 1² × 1 = 1 M/s. Al pasar a [NO]&apos; = 2 M y
            [O₂]&apos; = 3 M → <em>v₂</em> = 1 × (2)² × (3) = 4 × 3 ={" "}
            <strong>12 M/s</strong>, que es exactamente 12 veces <em>v₁</em>.
          </li>
        </ul>
      </WorkedExample>

      <Cuidado>
        En las relaciones de velocidad de desaparición y aparición{" "}
        <strong>v = −(1/a)·Δ[A]/Δt = +(1/c)·Δ[C]/Δt</strong>, los coeficientes
        dividen a las variaciones temporales; en cambio, en la{" "}
        <strong>ley de acción de masas</strong> (<em>v = k·[A]ᵃ·[B]ᵇ</em> para
        etapas elementales), los coeficientes van como{" "}
        <strong>exponentes</strong>. No mezcles ambas fórmulas.
      </Cuidado>
    </EscenaRica>
  );
}

function EscEquilibrioKcKp() {
  return (
    <EscenaRica>
      <Titulo>Constante de equilibrio y cálculos de Kc y Kp</Titulo>

      <Parrafo>
        Muchas reacciones en procesos industriales no se detienen cuando aún
        quedan reactivos, porque los productos formados vuelven a reaccionar
        entre sí regenerando los reactivos. Son las{" "}
        <strong>reacciones reversibles (⇄)</strong>.
      </Parrafo>

      <Definicion termino="Equilibrio químico dinámico y expresión de Kc y Kp">
        El <strong>equilibrio químico</strong> se alcanza en un sistema cerrado a
        temperatura constante cuando la{" "}
        <strong>velocidad de la reacción directa (v_d) se iguala a la velocidad
        de la reacción inversa (v_i)</strong>.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Carácter dinámico:</strong> a nivel molecular las reacciones
            directa e inversa <strong>siguen ocurriendo</strong> a la misma
            velocidad (<em>v_d = v_i &gt; 0</em>), pero a nivel macroscópico las{" "}
            <strong>concentraciones de reactivos y productos permanecen
            constantes</strong> en el tiempo (ojo: constantes no significa
            iguales entre sí).
          </li>
          <li>
            <strong>Constante de equilibrio en concentraciones (Kc):</strong>{" "}
            para la reacción reversible{" "}
            <strong>a A(g) + b B(g) ⇄ c C(g) + d D(g)</strong>, al igualar{" "}
            <em>v_d = k_d·[A]ᵃ·[B]ᵇ</em> con <em>v_i = k_i·[C]ᶜ·[D]ᵈ</em> se
            obtiene:
            <br />
            <strong>Kc = k_d / k_i = ([C]ᶜ · [D]ᵈ) / ([A]ᵃ · [B]ᵇ)</strong>{" "}
            (siempre productos en el numerador y reactivos en el denominador,
            elevados a sus coeficientes estequiométricos).
          </li>
          <li>
            <strong>Constante de equilibrio en presiones parciales (Kp):</strong>{" "}
            para gases ideales, usando las presiones parciales en atmósferas:
            <br />
            <strong>Kp = (P_Cᶜ · P_Dᵈ) / (P_Aᵃ · P_Bᵇ)</strong>
          </li>
          <li>
            <strong>Relación entre Kp y Kc:</strong> como{" "}
            <em>P_i = [i]·R·T</em>, al sustituir en <em>Kp</em> resulta:
            <br />
            <strong>Kp = Kc · (R · T)^(Δn)</strong>
            <br />
            donde <strong>R = 0,082 atm·L/(mol·K)</strong>, <strong>T</strong>{" "}
            es la temperatura absoluta en Kelvin (K = °C + 273) y{" "}
            <strong>Δn = (c + d) − (a + b)</strong> es la resta de moles
            gaseosos de productos menos moles gaseosos de reactivos. Si{" "}
            <strong>Δn = 0</strong>, entonces <strong>Kp = Kc</strong>.
          </li>
          <li>
            <strong>Equilibrios heterogéneos (regla de oro):</strong> los{" "}
            <strong>sólidos puros (s) y los líquidos puros (l)</strong> tienen
            densidad y concentración molar constantes, por lo que{" "}
            <strong>se omiten (valen 1)</strong> en las expresiones de{" "}
            <em>Kc</em> y <em>Kp</em>. Por ejemplo, en{" "}
            <strong>CaCO₃(s) ⇄ CaO(s) + CO₂(g)</strong>, la constante es
            simplemente <strong>Kc = [CO₂]</strong> y{" "}
            <strong>Kp = P_CO₂</strong> (con Δn = 1 − 0 = 1).
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={273}>
        <svg width="100%" height="100%" viewBox="0 0 360 315" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Fórmulas clave de equilibrio: Kc, Kp y Δn
          </text>

          {/* Tarjeta 1: Kc */}
          <rect x={14} y={36} width={332} height={82} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.6} />
          <text x={180} y={56} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>
            1. Constante de concentraciones (Kc)
          </text>
          <text x={180} y={80} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Kc = ([C]ᶜ · [D]ᵈ) / ([A]ᵃ · [B]ᵇ)
          </text>
          <text x={180} y={102} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Solo entran gases (g) y acuosos (ac) · Nunca (s) ni (l)
          </text>

          {/* Tarjeta 2: Kp y Kc */}
          <rect x={14} y={128} width={332} height={82} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.6} />
          <text x={180} y={148} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            2. Relación entre Kp y Kc
          </text>
          <text x={180} y={172} textAnchor="middle" fill={LIENZO.fg} fontSize={15} fontWeight={700}>
            Kp = Kc · (R · T)^(Δn)
          </text>
          <text x={180} y={194} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            Δn = n_gases(productos) − n_gases(reactivos)
          </text>

          {/* Tarjeta 3: Significado de K */}
          <rect x={14} y={220} width={332} height={82} rx={8} fill={LIENZO.warn} opacity={0.11} stroke={LIENZO.warn} strokeWidth={1.6} />
          <text x={180} y={240} textAnchor="middle" fill={LIENZO.warn} fontSize={14} fontWeight={700}>
            3. ¿Qué indica la magnitud de K?
          </text>
          <text x={180} y={264} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            K ≫ 1: predominan productos · K ≪ 1: reactivos
          </text>
          <text x={180} y={286} textAnchor="middle" fill={LIENZO.fgDim} fontSize={13}>
            K solo cambia si cambia la temperatura (T)
          </text>
        </svg>
      </Pizarra>

      <WorkedExample titulo="Caso resuelto 1 · Cálculo de Kc y Kp con tabla ICE">
        <div style={{ marginBottom: 8 }}>
          <strong>Planteamiento:</strong> En un reactor cerrado de{" "}
          <strong>2,0 L</strong> se introducen inicialmente{" "}
          <strong>2,0 mol de H₂(g)</strong> y <strong>2,0 mol de I₂(g)</strong>{" "}
          a 448 °C. Al alcanzarse el equilibrio{" "}
          <strong>H₂(g) + I₂(g) ⇄ 2 HI(g)</strong>, se encuentran{" "}
          <strong>3,2 mol de HI(g)</strong>. Calcula <strong>Kc</strong> y{" "}
          <strong>Kp</strong>.
        </div>
        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Concentraciones molares iniciales (dividiendo moles entre V = 2,0 L):</strong>{" "}
            [H₂]₀ = 2,0 / 2,0 = <strong>1,0 M</strong>; [I₂]₀ = 2,0 / 2,0 ={" "}
            <strong>1,0 M</strong>; [HI]₀ = <strong>0 M</strong>.
          </li>
          <li>
            <strong>Paso 2 · Concentración de HI en equilibrio y cambio estequiométrico (x):</strong>{" "}
            [HI]_eq = 3,2 mol / 2,0 L = <strong>1,6 M</strong>. Según la ecuación
            balanceada, por cada <em>x</em> M que se consumen de H₂ y de I₂ se
            forman <em>2x</em> M de HI. Entonces 2x = 1,6 M →{" "}
            <strong>x = 0,8 M</strong>.
          </li>
          <li>
            <strong>Paso 3 · Concentraciones de los reactivos en equilibrio:</strong>{" "}
            [H₂]_eq = 1,0 − 0,8 = <strong>0,2 M</strong>; [I₂]_eq = 1,0 − 0,8 ={" "}
            <strong>0,2 M</strong>.
          </li>
          <li>
            <strong>Paso 4 · Sustitución en Kc (una operación por paso):</strong>{" "}
            numerador: [HI]_eq² = (1,6)² = <strong>2,56</strong>. Denominador:
            [H₂]_eq · [I₂]_eq = 0,2 × 0,2 = <strong>0,04</strong>. Cociente:{" "}
            <em>Kc</em> = 2,56 / 0,04 = <strong>64</strong>.
          </li>
          <li>
            <strong>Paso 5 · Cálculo de Kp:</strong> como Δn = 2 − (1 + 1) ={" "}
            <strong>0</strong>, se cumple{" "}
            <strong>Kp = Kc · (R·T)⁰ = 64</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino usando moles directos):</strong>{" "}
            cuando Δn = 0 el volumen se cancela en la expresión de equilibrio.
            Como se formaron 3,2 mol de HI, se consumieron 3,2 / 2 = 1,6 mol de
            cada reactivo, quedando <em>n</em>(H₂) = 2,0 − 1,6 = 0,4 mol y{" "}
            <em>n</em>(I₂) = 0,4 mol. Entonces <em>Kc</em> = (3,2)² / (0,4 × 0,4)
            = 10,24 / 0,16 = <strong>64</strong>.
          </li>
        </ul>
      </WorkedExample>

      <WorkedExample titulo="Caso resuelto 2 · Conversión entre Kc y Kp cuando Δn ≠ 0">
        <div style={{ marginBottom: 8 }}>
          <strong>Planteamiento:</strong> Para la síntesis de amoníaco{" "}
          <strong>N₂(g) + 3 H₂(g) ⇄ 2 NH₃(g)</strong> a <strong>227 °C</strong>,
          la constante de equilibrio vale <strong>Kc = 1,681</strong>. Calcula{" "}
          <strong>Kp</strong> tomando <em>R</em> = 0,082 atm·L/(mol·K).
        </div>
        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Temperatura absoluta y producto R·T:</strong>{" "}
            <em>T</em> = 227 + 273 = <strong>500 K</strong>. Multiplicamos:{" "}
            <em>R · T</em> = 0,082 × 500 = <strong>41 atm·L/mol</strong>.
          </li>
          <li>
            <strong>Paso 2 · Variación de moles gaseosos (Δn):</strong>{" "}
            moles de gas en productos = 2; moles de gas en reactivos = 1 + 3 = 4.
            Restamos: <strong>Δn = 2 − 4 = −2</strong>.
          </li>
          <li>
            <strong>Paso 3 · Sustitución en Kp = Kc · (R·T)^(Δn):</strong>{" "}
            <em>Kp</em> = 1,681 × (41)⁻² = 1,681 / (41)². Como 41² ={" "}
            <strong>1681</strong>, dividimos: <em>Kp</em> = 1,681 / 1681 ={" "}
            <strong>1,0 × 10⁻³</strong> (o 0,001).
          </li>
          <li>
            <strong>Verificación (segundo camino despejando Kc a partir de Kp):</strong>{" "}
            <em>Kc</em> = <em>Kp</em> · (R·T)^(−Δn) = 0,001 × (41)² = 0,001 ×
            1681 = <strong>1,681</strong>, idéntico al dato inicial.
          </li>
        </ul>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscLeChatelier() {
  return (
    <EscenaRica>
      <Titulo>Equilibrio en procesos productivos y Le Châtelier</Titulo>

      <Parrafo>
        En la industria química (como la fabricación de fertilizantes
        nitrogenados o de ácido sulfúrico), el ingeniero necesita maximizar la
        conversión de reactivos en productos. La herramienta para lograrlo es el{" "}
        <strong>Principio de Le Châtelier (1884)</strong>.
      </Parrafo>

      <Definicion termino="Principio de Le Châtelier y las 4 perturbaciones">
        <strong>Enunciado:</strong> si un sistema en equilibrio químico es
        sometido a una perturbación externa (cambio de concentración, presión,
        volumen o temperatura), el sistema se desplaza en el sentido que{" "}
        <strong>contrarresta parcialmente dicha perturbación</strong> hasta
        alcanzar un nuevo estado de equilibrio.
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>1. Cambio de concentración:</strong>
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li>
                <strong>Añadir un reactivo (o retirar un producto):</strong> el
                equilibrio se desplaza hacia la{" "}
                <strong>derecha (hacia los productos, →)</strong>.
              </li>
              <li>
                <strong>Añadir un producto (o retirar un reactivo):</strong> el
                equilibrio se desplaza hacia la{" "}
                <strong>izquierda (hacia los reactivos, ←)</strong>.
              </li>
            </ul>
          </li>
          <li>
            <strong>2. Cambio de presión total (o cambio de volumen en gases):</strong>
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li>
                <strong>Aumentar la presión (disminuir el volumen):</strong> el
                sistema se desplaza hacia el lado que tenga{" "}
                <strong>MENOR número de moles gaseosos</strong> (para aliviar la
                presión).
              </li>
              <li>
                <strong>Disminuir la presión (aumentar el volumen):</strong> el
                sistema se desplaza hacia el lado con{" "}
                <strong>MAYOR número de moles gaseosos</strong>.
              </li>
              <li>
                <strong>Si Δn = 0</strong> (igual cantidad de moles de gas a
                ambos lados, como en H₂ + I₂ ⇄ 2 HI), cambiar la presión o el
                volumen <strong>no desplaza el equilibrio</strong>.
              </li>
            </ul>
          </li>
          <li>
            <strong>3. Cambio de temperatura (el único que cambia el valor numérico de Kc):</strong>{" "}
            trata al calor como un componente más:
            <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
              <li>
                <strong>Reacción exotérmica (ΔH &lt; 0, libera calor: A ⇄ B + calor):</strong>{" "}
                subir la temperatura desplaza el equilibrio hacia la{" "}
                <strong>izquierda (reactivos, ←)</strong> y disminuye <em>Kc</em>;
                enfriar desplaza hacia la <strong>derecha (productos, →)</strong>.
              </li>
              <li>
                <strong>Reacción endotérmica (ΔH &gt; 0, absorbe calor: A + calor ⇄ B):</strong>{" "}
                subir la temperatura desplaza hacia la{" "}
                <strong>derecha (productos, →)</strong> y aumenta <em>Kc</em>.
              </li>
            </ul>
          </li>
          <li>
            <strong>4. Adición de un catalizador:</strong> acelera por igual la
            reacción directa y la inversa. <strong>NO desplaza el equilibrio</strong>{" "}
            ni altera <em>Kc</em>; solo hace que el equilibrio se alcance en
            menos tiempo.
          </li>
        </ul>
      </Definicion>

      <Pizarra alto={273}>
        <svg width="100%" height="100%" viewBox="0 0 360 315" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Le Châtelier en el proceso Haber-Bosch
          </text>
          <text x={180} y={42} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>
            N₂(g) + 3 H₂(g) ⇄ 2 NH₃(g) + calor (ΔH = −92 kJ)
          </text>

          {/* Perturbacion 1 */}
          <rect x={14} y={54} width={332} height={56} rx={8} fill={LIENZO.ok} opacity={0.11} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={24} y={74} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            1. Inyectar N₂ o H₂ / licuar y retirar NH₃
          </text>
          <text x={24} y={96} fill={LIENZO.fg} fontSize={13}>
            Desplaza a la DERECHA (→) · Produce más NH₃
          </text>

          {/* Perturbacion 2 */}
          <rect x={14} y={118} width={332} height={56} rx={8} fill={LIENZO.accent} opacity={0.11} stroke={LIENZO.accent} strokeWidth={1.5} />
          <text x={24} y={138} fill={LIENZO.accent} fontSize={13} fontWeight={700}>
            2. Subir la presión (4 mol gas → 2 mol gas)
          </text>
          <text x={24} y={160} fill={LIENZO.fg} fontSize={13}>
            Va hacia menos moles de gas: DERECHA (→)
          </text>

          {/* Perturbacion 3 */}
          <rect x={14} y={182} width={332} height={56} rx={8} fill={LIENZO.warn} opacity={0.11} stroke={LIENZO.warn} strokeWidth={1.5} />
          <text x={24} y={202} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            3. Subir mucho la temperatura (exotérmica)
          </text>
          <text x={24} y={224} fill={LIENZO.fg} fontSize={13}>
            Desplaza a la IZQUIERDA (←) y baja Kc
          </text>

          {/* Perturbacion 4 */}
          <rect x={14} y={246} width={332} height={56} rx={8} fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} strokeWidth={1.5} />
          <text x={24} y={266} fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            4. Catalizador de hierro (Fe) a 450–500 °C
          </text>
          <text x={24} y={288} fill={LIENZO.fgDim} fontSize={13}>
            No mueve el equilibrio: da rapidez industrial
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="Equilibrio químico en los procesos productivos industriales">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 15 }}>
          <li>
            <strong>Síntesis de Haber-Bosch del amoníaco (fertilizantes):</strong>{" "}
            <strong>N₂(g) + 3 H₂(g) ⇄ 2 NH₃(g)</strong> (ΔH° = −92,2 kJ/mol).
            Como pasa de 4 moles de gas a 2 moles (Δn = −2) y es exotérmica, se
            favorece con <strong>altas presiones (200 a 500 atm)</strong>,{" "}
            <strong>temperatura moderada de compromiso (450–500 °C)</strong>{" "}
            para que no sea demasiado lenta,{" "}
            <strong>catalizador de hierro (Fe)</strong> y condensación continua
            del NH₃ producido.
          </li>
          <li>
            <strong>Proceso de contacto para el ácido sulfúrico (H₂SO₄):</strong>{" "}
            la etapa crítica es la oxidación reversible{" "}
            <strong>2 SO₂(g) + O₂(g) ⇄ 2 SO₃(g)</strong> (ΔH° = −198 kJ/mol,
            Δn = 2 − 3 = −1), catalizada por{" "}
            <strong>pentóxido de vanadio (V₂O₅)</strong> a ~450 °C con exceso de
            oxígeno.
          </li>
        </ul>
      </Definicion>

      <Conexion>
        En la unidad de Equilibrio ácido-base (QUI-11) viste cómo el tampón
        bicarbonato de la sangre (<strong>CO₂ + H₂O ⇄ H₂CO₃ ⇄ H⁺ + HCO₃⁻</strong>)
        aplica el principio de Le Châtelier: al hiperventilar y exhalar CO₂, el
        equilibrio se desplaza hacia la izquierda consumiendo protones H⁺ y
        compensando una acidosis metabólica.
      </Conexion>
    </EscenaRica>
  );
}

function EscEjerciciosBanco() {
  return (
    <EscenaRica>
      <Titulo>Ejercicios del banco relacionados (procesos industriales y ΔH)</Titulo>

      <Parrafo>
        En los exámenes pasados de la UMSS no salió ninguna pregunta de cinética
        ni de equilibrio; lo que sí sale son cálculos de procesos industriales
        (Haber, Ostwald, ácido sulfúrico) y de ΔH, que son el contexto de este
        tema. El temario PSA 2027 sí lo incluye, por eso lo practicas abajo.
      </Parrafo>

      <WorkedExample titulo="Ejercicio real 1 · UMSS (2024-parcial2-1-2024 · Pregunta 12)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> El proceso Haber, de fabricación de
          amoniaco, es muy importante en la fabricación de fertilizantes, se
          lleva a cabo según la reacción en fase gaseosa: H₂ + N₂ ⇒ NH₃. Este
          proceso tiene un rendimiento del 75%. Si en una fábrica se dispone de
          600 L de H₂ y 300 L de N₂ diarios a una temperatura de 500°C y 500 atm
          de presión para fabricar amoniaco, ¿cuántos cilindros de NH₃ se
          llenarán por día? Los cilindros están a 25°C, tienen 30 L de capacidad
          y una presión de 4 atm.
          <br />
          <strong>Opciones:</strong> <strong>A) 482</strong> · B) 650 · C) 316 ·
          D) 190 · E) Ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> en la industria, la reacción de Haber{" "}
          <strong>N₂(g) + 3 H₂(g) ⇄ 2 NH₃(g)</strong> es reversible y no llega al
          100% de conversión al detenerse en el equilibrio; el enunciado indica
          un rendimiento del 75%. Para resolverlo, identificamos el reactivo
          limitante por volúmenes y convertimos los moles reales producidos a las
          condiciones de los cilindros.
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Ecuación balanceada y reactivo limitante:</strong>{" "}
            <strong>N₂(g) + 3 H₂(g) ⇄ 2 NH₃(g)</strong>. A igual presión y
            temperatura (ley de Avogadro), la relación de volúmenes es igual a la
            de moles (1 L de N₂ requiere 3 L de H₂). Para los 600 L de H₂ se
            necesitan 600 / 3 = 200 L de N₂; como hay 300 L de N₂ disponibles
            (sobran 100 L), el <strong>H₂ es el reactivo limitante</strong>.
          </li>
          <li>
            <strong>Paso 2 · Moles de H₂ en el reactor (500 °C = 773 K y 500 atm):</strong>{" "}
            <em>n</em>(H₂) = (500 atm × 600 L) / (0,08206 × 773 K) = 300.000 /
            63,432 = <strong>4.729,4 mol de H₂</strong>.
          </li>
          <li>
            <strong>Paso 3 · Moles de NH₃ reales con 75% de conversión:</strong>{" "}
            moles teóricos de NH₃ = 4.729,4 × (2 / 3) ={" "}
            <strong>3.152,9 mol</strong>. Multiplicando por el rendimiento del
            75% (0,75): <em>n</em>(NH₃)_real = 3.152,9 × 0,75 ={" "}
            <strong>2.364,7 mol de NH₃</strong>.
          </li>
          <li>
            <strong>Paso 4 · Moles que caben en 1 cilindro (25 °C = 298 K, 30 L, 4 atm):</strong>{" "}
            <em>n</em>_cilindro = (4 atm × 30 L) / (0,08206 × 298 K) = 120 /
            24,454 = <strong>4,907 mol por cilindro</strong>.
          </li>
          <li>
            <strong>Paso 5 · Número de cilindros diarios:</strong>{" "}
            Cilindros = 2.364,7 / 4,907 = <strong>481,9 ≈ 482 cilindros</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino sin usar R, por ley combinada P·V/T):</strong>{" "}
            600 L de H₂ dan teóricamente 600 × (2/3) = 400 L de NH₃, y al 75% de
            rendimiento dan 400 × 0,75 = <strong>300 L de NH₃</strong> medidos a
            500 atm y 773 K. Como <em>n·R = P·V/T</em> se conserva:{" "}
            <em>N_cil</em> = [(500 × 300) / 773] / [(4 × 30) / 298] = (150.000 ×
            298) / (773 × 120) = 44.700.000 / 92.760 ={" "}
            <strong>481,89 ≈ 482 cilindros</strong>.
          </li>
        </ul>
        <div>
          <strong>Respuesta: A (482).</strong>
        </div>
      </WorkedExample>

      <WorkedExample titulo="Ejercicio real 2 · UMSS (2024-final-2-2024 · Pregunta 13)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> Por oxidación catalítica del
          amoniaco se forma vapor de agua y óxido nítrico en fase gaseosa en
          condiciones normales. Calcular el volumen de aire necesario para la
          oxidación de 100 litros de amoniaco. Asumir la composición volumétrica
          del aire: 79% de N₂, y 21% de O₂. NH₃ + O₂ ⇒ NO + H₂O.
          <br />
          <strong>Opciones:</strong> A) 578 L · B) 705 L · C) 250 L ·{" "}
          <strong>D) 595 L</strong> · E) Ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> la reacción transcurre totalmente en fase
          gaseosa bajo las mismas condiciones de presión y temperatura. Por la
          ley de los volúmenes de combinación de Gay-Lussac, los coeficientes de
          la ecuación balanceada determinan directamente la relación de volúmenes
          entre los gases reactivos.
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Balanceo de la ecuación catalítica:</strong>{" "}
            <strong>4 NH₃(g) + 5 O₂(g) → 4 NO(g) + 6 H₂O(g)</strong> (comprobación:
            N: 4 = 4; H: 12 = 12; O: 10 = 4 + 6 = 10).
          </li>
          <li>
            <strong>Paso 2 · Volumen de oxígeno puro requerido:</strong> por la
            ley de combinación volumétrica de Gay-Lussac, 4 L de NH₃ consumen 5 L
            de O₂. Para 100 L de NH₃: <em>V</em>(O₂) = 100 L × (5 / 4) ={" "}
            <strong>125 L de O₂</strong>.
          </li>
          <li>
            <strong>Paso 3 · Volumen de aire necesario (21% de O₂ en volumen):</strong>{" "}
            como el O₂ representa el 21% (fracción 0,21) del aire:{" "}
            <em>V</em>(aire) = 125 L / 0,21 ={" "}
            <strong>595,24 L ≈ 595 L de aire</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino pasando por moles en c.n.):</strong>{" "}
            en condiciones normales (22,4 L/mol), 100 L de NH₃ son{" "}
            <em>n</em>(NH₃) = 100 / 22,4 = 4,4643 mol. Los moles de O₂ son
            4,4643 × (5/4) = 5,5804 mol, por lo que los moles totales de aire son
            5,5804 / 0,21 = 26,573 mol. Multiplicando por 22,4 L/mol resulta{" "}
            <em>V</em>(aire) = 26,573 × 22,4 = <strong>595,24 L ≈ 595 L</strong>.
          </li>
        </ul>
        <div>
          <strong>Respuesta: D (595 L).</strong>
        </div>
      </WorkedExample>

      <WorkedExample titulo="Ejercicio real 3 · UMSS (2014-parcial2-2-2014 · Pregunta 12)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> Para la fabricación del ácido
          sulfúrico, la pirita se tuesta con suficiente oxígeno en hornos, luego,
          el SO₂ se oxida a trióxido de azufre, para luego disolverlo en agua. El
          rendimiento global del proceso es 65%. Calcular el volumen, en Litros,
          de ácido sulfúrico concentrado con pureza del 96 % en peso y densidad
          1,79 g/mL, a partir de media tonelada de mineral pirita, que contiene
          25% de FeS₂.
          <br />
          <strong>Opciones:</strong> <strong>A) 77,2</strong> · B) 89,1 · C) 40,5
          · D) 17,9 · E) Ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> el enunciado describe la secuencia
          completa de tostación y oxidación catalítica hasta el ácido sulfúrico
          con un rendimiento global del 65%. Por conservación del elemento
          azufre, cada mol de pirita FeS₂ contiene 2 moles de átomos de S y
          produce teóricamente 2 moles de H₂SO₄.
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Masa y moles de FeS₂ puro en media tonelada (500 kg):</strong>{" "}
            masa de mineral = 500.000 g. Con 25% de pureza:{" "}
            <em>m</em>(FeS₂) = 500.000 × 0,25 = <strong>125.000 g</strong>. Masa
            molar de FeS₂ = 56 + 2(32) = <strong>120 g/mol</strong>. Moles de
            FeS₂ = 125.000 / 120 = <strong>1.041,67 mol</strong>.
          </li>
          <li>
            <strong>Paso 2 · Moles teóricos y reales de H₂SO₄ (rendimiento 65%):</strong>{" "}
            como 1 mol de FeS₂ genera 2 mol de H₂SO₄, los moles teóricos son
            2 × 1.041,67 = <strong>2.083,33 mol</strong>. Aplicando el
            rendimiento global del 65% (0,65): <em>n</em>(H₂SO₄)_real =
            2.083,33 × 0,65 = <strong>1.354,17 mol</strong>.
          </li>
          <li>
            <strong>Paso 3 · Masa de H₂SO₄ puro y masa de solución al 96%:</strong>{" "}
            con <em>M</em>(H₂SO₄) = 98 g/mol, la masa pura es 1.354,17 × 98 ={" "}
            <strong>132.708,3 g</strong>. Al 96% de pureza en peso, la masa de
            solución concentrada es 132.708,3 / 0,96 ={" "}
            <strong>138.237,8 g</strong>.
          </li>
          <li>
            <strong>Paso 4 · Volumen de solución (densidad = 1,79 g/mL = 1.790 g/L):</strong>{" "}
            <em>V</em> = 138.237,8 g / 1.790 g/L ={" "}
            <strong>77,23 L ≈ 77,2 L</strong>.
          </li>
          <li>
            <strong>Verificación (segundo camino por conservación de masa de azufre):</strong>{" "}
            en 125 kg de FeS₂ la fracción de S es 64/120, es decir 66,67 kg de S.
            Con 65% de rendimiento pasan al ácido 66,67 × 0,65 = 43,33 kg de S.
            Como en el H₂SO₄ el azufre es 32/98 de la masa, se forman
            43,33 × (98/32) = 132,71 kg de H₂SO₄ puro, que divididos entre
            (0,96 × 1,79 kg/L = 1,7184 kg/L) dan 132,71 / 1,7184 ={" "}
            <strong>77,23 L ≈ 77,2 L</strong>.
          </li>
        </ul>
        <div>
          <strong>Respuesta: A (77,2).</strong>
        </div>
      </WorkedExample>

      <WorkedExample titulo="Ejercicio real 4 · UMSS (2007-parcial3-1-2007 · Pregunta 17)">
        <div style={{ marginBottom: 10 }}>
          <strong>Enunciado literal:</strong> Usando la Ley de Hess, hallar el
          ΔH de CO(g) + ½O₂(g) → CO₂(g), dadas: (1) C + ½O₂ → CO,
          ΔH₁ = -110.54 kJ; (2) C + O₂ → CO₂, ΔH₂ = -393.51 kJ.
          <br />
          <strong>Opciones:</strong> A) -281.97 · <strong>B) -282.97kJ</strong> ·
          C) -282.97J · D) -200.97kJ · E) Ninguno.
        </div>

        <div style={{ marginBottom: 8 }}>
          <strong>Idea clave:</strong> la ley de Hess permite sumar y restar
          ecuaciones termoquímicas para hallar la variación de entalpía (ΔH) de
          una reacción global deseada. Para obtener CO como reactivo, invertimos
          la primera ecuación cambiando de signo su ΔH y le sumamos la segunda.
        </div>

        <ul style={{ margin: "0 0 8px 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Paso 1 · Invertir la ecuación (1) para ubicar al CO en los reactivos:</strong>{" "}
            al invertir <strong>CO → C + ½O₂</strong>, el signo de la entalpía se
            invierte: <strong>−ΔH₁ = +110,54 kJ</strong>.
          </li>
          <li>
            <strong>Paso 2 · Sumar la ecuación (2) tal como está:</strong>{" "}
            sumamos <strong>C + O₂ → CO₂</strong> (con{" "}
            <strong>ΔH₂ = −393,51 kJ</strong>). El carbono sólido C se cancela a
            ambos lados y ½O₂ se resta de 1 O₂, quedando exactamente{" "}
            <strong>CO(g) + ½O₂(g) → CO₂(g)</strong>.
          </li>
          <li>
            <strong>Paso 3 · Suma algebraica de entalpías:</strong>{" "}
            ΔH = ΔH₂ + (−ΔH₁) = −393,51 kJ + 110,54 kJ ={" "}
            <strong>−282,97 kJ</strong> (cuidado con la opción C, que tiene la
            trampa de unidades en J en lugar de kJ). Al ser{" "}
            <strong>ΔH &lt; 0 (exotérmica)</strong>, un aumento de temperatura
            desplazaría el equilibrio hacia el CO, mientras que enfriar favorece
            la formación de CO₂.
          </li>
          <li>
            <strong>Verificación (segundo camino por entalpías estándar de formación):</strong>{" "}
            las reacciones (1) y (2) definen precisamente{" "}
            ΔH°_f(CO) = −110,54 kJ/mol y ΔH°_f(CO₂) = −393,51 kJ/mol, con
            ΔH°_f(O₂) = 0. Entonces ΔH = ΔH°_f(CO₂) − [ΔH°_f(CO) + 0] =
            −393,51 − (−110,54) = <strong>−282,97 kJ</strong>.
          </li>
        </ul>
        <div>
          <strong>Respuesta: B (-282.97kJ).</strong>
        </div>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Práctica PSA 2027</Titulo>

      <Misconception titulo="Error 1 · 'En el equilibrio químico las concentraciones de reactivos y productos son iguales'">
        <strong>Realidad:</strong> en el equilibrio lo que se iguala son las{" "}
        <strong>velocidades directa e inversa (v_d = v_i)</strong>. Las
        concentraciones de reactivos y productos se mantienen{" "}
        <strong>constantes en el tiempo</strong>, pero casi nunca son iguales
        entre sí (dependen del valor de <em>Kc</em>).
      </Misconception>

      <Misconception titulo="Error 2 · 'Incluir sólidos (s) o líquidos puros (l) dentro de la fórmula de Kc o Kp'">
        <strong>Realidad:</strong> la concentración molar de un sólido puro o de
        un líquido puro es constante a una temperatura dada, por lo que ya está
        incorporada en la constante de equilibrio. En{" "}
        <strong>Kc y Kp solo entran especies gaseosas (g) o en disolución acuosa (ac)</strong>.
      </Misconception>

      <Misconception titulo="Error 3 · 'Añadir un catalizador aumenta la constante Kc y produce más cantidad de producto'">
        <strong>Realidad:</strong> el catalizador disminuye la energía de
        activación tanto de la reacción directa como de la inversa en la misma
        magnitud. Por eso <strong>no cambia Kc ni desplaza el equilibrio</strong>;
        únicamente permite llegar al equilibrio más rápido. El{" "}
        <strong>único factor que cambia el valor numérico de Kc o Kp es la
        temperatura</strong>.
      </Misconception>

      <Resumen>
        <strong>Lo que pide el temario PSA 2027:</strong>
        <ul style={{ margin: "6px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>
            <strong>Velocidad de reacción:</strong>{" "}
            <em>v = −(1/a)·Δ[A]/Δt = +(1/c)·Δ[C]/Δt</em>. Aumenta al subir la
            concentración, la temperatura, el grado de división del sólido o al
            añadir un catalizador positivo (que reduce <em>Eₐ</em>).
          </li>
          <li>
            <strong>Ley de acción de masas y orden:</strong>{" "}
            <strong>v = k·[A]ᵐ·[B]ⁿ</strong>; el orden global es{" "}
            <strong>m + n</strong>. En una etapa elemental los exponentes
            coinciden con los coeficientes estequiométricos.
          </li>
          <li>
            <strong>Constantes Kc y Kp:</strong> productos sobre reactivos
            elevados a sus coeficientes (sin sólidos ni líquidos puros). Relación
            gaseosa: <strong>Kp = Kc · (R·T)^(Δn)</strong>, donde{" "}
            <strong>Δn = n_gases(prod) − n_gases(react)</strong>.
          </li>
          <li>
            <strong>Principio de Le Châtelier:</strong> subir presión desplaza
            hacia donde hay <strong>menos moles de gas</strong>; subir
            temperatura favorece el sentido <strong>endotérmico</strong> (consumo
            de calor).
          </li>
        </ul>
      </Resumen>

      <AutoCheck
        pregunta="Para una reacción elemental A(g) + 2 B(g) → C(g) cuya ley de velocidad es v = k·[A]·[B]², ¿qué ocurre con la velocidad inicial si se duplica [B] manteniendo [A] y la temperatura constantes?"
        opciones={[
          "Se mantiene igual",
          "Se duplica (aumenta 2 veces)",
          "Se cuadruplica (aumenta 4 veces)",
          "Aumenta 8 veces",
        ]}
        correctaIdx={2}
        explicacion="Paso 1 · En v = k·[A]¹·[B]², el orden parcial respecto a B es 2. Paso 2 · Al reemplazar [B]' = 2[B], el factor de cambio es (2)² = 4. Verificación: con k=1, [A]=1 y [B]=1 da v₁=1; con [B]=2 da v₂=1·1·2²=4. Respuesta: se cuadruplica."
      />

      <AutoCheck
        pregunta="¿Cuál es la expresión correcta de la constante de equilibrio Kc para la descomposición térmica heterogénea CaCO₃(s) ⇄ CaO(s) + CO₂(g)?"
        opciones={[
          "Kc = [CO₂]",
          "Kc = ([CaO]·[CO₂]) / [CaCO₃]",
          "Kc = [CaCO₃] / ([CaO]·[CO₂])",
          "Kc = 1 / [CO₂]",
        ]}
        correctaIdx={0}
        explicacion="Paso 1 · En un equilibrio heterogéneo, los sólidos puros CaCO₃(s) y CaO(s) tienen concentración constante y no se escriben en la expresión de equilibrio (se reemplazan por 1). Paso 2 · El único componente gaseoso es el producto CO₂(g) con coeficiente 1, por lo que Kc = [CO₂]. Respuesta: Kc = [CO₂]."
      />

      <AutoCheck
        pregunta="En el equilibrio 2 A(g) ⇄ B(g) + C(g), se miden en equilibrio las concentraciones [A] = 0,5 M, [B] = 1,0 M y [C] = 1,5 M. ¿Cuánto vale Kc?"
        opciones={[
          "Kc = 3,0",
          "Kc = 6,0",
          "Kc = 0,75",
          "Kc = 1,5",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · Planteamos Kc = ([B]·[C]) / [A]². Paso 2 · Numerador: 1,0 × 1,5 = 1,5; denominador: (0,5)² = 0,25. Paso 3 · Dividimos: Kc = 1,5 / 0,25 = 6,0. Verificación: 1,5 ÷ (1/4) = 1,5 × 4 = 6,0. Respuesta: Kc = 6,0."
      />

      <AutoCheck
        pregunta="En el proceso industrial exotérmico N₂(g) + 3 H₂(g) ⇄ 2 NH₃(g) (ΔH = −92 kJ), ¿qué cambio desplaza el equilibrio hacia una mayor formación de NH₃?"
        opciones={[
          "Aumentar la temperatura del reactor",
          "Disminuir la presión total (aumentar el volumen)",
          "Añadir un catalizador de hierro",
          "Aumentar la presión total del sistema",
        ]}
        correctaIdx={3}
        explicacion="Paso 1 · A la izquierda hay 1 + 3 = 4 moles de gas y a la derecha hay 2 moles de gas (Δn = −2). Paso 2 · Según Le Châtelier, aumentar la presión total desplaza el equilibrio hacia donde hay menor número de moles gaseosos, es decir, hacia el NH₃ (derecha). Subir T desplaza a la izquierda (es exotérmica) y el catalizador no desplaza el equilibrio. Respuesta: aumentar la presión total."
      />

      <AutoCheck
        pregunta="[Banco UMSS · 2024-final-2-2024 · Pregunta 13] En la oxidación catalítica 4 NH₃(g) + 5 O₂(g) → 4 NO(g) + 6 H₂O(g) en condiciones normales, ¿qué volumen de aire (21% O₂ en volumen) se necesita para oxidar 100 L de NH₃?"
        opciones={[
          "578 L",
          "595 L",
          "250 L",
          "705 L",
        ]}
        correctaIdx={1}
        explicacion="Paso 1 · Por relación volumétrica 4:5 entre gases en las mismas condiciones, V(O₂) = 100 L × (5/4) = 125 L de O₂. Paso 2 · Como el aire tiene 21% de O₂, V(aire) = 125 L / 0,21 = 595,24 L ≈ 595 L. Respuesta: 595 L."
      />

      <AutoCheck
        pregunta="[Banco UMSS · 2007-parcial3-1-2007 · Pregunta 17] Dadas (1) C + ½O₂ → CO (ΔH₁ = −110,54 kJ) y (2) C + O₂ → CO₂ (ΔH₂ = −393,51 kJ), ¿cuál es el ΔH de la reacción CO(g) + ½O₂(g) → CO₂(g)?"
        opciones={[
          "−281,97 kJ",
          "−200,97 kJ",
          "−282,97 kJ",
          "+282,97 kJ",
        ]}
        correctaIdx={2}
        explicacion="Paso 1 · Invertimos la reacción (1) para poner al CO como reactivo: +110,54 kJ. Paso 2 · Sumamos con la reacción (2): ΔH = −393,51 kJ + 110,54 kJ = −282,97 kJ. Respuesta: −282,97 kJ."
      />
    </EscenaRica>
  );
}
