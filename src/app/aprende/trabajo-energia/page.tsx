"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import { COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD } from "../_components/atoms";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, Misconception, Mnemotecnia, Conexion, WorkedExample,
} from "../_components/pedagogia";
import { Pizarra, Ejes, scalerX, scalerY, LIENZO } from "../_components/lienzo";
import MathText from "../../components/MathText";

export default function Page() {
  return (
    <LeccionShell
      unidad="FIS-05"
      tituloUnidad="Trabajo y Energía"
      escenas={[
        { titulo: "Trabajo · concepto y fórmula", componente: EscTrabajo },
        { titulo: "Energía cinética", componente: EscCinetica },
        { titulo: "Teorema trabajo-energía", componente: EscTeorema },
        { titulo: "Energía potencial", componente: EscPotencial },
        { titulo: "Conservación de la energía mecánica", componente: EscConservacion },
        { titulo: "Energía elástica del resorte", componente: EscResorte },
        { titulo: "Potencia", componente: EscPotencia },
        { titulo: "Errores y práctica", componente: EscPractica },
      ]}
    />
  );
}

function Flecha({ x1, y1, x2, y2, color, id }: { x1: number; y1: number; x2: number; y2: number; color: string; id: string }) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" markerEnd={`url(#${id})`} />
      <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={color} /></marker>
    </>
  );
}

// ─── Tres casos: θ=0, 90°, 180° entre fuerza y desplazamiento ───
function TresCasosTrabajo() {
  const casos = [
    { ang: 0, label: "θ=0°: W=F·d (máximo)", color: LIENZO.ok },
    { ang: -90, label: "θ=90°: W=0", color: LIENZO.warn },
    { ang: 180, label: "θ=180°: W=−F·d", color: LIENZO.bad },
  ];
  return (
    <Pizarra alto={210}>
      <svg width="100%" height="100%" viewBox="0 0 480 210" preserveAspectRatio="xMidYMid meet">
        {casos.map((c, i) => {
          const cx = 80 + i * 160, cy = 90;
          const rad = (c.ang * Math.PI) / 180;
          const fx = cx + 45 * Math.cos(rad), fy = cy + 45 * Math.sin(rad);
          return (
            <g key={i}>
              <Flecha x1={cx} y1={cy} x2={cx + 55} y2={cy} color={LIENZO.fgDim} id={`d${i}`} />
              <text x={cx + 28} y={cy + 18} fontSize="10" fill={LIENZO.fgDim} textAnchor="middle">desplaz.</text>
              <Flecha x1={cx} y1={cy} x2={fx} y2={fy} color={c.color} id={`f${i}`} />
              <text x={cx} y={cy - 55} fontSize="11" fontWeight="700" fill={c.color} textAnchor="middle">{c.label}</text>
            </g>
          );
        })}
      </svg>
    </Pizarra>
  );
}

function EscTrabajo() {
  return (
    <EscenaRica>
      <Titulo>Trabajo · una fuerza que mueve un objeto</Titulo>

      <Hook>
        Trabajo y energía es la unidad 5 del programa oficial. En el examen
        aparece en problemas con bloques que caen, resortes que se comprimen,
        choques. Lo bueno: la conservación de la energía permite resolver
        problemas SIN tocar ecuaciones de movimiento.
      </Hook>

      <Definicion termino="Trabajo (W)">
        Cantidad de energía transferida por una fuerza al mover un cuerpo.
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$W = Fd\\cos\\theta$"}</MathText>
        </div>
        donde θ es el ángulo entre la fuerza y el desplazamiento. Unidad: J = N·m.
      </Definicion>

      <TresCasosTrabajo />

      <Resumen>
        <strong>Casos especiales</strong>:<br />
        • Si F está en la misma dirección que el movimiento (θ = 0): W = F·d. Máximo trabajo.<br />
        • Si F es perpendicular al movimiento (θ = 90°): W = 0.<br />
        • Si F está en sentido OPUESTO al movimiento (θ = 180°): W = −F·d. Trabajo negativo (frena).
      </Resumen>

      <Ejemplo titulo="Trabajo positivo, negativo y nulo">
        • Empujar una caja en dirección del movimiento → W positivo.<br />
        • Llevar una caja horizontalmente: la gravedad NO hace trabajo (W = 0
        porque F es vertical y el movimiento horizontal).<br />
        • Fricción siempre hace trabajo NEGATIVO (se opone al movimiento).
      </Ejemplo>
    </EscenaRica>
  );
}

