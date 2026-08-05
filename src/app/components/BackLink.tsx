"use client";

import Link from "next/link";

// Botón de "volver atrás": mismo ícono, mismo tamaño, en toda la app — antes
// cada página tenía su propio texto "← Volver a X" con estilos ligeramente
// distintos, lo que se sentía inconsistente entre pantallas.
//
// variant "dark" es para heroes con fondo de color/gradiente (texto e ícono
// blanco sobre círculo semitransparente). variant "light" (default) es para
// fondos de página normales.
export default function BackLink({
  href, label, variant = "light",
}: {
  href: string;
  label: string;
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, borderRadius: "50%",
        background: dark ? "rgba(255,255,255,0.15)" : "var(--bg-card)",
        border: dark ? "none" : "1px solid var(--border)",
        color: dark ? "white" : "var(--fg-primary)",
      }}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </Link>
  );
}
