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
  const [tester, setTester] = useState(false);
  const [cambioFacLibre, setCambioFacLibre] = useState(false);
  const [picture, setPicture] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [facultades, setFacultades] = useState<FacultadMini[]>([]);
  const [selOpen, setSelOpen] = useState(false);
  const [cambiando, setCambiando] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);

  // Cerrar menú móvil al navegar
  useEffect(() => { setMenuMovil(false); }, [pathname]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        setUsuario(d.usuario ?? null);
        setAdmin(!!d.admin);
        setTester(!!d.tester);
        setCambioFacLibre(!!d.cambio_facultad_libre);
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
        // Recarga dura: la mayoría de las páginas son "use client" con su
        // propio fetch en useEffect — router.refresh() no las re-dispara,
        // solo re-renderiza partes de servidor. Sin esto quedaban con datos
        // de la facultad vieja hasta cerrar y volver a abrir la pestaña.
        window.location.reload();
        return;
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

        {/* Nav inline (desktop) — se oculta en móvil vía CSS */}
        <nav className="axiom-nav-desktop">
          {usuario && !admin && (
            <>
              <Link href="/dashboard" style={navLink(pathname === "/dashboard")}>Inicio</Link>
              <Link href="/aprende" style={navLink(pathname?.startsWith("/aprende"))}>📚 Aprende</Link>
              <Link href="/laminas" style={navLink(pathname?.startsWith("/laminas"))}>💎 Láminas</Link>
              <Link href="/practicar" style={navLink(pathname?.startsWith("/practicar"))}>Practicar</Link>
              <Link href="/historial" style={navLink(pathname === "/historial")}>Mis exámenes</Link>
              <Link href="/debilidades" style={navLink(pathname === "/debilidades")}>Mis debilidades</Link>
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

        {/* Botón hamburguesa — solo visible en móvil */}
        <button
          className="axiom-nav-hamburger"
          onClick={() => setMenuMovil(!menuMovil)}
          aria-label="Menú"
          style={{
            marginLeft: "auto", marginRight: 8,
            background: "transparent", border: "none", cursor: "pointer",
            padding: 8, color: "var(--fg-primary)",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {menuMovil ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

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
                      {(admin || tester) && (
                        <button
                          onClick={async () => {
                            const r = await fetch("/api/admin/toggle-plan", { method: "POST" });
                            const d = await r.json();
                            if (r.ok) {
                              alert(`✓ Ahora estás en plan ${d.plan.toUpperCase()} para esta facultad.`);
                              window.location.reload();
                            } else {
                              alert("⚠️ " + (d.error ?? "Error"));
                            }
                          }}
                          style={{ ...menuItem(), display: "block", width: "100%", textAlign: "left", background: "rgba(245,158,11,0.08)", border: "1px dashed #f59e0b", color: "#d97706", fontWeight: 700, cursor: "pointer", marginTop: 4 }}
                        >
                          🧪 Cambiar plan (test)
                        </button>
                      )}
                    </>
                  )}
                  {/* Selector de FACULTAD para probar — visible solo para
                      admins y testers (cambio_facultad_libre). Cambia de
                      carrera sin pagar, para revisar el contenido. */}
                  {cambioFacLibre && facultades.length > 0 && (
                    <div style={{ borderTop: "1px dashed var(--border)", marginTop: 4, paddingTop: 8 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1, padding: "0 12px 6px" }}>
                        🎓 Cambiar facultad (prueba)
                      </div>
                      {facultades.map((f) => {
                        const activa = f.id === usuario?.facultad_objetivo;
                        return (
                          <button
                            key={f.id}
                            onClick={async () => {
                              if (activa || cambiando) return;
                              setCambiando(true);
                              const r = await fetch("/api/perfil/facultad", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ facultad: f.id }),
                              });
                              if (r.ok) {
                                window.location.reload();
                                return;
                              }
                              setCambiando(false);
                            }}
                            style={{
                              ...menuItem(), display: "flex", alignItems: "center", gap: 8,
                              width: "100%", textAlign: "left", background: "transparent",
                              border: "none", cursor: activa ? "default" : "pointer",
                              fontWeight: activa ? 800 : 500,
                              color: activa ? "var(--accent)" : "var(--fg-primary)",
                            }}
                          >
                            <span>{f.emoji}</span>
                            <span style={{ flex: 1 }}>{f.nombre_corto}</span>
                            {activa && <span style={{ color: "var(--accent)" }}>✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Selector de rol — SOLO desarrollo local. En producción
                      NODE_ENV es "production" y esto no se renderiza. */}
                  {process.env.NODE_ENV !== "production" && (
                    <div style={{ borderTop: "1px dashed #f59e0b", marginTop: 4, paddingTop: 8 }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: "#d97706", textTransform: "uppercase", letterSpacing: 1, padding: "0 12px 6px" }}>
                        🛠️ Cambiar de rol (dev)
                      </div>
                      <a href="/api/auth/dev-login?rol=estudiante" style={{ ...menuItem(), display: "block" }}>👤 Estudiante</a>
                      <a href="/api/auth/dev-login?rol=tester" style={{ ...menuItem(), display: "block" }}>🎓 Ronald (tester)</a>
                      <a href="/api/auth/dev-login?rol=admin" style={{ ...menuItem(), display: "block" }}>⚡ Super Admin</a>
                    </div>
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

      {/* MENÚ MÓVIL — drawer que se abre con la hamburguesa */}
      {menuMovil && (
        <div
          className="axiom-nav-hamburger"
          style={{
            flexDirection: "column",
            padding: "8px 16px 16px",
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border)",
            gap: 2,
          }}
        >
          {usuario && !admin && (
            <>
              <Link href="/dashboard" style={menuMovilItem(pathname === "/dashboard")} onClick={() => setMenuMovil(false)}>🏠 Inicio</Link>
              <Link href="/aprende" style={menuMovilItem(pathname?.startsWith("/aprende"))} onClick={() => setMenuMovil(false)}>📚 Aprende</Link>
              <Link href="/laminas" style={menuMovilItem(pathname?.startsWith("/laminas"))} onClick={() => setMenuMovil(false)}>💎 Láminas</Link>
              <Link href="/practicar" style={menuMovilItem(pathname?.startsWith("/practicar"))} onClick={() => setMenuMovil(false)}>📝 Practicar</Link>
              <Link href="/historial" style={menuMovilItem(pathname === "/historial")} onClick={() => setMenuMovil(false)}>📊 Mis exámenes</Link>
              <Link href="/debilidades" style={menuMovilItem(pathname === "/debilidades")} onClick={() => setMenuMovil(false)}>🎯 Mis debilidades</Link>
              <Link href="/resueltos" style={menuMovilItem(pathname?.startsWith("/resueltos"))} onClick={() => setMenuMovil(false)}>📖 Resueltos</Link>
              <Link href="/precios" style={menuMovilItem(pathname === "/precios")} onClick={() => setMenuMovil(false)}>💎 Planes</Link>
            </>
          )}
          {admin && (
            <>
              <Link href="/admin" style={menuMovilItem(pathname === "/admin")} onClick={() => setMenuMovil(false)}>Dashboard</Link>
              <Link href="/admin/facultades" style={menuMovilItem(pathname?.startsWith("/admin/facultades"))} onClick={() => setMenuMovil(false)}>Facultades</Link>
              <Link href="/admin/banco" style={menuMovilItem(pathname?.startsWith("/admin/banco"))} onClick={() => setMenuMovil(false)}>Banco</Link>
              <Link href="/admin/usuarios" style={menuMovilItem(pathname === "/admin/usuarios")} onClick={() => setMenuMovil(false)}>Usuarios</Link>
              <Link href="/admin/pagos" style={menuMovilItem(pathname === "/admin/pagos")} onClick={() => setMenuMovil(false)}>Pagos</Link>
            </>
          )}
          {!usuario && !admin && (
            <>
              <Link href="/#facultades" style={menuMovilItem(false)} onClick={() => setMenuMovil(false)}>Facultades</Link>
              <Link href="/precios" style={menuMovilItem(pathname === "/precios")} onClick={() => setMenuMovil(false)}>Precios</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

function menuMovilItem(active?: boolean | null): React.CSSProperties {
  return {
    display: "block",
    padding: "12px 14px",
    color: active ? "var(--accent)" : "var(--fg-primary)",
    textDecoration: "none",
    fontSize: 16,
    fontWeight: active ? 700 : 600,
    borderRadius: 10,
    background: active ? "rgba(99,102,241,0.10)" : "transparent",
  };
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