// ─── Barras de Ec para v, 2v, 3v: crecimiento cuadrático ───
function BarrasEcCuadratico() {
  const vs = [1, 2, 3];
  const alto = 200, base = 170, anchoBarra = 60;
  const escalaAltura = 12;
  return (
    <Pizarra alto={alto}>
      <svg width="100%" height="100%" viewBox="0 0 480 200" preserveAspectRatio="xMidYMid meet">
        <line x1="30" y1={base} x2="450" y2={base} stroke={LIENZO.fg} strokeWidth="1.5" />
        {vs.map((v, i) => {
          const ec = v * v;
          const h = ec * escalaAltura;
          const x = 70 + i * 140;
          return (
            <g key={i}>
              <motion.rect x={x} y={base - h} width={anchoBarra} height={h} fill={LIENZO.accent} opacity="0.75" rx="4"
                initial={{ height: 0, y: base }} animate={{ height: h, y: base - h }} transition={{ duration: 0.5, delay: i * 0.1 }} />
              <text x={x + anchoBarra / 2} y={base - h - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill={LIENZO.accent}>{ec}× E_c</text>
              <text x={x + anchoBarra / 2} y={base + 18} textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>v = {v}×</text>
            </g>
          );
        })}
      </svg>
    </Pizarra>
  );
}

function EscCinetica() {
  return (
    <EscenaRica>
      <Titulo>Energía cinética · energía del movimiento</Titulo>

      <Definicion termino="Energía cinética (Ec)">
        Energía que tiene un cuerpo por estar en movimiento.
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$E_c = \\tfrac12 mv^2$"}</MathText>
        </div>
        Unidad: J. Es escalar (depende de v², no de la dirección).
      </Definicion>

      <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        Duplicar v no duplica Ec: la cuadruplica
      </p>
      <BarrasEcCuadratico />

      <Ejemplo titulo="Ejemplos">
        • Auto de 1000 kg a 20 m/s: <MathText>{"$E_c = \\tfrac12(1000)(400) = 200{,}000$"}</MathText> J = 200 kJ.<br />
        • Bala de 10 g a 300 m/s: <MathText>{"$E_c = \\tfrac12(0.01)(90000) = 450$"}</MathText> J.
      </Ejemplo>

      <Cuidado>
        E_c depende del cuadrado de la velocidad. Si la velocidad se duplica,
        la energía cinética se cuadruplica.
      </Cuidado>
    </EscenaRica>
  );
}

// ─── F-d con área sombreada = trabajo = ΔEc ───
function GraficoFDArea() {
  const F = 1000, d = 20; // F promedio de frenado ficticia; el área debe dar 200000
  // Usamos F tal que F*d = 200000 → F=10000 para visual, pero mostramos escala relativa
  const Freal = 200000 / d;
  const xMin = 0, xMax = d * 1.15, yMin = 0, yMax = Freal * 1.2, alto = 220;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const areaPath = `M ${sx(0)} ${sy(0)} L ${sx(0)} ${sy(Freal)} L ${sx(d)} ${sy(Freal)} L ${sx(d)} ${sy(0)} Z`;
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        <path d={areaPath} fill={LIENZO.accent} opacity="0.18" />
        <line x1={sx(0)} y1={sy(Freal)} x2={sx(d)} y2={sy(Freal)} stroke={LIENZO.accent} strokeWidth="3" />
        <text x={sx(d / 2)} y={sy(Freal / 2)} fontSize="12" fontWeight="700" fill={LIENZO.accent} textAnchor="middle">área = W = ΔEc = −200,000 J</text>
      </Ejes>
    </Pizarra>
  );
}

