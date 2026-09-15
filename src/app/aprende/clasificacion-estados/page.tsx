"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
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
        { titulo: "Por qué importa la contabilidad", componente: EscHook },
        { titulo: "Ramas de la contabilidad", componente: Esc01 },
        { titulo: "Estados financieros: qué son", componente: Esc02 },
        { titulo: "La ecuación A = P + Pn (núcleo)", componente: Esc03 },
        { titulo: "Caso resuelto · panadería boliviana", componente: Esc03b },
        { titulo: "Estado de Resultados", componente: Esc04 },
        { titulo: "Estado de Flujos de Efectivo", componente: Esc05 },
        { titulo: "Estado de Cambios en el Patrimonio", componente: Esc06 },
        { titulo: "Mnemotecnia · qué muestra cada estado", componente: EscMnemo },
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

function EscHook() {
  return (
    <EscenaRica>
      <Titulo>Por qué importa la contabilidad</Titulo>
      <Hook>
        Vas a abrir una panadería en El Alto. Pones 20 000 Bs de tu plata + un préstamo de 10 000
        del banco. Compras el horno (15 000), harina inicial (5 000), y guardas 10 000 en caja para
        emergencias.<br /><br />
        Tres meses después, alguien te pregunta: <strong>"¿tu negocio es rentable?"</strong>
        <br /><br />
        Sin contabilidad, NO puedes responder. Con contabilidad, sí.
      </Hook>
      <Parrafo>
        Esta lección te enseña los <strong>4 informes</strong> que toda empresa usa para responder
        esa pregunta. Antes del 4, viene la ecuación que sostiene todo: <strong>A = P + Pn</strong>.
      </Parrafo>
      <CasoBolivia>
        En Bolivia, las microempresas representan ~85% del empleo total. Muchas no llevan
        contabilidad formal: y por eso muchas quiebran sin entender por qué. Saber estos conceptos
        es la diferencia entre administrar a ciegas o con información.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc01() {
  return (
    <EscenaRica>
      <Titulo>Las 4 ramas de la contabilidad</Titulo>
      <Parrafo>
        No toda la contabilidad sirve para lo mismo. Hay 4 ramas, cada una con un usuario y un
        propósito distinto:
      </Parrafo>
      <Resumen>
        <strong>Contabilidad financiera</strong>: para usuarios <em>EXTERNOS</em>: socios, bancos,
        inversores, fisco (SIN: Servicio de Impuestos Nacionales).<br /><br />
        <strong>Contabilidad administrativa</strong>: para uso <em>INTERNO</em>: el gerente decide
        precios, costos, expansión.<br /><br />
        <strong>Contabilidad de costos</strong>: desglosa cuánto cuesta REALMENTE producir cada
        bien o servicio.<br /><br />
        <strong>Contabilidad fiscal o tributaria</strong>: calcula los impuestos a pagar (IT, IVA,
        IUE en Bolivia).
      </Resumen>
      <Misconception>
        <strong>"La contabilidad es solo para pagar impuestos."</strong> Falso. Esa es la
        contabilidad fiscal, UNA de las 4 ramas. La administrativa te dice si conviene contratar más
        empleados; la de costos te dice qué producto te deja más margen. Las dos son más útiles para
        tomar decisiones diarias.
      </Misconception>
      <MiniQuiz
        pregunta="Un dueño quiere decidir si subir el precio del pan. ¿Qué rama de contabilidad mira?"
        opciones={[
          "Fiscal, porque tiene que ver con plata.",
          "Administrativa o de costos.",
          "Financiera, porque es información oficial.",
        ]}
        correctaIdx={1}
        explicacion="Las decisiones internas las soporta la contabilidad administrativa (estrategia) y la de costos (cuánto le cuesta el insumo). La financiera y la fiscal son para reportar afuera."
      />
    </EscenaRica>
  );
}

function Esc02() {
  return (
    <EscenaRica>
      <Titulo>Los 4 estados financieros</Titulo>
      <Definicion termino="estados financieros">
        Informes más relevantes que resultan del proceso contable. Resumen y presentan la
        información para todos los usuarios. Son <strong>cuatro</strong>:
      </Definicion>
      <Resumen>
        <strong>1. Balance General</strong>: la <em>FOTO</em>: Activo, Pasivo, Patrimonio a una
        fecha.<br /><br />
        <strong>2. Estado de Resultados</strong>: la <em>PELÍCULA</em>: ingresos, gastos, resultado
        durante un período.<br /><br />
        <strong>3. Estado de Flujos de Efectivo</strong>: la plata que <em>ENTRA Y SALE</em> en
        efectivo durante el período.<br /><br />
        <strong>4. Estado de Cambios en el Patrimonio</strong>: cómo cambió la <em>PARTE DE LOS
        DUEÑOS</em> durante el período.
      </Resumen>
      <PorQue>
        Cada estado responde una pregunta distinta. Por eso son 4 y no 1: necesitas verlos juntos
        para tener el panorama completo.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>La ecuación contable · A = P + Pn</Titulo>
      <Hook>
        ¿Por qué la contabilidad funciona? Porque se sostiene sobre UNA ecuación que NUNCA falla:
        <br /><br />
        <strong style={{ fontSize: 22 }}>Activo = Pasivo + Patrimonio</strong>
        <br /><br />
        Si tus libros NO cumplen esa ecuación, hay un error en algún registro. Si CUMPLEN, los
        números son coherentes.
      </Hook>
      <BalanzaAPP />
      <Definicion termino="A = P + Pn">
        Todo lo que la empresa TIENE (Activo) viene de DOS fuentes: lo que DEBE a terceros (Pasivo)
        + lo que aportaron sus DUEÑOS / generó por sí misma (Patrimonio).
      </Definicion>
      <Misconception>
        <strong>"El Patrimonio (Pn) es la plata en caja."</strong> No. El Patrimonio es la parte que
        corresponde a los dueños del negocio: incluye su aporte inicial + utilidades acumuladas.
        Puede estar invertido en máquinas, en mercadería, en cuentas por cobrar… NO solo en efectivo.
      </Misconception>
      <Misconception>
        <strong>"Si tengo más Activo, soy más rico."</strong> Tampoco. Más Activo puede significar
        más Pasivo (más deudas) y mismo Patrimonio. Lo que importa para "qué tan rica está la
        empresa" es el PATRIMONIO (lo que queda después de pagar lo que se debe).
      </Misconception>
      <Conexion>
        La ecuación A = P + Pn es la consecuencia directa del <em>principio de partida doble</em>
        (Pacioli, 1494). Cada transacción mueve por lo menos 2 cuentas: por eso la ecuación NUNCA
        se rompe.
      </Conexion>
    </EscenaRica>
  );
}

function Esc03b() {
  return (
    <EscenaRica>
      <Titulo>Caso resuelto · panadería boliviana paso a paso</Titulo>
      <Parrafo>
        Apliquemos A = P + Pn a la panadería en El Alto del Hook inicial:
      </Parrafo>
      <WorkedExample titulo="Panadería 'Pan de Cada Día' · 5 transacciones">
        <p style={{ margin: "0 0 8px" }}><strong>Día 1 · Doña Rosa abre el negocio:</strong></p>
        <p style={{ margin: "0 0 6px", paddingLeft: 12 }}>
          Aporta 20 000 Bs de su plata. Pide préstamo bancario de 10 000 Bs.<br />
          → Activo (Caja): <strong>30 000</strong> · Pasivo (Préstamo): <strong>10 000</strong> ·
          Patrimonio: <strong>20 000</strong>.<br />
          <em>30 000 = 10 000 + 20 000 ✓</em>
        </p>
        <p style={{ margin: "10px 0 8px" }}><strong>Día 2 · Compra horno + harina:</strong></p>
        <p style={{ margin: "0 0 6px", paddingLeft: 12 }}>
          Saca 20 000 de caja: 15 000 horno + 5 000 harina.<br />
          → Caja: <strong>10 000</strong> · Horno: <strong>15 000</strong> · Harina: <strong>5 000</strong> · Pasivo:
          <strong>10 000</strong> · Patrimonio: <strong>20 000</strong>.<br />
          <em>30 000 = 10 000 + 20 000 ✓</em> (la mezcla cambió, el total no).
        </p>
        <p style={{ margin: "10px 0 8px" }}><strong>Día 30 · Vende todo el mes:</strong></p>
        <p style={{ margin: "0 0 6px", paddingLeft: 12 }}>
          Vendió 12 000 Bs en pan, le quedan 1 000 Bs de harina (gastó 4 000 Bs).<br />
          → Caja: 10 000 + 12 000 = <strong>22 000</strong> · Horno: <strong>15 000</strong> · Harina:
          <strong>1 000</strong>. Total activo: <strong>38 000</strong>.<br />
          Pasivo sigue <strong>10 000</strong>. Patrimonio: 20 000 (aporte) + 8 000 (ganancia del mes) =
          <strong>28 000</strong>.<br />
          <em>38 000 = 10 000 + 28 000 ✓</em>
        </p>
        <p style={{ margin: "10px 0 8px" }}><strong>Día 60 · Paga 5 000 del préstamo:</strong></p>
        <p style={{ margin: "0 0 6px", paddingLeft: 12 }}>
          Saca 5 000 de caja para pagar al banco.<br />
          → Caja: <strong>17 000</strong> · Pasivo: <strong>5 000</strong> · Patrimonio:{" "}
          <strong>28 000</strong>. Total activo: <strong>33 000</strong>.<br />
          <em>33 000 = 5 000 + 28 000 ✓</em>
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <strong>Conclusión:</strong> en 60 días, doña Rosa pasó de tener un patrimonio de 20 000
          (su aporte) a 28 000 (con la ganancia). Su negocio es <strong>rentable</strong>. Esa es la
          pregunta del Hook inicial, respondida con los números.
        </p>
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc04() {
  return (
    <EscenaRica>
      <Titulo>Estado de Resultados · ganancia o pérdida del período</Titulo>
      <Definicion termino="estado de resultados">
        Muestra el <strong>rendimiento</strong> de la empresa durante un período (mes, trimestre,
        año). Refleja ingresos, gastos y el resultado neto (ganancia o pérdida).
      </Definicion>
      <WorkedExample titulo="Estado de Resultados de la panadería · mes 1">
        <table style={{ width: "100%", fontSize: 14, lineHeight: 1.7, borderCollapse: "collapse" }}>
          <tbody>
            <tr><td>Ingresos por venta de pan</td><td style={{ textAlign: "right" }}>12 000 Bs</td></tr>
            <tr><td>− Costo de la harina vendida</td><td style={{ textAlign: "right" }}>− 4 000 Bs</td></tr>
            <tr style={{ borderTop: `1px solid ${LIENZO.fgFaint}` }}>
              <td><strong>Utilidad bruta</strong></td><td style={{ textAlign: "right" }}><strong>8 000 Bs</strong></td>
            </tr>
            <tr><td>− Sueldo de la ayudante</td><td style={{ textAlign: "right" }}>− 0 Bs</td></tr>
            <tr><td>− Gas / luz / agua</td><td style={{ textAlign: "right" }}>− 0 Bs</td></tr>
            <tr style={{ borderTop: `2px solid ${LIENZO.ok}` }}>
              <td><strong>UTILIDAD NETA</strong></td>
              <td style={{ textAlign: "right", color: LIENZO.ok }}><strong>8 000 Bs</strong></td>
            </tr>
          </tbody>
        </table>
      </WorkedExample>
      <PorQue>
        Si el Balance General es la FOTO del patrimonio a un día, el Estado de Resultados es la
        PELÍCULA de cómo ese patrimonio cambió durante el período.<br /><br />
        Por eso ves arriba que la "Utilidad neta" del mes (8 000 Bs) coincide con lo que sumamos al
        Patrimonio en el balance (20 000 → 28 000).
      </PorQue>
    </EscenaRica>
  );
}

function Esc05() {
  return (
    <EscenaRica>
      <Titulo>Estado de Flujos de Efectivo · plata que entra y sale</Titulo>
      <Hook>
        Una empresa puede tener <strong>utilidad de 100 000 Bs</strong> en el papel… y NO poder
        pagar el sueldo del mes. <strong>¿Cómo es eso posible?</strong>
      </Hook>
      <Definicion termino="estado de flujos de efectivo">
        Detalla los <strong>movimientos de efectivo</strong> y sus fuentes a lo largo de un período,
        agrupados en tres actividades:
      </Definicion>
      <Resumen>
        <strong>Operativas</strong>: efectivo de la actividad principal (ventas cobradas, sueldos
        pagados, compras de insumos).<br /><br />
        <strong>Inversión</strong>: compra/venta de activos de largo plazo (horno, vehículo,
        local).<br /><br />
        <strong>Financiamiento</strong>: préstamos recibidos o pagados, aportes de socios, pagos
        de dividendos.
      </Resumen>
      <Misconception>
        <strong>"Utilidad = efectivo."</strong> NO. La utilidad puede estar atrapada en las cuentas
        por cobrar (vendiste pero no cobraste), o en inventario que no se vendió. El estado de
        flujos te dice si REALMENTE entró plata.
      </Misconception>
      <CasoBolivia>
        Muchas pymes bolivianas quiebran <em>aun siendo rentables en el papel</em>: vendieron al
        crédito y no cobraron a tiempo. Cuando llega la fecha de pagar el sueldo o el alquiler, no
        tienen efectivo. Por eso este estado es el más mirado por los bancos antes de prestar.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc06() {
  return (
    <EscenaRica>
      <Titulo>Estado de Cambios en el Patrimonio</Titulo>
      <Definicion termino="estado de cambios en el patrimonio">
        Informa sobre los movimientos en el patrimonio durante un período: aportes de capital,
        retiros de socios, utilidades acumuladas, distribución de dividendos.
      </Definicion>
      <WorkedExample titulo="Ejemplo · una S.R.L. boliviana al cierre del año">
        <table style={{ width: "100%", fontSize: 14, lineHeight: 1.7, borderCollapse: "collapse" }}>
          <tbody>
            <tr><td>Patrimonio al 01/01</td><td style={{ textAlign: "right" }}>100 000 Bs</td></tr>
            <tr><td>+ Aporte nuevo de socios</td><td style={{ textAlign: "right", color: LIENZO.ok }}>+ 20 000 Bs</td></tr>
            <tr><td>+ Utilidad del ejercicio</td><td style={{ textAlign: "right", color: LIENZO.ok }}>+ 30 000 Bs</td></tr>
            <tr><td>− Dividendos pagados a socios</td><td style={{ textAlign: "right", color: LIENZO.bad }}>− 10 000 Bs</td></tr>
            <tr style={{ borderTop: `2px solid ${LIENZO.ok}` }}>
              <td><strong>Patrimonio al 31/12</strong></td>
              <td style={{ textAlign: "right", color: LIENZO.ok }}><strong>140 000 Bs</strong></td>
            </tr>
          </tbody>
        </table>
      </WorkedExample>
      <Conexion>
        El "Patrimonio al 31/12" de este estado tiene que coincidir EXACTAMENTE con el Patrimonio
        del Balance General a esa fecha. Es la conexión que verifica que los estados son
        consistentes entre sí.
      </Conexion>
    </EscenaRica>
  );
}

function EscMnemo() {
  return (
    <EscenaRica>
      <Titulo>Mnemotecnia · qué responde cada estado</Titulo>
      <Mnemotecnia>
        Cada estado responde UNA pregunta clave. Asociar pregunta-estado es la forma más fácil de
        recordarlos:
        <div style={{ marginTop: 14, padding: 14, background: "#fff", borderRadius: 10, border: `1px solid ${LIENZO.fgFaint}` }}>
          <div style={{ fontSize: 14, marginBottom: 12 }}>
            <strong style={{ color: LIENZO.accent }}>1. Balance General</strong> · "¿Qué TENGO y qué DEBO hoy?"<br />
            <span style={{ color: LIENZO.fgDim, fontSize: 13 }}>→ Foto a una fecha. A = P + Pn.</span>
          </div>
          <div style={{ fontSize: 14, marginBottom: 12 }}>
            <strong style={{ color: LIENZO.ok }}>2. Estado de Resultados</strong> · "¿GANÉ o PERDÍ este período?"<br />
            <span style={{ color: LIENZO.fgDim, fontSize: 13 }}>→ Película. Ingresos − Gastos = Utilidad.</span>
          </div>
          <div style={{ fontSize: 14, marginBottom: 12 }}>
            <strong style={{ color: LIENZO.warn }}>3. Flujos de Efectivo</strong> · "¿Cuánto ENTRÓ y SALIÓ de mi caja?"<br />
            <span style={{ color: LIENZO.fgDim, fontSize: 13 }}>→ Operativas + Inversión + Financiamiento.</span>
          </div>
          <div style={{ fontSize: 14 }}>
            <strong style={{ color: LIENZO.bad }}>4. Cambios en Patrimonio</strong> · "¿CÓMO se movió la parte de los DUEÑOS?"<br />
            <span style={{ color: LIENZO.fgDim, fontSize: 13 }}>→ Aportes + Utilidad − Retiros.</span>
          </div>
        </div>
      </Mnemotecnia>
      <Mnemotecnia>
        <strong>Truco para recordar los 4 en orden:</strong>{" "}
        <em>"BREC"</em> · <strong>B</strong>alance, <strong>R</strong>esultados, <strong>E</strong>fectivo,
        <strong> C</strong>ambios en Patrimonio.
      </Mnemotecnia>
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
        { p: "Doña Rosa aporta 20 000 Bs y pide préstamo de 10 000. Su Patrimonio inicial es:", o: [
          "30 000", "20 000", "10 000", "0",
        ], c: 1, ex: "El préstamo es PASIVO, no patrimonio. El patrimonio es solo lo que ella aportó: 20 000." },
        { p: "El Patrimonio final del estado de cambios DEBE coincidir con:", o: [
          "la utilidad neta del período",
          "el efectivo en caja al final",
          "el patrimonio del Balance General a la misma fecha",
          "los aportes de socios",
        ], c: 2, ex: "Las cifras del estado deben cuadrar con el Balance General. Si no, hay un error." },
        { p: "El truco BREC sirve para recordar:", o: [
          "las ramas de la contabilidad",
          "los 4 estados financieros en orden",
          "los principios contables",
          "los tipos de empresas",
        ], c: 1, ex: "Balance · Resultados · Efectivo · Cambios en Patrimonio." },
      ]} />
    </EscenaRica>
  );
}
