"use client";

import { useEffect, useState } from "react";
import Icono, { iconoFacultad } from "../components/Icono";
import { useRouter } from "next/navigation";
import type { FacultadConBanco } from "@/lib/data-store";

export default function OnboardingPage() {
  const router = useRouter();
  const [facultades, setFacultades] = useState<FacultadConBanco[]>([]);
  const [seleccionada, setSeleccionada] = useState<string>("");
  const [guardando, setGuardando] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.usuario) { router.push("/login"); return; }
      // Si ya tiene facultad, no debería estar aquí
      if (d.usuario.facultad_objetivo) { router.push("/dashboard"); return; }
      setNombreUsuario(d.usuario.nombre.split(" ")[0]);
    });
    fetch("/api/facultades").then((r) => r.json()).then((f) => setFacultades(f.facultades ?? []));
  }, [router]);

  const guardar = async () => {
    if (!seleccionada) return;
    setGuardando(true);
    setError(null);
    try {
      const r = await fetch("/api/perfil/facultad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultad: seleccionada }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Error");
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setGuardando(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 900 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: "var(--accent)" }}><Icono nombre="birrete" tamano={44} grosor={1.6} /></div>
          <div style={{ display: "inline-block", padding: "4px 12px", background: "var(--accent-soft)", color: "var(--accent)", borderRadius: 999, fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
            PASO 1 DE 1
          </div>
          <h1 className="font-crimson" style={{ fontSize: 40, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 10, lineHeight: 1.15 }}>
            {nombreUsuario ? `Bienvenido, ${nombreUsuario}` : "Bienvenido a Axiom"}
          </h1>
          <p style={{ fontSize: 17, color: "var(--fg-muted)", maxWidth: 540, margin: "0 auto" }}>
            ¿A qué facultad de la UMSS te estas preparando? Toda la plataforma se enfoca en esa carrera.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
          {facultades.map((f) => {
            const activa = seleccionada === f.id;
            // Acá es donde más duele elegir una facultad vacía: el alumno se
            // registra, elige, y cae en un producto sin contenido. Si no tiene
            // exámenes no se puede seleccionar.
            const lista = f.examenes > 0;
            return (
              <button
                key={f.id}
                onClick={() => lista && setSeleccionada(f.id)}
                disabled={!lista}
                title={lista ? undefined : "Todavía no tenemos exámenes de esta facultad"}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 18,
                  padding: 22,
                  border: activa ? "3px solid var(--accent)" : "1px solid var(--border)",
                  boxShadow: activa ? "var(--shadow-md)" : "var(--shadow-sm)",
                  cursor: lista ? "pointer" : "not-allowed",
                  opacity: lista ? 1 : 0.65,
                  textAlign: "left",
                  position: "relative",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  transform: activa ? "translateY(-3px)" : "none",
                }}
              >
                {activa && (
                  <div style={{ position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: "50%", background: "var(--accent)", color: "var(--accent-fg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icono nombre="check" tamano={14} grosor={2.6} />
                  </div>
                )}
                {!lista && (
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    fontSize: 9.5, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase",
                    padding: "4px 9px", borderRadius: 999,
                    background: "var(--bg-subtle)", color: "var(--fg-muted)", border: "1px solid var(--border)",
                  }}>
                    Próximamente
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: lista ? "var(--accent)" : "var(--fg-muted)" }}><Icono nombre={iconoFacultad(f.id)} tamano={40} grosor={1.6} /></div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: lista ? "var(--fg-primary)" : "var(--fg-muted)", marginBottom: 6 }}>{f.nombre_corto}</h3>
                <p style={{ fontSize: 12.5, color: "var(--fg-muted)", lineHeight: 1.45, marginBottom: 14, minHeight: 54 }}>
                  {f.descripcion}
                </p>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {f.areas.map((a) => (
                    <span key={a} style={{ fontSize: 9.5, padding: "2px 7px", background: "var(--bg-subtle)", color: "var(--fg-secondary)", borderRadius: 999, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{a}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <div style={{ padding: 12, background: "rgba(239,68,68,0.1)", color: "#b91c1c", borderRadius: 10, marginBottom: 16, textAlign: "center" }}><Icono nombre="alerta" tamano={15} /> {error}</div>
        )}

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={guardar}
            disabled={!seleccionada || guardando}
            style={{
              padding: "16px 48px",
              background: seleccionada ? "var(--accent)" : "var(--bg-subtle)",
              color: seleccionada ? "white" : "var(--fg-muted)",
              border: "none",
              borderRadius: 14,
              fontSize: 17,
              fontWeight: 800,
              cursor: seleccionada && !guardando ? "pointer" : "not-allowed",
              boxShadow: seleccionada ? "0 12px 28px rgba(26,31,46,0.18)" : "none",
              transition: "all 0.15s",
            }}
          >
            {guardando ? "Guardando..." : seleccionada ? "Empezar a practicar →" : "Elige una facultad arriba"}
          </button>
          <p style={{ marginTop: 14, fontSize: 13, color: "var(--fg-muted)" }}>
            Puedes cambiar la facultad después desde "Mi cuenta"
          </p>
        </div>
      </div>
    </div>
  );
}
