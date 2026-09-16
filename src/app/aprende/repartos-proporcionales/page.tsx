"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LeccionShell from "../_components/LeccionShell";
import {
  COLOR_BASE, COLOR_EXP, COLOR_OK, COLOR_BAD,
} from "../_components/atoms";
import { Pizarra, Hint, LIENZO } from "../_components/lienzo";
import {
  Titulo, Parrafo, Definicion, PorQue, Ejemplo, Paso, Cuidado, Resumen,
  EscenaRica, AutoCheck,
  Hook, CasoBolivia, Misconception, Mnemotecnia, WorkedExample,
} from "../_components/pedagogia";

const PALETA = [LIENZO.accent, LIENZO.ok, LIENZO.warn, LIENZO.bad];

// ─── Barra del total partida en partes unitarias iguales.
// El "valor unitario" deja de ser una cuenta y pasa a ser UN segmento visible.
function BarraReparto({
  total, partes, etiquetas, moneda = "Bs", mostrarUnitario = true,
}: {
  total: number; partes: number[]; etiquetas: string[];
  moneda?: string; mostrarUnitario?: boolean;
}) {
  const S = partes.reduce((a, b) => a + b, 0);
  const v = total / S;
  const X0 = 36, X1 = 452, W = X1 - X0;
  const anchoUnidad = W / S;
  const alto = mostrarUnitario ? 168 : 140;
  const barY = mostrarUnitario ? 62 : 36, barH = 46;

  const grupos = partes.map((p, i) => ({
    x: X0 + partes.slice(0, i).reduce((a, b) => a + b, 0) * anchoUnidad,
    w: p * anchoUnidad,
    p, color: PALETA[i % PALETA.length],
    etiqueta: etiquetas[i], monto: p * v,
  }));

  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {mostrarUnitario && (
            <>
              <path d={`M ${X0} ${barY - 8} L ${X0} ${barY - 18} L ${X0 + anchoUnidad} ${barY - 18} L ${X0 + anchoUnidad} ${barY - 8}`}
                fill="none" stroke={LIENZO.fgDim} strokeWidth="1.5" />
              {/* con muchas partes el segmento es angosto: la etiqueta se ancla al
                  arranque de la barra en vez de centrarse, si no se sale por la izquierda */}
              <text
                x={anchoUnidad < 90 ? X0 : X0 + anchoUnidad / 2}
                y={barY - 26}
                textAnchor={anchoUnidad < 90 ? "start" : "middle"}
                fontSize="13" fontWeight="700" fill={LIENZO.fgDim}>
                1 parte = {Number.isInteger(v) ? v : v.toFixed(2)} {moneda}
              </text>
            </>
          )}

          {grupos.map((g) => (
            <g key={g.etiqueta}>
              <rect x={g.x} y={barY} width={g.w} height={barH} rx="4"
                fill={g.color} fillOpacity="0.16" stroke={g.color} strokeWidth="2" />
              {/* divisiones internas: hacen contable cuántas partes tiene cada uno */}
              {Array.from({ length: g.p - 1 }, (_, k) => (
                <line key={k} x1={g.x + (k + 1) * anchoUnidad} x2={g.x + (k + 1) * anchoUnidad}
                  y1={barY + 6} y2={barY + barH - 6}
                  stroke={g.color} strokeWidth="1" strokeOpacity="0.55" />
              ))}
              <text x={g.x + g.w / 2} y={barY + barH + 20} textAnchor="middle" fontSize="13"
                fontWeight="800" fill={g.color}>{g.etiqueta} · {g.p}</text>
              <text x={g.x + g.w / 2} y={barY + barH + 38} textAnchor="middle" fontSize="15"
                fontWeight="700" fill={LIENZO.fg}>
                {Number.isInteger(g.monto) ? g.monto : g.monto.toFixed(2)} {moneda}
              </text>
            </g>
          ))}

          <text x="240" y={barY - 38} textAnchor="middle" fontSize="14" fill={LIENZO.fgDim}>
            total {total} {moneda} · {S} partes
          </text>
        </svg>
      </Pizarra>
    </div>
  );
}

