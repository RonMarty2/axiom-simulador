"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppHeader from "../components/AppHeader";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
import type { Facultad, Usuario } from "@/lib/data-store";

// Precio del cambio de facultad. Por ahora fijo; si en el futuro
// quieres precios distintos por facultad, este valor sale del objeto Facultad.
const PRECIO_CAMBIO_BOB = 50;

function CambiarFacultadInner() {
  const router = useRouter();
  const params = useSearchParams();
  const destinoInicial = params.get("destino");

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultades, setFacultades] = useState<Facultad[]>([]);
  const [destino, setDestino] = useState<string>(destinoInicial ?? "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/facultades").then((r) => r.json()),
    ]).then(([me, f]) => {
      if (!me.usuario) { router.push("/login"); return; }
      if (!me.usuario.facultad_objetivo) { router.push("/onboarding"); return; }
      setUsuario(me.usuario);
      setFacultades(f.facultades ?? []);
      setLoading(false);
    });
  }, [router]);

  if (loading || !usuario) return <Cargando />;

  const actual = facultades.find((x) => x.id === usuario.facultad_objetivo);
  const destinoObj = facultades.find((x) => x.id === destino);

  const procederPago = () => {
    if (!destino) return;
    router.push(`/pagar?tipo=cambio_facultad&destino=${destino}`);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px" }}>
        <BackLink href="/cuenta" label="Volver a mi cuenta" />
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginTop: 10, marginBottom: 8 }}>
          🔄 Cambiar de facultad
        </h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 28 }}>
          Cada facultad es un producto independiente con su propio temario, banco de preguntas y precio. El cambio se hace con un único pago.
        </p>

        {/* Facultad actual */}
        {actual && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 18, background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", marginBottom: 22 }}>
            <div style={{ fontSize: 36 }}>{actual.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Tu facultad actual</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--fg-primary)" }}>{actual.nombre_corto}</div>
              <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{usuario.examenes_completados} exámenes hechos · {usuario.mejor_nota}/100 mejor nota</div>
            </div>
          </div>
        )}

        {/* Selector destino */}
        <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 12 }}>¿A qué facultad quieres cambiarte?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 24 }}>
          {facultades.filter((f) => f.id !== usuario.facultad_objetivo).map((f) => {
            const selected = destino === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setDestino(f.id)}
                style={{
                  textAlign: "left", padding: 18, cursor: "pointer",
                  border: selected ? `3px solid ${f.color}` : "1px solid var(--border)",
                  background: selected ? `${f.color}10` : "var(--bg-card)",
                  borderRadius: 14, position: "relative",
                  boxShadow: selected ? `0 8px 20px ${f.color}30` : "none",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  transform: selected ? "translateY(-2px)" : "none",
                }}
              >
                {selected && (
                  <div style={{ position: "absolute", top: 10, right: 10, width: 24, height: 24, borderRadius: "50%", background: f.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>✓</div>
                )}
                <div style={{ fontSize: 36, marginBottom: 10 }}>{f.emoji}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>{f.nombre_corto}</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.4, minHeight: 48 }}>
                  {f.descripcion.slice(0, 90)}{f.descripcion.length > 90 ? "…" : ""}
                </div>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>Costo del cambio</div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: f.color }}>Bs. {PRECIO_CAMBIO_BOB}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Resumen + CTA */}
        {destinoObj && (
          <div style={{
            padding: 20, background: "var(--bg-card)",
            borderRadius: 14, border: `2px solid ${destinoObj.color}`,
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
              <div style={{ fontSize: 14 }}>
                <span style={{ color: "var(--fg-muted)" }}>{actual?.emoji} {actual?.nombre_corto}</span>
                <span style={{ margin: "0 10px", color: "var(--fg-muted)" }}>→</span>
                <span style={{ fontWeight: 800, color: destinoObj.color }}>{destinoObj.emoji} {destinoObj.nombre_corto}</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg-muted)", textTransform: "uppercase" }}>Total a pagar</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "var(--fg-primary)" }}>Bs. {PRECIO_CAMBIO_BOB}</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>Pago único · Tigo Money / QR / Transferencia</div>
              </div>
              <button onClick={procederPago} style={{
                padding: "14px 28px", background: destinoObj.color, color: "white",
                border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer",
                boxShadow: `0 10px 24px ${destinoObj.color}50`,
              }}>
                Continuar al pago →
              </button>
            </div>
          </div>
        )}

        <div style={{ padding: 16, background: "rgba(99,102,241,0.06)", borderRadius: 10, border: "1px solid rgba(99,102,241,0.2)", fontSize: 13, color: "var(--fg-primary)", lineHeight: 1.5 }}>
          <strong>💡 Importante:</strong> Tu progreso (exámenes hechos, notas, ranking) de la facultad actual se mantiene siempre. Cuando se aprueba el pago, tu cuenta queda configurada para la nueva facultad y empiezas desde cero en esa carrera.
        </div>
      </div>
    </div>
  );
}

export default function CambiarFacultadPage() {
  return (
    <Suspense fallback={<Cargando />}>
      <CambiarFacultadInner />
    </Suspense>
  );
}
