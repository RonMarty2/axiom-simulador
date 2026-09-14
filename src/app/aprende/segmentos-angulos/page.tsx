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
      unidad="GT-01"
      tituloUnidad="Segmentos y ángulos · Geometría Plana"
      escenas={[
        { titulo: "Punto, recta y plano · los 3 indefinidos", componente: EscIntro },
        { titulo: "Segmento · medida y notación", componente: EscSegmento },
        { titulo: "Operaciones con segmentos", componente: EscOpSeg },
        { titulo: "Ángulo · concepto y unidades", componente: EscAnguloConcepto },
        { titulo: "Clasificación de ángulos por su medida", componente: EscClasificacion },
        { titulo: "Pares de ángulos · complementarios, suplementarios, opuestos", componente: EscPares },
        { titulo: "Rectas paralelas cortadas por una transversal", componente: EscParalelas },
        { titulo: "Errores comunes", componente: EscErrores },
        { titulo: "Práctica final", componente: EscPractica },
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc01 · Introducción · punto, recta, plano
// ─────────────────────────────────────────────────────────────────────────────
function EscIntro() {
  return (
    <EscenaRica>
      <Titulo>Geometría plana · arrancamos por lo más básico</Titulo>
      <Parrafo>
        La geometría euclidiana se construye sobre tres conceptos
        <strong> indefinidos</strong>: punto, recta y plano. No se "definen"
        porque son los ladrillos primarios. Toda la geometría sale de combinarlos.
      </Parrafo>

      <Hook>
        En el examen UMSS FCyT, <strong>5 de las 20 preguntas</strong> son de
        Geometría-Trigonometría. Pero todas dependen de manejar bien los
        elementos básicos. Si confundes un ángulo agudo con uno obtuso, pierdes
        puntos en preguntas que tendrías ganadas.
      </Hook>

      <Definicion termino="Punto">
        Representa una posición en el espacio. No tiene dimensiones (largo,
        ancho ni altura). Se nombra con una letra mayúscula: <strong>A</strong>,
        <strong> B</strong>, <strong>P</strong>.
      </Definicion>

      <Definicion termino="Recta">
        Sucesión infinita de puntos alineados en una sola dirección. No tiene
        principio ni fin. Se nombra con una letra minúscula (<strong>r</strong>,
        <strong> s</strong>) o por dos de sus puntos (<strong>AB</strong> con
        flechita arriba que indica recta infinita en ambos sentidos).
      </Definicion>

      <Definicion termino="Plano">
        Superficie plana infinita en dos dimensiones. Se nombra con letras
        griegas (<strong>α</strong>, <strong>β</strong>) o tres puntos no
        alineados (<strong>plano ABC</strong>).
      </Definicion>

      <Mnemotecnia>
        <strong>"P-R-P · 0-1-2 dimensiones"</strong>:<br />
        <strong>P</strong>unto → 0 dimensiones (solo posición).<br />
        <strong>R</strong>ecta → 1 dimensión (largo).<br />
        <strong>P</strong>lano → 2 dimensiones (largo y ancho).<br /><br />
        Cada uno es como una "promoción" del anterior: el punto se estira y se
        vuelve recta; la recta se ensancha y se vuelve plano.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc02 · Segmento
// ─────────────────────────────────────────────────────────────────────────────
function SegmentoVisual({ etiqueta = "AB", longitud = "6 cm" }: { etiqueta?: string; longitud?: string }) {
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={120}>
        <svg width="100%" height="100%" viewBox="0 0 400 120"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <motion.line
            x1="60" y1="60" x2="340" y2="60"
            stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }} />
          <motion.circle cx="60" cy="60" r="5" fill={LIENZO.fg}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} />
          <motion.circle cx="340" cy="60" r="5" fill={LIENZO.fg}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }} />
          <text x="60" y="40" textAnchor="middle" fontSize="18" fill={LIENZO.fg} fontWeight="600">
            {etiqueta[0]}
          </text>
          <text x="340" y="40" textAnchor="middle" fontSize="18" fill={LIENZO.fg} fontWeight="600">
            {etiqueta[1]}
          </text>
          <text x="200" y="95" textAnchor="middle" fontSize="14" fill={LIENZO.accent} fontWeight="600">
            {longitud}
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscSegmento() {
  return (
    <EscenaRica>
      <Titulo>Segmento · una parte de la recta</Titulo>
      <Definicion termino="Segmento">
        Parte de una recta delimitada por dos puntos llamados <strong>extremos</strong>.
        A diferencia de la recta, el segmento sí se puede MEDIR (tiene longitud finita).
      </Definicion>

      <SegmentoVisual etiqueta="AB" longitud="6 cm" />

      <Resumen>
        <strong>Notación · 3 variantes</strong>:<br />
        • <strong>AB</strong> (con barra arriba): el segmento como objeto geométrico.<br />
        • <strong>|AB|</strong> o <strong>m(AB)</strong>: la longitud (un número).<br />
        • Cuando el contexto es claro, se escribe <strong>AB = 6 cm</strong>.
      </Resumen>

      <Mnemotecnia>
        <strong>Recta vs Semirrecta vs Segmento</strong>:<br />
        • <strong>Recta</strong>: infinita en ambos sentidos. Sin extremos.<br />
        • <strong>Semirrecta</strong> (o rayo): infinita en UN sentido. Tiene 1 extremo
        (el origen) y se extiende sin fin hacia el otro lado.<br />
        • <strong>Segmento</strong>: finito. Tiene 2 extremos.<br /><br />
        Truco: el segmento es el único que se puede medir con regla.
      </Mnemotecnia>

      <Misconception titulo="AB ≠ BA si hablamos de notación, pero |AB| = |BA|">
        El segmento <strong>AB</strong> y el segmento <strong>BA</strong> son la
        MISMA figura geométrica (el mismo conjunto de puntos). Su longitud es
        igual: |AB| = |BA|.<br /><br />
        En cambio, en el contexto de vectores (que veremos más adelante),
        <strong> AB</strong> y <strong>BA</strong> son OPUESTOS porque el sentido
        importa. Pero como segmento, no.
      </Misconception>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc03 · Operaciones con segmentos
// ─────────────────────────────────────────────────────────────────────────────
function EscOpSeg() {
  return (
    <EscenaRica>
      <Titulo>Operaciones con segmentos · suma y resta</Titulo>
      <Parrafo>
        Si tienes varios segmentos sobre una misma recta, sus longitudes se suman
        o restan como números reales. La clave es <strong>identificar el
        orden de los puntos</strong> sobre la recta.
      </Parrafo>

      <Definicion termino="Punto medio">
        Punto <strong>M</strong> del segmento <strong>AB</strong> tal que
        <strong> |AM| = |MB|</strong>. Divide al segmento en dos partes iguales.
      </Definicion>

      <Ejemplo titulo="Suma simple">
        Si A, B, C están en ese orden sobre una recta, con |AB| = 4 cm y
        |BC| = 3 cm, entonces |AC| = |AB| + |BC| = 7 cm.
      </Ejemplo>

      <Ejemplo titulo="Resta · cuando un punto está dentro de otro segmento">
        Sean A, B, C alineados en ese orden. Si |AC| = 10 cm y |BC| = 4 cm,
        entonces |AB| = |AC| − |BC| = 6 cm.
      </Ejemplo>

      <WorkedExample titulo="Problema con punto medio · ejercicio típico de examen">
        En la recta, los puntos A, M, B están alineados en ese orden. M es el
        punto medio de AB. Si |AM| = 7 cm, ¿cuánto vale |AB|?<br /><br />

        <strong>Paso 1 · Aplicar definición de punto medio:</strong><br />
        |AM| = |MB| = 7 cm (porque M es punto medio).<br /><br />

        <strong>Paso 2 · Sumar las dos mitades:</strong><br />
        |AB| = |AM| + |MB| = 7 + 7 = <strong>14 cm</strong>.<br /><br />

        <strong>Verificación visual:</strong> el segmento total es DOBLE de
        cualquiera de las mitades. Si una mitad es 7, el total es 14.
      </WorkedExample>

      <AutoCheck
        pregunta="A, B, C están alineados en ese orden. |AC| = 15 cm. Si B es punto medio de AC, ¿cuánto vale |BC|?"
        opciones={["7.5 cm", "15 cm", "30 cm", "5 cm"]}
        correctaIdx={0}
        explicacion="B punto medio → |AB| = |BC| = |AC|/2 = 15/2 = 7.5 cm."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc04 · Ángulo · concepto
// ─────────────────────────────────────────────────────────────────────────────
function AnguloVisual({ medida = 60 }: { medida?: number }) {
  const angRad = (medida * Math.PI) / 180;
  const r = 60;
  const cx = 200, cy = 130;
  const xEnd = cx + Math.cos(-angRad) * 90;
  const yEnd = cy + Math.sin(-angRad) * 90;
  const xArc = cx + Math.cos(-angRad / 2) * (r * 0.5);
  const yArc = cy + Math.sin(-angRad / 2) * (r * 0.5);
  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <Pizarra alto={180}>
        <svg width="100%" height="100%" viewBox="0 0 400 180"
          preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {/* Lado horizontal */}
          <motion.line
            x1={cx} y1={cy} x2={cx + 90} y2={cy}
            stroke={LIENZO.fg} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 }} />
          {/* Lado inclinado */}
          <motion.line
            x1={cx} y1={cy} x2={xEnd} y2={yEnd}
            stroke={LIENZO.fg} strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }} />
          {/* Arco */}
          <motion.path
            d={`M ${cx + r} ${cy} A ${r} ${r} 0 0 0 ${cx + Math.cos(-angRad) * r} ${cy + Math.sin(-angRad) * r}`}
            fill="none" stroke={LIENZO.accent} strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }} />
          {/* Vértice */}
          <circle cx={cx} cy={cy} r="3" fill={LIENZO.fg} />
          <text x={cx - 5} y={cy + 20} textAnchor="middle" fontSize="16" fill={LIENZO.fg} fontWeight="600">
            O
          </text>
          {/* Etiqueta de medida */}
          <text x={xArc} y={yArc} textAnchor="middle" fontSize="14" fill={LIENZO.accent} fontWeight="600">
            {medida}°
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

