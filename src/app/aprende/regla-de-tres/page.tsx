"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
  cajaAnim, Stage, IconoToque, EtiquetaToque } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Regla de tres · Interés simple"
      escenas={[
        { titulo: "¿Qué es regla de tres?", componente: Esc01_Intro },
        { titulo: "Directa vs inversa", componente: Esc02_DirVsInv },
        { titulo: "Regla de tres DIRECTA", componente: Esc03_Directa },
        { titulo: "Regla de tres INVERSA", componente: Esc04_Inversa },
        { titulo: "Identificar el tipo", componente: Esc05_Identificar },
        { titulo: "Porcentajes con regla de tres", componente: Esc06_Porcent },
        { titulo: "Interés simple: el concepto", componente: Esc07_IntInt },
        { titulo: "Interés simple: la fórmula", componente: Esc08_IntFor },
        { titulo: "Errores comunes", componente: Esc09_Errores },
        { titulo: "Práctica final", componente: Esc10_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Regla de tres: el atajo más útil</Titulo>
      <Parrafo>
        La <strong>regla de tres</strong> es un método rápido para resolver problemas
        de proporcionalidad cuando conoces <strong>3 valores</strong> y necesitas el cuarto.
      </Parrafo>
      <Resumen>
        🎯 Ejemplos donde la usas:<br />
        • Calcular el precio total de N kilos a partir del precio de 1 kg.<br />
        • Cuántos días tardan X obreros vs Y obreros.<br />
        • Calcular porcentajes (descuentos, propinas, IVA).<br />
        • Convertir unidades (km/h vs m/s).<br />
        • Cualquier "problema verbal" que pida una proporción.
      </Resumen>
      <PorQue>
        La regla de tres no es magia: es <strong>la propiedad fundamental de las
        proporciones aplicada</strong>. Lo que ves como "atajo" es solo el despeje.
      </PorQue>

      <Hook>
        La regla de tres + porcentajes + interés simple suman <strong>6-10 preguntas</strong> en
        el examen UMSS. Es la unidad de matemática con mejor rendimiento esfuerzo/puntos. Si
        dominas identificar "directa vs inversa", resuelves todas en menos de 30 segundos.
      </Hook>

      <Mnemotecnia>
        <strong>Test "↓↓ vs ↓↑"</strong> antes de hacer cualquier cálculo:<br />
        Dibuja DOS FLECHAS al lado de las dos columnas.<br />
        • Si las dos van hacia ABAJO → DIRECTA → multiplicas en CRUZ.<br />
        • Si una va arriba y otra abajo → INVERSA → multiplicas EN LÍNEA.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_DirVsInv() {
  return (
    <EscenaRica>
      <Titulo>Dos tipos: directa e inversa</Titulo>
      <Parrafo>
        Antes de resolver, hay que identificar de qué tipo es el problema:
      </Parrafo>

      <Ejemplo titulo="DIRECTA (las dos cantidades van JUNTAS)">
        <Paso n={1}>Más kilos → más bolivianos</Paso>
        <Paso n={2}>Más horas trabajadas → más dinero ganado</Paso>
        <Paso n={3}>Más litros de pintura → más metros cubiertos</Paso>
        <div style={{ marginTop: 6, color: COLOR_OK, fontWeight: 700, fontSize: 13 }}>
          Cuando una sube, la otra sube. Cuando una baja, la otra baja.
        </div>
      </Ejemplo>

      <Ejemplo titulo="INVERSA (van en SENTIDO OPUESTO)">
        <Paso n={1}>Más obreros → MENOS días para terminar</Paso>
        <Paso n={2}>Más velocidad → MENOS tiempo de viaje</Paso>
        <Paso n={3}>Más máquinas → MENOS horas de trabajo</Paso>
        <div style={{ marginTop: 6, color: COLOR_BAD, fontWeight: 700, fontSize: 13 }}>
          Cuando una sube, la otra baja. Y al revés.
        </div>
      </Ejemplo>

      <Cuidado>
        <strong>Test mental rápido</strong>: si "duplico la primera cantidad, ¿qué pasa con
        la segunda?"<br />
        Si también se duplica → DIRECTA.<br />
        Si se reduce a la mitad → INVERSA.
      </Cuidado>
    </EscenaRica>
  );
}

function Esc03_Directa() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Regla de tres DIRECTA</Titulo>

      <Resumen>
        Cuando es directa, multiplicas <strong>en CRUZ</strong> y divides por el
        número que queda. Fórmula: <strong>x = (b · c) / a</strong> si el planteo es
        a → b, c → x.
      </Resumen>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <EtiquetaToque>SI 3 kg CUESTAN 60 Bs, ¿CUÁNTO CUESTAN 5 kg?</EtiquetaToque>
        <Stage w={380} h={180}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 12, columnGap: 30, padding: "10px 30px", textAlign: "center", fontFamily: "var(--font-crimson), serif" }}>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>KG</div>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>BS</div>
            <div style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700 }}>3</div>
            <div style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700 }}>60</div>
            <div style={{ fontSize: 28, color: COLOR_OK, fontWeight: 700 }}>5</div>
            <div style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 800 }}>x</div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 10, top: 65, fontSize: 22, color: COLOR_OK }}>↓</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.2 }}
            style={{ position: "absolute", right: 10, top: 65, fontSize: 22, color: COLOR_OK }}>↓</motion.div>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ position: "absolute", left: 0, top: 140, width: "100%", textAlign: "center", fontSize: 18, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            x = (5 · 60) / 3 = 300/3
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 165, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
            x = 100 Bs ✓
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "Conocemos 3 de 4 valores. Falta x"}
          {paso === 1 && "Ambas flechas hacia abajo (directa): más kg, más Bs"}
          {paso === 2 && "Multiplico en cruz: 5 × 60, divido por 3"}
          {paso === 3 && "Resultado: 100 Bs"}
        </div>
      </div>

      <Ejemplo titulo="Más ejemplos">
        <Paso n={1}>Si 5 lápices cuestan 25 Bs, ¿cuánto cuestan 12? → (12·25)/5 = 60 Bs.</Paso>
        <Paso n={2}>Si camino 4 km en 1 h, ¿cuánto en 3.5 h? → (3.5·4)/1 = 14 km.</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc04_Inversa() {
  const [paso, setPaso] = useState(0);
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Regla de tres INVERSA</Titulo>

      <Resumen>
        Cuando es inversa, multiplicas <strong>EN LÍNEA</strong> (no en cruz).
        Fórmula: <strong>x = (a · b) / c</strong> si el planteo es a → b, c → x.
      </Resumen>

      <div onClick={() => setPaso((p) => p >= 3 ? 0 : p + 1)} style={cajaAnim()}>
        <EtiquetaToque>4 OBREROS TARDAN 12 DÍAS. ¿CUÁNTO TARDAN 6 OBREROS?</EtiquetaToque>
        <Stage w={380} h={180}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 12, columnGap: 30, padding: "10px 30px", textAlign: "center", fontFamily: "var(--font-crimson), serif" }}>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>OBREROS</div>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", fontWeight: 700, letterSpacing: 1 }}>DÍAS</div>
            <div style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700 }}>4</div>
            <div style={{ fontSize: 28, color: COLOR_BASE, fontWeight: 700 }}>12</div>
            <div style={{ fontSize: 28, color: COLOR_OK, fontWeight: 700 }}>6</div>
            <div style={{ fontSize: 28, color: COLOR_EXP, fontWeight: 800 }}>x</div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }}
            style={{ position: "absolute", left: 10, top: 65, fontSize: 22, color: COLOR_OK }}>↓</motion.div>
          <motion.div initial={{ opacity: 0 }} animate={paso >= 1 ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.2 }}
            style={{ position: "absolute", right: 10, top: 65, fontSize: 22, color: COLOR_BAD }}>↑</motion.div>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={paso >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            style={{ position: "absolute", left: 0, top: 140, width: "100%", textAlign: "center", fontSize: 18, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>
            x = (4 · 12) / 6 = 48/6
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={paso >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring" }}
            style={{ position: "absolute", left: 0, top: 165, width: "100%", textAlign: "center", fontSize: 22, color: COLOR_OK, fontWeight: 800, fontFamily: "var(--font-crimson), serif" }}>
            x = 8 días ✓
          </motion.div>
        </Stage>
        <div style={{ fontSize: 12, color: "var(--fg-muted)", fontStyle: "italic", textAlign: "center", marginTop: 4 }}>
          {paso === 0 && "4 obreros → 12 días. Con 6 obreros: ¿?"}
          {paso === 1 && "Flechas opuestas: más obreros, menos días (INVERSA)"}
          {paso === 2 && "Acá multiplico EN LÍNEA: 4·12, divido por 6"}
          {paso === 3 && "x = 8 días (menos, lógico: más manos terminan antes)"}
        </div>
      </div>

      <PorQue>
        En INVERSA el producto de a×b es CONSTANTE (4×12 = 48 horas-obrero totales).
        Si tienes 6 obreros, hacen el mismo trabajo total: 6·x = 48, x = 8.
      </PorQue>
    </EscenaRica>
  );
}

function Esc05_Identificar() {
  const [i, setI] = useState(0);
  const casos = [
    { txt: "Más kilos de pan → más bolivianos", tipo: "directa" },
    { txt: "Más obreros → menos días para terminar", tipo: "inversa" },
    { txt: "Más velocidad → menos tiempo de viaje", tipo: "inversa" },
    { txt: "Más horas trabajadas → más sueldo", tipo: "directa" },
    { txt: "Más máquinas → menos horas de producción", tipo: "inversa" },
    { txt: "Más metros de tela → mayor precio", tipo: "directa" },
  ];
  const c = casos[i];
  return (
    <EscenaRica>
      <Titulo>¿Directa o inversa? Test rápido</Titulo>
      <Parrafo>
        Identificar el tipo es el paso más importante. Toca para ver el siguiente caso:
      </Parrafo>
      <div onClick={() => setI((p) => (p + 1) % casos.length)} style={cajaAnim()}>
        <div style={{ minHeight: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 18, color: COLOR_BASE, fontWeight: 700, fontFamily: "var(--font-crimson), serif", textAlign: "center", maxWidth: 400 }}>
            {c.txt}
          </motion.div>
          <motion.div key={`b-${i}`} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            style={{
              padding: "10px 18px", borderRadius: 12,
              background: c.tipo === "directa" ? "linear-gradient(135deg, #d1fae5, #a7f3d0)" : "linear-gradient(135deg, #fef3c7, #fde68a)",
              border: `1.5px solid ${c.tipo === "directa" ? COLOR_OK : "#f59e0b"}`,
              fontSize: 13, fontWeight: 800, color: c.tipo === "directa" ? "#065f46" : "#78350f",
            }}>
            {c.tipo === "directa" ? "↓↓ DIRECTA" : "↓↑ INVERSA"}
          </motion.div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: COLOR_EXP, textAlign: "center", fontWeight: 700 }}>
        Caso {i + 1} de {casos.length} · <IconoToque /> Toca para el siguiente
      </div>
    </EscenaRica>
  );
}

