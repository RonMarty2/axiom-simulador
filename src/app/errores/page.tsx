"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";

interface ErrorGuardado {
  pregunta_id: string;
  enunciado: string;
  area: string;
  tema: string;
  facultad: string;
  veces_fallado: number;
  ultima_vez: string;
}

export default function ErroresPage() {
  const router = useRouter();
  const [errores, setErrores] = useState<ErrorGuardado[]>([]);
  const [loading, setLoading] = useState(true);

  const [porArea, setPorArea] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.usuario) { router.push("/login"); return; }
      // Errores guardados en la base de datos, atados a la cuenta del usuario.
      fetch("/api/axiom/errores")
        .then((r) => r.json())
        .then((data) => {
          setErrores(Array.isArray(data.errores) ? data.errores : []);
          setPorArea(data.por_area ?? {});
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, [router]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "32px 24px" }}>
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>🎯 Mis errores</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 28 }}>Las preguntas que has fallado, agrupadas para repasar.</p>

        {loading ? <Cargando /> : errores.length === 0 ? (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 60, textAlign: "center", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 6 }}>¡No tienes errores aún!</h3>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, marginBottom: 18 }}>Cuando falles una pregunta, la guardaremos aquí para que la repases.</p>
            <Link href="/practicar" style={{ display: "inline-block", padding: "12px 24px", background: "var(--accent)", color: "white", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>
              Hacer un simulacro
            </Link>
          </div>
        ) : (
          <>
            {/* Stats por área */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 28 }}>
              {Object.entries(porArea).map(([area, count]) => (
                <div key={area} style={{ background: "var(--bg-card)", borderRadius: 12, padding: 14, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--fg-muted)", textTransform: "uppercase" }}>{area}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "var(--fg-primary)" }}>{count}</div>
                </div>
              ))}
            </div>

            {/* CTA: practicar mis errores */}
            <div style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)", borderRadius: 14, padding: 20, marginBottom: 20, color: "white", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 36 }}>🔥</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800 }}>Practica solo tus errores</div>
                <div style={{ fontSize: 13, opacity: 0.9 }}>Genera un simulacro con los temas donde has fallado.</div>
              </div>
              <Link href="/practicar?modo=mis_errores" style={{ padding: "10px 20px", background: "white", color: "#dc2626", borderRadius: 8, fontWeight: 800, textDecoration: "none", fontSize: 14 }}>Repasar ahora</Link>
            </div>

            {/* Lista */}
            <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)" }}>
              {errores.slice(0, 20).map((e, i) => (
                <div key={e.pregunta_id} style={{ padding: 14, borderTop: i > 0 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--fg-muted)" }}>
                    <span>{e.area}</span> · <span>{e.tema}</span> · <span>Fallada {e.veces_fallado}x</span>
                  </div>
                  <div style={{ fontSize: 14, color: "var(--fg-primary)" }}>{e.enunciado.slice(0, 200)}{e.enunciado.length > 200 ? "…" : ""}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
