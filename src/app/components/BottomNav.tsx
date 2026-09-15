"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icono, { type NombreIcono } from "./Icono";

// Se monta una sola vez en el layout raíz (el AppHeader, en cambio, lo importa
// cada página). Decide por ruta si corresponde mostrarse, sin consultar sesión:
// todas las rutas de la lista son privadas, así que un visitante sin login nunca
// llega a verlas.

type Tab = { href: string; label: string; icono: NombreIcono };

// Armar un simulacro es LA acción del producto, así que no compite como un tab
// más: va al medio, elevada y en color. Los otros cuatro son navegación.
// Apunta a /practicar porque esa ES la pantalla de armar simulacro (los 5 modos,
// examen real incluido); es el mismo destino del CTA del dashboard.
const TABS_IZQ: Tab[] = [
  { href: "/dashboard", label: "Inicio", icono: "inicio" },
  { href: "/aprende", label: "Aprende", icono: "aprende" },
];
const ACCION: Tab = { href: "/practicar", label: "Simulacro", icono: "play" };
const TABS_DER: Tab[] = [
  { href: "/laminas", label: "Láminas", icono: "laminas" },
  { href: "/historial", label: "Exámenes", icono: "examenes" },
];

const RUTAS_APP = [
  "/dashboard", "/aprende", "/laminas", "/practicar", "/historial",
  "/debilidades", "/resueltos", "/errores", "/ranking", "/cuenta", "/simulador", "/progreso",
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

const ALTO_BARRA = 58;
// El círculo de la acción sobresale ~14px hacia arriba, así que el espaciador
// reserva más que el alto de la barra: si no, tapa el final del contenido.
const ALTO_ESPACIADOR = 74;

function TabLink({ tab, activo }: { tab: Tab; activo: boolean }) {
  return (
    <Link
      href={tab.href}
      aria-current={activo ? "page" : undefined}
      style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 2,
        textDecoration: "none",
        color: activo ? "var(--accent)" : "var(--fg-muted)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <span
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 44, height: 28, borderRadius: 999,
          background: activo ? "var(--accent-soft)" : "transparent",
        }}
      >
        <Icono nombre={tab.icono} tamano={22} grosor={activo ? 2.4 : 1.9} />
      </span>
      <span style={{ fontSize: 10.5, fontWeight: activo ? 800 : 600, letterSpacing: 0.1 }}>
        {tab.label}
      </span>
    </Link>
  );
}

function BotonAccion({ activo }: { activo: boolean }) {
  return (
    <Link
      href={ACCION.href}
      aria-current={activo ? "page" : undefined}
      style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 2,
        textDecoration: "none", color: "var(--accent)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Mide lo mismo que la pastilla de un tab normal para que los cinco
          rótulos queden alineados; el círculo flota encima sin ocupar lugar. */}
      <span style={{ position: "relative", width: 44, height: 28 }}>
        <span
          style={{
            position: "absolute", top: -21, left: "50%", transform: "translateX(-50%)",
            width: 52, height: 52, borderRadius: 999,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: activo ? "var(--accent-hover)" : "var(--accent)",
            color: "var(--accent-fg)",
            border: "3px solid var(--bg-base)",
            boxShadow: "0 3px 12px rgba(156, 61, 28, 0.35)",
          }}
        >
          <Icono nombre={ACCION.icono} tamano={22} grosor={2.4} />
        </span>
      </span>
      <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 0.1 }}>
        {ACCION.label}
      </span>
    </Link>
  );
}

export default function BottomNav() {
  const pathname = usePathname() ?? "";
  const segmentos = pathname.split("/").filter(Boolean);

  const esRutaApp = RUTAS_APP.some((r) => pathname === r || pathname.startsWith(r + "/"));
  if (!esRutaApp || esInmersiva(segmentos)) return null;

  const estaEn = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Reserva el alto de la barra al final del documento. Va acá y no como
          padding en CSS porque el padding tendría que saber si la barra existe
          en esta ruta, y eso solo lo sabe este componente. */}
      <div className="axiom-bottomnav" style={{ height: ALTO_ESPACIADOR, flexShrink: 0 }} aria-hidden />
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
        <div style={{ display: "flex", alignItems: "stretch", height: ALTO_BARRA }}>
          {TABS_IZQ.map((tab) => (
            <TabLink key={tab.href} tab={tab} activo={estaEn(tab.href)} />
          ))}
          <BotonAccion activo={estaEn(ACCION.href)} />
          {TABS_DER.map((tab) => (
            <TabLink key={tab.href} tab={tab} activo={estaEn(tab.href)} />
          ))}
        </div>
      </nav>
    </>
  );
}