function EscTeorema() {
  return (
    <EscenaRica>
      <Titulo>Teorema trabajo-energía</Titulo>

      <Resumen>
        <strong>El trabajo neto sobre un cuerpo es igual a su cambio de energía cinética</strong>:
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$W_{neto} = \\Delta E_c = E_{c,f} - E_{c,i}$"}</MathText>
        </div>
      </Resumen>

      <PorQue>
        Sale de combinar F = ma con las ecuaciones cinemáticas. Es una forma
        ALTERNATIVA de resolver problemas, sin necesidad de calcular
        aceleraciones explícitamente. En un gráfico F-d, el trabajo es el
        ÁREA bajo la curva.
      </PorQue>

      <WorkedExample titulo="Frenado de auto por teorema">
        Un auto de 1000 kg a 20 m/s frena hasta detenerse en 20 m. ¿Trabajo de
        la fuerza de frenado?<br /><br />

        <MathText>{"$W = \\Delta E_c = 0 - \\tfrac12(1000)(400)$"}</MathText> = <strong>−200,000 J</strong><br /><br />

        Negativo porque la fuerza de frenado se opuso al movimiento.
      </WorkedExample>
      <GraficoFDArea />
    </EscenaRica>
  );
}

// ─── Edificio con pisos, Ep proporcional a la altura ───
function DiagramaAltura() {
  const pisos = [0, 5, 10, 15];
  const escala = 8;
  const baseY = 190;
  return (
    <Pizarra alto={220}>
      <svg width="100%" height="100%" viewBox="0 0 480 220" preserveAspectRatio="xMidYMid meet">
        <line x1="60" y1={baseY} x2="60" y2={baseY - 15 * escala - 10} stroke={LIENZO.fgFaint} strokeWidth="1.5" strokeDasharray="3 3" />
        {pisos.map((h, i) => (
          <g key={i}>
            <line x1="55" y1={baseY - h * escala} x2="240" y2={baseY - h * escala} stroke={LIENZO.fgFaint} strokeWidth="1" />
            <text x="45" y={baseY - h * escala + 4} fontSize="10" fill={LIENZO.fgDim} textAnchor="end">{h}m</text>
          </g>
        ))}
        <circle cx="150" cy={baseY - 15 * escala} r="10" fill={LIENZO.accent} />
        <text x="165" y={baseY - 15 * escala + 4} fontSize="12" fontWeight="700" fill={LIENZO.accent}>70 kg, piso 5</text>
        <text x="150" y={baseY + 16} fontSize="11" fill={LIENZO.fgDim} textAnchor="middle">suelo (referencia h=0)</text>
        <text x="340" y={baseY - 15 * escala / 2} fontSize="13" fontWeight="700" fill={LIENZO.warn}>Ep = mgh = 10,290 J</text>
      </svg>
    </Pizarra>
  );
}

function EscPotencial() {
  return (
    <EscenaRica>
      <Titulo>Energía potencial · gravitatoria</Titulo>

      <Definicion termino="Energía potencial gravitatoria (Ep)">
        Energía almacenada por un cuerpo debido a su posición en el campo gravitatorio.
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$E_p = mgh$"}</MathText>
        </div>
        donde h es la altura medida desde una referencia (por convención, el
        suelo o el punto más bajo del problema).
      </Definicion>

      <DiagramaAltura />

      <Resumen>
        <strong>Propiedades clave</strong>:<br />
        • La Ep depende del marco de referencia (la "altura cero" la elegís vos).<br />
        • Lo que importa es el CAMBIO de energía potencial entre dos puntos.<br />
        • A mayor altura, mayor Ep.
      </Resumen>

      <Ejemplo titulo="Ejemplos">
        Persona de 70 kg en piso 5 (altura 15 m): <MathText>{"$E_p = 70(9.8)(15) = 10{,}290$"}</MathText> J respecto al suelo.
      </Ejemplo>
    </EscenaRica>
  );
}

