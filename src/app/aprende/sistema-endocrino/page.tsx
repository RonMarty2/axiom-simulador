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
      unidad="MED-06"
      tituloUnidad="Sistema endocrino · Hormonas"
      escenas={[
        { titulo: "Endocrino vs nervioso", componente: EscIntro },
        { titulo: "Hipotálamo e hipófisis · centro de control", componente: EscHipofisis },
        { titulo: "Tiroides y paratiroides", componente: EscTiroides },
        { titulo: "Páncreas · insulina y glucagón", componente: EscPancreas },
        { titulo: "Glándulas suprarrenales", componente: EscSuprarrenales },
        { titulo: "Gónadas · ovarios y testículos", componente: EscGonadas },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Endocrino · mensajes químicos por la sangre</Titulo>

      <Hook>
        Si el sistema nervioso es internet (rápido, dirigido), el endocrino es
        correo postal: lento pero llega a TODOS los rincones del cuerpo. Las
        hormonas son los mensajes.
      </Hook>

      <Definicion termino="Sistema endocrino">
        Conjunto de glándulas que producen HORMONAS y las vierten a la sangre.
        Las hormonas viajan por todo el cuerpo y solo actúan sobre células
        que tienen su RECEPTOR específico.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Nervioso vs Endocrino
          </text>
          {["Característica", "Nervioso", "Endocrino"].map((h, i) => (
            <g key={i}>
              <rect x={60 + i * 200} y={45} width={195} height={26} fill={LIENZO.accent} opacity={0.15} stroke={LIENZO.accent} strokeWidth={1} />
              <text x={60 + i * 200 + 97} y={63} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h}</text>
            </g>
          ))}
          {[
            { c: "Mensaje", n: "Eléctrico", e: "Químico (hormona)" },
            { c: "Velocidad", n: "Milisegundos", e: "Segundos a días" },
            { c: "Vía", n: "Axón (dirigido)", e: "Sangre (todo el cuerpo)" },
            { c: "Duración", n: "Breve", e: "Larga" },
          ].map((row, i) => (
            <g key={i}>
              {[row.c, row.n, row.e].map((v, j) => (
                <g key={j}>
                  <rect x={60 + j * 200} y={71 + i * 22} width={195} height={22} fill="none" stroke={LIENZO.fgFaint} strokeWidth={1} />
                  <text x={60 + j * 200 + 97} y={86 + i * 22} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{v}</text>
                </g>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Nervioso = telegrama rápido a uno; Endocrino = carta lenta a
        todos."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscHipofisis() {
  return (
    <EscenaRica>
      <Titulo>Hipotálamo + hipófisis · la dupla maestra</Titulo>

      <Definicion termino="Hipotálamo">
        Pequeña región del cerebro. Es el PUENTE entre el sistema nervioso y
        el endocrino. Detecta cambios internos (T, hambre, sed) y manda
        órdenes a la hipófisis.
      </Definicion>

      <Definicion termino="Hipófisis (pituitaria)">
        Glándula del tamaño de un guisante bajo el cerebro. "Glándula maestra"
        porque controla a otras glándulas. 2 lóbulos:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Anterior (adenohipófisis):</strong> GH, TSH, ACTH, FSH, LH, PRL.</li>
          <li><strong>Posterior (neurohipófisis):</strong> ADH (antidiurética), oxitocina.</li>
        </ul>
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Hormonas de la hipófisis anterior y a quiénes dirigen
          </text>
          {[
            { t: "GH", d: "hormona del crecimiento → huesos, músculos" },
            { t: "TSH", d: "estimula la TIROIDES" },
            { t: "ACTH", d: "estimula la corteza SUPRARRENAL" },
            { t: "FSH", d: "estimula ovarios/testículos (gametos)" },
            { t: "LH", d: "ovulación / testosterona" },
            { t: "PRL", d: "Prolactina → producción de leche" },
          ].map((h, i) => (
            <g key={i} transform={`translate(80, ${50 + i * 25})`}>
              <rect width={580} height={22} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1} rx={4} />
              <text x={15} y={15} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{h.t}</text>
              <text x={70} y={15} fill={LIENZO.fg} fontSize={11}>{h.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Anterior produce 6; Posterior produce 2 (ADH y oxitocina)."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscTiroides() {
  return (
    <EscenaRica>
      <Titulo>Tiroides · el metabolismo</Titulo>

      <Definicion termino="Tiroides">
        Glándula en forma de mariposa en el cuello. Produce T3 y T4
        (tiroxina), hormonas que regulan el METABOLISMO BASAL: cuánta energía
        gasta tu cuerpo en reposo. Requieren YODO.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Hipertiroidismo vs Hipotiroidismo
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={130} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>HIPERTIROIDISMO</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>↑ T3 y T4</text>
            <text x={130} y={68} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Adelgaza, taquicardia, calor</text>
            <text x={130} y={86} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>nerviosismo, exoftalmia</text>
            <text x={130} y={110} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">enfermedad de Graves</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={130} fill="#06b6d4" opacity={0.1} stroke="#06b6d4" strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill="#06b6d4" fontSize={13} fontWeight={700}>HIPOTIROIDISMO</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>↓ T3 y T4</text>
            <text x={130} y={68} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Engorda, bradicardia, frío</text>
            <text x={130} y={86} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>fatiga, somnolencia, bocio</text>
            <text x={130} y={110} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">déficit de yodo (Hashimoto)</text>
          </g>
        </svg>
      </Pizarra>

      <Cuidado>
        Bolivia tuvo históricamente BOCIO ENDÉMICO por falta de yodo en el
        agua del altiplano. Por eso desde 1980 se yoda toda la sal. Es una
        política de salud pública crítica.
      </Cuidado>

      <Definicion termino="Paratiroides">
        4 glándulas pequeñas detrás de la tiroides. Producen PTH (paratohormona)
        que regula el CALCIO en sangre. Sube Ca²⁺ extrayéndolo del hueso si
        hace falta.
      </Definicion>
    </EscenaRica>
  );
}

function EscPancreas() {
  return (
    <EscenaRica>
      <Titulo>Páncreas · glándula mixta</Titulo>

      <Definicion termino="Páncreas">
        Glándula MIXTA: exocrina (jugo pancreático para digestión) y
        endocrina (hormonas). Las hormonas las producen los <strong>islotes
        de Langerhans</strong>.
      </Definicion>

      <Pizarra alto={200}>
        <svg width="100%" height="100%" viewBox="0 0 720 200" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Regulación de la glucemia
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={130} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>INSULINA (células β)</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>↓ glucosa en sangre</text>
            <text x={130} y={68} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Células captan glucosa</text>
            <text x={130} y={86} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Hígado guarda glucógeno</text>
            <text x={130} y={108} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">se libera tras comer</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={130} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>GLUCAGÓN (células α)</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>↑ glucosa en sangre</text>
            <text x={130} y={68} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Rompe glucógeno hepático</text>
            <text x={130} y={86} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>• Libera glucosa</text>
            <text x={130} y={108} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">se libera en ayunas</text>
          </g>
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>Diabetes tipo 1:</strong> el páncreas NO produce insulina.
        Necesita inyecciones. <strong>Tipo 2:</strong> las células no responden
        bien a la insulina (resistencia). Es la más frecuente en adultos.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Insulina = INserta glucosa en células. Glucagón = saca glucosa
        del hígado."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSuprarrenales() {
  return (
    <EscenaRica>
      <Titulo>Glándulas suprarrenales · sobre los riñones</Titulo>

      <Definicion termino="Suprarrenales (2)">
        Una sobre cada riñón. Tienen 2 partes muy diferentes:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Corteza:</strong> produce CORTICOIDES.
            <ul style={{ margin: "2px 0 0 18px", padding: 0 }}>
              <li>Glucocorticoides (cortisol): estrés crónico, antiinflamatorio.</li>
              <li>Mineralocorticoides (aldosterona): equilibrio Na⁺ y K⁺.</li>
              <li>Andrógenos suprarrenales.</li>
            </ul>
          </li>
          <li><strong>Médula:</strong> produce ADRENALINA y NORADRENALINA
            (estrés agudo, lucha o huida).</li>
        </ul>
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Efectos de la adrenalina (segundos)
          </text>
          {[
            { x: 90, t: "Corazón", e: "↑ frecuencia y fuerza" },
            { x: 250, t: "Bronquios", e: "dilata (más O₂)" },
            { x: 410, t: "Pupila", e: "midriasis" },
            { x: 570, t: "Glucosa", e: "↑ disponible" },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={140} height={70} fill={LIENZO.bad} opacity={0.1} stroke={LIENZO.bad} strokeWidth={1.5} rx={8} />
              <text x={60} y={22} textAnchor="middle" fill={LIENZO.bad} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={60} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.e}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Cortisol = estrés CRÓNICO; Adrenalina = estrés AGUDO."</strong>
        Ambos preparan para sobrevivir, pero en tiempos distintos.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscGonadas() {
  return (
    <EscenaRica>
      <Titulo>Gónadas · ovarios y testículos</Titulo>

      <Definicion termino="Ovarios (mujer)">
        Producen óvulos + hormonas:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Estrógenos:</strong> caracteres sexuales femeninos,
            mantienen huesos, regulan ciclo menstrual.</li>
          <li><strong>Progesterona:</strong> prepara útero para embarazo, lo
            mantiene.</li>
        </ul>
      </Definicion>

      <Definicion termino="Testículos (varón)">
        Producen espermatozoides + TESTOSTERONA: caracteres sexuales
        masculinos (voz grave, vello, masa muscular), libido, espermatogénesis.
      </Definicion>

      <Cuidado>
        Las gónadas son estimuladas por FSH y LH (de la hipófisis), que a su
        vez son estimuladas por GnRH (del hipotálamo). Es un eje:
        <strong> Hipotálamo → Hipófisis → Gónadas</strong>.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Solo las mujeres tienen estrógenos'">
        <strong>Realidad:</strong> los varones también tienen estrógenos (en
        menor cantidad). Y las mujeres tienen testosterona.
      </Misconception>

      <Misconception titulo="Error 2 · 'Adrenalina = cortisol'">
        <strong>Realidad:</strong> ambas son de la suprarrenal, pero
        diferentes. Adrenalina = médula, rápida. Cortisol = corteza, lenta.
      </Misconception>

      <Misconception titulo="Error 3 · 'La hipófisis solo controla el crecimiento'">
        <strong>Realidad:</strong> controla MUCHAS glándulas. Es la "glándula
        maestra". Crecimiento es solo una de sus funciones (GH).
      </Misconception>

      <Resumen>
        Endocrino = hormonas por sangre. Glándulas clave: hipotálamo (puente
        nervio-endocrino), hipófisis (maestra, anterior 6 + posterior 2),
        tiroides (metabolismo), paratiroides (Ca²⁺), páncreas (insulina/
        glucagón), suprarrenales (cortisol + adrenalina), gónadas (sexuales).
      </Resumen>

      <AutoCheck
        pregunta="¿Qué hormona baja la glucosa en sangre?"
        opciones={["glucagón", "insulina", "cortisol", "adrenalina"]}
        correctaIdx={1}
        explicacion="Insulina (células β del páncreas) baja la glucemia. Las otras 3 la suben."
      />

      <AutoCheck
        pregunta="¿Qué glándula es 'maestra'?"
        opciones={["tiroides", "páncreas", "hipófisis", "suprarrenal"]}
        correctaIdx={2}
        explicacion="La hipófisis controla a las demás glándulas (TSH, ACTH, FSH, LH...)."
      />

      <AutoCheck
        pregunta="El bocio endémico se debe a déficit de:"
        opciones={["calcio", "yodo", "hierro", "vitamina D"]}
        correctaIdx={1}
        explicacion="Sin yodo, la tiroides no produce T3/T4 y se inflama (bocio)."
      />

      <AutoCheck
        pregunta="¿Qué hormona prepara el cuerpo para 'lucha o huida' RÁPIDO?"
        opciones={["cortisol", "insulina", "tiroxina", "adrenalina"]}
        correctaIdx={3}
        explicacion="Adrenalina actúa en segundos. Cortisol es lento (estrés crónico)."
      />
    </EscenaRica>
  );
}
