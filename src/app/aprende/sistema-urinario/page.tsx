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
      unidad="MED-11"
      tituloUnidad="Sistema urinario · Filtración y excreción"
      escenas={[
        { titulo: "Función excretora · panorama", componente: EscIntro },
        { titulo: "Órganos del sistema urinario", componente: EscOrganos },
        { titulo: "Nefrona · unidad funcional", componente: EscNefrona },
        { titulo: "Formación de la orina · 3 procesos", componente: EscFormacion },
        { titulo: "Composición de la orina", componente: EscComposicion },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Sistema urinario · el "filtro" del cuerpo</Titulo>

      <Hook>
        Tus riñones filtran ~180 litros de sangre por día. De eso, solo 1.5 L
        se vuelven orina; el resto se reabsorbe. Si tus riñones se detienen,
        morís en pocos días por intoxicación (urea, K⁺, etc.).
      </Hook>

      <Definicion termino="Sistema urinario">
        Filtra la sangre, elimina desechos metabólicos y regula:
        <ul style={{ margin: "4px 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>Volumen y composición de líquidos corporales.</li>
          <li>pH sanguíneo (acidosis/alcalosis).</li>
          <li>Presión arterial (vía renina).</li>
          <li>Producción de eritrocitos (eritropoyetina, EPO).</li>
        </ul>
      </Definicion>

      <Conexion>
        Trabaja con el cardiovascular: filtra sangre. Con endocrino: ADH
        regula reabsorción de agua. Pulmón también excreta (CO₂); piel también
        (sudor). El riñón es el filtro principal.
      </Conexion>
    </EscenaRica>
  );
}

function EscOrganos() {
  return (
    <EscenaRica>
      <Titulo>4 órganos · de filtro a salida</Titulo>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Camino de la orina
          </text>
          {[
            { t: "Riñones (2)", d: "filtran sangre, producen orina (~150 g cada uno, forma de poroto)", c: "#dc2626" },
            { t: "Uréteres (2)", d: "tubos que llevan la orina del riñón a la vejiga (~25 cm)", c: "#f59e0b" },
            { t: "Vejiga", d: "saco muscular que almacena orina (capacidad ~400 mL)", c: "#a78bfa" },
            { t: "Uretra", d: "conduce la orina al exterior (3–5 cm mujer, 20 cm varón)", c: "#06b6d4" },
          ].map((o, i) => (
            <g key={i} transform={`translate(80, ${55 + i * 40})`}>
              <rect width={580} height={34} fill={o.c} opacity={0.15} stroke={o.c} strokeWidth={1.5} rx={6} />
              <text x={15} y={22} fill={o.c} fontSize={12} fontWeight={700}>{i + 1}. {o.t}</text>
              <text x={200} y={22} fill={LIENZO.fg} fontSize={11}>{o.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Definicion termino="Riñón · estructura interna">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Corteza:</strong> capa externa, contiene glomérulos.</li>
          <li><strong>Médula:</strong> capa interna, con pirámides renales.</li>
          <li><strong>Pelvis renal:</strong> recoge la orina hacia el uréter.</li>
        </ul>
      </Definicion>

      <Cuidado>
        La uretra del varón es mucho más larga y pasa por la próstata. En
        adultos mayores, la próstata se agranda (HBP) → dificulta la micción.
        En mujeres, la uretra es corta → más infecciones urinarias (cistitis).
      </Cuidado>
    </EscenaRica>
  );
}

function EscNefrona() {
  return (
    <EscenaRica>
      <Titulo>Nefrona · unidad funcional del riñón</Titulo>

      <Definicion termino="Nefrona">
        Unidad microscópica que filtra la sangre. Cada riñón tiene ~1 millón.
        Si las pusieras en línea: 80 km.
      </Definicion>

      <Pizarra alto={260}>
        <svg width="100%" height="100%" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Partes de la nefrona
          </text>
          {/* Corpúsculo */}
          <g transform="translate(120, 60)">
            <circle r={35} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={2} />
            <text textAnchor="middle" dy={-5} fill={LIENZO.bad} fontSize={10} fontWeight={700}>Corpúsculo</text>
            <text textAnchor="middle" dy={8} fill={LIENZO.bad} fontSize={10}>(glomérulo</text>
            <text textAnchor="middle" dy={20} fill={LIENZO.bad} fontSize={10}>+ cápsula)</text>
          </g>

          {/* Tubo contorneado proximal */}
          <path d="M 155 80 Q 200 120 250 100 Q 290 85 320 110" fill="none" stroke={LIENZO.warn} strokeWidth={4} />
          <text x={250} y={75} textAnchor="middle" fill={LIENZO.warn} fontSize={11} fontWeight={600}>TCP</text>

          {/* Asa de Henle */}
          <path d="M 320 110 L 420 220 L 470 110" fill="none" stroke={LIENZO.ok} strokeWidth={4} />
          <text x={395} y={195} textAnchor="middle" fill={LIENZO.ok} fontSize={11} fontWeight={600}>Asa de Henle</text>

          {/* Tubo contorneado distal */}
          <path d="M 470 110 Q 510 130 540 105 Q 580 85 600 110" fill="none" stroke={LIENZO.accent} strokeWidth={4} />
          <text x={550} y={75} textAnchor="middle" fill={LIENZO.accent} fontSize={11} fontWeight={600}>TCD</text>

          {/* Túbulo colector */}
          <line x1={600} y1={110} x2={650} y2={220} stroke="#06b6d4" strokeWidth={4} />
          <text x={640} y={200} textAnchor="middle" fill="#06b6d4" fontSize={11} fontWeight={600}>colector</text>
        </svg>
      </Pizarra>

      <Definicion termino="Partes">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>Glomérulo:</strong> ovillo de capilares donde se filtra.</li>
          <li><strong>Cápsula de Bowman:</strong> recoge el filtrado.</li>
          <li><strong>TCP (Túbulo contorneado proximal):</strong> reabsorbe la
            mayoría de Na⁺, glucosa, aa, agua.</li>
          <li><strong>Asa de Henle:</strong> concentra la orina (descenso pierde agua, ascenso pierde Na⁺).</li>
          <li><strong>TCD:</strong> ajuste fino (regulado por aldosterona y ADH).</li>
          <li><strong>Túbulo colector:</strong> reabsorción final de agua.</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscFormacion() {
  return (
    <EscenaRica>
      <Titulo>Formación de la orina · 3 procesos</Titulo>

      <Pizarra alto={230}>
        <svg width="100%" height="100%" viewBox="0 0 720 230" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={20} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            3 procesos secuenciales
          </text>
          {[
            { x: 90, t: "1. Filtración", lug: "glomérulo", d: "~180 L/día. Pasa todo menos eritrocitos y proteínas grandes", c: "#dc2626" },
            { x: 90, t: "2. Reabsorción", lug: "TCP, asa, TCD", d: "99% del filtrado vuelve a la sangre (agua, glucosa, sales)", c: LIENZO.ok, y: 100 },
            { x: 90, t: "3. Secreción", lug: "TCP, TCD", d: "el riñón vierte H⁺, K⁺, urea y fármacos a la orina", c: LIENZO.warn, y: 160 },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, ${p.y || 50})`}>
              <rect width={550} height={45} fill={p.c} opacity={0.1} stroke={p.c} strokeWidth={1.5} rx={6} />
              <text x={15} y={20} fill={p.c} fontSize={12} fontWeight={700}>{p.t}</text>
              <text x={15} y={36} fill={LIENZO.fgDim} fontSize={10}>en: {p.lug}</text>
              <text x={170} y={28} fill={LIENZO.fg} fontSize={11}>{p.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"F-R-S: Filtrás MUCHO, Reabsorbés CASI TODO, Secretás los
        sobrantes."</strong> De 180 L filtrados → 1.5 L de orina.
      </Mnemotecnia>

      <Definicion termino="Hormonas que regulan">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li><strong>ADH (vasopresina):</strong> hipófisis posterior →
            reabsorbe agua en colector. Si te deshidratás, la orina es escasa
            y concentrada.</li>
          <li><strong>Aldosterona:</strong> suprarrenal → reabsorbe Na⁺ y
            excreta K⁺.</li>
          <li><strong>Renina:</strong> riñón → activa angiotensina → sube
            presión.</li>
        </ul>
      </Definicion>
    </EscenaRica>
  );
}

function EscComposicion() {
  return (
    <EscenaRica>
      <Titulo>Composición y cambios de la orina</Titulo>

      <Definicion termino="Orina normal">
        <ul style={{ margin: "0 0 0 18px", padding: 0, fontSize: 14 }}>
          <li>95% agua.</li>
          <li>Urea (principal residuo nitrogenado).</li>
          <li>Ácido úrico, creatinina.</li>
          <li>Sales (NaCl, K⁺).</li>
          <li>Pigmentos (urocromo → color amarillo).</li>
        </ul>
      </Definicion>

      <Pizarra alto={190}>
        <svg width="100%" height="100%" viewBox="0 0 720 190" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            ¿Qué te dice la orina?
          </text>
          {[
            { x: 90, c: "#fef3c7", l: "Amarillo claro", d: "hidratado" },
            { x: 250, c: "#fbbf24", l: "Amarillo medio", d: "normal" },
            { x: 410, c: "#d97706", l: "Ámbar oscuro", d: "deshidratado" },
            { x: 570, c: "#dc2626", l: "Rojizo", d: "sangre (hematuria)" },
          ].map((c, i) => (
            <g key={i} transform={`translate(${c.x - 60}, 55)`}>
              <rect width={120} height={70} fill={c.c} opacity={0.8} stroke={LIENZO.fg} strokeWidth={1} rx={6} />
              <text x={60} y={92} textAnchor="middle" fill={LIENZO.fg} fontSize={11} fontWeight={600}>{c.l}</text>
              <text x={60} y={106} textAnchor="middle" fill={LIENZO.fgDim} fontSize={10}>{c.d}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>Glucosa en orina (glucosuria):</strong> diabetes no controlada.
        <strong> Proteínas (proteinuria):</strong> falla glomerular.
        <strong> Sangre (hematuria):</strong> cálculos, infección, tumor.
        El examen de orina es el primer paso en muchísimos diagnósticos.
      </Cuidado>

      <Mnemotecnia>
        <strong>"Orina amarilla = normal. Cristalina = mucha agua. Oscura =
        poca agua."</strong>
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · 'El riñón solo filtra'">
        <strong>Realidad:</strong> también REABSORBE (99% del filtrado) y
        SECRETA (sustancias tóxicas). Sin la reabsorción, te morirías
        deshidratado en horas.
      </Misconception>

      <Misconception titulo="Error 2 · 'La orina tiene glucosa normalmente'">
        <strong>Realidad:</strong> NO. La glucosa filtrada se REABSORBE
        completamente. Si aparece, significa glucemia muy alta (diabetes).
      </Misconception>

      <Misconception titulo="Error 3 · 'Tomar mucha agua daña el riñón'">
        <strong>Realidad:</strong> falso. Agua extra simplemente se elimina.
        Lo que daña son hipertensión, diabetes, exceso de sal, AINEs crónicos.
      </Misconception>

      <Resumen>
        Sistema urinario = 2 riñones + 2 uréteres + vejiga + uretra. La
        nefrona es la unidad funcional. 3 procesos: filtración (180 L/día),
        reabsorción (99%), secreción. Orina final = 1.5 L/día. Regulada por
        ADH, aldosterona, renina.
      </Resumen>

      <AutoCheck
        pregunta="¿Cuál es la unidad funcional del riñón?"
        opciones={["nefrona", "glomérulo", "uréter", "pelvis renal"]}
        correctaIdx={0}
        explicacion="Cada riñón tiene ~1 millón de nefronas."
      />

      <AutoCheck
        pregunta="¿Qué hormona reabsorbe agua en el túbulo colector?"
        opciones={["aldosterona", "ADH", "renina", "insulina"]}
        correctaIdx={1}
        explicacion="ADH (vasopresina) de la hipófisis posterior."
      />

      <AutoCheck
        pregunta="¿Qué porcentaje del filtrado se reabsorbe?"
        opciones={["50%", "70%", "90%", "99%"]}
        correctaIdx={3}
        explicacion="99%. De 180 L filtrados, solo 1.5 L salen como orina."
      />

      <AutoCheck
        pregunta="La presencia de glucosa en orina indica:"
        opciones={[
          "Hidratación normal",
          "Posible diabetes mellitus",
          "Infección renal",
          "Hipertensión",
        ]}
        correctaIdx={1}
        explicacion="Glucosuria sugiere glucemia alta que excedió la capacidad de reabsorción tubular."
      />
    </EscenaRica>
  );
}
