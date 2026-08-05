"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../components/AppHeader";
import Cargando from "../components/Cargando";
import { guardarSimulador } from "@/lib/sim-storage";

interface Seccion { seccion: string; promedio: number; intentos: number }
interface Tema { tema: string; area: string; errores: number; ultima_vez: string }
interface Resp {
  facultad: string | null;
  total_examenes: number;
  secciones: Seccion[];
  temas: Tema[];
}

const ETIQUETAS_AREA: Record<string, string> = {
  matematicas: "Matemáticas", aritmetica_algebra: "Aritmética-Álgebra", geometria_trigonometria: "Geometría-Trigonometría",
  economicas: "Económicas", verbal: "Verbal",
  razonamiento: "Razonamiento", fisica: "Física", quimica: "Química",
  biologia: "Biología", civica: "Cívica", historia: "Historia", general: "General",
};

function etiquetaSeccion(s: string): string {
  if (ETIQUETAS_AREA[s]) return ETIQUETAS_AREA[s];
  return s.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function colorPorNota(n: number): string {
  if (n >= 70) return "#10b981";
  if (n >= 50) return "#f59e0b";
  return "#ef4444";
}

export default function DebilidadesPage() {
  const router = useRouter();
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(true);
  const [practicando, setPracticando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      if (!d.usuario) { router.push("/login"); return; }
      fetch("/api/axiom/debilidades")
        .then((r) => r.json())
        .then((d) => setData(d))
        .finally(() => setLoading(false));
    });
  }, [router]);

  const practicarTema = async (tema: string) => {
    setPracticando(tema);
    setError(null);
    try {
      const r = await fetch("/api/axiom/simulador", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: { modo: "por_tema", universidad: "UMSS", facultad: data?.facultad, tema, cantidad_preguntas: 10 },
        }),
      });
      const out = await r.json();
      if (!r.ok) throw new Error(out.error ?? "Error");
      guardarSimulador(out.simulador);
      router.push(`/simulador/${out.simulador.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setPracticando(null);
    }
  };

  if (loading) return <Cargando />;

  const debiles = (data?.secciones ?? []).filter((s) => s.promedio < 70).slice(0, 5);
  const fuertes = (data?.secciones ?? []).filter((s) => s.promedio >= 70).slice(0, 3);

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppHeader />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <h1 className="font-crimson" style={{ fontSize: 32, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>📈 Mis debilidades</h1>
        <p style={{ color: "var(--fg-muted)", marginBottom: 24 }}>
          Aquí ves dónde estás fallando más, según tus simulacros. Practica directo lo que necesitas.
        </p>

        {data && data.total_examenes === 0 ? (
          <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: 50, textAlign: "center", border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 50, marginBottom: 10 }}>🎯</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 6 }}>Todavía no tenemos datos tuyos</h3>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, marginBottom: 18 }}>Haz al menos un simulacro para que descubramos tus puntos débiles y te armemos práctica enfocada.</p>
            <Link href="/practicar" style={{ display: "inline-block", padding: "12px 22px", background: "var(--accent)", color: "white", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>
              Empezar un simulacro
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 22 }}>
            {/* Secciones débiles */}
            {debiles.length > 0 && (
              <section>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 10 }}>🔴 Tus secciones más débiles</h2>
                <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)" }}>
                  {debiles.map((s, i) => (
                    <div key={s.seccion} style={{ padding: 14, borderTop: i > 0 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--fg-primary)", marginBottom: 4 }}>{etiquetaSeccion(s.seccion)}</div>
                        <div style={{ background: "var(--bg-subtle)", height: 8, borderRadius: 999, overflow: "hidden" }}>
                          <div style={{ width: `${s.promedio}%`, height: "100%", background: colorPorNota(s.promedio) }} />
                        </div>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: colorPorNota(s.promedio), minWidth: 60, textAlign: "right" }}>{s.promedio}%</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Temas con más errores */}
            {data && data.temas.length > 0 && (
              <section>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 4 }}>🎯 Temas que más has fallado</h2>
                <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 10 }}>Practica 10 preguntas enfocadas en cada tema.</p>
                <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border)" }}>
                  {data.temas.slice(0, 8).map((t, i) => (
                    <div key={`${t.area}-${t.tema}`} style={{ padding: 14, borderTop: i > 0 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--fg-primary)" }}>{etiquetaSeccion(t.tema)}</div>
                        <div style={{ fontSize: 11, color: "var(--fg-muted)", marginTop: 2 }}>
                          {etiquetaSeccion(t.area)} · {t.errores} {t.errores === 1 ? "error" : "errores"}
                        </div>
                      </div>
                      <button
                        onClick={() => practicarTema(t.tema)}
                        disabled={practicando !== null}
                        style={{ padding: "8px 16px", background: "var(--accent)", color: "white", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: practicando ? "wait" : "pointer", opacity: practicando ? 0.6 : 1 }}
                      >
                        {practicando === t.tema ? "Preparando…" : "Practicar →"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Fortalezas */}
            {fuertes.length > 0 && (
              <section>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-primary)", marginBottom: 10 }}>🟢 Lo que ya dominas</h2>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {fuertes.map((s) => (
                    <span key={s.seccion} style={{ padding: "8px 14px", background: "rgba(16,185,129,0.1)", color: "#059669", borderRadius: 999, fontSize: 13, fontWeight: 700 }}>
                      ✓ {etiquetaSeccion(s.seccion)} {s.promedio}%
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* CTA al plan IA Premium */}
            <section>
              <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 14, padding: 20, color: "white", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ fontSize: 36 }}>📋</div>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={{ fontSize: 16, fontWeight: 800 }}>Plan de estudio personalizado con IA</div>
                  <div style={{ fontSize: 13, opacity: 0.9 }}>Después de un simulacro, la IA te arma un plan de 3 días enfocado en lo que más te costó.</div>
                </div>
                <Link href="/practicar" style={{ padding: "10px 18px", background: "white", color: "#6366f1", borderRadius: 10, fontWeight: 800, textDecoration: "none", fontSize: 14 }}>
                  Hacer un simulacro →
                </Link>
              </div>
            </section>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 16, padding: 14, background: "rgba(239,68,68,0.1)", color: "#b91c1c", borderRadius: 10, fontSize: 14 }}>⚠️ {error}</div>
        )}
      </div>
    </div>
  );
}
