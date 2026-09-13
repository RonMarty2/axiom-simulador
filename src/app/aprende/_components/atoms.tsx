"use client";

import { useEffect, useRef, useState } from "react";
import { LIENZO } from "./lienzo";

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

// Colores alineados a la paleta LIENZO (tema claro) para que las lecciones
// animadas se vean igual que Potenciación.
export const COLOR_BASE = LIENZO.fg;     // navy
export const COLOR_EXP = LIENZO.accent;  // violeta
export const COLOR_OK = LIENZO.ok;       // verde
export const COLOR_BAD = LIENZO.bad;     // coral

export const escenaWrap = (): React.CSSProperties => ({
  display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
});

export const subtitulo = (): React.CSSProperties => ({
  fontSize: 17, color: LIENZO.fgDim, textAlign: "center", maxWidth: 560,
  lineHeight: 1.5,
});

export const parrafo = (): React.CSSProperties => ({
  fontSize: 16, color: LIENZO.fgDim, textAlign: "center", maxWidth: 520,
  lineHeight: 1.6,
});

export const hint = (): React.CSSProperties => ({
  fontSize: 14, color: LIENZO.fgFaint, fontWeight: 600, textAlign: "center", minHeight: 22,
});

export const numGrande = (color: string, fontSize: number = 100): React.CSSProperties => ({
  fontSize, fontWeight: 700, color, fontFamily: "var(--font-crimson), serif", lineHeight: 1,
});

export const cajaAnim = (): React.CSSProperties => ({
  minHeight: 240, display: "flex", flexDirection: "column",
  alignItems: "center", justifyContent: "center", gap: 20,
  background: "transparent", borderRadius: 20, padding: "24px 14px",
  cursor: "pointer", width: "100%", maxWidth: 580,
  overflow: "hidden",
});

export const cajitaFormula = (): React.CSSProperties => ({
  marginTop: 10, padding: "10px 18px",
  background: LIENZO.bgSoft, borderRadius: 12,
});

// ─────────────────────────────────────────────────────────────────────────────
// Señal de "esto se toca". Las cajas con onClick (ver cajaAnim) avisaban que
// eran interactivas con el emoji 👆. Dos problemas: cada sistema operativo lo
// dibuja distinto —en Windows sale plano y amarillo— y traía su propio color,
// que peleaba con el de la lección. Este hereda COLOR_EXP como el resto de la
// etiqueta.
//
// Es una señal de interacción, no decoración: si se saca, el alumno no tiene
// cómo saber que la animación avanza al tocarla.
// ─────────────────────────────────────────────────────────────────────────────
export function IconoToque({ tamano = 14 }: { tamano?: number }) {
  return (
    <svg
      width={tamano} height={tamano} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden
      // verticalAlign: en los condicionales de paso el ícono queda inline con
      // el texto, y un SVG se apoya en la línea base — sin esto se ve hundido.
      // En <EtiquetaToque> el contenedor es flex y la propiedad no aplica.
      style={{ flexShrink: 0, verticalAlign: "-0.18em" }}
    >
      <path d="M11.2 11.6V5.9a1.8 1.8 0 1 1 3.6 0v7.5" />
      <path d="M14.8 12.6a1.7 1.7 0 0 1 3.4 0v2.6a6 6 0 0 1-6 6h-1.3a5 5 0 0 1-3.54-1.47l-2.9-2.9a1.8 1.8 0 0 1 2.55-2.55l1.55 1.55" />
    </svg>
  );
}

// La etiqueta que encabeza una caja interactiva. El estilo estaba repetido
// tal cual en 8 lecciones (decisión D3: compartir antes que copiar).
export function EtiquetaToque({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      fontSize: 12, color: COLOR_EXP, fontWeight: 800, letterSpacing: 1.2,
    }}>
      <IconoToque />
      <span>{children}</span>
    </div>
  );
}

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