function EscAnguloConcepto() {
  return (
    <EscenaRica>
      <Titulo>Ángulo · concepto fundamental</Titulo>
      <Definicion termino="Ángulo">
        Figura geométrica formada por <strong>dos semirrectas (lados)</strong>
        con un origen común llamado <strong>vértice</strong>. El ángulo mide la
        "apertura" entre los lados.
      </Definicion>

      <AnguloVisual medida={60} />

      <Resumen>
        <strong>Notación</strong>:<br />
        • Por el vértice: <strong>∠O</strong>.<br />
        • Por 3 puntos (vértice en el medio): <strong>∠AOB</strong>.<br />
        • Por una letra griega: <strong>∠α</strong> (alfa), <strong>∠β</strong> (beta), <strong>∠θ</strong> (theta).
      </Resumen>

      <Definicion termino="Unidades de medida angular">
        • <strong>Grado sexagesimal (°)</strong>: la vuelta completa son 360°.
        1° = 60 minutos ('), 1' = 60 segundos ("). El sistema más usado en bachillerato.<br /><br />
        • <strong>Radián (rad)</strong>: la vuelta completa son 2π radianes. Se usa
        en cálculo y física avanzada.
      </Definicion>

      <Mnemotecnia>
        <strong>Conversión grados ↔ radianes</strong>:<br />
        180° = π rad.<br />
        Por lo tanto: 1° = π/180 rad, 1 rad = 180°/π ≈ 57.3°.<br /><br />
        Truco: para pasar de grados a radianes, <strong>multiplica por π/180</strong>.
        Para pasar de radianes a grados, <strong>multiplica por 180/π</strong>.
      </Mnemotecnia>

      <Ejemplo titulo="Ejemplos de conversión">
        • 90° = 90 · π/180 = π/2 rad<br />
        • 60° = 60 · π/180 = π/3 rad<br />
        • 45° = 45 · π/180 = π/4 rad<br />
        • π/6 rad = (π/6) · (180/π) = 30°
      </Ejemplo>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc05 · Clasificación de ángulos
// ─────────────────────────────────────────────────────────────────────────────
function EscClasificacion() {
  const [tipo, setTipo] = useState(0);
  const tipos = [
    { nombre: "Agudo", rango: "0° < α < 90°", ejemplo: 45, color: COLOR_OK },
    { nombre: "Recto", rango: "α = 90°", ejemplo: 90, color: "#3b82f6" },
    { nombre: "Obtuso", rango: "90° < α < 180°", ejemplo: 135, color: COLOR_EXP },
    { nombre: "Llano", rango: "α = 180°", ejemplo: 180, color: COLOR_BAD },
    { nombre: "Cóncavo", rango: "180° < α < 360°", ejemplo: 270, color: "#ec4899" },
    { nombre: "Completo", rango: "α = 360°", ejemplo: 360, color: "#a855f7" },
  ];
  const t = tipos[tipo];

  return (
    <EscenaRica>
      <Titulo>Clasificación por su medida · los 6 tipos</Titulo>
      <Parrafo>
        Toca los botones para ver cada tipo de ángulo. Esta clasificación es
        clave: aparece en CADA problema de geometría.
      </Parrafo>

      <AnguloVisual medida={t.ejemplo} />

      <div style={{ textAlign: "center", margin: "12px 0" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: t.color, fontFamily: "var(--font-crimson), serif" }}>
          {t.nombre}
        </div>
        <div style={{ fontSize: 14, color: LIENZO.fgDim, marginTop: 4 }}>
          {t.rango}
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 12 }}>
        {tipos.map((tp, i) => (
          <button key={i} onClick={() => setTipo(i)}
            style={{
              padding: "6px 12px", fontSize: 12, borderRadius: 999, cursor: "pointer",
              fontWeight: 600, fontFamily: "var(--font-crimson), serif",
              background: tipo === i ? tp.color : "transparent",
              color: tipo === i ? "#fff" : LIENZO.fg,
              border: `1.5px solid ${tipo === i ? tp.color : LIENZO.fgFaint}`,
            }}>
            {tp.nombre}
          </button>
        ))}
      </div>

      <Resumen>
        <strong>Los 6 tipos · "A-R-O-LL-C-Co"</strong>:<br />
        🔹 <strong>Agudo</strong>: 0° &lt; α &lt; 90°<br />
        🔹 <strong>Recto</strong>: α = 90° (perpendicular)<br />
        🔹 <strong>Obtuso</strong>: 90° &lt; α &lt; 180°<br />
        🔹 <strong>Llano</strong>: α = 180° (línea recta)<br />
        🔹 <strong>Cóncavo</strong>: 180° &lt; α &lt; 360°<br />
        🔹 <strong>Completo</strong>: α = 360° (vuelta completa)
      </Resumen>

      <Mnemotecnia>
        <strong>Truco visual</strong>:<br />
        • Si "cabe" dentro de la esquina de una hoja → <strong>Agudo</strong> (menor a 90°).<br />
        • Si "llena exactamente" la esquina → <strong>Recto</strong> (= 90°).<br />
        • Si "sobresale" la esquina pero NO es una línea → <strong>Obtuso</strong> (entre 90 y 180).<br />
        • Si es una <em>línea recta</em> exacta → <strong>Llano</strong>.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc06 · Pares de ángulos
// ─────────────────────────────────────────────────────────────────────────────
function EscPares() {
  return (
    <EscenaRica>
      <Titulo>Pares de ángulos · relaciones clave</Titulo>
      <Parrafo>
        Cuando dos ángulos se relacionan de cierta forma, reciben nombres
        especiales. Estas relaciones aparecen <strong>en casi todos los
        problemas</strong> del examen.
      </Parrafo>

      <Definicion termino="Ángulos complementarios">
        Dos ángulos cuya suma vale <strong>90°</strong>. <br />
        Si α + β = 90°, entonces β es el complemento de α.
      </Definicion>

      <Ejemplo titulo="Complementarios">
        • 30° y 60° son complementarios (30 + 60 = 90).<br />
        • 45° y 45° son complementarios entre sí.<br />
        • El complemento de 25° es 90 − 25 = 65°.
      </Ejemplo>

      <Definicion termino="Ángulos suplementarios">
        Dos ángulos cuya suma vale <strong>180°</strong>. <br />
        Si α + β = 180°, entonces β es el suplemento de α.
      </Definicion>

      <Ejemplo titulo="Suplementarios">
        • 60° y 120° son suplementarios.<br />
        • 90° y 90° son suplementarios entre sí.<br />
        • El suplemento de 75° es 180 − 75 = 105°.
      </Ejemplo>

      <Definicion termino="Ángulos opuestos por el vértice">
        Cuando dos rectas se cortan, forman 4 ángulos. Los que NO son adyacentes
        (los que están "enfrente" uno del otro) son <strong>opuestos por el
        vértice</strong>, y son <strong>IGUALES</strong>.
      </Definicion>

      <Mnemotecnia>
        <strong>"C-S-OV" · las 3 relaciones angulares clave</strong>:<br />
        <strong>C</strong>omplementarios → suman <strong>90°</strong>.<br />
        <strong>S</strong>uplementarios → suman <strong>180°</strong>.<br />
        <strong>O</strong>puestos por el <strong>V</strong>értice → son IGUALES.<br /><br />
        Truco mnemónico: <em>"Complemento Cumple en el Cuadro de 90°.
        Suplemento Suma hasta Su línea (180°)"</em>.
      </Mnemotecnia>

      <WorkedExample titulo="Problema típico · combinando relaciones">
        Dos ángulos son suplementarios. Uno mide el triple del otro. ¿Cuánto
        mide cada ángulo?<br /><br />

        <strong>Paso 1 · Definir variables:</strong><br />
        Sea α el ángulo más chico. El otro mide 3α.<br /><br />

        <strong>Paso 2 · Plantear la ecuación de suplementarios:</strong><br />
        α + 3α = 180°<br />
        4α = 180°<br />
        α = <strong>45°</strong>.<br /><br />

        <strong>Paso 3 · Calcular el otro:</strong><br />
        3α = 3 · 45 = <strong>135°</strong>.<br /><br />

        <strong>Verificación:</strong> 45 + 135 = 180 ✓. Y 135 = 3 · 45 ✓.
      </WorkedExample>

      <AutoCheck
        pregunta="¿Cuál es el complemento del suplemento de 130°?"
        opciones={["40°", "50°", "60°", "No existe"]}
        correctaIdx={0}
        explicacion="Suplemento de 130° = 180 − 130 = 50°. Complemento de 50° = 90 − 50 = 40°."
      />
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc07 · Rectas paralelas cortadas por una transversal
// ─────────────────────────────────────────────────────────────────────────────
function EscParalelas() {
  return (
    <EscenaRica>
      <Titulo>Rectas paralelas cortadas por una transversal</Titulo>
      <Parrafo>
        Cuando una recta (transversal) corta a dos rectas paralelas, se forman
        <strong> 8 ángulos</strong> que se agrupan en 4 pares con nombres
        específicos. Esta configuración aparece en MUCHOS problemas de geometría.
      </Parrafo>

      <Definicion termino="Ángulos correspondientes">
        Están en la misma posición relativa respecto al cruce. Son
        <strong> IGUALES</strong>.<br />
        Ejemplo: el ángulo superior-derecho del primer cruce = el superior-derecho
        del segundo cruce.
      </Definicion>

      <Definicion termino="Ángulos alternos internos">
        Están entre las dos paralelas (internos), en lados opuestos de la
        transversal. Son <strong>IGUALES</strong>.
      </Definicion>

      <Definicion termino="Ángulos alternos externos">
        Están fuera de las dos paralelas (externos), en lados opuestos de la
        transversal. Son <strong>IGUALES</strong>.
      </Definicion>

      <Definicion termino="Ángulos conjugados (co-internos / co-externos)">
        Están del mismo lado de la transversal, ambos internos o ambos externos.
        Son <strong>SUPLEMENTARIOS</strong> (suman 180°).
      </Definicion>

      <Mnemotecnia>
        <strong>Regla práctica · "alterno = igual, conjugado = suplemento"</strong>:<br />
        • Si dos ángulos están en lados <strong>opuestos</strong> de la transversal → IGUALES.<br />
        • Si están en el <strong>mismo lado</strong> de la transversal → SUMAN 180°.<br /><br />
        Esto vale tanto para los internos como para los externos.
      </Mnemotecnia>

      <WorkedExample titulo="Problema típico de paralelas · resolver con sistema mental">
        Dos rectas paralelas son cortadas por una transversal. Uno de los
        ángulos formados mide 75°. ¿Cuáles son las medidas de los otros 7
        ángulos?<br /><br />

        Por las relaciones que vimos, los 8 ángulos solo pueden tener
        <strong> 2 medidas distintas</strong>: 75° y su suplemento.<br /><br />

        Suplemento de 75° = 180 − 75 = <strong>105°</strong>.<br /><br />

        Entonces:<br />
        • 4 ángulos miden <strong>75°</strong> (el original + sus correspondientes,
        opuestos por el vértice, alternos).<br />
        • 4 ángulos miden <strong>105°</strong> (los suplementarios).<br /><br />

        <strong>Verificación:</strong> 4(75) + 4(105) = 300 + 420 = 720 = 8 · 90 ✓
        (la suma total de los 8 ángulos siempre es 4 vueltas completas / 2 = 720°).
      </WorkedExample>

      <Conexion>
        Esta configuración (paralelas + transversal) es la base de:
        <strong> congruencia y semejanza de triángulos</strong> (próximas lecciones),
        <strong> trigonometría</strong> (ángulos de elevación y depresión),
        y la <strong>geometría analítica</strong> (rectas paralelas tienen igual pendiente).
      </Conexion>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc08 · Errores comunes
// ─────────────────────────────────────────────────────────────────────────────
function EscErrores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores típicos del examen</Titulo>

      <Misconception titulo="Error 1 · confundir agudo con obtuso">
        Un ángulo agudo es MENOR a 90°, no "pequeño". 89° es agudo, 91° es
        obtuso. El umbral exacto es 90°.<br /><br />
        En el examen, muchas opciones aprovechan que la gente clasifica de
        "ojo": si ves 88°, no es recto, es agudo.
      </Misconception>

      <Misconception titulo="Error 2 · complementario vs suplementario">
        Complementario = 90°. Suplementario = 180°. <br />
        Mnemotecnia: "<em>Complemento Cumple en el Cuadrado (90°), Suplemento
        Suma en la línea (180°)</em>".
      </Misconception>

      <Misconception titulo="Error 3 · los opuestos por el vértice NO son suplementarios">
        Cuando dos rectas se cortan, los opuestos son IGUALES, no suman 180°.
        Los que SUMAN 180° son los adyacentes (los que están al lado).
      </Misconception>

      <Cuidado>
        <strong>En el examen:</strong> casi siempre hay una pregunta que combina
        dos relaciones (ej: "el suplemento del complemento de..."). Resuelve en
        orden, no te saltes pasos.
      </Cuidado>
    </EscenaRica>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Esc09 · Práctica final
// ─────────────────────────────────────────────────────────────────────────────
function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Un ángulo mide 35°. ¿Cuánto mide su suplemento?",
      o: ["55°", "145°", "55°20'", "325°"],
      c: 1,
      ex: "Suplemento = 180° − 35° = 145°.",
    },
    {
      p: "¿Cómo se clasifica un ángulo de 173°?",
      o: ["Recto", "Agudo", "Obtuso", "Llano"],
      c: 2,
      ex: "173° está entre 90° y 180°, por tanto es obtuso. (Llano sería exactamente 180°).",
    },
    {
      p: "Convertir 270° a radianes.",
      o: ["3π/2", "π/3", "3π/4", "2π/3"],
      c: 0,
      ex: "270 · π/180 = 270π/180 = 3π/2 rad.",
    },
    {
      p: "Dos ángulos opuestos por el vértice. Uno mide 47°. ¿Cuánto mide el otro?",
      o: ["47°", "43°", "133°", "313°"],
      c: 0,
      ex: "Los opuestos por el vértice son IGUALES. El otro mide 47°.",
    },
    {
      p: "Dos rectas paralelas son cortadas por una transversal. Un ángulo conjugado interno mide 70°. ¿Cuánto mide el otro?",
      o: ["70°", "110°", "20°", "290°"],
      c: 1,
      ex: "Los conjugados (mismo lado de la transversal) son suplementarios. 180 − 70 = 110°.",
    },
    {
      p: "El complemento de un ángulo es el triple del ángulo. ¿Cuánto mide el ángulo?",
      o: ["22.5°", "30°", "45°", "60°"],
      c: 0,
      ex: "Sea α el ángulo. Complemento = 90−α. Ecuación: 90−α = 3α → 90 = 4α → α = 22.5°.",
    },
    {
      p: "A, B, C alineados en ese orden. |AC| = 24 cm, |AB| = |BC| + 4. ¿Cuánto vale |BC|?",
      o: ["10 cm", "14 cm", "12 cm", "8 cm"],
      c: 0,
      ex: "|AB| + |BC| = 24. Sustituyendo: (|BC|+4) + |BC| = 24 → 2|BC| = 20 → |BC| = 10 cm.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final · 7 ejercicios</Titulo>
      <Parrafo>Mezcla de todo lo visto en la lección.</Parrafo>
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
            {ok === ejs.length && "🎉 Dominas segmentos y ángulos."}
            {ok >= 5 && ok < ejs.length && "Bien. Repasa las relaciones angulares."}
            {ok < 5 && "Vuelve a las escenas de pares de ángulos y paralelas."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
