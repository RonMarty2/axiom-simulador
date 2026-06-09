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
      unidad="EDS-01"
      tituloUnidad="Determinantes sociales de la salud"
      escenas={[
        { titulo: "¿Qué es la salud?", componente: EscIntro },
        { titulo: "Modelo de Lalonde · 4 determinantes", componente: EscLalonde },
        { titulo: "Determinantes sociales (OMS)", componente: EscSociales },
        { titulo: "Niveles de prevención", componente: EscPrevencion },
        { titulo: "Salud en Bolivia · indicadores", componente: EscBolivia },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Salud · más que ausencia de enfermedad</Titulo>

      <Hook>
        Una persona puede no tener gripe, pero estar deprimida, sin trabajo,
        viviendo en una casa fría. ¿Está sana? Según la OMS, NO. La salud es
        mucho más que un análisis de sangre normal.
      </Hook>

      <Definicion termino="Salud (OMS, 1948)">
        <strong>"Estado de completo bienestar FÍSICO, MENTAL y SOCIAL, y no
        solamente la ausencia de afecciones o enfermedades."</strong>
      </Definicion>

      <Cuidado>
        Esta definición es discutida por idealista (¿alguien está
        completamente sano?). La OMS la mantiene como meta aspiracional. Hoy
        se habla más de "capacidad de adaptación y autonomía" (Huber, 2011).
      </Cuidado>

      <Conexion>
        Esta unidad da el marco conceptual para todo el resto de Educación en
        Salud: epidemiología, estadística y bioética parten de ENTENDER qué
        determina que un grupo de personas esté sano o enfermo.
      </Conexion>
    </EscenaRica>
  );
}

