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
      unidad="EDS-03"
      tituloUnidad="Investigación, estadística sanitaria y bioética"
      escenas={[
        { titulo: "Método científico en salud", componente: EscMetodo },
        { titulo: "Pregunta, hipótesis, variables", componente: EscPregunta },
        { titulo: "Estadística para salud", componente: EscEstad },
        { titulo: "Sistema de salud boliviano", componente: EscSistema },
        { titulo: "Bioética · 4 principios", componente: EscBioetica },
        { titulo: "Educación para la salud", componente: EscEducacion },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscMetodo() {
  return (
    <EscenaRica>
      <Titulo>Método científico en salud</Titulo>

      <Definicion termino="Método científico">
        Procedimiento ordenado para generar conocimiento verificable. Pasos:
      </Definicion>

      <Pizarra alto={334}>
        <svg width="100%" height="100%" viewBox="0 0 360 385" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Etapas del método científico
          </text>
          {[
            { t: "1. Observación", d: "fenómeno o problema" },
            { t: "2. Pregunta", d: "¿qué pasaría si...?" },
            { t: "3. Hipótesis", d: "respuesta tentativa" },
            { t: "4. Experimento", d: "diseño + recogida de datos" },
            { t: "5. Análisis", d: "estadística, gráficos" },
            { t: "6. Conclusiones", d: "acepta o rechaza la hipótesis" },
            { t: "7. Comunicación", d: "publicación científica" },
          ].map((e, i) => (
            <g key={i} transform={`translate(16, ${48 + i * 47})`}>
              <text x={0} y={14} fill={LIENZO.accent} fontSize={13} fontWeight={700}>{e.t}:</text>
              <text x={12} y={32} fill={LIENZO.fg} fontSize={13}>{e.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"OPHEACC: Observación, Pregunta, Hipótesis, Experimento,
        Análisis, Conclusiones, Comunicación."</strong>
      </Mnemotecnia>

      <Conexion>
        En medicina, este método se aplica en TODA investigación clínica, en
        guías de práctica y en cada vez que un médico evalúa un caso.
      </Conexion>
    </EscenaRica>
  );
}

function EscPregunta() {
  return (
    <EscenaRica>
      <Titulo>Pregunta de investigación · marco PICO</Titulo>

      <Definicion termino="Marco PICO">
        Formato para preguntas clínicas estructuradas:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>P:</strong> Población o paciente.</li>
          <li><strong>I:</strong> Intervención.</li>
          <li><strong>C:</strong> Comparador.</li>
          <li><strong>O:</strong> Outcome (resultado).</li>
        </ul>
      </Definicion>

      <WorkedExample titulo="Ejemplo">
        En adultos con hipertensión (P), ¿el losartán (I) comparado con el
        enalapril (C) reduce mejor la mortalidad cardiovascular a 5 años (O)?
      </WorkedExample>

      <Definicion termino="Hipótesis">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>H0 (nula):</strong> no hay diferencia.</li>
          <li><strong>H1 (alterna):</strong> hay diferencia.</li>
          <li>El estudio buscará evidencia para RECHAZAR H0.</li>
        </ul>
      </Definicion>

      <Definicion termino="Variables">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Independiente (causa):</strong> tratamiento aplicado.</li>
          <li><strong>Dependiente (efecto):</strong> resultado medido.</li>
          <li><strong>Confusoras:</strong> otras causas que afectan el resultado.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"PICO te ordena la pregunta. H0 y H1 te dan la apuesta. Las
        variables marcan qué mides."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEstad() {
  return (
    <EscenaRica>
      <Titulo>Estadística para salud</Titulo>

      <Definicion termino="Estadística descriptiva">
        Resume los datos:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Medidas de tendencia central:</strong> media (promedio),
            mediana (centro ordenado), moda (más frecuente).</li>
          <li><strong>Medidas de dispersión:</strong> rango, varianza,
            desviación estándar.</li>
        </ul>
      </Definicion>

      <Definicion termino="Estadística inferencial">
        Usa la muestra para inferir sobre la población:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Intervalo de confianza (IC 95%):</strong> rango donde
            probablemente está el valor real.</li>
          <li><strong>Valor p:</strong> probabilidad de obtener este resultado
            si H0 fuera cierta. p &lt; 0.05 = significativo.</li>
        </ul>
      </Definicion>

      <Pizarra alto={187}>
        <svg width="100%" height="100%" viewBox="0 0 360 216" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Curva normal (distribución de Gauss)
          </text>
          <line x1={20} x2={340} y1={175} y2={175} stroke={LIENZO.fg} strokeWidth={1.5} />
          <path d="M 20 175 Q 117 175 180 75 Q 243 175 340 175" fill={LIENZO.accent} opacity={0.2}
            stroke={LIENZO.accent} strokeWidth={2} />
          <line x1={180} y1={175} x2={180} y2={75} stroke={LIENZO.fg} strokeWidth={1} strokeDasharray="3 3" />
          <text x={180} y={64} textAnchor="middle" fill={LIENZO.fg} fontSize={13} fontWeight={600}>media (μ)</text>
          <text x={109} y={196} textAnchor="middle" fill={LIENZO.warn} fontSize={13}>−1σ</text>
          <text x={251} y={196} textAnchor="middle" fill={LIENZO.warn} fontSize={13}>+1σ</text>
        </svg>
      </Pizarra>

      <Parrafo>
        68% dentro de ±1σ, 95% dentro de ±2σ y 99.7% dentro de ±3σ.
      </Parrafo>

      <Cuidado>
        En salud, la mayoría de las variables (peso, T, presión, hemoglobina)
        se distribuyen aprox. NORMALMENTE. Por eso los rangos "normales" se
        definen con media ± 2 DS.
      </Cuidado>

      <Mnemotecnia>
        <strong>"p &lt; 0.05 = no es por casualidad. IC 95% = donde está
        probablemente la verdad."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSistema() {
  return (
    <EscenaRica>
      <Titulo>Sistema de salud boliviano</Titulo>

      <Definicion termino="Estructura del SUS (Sistema Único de Salud)">
        Bolivia tiene un sistema mixto:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Subsector público:</strong> Ministerio de Salud + SUS
            (gratuito desde 2019).</li>
          <li><strong>Seguridad social:</strong> Cajas (CNS, Petrolera,
            Universitaria, Ferroviaria…).</li>
          <li><strong>Privado:</strong> clínicas y consultas particulares.</li>
          <li><strong>Tradicional:</strong> medicina ancestral, ahora
            reconocida por la Constitución.</li>
        </ul>
      </Definicion>

      <Pizarra alto={288}>
        <svg width="100%" height="100%" viewBox="0 0 360 332" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 niveles de atención
          </text>
          {[
            { t: "PRIMER nivel", d1: "centros de salud, postas.", d2: "80% problemas resueltos aquí.", c: LIENZO.ok },
            { t: "SEGUNDO nivel", d1: "hospitales generales.", d2: "municipales y provinciales.", c: LIENZO.warn },
            { t: "TERCER nivel", d1: "hospitales especializados.", d2: "(Viedma, Obrero, CNS).", c: LIENZO.bad },
          ].map((p, i) => (
            <g key={i} transform={`translate(16, ${44 + i * 94})`}>
              <rect width={328} height={82} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={164} y={24} textAnchor="middle" fill={p.c} fontSize={14} fontWeight={700}>{p.t}</text>
              <text x={164} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{p.d1}</text>
              <text x={164} y={67} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{p.d2}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        El <strong>SUS (Ley 1152, 2019)</strong> garantiza acceso GRATUITO a
        prestaciones de salud para todos los habitantes sin seguro. Reto:
        falta de personal, infraestructura, medicamentos en algunas zonas.
      </Cuidado>
    </EscenaRica>
  );
}

function EscBioetica() {
  return (
    <EscenaRica>
      <Titulo>Bioética · 4 principios (Beauchamp-Childress)</Titulo>

      <Pizarra alto={309}>
        <svg width="100%" height="100%" viewBox="0 0 360 356" preserveAspectRatio="xMidYMid meet">
          <text x={180} y={24} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 principios de la bioética clínica
          </text>
          {[
            { y: 44, h: 78, t: "1. Autonomía", d1: "respetar las decisiones", d2: "del paciente informado", c: LIENZO.accent },
            { y: 132, h: 62, t: "2. Beneficencia", d1: "buscar el bien del paciente", d2: "", c: LIENZO.ok },
            { y: 204, h: 62, t: "3. No maleficencia", d1: "primum non nocere · no causar daño", d2: "", c: LIENZO.bad },
            { y: 276, h: 62, t: "4. Justicia", d1: "distribución equitativa de recursos", d2: "", c: LIENZO.warn },
          ].map((p, i) => (
            <g key={i} transform={`translate(16, ${p.y})`}>
              <rect width={328} height={p.h} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={164} y={22} textAnchor="middle" fill={p.c} fontSize={14} fontWeight={700}>{p.t}</text>
              <text x={164} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{p.d1}</text>
              {p.d2 && (
                <text x={164} y={63} textAnchor="middle" fill={LIENZO.fg} fontSize={13}>{p.d2}</text>
              )}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Consentimiento informado">
        Documento (y proceso) donde el paciente, después de recibir información
        clara, acepta o rechaza una intervención. Es expresión del principio
        de AUTONOMÍA.
      </Definicion>

      <Definicion termino="Casos clásicos de bioética">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Aborto, eutanasia.</li>
          <li>Trasplantes y donación de órganos.</li>
          <li>Reproducción asistida.</li>
          <li>Investigación con humanos (Códigos de Núremberg, Helsinki).</li>
          <li>Final de vida y cuidados paliativos.</li>
        </ul>
      </Definicion>

      <Mnemotecnia>
        <strong>"ABNJ: Autonomía, Beneficencia, No maleficencia, Justicia."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscEducacion() {
  return (
    <EscenaRica>
      <Titulo>Educación para la salud</Titulo>

      <Definicion termino="Educación para la salud (EpS)">
        Proceso de enseñanza-aprendizaje que ayuda a las personas a tomar
        decisiones informadas para su salud. Es la principal herramienta de
        prevención primaria.
      </Definicion>

      <Definicion termino="Carta de Ottawa (1986)">
        Documento fundacional de la PROMOCIÓN de la salud. 5 estrategias:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Políticas públicas saludables.</li>
          <li>Entornos favorables.</li>
          <li>Acción comunitaria.</li>
          <li>Desarrollo de habilidades personales.</li>
          <li>Reorientación de los servicios sanitarios.</li>
        </ul>
      </Definicion>

      <Cuidado>
        Hay diferencia entre <strong>educación</strong> (informar) y
        <strong> promoción</strong> (cambiar entornos políticos, sociales y
        físicos). Las 2 son complementarias.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Una persona informada decide; un entorno saludable facilita
        la decisión correcta."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Media = mediana'">
        <strong>Realidad:</strong> distintas. Media = promedio (sensible a
        valores extremos). Mediana = valor central (más robusta).
      </Misconception>

      <Misconception titulo="Error 2 · 'Si p &gt; 0.05 no hay efecto'">
        <strong>Realidad:</strong> significa que no se PROBÓ que haya efecto.
        Puede haberlo pero el estudio no tenía suficiente poder.
      </Misconception>

      <Misconception titulo="Error 3 · 'El médico decide, no el paciente'">
        <strong>Realidad:</strong> violaba el principio de autonomía. El
        paciente informado decide. El médico aconseja y acompaña.
      </Misconception>

      <Resumen>
        Método científico: OPHEACC. PICO ordena la pregunta clínica.
        Estadística: descriptiva (resumir) e inferencial (inferir). Curva
        normal: 68%/95%/99.7%. Sistema boliviano: público + cajas + privado +
        tradicional. Bioética: Autonomía, Beneficencia, No maleficencia,
        Justicia. EpS = principal herramienta preventiva.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué letra del marco PICO representa la INTERVENCIÓN?"
        opciones={["P", "I", "C", "O"]}
        correctaIdx={1}
        explicacion="P=población, I=intervención, C=comparador, O=outcome."
      />

      <AutoCheck
        pregunta="¿Qué medida es MÁS sensible a valores extremos?"
        opciones={["media", "mediana", "moda", "rango intercuartílico"]}
        correctaIdx={0}
        explicacion="La media (promedio) se altera con outliers. La mediana es robusta."
      />

      <AutoCheck
        pregunta="¿Qué principio bioético se viola al operar sin consentimiento?"
        opciones={["beneficencia", "no maleficencia", "autonomía", "justicia"]}
        correctaIdx={2}
        explicacion="Autonomía: el paciente decide sobre su cuerpo, previa información clara."
      />

      <AutoCheck
        pregunta="¿Qué % de los datos cae dentro de ±2 desviaciones estándar?"
        opciones={["50%", "68%", "95%", "99%"]}
        correctaIdx={2}
        explicacion="95% (regla 68-95-99.7 de la distribución normal)."
      />
    </EscenaRica>
  );
}
