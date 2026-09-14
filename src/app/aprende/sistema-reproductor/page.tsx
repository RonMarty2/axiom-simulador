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
      unidad="MED-12"
      tituloUnidad="Sistema reproductor · Femenino y masculino"
      escenas={[
        { titulo: "Reproducción sexual · panorama", componente: EscIntro },
        { titulo: "Aparato reproductor masculino", componente: EscMasculino },
        { titulo: "Aparato reproductor femenino", componente: EscFemenino },
        { titulo: "Ciclo menstrual", componente: EscCiclo },
        { titulo: "Fecundación y desarrollo embrionario", componente: EscFecundacion },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Reproducción · perpetuar la especie</Titulo>

      <Hook>
        Empiezas como UNA célula (cigoto, 0.1 mm). 9 meses después, llegas al
        mundo con billones de células. Toda esa transformación viene de la
        unión de un óvulo + un espermatozoide, cada uno con 23 cromosomas.
      </Hook>

      <Definicion termino="Reproducción sexual">
        Generación de un nuevo individuo a partir de la fusión de 2 gametos
        haploides (n=23). El cigoto resultante es diploide (2n=46).
      </Definicion>

      <Conexion>
        Necesitas dominar: meiosis (Biología-3), genética (Biología-4),
        endocrino (Medicina-6). El sistema reproductor está regulado por las
        hormonas hipofisarias FSH y LH.
      </Conexion>

      <Mnemotecnia>
        <strong>"Mitosis para crecer; meiosis para reproducirse."</strong>
        Solo los gametos pasan por meiosis.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscMasculino() {
  return (
    <EscenaRica>
      <Titulo>Aparato reproductor masculino</Titulo>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Órganos masculinos
          </text>
          {[
            { t: "Testículos (2)", d: "espermatogénesis + testosterona. En escroto (2-3°C menos)" },
            { t: "Epidídimo", d: "maduración y almacenamiento de espermatozoides" },
            { t: "Conducto deferente", d: "conduce esperma del epidídimo a uretra" },
            { t: "Vesículas seminales", d: "fluido nutritivo (fructosa para los espermatozoides)" },
            { t: "Próstata", d: "líquido alcalino (neutraliza acidez vaginal)" },
            { t: "Glándulas de Cowper", d: "lubrican la uretra antes de la eyaculación" },
            { t: "Pene", d: "órgano copulador. Uretra masculina = vía mixta urinaria + reproductora" },
          ].map((o, i) => (
            <g key={i} transform={`translate(80, ${45 + i * 28})`}>
              <rect width={580} height={24} fill={LIENZO.accent} opacity={0.08} stroke={LIENZO.accent} strokeWidth={1} rx={4} />
              <text x={15} y={16} fill={LIENZO.accent} fontSize={11} fontWeight={700}>{o.t}:</text>
              <text x={200} y={16} fill={LIENZO.fg} fontSize={11}>{o.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Espermatogénesis">
        Producción continua de espermatozoides en los testículos desde la
        pubertad. ~100 millones por día. Cada eyaculación: 200-300 millones.
        Duran 64-72 días de formación.
      </Definicion>

      <Mnemotecnia>
        <strong>"Testosterona = voz grave, vello facial, masa muscular,
        libido."</strong>
      </Mnemotecnia>

      <Cuidado>
        Los testículos están FUERA del cuerpo porque la espermatogénesis
        requiere 2-3 °C menos que la T corporal. Por eso el escroto se contrae
        con frío y se relaja con calor.
      </Cuidado>
    </EscenaRica>
  );
}

function EscFemenino() {
  return (
    <EscenaRica>
      <Titulo>Aparato reproductor femenino</Titulo>

      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 720 210" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Órganos femeninos
          </text>
          {[
            { t: "Ovarios (2)", d: "ovogénesis + estrógenos y progesterona" },
            { t: "Trompas de Falopio", d: "captan el óvulo. Aquí ocurre la fecundación" },
            { t: "Útero", d: "alberga al embrión. Endometrio se renueva cada mes" },
            { t: "Cuello uterino (cérvix)", d: "conexión útero-vagina" },
            { t: "Vagina", d: "canal del parto + órgano copulador" },
            { t: "Vulva (labios, clítoris)", d: "estructuras externas" },
          ].map((o, i) => (
            <g key={i} transform={`translate(80, ${45 + i * 27})`}>
              <rect width={580} height={23} fill="#ec4899" opacity={0.08} stroke="#ec4899" strokeWidth={1} rx={4} />
              <text x={15} y={15} fill="#ec4899" fontSize={11} fontWeight={700}>{o.t}:</text>
              <text x={210} y={15} fill={LIENZO.fg} fontSize={11}>{o.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Ovogénesis">
        A diferencia del varón, la mujer nace con TODOS sus óvulos (~1 millón
        de ovogonios). Solo ~400 madurarán a lo largo de la vida reproductiva
        (uno por mes desde la menarca hasta la menopausia).
      </Definicion>

      <Cuidado>
        La uretra femenina es INDEPENDIENTE de la vagina (sale por arriba
        del orificio vaginal). En el varón, uretra es mixta.
      </Cuidado>
    </EscenaRica>
  );
}

function EscCiclo() {
  return (
    <EscenaRica>
      <Titulo>Ciclo menstrual · 28 días en promedio</Titulo>

      <Definicion termino="Ciclo menstrual">
        Cambios cíclicos que preparan al útero para un eventual embarazo. Si
        no hay fecundación, se descama el endometrio = menstruación. Dura ~28
        días (rango 21-35).
      </Definicion>

      <Pizarra alto={250}>
        <svg width="100%" height="100%" viewBox="0 0 720 250" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            4 fases del ciclo
          </text>
          {[
            { x: 80, t: "Menstrual", d: "días 1-5", des: "descamación del endometrio", c: LIENZO.bad },
            { x: 235, t: "Folicular", d: "días 6-13", des: "FSH madura folículo; estrógenos suben", c: LIENZO.warn },
            { x: 390, t: "OVULACIÓN", d: "día 14", des: "LH dispara liberación del óvulo", c: LIENZO.ok },
            { x: 545, t: "Lútea", d: "días 15-28", des: "cuerpo lúteo → progesterona", c: "#a78bfa" },
          ].map((f, i) => (
            <g key={i} transform={`translate(${f.x}, 55)`}>
              <rect x={-10} y={0} width={145} height={130} fill={f.c} opacity={0.1} stroke={f.c} strokeWidth={1.5} rx={8} />
              <text x={62} y={22} textAnchor="middle" fill={f.c} fontSize={12} fontWeight={700}>{f.t}</text>
              <text x={62} y={42} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{f.d}</text>
              <text x={62} y={75} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{f.des.split(";")[0]}</text>
              {f.des.split(";")[1] && (
                <text x={62} y={92} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{f.des.split(";")[1]}</text>
              )}
            </g>
          ))}
          <text x={360} y={210} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            Eje hipotálamo (GnRH) → hipófisis (FSH, LH) → ovarios (estrógeno, progesterona)
          </text>
          <text x={360} y={230} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={600}>
            Si hay fecundación: el cuerpo lúteo persiste y la menstruación NO ocurre
          </text>
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"FSH = folículo madura. LH = libera (ovulación). Progesterona
        = prepara el útero."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscFecundacion() {
  return (
    <EscenaRica>
      <Titulo>Fecundación y desarrollo embrionario</Titulo>

      <Definicion termino="Fecundación">
        Unión del óvulo + espermatozoide en las trompas de Falopio. Forma el
        CIGOTO (2n=46). De ~300 millones de espermatozoides, solo UNO
        fecunda. El sexo del bebé lo determina el cromosoma del padre (X = niña;
        Y = varón).
      </Definicion>

      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 720 220" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Etapas del desarrollo
          </text>
          {[
            { x: 80, t: "Cigoto", d: "1 célula", c: "#dc2626" },
            { x: 200, t: "Mórula", d: "16 células (sin diferenciar)", c: LIENZO.warn },
            { x: 350, t: "Blástula", d: "esfera hueca", c: LIENZO.ok },
            { x: 480, t: "Gástrula", d: "3 capas: ecto/meso/endodermo", c: LIENZO.accent },
            { x: 620, t: "Embrión", d: "órganos en formación", c: "#a78bfa" },
          ].map((e, i) => (
            <g key={i} transform={`translate(${e.x - 50}, 55)`}>
              <circle cx={50} cy={40} r={30} fill={e.c} opacity={0.3} stroke={e.c} strokeWidth={2} />
              <text x={50} y={45} textAnchor="middle" fill={e.c} fontSize={11} fontWeight={700}>{e.t}</text>
              <text x={50} y={90} textAnchor="middle" fill={LIENZO.fg} fontSize={10}>{e.d}</text>
            </g>
          ))}
          <text x={360} y={180} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11} fontStyle="italic">
            Las 3 capas (gástrula) darán origen a TODOS los tejidos
          </text>
          <text x={360} y={200} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>
            <tspan fill={LIENZO.accent} fontWeight={600}>Ectodermo</tspan>: piel, SN ·
            <tspan fill={LIENZO.ok} fontWeight={600}> Mesodermo</tspan>: huesos, corazón ·
            <tspan fill={LIENZO.warn} fontWeight={600}> Endodermo</tspan>: digestivo, pulmón
          </text>
        </svg>
      </Pizarra>

      <Definicion termino="3 trimestres del embarazo">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>1° (semanas 1-12):</strong> embriogénesis, órganos
            principales. Es la más vulnerable a teratógenos (alcohol, drogas,
            virus).</li>
          <li><strong>2° (semanas 13-26):</strong> crecimiento, sentidos.</li>
          <li><strong>3° (semanas 27-40):</strong> maduración pulmonar, ganancia de peso. Parto a término ~40 semanas.</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'La fecundación ocurre en el útero'">
        <strong>Realidad:</strong> NO. Ocurre en las TROMPAS de Falopio.
        Después el cigoto migra y se implanta en el útero.
      </Misconception>

      <Misconception titulo="Error 2 · 'El sexo lo determina la madre'">
        <strong>Realidad:</strong> el PADRE. La madre siempre aporta un X.
        El padre aporta X (niña) o Y (varón).
      </Misconception>

      <Misconception titulo="Error 3 · 'La menstruación es la sangre acumulada del mes'">
        <strong>Realidad:</strong> es la descamación del ENDOMETRIO (capa
        interna del útero) que se preparó para un embrión que no llegó.
      </Misconception>

      <Resumen>
        Masculino: testículos (esperma + testosterona), conductos, glándulas
        (vesícula, próstata), pene. Femenino: ovarios (óvulos + estrógeno/
        progesterona), trompas, útero, vagina, vulva. Ciclo de 28 días con
        4 fases. Fecundación en trompas → cigoto → mórula → blástula →
        gástrula → embrión.
      </Resumen>

      <AutoCheck
        pregunta="¿Dónde ocurre normalmente la fecundación?"
        opciones={["útero", "vagina", "trompas de Falopio", "ovarios"]}
        correctaIdx={2}
        explicacion="En las trompas. El cigoto migra al útero para implantarse."
      />

      <AutoCheck
        pregunta="¿Qué hormona dispara la ovulación?"
        opciones={["FSH", "LH", "progesterona", "estrógeno"]}
        correctaIdx={1}
        explicacion="El pico de LH (día 14 aprox) libera el óvulo del folículo maduro."
      />

      <AutoCheck
        pregunta="¿Cuántos cromosomas tiene un cigoto humano?"
        opciones={["23", "46", "92", "44"]}
        correctaIdx={1}
        explicacion="2n = 46. Recibe 23 del óvulo + 23 del espermatozoide."
      />

      <AutoCheck
        pregunta="¿Qué capa embrionaria forma el sistema nervioso?"
        opciones={["endodermo", "mesodermo", "ectodermo", "ninguna"]}
        correctaIdx={2}
        explicacion="Ectodermo → piel y sistema nervioso. Meso → huesos, corazón. Endo → digestivo, pulmón."
      />
    </EscenaRica>
  );
}