function EscLalonde() {
  return (
    <EscenaRica>
      <Titulo>Modelo de Lalonde · 4 grandes determinantes</Titulo>

      <Definicion termino="Informe Lalonde (1974, Canadá)">
        Marc Lalonde dividió los determinantes de la salud en 4 grandes
        grupos. Es la base de la salud pública moderna.
      </Definicion>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿De qué depende tu salud? (% aproximado)
          </text>
          {[
            { y: 50, t: "Estilo de vida", per: "43%", d: "fumar, alcohol, dieta, ejercicio, conducción", c: LIENZO.bad },
            { y: 100, t: "Medio ambiente", per: "19%", d: "agua, aire, vivienda, ruido, contaminación", c: LIENZO.warn },
            { y: 150, t: "Biología humana", per: "27%", d: "genética, envejecimiento", c: LIENZO.ok },
            { y: 200, t: "Sistema sanitario", per: "11%", d: "acceso a médicos, hospitales, medicinas", c: "#06b6d4" },
          ].map((d, i) => (
            <g key={i} transform={`translate(80, ${d.y})`}>
              <rect width={parseInt(d.per) * 5} height={36} fill={d.c} opacity={0.4} stroke={d.c} strokeWidth={1.5} rx={4} />
              <text x={15} y={22} fill={LIENZO.fg} fontSize={11} fontWeight={700}>{d.t} ({d.per})</text>
              <text x={parseInt(d.per) * 5 + 20} y={22} fill={LIENZO.fgDim} fontSize={10}>{d.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"EMBI: Estilo, Medio ambiente, Biología, Sistema sanitario."</strong>
        El estilo de vida pesa más que TODO el sistema sanitario juntos.
      </Mnemotecnia>

      <Cuidado>
        Paradoja: el sistema sanitario es solo el 11% de la salud poblacional,
        pero recibe el 95% del presupuesto. Invertir en prevención (educación
        sobre estilo de vida) es más eficiente.
      </Cuidado>
    </EscenaRica>
  );
}

function EscSociales() {
  return (
    <EscenaRica>
      <Titulo>Determinantes sociales (Marmot · OMS)</Titulo>

      <Definicion termino="Determinantes sociales de la salud (DSS)">
        Condiciones en las que las personas NACEN, CRECEN, VIVEN, TRABAJAN
        y ENVEJECEN. Generan inequidades en salud. Comisión OMS-Marmot (2008).
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Principales DSS
          </text>
          {[
            { t: "Ingresos y pobreza", d: "más pobre = peor salud" },
            { t: "Educación", d: "más años de estudio = mejor salud" },
            { t: "Empleo y condiciones laborales", d: "trabajo digno protege" },
            { t: "Vivienda y servicios básicos", d: "agua, luz, alcantarillado" },
            { t: "Acceso a alimentos", d: "seguridad alimentaria" },
            { t: "Apoyo social", d: "redes familiares, comunidad" },
            { t: "Género, etnia, discriminación", d: "afectan acceso a recursos" },
          ].map((d, i) => (
            <g key={i} transform={`translate(80, ${55 + i * 22})`}>
              <text x={15} y={15} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{d.t}:</text>
              <text x={290} y={15} fill={LIENZO.fg} fontSize={11}>{d.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Inequidades en salud">
        Diferencias en salud que son EVITABLES e INJUSTAS. Ejemplo: la
        esperanza de vida en La Paz es ~5 años menor que en zonas urbanas
        ricas. Eso NO es natural.
      </Definicion>

      <Mnemotecnia>
        <strong>"La salud se construye donde la gente VIVE y TRABAJA, no
        solo en el hospital."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPrevencion() {
  return (
    <EscenaRica>
      <Titulo>3 niveles de prevención (Leavell-Clark)</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Antes, durante y después de la enfermedad
          </text>
          {[
            { x: 90, t: "PRIMARIA", momento: "ANTES de la enfermedad", acc: "vacunas, educación, dieta, ejercicio", c: LIENZO.ok },
            { x: 290, t: "SECUNDARIA", momento: "INICIO de la enfermedad", acc: "diagnóstico precoz, screening, papanicolaou, mamografía", c: LIENZO.warn },
            { x: 490, t: "TERCIARIA", momento: "DESPUÉS de instalada", acc: "tratamiento, rehabilitación, evitar complicaciones", c: LIENZO.bad },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={150} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={8} />
              <text x={80} y={22} textAnchor="middle" fill={p.c} fontSize={13} fontWeight={700}>{p.t}</text>
              <text x={80} y={50} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">{p.momento}</text>
              <text x={80} y={90} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{p.acc.split(",").slice(0, 2).join(",")}</text>
              {p.acc.split(",").length > 2 && (
                <text x={80} y={108} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{p.acc.split(",").slice(2).join(",")}</text>
              )}
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Primaria PREVIENE; Secundaria DETECTA; Terciaria CURA o
        REHABILITA."</strong>
      </Mnemotecnia>

      <Cuidado>
        Algunos autores incluyen <strong>prevención CUATERNARIA</strong>:
        evitar el daño causado por intervenciones médicas innecesarias
        (sobre-diagnóstico, sobre-tratamiento). Es relativamente nueva.
      </Cuidado>
    </EscenaRica>
  );
}

function EscBolivia() {
  return (
    <EscenaRica>
      <Titulo>Indicadores de salud en Bolivia</Titulo>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Datos clave (referencia)
          </text>
          {[
            { t: "Esperanza de vida", v: "~72 años (variable región)", c: "#06b6d4" },
            { t: "Mortalidad infantil", v: "~22 por mil nac. vivos", c: "#f59e0b" },
            { t: "Mortalidad materna", v: "~155 por 100.000 nac.", c: LIENZO.bad },
            { t: "Cobertura vacunal", v: "85-90% (calendarios)", c: LIENZO.ok },
            { t: "Acceso agua segura", v: "~88% urbano, ~67% rural", c: "#a78bfa" },
            { t: "Médicos / 1.000 hab", v: "~1.7 (OMS rec.: 2.5)", c: LIENZO.warn },
          ].map((d, i) => (
            <g key={i} transform={`translate(80, ${55 + i * 25})`}>
              <rect width={580} height={22} fill={d.c} opacity={0.08} stroke={d.c} strokeWidth={1} rx={4} />
              <text x={15} y={15} fill={d.c} fontSize={11} fontWeight={700}>{d.t}</text>
              <text x={300} y={15} fill={LIENZO.fg} fontSize={11}>{d.v}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        La <strong>mortalidad materna</strong> en Bolivia es de las más altas
        de Sudamérica. Causas: parto domiciliario sin asistencia, hemorragias,
        falta de transporte en zonas rurales. Es un indicador clave del
        desarrollo.
      </Cuidado>

      <Definicion termino="Brecha urbano-rural">
        Las ciudades (Cochabamba, La Paz, Santa Cruz) tienen mejor acceso. El
        área rural andina y amazónica tiene menos médicos, peor infraestructura
        y peores indicadores. Es la principal INEQUIDAD del sistema.
      </Definicion>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'Salud = no estar enfermo'">
        <strong>Realidad:</strong> según OMS, salud incluye bienestar mental
        y social. Una persona puede tener todo en orden físicamente y NO
        estar sana.
      </Misconception>

      <Misconception titulo="Error 2 · 'El médico es el principal responsable de tu salud'">
        <strong>Realidad:</strong> el sistema sanitario es solo 11% de los
        determinantes. Tu estilo de vida y entorno pesan mucho más.
      </Misconception>

      <Misconception titulo="Error 3 · 'Vacunar es prevención secundaria'">
        <strong>Realidad:</strong> es PRIMARIA. Se aplica ANTES de la
        enfermedad. Secundaria sería detectar precozmente (papanicolaou).
      </Misconception>

      <Resumen>
        Salud (OMS): bienestar físico + mental + social. 4 determinantes
        Lalonde: estilo de vida (43%) + biología (27%) + ambiente (19%) +
        sistema (11%). DSS: condiciones de vida. Prevención: primaria (antes),
        secundaria (detectar), terciaria (tratar).
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es el determinante con mayor PESO según Lalonde?"
        opciones={["sistema sanitario", "biología humana", "medio ambiente", "estilo de vida"]}
        correctaIdx={3}
        explicacion="Estilo de vida (43%). Sistema sanitario solo aporta 11%."
      />

      <AutoCheck
        pregunta="¿Qué tipo de prevención es la mamografía de tamizaje?"
        opciones={["primaria", "secundaria", "terciaria", "cuaternaria"]}
        correctaIdx={1}
        explicacion="Secundaria: detectar la enfermedad temprano (sin síntomas)."
      />

      <AutoCheck
        pregunta="Educar sobre la dieta saludable es prevención:"
        opciones={["primaria", "secundaria", "terciaria", "no es prevención"]}
        correctaIdx={0}
        explicacion="Primaria: actúa ANTES de que aparezca la enfermedad."
      />

      <AutoCheck
        pregunta="¿Cuál NO es un determinante social de la salud?"
        opciones={["pobreza", "educación", "vivienda", "vacuna BCG"]}
        correctaIdx={3}
        explicacion="BCG es una intervención del sistema sanitario, no un DSS."
      />
    </EscenaRica>
  );
}
