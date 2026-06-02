"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="04"
      tituloUnidad="Contabilidad básica"
      escenas={[
        { titulo: "Activo = Pasivo + Patrimonio", componente: Esc01_Intro },
        { titulo: "Activos · lo que la empresa TIENE", componente: Esc02_Activo },
        { titulo: "Pasivos · lo que la empresa DEBE", componente: Esc03_Pasivo },
        { titulo: "Patrimonio · lo que es de los dueños", componente: Esc04_Patrimonio },
        { titulo: "Cada transacción mantiene la igualdad", componente: Esc05_Transacciones },
        { titulo: "Errores comunes", componente: Esc06_Errores },
        { titulo: "Práctica final", componente: Esc07_Practica },
      ]}
    />
  );
}

// Animación: balanza A = P + Pn. Aplicar transacciones rebalancea ambos lados.
function BalanzaContable() {
  // 3 escenarios cargados como botones.
  const escenarios = [
    { titulo: "Estado inicial", A: 10000, P: 4000, Pn: 6000 },
    { titulo: "Toma préstamo 2000", A: 12000, P: 6000, Pn: 6000 },
    { titulo: "Compra inmueble en cash", A: 10000, P: 4000, Pn: 6000, note: "Activo cambia composición, no monto" },
  ];
  const [i, setI] = useState(0);
  const e = escenarios[i];
  const igual = e.A === e.P + e.Pn;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={210}>
        <svg width="100%" height="100%" viewBox="0 0 480 210"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Base */}
          <line x1="240" x2="240" y1="60" y2="170" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="200" x2="280" y1="170" y2="170" stroke={LIENZO.fg} strokeWidth="2" />
          {/* Barra siempre balanceada (ecuación contable nunca se rompe) */}
          <motion.g
            initial={false}
            animate={{ rotate: 0 }}
            style={{ transformOrigin: "240px 60px" }}
          >
            <line x1="80" x2="400" y1="60" y2="60" stroke={LIENZO.fg} strokeWidth="3" strokeLinecap="round" />
            {/* Activo izq */}
            <line x1="100" x2="100" y1="60" y2="90" stroke={LIENZO.fg} strokeWidth="1.5" />
            <motion.rect x="40" y="90" width="120" height="50" rx="6"
              fill={LIENZO.accent} fillOpacity="0.18" stroke={LIENZO.accent} strokeWidth="2"
              animate={{ x: 40, width: 120 }} transition={{ duration: 0.4 }} />
            <text x="100" y="115" textAnchor="middle" fontSize="13" fill={LIENZO.accent} fontWeight="700">ACTIVO</text>
            <motion.text x="100" y="132" textAnchor="middle" fontSize="14" fill={LIENZO.accent} fontWeight="600"
              key={`a-${i}`} initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
              {e.A.toLocaleString()} Bs
            </motion.text>
            {/* Pasivo + Patrimonio der */}
            <line x1="380" x2="380" y1="60" y2="90" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="320" y="90" width="120" height="50" rx="6"
              fill={LIENZO.ok} fillOpacity="0.18" stroke={LIENZO.ok} strokeWidth="2" />
            <text x="380" y="108" textAnchor="middle" fontSize="11" fill={LIENZO.bad} fontWeight="700">PASIVO</text>
            <motion.text x="380" y="123" textAnchor="middle" fontSize="13" fill={LIENZO.bad} fontWeight="600"
              key={`p-${i}`} initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
              {e.P.toLocaleString()} +
            </motion.text>
            <motion.text x="380" y="138" textAnchor="middle" fontSize="13" fill={LIENZO.ok} fontWeight="600"
              key={`pn-${i}`} initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
              {e.Pn.toLocaleString()} (Patrim.)
            </motion.text>
          </motion.g>
          {/* Signo = central */}
          <text x="240" y="50" textAnchor="middle" fontSize="22" fill={LIENZO.fg} fontWeight="500">=</text>
        </svg>
      </Pizarra>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
        {escenarios.map((s, k) => (
          <button key={k} onClick={() => setI(k)}
            style={{
              padding: "6px 12px", fontSize: 12, borderRadius: 999, cursor: "pointer",
              fontWeight: 600,
              background: i === k ? LIENZO.fg : "transparent",
              color: i === k ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${i === k ? LIENZO.fg : LIENZO.fgFaint}`,
            }}>
            {s.titulo}
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim, minHeight: 22 }}>
        {igual ? <span><b style={{ color: LIENZO.ok }}>{e.A.toLocaleString()} = {e.P.toLocaleString()} + {e.Pn.toLocaleString()}</b> ✓ {e.note ? `· ${e.note}` : ""}</span> : <span style={{ color: LIENZO.bad }}>No balanceada (no debería pasar)</span>}
      </div>
    </div>
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>La ecuación fundamental: A = P + Pn</Titulo>
      <Definicion termino="ecuación contable">
        Es la regla más importante de la contabilidad:<br /><br />
        <strong style={{ fontSize: 22 }}>Activo = Pasivo + Patrimonio</strong>
      </Definicion>
      <Parrafo>
        Dice algo muy intuitivo: <strong>todo lo que la empresa TIENE</strong> (su Activo) se financia
        de dos maneras posibles: con plata de <strong>terceros</strong> (Pasivo) o con plata de los
        <strong> dueños</strong> (Patrimonio).
      </Parrafo>
      <BalanzaContable />
      <Resumen>
        La ecuación SIEMPRE se cumple. Cada transacción afecta a ambos lados de la balanza, pero NUNCA la
        rompe. Eso es lo que hace que la contabilidad sea un sistema cerrado y coherente.
      </Resumen>
    </EscenaRica>
  );
}

function Esc02_Activo() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_EXP}>Activos: lo que la empresa TIENE</Titulo>
      <Definicion termino="activo">
        Recursos que la empresa controla, de los cuales se esperan beneficios económicos futuros.
      </Definicion>
      <Resumen>
        Se clasifican por su <strong>liquidez</strong>:<br /><br />
        <strong>Activo corriente</strong> (se vuelven efectivo en menos de 1 año):<br />
        • Caja y bancos · cuentas por cobrar · inventarios.<br /><br />
        <strong>Activo no corriente</strong> (más de 1 año):<br />
        • Inmuebles · maquinaria · vehículos · inversiones de largo plazo · marcas e intangibles.
      </Resumen>
      <Ejemplo>
        Una panadería tiene: 5 000 en caja, 20 000 en harina y producto, 80 000 en hornos y local.<br />
        Total activo: <strong style={{ color: COLOR_EXP }}>105 000 Bs</strong>.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc03_Pasivo() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Pasivos: lo que la empresa DEBE</Titulo>
      <Definicion termino="pasivo">
        Obligaciones presentes de la empresa con TERCEROS, que se van a saldar entregando dinero, bienes o
        servicios en el futuro.
      </Definicion>
      <Resumen>
        También se clasifican por plazo:<br /><br />
        <strong>Pasivo corriente</strong> (menos de 1 año):<br />
        • Proveedores · sueldos por pagar · impuestos por pagar · préstamos de corto plazo.<br /><br />
        <strong>Pasivo no corriente</strong> (más de 1 año):<br />
        • Préstamos bancarios de largo plazo · obligaciones financieras · jubilaciones.
      </Resumen>
      <Ejemplo>
        La panadería debe 10 000 al banco y 5 000 al proveedor de harina.<br />
        Total pasivo: <strong style={{ color: COLOR_BAD }}>15 000 Bs</strong>.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_Patrimonio() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Patrimonio: lo que es de los dueños</Titulo>
      <Definicion termino="patrimonio (capital contable)">
        Es la <strong>parte residual</strong> del activo después de pagar todos los pasivos. Lo que les
        quedaría a los dueños si liquidaran la empresa hoy.
      </Definicion>
      <Resumen>
        Despejando la ecuación: <strong>Patrimonio = Activo − Pasivo</strong>.<br /><br />
        Sus componentes típicos:<br />
        • <strong>Capital social</strong> aportado por los dueños.<br />
        • <strong>Utilidades acumuladas</strong> de ejercicios anteriores no retiradas.<br />
        • <strong>Resultado del ejercicio</strong> (ganancia o pérdida del año actual).
      </Resumen>
      <Ejemplo>
        La panadería: Activo 105 000 − Pasivo 15 000 = <strong style={{ color: COLOR_OK }}>90 000</strong> de patrimonio.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05_Transacciones() {
  return (
    <EscenaRica>
      <Titulo>Cada operación mantiene la igualdad</Titulo>
      <Parrafo>
        Toda transacción afecta como MÍNIMO a dos cuentas, de forma que la ecuación siga balanceada (esto
        es el principio de <strong>partida doble</strong>).
      </Parrafo>
      <Ejemplo titulo="Caso 1: Toma un préstamo de 2 000">
        <Paso n={1}>Caja (activo) sube en 2 000.</Paso>
        <Paso n={2}>Préstamo (pasivo) sube en 2 000.</Paso>
        <Paso n={3}>Sigue balanceada: ambos lados subieron lo mismo. ✓</Paso>
      </Ejemplo>
      <Ejemplo titulo="Caso 2: Compra una camioneta en cash por 30 000">
        <Paso n={1}>Vehículos (activo) sube en 30 000.</Paso>
        <Paso n={2}>Caja (activo) baja en 30 000.</Paso>
        <Paso n={3}>El total del activo NO cambia, solo cambia su composición. La ecuación sigue balanceada. ✓</Paso>
      </Ejemplo>
      <Ejemplo titulo="Caso 3: Tiene una ganancia neta de 1 000">
        <Paso n={1}>Caja sube en 1 000 (activo).</Paso>
        <Paso n={2}>Utilidades acumuladas sube en 1 000 (patrimonio).</Paso>
        <Paso n={3}>Ambos lados crecen lo mismo. ✓</Paso>
      </Ejemplo>
      <PorQue>
        Por eso un balance "no cuadrado" siempre indica un error: no es que la ecuación falle, es que hay
        una transacción mal registrada.
      </PorQue>
    </EscenaRica>
  );
}

function Esc06_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>1.</strong> Confundir patrimonio con caja. El patrimonio NO es plata en una cuenta, es una
        magnitud contable: lo que queda después de pagar deudas.
      </Cuidado>
      <Cuidado>
        <strong>2.</strong> Olvidar la partida doble. Toda transacción mueve al menos dos cuentas. Si solo
        cambia una, te estás olvidando del otro lado.
      </Cuidado>
      <Cuidado>
        <strong>3.</strong> Pensar que el activo es solo "dinero". Activo incluye inventarios, inmuebles,
        cuentas por cobrar, marcas… todo lo que la empresa controla.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc07_Practica() {
  const ejs = useMemo(() => [
    { p: "Activo 50 000, Patrimonio 30 000. ¿Pasivo?", o: ["20 000", "80 000", "30 000", "50 000"], c: 0, ex: "P = A − Pn = 50 000 − 30 000 = 20 000." },
    { p: "Una camioneta es un…", o: ["Pasivo", "Activo no corriente", "Patrimonio", "Gasto"], c: 1, ex: "Recurso controlado, beneficios > 1 año → activo no corriente." },
    { p: "Préstamo bancario a 5 años:", o: ["Activo corriente", "Activo no corriente", "Pasivo corriente", "Pasivo no corriente"], c: 3, ex: "Obligación con tercero, más de 1 año: pasivo no corriente." },
    { p: "Compra mercadería en cash 1 000. La ecuación contable:", o: [
      "Se rompe",
      "Activo total sube 1 000",
      "Activo total no cambia, su composición sí",
      "El pasivo sube 1 000",
    ], c: 2, ex: "Inventario +1 000, Caja −1 000. Total activo igual." },
    { p: "¿Qué es PATRIMONIO?", o: [
      "Lo que la empresa debe",
      "Lo que la empresa tiene",
      "La parte residual: A − P",
      "Solo el dinero en caja",
    ], c: 2, ex: "Es la parte de los dueños: A − P." },
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