function Esc06_Porcent() {
  return (
    <EscenaRica>
      <Titulo>Porcentajes con regla de tres</Titulo>
      <Parrafo>
        Los porcentajes son <strong>razones cuyo denominador es 100</strong>. Se
        resuelven con regla de tres directa.
      </Parrafo>

      <Ejemplo titulo="¿Cuánto es el 15% de 240?">
        <Paso n={1}>Planteo: 100% → 240 ; 15% → x</Paso>
        <Paso n={2}>x = (15 · 240) / 100 = 3600 / 100 = <strong style={{ color: COLOR_OK }}>36</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="¿Qué porcentaje es 45 de 200?">
        <Paso n={1}>Planteo: 200 → 100% ; 45 → x%</Paso>
        <Paso n={2}>x = (45 · 100) / 200 = <strong style={{ color: COLOR_OK }}>22.5%</strong></Paso>
      </Ejemplo>

      <Ejemplo titulo="Si 60 es el 20% del total, ¿cuánto es el total?">
        <Paso n={1}>Planteo: 20% → 60 ; 100% → x</Paso>
        <Paso n={2}>x = (100 · 60) / 20 = <strong style={{ color: COLOR_OK }}>300</strong></Paso>
      </Ejemplo>

      <Resumen>
        <strong>Tres tipos de problemas de porcentaje</strong>: calcular el % de un número,
        calcular qué % es un número de otro, o calcular el total dado un %. Los tres
        se resuelven con la misma regla de tres directa.
      </Resumen>

      <WorkedExample titulo="Descuento + IVA · supermercado en La Paz">
        Una compra original cuesta <strong>120 Bs</strong>. Te aplican <strong>15% de
        descuento</strong>, y después agregan el <strong>13% de IVA</strong>. ¿Cuánto pagas
        al final?<br /><br />

        <strong>Paso 1 · Descuento:</strong> 15% de 120 = (15·120)/100 = 18 Bs.<br />
        Precio con descuento: 120 − 18 = <strong>102 Bs</strong>.<br /><br />

        <strong>Paso 2 · IVA sobre el descontado:</strong> 13% de 102 = (13·102)/100 = 13,26 Bs.<br />
        Precio final: 102 + 13,26 = <strong>115,26 Bs</strong>.<br /><br />

        <strong>Atajo · "factor único":</strong><br />
        Aplicar 15% de descuento ≡ multiplicar por 0,85.<br />
        Sumar 13% de IVA ≡ multiplicar por 1,13.<br />
        Final = 120 × 0,85 × 1,13 = 120 × 0,9605 = <strong>115,26 Bs</strong>. ✓<br /><br />

        <strong>Truco para el examen:</strong> cuando hay varios % en cadena, los factores se
        multiplican. Más rápido que hacer cada paso por separado.
      </WorkedExample>

      <Misconception titulo="Trampa de los porcentajes en cadena">
        Mucha gente piensa "15% descuento + 13% IVA → como +13% −15% = −2% neto, pago 117,60 Bs".
        ERROR. Los porcentajes NO se suman ni se restan directamente. Aplicalos UNO A UNO sobre
        la base que corresponde, o usa factores multiplicativos.
      </Misconception>
    </EscenaRica>
  );
}

