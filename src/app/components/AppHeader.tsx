"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SuscripcionMini { facultad: string; vence: string }

interface UsuarioMini {
  id: string;
  nombre: string;
  email: string;
  plan: string;
  avatar_color: string;
  facultad_objetivo?: string | null;
  suscripciones?: SuscripcionMini[];
}

interface FacultadMini { id: string; nombre_corto: string; emoji: string; color: string }

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [usuario, setUsuario] = useState<UsuarioMini | null>(null);
  const [admin, setAdmin] = useState(false);
  const [picture, setPicture] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [facultades, setFacultades] = useState<FacultadMini[]>([]);
  const [selOpen, setSelOpen] = useState(false);
  const [cambiando, setCambiando] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        setUsuario(d.usuario ?? null);
        setAdmin(!!d.admin);
        setPicture(d.picture ?? null);
      })
      .catch(() => null);
  }, [pathname]);

  useEffect(() => {
    fetch("/api/facultades").then((r) => r.json()).then((d) => setFacultades(d.facultades ?? [])).catch(() => {});
  }, []);

  const facInfo = (id?: string | null) => facultades.find((f) => f.id === id);

  const cambiarFacultad = async (facultad: string) => {
    if (cambiando || facultad === usuario?.facultad_objetivo) { setSelOpen(false); return; }
    setCambiando(true);
    try {
      const r = await fetch("/api/perfil/facultad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultad }),
      });
      if (r.ok) {
        setSelOpen(false);
        router.refresh();
        const me = await fetch("/api/auth/me").then((x) => x.json());
        setUsuario(me.usuario ?? null);
      }
    } finally {
      setCambiando(false);
    }
  };

  const cerrarSesion = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUsuario(null);
    setAdmin(false);
    router.push("/");
  };

  return (
    <header style={{ background: "var(--bg-glass)", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(8px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 24 }}>
        <Link href={admin ? "/admin" : usuario ? "/dashboard" : "/"} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span className="font-crimson" style={{ fontSize: 22, fontWeight: 700, color: "var(--fg-primary)" }}>AXIOM</span>
        </Link>

        <nav style={{ display: "flex", gap: 18, flex: 1, alignItems: "center", marginLeft: 16 }}>
          {usuario && !admin && (
            <>
              <Link href="/dashboard" style={navLink(pathname === "/dashboard")}>Inicio</Link>
              <Link href="/practicar" style={navLink(pathname?.startsWith("/practicar"))}>Practicar</Link>
              <Link href="/resueltos" style={navLink(pathname?.startsWith("/resueltos"))}>Resueltos</Link>
              <Link href="/precios" style={navLink(pathname === "/precios")}>Planes</Link>
            </>
          )}
          {admin && (
            <>
              <Link href="/admin" style={navLink(pathname === "/admin")}>Dashboard</Link>
              <Link href="/admin/facultades" style={navLink(pathname?.startsWith("/admin/facultades"))}>Facultades</Link>
              <Link href="/admin/banco" style={navLink(pathname?.startsWith("/admin/banco"))}>Banco</Link>
              <Link href="/admin/usuarios" style={navLink(pathname === "/admin/usuarios")}>Usuarios</Link>
              <Link href="/admin/pagos" style={navLink(pathname === "/admin/pagos")}>Pagos</Link>
            </>
          )}
          {!usuario && !admin && (
            <>
              <Link href="/#facultades" style={navLink(false)}>Facultades</Link>
              <Link href="/precios" style={navLink(pathname === "/precios")}>Precios</Link>
            </>
          )}
        </nav>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Selector de suscripciones: solo si el usuario tiene 2+ facultades activas */}
          {usuario && !admin && (usuario.suscripciones?.length ?? 0) >= 2 && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setSelOpen(!selOpen)}
                disabled={cambiando}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "var(--fg-primary)" }}
              >
                <span>{facInfo(usuario.facultad_objetivo)?.emoji ?? "🎓"}</span>
                <span>{facInfo(usuario.facultad_objetivo)?.nombre_corto ?? "Facultad"}</span>
                <span style={{ fontSize: 10, color: "var(--fg-muted)" }}>▼</span>
              </button>
              {selOpen && (
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 6, minWidth: 240, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "var(--shadow-md)", padding: 6, zIndex: 100 }}>
                  <div style={{ padding: "6px 10px", fontSize: 11, fontWeight: 700, color: "var(--fg-muted)", textTransform: "uppercase" }}>Tus suscripciones</div>
                  {usuario.suscripciones?.map((s) => {
                    const fi = facInfo(s.facultad);
                    const activa = s.facultad === usuario.facultad_objetivo;
                    return (
                      <button
                        key={s.facultad}
                        onClick={() => cambiarFacultad(s.facultad)}
                        style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "8px 10px", background: activa ? "rgba(99,102,241,0.08)" : "transparent", border: "none", borderRadius: 6, cursor: "pointer" }}
                      >
                        <span style={{ fontSize: 18 }}>{fi?.emoji ?? "🎓"}</span>
                        <span style={{ flex: 1 }}>
                          <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--fg-primary)" }}>{fi?.nombre_corto ?? s.facultad}</span>
                          <span style={{ fontSize: 11, color: "var(--fg-muted)" }}>Activa hasta {s.vence}</span>
                        </span>
                        {activa && <span style={{ color: "var(--accent)", fontWeight: 800 }}>✓</span>}
                      </button>
                    );
                  })}
                  <Link href="/precios" onClick={() => setSelOpen(false)} style={{ display: "block", padding: "8px 10px", marginTop: 4, borderTop: "1px solid var(--border)", fontSize: 13, fontWeight: 700, color: "var(--accent)", textDecoration: "none" }}>
                    ➕ Agregar otra facultad
                  </Link>
                </div>
              )}
            </div>
          )}
          {!usuario && !admin && (
            <>
              <Link href="/login" style={{ padding: "8px 16px", color: "var(--fg-primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Entrar</Link>
              <Link href="/login" style={{ padding: "8px 18px", background: "var(--accent)", color: "white", textDecoration: "none", borderRadius: 8, fontSize: 14, fontWeight: 700 }}>Crear cuenta</Link>
            </>
          )}
          {(usuario || admin) && (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setOpen(!open)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 6px",
                  background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 999, cursor: "pointer",
                }}
              >
                {picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={picture} alt="" style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover" }} />
                ) : (
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: usuario?.avatar_color ?? "#6366F1",
                    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 12,
                  }}>
                    {admin ? "⚡" : usuario?.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                )}
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg-primary)" }}>
                  {admin ? (usuario ? `${usuario.nombre.split(" ")[0]} · Docente` : "Admin") : usuario?.nombre.split(" ")[0]}
                </span>
                <span style={{ fontSize: 10, color: "var(--fg-muted)" }}>▼</span>
              </button>
              {open && (
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 6, minWidth: 200, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, boxShadow: "var(--shadow-md)", padding: 6, zIndex: 100 }}>
                  {usuario && !admin && (
                    <>
                      <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border)", marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--fg-primary)" }}>{usuario.nombre}</div>
                        <div style={{ fontSize: 11, color: "var(--fg-muted)" }}>{usuario.email}</div>
                        <div style={{ marginTop: 6, display: "inline-block", padding: "2px 8px", background: usuario.plan === "premium" ? "#fbbf24" : usuario.plan === "pro" ? "#a78bfa" : "var(--bg-subtle)", color: usuario.plan === "gratis" ? "var(--fg-muted)" : "#1e1b4b", borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{usuario.plan}</div>
                      </div>
                      <Link href="/cuenta" onClick={() => setOpen(false)} style={menuItem()}>Mi cuenta</Link>
                      <Link href="/errores" onClick={() => setOpen(false)} style={menuItem()}>Mis errores</Link>
                    </>
                  )}
                  <button onClick={cerrarSesion} style={{ ...menuItem(), background: "transparent", border: "none", width: "100%", textAlign: "left", color: "#ef4444", cursor: "pointer" }}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function navLink(active?: boolean | null): React.CSSProperties {
  return {
    padding: "6px 10px",
    color: active ? "var(--accent)" : "var(--fg-primary)",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: active ? 700 : 500,
    borderRadius: 6,
    background: active ? "rgba(99,102,241,0.08)" : "transparent",
  };
}

function menuItem(): React.CSSProperties {
  return {
    display: "block",
    padding: "8px 12px",
    color: "var(--fg-primary)",
    textDecoration: "none",
    fontSize: 13,
    borderRadius: 6,
  };
}