// ─── Partes iguales vs proporcional: el contraste que define el tema ───
function IgualVsProporcional() {
  const alto = 150;
  const X0 = 40, W = 400, barH = 34;
  const filas = [
    { titulo: "En partes iguales", partes: [1, 1, 1], y: 40 },
    { titulo: "Proporcional a 2, 3, 5", partes: [2, 3, 5], y: 100 },
  ];
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          {filas.map((f) => {
            const S = f.partes.reduce((a, b) => a + b, 0);
            let acc = 0;
            return (
              <g key={f.titulo}>
                <text x={X0} y={f.y - 10} fontSize="12" fill={LIENZO.fgDim}>{f.titulo}</text>
                {f.partes.map((p, i) => {
                  const x = X0 + (acc / S) * W;
                  const w = (p / S) * W;
                  acc += p;
                  return (
                    <g key={i}>
                      <rect x={x} y={f.y} width={w} height={barH} rx="4"
                        fill={PALETA[i]} fillOpacity="0.16" stroke={PALETA[i]} strokeWidth="2" />
                      <text x={x + w / 2} y={f.y + 23} textAnchor="middle" fontSize="14"
                        fontWeight="700" fill={PALETA[i]}>{"ABC"[i]}</text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </Pizarra>
    </div>
  );
}

// ─── Inverso: al invertir, el más grande se vuelve el más chico ───
function InversoVisual() {
  const cantidades = [2, 3, 5];
  const mcm = 30;
  const alto = 200;
  const X0 = 120, W = 300;
  const maxInv = 1 / Math.min(...cantidades);
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x={X0 - 12} y="26" textAnchor="end" fontSize="12" fill={LIENZO.fgDim}>cantidad</text>
          <text x={X0 + W / 2} y="26" textAnchor="middle" fontSize="12" fill={LIENZO.fgDim}>
            longitud proporcional a 1/cantidad
          </text>
          {cantidades.map((q, i) => {
            const y = 50 + i * 46;
            const w = ((1 / q) / maxInv) * W;
            const numerador = mcm / q;
            return (
              <g key={q}>
                <text x={X0 - 12} y={y + 22} textAnchor="end" fontSize="20" fontWeight="700"
                  fill={LIENZO.fg}>{q}</text>
                <rect x={X0} y={y} width={w} height={30} rx="4"
                  fill={PALETA[i]} fillOpacity="0.16" stroke={PALETA[i]} strokeWidth="2" />
                <text x={X0 + 10} y={y + 21} fontSize="14" fontWeight="700" fill={PALETA[i]}>
                  1/{q}
                </text>
                <text x={X0 + w + 12} y={y + 21} fontSize="15" fontWeight="700" fill={LIENZO.fg}>
                  = {numerador}/{mcm}
                </text>
              </g>
            );
          })}
          <text x="240" y={alto - 14} textAnchor="middle" fontSize="13" fill={LIENZO.fgDim}>
            las nuevas partes son los numeradores: {cantidades.map((q) => mcm / q).join(", ")}
          </text>
        </svg>
      </Pizarra>
      <Hint>El 5, que era el más grande, quedó con la barra más corta: por eso recibe menos</Hint>
    </div>
  );
}

// ─── Compañía: capital × tiempo es un ÁREA, no una suma ───
function CompaniaAreas() {
  const socios = [
    { n: "A", capital: 1000, meses: 6, color: LIENZO.accent },
    { n: "B", capital: 3000, meses: 4, color: LIENZO.ok },
  ];
  const alto = 230;
  const baseY = 172, X0 = 62;
  const escalaT = 21;   // px por mes
  const escalaC = 0.036; // px por Bs
  let cursor = X0;
  const cajas = socios.map((s) => {
    const w = s.meses * escalaT, h = s.capital * escalaC;
    const caja = { ...s, x: cursor, w, h, area: s.capital * s.meses };
    cursor += w + 74;
    return caja;
  });
  return (
    <div style={{ width: "100%", maxWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <line x1="40" y1={baseY} x2="460" y2={baseY} stroke={LIENZO.fg} strokeWidth="1.5" />
          <line x1="40" y1={baseY} x2="40" y2="28" stroke={LIENZO.fg} strokeWidth="1.5" />
          <text x="44" y="24" fontSize="12" fill={LIENZO.fgDim}>capital</text>
          <text x="440" y={baseY + 18} textAnchor="end" fontSize="12" fill={LIENZO.fgDim}>tiempo</text>
          {cajas.map((c) => (
            <g key={c.n}>
              <rect x={c.x} y={baseY - c.h} width={c.w} height={c.h}
                fill={c.color} fillOpacity="0.18" stroke={c.color} strokeWidth="2" />
              <text x={c.x + c.w / 2} y={baseY - c.h / 2 + 5} textAnchor="middle" fontSize="14"
                fontWeight="800" fill={c.color}>{c.n}</text>
              <text x={c.x + c.w / 2} y={baseY + 18} textAnchor="middle" fontSize="12"
                fill={LIENZO.fgDim}>{c.meses} meses</text>
              <text x={c.x - 6} y={baseY - c.h - 8} fontSize="12" fill={LIENZO.fgDim}>{c.capital} Bs</text>
              <text x={c.x + c.w / 2} y={baseY + 36} textAnchor="middle" fontSize="14"
                fontWeight="700" fill={LIENZO.fg}>área = {c.area.toLocaleString("es-BO")}</text>
            </g>
          ))}
        </svg>
      </Pizarra>
      <Hint>B puso más plata pero menos tiempo: lo que se reparte es el área, y la de B es el doble</Hint>
    </div>
  );
}

// ─── La trampa: dar vuelta el orden NO es lo mismo que invertir ───
function InversoTrampa() {
  const total = 310;
  const filas = [
    { titulo: "Dar vuelta el orden (MAL)", partes: [5, 3, 2], color: LIENZO.bad },
    { titulo: "Invertir de verdad (BIEN)", partes: [15, 10, 6], color: LIENZO.ok },
  ];
  const alto = 168;
  return (
    <div style={{ width: "100%", maxWidth: 620 }}>
      <Pizarra alto={alto}>
        <svg width="100%" height="100%" viewBox={`0 0 480 ${alto}`} preserveAspectRatio="xMidYMid meet"
          style={{ fontFamily: "var(--font-crimson), serif" }}>
          <text x="240" y="22" textAnchor="middle" fontSize="13" fill={LIENZO.fgDim}>
            repartir {total} Bs inversamente a 2, 3 y 5
          </text>
          {filas.map((f, fi) => {
            const S = f.partes.reduce((a, b) => a + b, 0);
            const v = total / S;
            const y = 56 + fi * 62;
            return (
              <g key={f.titulo}>
                <text x="34" y={y - 12} fontSize="12" fontWeight="700" fill={f.color}>{f.titulo}</text>
                {f.partes.map((p, i) => (
                  <g key={i}>
                    <rect x={34 + i * 142} y={y} width="130" height="34" rx="8"
                      fill={f.color} fillOpacity="0.08" stroke={f.color} strokeWidth="1.5" />
                    <text x={34 + i * 142 + 65} y={y + 23} textAnchor="middle" fontSize="16"
                      fontWeight="700" fill={LIENZO.fg}>
                      {Number.isInteger(p * v) ? p * v : (p * v).toFixed(2)} Bs
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </Pizarra>
    </div>
  );
}

export default function Page() {
  return (
    <LeccionShell
      unidad="02"
      tituloUnidad="Repartos proporcionales"
      escenas={[
        { titulo: "¿Qué es repartir proporcionalmente?", componente: Esc01_Intro },
        { titulo: "Reparto directo: paso a paso", componente: Esc02_Directo },
        { titulo: "Aplicación con personas", componente: Esc03_App },
        { titulo: "Reparto inverso", componente: Esc04_Inverso },
        { titulo: "Regla de compañía", componente: Esc05_Compania },
        { titulo: "Errores comunes", componente: Esc06_Errores },
        { titulo: "Práctica final", componente: Esc07_Practica },
      ]}
    />
  );
}

function Esc01_Intro() {
  return (
    <EscenaRica>
      <Titulo>Repartir proporcionalmente</Titulo>
      <Parrafo>
        Cuando tienes algo para repartir (dinero, premio, herencia, ganancia) pero
        <strong> no en partes iguales</strong> sino en proporción a algo (capital aportado,
        tiempo dedicado, méritos, etc.), eso es un <strong>reparto proporcional</strong>.
      </Parrafo>
      <IgualVsProporcional />

      <Resumen>
        Casos reales: <br />
        • Repartir una ganancia entre socios según el capital que pusieron.<br />
        • Repartir una herencia según parentesco.<br />
        • Distribuir un premio entre integrantes de un equipo según horas trabajadas.<br />
        • Repartir un costo entre grupos según consumo.
      </Resumen>

      <Hook>
        En el examen UMSS aparecen <strong>2-4 problemas de repartos</strong> (directo, inverso
        o compañía). El método de "valor unitario" siempre funciona: <em>sumar partes, dividir
        total entre suma, multiplicar cada parte por ese unitario</em>. 4 pasos, sin trucos.
      </Hook>

      <Mnemotecnia>
        <strong>3 tipos de reparto · "D-I-C"</strong>:<br />
        <strong>D</strong>irecto → quien tiene más, recibe más.<br />
        <strong>I</strong>nverso → quien tiene más, recibe MENOS (se invierten las partes).<br />
        <strong>C</strong>ompañía → partes = capital × tiempo.
      </Mnemotecnia>
    </EscenaRica>
  );
}

function Esc02_Directo() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_OK}>Reparto DIRECTO: el método</Titulo>
      <Parrafo>
        Para repartir un total <strong>T</strong> entre cantidades <strong>a, b, c, ...</strong>
        directamente proporcionales:
      </Parrafo>

      <Resumen>
        <Paso n={1}>Suma las partes: <strong>S = a + b + c + ...</strong></Paso>
        <Paso n={2}>Calcula el <strong>valor unitario</strong>: <strong>v = T / S</strong></Paso>
        <Paso n={3}>Cada uno recibe su parte: <strong>a·v, b·v, c·v, ...</strong></Paso>
        <Paso n={4}>Verifica que la suma da el total.</Paso>
      </Resumen>

      <BarraReparto total={600} partes={[2, 3, 5]} etiquetas={["A", "B", "C"]} />

      <Ejemplo titulo="Ejemplo: repartir 600 Bs entre 3 personas en partes 2, 3 y 5">
        <Paso n={1}>S = 2 + 3 + 5 = <strong>10</strong></Paso>
        <Paso n={2}>v = 600 / 10 = <strong>60 Bs por parte</strong></Paso>
        <Paso n={3}>Persona 1: 2·60 = <strong>120 Bs</strong></Paso>
        <Paso n={4}>Persona 2: 3·60 = <strong>180 Bs</strong></Paso>
        <Paso n={5}>Persona 3: 5·60 = <strong>300 Bs</strong></Paso>
        <Paso n={6}>Verificación: 120 + 180 + 300 = 600 ✓</Paso>
      </Ejemplo>

      <PorQue>
        El "valor unitario" representa cuánto vale UNA parte de las que estamos
        repartiendo. Una vez que lo sabes, asignar a cada uno es multiplicar.
      </PorQue>
    </EscenaRica>
  );
}

function Esc03_App() {
  const [paso, setPaso] = useState(0);
  const pasos = [
    "Hay 600 Bs para repartir entre A, B y C",
    "A lleva 2 partes, B lleva 3, C lleva 5: en total 10 partes",
    "Cada parte vale 600 / 10 = 60 Bs",
    "A recibe 120, B recibe 180, C recibe 300 (suman 600)",
  ];
  return (
    <EscenaRica>
      <Titulo>Aplicación visual</Titulo>
      <Parrafo>
        El total no se parte en tres pedazos iguales: se parte en <strong>10 pedazos
        iguales</strong> y después se reparten esos pedazos. Ahí está toda la idea.
      </Parrafo>

      <div onClick={() => setPaso((p) => (p + 1) % pasos.length)}
        role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPaso((p) => (p + 1) % pasos.length); } }}
        style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }}>
        <BarraReparto total={600} partes={[2, 3, 5]} etiquetas={["A", "B", "C"]}
          mostrarUnitario={paso >= 2} />
      </div>

      <Hint>{pasos[paso]} · toca para avanzar</Hint>
    </EscenaRica>
  );
}

function Esc04_Inverso() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Reparto INVERSO</Titulo>
      <Parrafo>
        En el reparto <strong>inverso</strong>, queremos que <strong>quien tenga la
        cantidad más alta reciba LA MENOR parte</strong>. Por ejemplo: repartir un
        bono inversamente proporcional a los días faltados (el que faltó menos, gana más).
      </Parrafo>

      <Resumen>
        <Paso n={1}>Invertí cada cantidad: si las cantidades son a, b, c → trabaja con 1/a, 1/b, 1/c.</Paso>
        <Paso n={2}>Reduce esas fracciones a común denominador (MCM).</Paso>
        <Paso n={3}>Las nuevas "partes" son los numeradores.</Paso>
        <Paso n={4}>Aplica el reparto directo con esas nuevas partes.</Paso>
      </Resumen>

      <InversoVisual />

      <BarraReparto total={310} partes={[15, 10, 6]} etiquetas={["el de 2", "el de 3", "el de 5"]} />

      <Ejemplo titulo="Ejemplo: repartir 310 Bs inversamente a 2, 3 y 5">
        <Paso n={1}>Invertí: 1/2, 1/3, 1/5.</Paso>
        <Paso n={2}>MCM(2,3,5) = 30. Equivalen a 15/30, 10/30, 6/30.</Paso>
        <Paso n={3}>Nuevas partes: 15, 10, 6.</Paso>
        <Paso n={4}>Suma: 15+10+6 = 31. Valor unitario: 310/31 = 10.</Paso>
        <Paso n={5}>Resultado: <strong>150 Bs, 100 Bs, 60 Bs</strong>.</Paso>
        <Paso n={6}>Verificación: 150+100+60 = 310 ✓. Y a quien tiene 2 (el menor) le toca más (150). ✓</Paso>
      </Ejemplo>
    </EscenaRica>
  );
}

function Esc05_Compania() {
  return (
    <EscenaRica>
      <Titulo>Regla de compañía</Titulo>
      <Parrafo>
        Es un reparto especial usado en <strong>sociedades comerciales</strong>: cuando
        los socios aportan distinto capital DURANTE distinto tiempo, la ganancia se
        reparte proporcional al <strong>producto capital × tiempo</strong>.
      </Parrafo>

      <Resumen>
        Para cada socio i: <strong>partes_i = capital_i × tiempo_i</strong>. Luego
        aplicas reparto directo con esas partes.
      </Resumen>

      <CompaniaAreas />

      <Ejemplo titulo="Dos socios. Ganancia: 2400 Bs">
        <Paso n={1}>Socio A: 1000 Bs durante 6 meses → 1000·6 = <strong>6000</strong></Paso>
        <Paso n={2}>Socio B: 3000 Bs durante 4 meses → 3000·4 = <strong>12000</strong></Paso>
        <Paso n={3}>Razón A:B = 6000:12000 = 1:2 (3 partes total).</Paso>
        <Paso n={4}>Valor unitario: 2400/3 = 800.</Paso>
        <Paso n={5}>A recibe 1·800 = <strong>800 Bs</strong>. B recibe 2·800 = <strong>1600 Bs</strong>.</Paso>
      </Ejemplo>

      <PorQue>
        Tiene sentido: si A pone menos dinero durante menos tiempo, su "contribución
        efectiva" es menor. La fórmula capital × tiempo refleja eso.
      </PorQue>

      <CasoBolivia>
        <strong>Caso real:</strong> tres socios abren una salteñería en Cochabamba.<br />
        • Doña Luisa aporta 30.000 Bs y trabaja 12 meses.<br />
        • Don Carlos aporta 20.000 Bs y trabaja 8 meses.<br />
        • Don Pepe aporta 50.000 Bs y trabaja 6 meses.<br />
        Ganancia anual: 60.000 Bs.<br /><br />
        Contribución efectiva (capital × tiempo):<br />
        • Luisa: 30.000 × 12 = 360.000<br />
        • Carlos: 20.000 × 8 = 160.000<br />
        • Pepe: 50.000 × 6 = 300.000<br />
        Suma: 820.000. Valor unitario: 60.000 / 820.000 ≈ 0.0732.<br />
        Luisa cobra: 360.000 × 0.0732 ≈ <strong>26.341 Bs</strong>. Carlos: 11.707 Bs. Pepe: 21.951 Bs.
      </CasoBolivia>

      <WorkedExample titulo="Reparto inverso paso a paso · 'inverso a las inasistencias'">
        Una empresa reparte un bono de <strong>2.100 Bs</strong> entre 3 empleados
        <strong> inversamente proporcional</strong> a sus inasistencias (3, 5 y 6 faltas).<br /><br />

        <strong>Paso 1 · Invertir las cantidades:</strong> 1/3, 1/5, 1/6.<br /><br />

        <strong>Paso 2 · Común denominador (MCM):</strong> MCM(3, 5, 6) = 30.<br />
        1/3 = 10/30 · 1/5 = 6/30 · 1/6 = 5/30.<br /><br />

        <strong>Paso 3 · Las nuevas partes son los numeradores:</strong> 10, 6, 5.<br /><br />

        <strong>Paso 4 · Reparto directo con esas partes:</strong><br />
        Suma: 10 + 6 + 5 = 21.<br />
        Valor unitario: 2.100 / 21 = <strong>100 Bs por parte</strong>.<br /><br />

        <strong>Paso 5 · Asignación:</strong><br />
        • El que faltó 3 (menos) recibe 10 × 100 = <strong>1.000 Bs</strong>.<br />
        • El que faltó 5 recibe 6 × 100 = <strong>600 Bs</strong>.<br />
        • El que faltó 6 (más) recibe 5 × 100 = <strong>500 Bs</strong>.<br /><br />

        <strong>Verificación:</strong> 1.000 + 600 + 500 = 2.100 ✓. Y al que faltó MENOS le tocó
        MÁS, como pide el "inversamente proporcional". ✓
      </WorkedExample>
    </EscenaRica>
  );
}

function Esc06_Errores() {
  return (
    <EscenaRica>
      <Titulo accent={COLOR_BAD}>Errores comunes</Titulo>
      <Cuidado>
        <strong>Error 1:</strong> Olvidar verificar que las partes suman el total. <br />
        <span style={{ fontSize: 13 }}>
          Siempre suma las partes que repartes y debe dar exactamente el total inicial.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 2:</strong> En el inverso, no invertir las cantidades. <br />
        <span style={{ fontSize: 13 }}>
          Si te piden "inversamente proporcional a 2, 3, 5" y aplicas reparto directo
          a 2, 3, 5: está MAL. Tienes que trabajar con 1/2, 1/3, 1/5.
        </span>
      </Cuidado>
      <Cuidado>
        <strong>Error 3:</strong> En compañía, olvidar multiplicar por el tiempo. <br />
        <span style={{ fontSize: 13 }}>
          Si solo usas los capitales, ignoras que un socio pudo aportar más tiempo. Capital × Tiempo.
        </span>
      </Cuidado>

      <InversoTrampa />

      <Misconception titulo="Inverso ≠ 'restar del total'">
        Mucha gente cree que "inversamente proporcional a 2, 3, 5" se resuelve repartiendo a
        "5, 3, 2" (orden inverso). NO. Hay que <strong>invertir como fracción</strong>:
        1/2, 1/3, 1/5. Después llevar a común denominador. El orden invertido funciona solo si
        las cantidades originales son simétricas.
      </Misconception>
    </EscenaRica>
  );
}

function Esc07_Practica() {
  const ejs = useMemo(() => [
    { p: "Repartir 480 Bs proporcionalmente a 1, 3 y 4. ¿Cuánto recibe el de 4 partes?", o: ["240 Bs", "120 Bs", "192 Bs", "60 Bs"], c: 0, ex: "Suma: 1+3+4=8. Unitario: 480/8=60. El de 4 recibe 4·60=240." },
    { p: "Repartir 900 entre A, B, C en partes 1:2:3. ¿Cuánto le toca a B?", o: ["150", "300", "450", "100"], c: 1, ex: "Suma: 6. Unitario: 150. B (2 partes) = 2·150 = 300." },
    { p: "Inverso de 1000 a 2 y 3. ¿Cuánto recibe el de 2?", o: ["600", "400", "500", "200"], c: 0, ex: "Invierto: 1/2, 1/3 = 3/6, 2/6. Partes: 3 y 2. Suma 5. Unitario 200. El de '2' inverso = 3·200 = 600." },
    { p: "Socio A: 2000Bs · 3 meses. Socio B: 1000Bs · 6 meses. Ganancia 1200. A recibe:", o: ["600", "800", "400", "1000"], c: 0, ex: "A: 2000·3=6000. B: 1000·6=6000. Razón 1:1. Mitad y mitad: 600 cada uno." },
    { p: "Si en un reparto directo cada parte vale 25 y al primero le tocan 75 Bs, ¿cuántas partes tenía?", o: ["3", "5", "25", "75"], c: 0, ex: "75/25 = 3 partes." },
  ], []);
  const [resp, setResp] = useState<Record<number, number>>({});
  const ok = Object.entries(resp).filter(([k, v]) => ejs[+k].c === v).length;

  return (
    <EscenaRica>
      <Titulo>Práctica final</Titulo>
      <Parrafo>5 ejercicios sobre repartos:</Parrafo>
      {ejs.map((e, i) => {
        const sel = resp[i];
        const rev = sel !== undefined;
        return (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 12, letterSpacing: 1.2, color: COLOR_EXP, fontWeight: 800, marginBottom: 8 }}>EJERCICIO {i + 1}</div>
            <div style={{ fontSize: 15, color: COLOR_BASE, fontFamily: "var(--font-crimson), serif", fontWeight: 700, marginBottom: 12 }}>{e.p}</div>
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
            {ok === ejs.length && "🎉 Dominas repartos proporcionales."}
            {ok >= 3 && ok < ejs.length && "Bien. El método de las 4 etapas no falla."}
            {ok < 3 && "Vuelve a la escena 2 (el método paso a paso)."}
          </div>
        </motion.div>
      )}
    </EscenaRica>
  );
}
