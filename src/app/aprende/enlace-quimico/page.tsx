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
      unidad="QUI-04"
      tituloUnidad="Enlace químico"
      escenas={[
        { titulo: "Regla del octeto · estructura de Lewis", componente: EscOcteto },
        { titulo: "Enlace iónico (transferencia)", componente: EscIonico },
        { titulo: "Enlace covalente (compartido)", componente: EscCovalente },
        { titulo: "Tipos de covalente: simple, doble, triple, coordinado", componente: EscTiposCov },
        { titulo: "Polaridad de enlace", componente: EscPolaridad },
        { titulo: "Enlace metálico y fuerzas intermoleculares", componente: EscOtros },
        { titulo: "Comparación de propiedades", componente: EscComparacion },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function EscOcteto() {
  return (
    <EscenaRica>
      <Titulo>Regla del octeto y estructuras de Lewis</Titulo>

      <Hook>
        El enlace químico explica POR QUÉ los átomos se combinan. En el examen
        FCyT aparece en Q4 PREU 2025 (Lewis e identificar tipos) y en
        problemas de estructura molecular.
      </Hook>

      <Definicion termino="Regla del octeto">
        Los átomos tienden a ganar, perder o compartir electrones hasta
        completar 8 electrones en su capa de valencia (como los gases nobles).
        Excepciones: H y He buscan 2 (dueto).
      </Definicion>

      <Definicion termino="Estructura de Lewis">
        Representación gráfica donde los electrones de valencia se muestran
        como puntos alrededor del símbolo. Los enlaces se representan como
        líneas (cada línea = 2 electrones).
      </Definicion>

      <Ejemplo titulo="Estructuras de Lewis típicas">
        — H· (1 electrón valencia)<br />
        — :Ö: con 2 puntos arriba abajo izquierda derecha (6 electrones).<br />
        — H−H (enlace simple, 2 electrones compartidos).<br />
        — O=O (enlace doble, 4 electrones).<br />
        — N≡N (enlace triple, 6 electrones).
      </Ejemplo>

      <Mnemotecnia>
        <strong>Electrones de valencia por grupo</strong>:<br />
        — Grupo IA: 1 (H, Li, Na...)<br />
        — Grupo IIA: 2 (Be, Mg, Ca...)<br />
        — Grupo IIIA: 3 (B, Al...)<br />
        — Grupo IVA: 4 (C, Si...)<br />
        — Grupo VA: 5 (N, P...)<br />
        — Grupo VIA: 6 (O, S...)<br />
        — Grupo VIIA: 7 (F, Cl, Br, I...)<br />
        — Gases nobles: 8 (excepto He: 2).
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscIonico() {
  return (
    <EscenaRica>
      <Titulo>Enlace iónico · transferencia de electrones</Titulo>

      <Definicion termino="Enlace iónico">
        Se forma cuando un átomo TRANSFIERE uno o más electrones a otro. El
        átomo que pierde queda como catión (+), el que gana como anión (−).
        La atracción electrostática mantiene unidos a los iones.
      </Definicion>

      <Resumen>
        <strong>Características</strong>:<br />
        — Ocurre entre METAL y NO METAL (mucha diferencia de
        electronegatividad: ΔEN &gt; 1.7).<br />
        — Forma redes cristalinas (NaCl, KBr).<br />
        — Sólidos a temperatura ambiente.<br />
        — Altos puntos de fusión.<br />
        — Conducen electricidad cuando están disueltos en agua o fundidos.<br />
        — Muchos son solubles en agua.
      </Resumen>

      <WorkedExample titulo="Formación de NaCl">
        Na (Z=11): 1s²2s²2p⁶3s¹. Tiene 1 e⁻ de valencia.<br />
        Cl (Z=17): 1s²2s²2p⁶3s²3p⁵. Tiene 7 e⁻ de valencia.<br /><br />

        Na cede su electrón a Cl:<br />
        Na → Na⁺ + e⁻ (queda con conf de Ne).<br />
        Cl + e⁻ → Cl⁻ (queda con conf de Ar).<br />
        Na⁺ + Cl⁻ → NaCl (atraídos por carga).
      </WorkedExample>
    </EscenaRica>
  );
}

function EscCovalente() {
  return (
    <EscenaRica>
      <Titulo>Enlace covalente · electrones compartidos</Titulo>

      <Definicion termino="Enlace covalente">
        Dos átomos COMPARTEN uno o más pares de electrones, formando un par
        enlazante. Típico entre NO METALES (poca diferencia de
        electronegatividad: ΔEN ≤ 1.7).
      </Definicion>

      <Resumen>
        <strong>Características</strong>:<br />
        — Forma moléculas (H₂O, CO₂, NH₃).<br />
        — Puntos de fusión y ebullición más bajos que iónicos.<br />
        — No conducen electricidad (excepción: ácidos en agua).<br />
        — Pueden ser sólidos, líquidos o gases a temperatura ambiente.
      </Resumen>

      <Ejemplo titulo="Ejemplos">
        — H₂: H−H (1 par compartido).<br />
        — Cl₂: Cl−Cl (1 par compartido).<br />
        — H₂O: H−O−H (O comparte 1 par con cada H, total 2 pares).<br />
        — CH₄: C compartido con 4 H (4 enlaces simples).
      </Ejemplo>
    </EscenaRica>
  );
}

function EscTiposCov() {
  return (
    <EscenaRica>
      <Titulo>Tipos de enlace covalente</Titulo>

      <Resumen>
        Según cuántos pares de electrones se comparten:<br />
        — <strong>Simple</strong>: 1 par compartido (línea simple). Ej: H−Cl.<br />
        — <strong>Doble</strong>: 2 pares (línea doble). Ej: O=C=O.<br />
        — <strong>Triple</strong>: 3 pares (línea triple). Ej: N≡N.<br />
        — <strong>Coordinado (dativo)</strong>: ambos electrones los aporta UN
        solo átomo. Notación: flecha. Ej: H₃N→BF₃.
      </Resumen>

      <Mnemotecnia>
        <strong>A más pares compartidos:</strong><br />
        — Más corto el enlace.<br />
        — Más fuerte el enlace (más energía para romper).<br />
        — Más rígida la molécula.
      </Mnemotecnia>

      <WorkedExample titulo="Q4 PREU 2025 · identificar enlace iónico">
        ¿Cuál tiene enlace iónico, covalente simple, coordinado, doble?<br />
        Opciones: a) K₂SO₄, b) Cs·Cl·O₃, c) Na₂CO₃, d) Ag·N·O₃<br /><br />

        Iónico: entre metal-no metal. Todos tienen iones K⁺, Cs⁺, Na⁺ o Ag⁺.<br />
        Más típico iónico puro: <strong>Cs·Cl·O₃ (clorato de cesio)</strong>:
        Cs⁺ con ClO₃⁻. Dentro del anión hay covalente, pero Cs-O₃Cl es iónico.<br /><br />

        El de enlace covalente doble más claro: en C=O del carbonato Na₂CO₃.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPolaridad() {
  return (
    <EscenaRica>
      <Titulo>Polaridad de enlace y molécula</Titulo>

      <Definicion termino="Enlace polar">
        Cuando los dos átomos tienen DIFERENTE electronegatividad. El más
        electronegativo "tira" más de los electrones compartidos, formando
        polos δ⁺ y δ⁻.
      </Definicion>

      <Resumen>
        <strong>Clasificación según ΔEN</strong>:<br />
        — ΔEN = 0: covalente NO polar (entre átomos iguales: H₂, Cl₂).<br />
        — 0 &lt; ΔEN &lt; 0.4: covalente NO polar.<br />
        — 0.4 ≤ ΔEN ≤ 1.7: covalente POLAR.<br />
        — ΔEN &gt; 1.7: predominantemente IÓNICO.
      </Resumen>

      <Definicion termino="Molécula polar vs no polar">
        Una molécula es polar si los dipolos NO se cancelan por geometría:<br />
        — H₂O: polar (forma de "V", momentos no se cancelan).<br />
        — CO₂: NO polar (lineal, los 2 dipolos C=O se cancelan).<br />
        — CCl₄: NO polar (tetraédrica, 4 dipolos simétricos se cancelan).
      </Definicion>

      <PorQue>
        La polaridad afecta propiedades importantes: solubilidad ("lo similar
        disuelve lo similar"), punto de ebullición (las polares hierven más
        alto por fuerzas intermoleculares más fuertes), conductividad.
      </PorQue>
    </EscenaRica>
  );
}

function EscOtros() {
  return (
    <EscenaRica>
      <Titulo>Enlace metálico y fuerzas intermoleculares</Titulo>

      <Definicion termino="Enlace metálico">
        Los átomos metálicos liberan sus electrones de valencia formando un
        "mar de electrones" que se mueve libremente. Los cationes quedan en
        una red, los electrones los unen.<br /><br />
        Esto explica las propiedades de los metales: conductores, dúctiles,
        maleables, brillantes.
      </Definicion>

      <Resumen>
        <strong>Fuerzas intermoleculares</strong> (atraen moléculas entre sí,
        más débiles que los enlaces):<br /><br />

        — <strong>London (dispersión)</strong>: las más débiles. Existen en
        TODAS las moléculas. Crecen con el tamaño molecular.<br />
        — <strong>Dipolo-dipolo</strong>: entre moléculas polares.<br />
        — <strong>Puentes de hidrógeno</strong>: las más fuertes. Cuando H está
        unido a F, O o N (FON). Por eso el agua tiene punto de ebullición tan
        alto.
      </Resumen>

      <Mnemotecnia>
        <strong>Por qué hierve más alto el agua que el sulfuro de hidrógeno</strong>:<br />
        H₂O y H₂S son parecidos en estructura. Pero H₂O tiene PUENTES DE
        HIDRÓGENO (porque H está unido a O), H₂S no. Por eso H₂O hierve a
        100°C y H₂S a −60°C.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function EscComparacion() {
  return (
    <EscenaRica>
      <Titulo>Comparación de tipos de enlace</Titulo>

      <Resumen>
        <table style={{ fontFamily: "var(--font-crimson), serif", margin: "0 auto", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "6px 10px" }}>Propiedad</th>
              <th style={{ padding: "6px 10px" }}>Iónico</th>
              <th style={{ padding: "6px 10px" }}>Covalente</th>
              <th style={{ padding: "6px 10px" }}>Metálico</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={{ padding: "6px 10px" }}>Estado a 25°C</td><td>Sólido</td><td>Varios</td><td>Sólido</td></tr>
            <tr><td style={{ padding: "6px 10px" }}>Punto fusión</td><td>Alto</td><td>Bajo</td><td>Medio-alto</td></tr>
            <tr><td style={{ padding: "6px 10px" }}>Solubilidad agua</td><td>Sí (sales)</td><td>Variable</td><td>No</td></tr>
            <tr><td style={{ padding: "6px 10px" }}>Conductividad</td><td>En solución</td><td>No</td><td>Sí</td></tr>
            <tr><td style={{ padding: "6px 10px" }}>Maleabilidad</td><td>Frágil</td><td>Variable</td><td>Sí</td></tr>
          </tbody>
        </table>
      </Resumen>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Tipo de enlace en NaCl:",
      o: ["iónico", "covalente", "metálico", "puente H"],
      c: 0,
      ex: "Metal (Na) + no metal (Cl) → iónico.",
    },
    {
      p: "Molécula con enlace triple:",
      o: ["N₂", "O₂", "H₂", "Cl₂"],
      c: 0,
      ex: "N≡N tiene enlace triple.",
    },
    {
      p: "Molécula polar:",
      o: ["H₂O", "CO₂", "CCl₄", "N₂"],
      c: 0,
      ex: "H₂O es polar por geometría angular. CO₂ y CCl₄ son simétricas.",
    },
    {
      p: "Fuerza intermolecular más fuerte:",
      o: ["puente H", "London", "dipolo-dipolo", "iónica"],
      c: 0,
      ex: "Puentes de H son las más fuertes (entre moléculas).",
    },
    {
      p: "Los metales conducen electricidad por:",
      o: ["mar de electrones", "iones libres", "puente H", "redes cristalinas"],
      c: 0,
      ex: "Electrones de valencia libres en el enlace metálico.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · todo enlace covalente es no polar">
        Falso. Solo es no polar si los dos átomos tienen MISMA EN (átomos
        iguales). Si hay diferencia, hay polaridad de enlace.
      </Misconception>

      <Misconception titulo="Error 2 · enlace polar = molécula polar">
        Falso. Una molécula con enlaces polares puede ser globalmente NO POLAR
        si los dipolos se cancelan por simetría (ej: CO₂, CCl₄).
      </Misconception>

      <Misconception titulo="Error 3 · puente de hidrógeno con cualquier H">
        Solo cuando H está unido directamente a F, O o N. Recordá: F-O-N.
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
