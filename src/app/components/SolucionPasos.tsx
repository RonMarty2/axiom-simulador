"use client";

import { useMemo, useState } from "react";
import MathText from "./MathText";
import FiguraExamen, { FIGURAS_POR_ETAPAS } from "./FiguraExamen";

// Parte una explicación "Paso 1 · ... Paso 2 · ... Respuesta: X" en piezas.
// - intro: el texto antes del primer "Paso" (planteo).
// - pasos: cada "Paso N · ..." como bloque separado.
// - conclusion: la línea "Respuesta: ..." final.
export function parsearSolucion(texto: string): { intro: string; pasos: string[]; conclusion: string } {
  let cuerpo = (texto ?? "").trim();
  let conclusion = "";

  const mResp = cuerpo.match(/Respuesta:\s*[\s\S]*$/i);
  if (mResp && mResp.index !== undefined) {
    conclusion = mResp[0].trim();
    cuerpo = cuerpo.slice(0, mResp.index).trim();
  }

  // Corta antes de cada "Paso N ·/:/-" manteniendo el separador al inicio del bloque.
  const trozos = cuerpo
    .split(/(?=Paso\s+\d+\s*[·:.\-])/g)
    .map((s) => s.trim())
    .filter(Boolean);

  let intro = "";
  const pasos: string[] = [];
  for (const t of trozos) {
    if (/^Paso\s+\d+/i.test(t)) {
      pasos.push(t);
    } else if (pasos.length === 0) {
      intro = intro ? `${intro}\n${t}` : t;
    } else {
      // texto suelto después de un paso -> se pega al último paso
      pasos[pasos.length - 1] += `\n${t}`;
    }
  }

  return { intro, pasos, conclusion };
}

interface Props {
  explicacion: string;
  figura?: string;
  colorFac: string;
}

export default function SolucionPasos({ explicacion, figura, colorFac }: Props) {
  const { intro, pasos, conclusion } = useMemo(() => parsearSolucion(explicacion), [explicacion]);
  const total = pasos.length;

  // paso activo: 0 = solo planteo; 1..total = pasos revelados; total = incluye conclusión
  const [activo, setActivo] = useState(0);
  const [verTodo, setVerTodo] = useState(false);

  const figuraEtapas = figura ? FIGURAS_POR_ETAPAS[figura] : undefined;
  const figuraMax = figuraEtapas ?? 0;
  // Qué paso mostrarle a la figura (clamp a lo que la figura sabe dibujar).
  const pasoFigura = verTodo ? figuraMax : Math.min(activo, figuraMax);

  // Sin pasos detectados -> fallback: figura + texto corrido (comportamiento viejo).
  if (total === 0) {
    return (
      <div>
        {figura && <FiguraExamen id={figura} paso={figuraMax} />}
        <div style={{ fontSize: 14, color: "var(--fg-primary)", lineHeight: 1.7 }}>
          <MathText block>{explicacion}</MathText>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Figura que se va construyendo con el paso activo */}
      {figura && <FiguraExamen id={figura} paso={pasoFigura} />}

      {/* Barra de progreso de pasos */}
      {!verTodo && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 4, flex: 1 }}>
            {Array.from({ length: total }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 5,
                  borderRadius: 999,
                  background: i < activo ? colorFac : "var(--bg-subtle)",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--fg-muted)", whiteSpace: "nowrap" }}>
            {activo === 0 ? "Planteo" : `Paso ${activo} de ${total}`}
          </span>
        </div>
      )}

      {/* Planteo (siempre visible cuando hay algo) */}
      {intro && (
        <div style={{ fontSize: 14, color: "var(--fg-primary)", lineHeight: 1.7, marginBottom: 10 }}>
          <MathText block>{intro}</MathText>
        </div>
      )}

      {/* Pasos revelados */}
      <div style={{ display: "grid", gap: 8 }}>
        {pasos.map((texto, i) => {
          const numero = i + 1;
          const visible = verTodo || numero <= activo;
          const esActual = !verTodo && numero === activo;
          if (!visible) return null;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 10,
                background: esActual ? `${colorFac}12` : "var(--bg-card)",
                border: esActual ? `2px solid ${colorFac}` : "1px solid var(--border)",
                transition: "all 0.2s",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: colorFac,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {numero}
              </span>
              <div style={{ flex: 1, fontSize: 14, color: "var(--fg-primary)", lineHeight: 1.6 }}>
                <MathText block>{texto.replace(/^Paso\s+\d+\s*[·:.\-]\s*/i, "")}</MathText>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conclusión (cuando terminó de revelar) */}
      {(verTodo || activo >= total) && conclusion && (
        <div
          style={{
            marginTop: 10,
            padding: "10px 12px",
            borderRadius: 10,
            background: "rgba(16,185,129,0.10)",
            border: "1px solid rgba(16,185,129,0.35)",
            fontSize: 14,
            fontWeight: 700,
            color: "#059669",
          }}
        >
          ✓ {conclusion}
        </div>
      )}

      {/* Controles */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {!verTodo && (
          <>
            <button
              type="button"
              onClick={() => setActivo((a) => Math.max(0, a - 1))}
              disabled={activo === 0}
              style={{
                padding: "9px 16px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--fg-primary)",
                fontWeight: 700,
                fontSize: 13,
                cursor: activo === 0 ? "not-allowed" : "pointer",
                opacity: activo === 0 ? 0.4 : 1,
              }}
            >
              ◀ Anterior
            </button>
            {activo < total ? (
              <button
                type="button"
                onClick={() => setActivo((a) => Math.min(total, a + 1))}
                style={{
                  flex: 1,
                  minWidth: 160,
                  padding: "9px 16px",
                  borderRadius: 10,
                  border: "none",
                  background: colorFac,
                  color: "white",
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {activo === 0 ? "Empezar solución ▶" : `Siguiente paso ▶`}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActivo(0)}
                style={{
                  flex: 1,
                  minWidth: 160,
                  padding: "9px 16px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  color: "var(--fg-primary)",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                ↺ Reiniciar
              </button>
            )}
          </>
        )}
        <button
          type="button"
          onClick={() => setVerTodo((v) => !v)}
          style={{
            padding: "9px 14px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--fg-muted)",
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {verTodo ? "Ver por pasos" : "Ver todo de una"}
        </button>
      </div>
    </div>
  );
}
