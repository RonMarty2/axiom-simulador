"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_OK, COLOR_BAD } from "../_components/atoms";
import { Pizarra, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Cuidado, Resumen,
  EscenaRica, PracticaFinal, AutoCheck,
  Hook, CasoBolivia, Misconception, Mnemotecnia, Conexion,
  WorkedExample, MiniQuiz,
} from "../_components/pedagogia";

export default function Page() {
  return (
    <LeccionShell
      unidad="01"
      tituloUnidad="Introducción general a la ciencia económica"
      escenas={[
        { titulo: "Un día cualquiera · 1000 Bs en el bolsillo", componente: Esc01_Hook },
        { titulo: "Qué es realmente la escasez", componente: Esc02_Concepto },
        { titulo: "La balanza · necesidades vs recursos", componente: Esc03_Balanza },
        { titulo: "El truco de la lámpara de Aladino", componente: Esc04_Aladino },
        { titulo: "Caso resuelto · familia La Paz", componente: Esc05_Caso },
        { titulo: "Las necesidades nunca se terminan", componente: Esc06_Ilimitadas },
        { titulo: "Bienes libres vs económicos", componente: Esc07_Bienes },
        { titulo: "Errores típicos en el examen", componente: Esc08_Errores },
        { titulo: "Resumen + mnemotecnia", componente: Esc09_Resumen },
        { titulo: "Práctica final", componente: Esc10_Practica },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Balanza (igual que antes, pero ahora dentro de un contexto más rico)
// ─────────────────────────────────────────────────────────────────────────────
function BalanzaEscasez() {
  const [on, setOn] = useState(false);
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={200} onClick={() => setOn((v) => !v)}>
        <svg width="100%" height="100%" viewBox="0 0 480 200"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <line x1="240" x2="240" y1="50" y2="160" stroke={LIENZO.fg} strokeWidth="2" />
          <line x1="210" x2="270" y1="160" y2="160" stroke={LIENZO.fg} strokeWidth="2" />
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: on ? -16 : 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            style={{ transformOrigin: "240px 50px" }}>
            <line x1="100" x2="380" y1="50" y2="50" stroke={LIENZO.fg} strokeWidth="3" strokeLinecap="round" />
            <line x1="110" x2="110" y1="50" y2="80" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="60" y="80" width="100" height="40" rx="6"
              fill={LIENZO.accent} fillOpacity="0.18" stroke={LIENZO.accent} strokeWidth="2" />
            <text x="110" y="103" textAnchor="middle" fontSize="13" fill={LIENZO.accent} fontWeight="700">Necesidades</text>
            <text x="110" y="116" textAnchor="middle" fontSize="10" fill={LIENZO.accent}>ilimitadas</text>
            <line x1="370" x2="370" y1="50" y2="80" stroke={LIENZO.fg} strokeWidth="1.5" />
            <rect x="320" y="80" width="100" height="40" rx="6"
              fill={LIENZO.ok} fillOpacity="0.18" stroke={LIENZO.ok} strokeWidth="2" />
            <text x="370" y="103" textAnchor="middle" fontSize="13" fill={LIENZO.ok} fontWeight="700">Recursos</text>
            <text x="370" y="116" textAnchor="middle" fontSize="10" fill={LIENZO.ok}>limitados</text>
          </motion.g>
        </svg>
      </Pizarra>
      <div style={{ textAlign: "center", fontSize: 14, color: LIENZO.fgDim }}>
        {on
          ? <>El lado de necesidades pesa más → <b style={{ color: LIENZO.accent }}>escasez</b>: hay que elegir.</>
          : <span style={{ fontStyle: "italic", color: LIENZO.fgFaint }}>Tocá la balanza</span>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Nuevo: "torta de gastos" interactiva. Slider para asignar 1000 Bs entre 3
// rubros y ver gráficamente que NO podés tener todo al 100%.
// ─────────────────────────────────────────────────────────────────────────────
function PresupuestoFamiliar() {
  const total = 1000;
  const [comida, setComida] = useState(400);
  const [trans, setTrans] = useState(200);
  // Resto para "lo demás" (alquiler, ropa, ocio, ahorro…)
  const resto = total - comida - trans;
  const negativo = resto < 0;
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={120}>
        <div style={{ width: "100%", padding: "8px 16px" }}>
          {/* Barra apilada horizontal */}
          <div style={{
            display: "flex", width: "100%", height: 36,
            borderRadius: 8, overflow: "hidden",
            border: `1.5px solid ${negativo ? LIENZO.bad : LIENZO.fgFaint}`,
          }}>
            <div style={{
              width: `${(comida / total) * 100}%`,
              background: LIENZO.accent, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 600,
            }}>{comida > 80 ? `Comida ${comida}` : ""}</div>
            <div style={{
              width: `${(trans / total) * 100}%`,
              background: LIENZO.ok, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 600,
            }}>{trans > 80 ? `Transporte ${trans}` : ""}</div>
            <div style={{
              width: `${Math.max(0, (resto / total) * 100)}%`,
              background: negativo ? LIENZO.bad : LIENZO.warn, color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 600,
            }}>{Math.abs(resto) > 80 ? `${negativo ? "Falta " : "Resto "}${Math.abs(resto)}` : ""}</div>
          </div>
          <div style={{ textAlign: "center", marginTop: 10, fontSize: 14,
            color: negativo ? LIENZO.bad : LIENZO.fg, fontWeight: 600,
            fontFamily: "var(--font-crimson), serif" }}>
            {negativo
              ? `Te estás pasando ${Math.abs(resto)} Bs · imposible`
              : `Resto para alquiler / ahorro / ocio: ${resto} Bs`}
          </div>
        </div>
      </Pizarra>
      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          Comida (al mes): <strong style={{ color: LIENZO.accent }}>{comida} Bs</strong>
          <input type="range" min={0} max={1000} step={50} value={comida}
            onChange={(e) => setComida(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: LIENZO.accent }} />
        </label>
        <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
          Transporte (al mes): <strong style={{ color: LIENZO.ok }}>{trans} Bs</strong>
          <input type="range" min={0} max={1000} step={50} value={trans}
            onChange={(e) => setTrans(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: LIENZO.ok }} />
        </label>
      </div>
      <div style={{ fontSize: 12, color: LIENZO.fgFaint, textAlign: "center", fontStyle: "italic" }}>
        Probá subir comida al máximo · subí también transporte · ¿qué pasa con el resto?
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════

function Esc01_Hook() {
  return (
    <EscenaRica>
      <Hook>
        Imaginate que terminás el mes con <strong>1 000 Bs</strong> en el bolsillo. Te alcanza para
        comer bien, pero también querés comprarte un par de zapatillas (450 Bs), salir al cine con
        tus amigos (200 Bs) y guardar algo para el celular nuevo (todo el mes ahorrando).<br /><br />
        <strong>¿Podés hacer las 4 cosas al mismo tiempo?</strong>
      </Hook>
      <Parrafo>
        Por más cuentas que hagas, no alcanza. <strong>Tenés que elegir.</strong> Y elegir significa
        renunciar a algo que también querías.
      </Parrafo>
      <Parrafo>
        Esto que te pasa a vos, le pasa a tu familia, le pasa al gobierno y le pasa a todos los países
        del mundo. Es la base de TODA la economía. Tiene nombre:{" "}
        <strong style={{ color: LIENZO.accent }}>el problema de la escasez</strong>.
      </Parrafo>
      <PresupuestoFamiliar />
      <Parrafo>
        Movés los sliders y siempre te queda menos para "lo demás". Si subís uno mucho, el otro se cae.
        Si querés todo al máximo, te pasás. <strong>Esa es la escasez.</strong>
      </Parrafo>
    </EscenaRica>
  );
}

function Esc02_Concepto() {
  return (
    <EscenaRica>
      <Titulo>Qué es realmente la escasez</Titulo>
      <Definicion termino="escasez (definición)">
        Situación en la que los <strong>recursos disponibles son MENORES</strong> que las cosas que las
        personas o la sociedad quieren tener. <em>No es lo mismo que pobreza.</em>
      </Definicion>
      <Misconception>
        <strong>"Escasez = ser pobre".</strong> Falso. Bill Gates también enfrenta escasez: tiene
        tiempo limitado y no puede atender todas sus reuniones, viajes y proyectos a la vez. La escasez
        es un fenómeno UNIVERSAL: nadie tiene infinito de todo. La pobreza es un caso extremo de
        escasez, pero no son sinónimos.
      </Misconception>
      <Parrafo>
        Como observa Richardson: <em>"la teoría económica se ocupa de la forma en que son utilizados
        los recursos escasos"</em>. Si no hubiera escasez, NO existiría la economía como ciencia —
        nadie tendría que elegir.
      </Parrafo>
      <MiniQuiz
        pregunta="Tu vecino tiene mucho dinero. ¿Enfrenta escasez?"
        opciones={[
          "No, porque tiene mucho dinero.",
          "Sí, porque su tiempo es limitado.",
          "Solo si pierde su trabajo.",
        ]}
        correctaIdx={1}
        explicacion="La escasez se da en TODOS los recursos: dinero, tiempo, atención, espacio. Una persona rica tiene poco tiempo libre y debe elegir qué hacer con él."
      />
    </EscenaRica>
  );
}

function Esc03_Balanza() {
  return (
    <EscenaRica>
      <Titulo>La balanza · necesidades vs recursos</Titulo>
      <Parrafo>
        Visualmente, podés pensar a la economía como una balanza con DOS platos:
      </Parrafo>
      <BalanzaEscasez />
      <Resumen>
        <strong>De un lado:</strong> las necesidades (comer, vestirse, salir, descansar, soñar). Son
        prácticamente <em>infinitas</em>: cuando satisfacés una, aparece otra.<br /><br />
        <strong>Del otro lado:</strong> los recursos (tiempo, dinero, materiales, energía). Son
        siempre <em>limitados</em>.
      </Resumen>
      <PorQue>
        Por eso el lado de necesidades pesa más y la balanza queda inclinada hacia ese lado. Ese
        desequilibrio es lo que llamamos <strong>escasez</strong>.
      </PorQue>
      <Conexion>
        Esto se conecta con el <em>Principio 1 de Mankiw</em> que vas a ver en la lección de los 10
        principios: "las personas enfrentan disyuntivas".
      </Conexion>
    </EscenaRica>
  );
}

function Esc04_Aladino() {
  return (
    <EscenaRica>
      <Titulo>El truco de Aladino · cuándo NO habría escasez</Titulo>
      <Hook>
        Imaginate que cada persona tuviera una lámpara de Aladino. La frotás → aparece lo que querés.
        Casa, comida, viajes, lo que sea. <strong>¿Qué pasaría con la economía?</strong>
      </Hook>
      <Parrafo>
        Albert L. Meyers (1937, <em>Elements of Modern Economics</em>) propuso esta metáfora:
      </Parrafo>
      <Ejemplo>
        "Si cada uno de nosotros poseyera una lámpara de Aladino, nos bastaría con friccionarla para
        que nuestros deseos fueran inmediatamente atendidos. <strong>No existirían problemas
        económicos</strong> y no habría lugar para una ciencia económica."
      </Ejemplo>
      <Parrafo>
        Pero la realidad es muy distinta. <strong>Solo el aire es un bien libre.</strong> Incluso el
        agua, en las sociedades modernas, se transformó en un bien económico — su obtención y
        distribución requieren trabajo.
      </Parrafo>
      <Mnemotecnia>
        Acordate de la frase bíblica <em>"comerás el pan con el sudor de tu frente"</em>. Resume la{" "}
        <strong>ley milenaria de la escasez</strong> mejor que cualquier definición técnica.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc05_Caso() {
  return (
    <EscenaRica>
      <Titulo>Caso resuelto · la familia López de La Paz</Titulo>
      <Parrafo>
        Veamos cómo se aplica la escasez en una situación real:
      </Parrafo>
      <WorkedExample titulo="La familia López, ingreso mensual 4 500 Bs">
        <p style={{ margin: "0 0 8px" }}>
          <strong>Sus necesidades / deseos:</strong>
        </p>
        <ul style={{ paddingLeft: 22, marginTop: 0, fontSize: 14 }}>
          <li>Comida · 1 800 Bs</li>
          <li>Alquiler · 1 200 Bs</li>
          <li>Transporte · 400 Bs</li>
          <li>Servicios (luz, agua, internet) · 350 Bs</li>
          <li>Útiles escolares de los chicos · 200 Bs</li>
          <li>Ahorrar para emergencias · ¿?</li>
          <li>Salir a comer un día al mes · 150 Bs</li>
          <li>Cambiar el celular del papá (roto) · 800 Bs</li>
        </ul>
        <p style={{ marginTop: 8 }}>
          <strong>Total deseado:</strong> 4 900 Bs. <strong>Disponible:</strong> 4 500 Bs.
          <strong style={{ color: LIENZO.bad }}> Faltan 400 Bs.</strong>
        </p>
        <p>
          <strong>¿Qué pueden hacer?</strong>
        </p>
        <ul style={{ paddingLeft: 22, marginTop: 0, fontSize: 14, lineHeight: 1.7 }}>
          <li>Postergar el celular (decide el papá usar el roto un mes más).</li>
          <li>No salir a comer este mes.</li>
          <li>Quedan 4 750 Bs gastados. <strong style={{ color: LIENZO.ok }}>Sobran 250 Bs</strong> para ahorrar.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          <em>Eso es economía aplicada:</em> <strong>renunciar a lo que importa menos para
          hacer rendir los recursos</strong>. Los López resolvieron su problema de escasez con
          dos decisiones.
        </p>
      </WorkedExample>
      <CasoBolivia>
        En Bolivia, el <strong>salario mínimo nacional es de 2 500 Bs</strong> (al 2024). Una familia
        que gana eso enfrenta el mismo problema que los López, pero con MÁS escasez: tiene menos
        margen para postergar. Por eso muchas familias trabajan en 2 cosas al mismo tiempo.
      </CasoBolivia>
    </EscenaRica>
  );
}

function Esc06_Ilimitadas() {
  return (
    <EscenaRica>
      <Titulo>"Pero a mí me alcanza"... las necesidades nunca se terminan</Titulo>
      <Hook>
        Si ganaras 50 000 Bs al mes, ¿se terminaría tu lista de cosas que querés?<br />
        <strong>No. Crecería.</strong>
      </Hook>
      <Parrafo>
        Esta es una observación clave: a medida que aumenta el ingreso, <strong>aumentan también las
        necesidades percibidas</strong>. Lo que ayer era un lujo, mañana parece imprescindible.
      </Parrafo>
      <Resumen>
        Charles Gide (siglo XIX) decía:<br />
        <em>"Civilizar a un pueblo es despertarlo a necesidades nuevas."</em>
      </Resumen>
      <Ejemplo>
        Hace 30 años, el celular era un lujo extremo. Hoy es necesidad básica.<br />
        Hace 15 años, internet en casa era lujo. Hoy sin internet no funciona el trabajo, ni la
        escuela, ni los pagos.<br />
        Hace 10 años, una notebook personal era lujo. Hoy es necesidad universitaria.
      </Ejemplo>
      <PorQue>
        Por eso ninguna economía, por más rica que sea, llega a saturar a sus habitantes. La industria
        publicitaria existe precisamente para CREAR nuevas necesidades — y mantener el problema económico
        siempre activo.
      </PorQue>
      <MiniQuiz
        pregunta="¿Qué pasaría si una sociedad lograra producir todo lo que sus habitantes hoy desean?"
        opciones={[
          "Desaparecería la escasez para siempre.",
          "Aparecerían nuevos deseos y la escasez volvería.",
          "Los precios serían cero y todo sería gratis.",
        ]}
        correctaIdx={1}
        explicacion="Históricamente, cada vez que una sociedad alcanza la abundancia en algo, descubre nuevas necesidades. La escasez no desaparece — cambia de cara."
      />
    </EscenaRica>
  );
}

function Esc07_Bienes() {
  return (
    <EscenaRica>
      <Titulo>Bienes libres vs bienes económicos</Titulo>
      <Parrafo>
        No todo lo que existe es objeto de la economía. Distinguimos dos tipos de bienes:
      </Parrafo>
      <Definicion termino="bien libre">
        Bien disponible en <strong>cantidad ilimitada</strong> sin esfuerzo. Por eso{" "}
        <strong>no tiene precio</strong>. Ejemplo clásico: el aire que respiramos.
      </Definicion>
      <Definicion termino="bien económico">
        Bien <strong>escaso</strong> que requiere trabajo para obtenerlo. Por eso{" "}
        <strong>tiene precio</strong>. Casi TODO lo que estudia la economía pertenece a esta categoría:
        pan, ropa, internet, vacaciones, educación, atención médica.
      </Definicion>
      <Misconception>
        <strong>"El agua es un bien libre."</strong> Esto era cierto hace 200 años en una aldea con
        río. Hoy NO. El agua potable que sale de tu canilla pasó por captación, tratamiento,
        bombeo, distribución y mantenimiento — todo eso cuesta. Por eso pagás factura cada mes. El
        agua de lluvia que cae sí es libre. El agua tratada NO.
      </Misconception>
      <CasoBolivia>
        En zonas rurales bolivianas donde no llega la red de SeLA o SeMAPA, las familias caminan hasta
        2 horas al día para traer agua de un pozo. El agua "libre" allí cuesta <strong>tiempo</strong> —
        que también es un recurso económico.
      </CasoBolivia>
      <AutoCheck
        pregunta="¿Cuál de estos es un bien económico?"
        opciones={[
          "El aire que respiramos al aire libre.",
          "La luz solar que llega a tu ventana.",
          "El oxígeno embotellado de un hospital.",
          "La lluvia que cae en el patio.",
        ]}
        correctaIdx={2}
        explicacion="El oxígeno embotellado requiere captura, compresión, envasado y distribución. Es escaso y tiene precio. Los otros 3 son bienes libres (disponibles sin esfuerzo)."
      />
    </EscenaRica>
  );
}

function Esc08_Errores() {
  return (
    <EscenaRica>
      <Titulo>Errores típicos que se cobran caro en el examen</Titulo>
      <Misconception titulo="Error 1 · confundir escasez con pobreza">
        El examen suele incluir una pregunta donde aparece "un país pobre tiene escasez, un país rico
        no". Es FALSO. Todos los países y todas las personas enfrentan escasez. La pobreza es un
        grado extremo, no es lo mismo.
      </Misconception>
      <Misconception titulo="Error 2 · pensar que la escasez se resuelve produciendo más">
        Cuando una sociedad produce más, también aumentan los deseos. La escasez NUNCA termina, solo
        cambia de objeto. Si te preguntan "¿se puede eliminar la escasez aumentando la producción?",
        la respuesta es <strong>NO</strong>.
      </Misconception>
      <Misconception titulo="Error 3 · creer que solo el dinero es recurso escaso">
        El tiempo es el recurso más escaso de todos: nadie tiene más de 24 horas al día, ni un solo
        millonario más. Otros recursos escasos: tierra cultivable, agua potable, atención humana,
        habilidades técnicas.
      </Misconception>
      <Conexion>
        Estos errores van a reaparecer en la lección de los <em>10 principios</em>, especialmente en
        el principio 2 (costo de oportunidad).
      </Conexion>
    </EscenaRica>
  );
}

function Esc09_Resumen() {
  return (
    <EscenaRica>
      <Titulo>Resumen + mnemotecnia</Titulo>
      <Resumen>
        <strong>1.</strong> Las necesidades humanas son <strong>ilimitadas</strong>.<br /><br />
        <strong>2.</strong> Los recursos son <strong>limitados</strong>.<br /><br />
        <strong>3.</strong> Ese desequilibrio se llama <strong>escasez</strong>.<br /><br />
        <strong>4.</strong> Por eso hay que <strong>ELEGIR</strong>: dedicar recursos a una cosa
        significa NO dedicarlos a otra.<br /><br />
        <strong>5.</strong> La economía es la ciencia que estudia cómo se hacen esas elecciones.
      </Resumen>
      <Mnemotecnia>
        Para recordar el problema económico en 4 palabras:<br />
        <strong style={{ fontSize: 18 }}>"Mucho querer, poco tener"</strong><br /><br />
        Si te quedaste con esa frase, ya tenés el 80% de la lección.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc10_Practica() {
  return (
    <EscenaRica>
      <PracticaFinal ejercicios={[
        {
          p: "El problema económico fundamental es:",
          o: [
            "La inflación",
            "Necesidades ilimitadas y recursos limitados",
            "El comercio internacional",
            "La planificación central",
          ], c: 1,
          ex: "Esa es la ley de la escasez: la base de toda la economía.",
        },
        {
          p: "Según Meyers, el único bien claramente libre es:",
          o: ["El agua", "Los alimentos", "El aire", "El sol"],
          c: 2,
          ex: "El aire. Incluso el agua, hoy, requiere tratamiento → bien económico.",
        },
        {
          p: "Una persona millonaria, ¿enfrenta escasez?",
          o: [
            "No, porque tiene mucho dinero.",
            "Sí, porque el tiempo y otros recursos siguen siendo limitados.",
            "Solo si pierde su fortuna.",
            "Depende del país.",
          ], c: 1,
          ex: "La escasez es UNIVERSAL. Aunque tengas dinero infinito, el tiempo y la atención siguen siendo escasos.",
        },
        {
          p: "En economías ricas la escasez:",
          o: [
            "Desaparece por completo.",
            "Se vuelve más grave porque aparecen nuevos deseos.",
            "Se reduce solo a las necesidades biológicas.",
            "Depende solo del gobierno.",
          ], c: 1,
          ex: "Cada nuevo bien masivo genera nuevos deseos: la insatisfacción persiste, solo cambia de objeto.",
        },
        {
          p: "Un bien que tiene PRECIO es típicamente:",
          o: ["Un bien libre", "Un bien económico", "Un bien intermedio", "Un bien moral"],
          c: 1,
          ex: "El precio nace de la escasez: si algo tiene precio, es escaso y requirió trabajo. Bien económico.",
        },
        {
          p: "La frase 'civilizar es despertar nuevas necesidades' es de:",
          o: ["Smith", "Marx", "Charles Gide", "Marshall"],
          c: 2,
          ex: "Charles Gide, en su Curso de Economía Política (siglo XIX).",
        },
        {
          p: "El salario mínimo en Bolivia (2024) es aproximadamente:",
          o: ["1 500 Bs", "2 500 Bs", "4 500 Bs", "8 000 Bs"],
          c: 1,
          ex: "El salario mínimo nacional en Bolivia ronda los 2 500 Bs. Conocer estos datos del país te ayuda a contextualizar problemas.",
        },
      ]} />
    </EscenaRica>
  );
}
