"use client";

// Piezas visuales reutilizables para tarjetas de Lámina — cada una es uno de
// los "dispositivos visuales" listados en BITÁCORA §4.5 regla 10. Extraídas
// de la primera lámina (Teorema del Resto) para que las próximas 63 láminas
// las importen en vez de copiar/pegar el mismo JSX en cada archivo.

import { useState } from "react";
import MathText from "../../components/MathText";
import { LIENZO } from "../../aprende/_components/lienzo";

export function TarjetaPractica({
  pregunta, opciones, correcta, explicacion,
}: {
  pregunta: string; opciones: string[]; correcta: number; explicacion: string;
}) {
  const [sel, setSel] = useState<number | null>(null);
  const rev = sel !== null;
  return (
    <div>
      <p style={{ fontSize: 15, fontWeight: 600, color: LIENZO.fg, margin: "0 0 14px", lineHeight: 1.5 }}><MathText>{pregunta}</MathText></p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {opciones.map((op, j) => {
          const isOk = j === correcta, isSel = sel === j;
          const borde = !rev ? LIENZO.fgFaint : isOk ? LIENZO.ok : isSel ? LIENZO.bad : LIENZO.fgFaint;
          return (
            <button
              key={j}
              onClick={() => !rev && setSel(j)}
              disabled={rev}
              style={{
                padding: "10px 14px", textAlign: "left",
                background: !rev ? "transparent" : isOk ? `${LIENZO.ok}18` : isSel ? `${LIENZO.bad}18` : "transparent",
                border: `1.5px solid ${borde}`, borderRadius: 10,
                fontSize: 14, fontWeight: 600, color: LIENZO.fg,
                cursor: rev ? "default" : "pointer",
              }}
            >
              <MathText>{op}</MathText>{rev && isOk && " ✓"}{rev && isSel && !isOk && " ✗"}
            </button>
          );
        })}
      </div>
      {rev && (
        <div style={{ marginTop: 12, fontSize: 13, color: LIENZO.fgDim, lineHeight: 1.5 }}>
          <MathText>{explicacion}</MathText>
        </div>
      )}
    </div>
  );
}

export function PasoCard({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{
        flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
        background: LIENZO.accent, color: "#fff", fontSize: 12, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {n}
      </span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

export function FlechaMini({ abajo }: { abajo?: boolean }) {
  return (
    <svg
      width="18" height="14" viewBox="0 0 24 16" fill="none" stroke={LIENZO.fgFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={abajo ? { transform: "rotate(90deg)", display: "block", margin: "2px auto" } : undefined}
    >
      <path d="M2 8h18M14 2l6 6-6 6" />
    </svg>
  );
}

// Fila de "traducción por rol" — en vez de declarar en palabras que dos cosas
// son equivalentes, muestra el papel que cumple cada una y deja que la
// correspondencia se vea.
export function FilaRol({ rol, conocido, nuevo, ultimo }: { rol: string; conocido: string; nuevo: string; ultimo?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "9px 0",
      borderTop: `1px solid ${LIENZO.fgFaint}33`,
      borderBottom: ultimo ? `1px solid ${LIENZO.fgFaint}33` : undefined,
    }}>
      <div style={{ flex: 1, fontSize: 12.5, color: LIENZO.fgDim }}>{rol}</div>
      <div className="font-crimson" style={{ fontSize: 16, minWidth: 44, textAlign: "center", color: LIENZO.fg }}>{conocido}</div>
      <FlechaMini />
      <div className="font-crimson" style={{ fontSize: 16, minWidth: 56, textAlign: "center", color: LIENZO.accent, fontWeight: 700 }}>{nuevo}</div>
    </div>
  );
}

export function PartePuente({ valor, etiqueta, color }: { valor: string; etiqueta: string; color?: string }) {
  return (
    <span className="font-crimson" style={{ textAlign: "center", color: color ?? LIENZO.fg, fontSize: 21 }}>
      {valor}
      <span style={{ display: "block", fontFamily: "var(--font-atkinson), sans-serif", fontSize: 9.5, textTransform: "uppercase", letterSpacing: 0.5, color: LIENZO.fgDim, marginTop: 3 }}>
        {etiqueta}
      </span>
    </span>
  );
}

// Una línea de una cadena vertical de sustitución: glosa arriba (opcional),
// ecuación abajo con todo el ancho disponible — evita que fórmulas largas se
// corten al costado de una etiqueta (BITÁCORA regla 12).
export function LineaEjemplo({ glosa, eq }: { glosa: string; eq: string }) {
  return (
    <div style={{ marginBottom: 8, fontSize: 15, overflowX: "auto" }}>
      {glosa && <div style={{ color: LIENZO.fgDim, fontSize: 12.5, marginBottom: 2 }}>{glosa}</div>}
      <MathText>{eq}</MathText>
    </div>
  );
}

// Comparación lado a lado en dos colores (verde=correcto, rojo=trampa común)
// — para un "Ojo"/error típico con dos casos concretos a comparar.
export function ComparacionOjo({
  correcto, incorrecto,
}: {
  correcto: { arriba: string; abajo: string };
  incorrecto: { arriba: string; abajo: string };
}) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ flex: "1 1 140px", padding: "12px 14px", borderRadius: 12, background: `${LIENZO.ok}12`, border: `1.5px solid ${LIENZO.ok}55`, textAlign: "center" }}>
        <div style={{ fontSize: 16 }}><MathText>{correcto.arriba}</MathText></div>
        <FlechaMini abajo />
        <div style={{ fontSize: 16, color: LIENZO.ok, fontWeight: 700 }}><MathText>{correcto.abajo}</MathText></div>
      </div>
      <div style={{ flex: "1 1 140px", padding: "12px 14px", borderRadius: 12, background: `${LIENZO.bad}12`, border: `1.5px solid ${LIENZO.bad}55`, textAlign: "center" }}>
        <div style={{ fontSize: 16 }}><MathText>{incorrecto.arriba}</MathText></div>
        <FlechaMini abajo />
        <div style={{ fontSize: 16, color: LIENZO.bad, fontWeight: 700 }}><MathText>{incorrecto.abajo}</MathText></div>
      </div>
    </div>
  );
}

// Chips de verificación (ej. "x=1 ✓ x=7 ✓") — para concretar una afirmación
// de "vale siempre / en varios casos" en vez de solo enunciarla.
export function ChipsVerificacion({ valores }: { valores: string[] }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
      {valores.map((v) => (
        <span key={v} style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "6px 10px", borderRadius: 999, background: `${LIENZO.ok}15`, border: `1px solid ${LIENZO.ok}55`,
          fontSize: 12.5, color: LIENZO.fg,
        }}>
          <MathText>{v}</MathText>
          <span style={{ color: LIENZO.ok, fontWeight: 700 }}>✓</span>
        </span>
      ))}
    </div>
  );
}
