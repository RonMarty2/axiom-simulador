"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppHeader from "./components/AppHeader";
import Icono, { iconoFacultad } from "./components/Icono";
import type { Facultad } from "@/lib/data-store";

export default function LandingPage() {
  const [facultades, setFacultades] = useState<Facultad[]>([]);

  useEffect(() => {
    fetch("/api/facultades").then((r) => r.json()).then((d) => setFacultades(d.facultades ?? []));
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />

      {/* HERO */}
      <section style={{ padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* La bandera 🇧🇴 que estaba acá no se ve como bandera en Windows:
              los regional indicators caen a las letras "BO". */}
          <div style={{ display: "inline-block", padding: "6px 14px", background: "var(--accent-soft)", color: "var(--accent)", borderRadius: 999, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
            Simulador de exámenes UMSS · Cochabamba, Bolivia
          </div>
          <h1 className="font-crimson" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, color: "var(--fg-primary)", lineHeight: 1.05, marginBottom: 18, letterSpacing: "-0.02em" }}>
            Practica como en el<br/>
            <span style={{ color: "var(--accent)" }}>examen real.</span> Ingresa.
          </h1>
          <p style={{ fontSize: 19, color: "var(--fg-muted)", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.5 }}>
            Exámenes reales de años anteriores, simulacros barajados por tema y un plan personalizado de IA. Para Económicas, Ingeniería, Medicina y Derecho.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "var(--accent)", color: "var(--accent-fg)", textDecoration: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, boxShadow: "var(--shadow-md)" }}>
              Empezar gratis <Icono nombre="flecha" tamano={18} />
            </Link>
            <Link href="/precios" style={{ padding: "14px 28px", background: "var(--bg-card)", color: "var(--fg-primary)", textDecoration: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, border: "1px solid var(--border)" }}>
              Ver planes
            </Link>
          </div>

          {/* Propuesta de valor (no depende de tener tráfico todavía) */}
          <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
            {[
              { icono: "documento" as const, t: "Exámenes reales UMSS" },
              { icono: "chispa" as const, t: "Simulacros con IA" },
              { icono: "errores" as const, t: "Detecta tus debilidades" },
            ].map((v) => (
              <div key={v.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ color: "var(--accent)", display: "flex", height: 32, alignItems: "center" }}>
                  <Icono nombre={v.icono} tamano={28} />
                </span>
                <div style={{ fontSize: 13, color: "var(--fg-muted)" }}>{v.t}</div>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 28, lineHeight: "32px", fontWeight: 800, color: "var(--fg-primary)" }}>{facultades.length || 4}</div>
              <div style={{ fontSize: 13, color: "var(--fg-muted)" }}>facultades cubiertas</div>
            </div>
          </div>
        </div>
      </section>

      {/* FACULTADES */}
      <section id="facultades" style={{ padding: "60px 24px", background: "rgba(255,255,255,0.4)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="font-crimson" style={{ fontSize: 44, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 12 }}>
              Elige tu facultad
            </h2>
            <p style={{ fontSize: 17, color: "var(--fg-muted)" }}>Tenemos contenido específico para cada examen de ingreso UMSS</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {/* Un solo acento para las cuatro. Antes cada facultad pintaba su
                propio color (f.color, editable en Supabase): cuatro paletas
                distintas compitiendo en la misma fila. */}
            {facultades.map((f) => (
              <Link key={f.id} href={`/login?facultad=${f.id}`} style={{
                background: "var(--bg-card)", borderRadius: 18, padding: 24, textDecoration: "none",
                border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)", display: "block",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}>
                <span style={{ color: "var(--accent)", display: "inline-flex", marginBottom: 14 }}>
                  <Icono nombre={iconoFacultad(f.id)} tamano={36} grosor={1.6} />
                </span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>
                  {f.nombre_corto}
                </h3>
                <p style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.5, marginBottom: 14, minHeight: 60 }}>
                  {f.descripcion}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {f.areas.map((a) => (
                    <span key={a} style={{ fontSize: 10, padding: "3px 8px", background: "var(--bg-subtle)", color: "var(--fg-secondary)", borderRadius: 999, fontWeight: 700, textTransform: "uppercase" }}>{a}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>
                  Practicar ahora <Icono nombre="flecha" tamano={15} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 className="font-crimson" style={{ fontSize: 44, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 12 }}>
              ¿Cómo funciona?
            </h2>
            <p style={{ fontSize: 17, color: "var(--fg-muted)" }}>3 pasos para empezar a prepararte</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 30 }}>
            {[
              { n: "1", icon: "birrete" as const, t: "Elige tu facultad", d: "Económicas, Ingeniería, Medicina o Derecho. Cada una con su propio temario y formato." },
              { n: "2", icon: "practicar" as const, t: "Practica con simulacros reales", d: "Exámenes pasados completos, mixtos por tema, o predictivos basados en frecuencia histórica." },
              { n: "3", icon: "grafico" as const, t: "Mejora con tus errores", d: "Ve qué temas te cuestan, recibe un plan personalizado y vuelve a practicar lo necesario." },
            ].map((p) => (
              <div key={p.n} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, background: "var(--accent-soft)", color: "var(--accent)", borderRadius: 999, marginBottom: 16 }}>
                  <Icono nombre={p.icon} tamano={26} />
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", marginBottom: 4, letterSpacing: "0.1em" }}>PASO {p.n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 8 }}>{p.t}</h3>
                <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.5 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, var(--accent), var(--accent-hover))" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", color: "white" }}>
          <h2 className="font-crimson" style={{ fontSize: 44, fontWeight: 800, marginBottom: 16 }}>
            Empieza hoy. Es gratis.
          </h2>
          <p style={{ fontSize: 17, opacity: 0.9, marginBottom: 30 }}>
            Crea tu cuenta y haz tu primer simulacro. Sin tarjeta de crédito.
          </p>
          <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", background: "var(--bg-card)", color: "var(--accent)", textDecoration: "none", borderRadius: 12, fontSize: 17, fontWeight: 800, boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}>
            Crear cuenta gratis <Icono nombre="flecha" tamano={18} />
          </Link>
        </div>
      </section>

      <footer style={{ padding: "30px 24px", textAlign: "center", color: "var(--fg-muted)", fontSize: 13 }}>
        © 2026 Axiom · Simulador de exámenes UMSS · Hecho en Bolivia
      </footer>
    </div>
  );
}
