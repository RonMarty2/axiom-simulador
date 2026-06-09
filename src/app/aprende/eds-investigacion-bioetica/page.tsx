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

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
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
            <g key={i} transform={`translate(80, ${50 + i * 22})`}>
              <text x={15} y={15} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{e.t}:</text>
              <text x={170} y={15} fill={LIENZO.fg} fontSize={11}>{e.d}</text>
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
        variables marcan qué medís."</strong>
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

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Curva normal (distribución de Gauss)
          </text>
          <line x1={80} x2={640} y1={170} y2={170} stroke={LIENZO.fg} strokeWidth={1.5} />
          <path d="M 80 170 Q 250 170 360 70 Q 470 170 640 170" fill={LIENZO.accent} opacity={0.2}
            stroke={LIENZO.accent} strokeWidth={2} />
          <line x1={360} y1={170} x2={360} y2={70} stroke={LIENZO.fg} strokeWidth={1} strokeDasharray="3 3" />
          <text x={360} y={60} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>media (μ)</text>
          <text x={235} y={185} textAnchor="middle" fill={LIENZO.warn} fontSize={11}>−1σ</text>
          <text x={485} y={185} textAnchor="middle" fill={LIENZO.warn} fontSize={11}>+1σ</text>
          <text x={360} y={195} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10} fontStyle="italic">
            68% dentro de ±1σ, 95% ±2σ, 99.7% ±3σ
          </text>
        </svg>
      </Pizarra>

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

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 niveles de atención
          </text>
          {[
            { x: 90, t: "PRIMER nivel", d: "centros de salud, postas. 80% problemas resueltos aquí.", c: LIENZO.ok },
            { x: 290, t: "SEGUNDO nivel", d: "hospitales generales municipales/provinciales.", c: LIENZO.warn },
            { x: 490, t: "TERCER nivel", d: "hospitales especializados (Viedma, Obrero, CNS).", c: LIENZO.bad },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={120} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={80} y={70} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.d.split(".")[0]}</text>
              {p.d.split(".")[1] && (
                <text x={80} y={88} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.d.split(".")[1]}</text>
              )}
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

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 principios de la bioética clínica
          </text>
          {[
            { x: 90, y: 50, t: "1. Autonomía", d: "respetar las decisiones del paciente informado", c: LIENZO.accent },
            { x: 410, y: 50, t: "2. Beneficencia", d: "buscar el bien del paciente", c: LIENZO.ok },
            { x: 90, y: 150, t: "3. No maleficencia", d: "primum non nocere · no causar daño", c: LIENZO.bad },
            { x: 410, y: 150, t: "4. Justicia", d: "distribución equitativa de recursos", c: LIENZO.warn },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y})`}>
              <rect width={220} height={80} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={110} y={25} textAnchor="middle" fill={p.c} fontSize={13} fontWeight={700}>{p.t}</text>
              <text x={110} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.d}</text>
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
