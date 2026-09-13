"use client";

import { useEffect, useState, Suspense } from "react";
import Icono, { iconoFacultad } from "../components/Icono";
import { useRouter, useSearchParams } from "next/navigation";
import AppHeader from "../components/AppHeader";
import BackLink from "../components/BackLink";
import Cargando from "../components/Cargando";
import type { FacultadConBanco, Usuario } from "@/lib/data-store";

// Precio del cambio de facultad. Por ahora fijo; si en el futuro
// quieres precios distintos por facultad, este valor sale del objeto Facultad.
const PRECIO_CAMBIO_BOB = 50;

function CambiarFacultadInner() {
  const router = useRouter();
  const params = useSearchParams();
  const destinoInicial = params.get("destino");

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [facultades, setFacultades] = useState<FacultadConBanco[]>([]);
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
          <Icono nombre="mezclar" tamano={26} /> Cambiar de facultad
        </h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 28 }}>
          Cada facultad es un producto independiente con su propio temario, banco de preguntas y precio. El cambio se hace con un único pago.
        </p>

        {/* Facultad actual */}
        {actual && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 18, background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border)", marginBottom: 22 }}>
            <div style={{ display: "flex", color: "var(--accent)" }}><Icono nombre={iconoFacultad(actual.id)} tamano={32} grosor={1.7} /></div>
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
            // Sin exámenes no se puede cobrar el cambio: seria venderle al
            // alumno el pase a una facultad vacia.
            const lista = f.examenes > 0;
            return (
              <button
                key={f.id}
                onClick={() => lista && setDestino(f.id)}
                disabled={!lista}
                title={lista ? undefined : "Todavía no tenemos exámenes de esta facultad"}
                style={{
                  textAlign: "left", padding: 18,
                  cursor: lista ? "pointer" : "not-allowed",
                  opacity: lista ? 1 : 0.65,
                  border: selected ? "3px solid var(--accent)" : "1px solid var(--border)",
                  background: selected ? "var(--accent-soft)" : "var(--bg-card)",
                  borderRadius: 14, position: "relative",
                  boxShadow: selected ? "var(--shadow-md)" : "none",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  transform: selected ? "translateY(-2px)" : "none",
                }}
              >
                {selected && (
                  <div style={{ position: "absolute", top: 10, right: 10, width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", color: "var(--accent-fg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icono nombre="check" tamano={13} grosor={2.6} />
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
                <div style={{ display: "flex", marginBottom: 10, color: lista ? "var(--accent)" : "var(--fg-muted)" }}><Icono nombre={iconoFacultad(f.id)} tamano={32} grosor={1.7} /></div>
                <div style={{ fontSize: 18, fontWeight: 800, color: lista ? "var(--fg-primary)" : "var(--fg-muted)", marginBottom: 4 }}>{f.nombre_corto}</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.4, minHeight: 48 }}>
                  {f.descripcion.slice(0, 90)}{f.descripcion.length > 90 ? "…" : ""}
                </div>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 11, color: "var(--fg-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    {lista ? "Costo del cambio" : "Banco en preparación"}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: lista ? "var(--accent)" : "var(--fg-muted)" }}>
                    {lista ? `Bs. ${PRECIO_CAMBIO_BOB}` : "—"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Resumen + CTA */}
        {destinoObj && (
          <div style={{
            padding: 20, background: "var(--bg-card)",
            borderRadius: 14, border: "2px solid var(--accent)",
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
              <div style={{ fontSize: 14 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--fg-muted)" }}>{actual && <Icono nombre={iconoFacultad(actual.id)} tamano={14} />} {actual?.nombre_corto}</span>
                <span style={{ margin: "0 10px", color: "var(--fg-muted)" }}>→</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 800, color: "var(--accent)" }}><Icono nombre={iconoFacultad(destinoObj.id)} tamano={14} /> {destinoObj.nombre_corto}</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg-muted)", textTransform: "uppercase" }}>Total a pagar</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "var(--fg-primary)" }}>Bs. {PRECIO_CAMBIO_BOB}</div>
                <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>Pago único · Tigo Money / QR / Transferencia</div>
              </div>
              <button onClick={procederPago} style={{
                padding: "14px 28px", background: "var(--accent)", color: "var(--accent-fg)",
                border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer",
                boxShadow: "var(--shadow-md)",
              }}>
                Continuar al pago →
              </button>
            </div>
          </div>
        )}

        <div style={{ padding: 16, background: "var(--accent-soft)", borderRadius: 10, border: "1px solid var(--border)", fontSize: 13, color: "var(--fg-primary)", lineHeight: 1.5 }}>
          <strong><Icono nombre="idea" tamano={15} /> Importante:</strong> Tu progreso (exámenes hechos, notas, ranking) de la facultad actual se mantiene siempre. Cuando se aprueba el pago, tu cuenta queda configurada para la nueva facultad y empiezas desde cero en esa carrera.
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
