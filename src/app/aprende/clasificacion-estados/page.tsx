"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Introducción a la contabilidad"
      escenas={[
        { titulo: "Ramas de la contabilidad", componente: Esc01 },
        { titulo: "Estados financieros: qué son", componente: Esc02 },
        { titulo: "Balance General · A = P + Pn", componente: Esc03 },
        { titulo: "Estado de Resultados", componente: Esc04 },
        { titulo: "Estado de Flujos de Efectivo", componente: Esc05 },
        { titulo: "Estado de Cambios en el Patrimonio", componente: Esc06 },
        { titulo: "Práctica final", componente: Esc07 },
      ]}
    />
  );
}

function BalanzaAPP() {
  const escenarios = [
    { titulo: "Inicial", A: 100000, P: 40000, Pn: 60000 },
    { titulo: "Préstamo 20 000", A: 120000, P: 60000, Pn: 60000 },
    { titulo: "Ganancia 10 000", A: 110000, P: 40000, Pn: 70000 },
  ];
  const [i, setI] = useState(0);
  const e = escenarios[i];
  const ok = e.A === e.P + e.Pn;
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 480 220"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <line x1="240" x2="240" y1="60" y2="170" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="200" x2="280" y1="170" y2="170" stroke={LIENZO.fg} strokeWidth="2" />
          <motion.g animate={{ rotate: 0 }} style={{ transformOrigin: "240px 60px" }}>
            <line x1="80" x2="400" y1="60" y2="60" stroke={LIENZO.fg} strokeWidth="3" strokeLinecap="round" />
            <line x1="100" x2="100" y1="60" y2="90" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="40" y="90" width="120" height="60" rx="6"
              fill={LIENZO.accent} fillOpacity="0.18" stroke={LIENZO.accent} strokeWidth="2" />
            <text x="100" y="115" textAnchor="middle" fontSize="13" fill={LIENZO.accent} fontWeight="700">ACTIVO</text>
            <motion.text key={`a-${i}`} initial={{ scale: 0.7 }} animate={{ scale: 1 }}
              x="100" y="135" textAnchor="middle" fontSize="14" fill={LIENZO.accent} fontWeight="600">
              {e.A.toLocaleString()}
            </motion.text>
            <line x1="380" x2="380" y1="60" y2="90" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="320" y="90" width="120" height="60" rx="6"
              fill={LIENZO.ok} fillOpacity="0.18" stroke={LIENZO.ok} strokeWidth="2" />
            <text x="380" y="108" textAnchor="middle" fontSize="11" fill={LIENZO.bad} fontWeight="700">PASIVO</text>
            <motion.text key={`p-${i}`} initial={{ scale: 0.7 }} animate={{ scale: 1 }}
              x="380" y="122" textAnchor="middle" fontSize="13" fill={LIENZO.bad} fontWeight="600">
              {e.P.toLocaleString()} +
            </motion.text>
            <motion.text key={`pn-${i}`} initial={{ scale: 0.7 }} animate={{ scale: 1 }}
              x="380" y="142" textAnchor="middle" fontSize="13" fill={LIENZO.ok} fontWeight="600">
              {e.Pn.toLocaleString()} (Patrim.)
            </motion.text>
          </motion.g>
          <text x="240" y="50" textAnchor="middle" fontSize="22" fill={LIENZO.fg} fontWeight="500">=</text>
        </svg>
      </Pizarra>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap", margin: "10px 0" }}>
        {escenarios.map((s, k) => (
          <button key={k} onClick={() => setI(k)}
            style={{
              padding: "6px 12px", fontSize: 12, borderRadius: 999, cursor: "pointer", fontWeight: 600,
              background: i === k ? LIENZO.fg : "transparent",
              color: i === k ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${i === k ? LIENZO.fg : LIENZO.fgFaint}`,
            }}>{s.titulo}</button>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim }}>
        {ok && <span><b style={{ color: LIENZO.ok }}>{e.A.toLocaleString()} = {e.P.toLocaleString()} + {e.Pn.toLocaleString()}</b> ✓</span>}
      </div>
    </div>
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>Clasificación de la contabilidad</Titulo>
      <Parrafo>
        Existen varias ramas, cada una enfocada en aspectos distintos de la información financiera:
      </Parrafo>
      <Resumen>
        <strong>Contabilidad financiera</strong> — informes para usuarios EXTERNOS (accionistas,
        inversores, fisco).<br /><br />
        <strong>Contabilidad administrativa</strong> — uso INTERNO: planificación estratégica y control
        de costos.<br /><br />
        <strong>Contabilidad de costos</strong> — análisis y registro de los costos de producción o
        servicios.<br /><br />
        <strong>Contabilidad fiscal o tributaria</strong> — cálculo y registro de obligaciones
        impositivas.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Los estados financieros</Titulo>
      <Definicion termino="estados financieros">
        Informes más relevantes que resultan del proceso contable. Resumen y presentan la información
        para los usuarios. Son <strong>cuatro</strong> los principales.
      </Definicion>
      <Resumen>
        <strong>1. Balance General</strong> — Activo, Pasivo, Patrimonio (a una fecha).<br />
        <strong>2. Estado de Resultados</strong> — Ingresos, gastos, resultado (durante un período).<br />
        <strong>3. Estado de Flujos de Efectivo</strong> — movimiento de efectivo (durante un período).<br />
        <strong>4. Estado de Cambios en el Patrimonio</strong> — cambios en el patrimonio (durante un período).
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>El Balance General · A = P + Pn</Titulo>
      <Parrafo>
        Presenta los <strong>activos, pasivos y patrimonio</strong> a una fecha específica. Muestra la
        foto de la situación financiera. La regla de oro:
      </Parrafo>
      <BalanzaAPP />
      <Resumen>
        Toda transacción mantiene la igualdad <strong>A = P + Pn</strong>. Es consecuencia directa del
        principio de partida doble.
      </Resumen>
      <Ejemplo>
        Activo 100 000, Pasivo 40 000 → Patrimonio = 60 000.<br />
        Pido un préstamo de 20 000: Activo sube a 120 000 (entra a caja), Pasivo sube a 60 000. La
        ecuación sigue balanceada.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Estado de Resultados</Titulo>
      <Definicion termino="estado de resultados">
        Muestra el <strong>rendimiento</strong> de la empresa durante un período (mes, trimestre, año).
        Refleja ingresos, gastos y el resultado neto (ganancia o pérdida).
      </Definicion>
      <Ejemplo>
        Ingresos por ventas 500 000<br />
        − Costos de la mercadería vendida 300 000<br />
        = Utilidad bruta 200 000<br />
        − Gastos operativos 120 000<br />
        = <strong style={{ color: "var(--color-ok)" }}>Utilidad neta 80 000</strong>
      </Ejemplo>
      <PorQue>
        Si el Balance General es la foto del patrimonio a un día, el Estado de Resultados es la película
        de cómo ese patrimonio cambió a lo largo del período.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Estado de Flujos de Efectivo</Titulo>
      <Definicion termino="estado de flujos de efectivo">
        Detalla los <strong>movimientos de efectivo</strong> y sus fuentes a lo largo de un período,
        agrupados en tres actividades:
      </Definicion>
      <Resumen>
        <strong>Operativas</strong> — efectivo de la actividad principal del negocio.<br /><br />
        <strong>Inversión</strong> — compra/venta de activos de largo plazo.<br /><br />
        <strong>Financiamiento</strong> — préstamos, aportes de socios, pagos de dividendos.
      </Resumen>
      <Cuidado>
        Una empresa puede tener utilidad neta positiva (en el estado de resultados) y aun así estar sin
        efectivo (los clientes no pagaron). Por eso este estado es clave.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Estado de Cambios en el Patrimonio</Titulo>
      <Definicion termino="estado de cambios en el patrimonio">
        Informa sobre los movimientos en el patrimonio de la entidad durante un período: aportes de
        capital, retiros, utilidades acumuladas, distribución de dividendos.
      </Definicion>
      <Ejemplo>
        Patrimonio inicial 100 000<br />
        + Aporte de socios 20 000<br />
        + Utilidad del ejercicio 30 000<br />
        − Dividendos pagados 10 000<br />
        = <strong>Patrimonio final 140 000</strong>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "El estado financiero que muestra Activo, Pasivo y Patrimonio a una fecha es:", o: [
          "Estado de resultados",
          "Balance General",
          "Estado de flujos",
          "Estado de cambios en el patrimonio",
        ], c: 1, ex: "El Balance General es la 'foto' del patrimonio a esa fecha." },
        { p: "Si Activo = 200 y Patrimonio = 150, el Pasivo es:", o: ["50", "350", "150", "200"], c: 0, ex: "A = P + Pn → 200 = P + 150 → P = 50." },
        { p: "La rama de la contabilidad orientada al uso INTERNO es:", o: [
          "financiera", "administrativa", "fiscal", "tributaria",
        ], c: 1, ex: "Administrativa: planificación estratégica y control interno." },
        { p: "Una empresa con utilidad positiva pero sin caja indica que:", o: [
          "el estado de resultados está mal",
          "la utilidad no se cobró aún en efectivo",
          "el balance no cuadra",
          "hay fraude",
        ], c: 1, ex: "Por eso existe el Estado de Flujos: utilidad ≠ efectivo." },
        { p: "El movimiento de efectivo por compra de una máquina va en:", o: [
          "operativas", "inversión", "financiamiento", "patrimonio",
        ], c: 1, ex: "Es un activo de largo plazo: actividad de inversión." },
      ]} />
    </EscenaRica>
  );
}
