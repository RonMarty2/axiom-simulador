"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="05"
      tituloUnidad="Administración"
      escenas={[
        { titulo: "¿Qué es administrar?", componente: Esc01_Intro },
        { titulo: "Planificar", componente: Esc02_Plan },
        { titulo: "Organizar", componente: Esc03_Org },
        { titulo: "Dirigir", componente: Esc04_Dir },
        { titulo: "Controlar", componente: Esc05_Ctl },
        { titulo: "El ciclo PODC", componente: Esc06_Ciclo },
        { titulo: "Errores comunes", componente: Esc07_Errores },
        { titulo: "Práctica final", componente: Esc08_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Administración: el "cómo" de las organizaciones</Titulo>
      <Definicion termino="administración">
        Proceso de <strong>coordinar recursos</strong> (personas, dinero, tiempo, materiales) para alcanzar
        los objetivos de una organización, de forma eficiente y eficaz.
      </Definicion>
      <Parrafo>
        Toda organización —una empresa, una ONG, un Estado— necesita administrarse. Si nadie lo hace, los
        recursos se desperdician y los objetivos se pierden.
      </Parrafo>
      <Resumen>
        El proceso administrativo clásico (Henri Fayol y Koontz) tiene <strong>4 etapas</strong>:<br /><br />
        <strong>P</strong>lanificar · <strong>O</strong>rganizar · <strong>D</strong>irigir · <strong>C</strong>ontrolar.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Plan() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>1. Planificar</Titulo>
      <Definicion termino="planificar">
        Definir <strong>QUÉ se quiere lograr</strong> y <strong>CÓMO</strong>. Establecer objetivos, metas,
        estrategias y planes de acción.
      </Definicion>
      <Resumen>
        Niveles de planificación:<br />
        • <strong>Estratégica</strong>: largo plazo, alta dirección. Ej: "ser líderes en e-commerce a 5 años".<br />
        • <strong>Táctica</strong>: mediano plazo, gerencias. Ej: "abrir 3 sucursales en 2 años".<br />
        • <strong>Operativa</strong>: corto plazo, equipos. Ej: "vender 100 unidades este mes".
      </Resumen>
      <Ejemplo>
        Una panadería que quiere crecer planifica: comprar un segundo horno, contratar 2 personas, abrir un
        segundo turno y aumentar la producción en 60% en 6 meses.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc03_Org() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>2. Organizar</Titulo>
      <Definicion termino="organizar">
        Diseñar la <strong>estructura</strong>: dividir el trabajo, asignar responsabilidades, establecer
        jerarquías y la cadena de mando.
      </Definicion>
      <Resumen>
        Acá nace el <strong>organigrama</strong>. Hay varios tipos:<br />
        • <strong>Funcional</strong>: por áreas (ventas, producción, finanzas, RR.HH.).<br />
        • <strong>Por producto</strong>: una división por cada línea.<br />
        • <strong>Por zona geográfica</strong>: una división por región.<br />
        • <strong>Matricial</strong>: combinación; un empleado depende de dos jefes (función + proyecto).
      </Resumen>
      <Cuidado>
        Organizar NO es solo "armar el organigrama". También significa definir procedimientos, recursos y
        autoridad para que cada puesto pueda cumplir su rol.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc04_Dir() {
  return (
    <EscenaRica>
      <Titulo accent="#3b82f6">3. Dirigir</Titulo>
      <Definicion termino="dirigir">
        <strong>Hacer que la gente actúe</strong> en función de lo planificado. Incluye liderazgo, motivación,
        comunicación y toma de decisiones.
      </Definicion>
      <Resumen>
        Estilos clásicos de liderazgo:<br />
        • <strong>Autocrático</strong>: el jefe decide solo.<br />
        • <strong>Democrático</strong>: consulta y consensúa.<br />
        • <strong>Laissez-faire</strong>: deja libertad total al equipo.<br /><br />
        No hay un "mejor" universal: depende del equipo, la urgencia y la cultura.
      </Resumen>
      <PorQue>
        Las dos etapas anteriores (plan y org) son "estáticas". Dirigir es la etapa <em>dinámica</em>: pone
        en marcha lo planeado a través de las personas.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05_Ctl() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>4. Controlar</Titulo>
      <Definicion termino="controlar">
        Comparar lo <strong>realizado</strong> con lo <strong>planificado</strong>, detectar desvíos y
        corregir.
      </Definicion>
      <Resumen>
        El ciclo del control:<br /><br />
        <strong>1.</strong> Fijar estándares (metas).<br />
        <strong>2.</strong> Medir el desempeño real.<br />
        <strong>3.</strong> Comparar con los estándares.<br />
        <strong>4.</strong> Aplicar acciones correctivas si hay desvío.
      </Resumen>
      <Ejemplo>
        La panadería planificó vender 3 000 panes/día. Mide: vende 2 500 (−17%). Acción correctiva: revisar
        precio, calidad o promoción.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc06_Ciclo() {
  return (
    <EscenaRica>
      <Titulo>PODC es un ciclo, no una secuencia única</Titulo>
      <Parrafo>
        Las cuatro etapas NO se hacen una sola vez. Cada control alimenta una nueva planificación, una
        reorganización si hace falta, una nueva dirección. Es <strong>cíclico y continuo</strong>.
      </Parrafo>
      <div style={{
        width: "100%", maxWidth: 480, margin: "10px auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
      }}>
        {[
          { i: "P", t: "Planificar", c: LIENZO.accent, d: "¿Qué y cómo?" },
          { i: "O", t: "Organizar", c: LIENZO.ok, d: "Estructura y recursos" },
          { i: "D", t: "Dirigir", c: "#3b82f6", d: "Liderar y motivar" },
          { i: "C", t: "Controlar", c: LIENZO.bad, d: "Medir y corregir" },
        ].map((e, k) => (
          <div key={k} style={{
            padding: "16px 14px", border: `1.5px solid ${e.c}`, borderRadius: 12,
            fontFamily: "var(--font-crimson), serif",
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: e.c, lineHeight: 1 }}>{e.i}</div>
            <div style={{ fontSize: 15, color: LIENZO.fg, fontWeight: 600, marginTop: 6 }}>{e.t}</div>
            <div style={{ fontSize: 12, color: LIENZO.fgDim, marginTop: 2 }}>{e.d}</div>
          </div>
        ))}
      </div>
    </EscenaRica>
  );
}

function Esc07_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        Confundir <em>eficacia</em> con <em>eficiencia</em>. Eficacia = lograr el objetivo. Eficiencia =
        hacerlo con los mínimos recursos. Una empresa puede ser eficaz e ineficiente (logra metas, pero
        gasta de más).
      </Cuidado>
      <Cuidado>
        Pensar que el organigrama es la administración. El organigrama es solo una parte de "organizar". La
        administración incluye las 4 etapas.
      </Cuidado>
      <Cuidado>
        Saltearse el control. Sin control, no se aprende: los problemas se repiten año tras año.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc08_Practica() {
  const ejs = useMemo(() => [
    { p: "El proceso administrativo clásico tiene…", o: ["3 etapas", "4 etapas", "5 etapas", "6 etapas"], c: 1, ex: "Planificar, Organizar, Dirigir, Controlar (PODC)." },
    { p: "Definir objetivos es parte de…", o: ["Planificar", "Organizar", "Dirigir", "Controlar"], c: 0, ex: "Definir qué se quiere lograr corresponde a planificar." },
    { p: "El organigrama corresponde a la etapa de…", o: ["Planificar", "Organizar", "Dirigir", "Controlar"], c: 1, ex: "Estructura, jerarquías, asignación: organizar." },
    { p: "Comparar resultados con metas es…", o: ["Dirigir", "Controlar", "Planificar", "Organizar"], c: 1, ex: "Comparar real vs. planeado y corregir: control." },
    { p: "Lograr el objetivo se llama:", o: ["eficiencia", "eficacia", "productividad", "rentabilidad"], c: 1, ex: "Eficacia = cumplir el objetivo. Eficiencia = hacerlo con pocos recursos." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;
  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 preguntas:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i]; const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "transparent", border: `1px solid ${LIENZO.fgFaint}`, borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>PREGUNTA {i + 1}</div>
            <div style={{ fontSize: 15, color: COLOR_BASE, fontWeight: 600, marginBottom: 12 }}>{e.p}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {e.o.map((op, j) => {
                const isOk = j === e.c; const isSel = sel === j;
                return (
                  <button key={j} onClick={() => !rev && setResp({ ...resp, [i]: j })} disabled={rev}
                    style={{ padding: "10px 14px", background: !rev ? "#fff" : isOk ? "#ecfdf5" : isSel ? "#fef2f2" : "#fff", border: `1.5px solid ${!rev ? LIENZO.fgFaint : isOk ? COLOR_OK : isSel ? COLOR_BAD : LIENZO.fgFaint}`, borderRadius: 10, fontSize: 14, fontWeight: 600, color: COLOR_BASE, cursor: rev ? "default" : "pointer", textAlign: "left" }}>
                    {op}{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
                  </button>
                );
              })}
            </div>
            {rev && <div style={{ marginTop: 10, padding: "10px 12px", background: sel === e.c ? "#ecfdf5" : "#fef2f2", borderRadius: 8, fontSize: 13, color: COLOR_BASE, lineHeight: 1.5 }}>
              <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}{e.ex}
            </div>}
          </div>
        );
      })}
      {Object.keys(resp).length === ejs.length && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 18, background: LIENZO.bgSoft, border: `2px solid ${COLOR_OK}`, borderRadius: 14, maxWidth: 580, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 22, color: COLOR_OK, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>{ok} / {ejs.length} correctas</div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
