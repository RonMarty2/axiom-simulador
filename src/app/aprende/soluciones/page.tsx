"use client";

import { useState, useMemo } from "react";
import LeccionShell from "../_components/LeccionShell";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="QUI-09"
      tituloUnidad="Soluciones · Unidades de concentración"
      escenas={[
        { titulo: "¿Qué es una solución?", componente: EscIntro },
        { titulo: "Soluto y solvente · vocabulario", componente: EscSolutoSolvente },
        { titulo: "% en masa", componente: EscPorMasa },
        { titulo: "% en volumen y m/V", componente: EscPorVolumen },
        { titulo: "Molaridad (M)", componente: EscMolaridad },
        { titulo: "Simulador · preparar molaridad", componente: EscSimulador },
        { titulo: "Molalidad (m)", componente: EscMolalidad },
        { titulo: "Fracción molar y partes por millón", componente: EscOtras },
        { titulo: "Diluciones · M₁V₁ = M₂V₂", componente: EscDiluciones },
        { titulo: "Problemas tipo examen", componente: EscExamen },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Soluciones · mezclas homogéneas</Titulo>

      <Hook>
        El suero fisiológico que te ponen en el hospital es una solución: NaCl
        disuelto en agua, exactamente al 0.9%. Si la concentración no es la
        correcta, puedes morir. Así de importante es saber medir soluciones.
      </Hook>

      <Definicion termino="Solución">
        Mezcla HOMOGÉNEA de dos o más sustancias en una sola fase. Las
        partículas no se distinguen a simple vista ni con microscopio óptico.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Tipos de mezclas según tamaño de partícula
          </text>
          {[
            { x: 90, t: "Solución", sub: "< 1 nm", c: LIENZO.ok, ej: "agua con sal" },
            { x: 290, t: "Coloide", sub: "1–1000 nm", c: LIENZO.warn, ej: "leche, niebla" },
            { x: 490, t: "Suspensión", sub: "> 1000 nm", c: LIENZO.bad, ej: "arena en agua" },
          ].map((m, i) => (
            <g key={i} transform={`translate(${m.x}, 50)`}>
              <rect x={-10} y={0} width={180} height={100} fill={m.c} opacity={0.08} stroke={m.c} strokeWidth={1.5} rx={10} />
              <text x={80} y={25} textAnchor="middle" fill={m.c} fontSize={14} fontWeight={700}>{m.t}</text>
              <text x={80} y={48} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>{m.sub}</text>
              <text x={80} y={78} textAnchor="middle" fill={LIENZO.fg} fontSize={12} fontStyle="italic">{m.ej}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <Mnemotecnia>
        <strong>"Solución = se ve uniforme, no se separa, no se filtra."</strong>
        Lo demás (leche, jugo con pulpa, ríos turbios) son coloides o
        suspensiones.
      </Mnemotecnia>

      <Conexion>
        Necesitas dominar: moles (Unidad 5): toda la unidad gira alrededor de
        moles y masa.
      </Conexion>
    </EscenaRica>
  );
}

function EscSolutoSolvente() {
  return (
    <EscenaRica>
      <Titulo>Soluto y solvente · quién es quién</Titulo>

      <Definicion termino="Soluto (st)">
        La sustancia que se disuelve. Está en MENOR cantidad.
      </Definicion>

      <Definicion termino="Solvente (sv)">
        La sustancia que disuelve. Está en MAYOR cantidad. El más común: agua.
      </Definicion>

      <Definicion termino="Solución (sol)">
        Soluto + Solvente. Su masa total = masa_st + masa_sv.
      </Definicion>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Composición típica: 20 g de sal en 180 g de agua
          </text>
          <g transform="translate(180, 55)">
            <rect width={100} height={70} fill={LIENZO.bad} opacity={0.3} stroke={LIENZO.bad} strokeWidth={2} rx={6} />
            <text x={50} y={30} textAnchor="middle" fill={LIENZO.bad} fontSize={13} fontWeight={700}>SOLUTO</text>
            <text x={50} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>NaCl (sal)</text>
            <text x={50} y={62} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>20 g</text>
          </g>
          <text x={295} y={90} fontSize={20} fill={LIENZO.fg}>+</text>
          <g transform="translate(325, 55)">
            <rect width={130} height={70} fill={LIENZO.accent} opacity={0.3} stroke={LIENZO.accent} strokeWidth={2} rx={6} />
            <text x={65} y={30} textAnchor="middle" fill={LIENZO.accent} fontSize={13} fontWeight={700}>SOLVENTE</text>
            <text x={65} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>H₂O (agua)</text>
            <text x={65} y={62} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>180 g</text>
          </g>
          <text x={470} y={90} fontSize={20} fill={LIENZO.fg}>=</text>
          <g transform="translate(500, 55)">
            <rect width={130} height={70} fill={LIENZO.ok} opacity={0.3} stroke={LIENZO.ok} strokeWidth={2} rx={6} />
            <text x={65} y={30} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>SOLUCIÓN</text>
            <text x={65} y={48} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>agua salada</text>
            <text x={65} y={62} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>200 g</text>
          </g>
        </svg>
      </Pizarra>

      <Cuidado>
        <strong>masa_solución = masa_soluto + masa_solvente.</strong> Este es
        el error #1 del examen. Si te dan "se disuelven 20 g en 100 g de agua",
        la solución pesa 120 g, no 100.
      </Cuidado>
    </EscenaRica>
  );
}

function EscPorMasa() {
  return (
    <EscenaRica>
      <Titulo>% en masa (% m/m)</Titulo>

      <Definicion termino="Porcentaje en masa">
        Gramos de soluto por cada 100 g de solución.<br /><br />
        <strong>%m/m = (masa_st / masa_sol) × 100</strong>
      </Definicion>

      <WorkedExample titulo="¿Qué % m/m hay en una solución de 20 g de NaCl en 80 g de agua?">
        masa_sol = 20 + 80 = 100 g<br />
        %m/m = (20 / 100) × 100 = <strong>20% m/m</strong>
      </WorkedExample>

      <WorkedExample titulo="¿Cuánto NaCl hay en 250 g de solución al 5% m/m?">
        masa_st = masa_sol × (%/100)<br />
        masa_st = 250 × 0.05 = <strong>12.5 g NaCl</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>"% es por 100"</strong>: divide la masa del soluto entre la
        masa TOTAL (no el solvente solo), y multiplica por 100.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscPorVolumen() {
  return (
    <EscenaRica>
      <Titulo>% en volumen (% V/V) y masa/volumen (% m/V)</Titulo>

      <Definicion termino="% V/V (volumen/volumen)">
        Usado para mezclas de líquidos (alcohol-agua, vinagre).<br /><br />
        <strong>%V/V = (V_st / V_sol) × 100</strong>
      </Definicion>

      <Definicion termino="% m/V (masa/volumen)">
        Muy común en suero, medicina y laboratorio. Cuidado con las unidades:
        masa en GRAMOS, volumen en MILILITROS.<br /><br />
        <strong>%m/V = (masa_st [g] / V_sol [mL]) × 100</strong>
      </Definicion>

      <WorkedExample titulo="Vino con 12% V/V. ¿Cuánto alcohol puro hay en 750 mL?">
        V_alcohol = 750 × 0.12 = <strong>90 mL de etanol puro</strong>
      </WorkedExample>

      <WorkedExample titulo="Suero fisiológico 0.9% m/V. ¿Cuánto NaCl hay en 500 mL?">
        masa_st = V × (%/100) = 500 × 0.009 = <strong>4.5 g NaCl</strong>
      </WorkedExample>

      <Cuidado>
        Solo en % m/V se mezclan unidades (g y mL). Es una convención de
        farmacopea. Si te dan kg y L, convierte primero.
      </Cuidado>
    </EscenaRica>
  );
}

function EscMolaridad() {
  return (
    <EscenaRica>
      <Titulo>Molaridad (M) · la más usada en laboratorio</Titulo>

      <Hook>
        Cuando un químico dice "una solución 2 molar de HCl", el oyente
        entiende exactamente cuánto HCl hay en cada litro. La molaridad es el
        idioma común del laboratorio.
      </Hook>

      <Definicion termino="Molaridad">
        Moles de soluto por LITRO de solución.<br /><br />
        <strong>M = n_st / V_sol [L]</strong><br />
        Unidad: mol/L (también escrito "molar" o "M").
      </Definicion>

      <Pizarra alto={160}>
        <svg width="100%" height="100%" viewBox="0 0 720 160" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Receta para preparar 1 L de solución 2 M de NaCl
          </text>
          {[
            { x: 100, t1: "1. Calcular", t2: "n = 2 × 1 = 2 mol", c: LIENZO.accent },
            { x: 290, t1: "2. Pasar a g", t2: "m = 2 × 58.5 = 117 g", c: LIENZO.ok },
            { x: 480, t1: "3. Disolver", t2: "en poca agua, aforar a 1 L", c: LIENZO.warn },
          ].map((p, i) => (
            <g key={i} transform={`translate(${p.x}, 55)`}>
              <rect x={-10} y={0} width={180} height={80} fill={p.c} opacity={0.08} stroke={p.c} strokeWidth={1.5} rx={10} />
              <text x={80} y={25} textAnchor="middle" fill={p.c} fontSize={12} fontWeight={700}>{p.t1}</text>
              <text x={80} y={50} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>{p.t2}</text>
            </g>
          ))}
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿Qué M es una solución con 4 g de NaOH en 250 mL? (Na=23, O=16, H=1)">
        M(NaOH) = 23+16+1 = 40 g/mol<br />
        n = 4/40 = 0.1 mol<br />
        V = 250 mL = 0.25 L<br />
        M = 0.1 / 0.25 = <strong>0.4 M</strong>
      </WorkedExample>

      <WorkedExample titulo="¿Cuántos g de KCl hay en 500 mL de solución 0.3 M? (K=39, Cl=35.5)">
        M(KCl) = 39 + 35.5 = 74.5 g/mol<br />
        n = M × V = 0.3 × 0.5 = 0.15 mol<br />
        masa = 0.15 × 74.5 = <strong>11.18 g KCl</strong>
      </WorkedExample>

      <Mnemotecnia>
        <strong>"M = moles entre litros"</strong>. Lo único delicado: el
        VOLUMEN es de la SOLUCIÓN total (no del solvente solo) y siempre en L.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSimulador() {
  const [gSoluto, setGSoluto] = useState(40);
  const [VmL, setVmL] = useState(500);
  const [M_compuesto, setMCompuesto] = useState(40); // NaOH = 40
  const compuestos = [
    { nom: "NaOH", M: 40 },
    { nom: "NaCl", M: 58.5 },
    { nom: "KCl", M: 74.5 },
    { nom: "CaCO₃", M: 100 },
    { nom: "H₂SO₄", M: 98 },
  ];
  const mol = gSoluto / M_compuesto;
  const Vlitros = VmL / 1000;
  const molaridad = mol / Vlitros;

  return (
    <EscenaRica>
      <Titulo>Simulador · preparar molaridad</Titulo>

      <Parrafo>
        Elige un compuesto, su masa y el volumen final. El simulador calcula la
        molaridad y los pasos para prepararla.
      </Parrafo>

      <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, color: "#e2e8f0", maxWidth: 620, width: "100%" }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600, fontSize: 13 }}>
            Compuesto:
          </label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {compuestos.map((c) => (
              <button
                key={c.nom}
                onClick={() => setMCompuesto(c.M)}
                style={{
                  padding: "6px 12px",
                  background: M_compuesto === c.M ? "#a78bfa" : "#1e293b",
                  color: M_compuesto === c.M ? "#0f172a" : "#cbd5e1",
                  border: "1px solid #475569",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {c.nom} ({c.M})
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4, color: "#10b981" }}>
            Masa soluto: {gSoluto} g
          </label>
          <input type="range" min={1} max={200} step={1} value={gSoluto}
            onChange={(e) => setGSoluto(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#10b981" }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 4, color: "#f59e0b" }}>
            Volumen solución: {VmL} mL = {Vlitros.toFixed(2)} L
          </label>
          <input type="range" min={50} max={2000} step={50} value={VmL}
            onChange={(e) => setVmL(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#f59e0b" }} />
        </div>

        <div style={{ padding: 14, background: "#1e293b", borderRadius: 8, textAlign: "center", border: "2px solid #60a5fa" }}>
          <div style={{ fontSize: 11, opacity: 0.7 }}>
            n = {gSoluto} / {M_compuesto} = {mol.toFixed(3)} mol
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#60a5fa", marginTop: 4, fontFamily: "var(--font-crimson), serif" }}>
            M = {molaridad.toFixed(3)} mol/L
          </div>
        </div>
      </div>

      <Cuidado>
        Verifica los extremos: si duplicas los gramos, M se duplica. Si
        duplicas el volumen, M se reduce a la mitad. Es proporcionalidad
        directa con n e inversa con V.
      </Cuidado>
    </EscenaRica>
  );
}

function EscMolalidad() {
  return (
    <EscenaRica>
      <Titulo>Molalidad (m) · independiente de la temperatura</Titulo>

      <Definicion termino="Molalidad">
        Moles de soluto por KILOGRAMO de SOLVENTE (no de solución).<br /><br />
        <strong>m = n_st / kg_sv</strong><br />
        Unidad: mol/kg (también escrito "m" o "molal").
      </Definicion>

      <Cuidado>
        <strong>Molaridad ≠ Molalidad.</strong> M usa volumen de solución;
        m usa MASA de solvente. La molalidad se usa cuando hay cambios de
        temperatura (propiedades coligativas, próxima unidad).
      </Cuidado>

      <Pizarra alto={170}>
        <svg width="100%" height="100%" viewBox="0 0 720 170" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Diferencias clave M vs m
          </text>
          <g transform="translate(80, 55)">
            <rect width={260} height={90} fill={LIENZO.accent} opacity={0.1} stroke={LIENZO.accent} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.accent} fontSize={14} fontWeight={700}>Molaridad (M)</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={12}>mol / L de SOLUCIÓN</text>
            <text x={130} y={62} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>cambia con T (V se expande)</text>
            <text x={130} y={80} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>uso en labs y exámenes</text>
          </g>
          <g transform="translate(380, 55)">
            <rect width={260} height={90} fill={LIENZO.ok} opacity={0.1} stroke={LIENZO.ok} strokeWidth={1.5} rx={10} />
            <text x={130} y={22} textAnchor="middle" fill={LIENZO.ok} fontSize={14} fontWeight={700}>Molalidad (m)</text>
            <text x={130} y={45} textAnchor="middle" fill={LIENZO.fg} fontSize={12}>mol / kg de SOLVENTE</text>
            <text x={130} y={62} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>NO cambia con T</text>
            <text x={130} y={80} textAnchor="middle" fill={LIENZO.fgDim} fontSize={11}>propiedades coligativas</text>
          </g>
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿Qué m tiene 18 g de glucosa (C₆H₁₂O₆) en 250 g de agua? (M=180)">
        n = 18/180 = 0.1 mol<br />
        kg_sv = 250 g = 0.25 kg<br />
        m = 0.1 / 0.25 = <strong>0.4 m</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscOtras() {
  return (
    <EscenaRica>
      <Titulo>Fracción molar (x) y partes por millón (ppm)</Titulo>

      <Definicion termino="Fracción molar (x)">
        Proporción molar de un componente respecto al total. Sin unidades.<br /><br />
        <strong>x_i = n_i / n_total</strong><br />
        Siempre: x_st + x_sv = 1.
      </Definicion>

      <Definicion termino="Partes por millón (ppm)">
        Para soluciones MUY diluidas (contaminantes, minerales en agua).<br /><br />
        <strong>ppm = (mg de soluto / kg de solución) = (mg / L) en agua</strong>
      </Definicion>

      <WorkedExample titulo="Mezcla de 18 g H₂O + 92 g etanol (C₂H₅OH, M=46). ¿Fracción molar del etanol?">
        n(H₂O) = 18/18 = 1 mol<br />
        n(etanol) = 92/46 = 2 mol<br />
        n_total = 3 mol<br />
        x(etanol) = 2/3 = <strong>0.667</strong>
      </WorkedExample>

      <WorkedExample titulo="Agua de pozo con 0.005 g de plomo en 1 L. ¿Cuántos ppm?">
        En agua: 1 L ≈ 1 kg ≈ 1000 g.<br />
        0.005 g = 5 mg<br />
        ppm = 5 mg/L = <strong>5 ppm</strong> (alta, supera el máximo OMS de 0.01 ppm)
      </WorkedExample>

      <Mnemotecnia>
        <strong>"ppm = mg por L"</strong> en soluciones acuosas diluidas. Para
        ppb (partes por billón), todavía más diluido.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscDiluciones() {
  return (
    <EscenaRica>
      <Titulo>Diluciones · M₁V₁ = M₂V₂</Titulo>

      <Hook>
        En el laboratorio nunca se prepara una solución desde cero. Se compran
        ácidos concentrados y se diluyen. ¿Cuánta agua agregar? Una ecuación.
      </Hook>

      <Definicion termino="Principio de dilución">
        Al agregar solvente, los moles de soluto NO CAMBIAN, solo cambia el
        volumen total.<br /><br />
        <strong>M₁ · V₁ = M₂ · V₂</strong><br />
        n se conserva (n = M·V en cada lado).
      </Definicion>

      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 720 180" preserveAspectRatio="xMidYMid meet">
          <text x={360} y={25} textAnchor="middle" fill={LIENZO.fg} fontSize={14} fontWeight={700}>
            Diluir: agregar solvente, no soluto
          </text>
          <g transform="translate(120, 60)">
            <rect width={120} height={100} fill={LIENZO.bad} opacity={0.4} stroke={LIENZO.bad} strokeWidth={2} rx={6} />
            <text x={60} y={30} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={700}>CONCENTRADA</text>
            <text x={60} y={52} textAnchor="middle" fill="#fff" fontSize={11}>V₁ = 100 mL</text>
            <text x={60} y={70} textAnchor="middle" fill="#fff" fontSize={11}>M₁ = 6 M</text>
            <text x={60} y={88} textAnchor="middle" fill="#fff" fontSize={11}>n = 0.6 mol</text>
          </g>
          <text x={270} y={110} fontSize={28} fill={LIENZO.fg}>→</text>
          <g transform="translate(330, 50)">
            <rect width={220} height={110} fill={LIENZO.ok} opacity={0.25} stroke={LIENZO.ok} strokeWidth={2} rx={6} />
            <text x={110} y={30} textAnchor="middle" fill={LIENZO.ok} fontSize={13} fontWeight={700}>DILUIDA</text>
            <text x={110} y={55} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>V₂ = 600 mL</text>
            <text x={110} y={73} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>M₂ = 1 M</text>
            <text x={110} y={91} textAnchor="middle" fill={LIENZO.fg} fontSize={11}>n = 0.6 mol (¡el mismo!)</text>
          </g>
        </svg>
      </Pizarra>

      <WorkedExample titulo="¿Cuánta HCl concentrada (12 M) necesitas para 500 mL de 2 M?">
        M₁V₁ = M₂V₂<br />
        (12)(V₁) = (2)(500)<br />
        V₁ = 1000/12 = <strong>83.3 mL</strong> (de la concentrada)<br />
        Luego completar con agua hasta 500 mL.
      </WorkedExample>

      <Paso n={1}>Identifica M₁, V₁ (lo concentrado) y M₂, V₂ (lo diluido).</Paso>
      <Paso n={2}>Aplica M₁V₁ = M₂V₂ y despeja la incógnita.</Paso>
      <Paso n={3}>Toma V₁ de la concentrada y completa con SOLVENTE (no soluto).</Paso>

      <Cuidado>
        <strong>NUNCA agregues agua al ácido concentrado.</strong> Siempre el
        ácido al agua, despacio y agitando. El calor de dilución puede salpicar
        y quemar (regla "ARDA": Ácido a la Agua, Despacito y Agitando).
      </Cuidado>
    </EscenaRica>
  );
}

function EscExamen() {
  return (
    <EscenaRica>
      <Titulo>Problemas tipo examen FCyT UMSS</Titulo>

      <WorkedExample titulo="EXAMEN: solución 15% m/m de NaCl en 400 g de agua. ¿Masa de NaCl?">
        Sea x = masa de NaCl. masa_sol = x + 400.<br />
        15 = (x / (x+400)) × 100<br />
        0.15(x+400) = x → 60 = 0.85x → x = <strong>70.6 g NaCl</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: 250 mL de NaOH 0.5 M. ¿Cuántos g se pesan? (Na=23, O=16, H=1)">
        M(NaOH) = 40 g/mol<br />
        n = M × V = 0.5 × 0.25 = 0.125 mol<br />
        masa = 0.125 × 40 = <strong>5 g NaOH</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: ¿Cuánto H₂SO₄ 18 M se diluye para tener 2 L de H₂SO₄ 3 M?">
        M₁V₁ = M₂V₂<br />
        (18)(V₁) = (3)(2)<br />
        V₁ = 6/18 = <strong>0.333 L = 333 mL</strong>
      </WorkedExample>

      <WorkedExample titulo="EXAMEN: 9 g de glucosa (M=180) en 500 g de agua. ¿Molalidad?">
        n = 9/180 = 0.05 mol<br />
        kg_sv = 0.5 kg<br />
        m = 0.05/0.5 = <strong>0.1 m</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  return (
    <EscenaRica>
      <Titulo>Errores comunes y práctica</Titulo>

      <Misconception titulo="Error 1 · Confundir masa de solución con masa de solvente">
        <strong>Pensar:</strong> que masa_sol = masa_sv.<br />
        <strong>Realidad:</strong> masa_sol = masa_st + masa_sv. Si te dan
        "X g de sal en 100 g de agua", la solución pesa X + 100.
      </Misconception>

      <Misconception titulo="Error 2 · Olvidar el aforo en molaridad">
        <strong>Pensar:</strong> que el volumen de la solución es igual al
        volumen del solvente que agregas.<br />
        <strong>Realidad:</strong> "aforar a 1 L" significa llegar hasta la
        marca de 1 L una vez disuelto el soluto. El soluto desplaza volumen.
      </Misconception>

      <Misconception titulo="Error 3 · Confundir M con m">
        <strong>Pensar:</strong> que molaridad y molalidad son lo mismo.<br />
        <strong>Realidad:</strong> M usa V_sol (en L); m usa masa_sv (en kg).
        Son muy distintas.
      </Misconception>

      <Misconception titulo="Error 4 · ppm en solventes no acuosos">
        <strong>Pensar:</strong> que ppm siempre es mg/L.<br />
        <strong>Realidad:</strong> ppm es mg/kg de SOLUCIÓN. Solo en agua
        coincide con mg/L (porque d_agua ≈ 1 kg/L).
      </Misconception>

      <Resumen>
        Soluciones = mezclas homogéneas. % m/m, % V/V, % m/V para porcentajes.
        Molaridad (mol/L_sol) para lab. Molalidad (mol/kg_sv) cuando T varía.
        Diluciones: M₁V₁ = M₂V₂.
      </Resumen>

      <AutoCheck
        pregunta="¿Qué % m/m tiene 25 g de azúcar disueltos en 75 g de agua?"
        opciones={["33%", "25%", "50%", "75%"]}
        correctaIdx={1}
        explicacion="masa_sol = 25 + 75 = 100 g. %m/m = (25/100)×100 = 25%."
      />

      <AutoCheck
        pregunta="¿Cuántos g de NaCl hay en 1 L de solución 2 M? (NaCl = 58.5)"
        opciones={["58.5 g", "29.25 g", "117 g", "234 g"]}
        correctaIdx={2}
        explicacion="n = M×V = 2×1 = 2 mol. masa = 2 × 58.5 = 117 g."
      />

      <AutoCheck
        pregunta="Si dilues 50 mL de HCl 6 M hasta 300 mL, ¿qué M final?"
        opciones={["6 M", "0.5 M", "1 M", "2 M"]}
        correctaIdx={2}
        explicacion="M₁V₁ = M₂V₂ → M₂ = (6×50)/300 = 1 M."
      />

      <AutoCheck
        pregunta="¿Qué x_st tiene una solución de 36 g de glucosa (M=180) en 90 g de agua (M=18)?"
        opciones={["0.20", "0.04", "0.10", "0.40"]}
        correctaIdx={1}
        explicacion="n_st = 36/180 = 0.2; n_sv = 90/18 = 5; x_st = 0.2/(0.2+5) = 0.038 ≈ 0.04."
      />

      <AutoCheck
        pregunta="Una muestra de agua tiene 25 mg de fluoruro en 5 L. ¿Cuántos ppm?"
        opciones={["5 ppm", "25 ppm", "0.005 ppm", "125 ppm"]}
        correctaIdx={0}
        explicacion="ppm = mg/L = 25/5 = 5 ppm."
      />
    </EscenaRica>
  );
}
