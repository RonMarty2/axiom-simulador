"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Resumen,
  EscenaRica, PracticaFinal,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Introducción a la contabilidad"
      escenas={[
        { titulo: "Qué es el ciclo contable", componente: Esc01 },
        { titulo: "Las 6 etapas", componente: Esc02 },
        { titulo: "Análisis de la transacción", componente: Esc03 },
        { titulo: "Libro diario y mayorización", componente: Esc04 },
        { titulo: "Balanza de comprobación", componente: Esc05 },
        { titulo: "Ajustes y estados finales", componente: Esc06 },
        { titulo: "Práctica final", componente: Esc07 },
      ]}
    />
  );
}

// Animación: 6 etapas del ciclo contable en cascada.
function CicloAnim() {
  const [activo, setActivo] = useState(0);
  const etapas = [
    { titulo: "Análisis", desc: "Identificar transacciones", color: LIENZO.accent },
    { titulo: "Libro diario", desc: "Anotar cronológicamente", color: LIENZO.accent },
    { titulo: "Mayorización", desc: "Pasar al libro mayor", color: LIENZO.warn },
    { titulo: "Balanza de comprobación", desc: "Verificar equilibrio", color: LIENZO.warn },
    { titulo: "Ajustes", desc: "Correcciones de cierre", color: LIENZO.ok },
    { titulo: "Estados financieros", desc: "Emisión final", color: LIENZO.ok },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={260} onClick={() => setActivo((v) => (v + 1) % (etapas.length + 1))}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, width: "100%",
          padding: 8,
        }}>
          {etapas.map((e, i) => (
            <motion.div key={i}
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{
                opacity: activo === 0 || activo > i ? 1 : 0.3,
                scale: activo === i + 1 ? 1.04 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{
                padding: "10px 12px", border: `2px solid ${e.color}`, borderRadius: 10,
                background: `${e.color}10`,
                fontFamily: "var(--font-crimson), serif",
              }}>
              <div style={{
                fontSize: 10, color: e.color, fontWeight: 700, letterSpacing: 1.2,
              }}>{i + 1}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: LIENZO.fg, marginTop: 2 }}>{e.titulo}</div>
              <div style={{ fontSize: 11, color: LIENZO.fgDim, marginTop: 2 }}>{e.desc}</div>
            </motion.div>
          ))}
        </div>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 13, color: LIENZO.fgFaint, fontStyle: "italic" }}>
        {activo === 0 ? "Tocá para recorrer las 6 etapas en orden" : `Etapa ${activo} · ${etapas[activo - 1].titulo}`}
      </div>
    </div>
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>¿Qué es el ciclo contable?</Titulo>
      <Definicion termino="ciclo contable">
        Proceso que sigue la contabilidad <strong>desde el registro de las transacciones hasta la emisión
        de los estados financieros</strong>. Es un ciclo porque se repite cada período (mes, trimestre,
        año).
      </Definicion>
      <Parrafo>
        Comprende <strong>6 etapas</strong> ordenadas. Cada una se apoya en la anterior y prepara la
        siguiente. Cuando termina, se reinicia con las nuevas transacciones del período siguiente.
      </Parrafo>
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Las 6 etapas en orden</Titulo>
      <CicloAnim />
      <Resumen>
        <strong>1. Análisis de la transacción</strong><br />
        <strong>2. Registro en el libro diario</strong><br />
        <strong>3. Mayorización</strong><br />
        <strong>4. Balanza de comprobación</strong><br />
        <strong>5. Ajustes contables</strong><br />
        <strong>6. Elaboración de los estados financieros</strong>
      </Resumen>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo>1 · Análisis de la transacción</Titulo>
      <Definicion termino="análisis de la transacción">
        Identificar las transacciones que deben registrarse y determinar qué cuentas afectan, en qué
        dirección (débito/crédito) y por qué monto.
      </Definicion>
      <Ejemplo>
        La empresa compra una computadora por 5 000 al contado.<br />
        Análisis: aumenta Equipos (+5 000) y disminuye Caja (−5 000). Son las dos cuentas afectadas.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>2 · Libro diario · 3 · Mayorización</Titulo>
      <Definicion termino="libro diario">
        Las transacciones se anotan en orden <strong>cronológico</strong> (la fecha en que ocurrieron).
      </Definicion>
      <Definicion termino="mayorización">
        Pasar las transacciones del diario al <strong>libro mayor</strong>: ahora se agrupan por
        cuenta, sin importar la fecha.
      </Definicion>
      <PorQue>
        El diario sirve para ver QUÉ pasó cada día. El mayor sirve para ver el saldo actual de cada
        cuenta. Las dos vistas, mismos datos.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>4 · Balanza de comprobación</Titulo>
      <Definicion termino="balanza de comprobación">
        Verificación de que los <strong>débitos = créditos</strong>. Es la primera red de seguridad: si
        no cuadra, hay un error.
      </Definicion>
      <Ejemplo>
        Total de débitos: 250 000<br />
        Total de créditos: 250 000<br />
        ✓ Cuadrado.<br /><br />
        Si la suma de débitos hubiera sido 240 000 y créditos 250 000, sabemos que falta una entrada de
        10 000 en algún lado.
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>5 · Ajustes · 6 · Estados financieros</Titulo>
      <Definicion termino="ajustes contables">
        Correcciones o registros adicionales necesarios al cierre del período: depreciaciones,
        amortizaciones, devengamientos, cuentas por cobrar incobrables.
      </Definicion>
      <Definicion termino="elaboración de estados financieros">
        Una vez ajustadas las cuentas, se crean los 4 estados (Balance General, Resultados, Flujos de
        Efectivo, Cambios en el Patrimonio).
      </Definicion>
      <PorQue>
        Cerrado el período se cierran las cuentas de resultado (ingresos, gastos), su saldo va al
        patrimonio, y empieza el ciclo nuevamente con los saldos iniciales del período siguiente.
      </PorQue>
    </EscenaRica>
  );
}

function Esc07() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        { p: "El ciclo contable termina con:", o: [
          "el análisis de la transacción",
          "la balanza de comprobación",
          "la emisión de los estados financieros",
          "la mayorización",
        ], c: 2, ex: "Los estados financieros son el producto final del ciclo." },
        { p: "En el libro diario las transacciones se anotan:", o: [
          "por cuenta", "cronológicamente", "por monto", "alfabéticamente",
        ], c: 1, ex: "Diario = orden de la fecha. Mayor = orden por cuenta." },
        { p: "Si la balanza de comprobación NO cuadra:", o: [
          "se elaboran los estados igual",
          "hay un error en algún registro",
          "se cierra el ciclo",
          "se pagan los impuestos",
        ], c: 1, ex: "Es la red de seguridad de la partida doble. Hay que buscar el error." },
        { p: "La depreciación de un activo se registra en:", o: [
          "el libro diario al comprarlo",
          "los ajustes de cierre",
          "el estado de flujos",
          "no se registra",
        ], c: 1, ex: "Es un ajuste de cierre que reconoce la pérdida de valor del período." },
        { p: "La mayorización consiste en:", o: [
          "buscar las transacciones más grandes",
          "pasar del diario al mayor (agrupar por cuenta)",
          "redactar el estado de resultados",
          "auditar el ciclo",
        ], c: 1, ex: "Es el paso 3: agrupar por cuenta lo que estaba ordenado por fecha." },
      ]} />
    </EscenaRica>
  );
}
