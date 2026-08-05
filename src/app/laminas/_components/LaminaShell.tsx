"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LIENZO } from "../../aprende/_components/lienzo";

export type LaminaBreadcrumb = {
  href: string;
  titulo: string;
};

export type LaminaShellProps = {
  facultadLabel: string;
  areaLabel: string;
  moduloSlug: string;
  moduloTitulo: string;
  titulo: string;
  posicion: string; // ej. "Lámina 3 de 5"
  necesitasAntes?: LaminaBreadcrumb;
  teAbrePuertaA?: LaminaBreadcrumb;
  children: React.ReactNode;
};

// Shell de página única para una Lámina de Repaso: a diferencia de
// LeccionShell (wizard multi-escena), acá todo el contenido vive en un solo
// scroll — es un formato de "hoja de referencia", no de lección paso a paso.
// El pie de página reemplaza el Anterior/Siguiente por conexiones
// conceptuales explícitas (Necesitás antes / Te abre la puerta a), que es
// la forma en que estas láminas evitan quedar sueltas — ver BITÁCORA §4.5.
export default function LaminaShell({
  facultadLabel, areaLabel, moduloSlug, moduloTitulo, titulo, posicion,
  necesitasAntes, teAbrePuertaA, children,
}: LaminaShellProps) {
  return (
    <div style={{ minHeight: "100vh", background: LIENZO.bg, color: LIENZO.fg }}>
      <header style={{
        padding: "14px 20px",
        borderBottom: `1px solid ${LIENZO.fgFaint}55`,
        background: "rgba(250,250,247,0.85)", backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <Link href={`/laminas/${moduloSlug}`} style={{ display: "inline-flex", alignItems: "center", gap: 5, color: LIENZO.accent, textDecoration: "none", fontSize: 14, fontWeight: 500, flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
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

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 12px" }}
      >
        <h1 className="font-crimson" style={{ fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 600, color: LIENZO.fg, margin: "0 0 24px", letterSpacing: "-0.01em" }}>
          {titulo}
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {children}
        </div>
      </motion.main>

      <footer style={{
        maxWidth: 700, margin: "40px auto 0", padding: "18px 20px 40px",
        borderTop: `1px solid ${LIENZO.fgFaint}55`,
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {necesitasAntes && (
          <FooterLink etiqueta="Necesitás antes" breadcrumb={necesitasAntes} />
        )}
        {teAbrePuertaA && (
          <FooterLink etiqueta="Te abre la puerta a" breadcrumb={teAbrePuertaA} />
        )}
      </footer>
    </div>
  );
}

function FooterLink({ etiqueta, breadcrumb }: { etiqueta: string; breadcrumb: LaminaBreadcrumb }) {
  return (
    <Link href={breadcrumb.href} style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, color: LIENZO.fgFaint, fontWeight: 700 }}>
        {etiqueta}
      </span>
      <span style={{ fontSize: 14, color: LIENZO.accent, fontWeight: 500 }}>
        {breadcrumb.titulo} →
      </span>
    </Link>
  );
}
