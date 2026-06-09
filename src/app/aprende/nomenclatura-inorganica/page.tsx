"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="QUI-02"
      tituloUnidad="Nomenclatura inorgánica"
      escenas={[
        { titulo: "Mapa de compuestos inorgánicos", componente: EscMapa },
        { titulo: "Números de oxidación", componente: EscOxidacion },
        { titulo: "Óxidos metálicos (básicos)", componente: EscOxidosM },
        { titulo: "Óxidos no metálicos (anhídridos)", componente: EscOxidosNM },
        { titulo: "Hidróxidos · óxido + agua", componente: EscHidroxidos },
        { titulo: "Ácidos · hidrácidos y oxácidos", componente: EscAcidos },
        { titulo: "Sales · ácido + base", componente: EscSales },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscMapa() {
  const [tipo, setTipo] = useState<"oxidoM" | "oxidoNM" | "hidroxido" | "hidracido" | "oxacido" | "sal">("oxidoM");
  const tipos = {
    oxidoM: { nombre: "Óxido metálico", formula: "M + O₂ → M_xO_y", ejemplo: "Na₂O · óxido de sodio", color: "#3b82f6" },
    oxidoNM: { nombre: "Óxido no metálico (anhídrido)", formula: "NM + O₂ → NM_xO_y", ejemplo: "CO₂ · anhídrido carbónico", color: "#8b5cf6" },
    hidroxido: { nombre: "Hidróxido", formula: "Óxido metálico + H₂O", ejemplo: "NaOH · hidróxido de sodio", color: "#10b981" },
    hidracido: { nombre: "Ácido hidrácido", formula: "H + No metal", ejemplo: "HCl · ácido clorhídrico", color: "#f59e0b" },
    oxacido: { nombre: "Ácido oxácido", formula: "Anhídrido + H₂O", ejemplo: "H₂SO₄ · ácido sulfúrico", color: "#ef4444" },
    sal: { nombre: "Sal", formula: "Ácido + Hidróxido", ejemplo: "NaCl · cloruro de sodio", color: "#ec4899" },
  };
  const t = tipos[tipo];

  return (
    <EscenaRica>
      <Titulo>Mapa de compuestos inorgánicos · explorador</Titulo>

      <Hook>
        La nomenclatura aparece en preguntas como Q4 PREU 2025 ("estructuras
        de Lewis") y Q15 1op 2005 ("nombre de Cr₂(SO₃)₃"). Memorizar el mapa
        de los 6 tipos de compuestos es la primera barrera de Química.
      </Hook>

      <Parrafo>
        Tocá los botones para ver cada tipo:
      </Parrafo>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 12 }}>
        {(Object.keys(tipos) as Array<keyof typeof tipos>).map((k) => (
          <button key={k} onClick={() => setTipo(k)}
            style={{
              padding: "6px 12px", fontSize: 12, borderRadius: 999, cursor: "pointer",
              fontWeight: 600, fontFamily: "var(--font-crimson), serif",
              background: tipo === k ? tipos[k].color : "transparent",
              color: tipo === k ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${tipo === k ? tipos[k].color : LIENZO.fgFaint}`,
            }}>
            {tipos[k].nombre}
          </button>
        ))}
      </div>

      <Pizarra alto={120}>
        <div style={{ textAlign: "center", fontFamily: "var(--font-crimson), serif" }}>
          <div style={{ fontSize: 22, color: t.color, fontWeight: 700, marginBottom: 8 }}>
            {t.nombre}
          </div>
          <div style={{ fontSize: 14, color: LIENZO.fgDim, marginBottom: 6 }}>
            Fórmula general: <strong>{t.formula}</strong>
          </div>
          <div style={{ fontSize: 16, color: t.color, fontWeight: 600 }}>
            Ej: {t.ejemplo}
          </div>
        </div>
      </Pizarra>

      <Resumen>
        <strong>Los 6 grupos clave de compuestos</strong>:<br />
        1. <strong>Óxido metálico</strong>: metal + oxígeno.<br />
        2. <strong>Óxido no metálico (anhídrido)</strong>: no metal + oxígeno.<br />
        3. <strong>Hidróxido</strong>: óxido metálico + agua.<br />
        4. <strong>Ácido hidrácido</strong>: hidrógeno + no metal.<br />
        5. <strong>Ácido oxácido</strong>: anhídrido + agua.<br />
        6. <strong>Sal</strong>: ácido + hidróxido (o metal).
      </Resumen>
    </EscenaRica>
  );
}

function EscOxidacion() {
  return (
    <EscenaRica>
      <Titulo>Números de oxidación · qué son</Titulo>

      <Definicion termino="Número de oxidación">
        Carga aparente que tendría un átomo en un compuesto si las cargas se
        distribuyeran de acuerdo a la electronegatividad. Sirve para nombrar
        y balancear.
      </Definicion>

      <Resumen>
        <strong>Reglas básicas</strong>:<br />
        — Elemento puro (Fe, O₂, H₂): número de oxidación = 0.<br />
        — Ion monoatómico (Na⁺, Cl⁻): igual a su carga.<br />
        — Hidrógeno: +1 (excepto en hidruros metálicos: −1).<br />
        — Oxígeno: −2 (excepto en peróxidos: −1, en OF₂: +2).<br />
        — Metales alcalinos (Li, Na, K…): +1 siempre.<br />
        — Metales alcalinotérreos (Mg, Ca…): +2 siempre.<br />
        — En un compuesto neutro: suma de oxidaciones = 0.<br />
        — En un ion poliatómico: suma = carga del ion.
      </Resumen>

      <WorkedExample titulo="Determinar oxidación de S en H₂SO₄">
        Sea x = oxidación del S.<br />
        2·(+1) + x + 4·(−2) = 0<br />
        2 + x − 8 = 0<br />
        x = <strong>+6</strong>.<br /><br />

        El azufre tiene oxidación +6 en H₂SO₄ (ácido sulfúrico).
      </WorkedExample>

      <Mnemotecnia>
        <strong>Oxidaciones más comunes a memorizar</strong>:<br />
        — Grupo IA: +1.<br />
        — Grupo IIA: +2.<br />
        — Grupo IIIA: +3 (Al, B, Ga).<br />
        — Grupo IVA: ±4 (C, Si).<br />
        — Grupo VA: ±3, +5 (N, P).<br />
        — Grupo VIA: −2, +4, +6 (S, Se).<br />
        — Grupo VIIA: −1, +1, +3, +5, +7 (Cl, Br, I).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscOxidosM() {
  return (
    <EscenaRica>
      <Titulo>Óxidos metálicos (básicos)</Titulo>

      <Resumen>
        <strong>Formación</strong>: metal + oxígeno → óxido metálico.<br />
        <strong>Fórmula general</strong>: M₂O_n donde n es la oxidación del metal.
      </Resumen>

      <Resumen>
        <strong>Nomenclatura (3 sistemas)</strong>:<br />
        1. <strong>IUPAC (stock)</strong>: óxido de [metal] ([oxidación en
        números romanos entre paréntesis]).<br />
        2. <strong>Tradicional</strong>: óxido [raíz del metal] + sufijo según
        oxidación (-oso menor, -ico mayor).<br />
        3. <strong>Sistemática</strong>: prefijos griegos para indicar cantidad
        de átomos (mono, di, tri).
      </Resumen>

      <Ejemplo titulo="Ejemplos">
        <strong>Na₂O</strong> (Na con oxidación +1):<br />
        — Stock: óxido de sodio.<br />
        — Tradicional: óxido de sodio.<br /><br />

        <strong>FeO</strong> (Fe con oxidación +2):<br />
        — Stock: óxido de hierro(II).<br />
        — Tradicional: óxido ferroso (sufijo -oso = oxidación menor).<br /><br />

        <strong>Fe₂O₃</strong> (Fe con oxidación +3):<br />
        — Stock: óxido de hierro(III).<br />
        — Tradicional: óxido férrico (sufijo -ico = oxidación mayor).
      </Ejemplo>

      <Mnemotecnia>
        <strong>Truco para escribir la fórmula</strong>:<br />
        Si el metal tiene oxidación +n, y el oxígeno es −2, intercambias los
        números:<br />
        M_2 O_n (si n es impar, M₂O_n; si n es par, simplificás).<br /><br />

        Ej: Fe con +3 → Fe₂O₃. Al con +3 → Al₂O₃. Ca con +2 → Ca₂O₂ → CaO
        (simplifica).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscOxidosNM() {
  return (
    <EscenaRica>
      <Titulo>Óxidos no metálicos (anhídridos)</Titulo>

      <Resumen>
        <strong>Formación</strong>: no metal + oxígeno → anhídrido.<br />
        Los nombres tradicionales usan "anhídrido [raíz NM] -oso/-ico" según
        oxidación. Los modernos usan prefijos griegos.
      </Resumen>

      <Ejemplo titulo="Ejemplos">
        <strong>CO₂</strong> (C con +4):<br />
        — Tradicional: anhídrido carbónico.<br />
        — Sistemática: dióxido de carbono.<br /><br />

        <strong>SO₃</strong> (S con +6):<br />
        — Tradicional: anhídrido sulfúrico.<br />
        — Sistemática: trióxido de azufre.<br /><br />

        <strong>SO₂</strong> (S con +4):<br />
        — Tradicional: anhídrido sulfuroso (sufijo -oso, oxidación menor).
      </Ejemplo>

      <Resumen>
        <strong>Para no metales con muchas oxidaciones (Cl, Br, I)</strong>:<br />
        — +1: hipo-[NM]-oso.<br />
        — +3: [NM]-oso.<br />
        — +5: [NM]-ico.<br />
        — +7: per-[NM]-ico.<br /><br />

        Ej (Cloro): Cl₂O (hipocloroso), Cl₂O₃ (cloroso), Cl₂O₅ (clórico),
        Cl₂O₇ (perclórico).
      </Resumen>
    </EscenaRica>
  );
}

function EscHidroxidos() {
  return (
    <EscenaRica>
      <Titulo>Hidróxidos · óxido metálico + agua</Titulo>

      <Resumen>
        <strong>Formación</strong>: M_xO_y + H₂O → M(OH)_n.<br />
        Contienen el grupo OH⁻ (hidroxilo). Son BASES.
      </Resumen>

      <Resumen>
        <strong>Fórmula</strong>: M(OH)_n donde n es la oxidación del metal.<br />
        <strong>Nombre</strong>: hidróxido de [metal] (+ oxidación si aplica).
      </Resumen>

      <Ejemplo titulo="Ejemplos">
        — <strong>NaOH</strong>: hidróxido de sodio (soda cáustica).<br />
        — <strong>Ca(OH)₂</strong>: hidróxido de calcio (cal apagada).<br />
        — <strong>Fe(OH)₃</strong>: hidróxido de hierro(III) o férrico.<br />
        — <strong>Al(OH)₃</strong>: hidróxido de aluminio.
      </Ejemplo>

      <PorQue>
        Los hidróxidos se forman cuando un óxido metálico se disuelve en agua:<br />
        Na₂O + H₂O → 2 NaOH.<br /><br />
        Por eso se llama "óxido básico": forma una base con el agua.
      </PorQue>
    </EscenaRica>
  );
}

function EscAcidos() {
  return (
    <EscenaRica>
      <Titulo>Ácidos · hidrácidos y oxácidos</Titulo>

      <Definicion termino="Hidrácido">
        Compuesto binario: hidrógeno + no metal (de grupos VIA o VIIA).<br />
        Fórmula: H_n[NM].<br /><br />
        Cuando se disuelve en agua: nombre "ácido [raíz NM]-hídrico". Si está
        puro (gas): nombre "[raíz NM]-uro de hidrógeno".
      </Definicion>

      <Ejemplo titulo="Hidrácidos típicos">
        — HCl: ácido clorhídrico (o cloruro de hidrógeno).<br />
        — H₂S: ácido sulfhídrico (o sulfuro de hidrógeno).<br />
        — HF: ácido fluorhídrico.<br />
        — HBr: ácido bromhídrico.<br />
        — HI: ácido yodhídrico.
      </Ejemplo>

      <Definicion termino="Oxácido (oxoácido)">
        Compuesto ternario: hidrógeno + no metal + oxígeno.<br />
        Formación: anhídrido + agua → oxácido.<br /><br />
        Fórmula general: H_n[NM]O_m. Nombre: "ácido [raíz NM]-oso o -ico"
        según oxidación.
      </Definicion>

      <Ejemplo titulo="Oxácidos típicos">
        — H₂SO₄: ácido sulfúrico (S con +6).<br />
        — H₂SO₃: ácido sulfuroso (S con +4).<br />
        — HNO₃: ácido nítrico (N con +5).<br />
        — HNO₂: ácido nitroso (N con +3).<br />
        — H₂CO₃: ácido carbónico.<br />
        — HClO: ácido hipocloroso. HClO₂: cloroso. HClO₃: clórico. HClO₄: perclórico.
      </Ejemplo>

      <Mnemotecnia>
        <strong>Para obtener oxácido desde anhídrido</strong>:<br />
        Sumá un H₂O y simplificá si hay subíndices comunes.<br /><br />
        Ej: SO₃ + H₂O → H₂SO₄ ✓. CO₂ + H₂O → H₂CO₃ ✓.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscSales() {
  return (
    <EscenaRica>
      <Titulo>Sales · ácido + hidróxido</Titulo>

      <Definicion termino="Sal binaria (haloideas)">
        Formación: hidrácido + hidróxido → sal binaria + H₂O.<br />
        Nombre: [raíz NM]-uro de [metal].<br /><br />
        Ej: NaCl (cloruro de sodio), CaF₂ (fluoruro de calcio), K₂S (sulfuro
        de potasio).
      </Definicion>

      <Definicion termino="Sal oxisal (oxosal)">
        Formación: oxácido + hidróxido → sal oxisal + H₂O.<br />
        Nombre: [raíz NM]-ito (-oso) o -ato (-ico) + de [metal].<br /><br />
        Ej: Na₂SO₄ (sulfato de sodio), Ca(NO₃)₂ (nitrato de calcio),
        K₂CO₃ (carbonato de potasio).
      </Definicion>

      <Mnemotecnia>
        <strong>Sufijos de sales (tabla)</strong>:<br />
        Ácido → Sal:<br />
        — hipo-NM-oso → hipo-NM-ito.<br />
        — NM-oso → NM-ito.<br />
        — NM-ico → NM-ato.<br />
        — per-NM-ico → per-NM-ato.<br /><br />

        Ej: HClO (hipocloroso) → ClO⁻ (hipoclorito) → NaClO (hipoclorito de
        sodio, lavandina).
      </Mnemotecnia>

      <WorkedExample titulo="Caso del facsímil Q15 1op 2005">
        Compuesto con Cr (17.81%), S (32.88%), O (49.31%). ¿Nombre?<br /><br />

        Moles: Cr 17.81/52 = 0.343; S 32.88/32 = 1.027; O 49.31/16 = 3.082.<br />
        Razones: Cr 1, S 3, O 9. Fórmula simplificada: Cr₂S₃O₉ = Cr₂(SO₃)₃.<br /><br />

        Cr con oxidación +3 (cromico).<br />
        SO₃²⁻ = sulfito.<br />
        Nombre: <strong>sulfito crómico</strong>.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Fórmula del hidróxido de calcio:",
      o: ["Ca(OH)₂", "CaOH", "Ca₂OH", "CaO"],
      c: 0,
      ex: "Ca tiene oxidación +2, así que necesita 2 OH⁻.",
    },
    {
      p: "Nombre de Fe₂O₃:",
      o: ["óxido férrico", "óxido ferroso", "óxido de hierro(II)", "hidróxido de hierro"],
      c: 0,
      ex: "Fe con +3 → ferrico (sufijo ico).",
    },
    {
      p: "El ácido HNO₃ se llama:",
      o: ["nítrico", "nitroso", "hiponitroso", "pernitrico"],
      c: 0,
      ex: "N con +5 → ácido NÍTRICO.",
    },
    {
      p: "Oxidación de S en H₂SO₃:",
      o: ["+4", "+6", "+2", "-2"],
      c: 0,
      ex: "2 + x - 6 = 0 → x = +4.",
    },
    {
      p: "Nombre de NaClO:",
      o: ["hipoclorito de sodio", "clorato de sodio", "cloruro de sodio", "perclorato"],
      c: 0,
      ex: "Sal de ácido hipocloroso (HClO).",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · confundir -oso e -ico">
        — -OSO: oxidación MENOR.<br />
        — -ICO: oxidación MAYOR.<br />
        Ej: Fe²⁺ ferroso, Fe³⁺ férrico.
      </Misconception>

      <Misconception titulo="Error 2 · confundir hidróxido con hidrácido">
        — Hidróxido: contiene OH (Ca(OH)₂). Es una BASE.<br />
        — Hidrácido: H + no metal (HCl). Es un ÁCIDO.
      </Misconception>

      <Misconception titulo="Error 3 · sufijos de sales">
        — -ito viene de -oso (ácido sulfuroso → sulfito).<br />
        — -ato viene de -ico (ácido sulfúrico → sulfato).
      </Misconception>

      <Titulo>Práctica · 5 ejercicios</Titulo>
      {ejs.map((e, i) => {
        const sel = resp[i];
        const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 16, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c;
                const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{
                      padding: "10px 14px",
                      background: !rev ? "var(--bg-base)" : isOk ? "#d1fae5" : isSel ? "#fee2e2" : "var(--bg-base)",
                      border: `1.5px solid ${!rev ? "var(--border)" : isOk ? COLOR_OK : isSel ? COLOR_BAD : "var(--border)"}`,
                      borderRadius: 10, fontSize: 14, fontWeight: 700, color: COLOR_BASE, cursor: rev ? "default" : "pointer",
                      fontFamily: "var(--font-crimson), serif", textAlign: "left",
                    }}>{op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}</button>
                );
              })}
            </div>
            {rev && (
              <div style={{ marginTop: 10, padding: "10px 12px", background: sel === e.c ? "#ecfdf5" : "#fef2f2", borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5 }}>
                <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}{e.ex}
              </div>
            )}
          </div>
        );
      })}
      {Object.keys(resp).length === ejs.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 18, background: "linear-gradient(135deg, #d1fae5, #a7f3d0)", border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: "#065f46", fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
