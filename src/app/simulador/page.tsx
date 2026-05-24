"use client";

import { useState } from "react";
import Link from "next/link";

type Modo = "ia_generado" | "examen_real";
type Dificultad = "facil" | "medio" | "dificil";

export default function SimuladorCreatePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modo, setModo] = useState<Modo>("ia_generado");
  const [cantidad, setCantidad] = useState<number>(20);
  const [dificultad, setDificultad] = useState<Dificultad>("medio");

  const handleCrear = async () => {
    setLoading(true);
    setError(null);

    const config =
      modo === "ia_generado"
        ? {
            modo: "ia_generado" as const,
            universidad: "UMSS",
            facultad: "economicas",
            cantidad_preguntas: cantidad,
            dificultad,
          }
        : {
            modo: "examen_real" as const,
            universidad: "UMSS",
            facultad: "economicas",
            anio: 2024,
          };

    try {
      const res = await fetch("/api/axiom/simulador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Error creando simulador");
        setLoading(false);
        return;
      }
      window.location.href = `/simulador/${data.simulador.id}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de red");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            className="font-crimson"
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "var(--fg-primary)",
              marginBottom: 8,
              letterSpacing: "-0.02em",
            }}
          >
            Nuevo simulacro
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 15 }}>
            Examen de ingreso · <strong>UMSS Facultad de Ciencias Económicas</strong>
          </p>
        </div>

        {/* Selector de modo */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 12,
              color: "var(--fg-muted)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
            }}
          >
            ¿Cómo quieres practicar?
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <button
              onClick={() => setModo("ia_generado")}
              style={{
                textAlign: "left",
                padding: "18px 20px",
                borderRadius: 14,
                border:
                  modo === "ia_generado"
                    ? "2px solid var(--accent)"
                    : "1px solid var(--border)",
                background:
                  modo === "ia_generado"
                    ? "rgba(99,102,241,0.08)"
                    : "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 22 }}>🤖</span>
                <strong style={{ fontSize: 16, color: "var(--fg-primary)" }}>
                  Examen generado por IA (recomendado)
                </strong>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    padding: "3px 8px",
                    background: "rgba(34,197,94,0.15)",
                    color: "#15803d",
                    borderRadius: 999,
                    fontWeight: 700,
                  }}
                >
                  NUEVO
                </span>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--fg-muted)", lineHeight: 1.5 }}>
                Preguntas frescas creadas en el momento sobre el temario oficial
                UMSS. Cada examen es único. Distribución real: 40% Matemáticas,
                35% Economía, 15% Verbal, 10% Razonamiento.
              </p>
            </button>

            <button
              onClick={() => setModo("examen_real")}
              style={{
                textAlign: "left",
                padding: "18px 20px",
                borderRadius: 14,
                border:
                  modo === "examen_real"
                    ? "2px solid var(--accent)"
                    : "1px solid var(--border)",
                background:
                  modo === "examen_real"
                    ? "rgba(99,102,241,0.08)"
                    : "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 22 }}>📄</span>
                <strong style={{ fontSize: 16, color: "var(--fg-primary)" }}>
                  Examen real 2024
                </strong>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--fg-muted)", lineHeight: 1.5 }}>
                El examen oficial de la UMSS Económicas del año 2024, tal cual fue
                tomado. Ideal para medir cómo te iría hoy.
              </p>
            </button>
          </div>
        </div>

        {/* Configuración IA */}
        {modo === "ia_generado" && (
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                    marginBottom: 8,
                  }}
                >
                  ¿Cuántas preguntas?
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[10, 20, 30, 50].map((n) => (
                    <button
                      key={n}
                      onClick={() => setCantidad(n)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 999,
                        border:
                          cantidad === n
                            ? "1px solid var(--accent)"
                            : "1px solid var(--border)",
                        background:
                          cantidad === n ? "var(--accent)" : "transparent",
                        color: cantidad === n ? "white" : "var(--fg-primary)",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 6 }}>
                  Tiempo estimado: {Math.max(15, cantidad * 2)} minutos
                </p>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--fg-primary)",
                    marginBottom: 8,
                  }}
                >
                  Dificultad
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {(["facil", "medio", "dificil"] as Dificultad[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDificultad(d)}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 999,
                        border:
                          dificultad === d
                            ? "1px solid var(--accent)"
                            : "1px solid var(--border)",
                        background:
                          dificultad === d ? "var(--accent)" : "transparent",
                        color: dificultad === d ? "white" : "var(--fg-primary)",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        textTransform: "capitalize",
                      }}
                    >
                      {d === "facil" ? "Fácil" : d === "medio" ? "Medio" : "Difícil"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.30)",
              borderRadius: 10,
              padding: "12px 14px",
              color: "#b91c1c",
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleCrear}
          disabled={loading}
          className="btn-primary"
          style={{
            width: "100%",
            padding: "16px",
            fontSize: 16,
            background: loading
              ? "var(--bg-subtle)"
              : "linear-gradient(135deg, var(--accent), #4f46e5)",
            color: "white",
            border: "none",
            borderRadius: 12,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700,
            boxShadow: loading
              ? "none"
              : "0 12px 28px rgba(99, 102, 241, 0.30)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          {loading ? (
            <>
              <div
                style={{
                  width: 18,
                  height: 18,
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              {modo === "ia_generado"
                ? "La IA está creando tu examen..."
                : "Preparando examen..."}
            </>
          ) : modo === "ia_generado" ? (
            "🚀 Generar mi examen ahora"
          ) : (
            "Comenzar examen real 2024"
          )}
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "var(--fg-muted)",
            marginTop: 12,
          }}
        >
          {modo === "ia_generado"
            ? "Generar puede tomar 20-40 segundos. La IA escribe preguntas únicas para ti."
            : "Empezarás de inmediato con el cronómetro corriendo."}
        </p>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            href="/"
            style={{
              color: "var(--fg-muted)",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