function Esc07_IntInt() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Interés simple: el concepto</Titulo>
      <Parrafo>
        El <strong>interés</strong> es lo que un capital "produce" con el tiempo cuando
        está prestado o invertido. El <strong>interés simple</strong> se calcula siempre
        sobre el capital inicial (no se acumula).
      </Parrafo>

      <Definicion termino="interés simple">
        <strong>I = C · r · t / 100</strong> <br />
        <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>
          C = capital · r = tasa (% anual) · t = tiempo (en años) · I = interés ganado
        </span>
      </Definicion>

      <Ejemplo titulo="Ejemplo intuitivo">
        Invertes <strong>1000 Bs</strong> al <strong>10%</strong> anual durante <strong>3 años</strong>.<br />
        Cada año gana 100 Bs (10% de 1000). En 3 años: 300 Bs de interés.<br />
        Capital final = 1000 + 300 = <strong style={{ color: COLOR_OK }}>1300 Bs</strong>.
      </Ejemplo>

      <PorQue>
        ¿Por qué se llama "simple"? Porque el interés NO se acumula. Si fuera compuesto,
        el 2do año el 10% se calcularía sobre 1100 (capital + interés del 1er año), no
        sobre 1000. Eso es otra fórmula.
      </PorQue>
    </EscenaRica>
  );
}

