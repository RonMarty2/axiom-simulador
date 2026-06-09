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
      unidad="MED-08"
      tituloUnidad="Sistema linfático e inmunidad"
      escenas={[
        { titulo: "Linfático · drenaje y defensa", componente: EscIntro },
        { titulo: "Órganos linfoides", componente: EscOrganos },
        { titulo: "Inmunidad innata", componente: EscInnata },
        { titulo: "Inmunidad adaptativa · linfocitos B y T", componente: EscAdaptativa },
        { titulo: "Antígeno y anticuerpo", componente: EscAg },
        { titulo: "Vacunas · entrenamiento del sistema", componente: EscVacunas },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Sistema linfático · drenaje + defensa</Titulo>

      <Hook>
        Cada día tu cuerpo se enfrenta a millones de bacterias, virus, hongos.
        ¿Por qué no te enfermás cada día? Porque tenés un ejército invisible:
        el sistema inmune.
      </Hook>

      <Definicion termino="Sistema linfático">
        Red de vasos linfáticos y órganos linfoides. Dos funciones:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Drenaje:</strong> recoge líquido intersticial sobrante y
            lo devuelve a la sangre.</li>
          <li><strong>Defensa inmune:</strong> produce y transporta linfocitos.</li>
        </ul>
      </Definicion>

      <Definicion termino="Linfa">
        Líquido claro (parecido al plasma sin proteínas) que circula por vasos
        linfáticos. Lleva linfocitos, grasas absorbidas (quilíferos del
        intestino) y desechos.
      </Definicion>

      <Cuidado>
        A diferencia de la sangre, la linfa <strong>NO tiene bomba</strong>.
        Se mueve por contracción muscular y respiración. Por eso el ejercicio
        favorece el drenaje linfático.
      </Cuidado>

      <Conexion>
        Trabaja en estrecha colaboración con el sistema cardiovascular
        (Unidad 7) y el sistema digestivo (intestino delgado → quilíferos).
      </Conexion>
    </EscenaRica>
  );
}

