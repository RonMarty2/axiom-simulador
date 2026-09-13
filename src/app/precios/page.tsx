"use client";

import Link from "next/link";
import Icono from "../components/Icono";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";

const MOTIVOS: Record<string, { titulo: string; texto: string }> = {
  "cambiar-facultad": {
    titulo: "Desbloquea el cambio de facultad",
    texto: "Con Premium puedes cambiar de carrera cuando quieras y prepararte para otra facultad sin perder tu progreso.",
  },
  "ia-infinita": {
    titulo: "Activa la IA infinita",
    texto: "Con Premium, una IA genera preguntas únicas para ti según el temario UMSS, ilimitadas.",
  },
  "limite": {
    titulo: "Pasa a ilimitado",
    texto: "Llegaste al límite semanal del Plan Gratis. Pásate a Premium para simulacros ilimitados.",
  },
};

const PLANES = [
  {
    id: "gratis",
    nombre: "Gratis",
    precio: 0,
    color: "#9ca3af",
    descripcion: "Para empezar a prepararte",
    features: [
      "Todos los exámenes pasados con sus respuestas",
      "2 simulacros por semana (con resolución paso a paso)",
      "Ver en qué fallaste",
    ],
    contras: [
      "Sin paso a paso en la biblioteca de exámenes",
      "Sin Simulacro inteligente con IA",
      "Sin simulacros ilimitados",
      "Sin programa de aprendizaje personalizado",
      "Sin práctica enfocada en tus errores",
    ],
    cta: "Empezar gratis",
  },
  {
    id: "premium",
    nombre: "Premium",
    precio: 100,
    color: "#fbbf24",
    descripcion: "Acceso total, sin límites",
    badge: "RECOMENDADO",
    features: [
      "Todo lo del plan Gratis",
      "Todos los exámenes pasados resueltos paso a paso",
      "Simulacros ilimitados",
      "Simulacro inteligente con IA: arma exámenes nuevos según el temario",
      "Programa de aprendizaje que refuerza tus puntos débiles",
      "Práctica enfocada en donde fallas",
      "Cambio de facultad cuando quieras",
    ],
    cta: "Mejorar a Premium",
  },
];

function PreciosInner() {
  const params = useSearchParams();
  const motivo = params.get("motivo");
  const banner = motivo ? MOTIVOS[motivo] : null;

  const [planActual, setPlanActual] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setPlanActual(d.usuario?.plan ?? null));
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 24px 80px" }}>
        {banner && (
          <div style={{
            marginBottom: 32, padding: "20px 24px",
            background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
            borderRadius: 14, color: "#1e1b4b",
            display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{banner.titulo}</h3>
              <p style={{ fontSize: 14, opacity: 0.9 }}>{banner.texto}</p>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 className="font-crimson" style={{ fontSize: 44, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 10 }}>
            Elige tu plan
          </h1>
          <p style={{ fontSize: 17, color: "var(--fg-muted)" }}>Empieza gratis. Mejora cuando quieras. Cancela cuando quieras.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {PLANES.map((p) => (
            <div key={p.id} style={{
              background: "var(--bg-card)", borderRadius: 18, padding: 28,
              border: planActual === p.id ? `2px solid ${p.color}` : `1px solid var(--border)`,
              position: "relative", boxShadow: p.id === "pro" ? "0 16px 40px rgba(168,85,247,0.18)" : "var(--shadow-sm)",
              display: "flex", flexDirection: "column",
            }}>
              {p.badge && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#1e1b4b", padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 800 }}>{p.badge}</div>
              )}
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: p.color, marginBottom: 4 }}>{p.nombre}</h3>
                <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>{p.descripcion}</p>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "var(--fg-primary)", lineHeight: 1 }}>
                  {p.precio === 0 ? "Gratis" : `Bs. ${p.precio}`}
                </div>
                {p.precio > 0 && <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 4 }}>por mes · Boliviano</div>}
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1, marginBottom: 20 }}>
                {p.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0", fontSize: 14, color: "var(--fg-primary)" }}>
                    <span style={{ color: "#10b981", fontWeight: 800 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
                {p.contras?.map((c) => (
                  <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0", fontSize: 14, color: "var(--fg-muted)" }}>
                    <span>✗</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              {planActual === p.id ? (
                <div style={{ padding: 12, background: "var(--bg-subtle)", textAlign: "center", borderRadius: 10, color: "var(--fg-muted)", fontSize: 14, fontWeight: 700 }}>
                  Tu plan actual
                </div>
              ) : (
                <Link href={p.id === "gratis" ? "/login" : `/pagar?plan=${p.id}`} style={{
                  display: "block", padding: 14, background: p.id === "gratis" ? "var(--bg-subtle)" : p.color,
                  color: p.id === "gratis" ? "var(--fg-primary)" : (p.id === "premium" ? "#1e1b4b" : "white"),
                  borderRadius: 10, textAlign: "center", textDecoration: "none", fontWeight: 800, fontSize: 15,
                }}>
                  {p.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 50, padding: 24, background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)", textAlign: "center" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}><Icono nombre="tarjeta" tamano={17} /> Métodos de pago aceptados</h3>
          <p style={{ fontSize: 14, color: "var(--fg-muted)" }}>Tigo Money · QR Bancario · Transferencia bancaria · (próximamente: tarjeta)</p>
        </div>
      </div>
    </div>
  );
}

export default function PreciosPage() {
  return (
    <Suspense fallback={<Cargando />}>
      <PreciosInner />
    </Suspense>
  );
}