// ─── Caída con barras Ec/Ep que se intercambian (slider de altura) ───
function ConservacionInteractiva() {
  const h0 = 20, m = 2, g = 9.8;
  const [h, setH] = useState(20);
  const ep = m * g * h;
  const epTotal = m * g * h0;
  const ec = epTotal - ep;
  const escalaBarra = 90 / epTotal;
  const alturaEsfera = 170 - (h / h0) * 130;
  return (
    <div style={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", gap: 10 }}>
      <Pizarra alto={220}>
        <svg width="100%" height="100%" viewBox="0 0 480 220" preserveAspectRatio="xMidYMid meet">
          <line x1="60" y1="40" x2="60" y2="200" stroke={LIENZO.fgFaint} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="30" y1="200" x2="200" y2="200" stroke={LIENZO.fg} strokeWidth="1.5" />
          <motion.circle cx="90" cy={alturaEsfera} r="10" fill={LIENZO.accent} animate={{ cy: alturaEsfera }} transition={{ duration: 0.2 }} />
          <text x="140" y="30" fontSize="10" fill={LIENZO.fgDim}>h={h0}m</text>

          <text x="280" y="40" fontSize="11" fontWeight="700" fill={LIENZO.warn} textAnchor="middle">Ep</text>
          <rect x="260" y="130" width="40" height="90" fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} />
          <motion.rect x="260" y={130 + (90 - ep * escalaBarra)} width="40" height={ep * escalaBarra} fill={LIENZO.warn}
            animate={{ y: 130 + (90 - ep * escalaBarra), height: ep * escalaBarra }} transition={{ duration: 0.2 }} />

          <text x="380" y="40" fontSize="11" fontWeight="700" fill={LIENZO.ok} textAnchor="middle">Ec</text>
          <rect x="360" y="130" width="40" height="90" fill={LIENZO.bgSoft} stroke={LIENZO.fgFaint} />
          <motion.rect x="360" y={130 + (90 - ec * escalaBarra)} width="40" height={ec * escalaBarra} fill={LIENZO.ok}
            animate={{ y: 130 + (90 - ec * escalaBarra), height: ec * escalaBarra }} transition={{ duration: 0.2 }} />

          <text x="330" y="145" fontSize="10" fill={LIENZO.fgDim} textAnchor="middle">Em total = {epTotal.toFixed(0)} J (constante)</text>
        </svg>
      </Pizarra>
      <label style={{ fontSize: 13, color: LIENZO.fgDim }}>
        Altura actual h = <strong style={{ color: LIENZO.accent }}>{h.toFixed(1)} m</strong> (Ep={ep.toFixed(0)} J, Ec={ec.toFixed(0)} J)
        <input type="range" min={0} max={h0} step={0.5} value={h}
          onChange={(e) => setH(parseFloat(e.target.value))}
          style={{ width: "100%", accentColor: LIENZO.accent }} />
      </label>
    </div>
  );
}

function EscConservacion() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Conservación de la energía mecánica</Titulo>

      <Resumen>
        <strong>Energía mecánica</strong>: suma de cinética + potencial.
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$E_m = E_c + E_p$"}</MathText>
        </div>
      </Resumen>

      <ConservacionInteractiva />
      <p style={{ margin: "0", fontSize: 13, color: "var(--fg-muted)", textAlign: "center" }}>
        Al bajar, Ep se transforma en Ec: la suma (Em) se mantiene constante
      </p>

      <Resumen>
        <strong>Principio de conservación</strong>: si NO hay fuerzas
        disipativas (fricción, resistencia del aire), la energía mecánica se conserva:
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$E_{m,i} = E_{m,f}$"}</MathText>
        </div>
        Si HAY fricción: <MathText>{"$E_{m,i} = E_{m,f} + W_{fricción}$"}</MathText> (energía disipada).
      </Resumen>

      <WorkedExample titulo="Caída libre desde altura">
        Una pelota de 2 kg se deja caer desde 20 m. ¿Velocidad al impactar?<br /><br />

        Por conservación: <MathText>{"$E_{p,i} = E_{c,f} \\ \\Rightarrow\\ mgh = \\tfrac12 mv^2$"}</MathText>
        <div style={{ textAlign: "center", padding: "6px 0", overflowX: "auto" }}>
          <MathText>{"$v = \\sqrt{2gh} = \\sqrt{2(9.8)(20)} = \\sqrt{392} \\approx 19.8$"}</MathText>
        </div>
        Nota: la masa NO aparece. Cualquier objeto (sin fricción del aire) cae
        a la misma velocidad desde la misma altura.
      </WorkedExample>

      <Mnemotecnia>
        Si el problema tiene "altura inicial → velocidad final" o viceversa, y
        no hay fricción, USÁ CONSERVACIÓN DE ENERGÍA. Mucho más simple que
        Newton.
      </Mnemotecnia>
    </EscenaRica>
  );
}

