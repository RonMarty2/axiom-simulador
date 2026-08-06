"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LIENZO } from "../../aprende/_components/lienzo";

export type LaminaBreadcrumb = {
  href: string;
  titulo: string;
};

export type LaminaDiapositiva = {
  etiqueta: string;
  colorEtiqueta?: string;
  contenido: React.ReactNode;
};

export type LaminaShellProps = {
  facultadLabel: string;
  areaLabel: string;
  moduloSlug: string;
  moduloTitulo: string;
  titulo: string;
  posicion: string; // ej. "Lámina 3 de 5"
  diapositivas: LaminaDiapositiva[];
  necesitasAntes?: LaminaBreadcrumb;
  teAbrePuertaA?: LaminaBreadcrumb;
};

const FlechaIzq = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const FlechaDer = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

// Shell de Lámina de Repaso en formato TARJETAS — reemplaza el formato de
// scroll único (v4) después de que Ronald lo probó en el celular y pidió
// "aprendo, next, aprendo, next" con navegación 100% visual, sin texto
// "Siguiente/Anterior". Ver BITÁCORA §4.5 (pivote v5) — este es el formato
// final y obligatorio para toda lámina nueva, de cualquier facultad.
//
// Una idea por tarjeta (refuerza la regla "un salto lógico por paso").
// Navegación: puntos de progreso tocables (saltar directo si "te perdiste"),
// botones circulares con solo ícono, swipe táctil, y las zonas laterales de
// la pantalla también son tocables.
export default function LaminaShell({
  facultadLabel, areaLabel, moduloSlug, moduloTitulo, titulo, posicion,
  diapositivas, necesitasAntes, teAbrePuertaA,
}: LaminaShellProps) {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);

  const ir = (n: number) => {
    if (n < 0 || n >= diapositivas.length) return;
    setI(n);
  };

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 60) ir(i + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const slide = diapositivas[i];

  return (
    <div style={{ height: "100vh", background: LIENZO.bg, color: LIENZO.fg, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <header style={{
        padding: "14px 20px",
        borderBottom: `1px solid ${LIENZO.fgFaint}55`,
        background: "rgba(250,250,247,0.85)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <Link href={`/laminas/${moduloSlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 5, color: LIENZO.accent, textDecoration: "none", fontSize: 14, fontWeight: 500, flexShrink: 0 }}>
            <FlechaIzq />
            {moduloTitulo}
          </Link>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: LIENZO.fgFaint, marginBottom: 2 }}>
              {facultadLabel} · {areaLabel} · {posicion}
            </div>
            <div className="font-crimson" style={{ fontSize: 17, fontWeight: 500, color: LIENZO.fg, letterSpacing: "-0.01em" }}>
              {titulo}
            </div>
          </div>
        </div>
      </header>

      {/* Puntos de progreso — tocables para saltar directo a una tarjeta */}
      <div style={{ padding: "14px 20px 6px" }}>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", maxWidth: 480, margin: "0 auto" }}>
          {diapositivas.map((d, n) => (
            <button
              key={n}
              onClick={() => ir(n)}
              aria-label={`Ir a: ${d.etiqueta}`}
              aria-current={n === i}
              style={{
                width: n === i ? 32 : 20, height: 4, borderRadius: 4, border: "none", padding: 0, cursor: "pointer",
                background: n <= i ? LIENZO.accent : `${LIENZO.fgFaint}66`,
                opacity: n < i ? 0.45 : 1,
                transition: "width 0.2s, background 0.2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Escenario de la tarjeta */}
      <div
        style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 8px", minHeight: 0 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={() => ir(i - 1)}
          aria-label="Tarjeta anterior"
          style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "14%", background: "transparent", border: "none", cursor: i === 0 ? "default" : "pointer", zIndex: 1 }}
        />
        <button
          onClick={() => ir(i + 1)}
          aria-label="Tarjeta siguiente"
          style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "14%", background: "transparent", border: "none", cursor: i === diapositivas.length - 1 ? "default" : "pointer", zIndex: 1 }}
        />

        <div style={{ width: "100%", maxWidth: 560, height: "100%", maxHeight: 640, position: "relative" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{
                position: "absolute", inset: 0,
                background: LIENZO.bg, border: `1px solid ${LIENZO.fgFaint}55`, borderRadius: 20,
                padding: "28px 24px", overflowY: "auto",
                display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 16,
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: slide.colorEtiqueta ?? LIENZO.accent }}>
                {slide.etiqueta}
              </div>
              {slide.contenido}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles — solo íconos, nunca texto */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, padding: "10px 20px 16px" }}>
        <button
          onClick={() => ir(i - 1)}
          disabled={i === 0}
          aria-label="Anterior"
          style={{
            width: 52, height: 52, borderRadius: "50%", border: "none",
            background: LIENZO.bgSoft, color: LIENZO.fg,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: i === 0 ? "default" : "pointer", opacity: i === 0 ? 0.3 : 1,
          }}
        >
          <FlechaIzq />
        </button>
        <button
          onClick={() => ir(i + 1)}
          disabled={i === diapositivas.length - 1}
          aria-label="Siguiente"
          style={{
            width: 60, height: 60, borderRadius: "50%", border: "none",
            background: LIENZO.accent, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: i === diapositivas.length - 1 ? "default" : "pointer",
            opacity: i === diapositivas.length - 1 ? 0.3 : 1,
          }}
        >
          <FlechaDer />
        </button>
      </div>

      {(necesitasAntes || teAbrePuertaA) && (
        <footer style={{
          maxWidth: 700, width: "100%", margin: "0 auto", padding: "0 20px 18px",
          display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
        }}>
          {necesitasAntes && <FooterLink etiqueta="Necesitás antes" breadcrumb={necesitasAntes} />}
          {teAbrePuertaA && <FooterLink etiqueta="Te abre la puerta a" breadcrumb={teAbrePuertaA} />}
        </footer>
      )}
    </div>
  );
}

function FooterLink({ etiqueta, breadcrumb }: { etiqueta: string; breadcrumb: LaminaBreadcrumb }) {
  return (
    <Link href={breadcrumb.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2, fontSize: 12 }}>
      <span style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: 1.2, color: LIENZO.fgFaint, fontWeight: 700 }}>
        {etiqueta}
      </span>
      <span style={{ color: LIENZO.accent, fontWeight: 500 }}>
        {breadcrumb.titulo}
      </span>
    </Link>
  );
}