function Esc08_IntFor() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Interés simple: la fórmula</Titulo>

      <Resumen>
        <span style={{ fontSize: 22, fontFamily: "var(--font-crimson), serif", fontWeight: 800 }}>
          I = C · r · t / 100
        </span>
      </Resumen>

      <Ejemplo titulo="Calculando el interés">
        C = 2000, r = 8% anual, t = 4 años.<br />
        I = (2000 · 8 · 4) / 100 = 64000 / 100 = <strong style={{ color: COLOR_OK }}>640 Bs</strong>.
      </Ejemplo>

      <Ejemplo titulo="Calculando el monto final">
        El <strong>monto</strong> (M) es el capital + el interés acumulado:<br />
        <strong>M = C + I = C · (1 + r·t/100)</strong>
      </Ejemplo>

      <Cuidado>
        Cuidado con las <strong>unidades de tiempo</strong>. Si la tasa es anual pero
        el tiempo es en meses, dives por 12. Si es en días, por 360 (convención
        bancaria).
      </Cuidado>

      <AutoCheck
        pregunta="C = 5000 Bs, r = 6% anual, t = 2 años. ¿Cuál es I?"
        opciones={["600 Bs", "60 Bs", "1200 Bs", "300 Bs"]}
        correctaIdx={0}
        explicacion="I = (5000·6·2)/100 = 60000/100 = 600 Bs."
      />

      <CasoBolivia>
        <strong>Tasas reales en Bolivia (2024-2025):</strong><br />
        • DPF (depósitos a plazo fijo) en bolivianos: <strong>3-5% anual</strong>.<br />
        • Crédito de consumo (tarjeta): <strong>15-22% anual</strong>.<br />
        • Microcrédito productivo: <strong>11-13% anual</strong>.<br />
        • Crédito de vivienda social: <strong>5,5-6,5% anual</strong>.<br /><br />
        Si pides un préstamo de 50.000 Bs a 12% anual por 3 años (interés simple):<br />
        I = (50.000 × 12 × 3) / 100 = <strong>18.000 Bs</strong> de interés.<br />
        Pagas un total de 68.000 Bs (1.888 Bs por mes).
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc09_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Tratar una inversa como directa. <br />
        <span style={{ fontSize: 13 }}>
          Si te dan "más obreros → menos días" y multiplicas en CRUZ como si fuera directa, obtienes un absurdo (más obreros tardan más). Siempre identifica primero.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> Mezclar unidades. <br />
        <span style={{ fontSize: 13 }}>
          Si la tasa es anual y el tiempo en meses, convierte el tiempo a años (mes/12).
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> Confundir capital con monto en interés simple. <br />
        <span style={{ fontSize: 13 }}>
          I = interés ganado. M = capital + interés. Son cosas distintas.
        </span>
      </Cuidado>

      <Conexion>
        Regla de tres es la versión "atajo" de las <strong>proporciones</strong> de la unidad
        anterior. Y conecta con <em>repartos proporcionales</em> (también basados en
        proporciones) y con <em>funciones lineales</em> (la directa es y = kx, la inversa es
        y = k/x).
      </Conexion>
    </EscenaRica>
  );
}

