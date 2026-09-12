"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icono, { type NombreIcono } from "./Icono";

// Se monta una sola vez en el layout raíz (el AppHeader, en cambio, lo importa
// cada página). Decide por ruta si corresponde mostrarse, sin consultar sesión:
// todas las rutas de la lista son privadas, así que un visitante sin login nunca
// llega a verlas.

const TABS: { href: string; label: string; icono: NombreIcono }[] = [
  { href: "/dashboard", label: "Inicio", icono: "inicio" },
  { href: "/aprende", label: "Aprende", icono: "aprende" },
  { href: "/laminas", label: "Láminas", icono: "laminas" },
  { href: "/practicar", label: "Practicar", icono: "practicar" },
  { href: "/historial", label: "Exámenes", icono: "examenes" },
];

const RUTAS_APP = [
  "/dashboard", "/aprende", "/laminas", "/practicar", "/historial",
  "/debilidades", "/resueltos", "/errores", "/ranking", "/cuenta", "/simulador",
];

// La lección, la lámina en formato tarjetas y el examen en curso ocupan la
// pantalla completa y tienen su propia navegación abajo: la barra taparía esos
// controles. Se reconocen por profundidad de ruta, no por lista.
function esInmersiva(segmentos: string[]): boolean {
  const [raiz, ...resto] = segmentos;
  if (raiz === "aprende") return resto.length >= 1;
  if (raiz === "laminas") return resto.length >= 2;
  if (raiz === "simulador") return resto.length >= 1;
  return false;
}

export default function BottomNav() {
  const pathname = usePathname() ?? "";
  const segmentos = pathname.split("/").filter(Boolean);

  const esRutaApp = RUTAS_APP.some((r) => pathname === r || pathname.startsWith(r + "/"));
  if (!esRutaApp || esInmersiva(segmentos)) return null;

  return (
    <>
      {/* Reserva el alto de la barra al final del documento. Va acá y no como
          padding en CSS porque el padding tendría que saber si la barra existe
          en esta ruta, y eso solo lo sabe este componente. */}
      <div className="axiom-bottomnav" style={{ height: 58, flexShrink: 0 }} aria-hidden />
      <nav
        className="axiom-bottomnav"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60,
          background: "var(--bg-glass)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid var(--border)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div style={{ display: "flex", alignItems: "stretch", height: 58 }}>
          {TABS.map(({ href, label, icono }) => {
            const activo = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                aria-current={activo ? "page" : undefined}
                style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 3,
                  textDecoration: "none",
                  color: activo ? "var(--accent)" : "var(--fg-primary)",
                  opacity: activo ? 1 : 0.55,
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <Icono nombre={icono} tamano={23} grosor={activo ? 2.4 : 1.9} />
                <span style={{ fontSize: 10.5, fontWeight: activo ? 800 : 600, letterSpacing: 0.1 }}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

