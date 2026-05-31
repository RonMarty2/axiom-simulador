"use client";

import { useEffect, useRef, useState } from "react";

// Átomos visuales y tokens compartidos por todas las lecciones animadas.

// ─────────────────────────────────────────────────────────────────────────────
// <Stage> — Escena con coordenadas absolutas que SE ESCALA al ancho disponible.
// Reemplaza al div `position: relative, width: W, height: H` que envuelve las
// animaciones. Si la pantalla es más angosta que W, todo el contenido se
// escala manteniendo proporciones — clave para que las lecciones se vean
// bien en celular.
// ─────────────────────────────────────────────────────────────────────────────
export function Stage({ w, h, children }: { w: number; h: number; children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function update() {
      const el = outerRef.current;
      if (!el || !el.parentElement) return;
      const parentWidth = el.parentElement.clientWidth;
      const s = Math.min(1, (parentWidth - 4) / w);
      setScale(s);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [w]);

  return (
    <div
      ref={outerRef}
      style={{
        position: "relative",
        width: w * scale,
        height: h * scale,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute", top: 0, left: 0,
          width: w, height: h,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export const COLOR_BASE = "#1E1B4B";
export const COLOR_EXP = "#8b5cf6";
export const COLOR_OK = "#10b981";
export const COLOR_BAD = "#ef4444";

export const escenaWrap = (): React.CSSProperties => ({
  display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
});

export const subtitulo = (): React.CSSProperties => ({
  fontSize: 17, color: "var(--fg-secondary)", textAlign: "center", maxWidth: 560,
  lineHeight: 1.5,
});

export const parrafo = (): React.CSSProperties => ({
  fontSize: 16, color: "var(--fg-secondary)", textAlign: "center", maxWidth: 520,
  lineHeight: 1.6,
});

export const hint = (): React.CSSProperties => ({
  fontSize: 14, color: "var(--fg-muted)", fontWeight: 600, textAlign: "center", minHeight: 22,
});

export const numGrande = (color: string, fontSize: number = 100): React.CSSProperties => ({
  fontSize, fontWeight: 700, color, fontFamily: "var(--font-crimson), serif", lineHeight: 1,
});

export const cajaAnim = (): React.CSSProperties => ({
  minHeight: 240, display: "flex", flexDirection: "column",
  alignItems: "center", justifyContent: "center", gap: 20,
  background: "var(--bg-card)", borderRadius: 20, padding: "24px 14px",
  border: "1px solid var(--border)", cursor: "pointer", width: "100%", maxWidth: 560,
  boxShadow: "var(--shadow-sm)",
  overflow: "hidden",
});

export const cajitaFormula = (): React.CSSProperties => ({
  marginTop: 10, padding: "10px 18px",
  background: "var(--bg-subtle)", borderRadius: 12,
  border: "1px dashed var(--border)",
});

export function ExpInline({ base, exp, colorBase = COLOR_BASE, colorExp = COLOR_EXP, sizeBase = 40 }: {
  base: string; exp: string;
  colorBase?: string; colorExp?: string;
  sizeBase?: number;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
      <span style={{ fontSize: sizeBase, color: colorBase, fontWeight: 700, fontFamily: "var(--font-crimson), serif" }}>{base}</span>
      <span style={{ fontSize: Math.round(sizeBase * 0.55), color: colorExp, fontWeight: 700, marginTop: 2, fontFamily: "var(--font-crimson), serif" }}>{exp}</span>
    </span>
  );
}

// Fracción inline limpia
export function Fraccion({ num, den, color = COLOR_BASE, sizeNum = 18 }: {
  num: React.ReactNode; den: React.ReactNode; color?: string; sizeNum?: number;
}) {
  return (
    <span style={{
      display: "inline-flex", flexDirection: "column", alignItems: "center",
      lineHeight: 1.1, verticalAlign: "middle", color, fontSize: sizeNum,
    }}>
      <span style={{ padding: "0 6px" }}>{num}</span>
      <span style={{ borderTop: "1.5px solid currentColor", width: "100%", marginTop: 2 }} />
      <span style={{ padding: "0 6px", marginTop: 2 }}>{den}</span>
    </span>
  );
}

// Botón de opción para mini-retos al final de cada lección.
export type OpcionReto = { label: string; correcta: boolean };