function EscOrganos() {
  return (
    <EscenaRica>
      <Titulo>Órganos linfoides</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Primarios (forman linfocitos) y secundarios (los activan)
          </text>
          <g transform="translate(80, 50)">
            <rect width={260} height={170} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>PRIMARIOS</text>
            <text x={20} y={55} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Médula ósea:</text>
            <text x={40} y={72} fill={LIENZO.fgDim} fontSize={11}>todos los linfocitos nacen aquí</text>
            <text x={40} y={87} fill={LIENZO.fgDim} fontSize={11}>linfocitos B maduran aquí</text>
            <text x={20} y={115} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Timo:</text>
            <text x={40} y={132} fill={LIENZO.fgDim} fontSize={11}>los linfocitos T maduran aquí</text>
            <text x={40} y={147} fill={LIENZO.fgDim} fontSize={11}>(detrás del esternón)</text>
          </g>
          <g transform="translate(380, 50)">
            <rect width={260} height={170} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>SECUNDARIOS</text>
            <text x={20} y={55} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Ganglios linfáticos:</text>
            <text x={40} y={72} fill={LIENZO.fgDim} fontSize={11}>filtran linfa (cuello, axila, ingle)</text>
            <text x={20} y={95} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Bazo:</text>
            <text x={40} y={112} fill={LIENZO.fgDim} fontSize={11}>filtra sangre, recicla eritrocitos</text>
            <text x={20} y={135} fill={LIENZO.fg} fontSize={12} fontWeight={600}>• Amígdalas, MALT:</text>
            <text x={40} y={152} fill={LIENZO.fgDim} fontSize={11}>defensa en mucosas</text>
          </g>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"B de Bone marrow; T de Timo."</strong> Recordá dónde maduran.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscInnata() {
  return (
    <EscenaRica>
      <Titulo>Inmunidad innata · la primera línea</Titulo>

      <Definicion termino="Inmunidad innata (no específica)">
        Defensa INMEDIATA, presente desde el nacimiento. No distingue
        patógenos específicos: ataca a TODO lo raro.
      </Definicion>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Barreras de la inmunidad innata
          </text>
          {[
            { t: "Barrera física", d: "piel, mucosas, pelo nasal" },
            { t: "Barrera química", d: "lágrimas (lisozima), HCl gástrico, sebo" },
            { t: "Inflamación", d: "vasodilatación, calor, hinchazón, dolor" },
            { t: "Fagocitos", d: "neutrófilos, macrófagos comen patógenos" },
            { t: "Células NK", d: "matan células infectadas o tumorales" },
            { t: "Fiebre", d: "T alta dificulta replicación de microbios" },
          ].map((b, i) => (
            <g key={i} transform={`translate(80, ${55 + i * 25})`}>
              <rect width={580} height={22} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1} rx={4} />
              <text x={15} y={15} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{b.t}</text>
              <text x={170} y={15} fill={LIENZO.fg} fontSize={11}>{b.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Innata = rápida, genérica, sin memoria."</strong> Adaptativa
        = lenta, específica, con memoria.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscAdaptativa() {
  return (
    <EscenaRica>
      <Titulo>Inmunidad adaptativa · específica con memoria</Titulo>

      <Definicion termino="Inmunidad adaptativa">
        Defensa LENTA (días) pero ESPECÍFICA. Aprende del primer encuentro y
        recuerda al patógeno (memoria inmunológica). Se basa en LINFOCITOS B
        y T.
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Linfocitos B vs T
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={140} fill="#3b82f6" opacity={0.1} stroke="#3b82f6" strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill="#3b82f6" fontSize={13} fontWeight={700}>LINFOCITOS B</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>maduran en médula ósea</text>
            <text x={20} y={70} fill={LIENZO.fg} fontSize={11}>• Producen ANTICUERPOS</text>
            <text x={20} y={90} fill={LIENZO.fg} fontSize={11}>• Inmunidad HUMORAL</text>
            <text x={20} y={110} fill={LIENZO.fg} fontSize={11}>• Atacan patógenos extracelulares</text>
            <text x={20} y={130} fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">(bacterias, toxinas)</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={140} fill="#10b981" opacity={0.1} stroke="#10b981" strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill="#10b981" fontSize={13} fontWeight={700}>LINFOCITOS T</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>maduran en timo</text>
            <text x={20} y={70} fill={LIENZO.fg} fontSize={11}>• T helper (CD4): coordinan</text>
            <text x={20} y={90} fill={LIENZO.fg} fontSize={11}>• T citotóxicos (CD8): matan</text>
            <text x={20} y={110} fill={LIENZO.fg} fontSize={11}>• Inmunidad CELULAR</text>
            <text x={20} y={130} fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">(virus, células tumorales)</text>
          </g>
        </svg>
      </Pizarra>

      <Cuidado>
        El <strong>HIV/SIDA</strong> destruye los linfocitos T CD4 (helper).
        Sin estos, el sistema inmune se desorganiza y aparecen infecciones
        oportunistas (las que normalmente no enferman a alguien sano).
      </Cuidado>
    </EscenaRica>
  );
}

function EscAg() {
  return (
    <EscenaRica>
      <Titulo>Antígeno vs anticuerpo</Titulo>

      <Definicion termino="Antígeno (Ag)">
        Sustancia (proteína, polisacárido) que el sistema inmune reconoce como
        EXTRAÑA y desencadena respuesta. Puede ser parte de un microbio, polen,
        un alérgeno, etc.
      </Definicion>

      <Definicion termino="Anticuerpo (Ac) / Inmunoglobulina (Ig)">
        Proteína en Y producida por linfocitos B (más bien por células
        plasmáticas, su forma activa). Se une específicamente a un antígeno
        para neutralizarlo o marcarlo.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            5 clases de anticuerpos
          </text>
          {[
            { x: 90, t: "IgG", d: "el más abundante, secundaria, atraviesa placenta" },
            { x: 260, t: "IgM", d: "primero en aparecer (respuesta primaria)" },
            { x: 430, t: "IgA", d: "secreciones (leche, lágrimas, saliva, mucosas)" },
            { x: 90, t: "IgE", d: "alergias, parásitos", y: 110 },
            { x: 260, t: "IgD", d: "función poco clara (receptor de B)", y: 110 },
          ].map((c, i) => (
            <g key={i} transform={`translate(${c.x}, ${c.y || 55})`}>
              <text fill={LIENZO.accent} fontSize={12} fontWeight={700}>{c.t}:</text>
              <text x={40} fill={LIENZO.fg} fontSize={11}>{c.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"GAMED: G abundante, A en secreciones, M primero, E alergia,
        D desconocido."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscVacunas() {
  return (
    <EscenaRica>
      <Titulo>Vacunas · entrenamiento del sistema inmune</Titulo>

      <Hook>
        Antes de las vacunas, la viruela mataba a 1 de cada 3 infectados.
        Hoy está erradicada. Las vacunas son uno de los mayores logros
        médicos: enseñan al sistema inmune SIN que enfermes.
      </Hook>

      <Definicion termino="Vacuna">
        Preparación que contiene patógenos atenuados, inactivados o fragmentos
        suyos (antígenos). Provoca respuesta inmune y MEMORIA, sin enfermedad.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Inmunidad activa vs pasiva
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={90} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>ACTIVA</text>
            <text x={130} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Vos producís anticuerpos</text>
            <text x={130} y={68} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>vacuna, infección natural</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={90} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} rx={10} />
            <text x={130} y={25} textAnchor="middle" fill={LIENZO.warn} fontSize={13} fontWeight={700}>PASIVA</text>
            <text x={130} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>Recibís anticuerpos ya hechos</text>
            <text x={130} y={68} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>leche materna, suero antiveneno</text>
          </g>
        </svg>
      </Pizarra>

      <Cuidado>
        Calendario boliviano: BCG (al nacer, contra TBC), pentavalente,
        antipoliomielítica, SRP (sarampión-rubéola-paperas), antiamarílica,
        HPV, COVID-19. Es gratuita y obligatoria. Saltársela pone en riesgo
        a la comunidad (inmunidad de rebaño).
      </Cuidado>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La linfa es sangre'">
        <strong>Realidad:</strong> es un líquido SIMILAR pero sin eritrocitos.
        Es transparente.
      </Misconception>

      <Misconception titulo="Error 2 · 'Linfocitos B en bazo (B de bazo)'">
        <strong>Realidad:</strong> B viene de "Bone marrow" (médula ósea).
        Maduran ahí.
      </Misconception>

      <Misconception titulo="Error 3 · 'Las vacunas causan autismo'">
        <strong>Realidad:</strong> mito desmentido decenas de veces. El estudio
        original (1998) fue fraudulento y retirado. Vacunas son seguras y
        salvan millones de vidas.
      </Misconception>

      <Resumen>
        Linfático: drenaje + defensa. Órganos primarios (médula, timo) y
        secundarios (ganglios, bazo, MALT). Inmunidad innata (rápida, sin
        memoria) y adaptativa (lenta, específica, con memoria). Linfocitos B
        (anticuerpos) y T (helper, citotóxicos). 5 Ig: GAMED. Vacuna =
        entrenamiento activo del sistema.
      </Resumen>

      <AutoCheck
        pregunta="¿Dónde maduran los linfocitos T?"
        opciones={["médula ósea", "ganglios", "bazo", "timo"]}
        correctaIdx={3}
        explicacion="T de Timo. B en médula ósea."
      />

      <AutoCheck
        pregunta="¿Qué tipo de inmunidad da una vacuna?"
        opciones={["pasiva natural", "pasiva artificial", "activa natural", "activa artificial"]}
        correctaIdx={3}
        explicacion="Vacuna = artificial. Activa = vos producís anticuerpos."
      />

      <AutoCheck
        pregunta="¿Qué célula del sistema inmune destruye el HIV?"
        opciones={["B", "T CD4 helper", "T CD8", "NK"]}
        correctaIdx={1}
        explicacion="HIV destruye los T CD4 helper, desorganizando toda la respuesta inmune."
      />

      <AutoCheck
        pregunta="¿Qué Ig predomina en la leche materna?"
        opciones={["IgG", "IgM", "IgA", "IgE"]}
        correctaIdx={2}
        explicacion="IgA está en secreciones: leche materna, lágrimas, saliva."
      />
    </EscenaRica>
  );
}
