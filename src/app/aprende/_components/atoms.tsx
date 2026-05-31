"use client";

// Átomos visuales y tokens compartidos por todas las lecciones animadas.

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
  background: "var(--bg-card)", borderRadius: 20, padding: "30px 40px",
  border: "1px solid var(--border)", cursor: "pointer", width: "100%", maxWidth: 560,
  boxShadow: "var(--shadow-sm)",
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