// ─── Resorte comprimido + gráfico F-x con área = energía elástica ───
function GraficoResorte() {
  const k = 400, x = 0.22;
  const xMin = 0, xMax = x * 1.2, yMin = 0, yMax = k * x * 1.2, alto = 200;
  const sx = scalerX(xMin, xMax);
  const sy = scalerY(yMin, yMax, alto);
  const areaPath = `M ${sx(0)} ${sy(0)} L ${sx(x)} ${sy(k * x)} L ${sx(x)} ${sy(0)} Z`;
  return (
    <Pizarra alto={alto}>
      <Ejes xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} alto={alto}>
        <path d={areaPath} fill={LIENZO.accent} opacity="0.18" />
        <line x1={sx(0)} y1={sy(0)} x2={sx(x)} y2={sy(k * x)} stroke={LIENZO.accent} strokeWidth="3" strokeLinecap="round" />
        <text x={sx(x * 0.4)} y={sy(k * x * 0.25)} fontSize="11" fontWeight="700" fill={LIENZO.accent}>área = Ee = ½kx² ≈ 9.68 J</text>
      </Ejes>
    </Pizarra>
  );
}

function EscResorte() {
  return (
    <EscenaRica>
      <Titulo>Energía elástica · resortes</Titulo>

      <Definicion termino="Energía potencial elástica (Ee)">
        Energía almacenada en un resorte deformado:
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$E_e = \\tfrac12 kx^2$"}</MathText>
        </div>
        donde k es la constante elástica del resorte y x la deformación
        (compresión o estiramiento desde la posición de equilibrio).
      </Definicion>

      <Resumen>
        <strong>Ley de Hooke</strong>: la fuerza del resorte es proporcional a la deformación.
        <div style={{ textAlign: "center", padding: "6px 0" }}>
          <MathText>{"$F = -kx$"}</MathText>
        </div>
        (negativo porque la fuerza se opone a la deformación)
      </Resumen>
      <GraficoResorte />

      <WorkedExample titulo="Bloque-resorte · F15 1op-2-2025">
        Bloque de 2 kg empuja resorte k = 400 N/m, comprime 0.220 m. Al
        liberarlo, sube por plano inclinado 37° sin fricción. ¿Altura alcanzada?<br /><br />

        Energía elástica → Energía potencial: <MathText>{"$\\tfrac12 kx^2 = mgh$"}</MathText>
        <div style={{ textAlign: "center", padding: "6px 0", overflowX: "auto" }}>
          <MathText>{"$h = \\dfrac{kx^2}{2mg} = \\dfrac{400(0.220)^2}{2(2)(9.8)} = \\dfrac{19.36}{39.2}$"}</MathText>
        </div>
        <strong>0.494 m</strong>
      </WorkedExample>
    </EscenaRica>
  );
}

