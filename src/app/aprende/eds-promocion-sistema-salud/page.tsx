"use client";

import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Definicion, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, CasoBolivia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="EDS-05"
      tituloUnidad="Promoción, prevención y sistema de salud"
      escenas={[
        { titulo: "Promoción vs prevención y Carta de Ottawa", componente: EscPromocionPrevencion },
        { titulo: "Atención Primaria de Salud (APS)", componente: EscAPS },
        { titulo: "Objetivos de Desarrollo Sostenible (ODS)", componente: EscODS },
        { titulo: "Bolivia: SAFCI, SUS y niveles de atención", componente: EscBoliviaSUS },
        { titulo: "Programas y vigilancia prioritaria", componente: EscVigilancia },
        { titulo: "Errores frecuentes y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscPromocionPrevencion() {
  return (
    <EscenaRica>
      <Titulo>Promoción de la salud vs prevención</Titulo>

      <Hook>
        Vacunar contra la influenza y construir parques seguros mejoran la salud,
        pero no son lo mismo. En el examen de Medicina suelen mezclar
        <strong> promoción</strong> con <strong>prevención</strong>: distinguir
        su enfoque y a quién se dirigen te asegura varios puntos.
      </Hook>

      <Definicion termino="Promoción de la salud (Carta de Ottawa, 1986)">
        Proceso que proporciona a las personas los medios para incrementar el
        control sobre los <strong>determinantes de su salud</strong> y mejorarla.
        Se dirige a <strong>toda la población</strong> mediante políticas
        públicas, educación comunitaria y entornos saludables.
      </Definicion>

      <Pizarra alto={338}>
        <svg width="100%" height="100%" viewBox="0 0 360 390" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Promoción vs Prevención
          </text>

          <rect x={12} y={36} width={336} height={158} rx={8} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={24} y={58} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            PROMOCIÓN DE LA SALUD
          </text>
          <text x={24} y={80} fill={LIENZO.fg} fontSize={13}>
            • Enfoque: determinantes sociales y
          </text>
          <text x={34} y={98} fill={LIENZO.fg} fontSize={13}>
            ambientales (bienestar integral).
          </text>
          <text x={24} y={120} fill={LIENZO.fg} fontSize={13}>
            • Población: TODA, sana o enferma.
          </text>
          <text x={24} y={142} fill={LIENZO.fg} fontSize={13}>
            • Ejemplos: leyes antitabaco, espacios
          </text>
          <text x={34} y={160} fill={LIENZO.fg} fontSize={13}>
            verdes, educación nutricional.
          </text>
          <text x={24} y={182} fill={LIENZO.fgDim} fontSize={13}>
            • Meta: calidad de vida y equidad.
          </text>

          <rect x={12} y={208} width={336} height={168} rx={8} fill={LIENZO.warn} opacity={0.1} stroke={LIENZO.warn} strokeWidth={1.5} />
          <text x={24} y={230} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            PREVENCIÓN DE LA ENFERMEDAD
          </text>
          <text x={24} y={252} fill={LIENZO.fg} fontSize={13}>
            • Enfoque: riesgos y factores
          </text>
          <text x={34} y={270} fill={LIENZO.fg} fontSize={13}>
            etiológicos de patologías concretas.
          </text>
          <text x={24} y={292} fill={LIENZO.fg} fontSize={13}>
            • Población: grupos en riesgo.
          </text>
          <text x={24} y={314} fill={LIENZO.fg} fontSize={13}>
            • Ejemplos: vacunas, tamizaje de
          </text>
          <text x={34} y={332} fill={LIENZO.fg} fontSize={13}>
            hipertensión o cáncer cervicouterino.
          </text>
          <text x={24} y={356} fill={LIENZO.fgDim} fontSize={13}>
            • Meta: bajar incidencia y secuelas.
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="5 áreas de acción de la Carta de Ottawa (1986)">
        1. Construir <strong>políticas públicas saludables</strong>. 2. Crear{" "}
        <strong>entornos favorables</strong>. 3. Reforzar la{" "}
        <strong>acción comunitaria</strong>. 4. Desarrollar{" "}
        <strong>habilidades personales</strong>. 5.{" "}
        <strong>Reorientar los servicios de salud</strong> hacia la promoción y
        la atención primaria.
      </Definicion>

      <Cuidado>
        La <strong>educación para la salud</strong> NO es independiente: forma
        parte de la promoción de la salud y de la prevención, e incluye la
        participación comunitaria y la equidad.
      </Cuidado>
    </EscenaRica>
  );
}

function EscAPS() {
  return (
    <EscenaRica>
      <Titulo>Atención Primaria de Salud (APS)</Titulo>

      <Definicion termino="Declaración de Alma-Ata (1978)">
        Asistencia sanitaria esencial, basada en métodos prácticos y
        científicamente fundados, puesta al alcance de todos los individuos y
        familias mediante su plena participación y a un costo soportable. Es el{" "}
        <strong>primer nivel de contacto</strong> con el sistema nacional de
        salud.
      </Definicion>

      <Pizarra alto={312}>
        <svg width="100%" height="100%" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 características básicas de la APS
          </text>
          {[
            { t: "Accesibilidad", d: "Sin barreras geográficas, económicas ni culturales", c: LIENZO.ok },
            { t: "Coordinación", d: "Integra acciones entre niveles y equipo de salud", c: "var(--dib-cyan-500)" },
            { t: "Integralidad", d: "Resuelve ~80-90 % de necesidades (promoción a rehab.)", c: LIENZO.accent },
            { t: "Longitudinalidad", d: "Seguimiento continuo a la persona o familia en el tiempo", c: LIENZO.warn },
          ].map((item, i) => (
            <g key={i} transform={`translate(14, ${40 + i * 76})`}>
              <rect x={0} y={0} width={332} height={64} rx={8} fill={item.c} opacity={0.1} stroke={item.c} strokeWidth={1.5} />
              <text x={14} y={24} fill={item.c} fontSize={13} fontWeight={700}>
                {i + 1}. {item.t}
              </text>
              <text x={14} y={46} fill={LIENZO.fg} fontSize={13}>
                {item.d}
              </text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Organización de la APS (modelo de Donabedian)">
        Se evalúa en tres dimensiones: <strong>Estructura</strong> (lo que hay:
        infraestructura, insumos, personal), <strong>Proceso</strong> (lo que se
        hace: programas, diagnóstico, referencia) y <strong>Resultado</strong>{" "}
        (lo que se consigue: estado de salud, equidad, satisfacción).
      </Definicion>

      <Mnemotecnia>
        <strong>ACIL</strong> para la APS: <strong>A</strong>ccesibilidad,{" "}
        <strong>C</strong>oordinación, <strong>I</strong>ntegralidad,{" "}
        <strong>L</strong>ongitudinalidad. Y <strong>EPR</strong> para
        Donabedian: Estructura, Proceso, Resultado.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscODS() {
  return (
    <EscenaRica>
      <Titulo>Objetivos de Desarrollo Sostenible (ODS)</Titulo>

      <Definicion termino="Agenda 2030 (ONU, 2015)">
        Conjunto de <strong>17 Objetivos</strong>, <strong>169 metas</strong> y
        más de <strong>230 indicadores</strong> adoptados por los países
        miembros de la ONU para erradicar la pobreza, proteger el planeta y
        asegurar el bienestar para 2030.
      </Definicion>

      <Pizarra alto={347}>
        <svg width="100%" height="100%" viewBox="0 0 360 400" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ODS clave que entran en examen
          </text>
          {[
            { n: "ODS 3", d: "Vida sana y bienestar en todas las edades", c: LIENZO.ok },
            { n: "ODS 4", d: "Educación inclusiva, equitativa y de por vida", c: LIENZO.bad },
            { n: "ODS 5", d: "Igualdad de género y empoderar a mujeres/niñas", c: "var(--dib-amber-500)" },
            { n: "ODS 6", d: "Agua limpia y saneamiento sostenible", c: "var(--dib-cyan-500)" },
            { n: "ODS 8", d: "Empleo pleno, productivo y trabajo decente", c: LIENZO.accent },
            { n: "ODS 9", d: "Infraestructura resiliente, industria e innovación", c: LIENZO.warn },
            { n: "ODS 10", d: "Reducir desigualdades dentro y entre países", c: "var(--dib-violet-400)" },
          ].map((ods, i) => (
            <g key={i} transform={`translate(12, ${38 + i * 50})`}>
              <rect x={0} y={0} width={336} height={42} rx={6} fill={ods.c} opacity={0.1} stroke={ods.c} strokeWidth={1.2} />
              <text x={12} y={26} fill={ods.c} fontSize={13} fontWeight={700}>{ods.n}</text>
              <text x={74} y={26} fill={LIENZO.fg} fontSize={13}>{ods.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        En los exámenes suelen intercambiar definiciones entre ODS vecinos:
        recuerda que <strong>ODS 4</strong> es educación inclusiva durante toda
        la vida (no exclusiva ni solo básica), <strong>ODS 5</strong> es género
        (no agua ni energía) y <strong>ODS 6</strong> es agua y saneamiento.
      </Cuidado>

      <Conexion>
        El <strong>ODS 3</strong> se vincula con todos los demás porque la salud
        depende de determinantes sociales como educación (ODS 4), agua segura
        (ODS 6), trabajo digno (ODS 8) y equidad (ODS 10).
      </Conexion>
    </EscenaRica>
  );
}

function EscBoliviaSUS() {
  return (
    <EscenaRica>
      <Titulo>Marco nacional: SAFCI, SUS y niveles</Titulo>

      <CasoBolivia>
        La <strong>Constitución Política del Estado (2009)</strong> reconoce la
        salud como derecho humano fundamental y responsabilidad indelegable del
        Estado, con gratuidad, universalidad, interculturalidad y participación
        social.
      </CasoBolivia>

      <Definicion termino="Modelo SAFCI y SUS">
        El modelo <strong>SAFCI</strong> (Salud Familiar Comunitario
        Intercultural) prioriza la atención integral en la comunidad y respeta la
        medicina tradicional. El <strong>SUS</strong> (Sistema Único de Salud)
        brinda atención gratuita y universal financiada con recursos públicos.
      </Definicion>

      <Pizarra alto={355}>
        <svg width="100%" height="100%" viewBox="0 0 360 410" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Niveles de atención en el SUS (Bolivia)
          </text>

          <rect x={12} y={36} width={336} height={116} rx={8} fill={LIENZO.ok} opacity={0.12} stroke={LIENZO.ok} strokeWidth={1.5} />
          <text x={24} y={58} fill={LIENZO.ok} fontSize={13} fontWeight={700}>
            1.º NIVEL · Centro de Salud (Puerta de entrada)
          </text>
          <text x={24} y={80} fill={LIENZO.fg} fontSize={13}>
            Médicos generales, sin cirugía. Promoción y
          </text>
          <text x={24} y={98} fill={LIENZO.fg} fontSize={13}>
            prevención. Resuelve el 80 % de los problemas
          </text>
          <text x={24} y={116} fill={LIENZO.fg} fontSize={13}>
            frecuentes; si requiere internación, refiere.
          </text>
          <text x={24} y={138} fill={LIENZO.fgDim} fontSize={13}>
            Individuo, familia y comunidad.
          </text>

          <rect x={12} y={166} width={336} height={94} rx={8} fill={LIENZO.warn} opacity={0.12} stroke={LIENZO.warn} strokeWidth={1.5} />
          <text x={24} y={188} fill={LIENZO.warn} fontSize={13} fontWeight={700}>
            2.º NIVEL · Hospital de Segundo Nivel
          </text>
          <text x={24} y={210} fill={LIENZO.fg} fontSize={13}>
            Mínimo 4 especialidades: ginecología, cirugía
          </text>
          <text x={24} y={228} fill={LIENZO.fg} fontSize={13}>
            general (apéndice, vesícula, cesárea),
          </text>
          <text x={24} y={246} fill={LIENZO.fg} fontSize={13}>
            pediatría y medicina interna.
          </text>

          <rect x={12} y={274} width={336} height={80} rx={8} fill={LIENZO.bad} opacity={0.12} stroke={LIENZO.bad} strokeWidth={1.5} />
          <text x={24} y={296} fill={LIENZO.bad} fontSize={13} fontWeight={700}>
            3.º NIVEL · Hospital de Tercer Nivel
          </text>
          <text x={24} y={318} fill={LIENZO.fg} fontSize={13}>
            Especialidades, subespecialidades y alta
          </text>
          <text x={24} y={336} fill={LIENZO.fg} fontSize={13}>
            complejidad. (2.º + 3.º resuelven el 20 % restante).
          </text>

          <rect x={12} y={366} width={336} height={34} rx={6} fill={LIENZO.accent} opacity={0.14} stroke={LIENZO.accent} strokeWidth={1.2} />
          <text x={180} y={388} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={700}>
            Urgencias y emergencias: se atienden en TODOS los niveles
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>1.º = 80 % + puerta de entrada</strong> (Centro de Salud).{" "}
        <strong>2.º = 4 especialidades</strong> (gineco, cirugía, pediatría,
        medicina interna). <strong>3.º = alta complejidad</strong>.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscVigilancia() {
  return (
    <EscenaRica>
      <Titulo>Programas y vigilancia prioritaria en Bolivia</Titulo>

      <CasoBolivia>
        En el marco del modelo SAFCI, el programa emblemático{" "}
        <strong>Mi Salud</strong> (implementado en 2013) lleva equipos médicos a
        comunidades vulnerables con visitas domiciliarias. Se suman programas
        nacionales prioritarios: <strong>PAI</strong> (vacunación),{" "}
        <strong>PN-TB</strong> (tuberculosis, estrategia DOTS),{" "}
        <strong>VIH/SIDA e ITS</strong>, <strong>Salud Sexual y Reproductiva</strong>{" "}
        y <strong>Desnutrición Cero</strong>.
      </CasoBolivia>

      <Pizarra alto={338}>
        <svg width="100%" height="100%" viewBox="0 0 360 390" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={22} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Vigilancia prioritaria en Bolivia
          </text>
          {[
            { t: "Vectoriales", d: "Dengue, chikungunya y malaria (expansión por clima)", c: LIENZO.warn },
            { t: "Zoonóticas y virales", d: "Chagas, hantavirus, virus Chapare y Machupo", c: LIENZO.bad },
            { t: "Inmunoprevenibles", d: "Brotes de sarampión por brechas de vacunación", c: "var(--dib-amber-500)" },
            { t: "Transmisión vertical", d: "Control madre-hijo: VIH, sífilis, Chagas, hepatitis B", c: "var(--dib-cyan-500)" },
            { t: "Crónicas transmisibles", d: "Tuberculosis y VIH/SIDA (alta incidencia)", c: "var(--dib-violet-400)" },
          ].map((v, i) => (
            <g key={i} transform={`translate(12, ${38 + i * 68})`}>
              <rect x={0} y={0} width={336} height={58} rx={8} fill={v.c} opacity={0.1} stroke={v.c} strokeWidth={1.3} />
              <text x={14} y={22} fill={v.c} fontSize={13} fontWeight={700}>{v.t}</text>
              <text x={14} y={44} fill={LIENZO.fg} fontSize={13}>{v.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        Las <strong>enfermedades vectoriales</strong> (como el dengue) se
        expanden hacia zonas antes menos expuestas por lluvias intensas, mayor
        temperatura y urbanización no planificada.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores frecuentes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La puerta de entrada al SUS es la Seguridad Social o el 3.º nivel'">
        <strong>Realidad:</strong> la puerta de entrada es el{" "}
        <strong>Primer Nivel de Atención</strong> (Centro de Salud), que
        resuelve cerca del 80 % de los problemas frecuentes.
      </Misconception>

      <Misconception titulo="Error 2 · 'El Tercer Nivel se enfoca en promoción y prevención'">
        <strong>Realidad:</strong> la promoción y prevención son el énfasis del
        Primer Nivel. El Tercer Nivel realiza procedimientos de alta
        complejidad y subespecialidades.
      </Misconception>

      <Misconception titulo="Error 3 · 'El ODS 4 promueve educación exclusiva y solo básica'">
        <strong>Realidad:</strong> el ODS 4 promueve educación{" "}
        <strong>inclusiva</strong>, equitativa y de calidad durante{" "}
        <strong>toda la vida</strong>.
      </Misconception>

      <WorkedExample titulo="Pregunta real UMSS (1er Parcial 2025-2026, P49)">
        <p className="mb-2">
          <strong>Afirmación 1:</strong> La puerta de entrada al Sistema Único
          de Salud de Bolivia es la Seguridad de Salud.
          <br />
          <strong>Afirmación 2:</strong> El Primer Nivel de Atención resuelve el
          80 % de problemas de salud frecuentes.
        </p>
        <p className="text-sm">
          <strong>Análisis:</strong> La 1 es falsa (la puerta de entrada es el
          Primer Nivel, no la seguridad social). La 2 es verdadera. Por tanto, la
          opción correcta es <strong>solo la afirmación 2</strong>.
        </p>
      </WorkedExample>

      <Resumen>
        Promoción = toda la población + determinantes (Ottawa 1986). Prevención
        = grupos en riesgo + enfermedad. APS (Alma-Ata 1978) = ACIL. Agenda
        2030 = 17 ODS (ODS 3 salud, 4 educación inclusiva, 5 género, 6 agua, 8
        trabajo, 9 innovación, 10 desigualdades). SUS = 1.º nivel (80 %, puerta
        de entrada), 2.º (4 especialidades), 3.º (alta complejidad).
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál de las siguientes NO es una de las 5 áreas de acción de la Carta de Ottawa (1986)?"
        opciones={[
          "Construir políticas públicas saludables",
          "Reforzar la acción comunitaria",
          "Priorizar hospitales de tercer nivel",
          "Desarrollar habilidades personales",
        ]}
        correctaIdx={2}
        explicacion="Ottawa propone reorientar los servicios hacia la promoción y atención primaria, no priorizar el tercer nivel curativo."
      />

      <AutoCheck
        pregunta="¿Qué ODS busca garantizar la disponibilidad y gestión sostenible del agua y el saneamiento?"
        opciones={["ODS 6", "ODS 5", "ODS 8", "ODS 10"]}
        correctaIdx={0}
        explicacion="El ODS 6 trata sobre agua limpia y saneamiento; el ODS 5 es igualdad de género, el 8 trabajo decente y el 10 reducción de desigualdades."
      />

      <AutoCheck
        pregunta="En el SUS de Bolivia, ¿cuáles son las 4 especialidades mínimas de un Hospital de Segundo Nivel?"
        opciones={[
          "Cardiología, neurología, pediatría y oncología",
          "Medicina general, odontología, enfermería y farmacia",
          "Traumatología, urología, ginecología y psiquiatría",
          "Ginecología, cirugía general, pediatría y medicina interna",
        ]}
        correctaIdx={3}
        explicacion="El segundo nivel cuenta como mínimo con ginecología, cirugías (apéndice, vesícula, cesárea), pediatría y medicina interna."
      />

      <AutoCheck
        pregunta="En el modelo de Donabedian aplicado a la APS, ¿a qué dimensión corresponden la infraestructura y el personal disponible?"
        opciones={["Proceso", "Estructura", "Resultado", "Longitudinalidad"]}
        correctaIdx={1}
        explicacion="Estructura = lo que hay (recursos físicos, humanos y organizativos); Proceso = lo que se hace; Resultado = lo que se consigue."
      />
    </EscenaRica>
  );
}
