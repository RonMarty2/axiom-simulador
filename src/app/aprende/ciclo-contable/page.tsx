"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal,
  Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion,
  WorkedExample, MiniQuiz,
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
        { titulo: "Caso resuelto · panadería · ciclo completo", componente: EscCaso },
        { titulo: "Mnemotecnia + errores típicos", componente: EscMnemo },
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
      <Hook>
        Doña Rosa vende 50 panes el martes a las 10:30 AM. Cobra 75 Bs.<br /><br />
        Ese único hecho, antes de aparecer en sus estados financieros del mes, tiene que pasar por{" "}
        <strong>6 etapas ordenadas</strong>. <em>Eso es el ciclo contable.</em>
      </Hook>
      <Definicion termino="ciclo contable">
        Proceso que sigue la contabilidad <strong>desde el registro de las transacciones hasta la
        emisión de los estados financieros</strong>. Es un CICLO porque se repite cada período
        (mes, trimestre, año).
      </Definicion>
      <Parrafo>
        Cada etapa se apoya en la anterior y prepara la siguiente. Cuando termina, se reinicia con
        las transacciones del período siguiente.
      </Parrafo>
      <Conexion>
        Vamos a usar a Doña Rosa (la panadera de la lección anterior) como hilo conductor. Vas a ver
        cómo UNA venta de 75 Bs viaja por las 6 etapas hasta llegar al Estado de Resultados.
      </Conexion>
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
        Identificar qué cuentas se afectan, en qué dirección (débito o crédito) y por qué monto.
        Sin esta etapa, todo lo demás es imposible.
      </Definicion>
      <Ejemplo titulo="Caso doña Rosa">
        Doña Rosa vende 50 panes a un cliente y recibe 75 Bs en efectivo.<br /><br />
        <strong>Análisis:</strong><br />
        • Caja AUMENTA en 75 Bs (entra dinero).<br />
        • Ingresos por ventas AUMENTAN en 75 Bs (se generó un ingreso).<br /><br />
        Son las DOS cuentas que tocás. Eso es la partida doble en acción.
      </Ejemplo>
      <Misconception>
        <strong>"Si entró efectivo, solo se anota en Caja."</strong> No. La partida doble exige
        identificar SIEMPRE 2 cuentas como mínimo. Sin la contracuenta (Ingresos en este caso), la
        ecuación A=P+Pn se rompería.
      </Misconception>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>2 · Libro diario · 3 · Mayorización</Titulo>
      <Definicion termino="libro diario">
        Las transacciones se anotan en orden <strong>cronológico</strong> (la fecha en que
        ocurrieron).
      </Definicion>
      <Definicion termino="mayorización">
        Pasar las transacciones del diario al <strong>libro mayor</strong>: ahora se agrupan{" "}
        <strong>por cuenta</strong>, sin importar la fecha.
      </Definicion>
      <WorkedExample titulo="Caja en el libro mayor de doña Rosa">
        <table style={{ width: "100%", fontSize: 13, lineHeight: 1.7, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1.5px solid ${LIENZO.fg}` }}>
              <th style={{ textAlign: "left", padding: "4px 8px" }}>Fecha</th>
              <th style={{ textAlign: "left", padding: "4px 8px" }}>Concepto</th>
              <th style={{ textAlign: "right", padding: "4px 8px", color: LIENZO.ok }}>Débito (entra)</th>
              <th style={{ textAlign: "right", padding: "4px 8px", color: LIENZO.bad }}>Crédito (sale)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>01/04</td><td>Aporte inicial</td><td style={{ textAlign: "right" }}>20 000</td><td></td></tr>
            <tr><td>01/04</td><td>Préstamo banco</td><td style={{ textAlign: "right" }}>10 000</td><td></td></tr>
            <tr><td>02/04</td><td>Compra horno</td><td></td><td style={{ textAlign: "right" }}>15 000</td></tr>
            <tr><td>02/04</td><td>Compra harina</td><td></td><td style={{ textAlign: "right" }}>5 000</td></tr>
            <tr><td>15/04</td><td>Venta de pan</td><td style={{ textAlign: "right" }}>75</td><td></td></tr>
            <tr style={{ borderTop: `1px solid ${LIENZO.fgFaint}` }}>
              <td colSpan={2}><strong>SALDO</strong></td>
              <td style={{ textAlign: "right" }} colSpan={2}><strong>10 075 Bs</strong></td>
            </tr>
          </tbody>
        </table>
      </WorkedExample>
      <PorQue>
        El diario muestra QUÉ pasó cada día. El mayor muestra el SALDO ACTUAL de cada cuenta. Son
        las dos vistas del mismo dato, organizadas distinto.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>4 · Balanza de comprobación</Titulo>
      <Hook>
        Imaginate que pasaste 200 transacciones del diario al mayor a mano. ¿Cómo sabés si te
        equivocaste en una? <strong>Con la balanza de comprobación.</strong>
      </Hook>
      <Definicion termino="balanza de comprobación">
        Verificación de que el total de <strong>débitos = total de créditos</strong>. Es la primera
        red de seguridad: si NO cuadra, hay un error en algún registro.
      </Definicion>
      <Ejemplo titulo="Ejemplo numérico">
        Total de débitos: 250 000 Bs<br />
        Total de créditos: 250 000 Bs<br />
        <strong style={{ color: LIENZO.ok }}>✓ Cuadrado.</strong><br /><br />
        Si los débitos hubieran sumado 240 000 y los créditos 250 000, hay diferencia de 10 000.
        Algo falta o sobra.
      </Ejemplo>
      <Misconception>
        <strong>"Si cuadra, no hay errores."</strong> Falso. La balanza solo detecta errores de
        MONTO. Si registraste una transacción en la cuenta equivocada (pero con el monto correcto),
        la balanza cuadra igual y el error queda escondido. Por eso después vienen los ajustes y la
        revisión humana.
      </Misconception>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>5 · Ajustes · 6 · Estados financieros</Titulo>
      <Definicion termino="ajustes contables">
        Correcciones o registros adicionales necesarios al CIERRE del período: depreciaciones,
        amortizaciones, devengamientos, cuentas por cobrar incobrables.
      </Definicion>
      <Ejemplo titulo="Caso doña Rosa · ajuste de depreciación">
        El horno que compró costó 15 000 Bs y se estima que dura 10 años. <br /><br />
        Cada año pierde valor en 1 500 Bs (15 000 / 10). Eso NO es plata que sale de la caja, pero
        SÍ es un gasto del período. Se registra como AJUSTE al cierre:<br /><br />
        <strong>Débito: Depreciación de Equipos · 1 500 Bs</strong><br />
        <strong>Crédito: Depreciación acumulada · 1 500 Bs</strong>
      </Ejemplo>
      <Definicion termino="elaboración de estados financieros">
        Una vez ajustadas las cuentas, se crean los 4 estados (Balance General, Resultados, Flujos
        de Efectivo, Cambios en el Patrimonio) que viste en la lección anterior.
      </Definicion>
      <PorQue>
        Cerrado el período, se cierran las cuentas de resultado (ingresos, gastos), su saldo neto va
        al PATRIMONIO, y empieza el ciclo nuevamente con los saldos del nuevo período.
      </PorQue>
    </EscenaRica>
  );
}

function EscCaso() {
  return (
    <EscenaRica>
      <Titulo>Caso resuelto · ciclo completo con doña Rosa</Titulo>
      <Parrafo>
        Veamos cómo UNA venta de 75 Bs viaja por las 6 etapas:
      </Parrafo>
      <WorkedExample titulo="Venta del 15 de abril · 50 panes a 75 Bs">
        <p style={{ margin: "0 0 8px" }}>
          <strong>Etapa 1 · Análisis:</strong> entró efectivo (Caja↑) por una venta (Ingresos↑).
          Las 2 cuentas afectadas: Caja y Ventas. Monto: 75 Bs cada una.
        </p>
        <p style={{ margin: "0 0 8px" }}>
          <strong>Etapa 2 · Libro diario:</strong> se anota cronológicamente: "15/04 · Caja 75 (D)
          / Ventas 75 (C) · Venta 50 panes".
        </p>
        <p style={{ margin: "0 0 8px" }}>
          <strong>Etapa 3 · Mayorización:</strong> el monto pasa al libro mayor:<br />
          • En la cuenta CAJA: +75 al saldo.<br />
          • En la cuenta VENTAS: +75 al saldo.
        </p>
        <p style={{ margin: "0 0 8px" }}>
          <strong>Etapa 4 · Balanza de comprobación al 30/04:</strong> sumamos todos los débitos
          (incluye los 75) y todos los créditos (incluye los 75). Si cuadran, seguimos. Si no,
          investigamos.
        </p>
        <p style={{ margin: "0 0 8px" }}>
          <strong>Etapa 5 · Ajustes de cierre:</strong> el horno se deprecia (1 500/12 = 125 Bs en
          el mes). Cuentas por cobrar: ninguna (vendió al contado). Stock de harina al final del
          mes: 1 000 Bs (se "consumió" 4 000 Bs de harina).
        </p>
        <p style={{ margin: "0 0 8px" }}>
          <strong>Etapa 6 · Estados financieros:</strong><br />
          • <strong>Estado de Resultados:</strong> Ventas 12 000, − Costo de harina 4 000, − Depreciación
          125 = Utilidad 7 875 Bs.<br />
          • <strong>Balance General al 30/04:</strong> Activo 33 000 (Caja 17 000 + Horno neto 14 875 +
          Harina 1 000) = Pasivo (Préstamo) 5 000 + Patrimonio 28 000. ✓
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <strong>Conclusión:</strong> los 75 Bs de la venta del 15/04 son ahora una parte de la
          utilidad 7 875 Bs, y eso ya está en el patrimonio del balance. Recorrieron las 6 etapas
          completas.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function EscMnemo() {
  return (
    <EscenaRica>
      <Titulo>Mnemotecnia + errores típicos</Titulo>
      <Mnemotecnia>
        <strong>Para recordar las 6 etapas en orden: "AD-MA-BAES"</strong><br /><br />
        <strong>A</strong>nálisis · <strong>D</strong>iario · <strong>MA</strong>yor ·
        <strong> BA</strong>lanza · a<strong>E</strong>justes · <strong>S</strong>tados financieros.
        <br /><br />
        O en sigla más corta: <strong>"A D M B A E"</strong> (6 letras = 6 etapas, en orden).
      </Mnemotecnia>
      <Misconception titulo="Error 1 · saltarse el análisis">
        Muchos empiezan a anotar directamente en el diario sin pensar QUÉ cuentas afectan. Resultado:
        registros mal hechos que la balanza no detecta. El análisis NO es opcional.
      </Misconception>
      <Misconception titulo="Error 2 · creer que la balanza prueba que todo está bien">
        Si confundís una cuenta con otra (Caja en vez de Banco) pero el monto está bien, la balanza
        cuadra. La balanza solo detecta diferencias en SUMAS, no en CLASIFICACIÓN.
      </Misconception>
      <Misconception titulo="Error 3 · olvidar la depreciación">
        El activo fijo se desgasta aunque no salga efectivo. Si no lo registrás como ajuste, tu
        utilidad sale inflada (más alta de la real).
      </Misconception>
      <Conexion>
        Estas 6 etapas se aplican en TODAS las empresas, sean panaderías o multinacionales. La
        diferencia es solo el volumen de transacciones, no el procedimiento.
      </Conexion>
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
        { p: "Doña Rosa vende pan por 75 Bs en efectivo. ¿Qué cuentas afecta?", o: [
          "Solo Caja",
          "Caja y Ventas",
          "Solo Ventas",
          "Banco y Patrimonio",
        ], c: 1, ex: "Partida doble: entró efectivo (Caja↑) por un ingreso de ventas (Ventas↑). Siempre 2 cuentas." },
        { p: "Si la balanza de comprobación cuadra, podemos asegurar que:", o: [
          "no hay ningún error",
          "los TOTALES son correctos, pero la clasificación por cuenta puede tener errores",
          "los estados financieros están listos",
          "no hace falta hacer ajustes",
        ], c: 1, ex: "La balanza solo verifica que débitos = créditos. Errores de clasificación (cuenta equivocada con monto correcto) NO los detecta." },
        { p: "El acrónimo AD-MA-BA-ES sirve para recordar:", o: [
          "las cuentas del Plan de Cuentas",
          "los 4 estados financieros",
          "las 6 etapas del ciclo contable",
          "los principios PCGA",
        ], c: 2, ex: "Análisis, Diario, Mayor, Balanza, Ajustes, Estados financieros." },
      ]} />
    </EscenaRica>
  );
}