// ─── Dos personas, mismo trabajo, distinta potencia (barras) ───
function BarrasPotencia() {
  const alto = 190, base = 160;
  const casos = [{ t: 10, label: "Persona A (10 s)" }, { t: 20, label: "Persona B (20 s)" }];
  const W = 5000; // arbitrario, mismo para ambas
  const escala = 0.02;
  return (
    <Pizarra alto={alto}>
      <svg width="100%" height="100%" viewBox="0 0 480 190" preserveAspectRatio="xMidYMid meet">
        <line x1="30" y1={base} x2="450" y2={base} stroke={LIENZO.fg} strokeWidth="1.5" />
        {casos.map((c, i) => {
          const P = W / c.t;
          const h = P * escala * 10;
          const x = 100 + i * 200;
          return (
            <g key={i}>
              <motion.rect x={x} y={base - h} width="70" height={h} fill={i === 0 ? LIENZO.ok : LIENZO.warn} opacity="0.8" rx="4"
                initial={{ height: 0, y: base }} animate={{ height: h, y: base - h }} transition={{ duration: 0.5 }} />
              <text x={x + 35} y={base - h - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill={i === 0 ? LIENZO.ok : LIENZO.warn}>P={P} W</text>
              <text x={x + 35} y={base + 18} textAnchor="middle" fontSize="11" fill={LIENZO.fgDim}>{c.label}</text>
            </g>
          );
        })}
      </svg>
    </Pizarra>
  );
}

function EscPotencia() {
  return (
    <EscenaRica>
      <Titulo>Potencia · rapidez de hacer trabajo</Titulo>

      <Definicion termino="Potencia (P)">
        Trabajo realizado por unidad de tiempo:
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <MathText>{"$P = \\dfrac{W}{t} = Fv$"}</MathText> (a velocidad constante)
        </div>
        Unidad SI: watt (W) = J/s. También se usa el caballo de fuerza: 1 hp = 746 W.
      </Definicion>

      <Ejemplo titulo="Comparación">
        Dos personas suben la misma escalera. Una tarda 10 s, la otra 20 s.
        Ambas hacen el mismo trabajo (cambio de Ep), pero la primera tiene
        DOBLE potencia.
      </Ejemplo>
      <BarrasPotencia />

      <WorkedExample titulo="Elevador con motor">
        Elevador de 600 kg sube 20 m en 16 s. Potencia mínima:<br /><br />

        <MathText>{"$W = mgh = 600(9.8)(20) = 117{,}600$"}</MathText> J.<br />
        <MathText>{"$P = \\dfrac{W}{t} = \\dfrac{117600}{16} = 7350$"}</MathText> W = 7.35 kW ≈ 9.85 hp.
      </WorkedExample>
    </EscenaRica>
  );
}

function EscPractica() {
  const ejs = useMemo(() => [
    {
      p: "Trabajo de fuerza 50 N que mueve un objeto 3 m en su dirección:",
      o: ["150 J", "53 J", "47 J", "0 J"],
      c: 0,
      ex: "$W = Fd\\cos0° = 50(3) = 150$ J.",
    },
    {
      p: "Energía cinética de 5 kg a 4 m/s:",
      o: ["40 J", "20 J", "10 J", "80 J"],
      c: 0,
      ex: "$E_c = \\tfrac12(5)(16) = 40$ J.",
    },
    {
      p: "Una pelota cae sin fricción desde 5 m. Velocidad al suelo (g=10):",
      o: ["10 m/s", "5 m/s", "100 m/s", "1 m/s"],
      c: 0,
      ex: "$v = \\sqrt{2gh} = \\sqrt{100} = 10$ m/s.",
    },
    {
      p: "Resorte k=200, compresión 0.1 m. Energía:",
      o: ["1 J", "2 J", "20 J", "10 J"],
      c: 0,
      ex: "$\\tfrac12(200)(0.01) = 1$ J.",
    },
    {
      p: "Si un cuerpo dobla su velocidad, su energía cinética:",
      o: ["cuadruplica", "duplica", "queda igual", "se reduce a la mitad"],
      c: 0,
      ex: "$E_c \\propto v^2$. Doblar v cuadruplica Ec.",
    },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Errores y práctica</Titulo>

      <Misconception titulo="Error 1 · trabajo en perpendicular">
        Si una fuerza es perpendicular al movimiento, NO hace trabajo. Llevar
        un libro al andar (peso vertical, movimiento horizontal) → W=0.
      </Misconception>

      <Misconception titulo="Error 2 · energía cinética es lineal en v">
        FALSO. Es cuadrática (v²). Por eso un auto al doble de velocidad tiene
        4 veces más energía y necesita 4 veces más distancia para frenar.
      </Misconception>

      <Misconception titulo="Error 3 · energía potencial absoluta">
        Ep depende de DÓNDE pongas la referencia. Lo que importa es el cambio
        ΔEp, no el valor absoluto.
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
                <strong style={{ color: sel === e.c ? COLOR_OK : COLOR_BAD }}>{sel === e.c ? "¡Correcto!" : "Veamos:"}</strong>{" "}<MathText>{e.ex}</MathText>
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
