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
      unidad="DER-01"
      tituloUnidad="Introducción al Derecho · Conceptos básicos"
      escenas={[
        { titulo: "¿Qué es el Derecho?", componente: EscIntro },
        { titulo: "Derecho objetivo vs subjetivo", componente: EscObjSubj },
        { titulo: "Derecho público vs privado", componente: EscPubPriv },
        { titulo: "Fuentes del Derecho", componente: EscFuentes },
        { titulo: "Jerarquía normativa boliviana", componente: EscJerarquia },
        { titulo: "Norma jurídica · estructura", componente: EscNorma },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Derecho · regla del juego social</Titulo>

      <Hook>
        ¿Por qué no puedes llevarte el celular de un compañero "porque te gustó"?
        Porque el Derecho lo prohíbe. ¿Por qué tu casero no puede echarte sin
        previo aviso? Porque el Derecho te protege. El Derecho es el conjunto
        de reglas que organiza la convivencia.
      </Hook>

      <Definicion termino="Derecho">
        Sistema de normas que regulan la conducta humana en sociedad, su
        cumplimiento puede ser exigido por el Estado. Tres rasgos esenciales:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Bilateral:</strong> a todo derecho corresponde un deber.</li>
          <li><strong>Heterónomo:</strong> impuesto desde fuera (Estado), no por elección personal.</li>
          <li><strong>Coercible:</strong> el Estado puede obligar a cumplirlo.</li>
        </ul>
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Derecho vs Moral vs Trato social
          </text>
          {[
            { x: 90, t: "Derecho", b: "Bilateral, heterónomo, coercible", ej: "no robar" },
            { x: 290, t: "Moral", b: "Unilateral, autónoma, incoercible", ej: "no mentir" },
            { x: 490, t: "Trato social", b: "Bilateral, heterónomo, no coercible", ej: "saludar" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={140} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>{p.t}</text>
              <text x={80} y={60} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{p.b}</text>
              <text x={80} y={110} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">ej: {p.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Derecho = lo MAYOR de tres normas: te obliga, te protege y
        usa la fuerza del Estado si hace falta."</strong>
      </Mnemotecnia>

      <Conexion>
        Esta es la primera de varias unidades de Derecho UMSS. Vamos de
        fundamentos a ramas específicas: penal, civil, constitucional,
        administrativo.
      </Conexion>
    </EscenaRica>
  );
}

function EscObjSubj() {
  return (
    <EscenaRica>
      <Titulo>Derecho objetivo y subjetivo · dos caras de la misma moneda</Titulo>

      <Definicion termino="Derecho objetivo">
        Conjunto de NORMAS jurídicas vigentes (las leyes, decretos,
        sentencias). Es "el Derecho" como sistema. Existe afuera del individuo.
      </Definicion>

      <Definicion termino="Derecho subjetivo">
        FACULTAD que la norma reconoce a una persona para exigir algo (un
        comportamiento, una abstención). Es "tu" derecho. Existe en cada
        individuo.
      </Definicion>

      <WorkedExample titulo="Ejemplo">
        El Código Civil (objetivo) dice: "Quien causa daño debe indemnizar".<br />
        Si un auto rompe tu vidriera, tú tienes el derecho subjetivo a exigir
        que te paguen el vidrio.
      </WorkedExample>

      <Pizarra alto={160}>
        <svg width="100%" height="100%" viewBox="0 0 720 160" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tipos de derechos subjetivos
          </text>
          {[
            { x: 90, t: "Públicos", d: "frente al Estado", ej: "votar, peticionar" },
            { x: 290, t: "Privados", d: "frente a otros particulares", ej: "exigir un pago" },
            { x: 490, t: "Reales / Personales", d: "sobre cosas o frente a alguien", ej: "propiedad / crédito" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={90} fill={LIENZO.ok} opacity={0.08} stroke={LIENZO.ok} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={80} y={50} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.d}</text>
              <text x={80} y={72} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">{p.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Objetivo = norma. Subjetivo = tu facultad."</strong> El
        objetivo es el guion; el subjetivo es lo que TE toca.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPubPriv() {
  return (
    <EscenaRica>
      <Titulo>Derecho público y privado</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Las dos grandes ramas
          </text>
          <g transform="translate(60, 50)">
            <rect width={290} height={190} fill={LIENZO.bad} opacity={0.08} stroke={LIENZO.bad} strokeWidth={1.5} rx={10} />
            <text x={145} y={25} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>DERECHO PÚBLICO</text>
            <text x={145} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>Estado como autoridad</text>
            <text x={20} y={75} fill={LIENZO.fg} fontSize={11}>• Constitucional</text>
            <text x={20} y={92} fill={LIENZO.fg} fontSize={11}>• Administrativo</text>
            <text x={20} y={109} fill={LIENZO.fg} fontSize={11}>• Penal</text>
            <text x={20} y={126} fill={LIENZO.fg} fontSize={11}>• Procesal</text>
            <text x={20} y={143} fill={LIENZO.fg} fontSize={11}>• Tributario</text>
            <text x={20} y={160} fill={LIENZO.fg} fontSize={11}>• Internacional Público</text>
            <text x={145} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">relación de subordinación</text>
          </g>
          <g transform="translate(370, 50)">
            <rect width={290} height={190} fill={LIENZO.ok} opacity={0.08} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={145} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>DERECHO PRIVADO</text>
            <text x={145} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>Particulares en pie de igualdad</text>
            <text x={20} y={75} fill={LIENZO.fg} fontSize={11}>• Civil</text>
            <text x={20} y={92} fill={LIENZO.fg} fontSize={11}>• Comercial / Mercantil</text>
            <text x={20} y={109} fill={LIENZO.fg} fontSize={11}>• Familia</text>
            <text x={20} y={126} fill={LIENZO.fg} fontSize={11}>• Laboral (mixto, con público)</text>
            <text x={20} y={143} fill={LIENZO.fg} fontSize={11}>• Internacional Privado</text>
            <text x={145} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">relación de coordinación</text>
          </g>
        </svg>
      </Pizarra>

      <Cuidado>
        Algunas ramas son MIXTAS: el laboral tiene rasgos de público
        (intervención estatal para proteger al trabajador) y privado (contrato
        entre patrón y empleado). Por eso se discute si es derecho social.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Público manda; Privado pacta."</strong> Si el Estado actúa
        como autoridad → público. Si dos privados acuerdan en igualdad →
        privado.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscFuentes() {
  return (
    <EscenaRica>
      <Titulo>Fuentes del Derecho · de dónde nacen las normas</Titulo>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            6 fuentes del Derecho
          </text>
          {[
            { t: "Constitución", d: "norma fundamental del Estado", c: LIENZO.bad },
            { t: "Ley", d: "dictada por el Órgano Legislativo (Asamblea)", c: LIENZO.warn },
            { t: "Decretos / reglamentos", d: "dictados por el Ejecutivo", c: "#a78bfa" },
            { t: "Costumbre", d: "uso reiterado con conciencia de obligatoriedad", c: LIENZO.ok },
            { t: "Jurisprudencia", d: "sentencias reiteradas de tribunales", c: "#06b6d4" },
            { t: "Doctrina", d: "opiniones de juristas; fuente indirecta", c: "#84cc16" },
          ].map((f, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 26})`}>
              <rect width={580} height={22} fill={f.c} opacity={0.1} stroke={f.c} strokeWidth={1} rx={4} />
              <text x={15} y={15} fill={f.c} fontSize={11} fontWeight={700}>{i + 1}. {f.t}:</text>
              <text x={210} y={15} fill={LIENZO.fg} fontSize={11}>{f.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Costumbre · cuándo es fuente">
        Requiere 2 elementos:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Material:</strong> repetición constante y uniforme.</li>
          <li><strong>Psicológico:</strong> convicción de obligatoriedad
            (<em>opinio iuris</em>).</li>
        </ul>
      </Definicion>

      <Cuidado>
        En Bolivia, la Constitución reconoce el <strong>derecho indígena
        originario campesino</strong> como fuente, con sus propias normas
        consuetudinarias (Art. 30 y 190 CPE). Es una particularidad del
        sistema plurinacional.
      </Cuidado>
    </EscenaRica>
  );
}

function EscJerarquia() {
  return (
    <EscenaRica>
      <Titulo>Jerarquía normativa boliviana · pirámide de Kelsen</Titulo>

      <Definicion termino="Pirámide kelseniana">
        El sistema jurídico está ordenado jerárquicamente. Una norma inferior
        debe respetar a las superiores. Si no, es inconstitucional o ilegal.
      </Definicion>

      <Pizarra alto={280}>
        <svg width="100%" height="100%" viewBox="0 0 720 280" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Jerarquía en Bolivia (Art. 410 CPE)
          </text>
          {[
            { y: 50, w: 180, t: "Constitución (CPE) + tratados DD.HH.", c: "#dc2626" },
            { y: 90, w: 270, t: "Tratados internacionales", c: "#f59e0b" },
            { y: 130, w: 360, t: "Leyes (Ley, Ley orgánica, código)", c: "#84cc16" },
            { y: 170, w: 450, t: "Decretos supremos, resoluciones del Ejecutivo", c: "#10b981" },
            { y: 210, w: 540, t: "Normas departamentales y municipales", c: "#06b6d4" },
            { y: 250, w: 600, t: "Resoluciones administrativas, actos individuales", c: "#a78bfa" },
          ].map((n, i) => (
            <g key={i} transform={`translate(${360 - n.w / 2}, ${n.y})`}>
              <rect width={n.w} height={32} fill={n.c} opacity={0.3} stroke={n.c} strokeWidth={1.5} rx={6} />
              <text x={n.w / 2} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>{n.t}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"De arriba para abajo: Constitución → Tratados → Leyes →
        Decretos → Locales → Actos."</strong> Lo superior nunca puede ser
        invalidado por lo inferior.
      </Mnemotecnia>

      <Cuidado>
        El bloque de constitucionalidad incluye la CPE + los tratados
        internacionales de DD.HH. Por eso un tratado de DD.HH. tiene rango
        constitucional en Bolivia (Art. 256 CPE).
      </Cuidado>
    </EscenaRica>
  );
}

function EscNorma() {
  return (
    <EscenaRica>
      <Titulo>Norma jurídica · estructura</Titulo>

      <Definicion termino="Norma jurídica">
        Regla obligatoria que prescribe conducta. Tiene 2 partes:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Supuesto de hecho:</strong> condición fáctica ("si alguien mata a otro…").</li>
          <li><strong>Consecuencia jurídica:</strong> efecto ("…será sancionado con privación de libertad").</li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Ejemplo · Art. 251 Código Penal Bolivia">
        "El que matare a otro será sancionado con presidio de 5 a 20 años."<br /><br />
        <strong>Supuesto:</strong> "El que matare a otro" (homicidio).<br />
        <strong>Consecuencia:</strong> "presidio de 5 a 20 años" (sanción).
      </WorkedExample>

      <Definicion termino="Clases de normas">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Preceptivas:</strong> obligan (pagar impuestos).</li>
          <li><strong>Prohibitivas:</strong> prohíben (no matar).</li>
          <li><strong>Permisivas:</strong> autorizan (testar libremente).</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Si → entonces."</strong> Toda norma jurídica responde a esa
        estructura lógica. Si pasa X, entonces Y.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Derecho = leyes nada más'">
        <strong>Realidad:</strong> la ley es UNA fuente. También costumbre,
        jurisprudencia, principios y doctrina son fuentes (algunas indirectas).
      </Misconception>

      <Misconception titulo="Error 2 · 'Derecho y moral son lo mismo'">
        <strong>Realidad:</strong> distintos. Moral = autónoma + incoercible.
        Derecho = heterónomo + coercible. Pueden coincidir (no matar) o no
        (mentir es inmoral pero no necesariamente ilegal).
      </Misconception>

      <Misconception titulo="Error 3 · 'Un decreto puede modificar la Constitución'">
        <strong>Realidad:</strong> NO. La pirámide kelseniana impide que una
        norma inferior modifique una superior. La CPE solo se reforma por
        Asamblea Constituyente o referéndum.
      </Misconception>

      <Resumen>
        Derecho = normas para la convivencia. Es bilateral, heterónomo y
        coercible. Objetivo (norma) vs subjetivo (facultad). Público (Estado
        manda) vs privado (entre pares). Fuentes: Constitución, ley, decretos,
        costumbre, jurisprudencia, doctrina. Jerarquía Bolivia (Art. 410 CPE):
        CPE → tratados → leyes → decretos → locales. Norma = supuesto +
        consecuencia.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es la característica que diferencia al Derecho de la moral?"
        opciones={["bilateral", "autónomo", "coercible", "subjetivo"]}
        correctaIdx={2}
        explicacion="Coercible: el Estado puede obligar a cumplirlo por la fuerza. La moral no."
      />

      <AutoCheck
        pregunta="¿A qué rama pertenece el Derecho Penal?"
        opciones={["privado", "público", "social", "mixto"]}
        correctaIdx={1}
        explicacion="Penal es público: el Estado castiga al infractor. La víctima no decide la pena."
      />

      <AutoCheck
        pregunta="¿Cuál es la norma más alta en la jerarquía boliviana?"
        opciones={["Ley", "Decreto Supremo", "Constitución + tratados DD.HH.", "Código Penal"]}
        correctaIdx={2}
        explicacion="El bloque de constitucionalidad: CPE + tratados de derechos humanos."
      />

      <AutoCheck
        pregunta="En la norma 'el que robe será sancionado con 1 a 5 años', ¿qué es 'el que robe'?"
        opciones={[
          "consecuencia jurídica",
          "supuesto de hecho",
          "sanción",
          "regla permisiva",
        ]}
        correctaIdx={1}
        explicacion="Es el supuesto de hecho (la condición). La consecuencia es 'sancionado con 1 a 5 años'."
      />
    </EscenaRica>
  );
}