function Esc10_Practica() {
  const ejs = useMemo(() => [
    { p: "Si 6 kg cuestan 90 Bs, ¿cuánto cuestan 10 kg?", o: ["120 Bs", "150 Bs", "135 Bs", "100 Bs"], c: 1, ex: "Directa. (10·90)/6 = 150 Bs." },
    { p: "3 obreros terminan en 12 días. ¿Cuánto tardan 4 obreros?", o: ["9 días", "16 días", "8 días", "10 días"], c: 0, ex: "Inversa. (3·12)/4 = 9 días." },
    { p: "El 25% de 80 es:", o: ["20", "25", "5", "40"], c: 0, ex: "(25·80)/100 = 20." },
    { p: "I de C=4000 a r=5% anual por t=3 años:", o: ["600 Bs", "60 Bs", "200 Bs", "500 Bs"], c: 0, ex: "(4000·5·3)/100 = 600 Bs." },
    { p: "Una moto recorre 90 km en 1.5 h. ¿Cuánto en 4 h a la misma velocidad?", o: ["240 km", "180 km", "135 km", "270 km"], c: 0, ex: "Directa. (4·90)/1.5 = 240 km." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios: mezcla de directa, inversa, porcentaje e interés:</Parrafo>
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
          <div style={{ fontSize: 14, color: "#065f46", marginTop: 6 }}>
            {ok === ejs.length && "🎉 Dominas regla de tres e interés simple."}
            {ok >= 3 && ok < ejs.length && "Repasa los que fallaste: identificar el tipo es lo más importante."}
            {ok < 3 && "Vuelve a la escena 2 (directa vs inversa). Es la base de todo."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
