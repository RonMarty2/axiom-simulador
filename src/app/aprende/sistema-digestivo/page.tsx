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
      unidad="MED-10"
      tituloUnidad="Sistema digestivo · De la boca al ano"
      escenas={[
        { titulo: "Digestión · panorama", componente: EscIntro },
        { titulo: "Boca y esófago", componente: EscBoca },
        { titulo: "Estómago", componente: EscEstomago },
        { titulo: "Intestino delgado", componente: EscIntestinoDelgado },
        { titulo: "Intestino grueso", componente: EscIntestinoGrueso },
        { titulo: "Hígado, vesícula y páncreas", componente: EscAnexos },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Digestión · el viaje de la comida</Titulo>

      <Hook>
        Te comés una empanada salteña. En 24–72 horas, su materia ha sido
        descompuesta, absorbida, distribuida a cada célula y los desechos
        expulsados. Es un proceso de 9 metros de largo (boca a ano).
      </Hook>

      <Definicion termino="Sistema digestivo">
        Tubo de ~9 m + órganos anexos. Convierte alimentos en moléculas
        pequeñas (glucosa, aminoácidos, ácidos grasos) que pueden ser
        absorbidas. Etapas:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Ingestión</strong> (boca).</li>
          <li><strong>Digestión mecánica</strong> (masticar, mezclar).</li>
          <li><strong>Digestión química</strong> (enzimas).</li>
          <li><strong>Absorción</strong> (intestino delgado).</li>
          <li><strong>Excreción</strong> (recto, ano).</li>
        </ul>
      </Definicion>

      <Conexion>
        El digestivo entrega nutrientes al cardiovascular (sangre), que los
        lleva a cada célula para la respiración celular (Biología-5).
      </Conexion>

      <Mnemotecnia>
        <strong>"Tubo digestivo: boca → faringe → esófago → estómago →
        intestino delgado → grueso → ano."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscBoca() {
  return (
    <EscenaRica>
      <Titulo>Boca y esófago · empieza la digestión</Titulo>

      <Definicion termino="Boca">
        Inicio del proceso:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Dientes:</strong> mecánica (cortar, moler). Adulto: 32 dientes.</li>
          <li><strong>Lengua:</strong> mezcla, gusto, deglución.</li>
          <li><strong>Glándulas salivales:</strong> 3 pares (parótidas,
            submandibulares, sublinguales). Producen saliva con AMILASA
            (digiere almidón) y lisozima (antibacteriana).</li>
        </ul>
      </Definicion>

      <Definicion termino="Esófago">
        Tubo muscular (25 cm) que conecta faringe con estómago. NO hay
        digestión: solo transporte por PERISTALSIS (ondas musculares).
        Esfínter esofágico inferior evita reflujo.
      </Definicion>

      <Pizarra alto={150}>
        <svg width="100%" height="100%" viewBox="0 0 720 150" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tipos de dientes (32 en adulto)
          </text>
          {[
            { x: 110, t: "Incisivos", n: "8", fn: "cortar" },
            { x: 290, t: "Caninos", n: "4", fn: "desgarrar" },
            { x: 470, t: "Premolares", n: "8", fn: "triturar" },
            { x: 620, t: "Molares", n: "12", fn: "moler" },
          ].map((d, i) => (
            <g key={i} transform={`translate(${d.x - 70}, 50)`}>
              <rect width={140} height={70} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1.5} rx={6} />
              <text x={70} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={12} fontWeight={700}>{d.t}</text>
              <text x={70} y={42} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{d.n} dientes</text>
              <text x={70} y={58} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">{d.fn}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Incisivos cortan, caninos desgarran, molares muelen."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEstomago() {
  return (
    <EscenaRica>
      <Titulo>Estómago · cámara ácida</Titulo>

      <Definicion termino="Estómago">
        Saco muscular (~1.5 L) bajo el diafragma. Funciones:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Almacena</strong> el bolo alimenticio.</li>
          <li><strong>Mezcla</strong> mecánicamente (formando quimo).</li>
          <li><strong>Digiere PROTEÍNAS</strong> con pepsina.</li>
          <li><strong>Mata microbios</strong> con HCl (pH 1.5–3).</li>
        </ul>
      </Definicion>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Secreciones del estómago
          </text>
          {[
            { x: 100, t: "HCl", d: "ácido clorhídrico, mata gérmenes, activa pepsina", c: LIENZO.bad },
            { x: 100, t: "Pepsina", d: "digiere proteínas", c: LIENZO.warn, y: 90 },
            { x: 410, t: "Moco", d: "protege la pared del propio ácido", c: "#06b6d4" },
            { x: 410, t: "Factor intrínseco", d: "permite absorción de vitamina B12", c: LIENZO.ok, y: 90 },
          ].map((s, i) => (
            <g key={i} transform={`translate(${s.x}, ${s.y || 50})`}>
              <rect x={-10} y={0} width={280} height={32} fill={s.c} opacity={0.1} stroke={s.c} strokeWidth={1} rx={6} />
              <text x={5} y={22} fill={s.c} fontSize={11} fontWeight={700}>{s.t}:</text>
              <text x={100} y={22} fill={LIENZO.fg} fontSize={11}>{s.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>Helicobacter pylori</strong> es una bacteria que sobrevive al
        ácido y causa la mayoría de las úlceras gástricas y duodenales.
        Tratamiento: antibióticos + protectores.
      </Cuidado>

      <Mnemotecnia>
        <strong>"En el estómago se digieren las PROTEÍNAS (no carbohidratos
        ni grasas)."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscIntestinoDelgado() {
  return (
    <EscenaRica>
      <Titulo>Intestino delgado · 90% de la absorción</Titulo>

      <Definicion termino="Intestino delgado (6–7 m)">
        El sitio principal de digestión química y absorción. 3 partes:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Duodeno (25 cm):</strong> recibe el quimo, mezcla con bilis y jugo pancreático.</li>
          <li><strong>Yeyuno (2.5 m):</strong> absorción de la mayoría de nutrientes.</li>
          <li><strong>Íleon (3.5 m):</strong> absorción de B12, sales biliares.</li>
        </ul>
      </Definicion>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Vellosidades intestinales: máxima superficie
          </text>
          {/* vellosidades */}
          <line x1={80} y1={130} x2={640} y2={130} stroke={LIENZO.fg} strokeWidth={1.5} />
          {[100, 160, 220, 280, 340, 400, 460, 520, 580].map((x, i) => (
            <g key={i}>
              <path d={`M ${x} 130 Q ${x + 10} 70 ${x + 20} 130`}
                fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={1.5} />
            </g>
          ))}
          <text x={360} y={55} textAnchor="middle" fill={LIENZO.bad} fontSize={11} fontWeight={600}>
            Vellosidades (con microvellosidades dentro)
          </text>
          <text x={360} y={160} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            Superficie total ≈ 250 m² (cancha de tenis)
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="¿Qué se absorbe?">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Glúcidos → glucosa, fructosa.</li>
          <li>Proteínas → aminoácidos.</li>
          <li>Lípidos → ácidos grasos (al sistema linfático: quilíferos).</li>
          <li>Vitaminas, sales, agua.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"Duodeno = decisión química; Yeyuno = absorción mayor;
        Íleon = ítem final."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscIntestinoGrueso() {
  return (
    <EscenaRica>
      <Titulo>Intestino grueso · agua y bacterias</Titulo>

      <Definicion termino="Intestino grueso (~1.5 m)">
        Partes: ciego (con apéndice), colon (ascendente, transverso,
        descendente, sigmoides), recto, ano. Funciones:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Reabsorbe agua</strong> y electrolitos.</li>
          <li><strong>Aloja flora intestinal</strong> (microbiota: bacterias beneficiosas).</li>
          <li><strong>Forma y elimina heces.</strong></li>
        </ul>
      </Definicion>

      <Definicion termino="Microbiota intestinal">
        ~100 billones de bacterias (más que tus propias células). Producen
        vitamina K, B12, B7 (biotina). También entrenan el sistema inmune.
      </Definicion>

      <Cuidado>
        Los <strong>probióticos</strong> (yogur, kéfir) aportan bacterias
        beneficiosas. Los antibióticos pueden destruir la flora normal,
        causando diarrea o sobrecrecimiento de Clostridium difficile.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Grueso = absorbe agua. Si no funciona bien → diarrea (pierde
        agua) o constipación (absorbe demasiado)."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscAnexos() {
  return (
    <EscenaRica>
      <Titulo>Órganos anexos · ayudan sin ser tubo</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 órganos anexos clave
          </text>
          {[
            { y: 50, t: "Hígado (1.5 kg)", fns: [
              "produce BILIS (emulsiona grasas)",
              "metaboliza nutrientes, desintoxica",
              "guarda glucógeno, vit. A, D, B12",
              "produce proteínas plasmáticas (albúmina, factores coagulación)",
            ], c: "#a16207" },
            { y: 130, t: "Vesícula biliar", fns: [
              "almacena y concentra bilis",
              "la libera al duodeno al comer grasas",
            ], c: "#10b981" },
            { y: 190, t: "Páncreas (digestivo)", fns: [
              "jugo pancreático: amilasa, lipasa, tripsina",
              "bicarbonato neutraliza ácido del quimo",
            ], c: "#a78bfa" },
          ].map((o, i) => (
            <g key={i} transform={`translate(80, ${o.y})`}>
              <rect width={580} height={o.fns.length * 18 + 22} fill={o.c} opacity={0.08} stroke={o.c} strokeWidth={1.5} rx={6} />
              <text x={15} y={18} fill={o.c} fontSize={13} fontWeight={700}>{o.t}</text>
              {o.fns.map((f, j) => (
                <text key={j} x={30} y={36 + j * 16} fill={LIENZO.fg} fontSize={11}>• {f}</text>
              ))}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        Los <strong>cálculos biliares</strong> (piedras de colesterol) tapan
        el conducto y dan cólico hepático. La extirpación de la vesícula
        (colecistectomía) es una cirugía frecuente.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Hígado fabrica bilis; vesícula la guarda; páncreas digiere
        y neutraliza."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'En el estómago se digiere TODO'">
        <strong>Realidad:</strong> ahí se digieren mayoritariamente PROTEÍNAS.
        Carbohidratos y grasas se digieren principalmente en el intestino
        delgado.
      </Misconception>

      <Misconception titulo="Error 2 · 'La bilis digiere grasas'">
        <strong>Realidad:</strong> la bilis EMULSIONA (rompe en gotitas) las
        grasas. Quien las digiere es la lipasa pancreática.
      </Misconception>

      <Misconception titulo="Error 3 · 'La absorción es en el estómago'">
        <strong>Realidad:</strong> 90% en intestino delgado (vellosidades).
      </Misconception>

      <Resumen>
        Boca (amilasa, masticar) → esófago (peristalsis) → estómago (HCl,
        pepsina, proteínas) → duodeno (recibe bilis y jugo pancreático) →
        yeyuno/íleon (absorción 90%) → grueso (agua, flora) → recto/ano.
        Anexos: hígado, vesícula, páncreas.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué enzima de la saliva digiere almidón?"
        opciones={["lipasa", "amilasa", "pepsina", "tripsina"]}
        correctaIdx={1}
        explicacion="Amilasa salival (también pancreática). Lipasa = grasas; pepsina = proteínas (estómago)."
      />

      <AutoCheck
        pregunta="¿Dónde se absorbe la mayor parte de los nutrientes?"
        opciones={["estómago", "intestino delgado", "intestino grueso", "esófago"]}
        correctaIdx={1}
        explicacion="90% en el intestino delgado (yeyuno e íleon, gracias a vellosidades)."
      />

      <AutoCheck
        pregunta="¿Qué órgano produce la bilis?"
        opciones={["páncreas", "vesícula", "hígado", "estómago"]}
        correctaIdx={2}
        explicacion="El hígado la produce; la vesícula la almacena."
      />

      <AutoCheck
        pregunta="¿Qué función tiene el HCl del estómago?"
        opciones={[
          "digerir grasas",
          "absorber vitaminas",
          "matar microbios y activar pepsina",
          "neutralizar el quimo",
        ]}
        correctaIdx={2}
        explicacion="El ácido mata gérmenes y activa la pepsina (proteasa)."
      />
    </EscenaRica>
  );
}
